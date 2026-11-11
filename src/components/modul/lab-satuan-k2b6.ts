/**
 * Lab Satuan (Kelas 2 Bab 6, Sub-Bab A: Berat): lab 2D alat ukur.
 * Satu benda ditimbang dengan satuan tidak baku (bola tenis, kelereng, koin, balok mainan) yang ditambah satu per satu
 * di piringan lain. Neraca seimbang hanya pada satu banyak satuan. Satuan yang lebih ringan butuh lebih banyak,
 * jadi hasil ukurnya (bilangan) berbeda untuk satuan berbeda, padahal bendanya sama. Hasil bukan "gram".
 * Murni: tanpa React, tanpa jaringan, tanpa impor nilai. Diuji di scripts/uji-lab-k2b6.mjs.
 */

import type { KeadaanLabSatuan } from "./misi-k2bab6";

export type BendaUkur = "stroberi" | "boneka" | "tas";
export type SatuanUkur = "bolaTenis" | "kelereng" | "koin" | "balok";

export const URUT_BENDA_UKUR: BendaUkur[] = ["stroberi", "boneka", "tas"];
export const URUT_SATUAN_UKUR: SatuanUkur[] = ["bolaTenis", "kelereng", "koin", "balok"];

export const NAMA_BENDA_UKUR: Record<BendaUkur, string> = { stroberi: "stroberi", boneka: "boneka", tas: "tas" };
export const NAMA_SATUAN_UKUR: Record<SatuanUkur, string> = { bolaTenis: "bola tenis", kelereng: "kelereng", koin: "koin", balok: "balok mainan" };

/** Berat nyata (gram). Hanya menggerakkan neraca, tidak ditampilkan sebagai angka. Semua kelipatan bulat satuan. */
export const BERAT_BENDA_UKUR: Record<BendaUkur, number> = { stroberi: 40, boneka: 80, tas: 120 };
export const BERAT_SATUAN_UKUR: Record<SatuanUkur, number> = { bolaTenis: 20, kelereng: 8, koin: 4, balok: 10 };

export const MAKS_SATUAN = 30;
export const AWAL_BENDA_UKUR: BendaUkur = "boneka";
export const AWAL_SATUAN_UKUR: SatuanUkur = "bolaTenis";

export type StatusUkur = "kurang" | "pas" | "lebih";

export function statusUkur(benda: BendaUkur, satuan: SatuanUkur, n: number): StatusUkur {
  const total = n * BERAT_SATUAN_UKUR[satuan];
  const b = BERAT_BENDA_UKUR[benda];
  return total < b ? "kurang" : total === b ? "pas" : "lebih";
}

/** -1: benda (kiri) lebih berat, turun. 0: seimbang. 1: satuan (kanan) lebih berat, turun. */
export const miringUkur = (benda: BendaUkur, satuan: SatuanUkur, n: number): -1 | 0 | 1 => {
  const s = statusUkur(benda, satuan, n);
  return s === "kurang" ? -1 : s === "pas" ? 0 : 1;
};

/** Banyak satuan yang membuat neraca seimbang. Semua kombinasi di sini bulat. */
export const banyakPas = (benda: BendaUkur, satuan: SatuanUkur): number => BERAT_BENDA_UKUR[benda] / BERAT_SATUAN_UKUR[satuan];

export type LabUkur = { benda: BendaUkur; satuan: SatuanUkur; n: number; hasil: Record<string, number> };

export const kunciHasil = (benda: BendaUkur, satuan: SatuanUkur) => `${benda}|${satuan}`;
export const awalUkur = (): LabUkur => ({ benda: AWAL_BENDA_UKUR, satuan: AWAL_SATUAN_UKUR, n: 0, hasil: {} });

/** Mencatat hasil bila neraca seimbang. Dipanggil setiap n berubah. */
function rekam(l: LabUkur): LabUkur {
  if (l.n > 0 && statusUkur(l.benda, l.satuan, l.n) === "pas") return { ...l, hasil: { ...l.hasil, [kunciHasil(l.benda, l.satuan)]: l.n } };
  return l;
}

