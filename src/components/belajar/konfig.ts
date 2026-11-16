import * as S1 from "@/lib/belajar/s1-gabung";
import * as S2 from "@/lib/belajar/s2-datang-lagi";
import * as S3 from "@/lib/belajar/s3-kalimat";
import { KONFIG_S4, KONFIG_S5, KONFIG_S6, KONFIG_S7, KONFIG_S8, KONFIG_S9, KONFIG_S10 } from "./konfig-b-c";
import type { Bentuk, PetaMiskonsepsi, Soal } from "@/lib/belajar/tipe";

/** Isi satu pelabuhan Pasar Terapung. Komponen Pelabuhan.tsx hanya merangkai; isinya ada di sini. */
export type KonfigPelabuhan = {
  skillId: string;
  nomor: number;
  /** Penanda posisi di kurikulum, mis. "Sub-Bab A · Materi 1 dari 3". */
  sub: string;
  judulPendek: string;
  /** Petunjuk setelah satu jawaban salah. */
  petunjuk: string;
  /** Kata penghubung dua kelompok di gambar. */
  penghubung: string;
  miskonsepsi: PetaMiskonsepsi;
  buatSoal: (b: Bentuk, benih: number) => Soal;
  buatCek: (benih: number) => Soal[];
  langkahContoh: (a: number, b: number) => string[];
  /** Cerita: empat panel. Panel 3 meminta tebakan, panel 4 membuktikan dengan mengetuk benda. */
  cerita: {
    judul: string;
    panel: [string, string, string, string];
    a: number;
    b: number;
    tebak: Array<number | string>;
    ikon?: string;
    ikon2?: string;
    /** Kelompok kedua disembunyikan (tampil "?") sampai tahap membuktikan, karena itulah yang ditanyakan. */
    rahasiaB?: boolean;
    /** Panel terakhir mengetuk benda lain (mis. roda) sebanyak `n`, bukan jumlah a + b. */
    ketuk?: { n: number; ikon: string };
  };
  /** Kegiatan bebas dengan dua penghitung. `kalimat`: tampilkan kalimat penjumlahan hidup; `tampil`: garis atau bingkai; `bobot`: nilai tiap benda (roda). */
  jelajah: {
    misiTotal: number;
    kata: string;
    misi?: string;
    namaA: string;
    namaB: string;
    awalA: number;
    awalB: number;
    kalimat?: boolean;
    tampil?: "garis" | "bingkai";
    tukar?: boolean;
    beda?: boolean;
    kembar?: boolean;
    bobot?: [number, number];
    ikonA?: string;
    ikonB?: string;
  };
  /** Tampilkan kalimat penjumlahan yang tumbuh pada layar contoh. */
  contohKalimat?: boolean;
  /** Cara menggambar soal lambang saat siswa dikembalikan ke benda. */
  tampilBenda?: Soal["tampil"];
  /** Tampilkan hitungan ketukan pada petunjuk (bawaan ya). */
  hitungKetuk?: boolean;
  contoh: Soal;
  setengah: Soal;
  kartu: { konsep: string; contoh: string; kesalahan: string; ingat: string };
  peta: { label: string[]; simpul: Array<[string, string, string]> };
};

