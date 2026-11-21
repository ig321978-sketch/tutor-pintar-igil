/**
 * Data Simulasi Etalase Keramik Kelas 4 Bab 5 Sub-Bab A "Etalase Keramik Bu Dewi", awal cerita Toko Keramik Bu Dewi.
 * Data berbeda dari Story dan dari tugas CPA. Tiga sasaran tiap alat. Bangun dari katalog (logika-bangun.ts); jawaban dihitung dari koordinat.
 * Mind-map dan Infografis memakai data kartu (data-kartu.ts). Diuji: scripts/uji-etalase-k4b5a.mjs.
 */

/** Pilah: keramik di rak; anak menggolongkan tiap keramik menurut banyak sisinya (ketuk keramik untuk mengganti golongan). */
export const TARGET_PILAH: readonly (readonly string[])[] = [
  ["segitiga-sama-sisi", "persegi-panjang", "segitiga-siku", "trapesium", "persegi"],
  ["segilima-beraturan", "belah-ketupat", "segitiga-sembarang", "layang-layang", "segilima-sembarang"],
  ["segienam-sembarang", "jajargenjang", "segitiga-tumpul", "segienam-beraturan", "persegi"],
];
/** Golongan pilihan: banyak sisi 3, 4, 5, atau 6 (0 = belum dipilih). */
export const GOLONGAN_PILAH: readonly number[] = [3, 4, 5, 6];

/** Sisi: segiempat di rak; anak menandai ciri yang dimilikinya (sisi sama panjang, sudut siku-siku, dua pasang sisi sejajar). */
export const TARGET_SISI: readonly string[] = ["belah-ketupat", "persegi-panjang", "persegi"];
export type CiriSisi = "sama" | "siku" | "sejajar";
export const CIRI_SISI: readonly { id: CiriSisi; nama: string }[] = [
  { id: "sama", nama: "4 sisi sama panjang" },
  { id: "siku", nama: "4 sudut siku-siku" },
  { id: "sejajar", nama: "2 pasang sisi sejajar" },
];

/** Pohon: bangun induk diberi tambahan ciri; anak memilih nama bangun yang terbentuk. Nomor di ANAK (logika-cpa.ts). */
export const TARGET_POHON: readonly number[] = [5, 3, 6];

/** Segitiga: anak memilih jenis menurut sisinya dan menurut sudutnya. */
export const TARGET_SEGITIGA: readonly string[] = ["segitiga-tumpul", "segitiga-siku", "segitiga-sama-kaki"];
export const NAMA_SISI_SEGITIGA: readonly string[] = ["sama sisi", "sama kaki", "sembarang"];
export const NAMA_SUDUT_SEGITIGA: readonly string[] = ["siku-siku", "lancip", "tumpul"];

export const MISI_ETALASE_TEKS = "Pilah keramik menurut banyak sisinya, periksa ciri segiempat, telusuri pohon keluarga bentuk, lalu golongkan segitiga. Urutannya bebas.";
