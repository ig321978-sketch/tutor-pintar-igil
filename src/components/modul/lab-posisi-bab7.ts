/**
 * Laboratorium Tinggi dan Rendah (Bab 7, Sub-Bab A): tiga kupu-kupu terbang pada ketinggian berbeda.
 * Anak menaikkan atau menurunkan tiap kupu-kupu, lalu membaca kata lebih tinggi, lebih rendah,
 * paling tinggi, dan paling rendah. Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas1.mjs.
 */

export const MIN_TINGGI = 1;
export const MAKS_TINGGI = 10;

export type Kupu = { nama: string; warna: string };

export const KUPU: Kupu[] = [
  { nama: "kuning", warna: "#FACC15" },
  { nama: "merah", warna: "#EF4444" },
  { nama: "hijau", warna: "#22C55E" },
];

/** Awal mengikuti cerita buku: kuning rendah, merah lebih tinggi, hijau paling tinggi. */
export const TINGGI_AWAL = [3, 6, 9];

export function ubahTinggi(tinggi: number[], i: number, delta: 1 | -1): number[] {
  if (i < 0 || i >= tinggi.length) return tinggi;
  const baru = Math.max(MIN_TINGGI, Math.min(MAKS_TINGGI, tinggi[i] + delta));
  return tinggi.map((t, k) => (k === i ? baru : t));
}

export const tertinggi = (tinggi: number[]) => {
  const m = Math.max(...tinggi);
  return tinggi.flatMap((t, i) => (t === m ? [i] : []));
};

export const terendah = (tinggi: number[]) => {
  const m = Math.min(...tinggi);
  return tinggi.flatMap((t, i) => (t === m ? [i] : []));
};

const sebut = (ids: number[]) => ids.map((i) => `kupu-kupu ${KUPU[i].nama}`).join(" dan ");

/** Kalimat paling tinggi dan paling rendah. Bila semuanya sama tinggi, disebut sama tinggi. */
export function kalimatPalingPosisi(tinggi: number[]): string {
  if (new Set(tinggi).size === 1) return "Ketiga kupu-kupu sama tinggi.";
  return `Paling tinggi: ${sebut(tertinggi(tinggi))}. Paling rendah: ${sebut(terendah(tinggi))}.`;
}

export function bandingPosisi(tinggi: number[], i: number, j: number): string {
  if (i === j) return "Satu kupu-kupu dibandingkan dengan dirinya sendiri. Pilih kupu-kupu lain.";
  const a = sebut([i]);
  const b = sebut([j]);
  if (tinggi[i] === tinggi[j]) return `${kapital(a)} dan ${b} sama tinggi.`;
  const [atas, bawah] = tinggi[i] > tinggi[j] ? [a, b] : [b, a];
  return `${kapital(atas)} terbang lebih tinggi dari ${bawah}. ${kapital(bawah)} terbang lebih rendah dari ${atas}.`;
}

const kapital = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Ketuk kupu-kupu: dipilih bergantian, paling banyak dua. Ketuk lagi untuk melepas. */
export function pilihKupu(dipilih: number[], i: number): number[] {
  if (dipilih.includes(i)) return dipilih.filter((x) => x !== i);
  return dipilih.length >= 2 ? [dipilih[1], i] : [...dipilih, i];
}

export function ucapanPosisi(tinggi: number[], dipilih: number[]): string {
  const dasar = kalimatPalingPosisi(tinggi);
  return dipilih.length === 2 ? `${dasar} ${bandingPosisi(tinggi, dipilih[0], dipilih[1])}` : dasar;
}
