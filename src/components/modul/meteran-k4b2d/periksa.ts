/**
 * Pengenal ucapan Kelas 4 Bab 2 Sub-Bab D (tanpa React, diuji di Node: scripts/uji-meteran-k4b2d.mjs).
 * Kata jawaban (persepuluhan, perseratusan, sama, berbeda) dikenali dengan ragam ucapan. Bilangan satu angka (1 sampai 9) dikenali dari kata
 * ("tiga") atau dari angka yang ditulis mesin pengenal ("3"). Kata yang didahului "tidak" atau "bukan" tidak dihitung.
 */
import type { Kunci } from "./logika-cpa";

const normal = (teks: string): string =>
  teks
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/** Kata jawaban yang dikenali beserta ragam ucapannya. */
export const POLA_KATA: [string, RegExp][] = [
  ["persepuluhan", /\b(persepuluhan|per sepuluhan|per sepuluh an|persepuluh an|persepuluh|per sepuluh|sepuluhan)\b/],
  ["perseratusan", /\b(perseratusan|per seratusan|per seratus an|perseratus an|perseratus|per seratus|seratusan)\b/],
  ["sama", /\b(sama|samaa|sam a)\b/],
  ["berbeda", /\b(berbeda|beda|bedaa|ber beda)\b/],
];
const NAMA_KATA = ["persepuluhan", "perseratusan", "persepuluh", "perseratus", "sama", "berbeda", "beda"].join("|");

/** Semua kata jawaban yang terdengar dalam ucapan (urut daftar, tanpa kembar). Kata yang didahului "tidak" atau "bukan" tidak dihitung. */
export function kataDariUcapan(teks: string): string[] {
  const t = normal(teks).replace(new RegExp(`\\b(tidak|bukan|nggak|enggak|gak|tak) (${NAMA_KATA})\\b`, "g"), " ");
  return POLA_KATA.filter(([, p]) => p.test(t)).map(([n]) => n);
}

const SATU: Record<string, number> = { nol: 0, satu: 1, dua: 2, tiga: 3, empat: 4, ampat: 4, lima: 5, enam: 6, tujuh: 7, tuju: 7, delapan: 8, lapan: 8, sembilan: 9 };

/** Semua bilangan 0 sampai 9 yang terdengar (kata atau angka satu digit), urut kemunculan, tanpa kembar. */
export function angkaDariUcapan(teks: string): number[] {
  const t = normal(teks).split(" ").filter(Boolean);
  const hasil: number[] = [];
  for (const w of t) {
    const n = /^\d$/.test(w) ? Number(w) : SATU[w];
    if (n !== undefined && !hasil.includes(n)) hasil.push(n);
  }
  return hasil;
}

/** Apakah ucapan cocok dengan jawaban benar? `terdengar`: apa yang dikenali (untuk pesan "Terdengar ..."). */
export function cocokUcapan(teks: string, kunci: Kunci): { cocok: boolean; terdengar: string[] } {
  if (kunci.jenis === "angka") {
    const angka = angkaDariUcapan(teks);
    return { cocok: angka.includes(kunci.n), terdengar: angka.map(String) };
  }
  const kata = kataDariUcapan(teks);
  return { cocok: kata.includes(kunci.nama), terdengar: kata };
}
