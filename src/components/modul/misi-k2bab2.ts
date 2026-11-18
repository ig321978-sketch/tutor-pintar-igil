/**
 * Misi dan tantangan bebas Kelas 2 Bab 2 (Penjumlahan dan Pengurangan sampai dua puluh, tema Toko Seragam dan Alat Tulis Sekolah). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas2.mjs.
 *
 * Sub-Bab A memakai Simulasi Kardus Kiriman (gudang-k2b2a), Sub-Bab B Meja Stok (stok-k2b2b), Sub-Bab C (akhir bab) Meja Pesanan Besar (pembukaan-k2b2c).
 * KERANGKA: agen tiap Sub-Bab mengganti MISI_A / MISI_B / MISI_C (empat wajib dan dua bebas).
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi } from "./misi-simulasi";

import type { KeadaanGudang } from "./gudang-k2b2a/logika";
import type { KeadaanStok } from "./stok-k2b2b/logika";
import type { KeadaanPembukaan } from "./pembukaan-k2b2c/logika";

export type KeadaanK2Bab2 = { alat: "kerangka" } | KeadaanGudang | KeadaanStok | KeadaanPembukaan;

/**
 * Sub-Bab A (awal cerita Toko Seragam dan Alat Tulis Sekolah): Misi Kardus Kiriman, Simulasi Kardus Kiriman (gudang-k2b2a). Tiga tugas di meja (dua belas dan lima, empat belas dan enam,
 * enam belas dan tiga; sama dengan TUGAS_SIM di gudang-k2b2a/data.ts), berbeda dari Story; diuji di scripts/uji-gudang-k2b2a.mjs.
 */
const gudang = (k: KeadaanK2Bab2): k is KeadaanGudang => k.alat === "gudang";
export const MISI_A: DefMisi<KeadaanK2Bab2>[] = [
  { id: "a-gabung", teks: "Gabungkan dua kardus, lalu dengarkan jumlah semua isinya.", wajib: true, cek: (k) => gudang(k) && k.digabung.length >= 1 },
  { id: "a-jalur", teks: "Hitung maju di jalur bilangan, mulai dari bilangan yang besar sampai berhenti di jumlahnya.", wajib: true, cek: (k) => gudang(k) && k.jalurTuntas.length >= 1 },
  { id: "a-pasangan", teks: "Pecah bilangan yang besar menjadi pasangan, lalu jumlahkan sampai hasilnya muncul.", wajib: true, cek: (k) => gudang(k) && k.pasanganTuntas.length >= 1 },
  { id: "a-tabel", teks: "Susun kedua bilangan di tabel puluhan dan satuan, lalu jumlahkan satuan dan puluhannya.", wajib: true, cek: (k) => gudang(k) && k.tabelTuntas.length >= 1 },
  { id: "a-tukar", teks: "Pilih kardus yang satuannya penuh, lalu tukar sepuluh satuan menjadi satu puluhan.", wajib: false, cek: (k) => gudang(k) && k.tukarTuntas.length >= 1 },
  {
    id: "a-sama",
    teks: "Hitung satu kardus dengan dua cara yang berbeda, lalu lihat hasilnya sama.",
    wajib: false,
    cek: (k) => gudang(k) && [0, 1, 2].some((i) => [k.jalurTuntas, k.pasanganTuntas, k.tabelTuntas].filter((d) => d.includes(i)).length >= 2),
  },
];

/**
 * Sub-Bab B (tengah cerita): Misi Meja Stok bagian satu, Simulasi Meja Stok (stok-k2b2b). Contoh stok di meja (delapan belas dan sebelas, enam belas dan tujuh,
 * dua puluh dan enam, tiga belas dan tiga) berbeda dari Story; diuji di scripts/uji-stok-k2b2b.mjs.
 */
