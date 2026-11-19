/**
 * Data Simulasi Papan Jatah Kelas 4 Bab 1 Sub-Bab H "Papan Jatah Bu Ratna", cerita Penginapan Pulau Karang Indah.
 * Data berbeda dari Story (56 : 4, 59 : 4, 24 : 6, 36 : 6, 84 : 7) dan dari tugas CPA. Mind-map dan Infografis memakai data kartu (data-kartu.ts).
 * Diuji: scripts/uji-jatah-k4b1h.mjs.
 */

/** Bagi Rata: tamu dibagikan satu putaran tiap ketukan ke semua kamar; alat menolak Periksa selama masih bisa satu putaran lagi. */
export type TargetRata = { benda: string; n: number; d: number };
export const TARGET_RATA: readonly TargetRata[] = [
  { benda: "koper", n: 18, d: 3 },
  { benda: "kelapa", n: 23, d: 5 },
  { benda: "payung", n: 32, d: 6 },
];

/** Kurang Berulang: pembagi dikurangkan dari bilangan awal tiap ketukan; alat menolak mengurangi bila sisa kurang dari pembagi. */
export type TargetKurang = { n: number; d: number };
export const TARGET_KURANG: readonly TargetKurang[] = [
  { n: 30, d: 6 },
  { n: 32, d: 8 },
  { n: 47, d: 9 },
];

/** Bagi Susun: pilih hasil puluhan, sisa puluhan, turunkan angka satuan, lalu pilih hasil satuan. */
export type TargetSusun = { n: number; d: number };
export const TARGET_SUSUN: readonly TargetSusun[] = [
  { n: 78, d: 6 },
  { n: 90, d: 5 },
  { n: 81, d: 3 },
];

/** Periksa dengan perkalian: hasil bagi yang diklaim dikalikan pembagi, lalu diputuskan benar atau keliru. */
export type TargetKali = { n: number; d: number; klaim: number };
export const TARGET_KALI: readonly TargetKali[] = [
  { n: 45, d: 5, klaim: 9 },
  { n: 64, d: 8, klaim: 6 },
  { n: 72, d: 9, klaim: 8 },
];

export const MISI_JATAH_TEKS = "Bagikan tamu ke kamar, kurangi berulang, bagi bersusun, lalu periksa dengan perkalian. Urutannya bebas.";
