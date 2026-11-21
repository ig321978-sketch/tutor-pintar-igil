/**
 * Data Simulasi Tata Piring Kelas 5 Bab 2 Sub-Bab C "Klepon Bu Wati": meja pasar malam Bu Wati.
 * Data berbeda dari Story dan Infografis (12, 18, 24, 28, 36, 48) dan dari tugas CPA. Tiga sasaran tiap alat. Semua jawaban dihitung dari data (logika-data.ts).
 * Mind-map dan Infografis memakai data kartu (data-kartu.ts). Diuji: scripts/uji-piring-k5b2c.mjs.
 */

/** Tata: banyak klepon di baki; anak mencoba banyak piring dan mencatat semua cara yang habis dibagi (semua faktor). */
export const TARGET_TATA: readonly number[] = [8, 9, 11];

/** Pasangkan: bilangan di papan; kartu faktornya dipasangkan dua-dua sampai hasil kalinya sama dengan bilangan. Bukan bilangan kuadrat. */
export const TARGET_PASANG: readonly number[] = [38, 52, 51];

/** Cek bagi: `n` klepon ditata tiap piring berisi `x`; anak mengisi sisa pembagian (nol bila habis). */
export type SasaranCek = { n: number; x: number };
export const TARGET_CEK: readonly SasaranCek[] = [
  { n: 34, x: 5 },
  { n: 39, x: 13 },
  { n: 67, x: 9 },
];

/** Daftar: bilangan di papan dan dua belas kartu calon faktor; anak memilih semua faktor (kartu yang bukan faktor ikut menjadi pengecoh). */
export type SasaranDaftar = { n: number; kartu: number[] };
export const TARGET_DAFTAR: readonly SasaranDaftar[] = [
  { n: 70, kartu: [1, 2, 3, 5, 7, 10, 14, 20, 30, 35, 50, 70] },
  { n: 66, kartu: [1, 2, 3, 4, 6, 9, 11, 22, 33, 44, 55, 66] },
  { n: 77, kartu: [1, 2, 3, 7, 9, 11, 14, 21, 33, 44, 55, 77] },
];

export const MISI_PIRING_TEKS = "Tata klepon ke piring tanpa sisa, pasangkan faktor, periksa sisa pembagian, dan pilih semua faktor. Urutannya bebas.";
