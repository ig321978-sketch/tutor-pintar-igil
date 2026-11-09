/**
 * Data murni Matematika Kelas 3 Bab 1 (Bilangan Cacah sampai 1.000): kata bilangan, nilai tempat, dan semua ronde
 * permainan Sub-Bab A (membaca dan menulis bilangan) dan Sub-Bab B (nilai tempat). Tanpa React, tanpa acak, tanpa
 * jaringan. Kunci selalu dihitung dari bilangan, tidak ditulis dua kali. Uji: scripts/uji-data-k3b1.mjs.
 */
import type { BendaId } from "./data-k2b7";

export const Kapital = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
export const HURUF = ["A", "B", "C", "D", "E", "F"];

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

/* ====================================================================== */
/* Bilangan tiga angka                                                      */
/* ====================================================================== */

export type Tiga = { r: number; p: number; s: number };
export const tiga = (n: number): Tiga => ({ r: Math.floor(n / 100), p: Math.floor(n / 10) % 10, s: n % 10 });
export const gabung3 = (r: number, p: number, s: number) => r * 100 + p * 10 + s;

const KATA_SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];

function kataDuaAngka(n: number): string {
  if (n < 10) return KATA_SATUAN[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${KATA_SATUAN[n - 10]} belas`;
  const sisa = n % 10;
  return `${KATA_SATUAN[Math.floor(n / 10)]} puluh${sisa ? ` ${KATA_SATUAN[sisa]}` : ""}`;
}

/** Kata bilangan bahasa Indonesia untuk 0 sampai 1.000. 160 = seratus enam puluh, 405 = empat ratus lima. */
export function kata(n: number): string {
  if (n === 1000) return "seribu";
  if (n === 0) return "nol";
  const r = Math.floor(n / 100);
  const sisa = n % 100;
  const bagian: string[] = [];
  if (r === 1) bagian.push("seratus");
  else if (r >= 2) bagian.push(`${KATA_SATUAN[r]} ratus`);
  if (sisa > 0) bagian.push(kataDuaAngka(sisa));
  return bagian.join(" ");
}

/** Bilangan yang sering tertukar: angka berpindah tempat, nol hilang atau bergeser. */
export function pengecoh3(n: number): number[] {
  const { r, p, s } = tiga(n);
  const kandidat = [gabung3(r, s, p), gabung3(p, r, s), gabung3(s, p, r), n + 10, n - 10, n + 100, n - 100, n + 1, n - 1];
  const hasil: number[] = [];
  for (const k of kandidat) {
    if (k >= 100 && k <= 999 && k !== n && !hasil.includes(k)) hasil.push(k);
  }
  return hasil;
}

/** Tiga pilihan bilangan: kunci dan dua pengecoh yang sering tertukar. */
export function opsiAngka3(n: number, nomor: number): number[] {
  const semua = [n, ...pengecoh3(n).slice(0, 2)];
  return urutanTetap(3, 2, nomor).map((i) => semua[i]);
}

/** Tiga pilihan cara membaca. */
export function opsiKata3(n: number, nomor: number): { opsi: string[]; jawab: number } {
  const [a, b] = pengecoh3(n);
  return susunOpsi(kata(n), [kata(a), kata(b)], nomor);
}

export const NAMA_TEMPAT = ["ratusan", "puluhan", "satuan"] as const;
export type Tempat = (typeof NAMA_TEMPAT)[number];

/** Nilai angka pada satu tempat. 251: ratusan 200, puluhan 50, satuan 1. */
export function nilaiTempat(n: number, tempat: Tempat): number {
  const { r, p, s } = tiga(n);
  return tempat === "ratusan" ? r * 100 : tempat === "puluhan" ? p * 10 : s;
}
export const angkaTempat = (n: number, tempat: Tempat): number => {
  const { r, p, s } = tiga(n);
  return tempat === "ratusan" ? r : tempat === "puluhan" ? p : s;
};
/** Uraian: 251 menjadi "200 + 50 + 1". */
export const uraian = (n: number): string => `${nilaiTempat(n, "ratusan")} + ${nilaiTempat(n, "puluhan")} + ${nilaiTempat(n, "satuan")}`;
/** Susunan: 251 menjadi "2 ratusan + 5 puluhan + 1 satuan". */
export const susunan = (n: number): string => {
  const { r, p, s } = tiga(n);
  return `${r} ratusan + ${p} puluhan + ${s} satuan`;
};

/* ====================================================================== */
/* Kumpulan benda dan model blok                                            */
/* ====================================================================== */

export type Bundel = { n: number; benda: BendaId };

/** Syarat untuk permainan ketuk semua. */
export type Syarat =
  | "puluhan-nol"
  | "satuan-nol"
  | "ratusan-lebih-5"
  | "ratusan-4"
  | "puluhan-kurang-3"
  | "satuan-lebih-7"
  | "ratusan-kurang-5"
  | "puluhan-6"
  | "ratusan-300"
  | "angka-nol";

export function cocokSyarat(syarat: Syarat, n: number): boolean {
  const { r, p, s } = tiga(n);
  switch (syarat) {
    case "puluhan-nol":
      return p === 0;
    case "satuan-nol":
      return s === 0;
    case "ratusan-lebih-5":
      return r > 5;
    case "ratusan-4":
      return r === 4;
    case "puluhan-kurang-3":
      return p < 3;
    case "satuan-lebih-7":
      return s > 7;
    case "ratusan-kurang-5":
      return r < 5;
    case "puluhan-6":
      return p === 6;
    case "ratusan-300":
      return r === 3;
    case "angka-nol":
      return p === 0 || s === 0;
  }
}

export const TEKS_SYARAT: Record<Syarat, string> = {
  "puluhan-nol": "angka puluhannya 0",
  "satuan-nol": "angka satuannya 0",
  "ratusan-lebih-5": "angka ratusannya lebih dari 5",
  "ratusan-4": "angka ratusannya 4",
  "puluhan-kurang-3": "angka puluhannya kurang dari 3",
  "satuan-lebih-7": "angka satuannya lebih dari 7",
  "ratusan-kurang-5": "angka ratusannya kurang dari 5",
  "puluhan-6": "angka puluhannya 6",
  "ratusan-300": "angka ratusannya 3",
  "angka-nol": "ada angka 0 di dalamnya",
};

export type RondeSemua = { syarat: Syarat; angka: number[]; benda: BendaId };

/* ====================================================================== */
/* SUB-BAB A. Membaca dan menulis bilangan cacah sampai 1.000               */
/* ====================================================================== */

/* ------------------------------ Concrete A ------------------------------ */

/** CA1 Rakit Kemasan: tekan tambah dus, bungkus, dan benda sampai sama dengan bilangan yang dibaca. */
export const RONDE_RAKIT_CA: Bundel[][] = [
  [{ n: 160, benda: "kelereng" }, { n: 153, benda: "kue" }],
  [{ n: 405, benda: "jeruk" }, { n: 234, benda: "lidi" }],
  [{ n: 572, benda: "anggur" }, { n: 220, benda: "pensil" }],
];

/** CA2 Hitung Kemasan: kumpulan benda menjadi lambang bilangan. */
export const RONDE_HITUNG_CA: Bundel[][] = [
  [{ n: 438, benda: "rambutan" }, { n: 261, benda: "kue" }],
  [{ n: 359, benda: "ikan" }, { n: 236, benda: "kelereng" }],
  [{ n: 417, benda: "lidi" }, { n: 310, benda: "jeruk" }],
];

/** CA3 Pilah Kemasan: tiap kelompok berisi k kemasan sejenis. r dus, p bungkus, s benda lepas. */
export type Kelompok = { jenis: "r" | "p" | "s"; k: number };
export const RONDE_SORTIR_CA: { benda: BendaId; item: Kelompok[] }[] = [
  { benda: "kue", item: [{ jenis: "r", k: 2 }, { jenis: "p", k: 3 }, { jenis: "s", k: 4 }, { jenis: "r", k: 1 }, { jenis: "p", k: 5 }, { jenis: "s", k: 2 }] },
  { benda: "kelereng", item: [{ jenis: "p", k: 4 }, { jenis: "s", k: 6 }, { jenis: "r", k: 3 }, { jenis: "s", k: 1 }, { jenis: "r", k: 2 }, { jenis: "p", k: 2 }] },
  { benda: "jeruk", item: [{ jenis: "s", k: 5 }, { jenis: "r", k: 4 }, { jenis: "p", k: 1 }, { jenis: "p", k: 6 }, { jenis: "s", k: 3 }, { jenis: "r", k: 1 }] },
];

/** CA4 Jodohkan Kemasan dan Bilangan. */
export const RONDE_PASANG_CA: Bundel[][] = [
  [{ n: 132, benda: "kue" }, { n: 245, benda: "kue" }, { n: 306, benda: "kue" }],
  [{ n: 418, benda: "jeruk" }, { n: 570, benda: "jeruk" }, { n: 609, benda: "jeruk" }],
  [{ n: 723, benda: "kelereng" }, { n: 850, benda: "kelereng" }, { n: 964, benda: "kelereng" }],
];

/** CA5 Memori Kemasan dan Bilangan. */
export const RONDE_MEMORI_CA: Bundel[][] = [
  [{ n: 123, benda: "kue" }, { n: 250, benda: "kue" }, { n: 304, benda: "kue" }, { n: 519, benda: "kue" }],
  [{ n: 160, benda: "lidi" }, { n: 407, benda: "lidi" }, { n: 635, benda: "lidi" }, { n: 782, benda: "lidi" }],
  [{ n: 218, benda: "anggur" }, { n: 330, benda: "anggur" }, { n: 590, benda: "anggur" }, { n: 846, benda: "anggur" }],
];

/** CA6 Ketuk Kumpulan yang Dibaca: tiga kumpulan yang mirip, dua pertanyaan membaca. */
export type RondeKetuk = { benda: BendaId; item: number[]; tanya: number[] };
export const RONDE_KETUK_CA: RondeKetuk[] = [
  { benda: "kelereng", item: [160, 106, 610], tanya: [160, 106] },
  { benda: "rambutan", item: [405, 450, 504], tanya: [405, 504] },
  { benda: "ikan", item: [320, 302, 230], tanya: [320, 302] },
];

/** CA7 Ketuk Semua: kumpulan yang cocok dengan syarat angka. */
export const RONDE_SEMUA_CA: RondeSemua[] = [
  { syarat: "puluhan-nol", angka: [305, 460, 802, 117], benda: "kue" },
  { syarat: "satuan-nol", angka: [250, 413, 620, 777], benda: "jeruk" },
  { syarat: "ratusan-lebih-5", angka: [640, 480, 790, 251], benda: "lidi" },
];

/** CA8 Baca Kumpulan: kumpulan benda menjadi kata bilangan. Memuat angka nol. */
export const RONDE_BACA_CA: Bundel[][] = [
  [{ n: 703, benda: "rambutan" }, { n: 160, benda: "kue" }],
  [{ n: 900, benda: "ikan" }, { n: 405, benda: "lidi" }],
  [{ n: 220, benda: "jeruk" }, { n: 530, benda: "anggur" }],
];

/** CA9 Papan dari Kumpulan. */
export const RONDE_PAPAN_CA: Bundel[][] = [
  [{ n: 153, benda: "rambutan" }, { n: 438, benda: "kue" }],
  [{ n: 206, benda: "ikan" }, { n: 540, benda: "kelereng" }],
  [{ n: 371, benda: "lidi" }, { n: 800, benda: "jeruk" }],
];

/** CA10 Tukar Kemasan. Kunci selalu pilihan pertama sebelum diputar. */
export type SoalTukar = { tanya: string; benar: string; salah: [string, string]; p?: number; s?: number; r?: number; pesan: string; angka?: boolean };
export const RONDE_TUKAR_CA: { benda: BendaId; soal: SoalTukar[] }[] = [
  {
    benda: "kue",
    soal: [
      { tanya: "Sepuluh benda lepas ditukar menjadi apa?", benar: "1 bungkus", salah: ["1 dus", "10 bungkus"], s: 10, pesan: "Sepuluh satuan sama dengan satu puluhan, yaitu satu bungkus." },
      { tanya: "Sepuluh bungkus ditukar menjadi apa?", benar: "1 dus", salah: ["1 benda", "100 dus"], p: 10, pesan: "Sepuluh puluhan sama dengan satu ratusan, yaitu satu dus." },
    ],
  },
  {
    benda: "kelereng",
    soal: [
      { tanya: "Satu dus berisi berapa bungkus?", benar: "10", salah: ["100", "1"], r: 1, pesan: "Satu dus berisi sepuluh bungkus.", angka: true },
      { tanya: "Satu dus sama dengan berapa benda?", benar: "100", salah: ["10", "1000"], r: 1, pesan: "Sepuluh bungkus berisi sepuluh benda, jadi satu dus sama dengan seratus benda.", angka: true },
    ],
  },
  {
    benda: "jeruk",
    soal: [
      { tanya: "13 bungkus ditukar. Jadi satu dus dan berapa bungkus?", benar: "3", salah: ["13", "10"], p: 13, pesan: "Sepuluh bungkus menjadi satu dus, sisa tiga bungkus.", angka: true },
      { tanya: "Satu dus dan dua bungkus ada berapa benda?", benar: "120", salah: ["12", "102"], r: 1, p: 2, pesan: "Satu dus seratus benda, dua bungkus dua puluh benda. Jumlahnya seratus dua puluh.", angka: true },
    ],
  },
];

/* ------------------------------ Picture A ------------------------------ */

/** PA1 Hitung Blok. */
export const RONDE_HITUNG_PA: number[][] = [[153, 260], [405, 382], [718, 904]];
/** PA2 Papan dari Blok. */
export const RONDE_PAPAN_PA: number[][] = [[153, 438], [206, 571], [340, 719]];
/** PA3 Isi Tabel Blok: tiap baris satu model, siswa mengisi tiga angka. */
export const RONDE_TABEL_PA: number[][] = [[192, 910, 328], [217, 604, 453], [586, 340, 709]];
/** PA4 Jodohkan Blok dan Bilangan. */
export const RONDE_PASANG_PA: number[][] = [[124, 350, 607], [238, 415, 790], [263, 580, 901]];
/** PA5 Memori Blok dan Kata. Bilangan pendek supaya katanya muat di kartu. */
export const RONDE_MEMORI_PA: number[][] = [[100, 200, 300, 400], [110, 220, 330, 440], [105, 203, 306, 407]];
/** PA6 Ketuk Blok yang Dibaca. */
export const RONDE_KETUK_PA: { item: number[]; tanya: number[] }[] = [
  { item: [230, 203, 320], tanya: [230, 203] },
  { item: [450, 405, 540], tanya: [450, 540] },
  { item: [701, 710, 170], tanya: [701, 170] },
];
/** PA7 Garis Bilangan: ketuk bilangan yang dibaca. */
export type SoalGarisK3 = { dari: number; sampai: number; langkah: number; jawab: number };
export const RONDE_GARIS_PA: SoalGarisK3[][] = [
  [{ dari: 100, sampai: 600, langkah: 100, jawab: 400 }, { dari: 500, sampai: 1000, langkah: 100, jawab: 800 }],
  [{ dari: 100, sampai: 150, langkah: 10, jawab: 130 }, { dari: 150, sampai: 200, langkah: 10, jawab: 160 }],
  [{ dari: 200, sampai: 250, langkah: 10, jawab: 240 }, { dari: 550, sampai: 600, langkah: 10, jawab: 570 }],
];

/** Jendela garis bilangan enam titik yang memuat `nilai`, letaknya berpindah menurut nomor. Dipakai PB8. */
export function jendelaGaris(nilai: number, langkah: number, nomor: number): { dari: number; sampai: number; langkah: number } {
  const posisi = [1, 3, 4, 2][nomor % 4];
  const maks = langkah === 100 ? 1000 : langkah === 10 ? 100 : 10;
  const dari = Math.min(Math.max(0, nilai - posisi * langkah), maks - 5 * langkah);
  return { dari, sampai: dari + 5 * langkah, langkah };
}
/** PA8 Ketuk Semua Blok. */
export const RONDE_SEMUA_PA: RondeSemua[] = [
  { syarat: "puluhan-nol", angka: [204, 450, 307, 612], benda: "kue" },
  { syarat: "satuan-nol", angka: [310, 245, 600, 781], benda: "kue" },
  { syarat: "ratusan-4", angka: [412, 241, 407, 140], benda: "kue" },
];
/** PA9 Pilah Blok: ada angka 0 atau tanpa angka 0. */
export const RONDE_SORTIR_PA: number[][] = [[105, 234, 360, 782, 508, 619], [420, 253, 905, 316, 740, 871], [150, 603, 482, 920, 337, 705]];
export const adaNol = (n: number): boolean => String(n).includes("0");
/** PA10 Lengkapi Kalimat Blok: satu model, tiga kalimat. */
export const RONDE_KALIMAT_PA: number[] = [346, 502, 780];
export type KalimatIsian = { depan: string; belakang: string; opsi: string[]; benar: number };
export function kalimatTempat(n: number, nomor: number): KalimatIsian[] {
  const d = tiga(n);
  const nilai = [d.r, d.p, d.s];
  return NAMA_TEMPAT.map((t, i) => {
    const b = nilai[i];
    const semua = [b, (b + 1) % 10, (b + 3) % 10];
    const opsi = urutanTetap(3, 2, nomor + i).map((k) => semua[k]);
    return { depan: "Ada", belakang: `${t}.`, opsi: opsi.map(String), benar: opsi.indexOf(b) };
  });
}

/* ------------------------------ Abstract A ------------------------------ */

/** QA1 Susun Tiga Kartu: kata bilangan menjadi lambang bilangan. */
export const RONDE_SUSUN_QA: number[][] = [[759, 671], [160, 703], [634, 572]];
/** QA2 Baca Bilangan: lambang menjadi kata. */
export const RONDE_BACA_QA: number[][] = [[671, 759], [703, 900], [634, 405]];
/** QA3 Tulis Lambang di Papan: kata menjadi lambang. */
export const RONDE_PAPAN_QA: number[][] = [[572, 354], [220, 405], [236, 597]];
/** QA4 Jodohkan Angka dan Kata. */
export const RONDE_PASANG_QA: number[][] = [[239, 168, 912], [903, 145, 602], [821, 950, 370]];
/** QA5 Memori Angka dan Kata. */
export const RONDE_MEMORI_QA: number[][] = [[305, 420, 516, 640], [218, 350, 709, 860], [145, 260, 408, 935]];
/** QA6 Isi Tabel Cara Membaca. */
export type TabelKata = { kepala: [string, string]; baris: { label: string; jawab: string }[]; kartu: string[] };
function tabelKata(angka: number[], tambahan: number): TabelKata {
  const baris = angka.map((n) => ({ label: String(n), jawab: kata(n) }));
  const kartu = urutanTetap(angka.length + 1, 2, tambahan).map((i) => (i < angka.length ? baris[i].jawab : kata(pengecoh3(angka[0])[0])));
  return { kepala: ["Bilangan", "Dibaca"], baris, kartu };
}
export const RONDE_TABEL_QA: TabelKata[] = [tabelKata([597, 405, 220, 236], 1), tabelKata([351, 780, 605, 976], 2), tabelKata([111, 330, 507, 899], 3)];

export type Pernyataan = { teks: string; benar: boolean; penjelasan: string };
/** QA7 Benar atau Salah. */
export const RONDE_BENARSALAH_QA: Pernyataan[][] = [
  [
    { teks: "Sepuluh satuan sama dengan satu puluhan.", benar: true, penjelasan: "Sepuluh satuan dikelompokkan menjadi satu puluhan." },
    { teks: "Seratus satuan disebut satu ratusan.", benar: true, penjelasan: "Sepuluh tumpukan dari sepuluh satuan adalah seratus satuan, yaitu satu ratusan." },
    { teks: `Bilangan 160 dibaca ${kata(160)}.`, benar: kata(160) === "seratus enam puluh", penjelasan: "Satu ratusan dibaca seratus, bukan satu ratus. Enam puluh menyusul di belakangnya." },
    { teks: `Bilangan 405 dibaca ${kata(450)}.`, benar: false, penjelasan: `405 dibaca ${kata(405)}. Angka 0 di tempat puluhan tidak dibaca.` },
    { teks: "Bilangan tiga angka mempunyai tempat ratusan, puluhan, dan satuan.", benar: true, penjelasan: "Tiga angka menempati tiga tempat, dibaca dari kiri: ratusan, puluhan, lalu satuan." },
  ],
  [
    { teks: `Bilangan lima ratus tujuh puluh dua ditulis ${gabung3(5, 7, 2)}.`, benar: true, penjelasan: "5 di ratusan, 7 di puluhan, 2 di satuan: 572." },
    { teks: `Bilangan ${kata(703)} ditulis 73.`, benar: false, penjelasan: "Tujuh ratus tiga ditulis 703. Tempat puluhan diisi angka 0 supaya angka 3 tetap di satuan." },
    { teks: "Bilangan 900 dibaca sembilan ratus.", benar: kata(900) === "sembilan ratus", penjelasan: "9 ratusan, 0 puluhan, 0 satuan: sembilan ratus." },
    { teks: "Dalam bilangan 354, angka 5 ada di tempat satuan.", benar: false, penjelasan: "Dalam 354 angka 5 ada di tempat puluhan. Angka 4 ada di satuan." },
    { teks: "Angka 0 pada bilangan 220 ada di tempat satuan.", benar: tiga(220).s === 0, penjelasan: "220 punya 2 ratusan, 2 puluhan, dan 0 satuan." },
  ],
];

/** QA8 Detektif Bilangan. */
export type SoalDetektifTeks = { petunjuk: string[]; opsi: string[]; jawab: number; salah: string };
export type SoalDetektif = { klue: string[]; jawab: number; opsi: number[]; salah: string };
export const RONDE_DETEKTIF_QA: SoalDetektif[] = [
  { klue: ["Aku bilangan tiga angka.", "Angka ratusanku 6, angka puluhanku 7, dan angka satuanku 1."], jawab: 671, opsi: [671, 617, 761], salah: "Cocokkan angka dengan tempatnya: ratusan 6, puluhan 7, satuan 1." },
  { klue: ["Aku dibaca tujuh ratus tiga.", "Tempat puluhanku diisi angka 0."], jawab: 703, opsi: [73, 730, 703], salah: "Tujuh ratus tiga berarti 7 ratusan, 0 puluhan, 3 satuan." },
  { klue: ["Aku mempunyai 2 ratusan.", "Satuanku 0 dan puluhanku sama dengan ratusanku."], jawab: 220, opsi: [202, 220, 200], salah: "Ratusan 2, puluhan juga 2, satuan 0." },
  { klue: ["Aku mempunyai 5 ratusan dan 9 satuan.", "Puluhanku 0."], jawab: 509, opsi: [590, 509, 59], salah: "Ratusan 5, puluhan 0, satuan 9: lima ratus sembilan." },
];

/** QA9 Ketuk Semua yang Cocok (Ayo Berlatih 3). */
export const RONDE_SEMUA_QA: { syarat: Syarat; angka: number[] }[] = [
  { syarat: "puluhan-kurang-3", angka: [239, 912, 168, 821] },
  { syarat: "satuan-lebih-7", angka: [239, 912, 168, 821] },
  { syarat: "ratusan-kurang-5", angka: [372, 584, 619, 245] },
];

/** QA10 Susun Kata Bilangan. */
export const RONDE_SUSUNKATA_QA: { kata: string[]; pengecoh: string }[] = [
  { kata: ["Seratus", "enam", "puluh", "ditulis", "160"], pengecoh: "106" },
  { kata: ["Tujuh", "ratus", "tiga", "ditulis", "703"], pengecoh: "730" },
  { kata: ["Bilangan", "405", "dibaca", "empat", "ratus", "lima"], pengecoh: "nol" },
  { kata: ["Sepuluh", "puluhan", "sama", "dengan", "satu", "ratusan"], pengecoh: "satuan" },
];

/* ====================================================================== */
/* SUB-BAB B. Nilai tempat bilangan cacah sampai 1.000                      */
/* ====================================================================== */

/* ------------------------------ Concrete B ------------------------------ */

/** CB1 Tiga Kaleng: kartu angka disusun pada kaleng ratusan, puluhan, dan satuan. */
export const RONDE_KALENG_CB: { kartu: number[]; jawab: number }[][] = [
  [{ kartu: [2, 9, 1], jawab: 291 }, { kartu: [5, 0, 7], jawab: 507 }],
  [{ kartu: [3, 6, 8], jawab: 368 }, { kartu: [8, 4, 0], jawab: 840 }],
  [{ kartu: [1, 5, 2], jawab: 152 }, { kartu: [6, 0, 4], jawab: 604 }],
];

/** CB2 Nilai Satu Kemasan: nilai angka pada satu tempat, dihitung dalam benda. */
export type SoalNilaiBenda = { n: number; tempat: Tempat; benda: BendaId };
export const RONDE_NILAI_CB: SoalNilaiBenda[][] = [
  [{ n: 258, tempat: "ratusan", benda: "kue" }, { n: 258, tempat: "puluhan", benda: "kue" }],
  [{ n: 634, tempat: "puluhan", benda: "kelereng" }, { n: 634, tempat: "ratusan", benda: "kelereng" }],
  [{ n: 475, tempat: "satuan", benda: "jeruk" }, { n: 475, tempat: "puluhan", benda: "jeruk" }],
];
export const teksNilaiBenda = (t: Tempat) => (t === "ratusan" ? "dus" : t === "puluhan" ? "bungkus" : "benda lepas");

/** CB3 Jodohkan Kemasan dan Nilai: k kemasan sejenis dan nilainya. */
export type KelompokNilai = { jenis: "r" | "p" | "s"; k: number };
export const nilaiKelompok = (g: KelompokNilai): number => g.k * (g.jenis === "r" ? 100 : g.jenis === "p" ? 10 : 1);
export const RONDE_PASANG_CB: { benda: BendaId; item: KelompokNilai[] }[] = [
  { benda: "kue", item: [{ jenis: "r", k: 3 }, { jenis: "p", k: 4 }, { jenis: "s", k: 7 }] },
  { benda: "kelereng", item: [{ jenis: "r", k: 5 }, { jenis: "p", k: 6 }, { jenis: "s", k: 2 }] },
  { benda: "jeruk", item: [{ jenis: "r", k: 8 }, { jenis: "p", k: 2 }, { jenis: "s", k: 9 }] },
];

/** CB4 Masukkan Kemasan ke Kaleng: tiap kelompok kemasan ke kaleng yang sesuai. */
export const RONDE_SLOT_CB: { benda: BendaId; item: KelompokNilai[] }[] = [
  { benda: "kue", item: [{ jenis: "r", k: 2 }, { jenis: "p", k: 5 }, { jenis: "s", k: 1 }] },
  { benda: "lidi", item: [{ jenis: "s", k: 8 }, { jenis: "r", k: 4 }, { jenis: "p", k: 3 }] },
  { benda: "anggur", item: [{ jenis: "p", k: 7 }, { jenis: "s", k: 3 }, { jenis: "r", k: 6 }] },
];

/** CB5 Memori Kemasan dan Nilai. */
export const RONDE_MEMORI_CB: { benda: BendaId; item: KelompokNilai[] }[] = [
  { benda: "kue", item: [{ jenis: "r", k: 2 }, { jenis: "p", k: 3 }, { jenis: "s", k: 5 }, { jenis: "r", k: 4 }] },
  { benda: "ikan", item: [{ jenis: "p", k: 6 }, { jenis: "r", k: 1 }, { jenis: "s", k: 8 }, { jenis: "p", k: 2 }] },
  { benda: "pensil", item: [{ jenis: "r", k: 7 }, { jenis: "s", k: 4 }, { jenis: "p", k: 9 }, { jenis: "r", k: 3 }] },
];

/** CB6 Rakit Nilai: bilangan dituliskan sebagai uraian. */
export const RONDE_RAKIT_CB: Bundel[][] = [
  [{ n: 347, benda: "kelereng" }, { n: 602, benda: "kue" }],
  [{ n: 825, benda: "jeruk" }, { n: 190, benda: "lidi" }],
  [{ n: 561, benda: "anggur" }, { n: 308, benda: "pensil" }],
];

/** CB7 Ketuk Kumpulan dengan Angka Tertentu: satu syarat per pertanyaan. */
export type RondeKetukNilai = { benda: BendaId; item: number[]; soal: { syarat: Syarat; jawab: number }[] };
export const RONDE_KETUK_CB: RondeKetukNilai[] = [
  { benda: "rambutan", item: [263, 426, 371], soal: [{ syarat: "puluhan-6", jawab: 263 }, { syarat: "ratusan-4", jawab: 426 }] },
  { benda: "kue", item: [162, 489, 530], soal: [{ syarat: "ratusan-4", jawab: 489 }, { syarat: "puluhan-6", jawab: 162 }] },
  { benda: "ikan", item: [306, 631, 764], soal: [{ syarat: "ratusan-300", jawab: 306 }, { syarat: "puluhan-6", jawab: 764 }] },
];

/** CB8 Tempat Angka (Ayo Berlatih B.2): bilangan, angka yang ditanya, kunci tempat. */
export type SoalTempat = { n: number; angka: number; benda: BendaId };
export const RONDE_TEMPAT_CB: SoalTempat[][] = [
  [{ n: 981, angka: 8, benda: "kue" }, { n: 845, angka: 8, benda: "kelereng" }],
  [{ n: 108, angka: 8, benda: "jeruk" }, { n: 800, angka: 8, benda: "ikan" }],
  [{ n: 618, angka: 8, benda: "lidi" }, { n: 287, angka: 8, benda: "anggur" }],
];
/** Tempat sebuah angka dalam bilangan. Angka harus muncul tepat satu kali. */
export function tempatDari(n: number, angka: number): Tempat {
  const d = tiga(n);
  if (d.r === angka) return "ratusan";
  if (d.p === angka) return "puluhan";
  return "satuan";
}

/** CB9 Ketuk Semua Kumpulan dengan Nilai Tertentu. */
export const RONDE_SEMUA_CB: RondeSemua[] = [
  { syarat: "ratusan-300", angka: [341, 435, 392, 214], benda: "kue" },
  { syarat: "puluhan-6", angka: [162, 619, 560, 746], benda: "jeruk" },
  { syarat: "angka-nol", angka: [320, 454, 607, 118], benda: "kelereng" },
];

/** CB10 Urutkan Nilai Kemasan: kelompok kemasan diurutkan menurut nilainya. */
export type RondeUrutNilai = { benda: BendaId; item: KelompokNilai[]; dari: "kecil" | "besar" };
export const RONDE_URUT_CB: RondeUrutNilai[] = [
  { benda: "kue", item: [{ jenis: "r", k: 3 }, { jenis: "p", k: 4 }, { jenis: "s", k: 7 }], dari: "kecil" },
  { benda: "kelereng", item: [{ jenis: "p", k: 9 }, { jenis: "r", k: 2 }, { jenis: "s", k: 6 }], dari: "besar" },
  { benda: "jeruk", item: [{ jenis: "r", k: 1 }, { jenis: "p", k: 5 }, { jenis: "s", k: 9 }], dari: "kecil" },
];
export const kataArah = (a: "kecil" | "besar") => (a === "kecil" ? "terkecil" : "terbesar");

/* ------------------------------ Picture B ------------------------------ */

/** PB1 Tabel Nilai: model menjadi nilai tiap tempat (200, 50, 1). */
export const RONDE_TABEL_PB: number[][] = [[251, 602, 438], [127, 840, 395], [716, 509, 283]];
/** PB2 Nilai Angka pada Blok. */
export const RONDE_NILAI_PB: { n: number; tempat: Tempat }[][] = [
  [{ n: 346, tempat: "ratusan" }, { n: 346, tempat: "puluhan" }],
  [{ n: 752, tempat: "puluhan" }, { n: 752, tempat: "satuan" }],
  [{ n: 819, tempat: "satuan" }, { n: 819, tempat: "ratusan" }],
];
/** PB3 Susun Bilangan: ratusan + puluhan + satuan = bilangan. */
export const RONDE_SUSUN_PB: number[] = [251, 408, 673];
/** Tiga kalimat penyusunan untuk satu bilangan, tiap kalimat meminta bilangannya. */
export function kalimatSusun(n: number, nomor: number): KalimatIsian[] {
  const d = tiga(n);
  const bentuk = [`${d.r} ratusan + ${d.p} puluhan + ${d.s} satuan =`, `${uraian(n)} =`, `${kata(n)} ditulis`];
  return bentuk.map((depan, i) => {
    const o = opsiAngka3(n, nomor + i);
    return { depan, belakang: ".", opsi: o.map(String), benar: o.indexOf(n) };
  });
}
/** PB4 Urai Bilangan: bilangan = 200 + 50 + 1, satu bagian kosong. */
export const RONDE_URAI_PB: number[] = [372, 506, 840];
export function kalimatUrai(n: number, nomor: number): KalimatIsian[] {
  const d = tiga(n);
  const nilai = [d.r * 100, d.p * 10, d.s];
  const gaya: [number, number, number][] = [
    [0, 1, 2],
    [2, 0, 1],
    [1, 2, 0],
  ];
  return gaya[nomor % 3].map((ke, i) => {
    const benar = nilai[ke];
    const salah1 = ke === 0 ? d.r : ke === 1 ? d.p : d.s * 10;
    const salah2 = ke === 0 ? d.r * 10 : ke === 1 ? d.p * 100 : d.s + 10;
    const semua = [benar, salah1 === benar ? benar + 5 : salah1, salah2 === benar ? benar + 7 : salah2];
    const opsi = urutanTetap(3, 2, nomor + i).map((k) => semua[k]);
    const bagian = nilai.map((v, j) => (j === ke ? "" : String(v)));
    const kiri = bagian.slice(0, ke).join(" + ");
    const kanan = bagian.slice(ke + 1).join(" + ");
    return {
      depan: `${n} = ${kiri}${kiri ? " + " : ""}`,
      belakang: `${kanan ? ` + ${kanan}` : ""}`,
      opsi: opsi.map(String),
      benar: opsi.indexOf(benar),
    };
  });
}
/** PB5 Jodohkan Blok dan Uraian. */
export const RONDE_PASANG_PB: number[][] = [[347, 520, 801], [136, 470, 905], [264, 618, 790]];
/** PB6 Memori Blok dan Uraian. */
export const RONDE_MEMORI_PB: number[][] = [[123, 240, 305, 460], [152, 280, 340, 507], [118, 230, 360, 450]];
/** PB7 Papan dari Uraian: 600 + 20 + 1 menjadi papan. */
export const RONDE_PAPAN_PB: number[][] = [[621, 308], [450, 903], [137, 560]];
/** PB8 Garis Bilangan Nilai: ketuk nilai sebuah angka. Dari 0 sampai 100 dengan langkah 10, atau 0 sampai 1.000 dengan langkah 100. */
export type SoalGarisNilai = { n: number; tempat: Tempat };
export const RONDE_GARIS_PB: SoalGarisNilai[][] = [
  [{ n: 463, tempat: "puluhan" }, { n: 463, tempat: "ratusan" }],
  [{ n: 274, tempat: "ratusan" }, { n: 274, tempat: "puluhan" }],
  [{ n: 581, tempat: "puluhan" }, { n: 581, tempat: "ratusan" }],
];
/** PB9 Pilah Nilai: kartu nilai masuk ke tempat ratusan, puluhan, atau satuan. */
export const RONDE_SORTIR_PB: number[][] = [[300, 60, 5, 700, 20, 9], [800, 4, 50, 100, 90, 2], [600, 30, 8, 500, 70, 1]];
export const tempatNilai = (v: number): Tempat => (v >= 100 ? "ratusan" : v >= 10 ? "puluhan" : "satuan");
/** PB10 Ketuk Semua Blok dengan Nilai Tertentu. */
export const RONDE_SEMUA_PB: RondeSemua[] = [
  { syarat: "ratusan-300", angka: [352, 413, 308, 261], benda: "kue" },
  { syarat: "puluhan-6", angka: [264, 316, 960, 561], benda: "kue" },
  { syarat: "angka-nol", angka: [450, 273, 807, 316], benda: "kue" },
];

/* ------------------------------ Abstract B ------------------------------ */

/** QB1 Susun Tiga Kartu dari uraian. */
export const RONDE_SUSUN_QB: number[][] = [[723, 480], [305, 916], [647, 250]];
/** QB2 Tempat Nilai Angka (Ayo Berlatih B.2). */
export const RONDE_TEMPAT_QB: { n: number; angka: number }[][] = [
  [{ n: 981, angka: 8 }, { n: 845, angka: 8 }],
  [{ n: 108, angka: 8 }, { n: 800, angka: 8 }],
  [{ n: 618, angka: 8 }, { n: 287, angka: 8 }],
];
/** QB3 Nilai Angka: bilangan tiga angka, tempat yang ditanya. */
export const RONDE_NILAI_QB: { n: number; tempat: Tempat }[][] = [
  [{ n: 251, tempat: "puluhan" }, { n: 251, tempat: "ratusan" }],
  [{ n: 634, tempat: "ratusan" }, { n: 634, tempat: "satuan" }],
  [{ n: 972, tempat: "puluhan" }, { n: 972, tempat: "ratusan" }],
];
/** QB4 Urai dengan kata ratusan, puluhan, satuan. */
export const RONDE_URAI_QB: number[] = [634, 502, 790];
export function kalimatSusunUrai(n: number, nomor: number): KalimatIsian[] {
  const d = tiga(n);
  const nilai = [d.r, d.p, d.s];
  return nilai.map((b, i) => {
    const semua = [b, (b + 2) % 10, (b + 5) % 10];
    const opsi = urutanTetap(3, 2, nomor + i).map((k) => semua[k]);
    const kiri = NAMA_TEMPAT.slice(0, i).map((t, j) => `${nilai[j]} ${t}`).join(" + ");
    const kanan = NAMA_TEMPAT.slice(i + 1).map((t, j) => `${nilai[i + 1 + j]} ${t}`).join(" + ");
    return {
      depan: `${n} = ${kiri}${kiri ? " + " : ""}`,
      belakang: ` ${NAMA_TEMPAT[i]}${kanan ? ` + ${kanan}` : ""}`,
      opsi: opsi.map(String),
      benar: opsi.indexOf(b),
    };
  });
}
/** QB5 Tulis Bilangan dari uraian di papan. */
export const RONDE_PAPAN_QB: number[][] = [[684, 290], [715, 408], [832, 506]];
/** QB6 Isi Tabel Uraian. */
export type TabelUraian = { kepala: [string, string]; baris: { label: string; jawab: string }[]; kartu: string[] };
function tabelUraian(angka: number[], tambahan: number): TabelUraian {
  const baris = angka.map((n) => ({ label: String(n), jawab: uraian(n) }));
  const asing = `${tiga(angka[0]).r} + ${tiga(angka[0]).p} + ${tiga(angka[0]).s}`;
  const kartu = urutanTetap(angka.length + 1, 2, tambahan).map((i) => (i < angka.length ? baris[i].jawab : asing));
  return { kepala: ["Bilangan", "Uraian"], baris, kartu };
}
export const RONDE_TABEL_QB: TabelUraian[] = [tabelUraian([251, 602, 193, 840], 1), tabelUraian([327, 405, 760, 918], 2), tabelUraian([514, 230, 679, 801], 3)];
/** QB7 Benar atau Salah tentang nilai tempat. */
export const RONDE_BENARSALAH_QB: Pernyataan[][] = [
  [
    { teks: `Pada 251, angka 2 bernilai ${nilaiTempat(251, "ratusan")}.`, benar: nilaiTempat(251, "ratusan") === 200, penjelasan: "Angka 2 menempati ratusan, jadi nilainya 200." },
    { teks: `Pada 251, angka 5 bernilai ${angkaTempat(251, "puluhan")}.`, benar: false, penjelasan: "Angka 5 menempati puluhan, jadi nilainya 50, bukan 5." },
    { teks: "Menyusun bilangan berarti menjumlahkan ratusan, puluhan, dan satuan.", benar: true, penjelasan: "2 ratusan + 5 puluhan + 1 satuan menjadi 251." },
    { teks: `602 diurai menjadi ${uraian(602)}.`, benar: uraian(602) === "600 + 0 + 2", penjelasan: "602 = 600 + 0 + 2. Tempat puluhan bernilai 0." },
    { teks: "Mengurai bilangan berarti menguraikan menjadi ratusan, puluhan, dan satuan.", benar: true, penjelasan: "Mengurai adalah memecah bilangan menurut nilai tempatnya." },
  ],
  [
    { teks: "Pada tabel nilai tempat, 987 ditulis 900 pada kolom ratusan, 80 pada puluhan, dan 7 pada satuan.", benar: false, penjelasan: "Tabel diisi dengan angkanya: 9, 8, 7. Nilai 900, 80, dan 7 dipakai pada uraian." },
    { teks: `Pada 845, angka 8 menempati tempat ${tempatDari(845, 8)}.`, benar: tempatDari(845, 8) === "ratusan", penjelasan: "845 punya 8 ratusan, 4 puluhan, dan 5 satuan." },
    { teks: `Pada 108, angka 8 menempati tempat ${tempatDari(108, 8)}.`, benar: tempatDari(108, 8) === "puluhan", penjelasan: "108 punya 1 ratusan, 0 puluhan, dan 8 satuan. Angka 8 ada di satuan." },
    { teks: "Angka 0 pada 800 menempati puluhan dan satuan.", benar: true, penjelasan: "800 punya 8 ratusan, 0 puluhan, dan 0 satuan." },
    { teks: "Angka yang sama selalu bernilai sama di semua tempat.", benar: false, penjelasan: "Angka 6 pada 600 bernilai 600, pada 60 bernilai 60, dan pada 6 bernilai 6." },
  ],
];
/** QB8 Detektif Nilai Tempat. */
export const RONDE_DETEKTIF_QB: SoalDetektif[] = [
  { klue: ["Angka 5 pada bilanganku bernilai 50.", "Ratusanku 3 dan satuanku 7."], jawab: 357, opsi: [357, 537, 375], salah: "Nilai 50 berarti 5 puluhan. Jadi puluhanku 5." },
  { klue: ["Aku mempunyai 800 pada nilai ratusan.", "Nilai satuanku 4 dan puluhanku 0."], jawab: 804, opsi: [840, 804, 84], salah: "Ratusan bernilai 800, puluhan 0, satuan 4." },
  { klue: ["Aku diurai menjadi 600 + 20 + 9.", "Aku lebih besar dari 620."], jawab: 629, opsi: [692, 629, 269], salah: "600 + 20 + 9 sama dengan 629." },
  { klue: ["Nilai angka ratusanku 400.", "Angka puluhan dan angka satuanku sama, dan jumlah ketiga angkaku 12."], jawab: 444, opsi: [444, 462, 480], salah: "Ratusan 4, jadi dua angka lainnya berjumlah 8. Karena sama, masing-masing 4." },
];
/** QB9 Peta Konsep Nilai Tempat. */
export type KotakPeta = { label: string; opsi: string[]; benar: number };
export const PETA_KONSEP_QB: { pusat: string; kotak: KotakPeta[] }[] = [
  {
    pusat: "Nilai tempat",
    kotak: [
      { label: "Bilangan tiga angka mempunyai tempat", opsi: ["ratusan, puluhan, dan satuan", "ribuan dan puluhan", "satuan saja"], benar: 0 },
      { label: "Angka 5 di tempat puluhan bernilai", opsi: ["50", "5", "500"], benar: 0 },
      { label: "Menyusun bilangan adalah", opsi: ["menjumlahkan ratusan, puluhan, dan satuan", "memecah menjadi bagian", "menghapus angka nol"], benar: 0 },
      { label: "Menurutku, mengurai 251 menghasilkan", opsi: ["200 + 50 + 1", "2 + 5 + 1", "20 + 50 + 10"], benar: 0 },
    ],
  },
  {
    pusat: "Mengurai bilangan",
    kotak: [
      { label: "Mengurai bilangan adalah", opsi: ["menguraikan menjadi ratusan, puluhan, dan satuan", "menjumlahkan dua bilangan", "mengurutkan bilangan"], benar: 0 },
      { label: "602 diurai menjadi", opsi: ["600 + 0 + 2", "60 + 0 + 2", "6 + 0 + 2"], benar: 0 },
      { label: "Angka 0 pada tempat puluhan berarti", opsi: ["tidak ada puluhan", "ada sepuluh puluhan", "angka itu dibuang"], benar: 0 },
      { label: "Menurutku, mengurai membantu kita untuk", opsi: ["memahami nilai tiap angka", "menghafal angka", "menghitung tanpa angka"], benar: 0 },
    ],
  },
];
/** QB10 Susun Kata Nilai Tempat. */
export const RONDE_SUSUNKATA_QB: { kata: string[]; pengecoh: string }[] = [
  { kata: ["Angka", "2", "menempati", "ratusan", "bernilai", "200"], pengecoh: "20" },
  { kata: ["Angka", "5", "menempati", "puluhan", "bernilai", "50"], pengecoh: "500" },
  { kata: ["Angka", "1", "menempati", "satuan", "bernilai", "1"], pengecoh: "10" },
  { kata: ["Mengurai", "bilangan", "memecahnya", "menurut", "nilai", "tempat"], pengecoh: "menghapus" },
];
