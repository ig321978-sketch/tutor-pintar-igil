/**
 * Data murni Matematika Kelas 4 Bab 3 (Pola Gambar dan Pola Bilangan): Sub-Bab A–B.
 * Sumber: Buku Siswa Matematika Kelas IV Kemendikbudristek Bab 3 hlm. 85–102.
 * Tanpa React/jaringan. Uji: scripts/uji-data-k4b3.mjs.
 */

export const HURUF = ["A", "B", "C", "D", "E", "F", "G", "H"] as const;

export type Pola = { suku: number[]; beda: number; jenis: "membesar" | "mengecil" };
export type SoalLanjut = { awal: number[]; jawab: number; opsi: number[]; pesan: string };

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
export const bedaPola = (suku: number[]) => (suku.length >= 2 ? suku[1] - suku[0] : 0);
export const lanjutkan = (suku: number[], langkah = 1) => {
  const d = bedaPola(suku);
  let x = suku[suku.length - 1];
  const out: number[] = [];
  for (let i = 0; i < langkah; i += 1) {
    x += d;
    out.push(x);
  }
  return out;
};
export const sukuKe = (a: number, d: number, n: number) => a + (n - 1) * d;
export const opsiAngka = (h: number, seed: number) => {
  const o = [h, h + 1 + (seed % 3), Math.max(0, h - 2 - (seed % 2))];
  if (o[1] === h) o[1] = h + 4;
  if (o[2] === h || o[2] === o[1]) o[2] = h + 6;
  return urutanTetap(3, 1, seed).map((i) => o[i]);
};
export const teksBeda = (d: number) => (d > 0 ? `+${d}` : `${d}`);
export const jenisDariBeda = (d: number): "membesar" | "mengecil" => (d > 0 ? "membesar" : "mengecil");

