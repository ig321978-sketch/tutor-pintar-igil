/**
 * Tata letak adegan dan pengenal ucapan Kelas 2 Bab 5 Sub-Bab C (tanpa React, diuji di Node: scripts/uji-panen-k2b5c.mjs).
 * Kanvas adegan 300 x 200. Kata atau bilangan yang diucapkan dikenali dengan ragam ucapan ("seperempat", "satu per empat", "tidak sama besar", "dua", ...).
 */
import type { Kunci, Nama } from "./logika-cpa";

export const LEBAR_ADEGAN = 300;
export const TINGGI_ADEGAN = 200;
export type Titik = { x: number; y: number };
const r1 = (n: number): number => Number(n.toFixed(1));

/** Pusat dan jari-jari (atau setengah sisi) `n` bangun berderet di kanvas: satu baris, rata tengah. */
export function tataBangun(n: number): { r: number; pusat: Titik[] } {
  const r = Math.min(40, Math.floor(130 / n) - 4);
  const lebar = 300 / n;
  return { r, pusat: Array.from({ length: n }, (_, i) => ({ x: r1(lebar * (i + 0.5)), y: 104 })) };
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
const normal = (teks: string): string =>
  teks
    .toLowerCase()
    .replace(/1\s*\/\s*4|¼/g, " seperempat ")
    .replace(/1\s*\/\s*2|½/g, " setengah ")
    .replace(/\bse\s*per\s*empat\b/g, " seperempat ")
    .replace(/\bsatu\s*per\s*empat\b/g, " seperempat ")
    .replace(/\bsatu\s*per\s*dua\b/g, " setengah ")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const POLA_NAMA: [Nama, RegExp][] = [
  ["setengah", /\b(setengah|setengahnya|setengan|stengah|separuh|separoh)\b/],
  ["seperempat", /\b(seperempat|seperempatnya|sperempat|seperampat|seperempet|perempat)\b/],
  ["utuh", /\b(utuh|utuhnya|seluruh|seluruhnya)\b/],
  ["sama besar", /\b(sama|samabesar)\b/],
  ["bukan", /\b(bukan|bukannya|tidak|nggak|enggak|ngga)\b/],
];

/** Semua nama yang terdengar dalam ucapan (urut daftar, tanpa kembar). Bila ada kata "bukan", "sama besar" tidak dihitung ("tidak sama besar" berarti bukan). */
export function namaDariUcapan(teks: string): Nama[] {
  const t = normal(teks);
  const semua = POLA_NAMA.filter(([, p]) => p.test(t)).map(([n]) => n);
  return semua.includes("bukan") ? semua.filter((n) => n !== "sama besar") : semua;
}
const ANGKA: Record<string, number> = { nol: 0, satu: 1, dua: 2, tiga: 3, empat: 4, ampat: 4, lima: 5, enam: 6, tujuh: 7, tuju: 7, delapan: 8, lapan: 8, sembilan: 9 };
/** Semua bilangan nol sampai sembilan yang terdengar (kata atau angka), urut kemunculan, tanpa kembar. */
export function angkaDariUcapan(teks: string): number[] {
  const hasil: number[] = [];
  for (const w of normal(teks).split(" ")) {
    const n = /^\d$/.test(w) ? Number(w) : ANGKA[w];
    if (n !== undefined && !hasil.includes(n)) hasil.push(n);
  }
  return hasil;
}
/** Apakah ucapan cocok dengan kunci? Kunci kata: kata itu terdengar (dan bila bukan "bukan", tidak ada kata "bukan"). Kunci angka: bilangan itu terdengar. */
export function cocokUcapan(teks: string, kunci: Kunci): { cocok: boolean; terdengar: string[] } {
  if (kunci.jenis === "angka") {
    const angka = angkaDariUcapan(teks);
    return { cocok: angka.includes(kunci.n), terdengar: angka.map(String) };
  }
  const nama = namaDariUcapan(teks);
  const cocok = nama.includes(kunci.nama) && (kunci.nama === "bukan" || !nama.includes("bukan"));
  return { cocok, terdengar: nama };
}
