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
