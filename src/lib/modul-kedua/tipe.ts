/** Tipe data umum Modul Kedua (pola SMISCPA). Isi materi ada di src/data/modul-kedua/*.json. */

export type Level = "Dasar" | "Mahir" | "Juara";
export type Kognitif = "knowing" | "applying" | "reasoning";
/** Sub-capaian elemen Bilangan (Fase A). */
export type ElemenCP = "membilang" | "membaca-menulis" | "membandingkan" | "mengurutkan";
export type TahapId =
  | "pretest" | "story" | "peta" | "infografis" | "simulasi"
  | "concrete" | "pictorial" | "abstract" | "posttest";
export type Representasi = "concrete" | "pictorial" | "abstract";

/** Spesifikasi soal berparameter (ditulis di berkas data). */
export type SpesifikasiSoal = {
  id: string;
  gen: string;
  level: Level;
  kognitif: Kognitif;
  elemen: ElemenCP;
  /** parameter bebas per pembangkit, mis. {min:1,max:5}. */
  param?: Record<string, number | string | number[] | string[]>;
};

export type LangkahPolya = { tahap: "Pahami" | "Rencanakan" | "Lakukan" | "Periksa"; teks: string };

export type VisualSoal =
  | { jenis: "benda"; emoji: string; jumlah: number; kotakKosong?: boolean; bisaKetuk?: boolean }
  | { jenis: "dua-kelompok"; a: { emoji: string; jumlah: number }; b: { emoji: string; jumlah: number } }
  | { jenis: "turus"; jumlah: number }
  | { jenis: "kotak-sepuluh"; jumlah: number }
  | { jenis: "garis-bilangan"; titik?: number; dari: number; sampai: number; sembunyi?: boolean }
  | { jenis: "piktogram"; baris: { label: string; emoji: string; jumlah: number }[] }
  | { jenis: "isi-keranjang"; emoji: string; sediaan: number; target: number }
  | { jenis: "angka-besar"; teks: string }
  | { jenis: "urutan"; deret: (number | null)[] }
  | { jenis: "tidak-ada" };

/** Soal yang sudah dibangkitkan (angka sudah pasti). */
export type SoalJadi = {
  id: string;
  gen: string;
  level: Level;
  kognitif: Kognitif;
  elemen: ElemenCP;
  representasi: Representasi;
  /** teks tampil (boleh memuat angka). */
  teks: string;
  /** teks ucap untuk suara (tanpa digit; angka dieja). */
  suara: string;
  visual: VisualSoal;
  /** "pilih" = pilih jawaban; "isi-keranjang" = seret benda ke keranjang. */
  mode: "pilih" | "isi-keranjang";
  pilihan: string[];
  /** teks pilihan yang benar (juga dipakai mode isi-keranjang: jumlah sebagai string). */
  kunci: string;
  petunjuk: string;
  /** Penjelasan "mengapa", tampil setelah menjawab. */
  mengapa: string;
  polya: LangkahPolya[];
  nonRutin?: boolean;
};

export type CatatanButir = {
  idSoal: string;
  gen: string;
  level: Level;
  kognitif: Kognitif;
  elemen: ElemenCP;
  benar: boolean;
  percobaan: number;
  petunjuk: number;
  detik: number;
};

export type HasilTahap = {
  tahap: TahapId;
  indeks: number; // 0..100
  detik: number;
  percobaan: number;
  petunjuk: number;
  butir: CatatanButir[];
  waktu: string;
  putaranRemedial: number;
  tuntas: boolean;
};

export type DataModul = {
  id: string;
  judul: string;
  subBab: string;
  fase: string;
  elemenKonten: string;
  tujuan: string[];
  story: {
    judul: string;
    pertanyaanPemantik: string;
    adegan: Adegan[];
  };
  peta: PetaKonsep;
  infografis: Infografis;
  simulasi: Simulasi;
  tes: { pra: SpesifikasiSoal[]; pasca: SpesifikasiSoal[] };
  latihan: { concrete: SpesifikasiSoal[]; pictorial: SpesifikasiSoal[]; abstract: SpesifikasiSoal[] };
  jembatan: { cp: string; pa: string };
  remedial: Record<string, { penjelasan: string[]; soal: SpesifikasiSoal[] }>;
};

export type Adegan = {
  id: string;
  latar: "pasar-ikan" | "pantai" | "rumah";
  tokoh: { nama: string; x: number }[];
  benda?: { emoji: string; jumlah: number; hitung?: boolean };
  /** Narasi yang diucapkan: WAJIB tanpa digit. */
  narasi: string;
  /** Catatan produksi video: visual yang dibayangkan. */
  visual: string;
  durasiDetik: number;
};

export type PetaNode = {
  id: string;
  label: string;
  jenis: "inti" | "subkonsep" | "prasyarat" | "lanjutan" | "kehidupan";
  penjelasan: string;
  contoh: string;
};
export type PetaKonsep = { node: PetaNode[]; lengkapi: string[] };

export type Infografis = {
  definisi: string[];
  aturan: string[];
  contoh: { teks: string; visual: string }[];
  miskonsepsi: { salah: string; benar: string }[];
  faktaMenarik: string;
};

export type Simulasi = {
  eksplorasi: string;
  tantangan: { id: string; instruksi: string; jenis: "buat-jumlah" | "geser-garis"; min: number; max: number; mengapa: string }[];
  refleksi: { tanya: string; pilihan: string[]; benar: number; umpanBalik: string };
};
