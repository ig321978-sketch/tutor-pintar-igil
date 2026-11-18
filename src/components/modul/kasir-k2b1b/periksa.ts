/**
 * Tata letak adegan, pemeriksa kanvas, dan pengenal ucapan bilangan sampai lima puluh Kelas 2 Bab 1 Sub-Bab B (tanpa React, diuji di Node:
 * scripts/uji-kasir-k2b1b.mjs). Kanvas adegan 300 x 200. Memakai ulang pemeriksa Kelas 1 Bab 1 Sub-Bab A (lingkari, tanda satu per satu, tulisan angka).
 */
import type { Titik } from "../lemari-k1b1a/periksa-jawab";

export { periksaCentang, periksaLingkari, periksaTulis, LEBAR_ADEGAN, TINGGI_ADEGAN, type Goresan, type Titik } from "../lemari-k1b1a/periksa-jawab";

/* ------------------------------ Metode IGIL: kotak penuh, kue lepas, dan tabel puluhan dan satuan ------------------------------ */
export const UKURAN_PAKET = { w: 46, h: 30 };
/** Kotak penuh (puluhan) ke-i dari paling banyak lima, satu baris di atas. */
export const letakPaket = (i: number): Titik => ({ x: 36 + i * 54, y: 46 });
export const UKURAN_LEPAS = 22;
/** Kue lepas (satuan) ke-j dari paling banyak sembilan, satu baris di bawah kotak penuh. */
export const letakLepas = (j: number): Titik => ({ x: 26 + (j % 9) * 30, y: 94 });
/** Jari-jari penerimaan tanda: kurang dari separuh jarak terdekat antara kotak penuh dan kue lepas. */
export const JARI_PAKET = 20;
export const KOLOM_TABEL = { y: 116, h: 78, p: { x: 10, w: 136 }, s: { x: 154, w: 136 } };
export const pusatKolom = (kol: "puluhan" | "satuan"): Titik => {
  const k = kol === "puluhan" ? KOLOM_TABEL.p : KOLOM_TABEL.s;
  return { x: k.x + k.w / 2, y: KOLOM_TABEL.y + KOLOM_TABEL.h / 2 };
};
/** Isi kolom puluhan: kotak penuh mini ke-i (paling banyak lima). Isi kolom satuan: kue lepas mini ke-j (paling banyak sembilan, dua baris). */
export const letakPaketKolom = (i: number): Titik => ({ x: 30 + i * 26, y: 160 });
export const letakLepasKolom = (j: number): Titik => ({ x: 172 + (j % 5) * 24, y: 152 + Math.floor(j / 5) * 22 });

/* ------------------------------ Base-Ten Blocks: balok panjang dan kubus kecil ------------------------------ */
export const UKURAN_BALOK = { w: 18, h: 64 };
/** Balok panjang ke-i (paling banyak lima). */
export const letakBalok = (i: number): Titik => ({ x: 28 + i * 34, y: 86 });
export const UKURAN_KUBUS = 16;
/** Kubus kecil ke-j (paling banyak sembilan belas, empat kolom lima baris). */
export const letakKubus = (j: number): Titik => ({ x: 200 + (j % 4) * 22, y: 52 + Math.floor(j / 4) * 20 });
export const JARI_BALOK = 16;

/* ------------------------------ Place Value Chart: bagan dua kolom ------------------------------ */
export const BAGAN = { y: 66, h: 74, p: { x: 40, w: 100 }, s: { x: 160, w: 100 } };
export const pusatBagan = (kol: "puluhan" | "satuan"): Titik => {
  const k = kol === "puluhan" ? BAGAN.p : BAGAN.s;
  return { x: k.x + k.w / 2, y: BAGAN.y + BAGAN.h / 2 + 6 };
};
/** Dua bagan (sebelum dan sesudah kartu ditukar) untuk soal tukar: atas dan bawah. */
export const BAGAN2 = { atas: { y: 24, h: 56 }, bawah: { y: 108, h: 56 }, p: { x: 50, w: 90 }, s: { x: 160, w: 90 } };
/** Kartu angka pilihan (Klik): satu baris di bawah. */
export const UKURAN_KARTU = { w: 44, h: 34 };
export const letakKartu = (i: number, n: number): Titik => ({ x: 150 + (i - (n - 1) / 2) * 56, y: 172 });
/** Contoh bilangan di atas bagan (Klik): kotak penuh mini dan kue lepas mini. */
export const letakRefPaket = (i: number): Titik => ({ x: 28 + i * 28, y: 42 });
export const letakRefLepas = (j: number): Titik => ({ x: 166 + (j % 9) * 14, y: 42 });

/* ------------------------------ Expanded Form: bentuk panjang ------------------------------ */
export const SLOT_P = { x: 20, y: 92, w: 112, h: 44 };
export const SLOT_S = { x: 168, y: 92, w: 112, h: 44 };
export const UKURAN_CHIP = { w: 66, h: 34 };
/** Kartu pilihan puluhan dan satuan (Klik): satu baris di bawah, empat kartu. */
export const letakChip = (i: number): Titik => ({ x: 38 + i * 74, y: 172 });
/** Bentuk panjang tanpa interaksi: kelompok puluhan di kiri, tanda tambah, kelompok satuan di kanan. */
export const letakPaketUraian = (i: number): Titik => ({ x: 34 + i * 28, y: 74 });
export const letakLepasUraian = (j: number): Titik => ({ x: 192 + (j % 5) * 20, y: 64 + Math.floor(j / 5) * 22 });

/* ------------------------------ Ucapan bilangan nol sampai lima puluh ------------------------------ */
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
 * Semua bilangan nol sampai lima puluh yang terdengar dalam teks (urut kemunculan, tanpa kembar). Mengenali "sebelas", "sepuluh",
 * "<satuan> belas", "<dua sampai lima> puluh" dengan satuan di belakangnya ("dua puluh lima"), kata satuan, dan angka.
 */
export function bilanganDariUcapan50(teks: string): number[] {
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
    if (w in DASAR) {
      const v = DASAR[w];
      if (lanjut === "belas" && v >= 1) {
        tambah(10 + v);
        i += 1;
        continue;
      }
      if (lanjut === "puluh" && v >= 1 && v <= 5) {
        const sisa = kt[i + 2];
        if (v === 1) {
          tambah(10);
          i += 1;
        } else if (sisa !== undefined && sisa in DASAR && DASAR[sisa] >= 1 && kt[i + 3] !== "puluh" && kt[i + 3] !== "belas") {
          tambah(v * 10 + DASAR[sisa]);
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
