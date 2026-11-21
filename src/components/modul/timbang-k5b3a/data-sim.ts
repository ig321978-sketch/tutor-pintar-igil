/**
 * Data Simulasi Garis Timbang Kelas 5 Bab 3 Sub-Bab A "Tiga Kantong Tepung Bu Ratna", awal cerita Toko Roti Keliling.
 * Data berbeda dari Story dan dari tugas CPA (susu, gula, telur, selai, pita kotak roti, krim, cokelat, jarak mobil roti). Tiga sasaran tiap alat.
 * Semua jawaban dihitung dari bilangan lewat logika-data.ts. Diuji: scripts/uji-timbang-k5b3a.mjs.
 */
import { pec, type Pec } from "./logika-data";

/** Garis: ketuk tanda pada garis bilangan 0 sampai `maks` (tiap satuan dibagi q bagian) tempat pecahan f berada. */
export type SasaranGaris = { f: Pec; maks: number; benda: string; satuan: string };
export const TARGET_GARIS: readonly SasaranGaris[] = [
  { f: pec(1, 2, 3), maks: 3, benda: "susu yang dituang ke gelas ukur", satuan: "liter" },
  { f: pec(2, 1, 4), maks: 3, benda: "gula yang dibeli untuk adonan", satuan: "kilogram" },
  { f: pec(0, 3, 5), maks: 2, benda: "krim yang dioleskan pada kue", satuan: "liter" },
];

/** Ubah: atur pembilang pecahan biasa (penyebut tetap) yang sama besar dengan pecahan campuran f. */
export type SasaranUbah = { f: Pec; benda: string; satuan: string };
export const TARGET_UBAH: readonly SasaranUbah[] = [
  { f: pec(3, 1, 5), benda: "selai stroberi di dapur", satuan: "kilogram" },
  { f: pec(2, 5, 6), benda: "krim di panci besar", satuan: "liter" },
  { f: pec(1, 3, 8), benda: "cokelat leleh untuk roti", satuan: "kilogram" },
];

/** Banding: samakan penyebut dengan KPK, lalu pilih tanda. Tanda benar dihitung dari bilangan (a dibanding b). */
export type SasaranBanding = { a: Pec; b: Pec; benda: string; satuan: string };
export const TARGET_BANDING: readonly SasaranBanding[] = [
  { a: pec(0, 3, 4), b: pec(0, 5, 6), benda: "adonan roti dan adonan kue", satuan: "kilogram" },
  { a: pec(0, 2, 3), b: pec(0, 3, 5), benda: "gula untuk dua loyang", satuan: "kilogram" },
  { a: pec(2, 1, 3), b: pec(2, 2, 6), benda: "pita untuk dua kotak roti", satuan: "meter" },
];

/** Urut: ketuk tiga pecahan berurutan dari yang terkecil (naik) atau dari yang terbesar (turun). */
export type SasaranUrut = { daftar: readonly Pec[]; naik: boolean; benda: string; satuan: string };
export const TARGET_URUT: readonly SasaranUrut[] = [
  { daftar: [pec(2, 1, 2), pec(1, 5, 6), pec(2, 1, 3)], naik: true, benda: "mentega di tiga mangkuk", satuan: "kilogram" },
  { daftar: [pec(0, 3, 4), pec(0, 5, 8), pec(0, 7, 10)], naik: false, benda: "telur di tiga rak", satuan: "kilogram" },
  { daftar: [pec(4, 1, 3), pec(4, 1, 4), pec(3, 9, 10)], naik: true, benda: "susu di tiga panci", satuan: "liter" },
];

export const MISI_TIMBANG_TEKS =
  "Geser tanda ke letak pecahan pada garis bilangan, ubah pecahan campuran menjadi pecahan biasa, samakan penyebut dengan KPK lalu pilih tanda, dan urutkan tiga pecahan. Urutannya bebas.";
