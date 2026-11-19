/**
 * Data Simulasi Papan Urut Kelas 3 Bab 1 Sub-Bab C "Karung Pak Dodi" (membandingkan dan mengurutkan bilangan): memilih tempat yang menentukan, memilih tanda,
 * meletakkan bilangan di antara dua ratusan pada garis bilangan, dan mengurutkan kartu naik dan turun. Tanpa skor.
 * Berbeda dari Story (Story memakai 465, 456, 546 dan bilangan di naskahnya). Diuji: scripts/uji-urut-k3b1c.mjs.
 */
export const MISI_URUTAN_TEKS = "Pilih tempat yang menentukan, pilih tanda, letakkan bilangan di garis, lalu urutkan kartu. Urutannya bebas.";

export type Pasangan = { a: number; b: number };
/** Pasangan bilangan untuk alat Tempat dan alat Tanda (satu pasangan sama besar). */
export const PASANGAN: readonly Pasangan[] = [
  { a: 237, b: 273 },
  { a: 275, b: 725 },
  { a: 610, b: 601 },
  { a: 792, b: 792 },
  { a: 359, b: 351 },
  { a: 864, b: 846 },
];

export type TugasGaris = { awal: number; n: number };
/** Titik pada garis bilangan: tanda awal, awal+100, awal+200, awal+300. */
export const GARIS_TUGAS: readonly TugasGaris[] = [
  { awal: 100, n: 237 },
  { awal: 400, n: 582 },
  { awal: 500, n: 782 },
];

export type TugasUrut = { angka: number[] };
/** Kartu yang diurutkan (tiga atau empat kartu, bilangan berbeda). */
export const URUT_TUGAS: readonly TugasUrut[] = [{ angka: [352, 325, 523] }, { angka: [618, 681, 168, 186] }, { angka: [407, 470, 740] }];
