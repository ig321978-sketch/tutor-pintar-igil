/**
 * Misi dan tantangan bebas Opsi 2 Kelas 1 Bab 1 Sub-Bab A (Kebun dan Nampan Nenek). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-sim-o2k1a.mjs. Naskah orisinal IGIL.
 *
 * Satu alat (laboratorium), empat misi wajib dan tiga tantangan bebas. Misi yang sudah tercapai tidak dicabut.
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi } from "./misi-simulasi";
import type { KeadaanRingkasO2K1A } from "./o2k1a-lab";

export type KeadaanO2K1A = KeadaanRingkasO2K1A;

/** Riwayat alat memuat semua id. */
const pernah = (k: KeadaanO2K1A, ...id: string[]) => k.alat === "lab" && id.every((p) => k.pernah.includes(p));
const pernahTulis = (k: KeadaanO2K1A) => k.alat === "lab" && k.pernah.some((p) => p.startsWith("tulis:"));
const semuaBanyak = (k: KeadaanO2K1A) => pernah(k, ...Array.from({ length: 11 }, (_, i) => `n:${i}`));

export const MISI_A_O2K1A: DefMisi<KeadaanO2K1A>[] = [
  { id: "o-tujuh", teks: "Buat tujuh apel di keranjang. Lihat lambangnya.", wajib: true, cek: (k) => pernah(k, "lihat:7") },
  { id: "o-nol", teks: "Kosongkan keranjang dan temukan nol.", wajib: true, cek: (k) => pernah(k, "nol") },
  { id: "o-penuh", teks: "Isi nampan sampai penuh.", wajib: true, cek: (k) => pernah(k, "penuh") },
  { id: "o-tulis", teks: "Tulis sebuah lambang dengan jarimu.", wajib: true, cek: pernahTulis },
  { id: "o-sepuluh", teks: "Tulis sepuluh: lambang satu, lalu nol.", wajib: false, cek: (k) => pernah(k, "tulis:10") },
  { id: "o-enam-sembilan", teks: "Tulis enam, lalu tulis sembilan.", wajib: false, cek: (k) => pernah(k, "tulis:6", "tulis:9") },
  { id: "o-semua", teks: "Buat semua bilangan dari nol sampai sepuluh.", wajib: false, cek: semuaBanyak },
];

export const daftarMisiO2K1A = (): DefMisi<KeadaanO2K1A>[] => MISI_A_O2K1A;
