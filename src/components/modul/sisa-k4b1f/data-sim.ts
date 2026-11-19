/**
 * Data Simulasi Papan Sisa Kelas 4 Bab 1 Sub-Bab F "Papan Sisa Pak Usman", cerita Penginapan Pulau Karang Indah.
 * Data berbeda dari Story (612 dikurangi 275, 430 dikurangi 158, 750 sampai 840, 520 dikurangi 345) dan dari tugas CPA.
 * Tiga alat: Susun (kurangkan dari satuan ke kiri dengan mengambil; alat menolak mengisi hasil sebelum mengambil), Maju (hitung maju lewat puluhan bulat dan ratusan bulat; alat menolak lompatan melewati tujuan),
 * dan Cek (tambahkan hasil dengan bilangan yang dikurangkan, lalu putuskan benar atau salah). Diuji: scripts/uji-sisa-k4b1f.mjs.
 */

/** Susun: bilangan awal a dikurangi b. Soal pertama satu kali mengambil, kedua dua kali mengambil, ketiga mengambil di puluhan. Tanpa nol di puluhan bilangan awal (tidak ada pinjam berantai). */
export type TargetSusun = { benda: string; a: number; b: number };
export const TARGET_SUSUN: readonly TargetSusun[] = [
  { benda: "koper", a: 648, b: 219 },
  { benda: "payung", a: 753, b: 468 },
  { benda: "sandal", a: 845, b: 371 },
];

/** Maju: hitung maju dari b sampai a lewat puluhan bulat dan ratusan bulat (atau puluhan bulat milik a). */
export type TargetMaju = { benda: string; a: number; b: number };
export const TARGET_MAJU: readonly TargetMaju[] = [
  { benda: "kelapa", a: 462, b: 438 },
  { benda: "tiket", a: 905, b: 877 },
  { benda: "lentera", a: 681, b: 654 },
];

/** Cek: hasil yang dicatat (klaim) ditambah b dibandingkan dengan a. Satu catatan benar, dua catatan keliru. */
export type TargetCek = { benda: string; a: number; b: number; klaim: number };
export const TARGET_CEK: readonly TargetCek[] = [
  { benda: "kamar", a: 634, b: 285, klaim: 349 },
  { benda: "keranjang", a: 571, b: 292, klaim: 289 },
  { benda: "kerang", a: 923, b: 457, klaim: 476 },
];

export const MISI_SISA_TEKS = "Susun pengurangan dengan mengambil, hitung maju sampai bilangan besar, lalu periksa hasil dengan menambah. Urutannya bebas.";
