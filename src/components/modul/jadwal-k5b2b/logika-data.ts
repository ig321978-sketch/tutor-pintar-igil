/**
 * Logika murni KPK Kelas 5 Bab 2 Sub-Bab B "Dua Lonceng Pak Tarno" (kelipatan persekutuan dan KPK). Tanpa React dan tanpa jaringan, diuji di Node:
 * scripts/uji-jadwal-k5b2b.mjs. Semua gambar (daftar kelipatan, tabel bilangan, jalur lonceng) dan jawaban dihitung dari fungsi di sini.
 * Cara menghitung: mendaftar kelipatan lalu mencari bilangan yang sama (sesuai materi). Uji menghitung ulang dengan cara berbeda (hasil kali dibagi FPB).
 */

/** Titik ribuan Indonesia: 1800 menjadi "1.800". */
export const fmt = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/** Kelipatan a dari a sampai batas `sampai` (a, 2a, 3a, ...). Nol bukan kelipatan. */
export function kelipatan(a: number, sampai: number): number[] {
  const hasil: number[] = [];
  for (let n = a; n <= sampai; n += a) hasil.push(n);
  return hasil;
}

/** Bilangan yang ada di semua daftar kelipatan sampai batas (kelipatan persekutuan). */
export function persekutuan(angka: number[], sampai: number): number[] {
  const daftar = angka.map((a) => kelipatan(a, sampai));
  return daftar[0].filter((n) => daftar.every((d) => d.includes(n)));
}

/** KPK dengan cara mendaftar: kelipatan persekutuan paling kecil dari daftar yang cukup panjang (sampai hasil kali semua bilangan). */
export function kpk(angka: number[]): number {
  const batas = angka.reduce((t, a) => t * a, 1);
  const p = persekutuan(angka, batas);
  return p[0];
}

/** Berapa kali dua jadwal bersama lagi sesudah awal, dalam waktu `total` (awal tidak dihitung). */
export function kaliBersamaLagi(angka: number[], total: number): number {
  return persekutuan(angka, total).length;
}

/** KPK kelipatan ke berapa dari a (a, 2a, ...). */
export function kelipatanKe(a: number, n: number): number {
  return kelipatan(a, n).length;
}

export type Anggota = "pertama" | "kedua" | "keduanya" | "tidak";
/** Bilangan n ada di daftar kelipatan pertama (a), kedua (b), atau keduanya. */
export function anggotaDaftar(a: number, b: number, n: number): Anggota {
  const dalamA = kelipatan(a, n).includes(n);
  const dalamB = kelipatan(b, n).includes(n);
  return dalamA && dalamB ? "keduanya" : dalamA ? "pertama" : dalamB ? "kedua" : "tidak";
}

/** Apakah n kelipatan persekutuan semua bilangan. */
export const kelipatanPersekutuan = (angka: number[], n: number): boolean => angka.every((a) => kelipatan(a, n).includes(n));

/** Tulisan daftar: "3, 6, 9, 12". */
export const tulisDaftar = (xs: number[]): string => xs.join(", ");

/* ------------------------------ Tabel bilangan ------------------------------ */
export type Sel = { n: number; dalam: boolean[] };
/** Tabel bilangan 1 sampai `sampai`: tiap sel mencatat apakah bilangan itu kelipatan tiap angka. Kolom tetap (baris demi baris, kiri ke kanan). */
export function tabelBilangan(angka: number[], sampai: number): Sel[] {
  return Array.from({ length: sampai }, (_, i) => ({ n: i + 1, dalam: angka.map((a) => (i + 1) % a === 0) }));
}
export const KOLOM_TABEL = 10;
export const barisTabel = (sampai: number): number => Math.ceil(sampai / KOLOM_TABEL);

/* ------------------------------ Jalur lonceng (Infografis) ------------------------------ */
export type Jalur = { lebar: number; x0: number; x1: number; sampai: number };
/** Skala jalur: titik waktu t berada pada x0 + t * (x1 - x0) / sampai. */
export const xJalur = (j: Jalur, t: number): number => Math.round((j.x0 + (t * (j.x1 - j.x0)) / j.sampai) * 100) / 100;
export const buatJalur = (sampai: number, lebar = 300, x0 = 16, x1 = 284): Jalur => ({ lebar, x0, x1, sampai });
/** Jarak terkecil antara dua titik pada satu jalur, dalam satuan gambar (untuk memastikan label tidak bertabrakan). */
export const jarakTitik = (j: Jalur, a: number): number => xJalur(j, a) - xJalur(j, 0);
