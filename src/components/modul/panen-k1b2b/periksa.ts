/**
 * Tata letak dan pemeriksa kanvas Kelas 1 Bab 2 Sub-Bab B (tanpa React, diuji di Node: scripts/uji-panen-k1b2b.mjs).
 * Kanvas adegan 300 x 200. Memakai ulang pemeriksa Bab 1 Sub-Bab A dan tata letak kartu kalimat serta bingkai Sub-Bab A.
 */
import type { Titik } from "../lemari-k1b1a/periksa-jawab";

export { bilanganDariUcapan, periksaCentang, periksaLingkari, LEBAR_ADEGAN, TINGGI_ADEGAN, type Goresan, type Titik } from "../lemari-k1b1a/periksa-jawab";
export { BINGKAI, KERANJANG_KANAN, KERANJANG_KIRI, UKURAN_KARTU, letakDi, letakKartu, tengahSel, type Kotak } from "../kebun-k1b2a/periksa";

/** Garis bilangan nol sampai sepuluh. */
export const GARIS = { x0: 20, y: 118, s: 26 };
export const xAngka = (n: number): number => GARIS.x0 + n * GARIS.s;
/** Titik sasaran tanda untuk angka n: batu pijakan (benda) atau bulatan angka di bawah garis (diagram). */
export const titikAngka = (n: number, batu = false): Titik => ({ x: xAngka(n), y: batu ? GARIS.y + 9 : GARIS.y + 30 });

/** Kantong berjajar: k kantong lebar 50, jarak 8, di tengah. */
export const KANTONG = { w: 50, h: 92, y: 44, jarak: 8 };
export const xKantong = (k: number, j: number): number => 150 - (k * KANTONG.w + (k - 1) * KANTONG.jarak) / 2 + j * (KANTONG.w + KANTONG.jarak);
export const tengahKantong = (k: number, j: number): Titik => ({ x: xKantong(k, j) + KANTONG.w / 2, y: KANTONG.y + KANTONG.h / 2 });
/** Benda ke-i di dalam kantong ke-j (dua kolom). */
export const diKantong = (k: number, j: number, i: number): Titik => ({ x: xKantong(k, j) + 14 + (i % 2) * 22, y: KANTONG.y + 24 + Math.floor(i / 2) * 24 });
