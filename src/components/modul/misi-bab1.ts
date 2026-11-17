/**
 * Misi dan tantangan bebas Bab 1 (Bilangan 0 sampai 10). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas1.mjs.
 *
 * Simulasi bertahap: satu Laboratorium Bilangan yang membuka perwakilan sedikit demi sedikit
 * (A: benda; B: + bingkai sepuluh, garis bilangan, bandingkan; C: + tab Katak; D: + pasangan bilangan
 * dan tab Kasir Warung, sekaligus simulasi pencapaian misi bab ini).
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanKamar } from "./lemari-k1b1a/logika";
import type { KeadaanHadiah } from "./banding-k1b1b/logika";
import type { KeadaanLoteng } from "./loteng-k1b1c/logika";

export type KeadaanBilangan = {
  alat: "bilangan";
  n: number;
  m: number;
  /** Bagian merah yang sudah dibatasi 0 sampai n (sama dengan yang tampil di pasangan bilangan). */
  a: number;
  /** Perwakilan yang benar-benar tampil (sudah diajarkan dan sedang menyala). */
  benda: boolean;
  bingkai: boolean;
  garis: boolean;
  pasangan: boolean;
  banding: boolean;
};

export type KeadaanBab1 = KeadaanBilangan | KeadaanSelesai | KeadaanKamar | KeadaanHadiah | KeadaanLoteng;

const bil = (k: KeadaanBab1): k is KeadaanBilangan => k.alat === "bilangan";
const selesai = (k: KeadaanBab1, id: string) => k.alat === "selesai" && k.id === id;

/** Sub-Bab A: Misi Rumah Rapi bagian satu, kamar Kaka (Simulasi "Merapikan Lemari Mainan Igil"). Robot 6, yoyo 2, kelereng 8, pesawat 0. */
const kamar = (k: KeadaanBab1): k is KeadaanKamar => k.alat === "kamar";
const diRakSemua = (k: KeadaanKamar, j: string) => k.mainan.filter((m) => m.jenis === j).every((m) => m.tempat === j);
const banyak = (k: KeadaanKamar, j: string) => k.mainan.filter((m) => m.jenis === j).length;
export const MISI_A: DefMisi<KeadaanBab1>[] = [
  { id: "a-rak", teks: "Pisahkan semua mainan ke rak yang sejenis.", wajib: true, cek: (k) => kamar(k) && k.mainan.every((m) => m.tempat === m.jenis) },
  { id: "a-robot", teks: "Taruh semua robot di raknya, lalu tekan Hitung. Dengar angka terakhir.", wajib: true, cek: (k) => kamar(k) && diRakSemua(k, "robot") && k.dihitung.includes("robot") },
  { id: "a-laci", teks: "Isi laci sepuluh kotak dengan semua kelereng.", wajib: true, cek: (k) => kamar(k) && banyak(k, "kelereng") > 0 && diRakSemua(k, "kelereng") },
  { id: "a-catat", teks: "Catat banyak tiap mainan di tabel Kaka. Pesawat tidak ada: nol.", wajib: true, cek: (k) => kamar(k) && k.mainan.every((m) => m.tempat === m.jenis) && Object.keys(k.catat).every((j) => k.catat[j] === banyak(k, j)) },
  { id: "a-sekilas", teks: "Tekan Sekilas di rak yoyo. Tebak tanpa menghitung.", wajib: false, cek: (k) => kamar(k) && k.sekilas.includes("yoyo") },
  { id: "a-kosong", teks: "Tekan Hitung di rak pesawat. Kotak kosong, banyaknya nol.", wajib: false, cek: (k) => kamar(k) && k.dihitung.includes("pesawat") },
];

