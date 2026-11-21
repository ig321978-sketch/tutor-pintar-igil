/**
 * Pengenal ucapan Kelas 5 Bab 2 Sub-Bab A (tanpa React, diuji di Node: scripts/uji-lonceng-k5b2a.mjs).
 * Kata jawaban (kelipatan, bukan, sisa, jumlah, diwarnai, kosong, dicoret) dikenali dengan ragam ucapan. Bilangan 0 sampai 9 dikenali dari kata atau dari angka yang ditulis mesin pengenal ("5").
 * "bukan kelipatan" hanya dihitung sebagai "bukan"; kata yang didahului "tidak" (selain "bukan") tidak dihitung.
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
  ["kelipatan", /\b(kelipatan|ke lipatan|kelipat an|kelipatannya)\b/],
  ["bukan", /\b(bukan|(tidak|nggak|enggak|gak|tak) kelipatan)\b/],
  ["sisa", /\b(sisa|sisanya|bersisa)\b/],
  ["jumlah", /\b(jumlah|jumlahnya)\b/],
  ["diwarnai", /\b(diwarnai|di warnai|berwarna|warna)\b/],
  ["kosong", /\b(kosong|kosongan|bolong)\b/],
  ["dicoret", /\b(dicoret|di coret|coret)\b/],
];
const NAMA_KATA = POLA_KATA.filter(([n]) => n !== "bukan" && n !== "kelipatan").map(([n]) => n).join("|");

/** Semua kata jawaban yang terdengar dalam ucapan (urut daftar, tanpa kembar). "bukan" menggantikan "kelipatan" yang mengikutinya. */
export function kataDariUcapan(teks: string): string[] {
  const t0 = normal(teks).replace(new RegExp(`\\b(tidak|nggak|enggak|gak|tak) (${NAMA_KATA})\\b`, "g"), " ");
  const bukan = POLA_KATA[1][1].test(t0);
  const t1 = t0.replace(/\b(tidak|nggak|enggak|gak|tak) kelipatan\b/g, "bukan");
  const t = bukan ? t1.replace(/\bkelipatan\w*\b/g, " ") : t1;
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
