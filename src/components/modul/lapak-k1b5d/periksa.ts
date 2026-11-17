/**
 * Tata letak adegan dan pemeriksa kanvas Kelas 1 Bab 5 Sub-Bab D (tanpa React, diuji di Node: scripts/uji-lapak-k1b5d.mjs).
 * Kanvas adegan 300 x 200. Memakai ulang pemeriksa Kelas 1 Bab 1 Sub-Bab A (lingkari, tanda) dan pengenal ucapan sampai dua puluh Sub-Bab A.
 */
import type { Titik } from "../lemari-k1b1a/periksa-jawab";

export { periksaCentang, periksaLingkari, periksaTulis, LEBAR_ADEGAN, TINGGI_ADEGAN, type Goresan, type Titik } from "../lemari-k1b1a/periksa-jawab";
export { bilanganDariUcapan20 } from "../ikan-k1b5a/periksa";

/* ------------------------------ Metode IGIL: dua kumpulan, puluhan dulu lalu satuan ------------------------------ */
export const KOTAK_BANDING = { w: 132, h: 132 };
export const letakBanding = (i: number): Titik => ({ x: 78 + i * 144, y: 112 });
/** Letak benda ke-i (relatif terhadap pusat kumpulan) dari n benda: tiap sepuluh dalam satu ikatan dua baris, sisanya di bawah. */
export function letakIsiBanding(i: number, n: number): Titik {
  const p = Math.floor(n / 10);
  if (i < p * 10) {
    const j = i % 10;
    return { x: ((j % 5) - 2) * 12, y: -46 + Math.floor(i / 10) * 32 + Math.floor(j / 5) * 12 };
  }
  const j = i - p * 10;
  return { x: ((j % 5) - 2) * 12, y: -46 + p * 32 + 4 + Math.floor(j / 5) * 13 };
}

/* ------------------------------ One-to-One Matching: dua baris berpasangan ------------------------------ */
export const BARIS_PASANG = [76, 146];
export const KARTU_BARIS = { w: 40, h: 30 };
export const letakBaris = (b: number): Titik => ({ x: 26, y: BARIS_PASANG[b] });
export const letakPasang = (b: number, i: number): Titik => ({ x: 62 + i * 21, y: BARIS_PASANG[b] });
/** Tempat benda atas setelah dipindahkan ke dekat pasangannya. */
export const letakDipasang = (i: number): Titik => ({ x: 62 + i * 21, y: BARIS_PASANG[1] - 24 });

/* ------------------------------ Cube Towers: tiga menara ------------------------------ */
export const KUBUS = { w: 28, h: 7.5 };
export const DASAR_MENARA = 182;
export const letakMenara = (i: number): Titik => ({ x: 75 + i * 75, y: DASAR_MENARA });
/** Pusat menara setinggi n kubus (untuk lingkari). */
export const pusatMenara = (i: number, n: number): Titik => ({ x: letakMenara(i).x, y: DASAR_MENARA - (n * KUBUS.h) / 2 });

/* ------------------------------ Number Line Order: kartu dan tempat urut ------------------------------ */
export const KARTU_URUT = { w: 64, h: 52 };
export const letakKartu = (i: number, n: number): Titik => ({ x: 150 + (i - (n - 1) / 2) * 80, y: 60 });
export const letakSlot = (i: number, n: number): Titik => ({ x: 150 + (i - (n - 1) / 2) * 80, y: 128 });
/** Garis bilangan nol sampai dua puluh di bawah tempat urut (Pictorial). */
export const GARIS_URUT = { x0: 16, x1: 284, y: 176 };
export const xGaris = (n: number): number => GARIS_URUT.x0 + (n / 20) * (GARIS_URUT.x1 - GARIS_URUT.x0);
