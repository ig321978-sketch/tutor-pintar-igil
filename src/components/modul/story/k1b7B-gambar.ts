import type { Obj } from "./logika-story";
import { E as E_5D, W, bulat, garis, kotak } from "./k1b5d-gambar";

/**
 * Gambar khusus Story Kelas 1 Bab 7 Sub-Bab B "Papan Lantai Rumah Pohon" (mengukur panjang), akhir cerita Rumah Pohon Abang.
 * Rangka lantai di dahan jambu (bingkai `${id}`, lubang `${id}-l`), papan lantai, pohon jambu, semak, bengkel Kakek Jaya,
 * jengkal (badan `${id}` dan ibu jari `${id}-j`), tongkat kayu, potongan sedotan,
 * kertas berpetak (sel `${id}c{i}`), pita, dan bendera. Semua digambar dari bentuk dasar, tidak memakai gambar bab lain selain tokoh.
 */

export { W, bulat, emo, garis, judul, kartu, kotak, orang, teks, type Titik } from "./k1b5d-gambar";

export const E = {
  ...E_5D,
  tukang: "\u{1F477}",
  hore: "\u{1F64C}",
  takut: "\u{1F628}",
  palu: "\u{1F528}",
  bendera: "\u{1F6A9}",
} as const;

export const WB = {
  kayu: "#E8B979",
  kayuTua: "#92400E",
  daun: "#4ADE80",
  daunTua: "#15803D",
  batang: "#A16207",
  semak: "#86EFAC",
  jengkal: "#FDBA74",
  jengkalTua: "#9A3412",
  tongkat: "#D6A15E",
  sedotan: "#F472B6",
  sisi: "#E7E5E4",
  petak: "#ECFCCB",
  merahPita: "#EF4444",
  biruPita: "#3B82F6",
} as const;

const f = (n: number): number => Number(n.toFixed(1));

/* ------------------------------ Pohon, semak, rangka, papan ------------------------------ */

/** Pohon jambu di tepi kanan: batang `${id}` (tengah x) dan tajuk `${id}-d`. */
export const pohon = (id: string, x: number, yDasar = 198): Obj[] => [
  kotak(id, f(x - 7), f(yDasar - 110), 14, 110, WB.batang, W.coklat, { rx: 3, tebal: 1.6, z: -3 }),
  bulat(`${id}-d`, x, f(yDasar - 126), 22, WB.daun, WB.daunTua, { tebal: 1.6, z: -4 }),
];
/** Tiga gumpalan semak di dasar: `${id}0` sampai `${id}2`, mulai x. */
export const semak = (id: string, x: number, y: number): Obj[] =>
  [0, 1, 2].map((i) => bulat(`${id}${i}`, f(x + i * 14), f(y + (i % 2) * 3), 9, WB.semak, WB.daunTua, { tebal: 1.2, z: 2 }));
/** Rangka lantai: bingkai kayu `${id}` dan lubang `${id}-l` (tampak semak di bawahnya). Pojok kiri-atas (x, y). */
export const rangka = (id: string, x: number, y: number, w: number, h: number): Obj[] => [
  kotak(id, x, y, w, h, WB.tongkat, W.coklat, { rx: 3, tebal: 4, z: -2 }),
  kotak(`${id}-l`, x + 6, y + 6, w - 12, h - 12, "#BBF7D0", WB.daunTua, { rx: 2, tebal: 1, z: -1 }),
];
/** Papan lantai berserat: papan `${id}` dan dua serat `${id}-s0`, `${id}-s1`. Pojok kiri-atas (x, y). */
export const papan = (id: string, x: number, y: number, w: number, h: number): Obj[] => [
  kotak(id, x, y, w, h, WB.kayu, W.coklat, { rx: 2, tebal: 1.6 }),
  garis(`${id}-s0`, f(x + 5), f(y + h * 0.35), f(w - 10), 0, WB.kayuTua, 0.8, { op: 0.5 }),
  garis(`${id}-s1`, f(x + 5), f(y + h * 0.68), f(w - 10), 0, WB.kayuTua, 0.8, { op: 0.5 }),
];
/** Bengkel Kakek Jaya: dinding `${id}` dan atap segitiga `${id}-a`. Pojok kiri-atas (x, y). */
export const bengkel = (id: string, x: number, y: number, w: number, h: number): Obj[] => [
  kotak(id, x, y, w, h, "#FDE68A", W.coklat, { rx: 2, tebal: 2, z: -2 }),
  { id: `${id}-a`, t: "jalur", x, y, d: `M-6 0 L${f(w / 2)} -16 L${f(w + 6)} 0 Z`, warna: "#B45309", garis: W.coklat, tebal: 1.6, z: -2 },
];

