/**
 * Geometri murni untuk membagi benda Kelas 2 Bab 5 Sub-Bab A "Semangka Raksasa Pak Danu" (setengah dari benda utuh).
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-semangka-k2b5a.mjs. Bentuk berupa segi banyak cembung pada kotak satuan (0 sampai 1, sumbu y ke bawah);
 * garis pembagi adalah garis lurus tanpa ujung. Luas tiap bagian DIHITUNG program (bukan kunci tetap). Tidak mengimpor berkas lain.
 */

export type Pt = [number, number];
export type Bentuk = "persegi" | "panjang" | "lingkaran" | "segitiga";
/** Garis lurus lewat dua titik (x1, y1, x2, y2) pada kotak satuan. */
export type Garis = [number, number, number, number];
/** Satu gambar: bentuk, benda (nomor di OBJEK, hanya untuk rupa benda), garis pembagi, dan titik `w` di dalam bagian yang diwarnai atau ditunjuk. */
export type Gbr = { b: Bentuk; o?: number; g: Garis[]; w?: Pt };

const lingkaran = (): Pt[] => Array.from({ length: 72 }, (_, i) => [0.5 + 0.42 * Math.cos((i * Math.PI) / 36), 0.5 + 0.42 * Math.sin((i * Math.PI) / 36)] as Pt);
export const POLIGON: Record<Bentuk, Pt[]> = {
  persegi: [[0.1, 0.1], [0.9, 0.1], [0.9, 0.9], [0.1, 0.9]],
  panjang: [[0.02, 0.25], [0.98, 0.25], [0.98, 0.75], [0.02, 0.75]],
  segitiga: [[0.5, 0.08], [0.94, 0.88], [0.06, 0.88]],
  lingkaran: lingkaran(),
};
/** Kotak pembatas tiap bentuk: [kiri, atas, kanan, bawah]. */
export const KOTAK: Record<Bentuk, [number, number, number, number]> = {
  persegi: [0.1, 0.1, 0.9, 0.9],
  panjang: [0.02, 0.25, 0.98, 0.75],
  segitiga: [0.06, 0.08, 0.94, 0.88],
  lingkaran: [0.08, 0.08, 0.92, 0.92],
};

const r4 = (n: number): number => Math.round(n * 10000) / 10000;
/** Garis tegak pada pecahan lebar `f` dari kiri kotak bentuk. */
export const tegak = (b: Bentuk, f: number): Garis => {
  const [x0, y0, x1, y1] = KOTAK[b];
  const x = r4(x0 + (x1 - x0) * f);
  return [x, y0 - 0.05, x, y1 + 0.05];
};
/** Garis mendatar pada pecahan tinggi `f` dari atas kotak bentuk. */
export const datar = (b: Bentuk, f: number): Garis => {
  const [x0, y0, x1, y1] = KOTAK[b];
  const y = r4(y0 + (y1 - y0) * f);
  return [x0 - 0.05, y, x1 + 0.05, y];
};
/** Garis miring dari pojok ke pojok kotak bentuk: arah 1 dari kiri-atas, arah 2 dari kanan-atas. */
export const pojok = (b: Bentuk, arah: 1 | 2): Garis => {
  const [x0, y0, x1, y1] = KOTAK[b];
  return arah === 1 ? [x0, y0, x1, y1] : [x1, y0, x0, y1];
};
/** Garis lewat titik tengah kotak bentuk dengan sudut `derajat` (0 mendatar, 90 tegak). */
export const lewat = (b: Bentuk, derajat: number): Garis => {
  const [x0, y0, x1, y1] = KOTAK[b];
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  const a = (derajat * Math.PI) / 180;
  const dx = Math.cos(a) * 0.5;
  const dy = Math.sin(a) * 0.5;
  return [r4(cx - dx), r4(cy - dy), r4(cx + dx), r4(cy + dy)];
};
/** Garis dari titik pada tepi atas (pecahan lebar `fa`) ke titik pada tepi bawah (pecahan lebar `fb`). */
export const serong = (b: Bentuk, fa: number, fb: number): Garis => {
  const [x0, y0, x1, y1] = KOTAK[b];
  return [r4(x0 + (x1 - x0) * fa), y0, r4(x0 + (x1 - x0) * fb), y1];
};
/** Titik di dalam bentuk dekat sisi tertentu (untuk menentukan bagian yang diwarnai). */
export const titikSisi = (b: Bentuk, sisi: "kiri" | "kanan" | "atas" | "bawah", jauh = 0.16): Pt => {
  const [x0, y0, x1, y1] = KOTAK[b];
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  if (b === "segitiga") return sisi === "kiri" ? [r4(cx - (x1 - x0) * 0.17), y1 - 0.1] : sisi === "kanan" ? [r4(cx + (x1 - x0) * 0.17), y1 - 0.1] : sisi === "atas" ? [cx, y0 + (y1 - y0) * 0.3] : [cx, y1 - 0.06];
  return sisi === "kiri" ? [r4(x0 + (x1 - x0) * jauh), cy] : sisi === "kanan" ? [r4(x1 - (x1 - x0) * jauh), cy] : sisi === "atas" ? [cx, r4(y0 + (y1 - y0) * jauh)] : [cx, r4(y1 - (y1 - y0) * jauh)];
};

