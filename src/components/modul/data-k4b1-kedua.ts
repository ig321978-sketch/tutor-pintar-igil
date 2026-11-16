/**
 * Data murni Modul Kedua Matematika Kelas 4 Bab 1 Sub-Bab A (membaca dan menulis bilangan cacah sampai 10.000):
 * kata bilangan empat angka, nilai tempat ribuan sampai satuan, dan semua ronde permainan Sub-Bab A.
 * Tanpa React, tanpa acak, tanpa jaringan. Naskah dan angka orisinal IGIL (draf).
 * Rujukan topik dan rentang angka (acuan, bukan kutipan): Matematika SD/MI Kelas IV, Bab 1 Sub-Bab A.
 * Uji: scripts/uji-data-k4b1-kedua.mjs.
 */
import type { BendaId } from "./data-k2b7";

export const Kapital = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
export const HURUF = ["A", "B", "C", "D", "E", "F"];

export function urutanTetap(n: number, langkah = 3, geser = 0): number[] {
  const g = ((geser % n) + n) % n;
  const awal = (g * langkah) % n;
  return Array.from({ length: n }, (_, i) => (i + awal) % n);
}

export function urutTampil<T>(daftar: readonly T[], kunci: readonly T[], nomor: number): T[] {
  const n = daftar.length;
  for (let g = 0; g < n; g += 1) {
    const p = urutanTetap(n, 2, nomor + g).map((i) => daftar[i]);
    if (JSON.stringify(p) !== JSON.stringify(kunci)) return p;
  }
  return [...daftar].reverse();
}

export function susunOpsi(benar: string, pengecoh: [string, string], nomor: number): { opsi: string[]; jawab: number } {
  const semua = [benar, pengecoh[0], pengecoh[1]];
  const opsi = urutanTetap(3, 2, nomor).map((i) => semua[i]);
  return { opsi, jawab: opsi.indexOf(benar) };
}

/* ====================================================================== */
/* Bilangan empat angka (1.000–10.000)                                       */
/* ====================================================================== */

export type Empat = { rb: number; r: number; p: number; s: number };
export const empat = (n: number): Empat => ({
  rb: Math.floor(n / 1000) % 10,
  r: Math.floor(n / 100) % 10,
  p: Math.floor(n / 10) % 10,
  s: n % 10,
});
/** Gabung digit; untuk 10.000 pakai n khusus di luar. */
export const gabung4 = (rb: number, r: number, p: number, s: number) => rb * 1000 + r * 100 + p * 10 + s;

const KATA_SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];

