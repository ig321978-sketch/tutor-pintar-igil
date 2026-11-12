/**
 * Teks misi dan nama simulasi Kelas 4 Bab 5. Berkas kecil tanpa impor, dipisah dari SimulasiK4Bab5.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen laboratorium ke bundel awal.
 */

export type HurufK4B5 = "A";
const HURUF: HurufK4B5[] = ["A"];

export const hurufK4B5 = (sub: string): HurufK4B5 => (HURUF.includes(sub as HurufK4B5) ? (sub as HurufK4B5) : "A");

export const MISI_K4B5: Record<HurufK4B5, string> = {
  A: "Di Lab Ciri, kenali segi banyak, bentuk segitiga siku-siku, persegi, dan trapesium di papan paku, lalu pilah segitiga menurut sudutnya. Periksa dengan Mesin Ciri, lalu selesaikan skenario Papan Paku Helen. Selesaikan semua misi wajib, urutannya bebas.",
};

export const NAMA_SIM_K4B5: Record<HurufK4B5, string> = {
  A: "Lab Ciri, Mesin Ciri, dan Papan Paku Helen",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK4Bab5 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K4B5[hurufK4B5(sub)]}`;
