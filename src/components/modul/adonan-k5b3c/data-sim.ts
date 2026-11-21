/**
 * Data Simulasi Sisa Adonan Kelas 5 Bab 3 Sub-Bab C "Sisa Adonan Bu Nani": dapur roti keliling Bu Nani.
 * Data berbeda dari Story, Infografis, dan tugas CPA. Tiga sasaran tiap alat. Semua jawaban dihitung dari data (logika-data.ts).
 * Mind-map dan Infografis memakai data kartu (data-kartu.ts). Diuji: scripts/uji-adonan-k5b3c.mjs.
 */

/** Coret: loyang dibagi `q` bagian, `a` bagian berisi; anak mencoret tepat `c` bagian yang diambil pelanggan. */
export type SasaranCoret = { q: number; a: number; c: number };
export const TARGET_CORET: readonly SasaranCoret[] = [
  { q: 6, a: 6, c: 2 },
  { q: 8, a: 5, c: 3 },
  { q: 5, a: 4, c: 3 },
];

/** Samakan: `a` per `p` dikurangi `c` per `q`; anak menyetel penyebut bersama sampai KPK lalu menekan Kurangkan. */
export type SasaranSamakan = { p: number; a: number; q: number; c: number };
export const TARGET_SAMAKAN: readonly SasaranSamakan[] = [
  { p: 3, a: 2, q: 5, c: 1 },
  { p: 6, a: 5, q: 9, c: 4 },
  { p: 10, a: 7, q: 4, c: 1 },
];

/** Kurang: `a` per `q` dikurangi `c` per `q` (penyebut sama); anak mengatur pembilang hasil. */
export type SasaranKurang = { q: number; a: number; c: number };
export const TARGET_KURANG: readonly SasaranKurang[] = [
  { q: 9, a: 7, c: 3 },
  { q: 13, a: 11, c: 4 },
  { q: 10, a: 7, c: 2 },
];

/** Pisah: campuran dikurangi campuran; anak mengatur bilangan bulat hasil dan pembilang pecahan hasil (penyebut bersama sudah tertulis). Pecahan pertama tidak lebih kecil daripada pecahan kedua. */
export type SasaranPisah = { b1: number; a1: number; p: number; b2: number; a2: number; q: number };
export const TARGET_PISAH: readonly SasaranPisah[] = [
  { b1: 5, a1: 3, p: 5, b2: 2, a2: 2, q: 5 },
  { b1: 4, a1: 2, p: 3, b2: 1, a2: 1, q: 4 },
  { b1: 6, a1: 3, p: 4, b2: 2, a2: 1, q: 8 },
];

export const MISI_ADONAN_TEKS = "Coret bagian loyang yang diambil, samakan penyebut sebelum mengurangkan, kurangkan pembilang, dan pisahkan bulat dari pecahan. Urutannya bebas.";
