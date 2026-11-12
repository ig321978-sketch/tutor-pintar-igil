/**
 * Misi dan tantangan bebas Kelas 4 Bab 2 (Pecahan). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k4b2.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Pecahan pembilang satu  : Lab Pecahan (Bagi, Banding, Garis)       + Mesin Pecahan + Pizza Tiara
 *  B Penyebut sama           : Lab Batang (Baca, Banding, Urut)         + Mesin Batang  + Kebun Slamet
 *  C Pecahan senilai         : Lab Senilai (Model, Ubah, Sederhana)     + Mesin Senilai + Cokelat Helen
 *  D Desimal                 : Lab Desimal (Persepuluhan, Perseratusan, Jembatan) + Mesin Desimal + Roti dan Biskuit Ibu
 *  E Desimal dan persen      : Lab Persen (Kisi, Ubah, Cerita)          + Mesin Persen  + Pameran Pecahan Kelas 4 (pencapaian bab)
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanPecahanK4B2A } from "./lab-pecahan-k4b2a";
import type { KeadaanBatangK4B2B } from "./lab-batang-k4b2b";
import type { KeadaanSenilaiK4B2C } from "./lab-senilai-k4b2c";
import type { KeadaanDesimalK4B2D } from "./lab-desimal-k4b2d";
import type { KeadaanPersenK4B2E } from "./lab-persen-k4b2e";

export type KeadaanK4Bab2 = KeadaanPecahanK4B2A | KeadaanBatangK4B2B | KeadaanSenilaiK4B2C | KeadaanDesimalK4B2D | KeadaanPersenK4B2E | KeadaanSelesai;
export type HurufMisiK4B2 = "A" | "B" | "C" | "D" | "E";

const selesai = (k: KeadaanK4Bab2, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK4Bab2, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K4B2 = { A: "pizza-tiara", B: "kebun-slamet", C: "cokelat-helen", D: "roti-biskuit", E: "pameran-pecahan" } as const;
export const ID_MESIN_K4B2 = { A: "mesin-pecahan", B: "mesin-batang", C: "mesin-senilai", D: "mesin-desimal", E: "mesin-persen" } as const;

export const MISI_A: DefMisi<KeadaanK4Bab2>[] = [
  { id: "a-empat", teks: "Di Bagi, potong pizza menjadi 4 bagian sama besar, lalu arsir satu bagian.", wajib: true, cek: (k) => pernah(k, "pecahan", "unit:4") },
  { id: "a-tidak", teks: "Nyalakan potongan tidak sama besar, lalu coba arsir satu bagian. Baca penjelasan lab.", wajib: true, cek: (k) => pernah(k, "pecahan", "tidak-sama") },
  { id: "a-banding", teks: "Di Banding, bandingkan 1/2 dan 1/4. Mana yang bagiannya lebih besar?", wajib: true, cek: (k) => pernah(k, "pecahan", "pasang:2:4") },
  { id: "a-makin", teks: "Bandingkan 1/5 dan 1/10. Apa yang terjadi pada bagian bila penyebut makin besar?", wajib: true, cek: (k) => pernah(k, "pecahan", "pasang:5:10") },
  { id: "a-garis", teks: "Di Garis, bagi garis menjadi 8 bagian, lalu ketuk tanda yang menunjukkan 1/8.", wajib: true, cek: (k) => pernah(k, "pecahan", "garis:8") },
  { id: "a-mesin", teks: "Selesaikan Mesin Pecahan sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K4B2.A) },
  { id: "a-skenario", teks: "Selesaikan skenario Pizza Tiara sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K4B2.A) },
  { id: "a-sepuluh", teks: "Potong kue menjadi 10 bagian sama besar, lalu arsir satu bagian.", wajib: false, cek: (k) => pernah(k, "pecahan", "unit:10") },
  { id: "a-sama", teks: "Atur kedua model dengan banyak bagian yang sama. Tanda apa yang muncul?", wajib: false, cek: (k) => pernah(k, "pecahan", "tanda:=") },
  { id: "a-dua-belas", teks: "Bagi pizza menjadi 12 bagian sama besar, lalu arsir satu bagian.", wajib: false, cek: (k) => pernah(k, "pecahan", "unit:12") },
];

export const MISI_B: DefMisi<KeadaanK4Bab2>[] = [
  { id: "b-baca", teks: "Di Baca, atur batang menjadi 3/8 dan baca pembilang serta penyebutnya.", wajib: true, cek: (k) => pernah(k, "batang", "baca:3/8") },
  { id: "b-sama", teks: "Di Banding, bandingkan 2/5 dan 4/5 dengan penyebut sama.", wajib: true, cek: (k) => pernah(k, "batang", "pasang:2:4:5") },
  { id: "b-beda", teks: "Ubah penyebut salah satu batang sehingga penyebutnya berbeda. Baca penjelasan lab.", wajib: true, cek: (k) => pernah(k, "batang", "beda-penyebut") },
  { id: "b-urut", teks: "Di Urut, urutkan pecahan berpenyebut 5 dari yang terkecil.", wajib: true, cek: (k) => pernah(k, "batang", "urut:5:naik") },
  { id: "b-tolak", teks: "Di Urut, ketuk pecahan yang bukan terkecil. Baca penjelasan lab.", wajib: true, cek: (k) => pernah(k, "batang", "urut-tolak") },
  { id: "b-mesin", teks: "Selesaikan Mesin Batang sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K4B2.B) },
  { id: "b-skenario", teks: "Selesaikan skenario Kebun Slamet sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K4B2.B) },
  { id: "b-turun", teks: "Urutkan pecahan berpenyebut 6 dari yang terbesar.", wajib: false, cek: (k) => pernah(k, "batang", "urut:6:turun") },
  { id: "b-pembilang-sama", teks: "Buat dua batang yang penyebut dan pembilangnya sama. Tanda apa yang muncul?", wajib: false, cek: (k) => pernah(k, "batang", "tanda:=") },
  { id: "b-enam", teks: "Atur batang menjadi 5/6 pada Baca.", wajib: false, cek: (k) => pernah(k, "batang", "baca:5/6") },
];

export const MISI_C: DefMisi<KeadaanK4Bab2>[] = [
  { id: "c-dua", teks: "Mulai dari 1/3, kalikan pembilang dan penyebut dengan 2. Apakah hasilnya senilai?", wajib: true, cek: (k) => pernah(k, "senilai", "bentuk:1/3:2/6") },
  { id: "c-empat", teks: "Pilih 1/4 dan buat bentuk senilai 4/16.", wajib: true, cek: (k) => pernah(k, "senilai", "bentuk:1/4:4/16") },
  { id: "c-satu", teks: "Dari bentuk yang senilai, ubah pembilang saja atau penyebut saja. Baca penjelasan lab.", wajib: true, cek: (k) => pernah(k, "senilai", "satu-saja") },
  { id: "c-bagi", teks: "Pilih 6/12 dan bagi pembilang dan penyebut dengan 6.", wajib: true, cek: (k) => pernah(k, "senilai", "bagi:6/12:6") },
  { id: "c-sederhana", teks: "Di Sederhana, sederhanakan 4/16 dengan FPB-nya.", wajib: true, cek: (k) => pernah(k, "senilai", "sederhana:4/16") },
  { id: "c-mesin", teks: "Selesaikan Mesin Senilai sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K4B2.C) },
  { id: "c-skenario", teks: "Selesaikan skenario Cokelat Helen sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K4B2.C) },
  { id: "c-sudah", teks: "Pilih 3/4 lalu tekan Sederhanakan. Mengapa sudah paling sederhana?", wajib: false, cek: (k) => pernah(k, "senilai", "sudah-sederhana:3/4") },
  { id: "c-gagal", teks: "Coba bagi dengan bilangan yang tidak membagi pembilang dan penyebut sekaligus. Baca penjelasan lab.", wajib: false, cek: (k) => pernah(k, "senilai", "bagi-gagal") },
  { id: "c-dua-langkah", teks: "Mulai dari 1/3 dan kalikan dua kali dengan 2 sehingga menjadi 4/12.", wajib: false, cek: (k) => pernah(k, "senilai", "bentuk:1/3:4/12") },
];

export const MISI_D: DefMisi<KeadaanK4Bab2>[] = [
  { id: "d-tiga", teks: "Di Persepuluhan, atur batang menjadi 3/10 dan baca desimalnya.", wajib: true, cek: (k) => pernah(k, "desimal", "tenth:3") },
  { id: "d-satu", teks: "Di Perseratusan, atur kisi menjadi 1/100 dan baca desimalnya.", wajib: true, cek: (k) => pernah(k, "desimal", "hundred:1") },
  { id: "d-tujuh", teks: "Atur kisi menjadi 7/100. Mengapa nol setelah koma tetap ditulis?", wajib: true, cek: (k) => pernah(k, "desimal", "hundred:7", "nol-depan:7") },
  { id: "d-dua-lima", teks: "Di Jembatan, atur 25/100 dan baca desimalnya.", wajib: true, cek: (k) => pernah(k, "desimal", "bridge:25/100") },
  { id: "d-satu-angka", teks: "Di Jembatan, atur 5/10. Berapa angka di belakang koma?", wajib: true, cek: (k) => pernah(k, "desimal", "bridge:5/10") },
  { id: "d-mesin", teks: "Selesaikan Mesin Desimal sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K4B2.D) },
  { id: "d-skenario", teks: "Selesaikan skenario Roti dan Biskuit Ibu sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K4B2.D) },
  { id: "d-sepuluh", teks: "Atur kisi menjadi 10 kotak. 0,10 sama dengan desimal apa yang lebih pendek?", wajib: false, cek: (k) => pernah(k, "desimal", "ujung-nol:10") },
  { id: "d-sembilan", teks: "Atur kisi menjadi 99 kotak, bilangan terbesar sebelum satu keseluruhan.", wajib: false, cek: (k) => pernah(k, "desimal", "hundred:99") },
  { id: "d-satu-sepuluh", teks: "Di Persepuluhan, atur batang menjadi 1/10.", wajib: false, cek: (k) => pernah(k, "desimal", "tenth:1") },
];

export const MISI_E: DefMisi<KeadaanK4Bab2>[] = [
  { id: "e-kisi", teks: "Di Kisi, atur 36 kotak dan baca persennya.", wajib: true, cek: (k) => pernah(k, "persen", "kisi:36") },
  { id: "e-dua-cara", teks: "Di Ubah, ubah 0,75 menjadi persen dengan cara biasa dan cara langsung.", wajib: true, cek: (k) => pernah(k, "persen", "cara:75:biasa", "cara:75:langsung") },
  { id: "e-lebih", teks: "Ubah 2,46 menjadi persen. Apakah boleh lebih dari 100%?", wajib: true, cek: (k) => pernah(k, "persen", "lebih:246") },
  { id: "e-balik", teks: "Pilih arah dari persen ke desimal, lalu ubah 18% menjadi desimal.", wajib: true, cek: (k) => pernah(k, "persen", "ke-desimal:18") },
  { id: "e-cerita", teks: "Di Cerita, ubah penyebut 20 dari 50 siswa menjadi seratus lalu baca persennya.", wajib: true, cek: (k) => pernah(k, "persen", "cerita:0") },
  { id: "e-mesin", teks: "Selesaikan Mesin Persen sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K4B2.E) },
  { id: "e-skenario", teks: "Selesaikan skenario Pameran Pecahan Kelas 4 sampai adegan akhir. Ini misi penutup bab.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K4B2.E) },
  { id: "e-lima", teks: "Ubah 0,05 menjadi persen. Mengapa hasilnya hanya 5%?", wajib: false, cek: (k) => pernah(k, "persen", "ke-persen:5") },
  { id: "e-seratus", teks: "Atur kisi sampai 100 kotak. Berapa persen dan berapa desimalnya?", wajib: false, cek: (k) => pernah(k, "persen", "kisi:100") },
  { id: "e-cerita-lain", teks: "Ubah penyebut dua cerita lain (3 dari 20 dan 9 dari 25) menjadi persen.", wajib: false, cek: (k) => pernah(k, "persen", "cerita:1", "cerita:2") },
];

const DAFTAR: Record<HurufMisiK4B2, DefMisi<KeadaanK4Bab2>[]> = { A: MISI_A, B: MISI_B, C: MISI_C, D: MISI_D, E: MISI_E };
export const daftarMisiK4Bab2 = (huruf: string): DefMisi<KeadaanK4Bab2>[] => DAFTAR[huruf as HurufMisiK4B2] ?? MISI_A;
