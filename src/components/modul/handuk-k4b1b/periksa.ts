/**
 * Pengenal ucapan Kelas 4 Bab 1 Sub-Bab B (tanpa React, diuji di Node: scripts/uji-handuk-k4b1b.mjs).
 * Nama tempat angka (ribuan, ratusan, puluhan, satuan) dan kata jawaban (lebih, kurang, sama) dikenali dengan ragam ucapan.
 * Bilangan sampai 9.999 dikenali dari kata (satuan, belasan, puluhan majemuk, ratusan, ribuan, seperti "empat ribu dua ratus lima") atau dari angka yang ditulis mesin pengenal ("4205" atau "4.205").
 */
import type { Kunci } from "./logika-cpa";

const normal = (teks: string): string =>
  teks
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/(\d)\.(\d{3})(?!\d)/g, "$1$2")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/** Kata jawaban yang dikenali beserta ragam ucapannya. */
export const POLA_KATA: [string, RegExp][] = [
  ["ribuan", /\b(ribuan|ribu an|ribuhan|ribuwan|ribuaan)\b/],
  ["ratusan", /\b(ratusan|ratus an|ratuhan|ratusaan)\b/],
  ["puluhan", /\b(puluhan|puluh an|pulohan|puluhaan)\b/],
  ["satuan", /\b(satuan|satu an|satuwan|satuaan)\b/],
  ["lebih", /\b(lebih|lebi|lebeh)\b/],
  ["kurang", /\b(kurang|kurangg|kurrang)\b/],
  ["sama", /\b(sama|samaa|sam a)\b/],
];
const NAMA_KATA = ["ribuan", "ratusan", "puluhan", "satuan", "lebih", "kurang", "sama"].join("|");

/** Semua kata jawaban yang terdengar dalam ucapan (urut daftar, tanpa kembar). Kata yang didahului "tidak" atau "bukan" tidak dihitung. */
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
    if (s !== undefined && s > 0 && t[i + 3] !== "puluh" && t[i + 3] !== "belas" && t[i + 3] !== "ratus" && t[i + 3] !== "ribu") return [n * 10 + s, i + 3];
    return [n * 10, i + 2];
  }
  return [n, i + 1];
}
/** Bilangan di bawah seribu mulai pada indeks i: [nilai, indeks berikutnya], atau null. */
function ratusan(t: string[], i: number): [number, number] | null {
  const w = t[i];
  if (w === "seratus" || (SATU[w] !== undefined && SATU[w] > 0 && t[i + 1] === "ratus")) {
    let n = w === "seratus" ? 100 : SATU[w] * 100;
    let j = i + (w === "seratus" ? 1 : 2);
    const b = bagian(t, j);
    if (b && t[b[1]] !== "ratus" && t[b[1]] !== "ribu") {
      n += b[0];
      j = b[1];
    }
    return [n, j];
  }
  return bagian(t, i);
}

/** Semua bilangan 0 sampai 9.999 yang terdengar (kata, belasan, puluhan majemuk, ratusan, ribuan, atau angka), urut kemunculan, tanpa kembar. */
export function angkaDariUcapan(teks: string): number[] {
  const t = normal(teks).split(" ").filter(Boolean);
  const hasil: number[] = [];
  const tambah = (n: number) => {
    if (n >= 0 && n <= 9999 && !hasil.includes(n)) hasil.push(n);
  };
  for (let i = 0; i < t.length; ) {
    const w = t[i];
    if (/^\d{1,4}$/.test(w)) {
      tambah(Number(w));
      i += 1;
    } else if (w === "nol") {
      tambah(0);
      i += 1;
    } else if (w === "seribu") {
      let n = 1000;
      let j = i + 1;
      const r = ratusan(t, j);
      if (r) {
        n += r[0];
        j = r[1];
      }
      tambah(n);
      i = j;
    } else {
      const r = ratusan(t, i);
      if (r && t[r[1]] === "ribu") {
        let n = r[0] * 1000;
        let j = r[1] + 1;
        const s = ratusan(t, j);
        if (s) {
          n += s[0];
          j = s[1];
        }
        tambah(n);
        i = j;
      } else if (r) {
        tambah(r[0]);
        i = r[1];
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
