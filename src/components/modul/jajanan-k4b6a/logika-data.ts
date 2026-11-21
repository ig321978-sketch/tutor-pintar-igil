/**
 * Logika murni piktogram Kelas 4 Bab 6 Sub-Bab A "Piktogram Jajanan Bu Rini": data, keterangan (banyak yang diwakili satu ikon), banyak ikon,
 * paling banyak dan paling sedikit, selisih, jumlah, dan tata letak ikon pada papan. Tanpa React dan tanpa jaringan; diuji di Node: scripts/uji-jajanan-k4b6a.mjs.
 * Gambar piktogram DIGAMBAR dari data lewat tataPik: banyak ikon sama dengan banyak data dibagi keterangan (data harus habis dibagi, tanpa ikon setengah).
 */

/** Satu baris piktogram: nama, ikon (emoji lama untuk Concrete), dan banyak data. */
export type Seri = { nama: string; ikon: string; banyak: number };
/** Satu piktogram: judul papan, satuan, keterangan (satu ikon sama dengan `skala` satuan), dan barisnya. */
export type Pik = { judul: string; satuan: string; skala: number; seri: Seri[] };

/** Keterangan yang dipakai bab ini. */
export const SKALA_SAH: readonly number[] = [1, 2, 5, 10];
/** Paling banyak ikon pada satu baris supaya muat di 344 px. */
export const MAKS_IKON = 8;

/* Ikon jajanan, minuman, dan lain-lain: emoji lama (paling tinggi U+1FA95, tanpa ZWJ). */
export const IKON = {
  sate: "\u{1F362}",
  siomay: "\u{1F95F}",
  cilok: "\u{1F361}",
  donat: "\u{1F369}",
  sosis: "\u{1F32D}",
  jagung: "\u{1F33D}",
  jeruk: "\u{1F34A}",
  melon: "\u{1F348}",
  mangga: "\u{1F96D}",
  semangka: "\u{1F349}",
  orang: "\u{1F464}",
  tiket: "\u{1F3AB}",
  balon: "\u{1F388}",
} as const;

export const pik = (judul: string, satuan: string, skala: number, seri: [string, string, number][]): Pik => ({
  judul,
  satuan,
  skala,
  seri: seri.map(([nama, ikon, banyak]) => ({ nama, ikon, banyak })),
});

export const habisDibagi = (p: Pik): boolean => p.seri.every((s) => s.banyak > 0 && s.banyak % p.skala === 0);
export const banyakIkon = (p: Pik, i: number): number => p.seri[i].banyak / p.skala;
export const jumlahIkon = (p: Pik): number => p.seri.reduce((t, _, i) => t + banyakIkon(p, i), 0);
export const jumlahData = (p: Pik): number => p.seri.reduce((t, s) => t + s.banyak, 0);
/** Banyak data berbeda tiap baris? (perlu supaya satu baris dapat disebut lewat banyak datanya) */
export const dataUnik = (p: Pik): boolean => new Set(p.seri.map((s) => s.banyak)).size === p.seri.length;

/** Indeks baris dengan ikon paling banyak, atau -1 bila tidak tepat satu. */
export function indeksMaks(p: Pik): number {
  const m = Math.max(...p.seri.map((s) => s.banyak));
  const c = p.seri.map((s, i) => (s.banyak === m ? i : -1)).filter((i) => i >= 0);
  return c.length === 1 ? c[0] : -1;
}
export function indeksMin(p: Pik): number {
  const m = Math.min(...p.seri.map((s) => s.banyak));
  const c = p.seri.map((s, i) => (s.banyak === m ? i : -1)).filter((i) => i >= 0);
  return c.length === 1 ? c[0] : -1;
}
export const selisihIkon = (p: Pik, a: number, b: number): number => Math.abs(banyakIkon(p, a) - banyakIkon(p, b));
export const selisihData = (p: Pik, a: number, b: number): number => Math.abs(p.seri[a].banyak - p.seri[b].banyak);

/** Keterangan terbesar (satu, dua, lima, sepuluh) yang membuat semua data habis dibagi. */
export function skalaTerbesar(data: number[]): number {
  return [...SKALA_SAH].reverse().find((s) => data.every((d) => d % s === 0)) ?? 1;
}
/** Nama baris yang punya tepat n ikon, atau "" bila tidak tepat satu. */
export function namaDenganIkon(p: Pik, n: number): string {
  const c = p.seri.filter((_, i) => banyakIkon(p, i) === n);
  return c.length === 1 ? c[0].nama : "";
}

/* ------------------------------ Tata letak papan (kanvas 300 lebar) ------------------------------ */
export const TATA = { xNama: 8, xIkon: 82, sel: 25, baris: 26, ukuran: 20, atas: 26, lebar: 300 } as const;
export type Pt = { x: number; y: number };
export type BarisTata = { nama: string; ikon: number; y: number; sel: Pt[] };
export type TataPik = { baris: BarisTata[]; legendaY: number; tinggi: number };

/** Titik tengah tiap ikon, sungguh sebanyak banyak data dibagi keterangan. */
export function tataPik(p: Pik): TataPik {
  const baris = p.seri.map((s, r): BarisTata => {
    const n = s.banyak / p.skala;
    const y = TATA.atas + r * TATA.baris + TATA.baris / 2;
    return { nama: s.nama, ikon: n, y, sel: Array.from({ length: n }, (_, i) => ({ x: TATA.xIkon + i * TATA.sel + TATA.sel / 2, y })) };
  });
  const legendaY = TATA.atas + p.seri.length * TATA.baris + 6;
  return { baris, legendaY, tinggi: legendaY + 30 };
}

/** Teks keterangan: "1 ikon = 10 porsi". */
export const teksKeterangan = (p: Pik): string => `1 ikon = ${p.skala} ${p.satuan}`;
