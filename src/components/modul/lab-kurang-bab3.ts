import type { SelBingkai } from "./komponen-lab";

/**
 * Laboratorium Pengurangan (Bab 3): model PhET. Total t benda, k benda diambil (dicoret), sisa t − k.
 * Satu pasang bilangan terlihat sebagai benda dicoret, bingkai sepuluh, garis bilangan mundur, bagan pasangan,
 * dan keluarga fakta (dua penjumlahan dan dua pengurangan). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas1.mjs.
 */

export const MAKS = 10;

export const sisa = (t: number, k: number) => t - k;

/**
 * Keadaan lab adalah daftar benda: true berarti benda itu dicoret (diambil). Banyak benda t = panjang daftar,
 * banyak diambil k = jumlah yang dicoret. Anak boleh mencoret benda mana saja.
 */
export const banyakDicoret = (coret: boolean[]) => coret.filter(Boolean).length;

export const awalCoret = (t: number, k: number): boolean[] => Array.from({ length: t }, (_, i) => i >= t - k);

/** Tambah atau kurangi banyak benda. Benda baru belum dicoret; benda yang dibuang adalah yang paling kanan. */
export function ubahTotal(coret: boolean[], delta: 1 | -1): boolean[] {
  if (delta > 0) return coret.length >= MAKS ? coret : [...coret, false];
  return coret.slice(0, -1);
}

/** Tambah diambil: mencoret benda paling kanan yang belum dicoret. Kurangi: mengembalikan benda dicoret paling kiri. */
export function ubahAmbil(coret: boolean[], delta: 1 | -1): boolean[] {
  const salinan = [...coret];
  if (delta > 0) {
    for (let i = salinan.length - 1; i >= 0; i -= 1) {
      if (!salinan[i]) {
        salinan[i] = true;
        break;
      }
    }
    return salinan;
  }
  const i = salinan.indexOf(true);
  if (i >= 0) salinan[i] = false;
  return salinan;
}

/** Ketuk benda ke-i: dicoret menjadi tidak dicoret, dan sebaliknya. */
export function ketukBenda(coret: boolean[], i: number): boolean[] {
  if (i < 0 || i >= coret.length) return coret;
  return coret.map((x, k) => (k === i ? !x : x));
}

/** Bingkai sepuluh: sisa kotak merah, lalu k kotak dicoret, selebihnya kosong. */
export function selKurang(t: number, k: number): SelBingkai[] {
  const s = sisa(t, k);
  return Array.from({ length: MAKS }, (_, i): SelBingkai => (i < s ? "a" : i < t ? "coret" : "kosong"));
}

export const kalimatKurang = (t: number, k: number) => `${t} − ${k} = ${sisa(t, k)}`;

/** Keluarga fakta: dua penjumlahan dan dua pengurangan dari tiga bilangan yang sama. Kalimat kembar dibuang. */
export function keluargaFakta(t: number, k: number): string[] {
  const s = sisa(t, k);
  const semua = [`${s} + ${k} = ${t}`, `${k} + ${s} = ${t}`, `${t} − ${k} = ${s}`, `${t} − ${s} = ${k}`];
  return semua.filter((x, i) => semua.indexOf(x) === i);
}

export function ucapanKurang(t: number, k: number): string {
  const s = sisa(t, k);
  return `Ada ${t} benda. ${k} benda diambil. Sisanya ${s}. ${t} dikurangi ${k} sama dengan ${s}. Pasangannya, ${s} ditambah ${k} sama dengan ${t}.`;
}
