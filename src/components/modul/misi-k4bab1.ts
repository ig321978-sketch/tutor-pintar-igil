/**
 * Misi dan tantangan bebas Kelas 4 Bab 1 (Bilangan Cacah sampai 10.000). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k4b1.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Membaca dan menulis   : Lab Kemasan (Rakit, Baca, Tulis)          + Mesin Baca    + Helen di Minimarket
 *  B Nilai tempat          : Lab Nilai Tempat (Nilai, Uraian, Tabel)   + Mesin Nilai   + Struk Belanja Azizah
 *  C Membandingkan, urut   : Lab Banding (Dua Bilangan, Urut, Kartu)   + Mesin Banding + Harga di Pasar
 *  D Komposisi, dekomposisi: Lab Susun-Urai (Susun, Urai, Uang)        + Mesin Susun   + Uang Helen
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanKemasanK4B1A } from "./lab-kemasan-k4b1a";
import type { KeadaanNilaiK4B1B } from "./lab-nilai-k4b1b";
import type { KeadaanBandingK4B1C } from "./lab-banding-k4b1c";
import type { KeadaanSusunK4B1D } from "./lab-susun-k4b1d";

export type KeadaanK4Bab1 = KeadaanKemasanK4B1A | KeadaanNilaiK4B1B | KeadaanBandingK4B1C | KeadaanSusunK4B1D | KeadaanSelesai;
export type HurufMisiK4B1 = "A" | "B" | "C" | "D";

const selesai = (k: KeadaanK4Bab1, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK4Bab1, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));
/** Banyak cara berbeda yang tercatat dengan awalan tertentu. */
const banyakAwalan = (k: KeadaanK4Bab1, alat: string, awalan: string) => (k.alat === alat && "pernah" in k ? k.pernah.filter((p) => p.startsWith(awalan)).length : 0);

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K4B1 = { A: "helen-minimarket", B: "struk-azizah", C: "harga-pasar", D: "uang-helen" } as const;
export const ID_MESIN_K4B1 = { A: "mesin-baca", B: "mesin-nilai", C: "mesin-banding", D: "mesin-susun" } as const;

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

export const daftarMisiK4Bab1 = (huruf: string): DefMisi<KeadaanK4Bab1>[] => (huruf === "B" ? MISI_B : huruf === "C" ? MISI_C : huruf === "D" ? MISI_D : MISI_A);
