import type { Obj } from "./logika-story";
import { E as E_4, W, bulat, garis, kotak, teks, type Titik } from "./k1b4a-gambar";

/**
 * Gambar khusus Story Kelas 1 Bab 5 Sub-Bab A "Ikan Baru Datang" (bilangan sampai dua puluh), awal cerita Akuarium Ikan Hias Abang.
 * Ikan digambar sebagai jalur bersirip `${id}` dengan mata `${id}-m`; dipindah dengan `geserIkan`.
 * Kantong plastik ikan, jaring kecil, wadah bersekat sepuluh (sekat `${id}c{i}`), papan label akuarium, akuarium kaca,
 * deretan akuarium kecil bernomor, garis bilangan sepuluh sampai dua puluh, dua bingkai sepuluh, manik hitung dua kawat, dan toples.
 */

export { W, bulat, emo, garis, judul, kartu, kotak, orang, teks, label, type Titik } from "./k1b4a-gambar";
export { tulisAngka } from "./k1b1a-gambar";

export const E = {
  ...E_4,
  lapak: "\u{1F3EA}",
  pakan: "\u{1F96B}",
  dunia: "\u{1F30D}",
  sasaran: "\u{1F3AF}",
  tumbuhan: "\u{1F33F}",
} as const;

export const WARNA_IKAN = {
  guppy: ["#FB923C", "#F472B6", "#FACC15", "#A78BFA", "#34D399"],
  koki: "#F59E0B",
  neon: "#22D3EE",
  air: "#E0F2FE",
  kaca: "#0369A1",
} as const;

const f = (n: number): string => Number(n.toFixed(1)).toString();
type Ubah = Partial<Obj> & { id: string };

/** Bentuk ikan (moncong ke kanan, ekor bercabang di kiri) relatif pusat, skala 1 kira-kira 25 x 14. */
const TITIK_IKAN: [number, number][] = [[11, 0], [4, -6], [-4, -5], [-8, -1], [-14, -7], [-13, 0], [-14, 7], [-8, 1], [-4, 5], [4, 6]];

/** Ikan hias: badan `${id}` (jalur) dan mata `${id}-m`. */
export const ikan = (id: string, cx: number, cy: number, warna: string, s = 1, o: Partial<Obj> = {}): Obj[] => [
  { id, t: "jalur", x: cx, y: cy, d: `M${TITIK_IKAN.map(([x, y]) => `${f(x * s)} ${f(y * s)}`).join(" L")} Z`, warna, garis: W.biru, tebal: 1.1, ...o },
  bulat(`${id}-m`, Number((cx + 5 * s).toFixed(1)), Number((cy - 1.5 * s).toFixed(1)), Number((1.3 * s).toFixed(1)), W.biru, undefined, { z: 1, ...o }),
];
/** Pindahkan ikan beserta matanya. */
export const geserIkan = (id: string, x: number, y: number, s = 1): Ubah[] => [
  { id, x, y },
  { id: `${id}-m`, x: Number((x + 5 * s).toFixed(1)), y: Number((y - 1.5 * s).toFixed(1)) },
];
/** Banyak ikan di titik-titik, id `${id}{i}`. */
export const kawanan = (id: string, pts: Titik[], warna: string | readonly string[], s = 1): Obj[] =>
  pts.flatMap((p, i) => ikan(`${id}${i}`, p.x, p.y, typeof warna === "string" ? warna : warna[i % warna.length], s));
/** Titik-titik ikan di dalam kantong: `n` ikan dalam `kol` kolom mulai (x0, y0) berjarak dx, dy; baris genap digeser sedikit. */
export const isiKantong = (n: number, x0: number, y0: number, kol: number, dx: number, dy: number): Titik[] =>
  Array.from({ length: n }, (_, i) => ({ x: x0 + (i % kol) * dx + (Math.floor(i / kol) % 2) * (dx / 3), y: y0 + Math.floor(i / kol) * dy }));

/** Kantong plastik ikan: kantong berair `${id}` dan ikatan karet merah `${id}-ik`. Pojok kiri-atas (x, y). */
export const kantongIkan = (id: string, x: number, y: number, w: number, h: number): Obj[] => [
  kotak(id, x, y, w, h, "#E0F2FE", "#0EA5E9", { rx: 18, tebal: 2, z: -2 }),
  bulat(`${id}-ik`, x + w / 2, y - 2, 5, "#F87171", W.merah, { tebal: 1.4, z: -1 }),
];

