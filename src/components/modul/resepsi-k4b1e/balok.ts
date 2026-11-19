/**
 * Geometri balok cacah Kelas 4 Bab 1 Sub-Bab E (murni, tanpa React, diuji di Node: scripts/uji-resepsi-k4b1e.mjs).
 * Bilangan tiga angka digambar sebagai kotak besar (ratusan), batang (puluhan), dan butir (satuan), sebanyak angkanya: 428 = 4 kotak, 2 batang, 8 butir.
 * Tiga zona berdampingan: ratusan, puluhan, satuan. Semua ukuran dalam satuan kanvas 300 x 200.
 */
export type Persegi = { x: number; y: number; w: number; h: number };
export type Butir = { cx: number; cy: number; r: number };
export type Balok = { ratusan: Persegi[]; puluhan: Persegi[]; satuan: Butir[] };

/** Jarak awal tiap zona dari kiri susunan balok, dan lebarnya. */
export const ZONA = [
  { nama: "ratusan", mulai: 0, lebar: 72 },
  { nama: "puluhan", mulai: 78, lebar: 78 },
  { nama: "satuan", mulai: 162, lebar: 50 },
] as const;
/** Tinggi satu baris balok. */
export const TINGGI_BARIS = 30;

const KOTAK = 11;
const LANGKAH_KOTAK = 13;
const BATANG_W = 6;
const BATANG_H = 26;
const LANGKAH_BATANG = 8;
const R_BUTIR = 3.6;
const LANGKAH_BUTIR = 9;
const r1 = (n: number): number => Math.round(n * 10) / 10;

/** Angka di tempat ke-`k` (0 satuan, 1 puluhan, 2 ratusan). */
const angkaDi = (n: number, k: number): number => Math.floor(n / 10 ** k) % 10;

/** Susunan balok untuk `n` (0 sampai 999) dengan pojok kiri-atas (x, y). */
export function susunBalok(n: number, x: number, y: number): Balok {
  const kotak = Array.from({ length: angkaDi(n, 2) }, (_, i) => ({ x: r1(x + ZONA[0].mulai + (i % 5) * LANGKAH_KOTAK), y: r1(y + Math.floor(i / 5) * LANGKAH_KOTAK), w: KOTAK, h: KOTAK }));
  const batang = Array.from({ length: angkaDi(n, 1) }, (_, i) => ({ x: r1(x + ZONA[1].mulai + i * LANGKAH_BATANG), y: r1(y), w: BATANG_W, h: BATANG_H }));
  const butir = Array.from({ length: angkaDi(n, 0) }, (_, i) => ({ cx: r1(x + ZONA[2].mulai + (i % 5) * LANGKAH_BUTIR + R_BUTIR + 1), cy: r1(y + Math.floor(i / 5) * LANGKAH_BUTIR + R_BUTIR + 1), r: R_BUTIR }));
  return { ratusan: kotak, puluhan: batang, satuan: butir };
}
/** Bilangan yang digambarkan susunan balok: tiap kotak seratus, tiap batang sepuluh, tiap butir satu. */
export const bilanganDariBalok = (b: Balok): number => b.ratusan.length * 100 + b.puluhan.length * 10 + b.satuan.length;
/** Pusat zona (untuk judul dan angka) dari pojok kiri susunan. */
export const pusatZona = (x: number, k: 0 | 1 | 2): number => r1(x + ZONA[2 - k].mulai + ZONA[2 - k].lebar / 2);
