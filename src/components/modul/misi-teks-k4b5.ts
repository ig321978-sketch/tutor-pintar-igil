/**
 * Teks misi dan nama simulasi Kelas 4 Bab 5. Berkas kecil tanpa impor, dipisah dari SimulasiK4Bab5.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen laboratorium ke bundel awal.
 */

export type HurufK4B5 = "A" | "B";
const HURUF: HurufK4B5[] = ["A", "B"];

export const hurufK4B5 = (sub: string): HurufK4B5 => (HURUF.includes(sub as HurufK4B5) ? (sub as HurufK4B5) : "A");

export const MISI_K4B5: Record<HurufK4B5, string> = {
  A: "Di Lab Ciri, kenali segi banyak, bentuk segitiga siku-siku, persegi, dan trapesium di papan paku, lalu pilah segitiga menurut sudutnya. Periksa dengan Mesin Ciri, lalu selesaikan skenario Papan Paku Helen. Selesaikan semua misi wajib, urutannya bebas.",
  B: "Di Lab Susun, susun keping segitiga menjadi persegi, jajargenjang, dan trapesium, urai segienam menjadi segitiga, dan tutup siluet tangram. Periksa dengan Mesin Susun-Urai, lalu tuntaskan skenario Bengkel Kertas Helen. Selesaikan semua misi wajib: ini misi penutup bab.",
};

export const NAMA_SIM_K4B5: Record<HurufK4B5, string> = {
  A: "Lab Ciri, Mesin Ciri, dan Papan Paku Helen",
  B: "Pencapaian Misi Bab: Lab Susun, Mesin Susun-Urai, dan Bengkel Kertas Helen",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK4Bab5 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K4B5[hurufK4B5(sub)]}`;
