/**
 * Data murni Matematika Kelas 3 Bab 5 (Penyajian Data dalam Tabel): Sub-Bab A (mengurutkan dan membandingkan data: data
 * terkecil dan terbesar, jangkauan, banyak data) dan Sub-Bab B (menyajikan data dalam bentuk tabel: turus kelompok lima,
 * tabel nilai, huruf, dan manik). Tanpa React, tanpa acak, tanpa jaringan. Kunci selalu dihitung dari data.
 * Uji: scripts/uji-data-k3b5.mjs.
 */
import type { KalimatIsian, KotakPeta, Pernyataan, SoalDetektif } from "./data-k3b1";

export type { KalimatIsian, KotakPeta, Pernyataan, SoalDetektif };

export const HURUF = ["A", "B", "C", "D", "E", "F"];

/** Tiga pilihan teks: satu benar dan dua pengecoh. */
export type SoalTeks = { tanya: string; benar: string; salah: [string, string]; pesan: string };

/** Urutan tampil beberapa pilihan, tetap tanpa acak. */
export function urutanTetap(n: number, langkah = 3, geser = 0): number[] {
  const g = ((geser % n) + n) % n;
  const awal = (g * langkah) % n;
  return Array.from({ length: n }, (_, i) => (i + awal) % n);
}

/** Urutan tampil yang harus diurutkan siswa: putaran tetap yang dijamin berbeda dari urutan kunci. */
export function urutTampil<T>(daftar: readonly T[], kunci: readonly T[], nomor: number): T[] {
  const n = daftar.length;
  for (let g = 0; g < n; g += 1) {
    const p = urutanTetap(n, 2, nomor + g).map((i) => daftar[i]);
    if (JSON.stringify(p) !== JSON.stringify(kunci)) return p;
  }
  return [...daftar].reverse();
}

/** Tiga pilihan teks: satu benar dan dua pengecoh, kunci berpindah tempat. */
export function susunOpsi(benar: string, pengecoh: [string, string], nomor: number): { opsi: string[]; jawab: number } {
  const semua = [benar, pengecoh[0], pengecoh[1]];
  const opsi = urutanTetap(3, 2, nomor).map((i) => semua[i]);
  return { opsi, jawab: opsi.indexOf(benar) };
}

/** Tiga pilihan bilangan: kunci, satu lebih, dan satu kurang. Kunci berpindah tempat. */
export function opsiAngka(n: number, nomor: number): number[] {
  const semua = [n, n + 1, n >= 2 ? n - 1 : n + 2];
  return urutanTetap(3, 2, nomor).map((i) => semua[i]);
}

export const kapital = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

/* ====================================================================== */
/* Pembantu data                                                            */
/* ====================================================================== */

export const urutNaik = (d: readonly number[]): number[] => [...d].sort((x, y) => x - y);
export const nilaiTerkecil = (d: readonly number[]): number => Math.min(...d);
export const nilaiTerbesar = (d: readonly number[]): number => Math.max(...d);
/** Jangkauan = nilai data terbesar dikurangi nilai data terkecil. */
export const jangkauan = (d: readonly number[]): number => nilaiTerbesar(d) - nilaiTerkecil(d);
export const banyakNilai = (d: readonly number[], v: number): number => d.filter((x) => x === v).length;
/** Ringkasan data: tiap nilai dan banyaknya, dari nilai terkecil. */
export function ringkasData(d: readonly number[]): { nilai: number; banyak: number }[] {
  return [...new Set(urutNaik(d))].map((nilai) => ({ nilai, banyak: banyakNilai(d, nilai) }));
}
/** Banyak huruf `h` pada kata, tanpa membedakan huruf besar dan kecil. */
export const banyakHuruf = (kata: string, h: string): number => [...kata.toUpperCase()].filter((c) => c === h.toUpperCase()).length;
/** Huruf-huruf berbeda pada kata menurut kemunculan pertama. */
export const hurufBerbeda = (kata: string): string[] => [...new Set([...kata.toUpperCase()].filter((c) => /[A-Z]/.test(c)))];
export const jumlahHuruf = (kata: string): number => [...kata.toUpperCase()].filter((c) => /[A-Z]/.test(c)).length;

export type Anak = { nama: string; n: number };
export type BendaData = "apel" | "bola" | "kue" | "buku" | "pensil";
export const BENDA_DATA: Record<BendaData, { emoji: string; nama: string }> = {
  apel: { emoji: "🍎", nama: "apel" },
  bola: { emoji: "⚽", nama: "bola" },
  kue: { emoji: "🍪", nama: "kue" },
  buku: { emoji: "📖", nama: "buku" },
  pensil: { emoji: "✏️", nama: "pensil" },
};
const an = (nama: string, n: number): Anak => ({ nama, n });

export type Syarat = { jenis: "lebih" | "kurang" | "sama"; acuan: number };
export const cocokSyarat = (s: Syarat, n: number): boolean => (s.jenis === "lebih" ? n > s.acuan : s.jenis === "kurang" ? n < s.acuan : n === s.acuan);
export const kataSyarat = (s: Syarat): string => (s.jenis === "lebih" ? `lebih dari ${s.acuan}` : s.jenis === "kurang" ? `kurang dari ${s.acuan}` : `sama dengan ${s.acuan}`);

/** Jenis pertanyaan "paling": paling banyak atau paling sedikit. */
export type Paling = "banyak" | "sedikit";
export const kataPaling = (p: Paling): string => (p === "banyak" ? "paling banyak" : "paling sedikit");
export const idAnak = (a: Anak): string => `${a.nama}${a.n}`;
export function anakPaling(anak: readonly Anak[], p: Paling): Anak {
  const n = p === "banyak" ? Math.max(...anak.map((a) => a.n)) : Math.min(...anak.map((a) => a.n));
  return anak.find((a) => a.n === n) as Anak;
}
export const jumlahAnak = (anak: readonly Anak[]): number => anak.reduce((s, a) => s + a.n, 0);
export const jangkauanAnak = (anak: readonly Anak[]): number => jangkauan(anak.map((a) => a.n));

/* ====================================================================== */
/* SUB-BAB A. Mengurutkan dan membandingkan data                            */
/* ====================================================================== */

/* ------------------------------ Concrete A ------------------------------ */

