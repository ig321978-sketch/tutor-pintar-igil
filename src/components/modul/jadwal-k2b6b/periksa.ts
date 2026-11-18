/**
 * Pengenal ucapan Kelas 2 Bab 6 Sub-Bab B (tanpa React, diuji di Node: scripts/uji-jadwal-k2b6b.mjs).
 * Kata atau bilangan yang diucapkan dikenali dengan ragam ucapan ("pagi", "lebih lama", "sebentar", "dua belas", "tujuh", ...).
 */
import type { Kunci, Nama } from "./logika-cpa";

export const LEBAR_ADEGAN = 300;
export const TINGGI_ADEGAN = 200;

/* ------------------------------ Pengenal ucapan ------------------------------ */
const normal = (teks: string): string =>
  teks
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\bdua\s*belas\b/g, " duabelas ")
    .replace(/\bse\s*belas\b/g, " sebelas ")
    .replace(/\bse\s*puluh\b/g, " sepuluh ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/** Kata pada tiap kelompok pertentangan; hanya kelompok kunci yang diperiksa agar ucapan "pagi atau sore" tidak dianggap benar. */
const KELOMPOK: Nama[][] = [["pagi", "siang", "sore", "malam"], ["lama", "sebentar"], ["awal", "akhir"], ["jam", "menit"]];
const POLA_NAMA: [Nama, RegExp][] = [
  ["pagi", /\b(pagi|pagi hari|pagi pagi|pagiii)\b/],
  ["siang", /\b(siang|siang hari|siangg)\b/],
  ["sore", /\b(sore|sore hari|soree|sori)\b/],
  ["malam", /\b(malam|malem|malam hari|malamm)\b/],
  ["lama", /\b(lama|lamanya|lamaa|lebih lama)\b/],
  ["sebentar", /\b(sebentar|sebentarnya|sebentaran|bentar|singkat)\b/],
  ["awal", /\b(awal|awalnya|duluan|lebih awal|dahulu)\b/],
  ["akhir", /\b(akhir|akhirnya|lebih akhir|terakhir|belakangan)\b/],
  ["jam", /\b(jam|jem|jamnya)\b/],
  ["menit", /\b(menit|menet|minit|menitnya)\b/],
];

/** Semua nama yang terdengar dalam ucapan (urut daftar, tanpa kembar). */
export function namaDariUcapan(teks: string): Nama[] {
  const t = normal(teks);
  return POLA_NAMA.filter(([, p]) => p.test(t)).map(([n]) => n);
}
const ANGKA: Record<string, number> = {
  nol: 0,
  satu: 1,
  dua: 2,
  tiga: 3,
  empat: 4,
  ampat: 4,
  lima: 5,
  enam: 6,
  tujuh: 7,
  tuju: 7,
  delapan: 8,
  lapan: 8,
  sembilan: 9,
  sepuluh: 10,
  sebelas: 11,
  duabelas: 12,
};
/** Semua bilangan nol sampai dua belas yang terdengar (kata atau angka), urut kemunculan, tanpa kembar. */
export function angkaDariUcapan(teks: string): number[] {
  const hasil: number[] = [];
  for (const w of normal(teks).split(" ")) {
    const n = /^\d{1,2}$/.test(w) ? Number(w) : ANGKA[w];
    if (n !== undefined && !hasil.includes(n)) hasil.push(n);
  }
  return hasil;
}
/**
 * Apakah ucapan cocok dengan kunci? Kunci kata: kata itu terdengar dan tidak ada kata lain dari kelompok yang sama
 * (mis. "pagi" tetapi bukan "pagi atau sore"). Kunci angka: bilangan itu terdengar.
 */
export function cocokUcapan(teks: string, kunci: Kunci): { cocok: boolean; terdengar: string[] } {
  if (kunci.jenis === "angka") {
    const angka = angkaDariUcapan(teks);
    return { cocok: angka.includes(kunci.n), terdengar: angka.map(String) };
  }
  const nama = namaDariUcapan(teks);
  const kel = KELOMPOK.find((g) => g.includes(kunci.nama)) ?? [];
  const dalam = nama.filter((n) => kel.includes(n));
  return { cocok: dalam.length === 1 && dalam[0] === kunci.nama, terdengar: nama };
}