/** Sub-Bab B: Misi Hadiah Nenek bagian satu, gudang hadiah (Simulasi "Hadiah Nenek untuk Rak yang Lebih Sedikit"). Robot 2, yoyo 7, kotak 6. */
const gudang = (k: KeadaanBab1): k is KeadaanHadiah => k.alat === "hadiah";
export const MISI_B: DefMisi<KeadaanBab1>[] = [
  { id: "b-pasang", teks: "Tekan Pasangkan saat kedua rak berbeda. Lihat yang bersisa.", wajib: true, cek: (k) => gudang(k) && k.dipasang && k.igil !== k.kaka },
  { id: "b-sama", teks: "Bagi hadiah Nenek sampai kedua rak sama banyak.", wajib: true, cek: (k) => gudang(k) && k.dipakai > 0 && k.igil === k.kaka },
  { id: "b-satu", teks: "Buat rak Igil satu lebih banyak dari rak Kaka.", wajib: true, cek: (k) => gudang(k) && k.igil === k.kaka + 1 },
  { id: "b-bingkai", teks: "Lihat lewat bingkai sepuluh saat rak Kaka lebih banyak.", wajib: true, cek: (k) => gudang(k) && k.tampil === "bingkai" && k.kaka > k.igil },
  { id: "b-nol", teks: "Kosongkan rak Igil. Nol paling sedikit.", wajib: false, cek: (k) => gudang(k) && k.igil === 0 },
  { id: "b-garis", teks: "Lihat garis bilangan saat rak Igil lebih kanan.", wajib: false, cek: (k) => gudang(k) && k.tampil === "garis" && k.igil > k.kaka },
];

/** Sub-Bab C: Misi Gudang Loteng bagian satu, tangga loteng (Simulasi "Tangga Gudang Loteng"). Kardus tanpa nomor: empat dan sembilan. */
const loteng = (k: KeadaanBab1): k is KeadaanLoteng => k.alat === "loteng";
export const MISI_C: DefMisi<KeadaanBab1>[] = [
  { id: "c-naik", teks: "Bawa Igil naik sampai anak tangga paling atas sambil menghitung maju.", wajib: true, cek: (k) => loteng(k) && k.puncak },
  { id: "c-turun", teks: "Bawa Igil turun lagi sampai lantai sambil menghitung mundur.", wajib: true, cek: (k) => loteng(k) && k.turun },
  { id: "c-susun", teks: "Susun semua kardus bernomor di rak loteng.", wajib: true, cek: (k) => loteng(k) && k.kardus.filter((x) => x.bernomor).every((x) => x.tempat === x.nomor) },
  { id: "c-hilang", teks: "Lengkapi kardus tanpa nomor di tempat nomor yang hilang.", wajib: true, cek: (k) => loteng(k) && k.kardus.filter((x) => !x.bernomor).every((x) => x.tempat === x.nomor) },
  { id: "c-baca", teks: "Baca rak mundur dari kanan.", wajib: false, cek: (k) => loteng(k) && k.bacaMundur },
  { id: "c-sesudah", teks: "Berhenti di anak tangga sesudah tujuh.", wajib: false, cek: (k) => loteng(k) && k.pos === 8 },
];

/** Sub-Bab D (sub-bab akhir): pasangan bilangan, sekaligus pencapaian misi bab ini. */
export const MISI_D: DefMisi<KeadaanBab1>[] = [
  { id: "d-sepuluh", teks: "Pecah bilangan 10 menjadi 6 dan 4 dengan Bagian merah.", wajib: true, cek: (k) => bil(k) && k.pasangan && k.n === 10 && k.a === 6 },
  { id: "d-sama", teks: "Bagi bilangan 8 menjadi dua bagian sama banyak: 4 dan 4.", wajib: true, cek: (k) => bil(k) && k.pasangan && k.n === 8 && k.a === 4 },
  { id: "d-nol", teks: "Pecah bilangan 7 dengan Bagian merah 0. Lihat pasangannya.", wajib: true, cek: (k) => bil(k) && k.pasangan && k.n === 7 && k.a === 0 },
  { id: "d-kasir", teks: "Selesaikan skenario Kasir Warung sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, "kasir") },
  { id: "d-ingat-banding", teks: "Ingat Sub-Bab B: buat dua bilangan sama banyak.", wajib: false, cek: (k) => bil(k) && k.banding && k.n === k.m },
  { id: "d-ingat-katak", teks: "Ingat Sub-Bab C: antar Katak sampai selesai.", wajib: false, cek: (k) => selesai(k, "katak") },
];

export const daftarMisiBab1 = (sub: string): DefMisi<KeadaanBab1>[] => (sub === "B" ? MISI_B : sub === "C" ? MISI_C : sub === "D" ? MISI_D : MISI_A);
