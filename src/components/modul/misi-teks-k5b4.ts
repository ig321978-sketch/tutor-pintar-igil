/**
 * Teks misi dan nama simulasi Kelas 5 Bab 4. Berkas kecil tanpa impor, dipisah dari SimulasiK5Bab4.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen laboratorium ke bundel awal.
 */

export type HurufK5B4 = "A" | "B";
const HURUF: HurufK5B4[] = ["A", "B"];

export const hurufK5B4 = (sub: string): HurufK5B4 => (HURUF.includes(sub as HurufK5B4) ? (sub as HurufK5B4) : "A");

export const MISI_K5B4: Record<HurufK5B4, string> = {
  A: "Di Lab Jalur, susuri sisi bangun sampai kembali ke sudut awal, pasang ruas pagar di tepi tanah berpetak, dan bedakan jalur tepi dari isi petak. Periksa dengan Mesin Jalur, lalu selesaikan skenario Pagar dan Bingkai. Selesaikan semua misi wajib, boleh mulai dari mana saja.",
  B: "Di Lab Segitiga, jumlahkan ketiga sisi segitiga, periksa dulu apakah ketiga sisinya sama panjang sebelum memakai tiga dikali sisi, dan ukur sisi pada penggaris sebelum menjumlahkan. Periksa dengan Mesin Segitiga, lalu selesaikan skenario Bendera Pita Segitiga. Selesaikan semua misi wajib, boleh mulai dari mana saja.",
};

export const NAMA_SIM_K5B4: Record<HurufK5B4, string> = {
  A: "Lab Jalur, Mesin Jalur, dan Pagar dan Bingkai",
  B: "Lab Segitiga, Mesin Segitiga, dan Bendera Pita Segitiga",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK5Bab4 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K5B4[hurufK5B4(sub)]}`;
