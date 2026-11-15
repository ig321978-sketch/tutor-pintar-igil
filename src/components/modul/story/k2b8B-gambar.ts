import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 2 Bab 8 Sub-Bab B (Diagram Gambar): diagram gambar mendatar (satu gambar = satu benda, baris dibaca dari kiri ke kanan,
 * semua gambar sama bentuk dan sama besar, judul di atas, keterangan di bawah) dan turus (empat garis tegak, garis kelima miring). Berkas ini TIDAK dipakai bab lain.
 *
 * Awalan `p` huruf kecil. Id yang dikenali uji (dihitung ulang dari gambar):
 *  diagram: gambar `${p}g{c}_{i}` (kategori c, gambar ke-i), nama baris `${p}l{c}`, angka banyak `${p}h{c}`, judul `${p}jd`, keterangan `${p}k` ("1 bintang = 1 buah");
 *  turus: goresan `${p}s{c}_{i}`, nama `${p}l{c}`, angka banyak `${p}h{c}`, judul `${p}jd`.
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
  jingga: "#F97316",
  biruGambar: "#2563EB",
};

export const OWL = "\u{1F989}";

type Opsi = Partial<Obj>;

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

/** Kartu pilihan: pojok kiri-atas (x, y); id `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, isi: string, warna: string = W.krem, w = 40, h = 36, u = 22, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.6, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, isi, u, W.merah, o),
];

/** Tiga kartu pilihan (id c1, c2, c3), pojok kiri-atas di tinggi `y`. Dua kartu bila hanya dua isi. */
export const pilihan = (y: number, isi: string[], u = 18): Obj[] => {
  const dua = isi.length === 2;
  return isi.flatMap((t, i) => kartuAngka(`c${i + 1}`, dua ? [20, 160][i] : [14, 107, 200][i], y, t, [W.hijauMuda, W.pink, W.langit][i], dua ? 120 : 86, 34, u));
};

/* ------------------------------ Data ------------------------------ */

/** Lambang gambar (satu karakter): bintang, lingkaran, hati, wajah tersenyum. */
export const BINTANG = "★";
export const BULAT = "●";
export const HATI = "♥";
export const WAJAH = "☺";
export const NAMA_LAMBANG: Record<string, string> = { [BINTANG]: "bintang", [BULAT]: "lingkaran", [HATI]: "hati", [WAJAH]: "wajah" };

/** Satu kategori data: nama baris, banyak, lambang gambar (sama untuk satu diagram), dan warna gambar. */
export type Kat = { nama: string; n: number; g: string; warna: string };

const kat = (nama: string, n: number, g: string, warna: string): Kat => ({ nama, n, g, warna });

/** Jumlah semua data. */
export const jumlah = (data: Kat[]): number => data.reduce((t, d) => t + d.n, 0);

export const BUAH: Kat[] = [kat("anggur", 2, BINTANG, W.biruGambar), kat("jeruk", 6, BINTANG, W.jingga), kat("apel", 4, BINTANG, W.merah), kat("pisang", 3, BINTANG, W.hijau)];
export const BUNGA: Kat[] = [kat("mawar", 7, HATI, W.merah), kat("lili", 4, HATI, W.ungu), kat("tulip", 5, HATI, W.jingga), kat("aster", 4, HATI, W.biruGambar)];
export const KUE: Kat[] = [kat("cucur", 6, BULAT, W.jingga), kat("onde-onde", 5, BULAT, W.hijau), kat("lemper", 3, BULAT, W.ungu), kat("talam", 7, BULAT, W.merah)];
export const PERMAINAN: Kat[] = [kat("karet", 4, WAJAH, W.merah), kat("lompat tali", 6, WAJAH, W.jingga), kat("petak umpet", 5, WAJAH, W.hijau), kat("benteng", 7, WAJAH, W.ungu)];
export const LARI: Kat[] = [kat("1 putaran", 5, BINTANG, W.jingga), kat("2 putaran", 3, BINTANG, W.hijau), kat("3 putaran", 4, BINTANG, W.biruGambar), kat("4 putaran", 2, BINTANG, W.merah)];
export const PARSEL: Kat[] = [kat("apel", 3, BINTANG, W.merah), kat("jeruk", 4, BINTANG, W.jingga), kat("mangga", 5, BINTANG, W.hijau), kat("pisang", 3, BINTANG, W.biruGambar)];

/** Gambar benda untuk adegan data tercampur: anggur, jeruk, apel, pisang. */
export const EMO_BUAH = ["\u{1F347}", "\u{1F34A}", "\u{1F34E}", "\u{1F34C}"];

/* ------------------------------ Diagram gambar mendatar ------------------------------ */

export const UG = 15;
export const ST = 17;
export const XS = 86;

