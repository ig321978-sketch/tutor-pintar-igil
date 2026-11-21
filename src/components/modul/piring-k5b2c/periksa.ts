/**
 * Pengenal ucapan Kelas 5 Bab 2 Sub-Bab C (tanpa React, diuji di Node: scripts/uji-piring-k5b2c.mjs).
 * Jawaban suara berupa satu bilangan satu angka (satu sampai sembilan): dikenali dari kata ("enam") atau dari angka yang ditulis mesin pengenal ("6").
 */
import type { Kunci } from "./logika-cpa";

const normal = (teks: string): string =>
  teks
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

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
  const t = normal(teks);
  return { cocok: t === normal(kunci.nama), terdengar: t ? [t] : [] };
}
