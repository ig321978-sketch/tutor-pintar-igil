/**
 * Data murni Matematika Kelas 4 Bab 5 (Bangun Datar): Sub-Bab A–B.
 * Sumber: Buku Siswa Matematika Kelas IV Kemendikbudristek Bab 5 hlm. 139–176.
 * Tanpa React/jaringan. Uji: scripts/uji-data-k4b5.mjs.
 */

export const HURUF = ["A", "B", "C", "D", "E", "F", "G", "H"] as const;

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
export const opsiAngka = (h: number, seed: number) => {
  const o = [h, h + 1 + (seed % 3), Math.max(0, h - 2 - (seed % 2))];
  if (o[1] === h) o[1] = h + 4;
  if (o[2] === h || o[2] === o[1]) o[2] = h + 6;
  return urutanTetap(3, 1, seed).map((i) => o[i]);
};

export type JenisBangun =
  | "segitiga"
  | "persegi"
  | "persegi-panjang"
  | "jajargenjang"
  | "belah-ketupat"
  | "layang-layang"
  | "trapesium"
  | "segilima"
  | "segienam"
  | "bukan-segi-banyak";

export type Bangun = {
  id: string;
  nama: string;
  jenis: JenisBangun;
  sisi: number;
  sudut: number;
  beraturan: boolean;
  keluarga: "segitiga" | "segiempat" | "segi-banyak" | "lain";
  ciriSisi?: "sama-sisi" | "sama-kaki" | "sembarang";
  ciriSudut?: "lancip" | "siku" | "tumpul";
};

export const BANGUN: Bangun[] = [
  { id: "s3", nama: "segitiga sama sisi", jenis: "segitiga", sisi: 3, sudut: 3, beraturan: true, keluarga: "segitiga", ciriSisi: "sama-sisi", ciriSudut: "lancip" },
  { id: "sk", nama: "segitiga sama kaki", jenis: "segitiga", sisi: 3, sudut: 3, beraturan: false, keluarga: "segitiga", ciriSisi: "sama-kaki", ciriSudut: "lancip" },
  { id: "ss", nama: "segitiga sembarang", jenis: "segitiga", sisi: 3, sudut: 3, beraturan: false, keluarga: "segitiga", ciriSisi: "sembarang", ciriSudut: "lancip" },
  { id: "sik", nama: "segitiga siku-siku", jenis: "segitiga", sisi: 3, sudut: 3, beraturan: false, keluarga: "segitiga", ciriSisi: "sembarang", ciriSudut: "siku" },
  { id: "stu", nama: "segitiga tumpul", jenis: "segitiga", sisi: 3, sudut: 3, beraturan: false, keluarga: "segitiga", ciriSisi: "sembarang", ciriSudut: "tumpul" },
  { id: "ps", nama: "persegi", jenis: "persegi", sisi: 4, sudut: 4, beraturan: true, keluarga: "segiempat" },
  { id: "pp", nama: "persegi panjang", jenis: "persegi-panjang", sisi: 4, sudut: 4, beraturan: false, keluarga: "segiempat" },
  { id: "jg", nama: "jajargenjang", jenis: "jajargenjang", sisi: 4, sudut: 4, beraturan: false, keluarga: "segiempat" },
  { id: "bk", nama: "belah ketupat", jenis: "belah-ketupat", sisi: 4, sudut: 4, beraturan: false, keluarga: "segiempat" },
  { id: "ll", nama: "layang-layang", jenis: "layang-layang", sisi: 4, sudut: 4, beraturan: false, keluarga: "segiempat" },
  { id: "tr", nama: "trapesium", jenis: "trapesium", sisi: 4, sudut: 4, beraturan: false, keluarga: "segiempat" },
  { id: "s5", nama: "segilima beraturan", jenis: "segilima", sisi: 5, sudut: 5, beraturan: true, keluarga: "segi-banyak" },
  { id: "s6", nama: "segienam beraturan", jenis: "segienam", sisi: 6, sudut: 6, beraturan: true, keluarga: "segi-banyak" },
  { id: "ling", nama: "lingkaran", jenis: "bukan-segi-banyak", sisi: 0, sudut: 0, beraturan: false, keluarga: "lain" },
];

export const byId = (id: string) => BANGUN.find((b) => b.id === id)!;

