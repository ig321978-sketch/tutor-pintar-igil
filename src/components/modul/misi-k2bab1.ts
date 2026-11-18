/**
 * Misi dan tantangan bebas Kelas 2 Bab 1 (Ayo Membilang sampai dengan 50, tema Kue di Kantin Sekolah). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas2.mjs.
 *
 * Sub-Bab A memakai Simulasi Kotak Kue (etalase-k2b1a), Sub-Bab B Meja Kasir (kasir-k2b1b), Sub-Bab C (akhir bab) Meja Pesta (pesta-k2b1c).
 * KERANGKA: agen tiap Sub-Bab mengganti MISI_A / MISI_B / MISI_C dan menambah tipe keadaannya ke union KeadaanK2Bab1.
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi } from "./misi-simulasi";

import type { KeadaanEtalase } from "./etalase-k2b1a/logika";
import type { KeadaanKasir } from "./kasir-k2b1b/logika";
import type { KeadaanPesta } from "./pesta-k2b1c/logika";

export type KeadaanK2Bab1 = { alat: "kerangka" } | KeadaanEtalase | KeadaanKasir | KeadaanPesta;

/**
 * Sub-Bab A (awal cerita Kue di Kantin Sekolah): Misi Kotak Kue, Simulasi Kotak Kue (etalase-k2b1a). Dua puluh tiga pastel, nomor antrean mulai empat puluh satu,
 * dan tiga urutan karcis yang sobek (sama dengan N_KUE_SIM, NOMOR_AWAL_SIM, URUTAN_SIM di etalase-k2b1a/data.ts), berbeda dari Story; diuji di scripts/uji-etalase-k2b1a.mjs.
 */
const etalase = (k: KeadaanK2Bab1): k is KeadaanEtalase => k.alat === "etalase";
export const MISI_A: DefMisi<KeadaanK2Bab1>[] = [
  { id: "a-kemas", teks: "Pindahkan semua kue ke kotak kue sampai tidak ada yang tersisa di meja.", wajib: true, cek: (k) => etalase(k) && k.selesai },
  { id: "a-papan", teks: "Setelah semua kue dikemas, buka papan catatan dan baca banyak kue sebagai puluhan dan satuan.", wajib: true, cek: (k) => etalase(k) && k.papanDilihat },
  { id: "a-antrean", teks: "Panggil nomor antrean maju tiga kali, lalu mundur tiga kali, dan dengar bilangannya.", wajib: true, cek: (k) => etalase(k) && k.maju >= 3 && k.mundur >= 3 },
  { id: "a-urutan", teks: "Lengkapi satu karcis yang sobek dengan nomor yang hilang.", wajib: true, cek: (k) => etalase(k) && k.urutanSelesai.length >= 1 },
  { id: "a-kira", teks: "Perkirakan dulu banyak kue dengan patokan sepuluh, lalu buktikan dengan mengemas semuanya.", wajib: false, cek: (k) => etalase(k) && k.kiraTuntas >= 1 },
  { id: "a-semua", teks: "Lengkapi ketiga urutan karcis yang sobek, yang naik dan yang turun.", wajib: false, cek: (k) => etalase(k) && k.urutanSelesai.length >= 3 },
];

/**
 * Sub-Bab B (tengah cerita): Misi Meja Kasir bagian satu, Simulasi Meja Kasir (kasir-k2b1b). Pesanan contoh di meja (tujuh belas, dua puluh enam, tiga puluh dua,
 * empat puluh lima, lima puluh) dan kartu awal satu dan dua berbeda dari Story; diuji di scripts/uji-kasir-k2b1b.mjs.
 */
const kasir = (k: KeadaanK2Bab1): k is KeadaanKasir => k.alat === "kasir";
export const MISI_B: DefMisi<KeadaanK2Bab1>[] = [
  { id: "b-susun", teks: "Susun satu pesanan di meja dengan kotak penuh dan kue lepas, sampai ada kotak dan ada kue lepas.", wajib: true, cek: (k) => kasir(k) && k.susun },
  { id: "b-kemas", teks: "Kumpulkan sepuluh kue lepas, lalu kemas jadi satu kotak penuh.", wajib: true, cek: (k) => kasir(k) && k.kemas >= 1 },
  { id: "b-tabel", teks: "Buka tabel puluhan dan satuan, lalu baca angka tiap kolom untuk pesananmu.", wajib: true, cek: (k) => kasir(k) && k.tabelDilihat },
  { id: "b-panjang", teks: "Buka bentuk panjang untuk pesananmu, lalu dengarkan puluhan ditambah satuan.", wajib: true, cek: (k) => kasir(k) && k.uraianDilihat },
  { id: "b-tukar", teks: "Tukar kartu angka puluhan dan satuan, lalu dengarkan bilangan barunya dan arti angkanya.", wajib: false, cek: (k) => kasir(k) && k.tukarTuntas >= 1 },
  { id: "b-nol", teks: "Susun bilangan yang hanya punya kotak penuh, lalu lihat angka nol di kolom satuan pada tabel.", wajib: false, cek: (k) => kasir(k) && k.nolDilihat },
];

/**
 * Sub-Bab C (akhir bab, pencapaian misi bab ini): Misi Meja Pesta, Simulasi Meja Pesta (pesta-k2b1c). Nampan di meja sama dengan NAMPAN_SIM
 * di pesta-k2b1c/data.ts (kukis 26, roti 18, pai 44, wafel 36, kue bulan 26, pretzel 39), diuji di scripts/uji-pesta-k2b1c.mjs.
 */
const pesta = (k: KeadaanK2Bab1): k is KeadaanPesta => k.alat === "pesta";
export const MISI_C: DefMisi<KeadaanK2Bab1>[] = [
  { id: "c-taksir", teks: "Perkirakan dulu: pilih patokan terdekat untuk satu nampan sebelum menghitungnya.", wajib: true, cek: (k) => pesta(k) && k.taksir.length >= 1 },
  { id: "c-tabel", teks: "Pilih dua nampan, lalu buka tabel puluhan dan satuan untuk membandingkannya.", wajib: true, cek: (k) => pesta(k) && k.tabelDibuka >= 1 },
  { id: "c-tanda", teks: "Setelah melihat tabel, pasang tanda lebih besar atau lebih kecil yang benar.", wajib: true, cek: (k) => pesta(k) && k.tandaBenar >= 1 },
  { id: "c-urut", teks: "Urutkan tiga nampan dari yang paling sedikit sampai yang paling banyak.", wajib: true, cek: (k) => pesta(k) && k.urutTuntas >= 1 },
  { id: "c-sama", teks: "Cari dua nampan yang sama banyak, lalu pasang tanda sama dengan.", wajib: false, cek: (k) => pesta(k) && k.samaBenar >= 1 },
  { id: "c-tukar", teks: "Tukar sepuluh kue lepas dengan satu kotak sepuluh, lalu lihat jumlah kuenya tetap sama.", wajib: false, cek: (k) => pesta(k) && k.tukar >= 1 },
];

export const daftarMisiK2Bab1 = (sub: string): DefMisi<KeadaanK2Bab1>[] => (sub === "B" ? MISI_B : sub === "C" ? MISI_C : MISI_A);
