/**
 * Misi dan tantangan bebas Kelas 4 Bab 3 (Pola Gambar dan Pola Bilangan, tema Orkestra Angklung Kampung Senandung). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k4b3.mjs.
 *
 * Tiap Sub-Bab satu simulasi sendiri (folder Sub-Bab).
 * KERANGKA: agen tiap Sub-Bab mengganti MISI_X (kosong) dan menyesuaikan tipe keadaannya di union KeadaanK4Bab3.
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi } from "./misi-simulasi";

import type { KeadaanAngklung } from "./angklung-k4b3a/logika";
import type { KeadaanKursi } from "./kursi-k4b3b/logika";

export type KeadaanK4Bab3 = { alat: "kerangka" } | KeadaanAngklung | KeadaanKursi;

/** Sub-Bab A: Panggung Deret. Empat misi wajib dan dua tantangan bebas, id berawalan a-, tanpa skor. Diuji di scripts/uji-angklung-k4b3a.mjs. */
const angklung = (k: KeadaanK4Bab3): k is KeadaanAngklung => k.alat === "angklung";
export const MISI_A: DefMisi<KeadaanK4Bab3>[] = [
  { id: "a-tata", teks: "Tata deret keempat sesuai pola tiga deret di rak, lalu tekan Periksa.", wajib: true, cek: (k) => angklung(k) && k.tataBenar.length >= 1 },
  { id: "a-jenis", teks: "Pilih jenis pola dari tiga deret, membesar atau mengecil, lalu tekan Periksa.", wajib: true, cek: (k) => angklung(k) && k.jenisBenar.length >= 1 },
  { id: "a-tabel", teks: "Atur selisih pada tabel selisih sampai sesuai tiga deret, lalu tekan Periksa.", wajib: true, cek: (k) => angklung(k) && k.tabelBenar.length >= 1 },
  { id: "a-lima", teks: "Susun angklung per lima sesuai permintaan Bu Ratri, lalu tekan Periksa.", wajib: true, cek: (k) => angklung(k) && k.limaBenar.length >= 1 },
  { id: "a-tolak", teks: "Tekan Periksa pada rak yang deret keempatnya masih kosong, dan lihat alat menolak.", wajib: false, cek: (k) => angklung(k) && k.tolak },
  { id: "a-dua", teks: "Tata dua rak dengan benar tanpa terhenti.", wajib: false, cek: (k) => angklung(k) && k.tataBenar.length >= 2 },
];

/** Sub-Bab B: Papan Kursi. Empat misi wajib dan dua tantangan bebas, id berawalan b-, tanpa skor. Diuji di scripts/uji-kursi-k4b3b.mjs. */
const kursi = (k: KeadaanK4Bab3): k is KeadaanKursi => k.alat === "kursi";
export const MISI_B: DefMisi<KeadaanK4Bab3>[] = [
  { id: "b-rantai", teks: "Tarik rantai loncat tambah sampai baris sasaran, lalu tekan Periksa.", wajib: true, cek: (k) => kursi(k) && k.rantaiBenar.some((i) => i % 2 === 0) },
  { id: "b-turun", teks: "Tarik rantai loncat kurang pada pola yang mengecil sampai baris sasaran, lalu tekan Periksa.", wajib: true, cek: (k) => kursi(k) && k.rantaiBenar.some((i) => i % 2 === 1) },
  { id: "b-mesin", teks: "Atur aturan mesin sampai cocok dengan bilangan masuk dan keluar, lalu tekan Periksa.", wajib: true, cek: (k) => kursi(k) && k.mesinBenar.length >= 1 },
  { id: "b-tabel", teks: "Atur banyak lompatan pada tabel urutan dan pilih bilangannya, lalu tekan Periksa.", wajib: true, cek: (k) => kursi(k) && k.tabelBenar.length >= 1 },
  { id: "b-tolak", teks: "Coba mengurangi kursi sampai kurang dari nol, dan lihat alat menolak.", wajib: false, cek: (k) => kursi(k) && k.tolak },
  { id: "b-dua", teks: "Cari bilangan pada dua tabel urutan dengan benar tanpa terhenti.", wajib: false, cek: (k) => kursi(k) && k.tabelBenar.length >= 2 },
];

export const daftarMisiK4Bab3 = (sub: string): DefMisi<KeadaanK4Bab3>[] => {
  switch (sub) {
    case "B":
      return MISI_B;
    default:
      return MISI_A;
  }
};
