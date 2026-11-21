/**
 * Teks misi awal Kelas 4 Bab 5 (Toko Keramik Bu Dewi). Berkas kecil tanpa impor, dipisah dari SimulasiK4Bab5.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen simulasi ke bundel awal.
 * KERANGKA: agen tiap Sub-Bab mengisi barisnya sendiri dengan teks yang SAMA dengan MISI_*_TEKS di data-sim.ts folder Sub-Bab.
 */

export type HurufK4B5 = "A" | "B";
const HURUF: HurufK4B5[] = ["A", "B"];

export const hurufK4B5 = (sub: string): HurufK4B5 => (HURUF.includes(sub as HurufK4B5) ? (sub as HurufK4B5) : "A");

export const MISI_K4B5: Record<HurufK4B5, string> = {
  A: "Pilah keramik menurut banyak sisinya, periksa ciri segiempat, telusuri pohon keluarga bentuk, lalu golongkan segitiga. Urutannya bebas.",
  B: "Pasang dua keping sama besar menjadi bangun baru, tarik garis dari titik tengah, dan belah bangun dari satu sudut. Urutannya bebas.",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK4Bab5 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K4B5[hurufK4B5(sub)]}`;
