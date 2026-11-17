/**
 * Tata letak adegan dan pemeriksa kanvas Kelas 1 Bab 8 Sub-Bab A (tanpa React, diuji di Node: scripts/uji-pustaka-k1b8a.mjs).
 * Kanvas adegan 300 x 200. Memakai ulang pemeriksa Kelas 1 Bab 1 Sub-Bab A (lingkari dan tanda satu per satu) dan pengenal ucapan sampai dua puluh Bab 5 Sub-Bab A.
 */
import type { Titik } from "../lemari-k1b1a/periksa-jawab";
import { acak } from "./logika";

export { periksaCentang, periksaLingkari, periksaTulis, LEBAR_ADEGAN, TINGGI_ADEGAN, type Goresan, type Titik } from "../lemari-k1b1a/periksa-jawab";
export { bilanganDariUcapan20 } from "../ikan-k1b5a/periksa";

const r1 = (n: number): number => Number(n.toFixed(1));

/* ------------------------------ Tumpukan benda bercampur (Metode IGIL) ------------------------------ */
export const UKURAN_TUMPUK = 26;
/** Jari-jari penerimaan tanda di tumpukan: kurang dari separuh jarak terdekat antarbenda. */
export const JARI_TUMPUK = 14;
const KOLOM_TUMPUK = 6;
const SEL_W = 44;
const SEL_H = 36;
/** Letak benda ke-i dari n benda bercampur: sel di petak enam kolom, urutan selnya diacak menurut `benih`, sedikit bergeser tetap. Paling banyak delapan belas benda. */
export function letakTumpukan(n: number, benih: number): Titik[] {
  const sel = acak(Array.from({ length: n }, (_, i) => i), benih + 11);
  return Array.from({ length: n }, (_, i) => {
    const s = sel[i];
    const geserX = ((s * 7 + benih * 3) % 5) - 2;
    const geserY = ((s * 11 + benih) % 5) - 2;
    return { x: r1(36 + (s % KOLOM_TUMPUK) * SEL_W + geserX), y: r1(50 + Math.floor(s / KOLOM_TUMPUK) * SEL_H + geserY) };
  });
}
/** Baris tempat goresan turus digambar di bawah tumpukan. */
export const TURUS_TUMPUK = { x: 26, y: 160 };

/* ------------------------------ Turus per jenis (baris di papan, Pictorial dan Abstract suara) ------------------------------ */
export const barisTurus = (r: number): { x: number; y: number } => ({ x: 70, y: 50 + r * 38 });

/* ------------------------------ Lingkaran pilah (Sorting Hoops) ------------------------------ */
export const R_LINGKARAN = 44;
export const Y_LINGKARAN = 126;
export const UKURAN_DALAM = 17;
/** Pusat lingkaran ke-j dari k lingkaran (tiga atau empat). */
export const pusatLingkaran = (j: number, k: number): Titik => (k === 4 ? { x: 38 + j * 75, y: Y_LINGKARAN } : { x: 52 + j * 98, y: Y_LINGKARAN });
export const rLingkaran = (k: number): number => (k === 4 ? 34 : R_LINGKARAN);
/** Letak benda ke-s di dalam lingkaran j: tiga kolom, baris demi baris. */
export function letakDalam(j: number, k: number, s: number): Titik {
  const c = pusatLingkaran(j, k);
  const jarak = k === 4 ? 17 : 20;
  return { x: r1(c.x + ((s % 3) - 1) * jarak), y: r1(c.y + (Math.floor(s / 3) - 1) * jarak + 1) };
}
/** Kolam benda yang belum masuk lingkaran (Klik): satu baris di atas. */
export const letakKolam = (i: number, n: number): Titik => ({ x: r1(150 + (i - (n - 1) / 2) * Math.min(30, 270 / n)), y: 44 });

/* ------------------------------ Pasangan satu-satu (One-to-One Matching) ------------------------------ */
export const UKURAN_PASANG = 24;
export const Y_PASANG = [66, 132];
export const jarakPasang = (n: number): number => Math.min(30, Math.floor(264 / Math.max(n, 1)));
export const letakPasang = (baris: number, i: number, n: number): Titik => ({ x: r1(150 + (i - (n - 1) / 2) * jarakPasang(Math.max(n, 2))), y: Y_PASANG[baris] });
export const JARI_PASANG = 13;

/* ------------------------------ Tabel frekuensi ------------------------------ */
export const TABEL = { y0: 62, pitch: 32, h: 30, xLabel: 14, wLabel: 84, xGoresan: 100, wGoresan: 186 };
export const barisAtas = (r: number): number => TABEL.y0 + r * TABEL.pitch;
/** Pusat baris r untuk lingkari. */
export const pusatBaris = (r: number): Titik => ({ x: 150, y: barisAtas(r) + TABEL.h / 2 });
/** Strip benda yang muncul satu per satu (Klik): pusat benda ke-i dari n. */
export const letakKejadian = (i: number, n: number): Titik => ({ x: r1(150 + (i - (n - 1) / 2) * Math.min(22, 270 / Math.max(n, 1))), y: 34 });
