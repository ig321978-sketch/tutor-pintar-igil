/**
 * Misi dan tantangan bebas Kelas 5 Bab 2 (KPK dan FPB, tema Pasar Kuliner Malam). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k5b2.mjs.
 *
 * Tiap Sub-Bab satu simulasi sendiri (folder Sub-Bab).
 * KERANGKA: agen tiap Sub-Bab mengganti MISI_X (kosong) dan menyesuaikan tipe keadaannya di union KeadaanK5Bab2.
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi } from "./misi-simulasi";

import type { KeadaanLonceng } from "./lonceng-k5b2a/logika";
import type { KeadaanJadwal } from "./jadwal-k5b2b/logika";
import type { KeadaanPiring } from "./piring-k5b2c/logika";
import type { KeadaanKotak } from "./kotak-k5b2d/logika";
import type { KeadaanPapan } from "./papan-k5b2e/logika";

export type KeadaanK5Bab2 = { alat: "kerangka" } | KeadaanLonceng | KeadaanJadwal | KeadaanPiring | KeadaanKotak | KeadaanPapan;

/** Sub-Bab A: Lompat Lonceng. Empat misi wajib dan dua tantangan bebas, id berawalan a-, tanpa skor. Diuji di scripts/uji-lonceng-k5b2a.mjs. */
const lonceng = (k: KeadaanK5Bab2): k is KeadaanLonceng => k.alat === "lonceng";
export const MISI_A: DefMisi<KeadaanK5Bab2>[] = [
  { id: "a-lompat", teks: "Lompat dengan jarak yang sama sampai batas, lalu tekan Periksa.", wajib: true, cek: (k) => lonceng(k) && k.lompatBenar.length >= 1 },
  { id: "a-warnai", teks: "Warnai semua kelipatan pada tabel bilangan, lalu tekan Periksa.", wajib: true, cek: (k) => lonceng(k) && k.warnaiBenar.length >= 1 },
  { id: "a-cek", teks: "Kurangi dengan pembagi sampai sisa lebih kecil, pilih kelipatan atau bukan, lalu tekan Periksa.", wajib: true, cek: (k) => lonceng(k) && k.cekBenar.length >= 1 },
  { id: "a-kali", teks: "Atur pengali sampai hasil kali sama dengan sasaran, lalu tekan Periksa.", wajib: true, cek: (k) => lonceng(k) && k.kaliBenar.length >= 1 },
  { id: "a-tolak", teks: "Pilih pengali nol pada alat Kali, tekan Periksa, dan lihat alat menolak.", wajib: false, cek: (k) => lonceng(k) && k.tolak },
  { id: "a-dua", teks: "Warnai dua tabel bilangan dengan benar tanpa terhenti.", wajib: false, cek: (k) => lonceng(k) && k.warnaiBenar.length >= 2 },
];

/** Sub-Bab B: Dua Lonceng. Empat misi wajib dan dua tantangan bebas, id berawalan b-, tanpa skor. Diuji di scripts/uji-jadwal-k5b2b.mjs. */
const jadwal = (k: KeadaanK5Bab2): k is KeadaanJadwal => k.alat === "jadwal";
export const MISI_B: DefMisi<KeadaanK5Bab2>[] = [
  { id: "b-daftar", teks: "Lingkari semua bilangan yang ada di kedua daftar kelipatan, lalu tekan Periksa.", wajib: true, cek: (k) => jadwal(k) && k.daftarBenar.length >= 1 },
  { id: "b-kpk", teks: "Atur kelipatan sampai menjadi KPK dari dua bilangan, lalu tekan Periksa.", wajib: true, cek: (k) => jadwal(k) && k.kpkBenar.length >= 1 },
  { id: "b-jadwal", teks: "Majukan waktu, lalu tekan Bersama saat kedua lonceng berbunyi untuk pertama kali.", wajib: true, cek: (k) => jadwal(k) && k.jadwalBenar.length >= 1 },
  { id: "b-tiga", teks: "Pilih kelipatan persekutuan terkecil dari tiga bilangan, lalu tekan Periksa.", wajib: true, cek: (k) => jadwal(k) && k.tigaBenar.length >= 1 },
  { id: "b-tolak", teks: "Lingkari bilangan yang hanya ada di satu daftar pada alat Daftar, dan lihat alat menolak.", wajib: false, cek: (k) => jadwal(k) && k.tolakDaftar },
  { id: "b-dua", teks: "Cari KPK dua pasang bilangan pada alat KPK tanpa terhenti.", wajib: false, cek: (k) => jadwal(k) && k.kpkBenar.length >= 2 },
];

