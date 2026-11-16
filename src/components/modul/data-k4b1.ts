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

/* ====================================================================== */
/* SUB-BAB D — komposisi & dekomposisi sampai 10.000                        */
/* ====================================================================== */

export const tiga = (n: number) => ({ r: Math.floor(n / 100) % 10, p: Math.floor(n / 10) % 10, s: n % 10 });
export const gabung3 = (r: number, p: number, s: number) => r * 100 + p * 10 + s;
export type Jml = [number, number];
export type SoalJumlah = { a: number; b: number; benda: BendaId };
export const satuanDari = (n: number) => n % 10;
export const puluhanDari = (n: number) => Math.floor(n / 10) % 10;
export const ratusanDari = (n: number) => Math.floor(n / 100) % 10;
export const perluSimpan = (a: number, b: number): boolean => satuanDari(a) + satuanDari(b) >= 10;
export const perluSimpanP = (a: number, b: number): boolean => {
  const s = satuanDari(a) + satuanDari(b);
  const p = puluhanDari(a) + puluhanDari(b) + (s >= 10 ? 1 : 0);
  return s >= 10 || p >= 10;
};
export const cocokSimpan = (p: Jml, syarat: "simpan" | "tanpa"): boolean => (syarat === "simpan" ? perluSimpan(p[0], p[1]) : !perluSimpan(p[0], p[1]));
export const perluAmbil = (a: number, b: number): boolean => satuanDari(a) < satuanDari(b);
export const perluAmbilP = (a: number, b: number): boolean => {
  const sKurang = satuanDari(a) < satuanDari(b);
  const pA = puluhanDari(a) - (sKurang ? 1 : 0);
  return sKurang || pA < puluhanDari(b);
};
export const cocokAmbil = (p: Jml, syarat: "ambil" | "tanpa"): boolean => (syarat === "ambil" ? perluAmbil(p[0], p[1]) : !perluAmbil(p[0], p[1]));
export const opsiJumlah = (hasil: number, nomor: number): number[] => {
  const salah = [hasil + 10, hasil - 10, hasil + 100, hasil - 1, hasil + 1].filter((x) => x > 0 && x !== hasil && x <= 999);
  const semua = [hasil, salah[0], salah[1]];
  return urutanTetap(3, 2, nomor).map((i) => semua[i]);
};
export const opsiSelisih = opsiJumlah;

export type Komposisi = { n: number; benda?: BendaId };
export const RONDE_KOMPOSISI_CD: Komposisi[][] = [
  [{ n: 6348, benda: "jeruk" }, { n: 6482, benda: "jeruk" }],
  [{ n: 6040, benda: "kue" }, { n: 6849, benda: "kue" }],
  [{ n: 6035, benda: "kelereng" }, { n: 7020, benda: "kelereng" }],
];
export const RONDE_DEKOMPOSISI_CD: number[][] = [
  [6348, 6849],
  [6035, 7482],
  [2001, 9999],
];
export const RONDE_PAPAN_CD: number[][] = [
  [6348, 6482],
  [6040, 6849],
  [6035, 7020],
];
export const RONDE_TABEL_CD: number[][] = [
  [6348, 6482, 6040],
  [6849, 6035, 7020],
  [2001, 7000, 9999],
];
export const RONDE_PASANG_CD: number[][] = [
  [6348, 6482, 2150],
  [6849, 6035, 7350],
  [2001, 7020, 9999],
];
export const RONDE_MEMORI_CD: number[][] = [
  [6000, 300, 40, 8],
  [6000, 800, 40, 9],
  [6000, 0, 30, 5],
];
export const RONDE_KETUK_CD: { item: number[]; tanya: number[] }[] = [
  { item: [6348, 6482, 6035], tanya: [6348, 6035] },
  { item: [6849, 7020, 2001], tanya: [6849, 2001] },
  { item: [9999, 7000, 6040], tanya: [9999, 7000] },
];
export const RONDE_SEMUA_CD: RondeSemua[] = [
  { syarat: "ribuan-lebih-5", angka: [6348, 2150, 9999, 4327], benda: "jeruk" },
  { syarat: "ratusan-nol", angka: [6040, 6035, 7020, 3286], benda: "kue" },
  { syarat: "angka-nol", angka: [6040, 6035, 2001, 6482], benda: "kelereng" },
];
export const RONDE_UANG_CD: { total: number; pecahan: { nilai: number; banyak: number }[]; benda: BendaId }[] = [
  { total: 7300, pecahan: [{ nilai: 2000, banyak: 3 }, { nilai: 1000, banyak: 1 }, { nilai: 100, banyak: 3 }], benda: "jeruk" },
  { total: 10000, pecahan: [{ nilai: 2000, banyak: 5 }], benda: "kue" },
  { total: 5500, pecahan: [{ nilai: 2000, banyak: 2 }, { nilai: 1000, banyak: 1 }, { nilai: 500, banyak: 1 }], benda: "kelereng" },
];
export const RONDE_SUSUN_CD: number[][] = RONDE_PAPAN_CD;
export const RONDE_URAI_CD: number[][] = RONDE_DEKOMPOSISI_CD;

export const RONDE_KOMPOSISI_PD: number[][] = [
  [6348, 6482],
  [6849, 6035],
  [2001, 9999],
];
export const RONDE_DEKOMPOSISI_PD = RONDE_KOMPOSISI_PD;
export const RONDE_PAPAN_PD = RONDE_KOMPOSISI_PD;
export const RONDE_TABEL_PD: number[][] = RONDE_TABEL_CD;
export const RONDE_PASANG_PD = RONDE_PASANG_CD;
export const RONDE_MEMORI_PD: number[][] = [
  [6348, 6849, 6035, 7020],
  [6482, 6040, 2001, 9999],
  [7000, 9999, 6035, 2150],
];
export const RONDE_KETUK_PD = RONDE_KETUK_CD;
export const RONDE_SEMUA_PD: RondeSemua[] = RONDE_SEMUA_CD;
export const RONDE_SORTIR_PD: number[][] = [
  [6348, 2150, 9999, 4327, 6040, 7000],
  [6482, 6035, 3286, 7020, 2001, 9500],
  [6849, 6040, 7350, 9999, 4128, 1001],
];
export const RONDE_KALIMAT_PD: number[] = [6348, 6035, 9999];

