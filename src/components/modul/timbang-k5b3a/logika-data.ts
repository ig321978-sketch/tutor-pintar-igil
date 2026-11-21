/**
 * Logika murni Kelas 5 Bab 3 Sub-Bab A "Tiga Kantong Tepung Bu Ratna" (membandingkan dan mengurutkan pecahan): pecahan biasa dan campuran,
 * mengubah campuran menjadi biasa, garis bilangan (kanan lebih besar), menyamakan penyebut dengan KPK lalu membandingkan pembilang,
 * membandingkan bilangan bulat dulu, tanda <, >, =, dan urutan. Tanpa React dan tanpa jaringan; diuji di Node: scripts/uji-timbang-k5b3a.mjs.
 * Semua gambar (bar pecahan, garis bilangan) DIGAMBAR dari data ini.
 */
import { ejaK5B3, kataK5B3 } from "../eja-k5b3";

export const kata = (n: number): string => kataK5B3(n);
export const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

/** Pecahan: bilangan bulat w (0 untuk pecahan biasa), pembilang p, penyebut q. Pecahan campuran selalu punya w >= 1 dan p < q. */
export type Pec = { w: number; p: number; q: number };
export const pec = (w: number, p: number, q: number): Pec => ({ w, p, q });
export const adalahCampuran = (f: Pec): boolean => f.w > 0;

export const fpb = (a: number, b: number): number => (b === 0 ? a : fpb(b, a % b));
export const kpk = (a: number, b: number): number => (a / fpb(a, b)) * b;
export const kpkDaftar = (daftar: number[]): number => daftar.reduce((t, x) => kpk(t, x), 1);

/** Pembilang dan penyebut pecahan biasa yang sama besar: (bulat x penyebut) + pembilang, penyebut tetap. */
export const keBiasa = (f: Pec): { p: number; q: number } => ({ p: f.w * f.q + f.p, q: f.q });
export const kaliBulat = (f: Pec): number => f.w * f.q;
/** Tulisan pecahan untuk layar: "3/4", "2 3/4". */
export const teksPec = (f: Pec): string => (f.w > 0 ? `${f.w} ${f.p}/${f.q}` : `${f.p}/${f.q}`);
export const teksBiasa = (p: number, q: number): string => `${p}/${q}`;
/** Pecahan dari pembilang dan penyebut biasa: 11/4 menjadi 2 3/4 bila `campur`. */
export function dariBiasa(p: number, q: number, campur = true): Pec {
  const w = campur ? Math.floor(p / q) : 0;
  return { w, p: p - w * q, q };
}
/** Nilai sebagai pecahan biasa (pembilang dan penyebut), dipakai untuk membandingkan. */
export const biasa = (f: Pec): [number, number] => {
  const b = keBiasa(f);
  return [b.p, b.q];
};
/** Banding dua pecahan dengan perkalian silang: -1 bila a lebih kecil, 0 bila sama besar, 1 bila a lebih besar. */
export function banding(a: Pec, b: Pec): -1 | 0 | 1 {
  const [p1, q1] = biasa(a);
  const [p2, q2] = biasa(b);
  const kiri = p1 * q2;
  const kanan = p2 * q1;
  return kiri < kanan ? -1 : kiri > kanan ? 1 : 0;
}
export const tandaBanding = (a: Pec, b: Pec): "<" | ">" | "=" => (banding(a, b) < 0 ? "<" : banding(a, b) > 0 ? ">" : "=");
/** Pembilang pecahan f setelah penyebutnya disamakan menjadi d (d harus kelipatan q). */
export const pembilangSama = (f: Pec, d: number): number => keBiasa(f).p * (d / f.q);
export const bisaSama = (f: Pec, d: number): boolean => d > 0 && d % f.q === 0;
/** Urutan indeks dari yang terkecil (naik) atau terbesar (turun). */
export function urutan(daftar: Pec[], naik: boolean): number[] {
  const idx = daftar.map((_, i) => i);
  idx.sort((i, j) => banding(daftar[i], daftar[j]) * (naik ? 1 : -1) || i - j);
  return idx;
}

/** Posisi pecahan pada garis bilangan, dalam satuan bilangan bulat. */
export const posisiGaris = (f: Pec): number => (f.w * f.q + f.p) / f.q;
/** Banyak ruas kecil dari nol sampai pecahan itu bila tiap satuan dibagi q bagian (sama dengan pembilang pecahan biasa). */
export const ruasGaris = (f: Pec): number => keBiasa(f).p;

/** Ucapan tanpa digit: pecahan "2 3/4" dibaca "dua bulat tiga per empat", "3/4" dibaca "tiga per empat". KPK tetap dibaca KPK. */
export const sebutPec = (f: Pec): string => (f.w > 0 ? `${kata(f.w)} bulat ${kata(f.p)} per ${kata(f.q)}` : `${kata(f.p)} per ${kata(f.q)}`);
export const sebutBiasa = (p: number, q: number): string => `${kata(p)} per ${kata(q)}`;
export function eja(teks: string): string {
  const jaga = teks.replace(/\bKPK\b/g, "KAPEKA");
  const hasil = ejaK5B3(
    jaga
      .replace(/(\d+) (\d+)\/(\d+)/g, (_m, b: string, p: string, q: string) => `${kata(Number(b))} bulat ${kata(Number(p))} per ${kata(Number(q))}`)
      .replace(/(\d+)\/(\d+)/g, (_m, p: string, q: string) => `${kata(Number(p))} per ${kata(Number(q))}`),
  );
  return hasil.replace(/KAPEKA/g, "KPK").replace(/\s+/g, " ").trim();
}

/* ------------------------------ Bar pecahan (model arsir) ------------------------------ */
export type BarSel = { baris: number; kolom: number; isi: boolean };
/** Sel bar pecahan f: w bar penuh lalu satu bar sebagian (p dari q sel berarsir). Tiap baris punya q sel. */
export function selBar(f: Pec): BarSel[] {
  const hasil: BarSel[] = [];
  for (let b = 0; b < f.w; b += 1) for (let k = 0; k < f.q; k += 1) hasil.push({ baris: b, kolom: k, isi: true });
  if (f.p > 0) for (let k = 0; k < f.q; k += 1) hasil.push({ baris: f.w, kolom: k, isi: k < f.p });
  return hasil;
}
export const banyakBaris = (f: Pec): number => f.w + (f.p > 0 ? 1 : 0);
export const banyakIsi = (f: Pec): number => selBar(f).filter((s) => s.isi).length;

/** Titik tanda pada garis bilangan 0 sampai maks dengan tiap satuan dibagi q: indeks 0 sampai maks*q. */
export const tandaGaris = (maks: number, q: number): { i: number; bulat: boolean }[] => Array.from({ length: maks * q + 1 }, (_, i) => ({ i, bulat: i % q === 0 }));
/** Garis bilangan pada kanvas 300 lebar: x untuk tanda ke-i. */
export const TATA_GARIS = { x0: 16, x1: 284 } as const;
export const xGaris = (i: number, maks: number, q: number): number => TATA_GARIS.x0 + ((TATA_GARIS.x1 - TATA_GARIS.x0) * i) / (maks * q);
