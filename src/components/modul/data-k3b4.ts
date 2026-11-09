/**
 * Data murni Matematika Kelas 3 Bab 4 (Unsur-Unsur Bangun Datar): Sub-Bab A (sisi pada bangun datar: titik, garis, sinar
 * garis, ruas garis, kurva, mengukur ruas garis dalam cm dan mm, dan sisi bangun datar). Tanpa React, tanpa acak, tanpa
 * jaringan. Kunci selalu dihitung dari bilangan. Uji: scripts/uji-data-k3b4.mjs.
 */
import type { KalimatIsian, KotakPeta, Pernyataan, SoalDetektif } from "./data-k3b1";
import type { JenisBenda } from "./data-k3b3";

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

/** Bilangan Indonesia dengan titik ribuan, mis. 5.000. */
export const titik = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/** Tiga pilihan bilangan: kunci, satu lebih, dan satu kurang. Kunci berpindah tempat. */
export function opsiAngka(n: number, nomor: number): number[] {
  const semua = [n, n + 1, n >= 2 ? n - 1 : n + 2];
  return urutanTetap(3, 2, nomor).map((i) => semua[i]);
}

export const kapital = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

/* ====================================================================== */
/* Pembantu umum Bab 4                                                      */
/* ====================================================================== */

/** 55 menjadi "5 cm 5 mm", 40 menjadi "4 cm", 7 menjadi "7 mm". */
export function teksMm(mm: number): string {
  const c = Math.floor(mm / 10);
  const s = mm % 10;
  if (c === 0) return `${s} mm`;
  return s === 0 ? `${c} cm` : `${c} cm ${s} mm`;
}
/** 55 menjadi "5,5 cm", 40 menjadi "4 cm", 37 menjadi "3,7 cm". */
export const teksDesimalCm = (mm: number): string => `${String(mm / 10).replace(".", ",")} cm`;
/** Ubah teks panjang kembali menjadi milimeter (untuk uji): "5 cm 5 mm", "5,5 cm", "37 mm", "4 cm". */
export function mmDariTeks(teks: string): number {
  const des = teks.match(/^(\d+),(\d) cm$/);
  if (des) return Number(des[1]) * 10 + Number(des[2]);
  const cm = teks.match(/(\d+) cm/);
  const mm = teks.match(/(\d+) mm/);
  return (cm ? Number(cm[1]) * 10 : 0) + (mm ? Number(mm[1]) : 0);
}
/** Tiga pilihan panjang milimeter: kunci, lebih satu langkah, dan kurang satu langkah (langkah 10 bila 20 ke atas, selain itu 1). */
export function opsiMm(n: number, nomor: number): number[] {
  const s = n >= 20 ? 10 : 1;
  const semua = [n, n + s, n > s ? n - s : n + 2 * s];
  return urutanTetap(3, 2, nomor).map((i) => semua[i]);
}
/** Tiga pilihan panjang pada penggaris (kelipatan 5 mm): kunci, lebih 1 cm, dan kurang 1 cm. */
export function opsiPenggaris(n: number, nomor: number): number[] {
  const semua = [n, n + 10, n > 10 ? n - 10 : n + 20];
  return urutanTetap(3, 2, nomor).map((i) => semua[i]);
}

/* ====================================================================== */
/* SUB-BAB A. Sisi pada bangun datar                                        */
/* ====================================================================== */

export type JenisGaris = "sinar" | "garis" | "ruas" | "kurva";
export const URUT_GARIS: JenisGaris[] = ["sinar", "garis", "ruas", "kurva"];
export const NAMA_GARIS: Record<JenisGaris, string> = { sinar: "Sinar garis", garis: "Garis", ruas: "Ruas garis", kurva: "Kurva (garis lengkung)" };
/** Tiga pilihan jenis garis: kunci dan dua jenis berikutnya dalam urutan melingkar. */
export function opsiJenis(jenis: JenisGaris, nomor: number): { opsi: string[]; jawab: number } {
  const i = URUT_GARIS.indexOf(jenis);
  const lain = [URUT_GARIS[(i + 1) % 4], URUT_GARIS[(i + 2) % 4]];
  return susunOpsi(NAMA_GARIS[jenis], [NAMA_GARIS[lain[0]], NAMA_GARIS[lain[1]]], nomor);
}
export type GarisBerhuruf = { jenis: JenisGaris; a: string; b: string; v?: number };
export const namaGaris = (g: GarisBerhuruf): string => `${NAMA_GARIS[g.jenis].replace(" (garis lengkung)", "").toLowerCase()} ${g.a}${g.b}`;

export type BendaSisi = { id: string; emoji: string; nama: string; sisi: number };
export const BENDA_SISI: Record<string, BendaSisi> = {
  buku: { id: "buku", emoji: "📖", nama: "buku", sisi: 4 },
  bingkai: { id: "bingkai", emoji: "🖼️", nama: "bingkai foto", sisi: 4 },
  kartu: { id: "kartu", emoji: "💳", nama: "kartu", sisi: 4 },
  tv: { id: "tv", emoji: "📺", nama: "televisi", sisi: 4 },
  ponsel: { id: "ponsel", emoji: "📱", nama: "ponsel", sisi: 4 },
  segitiga: { id: "segitiga", emoji: "📐", nama: "penggaris segitiga", sisi: 3 },
  rambu: { id: "rambu", emoji: "⚠️", nama: "rambu segitiga", sisi: 3 },
  stop: { id: "stop", emoji: "🛑", nama: "rambu berhenti", sisi: 8 },
  jam: { id: "jam", emoji: "🕐", nama: "jam dinding", sisi: 0 },
  kue: { id: "kue", emoji: "🍪", nama: "kue bulat", sisi: 0 },
  sasaran: { id: "sasaran", emoji: "🎯", nama: "papan sasaran", sisi: 0 },
};
export const labelSisi = (n: number): string => (n === 0 ? "tanpa sisi lurus" : `${n} sisi`);
export const tanyaSisi = (n: number): string => (n === 0 ? "tidak punya sisi lurus" : `punya ${n} sisi`);

export type GarisBenda = { id: string; emoji: string; nama: string; jenis: JenisGaris };
export const GARIS_BENDA: Record<string, GarisBenda> = {
  senter: { id: "senter", emoji: "🔦", nama: "sinar senter", jenis: "sinar" },
  rel: { id: "rel", emoji: "🛤️", nama: "rel kereta api", jenis: "garis" },
  pensil: { id: "pensil", emoji: "✏️", nama: "pensil", jenis: "ruas" },
  penggaris: { id: "penggaris", emoji: "📏", nama: "penggaris", jenis: "ruas" },
  pelangi: { id: "pelangi", emoji: "🌈", nama: "pelangi", jenis: "kurva" },
};

export type SoalMm = { jenis: JenisBenda; mm: number };
export const idMm = (s: SoalMm): string => `${s.jenis}${s.mm}`;

/* ------------------------------ Concrete A ------------------------------ */

