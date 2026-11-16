/** Pengacak berbenih (mulberry32) agar soal bisa dibangkitkan ulang dan diuji. */
export type Acak = {
  float: () => number;
  int: (min: number, max: number) => number;
  pilih: <T>(daftar: readonly T[]) => T;
  kocok: <T>(daftar: readonly T[]) => T[];
};

export function buatAcak(benih: number): Acak {
  let a = benih >>> 0;
  const float = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const int = (min: number, max: number) => min + Math.floor(float() * (max - min + 1));
  const pilih = <T,>(daftar: readonly T[]) => daftar[Math.floor(float() * daftar.length)];
  const kocok = <T,>(daftar: readonly T[]) => {
    const h = [...daftar];
    for (let i = h.length - 1; i > 0; i--) {
      const j = Math.floor(float() * (i + 1));
      [h[i], h[j]] = [h[j], h[i]];
    }
    return h;
  };
  return { float, int, pilih, kocok };
}

export function benihBaru(): number {
  return (Date.now() ^ Math.floor(Math.random() * 0x7fffffff)) >>> 0;
}
