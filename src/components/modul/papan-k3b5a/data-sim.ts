/**
 * Data Simulasi Meja Catat Kelas 3 Bab 5 Sub-Bab A "Catatan Pak Hasan", awal cerita Bengkel Sepeda Pak Hasan.
 * Data berbeda dari Story (enam hari 6, 9, 3, 7, 5, 8; terkecil 3, terbesar 9, jangkauan 6; turus delapan dan tujuh) dan dari tugas CPA. Dua angka boleh dipakai di simulasi.
 * Mind-map dan Infografis memakai data kartu (data-kartu.ts). Diuji: scripts/uji-papan-k3b5a.mjs.
 */
export type Arah = "naik" | "turun";

/** Urut: kartu data tertulis acak; anak menggesernya sampai berurutan (naik = terkecil ke terbesar, turun = sebaliknya). */
export type TargetUrut = { benda: string; data: number[]; arah: Arah };
export const TARGET_URUT: readonly TargetUrut[] = [
  { benda: "ban bocor", data: [4, 9, 1, 7, 3], arah: "naik" },
  { benda: "rantai lepas", data: [12, 7, 15, 9, 10], arah: "turun" },
  { benda: "lampu mati", data: [11, 2, 8, 5, 13, 6], arah: "naik" },
];

/** Ujung: data tertulis acak; alat menolak menandai data terkecil dan terbesar sebelum data diurutkan. */
export type TargetUjung = { benda: string; data: number[] };
export const TARGET_UJUNG: readonly TargetUjung[] = [
  { benda: "rem blong", data: [5, 12, 3, 9, 8] },
  { benda: "bel rusak", data: [14, 6, 11, 4, 10] },
  { benda: "pedal patah", data: [2, 9, 7, 13, 5] },
];

/** Jangkauan: data terbesar dikurangi data terkecil, lalu diperiksa dengan Cek Jangkauan (terkecil ditambah jangkauan harus sama dengan terbesar). */
export type TargetJangkau = { benda: string; data: number[] };
export const TARGET_JANGKAU: readonly TargetJangkau[] = [
  { benda: "sepeda masuk", data: [9, 4, 12, 6] },
  { benda: "pompa terpakai", data: [14, 5, 8, 11] },
  { benda: "baut terjual", data: [10, 3, 7, 5] },
];

/** Banding: dua hari dibandingkan (hari yang lebih banyak dan selisihnya). */
export type TargetBanding = { a: { hari: string; n: number }; b: { hari: string; n: number } };
export const TARGET_BANDING: readonly TargetBanding[] = [
  { a: { hari: "Senin", n: 12 }, b: { hari: "Rabu", n: 7 } },
  { a: { hari: "Selasa", n: 6 }, b: { hari: "Jumat", n: 15 } },
  { a: { hari: "Kamis", n: 10 }, b: { hari: "Sabtu", n: 13 } },
];

/** Turus: ketuk untuk menambah satu garis tiap benda; garis kelima otomatis menjadi bundel; lalu baca banyaknya. */
export type TargetTurus = { benda: string; banyak: number };
export const TARGET_TURUS: readonly TargetTurus[] = [
  { benda: "bel", banyak: 13 },
  { benda: "lampu", banyak: 7 },
  { benda: "helm", banyak: 16 },
];
/** Batas banyak garis yang bisa ditambahkan pada alat Turus. */
export const MAKS_GARIS = 20;

export const MISI_PAPAN_TEKS = "Urutkan kartu data, tandai data terkecil dan terbesar, hitung jangkauan, lalu hitung turus. Urutannya bebas.";
