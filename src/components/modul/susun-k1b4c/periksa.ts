/**
 * Tata letak dan pemeriksa kanvas Kelas 1 Bab 4 Sub-Bab C (tanpa React, diuji di Node: scripts/uji-susun-k1b4c.mjs).
 * Kanvas adegan 300 x 200. Memakai ulang pemeriksa Kelas 1 Bab 1 Sub-Bab A (lingkari, tanda satu per satu, ucapan, tulisan angka).
 */
import type { Bagian, Pt } from "./logika";
import type { Titik } from "../lemari-k1b1a/periksa-jawab";

export { bilanganDariUcapan, periksaCentang, periksaLingkari, LEBAR_ADEGAN, TINGGI_ADEGAN, type Goresan, type Titik } from "../lemari-k1b1a/periksa-jawab";

const bulat = (n: number) => Math.round(n * 10) / 10;

/** Titik sudut bagian mainan (lengkung: kosong). Segitiga menghadap ke atas, lalu diputar per sembilan puluh derajat. */
export function titikBagian(b: Bagian, dx = 0, dy = 0): Titik[] {
  if (b.bentuk === "lengkung") return [];
  const x = b.x + dx;
  const y = b.y + dy;
  const w = b.w / 2;
  const h = b.h / 2;
  const s = b.miring ? b.w * 0.18 : 0;
  const pts: Titik[] =
    b.bentuk === "segitiga"
      ? [{ x: 0, y: -h }, { x: w, y: h }, { x: -w, y: h }]
      : [{ x: -w + s, y: -h }, { x: w + s, y: -h }, { x: w - s, y: h }, { x: -w - s, y: h }];
  const r = ((b.putar ?? 0) * Math.PI) / 180;
  const c = Math.round(Math.cos(r));
  const n = Math.round(Math.sin(r));
  return pts.map((p) => ({ x: bulat(x + p.x * c - p.y * n), y: bulat(y + p.x * n + p.y * c) }));
}
/** Kotak batas bagian (untuk uji letak). */
export function batasBagian(b: Bagian, dx = 0, dy = 0): { x0: number; y0: number; x1: number; y1: number } {
  if (b.bentuk === "lengkung") return { x0: b.x + dx - b.w / 2, y0: b.y + dy - b.h / 2, x1: b.x + dx + b.w / 2, y1: b.y + dy + b.h / 2 };
  const t = titikBagian(b, dx, dy);
  return { x0: Math.min(...t.map((p) => p.x)), y0: Math.min(...t.map((p) => p.y)), x1: Math.max(...t.map((p) => p.x)), y1: Math.max(...t.map((p) => p.y)) };
}
/** Titik ketuk dan tanda tiap bagian: pusat lengkung atau titik berat poligon. */
export function pusatBagian(b: Bagian): Titik {
  if (b.bentuk === "lengkung" || b.bentuk === "segiempat") return { x: b.x, y: b.y };
  const t = titikBagian(b);
  return { x: bulat(t.reduce((s, p) => s + p.x, 0) / 3), y: bulat(t.reduce((s, p) => s + p.y, 0) / 3) };
}
/** Geseran bagian saat diurai: menjauh dari pusat mainan sejauh GESER piksel. */
export const GESER = 14;
export function geserUrai(bagian: readonly Bagian[], i: number): Titik {
  const px = bagian.reduce((s, b) => s + b.x, 0) / bagian.length;
  const py = bagian.reduce((s, b) => s + b.y, 0) / bagian.length;
  const dx = bagian[i].x - px;
  const dy = bagian[i].y - py;
  const d = Math.hypot(dx, dy) || 1;
  return { x: bulat((dx / d) * GESER), y: bulat((dy / d) * GESER) };
}

/* ------------------------------ Satuan petak (tangram, balok, lidi) ------------------------------ */
const titikBerat = (p: readonly Pt[]): Pt => [p.reduce((s, t) => s + t[0], 0) / p.length, p.reduce((s, t) => s + t[1], 0) / p.length];
/** Penempatan petak: satuan u piksel, kotak batas semua titik berpusat di (cx, cy). */
export function penempatan(semua: readonly Pt[], u: number, cx: number, cy: number): (p: Pt) => Titik {
  const xs = semua.map((p) => p[0]);
  const ys = semua.map((p) => p[1]);
  const mx = (Math.min(...xs) + Math.max(...xs)) / 2;
  const my = (Math.min(...ys) + Math.max(...ys)) / 2;
  return (p) => ({ x: bulat(cx + (p[0] - mx) * u), y: bulat(cy + (p[1] - my) * u) });
}
export const pusatPoligon = (p: readonly Pt[], ke: (p: Pt) => Titik): Titik => ke(titikBerat(p));

/** Tangram gabung: hasil di atas, tiga pilihan bentuk berjajar di bawah. */
export const SATUAN_GABUNG = 24;
export const PUSAT_GABUNG: Titik = { x: 150, y: 66 };
export const letakPilihanBentuk = (i: number): Titik => ({ x: 60 + i * 90, y: 162 });
export const JARI_PILIHAN = 26;
/** Geseran keping sebelum digabung: menjauh dari titik berat hasil. */
export function geserKeping(keping: readonly Pt[], gabung: readonly Pt[], jarak = 16): Pt {
  const a = titikBerat(keping);
  const b = titikBerat(gabung);
  const d = Math.hypot(a[0] - b[0], a[1] - b[1]) || 1;
  return [((a[0] - b[0]) / d) * jarak, ((a[1] - b[1]) / d) * jarak];
}

/** Tangram hitung keping: gambar di tengah kanvas. */
export const SATUAN_KEPING = 26;
export const PUSAT_KEPING: Titik = { x: 150, y: 104 };

/** Balok pola: bayangan di tengah kanvas. */
export const SATUAN_BALOK = 36;
export const PUSAT_BALOK: Titik = { x: 150, y: 104 };

/** Lidi: titik petak (c, r) di kanvas. */
export const letakLidi = (p: Pt): Titik => ({ x: bulat(30 + p[0] * 40), y: bulat(22 + p[1] * 40) });

/** Kartu kata (rupa lambang): lima kolom, dua baris. */
export const letakKartu = (i: number, n: number): Titik => {
  const baris = Math.floor(i / 5);
  const diBaris = Math.min(5, n - baris * 5);
  return { x: bulat(150 + ((i % 5) - (diBaris - 1) / 2) * 58), y: n <= 5 ? 104 : 76 + baris * 64 };
};
export const LEBAR_KARTU = 54;
export const TINGGI_KARTU = 40;
