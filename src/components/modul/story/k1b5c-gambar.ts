import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 1 Bab 5 Sub-Bab C (nilai tempat puluhan dan satuan): kelereng, kantong, sedotan, ikatan, balok, menara, kubus, titik, dan bingkai sepuluh.
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
  /** Warna benda hitung: kelereng biru, sedotan oranye, balok merah muda, kubus hijau, titik ungu muda. */
  kelereng: "#60A5FA",
  sedotan: "#F59E0B",
  balok: "#F87171",
  kubus: "#34D399",
  titik: "#A78BFA",
  kantong: "#FDE68A",
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

/** Kartu angka besar: pojok kiri-atas (x, y); id `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, angka: string, warna: string = W.krem, w = 40, h = 36, u = 22, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.6, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, angka, u, W.merah, o),
];

/** Memindahkan kartu angka (dua benda `-k` dan `-t`) ke pojok kiri-atas baru (x, y). */
export const pindahKartuAngka = (id: string, x: number, y: number, w = 40, h = 36, u = 22): (Partial<Obj> & { id: string })[] => [
  { id: `${id}-k`, x, y },
  { id: `${id}-t`, x: x + w / 2, y: y + h / 2 + u * 0.35 },
];

/* ------------------------------ Benda hitung ------------------------------ */

/** Kelereng: bulat berpusat di (x, y). */
export const kelereng = (id: string, x: number, y: number, warna: string = W.kelereng, o: Opsi = {}): Obj => bulat(id, x, y, 7, warna, W.biru, { tebal: 1.2, ...o });
/** Titik kecil di layar, berpusat di (x, y). */
export const titik = (id: string, x: number, y: number, warna: string = W.titik, o: Opsi = {}): Obj => bulat(id, x, y, 5, warna, W.biru, { tebal: 1, ...o });
/** Titik besar yang pas di dalam satu kotak bingkai sepuluh. */
export const titikBingkai = (id: string, x: number, y: number, warna: string = W.titik, o: Opsi = {}): Obj => bulat(id, x, y, 8, warna, W.biru, { tebal: 1.2, ...o });
/** Sedotan atau lidi: garis tegak setinggi 30 dari (x, y). */
export const sedotan = (id: string, x: number, y: number, warna: string = W.sedotan, o: Opsi = {}): Obj => garis(id, x, y, 0, 30, warna, 3.6, o);
/** Balok mainan: persegi panjang 24 x 11, pojok kiri-atas (x, y). */
export const balok = (id: string, x: number, y: number, warna: string = W.balok, o: Opsi = {}): Obj => kotak(id, x, y, 24, 11, warna, W.biru, { rx: 1.5, tebal: 1.2, ...o });
/** Kubus satuan kecil 12 x 12, pojok kiri-atas (x, y). */
export const kubus = (id: string, x: number, y: number, warna: string = W.kubus, o: Opsi = {}): Obj => kotak(id, x, y, 12, 12, warna, W.biru, { rx: 1.5, tebal: 1.2, ...o });
/** Pita pengikat. */
export const pita = (id: string, x: number, y: number, w: number, o: Opsi = {}): Obj => kotak(id, x, y, w, 8, W.merah, W.biru, { rx: 2, tebal: 1, z: 1, ...o });
/** Kantong: kotak bulat di belakang benda (z kecil). */
export const kantong = (id: string, x: number, y: number, w: number, h: number, o: Opsi = {}): Obj => kotak(id, x, y, w, h, W.kantong, W.coklat, { rx: 14, tebal: 2, z: -1, ...o });

/** Pusat sel ke-`i` (0 sampai 9, urut baris) pada bingkai sepuluh berpojok (x0, y0): dua baris, lima kotak tiap baris, sel 22 x 22. */
export const pusatSel = (x0: number, y0: number, i: number): { x: number; y: number } => ({ x: x0 + 22 * (i % 5) + 11, y: y0 + 22 * Math.floor(i / 5) + 11 });

/** Bingkai sepuluh kosong: sepuluh kotak 22 x 22 (id `${id}0` sampai `${id}9`). */
export const bingkai = (id: string, x0: number, y0: number): Obj[] =>
  Array.from({ length: 10 }, (_, i) => kotak(`${id}${i}`, x0 + 22 * (i % 5), y0 + 22 * Math.floor(i / 5), 22, 22, W.putih, W.biru, { rx: 2, tebal: 1.4, z: -1 }));