/** CA1 Urutkan Anak menurut Banyak Benda. */
export const RONDE_URUT_CA: { benda: BendaData; anak: Anak[]; dari: "kecil" | "besar" }[] = [
  { benda: "apel", anak: [an("Alen", 3), an("Meutia", 7), an("Galih", 5)], dari: "kecil" },
  { benda: "bola", anak: [an("Alfa", 6), an("Andi", 2), an("Beni", 4)], dari: "besar" },
  { benda: "kue", anak: [an("Citra", 5), an("Dewi", 8), an("Alen", 3)], dari: "kecil" },
];
/** CA2 Ketuk yang Paling Banyak atau Paling Sedikit. */
export const RONDE_PALING_CA: { benda: BendaData; anak: Anak[]; tanya: Paling[] }[] = [
  { benda: "buku", anak: [an("Galih", 4), an("Alfa", 9), an("Andi", 6)], tanya: ["banyak", "sedikit"] },
  { benda: "pensil", anak: [an("Beni", 3), an("Citra", 8), an("Dewi", 5)], tanya: ["sedikit", "banyak"] },
  { benda: "apel", anak: [an("Alen", 7), an("Meutia", 2), an("Galih", 5)], tanya: ["banyak", "sedikit"] },
];
/** CA3 Selisih Terbanyak dan Tersedikit (jangkauan): dua soal per ronde. */
export const RONDE_SELISIH_CA: { benda: BendaData; anak: Anak[] }[][] = [
  [{ benda: "kue", anak: [an("Alen", 3), an("Meutia", 7), an("Galih", 5), an("Alfa", 7), an("Andi", 2)] }, { benda: "apel", anak: [an("Beni", 4), an("Citra", 9), an("Dewi", 6)] }],
  [{ benda: "bola", anak: [an("Alen", 2), an("Galih", 8), an("Alfa", 5), an("Andi", 6)] }, { benda: "buku", anak: [an("Beni", 5), an("Citra", 10), an("Dewi", 7)] }],
  [{ benda: "pensil", anak: [an("Meutia", 6), an("Galih", 10), an("Alfa", 7), an("Andi", 9)] }, { benda: "kue", anak: [an("Beni", 1), an("Citra", 6), an("Dewi", 3), an("Alen", 4)] }],
];
/** CA4 Jodohkan Tumpukan dan Banyaknya: tiga banyak berbeda. */
export const RONDE_JODOH_CA: { benda: BendaData; anak: Anak[] }[] = [
  { benda: "apel", anak: [an("Alen", 3), an("Meutia", 6), an("Galih", 9)] },
  { benda: "bola", anak: [an("Alfa", 4), an("Andi", 7), an("Beni", 2)] },
  { benda: "kue", anak: [an("Citra", 5), an("Dewi", 8), an("Alen", 1)] },
];
/** CA5 Memori Tumpukan dan Banyaknya: empat banyak berbeda. */
export const RONDE_MEMORI_CA: { benda: BendaData; n: number[] }[] = [
  { benda: "apel", n: [2, 4, 6, 9] },
  { benda: "buku", n: [3, 5, 7, 8] },
  { benda: "pensil", n: [1, 4, 6, 8] },
];
/** CA6 Ketuk Semua Tumpukan dengan Syarat. */
export const RONDE_SEMUA_CA: { benda: BendaData; syarat: Syarat; anak: Anak[] }[] = [
  { benda: "apel", syarat: { jenis: "lebih", acuan: 5 }, anak: [an("Alen", 3), an("Meutia", 7), an("Galih", 5), an("Alfa", 8)] },
  { benda: "bola", syarat: { jenis: "kurang", acuan: 5 }, anak: [an("Andi", 2), an("Beni", 6), an("Citra", 4), an("Dewi", 9)] },
  { benda: "kue", syarat: { jenis: "sama", acuan: 6 }, anak: [an("Alen", 6), an("Meutia", 3), an("Galih", 6), an("Alfa", 8)] },
];
/** CA7 Papan: Berapa Banyak Benda. */
export const RONDE_PAPAN_CA: { benda: BendaData; n: number }[][] = [
  [{ benda: "apel", n: 12 }, { benda: "bola", n: 7 }],
  [{ benda: "kue", n: 15 }, { benda: "buku", n: 9 }],
  [{ benda: "pensil", n: 18 }, { benda: "apel", n: 11 }],
];
/** CA8 Jumlah Benda Semua Anak: dua soal per ronde. */
export const RONDE_TOTAL_CA: { benda: BendaData; anak: Anak[] }[][] = [
  [{ benda: "apel", anak: [an("Alen", 3), an("Meutia", 7), an("Galih", 5)] }, { benda: "bola", anak: [an("Alfa", 4), an("Andi", 2)] }],
  [{ benda: "kue", anak: [an("Beni", 6), an("Citra", 4), an("Dewi", 5)] }, { benda: "buku", anak: [an("Alen", 8), an("Galih", 3)] }],
  [{ benda: "pensil", anak: [an("Meutia", 5), an("Alfa", 9), an("Andi", 2)] }, { benda: "apel", anak: [an("Beni", 7), an("Citra", 6)] }],
];
/** CA9 Pilah Tumpukan: sedikit (kurang dari 5), sedang (5 sampai 7), atau banyak (lebih dari 7). */
export type BinBanyak = "sedikit" | "sedang" | "banyak";
export const binBanyak = (n: number): BinBanyak => (n < 5 ? "sedikit" : n <= 7 ? "sedang" : "banyak");
export const RONDE_PILAH_CA: { benda: BendaData; n: number[] }[] = [
  { benda: "apel", n: [2, 8, 5, 3, 9, 6] },
  { benda: "bola", n: [4, 10, 7, 1, 6, 9] },
  { benda: "kue", n: [3, 5, 8, 2, 7, 10] },
];
/** CA10 Berapa Lebih Banyak: dua anak, selisih banyak benda. */
export const RONDE_BEDA_CA: { benda: BendaData; a: Anak; b: Anak }[][] = [
  [{ benda: "apel", a: an("Alen", 3), b: an("Meutia", 7) }, { benda: "bola", a: an("Galih", 9), b: an("Alfa", 5) }],
  [{ benda: "kue", a: an("Andi", 4), b: an("Beni", 10) }, { benda: "buku", a: an("Citra", 8), b: an("Dewi", 3) }],
  [{ benda: "pensil", a: an("Alen", 6), b: an("Galih", 2) }, { benda: "apel", a: an("Meutia", 5), b: an("Alfa", 12) }],
];

