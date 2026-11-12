/**
 * Misi dan tantangan bebas Kelas 4 Bab 5 (Bangun Datar). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k4b5.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat: lab, mesin, skenario).
 *  A Ciri  : Lab Ciri (Paku, Pilah, Kenali)    + Mesin Ciri       + Papan Paku Helen
 *  B Susun : Lab Susun (Susun, Urai, Tangram) + Mesin Susun-Urai + Bengkel Kertas Helen (pencapaian bab)
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanCiriK4B5A } from "./lab-ciri-k4b5a";
import type { KeadaanSusunK4B5B } from "./lab-susun-k4b5b";

export type KeadaanK4Bab5 = KeadaanCiriK4B5A | KeadaanSusunK4B5B | KeadaanSelesai;
export type HurufMisiK4B5 = "A" | "B";

const selesai = (k: KeadaanK4Bab5, id: string) => k.alat === "selesai" && k.id === id;
/** Riwayat alat tertentu memuat semua id. */
const pernah = (k: KeadaanK4Bab5, alat: string, ...id: string[]) => k.alat === alat && "pernah" in k && id.every((p) => k.pernah.includes(p));

/** Id yang dilaporkan skenario dan mesin saat tuntas. */
export const ID_SKENARIO_K4B5 = { A: "paku-helen", B: "bengkel-helen" } as const;
export const ID_MESIN_K4B5 = { A: "mesin-ciri", B: "mesin-susun" } as const;
/** Riwayat alat memuat id yang cocok dengan pola. */
const pernahPola = (k: KeadaanK4Bab5, alat: string, pola: RegExp) => k.alat === alat && "pernah" in k && k.pernah.some((p) => pola.test(p));

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

export const MISI_B: DefMisi<KeadaanK4Bab5>[] = [
  { id: "b-persegi", teks: "Di Susun, susun dua keping segitiga menjadi persegi, lalu periksa.", wajib: true, cek: (k) => pernah(k, "susun", "susun:persegi:2-0") },
  { id: "b-jajargenjang", teks: "Di Susun, susun dua keping segitiga menjadi jajargenjang, lalu periksa.", wajib: true, cek: (k) => pernah(k, "susun", "susun:jajargenjang:2-0") },
  { id: "b-trapesium", teks: "Di Susun, susun tiga keping segitiga menjadi trapesium, lalu periksa.", wajib: true, cek: (k) => pernah(k, "susun", "susun:trapesium:3-0") },
  { id: "b-segienam", teks: "Di Urai, urai segienam beraturan menjadi enam segitiga, lalu periksa.", wajib: true, cek: (k) => pernah(k, "susun", "urai:segienam:6-segitiga") },
  { id: "b-tangram", teks: "Di Tangram, tutup siluet segitiga besar dengan lebih dari satu keping.", wajib: true, cek: (k) => pernahPola(k, "susun", /^tangram:segitiga:([2-7])$/) },
  { id: "b-mesin", teks: "Selesaikan Mesin Susun-Urai sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K4B5.B) },
  { id: "b-skenario", teks: "Selesaikan skenario Bengkel Kertas Helen sampai adegan akhir. Ini misi penutup bab.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K4B5.B) },
  { id: "b-dua-cara", teks: "Di Urai, urai persegi dengan dua cara: menjadi dua segitiga dan menjadi dua persegi panjang.", wajib: false, cek: (k) => pernah(k, "susun", "urai:persegi:2-segitiga", "urai:persegi:2-persegi-panjang") },
  { id: "b-tumpuk", teks: "Coba taruh keping yang bertumpuk. Baca penjelasan lab.", wajib: false, cek: (k) => pernah(k, "susun", "tumpuk") },
  { id: "b-tujuh", teks: "Di Tangram, tutup siluet persegi besar dengan ketujuh keping.", wajib: false, cek: (k) => pernah(k, "susun", "tangram:persegi-besar:7") },
];

const DAFTAR: Record<HurufMisiK4B5, DefMisi<KeadaanK4Bab5>[]> = { A: MISI_A, B: MISI_B };
export const daftarMisiK4Bab5 = (huruf: string): DefMisi<KeadaanK4Bab5>[] => DAFTAR[huruf as HurufMisiK4B5] ?? MISI_A;
