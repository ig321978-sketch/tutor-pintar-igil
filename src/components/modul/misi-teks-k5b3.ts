/**
 * Teks misi dan nama simulasi Kelas 5 Bab 3. Berkas kecil tanpa impor, dipisah dari SimulasiK5Bab3.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen laboratorium ke bundel awal.
 */

export type HurufK5B3 = "A" | "B" | "C";
const HURUF: HurufK5B3[] = ["A", "B", "C"];

export const hurufK5B3 = (sub: string): HurufK5B3 => (HURUF.includes(sub as HurufK5B3) ? (sub as HurufK5B3) : "A");

export const MISI_K5B3: Record<HurufK5B3, string> = {
  A: "Di Lab Banding Pecahan, letakkan pecahan di garis bilangan, samakan penyebut untuk membandingkan dua pecahan, dan ubah pecahan campuran menjadi pecahan biasa. Periksa dengan Mesin Banding, lalu selesaikan skenario Lompat Jauh Yohana. Selesaikan semua misi wajib, boleh mulai dari mana saja.",
  B: "Di Lab Jumlah Arsir, jumlahkan dua pecahan berpenyebut sama, samakan penyebut dengan KPK untuk menjumlahkan pecahan berpenyebut berbeda, lalu sederhanakan hasilnya. Periksa dengan Mesin Jumlah, lalu selesaikan skenario Martabak dan Wingko Komang. Selesaikan semua misi wajib, boleh mulai dari mana saja.",
  C: "Di Lab Sisa Arsir, ambil sebagian bagian dari pecahan berpenyebut sama, samakan penyebut dengan KPK untuk pecahan berpenyebut berbeda, lalu sederhanakan hasilnya dan periksa dengan penjumlahan. Periksa dengan Mesin Sisa, lalu selesaikan skenario Kertas Lukis Yohana dan Lukas, yang memakai semua yang kamu pelajari di bab ini. Selesaikan semua misi wajib, boleh mulai dari mana saja.",
};

export const NAMA_SIM_K5B3: Record<HurufK5B3, string> = {
  A: "Lab Banding Pecahan, Mesin Banding, dan Lompat Jauh Yohana",
  B: "Lab Jumlah Arsir, Mesin Jumlah, dan Martabak dan Wingko Komang",
  C: "Lab Sisa Arsir, Mesin Sisa, dan Kertas Lukis Yohana dan Lukas",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK5Bab3 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K5B3[hurufK5B3(sub)]}`;