/* ------------------------------ Picture A ------------------------------ */

/** PA1 Baca Turus: banyak data pada gambar turus. */
export const RONDE_BACA_PA: number[][] = [[4, 7], [9, 12], [11, 14]];
/** PA2 Urutkan Turus. */
export const RONDE_URUT_PA: { n: number[]; dari: "kecil" | "besar" }[] = [
  { n: [6, 3, 9], dari: "kecil" },
  { n: [8, 12, 5], dari: "besar" },
  { n: [7, 4, 10], dari: "kecil" },
];
/** PA3 Ketuk Turus Paling Banyak atau Paling Sedikit. */
export const RONDE_PALING_PA: { n: number[]; tanya: Paling[] }[] = [
  { n: [5, 11, 8], tanya: ["banyak", "sedikit"] },
  { n: [7, 3, 10], tanya: ["sedikit", "banyak"] },
  { n: [9, 6, 13], tanya: ["banyak", "sedikit"] },
];
/** PA4 Jangkauan dari Tabel Turus: dua soal per ronde. */
export const RONDE_JANGKAUAN_PA: Anak[][][] = [
  [[an("Alen", 6), an("Meutia", 11), an("Galih", 8), an("Alfa", 4)], [an("Andi", 5), an("Beni", 12), an("Citra", 9)]],
  [[an("Alen", 4), an("Meutia", 9), an("Galih", 10), an("Alfa", 6)], [an("Andi", 3), an("Beni", 8), an("Citra", 11)]],
  [[an("Alen", 7), an("Meutia", 12), an("Galih", 9), an("Alfa", 5)], [an("Andi", 6), an("Beni", 10), an("Citra", 13)]],
];
/** PA5 Jodohkan Turus dan Banyaknya: tiga banyak berbeda. */
export const RONDE_JODOH_PA: number[][] = [[3, 6, 8], [4, 7, 9], [2, 5, 9]];
/** PA6 Memori Turus dan Banyaknya: empat banyak berbeda. */
export const RONDE_MEMORI_PA: number[][] = [[2, 4, 6, 9], [3, 5, 7, 8], [1, 4, 6, 8]];
/** PA7 Ketuk Semua Turus dengan Syarat. */
export const RONDE_SEMUA_PA: { syarat: Syarat; n: number[] }[] = [
  { syarat: { jenis: "lebih", acuan: 6 }, n: [4, 9, 6, 12] },
  { syarat: { jenis: "kurang", acuan: 7 }, n: [10, 5, 7, 3] },
  { syarat: { jenis: "sama", acuan: 8 }, n: [8, 5, 11, 8] },
];
/** PA8 Pilah Turus: kurang dari 5, 5 sampai 9, atau 10 atau lebih. */
export type BinTurus = "kecil" | "tengah" | "besar";
export const binTurus = (n: number): BinTurus => (n < 5 ? "kecil" : n < 10 ? "tengah" : "besar");
export const RONDE_PILAH_PA: number[][] = [[3, 7, 11, 2, 8, 13], [4, 9, 12, 1, 6, 14], [2, 5, 10, 3, 9, 12]];
/** PA9 Nilai yang Terbanyak pada tabel nilai dan turus: dua soal per ronde. */
export type BarisNilai = { nilai: number; banyak: number };
export const RONDE_TERBANYAK_PA: BarisNilai[][][] = [
  [[{ nilai: 6, banyak: 3 }, { nilai: 7, banyak: 5 }, { nilai: 8, banyak: 2 }, { nilai: 9, banyak: 4 }], [{ nilai: 5, banyak: 4 }, { nilai: 6, banyak: 2 }, { nilai: 7, banyak: 7 }, { nilai: 8, banyak: 3 }]],
  [[{ nilai: 7, banyak: 2 }, { nilai: 8, banyak: 6 }, { nilai: 9, banyak: 4 }, { nilai: 10, banyak: 3 }], [{ nilai: 6, banyak: 5 }, { nilai: 7, banyak: 3 }, { nilai: 8, banyak: 4 }, { nilai: 9, banyak: 8 }]],
  [[{ nilai: 5, banyak: 6 }, { nilai: 6, banyak: 3 }, { nilai: 7, banyak: 4 }, { nilai: 8, banyak: 2 }], [{ nilai: 7, banyak: 4 }, { nilai: 8, banyak: 9 }, { nilai: 9, banyak: 5 }, { nilai: 10, banyak: 2 }]],
];
export const nilaiTerbanyak = (t: readonly BarisNilai[]): number => (t.find((b) => b.banyak === Math.max(...t.map((x) => x.banyak))) as BarisNilai).nilai;
/** PA10 Lebih atau Kurang dari: banyak siswa pada tabel nilai. */
export type SoalLebihKurang = { tabel: BarisNilai[]; jenis: "lebih" | "kurang"; acuan: number };
export const hitungLebihKurang = (s: SoalLebihKurang): number => s.tabel.filter((b) => (s.jenis === "lebih" ? b.nilai > s.acuan : b.nilai < s.acuan)).reduce((x, b) => x + b.banyak, 0);
const TABEL_NILAI: BarisNilai[] = [{ nilai: 5, banyak: 2 }, { nilai: 6, banyak: 3 }, { nilai: 7, banyak: 3 }, { nilai: 8, banyak: 4 }, { nilai: 9, banyak: 6 }, { nilai: 10, banyak: 2 }];
export const RONDE_LEBIH_PA: SoalLebihKurang[][] = [
  [{ tabel: TABEL_NILAI, jenis: "lebih", acuan: 7 }, { tabel: TABEL_NILAI, jenis: "kurang", acuan: 7 }],
  [{ tabel: TABEL_NILAI, jenis: "lebih", acuan: 8 }, { tabel: TABEL_NILAI, jenis: "kurang", acuan: 6 }],
  [{ tabel: TABEL_NILAI, jenis: "lebih", acuan: 6 }, { tabel: TABEL_NILAI, jenis: "kurang", acuan: 9 }],
];

/* ------------------------------ Abstract A ------------------------------ */

