import type { SelBingkai } from "./komponen-lab";

/**
 * Laboratorium Puluhan dan Satuan (Bab 5): model PhET. Satu bilangan n (0 sampai 20) terlihat serentak sebagai
 * benda yang bisa diikat sepuluh-sepuluh, dua bingkai sepuluh, tabel nilai tempat, dan garis bilangan.
 * Mengubah n lewat satu tampilan mengubah semua tampilan lain. Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas1.mjs.
 */

export const MAKS = 20;

export const batas = (n: number) => Math.max(0, Math.min(MAKS, Math.round(n)));

export function uraiNilai(n: number): { puluhan: number; satuan: number } {
  const nn = batas(n);
  return { puluhan: Math.floor(nn / 10), satuan: nn % 10 };
}

export const kalimatNilai = (n: number) => {
  const u = uraiNilai(n);
  return `${n} = ${u.puluhan} puluhan + ${u.satuan} satuan`;
};

/** Dua bingkai sepuluh: yang pertama penuh dulu (merah), sisanya masuk bingkai kedua (biru). */
export function selDuaBingkai(n: number): [SelBingkai[], SelBingkai[]] {
  const nn = batas(n);
  const pertama = Array.from({ length: 10 }, (_, i): SelBingkai => (i < Math.min(nn, 10) ? "a" : "kosong"));
  const kedua = Array.from({ length: 10 }, (_, i): SelBingkai => (i < Math.max(0, nn - 10) ? "b" : "kosong"));
  return [pertama, kedua];
}

/** Ketuk benda ke-i (0 sampai 19): bilangan menjadi i+1; ketuk yang terakhir mengurangi satu. */
export const ketukBenda = (n: number, i: number) => (i + 1 === n ? batas(n - 1) : batas(i + 1));

/** Benda yang bisa diikat: sepuluh pertama, hanya bila n sudah mencapai 10. */
export const bisaIkat = (n: number) => n >= 10;

export type Banding = { simbol: "<" | ">" | "="; alasan: string };

/** Membandingkan dua bilangan dengan nilai tempat: lihat puluhan dulu, bila sama lihat satuan. */
export function bandingkanNilaiTempat(n: number, m: number): Banding {
  const a = uraiNilai(n);
  const b = uraiNilai(m);
  if (n === m) return { simbol: "=", alasan: `Puluhannya sama (${a.puluhan}) dan satuannya sama (${a.satuan}), jadi ${n} sama dengan ${m}.` };
  if (a.puluhan !== b.puluhan) {
    const besar = a.puluhan > b.puluhan ? n : m;
    const kecil = a.puluhan > b.puluhan ? m : n;
    return {
      simbol: a.puluhan > b.puluhan ? ">" : "<",
      alasan: `Puluhan ${a.puluhan} dan ${b.puluhan}. Puluhan lebih banyak berarti bilangannya lebih besar, jadi ${besar} lebih besar dari ${kecil}.`,
    };
  }
  const besar = a.satuan > b.satuan ? n : m;
  const kecil = a.satuan > b.satuan ? m : n;
  return {
    simbol: a.satuan > b.satuan ? ">" : "<",
    alasan: `Puluhannya sama (${a.puluhan}). Lihat satuan: ${a.satuan} dan ${b.satuan}. Jadi ${besar} lebih besar dari ${kecil}.`,
  };
}

export function ucapanPuluhan(n: number, ikat: boolean): string {
  const u = uraiNilai(n);
  if (n < 10) return `Bilangan ${n}. Belum ada satu puluhan. Hanya ada ${u.satuan} satuan.`;
  const ikatan = ikat ? ` Sepuluh benda sudah diikat menjadi satu puluhan.` : "";
  return `Bilangan ${n}. Terdiri dari ${u.puluhan} puluhan dan ${u.satuan} satuan.${ikatan}`;
}
