/**
 * Tata letak adegan dan pemeriksa kanvas Kelas 1 Bab 5 Sub-Bab C (tanpa React, diuji di Node: scripts/uji-kemas-k1b5c.mjs).
 * Kanvas adegan 300 x 200. Memakai ulang pemeriksa Kelas 1 Bab 1 Sub-Bab A (lingkari, tanda) dan pengenal ucapan sampai dua puluh Sub-Bab A.
 */
import type { Titik } from "../lemari-k1b1a/periksa-jawab";

export { periksaCentang, periksaLingkari, periksaTulis, LEBAR_ADEGAN, TINGGI_ADEGAN, type Goresan, type Titik } from "../lemari-k1b1a/periksa-jawab";
export { bilanganDariUcapan20 } from "../ikan-k1b5a/periksa";

/* ------------------------------ Metode IGIL: meja, kumpulan isi sepuluh, baki satuan ------------------------------ */
/** Barang di meja: dua baris sepuluh (paling banyak dua puluh). */
export const letakMeja = (i: number): Titik => ({ x: 15 + (i % 10) * 30, y: 48 + Math.floor(i / 10) * 30 });
/** Untuk kanvas: dua baris berjauhan supaya satu baris mudah dilingkari. */
export const letakMejaKanvas = (i: number): Titik => ({ x: 15 + (i % 10) * 30, y: 75 + Math.floor(i / 10) * 70 });
export const JARI_BARANG = 12;
export const IKATAN = { x: 8, y: 108, w: 136, h: 84 };
export const BAKI_SATUAN = { x: 156, y: 108, w: 136, h: 84 };
export const letakKumpul = (j: number): Titik => ({ x: IKATAN.x + 22 + (j % 5) * 23, y: IKATAN.y + 26 + Math.floor(j / 5) * 28 });
export const letakSatuan = (j: number): Titik => ({ x: BAKI_SATUAN.x + 22 + (j % 5) * 23, y: BAKI_SATUAN.y + 26 + Math.floor(j / 5) * 28 });

/* ------------------------------ Base Ten Blocks: balok puluhan dan kubus satuan ------------------------------ */
export const BATANG = { w: 22, h: 130 };
export const letakBatang = (i: number): Titik => ({ x: 30 + i * 34, y: 112 });
export const KUBUS = 24;
export const letakKubus = (j: number): Titik => ({ x: 130 + (j % 3) * 34, y: 70 + Math.floor(j / 3) * 34 });

/* ------------------------------ Place Value Chart: barang atau angka di atas, dua kolom di bawah ------------------------------ */
export const IKAT_ATAS = { w: 60, h: 34 };
export const letakIkatAtas = (i: number): Titik => ({ x: 40 + i * 70, y: 62 });
export const letakLepasAtas = (j: number): Titik => ({ x: 170 + (j % 5) * 25, y: 50 + Math.floor(j / 5) * 26 });
export const KARTU_DIGIT = { w: 50, h: 56 };
export const letakDigit = (i: number): Titik => ({ x: 120 + i * 60, y: 62 });
export const KOLOM = { w: 124, h: 80 };
export const letakKolom = (i: number): Titik => ({ x: 80 + i * 140, y: 148 });
export const letakIsiPuluhan = (i: number): Titik => ({ x: 50 + i * 60, y: 158 });
export const letakIsiSatuan = (j: number): Titik => ({ x: 168 + (j % 5) * 26, y: 146 + Math.floor(j / 5) * 24 });
/** Dua kartu kata tempat (puluhan kiri, satuan kanan) untuk memilih atau melingkari. */
export const LEBAR_KATA = 100;
export const letakKata = (i: number): Titik => ({ x: 85 + i * 130, y: 165 });

/* ------------------------------ Bundling Sticks: gudang di atas, baki di bawah ------------------------------ */
export const IKAT_SEDOTAN = { w: 24, h: 56 };
export const SEDOTAN = { w: 8, h: 56 };
export const letakGudangIkat = (i: number): Titik => ({ x: 24 + i * 30, y: 62 });
export const letakGudangLepas = (j: number): Titik => ({ x: 96 + j * 22, y: 62 });
export const letakBakiIkat = (i: number): Titik => ({ x: 24 + i * 30, y: 152 });
export const letakBakiLepas = (j: number): Titik => ({ x: 96 + j * 22, y: 152 });
