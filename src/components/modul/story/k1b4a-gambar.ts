import type { Obj } from "./logika-story";
import { E as E_A, W, bulat, emo, garis, kotak, teks, type Titik } from "./k1b2a-gambar";

/**
 * Gambar khusus Story Kelas 1 Bab 4 Sub-Bab A "Bahan dari Gudang" (mengenal bentuk), awal cerita Festival Mainan Kardus.
 * Bentuk datar digambar sebagai jalur poligon atau bulatan bertepi tebal yang berpusat di (x, y), jadi bisa diputar di tempat.
 * Sisi lurus yang dihitung disorot garis tebal `${id}-g{i}` dan diberi angka `${id}-a{i}`; sudut ditandai titik `${id}-s{i}` dan angka `${id}-b{i}`.
 * Benda bahan: tutup kaleng (bulatan abu-abu bertepi tebal), karton segitiga oranye, dan sisi kardus segi empat coklat berselotip.
 */

export { W, bulat, emo, garis, judul, kartu, kotak, orang, teks, deret, deretEmo, label, type Titik } from "./k1b2a-gambar";

export const E = {
  ...E_A,
  pakRT: "\u{1F9D4}",
  toa: "\u{1F4E2}",
  gudang: "\u{1F3DA}\u{FE0F}",
  tenda: "\u{1F3AA}",
  angin: "\u{1F4A8}",
  botol: "\u{1F9F4}",
  tali: "\u{1F9F6}",
  jam: "\u{23F0}",
  piring: "\u{1F37D}\u{FE0F}",
  roti: "\u{1F96A}",
  kaca: "\u{1F50D}",
  telinga: "\u{1F442}",
  salah: "\u{274C}",
  bintang: "\u{2B50}",
  rumah: "\u{1F3E0}",
} as const;

export const WARNA_BAHAN = { kaleng: "#CBD5E1", karton: "#FDBA74", kardus: "#D6A15E", sorot: "#F43F5E", sudut: "#DC2626" } as const;

const f = (n: number): number => Number(n.toFixed(1));

/** Titik sudut bentuk (relatif pusat). Segitiga: puncak di atas. Segi empat: mulai kiri-atas searah jarum jam. */
export const segitigaRel = (s: number): Titik[] => [
  { x: 0, y: -s },
  { x: s, y: s * 0.75 },
  { x: -s, y: s * 0.75 },
];
export const segiEmpatRel = (w: number, h: number): Titik[] => [
  { x: -w / 2, y: -h / 2 },
  { x: w / 2, y: -h / 2 },
  { x: w / 2, y: h / 2 },
  { x: -w / 2, y: h / 2 },
];

/** Putar titik relatif searah jarum jam sebesar `deg` derajat (sama seperti `rot` di kanvas). */
export const putar = (p: Titik, deg: number): Titik => {
  const r = (deg * Math.PI) / 180;
  return { x: f(p.x * Math.cos(r) - p.y * Math.sin(r)), y: f(p.x * Math.sin(r) + p.y * Math.cos(r)) };
};
/** Titik sudut mutlak sebuah bentuk berpusat (cx, cy) yang diputar `deg`. */
export const sudutMutlak = (cx: number, cy: number, rel: Titik[], deg = 0): Titik[] => rel.map((p) => putar(p, deg)).map((p) => ({ x: f(cx + p.x), y: f(cy + p.y) }));

/** Bentuk datar poligon bertepi tebal, berpusat di (cx, cy). */
export const poligon = (id: string, cx: number, cy: number, rel: Titik[], warna: string, o: Partial<Obj> = {}): Obj => ({
  id,
  t: "jalur",
  x: cx,
  y: cy,
  d: `M${rel.map((p) => `${f(p.x)} ${f(p.y)}`).join(" L")} Z`,
  warna,
  garis: W.biru,
  tebal: 3,
  ...o,
});

/** Karton segitiga oranye. */
export const karton = (id: string, cx: number, cy: number, s: number, o: Partial<Obj> = {}): Obj => poligon(id, cx, cy, segitigaRel(s), WARNA_BAHAN.karton, o);

/** Sisi kardus segi empat coklat: bentuk `id` dan selotip mendatar `${id}-l`. */
export const kardus = (id: string, cx: number, cy: number, w: number, h: number, o: Partial<Obj> = {}): Obj[] => [
  poligon(id, cx, cy, segiEmpatRel(w, h), WARNA_BAHAN.kardus, o),
  kotak(`${id}-l`, cx - w / 2 + 2, cy - 3, w - 4, 6, "#FEF3C7", undefined, { rx: 1, z: 1, ...o }),
];

/** Tutup kaleng lengkung: bulatan `id` bertepi tebal dan lingkar dalam `${id}-d`. */
export const tutupKaleng = (id: string, cx: number, cy: number, r: number, o: Partial<Obj> = {}): Obj[] => [
  bulat(id, cx, cy, r, WARNA_BAHAN.kaleng, W.biru, { tebal: 3, ...o }),
  bulat(`${id}-d`, cx, cy, r * 0.68, "#E2E8F0", "#94A3B8", { tebal: 1.2, z: 1, ...o }),
];