export const RONDE_SUSUN_QD: number[][] = RONDE_KOMPOSISI_PD;
export const RONDE_URAI_QD: number[][] = RONDE_DEKOMPOSISI_CD;
export const RONDE_PAPAN_QD = RONDE_KOMPOSISI_PD;
export const RONDE_PASANG_QD = RONDE_PASANG_CD;
export const RONDE_MEMORI_QD = RONDE_MEMORI_PD;
export const RONDE_TABEL_QD: TabelKata[] = [
  { kepala: ["Bilangan", "Uraian"], baris: [{ label: "6.348", jawab: "6.000 + 300 + 40 + 8" }, { label: "6.040", jawab: "6.000 + 0 + 40 + 0" }, { label: "6.035", jawab: "6.000 + 0 + 30 + 5" }, { label: "7.000", jawab: "7.000 + 0 + 0 + 0" }], kartu: ["6.000 + 300 + 40 + 8", "6.000 + 0 + 40 + 0", "6.000 + 0 + 30 + 5", "7.000 + 0 + 0 + 0", "600 + 30 + 4 + 8"] },
  { kepala: ["Bilangan", "Uraian"], baris: [{ label: "6.849", jawab: "6.000 + 800 + 40 + 9" }, { label: "2.001", jawab: "2.000 + 0 + 0 + 1" }, { label: "9.999", jawab: "9.000 + 900 + 90 + 9" }, { label: "7.020", jawab: "7.000 + 0 + 20 + 0" }], kartu: ["6.000 + 800 + 40 + 9", "2.000 + 0 + 0 + 1", "9.000 + 900 + 90 + 9", "7.000 + 0 + 20 + 0", "684 + 9"] },
  { kepala: ["Bilangan", "Uraian"], baris: [{ label: "6.482", jawab: "6.000 + 400 + 80 + 2" }, { label: "1.025", jawab: "1.000 + 0 + 20 + 5" }, { label: "3.286", jawab: "3.000 + 200 + 80 + 6" }, { label: "10.000", jawab: "10 × 1.000" }], kartu: ["6.000 + 400 + 80 + 2", "1.000 + 0 + 20 + 5", "3.000 + 200 + 80 + 6", "10 × 1.000", "6482"] },
];
export const RONDE_BENARSALAH_QD: Pernyataan[][] = [
  [
    { teks: "6 ribuan + 3 ratusan + 4 puluhan + 8 satuan = 6.348.", benar: true, penjelasan: "6.000 + 300 + 40 + 8 = 6.348." },
    { teks: "Komposisi dan dekomposisi adalah operasi yang saling membalik.", benar: true, penjelasan: "Menyusun dan menguraikan saling berkebalikan." },
    { teks: "6.035 = 6.000 + 30 + 5, ratusannya 0.", benar: true, penjelasan: "Nol ratusan tetap ditulis di uraian lengkap." },
    { teks: "Angka 6 di 6.348 selalu bernilai 6.", benar: false, penjelasan: "Di ribuan bernilai 6.000." },
    { teks: "7.000 = 7 ribuan + 0 + 0 + 0.", benar: true, penjelasan: "Hanya tempat ribuan yang terisi." },
  ],
  [
    { teks: "9.999 uraiannya 9.000 + 900 + 90 + 9.", benar: true, penjelasan: "Semua tempat terisi sembilan." },
    { teks: "Dekomposisi 6.849 menghasilkan 6.000 + 800 + 40 + 9.", benar: true, penjelasan: "Sesuai Buku Siswa hlm. 26." },
    { teks: "Uang 7.300 Helen tidak bisa diuraikan dari pecahan yang ada.", benar: false, penjelasan: "Buku meminta menguraikan 7.300 dari pecahan yang ada." },
    { teks: "2.001 = 2 ribuan + 0 + 0 + 1 satuan.", benar: true, penjelasan: "Ratusan dan puluhan nol." },
    { teks: "Menyusun digit tempat sama dengan menjumlahkan dua harga.", benar: false, penjelasan: "Komposisi = menyusun nilai tempat satu bilangan." },
  ],
];
export const RONDE_DETEKTIF_QD: SoalDetektif[] = [
  { klue: ["Ribuan saya 6", "Uraian saya 6.000 + 300 + 40 + 8"], jawab: 6348, opsi: [6348, 6482, 6035], salah: "Hanya 6.348 cocok." },
  { klue: ["Satuan saya 5", "Ratusan saya 0"], jawab: 6035, opsi: [6035, 6040, 7020], salah: "6.035 = 6.000+0+30+5." },
  { klue: ["Saya 9.999", "Semua digit saya 9"], jawab: 9999, opsi: [9999, 9000, 9990], salah: "9.999 semua digit 9." },
  { klue: ["Saya 7 ribuan saja", "Puluhan dan satuan 0"], jawab: 7000, opsi: [7000, 7020, 7100], salah: "7.000." },
];
export const RONDE_SEMUA_QD: RondeSemua[] = RONDE_SEMUA_CD;
export const PETA_KONSEP_QD: { pusat: string; kotak: { label: string; opsi: string[]; benar: number }[] }[] = [
  { pusat: "Komposisi", kotak: [
    { label: "Arti", opsi: ["menyusun dari nilai tempat", "mengurangi", "membagi"], benar: 0 },
    { label: "6 rb + 3 rt + 4 pl + 8 st", opsi: ["6.348", "348", "6.438"], benar: 0 },
    { label: "Alat", opsi: ["papan empat kolom", "garis saja", "acak"], benar: 0 },
    { label: "Hasil", opsi: ["satu bilangan", "dua bilangan", "pecahan"], benar: 0 },
  ]},
  { pusat: "Dekomposisi", kotak: [
    { label: "Arti", opsi: ["mengurai ke nilai tempat", "menjumlahkan", "mengurutkan"], benar: 0 },
    { label: "6.849", opsi: ["6.000+800+40+9", "684+9", "6+849"], benar: 0 },
    { label: "Nol", opsi: ["tetap ditulis di uraian", "dihapus saja", "diganti 1"], benar: 0 },
    { label: "Kebalikan dari", opsi: ["komposisi", "pembagian", "pengurangan"], benar: 0 },
  ]},
];
export const RONDE_SUSUNKATA_QD: { kata: string[]; pengecoh: string }[] = [
  { kata: ["6.348", "sama", "dengan", "6.000", "+", "300", "+", "40", "+", "8"], pengecoh: "348" },
  { kata: ["komposisi", "menyusun", "nilai", "tempat"], pengecoh: "menghapus" },
  { kata: ["dekomposisi", "mengurai", "bilangan"], pengecoh: "mengacak" },
  { kata: ["nol", "tetap", "menjaga", "tempat"], pengecoh: "diabaikan" },
];

/* ====================================================================== */
/* SUB-BAB E — penjumlahan sampai 1.000                                     */
/* ====================================================================== */

