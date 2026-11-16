/**
 * Teks misi dan nama simulasi Opsi 2 Kelas 1 Bab 1 Sub-Bab A (Kampung Cemara). Berkas kecil tanpa impor, dipisah dari
 * SimulasiK1B1Kedua.tsx agar registri (diimpor pemutar semua bab) tidak menarik laboratorium ke bundel awal.
 * Naskah orisinal IGIL. Tiap kalimat paling banyak delapan kata.
 */

export const MISI_O2K1A = "Ketuk apel ke keranjang, lihat lambangnya, lalu tulis.";

export const NAMA_SIM_O2K1A = "Kebun dan Nampan Nenek";

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalO2K1A = (sub: string): string => (sub === "A" ? `Simulasi 1. Misi: ${MISI_O2K1A}` : "");
