import type { Obj } from "./logika-story";
import { E as E_B, KURANG, W, garis, teks } from "./k1b3b-gambar";

/**
 * Gambar khusus Story Kelas 1 Bab 3 Sub-Bab C "Kondektur dan Penumpang" (hubungan penjumlahan dan pengurangan), lanjutan Kereta ke Rumah Nenek.
 * Memakai ulang dasar gambar Sub-Bab A dan B, ditambah: kalimat tambah dan kurang, segitiga fakta, dan papan catatan kondektur.
 */

export { W, bulat, emo, garis, judul, kartu, kotak, orang, teks, deret, deretEmo, panahObj, label, ikatan, KURANG, type Titik } from "./k1b3b-gambar";

export const E = { ...E_B, noda: "\u{1F4A7}", sawah: "\u{1F33E}", gunung: "\u{26F0}\u{FE0F}", tidur: "\u{1F634}", baca: "\u{1F4D6}" } as const;

/** Kalimat per lambang: tiap lambang `${id}{i}` berjarak `jarak`, berpusat di x; tanda tambah, kurang, dan sama dengan berwarna merah. */
export function kalimatC(id: string, x: number, y: number, isi: string[], u = 18, jarak = 26, warna: string = W.biru): Obj[] {
  const x0 = x - ((isi.length - 1) * jarak) / 2;
  return isi.map((s, i) => teks(`${id}${i}`, x0 + i * jarak, y, s, u, s === "+" || s === KURANG || s === "=" ? W.merah : s === "?" ? W.merah : warna));
}
export const tambahK = (a: number, b: number): string => `${a} + ${b} = ${a + b}`;
export const kurangK = (a: number, b: number): string => `${a} ${KURANG} ${b} = ${a - b}`;

/** Segitiga fakta: tiga sisi `${id}-s0..2`, angka pucuk `${id}-t` dan pojok `${id}-a`, `${id}-b`. Pucuk di (x, y), lebar alas 2w, tinggi h. */
export function segitiga(id: string, x: number, y: number, w: number, h: number, t: string, a: string, b: string): Obj[] {
  const warna = (s: string) => (s === "?" ? W.merah : W.biru);
  return [
    garis(`${id}-s0`, x, y, -w, h, W.ungu, 2.6),
    garis(`${id}-s1`, x, y, w, h, W.ungu, 2.6),
    garis(`${id}-s2`, x - w, y + h, 2 * w, 0, W.ungu, 2.6),
    teks(`${id}-t`, x, y + 26, t, 16, warna(t)),
    teks(`${id}-a`, x - w + 22, y + h - 8, a, 16, warna(a)),
    teks(`${id}-b`, x + w - 22, y + h - 8, b, 16, warna(b)),
  ];
}
