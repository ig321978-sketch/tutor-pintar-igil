/**
 * Teks misi awal Kelas 3 Bab 3 (Kebun Binatang Mini). Berkas kecil tanpa impor, dipisah dari SimulasiK3Bab3.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen simulasi ke bundel awal.
 * KERANGKA: agen tiap Sub-Bab mengisi barisnya sendiri dengan teks yang SAMA dengan MISI_*_TEKS di data-sim.ts folder Sub-Bab.
 */

export type HurufK3B3 = "A" | "B" | "C" | "D";

export const hurufK3B3 = (sub: string): HurufK3B3 => (sub === "B" || sub === "C" || sub === "D" ? sub : "A");

export const MISI_K3B3: Record<HurufK3B3, string> = {
  A: "Geser benda ke angka nol, baca panjangnya dengan satuan, pilih alat ukur, lalu cari selisih dua batang.",
  B: "Tukar potongan pita, ubah meter dan sentimeter, tulis ukuran bersama, lalu sambung atau potong pita. Urutannya bebas.",
  C: "Setel timbangan ke nol, letakkan benda, baca beratnya, pilih timbangan, lalu cari selisih dua berat. Urutannya bebas.",
  D: "Rakit bandul sampai timbangan seimbang, ubah kilogram ke gram dan gram ke kilogram, lalu jumlahkan dan kurangkan berat. Urutannya bebas.",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK3Bab3 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K3B3[hurufK3B3(sub)]}`;
