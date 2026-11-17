import type { Obj } from "./logika-story";
import { E as E_A, W, bulat, garis, kotak, teks, type Titik } from "./k1b2a-gambar";

/**
 * Gambar khusus Story Kelas 1 Bab 4 Sub-Bab C "Mainan untuk Festival" (menyusun dan mengurai bentuk), akhir cerita Festival Mainan Kardus.
 * Bentuk datar digambar sebagai jalur poligon (titik relatif terhadap (x, y), jadi bisa digeser dengan mengubah x dan y) dan bulatan.
 * Penamaan id supaya bagian mudah dihitung: segi empat `${p}s{i}`, segitiga `${p}t{i}`, lengkung `${p}l{i}` (lingkar dalam `${p}l{i}-d`).
 * Ditambah: meja kerja kayu, panggung festival, keping tangram, balok pola, lidi, dan kalimat hitung per lambang.
 */

export { W, bulat, emo, garis, judul, kartu, kotak, orang, teks, label, type Titik } from "./k1b2a-gambar";

export const E = {
  ...E_A,
  juri: "\u{1F9D1}",
  pitaJuri: "\u{1F3F5}\u{FE0F}",
  tenda: "\u{1F3AA}",
  rumah: "\u{1F3E0}",
  lem: "\u{1F9F4}",
  senyum: "\u{1F60A}",
  dunia: "\u{1F30D}",
  salah: "\u{274C}",
  lampu: "\u{1F4A1}",
} as const;

export const WARNA = {
  kaleng: "#CBD5E1",
  karton: "#FDBA74",
  kardus: "#D6A15E",
  pintu: "#B7791F",
  kayu: "#B45309",
  lidi: "#A16207",
  hijau: "#4ADE80",
  oranye: "#FB923C",
  biru: "#60A5FA",
  kuning: "#FACC15",
  ungu: "#C084FC",
  merah: "#F87171",
  tosca: "#2DD4BF",
} as const;

/** Lambang kurang di layar (tanda minus, bukan tanda hubung). */
export const KURANG = "−";

const f = (n: number): number => Number(n.toFixed(1));

/** Bentuk poligon bertepi tebal; titik `pts` relatif terhadap (x, y). */
export const poligon = (id: string, x: number, y: number, pts: Titik[], warna: string, o: Partial<Obj> = {}): Obj => ({
  id,
  t: "jalur",
  x,
  y,
  d: `M${pts.map((p) => `${f(p.x)} ${f(p.y)}`).join(" L")} Z`,
  warna,
  garis: W.biru,
  tebal: 2.4,
  ...o,
});

/** Segi empat dari sisi kardus, pojok kiri-atas (x, y). */
export const segiEmpat = (id: string, x: number, y: number, w: number, h: number, warna: string = WARNA.kardus, o: Partial<Obj> = {}): Obj =>
  poligon(id, x, y, [{ x: 0, y: 0 }, { x: w, y: 0 }, { x: w, y: h }, { x: 0, y: h }], warna, o);

/** Segitiga dari karton; titik relatif terhadap (x, y). */
export const segitiga = (id: string, x: number, y: number, pts: Titik[], warna: string = WARNA.karton, o: Partial<Obj> = {}): Obj => poligon(id, x, y, pts, warna, o);

/** Bentuk lengkung dari tutup kaleng: bulatan `id` dan lingkar dalam `${id}-d`. */
export const lengkung = (id: string, cx: number, cy: number, r: number, o: Partial<Obj> = {}): Obj[] => [
  bulat(id, cx, cy, r, WARNA.kaleng, W.biru, { tebal: 2.4, ...o }),
  bulat(`${id}-d`, cx, cy, f(r * 0.55), "#E2E8F0", "#94A3B8", { tebal: 1, z: 1, ...o }),
];
/** Geser bentuk lengkung beserta lingkar dalamnya. */
export const geserLengkung = (id: string, x: number, y: number): (Partial<Obj> & { id: string })[] => [
  { id, x, y },
  { id: `${id}-d`, x, y },
];

/** Segitiga siku-siku sama kaki (karton kecil) dengan sudut siku di kiri-atas, dan pasangannya dengan sudut siku di kanan-bawah: bila berimpit menjadi segi empat. */
export const sikuKiriAtas = (s: number): Titik[] => [{ x: 0, y: 0 }, { x: s, y: 0 }, { x: 0, y: s }];
export const sikuKananBawah = (s: number): Titik[] => [{ x: s, y: s }, { x: 0, y: s }, { x: s, y: 0 }];
/** Belahan kiri dan kanan segitiga besar berpuncak di (0, -s): bila berimpit menjadi segitiga besar. */
export const belahKiri = (s: number): Titik[] => [{ x: 0, y: -s }, { x: 0, y: 0 }, { x: -s, y: 0 }];
export const belahKanan = (s: number): Titik[] => [{ x: 0, y: -s }, { x: s, y: 0 }, { x: 0, y: 0 }];

/** Kereta kardus: badan tiga segi empat `${p}s0..2`, bendera segitiga `${p}t0` dengan tiang `${p}-tg`, dan empat roda lengkung `${p}l0..3`. */
export function kereta(p: string, x0: number, y0: number, s = 1) {
  const w = 56 * s;
  const h = 36 * s;
  const sela = 6 * s;
  const panjang = 3 * w + 2 * sela;
  const r = f(11 * s);
  const rodaXY: Titik[] = [0, 1, 2, 3].map((i) => ({ x: f(x0 + (panjang * (i + 0.5)) / 4), y: f(y0 + h + 12 * s) }));
  return {
    badan: [0, 1, 2].map((i) => segiEmpat(`${p}s${i}`, f(x0 + i * (w + sela)), y0, f(w), f(h))),
    bendera: [garis(`${p}-tg`, f(x0 + 8 * s), y0, 0, f(-30 * s), W.coklat, 2.4), segitiga(`${p}t0`, f(x0 + 8 * s), f(y0 - 30 * s), [{ x: 0, y: 0 }, { x: 26 * s, y: 10 * s }, { x: 0, y: 20 * s }])],
    roda: rodaXY.flatMap((q, i) => lengkung(`${p}l${i}`, q.x, q.y, r)),
    rodaXY,
  };
}

