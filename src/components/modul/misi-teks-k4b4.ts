/**
 * Teks misi awal Kelas 4 Bab 4 (Kolam Renang Tirta Ceria). Berkas kecil tanpa impor, dipisah dari SimulasiK4Bab4.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen simulasi ke bundel awal.
 * KERANGKA: agen tiap Sub-Bab mengisi barisnya sendiri dengan teks yang SAMA dengan MISI_*_TEKS di data-sim.ts folder Sub-Bab.
 */

export type HurufK4B4 = "A" | "B";
const HURUF: HurufK4B4[] = ["A", "B"];

export const hurufK4B4 = (sub: string): HurufK4B4 => (HURUF.includes(sub as HurufK4B4) ? (sub as HurufK4B4) : "A");

export const MISI_K4B4: Record<HurufK4B4, string> = {
  A: "Tutup lantai dengan ubin, hitung luas dari baris dan kolom, ubah meter persegi ke sentimeter persegi, lalu pilih satuan yang tepat. Urutannya bebas.",
  B: "Tuang gelas takar ke ember, susun lapisan kubus, dan turuni atau naiki tangga liter. Urutannya bebas.",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK4Bab4 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K4B4[hurufK4B4(sub)]}`;
