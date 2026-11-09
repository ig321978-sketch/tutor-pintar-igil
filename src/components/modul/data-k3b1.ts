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

/* ====================================================================== */
/* SUB-BAB C. Membandingkan dan mengurutkan bilangan cacah sampai 1.000     */
/* ====================================================================== */

export type Relasi = ">" | "<" | "=";
export const relasi = (a: number, b: number): Relasi => (a > b ? ">" : a < b ? "<" : "=");
export const kataRelasi = (r: Relasi): string => (r === ">" ? "lebih dari" : r === "<" ? "kurang dari" : "sama dengan");
export type TempatBeda = "ratusan" | "puluhan" | "satuan" | "sama";
/** Tempat pertama (dari kiri) yang angkanya berbeda. Itulah tempat yang menentukan perbandingan. */
export function tempatBeda(a: number, b: number): TempatBeda {
  const x = tiga(a);
  const y = tiga(b);
  if (x.r !== y.r) return "ratusan";
  if (x.p !== y.p) return "puluhan";
  if (x.s !== y.s) return "satuan";
  return "sama";
}
export type Pasang = [number, number];
export const OPSI_RELASI = ["lebih dari (>)", "kurang dari (<)", "sama dengan (=)"] as const;
export const teksRelasi = (r: Relasi): string => OPSI_RELASI[r === ">" ? 0 : r === "<" ? 1 : 2];
/** Tiga pilihan relasi dengan urutan tetap, kunci berpindah. */
export function opsiRelasi(r: Relasi, nomor: number): { opsi: string[]; jawab: number } {
  const urut: string[] = urutanTetap(3, 2, nomor).map((i) => OPSI_RELASI[i]);
  return { opsi: urut, jawab: urut.indexOf(teksRelasi(r)) };
}
/** Tiga pilihan kumpulan: A lebih banyak, B lebih banyak, sama banyak. */
export function opsiKumpulan(r: Relasi, nomor: number): { opsi: string[]; jawab: number } {
  const semua = ["Kumpulan A lebih banyak", "Kumpulan B lebih banyak", "Sama banyak"];
  const urut = urutanTetap(3, 2, nomor).map((i) => semua[i]);
  return { opsi: urut, jawab: urut.indexOf(r === ">" ? semua[0] : r === "<" ? semua[1] : semua[2]) };
}
export const cocokBanding = (n: number, acuan: number, arah: "lebih" | "kurang"): boolean => (arah === "lebih" ? n > acuan : n < acuan);
export const urutNaik = (angka: number[], dari: "kecil" | "besar"): number[] => [...angka].sort((a, b) => (dari === "kecil" ? a - b : b - a));

/* ------------------------------ Concrete C ------------------------------ */

export type RondePasangBenda = { benda: BendaId; pasang: Pasang[] };
/** CC1 Bandingkan Kumpulan: dua kumpulan, mana yang lebih banyak. */
export const RONDE_BANDING_CC: RondePasangBenda[] = [
  { benda: "kue", pasang: [[339, 421], [583, 529]] },
  { benda: "kelereng", pasang: [[769, 761], [804, 804]] },
  { benda: "jeruk", pasang: [[450, 405], [218, 281]] },
];
/** CC2 Tanda Kumpulan: A lebih dari, kurang dari, atau sama dengan B. */
export const RONDE_TANDA_CC: RondePasangBenda[] = [
  { benda: "rambutan", pasang: [[421, 339], [529, 583]] },
  { benda: "ikan", pasang: [[761, 769], [620, 620]] },
  { benda: "pensil", pasang: [[305, 350], [912, 921]] },
];
/** CC3 Urutkan Kumpulan. */
export type RondeUrutBenda = { benda: BendaId; angka: number[]; dari: "kecil" | "besar" };
export const RONDE_URUT_CC: RondeUrutBenda[] = [
  { benda: "kue", angka: [720, 639, 709, 690], dari: "kecil" },
  { benda: "lidi", angka: [537, 590, 518, 601], dari: "kecil" },
  { benda: "anggur", angka: [325, 235, 532, 352], dari: "besar" },
];
/** CC4 Paling Banyak, Paling Sedikit. */
export const RONDE_PALING_CC: { benda: BendaId; item: number[] }[] = [
  { benda: "kelereng", item: [138, 103, 183, 150] },
  { benda: "jeruk", item: [498, 490, 508, 480] },
  { benda: "kue", item: [372, 327, 273, 237] },
];
/** CC5 Jodohkan Pasangan dan Tanda: tiga pasang dengan relasi berbeda. */
export const RONDE_PASANG_CC: RondePasangBenda[] = [
  { benda: "kue", pasang: [[421, 339], [529, 583], [640, 640]] },
  { benda: "kelereng", pasang: [[375, 357], [246, 264], [418, 418]] },
  { benda: "pensil", pasang: [[902, 920], [683, 659], [300, 300]] },
];
/** CC6 Taruh di Urutan: tiga kumpulan ke slot terkecil, tengah, terbesar. */
export const RONDE_SLOT_CC: { benda: BendaId; angka: number[] }[] = [
  { benda: "kue", angka: [378, 345, 402] },
  { benda: "rambutan", angka: [583, 529, 550] },
  { benda: "ikan", angka: [706, 670, 607] },
];
/** CC7 Ketuk Semua yang Lebih atau Kurang dari kumpulan acuan. */
export type RondeBanding = { benda: BendaId; acuan: number; arah: "lebih" | "kurang"; angka: number[] };
export const RONDE_SEMUA_CC: RondeBanding[] = [
  { benda: "kue", acuan: 350, arah: "lebih", angka: [421, 339, 372, 298] },
  { benda: "jeruk", acuan: 500, arah: "kurang", angka: [498, 508, 490, 520] },
  { benda: "lidi", acuan: 700, arah: "lebih", angka: [699, 701, 720, 680] },
];
/** CC8 Ratusan Sama, Lihat Berikutnya: pasangan yang ratusannya sama. */
export const RONDE_RATUSAN_CC: RondePasangBenda[] = [
  { benda: "kue", pasang: [[583, 529], [746, 758]] },
  { benda: "anggur", pasang: [[421, 498], [312, 339]] },
  { benda: "kelereng", pasang: [[615, 609], [870, 890]] },
];
/** CC9 Di Antara: kumpulan yang jumlahnya di antara dua kumpulan batas. */
export const RONDE_ANTARA_CC: { benda: BendaId; batas: Pasang; item: number[] }[] = [
  { benda: "kue", batas: [339, 421], item: [350, 300, 450] },
  { benda: "jeruk", batas: [500, 600], item: [450, 550, 650] },
  { benda: "lidi", batas: [700, 800], item: [690, 750, 810] },
];
/** CC10 Cerita Kelereng: tiga anak dan banyak benda, dua pertanyaan. */
export type RondeCerita = { benda: BendaId; nama: string[]; angka: number[]; soal: ("banyak" | "sedikit")[] };
export const RONDE_CERITA_CC: RondeCerita[] = [
  { benda: "kelereng", nama: ["Alfa", "Galih", "Andi"], angka: [138, 103, 183], soal: ["banyak", "sedikit"] },
  { benda: "kue", nama: ["Meutia", "Alfa", "Galih"], angka: [498, 490, 508], soal: ["sedikit", "banyak"] },
  { benda: "jeruk", nama: ["Alen", "Andi", "Meutia"], angka: [325, 352, 235], soal: ["banyak", "sedikit"] },
];
/** Nama anak dengan banyak benda terbanyak atau tersedikit. */
export const namaPalingCerita = (r: RondeCerita, jenis: "banyak" | "sedikit"): string => {
  const target = jenis === "banyak" ? Math.max(...r.angka) : Math.min(...r.angka);
  return r.nama[r.angka.indexOf(target)];
};

/* ------------------------------ Picture C ------------------------------ */

/** PC1 Bandingkan Blok. */
export const RONDE_BANDING_PC: Pasang[][] = [[[420, 402], [317, 371]], [[564, 546], [899, 909]], [[250, 250], [611, 616]]];
/** PC2 Tanda Blok. */
export const RONDE_TANDA_PC: Pasang[][] = [[[432, 423], [615, 651]], [[890, 809], [547, 547]], [[160, 106], [328, 382]]];
/** PC3 Isi Tabel Tanda: empat baris, tanda dari pasangan. */
export const RONDE_TABEL_PC: Pasang[][] = [[[378, 345], [189, 206], [938, 930], [705, 705]], [[739, 839], [275, 279], [610, 601], [483, 483]], [[522, 552], [417, 471], [860, 806], [333, 333]]];
/** PC4 Urutkan Blok. */
export const RONDE_URUT_PC: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [720, 639, 709], dari: "kecil" },
  { angka: [412, 241, 421, 214], dari: "kecil" },
  { angka: [570, 507, 750, 705], dari: "besar" },
];
/** PC5 Jodohkan Pasangan Blok dan Tanda. */
export const RONDE_PASANG_PC: Pasang[][] = [[[245, 254], [318, 318], [570, 507]], [[609, 690], [440, 404], [727, 727]], [[135, 153], [861, 816], [292, 292]]];
/** PC6 Paling Banyak, Paling Sedikit pada Blok. */
export const RONDE_PALING_PC: number[][] = [[314, 341, 143, 431], [652, 625, 526, 562], [890, 809, 980, 908]];
/** PC7 Ketuk Semua Blok yang Lebih atau Kurang. */
export const RONDE_SEMUA_PC: { acuan: number; arah: "lebih" | "kurang"; angka: number[] }[] = [
  { acuan: 400, arah: "lebih", angka: [431, 399, 412, 380] },
  { acuan: 650, arah: "kurang", angka: [645, 655, 600, 700] },
  { acuan: 520, arah: "lebih", angka: [519, 521, 560, 480] },
];
/** PC8 Pilah Blok: ratusan kurang dari 5, atau lima atau lebih. */
export const RONDE_SORTIR_PC: number[][] = [[238, 541, 679, 405, 862, 150], [320, 777, 498, 603, 214, 955], [182, 559, 431, 700, 345, 888]];
export const ratusanBesar = (n: number): boolean => tiga(n).r >= 5;
/** PC9 Lengkapi Kalimat Perbandingan: ratusan keduanya berbeda. */
export const RONDE_KALIMAT_PC: Pasang[] = [[346, 502], [780, 621], [259, 305]];
export function kalimatBanding(a: number, b: number, nomor: number): KalimatIsian[] {
  const x = tiga(a);
  const y = tiga(b);
  const r = relasi(a, b);
  const angka = (v: number, i: number) => {
    const semua = [v, (v + 1) % 10, (v + 3) % 10];
    const opsi = urutanTetap(3, 2, nomor + i).map((k) => semua[k]);
    return { opsi: opsi.map(String), benar: opsi.indexOf(v) };
  };
  const rel = (() => {
    const semua = ["kurang dari", "lebih dari", "sama dengan"];
    const opsi = urutanTetap(3, 2, nomor + 2).map((k) => semua[k]);
    return { opsi, benar: opsi.indexOf(kataRelasi(r)) };
  })();
  return [
    { depan: `${a} punya`, belakang: "ratusan.", ...angka(x.r, 0) },
    { depan: `${b} punya`, belakang: "ratusan.", ...angka(y.r, 1) },
    { depan: `Jadi ${a}`, belakang: `${b}.`, ...rel },
  ];
}
/** PC10 Taruh Blok di Urutan. */
export const RONDE_SLOT_PC: number[][] = [[483, 438, 534], [725, 752, 705], [160, 106, 610]];

/* ------------------------------ Abstract C ------------------------------ */

