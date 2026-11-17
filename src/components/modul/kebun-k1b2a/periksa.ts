/**
 * Tata letak dan pemeriksa kanvas Kelas 1 Bab 2 Sub-Bab A (tanpa React, diuji di Node: scripts/uji-kebun-k1b2a.mjs).
 * Kanvas adegan 300 x 200. Memakai ulang pemeriksa Kelas 1 Bab 1 Sub-Bab A (lingkari, tanda satu per satu, ucapan, tulisan angka).
 */
import type { Titik } from "../lemari-k1b1a/periksa-jawab";

export { bilanganDariUcapan, periksaCentang, periksaLingkari, LEBAR_ADEGAN, TINGGI_ADEGAN, type Goresan, type Titik } from "../lemari-k1b1a/periksa-jawab";

export type Kotak = { x: number; y: number; w: number; h: number };

/** Kartu kalimat: tiga kartu lebar bertumpuk di bawah adegan. */
export const UKURAN_KARTU = { w: 272, h: 28 };
export const letakKartu = (i: number): Titik => ({ x: 150, y: 116 + i * 32 });

/** Benda ke-i di dalam kotak, lima per baris, jarak 24. */
export const letakDi = (k: Kotak, i: number, kolom = 5): Titik => ({ x: k.x + 18 + (i % kolom) * 24, y: k.y + 22 + Math.floor(i / kolom) * 26 });

/** Adegan kalimat: dua keranjang (gabung) atau bedeng dan kiriman (datang), di bagian atas kanvas. */
export const KERANJANG_KIRI: Kotak = { x: 14, y: 8, w: 132, h: 84 };
export const KERANJANG_KANAN: Kotak = { x: 154, y: 8, w: 132, h: 84 };

/** Datang: bedeng di bawah, keranjang kiriman di kanan atas. */
export const BEDENG: Kotak = { x: 16, y: 122, w: 268, h: 50 };
export const KIRIMAN: Kotak = { x: 190, y: 26, w: 96, h: 74 };
export const letakBedeng = (i: number): Titik => ({ x: 32 + i * 26, y: 148 });
export const letakKiriman = (i: number): Titik => ({ x: KIRIMAN.x + 22 + (i % 3) * 26, y: KIRIMAN.y + 24 + Math.floor(i / 3) * 26 });

/** Hitung maju: karung berangka di kiri, benda di luar karung berderet di kanan. */
export const KARUNG: Kotak = { x: 16, y: 52, w: 112, h: 100 };
export const letakLuar = (i: number): Titik => ({ x: 160 + i * 34, y: 104 });

/** Tikar bagian-bagian-utuh. */
export const UTUH: Kotak = { x: 20, y: 10, w: 260, h: 74 };
export const BAGIAN_A: Kotak = { x: 20, y: 112, w: 126, h: 74 };
export const BAGIAN_B: Kotak = { x: 154, y: 112, w: 126, h: 74 };
/** Benda ke-i di kotak utuh (dua baris lima, di tengah). */
export const letakUtuh = (i: number): Titik => ({ x: 102 + (i % 5) * 24, y: 34 + Math.floor(i / 5) * 28 });

/** Bingkai sepuluh di tengah. */
export const BINGKAI = { x: 85, y: 44, s: 26 };
export const tengahSel = (i: number): Titik => ({ x: BINGKAI.x + (i % 5) * BINGKAI.s + BINGKAI.s / 2, y: BINGKAI.y + Math.floor(i / 5) * BINGKAI.s + BINGKAI.s / 2 });
/** Sel sasaran tanda: sel kosong berikutnya sebanyak b, mulai dari sel ke-a. */
export const selSasaran = (a: number, b: number): number[] => Array.from({ length: b }, (_, j) => a + j);