/** Titik jauh dari pusat sejauh `jarak` searah garis pusat ke titik p (untuk angka di luar bentuk). */
const keluar = (p: Titik, c: Titik, jarak: number): Titik => {
  const dx = p.x - c.x;
  const dy = p.y - c.y;
  const n = Math.hypot(dx, dy) || 1;
  return { x: f(p.x + (dx / n) * jarak), y: f(p.y + (dy / n) * jarak) };
};
const pusat = (pts: Titik[]): Titik => ({ x: pts.reduce((t, p) => t + p.x, 0) / pts.length, y: pts.reduce((t, p) => t + p.y, 0) / pts.length });

/** Sisi lurus ke-i disorot garis tebal `${id}-g{i}` (tergambar bertahap) dan diberi angka hitungan `${id}-a{i}` di luar bentuk. */
export function sisiKe(id: string, pts: Titik[], i: number, angka = true, warna: string = WARNA_BAHAN.sorot, jarak = 11): Obj[] {
  const a = pts[i];
  const b = pts[(i + 1) % pts.length];
  const m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  const t = keluar(m, pusat(pts), jarak);
  const out: Obj[] = [garis(`${id}-g${i}`, a.x, a.y, f(b.x - a.x), f(b.y - a.y), warna, 4.5, { gambar: true, z: 2 })];
  if (angka) out.push(teks(`${id}-a${i}`, t.x, t.y + 4, String(i + 1), 11, W.merah, { z: 3 }));
  return out;
}

/** Sudut ke-i ditandai titik merah `${id}-s{i}` dan angka hitungan hijau `${id}-b{i}` di luar bentuk. */
export function sudutKe(id: string, pts: Titik[], i: number, angka = true, jarak = 12): Obj[] {
  const p = pts[i];
  const t = keluar(p, pusat(pts), jarak);
  const out: Obj[] = [bulat(`${id}-s${i}`, p.x, p.y, 4.2, WARNA_BAHAN.sudut, W.putih, { tebal: 1.4, z: 4 })];
  if (angka) out.push(teks(`${id}-b${i}`, t.x, t.y + 4, String(i + 1), 11, W.hijau, { z: 3 }));
  return out;
}
/** Semua titik sudut tanpa angka. */
export const semuaSudut = (id: string, pts: Titik[]): Obj[] => pts.flatMap((_, i) => sudutKe(id, pts, i, false));
/** Semua sisi lurus disorot tanpa angka. */
export const semuaSisi = (id: string, pts: Titik[], warna: string = WARNA_BAHAN.sorot): Obj[] => pts.flatMap((_, i) => sisiKe(id, pts, i, false, warna));

/** Lantai teras keramik: kotak `${id}` dan garis nat `${id}-n{i}`. */
export function teras(id: string, x: number, y: number, w: number, h: number): Obj[] {
  const out: Obj[] = [kotak(id, x, y, w, h, "#E7E5E4", "#A8A29E", { rx: 4, tebal: 2, z: -3 })];
  for (let i = 1; i < 6; i += 1) out.push(garis(`${id}-n${i}`, x + (w * i) / 6, y + 2, 0, h - 4, "#D6D3D1", 1, { z: -2 }));
  return out;
}

/** Lapangan kampung: rumput `${id}` mulai tinggi y sampai bawah kanvas. */
export const lapangan = (id: string, y: number): Obj => kotak(id, 2, y, 296, 196 - y, "#BBF7D0", W.hijau, { rx: 6, tebal: 1.5, z: -3 });

/** Papan paku (geoboard): papan `${id}` dan paku `${id}p{c}{r}` pada kolom 0 sampai 4 dan baris 0 sampai 3. */
export const PAKU = { x0: 90, y0: 70, s: 30 };
export const paku = (c: number, r: number): Titik => ({ x: PAKU.x0 + c * PAKU.s, y: PAKU.y0 + r * PAKU.s });
export function papanPaku(id: string): Obj[] {
  const out: Obj[] = [kotak(id, PAKU.x0 - 16, PAKU.y0 - 14, PAKU.s * 4 + 32, PAKU.s * 3 + 28, "#FDE68A", W.coklat, { rx: 8, tebal: 2.4, z: -3 })];
  for (let c = 0; c < 5; c += 1) for (let r = 0; r < 4; r += 1) out.push(bulat(`${id}p${c}${r}`, paku(c, r).x, paku(c, r).y, 3.2, "#78716C", W.coklat, { tebal: 1, z: -2 }));
  return out;
}
/** Karet gelang pada paku-paku: jalur tanpa isi `id` yang tergambar bertahap (titik mutlak; asal jalur di paku pertama). */
export const karet = (id: string, titik: Titik[], warna: string): Obj => {
  const o = titik[0];
  return poligon(id, o.x, o.y, titik.map((p) => ({ x: p.x - o.x, y: p.y - o.y })), "none", { garis: warna, tebal: 3.4, gambar: true, z: 1 });
};

/** Kantong misterius ungu: kantong `${id}`, tali `${id}-tl`, dan tanda tanya `${id}-q`. */
export const kantong = (id: string, cx: number, cy: number): Obj[] => [
  kotak(id, cx - 34, cy - 26, 68, 56, "#C4B5FD", W.ungu, { rx: 14, tebal: 2.4, z: -1 }),
  garis(`${id}-tl`, cx - 22, cy - 26, 44, 0, W.ungu, 4),
  teks(`${id}-q`, cx, cy + 14, "?", 30, W.putih),
];

/** Benda di titik-titik (emoji), id `${id}{i}`. */
export const emoDi = (e: string, id: string, pts: Titik[], u = 20): Obj[] => pts.map((p, i) => emo(`${id}${i}`, p.x, p.y, e, u));
