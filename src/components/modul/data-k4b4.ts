/**
 * Data murni Matematika Kelas 4 Bab 4 (Pengukuran Luas dan Volume): Sub-Bab A–B.
 * Sumber: Buku Siswa Matematika Kelas IV Kemendikbudristek Bab 4 hlm. 103–138.
 * Tanpa React/jaringan. Uji: scripts/uji-data-k4b4.mjs.
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
export const opsiTeks = (benar: string, pengecoh: string[], seed: number) => {
  const o = [benar, ...pengecoh.slice(0, 2)];
  while (o.length < 3) o.push(`?${o.length}`);
  return urutanTetap(3, 1, seed).map((i) => o[i]);
};

/** Konversi luas & volume baku (buku). */
export const M2_KE_CM2 = 10_000;
export const L_KE_ML = 1_000;
export const M3_KE_L = 1_000;
export const cm2DariM2 = (m2: number) => m2 * M2_KE_CM2;
export const m2DariCm2 = (cm2: number) => cm2 / M2_KE_CM2;
export const mlDariL = (l: number) => l * L_KE_ML;
export const lDariMl = (ml: number) => ml / L_KE_ML;
export const teksLuas = (n: number, satuan: "cm2" | "m2" | "persegi") =>
  satuan === "cm2" ? `${n} cm²` : satuan === "m2" ? `${n} m²` : `${n} persegi satuan`;
export const teksVol = (n: number, satuan: "cm3" | "ml" | "l" | "m3" | "kubus") =>
  satuan === "cm3" ? `${n} cm³` : satuan === "ml" ? `${n} ml` : satuan === "l" ? `${n} l` : satuan === "m3" ? `${n} m³` : `${n} kubus satuan`;

/* ===== A: Luas ===== */
export type BentukLuas = { id: string; sel: boolean[][]; luas: number };
/** Bentuk dari sel kisi (true = terisi). */
export const hitungLuas = (sel: boolean[][]) => sel.flat().filter(Boolean).length;

export const BENTUK_A: BentukLuas[] = [
  { id: "A", luas: 4, sel: [[true, true], [true, true]] },
  { id: "B", luas: 6, sel: [[true, true, true], [true, true, true]] },
  { id: "C", luas: 5, sel: [[true, true, true], [false, true, true]] },
  { id: "D", luas: 8, sel: [[true, true, true, true], [true, true, true, true]] },
  { id: "E", luas: 13, sel: [
    [true, false, false, false],
    [true, true, false, false],
    [true, true, true, false],
    [true, true, true, true],
    [true, true, true, true],
  ] },
  { id: "F", luas: 9, sel: [[true, true, true], [true, true, true], [true, true, true]] },
  { id: "G", luas: 3, sel: [[true, true, true]] },
  { id: "H", luas: 7, sel: [[true, true, true, true], [true, true, true, false]] },
];

