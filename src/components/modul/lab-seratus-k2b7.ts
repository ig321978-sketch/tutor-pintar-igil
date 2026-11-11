/**
 * Lab Seratus (Kelas 2 Bab 7, Sub-Bab A): model PhET.
 * Satu model: p puluhan (diikat) dan s satuan lepas, dengan banyak seluruhnya n = 10p + s (0 sampai 100).
 * Banyak perwakilan terhubung: batang puluhan dan kotak satuan, benda nyata, papan nilai tempat, pasangan bilangan,
 * nama bilangan, dan kalimat. Mengikat sepuluh satuan lepas menjadi satu puluhan TIDAK mengubah banyaknya.
 * Papan nilai tempat dan pasangan bilangan hanya jujur bila satuan lepas kurang dari sepuluh (terikat), jadi bila
 * masih ada sepuluh lepas atau lebih, keduanya ditahan sampai anak mengikatnya.
 * Murni: tanpa React, tanpa jaringan, tanpa impor nilai. Diuji di scripts/uji-lab-k2b7.mjs.
 */

import type { KeadaanLabSeratus } from "./misi-k2bab7";

export const MAKS_SERATUS = 100;
/** Satuan lepas paling banyak (sepuluh lepas ditambah sembilan). Lebih dari itu anak diminta mengikat dulu. */
export const MAKS_LEPAS = 19;

const KATA_SATUAN = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];