/* ===== A: pola gambar ===== */
export const RONDE_BACA_CA: Pola[][] = [
  [{ suku: [2, 4, 6], beda: 2, jenis: "membesar" }, { suku: [1, 3, 5], beda: 2, jenis: "membesar" }],
  [{ suku: [9, 7, 5], beda: -2, jenis: "mengecil" }, { suku: [10, 8, 6], beda: -2, jenis: "mengecil" }],
  [{ suku: [3, 6, 9], beda: 3, jenis: "membesar" }, { suku: [12, 9, 6], beda: -3, jenis: "mengecil" }],
];
export const RONDE_LANJUT_CA: SoalLanjut[][] = [
  [
    { awal: [2, 4, 6], jawab: 8, opsi: [8, 7, 10], pesan: "Beda +2 → 6+2=8 (jeruk buku)." },
    { awal: [2, 4, 6, 8, 10, 12], jawab: 14, opsi: [14, 12, 16], pesan: "Kumpulan ke-7 = 14." },
  ],
  [
    { awal: [9, 7, 5], jawab: 3, opsi: [3, 4, 1], pesan: "Beda −2 → 5−2=3." },
    { awal: [9, 7, 5, 3], jawab: 1, opsi: [1, 0, 2], pesan: "Kumpulan ke-5 = 1 permen." },
  ],
  [
    { awal: [1, 3, 5], jawab: 7, opsi: [7, 6, 9], pesan: "Beda +2 → 5+2=7." },
    { awal: [12, 9, 6], jawab: 3, opsi: [3, 4, 0], pesan: "Beda −3 → 6−3=3." },
  ],
];
export const RONDE_SORTIR_CA: { suku: number[]; jenis: "membesar" | "mengecil" }[][] = [
  [
    { suku: [2, 4, 6], jenis: "membesar" },
    { suku: [9, 7, 5], jenis: "mengecil" },
    { suku: [1, 3, 5], jenis: "membesar" },
    { suku: [10, 8, 6], jenis: "mengecil" },
    { suku: [3, 6, 9], jenis: "membesar" },
    { suku: [12, 9, 6], jenis: "mengecil" },
  ],
  [
    { suku: [4, 6, 8], jenis: "membesar" },
    { suku: [15, 12, 9], jenis: "mengecil" },
    { suku: [5, 10, 15], jenis: "membesar" },
    { suku: [8, 6, 4], jenis: "mengecil" },
    { suku: [0, 2, 4], jenis: "membesar" },
    { suku: [11, 8, 5], jenis: "mengecil" },
  ],
  [
    { suku: [7, 9, 11], jenis: "membesar" },
    { suku: [20, 15, 10], jenis: "mengecil" },
    { suku: [2, 5, 8], jenis: "membesar" },
    { suku: [9, 6, 3], jenis: "mengecil" },
    { suku: [1, 4, 7], jenis: "membesar" },
    { suku: [14, 11, 8], jenis: "mengecil" },
  ],
];
export const RONDE_PASANG_CA: { suku: number[]; beda: string }[][] = [
  [
    { suku: [2, 4, 6], beda: "+2" },
    { suku: [9, 7, 5], beda: "-2" },
    { suku: [1, 4, 7], beda: "+3" },
    { suku: [12, 9, 6], beda: "-3" },
  ],
  [
    { suku: [3, 6, 9], beda: "+3" },
    { suku: [10, 8, 6], beda: "-2" },
    { suku: [5, 10, 15], beda: "+5" },
    { suku: [15, 12, 9], beda: "-3" },
  ],
  [
    { suku: [4, 8, 12], beda: "+4" },
    { suku: [8, 6, 4], beda: "-2" },
    { suku: [2, 5, 8], beda: "+3" },
    { suku: [20, 15, 10], beda: "-5" },
  ],
];
export const RONDE_MEMORI_CA = RONDE_PASANG_CA;
export const RONDE_KETUK_CA: { item: number[][]; tanya: number[][] }[] = [
  { item: [[2, 4, 6], [9, 7, 5], [1, 3, 5], [10, 8, 6], [3, 6, 9], [12, 9, 6]], tanya: [[2, 4, 6], [9, 7, 5], [3, 6, 9]] },
  { item: [[4, 6, 8], [15, 12, 9], [5, 10, 15], [8, 6, 4], [0, 2, 4], [11, 8, 5]], tanya: [[5, 10, 15], [8, 6, 4], [4, 6, 8]] },
  { item: [[7, 9, 11], [20, 15, 10], [2, 5, 8], [9, 6, 3], [1, 4, 7], [14, 11, 8]], tanya: [[1, 4, 7], [20, 15, 10], [7, 9, 11]] },
];
export const idSuku = (s: number[]) => s.join("-");
export const RONDE_SEMUA_CA: { jenis: "membesar" | "mengecil"; item: { suku: number[]; jenis: "membesar" | "mengecil" }[] }[] = RONDE_SORTIR_CA.map((ro) => ({
  jenis: "membesar" as const,
  item: ro,
})).map((ro, i) => ({ ...ro, jenis: (i % 2 === 0 ? "membesar" : "mengecil") as "membesar" | "mengecil" }));
export const cocokJenisPola = (x: { jenis: string }, jenis: string) => x.jenis === jenis;
export const RONDE_CERITA_CA: { teks: string; jawab: number | string; opsi: (number | string)[]; pesan: string }[][] = [
  [
    { teks: "Jeruk: 2, 4, 6, … Banyak di kumpulan ke-4?", jawab: 8, opsi: [8, 7, 10], pesan: "Setiap kumpulan +2 jeruk." },
    { teks: "Jeruk ke-7 menurut tabel buku?", jawab: 14, opsi: [14, 12, 16], pesan: "2+2+… tujuh kali = 14." },
  ],
  [
    { teks: "Permen: 9, 7, 5, … Kumpulan ke-5?", jawab: 1, opsi: [1, 3, 0], pesan: "Setiap kumpulan −2." },
    { teks: "Pola gambar membesar artinya jumlah benda …", jawab: "bertambah", opsi: ["bertambah", "berkurang", "tetap"], pesan: "Membesar = semakin banyak." },
  ],
  [
    { teks: "Selisih tetap +2. Suku berikutnya setelah 10?", jawab: 12, opsi: [12, 11, 14], pesan: "10+2=12." },
    { teks: "Pola mengecil dengan beda −3: setelah 6?", jawab: 3, opsi: [3, 4, 9], pesan: "6−3=3." },
  ],
];
export const RONDE_URUT_CA: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [2, 8, 4, 6], dari: "kecil" },
  { angka: [9, 1, 5, 7], dari: "besar" },
  { angka: [3, 12, 6, 9], dari: "kecil" },
];
export const RONDE_BACA_PA = RONDE_BACA_CA;
export const RONDE_LANJUT_PA = RONDE_LANJUT_CA;
export const RONDE_PASANG_PA = RONDE_PASANG_CA;
export const RONDE_MEMORI_PA = RONDE_MEMORI_CA;
export const RONDE_SORTIR_PA = RONDE_SORTIR_CA;
export const RONDE_KETUK_PA = RONDE_KETUK_CA;
export const RONDE_SEMUA_PA = RONDE_SEMUA_CA;
export const RONDE_TABEL_PA: { suku: number[]; lanjut: number }[][] = [
  [{ suku: [2, 4, 6], lanjut: 8 }, { suku: [9, 7, 5], lanjut: 3 }],
  [{ suku: [1, 3, 5], lanjut: 7 }, { suku: [10, 8, 6], lanjut: 4 }],
  [{ suku: [3, 6, 9], lanjut: 12 }, { suku: [12, 9, 6], lanjut: 3 }],
];
export const RONDE_BENARSALAH_QA: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Pola 2, 4, 6, 8 membesar dengan beda +2.", benar: true, penjelasan: "Contoh jeruk buku." },
    { teks: "Pola gambar mengecil berarti benda bertambah.", benar: false, penjelasan: "Mengecil = semakin sedikit." },
    { teks: "9, 7, 5, 3, 1 bedanya −2.", benar: true, penjelasan: "Contoh permen buku." },
    { teks: "Selisih antar kumpulan pada pola buku selalu sama.", benar: true, penjelasan: "Beda tetap." },
  ],
  [
    { teks: "Kumpulan ke-7 jeruk = 14.", benar: true, penjelasan: "Tabel buku." },
    { teks: "Beda +3 membuat pola mengecil.", benar: false, penjelasan: "Beda positif = membesar." },
    { teks: "Tabel membantu menemukan suku berikutnya.", benar: true, penjelasan: "Metode buku." },
    { teks: "Pola gambar hanya bisa membesar.", benar: false, penjelasan: "Ada juga mengecil." },
  ],
];
export const RONDE_DETEKTIF_QA: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["Aku jeruk buku.", "2, 4, 6, lalu …"], jawab: "8", opsi: ["8", "7", "10"], salah: "+2 → 8." },
  { klue: ["Aku permen mengecil.", "9, 7, 5, 3, …"], jawab: "1", opsi: ["1", "2", "0"], salah: "−2 → 1." },
  { klue: ["Beda ku +2.", "Aku membesar."], jawab: "membesar", opsi: ["membesar", "mengecil", "tetap"], salah: "Beda positif = membesar." },
  { klue: ["Setiap langkah −3.", "Setelah 12 …"], jawab: "9", opsi: ["9", "15", "10"], salah: "12−3=9." },
];
export const PETA_KONSEP_QA = [
  {
    pusat: "Pola Gambar",
    kotak: [
      { label: "Membesar", opsi: ["benda bertambah", "benda berkurang", "benda tetap"], benar: 0 },
      { label: "Mengecil", opsi: ["benda berkurang", "benda bertambah", "acak"], benar: 0 },
      { label: "Jeruk buku", opsi: ["+2", "−2", "+3"], benar: 0 },
      { label: "Alat bantu", opsi: ["tabel selisih", "tebak saja", "acak"], benar: 0 },
    ],
  },
];
export const RONDE_CERITA_QA = RONDE_CERITA_CA;

