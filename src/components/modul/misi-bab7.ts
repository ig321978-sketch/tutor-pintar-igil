/**
 * Misi dan tantangan bebas Bab 7 (Mengukur Panjang Benda). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas1.mjs.
 *
 * Simulasi bertahap: Sub-Bab A memakai laboratorium A, Sub-Bab B memakai laboratorium gabungan A dan B
 * dan menjadi simulasi pencapaian misi bab ini. Keadaan dilaporkan alat yang sedang dimainkan; misi yang
 * sudah tercapai tidak dicabut lagi (lihat misi-simulasi.ts).
 */

import type { DefMisi } from "./misi-simulasi";
import type { KeadaanLantai } from "./lantai-k1b7b/logika";
import type { KeadaanTukang } from "./tiang-k1b7a/logika";

export type KeadaanBab7 = KeadaanLantai | KeadaanTukang;

/**
 * Sub-Bab A (awal cerita Rumah Pohon Abang): Misi Rumah Pohon bagian satu, Simulasi Meja Tukang (tiang-k1b7a), tanpa satuan baku. Tiang sama dengan
 * TIANG_SIM di tiang-k1b7a/data.ts (oranye, ungu, pink, abu, cokelat; ungu dan abu sama tinggi), diuji di scripts/uji-tiang-k1b7a.mjs.
 */
const tukang = (k: KeadaanBab7): k is KeadaanTukang => k.alat === "tukang";
export const MISI_A: DefMisi<KeadaanBab7>[] = [
  { id: "a-lurus", teks: "Luruskan semua tiang di garis awal yang sama dengan membuang bata.", wajib: true, cek: (k) => tukang(k) && k.sejajar },
  { id: "a-banding", teks: "Bandingkan dua tiang yang sudah berdiri di garis awal yang sama, lalu dengar kata lebihnya.", wajib: true, cek: (k) => tukang(k) && k.bandingTuntas >= 1 },
  { id: "a-tali", teks: "Ambil tali sepanjang satu tiang, lalu bawa tali itu ke tiga tiang lain.", wajib: true, cek: (k) => tukang(k) && k.tali !== null && k.diperiksa.length >= 3 },
  { id: "a-tangga", teks: "Susun semua tiang menjadi tangga dari yang paling pendek.", wajib: true, cek: (k) => tukang(k) && k.urutNaik },
  { id: "a-sama", teks: "Cari dua tiang yang sama tinggi, lalu bandingkan keduanya.", wajib: false, cek: (k) => tukang(k) && k.samaTuntas >= 1 },
  { id: "a-turun", teks: "Susun lagi tangganya dari yang paling tinggi.", wajib: false, cek: (k) => tukang(k) && k.urutTurun },
];

/**
 * Sub-Bab B (penutup bab): Misi Papan Lantai, Simulasi Papan Lantai (lantai-k1b7b), tanpa satuan baku. Benda dan panjang sama dengan
 * BENDA_SIM di lantai-k1b7b/data.ts (tali ayunan, papan bangku, pagar mungil, sisi lantai baru), diuji di scripts/uji-lantai-k1b7b.mjs.
 */
const lantai = (k: KeadaanBab7): k is KeadaanLantai => k.alat === "lantai";
/** Benda di bengkel pada Simulasi Papan Lantai B: panjang dalam satuan sedotan. */
export const PANJANG_LANTAI_B: Record<string, number> = { tali: 12, bangku: 10, pagar: 4, lantai: 12 };
export const SISI_LANTAI_B = "lantai";
export const MISI_B: DefMisi<KeadaanBab7>[] = [
  { id: "b-rapat", teks: "Ukur satu benda dengan satu jenis alat sampai ujung, rapat tanpa celah.", wajib: true, cek: (k) => lantai(k) && k.tuntas.length >= 1 },
  { id: "b-alat", teks: "Ukur benda yang sama dengan sedotan dan tongkat kayu. Lihat alat mana yang angkanya lebih sedikit.", wajib: true, cek: (k) => lantai(k) && k.tuntas.some((t) => k.tuntas.includes(`${t.split(":")[0]}:${t.endsWith(":sedotan") ? "tongkat" : "sedotan"}`)) },
  { id: "b-kira", teks: "Catat perkiraan dulu, lalu ukur sampai ujung dan lihat selisihnya.", wajib: true, cek: (k) => lantai(k) && k.diperiksa >= 1 },
  { id: "b-pesan", teks: "Penutup bab: ukur sisi lantai rumah pohon, lalu pesan papan dengan angka dan nama alatnya.", wajib: true, cek: (k) => lantai(k) && k.pesan !== null && k.tuntas.includes(`${SISI_LANTAI_B}:${k.pesan}`) },
  { id: "b-petak", teks: "Di kertas berpetak, buat pita merah lebih panjang tiga kotak dari pita biru.", wajib: false, cek: (k) => lantai(k) && k.selisihTiga },
  { id: "b-celah", teks: "Coba menaruh satuan dengan celah, lalu baca pesannya.", wajib: false, cek: (k) => lantai(k) && k.celahDicoba >= 1 },
];

export const daftarMisiBab7 = (sub: string): DefMisi<KeadaanBab7>[] => (sub === "B" ? MISI_B : MISI_A);