export const RONDE_HITUNG_CA: BentukLuas[][] = [
  [BENTUK_A[0], BENTUK_A[1]],
  [BENTUK_A[2], BENTUK_A[3]],
  [BENTUK_A[4], BENTUK_A[5]],
];
export const RONDE_SATUAN_CA: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Satuan baku luas untuk meja kecil?", jawab: "cm²", opsi: ["cm²", "m²", "ml"], pesan: "Meja kecil → sentimeter persegi." },
    { tanya: "Satuan baku luas untuk lapangan bola?", jawab: "m²", opsi: ["m²", "cm²", "liter"], pesan: "Lapangan besar → meter persegi." },
  ],
  [
    { tanya: "1 cm × 1 cm = …", jawab: "1 cm²", opsi: ["1 cm²", "1 m²", "1 cm³"], pesan: "Definisi buku." },
    { tanya: "1 m × 1 m = …", jawab: "1 m²", opsi: ["1 m²", "1 cm²", "1 liter"], pesan: "Definisi buku." },
  ],
  [
    { tanya: "Uang kertas menutupi meja tanpa celah disebut satuan …", jawab: "tidak baku", opsi: ["tidak baku", "baku", "kubik"], pesan: "Satuan tidak baku." },
    { tanya: "Persegi sisi 1 cm adalah satuan luas …", jawab: "baku", opsi: ["baku", "tidak baku", "cair"], pesan: "Satuan baku." },
  ],
];
export const RONDE_KONVERSI_CA: { teks: string; jawab: number; opsi: number[]; pesan: string; label: string }[][] = [
  [
    { teks: "1 m² = … cm²", jawab: 10000, opsi: [10000, 100, 1000], pesan: "1 m = 100 cm → 100×100 = 10.000.", label: "cm²" },
    { teks: "2 m² = … cm²", jawab: 20000, opsi: [20000, 200, 2000], pesan: "2 × 10.000 = 20.000.", label: "cm²" },
  ],
  [
    { teks: "10.000 cm² = … m²", jawab: 1, opsi: [1, 10, 100], pesan: "Balik konversi buku.", label: "m²" },
    { teks: "1 m = … cm", jawab: 100, opsi: [100, 10, 1000], pesan: "Panjang baku.", label: "cm" },
  ],
  [
    { teks: "Luas 13 persegi satuan sisi 1 cm = … cm²", jawab: 13, opsi: [13, 12, 16], pesan: "Contoh buku (i) dan (ii).", label: "cm²" },
    { teks: "Luas 9 persegi satuan sisi 1 cm = … cm²", jawab: 9, opsi: [9, 8, 12], pesan: "Setiap sel = 1 cm².", label: "cm²" },
  ],
];
export const RONDE_SORTIR_CA: { id: string; label: string; jenis: "baku" | "tidak" }[][] = [
  [
    { id: "cm2", label: "cm²", jenis: "baku" },
    { id: "uang", label: "uang kertas", jenis: "tidak" },
    { id: "m2", label: "m²", jenis: "baku" },
    { id: "origami", label: "kertas origami", jenis: "tidak" },
    { id: "persegi1cm", label: "persegi 1 cm", jenis: "baku" },
    { id: "buku", label: "buku tulis", jenis: "tidak" },
  ],
  [
    { id: "m2b", label: "meter persegi", jenis: "baku" },
    { id: "kartu", label: "kartu hewan", jenis: "tidak" },
    { id: "cm2b", label: "sentimeter persegi", jenis: "baku" },
    { id: "telapak", label: "telapak tangan", jenis: "tidak" },
    { id: "kisi", label: "kisi 1×1 cm", jenis: "baku" },
    { id: "daun", label: "daun kering", jenis: "tidak" },
  ],
  [
    { id: "std1", label: "1 cm²", jenis: "baku" },
    { id: "std2", label: "1 m²", jenis: "baku" },
    { id: "nb1", label: "keping mainan", jenis: "tidak" },
    { id: "nb2", label: "stiker", jenis: "tidak" },
    { id: "std3", label: "persegi satuan baku", jenis: "baku" },
    { id: "nb3", label: "amplop", jenis: "tidak" },
  ],
];
export const RONDE_PASANG_CA: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "1 cm × 1 cm", kanan: "1 cm²" },
    { kiri: "1 m × 1 m", kanan: "1 m²" },
    { kiri: "1 m²", kanan: "10.000 cm²" },
    { kiri: "uang kertas", kanan: "satuan tidak baku" },
  ],
  [
    { kiri: "lapangan bola", kanan: "m²" },
    { kiri: "bingkai foto", kanan: "cm²" },
    { kiri: "13 sel × 1 cm²", kanan: "13 cm²" },
    { kiri: "menutup tanpa celah", kanan: "mengukur luas" },
  ],
  [
    { kiri: "sentimeter persegi", kanan: "cm²" },
    { kiri: "meter persegi", kanan: "m²" },
    { kiri: "4 lipatan", kanan: "4 persegi satuan" },
    { kiri: "16 lipatan", kanan: "16 persegi satuan" },
  ],
];
export const RONDE_MEMORI_CA = RONDE_PASANG_CA;
export const RONDE_KETUK_CA: { item: BentukLuas[]; tanya: number[] }[] = [
  { item: [BENTUK_A[0], BENTUK_A[1], BENTUK_A[2], BENTUK_A[5], BENTUK_A[6], BENTUK_A[7]], tanya: [4, 6, 9] },
  { item: [BENTUK_A[2], BENTUK_A[3], BENTUK_A[4], BENTUK_A[0], BENTUK_A[6], BENTUK_A[7]], tanya: [5, 8, 13] },
  { item: [BENTUK_A[5], BENTUK_A[6], BENTUK_A[7], BENTUK_A[1], BENTUK_A[0], BENTUK_A[2]], tanya: [9, 3, 7] },
];
export const RONDE_SEMUA_CA: { syarat: "baku" | "tidak"; item: { id: string; label: string; jenis: "baku" | "tidak" }[] }[] =
  RONDE_SORTIR_CA.map((ro, i) => ({ syarat: (i % 2 === 0 ? "baku" : "tidak") as "baku" | "tidak", item: ro }));