export const RONDE_GABUNG_CE: SoalJumlah[][] = [
  [{ a: 131, b: 321, benda: "jeruk" }, { a: 124, b: 411, benda: "jeruk" }],
  [{ a: 189, b: 245, benda: "kue" }, { a: 333, b: 205, benda: "kue" }],
  [{ a: 373, b: 208, benda: "kelereng" }, { a: 277, b: 146, benda: "kelereng" }],
];
export const RONDE_JUMLAH_CE: Jml[][] = [
  [[131, 321], [189, 245]],
  [[333, 205], [373, 208]],
  [[277, 146], [627, 92]],
];
export const RONDE_SORTIR_CE: Jml[][] = [
  [[131, 321], [189, 245], [100, 200], [333, 205], [50, 40], [373, 208]],
  [[277, 146], [124, 411], [200, 300], [576, 148], [12, 5], [234, 279]],
  [[429, 19], [821, 98], [700, 139], [111, 77], [30, 40], [612, 48]],
];
export const RONDE_PASANG_CE: Jml[][] = [
  [[131, 321], [189, 245], [124, 411]],
  [[333, 205], [373, 208], [277, 146]],
  [[627, 92], [576, 148], [333, 519]],
];
export const RONDE_MEMORI_CE: Jml[][] = [
  [[131, 321], [189, 245], [100, 200], [50, 50]],
  [[333, 205], [373, 208], [277, 146], [400, 100]],
  [[627, 92], [429, 19], [821, 98], [700, 139]],
];
export const RONDE_KETUK_CE: { item: Jml[]; tanya: number[] }[] = [
  { item: [[131, 321], [189, 245], [100, 200]], tanya: [452, 434] },
  { item: [[333, 205], [373, 208], [50, 40]], tanya: [538, 581] },
  { item: [[277, 146], [627, 92], [12, 5]], tanya: [423, 719] },
];
export const RONDE_SEMUA_CE: { syarat: "simpan" | "tanpa"; pasangan: Jml[] }[] = [
  { syarat: "simpan", pasangan: [[189, 245], [131, 321], [100, 200], [373, 208]] },
  { syarat: "tanpa", pasangan: [[131, 321], [189, 245], [124, 411], [200, 300]] },
  { syarat: "simpan", pasangan: [[277, 146], [576, 148], [50, 40], [627, 92]] },
];
export const RONDE_CERITA_CE: { a: number; b: number; c?: number; benda: BendaId; teks: string }[][] = [
  [
    { a: 328, b: 579, benda: "jeruk", teks: "Kebun A 328 buah, kebun B 579 buah. Berapa seluruhnya?" },
    { a: 117, b: 105, c: 242, benda: "kelereng", teks: "Ikan lele 117, 105, dan 242. Berapa seluruhnya?" },
  ],
  [
    { a: 121, b: 29, c: 98, benda: "kue", teks: "Siswa lomba 121 + 29 + 98. Berapa seluruhnya?" },
    { a: 111, b: 77, c: 89, benda: "kue", teks: "Stiker Helen 111 + 77 + 89. Berapa seluruhnya?" },
  ],
  [
    { a: 131, b: 321, benda: "jeruk", teks: "Pohon jeruk 131 di Jember dan 321 di Banyuwangi. Berapa seluruhnya?" },
    { a: 189, b: 245, benda: "jeruk", teks: "Keranjang 189 dan 245 jeruk. Berapa seluruhnya?" },
  ],
];
export const RONDE_PAPAN_CE: Jml[][] = RONDE_JUMLAH_CE;
export const RONDE_URUT_CE: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [452, 434, 538], dari: "kecil" },
  { angka: [581, 423, 719], dari: "besar" },
  { angka: [898, 434, 452], dari: "kecil" },
];

export const RONDE_SUSUN_PE: Jml[][] = RONDE_JUMLAH_CE;
export const RONDE_PAPAN_PE = RONDE_JUMLAH_CE;
export const RONDE_JUMLAH_PE = RONDE_JUMLAH_CE;
export const RONDE_PASANG_PE = RONDE_PASANG_CE;
export const RONDE_MEMORI_PE = RONDE_MEMORI_CE;
export const RONDE_TABEL_PE: { a: number; b: number }[][] = [
  [{ a: 131, b: 321 }, { a: 189, b: 245 }, { a: 124, b: 411 }],
  [{ a: 333, b: 205 }, { a: 373, b: 208 }, { a: 277, b: 146 }],
  [{ a: 627, b: 92 }, { a: 576, b: 148 }, { a: 333, b: 519 }],
];
export const RONDE_SEMUA_PE = RONDE_SEMUA_CE;
export const RONDE_SORTIR_PE = RONDE_SORTIR_CE;
export const RONDE_URAI_PE: Jml[][] = RONDE_JUMLAH_CE;
export const RONDE_LANGKAH_PE: Jml[][] = RONDE_JUMLAH_CE;

export const RONDE_SUSUN_QE = RONDE_JUMLAH_CE;
export const RONDE_JUMLAH_QE = RONDE_JUMLAH_CE;
export const RONDE_PAPAN_QE = RONDE_JUMLAH_CE;
export const RONDE_LANGKAH_QE = RONDE_JUMLAH_CE;
export const RONDE_PASANG_QE = RONDE_PASANG_CE;
export const RONDE_MEMORI_QE = RONDE_MEMORI_CE;
export const RONDE_BENARSALAH_QE: Pernyataan[][] = [
  [
    { teks: "131 + 321 = 452 tanpa menyimpan.", benar: true, penjelasan: "Satuan 1+1=2, puluhan 3+2=5, ratusan 1+3=4." },
    { teks: "189 + 245 perlu menyimpan.", benar: true, penjelasan: "9+5=14, simpan 1 ke puluhan." },
    { teks: "Penjumlahan selalu dari kiri (ratusan) dulu.", benar: false, penjelasan: "Dari kanan: satuan → puluhan → ratusan." },
    { teks: "124 + 411 + 363 = 898.", benar: true, penjelasan: "Contoh tiga bilangan di Buku Siswa." },
    { teks: "Cara susun panjang dan pendek hasilnya berbeda.", benar: false, penjelasan: "Hasil sama; caranya yang berbeda." },
  ],
  [
    { teks: "373 + 208 = 581.", benar: true, penjelasan: "3+8=11 simpan; 1+7+0=8; 3+2=5." },
    { teks: "Bila satuan ≥ 10, simpan 1 puluhan.", benar: true, penjelasan: "Aturan menyimpan." },
    { teks: "627 + 92 = 619.", benar: false, penjelasan: "627 + 92 = 719." },
    { teks: "Menyimpan artinya menulis 1 di kolom berikutnya.", benar: true, penjelasan: "1 puluhan atau 1 ratusan." },
    { teks: "898 adalah jumlah buku tiga SD Gebang.", benar: true, penjelasan: "124+411+363." },
  ],
];
export const RONDE_DETEKTIF_QE: SoalDetektif[] = [
  { klue: ["Saya hasil 131 + 321", "Saya tanpa menyimpan"], jawab: 452, opsi: [452, 434, 538], salah: "131+321=452." },
  { klue: ["Saya hasil 189 + 245", "Ada penyimpanan"], jawab: 434, opsi: [434, 424, 444], salah: "189+245=434." },
  { klue: ["Saya 898", "Jumlah tiga bilangan buku"], jawab: 898, opsi: [898, 8980, 889], salah: "124+411+363=898." },
  { klue: ["Saya 328 + 579", "Kelapa sawit"], jawab: 907, opsi: [907, 897, 917], salah: "328+579=907." },
];
export const RONDE_CERITA_QE = RONDE_CERITA_CE;
export const PETA_KONSEP_QE: { pusat: string; kotak: { label: string; opsi: string[]; benar: number }[] }[] = [
  { pusat: "Penjumlahan", kotak: [
    { label: "Mulai dari", opsi: ["satuan", "ratusan", "ribuan"], benar: 0 },
    { label: "Satuan ≥ 10", opsi: ["simpan 1 puluhan", "hapus", "ulangi"], benar: 0 },
    { label: "131 + 321", opsi: ["452", "442", "552"], benar: 0 },
    { label: "Cara panjang", opsi: ["urai dulu", "tebak", "bagi"], benar: 0 },
  ]},
];
export const jumlahCerita = (s: { a: number; b: number; c?: number }) => s.a + s.b + (s.c ?? 0);

