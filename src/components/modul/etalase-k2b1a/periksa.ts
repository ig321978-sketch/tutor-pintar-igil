/**
 * Tata letak adegan dan pengenal ucapan Kelas 2 Bab 1 Sub-Bab A (tanpa React, diuji di Node: scripts/uji-etalase-k2b1a.mjs).
 * Kanvas adegan 300 x 200. Memakai ulang pemeriksa Kelas 1 Bab 1 Sub-Bab A (lingkari, tanda satu per satu, tulisan angka).
 */
import type { Titik } from "../lemari-k1b1a/periksa-jawab";

export { periksaCentang, periksaLingkari, periksaTulis, LEBAR_ADEGAN, TINGGI_ADEGAN, type Goresan, type Titik } from "../lemari-k1b1a/periksa-jawab";

const r1 = (n: number): number => Number(n.toFixed(1));

/* ------------------------------ Kotak kue isi sepuluh (Metode IGIL dan Skip Counting) ------------------------------ */
export const KOTAK = { w: 78, h: 34, gap: 8, y0: 30, baris: 46 };
/** Banyak kotak paling besar lima. Tiga kotak per baris, tiap baris di tengah. Pojok kiri-atas kotak ke-i dari `total`. */
export function letakKotak(i: number, total: number, y0: number = KOTAK.y0): Titik {
  const baris = Math.floor(i / 3);
  const diBaris = Math.min(3, total - baris * 3);
  const x0 = (300 - (diBaris * KOTAK.w + (diBaris - 1) * KOTAK.gap)) / 2;
  return { x: r1(x0 + (i % 3) * (KOTAK.w + KOTAK.gap)), y: y0 + baris * KOTAK.baris };
}
export const pusatKotak = (i: number, total: number, y0: number = KOTAK.y0): Titik => {
  const p = letakKotak(i, total, y0);
  return { x: r1(p.x + KOTAK.w / 2), y: r1(p.y + KOTAK.h / 2) };
};
/** Pusat lubang ke-j (0 sampai 9, dua baris lima) di dalam kotak yang pojoknya `p`. */
export const letakSlot = (p: Titik, j: number): Titik => ({ x: r1(p.x + 11 + (j % 5) * 15), y: r1(p.y + 10 + Math.floor(j / 5) * 15) });
export const UKURAN_SLOT = 13;
/** Jari-jari penerimaan tanda pada kotak penuh. Jarak terdekat dua kotak lebih dari dua kali jari-jari. */
export const JARI_KOTAK = 20;

/** Kue lepas ke-i dari n: satu baris di bawah kotak. */
export const UKURAN_LEPAS = 22;
export const letakLepas = (i: number, n: number): Titik => ({ x: r1(150 + (i - (n - 1) / 2) * Math.min(30, 270 / Math.max(n, 1))), y: 152 });
export const JARI_LEPAS = 12;

/** Kolam kue yang belum dikemas (Klik, Metode IGIL): delapan kolom, paling banyak tiga baris (dua puluh empat kue). */
export const UKURAN_KOLAM = 22;
export const letakKolam = (i: number): Titik => ({ x: 24 + (i % 8) * 34, y: 118 + Math.floor(i / 8) * 28 });
/** Baris kotak kue untuk Klik Metode IGIL: satu baris, paling banyak tiga kotak. */
export const Y_KOTAK_KLIK = 34;

/* ------------------------------ Bingkai sepuluh (Ten Frame) ------------------------------ */
export const BINGKAI = { w: 76, h: 32, gap: 10, y0: 34, baris: 54 };
export const UKURAN_SEL = 15;
/** Pojok kiri-atas bingkai ke-i dari `total` (paling banyak lima), tiga per baris. */
export function letakBingkai(i: number, total: number): Titik {
  const baris = Math.floor(i / 3);
  const diBaris = Math.min(3, total - baris * 3);
  const x0 = (300 - (diBaris * BINGKAI.w + (diBaris - 1) * BINGKAI.gap)) / 2;
  return { x: r1(x0 + (i % 3) * (BINGKAI.w + BINGKAI.gap)), y: BINGKAI.y0 + baris * BINGKAI.baris };
}
export const pusatBingkai = (i: number, total: number): Titik => {
  const p = letakBingkai(i, total);
  return { x: r1(p.x + BINGKAI.w / 2), y: r1(p.y + BINGKAI.h / 2) };
};
/** Pusat sel ke-j (0 sampai 9, dua baris lima) bingkai yang pojoknya `p`. */
export const letakSel = (p: Titik, j: number): Titik => ({ x: r1(p.x + 0.5 + UKURAN_SEL / 2 + (j % 5) * UKURAN_SEL), y: r1(p.y + 8 + Math.floor(j / 5) * 16) });
/** Letak papan hitungan berjalan di bawah bingkai atau kotak. */
export const Y_HITUNGAN = 166;

/* ------------------------------ Hitung lanjut (Counting On) ------------------------------ */
export const KARTU_AWAL = { x: 14, y: 40, w: 86, h: 80 };
export const UKURAN_LANJUT = 26;
/** Kue lepas ke-i (paling banyak delapan): empat kolom, dua baris, di kanan kartu bilangan awal. */
export const letakLanjut = (i: number): Titik => ({ x: 132 + (i % 4) * 38, y: 62 + Math.floor(i / 4) * 40 });
export const JARI_LANJUT = 15;

/* ------------------------------ Ucapan bilangan satu sampai lima puluh ------------------------------ */
const SAT: Record<string, number> = {
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
 * Semua bilangan nol sampai lima puluh yang terdengar dalam teks (urut kemunculan, tanpa kembar). Mengenali angka, "sebelas", "sepuluh",
 * "<satuan> belas", "<dua sampai lima> puluh" (dengan atau tanpa satuan), dan kata satuan. "dua puluh enam" terbaca satu bilangan, yaitu dua puluh enam.
 */
export function bilanganDariUcapan50(teks: string): number[] {
  const t = teks
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\bse\s+(belas|puluh)\b/g, "se$1")
    .replace(/\b([a-z]+)(belas|puluh)\b/g, (m, a: string, b: string) => (a in SAT || a === "se" ? `${a} ${b}` : m))
    .trim();
  const kt = t.split(" ").filter(Boolean);
  const hasil: number[] = [];
  const tambah = (n: number) => {
    if (n >= 0 && n <= 50 && !hasil.includes(n)) hasil.push(n);
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
    if (w in SAT) {
      const v = SAT[w];
      if (lanjut === "belas" && v >= 1) {
        tambah(10 + v);
        i += 1;
        continue;
      }
      if (w === "se" && lanjut === "puluh") {
        tambah(10);
        i += 1;
        continue;
      }
      if (lanjut === "puluh" && v >= 2 && v <= 5) {
        const sisa = kt[i + 2];
        if (sisa !== undefined && sisa in SAT && sisa !== "se" && SAT[sisa] >= 1 && v < 5) {
          tambah(v * 10 + SAT[sisa]);
          i += 2;
        } else {
          tambah(v * 10);
          i += 1;
        }
        continue;
      }
      if (w !== "se") tambah(v);
    }
  }
  return hasil;
}
