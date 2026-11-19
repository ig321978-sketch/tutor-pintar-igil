/**
 * Geometri balok cacah Kelas 4 Bab 1 Sub-Bab F (murni, tanpa React, diuji di Node: scripts/uji-sisa-k4b1f.mjs).
 * Satu bilangan sampai 999 digambar sebagai satu baris: ratusan (kotak besar), puluhan (batang), satuan (kotak kecil), sebanyak angka tiap tempatnya.
 */
export type JenisBalok = "ratusan" | "puluhan" | "satuan";
export type Balok = { jenis: JenisBalok; x: number; y: number; w: number; h: number };
export type OpsiBalok = { x: number; y: number };

const RAT = 13;
const PUL_W = 5;
const SAT = 5;
const CELAH = 2;
const JEDA = 7;
/** Tinggi satu baris balok. */
export const TINGGI_BARIS = RAT;

/** Digit [ratusan, puluhan, satuan] bilangan sampai 999. */
export const digitBalok = (n: number): [number, number, number] => [Math.floor(n / 100), Math.floor(n / 10) % 10, n % 10];

/** Semua balok untuk bilangan `n`, dari kiri ke kanan mulai (x, y): ratusan, lalu puluhan, lalu satuan (rata bawah). */
export function susunBalok(n: number, o: OpsiBalok): Balok[] {
  const [r, p, s] = digitBalok(n);
  const out: Balok[] = [];
  let x = o.x;
  for (let i = 0; i < r; i += 1) {
    out.push({ jenis: "ratusan", x, y: o.y, w: RAT, h: RAT });
    x += RAT + CELAH;
  }
  if (r > 0) x += JEDA - CELAH;
  for (let i = 0; i < p; i += 1) {
    out.push({ jenis: "puluhan", x, y: o.y, w: PUL_W, h: RAT });
    x += PUL_W + CELAH;
  }
  if (p > 0) x += JEDA - CELAH;
  for (let i = 0; i < s; i += 1) {
    out.push({ jenis: "satuan", x, y: o.y + RAT - SAT, w: SAT, h: SAT });
    x += SAT + CELAH;
  }
  return out;
}
/** Lebar satu baris balok bilangan `n` (dari tepi kiri balok pertama sampai tepi kanan balok terakhir). */
export function lebarBalok(n: number): number {
  const b = susunBalok(n, { x: 0, y: 0 });
  return b.length === 0 ? 0 : Math.max(...b.map((q) => q.x + q.w));
}
/** Banyak balok tiap jenis. */
export const hitungBalok = (b: Balok[]): [number, number, number] => [b.filter((q) => q.jenis === "ratusan").length, b.filter((q) => q.jenis === "puluhan").length, b.filter((q) => q.jenis === "satuan").length];
