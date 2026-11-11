/**
 * Misi dan tantangan bebas Kelas 2 Bab 1 (Membilang sampai 50). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas2.mjs.
 *
 * Simulasi bertahap: satu Laboratorium Bilangan 50 yang alatnya bertambah per sub-bab
 * (A: Lab batang/satuan/kalimat/garis; B: + tabel nilai tempat + Mesin Tukar;
 * C: semua alat + Bandingkan + skenario Stoples Permen, sekaligus pencapaian misi bab ini).
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";

export type KeadaanLab50 = {
  alat: "lab50";
  n: number;
  m: number;
  /** Batang puluhan sedang ditampilkan. */
  batang: boolean;
  /** Tabel nilai tempat sedang tampil. */
  tabel: boolean;
  /** Kalimat nilai (n = p puluhan + s satuan) sedang tampil. */
  kalimat: boolean;
  /** Garis bilangan sedang tampil. */
  garis: boolean;
  /** Mode Bandingkan menyala. */
  banding: boolean;
};

export type KeadaanK2Bab1 = KeadaanLab50 | KeadaanSelesai;

const lab = (k: KeadaanK2Bab1): k is KeadaanLab50 => k.alat === "lab50";
const selesai = (k: KeadaanK2Bab1, id: string) => k.alat === "selesai" && k.id === id;
const puluhan = (n: number) => Math.floor(n / 10);

/** Sub-Bab A: menghitung, membaca, menulis, maju-mundur sampai 50. */
export const MISI_A: DefMisi<KeadaanK2Bab1>[] = [
  { id: "a-26", teks: "Buat bilangan 26 seperti tas di loker Malosi. Lihat batang dan satuannya.", wajib: true, cek: (k) => lab(k) && k.batang && k.n === 26 },
  { id: "a-40", teks: "Buat tepat 40: empat batang penuh, nol satuan.", wajib: true, cek: (k) => lab(k) && k.batang && k.n === 40 },
  { id: "a-50", teks: "Isi sampai 50: lima batang puluhan penuh.", wajib: true, cek: (k) => lab(k) && k.n === 50 },
  { id: "a-garis", teks: "Ketuk angka 30 di garis bilangan. Makin ke kanan, makin besar.", wajib: true, cek: (k) => lab(k) && k.garis && k.n === 30 },
  { id: "a-kalimat", teks: "Buat 35 dan baca kalimat puluhan ditambah satuan.", wajib: false, cek: (k) => lab(k) && k.kalimat && k.n === 35 },
  { id: "a-21", teks: "Buat 21: dua puluh satu. Angka kiri 2, angka kanan 1.", wajib: false, cek: (k) => lab(k) && k.n === 21 },
];

/** Sub-Bab B: nilai tempat + Mesin Tukar Puluhan. */
export const MISI_B: DefMisi<KeadaanK2Bab1>[] = [
  { id: "b-tabel-26", teks: "Buat 26 dan baca tabel: 2 puluhan, 6 satuan.", wajib: true, cek: (k) => lab(k) && k.tabel && k.n === 26 },
  { id: "b-tabel-11", teks: "Buat 11. Angka 1 di kiri dan 1 di kanan nilainya beda.", wajib: true, cek: (k) => lab(k) && k.tabel && k.n === 11 },
  { id: "b-tabel-50", teks: "Buat 50 di tabel: 5 puluhan dan 0 satuan.", wajib: true, cek: (k) => lab(k) && k.tabel && k.n === 50 },
  { id: "b-tukar", teks: "Selesaikan Mesin Tukar Puluhan sampai semua misi ringkas selesai.", wajib: true, cek: (k) => selesai(k, "tukar") },
  { id: "b-34", teks: "Buat 34. Baca 3 puluhan dan 4 satuan di tabel.", wajib: false, cek: (k) => lab(k) && k.tabel && k.n === 34 },
  { id: "b-ingat", teks: "Ingat Sub-Bab A: buat bilangan 26 dengan batang puluhan.", wajib: false, cek: (k) => lab(k) && k.batang && k.n === 26 },
];

/** Sub-Bab C (sub-bab akhir): membandingkan + skenario, sekaligus pencapaian misi bab ini. */
export const MISI_C: DefMisi<KeadaanK2Bab1>[] = [
  { id: "c-puluhan", teks: "Nyalakan Bandingkan. Buat 32 dan 26. Puluhan menentukan pemenang.", wajib: true, cek: (k) => lab(k) && k.banding && ((k.n === 32 && k.m === 26) || (k.n === 26 && k.m === 32)) },
  { id: "c-satuan", teks: "Bandingkan 28 dan 25. Puluhan sama, satuan menentukan.", wajib: true, cek: (k) => lab(k) && k.banding && ((k.n === 28 && k.m === 25) || (k.n === 25 && k.m === 28)) },
  { id: "c-sama", teks: "Buat dua bilangan sama banyak: 26 dan 26.", wajib: true, cek: (k) => lab(k) && k.banding && k.n === 26 && k.m === 26 },
  { id: "c-stoples", teks: "Selesaikan skenario Stoples Permen Kira sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, "stoples") },
  { id: "c-ujung", teks: "Bandingkan bilangan paling kecil dengan paling besar yang kamu buat: selisih puluhan 3 atau lebih.", wajib: false, cek: (k) => lab(k) && k.banding && Math.abs(puluhan(k.n) - puluhan(k.m)) >= 3 },
  { id: "c-ingat-tukar", teks: "Ingat Sub-Bab B: selesaikan Mesin Tukar Puluhan.", wajib: false, cek: (k) => selesai(k, "tukar") },
];

export const daftarMisiK2Bab1 = (sub: string): DefMisi<KeadaanK2Bab1>[] => (sub === "B" ? MISI_B : sub === "C" ? MISI_C : MISI_A);
