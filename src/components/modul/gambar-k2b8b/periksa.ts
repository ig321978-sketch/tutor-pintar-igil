/**
 * Pengenal ucapan Kelas 2 Bab 8 Sub-Bab B (tanpa React, diuji di Node: scripts/uji-gambar-k2b8b.mjs).
 * Kata atau bilangan yang diucapkan dikenali dengan ragam ucapan ("banyak", "sedikit", "lebih", "kurang", "sama", "bintang", "hati", "kiri", "tujuh", ...).
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

/** Kata pada tiap kelompok pertentangan; hanya kelompok kunci yang diperiksa agar ucapan "banyak atau sedikit" tidak dianggap benar. */
const KELOMPOK: Nama[][] = [["banyak", "sedikit"], ["lebih", "kurang", "sama"], ["bintang", "lingkaran", "hati", "wajah"], ["kiri", "kanan"], ["judul", "keterangan"]];
const POLA_NAMA: [Nama, RegExp][] = [
  ["banyak", /\b(banyak|banyakk|terbanyak)\b/],
  ["sedikit", /\b(sedikit|sedikitt|sedikid|terkecil)\b/],
  ["lebih", /\b(lebih|lebi|leb)\b/],
  ["kurang", /\b(kurang|kurangg|kurank)\b/],
  ["sama", /\b(sama|samaa|sami)\b/],
  ["bintang", /\b(bintang|bintan|bintangg)\b/],
  ["lingkaran", /\b(lingkaran|lingkarann|lingkar|bulat)\b/],
  ["hati", /\b(hati|hatii|love|cinta)\b/],
  ["wajah", /\b(wajah|wajahh|muka|senyum|tersenyum)\b/],
  ["kiri", /\b(kiri|kirii)\b/],
  ["kanan", /\b(kanan|kanann)\b/],
  ["judul", /\b(judul|judulnya|tajuk)\b/],
  ["keterangan", /\b(keterangan|ketarangan|keterangannya)\b/],
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
 * (mis. "besar" tetapi bukan "besar atau kecil"). Kunci angka: bilangan itu terdengar.
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