/* ------------------------------ Alat ukur ------------------------------ */

/** Batang yang diukur (sisi lantai): kotak abu `${id}`. Pojok kiri-atas (x, y). */
export const sisi = (id: string, x: number, y: number, w: number, h = 16): Obj[] => [kotak(id, x, y, w, h, WB.sisi, "#78716C", { rx: 3, tebal: 1.6, z: -1 })];

/** Satu jengkal (tangan): badan `${id}` dan ibu jari `${id}-j`. Pojok kiri-atas (x, y), lebar w. */
export const jengkal = (id: string, x: number, y: number, w: number, h = 16): Obj[] => [
  kotak(id, x, y, w, h, WB.jengkal, WB.jengkalTua, { rx: 5, tebal: 1.5 }),
  kotak(`${id}-j`, f(x + w * 0.62), f(y - 4), f(w * 0.26), 6, WB.jengkal, WB.jengkalTua, { rx: 2, tebal: 1.2 }),
];
/** Satu tongkat kayu: batang `${id}` dan ruas `${id}-r`. */
export const tongkat = (id: string, x: number, y: number, w: number, h = 16): Obj[] => [
  kotak(id, x, y, w, h, WB.tongkat, W.coklat, { rx: 3, tebal: 1.5 }),
  garis(`${id}-r`, f(x + w * 0.5), y, 0, h, W.coklat, 1.4),
];
/** Satu potongan sedotan: batang `${id}` dan garis putih `${id}-r`. */
export const sedotan = (id: string, x: number, y: number, w: number, h = 16): Obj[] => [
  kotak(id, x, y, w, h, WB.sedotan, W.biru, { rx: 4, tebal: 1.4 }),
  garis(`${id}-r`, f(x + 4), f(y + h / 2), w - 8, 0, W.putih, 2),
];

/** Fungsi pembuat satu satuan ukur ke-i (pojok kiri-atas diberikan). */
export type Satuan = (id: string, x: number, y: number, w: number, h?: number) => Obj[];

/**
 * Deret `n` satuan berlebar `w` yang rapat dari `x0`, tinggi pojok `y`: ids `${id}{i}`.
 * `celah`: nomor satuan yang didahului ruang kosong selebar satu satuan (jengkal yang melompat).
 */
export const deretSatuan = (buat: Satuan, id: string, n: number, x0: number, y: number, w: number, h = 16, celah: number[] = []): Obj[] => {
  const out: Obj[] = [];
  let x = x0;
  for (let i = 0; i < n; i += 1) {
    if (celah.includes(i)) x += w;
    out.push(...buat(`${id}${i}`, f(x), y, w, h));
    x += w;
  }
  return out;
};
/** Letak kiri satuan ke-i pada deret yang sama dengan `deretSatuan`. */
export const xSatuan = (x0: number, w: number, i: number, celah: number[] = []): number => f(x0 + (i + celah.filter((c) => c <= i).length) * w);
/** Id benda utama `${id}{dari}` sampai `${id}{sampai}` (tanpa pelengkap). */
export const idSatuan = (id: string, dari: number, sampai: number): string[] => Array.from({ length: sampai - dari + 1 }, (_, i) => `${id}${dari + i}`);

