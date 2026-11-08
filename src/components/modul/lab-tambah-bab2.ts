import type { SelBingkai } from "./komponen-lab";

/**
 * Laboratorium Penjumlahan (Bab 2): model PhET. Dua kelompok benda (a merah, b biru) digabung.
 * Satu pasang bilangan ditampilkan sebagai benda, bingkai sepuluh, bagan pasangan, dan garis bilangan.
 * Jumlah paling banyak 10 pada bab ini. Murni: tanpa React, tanpa jaringan. Diuji di scripts/uji-lab-kelas1.mjs.
 */

export const MAKS = 10;

export type Papan = { a: number; b: number; pesan: string };

export function ubahKelompok(p: { a: number; b: number }, k: "a" | "b", delta: 1 | -1): Papan {
  const lama = p[k];
  if (delta > 0 && p.a + p.b >= MAKS) {
    return { a: p.a, b: p.b, pesan: `Pada bab ini jumlahnya paling banyak ${MAKS}. Kurangi kelompok lain dulu.` };
  }
  const baru = Math.max(0, lama + delta);
  return { a: k === "a" ? baru : p.a, b: k === "b" ? baru : p.b, pesan: "" };
}

export const jumlah = (a: number, b: number) => a + b;

export const tukar = (p: { a: number; b: number }) => ({ a: p.b, b: p.a });

export const kalimat = (a: number, b: number) => `${a} + ${b} = ${a + b}`;

export const kalimatTukar = (a: number, b: number) => `${b} + ${a} = ${a + b}`;

/** Bingkai sepuluh: a kotak merah, lalu b kotak biru. */
export function selGabung(a: number, b: number): SelBingkai[] {
  return Array.from({ length: MAKS }, (_, i): SelBingkai => (i < a ? "a" : i < a + b ? "b" : "kosong"));
}

/** Benda setelah digabung: nomor 1 sampai a + b, tiap benda tahu kelompok asalnya. */
export function bendaGabung(a: number, b: number): { no: number; grup: "a" | "b" }[] {
  return Array.from({ length: a + b }, (_, i) => ({ no: i + 1, grup: i < a ? "a" : "b" }));
}

/** Langkah menghitung maju: mulai dari a, lalu b kali maju satu. */
export function hitungMaju(a: number, b: number): number[] {
  return Array.from({ length: b + 1 }, (_, i) => a + i);
}

export function ucapanTambah(a: number, b: number, gabung: boolean): string {
  const c = a + b;
  if (!gabung) return `Ada ${a} benda merah dan ${b} benda biru. Tekan gabungkan untuk melihat semuanya.`;
  return `${a} ditambah ${b} sama dengan ${c}. Kalau ditukar, ${b} ditambah ${a} juga sama dengan ${c}. Menukar tempat tidak mengubah jumlahnya.`;
}