/** CA1 Hitung Sisi Benda. */
export const RONDE_HITUNG_CA: string[][] = [["buku", "segitiga"], ["stop", "rambu"], ["tv", "kartu"]];
/** CA2 Bendanya Mirip Apa: sinar garis, garis, ruas garis, atau kurva. */
export const RONDE_MIRIP_CA: string[][] = [["senter", "pensil"], ["pelangi", "rel"], ["penggaris", "senter"]];
/** CA3 Baca Panjang dalam cm dan mm: benda mulai dari angka 0, kelipatan 5 mm, paling banyak 14,5 cm. */
export const RONDE_BACA_CA: SoalMm[][] = [
  [{ jenis: "pensil", mm: 55 }, { jenis: "krayon", mm: 35 }],
  [{ jenis: "sendok", mm: 85 }, { jenis: "penghapus", mm: 45 }],
  [{ jenis: "sikat", mm: 115 }, { jenis: "pensil", mm: 95 }],
];
/** CA4 Jodohkan Benda dan Banyak Sisi: tiga banyak sisi berbeda. */
export const RONDE_JODOH_CA: string[][] = [["segitiga", "buku", "jam"], ["rambu", "tv", "kue"], ["segitiga", "kartu", "sasaran"]];
/** CA5 Memori Benda dan Banyak Sisi: empat banyak sisi berbeda (3, 4, 8, dan 0). */
export const RONDE_MEMORI_CA: string[][] = [["segitiga", "buku", "stop", "jam"], ["rambu", "tv", "stop", "kue"], ["segitiga", "kartu", "stop", "sasaran"]];
/** CA6 Ketuk Benda dengan Sisi Tertentu. */
export const RONDE_KETUK_CA: { item: string[]; tanya: number[] }[] = [
  { item: ["segitiga", "buku", "stop"], tanya: [8, 3] },
  { item: ["tv", "jam", "rambu"], tanya: [0, 4] },
  { item: ["kartu", "stop", "kue"], tanya: [8, 0] },
];
/** CA7 Ketuk Semua Benda dengan Banyak Sisi Tertentu. */
export const RONDE_SEMUA_CA: { sisi: number; item: string[] }[] = [
  { sisi: 4, item: ["buku", "segitiga", "tv", "jam"] },
  { sisi: 3, item: ["rambu", "kartu", "segitiga", "stop"] },
  { sisi: 0, item: ["kue", "buku", "jam", "sasaran"] },
];
/** CA8 Papan Panjang dalam Milimeter (kelipatan 5 mm, paling banyak 14,5 cm). */
export const RONDE_PAPAN_CA: SoalMm[][] = [
  [{ jenis: "pensil", mm: 55 }, { jenis: "krayon", mm: 35 }],
  [{ jenis: "sendok", mm: 85 }, { jenis: "sikat", mm: 115 }],
  [{ jenis: "penghapus", mm: 45 }, { jenis: "pensil", mm: 95 }],
];
/** CA9 Urutkan Benda menurut Panjang. */
export const RONDE_URUT_CA: { item: SoalMm[]; dari: "kecil" | "besar" }[] = [
  { item: [{ jenis: "pensil", mm: 95 }, { jenis: "krayon", mm: 45 }, { jenis: "sendok", mm: 125 }], dari: "kecil" },
  { item: [{ jenis: "sikat", mm: 135 }, { jenis: "penghapus", mm: 55 }, { jenis: "pensil", mm: 85 }], dari: "besar" },
  { item: [{ jenis: "krayon", mm: 75 }, { jenis: "sendok", mm: 115 }, { jenis: "sikat", mm: 65 }], dari: "kecil" },
];
/** CA10 Jumlah Sisi Dua Benda. */
export const RONDE_JUMLAH_CA: string[][] = [["segitiga", "buku"], ["buku", "stop"], ["rambu", "stop"]];

/* ------------------------------ Picture A ------------------------------ */

/** PA1 Garis, Sinar, atau Ruas Garis. */
export const RONDE_JENIS_PA: GarisBerhuruf[][] = [
  [{ jenis: "sinar", a: "A", b: "B" }, { jenis: "kurva", a: "P", b: "Q", v: 0 }],
  [{ jenis: "ruas", a: "K", b: "L" }, { jenis: "garis", a: "C", b: "D" }],
  [{ jenis: "garis", a: "E", b: "F" }, { jenis: "sinar", a: "M", b: "N" }],
];
/** PA2 Baca Ruas Garis pada Penggaris (mm, kelipatan 5). */
export const RONDE_PENGGARIS_PA: number[][] = [[55, 95], [35, 85], [115, 45]];
/** PA3 Jodohkan Ruas Garis dan Panjang. */
export const RONDE_JODOH_PA: number[][] = [[45, 85, 125], [35, 65, 105], [55, 95, 135]];
/** PA4 Memori Garis dan Namanya: empat jenis berbeda. */
export const RONDE_MEMORI_PA: GarisBerhuruf[][] = [
  [{ jenis: "sinar", a: "A", b: "B" }, { jenis: "garis", a: "C", b: "D" }, { jenis: "ruas", a: "E", b: "F" }, { jenis: "kurva", a: "P", b: "Q", v: 1 }],
  [{ jenis: "sinar", a: "G", b: "H" }, { jenis: "garis", a: "K", b: "L" }, { jenis: "ruas", a: "M", b: "N" }, { jenis: "kurva", a: "R", b: "S", v: 2 }],
  [{ jenis: "sinar", a: "X", b: "Y" }, { jenis: "garis", a: "U", b: "V" }, { jenis: "ruas", a: "S", b: "T" }, { jenis: "kurva", a: "E", b: "F", v: 0 }],
];
/** PA5 Isi Tabel Sisi Bangun Datar. */
export type TabelIsi = { kepala: [string, string]; baris: { label: string; jawab: string }[]; kartu: string[] };
export function susunTabel(daftar: { label: string; jawab: string }[], asing: string, tambahan: number): TabelIsi {
  const kartu = urutanTetap(daftar.length + 1, 2, tambahan).map((i) => (i < daftar.length ? daftar[i].jawab : asing));
  return { kepala: ["Bangun datar", "Banyak sisi"], baris: daftar, kartu };
}
export const RONDE_TABEL_PA: TabelIsi[] = [
  susunTabel([{ label: "Segitiga", jawab: "3 sisi" }, { label: "Persegi", jawab: "4 sisi" }, { label: "Segilima", jawab: "5 sisi" }, { label: "Segienam", jawab: "6 sisi" }], "7 sisi", 1),
  susunTabel([{ label: "Persegi panjang", jawab: "4 sisi" }, { label: "Segitiga", jawab: "3 sisi" }, { label: "Segidelapan", jawab: "8 sisi" }, { label: "Segienam", jawab: "6 sisi" }], "5 sisi", 2),
  susunTabel([{ label: "Segilima", jawab: "5 sisi" }, { label: "Persegi", jawab: "4 sisi" }, { label: "Segitiga", jawab: "3 sisi" }, { label: "Segidelapan", jawab: "8 sisi" }], "6 sisi", 3),
];
/** PA6 Ketuk Semua Bangun dengan Banyak Sisi Tertentu: tiap bangun ditulis banyak sisinya. */
export const RONDE_SEMUA_PA: { n: number; item: number[] }[] = [
  { n: 4, item: [3, 4, 6, 4] },
  { n: 3, item: [5, 3, 8, 3] },
  { n: 5, item: [5, 4, 6, 5] },
];
/** PA7 Pilah Garis: lurus atau lengkung (tiga lurus dan tiga lengkung). */
export const RONDE_PILAH_PA: GarisBerhuruf[][] = [
  [{ jenis: "ruas", a: "A", b: "B" }, { jenis: "kurva", a: "C", b: "D", v: 0 }, { jenis: "sinar", a: "E", b: "F" }, { jenis: "kurva", a: "G", b: "H", v: 1 }, { jenis: "garis", a: "K", b: "L" }, { jenis: "kurva", a: "M", b: "N", v: 2 }],
  [{ jenis: "kurva", a: "P", b: "Q", v: 1 }, { jenis: "garis", a: "R", b: "S" }, { jenis: "kurva", a: "T", b: "U", v: 2 }, { jenis: "ruas", a: "V", b: "W" }, { jenis: "kurva", a: "X", b: "Y", v: 0 }, { jenis: "sinar", a: "A", b: "C" }],
  [{ jenis: "sinar", a: "B", b: "D" }, { jenis: "kurva", a: "E", b: "G", v: 2 }, { jenis: "ruas", a: "H", b: "K", }, { jenis: "kurva", a: "L", b: "M", v: 0 }, { jenis: "garis", a: "N", b: "P" }, { jenis: "kurva", a: "Q", b: "R", v: 1 }],
];
export const lurus = (g: GarisBerhuruf): boolean => g.jenis !== "kurva";
/** PA8 Urutkan Langkah Mengukur Ruas Garis. */
export const RONDE_LANGKAH_PA: { judul: string; langkah: string[] }[] = [
  { judul: "Mengukur ruas garis AB", langkah: ["Letakkan angka 0 penggaris di titik A", "Lihat angka tepat di bawah titik B", "Baca panjangnya dalam cm dan mm", "Tulis hasilnya dengan satuan cm"] },
  { judul: "Menggambar ruas garis 7 cm", langkah: ["Tandai titik A pada kertas", "Letakkan angka 0 penggaris di titik A", "Tandai titik B tepat di angka 7", "Hubungkan A dan B dengan penggaris"] },
  { judul: "Mengubah 5 cm 5 mm menjadi sentimeter", langkah: ["Tulis ukuran 5 cm 5 mm", "Ingat 1 cm sama dengan 10 mm", "Ubah 5 mm menjadi 0,5 cm", "Tulis hasilnya 5,5 cm"] },
];
/** PA9 Papan Panjang dalam Milimeter dari penggaris. */
export const RONDE_PAPAN_PA: number[][] = [[55, 95], [35, 85], [75, 125]];
/** PA10 Sisi Bangun Datar: segitiga atau segiempat dengan huruf titik sudut. */
export const RONDE_SISI_PA: { huruf: string[] }[][] = [
  [{ huruf: ["E", "F", "G"] }, { huruf: ["G", "H", "I", "J"] }],
  [{ huruf: ["K", "L", "M"] }, { huruf: ["P", "Q", "R", "S"] }],
  [{ huruf: ["A", "B", "C"] }, { huruf: ["W", "X", "Y", "Z"] }],
];
/** Daftar sisi bangun datar dari huruf titik sudutnya, mis. ["E","F","G"] menjadi "EF, FG, GE" ditulis "EF, FG, EG". */
export function sisiDari(huruf: string[]): string[] {
  return huruf.map((h, i) => (i === huruf.length - 1 ? `${huruf[0]}${h}` : `${h}${huruf[i + 1]}`));
}
/** Tiga pilihan daftar sisi: kunci, kurang satu sisi, dan satu sisi diganti garis yang bukan sisi. */
export function opsiSisi(huruf: string[], nomor: number): { opsi: string[]; jawab: number } {
  const sisi = sisiDari(huruf);
  const benar = sisi.join(", ");
  const kurang = sisi.slice(0, -1).join(", ");
  const luar = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].find((c) => !huruf.includes(c)) ?? "A";
  const salah = [...sisi.slice(0, -1), `${huruf[0]}${luar}`].join(", ");
  return susunOpsi(benar, [kurang, salah], nomor);
}

