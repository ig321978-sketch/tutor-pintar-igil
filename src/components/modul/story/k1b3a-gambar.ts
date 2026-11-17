import type { Obj } from "./logika-story";
import { E as E_A, W, emo, kotak, teks, type Titik } from "./k1b2a-gambar";

/**
 * Gambar khusus Story Kelas 1 Bab 3 Sub-Bab A "Bekal untuk Nenek" (cerita pengurangan), awal cerita Kereta ke Rumah Nenek.
 * Memakai ulang dasar gambar Bab 1 dan Bab 2, ditambah: badan gerbong, bangku penumpang, kotak bekal, kotak minuman bersekat
 * dua baris lima (bingkai sepuluh), dan kalimat pengurangan yang muncul per lambang.
 */

export { W, bulat, emo, garis, judul, kartu, kotak, orang, teks, deret, deretEmo, panahObj, label, type Titik } from "./k1b2a-gambar";

export const E = {
  ...E_A,
  kue: "\u{1F370}",
  kereta: "\u{1F686}",
  stasiun: "\u{1F689}",
  penumpang: "\u{1F9D1}",
  minuman: "\u{1F9C3}",
  roti: "\u{1F35E}",
  jeruk: "\u{1F34A}",
  pisang: "\u{1F34C}",
  karcis: "\u{1F3AB}",
  kursi: "\u{1F4BA}",
  lapar: "\u{1F60B}",
  lega: "\u{1F60C}",
  catatan: "\u{1F4DD}",
} as const;

/** Lambang kurang yang dipakai di layar (tanda minus, bukan tanda hubung). */
export const KURANG = "−";

/** Kalimat pengurangan per lambang: tiap lambang `${id}{i}` berjarak `jarak`, berpusat di x. Tanda kurang dan sama dengan berwarna merah. */
export function kalimatK(id: string, x: number, y: number, isi: string[], u = 18, jarak = 26, warna: string = W.biru): Obj[] {
  const x0 = x - ((isi.length - 1) * jarak) / 2;
  return isi.map((s, i) => teks(`${id}${i}`, x0 + i * jarak, y, s, u, s === KURANG || s === "=" ? W.merah : warna));
}
/** Letak lambang ke-i dalam kalimat yang dibuat `kalimatK`. */
export const xLambang = (x: number, n: number, i: number, jarak = 26): number => x - ((n - 1) * jarak) / 2 + i * jarak;
/** Kalimat a − b = c ditulis untuk layar. */
export const tulis = (a: number, b: number): string => `${a} ${KURANG} ${b} = ${a - b}`;

/** Kotak bekal (wadah kue): kotak `${id}` berwarna krem dengan tutup tipis `${id}-tp`. */
export const kotakBekal = (id: string, x: number, y: number, w: number, h: number): Obj[] => [
  kotak(id, x, y, w, h, "#FEF3C7", W.coklat, { rx: 8, tebal: 2, z: -2 }),
  kotak(`${id}-tp`, x + 6, y - 6, w - 12, 6, "#F59E0B", W.coklat, { rx: 3, tebal: 1.4, z: -2 }),
];

/** Bangku penumpang biru panjang: dudukan `${id}` dan sandaran `${id}-s`. */
export const bangku = (id: string, x: number, y: number, w: number): Obj[] => [
  kotak(`${id}-s`, x + 4, y - 34, w - 8, 34, "#BFDBFE", W.biru, { rx: 8, tebal: 1.4, z: -3 }),
  kotak(id, x, y, w, 14, "#93C5FD", W.biru, { rx: 4, tebal: 1.6, z: -2 }),
];

/** Kotak minuman bersekat dua baris lima: wadah `${id}-b` dan sekat `${id}c{i}`, pojok kiri-atas (x, y), sisi sekat s. */
export function kotakSekat(id: string, x: number, y: number, s = 26): Obj[] {
  const out: Obj[] = [kotak(`${id}-b`, x - 6, y - 6, s * 5 + 12, s * 2 + 12, "#C4B5FD", W.ungu, { rx: 8, tebal: 2, z: -2 })];
  for (let i = 0; i < 10; i += 1) out.push(kotak(`${id}c${i}`, x + (i % 5) * s, y + Math.floor(i / 5) * s, s, s, "#F5F3FF", W.ungu, { rx: 3, tebal: 1.3, z: -1 }));
  return out;
}
/** Tengah sekat ke-i kotak bersekat. */
export const sekat = (x: number, y: number, i: number, s = 26): Titik => ({ x: x + (i % 5) * s + s / 2, y: y + Math.floor(i / 5) * s + s / 2 });

/** Benda sejenis di titik-titik, id `${id}{i}`, sedikit diturunkan supaya emoji duduk di tengah. */
export const isiDi = (e: string, id: string, pts: Titik[], u = 18, turun = 6): Obj[] => pts.map((p, i) => emo(`${id}${i}`, p.x, p.y + turun, e, u));