/* ===== A: Ciri-ciri ===== */
export const RONDE_HITUNG_CA: { bangun: Bangun; tanya: "sisi" | "sudut"; jawab: number }[][] = [
  [
    { bangun: byId("s3"), tanya: "sisi", jawab: 3 },
    { bangun: byId("ps"), tanya: "sudut", jawab: 4 },
  ],
  [
    { bangun: byId("s5"), tanya: "sisi", jawab: 5 },
    { bangun: byId("s6"), tanya: "sudut", jawab: 6 },
  ],
  [
    { bangun: byId("pp"), tanya: "sisi", jawab: 4 },
    { bangun: byId("sik"), tanya: "sudut", jawab: 3 },
  ],
];
export const RONDE_JENIS_CA: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Segi banyak yang semua sisi dan sudutnya sama disebut …", jawab: "beraturan", opsi: ["beraturan", "tak beraturan", "terbuka"], pesan: "Definisi buku." },
    { tanya: "Kurva tertutup dibatasi ≥3 ruas garis disebut …", jawab: "segi banyak", opsi: ["segi banyak", "garis", "sudut"], pesan: "Definisi segi banyak." },
  ],
  [
    { tanya: "Segitiga dengan 1 sudut 90° disebut …", jawab: "siku-siku", opsi: ["siku-siku", "lancip", "tumpul"], pesan: "Segitiga siku-siku." },
    { tanya: "Segitiga dengan 1 sudut > 90° disebut …", jawab: "tumpul", opsi: ["tumpul", "lancip", "siku-siku"], pesan: "Segitiga tumpul." },
  ],
  [
    { tanya: "Semua sisi sama dan semua sudut siku-siku: …", jawab: "persegi", opsi: ["persegi", "jajargenjang", "trapesium"], pesan: "Ciri persegi." },
    { tanya: "Dua pasang sisi sejajar, sudut siku-siku, sisi berhadapan sama: …", jawab: "persegi panjang", opsi: ["persegi panjang", "layang-layang", "segilima"], pesan: "Ciri persegi panjang." },
  ],
];
export const RONDE_SORTIR_CA: { id: string; label: string; bin: "beraturan" | "tak" }[][] = [
  [
    { id: "s3", label: "segitiga sama sisi", bin: "beraturan" },
    { id: "ss", label: "segitiga sembarang", bin: "tak" },
    { id: "ps", label: "persegi", bin: "beraturan" },
    { id: "jg", label: "jajargenjang", bin: "tak" },
    { id: "s5", label: "segilima beraturan", bin: "beraturan" },
    { id: "tr", label: "trapesium", bin: "tak" },
  ],
  [
    { id: "s6", label: "segienam beraturan", bin: "beraturan" },
    { id: "ll", label: "layang-layang", bin: "tak" },
    { id: "ps2", label: "persegi", bin: "beraturan" },
    { id: "sik", label: "segitiga siku-siku", bin: "tak" },
    { id: "s3b", label: "segitiga sama sisi", bin: "beraturan" },
    { id: "pp", label: "persegi panjang", bin: "tak" },
  ],
  [
    { id: "s5b", label: "segilima beraturan", bin: "beraturan" },
    { id: "stu", label: "segitiga tumpul", bin: "tak" },
    { id: "ps3", label: "persegi", bin: "beraturan" },
    { id: "bk", label: "belah ketupat", bin: "tak" },
    { id: "s6b", label: "segienam beraturan", bin: "beraturan" },
    { id: "sk", label: "segitiga sama kaki", bin: "tak" },
  ],
];
export const RONDE_PASANG_CA: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "3 sisi & 3 sudut", kanan: "segitiga" },
    { kiri: "4 sisi & 4 sudut", kanan: "segiempat" },
    { kiri: "5 sisi", kanan: "segilima" },
    { kiri: "6 sisi", kanan: "segienam" },
  ],
  [
    { kiri: "semua sudut lancip", kanan: "segitiga lancip" },
    { kiri: "ada sudut 90°", kanan: "segitiga siku-siku" },
    { kiri: "ada sudut tumpul", kanan: "segitiga tumpul" },
    { kiri: "semua sisi sama + siku-siku", kanan: "persegi" },
  ],
  [
    { kiri: "2 pasang sisi sejajar", kanan: "jajargenjang" },
    { kiri: "semua sisi sama (segiempat)", kanan: "belah ketupat" },
    { kiri: "1 pasang sisi sejajar", kanan: "trapesium" },
    { kiri: "2 pasang sisi berdekatan sama", kanan: "layang-layang" },
  ],
];
export const RONDE_MEMORI_CA = RONDE_PASANG_CA;
export const RONDE_KETUK_CA: { item: Bangun[]; tanya: string[] }[] = [
  { item: [byId("s3"), byId("ps"), byId("s5"), byId("pp"), byId("s6"), byId("sik")], tanya: ["persegi", "segilima beraturan", "segitiga siku-siku"] },
  { item: [byId("jg"), byId("bk"), byId("ll"), byId("tr"), byId("sk"), byId("stu")], tanya: ["belah ketupat", "trapesium", "segitiga tumpul"] },
  { item: [byId("ps"), byId("pp"), byId("s3"), byId("s6"), byId("ling"), byId("ss")], tanya: ["persegi panjang", "segienam beraturan", "segitiga sama sisi"] },
];
export const RONDE_SEMUA_CA: { bin: "beraturan" | "tak" | "segitiga" | "segiempat"; item: { id: string; label: string; cocok: boolean }[] }[] = [
  {
    bin: "beraturan",
    item: [
      { id: "s3", label: "segitiga sama sisi", cocok: true },
      { id: "ps", label: "persegi", cocok: true },
      { id: "jg", label: "jajargenjang", cocok: false },
      { id: "s5", label: "segilima beraturan", cocok: true },
      { id: "tr", label: "trapesium", cocok: false },
      { id: "ss", label: "segitiga sembarang", cocok: false },
    ],
  },
  {
    bin: "segitiga",
    item: [
      { id: "sik", label: "siku-siku", cocok: true },
      { id: "ps", label: "persegi", cocok: false },
      { id: "stu", label: "tumpul", cocok: true },
      { id: "pp", label: "persegi panjang", cocok: false },
      { id: "sk", label: "sama kaki", cocok: true },
      { id: "s6", label: "segienam", cocok: false },
    ],
  },
  {
    bin: "segiempat",
    item: [
      { id: "ps", label: "persegi", cocok: true },
      { id: "s3", label: "segitiga", cocok: false },
      { id: "ll", label: "layang-layang", cocok: true },
      { id: "s5", label: "segilima", cocok: false },
      { id: "bk", label: "belah ketupat", cocok: true },
      { id: "ling", label: "lingkaran", cocok: false },
    ],
  },
];
export const RONDE_CERITA_CA: { teks: string; jawab: string | number; opsi: (string | number)[]; pesan: string }[][] = [
  [
    { teks: "Rambu lalu lintas berbentuk segitiga. Jumlah sisinya?", jawab: 3, opsi: [3, 4, 5], pesan: "Segitiga punya 3 sisi." },
    { teks: "Lingkaran termasuk segi banyak?", jawab: "bukan", opsi: ["bukan", "ya", "kadang"], pesan: "Segi banyak dibatasi ruas garis lurus." },
  ],
  [
    { teks: "Segitiga KLM punya 1 sudut siku di K. Jenisnya?", jawab: "siku-siku", opsi: ["siku-siku", "tumpul", "lancip"], pesan: "Contoh buku." },
    { teks: "Persegi ABCD: semua sisi sama dan semua sudut …", jawab: "siku-siku", opsi: ["siku-siku", "lancip", "tumpul"], pesan: "Ciri persegi." },
  ],
  [
    { teks: "Jajargenjang punya berapa pasang sisi sejajar?", jawab: 2, opsi: [2, 1, 0], pesan: "Dua pasang sisi sejajar." },
    { teks: "Trapesium punya berapa pasang sisi sejajar?", jawab: 1, opsi: [1, 2, 0], pesan: "Satu pasang sisi sejajar." },
  ],
];
export const RONDE_URUT_CA: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [3, 6, 4, 5], dari: "kecil" },
  { angka: [6, 3, 5, 4], dari: "besar" },
  { angka: [4, 3, 6, 5], dari: "kecil" },
];
export const RONDE_HITUNG_PA = RONDE_HITUNG_CA;
export const RONDE_PASANG_PA = RONDE_PASANG_CA;
export const RONDE_MEMORI_PA = RONDE_MEMORI_CA;
export const RONDE_SORTIR_PA = RONDE_SORTIR_CA;
export const RONDE_SEMUA_PA = RONDE_SEMUA_CA;
export const RONDE_JENIS_PA = RONDE_JENIS_CA;
export const RONDE_TABEL_PA: { baris: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { baris: "Segitiga → banyak sisi", jawab: "3", opsi: ["3", "4", "5"], pesan: "Tabel buku." },
    { baris: "Segiempat → banyak sudut", jawab: "4", opsi: ["4", "3", "6"], pesan: "Tabel buku." },
  ],
  [
    { baris: "Segilima → banyak sisi", jawab: "5", opsi: ["5", "6", "4"], pesan: "Nama mengikuti sisi." },
    { baris: "Segienam → banyak sudut", jawab: "6", opsi: ["6", "5", "8"], pesan: "Nama mengikuti sudut." },
  ],
  [
    { baris: "Persegi → sudut", jawab: "siku-siku semua", opsi: ["siku-siku semua", "ada tumpul", "semua lancip"], pesan: "Ciri persegi." },
    { baris: "Segitiga lancip → sudut", jawab: "semua lancip", opsi: ["semua lancip", "ada siku", "ada tumpul"], pesan: "Definisi." },
  ],
];
export const RONDE_BENARSALAH_QA: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Segi banyak dibatasi paling sedikit 3 ruas garis.", benar: true, penjelasan: "Definisi buku." },
    { teks: "Lingkaran adalah segi banyak.", benar: false, penjelasan: "Tidak dibatasi ruas garis lurus." },
    { teks: "Segitiga sama sisi adalah segi banyak beraturan.", benar: true, penjelasan: "Sisi dan sudut sama." },
    { teks: "Trapesium punya dua pasang sisi sejajar.", benar: false, penjelasan: "Trapesium 1 pasang; jajargenjang 2 pasang." },
  ],
  [
    { teks: "Segitiga siku-siku punya tepat 1 sudut 90°.", benar: true, penjelasan: "Definisi." },
    { teks: "Persegi panjang semua sisinya sama panjang.", benar: false, penjelasan: "Sisi berhadapan sama; semua sisi sama = persegi." },
    { teks: "Belah ketupat semua sisinya sama panjang.", benar: true, penjelasan: "Ciri buku." },
    { teks: "Segitiga tumpul bisa sekaligus siku-siku.", benar: false, penjelasan: "Satu sudut tidak bisa tumpul dan siku sekaligus." },
  ],
];
export const RONDE_DETEKTIF_QA: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["Aku 3 sisi.", "Semua sudutku lancip."], jawab: "segitiga lancip", opsi: ["segitiga lancip", "persegi", "trapesium"], salah: "3 sisi + semua lancip." },
  { klue: ["Semua sisiku sama.", "Semua sudutku siku-siku."], jawab: "persegi", opsi: ["persegi", "belah ketupat", "jajargenjang"], salah: "Itu persegi." },
  { klue: ["Aku punya 1 pasang sisi sejajar."], jawab: "trapesium", opsi: ["trapesium", "persegi", "segilima"], salah: "Trapesium." },
  { klue: ["Aku segi banyak.", "5 sisi sama panjang."], jawab: "segilima beraturan", opsi: ["segilima beraturan", "segienam", "segiempat"], salah: "Segilima beraturan." },
];
export const PETA_KONSEP_QA = [
  {
    pusat: "Bangun Datar",
    kotak: [
      { label: "Segi banyak", opsi: ["kurva tertutup ≥3 sisi", "hanya lingkaran", "garis terbuka"], benar: 0 },
      { label: "Beraturan", opsi: ["sisi & sudut sama", "sisi beda semua", "tanpa sudut"], benar: 0 },
      { label: "Segitiga", opsi: ["3 sisi 3 sudut", "4 sisi", "5 sudut"], benar: 0 },
      { label: "Segiempat", opsi: ["4 sisi 4 sudut", "3 sisi", "6 sisi"], benar: 0 },
    ],
  },
];
export const RONDE_CERITA_QA = RONDE_CERITA_CA;