/* ------------------------------ Abstract A ------------------------------ */

const NAMA_S = (tanya: string, benar: string, salah: [string, string], pesan: string): SoalTeks => ({ tanya, benar, salah, pesan });
/** QA1 Pilih Nama Garis dan Bagian Bangun Datar. */
export const RONDE_NAMA_QA: SoalTeks[][] = [
  [NAMA_S("Garis yang hanya dapat diperpanjang ke satu arah disebut ...", "Sinar garis", ["Ruas garis", "Garis"], "Sinar garis hanya dapat diperpanjang ke satu sisi."), NAMA_S("Garis yang memiliki panjang tertentu dan kedua ujungnya berhenti disebut ...", "Ruas garis", ["Sinar garis", "Garis"], "Ruas garis memiliki panjang tertentu atau tetap.")],
  [NAMA_S("Garis yang dapat diperpanjang ke kedua arah disebut ...", "Garis", ["Ruas garis", "Sinar garis"], "Garis dapat diperpanjang ke kedua sisi."), NAMA_S("Garis yang melengkung disebut ...", "Kurva", ["Ruas garis", "Sinar garis"], "Garis lengkung disebut kurva.")],
  [NAMA_S("Batas dari bangun datar disebut ...", "Sisi", ["Titik", "Sinar garis"], "Ruas garis yang menjadi batas bangun datar dinamakan sisi."), NAMA_S("Dua titik berbeda hanya dapat dihubungkan dengan satu ... lurus.", "ruas garis", ["kurva", "sinar garis"], "Dua titik hanya dapat dihubungkan oleh satu ruas garis lurus.")],
];
/** QA2 Lengkapi Kalimat Tentang Garis dan Sisi. */
export const RONDE_KALIMAT_QA: KalimatIsian[][] = [
  [
    { depan: "Sinar garis hanya dapat diperpanjang ke", belakang: "sisi.", opsi: ["satu", "dua", "tiga"], benar: 0 },
    { depan: "Garis dapat diperpanjang ke", belakang: "sisi.", opsi: ["kedua", "satu", "tidak ada"], benar: 0 },
    { depan: "Ruas garis memiliki panjang yang", belakang: ".", opsi: ["tetap", "tak terhingga", "berubah-ubah"], benar: 0 },
  ],
  [
    { depan: "Satu sentimeter sama dengan sepuluh", belakang: ".", opsi: ["milimeter", "meter", "kilometer"], benar: 0 },
    { depan: "Penggaris dipakai untuk menggambar ruas garis", belakang: ".", opsi: ["lurus", "lengkung", "melingkar"], benar: 0 },
    { depan: "Mengukur ruas garis dimulai dari angka", belakang: "pada penggaris.", opsi: ["0", "1", "5"], benar: 0 },
  ],
  [
    { depan: "Segitiga memiliki", belakang: "sisi.", opsi: ["tiga", "empat", "lima"], benar: 0 },
    { depan: "Persegi memiliki", belakang: "sisi.", opsi: ["empat", "tiga", "enam"], benar: 0 },
    { depan: "Ruas garis yang menjadi batas bangun datar disebut", belakang: ".", opsi: ["sisi", "titik", "kurva"], benar: 0 },
  ],
];
/** QA3 Ubah Sentimeter dan Milimeter. */
export const RONDE_UBAH_QA: SoalTeks[][] = [
  [NAMA_S("1 cm = ... mm", "10 mm", ["1 mm", "100 mm"], "1 sentimeter sama dengan 10 milimeter."), NAMA_S("5 cm 5 mm = ... cm", "5,5 cm", ["5,05 cm", "55 cm"], "5 mm = 0,5 cm, jadi 5 cm 5 mm = 5 cm + 0,5 cm = 5,5 cm.")],
  [NAMA_S("2 cm 9 mm = ... mm", "29 mm", ["209 mm", "11 mm"], "2 cm = 20 mm, ditambah 9 mm menjadi 29 mm."), NAMA_S("3 cm 7 mm = ... cm", "3,7 cm", ["3,07 cm", "37 cm"], "7 mm = 0,7 cm, jadi 3 cm 7 mm = 3,7 cm.")],
  [NAMA_S("70 mm = ... cm", "7 cm", ["70 cm", "0,7 cm"], "70 mm dibagi 10 sama dengan 7 cm."), NAMA_S("11,5 cm = ... cm ... mm", "11 cm 5 mm", ["1 cm 15 mm", "115 cm 0 mm"], "0,5 cm = 5 mm, jadi 11,5 cm = 11 cm 5 mm.")],
];
/** QA4 Jodohkan Ukuran. */
export const RONDE_JODOH_QA: { kiri: string; kanan: string }[][] = [
  [{ kiri: "5 cm 5 mm", kanan: "5,5 cm" }, { kiri: "3 cm 7 mm", kanan: "37 mm" }, { kiri: "1 cm", kanan: "10 mm" }],
  [{ kiri: "2 cm 9 mm", kanan: "2,9 cm" }, { kiri: "6 cm", kanan: "60 mm" }, { kiri: "8 cm 5 mm", kanan: "85 mm" }],
  [{ kiri: "11,5 cm", kanan: "11 cm 5 mm" }, { kiri: "40 mm", kanan: "4 cm" }, { kiri: "7,2 cm", kanan: "72 mm" }],
];
/** QA5 Memori Ukuran. */
export const RONDE_MEMORI_QA: { a: string; b: string }[][] = [
  [{ a: "10 mm", b: "1 cm" }, { a: "35 mm", b: "3 cm 5 mm" }, { a: "4 cm", b: "40 mm" }, { a: "2,5 cm", b: "25 mm" }],
  [{ a: "20 mm", b: "2 cm" }, { a: "6 cm 5 mm", b: "65 mm" }, { a: "9 cm", b: "90 mm" }, { a: "1,5 cm", b: "15 mm" }],
  [{ a: "50 mm", b: "5 cm" }, { a: "8 cm 2 mm", b: "82 mm" }, { a: "3 cm", b: "30 mm" }, { a: "12,5 cm", b: "125 mm" }],
];
/** QA6 Benar atau Salah. */
export const RONDE_BENARSALAH_QA: Pernyataan[][] = [
  [
    { teks: "Sinar garis hanya dapat diperpanjang ke satu sisi.", benar: true, penjelasan: "Sinar garis berpangkal di satu titik dan dapat diperpanjang ke satu arah saja." },
    { teks: "Ruas garis dapat diperpanjang ke kedua sisi tanpa batas.", benar: false, penjelasan: "Yang dapat diperpanjang ke kedua sisi adalah garis. Ruas garis punya panjang tetap." },
    { teks: "Dua titik berbeda hanya dapat dihubungkan dengan satu ruas garis lurus.", benar: true, penjelasan: "Dua titik hanya punya satu ruas garis lurus, tetapi banyak garis lengkung." },
    { teks: "1 cm sama dengan 100 mm.", benar: false, penjelasan: "1 cm sama dengan 10 mm." },
    { teks: "Panjang ruas garis dibaca dari angka 0 pada penggaris.", benar: true, penjelasan: "Titik awal ruas garis diletakkan tepat di angka 0 penggaris." },
  ],
  [
    { teks: "Segitiga memiliki tiga sisi.", benar: true, penjelasan: "Segitiga dibatasi oleh tiga ruas garis, yaitu tiga sisi." },
    { teks: "Persegi memiliki lima sisi.", benar: false, penjelasan: "Persegi memiliki empat sisi." },
    { teks: "5 mm sama dengan 0,5 cm.", benar: true, penjelasan: "5 mm dibagi 10 sama dengan 0,5 cm." },
    { teks: "Gabungan empat ruas garis yang bersambung adalah satu garis lengkung.", benar: false, penjelasan: "Gabungan ruas garis bukan garis lengkung. Ia tetap gabungan ruas garis lurus." },
    { teks: "Sisi bangun datar adalah ruas garis pembatasnya.", benar: true, penjelasan: "Ruas garis yang menjadi batas bangun datar dinamakan sisi." },
  ],
];
/** QA7 Detektif Ruas Garis. */
export const RONDE_DETEKTIF_QA: SoalDetektif[] = [
  { klue: ["Aku banyak milimeter pada 1 cm.", "Aku bilangan genap kurang dari 20."], jawab: 10, opsi: [10, 100, 11], salah: "1 cm = 10 mm, dan 10 genap kurang dari 20." },
  { klue: ["Aku banyak milimeter pada 3 cm 7 mm.", "Satuanku 7."], jawab: 37, opsi: [37, 307, 73], salah: "3 cm = 30 mm, ditambah 7 mm menjadi 37 mm." },
  { klue: ["Aku banyak sisi pada segitiga.", "Aku kurang dari 5."], jawab: 3, opsi: [3, 4, 6], salah: "Segitiga memiliki tiga sisi." },
  { klue: ["Aku banyak sisi pada persegi.", "Aku bilangan genap."], jawab: 4, opsi: [4, 3, 5], salah: "Persegi memiliki empat sisi, dan 4 genap." },
];
/** QA8 Peta Konsep Garis dan Sisi. */
export const PETA_KONSEP_QA: { pusat: string; kotak: KotakPeta[] }[] = [
  {
    pusat: "Titik dan garis",
    kotak: [
      { label: "Garis yang dapat diperpanjang ke satu sisi disebut", opsi: ["sinar garis", "ruas garis", "garis"], benar: 0 },
      { label: "Garis yang punya panjang tetap disebut", opsi: ["ruas garis", "sinar garis", "kurva"], benar: 0 },
      { label: "Dua titik hanya dapat dihubungkan oleh satu", opsi: ["ruas garis lurus", "garis lengkung", "sudut"], benar: 0 },
      { label: "Menurutku, garis lengkung disebut", opsi: ["kurva", "sinar garis", "ruas garis"], benar: 0 },
    ],
  },
  {
    pusat: "Sisi bangun datar",
    kotak: [
      { label: "Ruas garis pembatas bangun datar disebut", opsi: ["sisi", "titik", "kurva"], benar: 0 },
      { label: "Segitiga memiliki", opsi: ["3 sisi", "4 sisi", "5 sisi"], benar: 0 },
      { label: "1 cm sama dengan", opsi: ["10 mm", "100 mm", "1 mm"], benar: 0 },
      { label: "Menurutku, persegi memiliki", opsi: ["4 sisi", "3 sisi", "6 sisi"], benar: 0 },
    ],
  },
];
/** QA9 Soal Cerita Ruas Garis dan Sisi: jawaban berupa bilangan dengan satuan mm atau cm. */
export type CeritaSisi = { teks: string; jawab: number; satuan: "mm" | "cm"; pesan: string };
export const RONDE_CERITA_QA: CeritaSisi[][] = [
  [
    { teks: "Ruas garis AB panjangnya 5 cm dan ruas garis MN 5 cm 5 mm. Berapa mm selisih panjang keduanya?", jawab: 5, satuan: "mm", pesan: "5 cm 5 mm = 55 mm dan 5 cm = 50 mm. Selisihnya 55 − 50 = 5 mm." },
    { teks: "Ruas garis PQ panjangnya 3 cm 7 mm. Berapa milimeter panjang PQ?", jawab: 37, satuan: "mm", pesan: "3 cm = 30 mm. 30 mm + 7 mm = 37 mm." },
  ],
  [
    { teks: "Dua ruas garis disambung. Panjangnya 4 cm dan 3 cm 5 mm. Berapa mm panjang gabungannya?", jawab: 75, satuan: "mm", pesan: "4 cm = 40 mm dan 3 cm 5 mm = 35 mm. 40 + 35 = 75 mm." },
    { teks: "Seutas tali 11 cm 5 mm dipotong 2 cm. Berapa mm sisa tali?", jawab: 95, satuan: "mm", pesan: "11 cm 5 mm = 115 mm dan 2 cm = 20 mm. 115 − 20 = 95 mm." },
  ],
  [
    { teks: "Sisi-sisi segitiga EFG panjangnya 3 cm, 4 cm, dan 5 cm. Berapa cm jumlah panjang ketiga sisinya?", jawab: 12, satuan: "cm", pesan: "3 + 4 + 5 = 12, jadi jumlah panjang ketiga sisi 12 cm." },
    { teks: "Persegi memiliki empat sisi, tiap sisi 2 cm 5 mm. Berapa mm jumlah panjang keempat sisinya?", jawab: 100, satuan: "mm", pesan: "2 cm 5 mm = 25 mm. Empat sisi: 4 × 25 = 100 mm." },
  ],
];
/** Tiga pilihan hasil cerita: kunci, lebih satu langkah, dan kurang satu langkah. */
export function opsiCerita(c: CeritaSisi, nomor: number): { opsi: string[]; jawab: number } {
  const o = c.satuan === "mm" ? opsiMm(c.jawab, nomor) : opsiAngka(c.jawab, nomor);
  return { opsi: o.map((n) => `${n} ${c.satuan}`), jawab: o.indexOf(c.jawab) };
}
/** QA10 Susun Kata Garis dan Sisi. */
export const RONDE_SUSUNKATA_QA: { kata: string[]; pengecoh: string }[] = [
  { kata: ["Ruas", "garis", "memiliki", "panjang", "yang", "tetap"], pengecoh: "berubah" },
  { kata: ["Sinar", "garis", "hanya", "dapat", "diperpanjang", "ke", "satu", "sisi"], pengecoh: "dua" },
  { kata: ["Satu", "sentimeter", "sama", "dengan", "sepuluh", "milimeter"], pengecoh: "seratus" },
  { kata: ["Sisi", "adalah", "ruas", "garis", "pembatas", "bangun", "datar"], pengecoh: "titik" },
];


