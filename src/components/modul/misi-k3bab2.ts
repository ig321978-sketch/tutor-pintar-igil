/**
 * Misi dan tantangan bebas Kelas 3 Bab 2 (Kalimat Matematika). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k3b2.mjs.
 *
 * Simulasi bertahap per sub-bab (paling banyak tiga alat). Lab Neraca Kalimat memuat dua tampilan
 * (Neraca dan Papan Kemungkinan) dan dihitung satu alat:
 *  A Kalimat Penjumlahan : Lab Neraca Kalimat (tambah) + Mesin Kalimat Tambah + skenario Buku Perpustakaan Rani.
 *  B Kalimat Pengurangan : Lab Neraca Kalimat (kurang, tambah tetap tersedia) + Mesin Kalimat Kurang
 *                          + skenario Pasar Pak Slamet (pencapaian bab).
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanKal, KeadaanMungkin } from "./lab-kalimat-k3b2";

export type KeadaanK3Bab2 = KeadaanKal | KeadaanMungkin | KeadaanSelesai;

const kal = (k: KeadaanK3Bab2): k is KeadaanKal => k.alat === "kalimat";
const mungkin = (k: KeadaanK3Bab2): k is KeadaanMungkin => k.alat === "mungkin";
const selesai = (k: KeadaanK3Bab2, id: string) => k.alat === "selesai" && k.id === id;

/** Id yang dilaporkan skenario dan mesin saat tuntas (dipakai misi di bawah dan pembungkus React). */
export const ID_SKENARIO_K3B2 = { A: "buku-rani", B: "pasar-slamet" } as const;
export const ID_MESIN_K3B2 = { A: "mesin-kalimat-tambah", B: "mesin-kalimat-kurang" } as const;

/** Kalimat penjumlahan yang seimbang dengan bilangan tertentu. */
const tambahSeimbang = (k: KeadaanKal, letak: "tengah" | "depan", tahu: number, hasil: number) =>
  k.op === "tambah" && k.letak === letak && k.tahu === tahu && k.hasil === hasil && k.seimbang;
const kurangSeimbang = (k: KeadaanKal, letak: "tengah" | "depan", tahu: number, hasil: number) =>
  k.op === "kurang" && k.letak === letak && k.tahu === tahu && k.hasil === hasil && k.seimbang;