/** QC1 Bandingkan Lambang (Ayo Berlatih 1). */
export const RONDE_BANDING_QC: Pasang[][] = [[[378, 345], [189, 206]], [[938, 930], [739, 839]], [[275, 279], [705, 705]]];
/** QC2 Isi Tabel Tanda. */
export const RONDE_TABEL_QC: Pasang[][] = [[[537, 590], [518, 601], [590, 518], [601, 601]], [[325, 235], [532, 352], [352, 325], [235, 532]], [[720, 639], [709, 720], [639, 709], [709, 709]]];
/** QC3 Tempat yang Menentukan. */
export const RONDE_TEMPAT_QC: Pasang[][] = [[[583, 529], [421, 339]], [[769, 761], [804, 804]], [[650, 630], [215, 725]]];
export function opsiTempatBeda(a: number, b: number, nomor: number): { opsi: string[]; jawab: number } {
  const t = tempatBeda(a, b);
  const kunci = t === "sama" ? "tidak ada, kedua bilangan sama" : t;
  const salah = t === "sama" ? ["ratusan", "satuan"] : (["ratusan", "puluhan", "satuan"] as const).filter((x) => x !== t);
  return susunOpsi(kunci, [salah[0], salah[1]], nomor);
}
/** QC4 Urutkan Lambang. */
export const RONDE_URUT_QC: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [537, 590, 518, 601], dari: "kecil" },
  { angka: [325, 235, 532, 352], dari: "besar" },
  { angka: [150, 115, 501, 510], dari: "kecil" },
];
/** QC5 Jodohkan Pasangan dan Kata (tiga relasi berbeda). */
export const RONDE_PASANG_QC: Pasang[][] = [[[769, 761], [418, 481], [905, 905]], [[250, 205], [640, 664], [333, 333]], [[871, 817], [199, 200], [560, 560]]];
/** QC6 Benar atau Salah. */
export const RONDE_BENARSALAH_QC: Pernyataan[][] = [
  [
    { teks: "Bilangan 339 kurang dari 421.", benar: 339 < 421, penjelasan: "Ratusan 339 adalah 3, ratusan 421 adalah 4. 3 kurang dari 4, jadi 339 < 421." },
    { teks: "Bilangan 583 lebih dari 529.", benar: 583 > 529, penjelasan: "Ratusan sama, yaitu 5. Puluhan 8 lebih dari 2, jadi 583 > 529." },
    { teks: "Untuk membandingkan 769 dan 761, kita mulai dari satuan.", benar: false, penjelasan: "Kita mulai dari ratusan. Ratusan dan puluhan sama, baru satuan menentukan: 9 lebih dari 1." },
    { teks: "Bilangan 804 sama dengan 804.", benar: true, penjelasan: "Ratusan, puluhan, dan satuannya sama semua, jadi 804 = 804." },
    { teks: "Simbol > dibaca kurang dari.", benar: false, penjelasan: "Simbol > dibaca lebih dari. Simbol < dibaca kurang dari." },
  ],
  [
    { teks: "Urutan 709, 639, 720 dari terkecil adalah 639, 709, 720.", benar: urutNaik([709, 639, 720], "kecil").join() === "639,709,720", penjelasan: "639 punya 6 ratusan paling sedikit. Lalu 709 dan 720 sama ratusannya; puluhan 0 kurang dari 2." },
    { teks: "Bilangan 189 lebih dari 206.", benar: 189 > 206, penjelasan: "Ratusan 189 adalah 1, ratusan 206 adalah 2, jadi 189 < 206." },
    { teks: "Bilangan 938 lebih dari 930.", benar: 938 > 930, penjelasan: "Ratusan dan puluhan sama. Satuan 8 lebih dari 0, jadi 938 > 930." },
    { teks: "Bilangan 275 lebih dari 279.", benar: 275 > 279, penjelasan: "Ratusan dan puluhan sama. Satuan 5 kurang dari 9, jadi 275 < 279." },
    { teks: "Dari terbesar ke terkecil, 325 datang sebelum 532.", benar: false, penjelasan: "532 lebih besar dari 325, jadi dari terbesar 532 datang lebih dulu." },
  ],
];
/** QC7 Detektif Perbandingan. */
export const RONDE_DETEKTIF_QC: SoalDetektif[] = [
  { klue: ["Aku lebih dari 500 dan kurang dari 510.", "Angka satuanku 7."], jawab: 507, opsi: [507, 517, 497], salah: "Antara 500 dan 510, angka ratusanku 5 dan puluhanku 0. Satuan 7." },
  { klue: ["Aku kurang dari 300.", "Aku lebih dari 290 dan puluhanku 9."], jawab: 295, opsi: [305, 295, 285], salah: "Lebih dari 290 dan kurang dari 300: ratusan 2, puluhan 9." },
  { klue: ["Aku lebih dari 639 dan kurang dari 709.", "Satuanku 0 dan puluhanku 7."], jawab: 670, opsi: [670, 700, 760], salah: "Ratusan 6, lalu cek puluhan 7 dan satuan 0 antara 639 dan 709." },
  { klue: ["Aku lebih dari 800.", "Aku kurang dari 805 dan satuanku 3."], jawab: 803, opsi: [813, 803, 783], salah: "Antara 800 dan 805, satuan 3: 803." },
];
/** QC8 Ketuk Semua Lambang yang Lebih atau Kurang. */
export const RONDE_SEMUA_QC: { acuan: number; arah: "lebih" | "kurang"; angka: number[] }[] = [
  { acuan: 450, arah: "lebih", angka: [449, 451, 540, 405] },
  { acuan: 300, arah: "kurang", angka: [299, 301, 290, 310] },
  { acuan: 900, arah: "kurang", angka: [899, 901, 890, 990] },
];
/** QC9 Peta Konsep Membandingkan. */
export const PETA_KONSEP_QC: { pusat: string; kotak: KotakPeta[] }[] = [
  {
    pusat: "Membandingkan bilangan",
    kotak: [
      { label: "Kita mulai membandingkan dari tempat", opsi: ["ratusan", "satuan", "puluhan"], benar: 0 },
      { label: "Bila ratusan sama, kita lihat tempat", opsi: ["puluhan", "ribuan", "ratusan lagi"], benar: 0 },
      { label: "Bila ratusan dan puluhan sama, kita lihat tempat", opsi: ["satuan", "puluhan", "ratusan"], benar: 0 },
      { label: "Menurutku, 804 dan 804 adalah bilangan yang", opsi: ["sama", "berbeda", "tidak bisa dibandingkan"], benar: 0 },
    ],
  },
  {
    pusat: "Mengurutkan bilangan",
    kotak: [
      { label: "Dari terkecil ke terbesar berarti dimulai dari bilangan yang", opsi: ["paling kecil", "paling besar", "paling tengah"], benar: 0 },
      { label: "Urutan 639, 709, 720 adalah dari", opsi: ["terkecil ke terbesar", "terbesar ke terkecil", "acak"], benar: 0 },
      { label: "Simbol < dibaca", opsi: ["kurang dari", "lebih dari", "sama dengan"], benar: 0 },
      { label: "Menurutku, tanda > dan < membantu kita untuk", opsi: ["membandingkan dua bilangan", "menjumlahkan bilangan", "menulis nol"], benar: 0 },
    ],
  },
];
/** QC10 Susun Kata Membandingkan. */
export const RONDE_SUSUNKATA_QC: { kata: string[]; pengecoh: string }[] = [
  { kata: ["339", "kurang", "dari", "421", "ditulis", "339", "<", "421"], pengecoh: ">" },
  { kata: ["583", "lebih", "dari", "529", "ditulis", "583", ">", "529"], pengecoh: "<" },
  { kata: ["Bandingkan", "dulu", "angka", "pada", "tempat", "ratusan"], pengecoh: "satuan" },
  { kata: ["Bilangan", "804", "sama", "dengan", "804"], pengecoh: "kurang" },
];

/* ====================================================================== */
/* SUB-BAB D. Penjumlahan bilangan cacah sampai 100                         */
/* ====================================================================== */

export const puluhanDari = (n: number): number => Math.floor(n / 10);
export const satuanDari = (n: number): number => n % 10;
/** Penjumlahan satuan melewati sepuluh, jadi perlu menyimpan satu puluhan. */
export const perluSimpan = (a: number, b: number): boolean => satuanDari(a) + satuanDari(b) >= 10;
/** Tiga pilihan hasil jumlah: kunci, lupa menyimpan (kurang sepuluh), dan salah menyimpan (lebih sepuluh). */
export function opsiJumlah(n: number, nomor: number): number[] {
  const semua = [n, n >= 10 ? n - 10 : n + 20, n + 10 <= 99 ? n + 10 : n - 20];
  return urutanTetap(3, 2, nomor).map((i) => semua[i]);
}
export type SoalJumlah = { benda: BendaId; a: number; b: number };
export type Jml = [number, number];

/* ------------------------------ Concrete D ------------------------------ */

/** CD1 Gabungkan Kumpulan: rakit jumlah dua kumpulan dengan penukaran. */
export const RONDE_GABUNG_CD: SoalJumlah[][] = [
  [{ benda: "kue", a: 23, b: 16 }, { benda: "kelereng", a: 34, b: 25 }],
  [{ benda: "jeruk", a: 48, b: 16 }, { benda: "lidi", a: 27, b: 35 }],
  [{ benda: "anggur", a: 54, b: 29 }, { benda: "pensil", a: 36, b: 47 }],
];
/** CD2 Hitung Gabungan. */
export const RONDE_JUMLAH_CD: SoalJumlah[][] = [
  [{ benda: "kue", a: 23, b: 16 }, { benda: "jeruk", a: 31, b: 24 }],
  [{ benda: "kelereng", a: 48, b: 16 }, { benda: "rambutan", a: 25, b: 19 }],
  [{ benda: "ikan", a: 54, b: 29 }, { benda: "pensil", a: 38, b: 37 }],
];
/** CD3 Pilah Soal: tanpa menyimpan atau dengan menyimpan. */
export const RONDE_SORTIR_CD: { benda: BendaId; pasang: Jml[] }[] = [
  { benda: "kue", pasang: [[23, 16], [48, 16], [31, 24], [27, 35], [42, 36], [19, 12]] },
  { benda: "kelereng", pasang: [[54, 29], [33, 21], [38, 25], [41, 52], [26, 47], [60, 13]] },
  { benda: "jeruk", pasang: [[17, 25], [32, 26], [45, 38], [51, 27], [29, 29], [14, 43]] },
];
/** CD4 Jodohkan Pasangan Kumpulan dan Jumlah. */
export const RONDE_PASANG_CD: { benda: BendaId; pasang: Jml[] }[] = [
  { benda: "kue", pasang: [[23, 16], [48, 16], [54, 29]] },
  { benda: "kelereng", pasang: [[31, 24], [27, 35], [42, 36]] },
  { benda: "pensil", pasang: [[19, 12], [33, 28], [45, 38]] },
];
/** CD5 Memori Pasangan Kumpulan dan Jumlah. */
export const RONDE_MEMORI_CD: { benda: BendaId; pasang: Jml[] }[] = [
  { benda: "kue", pasang: [[12, 13], [24, 35], [41, 28], [33, 37]] },
  { benda: "jeruk", pasang: [[15, 21], [22, 47], [36, 18], [44, 29]] },
  { benda: "anggur", pasang: [[27, 14], [38, 25], [46, 19], [53, 28]] },
];
/** CD6 Ketuk Pasangan dengan Jumlah Tertentu. */
export const RONDE_KETUK_CD: { benda: BendaId; item: Jml[]; tanya: number[] }[] = [
  { benda: "kue", item: [[23, 16], [48, 16], [54, 29]], tanya: [64, 39] },
  { benda: "kelereng", item: [[31, 24], [27, 35], [42, 36]], tanya: [78, 55] },
  { benda: "ikan", item: [[19, 12], [33, 28], [45, 38]], tanya: [83, 31] },
];
/** CD7 Ketuk Semua: pasangan yang perlu menyimpan atau tanpa menyimpan. */
export const RONDE_SEMUA_CD: { benda: BendaId; syarat: "simpan" | "tanpa"; pasang: Jml[] }[] = [
  { benda: "kue", syarat: "simpan", pasang: [[48, 16], [23, 16], [54, 29], [31, 24]] },
  { benda: "kelereng", syarat: "tanpa", pasang: [[27, 35], [42, 36], [33, 21], [58, 27]] },
  { benda: "jeruk", syarat: "simpan", pasang: [[19, 12], [36, 21], [27, 46], [40, 50]] },
];
/** CD8 Cerita Penjumlahan. */
export type Cerita2 = { benda: BendaId; teks: string; a: number; b: number };
export const RONDE_CERITA_CD: Cerita2[][] = [
  [
    { benda: "pensil", teks: "Ada 23 pensil warna merah dan 16 pensil warna biru. Berapa banyak pensil semuanya?", a: 23, b: 16 },
    { benda: "kelereng", teks: "Alfa punya 48 kelereng biru dan 16 kelereng merah. Berapa banyak kelereng Alfa?", a: 48, b: 16 },
  ],
  [
    { benda: "kue", teks: "Ibu menyiapkan 54 kue cubit manis dan 29 kue cubit asin. Berapa banyak kue cubit semuanya?", a: 54, b: 29 },
    { benda: "jeruk", teks: "Paman memetik 31 jeruk, lalu memetik 27 jeruk lagi. Berapa jeruk yang dipetik Paman?", a: 31, b: 27 },
  ],
  [
    { benda: "rambutan", teks: "Meutia mengumpulkan 36 rambutan pagi hari dan 47 rambutan siang hari. Berapa rambutan yang terkumpul?", a: 36, b: 47 },
    { benda: "ikan", teks: "Di kolam Alen ada 25 ikan hias, lalu ditambah 36 ikan hias. Berapa ikan hias di kolam?", a: 25, b: 36 },
  ],
];
/** CD9 Papan Jawaban Gabungan. */
export const RONDE_PAPAN_CD: SoalJumlah[][] = [
  [{ benda: "kue", a: 33, b: 28 }, { benda: "jeruk", a: 27, b: 46 }],
  [{ benda: "kelereng", a: 19, b: 12 }, { benda: "pensil", a: 36, b: 21 }],
  [{ benda: "anggur", a: 45, b: 38 }, { benda: "ikan", a: 62, b: 29 }],
];
/** CD10 Urutkan Pasangan menurut Jumlahnya. */
export const RONDE_URUT_CD: { benda: BendaId; pasang: Jml[]; dari: "kecil" | "besar" }[] = [
  { benda: "kue", pasang: [[23, 16], [48, 16], [31, 24]], dari: "kecil" },
  { benda: "jeruk", pasang: [[27, 35], [42, 36], [19, 12]], dari: "besar" },
  { benda: "kelereng", pasang: [[54, 29], [33, 28], [45, 36]], dari: "kecil" },
];

