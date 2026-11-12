/**
 * Misi dan tantangan bebas Kelas 3 Bab 3 (Pengukuran Panjang dan Berat). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k3b3.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat). Lab Timbangan Kodok memuat dua tampilan (Bandul dan Ubah Berat):
 *  A Pengukuran Panjang      : Lab Penggaris + Mesin Ukur + skenario Posyandu Alfa.
 *  B Hubungan Satuan Panjang : Lab Meteran + Mesin Ubah Panjang + skenario Pita Meutia.
 *  C Pengukuran Berat        : Lab Timbangan + Mesin Timbang + skenario Bahan Kue Meutia.
 *  D Hubungan Satuan Berat   : Lab Timbangan Kodok + Mesin Ubah Berat + skenario Pasar Meutia (pencapaian bab).
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanPenggaris } from "./lab-penggaris-k3b3";
import type { KeadaanMet } from "./lab-meteran-k3b3";
import type { KeadaanTimbang } from "./lab-timbang-k3b3";
import type { KeadaanKodok, KeadaanUbah } from "./lab-kodok-k3b3";

export type KeadaanK3Bab3 = KeadaanPenggaris | KeadaanMet | KeadaanTimbang | KeadaanKodok | KeadaanUbah | KeadaanSelesai;

const penggaris = (k: KeadaanK3Bab3): k is KeadaanPenggaris => k.alat === "penggaris";
const meteran = (k: KeadaanK3Bab3): k is KeadaanMet => k.alat === "meteran";
const timbang = (k: KeadaanK3Bab3): k is KeadaanTimbang => k.alat === "timbang";
const kodok = (k: KeadaanK3Bab3): k is KeadaanKodok => k.alat === "kodok";
const ubah = (k: KeadaanK3Bab3): k is KeadaanUbah => k.alat === "ubahberat";
const selesai = (k: KeadaanK3Bab3, id: string) => k.alat === "selesai" && k.id === id;

/** Id yang dilaporkan skenario dan mesin saat tuntas (dipakai misi di bawah dan pembungkus React). */
export const ID_SKENARIO_K3B3 = { A: "posyandu-alfa", B: "pita-meutia", C: "bahan-kue", D: "pasar-meutia" } as const;
export const ID_MESIN_K3B3 = { A: "mesin-ukur", B: "mesin-ubah-panjang", C: "mesin-timbang", D: "mesin-ubah-berat" } as const;

/** Banyak susunan bandul seimbang berbeda untuk benda yang paling banyak dicatat. */
export const susunanTerbanyak = (pernah: readonly string[]): number => {
  const hitung: Record<string, number> = {};
  for (const p of pernah) {
    const benda = p.split("|")[0];
    hitung[benda] = (hitung[benda] ?? 0) + 1;
  }
  return Math.max(0, ...Object.values(hitung));
};

