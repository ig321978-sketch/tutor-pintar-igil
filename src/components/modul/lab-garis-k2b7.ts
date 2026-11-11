/**
 * Lab Garis Seratus (Kelas 2 Bab 7, Sub-Bab B): model PhET.
 * Satu model: posisi n (1 sampai 100) di garis bilangan dan banyak langkah k (1 sampai 10). Maju ke kanan mencari
 * bilangan yang lebihnya, mundur ke kiri mencari bilangan yang kurangnya. Perwakilan: garis dengan penanda,
 * lengkung lompatan, papan nilai tempat sebelum dan sesudah, dan kalimat. Melewati puluhan penuh (58 ke 62) mengubah
 * puluhan dan satuan sekaligus; bila tidak melewatinya, hanya satuan yang berubah.
 * Murni: tanpa React, tanpa jaringan, tanpa impor nilai. Diuji di scripts/uji-lab-k2b7.mjs.
 */

import type { KeadaanLabGaris, LangkahGarisMisi } from "./misi-k2bab7";

export const MIN_GARIS = 1;
export const MAKS_GARIS = 100;
export const MAKS_LANGKAH = 10;
/** Lebar jendela garis yang tampil (jumlah kotak). */
export const LEBAR_JENDELA = 13;

export type LangkahGaris = LangkahGarisMisi;

export type LabGaris = {
  n: number;
  k: number;
  lengkung: boolean;
  papan: boolean;
  terakhir: LangkahGaris | null;
  riwayat: LangkahGaris[];
  ketuk: number[];
  catatan: string;
};

export const AWAL_GARIS = 50;

export const awalGaris = (): LabGaris => ({
  n: AWAL_GARIS,
  k: 1,
  lengkung: false,
  papan: false,
  terakhir: null,
  riwayat: [],
  ketuk: [],
  catatan: "",
});

const batasi = (n: number): number => Math.max(MIN_GARIS, Math.min(MAKS_GARIS, Math.round(n)));
const tambahUnik = (a: number[], x: number): number[] => (a.includes(x) ? a : [...a, x]);

export const puluhanGaris = (n: number): number => Math.floor(n / 10);
export const satuanGaris = (n: number): number => n % 10;

/** Awal jendela garis: penanda tetap berada di dalam jendela dan jendela tidak keluar dari 1 sampai 100. */
export function awalJendela(n: number): number {
  const dari = n - Math.floor(LEBAR_JENDELA / 2);
  return Math.max(MIN_GARIS, Math.min(MAKS_GARIS - LEBAR_JENDELA + 1, dari));
}

export const bisaMaju = (l: LabGaris): boolean => l.n + l.k <= MAKS_GARIS;
export const bisaMundur = (l: LabGaris): boolean => l.n - l.k >= MIN_GARIS;

/** Mengubah posisi satu langkah (Pengatur). Lompatan terakhir tidak lagi berlaku, karena posisi berpindah. */
export function ubahPosisiGaris(l: LabGaris, delta: number): LabGaris {
  const n = batasi(l.n + delta);
  if (n === l.n) return { ...l, catatan: delta > 0 ? "Garis ini berhenti di 100." : "Garis ini mulai dari 1." };
  return { ...l, n, terakhir: null, catatan: "" };
}

/** Mengetuk sebuah kotak di garis: penanda pindah ke sana. */
export function aturPosisiGaris(l: LabGaris, n: number): LabGaris {
  if (!Number.isInteger(n) || n < MIN_GARIS || n > MAKS_GARIS) return l;
  return { ...l, n, terakhir: null, ketuk: tambahUnik(l.ketuk, n), catatan: "" };
}

export function ubahLangkahGaris(l: LabGaris, delta: number): LabGaris {
  const k = Math.max(1, Math.min(MAKS_LANGKAH, l.k + delta));
  return { ...l, k, catatan: "" };
}

function lompat(l: LabGaris, arah: "maju" | "mundur"): LabGaris {
  const ke = arah === "maju" ? l.n + l.k : l.n - l.k;
  if (ke < MIN_GARIS || ke > MAKS_GARIS) {
    return { ...l, catatan: arah === "maju" ? "Garis ini berhenti di 100. Kurangi banyak langkahnya." : "Garis ini mulai dari 1. Kurangi banyak langkahnya." };
  }
  const t: LangkahGaris = { dari: l.n, ke, arah, k: l.k };
  return { ...l, n: ke, terakhir: t, riwayat: [...l.riwayat, t].slice(-30), catatan: "" };
}

export const majuGaris = (l: LabGaris): LabGaris => lompat(l, "maju");
export const mundurGaris = (l: LabGaris): LabGaris => lompat(l, "mundur");

export type TampilGaris = "lengkung" | "papan";
export const nyalakanGaris = (l: LabGaris, kunci: TampilGaris, nyala: boolean): LabGaris => ({ ...l, [kunci]: nyala });

/** Mengembalikan model dan semua pilihan tampilan ke awal. */
export const resetGaris = (): LabGaris => awalGaris();

/** Lompatan itu melewati puluhan penuh (puluhan sebelum dan sesudah berbeda). */
export const lintasGaris = (t: LangkahGaris): boolean => puluhanGaris(t.dari) !== puluhanGaris(t.ke);

/** Kalimat posisi atau lompatan terakhir. */
export function kalimatGaris(l: LabGaris): string {
  const t = l.terakhir;
  if (t === null) {
    if (l.n === MIN_GARIS) return `Penanda berada di bilangan ${l.n}. Sesudahnya bilangan ${l.n + 1}.`;
    if (l.n === MAKS_GARIS) return `Penanda berada di bilangan ${l.n}. Sebelumnya bilangan ${l.n - 1}.`;
    return `Penanda berada di bilangan ${l.n}. Ia berada di antara ${l.n - 1} dan ${l.n + 1}.`;
  }
  return t.arah === "maju"
    ? `${t.dari} maju ${t.k} langkah ke ${t.ke}. Jadi ${t.k} lebihnya dari ${t.dari} adalah ${t.ke}.`
    : `${t.dari} mundur ${t.k} langkah ke ${t.ke}. Jadi ${t.k} kurangnya dari ${t.dari} adalah ${t.ke}.`;
}

/** Catatan di bawah papan nilai tempat: apa yang berubah dari lompatan terakhir. */
export function catatanPapanGaris(l: LabGaris): string {
  const t = l.terakhir;
  if (t === null) return "Lompat dulu, lalu lihat papan sebelum dan sesudahnya.";
  if (lintasGaris(t)) {
    return `Puluhan berubah dari ${puluhanGaris(t.dari)} menjadi ${puluhanGaris(t.ke)}, dan satuan berubah dari ${satuanGaris(t.dari)} menjadi ${satuanGaris(t.ke)}.`;
  }
  return `Puluhan tetap ${puluhanGaris(t.dari)}. Yang berubah hanya satuan: dari ${satuanGaris(t.dari)} menjadi ${satuanGaris(t.ke)}.`;
}

/** Laporan keadaan ke papan misi. */
export const laporanGaris = (l: LabGaris): KeadaanLabGaris => ({
  alat: "garis",
  n: l.n,
  k: l.k,
  lengkung: l.lengkung,
  papan: l.papan,
  terakhir: l.terakhir,
  riwayat: l.riwayat,
});
