/**
 * Misi dan tantangan bebas Kelas 4 Bab 2 (Pecahan, tema Sanggar Batik Kampung Mekar). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k4b2.mjs.
 *
 * Tiap Sub-Bab satu simulasi sendiri (folder Sub-Bab).
 * KERANGKA: agen tiap Sub-Bab mengganti MISI_X (kosong) dan menyesuaikan tipe keadaannya di union KeadaanK4Bab2.
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi } from "./misi-simulasi";

import type { KeadaanLipat } from "./lipat-k4b2a/logika";
import type { KeadaanWarna } from "./warna-k4b2b/logika";
import type { KeadaanJahit } from "./jahit-k4b2c/logika";
import type { KeadaanMeteran } from "./meteran-k4b2d/logika";
import type { KeadaanPameran } from "./pameran-k4b2e/logika";

export type KeadaanK4Bab2 = { alat: "kerangka" } | KeadaanLipat | KeadaanWarna | KeadaanJahit | KeadaanMeteran | KeadaanPameran;

/** Sub-Bab A: Meja Lipat. Empat misi wajib dan dua tantangan bebas, id berawalan a-, tanpa skor. Diuji di scripts/uji-lipat-k4b2a.mjs. */
const lipat = (k: KeadaanK4Bab2): k is KeadaanLipat => k.alat === "lipat";
export const MISI_A: DefMisi<KeadaanK4Bab2>[] = [
  { id: "a-lipat", teks: "Bagi kain menjadi bagian sama besar sesuai pesanan, arsir satu bagian, lalu tekan Periksa.", wajib: true, cek: (k) => lipat(k) && k.lipatBenar.length >= 1 },
  { id: "a-banding", teks: "Bandingkan dua pita, pilih tanda yang tepat, lalu tekan Periksa.", wajib: true, cek: (k) => lipat(k) && k.bandingBenar.length >= 1 },
  { id: "a-urut", teks: "Taruh tiga kartu pecahan dari yang terkecil, lalu tekan Periksa.", wajib: true, cek: (k) => lipat(k) && k.urutBenar.length >= 1 },
  { id: "a-garis", teks: "Bagi garis dari nol sampai satu, jepit tanda pecahan pesanan, lalu tekan Periksa.", wajib: true, cek: (k) => lipat(k) && k.garisBenar.length >= 1 },
  { id: "a-tolak", teks: "Tekan Periksa pada kain yang belum ada bagian berarsir, dan lihat alat menolak.", wajib: false, cek: (k) => lipat(k) && k.tolak },
  { id: "a-dua", teks: "Selesaikan dua pesanan kain dengan benar tanpa terhenti.", wajib: false, cek: (k) => lipat(k) && k.lipatBenar.length >= 2 },
];

/** Sub-Bab B: Bak Warna. Empat misi wajib dan dua tantangan bebas, id berawalan b-, tanpa skor. Diuji di scripts/uji-warna-k4b2b.mjs. */
const warna = (k: KeadaanK4Bab2): k is KeadaanWarna => k.alat === "warna";
export const MISI_B: DefMisi<KeadaanK4Bab2>[] = [
  { id: "b-banding", teks: "Hitung isi kedua bak, pilih tanda yang tepat, lalu tekan Periksa.", wajib: true, cek: (k) => warna(k) && k.bandBenar.length >= 1 },
  { id: "b-isi", teks: "Isi bagian bak sebanyak pembilang pecahan sasaran, lalu tekan Periksa.", wajib: true, cek: (k) => warna(k) && k.isiBenar.length >= 1 },
  { id: "b-urut", teks: "Geser kartu pecahan sampai berurutan dari yang terkecil, lalu tekan Periksa.", wajib: true, cek: (k) => warna(k) && k.naikBenar.length >= 1 },
  { id: "b-garis", teks: "Geser titik pada garis ke pecahan sasaran, lalu tekan Periksa.", wajib: true, cek: (k) => warna(k) && k.garisBenar.length >= 1 },
  { id: "b-turun", teks: "Geser kartu pecahan sampai berurutan dari yang terbesar, lalu tekan Periksa.", wajib: false, cek: (k) => warna(k) && k.turunBenar.length >= 1 },
  { id: "b-tolak", teks: "Coba memilih tanda sebelum kedua bak dihitung, dan lihat alat menolak.", wajib: false, cek: (k) => warna(k) && k.tolak },
];

