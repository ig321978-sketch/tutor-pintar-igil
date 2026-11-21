import type { AdeganStory } from "./logika-story";
import { E, W, emo, ids, judul, kartu, kisi, kotak, pecah, teks, tokoh } from "./k4b2d-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah, warnai } from "./k4b2d-bantu";

/*
 * Cerita orisinal IGIL "Meteran Kain Pak Bagas" (Kelas 4 Bab 2 Sub-Bab D), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b2d.md. Bagian ini: Hundredths Grid (Kisi Perseratusan), Fraction Decimal Bridge (Jembatan Desimal), terapannya, dan ringkasan.
 */
const JINGGA = "#FDBA74";
/** Papan besar krem untuk adegan metode global: bingkai `pt-k`, tinggi h. */
const papan = (h = 124) => kotak("pt-k", 8, 28, 284, h, "#FFFBEB", W.coklat, { tebal: 2.4, z: 0 });
/** Jembatan dua kotak: kotak kiri `jk-k`, kotak kanan `jn-k`, papan jembatan `pl`, tiang `pt1` dan `pt2`; pojok kiri-atas kotak (x kiri 24, x kanan 198) pada tinggi y. */
const jembatan = (y: number, h: number) => [
  kotak("jk-k", 24, y, 78, h, "#C7D2FE", W.biru),
  kotak("jn-k", 198, y, 78, h, "#FCE7F3", W.biru),
  kotak("pl", 100, y + 28, 100, 8, "#B7814A", W.coklat, { z: 2 }),
  kotak("pt1", 104, y + 36, 6, 22, "#B7814A", W.coklat),
  kotak("pt2", 190, y + 36, 6, 22, "#B7814A", W.coklat),
];

/* ------------------------------ Hundredths Grid: konsep ------------------------------ */
const SUARA_P1 = "Cara kedua, Hundredths Grid, atau Kisi Perseratusan.";
const SUARA_P2 = "Kita menggambar kisi sepuluh kali sepuluh, jadi ada seratus kotak kecil sama besar.";
const SUARA_P3 = "Setiap kotak kecil adalah satu per seratus, dan sepuluh kotak dalam satu baris adalah satu per sepuluh.";
const SUARA_P4 = "Banyak kotak yang diwarnai menjadi dua angka di belakang koma.";
const KS = ids("ks", 0, 99);

export const ADEGAN_LUAR_PERSERATUS: AdeganStory = {
  id: "luar-perseratus",
  judul: "Hundredths Grid: Kisi Perseratusan",
  sumber: "Metode global: Hundredths Grid (konsep)",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Cara 2: Hundredths Grid"), papan()),
      tambah("Hundredths", teks("nm", 150, 66, "Hundredths Grid", 16, W.merah, { z: 2 })),
      tambah("Kisi", teks("ni", 150, 92, "Kisi Perseratusan", 12, W.biru, { z: 2 })),
      tambah("Perseratusan.", emo("kk", 150, 136, E.wol, 32, { z: 2 })),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Sepuluh Kali Sepuluh"), papan()),
      tambah("menggambar", ...kisi("ks", 24, 40, 14, 9)),
      tambah("sepuluh", teks("a10", 224, 64, "10 kali 10", 11, W.ungu, { z: 2 })),
      tambah("seratus", teks("a100", 224, 100, "100 kotak", 12, W.merah, { z: 2 })),
    ),
    k(
      SUARA_P3,
      hapus("Setiap", "a10", "a100"),
      warnai("Setiap", JINGGA, "ks0"),
      tambah("Setiap", teks("u1", 224, 60, "1 kotak = 1/100", 10, W.merah, { z: 2 })),
      warnai("sepuluh", JINGGA, ...KS.slice(1, 10)),
      tambah("sepuluh", teks("u2", 224, 96, "10 kotak = 1/10", 10, W.ungu, { z: 2 })),
    ),
    k(
      SUARA_P4,
      warnai("diwarnai", JINGGA, ...KS.slice(10, 17)),
      tambah("dua", teks("d2", 224, 146, "2 angka", 12, W.merah, { z: 2 })),
      tambah("koma.", teks("dc", 224, 124, "0,17", 22, W.biru, { z: 2 })),
    ),
  ],
};

/* ------------------------------ Hundredths Grid: terapan ------------------------------ */
const SUARA_Q1 = "Genta mewarnai tiga puluh lima kotak pada kisi seratus.";
const SUARA_Q2 = "Tiga puluh lima per seratus ditulis nol koma tiga lima.";
const SUARA_Q3 = "Cocok untuk pecahan per seratus, karena setiap kotak mewakili satu bagian.";
const SUARA_Q4 = "Kurang cocok kalau mewarnai banyak kotak, karena menghitungnya agak lama.";
const KT = ids("kt", 0, 99);

