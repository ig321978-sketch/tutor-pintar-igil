/**
 * Data Simulasi Lintasan Lomba Kelas 3 Bab 4 Sub-Bab C "Lintasan Pak Samsul" (garis tegak lurus, garis sejajar, dan bangun datar sederhana), akhir cerita Festival Layang-layang Kampung.
 * Berbeda dari Story (Story memakai tiang dan tanah A, B, C, tali E F G H berjarak tiga petak, tali yang melebar dua petak dan empat petak, panji segitiga, papan persegi panjang, spanduk bundar)
 * dan dari tugas CPA. Mind-map dan Infografis memakai data kartu (data-kartu.ts). Diuji: scripts/uji-lintasan-k3b4c.mjs.
 */
import type { Bentuk } from "./logika-cpa";

/** Tegak lurus: sudut awal tali kedua (derajat dari tali pertama); anak memutar sampai tepat siku-siku. Kelipatan lima belas, bukan sembilan puluh. */
export const AWAL_TEGAK: readonly number[] = [60, 135, 45];
/** Sejajar: jarak tali kedua di ujung kiri (petak, tetap), jarak awal di ujung kanan, dan kemiringan tali pertama (petak turun ke kanan). Awalnya jarak kedua ujung berbeda. */
export const AWAL_SEJAJAR: readonly { kiri: number; kanan: number; miring: number }[] = [
  { kiri: 2, kanan: 5, miring: 1 },
  { kiri: 4, kanan: 1, miring: 0 },
  { kiri: 1, kanan: 3, miring: 2 },
];
/** Tanda: sepasang tali pada kertas petak atau dua garis yang bertemu. Hubungannya dihitung dari data. */
export type PasangTanda = { jenis: "tali"; kiri: number; kanan: number; miring: number } | { jenis: "temu"; sudut: number };
export const PASANGAN_TANDA: readonly PasangTanda[] = [
  { jenis: "temu", sudut: 120 },
  { jenis: "tali", kiri: 3, kanan: 3, miring: 1 },
  { jenis: "temu", sudut: 90 },
  { jenis: "tali", kiri: 1, kanan: 4, miring: 0 },
];
/** Rakit bangun: bangun sasaran beserta petunjuk cirinya (tanpa menyebut nama). */
export const TARGET_BANGUN: readonly { bentuk: Bentuk; ciri: string }[] = [
  { bentuk: "persegiPanjang", ciri: "empat sisi, empat sudut siku-siku, dan sisinya tidak sama panjang" },
  { bentuk: "segitiga", ciri: "tiga sisi dan tiga sudut" },
  { bentuk: "persegi", ciri: "empat sisi yang sama panjang dan empat sudut siku-siku" },
  { bentuk: "lingkaran", ciri: "dibatasi satu garis lengkung dan tidak punya sudut" },
];

export const MISI_LINTASAN_TEKS = "Putar tali sampai tegak lurus, geser tali sampai sejajar, tandai pasangan tali, lalu rakit bangun dari batang. Urutannya bebas.";
