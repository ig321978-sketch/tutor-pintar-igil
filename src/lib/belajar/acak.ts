/** Pengacak berbenih (mulberry32). Benih sama, urutan sama. */
export type Pengacak = {
  int: (lo: number, hi: number) => number;
  kocok: <T>(daftar: readonly T[]) => T[];
};

export function pengacak(benih: number): Pengacak {
  let a = benih >>> 0;
  const next = (): number => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const int = (lo: number, hi: number): number => lo + Math.floor(next() * (hi - lo + 1));
  return {
    int,
    kocok: (daftar) => {
      const s = daftar.slice();
      for (let i = s.length - 1; i > 0; i -= 1) {
        const j = int(0, i);
        [s[i], s[j]] = [s[j], s[i]];
      }
      return s;
    },
  };
}
