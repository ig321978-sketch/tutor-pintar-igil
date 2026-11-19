/**
 * Tata letak murni (tanpa React) untuk gambar Sub-Bab F Kelas 3 Bab 1: kotak berisi benda, susunan baris kolom, dan garis bilangan lompatan.
 * Dipakai bersama tugas CPA dan Simulasi; diuji di Node: scripts/uji-kali-k3b1f.mjs. Semua ukuran dalam satuan kanvas 300 x 200.
 */
const bulatkan = (n: number): number => Math.round(n * 10) / 10;
/** Pembulatan ke bawah satu desimal supaya ukuran tidak melebihi daerah. */
const lantai = (n: number): number => Math.floor(n * 10) / 10;

export type TataKotak = {
  /** Ukuran satu sel benda. */
  cs: number;
  /** Banyak kolom benda dan baris benda dalam satu kotak. */
  ic: number;
  ir: number;
  /** Lebar dan tinggi satu kotak. */
  bw: number;
  bh: number;
  /** Pojok kiri-atas tiap kotak. */
  kotak: { x: number; y: number }[];
};

/** Kolom benda dalam satu kotak untuk `s` benda. */
export const kolomIsi = (s: number): number => (s <= 5 ? Math.max(1, s) : s <= 8 ? Math.ceil(s / 2) : 5);

/**
 * Letak `g` kotak yang masing-masing menampung paling banyak `s` benda, di daerah `lebar` x `tinggi` (kotak berpusat di daerah itu).
 * Banyak kolom kotak dipilih supaya sel benda paling besar (paling banyak 26).
 */
export function tataKotak(g: number, s: number, lebar = 292, tinggi = 140): TataKotak {
  const gap = 8;
  const ic = kolomIsi(s);
  const ir = Math.max(1, Math.ceil(s / ic));
  let terbaik: { kol: number; cs: number } = { kol: 1, cs: 0 };
  for (let kol = 1; kol <= g; kol += 1) {
    const baris = Math.ceil(g / kol);
    const cs = Math.min(26, (lebar - gap * (kol - 1) - 8 * kol) / (ic * kol), (tinggi - gap * (baris - 1) - 8 * baris) / (ir * baris));
    if (cs > terbaik.cs + 0.001) terbaik = { kol, cs };
  }
  const cs = lantai(Math.max(6, terbaik.cs));
  const kol = terbaik.kol;
  const baris = Math.ceil(g / kol);
  const bw = bulatkan(ic * cs + 8);
  const bh = bulatkan(ir * cs + 8);
  const kotak: { x: number; y: number }[] = [];
  for (let i = 0; i < g; i += 1) {
    const b = Math.floor(i / kol);
    const dalam = Math.min(kol, g - b * kol);
    const total = dalam * bw + (dalam - 1) * gap;
    const q = i % kol;
    kotak.push({ x: bulatkan((lebar - total) / 2 + q * (bw + gap)), y: bulatkan((tinggi - (baris * bh + (baris - 1) * gap)) / 2 + b * (bh + gap)) });
  }
  return { cs, ic, ir, bw, bh, kotak };
}

/** Pusat benda ke-k (dari 0) dalam kotak berpojok (x, y). */
export const pusatIsi = (t: TataKotak, x: number, y: number, k: number): [number, number] => [bulatkan(x + 4 + ((k % t.ic) + 0.5) * t.cs), bulatkan(y + 4 + (Math.floor(k / t.ic) + 0.5) * t.cs)];

export type TataLarik = { cs: number; x0: number; y0: number };
/** Letak susunan `r` baris `c` kolom di daerah `lebar` x `tinggi`: sel paling besar (paling banyak 26) dan pojok kiri-atas susunan. */
export function tataLarik(r: number, c: number, lebar = 292, tinggi = 140): TataLarik {
  const cs = lantai(Math.max(6, Math.min(26, lebar / c, tinggi / r)));
  return { cs, x0: bulatkan((lebar - c * cs) / 2), y0: bulatkan((tinggi - r * cs) / 2) };
}
/** Pusat benda baris ke-i, kolom ke-j (dari 0). */
export const pusatLarik = (t: TataLarik, i: number, j: number): [number, number] => [bulatkan(t.x0 + (j + 0.5) * t.cs), bulatkan(t.y0 + (i + 0.5) * t.cs)];

export type TataLompat = { x: number[]; kiri: number; kanan: number };
/** Garis bilangan dari 0 sampai m n dengan titik pendaratan 0, m, ..., m n pada x dari `kiri` sampai `kanan`. */
export function tataLompat(m: number, n: number, kiri = 24, kanan = 280): TataLompat {
  const total = m * n;
  return { x: Array.from({ length: n + 1 }, (_, i) => bulatkan(kiri + ((kanan - kiri) * (i * m)) / total)), kiri, kanan };
}
