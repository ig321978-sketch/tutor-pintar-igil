import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 1 Bab 7 Sub-Bab A (membandingkan panjang dan tinggi):
 * batang kotak satuan (mendatar untuk panjang, menegak untuk tinggi), garis awal, tanah, dan kartu.
 * Berkas ini TIDAK dipakai bab lain.
 * Satuan: kotak satuan berjajar rapat. Batang mendatar kunci `s` = "u" + huruf (mis. "ua"): kotak `${s}{i}`, nama `${s}-nm`, panjang `${s}-ln`, benda `${s}-b`.
 * Batang menegak kunci `s` = "v" + huruf: kotak `${s}{i}` dari bawah, nama `${s}-nm`, tinggi `${s}-ln`.
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#16A34A",
  putih: "#FFFFFF",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  coklat: "#92400E",
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  pink: "#FBCFE8",
  lavender: "#EDE9FE",
  oranye: "#FBA919",
};

export const OWL = "\u{1F989}";
export const ANAK_EMO = "\u{1F9D2}";

type Opsi = Partial<Obj>;
export type Titik = { x: number; y: number };

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Kartu angka atau kata besar: pojok kiri-atas (x, y); id `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, isi: string, warna: string = W.krem, w = 40, h = 36, u = 22, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.6, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, isi, u, W.merah, o),
];

/* ------------------------------ Batang mendatar (panjang) ------------------------------ */

export const CW = 18;
export const CH = 16;
export const X0 = 64;
export const SATUAN = "kotak";

/** Kotak satuan berjajar rapat: `n` kotak mulai dari garis awal `x0`, tinggi pojok `y`; id `${s}{i}`. */
export const satuanH = (s: string, y: number, n: number, warna: string, x0 = X0, o: Opsi = {}, cw = CW): Obj[] =>
  Array.from({ length: n }, (_, i) => kotak(`${s}${i}`, x0 + i * cw, y, cw, CH, warna, W.biru, { rx: 1, tebal: 1.3, ...o }));

/** Pusat kotak ke-i pada batang mendatar. */
export const pusatH = (y: number, n: number, x0 = X0, cw = CW): Titik[] => Array.from({ length: n }, (_, i) => ({ x: x0 + i * cw + cw / 2, y: y + CH / 2 }));

/** Nama batang di kiri, rata kiri; id `${s}-nm`. */
export const namaH = (s: string, y: number, isi: string, warna: string = W.biru): Obj => teks(`${s}-nm`, 4, y + CH / 2 + 3, isi, 8.4, warna, { anchor: "start" });

/** Tulisan panjang di kanan ujung batang; id `${s}-ln`. */
export const panjangH = (s: string, y: number, n: number, isi: string, x0 = X0, cw = CW): Obj => teks(`${s}-ln`, x0 + n * cw + 6, y + CH / 2 + 3, isi, 9, W.merah, { anchor: "start" });

/** Benda tunggal (pita, stik, tali) sepanjang `n` kotak, mulai dari garis awal; id `${s}-b`. */
export const bendaH = (s: string, y: number, n: number, warna: string, x0 = X0, o: Opsi = {}): Obj => kotak(`${s}-b`, x0, y, n * CW, CH, warna, W.biru, { rx: 3, tebal: 1.5, ...o });

/** Garis awal menegak, id `ga`, dari y1 sampai y2; tulisan `ga-t` di atasnya. */
export const garisAwal = (y1: number, y2: number, x0 = X0): Obj[] => [garis("ga", x0, y1, 0, y2 - y1, W.merah, 2, { putus: true }), teks("ga-t", x0, y1 - 4, "garis awal", 8.4, W.merah)];

/** Garis putus penanda ujung (menegak) di x, dari y1 sampai y2. */
export const garisUjung = (id: string, x: number, y1: number, y2: number, warna: string = W.hijau): Obj => garis(id, x, y1, 0, y2 - y1, warna, 1.8, { putus: true });

/* ------------------------------ Batang menegak (tinggi) ------------------------------ */

export const CVW = 22;
export const CVH = 14;
export const GD = 172;

/** Tumpukan `n` kotak dari tanah ke atas, titik tengah x `xc`; id `${s}{i}` (i = 0 paling bawah). */
export const satuanV = (s: string, xc: number, n: number, warna: string, o: Opsi = {}): Obj[] =>
  Array.from({ length: n }, (_, i) => kotak(`${s}${i}`, xc - CVW / 2, GD - (i + 1) * CVH, CVW, CVH, warna, W.biru, { rx: 1, tebal: 1.3, ...o }));

/** Pusat kotak ke-i pada tumpukan. */
export const pusatV = (xc: number, n: number): Titik[] => Array.from({ length: n }, (_, i) => ({ x: xc, y: GD - (i + 1) * CVH + CVH / 2 }));

/** Tanah: garis mendatar `gd` dan tulisan `gd-t`. */
export const tanah = (label = true): Obj[] => [garis("gd", 10, GD, 280, 0, W.coklat, 2.4), ...(label ? [teks("gd-t", 276, GD + 14, "tanah", 8.4, W.coklat)] : [])];

/** Nama di bawah tanah; id `${s}-nm`. */
export const namaV = (s: string, xc: number, isi: string): Obj => teks(`${s}-nm`, xc, GD + 16, isi, 8.4, W.biru);

/** Tulisan tinggi di atas tumpukan; id `${s}-ln`. */
export const tinggiV = (s: string, xc: number, n: number, isi: string, naik = 20): Obj => teks(`${s}-ln`, xc, GD - n * CVH - naik, isi, 9, W.merah);

/** Gambar hiasan (pohon, kupu-kupu) di atas tumpukan; id `${s}-e`. */
export const hiasanV = (s: string, xc: number, n: number, e: string): Obj => emo(`${s}-e`, xc, GD - n * CVH - 3, e, 18);

/** Garis putus mendatar penanda ujung atas pada tinggi `n` kotak; id `id`. */
export const garisTinggi = (id: string, x1: number, x2: number, n: number, warna: string = W.hijau): Obj => garis(id, x1, GD - n * CVH, x2 - x1, 0, warna, 1.8, { putus: true });
