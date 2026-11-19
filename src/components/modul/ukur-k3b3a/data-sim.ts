/**
 * Data Simulasi Meja Ukur Kelas 3 Bab 3 Sub-Bab A "Ukuran Kandang Kak Tari", awal cerita Kebun Binatang Mini.
 * Ukuran berbeda dari Story (7 dan 6 jengkal, 15 dan 17, 3 m, 20 dan 22, 6 langkah, 40) dan dari tugas CPA. Penggaris sepanjang dua puluh sentimeter.
 * Mind-map dan Infografis memakai data kartu (data-kartu.ts). Diuji: scripts/uji-ukur-k3b3a.mjs.
 */
export type SatSim = "cm" | "m";

/** Panjang penggaris pada alat Geser (sentimeter). */
export const SKALA_GESER = 20;
/** Geser: benda ditaruh dengan ujung kiri di `awal` sentimeter (bukan nol); anak menggesernya ke angka nol, lalu membaca `panjang` sentimeter. */
export type TargetGeser = { benda: string; awal: number; panjang: number };
export const TARGET_GESER: readonly TargetGeser[] = [
  { benda: "kandang mini", awal: 4, panjang: 9 },
  { benda: "papan", awal: 5, panjang: 13 },
  { benda: "krayon", awal: 8, panjang: 5 },
];

/** Baca: benda sudah di angka nol; anak memilih cara menulis hasil dengan satuan yang tepat. */
export type TargetBaca = { benda: string; panjang: number; sat: SatSim };
export const TARGET_BACA: readonly TargetBaca[] = [
  { benda: "wortel", panjang: 12, sat: "cm" },
  { benda: "jalan setapak", panjang: 5, sat: "m" },
  { benda: "pensil", panjang: 14, sat: "cm" },
];

/** Alat: benda sepanjang `panjang` `sat`; anak memilih penggaris atau meteran. */
export type TargetAlat = { benda: string; panjang: number; sat: SatSim };
export const TARGET_ALAT: readonly TargetAlat[] = [
  { benda: "ekor kelinci", panjang: 5, sat: "cm" },
  { benda: "kandang kambing", panjang: 9, sat: "m" },
  { benda: "sayap burung beo", panjang: 19, sat: "cm" },
  { benda: "jalan setapak", panjang: 12, sat: "m" },
];

/** Selisih: dua batang diukur dari nol (a lebih panjang daripada b); anak memilih selisihnya dalam sentimeter. */
export type TargetSelisih = { a: number; b: number };
export const TARGET_SELISIH: readonly TargetSelisih[] = [
  { a: 13, b: 8 },
  { a: 19, b: 11 },
  { a: 16, b: 9 },
];

export const MISI_UKUR_TEKS = "Geser benda ke angka nol, baca panjangnya dengan satuan, pilih alat ukur, lalu cari selisih dua batang.";
