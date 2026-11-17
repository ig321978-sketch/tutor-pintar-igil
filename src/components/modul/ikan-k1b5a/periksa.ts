/**
 * Tata letak, pemeriksa kanvas, dan pengenal ucapan bilangan sampai dua puluh Kelas 1 Bab 5 Sub-Bab A (tanpa React, diuji di Node:
 * scripts/uji-ikan-k1b5a.mjs). Kanvas adegan 300 x 200. Memakai ulang pemeriksa Kelas 1 Bab 1 Sub-Bab A (lingkari, tanda satu per satu, tulisan angka).
 */
import type { Titik } from "../lemari-k1b1a/periksa-jawab";

export { periksaCentang, periksaLingkari, periksaTulis, LEBAR_ADEGAN, TINGGI_ADEGAN, type Goresan, type Titik } from "../lemari-k1b1a/periksa-jawab";

/* ------------------------------ Metode IGIL: kantong dan dua wadah bersekat sepuluh ------------------------------ */
export const KANTONG = { x: 8, y: 22, w: 138, h: 170 };
/** Ikan di kantong: empat kolom lima baris (paling banyak dua puluh). */
export const letakKantong = (i: number): Titik => ({ x: 30 + (i % 4) * 32, y: 51 + Math.floor(i / 4) * 32 });
/** Dua wadah bersekat sepuluh di kanan (atas dan bawah), tiap wadah dua baris lima sekat. */
export const SEKAT = 25;
export const WADAH = [
  { x: 155, y: 28, w: 5 * SEKAT + 10, h: 2 * SEKAT + 10 },
  { x: 155, y: 112, w: 5 * SEKAT + 10, h: 2 * SEKAT + 10 },
];
export const letakSekat = (j: number): Titik => {
  const w = WADAH[Math.floor(j / 10)];
  const c = j % 10;
  return { x: w.x + 5 + SEKAT / 2 + (c % 5) * SEKAT, y: w.y + 5 + SEKAT / 2 + Math.floor(c / 5) * SEKAT };
};

/* ------------------------------ Double Ten Frame: dua bingkai besar berdampingan ------------------------------ */
export const KOTAK = 26;
export const BINGKAI = [
  { x: 10, y: 52, w: 5 * KOTAK + 8, h: 2 * KOTAK + 8 },
  { x: 152, y: 52, w: 5 * KOTAK + 8, h: 2 * KOTAK + 8 },
];
export const letakKotak = (j: number): Titik => {
  const b = BINGKAI[Math.floor(j / 10)];
  const c = j % 10;
  return { x: b.x + 4 + KOTAK / 2 + (c % 5) * KOTAK, y: b.y + 4 + KOTAK / 2 + Math.floor(c / 5) * KOTAK };
};
/** Tiga kartu nama di bawah bingkai (untuk memilih atau melingkari nama bilangan). */
export const letakNama = (i: number): Titik => ({ x: 54 + i * 96, y: 160 });
export const LEBAR_NAMA = 84;

/* ------------------------------ Rekenrek: dua baris sepuluh manik ------------------------------ */
export const JARAK_MANIK = 21;
export const JARI_MANIK = 9.5;
export const BARIS_MANIK = [72, 136];
/** Letak manik ke-i pada baris yang tergeser sebanyak t (yang tergeser rapat di kiri, sisanya rapat di kanan). */
export const letakManik = (baris: number, i: number, t: number): Titik => ({ x: i < t ? 22 + i * JARAK_MANIK : 278 - (9 - i) * JARAK_MANIK, y: BARIS_MANIK[baris] });

/* ------------------------------ Estimation Jar: toples ------------------------------ */
export const TOPLES = { x: 50, y: 40, w: 200, h: 152 };
/** Isi toples: empat kolom tiga baris (paling banyak dua belas). */
export const letakToples = (i: number): Titik => ({ x: 90 + (i % 4) * 40, y: 82 + Math.floor(i / 4) * 38 });

/* ------------------------------ Kartu kata (rupa lambang) ------------------------------ */
/** Kartu kata di petak lima kolom dua baris. */
export const letakPetak = (i: number): Titik => ({ x: 34 + (i % 5) * 58, y: 70 + Math.floor(i / 5) * 72 });

/* ------------------------------ Ucapan bilangan nol sampai dua puluh ------------------------------ */
const KATA_DASAR: Record<string, number> = {
  nol: 0, kosong: 0,
  satu: 1, se: 1,
  dua: 2,
  tiga: 3,
  empat: 4, ampat: 4,
  lima: 5,
  enam: 6,
  tujuh: 7, tuju: 7,
  delapan: 8, lapan: 8,
  sembilan: 9, semilan: 9,
};
/**
 * Semua bilangan nol sampai dua puluh yang terdengar dalam teks (urut kemunculan, tanpa kembar). Mengenali "sebelas",
 * "<satuan> belas", "dua puluh", "sepuluh", kata satuan, dan angka. Pengenal bersama (lemari-k1b1a) hanya sampai sepuluh.
 */
export function bilanganDariUcapan20(teks: string): number[] {
  const t = teks
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\bse\s+(belas|puluh)\b/g, "se$1")
    .replace(/\b([a-z]+)(belas|puluh)\b/g, (m, a: string, b: string) => (a in KATA_DASAR || a === "se" ? `${a} ${b}` : m))
    .trim();
  const kt = t.split(" ").filter(Boolean);
  const hasil: number[] = [];
  const tambah = (n: number) => {
    if (n >= 0 && n <= 20 && !hasil.includes(n)) hasil.push(n);
  };
  for (let i = 0; i < kt.length; i += 1) {
    const w = kt[i];
    const lanjut = kt[i + 1];
    if (/^\d+$/.test(w)) {
      tambah(Number(w));
      continue;
    }
    if (w === "sebelas") {
      tambah(11);
      continue;
    }
    if (w === "sepuluh") {
      tambah(10);
      continue;
    }
    if (w in KATA_DASAR) {
      const v = KATA_DASAR[w];
      if (lanjut === "belas" && v >= 1) {
        tambah(10 + v);
        i += 1;
        continue;
      }
      if (lanjut === "puluh" && (v === 1 || v === 2)) {
        tambah(v * 10);
        i += 1;
        continue;
      }
      if (w !== "se") tambah(v);
    }
  }
  return hasil;
}
