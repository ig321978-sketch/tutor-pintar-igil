/**
 * Teks misi awal Kelas 5 Bab 3 (Bilangan Pecahan, Toko Roti Keliling). Berkas kecil tanpa impor, dipisah dari SimulasiK5Bab3.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen simulasi ke bundel awal.
 * KERANGKA: agen tiap Sub-Bab mengisi barisnya sendiri dengan teks yang SAMA dengan MISI_*_TEKS di data-sim.ts folder Sub-Bab.
 */

export type HurufK5B3 = "A" | "B" | "C";
const HURUF: HurufK5B3[] = ["A", "B", "C"];

export const hurufK5B3 = (sub: string): HurufK5B3 => (HURUF.includes(sub as HurufK5B3) ? (sub as HurufK5B3) : "A");

export const MISI_K5B3: Record<HurufK5B3, string> = {
  A: "Geser tanda ke letak pecahan pada garis bilangan, ubah pecahan campuran menjadi pecahan biasa, samakan penyebut dengan KPK lalu pilih tanda, dan urutkan tiga pecahan. Urutannya bebas.",
  B: "Gabungkan pecahan berpenyebut sama, samakan penyebut dengan KPK, jumlahkan pecahan campuran, dan sederhanakan hasilnya. Urutannya bebas.",
  C: "Coret bagian loyang yang diambil, samakan penyebut sebelum mengurangkan, kurangkan pembilang, dan pisahkan bulat dari pecahan. Urutannya bebas.",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK5Bab3 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K5B3[hurufK5B3(sub)]}`;
