import type { AdeganStory, Obj } from "./logika-story";
import { E, W, deret, deretEmo, emo, ikatan, judul, kotak, meja, teks } from "./k1b1d-gambar";
import { hapus, k, sorotkan, tambah, ubah, urutKata } from "./k1b1d-bantu";
import { hitungMainan } from "./k1b1a-bantu";

/*
 * Cerita orisinal IGIL "Pesta Rumah Rapi" (Kelas 1 Bab 1 Sub-Bab D, pasangan bilangan), akhir cerita Misi Rumah Rapi
 * sesudah "Tangga Gudang Loteng". Masalah: kue, gelas, dan kursi pesta harus dibagi ke dua meja tanpa ada yang tertinggal.
 * Penyelesaian: memisahkan menjadi dua bagian, menggabungkan dua bagian menjadi utuh, mencari semua pasangan, pasangan sepuluh.
 */

/* ------------------------------ 1. Pesta Rumah Rapi ------------------------------ */
const SUARA_P1 = "Hari ini Pesta Rumah Rapi! Rumah sudah rapi dari kamar, rak, sampai loteng.";
const SUARA_P2 = "Mamah menyiapkan dua meja, meja dalam dan meja teras. Tamunya Nenek dan para tetangga.";
const SUARA_P3 = "Masalahnya, kue, gelas, dan kursi harus dibagi ke dua meja tanpa ada yang tertinggal.";

export const ADEGAN_PESTA: AdeganStory = {
  id: "pesta",
  judul: "Pesta Rumah Rapi",
  sumber: "Materi: masalah membagi ke dua meja",
  latar: "#FEF3C7",
  ketukan: [
    k(SUARA_P1, tambah(0, judul("Pesta Rumah Rapi")), tambah("Pesta", emo("b1", 40, 60, E.balon, 30), emo("b2", 260, 60, E.balon, 30)), tambah("loteng.", emo("kf", 150, 70, E.konfeti, 34))),
    k(SUARA_P2, tambah("dalam", ...meja("md", 20, 140, 110, "Meja dalam")), tambah("teras.", ...meja("mt", 170, 140, 110, "Meja teras")), tambah("Nenek", emo("nn", 150, 120, E.nenek, 24))),
    k(SUARA_P3, hapus(0, "kf", "nn"), tambah("kue,", emo("ik", 104, 100, E.kue, 26)), tambah("gelas,", emo("ig", 150, 100, E.gelas, 26)), tambah("kursi", emo("ir", 196, 100, E.kursi, 26)), tambah("tertinggal.", teks("tq", 150, 66, "dibagi ke dua meja?", 10, W.merah))),
  ],
};

/* ------------------------------ 2. Memisahkan lima kue ------------------------------ */
const SUARA_K1 = "Ada lima kue di nampan. Kaka membagi ke dua piring, dua kue dan tiga kue.";
const SUARA_K2 = "Dua dan tiga adalah dua bagian. Kalau digabung lagi, utuhnya tetap lima.";
const SUARA_K3 = "Lima juga bisa dibagi empat dan satu. Bagiannya berubah, tetapi utuhnya tetap lima.";
const NAMPAN = deret(5, 90, 30, 176);
const KIRI = deret(4, 24, 26, 176);
const KANAN = deret(3, 200, 26, 176);
const piring = (id: string, x: number): Obj => kotak(id, x, 164, 110, 22, W.putih, W.biru, { rx: 11, tebal: 2, z: -1 });

export const ADEGAN_KUE: AdeganStory = {
  id: "pisah-kue",
  judul: "Memisahkan lima kue",
  sumber: "Materi: memisahkan menjadi dua bagian",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Lima kue, dua piring"), kotak("np", 74, 162, 152, 26, "#FDE68A", W.coklat, { rx: 6, z: -1 }), ...deretEmo(E.kue, "ku", NAMPAN, 22)),
      tambah("piring,", piring("pa", 10), piring("pb", 180)),
      hapus("piring,", "np"),
      ubah("dua@2", { id: "ku0", ...KIRI[0] }, { id: "ku1", ...KIRI[1] }),
      ubah("tiga", { id: "ku2", ...KANAN[0] }, { id: "ku3", ...KANAN[1] }, { id: "ku4", ...KANAN[2] }),
    ),
    k(SUARA_K2, tambah("bagian.", ...ikatan("ik", 150, 40, "?", "2", "3")), ubah("lima.", { id: "ik-tu", isi: "5", warna: W.biru }), sorotkan("utuhnya", "ik-u")),
    k(
      SUARA_K3,
      ubah(0, { id: "ik-u", sorot: false }),
      ubah("empat", { id: "ku2", ...KIRI[2] }, { id: "ku3", ...KIRI[3] }, { id: "ku4", ...KANAN[1] }),
      ubah("satu.", { id: "ik-ta", isi: "4" }, { id: "ik-tb", isi: "1" }),
      sorotkan("tetap", "ik-u"),
    ),
  ],
};

/* ------------------------------ 3. Menggabungkan gelas ------------------------------ */
const SUARA_G1 = "Abang menaruh tiga gelas di meja dalam dan empat gelas di meja teras.";
const SUARA_G2 = "Lalu semua gelas digabung di satu nampan. Satu, dua, tiga, empat, lima, enam, tujuh.";
const SUARA_G3 = "Tiga dan empat digabung menjadi tujuh. Tiga dan empat adalah pasangan dari tujuh.";
const GELAS_AWAL = [...deret(3, 40, 26, 128), ...deret(4, 186, 26, 128)];
const GELAS_GABUNG = deret(7, 66, 28, 104);

export const ADEGAN_GELAS: AdeganStory = {
  id: "gabung-gelas",
  judul: "Menggabungkan gelas",
  sumber: "Materi: menggabungkan dua bagian",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Gelas di dua meja"), ...meja("md", 14, 136, 120, "Meja dalam"), ...meja("mt", 166, 136, 120, "Meja teras")), tambah("tiga", ...deretEmo(E.gelas, "gl", GELAS_AWAL.slice(0, 3), 22)), tambah("empat", ...GELAS_AWAL.slice(3).map((p, i) => emo(`gl${3 + i}`, p.x, p.y, E.gelas, 22)))),
    k(
      SUARA_G2,
      hapus(0, "md", "md-k1", "md-k2", "md-n", "mt", "mt-k1", "mt-k2", "mt-n"),
      tambah("nampan.", kotak("np", 46, 90, 208, 22, "#FDE68A", W.coklat, { rx: 6, z: -1 })),
      ubah("digabung", ...GELAS_GABUNG.map((p, i) => ({ id: `gl${i}`, x: p.x, y: p.y }))),
      ...hitungMainan(SUARA_G2, "gl", GELAS_GABUNG, 22, "nampan."),
    ),
    k(SUARA_G3, hapus(0, "tg"), tambah("tujuh.", ...ikatan("ik", 150, 140, "7", "3", "4", 60)), sorotkan("pasangan", "ik-a", "ik-b")),
  ],
};

/** Ekspor untuk uji: letak urutan kata gelas. */
export const POS_GELAS = urutKata(SUARA_G2, ["Satu,", "dua,", "tiga,", "empat,", "lima,", "enam,", "tujuh."]);
