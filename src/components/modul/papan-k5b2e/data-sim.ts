/**
 * Data Simulasi Pohon Papan Kelas 5 Bab 2 Sub-Bab E "Papan Bilangan Kak Lintang", akhir cerita Pasar Kuliner Malam.
 * Data berbeda dari Story (papan satu sampai seratus, 12 dan 18, 24, 30 dan 45), Infografis (prima sampai 30, pohon 12, 18, 24, KPK 36 dan FPB 6) dan tugas CPA.
 * Eksplorasi bebas tanpa skor. Diuji: scripts/uji-papan-k5b2e.mjs.
 */
/** Saringan: batas tabel bilangan, tiap tabel selesai bila semua prima yang perlu sudah diambil. */
export const SARING_SIM: readonly number[] = [20, 26, 34, 40];
/** Pohon faktor: bilangan yang dipecah dengan pembagi prima sampai semua daun prima. */
export const POHON_SIM: readonly number[] = [32, 56, 75, 98];
/** Gabung: dua bilangan yang faktorisasi primanya dipasangkan untuk KPK dan FPB. */
export const GABUNG_SIM: readonly (readonly [number, number])[] = [
  [14, 35],
  [15, 21],
  [32, 48],
  [26, 39],
];
/** Bagi berulang: dua atau tiga bilangan yang dibagi dengan prima sampai semuanya satu. */
export const BAGI_SIM: readonly (readonly number[])[] = [
  [10, 25],
  [21, 28],
  [6, 8, 15],
  [9, 15, 21],
];
/** Pembagi prima yang tersedia di alat Pohon dan Bagi. */
export const PEMBAGI_SIM: readonly number[] = [2, 3, 5, 7];

export const MISI_PAPAN_TEKS = "Saring bilangan prima di tabel, pecah bilangan menjadi pohon faktor, pasangkan prima untuk KPK dan FPB, dan bagi berulang dengan prima. Urutannya bebas.";
