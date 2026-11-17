import type { Obj } from "./logika-story";
import { E as E_A, W, garis, kotak, teks, type Titik } from "./k1b2a-gambar";

/**
 * Gambar khusus Story Kelas 1 Bab 2 Sub-Bab B "Panen Pertama dan Keranjang Sepuluh" (berbagai cara menjumlah).
 * Memakai ulang gambar Sub-Bab A, ditambah: pagar kayu bernomor (garis bilangan) dengan lompatan, kantong panen,
 * dan keranjang sepuluh lubang. Pagar: tiang `${id}t{n}` dan angka `${id}a{n}` untuk n = 0 sampai 10.
 */

export { W, bulat, emo, garis, judul, kartu, kotak, orang, teks, wajah, deret, deretEmo, panahObj, kalimat, label, bedengSepuluh, petak, papan, tikar, type Titik } from "./k1b2a-gambar";

export const E = { ...E_A, timun: "\u{1F952}", kentang: "\u{1F954}", bawang: "\u{1F9C5}", kantong: "\u{1F45C}", truk: "\u{1F69A}", rumah: "\u{1F3E1}", jam: "\u{23F0}", petik: "\u{270B}" } as const;

/** Letak x angka n pada pagar bernomor yang mulai di x0 dengan jarak s. */
export const xPagar = (x0: number, n: number, s = 26): number => x0 + n * s;

/** Pagar kayu bernomor nol sampai sepuluh (garis bilangan): palang `${id}-p`, tiang `${id}t{n}`, angka `${id}a{n}`. */
export function pagar(id: string, x0: number, y: number, s = 26, warna: string = W.coklat): Obj[] {
  const out: Obj[] = [garis(`${id}-p`, x0 - 8, y, s * 10 + 16, 0, warna, 3)];
  for (let n = 0; n <= 10; n += 1) {
    out.push(garis(`${id}t${n}`, xPagar(x0, n, s), y - 8, 0, 16, warna, 2.4));
    out.push(teks(`${id}a${n}`, xPagar(x0, n, s), y + 22, String(n), 10, W.biru));
  }
  return out;
}

/** Lompatan melengkung dari angka n ke n + 1 di atas pagar, id `${id}`. */
export const lompat = (id: string, x0: number, y: number, n: number, s = 26, warna: string = W.merah): Obj => ({
  id,
  t: "jalur",
  x: xPagar(x0, n, s),
  y: y - 10,
  d: `M0 0 Q${s / 2} -24 ${s} 0`,
  garis: warna,
  tebal: 2.4,
  gambar: true,
});

/** Kantong panen: badan `${id}` dan nama `${id}-n` (boleh kosong). */
export const kantong = (id: string, x: number, y: number, w: number, h: number, nama = ""): Obj[] => [
  kotak(id, x, y, w, h, "#FDE68A", W.coklat, { rx: 14, tebal: 2, z: -1 }),
  garis(`${id}-tl`, x + w / 2 - 12, y, 24, 0, W.coklat, 3),
  ...(nama ? [teks(`${id}-n`, x + w / 2, y + h + 11, nama, 8.4, W.coklat)] : []),
];

/** Letak benda ke-i di dalam kantong (dua kolom). */
export const diKantong = (x: number, y: number, i: number): Titik => ({ x: x + 16 + (i % 2) * 22, y: y + 22 + Math.floor(i / 2) * 22 });
