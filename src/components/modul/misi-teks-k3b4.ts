/**
 * Teks misi dan nama simulasi Kelas 3 Bab 4. Berkas kecil tanpa impor, dipisah dari SimulasiK3Bab4.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen laboratorium ke bundel awal.
 */

export type HurufK3B4 = "A" | "B" | "C";

export const hurufK3B4 = (sub: string): HurufK3B4 => (sub === "B" || sub === "C" ? sub : "A");

export const MISI_K3B4: Record<HurufK3B4, string> = {
  A: "Di Lab Ruas Garis, perpanjang sinar garis dan garis, hubungkan dua titik dengan ruas garis dan kurva, ukur ruas garis dari angka 0 dalam cm dan mm, dan tandai sisi bangun datar. Periksa dengan Mesin Ruas Garis, lalu selesaikan skenario Peta Alfa. Selesaikan semua misi wajib, urutannya bebas.",
  B: "Di Lab Sudut, putar kaki sudut, bandingkan dengan pojok kertas lipat, baca dan gambar sudut dengan busur derajat, kenali jenis sudut, dan ukur sudut dengan irisan. Periksa dengan Mesin Sudut, lalu selesaikan skenario Pintu Meutia. Selesaikan semua misi wajib.",
  C: "Di Lab Dua Garis, putar dan geser garis untuk menemukan garis tegak lurus, sejajar, dan bukan keduanya, lalu kenali ciri bangun datar dan rakit bangun dari batang. Periksa dengan Mesin Garis, lalu tuntaskan skenario Pagar Taman. Selesaikan semua misi wajib: ini misi penutup bab.",
};

export const NAMA_SIM_K3B4: Record<HurufK3B4, string> = {
  A: "Lab Ruas Garis, Mesin Ruas Garis, dan Peta Alfa",
  B: "Lab Sudut, Mesin Sudut, dan Pintu Meutia",
  C: "Pencapaian Misi Bab: Dua Garis, Bangun Datar, Mesin Garis, dan Pagar Taman",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK3Bab4 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K3B4[hurufK3B4(sub)]}`;
