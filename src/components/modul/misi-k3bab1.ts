/**
 * Misi dan tantangan bebas Kelas 3 Bab 1 (Bilangan Cacah sampai 1.000, tema Toko Kelontong Pak Joko). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k3b1.mjs.
 *
 * Tiap Sub-Bab satu simulasi sendiri (folder Sub-Bab): A Rak Stok, B Meja Label, C Papan Urut, D Meja Pesanan, E Rak Sisa,
 * F Rak Kotak, G Meja Bingkisan.
 * KERANGKA: agen tiap Sub-Bab mengganti MISI_X (kosong) dan menyesuaikan tipe keadaannya di union KeadaanK3Bab1.
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi } from "./misi-simulasi";

import type { KeadaanStok } from "./tempat-k3b1a/logika";
import type { KeadaanLabel } from "./kartu-k3b1b/logika";
import type { KeadaanUrutan } from "./urut-k3b1c/logika";
import type { KeadaanPesanan } from "./tambah-k3b1d/logika";
import type { KeadaanSisa } from "./kurang-k3b1e/logika";
import type { KeadaanIsi } from "./kali-k3b1f/logika";
import type { KeadaanBagi } from "./bagi-k3b1g/logika";

export type KeadaanK3Bab1 = { alat: "kerangka" } | KeadaanStok | KeadaanLabel | KeadaanUrutan | KeadaanPesanan | KeadaanSisa | KeadaanIsi | KeadaanBagi;

/** Sub-Bab A: Rak Stok. Empat misi wajib dan dua tantangan bebas, id berawalan a-, tanpa skor. Diuji di scripts/uji-tempat-k3b1a.mjs. */
const stok = (k: KeadaanK3Bab1): k is KeadaanStok => k.alat === "stok";
export const MISI_A: DefMisi<KeadaanK3Bab1>[] = [
  { id: "a-tukar", teks: "Tuang barang satu per satu sampai sepuluh yang lepas langsung menjadi satu kemasan.", wajib: true, cek: (k) => stok(k) && k.tukarButir },
  { id: "a-papan", teks: "Hitung benda di rak, atur papan tiga tempat sampai sama, lalu tekan Periksa.", wajib: true, cek: (k) => stok(k) && k.papanBenar.length >= 1 },
  { id: "a-baca", teks: "Baca bilangan di papan dari kiri, pilih cara membacanya, lalu tekan Periksa.", wajib: true, cek: (k) => stok(k) && k.bacaBenar.length >= 1 },
  { id: "a-tulis", teks: "Tulis angka dari kata bilangan di papan tiga tempat, lalu tekan Periksa.", wajib: true, cek: (k) => stok(k) && k.tulisBenar.length >= 1 },
  { id: "a-ratusan", teks: "Tuang sampai sepuluh kemasan menjadi satu kemasan besar yang mewakili seratus.", wajib: false, cek: (k) => stok(k) && k.tukarBungkus },
  { id: "a-nol", teks: "Tulis tiga bilangan dari kata, termasuk yang memuat angka nol penjaga tempat.", wajib: false, cek: (k) => stok(k) && k.tulisBenar.length >= 3 },
];

/** Sub-Bab B: Meja Label. Empat misi wajib dan dua tantangan bebas, id berawalan b-, tanpa skor. */
const labelB = (k: KeadaanK3Bab1): k is KeadaanLabel => k.alat === "label";
export const MISI_B: DefMisi<KeadaanK3Bab1>[] = [
  { id: "b-susun", teks: "Susun kartu seratus, sepuluh, dan satu sampai sama dengan label, lalu tekan Periksa.", wajib: true, cek: (k) => labelB(k) && k.susunBenar.length >= 1 },
  { id: "b-uraikan", teks: "Uraikan satu bilangan menjadi ratusan, puluhan, dan satuan, lalu tekan Periksa.", wajib: true, cek: (k) => labelB(k) && k.uraiBenar.length >= 1 },
  { id: "b-tabel", teks: "Isi tabel tiga tempat dengan angka, bukan jumlahnya, lalu tekan Periksa.", wajib: true, cek: (k) => labelB(k) && k.tabelBenar.length >= 1 },
  { id: "b-nol", teks: "Tulis satu label yang punya nol penjaga tempat, lalu tekan Periksa.", wajib: true, cek: (k) => labelB(k) && k.nolBenar.length >= 1 },
  { id: "b-sama", teks: "Temukan tempat yang mewakili jumlah paling besar untuk angka yang sama.", wajib: false, cek: (k) => labelB(k) && k.samaBenar.length >= 1 },
  { id: "b-lengkap", teks: "Selesaikan ketiga label pada alat Susun sampai semuanya tepat.", wajib: false, cek: (k) => labelB(k) && k.susunBenar.length >= 3 },
];