/* ====================================================================== */
/* SUB-BAB F — pengurangan sampai 1.000                                     */
/* ====================================================================== */

export type SoalKurang = { a: number; b: number; benda: BendaId };
export const RONDE_SISA_CF: SoalKurang[][] = [
  [{ a: 265, b: 132, benda: "kue" }, { a: 241, b: 129, benda: "kue" }],
  [{ a: 253, b: 176, benda: "jeruk" }, { a: 241, b: 175, benda: "jeruk" }],
  [{ a: 633, b: 211, benda: "kelereng" }, { a: 879, b: 436, benda: "kelereng" }],
];
export const RONDE_SELISIH_CF: Jml[][] = [
  [[265, 132], [241, 129]],
  [[253, 176], [241, 175]],
  [[633, 211], [522, 148]],
];
export const RONDE_SORTIR_CF: Jml[][] = [
  [[265, 132], [241, 129], [500, 200], [253, 176], [80, 30], [241, 175]],
  [[633, 211], [879, 436], [400, 100], [522, 148], [90, 40], [367, 289]],
  [[573, 268], [422, 146], [300, 100], [700, 250], [55, 20], [900, 450]],
];
export const RONDE_PASANG_CF: Jml[][] = [
  [[265, 132], [241, 129], [253, 176]],
  [[241, 175], [633, 211], [879, 436]],
  [[522, 148], [367, 289], [573, 268]],
];
export const RONDE_MEMORI_CF: Jml[][] = [
  [[265, 132], [241, 129], [200, 100], [50, 20]],
  [[253, 176], [241, 175], [633, 211], [400, 100]],
  [[879, 436], [522, 148], [367, 289], [573, 268]],
];
export const RONDE_KETUK_CF: { item: Jml[]; tanya: number[] }[] = [
  { item: [[265, 132], [241, 129], [200, 100]], tanya: [133, 112] },
  { item: [[253, 176], [241, 175], [80, 30]], tanya: [77, 66] },
  { item: [[633, 211], [879, 436], [90, 40]], tanya: [422, 443] },
];
export const RONDE_SEMUA_CF: { syarat: "ambil" | "tanpa"; pasangan: Jml[] }[] = [
  { syarat: "ambil", pasangan: [[241, 129], [265, 132], [200, 100], [253, 176]] },
  { syarat: "tanpa", pasangan: [[265, 132], [241, 129], [500, 200], [80, 30]] },
  { syarat: "ambil", pasangan: [[241, 175], [253, 176], [90, 40], [367, 289]] },
];
export const RONDE_CERITA_CF: { a: number; b: number; benda: BendaId; teks: string }[][] = [
  [
    { a: 265, b: 132, benda: "kue", teks: "Buku 265, dipinjam 132. Berapa yang masih ada?" },
    { a: 241, b: 129, benda: "kue", teks: "Ada 241, diambil 129. Berapa sisanya?" },
  ],
  [
    { a: 253, b: 176, benda: "jeruk", teks: "253 dikurangi 176. Berapa hasilnya?" },
    { a: 241, b: 175, benda: "jeruk", teks: "241 − 175. Berapa sisanya?" },
  ],
  [
    { a: 633, b: 211, benda: "kelereng", teks: "633 − 211. Berapa?" },
    { a: 879, b: 436, benda: "kelereng", teks: "879 − 436. Berapa?" },
  ],
];
export const RONDE_PAPAN_CF = RONDE_SELISIH_CF;
export const RONDE_URUT_CF: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [133, 112, 77], dari: "kecil" },
  { angka: [66, 422, 443], dari: "besar" },
  { angka: [305, 276, 77], dari: "kecil" },
];

export const RONDE_SUSUN_PF = RONDE_SELISIH_CF;
export const RONDE_PAPAN_PF = RONDE_SELISIH_CF;
export const RONDE_SELISIH_PF = RONDE_SELISIH_CF;
export const RONDE_PASANG_PF = RONDE_PASANG_CF;
export const RONDE_MEMORI_PF = RONDE_MEMORI_CF;
export const RONDE_TABEL_PF: { a: number; b: number }[][] = [
  [{ a: 265, b: 132 }, { a: 241, b: 129 }, { a: 253, b: 176 }],
  [{ a: 241, b: 175 }, { a: 633, b: 211 }, { a: 879, b: 436 }],
  [{ a: 522, b: 148 }, { a: 367, b: 289 }, { a: 573, b: 268 }],
];
export const RONDE_SEMUA_PF = RONDE_SEMUA_CF;
export const RONDE_SORTIR_PF = RONDE_SORTIR_CF;
export const RONDE_URAI_PF = RONDE_SELISIH_CF;
export const RONDE_LANGKAH_PF = RONDE_SELISIH_CF;

