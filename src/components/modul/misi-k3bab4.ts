/**
 * Misi dan tantangan bebas Kelas 3 Bab 4 (Unsur-Unsur Bangun Datar, tema Festival Layang-layang Kampung). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k3b4.mjs.
 *
 * Tiap Sub-Bab satu simulasi sendiri (folder Sub-Bab): A Meja Bilah, B Lapangan Sudut, C Lintasan Lomba.
 * KERANGKA: agen tiap Sub-Bab mengganti MISI_X (kosong) dan menyesuaikan tipe keadaannya di union KeadaanK3Bab4.
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi } from "./misi-simulasi";

import type { KeadaanBilah } from "./bilah-k3b4a/logika";
import type { KeadaanSudut } from "./sudut-k3b4b/logika";
import type { KeadaanLintasan } from "./lintasan-k3b4c/logika";

export type KeadaanK3Bab4 = { alat: "kerangka" } | KeadaanBilah | KeadaanSudut | KeadaanLintasan;

/** Sub-Bab A: Meja Bilah. Empat misi wajib dan dua tantangan bebas, id berawalan a-, tanpa skor. Diuji di scripts/uji-bilah-k3b4a.mjs. */
const bilah = (k: KeadaanK3Bab4): k is KeadaanBilah => k.alat === "bilah";
export const MISI_A: DefMisi<KeadaanK3Bab4>[] = [
  { id: "a-kenali", teks: "Tarik ujung gambar, lalu pilih nama jenis garisnya dan tekan Periksa.", wajib: true, cek: (k) => bilah(k) && k.kenaliBenar.length >= 1 },
  { id: "a-ukur", teks: "Geser bilah sampai ujung kirinya tepat di angka nol, baca panjangnya, lalu tekan Periksa.", wajib: true, cek: (k) => bilah(k) && k.ukurBenar.length >= 1 },
  { id: "a-ubah", teks: "Tulis satu ukuran dalam milimeter atau sentimeter desimal, lalu tekan Periksa.", wajib: true, cek: (k) => bilah(k) && k.ubahBenar.length >= 1 },
  { id: "a-sisi", teks: "Beri huruf pada titik sudut bangun, hitung sisinya, lalu tekan Periksa.", wajib: true, cek: (k) => bilah(k) && k.sisiBenar.length >= 1 },
  { id: "a-jalan", teks: "Pilih benang yang paling pendek antara dua paku, lalu tekan Periksa.", wajib: false, cek: (k) => bilah(k) && k.jalanBenar.length >= 1 },
  { id: "a-tolak", teks: "Coba baca panjang saat ujung bilah belum di angka nol, dan lihat alat menolak.", wajib: false, cek: (k) => bilah(k) && k.tolak },
];

/** Sub-Bab B: Lapangan Sudut. Empat misi wajib dan dua tantangan bebas, id berawalan b-, tanpa skor. Diuji di scripts/uji-sudut-k3b4b.mjs. */
const sudut = (k: KeadaanK3Bab4): k is KeadaanSudut => k.alat === "sudut";
export const MISI_B: DefMisi<KeadaanK3Bab4>[] = [
  { id: "b-putar", teks: "Putar kaki sudut dan bandingkan dengan pojok kertas sampai sudut sasaran ditemukan, lalu tekan Periksa.", wajib: true, cek: (k) => sudut(k) && k.putarBenar.length >= 1 },
  { id: "b-busur", teks: "Pasang busur dengan titik tengah di titik sudut dan garis nol di kaki pertama, baca derajatnya, lalu tekan Periksa.", wajib: true, cek: (k) => sudut(k) && k.busurBenar.length >= 1 },
  { id: "b-jenis", teks: "Pilih jenis satu sudut dengan membandingkannya dengan pojok kertas, lalu tekan Periksa.", wajib: true, cek: (k) => sudut(k) && k.jenisBenar.length >= 1 },
  { id: "b-pasang", teks: "Cari pasangan satu sudut refleks sampai jumlahnya satu putaran penuh, lalu tekan Periksa.", wajib: true, cek: (k) => sudut(k) && k.pasangBenar.length >= 1 },
  { id: "b-tolak", teks: "Coba membaca sudut saat busur belum terpasang benar, dan lihat alat menolak.", wajib: false, cek: (k) => sudut(k) && k.tolak },
  { id: "b-tiga", teks: "Temukan tiga jenis sudut berbeda dengan memutar kaki sudut sampai semuanya tepat.", wajib: false, cek: (k) => sudut(k) && k.putarBenar.length >= 3 },
];

/** Sub-Bab C: Lintasan Lomba. Empat misi wajib dan dua tantangan bebas, id berawalan c-, tanpa skor. Diuji di scripts/uji-lintasan-k3b4c.mjs. */
const lintasan = (k: KeadaanK3Bab4): k is KeadaanLintasan => k.alat === "lintasan";
export const MISI_C: DefMisi<KeadaanK3Bab4>[] = [
  { id: "c-tegak", teks: "Putar tali sampai tegak lurus dengan tali lain, cocokkan dengan pojok kertas, lalu tekan Periksa.", wajib: true, cek: (k) => lintasan(k) && k.tegakBenar.length >= 1 },
  { id: "c-sejajar", teks: "Geser ujung tali sampai jarak kedua ujung sama pada kertas petak, lalu tekan Periksa.", wajib: true, cek: (k) => lintasan(k) && k.sejajarBenar.length >= 1 },
  { id: "c-tanda", teks: "Tandai sepasang tali sebagai tegak lurus, sejajar, atau bukan keduanya, lalu tekan Periksa.", wajib: true, cek: (k) => lintasan(k) && k.tandaBenar.length >= 1 },
  { id: "c-bangun", teks: "Rakit satu bangun dari batang dan sebut namanya, lalu tekan Periksa.", wajib: true, cek: (k) => lintasan(k) && k.bangunBenar.length >= 1 },
  { id: "c-tolak", teks: "Coba memeriksa sebelum pojok kertas dipasang atau jarak diukur, dan lihat alat menolak.", wajib: false, cek: (k) => lintasan(k) && k.menolak >= 1 },
  { id: "c-semua", teks: "Tandai tiga pasang tali dengan benar dan rakit tiga bangun sampai semuanya tepat.", wajib: false, cek: (k) => lintasan(k) && k.tandaBenar.length >= 3 && k.bangunBenar.length >= 3 },
];

export const daftarMisiK3Bab4 = (sub: string): DefMisi<KeadaanK3Bab4>[] =>
  sub === "B" ? MISI_B : sub === "C" ? MISI_C : MISI_A;
