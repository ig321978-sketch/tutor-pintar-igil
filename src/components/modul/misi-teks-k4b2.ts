/**
 * Teks misi dan nama simulasi Kelas 4 Bab 2. Berkas kecil tanpa impor, dipisah dari SimulasiK4Bab2.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen laboratorium ke bundel awal.
 */

export type HurufK4B2 = "A" | "B" | "C" | "D" | "E";
const HURUF: HurufK4B2[] = ["A", "B", "C", "D", "E"];

export const hurufK4B2 = (sub: string): HurufK4B2 => (HURUF.includes(sub as HurufK4B2) ? (sub as HurufK4B2) : "A");

export const MISI_K4B2: Record<HurufK4B2, string> = {
  A: "Di Lab Pecahan, bagi keseluruhan menjadi bagian sama besar dan arsir satu bagian, bandingkan dua pecahan berpembilang satu, dan temukan 1/n pada garis. Periksa dengan Mesin Pecahan, lalu selesaikan skenario Pizza Tiara. Selesaikan semua misi wajib, urutannya bebas.",
  B: "Di Lab Batang, baca pecahan dari batang, bandingkan dua pecahan yang penyebutnya sama, dan urutkan pecahan. Periksa dengan Mesin Batang, lalu selesaikan skenario Kebun Slamet. Selesaikan semua misi wajib.",
  C: "Di Lab Senilai, kalikan atau bagi pembilang dan penyebut dengan bilangan yang sama, lihat bahwa mengubah satu saja merusak nilai, dan sederhanakan dengan FPB. Periksa dengan Mesin Senilai, lalu selesaikan skenario Cokelat Helen. Selesaikan semua misi wajib.",
  D: "Di Lab Desimal, tulis pecahan persepuluhan dan perseratusan sebagai desimal, hitung angka di belakang koma, dan jembatani pecahan ke desimal. Periksa dengan Mesin Desimal, lalu selesaikan skenario Roti dan Biskuit Ibu. Selesaikan semua misi wajib.",
  E: "Di Lab Persen, hubungkan desimal perseratusan dengan persen lewat kisi, cara biasa dan cara langsung, ubah balik persen ke desimal, dan selesaikan cerita persen. Periksa dengan Mesin Persen, lalu tuntaskan skenario Pameran Pecahan Kelas 4. Selesaikan semua misi wajib: ini misi penutup bab.",
};

export const NAMA_SIM_K4B2: Record<HurufK4B2, string> = {
  A: "Lab Pecahan, Mesin Pecahan, dan Pizza Tiara",
  B: "Lab Batang, Mesin Batang, dan Kebun Slamet",
  C: "Lab Senilai, Mesin Senilai, dan Cokelat Helen",
  D: "Lab Desimal, Mesin Desimal, dan Roti dan Biskuit Ibu",
  E: "Pencapaian Misi Bab: Lab Persen, Mesin Persen, dan Pameran Pecahan Kelas 4",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK4Bab2 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K4B2[hurufK4B2(sub)]}`;
