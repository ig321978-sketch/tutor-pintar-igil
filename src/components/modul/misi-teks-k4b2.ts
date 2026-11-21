/**
 * Teks misi awal Kelas 4 Bab 2 (Sanggar Batik Kampung Mekar). Berkas kecil tanpa impor, dipisah dari SimulasiK4Bab2.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen simulasi ke bundel awal.
 * KERANGKA: agen tiap Sub-Bab mengisi barisnya sendiri dengan teks yang SAMA dengan MISI_*_TEKS di data-sim.ts folder Sub-Bab.
 */

export type HurufK4B2 = "A" | "B" | "C" | "D" | "E";
const HURUF: HurufK4B2[] = ["A", "B", "C", "D", "E"];

export const hurufK4B2 = (sub: string): HurufK4B2 => (HURUF.includes(sub as HurufK4B2) ? (sub as HurufK4B2) : "A");

export const MISI_K4B2: Record<HurufK4B2, string> = {
  A: "Bagi kain, bandingkan dua pita, urutkan pecahan, lalu jepit pecahan pada garis. Urutannya bebas.",
  B: "Hitung isi dua bak lalu pilih tandanya, isi bak, urutkan kartu, dan pasang titik pada garis. Urutannya bebas.",
  C: "Arsir kain sama besar, cari pengali, sederhanakan pecahan, dan pilih kartu sama besar. Urutannya bebas.",
  D: "Warnai kain per sepuluh dan per seratus, hubungkan pecahan ke desimal, lalu tulis baliknya. Urutannya bebas.",
  E: "Warnai kisi seratus, geser koma ke persen dan sebaliknya, lalu baca kisi. Urutannya bebas.",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK4Bab2 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K4B2[hurufK4B2(sub)]}`;