/** Sub-Bab A: kalimat Matematika penjumlahan. */
export const MISI_A: DefMisi<KeadaanK3Bab2>[] = [
  {
    id: "a-tengah",
    teks: "Buat 8 + … = 19 dan isi kotak sampai neraca seimbang. Titik-titiknya di tengah.",
    wajib: true,
    cek: (k) => kal(k) && tambahSeimbang(k, "tengah", 8, 19),
  },
  {
    id: "a-depan",
    teks: "Pindahkan titik-titik ke depan: … + 16 = 54. Isi kotak sampai neraca seimbang.",
    wajib: true,
    cek: (k) => kal(k) && tambahSeimbang(k, "depan", 16, 54),
  },
  {
    id: "a-balik",
    teks: "Nyalakan Kebalikan, lalu seimbangkan kalimat dengan titik-titik di tengah dan juga di depan.",
    wajib: true,
    cek: (k) => kal(k) && k.pernahBalik.includes("tambah:tengah") && k.pernahBalik.includes("tambah:depan"),
  },
  {
    id: "a-periksa",
    teks: "Seimbangkan sebuah kalimat penjumlahan, lalu tekan Periksa.",
    wajib: true,
    cek: (k) => kal(k) && k.op === "tambah" && k.periksa,
  },
  {
    id: "a-banyak",
    teks: "Di Papan Kemungkinan, buat jumlah 100 dan catat tiga pasangan yang berbeda.",
    wajib: true,
    cek: (k) => mungkin(k) && k.total === 100 && k.banyak >= 3,
  },
  { id: "a-mesin", teks: "Selesaikan Mesin Kalimat Tambah sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K3B2.A) },
  { id: "a-skenario", teks: "Selesaikan skenario Buku Perpustakaan Rani sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K3B2.A) },
  {
    id: "a-tukar",
    teks: "Seimbangkan penjumlahan, lalu tekan Tukar tempat. Neraca tetap seimbang.",
    wajib: false,
    cek: (k) => kal(k) && k.tukarSeimbang,
  },
  {
    id: "a-95",
    teks: "Di Papan Kemungkinan, buat jumlah 95 (tiket film) dan catat lima pasangan berbeda.",
    wajib: false,
    cek: (k) => mungkin(k) && k.total === 95 && k.banyak >= 5,
  },
  {
    id: "a-nol",
    teks: "Buat … + 17 = 17. Titik-titiknya berisi nol, dan neraca tetap seimbang.",
    wajib: false,
    cek: (k) => kal(k) && k.op === "tambah" && k.tahu === 17 && k.hasil === 17 && k.isi === 0 && k.seimbang,
  },
];

/** Sub-Bab B: kalimat Matematika pengurangan (pencapaian misi bab). */
export const MISI_B: DefMisi<KeadaanK3Bab2>[] = [
  {
    id: "b-tengah",
    teks: "Buat 80 − … = 45 dan isi kotak sampai neraca seimbang. Titik-titiknya di tengah.",
    wajib: true,
    cek: (k) => kal(k) && kurangSeimbang(k, "tengah", 80, 45),
  },
  {
    id: "b-depan",
    teks: "Pindahkan titik-titik ke depan: … − 45 = 27. Isi kotak sampai neraca seimbang.",
    wajib: true,
    cek: (k) => kal(k) && kurangSeimbang(k, "depan", 45, 27),
  },
  {
    id: "b-balik",
    teks: "Nyalakan Kebalikan, lalu seimbangkan pengurangan dengan titik-titik di tengah dan juga di depan.",
    wajib: true,
    cek: (k) => kal(k) && k.pernahBalik.includes("kurang:tengah") && k.pernahBalik.includes("kurang:depan"),
  },
  {
    id: "b-periksa",
    teks: "Seimbangkan sebuah kalimat pengurangan, lalu tekan Periksa.",
    wajib: true,
    cek: (k) => kal(k) && k.op === "kurang" && k.periksa,
  },
  {
    id: "b-bagan",
    teks: "Satu bagan, dua kalimat: seimbangkan 80 − … = 45, lalu ganti ke Tambah dan seimbangkan 45 + … = 80.",
    wajib: true,
    cek: (k) => kal(k) && k.pernah.includes("kurang:tengah:80:45") && k.pernah.includes("tambah:tengah:45:80"),
  },
  { id: "b-mesin", teks: "Selesaikan Mesin Kalimat Kurang sampai semua kasus diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K3B2.B) },
  { id: "b-skenario", teks: "Selesaikan skenario Pasar Pak Slamet sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K3B2.B) },
  {
    id: "b-tukar",
    teks: "Pada pengurangan, tekan Tukar tempat dan lihat lab menolaknya. Pengurangan tidak boleh ditukar.",
    wajib: false,
    cek: (k) => kal(k) && k.tukarDitolak,
  },
  {
    id: "b-telur",
    teks: "Di Papan Kemungkinan, buat seratus telur dan catat tiga pasangan terjual dan sisa yang berbeda.",
    wajib: false,
    cek: (k) => mungkin(k) && k.mode === "B" && k.total === 100 && k.banyak >= 3,
  },
  {
    id: "b-televisi",
    teks: "Di Papan Kemungkinan, buat 40 televisi dan catat lima pasangan terjual dan sisa yang berbeda.",
    wajib: false,
    cek: (k) => mungkin(k) && k.mode === "B" && k.total === 40 && k.banyak >= 5,
  },
  {
    id: "b-nol",
    teks: "Buat pengurangan yang sisanya nol, misalnya 32 − … = 0. Seimbangkan neracanya.",
    wajib: false,
    cek: (k) => kal(k) && k.op === "kurang" && k.hasil === 0 && k.seimbang,
  },
];

export type HurufMisiK3B2 = "A" | "B";

export const daftarMisiK3Bab2 = (huruf: HurufMisiK3B2): DefMisi<KeadaanK3Bab2>[] => (huruf === "B" ? MISI_B : MISI_A);
