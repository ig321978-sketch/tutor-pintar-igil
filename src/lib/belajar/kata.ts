const KATA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas", "dua belas"];

/** Bilangan 0 sampai 12 dalam kata, untuk narasi dan suara (tanpa digit). */
export function kataBilangan(n: number): string {
  if (!Number.isInteger(n) || n < 0 || n >= KATA.length) throw new Error(`kataBilangan di luar jangkauan: ${n}`);
  return KATA[n];
}
