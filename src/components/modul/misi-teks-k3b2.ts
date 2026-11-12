/**
 * Teks misi dan nama simulasi Kelas 3 Bab 2. Berkas kecil tanpa impor, dipisah dari SimulasiK3Bab2.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen laboratorium ke bundel awal.
 */

export type HurufK3B2 = "A" | "B";

export const hurufK3B2 = (sub: string): HurufK3B2 => (sub === "B" ? "B" : "A");

export const MISI_K3B2: Record<HurufK3B2, string> = {
  A: "Di Lab Neraca Kalimat, isi titik-titik pada kalimat penjumlahan sampai neraca seimbang, nyalakan Kebalikan, dan tekan Periksa. Catat pasangan bilangan di Papan Kemungkinan, lalu selesaikan Mesin Kalimat Tambah dan skenario Buku Perpustakaan Rani. Selesaikan semua misi wajib, urutannya bebas.",
  B: "Di Lab Neraca Kalimat, isi titik-titik pada kalimat pengurangan di tengah dan di depan, lihat satu bagan dibaca dengan dua kalimat, periksa dengan Kebalikan, catat kemungkinan di Papan Kemungkinan, lalu selesaikan Mesin Kalimat Kurang dan skenario Pasar Pak Slamet. Selesaikan semua misi wajib: ini misi penutup bab.",
};

export const NAMA_SIM_K3B2: Record<HurufK3B2, string> = {
  A: "Lab Neraca Kalimat (Tambah), Mesin Kalimat Tambah, dan Buku Perpustakaan Rani",
  B: "Pencapaian Misi Bab: Neraca Kurang, Mesin Kalimat Kurang, dan Pasar Pak Slamet",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK3Bab2 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K3B2[hurufK3B2(sub)]}`;
