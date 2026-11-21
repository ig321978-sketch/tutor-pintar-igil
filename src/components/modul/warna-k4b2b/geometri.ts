/**
 * Geometri murni gambar pecahan K4 Bab 2 Sub-Bab B "Bak Warna Pak Joyo" (batang, bak, garis pecahan). Tanpa React, diuji di Node: scripts/uji-warna-k4b2b.mjs.
 * Gambar pecahan harus benar: batang dibagi q bagian SAMA BESAR yang berurutan tanpa celah, dan bagian berarsir sungguh sebanyak pembilang (dari kiri).
 * Garis dari nol sampai satu dibagi q bagian sama besar, tanda ke-i berada tepat di i per q panjang garis.
 */
export type Petak = { x: number; w: number; arsir: boolean };

const bulat2 = (n: number): number => Math.round(n * 100) / 100;

/** Batang dari `x0` selebar `lebar`, dibagi `q` petak sama besar, `p` petak pertama (dari kiri) berarsir. */
export function potongBatang(p: number, q: number, x0: number, lebar: number): Petak[] {
  return Array.from({ length: q }, (_, i) => ({ x: bulat2(x0 + (i * lebar) / q), w: bulat2(lebar / q), arsir: i < p }));
}

/** Letak tanda ke-`i` (0 sampai q) pada garis dari `x0` selebar `lebar`. */
export const xTanda = (q: number, i: number, x0: number, lebar: number): number => bulat2(x0 + (i * lebar) / q);

/** Banyak petak berarsir. */
export const hitungArsir = (petak: readonly Petak[]): number => petak.filter((c) => c.arsir).length;

/** Apakah semua petak sama lebar dan bersambung tanpa celah dari awal sampai akhir batang? */
export function petakSahih(petak: readonly Petak[], x0: number, lebar: number): boolean {
  if (petak.length === 0) return false;
  const w = petak[0].w;
  if (!petak.every((c) => Math.abs(c.w - w) < 0.02)) return false;
  if (!petak.every((c, i) => Math.abs(c.x - (i === 0 ? x0 : petak[i - 1].x + petak[i - 1].w)) < 0.05)) return false;
  const akhir = petak[petak.length - 1];
  return Math.abs(akhir.x + akhir.w - (x0 + lebar)) < 0.05;
}
