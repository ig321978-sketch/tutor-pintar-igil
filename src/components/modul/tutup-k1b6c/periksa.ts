/**
 * Tata letak adegan dan pemeriksa kanvas Kelas 1 Bab 6 Sub-Bab C (tanpa React, diuji di Node: scripts/uji-tutup-k1b6c.mjs).
 * Kanvas adegan 300 x 200. Memakai ulang pemeriksa Kelas 1 Bab 1 Sub-Bab A (lingkari, tanda) dan pengenal ucapan sampai dua puluh Bab 5 Sub-Bab A.
 */
import type { Titik } from "../lemari-k1b1a/periksa-jawab";

export { periksaCentang, periksaLingkari, periksaTulis, LEBAR_ADEGAN, TINGGI_ADEGAN, type Goresan, type Titik } from "../lemari-k1b1a/periksa-jawab";
export { bilanganDariUcapan20 } from "../ikan-k1b5a/periksa";

/* ------------------------------ Kisi sepuluh: baris atas satu ikatan sepuluh, baris bawah satuan ------------------------------ */
export const KISI = { x0: 29, dx: 26.5, y0: 82, dy: 46, ukuran: 22 };
/** Letak benda ke-i (paling banyak dua puluh): sepuluh pertama di baris atas (ikatan), sisanya di baris bawah (satuan). */
export const letakKisi = (i: number): Titik => ({ x: KISI.x0 + (i % 10) * KISI.dx, y: KISI.y0 + Math.floor(i / 10) * KISI.dy });
/** Bingkai ikatan sepuluh di baris atas. */
export const IKATAN = { x: 12, y: 62, w: 276, h: 40 };

/* ------------------------------ Dua bagian bertetangga (Fact Family) ------------------------------ */
export const BAGIAN = [
  { x: 10, y: 52, w: 134, h: 100 },
  { x: 156, y: 52, w: 134, h: 100 },
];
/** Letak butir ke-i (paling banyak sembilan) di bagian g: lima kolom, dua baris. */
export const letakBagian = (g: number, i: number): Titik => ({ x: BAGIAN[g].x + 17 + (i % 5) * 25, y: BAGIAN[g].y + 30 + Math.floor(i / 5) * 36 });
/** Pusat bagian g (untuk lingkari). */
export const pusatBagian = (g: number): Titik => ({ x: BAGIAN[g].x + BAGIAN[g].w / 2, y: BAGIAN[g].y + BAGIAN[g].h / 2 });
