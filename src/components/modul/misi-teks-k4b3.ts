/**
 * Teks misi awal Kelas 4 Bab 3 (Orkestra Angklung Kampung Senandung). Berkas kecil tanpa impor, dipisah dari SimulasiK4Bab3.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen simulasi ke bundel awal.
 * KERANGKA: agen tiap Sub-Bab mengisi barisnya sendiri dengan teks yang SAMA dengan MISI_*_TEKS di data-sim.ts folder Sub-Bab.
 */

export type HurufK4B3 = "A" | "B";
const HURUF: HurufK4B3[] = ["A", "B"];

export const hurufK4B3 = (sub: string): HurufK4B3 => (HURUF.includes(sub as HurufK4B3) ? (sub as HurufK4B3) : "A");

export const MISI_K4B3: Record<HurufK4B3, string> = {
  A: "Tata deret angklung berikutnya, pilih jenis pola, isi selisih pada tabel, lalu susun angklung per lima. Urutannya bebas.",
  B: "Tarik rantai loncat, atur mesin aturan, dan cari bilangan pada tabel urutan. Urutannya bebas.",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK4Bab3 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K4B3[hurufK4B3(sub)]}`;
