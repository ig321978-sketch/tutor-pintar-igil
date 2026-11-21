/**
 * Data Simulasi Gabung Loyang Kelas 5 Bab 3 Sub-Bab B "Roti Isi Pak Seno": mobil roti keliling di taman.
 * Data berbeda dari Story dan Infografis dan dari tugas CPA. Tiga sasaran tiap alat. Semua jawaban dihitung dari data (logika-data.ts).
 * Mind-map dan Infografis memakai data kartu (data-kartu.ts). Diuji: scripts/uji-loyang-k5b3b.mjs.
 */

/** Gabung: dua bagian loyang berpenyebut sama; anak mengatur pembilang dan penyebut hasil (penyebut harus tetap). Jumlah pembilang kurang dari penyebut dan sudah sederhana. */
export type SasaranGabung = { a: number; b: number; d: number };
export const TARGET_GABUNG: readonly SasaranGabung[] = [
  { a: 2, b: 3, d: 9 },
  { a: 3, b: 4, d: 11 },
  { a: 1, b: 5, d: 7 },
];

/** Samakan: dua pecahan berpenyebut beda; anak memilih KPK kedua penyebut. */
export type SasaranSamakan = { a: number; p: number; b: number; q: number };
export const TARGET_SAMAKAN: readonly SasaranSamakan[] = [
  { a: 1, p: 6, b: 3, q: 4 },
  { a: 3, p: 5, b: 1, q: 2 },
  { a: 2, p: 3, b: 1, q: 2 },
];

/** Campur: dua pecahan campuran berpenyebut sama `d`; anak mengatur bilangan bulat dan pembilang hasil. Hasil sudah sederhana. */
export type SasaranCampur = { w1: number; n1: number; w2: number; n2: number; d: number };
export const TARGET_CAMPUR: readonly SasaranCampur[] = [
  { w1: 1, n1: 2, w2: 2, n2: 3, d: 7 },
  { w1: 2, n1: 5, w2: 1, n2: 3, d: 9 },
  { w1: 1, n1: 5, w2: 3, n2: 6, d: 8 },
];

/** Sederhana: pecahan tak murni n/d; anak memilih satu dari empat kartu sebagai pecahan campuran paling sederhana. */
export type SasaranSederhana = { n: number; d: number; kartu: [string, string, string, string] };
export const TARGET_SEDERHANA: readonly SasaranSederhana[] = [
  { n: 13, d: 8, kartu: ["1 5/13", "13/8", "1 5/8", "2 5/8"] },
  { n: 14, d: 6, kartu: ["2 2/6", "2 1/3", "7/6", "2 4/6"] },
  { n: 12, d: 9, kartu: ["1 3/9", "1 1/3", "4/9", "3/4"] },
];

export const MISI_LOYANG_TEKS = "Gabungkan pecahan berpenyebut sama, samakan penyebut dengan KPK, jumlahkan pecahan campuran, dan sederhanakan hasilnya. Urutannya bebas.";
