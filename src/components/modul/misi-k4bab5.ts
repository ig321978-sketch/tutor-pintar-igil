/**
 * Misi dan tantangan bebas Kelas 4 Bab 5 (Bangun Datar). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k4b5.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Ciri : Lab Ciri (Paku, Pilah, Kenali) + Mesin Ciri + Papan Paku Helen
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanCiriK4B5A } from "./lab-ciri-k4b5a";

export type KeadaanK4Bab5 = KeadaanCiriK4B5A | KeadaanSelesai;
export type HurufMisiK4B5 = "A";

const selesai = (k: KeadaanK4Bab5, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK4Bab5, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K4B5 = { A: "paku-helen" } as const;
export const ID_MESIN_K4B5 = { A: "mesin-ciri" } as const;

export const MISI_A: DefMisi<KeadaanK4Bab5>[] = [
  { id: "a-kenali", teks: "Di Kenali, kelompokkan semua gambar: bukan segi banyak, segitiga, segiempat, segilima, atau segienam.", wajib: true, cek: (k) => pernah(k, "ciri", "kenali") },
  { id: "a-siku", teks: "Di Paku, bentuk segitiga siku-siku dengan karet, lalu tutup karetnya.", wajib: true, cek: (k) => pernah(k, "ciri", "paku:segitiga-siku") },
  { id: "a-persegi", teks: "Di Paku, bentuk persegi: semua sisi sama panjang dan semua sudut siku-siku.", wajib: true, cek: (k) => pernah(k, "ciri", "paku:persegi") },
  { id: "a-trapesium", teks: "Di Paku, bentuk trapesium: tepat satu pasang sisi sejajar.", wajib: true, cek: (k) => pernah(k, "ciri", "paku:trapesium") },
  { id: "a-pilah-sudut", teks: "Di Pilah, kelompokkan enam segitiga menurut sudutnya tanpa salah.", wajib: true, cek: (k) => pernah(k, "ciri", "pilah:sudut") },
  { id: "a-mesin", teks: "Selesaikan Mesin Ciri sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K4B5.A) },
  { id: "a-skenario", teks: "Selesaikan skenario Papan Paku Helen sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K4B5.A) },
  { id: "a-belah", teks: "Di Paku, bentuk belah ketupat yang sudutnya bukan siku-siku.", wajib: false, cek: (k) => pernah(k, "ciri", "paku:belah-ketupat") },
  { id: "a-segaris", teks: "Di Paku, coba pasang karet di tiga paku segaris. Baca penjelasan lab.", wajib: false, cek: (k) => pernah(k, "ciri", "segaris") },
  { id: "a-pilah-sisi", teks: "Di Pilah, kelompokkan enam segitiga menurut sisinya tanpa salah.", wajib: false, cek: (k) => pernah(k, "ciri", "pilah:sisi") },
];

const DAFTAR: Record<HurufMisiK4B5, DefMisi<KeadaanK4Bab5>[]> = { A: MISI_A };
export const daftarMisiK4Bab5 = (huruf: string): DefMisi<KeadaanK4Bab5>[] => DAFTAR[huruf as HurufMisiK4B5] ?? MISI_A;