export const cocokJenisLuas = (x: { jenis: string }, syarat: string) => x.jenis === syarat;
export const RONDE_CERITA_CA: { teks: string; jawab: number | string; opsi: (number | string)[]; pesan: string }[][] = [
  [
    { teks: "Helen menutup meja lipat dengan uang kertas tanpa celah. Itu mengukur …", jawab: "luas", opsi: ["luas", "volume", "berat"], pesan: "Menutup permukaan = luas." },
    { teks: "Aktivitas lipat: nomor 5 menghasilkan berapa persegi satuan?", jawab: 4, opsi: [4, 8, 16], pesan: "Buku: 4 persegi satuan." },
  ],
  [
    { teks: "Aktivitas lipat nomor 6 menghasilkan … persegi satuan.", jawab: 16, opsi: [16, 8, 4], pesan: "Buku: 16 persegi satuan." },
    { teks: "Dua bangun berbeda bentuk, masing-masing 13 cm². Luasnya …", jawab: "sama", opsi: ["sama", "beda", "nol"], pesan: "Bentuk boleh beda, luas sama." },
  ],
  [
    { teks: "Untuk mengukur luas jendela kelas kecil, satuan baku yang cocok?", jawab: "cm²", opsi: ["cm²", "m³", "liter"], pesan: "Permukaan sedang → cm²." },
    { teks: "1 m² berapa cm²?", jawab: 10000, opsi: [10000, 100, 1000], pesan: "Konversi baku buku." },
  ],
];
export const RONDE_URUT_CA: { angka: number[]; dari: "kecil" | "besar"; label: string }[] = [
  { angka: [4, 13, 6, 9], dari: "kecil", label: "cm²" },
  { angka: [16, 4, 8, 12], dari: "besar", label: "persegi" },
  { angka: [5, 9, 3, 7], dari: "kecil", label: "cm²" },
];
export const RONDE_HITUNG_PA = RONDE_HITUNG_CA;
export const RONDE_PASANG_PA = RONDE_PASANG_CA;
export const RONDE_MEMORI_PA = RONDE_MEMORI_CA;
export const RONDE_SORTIR_PA = RONDE_SORTIR_CA;
export const RONDE_SEMUA_PA = RONDE_SEMUA_CA;
export const RONDE_KONVERSI_PA = RONDE_KONVERSI_CA;
export const RONDE_TABEL_PA: { baris: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { baris: "Sisi 1 cm × 1 cm", jawab: "1 cm²", opsi: ["1 cm²", "1 m²", "1 cm"], pesan: "Definisi." },
    { baris: "Sisi 1 m × 1 m", jawab: "1 m²", opsi: ["1 m²", "1 cm²", "1 ml"], pesan: "Definisi." },
  ],
  [
    { baris: "1 m²", jawab: "10.000 cm²", opsi: ["10.000 cm²", "100 cm²", "1.000 cm²"], pesan: "Konversi." },
    { baris: "Lapangan bola", jawab: "m²", opsi: ["m²", "cm²", "ml"], pesan: "Luas besar." },
  ],
  [
    { baris: "13 sel × 1 cm²", jawab: "13 cm²", opsi: ["13 cm²", "12 cm²", "14 cm²"], pesan: "Contoh buku." },
    { baris: "Uang kertas penutup meja", jawab: "tidak baku", opsi: ["tidak baku", "baku", "kubik"], pesan: "Satuan tidak baku." },
  ],
];
export const RONDE_BENARSALAH_QA: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Luas diukur dengan menutup permukaan tanpa celah.", benar: true, penjelasan: "Konsep buku." },
    { teks: "1 m² = 100 cm².", benar: false, penjelasan: "1 m² = 10.000 cm²." },
    { teks: "cm² adalah satuan baku luas.", benar: true, penjelasan: "Sentimeter persegi." },
    { teks: "Bentuk berbeda pasti luas berbeda.", benar: false, penjelasan: "Boleh sama luas, beda bentuk." },
  ],
  [
    { teks: "Uang kertas adalah satuan luas tidak baku.", benar: true, penjelasan: "Contoh buku." },
    { teks: "m² dipakai untuk luas kecil seperti perangko.", benar: false, penjelasan: "Perangko → cm²." },
    { teks: "Persegi satuan baku sisi 1 cm = 1 cm².", benar: true, penjelasan: "Definisi." },
    { teks: "Volume dan luas memakai satuan yang sama.", benar: false, penjelasan: "Luas cm²/m²; volume ml/l/cm³." },
  ],
];
export const RONDE_DETEKTIF_QA: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["Aku menutup meja tanpa celah.", "Aku mengukur permukaan."], jawab: "luas", opsi: ["luas", "volume", "panjang"], salah: "Menutup permukaan = luas." },
  { klue: ["Sisiku 1 cm dan 1 cm.", "Aku satuan baku."], jawab: "1 cm²", opsi: ["1 cm²", "1 m²", "1 ml"], salah: "1×1 cm = 1 cm²." },
  { klue: ["Aku 10.000 cm².", "Siapa aku dalam m²?"], jawab: "1 m²", opsi: ["1 m²", "10 m²", "100 m²"], salah: "Konversi buku." },
  { klue: ["Aku contoh buku.", "Luas bangun (i) … cm²."], jawab: "13", opsi: ["13", "12", "16"], salah: "13 cm²." },
];
export const PETA_KONSEP_QA = [
  {
    pusat: "Pengukuran Luas",
    kotak: [
      { label: "Tidak baku", opsi: ["uang/origami/buku", "hanya cm²", "hanya liter"], benar: 0 },
      { label: "Baku", opsi: ["cm² dan m²", "hanya ml", "hanya kg"], benar: 0 },
      { label: "Cara", opsi: ["hitung persegi satuan", "timbang saja", "tebak warna"], benar: 0 },
      { label: "Konversi", opsi: ["1 m² = 10.000 cm²", "1 m² = 100 cm²", "1 m² = 1.000 cm²"], benar: 0 },
    ],
  },
];
export const RONDE_CERITA_QA = RONDE_CERITA_CA;

