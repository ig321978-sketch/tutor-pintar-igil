/**
 * Tata letak dan pemeriksa kanvas Kelas 1 Bab 3 Sub-Bab A (tanpa React, diuji di Node: scripts/uji-bekal-k1b3a.mjs).
 * Kanvas adegan 300 x 200. Memakai ulang pemeriksa Kelas 1 Bab 1 Sub-Bab A (lingkari, tanda satu per satu, ucapan, tulisan angka).
 */
import { periksaCentang, type Goresan, type Titik } from "../lemari-k1b1a/periksa-jawab";

export { bilanganDariUcapan, periksaCentang, periksaLingkari, LEBAR_ADEGAN, TINGGI_ADEGAN, type Goresan, type Titik } from "../lemari-k1b1a/periksa-jawab";

export type Kotak = { x: number; y: number; w: number; h: number };

/** Kartu kalimat: tiga kartu lebar bertumpuk di bawah adegan. */
export const UKURAN_KARTU = { w: 272, h: 28 };
export const letakKartu = (i: number): Titik => ({ x: 150, y: 116 + i * 32 });

/** Adegan kalimat: satu wadah lebar (kotak bekal atau gerbong) di bagian atas, dua baris lima. */
export const WADAH_KALIMAT: Kotak = { x: 14, y: 8, w: 272, h: 84 };
export const letakKalimat = (i: number): Titik => ({ x: 70 + (i % 5) * 40, y: 36 + Math.floor(i / 5) * 32 });

/** Pergi: gerbong di atas (dua baris lima), peron di bawah untuk yang turun. */
export const GERBONG: Kotak = { x: 14, y: 10, w: 272, h: 100 };
export const PERON: Kotak = { x: 14, y: 128, w: 272, h: 60 };
export const letakGerbong = (i: number): Titik => ({ x: 58 + (i % 5) * 46, y: 44 + Math.floor(i / 5) * 40 });
export const letakPeron = (j: number): Titik => ({ x: 42 + j * 30, y: 162 });

/** Mengambil: benda di meja, dua baris lima. */
export const MEJA: Kotak = { x: 14, y: 30, w: 272, h: 130 };
export const letakMeja = (i: number): Titik => ({ x: 46 + (i % 5) * 52, y: 70 + Math.floor(i / 5) * 54 });

/** Menghitung mundur: satu deret di tengah, rapat bila banyak. */
export const jarakDeret = (a: number): number => Math.min(30, Math.floor(260 / Math.max(1, a)));
export const letakDeret = (a: number, i: number): Titik => {
  const s = jarakDeret(a);
  return { x: 150 - ((a - 1) * s) / 2 + i * s, y: 116 };
};
/** Indeks yang diberi tanda saat mundur b langkah dari ujung kanan. */
export const sasaranMundur = (a: number, b: number): number[] => Array.from({ length: b }, (_, j) => a - 1 - j);

/** Bingkai sepuluh di tengah. */
export const BINGKAI = { x: 85, y: 50, s: 26 };
export const tengahSel = (i: number): Titik => ({ x: BINGKAI.x + (i % 5) * BINGKAI.s + BINGKAI.s / 2, y: BINGKAI.y + Math.floor(i / 5) * BINGKAI.s + BINGKAI.s / 2 });
/** Sekat sasaran: b sekat terisi paling belakang dari a. */
export const selSasaran = (a: number, b: number): number[] => Array.from({ length: b }, (_, j) => a - 1 - j);

/**
 * Coret bebas: anak mencoret b benda mana saja. Benar bila tepat b benda kena tanda masing-masing satu kali dan tidak ada tanda nyasar.
 * `kena` = banyak benda yang kena tanda.
 */
export function periksaCoretBebas(gs: readonly Goresan[], letak: readonly Titik[], b: number, r = 20): { benar: boolean; kena: number; dobel: number; nyasar: number } {
  const p = periksaCentang(gs, letak, r);
  const kena = letak.length - p.lewat;
  return { benar: p.dobel === 0 && p.nyasar === 0 && kena === b, kena, dobel: p.dobel, nyasar: p.nyasar };
}
