/**
 * Misi dan tantangan bebas Bab 6 (Penjumlahan dan Pengurangan sampai 20). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas1.mjs.
 *
 * Simulasi bertahap: satu laboratorium garis bilangan yang alatnya bertambah per sub-bab
 * (A: Selisih Dua Kelompok + Garis Selisih; B: + Loncat Menjumlah, Jembatan Sepuluh, Belasan tambah;
 * C: + Loncat Mengurang, Belasan kurang, dan tab Loket Pasar Malam, sekaligus simulasi
 * pencapaian misi bab ini).
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanBandingJeruk } from "./misi-bab5";

export type KeadaanLoncat = {
  alat: "loncat";
  op: "tambah" | "kurang" | "selisih";
  strategi: "satuan" | "sepuluh";
  a: number;
  b: number;
  /** Banyak lompatan bila meloncat satu-satu, dan bila meloncat lewat sepuluh. */
  satu: number;
  sepuluh: number;
};

export type KeadaanBelasan = {
  alat: "belasan";
  op: "tambah" | "kurang";
  a: number;
  b: number;
  benda: boolean;
  tabel: boolean;
  pecah: boolean;
  periksa: boolean;
};

export type KeadaanBab6 = KeadaanBandingJeruk | KeadaanLoncat | KeadaanBelasan | KeadaanSelesai;

/** Pasangan orang yang dibandingkan (sama dengan PASANGAN di lab-banding-bab5.ts; dicek di uji). */
export const PASANGAN_JERUK: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 2],
];

/** Selisih dua orang yang sedang dibandingkan. */
export const selisihPasang = (k: KeadaanBandingJeruk): number => {
  const [i, j] = PASANGAN_JERUK[k.pas] ?? PASANGAN_JERUK[0];
  return Math.abs(k.jumlah[i] - k.jumlah[j]);
};

const ban = (k: KeadaanBab6): k is KeadaanBandingJeruk => k.alat === "banding";
const lon = (k: KeadaanBab6): k is KeadaanLoncat => k.alat === "loncat";
const bel = (k: KeadaanBab6): k is KeadaanBelasan => k.alat === "belasan";
const selesai = (k: KeadaanBab6, id: string) => k.alat === "selesai" && k.id === id;
const loncat = (k: KeadaanBab6, op: KeadaanLoncat["op"], a: number, b: number) => lon(k) && k.op === op && k.a === a && k.b === b;

/** Sub-Bab A: selisih (beda) dua kelompok, pasangan satu-satu, batang, dan garis bilangan. */
export const MISI_A: DefMisi<KeadaanBab6>[] = [
  { id: "a-sama", teks: "Buat dua orang punya jeruk sama banyak. Selisihnya nol.", wajib: true, cek: (k) => ban(k) && k.selisih && selisihPasang(k) === 0 },
  { id: "a-batang", teks: "Buat selisih 5 dan lihat bagian emas pada batang yang lebih panjang.", wajib: true, cek: (k) => ban(k) && k.batang && selisihPasang(k) === 5 },
  { id: "a-garis", teks: "Di garis bilangan, atur 4 dan 12. Hitung langkah dari 4 ke 12.", wajib: true, cek: (k) => loncat(k, "selisih", 4, 12) || loncat(k, "selisih", 12, 4) },
  { id: "a-tukar", teks: "Tukar angkanya: bilangan pertama 9 dan kedua 7. Apakah jaraknya berubah?", wajib: true, cek: (k) => loncat(k, "selisih", 9, 7) },
  { id: "a-satu", teks: "Buat selisih dua kelompok tepat 1.", wajib: false, cek: (k) => ban(k) && k.selisih && selisihPasang(k) === 1 },
  { id: "a-nol", teks: "Di garis bilangan, buat dua bilangan sama besar.", wajib: false, cek: (k) => lon(k) && k.op === "selisih" && k.a === k.b },
];

/** Sub-Bab B: menjumlah belasan (loncat, lewat sepuluh, jembatan sepuluh, pecah puluhan dan satuan). */
export const MISI_B: DefMisi<KeadaanBab6>[] = [
  { id: "b-loncat", teks: "Pilih Tambah, lalu atur Mulai dari 8 dan Loncat maju 5. Bandingkan dua cara meloncat.", wajib: true, cek: (k) => loncat(k, "tambah", 8, 5) },
  { id: "b-jembatan", teks: "Selesaikan Jembatan Sepuluh sampai selesai.", wajib: true, cek: (k) => selesai(k, "jembatan") },
  { id: "b-belasan", teks: "Menjumlah Belasan: buat 14 + 4. Satuannya berubah, puluhannya tetap.", wajib: true, cek: (k) => bel(k) && k.op === "tambah" && k.a === 14 && k.b === 4 },
  { id: "b-sembilan-belas", teks: "Menjumlah Belasan: cari pasangan yang hasilnya 19.", wajib: true, cek: (k) => bel(k) && k.op === "tambah" && k.a + k.b === 19 },
  { id: "b-tidak-lewat", teks: "Pilih Tambah, lalu atur 12 dan 3. Apakah lompatannya melewati 10?", wajib: false, cek: (k) => loncat(k, "tambah", 12, 3) },
  { id: "b-ingat", teks: "Ingat Sub-Bab A: buat selisih dua kelompok tepat 5.", wajib: false, cek: (k) => ban(k) && k.selisih && selisihPasang(k) === 5 },
];

/** Sub-Bab C (sub-bab akhir): mengurang belasan, sekaligus pencapaian misi bab ini. */
export const MISI_C: DefMisi<KeadaanBab6>[] = [
  { id: "c-loncat", teks: "Pilih Kurang, lalu atur Mulai dari 15 dan Loncat mundur 6. Bandingkan dua cara meloncat.", wajib: true, cek: (k) => loncat(k, "kurang", 15, 6) },
  { id: "c-belasan", teks: "Mengurang Belasan: buat 17 - 5. Satuannya berkurang, puluhannya tetap.", wajib: true, cek: (k) => bel(k) && k.op === "kurang" && k.a === 17 && k.b === 5 },
  { id: "c-sepuluh", teks: "Mengurang Belasan: cari pasangan yang hasilnya tepat 10.", wajib: true, cek: (k) => bel(k) && k.op === "kurang" && k.a - k.b === 10 },
  { id: "c-loket", teks: "Selesaikan skenario Loket Pasar Malam sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, "loket") },
  { id: "c-lewat", teks: "Pilih Kurang, lalu atur 12 dan 5. Lompatan mundur melewati 10.", wajib: false, cek: (k) => loncat(k, "kurang", 12, 5) },
  { id: "c-ingat", teks: "Ingat Sub-Bab B: selesaikan Jembatan Sepuluh.", wajib: false, cek: (k) => selesai(k, "jembatan") },
];

export const daftarMisiBab6 = (sub: string): DefMisi<KeadaanBab6>[] => (sub === "B" ? MISI_B : sub === "C" ? MISI_C : MISI_A);
