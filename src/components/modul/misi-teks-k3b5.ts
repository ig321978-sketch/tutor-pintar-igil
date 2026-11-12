/**
 * Teks misi dan nama simulasi Kelas 3 Bab 5. Berkas kecil tanpa impor, dipisah dari SimulasiK3Bab5.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen laboratorium ke bundel awal.
 */

export type HurufK3B5 = "A" | "B";

export const hurufK3B5 = (sub: string): HurufK3B5 => (sub === "B" ? "B" : "A");

export const MISI_K3B5: Record<HurufK3B5, string> = {
  A: "Di Lab Data Kelompok, ubah banyak benda lima anak, urutkan, cari data terkecil dan terbesar, hitung jangkauan, bandingkan dua anak, dan cacah nilai ulangan dengan turus. Periksa dengan Mesin Urut, lalu selesaikan skenario Pemilihan Ketua Kelas. Selesaikan semua misi wajib, urutannya bebas.",
  B: "Di Lab Tabel, tulis turus kelompok lima, isi tabel manik, huruf, dan nilai sampai lengkap, lalu baca tabelnya: terbanyak, tersedikit, lebih dari, dan kurang dari. Periksa dengan Mesin Tabel, lalu tuntaskan skenario Laporan Kelas. Selesaikan semua misi wajib: ini misi penutup bab.",
};

export const NAMA_SIM_K3B5: Record<HurufK3B5, string> = {
  A: "Lab Data Kelompok, Mesin Urut, dan Pemilihan Ketua Kelas",
  B: "Pencapaian Misi Bab: Lab Tabel, Mesin Tabel, dan Laporan Kelas",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK3Bab5 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K3B5[hurufK3B5(sub)]}`;
