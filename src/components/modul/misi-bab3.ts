/**
 * Misi dan tantangan bebas Bab 3 (Pengurangan sampai 10). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas1.mjs.
 *
 * Simulasi bertahap: satu Laboratorium Pengurangan yang membuka alat sedikit demi sedikit
 * (A: kini Kotak Bekal, Misi Perjalanan bagian satu (bekal-k1b3a); B: + dua pengurangan, bagan pasangan, garis bilangan mundur;
 * C: + keluarga fakta dan tab Bus Sekolah; D: semua alat + tab Pesta Jeruk, sekaligus
 * simulasi pencapaian misi bab ini).
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanBekal } from "./bekal-k1b3a/logika";

export type KeadaanKurang = {
  alat: "kurang";
  /** Semua benda. */
  t: number;
  /** Benda diambil (dicoret). */
  k: number;
  /** Perwakilan yang benar-benar tampil (sudah diajarkan dan sedang menyala). */
  benda: boolean;
  kalimat: boolean;
  garis: boolean;
  bingkai: boolean;
  dua: boolean;
  bagan: boolean;
  keluarga: boolean;
};

export type KeadaanBab3 = KeadaanKurang | KeadaanSelesai | KeadaanBekal;

const kur = (k: KeadaanBab3): k is KeadaanKurang => k.alat === "kurang";
const selesai = (k: KeadaanBab3, id: string) => k.alat === "selesai" && k.id === id;
const soal = (k: KeadaanBab3, t: number, ambil: number) => kur(k) && k.t === t && k.k === ambil;

/** Sub-Bab A: Misi Perjalanan bagian satu, kotak bekal (Simulasi "Bekal untuk Nenek"). Roti 6, jeruk 9, pisang 4. */
const bekal = (k: KeadaanBab3): k is KeadaanBekal => k.alat === "bekal";
const adaCatat = (k: KeadaanBekal, s: "roti" | "jeruk" | "pisang", t: string) => k.catat[s].includes(t);
export const MISI_A: DefMisi<KeadaanBab3>[] = [
  { id: "a-roti", teks: "Ambil dua roti, lalu catat kalimat pengurangannya.", wajib: true, cek: (k) => bekal(k) && adaCatat(k, "roti", `${k.mula.roti}-2=${k.mula.roti - 2}`) },
  { id: "a-habis", teks: "Ambil pisang sampai habis, lalu catat. Sisanya nol!", wajib: true, cek: (k) => bekal(k) && adaCatat(k, "pisang", `${k.mula.pisang}-${k.mula.pisang}=0`) },
  { id: "a-nol", teks: "Catat kalimat jeruk tanpa mengambil apa pun.", wajib: true, cek: (k) => bekal(k) && adaCatat(k, "jeruk", `${k.mula.jeruk}-0=${k.mula.jeruk}`) },
  { id: "a-dua", teks: "Catat dua kalimat berbeda untuk satu bekal.", wajib: true, cek: (k) => bekal(k) && Object.values(k.catat).some((d) => d.length >= 2) },
  { id: "a-lima", teks: "Catat kalimat yang sisanya lima.", wajib: false, cek: (k) => bekal(k) && Object.values(k.catat).some((d) => d.some((t) => t.endsWith("=5"))) },
  { id: "a-mundur", teks: "Ambil jeruk satu per satu sampai sisanya enam.", wajib: false, cek: (k) => bekal(k) && k.mula.jeruk - k.ambil.jeruk === 6 },
];

