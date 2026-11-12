/**
 * Misi dan tantangan bebas Kelas 4 Bab 4 (Pengukuran Luas dan Volume). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k4b4.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Luas   : Lab Luas (Tutup, Kisi, Ubah)       + Mesin Luas   + Meja Lipat Helen
 *  B Volume : Lab Volume (Tuang, Kubus, Takar)   + Mesin Volume + Dapur Helen (pencapaian bab)
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanLuasK4B4A } from "./lab-luas-k4b4a";
import type { KeadaanVolumeK4B4B } from "./lab-volume-k4b4b";

export type KeadaanK4Bab4 = KeadaanLuasK4B4A | KeadaanVolumeK4B4B | KeadaanSelesai;
export type HurufMisiK4B4 = "A" | "B";

const selesai = (k: KeadaanK4Bab4, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK4Bab4, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K4B4 = { A: "meja-helen", B: "dapur-helen" } as const;
export const ID_MESIN_K4B4 = { A: "mesin-luas", B: "mesin-volume" } as const;

export const MISI_A: DefMisi<KeadaanK4Bab4>[] = [
  { id: "a-uang", teks: "Di Tutup, pilih uang kertas dan tutup meja tanpa celah, lalu periksa.", wajib: true, cek: (k) => pernah(k, "luas", "tutup:uang") },
  { id: "a-origami", teks: "Di Tutup, tutup meja yang sama dengan origami. Bandingkan banyaknya.", wajib: true, cek: (k) => pernah(k, "luas", "tutup:origami") },
  { id: "a-tiga-belas", teks: "Di Kisi, arsir satu bangun seluas tiga belas cm² lalu periksa.", wajib: true, cek: (k) => pernah(k, "luas", "kisi:13") },
  { id: "a-pp", teks: "Di Kisi, arsir persegi panjang tiga baris, tiap baris empat persegi, lalu periksa.", wajib: true, cek: (k) => pernah(k, "luas", "pp:3x4") },
  { id: "a-ubah", teks: "Di Ubah, ubah dua m² menjadi cm².", wajib: true, cek: (k) => pernah(k, "luas", "ubah:m2:2") },
  { id: "a-mesin", teks: "Selesaikan Mesin Luas sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K4B4.A) },
  { id: "a-skenario", teks: "Selesaikan skenario Meja Lipat Helen sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K4B4.A) },
  { id: "a-tumpuk", teks: "Di Tutup, coba taruh ubin yang bertumpuk. Baca penjelasan lab.", wajib: false, cek: (k) => pernah(k, "luas", "tumpuk") },
  { id: "a-sama-luas", teks: "Di Kisi, buat dua bangun berbeda bentuk yang sama-sama tiga belas cm².", wajib: false, cek: (k) => pernah(k, "luas", "kisi:13:beda") },
  { id: "a-balik", teks: "Di Ubah, ubah balik tiga puluh ribu cm² menjadi m².", wajib: false, cek: (k) => pernah(k, "luas", "ubah:cm2:3") },
];

export const MISI_B: DefMisi<KeadaanK4Bab4>[] = [
  { id: "b-empat", teks: "Di Tuang, isi botol A sampai penuh dari botol B. Berapa botol B?", wajib: true, cek: (k) => pernah(k, "volume", "penuh:b") },
  { id: "b-sepuluh", teks: "Di Tuang, isi botol A sampai penuh dari botol C.", wajib: true, cek: (k) => pernah(k, "volume", "penuh:c") },
  { id: "b-dua-puluh-empat", teks: "Di Kubus, susun bangun dua lapisan yang berisi dua puluh empat kubus satuan, lalu hitung.", wajib: true, cek: (k) => pernah(k, "volume", "vol:24:lapis:2") },
  { id: "b-sembilan", teks: "Di Kubus, susun satu lapisan berisi sembilan kubus satuan, lalu hitung.", wajib: true, cek: (k) => pernah(k, "volume", "vol:9:lapis:1") },
  { id: "b-liter", teks: "Di Takar, isi gelas takar tepat seribu ml air. Berapa liter?", wajib: true, cek: (k) => pernah(k, "volume", "liter") },
  { id: "b-mesin", teks: "Selesaikan Mesin Volume sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K4B4.B) },
  { id: "b-skenario", teks: "Selesaikan skenario Dapur Helen sampai adegan akhir. Ini misi penutup bab.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K4B4.B) },
  { id: "b-celup", teks: "Di Takar, celupkan balok ke air. Berapa ml muka air naik?", wajib: false, cek: (k) => pernah(k, "volume", "celup") },
  { id: "b-tumpah", teks: "Tuang terus sampai tumpah. Baca penjelasan lab.", wajib: false, cek: (k) => pernah(k, "volume", "tumpah") },
  { id: "b-sanitizer", teks: "Di Tuang, isi botol besar sanitizer dari botol kecil sampai penuh.", wajib: false, cek: (k) => pernah(k, "volume", "penuh:sanitizer") },
];

const DAFTAR: Record<HurufMisiK4B4, DefMisi<KeadaanK4Bab4>[]> = { A: MISI_A, B: MISI_B };
export const daftarMisiK4Bab4 = (huruf: string): DefMisi<KeadaanK4Bab4>[] => DAFTAR[huruf as HurufMisiK4B4] ?? MISI_A;
