/**
 * Pengenal ucapan K4 Bab 1 Sub-Bab C (tanpa React, diuji di Node: scripts/uji-dermaga-k4b1c.mjs).
 * Kata jawaban (kurang dari, lebih dari, sama dengan, ribuan, ratusan, puluhan, satuan, kiri, kanan, terkecil, terbesar) dikenali dengan ragam ucapan.
 * "terkecil" dan "terbesar" dikenali juga dari "paling kecil" dan "paling besar"; kata yang didahului "tidak" atau "bukan" tidak dihitung.
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
  ["kurang dari", /\b(kurang dari|kurang|lebih kecil|lebih sedikit|lebih rendah)\b/],
  ["lebih dari", /\b(lebih dari|lebih besar|lebih banyak|lebih tinggi)\b/],
  ["sama dengan", /\b(sama dengan|sama|samaa)\b/],
  ["ribuan", /\b(ribuan|ribu|ribuwan)\b/],
  ["ratusan", /\b(ratusan|ratus|ratusaan)\b/],
  ["puluhan", /\b(puluhan|puluh|puluan)\b/],
  ["satuan", /\b(satuan|satu an|satuaan)\b/],
  ["kiri", /\b(kiri|kirii)\b/],
  ["kanan", /\b(kanan|kananan|kanann)\b/],
  ["terkecil", /\b(terkecil|ter kecil|terkecel|paling kecil|yang kecil|kecil)\b/],
  ["terbesar", /\b(terbesar|ter besar|terbesaar|paling besar|yang besar|besar)\b/],
];
const NAMA_KATA = ["kurang dari", "lebih dari", "sama dengan", "sama", "ribuan", "ratusan", "puluhan", "satuan", "kiri", "kanan", "terkecil", "terbesar", "paling kecil", "paling besar", "kecil", "besar"].join("|");

/** Semua kata jawaban yang terdengar dalam ucapan (urut daftar, tanpa kembar). Kata yang didahului "tidak" atau "bukan" tidak dihitung. */
export function kataDariUcapan(teks: string): string[] {
  const t = normal(teks).replace(new RegExp(`\\b(tidak|bukan|nggak|enggak|gak|tak) (${NAMA_KATA})\\b`, "g"), " ");
  return POLA_KATA.filter(([, p]) => p.test(t)).map(([n]) => n);
}

/** Apakah ucapan cocok dengan jawaban benar? `terdengar`: apa yang dikenali (untuk pesan "Terdengar ..."). Semua jawaban suara bab ini berupa kata. */
export function cocokUcapan(teks: string, kunci: Kunci): { cocok: boolean; terdengar: string[] } {
  if (kunci.jenis === "angka") return { cocok: false, terdengar: [] };
  const kata = kataDariUcapan(teks);
  return { cocok: kata.includes(kunci.nama), terdengar: kata };
}
