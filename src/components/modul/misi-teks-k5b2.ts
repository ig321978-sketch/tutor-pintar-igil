/**
 * Teks misi awal Kelas 5 Bab 2 (KPK dan FPB, Pasar Kuliner Malam). Berkas kecil tanpa impor, dipisah dari SimulasiK5Bab2.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen simulasi ke bundel awal.
 * KERANGKA: agen tiap Sub-Bab mengisi barisnya sendiri dengan teks yang SAMA dengan MISI_*_TEKS di data-sim.ts folder Sub-Bab.
 */

export type HurufK5B2 = "A" | "B" | "C" | "D" | "E";
const HURUF: HurufK5B2[] = ["A", "B", "C", "D", "E"];

export const hurufK5B2 = (sub: string): HurufK5B2 => (HURUF.includes(sub as HurufK5B2) ? (sub as HurufK5B2) : "A");

export const MISI_K5B2: Record<HurufK5B2, string> = {
  A: "Lompat dengan jarak yang sama, warnai kelipatan pada tabel bilangan, periksa dengan pembagian, dan atur pengali pada alat Kali. Urutannya bebas.",
  B: "Lingkari bilangan yang sama di dua daftar, atur KPK, majukan jadwal sampai dua lonceng bersama, dan pilih KPK tiga bilangan. Urutannya bebas.",
  C: "Tata klepon ke piring tanpa sisa, pasangkan faktor, periksa sisa pembagian, dan pilih semua faktor. Urutannya bebas.",
  D: "Tandai lubang congklak yang berisi dua biji, isi kotak sebanyak-banyaknya, dan pilih FPB. Urutannya bebas.",
  E: "Saring bilangan prima di tabel, pecah bilangan menjadi pohon faktor, pasangkan prima untuk KPK dan FPB, dan bagi berulang dengan prima. Urutannya bebas.",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK5Bab2 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K5B2[hurufK5B2(sub)]}`;
