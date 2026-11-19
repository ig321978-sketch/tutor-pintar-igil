/**
 * Misi dan tantangan bebas Kelas 3 Bab 3 (Pengukuran Panjang dan Berat, tema Kebun Binatang Mini). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k3b3.mjs.
 *
 * Tiap Sub-Bab satu simulasi sendiri (folder Sub-Bab): A Meja Ukur, B Bengkel Pita, C Gudang Timbang, D Meja Bandul.
 * KERANGKA: agen tiap Sub-Bab mengganti MISI_X (kosong) dan menyesuaikan tipe keadaannya di union KeadaanK3Bab3.
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi } from "./misi-simulasi";

import type { KeadaanUkur } from "./ukur-k3b3a/logika";
import type { KeadaanPita } from "./pita-k3b3b/logika";
import type { KeadaanTimbang } from "./timbang-k3b3c/logika";
import type { KeadaanBandul } from "./bandul-k3b3d/logika";

export type KeadaanK3Bab3 = { alat: "kerangka" } | KeadaanUkur | KeadaanPita | KeadaanTimbang | KeadaanBandul;

/** Sub-Bab A: Meja Ukur. Empat misi wajib dan dua tantangan bebas, id berawalan a-, tanpa skor. Diuji di scripts/uji-ukur-k3b3a.mjs. */
const ukur = (k: KeadaanK3Bab3): k is KeadaanUkur => k.alat === "ukur";
export const MISI_A: DefMisi<KeadaanK3Bab3>[] = [
  { id: "a-geser", teks: "Geser benda sampai ujung kirinya tepat di angka nol, baca panjangnya, lalu tekan Periksa.", wajib: true, cek: (k) => ukur(k) && k.geserBenar.length >= 1 },
  { id: "a-baca", teks: "Tulis hasil ukur dengan satuan yang tepat, lalu tekan Periksa.", wajib: true, cek: (k) => ukur(k) && k.bacaBenar.length >= 1 },
  { id: "a-alat", teks: "Pilih penggaris atau meteran yang tepat untuk satu benda, lalu tekan Periksa.", wajib: true, cek: (k) => ukur(k) && k.alatBenar.length >= 1 },
  { id: "a-selisih", teks: "Cari selisih panjang dua batang dengan mengurangkan, lalu tekan Periksa.", wajib: true, cek: (k) => ukur(k) && k.selisihBenar.length >= 1 },
  { id: "a-tolak", teks: "Coba baca panjang saat ujung benda belum di angka nol, dan lihat alat menolak.", wajib: false, cek: (k) => ukur(k) && k.tolak },
  { id: "a-tiga", teks: "Ukur tiga benda berbeda dengan menggesernya ke angka nol sampai semuanya tepat.", wajib: false, cek: (k) => ukur(k) && k.geserBenar.length >= 3 },
];

/** Sub-Bab B: Bengkel Pita. Empat misi wajib dan dua tantangan bebas, id berawalan b-, tanpa skor. Diuji di scripts/uji-pita-k3b3b.mjs. */
const pita = (k: KeadaanK3Bab3): k is KeadaanPita => k.alat === "pita";
export const MISI_B: DefMisi<KeadaanK3Bab3>[] = [
  { id: "b-tukar", teks: "Tukar potongan pita sepuluh-ke-satu sampai paling sedikit potongan, lalu tekan Periksa.", wajib: true, cek: (k) => pita(k) && k.tukarBenar.length >= 1 },
  { id: "b-ubah", teks: "Ubah satu ukuran dari meter ke sentimeter atau sebaliknya, lalu tekan Periksa.", wajib: true, cek: (k) => pita(k) && k.ubahBenar.length >= 1 },
  { id: "b-gabung", teks: "Tulis satu ukuran sentimeter dengan meter dan sentimeter bersama, lalu tekan Periksa.", wajib: true, cek: (k) => pita(k) && k.gabungBenar.length >= 1 },
  { id: "b-sambung", teks: "Sambung atau potong pita dengan menghitung meter dan sentimeter sendiri-sendiri, lalu tekan Periksa.", wajib: true, cek: (k) => pita(k) && k.sambungBenar.length >= 1 },
  { id: "b-banding", teks: "Pilih pita yang paling panjang untuk dua kumpulan pita, lalu tekan Periksa.", wajib: false, cek: (k) => pita(k) && k.bandingBenar.length >= 2 },
  { id: "b-lengkap", teks: "Ubah tiga ukuran berbeda sampai semuanya tepat.", wajib: false, cek: (k) => pita(k) && k.ubahBenar.length >= 3 },
];

