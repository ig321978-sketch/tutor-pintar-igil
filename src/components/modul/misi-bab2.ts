/**
 * Misi dan tantangan bebas Bab 2 (Penjumlahan sampai 10). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas1.mjs.
 *
 * Satu simulasi bercerita per sub-bab, melanjutkan cerita Kebun Sayur Mamah:
 * A: Bedeng Mamah, Misi Kebun bagian satu (kebun-k1b2a); B: Meja Kemas, Misi Panen bagian satu (panen-k1b2b);
 * C: Pembuat Pesanan, Misi Pesanan bagian satu (pesanan-k1b2c), sub-bab akhir.
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanKebun } from "./kebun-k1b2a/logika";
import type { KeadaanPanen } from "./panen-k1b2b/logika";
import type { KeadaanPesanan } from "./pesanan-k1b2c/logika";

export type KeadaanTambah = {
  alat: "tambah";
  a: number;
  b: number;
  /** Berapa kali tombol Tukar tempat ditekan. */
  ditukar: number;
  /** Perwakilan yang benar-benar tampil (sudah diajarkan dan sedang menyala). */
  gabung: boolean;
  benda: boolean;
  kalimat: boolean;
  bingkai: boolean;
  garis: boolean;
  bagan: boolean;
};

export type KeadaanBab2 = KeadaanTambah | KeadaanSelesai | KeadaanKebun | KeadaanPanen | KeadaanPesanan;

/** Sub-Bab A: Misi Kebun bagian satu, bedeng Mamah (Simulasi "Bibit Kiriman Nenek"). Timun 3 datang 4, kentang 5 datang 5, bawang 6 keranjang kosong. */
const kebun = (k: KeadaanBab2): k is KeadaanKebun => k.alat === "kebun";
const adaCatat = (k: KeadaanKebun, s: "timun" | "kentang" | "bawang", t: string) => k.catat[s].includes(t);
export const MISI_A: DefMisi<KeadaanBab2>[] = [
  { id: "a-timun", teks: "Tanam semua bibit timun dari keranjang, lalu catat kalimatnya.", wajib: true, cek: (k) => kebun(k) && adaCatat(k, "timun", `${k.mula.timun}+${k.datang.timun}=${k.mula.timun + k.datang.timun}`) },
  { id: "a-penuh", teks: "Isi bedeng kentang sampai penuh sepuluh.", wajib: true, cek: (k) => kebun(k) && k.mula.kentang + k.tanam.kentang === 10 },
  { id: "a-nol", teks: "Catat kalimat bawang. Keranjangnya kosong!", wajib: true, cek: (k) => kebun(k) && adaCatat(k, "bawang", `${k.mula.bawang}+0=${k.mula.bawang}`) },
  { id: "a-dua", teks: "Catat dua kalimat berbeda untuk satu sayur.", wajib: true, cek: (k) => kebun(k) && Object.values(k.catat).some((d) => d.length >= 2) },
  { id: "a-delapan", teks: "Catat kalimat yang hasilnya delapan.", wajib: false, cek: (k) => kebun(k) && Object.values(k.catat).some((d) => d.some((t) => t.endsWith("=8"))) },
  { id: "a-tujuh", teks: "Buat kalimat kentang yang hasilnya tujuh, lalu catat.", wajib: false, cek: (k) => kebun(k) && k.catat.kentang.some((t) => t.endsWith("=7")) },
];

/** Sub-Bab B: Misi Panen bagian satu, meja kemas (Simulasi "Panen Pertama dan Keranjang Sepuluh"). Mulai dari tiga dan satu. */
const panen = (k: KeadaanBab2): k is KeadaanPanen => k.alat === "panen";
const bagian = (t: string) => t.split(/[+=]/).map(Number);
export const MISI_B: DefMisi<KeadaanBab2>[] = [
  { id: "b-tukar", teks: "Tukar tempat dua keranjang yang isinya berbeda. Lihat hasilnya tetap sama.", wajib: true, cek: (k) => panen(k) && k.ditukar > 0 },
  { id: "b-maju", teks: "Buat dua ditambah enam, lalu lihat lompatannya di garis bilangan.", wajib: true, cek: (k) => panen(k) && k.a === 2 && k.b === 6 },
  { id: "b-kembar", teks: "Buat dua keranjang sama banyak, lalu catat kalimat kembarnya.", wajib: true, cek: (k) => panen(k) && k.catat.some((t) => { const [x, y] = bagian(t); return x === y && x > 0; }) },
  { id: "b-sepuluh", teks: "Catat dua kalimat berbeda yang hasilnya sepuluh.", wajib: true, cek: (k) => panen(k) && k.catat.filter((t) => t.endsWith("=10")).length >= 2 },
  { id: "b-nol", teks: "Catat kalimat dengan nol.", wajib: false, cek: (k) => panen(k) && k.catat.some((t) => bagian(t).slice(0, 2).includes(0)) },
  { id: "b-sembilan", teks: "Catat kalimat yang hasilnya sembilan.", wajib: false, cek: (k) => panen(k) && k.catat.some((t) => t.endsWith("=9")) },
];

/** Sub-Bab C (sub-bab akhir): Misi Pesanan bagian satu, pembuat pesanan (Simulasi "Pesanan Tetangga"). */
const pesanan = (k: KeadaanBab2): k is KeadaanPesanan => k.alat === "pesanan";
const isiKirim = (t: string) => {
  const [jenis, kal] = t.split(":");
  const [a, b, c] = kal.split(/[+=]/).map(Number);
  return { jenis, a, b, c };
};
export const MISI_C: DefMisi<KeadaanBab2>[] = [
  { id: "c-datang", teks: "Buat cerita datang lagi, lalu kirim pesanannya.", wajib: true, cek: (k) => pesanan(k) && k.kirim.some((t) => isiKirim(t).jenis === "datang") },
  { id: "c-gabung", teks: "Buat cerita dua kantong digabung, lalu kirim pesanannya.", wajib: true, cek: (k) => pesanan(k) && k.kirim.some((t) => isiKirim(t).jenis === "gabung") },
  { id: "c-sepuluh", teks: "Kirim pesanan yang semuanya sepuluh.", wajib: true, cek: (k) => pesanan(k) && k.kirim.some((t) => isiKirim(t).c === 10) },
  { id: "c-periksa", teks: "Periksa satu pesanan dengan tukar tempat.", wajib: true, cek: (k) => pesanan(k) && k.diperiksa > 0 },
  { id: "c-nol", teks: "Kirim pesanan dengan nol.", wajib: false, cek: (k) => pesanan(k) && k.kirim.some((t) => isiKirim(t).a === 0 || isiKirim(t).b === 0) },
  { id: "c-tiga", teks: "Kirim tiga pesanan dengan sayur yang berbeda.", wajib: false, cek: (k) => pesanan(k) && new Set(k.kirim.map((t) => t.split(":")[2])).size >= 3 },
];

export const daftarMisiBab2 = (sub: string): DefMisi<KeadaanBab2>[] => (sub === "B" ? MISI_B : sub === "C" ? MISI_C : MISI_A);
