/**
 * Teks misi dan nama simulasi Kelas 5 Bab 2. Berkas kecil tanpa impor, dipisah dari SimulasiK5Bab2.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen laboratorium ke bundel awal.
 */

export type HurufK5B2 = "A" | "B" | "C" | "D";
const HURUF: HurufK5B2[] = ["A", "B", "C", "D"];

export const hurufK5B2 = (sub: string): HurufK5B2 => (HURUF.includes(sub as HurufK5B2) ? (sub as HurufK5B2) : "A");

export const MISI_K5B2: Record<HurufK5B2, string> = {
  A: "Di Lab Lompat Kelipatan, melompatlah dengan jarak sama di garis bilangan, warnai kelipatan di tabel seratus, dan periksa dengan sisa pembagian apakah suatu bilangan kelipatan. Periksa dengan Mesin Kelipatan, lalu selesaikan skenario Tepuk Kelipatan Nisa. Selesaikan semua misi wajib, boleh mulai dari mana saja.",
  B: "Di Lab Dua Jalur, lompatkan dua pelompat berjarak berbeda dan cari bilangan yang didarati keduanya, tandai bilangan yang ada di dua daftar kelipatan lalu pilih yang terkecil, dan tentukan kapan dua jadwal bertemu lagi. Periksa dengan Mesin KPK, lalu selesaikan skenario Jadwal Renang Yohana. Selesaikan semua misi wajib, boleh mulai dari mana saja.",
  C: "Di Lab Susunan Faktor, susun titik dalam baris yang sama banyak dan simpan susunan yang tidak bersisa, cari pasangan faktor sampai bertemu di tengah, dan tandai semua faktor sebuah bilangan. Periksa dengan Mesin Faktor, lalu selesaikan skenario Potong Petak Lukas. Selesaikan semua misi wajib, boleh mulai dari mana saja.",
  D: "Di Lab Faktor Bersama, tandai faktor yang ada di dua daftar faktor lalu pilih yang terbesar, bagi benda rata ke kelompok sebanyak mungkin tanpa sisa, dan periksa jembatan antara FPB, KPK, dan hasil kali dua bilangan. Periksa dengan Mesin FPB, lalu selesaikan skenario Vas Mawar Amelia. Selesaikan semua misi wajib, boleh mulai dari mana saja.",
};

export const NAMA_SIM_K5B2: Record<HurufK5B2, string> = {
  A: "Lab Lompat Kelipatan, Mesin Kelipatan, dan Tepuk Kelipatan Nisa",
  B: "Lab Dua Jalur, Mesin KPK, dan Jadwal Renang Yohana",
  C: "Lab Susunan Faktor, Mesin Faktor, dan Potong Petak Lukas",
  D: "Lab Faktor Bersama, Mesin FPB, dan Vas Mawar Amelia",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK5Bab2 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K5B2[hurufK5B2(sub)]}`;
