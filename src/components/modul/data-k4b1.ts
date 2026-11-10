/**
 * Data murni Matematika Kelas 4 Bab 1 (Bilangan Cacah sampai 10.000): kata bilangan empat angka,
 * nilai tempat ribuan–satuan, dan semua ronde permainan Sub-Bab A (membaca & menulis), B (nilai tempat),
 * dan C (membandingkan & mengurutkan). Tanpa React, tanpa acak, tanpa jaringan.
 * Sumber angka dari Buku Siswa Matematika Kelas IV Kemendikbudristek Bab 1 hlm. 4–23.
 * Uji: scripts/uji-data-k4b1.mjs.
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

/** Kata bilangan Indonesia 0–10.000. 3.286 = tiga ribu dua ratus delapan puluh enam; 1.025 = seribu dua puluh lima. */
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
/* Angka contoh dari buku                                                   */
/* ====================================================================== */

export const BUKU = {
  jarakHelen: 3286,
  hargaMinuman: 6750,
  semeru: 3676,
  tulisContoh: 3254,
  baca4327: 4327,
  baca1025: 1025,
  harga7350: 7350,
  uang9500: 9500,
  kembalian2150: 2150,
  jodoh: [2903, 2145, 6002, 9045] as const,
  nilai2150: 2150,
  tabel: [6192, 2910, 4128, 9217] as const,
  manggis: 7500,
  apel: 6750,
  kiosA: 7500,
  kiosB: 8750,
  banding: [
    [8750, 7500],
    [4352, 4365],
    [4352, 4355],
    [4352, 4352],
  ] as const,
  latihanBanding: [
    [5734, 4312],
    [5614, 5368],
    [7124, 7197],
  ] as const,
  tanda: [
    [4435, 3345],
    [9999, 9998],
    [1001, 1002],
    [8765, 8765],
    [4567, 5787],
    [7654, 7777],
  ] as const,
  gunung: [3676, 2460, 3726] as const,
  urutLatihan: [7570, 5240, 3041, 9941] as const,
  kartu1592: [1, 5, 9, 2] as const,
} as const;

/* ====================================================================== */
/* SUB-BAB A — Concrete                                                     */
/* ====================================================================== */

export const RONDE_RAKIT_CA: Bundel[][] = [
  [
    { n: 3286, benda: "jeruk" },
    { n: 2145, benda: "jeruk" },
  ],
  [
    { n: 3676, benda: "kelereng" },
    { n: 1025, benda: "kelereng" },
  ],
  [
    { n: 6750, benda: "kue" },
    { n: 4327, benda: "kue" },
  ],
];

export const RONDE_HITUNG_CA: Bundel[][] = [
  [
    { n: 3286, benda: "jeruk" },
    { n: 2903, benda: "jeruk" },
  ],
  [
    { n: 7350, benda: "kue" },
    { n: 2150, benda: "kue" },
  ],
  [
    { n: 6002, benda: "kelereng" },
    { n: 9045, benda: "kelereng" },
  ],
];

export type Kelompok4 = { jenis: "rb" | "r" | "p" | "s"; k: number };
export const RONDE_SORTIR_CA: { benda: BendaId; item: Kelompok4[] }[] = [
  {
    benda: "jeruk",
    item: [
      { jenis: "rb", k: 3 },
      { jenis: "r", k: 2 },
      { jenis: "p", k: 8 },
      { jenis: "s", k: 6 },
      { jenis: "rb", k: 1 },
      { jenis: "p", k: 0 },
    ],
  },
  {
    benda: "kue",
    item: [
      { jenis: "rb", k: 7 },
      { jenis: "r", k: 3 },
      { jenis: "p", k: 5 },
      { jenis: "s", k: 0 },
      { jenis: "r", k: 0 },
      { jenis: "s", k: 5 },
    ],
  },
  {
    benda: "kelereng",
    item: [
      { jenis: "rb", k: 4 },
      { jenis: "r", k: 3 },
      { jenis: "p", k: 2 },
      { jenis: "s", k: 7 },
      { jenis: "rb", k: 6 },
      { jenis: "r", k: 5 },
    ],
  },
];

export const RONDE_PASANG_CA: Bundel[][] = [
  [
    { n: 3286, benda: "jeruk" },
    { n: 2145, benda: "jeruk" },
    { n: 6002, benda: "jeruk" },
  ],
  [
    { n: 7350, benda: "kue" },
    { n: 9500, benda: "kue" },
    { n: 2150, benda: "kue" },
  ],
  [
    { n: 3676, benda: "kelereng" },
    { n: 4327, benda: "kelereng" },
    { n: 1025, benda: "kelereng" },
  ],
];

export const RONDE_MEMORI_CA: Bundel[][] = [
  [
    { n: 3286, benda: "jeruk" },
    { n: 2145, benda: "jeruk" },
    { n: 2903, benda: "jeruk" },
    { n: 6002, benda: "jeruk" },
  ],
  [
    { n: 7350, benda: "kue" },
    { n: 2150, benda: "kue" },
    { n: 9045, benda: "kue" },
    { n: 1025, benda: "kue" },
  ],
  [
    { n: 3676, benda: "kelereng" },
    { n: 4327, benda: "kelereng" },
    { n: 6750, benda: "kelereng" },
    { n: 9500, benda: "kelereng" },
  ],
];

