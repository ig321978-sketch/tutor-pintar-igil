/**
 * Data Simulasi Mosaik Keramik Kelas 4 Bab 5 Sub-Bab B "Mosaik Pak Rudi", akhir cerita Toko Keramik Bu Dewi.
 * Data berbeda dari Story (segienam dibelah enam, persegi dari dua segitiga) dan dari tugas CPA. Eksplorasi bebas tanpa skor. Diuji: scripts/uji-mosaik-k4b5b.mjs.
 */

/** Pasang: rak berisi empat keping segitiga siku-siku sama kaki dengan panjang kaki (satuan) berbeda; sasaran bangun hasil pasangan dua keping. */
export type SasaranPasang = { rak: [number, number, number, number]; sasaran: "persegi" | "segitiga" };
export const PASANG_SIM: readonly SasaranPasang[] = [
  { rak: [2, 3, 3, 2], sasaran: "persegi" },
  { rak: [3, 2, 2, 3], sasaran: "segitiga" },
  { rak: [2, 2, 3, 3], sasaran: "segitiga" },
  { rak: [3, 3, 2, 2], sasaran: "persegi" },
];

/** Bagi: segi banyak beraturan n sisi, ditarik garis dari titik tengah ke tiap sudut; tiga pilihan banyak segitiga memuat satu yang benar. */
export type SasaranBagi = { n: number; pil: [number, number, number] };
export const BAGI_SIM: readonly SasaranBagi[] = [
  { n: 7, pil: [8, 7, 6] },
  { n: 8, pil: [9, 7, 8] },
  { n: 5, pil: [4, 6, 5] },
  { n: 9, pil: [10, 9, 8] },
];

/** Sudut: segi banyak cembung n sisi; dari titik sudut pertama ditarik garis ke semua sudut yang tidak bersebelahan. */
export type SasaranSudut = { n: number };
export const SUDUT_SIM: readonly SasaranSudut[] = [{ n: 5 }, { n: 6 }, { n: 7 }, { n: 8 }];

export const MISI_MOSAIK_TEKS = "Pasang dua keping sama besar menjadi bangun baru, tarik garis dari titik tengah, dan belah bangun dari satu sudut. Urutannya bebas.";