/* ===== B: Komposisi & dekomposisi ===== */
export type Resep = { id: string; bagian: string[]; hasil: string; jenis: "komposisi" | "dekomposisi" };
export const RESEP: Resep[] = [
  { id: "r1", bagian: ["2 segitiga"], hasil: "persegi panjang", jenis: "komposisi" },
  { id: "r2", bagian: ["2 segitiga"], hasil: "persegi", jenis: "komposisi" },
  { id: "r3", bagian: ["4 segitiga"], hasil: "persegi", jenis: "komposisi" },
  { id: "r4", bagian: ["2 persegi panjang"], hasil: "persegi panjang besar", jenis: "komposisi" },
  { id: "r5", bagian: ["persegi"], hasil: "2 segitiga", jenis: "dekomposisi" },
  { id: "r6", bagian: ["persegi panjang"], hasil: "2 segitiga", jenis: "dekomposisi" },
  { id: "r7", bagian: ["segienam"], hasil: "6 segitiga", jenis: "dekomposisi" },
  { id: "r8", bagian: ["trapesium"], hasil: "3 segitiga", jenis: "dekomposisi" },
  { id: "r9", bagian: ["3 segitiga"], hasil: "trapesium", jenis: "komposisi" },
  { id: "r10", bagian: ["persegi + 2 segitiga"], hasil: "rumah", jenis: "komposisi" },
];

