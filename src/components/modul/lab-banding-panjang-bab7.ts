/**
 * Laboratorium Bandingkan Panjang (Bab 7): model PhET. Empat pita diukur dengan satuan stik yang sama.
 * Anak mengubah panjang pita, menyejajarkan ujung kiri, mengurutkan dari terpendek, dan membandingkan dua pita.
 * Pita yang ujungnya tidak sejajar menyesatkan mata; mesin memperlihatkan bedanya.
 * Murni: tanpa React, tanpa jaringan. Diuji di scripts/uji-lab-kelas1.mjs.
 */

export const MIN_PANJANG = 1;
export const MAKS_PANJANG = 10;

export type Pita = { nama: string; warna: string };

export const PITA: Pita[] = [
  { nama: "Merah", warna: "#EF4444" },
  { nama: "Biru", warna: "#3B82F6" },
  { nama: "Hijau", warna: "#22C55E" },
  { nama: "Kuning", warna: "#EAB308" },
];

export const PANJANG_AWAL = [5, 8, 3, 6];

/** Geseran awal (dalam satuan stik) saat ujung kiri tidak disejajarkan. Sengaja berbeda-beda. */
export const GESER_TAK_SEJAJAR = [0, 2, 1, 3];

export function ubahPanjang(panjang: number[], i: number, delta: 1 | -1): number[] {
  if (i < 0 || i >= panjang.length) return panjang;
  const baru = Math.max(MIN_PANJANG, Math.min(MAKS_PANJANG, panjang[i] + delta));
  return panjang.map((p, k) => (k === i ? baru : p));
}

/** Urutan tampil: indeks pita. Terurut dari terpendek bila diminta; panjang sama tetap dalam urutan semula. */
export function urutanTampil(panjang: number[], urut: boolean): number[] {
  const indeks = panjang.map((_, i) => i);
  if (!urut) return indeks;
  return indeks.sort((a, b) => panjang[a] - panjang[b] || a - b);
}

export const terpendek = (panjang: number[]) => {
  const m = Math.min(...panjang);
  return panjang.flatMap((p, i) => (p === m ? [i] : []));
};

export const terpanjang = (panjang: number[]) => {
  const m = Math.max(...panjang);
  return panjang.flatMap((p, i) => (p === m ? [i] : []));
};

export function bandingDua(panjang: number[], i: number, j: number): string {
  const a = PITA[i].nama;
  const b = PITA[j].nama;
  if (i === j) return `${a} dibandingkan dengan dirinya sendiri. Pilih pita lain.`;
  const sel = panjang[i] - panjang[j];
  if (sel === 0) return `Pita ${a} dan pita ${b} sama panjang, masing-masing ${panjang[i]} stik.`;
  const [lebih, kurang, d] = sel > 0 ? [a, b, sel] : [b, a, -sel];
  return `Pita ${lebih} lebih panjang ${d} stik dari pita ${kurang}. Pita ${kurang} lebih pendek ${d} stik dari pita ${lebih}.`;
}

/** Ketuk pita: dipilih bergantian, paling banyak dua pita. Ketuk lagi untuk melepas. */
export function pilihPita(dipilih: number[], i: number): number[] {
  if (dipilih.includes(i)) return dipilih.filter((x) => x !== i);
  return dipilih.length >= 2 ? [dipilih[1], i] : [...dipilih, i];
}

export function ucapanBanding(panjang: number[], urut: boolean, sejajar: boolean): string {
  const pendek = terpendek(panjang).map((i) => PITA[i].nama);
  const panjangnya = terpanjang(panjang).map((i) => PITA[i].nama);
  const sambung = (a: string[]) => a.join(" dan ");
  const mata = sejajar ? "" : " Ujung kiri pita belum sejajar, jadi mata mudah tertipu. Sejajarkan dulu supaya adil.";
  const urutan = urut ? " Pita sudah diurutkan dari yang terpendek." : "";
  return `Pita ${sambung(panjangnya)} paling panjang, ${Math.max(...panjang)} stik. Pita ${sambung(pendek)} paling pendek, ${Math.min(...panjang)} stik.${urutan}${mata}`;
}