export type RondeKetuk = { benda: BendaId; item: number[]; tanya: number[] };
export const RONDE_KETUK_CA: RondeKetuk[] = [
  { benda: "jeruk", item: [3286, 2386, 3826], tanya: [3286, 2386] },
  { benda: "kue", item: [7350, 7530, 3750], tanya: [7350, 3750] },
  { benda: "kelereng", item: [1025, 1205, 2015], tanya: [1025, 2015] },
];

export const RONDE_SEMUA_CA: RondeSemua[] = [
  { syarat: "puluhan-nol", angka: [2150, 3286, 9500, 4327], benda: "jeruk" },
  { syarat: "ratusan-nol", angka: [1025, 6002, 3676, 2145], benda: "kue" },
  { syarat: "satuan-nol", angka: [7350, 9500, 3286, 4327], benda: "kelereng" },
];

export const RONDE_BACA_CA: Bundel[][] = [
  [
    { n: 3286, benda: "jeruk" },
    { n: 7003, benda: "jeruk" },
  ],
  [
    { n: 6570, benda: "kue" },
    { n: 1025, benda: "kue" },
  ],
  [
    { n: 9045, benda: "kelereng" },
    { n: 6002, benda: "kelereng" },
  ],
];

export const RONDE_PAPAN_CA: Bundel[][] = [
  [
    { n: 3286, benda: "jeruk" },
    { n: 3254, benda: "jeruk" },
  ],
  [
    { n: 3676, benda: "kue" },
    { n: 4327, benda: "kue" },
  ],
  [
    { n: 2150, benda: "kelereng" },
    { n: 1025, benda: "kelereng" },
  ],
];

export type SoalTukar = { tanya: string; benar: string; salah: [string, string]; pesan: string };
export const RONDE_TUKAR_CA: { benda: BendaId; soal: SoalTukar[] }[] = [
  {
    benda: "jeruk",
    soal: [
      { tanya: "10 dus ditukar menjadi …", benar: "1 peti (1.000)", salah: ["1 bungkus", "10 peti"], pesan: "Sepuluh dus (10 × 100) sama dengan satu peti (1.000)." },
      { tanya: "1 peti berisi … dus", benar: "10 dus", salah: ["100 dus", "1 dus"], pesan: "Satu peti sama dengan sepuluh dus." },
    ],
  },
  {
    benda: "kue",
    soal: [
      { tanya: "10 bungkus ditukar menjadi …", benar: "1 dus (100)", salah: ["1 peti", "10 satuan"], pesan: "Sepuluh bungkus sama dengan satu dus." },
      { tanya: "10 satuan ditukar menjadi …", benar: "1 bungkus (10)", salah: ["1 dus", "1 peti"], pesan: "Sepuluh satuan sama dengan satu bungkus." },
    ],
  },
  {
    benda: "kelereng",
    soal: [
      { tanya: "1 dus berisi … bungkus", benar: "10 bungkus", salah: ["100 bungkus", "1 bungkus"], pesan: "Satu dus sama dengan sepuluh bungkus." },
      { tanya: "1000 satuan sama dengan …", benar: "1 peti", salah: ["1 dus", "10 bungkus"], pesan: "Seribu satuan sama dengan satu peti." },
    ],
  },
];

/* ====================================================================== */
/* SUB-BAB A — Picture                                                      */
/* ====================================================================== */

export const RONDE_HITUNG_PA: number[][] = [
  [3286, 2145],
  [3676, 1025],
  [7350, 4327],
];
export const RONDE_PAPAN_PA: number[][] = [
  [3286, 3254],
  [2150, 4327],
  [6192, 2910],
];
export const RONDE_TABEL_PA: number[][] = [
  [3286, 2145, 6002],
  [7350, 2150, 9045],
  [3676, 4327, 1025],
];
export const RONDE_PASANG_PA: number[][] = [
  [3286, 2145, 2903],
  [7350, 9500, 2150],
  [3676, 4327, 1025],
];
export const RONDE_MEMORI_PA: number[][] = [
  [1000, 2000, 3000, 4000],
  [1100, 2200, 3300, 4400],
  [1025, 2150, 3286, 4327],
];
export const RONDE_KETUK_PA: { item: number[]; tanya: number[] }[] = [
  { item: [3286, 2386, 3826], tanya: [3286, 2386] },
  { item: [7350, 7530, 3750], tanya: [7350, 3750] },
  { item: [1025, 1205, 2015], tanya: [1025, 2015] },
];