/** Sub-Bab A: mengukur panjang dengan penggaris dan meteran. */
export const MISI_A: DefMisi<KeadaanK3Bab3>[] = [
  { id: "a-nol", teks: "Ukur pensil dengan penggaris: geser sampai ujung kirinya tepat di angka 0, lalu tekan Baca panjang.", wajib: true, cek: (k) => penggaris(k) && k.pernah.includes("penggaris:pensil") },
  { id: "a-salah", teks: "Tekan Baca panjang saat benda belum di angka 0, dan lihat mengapa bacaannya keliru.", wajib: true, cek: (k) => penggaris(k) && k.pernahSalah },
  { id: "a-meteran", teks: "Ganti ke Meteran, pilih benda yang lebih panjang dari 30 cm, geser ke angka 0, lalu baca panjangnya.", wajib: true, cek: (k) => penggaris(k) && k.pernah.some((p) => p.startsWith("meteran:")) },
  { id: "a-tiga", teks: "Ukur tiga benda berbeda dengan alat yang tepat, masing-masing dimulai dari angka 0.", wajib: true, cek: (k) => penggaris(k) && k.pernah.length >= 3 },
  { id: "a-mesin", teks: "Selesaikan Mesin Ukur sampai semua benda diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K3B3.A) },
  { id: "a-skenario", teks: "Selesaikan skenario Posyandu Alfa sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K3B3.A) },
  { id: "a-30", teks: "Ukur buku tulis 30 cm dengan penggaris. Panjangnya pas sampai ujung penggaris.", wajib: false, cek: (k) => penggaris(k) && k.pernah.includes("penggaris:buku") },
  { id: "a-terlalu", teks: "Pasang benda yang lebih panjang dari 30 cm di penggaris, dan lihat lab menolaknya.", wajib: false, cek: (k) => penggaris(k) && k.pernahTerlalu },
  { id: "a-lima", teks: "Ukur lima benda berbeda dengan alat yang tepat.", wajib: false, cek: (k) => penggaris(k) && k.pernah.length >= 5 },
];

/** Sub-Bab B: hubungan meter dan sentimeter, menyambung dan memotong. */
export const MISI_B: DefMisi<KeadaanK3Bab3>[] = [
  { id: "b-117", teks: "Rakit pita 1 m 17 cm (tinggi Azizah). Nyalakan Meter dan cm serta Sentimeter, dan lihat 117 cm.", wajib: true, cek: (k) => meteran(k) && k.mode === "satu" && k.a === 117 && k.meterCm && k.senti },
  { id: "b-bagi", teks: "Rakit pita 400 cm, nyalakan Ubah satuan, dan lihat 400 cm dibagi 100 sama dengan 4 m.", wajib: true, cek: (k) => meteran(k) && k.mode === "satu" && k.a === 400 && k.ubah },
  { id: "b-tukar", teks: "Tambah sentimeter sampai 100 cm, dan lihat 100 cm ditukar 1 meter.", wajib: true, cek: (k) => meteran(k) && k.tukarPM },
  { id: "b-sambung", teks: "Sambung pita 4 m 37 cm dengan pita 7 m 43 cm. Nyalakan Langkah hitung: hasilnya 11 m 80 cm.", wajib: true, cek: (k) => meteran(k) && k.mode === "dua" && k.op === "sambung" && k.a === 437 && k.b === 743 && k.langkah },
  { id: "b-kurang", teks: "Potong kain 75 m 80 cm dengan 38 m 45 cm. Nyalakan Langkah hitung: sisanya 37 m 35 cm.", wajib: true, cek: (k) => meteran(k) && k.mode === "dua" && k.op === "potong" && k.a === 7580 && k.b === 3845 && k.langkah },
  { id: "b-mesin", teks: "Selesaikan Mesin Ubah Panjang sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K3B3.B) },
  { id: "b-skenario", teks: "Selesaikan skenario Pita Meutia sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K3B3.B) },
  { id: "b-simpan", teks: "Sambung dua pita yang sentimeternya berjumlah lebih dari 100, dan lihat 100 cm ditukar 1 m.", wajib: false, cek: (k) => meteran(k) && k.simpan && k.langkah },
  { id: "b-pinjam", teks: "Potong pita yang sentimeternya kurang, dan lihat meminjam 1 m yang sama dengan 100 cm.", wajib: false, cek: (k) => meteran(k) && k.pinjam && k.langkah },
  { id: "b-seribu", teks: "Rakit pita 10 m dan lihat 1.000 cm dengan Sentimeter menyala.", wajib: false, cek: (k) => meteran(k) && k.mode === "satu" && k.a === 1000 && k.senti },
];

/** Sub-Bab C: pengukuran berat dengan timbangan digital dan timbangan duduk. */
export const MISI_C: DefMisi<KeadaanK3Bab3>[] = [
  { id: "c-nol", teks: "Atur timbangan ke angka 0 sebelum menimbang.", wajib: true, cek: (k) => timbang(k) && k.dinol },
  { id: "c-telur", teks: "Timbang telur dengan timbangan digital, mulai dari nol, lalu tekan Baca berat.", wajib: true, cek: (k) => timbang(k) && k.pernah.includes("digital:telur") },
  { id: "c-jarum", teks: "Timbang semangka dengan timbangan duduk, mulai dari nol, dan baca angka yang ditunjuk jarum.", wajib: true, cek: (k) => timbang(k) && k.pernah.includes("duduk:semangka") },
  { id: "c-salah", teks: "Tekan Baca berat saat timbangan belum di angka 0, dan lihat mengapa hasilnya keliru.", wajib: true, cek: (k) => timbang(k) && k.pernahSalah },
  { id: "c-tiga", teks: "Timbang tiga benda berbeda dengan benar, masing-masing dimulai dari angka 0.", wajib: true, cek: (k) => timbang(k) && k.pernah.length >= 3 },
  { id: "c-mesin", teks: "Selesaikan Mesin Timbang sampai semua benda diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K3B3.C) },
  { id: "c-skenario", teks: "Selesaikan skenario Bahan Kue Meutia sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K3B3.C) },
  { id: "c-seribu", teks: "Timbang gula dengan timbangan digital. Layar menunjukkan 1.000 g.", wajib: false, cek: (k) => timbang(k) && k.pernah.includes("digital:gula") },
  { id: "c-selisih", teks: "Timbang stroberi 100 g dan stroberi dua kotak 500 g dengan timbangan digital, lalu hitung selisihnya.", wajib: false, cek: (k) => timbang(k) && k.pernah.includes("digital:stroberi") && k.pernah.includes("digital:stroberi2") },
  { id: "c-diantara", teks: "Timbang tepung dengan timbangan duduk dan lihat jarum berhenti di antara dua angka.", wajib: false, cek: (k) => timbang(k) && k.pernahDiantara },
];

/** Sub-Bab D: hubungan kilogram, ons, dan gram (pencapaian misi bab). */
export const MISI_D: DefMisi<KeadaanK3Bab3>[] = [
  { id: "d-750", teks: "Seimbangkan tepung 750 g dengan bandul. Jumlah berat bandul harus tepat 750 g.", wajib: true, cek: (k) => kodok(k) && k.benda === "tepung" && k.seimbang },
  { id: "d-dua", teks: "Seimbangkan satu benda yang sama dengan dua susunan bandul yang berbeda.", wajib: true, cek: (k) => kodok(k) && susunanTerbanyak(k.pernah) >= 2 },
  { id: "d-kg", teks: "Di Ubah Berat, buat 1.000 g dan nyalakan Gram dan Ons: 1 kg = 10 ons = 1.000 g.", wajib: true, cek: (k) => ubah(k) && k.total === 1000 && k.gram && k.ons },
  { id: "d-1753", teks: "Buat 1.753 g dan nyalakan Kilogram dan gram: 1.753 g = 1 kg 753 g.", wajib: true, cek: (k) => ubah(k) && k.total === 1753 && k.kgg },
  { id: "d-4150", teks: "Buat 4 kg 150 g dan nyalakan Gram: 4 kg 150 g = 4.150 g.", wajib: true, cek: (k) => ubah(k) && k.total === 4150 && k.gram },
  { id: "d-mesin", teks: "Selesaikan Mesin Ubah Berat sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K3B3.D) },
  { id: "d-skenario", teks: "Selesaikan skenario Pasar Meutia sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K3B3.D) },
  { id: "d-tiga", teks: "Seimbangkan satu benda yang sama dengan tiga susunan bandul yang berbeda.", wajib: false, cek: (k) => kodok(k) && susunanTerbanyak(k.pernah) >= 3 },
  { id: "d-mangga", teks: "Buat 8.000 g dan nyalakan Kilogram dan gram: 8.000 g = 8 kg (mangga Meutia).", wajib: false, cek: (k) => ubah(k) && k.total === 8000 && k.kgg },
  { id: "d-lima", teks: "Seimbangkan jeruk 2.000 g dengan tepat lima bandul.", wajib: false, cek: (k) => kodok(k) && k.benda === "jeruk" && k.seimbang && k.jumlah.reduce((s, n) => s + n, 0) === 5 },
];

export type HurufMisiK3B3 = "A" | "B" | "C" | "D";

export const daftarMisiK3Bab3 = (huruf: HurufMisiK3B3): DefMisi<KeadaanK3Bab3>[] => (huruf === "B" ? MISI_B : huruf === "C" ? MISI_C : huruf === "D" ? MISI_D : MISI_A);
