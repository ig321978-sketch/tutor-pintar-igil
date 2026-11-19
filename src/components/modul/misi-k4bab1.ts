/**
 * Misi dan tantangan bebas Kelas 4 Bab 1 (Bilangan Cacah sampai 10.000, tema Penginapan Pulau Karang Indah). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k4b1.mjs.
 *
 * Tiap Sub-Bab satu simulasi sendiri (folder Sub-Bab).
 * KERANGKA: agen tiap Sub-Bab mengganti MISI_X (kosong) dan menyesuaikan tipe keadaannya di union KeadaanK4Bab1.
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi } from "./misi-simulasi";

import type { KeadaanTiket } from "./tiket-k4b1a/logika";
import type { KeadaanHanduk } from "./handuk-k4b1b/logika";
import type { KeadaanDermaga } from "./dermaga-k4b1c/logika";
import type { KeadaanKelapa } from "./kelapa-k4b1d/logika";
import type { KeadaanResepsi } from "./resepsi-k4b1e/logika";
import type { KeadaanSisa } from "./sisa-k4b1f/logika";
import type { KeadaanPerahu } from "./perahu-k4b1g/logika";
import type { KeadaanJatah } from "./jatah-k4b1h/logika";
import type { KeadaanJadwal } from "./jadwal-k4b1i/logika";

export type KeadaanK4Bab1 = { alat: "kerangka" } | KeadaanTiket | KeadaanHanduk | KeadaanDermaga | KeadaanKelapa | KeadaanResepsi | KeadaanSisa | KeadaanPerahu | KeadaanJatah | KeadaanJadwal;

/** Sub-Bab A: Loket Tiket. Empat misi wajib dan dua tantangan bebas, id berawalan a-, tanpa skor. Diuji di scripts/uji-tiket-k4b1a.mjs. */
const tiket = (k: KeadaanK4Bab1): k is KeadaanTiket => k.alat === "tiket";
export const MISI_A: DefMisi<KeadaanK4Bab1>[] = [
  { id: "a-susun", teks: "Dengarkan ucapan, isi keempat kotak dengan kartu angka, lalu tekan Periksa.", wajib: true, cek: (k) => tiket(k) && k.susunBenar.length >= 1 },
  { id: "a-baca", teks: "Pilih cara membaca nomor tiket yang benar, lalu tekan Periksa.", wajib: true, cek: (k) => tiket(k) && k.bacaBenar.length >= 1 },
  { id: "a-nol", teks: "Isi kotak kosong dengan kartu angka supaya nol tidak hilang, lalu tekan Periksa Nol.", wajib: true, cek: (k) => tiket(k) && k.nolBenar.length >= 1 },
  { id: "a-tempat", teks: "Pilih nama tempat angka yang diberi tanda, lalu tekan Periksa.", wajib: true, cek: (k) => tiket(k) && k.tempatBenar.length >= 1 },
  { id: "a-tolak", teks: "Tekan Periksa saat masih ada kotak kosong, dan lihat alat menolak.", wajib: false, cek: (k) => tiket(k) && k.tolak },
  { id: "a-dua", teks: "Susun dua bilangan dengan benar di papan empat kotak.", wajib: false, cek: (k) => tiket(k) && k.susunBenar.length >= 2 },
];

/** Sub-Bab B: Gudang Handuk. Empat misi wajib dan dua tantangan bebas, id berawalan b-, tanpa skor. Diuji di scripts/uji-handuk-k4b1b.mjs. */
const handuk = (k: KeadaanK4Bab1): k is KeadaanHanduk => k.alat === "handuk";
export const MISI_B: DefMisi<KeadaanK4Bab1>[] = [
  { id: "b-isi", teks: "Isi gudang dengan peti, kotak, ikat, dan lembar sesuai bilangan, lalu tekan Periksa.", wajib: true, cek: (k) => handuk(k) && k.isiBenar.length >= 1 },
  { id: "b-bagan", teks: "Tulis angka tiap kolom bagan tempat sesuai balok, lalu tekan Periksa.", wajib: true, cek: (k) => handuk(k) && k.baganBenar.length >= 1 },
  { id: "b-arti", teks: "Tekan Lihat tempat, pilih banyaknya angka yang dilingkari, lalu tekan Periksa.", wajib: true, cek: (k) => handuk(k) && k.artiBenar.length >= 1 },
  { id: "b-tukar", teks: "Pilih dua tempat, tekan Tukar sekarang, bandingkan bilangan barunya, lalu tekan Periksa.", wajib: true, cek: (k) => handuk(k) && k.tukarBenar.length >= 1 },
  { id: "b-tolak", teks: "Coba memeriksa jawaban sebelum alat bekerja, dan lihat alat menolak.", wajib: false, cek: (k) => handuk(k) && k.tolak },
  { id: "b-semua", teks: "Jawab semua pertanyaan arti angka dengan benar.", wajib: false, cek: (k) => handuk(k) && k.artiBenar.length >= 4 },
];

