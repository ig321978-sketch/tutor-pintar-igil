import type { AdeganStory } from "./logika-story";
import { W, WARNA_APEL, bagianKotak, bagianLingkaran, emo, garisPotong, idBagian, judul, kartu, labelBagian } from "./k2b5C-gambar";
import { hapus, idx, k, redamkan, sorotkan, tambah } from "./k2b5C-bantu";

/* ------------------------------ 6. Apel dipotong dua kali ------------------------------ */
const AP_UTUH = bagianLingkaran("ap", 150, 100, 58, [360], -90, WARNA_APEL);
const AP_DUA = bagianLingkaran("ap", 150, 100, 58, [180, 180], -90, WARNA_APEL);
const AP_EMPAT = bagianLingkaran("ap", 150, 100, 58, [90, 90, 90, 90], -90, WARNA_APEL);

const SUARA_S1 = "Mulai dari satu apel utuh. Apel ini masih belum dipotong sama sekali.";
const SUARA_S2 = "Apel dipotong menjadi dua bagian yang sama besar. Setiap bagian adalah setengah apel.";
const SUARA_S3 = "Sekarang setiap setengah apel dipotong lagi. Hasilnya empat bagian yang sama besar.";
const SUARA_S4 = "Setiap bagian sekarang adalah seperempat apel. Seperempat adalah setengah dari setengah.";
const SUARA_S5 = "Perhatikan, makin banyak potongannya, makin kecil tiap bagiannya. Tetapi semua bagian tetap sama besar.";

export const ADEGAN_SETENGAH_DULU: AdeganStory = {
  id: "setengah-dulu",
  judul: "Apel dipotong dua kali",
  sumber: "Materi: setengah dari setengah",
  latar: "#FFF1F2",
  ketukan: [
    k(SUARA_S1, tambah(0, judul("Satu apel utuh")), tambah(idx(SUARA_S1, "apel"), ...AP_UTUH), tambah(idx(SUARA_S1, "utuh."), ...labelBagian(AP_UTUH, "utuh", 10))),
    k(
      SUARA_S2,
      hapus(idx(SUARA_S2, "dua"), ...idBagian("ap", 1, true)),
      tambah(idx(SUARA_S2, "dua"), ...AP_DUA),
      tambah(idx(SUARA_S2, "Setiap"), ...labelBagian(AP_DUA, "1/2", 11)),
    ),
    k(
      SUARA_S3,
      hapus(idx(SUARA_S3, "lagi."), ...idBagian("ap", 2, true)),
      tambah(idx(SUARA_S3, "lagi."), ...AP_EMPAT),
      tambah(idx(SUARA_S3, "Hasilnya"), garisPotong("gp1", 150, 42, 0, 116), garisPotong("gp2", 92, 100, 116, 0)),
    ),
    k(
      SUARA_S4,
      tambah(idx(SUARA_S4, "Setiap"), ...labelBagian(AP_EMPAT, "1/4", 11)),
      sorotkan(idx(SUARA_S4, "seperempat"), "pc-ap-1"),
    ),
    k(
      SUARA_S5,
      redamkan(0, "pc-ap-1"),
      tambah(idx(SUARA_S5, "kecil"), ...kartu("mk", 40, 168, 220, 22, W.krem, ["makin banyak, makin kecil"], 10)),
    ),
  ],
};

/* ------------------------------ 7. Dua kali memotong kue bolu ------------------------------ */
const BO_UTUH = bagianKotak("bo", 100, 36, 100, 100, "utuh");
const BO_DUA = bagianKotak("bo", 100, 36, 100, 100, "tegak2");
const BO_EMPAT = bagianKotak("bo", 100, 36, 100, 100, "empat");