/* ------------------------------ Memotong ------------------------------ */
const sisi = (g: Garis, p: Pt): number => (g[2] - g[0]) * (p[1] - g[1]) - (g[3] - g[1]) * (p[0] - g[0]);
/** Potong segi banyak cembung dengan setengah bidang di satu sisi garis (tanda 1 atau -1). */
function klip(poly: Pt[], g: Garis, tanda: 1 | -1): Pt[] {
  const out: Pt[] = [];
  for (let i = 0; i < poly.length; i += 1) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    const sa = tanda * sisi(g, a);
    const sb = tanda * sisi(g, b);
    if (sa >= 0) out.push(a);
    if ((sa > 0 && sb < 0) || (sa < 0 && sb > 0)) {
      const t = sa / (sa - sb);
      out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
    }
  }
  return out;
}
export const luasPoligon = (p: Pt[]): number => {
  let s = 0;
  for (let i = 0; i < p.length; i += 1) {
    const a = p[i];
    const b = p[(i + 1) % p.length];
    s += a[0] * b[1] - b[0] * a[1];
  }
  return Math.abs(s) / 2;
};
/** Semua bagian setelah semua garis memotong bentuk. Bagian yang tidak tersentuh garis tetap utuh. */
export function bagian(gb: Gbr): Pt[][] {
  let bagi: Pt[][] = [POLIGON[gb.b]];
  for (const g of gb.g) {
    const baru: Pt[][] = [];
    for (const p of bagi) {
      const a = klip(p, g, 1);
      const b = klip(p, g, -1);
      if (luasPoligon(a) > 1e-6 && luasPoligon(b) > 1e-6) baru.push(a, b);
      else baru.push(p);
    }
    bagi = baru;
  }
  return bagi;
}
/** Luas tiap bagian dibanding seluruh bentuk (jumlahnya satu). */
export function luasRelatif(gb: Gbr): number[] {
  const total = luasPoligon(POLIGON[gb.b]);
  return bagian(gb).map((p) => luasPoligon(p) / total);
}
const TOLERANSI = 0.012;
/** Apakah semua bagian sama besar (paling sedikit dua bagian)? */
export function semuaSama(gb: Gbr): boolean {
  const l = luasRelatif(gb);
  return l.length >= 2 && Math.max(...l) - Math.min(...l) < TOLERANSI;
}
/** Apakah gambar ini menunjukkan setengah: tepat dua bagian dan keduanya sama besar? */
export const setengah = (gb: Gbr): boolean => bagian(gb).length === 2 && semuaSama(gb);
export const banyakBagian = (gb: Gbr): number => bagian(gb).length;

function titikDalam(p: Pt[], t: Pt): boolean {
  const s = p.map((a, i) => sisi([a[0], a[1], p[(i + 1) % p.length][0], p[(i + 1) % p.length][1]], t));
  return s.every((v) => v >= -1e-9) || s.every((v) => v <= 1e-9);
}
/** Nomor bagian yang memuat titik `w` (atau -1). */
export const bagianWarna = (gb: Gbr): number => (gb.w ? bagian(gb).findIndex((p) => titikDalam(p, gb.w as Pt)) : -1);

