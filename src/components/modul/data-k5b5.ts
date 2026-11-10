/**
 * Data murni Matematika Kelas 5 Bab 5 (Luas Daerah Bangun Datar): Sub-Bab A–D.
 * Sumber: Buku Siswa Matematika Kelas V Kemendikbudristek Bab 5 hlm. 131–162.
 * Tanpa React/jaringan. Uji: scripts/uji-statis-k5b5.mjs.
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

export const luasPP = (p: number, l: number) => p * l;
export const luasPersegi = (s: number) => s * s;
export const luasSegitiga = (a: number, t: number) => (a * t) / 2;
export const luasJajar = (a: number, t: number) => a * t;
export const luasTrapesium = (a: number, b: number, t: number) => ((a + b) * t) / 2;
export const luasBelah = (d1: number, d2: number) => (d1 * d2) / 2;
export const luasLayang = (d1: number, d2: number) => (d1 * d2) / 2;

export const ANGKA_BUKU = {
  pp52: 10, // 5×2
  pp21: 2, // 2×1
  persegi4: 16, // 4×4
  segitigaAlas6T4: 12, // ½×6×4
  jajarAlas8T3: 24, // 8×3
  trap5dan3t4: 16, // ½(5+3)×4
  belah6dan4: 12, // ½×6×4
  layang8dan6: 24, // ½×8×6
  kawat60: 60,
  luas2010: 200, // 20×10
} as const;

// ========== A: Konsep Luas (pengubinan / petak satuan) ==========
export const RONDE_HITUNG_CA: { p: number; l: number; hasil: number; pesan: string }[][] = [
  [
    { p: 2, l: 1, hasil: 2, pesan: "2×1=2 petak. Unit Square Covering." },
    { p: 5, l: 2, hasil: 10, pesan: "5×2=10. Array Model." },
  ],
  [
    { p: 3, l: 3, hasil: 9, pesan: "3×3=9. Cara Yohana / Area Conservation." },
    { p: 4, l: 2, hasil: 8, pesan: "4×2=8 petak." },
  ],
  [
    { p: 6, l: 3, hasil: 18, pesan: "6×3=18." },
    { p: 5, l: 4, hasil: 20, pesan: "5×4=20." },
  ],
];
export const RONDE_ARTI_CA: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Luas daerah bangun datar adalah?", jawab: "ukuran besar kecil daerah di dalam batas bangun", opsi: ["ukuran besar kecil daerah di dalam batas bangun", "jumlah panjang sisi luar saja", "banyak sudut saja"], pesan: "Definisi buku hlm. 137." },
    { tanya: "Satu persegi satuan 1 cm × 1 cm mewakili?", jawab: "1 cm²", opsi: ["1 cm²", "1 cm", "1 m"], pesan: "Satuan luas." },
  ],
  [
    { tanya: "Pengubinan / tiling mengukur luas dengan?", jawab: "menutup rapat daerah dengan petak satuan", opsi: ["menutup rapat daerah dengan petak satuan", "mengukur hanya keliling", "menghitung sudut"], pesan: "METODE LUAR · Unit Square Covering." },
    { tanya: "Makin luas lantai, makin banyak?", jawab: "ubin yang dibutuhkan", opsi: ["ubin yang dibutuhkan", "keliling pagar saja", "banyak sudut"], pesan: "Alun-alun & denah rumah." },
  ],
  [
    { tanya: "Cara Yohana memotong-tempel petak tak utuh supaya?", jawab: "luas tidak berubah (konservasi luas)", opsi: ["luas tidak berubah (konservasi luas)", "keliling jadi nol", "bentuk wajib persegi"], pesan: "METODE LUAR · Area Conservation." },
    { tanya: "Array Model mengatakan luas persegi panjang =?", jawab: "banyak baris × banyak kolom petak", opsi: ["banyak baris × banyak kolom petak", "jumlah sisi saja", "diagonal × 2"], pesan: "METODE LUAR · Array Model." },
  ],
];
export const RONDE_SORTIR_CA: { id: string; label: string; bin: "ya" | "tidak" }[][] = [
  [
    { id: "a1", label: "hitung petak", bin: "ya" }, { id: "a2", label: "jumlah sisi luar", bin: "tidak" }, { id: "a3", label: "ubin 1m²", bin: "ya" },
    { id: "a4", label: "keliling pagar", bin: "tidak" }, { id: "a5", label: "cm² / m²", bin: "ya" }, { id: "a6", label: "path length", bin: "tidak" },
  ],
  [
    { id: "b1", label: "menutup lantai", bin: "ya" }, { id: "b2", label: "bingkai foto", bin: "tidak" }, { id: "b3", label: "pasir alun-alun", bin: "ya" },
    { id: "b4", label: "panjang kawat", bin: "tidak" }, { id: "b5", label: "array baris×kolom", bin: "ya" }, { id: "b6", label: "hanya sudut", bin: "tidak" },
  ],
  [
    { id: "c1", label: "konservasi luas", bin: "ya" }, { id: "c2", label: "2(p+l)", bin: "tidak" }, { id: "c3", label: "petak satuan", bin: "ya" },
    { id: "c4", label: "batas luar saja", bin: "tidak" }, { id: "c5", label: "daerah dalam", bin: "ya" }, { id: "c6", label: "keliling benteng", bin: "tidak" },
  ],
];
export const RONDE_PASANG_CA: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "arti luas", kanan: "ukuran daerah dalam" }, { kiri: "1 cm × 1 cm", kanan: "1 cm²" },
    { kiri: "pengubinan", kanan: "Unit Square Covering" }, { kiri: "5×2 petak", kanan: "10" },
  ],
  [
    { kiri: "Alun-Alun Utara", kanan: "butuh luas untuk pasir" }, { kiri: "ubin 1m×1m", kanan: "1 m² per ubin" },
    { kiri: "Cara Yohana", kanan: "Area Conservation" }, { kiri: "Array Model", kanan: "baris × kolom" },
  ],
  [
    { kiri: "3×3", kanan: "9" }, { kiri: "bukan luas", kanan: "keliling / path length" },
    { kiri: "satuan baku", kanan: "cm² atau m²" }, { kiri: "denah rumah", kanan: "banding luas ruang" },
  ],
];
export const RONDE_MEMORI_CA = RONDE_PASANG_CA;
export const RONDE_KETUK_CA: { item: number[]; tanya: number[] }[] = [
  { item: [2, 8, 9, 10, 18, 20], tanya: [10, 2, 9] },
  { item: [4, 8, 9, 12, 16, 20], tanya: [8, 16] },
  { item: [2, 9, 10, 12, 18, 20], tanya: [18, 20, 10] },
];
export const RONDE_SEMUA_CA: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "cara mengukur luas", item: [
    { id: "a", label: "hitung petak satuan", cocok: true }, { id: "b", label: "tutup rapat tanpa celah", cocok: true }, { id: "c", label: "jumlahkan keliling saja", cocok: false }, { id: "d", label: "array baris×kolom", cocok: true },
  ]},
  { label: "satuan luas benar", item: [
    { id: "a", label: "cm²", cocok: true }, { id: "b", label: "m²", cocok: true }, { id: "c", label: "cm (panjang saja)", cocok: false }, { id: "d", label: "persegi satuan", cocok: true },
  ]},
  { label: "hasil petak benar", item: [
    { id: "a", label: "2×1=2", cocok: true }, { id: "b", label: "5×2=10", cocok: true }, { id: "c", label: "3×3=6", cocok: false }, { id: "d", label: "4×2=8", cocok: true },
  ]},
];
export const RONDE_CERITA_CA: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "Lantai 5 m × 2 m ditutup ubin 1 m². Berapa ubin?", jawab: "10", opsi: ["10", "7", "14"], pesan: "Array Model 5×2." },
    { teks: "Apa arti luas daerah bangun datar?", jawab: "ukuran daerah di dalam batas", opsi: ["ukuran daerah di dalam batas", "jumlah sisi luar", "banyak sudut"], pesan: "Definisi buku." },
  ],
  [
    { teks: "Mengapa pasir Alun-Alun butuh hitung luas?", jawab: "tahu banyak pasir menutup tanah", opsi: ["tahu banyak pasir menutup tanah", "tahu panjang pagar saja", "tahu tinggi menara"], pesan: "Konteks buku." },
    { teks: "Petak tak utuh dipotong-tempel Yohana. Luas?", jawab: "tetap sama", opsi: ["tetap sama", "selalu bertambah", "selalu hilang"], pesan: "Area Conservation." },
  ],
  [
    { teks: "Persegi 3×3 petak. Luas?", jawab: "9", opsi: ["9", "6", "12"], pesan: "3×3." },
    { teks: "METODE LUAR Unit Square Covering artinya?", jawab: "menutup daerah dengan petak satuan", opsi: ["menutup daerah dengan petak satuan", "mengukur hanya keliling", "membagi diagonal"], pesan: "Label metode." },
  ],
];
export const RONDE_URUT_CA: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [2, 20, 10, 9], dari: "kecil" },
  { angka: [18, 8, 2, 10], dari: "besar" },
  { angka: [9, 8, 20, 10], dari: "kecil" },
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
    { baris: "5×2 petak", jawab: "10", opsi: ["10", "7", "14"], pesan: "Array." },
    { baris: "arti luas", jawab: "daerah dalam", opsi: ["daerah dalam", "keliling", "sudut"], pesan: "Definisi." },
  ],
  [
    { baris: "3×3", jawab: "9", opsi: ["9", "6", "12"], pesan: "Persegi." },
    { baris: "1 cm×1 cm", jawab: "1 cm²", opsi: ["1 cm²", "1 cm", "2 cm"], pesan: "Satuan." },
  ],
  [
    { baris: "4×2", jawab: "8", opsi: ["8", "6", "10"], pesan: "PP." },
    { baris: "Cara Yohana", jawab: "luas tetap", opsi: ["luas tetap", "luas hilang", "keliling nol"], pesan: "Konservasi." },
  ],
];
export const RONDE_BENARSALAH_QA: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Luas mengukur daerah di dalam batas bangun.", benar: true, penjelasan: "Benar." },
    { teks: "Luas sama dengan keliling.", benar: false, penjelasan: "Berbeda." },
    { teks: "5×2 petak = 10 satuan luas.", benar: true, penjelasan: "Array Model." },
  ],
  [
    { teks: "Pengubinan menutup rapat tanpa celah/lubang.", benar: true, penjelasan: "Unit Square Covering." },
    { teks: "Cara Yohana mengubah luas saat memotong-tempel.", benar: false, penjelasan: "Luas tetap." },
    { teks: "1 m × 1 m = 1 m².", benar: true, penjelasan: "Satuan baku." },
  ],
];
export const RONDE_DETEKTIF_QA: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["petak", "5 baris", "2 kolom"], jawab: "10", opsi: ["10", "7", "14"], salah: "5×2." },
  { klue: ["potong-tempel", "petak tak utuh", "luas?"], jawab: "tetap sama", opsi: ["tetap sama", "bertambah", "hilang"], salah: "Konservasi." },
  { klue: ["ubin", "1m×1m", "lantai 4×2"], jawab: "8", opsi: ["8", "6", "10"], salah: "4×2." },
];
export const PETA_KONSEP_QA = [{
  pusat: "Konsep Luas",
  kotak: [
    { label: "Arti", opsi: ["ukuran daerah dalam", "jumlah sisi", "banyak sudut"], benar: 0 },
    { label: "Cara dasar", opsi: ["hitung petak / array", "2(p+l)", "jumlah sudut"], benar: 0 },
    { label: "Satuan", opsi: ["cm² / m²", "cm saja", "derajat"], benar: 0 },
    { label: "Metode luar", opsi: ["Unit Square / Array / Conservation", "Path Length saja", "volume"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QA = RONDE_CERITA_CA;

// ========== B: Rumus luas bangun ==========
export const RONDE_HITUNG_CB: { jenis: "pp" | "persegi" | "segitiga" | "jajar" | "trap" | "belah" | "layang"; a: number; b?: number; c?: number; hasil: number; pesan: string }[][] = [
  [
    { jenis: "pp", a: 5, b: 2, hasil: 10, pesan: "L=p×l=5×2." },
    { jenis: "persegi", a: 4, hasil: 16, pesan: "L=s×s=16." },
  ],
  [
    { jenis: "segitiga", a: 6, b: 4, hasil: 12, pesan: "L=½×alas×tinggi=12. Dissection." },
    { jenis: "jajar", a: 8, b: 3, hasil: 24, pesan: "L=alas×tinggi. Shear Principle." },
  ],
  [
    { jenis: "trap", a: 5, b: 3, c: 4, hasil: 16, pesan: "L=½(a+b)×t=16." },
    { jenis: "belah", a: 6, b: 4, hasil: 12, pesan: "L=½×d1×d2=12." },
  ],
];
export const RONDE_RUMUS_CB: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Luas persegi panjang?", jawab: "panjang × lebar", opsi: ["panjang × lebar", "2(p+l)", "½×p×l"], pesan: "Buku Eksplorasi 5.2A." },
    { tanya: "Luas persegi?", jawab: "sisi × sisi", opsi: ["sisi × sisi", "4×sisi", "2×sisi"], pesan: "Kasus khusus PP." },
  ],
  [
    { tanya: "Luas segitiga?", jawab: "½ × alas × tinggi", opsi: ["½ × alas × tinggi", "alas × tinggi", "3×sisi"], pesan: "METODE LUAR · Dissection Method." },
    { tanya: "Luas jajargenjang?", jawab: "alas × tinggi", opsi: ["alas × tinggi", "½×alas×tinggi", "jumlah sisi"], pesan: "METODE LUAR · Shear / Base×Height." },
  ],
  [
    { tanya: "Luas trapesium?", jawab: "½ × (alas1+alas2) × tinggi", opsi: ["½ × (alas1+alas2) × tinggi", "alas1 × alas2", "keliling ÷ 2"], pesan: "Buku 5.2E." },
    { tanya: "Luas belah ketupat / layang-layang?", jawab: "½ × diagonal1 × diagonal2", opsi: ["½ × diagonal1 × diagonal2", "sisi × sisi", "4×sisi"], pesan: "Buku 5.2F–G." },
  ],
];
export const RONDE_SORTIR_CB: { id: string; label: string; bin: "rumus" | "bukan" }[][] = [
  [
    { id: "a1", label: "p×l", bin: "rumus" }, { id: "a2", label: "2(p+l)", bin: "bukan" }, { id: "a3", label: "½×a×t", bin: "rumus" },
    { id: "a4", label: "a+b+c", bin: "bukan" }, { id: "a5", label: "s×s", bin: "rumus" }, { id: "a6", label: "path length", bin: "bukan" },
  ],
  [
    { id: "b1", label: "alas×tinggi jajar", bin: "rumus" }, { id: "b2", label: "4×sisi", bin: "bukan" }, { id: "b3", label: "½(a+b)×t", bin: "rumus" },
    { id: "b4", label: "n×sisi", bin: "bukan" }, { id: "b5", label: "½×d1×d2", bin: "rumus" }, { id: "b6", label: "keliling", bin: "bukan" },
  ],
  [
    { id: "c1", label: "Base×Height", bin: "rumus" }, { id: "c2", label: "fencing only", bin: "bukan" }, { id: "c3", label: "Dissection", bin: "rumus" },
    { id: "c4", label: "jumlah sudut", bin: "bukan" }, { id: "c5", label: "Shear Principle", bin: "rumus" }, { id: "c6", label: "volume", bin: "bukan" },
  ],
];
export const RONDE_PASANG_CB: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "persegi panjang", kanan: "p×l" }, { kiri: "persegi", kanan: "s×s" },
    { kiri: "segitiga", kanan: "½×a×t" }, { kiri: "jajargenjang", kanan: "a×t" },
  ],
  [
    { kiri: "trapesium", kanan: "½(a+b)×t" }, { kiri: "belah ketupat", kanan: "½×d1×d2" },
    { kiri: "layang-layang", kanan: "½×d1×d2" }, { kiri: "5×2", kanan: "10" },
  ],
  [
    { kiri: "Dissection", kanan: "segitiga dari PP" }, { kiri: "Shear", kanan: "jajar ≈ PP" },
    { kiri: "½×6×4", kanan: "12" }, { kiri: "Base×Height", kanan: "alas × tinggi" },
  ],
];
export const RONDE_MEMORI_CB = RONDE_PASANG_CB;
export const RONDE_KETUK_CB: { item: number[]; tanya: number[] }[] = [
  { item: [10, 12, 16, 20, 24, 30], tanya: [10, 16, 12] },
  { item: [8, 12, 16, 18, 24, 32], tanya: [24, 12] },
  { item: [10, 12, 16, 24, 28, 36], tanya: [16, 24, 10] },
];
export const RONDE_SEMUA_CB: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "rumus luas benar", item: [
    { id: "a", label: "PP: p×l", cocok: true }, { id: "b", label: "segitiga: ½×a×t", cocok: true }, { id: "c", label: "PP: 2(p+l)", cocok: false }, { id: "d", label: "jajar: a×t", cocok: true },
  ]},
  { label: "hasil hitung benar", item: [
    { id: "a", label: "5×2=10", cocok: true }, { id: "b", label: "4×4=16", cocok: true }, { id: "c", label: "½×6×4=10", cocok: false }, { id: "d", label: "8×3=24", cocok: true },
  ]},
  { label: "metode luar terkait rumus", item: [
    { id: "a", label: "Dissection → segitiga", cocok: true }, { id: "b", label: "Shear → jajar", cocok: true }, { id: "c", label: "Path Length → luas", cocok: false }, { id: "d", label: "Base×Height", cocok: true },
  ]},
];
export const RONDE_CERITA_CB: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "Persegi panjang 5×2. Luas?", jawab: "10", opsi: ["10", "14", "7"], pesan: "p×l." },
    { teks: "Persegi sisi 4. Luas?", jawab: "16", opsi: ["16", "8", "12"], pesan: "s×s." },
  ],
  [
    { teks: "Segitiga alas 6 tinggi 4. Luas?", jawab: "12", opsi: ["12", "24", "10"], pesan: "½×6×4. Dissection." },
    { teks: "Jajargenjang alas 8 tinggi 3?", jawab: "24", opsi: ["24", "11", "16"], pesan: "a×t. Shear." },
  ],
  [
    { teks: "Trapesium alas 5 dan 3, tinggi 4?", jawab: "16", opsi: ["16", "20", "12"], pesan: "½(5+3)×4." },
    { teks: "Belah ketupat d1=6 d2=4?", jawab: "12", opsi: ["12", "24", "10"], pesan: "½×6×4." },
  ],
];
export const RONDE_URUT_CB: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [10, 24, 12, 16], dari: "kecil" },
  { angka: [24, 10, 16, 12], dari: "besar" },
  { angka: [12, 16, 10, 24], dari: "kecil" },
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
    { baris: "5×2", jawab: "10", opsi: ["10", "14", "7"], pesan: "PP." },
    { baris: "rumus PP", jawab: "p×l", opsi: ["p×l", "2(p+l)", "½×p×l"], pesan: "Rumus." },
  ],
  [
    { baris: "½×6×4", jawab: "12", opsi: ["12", "24", "10"], pesan: "Segitiga." },
    { baris: "8×3", jawab: "24", opsi: ["24", "11", "16"], pesan: "Jajar." },
  ],
  [
    { baris: "½(5+3)×4", jawab: "16", opsi: ["16", "20", "12"], pesan: "Trapesium." },
    { baris: "½×6×4 belah", jawab: "12", opsi: ["12", "24", "10"], pesan: "Belah." },
  ],
];
export const RONDE_BENARSALAH_QB: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Luas PP = panjang × lebar.", benar: true, penjelasan: "Benar." },
    { teks: "Luas segitiga = alas × tinggi (tanpa ½).", benar: false, penjelasan: "Perlu ½." },
    { teks: "Luas jajargenjang = alas × tinggi.", benar: true, penjelasan: "Shear." },
  ],
  [
    { teks: "Trapesium: ½(jumlah sejajar)×tinggi.", benar: true, penjelasan: "Buku." },
    { teks: "Belah ketupat luas = 4×sisi.", benar: false, penjelasan: "Itu keliling." },
    { teks: "Dua segitiga kongruen dari satu PP → masing-masing ½ luas PP.", benar: true, penjelasan: "Dissection." },
  ],
];
export const RONDE_DETEKTIF_QB: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["PP", "panjang 5", "lebar 2"], jawab: "10", opsi: ["10", "14", "7"], salah: "p×l." },
  { klue: ["segitiga", "alas 6", "tinggi 4", "setengah"], jawab: "12", opsi: ["12", "24", "10"], salah: "½×a×t." },
  { klue: ["jajar", "alas 8", "tinggi 3"], jawab: "24", opsi: ["24", "11", "16"], salah: "a×t." },
];
export const PETA_KONSEP_QB = [{
  pusat: "Rumus Luas",
  kotak: [
    { label: "PP / Persegi", opsi: ["p×l / s×s", "2(p+l)", "a+b+c"], benar: 0 },
    { label: "Segitiga", opsi: ["½×a×t", "a×t", "3×s"], benar: 0 },
    { label: "Jajar / Trap", opsi: ["a×t / ½(a+b)×t", "2(p+l)", "n×s"], benar: 0 },
    { label: "Belah / Layang", opsi: ["½×d1×d2", "s×s", "4×s"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QB = RONDE_CERITA_CB;

// ========== C: Bangun gabungan ==========
export const RONDE_HITUNG_CC: { bagian: number[]; hasil: number; pesan: string }[][] = [
  [
    { bagian: [12, 8], hasil: 20, pesan: "Additive Decomposition: 12+8=20." },
    { bagian: [10, 6], hasil: 16, pesan: "10+6=16." },
  ],
  [
    { bagian: [24, 12], hasil: 36, pesan: "Jajar 24 + segitiga 12." },
    { bagian: [16, 9], hasil: 25, pesan: "16+9=25." },
  ],
  [
    { bagian: [15, 10, 5], hasil: 30, pesan: "Tiga bagian: 15+10+5." },
    { bagian: [20, 8], hasil: 28, pesan: "20+8=28." },
  ],
];
export const RONDE_ARTI_CC: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Luas bangun gabungan dihitung dengan?", jawab: "menjumlah luas bagian setelah diurai", opsi: ["menjumlah luas bagian setelah diurai", "hanya keliling luar", "mengabaikan satu bagian"], pesan: "METODE LUAR · Additive Decomposition." },
    { tanya: "Yohana membagi bangun jadi?", jawab: "layang-layang dan segitiga", opsi: ["layang-layang dan segitiga", "hanya lingkaran", "hanya titik"], pesan: "Buku Eksplorasi 5.3." },
  ],
  [
    { tanya: "Komang membagi bangun jadi?", jawab: "jajargenjang dan segitiga", opsi: ["jajargenjang dan segitiga", "hanya persegi", "hanya keliling"], pesan: "Buku." },
    { tanya: "Composite Area Strategy artinya?", jawab: "urai → hitung tiap rumus → jumlahkan", opsi: ["urai → hitung tiap rumus → jumlahkan", "ukur hanya satu sisi", "kali semua diagonal"], pesan: "METODE LUAR · Composite Area." },
  ],
  [
    { tanya: "Jika dua cara uraian berbeda, luas akhir?", jawab: "harus sama jika benar", opsi: ["harus sama jika benar", "selalu beda", "tidak bisa dicek"], pesan: "Validasi silang Yohana/Komang." },
    { tanya: "Mengapa boleh beda cara bagi?", jawab: "luas bersifat aditif pada daerah tak saling tindih", opsi: ["luas bersifat aditif pada daerah tak saling tindih", "karena warna beda", "karena satuan beda"], pesan: "Additive property." },
  ],
];
export const RONDE_SORTIR_CC: { id: string; label: string; bin: "urai" | "bukan" }[][] = [
  [
    { id: "a1", label: "bagi jadi 2 bangun", bin: "urai" }, { id: "a2", label: "hanya keliling", bin: "bukan" }, { id: "a3", label: "jumlahkan luas bagian", bin: "urai" },
    { id: "a4", label: "abaikan satu bagian", bin: "bukan" }, { id: "a5", label: "layang + segitiga", bin: "urai" }, { id: "a6", label: "path length saja", bin: "bukan" },
  ],
  [
    { id: "b1", label: "jajar + segitiga", bin: "urai" }, { id: "b2", label: "2(p+l) saja", bin: "bukan" }, { id: "b3", label: "Composite Area", bin: "urai" },
    { id: "b4", label: "volume", bin: "bukan" }, { id: "b5", label: "Additive Decomposition", bin: "urai" }, { id: "b6", label: "hitung sudut saja", bin: "bukan" },
  ],
  [
    { id: "c1", label: "cek dua cara sama", bin: "urai" }, { id: "c2", label: "tumpang tindih dijumlah 2×", bin: "bukan" }, { id: "c3", label: "tak saling tutup", bin: "urai" },
    { id: "c4", label: "abaikan rumus bagian", bin: "bukan" }, { id: "c5", label: "12+8=20", bin: "urai" }, { id: "c6", label: "fencing only", bin: "bukan" },
  ],
];
export const RONDE_PASANG_CC: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "cara Yohana", kanan: "layang + segitiga" }, { kiri: "cara Komang", kanan: "jajar + segitiga" },
    { kiri: "12+8", kanan: "20" }, { kiri: "Composite Area", kanan: "urai lalu jumlah" },
  ],
  [
    { kiri: "Additive Decomposition", kanan: "jumlah luas bagian" }, { kiri: "24+12", kanan: "36" },
    { kiri: "validasi", kanan: "dua cara hasil sama" }, { kiri: "15+10+5", kanan: "30" },
  ],
  [
    { kiri: "bagian tak tindih", kanan: "boleh dijumlah" }, { kiri: "tumpang tindih", kanan: "jangan dihitung 2×" },
    { kiri: "20+8", kanan: "28" }, { kiri: "tujuan uraian", kanan: "pakai rumus yang dikenal" },
  ],
];
export const RONDE_MEMORI_CC = RONDE_PASANG_CC;
export const RONDE_KETUK_CC: { item: number[]; tanya: number[] }[] = [
  { item: [16, 20, 25, 28, 30, 36], tanya: [20, 36, 16] },
  { item: [18, 20, 25, 28, 30, 32], tanya: [25, 28] },
  { item: [16, 20, 28, 30, 36, 40], tanya: [30, 20, 36] },
];
export const RONDE_SEMUA_CC: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "langkah luas gabungan", item: [
    { id: "a", label: "urai jadi bagian", cocok: true }, { id: "b", label: "hitung tiap rumus", cocok: true }, { id: "c", label: "abaikan satu bagian", cocok: false }, { id: "d", label: "jumlahkan hasil", cocok: true },
  ]},
  { label: "hasil jumlah benar", item: [
    { id: "a", label: "12+8=20", cocok: true }, { id: "b", label: "24+12=36", cocok: true }, { id: "c", label: "10+6=18", cocok: false }, { id: "d", label: "15+10+5=30", cocok: true },
  ]},
  { label: "aturan aman", item: [
    { id: "a", label: "bagian tidak tumpang tindih", cocok: true }, { id: "b", label: "cek dua cara", cocok: true }, { id: "c", label: "hitung keliling sebagai luas", cocok: false }, { id: "d", label: "pakai rumus bagian", cocok: true },
  ]},
];
export const RONDE_CERITA_CC: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "Bagian luas 12 dan 8. Luas gabungan?", jawab: "20", opsi: ["20", "4", "96"], pesan: "12+8." },
    { teks: "Strategi Composite Area?", jawab: "urai → hitung → jumlahkan", opsi: ["urai → hitung → jumlahkan", "hanya keliling", "acak saja"], pesan: "Metode luar." },
  ],
  [
    { teks: "Yohana membagi menjadi?", jawab: "layang-layang dan segitiga", opsi: ["layang-layang dan segitiga", "hanya lingkaran", "tiga kubus"], pesan: "Buku." },
    { teks: "24 + 12 = ?", jawab: "36", opsi: ["36", "12", "48"], pesan: "Jajar+segitiga." },
  ],
  [
    { teks: "Mengapa dua cara uraian harus cocok?", jawab: "luas daerah sama", opsi: ["luas daerah sama", "warna sama", "keliling sama selalu"], pesan: "Validasi." },
    { teks: "15+10+5 = ?", jawab: "30", opsi: ["30", "20", "150"], pesan: "Tiga bagian." },
  ],
];
export const RONDE_URUT_CC: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [16, 36, 20, 28], dari: "kecil" },
  { angka: [36, 16, 30, 20], dari: "besar" },
  { angka: [20, 25, 16, 30], dari: "kecil" },
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
    { baris: "12+8", jawab: "20", opsi: ["20", "4", "96"], pesan: "Jumlah." },
    { baris: "cara Yohana", jawab: "layang+segitiga", opsi: ["layang+segitiga", "hanya PP", "keliling"], pesan: "Buku." },
  ],
  [
    { baris: "24+12", jawab: "36", opsi: ["36", "12", "48"], pesan: "Komang." },
    { baris: "Composite Area", jawab: "urai+jumlah", opsi: ["urai+jumlah", "hanya K", "acak"], pesan: "Metode." },
  ],
  [
    { baris: "15+10+5", jawab: "30", opsi: ["30", "20", "150"], pesan: "Tiga." },
    { baris: "tumpang tindih", jawab: "jangan 2×", opsi: ["jangan 2×", "wajib 2×", "abaikan"], pesan: "Aturan." },
  ],
];
export const RONDE_BENARSALAH_QC: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Luas gabungan = jumlah luas bagian yang tidak tumpang tindih.", benar: true, penjelasan: "Additive." },
    { teks: "Cukup menghitung keliling untuk mendapat luas gabungan.", benar: false, penjelasan: "Beda konsep." },
    { teks: "12+8=20.", benar: true, penjelasan: "Benar." },
  ],
  [
    { teks: "Yohana dan Komang boleh beda cara bagi.", benar: true, penjelasan: "Hasil harus sama." },
    { teks: "Bagian yang saling menutup boleh dijumlah dua kali.", benar: false, penjelasan: "Jangan." },
    { teks: "Composite Area: urai, hitung, jumlahkan.", benar: true, penjelasan: "Metode luar." },
  ],
];
export const RONDE_DETEKTIF_QC: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["dua bagian", "12 dan 8", "jumlah"], jawab: "20", opsi: ["20", "4", "96"], salah: "12+8." },
  { klue: ["Yohana", "bagi dua", "layang dan?"], jawab: "segitiga", opsi: ["segitiga", "kubus", "lingkaran"], salah: "Buku." },
  { klue: ["24", "12", "gabungan"], jawab: "36", opsi: ["36", "12", "48"], salah: "24+12." },
];
export const PETA_KONSEP_QC = [{
  pusat: "Luas Gabungan",
  kotak: [
    { label: "Langkah", opsi: ["urai → hitung → jumlah", "hanya keliling", "acak"], benar: 0 },
    { label: "Yohana", opsi: ["layang + segitiga", "hanya PP", "volume"], benar: 0 },
    { label: "Komang", opsi: ["jajar + segitiga", "hanya sudut", "path"], benar: 0 },
    { label: "Cek", opsi: ["dua cara hasil sama", "abaikan satuan", "kali 2 selalu"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QC = RONDE_CERITA_CC;

// ========== D: Hubungan keliling & luas ==========
export const RONDE_HITUNG_CD: { p: number; l: number; K: number; L: number; pesan: string }[][] = [
  [
    { p: 20, l: 10, K: 60, L: 200, pesan: "K=2(20+10)=60; L=20×10=200. Buku." },
    { p: 25, l: 5, K: 60, L: 125, pesan: "K sama 60; L=125 lebih kecil." },
  ],
  [
    { p: 15, l: 15, K: 60, L: 225, pesan: "Persegi 15×15: L terbesar di antara opsi K=60." },
    { p: 18, l: 12, K: 60, L: 216, pesan: "K=60; L=216." },
  ],
  [
    { p: 22, l: 8, K: 60, L: 176, pesan: "K=60; L=176." },
    { p: 28, l: 2, K: 60, L: 56, pesan: "K=60; L kecil karena sangat pipih." },
  ],
];
export const RONDE_RUMUS_CD: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Kawat 60 cm jadi kerangka PP. Syarat?", jawab: "2(p+l)=60 sehingga p+l=30", opsi: ["2(p+l)=60 sehingga p+l=30", "p×l=60", "p−l=60"], pesan: "Buku Eksplorasi 5.4." },
    { tanya: "PP 20×10 dengan K=60. Luas?", jawab: "200", opsi: ["200", "60", "30"], pesan: "20×10." },
  ],
  [
    { tanya: "Keliling sama belum tentu luas?", jawab: "sama; luas bisa berbeda", opsi: ["sama; luas bisa berbeda", "luas selalu sama", "luas selalu nol"], pesan: "METODE LUAR · Isoperimetric Relationship." },
    { tanya: "Di antara PP ber-keliling tetap, luas cenderung besar jika?", jawab: "bentuk mendekati persegi", opsi: ["bentuk mendekati persegi", "sangat pipih panjang", "salah satu sisi nol"], pesan: "Fixed Perimeter Maximize Area." },
  ],
  [
    { tanya: "PP 25×5, K=60. Luas?", jawab: "125", opsi: ["125", "200", "60"], pesan: "25×5." },
    { tanya: "Mengapa membedakan K dan L penting?", jawab: "pagar/kawat ≠ cat lantai/pasir", opsi: ["pagar/kawat ≠ cat lantai/pasir", "karena warna", "karena huruf saja"], pesan: "Konteks aplikasi." },
  ],
];
export const RONDE_SORTIR_CD: { id: string; label: string; bin: "keliling" | "luas" }[][] = [
  [
    { id: "a1", label: "2(p+l)", bin: "keliling" }, { id: "a2", label: "p×l", bin: "luas" }, { id: "a3", label: "panjang kawat", bin: "keliling" },
    { id: "a4", label: "cat lantai", bin: "luas" }, { id: "a5", label: "kerangka", bin: "keliling" }, { id: "a6", label: "ubin lantai", bin: "luas" },
  ],
  [
    { id: "b1", label: "K=60 tetap", bin: "keliling" }, { id: "b2", label: "L=200", bin: "luas" }, { id: "b3", label: "pagar", bin: "keliling" },
    { id: "b4", label: "pasir alun-alun", bin: "luas" }, { id: "b5", label: "path length", bin: "keliling" }, { id: "b6", label: "covering", bin: "luas" },
  ],
  [
    { id: "c1", label: "p+l=30", bin: "keliling" }, { id: "c2", label: "mendekati persegi → L besar", bin: "luas" }, { id: "c3", label: "bingkai", bin: "keliling" },
    { id: "c4", label: "daerah dalam", bin: "luas" }, { id: "c5", label: "fencing", bin: "keliling" }, { id: "c6", label: "isoperimetric fokus L", bin: "luas" },
  ],
];
export const RONDE_PASANG_CD: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "K=60, 20×10", kanan: "L=200" }, { kiri: "K=60, 25×5", kanan: "L=125" },
    { kiri: "syarat kawat", kanan: "p+l=30" }, { kiri: "Isoperimetric", kanan: "K sama L bisa beda" },
  ],
  [
    { kiri: "15×15", kanan: "L=225" }, { kiri: "28×2", kanan: "L=56" },
    { kiri: "maksimalkan L", kanan: "mendekati persegi" }, { kiri: "kawat", kanan: "keliling" },
  ],
  [
    { kiri: "18×12", kanan: "L=216" }, { kiri: "22×8", kanan: "L=176" },
    { kiri: "cat lantai", kanan: "luas" }, { kiri: "kerangka kawat", kanan: "keliling" },
  ],
];
export const RONDE_MEMORI_CD = RONDE_PASANG_CD;
export const RONDE_KETUK_CD: { item: number[]; tanya: number[] }[] = [
  { item: [56, 125, 176, 200, 216, 225], tanya: [200, 125, 225] },
  { item: [56, 125, 176, 200, 216, 240], tanya: [216, 56] },
  { item: [100, 125, 176, 200, 216, 225], tanya: [176, 200, 225] },
];
export const RONDE_SEMUA_CD: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "pernyataan K dan L benar", item: [
    { id: "a", label: "K sama ≠ L wajib sama", cocok: true }, { id: "b", label: "20×10 → L=200", cocok: true }, { id: "c", label: "K=60 → L selalu 200", cocok: false }, { id: "d", label: "mendekati persegi → L besar", cocok: true },
  ]},
  { label: "pasangan K=60 benar", item: [
    { id: "a", label: "20+10=30", cocok: true }, { id: "b", label: "25+5=30", cocok: true }, { id: "c", label: "20×10=60 adalah keliling", cocok: false }, { id: "d", label: "15+15=30", cocok: true },
  ]},
  { label: "aplikasi tepat", item: [
    { id: "a", label: "kawat → keliling", cocok: true }, { id: "b", label: "ubin → luas", cocok: true }, { id: "c", label: "kawat → luas lantai", cocok: false }, { id: "d", label: "pasir → luas", cocok: true },
  ]},
];
export const RONDE_CERITA_CD: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "Kawat 60 cm, PP 20×10. Luas?", jawab: "200", opsi: ["200", "60", "30"], pesan: "Buku." },
    { teks: "K sama 60, mana luas lebih besar: 20×10 atau 25×5?", jawab: "20×10", opsi: ["20×10", "25×5", "sama"], pesan: "200>125." },
  ],
  [
    { teks: "Dengan K tetap, bentuk apa cenderung luas terbesar?", jawab: "mendekati persegi", opsi: ["mendekati persegi", "sangat pipih", "garis"], pesan: "Isoperimetric intuition." },
    { teks: "15×15 dengan p+l=30. Luas?", jawab: "225", opsi: ["225", "60", "30"], pesan: "Persegi." },
  ],
  [
    { teks: "28×2, K=60. Luas?", jawab: "56", opsi: ["56", "200", "60"], pesan: "Pipih → L kecil." },
    { teks: "METODE LUAR Isoperimetric Relationship menekankan?", jawab: "K sama tidak menjamin L sama", opsi: ["K sama tidak menjamin L sama", "K selalu = L", "L selalu 0"], pesan: "Label metode." },
  ],
];
export const RONDE_URUT_CD: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [56, 225, 125, 200], dari: "kecil" },
  { angka: [225, 56, 216, 125], dari: "besar" },
  { angka: [125, 176, 200, 216], dari: "kecil" },
];
export const RONDE_HITUNG_PD = RONDE_HITUNG_CD;
export const RONDE_RUMUS_PD = RONDE_RUMUS_CD;
export const RONDE_PASANG_PD = RONDE_PASANG_CD;
export const RONDE_MEMORI_PD = RONDE_MEMORI_CD;
export const RONDE_SORTIR_PD = RONDE_SORTIR_CD;
export const RONDE_SEMUA_PD = RONDE_SEMUA_CD;
export const RONDE_CERITA_PD = RONDE_CERITA_CD;
export const RONDE_TABEL_PD: { baris: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { baris: "20×10 L", jawab: "200", opsi: ["200", "60", "30"], pesan: "Buku." },
    { baris: "syarat K=60", jawab: "p+l=30", opsi: ["p+l=30", "p×l=60", "p−l=0"], pesan: "2(p+l)." },
  ],
  [
    { baris: "25×5 L", jawab: "125", opsi: ["125", "200", "60"], pesan: "Pipih." },
    { baris: "15×15 L", jawab: "225", opsi: ["225", "60", "30"], pesan: "Persegi." },
  ],
  [
    { baris: "28×2 L", jawab: "56", opsi: ["56", "200", "60"], pesan: "Sangat pipih." },
    { baris: "K sama → L?", jawab: "bisa beda", opsi: ["bisa beda", "wajib sama", "wajib 0"], pesan: "Isoperimetric." },
  ],
];
export const RONDE_BENARSALAH_QD: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Dengan keliling sama, luas persegi panjang bisa berbeda.", benar: true, penjelasan: "Isoperimetric." },
    { teks: "20×10 dan 25×5 sama luasnya jika K=60.", benar: false, penjelasan: "200≠125." },
    { teks: "2(20+10)=60.", benar: true, penjelasan: "Benar." },
  ],
  [
    { teks: "Mendekati persegi cenderung memperbesar luas pada K tetap.", benar: true, penjelasan: "Intuisi isoperimetrik." },
    { teks: "Kawat kerangka selalu sama dengan luas lantai.", benar: false, penjelasan: "K ≠ L." },
    { teks: "p+l=30 untuk K=60 pada PP.", benar: true, penjelasan: "Buku." },
  ],
];
export const RONDE_DETEKTIF_QD: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["kawat 60", "20 dan 10", "luas"], jawab: "200", opsi: ["200", "60", "30"], salah: "20×10." },
  { klue: ["K sama", "bentuk pipih", "luas?"], jawab: "lebih kecil", opsi: ["lebih kecil", "lebih besar", "nol"], salah: "Isoperimetric." },
  { klue: ["15 dan 15", "p+l=30", "luas"], jawab: "225", opsi: ["225", "60", "30"], salah: "15×15." },
];
export const PETA_KONSEP_QD = [{
  pusat: "K dan L",
  kotak: [
    { label: "Keliling PP", opsi: ["2(p+l)", "p×l", "½×p×l"], benar: 0 },
    { label: "Luas PP", opsi: ["p×l", "2(p+l)", "p+l"], benar: 0 },
    { label: "K tetap", opsi: ["L bisa beda", "L wajib sama", "L=K"], benar: 0 },
    { label: "L besar", opsi: ["mendekati persegi", "sangat pipih", "satu sisi 0"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QD = RONDE_CERITA_CD;
