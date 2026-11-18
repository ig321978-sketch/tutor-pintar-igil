/**
 * Tata letak adegan, pemeriksa kanvas, dan pengenal ucapan bilangan sampai dua puluh Kelas 2 Bab 2 Sub-Bab B (tanpa React, diuji di Node:
 * scripts/uji-stok-k2b2b.mjs). Kanvas adegan 300 x 200. Memakai ulang pemeriksa Kelas 1 Bab 1 Sub-Bab A (tulisan angka).
 */
import type { Titik } from "../lemari-k1b1a/periksa-jawab";

export { periksaTulis, LEBAR_ADEGAN, TINGGI_ADEGAN, type Goresan, type Titik } from "../lemari-k1b1a/periksa-jawab";

/* ------------------------------ Ambil barang (Susun dan Periksa): ikat sepuluh dan barang lepas ------------------------------ */
export const UKURAN_IKAT = { w: 86, h: 44 };
/** Ikat sepuluh ke-i dari paling banyak dua, satu baris di atas. */
export const letakIkat = (i: number): Titik => ({ x: 56 + i * 100, y: 44 });
export const UKURAN_LEPAS = 22;
/** Barang lepas ke-j dari paling banyak dua puluh (dua baris sepuluh), di bawah ikat. */
export const letakLepas = (j: number): Titik => ({ x: 24 + (j % 10) * 28, y: 112 + Math.floor(j / 10) * 32 });

/* ------------------------------ Tempat kosong (Berpikir Penjumlahan): deret barang ------------------------------ */
export const UKURAN_DERET = 22;
/** Tempat ke-i dari paling banyak dua puluh: dua baris sepuluh. */
export const letakDeret = (i: number): Titik => ({ x: 24 + (i % 10) * 28, y: 70 + Math.floor(i / 10) * 40 });

/* ------------------------------ Keluarga bilangan: segitiga ------------------------------ */
export const UKURAN_SIMPUL = { w: 84, h: 46 };
export const SIMPUL_ATAS: Titik = { x: 150, y: 52 };
export const SIMPUL_KIRI: Titik = { x: 70, y: 148 };
export const SIMPUL_KANAN: Titik = { x: 230, y: 148 };

/* ------------------------------ Kalimat keluarga: enam kartu ------------------------------ */
export const UKURAN_KARTU_KALIMAT = { w: 132, h: 40 };
export const letakKartuKalimat = (i: number): Titik => ({ x: 82 + (i % 2) * 138, y: 50 + Math.floor(i / 2) * 52 });

/* ------------------------------ Kurangi dari Sepuluh: dua deret ------------------------------ */
export const letakSepuluh = (i: number): Titik => ({ x: 24 + (i % 10) * 28, y: 62 });
export const letakSisaSepuluh = (i: number): Titik => ({ x: 24 + (i % 10) * 28, y: 112 });

/* ------------------------------ Ucapan bilangan nol sampai dua puluh ------------------------------ */
const DASAR: Record<string, number> = {
  nol: 0,
  kosong: 0,
  satu: 1,
  se: 1,
  dua: 2,
  tiga: 3,
  empat: 4,
  ampat: 4,
  lima: 5,
  enam: 6,
  tujuh: 7,
  tuju: 7,
  delapan: 8,
  lapan: 8,
  sembilan: 9,
  semilan: 9,
};
/**
 * Semua bilangan nol sampai dua puluh yang terdengar dalam teks (urut kemunculan, tanpa kembar). Mengenali "sebelas", "sepuluh",
 * "<satuan> belas", "dua puluh", kata satuan, dan angka.
 */
export function bilanganDariUcapan20(teks: string): number[] {
  const t = teks
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\bse\s+(belas|puluh)\b/g, "se$1")
    .replace(/\b([a-z]+)(belas|puluh)\b/g, (m, a: string, b: string) => (a in DASAR || a === "se" ? `${a} ${b}` : m))
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
    if (w in DASAR) {
      const v = DASAR[w];
      if (lanjut === "belas" && v >= 1) {
        tambah(10 + v);
        i += 1;
        continue;
      }
      if (lanjut === "puluh" && v >= 1 && v <= 2) {
        tambah(v * 10);
        i += 1;
        continue;
      }
      if (w !== "se") tambah(v);
    }
  }
  return hasil;
}
