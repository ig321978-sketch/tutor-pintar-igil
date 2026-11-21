/**
 * Tata letak gambar Kelas 4 Bab 2 Sub-Bab D (murni, tanpa React, diuji di Node: scripts/uji-meteran-k4b2d.mjs).
 * Gambar harus sungguh sebanyak datanya: kisi sepuluh kolom (Tenths Grid) menaruh tepat sepuluh kolom dengan `p` kolom berwarna,
 * kisi seratus kotak (Hundredths Grid) menaruh tepat sepuluh baris kali sepuluh kolom dengan `q` kotak berwarna (dari baris atas, kiri ke kanan).
 * Kisi digambar sebagai sel tetap pada koordinat hitungan (bukan susunan yang membungkus sendiri).
 */

/** Lebar dan tinggi kanvas gambar (viewBox 300 x 200). */
export const LEBAR = 300;
export const TINGGI = 200;

export type Sel = { baris: number; kolom: number; x: number; y: number; w: number; h: number; warna: boolean };

/* ------------------------------ Kisi sepuluh kolom ------------------------------ */
export const X0_SEP = 20;
export const Y0_SEP = 64;
export const W_SEP = 26;
export const H_SEP = 58;
/** Sepuluh kolom sama besar dalam satu baris; `p` kolom pertama (dari kiri) berwarna. */
export function susunSepuluh(p: number): Sel[] {
  return Array.from({ length: 10 }, (_, i) => ({ baris: 0, kolom: i, x: X0_SEP + i * W_SEP, y: Y0_SEP, w: W_SEP, h: H_SEP, warna: i < p }));
}

/* ------------------------------ Kisi seratus kotak ------------------------------ */
export const X0_SER = 40;
export const Y0_SER = 26;
export const W_SER = 22;
export const H_SER = 15;
/** Seratus kotak sama besar dalam sepuluh baris kali sepuluh kolom; `q` kotak pertama (baris atas lebih dulu, kiri ke kanan) berwarna. */
export function susunSeratus(q: number): Sel[] {
  return Array.from({ length: 100 }, (_, i) => {
    const baris = Math.floor(i / 10);
    const kolom = i % 10;
    return { baris, kolom, x: X0_SER + kolom * W_SER, y: Y0_SER + baris * H_SER, w: W_SER, h: H_SER, warna: i < q };
  });
}
/** Baris yang penuh berwarna dan kotak lepas pada baris berikutnya. */
export const barisPenuh = (q: number): number => Math.floor(q / 10);
export const kotakLepas = (q: number): number => q % 10;
/** Banyak sel berwarna. */
export const banyakWarna = (sel: Sel[]): number => sel.filter((s) => s.warna).length;

/* ------------------------------ Jembatan ------------------------------ */
export const KIRI_JEM = { x: 18, y: 62, w: 92, h: 86 };
export const KANAN_JEM = { x: 190, y: 62, w: 92, h: 86 };
/** Lengkung jembatan dari tepi kiri-atas kotak kiri ke kotak kanan (sumbu y ke atas), untuk gambar SVG. */
export const lengkungJembatan = (): string => `M ${KIRI_JEM.x + KIRI_JEM.w} ${KIRI_JEM.y + 40} Q 150 ${KIRI_JEM.y - 6} ${KANAN_JEM.x} ${KANAN_JEM.y + 40}`;
