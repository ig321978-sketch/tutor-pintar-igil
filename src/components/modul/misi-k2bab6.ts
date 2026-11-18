/**
 * Misi dan tantangan bebas Kelas 2 Bab 6 (Pengukuran: Berat dan Waktu, tema Hari Olahraga Sekolah). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas2.mjs.
 *
 * Sub-Bab A memakai Simulasi Pos Timbang (timbang-k2b6a), Sub-Bab B (akhir bab) Pos Waktu (jadwal-k2b6b).
 * KERANGKA: agen tiap Sub-Bab mengganti MISI_A / MISI_B dan menambah tipe keadaannya ke union KeadaanK2Bab6.
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi } from "./misi-simulasi";

import type { KeadaanTimbang } from "./timbang-k2b6a/logika";
import type { KeadaanJadwal } from "./jadwal-k2b6b/logika";

export type KeadaanK2Bab6 = { alat: "kerangka" } | KeadaanTimbang | KeadaanJadwal;

/**
 * Sub-Bab A (awal cerita Hari Olahraga): Misi Pos Timbang, Simulasi Pos Timbang (timbang-k2b6a). Benda lomba (layang-layang, bulu tangkis, yoyo, sarung tinju, batu curling)
 * dan satuan (dadu, es batu) berbeda dari Story. Diuji di scripts/uji-timbang-k2b6a.mjs.
 */
const timbang = (k: KeadaanK2Bab6): k is KeadaanTimbang => k.alat === "timbang";
export const MISI_A: DefMisi<KeadaanK2Bab6>[] = [
  { id: "a-banding", teks: "Taruh dua benda di papan jungkat-jungkit, lalu lihat benda mana yang turun.", wajib: true, cek: (k) => timbang(k) && k.dibandingkan.length >= 1 },
  { id: "a-besar", teks: "Temukan benda besar yang ternyata lebih ringan daripada benda lain.", wajib: true, cek: (k) => timbang(k) && k.besarRingan },
  { id: "a-satuan", teks: "Timbang satu benda dengan satuan tidak baku sampai papan seimbang.", wajib: true, cek: (k) => timbang(k) && k.seimbang.length >= 1 },
  { id: "a-susun", teks: "Susun benda dari yang paling berat sampai yang paling ringan.", wajib: true, cek: (k) => timbang(k) && k.urutanBenar >= 1 },
  { id: "a-pasang", teks: "Bandingkan enam pasangan benda yang berbeda di papan jungkat-jungkit.", wajib: false, cek: (k) => timbang(k) && k.dibandingkan.length >= 6 },
  { id: "a-dua", teks: "Timbang satu benda dengan dua satuan berbeda, lalu catat kedua hasilnya di tabel.", wajib: false, cek: (k) => timbang(k) && [0, 1, 2, 3, 4].some((i) => k.tabel.includes(`${i}-0`) && k.tabel.includes(`${i}-1`)) },
];

/** Sub-Bab B (akhir bab, pencapaian misi bab ini): Misi Pos Waktu. Empat misi wajib dan dua tantangan bebas, tanpa skor. */
const jadwal = (k: KeadaanK2Bab6): k is KeadaanJadwal => k.alat === "jadwal";
export const MISI_B: DefMisi<KeadaanK2Bab6>[] = [
  { id: "b-jarum", teks: "Putar jarum pendek sampai jam dinding menunjukkan pukul tiga tepat.", wajib: true, cek: (k) => jadwal(k) && k.jamPernah.includes(3) },
  { id: "b-samakan", teks: "Samakan jam dinding dengan jam digital sampai keduanya menunjukkan waktu yang sama.", wajib: true, cek: (k) => jadwal(k) && k.sudahSama.length >= 1 },
  { id: "b-hari", teks: "Taruh satu kegiatan pada bagian hari yang tepat.", wajib: true, cek: (k) => jadwal(k) && k.hariBenar.length >= 1 },
  { id: "b-lama", teks: "Bandingkan lama dua kegiatan, lalu ketuk kegiatan yang lebih lama.", wajib: true, cek: (k) => jadwal(k) && k.lamaBenar.length >= 1 },
  { id: "b-selisih", teks: "Hitung lama satu kegiatan dengan mengisi kotak dari jam mulai sampai jam selesai.", wajib: false, cek: (k) => jadwal(k) && k.selBenar.length >= 1 },
  { id: "b-semua", teks: "Taruh keempat kegiatan pada bagian hari yang tepat.", wajib: false, cek: (k) => jadwal(k) && k.hariBenar.length >= 4 },
];

export const daftarMisiK2Bab6 = (sub: string): DefMisi<KeadaanK2Bab6>[] => (sub === "B" ? MISI_B : MISI_A);
