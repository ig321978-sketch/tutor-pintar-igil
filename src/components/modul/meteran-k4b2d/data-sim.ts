/**
 * Data Simulasi Meteran Kain Kelas 4 Bab 2 Sub-Bab D "Meteran Kain Pak Bagas" (pecahan per sepuluh dan per seratus menjadi desimal), Sanggar Batik Kampung Mekar.
 * Data berbeda dari Story (tiga per sepuluh, dua puluh tujuh per seratus, nol koma nol tiga, tujuh per sepuluh, tiga puluh lima per seratus, sembilan per seratus, empat puluh lima per seratus)
 * dan dari tugas CPA. Mind-map dan Infografis punya data sendiri (data-peta.ts dan data-info.ts). Diuji: scripts/uji-meteran-k4b2d.mjs.
 */

/** Warnai: desimal berkoma ditulis di papan, anak mewarnai kolom kisi sepuluh kolom sebanyak angka di belakang koma. */
export type TargetSepuluh = { benda: string; p: number };
export const TARGET_SEPULUH: readonly TargetSepuluh[] = [
  { benda: "benang", p: 4 },
  { benda: "pita", p: 6 },
  { benda: "wol", p: 8 },
];

/** Susun: desimal dua angka ditulis di papan, anak mengisi baris penuh dan kotak lepas pada kisi seratus kotak. Sepuluh kotak lepas ditolak alat. */
export type TargetSeratus = { q: number };
export const TARGET_SERATUS: readonly TargetSeratus[] = [{ q: 38 }, { q: 56 }, { q: 83 }];

/** Jembatan: pecahan ditulis di kiri, anak memilih desimal di kanan, menekan Cek Jembatan, lalu Periksa. */
export type TargetJembatan = { m: number; den: 10 | 100 };
export const TARGET_JEMBATAN: readonly TargetJembatan[] = [
  { m: 5, den: 10 },
  { m: 62, den: 100 },
  { m: 8, den: 100 },
];

/** Balik: desimal ditulis di papan, anak memilih pecahan yang sama besar. */
export type TargetBalik = { m: number; den: 10 | 100 };
export const TARGET_BALIK: readonly TargetBalik[] = [
  { m: 2, den: 10 },
  { m: 73, den: 100 },
  { m: 6, den: 100 },
];

/** Banyak kotak lepas paling banyak (sepuluh kotak lepas harus ditukar dengan satu baris penuh). */
export const MAKS_LEPAS = 9;
/** Banyak baris paling banyak pada kisi seratus kotak. */
export const MAKS_BARIS = 10;

export const MISI_METERAN_TEKS = "Warnai kain per sepuluh dan per seratus, hubungkan pecahan ke desimal, lalu tulis baliknya. Urutannya bebas.";
