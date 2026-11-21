/**
 * Pengenal ucapan Kelas 5 Bab 3 Sub-Bab A (tanpa React, diuji di Node: scripts/uji-timbang-k5b3a.mjs).
 * Kata jawaban (besar, kecil, sama, kiri, kanan, tengah, berubah, tetap, hilang) dikenali dengan ragam ucapan. Bilangan 0 sampai 9 dikenali dari kata atau dari angka yang ditulis mesin pengenal ("5").
 * "lebih besar" dihitung sebagai "besar", "sama besar" sebagai "sama"; kata yang didahului "tidak" dibuang supaya "tidak besar" tidak dihitung sebagai "besar".
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
  ["besar", /\b(besar|lebih besar|terbesar|gede)\b/],
  ["kecil", /\b(kecil|lebih kecil|terkecil|mungil)\b/],
  ["sama", /\b(sama|samanya|setara)\b/],
  ["kiri", /\b(kiri|sebelah kiri)\b/],
  ["kanan", /\b(kanan|sebelah kanan)\b/],
  ["tengah", /\b(tengah|tengah tengah)\b/],
  ["berubah", /\b(berubah|ubah|beda|berbeda)\b/],
  ["tetap", /\b(tetap|tidak berubah|sama saja)\b/],
  ["hilang", /\b(hilang|lenyap)\b/],
];
const NAMA_KATA = POLA_KATA.map(([n]) => n).join("|");

/** Semua kata jawaban yang terdengar dalam ucapan (urut daftar, tanpa kembar). */
export function kataDariUcapan(teks: string): string[] {
  let t = normal(teks);
  // "tidak berubah" dan "sama saja" berarti tetap; "sama besar" berarti sama.
  t = t.replace(/\b(tidak|nggak|enggak|gak|tak) berubah\b/g, " tetap ").replace(/\bsama saja\b/g, " tetap ").replace(/\bsama besar\b/g, " sama ");
  t = t.replace(new RegExp(`\\b(tidak|nggak|enggak|gak|tak|bukan) (${NAMA_KATA})\\b`, "g"), " ");
  return POLA_KATA.filter(([, p]) => p.test(t)).map(([n]) => n);
}

const SATU: Record<string, number> = { nol: 0, satu: 1, dua: 2, tiga: 3, empat: 4, ampat: 4, lima: 5, enam: 6, tujuh: 7, tuju: 7, delapan: 8, lapan: 8, sembilan: 9 };

/** Semua bilangan 0 sampai 9 yang terdengar (kata atau angka), urut kemunculan, tanpa kembar. */
export function angkaDariUcapan(teks: string): number[] {
  const hasil: number[] = [];
  for (const w of normal(teks).split(" ").filter(Boolean)) {
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
