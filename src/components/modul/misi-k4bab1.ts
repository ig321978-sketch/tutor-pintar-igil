/**
 * Misi dan tantangan bebas Kelas 4 Bab 1 (Bilangan Cacah sampai 10.000). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k4b1.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Membaca dan menulis   : Lab Kemasan (Rakit, Baca, Tulis)          + Mesin Baca    + Helen di Minimarket
 *  B Nilai tempat          : Lab Nilai Tempat (Nilai, Uraian, Tabel)   + Mesin Nilai   + Struk Belanja Azizah
 *  C Membandingkan, urut   : Lab Banding (Dua Bilangan, Urut, Kartu)   + Mesin Banding + Harga di Pasar
 *  D Komposisi, dekomposisi: Lab Susun-Urai (Susun, Urai, Uang)        + Mesin Susun   + Uang Helen
 *  E Penjumlahan sampai 1.000: Lab Jumlah Bersusun (Bersusun, Cara Panjang) + Mesin Jumlah + Jeruk Pak Toni
 *  F Pengurangan sampai 1.000: Lab Kurang Bersusun (Bersusun, Cara Panjang, Periksa) + Mesin Kurang + Buku Perpustakaan
 *  G Perkalian sampai 100    : Lab Kali (Array, Belah, Bersusun)          + Mesin Kali    + Donat dan Koperasi
 *  H Pembagian sampai 100    : Lab Bagi (Wadah, Bersusun, Periksa)        + Mesin Bagi    + Permen Pak Wicak
 *  I Faktor dan kelipatan    : Lab Faktor (Faktor, Kelipatan)             + Mesin Faktor  + Pameran Kelas 4 (pencapaian bab)
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanKemasanK4B1A } from "./lab-kemasan-k4b1a";
import type { KeadaanNilaiK4B1B } from "./lab-nilai-k4b1b";
import type { KeadaanBandingK4B1C } from "./lab-banding-k4b1c";
import type { KeadaanSusunK4B1D } from "./lab-susun-k4b1d";
import type { KeadaanJumlahK4B1E } from "./lab-jumlah-k4b1e";
import type { KeadaanKurangK4B1F } from "./lab-kurang-k4b1f";
import type { KeadaanKaliK4B1G } from "./lab-kali-k4b1g";
import type { KeadaanBagiK4B1H } from "./lab-bagi-k4b1h";
import type { KeadaanFaktorK4B1I } from "./lab-faktor-k4b1i";

export type KeadaanK4Bab1 = KeadaanKemasanK4B1A | KeadaanNilaiK4B1B | KeadaanBandingK4B1C | KeadaanSusunK4B1D | KeadaanJumlahK4B1E | KeadaanKurangK4B1F | KeadaanKaliK4B1G | KeadaanBagiK4B1H | KeadaanFaktorK4B1I | KeadaanSelesai;
export type HurufMisiK4B1 = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I";

const selesai = (k: KeadaanK4Bab1, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK4Bab1, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));
/** Banyak cara berbeda yang tercatat dengan awalan tertentu. */
const banyakAwalan = (k: KeadaanK4Bab1, alat: string, awalan: string) => (k.alat === alat && "pernah" in k ? k.pernah.filter((p) => p.startsWith(awalan)).length : 0);

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K4B1 = { A: "helen-minimarket", B: "struk-azizah", C: "harga-pasar", D: "uang-helen", E: "jeruk-pak-toni", F: "buku-perpustakaan", G: "donat-koperasi", H: "permen-wicak", I: "pameran-kelas4" } as const;
export const ID_MESIN_K4B1 = { A: "mesin-baca", B: "mesin-nilai", C: "mesin-banding", D: "mesin-susun", E: "mesin-jumlah", F: "mesin-kurang", G: "mesin-kali", H: "mesin-bagi", I: "mesin-faktor" } as const;