const SUARA_D1 = "Untuk mendapat seperempat, kita memotong dua kali. Kita pakai kue bolu.";
const SUARA_D2 = "Potong pertama membuat dua bagian yang sama besar. Tiap bagian adalah setengah.";
const SUARA_D3 = "Potong kedua membagi setiap setengah lagi. Hasilnya empat bagian yang sama besar.";
const SUARA_D4 = "Setiap bagian bolu sekarang adalah seperempat. Ada empat seperempat pada satu bolu utuh.";
const SUARA_D5 = "Setengah bagian kiri berisi dua seperempat. Jadi seperempat adalah setengah dari setengah.";

export const ADEGAN_DUA_KALI: AdeganStory = {
  id: "dua-kali",
  judul: "Dua kali memotong kue bolu",
  sumber: "Materi: potong dua kali",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_D1, tambah(0, judul("Potong dua kali")), tambah(idx(SUARA_D1, "bolu."), ...BO_UTUH), tambah(idx(SUARA_D1, "pakai"), ...labelBagian(BO_UTUH, "utuh", 10))),
    k(
      SUARA_D2,
      tambah(idx(SUARA_D2, "Potong"), garisPotong("gp1", 150, 32, 0, 108)),
      hapus(idx(SUARA_D2, "dua"), ...idBagian("bo", 1, true)),
      tambah(idx(SUARA_D2, "dua"), ...BO_DUA),
      tambah(idx(SUARA_D2, "Tiap"), ...labelBagian(BO_DUA, "1/2", 11)),
    ),
    k(
      SUARA_D3,
      tambah(idx(SUARA_D3, "Potong"), garisPotong("gp2", 96, 86, 108, 0)),
      hapus(idx(SUARA_D3, "empat"), ...idBagian("bo", 2, true)),
      tambah(idx(SUARA_D3, "empat"), ...BO_EMPAT),
    ),
    k(SUARA_D4, tambah(idx(SUARA_D4, "Setiap"), ...labelBagian(BO_EMPAT, "1/4", 11))),
    k(SUARA_D5, sorotkan(idx(SUARA_D5, "Setengah"), "pc-bo-1", "pc-bo-3"), tambah(idx(SUARA_D5, "Jadi"), emo("pn", 62, 90, "\u{1F449}", 20))),
  ],
};

/* ------------------------------ 8. Banyak cara membagi persegi ------------------------------ */
const C_A = bagianKotak("a", 14, 48, 80, 80, "empat");
const C_B = bagianKotak("b", 110, 48, 80, 80, "diag4");
const C_C = bagianKotak("c", 206, 48, 80, 80, "jalur4");
const C_UTUH = [bagianKotak("a", 14, 48, 80, 80, "utuh"), bagianKotak("b", 110, 48, 80, 80, "utuh"), bagianKotak("c", 206, 48, 80, 80, "utuh")];

const SUARA_B1 = "Satu persegi bisa dipotong dengan banyak cara. Kita lihat tiga cara.";
const SUARA_B2 = "Cara pertama, satu garis tegak dan satu garis mendatar. Hasilnya empat persegi kecil.";
const SUARA_B3 = "Cara kedua, dua garis miring dari sudut ke sudut. Hasilnya empat segitiga.";
const SUARA_B4 = "Cara ketiga, tiga garis tegak. Hasilnya empat jalur panjang.";
const SUARA_B5 = "Bentuknya berbeda, tetapi tiap bagian sama besar. Jadi semuanya seperempat.";

