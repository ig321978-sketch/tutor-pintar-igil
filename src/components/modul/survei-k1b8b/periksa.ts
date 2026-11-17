/**
 * Tata letak adegan dan pemeriksa kanvas Kelas 1 Bab 8 Sub-Bab B "Cerita Kesukaan Anak Kampung" (tanpa React, diuji di Node: scripts/uji-survei-k1b8b.mjs).
 * Kanvas adegan 300 x 200. Memakai ulang pemeriksa Kelas 1 Bab 1 Sub-Bab A (lingkari, tanda) dan pengenal ucapan Bab 5 Sub-Bab A.
 * Diagram tegak: kolom ke-k berdiri di x tertentu, gambar ke-i (dari bawah, mulai nol) bertumpuk rapat setinggi satu sel.
 */
import type { Titik } from "../lemari-k1b1a/periksa-jawab";

export { periksaCentang, periksaLingkari, periksaTulis, LEBAR_ADEGAN, TINGGI_ADEGAN, type Goresan, type Titik } from "../lemari-k1b1a/periksa-jawab";
export { bilanganDariUcapan20 } from "../ikan-k1b5a/periksa";

/** Sisi satu sel gambar dan tinggi garis bawah diagram. Sembilan gambar setinggi 126, tepat di bawah judul. */
export const SEL = 14;
export const DASAR_Y = 168;
export const SUMBU_X = 22;
/** Pusat kolom ke-k dari n kolom. */
export const xKolom = (k: number, n: number): number => 150 + (k - (n - 1) / 2) * 62;
/** Pusat gambar ke-i pada kolom k. `tinggi` (opsional): gambar direnggangkan sampai puncaknya setinggi sel ke-`tinggi` (kolom renggang). */
export function letakGambar(k: number, i: number, n: number, jumlah: number, tinggi?: number): Titik {
  const jarak = tinggi !== undefined && jumlah > 1 ? (tinggi - 1) / (jumlah - 1) : 1;
  return { x: xKolom(k, n), y: DASAR_Y - (i * jarak + 0.5) * SEL };
}
/** Titik pusat kolom k berisi `jumlah` gambar (untuk melingkari kolom). */
export const pusatKolom = (k: number, n: number, jumlah: number): Titik => ({ x: xKolom(k, n), y: DASAR_Y - (jumlah * SEL) / 2 });
/** Ukuran kartu kata di rupa lambang: dua baris kartu. */
export const KARTU = { w: 64, h: 54, y: 70 };
export const xKartu = (k: number, n: number): number => xKolom(k, n);
export const pusatKartu = (k: number, n: number): Titik => ({ x: xKartu(k, n), y: KARTU.y + KARTU.h / 2 });
