/**
 * Pengenal ucapan Kelas 3 Bab 4 Sub-Bab B (tanpa React, diuji di Node: scripts/uji-sudut-k3b4b.mjs).
 * Kata jawaban (busur, derajat, lancip, siku-siku, tumpul, lurus, refleks, penggaris, meteran, sentimeter, meter) dikenali dengan ragam ucapan. Bilangan sampai 360 dikenali dari kata
 * (satuan, belasan, puluhan majemuk seperti "tujuh puluh", ratusan majemuk seperti "seratus empat puluh", "tiga ratus enam puluh") atau dari angka yang ditulis mesin pengenal ("70").
 * "sentimeter" dan "meteran" dicari lebih dulu supaya tidak dikira "meter".
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
const R_SENTI = /\b(sentimeter|senti meter|centimeter|santimeter|sentimeterr|sentimeteran)\b/;
const R_METERAN = /\b(meteran|me te ran|meter an|meterran|meteren)\b/;
export const POLA_KATA: [string, RegExp][] = [
  ["busur", /\b(busur|bu sur|busurr|busor)\b/],
  ["derajat", /\b(derajat|de rajat|derajad|derajatt)\b/],
  ["lancip", /\b(lancip|lan cip|lancib|lancipp)\b/],
  ["siku-siku", /\b(siku siku|sikusiku|siku)\b/],
  ["tumpul", /\b(tumpul|tum pul|tumpull|tumpol)\b/],
  ["lurus", /\b(lurus|lurusss|lu rus|lurus lurus)\b/],
  ["refleks", /\b(refleks|reflek|refleksi|reflex|re fleks|refleksss)\b/],
  ["penggaris", /\b(penggaris|pengaris|peng garis|penggarisan)\b/],
  ["meteran", R_METERAN],
  ["sentimeter", R_SENTI],
  ["meter", /\b(meter|meterr|me ter|metter)\b/],
];
const NAMA_KATA = POLA_KATA.map(([n]) => n)
  .map((n) => (n === "siku-siku" ? "siku siku|sikusiku|siku" : n))
  .join("|");

/**
 * Semua kata jawaban yang terdengar dalam ucapan (urut daftar, tanpa kembar). Kata yang didahului "tidak" atau "bukan" tidak dihitung.
 * "sentimeter" dan "meteran" diganti penanda lebih dulu supaya kata "meter" tidak ikut terhitung.
 */
export function kataDariUcapan(teks: string): string[] {
  const t0 = normal(teks).replace(new RegExp(`\\b(tidak|bukan|nggak|enggak|gak|tak) (${NAMA_KATA})\\b`, "g"), " ");
  const adaSenti = R_SENTI.test(t0);
  const adaMeteran = R_METERAN.test(t0);
  const t = t0.replace(new RegExp(R_SENTI.source, "g"), " X ").replace(new RegExp(R_METERAN.source, "g"), " X ");
  return POLA_KATA.filter(([n, p]) => (n === "sentimeter" ? adaSenti : n === "meteran" ? adaMeteran : p.test(t))).map(([n]) => n);
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
  if (t[i + 1] === "ratus") return null;
  return [n, i + 1];
}

/** Semua bilangan 0 sampai 360 yang terdengar (kata, belasan, puluhan dan ratusan majemuk, atau angka), urut kemunculan, tanpa kembar. */
export function angkaDariUcapan(teks: string): number[] {
  const t = normal(teks).split(" ").filter(Boolean);
  const hasil: number[] = [];
  const tambah = (n: number) => {
    if (n >= 0 && n <= 360 && !hasil.includes(n)) hasil.push(n);
  };
  for (let i = 0; i < t.length; ) {
    const w = t[i];
    if (/^\d{1,3}$/.test(w)) {
      tambah(Number(w));
      i += 1;
    } else if (w === "nol") {
      tambah(0);
      i += 1;
    } else if (w === "seratus" || (SATU[w] && t[i + 1] === "ratus")) {
      let n = w === "seratus" ? 100 : SATU[w] * 100;
      i += w === "seratus" ? 1 : 2;
      const b = bagian(t, i);
      if (b) {
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

/** Apakah ucapan cocok dengan kunci? `terdengar`: apa yang dikenali (untuk pesan "Terdengar ..."). */
export function cocokUcapan(teks: string, kunci: Kunci): { cocok: boolean; terdengar: string[] } {
  if (kunci.jenis === "angka") {
    const angka = angkaDariUcapan(teks);
    return { cocok: angka.includes(kunci.n), terdengar: angka.map(String) };
  }
  const kata = kataDariUcapan(teks);
  return { cocok: kata.includes(kunci.nama), terdengar: kata };
}