/* ------------------------------ Picture D ------------------------------ */

/** PD1 Susun Bawah (Bab 1 Sub-Bab D, cara susun pendek): satu soal per ronde. */
export const RONDE_SUSUN_PD: Jml[] = [[23, 16], [48, 16], [54, 29]];
/** PD2 Papan Jawaban Susun. */
export const RONDE_PAPAN_PD: Jml[][] = [[[33, 28], [27, 46]], [[19, 12], [36, 21]], [[45, 38], [62, 29]]];
/** PD3 Hitung Model Puluhan dan Satuan. */
export const RONDE_JUMLAH_PD: Jml[][] = [[[24, 13], [35, 22]], [[17, 26], [38, 45]], [[52, 19], [29, 63]]];
/** PD4 Jodohkan Model dan Jumlah. */
export const RONDE_PASANG_PD: Jml[][] = [[[21, 34], [43, 18], [56, 27]], [[33, 44], [19, 25], [38, 29]], [[62, 17], [45, 36], [28, 39]]];
/** PD5 Memori Model dan Jumlah. */
export const RONDE_MEMORI_PD: Jml[][] = [[[12, 13], [24, 35], [41, 28], [33, 37]], [[15, 21], [22, 47], [36, 18], [44, 29]], [[27, 14], [38, 25], [46, 19], [53, 28]]];
/** PD6 Isi Tabel Hasil Susun. */
export type TabelJumlah = { kepala: [string, string]; baris: { label: string; jawab: string }[]; kartu: string[] };
function tabelJumlah(pasang: Jml[], tambahan: number): TabelJumlah {
  const baris = pasang.map(([a, b]) => ({ label: `${a} + ${b}`, jawab: String(a + b) }));
  const asing = String(pasang[0][0] + pasang[0][1] + 10);
  const kartu = urutanTetap(pasang.length + 1, 2, tambahan).map((i) => (i < pasang.length ? baris[i].jawab : asing));
  return { kepala: ["Soal", "Hasil"], baris, kartu };
}
export const RONDE_TABEL_PD: TabelJumlah[] = [tabelJumlah([[33, 28], [27, 46], [19, 12], [36, 21]], 1), tabelJumlah([[31, 51], [49, 19], [21, 20], [70, 13]], 2), tabelJumlah([[45, 27], [38, 36], [26, 15], [52, 34]], 3)];
/** PD7 Ketuk Semua: yang perlu menyimpan. */
export const RONDE_SEMUA_PD: { syarat: "simpan" | "tanpa"; pasang: Jml[] }[] = [
  { syarat: "simpan", pasang: [[48, 16], [23, 16], [54, 29], [31, 24]] },
  { syarat: "tanpa", pasang: [[27, 35], [42, 36], [33, 21], [58, 27]] },
  { syarat: "simpan", pasang: [[19, 12], [36, 21], [27, 46], [40, 50]] },
];
export const cocokSimpan = (p: Jml, syarat: "simpan" | "tanpa"): boolean => (syarat === "simpan" ? perluSimpan(p[0], p[1]) : !perluSimpan(p[0], p[1]));
/** PD8 Pilah Soal Susun. */
export const RONDE_SORTIR_PD: Jml[][] = [[[23, 16], [48, 16], [31, 24], [27, 35], [42, 36], [19, 12]], [[54, 29], [33, 21], [38, 25], [41, 52], [26, 47], [60, 13]], [[17, 25], [32, 26], [45, 38], [51, 27], [29, 29], [14, 43]]];
/** PD9 Cara Panjang: uraikan lalu kelompokkan. */
export const RONDE_URAI_PD: Jml[] = [[23, 16], [48, 16], [54, 29]];
export function kalimatPanjang(a: number, b: number, nomor: number): KalimatIsian[] {
  const pil = (v: number, i: number) => {
    const semua = [v, (v + 2) % 100, v + 10 > 99 ? v - 10 : v + 10];
    const opsi = urutanTetap(3, 2, nomor + i).map((k) => semua[k]);
    return { opsi: opsi.map(String), benar: opsi.indexOf(v) };
  };
  const ta = puluhanDari(a) * 10;
  const tb = puluhanDari(b) * 10;
  return [
    { depan: `${a} = ${ta} +`, belakang: ".", ...pil(satuanDari(a), 0) },
    { depan: `${b} =`, belakang: `+ ${satuanDari(b)}.`, ...pil(tb, 1) },
    { depan: `${a} + ${b} =`, belakang: ".", ...pil(a + b, 2) },
  ];
}
/** PD10 Urutkan Langkah Penjumlahan Bersusun. */
export const RONDE_LANGKAH_PD: { judul: string; langkah: string[] }[] = [
  { judul: "Susun pendek tanpa menyimpan: 23 + 16", langkah: ["Susun bilangan sesuai nilai tempat", "Jumlahkan satuan: 3 + 6 = 9", "Jumlahkan puluhan: 2 + 1 = 3", "Tulis hasilnya: 39"] },
  { judul: "Susun pendek dengan menyimpan: 48 + 16", langkah: ["Susun bilangan sesuai nilai tempat", "Jumlahkan satuan: 8 + 6 = 14, simpan 1 puluhan", "Jumlahkan puluhan: 1 + 4 + 1 = 6", "Tulis hasilnya: 64"] },
  { judul: "Susun panjang: 54 + 29", langkah: ["Uraikan: 54 = 50 + 4 dan 29 = 20 + 9", "Kelompokkan: (50 + 20) + (4 + 9)", "Jumlahkan: 70 + 13", "Uraikan 13 dan jumlahkan: 83"] },
];

/* ------------------------------ Abstract D ------------------------------ */

/** QD1 Susun Bawah Lambang. */
export const RONDE_SUSUN_QD: Jml[] = [[34, 25], [46, 38], [57, 26]];
/** QD2 Jumlah Pilihan (Ayo Berlatih 3). */
export const RONDE_JUMLAH_QD: Jml[][] = [[[31, 51], [49, 19]], [[21, 20], [70, 13]], [[61, 37], [18, 45]]];
/** QD3 Papan Jumlah. */
export const RONDE_PAPAN_QD: Jml[][] = [[[64, 17], [35, 48]], [[26, 39], [52, 33]], [[71, 19], [28, 57]]];
/** QD4 Puluhan, Satuan, Jumlah: kalimat langkah menjumlah. */
export const RONDE_LANGKAH_QD: Jml[] = [[48, 16], [54, 29], [37, 45]];
export function kalimatLangkah(a: number, b: number, nomor: number): KalimatIsian[] {
  const pil = (v: number, i: number) => {
    const semua = [v, v + 1 > 99 ? v - 1 : v + 1, v >= 10 ? v - 10 : v + 10];
    const opsi = urutanTetap(3, 2, nomor + i).map((k) => semua[k]);
    return { opsi: opsi.map(String), benar: opsi.indexOf(v) };
  };
  const ta = puluhanDari(a);
  const tb = puluhanDari(b);
  const sa = satuanDari(a);
  const sb = satuanDari(b);
  return [
    { depan: `Satuan: ${sa} + ${sb} =`, belakang: ".", ...pil(sa + sb, 0) },
    { depan: `Puluhan: ${ta} + ${tb} + ${perluSimpan(a, b) ? 1 : 0} =`, belakang: ".", ...pil(ta + tb + (perluSimpan(a, b) ? 1 : 0), 1) },
    { depan: `${a} + ${b} =`, belakang: ".", ...pil(a + b, 2) },
  ];
}
/** QD5 Jodohkan Soal dan Hasil. */
export const RONDE_PASANG_QD: Jml[][] = [[[23, 16], [48, 16], [54, 29]], [[31, 24], [27, 35], [42, 36]], [[19, 12], [33, 28], [45, 38]]];
/** QD6 Memori Soal dan Hasil. */
export const RONDE_MEMORI_QD: Jml[][] = [[[12, 13], [24, 35], [41, 28], [33, 37]], [[15, 21], [22, 47], [36, 18], [44, 29]], [[27, 14], [38, 25], [46, 19], [53, 28]]];
/** QD7 Benar atau Salah. */
export const RONDE_BENARSALAH_QD: Pernyataan[][] = [
  [
    { teks: `23 + 16 = ${23 + 16}.`, benar: true, penjelasan: "Satuan 3 + 6 = 9, puluhan 2 + 1 = 3. Hasilnya 39." },
    { teks: "Pada penjumlahan bersusun, satuan dijumlahkan lebih dulu.", benar: true, penjelasan: "Kita mulai dari satuan, baru puluhan." },
    { teks: `48 + 16 = ${48 + 16 - 10}.`, benar: false, penjelasan: "8 + 6 = 14, jadi simpan 1 puluhan. Hasilnya 64, bukan 54." },
    { teks: "Bila satuan berjumlah 10 atau lebih, kita menyimpan satu puluhan.", benar: true, penjelasan: "Sepuluh satuan ditukar satu puluhan, lalu ditambahkan ke puluhan." },
    { teks: `21 + 20 = ${21 + 20}.`, benar: true, penjelasan: "Satuan 1 + 0 = 1, puluhan 2 + 2 = 4. Hasilnya 41." },
  ],
  [
    { teks: `54 + 29 = ${54 + 29}.`, benar: true, penjelasan: "4 + 9 = 13, simpan 1 puluhan. 5 + 2 + 1 = 8. Hasilnya 83." },
    { teks: "Pada cara susun panjang, bilangan diuraikan menjadi puluhan dan satuan.", benar: true, penjelasan: "Misalnya 54 = 50 + 4. Lalu puluhan dengan puluhan, satuan dengan satuan." },
    { teks: `70 + 13 = ${70 + 31}.`, benar: false, penjelasan: "70 + 13 = 83. Angka 3 dan 1 pada 13 tidak boleh tertukar." },
    { teks: "Bilangan 14 diurai menjadi 10 + 4.", benar: true, penjelasan: "14 sama dengan 1 puluhan dan 4 satuan." },
    { teks: `33 + 28 = ${33 + 28 - 10}.`, benar: false, penjelasan: "3 + 8 = 11, simpan 1 puluhan. 3 + 2 + 1 = 6. Hasilnya 61." },
  ],
];
/** QD8 Detektif Penjumlahan. */
export const RONDE_DETEKTIF_QD: SoalDetektif[] = [
  { klue: ["Aku adalah hasil 23 + 16.", "Aku kurang dari 40."], jawab: 39, opsi: [39, 29, 49], salah: "23 + 16 = 39. Cek puluhan 2 + 1 dan satuan 3 + 6." },
  { klue: ["Aku adalah hasil 48 + 16.", "Puluhanku 6."], jawab: 64, opsi: [54, 64, 74], salah: "8 + 6 = 14, simpan 1 puluhan. 4 + 1 + 1 = 6. Hasilnya 64." },
  { klue: ["Jumlah dua bilangan yang satuannya 4 dan 9 adalah 83.", "Salah satu bilangannya 54."], jawab: 29, opsi: [19, 29, 39], salah: "83 dikurangi 54 sama dengan 29. Satuan 9 dan 4 + 9 = 13." },
  { klue: ["Aku hasil 70 + 13.", "Satuanku 3."], jawab: 83, opsi: [73, 83, 93], salah: "70 + 13 = 83. Puluhan 7 + 1 = 8." },
];
/** QD9 Peta Konsep Penjumlahan. */
export const PETA_KONSEP_QD: { pusat: string; kotak: KotakPeta[] }[] = [
  {
    pusat: "Penjumlahan bersusun",
    kotak: [
      { label: "Bilangan disusun lurus menurut", opsi: ["nilai tempat", "besar kecil", "urutan huruf"], benar: 0 },
      { label: "Kita menjumlahkan lebih dulu pada tempat", opsi: ["satuan", "puluhan", "ratusan"], benar: 0 },
      { label: "Satuan berjumlah 14 berarti menyimpan", opsi: ["1 puluhan", "4 puluhan", "10 puluhan"], benar: 0 },
      { label: "Menurutku, 48 + 16 hasilnya", opsi: ["64", "54", "74"], benar: 0 },
    ],
  },
  {
    pusat: "Cara susun panjang",
    kotak: [
      { label: "Pertama, bilangan", opsi: ["diuraikan menjadi puluhan dan satuan", "dikurangi", "dikalikan"], benar: 0 },
      { label: "Lalu puluhan dikelompokkan dengan", opsi: ["puluhan", "satuan", "ratusan"], benar: 0 },
      { label: "13 diurai menjadi", opsi: ["10 + 3", "1 + 3", "13 + 0"], benar: 0 },
      { label: "Menurutku, 54 + 29 sama dengan 70 +", opsi: ["13", "31", "3"], benar: 0 },
    ],
  },
];
/** QD10 Soal Cerita Tiga Bilangan (Ayo Berlatih 5). */
export type CeritaJumlah = { teks: string; angka: number[] };
export const RONDE_CERITA_QD: CeritaJumlah[][] = [
  [
    { teks: "Andi membeli 25 buku dan 36 pensil. Berapa jumlah barang yang dibeli Andi?", angka: [25, 36] },
    { teks: "Di kolam Alen ada 11 ikan cupang, 9 ikan molly, dan 19 ikan koki. Berapa ekor ikan hias di kolam?", angka: [11, 9, 19] },
  ],
  [
    { teks: "Pak Adi punya 15 kambing, 10 sapi, dan 12 domba. Berapa jumlah hewan ternaknya?", angka: [15, 10, 12] },
    { teks: "Lomba karnaval diikuti 13 siswa kelas 3, 22 siswa kelas 4, dan 28 siswa kelas 5. Berapa jumlah siswa seluruhnya?", angka: [13, 22, 28] },
  ],
  [
    { teks: "Di rak ada 23 buku Matematika dan 16 buku Bahasa Indonesia. Berapa jumlah buku di rak?", angka: [23, 16] },
    { teks: "Upacara diikuti 48 siswa laki-laki dan 16 siswa perempuan. Berapa jumlah siswa yang ikut upacara?", angka: [48, 16] },
  ],
];
export const jumlahCerita = (c: CeritaJumlah): number => c.angka.reduce((a, b) => a + b, 0);

