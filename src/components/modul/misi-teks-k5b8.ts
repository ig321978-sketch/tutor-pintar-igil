/**
 * Teks misi dan nama simulasi Kelas 5 Bab 8. Berkas kecil tanpa impor, dipisah dari SimulasiK5Bab8.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen laboratorium ke bundel awal.
 */

export type HurufK5B8 = "A" | "B" | "C";
const HURUF: HurufK5B8[] = ["A", "B", "C"];

export const hurufK5B8 = (sub: string): HurufK5B8 => (HURUF.includes(sub as HurufK5B8) ? (sub as HurufK5B8) : "A");

export const MISI_K5B8: Record<HurufK5B8, string> = {
  A: "Di Lab Data, catat jawaban mentah dengan turus berkelompok lima, isi tabel frekuensi sampai jumlahnya sama dengan banyak data, cari kesalahan rekap, lalu tentukan mode untuk mengambil keputusan. Periksa dengan Mesin Data, lalu selesaikan skenario Anggi dan Donat. Selesaikan semua misi wajib, boleh mulai dari mana saja.",
  B: "Di Lab Piktogram, pilih kunci yang membuat semua frekuensi bisa digambar, baca nilai dari banyak simbol dikali kunci termasuk setengah simbol, lalu cari cacat piktogram dan perbaiki. Periksa dengan Mesin Piktogram, lalu selesaikan skenario Anggi dan Kue Apem. Selesaikan semua misi wajib, boleh mulai dari mana saja.",
  C: "Di Lab Batang, baca diagram batang dengan urutan judul, skala, lalu tinggi batang, pilih skala yang baik dan tolak yang meluap, terlalu longgar, atau tidak teratur, lalu bandingkan batang ganda dengan selisih, tren, dan penyajian yang tepat. Periksa dengan Mesin Batang, lalu selesaikan skenario Rani dan Sea Games. Selesaikan semua misi wajib, boleh mulai dari mana saja.",
};

export const NAMA_SIM_K5B8: Record<HurufK5B8, string> = {
  A: "Lab Data, Mesin Data, dan Anggi dan Donat",
  B: "Lab Piktogram, Mesin Piktogram, dan Anggi dan Kue Apem",
  C: "Lab Batang, Mesin Batang, dan Rani dan Sea Games",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK5Bab8 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K5B8[hurufK5B8(sub)]}`;
