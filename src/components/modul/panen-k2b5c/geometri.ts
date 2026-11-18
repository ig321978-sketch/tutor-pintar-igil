/**
 * Geometri murni untuk Kelas 2 Bab 5 Sub-Bab C "Panen Raya Pak Joko" (seperempat dari benda utuh): membagi lingkaran dan persegi dengan garis,
 * lalu menghitung luas tiap bagian dari titik sudutnya (bukan kunci tetap). Tanpa React, tanpa jaringan, tidak mengimpor berkas lain.
 * Dipakai bersama oleh Simulasi Meja Panen (logika.ts) dan tugas CPA (logika-cpa.ts). Diuji: scripts/uji-panen-k2b5c.mjs.
 *
 * Kerangka: lingkaran berjari-jari satu dan persegi bersisi dua, keduanya berpusat di (0, 0), sumbu y ke bawah (seperti SVG).
 * Satu garis ditulis `Potong`: sudut `a` dalam derajat (0 = datar, 90 = tegak, 45 dan 135 = miring) dan geseran `d` dari pusat (bawaan 0).
 * Lingkaran hanya menerima garis lewat pusat (d = 0). Dua garis lewat pusat membagi menjadi empat bagian sama besar bila dan hanya bila saling tegak lurus.
 */

export type Potong = { a: number; d?: number };
export type Titik = [number, number];
export type Bangun = "lingkaran" | "persegi";
/** Satu bagian: luas dibanding seluruh bangun (jumlah semua bagian = 1). Persegi: `titik` (poligon). Lingkaran: `dari` dan `ke` (derajat, sektor). */
export type Bagian = { luas: number; titik?: Titik[]; dari?: number; ke?: number };

const EPS = 1e-9;
const SISI = 2;
export const SISI_PERSEGI = SISI;
const r6 = (n: number): number => Math.round(n * 1e6) / 1e6;

/** Luas poligon (rumus tali sepatu), selalu positif. */
export function luasPoligon(p: readonly Titik[]): number {
  let s = 0;
  for (let i = 0; i < p.length; i += 1) {
    const [x1, y1] = p[i];
    const [x2, y2] = p[(i + 1) % p.length];
    s += x1 * y2 - x2 * y1;
  }
  return Math.abs(s) / 2;
}

/** Membelah satu poligon cembung dengan garis `p`; mengembalikan satu atau dua poligon. */
function belah(poly: Titik[], p: Potong): Titik[][] {
  const r = (p.a * Math.PI) / 180;
  const nx = -Math.sin(r);
  const ny = Math.cos(r);
  const d = p.d ?? 0;
  const s = poly.map(([x, y]) => nx * x + ny * y - d);
  const pos: Titik[] = [];
  const neg: Titik[] = [];
  for (let i = 0; i < poly.length; i += 1) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    const sa = s[i];
    const sb = s[(i + 1) % poly.length];
    if (sa >= -EPS) pos.push(a);
    if (sa <= EPS) neg.push(a);
    if ((sa > EPS && sb < -EPS) || (sa < -EPS && sb > EPS)) {
      const t = sa / (sa - sb);
      const titik: Titik = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
      pos.push(titik);
      neg.push(titik);
    }
  }
  return [pos, neg].filter((q) => q.length >= 3 && luasPoligon(q) > EPS);
}

/** Sudut garis dalam [0, 180). */
const norm180 = (a: number): number => ((a % 180) + 180) % 180;

/**
 * Membagi bangun dengan sejumlah garis, lalu menghitung luas tiap bagian (dibanding seluruh bangun).
 * Lingkaran: semua garis lewat pusat, bagian berupa sektor `dari` sampai `ke` (derajat, naik, searah jarum jam pada layar).
 * Persegi: poligon hasil pemotongan beruntun; garis boleh bergeser dari pusat.
 */