/* ====================================================================== */
/* SUB-BAB E. Pengurangan bilangan cacah sampai 100                         */
/* ====================================================================== */

/** Pengurangan satuan tidak cukup, jadi perlu mengambil satu puluhan. */
export const perluMengambil = (a: number, b: number): boolean => satuanDari(a) < satuanDari(b);
/** Tiga pilihan hasil pengurangan: kunci, lupa mengambil (lebih sepuluh), dan salah mengambil (kurang sepuluh). */
export function opsiSelisih(n: number, nomor: number): number[] {
  const semua = [n, n + 10 <= 99 ? n + 10 : n - 20, n >= 10 ? n - 10 : n + 20];
  return urutanTetap(3, 2, nomor).map((i) => semua[i]);
}
export type SoalKurang = { benda: BendaId; a: number; b: number };
export const cocokAmbil = (p: Jml, syarat: "ambil" | "tanpa"): boolean => (syarat === "ambil" ? perluMengambil(p[0], p[1]) : !perluMengambil(p[0], p[1]));
/* ------------------------------ Concrete E ------------------------------ */

/** CE1 Rakit Sisa: dari a diambil b, rakit sisanya. */
export const RONDE_SISA_CE: SoalKurang[][] = [
  [{ benda: "kue", a: 25, b: 12 }, { benda: "kelereng", a: 48, b: 23 }],
  [{ benda: "jeruk", a: 45, b: 19 }, { benda: "lidi", a: 52, b: 27 }],
  [{ benda: "anggur", a: 60, b: 35 }, { benda: "pensil", a: 74, b: 38 }],
];
/** CE2 Hitung Sisa. */
export const RONDE_HITUNG_CE: SoalKurang[][] = [
  [{ benda: "kue", a: 25, b: 12 }, { benda: "jeruk", a: 38, b: 15 }],
  [{ benda: "kelereng", a: 45, b: 19 }, { benda: "rambutan", a: 52, b: 27 }],
  [{ benda: "ikan", a: 60, b: 35 }, { benda: "pensil", a: 71, b: 46 }],
];
/** CE3 Pilah Soal Pengurangan: tanpa mengambil atau dengan mengambil. */
export const RONDE_SORTIR_CE: { benda: BendaId; pasang: Jml[] }[] = [
  { benda: "kue", pasang: [[25, 12], [45, 19], [38, 15], [52, 27], [67, 34], [71, 28]] },
  { benda: "kelereng", pasang: [[60, 35], [48, 23], [83, 47], [96, 52], [74, 38], [59, 31]] },
  { benda: "jeruk", pasang: [[72, 29], [86, 43], [91, 56], [37, 24], [64, 48], [58, 26]] },
];
/** CE4 Jodohkan Pasangan dan Sisa. */
export const RONDE_PASANG_CE: { benda: BendaId; pasang: Jml[] }[] = [
  { benda: "kue", pasang: [[25, 12], [45, 19], [60, 35]] },
  { benda: "kelereng", pasang: [[38, 15], [52, 27], [71, 44]] },
  { benda: "pensil", pasang: [[48, 23], [83, 47], [96, 52]] },
];
/** CE5 Memori Pasangan dan Sisa. */
export const RONDE_MEMORI_CE: { benda: BendaId; pasang: Jml[] }[] = [
  { benda: "kue", pasang: [[37, 12], [48, 19], [56, 24], [63, 18]] },
  { benda: "jeruk", pasang: [[29, 14], [54, 26], [72, 35], [85, 41]] },
  { benda: "anggur", pasang: [[67, 23], [91, 38], [76, 49], [58, 29]] },
];
/** CE6 Ketuk Pasangan dengan Sisa Tertentu. */
export const RONDE_KETUK_CE: { benda: BendaId; item: Jml[]; tanya: number[] }[] = [
  { benda: "kue", item: [[25, 12], [45, 19], [60, 35]], tanya: [26, 13] },
  { benda: "kelereng", item: [[38, 15], [52, 27], [71, 44]], tanya: [27, 23] },
  { benda: "ikan", item: [[48, 23], [83, 47], [96, 52]], tanya: [44, 25] },
];
/** CE7 Ketuk Semua: soal yang perlu mengambil, atau yang tanpa mengambil. */
export const RONDE_SEMUA_CE: { benda: BendaId; syarat: "ambil" | "tanpa"; pasang: Jml[] }[] = [
  { benda: "kue", syarat: "ambil", pasang: [[43, 16], [25, 12], [52, 15], [38, 15]] },
  { benda: "kelereng", syarat: "tanpa", pasang: [[67, 34], [61, 24], [48, 23], [82, 35]] },
  { benda: "jeruk", syarat: "ambil", pasang: [[60, 35], [86, 43], [91, 56], [37, 24]] },
];
/** CE8 Cerita Pengurangan. */
export const RONDE_CERITA_CE: SoalKurang[][] = [
  [{ benda: "kue", a: 25, b: 12 }, { benda: "pensil", a: 45, b: 19 }],
  [{ benda: "kelereng", a: 60, b: 35 }, { benda: "jeruk", a: 52, b: 27 }],
  [{ benda: "ikan", a: 71, b: 44 }, { benda: "rambutan", a: 83, b: 47 }],
];
export const TEKS_CERITA_CE: Record<string, string> = {
  "kue-25-12": "Galih punya 25 kue cubit. Alfa mengambil 12 kue cubit. Berapa sisa kue cubit Galih?",
  "pensil-45-19": "Toko Pak Bandi punya 45 pensil warna. Siswa membeli 19 pensil warna. Berapa sisa pensil warna di toko?",
  "kelereng-60-35": "Alen punya 60 kelereng. Ia memberi 35 kelereng kepada Andi. Berapa sisa kelereng Alen?",
  "jeruk-52-27": "Paman memetik 52 jeruk. Sebanyak 27 jeruk dijual. Berapa jeruk yang tersisa?",
  "ikan-71-44": "Di kolam ada 71 ikan hias. Sebanyak 44 ikan hias dipindahkan. Berapa ikan hias yang tersisa?",
  "rambutan-83-47": "Meutia punya 83 rambutan. Ia memakan 47 rambutan. Berapa rambutan yang tersisa?",
};
export const kunciCerita = (s: SoalKurang): string => `${s.benda}-${s.a}-${s.b}`;
/** CE9 Papan Sisa Kumpulan. */
export const RONDE_PAPAN_CE: SoalKurang[][] = [
  [{ benda: "kue", a: 48, b: 15 }, { benda: "jeruk", a: 86, b: 34 }],
  [{ benda: "kelereng", a: 93, b: 47 }, { benda: "pensil", a: 64, b: 28 }],
  [{ benda: "anggur", a: 75, b: 39 }, { benda: "ikan", a: 82, b: 56 }],
];
/** CE10 Urutkan Pasangan menurut Sisa. */
export const RONDE_URUT_CE: { benda: BendaId; pasang: Jml[]; dari: "kecil" | "besar" }[] = [
  { benda: "kue", pasang: [[25, 12], [45, 19], [38, 15]], dari: "kecil" },
  { benda: "jeruk", pasang: [[52, 27], [71, 44], [63, 35]], dari: "besar" },
  { benda: "kelereng", pasang: [[83, 47], [96, 52], [48, 23]], dari: "kecil" },
];
export const selisih = (p: Jml): number => p[0] - p[1];

/* ------------------------------ Picture E ------------------------------ */

/** PE1 Susun Bawah Pengurangan: 25 − 12 (tanpa mengambil), 45 − 19 dan 60 − 35 (mengambil). */
export const RONDE_SUSUN_PE: Jml[] = [[25, 12], [45, 19], [60, 35]];
/** PE2 Papan Hasil Susun (Ayo Berlatih 2). */
export const RONDE_PAPAN_PE: Jml[][] = [[[33, 28], [42, 36]], [[22, 12], [98, 21]], [[54, 29], [71, 38]]];
/** PE3 Hitung Model Pengurangan. */
export const RONDE_SELISIH_PE: Jml[][] = [[[48, 23], [57, 24]], [[63, 28], [84, 39]], [[72, 45], [91, 36]]];
/** PE4 Jodohkan Model dan Sisa. */
export const RONDE_PASANG_PE: Jml[][] = [[[39, 14], [52, 28], [68, 33]], [[47, 21], [75, 38], [83, 45]], [[56, 19], [92, 64], [71, 30]]];
/** PE5 Memori Model dan Sisa. */
export const RONDE_MEMORI_PE: Jml[][] = [[[34, 11], [47, 18], [59, 25], [72, 36]], [[26, 13], [55, 27], [68, 35], [81, 44]], [[43, 17], [64, 29], [77, 52], [90, 45]]];
/** PE6 Isi Tabel Hasil Pengurangan. */
export type TabelSelisih = { kepala: [string, string]; baris: { label: string; jawab: string }[]; kartu: string[] };
function tabelSelisih(pasang: Jml[], tambahan: number): TabelSelisih {
  const baris = pasang.map(([a, b]) => ({ label: `${a} − ${b}`, jawab: String(a - b) }));
  const asing = String(pasang[0][0] - pasang[0][1] + 10);
  const kartu = urutanTetap(pasang.length + 1, 2, tambahan).map((i) => (i < pasang.length ? baris[i].jawab : asing));
  return { kepala: ["Soal", "Hasil"], baris, kartu };
}
export const RONDE_TABEL_PE: TabelSelisih[] = [
  tabelSelisih([[33, 28], [42, 36], [22, 12], [98, 21]], 1),
  tabelSelisih([[65, 23], [48, 19], [71, 35], [90, 52]], 2),
  tabelSelisih([[84, 37], [56, 29], [73, 48], [67, 41]], 3),
];
/** PE7 Ketuk Semua Model yang Perlu Mengambil. */
export const RONDE_SEMUA_PE: { syarat: "ambil" | "tanpa"; pasang: Jml[] }[] = [
  { syarat: "ambil", pasang: [[45, 19], [25, 12], [52, 27], [38, 15]] },
  { syarat: "tanpa", pasang: [[67, 34], [71, 28], [48, 23], [93, 47]] },
  { syarat: "ambil", pasang: [[60, 35], [86, 43], [91, 56], [37, 24]] },
];
/** PE8 Pilah Soal Susun Pengurangan. */
export const RONDE_SORTIR_PE: Jml[][] = [[[25, 12], [45, 19], [38, 15], [52, 27], [67, 34], [71, 28]], [[60, 35], [48, 23], [83, 47], [96, 52], [74, 38], [59, 31]], [[72, 29], [86, 43], [91, 56], [37, 24], [64, 48], [58, 26]]];
/** PE9 Cara Panjang Pengurangan. */
export const RONDE_URAI_PE: Jml[] = [[25, 12], [45, 19], [60, 35]];
export function kalimatPanjangKurang(a: number, b: number, nomor: number): KalimatIsian[] {
  const pil = (v: number, i: number) => {
    const semua = [v, v + 10 > 99 ? v - 10 : v + 10, v >= 10 ? v - 10 : v + 5];
    const opsi = urutanTetap(3, 2, nomor + i).map((k) => semua[k]);
    return { opsi: opsi.map(String), benar: opsi.indexOf(v) };
  };
  const ta = puluhanDari(a) * 10;
  const sa = satuanDari(a);
  const sb = satuanDari(b);
  if (perluMengambil(a, b)) {
    return [
      { depan: `${a} = ${ta - 10} +`, belakang: ".", ...pil(sa + 10, 0) },
      { depan: `${sa + 10} − ${sb} =`, belakang: ".", ...pil(sa + 10 - sb, 1) },
      { depan: `${a} − ${b} =`, belakang: ".", ...pil(a - b, 2) },
    ];
  }
  return [
    { depan: `${a} = ${ta} +`, belakang: ".", ...pil(sa, 0) },
    { depan: `${b} =`, belakang: `+ ${sb}.`, ...pil(puluhanDari(b) * 10, 1) },
    { depan: `${a} − ${b} =`, belakang: ".", ...pil(a - b, 2) },
  ];
}
/** PE10 Urutkan Langkah Mengurangkan. */
export const RONDE_LANGKAH_PE: { judul: string; langkah: string[] }[] = [
  { judul: "Susun pendek tanpa mengambil: 25 − 12", langkah: ["Susun bilangan sesuai nilai tempat", "Kurangkan satuan: 5 − 2 = 3", "Kurangkan puluhan: 2 − 1 = 1", "Tulis hasilnya: 13"] },
  { judul: "Susun pendek dengan mengambil: 45 − 19", langkah: ["Susun bilangan sesuai nilai tempat", "5 kurang dari 9, ambil 1 puluhan: 15 − 9 = 6", "Kurangkan puluhan: 3 − 1 = 2", "Tulis hasilnya: 26"] },
  { judul: "Susun panjang: 45 − 19", langkah: ["Uraikan: 45 = 40 + 5 dan 19 = 10 + 9", "Uraikan 40 menjadi 30 + 10", "Kurangkan satuan: 15 − 9 = 6", "Kurangkan puluhan lalu jumlahkan: 20 + 6 = 26"] },
];