/* ====================================================================== */
/* SUB-BAB B. Sudut pada bidang datar                                       */
/* ====================================================================== */

export type JenisSudut = "lancip" | "siku-siku" | "tumpul" | "lurus" | "refleks";
export const URUT_SUDUT: JenisSudut[] = ["lancip", "siku-siku", "tumpul", "lurus", "refleks"];
/** Jenis sudut menurut ukurannya: lancip (0 sampai 90), siku-siku (90), tumpul (90 sampai 180), lurus (180), refleks (180 sampai 360). */
export function jenisSudut(d: number): JenisSudut {
  if (!(d > 0 && d < 360)) throw new RangeError(`ukuran sudut di luar 0 sampai 360: ${d}`);
  if (d === 90) return "siku-siku";
  if (d === 180) return "lurus";
  if (d < 90) return "lancip";
  if (d < 180) return "tumpul";
  return "refleks";
}
export const namaSudut = (j: JenisSudut): string => `sudut ${j}`;
export const labelSudut = (j: JenisSudut): string => kapital(namaSudut(j));
export const teksDerajat = (d: number): string => `${d}°`;
/** Tiga pilihan jenis sudut: kunci dan dua jenis berikutnya dalam urutan melingkar. */
export function opsiJenisSudut(j: JenisSudut, nomor: number): { opsi: string[]; jawab: number } {
  const i = URUT_SUDUT.indexOf(j);
  const lain = [URUT_SUDUT[(i + 1) % 5], URUT_SUDUT[(i + 2) % 5]];
  return susunOpsi(labelSudut(j), [labelSudut(lain[0]), labelSudut(lain[1])], nomor);
}
/** Tiga pilihan hasil membaca busur derajat: kunci, bacaan dari skala yang salah (180 dikurangi kunci), dan kunci lebih 10. */
export function opsiBusur(d: number, nomor: number): number[] {
  const cermin = 180 - d;
  const dekat = d + 10 !== cermin ? d + 10 : d + 20;
  const semua = [d, cermin, dekat];
  return urutanTetap(3, 2, nomor).map((i) => semua[i]);
}
/** Tiga pilihan ukuran sudut pada soal cerita: kunci, lebih 10 (atau kurang 20 bila melewati 360), dan kurang 10. */
export function opsiDerajat(d: number, nomor: number): number[] {
  const atas = d + 10 <= 360 ? d + 10 : d - 20;
  const semua = [d, atas, d - 10];
  return urutanTetap(3, 2, nomor).map((i) => semua[i]);
}