/** Sub-Bab C: Papan Dermaga. Empat misi wajib dan dua tantangan bebas, id berawalan c-, tanpa skor. */
const dermaga = (k: KeadaanK4Bab1): k is KeadaanDermaga => k.alat === "dermaga";
export const MISI_C: DefMisi<KeadaanK4Bab1>[] = [
  { id: "c-banding", teks: "Lihat tempat dari kiri sampai angka berbeda pertama, pilih tandanya, lalu tekan Periksa.", wajib: true, cek: (k) => dermaga(k) && k.bandBenar.length >= 1 },
  { id: "c-urut", teks: "Geser kartu bilangan sampai berurutan dari yang terkecil, lalu tekan Periksa.", wajib: true, cek: (k) => dermaga(k) && k.naikBenar.length >= 1 },
  { id: "c-turun", teks: "Geser kartu bilangan sampai berurutan dari yang terbesar, lalu tekan Periksa.", wajib: true, cek: (k) => dermaga(k) && k.turunBenar.length >= 1 },
  { id: "c-garis", teks: "Geser titik pada garis bilangan ke bilangan sasaran, lalu tekan Periksa.", wajib: true, cek: (k) => dermaga(k) && k.garisBenar.length >= 1 },
  { id: "c-sama", teks: "Temukan dua bilangan yang sama sampai tempat satuan dan pilih tanda sama dengan.", wajib: false, cek: (k) => dermaga(k) && k.samaBenar },
  { id: "c-tolak", teks: "Coba memilih tanda sebelum angka berbeda terlihat, dan lihat alat menolak.", wajib: false, cek: (k) => dermaga(k) && k.tolak },
];

/** Sub-Bab D: Kios Kelapa. Empat misi wajib dan dua tantangan bebas, id berawalan d-, tanpa skor. */
const kelapa = (k: KeadaanK4Bab1): k is KeadaanKelapa => k.alat === "kelapa";
export const MISI_D: DefMisi<KeadaanK4Bab1>[] = [
  { id: "d-pecah", teks: "Isi keranjang tiap tempat sampai jumlahnya sama dengan bilangan, lalu tekan Periksa.", wajib: true, cek: (k) => kelapa(k) && k.pecahBenar.length >= 1 },
  { id: "d-susun", teks: "Pilih bilangan yang tersusun dari keranjang, tempat kosong diisi nol, lalu tekan Periksa.", wajib: true, cek: (k) => kelapa(k) && k.susunBenar.length >= 1 },
  { id: "d-bagan", teks: "Pilih bagian yang hilang di bagan, tekan Cek Bagan, lalu tekan Periksa.", wajib: true, cek: (k) => kelapa(k) && k.bagBenar.length >= 1 },
  { id: "d-lain", teks: "Simpan tiga cara berbeda untuk menguraikan satu bilangan menjadi dua bagian.", wajib: true, cek: (k) => kelapa(k) && k.lainBenar.length >= 1 },
  { id: "d-tolak", teks: "Coba menaruh terlalu banyak keranjang atau cara yang sama, dan lihat alat menolak.", wajib: false, cek: (k) => kelapa(k) && k.tolak },
  { id: "d-tiga", teks: "Pecah tiga bilangan ke keranjang dengan benar tanpa terhenti.", wajib: false, cek: (k) => kelapa(k) && k.pecahBenar.length >= 3 },
];

