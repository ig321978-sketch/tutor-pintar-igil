/**
 * Teks misi awal Kelas 3 Bab 4 (Festival Layang-layang Kampung). Berkas kecil tanpa impor, dipisah dari SimulasiK3Bab4.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen simulasi ke bundel awal.
 * KERANGKA: agen tiap Sub-Bab mengisi barisnya sendiri dengan teks yang SAMA dengan MISI_*_TEKS di data-sim.ts folder Sub-Bab.
 */

export type HurufK3B4 = "A" | "B" | "C";

export const hurufK3B4 = (sub: string): HurufK3B4 => (sub === "B" || sub === "C" ? sub : "A");

export const MISI_K3B4: Record<HurufK3B4, string> = {
  A: "Kenali jenis garis, ukur bilah dari nol, ubah ukuran, lalu beri huruf dan hitung sisi. Urutannya bebas.",
  B: "Putar kaki sudut, pasang busur dari nol, baca derajatnya, pilih jenis sudut, lalu cari pasangan satu putaran.",
  C: "Putar tali sampai tegak lurus, geser tali sampai sejajar, tandai pasangan tali, lalu rakit bangun dari batang. Urutannya bebas.",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK3Bab4 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K3B4[hurufK3B4(sub)]}`;
