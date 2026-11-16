const KATA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"];

/** Mengeja bilangan 0 sampai 10 dengan huruf (untuk suara tanpa digit). */
export function eja(n: number): string {
  if (!Number.isInteger(n) || n < 0 || n > 10) throw new Error(`eja: di luar 0..10: ${n}`);
  return KATA[n];
}

/** Menggantikan setiap bilangan bulat 0..10 yang berdiri sendiri dalam teks dengan ejaannya. */
export function tanpaDigit(teks: string): string {
  return teks.replace(/\d+/g, (d) => {
    const n = Number(d);
    return n <= 10 ? eja(n) : d;
  });
}