export const ADEGAN_LUAR_PERSERATUS_TERAPAN: AdeganStory = {
  id: "luar-perseratus-terapan",
  judul: "Kisi Perseratusan: kapan cocok",
  sumber: "Metode global: Hundredths Grid (terapan)",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Genta Mewarnai"), papan(112), ...tokoh("gn", 40, 184, "Genta")),
      tambah("mewarnai", ...kisi("kt", 24, 36, 12, 8)),
      warnai("tiga", JINGGA, ...KT.slice(0, 35)),
      tambah("lima", teks("l35", 230, 70, "35 kotak", 12, W.merah, { z: 2 })),
      tambah("seratus", teks("l100", 230, 100, "100 kotak", 12, W.ungu, { z: 2 })),
    ),
    k(
      SUARA_Q2,
      hapus("Tiga", "l35", "l100"),
      tambah("Tiga", ...pecah("pc", 190, 70, "35", "100", 22)),
      tambah("ditulis", teks("sm", 226, 88, "=", 22, W.merah)),
      tambah("nol", teks("dc", 260, 88, "0,35", 22, W.biru)),
    ),
    k(
      SUARA_Q3,
      tambah("Cocok", emo("ok", 40, 128, E.benar, 22)),
      tambah("satu", teks("s1", 230, 126, "1 kotak: 1 bagian", 10, W.hijauTua)),
    ),
    k(
      SUARA_Q4,
      hapus("Kurang", "ok", "s1"),
      tambah("Kurang", emo("xs", 40, 128, E.salah, 22)),
      tambah("menghitungnya", teks("lm", 230, 126, "menghitung: lama", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ Fraction Decimal Bridge: konsep ------------------------------ */
const SUARA_B1 = "Cara ketiga, Fraction Decimal Bridge, atau Jembatan Desimal.";
const SUARA_B2 = "Kita menulis pecahan di satu sisi dan desimal di sisi lain, lalu menghubungkannya seperti jembatan.";
const SUARA_B3 = "Penyebut sepuluh memberi satu angka di belakang koma, dan penyebut seratus memberi dua angka.";
const SUARA_B4 = "Pembilangnya ditulis sebagai angka di belakang koma, dengan nol di depannya kalau tempatnya kurang.";

export const ADEGAN_LUAR_JEMBATAN: AdeganStory = {
  id: "luar-jembatan",
  judul: "Fraction Decimal Bridge: Jembatan Desimal",
  sumber: "Metode global: Fraction Decimal Bridge (konsep)",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Cara 3: Fraction Decimal Bridge"), papan()),
      tambah("Fraction", teks("nm", 150, 66, "Fraction Decimal Bridge", 14, W.merah, { z: 2 })),
      tambah("Jembatan", teks("ni", 150, 92, "Jembatan Desimal", 12, W.biru, { z: 2 })),
      tambah("Desimal.", emo("kk", 150, 136, E.pita, 32, { z: 2 })),
    ),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, judul("Dua Sisi"), papan()),
      tambah("menulis", jembatan(56, 70)[0], teks("jk-t", 63, 70, "pecahan", 11, W.biru, { z: 2 })),
      tambah("satu", teks("s1", 63, 48, "sisi 1", 10, W.coklat, { z: 2 })),
      tambah("desimal", jembatan(56, 70)[1], teks("jn-t", 237, 70, "desimal", 11, W.biru, { z: 2 }), teks("s2", 237, 48, "sisi 2", 10, W.coklat, { z: 2 })),
      tambah("jembatan.", ...jembatan(56, 70).slice(2)),
    ),
    k(
      SUARA_B3,
      tambah("Penyebut", ...pecah("p1", 63, 100, "3", "10", 16)),
      tambah("memberi", teks("d1", 237, 108, "0,3", 22, W.biru, { z: 2 })),
      tambah("satu", teks("n1", 150, 136, "10 → 1 angka", 10, W.merah, { z: 2 })),
      tambah("seratus", teks("n2", 150, 148, "100 → 2 angka", 10, W.merah, { z: 2 })),
    ),
    k(
      SUARA_B4,
      hapus("Pembilangnya", "p1-a", "p1-g", "p1-b", "d1", "n1", "n2"),
      tambah("Pembilangnya", ...pecah("p3", 63, 100, "7", "100", 16)),
      tambah("angka", teks("d3", 237, 108, "0,07", 22, W.biru, { z: 2 })),
      tambah("nol", teks("nk", 150, 138, "nol di depan", 10, W.merah, { z: 2 })),
    ),
  ],
};

