/**
 * Data Simulasi Papan Kursi Kelas 4 Bab 3 Sub-Bab B "Barisan Kursi Pak Gunawan", akhir cerita Orkestra Angklung Kampung Senandung.
 * Data berbeda dari Story (kursi dua belas, lima belas, delapan belas dengan beda tambah tiga; nomor tampil empat puluh, tiga puluh lima, tiga puluh dengan beda kurang lima)
 * dan dari tugas CPA. Mind-map dan Infografis memakai data-peta.ts dan data-info.ts. Diuji: scripts/uji-kursi-k4b3b.mjs.
 */
import type { Arah } from "./logika-cpa";

/** Rantai: tiga bilangan pertama tampak, anak melanjutkan rantai sampai baris ke-`sampai`. Sasaran bergantian membesar dan mengecil. */
export type SasaranRantai = { a: number; d: number; arah: Arah; sampai: number };
export const RANTAI_SIM: readonly SasaranRantai[] = [
  { a: 6, d: 7, arah: "naik", sampai: 6 },
  { a: 50, d: 6, arah: "turun", sampai: 6 },
  { a: 2, d: 9, arah: "naik", sampai: 5 },
  { a: 52, d: 9, arah: "turun", sampai: 5 },
];

/** Mesin: dua pasangan masuk dan keluar tampak, anak mengatur aturan (tambah atau kurang, dan besarnya) sampai cocok. */
export type SasaranMesin = { a: number; d: number; arah: Arah };
export const MESIN_SIM: readonly SasaranMesin[] = [
  { a: 6, d: 8, arah: "naik" },
  { a: 45, d: 7, arah: "turun" },
  { a: 3, d: 9, arah: "naik" },
  { a: 38, d: 4, arah: "turun" },
];

/** Tabel: tiga bilangan pertama tampak, anak mengatur banyak lompatan lalu memilih bilangan pada urutan ke-`n`. Tiga pilihan memuat satu bilangan yang benar (n kurang satu lompatan). */
export type SasaranTabel = { a: number; d: number; arah: Arah; n: number; pil: [string, string, string] };
export const TABEL_SIM: readonly SasaranTabel[] = [
  { a: 6, d: 4, arah: "naik", n: 8, pil: ["38", "34", "30"] },
  { a: 55, d: 6, arah: "turun", n: 7, pil: ["25", "13", "19"] },
];

export const MISI_KURSI_TEKS = "Tarik rantai loncat, atur mesin aturan, dan cari bilangan pada tabel urutan. Urutannya bebas.";
