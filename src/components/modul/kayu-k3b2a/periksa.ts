/**
 * Pengenal ucapan Kelas 3 Bab 2 Sub-Bab A (tanpa React, diuji di Node: scripts/uji-kayu-k3b2a.mjs).
 * Kata jawaban (jumlah, bagian, depan, tengah, akhir, periksa) dikenali dengan ragam ucapan. Bilangan sampai 100 dikenali dari kata
 * (satuan, belasan, puluhan majemuk seperti "tiga puluh tujuh", "seratus", "sepuluh", "sebelas") atau dari angka yang ditulis mesin pengenal ("37").
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
  ["jumlah", /\b(jumlah|jumla|jumlahnya|jum lah|yumlah|jumblah)\b/],
  ["bagian", /\b(bagian|bagiannya|ba gian|bagiyan|bagean)\b/],
  ["depan", /\b(depan|di depan|de pan|depann|dapan)\b/],
  ["tengah", /\b(tengah|di tengah|teng ah|tengahh|tenga)\b/],
  ["akhir", /\b(akhir|di akhir|ahir|akhirr|a khir)\b/],
  ["periksa", /\b(periksa|memeriksa|diperiksa|pe rik sa|perikasa|periksah)\b/],
];
const NAMA_KATA = POLA_KATA.map(([n]) => n).join("|");

/**
 * Semua kata jawaban yang terdengar dalam ucapan (urut daftar, tanpa kembar). Kata yang didahului "tidak" atau "bukan" tidak dihitung.
 */
export function kataDariUcapan(teks: string): string[] {
  const t = normal(teks).replace(new RegExp(`\\b(tidak|bukan|nggak|enggak|gak|tak) (${NAMA_KATA})\\b`, "g"), " ");
  return POLA_KATA.filter(([, p]) => p.test(t)).map(([n]) => n);
}

const SATU: Record<string, number> = { nol: 0, satu: 1, dua: 2, tiga: 3, empat: 4, ampat: 4, lima: 5, enam: 6, tujuh: 7, tuju: 7, delapan: 8, lapan: 8, sembilan: 9 };

/** Bagian puluhan dan satuan yang dimulai pada indeks i: [nilai, indeks berikutnya], atau null bila bukan bilangan. */
function bagian(t: string[], i: number): [number, number] | null {
  const w = t[i];
  if (w === "sepuluh") return [10, i + 1];
  if (w === "sebelas") return [11, i + 1];
  const n = SATU[w];
  if (n === undefined || n === 0) return null;
  if (t[i + 1] === "belas") return [10 + n, i + 2];
  if (t[i + 1] === "puluh") {
    const s = SATU[t[i + 2]];
    if (s !== undefined && s > 0 && t[i + 3] !== "puluh" && t[i + 3] !== "belas") return [n * 10 + s, i + 3];
    return [n * 10, i + 2];
  }
  return [n, i + 1];
}

/** Semua bilangan 0 sampai 100 yang terdengar (kata, belasan, puluhan majemuk, atau angka), urut kemunculan, tanpa kembar. */
export function angkaDariUcapan(teks: string): number[] {
  const t = normal(teks).split(" ").filter(Boolean);
  const hasil: number[] = [];
  const tambah = (n: number) => {
    if (n >= 0 && n <= 100 && !hasil.includes(n)) hasil.push(n);
  };
  for (let i = 0; i < t.length; ) {
    const w = t[i];
    if (/^\d{1,3}$/.test(w)) {
      tambah(Number(w));
      i += 1;
    } else if (w === "nol") {
      tambah(0);
      i += 1;
    } else if (w === "seratus") {
      tambah(100);
      i += 1;
    } else {
      const b = bagian(t, i);
      if (b) {
        tambah(b[0]);
        i = b[1];
      } else i += 1;
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
