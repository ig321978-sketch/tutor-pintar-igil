/**
 * Teks misi dan nama simulasi Kelas 5 Bab 8. Berkas kecil tanpa impor, dipisah dari SimulasiK5Bab8.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen laboratorium ke bundel awal.
 */

export type HurufK5B8 = "A";
const HURUF: HurufK5B8[] = ["A"];

export const hurufK5B8 = (sub: string): HurufK5B8 => (HURUF.includes(sub as HurufK5B8) ? (sub as HurufK5B8) : "A");

export const MISI_K5B8: Record<HurufK5B8, string> = {
  A: "Di Lab Data, catat jawaban mentah dengan turus berkelompok lima, isi tabel frekuensi sampai jumlahnya sama dengan banyak data, cari kesalahan rekap, lalu tentukan mode untuk mengambil keputusan. Periksa dengan Mesin Data, lalu selesaikan skenario Anggi dan Donat. Selesaikan semua misi wajib, boleh mulai dari mana saja.",
};

export const NAMA_SIM_K5B8: Record<HurufK5B8, string> = {
  A: "Lab Data, Mesin Data, dan Anggi dan Donat",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK5Bab8 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K5B8[hurufK5B8(sub)]}`;
