/**
 * Teks misi dan nama simulasi Kelas 6 Bab 1. Berkas kecil tanpa impor, dipisah dari SimulasiK6Bab1.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen laboratorium ke bundel awal.
 */

export type HurufK6B1 = "A";
const HURUF: HurufK6B1[] = ["A"];

export const hurufK6B1 = (sub: string): HurufK6B1 => (HURUF.includes(sub as HurufK6B1) ? (sub as HurufK6B1) : "A");

export const MISI_K6B1: Record<HurufK6B1, string> = {
  A: "Di Lab Kali Pecahan, arsir petak dengan ember sampai hasil kali ketemu, tulis bilangan asli sebagai pecahan berpenyebut satu lalu ikuti panah lurus, dan tukar urutan kali untuk mengecek hasilnya. Periksa dengan Mesin Kali Pecahan, lalu selesaikan skenario Agam dan Kebun Ayah. Selesaikan semua misi wajib, boleh mulai dari mana saja.",
};

export const NAMA_SIM_K6B1: Record<HurufK6B1, string> = {
  A: "Lab Kali Pecahan, Mesin Kali Pecahan, dan Agam dan Kebun Ayah",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK6Bab1 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K6B1[hurufK6B1(sub)]}`;
