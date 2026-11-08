import type { SelBingkai } from "./komponen-lab";

/**
 * Laboratorium Bilangan (Bab 1): model PhET. Satu bilangan n (0 sampai 10) ditampilkan serentak sebagai
 * benda bernomor, bingkai sepuluh, garis bilangan, dan bagan pasangan. Mengubah n lewat satu tampilan
 * mengubah semua tampilan lain. Murni: tanpa React, tanpa jaringan. Diuji di scripts/uji-lab-kelas1.mjs.
 */

export const MAKS = 10;

export const batas = (n: number) => Math.max(0, Math.min(MAKS, Math.round(n)));

/** Bagian merah (a) tidak boleh melebihi n. */
export const batasPecah = (n: number, a: number) => Math.max(0, Math.min(n, Math.round(a)));

/** Sepuluh kotak bingkai: a kotak merah, sisanya sampai n biru, selebihnya kosong. */
export function selBingkai(n: number, a: number): SelBingkai[] {
  const nn = batas(n);
  const aa = batasPecah(nn, a);
  return Array.from({ length: MAKS }, (_, i): SelBingkai => (i < aa ? "a" : i < nn ? "b" : "kosong"));
}

export type Hubungan = { simbol: "<" | ">" | "="; kalimat: string };

export function hubungan(n: number, m: number): Hubungan {
  if (n === m) return { simbol: "=", kalimat: `${n} sama banyak dengan ${m}.` };
  if (n > m) return { simbol: ">", kalimat: `${n} lebih banyak dari ${m}. ${m} lebih sedikit dari ${n}.` };
  return { simbol: "<", kalimat: `${n} lebih sedikit dari ${m}. ${m} lebih banyak dari ${n}.` };
}

export function pasangan(n: number, a: number): { a: number; b: number } {
  const aa = batasPecah(n, a);
  return { a: aa, b: n - aa };
}

export const kalimatPasangan = (n: number, a: number) => {
  const p = pasangan(n, a);
  return `${n} = ${p.a} + ${p.b}`;
};

/** Ketuk kotak ke-i pada baris benda atau bingkai: bilangan menjadi i+1; ketuk yang terakhir mengurangi satu. */
export const ketukKotak = (n: number, i: number) => (i + 1 === n ? batas(n - 1) : batas(i + 1));

/** Ucapan guru untuk keadaan lab sekarang. Angka dieja oleh pemanggil. */
export function ucapanLab(n: number, a: number, banding: boolean, m: number): string {
  const p = pasangan(n, a);
  const bagian = [`Bilangan ${n}. Ada ${n} benda. ${n} terdiri dari ${p.a} dan ${p.b}.`];
  if (banding) bagian.push(hubungan(n, m).kalimat);
  return bagian.join(" ");
}