/* ------------------------------ Abstract E ------------------------------ */

/** QE1 Susun Bawah Pengurangan Lambang: 57 − 23 tanpa mengambil, 84 − 39 dan 72 − 46 dengan mengambil. */
export const RONDE_SUSUN_QE: Jml[] = [[57, 23], [84, 39], [72, 46]];
/** QE2 Pilih Selisih (Ayo Berlatih 2 dan 3). */
export const RONDE_SELISIH_QE: Jml[][] = [[[33, 28], [42, 36]], [[22, 12], [98, 21]], [[61, 21], [80, 12]]];
/** QE3 Papan Selisih. */
export const RONDE_PAPAN_QE: Jml[][] = [[[64, 17], [95, 48]], [[76, 39], [52, 33]], [[88, 59], [71, 25]]];
/** QE4 Satuan, Puluhan, Selisih. */
export const RONDE_LANGKAH_QE: Jml[] = [[45, 19], [62, 28], [83, 37]];
export function kalimatLangkahKurang(a: number, b: number, nomor: number): KalimatIsian[] {
  const pil = (v: number, i: number) => {
    const semua = [v, v + 1 > 99 ? v - 1 : v + 1, v >= 10 ? v - 10 : v + 10];
    const opsi = urutanTetap(3, 2, nomor + i).map((k) => semua[k]);
    return { opsi: opsi.map(String), benar: opsi.indexOf(v) };
  };
  const ambil = perluMengambil(a, b);
  const ta = puluhanDari(a);
  const tb = puluhanDari(b);
  const sa = satuanDari(a) + (ambil ? 10 : 0);
  const sb = satuanDari(b);
  return [
    { depan: `Satuan: ${sa} − ${sb} =`, belakang: ".", ...pil(sa - sb, 0) },
    { depan: `Puluhan: ${ta - (ambil ? 1 : 0)} − ${tb} =`, belakang: ".", ...pil(ta - (ambil ? 1 : 0) - tb, 1) },
    { depan: `${a} − ${b} =`, belakang: ".", ...pil(a - b, 2) },
  ];
}
/** QE5 Jodohkan Soal dan Sisa. */
export const RONDE_PASANG_QE: Jml[][] = [[[25, 12], [45, 19], [60, 35]], [[38, 15], [52, 27], [71, 44]], [[48, 23], [83, 47], [96, 52]]];
/** QE6 Memori Soal dan Sisa. */
export const RONDE_MEMORI_QE: Jml[][] = [[[37, 12], [48, 19], [56, 24], [63, 18]], [[29, 14], [54, 26], [72, 35], [85, 41]], [[67, 23], [91, 38], [76, 49], [58, 29]]];
/** QE7 Benar atau Salah (Ayo Berlatih 3). */
export const RONDE_BENARSALAH_QE: Pernyataan[][] = [
  [
    { teks: "61 − 21 = 41.", benar: 61 - 21 === 41, penjelasan: "61 − 21 = 40. Satuan 1 − 1 = 0 dan puluhan 6 − 2 = 4." },
    { teks: "80 − 12 = 68.", benar: 80 - 12 === 68, penjelasan: "0 kurang dari 2, ambil 1 puluhan: 10 − 2 = 8. Puluhan 7 − 1 = 6. Hasilnya 68." },
    { teks: "92 − 20 − 12 = 60.", benar: 92 - 20 - 12 === 60, penjelasan: "92 − 20 = 72, lalu 72 − 12 = 60." },
    { teks: "Pada pengurangan bersusun, kita mengurangkan satuan lebih dulu.", benar: true, penjelasan: "Mulai dari satuan, lalu puluhan." },
    { teks: "Bila satuan atas kurang dari satuan bawah, kita menambahkan puluhan.", benar: false, penjelasan: "Kita mengambil satu puluhan dan mengubahnya menjadi sepuluh satuan." },
  ],
  [
    { teks: "45 − 19 = 26.", benar: 45 - 19 === 26, penjelasan: "5 kurang dari 9, ambil 1 puluhan: 15 − 9 = 6. Puluhan 3 − 1 = 2. Hasilnya 26." },
    { teks: "Pada 45 − 19, puluhan tetap 4 setelah mengambil.", benar: false, penjelasan: "Setelah 1 puluhan diambil, puluhan 4 menjadi 3." },
    { teks: "60 − 35 = 25.", benar: 60 - 35 === 25, penjelasan: "0 kurang dari 5, ambil 1 puluhan: 10 − 5 = 5. Puluhan 5 − 3 = 2. Hasilnya 25." },
    { teks: "Susun panjang menguraikan bilangan menjadi puluhan dan satuan.", benar: true, penjelasan: "Misalnya 45 = 40 + 5 dan 19 = 10 + 9." },
    { teks: "42 − 36 = 16.", benar: 42 - 36 === 16, penjelasan: "2 kurang dari 6, ambil 1 puluhan: 12 − 6 = 6. Puluhan 3 − 3 = 0. Hasilnya 6." },
  ],
];
/** QE8 Detektif Pengurangan. */
export const RONDE_DETEKTIF_QE: SoalDetektif[] = [
  { klue: ["Aku adalah hasil 45 − 19.", "Aku kurang dari 30."], jawab: 26, opsi: [26, 36, 16], salah: "5 kurang dari 9, ambil 1 puluhan: 15 − 9 = 6. Puluhan 3 − 1 = 2. Hasilnya 26." },
  { klue: ["Aku adalah hasil 60 − 35.", "Satuanku 5."], jawab: 25, opsi: [15, 25, 35], salah: "0 kurang dari 5, ambil 1 puluhan: 10 − 5 = 5. Puluhan 5 − 3 = 2." },
  { klue: ["Bila ditambah 12, aku menjadi 25.", "Aku punya satu puluhan."], jawab: 13, opsi: [13, 23, 37], salah: "25 dikurangi 12 sama dengan 13." },
  { klue: ["Aku adalah hasil 80 − 12.", "Puluhanku 6."], jawab: 68, opsi: [68, 78, 58], salah: "10 − 2 = 8, puluhan 7 − 1 = 6. Hasilnya 68." },
];
/** QE9 Peta Konsep Pengurangan. */
export const PETA_KONSEP_QE: { pusat: string; kotak: KotakPeta[] }[] = [
  {
    pusat: "Pengurangan bersusun",
    kotak: [
      { label: "Bilangan disusun lurus menurut", opsi: ["nilai tempat", "besar kecil", "urutan huruf"], benar: 0 },
      { label: "Kita mengurangkan lebih dulu pada tempat", opsi: ["satuan", "puluhan", "ratusan"], benar: 0 },
      { label: "Bila 5 kurang dari 9, kita mengambil", opsi: ["1 puluhan", "1 satuan", "10 puluhan"], benar: 0 },
      { label: "Menurutku, 45 − 19 hasilnya", opsi: ["26", "34", "36"], benar: 0 },
    ],
  },
  {
    pusat: "Susun panjang pengurangan",
    kotak: [
      { label: "Pertama, bilangan", opsi: ["diuraikan menjadi puluhan dan satuan", "dijumlahkan", "dikalikan"], benar: 0 },
      { label: "Bila satuan tidak cukup, 40 diurai menjadi", opsi: ["30 + 10", "20 + 20", "35 + 5"], benar: 0 },
      { label: "10 + 5 sama dengan", opsi: ["15", "105", "50"], benar: 0 },
      { label: "Menurutku, 15 − 9 sama dengan", opsi: ["6", "24", "5"], benar: 0 },
    ],
  },
];
/** QE10 Soal Cerita Pengurangan (Ayo Berlatih 4). */
export type CeritaKurang = { teks: string; a: number; b: number };
export const RONDE_CERITA_QE: CeritaKurang[][] = [
  [
    { teks: "Bia memiliki 19 stiker mobil. Aldo memiliki 8 stiker robot. Berapa selisih stiker milik Bia dan Aldo?", a: 19, b: 8 },
    { teks: "Pak Doni punya 23 ikan gurami dan 42 ikan nila. Berapa selisih jumlah ikan gurami dan ikan nila?", a: 42, b: 23 },
  ],
  [
    { teks: "Di toko ada 45 buku tulis. Siswa membeli 19 buku tulis. Berapa sisa buku tulis?", a: 45, b: 19 },
    { teks: "Galih punya 25 permen. Alfa mengambil 12 permen. Berapa sisa permen Galih?", a: 25, b: 12 },
  ],
  [
    { teks: "Ayah membawa 90 jeruk ke pasar dan terjual 54 jeruk. Berapa jeruk yang belum terjual?", a: 90, b: 54 },
    { teks: "Kelas 3 punya 62 buku. Sebanyak 28 buku dipinjam. Berapa buku yang tersisa?", a: 62, b: 28 },
  ],
];

/* ====================================================================== */
/* SUB-BAB F. Perkalian bilangan cacah sampai 100                           */
/* ====================================================================== */

/** [banyak kelompok, isi tiap kelompok]. 4 kelompok berisi 5 ditulis [4, 5] atau 4 × 5. */
export type Kali = [number, number];
export const hasilKali = (p: Kali): number => p[0] * p[1];
export const teksTambah = (p: Kali): string => Array.from({ length: p[0] }, () => p[1]).join(" + ");
export const teksKali = (p: Kali): string => `${p[0]} × ${p[1]}`;
/** Tiga pilihan hasil: kunci, satu kelompok lebih, dan satu kelompok kurang. */
export function opsiKali(p: Kali, nomor: number): number[] {
  const [k, n] = p;
  const semua = [k * n, (k + 1) * n, k > 1 ? (k - 1) * n : k * n + n * 2];
  return urutanTetap(3, 2, nomor).map((i) => semua[i]);
}
/** Tiga kalimat penjumlahan berulang: kunci k kali, serta k + 1 dan k − 1 kali. */
export function opsiTambah(p: Kali, nomor: number): { opsi: string[]; jawab: number } {
  const [k, n] = p;
  return susunOpsi(teksTambah(p), [teksTambah([k + 1, n]), teksTambah([Math.max(1, k - 1), n])], nomor);
}
export type SoalKali = { benda: BendaId; p: Kali };

/* ------------------------------ Concrete F ------------------------------ */

