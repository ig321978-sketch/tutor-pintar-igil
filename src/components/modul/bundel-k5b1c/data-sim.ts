/**
 * Data Simulasi Tukar Bundel Kelas 5 Bab 1 Sub-Bab C "Bundel Tiket Bu Lestari": gudang tiket Stadion Kota.
 * Data berbeda dari Story dan dari tugas CPA. Tiga sasaran tiap alat. Semua jawaban dihitung dari data (logika-data.ts).
 * Mind-map dan Infografis memakai data kartu (data-kartu.ts). Diuji: scripts/uji-bundel-k5b1c.mjs.
 */
import { tukarNaik, tukarTurun, type Susunan } from "./logika-data";

/** Uraikan: bilangan di papan; anak mengatur banyak bundel tiap kolom sampai sama dengan bilangan. Ada nol penjaga pada dua sasaran. */
export const TARGET_URAI: readonly number[] = [47320, 60538, 91704];

/** Tukar: susunan awal, kolom pasangan tukar (`i` dan `i + 1`), dan banyak penukaran bersih (`t` positif = turun, negatif = naik). Sasaran dihitung dari data. */
export type SasaranTukar = { s: Susunan; i: number; t: number };
export const TARGET_TUKAR: readonly SasaranTukar[] = [
  { s: [2, 4, 3, 0, 5], i: 1, t: 1 },
  { s: [5, 0, 3, 14, 2], i: 2, t: -1 },
  { s: [1, 5, 2, 8, 4], i: 0, t: 1 },
];
/** Susunan sasaran sesudah `t` penukaran bersih. */
export function sasaranTukarS(x: SasaranTukar): Susunan {
  let s = x.s;
  for (let n = 0; n < Math.abs(x.t); n += 1) {
    const baru = x.t > 0 ? tukarTurun(s, x.i) : tukarNaik(s, x.i);
    if (!baru) throw new Error("Sasaran tukar tidak mungkin dicapai");
    s = baru;
  }
  return s;
}

/** Susun: uraian bilangan; anak mengisi tiap kolom dengan satu angka, termasuk nol penjaga. */
export const TARGET_SUSUN: readonly number[] = [80206, 45007, 90130];

/** Samakan: bilangan dan empat susunan; anak memilih semua susunan yang jumlahnya sama dengan bilangan. */
export type SasaranSama = { n: number; opsi: Susunan[] };
export const TARGET_SAMA: readonly SasaranSama[] = [
  { n: 52430, opsi: [[5, 2, 4, 13, 0], [5, 1, 14, 3, 0], [5, 3, 4, 2, 0], [5, 2, 3, 13, 0]] },
  { n: 31205, opsi: [[3, 1, 2, 5, 0], [3, 0, 12, 0, 5], [2, 11, 2, 1, 5], [3, 1, 2, 0, 15]] },
  { n: 68140, opsi: [[6, 8, 0, 14, 0], [5, 18, 1, 5, 0], [6, 8, 1, 4, 0], [6, 7, 11, 4, 0]] },
];

export const MISI_BUNDEL_TEKS = "Uraikan bilangan menjadi bundel, tukar bundel tanpa mengubah jumlah, susun kembali dengan nol, dan cari susunan yang jumlahnya sama. Urutannya bebas.";
