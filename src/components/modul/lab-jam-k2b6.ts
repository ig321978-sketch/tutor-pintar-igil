/**
 * Lab Jam (Kelas 2 Bab 6, Sub-Bab B: Waktu): model PhET.
 * Satu model (jam 0 sampai 23), banyak perwakilan terhubung: jam analog (jarum pendek dan jarum panjang di angka 12),
 * jam digital, bagian hari, dan kalimat. Jarum yang sama muncul dua kali sehari (pagi dan malam, siang dan malam),
 * jadi jam analog saja tidak cukup: bagian hari atau jam digital yang membedakan. Hanya jam tepat (menit 0).
 * Murni: tanpa React, tanpa jaringan, tanpa impor nilai. Diuji di scripts/uji-lab-k2b6.mjs.
 */

import type { KeadaanLabJam } from "./misi-k2bab6";

export type BagianHariJam = "pagi" | "siang" | "sore" | "malam";
export const URUT_BAGIAN_JAM: BagianHariJam[] = ["pagi", "siang", "sore", "malam"];

/** Pagi 4 sampai 10, siang 11 sampai 14, sore 15 sampai 17, malam 18 sampai 3. */
export function bagianHariJam(jam24: number): BagianHariJam {
  if (jam24 >= 4 && jam24 <= 10) return "pagi";
  if (jam24 >= 11 && jam24 <= 14) return "siang";
  if (jam24 >= 15 && jam24 <= 17) return "sore";
  return "malam";
}

/** Angka di muka jam (1 sampai 12) yang ditunjuk jarum pendek. */
export const angkaJam12 = (jam24: number): number => ((jam24 + 11) % 12) + 1;
export const digitalJam = (jam24: number): string => `${String(jam24).padStart(2, "0")}.00`;
export const sebutPukulJam = (jam24: number): string => `pukul ${angkaJam12(jam24)} ${bagianHariJam(jam24)}`;
/** Jam lain yang jarum pendeknya sama persis (selisih 12 jam). */
export const jamPadanan = (jam24: number): number => (jam24 + 12) % 24;

export const AWAL_JAM = 9;

export type LabJam = {
  jam24: number;
  digital: boolean;
  bagian: boolean;
  pernah: number[];
  bagianLihat: BagianHariJam[];
  ketuk: number[];
};

export const awalJam = (): LabJam => ({ jam24: AWAL_JAM, digital: false, bagian: false, pernah: [AWAL_JAM], bagianLihat: [], ketuk: [] });

const tambahUnik = <T,>(a: T[], x: T): T[] => (a.includes(x) ? a : [...a, x]);

/** Menetapkan jam baru dan mencatat jam yang pernah tampil serta bagian hari yang pernah dilihat. */
function tetapkan(l: LabJam, jam24: number): LabJam {
  const j = ((jam24 % 24) + 24) % 24;
  const bagianLihat = l.bagian ? tambahUnik(l.bagianLihat, bagianHariJam(j)) : l.bagianLihat;
  return { ...l, jam24: j, pernah: tambahUnik(l.pernah, j), bagianLihat };
}

export const ubahJam = (l: LabJam, delta: number): LabJam => tetapkan(l, l.jam24 + delta);

/** Mengetuk angka di muka jam: jarum pendek pindah ke angka itu dan tetap di paruh hari yang sama (0-11 atau 12-23). */
export function ketukAngka(l: LabJam, n: number): LabJam {
  const paruh = l.jam24 >= 12 ? 12 : 0;
  const baru = tetapkan(l, (n % 12) + paruh);
  return { ...baru, ketuk: tambahUnik(l.ketuk, n) };
}

export const nyalakanDigital = (l: LabJam, nyala: boolean): LabJam => ({ ...l, digital: nyala });

export function nyalakanBagian(l: LabJam, nyala: boolean): LabJam {
  const baru = { ...l, bagian: nyala };
  return nyala ? { ...baru, bagianLihat: tambahUnik(l.bagianLihat, bagianHariJam(l.jam24)) } : baru;
}

/** Mengembalikan model dan pilihan tampilan ke awal. */
export const resetJam = (): LabJam => awalJam();

/** Laporan keadaan ke papan misi. */
export const laporanJam = (l: LabJam): KeadaanLabJam => ({
  alat: "jam",
  jam24: l.jam24,
  digital: l.digital,
  bagian: l.bagian,
  pernah: l.pernah,
  bagianLihat: l.bagianLihat,
  ketuk: l.ketuk,
});

export function kalimatJam(l: LabJam): string {
  const j = l.jam24;
  let t = `Jarum pendek di angka ${angkaJam12(j)}, jarum panjang di angka 12. Itu ${sebutPukulJam(j)}.`;
  if (l.digital) t += ` Jam digital menulis ${digitalJam(j)}.`;
  if (l.bagian) t += ` Bagian harinya ${bagianHariJam(j)}.`;
  return t;
}

/** Kalimat tentang waktu lain dengan jarum yang sama. Selalu bagian hari berbeda. */
export function kalimatPadanan(l: LabJam): string {
  const p = jamPadanan(l.jam24);
  const dig = l.digital ? ` (${digitalJam(p)})` : "";
  return `Jarumnya juga sama pada ${sebutPukulJam(p)}${dig}. Yang membedakan: bagian harinya${l.digital ? " dan tulisan jam digitalnya" : ""}.`;
}
