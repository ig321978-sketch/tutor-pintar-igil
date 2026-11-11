/**
 * Misi dan tantangan bebas Kelas 3 Bab 1 (Bilangan Cacah sampai 1.000). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k3b1.mjs.
 *
 * Simulasi bertahap per sub-bab (paling banyak tiga alat), tiap alat dipakai ulang dengan misi yang berbeda:
 *  A Bilangan dan Lambang           : Lab Papan Tempat + Mesin Baca-Tulis + skenario Tongkat Alfa.
 *  B Nilai Tempat                   : Lab Papan Tempat (+ Nilai) + Mesin Angka dan Nilai + skenario Tiga Kaleng.
 *  C Membandingkan dan Mengurutkan  : Lab Papan Tempat (+ Banding) + Lab Urut + skenario Jarak ke Sekolah.
 *  D Penjumlahan sampai 100         : Lab Susun (tambah) + Mesin Susun Tambah + skenario Alun-Alun.
 *  E Pengurangan sampai 100         : Lab Susun (kurang) + Mesin Susun Kurang + skenario Toko Pak Bandi.
 *  F Perkalian sampai 100           : Lab Kelompok (kali) + Mesin Kelompok + skenario Kebun Melati.
 *  G Pembagian sampai 100 (akhir)   : Lab Kelompok (kali dan bagi) + Mesin Bagikan Bergiliran + skenario Pencapaian Bab.
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanTempat } from "./lab-tempat-k3b1";
import type { KeadaanUrut } from "./lab-urut-k3b1";
import type { KeadaanSusun } from "./lab-susun-k3b1";
import type { KeadaanKel } from "./lab-kelompok-k3b1";

export type KeadaanK3Bab1 = KeadaanTempat | KeadaanUrut | KeadaanSusun | KeadaanKel | KeadaanSelesai;

const tempat = (k: KeadaanK3Bab1): k is KeadaanTempat => k.alat === "tempat";
const urut = (k: KeadaanK3Bab1): k is KeadaanUrut => k.alat === "urut";
const susun = (k: KeadaanK3Bab1): k is KeadaanSusun => k.alat === "susun";
const kel = (k: KeadaanK3Bab1): k is KeadaanKel => k.alat === "kelompok";
const selesai = (k: KeadaanK3Bab1, id: string) => k.alat === "selesai" && k.id === id;

/** Id yang dilaporkan alat bertipe skenario dan mesin saat tuntas (dipakai misi di bawah dan pembungkus React). */
export const ID_SKENARIO_K3B1 = {
  A: "tongkat-alfa",
  B: "kaleng-kartu",
  C: "jarak-sekolah",
  D: "alun-alun",
  E: "toko-bandi",
  F: "kebun-melati",
  G: "pencapaian-bab",
} as const;

export const ID_MESIN_K3B1 = {
  A: "mesin-baca",
  B: "mesin-nilai",
  D: "mesin-tambah",
  E: "mesin-kurang",
  F: "mesin-kali",
  G: "mesin-bagi",
} as const;

/** Dua bilangan tiga angka (paling sedikit 100) dibandingkan di Papan Tempat dengan Banding menyala. */
const bandingTiga = (k: KeadaanTempat) => k.banding && k.rapi && k.n >= 100 && k.m >= 100;

