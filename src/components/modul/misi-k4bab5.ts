/**
 * Misi dan tantangan bebas Kelas 4 Bab 5 (Bangun Datar, tema Toko Keramik Bu Dewi). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k4b5.mjs.
 *
 * Tiap Sub-Bab satu simulasi sendiri (folder Sub-Bab).
 * KERANGKA: agen tiap Sub-Bab mengganti MISI_X (kosong) dan menyesuaikan tipe keadaannya di union KeadaanK4Bab5.
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi } from "./misi-simulasi";

import type { KeadaanEtalase } from "./etalase-k4b5a/logika";
import type { KeadaanMosaik } from "./mosaik-k4b5b/logika";

export type KeadaanK4Bab5 = { alat: "kerangka" } | KeadaanEtalase | KeadaanMosaik;

/** Sub-Bab A: Etalase Keramik. Empat misi wajib dan dua tantangan bebas, id berawalan a-, tanpa skor. Diuji di scripts/uji-etalase-k4b5a.mjs. */
const etalase = (k: KeadaanK4Bab5): k is KeadaanEtalase => k.alat === "etalase";
export const MISI_A: DefMisi<KeadaanK4Bab5>[] = [
  { id: "a-pilah", teks: "Golongkan semua keramik di rak menurut banyak sisinya, lalu tekan Periksa.", wajib: true, cek: (k) => etalase(k) && k.pilahBenar.length >= 1 },
  { id: "a-sisi", teks: "Tandai ciri sebuah segiempat dengan tepat, lalu tekan Periksa.", wajib: true, cek: (k) => etalase(k) && k.sisiBenar.length >= 1 },
  { id: "a-pohon", teks: "Pilih nama bangun anak pada pohon keluarga bentuk, lalu tekan Periksa.", wajib: true, cek: (k) => etalase(k) && k.pohonBenar.length >= 1 },
  { id: "a-segitiga", teks: "Pilih jenis sebuah segitiga menurut sisi dan sudutnya, lalu tekan Periksa.", wajib: true, cek: (k) => etalase(k) && k.segBenar.length >= 1 },
  { id: "a-tolak", teks: "Tekan Periksa saat masih ada keramik yang belum digolongkan, dan lihat alat menolak.", wajib: false, cek: (k) => etalase(k) && k.tolak },
  { id: "a-dua", teks: "Golongkan dua rak keramik dengan benar tanpa terhenti.", wajib: false, cek: (k) => etalase(k) && k.pilahBenar.length >= 2 },
];

/** Sub-Bab B: Mosaik Keramik. Empat misi wajib dan dua tantangan bebas, id berawalan b-, tanpa skor. Diuji di scripts/uji-mosaik-k4b5b.mjs. */
const mosaik = (k: KeadaanK4Bab5): k is KeadaanMosaik => k.alat === "mosaik";
export const MISI_B: DefMisi<KeadaanK4Bab5>[] = [
  { id: "b-persegi", teks: "Pasang dua keping sama besar pada sisi miring sampai menjadi persegi, lalu tekan Periksa.", wajib: true, cek: (k) => mosaik(k) && k.pasangBenar.some((i) => i % 3 === 0) },
  { id: "b-segitiga", teks: "Pasang dua keping sama besar pada sisi tegak sampai menjadi segitiga besar, lalu tekan Periksa.", wajib: true, cek: (k) => mosaik(k) && k.pasangBenar.some((i) => i % 3 !== 0) },
  { id: "b-bagi", teks: "Tarik garis dari titik tengah ke tiap sudut dan pilih banyak segitiga, lalu tekan Periksa.", wajib: true, cek: (k) => mosaik(k) && k.bagiBenar.length >= 1 },
  { id: "b-sudut", teks: "Hubungkan satu sudut dengan semua sudut yang tidak bersebelahan, lalu tekan Periksa.", wajib: true, cek: (k) => mosaik(k) && k.sudutBenar.length >= 1 },
  { id: "b-tolak", teks: "Coba memasang dua keping yang tidak sama besar, dan lihat alat menolak.", wajib: false, cek: (k) => mosaik(k) && k.tolakPasang },
  { id: "b-dua", teks: "Belah dua keramik beraturan dengan benar tanpa terhenti.", wajib: false, cek: (k) => mosaik(k) && k.bagiBenar.length >= 2 },
];

export const daftarMisiK4Bab5 = (sub: string): DefMisi<KeadaanK4Bab5>[] => {
  switch (sub) {
    case "B":
      return MISI_B;
    default:
      return MISI_A;
  }
};
