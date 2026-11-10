/**
 * Data murni Matematika Kelas 6 Bab 1 (Pecahan dan Desimal): Sub-Bab A–C.
 * Sumber: Buku Siswa Matematika Kelas VI Kemendikbudristek Bab 1 hlm. 1–41.
 * Adopsi metode naskah IGIL lama: Area Model, Panah Lurus, Panah Menyilang, Ubah ke 10/100.
 * Tanpa React/jaringan. Uji: scripts/uji-statis-k6b1.mjs.
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
export const opsiTeks = (benar: string, pengecoh: string[], seed: number) => {
  const o = [benar, ...pengecoh.slice(0, 2)];
  while (o.length < 3) o.push(`?${o.length}`);
  return urutanTetap(3, 1, seed).map((i) => o[i]);
};
export const opsiAngka = (h: number, seed: number) => {
  const o = [h, h + 1 + (seed % 3), Math.max(0, h - 2 - (seed % 2))];
  if (o[1] === h) o[1] = h + 4;
  if (o[2] === h || o[2] === o[1]) o[2] = h + 6;
  return urutanTetap(3, 1, seed).map((i) => String(o[i]));
};

export const ANGKA_BUKU = {
  duaKaliTigaPerLimaPembilang: 6,
  limaKaliTigaPerLima: 3,
  duaPerTigaKaliLimaBelas: 10,
  seperempatKaliDuaPuluh: 5,
  setengahBagiTigaPenyebut: 6,
  tigaBagiSeperempat: 12,
  enamBagiTigaPerEmpat: 8,
  setengahKePersepuluhan: 5,
  seperlimaKePersepuluhan: 2,
} as const;

// ========== A · Perkalian Pecahan ==========
export const RONDE_HITUNG_CA: { label: string; hasil: number; pesan: string }[][] = [
  [
    { label: "2 × 3/5 → pembilang (penyebut 5)", hasil: 6, pesan: "2/1 × 3/5 = 6/5. Area Model + Panah Lurus." },
    { label: "5 × 3/5 → hasil bilangan asli", hasil: 3, pesan: "15/5 = 3 meter persegi." },
  ],
  [
    { label: "2/3 × 15 → hasil pohon", hasil: 10, pesan: "2/3 × 15/1 = 30/3 = 10." },
    { label: "1/4 × 20 → jeruk", hasil: 5, pesan: "20 × 1/4 = 5; komutatif." },
  ],
  [
    { label: "4 × 2/5 → pembilang (penyebut 5)", hasil: 8, pesan: "4/1 × 2/5 = 8/5 liter." },
    { label: "3 × 1/3 → hasil utuh", hasil: 1, pesan: "3/3 = 1." },
  ],
];
export const RONDE_ARTI_CA: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "METODE LUAR Straight-Arrow Multiply (Panah Lurus)?", jawab: "kali atas dengan atas dan bawah dengan bawah", opsi: ["kali atas dengan atas dan bawah dengan bawah", "silangkan ke kebalikan", "bagi pembilang saja"], pesan: "Naskah lama." },
    { tanya: "Bilangan asli 2 ditulis sebagai?", jawab: "2/1", opsi: ["2/1", "1/2", "2/2"], pesan: "Whole-as-Fraction." },
  ],
  [
    { tanya: "Area Model Multiplication menekankan?", jawab: "gambar bagian luas untuk memahami hasil kali", opsi: ["gambar bagian luas untuk memahami hasil kali", "hanya hitung angka tanpa arti", "panah menyilang"], pesan: "Area Model." },
    { tanya: "Urutan a × b/c dibanding b/c × a?", jawab: "hasil sama (komutatif)", opsi: ["hasil sama (komutatif)", "selalu berbeda", "hanya sama jika a=1"], pesan: "Commutative Multiply Check." },
  ],
  [
    { tanya: "2 × 3/5 = ?", jawab: "6/5", opsi: ["6/5", "5/6", "2/15"], pesan: "Panah lurus." },
    { tanya: "Kesalahan umum saat kali pecahan?", jawab: "menyilang seperti operasi bagi", opsi: ["menyilang seperti operasi bagi", "menulis a/1", "mengalikan atas dan bawah"], pesan: "Jangan tertukar." },
  ],
];
export const RONDE_SORTIR_CA: { id: string; label: string; bin: "ya" | "tidak" }[][] = [
  [
    { id: "a1", label: "panah lurus untuk ×", bin: "ya" }, { id: "a2", label: "panah silang untuk ×", bin: "tidak" }, { id: "a3", label: "tulis a sebagai a/1", bin: "ya" },
    { id: "a4", label: "lupa a/1 OK", bin: "tidak" }, { id: "a5", label: "Area Model membantu", bin: "ya" }, { id: "a6", label: "kali hanya pembilang", bin: "tidak" },
  ],
  [
    { id: "b1", label: "2×3/5=6/5", bin: "ya" }, { id: "b2", label: "2×3/5=5/6", bin: "tidak" }, { id: "b3", label: "komutatif berlaku", bin: "ya" },
    { id: "b4", label: "urutan selalu ubah hasil", bin: "tidak" }, { id: "b5", label: "5×3/5=3", bin: "ya" }, { id: "b6", label: "5×3/5=15", bin: "tidak" },
  ],
  [
    { id: "c1", label: "Whole-as-Fraction", bin: "ya" }, { id: "c2", label: "silang = kali", bin: "tidak" }, { id: "c3", label: "tafsir satuan", bin: "ya" },
    { id: "c4", label: "abaikan m²/liter", bin: "tidak" }, { id: "c5", label: "2/3×15=10", bin: "ya" }, { id: "c6", label: "2/3×15=30", bin: "tidak" },
  ],
];
export const RONDE_PASANG_CA: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "Panah lurus", kanan: "× atas & bawah" }, { kiri: "a = a/1", kanan: "Whole-as-Fraction" },
    { kiri: "2 × 3/5", kanan: "6/5" }, { kiri: "Area Model", kanan: "luas bagian" },
  ],
  [
    { kiri: "5 × 3/5", kanan: "3" }, { kiri: "2/3 × 15", kanan: "10 pohon" },
    { kiri: "1/4 × 20", kanan: "5" }, { kiri: "komutatif", kanan: "urutan bebas" },
  ],
  [
    { kiri: "4 × 2/5", kanan: "8/5 liter" }, { kiri: "rumus", kanan: "(a×b)/c" },
    { kiri: "ember kecil", kanan: "3/5 m²" }, { kiri: "jangan", kanan: "silang saat ×" },
  ],
];
export const RONDE_MEMORI_CA = RONDE_PASANG_CA;
export const RONDE_KETUK_CA: { item: number[]; tanya: number[] }[] = [
  { item: [1, 2, 3, 5, 6, 10], tanya: [6, 10] },
  { item: [3, 5, 8, 10, 15, 20], tanya: [3, 5, 10] },
  { item: [1, 4, 5, 6, 8, 10], tanya: [5, 8] },
];
export const RONDE_SEMUA_CA: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "langkah kali pecahan benar", item: [
    { id: "a", label: "tulis a/1", cocok: true }, { id: "b", label: "panah lurus", cocok: true }, { id: "c", label: "panah silang", cocok: false }, { id: "d", label: "tafsir satuan", cocok: true },
  ]},
  { label: "fakta buku A", item: [
    { id: "a", label: "2×3/5=6/5", cocok: true }, { id: "b", label: "5×3/5=3", cocok: true }, { id: "c", label: "2×3/5=5/6", cocok: false }, { id: "d", label: "2/3×15=10", cocok: true },
  ]},
  { label: "metode luar A", item: [
    { id: "a", label: "Area Model", cocok: true }, { id: "b", label: "Straight-Arrow", cocok: true }, { id: "c", label: "Cross-Arrow (bagi)", cocok: false }, { id: "d", label: "Whole-as-Fraction", cocok: true },
  ]},
];
export const RONDE_CERITA_CA: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "Dua ember kecil 3/5 m². Total?", jawab: "6/5", opsi: ["6/5", "5/6", "2/5"], pesan: "Area Model." },
    { teks: "2/3 dari 15 pohon manalagi?", jawab: "10", opsi: ["10", "15", "5"], pesan: "Panah lurus." },
  ],
  [
    { teks: "Bilangan asli 5 ditulis?", jawab: "5/1", opsi: ["5/1", "1/5", "5/5"], pesan: "Whole-as-Fraction." },
    { teks: "1/4 × 20 jeruk?", jawab: "5", opsi: ["5", "20", "4"], pesan: "Komutatif." },
  ],
  [
    { teks: "METODE LUAR Panah Lurus artinya?", jawab: "kali sejajar atas-bawah", opsi: ["kali sejajar atas-bawah", "kali menyilang", "bagi saja"], pesan: "Straight-Arrow." },
    { teks: "5 × 3/5 m² menjadi?", jawab: "3", opsi: ["3", "15", "8"], pesan: "15/5=3." },
  ],
];
export const RONDE_URUT_CA: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [1, 10, 3, 5], dari: "kecil" },
  { angka: [15, 6, 8, 3], dari: "besar" },
  { angka: [2, 20, 5, 10], dari: "kecil" },
];
export const RONDE_HITUNG_PA = RONDE_HITUNG_CA;
export const RONDE_ARTI_PA = RONDE_ARTI_CA;
export const RONDE_PASANG_PA = RONDE_PASANG_CA;
export const RONDE_MEMORI_PA = RONDE_MEMORI_CA;
export const RONDE_SORTIR_PA = RONDE_SORTIR_CA;
export const RONDE_SEMUA_PA = RONDE_SEMUA_CA;
export const RONDE_CERITA_PA = RONDE_CERITA_CA;
export const RONDE_TABEL_PA: { baris: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { baris: "2 × 3/5", jawab: "6/5", opsi: ["6/5", "5/6", "2/15"], pesan: "Lurus." },
    { baris: "a sebagai pecahan", jawab: "a/1", opsi: ["a/1", "1/a", "a/a"], pesan: "Whole." },
  ],
  [
    { baris: "5 × 3/5", jawab: "3", opsi: ["3", "15", "8"], pesan: "Sederhana." },
    { baris: "2/3 × 15", jawab: "10", opsi: ["10", "30", "5"], pesan: "Manalagi." },
  ],
  [
    { baris: "operasi kali", jawab: "panah lurus", opsi: ["panah lurus", "panah silang", "tanpa panah"], pesan: "Protokol." },
    { baris: "1/4 × 20", jawab: "5", opsi: ["5", "80", "4"], pesan: "Komutatif." },
  ],
];
export const RONDE_BENARSALAH_QA: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Perkalian pecahan memakai panah lurus.", benar: true, penjelasan: "Straight-Arrow." },
    { teks: "Bilangan asli tidak perlu ditulis a/1.", benar: false, penjelasan: "Wajib Whole-as-Fraction." },
    { teks: "2 × 3/5 = 6/5.", benar: true, penjelasan: "Benar." },
  ],
  [
    { teks: "Area Model membantu arti hasil kali.", benar: true, penjelasan: "Metode luar." },
    { teks: "Saat kali, panah harus menyilang.", benar: false, penjelasan: "Silang untuk bagi." },
    { teks: "2/3 × 15 = 10.", benar: true, penjelasan: "30/3=10." },
  ],
];
export const RONDE_DETEKTIF_QA: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["ember kecil", "dua kali", "3/5"], jawab: "6/5", opsi: ["6/5", "5/6", "2/5"], salah: "Area." },
  { klue: ["panah", "hijau", "lurus"], jawab: "kali atas-bawah", opsi: ["kali atas-bawah", "kali silang", "bagi saja"], salah: "Straight-Arrow." },
  { klue: ["pohon", "2/3", "15"], jawab: "10", opsi: ["10", "15", "5"], salah: "Manalagi." },
];
export const PETA_KONSEP_QA = [{
  pusat: "Perkalian Pecahan",
  kotak: [
    { label: "Tulis asli", opsi: ["a/1", "1/a", "a saja tanpa pecahan"], benar: 0 },
    { label: "Panah", opsi: ["lurus (×)", "menyilang (:)", "tanpa panah"], benar: 0 },
    { label: "Hitung", opsi: ["(a×b)/(c×d)", "a+b saja", "silang dulu"], benar: 0 },
    { label: "Metode luar", opsi: ["Area / Straight-Arrow / Whole-as-Fraction", "Cross-Arrow saja", "Paper Fold saja"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QA = RONDE_CERITA_CA;

// ========== B · Pembagian Pecahan ==========
export const RONDE_HITUNG_CB: { derajat: number; hasil: number; pesan: string }[][] = [
  [
    { derajat: 2, hasil: 6, pesan: "1/2 : 3 = 1/6 → penyebut 6." },
    { derajat: 3, hasil: 9, pesan: "1/3 : 3 = 1/9 → penyebut 9." },
  ],
  [
    { derajat: 3, hasil: 12, pesan: "3 : 1/4 = 12 gelas." },
    { derajat: 3, hasil: 6, pesan: "3 : 1/2 = 6 gelas." },
  ],
  [
    { derajat: 6, hasil: 8, pesan: "6 : 3/4 = 8 bolu." },
    { derajat: 3, hasil: 15, pesan: "3 : 2/5 = 15/2 → pembilang 15." },
  ],
];
export const RONDE_RUMUS_CB: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "METODE LUAR Cross-Arrow Divide (Panah Menyilang)?", jawab: "bagi = kali kebalikan", opsi: ["bagi = kali kebalikan", "bagi = kali lurus tanpa kebalikan", "bagi = tambah penyebut"], pesan: "Naskah lama." },
    { tanya: "Kebalikan dari 3/1?", jawab: "1/3", opsi: ["1/3", "3/1", "3/3"], pesan: "Reciprocal." },
  ],
  [
    { tanya: "1/2 : 3 = ?", jawab: "1/6", opsi: ["1/6", "3/2", "2/3"], pesan: "Partition." },
    { tanya: "3 : 1/4 = ?", jawab: "12", opsi: ["12", "3/4", "4/3"], pesan: "Measurement Division." },
  ],
  [
    { tanya: "Invert-and-Multiply artinya?", jawab: "balik pecahan pembagi lalu kalikan", opsi: ["balik pecahan pembagi lalu kalikan", "hapus penyebut", "tambah pembilang"], pesan: "Reciprocal." },
    { tanya: "Kapan hasil bagi membesar?", jawab: "saat membagi bilangan asli dengan pecahan < 1", opsi: ["saat membagi bilangan asli dengan pecahan < 1", "selalu mengecil", "hanya jika penyebut 1"], pesan: "Measurement." },
  ],
];
export const RONDE_SORTIR_CB: { id: string; label: string; bin: "lancip" | "tumpul" }[][] = [
  [
    { id: "a1", label: "panah silang untuk :", bin: "lancip" }, { id: "a2", label: "panah lurus untuk :", bin: "tumpul" }, { id: "a3", label: "kali kebalikan", bin: "lancip" },
    { id: "a4", label: "lupa kebalikan OK", bin: "tumpul" }, { id: "a5", label: "1/2:3=1/6", bin: "lancip" }, { id: "a6", label: "1/2:3=3/2", bin: "tumpul" },
  ],
  [
    { id: "b1", label: "3:1/4=12", bin: "lancip" }, { id: "b2", label: "3:1/4=3/4", bin: "tumpul" }, { id: "b3", label: "Reciprocal", bin: "lancip" },
    { id: "b4", label: "bagi = tambah saja", bin: "tumpul" }, { id: "b5", label: "Partition Division", bin: "lancip" }, { id: "b6", label: "silang untuk ×", bin: "tumpul" },
  ],
  [
    { id: "c1", label: "6:3/4=8", bin: "lancip" }, { id: "c2", label: "6:3/4=6", bin: "tumpul" }, { id: "c3", label: "Measurement Division", bin: "lancip" },
    { id: "c4", label: "hasil selalu < 1", bin: "tumpul" }, { id: "c5", label: "kotak merah pada yang dibagi", bin: "lancip" }, { id: "c6", label: "abaikan satuan", bin: "tumpul" },
  ],
];
export const RONDE_PASANG_CB: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "Panah silang", kanan: "× kebalikan" }, { kiri: "1/2 : 3", kanan: "1/6" },
    { kiri: "3 : 1/4", kanan: "12" }, { kiri: "kebalikan 2/5", kanan: "5/2" },
  ],
  [
    { kiri: "1/3 : 3", kanan: "1/9" }, { kiri: "3 : 1/2", kanan: "6" },
    { kiri: "6 : 3/4", kanan: "8 bolu" }, { kiri: "Partition", kanan: "bagi rata" },
  ],
  [
    { kiri: "Measurement", kanan: "berapa muat" }, { kiri: "3 : 2/5", kanan: "15/2" },
    { kiri: "3/4 : 2", kanan: "3/8" }, { kiri: "× vs :", kanan: "lurus vs silang" },
  ],
];
export const RONDE_MEMORI_CB = RONDE_PASANG_CB;
export const RONDE_KETUK_CB: { item: number[]; tanya: number[] }[] = [
  { item: [1, 3, 4, 6, 9, 12], tanya: [6, 12] },
  { item: [2, 5, 6, 8, 9, 15], tanya: [8, 6, 15] },
  { item: [3, 4, 6, 8, 12, 15], tanya: [12, 8] },
];
export const RONDE_SEMUA_CB: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "langkah bagi pecahan benar", item: [
    { id: "a", label: "cari kebalikan", cocok: true }, { id: "b", label: "panah silang", cocok: true }, { id: "c", label: "panah lurus tanpa balik", cocok: false }, { id: "d", label: "tafsir hasil", cocok: true },
  ]},
  { label: "fakta buku B", item: [
    { id: "a", label: "1/2:3=1/6", cocok: true }, { id: "b", label: "3:1/4=12", cocok: true }, { id: "c", label: "3:1/4=3/4", cocok: false }, { id: "d", label: "6:3/4=8", cocok: true },
  ]},
  { label: "metode luar B", item: [
    { id: "a", label: "Cross-Arrow", cocok: true }, { id: "b", label: "Reciprocal", cocok: true }, { id: "c", label: "Straight-Arrow (kali)", cocok: false }, { id: "d", label: "Partition/Measurement", cocok: true },
  ]},
];
export const RONDE_CERITA_CB: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "Setengah liter untuk 3 gelas. Tiap gelas?", jawab: "1/6", opsi: ["1/6", "1/2", "3/2"], pesan: "Partition." },
    { teks: "3 liter, tiap gelas 1/4 liter. Berapa gelas?", jawab: "12", opsi: ["12", "3", "4"], pesan: "Measurement." },
  ],
  [
    { teks: "Kebalikan 3/4?", jawab: "4/3", opsi: ["4/3", "3/4", "1/3"], pesan: "Reciprocal." },
    { teks: "6 adonan : 3/4 kg. Berapa bolu?", jawab: "8", opsi: ["8", "6", "3"], pesan: "Invert-and-Multiply." },
  ],
  [
    { teks: "METODE LUAR Panah Menyilang?", jawab: "bagi = kali kebalikan", opsi: ["bagi = kali kebalikan", "bagi = kali lurus", "bagi = kurang"], pesan: "Cross-Arrow." },
    { teks: "3/4 : 2 liter sirup?", jawab: "3/8", opsi: ["3/8", "6/4", "3/2"], pesan: "Partisi." },
  ],
];
export const RONDE_URUT_CB: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [6, 12, 8, 9], dari: "kecil" },
  { angka: [15, 3, 8, 6], dari: "besar" },
  { angka: [1, 12, 4, 8], dari: "kecil" },
];
export const RONDE_HITUNG_PB = RONDE_HITUNG_CB;
export const RONDE_RUMUS_PB = RONDE_RUMUS_CB;
export const RONDE_PASANG_PB = RONDE_PASANG_CB;
export const RONDE_MEMORI_PB = RONDE_MEMORI_CB;
export const RONDE_SORTIR_PB = RONDE_SORTIR_CB;
export const RONDE_SEMUA_PB = RONDE_SEMUA_CB;
export const RONDE_CERITA_PB = RONDE_CERITA_CB;
export const RONDE_TABEL_PB: { baris: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { baris: "1/2 : 3", jawab: "1/6", opsi: ["1/6", "3/2", "2/3"], pesan: "Bagi." },
    { baris: "kebalikan 5/2", jawab: "2/5", opsi: ["2/5", "5/2", "1/5"], pesan: "Reciprocal." },
  ],
  [
    { baris: "3 : 1/4", jawab: "12", opsi: ["12", "3/4", "4"], pesan: "Measurement." },
    { baris: "operasi bagi", jawab: "panah silang", opsi: ["panah silang", "panah lurus", "tanpa panah"], pesan: "Protokol." },
  ],
  [
    { baris: "6 : 3/4", jawab: "8", opsi: ["8", "6", "3"], pesan: "Bolu." },
    { baris: "1/3 : 3", jawab: "1/9", opsi: ["1/9", "1/3", "3"], pesan: "Partisi." },
  ],
];
export const RONDE_BENARSALAH_QB: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Pembagian pecahan memakai panah menyilang.", benar: true, penjelasan: "Cross-Arrow." },
    { teks: "Bagi tidak perlu kebalikan.", benar: false, penjelasan: "Wajib Reciprocal." },
    { teks: "3 : 1/4 = 12.", benar: true, penjelasan: "Measurement." },
  ],
  [
    { teks: "1/2 : 3 = 1/6.", benar: true, penjelasan: "Partition." },
    { teks: "Panah lurus dipakai untuk operasi bagi.", benar: false, penjelasan: "Lurus untuk kali." },
    { teks: "6 : 3/4 = 8.", benar: true, penjelasan: "Invert-and-Multiply." },
  ],
];
export const RONDE_DETEKTIF_QB: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["setengah liter", "tiga gelas", "hasil"], jawab: "1/6", opsi: ["1/6", "1/2", "3"], salah: "Partition." },
  { klue: ["panah", "hijau", "menyilang"], jawab: "kali kebalikan", opsi: ["kali kebalikan", "kali lurus", "tambah"], salah: "Cross-Arrow." },
  { klue: ["3 liter", "1/4", "gelas"], jawab: "12", opsi: ["12", "3", "4"], salah: "Measurement." },
];
export const PETA_KONSEP_QB = [{
  pusat: "Pembagian Pecahan",
  kotak: [
    { label: "Kebalikan", opsi: ["a/b → b/a", "a/b → a/b", "hapus penyebut"], benar: 0 },
    { label: "Panah", opsi: ["menyilang (:)", "lurus (×)", "tanpa panah"], benar: 0 },
    { label: "Hasil membesar", opsi: ["asli : pecahan < 1", "selalu mengecil", "hanya jika a=0"], benar: 0 },
    { label: "Metode luar", opsi: ["Cross-Arrow / Reciprocal / Partition-Measurement", "Straight-Arrow saja", "Grid Desimal saja"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QB = RONDE_CERITA_CB;

// ========== C · Bilangan Desimal ==========
/** derajat = kode tampilan (mis. 50 = 0,50; 5 = 0,5; 37 = 3,7) */
export const RONDE_HITUNG_CC: { derajat: number; hasil: number; pesan: string }[][] = [
  [
    { derajat: 50, hasil: 50, pesan: "1/2 = 5/10 = 0,5 = 0,50 → kode 50 perseratusan." },
    { derajat: 20, hasil: 20, pesan: "1/5 = 2/10 = 0,2 = 0,20 → kode 20." },
  ],
  [
    { derajat: 10, hasil: 10, pesan: "1/10 = 0,1 = 0,10 → kode 10." },
    { derajat: 37, hasil: 37, pesan: "3,7 → 3 satuan + 7 persepuluhan (kode 37)." },
  ],
  [
    { derajat: 25, hasil: 25, pesan: "0,25 = 25 perseratusan." },
    { derajat: 5, hasil: 5, pesan: "0,5 = 5 persepuluhan; sama nilai dengan 0,50." },
  ],
];
export const RONDE_ARTI_CC: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "METODE LUAR Equivalent-to-10/100?", jawab: "kalikan agar penyebut 10 atau 100 lalu tulis desimal", opsi: ["kalikan agar penyebut 10 atau 100 lalu tulis desimal", "hapus penyebut saja", "tambah koma di depan"], pesan: "Naskah lama." },
    { tanya: "1/2 dalam desimal?", jawab: "0,5 atau 0,50", opsi: ["0,5 atau 0,50", "2,0", "0,12"], pesan: "Timbangan." },
  ],
  [
    { tanya: "Decimal Place-Value Chart menekankan?", jawab: "satuan, persepuluhan, perseratusan", opsi: ["satuan, persepuluhan, perseratusan", "hanya puluhan dan ribuan", "abaikan koma"], pesan: "Chart." },
    { tanya: "0,5 dibanding 0,50?", jawab: "nilainya sama", opsi: ["nilainya sama", "0,5 lebih kecil", "0,50 lebih besar selalu"], pesan: "Trailing zero." },
  ],
  [
    { tanya: "Cara banding desimal?", jawab: "samakan digit belakang koma lalu banding dari kiri", opsi: ["samakan digit belakang koma lalu banding dari kiri", "banding jumlah digit saja", "abaikan angka di kiri koma"], pesan: "Compare-and-Order." },
    { tanya: "1/5 = ?", jawab: "0,2 = 0,20", opsi: ["0,2 = 0,20", "0,5", "1,5"], pesan: "Equivalent." },
  ],
];
export const RONDE_SORTIR_CC: { id: string; label: string; bin: "ya" | "tidak" }[][] = [
  [
    { id: "a1", label: "1/2=0,50", bin: "ya" }, { id: "a2", label: "1/2=0,12", bin: "tidak" }, { id: "a3", label: "0,5=0,50", bin: "ya" },
    { id: "a4", label: "0,5 ≠ 0,50 selalu", bin: "tidak" }, { id: "a5", label: "ubah ke 10/100", bin: "ya" }, { id: "a6", label: "hapus penyebut saja", bin: "tidak" },
  ],
  [
    { id: "b1", label: "1/5=0,20", bin: "ya" }, { id: "b2", label: "1/5=0,5", bin: "tidak" }, { id: "b3", label: "Place-Value Chart", bin: "ya" },
    { id: "b4", label: "abaikan koma", bin: "tidak" }, { id: "b5", label: "banding dari kiri", bin: "ya" }, { id: "b6", label: "banding dari kanan dulu", bin: "tidak" },
  ],
  [
    { id: "c1", label: "1/10=0,10", bin: "ya" }, { id: "c2", label: "3,7 < 2,9", bin: "tidak" }, { id: "c3", label: "Compare-Order", bin: "ya" },
    { id: "c4", label: "0,25=25 persepuluhan", bin: "tidak" }, { id: "c5", label: "0,25=25 perseratusan", bin: "ya" }, { id: "c6", label: "desimal ≠ pecahan", bin: "tidak" },
  ],
];
export const RONDE_PASANG_CC: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "1/2", kanan: "0,5 = 0,50" }, { kiri: "1/5", kanan: "0,2 = 0,20" },
    { kiri: "1/10", kanan: "0,1 = 0,10" }, { kiri: "Equivalent", kanan: "× ke 10/100" },
  ],
  [
    { kiri: "persepuluhan", kanan: "0,1" }, { kiri: "perseratusan", kanan: "0,01" },
    { kiri: "3,7", kanan: "lompat jauh" }, { kiri: "0,5 = 0,50", kanan: "nilai sama" },
  ],
  [
    { kiri: "banding", kanan: "dari kiri" }, { kiri: "Place-Value", kanan: "tabel tempat" },
    { kiri: "0,25", kanan: "25/100" }, { kiri: "Compare-Order", kanan: "samakan digit" },
  ],
];
export const RONDE_MEMORI_CC = RONDE_PASANG_CC;
export const RONDE_KETUK_CC: { item: number[]; tanya: number[] }[] = [
  { item: [5, 10, 20, 25, 37, 50], tanya: [50, 20] },
  { item: [1, 5, 10, 25, 37, 50], tanya: [5, 10, 37] },
  { item: [2, 10, 20, 25, 50, 100], tanya: [20, 25] },
];
export const RONDE_SEMUA_CC: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "langkah pecahan→desimal benar", item: [
    { id: "a", label: "× ke penyebut 10/100", cocok: true }, { id: "b", label: "tulis di belakang koma", cocok: true }, { id: "c", label: "hapus penyebut tanpa ubah", cocok: false }, { id: "d", label: "cek nilai tempat", cocok: true },
  ]},
  { label: "fakta buku C", item: [
    { id: "a", label: "1/2=0,50", cocok: true }, { id: "b", label: "1/5=0,20", cocok: true }, { id: "c", label: "0,5 ≠ 0,50", cocok: false }, { id: "d", label: "banding dari kiri", cocok: true },
  ]},
  { label: "metode luar C", item: [
    { id: "a", label: "Equivalent-to-10/100", cocok: true }, { id: "b", label: "Decimal Place-Value", cocok: true }, { id: "c", label: "Cross-Arrow (bagi)", cocok: false }, { id: "d", label: "Compare-and-Order", cocok: true },
  ]},
];
export const RONDE_CERITA_CC: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "Timbangan jeruk 1/2 kg menulis?", jawab: "0,50", opsi: ["0,50", "0,12", "2,0"], pesan: "Equivalent." },
    { teks: "1/5 kg salak dalam desimal?", jawab: "0,20", opsi: ["0,20", "0,5", "1,5"], pesan: "×2/2." },
  ],
  [
    { teks: "0,5 dan 0,50?", jawab: "nilai sama", opsi: ["nilai sama", "0,5 lebih kecil", "0,50 lebih besar"], pesan: "Trailing zero." },
    { teks: "Tempat langsung kanan koma?", jawab: "persepuluhan", opsi: ["persepuluhan", "perseratusan", "puluhan"], pesan: "Chart." },
  ],
  [
    { teks: "METODE LUAR banding desimal?", jawab: "samakan digit lalu dari kiri", opsi: ["samakan digit lalu dari kiri", "dari kanan tanpa samakan", "jumlah digit saja"], pesan: "Compare-Order." },
    { teks: "3,7 dibanding 2,9?", jawab: "3,7 lebih besar", opsi: ["3,7 lebih besar", "2,9 lebih besar", "sama"], pesan: "Satuan dulu." },
  ],
];
export const RONDE_URUT_CC: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [5, 50, 20, 10], dari: "kecil" },
  { angka: [50, 25, 37, 10], dari: "besar" },
  { angka: [2, 20, 5, 25], dari: "kecil" },
];
export const RONDE_HITUNG_PC = RONDE_HITUNG_CC;
export const RONDE_ARTI_PC = RONDE_ARTI_CC;
export const RONDE_PASANG_PC = RONDE_PASANG_CC;
export const RONDE_MEMORI_PC = RONDE_MEMORI_CC;
export const RONDE_SORTIR_PC = RONDE_SORTIR_CC;
export const RONDE_SEMUA_PC = RONDE_SEMUA_CC;
export const RONDE_CERITA_PC = RONDE_CERITA_CC;
export const RONDE_TABEL_PC: { baris: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { baris: "1/2", jawab: "0,50", opsi: ["0,50", "0,12", "2,0"], pesan: "Ubah." },
    { baris: "1/5", jawab: "0,20", opsi: ["0,20", "0,5", "1,5"], pesan: "Ubah." },
  ],
  [
    { baris: "kanan koma ke-1", jawab: "persepuluhan", opsi: ["persepuluhan", "perseratusan", "puluhan"], pesan: "Tempat." },
    { baris: "0,5 vs 0,50", jawab: "sama nilai", opsi: ["sama nilai", "beda nilai", "0,5 lebih besar"], pesan: "Nol." },
  ],
  [
    { baris: "banding", jawab: "dari kiri", opsi: ["dari kiri", "dari kanan dulu", "acak"], pesan: "Order." },
    { baris: "1/10", jawab: "0,10", opsi: ["0,10", "1,0", "0,01"], pesan: "Grid." },
  ],
];
export const RONDE_BENARSALAH_QC: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "1/2 = 0,5 = 0,50.", benar: true, penjelasan: "Equivalent." },
    { teks: "0,5 selalu lebih kecil dari 0,50.", benar: false, penjelasan: "Nilai sama." },
    { teks: "Ubah pecahan dengan × ke penyebut 10 atau 100.", benar: true, penjelasan: "Metode luar." },
  ],
  [
    { teks: "Persepuluhan ada di kanan koma pertama.", benar: true, penjelasan: "Place-Value." },
    { teks: "Banding desimal mulai dari digit paling kanan tanpa samakan.", benar: false, penjelasan: "Samakan dulu, dari kiri." },
    { teks: "1/5 = 0,20.", benar: true, penjelasan: "2/10." },
  ],
];
export const RONDE_DETEKTIF_QC: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["timbangan", "jeruk", "setengah"], jawab: "0,50", opsi: ["0,50", "0,12", "2,0"], salah: "1/2." },
  { klue: ["ubah", "penyebut", "10 atau 100"], jawab: "Equivalent-to-10/100", opsi: ["Equivalent-to-10/100", "Cross-Arrow", "Panah Lurus"], salah: "Metode C." },
  { klue: ["3,7", "2,9", "banding"], jawab: "3,7 lebih besar", opsi: ["3,7 lebih besar", "2,9 lebih besar", "sama"], salah: "Satuan." },
];
export const PETA_KONSEP_QC = [{
  pusat: "Bilangan Desimal",
  kotak: [
    { label: "Ubah", opsi: ["× ke 10/100", "hapus penyebut", "tambah koma acak"], benar: 0 },
    { label: "Tempat", opsi: ["persepuluhan/perseratusan", "hanya puluhan", "abaikan koma"], benar: 0 },
    { label: "0,5 dan 0,50", opsi: ["nilai sama", "selalu beda", "0,5 lebih kecil"], benar: 0 },
    { label: "Metode luar", opsi: ["Equivalent / Place-Value / Compare-Order", "Cross-Arrow saja", "Area Model saja"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QC = RONDE_CERITA_CC;
