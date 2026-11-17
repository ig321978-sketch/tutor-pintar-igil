import type { Obj } from "./logika-story";
import { E as E_A, W, emo, garis, kotak, teks, type Titik } from "./k1b1a-gambar";

/**
 * Gambar khusus Story Kelas 1 Bab 1 Sub-Bab B "Hadiah Nenek untuk Rak yang Lebih Sedikit" (membandingkan banyak benda).
 * Memakai ulang dasar gambar Sub-Bab A (warna, teks, kartu, tokoh) dan menambah: barisan mainan renggang atau rapat,
 * garis pasangan, papan rak, kotak hadiah, dan garis bilangan nol sampai sepuluh.
 * Mainan baris: `id{i}` benda utama ke-i (dihitung uji). Garis pasangan: `${id}{i}`. Garis bilangan: garis `${id}-g`, takik `${id}-c{i}`, angka `${id}-a{i}`.
 */

export { W, bingkai, bicara, bulat, emo, garis, judul, kartu, kartuAngka, keranjang, kotak, lemari, orang, teks, wajah, deretMainan, type Titik } from "./k1b1a-gambar";

/** Emoji cerita Sub-Bab A ditambah tokoh dan benda Sub-Bab B (semua paling tinggi Emoji 12, tanpa ZWJ). */
export const E = {
  ...E_A,
  hadiah: "\u{1F381}",
  surat: "\u{1F48C}",
  nenek: "\u{1F475}",
  sedih: "\u{1F622}",
  senyum: "\u{1F60A}",
  kelereng: "\u{1F535}",
  bintang: "\u{2B50}",
  rumah: "\u{1F3E0}",
  kardus: "\u{1F4E6}",
  sama: "\u{1F91D}",
} as const;

/** Titik barisan sebanyak `n` mulai x0 dengan jarak `jarak` pada tinggi y. */
export const baris = (n: number, x0: number, jarak: number, y: number): Titik[] => Array.from({ length: n }, (_, i) => ({ x: x0 + i * jarak, y }));

/** Barisan sebanyak `n` di tengah kanvas dengan jarak `jarak`. */
export const barisTengah = (n: number, jarak: number, y: number): Titik[] => baris(n, 150 - ((n - 1) * jarak) / 2, jarak, y);

/** Garis pasangan dari benda atas ke benda bawah (tergambar bertahap). `ua`, `ub`: jari-jari benda supaya garis tidak menutupi gambar. */
export const garisPasang = (id: string, a: Titik, b: Titik, warna: string = W.hijau, ua = 12, ub = 12): Obj =>
  garis(id, a.x, a.y + ua, b.x - a.x, b.y - ub - (a.y + ua), warna, 2.2, { gambar: true });

/** Papan rak kayu: papan `${id}` dan label nama rak `${id}-n` di kiri atas. */
export const papanRak = (id: string, x: number, y: number, w: number, nama: string, warna = "#F5D7A1"): Obj[] => [
  kotak(id, x, y, w, 40, warna, W.coklat, { rx: 5, tebal: 2, z: -1 }),
  teks(`${id}-n`, x + 4, y - 4, nama, 8.4, W.coklat, { anchor: "start" }),
];

/** Garis bilangan nol sampai `maks`: pangkal di x0, jarak antartakik `jarak`. */
export function garisBilangan(id: string, x0: number, y: number, jarak: number, maks = 10, o: Partial<Obj> = {}): Obj[] {
  const out: Obj[] = [garis(`${id}-g`, x0 - 8, y, maks * jarak + 16, 0, W.biru, 2.4, o)];
  for (let i = 0; i <= maks; i += 1) {
    out.push(garis(`${id}-c${i}`, x0 + i * jarak, y - 5, 0, 10, W.biru, 1.8, o));
    out.push(teks(`${id}-a${i}`, x0 + i * jarak, y + 17, String(i), 9.5, W.biru, o));
  }
  return out;
}

/** Penanda di garis bilangan: segitiga emoji di atas takik `n`. */
export const penanda = (id: string, x0: number, y: number, jarak: number, n: number, e: string, u = 20): Obj => emo(id, x0 + n * jarak, y - 10, e, u);

/** Kotak hadiah Nenek: emoji kado besar. */
export const kado = (id: string, x: number, y: number, u = 34): Obj => emo(id, x, y, E.hadiah, u);
