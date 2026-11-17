/**
 * Tata letak dan pemeriksa kanvas Kelas 1 Bab 4 Sub-Bab B (tanpa React, diuji di Node: scripts/uji-teras-k1b4b.mjs).
 * Kanvas adegan 300 x 200. Memakai ulang pemeriksa Kelas 1 Bab 1 Sub-Bab A (lingkari, ucapan, tulisan angka).
 */
import type { Titik } from "../lemari-k1b1a/periksa-jawab";

export { bilanganDariUcapan, periksaLingkari, LEBAR_ADEGAN, TINGGI_ADEGAN, type Goresan, type Titik } from "../lemari-k1b1a/periksa-jawab";

export type Kotak = { x: number; y: number; w: number; h: number };

/** Jari-jari barang besar; barang kecil = 0,6 kali. Kartu kata 52 x 26. */
export const JARI = 16;
export const JARI_BEDA = 20;
export const KARTU = { w: 52, h: 26 };
export const jariUkuran = (r: number, besar: boolean): number => (besar ? r : Math.round(r * 0.6 * 10) / 10);

/** Barang berjajar (satu baris bila paling banyak lima, dua baris bila lebih), jarak 56. */
function jajar(i: number, n: number, y1: number, y2: number): Titik {
  if (n <= 5) return { x: 150 + (i - (n - 1) / 2) * 56, y: (y1 + y2) / 2 };
  const atas = Math.ceil(n / 2);
  const baris = i < atas ? 0 : 1;
  const m = baris === 0 ? atas : n - atas;
  const j = baris === 0 ? i : i - atas;
  return { x: 150 + (j - (m - 1) / 2) * 56, y: baris === 0 ? y1 : y2 };
}

/* ------------------------------ Metode IGIL: barang di atas, keranjang di bawah ------------------------------ */
export const letakAtas = (i: number, n: number): Titik => jajar(i, n, 36, 82);
export function keranjangBawah(j: number, m: number): Kotak {
  const w = (288 - (m - 1) * 6) / m;
  return { x: 6 + j * (w + 6), y: 110, w, h: 86 };
}
/** Barang kecil di dalam keranjang (tiga baris). */
export function slotMini(t: Kotak, n: number): Titik {
  const kolom = Math.floor((t.w - 8) / 20);
  const x0 = t.x + (t.w - (kolom - 1) * 20) / 2;
  return { x: x0 + (n % kolom) * 20, y: t.y + 32 + Math.floor(n / kolom) * 18 };
}
export const muatMini = (t: Kotak): number => Math.floor((t.w - 8) / 20) * 3;
export const JARI_MINI = 7;

/* ------------------------------ Attribute Sort: pita keranjang lama, pita keranjang baru ------------------------------ */
export function pitaLama(j: number, m: number): Kotak {
  const t = 128 / m;
  return { x: 6, y: 18 + j * t, w: 288, h: t - 4 };
}
/** Isi pita lama: bangun (paling banyak lima, jarak 46) atau kartu kata (paling banyak empat, jarak 54). Nama pita di kiri. */
export const letakPita = (t: Kotak, n: number, kartu: boolean): Titik => ({ x: kartu ? 86 + n * 54 : 82 + n * 46, y: t.y + t.h / 2 + 2 });
export const muatPita = (kartu: boolean): number => (kartu ? 4 : 5);
export const PITA_BARU: Kotak = { x: 6, y: 150, w: 288, h: 46 };
export const letakBaru = (n: number): Titik => ({ x: 84 + n * 21, y: PITA_BARU.y + PITA_BARU.h / 2 + 4 });

/* ------------------------------ Guess My Rule: dua keranjang dan tiga kartu aturan ------------------------------ */
export const KIRI: Kotak = { x: 6, y: 18, w: 140, h: 134 };
export const KANAN: Kotak = { x: 154, y: 18, w: 140, h: 134 };
/** Letak isi keranjang tebak: empat kolom (bangun) atau dua kolom (kartu kata). */
export function slotTebak(t: Kotak, n: number, kartu: boolean): Titik {
  if (kartu) return { x: t.x + 38 + (n % 2) * 64, y: t.y + 34 + Math.floor(n / 2) * 28 };
  return { x: t.x + 22 + (n % 4) * 32, y: t.y + 36 + Math.floor(n / 4) * 30 };
}
export const muatTebak = (kartu: boolean): number => (kartu ? 8 : 12);
export const letakKartuAturan = (i: number): Titik => ({ x: 55 + i * 95, y: 174 });
export const KARTU_ATURAN = { w: 84, h: 32 };

/* ------------------------------ Odd One Out ------------------------------ */
export const letakBeda = (i: number, n: number): Titik => jajar(i, n, 78, 142);
