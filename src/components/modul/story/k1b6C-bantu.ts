/** Penyingkat naskah Story Kelas 1 Bab 6 Sub-Bab C: memakai ulang penyingkat Bab 1 Sub-Bab A, ditambah pencari kata bilangan. */
export { bersih, hapus, idx, k, sorotkan, redamkan, tambah, ubah, urutKata } from "./k1b1a-bantu";

const SATUAN = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];

/** Nama bilangan satu sampai dua puluh seperti diucapkan. */
export const namaBilangan = (n: number): string =>
  n === 10 ? "sepuluh" : n === 11 ? "sebelas" : n === 20 ? "dua puluh" : n > 11 ? `${SATUAN[n - 10]} belas` : SATUAN[n];