/* ===== B: Volume ===== */
export type SusunanKubus = { id: string; lapisan: number[][]; volume: number };
/** lapisan[y][x] = tinggi tumpukan di posisi itu, atau grid flat count. */
export const hitungVolume = (lapisan: number[][]) => lapisan.flat().reduce((a, b) => a + b, 0);

export const BENTUK_B: SusunanKubus[] = [
  { id: "A", volume: 4, lapisan: [[1, 1], [1, 1]] },
  { id: "B", volume: 6, lapisan: [[1, 1, 1], [1, 1, 1]] },
  { id: "C", volume: 8, lapisan: [[2, 2], [2, 2]] },
  { id: "D", volume: 9, lapisan: [[1, 1, 1], [1, 1, 1], [1, 1, 1]] },
  { id: "E", volume: 12, lapisan: [[2, 2, 2], [2, 2, 2]] },
  { id: "F", volume: 24, lapisan: [[2, 2, 2, 2], [2, 2, 2, 2], [2, 2, 2, 2]] },
  { id: "G", volume: 3, lapisan: [[1, 1, 1]] },
  { id: "H", volume: 1, lapisan: [[1]] },
];

export const RONDE_HITUNG_CB: SusunanKubus[][] = [
  [BENTUK_B[0], BENTUK_B[1]],
  [BENTUK_B[2], BENTUK_B[3]],
  [BENTUK_B[4], BENTUK_B[5]],
];
export const RONDE_SATUAN_CB: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Volume botol sabun A = 4 × volume botol B. Botol B adalah satuan …", jawab: "tidak baku", opsi: ["tidak baku", "baku", "luas"], pesan: "Contoh buku Kegiatan B.1." },
    { tanya: "Satuan baku cairan kecil?", jawab: "ml", opsi: ["ml", "cm²", "m²"], pesan: "Mililiter." },
  ],
  [
    { tanya: "1 liter = … ml", jawab: "1.000 ml", opsi: ["1.000 ml", "100 ml", "10 ml"], pesan: "Konversi buku." },
    { tanya: "1 cm³ = … ml", jawab: "1 ml", opsi: ["1 ml", "10 ml", "100 ml"], pesan: "Hubungan buku." },
  ],
  [
    { tanya: "Satuan volume pejal kecil (dadu)?", jawab: "cm³", opsi: ["cm³", "cm²", "m²"], pesan: "Sentimeter kubik." },
    { tanya: "1 m³ = … liter", jawab: "1.000 l", opsi: ["1.000 l", "100 l", "10 l"], pesan: "Konversi buku." },
  ],
];
export const RONDE_KONVERSI_CB: { teks: string; jawab: number; opsi: number[]; pesan: string; label: string }[][] = [
  [
    { teks: "1 l = … ml", jawab: 1000, opsi: [1000, 100, 10], pesan: "1.000 ml = 1 l.", label: "ml" },
    { teks: "2 l = … ml", jawab: 2000, opsi: [2000, 200, 20], pesan: "2 × 1.000.", label: "ml" },
  ],
  [
    { teks: "1.000 ml = … l", jawab: 1, opsi: [1, 10, 100], pesan: "Susu UHT buku.", label: "l" },
    { teks: "1.500 ml = … l (angka utuh + sisa diabaikan untuk pilihan)", jawab: 1500, opsi: [1500, 15, 150], pesan: "Tetap dalam ml dulu: 1.500 ml.", label: "ml" },
  ],
  [
    { teks: "1 cm³ = … ml", jawab: 1, opsi: [1, 10, 100], pesan: "Hubungan baku.", label: "ml" },
    { teks: "1 m³ = … l", jawab: 1000, opsi: [1000, 100, 10], pesan: "Konversi buku.", label: "l" },
  ],
];
export const RONDE_SORTIR_CB: { id: string; label: string; jenis: "baku" | "tidak" }[][] = [
  [
    { id: "ml", label: "ml", jenis: "baku" },
    { id: "botolB", label: "botol sabun B", jenis: "tidak" },
    { id: "l", label: "liter", jenis: "baku" },
    { id: "gelas", label: "gelas", jenis: "tidak" },
    { id: "cm3", label: "cm³", jenis: "baku" },
    { id: "botolC", label: "botol sabun C", jenis: "tidak" },
  ],
  [
    { id: "m3", label: "m³", jenis: "baku" },
    { id: "cangkir", label: "cangkir", jenis: "tidak" },
    { id: "liter2", label: "l", jenis: "baku" },
    { id: "sendok", label: "sendok", jenis: "tidak" },
    { id: "kubus1", label: "kubus 1 cm³", jenis: "baku" },
    { id: "botolminum", label: "botol minum", jenis: "tidak" },
  ],
  [
    { id: "std1", label: "1 ml", jenis: "baku" },
    { id: "std2", label: "1 liter", jenis: "baku" },
    { id: "nb1", label: "kotak makan", jenis: "tidak" },
    { id: "nb2", label: "ember takar", jenis: "tidak" },
    { id: "std3", label: "1 cm³", jenis: "baku" },
    { id: "nb3", label: "botol kecil sanitizer", jenis: "tidak" },
  ],
];
export const RONDE_PASANG_CB: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "A = 4 × B", kanan: "Kegiatan B.1" },
    { kiri: "A = 10 × C", kanan: "Kegiatan B.2" },
    { kiri: "1 l", kanan: "1.000 ml" },
    { kiri: "1 cm³", kanan: "1 ml" },
  ],
  [
    { kiri: "sendok", kanan: "5 ml" },
    { kiri: "cangkir kopi", kanan: "240 ml" },
    { kiri: "botol minuman", kanan: "330 ml" },
    { kiri: "susu UHT", kanan: "1.000 ml" },
  ],
  [
    { kiri: "1 m³", kanan: "1.000 l" },
    { kiri: "botol besar sanitizer", kanan: "8 botol kecil" },
    { kiri: "dadu pejal", kanan: "cm³" },
    { kiri: "air dalam gelas", kanan: "ml / l" },
  ],
];
export const RONDE_MEMORI_CB = RONDE_PASANG_CB;
export const RONDE_KETUK_CB: { item: SusunanKubus[]; tanya: number[] }[] = [
  { item: [BENTUK_B[0], BENTUK_B[1], BENTUK_B[2], BENTUK_B[3], BENTUK_B[6], BENTUK_B[7]], tanya: [4, 6, 9] },
  { item: [BENTUK_B[2], BENTUK_B[3], BENTUK_B[4], BENTUK_B[0], BENTUK_B[6], BENTUK_B[7]], tanya: [8, 12, 1] },
  { item: [BENTUK_B[3], BENTUK_B[4], BENTUK_B[5], BENTUK_B[1], BENTUK_B[0], BENTUK_B[6]], tanya: [9, 24, 3] },
];
export const RONDE_SEMUA_CB = RONDE_SORTIR_CB.map((ro, i) => ({
  jenis: (i % 2 === 0 ? "baku" : "tidak") as "baku" | "tidak",
  item: ro,
}));
export const cocokJenisVol = (x: { jenis: string }, jenis: string) => x.jenis === jenis;
export const RONDE_CERITA_CB: { teks: string; jawab: number | string; opsi: (number | string)[]; pesan: string }[][] = [
  [
    { teks: "Volume botol A sama dengan berapa botol B?", jawab: 4, opsi: [4, 10, 8], pesan: "Kegiatan B.1." },
    { teks: "Volume botol A sama dengan berapa botol C?", jawab: 10, opsi: [10, 4, 8], pesan: "Kegiatan B.2." },
  ],
  [
    { teks: "1 botol besar sanitizer = … botol kecil.", jawab: 8, opsi: [8, 4, 10], pesan: "Cerita Helen." },
    { teks: "Kotak susu UHT 1.000 ml = … liter.", jawab: 1, opsi: [1, 10, 100], pesan: "1.000 ml = 1 l." },
  ],
  [
    { teks: "Volume bangun (i) buku = … cm³.", jawab: 24, opsi: [24, 9, 12], pesan: "Contoh buku." },
    { teks: "Volume bangun (ii) buku = … cm³.", jawab: 9, opsi: [9, 24, 6], pesan: "Contoh buku." },
  ],
];
export const RONDE_URUT_CB: { angka: number[]; dari: "kecil" | "besar"; label: string }[] = [
  { angka: [5, 330, 240, 1000], dari: "kecil", label: "ml" },
  { angka: [24, 4, 9, 12], dari: "besar", label: "cm³" },
  { angka: [8, 4, 10, 1], dari: "kecil", label: "satuan" },
];
export const RONDE_HITUNG_PB = RONDE_HITUNG_CB;
export const RONDE_PASANG_PB = RONDE_PASANG_CB;
export const RONDE_MEMORI_PB = RONDE_MEMORI_CB;
export const RONDE_SORTIR_PB = RONDE_SORTIR_CB;
export const RONDE_SEMUA_PB = RONDE_SEMUA_CB;
export const RONDE_KONVERSI_PB = RONDE_KONVERSI_CB;
export const RONDE_TABEL_PB: { baris: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { baris: "1 liter", jawab: "1.000 ml", opsi: ["1.000 ml", "100 ml", "10 ml"], pesan: "Konversi." },
    { baris: "1 cm³", jawab: "1 ml", opsi: ["1 ml", "10 ml", "100 ml"], pesan: "Hubungan." },
  ],
  [
    { baris: "sendok", jawab: "5 ml", opsi: ["5 ml", "50 ml", "500 ml"], pesan: "Gambar B.5." },
    { baris: "cangkir kopi", jawab: "240 ml", opsi: ["240 ml", "24 ml", "330 ml"], pesan: "Gambar B.5." },
  ],
  [
    { baris: "1 m³", jawab: "1.000 l", opsi: ["1.000 l", "100 l", "10 l"], pesan: "Konversi." },
    { baris: "botol minuman", jawab: "330 ml", opsi: ["330 ml", "240 ml", "5 ml"], pesan: "Gambar B.5." },
  ],
];
export const RONDE_BENARSALAH_QB: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Volume mengukur isi ruang atau kapasitas.", benar: true, penjelasan: "Konsep buku." },
    { teks: "1 liter = 100 ml.", benar: false, penjelasan: "1 liter = 1.000 ml." },
    { teks: "cm³ cocok untuk benda pejal kecil.", benar: true, penjelasan: "Contoh dadu." },
    { teks: "Botol sabun B adalah satuan volume baku.", benar: false, penjelasan: "Tidak baku." },
  ],
  [
    { teks: "1 cm³ = 1 ml.", benar: true, penjelasan: "Hubungan buku." },
    { teks: "1 m³ = 100 liter.", benar: false, penjelasan: "1 m³ = 1.000 liter." },
    { teks: "A = 4B dan A = 10C bisa benar bersamaan.", benar: true, penjelasan: "B dan C beda ukuran." },
    { teks: "ml dipakai untuk mengukur luas lantai.", benar: false, penjelasan: "ml untuk volume cairan." },
  ],
];
export const RONDE_DETEKTIF_QB: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["Aku Kegiatan B.1.", "A = … × B."], jawab: "4", opsi: ["4", "10", "8"], salah: "A = 4B." },
  { klue: ["Aku susu UHT.", "1.000 ml."], jawab: "1 l", opsi: ["1 l", "10 l", "100 l"], salah: "1.000 ml = 1 l." },
  { klue: ["Aku sendok buku.", "Volume ku … ml."], jawab: "5", opsi: ["5", "240", "330"], salah: "5 ml." },
  { klue: ["Aku bangun (ii) buku.", "Volume ku … cm³."], jawab: "9", opsi: ["9", "24", "12"], salah: "9 cm³." },
];
export const PETA_KONSEP_QB = [
  {
    pusat: "Pengukuran Volume",
    kotak: [
      { label: "Tidak baku", opsi: ["gelas/botol/sabun", "hanya cm²", "hanya m²"], benar: 0 },
      { label: "Cairan baku", opsi: ["ml dan liter", "hanya cm²", "hanya kg"], benar: 0 },
      { label: "Pejal baku", opsi: ["cm³ dan m³", "hanya cm²", "hanya kg"], benar: 0 },
      { label: "Konversi", opsi: ["1 l = 1.000 ml", "1 l = 100 ml", "1 l = 10 ml"], benar: 0 },
    ],
  },
];
export const RONDE_CERITA_QB = RONDE_CERITA_CB;
