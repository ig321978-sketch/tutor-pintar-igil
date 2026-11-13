import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 6 Bab 1 Sub-Bab B (Pembagian Pecahan): batang bagi, gelas, botol, pecahan bertingkat, dan kartu.
 * Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#16A34A",
  putih: "#FFFFFF",
  hitam: "#1F2937",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  jeruk: "#FB923C",
  air: "#7DD3FC",
  krem: "#FEF9C3",
  muda: "#DBEAFE",
  hijauMuda: "#BBF7D0",
  merahMuda: "#FECACA",
  coklat: "#92400E",
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const jalur = (id: string, x: number, y: number, d: string, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "jalur", x, y, d, warna, garis: garisW, tebal: 1.4, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Kartu berjudul: kotak berwarna dengan beberapa baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 8.6, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u))];
}

/** Pecahan bertingkat: pembilang di atas garis, penyebut di bawah, titik tengah (cx, y garis). */
export function pecahan(id: string, cx: number, yg: number, atas: string, bawah: string, u = 11, warna: string = W.biru): Obj[] {
  const lebar = Math.max(atas.length, bawah.length) * u * 0.62 + 6;
  return [teks(`${id}-a`, cx, yg - 3, atas, u, warna), garis(`${id}-g`, cx - lebar / 2, yg, lebar, 0, warna, 1.6), teks(`${id}-b`, cx, yg + u + 2, bawah, u, warna)];
}

/** Nomor benda untuk batang bagi. */
export const idBagi = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/** Batang bagi: n kotak sama besar; `isi` kotak pertama berwarna. Lebar total w, kiri-atas (x, y). */
export function bagi(id: string, x: number, y: number, w: number, h: number, n: number, isi: number, warna: string = W.air, o: Opsi = {}): Obj[] {
  return Array.from({ length: n }, (_, i) => kotak(`${id}${i}`, x + (i * w) / n, y, w / n, h, i < isi ? warna : W.putih, W.biru, { rx: 0, tebal: 1, ...o }));
}

/** Gelas kecil bertrapesium, pojok kiri-atas (x, y), lebar 16 tinggi 16. */
export const gelas = (id: string, x: number, y: number, warna: string = W.air, o: Opsi = {}): Obj => jalur(id, x, y, "M0 0 L3 16 L13 16 L16 0 Z", warna, W.biru, o);

/** Botol air, pojok kiri-atas (x, y), lebar 14 tinggi 36. */
export const botol = (id: string, x: number, y: number, warna: string = W.air, o: Opsi = {}): Obj => jalur(id, x, y, "M4 0 L10 0 L10 6 L14 12 L14 36 L0 36 L0 12 L4 6 Z", warna, W.biru, o);

/** Kartu satu metode luar: nama (satu sampai dua baris) dan arti singkat. Lebar 134, tinggi 70. */
export const kartuMetode = (id: string, x: number, y: number, warna: string, baris: string[], arti: string): Obj[] => [
  kotak(`${id}-k`, x, y, 134, 70, warna, W.biru, { rx: 10 }),
  ...baris.map((b, i) => teks(`${id}-n${i}`, x + 67, y + 24 + i * 12, b, 8.6)),
  teks(`${id}-a`, x + 67, y + 28 + baris.length * 12, arti, 7, W.ungu),
];
