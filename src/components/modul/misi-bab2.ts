/**
 * Misi dan tantangan bebas Bab 2 (Penjumlahan sampai 10). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas1.mjs.
 *
 * Simulasi bertahap: satu Laboratorium Penjumlahan yang membuka alat sedikit demi sedikit
 * (A: Bedeng Mamah, Misi Kebun bagian satu (kebun-k1b2a); B: Lab Penjumlahan + bagan pasangan, garis bilangan, Tukar tempat;
 * C: semua alat + tab Kantin Sekolah, sekaligus simulasi pencapaian misi bab ini).
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanKebun } from "./kebun-k1b2a/logika";
import type { KeadaanPanen } from "./panen-k1b2b/logika";

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

export type KeadaanBab2 = KeadaanTambah | KeadaanSelesai | KeadaanKebun | KeadaanPanen;

const tam = (k: KeadaanBab2): k is KeadaanTambah => k.alat === "tambah";
const selesai = (k: KeadaanBab2, id: string) => k.alat === "selesai" && k.id === id;
const jml = (k: KeadaanTambah) => k.a + k.b;

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

/** Sub-Bab C (sub-bab akhir): soal cerita, periksa jawaban, sekaligus pencapaian misi bab ini. */
export const MISI_C: DefMisi<KeadaanBab2>[] = [
  { id: "c-cerita", teks: "Ada 5 burung, datang lagi 3. Buat kalimat penjumlahannya.", wajib: true, cek: (k) => tam(k) && k.kalimat && k.a === 5 && k.b === 3 },
  { id: "c-garis", teks: "Periksa dengan garis bilangan: buat merah 4 dan biru 2.", wajib: true, cek: (k) => tam(k) && k.garis && k.a === 4 && k.b === 2 },
  { id: "c-tukar", teks: "Periksa dengan tukar tempat: buat 2 + 6, lalu tekan Tukar tempat.", wajib: true, cek: (k) => tam(k) && k.ditukar > 0 && k.a === 6 && k.b === 2 },
  { id: "c-kantin", teks: "Selesaikan skenario Kantin Sekolah sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, "kantin") },
  { id: "c-mesin", teks: "Ingat Sub-Bab A: selesaikan Mesin Tambah.", wajib: false, cek: (k) => selesai(k, "mesin") },
  { id: "c-sepuluh", teks: "Buat soal cerita yang jumlahnya tepat 10.", wajib: false, cek: (k) => tam(k) && k.kalimat && jml(k) === 10 },
];

export const daftarMisiBab2 = (sub: string): DefMisi<KeadaanBab2>[] => (sub === "B" ? MISI_B : sub === "C" ? MISI_C : MISI_A);