export const RONDE_SUSUN_QF = RONDE_SELISIH_CF;
export const RONDE_SELISIH_QF = RONDE_SELISIH_CF;
export const RONDE_PAPAN_QF = RONDE_SELISIH_CF;
export const RONDE_LANGKAH_QF = RONDE_SELISIH_CF;
export const RONDE_PASANG_QF = RONDE_PASANG_CF;
export const RONDE_MEMORI_QF = RONDE_MEMORI_CF;
export const RONDE_BENARSALAH_QF: Pernyataan[][] = [
  [
    { teks: "265 − 132 = 133 tanpa mengambil.", benar: true, penjelasan: "Setiap tempat cukup dikurangi." },
    { teks: "241 − 129 perlu mengambil.", benar: true, penjelasan: "1 < 9, ambil 1 puluhan." },
    { teks: "Pengurangan dikerjakan dari ratusan dulu.", benar: false, penjelasan: "Dari satuan (kanan) dulu." },
    { teks: "253 − 176 = 77 dengan dua kali mengambil.", benar: true, penjelasan: "Contoh Buku Siswa hlm. 36." },
    { teks: "Memeriksa pengurangan: hasil + pengurang = bilangan awal.", benar: true, penjelasan: "Operasi kebalikan." },
  ],
  [
    { teks: "241 − 175 = 66.", benar: true, penjelasan: "Susun pendek dengan mengambil." },
    { teks: "Bila satuan atas < satuan bawah, ambil 1 puluhan.", benar: true, penjelasan: "Aturan mengambil." },
    { teks: "633 − 211 = 422.", benar: true, penjelasan: "Tanpa mengambil." },
    { teks: "Mengambil sama dengan menyimpan pada penjumlahan.", benar: false, penjelasan: "Mengambil kebalikan dari menyimpan." },
    { teks: "112 = 241 − 129.", benar: true, penjelasan: "Contoh satu kali mengambil." },
  ],
];
export const RONDE_DETEKTIF_QF: SoalDetektif[] = [
  { klue: ["Saya hasil 265 − 132", "Tanpa mengambil"], jawab: 133, opsi: [133, 112, 77], salah: "265−132=133." },
  { klue: ["Saya hasil 241 − 129", "Ada pengambilan"], jawab: 112, opsi: [112, 122, 102], salah: "241−129=112." },
  { klue: ["Saya 77", "Hasil 253 − 176"], jawab: 77, opsi: [77, 87, 67], salah: "253−176=77." },
  { klue: ["Saya 66", "241 dikurangi 175"], jawab: 66, opsi: [66, 76, 56], salah: "241−175=66." },
];
export const RONDE_CERITA_QF = RONDE_CERITA_CF;
export const PETA_KONSEP_QF: { pusat: string; kotak: { label: string; opsi: string[]; benar: number }[] }[] = [
  { pusat: "Pengurangan", kotak: [
    { label: "Mulai dari", opsi: ["satuan", "ratusan", "tengah"], benar: 0 },
    { label: "Satuan tidak cukup", opsi: ["ambil 1 puluhan", "simpan", "hapus"], benar: 0 },
    { label: "265 − 132", opsi: ["133", "123", "143"], benar: 0 },
    { label: "Periksa", opsi: ["hasil + pengurang", "bagi dua", "acak"], benar: 0 },
  ]},
];

/* ====================================================================== */
/* SUB-BAB G — perkalian sampai 100                                         */
/* ====================================================================== */

export type Kali = [number, number];
export type SoalKali = { a: number; b: number; benda: BendaId };
export const hasilKali = (a: number, b: number) => a * b;
export const perluSimpanKali = (a: number, b: number) => {
  const s = a % 10;
  return s * b >= 10;
};
export const cocokSimpanKali = (p: Kali, syarat: "simpan" | "tanpa") =>
  (syarat === "simpan") === perluSimpanKali(p[0], p[1]);
export const opsiKali = (h: number, seed: number) => {
  const o = [h, h + 2 + (seed % 3), Math.max(1, h - 4 - (seed % 2))];
  return urutanTetap(3, 1, seed).map((i) => o[i]);
};
export const uraianKali = (a: number, b: number) => {
  const pl = Math.floor(a / 10) * 10;
  const st = a % 10;
  return `(${pl} + ${st}) × ${b} = ${pl * b} + ${st * b} = ${a * b}`;
};

export const RONDE_ARRAY_CG: SoalKali[][] = [
  [{ a: 12, b: 4, benda: "kue" }, { a: 11, b: 3, benda: "kue" }],
  [{ a: 14, b: 5, benda: "kelereng" }, { a: 13, b: 4, benda: "kelereng" }],
  [{ a: 12, b: 8, benda: "jeruk" }, { a: 15, b: 3, benda: "jeruk" }],
];
export const RONDE_KALI_CG: Kali[][] = [
  [[12, 4], [14, 5]],
  [[32, 3], [24, 2]],
  [[37, 2], [12, 8]],
];
export const RONDE_SORTIR_CG: Kali[][] = [
  [[12, 4], [14, 5], [11, 3], [13, 7], [10, 4], [15, 2]],
  [[32, 3], [24, 2], [37, 2], [25, 4], [20, 3], [16, 5]],
  [[48, 2], [23, 4], [12, 8], [30, 3], [19, 5], [22, 3]],
];
export const RONDE_PASANG_CG: Kali[][] = [
  [[12, 4], [14, 5], [11, 3]],
  [[32, 3], [24, 2], [37, 2]],
  [[12, 8], [21, 4], [15, 6]],
];
export const RONDE_MEMORI_CG: Kali[][] = [
  [[12, 4], [14, 5], [10, 5], [11, 3]],
  [[32, 3], [24, 2], [20, 4], [13, 5]],
  [[12, 8], [21, 4], [15, 3], [16, 2]],
];
export const RONDE_KETUK_CG: { item: Kali[]; tanya: number[] }[] = [
  { item: [[12, 4], [14, 5], [11, 3]], tanya: [48, 70] },
  { item: [[32, 3], [24, 2], [10, 5]], tanya: [96, 48] },
  { item: [[12, 8], [21, 4], [15, 3]], tanya: [96, 84] },
];
export const RONDE_SEMUA_CG: { syarat: "simpan" | "tanpa"; pasangan: Kali[] }[] = [
  { syarat: "simpan", pasangan: [[14, 5], [12, 4], [13, 7], [11, 3]] },
  { syarat: "tanpa", pasangan: [[12, 4], [14, 5], [11, 2], [10, 4]] },
  { syarat: "simpan", pasangan: [[37, 2], [24, 2], [19, 5], [20, 3]] },
];
export const RONDE_CERITA_CG: { a: number; b: number; benda: BendaId; teks: string }[][] = [
  [
    { a: 12, b: 3, benda: "kue", teks: "Asep punya 12 ayam, tiap ayam 3 mangkok sehari. Berapa mangkok?" },
    { a: 2, b: 45, benda: "kue", teks: "Perpustakaan punya 2 rak, tiap rak 45 buku. Berapa seluruh buku?" },
  ],
  [
    { a: 14, b: 7, benda: "jeruk", teks: "Ibu memasang kancing pada 14 baju, tiap baju 7 kancing. Berapa kancing?" },
    { a: 21, b: 4, benda: "kelereng", teks: "Azizah punya 21 kucing. Berapa jumlah kaki seluruh kucing?" },
  ],
  [
    { a: 13, b: 6, benda: "kue", teks: "SD Anggrek mengirim 13 siswa per tingkat, ada 6 tingkat. Berapa siswa?" },
    { a: 12, b: 8, benda: "jeruk", teks: "Koperasi beli 8 pak pensil, tiap pak 12 batang. Berapa pensil?" },
  ],
];
export const RONDE_PAPAN_CG: Kali[][] = RONDE_KALI_CG;
export const RONDE_URUT_CG: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [48, 70, 33], dari: "kecil" },
  { angka: [96, 48, 74], dari: "besar" },
  { angka: [96, 84, 45], dari: "kecil" },
];
export const RONDE_KALI_PG: Kali[][] = RONDE_KALI_CG;
export const RONDE_PASANG_PG: Kali[][] = RONDE_PASANG_CG;
export const RONDE_MEMORI_PG: Kali[][] = RONDE_MEMORI_CG;
export const RONDE_TABEL_PG: { a: number; b: number }[][] = [
  [{ a: 12, b: 4 }, { a: 14, b: 5 }, { a: 11, b: 3 }],
  [{ a: 32, b: 3 }, { a: 24, b: 2 }, { a: 37, b: 2 }],
  [{ a: 12, b: 8 }, { a: 21, b: 4 }, { a: 15, b: 3 }],
];
export const RONDE_SEMUA_PG = RONDE_SEMUA_CG;
export const RONDE_SORTIR_PG = RONDE_SORTIR_CG;
export const RONDE_BENARSALAH_QG: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "12 × 4 = (10 + 2) × 4 = 40 + 8 = 48.", benar: true, penjelasan: "Cara panjang donat di buku." },
    { teks: "14 × 5 tidak perlu menyimpan.", benar: false, penjelasan: "4 × 5 = 20, menyimpan 2 ke puluhan." },
    { teks: "Perkalian adalah penjumlahan berulang.", benar: true, penjelasan: "12 kotak × 4 = 4 dijumlah 12 kali." },
    { teks: "32 × 3 = 96.", benar: true, penjelasan: "30×3 + 2×3 = 90+6." },
  ],
  [
    { teks: "Pada cara bersusun, mulai dari satuan.", benar: true, penjelasan: "Satuan dikalikan dulu." },
    { teks: "12 × 8 = 86.", benar: false, penjelasan: "12 × 8 = 96." },
    { teks: "21 × 4 = 84.", benar: true, penjelasan: "20×4 + 1×4 = 80+4." },
    { teks: "Menyimpan terjadi jika hasil satuan ≥ 10.", benar: true, penjelasan: "Seperti 4×5=20." },
  ],
];
export const RONDE_DETEKTIF_QG: { klue: string[]; jawab: number; opsi: number[]; salah: string }[] = [
  { klue: ["Aku 12 × 4.", "Aku jumlah donat di buku."], jawab: 48, opsi: [48, 40, 52], salah: "12 kotak × 4 donat = 48." },
  { klue: ["Aku 14 × 5.", "Aku hasil kelereng buku."], jawab: 70, opsi: [70, 60, 75], salah: "(10+4)×5 = 50+20 = 70." },
  { klue: ["Aku 2 rak × 45 buku.", "Aku hasil perpustakaan."], jawab: 90, opsi: [90, 47, 85], salah: "2 × 45 = 90." },
  { klue: ["Aku 21 × 4.", "Aku kaki kucing Azizah."], jawab: 84, opsi: [84, 25, 80], salah: "21 kucing × 4 kaki = 84." },
];
export const PETA_KONSEP_QG = [
  { pusat: "Perkalian", kotak: [
    { label: "Arti", opsi: ["penjumlahan berulang", "pengurangan", "membagi sama"], benar: 0 },
    { label: "Cara panjang", opsi: ["urai puluhan+satuan", "acak saja", "kurangi dulu"], benar: 0 },
    { label: "Menyimpan", opsi: ["bila satuan × faktor ≥ 10", "selalu", "tidak pernah"], benar: 0 },
    { label: "12 × 4", opsi: ["48", "16", "8"], benar: 0 },
  ]},
];
export const RONDE_CERITA_QG = RONDE_CERITA_CG;

