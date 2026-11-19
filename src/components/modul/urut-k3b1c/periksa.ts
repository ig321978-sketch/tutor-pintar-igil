/**
 * Pengenal ucapan Kelas 3 Bab 1 Sub-Bab C (tanpa React, diuji di Node: scripts/uji-urut-k3b1c.mjs).
 * Kata atau bilangan yang diucapkan dikenali dengan ragam ucapan ("lebih", "kurang", "sama", "ratusan", "naik", "kiri", "empat", ...).
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
    .replace(/\blebih\s+(kecil|sedikit|rendah)\b/g, " kurang ")
    .replace(/\blebih\s+besar\b/g, " lebih ")
    .replace(/\bdua\s*belas\b/g, " duabelas ")
    .replace(/\bse\s*belas\b/g, " sebelas ")
    .replace(/\bse\s*puluh\b/g, " sepuluh ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/** Kata pada tiap kelompok pertentangan; hanya kelompok kunci yang diperiksa agar ucapan "naik atau turun" tidak dianggap benar. */
const KELOMPOK: Nama[][] = [["lebih", "kurang", "sama"], ["ratusan", "puluhan", "satuan"], ["naik", "turun"], ["kiri", "kanan"]];
const POLA_NAMA: [Nama, RegExp][] = [
  ["lebih", /\b(lebih|lebi|leb|besar|terbesar)\b/],
  ["kurang", /\b(kurang|kurangg|kurank|kecil|terkecil)\b/],
  ["sama", /\b(sama|samaa|sami)\b/],
  ["ratusan", /\b(ratusan|ratusann|ratus)\b/],
  ["puluhan", /\b(puluhan|puluhann|puluh)\b/],
  ["satuan", /\b(satuan|satuann|satuwan)\b/],
  ["naik", /\b(naik|naikk|menaik)\b/],
  ["turun", /\b(turun|turunn|menurun)\b/],
  ["kiri", /\b(kiri|kirii)\b/],
  ["kanan", /\b(kanan|kanann)\b/],
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
 * (mis. "naik" tetapi bukan "naik atau turun"). Kunci angka: bilangan itu terdengar. Kunci kartu tidak diucapkan.
 */
export function cocokUcapan(teks: string, kunci: Kunci): { cocok: boolean; terdengar: string[] } {
  if (kunci.jenis === "kartu") return { cocok: false, terdengar: [] };
  if (kunci.jenis === "angka") {
    const angka = angkaDariUcapan(teks);
    return { cocok: angka.includes(kunci.n), terdengar: angka.map(String) };
  }
  const nama = namaDariUcapan(teks);
  const kel = KELOMPOK.find((g) => g.includes(kunci.nama)) ?? [];
  const dalam = nama.filter((n) => kel.includes(n));
  return { cocok: dalam.length === 1 && dalam[0] === kunci.nama, terdengar: nama };
}
