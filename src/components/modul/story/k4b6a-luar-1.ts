import type { AdeganStory } from "./logika-story";
import { E, W, deret, emo, judul, kotak, papanData, tanah, teks, tenda, lampuBohlam, tokoh } from "./k4b6a-gambar";
import { bersih, hapus, k, tambah } from "./k4b6a-bantu";

/*
 * Cerita orisinal IGIL "Piktogram Jajanan Bu Rini" (Kelas 4 Bab 6 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b6a.md. Bagian ini: pembuka (catatan jualan yang menumpuk), Count the Icons (Hitung Ikon), dan terapannya.
 */

export const NAMA_METODE = ["Count the Icons", "Table to Picture", "Rank and Compare"] as const;
export const NAMA_METODE_ID = ["Hitung Ikon", "Tabel ke Gambar", "Urutkan dan Banding"] as const;

export const KP = { merah: "#FCA5A5", biru: "#BAE6FD", kapur: "#FEF9C3", hijau: "#86EFAC" };

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Siang itu, di tenda Bu Rini, tumpukan catatan hasil jualan menunggu dirapikan menjadi gambar.";
const SUARA_O2 = "Ada tiga cara supaya data jajanan mudah dibaca, tanpa salah hitung dan tanpa salah banding.";
const SUARA_O3 = "Tiga cara itu: Count the Icons, Table to Picture, dan Rank and Compare.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Hitung Ikon, Tabel ke Gambar, dan Urutkan dan Banding.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Catatan jualan Bu Rini",
  sumber: "Metode global: pembuka",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Siang di Tenda Bu Rini"), ...tanah("tn", 150)),
      tambah("tenda", ...tenda("td", 172, 40, 116, 80), ...lampuBohlam("lp", 178, 282, 58, 7)),
      tambah("Bu", ...tokoh("br", 60, 184, "Bu Rini")),
      tambah("tumpukan", kotak("c1", 100, 134, 46, 8, W.putih, W.coklat, { rx: 1, tebal: 1.2, z: 1 }), kotak("c2", 104, 126, 46, 8, W.krem, W.coklat, { rx: 1, tebal: 1.2, z: 2 }), kotak("c3", 98, 118, 46, 8, W.putih, W.coklat, { rx: 1, tebal: 1.2, z: 3 })),
      tambah("catatan", teks("ct", 122, 110, "catatan jualan", 8, W.coklat)),
      tambah("dirapikan", emo("rp", 214, 150, E.catat, 18)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga Cara"), ...tanah("tn", 150), teks("n3", 260, 40, "3 cara", 10, W.merah)),
      tambah("cara", ...[0, 1, 2].flatMap((i) => [kotak(`c${i}-k`, 20 + i * 92, 56, 80, 36, "#FDE68A", W.coklat, { rx: 4 }), teks(`c${i}-t`, 60 + i * 92, 79, "cara", 9, W.coklat)])),
      tambah("mudah", emo("ok", 150, 126, E.benar, 22)),
      tambah("salah", emo("x1", 60, 126, E.salah, 18), emo("x2", 240, 126, E.salah, 18)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara"), teks("n3", 260, 40, "3 cara", 10, W.merah)),
      tambah("Count", teks("m0", 112, 70, "1. Count the Icons", 10, W.hijauTua), emo("i0", 30, 72, E.bakso, 16)),
      tambah("Table", teks("m1", 112, 120, "2. Table to Picture", 10, W.hijauTua), emo("i1", 30, 122, E.catat, 16)),
      tambah("Rank", teks("m2", 112, 170, "3. Rank and Compare", 10, W.hijauTua), emo("i2", 30, 172, E.bintang, 16)),
    ),
    k(
      SUARA_O4,
      tambah("Nama", kotak("bk", 196, 52, 100, 130, "#14532D", W.putih, { rx: 6, tebal: 1, z: -1 })),
      tambah("Hitung", teks("g0", 246, 70, "Hitung Ikon", 9, W.sorot)),
      tambah("Tabel", teks("g1", 246, 120, "Tabel ke Gambar", 8.4, W.sorot)),
      tambah("Urutkan", teks("g2", 246, 170, "Urutkan dan Banding", 7.6, W.sorot)),
    ),
  ],
};

/* ------------------------------ Count the Icons: konsep ------------------------------ */
const SUARA_H1 = "Cara pertama, Count the Icons, atau Hitung Ikon.";
const SUARA_H2 = "Kita membaca keterangan lebih dulu, lalu menghitung ikon pada setiap baris.";
const SUARA_H3 = "Banyak ikon dikalikan dengan banyak yang diwakili satu ikon, dan hasilnya adalah banyak data.";
const SUARA_H4 = "Satuan harus ikut ditulis, misalnya porsi, supaya angkanya punya arti.";

