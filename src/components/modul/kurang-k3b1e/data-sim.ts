/**
 * Data Simulasi Rak Sisa Kelas 3 Bab 1 Sub-Bab E "Sisa Stok Pak Anto" (pengurangan sampai seratus): mengurangi dengan susun pendek, susun panjang, meminjam satu puluhan
 * dengan batang yang dipecah menjadi sepuluh butir, memeriksa dengan penjumlahan, dan mengosongkan rak (hasil nol). Berbeda dari Story (Story memakai
 * enam puluh delapan dikurangi tiga puluh lima, tujuh puluh satu dikurangi dua puluh delapan, sembilan puluh dikurangi lima puluh empat, dua puluh empat dikurangi dua puluh empat).
 * Diuji: scripts/uji-kurang-k3b1e.mjs.
 */

export const MISI_SISA_TEKS = "Kurangi dengan susun pendek dan susun panjang, pinjam satu puluhan, periksa dengan penjumlahan, lalu kosongkan rak. Urutannya bebas.";

export type Pasang = { a: number; b: number };
export type PasangPeriksa = Pasang & { hasil: number };

/** Susun pendek: tiga pasangan, yang pertama tanpa meminjam, dua lain perlu meminjam satu puluhan. */
export const SUSUN_TUGAS: readonly Pasang[] = [
  { a: 86, b: 52 },
  { a: 73, b: 48 },
  { a: 61, b: 37 },
];
/** Susun panjang: pasangan dengan dan tanpa meminjam. */
export const PANJANG_TUGAS: readonly Pasang[] = [
  { a: 78, b: 43 },
  { a: 92, b: 57 },
  { a: 54, b: 29 },
];
/** Meminjam dengan batang puluhan dan butir satuan: pasangan pertama tanpa meminjam, dua lain perlu memecah satu batang. */
export const BLOK_TUGAS: readonly Pasang[] = [
  { a: 47, b: 24 },
  { a: 52, b: 27 },
  { a: 81, b: 46 },
];
/** Memeriksa dengan penjumlahan: hasil yang disebut boleh benar atau keliru; yang keliru tidak cocok saat ditambahkan kembali. */
export const PERIKSA_TUGAS: readonly PasangPeriksa[] = [
  { a: 64, b: 29, hasil: 35 },
  { a: 83, b: 45, hasil: 48 },
  { a: 57, b: 38, hasil: 19 },
];
/** Rak yang harus dikosongkan: isi rak (jumlah yang terjual harus sama dengan isinya). */
export const KOSONG_TUGAS: readonly number[] = [36, 58, 25];

/** Paling banyak yang bisa diatur pada satu tempat (puluhan atau satuan). */
export const BATAS_ANGKA = 9;