export const KONFIG_S1: KonfigPelabuhan = {
  skillId: S1.SKILL_S1,
  nomor: 1,
  sub: "Sub-Bab A · Materi 1 dari 3",
  petunjuk: "Petunjuk: ketuk tiap benda, lalu hitung semuanya.",
  judulPendek: "Menggabungkan dua kelompok",
  penghubung: "dan",
  miskonsepsi: S1.MISKONSEPSI_S1,
  buatSoal: S1.buatSoal,
  buatCek: S1.buatCek,
  langkahContoh: S1.langkahContoh,
  cerita: {
    judul: "Cerita: Menggabungkan",
    panel: ["Lintang punya tiga apel di keranjang merah.", "Niko membawa empat apel di keranjang biru.", "Keranjang digabung. Kira-kira ada berapa?", "Ayo buktikan. Ketuk apel satu per satu."],
    a: 3,
    b: 4,
    tebak: [5, 7, 8, 9],
  },
  jelajah: { misiTotal: 7, kata: "tujuh", namaA: "Keranjang merah", namaB: "Keranjang biru", awalA: 2, awalB: 3 },
  contoh: { skillId: S1.SKILL_S1, bentuk: "benda", a: 3, b: 5, kunci: 8, pilihan: [], suara: "Tiga apel dan lima apel digabung." },
  setengah: {
    skillId: S1.SKILL_S1,
    bentuk: "benda",
    a: 4,
    b: 2,
    kunci: 6,
    pilihan: [
      { id: "p6", nilai: 6, miskonsepsi: null },
      { id: "p4", nilai: 4, miskonsepsi: "m-ambil-satu" },
      { id: "p7", nilai: 7, miskonsepsi: "m-hitung-dobel" },
      { id: "p5", nilai: 5, miskonsepsi: "m-lewat-satu" },
    ],
    suara: "Empat apel dan dua apel digabung. Jadi berapa?",
  },
  kartu: {
    konsep: "Menggabungkan: dua kelompok jadi satu, lalu hitung semuanya.",
    contoh: "Contoh: tiga apel dan empat apel jadi tujuh apel.",
    kesalahan: "Hanya menghitung satu keranjang. Hitung keduanya.",
    ingat: "Dua apel dan lima apel digabung jadi berapa?",
  },
  peta: {
    label: ["Digabung", "Hitung semua", "Dua kelompok"],
    simpul: [
      ["a", "Ada berapa semuanya? Kita...", "Hitung semua"],
      ["b", "Dua keranjang itu...", "Digabung"],
      ["c", "Di awal cerita ada...", "Dua kelompok"],
    ],
  },
};

export const KONFIG_S2: KonfigPelabuhan = {
  skillId: S2.SKILL_S2,
  nomor: 2,
  sub: "Sub-Bab A · Materi 2 dari 3",
  petunjuk: "Petunjuk: ketuk tiap benda, yang awal dan yang baru.",
  judulPendek: "Apel datang lagi",
  penghubung: "datang lagi",
  miskonsepsi: S2.MISKONSEPSI_S2,
  buatSoal: S2.buatSoal,
  buatCek: S2.buatCek,
  langkahContoh: S2.langkahContoh,
  cerita: {
    judul: "Cerita: Apel datang lagi",
    panel: ["Tala punya tiga apel di perahu.", "Perahu Niko merapat. Datang lagi empat apel.", "Sekarang ada berapa apel di perahu?", "Ayo buktikan. Ketuk apel satu per satu."],
    a: 3,
    b: 4,
    tebak: [4, 6, 7, 8],
  },
  jelajah: { misiTotal: 8, kata: "delapan", namaA: "Apel di perahu", namaB: "Apel datang lagi", awalA: 3, awalB: 2 },
  contoh: { skillId: S2.SKILL_S2, bentuk: "benda", a: 2, b: 5, kunci: 7, pilihan: [], suara: "Dua apel. Datang lagi lima apel." },
  setengah: {
    skillId: S2.SKILL_S2,
    bentuk: "benda",
    a: 6,
    b: 2,
    kunci: 8,
    pilihan: [
      { id: "p8", nilai: 8, miskonsepsi: null },
      { id: "p6", nilai: 6, miskonsepsi: "m-ambil-satu" },
      { id: "p9", nilai: 9, miskonsepsi: "m-hitung-dobel" },
      { id: "p7", nilai: 7, miskonsepsi: "m-lewat-satu" },
    ],
    suara: "Enam apel. Datang lagi dua apel. Jadi berapa?",
  },
  kartu: {
    konsep: "Datang lagi: ada yang ikut masuk. Hitung semuanya.",
    contoh: "Contoh: tiga apel, datang lagi empat apel, jadi tujuh apel.",
    kesalahan: "Hanya menghitung yang datang lagi. Hitung juga yang awal.",
    ingat: "Lima apel. Datang lagi dua apel. Jadi berapa?",
  },
  peta: {
    label: ["Awal", "Datang lagi", "Hitung semua"],
    simpul: [
      ["a", "Di awal cerita ada yang...", "Awal"],
      ["b", "Yang ikut masuk disebut...", "Datang lagi"],
      ["c", "Untuk tahu semuanya, kita...", "Hitung semua"],
    ],
  },
};

