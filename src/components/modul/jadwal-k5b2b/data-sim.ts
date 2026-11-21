/**
 * Data Simulasi Dua Lonceng Kelas 5 Bab 2 Sub-Bab B "Dua Lonceng Pak Tarno". Data berbeda dari Story (lonceng empat dan enam menit, belanja empat dan enam hari,
 * tiga lonceng empat, lima, enam menit), Infografis, dan tugas CPA (pasangan bilangan lain). Eksplorasi bebas tanpa skor. Diuji: scripts/uji-jadwal-k5b2b.mjs.
 */
export type SasaranDaftar = { a: number; b: number; w: number };
/** Daftar: dua daftar kelipatan sampai w; lingkari bilangan yang ada di kedua daftar (alat menolak bilangan yang tidak ada di kedua daftar). */
export const DAFTAR_SIM: readonly SasaranDaftar[] = [
  { a: 2, b: 9, w: 20 },
  { a: 3, b: 12, w: 24 },
  { a: 5, b: 10, w: 30 },
  { a: 4, b: 9, w: 36 },
];

export type SasaranKpk = { a: number; b: number };
/** KPK: atur kelipatan bilangan pertama (satu kali, dua kali, ...) sampai juga kelipatan bilangan kedua dan yang terkecil. */
export const KPK_SIM: readonly SasaranKpk[] = [
  { a: 6, b: 7 },
  { a: 8, b: 7 },
  { a: 9, b: 2 },
  { a: 4, b: 14 },
];

export type SasaranJadwal = { a: number; b: number };
/** Jadwal: majukan waktu satu demi satu sampai kedua lonceng berbunyi bersama untuk pertama kali. */
export const JADWAL_SIM: readonly SasaranJadwal[] = [
  { a: 2, b: 6 },
  { a: 2, b: 10 },
  { a: 4, b: 12 },
  { a: 3, b: 15 },
];
/** Waktu paling jauh yang bisa dimajukan pada alat Jadwal. */
export const WAKTU_MAKS = 30;

export type SasaranTiga = { angka: [number, number, number]; kandidat: number[] };
/** Tiga: pilih kelipatan persekutuan terkecil tiga bilangan dari enam bilangan (alat menolak bilangan yang bukan kelipatan ketiga-tiganya). */
export const TIGA_SIM: readonly SasaranTiga[] = [
  { angka: [2, 3, 7], kandidat: [14, 84, 42, 21, 126, 6] },
  { angka: [3, 6, 9], kandidat: [9, 18, 36, 27, 54, 12] },
  { angka: [2, 5, 6], kandidat: [10, 60, 15, 30, 90, 20] },
  { angka: [4, 8, 10], kandidat: [80, 20, 40, 16, 120, 32] },
];

export const MISI_JADWAL_TEKS = "Lingkari bilangan yang sama di dua daftar, atur KPK, majukan jadwal sampai dua lonceng bersama, dan pilih KPK tiga bilangan. Urutannya bebas.";
