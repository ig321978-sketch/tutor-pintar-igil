/**
 * Dinding Pecahan (Kelas 2 Bab 5, Sub-Bab C): model PhET.
 * Tiga batang sama panjang: satu utuh, dua setengah, dan empat seperempat. Anak mewarnai bagian di tiap batang.
 * Panjang berwarna dibandingkan seketika, sehingga dua seperempat tampak sama panjang dengan satu setengah.
 * Satuan panjang: seperempat = 1, setengah = 2, utuh = 4.
 * Murni: tanpa React, tanpa jaringan, tanpa impor nilai. Diuji di scripts/uji-lab-k2b5.mjs.
 */

export type BarisDinding = "u" | "s" | "q";

export const URUT_BARIS: BarisDinding[] = ["u", "s", "q"];
/** Banyak bagian tiap batang. */
export const BAGIAN: Record<BarisDinding, number> = { u: 1, s: 2, q: 4 };
/** Panjang satu bagian, dalam satuan seperempat. */
export const PANJANG_BAGIAN: Record<BarisDinding, number> = { u: 4, s: 2, q: 1 };
export const LAMBANG: Record<BarisDinding, string> = { u: "1", s: "½", q: "¼" };
export const NAMA_BARIS: Record<BarisDinding, string> = { u: "satu utuh", s: "setengah", q: "seperempat" };

export type Dinding = Record<BarisDinding, boolean[]>;

export const awalDinding = (): Dinding => ({ u: [false], s: [false, false], q: [false, false, false, false] });

export function ketukBagian(d: Dinding, baris: BarisDinding, i: number): Dinding {
  if (i < 0 || i >= BAGIAN[baris]) return d;
  return { ...d, [baris]: d[baris].map((v, j) => (j === i ? !v : v)) };
}

export const hitungWarna = (d: Dinding): Record<BarisDinding, number> => ({
  u: d.u.filter(Boolean).length,
  s: d.s.filter(Boolean).length,
  q: d.q.filter(Boolean).length,
});

/** Panjang berwarna tiap batang dalam satuan seperempat. */
export function panjangWarna(d: Dinding): Record<BarisDinding, number> {
  const h = hitungWarna(d);
  return { u: h.u * PANJANG_BAGIAN.u, s: h.s * PANJANG_BAGIAN.s, q: h.q * PANJANG_BAGIAN.q };
}

/** Pasangan batang yang panjang berwarnanya sama dan tidak nol. */
export function pasanganSama(d: Dinding): [BarisDinding, BarisDinding][] {
  const p = panjangWarna(d);
  const hasil: [BarisDinding, BarisDinding][] = [];
  for (let i = 0; i < URUT_BARIS.length; i += 1) {
    for (let j = i + 1; j < URUT_BARIS.length; j += 1) {
      const a = URUT_BARIS[i];
      const b = URUT_BARIS[j];
      if (p[a] > 0 && p[a] === p[b]) hasil.push([a, b]);
    }
  }
  return hasil;
}

const sebut = (n: number, b: BarisDinding) => `${n} ${NAMA_BARIS[b]}`;

/** Kalimat perbandingan, misalnya "2 seperempat sama panjang dengan 1 setengah." */
export function kalimatDinding(d: Dinding): string {
  const h = hitungWarna(d);
  const p = panjangWarna(d);
  const ada = URUT_BARIS.filter((b) => h[b] > 0);
  if (ada.length === 0) return "Ketuk bagian di batang mana saja untuk mewarnainya.";
  const sama = pasanganSama(d);
  if (sama.length === 0) {
    return ada.length === 1 ? `Kamu mewarnai ${sebut(h[ada[0]], ada[0])}. Warnai batang lain sampai panjangnya sama.` : "Panjang berwarna di tiap batang belum sama. Tambah atau kurangi bagian berwarna.";
  }
  const [a, b] = sama[0];
  const pasti = `${sebut(h[a], a)} sama panjang dengan ${sebut(h[b], b)}.`;
  return p[a] === 4 ? `${pasti} Panjangnya satu utuh.` : pasti;
}

export const ucapanDinding = (d: Dinding): string => kalimatDinding(d);
