/**
 * Data Simulasi Meja Jahit Kelas 4 Bab 2 Sub-Bab C "Meja Jahit Kak Sekar", cerita Sanggar Batik Kampung Mekar.
 * Data berbeda dari Story (satu per dua, dua per empat, empat per delapan, tiga per empat, enam per delapan, satu per tiga, empat per dua belas, delapan per dua belas, dua per tiga, sepuluh per lima belas,
 * tiga per lima, enam per sepuluh, dua belas per enam belas). Tiga sasaran tiap alat. Mind-map dan Infografis punya data sendiri (data-peta.ts dan data-info.ts). Diuji: scripts/uji-jahit-k4b2c.mjs.
 */

/** Arsir: kain atas berarsir p/q; kain bawah dibagi r bagian (r kelipatan q); anak mengarsir bagian kain bawah sampai sama besar. */
export type TargetArsir = { p: number; q: number; r: number };
export const TARGET_ARSIR: readonly TargetArsir[] = [
  { p: 1, q: 7, r: 14 },
  { p: 3, q: 8, r: 16 },
  { p: 4, q: 5, r: 10 },
];

/** Kali: pesanan Kak Sekar meminta pecahan p/q ditulis dengan penyebut t (t kelipatan q); anak memilih pengali yang menjaga besar pecahan. */
export type TargetKali = { p: number; q: number; t: number };
export const TARGET_KALI: readonly TargetKali[] = [
  { p: 3, q: 8, t: 24 },
  { p: 5, q: 9, t: 18 },
  { p: 2, q: 7, t: 28 },
];

/** Bagi: pecahan P/Q disederhanakan dengan membagi pembilang dan penyebut dengan bilangan sama, berkali-kali sampai paling sederhana. */
export type TargetBagi = { P: number; Q: number };
export const TARGET_BAGI: readonly TargetBagi[] = [
  { P: 15, Q: 35 },
  { P: 12, Q: 21 },
  { P: 20, Q: 32 },
];
/** Pembagi yang tersedia di alat Bagi. */
export const PEMBAGI: readonly number[] = [2, 3, 4, 5, 6, 7];
/** Pengali yang tersedia di alat Kali. */
export const PENGALI: readonly number[] = [2, 3, 4, 5, 6];

/** Pasang: papan memuat sebuah pecahan; empat kartu pecahan, dua di antaranya sama besar (indeks `benar`). */
export type TargetPasang = { p: number; q: number; kartu: readonly (readonly [number, number])[]; benar: readonly number[] };
export const TARGET_PASANG: readonly TargetPasang[] = [
  { p: 2, q: 9, kartu: [[3, 9], [4, 18], [2, 7], [6, 27]], benar: [1, 3] },
  { p: 5, q: 8, kartu: [[10, 16], [5, 12], [5, 7], [15, 24]], benar: [0, 3] },
  { p: 4, q: 7, kartu: [[4, 9], [6, 7], [8, 14], [12, 21]], benar: [2, 3] },
];

export const MISI_JAHIT_TEKS = "Arsir kain sama besar, cari pengali, sederhanakan pecahan, dan pilih kartu sama besar. Urutannya bebas.";