/** QA1 Urutkan Nilai Data. */
export const RONDE_URUTNILAI_QA: { nilai: number[]; dari: "kecil" | "besar" }[] = [
  { nilai: [7, 3, 9, 5], dari: "kecil" },
  { nilai: [12, 4, 8, 15], dari: "besar" },
  { nilai: [6, 10, 2, 8, 5], dari: "kecil" },
];
/** Daftar data nilai ulangan dari buku (20 data). */
export const DATA_ULANGAN: number[] = [9, 9, 7, 8, 6, 10, 5, 9, 8, 7, 7, 9, 6, 6, 6, 8, 9, 10, 7, 7];
/** QA2 Nilai Terkecil dan Terbesar: dua soal per ronde. */
export type SoalMinMax = { data: number[]; tanya: "terkecil" | "terbesar" };
export const RONDE_MINMAX_QA: SoalMinMax[][] = [
  [{ data: DATA_ULANGAN, tanya: "terkecil" }, { data: DATA_ULANGAN, tanya: "terbesar" }],
  [{ data: [14, 9, 21, 12, 18, 9], tanya: "terbesar" }, { data: [14, 9, 21, 12, 18, 9], tanya: "terkecil" }],
  [{ data: [3, 8, 6, 8, 11, 5, 3], tanya: "terkecil" }, { data: [25, 40, 35, 30, 45, 40], tanya: "terbesar" }],
];
export const jawabMinMax = (s: SoalMinMax): number => (s.tanya === "terkecil" ? nilaiTerkecil(s.data) : nilaiTerbesar(s.data));
/** QA3 Jangkauan Data: dua soal per ronde. */
export const RONDE_JANGKAUAN_QA: number[][][] = [
  [[3, 7, 5, 7, 2], [9, 4, 12, 6, 8]],
  [DATA_ULANGAN, [10, 15, 12, 20, 14]],
  [[6, 6, 9, 10, 7, 8], [15, 8, 22, 11, 19]],
];
/** QA4 Banyak Nilai pada Data: dua soal per ronde. */
export type SoalBanyakNilai = { data: number[]; nilai: number };
export const RONDE_BANYAKNILAI_QA: SoalBanyakNilai[][] = [
  [{ data: DATA_ULANGAN, nilai: 9 }, { data: DATA_ULANGAN, nilai: 10 }],
  [{ data: DATA_ULANGAN, nilai: 7 }, { data: DATA_ULANGAN, nilai: 6 }],
  [{ data: DATA_ULANGAN, nilai: 8 }, { data: DATA_ULANGAN, nilai: 5 }],
];
/** QA5 Lengkapi Kalimat Tentang Data. */
export const RONDE_KALIMAT_QA: KalimatIsian[][] = [
  [
    { depan: "Nilai data yang paling kecil disebut data", belakang: ".", opsi: ["terkecil", "terbesar", "terbanyak"], benar: 0 },
    { depan: "Nilai data yang paling besar disebut data", belakang: ".", opsi: ["terbesar", "terkecil", "tersedikit"], benar: 0 },
    { depan: "Selisih data terbesar dan data terkecil disebut", belakang: ".", opsi: ["jangkauan", "turus", "tabel"], benar: 0 },
  ],
  [
    { depan: "Jangkauan sama dengan data terbesar", belakang: "data terkecil.", opsi: ["dikurangi", "ditambah", "dikali"], benar: 0 },
    { depan: "Data diurutkan dari yang", belakang: "ke yang terbesar.", opsi: ["terkecil", "terbanyak", "terlama"], benar: 0 },
    { depan: "Turus adalah garis", belakang: "yang menyatakan banyaknya data.", opsi: ["tegak", "lengkung", "mendatar"], benar: 0 },
  ],
  [
    { depan: "Bila nilai terbesar 10 dan terkecil 5, jangkauannya", belakang: ".", opsi: ["5", "15", "10"], benar: 0 },
    { depan: "Dua anak yang memiliki banyak benda sama berarti datanya", belakang: ".", opsi: ["sama", "berbeda", "terbesar"], benar: 0 },
    { depan: "Mengurutkan data memudahkan kita mencari data", belakang: "dan terbesar.", opsi: ["terkecil", "terlama", "tertinggi"], benar: 0 },
  ],
];
/** QA6 Jodohkan Istilah dan Artinya: tiga pasangan berbeda. */
export const RONDE_JODOH_QA: { kiri: string; kanan: string }[][] = [
  [{ kiri: "Data terkecil", kanan: "Nilai paling kecil" }, { kiri: "Data terbesar", kanan: "Nilai paling besar" }, { kiri: "Jangkauan", kanan: "Selisih terbesar dan terkecil" }],
  [{ kiri: "Turus", kanan: "Garis tegak penanda data" }, { kiri: "Tabel", kanan: "Penyajian data dalam kolom" }, { kiri: "Jangkauan", kanan: "Terbesar dikurangi terkecil" }],
  [{ kiri: "Mengurutkan data", kanan: "Menyusun dari kecil ke besar" }, { kiri: "Data terbesar", kanan: "Nilai tertinggi pada data" }, { kiri: "Turus", kanan: "Mencacah banyaknya data" }],
];
/** QA7 Benar atau Salah. */
export const RONDE_BENARSALAH_QA: Pernyataan[][] = [
  [
    { teks: "Data terkecil adalah nilai yang paling kecil pada data.", benar: true, penjelasan: "Data terkecil adalah nilai paling kecil, misalnya 5 pada data 5, 7, 9." },
    { teks: "Jangkauan sama dengan data terbesar ditambah data terkecil.", benar: false, penjelasan: "Jangkauan sama dengan data terbesar dikurangi data terkecil." },
    { teks: "Pada data 3, 7, 5, 2, jangkauannya 5.", benar: true, penjelasan: "Data terbesar 7 dan terkecil 2, jadi jangkauannya 7 − 2 = 5." },
    { teks: "Mengurutkan data berarti menyusun dari yang terbesar saja.", benar: false, penjelasan: "Data dapat diurutkan dari terkecil ke terbesar atau dari terbesar ke terkecil." },
    { teks: "Dua anak boleh memiliki banyak benda yang sama.", benar: true, penjelasan: "Dua data boleh sama, misalnya Meutia dan Alfa sama-sama memiliki 7 kelereng." },
  ],
  [
    { teks: "Data terbesar pada 4, 9, 6 adalah 4.", benar: false, penjelasan: "Data terbesar adalah 9, sedangkan 4 adalah data terkecil." },
    { teks: "Turus adalah garis tegak yang menyatakan banyaknya data.", benar: true, penjelasan: "Turus dipakai untuk mencacah dan menunjukkan banyaknya data." },
    { teks: "Pada data ulangan, nilai 9 diperoleh lima siswa.", benar: true, penjelasan: "Pada data ulangan di buku, nilai 9 muncul lima kali." },
    { teks: "Jangkauan data 10, 5, 8 adalah 15.", benar: false, penjelasan: "Jangkauan sama dengan 10 − 5 = 5, bukan 15." },
    { teks: "Setelah diurutkan, data pertama adalah data terkecil.", benar: true, penjelasan: "Bila diurutkan dari terkecil, data pertama adalah data terkecil." },
  ],
];
/** QA8 Detektif Data. */
export const RONDE_DETEKTIF_QA: SoalDetektif[] = [
  { klue: ["Aku jangkauan dari data 3, 7, 5, 7, 2.", "Aku kurang dari 6."], jawab: 5, opsi: [5, 7, 3], salah: "Jangkauan data itu 7 − 2 = 5, dan 5 kurang dari 6." },
  { klue: ["Aku data terbesar dari 8, 4, 9, 6.", "Aku bilangan ganjil."], jawab: 9, opsi: [9, 8, 6], salah: "Data terbesar adalah 9, dan 9 bilangan ganjil." },
  { klue: ["Aku data terkecil dari 12, 7, 15, 9.", "Aku lebih dari 5."], jawab: 7, opsi: [7, 12, 15], salah: "Data terkecil adalah 7, dan 7 lebih dari 5." },
  { klue: ["Aku banyak nilai 7 pada data ulangan.", "Aku bilangan ganjil lebih dari 3."], jawab: 5, opsi: [5, 4, 3], salah: "Nilai 7 muncul lima kali, dan 5 ganjil lebih dari 3." },
];
/** QA9 Peta Konsep Data. */
export const PETA_KONSEP_QA: { pusat: string; kotak: KotakPeta[] }[] = [
  {
    pusat: "Membandingkan data",
    kotak: [
      { label: "Nilai data paling kecil disebut data", opsi: ["terkecil", "terbesar", "terbanyak"], benar: 0 },
      { label: "Nilai data paling besar disebut data", opsi: ["terbesar", "terkecil", "tersedikit"], benar: 0 },
      { label: "Selisih terbesar dan terkecil disebut", opsi: ["jangkauan", "turus", "tabel"], benar: 0 },
      { label: "Menurutku, data diurutkan dari terkecil ke", opsi: ["terbesar", "terbanyak", "terlama"], benar: 0 },
    ],
  },
  {
    pusat: "Mencacah data",
    kotak: [
      { label: "Garis tegak penanda banyak data disebut", opsi: ["turus", "jangkauan", "kolom"], benar: 0 },
      { label: "Lima turus dikelompokkan dengan garis", opsi: ["miring", "melengkung", "putus"], benar: 0 },
      { label: "Data yang ditulis dalam kolom disebut", opsi: ["tabel", "gambar", "kurva"], benar: 0 },
      { label: "Menurutku, tabel memuat nilai, turus, dan", opsi: ["banyak", "warna", "bentuk"], benar: 0 },
    ],
  },
];
/** QA10 Susun Kata Data. */
export const RONDE_SUSUNKATA_QA: { kata: string[]; pengecoh: string }[] = [
  { kata: ["Jangkauan", "adalah", "selisih", "data", "terbesar", "dan", "terkecil"], pengecoh: "ditambah" },
  { kata: ["Data", "diurutkan", "dari", "yang", "terkecil", "ke", "terbesar"], pengecoh: "terlama" },
  { kata: ["Turus", "adalah", "garis", "tegak", "penanda", "banyaknya", "data"], pengecoh: "lengkung" },
  { kata: ["Nilai", "paling", "besar", "disebut", "data", "terbesar"], pengecoh: "terkecil" },
];

