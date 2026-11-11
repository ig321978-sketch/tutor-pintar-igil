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

/**
 * Gaya tampilan dan bahasa. Sub-Bab A hanya membandingkan dengan mata (tanpa angka, tanpa satuan),
 * Sub-Bab B mengukur dengan satuan (angka dan nama satuan). Bawaan: pita dalam stik, dengan angka.
 */
export type Gaya = { benda: "pita" | "pensil"; satuan: string; angka: boolean };

export const GAYA_BAWAAN: Gaya = { benda: "pita", satuan: "stik", angka: true };

const kapital = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function bandingDua(panjang: number[], i: number, j: number, gaya: Gaya = GAYA_BAWAAN): string {
  const a = PITA[i].nama;
  const b = PITA[j].nama;
  const B = kapital(gaya.benda);
  if (i === j) return `${a} dibandingkan dengan dirinya sendiri. Pilih ${gaya.benda} lain.`;
  const sel = panjang[i] - panjang[j];
  if (sel === 0) return gaya.angka ? `${B} ${a} dan ${gaya.benda} ${b} sama panjang, masing-masing ${panjang[i]} ${gaya.satuan}.` : `${B} ${a} dan ${gaya.benda} ${b} sama panjang.`;
  const [lebih, kurang, d] = sel > 0 ? [a, b, sel] : [b, a, -sel];
  if (!gaya.angka) return `${B} ${lebih} lebih panjang dari ${gaya.benda} ${kurang}. ${B} ${kurang} lebih pendek dari ${gaya.benda} ${lebih}.`;
  return `${B} ${lebih} lebih panjang ${d} ${gaya.satuan} dari ${gaya.benda} ${kurang}. ${B} ${kurang} lebih pendek ${d} ${gaya.satuan} dari ${gaya.benda} ${lebih}.`;
}

/** Ketuk pita: dipilih bergantian, paling banyak dua pita. Ketuk lagi untuk melepas. */
export function pilihPita(dipilih: number[], i: number): number[] {
  if (dipilih.includes(i)) return dipilih.filter((x) => x !== i);
  return dipilih.length >= 2 ? [dipilih[1], i] : [...dipilih, i];
}

/** Kalimat terpanjang dan terpendek untuk kartu hasil. Yang sama panjang disebut semuanya. */
export function kalimatPaling(panjang: number[], gaya: Gaya = GAYA_BAWAAN): string {
  const pendek = terpendek(panjang).map((i) => PITA[i].nama);
  const panjangnya = terpanjang(panjang).map((i) => PITA[i].nama);
  const sambung = (a: string[]) => a.join(" dan ");
  if (!gaya.angka) return `Terpanjang: ${gaya.benda} ${sambung(panjangnya)}. Terpendek: ${gaya.benda} ${sambung(pendek)}.`;
  return `Terpanjang: ${gaya.benda} ${sambung(panjangnya)} (${Math.max(...panjang)} ${gaya.satuan}). Terpendek: ${gaya.benda} ${sambung(pendek)} (${Math.min(...panjang)} ${gaya.satuan}).`;
}

export function ucapanBanding(panjang: number[], urut: boolean, sejajar: boolean, gaya: Gaya = GAYA_BAWAAN): string {
  const pendek = terpendek(panjang).map((i) => PITA[i].nama);
  const panjangnya = terpanjang(panjang).map((i) => PITA[i].nama);
  const sambung = (a: string[]) => a.join(" dan ");
  const B = kapital(gaya.benda);
  const mata = sejajar ? "" : ` Ujung kiri ${gaya.benda} belum sejajar, jadi mata mudah tertipu. Sejajarkan dulu supaya adil.`;
  const urutan = urut ? ` ${B} sudah diurutkan dari yang terpendek.` : "";
  if (!gaya.angka) return `${B} ${sambung(panjangnya)} paling panjang. ${B} ${sambung(pendek)} paling pendek.${urutan}${mata}`;
  return `${B} ${sambung(panjangnya)} paling panjang, ${Math.max(...panjang)} ${gaya.satuan}. ${B} ${sambung(pendek)} paling pendek, ${Math.min(...panjang)} ${gaya.satuan}.${urutan}${mata}`;
}

/** Ucapan untuk dua benda saja (Sub-Bab A, simulasi pertama). */
export function ucapanDua(panjang: number[], sejajar: boolean, dipilih: number[], gaya: Gaya = GAYA_BAWAAN): string {
  const mata = sejajar ? "" : ` Ujung kiri ${gaya.benda} belum sejajar, jadi mata mudah tertipu. Sejajarkan dulu supaya adil.`;
  if (dipilih.length === 2) return `${bandingDua(panjang, dipilih[0], dipilih[1], gaya)}${mata}`;
  return `Ketuk kedua ${gaya.benda} untuk membandingkannya.${mata}`;
}
