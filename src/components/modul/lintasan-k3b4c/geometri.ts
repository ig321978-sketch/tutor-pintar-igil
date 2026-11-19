/**
 * Geometri murni untuk gambar Kelas 3 Bab 4 Sub-Bab C (tanpa React, diuji di Node: scripts/uji-lintasan-k3b4c.mjs).
 * Semua gambar dihitung dari data: sudut sungguh sebesar derajatnya, jarak garis sejajar sungguh sama, panjang sisi persegi sungguh sama.
 * Kanvas 300 x 200; kertas petak berukuran 10 x 6 petak (tiap petak 24).
 */
import type { Bentuk } from "./logika-cpa";

export type Titik = [number, number];
export const PETAK = { x0: 30, y0: 26, u: 24, kolom: 10, baris: 6 } as const;
export const ujungKanan = PETAK.x0 + PETAK.kolom * PETAK.u;

export type DuaTali = { atas: [Titik, Titik]; bawah: [Titik, Titik] };
/** Dua tali pada kertas petak: tali atas dari kiri-atas turun `miring` petak ke kanan; tali bawah berjarak dKiri petak (tegak) di kiri dan dKanan petak di kanan. */
export function duaTali(dKiri: number, dKanan: number, miring: number): DuaTali {
  const { x0, y0, u } = PETAK;
  return {
    atas: [[x0, y0], [ujungKanan, y0 + miring * u]],
    bawah: [[x0, y0 + dKiri * u], [ujungKanan, y0 + (miring + dKanan) * u]],
  };
}
/** Tinggi garis (y) pada x tertentu. */
export const yPada = (g: [Titik, Titik], x: number): number => g[0][1] + ((g[1][1] - g[0][1]) * (x - g[0][0])) / (g[1][0] - g[0][0]);
/** Jarak tegak (dalam petak) antara tali atas dan bawah pada x tertentu. */
export const jarakPetak = (t: DuaTali, x: number): number => (yPada(t.bawah, x) - yPada(t.atas, x)) / PETAK.u;
export const kemiringan = (g: [Titik, Titik]): number => (g[1][1] - g[0][1]) / (g[1][0] - g[0][0]);

const rad = (d: number): number => (d * Math.PI) / 180;
const bulat1 = (n: number): number => Math.round(n * 100) / 100;
/**
 * Dua garis yang bertemu di B: garis pertama BA ke kanan sepanjang `p`, garis kedua BC naik dengan sudut `derajat` dari BA (berlawanan arah jarum jam).
 * Kotak pembatas dipusatkan di (cx, cy).
 */
export function titikTemu(cx: number, cy: number, derajat: number, p: number): { B: Titik; A: Titik; C: Titik } {
  const cxC = p * Math.cos(rad(derajat));
  const syC = p * Math.sin(rad(derajat));
  const minX = Math.min(0, cxC);
  const maxX = p;
  const bx = cx - (minX + maxX) / 2;
  const by = cy + syC / 2;
  return { B: [bulat1(bx), bulat1(by)], A: [bulat1(bx + p), bulat1(by)], C: [bulat1(bx + cxC), bulat1(by - syC)] };
}
/** Sudut (derajat) di B antara garis BA dan BC. */
export function sudutDi(B: Titik, A: Titik, C: Titik): number {
  const a1 = Math.atan2(-(A[1] - B[1]), A[0] - B[0]);
  const a2 = Math.atan2(-(C[1] - B[1]), C[0] - B[0]);
  let d = ((a2 - a1) * 180) / Math.PI;
  d = ((d % 360) + 360) % 360;
  return Math.round(d * 100) / 100;
}
/** Pojok kertas lipat (persegi) berukuran `s` dengan sudut kiri-bawah tepat di B dan sisinya sepanjang BA dan tegak ke atas. */
export function pojokKertas(B: Titik, s: number): Titik[] {
  return [B, [bulat1(B[0] + s), B[1]], [bulat1(B[0] + s), bulat1(B[1] - s)], [B[0], bulat1(B[1] - s)]];
}

/** Titik sudut bangun polos berpusat di (cx, cy) dengan ukuran dasar `s`. Lingkaran tidak punya titik sudut. */
export function titikBangun(b: Bentuk, cx: number, cy: number, s: number): Titik[] {
  switch (b) {
    case "segitiga":
      return [[cx, bulat1(cy - s * 0.55)], [bulat1(cx - s * 0.62), bulat1(cy + s * 0.45)], [bulat1(cx + s * 0.62), bulat1(cy + s * 0.45)]];
    case "persegi":
      return [[bulat1(cx - s / 2), bulat1(cy - s / 2)], [bulat1(cx + s / 2), bulat1(cy - s / 2)], [bulat1(cx + s / 2), bulat1(cy + s / 2)], [bulat1(cx - s / 2), bulat1(cy + s / 2)]];
    case "persegiPanjang":
      return [[bulat1(cx - s * 0.8), bulat1(cy - s * 0.4)], [bulat1(cx + s * 0.8), bulat1(cy - s * 0.4)], [bulat1(cx + s * 0.8), bulat1(cy + s * 0.4)], [bulat1(cx - s * 0.8), bulat1(cy + s * 0.4)]];
    case "lingkaran":
      return [];
  }
}
export const jarak = (p: Titik, q: Titik): number => Math.hypot(q[0] - p[0], q[1] - p[1]);
/** Banyak sudut siku-siku pada poligon tertutup (selisih sudut dengan 90 derajat kurang dari setengah derajat). */
export function banyakSikuPoligon(t: readonly Titik[]): number {
  let n = 0;
  for (let i = 0; i < t.length; i += 1) {
    const p = t[(i + t.length - 1) % t.length];
    const q = t[i];
    const r = t[(i + 1) % t.length];
    const v1: Titik = [p[0] - q[0], p[1] - q[1]];
    const v2: Titik = [r[0] - q[0], r[1] - q[1]];
    const kos = (v1[0] * v2[0] + v1[1] * v2[1]) / (Math.hypot(...v1) * Math.hypot(...v2));
    if (Math.abs((Math.acos(Math.max(-1, Math.min(1, kos))) * 180) / Math.PI - 90) < 0.5) n += 1;
  }
  return n;
}
export const titikKePoints = (t: readonly Titik[]): string => t.map((p) => `${p[0]},${p[1]}`).join(" ");

/** Pembagian tempat n titik temu pada satu baris: pusat tiap sel (cx) dan panjang garis yang sesuai. */
export function selTemu(n: number): { pusat: number[]; panjang: number } {
  const lebar = 270 / n;
  return { pusat: Array.from({ length: n }, (_, i) => bulat1(15 + lebar * (i + 0.5))), panjang: n === 4 ? 34 : n === 3 ? 42 : 56 };
}
