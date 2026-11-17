/**
 * Tata letak adegan dan pemeriksa kanvas Kelas 1 Bab 5 Sub-Bab B (tanpa React, diuji di Node: scripts/uji-rak-k1b5b.mjs).
 * Kanvas adegan 300 x 200. Memakai ulang pemeriksa Kelas 1 Bab 1 Sub-Bab A (lingkari, tanda) dan pengenal ucapan sampai dua puluh Sub-Bab A.
 */
import type { Titik } from "../lemari-k1b1a/periksa-jawab";

export { periksaCentang, periksaLingkari, periksaTulis, LEBAR_ADEGAN, TINGGI_ADEGAN, type Goresan, type Titik } from "../lemari-k1b1a/periksa-jawab";
export { bilanganDariUcapan20 } from "../ikan-k1b5a/periksa";

/* ------------------------------ Metode IGIL: deret akuarium bernomor (paling banyak delapan) ------------------------------ */
export const JARAK_URUT = 36;
export const KARTU_URUT = { w: 32, h: 46 };
export const letakUrut = (i: number, n: number): Titik => ({ x: 150 + (i - (n - 1) / 2) * JARAK_URUT, y: 92 });
/** Dua kartu kata arah di bawah deret: maju (kiri) dan mundur (kanan). */
export const letakArah = (i: number): Titik => ({ x: 95 + i * 110, y: 165 });
export const LEBAR_ARAH = 90;

/* ------------------------------ Number Line Hop: tempat mendarat berjajar (paling banyak sepuluh) ------------------------------ */
export const letakLompat = (i: number, n: number): Titik => {
  const jarak = Math.min(30, 270 / Math.max(1, n - 1));
  return { x: 150 + (i - (n - 1) / 2) * jarak, y: 128 };
};

/* ------------------------------ Number Grid: kisi dua baris sepuluh kolom ------------------------------ */
export const SEL_KISI = { w: 28, h: 40 };
export const letakKisi = (n: number): Titik => ({ x: 15 + ((n - 1) % 10) * 30, y: n <= 10 ? 78 : 128 });

/* ------------------------------ Before and After: tiga kotak berdampingan ------------------------------ */
export const KOTAK_TETANGGA = 64;
export const letakTetangga = (i: number): Titik => ({ x: 70 + i * 80, y: 104 });
