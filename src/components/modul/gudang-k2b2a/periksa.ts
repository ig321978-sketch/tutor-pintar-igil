/**
 * Tata letak adegan dan pengenal ucapan Kelas 2 Bab 2 Sub-Bab A (tanpa React, diuji di Node: scripts/uji-gudang-k2b2a.mjs).
 * Kanvas adegan 300 x 200. Memakai ulang pemeriksa Kelas 1 Bab 1 Sub-Bab A (lingkari, tanda satu per satu, tulisan angka).
 */
export { periksaCentang, periksaLingkari, periksaTulis, LEBAR_ADEGAN, TINGGI_ADEGAN, type Goresan, type Titik } from "../lemari-k1b1a/periksa-jawab";
import type { Titik } from "../lemari-k1b1a/periksa-jawab";

const r1 = (n: number): number => Number(n.toFixed(1));

/* ------------------------------ Kotak sepuluh petak (Make a Ten dan Round and Adjust) ------------------------------ */
export const KOTAK_P = { x: 30, y: 36, w: 240, h: 34 };
/** Pusat petak ke-i (0 sampai 9) kotak sepuluh petak. */
export const letakPetak = (i: number): Titik => ({ x: r1(KOTAK_P.x + 12 + i * 24), y: r1(KOTAK_P.y + 17) });
export const UKURAN_PETAK = 18;
/** Jari-jari penerimaan tanda pada petak. Jarak dua petak (24) lebih dari dua kali jari-jari. */
export const JARI_PETAK = 10;

/** Benda ke-i dari n di tumpukan kedua: satu baris di tengah. */
export const UKURAN_TUMPUK = 22;
export const letakTumpuk = (i: number, n: number): Titik => ({ x: r1(150 + (i - (n - 1) / 2) * Math.min(26, 260 / Math.max(n, 1))), y: 118 });
export const JARI_TUMPUK = 12;

/* ------------------------------ Kembar (dua baris benda) ------------------------------ */
export const Y_BARIS = [58, 108];
export const UKURAN_BARIS = 22;
export const letakBaris = (baris: number, i: number, n: number): Titik => ({ x: r1(150 + (i - (n - 1) / 2) * Math.min(27, 270 / Math.max(n, 1))), y: Y_BARIS[baris] });
export const JARI_BARIS = 12;

/* ------------------------------ Maju dari yang besar ------------------------------ */
export const KARTU_AWAL = { x: 14, y: 40, w: 86, h: 80 };
export const UKURAN_KECIL = 26;
/** Benda kecil ke-i (paling banyak delapan): empat kolom, dua baris, di kanan kartu bilangan awal. */
export const letakKecil = (i: number): Titik => ({ x: 132 + (i % 4) * 38, y: 62 + Math.floor(i / 4) * 40 });
export const JARI_KECIL = 15;

/** Letak papan hitungan berjalan di bawah gambar. */
export const Y_HITUNGAN = 168;

/* ------------------------------ Ucapan bilangan nol sampai dua puluh ------------------------------ */
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
 * Semua bilangan nol sampai dua puluh yang terdengar dalam teks (urut kemunculan, tanpa kembar). Mengenali angka, "sebelas", "sepuluh",
 * "<satuan> belas", "dua puluh" (juga digabung), dan kata satuan. "dua belas" terbaca satu bilangan, yaitu dua belas.
 */
export function bilanganDariUcapan20(teks: string): number[] {
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
      if (lanjut === "puluh" && v === 2) {
        tambah(20);
        i += 1;
        continue;
      }
      if (w !== "se") tambah(v);
    }
  }
  return hasil;
}
