/**
 * Teks misi dan nama simulasi Kelas 3 Bab 3. Berkas kecil tanpa impor, dipisah dari SimulasiK3Bab3.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen laboratorium ke bundel awal.
 */

export type HurufK3B3 = "A" | "B" | "C" | "D";

export const hurufK3B3 = (sub: string): HurufK3B3 => (sub === "B" || sub === "C" || sub === "D" ? sub : "A");

export const MISI_K3B3: Record<HurufK3B3, string> = {
  A: "Di Lab Penggaris, geser benda sampai ujung kirinya tepat di angka 0 lalu baca panjangnya, coba baca tanpa dari nol, dan pilih penggaris atau meteran yang tepat. Periksa dengan Mesin Ukur, lalu selesaikan skenario Posyandu Alfa. Selesaikan semua misi wajib, urutannya bebas.",
  B: "Di Lab Meteran, rakit pita dari potongan meter, sepuluh sentimeter, dan sentimeter, ubah satuannya, lalu sambung dan potong dua pita. Periksa dengan Mesin Ubah Panjang, lalu selesaikan skenario Pita Meutia. Selesaikan semua misi wajib.",
  C: "Di Lab Timbangan, atur timbangan ke nol, timbang benda dengan timbangan digital dan timbangan duduk, dan coba menimbang tanpa dari nol. Periksa dengan Mesin Timbang, lalu selesaikan skenario Bahan Kue Meutia. Selesaikan semua misi wajib.",
  D: "Di Lab Timbangan Kodok, seimbangkan benda dengan bandul dan ubah kilogram, ons, dan gram. Selesaikan Mesin Ubah Berat, lalu tuntaskan skenario Pasar Meutia. Selesaikan semua misi wajib: ini misi penutup bab.",
};

export const NAMA_SIM_K3B3: Record<HurufK3B3, string> = {
  A: "Lab Penggaris, Mesin Ukur, dan Posyandu Alfa",
  B: "Lab Meteran, Mesin Ubah Panjang, dan Pita Meutia",
  C: "Lab Timbangan, Mesin Timbang, dan Bahan Kue Meutia",
  D: "Pencapaian Misi Bab: Timbangan Kodok, Ubah Berat, dan Pasar Meutia",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK3Bab3 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K3B3[hurufK3B3(sub)]}`;