/* ------------------------------ Kertas berpetak dan batang kotak ------------------------------ */

/** Kertas berpetak `kol` kolom x `baris` baris: sel `${id}c{i}` (i = baris * kol + kolom), sisi sel s. Pojok kiri-atas (x, y). */
export const petak = (id: string, x: number, y: number, kol: number, baris: number, s: number): Obj[] =>
  Array.from({ length: kol * baris }, (_, i) => kotak(`${id}c${i}`, f(x + (i % kol) * s), f(y + Math.floor(i / kol) * s), s, s, WB.petak, "#65A30D", { rx: 0, tebal: 0.8, z: -2 }));
/** Id sel kertas berpetak pada baris `b`, kolom `dari` sampai `sampai`. */
export const selBaris = (id: string, kol: number, b: number, dari: number, sampai: number): string[] => Array.from({ length: sampai - dari + 1 }, (_, i) => `${id}c${b * kol + dari + i}`);
/** Id sel pada kolom `c`, baris `dari` sampai `sampai`. */
export const selKolom = (id: string, kol: number, c: number, dari: number, sampai: number): string[] => Array.from({ length: sampai - dari + 1 }, (_, i) => `${id}c${(dari + i) * kol + c}`);

/** Batang kotak polos `n` kotak: kotak `${id}{i}` selebar s, mulai x0 di tinggi y. */
export const batangKotak = (id: string, n: number, x0: number, y: number, s: number, warna: string): Obj[] =>
  Array.from({ length: n }, (_, i) => kotak(`${id}${i}`, f(x0 + i * s), y, s, s, warna, W.biru, { rx: 2, tebal: 1.4 }));

/* ------------------------------ Bendera, pita, konfeti ------------------------------ */

/** Bendera di tiang: tiang `${id}` dan kain `${id}-b`. Pangkal tiang (x, y), tinggi 46. */
export const bendera = (id: string, x: number, y: number): Obj[] => [
  garis(id, x, y, 0, 46, W.coklat, 2.4, { z: 2 }),
  { id: `${id}-b`, t: "jalur", x, y, d: "M0 0 L26 7 L0 14 Z", warna: WB.merahPita, garis: W.biru, tebal: 1, z: 2 },
];
const WARNA_UMBUL = ["#F472B6", "#FACC15", "#22D3EE", "#A78BFA", "#34D399", "#FB923C"];
/** Tali umbul-umbul `${id}` dan `n` bendera segitiga `${id}-b{i}` dari x ke x + lebar di tinggi y. */
export const umbul = (id: string, x: number, y: number, lebar: number, n: number): Obj[] => [
  garis(id, x, y, lebar, 0, W.coklat, 1.4, { z: 2 }),
  ...Array.from({ length: n }, (_, i): Obj => {
    const cx = f(x + ((i + 0.5) * lebar) / n);
    return { id: `${id}-b${i}`, t: "jalur", x: cx, y, d: "M-7 0 L7 0 L0 13 Z", warna: WARNA_UMBUL[i % WARNA_UMBUL.length], garis: W.biru, tebal: 1, z: 2 };
  }),
];
/** Konfeti kecil berhamburan: `${id}{i}`. */
export const konfeti = (id: string): Obj[] =>
  ([[24, 38, 8], [64, 52, -14], [108, 32, 20], [150, 46, -6], [196, 34, 14], [236, 54, -18], [272, 40, 10], [286, 70, -10]] as [number, number, number][]).map(([x, y, r], i) =>
    kotak(`${id}${i}`, x, y, 7, 4, WARNA_UMBUL[i % WARNA_UMBUL.length], undefined, { rx: 1, rot: r, z: 3 }),
  );

/** Panah kecil `${id}` dari (x, y) sejauh (dx, dy). */
export const panah = (id: string, x: number, y: number, dx: number, dy: number, warna: string = W.merah): Obj => ({ id, t: "panah", x, y, x2: dx, y2: dy, warna, tebal: 2 });