/** Sub-Bab C: Tata Piring. Empat misi wajib dan dua tantangan bebas, id berawalan c-, tanpa skor. Diuji di scripts/uji-piring-k5b2c.mjs. */
const piring = (k: KeadaanK5Bab2): k is KeadaanPiring => k.alat === "piring";
export const MISI_C: DefMisi<KeadaanK5Bab2>[] = [
  { id: "c-tata", teks: "Tata klepon ke piring sampai semua cara yang habis dibagi tercatat, lalu tekan Periksa.", wajib: true, cek: (k) => piring(k) && k.tataBenar.length >= 1 },
  { id: "c-pasang", teks: "Pasangkan kartu faktor yang hasil kalinya sama dengan bilangan di papan sampai semuanya berpasangan.", wajib: true, cek: (k) => piring(k) && k.pasangBenar.length >= 1 },
  { id: "c-cek", teks: "Isi sisa pembagian klepon sesuai bilangan di papan, lalu tekan Periksa.", wajib: true, cek: (k) => piring(k) && k.cekBenar.length >= 1 },
  { id: "c-daftar", teks: "Pilih semua kartu yang menjadi faktor bilangan di papan, lalu tekan Periksa.", wajib: true, cek: (k) => piring(k) && k.daftarBenar.length >= 1 },
  { id: "c-tolak", teks: "Atur isi piring yang menyisakan klepon pada alat Tata, dan lihat alat menolak.", wajib: false, cek: (k) => piring(k) && k.tolak },
  { id: "c-dua", teks: "Temukan semua faktor dari dua bilangan pada alat Tata tanpa terhenti.", wajib: false, cek: (k) => piring(k) && k.tataBenar.length >= 2 },
];

/** Sub-Bab D: Isi Kotak. Empat misi wajib dan dua tantangan bebas, id berawalan d-, tanpa skor. Diuji di scripts/uji-kotak-k5b2d.mjs. */
const kotak = (k: KeadaanK5Bab2): k is KeadaanKotak => k.alat === "kotak";
export const MISI_D: DefMisi<KeadaanK5Bab2>[] = [
  { id: "d-congklak", teks: "Tandai semua lubang congklak yang berisi dua biji, lalu tekan Periksa.", wajib: true, cek: (k) => kotak(k) && k.congBenar.length >= 1 },
  { id: "d-kotak", teks: "Atur banyak kotak untuk dua jenis kue sampai sebanyak-banyaknya, lalu tekan Periksa.", wajib: true, cek: (k) => kotak(k) && k.kotakBenar.length >= 1 },
  { id: "d-tiga", teks: "Atur banyak kotak untuk tiga jenis kue sampai sebanyak-banyaknya, lalu tekan Periksa.", wajib: true, cek: (k) => kotak(k) && k.tigaBenar.length >= 1 },
  { id: "d-besar", teks: "Pilih faktor persekutuan yang paling besar sebagai FPB, lalu tekan Periksa.", wajib: true, cek: (k) => kotak(k) && k.besarBenar.length >= 1 },
  { id: "d-tolak", teks: "Tekan Periksa kotak saat masih ada kue bersisa, dan lihat alat menolak.", wajib: false, cek: (k) => kotak(k) && k.tolakKotak },
  { id: "d-dua", teks: "Selesaikan dua sasaran dua jenis kue dengan benar tanpa terhenti.", wajib: false, cek: (k) => kotak(k) && k.kotakBenar.length >= 2 },
];

/** Sub-Bab E: Pohon Papan. Empat misi wajib dan dua tantangan bebas, id berawalan e-, tanpa skor. Diuji di scripts/uji-papan-k5b2e.mjs. */
const papan = (k: KeadaanK5Bab2): k is KeadaanPapan => k.alat === "papan";
export const MISI_E: DefMisi<KeadaanK5Bab2>[] = [
  { id: "e-saring", teks: "Hapus satu dan ambil bilangan prima berurutan sampai tabel tersaring, lalu tekan Periksa.", wajib: true, cek: (k) => papan(k) && k.saringBenar.length >= 1 },
  { id: "e-pohon", teks: "Pecah bilangan dengan pembagi prima sampai semua daun prima, lalu tekan Periksa.", wajib: true, cek: (k) => papan(k) && k.pohonBenar.length >= 1 },
  { id: "e-gabung", teks: "Pasangkan prima yang sama pada dua faktorisasi, lalu tekan Periksa.", wajib: true, cek: (k) => papan(k) && k.gabungBenar.length >= 1 },
  { id: "e-bagi", teks: "Bagi dua atau tiga bilangan dengan prima berulang sampai semuanya satu.", wajib: true, cek: (k) => papan(k) && k.bagiBenar.length >= 1 },
  { id: "e-tolak", teks: "Ketuk bilangan yang sudah terhapus pada alat Saring, dan lihat alat menolak.", wajib: false, cek: (k) => papan(k) && k.tolakHapus },
  { id: "e-dua", teks: "Selesaikan dua pohon faktor dengan benar tanpa terhenti.", wajib: false, cek: (k) => papan(k) && k.pohonBenar.length >= 2 },
];

export const daftarMisiK5Bab2 = (sub: string): DefMisi<KeadaanK5Bab2>[] => {
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