/* ===== B: pola bilangan ===== */
export const RONDE_BACA_CB: Pola[][] = [
  [{ suku: [3, 5, 7, 9, 11], beda: 2, jenis: "membesar" }, { suku: [1, 4, 7, 10], beda: 3, jenis: "membesar" }],
  [{ suku: [23, 18, 13, 8], beda: -5, jenis: "mengecil" }, { suku: [32, 28, 24, 20], beda: -4, jenis: "mengecil" }],
  [{ suku: [20, 28, 36, 44], beda: 8, jenis: "membesar" }, { suku: [70, 64, 58, 52], beda: -6, jenis: "mengecil" }],
];
export const RONDE_LANJUT_CB: SoalLanjut[][] = [
  [
    { awal: [3, 5, 7, 9, 11], jawab: 13, opsi: [13, 12, 15], pesan: "Beda +2 → 11+2=13." },
    { awal: [1, 4, 7, 10], jawab: 13, opsi: [13, 12, 14], pesan: "Beda +3 → 10+3=13." },
  ],
  [
    { awal: [23, 18, 13, 8], jawab: 3, opsi: [3, 4, 0], pesan: "Beda −5 → 8−5=3." },
    { awal: [32, 28, 24, 20, 16], jawab: 12, opsi: [12, 14, 10], pesan: "Beda −4 → 16−4=12." },
  ],
  [
    { awal: [20, 28, 36, 44], jawab: 52, opsi: [52, 50, 48], pesan: "Telur +8 → hari ke-5 = 52." },
    { awal: [7, 19, 31, 43], jawab: 55, opsi: [55, 54, 49], pesan: "Beda +12 → 43+12=55." },
  ],
];
export const RONDE_SORTIR_CB: { suku: number[]; jenis: "membesar" | "mengecil" }[][] = [
  [
    { suku: [3, 5, 7], jenis: "membesar" },
    { suku: [23, 18, 13], jenis: "mengecil" },
    { suku: [1, 4, 7], jenis: "membesar" },
    { suku: [32, 28, 24], jenis: "mengecil" },
    { suku: [20, 28, 36], jenis: "membesar" },
    { suku: [70, 64, 58], jenis: "mengecil" },
  ],
  [
    { suku: [5, 9, 13], jenis: "membesar" },
    { suku: [96, 85, 74], jenis: "mengecil" },
    { suku: [12, 27, 42], jenis: "membesar" },
    { suku: [91, 77, 63], jenis: "mengecil" },
    { suku: [13, 22, 31], jenis: "membesar" },
    { suku: [36, 31, 26], jenis: "mengecil" },
  ],
  [
    { suku: [10, 14, 18], jenis: "membesar" },
    { suku: [34, 27, 20], jenis: "mengecil" },
    { suku: [6, 12, 18], jenis: "membesar" },
    { suku: [40, 34, 28], jenis: "mengecil" },
    { suku: [2, 8, 14], jenis: "membesar" },
    { suku: [50, 45, 40], jenis: "mengecil" },
  ],
];
export const RONDE_PASANG_CB: { suku: number[]; beda: string }[][] = [
  [
    { suku: [3, 5, 7], beda: "+2" },
    { suku: [1, 4, 7], beda: "+3" },
    { suku: [23, 18, 13], beda: "-5" },
    { suku: [32, 28, 24], beda: "-4" },
  ],
  [
    { suku: [20, 28, 36], beda: "+8" },
    { suku: [5, 9, 13], beda: "+4" },
    { suku: [70, 64, 58], beda: "-6" },
    { suku: [96, 85, 74], beda: "-11" },
  ],
  [
    { suku: [12, 27, 42], beda: "+15" },
    { suku: [10, 14, 18], beda: "+4" },
    { suku: [36, 31, 26], beda: "-5" },
    { suku: [91, 77, 63], beda: "-14" },
  ],
];
export const RONDE_MEMORI_CB = RONDE_PASANG_CB;
export const RONDE_KETUK_CB: { item: number[][]; tanya: number[][] }[] = [
  { item: [[3, 5, 7], [23, 18, 13], [1, 4, 7], [32, 28, 24], [20, 28, 36], [70, 64, 58]], tanya: [[3, 5, 7], [23, 18, 13], [20, 28, 36]] },
  { item: [[5, 9, 13], [96, 85, 74], [12, 27, 42], [91, 77, 63], [13, 22, 31], [36, 31, 26]], tanya: [[5, 9, 13], [96, 85, 74], [12, 27, 42]] },
  { item: [[10, 14, 18], [34, 27, 20], [6, 12, 18], [40, 34, 28], [2, 8, 14], [50, 45, 40]], tanya: [[10, 14, 18], [34, 27, 20], [6, 12, 18]] },
];
export const RONDE_SEMUA_CB = RONDE_SORTIR_CB.map((ro, i) => ({
  jenis: (i % 2 === 0 ? "membesar" : "mengecil") as "membesar" | "mengecil",
  item: ro,
}));
export const RONDE_CERITA_CB: { teks: string; jawab: number | string; opsi: (number | string)[]; pesan: string }[][] = [
  [
    { teks: "Pola 3, 5, 7, 9, 11, … Bilangan ke-6?", jawab: 13, opsi: [13, 12, 15], pesan: "11+2=13." },
    { teks: "Telur: 20, 28, 36, … Hari ke-5?", jawab: 52, opsi: [52, 44, 60], pesan: "Beda +8 → 52." },
  ],
  [
    { teks: "23, 18, 13, 8, … Selanjutnya?", jawab: 3, opsi: [3, 5, 0], pesan: "Beda −5 → 3." },
    { teks: "Rak buku: 5, 9, 13, … Rak ke-5?", jawab: 21, opsi: [21, 17, 25], pesan: "Beda +4 → 21." },
  ],
  [
    { teks: "Kursi: 20, 23, 26, … Baris ke-5?", jawab: 32, opsi: [32, 29, 35], pesan: "Beda +3 → 32." },
    { teks: "TV: 70, 64, 58, 52, … Juni (bulan ke-6)?", jawab: 40, opsi: [40, 46, 34], pesan: "Beda −6 → 40." },
  ],
];
export const RONDE_URUT_CB: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [3, 11, 5, 9], dari: "kecil" },
  { angka: [23, 8, 18, 13], dari: "besar" },
  { angka: [20, 52, 28, 36], dari: "kecil" },
];
export const RONDE_BACA_PB = RONDE_BACA_CB;
export const RONDE_LANJUT_PB = RONDE_LANJUT_CB;
export const RONDE_PASANG_PB = RONDE_PASANG_CB;
export const RONDE_MEMORI_PB = RONDE_MEMORI_CB;
export const RONDE_SORTIR_PB = RONDE_SORTIR_CB;
export const RONDE_KETUK_PB = RONDE_KETUK_CB;
export const RONDE_SEMUA_PB = RONDE_SEMUA_CB;
export const RONDE_TABEL_PB: { suku: number[]; lanjut: number }[][] = [
  [{ suku: [3, 5, 7, 9], lanjut: 11 }, { suku: [23, 18, 13], lanjut: 8 }],
  [{ suku: [1, 4, 7, 10], lanjut: 13 }, { suku: [20, 28, 36], lanjut: 44 }],
  [{ suku: [5, 9, 13], lanjut: 17 }, { suku: [70, 64, 58], lanjut: 52 }],
];
export const RONDE_BENARSALAH_QB: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Pola bilangan punya aturan penyusunan (beda tetap).", benar: true, penjelasan: "Definisi buku." },
    { teks: "3, 5, 7, 9, 11 membesar.", benar: true, penjelasan: "Beda +2." },
    { teks: "32, 28, 24, 20, 16 membesar.", benar: false, penjelasan: "Mengecil beda −4." },
    { teks: "Boleh memakai tabel untuk mencari suku berikutnya.", benar: true, penjelasan: "Metode buku." },
  ],
  [
    { teks: "1, 4, 7, 10 bedanya +3.", benar: true, penjelasan: "Kasus 1 buku." },
    { teks: "23, 18, 13, 8 bedanya −5.", benar: true, penjelasan: "Kasus 2 buku." },
    { teks: "Persentase sama dengan pola bilangan.", benar: false, penjelasan: "Topik berbeda." },
    { teks: "Hari telur ke-5 = 52.", benar: true, penjelasan: "Contoh cerita buku." },
  ],
];
export const RONDE_DETEKTIF_QB: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["Aku 3, 5, 7, 9, 11.", "Beda ku +2."], jawab: "13", opsi: ["13", "12", "15"], salah: "Suku berikutnya 13." },
  { klue: ["Aku kasus 2 buku.", "23, 18, 13, 8."], jawab: "3", opsi: ["3", "5", "0"], salah: "8−5=3." },
  { klue: ["Telur peternak.", "20, 28, 36, …"], jawab: "52", opsi: ["52", "44", "48"], salah: "Hari ke-5 = 52." },
  { klue: ["Aku mengecil.", "Beda ku negatif."], jawab: "mengecil", opsi: ["mengecil", "membesar", "acak"], salah: "Beda negatif = mengecil." },
];
export const PETA_KONSEP_QB = [
  {
    pusat: "Pola Bilangan",
    kotak: [
      { label: "Arti", opsi: ["susunan beraturan", "acak saja", "hanya genap"], benar: 0 },
      { label: "Membesar", opsi: ["beda positif", "beda negatif", "beda nol"], benar: 0 },
      { label: "Mengecil", opsi: ["beda negatif", "beda positif", "acak"], benar: 0 },
      { label: "Cara", opsi: ["lihat selisih tetap", "tebak", "acak digit"], benar: 0 },
    ],
  },
];
export const RONDE_CERITA_QB = RONDE_CERITA_CB;
