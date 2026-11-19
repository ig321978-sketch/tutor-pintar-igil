/**
 * Teks misi awal Kelas 4 Bab 1 (Penginapan Pulau Karang Indah). Berkas kecil tanpa impor, dipisah dari SimulasiK4Bab1.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen simulasi ke bundel awal.
 * KERANGKA: agen tiap Sub-Bab mengisi barisnya sendiri dengan teks yang SAMA dengan MISI_*_TEKS di data-sim.ts folder Sub-Bab.
 */

export type HurufK4B1 = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I";
const HURUF: HurufK4B1[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

export const hurufK4B1 = (sub: string): HurufK4B1 => (HURUF.includes(sub as HurufK4B1) ? (sub as HurufK4B1) : "A");

export const MISI_K4B1: Record<HurufK4B1, string> = {
  A: "Susun kartu angka dari ucapan, baca tiket, isi nol yang hilang, lalu tentukan tempat angka. Urutannya bebas.",
  B: "Isi gudang sesuai bilangan, tulis bagan tempat, pilih arti sebuah angka, lalu tukar dua tempat. Urutannya bebas.",
  C: "Periksa dua bilangan dari kiri lalu pilih tandanya, urutkan kartu, dan pasang titik pada garis. Urutannya bebas.",
  D: "Pecah bilangan ke keranjang, susun bilangan, isi bagan bagian utuh, lalu cari cara lain. Urutannya bebas.",
  E: "Susun dan jumlahkan dari satuan, tukar sepuluh butir menjadi satu batang, lalu genapkan dulu. Urutannya bebas.",
  F: "Susun pengurangan dengan mengambil, hitung maju sampai bilangan besar, lalu periksa hasil dengan menambah. Urutannya bebas.",
  G: "Tambah perahu sampai penumpang cukup, uraikan bilangan lalu kalikan, dan hitung bersusun. Urutannya bebas.",
  H: "Bagikan tamu ke kamar, kurangi berulang, bagi bersusun, lalu periksa dengan perkalian. Urutannya bebas.",
  I: "Susun payung untuk pasangan faktor, tandai faktor dan kelipatan, lalu uji bagi habis. Urutannya bebas.",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK4Bab1 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K4B1[hurufK4B1(sub)]}`;
