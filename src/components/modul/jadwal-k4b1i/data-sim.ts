/**
 * Data Simulasi Papan Jadwal Kelas 4 Bab 1 Sub-Bab I "Papan Jadwal Kak Yoga", akhir cerita Penginapan Pulau Karang Indah.
 * Data berbeda dari Story (24 payung, faktor 24, kelipatan 4, 12, 36, 42, kelipatan 5 sampai 40) dan dari tugas CPA. Bilangan paling besar 56.
 * Mind-map dan Infografis memakai data kartu (data-kartu.ts). Diuji: scripts/uji-jadwal-k4b1i.mjs.
 */

/** Banyak baris paling besar pada alat Payung. */
export const MAKS_BARIS = 9;

/** Payung: bilangan payung yang disusun dalam baris sama banyak; anak mencatat semua pasangan faktornya. */
export type SasaranPasang = { n: number };
export const PASANG_SIM: readonly SasaranPasang[] = [{ n: 35 }, { n: 44 }];

/** Faktor: tandai semua faktor `n` di antara bilangan kandidat. */
export type SasaranFaktor = { n: number; kandidat: number[] };
export const FAKTOR_SIM: readonly SasaranFaktor[] = [
  { n: 40, kandidat: [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 40] },
  { n: 45, kandidat: [1, 2, 3, 5, 6, 9, 10, 15, 18, 20, 30, 45] },
];

/** Jadwal: tandai semua kelipatan `b` sampai `batas` pada garis jadwal. */
export type SasaranJadwal = { b: number; batas: number };
export const JADWAL_SIM: readonly SasaranJadwal[] = [
  { b: 7, batas: 35 },
  { b: 9, batas: 45 },
];

/** Uji: bagi `n` dengan `d`, lalu putuskan faktor atau bukan faktor. */
export type SasaranUji = { n: number; d: number };
export const UJI_SIM: readonly SasaranUji[] = [
  { n: 45, d: 9 },
  { n: 52, d: 6 },
  { n: 56, d: 7 },
  { n: 38, d: 5 },
];

export const MISI_JADWAL_TEKS = "Susun payung untuk pasangan faktor, tandai faktor dan kelipatan, lalu uji bagi habis. Urutannya bebas.";
