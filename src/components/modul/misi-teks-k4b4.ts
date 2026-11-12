/**
 * Teks misi dan nama simulasi Kelas 4 Bab 4. Berkas kecil tanpa impor, dipisah dari SimulasiK4Bab4.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen laboratorium ke bundel awal.
 */

export type HurufK4B4 = "A" | "B";
const HURUF: HurufK4B4[] = ["A", "B"];

export const hurufK4B4 = (sub: string): HurufK4B4 => (HURUF.includes(sub as HurufK4B4) ? (sub as HurufK4B4) : "A");

export const MISI_K4B4: Record<HurufK4B4, string> = {
  A: "Di Lab Luas, tutup meja tanpa celah dengan uang kertas dan origami, arsir bangun di kertas berpetak, dan ubah meter persegi menjadi sentimeter persegi. Periksa dengan Mesin Luas, lalu selesaikan skenario Meja Lipat Helen. Selesaikan semua misi wajib, urutannya bebas.",
  B: "Di Lab Volume, isi botol dari takaran kecil, susun kubus satuan lapis demi lapis, dan takar air sampai satu liter. Periksa dengan Mesin Volume, lalu tuntaskan skenario Dapur Helen. Selesaikan semua misi wajib: ini misi penutup bab.",
};

export const NAMA_SIM_K4B4: Record<HurufK4B4, string> = {
  A: "Lab Luas, Mesin Luas, dan Meja Lipat Helen",
  B: "Pencapaian Misi Bab: Lab Volume, Mesin Volume, dan Dapur Helen",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK4Bab4 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K4B4[hurufK4B4(sub)]}`;
