/**
 * Tata letak dan pemeriksa kanvas Kelas 1 Bab 4 Sub-Bab A (tanpa React, diuji di Node: scripts/uji-bahan-k1b4a.mjs).
 * Kanvas adegan 300 x 200. Memakai ulang pemeriksa Kelas 1 Bab 1 Sub-Bab A (lingkari, tanda satu per satu, ucapan, tulisan angka).
 */
import type { Benda } from "./logika";
import type { Titik } from "../lemari-k1b1a/periksa-jawab";

export { bilanganDariUcapan, periksaCentang, periksaLingkari, LEBAR_ADEGAN, TINGGI_ADEGAN, type Goresan, type Titik } from "../lemari-k1b1a/periksa-jawab";

/** Titik sudut bangun berpusat (cx, cy) dengan jari-jari kira-kira r, sudah diputar. Lengkung: tanpa sudut. */
export function sudutBenda(b: Benda, cx: number, cy: number, r: number): Titik[] {
  const rad = ((b.putar ?? 0) * Math.PI) / 180;
  const putar = (p: Titik): Titik => ({
    x: Math.round((cx + p.x * Math.cos(rad) - p.y * Math.sin(rad)) * 10) / 10,
    y: Math.round((cy + p.x * Math.sin(rad) + p.y * Math.cos(rad)) * 10) / 10,
  });
  if (b.bentuk === "lengkung") return [];
  if (b.bentuk === "segitiga") {
    const pts = b.ragam === "siku" ? [{ x: -r * 0.8, y: -r * 0.8 }, { x: -r * 0.8, y: r * 0.8 }, { x: r * 0.8, y: r * 0.8 }] : [{ x: 0, y: -r }, { x: r * 0.95, y: r * 0.7 }, { x: -r * 0.95, y: r * 0.7 }];
    return pts.map(putar);
  }
  const w = b.ragam === "panjang" ? r * 1.05 : r * 0.78;
  const h = b.ragam === "panjang" ? r * 0.6 : r * 0.78;
  return [{ x: -w, y: -h }, { x: w, y: -h }, { x: w, y: h }, { x: -w, y: h }].map(putar);
}
/** Titik tengah tiap sisi lurus (urut mengikuti sudut). */
export const tengahSisi = (sudut: readonly Titik[]): Titik[] => sudut.map((p, i) => {
  const q = sudut[(i + 1) % sudut.length];
  return { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
});
/** Jalur SVG poligon dari titik sudut. */
export const jalurPoligon = (pts: readonly Titik[]): string => `M ${pts.map((p) => `${p.x} ${p.y}`).join(" L ")} Z`;
/** Jari-jari lengkung (lonjong: rx lebih besar). */
export const jariLengkung = (b: Benda, r: number): { rx: number; ry: number } => (b.ragam === "lonjong" ? { rx: r * 1.05, ry: r * 0.66 } : { rx: r * 0.85, ry: r * 0.85 });

/** Ciri: satu benda besar di tengah. */
export const PUSAT_CIRI: Titik = { x: 150, y: 104 };
export const jariCiri = (b: Benda): number => 34 + (b.skala ?? 2) * 12;

/** Berburu dan kantong: benda di petak lima kolom dua baris. */
export const letakPetak = (i: number): Titik => ({ x: 34 + (i % 5) * 58, y: 62 + Math.floor(i / 5) * 78 });
export const JARI_PETAK = 22;
/** Kantong: benda di dalam kantong (kiri), yang dikeluarkan pindah ke meja (kanan). */
export const KANTONG = { x: 10, y: 22, w: 180, h: 168 };
export const letakKantong = (i: number): Titik => ({ x: 40 + (i % 3) * 60, y: 58 + Math.floor(i / 3) * 52 });
export const letakMejaKanan = (j: number): Titik => ({ x: 222 + (j % 2) * 44, y: 58 + Math.floor(j / 2) * 38 });

/** Papan paku tujuh kolom lima baris. */
export const KOLOM_PAKU = 7;
export const BARIS_PAKU = 5;
export const letakPaku = (c: number, r: number): Titik => ({ x: 30 + c * 40, y: 24 + r * 38 });

/** Misteri: tiga pilihan berjajar di bawah petunjuk. */
export const letakPilihan = (i: number): Titik => ({ x: 56 + i * 94, y: 128 });
export const JARI_PILIHAN = 34;

/** Tiga titik segaris (luas segitiga nol)? Dipakai uji untuk memastikan sudut karet sungguh berbelok. */
export const segaris = (a: readonly [number, number], b: readonly [number, number], c: readonly [number, number]): boolean => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]) === 0;
