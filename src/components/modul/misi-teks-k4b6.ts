/**
 * Teks misi awal Kelas 4 Bab 6 (Bazar Kuliner Sekolah). Berkas kecil tanpa impor, dipisah dari SimulasiK4Bab6.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen simulasi ke bundel awal.
 * KERANGKA: agen tiap Sub-Bab mengisi barisnya sendiri dengan teks yang SAMA dengan MISI_*_TEKS di data-sim.ts folder Sub-Bab.
 */

export type HurufK4B6 = "A" | "B";
const HURUF: HurufK4B6[] = ["A", "B"];

export const hurufK4B6 = (sub: string): HurufK4B6 => (HURUF.includes(sub as HurufK4B6) ? (sub as HurufK4B6) : "A");

export const MISI_K4B6: Record<HurufK4B6, string> = {
  A: "Gambar data tabel menjadi piktogram, baca banyak data satu baris, tandai yang paling banyak dan paling sedikit, lalu jumlahkan semuanya. Urutannya bebas.",
  B: "Bangun diagram batang dari data, baca banyak batang pada sumbu, adu dua batang, dan putar diagram. Urutannya bebas.",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK4Bab6 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K4B6[hurufK4B6(sub)]}`;