/** Nama bilangan 0 sampai 100, mis. 53 menjadi "lima puluh tiga". */
export function namaBilangan(n: number): string {
  if (n === 100) return "seratus";
  if (n === 0) return "nol";
  if (n < 10) return KATA_SATUAN[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${KATA_SATUAN[n - 10]} belas`;
  const p = Math.floor(n / 10);
  const s = n % 10;
  return `${KATA_SATUAN[p]} puluh${s ? ` ${KATA_SATUAN[s]}` : ""}`;
}

export type BendaSeratus = "kue" | "kelereng" | "rambutan";
export const URUT_BENDA_SERATUS: BendaSeratus[] = ["kue", "kelereng", "rambutan"];
export const INFO_BENDA_SERATUS: Record<BendaSeratus, { nama: string; wadah: string }> = {
  kue: { nama: "kue cubit", wadah: "bungkus" },
  kelereng: { nama: "kelereng", wadah: "kantong" },
  rambutan: { nama: "rambutan", wadah: "keranjang" },
};

export type TampilSeratus = "batang" | "benda" | "papan" | "pasangan" | "nama";
export const URUT_TAMPIL_SERATUS: TampilSeratus[] = ["batang", "benda", "papan", "pasangan", "nama"];

export type LabSeratus = {
  p: number;
  s: number;
  batang: boolean;
  benda: boolean;
  papan: boolean;
  pasangan: boolean;
  nama: boolean;
  jenis: BendaSeratus;
  pernah: number[];
  ikat: number;
  buka: number;
  catatan: string;
};

export const awalSeratus = (): LabSeratus => ({
  p: 0,
  s: 0,
  batang: true,
  benda: false,
  papan: false,
  pasangan: false,
  nama: false,
  jenis: "kue",
  pernah: [],
  ikat: 0,
  buka: 0,
  catatan: "",
});

export const nilaiSeratus = (l: LabSeratus): number => l.p * 10 + l.s;
/** Satuan lepas kurang dari sepuluh: tidak ada sepuluh yang belum diikat. */
export const terikatSeratus = (l: LabSeratus): boolean => l.s <= 9;

const tambahUnik = (a: number[], x: number): number[] => (a.includes(x) ? a : [...a, x]);

/** Mencatat bilangan yang pernah tampil dalam keadaan terikat (papan nilai tempat jujur). */
function catat(l: LabSeratus): LabSeratus {
  const n = nilaiSeratus(l);
  return terikatSeratus(l) && n > 0 ? { ...l, pernah: tambahUnik(l.pernah, n) } : l;
}

const dengan = (l: LabSeratus, ubah: Partial<LabSeratus>): LabSeratus => catat({ ...l, ...ubah });

export function tambahSatu(l: LabSeratus): LabSeratus {
  if (nilaiSeratus(l) >= MAKS_SERATUS) return { ...l, catatan: "Sudah seratus. Lab ini berhenti di seratus." };
  if (l.s >= MAKS_LEPAS) return { ...l, catatan: "Satuan lepas sudah banyak. Ikat sepuluh dulu menjadi satu puluhan." };
  const s = l.s + 1;
  return dengan(l, { s, catatan: s === 10 ? "Sudah ada sepuluh satuan lepas. Ikat menjadi satu puluhan." : "" });
}

export function kurangSatu(l: LabSeratus): LabSeratus {
  if (l.s <= 0) return { ...l, catatan: l.p > 0 ? "Tidak ada satuan lepas. Buka satu puluhan bila perlu." : "Belum ada satuan." };
  return dengan(l, { s: l.s - 1, catatan: "" });
}

export function tambahPuluh(l: LabSeratus): LabSeratus {
  if (nilaiSeratus(l) + 10 > MAKS_SERATUS) return { ...l, catatan: "Seratus adalah batas lab ini." };
  return dengan(l, { p: l.p + 1, catatan: "" });
}

export function kurangPuluh(l: LabSeratus): LabSeratus {
  if (l.p <= 0) return { ...l, catatan: "Belum ada puluhan." };
  return dengan(l, { p: l.p - 1, catatan: "" });
}

/** Mengikat sepuluh satuan lepas menjadi satu puluhan. Banyaknya tetap. */
export function ikatSepuluh(l: LabSeratus): LabSeratus {
  if (l.s < 10) return { ...l, catatan: "Belum ada sepuluh satuan lepas untuk diikat." };
  const n = nilaiSeratus(l);
  return dengan(l, { p: l.p + 1, s: l.s - 10, ikat: l.ikat + 1, catatan: `Sepuluh satuan lepas diikat menjadi satu puluhan. Banyaknya tetap ${n}.` });
}

/** Membuka satu puluhan menjadi sepuluh satuan lepas. Banyaknya tetap. */
export function bukaPuluhan(l: LabSeratus): LabSeratus {
  if (l.p <= 0) return { ...l, catatan: "Belum ada puluhan untuk dibuka." };
  if (l.s + 10 > MAKS_LEPAS) return { ...l, catatan: "Satuan lepas sudah terlalu banyak. Ikat sepuluh dulu." };
  const n = nilaiSeratus(l);
  return dengan(l, { p: l.p - 1, s: l.s + 10, buka: l.buka + 1, catatan: `Satu puluhan dibuka menjadi sepuluh satuan lepas. Banyaknya tetap ${n}.` });
}

/** Mengatur bilangan langsung (puluhan terikat dan satuan paling banyak sembilan). */
export function aturBilangan(l: LabSeratus, n: number): LabSeratus {
  const x = Math.max(0, Math.min(MAKS_SERATUS, Math.round(n)));
  return dengan(l, { p: Math.floor(x / 10), s: x % 10, catatan: "" });
}

export function nyalakanSeratus(l: LabSeratus, kunci: TampilSeratus, nyala: boolean): LabSeratus {
  return { ...l, [kunci]: nyala };
}

export const pilihBendaSeratus = (l: LabSeratus, jenis: BendaSeratus): LabSeratus => ({ ...l, jenis });

/** Mengembalikan model dan semua pilihan tampilan ke awal. */
export const resetSeratus = (): LabSeratus => awalSeratus();

/** Papan nilai tempat. Null bila masih ada sepuluh satuan lepas yang belum diikat. */
export function papanSeratus(l: LabSeratus): { puluhan: number; satuan: number } | null {
  return terikatSeratus(l) ? { puluhan: l.p, satuan: l.s } : null;
}

/** Pasangan bilangan: n = 10p + s. Null bila belum terikat. */
export function pasanganSeratus(l: LabSeratus): { total: number; a: number; b: number } | null {
  return terikatSeratus(l) ? { total: nilaiSeratus(l), a: l.p * 10, b: l.s } : null;
}

/** Kalimat model, ditambah nama dan pasangan bila perwakilannya menyala. */
export function kalimatSeratus(l: LabSeratus): string {
  const n = nilaiSeratus(l);
  if (n === 0) return "Belum ada benda. Tambah satuan atau puluhan.";
  if (!terikatSeratus(l)) return `Ada ${l.p} puluhan dan ${l.s} satuan lepas. Sepuluh satuan lepas bisa diikat menjadi satu puluhan.`;
  if (n === 100) return `Sepuluh puluhan sama dengan seratus.${l.nama ? " Dibaca seratus." : ""}${l.pasangan ? " 100 = 100 + 0." : ""}`;
  if (l.p === 0) return `Hanya ada ${n} satuan. Belum ada satu puluhan.${l.nama ? ` Dibaca ${namaBilangan(n)}.` : ""}`;
  let t = `${l.p} puluhan dan ${l.s} satuan sama dengan ${n}.`;
  if (l.pasangan) t += ` ${n} = ${l.p * 10} + ${l.s}.`;
  if (l.nama) t += ` Dibaca ${namaBilangan(n)}.`;
  return t;
}

/** Laporan keadaan ke papan misi. */
export const laporanSeratus = (l: LabSeratus): KeadaanLabSeratus => ({
  alat: "seratus",
  p: l.p,
  s: l.s,
  n: nilaiSeratus(l),
  terikat: terikatSeratus(l),
  papan: l.papan,
  pasangan: l.pasangan,
  nama: l.nama,
  benda: l.benda,
  pernah: l.pernah,
  ikat: l.ikat,
  buka: l.buka,
});
