/**
 * Tata letak dan pemeriksa kanvas Kelas 1 Bab 2 Sub-Bab C (tanpa React, diuji di Node: scripts/uji-pesanan-k1b2c.mjs).
 * Kanvas adegan 300 x 200. Memakai ulang pemeriksa Bab 1 Sub-Bab A dan kartu kalimat Sub-Bab A.
 */
import type { Goresan, Titik } from "../lemari-k1b1a/periksa-jawab";

export { bilanganDariUcapan, periksaCentang, periksaLingkari, LEBAR_ADEGAN, TINGGI_ADEGAN, type Goresan, type Titik } from "../lemari-k1b1a/periksa-jawab";
export { UKURAN_KARTU, letakKartu } from "../kebun-k1b2a/periksa";

/** Peragakan: dua rak di atas dan kantong pesanan di bawah. */
export const RAK_A = { x: 14, y: 12, w: 132, h: 70 };
export const RAK_B = { x: 154, y: 12, w: 132, h: 70 };
export const KANTONG = { x: 60, y: 104, w: 180, h: 88 };
export const diRak = (r: { x: number; y: number }, i: number): Titik => ({ x: r.x + 18 + (i % 5) * 24, y: r.y + 24 + Math.floor(i / 5) * 26 });
export const diKantong = (i: number): Titik => ({ x: KANTONG.x + 22 + (i % 6) * 27, y: KANTONG.y + 30 + Math.floor(i / 6) * 28 });

/** Papan gambar: dua baris, garis tengah di y = 100. Titik ke-i (klik) di baris r. */
export const GARIS_TENGAH = 100;
export const slotGambar = (baris: 0 | 1, i: number): Titik => ({ x: 26 + i * 27.6, y: baris === 0 ? 62 : 146 });

/** Hitung titik buatan tangan: goresan pendek (titik) di atas dan di bawah garis tengah; goresan panjang dihitung coretan. */
export function hitungTitikBaris(gs: readonly Goresan[]): { atas: number; bawah: number; coretan: number } {
  let atas = 0;
  let bawah = 0;
  let coretan = 0;
  for (const g of gs) {
    if (g.length === 0) continue;
    const xs = g.map((t) => t.x);
    const ys = g.map((t) => t.y);
    const besar = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
    if (besar > 22) {
      coretan += 1;
      continue;
    }
    const y = ys.reduce((p, q) => p + q, 0) / ys.length;
    if (y < GARIS_TENGAH) atas += 1;
    else bawah += 1;
  }
  return { atas, bawah, coretan };
}

/** Model batang: sel ke-i batang pertama (atas) dan kedua (bawah), lebar sel 24. */
export const selA = (i: number): Titik => ({ x: 28 + i * 24 + 12, y: 64 });
export const selB = (a: number, i: number): Titik => ({ x: 28 + (a + i) * 24 + 12, y: 114 });
