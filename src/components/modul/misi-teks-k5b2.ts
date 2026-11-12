/**
 * Teks misi dan nama simulasi Kelas 5 Bab 2. Berkas kecil tanpa impor, dipisah dari SimulasiK5Bab2.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen laboratorium ke bundel awal.
 */

export type HurufK5B2 = "A";
const HURUF: HurufK5B2[] = ["A"];

export const hurufK5B2 = (sub: string): HurufK5B2 => (HURUF.includes(sub as HurufK5B2) ? (sub as HurufK5B2) : "A");

export const MISI_K5B2: Record<HurufK5B2, string> = {
  A: "Di Lab Lompat Kelipatan, melompatlah dengan jarak sama di garis bilangan, warnai kelipatan di tabel seratus, dan periksa dengan sisa pembagian apakah suatu bilangan kelipatan. Periksa dengan Mesin Kelipatan, lalu selesaikan skenario Tepuk Kelipatan Nisa. Selesaikan semua misi wajib, boleh mulai dari mana saja.",
};

export const NAMA_SIM_K5B2: Record<HurufK5B2, string> = {
  A: "Lab Lompat Kelipatan, Mesin Kelipatan, dan Tepuk Kelipatan Nisa",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK5Bab2 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K5B2[hurufK5B2(sub)]}`;
