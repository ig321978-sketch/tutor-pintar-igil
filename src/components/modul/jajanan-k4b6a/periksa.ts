/**
 * Pengenal ucapan Kelas 4 Bab 6 Sub-Bab A (tanpa React, diuji di Node: scripts/uji-jajanan-k4b6a.mjs).
 * Kata jawaban (nama jajanan, minuman, hari, jenis tiket, dan warna balon) dikenali dengan ragam ucapan. Bilangan 0 sampai 9 dikenali dari kata atau dari angka yang ditulis mesin pengenal ("5").
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

/** Kata jawaban yang dikenali beserta ragam ucapannya. */
export const POLA_KATA: [string, RegExp][] = [
  ["sate", /\b(sate|satai|satay|sat e)\b/],
  ["siomay", /\b(siomay|siomai|shumai|sio may)\b/],
  ["cilok", /\b(cilok|ci lok)\b/],
  ["donat", /\b(donat|donut|do nat)\b/],
  ["sosis", /\b(sosis|so sis)\b/],
  ["jagung", /\b(jagung|ja gung)\b/],
  ["jeruk", /\b(jeruk|je ruk)\b/],
  ["melon", /\b(melon|me lon)\b/],
  ["mangga", /\b(mangga|mangga|mangg a)\b/],
  ["semangka", /\b(semangka|se mangka|semongka)\b/],
  ["jumat", /\b(jumat|jum at|jumaat|jumad)\b/],
  ["sabtu", /\b(sabtu|sab tu)\b/],
  ["minggu", /\b(minggu|ming gu)\b/],
  ["anak", /\b(anak|a nak)\b/],
  ["dewasa", /\b(dewasa|de wasa)\b/],
  ["pelajar", /\b(pelajar|pe lajar)\b/],
  ["merah", /\b(merah|me rah)\b/],
  ["biru", /\b(biru|bi ru)\b/],
  ["kuning", /\b(kuning|ku ning)\b/],
  ["hijau", /\b(hijau|hi jau)\b/],
];
const NAMA_KATA = POLA_KATA.map(([n]) => n).join("|");

/** Semua kata jawaban yang terdengar dalam ucapan (urut daftar, tanpa kembar). Kata yang didahului "tidak" atau "bukan" tidak dihitung. */
export function kataDariUcapan(teks: string): string[] {
  const t = normal(teks).replace(new RegExp(`\\b(tidak|bukan|nggak|enggak|gak|tak) (${NAMA_KATA})\\b`, "g"), " ");
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
