import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 1 Bab 5 Sub-Bab D (membandingkan dan mengurutkan bilangan sampai dua puluh): benda berhitung, kartu angka, bingkai sepuluh ganda, dan garis bilangan.
 * Berkas ini TIDAK dipakai bab lain.
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

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/* ------------------------------ Benda berhitung ------------------------------ */

const WARNA_KELERENG = ["#38BDF8", "#F472B6", "#A3E635", "#FB923C", "#818CF8"];

export type Titik = { x: number; y: number };

/** Satu kelereng berpusat di (cx, cy), warna bergilir menurut `i`. */
export const kelereng = (id: string, cx: number, cy: number, r = 7, i = 0, o: Opsi = {}): Obj => bulat(id, cx, cy, r, WARNA_KELERENG[i % 5], W.biru, { tebal: 1.6, ...o });

/** Titik-titik sebaris: `n` titik mulai x = `x0` berjarak `dx`, tinggi `y`. */
export const baris = (n: number, y: number, x0: number, dx: number): Titik[] => Array.from({ length: n }, (_, i) => ({ x: x0 + i * dx, y }));

/** Titik-titik dua baris: baris atas `atas` titik, sisanya di baris bawah. */
export const dua = (n: number, atas: number, y1: number, y2: number, x0: number, dx: number): Titik[] => Array.from({ length: n }, (_, i) => ({ x: x0 + (i % atas) * dx, y: i < atas ? y1 : y2 }));

/** Kartu angka besar: pojok kiri-atas (x, y); id `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, angka: string, warna: string = W.krem, w = 40, h = 36, u = 22, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.6, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, angka, u, W.merah, o),
];

/* ------------------------------ Dua bingkai sepuluh ------------------------------ */

export const BX = [14, 156];
export const BY = 62;
export const SEL = 26;

/** Dua bingkai sepuluh kosong (kiri dan kanan, sel `sel`, pojok kiri-atas bingkai di x1 dan x2); sel `${id}-c0` sampai `${id}-c19`. */
export function bingkaiDua(id: string, y = BY, o: Opsi = {}, sel = SEL, x1 = BX[0], x2 = BX[1]): Obj[] {
  const out: Obj[] = [];
  for (let i = 0; i < 20; i += 1) {
    const x = i < 10 ? x1 : x2;
    const j = i % 10;
    out.push(kotak(`${id}-c${i}`, x + (j % 5) * sel, y + Math.floor(j / 5) * sel, sel, sel, W.putih, W.biru, { rx: 0, tebal: 1.3, ...o }));
  }
  return out;
}

/** Titik ke-i (0 sampai 19) pada dua bingkai sepuluh; bingkai kiri terisi penuh lebih dulu. */
export const petak = (i: number, y = BY, sel = SEL, x1 = BX[0], x2 = BX[1]): Titik => ({ x: (i < 10 ? x1 : x2) + ((i % 10) % 5) * sel + sel / 2, y: y + Math.floor((i % 10) / 5) * sel + sel / 2 });

/** Titik berwarna pada petak ke-i. */
export const titikPetak = (id: string, i: number, y = BY, warna: string = W.merah, sel = SEL, x1 = BX[0], x2 = BX[1]): Obj => {
  const p = petak(i, y, sel, x1, x2);
  return bulat(id, p.x, p.y, sel * 0.32, warna, warna, { tebal: 1 });
};

/* ------------------------------ Garis bilangan ------------------------------ */

/** Pusat sel bilangan v pada garis bilangan sepuluh sampai dua puluh. */
export const xGaris = (v: number): number => 30 + 24 * (v - 10);

/** Garis bilangan: sel `${id}k{v}` dan angka `${id}t{v}` untuk v dari `dari` sampai `sampai`, sel setinggi 24 pada `y`. */
export function garisBilangan(id: string, y: number, dari = 10, sampai = 20, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  for (let v = dari; v <= sampai; v += 1) out.push(kotak(`${id}k${v}`, xGaris(v) - 12, y, 24, 24, v % 2 ? W.krem : W.langit, W.biru, { rx: 0, tebal: 1.3, ...o }), teks(`${id}t${v}`, xGaris(v), y + 16.5, String(v), 10.5, W.biru, o));
  return out;
}

/* ------------------------------ Batang banding ------------------------------ */

/** Batang mendatar setinggi `h` dengan panjang 12 tiap bilangan (`n`), pojok kiri-atas (x, y). */
export const batang = (id: string, x: number, y: number, n: number, warna: string, h = 18, o: Opsi = {}): Obj => kotak(id, x, y, n * 12, h, warna, W.biru, { rx: 3, tebal: 1.4, ...o });
