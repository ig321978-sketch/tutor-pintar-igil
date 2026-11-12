/**
 * Teks misi dan nama simulasi Kelas 5 Bab 9. Berkas kecil tanpa impor, dipisah dari SimulasiK5Bab9.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen laboratorium ke bundel awal.
 */

export type HurufK5B9 = "A";
const HURUF: HurufK5B9[] = ["A"];

export const hurufK5B9 = (sub: string): HurufK5B9 => (HURUF.includes(sub as HurufK5B9) ? (sub as HurufK5B9) : "A");

export const MISI_K5B9: Record<HurufK5B9, string> = {
  A: "Di Lab Nilai Tempat, baca bilangan dari kiri, tulis bilangan dari kata ke enam kolom tempat dengan nol yang tetap ditulis, cari kolom yang salah pada tabel teman, lalu tentukan nilai sebuah angka dan ubah 999.999 menjadi satu juta. Periksa dengan Mesin Nilai Tempat, lalu selesaikan skenario Nisa dan Lemari Jepara. Selesaikan semua misi wajib, boleh mulai dari mana saja.",
};

export const NAMA_SIM_K5B9: Record<HurufK5B9, string> = {
  A: "Lab Nilai Tempat, Mesin Nilai Tempat, dan Nisa dan Lemari Jepara",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK5Bab9 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K5B9[hurufK5B9(sub)]}`;