/** CF1 Rakit Kelompok: tambah kelompok sampai jumlahnya sama dengan yang diminta. */
export const RONDE_RAKIT_CF: SoalKali[][] = [
  [{ benda: "kue", p: [3, 4] }, { benda: "kelereng", p: [4, 5] }],
  [{ benda: "jeruk", p: [5, 2] }, { benda: "pensil", p: [2, 7] }],
  [{ benda: "anggur", p: [4, 7] }, { benda: "ikan", p: [6, 5] }],
];
/** CF2 Hitung Kelompok (pensil 5 × 2, bunga melati 4 × 5, mobil mainan 6 × 5). */
export const RONDE_HITUNG_CF: SoalKali[][] = [
  [{ benda: "pensil", p: [5, 2] }, { benda: "kue", p: [4, 5] }],
  [{ benda: "kelereng", p: [6, 5] }, { benda: "jeruk", p: [3, 7] }],
  [{ benda: "anggur", p: [4, 6] }, { benda: "ikan", p: [5, 8] }],
];
/** CF3 Tulis Penjumlahan Berulang. */
export const RONDE_TAMBAH_CF: SoalKali[][] = [
  [{ benda: "pensil", p: [5, 2] }, { benda: "kue", p: [3, 6] }],
  [{ benda: "kelereng", p: [4, 7] }, { benda: "jeruk", p: [6, 3] }],
  [{ benda: "anggur", p: [5, 5] }, { benda: "ikan", p: [3, 9] }],
];
/** CF4 Jodohkan Kelompok dan Perkalian. */
export const RONDE_PASANG_CF: { benda: BendaId; kali: Kali[] }[] = [
  { benda: "kue", kali: [[3, 4], [5, 2], [4, 5]] },
  { benda: "kelereng", kali: [[2, 7], [6, 3], [5, 4]] },
  { benda: "jeruk", kali: [[3, 6], [4, 6], [5, 6]] },
];
/** CF5 Memori Kelompok dan Hasil. */
export const RONDE_MEMORI_CF: { benda: BendaId; kali: Kali[] }[] = [
  { benda: "kue", kali: [[3, 4], [5, 2], [4, 5], [6, 3]] },
  { benda: "pensil", kali: [[2, 7], [3, 6], [4, 6], [5, 6]] },
  { benda: "anggur", kali: [[2, 5], [3, 7], [4, 8], [5, 7]] },
];
/** CF6 Ketuk Kelompok dengan Jumlah Tertentu. */
export const RONDE_KETUK_CF: { benda: BendaId; item: Kali[]; tanya: number[] }[] = [
  { benda: "kue", item: [[3, 4], [5, 2], [4, 5]], tanya: [20, 12] },
  { benda: "kelereng", item: [[6, 3], [2, 7], [5, 4]], tanya: [14, 20] },
  { benda: "jeruk", item: [[3, 6], [4, 6], [5, 6]], tanya: [24, 30] },
];
/** CF7 Ketuk Semua Kelompok yang Jumlahnya Lebih atau Kurang. */
export const RONDE_SEMUA_CF: { benda: BendaId; acuan: number; arah: "lebih" | "kurang"; kali: Kali[] }[] = [
  { benda: "kue", acuan: 20, arah: "lebih", kali: [[3, 4], [5, 5], [4, 6], [2, 9]] },
  { benda: "kelereng", acuan: 30, arah: "kurang", kali: [[6, 4], [5, 7], [3, 9], [8, 5]] },
  { benda: "jeruk", acuan: 15, arah: "lebih", kali: [[2, 7], [3, 6], [4, 4], [5, 2]] },
];
export const cocokKali = (p: Kali, acuan: number, arah: "lebih" | "kurang"): boolean => (arah === "lebih" ? hasilKali(p) > acuan : hasilKali(p) < acuan);
/** CF8 Tukar Tempat: dua susunan kelompok, mana yang lebih banyak. */
export const RONDE_TUKAR_CF: { benda: BendaId; pasang: [Kali, Kali][] }[] = [
  { benda: "kue", pasang: [[[5, 6], [6, 5]], [[3, 8], [4, 8]]] },
  { benda: "kelereng", pasang: [[[4, 7], [7, 4]], [[6, 5], [5, 5]]] },
  { benda: "jeruk", pasang: [[[3, 9], [9, 3]], [[2, 9], [4, 6]]] },
];
/** CF9 Papan Hasil Kelompok. */
export const RONDE_PAPAN_CF: SoalKali[][] = [
  [{ benda: "kue", p: [6, 5] }, { benda: "jeruk", p: [3, 8] }],
  [{ benda: "kelereng", p: [7, 4] }, { benda: "pensil", p: [9, 3] }],
  [{ benda: "anggur", p: [6, 8] }, { benda: "ikan", p: [5, 9] }],
];
/** CF10 Urutkan Kelompok menurut Jumlahnya. */
export const RONDE_URUT_CF: { benda: BendaId; item: Kali[]; dari: "kecil" | "besar" }[] = [
  { benda: "kue", item: [[3, 4], [5, 2], [4, 5]], dari: "kecil" },
  { benda: "kelereng", item: [[6, 3], [2, 7], [5, 4]], dari: "besar" },
  { benda: "jeruk", item: [[3, 6], [4, 6], [5, 5]], dari: "kecil" },
];

/* ------------------------------ Picture F ------------------------------ */

/** PF1 Hitung Titik Berkelompok. */
export const RONDE_HITUNG_PF: Kali[][] = [[[5, 2], [4, 5]], [[6, 5], [3, 7]], [[4, 6], [5, 8]]];
/** PF2 Lengkapi Kalimat Perkalian: penjumlahan berulang, perkalian, dan tukar tempat. */
export const RONDE_KALIMAT_PF: Kali[] = [[4, 5], [6, 5], [3, 8]];
export function kalimatKali(p: Kali, nomor: number): KalimatIsian[] {
  const [k, n] = p;
  const t = k * n;
  const pil = (v: number, i: number) => {
    const semua = [v, v + n, v - n > 0 ? v - n : v + 2 * n];
    const opsi = urutanTetap(3, 2, nomor + i).map((x) => semua[x]);
    return { opsi: opsi.map(String), benar: opsi.indexOf(v) };
  };
  return [
    { depan: `${teksTambah(p)} =`, belakang: ".", ...pil(t, 0) },
    { depan: `${k} × ${n} =`, belakang: ".", ...pil(t, 1) },
    { depan: `${n} × ${k} =`, belakang: ".", ...pil(t, 2) },
  ];
}
/** PF3 Jodohkan Titik dan Perkalian. */
export const RONDE_PASANG_PF: Kali[][] = [[[4, 3], [2, 8], [5, 4]], [[6, 2], [3, 5], [7, 3]], [[4, 7], [5, 6], [3, 9]]];
/** PF4 Memori Titik dan Hasil. */
export const RONDE_MEMORI_PF: Kali[][] = [[[2, 6], [3, 5], [4, 4], [5, 4]], [[2, 7], [3, 6], [4, 5], [5, 5]], [[3, 7], [4, 6], [5, 6], [6, 6]]];
/** PF5 Loncatan pada Garis Bilangan: k loncatan sebesar n dari 0, garis enam titik. */
export type SoalLoncat = { n: number; k: number };
export const RONDE_GARIS_PF: SoalLoncat[][] = [[{ n: 5, k: 4 }, { n: 2, k: 3 }], [{ n: 3, k: 5 }, { n: 4, k: 3 }], [{ n: 10, k: 4 }, { n: 5, k: 5 }]];
/** PF6 Isi Tabel Perkalian (Ayo Berlatih 3). */
export type TabelKali = { kepala: [string, string]; baris: { label: string; jawab: string }[]; kartu: string[] };
function tabelKali(daftar: Kali[], tambahan: number): TabelKali {
  const baris = daftar.map((p) => ({ label: teksKali(p), jawab: String(hasilKali(p)) }));
  const asing = String(hasilKali(daftar[0]) + daftar[0][1]);
  const kartu = urutanTetap(daftar.length + 1, 2, tambahan).map((i) => (i < daftar.length ? baris[i].jawab : asing));
  return { kepala: ["Soal", "Hasil"], baris, kartu };
}
export const RONDE_TABEL_PF: TabelKali[] = [
  tabelKali([[3, 4], [5, 7], [7, 8], [9, 7]], 1),
  tabelKali([[2, 6], [4, 9], [6, 7], [8, 5]], 2),
  tabelKali([[5, 5], [3, 9], [6, 8], [4, 7]], 3),
];
/** PF7 Ketuk Semua Titik yang Jumlahnya Lebih atau Kurang. */
export const RONDE_SEMUA_PF: { acuan: number; arah: "lebih" | "kurang"; kali: Kali[] }[] = [
  { acuan: 20, arah: "lebih", kali: [[2, 9], [3, 7], [5, 5], [4, 4]] },
  { acuan: 30, arah: "kurang", kali: [[5, 7], [4, 6], [3, 9], [8, 5]] },
  { acuan: 40, arah: "lebih", kali: [[6, 7], [5, 7], [9, 5], [3, 9]] },
];
/** PF8 Pilah Kelompok: jumlah kurang dari 20 atau 20 atau lebih. */
export const RONDE_SORTIR_PF: Kali[][] = [[[3, 4], [5, 5], [2, 7], [6, 4], [3, 3], [7, 3]], [[4, 4], [3, 8], [2, 9], [5, 6], [3, 5], [4, 6]], [[2, 8], [6, 5], [3, 6], [7, 4], [2, 6], [5, 5]]];
export const duaPuluhAtauLebih = (p: Kali): boolean => hasilKali(p) >= 20;
/** PF9 Tukar Faktor: k × n = n × ?. */
export const RONDE_TUKARFAKTOR_PF: Kali[][] = [[[4, 6], [3, 8]], [[5, 7], [2, 9]], [[6, 8], [7, 3]]];
export function opsiFaktor(p: Kali, nomor: number): number[] {
  const semua = [p[0], p[1], p[0] + p[1]];
  return urutanTetap(3, 2, nomor).map((i) => semua[i]);
}
/** PF10 Rakit Gambar Kelompok. */
export const RONDE_RAKIT_PF: Kali[][] = [[[3, 4], [4, 5]], [[5, 3], [2, 8]], [[6, 4], [4, 6]]];

/* ------------------------------ Abstract F ------------------------------ */