/** Jaring kecil: gagang `${id}-g` dan jaring bulat `${id}` berpusat (x, y). */
export const jaring = (id: string, x: number, y: number): Obj[] => [
  garis(`${id}-g`, x + 8, y - 8, 22, -18, W.coklat, 3),
  bulat(id, x, y, 11, "none", W.biru, { putus: true, tebal: 1.6, z: 2 }),
];
export const geserJaring = (id: string, x: number, y: number): Ubah[] => [
  { id, x, y },
  { id: `${id}-g`, x: x + 8, y: y - 8 },
];

/** Wadah bersekat sepuluh (dua baris lima sekat berair): wadah `${id}-b` dan sekat `${id}c{i}`. Pojok kiri-atas sekat pertama (x, y). */
export function wadah(id: string, x: number, y: number, s = 28): Obj[] {
  const out: Obj[] = [kotak(`${id}-b`, x - 5, y - 5, s * 5 + 10, s * 2 + 10, "#BAE6FD", WARNA_IKAN.kaca, { rx: 10, tebal: 2.4, z: -3 })];
  for (let i = 0; i < 10; i += 1) out.push(kotak(`${id}c${i}`, x + (i % 5) * s + 1, y + Math.floor(i / 5) * s + 1, s - 2, s - 2, WARNA_IKAN.air, "#0EA5E9", { rx: 6, tebal: 1.2, z: -2 }));
  return out;
}
/** Tengah sekat ke-i. */
export const sekat = (x: number, y: number, i: number, s = 28): Titik => ({ x: x + (i % 5) * s + s / 2, y: y + Math.floor(i / 5) * s + s / 2 });

/** Akuarium kaca: kaca `${id}`, pasir `${id}-p`, dan tanaman `${id}-r`. Pojok kiri-atas (x, y). */
export const akuarium = (id: string, x: number, y: number, w: number, h: number): Obj[] => [
  kotak(id, x, y, w, h, "#CFFAFE", "#0E7490", { rx: 5, tebal: 2.4, z: -3 }),
  kotak(`${id}-p`, x + 3, y + h - 9, w - 6, 6, "#FDE68A", undefined, { rx: 2, z: -2 }),
  { id: `${id}-r`, t: "teks", x: x + w - 12, y: y + h - 8, isi: E.tumbuhan, u: 14, warna: W.hijau, z: -1 },
];

/** Papan label akuarium kosong `${id}` dengan paku `${id}-pk`. */
export const papanLabel = (id: string, x: number, y: number, w: number, h: number): Obj[] => [
  kotak(id, x, y, w, h, W.putih, W.biru, { rx: 8, tebal: 2.2, z: -2 }),
  bulat(`${id}-pk`, x + w / 2, y + 6, 2.6, W.merah, W.merah, { z: -1 }),
];

/** Deretan sepuluh akuarium kecil `${id}{i}` (tanpa nomor) di tinggi y; nomor dipasang dengan `nomorAkuarium`. */
export const X_KECIL = (i: number): number => 14 + i * 28;
export const deretAkuarium = (id: string, y: number): Obj[] =>
  Array.from({ length: 10 }, (_, i) => kotak(`${id}${i}`, X_KECIL(i), y, 24, 22, "#CFFAFE", "#0E7490", { rx: 3, tebal: 1.6, z: -1 }));
export const nomorAkuarium = (id: string, y: number, mulai: number): Obj[] =>
  Array.from({ length: 10 }, (_, i) => teks(`${id}n${i}`, X_KECIL(i) + 12, y + 15, String(mulai + i), 8.4, W.biru));

/** Garis bilangan dari `dari` sampai `sampai`: garis `${id}`, takik `${id}-g{n}`, angka `${id}-a{n}`. */
export function garisBilangan(id: string, x0: number, y: number, dari: number, sampai: number, jarak: number): Obj[] {
  const out: Obj[] = [garis(id, x0 - 8, y, (sampai - dari) * jarak + 16, 0, W.biru, 2)];
  for (let n = dari; n <= sampai; n += 1) {
    const x = x0 + (n - dari) * jarak;
    out.push(garis(`${id}-g${n}`, x, y - 4, 0, 8, W.biru, 1.6), teks(`${id}-a${n}`, x, y + 15, String(n), 8.4, W.biru));
  }
  return out;
}

