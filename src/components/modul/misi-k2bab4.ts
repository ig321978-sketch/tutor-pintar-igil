/**
 * Misi dan tantangan bebas Kelas 2 Bab 4 (Posisi Benda dan Pola di Sekitar Kita, tema Pameran Kerajinan Sekolah). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas2.mjs.
 *
 * Sub-Bab A memakai Simulasi Rak Pameran (rak-k2b4a), Sub-Bab B (akhir bab) Meja Rangkai (hias-k2b4b).
 * KERANGKA: agen tiap Sub-Bab mengganti MISI_A / MISI_B dan menambah tipe keadaannya ke union KeadaanK2Bab4.
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi } from "./misi-simulasi";

import type { KeadaanRak } from "./rak-k2b4a/logika";
import type { KeadaanMeja } from "./hias-k2b4b/logika";

export type KeadaanK2Bab4 = { alat: "kerangka" } | KeadaanRak | KeadaanMeja;

/**
 * Sub-Bab A (awal cerita Pameran Kerajinan Sekolah): Misi Rak Pameran, Simulasi Rak Pameran (rak-k2b4a). Enam karya di baki sama dengan BENDA_SIM di
 * rak-k2b4a/data-peta.ts (payung kertas, topi anyaman, bunga kertas, keranjang, layang-layang, lonceng), berbeda dari Story. Diuji di scripts/uji-rak-k2b4a.mjs.
 */
const rak = (k: KeadaanK2Bab4): k is KeadaanRak => k.alat === "rak";
export const MISI_A: DefMisi<KeadaanK2Bab4>[] = [
  { id: "a-taruh", teks: "Taruh tiga karya di petak rak yang sesuai dengan kartu denah.", wajib: true, cek: (k) => rak(k) && k.terpasang.length >= 3 },
  { id: "a-lawan", teks: "Setelah menaruh satu karya, lihat kalimat lawan dari kartu denahnya.", wajib: true, cek: (k) => rak(k) && k.lawanLihat.length >= 1 },
  { id: "a-kanankiri", teks: "Ketuk benda di sebelah kanan dan di sebelah kiri sebuah acuan, dilihat dari posisi pembaca.", wajib: true, cek: (k) => rak(k) && k.kananBenar >= 1 && k.kiriBenar >= 1 },
  { id: "a-gabung", teks: "Selesaikan satu teka-teki: gabungkan dua petunjuk sampai tinggal satu benda.", wajib: true, cek: (k) => rak(k) && k.gabung.length >= 1 },
  { id: "a-semua", teks: "Taruh semua karya di petaknya sampai rak terisi penuh.", wajib: false, cek: (k) => rak(k) && k.terpasang.length >= 6 },
  { id: "a-teka", teks: "Selesaikan ketiga teka-teki gabungan petunjuk.", wajib: false, cek: (k) => rak(k) && k.gabung.length >= 3 },
];

/**
 * Sub-Bab B (akhir bab, pencapaian misi bab ini): Misi Meja Rangkai, Simulasi Meja Rangkai (hias-k2b4b). Pita manik berwarna ungu, hijau, kuning, cokelat dan
 * enam kartu pita (kalung, gelang, bando, taplak, tirai, ikat pinggang) berbeda dari Story. Diuji di scripts/uji-hias-k2b4b.mjs.
 */
const meja = (k: KeadaanK2Bab4): k is KeadaanMeja => k.alat === "meja";
export const MISI_B: DefMisi<KeadaanK2Bab4>[] = [
  { id: "b-rangkai", teks: "Rangkai pita dari manik berwarna, lalu periksa sampai pita dinyatakan pola.", wajib: true, cek: (k) => meja(k) && k.polaPita.length >= 1 },
  { id: "b-irama", teks: "Ketuk irama dari bunyi keras, pelan, atau diam, lalu periksa sampai dinyatakan pola.", wajib: true, cek: (k) => meja(k) && k.polaIrama.length >= 1 },
  { id: "b-putus", teks: "Pilih kartu pita, lalu putuskan pola atau bukan pola untuk dua kartu yang berbeda.", wajib: true, cek: (k) => meja(k) && k.diputuskan.length >= 2 },
  { id: "b-satuan", teks: "Tandai satuan pola pada satu kartu pita dengan tepat.", wajib: true, cek: (k) => meja(k) && k.satuanDitandai.length >= 1 },
  { id: "b-lanjut", teks: "Lanjutkan satu kartu pita dengan unsur berikutnya yang tepat.", wajib: false, cek: (k) => meja(k) && k.dilanjut.length >= 1 },
  { id: "b-dua", teks: "Rangkai dua pola pita yang satuannya berbeda, lalu periksa keduanya.", wajib: false, cek: (k) => meja(k) && k.polaPita.length >= 2 },
];

export const daftarMisiK2Bab4 = (sub: string): DefMisi<KeadaanK2Bab4>[] => (sub === "B" ? MISI_B : MISI_A);
