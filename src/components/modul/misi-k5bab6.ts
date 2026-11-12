/**
 * Misi dan tantangan bebas Kelas 5 Bab 6 (Sudut). Murni: tanpa React, tanpa jaringan.
 * Diuji langsung di scripts/uji-lab-k5b6.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Pojok : Lab Pojok (Lipat, Banding, Detektif) + Mesin Pojok + Bingkai Pak Tukang
 *  B Sudut : Lab Sudut (Bagian, Jenis, Jam) + Mesin Sudut + Yohana dan Kotak Pensil
 *  C Busur : Lab Busur (Pasang, Baca, Patokan) + Mesin Busur + Kipas Tari Pakarena
 *  D Lukis : Lab Lukis (Lukis, Cek, Hubung) + Mesin Lukis + Studio Sudut Bu Ratna
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanPojokK5B6A } from "./lab-pojok-k5b6a";
import type { KeadaanSudutK5B6B } from "./lab-sudut-k5b6b";
import type { KeadaanBusurK5B6C } from "./lab-busur-k5b6c";
import type { KeadaanLukisK5B6D } from "./lab-lukis-k5b6d";

export type KeadaanK5Bab6 = KeadaanPojokK5B6A | KeadaanSudutK5B6B | KeadaanBusurK5B6C | KeadaanLukisK5B6D | KeadaanSelesai;
export type HurufMisiK5B6 = "A" | "B" | "C" | "D";

const selesai = (k: KeadaanK5Bab6, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK5Bab6, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K5B6 = { A: "tukang-bingkai", B: "yohana-pensil", C: "pakarena", D: "studio-sudut" } as const;
export const ID_MESIN_K5B6 = { A: "mesin-pojok", B: "mesin-sudut", C: "mesin-busur", D: "mesin-lukis" } as const;

export const MISI_A: DefMisi<KeadaanK5Bab6>[] = [
  { id: "a-lipat", teks: "Di Lipat, lipat kertas dua kali sampai lipatan kedua menimpa lipatan pertama dengan rapi. Pojoknya menjadi patokan siku-siku.", wajib: true, cek: (k) => pernah(k, "pojok", "lipat:0") },
  { id: "a-banding-siku", teks: "Di Banding, tempelkan patokan ke pojok buku, pojok bingkai foto, dan pojok ubin lantai. Pilih siku-siku untuk ketiganya.", wajib: true, cek: (k) => pernah(k, "pojok", "banding:0", "banding:1", "banding:2") },
  { id: "a-banding-lancip", teks: "Di Banding, tempelkan patokan ke ujung gunting yang terbuka, lalu pilih lebih sempit dari patokan, yaitu lancip.", wajib: true, cek: (k) => pernah(k, "pojok", "banding:3") },
  { id: "a-banding-tumpul", teks: "Di Banding, tempelkan patokan ke bukaan kipas lipat, lalu pilih lebih lebar dari patokan, yaitu tumpul.", wajib: true, cek: (k) => pernah(k, "pojok", "banding:4") },
  { id: "a-detektif", teks: "Di Detektif, periksa keenam pojok benda dengan patokan, lalu pilah mana yang siku-siku dan mana yang bukan.", wajib: true, cek: (k) => pernah(k, "pojok", "detektif:0", "detektif:1", "detektif:2", "detektif:3", "detektif:4", "detektif:5") },
  { id: "a-mesin", teks: "Selesaikan Mesin Pojok sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K5B6.A) },
  { id: "a-skenario", teks: "Selesaikan skenario Bingkai Pak Tukang sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K5B6.A) },
  { id: "a-lipat-koran", teks: "Di Lipat, buat patokan siku-siku sekali lagi dari kertas koran.", wajib: false, cek: (k) => pernah(k, "pojok", "lipat:1") },
  { id: "a-banding-atap", teks: "Di Banding, tempelkan patokan ke pojok atap rumah, lalu pilih jenisnya.", wajib: false, cek: (k) => pernah(k, "pojok", "banding:5") },
  { id: "a-banding-semua", teks: "Di Banding, bandingkan keenam pojok benda dengan patokan sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "pojok", "banding:0", "banding:1", "banding:2", "banding:3", "banding:4", "banding:5") },
];

export const MISI_B: DefMisi<KeadaanK5Bab6>[] = [
  { id: "b-bagian", teks: "Di Bagian, namai bagian yang disorot pada huruf V satu per satu sampai lengkap: titik sudut, dua kaki sudut, dan daerah sudut.", wajib: true, cek: (k) => pernah(k, "sudut", "bagian:0") },
  { id: "b-lancip", teks: "Di Jenis, buka atau tutup kaki sudut sampai lebih sempit dari patokan, lalu cek. Itu sudut lancip.", wajib: true, cek: (k) => pernah(k, "sudut", "jenis:lancip") },
  { id: "b-siku", teks: "Di Jenis, atur kaki sudut sampai tepat berimpit dengan patokan, lalu cek. Itu sudut siku-siku.", wajib: true, cek: (k) => pernah(k, "sudut", "jenis:siku") },
  { id: "b-tumpul", teks: "Di Jenis, buka kaki sudut sampai lebih lebar dari patokan, lalu cek. Itu sudut tumpul.", wajib: true, cek: (k) => pernah(k, "sudut", "jenis:tumpul") },
  { id: "b-jam", teks: "Di Jam, tentukan jenis sudut antara jarum pendek dan jarum panjang pada pukul dua.", wajib: true, cek: (k) => pernah(k, "sudut", "jam:0") },
  { id: "b-mesin", teks: "Selesaikan Mesin Sudut sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K5B6.B) },
  { id: "b-skenario", teks: "Selesaikan skenario Yohana dan Kotak Pensil sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K5B6.B) },
  { id: "b-bagian-dua", teks: "Di Bagian, namai semua bagian yang disorot pada gunting terbuka.", wajib: false, cek: (k) => pernah(k, "sudut", "bagian:1") },
  { id: "b-jam-siku", teks: "Di Jam, tentukan jenis sudut antara kedua jarum pada pukul tiga.", wajib: false, cek: (k) => pernah(k, "sudut", "jam:1") },
  { id: "b-jam-tumpul", teks: "Di Jam, tentukan jenis sudut antara kedua jarum pada pukul empat.", wajib: false, cek: (k) => pernah(k, "sudut", "jam:2") },
];

export const MISI_C: DefMisi<KeadaanK5Bab6>[] = [
  { id: "c-pasang", teks: "Di Pasang, geser dan putar busur pada sudut kipas Pakarena sampai pusatnya tepat di titik sudut dan garis dasarnya berimpit dengan kaki pertama, lalu periksa.", wajib: true, cek: (k) => pernah(k, "busur", "pasang:0") },
  { id: "c-baca-kanan", teks: "Di Baca, pilih skala yang mulai dari nol di kaki pertama, lalu baca angka kaki kedua pada kipas Pakarena dan atap rumah, yang kaki pertamanya di sisi kanan.", wajib: true, cek: (k) => pernah(k, "busur", "baca:0", "baca:2") },
  { id: "c-baca-kiri", teks: "Di Baca, baca sudut pintu lemari yang kaki pertamanya di sisi kiri, dengan skala yang mulai dari nol di sisi kiri.", wajib: true, cek: (k) => pernah(k, "busur", "baca:1") },
  { id: "c-patokan", teks: "Di Patokan, namai sudut berukuran nol, siku-siku, lurus, dan penuh, yaitu patokan 0°, 90°, 180°, dan 360°.", wajib: true, cek: (k) => pernah(k, "busur", "patokan:0", "patokan:2", "patokan:4", "patokan:6") },
  { id: "c-releks", teks: "Di Patokan, namai sudut berukuran 270°. Ukuran itu lebih dari 180° dan kurang dari 360°, jadi bukan tumpul.", wajib: true, cek: (k) => pernah(k, "busur", "patokan:5") },
  { id: "c-mesin", teks: "Selesaikan Mesin Busur sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K5B6.C) },
  { id: "c-skenario", teks: "Selesaikan skenario Kipas Tari Pakarena sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K5B6.C) },
  { id: "c-pasang-jam", teks: "Di Pasang, pasang busur dengan benar pada sudut jarum jam, lalu periksa.", wajib: false, cek: (k) => pernah(k, "busur", "pasang:1") },
  { id: "c-pasang-lipat", teks: "Di Pasang, pasang busur dengan benar pada sudut lipatan kertas, lalu periksa.", wajib: false, cek: (k) => pernah(k, "busur", "pasang:2") },
  { id: "c-patokan-semua", teks: "Di Patokan, namai ketujuh sudut sampai semuanya benar.", wajib: false, cek: (k) => pernah(k, "busur", "patokan:0", "patokan:1", "patokan:2", "patokan:3", "patokan:4", "patokan:5", "patokan:6") },
];

export const MISI_D: DefMisi<KeadaanK5Bab6>[] = [
  { id: "d-lukis-lancip", teks: "Di Lukis, lukis sudut 30° dan sudut 75° dengan urutan yang benar: titik sudut dan kaki pertama, pasang busur, tandai angka, gambar kaki kedua.", wajib: true, cek: (k) => pernah(k, "lukis", "lukis:0", "lukis:1") },
  { id: "d-lukis-tumpul", teks: "Di Lukis, lukis sudut 110° dan sudut 140° dengan urutan yang benar, dengan tanda di angka target pada skala yang mulai dari nol di kaki pertama.", wajib: true, cek: (k) => pernah(k, "lukis", "lukis:2", "lukis:4") },
  { id: "d-cek", teks: "Di Cek, ukur ulang lukisan target 75° dan putuskan cocok, karena hasil ukur ulangnya sama dengan target.", wajib: true, cek: (k) => pernah(k, "lukis", "cek:0") },
  { id: "d-pusat", teks: "Di Cek, kenali lukisan yang meleset karena pusat busur tidak tepat di titik sudut: putuskan meleset, lalu pilih sebabnya.", wajib: true, cek: (k) => pernah(k, "lukis", "cek:2") },
  { id: "d-jenis", teks: "Di Hubung, pilih ukuran yang menghasilkan sudut lancip, sudut siku-siku, dan sudut tumpul.", wajib: true, cek: (k) => pernah(k, "lukis", "hubung:0", "hubung:1", "hubung:2") },
  { id: "d-mesin", teks: "Selesaikan Mesin Lukis sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K5B6.D) },
  { id: "d-skenario", teks: "Selesaikan skenario Studio Sudut Bu Ratna sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K5B6.D) },
  { id: "d-lukis-lima", teks: "Di Lukis, lukis sudut 52° dengan urutan yang benar.", wajib: false, cek: (k) => pernah(k, "lukis", "lukis:3") },
  { id: "d-cek-skala", teks: "Di Cek, kenali lukisan target 110° yang meleset karena salah memilih skala.", wajib: false, cek: (k) => pernah(k, "lukis", "cek:1") },
  { id: "d-cek-dasar", teks: "Di Cek, kenali lukisan target 130° yang meleset karena garis dasar busur tidak berimpit dengan kaki pertama.", wajib: false, cek: (k) => pernah(k, "lukis", "cek:3") },
];

const DAFTAR: Record<HurufMisiK5B6, DefMisi<KeadaanK5Bab6>[]> = { A: MISI_A, B: MISI_B, C: MISI_C, D: MISI_D };
export const daftarMisiK5Bab6 = (huruf: string): DefMisi<KeadaanK5Bab6>[] => DAFTAR[huruf as HurufMisiK5B6] ?? MISI_A;