const stok = (k: KeadaanK2Bab2): k is KeadaanStok => k.alat === "stok";
export const MISI_B: DefMisi<KeadaanK2Bab2>[] = [
  { id: "b-pasang", teks: "Pasangkan topi dan dasi satu-satu sampai semuanya berpasangan, lalu lihat selisihnya.", wajib: true, cek: (k) => stok(k) && k.selisihDilihat },
  { id: "b-kurang", teks: "Kurangi stok dengan mengambil barang yang terjual satu per satu, sampai kartu stok menunjukkan sisanya.", wajib: true, cek: (k) => stok(k) && k.kurangTuntas >= 1 },
  { id: "b-buka", teks: "Pilih contoh yang barang lepasnya tidak cukup, buka satu puluhan, lalu selesaikan pengurangannya.", wajib: true, cek: (k) => stok(k) && k.bukaTuntas >= 1 },
  { id: "b-periksa", teks: "Setelah mengurangi, periksa hasilnya dengan penjumlahan sampai kartu stok cocok.", wajib: true, cek: (k) => stok(k) && k.periksaTuntas >= 1 },
  { id: "b-keluarga", teks: "Buka keempat kalimat dari satu keluarga bilangan: dua penjumlahan dan dua pengurangan.", wajib: false, cek: (k) => stok(k) && k.keluargaTuntas },
  { id: "b-sepuluh", teks: "Coba Kurangi dari Sepuluh: kurangi dari sepuluh dulu, lalu tambahkan sisanya.", wajib: false, cek: (k) => stok(k) && k.sepuluhTuntas },
];

/**
 * Sub-Bab C (akhir bab, pencapaian misi bab ini): Misi Meja Pesanan, Simulasi Meja Pesanan Besar (pembukaan-k2b2c). Kertas pesanan sama dengan SLIP_SIM
 * di pembukaan-k2b2c/data.ts (topi 5 dan dasi 8, tas 16 dan kotak pensil 9, baju 8 dan topi 5, gunting 14 dan klip 6), tiga bilangan 4, 9, 6, dan baju tinggal 6 setelah 8 diambil;
 * diuji di scripts/uji-pembukaan-k2b2c.mjs.
 */
const pembukaan = (k: KeadaanK2Bab2): k is KeadaanPembukaan => k.alat === "pembukaan";
export const MISI_C: DefMisi<KeadaanK2Bab2>[] = [
  { id: "c-kata", teks: "Pasangkan dua kata petunjuk yang berbeda dengan tanda tambah atau kurang yang cocok.", wajib: true, cek: (k) => pembukaan(k) && k.kataBenar.length >= 2 },
  { id: "c-langkah", teks: "Susun empat langkah cerita berurutan: diketahui, ditanya, solusi, dan kesimpulan.", wajib: true, cek: (k) => pembukaan(k) && k.langkahTuntas >= 1 },
  { id: "c-tiga", teks: "Jumlahkan tiga bilangan: pilih dua bilangan lebih dulu, lalu jumlahkan dengan bilangan ketiga.", wajib: true, cek: (k) => pembukaan(k) && k.tigaTuntas >= 1 },
  { id: "c-awal", teks: "Cari bilangan awal dengan membalik langkah: pilih tanda yang cocok untuk benda yang tadi diambil.", wajib: true, cek: (k) => pembukaan(k) && k.awalTuntas >= 1 },
  { id: "c-buat", teks: "Susun satu cerita hitungan buatanmu sendiri, lalu lihat jawabannya.", wajib: false, cek: (k) => pembukaan(k) && k.buatTuntas >= 1 },
  { id: "c-semua", teks: "Pasangkan keempat kata petunjuk, yaitu lebihnya, kurangnya, selisih, dan jumlah, dengan tanda yang cocok.", wajib: false, cek: (k) => pembukaan(k) && k.kataBenar.length >= 4 },
];

export const daftarMisiK2Bab2 = (sub: string): DefMisi<KeadaanK2Bab2>[] => (sub === "B" ? MISI_B : sub === "C" ? MISI_C : MISI_A);