export type SoalGarisK4 = { dari: number; sampai: number; langkah: number; jawab: number };
export const RONDE_GARIS_PA: SoalGarisK4[][] = [
  [
    { dari: 3000, sampai: 4000, langkah: 100, jawab: 3286 },
    { dari: 2000, sampai: 3000, langkah: 100, jawab: 2145 },
  ],
  [
    { dari: 3500, sampai: 3800, langkah: 10, jawab: 3676 },
    { dari: 1000, sampai: 1100, langkah: 5, jawab: 1025 },
  ],
  [
    { dari: 7000, sampai: 8000, langkah: 100, jawab: 7350 },
    { dari: 9000, sampai: 9600, langkah: 100, jawab: 9500 },
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
  { syarat: "puluhan-nol", angka: [2150, 3286, 9500, 4327] },
  { syarat: "ratusan-nol", angka: [1025, 6002, 3676, 2145] },
  { syarat: "angka-nol", angka: [3286, 1025, 4327, 2145] },
];
export const RONDE_SORTIR_PA: number[][] = [
  [1025, 2340, 3600, 7821, 5080, 6192],
  [4200, 2531, 9050, 3160, 7400, 8712],
  [1500, 6032, 4820, 9201, 3370, 7050],
];
export const RONDE_KALIMAT_PA: number[] = [3286, 1025, 7350];

export type KalimatIsian = { depan: string; belakang: string; opsi: string[]; benar: number };
export function kalimatTempat(n: number, nomor: number): KalimatIsian[] {
  const d = empat(n);
  const a = susunOpsi(String(d.rb), [String((d.rb + 1) % 10), String((d.rb + 2) % 10)], nomor);
  const b = susunOpsi(String(d.r), [String((d.r + 1) % 10), String((d.r + 3) % 10)], nomor + 1);
  const c = susunOpsi(String(nilaiTempat(n, "ribuan")), [String(d.rb * 100), String(d.rb * 10)], nomor + 2);
  return [
    { depan: `Pada ${lambang(n)}, angka ribuan adalah`, belakang: ".", opsi: a.opsi, benar: a.jawab },
    { depan: `Pada ${lambang(n)}, angka ratusan adalah`, belakang: ".", opsi: b.opsi, benar: b.jawab },
    { depan: `Nilai tempat angka ${d.rb} pada ${lambang(n)} adalah`, belakang: ".", opsi: c.opsi, benar: c.jawab },
  ];
}

/* ====================================================================== */
/* SUB-BAB A — Abstract                                                     */
/* ====================================================================== */

export const RONDE_SUSUN_QA: number[][] = [
  [3286, 3254],
  [3676, 1025],
  [4327, 2145],
];
export const RONDE_BACA_QA: number[][] = [
  [3286, 7003],
  [6570, 1025],
  [9045, 6002],
];
export const RONDE_PAPAN_QA: number[][] = [
  [3254, 3676],
  [2150, 4327],
  [7350, 9500],
];
export const RONDE_PASANG_QA: number[][] = [
  [2903, 2145, 6002],
  [9045, 3286, 1025],
  [7350, 9500, 2150],
];
export const RONDE_MEMORI_QA: number[][] = [
  [3050, 4200, 5160, 6400],
  [2180, 3500, 7090, 8600],
  [1450, 2600, 4080, 9350],
];

export type TabelKata = { kepala: [string, string]; baris: { label: string; jawab: string }[]; kartu: string[] };
function tabelKata(daftar: number[], nomor: number): TabelKata {
  const baris = daftar.map((n) => ({ label: lambang(n), jawab: kata(n) }));
  const pengecoh = kata(pengecoh4(daftar[0])[0]);
  const kartu = urutanTetap(daftar.length + 1, 2, nomor).map((i) => (i < daftar.length ? kata(daftar[i]) : pengecoh));
  return { kepala: ["Bilangan", "Cara membaca"], baris, kartu };
}
export const RONDE_TABEL_QA: TabelKata[] = [
  tabelKata([3286, 2145, 6002, 9045], 1),
  tabelKata([7350, 2150, 1025, 4327], 2),
  tabelKata([3676, 9500, 2903, 6192], 3),
];

export type Pernyataan = { teks: string; benar: boolean; penjelasan: string };
export const RONDE_BENARSALAH_QA: Pernyataan[][] = [
  [
    { teks: `${lambang(3286)} dibaca ${kata(3286)}.`, benar: true, penjelasan: "Ribuan, ratusan, puluhan, dan satuan dibaca dari kiri." },
    { teks: `${lambang(7003)} dibaca tujuh ribu nol nol tiga.`, benar: false, penjelasan: "Nol tidak dibaca. Yang benar: tujuh ribu tiga." },
    { teks: "Satu ribu ditulis seribu, bukan satu ribu.", benar: true, penjelasan: "Pada ribuan 1 dipakai kata seribu." },
    { teks: `${lambang(1025)} punya angka ratusan 0.`, benar: true, penjelasan: "1.025 = 1 ribuan, 0 ratusan, 2 puluhan, 5 satuan." },
    { teks: "Angka nol tidak perlu ditulis saat menulis lambang bilangan.", benar: false, penjelasan: "Nol menjaga tempat. Empat ratus lima ditulis 405, bukan 45." },
  ],
  [
    { teks: "10 dus sama dengan 1 peti.", benar: true, penjelasan: "10 × 100 = 1.000." },
    { teks: `${lambang(6570)} satuan dibaca karena angkanya 0.`, benar: false, penjelasan: "Satuan 0 tidak dibaca." },
    { teks: "Membaca bilangan empat angka dimulai dari ribuan.", benar: true, penjelasan: "Dari kiri: ribuan → ratusan → puluhan → satuan." },
    { teks: `${lambang(4327)} = empat ribu tiga ratus dua puluh tujuh.`, benar: true, penjelasan: "Sesuai Buku Siswa hlm. 9." },
    { teks: "Bilangan 10.000 punya lima angka.", benar: true, penjelasan: "10.000 adalah sepuluh ribu, batas atas bab ini." },
  ],
];

export type SoalDetektif = { klue: string[]; jawab: number; opsi: number[]; salah: string };
export const RONDE_DETEKTIF_QA: SoalDetektif[] = [
  { klue: ["Ribuan saya 3", "Satuan saya 6"], jawab: 3286, opsi: [3286, 3268, 2386], salah: "Hanya 3.286 yang ribuannya 3 dan satuannya 6." },
  { klue: ["Ratusan saya 0", "Puluhan saya 2"], jawab: 1025, opsi: [1025, 1205, 2015], salah: "1.025 = seribu dua puluh lima." },
  { klue: ["Saya dibaca tujuh ribu tiga ratus lima puluh", "Satuan saya 0"], jawab: 7350, opsi: [7350, 7530, 3705], salah: "7.350 cocok dengan bacaan dan satuan 0." },
  { klue: ["Nilai tempat angka 9 saya adalah 9.000", "Puluhan saya 0"], jawab: 9045, opsi: [9045, 9405, 4905], salah: "9.045 punya 9 ribuan dan 0 puluhan." },
];

export const RONDE_SEMUA_QA: RondeSemua[] = [
  { syarat: "ribuan-3", angka: [3286, 2145, 3676, 4327] },
  { syarat: "ratusan-nol", angka: [1025, 6002, 3286, 2145] },
  { syarat: "satuan-nol", angka: [7350, 2150, 4327, 3676] },
];

export const RONDE_SUSUNKATA_QA: { kata: string[]; pengecoh: string }[] = [
  { kata: ["tiga", "ribu", "dua", "ratus", "delapan", "puluh", "enam", "ditulis", "3.286"], pengecoh: "tujuh" },
  { kata: ["seribu", "dua", "puluh", "lima", "ditulis", "1.025"], pengecoh: "ratus" },
  { kata: ["angka", "nol", "tidak", "dibaca", "tapi", "menjaga", "tempat"], pengecoh: "dihapus" },
  { kata: ["sepuluh", "dus", "sama", "dengan", "satu", "peti"], pengecoh: "bungkus" },
];

/* ====================================================================== */
/* SUB-BAB B — nilai tempat                                                 */
/* ====================================================================== */

export const RONDE_NILAI_CB: { n: number; tempat: Tempat; benda: BendaId }[][] = [
  [
    { n: 2150, tempat: "ribuan", benda: "jeruk" },
    { n: 2150, tempat: "ratusan", benda: "jeruk" },
  ],
  [
    { n: 7350, tempat: "puluhan", benda: "kue" },
    { n: 9500, tempat: "ribuan", benda: "kue" },
  ],
  [
    { n: 3286, tempat: "satuan", benda: "kelereng" },
    { n: 4327, tempat: "ratusan", benda: "kelereng" },
  ],
];

export const RONDE_SUSUN_CB: number[][] = [
  [2150, 7812],
  [7350, 9500],
  [6192, 4128],
];
export const RONDE_URAI_CB: number[][] = [
  [2150, 3286],
  [7350, 1025],
  [4327, 9045],
];
export const RONDE_TABEL_CB: number[][] = [
  [7812, 2150, 3286],
  [7350, 9500, 2150],
  [6192, 2910, 4128],
];
export const RONDE_PASANG_CB: { n: number; tempat: Tempat }[][] = [
  [
    { n: 2150, tempat: "ribuan" },
    { n: 2150, tempat: "ratusan" },
    { n: 2150, tempat: "puluhan" },
  ],
  [
    { n: 7350, tempat: "ribuan" },
    { n: 7350, tempat: "ratusan" },
    { n: 7350, tempat: "satuan" },
  ],
  [
    { n: 8463, tempat: "ribuan" },
    { n: 4675, tempat: "ratusan" },
    { n: 1236, tempat: "puluhan" },
  ],
];
export const RONDE_MEMORI_CB: number[][] = [
  [2000, 100, 50, 0],
  [7000, 300, 50, 0],
  [3000, 200, 80, 6],
];
export const RONDE_KETUK_CB: { n: number; tanya: Tempat[] }[] = [
  { n: 2150, tanya: ["ribuan", "satuan"] },
  { n: 7350, tanya: ["ratusan", "puluhan"] },
  { n: 8463, tanya: ["ribuan", "satuan"] },
];
export const RONDE_SEMUA_CB: RondeSemua[] = [
  { syarat: "ribuan-lebih-5", angka: [2150, 7350, 9500, 4327], benda: "jeruk" },
  { syarat: "ratusan-2", angka: [2150, 3286, 7350, 9045], benda: "kue" },
  { syarat: "angka-nol", angka: [2150, 3286, 4327, 6192], benda: "kelereng" },
];
export const RONDE_PAPAN_CB: number[][] = [
  [2150, 7812],
  [7350, 9500],
  [6192, 9217],
];
export const RONDE_ANGKA6_CB: { n: number; tempat: Tempat }[][] = [
  [
    { n: 8463, tempat: "puluhan" },
    { n: 4675, tempat: "ratusan" },
  ],
  [
    { n: 6789, tempat: "ribuan" },
    { n: 1236, tempat: "satuan" },
  ],
  [
    { n: 6540, tempat: "ratusan" },
    { n: 1606, tempat: "satuan" },
  ],
];

export const RONDE_NILAI_PB: { n: number; tempat: Tempat }[][] = [
  [
    { n: 2150, tempat: "ribuan" },
    { n: 2150, tempat: "puluhan" },
  ],
  [
    { n: 7350, tempat: "ratusan" },
    { n: 9500, tempat: "ribuan" },
  ],
  [
    { n: 6192, tempat: "puluhan" },
    { n: 4128, tempat: "satuan" },
  ],
];
export const RONDE_PAPAN_PB: number[][] = [
  [2150, 3286],
  [7350, 1025],
  [6192, 9217],
];
export const RONDE_TABEL_PB: number[][] = [
  [6192, 2910, 4128],
  [9217, 2150, 7350],
  [3286, 9045, 1025],
];
export const RONDE_PASANG_PB: number[][] = [
  [2150, 3286, 7350],
  [9500, 1025, 4327],
  [6192, 2910, 4128],
];
export const RONDE_MEMORI_PB: number[][] = [
  [2000, 150, 50, 2150],
  [7000, 300, 50, 7350],
  [6000, 100, 90, 2],
];
export const RONDE_URAI_PB: number[][] = [
  [2150, 3286],
  [7350, 9045],
  [6192, 4128],
];
export const RONDE_SEMUA_PB: RondeSemua[] = [
  { syarat: "ribuan-3", angka: [3286, 2150, 3676, 4327] },
  { syarat: "puluhan-nol", angka: [2150, 9500, 3286, 4327] },
  { syarat: "ratusan-nol", angka: [1025, 6002, 3286, 2145] },
];
export const RONDE_SORTIR_PB: number[][] = [
  [1025, 2340, 3600, 7821, 5080, 6192],
  [4200, 2531, 9050, 3160, 7400, 8712],
  [1500, 6032, 4820, 9201, 3370, 7050],
];
export const RONDE_KALIMAT_PB: number[] = [2150, 7350, 6192];
export const RONDE_KETUK_PB: { item: number[]; tanya: number[] }[] = [
  { item: [2000, 100, 50, 0], tanya: [2000, 50] },
  { item: [7000, 300, 50, 0], tanya: [7000, 300] },
  { item: [6000, 100, 90, 2], tanya: [90, 2] },
];

export const RONDE_SUSUN_QB: number[][] = [
  [2150, 7812],
  [7350, 9500],
  [6192, 4128],
];
export const RONDE_NILAI_QB: { n: number; tempat: Tempat }[][] = [
  [
    { n: 2150, tempat: "ribuan" },
    { n: 2150, tempat: "ratusan" },
  ],
  [
    { n: 7350, tempat: "puluhan" },
    { n: 9500, tempat: "ribuan" },
  ],
  [
    { n: 8463, tempat: "puluhan" },
    { n: 4675, tempat: "ratusan" },
  ],
];
export const RONDE_PAPAN_QB: number[][] = [
  [2150, 3286],
  [7350, 1025],
  [9217, 4128],
];
export const RONDE_PASANG_QB: { n: number; tempat: Tempat }[][] = RONDE_PASANG_CB;
export const RONDE_MEMORI_QB: number[][] = [
  [2000, 100, 50, 0],
  [9000, 500, 0, 0],
  [3000, 200, 80, 6],
];
export const RONDE_TABEL_QB: number[][] = [
  [6192, 2910, 4128, 9217],
  [2150, 7350, 9500, 3286],
  [1025, 4327, 9045, 6002],
];
export const RONDE_BENARSALAH_QB: Pernyataan[][] = [
  [
    { teks: `Pada ${lambang(2150)}, angka 2 menempati nilai tempat ribuan.`, benar: true, penjelasan: "2.150: 2 ribuan, 1 ratusan, 5 puluhan, 0 satuan." },
    { teks: `Nilai tempat angka 1 pada ${lambang(2150)} adalah 1.`, benar: false, penjelasan: "Angka 1 di ratusan bernilai 100." },
    { teks: "Tabel nilai tempat diisi angka digit, bukan nilai penuh.", benar: true, penjelasan: "Untuk 7.812 ditulis 7 | 8 | 1 | 2, bukan 7000 | 800 | 10 | 2." },
    { teks: `Uraian ${lambang(2150)} adalah 2000 + 100 + 50 + 0.`, benar: true, penjelasan: "Expanded form menurut nilai tempat." },
    { teks: "Angka 0 pada satuan tidak punya tempat.", benar: false, penjelasan: "Nol tetap menjaga tempat satuan." },
  ],
  [
    { teks: `Pada 8.463, angka 6 ada di puluhan.`, benar: true, penjelasan: "8 ribuan, 4 ratusan, 6 puluhan, 3 satuan." },
    { teks: "Nilai tempat dan angka tempat itu sama.", benar: false, penjelasan: "Angka tempat = digit; nilai tempat = digit × bobot." },
    { teks: `Angka 6 pada 4.675 bernilai 600.`, benar: true, penjelasan: "6 di ratusan → 600." },
    { teks: "Ribuan selalu di sebelah kanan.", benar: false, penjelasan: "Ribuan di kiri pada bilangan empat angka." },
    { teks: `${lambang(9500)} = 9 ribuan + 5 ratusan + 0 puluhan + 0 satuan.`, benar: true, penjelasan: "Susunan nilai tempat." },
  ],
];
export const RONDE_DETEKTIF_QB: SoalDetektif[] = [
  { klue: ["Nilai tempat ribuan saya 7.000", "Nilai puluhan saya 50"], jawab: 7350, opsi: [7350, 7530, 3750], salah: "7.350 = 7000 + 300 + 50 + 0." },
  { klue: ["Angka ratusan saya 1", "Saya kurang dari 3.000"], jawab: 2150, opsi: [2150, 3150, 1250], salah: "2.150 cocok." },
  { klue: ["Uraian saya 6000 + 100 + 90 + 2", "Ribuan saya 6"], jawab: 6192, opsi: [6192, 6912, 1692], salah: "6.192 sesuai uraian." },
  { klue: ["Angka 6 saya bernilai 60", "Ribuan saya 8"], jawab: 8463, opsi: [8463, 8643, 4863], salah: "Pada 8.463, angka 6 di puluhan = 60." },
];
export const RONDE_SEMUA_QB: RondeSemua[] = [
  { syarat: "ribuan-lebih-5", angka: [2150, 7350, 9500, 4327] },
  { syarat: "ratusan-2", angka: [2150, 3286, 1236, 9045] },
  { syarat: "angka-nol", angka: [2150, 3286, 4327, 6192] },
];
export const RONDE_SUSUNKATA_QB: { kata: string[]; pengecoh: string }[] = [
  { kata: ["angka", "2", "pada", "2.150", "bernilai", "2.000"], pengecoh: "200" },
  { kata: ["nilai", "tempat", "ribuan", "ratusan", "puluhan", "satuan"], pengecoh: "jutaan" },
  { kata: ["uraian", "2.150", "adalah", "2000", "+", "100", "+", "50", "+", "0"], pengecoh: "215" },
  { kata: ["nol", "menjaga", "tempat", "yang", "kosong"], pengecoh: "dihapus" },
];

/* ====================================================================== */
/* SUB-BAB C — bandingkan & urutkan                                         */
/* ====================================================================== */

export type Pasangan = { a: number; b: number; benda?: BendaId };
export const RONDE_BANDING_CC: Pasangan[][] = [
  [
    { a: 7500, b: 8750, benda: "jeruk" },
    { a: 6750, b: 7500, benda: "jeruk" },
  ],
  [
    { a: 4352, b: 4365, benda: "kue" },
    { a: 4352, b: 4355, benda: "kue" },
  ],
  [
    { a: 5734, b: 4312, benda: "kelereng" },
    { a: 7124, b: 7197, benda: "kelereng" },
  ],
];

export type Relasi = ">" | "<" | "=";
export function relasi(a: number, b: number): Relasi {
  if (a > b) return ">";
  if (a < b) return "<";
  return "=";
}
export function kataRelasi(t: Relasi): string {
  return t === ">" ? "lebih dari" : t === "<" ? "kurang dari" : "sama dengan";
}
export function tempatBeda(a: number, b: number): Tempat | "sama" {
  const x = empat(a);
  const y = empat(b);
  if (x.rb !== y.rb) return "ribuan";
  if (x.r !== y.r) return "ratusan";
  if (x.p !== y.p) return "puluhan";
  if (x.s !== y.s) return "satuan";
  return "sama";
}

export const RONDE_TANDA_CC: Pasangan[][] = RONDE_BANDING_CC;
export const RONDE_URUT_CC: { angka: number[]; dari: "kecil" | "besar"; benda: BendaId }[] = [
  { angka: [3676, 2460, 3726, 3000], dari: "kecil", benda: "jeruk" },
  { angka: [7570, 5240, 3041, 9941], dari: "kecil", benda: "kue" },
  { angka: [8750, 7500, 6750, 9500], dari: "besar", benda: "kelereng" },
];
export const RONDE_PALING_CC: { angka: number[]; benda: BendaId }[] = [
  { angka: [3676, 2460, 3726, 3000], benda: "jeruk" },
  { angka: [7570, 5240, 3041, 9941], benda: "kue" },
  { angka: [8750, 7500, 6750, 2150], benda: "kelereng" },
];
export const RONDE_JODOH_CC: Pasangan[][] = [
  [
    { a: 8750, b: 7500 },
    { a: 4352, b: 4365 },
    { a: 4352, b: 4352 },
  ],
  [
    { a: 5734, b: 4312 },
    { a: 5614, b: 5368 },
    { a: 8765, b: 8765 },
  ],
  [
    { a: 1001, b: 1002 },
    { a: 9999, b: 9998 },
    { a: 4567, b: 5787 },
  ],
];
export const RONDE_SLOT_CC: number[][] = [
  [2460, 3676, 3726],
  [3041, 5240, 7570],
  [6750, 7500, 8750],
];
export const RONDE_SEMUA_CC: RondeSemua[] = [
  { syarat: "lebih", angka: [7500, 8750, 6750, 2150], acuan: 7000, benda: "jeruk" },
  { syarat: "kurang", angka: [4352, 4365, 4355, 5000], acuan: 4360, benda: "kue" },
  { syarat: "lebih", angka: [3041, 5240, 7570, 9941], acuan: 5000, benda: "kelereng" },
];
export const RONDE_SAMA_RB_CC: Pasangan[][] = [
  [
    { a: 4352, b: 4365, benda: "jeruk" },
    { a: 4352, b: 4355, benda: "jeruk" },
  ],
  [
    { a: 5614, b: 5368, benda: "kue" },
    { a: 7124, b: 7197, benda: "kue" },
  ],
  [
    { a: 8765, b: 8775, benda: "kelereng" },
    { a: 7654, b: 7777, benda: "kelereng" },
  ],
];
export const RONDE_ANTARA_CC: { rendah: number; tinggi: number; opsi: number[]; jawab: number; benda: BendaId }[] = [
  { rendah: 2460, tinggi: 3726, opsi: [3676, 4000, 2000], jawab: 3676, benda: "jeruk" },
  { rendah: 3041, tinggi: 7570, opsi: [5240, 8000, 2000], jawab: 5240, benda: "kue" },
  { rendah: 6750, tinggi: 8750, opsi: [7500, 9000, 6000], jawab: 7500, benda: "kelereng" },
];
export const RONDE_CERITA_CC: { nama: [string, string, string]; angka: [number, number, number]; tanya: ("banyak" | "sedikit")[] }[] = [
  { nama: ["Sinabung", "Semeru", "Rinjani"], angka: [2460, 3676, 3726], tanya: ["banyak", "sedikit"] },
  { nama: ["Kios A", "Kios B", "Kios C"], angka: [7500, 8750, 6750], tanya: ["sedikit", "banyak"] },
  { nama: ["Slamet", "Helen", "Azizah"], angka: [7350, 9500, 2150], tanya: ["banyak", "sedikit"] },
];

export const RONDE_BANDING_PC: Pasangan[][] = RONDE_BANDING_CC.map((ro) => ro.map(({ a, b }) => ({ a, b })));
export const RONDE_TANDA_PC: Pasangan[][] = RONDE_TANDA_CC.map((ro) => ro.map(({ a, b }) => ({ a, b })));
export const RONDE_TABEL_TANDA_PC: Pasangan[][] = [
  [
    { a: 4435, b: 3345 },
    { a: 9999, b: 9998 },
    { a: 1001, b: 1002 },
    { a: 8765, b: 8765 },
  ],
  [
    { a: 4567, b: 5787 },
    { a: 7654, b: 7777 },
    { a: 8750, b: 7500 },
    { a: 4352, b: 4352 },
  ],
  [
    { a: 5734, b: 4312 },
    { a: 5614, b: 5368 },
    { a: 7124, b: 7197 },
    { a: 4352, b: 4365 },
  ],
];
export const RONDE_URUT_PC: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [3676, 2460, 3726], dari: "kecil" },
  { angka: [7570, 5240, 3041, 9941], dari: "kecil" },
  { angka: [8750, 7500, 6750], dari: "besar" },
];
export const RONDE_JODOH_PC: Pasangan[][] = RONDE_JODOH_CC;
export const RONDE_PALING_PC: number[][] = [
  [3676, 2460, 3726, 3000],
  [7570, 5240, 3041, 9941],
  [8750, 7500, 6750, 2150],
];
export const RONDE_SEMUA_PC: RondeSemua[] = RONDE_SEMUA_CC;
export const RONDE_SORTIR_PC: number[][] = [
  [2460, 3676, 3726, 5000, 1500, 8000],
  [3041, 5240, 7570, 9941, 2000, 6000],
  [6750, 7500, 8750, 2150, 9500, 4000],
];
export const RONDE_KALIMAT_PC: Pasangan[] = [
  { a: 8750, b: 7500 },
  { a: 4352, b: 4365 },
  { a: 4352, b: 4352 },
];
export const RONDE_SLOT_PC: number[][] = RONDE_SLOT_CC;