function kataDuaAngka(n: number): string {
  if (n < 10) return KATA_SATUAN[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${KATA_SATUAN[n - 10]} belas`;
  const sisa = n % 10;
  return `${KATA_SATUAN[Math.floor(n / 10)]} puluh${sisa ? ` ${KATA_SATUAN[sisa]}` : ""}`;
}

function kataRatusan(n: number): string {
  if (n === 0) return "";
  if (n === 100) return "seratus";
  const r = Math.floor(n / 100);
  const sisa = n % 100;
  const bagian: string[] = [];
  if (r === 1) bagian.push("seratus");
  else if (r >= 2) bagian.push(`${KATA_SATUAN[r]} ratus`);
  if (sisa > 0) bagian.push(kataDuaAngka(sisa));
  return bagian.join(" ");
}

/** Kata bilangan Indonesia 0–10.000. Angka 1 di tempat ribuan menjadi "seribu", bukan "satu ribu". */
export function kata(n: number): string {
  if (n === 0) return "nol";
  if (n === 10000) return "sepuluh ribu";
  if (n < 1000) return kataRatusan(n) || "nol";
  const rb = Math.floor(n / 1000);
  const sisa = n % 1000;
  const depan = rb === 1 ? "seribu" : `${KATA_SATUAN[rb]} ribu`;
  if (sisa === 0) return depan;
  return `${depan} ${kataRatusan(sisa)}`;
}

/** Lambang dengan titik ribuan Indonesia: 3286 → "3.286", 10000 → "10.000". */
export function lambang(n: number): string {
  if (n < 1000) return String(n);
  if (n === 10000) return "10.000";
  const s = String(n);
  return `${s.slice(0, -3)}.${s.slice(-3)}`;
}

export function pengecoh4(n: number): number[] {
  const { rb, r, p, s } = empat(n);
  const kandidat = [
    gabung4(rb, r, s, p),
    gabung4(rb, p, r, s),
    gabung4(r, rb, p, s),
    gabung4(rb, s, p, r),
    n + 10,
    n - 10,
    n + 100,
    n - 100,
    n + 1000,
    n - 1000,
    n + 1,
    n - 1,
  ];
  const hasil: number[] = [];
  for (const k of kandidat) {
    if (k >= 1000 && k <= 9999 && k !== n && !hasil.includes(k)) hasil.push(k);
  }
  return hasil;
}

export function opsiAngka4(n: number, nomor: number): number[] {
  const semua = [n, ...pengecoh4(n).slice(0, 2)];
  return urutanTetap(3, 2, nomor).map((i) => semua[i]);
}

export function opsiKata4(n: number, nomor: number): { opsi: string[]; jawab: number } {
  const [a, b] = pengecoh4(n);
  return susunOpsi(kata(n), [kata(a), kata(b)], nomor);
}

export const NAMA_TEMPAT = ["ribuan", "ratusan", "puluhan", "satuan"] as const;
export type Tempat = (typeof NAMA_TEMPAT)[number];

export function nilaiTempat(n: number, tempat: Tempat): number {
  const { rb, r, p, s } = empat(n);
  if (tempat === "ribuan") return rb * 1000;
  if (tempat === "ratusan") return r * 100;
  if (tempat === "puluhan") return p * 10;
  return s;
}

export const angkaTempat = (n: number, tempat: Tempat): number => {
  const { rb, r, p, s } = empat(n);
  if (tempat === "ribuan") return rb;
  if (tempat === "ratusan") return r;
  if (tempat === "puluhan") return p;
  return s;
};

export const uraian = (n: number): string =>
  `${nilaiTempat(n, "ribuan")} + ${nilaiTempat(n, "ratusan")} + ${nilaiTempat(n, "puluhan")} + ${nilaiTempat(n, "satuan")}`;

export const susunan = (n: number): string => {
  const { rb, r, p, s } = empat(n);
  return `${rb} ribuan + ${r} ratusan + ${p} puluhan + ${s} satuan`;
};

export const adaNol = (n: number): boolean => String(n).includes("0");

/* ====================================================================== */
/* Syarat ketuk-semua                                                       */
/* ====================================================================== */

export type Syarat =
  | "ribuan-nol"
  | "ratusan-nol"
  | "puluhan-nol"
  | "satuan-nol"
  | "ribuan-lebih-5"
  | "ribuan-3"
  | "ratusan-2"
  | "angka-nol"
  | "lebih"
  | "kurang";

export function cocokSyarat(syarat: Syarat, n: number, acuan = 0): boolean {
  const d = empat(n);
  switch (syarat) {
    case "ribuan-nol":
      return d.rb === 0;
    case "ratusan-nol":
      return d.r === 0;
    case "puluhan-nol":
      return d.p === 0;
    case "satuan-nol":
      return d.s === 0;
    case "ribuan-lebih-5":
      return d.rb > 5;
    case "ribuan-3":
      return d.rb === 3;
    case "ratusan-2":
      return d.r === 2;
    case "angka-nol":
      return adaNol(n);
    case "lebih":
      return n > acuan;
    case "kurang":
      return n < acuan;
    default:
      return false;
  }
}

export const TEKS_SYARAT: Record<Exclude<Syarat, "lebih" | "kurang">, string> = {
  "ribuan-nol": "ribuan 0 (kurang dari seribu, jangan dipakai di bab ini)",
  "ratusan-nol": "angka ratusannya 0",
  "puluhan-nol": "angka puluhannya 0",
  "satuan-nol": "angka satuannya 0",
  "ribuan-lebih-5": "angka ribuannya lebih dari 5",
  "ribuan-3": "angka ribuannya 3",
  "ratusan-2": "angka ratusannya 2",
  "angka-nol": "memuat angka 0",
};

export type Bundel = { n: number; benda: BendaId };
export type RondeSemua = { syarat: Syarat; angka: number[]; benda?: BendaId; acuan?: number };

/* ====================================================================== */
/* SUB-BAB A — Concrete                                                     */
/* ====================================================================== */

export const RONDE_RAKIT_CA: Bundel[][] = [
  [
    { n: 4618, benda: "jeruk" },
    { n: 5240, benda: "jeruk" },
  ],
  [
    { n: 8105, benda: "kelereng" },
    { n: 2736, benda: "kelereng" },
  ],
  [
    { n: 6409, benda: "kue" },
    { n: 7821, benda: "kue" },
  ],
];

export const RONDE_HITUNG_CA: Bundel[][] = [
  [
    { n: 5927, benda: "jeruk" },
    { n: 4302, benda: "jeruk" },
  ],
  [
    { n: 8640, benda: "kue" },
    { n: 3170, benda: "kue" },
  ],
  [
    { n: 7001, benda: "kelereng" },
    { n: 5806, benda: "kelereng" },
  ],
];

export type Kelompok4 = { jenis: "rb" | "r" | "p" | "s"; k: number };
export const RONDE_SORTIR_CA: { benda: BendaId; item: Kelompok4[] }[] = [
  {
    benda: "jeruk",
    item: [
      { jenis: "rb", k: 4 },
      { jenis: "r", k: 7 },
      { jenis: "p", k: 2 },
      { jenis: "s", k: 5 },
      { jenis: "rb", k: 2 },
      { jenis: "p", k: 9 },
    ],
  },
  {
    benda: "kue",
    item: [
      { jenis: "rb", k: 6 },
      { jenis: "r", k: 0 },
      { jenis: "p", k: 3 },
      { jenis: "s", k: 8 },
      { jenis: "rb", k: 9 },
      { jenis: "s", k: 1 },
    ],
  },
  {
    benda: "kelereng",
    item: [
      { jenis: "rb", k: 5 },
      { jenis: "r", k: 8 },
      { jenis: "p", k: 4 },
      { jenis: "s", k: 0 },
      { jenis: "r", k: 2 },
      { jenis: "p", k: 6 },
    ],
  },
];

export const RONDE_PASANG_CA: Bundel[][] = [
  [
    { n: 5130, benda: "jeruk" },
    { n: 8764, benda: "jeruk" },
    { n: 3009, benda: "jeruk" },
  ],
  [
    { n: 6285, benda: "kue" },
    { n: 9402, benda: "kue" },
    { n: 1570, benda: "kue" },
  ],
  [
    { n: 2056, benda: "kelereng" },
    { n: 7938, benda: "kelereng" },
    { n: 4813, benda: "kelereng" },
  ],
];

export const RONDE_MEMORI_CA: Bundel[][] = [
  [
    { n: 4806, benda: "jeruk" },
    { n: 7152, benda: "jeruk" },
    { n: 3490, benda: "jeruk" },
    { n: 9027, benda: "jeruk" },
  ],
  [
    { n: 2613, benda: "kue" },
    { n: 5071, benda: "kue" },
    { n: 8340, benda: "kue" },
    { n: 6908, benda: "kue" },
  ],
  [
    { n: 1784, benda: "kelereng" },
    { n: 4250, benda: "kelereng" },
    { n: 9306, benda: "kelereng" },
    { n: 7015, benda: "kelereng" },
  ],
];

export type RondeKetuk = { benda: BendaId; item: number[]; tanya: number[] };
export const RONDE_KETUK_CA: RondeKetuk[] = [
  { benda: "jeruk", item: [4731, 4371, 4713], tanya: [4731, 4713] },
  { benda: "kue", item: [8520, 8250, 5280], tanya: [8520, 5280] },
  { benda: "kelereng", item: [3068, 3608, 6038], tanya: [3068, 6038] },
];

export const RONDE_SEMUA_CA: RondeSemua[] = [
  { syarat: "puluhan-nol", angka: [5407, 2938, 6905, 8142], benda: "jeruk" },
  { syarat: "ratusan-nol", angka: [3092, 7405, 4015, 5836], benda: "kue" },
  { syarat: "satuan-nol", angka: [5640, 2975, 8130, 6417], benda: "kelereng" },
];

export const RONDE_BACA_CA: Bundel[][] = [
  [
    { n: 5842, benda: "jeruk" },
    { n: 8004, benda: "jeruk" },
  ],
  [
    { n: 4630, benda: "kue" },
    { n: 2051, benda: "kue" },
  ],
  [
    { n: 7096, benda: "kelereng" },
    { n: 3005, benda: "kelereng" },
  ],
];

export const RONDE_PAPAN_CA: Bundel[][] = [
  [
    { n: 6149, benda: "jeruk" },
    { n: 6194, benda: "jeruk" },
  ],
  [
    { n: 8230, benda: "kue" },
    { n: 5706, benda: "kue" },
  ],
  [
    { n: 3408, benda: "kelereng" },
    { n: 9015, benda: "kelereng" },
  ],
];

export type SoalTukar = { tanya: string; benar: string; salah: [string, string]; pesan: string };
export const RONDE_TUKAR_CA: { benda: BendaId; soal: SoalTukar[] }[] = [
  {
    benda: "jeruk",
    soal: [
      { tanya: "Sepuluh dus digabung menjadi ...", benar: "satu peti", salah: ["satu bungkus", "sepuluh peti"], pesan: "Sepuluh dus, masing-masing seratus, bernilai seribu. Itu sama dengan satu peti." },
      { tanya: "Satu peti dapat dibuka menjadi ... dus", benar: "sepuluh dus", salah: ["seratus dus", "satu dus"], pesan: "Seribu dibagi menjadi sepuluh bagian seratus, jadi satu peti berisi sepuluh dus." },
    ],
  },
  {
    benda: "kue",
    soal: [
      { tanya: "Sepuluh bungkus digabung menjadi ...", benar: "satu dus", salah: ["satu peti", "sepuluh benda lepas"], pesan: "Sepuluh bungkus, masing-masing sepuluh, bernilai seratus. Itu sama dengan satu dus." },
      { tanya: "Sepuluh benda lepas digabung menjadi ...", benar: "satu bungkus", salah: ["satu dus", "satu peti"], pesan: "Sepuluh benda lepas bernilai sepuluh. Itu sama dengan satu bungkus." },
    ],
  },
  {
    benda: "kelereng",
    soal: [
      { tanya: "Satu dus dapat dibuka menjadi ... bungkus", benar: "sepuluh bungkus", salah: ["seratus bungkus", "satu bungkus"], pesan: "Seratus dibagi menjadi sepuluh bagian sepuluh, jadi satu dus berisi sepuluh bungkus." },
      { tanya: "Seribu benda lepas bernilai sama dengan ...", benar: "satu peti", salah: ["satu dus", "sepuluh bungkus"], pesan: "Seribu satuan sama nilainya dengan satu peti." },
    ],
  },
];

/* ====================================================================== */
/* SUB-BAB A — Picture                                                      */
/* ====================================================================== */

export const RONDE_HITUNG_PA: number[][] = [
  [5274, 4160],
  [6038, 8315],
  [7109, 2486],
];
export const RONDE_PAPAN_PA: number[][] = [
  [5428, 5482],
  [3860, 6217],
  [8049, 9136],
];
export const RONDE_TABEL_PA: number[][] = [
  [4283, 6150, 8007],
  [5612, 3390, 7045],
  [2874, 9420, 1608],
];
export const RONDE_PASANG_PA: number[][] = [
  [5428, 6150, 3701],
  [8530, 4096, 2307],
  [7814, 5069, 9230],
];
export const RONDE_MEMORI_PA: number[][] = [
  [5000, 6000, 7000, 8000],
  [2300, 4500, 6700, 8900],
  [3140, 5207, 6580, 9018],
];
export const RONDE_KETUK_PA: { item: number[]; tanya: number[] }[] = [
  { item: [5362, 5632, 3652], tanya: [5362, 3652] },
  { item: [8140, 8410, 4180], tanya: [8410, 4180] },
  { item: [2057, 2507, 5207], tanya: [2057, 5207] },
];

export type SoalGarisK4 = { dari: number; sampai: number; langkah: number; jawab: number };
/** Jawaban selalu jatuh tepat pada salah satu titik garis (dari + kelipatan langkah). */
export const RONDE_GARIS_PA: SoalGarisK4[][] = [
  [
    { dari: 5000, sampai: 6000, langkah: 100, jawab: 5600 },
    { dari: 2000, sampai: 3000, langkah: 100, jawab: 2300 },
  ],
  [
    { dari: 6400, sampai: 6500, langkah: 10, jawab: 6470 },
    { dari: 2000, sampai: 2500, langkah: 50, jawab: 2350 },
  ],
  [
    { dari: 8000, sampai: 9000, langkah: 100, jawab: 8700 },
    { dari: 9000, sampai: 10000, langkah: 100, jawab: 9400 },
  ],
];

export function jendelaGaris(nilai: number, langkah: number, nomor: number): { dari: number; sampai: number; langkah: number } {
  const setengah = langkah * (3 + (nomor % 2));
  let dari = Math.max(1000, nilai - setengah);
  dari = Math.floor(dari / langkah) * langkah;
  const sampai = dari + langkah * 8;
  return { dari, sampai: Math.min(10000, sampai), langkah };
}

export const RONDE_SEMUA_PA: RondeSemua[] = [
  { syarat: "puluhan-nol", angka: [5402, 3691, 8709, 4126] },
  { syarat: "ratusan-nol", angka: [3098, 7412, 6053, 9281] },
  { syarat: "angka-nol", angka: [4739, 6081, 2954, 7360] },
];
export const RONDE_SORTIR_PA: number[][] = [
  [5320, 4871, 6094, 7285, 8503, 3916],
  [2140, 6538, 9702, 3457, 8160, 5249],
  [4690, 7132, 3405, 8926, 6270, 1859],
];
export const RONDE_KALIMAT_PA: number[] = [4863, 6107, 9240];

export type KalimatIsian = { depan: string; belakang: string; opsi: string[]; benar: number };
export function kalimatTempat(n: number, nomor: number): KalimatIsian[] {
  const d = empat(n);
  const a = susunOpsi(String(d.rb), [String((d.rb + 1) % 10), String((d.rb + 2) % 10)], nomor);
  const b = susunOpsi(String(d.r), [String((d.r + 1) % 10), String((d.r + 3) % 10)], nomor + 1);
  const c = susunOpsi(String(nilaiTempat(n, "ribuan")), [String(d.rb * 100), String(d.rb * 10)], nomor + 2);
  return [
    { depan: `Pada ${lambang(n)}, angka di tempat ribuan adalah`, belakang: ".", opsi: a.opsi, benar: a.jawab },
    { depan: `Pada ${lambang(n)}, angka di tempat ratusan adalah`, belakang: ".", opsi: b.opsi, benar: b.jawab },
    { depan: `Angka ${d.rb} pada ${lambang(n)} bernilai`, belakang: ".", opsi: c.opsi, benar: c.jawab },
  ];
}

/* ====================================================================== */
/* SUB-BAB A — Abstract                                                     */
/* ====================================================================== */

export const RONDE_SUSUN_QA: number[][] = [
  [5127, 5172],
  [8340, 4706],
  [6059, 9283],
];
export const RONDE_BACA_QA: number[][] = [
  [6184, 4007],
  [5390, 8021],
  [2706, 9650],
];
export const RONDE_PAPAN_QA: number[][] = [
  [7415, 5836],
  [3190, 6208],
  [9047, 8530],
];
export const RONDE_PASANG_QA: number[][] = [
  [5604, 8137, 2090],
  [4372, 6905, 3158],
  [7240, 1863, 9406],
];
export const RONDE_MEMORI_QA: number[][] = [
  [2760, 3140, 5280, 6930],
  [1520, 4380, 7650, 9170],
  [3680, 5940, 6210, 8430],
];

export type TabelKata = { kepala: [string, string]; baris: { label: string; jawab: string }[]; kartu: string[] };
function tabelKata(daftar: number[], nomor: number): TabelKata {
  const baris = daftar.map((n) => ({ label: lambang(n), jawab: kata(n) }));
  const pengecoh = kata(pengecoh4(daftar[0])[0]);
  const kartu = urutanTetap(daftar.length + 1, 2, nomor).map((i) => (i < daftar.length ? kata(daftar[i]) : pengecoh));
  return { kepala: ["Bilangan", "Cara membaca"], baris, kartu };
}
export const RONDE_TABEL_QA: TabelKata[] = [
  tabelKata([4761, 3028, 6905, 7510], 1),
  tabelKata([2457, 8302, 5019, 9640], 2),
  tabelKata([6134, 1870, 7096, 3285], 3),
];

export type Pernyataan = { teks: string; benar: boolean; penjelasan: string };
export const RONDE_BENARSALAH_QA: Pernyataan[][] = [
  [
    { teks: `${lambang(5214)} dibaca ${kata(5214)}.`, benar: true, penjelasan: "Sebut ribuannya dulu, lalu ratusan, puluhan, dan satuan." },
    { teks: `${lambang(4008)} dibaca empat ribu nol nol delapan.`, benar: false, penjelasan: "Nol tidak disebut. Bacaan yang tepat adalah empat ribu delapan." },
    { teks: `${lambang(1840)} dibaca ${kata(1840)}.`, benar: true, penjelasan: "Angka 1 di tempat ribuan disebut seribu." },
    { teks: `${lambang(6302)} punya angka puluhan 0.`, benar: true, penjelasan: "6.302 terdiri atas 6 ribuan, 3 ratusan, 0 puluhan, dan 2 satuan." },
    { teks: "Saat menulis bilangan, nol di tengah boleh dibuang.", benar: false, penjelasan: "Nol menjaga tempat. Delapan ribu sembilan ditulis 8.009, bukan 8.9." },
  ],
  [
    { teks: "Sepuluh dus bernilai sama dengan satu peti.", benar: true, penjelasan: "Sepuluh kali seratus sama dengan seribu." },
    { teks: `Pada ${lambang(9150)}, angka satuannya disebut nol.`, benar: false, penjelasan: "Satuan 0 tidak disebut. Bacaannya sembilan ribu seratus lima puluh." },
    { teks: "Bilangan empat angka disebut mulai dari tempat paling kiri.", benar: true, penjelasan: "Urutannya ribuan, ratusan, puluhan, lalu satuan." },
    { teks: `${lambang(7064)} dibaca ${kata(7064)}.`, benar: true, penjelasan: "Ratusannya 0 sehingga dilewati. Lalu puluhan dan satuan disebut." },
    { teks: "Bilangan terbesar yang ditulis dengan empat angka adalah 9.999.", benar: true, penjelasan: "Satu lagi dari 9.999 adalah 10.000, yang memakai lima angka." },
  ],
];

export type SoalDetektif = { klue: string[]; jawab: number; opsi: number[]; salah: string };
export const RONDE_DETEKTIF_QA: SoalDetektif[] = [
  { klue: ["Ribuan saya 6", "Satuan saya 9"], jawab: 6419, opsi: [6419, 6491, 9416], salah: "Hanya 6.419 yang ribuannya 6 dan satuannya 9." },
  { klue: ["Ribuan saya 8", "Ratusan dan puluhan saya sama-sama 0"], jawab: 8007, opsi: [8007, 8070, 7008], salah: "8.007 punya angka 8 di ribuan, kosong di ratusan dan puluhan, lalu angka 7 di satuan." },
  { klue: ["Saya dibaca empat ribu enam ratus tiga puluh", "Jumlah semua angka saya 13"], jawab: 4630, opsi: [4630, 4360, 3604], salah: "4.630 dibaca empat ribu enam ratus tiga puluh, dan 4 + 6 + 3 + 0 = 13." },
  { klue: ["Ribuan saya 3 dan ratusan saya 5", "Puluhan saya 0"], jawab: 3502, opsi: [3502, 3520, 5302], salah: "3.502 punya 3 ribuan, 5 ratusan, dan 0 puluhan." },
];

export const RONDE_SEMUA_QA: RondeSemua[] = [
  { syarat: "ribuan-3", angka: [3480, 5163, 3906, 8305] },
  { syarat: "ratusan-nol", angka: [4056, 7108, 9007, 2630] },
  { syarat: "satuan-nol", angka: [6240, 3815, 9170, 5426] },
];

export const RONDE_SUSUNKATA_QA: { kata: string[]; pengecoh: string }[] = [
  { kata: ["lima", "ribu", "seratus", "dua", "puluh", "tiga", "ditulis", "5.123"], pengecoh: "sembilan" },
  { kata: ["delapan", "ribu", "tujuh", "ditulis", "8.007"], pengecoh: "ratus" },
  { kata: ["nol", "tidak", "disebut", "tetapi", "tetap", "ditulis"], pengecoh: "dihapus" },
  { kata: ["satu", "peti", "dapat", "dibuka", "menjadi", "sepuluh", "dus"], pengecoh: "seratus" },
];

