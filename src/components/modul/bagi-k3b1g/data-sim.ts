/**
 * Data Simulasi Meja Bingkisan Kelas 3 Bab 1 Sub-Bab G "Pesta Hari Jadi Toko" (pembagian sampai seratus): membagi rata bergiliran ke keranjang, mengurangi berulang di garis bilangan,
 * menulis pembagian, memilih kalimat keluarga fakta, dan memeriksa dengan perkalian. Berbeda dari Story (Story memakai dua puluh empat bingkisan, lima belas manik, tiga puluh enam permen,
 * delapan belas kue, dua puluh dibagi lima, dan tiga, tujuh, dua puluh satu). Tanpa sisa pembagian. Diuji: scripts/uji-bagi-k3b1g.mjs.
 */

export const MISI_BAGI_TEKS = "Bagikan bingkisan bergiliran, lompat mundur di garis, tulis pembagiannya, pilih keluarga fakta, lalu periksa dengan kali. Urutannya bebas.";

/** Batas isian: isi tiap keranjang dan banyak lompatan paling banyak dua belas, pembagi sembilan, bilangan yang dibagi sembilan puluh sembilan, hasil kali seratus. */
export const BATAS_ISI = 12;
export const BATAS_PEMBAGI = 9;
export const BATAS_DIBAGI = 99;
export const BATAS_KALI = 100;

export type TugasBagi = { n: number; g: number; ikon: string };
/** Bagi rata bergiliran: n benda ke g keranjang (tiga tugas, tanpa sisa). */
export const BAGI_TUGAS: readonly TugasBagi[] = [
  { n: 12, g: 3, ikon: "\u{1F36A}" },
  { n: 20, g: 4, ikon: "\u{1F36C}" },
  { n: 18, g: 2, ikon: "\u{1F34E}" },
];

export type TugasKurang = { n: number; g: number };
/** Kurang berulang di garis bilangan: mulai dari n, lompat mundur sebesar g sampai nol. */
export const KURANG_TUGAS: readonly TugasKurang[] = [
  { n: 16, g: 4 },
  { n: 30, g: 6 },
  { n: 14, g: 2 },
];

export type TugasTulis = { n: number; g: number; ikon: string };
/** Tulis pembagian dari gambar g keranjang berisi sama banyak (jumlah seluruhnya n). */
export const TULIS_TUGAS: readonly TugasTulis[] = [
  { n: 14, g: 2, ikon: "\u{1F95A}" },
  { n: 32, g: 8, ikon: "\u{1F36A}" },
  { n: 27, g: 3, ikon: "\u{1F34E}" },
];

export type TugasKeluarga = { a: number; b: number };
/** Keluarga fakta dari tiga bilangan a, b, dan a kali b (a tidak sama dengan b). */
export const KELUARGA_TUGAS: readonly TugasKeluarga[] = [
  { a: 5, b: 6 },
  { a: 6, b: 9 },
  { a: 7, b: 8 },
];

export type TugasPeriksa = { n: number; g: number; q: number };
/** Periksa dengan kali: n dibagi g sama dengan q, jadi g kali q harus sama dengan n. */
export const PERIKSA_TUGAS: readonly TugasPeriksa[] = [
  { n: 16, g: 2, q: 8 },
  { n: 36, g: 4, q: 9 },
  { n: 48, g: 6, q: 8 },
];
