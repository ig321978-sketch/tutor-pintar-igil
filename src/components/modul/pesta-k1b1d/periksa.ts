/**
 * Tata letak dan pemeriksa kanvas Kelas 1 Bab 1 Sub-Bab D (tanpa React, diuji di Node: scripts/uji-pesta-k1b1d.mjs).
 * Kanvas adegan 300 x 200. Memakai ulang pemeriksa Sub-Bab A (lingkari, tanda satu per satu, ucapan, tulisan angka).
 */
import type { Goresan, Titik } from "../lemari-k1b1a/periksa-jawab";

export { bilanganDariUcapan, periksaCentang, periksaLingkari, LEBAR_ADEGAN, TINGGI_ADEGAN, type Goresan, type Titik } from "../lemari-k1b1a/periksa-jawab";

/** Kartu pilihan pasangan: kisi tiga kolom. */
export const letakKartu = (i: number): Titik => ({ x: 55 + (i % 3) * 95, y: 58 + Math.floor(i / 3) * 84 });
export const UKURAN_KARTU = { w: 86, h: 62 };

/** Barisan benda untuk dipisah: di tengah, jarak 28. */
export const letakBaris = (n: number, y = 100): Titik[] => Array.from({ length: n }, (_, i) => ({ x: Math.round(150 - ((n - 1) * 28) / 2 + i * 28), y }));

/** Garis pemisah: semua goresan tegak (lebar kecil, cukup tinggi) dan memotong barisan di antara benda ke-a dan ke-(a+1). */
export function periksaPisah(gs: readonly Goresan[], baris: readonly Titik[], a: number): { benar: boolean; salahTempat: boolean } {
  if (gs.length === 0 || a <= 0 || a >= baris.length) return { benar: false, salahTempat: false };
  const y = baris[0].y;
  const kiri = baris[a - 1].x;
  const kanan = baris[a].x;
  let salahTempat = false;
  const ok = gs.every((g) => {
    const xs = g.map((t) => t.x);
    const ys = g.map((t) => t.y);
    const tegak = Math.max(...xs) - Math.min(...xs) <= 22 && Math.max(...ys) - Math.min(...ys) >= 30 && Math.min(...ys) < y - 8 && Math.max(...ys) > y + 8;
    const rata = xs.reduce((p, q) => p + q, 0) / xs.length;
    const tepat = rata > kiri + 3 && rata < kanan - 3;
    if (tegak && !tepat) salahTempat = true;
    return tegak && tepat;
  });
  return { benar: ok, salahTempat };
}

/** Ikatan benda: lingkaran utuh dan dua bagian, letak benda di dalam lingkaran utuh. */
export const IKATAN = { utuh: { x: 150, y: 62, r: 58 }, a: { x: 64, y: 158, r: 36 }, b: { x: 236, y: 158, r: 36 } };
export const letakDiUtuh = (i: number): Titik => ({ x: 106 + (i % 5) * 22, y: 50 + Math.floor(i / 5) * 26 });
/** Letak benda ke-i di dalam lingkaran bagian (pusat c). */
export const letakDiBagian = (c: Titik, i: number): Titik => ({ x: c.x - 22 + (i % 3) * 22, y: c.y - 12 + Math.floor(i / 3) * 18 });

/** Model batang: sel ke-i, jarak 26, berpusat di tengah. */
export const selBatang = (n: number, i: number, y = 92): { x: number; y: number; s: number } => ({ x: 150 - (n * 26) / 2 + i * 26, y, s: 26 });

/** Rak manik: letak manik ke-i bila `kiri` manik sudah digeser ke kiri. */
export const letakManik = (utuh: number, kiri: number, i: number): Titik => ({ x: i < kiri ? 30 + i * 22 : 280 - (utuh - i) * 22 + 11, y: 100 });
