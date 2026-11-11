/**
 * Laboratorium Bilangan 50 (Kelas 2 Bab 1): model PhET.
 * Satu bilangan n (0 sampai 50) terlihat sebagai batang puluhan, satuan lepas,
 * tabel nilai tempat, dan garis bilangan. Mengubah n di satu tampilan mengubah semua.
 * Murni: tanpa React, tanpa jaringan. Diuji di scripts/uji-lab-k2b1.mjs.
 */

export const MAKS = 50;

export const batas = (n: number) => Math.max(0, Math.min(MAKS, Math.round(n)));

export function uraiNilai(n: number): { puluhan: number; satuan: number } {
  const nn = batas(n);
  return { puluhan: Math.floor(nn / 10), satuan: nn % 10 };
}

export const kalimatNilai = (n: number) => {
  const u = uraiNilai(n);
  return `${n} = ${u.puluhan} puluhan + ${u.satuan} satuan`;
};

/** Ketuk batang ke-i (0..4): set puluhan menjadi i+1, satuan tetap (dipotong bila > MAKS). */
export function ketukBatang(n: number, i: number): number {
  const u = uraiNilai(n);
  const puluhanBaru = i + 1 === u.puluhan ? Math.max(0, u.puluhan - 1) : i + 1;
  return batas(puluhanBaru * 10 + u.satuan);
}

/** Ketuk satuan ke-i (0..9): set satuan menjadi i+1, atau kurangi bila ketuk yang terakhir. */
export function ketukSatuan(n: number, i: number): number {
  const u = uraiNilai(n);
  const satuanBaru = i + 1 === u.satuan ? Math.max(0, u.satuan - 1) : i + 1;
  return batas(u.puluhan * 10 + satuanBaru);
}

export const bisaIkat = (n: number) => n >= 10;

export type Banding = { simbol: "<" | ">" | "="; alasan: string };

/** Membandingkan dua bilangan dengan nilai tempat: lihat puluhan dulu, bila sama lihat satuan. */
export function bandingkanNilaiTempat(n: number, m: number): Banding {
  const a = uraiNilai(n);
  const b = uraiNilai(m);
  if (n === m) {
    return {
      simbol: "=",
      alasan: `Puluhannya sama (${a.puluhan}) dan satuannya sama (${a.satuan}), jadi ${n} sama dengan ${m}.`,
    };
  }
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

export function ucapanLab50(n: number, ikat: boolean): string {
  const u = uraiNilai(n);
  if (n < 10) return `Bilangan ${n}. Belum ada satu puluhan. Hanya ada ${u.satuan} satuan.`;
  const ikatan = ikat ? ` Batang puluhan ditampilkan sebagai kelompok sepuluh.` : "";
  return `Bilangan ${n}. Terdiri dari ${u.puluhan} puluhan dan ${u.satuan} satuan.${ikatan}`;
}

/** Awal lab: bilangan contoh dari buku (26 tas/permen). */
export const AWAL_N = 26;
export const AWAL_M = 32;
