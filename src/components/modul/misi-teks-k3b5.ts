/**
 * Teks misi awal Kelas 3 Bab 5 (Bengkel Sepeda Pak Hasan). Berkas kecil tanpa impor, dipisah dari SimulasiK3Bab5.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen simulasi ke bundel awal.
 * KERANGKA: agen tiap Sub-Bab mengisi barisnya sendiri dengan teks yang SAMA dengan MISI_*_TEKS di data-sim.ts folder Sub-Bab.
 */

export type HurufK3B5 = "A" | "B";

export const hurufK3B5 = (sub: string): HurufK3B5 => (sub === "B" ? sub : "A");

export const MISI_K3B5: Record<HurufK3B5, string> = {
  A: "Urutkan kartu data, tandai data terkecil dan terbesar, hitung jangkauan, lalu hitung turus. Urutannya bebas.",
  B: "Cacah dengan turus berlima, isi kolom banyak, urutkan baris, lalu baca tabel dan jawab. Urutannya bebas.",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK3Bab5 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K3B5[hurufK3B5(sub)]}`;