/* ====================================================================== */
/* SUB-BAB B. Menyajikan data dalam bentuk tabel                            */
/* ====================================================================== */

/** Banyak turus: kelompok lima (empat tegak ditambah satu miring) dan sisanya. */
export const kelompokLima = (n: number): { penuh: number; sisa: number } => ({ penuh: Math.floor(n / 5), sisa: n % 5 });

/* ------------------------------ Concrete B ------------------------------ */

/** CB1 Hitung Kelompok Lima: benda dikelompokkan lima-lima. Dua soal per ronde. */
export const RONDE_KELOMPOK_CB: { benda: BendaData; n: number }[][] = [
  [{ benda: "apel", n: 12 }, { benda: "bola", n: 17 }],
  [{ benda: "kue", n: 8 }, { benda: "buku", n: 21 }],
  [{ benda: "pensil", n: 14 }, { benda: "apel", n: 23 }],
];
/** CB2 Hitung Lidi: banyak lidi pada gambar turus lidi. */
export const RONDE_LIDI_CB: number[][] = [[4, 7], [9, 12], [11, 14]];
/** CB3 Urutkan Lidi. */
export const RONDE_URUTLIDI_CB: { n: number[]; dari: "kecil" | "besar" }[] = [
  { n: [6, 3, 9], dari: "kecil" },
  { n: [8, 13, 5], dari: "besar" },
  { n: [7, 4, 11], dari: "kecil" },
];
/** Warna manik: m = merah, b = biru, h = hitam. */
export type WarnaManik = "m" | "b" | "h";
export const NAMA_MANIK: Record<WarnaManik, string> = { m: "merah", b: "biru", h: "hitam" };
export const EMOJI_MANIK: Record<WarnaManik, string> = { m: "🔴", b: "🔵", h: "⚫" };
export const banyakManik = (deret: string, w: WarnaManik): number => [...deret].filter((c) => c === w).length;
/** CB4 Hitung Manik Merah: sepuluh manik per soal, dua soal per ronde. */
export const RONDE_MANIKMERAH_CB: string[][] = [
  ["mbhmmhbmhb", "bhmbbmhmmh"],
  ["hhmbmmbhmb", "mbbhmhhmbm"],
  ["bmhhbmbhmm", "hmbbmhmhbb"],
];
/** CB5 Pilah Manik menurut Warna: sembilan manik per ronde, ketiga warna ada. */
export const RONDE_SORTIR_CB: string[] = ["mbhbmhmbh", "hmbbhmmhb", "bhmmbhbmh"];
/** CB6 Ketuk Anggota dengan Manik Merah Paling Banyak atau Paling Sedikit. */
export const RONDE_PALINGMANIK_CB: { anggota: Anak[]; tanya: Paling[] }[] = [
  { anggota: [an("Anggota 1", 4), an("Anggota 2", 7), an("Anggota 3", 2)], tanya: ["banyak", "sedikit"] },
  { anggota: [an("Anggota 4", 5), an("Anggota 5", 3), an("Anggota 6", 8)], tanya: ["sedikit", "banyak"] },
  { anggota: [an("Anggota 7", 6), an("Anggota 8", 1), an("Anggota 9", 4)], tanya: ["banyak", "sedikit"] },
];
/** CB7 Papan: Berapa Banyak Lidi. */
export const RONDE_PAPAN_CB: number[][] = [[13, 6], [18, 9], [16, 11]];
/** CB8 Jodohkan Lidi dan Banyaknya: tiga banyak berbeda. */
export const RONDE_JODOH_CB: number[][] = [[3, 8, 12], [5, 9, 14], [4, 7, 11]];
/** CB9 Jumlah Manik Merah Semua Anggota: dua soal per ronde. */
export const RONDE_TOTALMANIK_CB: Anak[][][] = [
  [[an("Anggota 1", 4), an("Anggota 2", 6), an("Anggota 3", 3)], [an("Anggota 4", 5), an("Anggota 5", 2)]],
  [[an("Anggota 1", 3), an("Anggota 2", 7), an("Anggota 3", 5)], [an("Anggota 4", 4), an("Anggota 5", 6)]],
  [[an("Anggota 1", 6), an("Anggota 2", 2), an("Anggota 3", 4)], [an("Anggota 4", 8), an("Anggota 5", 1)]],
];
/** CB10 Memori Lidi dan Banyaknya: empat banyak berbeda. */
export const RONDE_MEMORI_CB: number[][] = [[2, 5, 8, 13], [3, 6, 9, 12], [4, 7, 10, 14]];