/* ------------------------------ Concrete B ------------------------------ */

export type BendaSudut = "buku" | "pintu" | "gunting";
export const NAMA_BENDA_SUDUT: Record<BendaSudut, string> = { buku: "buku", pintu: "pintu", gunting: "gunting" };
export type SoalBendaSudut = { benda: BendaSudut; deg: number };
export const idSudut = (s: SoalBendaSudut): string => `${s.benda}${s.deg}`;
export const kalimatBendaSudut = (s: SoalBendaSudut): string => `${NAMA_BENDA_SUDUT[s.benda]} yang dibuka ${s.deg === 180 ? "lurus" : `sampai membentuk ${labelSudut(jenisSudut(s.deg)).toLowerCase()}`}`;

/** Soal memutar strip atau busur: syarat terhadap ukuran acuan. */
export type SoalPutar = { syarat: "sama" | "lebih" | "kurang"; target: number; awal: number };
export function cocokPutar(syarat: SoalPutar["syarat"], target: number, sudut: number): boolean {
  if (syarat === "lebih") return sudut > target;
  if (syarat === "kurang") return sudut > 0 && sudut < target;
  return sudut === target;
}
export function tanyaPutar(s: SoalPutar): string {
  if (s.syarat === "lebih") return "Putar strip sampai sudutnya lebih besar dari sudut acuan (garis putus).";
  if (s.syarat === "kurang") return "Putar strip sampai sudutnya lebih kecil dari sudut acuan (garis putus).";
  if (s.target === 90) return "Putar strip sampai sudutnya pas dengan pojok kertas lipat (sudut siku-siku).";
  if (s.target === 180) return "Putar strip sampai kedua strip membentuk garis lurus (sudut lurus).";
  return "Putar strip sampai sudutnya sama dengan sudut acuan.";
}
export function pesanPutar(s: SoalPutar): string {
  if (s.syarat === "lebih") return `Sudut strip sekarang lebih besar dari sudut acuan ${s.target}°.`;
  if (s.syarat === "kurang") return `Sudut strip sekarang lebih kecil dari sudut acuan ${s.target}°.`;
  if (s.target === 90) return "Strip pas dengan pojok kertas lipat. Itu sudut siku-siku, yaitu 90°.";
  if (s.target === 180) return "Kedua strip membentuk garis lurus. Itu sudut lurus, yaitu 180°.";
  return `Sudut strip sama dengan sudut acuan ${s.target}°.`;
}

