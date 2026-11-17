/**
 * Tata letak adegan dan pemeriksa kanvas Kelas 1 Bab 6 Sub-Bab A (tanpa React, diuji di Node: scripts/uji-nampan-k1b6a.mjs).
 * Kanvas adegan 300 x 200. Memakai ulang pemeriksa Kelas 1 Bab 1 Sub-Bab A (lingkari, tanda) dan pengenal ucapan sampai dua puluh Bab 5 Sub-Bab A.
 */
import type { Titik } from "../lemari-k1b1a/periksa-jawab";

export { periksaCentang, periksaLingkari, periksaTulis, LEBAR_ADEGAN, TINGGI_ADEGAN, type Goresan, type Titik } from "../lemari-k1b1a/periksa-jawab";
export { bilanganDariUcapan20 } from "../ikan-k1b5a/periksa";

/* ------------------------------ Metode IGIL dan Equalizing: dua baris benda ------------------------------ */
/** Paling banyak benda dalam satu baris. */
export const MAKS_ITEM = 17;
export const BARIS = [78, 146];
export const KARTU_BARIS = { w: 36, h: 30 };
export const X_ITEM = 50;
export const JARAK_ITEM = 14.4;
export const RADIUS_TANDA = 7;
export const letakBaris = (b: number): Titik => ({ x: 22, y: BARIS[b] });
/** Letak benda ke-i pada baris b (nol atas, satu bawah). */
export const letakItem = (b: number, i: number): Titik => ({ x: X_ITEM + i * JARAK_ITEM, y: BARIS[b] });
/** Tempat benda atas setelah dipindahkan ke dekat pasangannya di baris bawah. */
export const letakDipasang = (i: number): Titik => ({ x: X_ITEM + i * JARAK_ITEM, y: BARIS[1] - 26 });

/* ------------------------------ Bar Model: dua batang kotak ------------------------------ */
export const MAKS_KOTAK = 18;
export const BATANG = { x0: 22, w: 14, h: 18, ys: [62, 120] };
/** Pusat kotak ke-i pada batang b (nol atas, satu bawah). */
export const letakKotak = (b: number, i: number): Titik => ({ x: BATANG.x0 + i * BATANG.w + BATANG.w / 2, y: BATANG.ys[b] + BATANG.h / 2 });

/* ------------------------------ Number Line Difference ------------------------------ */
/** Garis bilangan nol sampai dua puluh (Pictorial). */
export const GARIS = { x0: 14, jarak: 13.6, y: 124 };
export const xGaris = (v: number): number => GARIS.x0 + v * GARIS.jarak;
/** Pusat langkah dari bilangan v ke v+1 (tempat tanda dan tempat ketuk), di atas garis. */
export const letakLangkah = (v: number): Titik => ({ x: (xGaris(v) + xGaris(v + 1)) / 2, y: GARIS.y - 14 });
/** Jalur batu pijakan (Concrete): bendera di i = 0, lalu d batu. arah kanan atau kiri. */
export const JARAK_BATU_MAKS = 24;
export const jarakBatu = (d: number): number => Math.min(JARAK_BATU_MAKS, 230 / Math.max(d, 1));
export const Y_BATU = 128;
export const letakBatu = (i: number, d: number, arah: "kanan" | "kiri"): Titik => {
  const sp = jarakBatu(d);
  return { x: arah === "kanan" ? 150 - (d * sp) / 2 + i * sp : 150 + (d * sp) / 2 - i * sp, y: Y_BATU };
};

/* ------------------------------ Kartu bilangan (rupa lambang, lingkari) ------------------------------ */
export const letakBilangan = (b: number): Titik => ({ x: 90 + b * 120, y: 112 });
