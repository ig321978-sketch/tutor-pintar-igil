/**
 * Pengenal ucapan Kelas 5 Bab 1 Sub-Bab B (tanpa React, diuji di Node: scripts/uji-urutan-k5b1b.mjs).
 * Kata jawaban (besar, kecil, sama, pertama, kedua, kiri, kanan, nama item papan) dikenali dengan ragam ucapan.
 * Bilangan sampai 99.999 dikenali dari kata (satuan, belasan, puluhan majemuk, ratusan, ribuan seperti "dua ribu lima ratus")
 * atau dari angka yang ditulis mesin pengenal ("27", "3000", "3.000").
 */
import type { Kunci } from "./logika-cpa";
import { NAMA_ITEM } from "./papan-data";

const normal = (teks: string): string =>
  teks
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/(\d)\.(\d{3})(?!\d)/g, "$1$2")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/** Kata jawaban yang dikenali beserta ragam ucapannya: kata tanda, bilangan pertama atau kedua, sisi patokan, dan nama item papan. */
const RAGAM_TETAP: [string, string[]][] = [
  ["besar", ["besar", "lebih besar", "gede"]],
  ["kecil", ["kecil", "lebih kecil"]],
  ["sama", ["sama", "sama dengan"]],
  ["pertama", ["pertama", "kesatu"]],
  ["kedua", ["kedua", "ke dua"]],
  ["kiri", ["kiri", "sebelah kiri"]],
  ["kanan", ["kanan", "sebelah kanan"]],
  ["tengah", ["tengah", "tepat di tengah"]],
];
const RAGAM_ITEM: Record<string, string[]> = {
  terompet: ["terompet", "trompet", "tarompet"],
  gong: ["gong", "gung"],
  syal: ["syal", "sial", "shawl"],
  selatan: ["selatan", "slatan"],
  utara: ["utara", "ut ara"],
  bendera: ["bendera", "bandera"],
};
const RAGAM: [string, string[]][] = [...RAGAM_TETAP, ...NAMA_ITEM.filter((n) => !RAGAM_TETAP.some(([k]) => k === n)).map((n): [string, string[]] => [n, RAGAM_ITEM[n] ?? [n]])];
export const POLA_KATA: [string, RegExp][] = RAGAM.map(([n, r]): [string, RegExp] => [n, new RegExp(String.raw`\b(${r.join("|")})\b`)]);
const NAMA_KATA = RAGAM.map(([n]) => n).join("|");

/** Semua kata jawaban yang terdengar dalam ucapan (urut daftar, tanpa kembar). Kata yang didahului "tidak" atau "bukan" tidak dihitung. */
export function kataDariUcapan(teks: string): string[] {
  const t = normal(teks).replace(new RegExp(String.raw`\b(tidak|bukan|nggak|enggak|gak|tak) (${NAMA_KATA})\b`, "g"), " ");
  const hasil: string[] = [];
  for (const [nama, p] of POLA_KATA) {
    if (p.test(t)) {
      hasil.push(nama);
    }
  }
  return hasil;
}

const SATU: Record<string, number> = { nol: 0, satu: 1, dua: 2, tiga: 3, empat: 4, ampat: 4, lima: 5, enam: 6, tujuh: 7, tuju: 7, delapan: 8, lapan: 8, sembilan: 9 };

/** Bagian puluhan dan satuan yang dimulai pada indeks i: [bilangan, indeks berikutnya], atau null bila bukan bilangan. */
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

/** Bilangan 1 sampai 999 yang dimulai pada indeks i (seratus, dua ratus lima puluh, tiga belas), atau null. */
function ratusan(t: string[], i: number): [number, number] | null {
  const w = t[i];
  if (w === "seratus") {
    const b = bagian(t, i + 1);
    if (b && t[i + 2] !== "ratus" && t[b[1]] !== "ribu") return [100 + b[0], b[1]];
    return [100, i + 1];
  }
  if (SATU[w] !== undefined && SATU[w] > 0 && t[i + 1] === "ratus") {
    const b = bagian(t, i + 2);
    if (b && t[i + 3] !== "ratus" && t[b[1]] !== "ribu") return [SATU[w] * 100 + b[0], b[1]];
    return [SATU[w] * 100, i + 2];
  }
  return bagian(t, i);
}

/** Bilangan yang dimulai pada indeks i, termasuk ribuan: [bilangan, indeks berikutnya], atau null. */
function bilangan(t: string[], i: number): [number, number] | null {
  if (t[i] === "seribu") {
    const r = ratusan(t, i + 1);
    return r ? [1000 + r[0], r[1]] : [1000, i + 1];
  }
  const r = ratusan(t, i);
  if (!r) return null;
  if (t[r[1]] === "ribu") {
    const sisa = ratusan(t, r[1] + 1);
    return sisa ? [r[0] * 1000 + sisa[0], sisa[1]] : [r[0] * 1000, r[1] + 1];
  }
  return r;
}

/** Semua bilangan 0 sampai 99.999 yang terdengar (kata, belasan, puluhan majemuk, ratusan, ribuan, atau angka), urut kemunculan, tanpa kembar. */
export function angkaDariUcapan(teks: string): number[] {
  const t = normal(teks).split(" ").filter(Boolean);
  const hasil: number[] = [];
  const tambah = (n: number) => {
    if (n >= 0 && n <= 99999 && !hasil.includes(n)) hasil.push(n);
  };
  for (let i = 0; i < t.length; ) {
    const w = t[i];
    if (/^\d{1,5}$/.test(w)) {
      tambah(Number(w));
      i += 1;
    } else if (w === "nol") {
      tambah(0);
      i += 1;
    } else {
      const b = bilangan(t, i);
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
