/**
 * Teks misi dan nama simulasi Kelas 3 Bab 1. Berkas kecil tanpa impor, dipisah dari SimulasiK3Bab1.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen laboratorium ke bundel awal.
 */

export type HurufK3B1 = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export const hurufK3B1 = (sub: string): HurufK3B1 =>
  sub === "B" || sub === "C" || sub === "D" || sub === "E" || sub === "F" || sub === "G" ? sub : "A";

export const MISI_K3B1: Record<HurufK3B1, string> = {
  A: "Buat bilangan tiga angka di Lab Papan Tempat, bacakan dengan Kata, tukar 10 satuan menjadi 1 puluhan, periksa dengan Mesin Baca-Tulis, lalu selesaikan skenario Tongkat Alfa. Selesaikan semua misi wajib, urutannya bebas.",
  B: "Buat bilangan di Lab Papan Tempat dan nyalakan Nilai untuk melihat nilai tiap angka, periksa dengan Mesin Angka dan Nilai, lalu selesaikan skenario Tiga Kaleng. Selesaikan semua misi wajib.",
  C: "Nyalakan Banding di Lab Papan Tempat dan cari tempat yang menentukan, urutkan kartu di Lab Urut, lalu selesaikan skenario Jarak ke Sekolah. Selesaikan semua misi wajib.",
  D: "Susun penjumlahan dua bilangan di Lab Susun Tambah, cari yang menyimpan dan yang tidak, periksa dengan Mesin Susun Tambah, lalu selesaikan skenario Alun-Alun. Selesaikan semua misi wajib.",
  E: "Susun pengurangan dua bilangan di Lab Susun Kurang, cari yang mengambil dan yang tidak, periksa hasilnya, lalu selesaikan Mesin Susun Kurang dan skenario Toko Pak Bandi. Selesaikan semua misi wajib.",
  F: "Buat kelompok di Lab Kelompok Kali, ubah menjadi penjumlahan berulang, garis loncat, dan tukar tempat, periksa dengan Mesin Kelompok, lalu selesaikan skenario Kebun Melati. Selesaikan semua misi wajib.",
  G: "Pakai Lab Kelompok untuk membagi dan memeriksa dengan kali, selesaikan Mesin Bagikan Bergiliran, lalu tuntaskan skenario Pencapaian Bab. Selesaikan semua misi wajib: ini misi penutup bab.",
};

export const NAMA_SIM_K3B1: Record<HurufK3B1, string> = {
  A: "Lab Papan Tempat, Mesin Baca-Tulis, dan Tongkat Alfa",
  B: "Papan Tempat (Nilai), Mesin Angka dan Nilai, dan Tiga Kaleng",
  C: "Papan Tempat (Banding), Lab Urut, dan Jarak ke Sekolah",
  D: "Lab Susun Tambah, Mesin Susun Tambah, dan Alun-Alun",
  E: "Lab Susun Kurang, Mesin Susun Kurang, dan Toko Pak Bandi",
  F: "Lab Kelompok Kali, Mesin Kelompok, dan Kebun Melati",
  G: "Pencapaian Misi Bab: Kali, Bagi, dan Pesta Alfa",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK3Bab1 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K3B1[hurufK3B1(sub)]}`;
