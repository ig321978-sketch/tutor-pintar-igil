/**
 * Pengenal ucapan Kelas 2 Bab 8 Sub-Bab A (tanpa React, diuji di Node: scripts/uji-turus-k2b8a.mjs).
 * Kata jawaban (turus, bundel, lebih, kurang, sama, dan nama jenis benda) dikenali dengan ragam ucapan. Bilangan sampai seratus dikenali dari kata (satuan, belasan, puluhan,
 * "sepuluh", "seratus") atau dari angka yang ditulis mesin pengenal ("5").
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
  ["turus", /\b(turus|tu rus|turu s|turuz|turos)\b/],
  ["bundel", /\b(bundel|bundelan|bundle|bandel|bun del|bundil)\b/],
  ["lebih", /\b(lebih|lebi|lebih banyak)\b/],
  ["kurang", /\b(kurang|kurangg|kurank|kurang banyak)\b/],
  ["sama", /\b(sama|samaa|sama banyak)\b/],
  ["gitar", /\b(gitar|guitar|gitaar|gitah)\b/],
  ["biola", /\b(biola|viola|biolla|bi ola)\b/],
  ["terompet", /\b(terompet|trompet|trumpet|te rompet|terompett)\b/],
  ["drum", /\b(drum|derum|dram|drom|drums)\b/],
  ["tiket", /\b(tiket|ticket|tiket|tikett|tike)\b/],
  ["bintang", /\b(bintang|bintan|bin tang|bintanh)\b/],
  ["saksofon", /\b(saksofon|saxophone|saksofon|sakso fon|saksopon|sax)\b/],
  ["piano", /\b(piano|pianno|pi ano|pyano)\b/],
  ["lampu", /\b(lampu|lamp|lampuu|lam pu)\b/],
];
const NAMA_KATA = POLA_KATA.map(([n]) => n).join("|");

/**
 * Semua kata jawaban yang terdengar dalam ucapan (urut daftar, tanpa kembar). Kata yang didahului "tidak" atau "bukan" tidak dihitung.
 */
export function kataDariUcapan(teks: string): string[] {
  const t = normal(teks).replace(new RegExp(`\\b(tidak|bukan|nggak|enggak|gak|tak) (${NAMA_KATA}|banyak)\\b`, "g"), " ");
  return POLA_KATA.filter(([, p]) => p.test(t)).map(([n]) => n);
}

const ANGKA: Record<string, number> = { nol: 0, satu: 1, dua: 2, tiga: 3, empat: 4, ampat: 4, lima: 5, enam: 6, tujuh: 7, tuju: 7, delapan: 8, lapan: 8, sembilan: 9 };
/** Semua bilangan 0 sampai 100 yang terdengar (kata, belasan, puluhan majemuk, atau angka), urut kemunculan, tanpa kembar. */
export function angkaDariUcapan(teks: string): number[] {
  const t = normal(teks).split(" ").filter(Boolean);
  const hasil: number[] = [];
  const tambah = (n: number) => {
    if (n >= 0 && n <= 100 && !hasil.includes(n)) hasil.push(n);
  };
  for (let i = 0; i < t.length; i += 1) {
    const w = t[i];
    if (/^\d{1,3}$/.test(w)) tambah(Number(w));
    else if (w === "seratus") tambah(100);
    else if (w === "sepuluh") tambah(10);
    else if (w === "sebelas") tambah(11);
    else if (ANGKA[w] !== undefined) {
      const n = ANGKA[w];
      if (t[i + 1] === "belas") {
        tambah(10 + n);
        i += 1;
      } else if (t[i + 1] === "puluh") {
        const s = ANGKA[t[i + 2]];
        if (s !== undefined && s > 0 && t[i + 3] !== "puluh" && t[i + 3] !== "belas") {
          tambah(n * 10 + s);
          i += 2;
        } else {
          tambah(n * 10);
          i += 1;
        }
      } else tambah(n);
    }
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
