/**
 * Tata letak adegan dan pemeriksa kanvas Kelas 1 Bab 7 Sub-Bab B "Papan Lantai Rumah Pohon" (tanpa React, diuji di Node: scripts/uji-lantai-k1b7b.mjs).
 * Kanvas adegan 300 x 200. Memakai ulang pemeriksa Kelas 1 Bab 1 Sub-Bab A (lingkari, tanda) dan pengenal ucapan Bab 5 Sub-Bab A.
 */
import type { Titik } from "../lemari-k1b1a/periksa-jawab";

export { periksaCentang, periksaLingkari, periksaTulis, LEBAR_ADEGAN, TINGGI_ADEGAN, type Goresan, type Titik } from "../lemari-k1b1a/periksa-jawab";
export { bilanganDariUcapan20 } from "../ikan-k1b5a/periksa";

/* ------------------------------ Taruh satuan dari ujung benda ------------------------------ */
/** Lebar satu satuan pendek. Benda sepanjang dua belas satuan pendek tepat muat (264). */
export const SATUAN_KECIL = 22;
export const X_UJUNG = 18;
export const BAR = { y: 62, h: 26 };
export const BARIS_SATUAN = { y: 112, h: 26 };
/** Pojok kiri satuan ke-i selebar k satuan pendek. */
export const kiriSatuan = (i: number, k: number): number => X_UJUNG + i * k * SATUAN_KECIL;
export const letakSatuan = (i: number, k: number): Titik => ({ x: kiriSatuan(i, k) + (k * SATUAN_KECIL) / 2, y: BARIS_SATUAN.y + BARIS_SATUAN.h / 2 });
/** Ujung kanan benda sepanjang p satuan pendek. */
export const ujungKanan = (panjang: number): number => X_UJUNG + panjang * SATUAN_KECIL;

/* ------------------------------ Kertas berpetak: dua pita ------------------------------ */
export const SEL = 22;
export const BARIS_PITA = [72, 122];
export const letakSel = (b: number, i: number): Titik => ({ x: X_UJUNG + i * SEL + SEL / 2, y: BARIS_PITA[b] + SEL / 2 });
export const pusatPita = (b: number, n: number): Titik => ({ x: X_UJUNG + (n * SEL) / 2, y: BARIS_PITA[b] + SEL / 2 });