/** Sub-Bab C: Meja Jahit. Empat misi wajib dan dua tantangan bebas, id berawalan c-, tanpa skor. Diuji di scripts/uji-jahit-k4b2c.mjs. */
const jahit = (k: KeadaanK4Bab2): k is KeadaanJahit => k.alat === "jahit";
export const MISI_C: DefMisi<KeadaanK4Bab2>[] = [
  { id: "c-arsir", teks: "Arsir kain bawah sampai sama panjang dengan kain atas, lalu tekan Periksa.", wajib: true, cek: (k) => jahit(k) && k.arsirBenar.length >= 1 },
  { id: "c-kali", teks: "Pilih pengali sampai penyebutnya sesuai pesanan, lalu tekan Periksa.", wajib: true, cek: (k) => jahit(k) && k.kaliBenar.length >= 1 },
  { id: "c-bagi", teks: "Bagi pembilang dan penyebut sampai pecahannya paling sederhana, lalu tekan Periksa.", wajib: true, cek: (k) => jahit(k) && k.bagiBenar.length >= 1 },
  { id: "c-pasang", teks: "Pilih semua kartu yang sama besar dengan pecahan di papan, lalu tekan Periksa.", wajib: true, cek: (k) => jahit(k) && k.pasangBenar.length >= 1 },
  { id: "c-tolak", teks: "Pilih cara tambah pada alat Kali, tekan Periksa, dan lihat alat menolak.", wajib: false, cek: (k) => jahit(k) && k.tolak },
  { id: "c-dua", teks: "Arsir dua kain dengan benar tanpa terhenti.", wajib: false, cek: (k) => jahit(k) && k.arsirBenar.length >= 2 },
];

/** Sub-Bab D: Meteran Kain. Empat misi wajib dan dua tantangan bebas, id berawalan d-, tanpa skor. */
const meteran = (k: KeadaanK4Bab2): k is KeadaanMeteran => k.alat === "meteran";
export const MISI_D: DefMisi<KeadaanK4Bab2>[] = [
  { id: "d-sepuluh", teks: "Warnai kolom kain sebanyak angka di belakang koma pada desimal, lalu tekan Periksa.", wajib: true, cek: (k) => meteran(k) && k.sepBenar.length >= 1 },
  { id: "d-seratus", teks: "Isi baris penuh dan kotak lepas sesuai dua angka di belakang koma, lalu tekan Periksa.", wajib: true, cek: (k) => meteran(k) && k.serBenar.length >= 1 },
  { id: "d-jembatan", teks: "Pilih desimal yang sama dengan pecahan, tekan Cek Jembatan, lalu tekan Periksa.", wajib: true, cek: (k) => meteran(k) && k.jemBenar.length >= 1 },
  { id: "d-balik", teks: "Pilih pecahan yang sama besar dengan desimal di papan, lalu tekan Periksa.", wajib: true, cek: (k) => meteran(k) && k.balBenar.length >= 1 },
  { id: "d-tolak", teks: "Coba menaruh sepuluh kotak lepas pada kisi seratus kotak dan lihat alat menolak.", wajib: false, cek: (k) => meteran(k) && k.tolak },
  { id: "d-tiga", teks: "Warnai kain per sepuluh dengan benar tiga kali tanpa terhenti.", wajib: false, cek: (k) => meteran(k) && k.sepBenar.length >= 3 },
];

/** Sub-Bab E: Papan Pameran. Empat misi wajib dan dua tantangan bebas, id berawalan e-, tanpa skor. */
const pameran = (k: KeadaanK4Bab2): k is KeadaanPameran => k.alat === "pameran";
export const MISI_E: DefMisi<KeadaanK4Bab2>[] = [
  { id: "e-kisi", teks: "Warnai kotak pada kisi seratus sebanyak persen sasaran, lalu tekan Periksa.", wajib: true, cek: (k) => pameran(k) && k.kisiBenar.length >= 1 },
  { id: "e-geser", teks: "Ubah desimal menjadi persen: geser koma, tempel tanda persen, lalu tekan Periksa.", wajib: true, cek: (k) => pameran(k) && k.geserBenar.length >= 1 },
  { id: "e-balik", teks: "Ubah persen menjadi desimal: lepas tanda persen, geser koma, lalu tekan Periksa.", wajib: true, cek: (k) => pameran(k) && k.balikBenar.length >= 1 },
  { id: "e-baca", teks: "Baca kisi yang berwarna, pilih persen dan desimalnya, lalu tekan Periksa.", wajib: true, cek: (k) => pameran(k) && k.bacaBenar.length >= 1 },
  { id: "e-tolak", teks: "Coba menempel tanda persen sebelum koma sampai di ujung kanan, dan lihat alat menolak.", wajib: false, cek: (k) => pameran(k) && k.tolak },
  { id: "e-dua", teks: "Warnai dua kisi dengan benar sampai persen sasarannya.", wajib: false, cek: (k) => pameran(k) && k.kisiBenar.length >= 2 },
];

export const daftarMisiK4Bab2 = (sub: string): DefMisi<KeadaanK4Bab2>[] => {
  switch (sub) {
    case "B":
      return MISI_B;
    case "C":
      return MISI_C;
    case "D":
      return MISI_D;
    case "E":
      return MISI_E;
    default:
      return MISI_A;
  }
};
