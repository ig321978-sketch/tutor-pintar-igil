/**
 * Misi dan tantangan bebas Kelas 2 Bab 3 (Bentuk di Sekitar Kita, tema Taman Bermain Sekolah). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas2.mjs.
 *
 * Sub-Bab A memakai Simulasi Petak Ubin (ubin-k2b3a), Sub-Bab B Papan Puzzle (puzzle-k2b3b), Sub-Bab C (akhir bab) Gudang Mainan (gudang-k2b3c).
 * KERANGKA: agen tiap Sub-Bab mengganti MISI_A / MISI_B / MISI_C dan menambah tipe keadaannya ke union KeadaanK2Bab3.
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi } from "./misi-simulasi";

import type { KeadaanUbin } from "./ubin-k2b3a/logika";
import type { KeadaanPuzzle } from "./puzzle-k2b3b/logika";
import type { KeadaanGudang } from "./gudang-k2b3c/logika";

export type KeadaanK2Bab3 = { alat: "kerangka" } | KeadaanUbin | KeadaanPuzzle | KeadaanGudang;

/**
 * Sub-Bab A (awal cerita Taman Bermain Sekolah): Misi Petak Ubin, Simulasi Petak Ubin (ubin-k2b3a). Tujuh ubin keranjang sama dengan UBIN_SIM di
 * ubin-k2b3a/data-peta.ts (bendera, layang-layang, pos jaga, kolam bata, papan petunjuk, roda ayun, kolam oval), berbeda dari Story; nomor ubin enam sisi
 * ke atas: 3 (kolam bata) dan 4 (papan petunjuk). Diuji di scripts/uji-ubin-k2b3a.mjs.
 */
const ubin = (k: KeadaanK2Bab3): k is KeadaanUbin => k.alat === "ubin";
export const MISI_A: DefMisi<KeadaanK2Bab3>[] = [
  { id: "a-hitung", teks: "Pegang satu ubin bertepi lurus, lalu hitung sisinya berputar mulai dari tanda awal sampai selesai.", wajib: true, cek: (k) => ubin(k) && k.dihitung.length >= 1 },
  { id: "a-nama", teks: "Setelah sisinya terhitung, lihat nama bentuk ubin itu.", wajib: true, cek: (k) => ubin(k) && k.namaDilihat.length >= 1 },
  { id: "a-pilah", teks: "Pilah satu ubin tepi lurus ke keranjang kuning dan satu ubin tepi lengkung ke keranjang hijau.", wajib: true, cek: (k) => ubin(k) && k.kuning.length >= 1 && k.hijau.length >= 1 },
  { id: "a-pasang", teks: "Pasang tiga ubin pada petak papan permainan yang bentuknya tepat.", wajib: true, cek: (k) => ubin(k) && k.dipasang.length >= 3 },
  { id: "a-semua", teks: "Isi semua petak papan permainan sampai tidak ada yang kosong.", wajib: false, cek: (k) => ubin(k) && k.dipasang.length >= 7 },
  { id: "a-banyak", teks: "Hitung sisi ubin yang sisinya lebih dari lima, lalu lihat namanya.", wajib: false, cek: (k) => ubin(k) && k.dihitung.some((i) => (i === 3 || i === 4) && k.namaDilihat.includes(i)) },
];

/**
 * Sub-Bab B (tengah cerita): Misi Papan Puzzle bagian satu, Simulasi Papan Puzzle (puzzle-k2b3b). Segi lima, persegi, dan segi enam untuk diurai, tiga bayangan
 * (enam segitiga, atas dan bawah, segitiga besar), dan tangram tujuh keping; berbeda dari Story. Diuji di scripts/uji-puzzle-k2b3b.mjs.
 */
const puzzle = (k: KeadaanK2Bab3): k is KeadaanPuzzle => k.alat === "puzzle";
export const MISI_B: DefMisi<KeadaanK2Bab3>[] = [
  { id: "b-pojok", teks: "Urai segi lima dengan garis dari satu pojok, lalu lihat banyak segitiga hasilnya.", wajib: true, cek: (k) => puzzle(k) && k.uraiDilihat.includes("5-pojok") },
  { id: "b-pusat", teks: "Urai segi lima yang sama dengan garis dari titik tengah, lalu bandingkan banyak segitiganya.", wajib: true, cek: (k) => puzzle(k) && k.uraiDilihat.includes("5-pusat") },
  { id: "b-susun", teks: "Susun semua keping pada satu bayangan sampai penuh, tanpa bertumpuk.", wajib: true, cek: (k) => puzzle(k) && k.susunTuntas.length >= 1 },
  { id: "b-tangram", teks: "Pasang ketujuh keping tangram sampai persegi besar terisi penuh.", wajib: true, cek: (k) => puzzle(k) && k.tangramTuntas },
  { id: "b-tumpuk", teks: "Coba menumpuk keping, lalu lihat mengapa keping tidak boleh bertumpuk.", wajib: false, cek: (k) => puzzle(k) && k.tumpuk >= 1 },
  { id: "b-semua", teks: "Susun ketiga bayangan yang berbeda sampai semuanya penuh.", wajib: false, cek: (k) => puzzle(k) && k.susunTuntas.length >= 3 },
];

/**
 * Sub-Bab C (akhir bab, pencapaian misi bab ini): Misi Gudang Mainan, Simulasi Gudang Mainan (gudang-k2b3c). Benda di gudang sama dengan BENDA_SIM di
 * gudang-k2b3c/logika.ts (es batu, bata, baterai, es krim, bola tenis, kotak hadiah), berbeda dari Story. Diuji di scripts/uji-gudang-k2b3c.mjs.
 */
const gudang = (k: KeadaanK2Bab3): k is KeadaanGudang => k.alat === "gudang";
export const MISI_C: DefMisi<KeadaanK2Bab3>[] = [
  { id: "c-lepas", teks: "Lepaskan sebuah benda di papan lereng, lalu lihat ia menggelinding atau diam.", wajib: true, cek: (k) => gudang(k) && k.lepasTotal >= 1 },
  { id: "c-beda", teks: "Lepaskan satu benda yang menggelinding dan satu benda yang diam di papan lereng.", wajib: true, cek: (k) => gudang(k) && k.guling >= 1 && k.diam >= 1 },
  { id: "c-rak", teks: "Tata tiga benda ke tempat yang tepat: rak datar atau wadah berpagar.", wajib: true, cek: (k) => gudang(k) && Object.keys(k.rak).length >= 3 },
  { id: "c-cetak", teks: "Cetak satu permukaan benda di kertas, lalu lihat bangun datar yang tercetak.", wajib: true, cek: (k) => gudang(k) && k.cetak.length >= 1 },
  { id: "c-lingkaran", teks: "Cari benda yang cetakannya berbentuk lingkaran.", wajib: false, cek: (k) => gudang(k) && k.cetakLingkaran },
  { id: "c-semua", teks: "Tata semua benda ke tempat yang tepat tanpa salah satu pun.", wajib: false, cek: (k) => gudang(k) && Object.keys(k.rak).length >= 6 && k.rakSalah === 0 },
];

export const daftarMisiK2Bab3 = (sub: string): DefMisi<KeadaanK2Bab3>[] => (sub === "B" ? MISI_B : sub === "C" ? MISI_C : MISI_A);