/** Rumah kardus: atap segitiga `${p}t0`, dinding segi empat `${p}s0`, pintu segi empat `${p}s1`; atap berpuncak di (cx, y0). */
export function rumah(p: string, cx: number, y0: number, s = 1) {
  return {
    atap: [segitiga(`${p}t0`, cx, y0, [{ x: 0, y: 0 }, { x: 50 * s, y: 36 * s }, { x: -50 * s, y: 36 * s }])],
    dinding: [segiEmpat(`${p}s0`, f(cx - 42 * s), f(y0 + 36 * s), f(84 * s), f(64 * s))],
    pintu: [segiEmpat(`${p}s1`, f(cx - 12 * s), f(y0 + 64 * s), f(24 * s), f(36 * s), WARNA.pintu, { z: 1 })],
  };
}

/** Meja kerja kayu: papan `${id}` dan dua kaki `${id}-a`, `${id}-b`. */
export const mejaKerja = (id: string, x: number, y: number, w: number): Obj[] => [
  kotak(id, x, y, w, 8, WARNA.kayu, W.coklat, { rx: 2, tebal: 1.4, z: -2 }),
  garis(`${id}-a`, x + 12, y + 8, 0, 30, W.coklat, 4, { z: -3 }),
  garis(`${id}-b`, x + w - 12, y + 8, 0, 30, W.coklat, 4, { z: -3 }),
];

/** Panggung festival: lantai `${id}` dan tirai atas `${id}-tr` berwarna. */
export const panggung = (id: string, x: number, y: number, w: number): Obj[] => [
  kotak(id, x, y, w, 16, "#A16207", W.coklat, { rx: 3, tebal: 1.6, z: -2 }),
  kotak(`${id}-tr`, x, 26, w, 6, "#F472B6", W.ungu, { rx: 3, tebal: 1, z: -2 }),
];

/** Kalimat hitung per lambang: lambang `${id}{i}` berjarak `jarak`, berpusat di x. Tanda tambah, kurang, dan sama dengan berwarna merah. */
export function kalimat(id: string, x: number, y: number, isi: string[], u = 16, jarak = 20, warna: string = W.biru): Obj[] {
  const x0 = x - ((isi.length - 1) * jarak) / 2;
  return isi.map((s, i) => teks(`${id}${i}`, f(x0 + i * jarak), y, s, u, s === "+" || s === KURANG || s === "=" ? W.merah : warna));
}

/** Tangram tujuh keping dalam persegi bersisi 8 satuan; pojok kiri-atas (x, y), satuan `a`. Keping `${id}{i}`: 0 sampai 4 segitiga, 5 segi empat, 6 segi empat miring. */
const KEPING: Titik[][] = [
  [{ x: 0, y: 0 }, { x: 8, y: 0 }, { x: 4, y: 4 }],
  [{ x: 0, y: 0 }, { x: 4, y: 4 }, { x: 0, y: 8 }],
  [{ x: 8, y: 4 }, { x: 8, y: 8 }, { x: 4, y: 8 }],
  [{ x: 8, y: 0 }, { x: 8, y: 4 }, { x: 6, y: 2 }],
  [{ x: 4, y: 4 }, { x: 6, y: 6 }, { x: 2, y: 6 }],
  [{ x: 4, y: 4 }, { x: 6, y: 2 }, { x: 8, y: 4 }, { x: 6, y: 6 }],
  [{ x: 0, y: 8 }, { x: 2, y: 6 }, { x: 6, y: 6 }, { x: 4, y: 8 }],
];
const WARNA_KEPING = [WARNA.merah, WARNA.biru, WARNA.hijau, WARNA.kuning, WARNA.ungu, WARNA.oranye, WARNA.tosca];
export const tangram = (id: string, x: number, y: number, a: number): Obj[] =>
  KEPING.map((pts, i) => poligon(`${id}${i}`, x, y, pts.map((p) => ({ x: p.x * a, y: p.y * a })), WARNA_KEPING[i], { tebal: 1.8 }));

/** Sebatang lidi dari titik (x1, y1) ke (x2, y2). */
export const lidi = (id: string, x1: number, y1: number, x2: number, y2: number): Obj => garis(id, x1, y1, f(x2 - x1), f(y2 - y1), WARNA.lidi, 4.5, { z: 1 });
/** Bentuk dari lidi: tiap sisi `${p}{i}` sebatang lidi, titik sudut mutlak `pts`. */
export const bentukLidi = (p: string, pts: Titik[]): Obj[] => pts.map((a, i) => lidi(`${p}${i}`, a.x, a.y, pts[(i + 1) % pts.length].x, pts[(i + 1) % pts.length].y));
/** Geser semua lidi bentuk sejauh (dx, dy) dari titik asal `pts`. */
export const geserLidi = (p: string, pts: Titik[], dx: number, dy: number): (Partial<Obj> & { id: string })[] => pts.map((a, i) => ({ id: `${p}${i}`, x: f(a.x + dx), y: f(a.y + dy) }));
