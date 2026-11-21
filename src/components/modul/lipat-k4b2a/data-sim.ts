/**
 * Data Simulasi Meja Lipat Kelas 4 Bab 2 Sub-Bab A "Kain Lipat Bu Wulan", awal cerita Sanggar Batik Kampung Mekar.
 * Data berbeda dari Story (lipat dua, empat, delapan; satu per delapan dan satu per empat) dan dari tugas CPA. Tiga sasaran tiap alat.
 * Mind-map dan Infografis memakai data kartu (data-kartu.ts). Diuji: scripts/uji-lipat-k4b2a.mjs.
 */

/** Lipat: Bu Wulan memesan pecahan 1/n; anak membagi kain menjadi n bagian sama besar lalu mengarsir satu bagian. */
export const TARGET_LIPAT: readonly number[] = [3, 5, 7];

/** Banding: dua pita 1/a (atas) dan 1/b (bawah); anak memilih tanda yang tepat. */
export type TargetBanding = { a: number; b: number };
export const TARGET_BANDING: readonly TargetBanding[] = [
  { a: 3, b: 6 },
  { a: 7, b: 5 },
  { a: 9, b: 4 },
];

/** Urut: tiga pecahan berpembilang satu (hanya penyebutnya); anak mengurutkan dari yang terkecil ke yang terbesar. */
export const TARGET_URUT: readonly (readonly [number, number, number])[] = [
  [5, 3, 6],
  [9, 4, 7],
  [6, 9, 3],
];

/** Garis: pecahan 1/n; anak membagi garis dari nol sampai satu menjadi n bagian sama panjang lalu menjepit tanda pertama setelah nol. */
export const TARGET_GARIS: readonly number[] = [5, 3, 6];

/** Banyak bagian paling sedikit dan paling banyak pada kain dan garis. */
export const BAGIAN_MIN = 1;
export const BAGIAN_MAKS = 9;

export const MISI_LIPAT_TEKS = "Bagi kain, bandingkan dua pita, urutkan pecahan, lalu jepit pecahan pada garis. Urutannya bebas.";
