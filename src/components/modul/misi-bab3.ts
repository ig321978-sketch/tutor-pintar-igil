/**
 * Misi dan tantangan bebas Bab 3 (Pengurangan sampai 10). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas1.mjs.
 *
 * Simulasi bertahap: satu Laboratorium Pengurangan yang membuka alat sedikit demi sedikit
 * (A: kini Kotak Bekal, Misi Perjalanan bagian satu (bekal-k1b3a); B: kini Kursi Kereta Lanjutan, Misi Pindah Kereta bagian satu (peron-k1b3b);
 * C: kini Papan Kondektur, Misi Kondektur bagian satu (kondektur-k1b3c); D: semua alat + tab Pesta Jeruk, sekaligus
 * simulasi pencapaian misi bab ini).
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanBekal } from "./bekal-k1b3a/logika";
import type { KeadaanKursi } from "./peron-k1b3b/logika";
import type { KeadaanKeluarga } from "./kondektur-k1b3c/logika";

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

export type KeadaanBab3 = KeadaanKurang | KeadaanSelesai | KeadaanBekal | KeadaanKursi | KeadaanKeluarga;

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

/** Sub-Bab B: Misi Pindah Kereta bagian satu, kursi kereta lanjutan (Simulasi "Pindah Kereta di Stasiun Besar"). Mulai lima kursi, dua terisi. */
const kursi = (k: KeadaanBab3): k is KeadaanKursi => k.alat === "kursi";
const urai = (t: string) => t.split(/[-=]/).map(Number);
export const MISI_B: DefMisi<KeadaanBab3>[] = [
  { id: "b-dua", teks: "Catat dua kalimat berbeda dari satu bagan.", wajib: true, cek: (k) => kursi(k) && k.catat.some((t) => { const [x, y, z] = urai(t); return y !== z && k.catat.includes(`${x}-${z}=${y}`); }) },
  { id: "b-nol", teks: "Catat kalimat yang dikurangi nol.", wajib: true, cek: (k) => kursi(k) && k.catat.some((t) => urai(t)[1] === 0) },
  { id: "b-sama", teks: "Isi semua kursi, lalu catat kalimat yang hasilnya nol.", wajib: true, cek: (k) => kursi(k) && k.catat.some((t) => { const [x, y] = urai(t); return x > 0 && x === y; }) },
  { id: "b-sepuluh", teks: "Buat sepuluh kursi, lalu catat dua kalimat dari sepuluh.", wajib: true, cek: (k) => kursi(k) && k.catat.filter((t) => urai(t)[0] === 10).length >= 2 },
  { id: "b-sembilan", teks: "Catat kalimat yang hasilnya sembilan.", wajib: false, cek: (k) => kursi(k) && k.catat.some((t) => urai(t)[2] === 9) },
  { id: "b-mundur", teks: "Buat delapan kursi dengan lima terisi. Lihat lompat mundurnya.", wajib: false, cek: (k) => kursi(k) && k.utuh === 8 && k.terisi === 5 },
];

/** Sub-Bab C: Misi Kondektur bagian satu, papan kondektur (Simulasi "Kondektur dan Penumpang"). Mulai dua biru dan lima merah. */
const keluarga = (k: KeadaanBab3): k is KeadaanKeluarga => k.alat === "keluarga";
const angka = (t: string) => t.split(/[-+=]/).map(Number);
const empatAda = (c: string[]) =>
  c.some((t) => {
    if (!t.includes("+")) return false;
    const [a, b, z] = angka(t);
    return a !== b && [`${a}+${b}=${z}`, `${b}+${a}=${z}`, `${z}-${a}=${b}`, `${z}-${b}=${a}`].every((x) => c.includes(x));
  });
export const MISI_C: DefMisi<KeadaanBab3>[] = [
  { id: "c-empat", teks: "Catat empat kalimat dari satu keluarga bilangan.", wajib: true, cek: (k) => keluarga(k) && empatAda(k.catat) },
  { id: "c-periksa", teks: "Catat satu pengurangan dan penjumlahan yang memeriksanya.", wajib: true, cek: (k) => keluarga(k) && k.catat.some((t) => { if (!t.includes("-")) return false; const [z, b, a] = angka(t); return k.catat.includes(`${a}+${b}=${z}`) || k.catat.includes(`${b}+${a}=${z}`); }) },
  { id: "c-pucuk", teks: "Tutup pucuk segitiga, lalu tebak semuanya.", wajib: true, cek: (k) => keluarga(k) && k.dibuka.includes("z") },
  { id: "c-pojok", teks: "Tutup satu pojok bawah, lalu tebak bilangannya.", wajib: true, cek: (k) => keluarga(k) && (k.dibuka.includes("x") || k.dibuka.includes("y")) },
  { id: "c-sepuluh", teks: "Buat keluarga yang semuanya sepuluh.", wajib: false, cek: (k) => keluarga(k) && k.x > 0 && k.y > 0 && k.x + k.y === 10 },
  { id: "c-nol", teks: "Catat kalimat keluarga yang memakai nol.", wajib: false, cek: (k) => keluarga(k) && k.catat.some((t) => angka(t).includes(0)) },
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