/** Bingkai sepuluh bergaris (untuk metode global): sel `${id}c{i}`. Bulatan isi `${id}t{i}` dibuat `isiBingkai`. */
export function bingkai(id: string, x: number, y: number, s = 22): Obj[] {
  return Array.from({ length: 10 }, (_, i) => kotak(`${id}c${i}`, x + (i % 5) * s, y + Math.floor(i / 5) * s, s, s, W.putih, W.biru, { rx: 0, tebal: 1.4, z: -1 }));
}
export const isiBingkai = (id: string, x: number, y: number, dari: number, sampai: number, warna: string, s = 22): Obj[] =>
  Array.from({ length: sampai - dari }, (_, k) => {
    const i = dari + k;
    return bulat(`${id}t${i}`, x + (i % 5) * s + s / 2, y + Math.floor(i / 5) * s + s / 2, s * 0.32, warna, W.biru, { tebal: 1 });
  });

/** Manik hitung dua kawat (rekenrek): bingkai `${id}-f`, kawat `${id}-w0` dan `${id}-w1`, manik `${id}{a|b}{i}` (lima merah, lima putih). */
export const MANIK = { x0: 24, y0: 70, w: 252, h: 74, ya: 88, yb: 120, kiri: 44, kanan: 256, jarak: 15 } as const;
export const xManik = (i: number, digeser: boolean): number => (digeser ? MANIK.kiri + i * MANIK.jarak : MANIK.kanan - (9 - i) * MANIK.jarak);
export function rekenrek(id: string): Obj[] {
  const out: Obj[] = [
    kotak(`${id}-f`, MANIK.x0, MANIK.y0, MANIK.w, MANIK.h, "#FEF3C7", W.coklat, { rx: 6, tebal: 3, z: -3 }),
    garis(`${id}-w0`, MANIK.x0 + 4, MANIK.ya, MANIK.w - 8, 0, "#78716C", 2, { z: -2 }),
    garis(`${id}-w1`, MANIK.x0 + 4, MANIK.yb, MANIK.w - 8, 0, "#78716C", 2, { z: -2 }),
  ];
  for (const [b, y] of [["a", MANIK.ya], ["b", MANIK.yb]] as const)
    for (let i = 0; i < 10; i += 1) out.push(bulat(`${id}${b}${i}`, xManik(i, false), y, 6.5, i < 5 ? W.merah : W.putih, W.biru, { tebal: 1.4 }));
  return out;
}
/** Geser manik kawat `b` ("a" atas, "b" bawah) nomor `dari` sampai sebelum `sampai` ke kiri. */
export const geserManik = (id: string, b: "a" | "b", dari: number, sampai: number): Ubah[] =>
  Array.from({ length: sampai - dari }, (_, k) => ({ id: `${id}${b}${dari + k}`, x: xManik(dari + k, true) }));

/** Toples kaca: badan `${id}` dan tutup merah `${id}-t`. Pojok kiri-atas badan (x, y). */
export const toples = (id: string, x: number, y: number, w: number, h: number): Obj[] => [
  kotak(id, x, y, w, h, "#ECFEFF", "#0891B2", { rx: 14, tebal: 2.4, z: -2 }),
  kotak(`${id}-t`, x + 8, y - 8, w - 16, 10, "#F87171", W.merah, { rx: 3, tebal: 1.6, z: -1 }),
];
/** Butir kecil (kerikil atau kerang) `${id}{i}` tersebar di dalam kotak (x, y, w) dalam `kol` kolom. */
export const butir = (id: string, n: number, x: number, y: number, kol: number, jarak: number, warna: string, r = 4.5): Obj[] =>
  Array.from({ length: n }, (_, i) => bulat(`${id}${i}`, x + (i % kol) * jarak + (Math.floor(i / kol) % 2) * (jarak / 2), y + Math.floor(i / kol) * jarak, r, warna, W.coklat, { tebal: 1 }));
