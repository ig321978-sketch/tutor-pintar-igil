/**
 * Data Simulasi Lantai Ubin Kelas 4 Bab 4 Sub-Bab A "Lantai Ubin Bu Sinta", awal cerita Kolam Renang Tirta Ceria.
 * Data berbeda dari Story (tiga baris empat kolom, empat baris lima kolom, lima baris enam kolom, dua meter persegi) dan dari tugas CPA. Tiga sasaran tiap alat.
 * Mind-map dan Infografis memakai data kartu (data-kartu.ts). Diuji: scripts/uji-ubin-k4b4a.mjs.
 */

export type SatuanSim = "cm²" | "m²";
/** Lantai b baris dan k kolom ubin; tiap ubin satu `u`. */
export type LantaiSim = { b: number; k: number; u: SatuanSim };

/** Tutup: lantai kosong; anak memasang ubin satu per satu (atau satu baris sekaligus) sampai pas dengan lantai. */
export const TARGET_TUTUP: readonly LantaiSim[] = [
  { b: 2, k: 3, u: "cm²" },
  { b: 3, k: 3, u: "m²" },
  { b: 2, k: 4, u: "m²" },
];

/** Baris: lantai sudah tertutup; anak mengisi luasnya (baris kali kolom) dengan satuannya. */
export const TARGET_BARIS: readonly LantaiSim[] = [
  { b: 3, k: 5, u: "cm²" },
  { b: 4, k: 6, u: "m²" },
  { b: 6, k: 3, u: "cm²" },
];

/** Tangga: luas dalam meter persegi; anak mengisi banyak kelompok sepuluh ribu sentimeter persegi yang sama dengannya. */
export const TARGET_TANGGA: readonly number[] = [3, 5, 7];

/** Satuan: benda yang diukur; anak memilih satuan luas yang tepat (cm² untuk benda kecil, m² untuk lantai besar). */
export type BendaSim = { benda: string; u: SatuanSim };
export const TARGET_SATUAN: readonly BendaSim[] = [
  { benda: "lantai kolam anak", u: "m²" },
  { benda: "kertas saku Laras", u: "cm²" },
  { benda: "lantai ruang ganti", u: "m²" },
];

/** Batas alat: ubin paling banyak pada lantai, luas paling besar pada alat Baris, dan banyak kelompok paling besar pada alat Tangga. */
export const TUTUP_MAKS = 12;
export const BARIS_MAKS = 30;
export const TANGGA_MAKS = 9;

export const MISI_UBIN_TEKS = "Tutup lantai dengan ubin, hitung luas dari baris dan kolom, ubah meter persegi ke sentimeter persegi, lalu pilih satuan yang tepat. Urutannya bebas.";