/** Sub-Bab A: membaca dan menulis bilangan tiga angka. */
export const MISI_A: DefMisi<KeadaanK3Bab1>[] = [
  {
    id: "a-160",
    teks: "Buat 160 di papan dan nyalakan Kata. Bacanya seratus enam puluh.",
    wajib: true,
    cek: (k) => tempat(k) && k.n === 160 && k.rapi && k.kata,
  },
  {
    id: "a-703",
    teks: "Buat 703 dan nyalakan Kata. Nol tidak disebut, tetapi tetap ditulis.",
    wajib: true,
    cek: (k) => tempat(k) && k.n === 703 && k.rapi && k.kata,
  },
  {
    id: "a-tukar",
    teks: "Tambah satuan sampai sepuluh, lalu tukar 10 satuan menjadi 1 puluhan.",
    wajib: true,
    cek: (k) => tempat(k) && k.tukarSP,
  },
  { id: "a-mesin", teks: "Selesaikan Mesin Baca-Tulis sampai semua bilangan diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K3B1.A) },
  { id: "a-skenario", teks: "Selesaikan skenario Tongkat Alfa sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K3B1.A) },
  {
    id: "a-900",
    teks: "Buat 900 dan nyalakan Kata. Dua tempat kosong, tetapi nol tetap ditulis.",
    wajib: false,
    cek: (k) => tempat(k) && k.n === 900 && k.rapi && k.kata,
  },
  {
    id: "a-garis",
    teks: "Buat 671 dan nyalakan Garis. Lihat letaknya di antara 600 dan 700.",
    wajib: false,
    cek: (k) => tempat(k) && k.n === 671 && k.rapi && k.garis,
  },
  {
    id: "a-999",
    teks: "Buat bilangan tiga angka paling besar. Bacanya sembilan ratus sembilan puluh sembilan.",
    wajib: false,
    cek: (k) => tempat(k) && k.n === 999 && k.rapi,
  },
];

/** Sub-Bab B: nilai tempat. Angka yang sama bernilai berbeda menurut tempatnya. */
export const MISI_B: DefMisi<KeadaanK3Bab1>[] = [
  {
    id: "b-251",
    teks: "Buat 251 dan nyalakan Nilai. Angka 5 bernilai 50, bukan 5.",
    wajib: true,
    cek: (k) => tempat(k) && k.n === 251 && k.rapi && k.nilai,
  },
  {
    id: "b-enam",
    teks: "Nyalakan Nilai, lalu buat 600, 60, dan 6. Angka enam sama, nilainya beda.",
    wajib: true,
    cek: (k) => tempat(k) && [600, 60, 6].every((n) => k.pernahNilai.includes(n)),
  },
  {
    id: "b-602",
    teks: "Buat 602 dengan Nilai menyala. Tempat puluhan kosong, diisi nol: 600 + 0 + 2.",
    wajib: true,
    cek: (k) => tempat(k) && k.n === 602 && k.rapi && k.nilai,
  },
  { id: "b-mesin", teks: "Selesaikan Mesin Angka dan Nilai sampai semua bilangan diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K3B1.B) },
  { id: "b-skenario", teks: "Selesaikan skenario Tiga Kaleng sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K3B1.B) },
  {
    id: "b-987",
    teks: "Buat 987 dengan Nilai menyala: 900 + 80 + 7.",
    wajib: false,
    cek: (k) => tempat(k) && k.n === 987 && k.rapi && k.nilai,
  },
  {
    id: "b-805",
    teks: "Buat 805 dengan Nilai menyala. Puluhannya nol, jadi nilainya 800 + 0 + 5.",
    wajib: false,
    cek: (k) => tempat(k) && k.n === 805 && k.rapi && k.nilai,
  },
  {
    id: "b-ratusan",
    teks: "Tukar 10 puluhan menjadi 1 ratusan. Nilainya tidak berubah.",
    wajib: false,
    cek: (k) => tempat(k) && k.tukarPR,
  },
];

/** Sub-Bab C: membandingkan dan mengurutkan. Bandingkan dari kiri. */
export const MISI_C: DefMisi<KeadaanK3Bab1>[] = [
  {
    id: "c-ratusan",
    teks: "Nyalakan Banding. Buat dua bilangan yang ratusannya berbeda. Ratusan menentukan.",
    wajib: true,
    cek: (k) => tempat(k) && bandingTiga(k) && k.beda === "ratusan",
  },
  {
    id: "c-puluhan",
    teks: "Buat dua bilangan yang ratusannya sama. Sekarang puluhan menentukan.",
    wajib: true,
    cek: (k) => tempat(k) && bandingTiga(k) && k.beda === "puluhan",
  },
  {
    id: "c-satuan",
    teks: "Buat dua bilangan yang ratusan dan puluhannya sama. Sekarang satuan menentukan.",
    wajib: true,
    cek: (k) => tempat(k) && bandingTiga(k) && k.beda === "satuan",
  },
  {
    id: "c-urut",
    teks: "Di Lab Urut, tukar kartu sampai urut naik, dari yang terkecil.",
    wajib: true,
    cek: (k) => urut(k) && k.pernahNaik,
  },
  { id: "c-skenario", teks: "Selesaikan skenario Jarak ke Sekolah sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K3B1.C) },
  {
    id: "c-sama",
    teks: "Buat dua bilangan yang persis sama. Semua tempatnya sama, jadi tandanya sama dengan.",
    wajib: false,
    cek: (k) => tempat(k) && bandingTiga(k) && k.beda === "sama",
  },
  {
    id: "c-turun",
    teks: "Ubah ke Turun, lalu tukar kartu sampai urut dari yang terbesar.",
    wajib: false,
    cek: (k) => urut(k) && k.pernahTurun,
  },
  {
    id: "c-dua",
    teks: "Urutkan dua himpunan kartu yang berbeda. Pakai tombol Himpunan.",
    wajib: false,
    cek: (k) => urut(k) && k.himpunanSelesai >= 2,
  },
];

/** Sub-Bab D: penjumlahan sampai 100. */
export const MISI_D: DefMisi<KeadaanK3Bab1>[] = [
  {
    id: "d-tanpa",
    teks: "Nyalakan Susun pendek. Buat penjumlahan dua angka yang tidak perlu menyimpan.",
    wajib: true,
    cek: (k) => susun(k) && k.mode === "tambah" && k.duaAngka && k.pendek && !k.simpan,
  },
  {
    id: "d-simpan",
    teks: "Buat penjumlahan dua angka yang menyimpan: satuannya sepuluh atau lebih.",
    wajib: true,
    cek: (k) => susun(k) && k.mode === "tambah" && k.duaAngka && k.pendek && k.simpan,
  },
  {
    id: "d-panjang",
    teks: "Nyalakan Susun panjang pada penjumlahan yang menyimpan. Hasilnya sama dengan susun pendek.",
    wajib: true,
    cek: (k) => susun(k) && k.mode === "tambah" && k.duaAngka && k.panjang && k.simpan,
  },
  { id: "d-mesin", teks: "Selesaikan Mesin Susun Tambah sampai semua soal diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K3B1.D) },
  { id: "d-skenario", teks: "Selesaikan skenario Alun-Alun sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K3B1.D) },
  {
    id: "d-blok",
    teks: "Nyalakan Blok pada penjumlahan yang menyimpan. Lihat sepuluh satuan menjadi satu puluhan.",
    wajib: false,
    cek: (k) => susun(k) && k.mode === "tambah" && k.duaAngka && k.blok && k.simpan,
  },
  {
    id: "d-seratus",
    teks: "Buat jumlah tepat 100. Berapa pasangan yang kamu temukan?",
    wajib: false,
    cek: (k) => susun(k) && k.mode === "tambah" && k.duaAngka && k.hasil === 100,
  },
  {
    id: "d-sepuluh",
    teks: "Buat penjumlahan yang satuannya tepat 10. Satuan ditulis 0, simpan 1 puluhan.",
    wajib: false,
    cek: (k) => susun(k) && k.mode === "tambah" && k.duaAngka && k.satuanSepuluh,
  },
];

/** Sub-Bab E: pengurangan sampai 100. */
export const MISI_E: DefMisi<KeadaanK3Bab1>[] = [
  {
    id: "e-tanpa",
    teks: "Nyalakan Susun pendek. Buat pengurangan dua angka yang tidak perlu mengambil puluhan.",
    wajib: true,
    cek: (k) => susun(k) && k.mode === "kurang" && k.duaAngka && k.pendek && !k.ambil && k.hasil > 0,
  },
  {
    id: "e-ambil",
    teks: "Buat pengurangan yang mengambil: satuan atas lebih kecil dari satuan bawah.",
    wajib: true,
    cek: (k) => susun(k) && k.mode === "kurang" && k.duaAngka && k.pendek && k.ambil,
  },
  {
    id: "e-periksa",
    teks: "Nyalakan Periksa pada sebuah pengurangan. Hasil ditambah pengurang kembali ke awal.",
    wajib: true,
    cek: (k) => susun(k) && k.mode === "kurang" && k.duaAngka && k.periksa && k.hasil > 0,
  },
  { id: "e-mesin", teks: "Selesaikan Mesin Susun Kurang sampai semua soal diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K3B1.E) },
  { id: "e-skenario", teks: "Selesaikan skenario Toko Pak Bandi sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K3B1.E) },
  {
    id: "e-panjang",
    teks: "Nyalakan Susun panjang pada pengurangan yang mengambil. Lihat satu puluhan diuraikan.",
    wajib: false,
    cek: (k) => susun(k) && k.mode === "kurang" && k.duaAngka && k.panjang && k.ambil,
  },
  {
    id: "e-nol",
    teks: "Buat dua bilangan yang sama. Hasilnya nol, dan tidak ada yang tersisa.",
    wajib: false,
    cek: (k) => susun(k) && k.mode === "kurang" && k.duaAngka && k.hasil === 0,
  },
  {
    id: "e-blok",
    teks: "Nyalakan Blok pada pengurangan yang mengambil. Lihat satu puluhan menjadi sepuluh satuan.",
    wajib: false,
    cek: (k) => susun(k) && k.mode === "kurang" && k.duaAngka && k.blok && k.ambil,
  },
];

/** Sub-Bab F: perkalian sampai 100. */
export const MISI_F: DefMisi<KeadaanK3Bab1>[] = [
  {
    id: "f-lima-dua",
    teks: "Buat 5 kelompok isi 2 dan nyalakan Tambah berulang. Hasilnya 10.",
    wajib: true,
    cek: (k) => kel(k) && k.mode === "kali" && k.k === 5 && k.n === 2 && k.tambah,
  },
  {
    id: "f-kalimat",
    teks: "Buat 4 kelompok isi 5 dan nyalakan Kalimat. Itu 4 × 5 = 20.",
    wajib: true,
    cek: (k) => kel(k) && k.mode === "kali" && k.k === 4 && k.n === 5 && k.kalimat,
  },
  {
    id: "f-garis",
    teks: "Buat 3 kelompok isi 7 dan nyalakan Garis. Hitung tiga loncatan.",
    wajib: true,
    cek: (k) => kel(k) && k.mode === "kali" && k.k === 3 && k.n === 7 && k.garis,
  },
  {
    id: "f-tukar",
    teks: "Buat 5 kelompok isi 6 dan nyalakan Tukar. Hasilnya sama dengan 6 × 5.",
    wajib: true,
    cek: (k) => kel(k) && k.mode === "kali" && k.k === 5 && k.n === 6 && k.tukar,
  },
  { id: "f-mesin", teks: "Selesaikan Mesin Kelompok sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K3B1.F) },
  { id: "f-skenario", teks: "Selesaikan skenario Kebun Melati sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K3B1.F) },
  {
    id: "f-seratus",
    teks: "Buat hasil kali paling besar di bab ini: tepat 100.",
    wajib: false,
    cek: (k) => kel(k) && k.mode === "kali" && k.p === 100,
  },
  {
    id: "f-sama",
    teks: "Cari dua perkalian berbeda yang hasilnya sama, bukan sekadar tukar tempat.",
    wajib: false,
    cek: (k) => kel(k) && k.duaSama,
  },
];

/** Sub-Bab G (akhir): pembagian sampai 100. Sekaligus pencapaian misi bab ini. */
export const MISI_G: DefMisi<KeadaanK3Bab1>[] = [
  {
    id: "g-kurang",
    teks: "Di mode Bagi, bagi 12 ke 2 wadah dan nyalakan Kurang berulang. Hasilnya 6.",
    wajib: true,
    cek: (k) => kel(k) && k.mode === "bagi" && k.T === 12 && k.w === 2 && k.kurang,
  },
  {
    id: "g-nama",
    teks: "Nyalakan Nama pada pembagian yang habis dibagi. Cari bilangan dibagi, pembagi, hasil bagi.",
    wajib: true,
    cek: (k) => kel(k) && k.mode === "bagi" && k.nama && k.sisa === 0,
  },
  {
    id: "g-periksa",
    teks: "Nyalakan Periksa pada pembagian yang habis. Hasil bagi dikali pembagi kembali ke awal.",
    wajib: true,
    cek: (k) => kel(k) && k.mode === "bagi" && k.periksa && k.sisa === 0,
  },
  {
    id: "g-balik",
    teks: "Buat perkalian di mode Kali, lalu bagi hasilnya di mode Bagi dengan salah satu faktornya.",
    wajib: true,
    cek: (k) => kel(k) && k.mode === "bagi" && k.sisa === 0 && k.riwayatKali.some((r) => k.T === r.k * r.n && (k.w === r.k || k.w === r.n)),
  },
  { id: "g-mesin", teks: "Selesaikan Mesin Bagikan Bergiliran sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K3B1.G) },
  { id: "g-skenario", teks: "Selesaikan skenario Pencapaian Bab sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K3B1.G) },
  {
    id: "g-sisa",
    teks: "Cari pembagian yang menyisakan benda. Itu tidak habis dibagi.",
    wajib: false,
    cek: (k) => kel(k) && k.mode === "bagi" && k.sisa > 0 && k.q >= 1,
  },
  {
    id: "g-seratus",
    teks: "Bagi 100 benda ke beberapa wadah sampai habis dibagi.",
    wajib: false,
    cek: (k) => kel(k) && k.mode === "bagi" && k.T === 100 && k.sisa === 0 && k.w >= 2,
  },
];

export const daftarMisiK3Bab1 = (sub: string): DefMisi<KeadaanK3Bab1>[] =>
  sub === "G" ? MISI_G : sub === "F" ? MISI_F : sub === "E" ? MISI_E : sub === "D" ? MISI_D : sub === "C" ? MISI_C : sub === "B" ? MISI_B : MISI_A;