export function bagiBangun(bangun: Bangun, potong: readonly Potong[]): Bagian[] {
  if (bangun === "lingkaran") {
    const batas = [...new Set(potong.flatMap((p) => [r6(norm180(p.a)), r6(norm180(p.a) + 180)]))].sort((x, y) => x - y);
    if (batas.length === 0) return [{ luas: 1, dari: 0, ke: 360 }];
    return batas.map((b, i) => {
      const ke = i === batas.length - 1 ? batas[0] + 360 : batas[i + 1];
      return { luas: r6((ke - b) / 360), dari: b, ke };
    });
  }
  let bagian: Titik[][] = [
    [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
    ],
  ];
  for (const p of potong) bagian = bagian.flatMap((q) => belah(q, p));
  const total = SISI * SISI;
  return bagian.map((titik) => ({ luas: r6(luasPoligon(titik) / total), titik }));
}

/** Semua bagian sama besar (selisih luas kecil sekali). */
export const semuaSama = (b: readonly Bagian[]): boolean => b.length > 0 && b.every((x) => Math.abs(x.luas - b[0].luas) < 1e-6);
/** Banyak bagian yang sama besar dan tepat seperempat (empat bagian sama besar). */
export const empatSama = (b: readonly Bagian[]): boolean => b.length === 4 && semuaSama(b);
/** Dua garis lewat pusat saling tegak lurus. */
export const tegakLurus = (a1: number, a2: number): boolean => Math.abs(norm180(a2) - norm180(a1)) === 90;
/** Bentuk satu bagian persegi: segitiga (tiga titik) atau segi empat. */
export const bentukBagian = (x: Bagian): "segitiga" | "segiempat" | "sektor" => (x.titik ? (x.titik.length === 3 ? "segitiga" : "segiempat") : "sektor");

/** Titik pada lingkaran (jari-jari r, pusat cx, cy) bersudut `deg` derajat. */
export const titikLingkaran = (cx: number, cy: number, r: number, deg: number): Titik => [Math.round((cx + r * Math.cos((deg * Math.PI) / 180)) * 100) / 100, Math.round((cy + r * Math.sin((deg * Math.PI) / 180)) * 100) / 100];

/** Lintasan SVG sebuah sektor (pusat cx, cy, jari-jari r). */
export function lintasanSektor(cx: number, cy: number, r: number, dari: number, ke: number): string {
  if (ke - dari >= 359.999) return `M${cx - r} ${cy} A${r} ${r} 0 1 1 ${cx + r} ${cy} A${r} ${r} 0 1 1 ${cx - r} ${cy} Z`;
  const [x1, y1] = titikLingkaran(cx, cy, r, dari);
  const [x2, y2] = titikLingkaran(cx, cy, r, ke);
  return `M${cx} ${cy} L${x1} ${y1} A${r} ${r} 0 ${ke - dari > 180 ? 1 : 0} 1 ${x2} ${y2} Z`;
}

/** Titik ujung sebuah garis (jarak h dari pusat sepanjang garis ke dua arah) pada kanvas berpusat (cx, cy) berskala `s` piksel per satuan. */
export function ujungGaris(p: Potong, cx: number, cy: number, s: number, panjang: number): [Titik, Titik] {
  const r = (p.a * Math.PI) / 180;
  const dx = Math.cos(r);
  const dy = Math.sin(r);
  const d = p.d ?? 0;
  const px = cx + s * d * -Math.sin(r);
  const py = cy + s * d * Math.cos(r);
  return [
    [Math.round((px - dx * panjang) * 100) / 100, Math.round((py - dy * panjang) * 100) / 100],
    [Math.round((px + dx * panjang) * 100) / 100, Math.round((py + dy * panjang) * 100) / 100],
  ];
}

/** Titik tengah poligon (rata-rata titik sudut), untuk menaruh label atau tombol di bagian itu. */
export const pusatTitik = (p: readonly Titik[]): Titik => [p.reduce((s, q) => s + q[0], 0) / p.length, p.reduce((s, q) => s + q[1], 0) / p.length];