/** CB1 Strip Sudut: Lebih Besar atau Lebih Kecil (langkah 15 derajat). */
export const RONDE_STRIP_CB: SoalPutar[][] = [
  [{ syarat: "lebih", target: 45, awal: 15 }, { syarat: "kurang", target: 120, awal: 165 }],
  [{ syarat: "lebih", target: 90, awal: 30 }, { syarat: "kurang", target: 75, awal: 135 }],
  [{ syarat: "lebih", target: 105, awal: 45 }, { syarat: "kurang", target: 60, awal: 120 }],
];
/** CB2 Bentuk Sudut Siku-siku dengan Kertas Lipat: sudut siku-siku dan sudut lurus. */
export const RONDE_SIKU_CB: SoalPutar[][] = [
  [{ syarat: "sama", target: 90, awal: 45 }, { syarat: "sama", target: 90, awal: 135 }],
  [{ syarat: "sama", target: 90, awal: 30 }, { syarat: "sama", target: 180, awal: 90 }],
  [{ syarat: "sama", target: 180, awal: 60 }, { syarat: "sama", target: 90, awal: 150 }],
];
/** CB3 Mana yang Paling Terbuka: tiga benda sejenis dengan bukaan berbeda. */
export const RONDE_TERBUKA_CB: { benda: BendaSudut; degs: number[]; tanya: ("lebar" | "sempit")[] }[] = [
  { benda: "buku", degs: [30, 90, 150], tanya: ["lebar", "sempit"] },
  { benda: "pintu", degs: [45, 120, 75], tanya: ["sempit", "lebar"] },
  { benda: "gunting", degs: [40, 100, 160], tanya: ["lebar", "sempit"] },
];
/** CB4 Jenis Sudut pada Benda. */
export const RONDE_JENIS_CB: SoalBendaSudut[][] = [
  [{ benda: "pintu", deg: 45 }, { benda: "buku", deg: 90 }],
  [{ benda: "gunting", deg: 120 }, { benda: "pintu", deg: 90 }],
  [{ benda: "buku", deg: 150 }, { benda: "gunting", deg: 30 }],
];
/** CB5 Jodohkan Benda dan Jenis Sudut: tiga jenis berbeda. */
export const RONDE_JODOH_CB: SoalBendaSudut[][] = [
  [{ benda: "buku", deg: 30 }, { benda: "pintu", deg: 90 }, { benda: "gunting", deg: 130 }],
  [{ benda: "gunting", deg: 60 }, { benda: "buku", deg: 135 }, { benda: "pintu", deg: 90 }],
  [{ benda: "pintu", deg: 150 }, { benda: "gunting", deg: 90 }, { benda: "buku", deg: 45 }],
];
/** CB6 Memori Benda dan Jenis Sudut: empat jenis berbeda (lancip, siku-siku, tumpul, lurus). */
export const RONDE_MEMORI_CB: SoalBendaSudut[][] = [
  [{ benda: "buku", deg: 40 }, { benda: "pintu", deg: 90 }, { benda: "gunting", deg: 120 }, { benda: "buku", deg: 180 }],
  [{ benda: "pintu", deg: 60 }, { benda: "gunting", deg: 90 }, { benda: "buku", deg: 150 }, { benda: "pintu", deg: 180 }],
  [{ benda: "gunting", deg: 30 }, { benda: "pintu", deg: 90 }, { benda: "buku", deg: 110 }, { benda: "buku", deg: 180 }],
];
/** CB7 Ketuk Semua Benda dengan Jenis Sudut Tertentu. */
export const RONDE_SEMUA_CB: { jenis: JenisSudut; item: SoalBendaSudut[] }[] = [
  { jenis: "siku-siku", item: [{ benda: "buku", deg: 90 }, { benda: "pintu", deg: 45 }, { benda: "gunting", deg: 90 }, { benda: "buku", deg: 150 }] },
  { jenis: "lancip", item: [{ benda: "pintu", deg: 30 }, { benda: "gunting", deg: 120 }, { benda: "buku", deg: 60 }, { benda: "pintu", deg: 90 }] },
  { jenis: "tumpul", item: [{ benda: "buku", deg: 100 }, { benda: "gunting", deg: 40 }, { benda: "pintu", deg: 150 }, { benda: "buku", deg: 90 }] },
];
/** CB8 Hitung Sudut Siku-siku pada Benda. */
export type BendaSiku = { id: string; emoji: string; nama: string; siku: number };
export const BENDA_SIKU: Record<string, BendaSiku> = {
  buku: { id: "buku", emoji: "📖", nama: "buku", siku: 4 },
  bingkai: { id: "bingkai", emoji: "🖼️", nama: "bingkai foto", siku: 4 },
  tv: { id: "tv", emoji: "📺", nama: "televisi", siku: 4 },
  segitiga: { id: "segitiga", emoji: "📐", nama: "penggaris segitiga", siku: 1 },
  rambu: { id: "rambu", emoji: "⚠️", nama: "rambu segitiga", siku: 0 },
  jam: { id: "jam", emoji: "🕐", nama: "jam dinding", siku: 0 },
};
export const RONDE_SIKUBENDA_CB: string[][] = [["buku", "segitiga"], ["rambu", "tv"], ["bingkai", "jam"]];
/** CB9 Urutkan Benda menurut Bukaan. */
export const RONDE_URUT_CB: { benda: BendaSudut; degs: number[]; dari: "kecil" | "besar" }[] = [
  { benda: "buku", degs: [60, 150, 100], dari: "kecil" },
  { benda: "pintu", degs: [135, 30, 90], dari: "besar" },
  { benda: "gunting", degs: [45, 110, 80], dari: "kecil" },
];
/** CB10 Ukur dengan Irisan: sudut yang sama diukur dengan dua satuan irisan berbeda. */
export type SoalIrisan = { deg: number; satuan: number };
export const RONDE_IRISAN_CB: SoalIrisan[][] = [
  [{ deg: 90, satuan: 30 }, { deg: 90, satuan: 15 }],
  [{ deg: 60, satuan: 30 }, { deg: 60, satuan: 15 }],
  [{ deg: 135, satuan: 45 }, { deg: 135, satuan: 15 }],
];
export const banyakIrisan = (s: SoalIrisan): number => s.deg / s.satuan;

/* ------------------------------ Picture B ------------------------------ */

/** PB1 Baca Busur Derajat: kaki OA di kanan (skala luar) atau di kiri (skala dalam). */
export type SoalBusur = { deg: number; kiri?: boolean };
export const RONDE_BUSUR_PB: SoalBusur[][] = [
  [{ deg: 50 }, { deg: 130 }],
  [{ deg: 70, kiri: true }, { deg: 110 }],
  [{ deg: 35 }, { deg: 155, kiri: true }],
];
/** PB2 Jenis Sudut dari Gambar. */
export const RONDE_JENIS_PB: number[][] = [[40, 90], [130, 180], [300, 60]];
/** PB3 Jodohkan Gambar Sudut dan Jenisnya: tiga jenis berbeda. */
export const RONDE_JODOH_PB: number[][] = [[30, 90, 120], [60, 135, 180], [100, 45, 270]];
/** PB4 Memori Gambar Sudut dan Jenisnya: empat jenis berbeda. */
export const RONDE_MEMORI_PB: number[][] = [[40, 90, 150, 240], [20, 90, 110, 180], [75, 90, 160, 300]];
/** PB5 Isi Tabel Jenis Sudut. */
export type TabelSudut = { kepala: [string, string]; baris: { label: string; jawab: string }[]; kartu: string[] };
export function tabelSudut(daftar: number[], asing: JenisSudut, tambahan: number): TabelSudut {
  const baris = daftar.map((d) => ({ label: teksDerajat(d), jawab: labelSudut(jenisSudut(d)) }));
  const kartu = urutanTetap(baris.length + 1, 2, tambahan).map((i) => (i < baris.length ? baris[i].jawab : labelSudut(asing)));
  return { kepala: ["Ukuran sudut", "Jenis sudut"], baris, kartu };
}
export const RONDE_TABEL_PB: TabelSudut[] = [tabelSudut([30, 90, 150, 180], "refleks", 1), tabelSudut([270, 45, 90, 120], "lurus", 2), tabelSudut([180, 60, 100, 330], "siku-siku", 3)];
/** PB6 Ketuk Semua Sudut dengan Jenis Tertentu. */
export const RONDE_SEMUA_PB: { jenis: JenisSudut; degs: number[] }[] = [
  { jenis: "lancip", degs: [30, 120, 60, 90] },
  { jenis: "tumpul", degs: [100, 45, 150, 90] },
  { jenis: "siku-siku", degs: [90, 60, 90, 130] },
];
/** PB7 Pilah Sudut: lancip, siku-siku, atau tumpul (enam sudut per ronde). */
export const RONDE_PILAH_PB: number[][] = [
  [25, 90, 140, 55, 115, 165],
  [70, 150, 90, 35, 100, 80],
  [120, 15, 90, 45, 175, 105],
];
/** PB8 Urutkan Sudut menurut Ukuran. */
export const RONDE_URUT_PB: { degs: number[]; dari: "kecil" | "besar" }[] = [
  { degs: [100, 35, 70], dari: "kecil" },
  { degs: [150, 50, 110], dari: "besar" },
  { degs: [20, 80, 140], dari: "kecil" },
];
/** PB9 Titik Sudut, Kaki, dan Nama Sudut: huruf pertama pada kaki pertama, kedua titik sudut, ketiga pada kaki kedua. */
export type SoalNamaSudut = { huruf: [string, string, string]; deg: number; tanya: "titik" | "nama" | "kaki" };
export const namaSudutHuruf = (h: [string, string, string]): string => `∠${h[0]}${h[1]}${h[2]}`;
export const kakiSudutHuruf = (h: [string, string, string]): string => `${h[1]}${h[0]} dan ${h[1]}${h[2]}`;
export function opsiNamaSudut(s: SoalNamaSudut, nomor: number): { opsi: string[]; jawab: number } {
  const [a, o, b] = s.huruf;
  if (s.tanya === "titik") return susunOpsi(o, [a, b], nomor);
  if (s.tanya === "nama") return susunOpsi(`∠${a}${o}${b}`, [`∠${o}${a}${b}`, `∠${a}${b}${o}`], nomor);
  return susunOpsi(`${o}${a} dan ${o}${b}`, [`${a}${b} dan ${o}${a}`, `${a}${b} dan ${o}${b}`], nomor);
}
export const tanyaNamaSudut = (s: SoalNamaSudut): string =>
  s.tanya === "titik" ? "Titik sudutnya adalah ..." : s.tanya === "nama" ? "Sudut ini dapat diberi nama ..." : "Kaki-kaki sudutnya adalah ...";
