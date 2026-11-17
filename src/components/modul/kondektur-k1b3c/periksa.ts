/**
 * Tata letak kanvas Kelas 1 Bab 3 Sub-Bab C (tanpa React, diuji di Node: scripts/uji-kondektur-k1b3c.mjs).
 * Kanvas adegan 300 x 200. Pemeriksa lingkari, tanda satu per satu, ucapan, dan tulisan angka memakai ulang Kelas 1 Bab 1 Sub-Bab A.
 */
import type { Titik } from "../lemari-k1b1a/periksa-jawab";

export { bilanganDariUcapan, periksaCentang, periksaLingkari, LEBAR_ADEGAN, TINGGI_ADEGAN, type Goresan, type Titik } from "../lemari-k1b1a/periksa-jawab";

export type Kotak = { x: number; y: number; w: number; h: number };

/** Kartu kalimat: tiga kartu lebar bertumpuk di bawah adegan. */
export const UKURAN_KARTU = { w: 272, h: 28 };
export const letakKartu = (i: number): Titik => ({ x: 150, y: 116 + i * 32 });

/** Periksa: gerbong di kiri atas, catatan kondektur di kanan atas. */
export const GERBONG_KECIL: Kotak = { x: 14, y: 8, w: 184, h: 86 };
export const CATATAN: Kotak = { x: 204, y: 8, w: 82, h: 86 };
export const letakGerbongKecil = (i: number): Titik => ({ x: 36 + (i % 5) * 34, y: 34 + Math.floor(i / 5) * 32 });

/** Tukar tempat: dua kumpulan kiri dan kanan. */
export const KIRI: Kotak = { x: 14, y: 24, w: 128, h: 92 };
export const KANAN: Kotak = { x: 158, y: 24, w: 128, h: 92 };
export const letakDi = (k: Kotak, i: number): Titik => ({ x: k.x + 20 + (i % 4) * 29, y: k.y + 26 + Math.floor(i / 4) * 30 });

/** Keluarga: gerbong lebar, dua baris lima; biru dulu lalu merah. */
export const GERBONG: Kotak = { x: 14, y: 30, w: 272, h: 96 };
export const letakGerbong = (i: number): Titik => ({ x: 46 + (i % 5) * 52, y: 58 + Math.floor(i / 5) * 42 });

/** Segitiga fakta: pucuk di atas, dua pojok di bawah. */
export const PUCUK: Kotak = { x: 90, y: 6, w: 120, h: 72 };
export const POJOK_KIRI: Kotak = { x: 14, y: 116, w: 124, h: 72 };
export const POJOK_KANAN: Kotak = { x: 162, y: 116, w: 124, h: 72 };
export const letakPucuk = (i: number): Titik => ({ x: PUCUK.x + 16 + (i % 5) * 22, y: PUCUK.y + 26 + Math.floor(i / 5) * 26 });
export const letakPojok = (k: Kotak, i: number): Titik => ({ x: k.x + 18 + (i % 5) * 22, y: k.y + 28 + Math.floor(i / 5) * 26 });

/** Bilangan hilang: satu baris kursi sebanyak c, di tengah. */
export const letakKursi = (c: number, i: number): Titik => ({ x: 150 - ((c - 1) * 28) / 2 + i * 28, y: 112 });
export const kursiHilang = (a: number, b: number): number[] => Array.from({ length: b }, (_, j) => a + j);
