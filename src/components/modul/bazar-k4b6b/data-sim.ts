/**
 * Data Simulasi Batang Bazar Kelas 4 Bab 6 Sub-Bab B "Diagram Batang Pak Dodi", akhir cerita Bazar Kuliner Sekolah.
 * Data berbeda dari Story (jajanan Bu Rini), Infografis, dan tugas CPA (mangkuk, sendok, cangkir, brosur). Eksplorasi bebas tanpa skor. Diuji: scripts/uji-bazar-k4b6b.mjs.
 */
import type { Diagram } from "./logika-data";

export const SIM_DIAGRAM: Diagram[] = [
  { id: "s1", judul: "Mangkuk per stan", satuan: "mangkuk", tingkat: 5, arah: "tegak", batang: [{ nama: "Soto", banyak: 15 }, { nama: "Nasi", banyak: 25 }, { nama: "Mie", banyak: 20 }, { nama: "Bubur", banyak: 10 }] },
  { id: "s2", judul: "Sendok per tenda", satuan: "buah", tingkat: 2, arah: "datar", batang: [{ nama: "Tenda Merah", banyak: 8 }, { nama: "Tenda Biru", banyak: 12 }, { nama: "Tenda Hijau", banyak: 6 }, { nama: "Tenda Kuning", banyak: 10 }] },
  { id: "s3", judul: "Cangkir per stan", satuan: "cangkir", tingkat: 10, arah: "tegak", batang: [{ nama: "Teh", banyak: 20 }, { nama: "Kopi", banyak: 40 }, { nama: "Susu", banyak: 30 }, { nama: "Cokelat", banyak: 50 }] },
  { id: "s4", judul: "Brosur per hari", satuan: "lembar", tingkat: 5, arah: "datar", batang: [{ nama: "Senin", banyak: 20 }, { nama: "Selasa", banyak: 25 }, { nama: "Rabu", banyak: 15 }] },
];

/** Buat: sasaran diagram yang dibangun batang demi batang (alat menolak batang melewati garis paling atas). */
export const BUAT_SIM: readonly number[] = [0, 1, 2, 3];
/** Baca: batang yang dibaca (indeks) dan tiga pilihan banyak (satu benar, dihitung dari data; posisi benar bervariasi). */
export type SasaranBaca = { d: number; b: number; pil: [string, string, string] };
export const BACA_SIM: readonly SasaranBaca[] = [
  { d: 0, b: 1, pil: ["5 mangkuk", "25 mangkuk", "20 mangkuk"] },
  { d: 1, b: 3, pil: ["5 buah", "10 buah", "20 buah"] },
  { d: 2, b: 0, pil: ["2 cangkir", "10 cangkir", "20 cangkir"] },
  { d: 3, b: 1, pil: ["20 lembar", "5 lembar", "25 lembar"] },
];
/** Banding: dua batang diadu, tiga pilihan selisih. */
export type SasaranBanding = { d: number; a: number; b: number; pil: [string, string, string] };
export const BANDING_SIM: readonly SasaranBanding[] = [
  { d: 0, a: 1, b: 3, pil: ["35 mangkuk", "15 mangkuk", "10 mangkuk"] },
  { d: 1, a: 1, b: 2, pil: ["18 buah", "6 buah", "4 buah"] },
  { d: 2, a: 3, b: 0, pil: ["70 cangkir", "20 cangkir", "30 cangkir"] },
  { d: 3, a: 0, b: 1, pil: ["40 lembar", "10 lembar", "5 lembar"] },
];
/** Putar: diagram diputar (arah berganti), lalu pilih jenis yang batangnya paling panjang. */
export type SasaranPutar = { d: number; pil: [string, string, string] };
export const PUTAR_SIM: readonly SasaranPutar[] = [
  { d: 0, pil: ["Bubur", "Nasi", "Soto"] },
  { d: 1, pil: ["Tenda Hijau", "Tenda Biru", "Tenda Kuning"] },
  { d: 2, pil: ["Kopi", "Teh", "Cokelat"] },
  { d: 3, pil: ["Rabu", "Selasa", "Senin"] },
];

export const MISI_BAZAR_TEKS = "Bangun diagram batang dari data, baca banyak batang pada sumbu, adu dua batang, dan putar diagram. Urutannya bebas.";