export const pesanNamaSudut = (s: SoalNamaSudut): string => {
  const [a, o, b] = s.huruf;
  if (s.tanya === "titik") return `Kedua kaki sudut bertemu di titik ${o}, jadi titik sudutnya ${o}.`;
  if (s.tanya === "nama") return `Nama sudut ditulis dengan titik sudut di tengah, yaitu ∠${a}${o}${b}.`;
  return `Kaki sudutnya adalah sinar ${o}${a} dan sinar ${o}${b}.`;
};
export const RONDE_NAMA_PB: SoalNamaSudut[][] = [
  [{ huruf: ["A", "O", "B"], deg: 50, tanya: "titik" }, { huruf: ["K", "L", "M"], deg: 110, tanya: "nama" }],
  [{ huruf: ["P", "Q", "R"], deg: 70, tanya: "kaki" }, { huruf: ["X", "Y", "Z"], deg: 130, tanya: "titik" }],
  [{ huruf: ["C", "D", "E"], deg: 40, tanya: "nama" }, { huruf: ["F", "G", "H"], deg: 100, tanya: "kaki" }],
];
/** PB10 Gambar Sudut dengan Busur Derajat (langkah 5 derajat). */
export const RONDE_GAMBAR_PB: number[][] = [[50, 130], [70, 90], [135, 45]];

/* ------------------------------ Abstract B ------------------------------ */