/* ------------------------------ Uji Cermin ------------------------------ */
function pantul(p: Pt[], g: Garis): Pt[] {
  const dx = g[2] - g[0];
  const dy = g[3] - g[1];
  const n = dx * dx + dy * dy;
  return p.map(([x, y]) => {
    const t = ((x - g[0]) * dx + (y - g[1]) * dy) / n;
    const fx = g[0] + t * dx;
    const fy = g[1] + t * dy;
    return [2 * fx - x, 2 * fy - y] as Pt;
  });
}
function irisan(a: Pt[], b: Pt[]): Pt[] {
  const c: Pt = [b.reduce((s, p) => s + p[0], 0) / b.length, b.reduce((s, p) => s + p[1], 0) / b.length];
  let out = a;
  for (let i = 0; i < b.length; i += 1) {
    const j = (i + 1) % b.length;
    const e: Garis = [b[i][0], b[i][1], b[j][0], b[j][1]];
    out = klip(out, e, sisi(e, c) >= 0 ? 1 : -1);
    if (out.length < 3) return [];
  }
  return out;
}
/** Bayangan bagian pertama di cermin (garis pembagi) saat dipantulkan: dipakai untuk gambar dan uji. */
export function bayangan(gb: Gbr): Pt[] | null {
  const b = bagian(gb);
  return b.length === 2 ? pantul(b[0], gb.g[0]) : null;
}
/** Uji Cermin: dua bagian, dan bayangan bagian yang satu persis menutup bagian yang lain. */
export function simetri(gb: Gbr): boolean {
  const b = bagian(gb);
  if (b.length !== 2) return false;
  const lapis = luasPoligon(irisan(pantul(b[0], gb.g[0]), b[1]));
  return lapis / luasPoligon(b[0]) > 0.985 && lapis / luasPoligon(b[1]) > 0.985;
}

/* ------------------------------ Gambar ------------------------------ */
/** Ruas garis pembagi yang tampak di dalam bentuk (dua titik terjauh pada tepi), atau null. */
export function ruasGaris(b: Bentuk, g: Garis): [Pt, Pt] | null {
  const p = POLIGON[b];
  const ada: Pt[] = [];
  for (let i = 0; i < p.length; i += 1) {
    const a = p[i];
    const c = p[(i + 1) % p.length];
    const sa = sisi(g, a);
    const sc = sisi(g, c);
    if ((sa > 0 && sc < 0) || (sa < 0 && sc > 0)) {
      const t = sa / (sa - sc);
      ada.push([a[0] + (c[0] - a[0]) * t, a[1] + (c[1] - a[1]) * t]);
    } else if (Math.abs(sa) < 1e-9) ada.push(a);
  }
  if (ada.length < 2) return null;
  let terbaik: [Pt, Pt] = [ada[0], ada[1]];
  let jarak = -1;
  for (let i = 0; i < ada.length; i += 1)
    for (let j = i + 1; j < ada.length; j += 1) {
      const d = (ada[i][0] - ada[j][0]) ** 2 + (ada[i][1] - ada[j][1]) ** 2;
      if (d > jarak) {
        jarak = d;
        terbaik = [ada[i], ada[j]];
      }
    }
  return terbaik;
}
/** Arah garis dalam kata: tegak, mendatar, atau miring. */
export const arahGaris = (g: Garis): "tegak" | "mendatar" | "miring" => (Math.abs(g[2] - g[0]) < 1e-6 ? "tegak" : Math.abs(g[3] - g[1]) < 1e-6 ? "mendatar" : "miring");

/** Banyak kotak (satuan luas) tiap bagian bila seluruh bentuk berisi `total` kotak. Hanya bermakna bila hasilnya bulat. */
export const kotakBagian = (gb: Gbr, total: number): number[] => luasRelatif(gb).map((l) => Math.round(l * total * 1000) / 1000);
export const kotakTotal = (b: Bentuk): number => (b === "persegi" ? 16 : 24);
