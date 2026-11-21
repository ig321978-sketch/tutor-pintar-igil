import type { AdeganStory } from "./logika-story";
import { E, W, bil, busur, emo, garis, idDari, judul, kartu, kotak, lapangan, panah, panggung, teks, tokoh } from "./k4b3b-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k4b3b-bantu";

/*
 * Cerita orisinal IGIL "Barisan Kursi Pak Gunawan" (Kelas 4 Bab 3 Sub-Bab B), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b3b.md. Bagian ini: pembuka (kotak perkakas Pak Gunawan), Jump Chain (Rantai Loncat), dan terapannya.
 */

export const NAMA_METODE = ["Jump Chain", "Rule Machine", "Position Table"] as const;
export const NAMA_METODE_ID = ["Rantai Loncat", "Mesin Aturan", "Tabel Urutan"] as const;

const MIN = "−";
const KUNING_KARTU = "#FEF3C7";

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Malam itu, di belakang panggung, Pak Gunawan membuka kotak perkakas yang berisi pita bernomor.";
const SUARA_O2 = "Di dalamnya ada tiga cara supaya pola bilangan mudah dilanjutkan, tanpa tersesat.";
const SUARA_O3 = "Tiga cara itu: Jump Chain, Rule Machine, dan Position Table.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Rantai Loncat, Mesin Aturan, dan Tabel Urutan.";
const KOTAK = [kotak("kp", 96, 128, 56, 22, "#C99A63", W.coklat, { rx: 3, z: 1 }), kotak("kt", 92, 120, 64, 10, "#A16207", W.coklat, { rx: 3, z: 2 }), ...[0, 1, 2].map((i) => kotak(`pi${i}`, 102 + i * 16, 104, 12, 16, W.putih, W.biru, { rx: 2, z: 2 }))];

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Kotak perkakas Pak Gunawan",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Malam di Belakang Panggung"), ...lapangan("lp", 150)),
      tambah("panggung", ...panggung("pt", 150, 60, 130, "PANGGUNG", 150)),
      tambah("Gunawan", ...tokoh("pg", 52, 184, "Pak Gunawan")),
      tambah("kotak", ...KOTAK.slice(0, 2)),
      tambah("pita", ...KOTAK.slice(2)),
    ),
    k(
      SUARA_O2,
      hapus(0, ...idDari(KOTAK)),
      tambah("tiga", teks("n3", 236, 138, "3 cara", 11, W.ungu)),
      tambah("pola", ...kartu("cp", 14, 84, 100, 34, KUNING_KARTU, ["pola bilangan"], 10)),
      tambah("tersesat", emo("ok", 130, 108, E.benar, 20), teks("tl", 80, 140, "tidak tersesat", 9, W.hijauTua)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara"), teks("n3", 260, 40, "3 cara", 10, W.ungu)),
      tambah("Jump", teks("m0", 118, 70, "1. Jump Chain", 10, W.biru), emo("i0", 28, 72, E.rantai, 16)),
      tambah("Rule", teks("m1", 118, 120, "2. Rule Machine", 10, W.biru), emo("i1", 28, 122, E.mesin, 16)),
      tambah("Position", teks("m2", 118, 170, "3. Position Table", 10, W.biru), emo("i2", 28, 172, E.tabel, 16)),
    ),
    k(
      SUARA_O4,
      tambah("Rantai", teks("g0", 244, 70, "Rantai Loncat", 8, W.ungu), garis("l0", 204, 74, 80, 0, W.ungu, 1)),
      tambah("Mesin", teks("g1", 244, 120, "Mesin Aturan", 8, W.ungu), garis("l1", 204, 124, 80, 0, W.ungu, 1)),
      tambah("Tabel", teks("g2", 244, 170, "Tabel Urutan", 8, W.ungu), garis("l2", 204, 174, 80, 0, W.ungu, 1)),
    ),
  ],
};

