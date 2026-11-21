/**
 * Data Simulasi Panggung Deret Kelas 4 Bab 3 Sub-Bab A "Deret Angklung Bu Ratri", awal cerita Orkestra Angklung Kampung Senandung.
 * Data berbeda dari Story (deret dua, empat, enam dan tujuh, lima, tiga) dan dari tugas CPA. Tiga sasaran tiap alat.
 * Mind-map dan Infografis memakai data kartu (data-kartu.ts). Diuji: scripts/uji-angklung-k4b3a.mjs.
 */

/** Pola deret: `a` banyak pada deret pertama, `d` selisih bertanda antara dua deret berurutan. */
export type PolaSim = { a: number; d: number };

/** Tata: tiga deret sudah ada di rak; anak menata deret keempat dengan menambah angklung satu per satu. */
export const TARGET_TATA: readonly PolaSim[] = [
  { a: 3, d: 2 },
  { a: 10, d: -3 },
  { a: 1, d: 3 },
];

/** Jenis: tiga deret berurutan; anak memilih membesar atau mengecil. Jenis ditentukan arah, bukan besar angkanya. */
export const TARGET_JENIS: readonly PolaSim[] = [
  { a: 6, d: 3 },
  { a: 11, d: -2 },
  { a: 1, d: 4 },
];

/** Tabel: tiga deret dengan selisih belum diisi; anak mengatur selisih bertanda. */
export const TARGET_TABEL: readonly PolaSim[] = [
  { a: 4, d: 3 },
  { a: 12, d: -4 },
  { a: 2, d: 5 },
];

/** Lima: Bu Ratri meminta sejumlah angklung disusun per lima; anak menambah baris lima atau satu angklung. */
export const TARGET_LIMA: readonly number[] = [7, 12, 9];

/** Banyak angklung paling banyak pada satu deret yang ditata, selisih terbesar pada alat Tabel, dan batas susunan per lima. */
export const BANYAK_MAKS = 12;
export const BEDA_MAKS = 9;
export const LIMA_MAKS = 15;

export const MISI_ANGKLUNG_TEKS = "Tata deret angklung berikutnya, pilih jenis pola, isi selisih pada tabel, lalu susun angklung per lima. Urutannya bebas.";
