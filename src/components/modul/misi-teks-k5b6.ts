/**
 * Teks misi dan nama simulasi Kelas 5 Bab 6. Berkas kecil tanpa impor, dipisah dari SimulasiK5Bab6.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen laboratorium ke bundel awal.
 */

export type HurufK5B6 = "A";
const HURUF: HurufK5B6[] = ["A"];

export const hurufK5B6 = (sub: string): HurufK5B6 => (HURUF.includes(sub as HurufK5B6) ? (sub as HurufK5B6) : "A");

export const MISI_K5B6: Record<HurufK5B6, string> = {
  A: "Di Lab Pojok, lipat kertas jadi patokan siku-siku, tempelkan patokan ke pojok benda untuk membandingkan, dan periksa pojok benda di sekitar sebagai detektif sudut. Periksa dengan Mesin Pojok, lalu selesaikan skenario Bingkai Pak Tukang. Selesaikan semua misi wajib, boleh mulai dari mana saja.",
};

export const NAMA_SIM_K5B6: Record<HurufK5B6, string> = {
  A: "Lab Pojok, Mesin Pojok, dan Bingkai Pak Tukang",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK5Bab6 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K5B6[hurufK5B6(sub)]}`;