/** QF1 Dari Penjumlahan ke Perkalian. */
export const RONDE_TULIS_QF: Kali[][] = [[[7, 5], [8, 9]], [[9, 7], [9, 8]], [[6, 4], [5, 9]]];
/** QF2 Hitung Hasil Kali (Ayo Berlatih 3). */
export const RONDE_HITUNG_QF: Kali[][] = [[[3, 4], [5, 7]], [[7, 8], [9, 7]], [[6, 6], [4, 9]]];
/** QF3 Papan Hasil Kali. */
export const RONDE_PAPAN_QF: Kali[][] = [[[6, 7], [8, 5]], [[9, 6], [7, 7]], [[8, 8], [5, 9]]];
/** QF4 Jodohkan Penjumlahan Berulang dan Perkalian. */
export const RONDE_PASANG_QF: Kali[][] = [[[7, 5], [8, 9], [6, 8]], [[3, 6], [4, 7], [5, 8]], [[6, 4], [7, 6], [8, 3]]];
/** QF5 Memori Perkalian dan Hasil. */
export const RONDE_MEMORI_QF: Kali[][] = [[[3, 4], [5, 7], [7, 8], [9, 7]], [[2, 9], [4, 6], [6, 8], [8, 5]], [[3, 7], [5, 6], [7, 4], [9, 6]]];
/** QF6 Benar atau Salah. */
export const RONDE_BENARSALAH_QF: Pernyataan[][] = [
  [
    { teks: "Perkalian adalah penjumlahan berulang.", benar: true, penjelasan: "5 × 2 sama dengan 2 + 2 + 2 + 2 + 2." },
    { teks: `4 × 5 sama dengan ${teksTambah([4, 5])}.`, benar: true, penjelasan: "Empat kelompok berisi lima, jumlahnya 20." },
    { teks: `5 × 6 tidak sama dengan 6 × 5.`, benar: 5 * 6 !== 6 * 5, penjelasan: "5 × 6 = 6 × 5 = 30. Tempat bilangan boleh ditukar." },
    { teks: `3 × 4 = ${3 * 4 + 4}.`, benar: false, penjelasan: "3 × 4 = 4 + 4 + 4 = 12, bukan 16." },
    { teks: "Pada 4 × 7, bilangan 4 menunjukkan banyak kelompok.", benar: true, penjelasan: "Empat kelompok, tiap kelompok berisi 7." },
  ],
  [
    { teks: `7 × 8 = ${7 * 8}.`, benar: true, penjelasan: "Tujuh kelompok berisi delapan: 8 + 8 + 8 + 8 + 8 + 8 + 8 = 56." },
    { teks: `9 × 7 = ${9 * 7 - 9}.`, benar: false, penjelasan: "9 × 7 = 63. Sembilan kelompok berisi tujuh." },
    { teks: `5 × 7 = ${5 * 7}.`, benar: true, penjelasan: "Lima kelompok berisi tujuh, jumlahnya 35." },
    { teks: "6 × 2 dan 2 × 6 hasilnya berbeda.", benar: false, penjelasan: "Keduanya 12. Tempat bilangan boleh ditukar." },
    { teks: "Perkalian dua bilangan selalu lebih kecil dari bilangan pertama.", benar: false, penjelasan: "Bila bilangan kedua lebih dari 1, hasil kali lebih besar. 4 × 5 = 20." },
  ],
];
/** QF7 Detektif Perkalian. */
export const RONDE_DETEKTIF_QF: SoalDetektif[] = [
  { klue: ["Aku adalah hasil 7 × 8.", "Aku lebih dari 50."], jawab: 56, opsi: [56, 48, 63], salah: "7 × 8 = 56. Tujuh kelompok berisi delapan." },
  { klue: ["Aku adalah hasil 9 × 7.", "Puluhanku 6."], jawab: 63, opsi: [56, 63, 72], salah: "9 × 7 = 63. Sembilan kelompok berisi tujuh." },
  { klue: ["Aku hasil perkalian dua bilangan yang sama.", "Aku lebih dari 30 dan kurang dari 40."], jawab: 36, opsi: [25, 36, 49], salah: "6 × 6 = 36 ada di antara 30 dan 40." },
  { klue: ["Aku adalah hasil 4 × 5.", "Aku juga sama dengan 5 × 4."], jawab: 20, opsi: [9, 20, 25], salah: "4 × 5 = 20, sama dengan 5 × 4." },
];
/** QF8 Peta Konsep Perkalian. */
export const PETA_KONSEP_QF: { pusat: string; kotak: KotakPeta[] }[] = [
  {
    pusat: "Perkalian",
    kotak: [
      { label: "Perkalian adalah", opsi: ["penjumlahan berulang", "pengurangan berulang", "membagi sama banyak"], benar: 0 },
      { label: "Pada 4 × 5, bilangan 4 adalah banyak", opsi: ["kelompok", "isi tiap kelompok", "hasil"], benar: 0 },
      { label: "4 × 5 sama dengan", opsi: ["5 + 5 + 5 + 5", "4 + 4 + 4 + 4 + 4 + 4", "4 + 5"], benar: 0 },
      { label: "Menurutku, 5 × 6 sama dengan", opsi: ["6 × 5", "5 + 6", "6 + 6 + 6"], benar: 0 },
    ],
  },
  {
    pusat: "Tukar tempat",
    kotak: [
      { label: "5 × 6 hasilnya", opsi: ["30", "11", "56"], benar: 0 },
      { label: "6 × 5 hasilnya", opsi: ["30", "11", "65"], benar: 0 },
      { label: "Jadi, 5 × 6 dan 6 × 5", opsi: ["sama besar", "berbeda", "tidak bisa dibandingkan"], benar: 0 },
      { label: "Menurutku, perkalian boleh", opsi: ["ditukar tempat bilangannya", "diganti tanda tambah", "dihapus salah satu bilangan"], benar: 0 },
    ],
  },
];
/** QF9 Soal Cerita Perkalian. */
export type CeritaKali = { teks: string; p: Kali };
export const RONDE_CERITA_QF: CeritaKali[][] = [
  [
    { teks: "SD Pelangi memiliki 6 kelas dan di setiap kelas terdapat 2 papan tulis. Berapa banyak papan tulis di SD Pelangi?", p: [6, 2] },
    { teks: "Guru membentuk kelompok beranggotakan 5 siswa. Terbentuk 6 kelompok. Berapa jumlah siswa seluruhnya?", p: [6, 5] },
  ],
  [
    { teks: "Ada 4 kelompok bunga melati, tiap kelompok berisi 5 bunga. Berapa bunga melati seluruhnya?", p: [4, 5] },
    { teks: "Ada 5 gelas dan tiap gelas berisi 4 batu kerikil. Berapa batu kerikil seluruhnya?", p: [5, 4] },
  ],
  [
    { teks: "Ada 4 gelas dan tiap gelas berisi 7 batu kerikil. Berapa batu kerikil seluruhnya?", p: [4, 7] },
    { teks: "Ada 6 kelompok mobil mainan, tiap kelompok berisi 5 mobil. Berapa mobil mainan seluruhnya?", p: [6, 5] },
  ],
];
/** QF10 Susun Kata Perkalian. */
export const RONDE_SUSUNKATA_QF: { kata: string[]; pengecoh: string }[] = [
  { kata: ["Perkalian", "adalah", "penjumlahan", "berulang"], pengecoh: "pengurangan" },
  { kata: ["4", "kelompok", "berisi", "5", "ditulis", "4", "×", "5"], pengecoh: "+" },
  { kata: ["5", "×", "6", "sama", "dengan", "6", "×", "5"], pengecoh: "kurang" },
  { kata: ["Banyak", "kelompok", "dikali", "isi", "tiap", "kelompok"], pengecoh: "dibagi" },
];

/* ====================================================================== */
/* SUB-BAB G. Pembagian bilangan cacah sampai 100                           */
/* ====================================================================== */

/** [yang dibagi, pembagi]. 15 dibagi 3 ditulis [15, 3]. Hasil bagi selalu bilangan cacah tanpa sisa. */
export type Bagi = [number, number];
export const hasilBagi = (p: Bagi): number => p[0] / p[1];
export const teksBagi = (p: Bagi): string => `${p[0]} : ${p[1]}`;
/** Pengurangan berulang: "15 − 3 − 3 − 3 − 3 − 3". */
export const teksKurangBerulang = (p: Bagi, banyak: number = hasilBagi(p)): string => [String(p[0]), ...Array.from({ length: banyak }, () => String(p[1]))].join(" − ");
/** Perkalian pemeriksa: "5 × 3 = 15". */
export const teksPeriksaBagi = (p: Bagi): string => `${hasilBagi(p)} × ${p[1]} = ${p[0]}`;
/** Pilihan hasil bagi: kunci, satu lebih, satu kurang. */
export function opsiBagi(p: Bagi, nomor: number): number[] {
  const q = hasilBagi(p);
  const semua = [q, q + 1, q > 1 ? q - 1 : q + 2];
  return urutanTetap(3, 2, nomor).map((i) => semua[i]);
}
/** Tiga kalimat pengurangan berulang sampai nol: kunci, satu kali lebih banyak, satu kali lebih sedikit. */
export function opsiKurang(p: Bagi, nomor: number): { opsi: string[]; jawab: number } {
  const q = hasilBagi(p);
  const tulis = (banyak: number) => `${teksKurangBerulang(p, banyak)} = 0`;
  return susunOpsi(tulis(q), [tulis(q + 1), tulis(q > 1 ? q - 1 : q + 2)], nomor);
}
export const cocokBagi = (p: Bagi, acuan: number, arah: "lebih" | "kurang"): boolean => (arah === "lebih" ? hasilBagi(p) > acuan : hasilBagi(p) < acuan);
export type SoalBagi = { benda: BendaId; p: Bagi };
export const kunciBagi = (s: SoalBagi): string => `${s.benda}-${s.p[0]}-${s.p[1]}`;

/* ------------------------------ Concrete G ------------------------------ */

/** CG1 Bagikan Bergiliran: ketua membagikan satu benda ke tiap piring sampai wadah kosong (Aktivitas 5). */
export const RONDE_BAGI_CG: SoalBagi[][] = [
  [{ benda: "kue", p: [12, 2] }, { benda: "kelereng", p: [15, 3] }],
  [{ benda: "jeruk", p: [20, 4] }, { benda: "pensil", p: [18, 3] }],
  [{ benda: "anggur", p: [24, 4] }, { benda: "ikan", p: [30, 5] }],
];
/** CG2 Hitung Bagian: tumpukan dibagi sama banyak ke beberapa piring. */
export const RONDE_HITUNG_CG: SoalBagi[][] = [
  [{ benda: "kue", p: [12, 2] }, { benda: "jeruk", p: [18, 3] }],
  [{ benda: "kelereng", p: [20, 4] }, { benda: "anggur", p: [24, 6] }],
  [{ benda: "ikan", p: [30, 5] }, { benda: "pensil", p: [36, 6] }],
];
/** CG3 Tulis Pengurangan Berulang. */
export const RONDE_TULIS_CG: SoalBagi[][] = [
  [{ benda: "kue", p: [8, 2] }, { benda: "jeruk", p: [12, 3] }],
  [{ benda: "kelereng", p: [15, 3] }, { benda: "anggur", p: [16, 4] }],
  [{ benda: "ikan", p: [20, 5] }, { benda: "pensil", p: [18, 6] }],
];
/** CG4 Jodohkan Gambar dan Pembagian. */
export const RONDE_PASANG_CG: { benda: BendaId; bagi: Bagi[] }[] = [
  { benda: "kue", bagi: [[12, 2], [15, 3], [16, 4]] },
  { benda: "kelereng", bagi: [[18, 3], [20, 5], [14, 2]] },
  { benda: "jeruk", bagi: [[21, 3], [24, 6], [32, 4]] },
];
/** CG5 Memori Gambar dan Hasil Bagi. */
export const RONDE_MEMORI_CG: { benda: BendaId; bagi: Bagi[] }[] = [
  { benda: "kue", bagi: [[12, 2], [15, 3], [16, 4], [18, 6]] },
  { benda: "pensil", bagi: [[14, 2], [20, 4], [24, 3], [27, 9]] },
  { benda: "anggur", bagi: [[10, 5], [18, 2], [28, 4], [30, 5]] },
];
/** CG6 Ketuk Gambar dengan Hasil Bagi Tertentu. */
export const RONDE_KETUK_CG: { benda: BendaId; item: Bagi[]; tanya: number[] }[] = [
  { benda: "kue", item: [[12, 2], [15, 3], [16, 4]], tanya: [5, 6] },
  { benda: "kelereng", item: [[18, 3], [20, 5], [14, 2]], tanya: [7, 4] },
  { benda: "jeruk", item: [[21, 3], [24, 6], [32, 4]], tanya: [8, 4] },
];
/** CG7 Ketuk Semua Gambar dengan Hasil Bagi Lebih atau Kurang. */
export const RONDE_SEMUA_CG: { benda: BendaId; acuan: number; arah: "lebih" | "kurang"; bagi: Bagi[] }[] = [
  { benda: "kue", acuan: 4, arah: "lebih", bagi: [[12, 2], [8, 4], [18, 3], [9, 3]] },
  { benda: "kelereng", acuan: 5, arah: "kurang", bagi: [[24, 4], [12, 4], [18, 6], [35, 5]] },
  { benda: "jeruk", acuan: 6, arah: "lebih", bagi: [[21, 3], [10, 2], [32, 4], [12, 3]] },
];
/** CG8 Cerita Pembagian. */
export const RONDE_CERITA_CG: SoalBagi[][] = [
  [{ benda: "jeruk", p: [12, 2] }, { benda: "kelereng", p: [15, 3] }],
  [{ benda: "kue", p: [24, 3] }, { benda: "anggur", p: [36, 6] }],
  [{ benda: "pensil", p: [48, 8] }, { benda: "lidi", p: [35, 5] }],
];
export const TEKS_CERITA_CG: Record<string, string> = {
  "jeruk-12-2": "Ibu punya 12 jeruk. Jeruk dibagikan sama banyak kepada 2 anak. Berapa jeruk yang diterima tiap anak?",
  "kelereng-15-3": "Ketua kelompok punya 15 kelereng. Kelereng dibagikan sama banyak kepada 3 anggota. Berapa kelereng yang diterima tiap anggota?",
  "kue-24-3": "Ayah membuat 24 kue cubit. Kue cubit dimasukkan ke dalam 3 kotak sama banyak. Berapa kue cubit di tiap kotak?",
  "anggur-36-6": "Kakak membeli 36 buah anggur. Anggur dibagikan kepada 6 teman sama banyak hingga habis. Berapa anggur yang diterima tiap teman?",
  "pensil-48-8": "Ibu guru membawa 48 pensil. Pensil diletakkan di atas 8 meja dengan sama banyak. Berapa pensil di tiap meja?",
  "lidi-35-5": "Pak Doni punya 35 lidi. Lidi diikat menjadi 5 ikat sama banyak. Berapa lidi di tiap ikat?",
};
/** CG9 Papan Hasil Bagi. */
export const RONDE_PAPAN_CG: SoalBagi[][] = [
  [{ benda: "kue", p: [20, 2] }, { benda: "jeruk", p: [18, 3] }],
  [{ benda: "kelereng", p: [28, 4] }, { benda: "pensil", p: [30, 3] }],
  [{ benda: "anggur", p: [35, 5] }, { benda: "ikan", p: [40, 4] }],
];
/** CG10 Urutkan Gambar menurut Hasil Bagi. */
export const RONDE_URUT_CG: { benda: BendaId; item: Bagi[]; dari: "kecil" | "besar" }[] = [
  { benda: "kue", item: [[12, 2], [15, 3], [16, 4]], dari: "kecil" },
  { benda: "jeruk", item: [[18, 3], [20, 5], [14, 2]], dari: "besar" },
  { benda: "kelereng", item: [[21, 3], [24, 6], [32, 4]], dari: "kecil" },
];

/* ------------------------------ Picture G ------------------------------ */

