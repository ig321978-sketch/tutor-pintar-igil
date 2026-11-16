/**
 * Tipe bersama Mesin Soal Tindakan Opsi 2 (tahap Concrete, Picture, Abstract).
 * Logika murni tanpa React; diuji di Node (scripts/uji-opsi2-mesin.mjs).
 * Kontrak lengkap: naskah/mesin-tindakan-opsi2.md.
 */

export type Tahap = "concrete" | "picture" | "abstract";

/** Parameter satu soal (angka, rentang, jenis benda). Murni data JSON. */
export type Param = Record<string, unknown>;

/** Spesifikasi satu soal di katalog sub-bab: satu nomor, satu tindakan. */
export type SoalSpec = {
  /** 1 sampai 10, tanpa lompat atau kembar. */
  nomor: number;
  /** Id tindakan terdaftar di registri untuk tahapnya. */
  tindakan: string;
  /**
   * Teks instruksi orisinal (suara dan layar). Boleh memuat sisipan {n}, {a}, dan sebagainya
   * yang diisi pembangkit dengan bilangan yang DIEJA. Kalimat paling banyak delapan kata.
   */
  instruksi: string;
  param: Param;
};

/** Satu pilihan jawaban. Pilihan tidak memuat penanda benar; kuncinya ada di `kunciPilihan`. */
export type Pilihan = {
  id: string;
  /** Teks layar. Di Concrete tanpa digit (kata bilangan atau nama benda). */
  label: string;
  /** Yang dibacakan saat pilihan didengar. Tanpa digit. */
  suara: string;
};

/** Pengecoh dan kekeliruan nyata anak yang diwakilinya (dicatat agar bisa diuji, bukan acak). */
export type Pengecoh = { id: string; alasan: string };

/** Petunjuk berbentuk tindakan: bagian benda (atau pilihan) bertanda berkedip, plus satu kalimat pendek. */
export type Petunjuk = { sasaran: string[]; pesan: string };

export type Hasil = { benar: boolean; petunjuk?: Petunjuk };

/**
 * Bentuk jawaban (penanda dokumentasi untuk komponen dan uji):
 *  - "pilihan"   : satu pilihan dari daftar `pilihan`.
 *  - "gabungan"  : tindakan benda lalu pilihan banyaknya.
 *  - "himpunan"  : sekumpulan id benda atau petak.
 *  - "jumlah"    : banyaknya benda yang ditaruh di wadah atau petak yang diisi.
 *  - "urutan"    : id dalam urutan tertentu.
 *  - "ketuk"     : satu target yang diketuk.
 *  - "tulisan"   : goresan atau teks yang ditulis.
 *  - "garis"     : pasangan hubungan.
 */
export type BentukJawaban = "pilihan" | "gabungan" | "himpunan" | "jumlah" | "urutan" | "ketuk" | "tulisan" | "garis";

/** Satu soal yang sudah dibangkitkan dari spesifikasi dan benih. Seluruhnya data JSON (tanpa fungsi). */
export type SoalInstans = {
  nomor: number;
  tindakan: string;
  tahap: Tahap;
  /** Instruksi yang dibacakan. TANPA digit. */
  suara: string;
  /** Teks layar (boleh sama dengan suara). */
  layar: string;
  bentuk: BentukJawaban;
  /** Data bentuk untuk komponen tindakan (posisi benda, jenis, dan seterusnya). */
  data: Record<string, unknown>;
  pilihan?: Pilihan[];
  /** Id pilihan yang benar. Ada bila `pilihan` ada. */
  kunciPilihan?: string;
  pengecoh?: Pengecoh[];
  /** Kunci hasil hitung pembangkit (bentuknya bebas per tindakan). Dihitung ulang terpisah di uji. */
  kunci: unknown;
  /** Banyaknya percobaan: jumlah pilihan, atau tiga bila tanpa pilihan. */
  percobaan: number;
  /** Dibacakan dan ditampilkan sesudah jawaban benar atau percobaan habis. TANPA digit. */
  penjelasan: string;
};

/** Satu tindakan terdaftar. `buat` murni dan berbenih: spesifikasi dan benih sama menghasilkan soal sama. */
export type Tindakan = {
  id: string;
  tahap: Tahap;
  /** Nama pendek untuk pengembang. */
  nama: string;
  buat: (spec: SoalSpec, benih: number) => SoalInstans;
  /** `jawaban` bentuknya ditentukan tindakan (lihat komponennya). Tidak boleh melempar galat untuk jawaban asing. */
  periksa: (instans: SoalInstans, jawaban: unknown) => Hasil;
  /** Jawaban benar dalam bentuk yang sama dengan yang dikirim komponen; dipakai untuk menunjukkan kunci. */
  jawabanBenar: (instans: SoalInstans) => unknown;
};

export const JUMLAH_SOAL_TAHAP = 10;
export const PERCOBAAN_TANPA_PILIHAN = 3;
