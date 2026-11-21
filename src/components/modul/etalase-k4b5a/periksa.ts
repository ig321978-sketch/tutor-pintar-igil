/**
 * Pengenal ucapan Kelas 4 Bab 5 Sub-Bab A (tanpa React, diuji di Node: scripts/uji-etalase-k4b5a.mjs).
 * Kata jawaban (nama segi banyak, nama segiempat, beraturan, sejajar, tumpul, dan lain-lain) dikenali dengan ragam ucapan. Bilangan 0 sampai 9 dikenali dari kata atau dari angka yang ditulis mesin pengenal ("5").
 * Kata yang didahului "tidak" atau "bukan" tidak dihitung.
 */
import type { Kunci } from "./logika-cpa";

const normal = (teks: string): string =>
  teks
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/** Kata jawaban yang dikenali beserta ragam ucapannya. "persegi" tidak dihitung bila diikuti "panjang". */
export const POLA_KATA: [string, RegExp][] = [
  ["persegi", /\bpersegi\b(?! panjang)/],
  ["persegi panjang", /\bpersegi panjang\b/],
  ["jajargenjang", /\b(jajargenjang|jajar genjang)\b/],
  ["belah ketupat", /\b(belah ketupat|belahketupat|ketupat)\b/],
  ["layang-layang", /\b(layang layang|layanglayang|layang)\b/],
  ["trapesium", /\b(trapesium|trapezium)\b/],
  ["segitiga", /\b(segitiga|segi tiga)\b/],
  ["segiempat", /\b(segiempat|segi empat)\b/],
  ["segilima", /\b(segilima|segi lima)\b/],
  ["segienam", /\b(segienam|segi enam)\b/],
  ["beraturan", /\b(beraturan|ber aturan)\b/],
  ["sejajar", /\b(sejajar|se jajar)\b/],
  ["tumpul", /\btumpul\b/],
  ["lancip", /\blancip\b/],
  ["siku-siku", /\bsiku( siku)?\b/],
  ["sama sisi", /\bsama sisi\b/],
  ["sama kaki", /\bsama kaki\b/],
  ["sembarang", /\bsembarang\b/],
];
const NAMA_KATA = POLA_KATA.map(([n]) => n).join("|");

/** Semua kata jawaban yang terdengar dalam ucapan (urut daftar, tanpa kembar). Kata yang didahului "tidak" atau "bukan" tidak dihitung. */
export function kataDariUcapan(teks: string): string[] {
  const t = normal(teks).replace(new RegExp(`\\b(tidak|bukan|nggak|enggak|gak|tak) (${NAMA_KATA.replace(/ /g, " ")})\\b`, "g"), " ");
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
