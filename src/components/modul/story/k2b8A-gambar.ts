import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 2 Bab 8 Sub-Bab A (Diagram Turus).
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Kesepakatan id (dipakai uji hitung ulang dari struktur adegan, bukan dari kata):
 * - BENDA `b-${nama}-${i}` (i dari 1; benda bergambar emoji, boleh bertebaran atau berbaris), `st-${nama}-${i}` (jawaban yang muncul satu per satu).
 *   Baris benda: nama jenis `bl-${nama}`, banyaknya `bn-${nama}` (harus sama dengan banyak benda jenis itu).
 * - DIAGRAM TURUS `dt` (satu per adegan): baris r (dari 0): kotak `dt-b${r}`, nama jenis `dt-l${r}`, garis turus ke-i (i dari 0) `dt-g${r}-${i}`,
 *   banyaknya `dt-n${r}` (kolom banyak), angka ikat lima ke-g `dt-k${r}-${g}` (isi 5 x (g + 1)); judul kolom `dt-h0`, `dt-h1`, `dt-h2`.
 *   Garis ke-i: tegak bila i mod 5 kurang dari 4; garis kelima (i mod 5 sama dengan 4) miring memotong empat garis tegak, membentuk satu ikat lima.
 * - Kartu pilihan `c1..c3` (`c${i}-k`, `c${i}-t`), pertanyaan `tanya`.
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

/** Kartu pilihan jawaban: pojok kiri-atas (x, y); id `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, isi: string, warna: string = W.krem, w = 40, h = 36, u = 22, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.6, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, isi, u, W.merah, o),
];

/* ------------------------------ Anak (tokoh tetap) ------------------------------ */
export const NAMA_ANAK: Record<string, string> = { malosi: "Malosi", kira: "Kira", upe: "Upe", wei: "Wei", halim: "Halim", igil: "Igil" };
export const WARNA_ANAK: Record<string, string> = { malosi: "#FCA5A5", kira: "#FDE68A", upe: "#BBF7D0", wei: "#BFDBFE", halim: "#DDD6FE", igil: "#FBCFE8" };
/** Anak berupa kepala bulat berpusat di (cx, cy), badan, dan nama. Id `an-${slug}`, `an-${slug}-bd`, `an-${slug}-lb`. */
export function anak(slug: string, cx: number, cy: number): Obj[] {
  return [
    bulat(`an-${slug}`, cx, cy, 11, WARNA_ANAK[slug], W.biru, { tebal: 1.8 }),
    kotak(`an-${slug}-bd`, cx - 10, cy + 12, 20, 18, WARNA_ANAK[slug], W.biru, { rx: 6, tebal: 1.6 }),
    teks(`an-${slug}-lb`, cx, cy + 43, NAMA_ANAK[slug], 9, W.biru),
  ];
}
export const idAnak = (slug: string): string[] => [`an-${slug}`, `an-${slug}-bd`, `an-${slug}-lb`];

/* ------------------------------ Benda bergambar ------------------------------ */

/** Gambar tiap jenis benda (emoji paling tinggi Emoji 12). */
export const EMO: Record<string, string> = {
  anggur: "\u{1F347}",
  jeruk: "\u{1F34A}",
  apel: "\u{1F34E}",
  pisang: "\u{1F34C}",
  ayam: "\u{1F414}",
  kambing: "\u{1F410}",
  sapi: "\u{1F404}",
  bebek: "\u{1F986}",
  "mobil-mobilan": "\u{1F697}",
  boneka: "\u{1F9F8}",
  kelereng: "\u{1F535}",
  balok: "\u{1F9F1}",
  brokoli: "\u{1F966}",
  bayam: "\u{1F96C}",
  wortel: "\u{1F955}",
  jagung: "\u{1F33D}",
  mawar: "\u{1F339}",
  lili: "\u{1F33A}",
  tulip: "\u{1F337}",
  aster: "\u{1F33C}",
  kucing: "\u{1F431}",
  kelinci: "\u{1F430}",
  burung: "\u{1F426}",
};

