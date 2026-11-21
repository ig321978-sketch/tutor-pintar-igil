/**
 * Logika murni tabel tempat Kelas 5 Bab 1 Sub-Bab A "Tiket Tribun Bu Ningsih": kolom tempat (satuan sampai ratusan ribu), angka tiap kolom,
 * nol penjaga, titik pemisah ribuan, periode, uraian, dan tata letak papan angka. Tanpa React dan tanpa jaringan; diuji di Node: scripts/uji-tribun-k5b1a.mjs.
 * Papan DIGAMBAR dari bilangan lewat tataTempat: tiap kolom satu angka, banyak kolom paling sedikit lima, enam hanya untuk seratus ribu.
 * Angka tiap kolom dibaca dari teks bilangan (bukan dari sisa bagi), jadi bisa dicocokkan dengan hitungan lain pada uji.
 */
import { kataK5B1, lambangK5B1 } from "../eja-k5b1";

/** Nama kolom dari kanan ke kiri: indeks 0 = satuan. */
export const NAMA_KOLOM: readonly string[] = ["satuan", "puluhan", "ratusan", "ribuan", "puluh ribuan", "ratusan ribu"];
/** Banyak yang diwakili satu angka 1 di kolom itu. */
export const ARTI_KOLOM: readonly number[] = [1, 10, 100, 1000, 10000, 100000];
/** Bilangan terbesar yang dibahas di Sub-Bab ini. */
export const BATAS = 100000;

export const kata = (n: number): string => kataK5B1(n);
/** Bilangan dengan titik pemisah ribuan: 24350 menjadi "24.350". */
export const lambang = (n: number): string => lambangK5B1(n);
export const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

/** Angka-angka bilangan dari kiri ke kanan, dibaca dari teksnya. */
export const angkaDari = (n: number): number[] => Array.from(String(n), Number);
export const banyakAngka = (n: number): number => String(n).length;
/** Banyak kolom papan: lima, atau enam untuk seratus ribu. */
export const banyakKolom = (n: number): number => Math.max(5, banyakAngka(n));
/** Angka pada kolom ke-k (0 = satuan). Kolom di kiri angka pertama berisi nol. */
export function angkaKolom(n: number, k: number): number {
  const s = String(n);
  const i = s.length - 1 - k;
  return i >= 0 ? Number(s[i]) : 0;
}
/** Nama kolom dari angka pada posisi kolom k. */
export const namaKolom = (k: number): string => NAMA_KOLOM[k];

/** Kolom (indeks, 0 = satuan) yang berisi nol di dalam bilangan: nol penjaga tempat, urut dari kolom paling kiri. */
export function kolomNol(n: number): number[] {
  const s = String(n);
  return Array.from(s, (c, i) => (c === "0" ? s.length - 1 - i : -1)).filter((k) => k >= 0);
}
export const banyakNol = (n: number): number => kolomNol(n).length;
/** Angka sama tidak muncul dua kali di bilangan (supaya "angka itu berada di kolom apa" tidak ambigu). */
export const angkaUnik = (n: number): boolean => new Set(angkaDari(n)).size === banyakAngka(n);
/** Kolom tempat angka d berada (khusus bilangan dengan angka unik), atau -1. */
export function kolomDariAngka(n: number, d: number): number {
  const s = String(n);
  const i = s.indexOf(String(d));
  return i >= 0 && s.indexOf(String(d), i + 1) < 0 ? s.length - 1 - i : -1;
}

/* ------------------------------ Titik pemisah dan periode ------------------------------ */
/** Banyak angka pada periode kiri (di kiri titik): tiga angka terakhir adalah periode kanan. */
export const angkaPeriodeKiri = (n: number): number => Math.max(0, banyakAngka(n) - 3);
export const periodeKiri = (n: number): string => String(n).slice(0, angkaPeriodeKiri(n));
export const periodeKanan = (n: number): string => String(n).slice(angkaPeriodeKiri(n));
/** Deret angka polos dengan titik setelah `p` angka dari kiri; p di luar deret tidak menaruh titik. */
export const sisipTitik = (s: string, p: number): string => (p > 0 && p < s.length ? `${s.slice(0, p)}.${s.slice(p)}` : s);
/** Bacaan per periode dari tiga angka: "ratus", "puluh", dan seterusnya sudah ada di kata bilangan; di sini periode kiri disambung kata ribu. */
export const bacaPeriode = (n: number): { kiri: string; kanan: string } => ({
  kiri: angkaPeriodeKiri(n) > 0 ? kataK5B1(Number(periodeKiri(n))) : "",
  kanan: Number(periodeKanan(n)) > 0 || angkaPeriodeKiri(n) === 0 ? kataK5B1(Number(periodeKanan(n))) : "",
});

/* ------------------------------ Uraian ------------------------------ */
export type Suku = { kolom: number; angka: number; mewakili: number };
/** Uraian: tiap angka bukan nol dengan banyak yang diwakilinya menurut kolom (dari kolom terbesar). */
export function uraian(n: number): Suku[] {
  const hasil: Suku[] = [];
  for (let k = banyakAngka(n) - 1; k >= 0; k -= 1) {
    const a = angkaKolom(n, k);
    if (a > 0) hasil.push({ kolom: k, angka: a, mewakili: a * ARTI_KOLOM[k] });
  }
  return hasil;
}
export const teksUraian = (n: number): string => uraian(n).map((s) => lambang(s.mewakili)).join(" + ");

/* ------------------------------ Tata letak papan (kanvas 300 lebar) ------------------------------ */
export const TATA = { lebar: 300, atasHeader: 26, tinggiHeader: 26, tinggiSel: 44, celahTitik: 12 } as const;
export type SelTata = { x: number; w: number; kolom: number };
export type TataTempat = { sel: SelTata[]; titikX: number | null; yHeader: number; ySel: number; yLegenda: number; tinggi: number; lebarTotal: number };

/** Sel tiap kolom dari kiri ke kanan; titik pemisah di antara ribuan dan ratusan bila `titik`. */
export function tataTempat(c: number, titik: boolean): TataTempat {
  const w = c > 5 ? 41 : 48;
  const celah = titik ? TATA.celahTitik : 0;
  const lebarTotal = c * w + celah;
  const x0 = (TATA.lebar - lebarTotal) / 2;
  const sel: SelTata[] = [];
  let x = x0;
  let titikX: number | null = null;
  for (let i = 0; i < c; i += 1) {
    const kolom = c - 1 - i;
    sel.push({ x, w, kolom });
    x += w;
    if (kolom === 3 && titik) {
      titikX = x + celah / 2;
      x += celah;
    }
  }
  const yHeader = TATA.atasHeader;
  const ySel = yHeader + TATA.tinggiHeader + 4;
  const yLegenda = ySel + TATA.tinggiSel + 8;
  return { sel, titikX, yHeader, ySel, yLegenda, tinggi: yLegenda + 30, lebarTotal };
}
