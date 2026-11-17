/**
 * Tata letak adegan dan pemeriksa kanvas Kelas 1 Bab 7 Sub-Bab A (tanpa React, diuji di Node: scripts/uji-tiang-k1b7a.mjs).
 * Kanvas adegan 300 x 200. Benda berdiri tegak di garis awal (DASAR); tinggi tiap satuan tak baku SATU. Memakai ulang pemeriksa Kelas 1 Bab 1 Sub-Bab A
 * (lingkari, tanda satu per satu) dan pengenal ucapan sampai dua puluh Bab 5 Sub-Bab A.
 */
import type { Titik } from "../lemari-k1b1a/periksa-jawab";

export { periksaCentang, periksaLingkari, periksaTulis, LEBAR_ADEGAN, TINGGI_ADEGAN, type Goresan, type Titik } from "../lemari-k1b1a/periksa-jawab";
export { bilanganDariUcapan20 } from "../ikan-k1b5a/periksa";

/* ------------------------------ Satu baris benda berdiri di garis awal ------------------------------ */
export const DASAR = 176;
export const SATU = 11;
/** Jarak antarbenda: paling lebar 34, makin sempit bila bendanya banyak. */
export const jarakBenda = (n: number): number => Math.min(34, Math.floor(264 / n));
export const letakX = (i: number, n: number): number => Number((150 + (i - (n - 1) / 2) * jarakBenda(n)).toFixed(1));
export const lebarBatang = (n: number): number => Math.min(22, Math.round(jarakBenda(n) * 0.66));
/** Tinggi ujung benda (y); alas menaikkan benda. */
export const puncakY = (panjang: number, alas = 0): number => DASAR - (panjang + alas) * SATU;
/** Titik untuk tanda centang di atas ujung benda ke-i. */
export const titikTanda = (i: number, n: number, panjang: number, alas = 0): Titik => ({ x: letakX(i, n), y: puncakY(panjang, alas) - 9 });
/** Jari-jari penerimaan tanda: separuh jarak antarbenda, paling lebar enam belas. */
export const jariTanda = (n: number): number => Math.min(16, jarakBenda(n) / 2);
/** Pusat benda ke-i (untuk lingkari). */
export const pusatBenda = (i: number, n: number, panjang: number): Titik => ({ x: letakX(i, n), y: DASAR - (panjang * SATU) / 2 });

/* ------------------------------ Menyusun tangga: baris acak di atas, tangga di bawah (separuh skala) ------------------------------ */
export const SATU_T = 5.5;
export const DASAR_ATAS = 98;
export const DASAR_BAWAH = 180;
export const puncakT = (panjang: number, dasar: number): number => dasar - panjang * SATU_T;
