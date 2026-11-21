/**
 * Data Simulasi Loket Tiket Kelas 4 Bab 1 Sub-Bab A "Loket Tiket Bu Maya", awal cerita Penginapan Pulau Karang Indah.
 * Data berbeda dari Story (tiket 3.406 dan 5.080, tulisan salah 3.46, contoh 7.025 dan 6.185) dan dari tugas CPA. Tiga bilangan empat angka tiap alat.
 * Mind-map dan Infografis punya data sendiri (data-peta.ts dan data-info.ts). Diuji: scripts/uji-tiket-k4b1a.mjs.
 */
import type { Tempat } from "./logika-cpa";

/** Susun: Bu Maya mengucapkan sebuah bilangan; anak mengisi empat kotak (ribuan sampai satuan) dengan kartu angka. */
export const TARGET_SUSUN: readonly number[] = [7208, 3150, 6700];

/** Baca: tiket bernomor; anak memilih cara membacanya. */
export const TARGET_BACA: readonly number[] = [2406, 9030, 5200];

/** Nol: Bu Maya mengucapkan bilangan, papan sudah terisi sebagian (kotak kosong = nol yang hilang); anak mengisi kotak kosong. */
export type TargetNol = { angka: number; awal: (number | null)[] };
export const TARGET_NOL: readonly TargetNol[] = [
  { angka: 4803, awal: [4, 8, null, 3] },
  { angka: 6090, awal: [6, null, 9, null] },
  { angka: 2007, awal: [2, null, null, 7] },
];

/** Tempat: satu angka ditandai (urutan ke `urut` dari kiri, mulai nol); anak memilih nama tempatnya. */
export type TargetTempat = { angka: number; urut: number };
export const TARGET_TEMPAT: readonly TargetTempat[] = [
  { angka: 7421, urut: 1 },
  { angka: 5063, urut: 2 },
  { angka: 9810, urut: 3 },
];
export const NAMA_TEMPAT: readonly Tempat[] = ["ribuan", "ratusan", "puluhan", "satuan"];

export const MISI_TIKET_TEKS = "Susun kartu angka dari ucapan, baca tiket, isi nol yang hilang, lalu tentukan tempat angka. Urutannya bebas.";
