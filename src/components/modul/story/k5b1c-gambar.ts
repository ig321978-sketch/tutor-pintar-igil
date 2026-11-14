import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 1 Sub-Bab C (komposisi dan dekomposisi): lembar dan keping uang, tabel nilai tempat lima kolom,
 * dan tabel cara. Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
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
  coklat: "#92400E",
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  jingga: "#FDBA74",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  pink: "#FBCFE8",
  oranye: "#EA580C",
  pinkTua: "#DB2777",
  tosca: "#0D9488",
  lembarP: "#C4B5FD",
  lembarR: "#86EFAC",
  keping: "#E2E8F0",
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.4, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 8.6, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Id kartu (kotak dan teks) untuk dihapus. */
export const idKartu = (id: string, n = 1): string[] => [`${id}-k`, ...Array.from({ length: n }, (_, i) => `${id}-t${i}`)];

const bulat1 = (v: number): number => Math.round(v * 10) / 10;

/** Tulis bilangan dengan titik ribuan, seperti di buku (38600 menjadi 38.600). */
export const rb = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* ------------------------------ Uang ------------------------------ */

/** Jenis uang: p = sepuluh ribuan (lembar), r = seribuan (lembar), s = seratusan (keping). */
export type JenisUang = "p" | "r" | "s";
export const NILAI_UANG: Record<JenisUang, number> = { p: 10000, r: 1000, s: 100 };
export const WARNA_UANG: Record<JenisUang, string> = { p: W.lembarP, r: W.lembarR, s: W.keping };
export const UKURAN_UANG = { lebar: 16, tinggi: 8, jari: 4.4 };

/**
 * Satu lembar atau keping uang dengan titik acuan kiri-atas (x, y): lembar berupa kotak 16 x 8, keping berupa lingkaran berjari-jari 4,4
 * yang berpusat di tengah kotak 16 x 8 yang sama agar semua jenis sejajar.
 */
export function satuUang(id: string, x: number, y: number, jenis: JenisUang, o: Opsi = {}): Obj {
  if (jenis === "s") return bulat(id, bulat1(x + UKURAN_UANG.lebar / 2), bulat1(y + UKURAN_UANG.tinggi / 2), UKURAN_UANG.jari, WARNA_UANG.s, W.biru, { tebal: 1.1, ...o });
  return kotak(id, x, y, UKURAN_UANG.lebar, UKURAN_UANG.tinggi, WARNA_UANG[jenis], W.biru, { rx: 1.5, tebal: 1.1, ...o });
}

/** Baris n uang sejenis, jarak antar-uang `jarak`, mulai (x, y). Id `${id}-0` dst. */
export const barisUang = (id: string, x: number, y: number, n: number, jenis: JenisUang, jarak = 19): Obj[] => Array.from({ length: n }, (_, i) => satuUang(`${id}-${i}`, bulat1(x + i * jarak), y, jenis));

/** Id semua uang sebuah baris, untuk dihapus. */
export const idUang = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}-${i}`);

/* ------------------------------ Tabel nilai tempat ------------------------------ */

export const KOLOM = ["Puluh Ribuan", "Ribuan", "Ratusan", "Puluhan", "Satuan"];
export const NILAI_KOLOM = [10000, 1000, 100, 10, 1];

export type Grid = { x: number; y: number; labelW: number; colW: number; rowH: number; headH: number };

/** Bingkai tabel: kepala kolom biru (lima kolom nilai tempat), kolom label baris di kiri (bila labelW lebih dari nol), dan sel berwarna krem. */
export function bingkai(id: string, g: Grid, baris: number, label: string[] = [], u = 6.4): Obj[] {
  const out: Obj[] = [];
  KOLOM.forEach((nama, j) => {
    out.push(kotak(`${id}-h${j}`, bulat1(g.x + g.labelW + j * g.colW), g.y, g.colW, g.headH, W.biru, W.biru, { rx: 0, tebal: 1 }));
    out.push(teks(`${id}-ht${j}`, bulat1(g.x + g.labelW + j * g.colW + g.colW / 2), bulat1(g.y + g.headH / 2 + u * 0.35), nama, u, W.putih));
  });
  for (let i = 0; i < baris; i += 1) {
    if (g.labelW > 0) {
      out.push(kotak(`${id}-l${i}`, g.x, bulat1(g.y + g.headH + i * g.rowH), g.labelW, g.rowH, W.langit, W.biru, { rx: 0, tebal: 1 }));
      out.push(teks(`${id}-lt${i}`, bulat1(g.x + g.labelW / 2), bulat1(g.y + g.headH + i * g.rowH + g.rowH / 2 + 3), label[i] ?? "", 8, W.biru));
    }
    for (let j = 0; j < 5; j += 1) out.push(kotak(`${id}-c${i}-${j}`, bulat1(g.x + g.labelW + j * g.colW), bulat1(g.y + g.headH + i * g.rowH), g.colW, g.rowH, W.krem, W.biru, { rx: 0, tebal: 1 }));
  }
  return out;
}

export const xSel = (g: Grid, j: number): number => bulat1(g.x + g.labelW + j * g.colW + g.colW / 2);
export const ySel = (g: Grid, i: number): number => bulat1(g.y + g.headH + i * g.rowH + g.rowH / 2);

/** Isi sel baris i, kolom j: teks di tengah sel. Id `${id}-v${i}-${j}`. */
export const isiSel = (id: string, g: Grid, i: number, j: number, isi: string, u = 9, warna: string = W.biru): Obj => teks(`${id}-v${i}-${j}`, xSel(g, j), bulat1(ySel(g, i) + u * 0.35), isi, u, warna);