/* ------------------------------ Fraction Decimal Bridge: terapan ------------------------------ */
const SUARA_R1 = "Satria mengubah sembilan per seratus menjadi desimal.";
const SUARA_R2 = "Penyebut seratus berarti dua angka, jadi sembilan ditulis nol sembilan, yaitu nol koma nol sembilan.";
const SUARA_R3 = "Cocok untuk mengubah pecahan ke desimal dengan cepat tanpa menggambar.";
const SUARA_R4 = "Kurang cocok kalau kita lupa nol penjaga tempat, karena desimalnya jadi berbeda.";

export const ADEGAN_LUAR_JEMBATAN_TERAPAN: AdeganStory = {
  id: "luar-jembatan-terapan",
  judul: "Jembatan Desimal: kapan cocok",
  sumber: "Metode global: Fraction Decimal Bridge (terapan)",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Satria Mengubah"), papan(112), ...tokoh("st", 40, 184, "Satria")),
      tambah("mengubah", ...jembatan(40, 70)),
      tambah("sembilan", ...pecah("pc", 63, 78, "9", "100", 16)),
      tambah("seratus", teks("q", 237, 86, "?", 26, W.tanya, { z: 2 })),
    ),
    k(
      SUARA_R2,
      tambah("dua", teks("n2", 150, 124, "100 → 2 angka", 10, W.merah)),
      tambah("sembilan", teks("z", 150, 98, "09", 14, W.merah)),
      ubah("yaitu", { id: "q", isi: "0,09", warna: W.biru, u: 22 }),
    ),
    k(
      SUARA_R3,
      tambah("Cocok", emo("ok", 40, 128, E.benar, 22)),
      tambah("cepat", teks("cp", 237, 128, "cepat", 10, W.hijauTua)),
    ),
    k(
      SUARA_R4,
      hapus("Kurang", "ok", "cp"),
      tambah("Kurang", emo("xs", 40, 128, E.salah, 22)),
      ubah("lupa", { id: "q", isi: "0,9", warna: W.merah }),
      tambah("berbeda.", teks("be", 237, 128, "jadi berbeda", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_G1 = "Tiga cara sudah kita lihat bersama Pak Bagas. Mana yang pas tergantung keadaan.";
const SUARA_G2 = "Ingin melihat persepuluhan dengan gambar, pakai Kisi Persepuluhan. Ingin dua angka di belakang koma, pakai Kisi Perseratusan.";
const SUARA_G3 = "Ingin mengubah dengan cepat, pakai Jembatan Desimal. Apa pun caranya, hitung dulu banyak angka di belakang koma.";
const SUARA_G4 = "Menurutmu, untuk mengubah empat puluh lima per seratus, cara mana yang paling pas?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Metode global: ringkasan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Tiga Cara Pak Bagas"), ...kartu("r0", 14, 40, 84, 52, "#FEE2E2", ["Kisi", "Persepuluhan"], 10), teks("n3", 150, 118, "3 cara", 11, W.ungu)),
      tambah("lihat", ...kartu("r1", 108, 40, 84, 52, "#DBEAFE", ["Kisi", "Perseratusan"], 10)),
      tambah("Bagas.", ...tokoh("pb", 262, 184, "Pak Bagas"), ...kartu("r2", 202, 40, 84, 52, "#DCFCE7", ["Jembatan", "Desimal"], 10)),
    ),
    k(
      SUARA_G2,
      sorotkan("persepuluhan", "r0-k"),
      tambah("dua", teks("n2", 150, 140, "2 angka koma", 11, W.merah)),
      redamkan("dua", "r0-k"),
      sorotkan("Perseratusan.", "r1-k"),
    ),
    k(
      SUARA_G3,
      redamkan("Jembatan", "r1-k"),
      sorotkan("Jembatan", "r2-k"),
      tambah("caranya,", emo("mt", 262, 130, E.penggaris, 22)),
      tambah("hitung", teks("hk", 120, 172, "hitung angka koma", 10, W.hijauTua)),
    ),
    k(
      SUARA_G4,
      hapus("Menurutmu,", "n3", "n2", "hk", "mt"),
      tambah("empat", ...pecah("q", 120, 118, "45", "100", 18)),
      tambah("pas?", emo("tq", 190, 130, E.tanya, 28)),
    ),
  ],
};
