/**
 * Teks misi dan nama simulasi Kelas 4 Bab 1. Berkas kecil tanpa impor, dipisah dari SimulasiK4Bab1.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen laboratorium ke bundel awal.
 */

export type HurufK4B1 = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I";
const HURUF: HurufK4B1[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

export const hurufK4B1 = (sub: string): HurufK4B1 => (HURUF.includes(sub as HurufK4B1) ? (sub as HurufK4B1) : "A");

export const MISI_K4B1: Record<HurufK4B1, string> = {
  A: "Di Lab Kemasan, rakit bilangan dengan peti, dus, bungkus, dan benda, baca bilangannya (nol tidak dibaca, ribuan 1 dibaca seribu), dan tulis lambang dari kata. Periksa dengan Mesin Baca, lalu selesaikan skenario Helen di Minimarket. Selesaikan semua misi wajib, urutannya bebas.",
  B: "Di Lab Nilai Tempat, ketuk angka untuk melihat nilainya, nyalakan uraian, dan isi tabel digit. Periksa dengan Mesin Nilai, lalu selesaikan skenario Struk Belanja Azizah. Selesaikan semua misi wajib.",
  C: "Di Lab Banding, bandingkan dua bilangan dari ribuan, temukan tempat penentu, urutkan tinggi gunung dan harga, dan susun kartu digit. Periksa dengan Mesin Banding, lalu selesaikan skenario Harga di Pasar. Selesaikan semua misi wajib.",
  D: "Di Lab Susun-Urai, susun bilangan dari keping, kelompokkan, urai dengan lebih dari satu cara, dan susun uang pecahan. Periksa dengan Mesin Susun, lalu selesaikan skenario Uang Helen. Selesaikan semua misi wajib.",
  E: "Di Lab Jumlah Bersusun, jumlahkan kolom demi kolom dari satuan, simpan bila sepuluh atau lebih, bandingkan dengan cara panjang, dan jumlahkan tiga bilangan. Periksa dengan Mesin Jumlah, lalu selesaikan skenario Jeruk Pak Toni. Selesaikan semua misi wajib.",
  F: "Di Lab Kurang Bersusun, kurangkan kolom demi kolom dari satuan, ambil 1 dari kiri bila tidak cukup, dan periksa dengan penjumlahan. Periksa dengan Mesin Kurang, lalu selesaikan skenario Buku Perpustakaan. Selesaikan semua misi wajib.",
  G: "Di Lab Kali, susun array kotak dan isi, belah bilangan menjadi puluhan dan satuan, dan kalikan bersusun dengan menyimpan. Periksa dengan Mesin Kali, lalu selesaikan skenario Donat dan Koperasi. Selesaikan semua misi wajib.",
  H: "Di Lab Bagi, bagikan benda bergiliran ke wadah, bagi bersusun dari puluhan ke satuan, hitung sisanya, dan periksa dengan perkalian. Periksa dengan Mesin Bagi, lalu selesaikan skenario Permen Pak Wicak. Selesaikan semua misi wajib.",
  I: "Di Lab Faktor, cari faktor dengan mencoba pembagi, tolak yang bersisa, lalu lompat untuk menemukan kelipatan dan kelipatan dalam batas. Periksa dengan Mesin Faktor, lalu tuntaskan skenario Pameran Kelas 4. Selesaikan semua misi wajib: ini misi penutup bab.",
};

export const NAMA_SIM_K4B1: Record<HurufK4B1, string> = {
  A: "Lab Kemasan, Mesin Baca, dan Helen di Minimarket",
  B: "Lab Nilai Tempat, Mesin Nilai, dan Struk Belanja Azizah",
  C: "Lab Banding, Mesin Banding, dan Harga di Pasar",
  D: "Lab Susun-Urai, Mesin Susun, dan Uang Helen",
  E: "Lab Jumlah Bersusun, Mesin Jumlah, dan Jeruk Pak Toni",
  F: "Lab Kurang Bersusun, Mesin Kurang, dan Buku Perpustakaan",
  G: "Lab Kali, Mesin Kali, dan Donat dan Koperasi",
  H: "Lab Bagi, Mesin Bagi, dan Permen Pak Wicak",
  I: "Pencapaian Misi Bab: Lab Faktor, Mesin Faktor, dan Pameran Kelas 4",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK4Bab1 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K4B1[hurufK4B1(sub)]}`;
