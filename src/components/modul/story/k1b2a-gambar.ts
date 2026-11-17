import type { Obj } from "./logika-story";
import { E as E_D, W, bulat, emo, garis, kartu, kotak, teks, type Titik } from "./k1b1d-gambar";

/**
 * Gambar khusus Story Kelas 1 Bab 2 Sub-Bab A "Bibit Kiriman Nenek" (cerita penjumlahan), awal cerita Kebun Sayur Mamah.
 * Memakai ulang dasar gambar Bab 1, ditambah: bedeng tanah, lubang tanam, bedeng dua baris lima lubang (bingkai sepuluh),
 * kalimat penjumlahan yang muncul per lambang, papan kebun, dan tikar bagian-bagian-utuh.
 */

export { W, bulat, emo, garis, judul, kartu, kotak, orang, teks, wajah, deret, deretEmo, panahObj, type Titik } from "./k1b1d-gambar";

export const E = {
  ...E_D,
  cabai: "\u{1F336}\u{FE0F}",
  tomat: "\u{1F345}",
  selada: "\u{1F96C}",
  sawi: "\u{1F33F}",
  wortel: "\u{1F955}",
  terong: "\u{1F346}",
  jagung: "\u{1F33D}",
  bibit: "\u{1F331}",
  keranjang: "\u{1F9FA}",
  air: "\u{1F4A7}",
  matahari: "\u{2600}\u{FE0F}",
  layu: "\u{1F940}",
  sekop: "\u{26CF}\u{FE0F}",
  bunga: "\u{1F33B}",
} as const;

export const TANAH = "#A16207";
export const TANAH_MUDA = "#D6A15E";

/** Bedeng tanah: kotak `${id}` dan nama `${id}-n` di bawahnya (boleh kosong). */
export const bedeng = (id: string, x: number, y: number, w: number, h: number, nama = ""): Obj[] => [
  kotak(id, x, y, w, h, TANAH_MUDA, W.coklat, { rx: 8, tebal: 2, z: -1 }),
  ...(nama ? [teks(`${id}-n`, x + w / 2, y + h + 11, nama, 8.4, W.coklat)] : []),
];

/** Lubang tanam: bulatan tanah gelap, id `${id}`. */
export const lubang = (id: string, x: number, y: number, r = 6): Obj => bulat(id, x, y, r, "#78350F", W.coklat, { tebal: 1, z: -1 });

/** Bedeng dua baris lima lubang (seperti bingkai sepuluh): petak `${id}c{i}`, pojok kiri-atas (x, y), sisi petak s. */
export function bedengSepuluh(id: string, x: number, y: number, s = 26): Obj[] {
  const out: Obj[] = [kotak(`${id}-b`, x - 6, y - 6, s * 5 + 12, s * 2 + 12, TANAH_MUDA, W.coklat, { rx: 8, tebal: 2, z: -2 })];
  for (let i = 0; i < 10; i += 1) out.push(kotak(`${id}c${i}`, x + (i % 5) * s, y + Math.floor(i / 5) * s, s, s, "#E8C08A", W.coklat, { rx: 2, tebal: 1.3, z: -1 }));
  return out;
}
/** Tengah petak ke-i bedeng sepuluh. */
export const petak = (x: number, y: number, i: number, s = 26): Titik => ({ x: x + (i % 5) * s + s / 2, y: y + Math.floor(i / 5) * s + s / 2 });

/** Kalimat penjumlahan per lambang: tiap lambang `${id}{i}` berjarak `jarak`, berpusat di x. Kosong = tidak digambar. */
export function kalimat(id: string, x: number, y: number, isi: string[], u = 18, jarak = 26, warna: string = W.biru): Obj[] {
  const x0 = x - ((isi.length - 1) * jarak) / 2;
  return isi.map((s, i) => teks(`${id}${i}`, x0 + i * jarak, y, s, u, s === "+" || s === "=" ? W.merah : warna));
}
/** Letak lambang ke-i dalam kalimat yang dibuat `kalimat`. */
export const xKalimat = (x: number, n: number, i: number, jarak = 26): number => x - ((n - 1) * jarak) / 2 + i * jarak;

/** Papan kebun kayu: papan `${id}-k`, tiang `${id}-t`. */
export const papan = (id: string, x: number, y: number, w: number, h: number): Obj[] => [
  garis(`${id}-t`, x + w / 2, y + h, 0, 18, W.coklat, 4),
  kotak(`${id}-k`, x, y, w, h, "#FEF3C7", W.coklat, { rx: 6, tebal: 2.4 }),
];

/** Tikar bagian-bagian-utuh: kotak utuh `${id}-u` di atas, dua kotak bagian `${id}-a` dan `${id}-b` di bawah, dengan nama. */
export const tikar = (id: string, x: number, y: number, w: number): Obj[] => [
  kotak(`${id}-u`, x, y, w, 46, W.emas, W.biru, { rx: 6, tebal: 2, z: -1 }),
  kotak(`${id}-a`, x, y + 54, w / 2 - 3, 46, W.langit, W.biru, { rx: 6, tebal: 2, z: -1 }),
  kotak(`${id}-b`, x + w / 2 + 3, y + 54, w / 2 - 3, 46, W.pink, W.biru, { rx: 6, tebal: 2, z: -1 }),
  teks(`${id}-nu`, x + w + 4, y + 26, "utuh", 8.6, W.biru, { anchor: "start" }),
  teks(`${id}-na`, x + w + 4, y + 80, "bagian", 8.6, W.biru, { anchor: "start" }),
];

/** Kartu satu baris (penyingkat). */
export const label = (id: string, x: number, y: number, w: number, isi: string, warna: string = W.emas, u = 10): Obj[] => kartu(id, x, y, w, 22, warna, [isi], u);

/** Benda sejenis di dalam sebuah bedeng (deret mendatar), id `${id}{i}`. */
export const deretDi = (e: string, id: string, n: number, x0: number, jarak: number, y: number, u = 20): Obj[] =>
  Array.from({ length: n }, (_, i) => emo(`${id}${i}`, x0 + i * jarak, y, e, u));