/* ------------------------------ Jump Chain: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Jump Chain, atau Rantai Loncat.";
const SUARA_C2 = "Kita menulis bilangan di garis, lalu menggambar loncatan dari satu bilangan ke bilangan berikutnya.";
const SUARA_C3 = "Tiap loncatan memuat beda yang sama, dan arahnya menunjukkan membesar atau mengecil.";
const SUARA_C4 = "Dengan rantai, kita bisa melihat urutan bilangan sekaligus bedanya.";

export const ADEGAN_LUAR_RANTAI: AdeganStory = {
  id: "luar-rantai",
  judul: "Jump Chain: Rantai Loncat",
  sumber: "Metode global: Jump Chain (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 1: Jump Chain"), ...lapangan("lp", 150)),
      tambah("Jump", emo("jr", 150, 104, E.rantai, 36)),
      tambah("Rantai", teks("nm", 150, 140, "Rantai Loncat", 13, W.ungu)),
    ),
    k(
      SUARA_C2,
      hapus(0, "jr", "nm"),
      tambah("garis", garis("gl", 20, 104, 260, 0, W.coklat, 2, { z: 0 })),
      tambah("bilangan", ...bil("c0", 60, 104, "6"), ...bil("c1", 150, 104, "10"), ...bil("c2", 240, 104, "14")),
      tambah("loncatan", ...busur("a0", 60, 150, 90, 22, "?")),
      tambah("satu", teks("sl", 150, 136, "1 loncatan", 10, W.coklat)),
      tambah("berikutnya", ...busur("a1", 150, 240, 90, 22, "?")),
    ),
    k(
      SUARA_C3,
      ubah("beda", { id: "a0-l", isi: "+4", warna: W.hijauTua }, { id: "a1-l", isi: "+4", warna: W.hijauTua }),
      tambah("membesar", emo("up", 60, 150, E.naik, 20), teks("mb", 60, 134, "membesar", 11, W.hijauTua)),
      tambah("mengecil", emo("dn", 240, 150, E.turun, 20), teks("mk", 240, 134, "mengecil", 11, W.merah)),
    ),
    k(
      SUARA_C4,
      sorotkan("rantai", "c0", "c1", "c2"),
      tambah("melihat", emo("ey", 150, 170, E.mata, 22)),
      sorotkan("bedanya", "a0-l", "a1-l"),
    ),
  ],
};

/* ------------------------------ Jump Chain: terapan ------------------------------ */
const SUARA_P1 = "Genta menarik rantai dari dua belas, lalu tiga loncatan tambah tiga.";
const SUARA_P2 = "Ia sampai di dua puluh satu, dan menghitung bahwa loncatannya satu kurang dari nomor barisnya.";
const SUARA_P3 = "Cocok untuk pola pendek, karena setiap loncatan tampak jelas.";
const SUARA_P4 = "Kurang cocok untuk nomor yang sangat jauh, karena rantainya akan terlalu panjang.";
const XT = [50, 120, 190, 260];

export const ADEGAN_LUAR_RANTAI_TERAPAN: AdeganStory = {
  id: "luar-rantai-terapan",
  judul: "Jump Chain: terapan",
  sumber: "Metode global: Jump Chain (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Rantai dari Dua Belas"), ...lapangan("lp", 150)),
      tambah("Genta", ...tokoh("ge", 36, 184, "Genta")),
      tambah("dua", ...bil("c0", XT[0], 100, "12")),
      tambah("tiga", teks("n3", 150, 40, "3 loncatan", 12, W.ungu), ...[1, 2, 3].flatMap((i) => bil(`c${i}`, XT[i], 100, "?", 12, 14, true)), ...[0, 1, 2].flatMap((i) => busur(`a${i}`, XT[i], XT[i + 1], 86, 22, "?"))),
      ubah("tiga@2", { id: "a0-l", isi: "+3", warna: W.hijauTua }, { id: "a1-l", isi: "+3", warna: W.hijauTua }, { id: "a2-l", isi: "+3", warna: W.hijauTua }),
    ),
    k(
      SUARA_P2,
      ubah("sampai", { id: "c1-t", isi: "15" }, { id: "c2-t", isi: "18" }, { id: "c1", putus: false }, { id: "c2", putus: false }),
      ubah("dua", { id: "c3-t", isi: "21", warna: W.merah }, { id: "c3", putus: false }),
      tambah("satu@2", teks("hb", 150, 132, `4 ${MIN} 1 = 3`, 13, W.merah)),
    ),
    k(
      SUARA_P3,
      hapus(0, "hb"),
      tambah("Cocok", emo("jp", 262, 140, E.jempol, 22)),
      tambah("pendek", teks("pp", 150, 132, "pola pendek", 11, W.hijauTua)),
      tambah("jelas", emo("ey", 150, 156, E.mata, 20)),
    ),
    k(
      SUARA_P4,
      hapus(0, "jp", "pp", "ey"),
      tambah(0, emo("xs", 262, 140, E.salah, 22)),
      tambah("jauh", teks("nj", 150, 132, "nomor jauh", 11, W.merah)),
      tambah("rantainya", panah("pj", 50, 122, 200, 0, W.ungu, 2, { putus: true, z: 4 })),
      tambah("panjang", teks("pg2", 150, 148, "terlalu panjang", 10, W.merah)),
    ),
  ],
};
