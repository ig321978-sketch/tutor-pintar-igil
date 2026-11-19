/**
 * Misi dan tantangan bebas Kelas 2 Bab 7 (Ayo Membilang sampai dengan 100, tema Bank Sampah Sekolah). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas2.mjs.
 *
 * Sub-Bab A memakai Simulasi Gudang Ikat (ikat-k2b7a), Sub-Bab B (akhir bab) Papan Pengumuman (papan-k2b7b).
 * KERANGKA: agen tiap Sub-Bab mengganti MISI_A / MISI_B dan menambah tipe keadaannya ke union KeadaanK2Bab7.
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi } from "./misi-simulasi";

import type { KeadaanIkat } from "./ikat-k2b7a/logika";
import type { KeadaanPapan } from "./papan-k2b7b/logika";

export type KeadaanK2Bab7 = { alat: "kerangka" } | KeadaanIkat | KeadaanPapan;

/**
 * Sub-Bab A (awal cerita Bank Sampah): Misi Gudang Ikat, Simulasi Gudang Ikat (ikat-k2b7a). Benda (kardus, tutup botol, kaus bekas) dan banyak benda (dua puluh tujuh, lima puluh delapan,
 * empat puluh tiga) berbeda dari Story. Empat misi wajib dan dua tantangan bebas, tanpa skor. Diuji di scripts/uji-ikat-k2b7a.mjs.
 */
const ikat = (k: KeadaanK2Bab7): k is KeadaanIkat => k.alat === "ikat";
export const MISI_A: DefMisi<KeadaanK2Bab7>[] = [
  { id: "a-ikat", teks: "Ikat benda sepuluh-sepuluh sampai tidak ada lagi yang bisa diikat.", wajib: true, cek: (k) => ikat(k) && k.selesaiIkat.length >= 1 },
  { id: "a-papan", teks: "Taruh puluhan dan satuan di papan sesuai banyak benda, lalu tekan Periksa.", wajib: true, cek: (k) => ikat(k) && k.papanBenar.length >= 1 },
  { id: "a-tulis", teks: "Tulis banyak benda dengan memilih angka puluhan dan angka satuannya.", wajib: true, cek: (k) => ikat(k) && k.tulisBenar.length >= 1 },
  { id: "a-kira", teks: "Buat perkiraan banyak benda dulu, lalu buktikan dengan mengikat sepuluh-sepuluh.", wajib: true, cek: (k) => ikat(k) && k.kiraTuntas.length >= 1 },
  { id: "a-semua", teks: "Ikat ketiga tumpukan benda sampai semuanya selesai diikat.", wajib: false, cek: (k) => ikat(k) && k.selesaiIkat.length >= 3 },
  { id: "a-tukar", teks: "Tukar angka puluhan dan satuan, lalu lihat bilangannya menjadi bilangan yang lain.", wajib: false, cek: (k) => ikat(k) && k.terbalik },
];

/**
 * Sub-Bab B (akhir bab, pencapaian misi bab ini): Misi Papan Pengumuman, Simulasi Papan Pengumuman (papan-k2b7b). Katak di tali, dua bilangan dengan kata, kartu bilangan, dan kartu angka
 * berbeda dari Story. Empat misi wajib dan dua tantangan bebas, tanpa skor. Diuji di scripts/uji-papan-k2b7b.mjs.
 */
const papan = (k: KeadaanK2Bab7): k is KeadaanPapan => k.alat === "papan";
export const MISI_B: DefMisi<KeadaanK2Bab7>[] = [
  { id: "b-garis", teks: "Geser katak di tali sampai tepat di bilangan yang diminta, lalu tekan Periksa.", wajib: true, cek: (k) => papan(k) && k.garisBenar.length >= 1 },
  { id: "b-banding", teks: "Bandingkan dua bilangan, lalu pilih kata yang tepat untuk keduanya.", wajib: true, cek: (k) => papan(k) && k.bandingBenar.length >= 1 },
  { id: "b-urut", teks: "Urutkan kartu bilangan dari yang paling kecil sampai yang paling besar.", wajib: true, cek: (k) => papan(k) && k.urutBenar.length >= 1 },
  { id: "b-kartu", teks: "Pasang dua kartu angka supaya terbentuk bilangan yang diminta.", wajib: true, cek: (k) => papan(k) && k.kartuBenar.length >= 1 },
  { id: "b-sama", teks: "Temukan dua bilangan yang sama besar, lalu pilih kata sama dengan.", wajib: false, cek: (k) => papan(k) && k.tandaSama },
  { id: "b-mundur", teks: "Geser katak mundur sampai tepat di bilangan yang diminta.", wajib: false, cek: (k) => papan(k) && k.mundurBenar },
];

export const daftarMisiK2Bab7 = (sub: string): DefMisi<KeadaanK2Bab7>[] => (sub === "B" ? MISI_B : MISI_A);
