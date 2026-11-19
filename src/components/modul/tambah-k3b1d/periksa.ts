/**
 * Pengenal ucapan Kelas 3 Bab 1 Sub-Bab D (tanpa React, diuji di Node: scripts/uji-tambah-k3b1d.mjs).
 * Kata jawaban (simpan, satuan, puluhan, besar, kecil, sama, lebih, kurang, tambah) dikenali dengan ragam ucapan. Bilangan sampai seratus dikenali dari kata
 * (satuan, belasan, puluhan majemuk, "sepuluh", "seratus") atau dari angka yang ditulis mesin pengenal ("90").
 */
import type { Kunci } from "./logika-cpa";

const normal = (teks: string): string =>
  teks
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\bse\s*puluh\b/g, " sepuluh ")
    .replace(/\bse\s*belas\b/g, " sebelas ")
    .replace(/\bse\s*ratus\b/g, " seratus ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/** Kata jawaban yang dikenali beserta ragam ucapannya. */
export const POLA_KATA: [string, RegExp][] = [
  ["simpan", /\b(simpan|simpen|simpang|disimpan|menyimpan|simpanan)\b/],
  ["satuan", /\b(satuan|satu an|satuhan|satuaan|satuwan)\b/],
  ["puluhan", /\b(puluhan|puluh an|puluhaan|pulohan|pulu han)\b/],
  ["besar", /\b(besar|besarr|bessar|yang besar|terbesar)\b/],
  ["kecil", /\b(kecil|kecill|keci|terkecil)\b/],
  ["sama", /\b(sama|samaa|sami|sama banyak)\b/],
  ["lebih", /\b(lebih|lebi|leb|lebih banyak)\b/],
  ["kurang", /\b(kurang|kurangg|kurank|kurang banyak)\b/],
  ["tambah", /\b(tambah|ditambah|menambah|penambahan|tambahan|plus)\b/],
  ["kali", /\b(kali|dikali|perkalian)\b/],
  ["hapus", /\b(hapus|dihapus|menghapus)\b/],
  ["lupa", /\b(lupa|dilupakan|melupakan)\b/],
  ["ratusan", /\b(ratusan)\b/],
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
