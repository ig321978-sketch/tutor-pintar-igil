/**
 * Teks misi dan nama simulasi Kelas 5 Bab 5. Berkas kecil tanpa impor, dipisah dari SimulasiK5Bab5.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen laboratorium ke bundel awal.
 */

export type HurufK5B5 = "A" | "B";
const HURUF: HurufK5B5[] = ["A", "B"];

export const hurufK5B5 = (sub: string): HurufK5B5 => (HURUF.includes(sub as HurufK5B5) ? (sub as HurufK5B5) : "A");

export const MISI_K5B5: Record<HurufK5B5, string> = {
  A: "Di Lab Petak, tutup daerah dengan petak satuan sampai rapat tanpa celah, susun baris dan kolom petak, dan pindahkan petak yang menonjol ke lubang supaya luasnya tetap. Periksa dengan Mesin Petak, lalu selesaikan skenario Ubin Alun-Alun. Selesaikan semua misi wajib, boleh mulai dari mana saja.",
  B: "Di Lab Rumus, hitung luas persegi panjang, persegi, dan jajargenjang dengan alas dikali tinggi, pilih tinggi yang tegak lurus alas bukan sisi miring, susun dua bangun yang sama menjadi persegi panjang untuk luas segitiga, belah ketupat, dan layang-layang, serta susun dua trapesium menjadi jajargenjang. Periksa dengan Mesin Rumus, lalu selesaikan skenario Taman Bentuk-Bentuk. Selesaikan semua misi wajib, boleh mulai dari mana saja.",
};

export const NAMA_SIM_K5B5: Record<HurufK5B5, string> = {
  A: "Lab Petak, Mesin Petak, dan Ubin Alun-Alun",
  B: "Lab Rumus, Mesin Rumus, dan Taman Bentuk-Bentuk",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK5Bab5 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K5B5[hurufK5B5(sub)]}`;
