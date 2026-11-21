/**
 * Teks misi awal Kelas 5 Bab 1 (Hari Pertandingan di Stadion Kota). Berkas kecil tanpa impor, dipisah dari SimulasiK5Bab1.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen simulasi ke bundel awal.
 * KERANGKA: agen tiap Sub-Bab mengisi barisnya sendiri dengan teks yang SAMA dengan MISI_*_TEKS di data-sim.ts folder Sub-Bab.
 */

export type HurufK5B1 = "A" | "B" | "C" | "D";
const HURUF: HurufK5B1[] = ["A", "B", "C", "D"];

export const hurufK5B1 = (sub: string): HurufK5B1 => (HURUF.includes(sub as HurufK5B1) ? (sub as HurufK5B1) : "A");

export const MISI_K5B1: Record<HurufK5B1, string> = {
  A: "Isi tabel tempat dari bilangan yang diucapkan, jaga nol, pasang titik dan baca per periode, lalu pilih uraiannya. Urutannya bebas.",
  B: "Bandingkan dua bilangan dari kiri, pilih tandanya, letakkan bilangan di garis, dan urutkan tribun. Urutannya bebas.",
  C: "Uraikan bilangan menjadi bundel, tukar bundel tanpa mengubah jumlah, susun kembali dengan nol, dan cari susunan yang jumlahnya sama. Urutannya bebas.",
  D: "Jumlahkan dan kurangkan bersusun, pisah pengali lalu kalikan, dan bagi per kolom. Urutannya bebas.",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK5Bab1 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K5B1[hurufK5B1(sub)]}`;
