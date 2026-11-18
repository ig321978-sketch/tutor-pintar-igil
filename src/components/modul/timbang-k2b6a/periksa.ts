/**
 * Pengenal ucapan Kelas 2 Bab 6 Sub-Bab A (tanpa React, diuji di Node: scripts/uji-timbang-k2b6a.mjs).
 * Kata jawaban yang diucapkan dikenali dengan ragam ucapan ("berat", "lebih berat", "ringan", "sama", "sama berat", "bawah", "turun", "atas", "naik", "seimbang", ...).
 */
import type { Kunci, KataJ } from "./logika-cpa";

const normal = (teks: string): string =>
  teks
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const POLA: [KataJ, RegExp][] = [
  ["berat", /\b(berat|berar|lebih berat|berat banget)\b/],
  ["ringan", /\b(ringan|ringgan|enteng|lebih ringan)\b/],
  ["sama", /\b(sama|samaan|setara)\b/],
  ["bawah", /\b(bawah|turun|dibawah)\b/],
  ["atas", /\b(atas|naik|diatas)\b/],
  ["seimbang", /\b(seimbang|imbang|datar)\b/],
];

/**
 * Semua kata jawaban yang terdengar dalam ucapan (urut daftar, tanpa kembar). "sama berat" dan "sama ringan" hanya dihitung sama
 * (kata berat atau ringan di dalamnya bukan jawaban tersendiri). Kata yang didahului "tidak" atau "bukan" tidak dihitung.
 */
export function kataDariUcapan(teks: string): KataJ[] {
  const t = normal(teks).replace(/\b(tidak|bukan|nggak|enggak|gak|tak) (berat|ringan|sama|bawah|atas|seimbang|turun|naik|datar)\b/g, " ");
  const hasil = POLA.filter(([, p]) => p.test(t)).map(([n]) => n);
  if (hasil.includes("sama") && /\bsama (berat|ringan)\b/.test(t)) {
    return hasil.filter((n) => n !== "berat" && n !== "ringan");
  }
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
  // Kunci "lebih berat" dan kawannya dijawab dengan kata yang sama bentuknya (berat, ringan, sama).
  const nama = (kunci.nama === "lebih berat" ? "berat" : kunci.nama === "lebih ringan" ? "ringan" : kunci.nama === "sama berat" ? "sama" : kunci.nama) as KataJ;
  return { cocok: kata.includes(nama), terdengar: kata };
}