/** Sub-Bab B: berbagai cara mengurang (dua pengurangan, mundur, nol dan sama, dari sepuluh). */
export const MISI_B: DefMisi<KeadaanBab3>[] = [
  { id: "b-dua", teks: "Nyalakan Dua pengurangan, lalu buat 6 benda dan ambil 2.", wajib: true, cek: (k) => kur(k) && k.dua && k.t === 6 && k.k === 2 },
  { id: "b-mundur", teks: "Buat 5 - 3. Lihat lompat mundur di garis bilangan.", wajib: true, cek: (k) => kur(k) && k.garis && k.t === 5 && k.k === 3 },
  { id: "b-nol", teks: "Buat 5 - 0. Lihat apa yang terjadi pada sisanya.", wajib: true, cek: (k) => soal(k, 5, 0) },
  { id: "b-sama", teks: "Buat 4 - 4. Lihat sisanya.", wajib: true, cek: (k) => soal(k, 4, 4) },
  { id: "b-sepuluh", teks: "Dari sepuluh: buat 10 - 7 dan hitung petak kosong di bingkai.", wajib: true, cek: (k) => kur(k) && k.bingkai && k.t === 10 && k.k === 7 },
  { id: "b-bagan", teks: "Nyalakan Bagan pasangan, lalu buat 7 - 4.", wajib: false, cek: (k) => kur(k) && k.bagan && k.t === 7 && k.k === 4 },
  { id: "b-sembilan", teks: "Buat 9 - 6 dan cari dua pengurangan dari bagan yang sama.", wajib: false, cek: (k) => kur(k) && k.dua && k.t === 9 && k.k === 6 },
];

/** Sub-Bab C: keluarga bilangan, periksa dengan tambah, cari yang hilang; ditambah Bus Sekolah. */
export const MISI_C: DefMisi<KeadaanBab3>[] = [
  { id: "c-keluarga", teks: "Nyalakan Keluarga fakta, lalu buat 7 - 3.", wajib: true, cek: (k) => kur(k) && k.keluarga && k.t === 7 && k.k === 3 },
  { id: "c-periksa", teks: "Periksa 9 - 4 dengan kalimat tambah di keluarga fakta.", wajib: true, cek: (k) => kur(k) && k.keluarga && k.t === 9 && k.k === 4 },
  { id: "c-cari", teks: "Cari yang hilang: 6 + ? = 9. Buat 9 - 6.", wajib: true, cek: (k) => soal(k, 9, 6) },
  { id: "c-bus", teks: "Selesaikan Bus Sekolah sampai selesai.", wajib: true, cek: (k) => selesai(k, "bus") },
  { id: "c-sepuluh", teks: "Buat keluarga fakta dari 10 - 4.", wajib: false, cek: (k) => kur(k) && k.keluarga && k.t === 10 && k.k === 4 },
  { id: "c-nol", teks: "Cari keluarga fakta yang salah satu bilangannya nol: buat 8 - 8.", wajib: false, cek: (k) => kur(k) && k.keluarga && k.t === 8 && k.k === 8 },
];

/** Sub-Bab D (sub-bab akhir): soal cerita pengurangan, sekaligus pencapaian misi bab ini. */
export const MISI_D: DefMisi<KeadaanBab3>[] = [
  { id: "d-cerita", teks: "Ada 8 burung, 2 terbang. Buat kalimat pengurangannya.", wajib: true, cek: (k) => kur(k) && k.kalimat && k.t === 8 && k.k === 2 },
  { id: "d-dicari", teks: "Cari yang dicari: buat soal 7 - 5 dan baca sisanya.", wajib: true, cek: (k) => soal(k, 7, 5) },
  { id: "d-periksa", teks: "Jawab lalu periksa: buat 6 - 2 dan cek keluarga fakta.", wajib: true, cek: (k) => kur(k) && k.keluarga && k.t === 6 && k.k === 2 },
  { id: "d-pesta", teks: "Selesaikan skenario Pesta Jeruk sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, "pesta") },
  { id: "d-bus", teks: "Ingat Sub-Bab C: selesaikan Bus Sekolah.", wajib: false, cek: (k) => selesai(k, "bus") },
  { id: "d-ingat", teks: "Ingat Sub-Bab B: buat 4 - 4, lalu 5 - 0.", wajib: false, cek: (k) => soal(k, 4, 4) },
];

export const daftarMisiBab3 = (sub: string): DefMisi<KeadaanBab3>[] => (sub === "B" ? MISI_B : sub === "C" ? MISI_C : sub === "D" ? MISI_D : MISI_A);
