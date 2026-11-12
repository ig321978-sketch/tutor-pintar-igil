/**
 * Teks misi dan nama simulasi Kelas 4 Bab 2. Berkas kecil tanpa impor, dipisah dari SimulasiK4Bab2.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen laboratorium ke bundel awal.
 */

export type HurufK4B2 = "A" | "B" | "C";
const HURUF: HurufK4B2[] = ["A", "B", "C"];

export const hurufK4B2 = (sub: string): HurufK4B2 => (HURUF.includes(sub as HurufK4B2) ? (sub as HurufK4B2) : "A");

export const MISI_K4B2: Record<HurufK4B2, string> = {
  A: "Di Lab Pecahan, bagi keseluruhan menjadi bagian sama besar dan arsir satu bagian, bandingkan dua pecahan berpembilang satu, dan temukan 1/n pada garis. Periksa dengan Mesin Pecahan, lalu selesaikan skenario Pizza Tiara. Selesaikan semua misi wajib, urutannya bebas.",
  B: "Di Lab Batang, baca pecahan dari batang, bandingkan dua pecahan yang penyebutnya sama, dan urutkan pecahan. Periksa dengan Mesin Batang, lalu selesaikan skenario Kebun Slamet. Selesaikan semua misi wajib.",
  C: "Di Lab Senilai, kalikan atau bagi pembilang dan penyebut dengan bilangan yang sama, lihat bahwa mengubah satu saja merusak nilai, dan sederhanakan dengan FPB. Periksa dengan Mesin Senilai, lalu selesaikan skenario Cokelat Helen. Selesaikan semua misi wajib.",
};

export const NAMA_SIM_K4B2: Record<HurufK4B2, string> = {
  A: "Lab Pecahan, Mesin Pecahan, dan Pizza Tiara",
  B: "Lab Batang, Mesin Batang, dan Kebun Slamet",
  C: "Lab Senilai, Mesin Senilai, dan Cokelat Helen",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK4Bab2 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K4B2[hurufK4B2(sub)]}`;
