/**
 * Teks misi awal Kelas 3 Bab 1 (Toko Kelontong Pak Joko). Berkas kecil tanpa impor, dipisah dari SimulasiK3Bab1.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen simulasi ke bundel awal.
 * KERANGKA: agen tiap Sub-Bab mengisi barisnya sendiri dengan teks yang SAMA dengan MISI_*_TEKS di data-sim.ts folder Sub-Bab.
 */

export type HurufK3B1 = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export const hurufK3B1 = (sub: string): HurufK3B1 =>
  sub === "B" || sub === "C" || sub === "D" || sub === "E" || sub === "F" || sub === "G" ? sub : "A";

export const MISI_K3B1: Record<HurufK3B1, string> = {
  A: "Tuang stok sampai sepuluh jadi satu, atur papan tiga tempat, baca bilangannya, lalu tulis dari kata. Urutannya bebas.",
  B: "Susun kartu menjadi label, uraikan bilangan, isi tabel dengan angka, dan jaga tempat dengan nol. Urutannya bebas.",
  C: "Pilih tempat yang menentukan, pilih tanda, letakkan bilangan di garis, lalu urutkan kartu. Urutannya bebas.",
  D: "Susun pesanan ke bawah, tukar sepuluh butir, uraikan puluhan dan satuan, jumlahkan tiga bilangan, lalu periksa dengan menukar urutan. Urutannya bebas.",
  E: "Kurangi dengan susun pendek dan susun panjang, pinjam satu puluhan, periksa dengan penjumlahan, lalu kosongkan rak. Urutannya bebas.",
  F: "Susun kotak berisi sama banyak, tulis perkaliannya, susun baris dan kolom lalu putar, dan lompat di garis bilangan. Urutannya bebas.",
  G: "Bagikan bingkisan bergiliran, lompat mundur di garis, tulis pembagiannya, pilih keluarga fakta, lalu periksa dengan kali. Urutannya bebas.",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK3Bab1 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K3B1[hurufK3B1(sub)]}`;
