/**
 * Misi dan tantangan bebas Kelas 4 Bab 4 (Pengukuran Luas dan Volume, tema Kolam Renang Tirta Ceria). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k4b4.mjs.
 *
 * Tiap Sub-Bab satu simulasi sendiri (folder Sub-Bab).
 * KERANGKA: agen tiap Sub-Bab mengganti MISI_X (kosong) dan menyesuaikan tipe keadaannya di union KeadaanK4Bab4.
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi } from "./misi-simulasi";

import type { KeadaanUbin } from "./ubin-k4b4a/logika";
import type { KeadaanEmber } from "./ember-k4b4b/logika";

export type KeadaanK4Bab4 = { alat: "kerangka" } | KeadaanUbin | KeadaanEmber;

/** Sub-Bab A: Lantai Ubin. Empat misi wajib dan dua tantangan bebas, id berawalan a-, tanpa skor. Diuji di scripts/uji-ubin-k4b4a.mjs. */
const ubin = (k: KeadaanK4Bab4): k is KeadaanUbin => k.alat === "ubin";
export const MISI_A: DefMisi<KeadaanK4Bab4>[] = [
  { id: "a-tutup", teks: "Tutup lantai dengan ubin sampai pas dengan lantai sasaran, lalu tekan Periksa.", wajib: true, cek: (k) => ubin(k) && k.tutupBenar.length >= 1 },
  { id: "a-baris", teks: "Hitung luas lantai dari baris kali kolom dan satuannya, lalu tekan Periksa.", wajib: true, cek: (k) => ubin(k) && k.barisBenar.length >= 1 },
  { id: "a-tangga", teks: "Ubah meter persegi ke sentimeter persegi pada tangga satuan, lalu tekan Periksa.", wajib: true, cek: (k) => ubin(k) && k.tanggaBenar.length >= 1 },
  { id: "a-satuan", teks: "Pilih satuan luas yang tepat untuk benda yang diukur, lalu tekan Periksa.", wajib: true, cek: (k) => ubin(k) && k.satuanBenar.length >= 1 },
  { id: "a-tolak", teks: "Tekan Periksa pada lantai yang masih kosong, dan lihat alat menolak.", wajib: false, cek: (k) => ubin(k) && k.tolak },
  { id: "a-dua", teks: "Tutup dua lantai dengan benar tanpa terhenti.", wajib: false, cek: (k) => ubin(k) && k.tutupBenar.length >= 2 },
];

/** Sub-Bab B: Bak Ember. Empat misi wajib dan dua tantangan bebas, id berawalan b-, tanpa skor. Diuji di scripts/uji-ember-k4b4b.mjs. */
const ember = (k: KeadaanK4Bab4): k is KeadaanEmber => k.alat === "ember";
export const MISI_B: DefMisi<KeadaanK4Bab4>[] = [
  { id: "b-tuang", teks: "Tuang gelas takar ke ember sampai tepat di garis sasaran, lalu tekan Periksa.", wajib: true, cek: (k) => ember(k) && k.tuangBenar.length >= 1 },
  { id: "b-susun", teks: "Susun lapisan kubus sampai volumenya sama dengan sasaran, lalu tekan Periksa.", wajib: true, cek: (k) => ember(k) && k.susunBenar.length >= 1 },
  { id: "b-turun", teks: "Turuni tangga dari liter ke mililiter dan pilih hasilnya, lalu tekan Periksa.", wajib: true, cek: (k) => ember(k) && k.tanggaBenar.some((i) => i % 2 === 0) },
  { id: "b-naik", teks: "Naiki tangga dari mililiter ke liter dan pilih hasilnya, lalu tekan Periksa.", wajib: true, cek: (k) => ember(k) && k.tanggaBenar.some((i) => i % 2 === 1) },
  { id: "b-tolak", teks: "Coba menuang sampai ember meluap, dan lihat alat menolak.", wajib: false, cek: (k) => ember(k) && k.tolak },
  { id: "b-dua", teks: "Isi dua ember sasaran dengan tepat.", wajib: false, cek: (k) => ember(k) && k.tuangBenar.length >= 2 },
];

export const daftarMisiK4Bab4 = (sub: string): DefMisi<KeadaanK4Bab4>[] => {
  switch (sub) {
    case "B":
      return MISI_B;
    default:
      return MISI_A;
  }
};
