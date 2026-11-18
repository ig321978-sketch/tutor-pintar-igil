/**
 * Tata letak adegan dan pengenal ucapan Kelas 2 Bab 5 Sub-Bab B (tanpa React, diuji di Node: scripts/uji-bibit-k2b5b.mjs).
 * Kanvas adegan 300 x 200. Kata yang diucapkan ("setengah", "bukan", "sama") dan bilangan dikenali dengan ragam ucapan.
 */
import type { Kunci } from "./logika-cpa";

export const LEBAR_ADEGAN = 300;
export const TINGGI_ADEGAN = 200;
export type Titik = { x: number; y: number };
const r1 = (n: number): number => Number(n.toFixed(1));

/** Letak `n` benda dalam kotak (x0, y0, lebar w, tinggi h): paling banyak `maks` kolom, baris menyusul. Mengembalikan titik pusat dan ukuran benda. */
export function tataGrid(n: number, x0: number, y0: number, w: number, h: number, maks = 5): { titik: Titik[]; s: number } {
  const kolom = Math.max(1, Math.min(maks, n));
  const baris = Math.max(1, Math.ceil(n / kolom));
  const s = r1(Math.min(w / kolom, h / baris, 26));
  const kiri = x0 + (w - s * kolom) / 2;
  const atas = y0 + (h - s * baris) / 2;
  return {
    titik: Array.from({ length: n }, (_, i) => ({ x: r1(kiri + s * (i % kolom) + s / 2), y: r1(atas + s * Math.floor(i / kolom) + s / 2) })),
    s,
  };
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
const POLA_KATA: [string, RegExp][] = [
  ["setengah", /\b(setengah|separuh|separo|setengahnya|seperdua)\b/],
  ["bukan", /\b(bukan|tidak|enggak|nggak|salah)\b/],
  ["sama", /\b(sama|seimbang|cocok|sama banyak)\b/],
];
const normal = (teks: string): string =>
  teks
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/** Semua kata kunci yang terdengar dalam ucapan (urut daftar, tanpa kembar). */
export function kataDariUcapan(teks: string): string[] {
  const t = normal(teks);
  return POLA_KATA.filter(([, p]) => p.test(t)).map(([n]) => n);
}
const ANGKA: Record<string, number> = { nol: 0, satu: 1, dua: 2, tiga: 3, empat: 4, ampat: 4, lima: 5, enam: 6, tujuh: 7, tuju: 7, delapan: 8, lapan: 8, sembilan: 9, semilan: 9, sepuluh: 10 };
/** Semua bilangan nol sampai sepuluh yang terdengar (kata atau angka), urut kemunculan, tanpa kembar. */
export function angkaDariUcapan(teks: string): number[] {
  const hasil: number[] = [];
  for (const w of normal(teks).split(" ")) {
    const n = /^\d{1,2}$/.test(w) ? Number(w) : ANGKA[w];
    if (n !== undefined && !hasil.includes(n)) hasil.push(n);
  }
  return hasil;
}
/**
 * Apakah ucapan cocok dengan kunci? Kunci kata: kata itu terdengar (dan, untuk "setengah" atau "sama", kata "bukan" tidak ikut terdengar).
 * Kunci angka: bilangan itu terdengar. `terdengar`: apa yang dikenali (untuk pesan "Terdengar ...").
 */
export function cocokUcapan(teks: string, kunci: Kunci): { cocok: boolean; terdengar: string[] } {
  if (kunci.jenis === "angka") {
    const angka = angkaDariUcapan(teks);
    return { cocok: angka.includes(kunci.n), terdengar: angka.map(String) };
  }
  const dengar = kataDariUcapan(teks);
  const cocok = kunci.kata === "bukan" ? dengar.includes("bukan") : dengar.includes(kunci.kata) && !dengar.includes("bukan");
  return { cocok, terdengar: dengar.length > 0 ? dengar : angkaDariUcapan(teks).map(String) };
}