/** Sub-Bab E: Meja Resepsi. Empat misi wajib dan dua tantangan bebas, id berawalan e-, tanpa skor. */
const resepsi = (k: KeadaanK4Bab1): k is KeadaanResepsi => k.alat === "resepsi";
export const MISI_E: DefMisi<KeadaanK4Bab1>[] = [
  { id: "e-susun", teks: "Jumlahkan dua bilangan bersusun dari kolom satuan sampai semua kolom terisi.", wajib: true, cek: (k) => resepsi(k) && k.susunBenar.length >= 1 },
  { id: "e-simpan", teks: "Selesaikan penjumlahan bersusun yang memakai simpanan ke kolom di kirinya.", wajib: true, cek: (k) => resepsi(k) && k.simpanBenar.length >= 1 },
  { id: "e-tukar", teks: "Tukar sepuluh butir menjadi satu batang sampai tiap tempat berisi satu angka, lalu tekan Periksa.", wajib: true, cek: (k) => resepsi(k) && k.tukarBenar.length >= 1 },
  { id: "e-genap", teks: "Bulatkan bilangan yang hampir bulat, pilih ditambah atau dikurangi, lalu tekan Periksa.", wajib: true, cek: (k) => resepsi(k) && k.genapBenar.length >= 1 },
  { id: "e-tolak", teks: "Coba mengerjakan kolom yang bukan satuan lebih dulu, dan lihat alat menolak.", wajib: false, cek: (k) => resepsi(k) && k.tolak },
  { id: "e-semua", teks: "Selesaikan tiga penjumlahan bersusun dengan benar.", wajib: false, cek: (k) => resepsi(k) && k.susunBenar.length >= 3 },
];

/** Sub-Bab F: Papan Sisa. Empat misi wajib dan dua tantangan bebas, id berawalan f-, tanpa skor. */
const sisa = (k: KeadaanK4Bab1): k is KeadaanSisa => k.alat === "sisa";
export const MISI_F: DefMisi<KeadaanK4Bab1>[] = [
  { id: "f-susun", teks: "Kurangkan dari satuan ke kiri sampai semua tempat terisi, lalu lanjut ke pengurangan berikutnya.", wajib: true, cek: (k) => sisa(k) && k.susunBenar.length >= 1 },
  { id: "f-ambil", teks: "Selesaikan pengurangan yang harus mengambil dua kali, satu kali di satuan dan satu kali di puluhan.", wajib: true, cek: (k) => sisa(k) && k.susunBenar.includes(1) },
  { id: "f-maju", teks: "Hitung maju sampai bilangan besar, pilih selisihnya, lalu tekan Periksa.", wajib: true, cek: (k) => sisa(k) && k.majuBenar.length >= 1 },
  { id: "f-cek", teks: "Tambahkan hasil dengan bilangan yang dikurangkan, putuskan benar atau salah, lalu tekan Periksa.", wajib: true, cek: (k) => sisa(k) && k.cekBenar.length >= 1 },
  { id: "f-tolak", teks: "Coba mengisi hasil sebelum mengambil, atau memutuskan sebelum menambahkan, dan lihat alat menolak.", wajib: false, cek: (k) => sisa(k) && k.tolak },
  { id: "f-tangkap", teks: "Temukan hasil pengurangan yang keliru dengan memeriksanya memakai penjumlahan.", wajib: false, cek: (k) => sisa(k) && k.tangkap >= 1 },
];

/** Sub-Bab G: Baris Perahu. Empat misi wajib dan dua tantangan bebas, id berawalan g-, tanpa skor. */
const perahu = (k: KeadaanK4Bab1): k is KeadaanPerahu => k.alat === "perahu";
export const MISI_G: DefMisi<KeadaanK4Bab1>[] = [
  { id: "g-ulang", teks: "Tambah perahu satu per satu sampai jumlah penumpang sama dengan sasaran, lalu tekan Periksa.", wajib: true, cek: (k) => perahu(k) && k.ulangBenar.length >= 1 },
  { id: "g-urai", teks: "Pilih hasil kali puluhan dan hasil kali satuan dari bilangan yang diurai, lalu tekan Periksa.", wajib: true, cek: (k) => perahu(k) && k.uraiBenar.length >= 1 },
  { id: "g-susun", teks: "Kalikan satuan dulu, tulis dan simpan angkanya, pilih hasil akhir, lalu tekan Periksa.", wajib: true, cek: (k) => perahu(k) && k.susunBenar.length >= 1 },
  { id: "g-dua", teks: "Selesaikan dua baris perahu dengan cara tambah berulang, satu demi satu.", wajib: true, cek: (k) => perahu(k) && k.ulangBenar.length >= 2 },
  { id: "g-tolak", teks: "Coba memeriksa hitung susun sebelum satuan dikalikan, dan lihat alat menolak.", wajib: false, cek: (k) => perahu(k) && k.tolak },
  { id: "g-semua", teks: "Selesaikan dua baris pada tiap alat: tambah berulang, urai, dan susun.", wajib: false, cek: (k) => perahu(k) && k.ulangBenar.length >= 2 && k.uraiBenar.length >= 2 && k.susunBenar.length >= 2 },
];

