/**
 * Teks misi dan nama simulasi Kelas 5 Bab 7. Berkas kecil tanpa impor, dipisah dari SimulasiK5Bab7.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen laboratorium ke bundel awal.
 */

export type HurufK5B7 = "A";
const HURUF: HurufK5B7[] = ["A"];

export const hurufK5B7 = (sub: string): HurufK5B7 => (HURUF.includes(sub as HurufK5B7) ? (sub as HurufK5B7) : "A");

export const MISI_K5B7: Record<HurufK5B7, string> = {
  A: "Di Lab Segitiga, uji tiga sedotan dengan jumlah dua sisi lawan sisi ketiga, hitung sudut ketiga dari jumlah 180°, dan impitkan sisi untuk menentukan jenis segitiga sampai hierarki sama sisi dan sama kaki. Periksa dengan Mesin Segitiga, lalu selesaikan skenario Yohana di Candi Sewu. Selesaikan semua misi wajib, boleh mulai dari mana saja.",
};

export const NAMA_SIM_K5B7: Record<HurufK5B7, string> = {
  A: "Lab Segitiga, Mesin Segitiga, dan Yohana di Candi Sewu",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK5Bab7 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K5B7[hurufK5B7(sub)]}`;