export const MISI_A: DefMisi<KeadaanK4Bab1>[] = [
  { id: "a-tukar", teks: "Di Rakit, tambah dus sampai sepuluh dan lihat sepuluh dus ditukar menjadi satu peti.", wajib: true, cek: (k) => pernah(k, "kemasan", "tukar:dus") },
  { id: "a-rakit", teks: "Rakit 3.286 (jarak rumah Helen) dengan Bacaan menyala.", wajib: true, cek: (k) => pernah(k, "kemasan", "baca:3286") },
  { id: "a-nol", teks: "Rakit 7.003 dengan Bacaan menyala. Tempat mana yang dilewati saat dibaca?", wajib: true, cek: (k) => pernah(k, "kemasan", "baca:7003") },
  { id: "a-seribu", teks: "Rakit 1.025 dengan Bacaan menyala. Mengapa dibaca seribu?", wajib: true, cek: (k) => pernah(k, "kemasan", "baca:1025") },
  { id: "a-tulis", teks: "Di Tulis, susun kartu angka untuk tinggi Gunung Semeru, lalu tekan Periksa.", wajib: true, cek: (k) => pernah(k, "kemasan", "tulis:3676") },
  { id: "a-mesin", teks: "Selesaikan Mesin Baca sampai semua bilangan diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K4B1.A) },
  { id: "a-skenario", teks: "Selesaikan skenario Helen di Minimarket sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K4B1.A) },
  { id: "a-sepuluh-ribu", teks: "Rakit 10.000. Berapa peti yang kamu perlukan?", wajib: false, cek: (k) => pernah(k, "kemasan", "rakit:10000") },
  { id: "a-tulis-nol", teks: "Di Tulis, tulis sembilan ribu empat puluh lima dengan benar.", wajib: false, cek: (k) => pernah(k, "kemasan", "tulis:9045") },
  { id: "a-2903", teks: "Rakit 2.903 dengan Bacaan menyala.", wajib: false, cek: (k) => pernah(k, "kemasan", "baca:2903") },
];

export const MISI_B: DefMisi<KeadaanK4Bab1>[] = [
  { id: "b-2150", teks: "Atur papan menjadi 2.150, lalu ketuk angka 2. Berapa nilainya?", wajib: true, cek: (k) => pernah(k, "nilai", "ketuk:2150:0") },
  { id: "b-enam", teks: "Ketuk angka 6 saat di puluhan dan saat di ratusan. Bandingkan nilainya.", wajib: true, cek: (k) => pernah(k, "nilai", "nilai:6:10", "nilai:6:100") },
  { id: "b-uraian-nol", teks: "Nyalakan Uraian pada bilangan yang punya angka 0. Lihat nol tetap ditulis.", wajib: true, cek: (k) => pernah(k, "nilai", "uraian-nol") },
  { id: "b-tabel", teks: "Di Tabel, isi tabel digit untuk 7.812 lalu tekan Periksa.", wajib: true, cek: (k) => pernah(k, "nilai", "tabel:7812") },
  { id: "b-tolak", teks: "Coba isi satu kolom tabel dengan nilai penuh (misalnya 7000), lalu baca penjelasan lab.", wajib: true, cek: (k) => pernah(k, "nilai", "tabel-tolak") },
  { id: "b-mesin", teks: "Selesaikan Mesin Nilai sampai semua bilangan diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K4B1.B) },
  { id: "b-skenario", teks: "Selesaikan skenario Struk Belanja Azizah sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K4B1.B) },
  { id: "b-buku", teks: "Isi tabel digit untuk keempat bilangan buku: 6.192, 2.910, 4.128, dan 9.217.", wajib: false, cek: (k) => pernah(k, "nilai", "tabel:6192", "tabel:2910", "tabel:4128", "tabel:9217") },
  { id: "b-empat", teks: "Atur 4.444 dan ketuk keempat angka 4. Apakah nilainya sama?", wajib: false, cek: (k) => pernah(k, "nilai", "ketuk:4444:0", "ketuk:4444:1", "ketuk:4444:2", "ketuk:4444:3") },
  { id: "b-nol", teks: "Pada 2.150, ketuk angka 0. Berapa nilainya?", wajib: false, cek: (k) => pernah(k, "nilai", "ketuk:2150:3") },
];

export const MISI_C: DefMisi<KeadaanK4Bab1>[] = [
  { id: "c-kuat", teks: "Buat bilangan yang ribuannya lebih kecil, tetapi ratusan, puluhan, dan satuannya lebih besar. Nyalakan Langkah. Mana yang lebih besar?", wajib: true, cek: (k) => pernah(k, "banding", "penentu-kuat") },
  { id: "c-satuan", teks: "Buat dua bilangan yang baru berbeda di satuan, dengan Langkah menyala.", wajib: true, cek: (k) => pernah(k, "banding", "penentu:3") },
  { id: "c-sama", teks: "Buat dua bilangan yang sama persis, dengan Langkah menyala. Tanda apa yang muncul?", wajib: true, cek: (k) => pernah(k, "banding", "tanda:=") },
  { id: "c-urut", teks: "Di Urut, urutkan tinggi tiga gunung dari yang terendah.", wajib: true, cek: (k) => pernah(k, "banding", "urut:gunung:naik") },
  { id: "c-kartu", teks: "Di Kartu Digit, susun bilangan terbesar dari kartu 1, 5, 9, dan 2.", wajib: true, cek: (k) => pernah(k, "banding", "kartu:0:terbesar") },
  { id: "c-mesin", teks: "Selesaikan Mesin Banding sampai semua pasangan diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K4B1.C) },
  { id: "c-skenario", teks: "Selesaikan skenario Harga di Pasar sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K4B1.C) },
  { id: "c-turun", teks: "Di Urut, urutkan empat harga pasar dari yang termahal.", wajib: false, cek: (k) => pernah(k, "banding", "urut:harga:turun") },
  { id: "c-kartu-nol", teks: "Susun bilangan terkecil dari kartu 3, 0, 7, dan 4. Boleh 0 di ribuan?", wajib: false, cek: (k) => pernah(k, "banding", "kartu:1:terkecil") },
  { id: "c-ratusan", teks: "Buat dua bilangan dengan ratusan sebagai penentu, seperti 3.676 dan 3.726.", wajib: false, cek: (k) => pernah(k, "banding", "penentu:1") },
];

export const MISI_D: DefMisi<KeadaanK4Bab1>[] = [
  { id: "d-susun", teks: "Di Susun, atur keping sampai bilangannya 6.348.", wajib: true, cek: (k) => pernah(k, "susun", "susun:6348") },
  { id: "d-kelompok", teks: "Tekan Kelompokkan saat ada lebih dari 9 keping di satu tempat. Apakah bilangannya berubah?", wajib: true, cek: (k) => pernah(k, "susun", "kelompok") },
  { id: "d-nol", teks: "Di Urai, urai 6.035 menurut tempat dengan Tulis nol menyala.", wajib: true, cek: (k) => pernah(k, "susun", "urai-nol:6035") },
  { id: "d-dua-cara", teks: "Urai 3.035 dengan dua cara: menurut tempat dan dengan lebih dari 9 keping di satu tempat.", wajib: true, cek: (k) => pernah(k, "susun", "urai:3035:baku", "urai:3035:lain") },
  { id: "d-uang", teks: "Di Uang, susun uang pecahan sampai Rp7.300.", wajib: true, cek: (k) => pernah(k, "susun", "uang:7300") },
  { id: "d-mesin", teks: "Selesaikan Mesin Susun sampai semua bilangan diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K4B1.D) },
  { id: "d-skenario", teks: "Selesaikan skenario Uang Helen sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K4B1.D) },
  { id: "d-7020", teks: "Urai 7.020 menurut tempat dengan Tulis nol menyala. Ada berapa suku nol?", wajib: false, cek: (k) => pernah(k, "susun", "urai-nol:7020") },
  { id: "d-uang-dua", teks: "Susun Rp10.000 dengan dua cara pecahan yang berbeda.", wajib: false, cek: (k) => banyakAwalan(k, "susun", "uang-cara:10000:") >= 2 },
  { id: "d-9999", teks: "Di Susun, buat bilangan 9.999.", wajib: false, cek: (k) => pernah(k, "susun", "susun:9999") },
];

export const MISI_E: DefMisi<KeadaanK4Bab1>[] = [
  { id: "e-tanpa", teks: "Di Bersusun, selesaikan 131 + 321 kolom demi kolom.", wajib: true, cek: (k) => pernah(k, "jumlah", "jumlah:131+321") },
  { id: "e-simpan", teks: "Selesaikan 189 + 245 dengan menyimpan di tempat yang tepat.", wajib: true, cek: (k) => pernah(k, "jumlah", "jumlah:189+245") },
  { id: "e-lupa", teks: "Coba tekan Tulis tanpa simpanan pada kolom yang jumlahnya sepuluh atau lebih. Baca penjelasan lab.", wajib: true, cek: (k) => pernah(k, "jumlah", "lupa-simpan") },
  { id: "e-panjang", teks: "Nyalakan Cara Panjang untuk 189 + 245. Bandingkan dengan hasil bersusun.", wajib: true, cek: (k) => pernah(k, "jumlah", "panjang:189+245") },
  { id: "e-tiga", teks: "Selesaikan 124 + 411 + 363 bersusun.", wajib: true, cek: (k) => pernah(k, "jumlah", "tiga:898") },
  { id: "e-mesin", teks: "Selesaikan Mesin Jumlah sampai semua soal diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K4B1.E) },
  { id: "e-skenario", teks: "Selesaikan skenario Jeruk Pak Toni sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K4B1.E) },
  { id: "e-907", teks: "Selesaikan 328 + 579. Berapa kali menyimpan?", wajib: false, cek: (k) => pernah(k, "jumlah", "jumlah:328+579") },
  { id: "e-seribu", teks: "Selesaikan penjumlahan yang hasilnya tepat 1.000.", wajib: false, cek: (k) => pernah(k, "jumlah", "jumlah-1000") },
  { id: "e-lele", teks: "Selesaikan 117 + 105 + 242 (ikan lele).", wajib: false, cek: (k) => pernah(k, "jumlah", "tiga:464") },
];

export const MISI_F: DefMisi<KeadaanK4Bab1>[] = [
  { id: "f-tanpa", teks: "Di Bersusun, selesaikan 265 − 132 tanpa mengambil.", wajib: true, cek: (k) => pernah(k, "kurang", "kurang:265-132") },
  { id: "f-ambil", teks: "Selesaikan 241 − 129 dengan mengambil 1 puluhan.", wajib: true, cek: (k) => pernah(k, "kurang", "kurang:241-129") },
  { id: "f-dua", teks: "Selesaikan 253 − 176 dengan dua kali mengambil.", wajib: true, cek: (k) => pernah(k, "kurang", "ambil-dua:253-176") },
  { id: "f-balik", teks: "Pada 241 − 129, coba tulis hasil 9 − 1 di satuan. Baca mengapa lab menolaknya.", wajib: true, cek: (k) => pernah(k, "kurang", "balik-salah") },
  { id: "f-periksa", teks: "Setelah 241 − 129 selesai, tekan Periksa: hasil ditambah pengurang.", wajib: true, cek: (k) => pernah(k, "kurang", "periksa:241-129") },
  { id: "f-mesin", teks: "Selesaikan Mesin Kurang sampai semua soal diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K4B1.F) },
  { id: "f-skenario", teks: "Selesaikan skenario Buku Perpustakaan sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K4B1.F) },
  { id: "f-66", teks: "Selesaikan 241 − 175. Berapa kali mengambil?", wajib: false, cek: (k) => pernah(k, "kurang", "kurang:241-175") },
  { id: "f-nol", teks: "Selesaikan 304 − 128. Puluhannya 0: dari mana satuan mengambil?", wajib: false, cek: (k) => pernah(k, "kurang", "kurang:304-128") },
  { id: "f-seribu", teks: "Selesaikan 1.000 − 1. Berapa kali mengambil?", wajib: false, cek: (k) => pernah(k, "kurang", "kurang:1000-1") },
];

export const MISI_G: DefMisi<KeadaanK4Bab1>[] = [
  { id: "g-array", teks: "Di Array, atur 12 kotak donat berisi 4 donat. Baca penjumlahan berulangnya.", wajib: true, cek: (k) => pernah(k, "kali", "array:12x4") },
  { id: "g-cerita", teks: "Atur array 12 pak pensil berisi 8 batang. Berapa batang seluruhnya?", wajib: true, cek: (k) => pernah(k, "kali", "array:12x8") },
  { id: "g-panjang", teks: "Di Belah, nyalakan cara panjang untuk 12 × 4 dan baca uraiannya.", wajib: true, cek: (k) => pernah(k, "kali", "belah:12x4") },
  { id: "g-bersusun", teks: "Di Bersusun, selesaikan 14 × 5 kolom demi kolom.", wajib: true, cek: (k) => pernah(k, "kali", "kali:14x5") },
  { id: "g-lupa", teks: "Pada kolom satuan 14 × 5, coba tekan Tulis tanpa simpanan. Baca penjelasan lab.", wajib: true, cek: (k) => pernah(k, "kali", "lupa-simpan") },
  { id: "g-mesin", teks: "Selesaikan Mesin Kali sampai semua soal diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K4B1.G) },
  { id: "g-skenario", teks: "Selesaikan skenario Donat dan Koperasi sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K4B1.G) },
  { id: "g-seratus", teks: "Selesaikan perkalian bersusun yang hasilnya tepat 100. Berapa simpanannya?", wajib: false, cek: (k) => pernah(k, "kali", "kali-100") },
  { id: "g-45", teks: "Selesaikan 45 × 2 bersusun. Berapa simpanan di kolom satuan?", wajib: false, cek: (k) => pernah(k, "kali", "kali:45x2") },
  { id: "g-16", teks: "Nyalakan cara panjang untuk 16 × 6. Bandingkan dengan hasil bersusun.", wajib: false, cek: (k) => pernah(k, "kali", "belah:16x6") },
];

export const MISI_H: DefMisi<KeadaanK4Bab1>[] = [
  { id: "h-habis", teks: "Di Wadah, bagikan 48 permen ke 4 wadah sampai habis. Berapa tiap wadah?", wajib: true, cek: (k) => pernah(k, "bagi", "habis:48:4") },
  { id: "h-percobaan", teks: "Bagikan 48 permen ke 2, 3, 4, 6, dan 8 wadah. Catat mana yang habis.", wajib: true, cek: (k) => pernah(k, "bagi", "wadah:48:2", "wadah:48:3", "wadah:48:4", "wadah:48:6", "wadah:48:8") },
  { id: "h-sisa", teks: "Bagikan 48 permen ke 5 wadah. Berapa sisanya?", wajib: true, cek: (k) => pernah(k, "bagi", "bersisa:48:5") },
  { id: "h-bersusun", teks: "Di Bersusun, selesaikan 48 : 4 dari puluhan ke satuan.", wajib: true, cek: (k) => pernah(k, "bagi", "bagi:48:4") },
  { id: "h-periksa", teks: "Selesaikan 81 : 3, lalu tekan Periksa: hasil kali pembagi.", wajib: true, cek: (k) => pernah(k, "bagi", "periksa:81:3") },
  { id: "h-mesin", teks: "Selesaikan Mesin Bagi sampai semua soal diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K4B1.H) },
  { id: "h-skenario", teks: "Selesaikan skenario Permen Pak Wicak sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K4B1.H) },
  { id: "h-cukup", teks: "Selesaikan 36 : 4. Mengapa hasil di puluhan 0?", wajib: false, cek: (k) => pernah(k, "bagi", "belum-cukup") },
  { id: "h-47", teks: "Selesaikan 47 : 5 bersusun. Berapa sisanya?", wajib: false, cek: (k) => pernah(k, "bagi", "bagi:47:5") },
  { id: "h-besar", teks: "Coba tulis hasil yang terlalu besar di Bersusun. Baca penjelasan lab.", wajib: false, cek: (k) => pernah(k, "bagi", "terlalu-besar") },
];

export const MISI_I: DefMisi<KeadaanK4Bab1>[] = [
  { id: "i-dua-belas", teks: "Di Faktor, temukan semua faktor 12 dengan mencoba pembagi.", wajib: true, cek: (k) => pernah(k, "faktor", "lengkap:12") },
  { id: "i-bukan", teks: "Coba pembagi 5 pada 12. Baca mengapa 5 bukan faktor 12.", wajib: true, cek: (k) => pernah(k, "faktor", "bukan:12:5") },
  { id: "i-dua-puluh", teks: "Temukan semua faktor 20.", wajib: true, cek: (k) => pernah(k, "faktor", "lengkap:20") },
  { id: "i-deret", teks: "Di Kelipatan, lompat 7 kali dengan lompatan 2, seperti Karel.", wajib: true, cek: (k) => pernah(k, "faktor", "deret:2:7") },
  { id: "i-rentang", teks: "Nyalakan Rentang: kelipatan 5 yang lebih dari 17 dan kurang dari 35.", wajib: true, cek: (k) => pernah(k, "faktor", "rentang:5:17:35") },
  { id: "i-mesin", teks: "Selesaikan Mesin Faktor sampai semua bilangan diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K4B1.I) },
  { id: "i-skenario", teks: "Selesaikan skenario Pameran Kelas 4 sampai adegan akhir. Ini misi penutup bab.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K4B1.I) },
  { id: "i-dua-empat", teks: "Temukan semua faktor 24. Ada berapa faktornya?", wajib: false, cek: (k) => pernah(k, "faktor", "lengkap:24") },
  { id: "i-tiga-belas", teks: "Temukan semua faktor 13. Mengapa hanya dua faktor?", wajib: false, cek: (k) => pernah(k, "faktor", "dua-faktor") },
  { id: "i-enam", teks: "Atur Rentang 0 sampai 40 untuk kelipatan 6. Bilangan mana yang masuk?", wajib: false, cek: (k) => pernah(k, "faktor", "rentang:6:0:40") },
];

const DAFTAR: Record<HurufMisiK4B1, DefMisi<KeadaanK4Bab1>[]> = { A: MISI_A, B: MISI_B, C: MISI_C, D: MISI_D, E: MISI_E, F: MISI_F, G: MISI_G, H: MISI_H, I: MISI_I };
export const daftarMisiK4Bab1 = (huruf: string): DefMisi<KeadaanK4Bab1>[] => DAFTAR[huruf as HurufMisiK4B1] ?? MISI_A;
