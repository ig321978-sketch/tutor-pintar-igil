/**
 * Tata letak adegan dan pengenal ucapan Kelas 2 Bab 4 Sub-Bab B (tanpa React, diuji di Node: scripts/uji-hias-k2b4b.mjs).
 * Kanvas adegan 300 x 200. Kata yang diucapkan (nama warna, bentuk, bunyi, "pola") dikenali dengan ragam ucapan ("ungu", "unggu", "oranye", ...).
 */
import { SEMUA_KATA, type Kunci } from "./logika-cpa";

export const LEBAR_ADEGAN = 300;
export const TINGGI_ADEGAN = 200;
export type Titik = { x: number; y: number };
const r1 = (n: number): number => Number(n.toFixed(1));

/** Letak `n` kotak berjajar di satu baris selebar `lebar`: ukuran kotak, jarak antarpusat, dan x pusat kotak pertama. */
export function tataBaris(n: number, lebar = 276, maks = 36): { s: number; d: number; x0: number } {
  const d = Math.min(maks, lebar / Math.max(1, n));
  const s = r1(d * 0.84);
  return { s, d: r1(d), x0: r1(150 - (d * (n - 1)) / 2) };
}
/** Pusat kotak ke-i dari `n` pada tinggi `y`. */
export const pusatKotak = (i: number, n: number, y: number): Titik => {
  const t = tataBaris(n);
  return { x: r1(t.x0 + t.d * i), y };
};

/* ------------------------------ Pengenal ucapan ------------------------------ */
const POLA_KATA: [string, RegExp][] = [
  ["merah", /\b(merah|mera|abang)\b/],
  ["biru", /\b(biru|biro)\b/],
  ["jingga", /\b(jingga|jinga|oranye|orange|oren|jeruk)\b/],
  ["hijau", /\b(hijau|ijo|hijo|green)\b/],
  ["ungu", /\b(ungu|unggu|ungun|violet)\b/],
  ["kuning", /\b(kuning|kunin|kuneng)\b/],
  ["putih", /\b(putih|puti|putik)\b/],
  ["cokelat", /\b(cokelat|coklat|cokelat tua|chocolate|cokla)\b/],
  ["bintang", /\b(bintang|bintan|star)\b/],
  ["hati", /\b(hati|love|cinta)\b/],
  ["daun", /\b(daun|dawn)\b/],
  ["bunga", /\b(bunga|kembang)\b/],
  ["bulat", /\b(bulat|bundar|lingkaran|bola)\b/],
  ["kotak", /\b(kotak|persegi|segi empat|segiempat)\b/],
  ["segitiga", /\b(segitiga|segi tiga|segi 3)\b/],
  ["keras", /\b(keras|kenceng|kencang|besar)\b/],
  ["pelan", /\b(pelan|lembut|perlahan|kecil)\b/],
  ["diam", /\b(diam|hening|senyap|sunyi)\b/],
  ["bukan pola", /\b(bukan pola|bukan)\b/],
  ["pola", /\b(pola)\b/],
];
const normal = (teks: string): string =>
  teks
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/** Semua kata unsur yang terdengar dalam ucapan (urut daftar, tanpa kembar). "bukan pola" menggantikan "pola". */
export function kataDariUcapan(teks: string): string[] {
  const t = normal(teks);
  const hasil = POLA_KATA.filter(([, p]) => p.test(t)).map(([n]) => n);
  return hasil.includes("bukan pola") ? hasil.filter((n) => n !== "pola") : hasil;
}
const ANGKA: Record<string, number> = { nol: 0, satu: 1, dua: 2, tiga: 3, empat: 4, ampat: 4, lima: 5, enam: 6, tujuh: 7, tuju: 7, delapan: 8, lapan: 8, sembilan: 9, semilan: 9 };
/** Semua bilangan nol sampai sembilan yang terdengar (kata atau angka), urut kemunculan, tanpa kembar. */
export function angkaDariUcapan(teks: string): number[] {
  const hasil: number[] = [];
  for (const w of normal(teks).split(" ")) {
    const n = /^\d$/.test(w) ? Number(w) : ANGKA[w];
    if (n !== undefined && !hasil.includes(n)) hasil.push(n);
  }
  return hasil;
}
/**
 * Apakah ucapan cocok dengan kunci? Kunci kata: kata itu terdengar. Kunci angka: bilangan itu terdengar.
 * `terdengar`: apa yang dikenali (untuk pesan "Terdengar ...").
 */
export function cocokUcapan(teks: string, kunci: Kunci): { cocok: boolean; terdengar: string[] } {
  if (kunci.jenis === "angka") {
    const angka = angkaDariUcapan(teks);
    return { cocok: angka.includes(kunci.n), terdengar: angka.map(String) };
  }
  const kataTerdengar = kataDariUcapan(teks);
  return { cocok: kataTerdengar.includes(kunci.kata), terdengar: kataTerdengar.length > 0 ? kataTerdengar : angkaDariUcapan(teks).map(String) };
}
export const KATA_DIKENAL = SEMUA_KATA;
