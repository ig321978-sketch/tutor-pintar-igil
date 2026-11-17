/**
 * Tata letak kanvas Kelas 1 Bab 3 Sub-Bab B (tanpa React, diuji di Node: scripts/uji-peron-k1b3b.mjs).
 * Kanvas adegan 300 x 200. Pemeriksa lingkari, tanda satu per satu, ucapan, dan tulisan angka memakai ulang Kelas 1 Bab 1 Sub-Bab A.
 */
import type { Titik } from "../lemari-k1b1a/periksa-jawab";

export { bilanganDariUcapan, periksaCentang, periksaLingkari, LEBAR_ADEGAN, TINGGI_ADEGAN, type Goresan, type Titik } from "../lemari-k1b1a/periksa-jawab";

export type Kotak = { x: number; y: number; w: number; h: number };

/** Kartu kalimat: tiga kartu lebar bertumpuk di bawah adegan. */
export const UKURAN_KARTU = { w: 272, h: 28 };
export const letakKartu = (i: number): Titik => ({ x: 150, y: 116 + i * 32 });

/** Dua kalimat: kumpulan utuh di kiri atas, kalimat yang sudah ditulis di kanan atas. */
export const KUMPULAN: Kotak = { x: 14, y: 8, w: 184, h: 86 };
export const SUDAH: Kotak = { x: 204, y: 8, w: 82, h: 86 };
export const letakKumpulan = (i: number): Titik => ({ x: 36 + (i % 5) * 34, y: 34 + Math.floor(i / 5) * 32 });

/** Nol dan sama: troli di tengah, dua baris lima. */
export const TROLI: Kotak = { x: 40, y: 64, w: 220, h: 64 };
export const letakTroli = (i: number): Titik => ({ x: 62 + (i % 5) * 44, y: 82 + Math.floor(i / 5) * 28 });

/** Bagan pasangan: kotak utuh di atas, dua kotak bagian di bawah. */
export const UTUH: Kotak = { x: 20, y: 8, w: 260, h: 76 };
export const BAGIAN_A: Kotak = { x: 20, y: 112, w: 126, h: 76 };
export const BAGIAN_B: Kotak = { x: 154, y: 112, w: 126, h: 76 };
export const letakUtuh = (i: number): Titik => ({ x: 102 + (i % 5) * 24, y: 34 + Math.floor(i / 5) * 28 });
export const letakBagian = (k: Kotak, i: number): Titik => ({ x: k.x + 18 + (i % 5) * 24, y: k.y + 26 + Math.floor(i / 5) * 28 });

/** Lompat mundur: tempat nol sampai sepuluh berderet. */
export const GARIS_Y = 112;
export const xTempat = (n: number): number => 20 + n * 26;
export const letakTempat = (n: number): Titik => ({ x: xTempat(n), y: GARIS_Y });
/** Tempat yang diberi tanda saat mundur b langkah dari a. */
export const sasaranGaris = (a: number, b: number): number[] => Array.from({ length: b }, (_, j) => a - 1 - j);

/** Sepuluh kursi satu baris. */
export const letakKursi = (i: number): Titik => ({ x: 24 + i * 28, y: 112 });
/** Kursi kosong untuk b terisi dari kiri. */
export const kursiKosong = (b: number): number[] => Array.from({ length: 10 - b }, (_, j) => b + j);
