/**
 * Teks misi dan nama simulasi Kelas 5 Bab 6. Berkas kecil tanpa impor, dipisah dari SimulasiK5Bab6.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen laboratorium ke bundel awal.
 */

export type HurufK5B6 = "A" | "B" | "C";
const HURUF: HurufK5B6[] = ["A", "B", "C"];

export const hurufK5B6 = (sub: string): HurufK5B6 => (HURUF.includes(sub as HurufK5B6) ? (sub as HurufK5B6) : "A");

export const MISI_K5B6: Record<HurufK5B6, string> = {
  A: "Di Lab Pojok, lipat kertas jadi patokan siku-siku, tempelkan patokan ke pojok benda untuk membandingkan, dan periksa pojok benda di sekitar sebagai detektif sudut. Periksa dengan Mesin Pojok, lalu selesaikan skenario Bingkai Pak Tukang. Selesaikan semua misi wajib, boleh mulai dari mana saja.",
  B: "Di Lab Sudut, namai bagian sudut yang disorot, buka dan tutup kaki sudut sampai lancip, siku-siku, dan tumpul, lalu tentukan jenis sudut antara dua jarum jam. Periksa dengan Mesin Sudut, lalu selesaikan skenario Yohana dan Kotak Pensil. Selesaikan semua misi wajib, boleh mulai dari mana saja.",
  C: "Di Lab Busur, pasang busur derajat dengan benar, pilih skala yang mulai dari nol di kaki pertama untuk membaca ukuran sudut, dan namai sudut dari nol sampai sudut penuh. Periksa dengan Mesin Busur, lalu selesaikan skenario Kipas Tari Pakarena. Selesaikan semua misi wajib, boleh mulai dari mana saja.",
};

export const NAMA_SIM_K5B6: Record<HurufK5B6, string> = {
  A: "Lab Pojok, Mesin Pojok, dan Bingkai Pak Tukang",
  B: "Lab Sudut, Mesin Sudut, dan Kotak Pensil Yohana",
  C: "Lab Busur, Mesin Busur, dan Kipas Tari Pakarena",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK5Bab6 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K5B6[hurufK5B6(sub)]}`;