/**
 * Sub-Bab C: Papan Urut, Simulasi Papan Urut (urut-k3b1c). Pasangan bilangan, titik pada garis, dan kartu berbeda dari Story (465, 456, 546).
 * Empat misi wajib dan dua tantangan bebas, id berawalan c-, tanpa skor. Diuji di scripts/uji-urut-k3b1c.mjs.
 */
const urutan = (k: KeadaanK3Bab1): k is KeadaanUrutan => k.alat === "urutan";
export const MISI_C: DefMisi<KeadaanK3Bab1>[] = [
  { id: "c-tempat", teks: "Pilih tempat pertama yang berbeda pada sepasang bilangan, lalu tekan Periksa.", wajib: true, cek: (k) => urutan(k) && k.tempatBenar.length >= 1 },
  { id: "c-tanda", teks: "Pilih tanda yang tepat untuk sepasang bilangan, lalu tekan Periksa.", wajib: true, cek: (k) => urutan(k) && k.tandaBenar.length >= 1 },
  { id: "c-garis", teks: "Letakkan satu bilangan di antara dua ratusan pada garis bilangan, lalu tekan Periksa.", wajib: true, cek: (k) => urutan(k) && k.garisBenar.length >= 1 },
  { id: "c-naik", teks: "Urutkan kartu dari yang terkecil sampai semua kartu berurutan.", wajib: true, cek: (k) => urutan(k) && k.urutNaikBenar.length >= 1 },
  { id: "c-turun", teks: "Urutkan satu set kartu dari yang terbesar dengan urutan turun.", wajib: false, cek: (k) => urutan(k) && k.urutTurunBenar.length >= 1 },
  { id: "c-sama", teks: "Temukan sepasang bilangan yang sama besar dan beri tanda sama dengan.", wajib: false, cek: (k) => urutan(k) && k.samaTemu },
];

/** Sub-Bab D: Meja Pesanan. Empat misi wajib dan dua tantangan bebas, id berawalan d-, tanpa skor. */
const pesanan = (k: KeadaanK3Bab1): k is KeadaanPesanan => k.alat === "pesanan";
export const MISI_D: DefMisi<KeadaanK3Bab1>[] = [
  { id: "d-susun", teks: "Susun satu pesanan ke bawah: isi satuan, simpanan, dan puluhan, lalu tekan Periksa.", wajib: true, cek: (k) => pesanan(k) && k.susunBenar.length >= 1 },
  { id: "d-tukar", teks: "Tukar sepuluh butir satuan menjadi satu batang puluhan sampai butir lepas kurang dari sepuluh.", wajib: true, cek: (k) => pesanan(k) && k.tukarSelesai },
  { id: "d-panjang", teks: "Uraikan dua bilangan menjadi puluhan dan satuan, jumlahkan tiap bagian, lalu tekan Periksa.", wajib: true, cek: (k) => pesanan(k) && k.panjangBenar },
  { id: "d-periksa", teks: "Periksa dengan menukar urutan dan pilih taksiran yang tepat, lalu tekan Periksa.", wajib: true, cek: (k) => pesanan(k) && k.periksaBenar },
  { id: "d-tiga", teks: "Jumlahkan tiga bilangan dua-dua: isi jumlah dua bilangan pertama dan jumlah seluruhnya.", wajib: false, cek: (k) => pesanan(k) && k.tigaBenar },
  { id: "d-banyak", teks: "Susun tiga pesanan yang berbeda sampai semuanya tepat.", wajib: false, cek: (k) => pesanan(k) && k.susunBenar.length >= 3 },
];

/** Sub-Bab E: Rak Sisa. Empat misi wajib dan dua tantangan bebas, id berawalan e-, tanpa skor. */
const sisa = (k: KeadaanK3Bab1): k is KeadaanSisa => k.alat === "sisa";
export const MISI_E: DefMisi<KeadaanK3Bab1>[] = [
  { id: "e-susun", teks: "Kurangi dengan susun pendek: isi hasil puluhan dan satuan, lalu tekan Periksa.", wajib: true, cek: (k) => sisa(k) && k.susunBenar.length >= 1 },
  { id: "e-panjang", teks: "Kurangi dengan susun panjang: isi hasil puluhan dan hasil satuan, lalu tekan Periksa.", wajib: true, cek: (k) => sisa(k) && k.panjangBenar.length >= 1 },
  { id: "e-pinjam", teks: "Pecah satu batang menjadi sepuluh butir, ambil sampai sama, lalu tekan Periksa.", wajib: true, cek: (k) => sisa(k) && k.pinjamSelesai },
  { id: "e-periksa", teks: "Periksa satu hasil dengan penjumlahan, pilih cocok atau tidak cocok, lalu tekan Periksa.", wajib: true, cek: (k) => sisa(k) && k.periksaBenar.length >= 1 },
  { id: "e-nol", teks: "Kosongkan satu rak: atur yang terjual sampai sisanya nol.", wajib: false, cek: (k) => sisa(k) && k.kosongBenar.length >= 1 },
  { id: "e-lengkap", teks: "Selesaikan ketiga pengurangan susun pendek sampai semuanya tepat.", wajib: false, cek: (k) => sisa(k) && k.susunBenar.length >= 3 },
];