/** PG1 Bagi Titik: sebuah kotak berisi banyak titik dibagi sama banyak ke beberapa kotak. */
export const RONDE_BAGI_PG: Bagi[][] = [[[12, 2], [15, 3]], [[20, 4], [18, 3]], [[24, 4], [30, 5]]];
/** PG2 Lengkapi Kalimat Pembagian: pengurangan berulang, pembagian, dan perkalian pemeriksa. */
export const RONDE_KALIMAT_PG: Bagi[] = [[15, 3], [20, 4], [24, 6]];
export function kalimatBagi(p: Bagi, nomor: number): KalimatIsian[] {
  const [t, g] = p;
  const q = hasilBagi(p);
  const pil = (v: number, i: number) => {
    const semua = [v, v + 1, v > 1 ? v - 1 : v + 2];
    const opsi = urutanTetap(3, 2, nomor + i).map((x) => semua[x]);
    return { opsi: opsi.map(String), benar: opsi.indexOf(v) };
  };
  return [
    { depan: `Bilangan ${g} dikurangkan dari ${t} sebanyak`, belakang: "kali sampai habis.", ...pil(q, 0) },
    { depan: `${t} : ${g} =`, belakang: ".", ...pil(q, 1) },
    { depan: "", belakang: `× ${g} = ${t}.`, ...pil(q, 2) },
  ];
}
/** PG3 Jodohkan Titik dan Pembagian. */
export const RONDE_PASANG_PG: Bagi[][] = [[[10, 2], [18, 3], [28, 4]], [[16, 2], [15, 5], [24, 4]], [[27, 3], [20, 5], [12, 6]]];
/** PG4 Memori Titik dan Hasil Bagi. */
export const RONDE_MEMORI_PG: Bagi[][] = [[[14, 2], [12, 3], [20, 4], [18, 6]], [[16, 2], [21, 3], [24, 4], [25, 5]], [[10, 2], [12, 4], [18, 3], [28, 4]]];
/** PG5 Loncat Mundur pada Garis Bilangan: mulai dari t, mundur k kali sebesar d. Garis enam titik (t = 5d). */
export type SoalMundur = { t: number; d: number; k: number };
export const RONDE_GARIS_PG: SoalMundur[][] = [[{ t: 15, d: 3, k: 2 }, { t: 20, d: 4, k: 3 }], [{ t: 10, d: 2, k: 4 }, { t: 25, d: 5, k: 2 }], [{ t: 30, d: 6, k: 3 }, { t: 40, d: 8, k: 4 }]];
/** PG6 Isi Tabel Pembagian (Ayo Berlatih 2). */
export type TabelBagi = { kepala: [string, string]; baris: { label: string; jawab: string }[]; kartu: string[] };
function tabelBagi(daftar: Bagi[], tambahan: number): TabelBagi {
  const baris = daftar.map((p) => ({ label: teksBagi(p), jawab: String(hasilBagi(p)) }));
  const pakai = new Set(baris.map((b) => Number(b.jawab)));
  let asing = hasilBagi(daftar[0]) + 2;
  while (pakai.has(asing)) asing += 1;
  const kartu = urutanTetap(daftar.length + 1, 2, tambahan).map((i) => (i < daftar.length ? baris[i].jawab : String(asing)));
  return { kepala: ["Soal", "Hasil"], baris, kartu };
}
export const RONDE_TABEL_PG: TabelBagi[] = [
  tabelBagi([[21, 3], [24, 4], [48, 6], [45, 9]], 1),
  tabelBagi([[10, 1], [6, 1], [35, 5], [64, 8]], 2),
  tabelBagi([[16, 4], [5, 5], [18, 3], [27, 3]], 3),
];
/** PG7 Ketuk Semua Titik dengan Hasil Bagi Lebih atau Kurang. */
export const RONDE_SEMUA_PG: { acuan: number; arah: "lebih" | "kurang"; bagi: Bagi[] }[] = [
  { acuan: 4, arah: "lebih", bagi: [[10, 2], [6, 3], [24, 4], [8, 4]] },
  { acuan: 5, arah: "kurang", bagi: [[16, 2], [12, 4], [18, 6], [28, 4]] },
  { acuan: 6, arah: "lebih", bagi: [[28, 4], [10, 5], [40, 5], [9, 3]] },
];
/** PG8 Pilah Gambar: hasil bagi kurang dari 5 atau 5 atau lebih. */
export const RONDE_SORTIR_PG: Bagi[][] = [
  [[12, 3], [30, 5], [8, 2], [40, 5], [9, 3], [35, 5]],
  [[16, 4], [27, 3], [10, 5], [32, 4], [6, 2], [28, 4]],
  [[10, 2], [12, 6], [18, 3], [15, 5], [24, 4], [8, 4]],
];
export const limaAtauLebih = (p: Bagi): boolean => hasilBagi(p) >= 5;
/** PG9 Periksa dengan Perkalian: t : g = q, maka q × g = ... */
export const RONDE_PERIKSA_PG: Bagi[][] = [[[15, 3], [20, 4]], [[24, 6], [18, 2]], [[30, 5], [27, 3]]];
export function opsiPeriksa(p: Bagi, nomor: number): number[] {
  const [t, g] = p;
  const semua = [t, t + g, t - g];
  return urutanTetap(3, 2, nomor).map((i) => semua[i]);
}
/** PG10 Rakit Kotak: [total, isi tiap kotak]. Banyak kotak = total dibagi isi. */
export const RONDE_RAKIT_PG: Bagi[][] = [[[12, 3], [20, 5]], [[18, 2], [24, 4]], [[30, 6], [16, 4]]];

/* ------------------------------ Abstract G ------------------------------ */

/** QG1 Tulis Pengurangan Berulang (Ayo Berlatih 1). */
export const RONDE_KURANG_QG: Bagi[][] = [[[4, 1], [10, 10]], [[16, 4], [35, 5]], [[9, 1], [12, 2]]];
/** QG2 Hitung Hasil Bagi (Ayo Berlatih 2). */
export const RONDE_HITUNG_QG: Bagi[][] = [[[6, 1], [10, 1]], [[21, 3], [24, 4]], [[5, 5], [48, 6]]];
/** QG3 Papan Hasil Bagi. */
export const RONDE_PAPAN_QG: Bagi[][] = [[[64, 8], [45, 9]], [[72, 9], [56, 7]], [[90, 10], [60, 6]]];
/** QG4 Jodohkan Pembagian dan Perkalian. */
export const RONDE_PASANG_QG: Bagi[][] = [[[21, 3], [24, 4], [48, 6]], [[35, 5], [64, 8], [45, 9]], [[16, 4], [27, 3], [56, 7]]];
/** QG5 Memori Pembagian dan Hasil. */
export const RONDE_MEMORI_QG: Bagi[][] = [[[21, 3], [24, 4], [48, 6], [45, 9]], [[12, 3], [35, 7], [54, 6], [63, 9]], [[81, 9], [56, 8], [36, 6], [25, 5]]];
/** QG6 Benar atau Salah. */
export const RONDE_BENARSALAH_QG: Pernyataan[][] = [
  [
    { teks: "15 : 3 = 5.", benar: true, penjelasan: "15 − 3 − 3 − 3 − 3 − 3 = 0. Bilangan 3 dikurangkan 5 kali, jadi 15 : 3 = 5." },
    { teks: "Pembagian adalah pengurangan berulang sampai habis.", benar: true, penjelasan: "Contoh: 12 − 2 − 2 − 2 − 2 − 2 − 2 = 0, ditulis 12 : 2 = 6." },
    { teks: "6 : 6 = 6.", benar: false, penjelasan: "6 − 6 = 0. Bilangan 6 hanya dikurangkan 1 kali, jadi 6 : 6 = 1." },
    { teks: "5 : 1 = 1.", benar: false, penjelasan: "5 − 1 − 1 − 1 − 1 − 1 = 0. Bilangan 1 dikurangkan 5 kali, jadi 5 : 1 = 5." },
    { teks: "Hasil bagi dikali pembagi sama dengan bilangan yang dibagi.", benar: true, penjelasan: "Contoh: 15 : 3 = 5 dan 5 × 3 = 15." },
  ],
  [
    { teks: "28 : 7 = 4.", benar: true, penjelasan: "28 − 7 − 7 − 7 − 7 = 0. Bilangan 7 dikurangkan 4 kali." },
    { teks: "36 : 4 = 8.", benar: false, penjelasan: "36 dikurangi 4 sebanyak 9 kali baru habis, jadi 36 : 4 = 9." },
    { teks: "10 : 1 = 10.", benar: true, penjelasan: "Bilangan 1 dikurangkan 10 kali dari 10, jadi 10 : 1 = 10." },
    { teks: "Pada 15 : 3 = 5, bilangan 3 dikurangkan sebanyak 5 kali.", benar: true, penjelasan: "15 − 3 − 3 − 3 − 3 − 3 = 0, ada lima kali pengurangan." },
    { teks: "Bila 5 × 3 = 15, maka 15 : 3 = 3.", benar: false, penjelasan: "15 : 3 = 5. Hasil bagi sama dengan bilangan pertama pada perkalian tadi." },
  ],
];
/** QG7 Detektif Pembagian. */
export const RONDE_DETEKTIF_QG: SoalDetektif[] = [
  { klue: ["Aku adalah hasil 48 : 6.", "Aku kurang dari 10."], jawab: 8, opsi: [8, 6, 12], salah: "48 : 6 = 8, karena 8 × 6 = 48." },
  { klue: ["Aku adalah hasil 45 : 9.", "Aku lebih dari 4 dan kurang dari 6."], jawab: 5, opsi: [5, 9, 4], salah: "45 : 9 = 5, karena 5 × 9 = 45." },
  { klue: ["Bila aku dikali 3, hasilnya 21.", "Aku kurang dari 10."], jawab: 7, opsi: [7, 18, 63], salah: "7 × 3 = 21, jadi bilangan itu 7." },
  { klue: ["Aku adalah hasil 64 : 8.", "Aku bilangan genap."], jawab: 8, opsi: [8, 7, 9], salah: "64 : 8 = 8, karena 8 × 8 = 64. Delapan adalah bilangan genap." },
];
/** QG8 Peta Konsep Pembagian. */
export const PETA_KONSEP_QG: { pusat: string; kotak: KotakPeta[] }[] = [
  {
    pusat: "Pembagian",
    kotak: [
      { label: "Pembagian adalah pengurangan", opsi: ["berulang sampai habis", "satu kali saja", "tanpa batas"], benar: 0 },
      { label: "15 : 3 berarti 15 dikurangi", opsi: ["3 berulang kali", "5 satu kali", "3 dan 5"], benar: 0 },
      { label: "Pada 15 : 3 = 5, hasil baginya", opsi: ["5", "3", "15"], benar: 0 },
      { label: "Menurutku, 12 : 2 hasilnya", opsi: ["6", "10", "14"], benar: 0 },
    ],
  },
  {
    pusat: "Perkalian dan pembagian",
    kotak: [
      { label: "15 : 3 = 5 berkaitan dengan", opsi: ["5 × 3 = 15", "5 + 3 = 8", "15 − 3 = 12"], benar: 0 },
      { label: "Hasil bagi dikali pembagi sama dengan", opsi: ["bilangan yang dibagi", "hasil bagi", "pembagi"], benar: 0 },
      { label: "Bilangan yang dibagi pada 15 : 3 adalah", opsi: ["15", "3", "5"], benar: 0 },
      { label: "Menurutku, 6 × 4 = 24 berarti 24 : 4 sama dengan", opsi: ["6", "20", "28"], benar: 0 },
    ],
  },
];
/** QG9 Soal Cerita Pembagian (Ayo Berlatih 3 dan 4, Asesmen 5). */
export type CeritaBagi = { teks: string; p: Bagi };
export const RONDE_CERITA_QG: CeritaBagi[][] = [
  [
    { teks: "Paman membeli 3 mobil-mobilan yang akan diberikan kepada 3 keponakannya. Berapa mobil-mobilan yang diterima setiap keponakan?", p: [3, 3] },
    { teks: "Ayah memasukkan 24 telur ke dalam 3 kotak. Setiap kotak berisi telur sama banyak. Berapa telur dalam setiap kotak?", p: [24, 3] },
  ],
  [
    { teks: "Kakak membeli 36 apel dan membagikannya kepada 6 teman sama banyak hingga habis. Berapa apel yang diterima masing-masing teman?", p: [36, 6] },
    { teks: "Ibu guru membawa 48 buku dan meletakkannya di atas 8 meja dengan sama banyak. Berapa buku yang terdapat di setiap meja?", p: [48, 8] },
  ],
  [
    { teks: "Sebuah toko mainan membagikan 63 balon secara gratis selama 7 hari. Balon yang dibagikan setiap hari sama banyak. Berapa balon yang dibagikan setiap hari?", p: [63, 7] },
    { teks: "Ada 20 lembar daun yang dibagi sama banyak kepada 4 siswa dalam satu kelompok. Berapa lembar daun untuk setiap siswa?", p: [20, 4] },
  ],
];
/** QG10 Susun Kata Pembagian. */
export const RONDE_SUSUNKATA_QG: { kata: string[]; pengecoh: string }[] = [
  { kata: ["Pembagian", "adalah", "pengurangan", "berulang", "sampai", "habis"], pengecoh: "penjumlahan" },
  { kata: ["15", "dibagi", "3", "sama", "dengan", "5"], pengecoh: "dikali" },
  { kata: ["Hasil", "bagi", "dikali", "pembagi", "sama", "dengan", "bilangan", "yang", "dibagi"], pengecoh: "dikurangi" },
  { kata: ["Bilangan", "3", "dikurangkan", "5", "kali", "sampai", "habis"], pengecoh: "ditambah" },
];
