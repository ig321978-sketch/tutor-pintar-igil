/**
 * Teks misi dan nama simulasi Kelas 4 Bab 6. Berkas kecil tanpa impor, dipisah dari SimulasiK4Bab6.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen laboratorium ke bundel awal.
 */

export type HurufK4B6 = "A" | "B";
const HURUF: HurufK4B6[] = ["A", "B"];

export const hurufK4B6 = (sub: string): HurufK4B6 => (HURUF.includes(sub as HurufK4B6) ? (sub as HurufK4B6) : "A");

export const MISI_K4B6: Record<HurufK4B6, string> = {
  A: "Di Lab Piktogram, catat mainan Karel dengan turus, susun piktogram warna kesukaan dan siswa per kelas, lalu baca nilai dan selisihnya. Periksa dengan Mesin Piktogram, lalu selesaikan skenario Turus Kelas Karel. Selesaikan semua misi wajib, urutannya bebas.",
  B: "Di Lab Batang, buat diagram batang alat transportasi dan siswa per kelas, beri judul dan label sumbu, ubah menjadi mendatar, lalu hitung selisih buku Rabu dan Sabtu. Periksa dengan Mesin Batang, lalu tuntaskan skenario Pameran Data Azizah. Selesaikan semua misi wajib: ini misi penutup bab.",
};

export const NAMA_SIM_K4B6: Record<HurufK4B6, string> = {
  A: "Lab Piktogram, Mesin Piktogram, dan Turus Kelas Karel",
  B: "Pencapaian Misi Bab: Lab Batang, Mesin Batang, dan Pameran Data Azizah",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK4Bab6 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K4B6[hurufK4B6(sub)]}`;
