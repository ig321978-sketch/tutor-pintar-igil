/**
 * Teks misi dan nama simulasi Kelas 6 Bab 3. Berkas kecil tanpa impor, dipisah dari SimulasiK6Bab3.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen laboratorium ke bundel awal.
 */

export type HurufK6B3 = "A";
const HURUF: HurufK6B3[] = ["A"];

export const hurufK6B3 = (sub: string): HurufK6B3 => (HURUF.includes(sub as HurufK6B3) ? (sub as HurufK6B3) : "A");

export const MISI_K6B3: Record<HurufK6B3, string> = {
  A: "Di Lab Susunan, susun lalu urai kubus sambil menghitung lantai demi lantai, hitung seluruh kubus balok termasuk yang tertutup, dan periksa agar tidak ada kubus yang melayang. Periksa dengan Mesin Susunan, lalu selesaikan skenario Tigor dan Tenri Susun Rumah Kubus. Selesaikan semua misi wajib, boleh mulai dari mana saja.",
};

export const NAMA_SIM_K6B3: Record<HurufK6B3, string> = {
  A: "Lab Susunan, Mesin Susunan, dan Tigor dan Tenri Susun Rumah Kubus",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK6Bab3 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K6B3[hurufK6B3(sub)]}`;
