import type { AdeganStory } from "./logika-story";
import { E, W, barisBungkus, barisKardus, catatan, emo, garis, judul, kapur, kartu, kotak, panah, papanKapur, rakKayu, teks, tokoh, tokoLatar, troli } from "./k3b1E-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k3b1E-bantu";

/*
 * Cerita orisinal IGIL "Sisa Stok Pak Anto" (Kelas 3 Bab 1 Sub-Bab E, pengurangan sampai seratus).
 * Naskah suara dari naskah/story-naskah-k3b1e.md. Bagian ini: rak mi (masalah), susun pendek tanpa pinjam, dan susun panjang.
 */

/* ------------------------------ 1. Rak mi ------------------------------ */
const SUARA_A1 = "Pak Anto, penjual mi instan, mengecek rak toko Pak Joko.";
const SUARA_A2 = "Pagi tadi ada enam puluh delapan bungkus mi di rak, lalu terjual tiga puluh lima.";
const SUARA_A3 = "Berapa sisanya? Pak Anto perlu tahu supaya bisa mengirim mi baru.";

export const ADEGAN_RAK_MI: AdeganStory = {
  id: "rak-mi",
  judul: "Pak Anto mengecek rak mi",
  sumber: "Materi: pengurangan dan sisa stok",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_A1,
      bersih(0),
      tambah(0, judul("Toko Pak Joko"), ...tokoLatar("tk")),
      tambah("penjual", ...tokoh("pa", 40, 172, "Pak Anto")),
      tambah("rak", ...rakKayu("rk", 100, 36, 190, 108, 3)),
      tambah("Joko.", ...tokoh("pj", 270, 172, "Pak Joko")),
    ),
    k(
      SUARA_A2,
      tambah("enam", kotak("pn-k", 10, 40, 80, 46, W.kuning, W.biru, { rx: 8 }), teks("pn-t0", 50, 54, "Rak mi", 9), teks("pn-t1", 50, 79, "68", 20)),
      tambah("bungkus", ...barisKardus("kd", 108, 53, 6, 24), ...barisBungkus("bg", 108, 97, 8, 13)),
      tambah("terjual", kotak("tj-k", 10, 92, 80, 46, W.merahMuda, W.biru, { rx: 8 }), teks("tj-t0", 50, 106, "Terjual", 9), emo("tj-e", 76, 124, E.kaget, 14)),
      tambah("lima.", teks("tj-t1", 40, 131, "35", 20)),
    ),
    k(
      SUARA_A3,
      tambah(0, emo("tz", 40, 140, E.pikir, 20)),
      tambah("perlu", ...catatan("ct", 60, 146, 32, 20, 2)),
      tambah("mengirim", ...troli("tr", 124, 154, 44, 12), emo("kb", 146, 154, E.kardus, 16)),
    ),
  ],
};

/* ------------------------------ 2. Susun pendek ------------------------------ */
const SUARA_B1 = "Tulis enam puluh delapan di atas dan tiga puluh lima di bawah, puluhan lurus dengan puluhan.";
const SUARA_B2 = "Kurangi satuan dulu: delapan dikurangi lima sama dengan tiga.";
const SUARA_B3 = "Lalu puluhan: enam dikurangi tiga sama dengan tiga. Sisanya tiga puluh tiga bungkus.";

export const ADEGAN_SUSUN_KURANG: AdeganStory = {
  id: "susun-kurang",
  judul: "Susun pendek: enam puluh delapan dikurangi tiga puluh lima",
  sumber: "Materi: susun pendek tanpa meminjam",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_B1,
      bersih(0),
      tambah(0, judul("Susun Pendek"), ...tokoLatar("tk"), ...papanKapur("pk", 14, 34, 150, 120)),
      tambah("delapan", kapur("sn-a", 112, 76, "68", 26, { anchor: "end" })),
      tambah("lima", kapur("sn-m", 70, 106, "-", 26), kapur("sn-b", 112, 106, "35", 26, { anchor: "end" }), garis("sn-g", 58, 113, 64, 0, "#F8FAFC", 1.8, { z: 3 })),
      tambah("puluhan", kotak("cp", 82, 56, 16, 62, "#FACC15", undefined, { op: 0.3, putus: true, z: 2 }), teks("lp", 88, 148, "puluhan", 7, "#BBF7D0", { z: 3 })),
      tambah("puluhan@2", kotak("cs", 98, 56, 15, 62, "#F97316", undefined, { op: 0.3, putus: true, z: 2 }), teks("ls", 120, 148, "satuan", 7, "#BBF7D0", { z: 3 })),
    ),
    k(
      SUARA_B2,
      sorotkan("Kurangi", "cs"),
      tambah("delapan", ...kartu("k1", 176, 50, 118, 30, W.kuning, ["8 - 5 = 3"], 13)),
      tambah("tiga.", kapur("hs", 112, 138, "3", 26, { anchor: "end" })),
    ),
    k(
      SUARA_B3,
      ubah("Lalu", { id: "cs", sorot: false }),
      sorotkan("Lalu", "cp"),
      tambah("enam", ...kartu("k2", 176, 90, 118, 30, W.hijauMuda, ["6 - 3 = 3"], 13)),
      ubah("Sisanya", { id: "hs", isi: "33" }),
      tambah("bungkus.", ...kartu("k3", 176, 130, 118, 28, W.krem, ["33 bungkus"], 12)),
    ),
  ],
};

/* ------------------------------ 3. Susun panjang ------------------------------ */
const SUARA_C1 = "Salsa memakai susun panjang: enam puluh delapan jadi enam puluh dan delapan, tiga puluh lima jadi tiga puluh dan lima.";
const SUARA_C2 = "Enam puluh dikurangi tiga puluh hasilnya tiga puluh. Delapan dikurangi lima hasilnya tiga.";
const SUARA_C3 = "Tiga puluh ditambah tiga sama dengan tiga puluh tiga, cocok dengan susun pendek.";

export const ADEGAN_SUSUN_PANJANG_KURANG: AdeganStory = {
  id: "susun-panjang-kurang",
  judul: "Susun panjang di kertas catatan Salsa",
  sumber: "Materi: susun panjang pengurangan",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_C1,
      bersih(0),
      tambah(0, judul("Susun Panjang"), ...tokoLatar("tk"), ...catatan("ct", 70, 36, 220, 120, 5)),
      tambah("Salsa", ...tokoh("sl", 38, 172, "Salsa")),
      tambah("enam", teks("u1", 180, 66, "68 = 60 + 8", 15, W.biru, { z: 4 })),
      tambah("tiga", teks("u2", 180, 100, "35 = 30 + 5", 15, W.biru, { z: 4 })),
    ),
    k(
      SUARA_C2,
      tambah("Enam", teks("h1", 180, 126, "60 - 30 = 30", 14, W.hijau, { z: 4 })),
      sorotkan("Enam", "u1"),
      tambah("Delapan", teks("h2", 180, 146, "8 - 5 = 3", 14, W.hijau, { z: 4 })),
      tambah("tiga@3", emo("ok1", 270, 130, E.benar, 16)),
    ),
    k(
      SUARA_C3,
      hapus("Tiga", "ok1"),
      tambah("Tiga", teks("gh", 100, 146, "30 + 3 = 33", 13, W.merahTua, { z: 4 }), panah("pg", 148, 134, -12, 8, W.merah, 2.4)),
      tambah("sama", ...kartu("ps", 232, 128, 54, 28, W.krem, ["33"], 16)),
      tambah("pendek.", emo("ok2", 270, 124, E.benar, 20)),
    ),
  ],
};