export const RONDE_BANDING_QC: Pasangan[][] = [
  [
    { a: 5734, b: 4312 },
    { a: 5614, b: 5368 },
  ],
  [
    { a: 7124, b: 7197 },
    { a: 9999, b: 9998 },
  ],
  [
    { a: 1001, b: 1002 },
    { a: 8765, b: 8765 },
  ],
];
export const RONDE_TABEL_QC: Pasangan[][] = RONDE_TABEL_TANDA_PC;
export const RONDE_TEMPAT_QC: Pasangan[][] = [
  [
    { a: 8750, b: 7500 },
    { a: 4352, b: 4365 },
  ],
  [
    { a: 4352, b: 4355 },
    { a: 5614, b: 5368 },
  ],
  [
    { a: 7124, b: 7197 },
    { a: 4352, b: 4352 },
  ],
];
export const RONDE_URUT_QC: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [7570, 5240, 3041, 9941], dari: "kecil" },
  { angka: [3676, 2460, 3726, 3000], dari: "besar" },
  { angka: [1592, 9152, 5192, 2951], dari: "kecil" },
];
export const RONDE_JODOH_QC: Pasangan[][] = RONDE_JODOH_CC;
export const RONDE_BENARSALAH_QC: Pernyataan[][] = [
  [
    { teks: `${lambang(8750)} > ${lambang(7500)} karena ribuan 8 lebih dari 7.`, benar: true, penjelasan: "Bandingkan ribuan lebih dulu." },
    { teks: `${lambang(4352)} > ${lambang(4365)}.`, benar: false, penjelasan: "Ribuan dan ratusan sama; puluhan 5 < 6, jadi 4.352 < 4.365." },
    { teks: "Jika semua tempat sama, tulis tanda =.", benar: true, penjelasan: "4.352 = 4.352." },
    { teks: "Mengurutkan selalu dari terbesar ke terkecil saja.", benar: false, penjelasan: "Bisa dari terkecil ke terbesar atau sebaliknya." },
    { teks: "Bila ribuan sama, lanjut bandingkan ratusan.", benar: true, penjelasan: "Urutan: ribuan → ratusan → puluhan → satuan." },
  ],
  [
    { teks: `Urutan naik gunung: ${lambang(2460)}, ${lambang(3676)}, ${lambang(3726)}.`, benar: true, penjelasan: "Dari terkecil ke terbesar sesuai Buku Siswa." },
    { teks: "Tanda > dibaca kurang dari.", benar: false, penjelasan: "> dibaca lebih dari; < dibaca kurang dari." },
    { teks: `${lambang(1001)} < ${lambang(1002)}.`, benar: true, penjelasan: "Satuan 1 < 2." },
    { teks: "Kartu 1,5,9,2 bilangan terbesar tanpa ulang adalah 9.521.", benar: true, penjelasan: "Susun digit dari besar ke kecil." },
    { teks: "Membandingkan dimulai dari satuan.", benar: false, penjelasan: "Dimulai dari ribuan (kiri)." },
  ],
];
export const RONDE_DETEKTIF_QC: SoalDetektif[] = [
  { klue: ["Saya lebih dari 3.000", "Saya kurang dari 3.700"], jawab: 3676, opsi: [3676, 3726, 2460], salah: "Hanya 3.676 di antara 3.000 dan 3.700." },
  { klue: ["Ribuan saya sama dengan 8.750", "Saya kurang dari 8.750"], jawab: 7500, opsi: [8750, 7500, 9500], salah: "7.500 < 8.750." },
  { klue: ["Saya di antara 5.000 dan 8.000", "Ribuan saya 7"], jawab: 7570, opsi: [7570, 5240, 9941], salah: "7.570 cocok." },
  { klue: ["Saya sama dengan pasangan saya", "Saya 8.765"], jawab: 8765, opsi: [8765, 8775, 8657], salah: "8.765 = 8.765." },
];
export const RONDE_SEMUA_QC: RondeSemua[] = RONDE_SEMUA_CC;
export type PetaKonsep = { judul: string; kotak: { label: string; opsi: string[]; benar: number }[] };
export const RONDE_PETA_QC: PetaKonsep[] = [
  {
    judul: "Membandingkan bilangan empat angka",
    kotak: [
      { label: "Langkah 1", opsi: ["bandingkan ribuan", "bandingkan satuan", "jumlahkan"], benar: 0 },
      { label: "Jika ribuan sama", opsi: ["lihat ratusan", "selesai", "lihat satuan dulu"], benar: 0 },
      { label: "Tanda lebih dari", opsi: [">", "<", "="], benar: 0 },
      { label: "Semua tempat sama", opsi: ["tulis =", "tulis >", "tulis <"], benar: 0 },
    ],
  },
  {
    judul: "Mengurutkan bilangan",
    kotak: [
      { label: "Dari terkecil", opsi: ["naik", "turun", "acak"], benar: 0 },
      { label: "Alat bantu", opsi: ["nilai tempat", "warna saja", "tebakan"], benar: 0 },
      { label: "Contoh gunung", opsi: ["2.460 → 3.676 → 3.726", "3.726 → 2.460", "sama semua"], benar: 0 },
      { label: "Digit 1,5,9,2 terbesar", opsi: ["9.521", "1.259", "5.912"], benar: 0 },
    ],
  },
];
export const RONDE_SUSUNKATA_QC: { kata: string[]; pengecoh: string }[] = [
  { kata: ["8.750", "lebih", "dari", "7.500", "ditulis", "8.750", ">", "7.500"], pengecoh: "<" },
  { kata: ["bandingkan", "ribuan", "dulu", "lalu", "ratusan"], pengecoh: "satuan" },
  { kata: ["2.460", "3.676", "3.726", "dari", "terkecil"], pengecoh: "terbesar" },
  { kata: ["tanda", "kurang", "dari", "ditulis", "<"], pengecoh: ">" },
];
