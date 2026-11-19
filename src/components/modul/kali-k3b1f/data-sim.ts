/**
 * Data Simulasi Rak Kotak Kelas 3 Bab 1 Sub-Bab F "Telur Bu Mirna" (perkalian sampai seratus), Toko Kelontong Pak Joko: menyusun kotak berisi sama banyak,
 * menulis perkalian dari susunan kotak, menyusun baris dan kolom lalu memutarnya, dan melompat di garis bilangan sampai tepat di sasaran.
 * Berbeda dari Story (Story memakai telur, botol, kaleng, dan pensil dengan kotak empat kali lima, tiga kali enam, tiga kali tujuh, dan enam kali sepuluh).
 * Diuji: scripts/uji-kali-k3b1f.mjs.
 */
export const MISI_ISI_TEKS = "Susun kotak berisi sama banyak, tulis perkaliannya, susun baris dan kolom lalu putar, dan lompat di garis bilangan. Urutannya bebas.";

/** Paling banyak kotak, isi tiap kotak, baris, dan kolom yang bisa diatur. */
export const BATAS_KOTAK = 8;
export const BATAS_ISI = 10;
export const BATAS_BARIS = 9;
/** Besar lompatan yang bisa dipilih (dua sampai sembilan). */
export const BESAR_MIN = 2;
export const BESAR_MAKS = 9;

export type TugasKotak = { wadah: string; benda: string; ikon: string; g: number; s: number };
/** Tiga susunan kotak yang harus disusun: banyak kotak dan isi tiap kotak (hasil kali empat puluh delapan, dua puluh delapan, empat puluh lima). */
export const ISI_TUGAS: readonly TugasKotak[] = [
  { wadah: "keranjang", benda: "sabun", ikon: "\u{1F9FC}", g: 4, s: 7 },
  { wadah: "kotak", benda: "roti", ikon: "\u{1F35E}", g: 6, s: 8 },
  { wadah: "piring", benda: "apel", ikon: "\u{1F34E}", g: 5, s: 9 },
];
/** Tiga susunan kotak yang harus ditulis perkaliannya (banyak kotak lebih dulu, lalu isi tiap kotak). */
export const TULIS_TUGAS: readonly TugasKotak[] = [
  { wadah: "kotak", benda: "permen", ikon: "\u{1F36C}", g: 3, s: 9 },
  { wadah: "kotak", benda: "kue", ikon: "\u{1F36A}", g: 7, s: 6 },
  { wadah: "kotak", benda: "jeruk", ikon: "\u{1F34A}", g: 8, s: 4 },
];

export type TugasSusun = { benda: string; ikon: string; r: number; c: number };
/** Tiga susunan baris dan kolom yang harus disusun, lalu diputar. */
export const SUSUN_TUGAS: readonly TugasSusun[] = [
  { benda: "sabun cair", ikon: "\u{1F9F4}", r: 4, c: 9 },
  { benda: "kue", ikon: "\u{1F36A}", r: 6, c: 7 },
  { benda: "jeruk", ikon: "\u{1F34A}", r: 5, c: 8 },
];

/** Tiga sasaran pendaratan lompatan: tiga puluh enam, empat puluh dua, dan dua puluh tujuh. Boleh dicapai dengan besar lompatan yang pas. */
export const LOMPAT_TUGAS: readonly { target: number }[] = [{ target: 36 }, { target: 42 }, { target: 27 }];