/** QB1 Pilih Nama Bagian Sudut dan Alatnya. */
export const RONDE_NAMA_QB: SoalTeks[][] = [
  [NAMA_S("Titik tempat dua kaki sudut bertemu disebut ...", "titik sudut", ["kaki sudut", "busur derajat"], "Titik tempat dua kaki sudut bertemu disebut titik sudut."), NAMA_S("Sinar OA dan sinar OB pada ∠AOB disebut ...", "kaki sudut", ["titik sudut", "sisi bangun"], "Sinar OA dan sinar OB adalah kaki sudut.")],
  [NAMA_S("Alat untuk mengukur sudut disebut ...", "busur derajat", ["penggaris", "jangka"], "Sudut diukur dengan busur derajat."), NAMA_S("Satuan ukuran sudut adalah ...", "derajat", ["sentimeter", "gram"], "Ukuran sudut dinyatakan dalam derajat, ditulis dengan simbol °.")],
  [NAMA_S("Sudut yang ukurannya tepat 90° disebut sudut ...", "siku-siku", ["lancip", "tumpul"], "Sudut yang tepat 90° adalah sudut siku-siku."), NAMA_S("Sudut yang ukurannya tepat 180° disebut sudut ...", "lurus", ["refleks", "tumpul"], "Sudut yang tepat 180° adalah sudut lurus, dua kali sudut siku-siku.")],
];
/** QB2 Lengkapi Kalimat Tentang Sudut. */
export const RONDE_KALIMAT_QB: KalimatIsian[][] = [
  [
    { depan: "Sudut terbentuk ketika dua garis berpotongan pada satu", belakang: ".", opsi: ["titik", "sisi", "bidang"], benar: 0 },
    { depan: "Titik O pada ∠AOB disebut titik", belakang: ".", opsi: ["sudut", "tengah", "ujung"], benar: 0 },
    { depan: "Simbol ∠ menunjukkan", belakang: ".", opsi: ["sudut", "sisi", "garis"], benar: 0 },
  ],
  [
    { depan: "Sudut siku-siku ukurannya tepat", belakang: ".", opsi: ["90°", "45°", "180°"], benar: 0 },
    { depan: "Sudut lancip ukurannya kurang dari", belakang: ".", opsi: ["90°", "180°", "360°"], benar: 0 },
    { depan: "Sudut lurus ukurannya tepat", belakang: ".", opsi: ["180°", "90°", "360°"], benar: 0 },
  ],
  [
    { depan: "Sudut tumpul ukurannya lebih dari 90° dan kurang dari", belakang: ".", opsi: ["180°", "90°", "360°"], benar: 0 },
    { depan: "Sudut refleks ukurannya lebih dari 180° dan kurang dari", belakang: ".", opsi: ["360°", "90°", "270°"], benar: 0 },
    { depan: "Satu putaran penuh sama dengan", belakang: ".", opsi: ["360°", "180°", "90°"], benar: 0 },
  ],
];
/** QB3 Jenis Sudut dari Ukurannya: kunci dihitung dari ukuran. */
const PESAN_JENIS: Record<JenisSudut, (d: number) => string> = {
  lancip: (d) => `${d}° lebih dari 0° dan kurang dari 90°, jadi sudut lancip.`,
  "siku-siku": (d) => `Sudut yang tepat ${d}° adalah sudut siku-siku.`,
  tumpul: (d) => `${d}° lebih dari 90° dan kurang dari 180°, jadi sudut tumpul.`,
  lurus: (d) => `Sudut yang tepat ${d}° adalah sudut lurus.`,
  refleks: (d) => `${d}° lebih dari 180° dan kurang dari 360°, jadi sudut refleks.`,
};
export function soalJenisDeg(d: number): SoalTeks {
  const j = jenisSudut(d);
  const i = URUT_SUDUT.indexOf(j);
  return { tanya: `Sudut ${d}° adalah ...`, benar: namaSudut(j), salah: [namaSudut(URUT_SUDUT[(i + 1) % 5]), namaSudut(URUT_SUDUT[(i + 2) % 5])], pesan: PESAN_JENIS[j](d) };
}
export const DEG_JENIS_QB: number[][] = [[70, 120], [90, 200], [89, 180]];
export const RONDE_JENIS_QB: SoalTeks[][] = DEG_JENIS_QB.map((r) => r.map(soalJenisDeg));
/** QB4 Jodohkan Ukuran dan Jenis Sudut: tiga jenis berbeda. */
export const DEG_JODOH_QB: number[][] = [[30, 90, 120], [180, 45, 270], [135, 90, 330]];
export const RONDE_JODOH_QB: { kiri: string; kanan: string }[][] = DEG_JODOH_QB.map((r) => r.map((d) => ({ kiri: teksDerajat(d), kanan: labelSudut(jenisSudut(d)) })));
/** QB5 Memori Ukuran dan Jenis Sudut: empat jenis berbeda. */
export const DEG_MEMORI_QB: number[][] = [[40, 90, 150, 240], [20, 90, 110, 180], [75, 90, 160, 300]];
export const RONDE_MEMORI_QB: { a: string; b: string }[][] = DEG_MEMORI_QB.map((r) => r.map((d) => ({ a: teksDerajat(d), b: labelSudut(jenisSudut(d)) })));
/** QB6 Benar atau Salah. */
export const RONDE_BENARSALAH_QB: Pernyataan[][] = [
  [
    { teks: "Sudut terbentuk ketika dua garis berpotongan pada satu titik.", benar: true, penjelasan: "Dua garis yang berpotongan pada satu titik membentuk sudut di titik itu." },
    { teks: "Sudut siku-siku ukurannya 180°.", benar: false, penjelasan: "Sudut siku-siku tepat 90°. Yang tepat 180° adalah sudut lurus." },
    { teks: "Sudut lancip ukurannya kurang dari 90°.", benar: true, penjelasan: "Sudut lancip lebih dari 0° dan kurang dari 90°." },
    { teks: "Sudut tumpul ukurannya kurang dari 90°.", benar: false, penjelasan: "Sudut tumpul lebih dari 90° dan kurang dari 180°." },
    { teks: "Busur derajat dipakai untuk mengukur sudut.", benar: true, penjelasan: "Besar sudut diukur dengan busur derajat dalam satuan derajat." },
  ],
  [
    { teks: "Sudut refleks lebih dari 180° dan kurang dari 360°.", benar: true, penjelasan: "Sudut refleks lebih besar dari sudut lurus dan lebih kecil dari satu putaran penuh." },
    { teks: "Sudut lurus ukurannya 90°.", benar: false, penjelasan: "Sudut lurus tepat 180°, dua kali sudut siku-siku." },
    { teks: "Satu putaran penuh sama dengan 360°.", benar: true, penjelasan: "Lingkaran dibagi 360 bagian sama besar, tiap bagian 1°." },
    { teks: "Sudut yang sama selalu berukuran sama walaupun satuan ukurnya berbeda.", benar: false, penjelasan: "Dengan satuan tidak baku berbeda, bilangan ukurannya berbeda. Satuan baku derajat membuat ukurannya sama." },
    { teks: "Sudut siku-siku dapat dibuat dengan melipat kertas.", benar: true, penjelasan: "Pojok kertas yang dilipat dua kali adalah sudut siku-siku." },
  ],
];
/** QB7 Detektif Sudut. */
export const RONDE_DETEKTIF_QB: SoalDetektif[] = [
  { klue: ["Aku sudut siku-siku.", "Ukuranku dalam derajat."], jawab: 90, opsi: [90, 180, 60], salah: "Sudut siku-siku ukurannya tepat 90°." },
  { klue: ["Aku sudut lurus.", "Aku dua kali sudut siku-siku."], jawab: 180, opsi: [180, 90, 360], salah: "Dua kali 90° adalah 180°, yaitu sudut lurus." },
  { klue: ["Aku sudut tumpul.", "Aku kelipatan 60."], jawab: 120, opsi: [120, 60, 240], salah: "120° lebih dari 90° dan kurang dari 180°, dan 120 kelipatan 60." },
  { klue: ["Aku sudut refleks.", "Jumlahku dengan sudut 60° satu putaran penuh."], jawab: 300, opsi: [300, 120, 240], salah: "300° ditambah 60° sama dengan 360°, dan 300° lebih dari 180°." },
];
/** QB8 Peta Konsep Sudut. */
export const PETA_KONSEP_QB: { pusat: string; kotak: KotakPeta[] }[] = [
  {
    pusat: "Bagian sudut",
    kotak: [
      { label: "Titik tempat dua kaki bertemu disebut", opsi: ["titik sudut", "kaki sudut", "derajat"], benar: 0 },
      { label: "Sinar yang membentuk sudut disebut", opsi: ["kaki sudut", "titik sudut", "busur"], benar: 0 },
      { label: "Alat untuk mengukur sudut adalah", opsi: ["busur derajat", "penggaris", "jangka"], benar: 0 },
      { label: "Menurutku, satuan ukuran sudut adalah", opsi: ["derajat", "gram", "meter"], benar: 0 },
    ],
  },
  {
    pusat: "Jenis sudut",
    kotak: [
      { label: "Sudut yang tepat 90° disebut", opsi: ["siku-siku", "lancip", "tumpul"], benar: 0 },
      { label: "Sudut yang kurang dari 90° disebut", opsi: ["lancip", "tumpul", "refleks"], benar: 0 },
      { label: "Sudut yang tepat 180° disebut", opsi: ["lurus", "refleks", "siku-siku"], benar: 0 },
      { label: "Menurutku, sudut 300° disebut", opsi: ["refleks", "tumpul", "lurus"], benar: 0 },
    ],
  },
];
/** QB9 Soal Cerita Sudut: jawaban berupa ukuran dalam derajat. */
export type CeritaSudut = { teks: string; jawab: number; pesan: string };
export const RONDE_CERITA_QB: CeritaSudut[][] = [
  [
    { teks: "Dua sudut siku-siku dirapatkan sehingga kaki-kakinya membentuk garis lurus. Berapa derajat sudut yang terbentuk?", jawab: 180, pesan: "90° + 90° = 180°, yaitu sudut lurus." },
    { teks: "Sebuah sudut refleks berukuran 300°. Berapa derajat sudut lancip yang bersesuaian?", jawab: 60, pesan: "Sudut lancip yang bersesuaian adalah 360° − 300° = 60°." },
  ],
  [
    { teks: "Sebuah sudut tumpul berukuran 130°. Berapa derajat sudut refleks yang bersesuaian?", jawab: 230, pesan: "Sudut refleks yang bersesuaian adalah 360° − 130° = 230°." },
    { teks: "Sudut lurus dibagi menjadi dua sudut yang sama besar. Berapa derajat tiap sudut?", jawab: 90, pesan: "180° dibagi 2 sama dengan 90°, yaitu sudut siku-siku." },
  ],
  [
    { teks: "Sudut lurus 180° dikurangi sudut lancip 50°. Berapa derajat sisanya?", jawab: 130, pesan: "180° − 50° = 130°, yaitu sudut tumpul." },
    { teks: "Sebuah kipas dibuka satu putaran penuh. Berapa derajat sudutnya?", jawab: 360, pesan: "Satu putaran penuh sama dengan 360°." },
  ],
];
/** Tiga pilihan hasil cerita sudut. */
export function opsiCeritaSudut(c: CeritaSudut, nomor: number): { opsi: string[]; jawab: number } {
  const o = opsiDerajat(c.jawab, nomor);
  return { opsi: o.map(teksDerajat), jawab: o.indexOf(c.jawab) };
}
/** QB10 Susun Kata Sudut. */
export const RONDE_SUSUNKATA_QB: { kata: string[]; pengecoh: string }[] = [
  { kata: ["Sudut", "terbentuk", "ketika", "dua", "garis", "berpotongan", "pada", "satu", "titik"], pengecoh: "sejajar" },
  { kata: ["Sudut", "siku-siku", "ukurannya", "tepat", "90", "derajat"], pengecoh: "180" },
  { kata: ["Busur", "derajat", "dipakai", "untuk", "mengukur", "besar", "sudut"], pengecoh: "panjang" },
  { kata: ["Ukuran", "sudut", "lurus", "sama", "dengan", "180", "derajat"], pengecoh: "90" },
];
