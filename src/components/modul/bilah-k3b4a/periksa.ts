/**
 * Pengenal ucapan Kelas 3 Bab 4 Sub-Bab A (tanpa React, diuji di Node: scripts/uji-bilah-k3b4a.mjs).
 * Kata jawaban (sinar garis, garis, ruas garis, kurva, sama, berbeda) dikenali dengan ragam ucapan. Bilangan sampai 999 dikenali dari kata
 * (satuan, belasan, puluhan majemuk seperti "tujuh puluh", ratusan) atau dari angka yang ditulis mesin pengenal ("70").
 * "sinar garis" dan "ruas garis" dicari lebih dulu supaya tidak dikira "garis".
 */
import type { Kunci } from "./logika-cpa";

const normal = (teks: string): string =>
  teks
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const R_SINAR = /\b(sinar garis|sinar gari|sinar|sinargaris)\b/;
const R_RUAS = /\b(ruas garis|ruas gari|ruas|ruasgaris|rwas garis)\b/;
/** Kata jawaban yang dikenali beserta ragam ucapannya. */
export const POLA_KATA: [string, RegExp][] = [
  ["sinar garis", R_SINAR],
  ["ruas garis", R_RUAS],
  ["garis", /\b(garis|gari|garist)\b/],
  ["kurva", /\b(kurva|kurfa|kurvaa|korva|curva)\b/],
  ["sama", /\b(sama|samaa|sam a)\b/],
  ["berbeda", /\b(berbeda|beda|bedaa|ber beda)\b/],
];
const NAMA_KATA = ["sinar garis", "sinar", "ruas garis", "ruas", "garis", "kurva", "sama", "berbeda", "beda"].join("|");

/**
 * Semua kata jawaban yang terdengar dalam ucapan (urut daftar, tanpa kembar). Kata yang didahului "tidak" atau "bukan" tidak dihitung.
 * "sinar garis" dan "ruas garis" diganti penanda lebih dulu supaya kata "garis" tidak ikut terhitung.
 */
export function kataDariUcapan(teks: string): string[] {
  const t0 = normal(teks).replace(new RegExp(`\\b(tidak|bukan|nggak|enggak|gak|tak) (${NAMA_KATA})\\b`, "g"), " ");
  const adaSinar = R_SINAR.test(t0);
  const adaRuas = R_RUAS.test(t0);
  const t = t0.replace(new RegExp(R_SINAR.source, "g"), " X ").replace(new RegExp(R_RUAS.source, "g"), " X ");
  return POLA_KATA.filter(([n, p]) => (n === "sinar garis" ? adaSinar : n === "ruas garis" ? adaRuas : p.test(t))).map(([n]) => n);
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
    if (s !== undefined && s > 0 && t[i + 3] !== "puluh" && t[i + 3] !== "belas" && t[i + 3] !== "ratus") return [n * 10 + s, i + 3];
    return [n * 10, i + 2];
  }
  return [n, i + 1];
}

/** Semua bilangan 0 sampai 999 yang terdengar (kata, belasan, puluhan majemuk, ratusan, atau angka), urut kemunculan, tanpa kembar. */
export function angkaDariUcapan(teks: string): number[] {
  const t = normal(teks).split(" ").filter(Boolean);
  const hasil: number[] = [];
  const tambah = (n: number) => {
    if (n >= 0 && n <= 999 && !hasil.includes(n)) hasil.push(n);
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
      let n = 100;
      i += 1;
      const b = bagian(t, i);
      if (b && t[i + 1] !== "ratus") {
        n += b[0];
        i = b[1];
      }
      tambah(n);
    } else if (SATU[w] !== undefined && SATU[w] > 0 && t[i + 1] === "ratus") {
      let n = SATU[w] * 100;
      i += 2;
      const b = bagian(t, i);
      if (b && t[i + 1] !== "ratus") {
        n += b[0];
        i = b[1];
      }
      tambah(n);
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

/** Apakah ucapan cocok dengan jawaban benar? `terdengar`: apa yang dikenali (untuk pesan "Terdengar ..."). */
export function cocokUcapan(teks: string, kunci: Kunci): { cocok: boolean; terdengar: string[] } {
  if (kunci.jenis === "angka") {
    const angka = angkaDariUcapan(teks);
    return { cocok: angka.includes(kunci.n), terdengar: angka.map(String) };
  }
  const kata = kataDariUcapan(teks);
  return { cocok: kata.includes(kunci.nama), terdengar: kata };
}
