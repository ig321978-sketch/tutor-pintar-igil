/**
 * Teks misi dan nama simulasi Modul Kedua Kelas 4 Bab 1 Sub-Bab A. Berkas kecil tanpa impor, dipisah dari SimulasiK4B1Kedua.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen laboratorium ke bundel awal.
 * Naskah orisinal IGIL; acuan topik Matematika SD/MI Kelas IV Bab 1 Sub-Bab A.
 */

export const MISI_K4B1KA =
  "Di Lab Kemasan, rakit bilangan dengan peti, dus, bungkus, dan benda, baca bilangannya (nol dilewati, ribuan 1 dibaca seribu), dan tulis lambang dari kata. Periksa dengan Mesin Baca, lalu selesaikan skenario Gim Kebun Kira. Selesaikan semua misi wajib, urutannya bebas.";

export const NAMA_SIM_K4B1KA = "Lab Kemasan, Mesin Baca, dan Gim Kebun Kira";

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK4B1KA = (sub: string): string => (sub === "A" ? `Simulasi 1. Misi: ${MISI_K4B1KA}` : "");