export type Diagram = {
  p: string;
  data: Kat[];
  /** Judul dan keterangan (tanpa nama baris dan gambar). */
  dasar: Obj[];
  /** Judul diagram, id `${p}jd`. */
  jd: Obj;
  /** Keterangan di bawah diagram, id `${p}k`. */
  ket: Obj;
  label: (c: number) => Obj;
  gambar: (c: number) => Obj[];
  /** Satu gambar. */
  satu: (c: number, i: number) => Obj;
  /** Angka banyak gambar pada baris c, id `${p}h{c}`. */
  angka: (c: number) => Obj;
  /** Semua: dasar, nama, dan gambar. */
  semua: Obj[];
  /** Id semua gambar baris c. */
  idGambar: (c: number) => string[];
  /** Id semua gambar semua baris. */
  idSemua: string[];
  idLabel: string[];
  idAngka: string[];
};

export type OpsiDiagram = { y0?: number; rowH?: number; ketY?: number };

/**
 * Diagram gambar mendatar: tiap kategori satu baris, gambar berjajar rapat dari kiri ke kanan mulai x = 86, satu gambar mewakili satu benda.
 * Semua gambar dalam satu diagram sama bentuk dan sama besar.
 */
export function diagram(p: string, data: Kat[], isiJudul: string, satuan: string, o: OpsiDiagram = {}): Diagram {
  const y0 = o.y0 ?? 50;
  const rowH = o.rowH ?? 27;
  const bentuk = NAMA_LAMBANG[data[0].g];
  const barisY = (c: number): number => y0 + c * rowH;
  const jd = teks(`${p}jd`, 150, 22, isiJudul, 11, W.ungu);
  const ket = teks(`${p}k`, 150, o.ketY ?? 188, `1 ${bentuk} = 1 ${satuan}`, 9, W.coklat);
  const label = (c: number): Obj => teks(`${p}l${c}`, 6, barisY(c) + 4, data[c].nama, 8.6, W.biru, { anchor: "start" });
  const satu = (c: number, i: number): Obj => teks(`${p}g${c}_${i}`, XS + i * ST, barisY(c) + 5, data[c].g, UG, data[c].warna);
  const gambar = (c: number): Obj[] => Array.from({ length: data[c].n }, (_, i) => satu(c, i));
  const angka = (c: number): Obj => teks(`${p}h${c}`, XS + data[c].n * ST + 4, barisY(c) + 4, String(data[c].n), 9.6, W.merah);
  const idGambar = (c: number): string[] => Array.from({ length: data[c].n }, (_, i) => `${p}g${c}_${i}`);
  return {
    p,
    data,
    dasar: [jd, ket],
    jd,
    ket,
    label,
    gambar,
    satu,
    angka,
    semua: [jd, ket, ...data.flatMap((_, c) => [label(c), ...gambar(c)])],
    idGambar,
    idSemua: data.flatMap((_, c) => idGambar(c)),
    idLabel: data.map((_, c) => `${p}l${c}`),
    idAngka: data.map((_, c) => `${p}h${c}`),
  };
}

/* ------------------------------ Turus ------------------------------ */

export type Turus = {
  p: string;
  data: Kat[];
  jd: Obj;
  label: (c: number) => Obj;
  goresan: (c: number) => Obj[];
  angka: (c: number) => Obj;
  semua: Obj[];
};

/** Goresan ke-i pada baris c: empat tegak, goresan kelima miring menutup empat goresan tadi. */
export function goresanTurus(p: string, c: number, i: number, rowY: number): Obj {
  const g = Math.floor(i / 5);
  const j = i % 5;
  const xg = 86 + g * 32;
  if (j === 4) return garis(`${p}s${c}_${i}`, xg - 3, rowY + 7, 27, -14, W.merah, 2);
  return garis(`${p}s${c}_${i}`, xg + j * 6, rowY - 9, 0, 18, W.biru, 2);
}

export function turus(p: string, data: Kat[], isiJudul: string, o: { y0?: number; gap?: number } = {}): Turus {
  const y0 = o.y0 ?? 52;
  const gap = o.gap ?? 34;
  const rowY = (c: number): number => y0 + c * gap;
  const jd = teks(`${p}jd`, 150, 22, isiJudul, 11, W.ungu);
  const label = (c: number): Obj => teks(`${p}l${c}`, 6, rowY(c) + 4, data[c].nama, 9, W.biru, { anchor: "start" });
  const goresan = (c: number): Obj[] => Array.from({ length: data[c].n }, (_, i) => goresanTurus(p, c, i, rowY(c)));
  const angka = (c: number): Obj => teks(`${p}h${c}`, 86 + Math.ceil(data[c].n / 5) * 32 + 8, rowY(c) + 4, String(data[c].n), 10, W.merah);
  return { p, data, jd, label, goresan, angka, semua: [jd, ...data.flatMap((_, c) => [label(c), ...goresan(c), angka(c)])] };
}