/* ====================================================================== */
/* SUB-BAB H — pembagian sampai 100                                         */
/* ====================================================================== */

export type Bagi = [number, number];
export const hasilBagi = (a: number, b: number) => a / b;
export const habisBagi = (a: number, b: number) => a % b === 0;
export const opsiBagi = (h: number, seed: number) => {
  const o = [h, h + 1 + (seed % 2), Math.max(1, h - 1 - (seed % 2))];
  return urutanTetap(3, 1, seed).map((i) => o[i]);
};

export const RONDE_BAGI_CH: SoalKali[][] = [
  [{ a: 48, b: 4, benda: "kue" }, { a: 36, b: 2, benda: "kue" }],
  [{ a: 24, b: 2, benda: "jeruk" }, { a: 96, b: 3, benda: "jeruk" }],
  [{ a: 72, b: 3, benda: "kelereng" }, { a: 75, b: 5, benda: "kelereng" }],
];
export const RONDE_BAGI_HASIL_CH: Bagi[][] = [
  [[48, 4], [36, 2]],
  [[24, 2], [96, 3]],
  [[72, 3], [75, 5]],
];
export const RONDE_SORTIR_CH: Bagi[][] = [
  [[48, 4], [48, 5], [36, 2], [25, 4], [96, 3], [50, 4]],
  [[24, 2], [24, 5], [72, 3], [40, 6], [75, 5], [45, 4]],
  [[96, 6], [96, 5], [64, 4], [55, 5], [81, 3], [70, 4]],
];
export const RONDE_PASANG_CH: Bagi[][] = [
  [[48, 4], [36, 2], [24, 2]],
  [[96, 3], [72, 3], [75, 5]],
  [[96, 6], [64, 4], [81, 3]],
];
export const RONDE_MEMORI_CH: Bagi[][] = [
  [[48, 4], [36, 2], [24, 3], [20, 4]],
  [[96, 3], [72, 3], [75, 5], [40, 5]],
  [[96, 6], [64, 4], [81, 3], [55, 5]],
];
export const RONDE_KETUK_CH: { item: Bagi[]; tanya: number[] }[] = [
  { item: [[48, 4], [36, 2], [24, 3]], tanya: [12, 18] },
  { item: [[96, 3], [72, 3], [40, 5]], tanya: [32, 24] },
  { item: [[96, 6], [64, 4], [81, 3]], tanya: [16, 27] },
];
export const RONDE_SEMUA_CH: { syarat: "habis" | "sisa"; pasangan: Bagi[] }[] = [
  { syarat: "habis", pasangan: [[48, 4], [48, 5], [36, 2], [25, 4]] },
  { syarat: "sisa", pasangan: [[48, 5], [36, 2], [25, 4], [96, 3]] },
  { syarat: "habis", pasangan: [[72, 3], [75, 5], [50, 4], [64, 4]] },
];
export const cocokHabis = (p: Bagi, syarat: "habis" | "sisa") =>
  (syarat === "habis") === habisBagi(p[0], p[1]);
