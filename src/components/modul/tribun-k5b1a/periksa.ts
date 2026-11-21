/**
 * Pengenal ucapan Kelas 5 Bab 1 Sub-Bab A (tanpa React, diuji di Node: scripts/uji-tribun-k5b1a.mjs).
 * Kata jawaban (nama kolom tempat dan kata penghubung periode) dikenali dengan ragam ucapan. Bilangan 0 sampai 9 dikenali dari kata atau dari angka yang ditulis mesin pengenal ("5").
 * Kata yang didahului "tidak" atau "bukan" tidak dihitung. "ribuan" tidak dikenali di dalam "puluh ribuan", dan "ribu", "ratus", "puluh" tidak dikenali di dalam "ribuan", "ratusan", "puluhan".
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
  ["satuan", /\b(satuan|sa tuan|satu an)\b/],
  ["puluhan", /\b(puluhan|puluh an|pulu han)\b/],
  ["ratusan", /\b(ratusan|ratus an|ra tusan)\b/],
  ["ribuan", /(?<!puluh )\b(ribuan|ribu an|ri buan)\b/],
  ["puluh ribuan", /\b(puluh ribuan|puluh ribu an|puluhribuan|pulu ribuan)\b/],
  ["ribu", /\b(ribu|ri bu)\b/],
  ["ratus", /\b(ratus|ra tus)\b/],
  ["puluh", /\b(puluh|pulu)\b/],
];
const NAMA_KATA = POLA_KATA.map(([n]) => n).join("|");

/** Semua kata jawaban yang terdengar dalam ucapan (urut daftar, tanpa kembar). Kata yang didahului "tidak" atau "bukan" tidak dihitung. */
export function kataDariUcapan(teks: string): string[] {
  const t = normal(teks).replace(new RegExp(`\\b(tidak|bukan|nggak|enggak|gak|tak) (${NAMA_KATA})\\b`, "g"), " ");
  // "puluh ribuan" dikenali utuh; "puluh" dan "ribuan" di dalamnya tidak ikut dihitung.
  const utuh = POLA_KATA[4][1].test(t);
  return POLA_KATA.filter(([n, p]) => p.test(t) && !(utuh && (n === "puluh" || n === "ribuan"))).map(([n]) => n);
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
