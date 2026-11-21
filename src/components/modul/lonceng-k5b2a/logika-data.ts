/**
 * Logika murni Kelas 5 Bab 2 Sub-Bab A "Lonceng Bu Marni" (kelipatan): kelipatan = bilangan bulat dikali bilangan itu, nol bukan kelipatan,
 * daftar kelipatan (tambah jarak yang sama), tabel bilangan berwarna, dan pemeriksaan dengan pembagian (habis tanpa sisa).
 * Tanpa React dan tanpa jaringan; diuji di Node: scripts/uji-lonceng-k5b2a.mjs. Gambar tabel dan garis lompat DIGAMBAR dari data ini.
 */
import { kataK5B1, lambangK5B1 } from "../eja-k5b1";

export const kata = (n: number): string => kataK5B1(n);
export const lambang = (n: number): string => lambangK5B1(n);
export const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

/** Kelipatan ke-p dari b: p dikali b (p bilangan bulat mulai satu; nol bukan kelipatan). */
export const kelipatanKe = (b: number, p: number): number => b * p;
/** Semua kelipatan b sampai batas, dari yang pertama: b, 2b, 3b, dan seterusnya. */
export function daftarKelipatan(b: number, batas: number): number[] {
  const hasil: number[] = [];
  for (let n = b; n <= batas; n += b) hasil.push(n);
  return hasil;
}
export const banyakKelipatan = (b: number, batas: number): number => daftarKelipatan(b, batas).length;
/** Sisa pembagian dan hasil bagi bulat. */
export const sisaBagi = (n: number, b: number): number => n % b;
export const hasilBagi = (n: number, b: number): number => Math.floor(n / b);
/** Kelipatan b: habis dibagi b tanpa sisa DAN bukan nol. */
export const adalahKelipatan = (n: number, b: number): boolean => n > 0 && n % b === 0;
/** Kelipatan ke berapa (0 bila bukan kelipatan). */
export const urutKelipatan = (n: number, b: number): number => (adalahKelipatan(n, b) ? n / b : 0);

/** Tulisan hasil pembagian untuk pilihan klik: "habis, kelipatan", "habis, bukan kelipatan" (hanya nol), atau "bersisa 2, bukan kelipatan". */
export function teksBagi(n: number, b: number): string {
  const s = sisaBagi(n, b);
  if (s === 0) return n > 0 ? "habis, kelipatan" : "habis, bukan kelipatan";
  return `bersisa ${s}, bukan kelipatan`;
}

/** Lompatan dari nol dengan jarak b: posisi pendaratan sesudah p lompatan (p mulai nol). */
export const posisiLompat = (b: number, p: number): number => b * p;

/* ------------------------------ Tabel bilangan ------------------------------ */
export const KOLOM_TABEL = 10;
export type SelTabel = { n: number; baris: number; kolom: number };
/** Sel tabel bilangan satu sampai `sampai`, sepuluh kolom per baris. */
export function selTabel(sampai: number): SelTabel[] {
  return Array.from({ length: sampai }, (_, i) => ({ n: i + 1, baris: Math.floor(i / KOLOM_TABEL), kolom: i % KOLOM_TABEL }));
}
export const banyakBaris = (sampai: number): number => Math.ceil(sampai / KOLOM_TABEL);
/** Bilangan yang diwarnai pada tabel untuk kelipatan b. */
export const berwarna = (b: number, sampai: number): number[] => daftarKelipatan(b, sampai);

/** Tata letak tabel pada kanvas 300 lebar: sel w x h dimulai dari (x0, y0). */
export const TATA_TABEL = { x0: 10, y0: 26, w: 28, h: 22 } as const;
export const tinggiTabel = (sampai: number): number => TATA_TABEL.y0 + banyakBaris(sampai) * TATA_TABEL.h + 8;
export function posisiSel(n: number): { x: number; y: number } {
  const i = n - 1;
  return { x: TATA_TABEL.x0 + (i % KOLOM_TABEL) * TATA_TABEL.w, y: TATA_TABEL.y0 + Math.floor(i / KOLOM_TABEL) * TATA_TABEL.h };
}

/* ------------------------------ Pita pembagian ------------------------------ */
/** Pita sepanjang n dipotong tiap b: banyak potongan penuh dan sisanya. */
export type PotongPita = { penuh: number; sisa: number };
export const potongPita = (n: number, b: number): PotongPita => ({ penuh: Math.floor(n / b), sisa: n % b });
