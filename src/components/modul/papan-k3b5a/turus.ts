/**
 * Geometri turus Kelas 3 Bab 5 Sub-Bab A (murni, tanpa React, diuji di Node: scripts/uji-papan-k3b5a.mjs).
 * Satu garis tegak untuk satu data; garis kelima mencoret miring melintang di atas empat garis tegak sehingga lima garis menjadi satu bundel.
 */
export type SegTurus = { x1: number; y1: number; x2: number; y2: number; miring: boolean };
export type OpsiTurus = { x: number; y: number; jarak?: number; tinggi?: number; celah?: number };

/** Semua garis turus untuk `banyak` data: bundel penuh (empat tegak dan satu miring) lalu garis tegak sisanya, dari kiri ke kanan mulai (x, y). */
export function segTurus(banyak: number, o: OpsiTurus): SegTurus[] {
  const j = o.jarak ?? 8;
  const t = o.tinggi ?? 30;
  const celah = o.celah ?? 12;
  const out: SegTurus[] = [];
  let x = o.x;
  for (let b = 0; b < Math.floor(banyak / 5); b += 1) {
    for (let i = 0; i < 4; i += 1) out.push({ x1: x + i * j, y1: o.y, x2: x + i * j, y2: o.y + t, miring: false });
    out.push({ x1: x - 4, y1: o.y + t * 0.8, x2: x + 3 * j + 4, y2: o.y + t * 0.2, miring: true });
    x += 3 * j + celah + j;
  }
  for (let i = 0; i < banyak % 5; i += 1) {
    out.push({ x1: x, y1: o.y, x2: x, y2: o.y + t, miring: false });
    x += j;
  }
  return out;
}
/** Lebar seluruh turus (dari garis paling kiri sampai paling kanan), untuk memusatkan gambar. */
export function lebarTurus(banyak: number, o: Omit<OpsiTurus, "x" | "y"> = {}): number {
  const s = segTurus(banyak, { x: 0, y: 0, ...o });
  if (s.length === 0) return 0;
  return Math.max(...s.map((q) => Math.max(q.x1, q.x2))) - Math.min(...s.map((q) => Math.min(q.x1, q.x2)));
}
/** Banyak data yang digambarkan oleh garis-garis turus: tiap garis tegak dan tiap coretan miring dihitung satu. */
export const banyakDariTurus = (s: SegTurus[]): number => s.length;
