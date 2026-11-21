/**
 * Misi dan tantangan bebas Kelas 4 Bab 6 (Piktogram dan Diagram Batang, tema Bazar Kuliner Sekolah). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k4b6.mjs.
 *
 * Tiap Sub-Bab satu simulasi sendiri (folder Sub-Bab).
 * KERANGKA: agen tiap Sub-Bab mengganti MISI_X (kosong) dan menyesuaikan tipe keadaannya di union KeadaanK4Bab6.
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi } from "./misi-simulasi";

import type { KeadaanJajanan } from "./jajanan-k4b6a/logika";
import type { KeadaanBazar } from "./bazar-k4b6b/logika";

export type KeadaanK4Bab6 = { alat: "kerangka" } | KeadaanJajanan | KeadaanBazar;

/** Sub-Bab A: Piktogram Jajanan. Empat misi wajib dan dua tantangan bebas, id berawalan a-, tanpa skor. Diuji di scripts/uji-jajanan-k4b6a.mjs. */
const jajanan = (k: KeadaanK4Bab6): k is KeadaanJajanan => k.alat === "jajanan";
export const MISI_A: DefMisi<KeadaanK4Bab6>[] = [
  { id: "a-gambar", teks: "Pilih keterangan yang tepat dan tambah ikon sesuai tabel, lalu tekan Periksa.", wajib: true, cek: (k) => jajanan(k) && k.gambarBenar.length >= 1 },
  { id: "a-baca", teks: "Baca piktogram dan pilih banyak data satu baris, lalu tekan Periksa.", wajib: true, cek: (k) => jajanan(k) && k.bacaBenar.length >= 1 },
  { id: "a-banding", teks: "Tandai baris paling banyak dan paling sedikit, lalu tekan Periksa.", wajib: true, cek: (k) => jajanan(k) && k.bandingBenar.length >= 1 },
  { id: "a-jumlah", teks: "Masukkan semua baris, pilih jumlah seluruhnya, lalu tekan Periksa.", wajib: true, cek: (k) => jajanan(k) && k.jumlahBenar.length >= 1 },
  { id: "a-tolak", teks: "Pilih keterangan yang tidak habis membagi data, dan lihat alat menolak.", wajib: false, cek: (k) => jajanan(k) && k.tolak },
  { id: "a-dua", teks: "Gambar dua tabel menjadi piktogram dengan benar tanpa terhenti.", wajib: false, cek: (k) => jajanan(k) && k.gambarBenar.length >= 2 },
];

/** Sub-Bab B: Batang Bazar. Empat misi wajib dan dua tantangan bebas, id berawalan b-, tanpa skor. Diuji di scripts/uji-bazar-k4b6b.mjs. */
const bazar = (k: KeadaanK4Bab6): k is KeadaanBazar => k.alat === "bazar";
export const MISI_B: DefMisi<KeadaanK4Bab6>[] = [
  { id: "b-buat", teks: "Naikkan batang sampai ujungnya tepat pada garis data, lalu tekan Periksa.", wajib: true, cek: (k) => bazar(k) && k.buatBenar.length >= 1 },
  { id: "b-telusur", teks: "Telusuri ujung batang ke sumbu dan pilih banyaknya, lalu tekan Periksa.", wajib: true, cek: (k) => bazar(k) && k.bacaBenar.length >= 1 },
  { id: "b-banding", teks: "Adu dua batang dan pilih selisihnya, lalu tekan Periksa.", wajib: true, cek: (k) => bazar(k) && k.bandingBenar.length >= 1 },
  { id: "b-arah", teks: "Putar diagram dan pilih jenis dengan batang paling panjang, lalu tekan Periksa.", wajib: true, cek: (k) => bazar(k) && k.putarBenar.length >= 1 },
  { id: "b-tolak", teks: "Naikkan sebuah batang melewati garis paling atas, dan lihat alat menolak.", wajib: false, cek: (k) => bazar(k) && k.tolakBuat },
  { id: "b-dua", teks: "Bangun dua diagram batang dengan benar tanpa terhenti.", wajib: false, cek: (k) => bazar(k) && k.buatBenar.length >= 2 },
];

export const daftarMisiK4Bab6 = (sub: string): DefMisi<KeadaanK4Bab6>[] => {
  switch (sub) {
    case "B":
      return MISI_B;
    default:
      return MISI_A;
  }
};