export const RONDE_CERITA_CH: { a: number; b: number; benda: BendaId; teks: string }[][] = [
  [
    { a: 36, b: 2, benda: "kue", teks: "Kaleng 36 permen dibagi Tono dan Tini sama banyak. Berapa Tini?" },
    { a: 64, b: 4, benda: "jeruk", teks: "64 alpukat dibagi 4 orang sama rata. Berapa tiap orang?" },
  ],
  [
    { a: 81, b: 3, benda: "kue", teks: "81 kue, tiap kotak 3 kue. Berapa kotak?" },
    { a: 96, b: 8, benda: "kue", teks: "96 telur, tiap kotak 8. Berapa kotak?" },
  ],
  [
    { a: 55, b: 5, benda: "kelereng", teks: "55 gantungan kunci dibagi 5 teman sama banyak. Berapa tiap orang?" },
    { a: 48, b: 4, benda: "kue", teks: "48 permen dibagi 4 anak. Berapa tiap anak?" },
  ],
];
export const RONDE_PAPAN_CH: Bagi[][] = RONDE_BAGI_HASIL_CH;
export const RONDE_URUT_CH: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [12, 18, 8], dari: "kecil" },
  { angka: [32, 24, 15], dari: "besar" },
  { angka: [16, 27, 11], dari: "kecil" },
];
export const RONDE_BAGI_PH = RONDE_BAGI_HASIL_CH;
export const RONDE_PASANG_PH = RONDE_PASANG_CH;
export const RONDE_MEMORI_PH = RONDE_MEMORI_CH;
export const RONDE_TABEL_PH: { a: number; b: number }[][] = [
  [{ a: 48, b: 4 }, { a: 36, b: 2 }, { a: 24, b: 3 }],
  [{ a: 96, b: 3 }, { a: 72, b: 3 }, { a: 75, b: 5 }],
  [{ a: 96, b: 6 }, { a: 64, b: 4 }, { a: 81, b: 3 }],
];
export const RONDE_SEMUA_PH = RONDE_SEMUA_CH;
export const RONDE_SORTIR_PH = RONDE_SORTIR_CH;
export const RONDE_BENARSALAH_QH: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "48 : 4 = 12.", benar: true, penjelasan: "4 × 12 = 48." },
    { teks: "Pembagian bersusun mulai dari satuan.", benar: false, penjelasan: "Mulai dari nilai tempat terbesar (puluhan)." },
    { teks: "Jika sisa 0, pembagian habis.", benar: true, penjelasan: "Hasil bagi bilangan bulat." },
    { teks: "96 : 3 = 32.", benar: true, penjelasan: "3 × 32 = 96." },
  ],
  [
    { teks: "48 : 5 habis dibagi.", benar: false, penjelasan: "48 = 5×9 + 3, ada sisa." },
    { teks: "Hasil bagi × pembagi = yang dibagi (jika habis).", benar: true, penjelasan: "Kebalikan perkalian." },
    { teks: "81 : 3 = 27.", benar: true, penjelasan: "3 × 27 = 81." },
    { teks: "Pada 48:4, hasil bagi 12.", benar: true, penjelasan: "Contoh permen Pak Wicak." },
  ],
];
export const RONDE_DETEKTIF_QH: { klue: string[]; jawab: number; opsi: number[]; salah: string }[] = [
  { klue: ["Aku 48 : 4.", "Aku permen tiap anak."], jawab: 12, opsi: [12, 16, 8], salah: "48 ÷ 4 = 12." },
  { klue: ["Aku 96 : 3.", "Aku hasil bersusun buku."], jawab: 32, opsi: [32, 30, 36], salah: "96 ÷ 3 = 32." },
  { klue: ["Aku 81 kue : 3 per kotak.", "Aku banyak kotak."], jawab: 27, opsi: [27, 24, 30], salah: "81 ÷ 3 = 27." },
  { klue: ["Aku 55 : 5.", "Aku gantungan kunci tiap teman."], jawab: 11, opsi: [11, 10, 12], salah: "55 ÷ 5 = 11." },
];
export const PETA_KONSEP_QH = [
  { pusat: "Pembagian", kotak: [
    { label: "Arti", opsi: ["membagi sama banyak", "menjumlah berulang", "mengurutkan"], benar: 0 },
    { label: "Mulai dari", opsi: ["puluhan dulu", "satuan dulu", "acak"], benar: 0 },
    { label: "Sisa 0", opsi: ["habis dibagi", "salah", "perlu menyimpan"], benar: 0 },
    { label: "48 : 4", opsi: ["12", "16", "8"], benar: 0 },
  ]},
];
export const RONDE_CERITA_QH = RONDE_CERITA_CH;

/* ====================================================================== */
/* SUB-BAB I — faktor dan kelipatan                                         */
/* ====================================================================== */

export const faktorDari = (n: number): number[] => {
  const f: number[] = [];
  for (let i = 1; i <= n; i++) if (n % i === 0) f.push(i);
  return f;
};
export const adalahFaktor = (n: number, f: number) => n % f === 0;
export const kelipatan = (n: number, banyak: number) => Array.from({ length: banyak }, (_, i) => n * (i + 1));

