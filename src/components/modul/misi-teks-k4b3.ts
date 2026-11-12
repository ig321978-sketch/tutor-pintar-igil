/**
 * Teks misi dan nama simulasi Kelas 4 Bab 3. Berkas kecil tanpa impor, dipisah dari SimulasiK4Bab3.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen laboratorium ke bundel awal.
 */

export type HurufK4B3 = "A" | "B";
const HURUF: HurufK4B3[] = ["A", "B"];

export const hurufK4B3 = (sub: string): HurufK4B3 => (HURUF.includes(sub as HurufK4B3) ? (sub as HurufK4B3) : "A");

export const MISI_K4B3: Record<HurufK4B3, string> = {
  A: "Di Lab Pola Gambar, susun kumpulan berikutnya dari pola membesar dan mengecil, isi tabel selisih, dan buat pola gambarmu sendiri. Periksa dengan Mesin Pola Gambar, lalu selesaikan skenario Jeruk dan Permen Dina. Selesaikan semua misi wajib, urutannya bebas.",
  B: "Di Lab Pola Bilangan, temukan beda dari pasangan suku berurutan, jalankan mesin aturan, dan isi tabel nilai. Periksa dengan Mesin Pola Bilangan, lalu tuntaskan skenario Pameran Pola Kelas 4. Selesaikan semua misi wajib: ini misi penutup bab.",
};

export const NAMA_SIM_K4B3: Record<HurufK4B3, string> = {
  A: "Lab Pola Gambar, Mesin Pola Gambar, dan Jeruk dan Permen Dina",
  B: "Pencapaian Misi Bab: Lab Pola Bilangan, Mesin Pola Bilangan, dan Pameran Pola Kelas 4",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK4Bab3 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K4B3[hurufK4B3(sub)]}`;