/** Sub-Bab H: Papan Jatah. Empat misi wajib dan dua tantangan bebas, id berawalan h-, tanpa skor. */
const jatah = (k: KeadaanK4Bab1): k is KeadaanJatah => k.alat === "jatah";
export const MISI_H: DefMisi<KeadaanK4Bab1>[] = [
  { id: "h-rata", teks: "Bagikan tamu satu putaran demi putaran sampai tidak cukup lagi, pilih hasil tiap kamar, lalu tekan Periksa.", wajib: true, cek: (k) => jatah(k) && k.rataBenar.length >= 1 },
  { id: "h-kurang", teks: "Kurangi bilangan dengan pembagi berulang kali, pilih banyak pengurangan, lalu tekan Periksa.", wajib: true, cek: (k) => jatah(k) && k.kurangBenar.length >= 1 },
  { id: "h-susun", teks: "Pilih hasil dan sisa puluhan, turunkan angka satuan, pilih hasil satuan, lalu tekan Periksa.", wajib: true, cek: (k) => jatah(k) && k.susunBenar.length >= 1 },
  { id: "h-kali", teks: "Tekan Cek Kali, putuskan hasil bagi benar atau keliru, lalu tekan Periksa.", wajib: true, cek: (k) => jatah(k) && k.kaliBenar.length >= 1 },
  { id: "h-sisa", teks: "Bagikan rombongan yang tamunya tidak habis terbagi, dan lihat sisanya lebih kecil dari banyak kamar.", wajib: false, cek: (k) => jatah(k) && k.rataSisa },
  { id: "h-tolak", teks: "Coba menurunkan angka sebelum sisa puluhan dipilih, dan lihat alat menolak.", wajib: false, cek: (k) => jatah(k) && k.tolak },
];

/** Sub-Bab I: Papan Jadwal. Empat misi wajib dan dua tantangan bebas, id berawalan i-, tanpa skor. */
const jadwal = (k: KeadaanK4Bab1): k is KeadaanJadwal => k.alat === "jadwal";
export const MISI_I: DefMisi<KeadaanK4Bab1>[] = [
  { id: "i-pasang", teks: "Atur banyak baris payung, catat semua pasangan faktor, lalu tekan Periksa.", wajib: true, cek: (k) => jadwal(k) && k.pasangBenar.length >= 1 },
  { id: "i-faktor", teks: "Tandai semua bilangan yang menjadi faktor, lalu tekan Periksa.", wajib: true, cek: (k) => jadwal(k) && k.faktorBenar.length >= 1 },
  { id: "i-jadwal", teks: "Tandai semua kelipatan pada garis jadwal, lalu tekan Periksa.", wajib: true, cek: (k) => jadwal(k) && k.jadwalBenar.length >= 1 },
  { id: "i-uji", teks: "Tekan Bagi, putuskan faktor atau bukan faktor, lalu tekan Periksa.", wajib: true, cek: (k) => jadwal(k) && k.ujiBenar.length >= 1 },
  { id: "i-tolak", teks: "Coba mencatat susunan payung yang tidak habis, atau memutuskan sebelum membagi, dan lihat alat menolak.", wajib: false, cek: (k) => jadwal(k) && k.tolak },
  { id: "i-semua", teks: "Jawab semua bilangan pada alat Uji dengan benar.", wajib: false, cek: (k) => jadwal(k) && k.ujiBenar.length >= 4 },
];

export const daftarMisiK4Bab1 = (sub: string): DefMisi<KeadaanK4Bab1>[] => {
  switch (sub) {
    case "B":
      return MISI_B;
    case "C":
      return MISI_C;
    case "D":
      return MISI_D;
    case "E":
      return MISI_E;
    case "F":
      return MISI_F;
    case "G":
      return MISI_G;
    case "H":
      return MISI_H;
    case "I":
      return MISI_I;
    default:
      return MISI_A;
  }
};