export const RONDE_FAKTOR_CI: { n: number; faktor: number[] }[][] = [
  [{ n: 12, faktor: [1, 2, 3, 4, 6, 12] }, { n: 20, faktor: [1, 2, 4, 5, 10, 20] }],
  [{ n: 24, faktor: [1, 2, 3, 4, 6, 8, 12, 24] }, { n: 25, faktor: [1, 5, 25] }],
  [{ n: 48, faktor: [1, 2, 3, 4, 6, 8, 12, 16, 24, 48] }, { n: 52, faktor: [1, 2, 4, 13, 26, 52] }],
];
export const RONDE_SORTIR_CI: { n: number; kandidat: number[] }[] = [
  { n: 12, kandidat: [1, 2, 3, 4, 5, 6] },
  { n: 20, kandidat: [1, 2, 3, 4, 5, 10] },
  { n: 24, kandidat: [2, 3, 5, 6, 8, 9] },
];
export const RONDE_PASANG_CI: { n: number; daftar: string }[][] = [
  [{ n: 12, daftar: "1,2,3,4,6,12" }, { n: 20, daftar: "1,2,4,5,10,20" }, { n: 25, daftar: "1,5,25" }],
  [{ n: 24, daftar: "1,2,3,4,6,8,12,24" }, { n: 48, daftar: "1,2,3,4,6,8,12,16,24,48" }, { n: 52, daftar: "1,2,4,13,26,52" }],
  [{ n: 10, daftar: "1,2,5,10" }, { n: 16, daftar: "1,2,4,8,16" }, { n: 18, daftar: "1,2,3,6,9,18" }],
];
export const RONDE_MEMORI_CI: { n: number; daftar: string }[][] = RONDE_PASANG_CI;
export const RONDE_KETUK_CI: { n: number; item: number[]; tanya: number[] }[] = [
  { n: 12, item: [1, 2, 3, 4, 5, 6], tanya: [2, 4, 6] },
  { n: 20, item: [1, 2, 3, 4, 5, 10], tanya: [4, 5, 10] },
  { n: 24, item: [2, 3, 5, 6, 8, 9], tanya: [2, 6, 8] },
];
export const RONDE_SEMUA_CI: { n: number; item: number[] }[] = [
  { n: 12, item: [1, 2, 3, 4, 5, 6, 7, 12] },
  { n: 20, item: [1, 2, 3, 4, 5, 7, 10, 20] },
  { n: 24, item: [1, 2, 3, 5, 6, 8, 9, 12] },
];
export const RONDE_KELIPATAN_CI: { n: number; deret: number[]; hilang: number }[][] = [
  [{ n: 2, deret: [2, 4, 6, 8, 10, 12, 14], hilang: 8 }, { n: 3, deret: [3, 6, 9, 12, 15, 18, 21], hilang: 12 }],
  [{ n: 5, deret: [5, 10, 15, 20, 25, 30, 35], hilang: 25 }, { n: 6, deret: [6, 12, 18, 24, 30, 36], hilang: 24 }],
  [{ n: 4, deret: [4, 8, 12, 16, 20, 24], hilang: 16 }, { n: 3, deret: [3, 6, 9, 12, 15, 18, 21, 24, 27], hilang: 21 }],
];
export const RONDE_PAPAN_CI: { n: number; jawab: number }[][] = [
  [{ n: 12, jawab: 6 }, { n: 20, jawab: 5 }],
  [{ n: 24, jawab: 8 }, { n: 25, jawab: 3 }],
  [{ n: 48, jawab: 10 }, { n: 52, jawab: 6 }],
];
export const RONDE_URUT_CI: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [2, 4, 6, 8], dari: "kecil" },
  { angka: [15, 10, 20, 5], dari: "besar" },
  { angka: [6, 12, 18, 24], dari: "kecil" },
];
export const RONDE_FAKTOR_PI = RONDE_FAKTOR_CI;
export const RONDE_PASANG_PI = RONDE_PASANG_CI;
export const RONDE_MEMORI_PI = RONDE_MEMORI_CI;
export const RONDE_TABEL_PI: { n: number; f: number; pasangan: number }[][] = [
  [{ n: 12, f: 2, pasangan: 6 }, { n: 12, f: 3, pasangan: 4 }, { n: 12, f: 4, pasangan: 3 }],
  [{ n: 20, f: 2, pasangan: 10 }, { n: 20, f: 4, pasangan: 5 }, { n: 20, f: 5, pasangan: 4 }],
  [{ n: 24, f: 3, pasangan: 8 }, { n: 24, f: 6, pasangan: 4 }, { n: 24, f: 8, pasangan: 3 }],
];
export const RONDE_SEMUA_PI = RONDE_SEMUA_CI;
export const RONDE_SORTIR_PI = RONDE_SORTIR_CI;
export const RONDE_KELIPATAN_PI = RONDE_KELIPATAN_CI;
export const RONDE_BENARSALAH_QI: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Faktor 12 adalah 1, 2, 3, 4, 6, dan 12.", benar: true, penjelasan: "Sesuai tabel pensil Pak Guru." },
    { teks: "5 adalah faktor 12.", benar: false, penjelasan: "12 : 5 sisa 2, bukan 0." },
    { teks: "2, 4, 6, 8 adalah kelipatan 2.", benar: true, penjelasan: "Karel menambah 2 kelereng tiap hari." },
    { teks: "Kelipatan 3 kurang dari 15: 3, 6, 9, 12.", benar: true, penjelasan: "3×1 sampai 3×4." },
  ],
  [
    { teks: "Setiap bilangan adalah faktor dirinya sendiri.", benar: true, penjelasan: "n : n = 1." },
    { teks: "1 bukan faktor bilangan apa pun.", benar: false, penjelasan: "1 membagi semua bilangan cacah." },
    { teks: "Kelipatan 5 antara 17 dan 35: 20, 25, 30.", benar: true, penjelasan: "Lebih dari 17 dan kurang dari 35." },
    { teks: "8 adalah kelipatan 3.", benar: false, penjelasan: "8 bukan hasil 3 × bilangan bulat." },
  ],
];
export const RONDE_DETEKTIF_QI: { klue: string[]; jawab: number; opsi: number[]; salah: string }[] = [
  { klue: ["Aku faktor 12.", "Aku lebih dari 4 dan kurang dari 12."], jawab: 6, opsi: [6, 5, 8], salah: "Faktor 12 di antara itu hanya 6." },
  { klue: ["Aku kelipatan 2.", "Aku hari ke-4 Karel."], jawab: 8, opsi: [8, 6, 10], salah: "2+2+2+2 = 8." },
  { klue: ["Aku faktor 20.", "Aku ganjil selain 1."], jawab: 5, opsi: [5, 3, 7], salah: "Faktor ganjil 20: 1 dan 5." },
  { klue: ["Aku kelipatan 6 kurang dari 40.", "Aku terbesar di opsi."], jawab: 36, opsi: [36, 30, 24], salah: "6×6 = 36 < 40." },
];
export const PETA_KONSEP_QI = [
  { pusat: "Faktor & Kelipatan", kotak: [
    { label: "Faktor", opsi: ["pembagi habis", "hasil kali berulang", "bilangan acak"], benar: 0 },
    { label: "Kelipatan", opsi: ["hasil kali berulang", "sisa bagi", "pecahan"], benar: 0 },
    { label: "Faktor 12", opsi: ["1,2,3,4,6,12", "1,2,5,10", "2,4,8"], benar: 0 },
    { label: "Kelipatan 2", opsi: ["2,4,6,8,…", "1,3,5,7,…", "3,6,9,12"], benar: 0 },
  ]},
];
export const RONDE_CERITA_QI: { teks: string; jawab: number; opsi: number[]; pesan: string }[][] = [
  [
    { teks: "Ibu Slamet membagi 10 kg beras sama berat. Berapa kemungkinan banyak orang? (pilih salah satu faktor 10 selain 1)", jawab: 5, opsi: [5, 3, 7], pesan: "Faktor 10: 1, 2, 5, 10. Selain 1 misalnya 5." },
    { teks: "Andi beli 4 kartu tiap 2 hari. Setelah 6 hari berapa kartu?", jawab: 12, opsi: [12, 8, 16], pesan: "6 hari = 3 kali beli. 3 × 4 = 12." },
  ],
  [
    { teks: "Kelipatan 4 lebih dari 7 dan kurang dari 25. Manakah?", jawab: 20, opsi: [20, 4, 28], pesan: "8, 12, 16, 20, 24." },
    { teks: "Lampu merah berkedip tiap 2 menit. Dari 18.10, kedipan berikutnya di menit keberapa (dari 0)?", jawab: 2, opsi: [2, 3, 5], pesan: "Kelipatan 2 menit kemudian." },
  ],
  [
    { teks: "Faktor 27 yang terbesar selain 27?", jawab: 9, opsi: [9, 7, 8], pesan: "Faktor 27: 1, 3, 9, 27." },
    { teks: "Kelipatan 3 kurang dari 30 yang terbesar?", jawab: 27, opsi: [27, 30, 24], pesan: "3 × 9 = 27." },
  ],
];