/** Sub-Bab F: Rak Kotak. Empat misi wajib dan dua tantangan bebas, id berawalan f-, tanpa skor. */
const isiAlat = (k: KeadaanK3Bab1): k is KeadaanIsi => k.alat === "isi";
export const MISI_F: DefMisi<KeadaanK3Bab1>[] = [
  { id: "f-isi", teks: "Susun kotak berisi sama banyak sampai sesuai sasaran, lalu tekan Periksa.", wajib: true, cek: (k) => isiAlat(k) && k.isiBenar.length >= 1 },
  { id: "f-tulis", teks: "Tulis perkalian banyak kotak dikali isi tiap kotak untuk satu susunan, lalu tekan Periksa.", wajib: true, cek: (k) => isiAlat(k) && k.tulisBenar.length >= 1 },
  { id: "f-susun", teks: "Susun baris dan kolom sesuai sasaran, lalu tekan Periksa.", wajib: true, cek: (k) => isiAlat(k) && k.susunBenar.length >= 1 },
  { id: "f-lompat", teks: "Lompat di garis bilangan sampai mendarat tepat di sasaran.", wajib: true, cek: (k) => isiAlat(k) && k.lompatBenar.length >= 1 },
  { id: "f-putar", teks: "Putar susunan baris dan kolom, lalu periksa bahwa urutan bilangan boleh ditukar.", wajib: false, cek: (k) => isiAlat(k) && k.putarBenar },
  { id: "f-lengkap", teks: "Selesaikan ketiga sasaran kotak berisi sama banyak sampai semuanya tepat.", wajib: false, cek: (k) => isiAlat(k) && k.isiBenar.length >= 3 },
];

/**
 * Sub-Bab G (akhir bab): Meja Bingkisan, Simulasi Meja Bingkisan (bagi-k3b1g). Tumpukan bingkisan, garis bilangan, gambar keranjang, dan tiga bilangan berbeda dari Story.
 * Empat misi wajib dan dua tantangan bebas, id berawalan g-, tanpa skor. Diuji di scripts/uji-bagi-k3b1g.mjs.
 */
const bagiAlat = (k: KeadaanK3Bab1): k is KeadaanBagi => k.alat === "bagi";
export const MISI_G: DefMisi<KeadaanK3Bab1>[] = [
  { id: "g-bagi", teks: "Bagikan bingkisan bergiliran sampai habis, isi hasil bagi, lalu tekan Periksa.", wajib: true, cek: (k) => bagiAlat(k) && k.bagiBenar.length >= 1 },
  { id: "g-kurang", teks: "Lompat mundur di garis bilangan sampai nol, isi banyak lompatan, lalu tekan Periksa.", wajib: true, cek: (k) => bagiAlat(k) && k.kurangBenar.length >= 1 },
  { id: "g-tulis", teks: "Tulis pembagian dari gambar keranjang: yang dibagi, pembagi, dan hasil bagi, lalu tekan Periksa.", wajib: true, cek: (k) => bagiAlat(k) && k.tulisBenar.length >= 1 },
  { id: "g-keluarga", teks: "Pilih semua kalimat keluarga fakta dari tiga bilangan, lalu tekan Periksa.", wajib: true, cek: (k) => bagiAlat(k) && k.keluargaBenar.length >= 1 },
  { id: "g-periksa", teks: "Periksa satu pembagian dengan perkalian: isi hasil kali, lalu tekan Periksa.", wajib: false, cek: (k) => bagiAlat(k) && k.periksaBenar.length >= 1 },
  { id: "g-lengkap", teks: "Selesaikan ketiga tumpukan bingkisan sampai semua pembagiannya tepat.", wajib: false, cek: (k) => bagiAlat(k) && k.bagiBenar.length >= 3 },
];

export const daftarMisiK3Bab1 = (sub: string): DefMisi<KeadaanK3Bab1>[] =>
  sub === "B" ? MISI_B : sub === "C" ? MISI_C : sub === "D" ? MISI_D : sub === "E" ? MISI_E : sub === "F" ? MISI_F : sub === "G" ? MISI_G : MISI_A;
