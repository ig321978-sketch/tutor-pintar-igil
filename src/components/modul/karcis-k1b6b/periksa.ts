/**
 * Tata letak adegan dan pemeriksa kanvas Kelas 1 Bab 6 Sub-Bab B (tanpa React, diuji di Node: scripts/uji-karcis-k1b6b.mjs).
 * Kanvas adegan 300 x 200. Memakai ulang pemeriksa Kelas 1 Bab 1 Sub-Bab A (lingkari, tanda) dan pengenal ucapan sampai dua puluh Sub-Bab A Bab 5.
 */
import type { Titik } from "../lemari-k1b1a/periksa-jawab";

export { periksaCentang, periksaLingkari, periksaTulis, LEBAR_ADEGAN, TINGGI_ADEGAN, type Goresan, type Titik } from "../lemari-k1b1a/periksa-jawab";
export { bilanganDariUcapan20 } from "../ikan-k1b5a/periksa";

/* ------------------------------ Empat kartu bilangan (kembar tambah satu: pilih dua kartu) ------------------------------ */
export const KARTU_KEMBAR = { w: 58, h: 76 };
export const letakKartuKembar = (i: number): Titik => ({ x: 42 + i * 72, y: 106 });

/* ------------------------------ Dua kelompok (hitung maju, belasan, kembar) ------------------------------ */
export const KOTAK_KELOMPOK = { w: 132, h: 92 };
export const letakKelompok = (i: number): Titik => ({ x: 78 + i * 144, y: 96 });
/** Letak benda ke-i (relatif terhadap pusat kelompok), sepuluh tiap dua baris lima bila lebih dari sepuluh. */
export const letakIsi = (i: number): Titik => ({ x: ((i % 5) - 2) * 20, y: -26 + Math.floor(i / 5) * 22 });

/* ------------------------------ Bingkai sepuluh dan sisa (bagan) ------------------------------ */
export const BINGKAI = { x: 28, y: 52, sel: 20 };
export const sel = (i: number): Titik => ({ x: BINGKAI.x + (i % 5) * BINGKAI.sel + BINGKAI.sel / 2, y: BINGKAI.y + Math.floor(i / 5) * BINGKAI.sel + BINGKAI.sel / 2 });
/** Letak sisa ke-i di luar bingkai. */
export const letakSisa = (i: number): Titik => ({ x: 164 + (i % 5) * 22, y: BINGKAI.y + 10 + Math.floor(i / 5) * 22 });

/* ------------------------------ Garis bilangan nol sampai dua puluh (lompat) ------------------------------ */
export const GARIS = { x0: 16, x1: 284, y: 120 };
export const xGaris = (n: number): number => GARIS.x0 + (n / 20) * (GARIS.x1 - GARIS.x0);

/* ------------------------------ Jalan petak katak (Concrete lompat) ------------------------------ */
export const petak = (n: number): Titik => ({ x: 18 + ((n - 1) % 10) * 28, y: n <= 10 ? 78 : 134 });
