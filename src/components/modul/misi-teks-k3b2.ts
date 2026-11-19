/**
 * Teks misi awal Kelas 3 Bab 2 (Perkemahan Akhir Pekan). Berkas kecil tanpa impor, dipisah dari SimulasiK3Bab2.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen simulasi ke bundel awal.
 * KERANGKA: agen tiap Sub-Bab mengisi barisnya sendiri dengan teks yang SAMA dengan MISI_*_TEKS di data-sim.ts folder Sub-Bab.
 */

export type HurufK3B2 = "A" | "B";

export const hurufK3B2 = (sub: string): HurufK3B2 => (sub === "B" ? "B" : "A");

export const MISI_K3B2: Record<HurufK3B2, string> = {
  A: "Tambah batang kayu sampai tepat, baca bagan, isi titik-titik, lalu periksa dengan menjumlahkan. Urutannya bebas.",
  B: "Bagikan benda dari rak, cari bilangan yang dikurangkan, cari bilangan awal, lalu periksa hasilnya. Urutannya bebas.",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK3Bab2 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K3B2[hurufK3B2(sub)]}`;
