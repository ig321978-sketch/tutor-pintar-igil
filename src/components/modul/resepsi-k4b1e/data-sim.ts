/**
 * Data Simulasi Meja Resepsi Kelas 4 Bab 1 Sub-Bab E "Meja Resepsi Bu Rina", lanjutan cerita Penginapan Pulau Karang Indah.
 * Data berbeda dari Story (245, 378, 113, 326, 259, 540, 235, 123, 99, 364, 158) dan dari tugas CPA. Hasil tiap penjumlahan tidak lebih dari 999.
 * Mind-map dan Infografis memakai data kartu (data-kartu.ts). Diuji: scripts/uji-resepsi-k4b1e.mjs.
 */

/** Susun: dua bilangan dijumlahkan bersusun dari kolom satuan; alat menolak bila kolom lain dipilih lebih dulu atau hasil kolom belum benar. */
export type TargetSusun = { a: number; b: number };
export const TARGET_SUSUN: readonly TargetSusun[] = [
  { a: 133, b: 524 },
  { a: 267, b: 185 },
  { a: 489, b: 376 },
  { a: 418, b: 293 },
];

/** Tukar: balok tiap tempat dijumlahkan dulu (kotak, batang, butir), lalu sepuluh butir ditukar satu batang dan sepuluh batang satu kotak; alat menolak bila belum sepuluh. */
export type TargetTukar = { a: number; b: number };
export const TARGET_TUKAR: readonly TargetTukar[] = [
  { a: 267, b: 185 },
  { a: 458, b: 379 },
  { a: 196, b: 248 },
];

/** Genap: bilangan hampir bulat dibulatkan dulu, dijumlahkan, lalu disesuaikan (alat menolak menyesuaikan sebelum membulatkan). */
export type TargetGenap = { a: number; b: number; bulat: number };
export const TARGET_GENAP: readonly TargetGenap[] = [
  { a: 437, b: 298, bulat: 300 },
  { a: 518, b: 197, bulat: 200 },
  { a: 365, b: 504, bulat: 500 },
];

export const MISI_RESEPSI_TEKS = "Susun dan jumlahkan dari satuan, tukar sepuluh butir menjadi satu batang, lalu genapkan dulu. Urutannya bebas.";
