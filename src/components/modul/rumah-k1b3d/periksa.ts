/**
 * Tata letak kanvas Kelas 1 Bab 3 Sub-Bab D (tanpa React, diuji di Node: scripts/uji-rumah-k1b3d.mjs).
 * Kanvas adegan 300 x 200. Pemeriksa lingkari, tanda satu per satu, coret bebas, ucapan, dan tulisan angka memakai ulang Bab 1 dan Sub-Bab A.
 */
import type { Titik } from "../lemari-k1b1a/periksa-jawab";

export { bilanganDariUcapan, periksaCentang, periksaLingkari, LEBAR_ADEGAN, TINGGI_ADEGAN, type Goresan, type Titik } from "../lemari-k1b1a/periksa-jawab";
export { periksaCoretBebas } from "../bekal-k1b3a/periksa";

export type Kotak = { x: number; y: number; w: number; h: number };

/** Kartu kalimat: tiga kartu lebar bertumpuk di bawah kartu cerita. */
export const UKURAN_KARTU = { w: 272, h: 28 };
export const letakKartu = (i: number): Titik => ({ x: 150, y: 116 + i * 32 });
export const KARTU_CERITA: Kotak = { x: 14, y: 8, w: 272, h: 86 };

/** Jawab: meja di atas (dua baris lima), tempat yang pergi di bawah. */
export const MEJA: Kotak = { x: 14, y: 8, w: 272, h: 100 };
export const PERGI: Kotak = { x: 14, y: 124, w: 272, h: 64 };
export const letakMeja = (i: number): Titik => ({ x: 46 + (i % 5) * 52, y: 40 + Math.floor(i / 5) * 40 });
export const letakPergi = (j: number): Titik => ({ x: 34 + j * 26, y: 160 });

/** Model batang atau nampan: sel ke-i dari a sel berderet di tengah, lebar 26. */
export const SEL = 26;
export const letakSel = (a: number, i: number): Titik => ({ x: 150 - (a * SEL) / 2 + SEL / 2 + i * SEL, y: 112 });
/** Sel yang dicari pada model batang: bagian setelah b sel yang diketahui. */
export const selDicari = (a: number, b: number): number[] => Array.from({ length: a - b }, (_, j) => b + j);

/** Kunci: kartu cerita kecil di atas, tiga kata di bawah. */
export const CERITA_KECIL: Kotak = { x: 14, y: 8, w: 272, h: 78 };
export const UKURAN_KATA = { w: 84, h: 30 };
export const letakKata = (i: number): Titik => ({ x: 60 + i * 90, y: 120 });

/** Dua kali: benda di nampan, dua baris lima. */
export const NAMPAN: Kotak = { x: 14, y: 30, w: 272, h: 130 };
export const letakNampan = (i: number): Titik => ({ x: 46 + (i % 5) * 52, y: 70 + Math.floor(i / 5) * 54 });