/** Sub-Bab C: Gudang Timbang. Empat misi wajib dan dua tantangan bebas, id berawalan c-, tanpa skor. Diuji di scripts/uji-timbang-k3b3c.mjs. */
const timbang = (k: KeadaanK3Bab3): k is KeadaanTimbang => k.alat === "timbang";
export const MISI_C: DefMisi<KeadaanK3Bab3>[] = [
  { id: "c-nol", teks: "Setel jarum timbangan duduk dan layar timbangan digital sampai tepat di nol.", wajib: true, cek: (k) => timbang(k) && k.nolJarum && k.nolLayar },
  { id: "c-baca", teks: "Letakkan benda di timbangan, baca beratnya, lalu pilih ukuran dengan satuan yang tepat.", wajib: true, cek: (k) => timbang(k) && k.bacaBenar.length >= 1 },
  { id: "c-pilih", teks: "Pilih jenis timbangan dan satuan yang tepat untuk satu benda, lalu tekan Periksa.", wajib: true, cek: (k) => timbang(k) && k.pilihBenar.length >= 1 },
  { id: "c-selisih", teks: "Cari selisih dua berat dengan mengurangkan yang besar dengan yang kecil, lalu tekan Periksa.", wajib: true, cek: (k) => timbang(k) && k.selisihBenar.length >= 1 },
  { id: "c-tolak", teks: "Coba menimbang saat jarum atau layar belum di nol, dan lihat alat menolak.", wajib: false, cek: (k) => timbang(k) && k.menolak >= 1 },
  { id: "c-dua", teks: "Timbang satu benda ringan dengan gram dan satu benda berat dengan kilogram.", wajib: false, cek: (k) => timbang(k) && k.ringanBenar && k.beratBenar },
];

/** Sub-Bab D: Meja Bandul. Empat misi wajib dan dua tantangan bebas, id berawalan d-, tanpa skor. Diuji di scripts/uji-bandul-k3b3d.mjs. */
const bandul = (k: KeadaanK3Bab3): k is KeadaanBandul => k.alat === "bandul";
export const MISI_D: DefMisi<KeadaanK3Bab3>[] = [
  { id: "d-rakit", teks: "Pasang bandul sampai timbangan seimbang dengan berat benda, lalu tekan Periksa.", wajib: true, cek: (k) => bandul(k) && k.rakitBenar.length >= 1 },
  { id: "d-kgg", teks: "Ubah kilogram ke gram dengan dikalikan seribu, lalu tekan Periksa.", wajib: true, cek: (k) => bandul(k) && k.kggBenar.length >= 1 },
  { id: "d-gkg", teks: "Ubah gram ke kilogram dan gram dengan mengambil tiap seribu gram, lalu tekan Periksa.", wajib: true, cek: (k) => bandul(k) && k.gkgBenar.length >= 1 },
  { id: "d-jumlah", teks: "Jumlahkan dua berat dengan mengubahnya ke gram dulu, lalu tekan Periksa.", wajib: true, cek: (k) => bandul(k) && k.jumlahBenar.length >= 1 },
  { id: "d-kurang", teks: "Kurangkan dua berat sampai hasilnya tepat, lalu tekan Periksa.", wajib: false, cek: (k) => bandul(k) && k.kurangBenar.length >= 1 },
  { id: "d-lengkap", teks: "Rakit bandul untuk tiga benda sampai semuanya seimbang.", wajib: false, cek: (k) => bandul(k) && k.rakitBenar.length >= 3 },
];

export const daftarMisiK3Bab3 = (sub: string): DefMisi<KeadaanK3Bab3>[] =>
  sub === "B" ? MISI_B : sub === "C" ? MISI_C : sub === "D" ? MISI_D : MISI_A;