/** Daftar pelabuhan menurut id; dipakai halaman lewat id supaya tidak ada fungsi yang melintas server ke klien. */
export const KONFIG_S3: KonfigPelabuhan = {
  skillId: S3.SKILL_S3,
  nomor: 3,
  sub: "Sub-Bab A · Materi 3 dari 3",
  petunjuk: "Petunjuk: hitung bendanya, lalu cari kalimat yang cocok.",
  judulPendek: "Menulis dan membaca kalimat penjumlahan",
  contohKalimat: true,
  penghubung: "dan",
  miskonsepsi: S3.MISKONSEPSI_S3,
  buatSoal: S3.buatSoal,
  buatCek: S3.buatCek,
  langkahContoh: S3.langkahContoh,
  cerita: {
    judul: "Cerita: Papan tulis Igil",
    panel: ["Lintang punya dua apel.", "Niko membawa lima apel.", "Igil menulis dua dan lima. Tanda apa di tengah?", "Tandanya ditambah. Ketuk apel, lalu baca."],
    a: 2,
    b: 5,
    tebak: ["+", "=", "★", "♥"],
  },
  jelajah: { misiTotal: 9, kata: "sembilan", namaA: "Apel Lintang", namaB: "Apel Niko", awalA: 4, awalB: 2, kalimat: true },
  contoh: { skillId: S3.SKILL_S3, bentuk: "benda", a: 3, b: 4, kunci: 7, pilihan: [], suara: "Tiga apel dan empat apel." },
  setengah: {
    skillId: S3.SKILL_S3,
    bentuk: "benda",
    a: 5,
    b: 2,
    kunci: 7,
    pilihan: [
      { id: "p0", nilai: 7, miskonsepsi: null, label: S3.tulis(5, 2, 7) },
      { id: "p1", nilai: 8, miskonsepsi: "m-hitung-dobel", label: S3.tulis(5, 2, 8) },
      { id: "p2", nilai: 6, miskonsepsi: "m-lewat-satu", label: S3.tulis(5, 2, 6) },
      { id: "p3", nilai: 7, miskonsepsi: "m-tanda-tukar", label: "5 = 2 + 7" },
    ],
    suara: "Lima apel dan dua apel. Pilih kalimatnya.",
  },
  kartu: {
    konsep: "Kalimat penjumlahan: 3 + 4 = 7. Dibaca: tiga ditambah empat hasilnya adalah tujuh.",
    contoh: "Tanda + berarti ditambah. Tanda = berarti hasilnya adalah.",
    kesalahan: "Menukar tempat tanda. Hasil selalu di akhir, setelah tanda =.",
    ingat: "Dua apel dan tiga apel. Tulis kalimat penjumlahannya.",
  },
  peta: {
    label: ["Tanda +", "Tanda =", "Ditambah"],
    simpul: [
      ["a", "Tanda untuk menggabung adalah...", "Tanda +"],
      ["b", "Tanda untuk hasilnya adalah...", "Tanda ="],
      ["c", "Tanda + dibaca...", "Ditambah"],
    ],
  },
};

export const KONFIGURASI = {
  s1: KONFIG_S1,
  s2: KONFIG_S2,
  s3: KONFIG_S3,
  s4: KONFIG_S4,
  s5: KONFIG_S5,
  s6: KONFIG_S6,
  s7: KONFIG_S7,
  s8: KONFIG_S8,
  s9: KONFIG_S9,
  s10: KONFIG_S10,
} as const;