export type Jenis = { nama: string; n: number };

/** Satu benda ke-i (dari 1) jenis `nama` di titik (x, y) = garis dasar tulisan. */
export const benda = (nama: string, i: number, x: number, y: number, u = 14, awalan = "b"): Obj => emo(`${awalan}-${nama}-${i}`, x, y, EMO[nama], u);

/** Benda-benda berbagai jenis bertebaran rapi di lapangan 6 kolom (urutan bergilir antarjenis supaya bercampur). */
const JIT = [-5, 3, 6, -3, 4, -6, 2, -2];
export function sebar(jenis: Jenis[], x0 = 66, y0 = 62, dx = 40, dy = 34): Obj[] {
  const sisa = jenis.map((j) => ({ ...j, ke: 0 }));
  const urut: { nama: string; i: number }[] = [];
  while (sisa.some((s) => s.ke < s.n)) for (const s of sisa) if (s.ke < s.n) urut.push({ nama: s.nama, i: ++s.ke });
  return urut.map((b, q) => benda(b.nama, b.i, x0 + (q % 6) * dx + JIT[(q * 3) % 8], y0 + Math.floor(q / 6) * dy + JIT[(q * 5 + 1) % 8] * 0.8));
}
export const idBenda = (jenis: Jenis[], awalan = "b"): string[] => jenis.flatMap((j) => Array.from({ length: j.n }, (_, i) => `${awalan}-${j.nama}-${i + 1}`));

/** Garis dasar baris benda r (dari 0). */
export const yBenda = (r: number): number => 62 + r * 34;
/** Benda-benda satu jenis berbaris pada baris r, dari benda ke-`dari` sampai ke-`sampai`. */
export const barisBenda = (nama: string, r: number, dari: number, sampai: number): Obj[] => Array.from({ length: Math.max(0, sampai - dari + 1) }, (_, q) => benda(nama, dari + q, 72 + (dari + q - 1) * 15, yBenda(r), 13));
export const namaBenda = (nama: string, r: number): Obj => teks(`bl-${nama}`, 6, yBenda(r) - 3, nama, 8.6, W.biru, { anchor: "start" });
export const banyakBenda = (nama: string, r: number, n: number): Obj => teks(`bn-${nama}`, 284, yBenda(r) - 1, String(n), 13, W.merah);

/* ------------------------------ Diagram turus ------------------------------ */

export type BarisDt = { nama: string; n: number };
export type OpsiDt = { y0?: number; rh?: number; sh?: number; kepala?: [string, string, string] };

