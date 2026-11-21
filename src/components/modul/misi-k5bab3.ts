/**
 * Misi dan tantangan bebas Kelas 5 Bab 3 (Bilangan Pecahan, tema Toko Roti Keliling). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k5b3.mjs.
 *
 * Tiap Sub-Bab satu simulasi sendiri (folder Sub-Bab).
 * KERANGKA: agen tiap Sub-Bab mengganti MISI_X (kosong) dan menyesuaikan tipe keadaannya di union KeadaanK5Bab3.
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi } from "./misi-simulasi";

import type { KeadaanTimbang } from "./timbang-k5b3a/logika";
import type { KeadaanLoyang } from "./loyang-k5b3b/logika";
import type { KeadaanAdonan } from "./adonan-k5b3c/logika";

export type KeadaanK5Bab3 = { alat: "kerangka" } | KeadaanTimbang | KeadaanLoyang | KeadaanAdonan;

/** Sub-Bab A: Garis Timbang. Empat misi wajib dan dua tantangan bebas, id berawalan a-, tanpa skor. Diuji di scripts/uji-timbang-k5b3a.mjs. */
const timbang = (k: KeadaanK5Bab3): k is KeadaanTimbang => k.alat === "timbang";
export const MISI_A: DefMisi<KeadaanK5Bab3>[] = [
  { id: "a-garis", teks: "Geser tanda pada garis bilangan sampai letak pecahan yang diminta, lalu tekan Periksa.", wajib: true, cek: (k) => timbang(k) && k.garisBenar.length >= 1 },
  { id: "a-ubah", teks: "Atur pembilang sampai pecahan biasa sama besar dengan pecahan campuran, lalu tekan Periksa.", wajib: true, cek: (k) => timbang(k) && k.ubahBenar.length >= 1 },
  { id: "a-banding", teks: "Samakan penyebut dengan KPK, pilih tanda lebih kecil, sama dengan, atau lebih besar, lalu tekan Periksa.", wajib: true, cek: (k) => timbang(k) && k.bandingBenar.length >= 1 },
  { id: "a-urut", teks: "Ketuk tiga pecahan berurutan dari yang diminta sampai ketiganya terpasang.", wajib: true, cek: (k) => timbang(k) && k.urutBenar.length >= 1 },
  { id: "a-tolak", teks: "Atur penyebut baru yang bukan kelipatan kedua penyebut pada alat Banding, tekan Periksa, dan lihat alat menolak.", wajib: false, cek: (k) => timbang(k) && k.tolak },
  { id: "a-dua", teks: "Selesaikan dua pasang pecahan pada alat Banding tanpa terhenti.", wajib: false, cek: (k) => timbang(k) && k.bandingBenar.length >= 2 },
];

/** Sub-Bab B: Gabung Loyang. Empat misi wajib dan dua tantangan bebas, id berawalan b-, tanpa skor. Diuji di scripts/uji-loyang-k5b3b.mjs. */
const loyang = (k: KeadaanK5Bab3): k is KeadaanLoyang => k.alat === "loyang";
export const MISI_B: DefMisi<KeadaanK5Bab3>[] = [
  { id: "b-gabung", teks: "Gabungkan dua bagian loyang berpenyebut sama dengan mengatur pembilang dan penyebut hasil, lalu tekan Periksa.", wajib: true, cek: (k) => loyang(k) && k.gabungBenar.length >= 1 },
  { id: "b-samakan", teks: "Pilih KPK dari dua penyebut yang berbeda sampai pecahannya bisa disamakan, lalu tekan Periksa.", wajib: true, cek: (k) => loyang(k) && k.samaBenar.length >= 1 },
  { id: "b-campur", teks: "Jumlahkan dua pecahan campuran dengan mengatur bilangan bulat dan pembilang hasil, lalu tekan Periksa.", wajib: true, cek: (k) => loyang(k) && k.campBenar.length >= 1 },
  { id: "b-sederhana", teks: "Pilih bentuk paling sederhana dari hasil yang belum disederhanakan, lalu tekan Periksa.", wajib: true, cek: (k) => loyang(k) && k.sedBenar.length >= 1 },
  { id: "b-tolak", teks: "Ubah penyebut hasil pada alat Gabung lalu tekan Periksa, dan lihat alat menolak.", wajib: false, cek: (k) => loyang(k) && k.tolakPenyebut },
  { id: "b-dua", teks: "Selesaikan dua sasaran pada alat Samakan tanpa terhenti.", wajib: false, cek: (k) => loyang(k) && k.samaBenar.length >= 2 },
];

/** Sub-Bab C: Sisa Adonan. Empat misi wajib dan dua tantangan bebas, id berawalan c-, tanpa skor. Diuji di scripts/uji-adonan-k5b3c.mjs. */
const adonan = (k: KeadaanK5Bab3): k is KeadaanAdonan => k.alat === "adonan";
export const MISI_C: DefMisi<KeadaanK5Bab3>[] = [
  { id: "c-coret", teks: "Coret bagian loyang yang diambil pelanggan sesuai pesanan, lalu tekan Periksa.", wajib: true, cek: (k) => adonan(k) && k.coretBenar.length >= 1 },
  { id: "c-samakan", teks: "Setel penyebut bersama dari dua pecahan sampai KPK, lalu tekan Kurangkan.", wajib: true, cek: (k) => adonan(k) && k.samakanBenar.length >= 1 },
  { id: "c-kurang", teks: "Kurangkan pembilang dua pecahan berpenyebut sama, lalu tekan Periksa.", wajib: true, cek: (k) => adonan(k) && k.kurangBenar.length >= 1 },
  { id: "c-pisah", teks: "Pisahkan bilangan bulat dan pecahan pada dua pecahan campuran, lalu tekan Periksa.", wajib: true, cek: (k) => adonan(k) && k.pisahBenar.length >= 1 },
  { id: "c-tolak", teks: "Tekan Kurangkan saat penyebut belum sama pada alat Samakan, dan lihat alat menolak.", wajib: false, cek: (k) => adonan(k) && k.tolak },
  { id: "c-dua", teks: "Selesaikan dua loyang pada alat Coret dengan benar tanpa terhenti.", wajib: false, cek: (k) => adonan(k) && k.coretBenar.length >= 2 },
];

export const daftarMisiK5Bab3 = (sub: string): DefMisi<KeadaanK5Bab3>[] => {
  switch (sub) {
    case "B":
      return MISI_B;
    case "C":
      return MISI_C;
    default:
      return MISI_A;
  }
};