export const ADEGAN_BANYAK_CARA: AdeganStory = {
  id: "banyak-cara",
  judul: "Banyak cara membagi persegi",
  sumber: "Materi: banyak cara empat bagian",
  latar: "#F0FDFA",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Banyak cara")), tambah(idx(SUARA_B1, "persegi"), ...C_UTUH.flat())),
    k(
      SUARA_B2,
      tambah(idx(SUARA_B2, "garis"), garisPotong("gp-a1", 54, 48, 0, 80), garisPotong("gp-a2", 14, 88, 80, 0)),
      hapus(idx(SUARA_B2, "empat"), ...idBagian("a", 1)),
      tambah(idx(SUARA_B2, "empat"), ...C_A),
      tambah(idx(SUARA_B2, "persegi"), ...kartu("cp0", 14, 140, 80, 24, W.hijauMuda, ["empat persegi"], 8.6)),
    ),
    k(
      SUARA_B3,
      tambah(idx(SUARA_B3, "garis"), garisPotong("gp-b1", 110, 48, 80, 80), garisPotong("gp-b2", 190, 48, -80, 80)),
      hapus(idx(SUARA_B3, "empat"), ...idBagian("b", 1)),
      tambah(idx(SUARA_B3, "empat"), ...C_B),
      tambah(idx(SUARA_B3, "segitiga."), ...kartu("cp1", 110, 140, 80, 24, W.pink, ["empat segitiga"], 8.6)),
    ),
    k(
      SUARA_B4,
      tambah(idx(SUARA_B4, "garis"), garisPotong("gp-c1", 226, 48, 0, 80), garisPotong("gp-c2", 246, 48, 0, 80), garisPotong("gp-c3", 266, 48, 0, 80)),
      hapus(idx(SUARA_B4, "empat"), ...idBagian("c", 1)),
      tambah(idx(SUARA_B4, "empat"), ...C_C),
      tambah(idx(SUARA_B4, "panjang."), ...kartu("cp2", 206, 140, 80, 24, W.langit, ["empat jalur"], 8.6)),
    ),
    k(SUARA_B5, tambah(idx(SUARA_B5, "sama"), ...labelBagian(C_A, "1/4", 7), ...labelBagian(C_B, "1/4", 7), ...labelBagian(C_C, "1/4", 7)), tambah(idx(SUARA_B5, "semuanya"), emo("ok", 150, 188, "✅", 22))),
  ],
};

/* ------------------------------ 9. Dua seperempat ------------------------------ */
const PU = bagianLingkaran("pu", 150, 98, 56, [90, 90, 90, 90]);

const SUARA_Q1 = "Ini puding yang sudah dipotong menjadi empat bagian yang sama besar.";
const SUARA_Q2 = "Ambil satu bagian puding. Bagian itu sama besar dengan tiga bagian lainnya, yaitu seperempat puding.";
const SUARA_Q3 = "Ambil satu bagian lagi di sebelahnya. Sekarang ada dua seperempat.";
const SUARA_Q4 = "Dua seperempat puding disatukan menjadi satu bagian yang besarnya setengah puding.";
const SUARA_Q5 = "Dua seperempat yang lain juga sama besar dengan setengah.";

export const ADEGAN_DUA_SEPEREMPAT: AdeganStory = {
  id: "dua-seperempat",
  judul: "Dua seperempat",
  sumber: "Materi: dua seperempat jadi setengah",
  latar: "#FAF5FF",
  ketukan: [
    k(SUARA_Q1, tambah(0, judul("Satu puding")), tambah(idx(SUARA_Q1, "puding"), ...PU)),
    k(SUARA_Q2, sorotkan(idx(SUARA_Q2, "satu"), "pc-pu-1"), tambah(idx(SUARA_Q2, "itu"), ...labelBagian([PU[0]], "1/4", 11))),
    k(SUARA_Q3, sorotkan(idx(SUARA_Q3, "lagi"), "pc-pu-2"), tambah(idx(SUARA_Q3, "Sekarang"), ...labelBagian([PU[1]], "1/4", 11))),
    k(SUARA_Q4, tambah(idx(SUARA_Q4, "disatukan"), ...kartu("sm", 30, 168, 240, 22, W.krem, ["dua seperempat sama dengan setengah"], 9))),
    k(
      SUARA_Q5,
      redamkan(0, "pc-pu-1", "pc-pu-2"),
      sorotkan(idx(SUARA_Q5, "lain"), "pc-pu-3", "pc-pu-4"),
      tambah(idx(SUARA_Q5, "lain"), ...labelBagian([PU[2], PU[3]], "1/4", 11).map((o, i) => ({ ...o, id: `lb-pu-${i + 3}` }))),
    ),
  ],
};