export const RONDE_BACA_CB: Resep[][] = [
  [RESEP[0], RESEP[4]],
  [RESEP[2], RESEP[6]],
  [RESEP[9], RESEP[5]],
];
export const RONDE_JENIS_CB: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Menyusun beberapa bangun jadi satu disebut …", jawab: "komposisi", opsi: ["komposisi", "dekomposisi", "pengurangan"], pesan: "Definisi buku." },
    { tanya: "Menguraikan satu bangun jadi beberapa disebut …", jawab: "dekomposisi", opsi: ["dekomposisi", "komposisi", "perkalian"], pesan: "Definisi buku." },
  ],
  [
    { tanya: "Persegi diiris diagonal menjadi …", jawab: "2 segitiga", opsi: ["2 segitiga", "3 segitiga", "4 persegi"], pesan: "Dekomposisi dasar." },
    { tanya: "Dua segitiga sama sisi bisa disusun menjadi …", jawab: "jajargenjang / belah ketupat", opsi: ["jajargenjang / belah ketupat", "lingkaran", "segilima"], pesan: "Komposisi segitiga." },
  ],
  [
    { tanya: "Peta Indonesia di buku diuraikan menjadi bangun datar. Itu contoh …", jawab: "dekomposisi", opsi: ["dekomposisi", "hanya pewarnaan", "pengukuran volume"], pesan: "Contoh konteks buku." },
    { tanya: "Tangram menyusun bangun dari potongan. Itu …", jawab: "komposisi", opsi: ["komposisi", "dekomposisi saja", "pola bilangan"], pesan: "Menyusun = komposisi." },
  ],
];
export const RONDE_SORTIR_CB: { id: string; label: string; bin: "komposisi" | "dekomposisi" }[][] = [
  [
    { id: "a", label: "2 segitiga → persegi", bin: "komposisi" },
    { id: "b", label: "persegi → 2 segitiga", bin: "dekomposisi" },
    { id: "c", label: "3 segitiga → trapesium", bin: "komposisi" },
    { id: "d", label: "segienam → 6 segitiga", bin: "dekomposisi" },
    { id: "e", label: "rumah dari persegi+segitiga", bin: "komposisi" },
    { id: "f", label: "trapesium → 3 segitiga", bin: "dekomposisi" },
  ],
  [
    { id: "a2", label: "4 segitiga → persegi", bin: "komposisi" },
    { id: "b2", label: "persegi panjang → 2 segitiga", bin: "dekomposisi" },
    { id: "c2", label: "susun peta dari bangun", bin: "komposisi" },
    { id: "d2", label: "iris peta jadi bangun", bin: "dekomposisi" },
    { id: "e2", label: "2 persegi panjang → besar", bin: "komposisi" },
    { id: "f2", label: "belah ketupat → 2 segitiga", bin: "dekomposisi" },
  ],
  [
    { id: "a3", label: "tangram susun kucing", bin: "komposisi" },
    { id: "b3", label: "potong kertas jadi 4", bin: "dekomposisi" },
    { id: "c3", label: "gabung 2 segitiga", bin: "komposisi" },
    { id: "d3", label: "urai segienam", bin: "dekomposisi" },
    { id: "e3", label: "susun rumah", bin: "komposisi" },
    { id: "f3", label: "urai trapesium", bin: "dekomposisi" },
  ],
];
export const RONDE_PASANG_CB: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "2 segitiga", kanan: "→ persegi / persegi panjang" },
    { kiri: "persegi", kanan: "→ 2 segitiga" },
    { kiri: "segienam", kanan: "→ 6 segitiga" },
    { kiri: "3 segitiga", kanan: "→ trapesium" },
  ],
  [
    { kiri: "menyusun", kanan: "komposisi" },
    { kiri: "menguraikan", kanan: "dekomposisi" },
    { kiri: "persegi + 2 segitiga", kanan: "rumah" },
    { kiri: "4 segitiga", kanan: "→ persegi" },
  ],
  [
    { kiri: "peta Indonesia", kanan: "contoh dekomposisi" },
    { kiri: "tangram", kanan: "contoh komposisi" },
    { kiri: "trapesium", kanan: "→ 3 segitiga" },
    { kiri: "2 persegi panjang", kanan: "→ persegi panjang besar" },
  ],
];
export const RONDE_MEMORI_CB = RONDE_PASANG_CB;
export const RONDE_KETUK_CB: { item: Resep[]; tanya: string[] }[] = [
  { item: [RESEP[0], RESEP[4], RESEP[2], RESEP[6], RESEP[9], RESEP[7]], tanya: ["persegi panjang", "2 segitiga", "rumah"] },
  { item: [RESEP[1], RESEP[5], RESEP[3], RESEP[8], RESEP[6], RESEP[4]], tanya: ["persegi", "6 segitiga", "trapesium"] },
  { item: [RESEP[9], RESEP[0], RESEP[7], RESEP[2], RESEP[5], RESEP[6]], tanya: ["rumah", "3 segitiga", "persegi panjang"] },
];
export const RONDE_SEMUA_CB = RONDE_SORTIR_CB.map((ro, i) => ({
  jenis: (i % 2 === 0 ? "komposisi" : "dekomposisi") as "komposisi" | "dekomposisi",
  item: ro,
}));
export const cocokJenisKomp = (x: { bin: string }, jenis: string) => x.bin === jenis;
export const RONDE_CERITA_CB: { teks: string; jawab: string | number; opsi: (string | number)[]; pesan: string }[][] = [
  [
    { teks: "Helen memotong persegi sepanjang diagonal. Hasilnya?", jawab: "2 segitiga", opsi: ["2 segitiga", "4 persegi", "3 segitiga"], pesan: "Dekomposisi persegi." },
    { teks: "Dua segitiga sama kaki disusun jadi satu bangun. Kegiatan ini …", jawab: "komposisi", opsi: ["komposisi", "dekomposisi", "pengukuran"], pesan: "Menyusun = komposisi." },
  ],
  [
    { teks: "Segienam beraturan diurai sempurna jadi segitiga. Banyaknya?", jawab: 6, opsi: [6, 4, 3], pesan: "Dari pusat ke tiap sisi." },
    { teks: "Membuat rumah dari 1 persegi dan 2 segitiga adalah …", jawab: "komposisi", opsi: ["komposisi", "dekomposisi", "pola bilangan"], pesan: "Menyusun bagian." },
  ],
  [
    { teks: "Peta digunting jadi bangun datar. Itu …", jawab: "dekomposisi", opsi: ["dekomposisi", "komposisi", "volume"], pesan: "Mengurai." },
    { teks: "Berapa segitiga minimal untuk menyusun trapesium sederhana?", jawab: 3, opsi: [3, 1, 5], pesan: "Resep umum." },
  ],
];
export const RONDE_URUT_CB: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [2, 6, 3, 4], dari: "kecil" },
  { angka: [6, 2, 4, 3], dari: "besar" },
  { angka: [3, 2, 6, 4], dari: "kecil" },
];
export const RONDE_BACA_PB = RONDE_BACA_CB;
export const RONDE_PASANG_PB = RONDE_PASANG_CB;
export const RONDE_MEMORI_PB = RONDE_MEMORI_CB;
export const RONDE_SORTIR_PB = RONDE_SORTIR_CB;
export const RONDE_SEMUA_PB = RONDE_SEMUA_CB;
export const RONDE_JENIS_PB = RONDE_JENIS_CB;
export const RONDE_TABEL_PB: { baris: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { baris: "persegi → ?", jawab: "2 segitiga", opsi: ["2 segitiga", "3 segitiga", "1 lingkaran"], pesan: "Dekomposisi." },
    { baris: "2 segitiga → ?", jawab: "persegi / persegi panjang", opsi: ["persegi / persegi panjang", "segilima", "lingkaran"], pesan: "Komposisi." },
  ],
  [
    { baris: "segienam → ?", jawab: "6 segitiga", opsi: ["6 segitiga", "4 segitiga", "2 persegi"], pesan: "Dekomposisi." },
    { baris: "3 segitiga → ?", jawab: "trapesium", opsi: ["trapesium", "lingkaran", "kubus"], pesan: "Komposisi." },
  ],
  [
    { baris: "menyusun", jawab: "komposisi", opsi: ["komposisi", "dekomposisi", "luas"], pesan: "Istilah." },
    { baris: "mengurai", jawab: "dekomposisi", opsi: ["dekomposisi", "komposisi", "volume"], pesan: "Istilah." },
  ],
];
export const RONDE_BENARSALAH_QB: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Komposisi = menyusun bangun menjadi bangun baru.", benar: true, penjelasan: "Definisi." },
    { teks: "Dekomposisi = menggabungkan bangun tanpa memotong.", benar: false, penjelasan: "Dekomposisi = mengurai." },
    { teks: "Satu bangun bisa diurai lebih dari satu cara.", benar: true, penjelasan: "Buku menekankan banyak cara." },
    { teks: "Komposisi hanya boleh memakai segitiga.", benar: false, penjelasan: "Boleh berbagai bangun datar." },
  ],
  [
    { teks: "Persegi bisa diurai jadi 2 segitiga.", benar: true, penjelasan: "Iris diagonal." },
    { teks: "Tangram adalah contoh komposisi.", benar: true, penjelasan: "Menyusun potongan." },
    { teks: "Dekomposisi mengubah luas bangun secara wajib.", benar: false, penjelasan: "Luas total tetap; hanya diurai." },
    { teks: "Peta bisa dijadikan konteks dekomposisi.", benar: true, penjelasan: "Contoh buku." },
  ],
];
export const RONDE_DETEKTIF_QB: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["Aku menyusun.", "Dari bagian jadi utuh."], jawab: "komposisi", opsi: ["komposisi", "dekomposisi", "pola"], salah: "Komposisi." },
  { klue: ["Aku mengurai persegi.", "Hasilku 2 bagian."], jawab: "2 segitiga", opsi: ["2 segitiga", "4 lingkaran", "3 persegi"], salah: "2 segitiga." },
  { klue: ["Aku segienam.", "Diurai sempurna."], jawab: "6 segitiga", opsi: ["6 segitiga", "5 segitiga", "2 persegi"], salah: "6 segitiga." },
  { klue: ["Aku rumah sederhana.", "Bagianku persegi dan segitiga."], jawab: "komposisi", opsi: ["komposisi", "volume", "persen"], salah: "Menyusun rumah = komposisi." },
];
export const PETA_KONSEP_QB = [
  {
    pusat: "Komposisi & Dekomposisi",
    kotak: [
      { label: "Komposisi", opsi: ["menyusun bagian → utuh", "mengurai utuh", "mengukur volume"], benar: 0 },
      { label: "Dekomposisi", opsi: ["mengurai utuh → bagian", "menyusun saja", "pola bilangan"], benar: 0 },
      { label: "Contoh", opsi: ["persegi ↔ 2 segitiga", "1 m² = 10.000 cm²", "1 l = 1.000 ml"], benar: 0 },
      { label: "Sifat", opsi: ["banyak cara mungkin", "hanya satu cara", "tidak boleh diubah"], benar: 0 },
    ],
  },
];
export const RONDE_CERITA_QB = RONDE_CERITA_CB;