export const ADEGAN_LUAR_HITUNG: AdeganStory = {
  id: "luar-hitung",
  judul: "Count the Icons: Hitung Ikon",
  sumber: "Metode global: Count the Icons (konsep)",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Cara 1: Count the Icons"), ...papanData("pt", 8, 28, 284, 132)),
      tambah("Count", teks("nm", 150, 62, "Count the Icons", 13, KP.merah, { z: 3 })),
      tambah("Hitung", teks("ni", 150, 82, "Hitung Ikon", 10, KP.kapur, { z: 3 })),
      tambah("Ikon.", emo("ik", 150, 128, E.bakso, 24, { z: 3 })),
    ),
    k(
      SUARA_H2,
      hapus(0, "nm", "ni", "ik"),
      tambah("keterangan", kotak("kt", 100, 44, 100, 22, W.krem, W.coklat, { rx: 3, tebal: 1.4, z: 3 }), teks("kt1", 150, 59, "1 ikon = ?", 9, W.merah, { z: 4 })),
      tambah("menghitung", ...deret("d", 70, 110, E.risoles, 5, 24, 16)),
      tambah("baris.", teks("br", 235, 110, "tiap baris", 8.4, KP.kapur, { z: 3 })),
    ),
    k(
      SUARA_H3,
      hapus(0, "kt", "kt1", "br"),
      tambah("Banyak", teks("e1", 150, 60, "banyak ikon", 10, KP.biru, { z: 3 })),
      tambah("dikalikan", teks("e2", 150, 76, "×", 12, KP.merah, { z: 3 })),
      tambah("diwakili", teks("e3", 150, 92, "keterangan", 10, KP.biru, { z: 3 })),
      tambah("hasilnya", teks("e4", 150, 146, "= banyak data", 10, KP.kapur, { z: 3 })),
    ),
    k(
      SUARA_H4,
      hapus(0, "e1", "e2", "e3", "e4", ...[0, 1, 2, 3, 4].map((i) => `d${i}`)),
      tambah("Satuan", teks("s1", 150, 60, "30 porsi", 14, KP.kapur, { z: 3 })),
      tambah("ditulis,", kotak("sb", 150, 66, 54, 18, undefined, KP.merah, { rx: 3, tebal: 1.6, putus: true, z: 3 })),
      tambah("angkanya", teks("s2", 150, 128, "angka tanpa satuan: apa artinya?", 8.4, KP.merah, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Count the Icons: terapan ------------------------------ */
const SUARA_T1 = "Laras membaca papan es teh Bu Rini, dengan keterangan satu ikon sama dengan sepuluh gelas.";
const SUARA_T2 = "Ada tujuh ikon, jadi tujuh kali sepuluh sama dengan tujuh puluh gelas.";
const SUARA_T3 = "Cocok untuk membaca piktogram yang sudah jadi, karena langkahnya pendek dan jelas.";
const SUARA_T4 = "Kurang cocok kalau data tidak habis dibagi keterangan, karena ikonnya harus dipotong.";

export const ADEGAN_LUAR_HITUNG_TERAPAN: AdeganStory = {
  id: "luar-hitung-terapan",
  judul: "Hitung Ikon: kapan cocok",
  sumber: "Metode global: Count the Icons (terapan)",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Papan Es Teh"), ...papanData("pt", 8, 28, 284, 124), ...tokoh("lr", 40, 184, "Laras")),
      tambah("papan", teks("et", 150, 54, "es teh", 11, KP.kapur, { z: 3 })),
      tambah("keterangan", kotak("kt", 170, 40, 112, 22, W.krem, W.coklat, { rx: 3, tebal: 1.4, z: 3 }), teks("kt1", 226, 55, "1 ikon = 10 gelas", 8.4, W.merah, { z: 4 })),
    ),
    k(
      SUARA_T2,
      tambah("tujuh", ...deret("g", 40, 100, E.cincau, 7, 28, 18)),
      tambah("kali", teks("h1", 150, 128, "7 × 10", 11, KP.biru, { z: 3 })),
      tambah("tujuh@2", teks("h2", 230, 128, "= 70 gelas", 11, KP.kapur, { z: 3 })),
    ),
    k(
      SUARA_T3,
      hapus(0, "h1", "h2"),
      tambah("Cocok", emo("ok", 270, 56, E.benar, 22, { z: 3 })),
      tambah("sudah", teks("jd", 150, 128, "piktogram sudah jadi", 9, KP.kapur, { z: 3 })),
      tambah("pendek", teks("pd", 150, 144, "langkah pendek", 8.4, KP.biru, { z: 3 })),
    ),
    k(
      SUARA_T4,
      hapus(0, "ok", "jd", "pd", "et", "kt", "kt1", ...[0, 1, 2, 3, 4, 5, 6].map((i) => `g${i}`)),
      tambah("Kurang", emo("xs", 270, 56, E.salah, 22, { z: 3 })),
      tambah("habis", teks("hb", 150, 70, "15 : 10 = ?", 14, KP.merah, { z: 3 })),
      tambah("dipotong.", teks("pt2", 150, 120, "ikon harus dipotong", 9, KP.kapur, { z: 3 })),
    ),
  ],
};