/** Pembuat diagram turus: `baris` berisi jenis dan banyaknya; semua posisi dihitung dari sini. */
export function buatDt(baris: BarisDt[], o: OpsiDt = {}) {
  const jum = baris.length;
  const y0 = o.y0 ?? 46;
  const rh = o.rh ?? Math.min(40, Math.floor(140 / jum));
  const sh = o.sh ?? Math.min(20, rh - 9);
  const sp = sh * 0.4;
  const gw = sp * 5;
  const XT = 92;
  const kepalaDt = o.kepala ?? ["jenis", "turus", "banyak"];
  const pusat = (r: number) => y0 + r * rh + rh / 2;
  const dasar = (r: number) => pusat(r) + sh / 2;
  const gx = (g: number) => XT + g * gw;
  const ikatPenuh = (n: number) => Math.floor(n / 5);

  const garisKe = (r: number, i: number): Obj => {
    const g = Math.floor(i / 5);
    const s = i % 5;
    if (s < 4) return garis(`dt-g${r}-${i}`, gx(g) + s * sp, dasar(r) - sh, 0, sh, W.biru, 2.6);
    return garis(`dt-g${r}-${i}`, gx(g) - sp / 2, dasar(r) - 3, 4 * sp, -(sh - 6), W.merah, 2.4);
  };
  const turus = (r: number, dari: number, sampai: number): Obj[] => Array.from({ length: Math.max(0, sampai - dari) }, (_, q) => garisKe(r, dari + q));
  const ikat = (r: number, g: number): Obj[] => turus(r, g * 5, Math.min(g * 5 + 5, baris[r].n));
  const semua = (r: number): Obj[] => turus(r, 0, baris[r].n);
  const kerangkaBaris = (r: number): Obj[] => [kotak(`dt-b${r}`, 8, y0 + r * rh + 1.5, 284, rh - 3, W.putih, W.abu, { rx: 4, tebal: 1 }), teks(`dt-l${r}`, 14, pusat(r) + 3, baris[r].nama, 9.4, W.biru, { anchor: "start" })];
  const kepalaObj = (): Obj[] =>
    [teks("dt-h0", 14, y0 - 5, kepalaDt[0], 8.5, W.ungu, { anchor: "start" }), teks("dt-h1", 150, y0 - 5, kepalaDt[1], 8.5, W.ungu), teks("dt-h2", 272, y0 - 5, kepalaDt[2], 8.5, W.ungu)].filter((t) => t.isi);
  const banyak = (r: number, isi: string = String(baris[r].n)): Obj => teks(`dt-n${r}`, 272, pusat(r) + 5, isi, 14, W.merah);
  const labelIkat = (r: number, g: number): Obj => teks(`dt-k${r}-${g}`, gx(g) + 1.75 * sp, dasar(r) - sh - 3, String(5 * (g + 1)), 8.5, W.ungu);
  const idTurus = (r: number): string[] => semua(r).map((s) => s.id);
  const idBaris = (r: number): string[] => [`dt-b${r}`, `dt-l${r}`, ...idTurus(r), `dt-n${r}`, ...Array.from({ length: ikatPenuh(baris[r].n) }, (_, g) => `dt-k${r}-${g}`)];
  const idKepala = ["dt-h0", "dt-h1", "dt-h2"].slice(0, kepalaObj().length);
  const idSemua = (): string[] => [...idKepala, ...baris.flatMap((_, r) => idBaris(r))];
  /** Kerangka semua baris dan semua turus, tanpa kolom banyak. */
  const lengkap = (): Obj[] => [...kepalaObj(), ...baris.flatMap((_, r) => [...kerangkaBaris(r), ...semua(r)])];
  const sorot = (...r: number[]): string[] => r.map((q) => `dt-b${q}`);
  return { baris, kerangkaBaris, kepala: kepalaObj, garisKe, turus, ikat, semua, banyak, labelIkat, idTurus, idBaris, idSemua, idKepala, lengkap, sorot };
}
export type Dt = ReturnType<typeof buatDt>;

/* ------------------------------ Data sub-bab ------------------------------ */
export const BUAH: Jenis[] = [
  { nama: "anggur", n: 2 },
  { nama: "jeruk", n: 6 },
  { nama: "apel", n: 4 },
  { nama: "pisang", n: 3 },
];
export const HEWAN: Jenis[] = [
  { nama: "ayam", n: 10 },
  { nama: "kambing", n: 8 },
  { nama: "sapi", n: 6 },
  { nama: "bebek", n: 11 },
];
export const MAINAN: Jenis[] = [
  { nama: "mobil-mobilan", n: 2 },
  { nama: "boneka", n: 4 },
  { nama: "kelereng", n: 6 },
  { nama: "balok", n: 7 },
];
export const SAYUR: Jenis[] = [
  { nama: "brokoli", n: 7 },
  { nama: "bayam", n: 4 },
  { nama: "wortel", n: 6 },
  { nama: "jagung", n: 3 },
];
export const BUNGA: Jenis[] = [
  { nama: "mawar", n: 7 },
  { nama: "lili", n: 4 },
  { nama: "tulip", n: 5 },
  { nama: "aster", n: 4 },
];
