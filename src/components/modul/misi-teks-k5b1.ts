/**
 * Teks misi dan nama simulasi Kelas 5 Bab 1. Berkas kecil tanpa impor, dipisah dari SimulasiK5Bab1.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen laboratorium ke bundel awal.
 */

export type HurufK5B1 = "A" | "B" | "C";
const HURUF: HurufK5B1[] = ["A", "B", "C"];

export const hurufK5B1 = (sub: string): HurufK5B1 => (HURUF.includes(sub as HurufK5B1) ? (sub as HurufK5B1) : "A");

export const MISI_K5B1: Record<HurufK5B1, string> = {
  A: "Di Lab Nilai Tempat, tulis bilangan di tabel enam tempat, baca bilangan per kelompok tiga digit, lalu tentukan tempat dan nilai digitnya. Periksa dengan Mesin Nilai Tempat, lalu selesaikan skenario Papan Data Desa. Selesaikan semua misi wajib, boleh mulai dari mana saja.",
  B: "Di Lab Banding, bandingkan dua bilangan dari kiri sampai ketemu penentunya, letakkan bilangan di garis dengan acuan, lalu urutkan naik dan turun. Periksa dengan Mesin Banding, lalu selesaikan skenario Lomba Dakon. Selesaikan semua misi wajib, boleh mulai dari mana saja.",
  C: "Di Lab Susun Bilangan, uraikan bilangan menjadi suku nilai tempat, susun bilangan dari kartu dengan berbagai cara, lalu tukar kartu tanpa mengubah jumlahnya. Periksa dengan Mesin Uraian, lalu selesaikan skenario Uang Asep dan Komang. Selesaikan semua misi wajib, boleh mulai dari mana saja.",
};

export const NAMA_SIM_K5B1: Record<HurufK5B1, string> = {
  A: "Lab Nilai Tempat, Mesin Nilai Tempat, dan Papan Data Desa",
  B: "Lab Banding, Mesin Banding, dan Lomba Dakon",
  C: "Lab Susun Bilangan, Mesin Uraian, dan Uang Asep dan Komang",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK5Bab1 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K5B1[hurufK5B1(sub)]}`;