/* ------------------------------ Picture B ------------------------------ */

/** PB1 Turus ke Angka: banyak data pada gambar turus kelompok lima. */
export const RONDE_TURUS_PB: number[][] = [[8, 13], [11, 17], [14, 19]];
/** PB2 Ketuk Turus yang Tepat: tiga turus dan dua banyak yang diminta. */
export const RONDE_PILIHTURUS_PB: { n: number[]; tanya: number[] }[] = [
  { n: [7, 12, 9], tanya: [12, 7] },
  { n: [10, 14, 8], tanya: [8, 14] },
  { n: [11, 16, 13], tanya: [16, 11] },
];
/** PB3 Baca Tabel Huruf: huruf terbanyak atau tersedikit pada kata. Dua soal per ronde. */
export type SoalTabelHuruf = { kata: string; tanya: "terbanyak" | "tersedikit" };
export const RONDE_TABELHURUF_PB: SoalTabelHuruf[][] = [
  [{ kata: "STATISTIKA", tanya: "terbanyak" }, { kata: "STATISTIKA", tanya: "tersedikit" }],
  [{ kata: "MATEMATIKA", tanya: "terbanyak" }, { kata: "KALIMANTAN", tanya: "terbanyak" }],
  [{ kata: "SURABAYA", tanya: "terbanyak" }, { kata: "SEKOLAH", tanya: "terbanyak" }],
];
export function hurufPaling(kata: string, tanya: "terbanyak" | "tersedikit"): string[] {
  const hitung = hurufBerbeda(kata).map((h) => ({ h, n: banyakHuruf(kata, h) }));
  const n = tanya === "terbanyak" ? Math.max(...hitung.map((x) => x.n)) : Math.min(...hitung.map((x) => x.n));
  return hitung.filter((x) => x.n === n).map((x) => x.h);
}
/** Tiga pilihan huruf: kunci dan dua huruf lain pada kata. */
export function opsiHuruf(kata: string, kunci: string, nomor: number): { opsi: string[]; jawab: number } {
  const lain = hurufBerbeda(kata).filter((h) => h !== kunci);
  const dipilih: [string, string] = [lain[nomor % lain.length], lain[(nomor + 1) % lain.length]];
  return susunOpsi(kunci, dipilih, nomor);
}
/** PB4 Isi Tabel Huruf dan Turus: tiga huruf dengan banyak berbeda. */
export type TabelHuruf = { kepala: [string, string]; baris: { label: string; jawab: string }[]; kartu: string[] };
export function tabelHuruf(kata: string, huruf: string[], asing: number, tambahan: number): TabelHuruf {
  const baris = huruf.map((h) => ({ label: `${h}  ${"|".repeat(banyakHuruf(kata, h))}`, jawab: String(banyakHuruf(kata, h)) }));
  const kartu = urutanTetap(baris.length + 1, 2, tambahan).map((i) => (i < baris.length ? baris[i].jawab : String(asing)));
  return { kepala: ["Huruf dan turus", "Banyak huruf"], baris, kartu };
}
export const RONDE_ISITABEL_PB: { kata: string; tabel: TabelHuruf }[] = [
  { kata: "STATISTIKA", tabel: tabelHuruf("STATISTIKA", ["T", "S", "K"], 4, 1) },
  { kata: "MATEMATIKA", tabel: tabelHuruf("MATEMATIKA", ["A", "T", "E"], 5, 2) },
  { kata: "KALIMANTAN", tabel: tabelHuruf("KALIMANTAN", ["A", "N", "K"], 4, 3) },
];
/** PB5 Urutkan Huruf menurut Banyaknya (turus): tiga huruf dengan banyak berbeda. */
export const RONDE_URUTHURUF_PB: { kata: string; huruf: string[]; dari: "kecil" | "besar" }[] = [
  { kata: "STATISTIKA", huruf: ["T", "S", "K"], dari: "kecil" },
  { kata: "MATEMATIKA", huruf: ["A", "T", "E"], dari: "besar" },
  { kata: "KALIMANTAN", huruf: ["A", "N", "L"], dari: "kecil" },
];
/** PB6 Selisih Banyak Huruf: dua soal per ronde. */
export const RONDE_BEDA_PB: { kata: string; a: string; b: string }[][] = [
  [{ kata: "STATISTIKA", a: "T", b: "K" }, { kata: "MATEMATIKA", a: "A", b: "E" }],
  [{ kata: "KALIMANTAN", a: "A", b: "K" }, { kata: "STATISTIKA", a: "S", b: "K" }],
  [{ kata: "MATEMATIKA", a: "M", b: "I" }, { kata: "SURABAYA", a: "A", b: "S" }],
];
/** PB7 Jumlah Semua Huruf pada kata. */
export const RONDE_JUMLAH_PB: string[][] = [["STATISTIKA", "MATEMATIKA"], ["KALIMANTAN", "SURABAYA"], ["SEKOLAH", "PENDIDIKAN"]];
/** PB8 Hitung Titik Kelompok Lima. Dua soal per ronde. */
export const RONDE_KELOMPOK_PB: number[][] = [[13, 18], [9, 21], [16, 24]];
/** PB9 Ketuk Semua Huruf dengan Syarat banyak. */
export const RONDE_SEMUA_PB: { kata: string; huruf: string[]; syarat: Syarat }[] = [
  { kata: "STATISTIKA", huruf: ["S", "T", "A", "K"], syarat: { jenis: "sama", acuan: 2 } },
  { kata: "MATEMATIKA", huruf: ["M", "A", "T", "E"], syarat: { jenis: "lebih", acuan: 1 } },
  { kata: "KALIMANTAN", huruf: ["K", "A", "L", "N"], syarat: { jenis: "sama", acuan: 1 } },
];
/** PB10 Baca Tabel Nilai: banyak siswa dengan nilai tertentu, lebih dari, atau kurang dari. */
export type SoalNilaiBuku = { jenis: "sama" | "lebih" | "kurang"; acuan: number };
export const TABEL_NILAI_BUKU: BarisNilai[] = TABEL_NILAI;
export const hitungNilaiBuku = (s: SoalNilaiBuku): number => TABEL_NILAI_BUKU.filter((b) => (s.jenis === "sama" ? b.nilai === s.acuan : s.jenis === "lebih" ? b.nilai > s.acuan : b.nilai < s.acuan)).reduce((x, b) => x + b.banyak, 0);
export const RONDE_NILAIBUKU_PB: SoalNilaiBuku[][] = [
  [{ jenis: "sama", acuan: 6 }, { jenis: "sama", acuan: 5 }],
  [{ jenis: "lebih", acuan: 7 }, { jenis: "kurang", acuan: 7 }],
  [{ jenis: "sama", acuan: 9 }, { jenis: "kurang", acuan: 8 }],
];

