/**
 * Teks misi dan nama simulasi Kelas 6 Bab 4. Berkas kecil tanpa impor, dipisah dari SimulasiK6Bab4.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen laboratorium ke bundel awal.
 */

export type HurufK6B4 = "A" | "B";
const HURUF: HurufK6B4[] = ["A", "B"];

export const hurufK6B4 = (sub: string): HurufK6B4 => (HURUF.includes(sub as HurufK6B4) ? (sub as HurufK6B4) : "A");

export const MISI_K6B4: Record<HurufK6B4, string> = {
  A: "Di Lab Skala, hitung kejadian yang cocok dan semua yang ada, tempatkan di lima tangga dari tidak mungkin sampai pasti, geser ke dua ujung tangga, lalu uji prediksi dengan catatan percobaan roda putar. Periksa dengan Mesin Skala, lalu selesaikan skenario Dhien dan Poster Lomba. Selesaikan semua misi wajib, boleh mulai dari mana saja.",
  B: "Di Lab Banding, hitung hasil menguntungkan dan semua hasil, samakan total dua peluang untuk memilih yang lebih mungkin, ingat bahwa peluang besar belum pasti, lalu nilai apakah permainan dua pemain adil atau kurang adil. Periksa dengan Mesin Banding, lalu selesaikan skenario Dhien dan Kotak Hadiah. Selesaikan semua misi wajib, boleh mulai dari mana saja.",
};

export const NAMA_SIM_K6B4: Record<HurufK6B4, string> = {
  A: "Lab Skala, Mesin Skala, dan Dhien dan Poster Lomba",
  B: "Lab Banding, Mesin Banding, dan Dhien dan Kotak Hadiah",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK6Bab4 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K6B4[hurufK6B4(sub)]}`;
