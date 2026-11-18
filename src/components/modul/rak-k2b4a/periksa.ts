/**
 * Tata letak adegan dan pengenal ucapan Kelas 2 Bab 4 Sub-Bab A (tanpa React, diuji di Node: scripts/uji-rak-k2b4a.mjs).
 * Kanvas adegan 300 x 200. Kata posisi yang diucapkan dikenali dengan ragam ucapan ("di atas", "sebelah kiri", ...).
 */
import type { Adegan, Kata, Kunci } from "./logika-cpa";

export const LEBAR_ADEGAN = 300;
export const TINGGI_ADEGAN = 200;
export type Titik = { x: number; y: number };
const r1 = (n: number): number => Number(n.toFixed(1));

/* ------------------------------ Papan benda ------------------------------ */
export type TataPapan = { sx: number; sy: number; x0: number; y0: number };
/** Ukuran petak dan pojok kiri-atas papan berpetak `kol` kali `bar`. */
export function tataPapan(ad: Pick<Adegan, "kol" | "bar">): TataPapan {
  const sx = Math.min(52, Math.floor(270 / ad.kol));
  const sy = ad.bar === 1 ? 76 : 62;
  return { sx, sy, x0: r1((LEBAR_ADEGAN - ad.kol * sx) / 2), y0: ad.bar === 1 ? 46 : 30 };
}
/** Pusat petak (kolom, baris). */
export function pusatPetak(ad: Pick<Adegan, "kol" | "bar">, kol: number, bar: number): Titik {
  const t = tataPapan(ad);
  return { x: r1(t.x0 + kol * t.sx + t.sx / 2), y: r1(t.y0 + bar * t.sy + t.sy / 2) };
}
/** Pusat sebuah benda: benda di depan agak ke kanan-bawah, benda di belakang agak ke kiri-atas (bila dua benda satu petak). */
export function pusatBenda(ad: Adegan, i: number): Titik {
  const b = ad.isi[i];
  const p = pusatPetak(ad, b.kol, b.bar);
  const ganda = ad.isi.some((x, j) => j !== i && x.kol === b.kol && x.bar === b.bar);
  if (!ganda) return p;
  return (b.dep ?? 0) === 0 ? { x: r1(p.x + 7), y: r1(p.y + 7) } : { x: r1(p.x - 7), y: r1(p.y - 7) };
}

/* ------------------------------ Peta kotak ------------------------------ */
export function tataPeta(kol: number, bar: number): { s: number; x0: number; y0: number } {
  const s = Math.min(46, Math.floor(260 / kol), Math.floor(150 / bar));
  return { s, x0: r1((LEBAR_ADEGAN - kol * s) / 2), y0: 34 };
}
export function pusatPeta(kol: number, bar: number, c: number, b: number): Titik {
  const t = tataPeta(kol, bar);
  return { x: r1(t.x0 + c * t.s + t.s / 2), y: r1(t.y0 + b * t.s + t.s / 2) };
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
const POLA_KATA: [Kata, RegExp][] = [
  ["atas", /\b(atas|diatas|atasnya)\b/],
  ["bawah", /\b(bawah|dibawah|bawahnya)\b/],
  ["depan", /\b(depan|didepan|depannya)\b/],
  ["belakang", /\b(belakang|dibelakang|belakangnya|blakang)\b/],
  ["kiri", /\b(kiri|kirinya)\b/],
  ["kanan", /\b(kanan|kanannya|kenan)\b/],
];
const normal = (teks: string): string =>
  teks
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/** Semua kata posisi yang terdengar dalam ucapan (urut daftar, tanpa kembar). */
export function kataDariUcapan(teks: string): Kata[] {
  const t = normal(teks);
  return POLA_KATA.filter(([, p]) => p.test(t)).map(([n]) => n);
}
const ANGKA: Record<string, number> = { nol: 0, satu: 1, dua: 2, tiga: 3, empat: 4, ampat: 4, lima: 5, enam: 6, tujuh: 7, tuju: 7, delapan: 8, lapan: 8, sembilan: 9 };
/** Semua bilangan nol sampai sembilan yang terdengar (kata atau angka), urut kemunculan, tanpa kembar. */
export function angkaDariUcapan(teks: string): number[] {
  const hasil: number[] = [];
  for (const w of normal(teks).split(" ")) {
    const n = /^\d$/.test(w) ? Number(w) : ANGKA[w];
    if (n !== undefined && !hasil.includes(n)) hasil.push(n);
  }
  return hasil;
}
/** Apakah ucapan cocok dengan kunci? Kunci kata: kata itu terdengar. Kunci angka: bilangan itu terdengar. `terdengar`: apa yang dikenali (untuk pesan "Terdengar ..."). */
export function cocokUcapan(teks: string, kunci: Kunci): { cocok: boolean; terdengar: string[] } {
  if (kunci.jenis === "angka") {
    const angka = angkaDariUcapan(teks);
    return { cocok: angka.includes(kunci.n), terdengar: angka.map(String) };
  }
  const kata = kataDariUcapan(teks);
  return { cocok: kata.includes(kunci.nama), terdengar: kata };
}