export const pilihBendaUkur = (l: LabUkur, benda: BendaUkur): LabUkur => (benda === l.benda ? l : { ...l, benda, n: 0 });
export const pilihSatuanUkur = (l: LabUkur, satuan: SatuanUkur): LabUkur => (satuan === l.satuan ? l : { ...l, satuan, n: 0 });
export const ubahBanyak = (l: LabUkur, delta: number): LabUkur => rekam({ ...l, n: Math.max(0, Math.min(MAKS_SATUAN, l.n + delta)) });
/** Mengembalikan benda, satuan, dan banyak satuan ke awal. Hasil yang sudah tercatat tetap ada. */
export const resetUkur = (l: LabUkur): LabUkur => ({ ...awalUkur(), hasil: l.hasil });

/** Hasil tercatat untuk satu benda, urut dari satuan paling ringan (hitungan paling banyak). */
export function hasilBenda(l: LabUkur, benda: BendaUkur): { satuan: SatuanUkur; n: number }[] {
  const daftar: { satuan: SatuanUkur; n: number }[] = [];
  for (const s of URUT_SATUAN_UKUR) {
    const n = l.hasil[kunciHasil(benda, s)];
    if (n !== undefined) daftar.push({ satuan: s, n });
  }
  return daftar.sort((a, b) => b.n - a.n);
}

/** Laporan keadaan ke papan misi. */
export const laporanSatuan = (l: LabUkur, titik: boolean, tabel: boolean): KeadaanLabSatuan => ({
  alat: "satuan",
  benda: l.benda,
  satuan: l.satuan,
  n: l.n,
  hasil: l.hasil,
  titik,
  tabel,
  seimbang: statusUkur(l.benda, l.satuan, l.n) === "pas" && l.n > 0,
});

export function kalimatUkur(l: LabUkur): string {
  const b = NAMA_BENDA_UKUR[l.benda];
  const s = NAMA_SATUAN_UKUR[l.satuan];
  const st = statusUkur(l.benda, l.satuan, l.n);
  if (l.n === 0) return `Neraca berisi 1 ${b} di kiri. Tambah ${s} satu per satu di kanan.`;
  if (st === "kurang") return `${l.n} ${s} masih lebih ringan dari 1 ${b}. Tambah lagi.`;
  if (st === "pas") return `Seimbang! Berat 1 ${b} sama dengan ${l.n} ${s}.`;
  return `${l.n} ${s} sudah lebih berat dari 1 ${b}. Kurangi dulu.`;
}

/** Kalimat perbandingan dua satuan untuk satu benda, bila sudah ada dua hasil. */
export function kalimatBandingHasil(l: LabUkur): string {
  const h = hasilBenda(l, l.benda);
  if (h.length < 2) return "";
  const b = NAMA_BENDA_UKUR[l.benda];
  const [banyak, sedikit] = [h[0], h[h.length - 1]];
  const ringan = NAMA_SATUAN_UKUR[banyak.satuan];
  return `1 ${b} = ${banyak.n} ${ringan} dan juga ${sedikit.n} ${NAMA_SATUAN_UKUR[sedikit.satuan]}. ${ringan.charAt(0).toUpperCase() + ringan.slice(1)} lebih ringan, jadi hitungannya lebih banyak.`;
}

/** Baris tabel hasil: semua kombinasi benda dan satuan yang sudah seimbang. */
export function barisTabelUkur(l: LabUkur): { benda: BendaUkur; satuan: SatuanUkur; n: number }[] {
  const baris: { benda: BendaUkur; satuan: SatuanUkur; n: number }[] = [];
  for (const b of URUT_BENDA_UKUR) for (const h of hasilBenda(l, b)) baris.push({ benda: b, satuan: h.satuan, n: h.n });
  return baris;
}
