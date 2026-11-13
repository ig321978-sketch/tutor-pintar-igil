/**
 * Teks misi dan nama simulasi Kelas 6 Bab 2. Berkas kecil tanpa impor, dipisah dari SimulasiK6Bab2.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen laboratorium ke bundel awal.
 */

export type HurufK6B2 = "A";
const HURUF: HurufK6B2[] = ["A"];

export const hurufK6B2 = (sub: string): HurufK6B2 => (HURUF.includes(sub as HurufK6B2) ? (sub as HurufK6B2) : "A");

export const MISI_K6B2: Record<HurufK6B2, string> = {
  A: "Di Lab Rasio, hitung dua kelompok benda lalu tulis dan baca rasionya, sederhanakan rasio dengan membagi kedua suku memakai FPB, dan balik urutan rasio untuk melihat bahwa maknanya berbeda. Periksa dengan Mesin Rasio, lalu selesaikan skenario Artus dan Lahan Bibit. Selesaikan semua misi wajib, boleh mulai dari mana saja.",
};

export const NAMA_SIM_K6B2: Record<HurufK6B2, string> = {
  A: "Lab Rasio, Mesin Rasio, dan Artus dan Lahan Bibit",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK6Bab2 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K6B2[hurufK6B2(sub)]}`;
