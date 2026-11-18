/**
 * Pengenal ucapan Kelas 2 Bab 5 Sub-Bab A (tanpa React, diuji di Node: scripts/uji-semangka-k2b5a.mjs).
 * Kata jawaban yang diucapkan dikenali dengan ragam ucapan ("setengah", "separuh", "bukan setengah", "sama", "tidak sama", "dua", ...).
 */
import type { Kunci, KataJ } from "./logika-cpa";

const normal = (teks: string): string =>
  teks
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const NEGASI = /\b(bukan|bukannya|nggak|enggak|engga|tidak|tak|gak)\b/;
const POLA: [KataJ, RegExp][] = [
  ["setengah", /\b(setengah|setengahnya|stengah|separuh|separo|1 2)\b/],
  ["bukan", /\b(bukan|bukannya|bukan setengah)\b/],
  ["dua", /\b(dua|duo|2)\b/],
  ["tiga", /\b(tiga|tigo|3)\b/],
  ["empat", /\b(empat|ampat|4)\b/],
  ["sama", /\b(sama|samaan)\b/],
  ["beda", /\b(beda|bedanya|berbeda)\b/],
];

/** Semua kata jawaban yang terdengar dalam ucapan (urut daftar, tanpa kembar). "bukan setengah" hanya dihitung bukan; "tidak sama" hanya dihitung beda. */
export function kataDariUcapan(teks: string): KataJ[] {
  const t = normal(teks);
  const hasil = POLA.filter(([, p]) => p.test(t)).map(([n]) => n);
  const ada = (n: KataJ) => hasil.includes(n);
  const ingkar = NEGASI.test(t);
  if (ada("setengah") && ingkar) hasil.splice(hasil.indexOf("setengah"), 1);
  if (ingkar && /\b(tidak|tak|nggak|enggak|gak|engga) sama\b/.test(t)) {
    if (ada("sama")) hasil.splice(hasil.indexOf("sama"), 1);
    if (!hasil.includes("beda")) hasil.push("beda");
  }
  if (ingkar && !hasil.includes("bukan") && /\b(tidak|tak|nggak|enggak|gak|engga)\b/.test(t) && !/\bsama\b/.test(t)) hasil.push("bukan");
  return hasil;
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
/** Apakah ucapan cocok dengan kunci? `terdengar`: apa yang dikenali (untuk pesan "Terdengar ..."). */
export function cocokUcapan(teks: string, kunci: Kunci): { cocok: boolean; terdengar: string[] } {
  if (kunci.jenis === "angka") {
    const angka = angkaDariUcapan(teks);
    return { cocok: angka.includes(kunci.n), terdengar: angka.map(String) };
  }
  const kata = kataDariUcapan(teks);
  return { cocok: kata.includes(kunci.nama), terdengar: kata };
}