/* ------------------------------ Abstract B ------------------------------ */

/** QB1 Baca Tabel Nilai: nilai yang paling banyak atau banyak siswa pada nilai tertentu. */
export type TabelNilaiSoal = { data: number[]; tanya: "terbanyak" | "nilai"; nilai?: number };
const DATA_QB1 = [9, 8, 8, 5, 9, 6, 10, 9, 8, 6, 7, 8, 9, 9, 5, 6, 7, 7, 9, 10];
const DATA_QB2 = [6, 7, 7, 8, 8, 8, 9, 9, 10, 6, 7, 8, 8];
const DATA_QB3 = [5, 5, 6, 6, 6, 6, 7, 8, 9, 9];
export const RONDE_TABEL_QB: TabelNilaiSoal[][] = [
  [{ data: DATA_QB1, tanya: "terbanyak" }, { data: DATA_ULANGAN, tanya: "nilai", nilai: 8 }],
  [{ data: DATA_QB2, tanya: "terbanyak" }, { data: DATA_QB1, tanya: "nilai", nilai: 6 }],
  [{ data: DATA_QB3, tanya: "terbanyak" }, { data: DATA_QB3, tanya: "nilai", nilai: 9 }],
];
export function jawabTabelQB(s: TabelNilaiSoal): number {
  const r = ringkasData(s.data);
  if (s.tanya === "nilai") return banyakNilai(s.data, s.nilai as number);
  return nilaiTerbanyak(r);
}
/** QB2 dan QB3 Lebih dari atau Kurang dari pada data. */
export type SoalBandingData = { data: number[]; jenis: "lebih" | "kurang"; acuan: number };
export const hitungBandingData = (s: SoalBandingData): number => s.data.filter((x) => (s.jenis === "lebih" ? x > s.acuan : x < s.acuan)).length;
const DATA_B2 = [9, 8, 8, 5, 9, 6, 10, 9, 8, 6, 7, 8, 9, 9, 5, 6, 7, 7, 9, 10];
export const RONDE_LEBIH_QB: SoalBandingData[][] = [
  [{ data: DATA_B2, jenis: "lebih", acuan: 7 }, { data: DATA_ULANGAN, jenis: "lebih", acuan: 8 }],
  [{ data: DATA_B2, jenis: "lebih", acuan: 8 }, { data: DATA_ULANGAN, jenis: "lebih", acuan: 6 }],
  [{ data: DATA_B2, jenis: "lebih", acuan: 6 }, { data: DATA_ULANGAN, jenis: "lebih", acuan: 7 }],
];
export const RONDE_KURANG_QB: SoalBandingData[][] = [
  [{ data: DATA_B2, jenis: "kurang", acuan: 7 }, { data: DATA_ULANGAN, jenis: "kurang", acuan: 8 }],
  [{ data: DATA_B2, jenis: "kurang", acuan: 6 }, { data: DATA_ULANGAN, jenis: "kurang", acuan: 7 }],
  [{ data: DATA_B2, jenis: "kurang", acuan: 9 }, { data: DATA_ULANGAN, jenis: "kurang", acuan: 9 }],
];
/** QB4 Banyak Huruf pada Kata: dua soal per ronde. */
export const RONDE_HURUFKATA_QB: { kata: string; huruf: string }[][] = [
  [{ kata: "STATISTIKA", huruf: "T" }, { kata: "STATISTIKA", huruf: "S" }],
  [{ kata: "MATEMATIKA", huruf: "A" }, { kata: "MATEMATIKA", huruf: "M" }],
  [{ kata: "KALIMANTAN", huruf: "A" }, { kata: "SEKOLAH DASAR", huruf: "S" }],
];
/** QB5 Urutkan Huruf menurut Banyaknya pada kata (tiga huruf, banyak berbeda). */
export const RONDE_URUTHURUF_QB: { kata: string; huruf: string[]; dari: "kecil" | "besar" }[] = [
  { kata: "STATISTIKA", huruf: ["K", "T", "S"], dari: "besar" },
  { kata: "MATEMATIKA", huruf: ["E", "A", "M"], dari: "kecil" },
  { kata: "KALIMANTAN", huruf: ["L", "A", "N"], dari: "besar" },
];
/** QB6 Lengkapi Kalimat Tentang Tabel dan Turus. */
export const RONDE_KALIMAT_QB: KalimatIsian[][] = [
  [
    { depan: "Lima turus ditulis dengan empat garis tegak dan satu garis", belakang: ".", opsi: ["miring", "melengkung", "putus-putus"], benar: 0 },
    { depan: "Tabel nilai memiliki kolom nilai, turus, dan", belakang: ".", opsi: ["banyak", "warna", "bentuk"], benar: 0 },
    { depan: "Sebelum membuat tabel, nilai data diurutkan dari yang", belakang: ".", opsi: ["terkecil", "terlama", "tertinggi"], benar: 0 },
  ],
  [
    { depan: "Turus kelompok lima dan dua turus lagi menyatakan data", belakang: ".", opsi: ["7", "5", "6"], benar: 0 },
    { depan: "Dua kelompok lima menyatakan data sebanyak", belakang: ".", opsi: ["10", "5", "12"], benar: 0 },
    { depan: "Kolom banyak pada tabel berisi", belakang: ".", opsi: ["angka", "gambar", "warna"], benar: 0 },
  ],
  [
    { depan: "Pada kata STATISTIKA, huruf T muncul", belakang: "kali.", opsi: ["3", "2", "4"], benar: 0 },
    { depan: "Jumlah semua huruf pada STATISTIKA adalah", belakang: ".", opsi: ["10", "9", "11"], benar: 0 },
    { depan: "Huruf yang paling sedikit pada STATISTIKA adalah huruf", belakang: ".", opsi: ["K", "T", "S"], benar: 0 },
  ],
];
/** QB7 Jodohkan Istilah Tabel dan Artinya: tiga pasangan berbeda. */
export const RONDE_JODOH_QB: { kiri: string; kanan: string }[][] = [
  [{ kiri: "Turus", kanan: "Garis penanda data" }, { kiri: "Tabel", kanan: "Data dalam baris dan kolom" }, { kiri: "Kolom banyak", kanan: "Angka hasil mencacah" }],
  [{ kiri: "Lima turus", kanan: "Empat tegak, satu miring" }, { kiri: "Jangkauan", kanan: "Terbesar dikurangi terkecil" }, { kiri: "Tabel", kanan: "Penyajian data rapi" }],
  [{ kiri: "Mengurutkan", kanan: "Menyusun dari kecil ke besar" }, { kiri: "Turus", kanan: "Mencacah banyak data" }, { kiri: "Kolom turus", kanan: "Tempat garis penanda" }],
];
/** QB8 Benar atau Salah. */
export const RONDE_BENARSALAH_QB: Pernyataan[][] = [
  [
    { teks: "Lima turus ditulis empat garis tegak dan satu garis miring.", benar: true, penjelasan: "Empat garis tegak dicoret garis miring menjadi satu kelompok lima." },
    { teks: "Tabel data hanya memiliki satu kolom.", benar: false, penjelasan: "Tabel nilai memiliki tiga kolom: nilai, turus, dan banyak." },
    { teks: "Pada data ulangan di buku, nilai 6 diperoleh empat siswa.", benar: true, penjelasan: "Pada data ulangan di buku, nilai 6 muncul empat kali." },
    { teks: "Sebelum membuat tabel, data tidak perlu diurutkan.", benar: false, penjelasan: "Data sebaiknya diurutkan dulu dari yang terkecil agar tabel rapi." },
    { teks: "Pada kata STATISTIKA, huruf K muncul satu kali.", benar: true, penjelasan: "Huruf K hanya ada satu pada kata STATISTIKA." },
  ],
  [
    { teks: "Dua kelompok lima ditambah tiga turus menyatakan 13 data.", benar: true, penjelasan: "5 + 5 + 3 = 13." },
    { teks: "Banyak huruf pada kata MATEMATIKA adalah 9.", benar: false, penjelasan: "MATEMATIKA memiliki 10 huruf." },
    { teks: "Tabel membantu kita membaca data dengan lebih mudah.", benar: true, penjelasan: "Data yang disajikan dalam tabel rapi dan mudah dibandingkan." },
    { teks: "Kolom banyak berisi gambar turus.", benar: false, penjelasan: "Kolom turus berisi garis penanda. Kolom banyak berisi angka." },
    { teks: "Pada STATISTIKA, huruf T lebih banyak daripada huruf S.", benar: true, penjelasan: "Huruf T ada tiga, huruf S ada dua." },
  ],
];
/** QB9 Detektif Tabel. */
export const RONDE_DETEKTIF_QB: SoalDetektif[] = [
  { klue: ["Aku banyak huruf T pada STATISTIKA.", "Aku bilangan ganjil."], jawab: 3, opsi: [3, 2, 4], salah: "Huruf T ada 3, dan 3 bilangan ganjil." },
  { klue: ["Aku jumlah semua huruf pada STATISTIKA.", "Aku bilangan genap."], jawab: 10, opsi: [10, 9, 11], salah: "STATISTIKA memiliki 10 huruf, dan 10 genap." },
  { klue: ["Aku banyak siswa bernilai 9 pada data ulangan.", "Aku kurang dari 6."], jawab: 5, opsi: [5, 7, 8], salah: "Nilai 9 muncul 5 kali, dan 5 kurang dari 6." },
  { klue: ["Aku banyak huruf A pada MATEMATIKA.", "Aku lebih dari 2."], jawab: 3, opsi: [3, 2, 1], salah: "Huruf A pada MATEMATIKA ada 3, dan 3 lebih dari 2." },
];
/** QB10 Susun Kata Tabel. */
export const RONDE_SUSUNKATA_QB: { kata: string[]; pengecoh: string }[] = [
  { kata: ["Lima", "turus", "ditulis", "empat", "garis", "tegak", "dan", "satu", "miring"], pengecoh: "lengkung" },
  { kata: ["Tabel", "nilai", "memiliki", "kolom", "turus", "dan", "banyak"], pengecoh: "warna" },
  { kata: ["Data", "diurutkan", "dari", "terkecil", "sebelum", "disajikan", "dalam", "tabel"], pengecoh: "terlama" },
  { kata: ["Banyak", "huruf", "dicacah", "dengan", "turus", "lalu", "ditulis", "angkanya"], pengecoh: "digambar" },
];
