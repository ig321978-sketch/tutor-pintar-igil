/**
 * Data Simulasi Tumpukan Kayu Kelas 3 Bab 2 Sub-Bab A "Kayu untuk Api Unggun", awal cerita Perkemahan Akhir Pekan.
 * Bilangan berbeda dari Story (30, 50, 20, 25, 60, 35, 75, 40, 80, 18, 12, 28) dan dari tugas CPA; jumlah tidak lebih dari 100 (dua rak kayu berjumlah 100 adalah topik materi).
 * Mind-map dan Infografis memakai data kartu (data-kartu.ts). Diuji: scripts/uji-kayu-k3b2a.mjs.
 */
/** Tambah: tumpukan awal `a` batang, papan jumlah `c`; anak menambah batang (sepuluh batang lepas ditukar otomatis jadi satu bundel) sampai tepat. */
export type TargetTambah = { a: number; c: number };
export const TARGET_TAMBAH: readonly TargetTambah[] = [
  { a: 23, c: 47 },
  { a: 38, c: 65 },
  { a: 14, c: 91 },
];

/** Bagan: batang atas `total`, bagian diketahui `bagian`; anak memilih bagian yang belum diketahui. */
export type TargetBagan = { total: number; bagian: number };
export const TARGET_BAGAN: readonly TargetBagan[] = [
  { total: 71, bagian: 46 },
  { total: 96, bagian: 59 },
  { total: 63, bagian: 27 },
];

/** Isi titik-titik: kalimat a + ... = c (titik di tengah) atau ... + a = c (titik di depan); anak memilih kartu bilangan. */
export type TargetIsi = { a: number; c: number; depan: boolean };
export const TARGET_ISI: readonly TargetIsi[] = [
  { a: 17, c: 52, depan: false },
  { a: 26, c: 74, depan: true },
  { a: 45, c: 83, depan: false },
  { a: 33, c: 91, depan: true },
];

/** Periksa: bilangan yang ditemukan `u` untuk kalimat a + u = ?; anak menjumlahkan lalu memilih cocok atau tidak cocok dengan jumlah semuanya `c`. */
export type TargetPeriksa = { a: number; u: number; c: number };
export const TARGET_PERIKSA: readonly TargetPeriksa[] = [
  { a: 29, u: 33, c: 62 },
  { a: 44, u: 37, c: 82 },
  { a: 36, u: 49, c: 85 },
];

/** Dua rak kayu: jumlah keduanya (hanya jumlahnya yang diketahui, jadi banyak kemungkinan pasangan). */
export const JUMLAH_RAK = 100;
/** Banyak pasangan berbeda yang harus dicatat untuk tantangan bebas. */
export const PASANGAN_CUKUP = 3;

export const MISI_KAYU_TEKS = "Tambah batang kayu sampai tepat, baca bagan, isi titik-titik, lalu periksa dengan menjumlahkan. Urutannya bebas.";
