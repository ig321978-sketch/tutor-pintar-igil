/**
 * Data murni Matematika Kelas 6 Bab 2 (Rasio): Sub-Bab A–C.
 * Sumber: Buku Siswa Matematika Kelas VI Kemendikbudristek Bab 2 hlm. 59–88.
 * Metode luar: Part-to-Part, Ordered-Ratio, GCF Simplify, Equivalent Table, Unit Rate, Part-to-Whole, Time-Rate.
 * Tanpa React/jaringan. Uji: scripts/uji-statis-k6b2.mjs.
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
  empatEnamSederhana: 2,
  empatEnamPasangan: 3,
  empatBelasCemara: 21,
  bianglalaDari24: 32,
  lahan25Bibit: 30,
  bibitPerJam: 4,
  hiasDari72: 32,
  obatDari72: 40,
  anakDari390: 270,
} as const;

// ========== A · Konsep Rasio ==========
export const RONDE_HITUNG_CA: { label: string; hasil: number; pesan: string }[][] = [
  [
    { label: "4:6 → suku kiri sederhana", hasil: 2, pesan: "Bagi FPB 2 → 2:3." },
    { label: "4:6 → suku kanan sederhana", hasil: 3, pesan: "2:3." },
  ],
  [
    { label: "pucuk 14, rasio 2:3 → cemara", hasil: 21, pesan: "14÷2×3=21." },
    { label: "roller 24, rasio 4:3 → bianglala", hasil: 32, pesan: "4/3×24=32." },
  ],
  [
    { label: "FPB 4 dan 6", hasil: 2, pesan: "Untuk sederhanakan." },
    { label: "6:9 → suku kiri sederhana", hasil: 2, pesan: "2:3." },
  ],
];
export const RONDE_ARTI_CA: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Rasio adalah?", jawab: "perbandingan dua besaran yang sejenis", opsi: ["perbandingan dua besaran yang sejenis", "jumlah dua bilangan saja", "selisih harga saja"], pesan: "Definisi buku." },
    { tanya: "METODE LUAR Part-to-Part Ratio Language?", jawab: "setiap a ada b", opsi: ["setiap a ada b", "a tambah b", "a kali b saja"], pesan: "Bahasa rasio." },
  ],
  [
    { tanya: "Ordered-Ratio Protocol menekankan?", jawab: "a:b berbeda makna dengan b:a", opsi: ["a:b berbeda makna dengan b:a", "a:b sama selalu dengan b:a", "arah tidak penting"], pesan: "Arah." },
    { tanya: "4:6 bentuk paling sederhana?", jawab: "2:3", opsi: ["2:3", "4:6", "1:2"], pesan: "GCF Simplify." },
  ],
  [
    { tanya: "GCF Simplify Ratio artinya?", jawab: "bagi kedua suku dengan FPB", opsi: ["bagi kedua suku dengan FPB", "bagi hanya suku kiri", "tambah FPB ke keduanya"], pesan: "Metode." },
    { tanya: "2:3 dibaca?", jawab: "dua berbanding tiga / setiap 2 ada 3", opsi: ["dua berbanding tiga / setiap 2 ada 3", "dua tambah tiga", "dua kurang tiga"], pesan: "Bahasa." },
  ],
];
export const RONDE_SORTIR_CA: { id: string; label: string; bin: "ya" | "tidak" }[][] = [
  [
    { id: "a1", label: "4:6=2:3", bin: "ya" }, { id: "a2", label: "2:3=3:2", bin: "tidak" }, { id: "a3", label: "arah penting", bin: "ya" },
    { id: "a4", label: "bagi hanya satu suku", bin: "tidak" }, { id: "a5", label: "Part-to-Part", bin: "ya" }, { id: "a6", label: "besaran beda jenis OK tanpa konteks", bin: "tidak" },
  ],
  [
    { id: "b1", label: "Ordered-Ratio", bin: "ya" }, { id: "b2", label: "14→21 cemara (2:3)", bin: "ya" }, { id: "b3", label: "14→14 cemara", bin: "tidak" },
    { id: "b4", label: "GCF Simplify", bin: "ya" }, { id: "b5", label: "4:6=3:2", bin: "tidak" }, { id: "b6", label: "sejenis wajib", bin: "ya" },
  ],
  [
    { id: "c1", label: "32 bianglala dari 24", bin: "ya" }, { id: "c2", label: "abaikan arah OK", bin: "tidak" }, { id: "c3", label: "setiap a ada b", bin: "ya" },
    { id: "c4", label: "rasio = selisih", bin: "tidak" }, { id: "c5", label: "sederhanakan dengan FPB", bin: "ya" }, { id: "c6", label: "6:9=3:2", bin: "tidak" },
  ],
];
export const RONDE_PASANG_CA: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "4:6", kanan: "2:3" }, { kiri: "Part-to-Part", kanan: "setiap a ada b" },
    { kiri: "Ordered", kanan: "a:b ≠ b:a" }, { kiri: "GCF Simplify", kanan: "bagi FPB" },
  ],
  [
    { kiri: "14 pucuk", kanan: "21 cemara" }, { kiri: "4:3 & 24", kanan: "32 bianglala" },
    { kiri: "rasio", kanan: "perbandingan sejenis" }, { kiri: "6:9", kanan: "2:3" },
  ],
  [
    { kiri: "pucuk:cemara 2:3", kanan: "bukan 3:2" }, { kiri: "bahasa", kanan: "berbanding/terhadap" },
    { kiri: "skala ×7", kanan: "kedua suku" }, { kiri: "FPB 4&6", kanan: "2" },
  ],
];
export const RONDE_MEMORI_CA = RONDE_PASANG_CA;
export const RONDE_KETUK_CA: { item: number[]; tanya: number[] }[] = [
  { item: [2, 3, 4, 6, 14, 21], tanya: [2, 3, 21] },
  { item: [2, 3, 24, 32, 4, 6], tanya: [32, 2] },
  { item: [1, 2, 3, 6, 9, 21], tanya: [2, 3, 21] },
];
export const RONDE_SEMUA_CA: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "ciri konsep rasio benar", item: [
    { id: "a", label: "besaran sejenis", cocok: true }, { id: "b", label: "arah penting", cocok: true }, { id: "c", label: "2:3=3:2", cocok: false }, { id: "d", label: "sederhanakan FPB", cocok: true },
  ]},
  { label: "fakta buku A", item: [
    { id: "a", label: "4:6=2:3", cocok: true }, { id: "b", label: "14→21 cemara", cocok: true }, { id: "c", label: "arah bebas", cocok: false }, { id: "d", label: "32 dari rasio 4:3", cocok: true },
  ]},
  { label: "metode luar A", item: [
    { id: "a", label: "Part-to-Part", cocok: true }, { id: "b", label: "Ordered-Ratio", cocok: true }, { id: "c", label: "Unit Rate saja", cocok: false }, { id: "d", label: "GCF Simplify", cocok: true },
  ]},
];
export const RONDE_CERITA_CA: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "4 pucuk merah : 6 cemara sederhana?", jawab: "2:3", opsi: ["2:3", "4:6", "3:2"], pesan: "FPB 2." },
    { teks: "14 pucuk, rasio 2:3, cemara?", jawab: "21", opsi: ["21", "14", "28"], pesan: "Skala." },
  ],
  [
    { teks: "2:3 sama dengan 3:2?", jawab: "tidak", opsi: ["tidak", "ya", "kadang"], pesan: "Ordered." },
    { teks: "Roller 24, rasio bianglala:roller 4:3, bianglala?", jawab: "32", opsi: ["32", "24", "18"], pesan: "Skala." },
  ],
  [
    { teks: "METODE LUAR Part-to-Part?", jawab: "setiap a ada b", opsi: ["setiap a ada b", "a tambah b", "hapus b"], pesan: "Bahasa." },
    { teks: "Cara sederhanakan rasio?", jawab: "bagi kedua suku dengan FPB", opsi: ["bagi kedua suku dengan FPB", "bagi satu suku", "tambah FPB"], pesan: "GCF." },
  ],
];
export const RONDE_URUT_CA: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [2, 6, 3, 4], dari: "kecil" },
  { angka: [32, 14, 21, 24], dari: "besar" },
  { angka: [2, 21, 3, 6], dari: "kecil" },
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
    { baris: "4:6 sederhana", jawab: "2:3", opsi: ["2:3", "4:6", "1:2"], pesan: "FPB." },
    { baris: "arah 2:3", jawab: "bukan 3:2", opsi: ["bukan 3:2", "sama 3:2", "bebas"], pesan: "Ordered." },
  ],
  [
    { baris: "14 & 2:3", jawab: "21", opsi: ["21", "14", "7"], pesan: "Cemara." },
    { baris: "Part-to-Part", jawab: "setiap a ada b", opsi: ["setiap a ada b", "a+b", "a−b"], pesan: "Bahasa." },
  ],
  [
    { baris: "24 & 4:3", jawab: "32", opsi: ["32", "18", "24"], pesan: "Bianglala." },
    { baris: "GCF 4&6", jawab: "2", opsi: ["2", "4", "6"], pesan: "FPB." },
  ],
];
export const RONDE_BENARSALAH_QA: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Rasio membandingkan dua besaran sejenis.", benar: true, penjelasan: "Definisi." },
    { teks: "2:3 sama maknanya dengan 3:2.", benar: false, penjelasan: "Ordered-Ratio." },
    { teks: "4:6 disederhanakan menjadi 2:3.", benar: true, penjelasan: "GCF." },
  ],
  [
    { teks: "Part-to-Part membaca setiap a ada b.", benar: true, penjelasan: "Metode." },
    { teks: "Boleh membagi hanya satu suku saat menyederhanakan.", benar: false, penjelasan: "Kedua suku." },
    { teks: "14 pucuk pada rasio 2:3 membutuhkan 21 cemara.", benar: true, penjelasan: "Skala." },
  ],
];
export const RONDE_DETEKTIF_QA: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["4", "6", "sederhana"], jawab: "2:3", opsi: ["2:3", "4:6", "3:2"], salah: "FPB." },
  { klue: ["arah", "penting", "protokol"], jawab: "a:b ≠ b:a", opsi: ["a:b ≠ b:a", "a:b = b:a", "abaikan arah"], salah: "Ordered." },
  { klue: ["14", "2:3", "cemara"], jawab: "21", opsi: ["21", "14", "28"], salah: "Skala." },
];
export const PETA_KONSEP_QA = [{
  pusat: "Konsep Rasio",
  kotak: [
    { label: "Definisi", opsi: ["perbandingan sejenis", "jumlah saja", "selisih saja"], benar: 0 },
    { label: "Sederhana", opsi: ["bagi FPB kedua suku", "bagi satu suku", "tambah FPB"], benar: 0 },
    { label: "Arah", opsi: ["a:b ≠ b:a", "selalu sama", "bebas"], benar: 0 },
    { label: "Metode luar", opsi: ["Part-to-Part / Ordered / GCF", "Unit Rate saja", "Time-Rate saja"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QA = RONDE_CERITA_CA;

// ========== B · Kesamaan Rasio ==========
export const RONDE_HITUNG_CB: { derajat: number; hasil: number; pesan: string }[][] = [
  [
    { derajat: 10, hasil: 5, pesan: "10:12 → 5:6 (bagi 2)." },
    { derajat: 12, hasil: 6, pesan: "Suku kanan sederhana." },
  ],
  [
    { derajat: 25, hasil: 30, pesan: "25 m² → 30 bibit dari 10:12." },
    { derajat: 6, hasil: 4, pesan: "6 bibit / 1,5 jam = 4 bibit/jam." },
  ],
  [
    { derajat: 4, hasil: 16, pesan: "4 jam × 4 bibit/jam = 16." },
    { derajat: 10, hasil: 30, pesan: "10:12 ×3 = 30:36." },
  ],
];
export const RONDE_RUMUS_CB: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Equivalent Ratio Table artinya?", jawab: "kalikan atau bagi kedua suku dengan bilangan sama", opsi: ["kalikan atau bagi kedua suku dengan bilangan sama", "tambah bilangan sama ke kedua suku", "tukar arah saja"], pesan: "Metode." },
    { tanya: "10:12 senilai dengan?", jawab: "5:6", opsi: ["5:6", "10:6", "12:10"], pesan: "Sederhana." },
  ],
  [
    { tanya: "Fraction-Equivalence Bridge?", jawab: "kesamaan rasio = pecahan senilai", opsi: ["kesamaan rasio = pecahan senilai", "rasio selalu beda pecahan", "hapus penyebut"], pesan: "Bridge." },
    { tanya: "Unit Rate Method dipakai untuk?", jawab: "nilai per 1 satuan agar banding adil", opsi: ["nilai per 1 satuan agar banding adil", "menghapus satuan", "menambah harga"], pesan: "Unit rate." },
  ],
  [
    { tanya: "Paket 5 bibit harga 40000, harga satuan?", jawab: "8000", opsi: ["8000", "40000", "5000"], pesan: "Harga per bibit." },
    { tanya: "Menambah 2 ke kedua suku rasio?", jawab: "tidak menjaga kesamaan rasio", opsi: ["tidak menjaga kesamaan rasio", "selalu menjaga", "sama dengan ×2"], pesan: "Pakai ×/÷." },
  ],
];
export const RONDE_SORTIR_CB: { id: string; label: string; bin: "lancip" | "tumpul" }[][] = [
  [
    { id: "a1", label: "10:12=5:6", bin: "lancip" }, { id: "a2", label: "tambah sama = senilai", bin: "tumpul" }, { id: "a3", label: "tabel × sama", bin: "lancip" },
    { id: "a4", label: "bagi satu suku saja", bin: "tumpul" }, { id: "a5", label: "Unit Rate", bin: "lancip" }, { id: "a6", label: "25 m² → 20 bibit", bin: "tumpul" },
  ],
  [
    { id: "b1", label: "25→30 bibit", bin: "lancip" }, { id: "b2", label: "Bridge pecahan", bin: "lancip" }, { id: "b3", label: "4:10=1:2 kopi", bin: "tumpul" },
    { id: "b4", label: "4 bibit/jam", bin: "lancip" }, { id: "b5", label: "abaikan satuan", bin: "tumpul" }, { id: "b6", label: "30:36 senilai 10:12", bin: "lancip" },
  ],
  [
    { id: "c1", label: "Equivalent Table", bin: "lancip" }, { id: "c2", label: "+2 ke keduanya OK", bin: "tumpul" }, { id: "c3", label: "harga/bibit banding", bin: "lancip" },
    { id: "c4", label: "4:10=2:5", bin: "lancip" }, { id: "c5", label: "2:5=1:2", bin: "tumpul" }, { id: "c6", label: "16 bibit / 4 jam", bin: "lancip" },
  ],
];
export const RONDE_PASANG_CB: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "10:12", kanan: "5:6" }, { kiri: "Equivalent Table", kanan: "×/÷ sama" },
    { kiri: "25 m²", kanan: "30 bibit" }, { kiri: "Unit Rate", kanan: "per 1 satuan" },
  ],
  [
    { kiri: "6 bibit/1,5 jam", kanan: "4 bibit/jam" }, { kiri: "Bridge", kanan: "pecahan senilai" },
    { kiri: "30:36", kanan: "senilai 10:12" }, { kiri: "paket hemat", kanan: "unit rate kecil" },
  ],
  [
    { kiri: "4:10 kopi", kanan: "2:5" }, { kiri: "Ibu 1:2", kanan: "lebih pahit dari 2:5" },
    { kiri: "4 jam", kanan: "16 bibit" }, { kiri: "bukan +sama", kanan: "pakai ×/÷" },
  ],
];
export const RONDE_MEMORI_CB = RONDE_PASANG_CB;
export const RONDE_KETUK_CB: { item: number[]; tanya: number[] }[] = [
  { item: [5, 6, 10, 12, 25, 30], tanya: [5, 30] },
  { item: [4, 8, 16, 30, 36, 40], tanya: [4, 16, 30] },
  { item: [5, 6, 4, 16, 30, 36], tanya: [6, 4] },
];
export const RONDE_SEMUA_CB: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "langkah kesamaan benar", item: [
    { id: "a", label: "×/÷ kedua suku", cocok: true }, { id: "b", label: "tabel rasio", cocok: true }, { id: "c", label: "tambah sama", cocok: false }, { id: "d", label: "cek pecahan senilai", cocok: true },
  ]},
  { label: "fakta buku B", item: [
    { id: "a", label: "10:12=5:6", cocok: true }, { id: "b", label: "25→30 bibit", cocok: true }, { id: "c", label: "4:10=1:2", cocok: false }, { id: "d", label: "4 bibit/jam", cocok: true },
  ]},
  { label: "metode luar B", item: [
    { id: "a", label: "Equivalent Table", cocok: true }, { id: "b", label: "Unit Rate", cocok: true }, { id: "c", label: "Ordered-Ratio saja", cocok: false }, { id: "d", label: "Fraction Bridge", cocok: true },
  ]},
];
export const RONDE_CERITA_CB: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "10:12 senilai?", jawab: "5:6", opsi: ["5:6", "10:6", "2:3"], pesan: "Bagi 2." },
    { teks: "Lahan 25 m², rasio 10:12, bibit?", jawab: "30", opsi: ["30", "25", "12"], pesan: "Skala." },
  ],
  [
    { teks: "6 bibit / 1,5 jam = berapa per jam?", jawab: "4", opsi: ["4", "6", "1"], pesan: "Unit rate." },
    { teks: "4 jam dengan 4 bibit/jam?", jawab: "16", opsi: ["16", "4", "8"], pesan: "×." },
  ],
  [
    { teks: "METODE LUAR Unit Rate?", jawab: "nilai per 1 satuan", opsi: ["nilai per 1 satuan", "tambah satuan", "hapus harga"], pesan: "Metode." },
    { teks: "4:10 dibanding resep 1:2?", jawab: "lebih manis (2:5)", opsi: ["lebih manis (2:5)", "sama", "lebih pahit"], pesan: "Kopi Dona." },
  ],
];
export const RONDE_URUT_CB: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [4, 30, 5, 16], dari: "kecil" },
  { angka: [36, 12, 30, 6], dari: "besar" },
  { angka: [5, 16, 6, 4], dari: "kecil" },
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
    { baris: "10:12", jawab: "5:6", opsi: ["5:6", "10:6", "2:12"], pesan: "Senilai." },
    { baris: "25 m²", jawab: "30", opsi: ["30", "12", "25"], pesan: "Bibit." },
  ],
  [
    { baris: "unit rate kemas", jawab: "4", opsi: ["4", "6", "1"], pesan: "Bibit/jam." },
    { baris: "operasi senilai", jawab: "× atau ÷ sama", opsi: ["× atau ÷ sama", "tambah sama", "tukar arah"], pesan: "Tabel." },
  ],
  [
    { baris: "4 jam", jawab: "16", opsi: ["16", "4", "8"], pesan: "Bibit." },
    { baris: "Bridge", jawab: "pecahan senilai", opsi: ["pecahan senilai", "pecahan beda", "desimal saja"], pesan: "Metode." },
  ],
];
export const RONDE_BENARSALAH_QB: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Kesamaan rasio memakai × atau ÷ yang sama pada kedua suku.", benar: true, penjelasan: "Equivalent Table." },
    { teks: "Menambah bilangan sama ke kedua suku menjaga rasio.", benar: false, penjelasan: "Tidak." },
    { teks: "10:12 senilai 5:6.", benar: true, penjelasan: "Benar." },
  ],
  [
    { teks: "Unit rate memudahkan membandingkan paket.", benar: true, penjelasan: "Metode." },
    { teks: "4:10 sama dengan resep Ibu 1:2.", benar: false, penjelasan: "2:5 ≠ 1:2." },
    { teks: "6 bibit dalam 1,5 jam = 4 bibit per jam.", benar: true, penjelasan: "Unit rate." },
  ],
];
export const RONDE_DETEKTIF_QB: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["10", "12", "senilai"], jawab: "5:6", opsi: ["5:6", "10:6", "2:3"], salah: "Bagi 2." },
  { klue: ["25", "lahan", "bibit"], jawab: "30", opsi: ["30", "25", "12"], salah: "Skala." },
  { klue: ["per", "satu", "satuan"], jawab: "unit rate", opsi: ["unit rate", "ordered ratio", "part-whole"], salah: "Metode B." },
];
export const PETA_KONSEP_QB = [{
  pusat: "Kesamaan Rasio",
  kotak: [
    { label: "Tabel", opsi: ["×/÷ kedua suku", "tambah kedua suku", "hapus kolom"], benar: 0 },
    { label: "Bridge", opsi: ["pecahan senilai", "pecahan beda", "desimal wajib"], benar: 0 },
    { label: "Unit rate", opsi: ["per 1 satuan", "per 0 satuan", "tanpa satuan"], benar: 0 },
    { label: "Metode luar", opsi: ["Table / Bridge / Unit Rate", "GCF saja", "Time-Rate saja"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QB = RONDE_CERITA_CB;

// ========== C · Penerapan Rasio ==========
export const RONDE_HITUNG_CC: { derajat: number; hasil: number; pesan: string }[][] = [
  [
    { derajat: 4, hasil: 9, pesan: "4+5=9 bagian total." },
    { derajat: 72, hasil: 32, pesan: "Hias: 4/9×72=32." },
  ],
  [
    { derajat: 72, hasil: 40, pesan: "Obat: 5/9×72=40." },
    { derajat: 390, hasil: 270, pesan: "Anak: 9/13×390=270." },
  ],
  [
    { derajat: 30, hasil: 2, pesan: "1 km/30 mnt → 2 km/jam." },
    { derajat: 9, hasil: 270, pesan: "9 km × 30 menit = 270 menit." },
  ],
];
export const RONDE_ARTI_CC: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Additive Parts Sum artinya?", jawab: "jumlah suku rasio = banyak bagian total", opsi: ["jumlah suku rasio = banyak bagian total", "kali suku rasio", "kurang suku rasio"], pesan: "Metode." },
    { tanya: "Part-to-Whole Ratio contoh dari 4:5?", jawab: "4:9 dan 5:9", opsi: ["4:9 dan 5:9", "4:5 dan 5:4", "9:4 saja"], pesan: "Part-whole." },
  ],
  [
    { tanya: "4:5 dibanding 4:9?", jawab: "4:5 part-to-part; 4:9 part-to-whole", opsi: ["4:5 part-to-part; 4:9 part-to-whole", "sama saja", "4:9 part-to-part"], pesan: "Beda jenis." },
    { tanya: "Time-Rate Conversion menekankan?", jawab: "samakan satuan waktu lalu skala", opsi: ["samakan satuan waktu lalu skala", "abaikan satuan", "tambah jam saja"], pesan: "Metode." },
  ],
  [
    { tanya: "Rasio anak:dewasa 9:4, total bagian?", jawab: "13", opsi: ["13", "9", "4"], pesan: "9+4." },
    { tanya: "1200 kata/jam selama 180 menit?", jawab: "3600 kata", opsi: ["3600 kata", "1200 kata", "1800 kata"], pesan: "3 jam." },
  ],
];
export const RONDE_SORTIR_CC: { id: string; label: string; bin: "ya" | "tidak" }[][] = [
  [
    { id: "a1", label: "4+5=9 bagian", bin: "ya" }, { id: "a2", label: "4:9 = part-to-part", bin: "tidak" }, { id: "a3", label: "32 hias dari 72", bin: "ya" },
    { id: "a4", label: "40 obat dari 72", bin: "ya" }, { id: "a5", label: "abaikan total OK", bin: "tidak" }, { id: "a6", label: "Part-to-Whole", bin: "ya" },
  ],
  [
    { id: "b1", label: "270 anak dari 390", bin: "ya" }, { id: "b2", label: "9:4 total bagian 9", bin: "tidak" }, { id: "b3", label: "Time-Rate", bin: "ya" },
    { id: "b4", label: "1 km/30 mnt = 2 km/jam", bin: "ya" }, { id: "b5", label: "satuan waktu bebas campur", bin: "tidak" }, { id: "b6", label: "Additive Parts", bin: "ya" },
  ],
  [
    { id: "c1", label: "9 km → 270 menit", bin: "ya" }, { id: "c2", label: "4:5 = 4:9", bin: "tidak" }, { id: "c3", label: "3600 kata / 3 jam", bin: "ya" },
    { id: "c4", label: "part-whole pakai a+b", bin: "ya" }, { id: "c5", label: "total tidak perlu", bin: "tidak" }, { id: "c6", label: "tabel tetap berguna", bin: "ya" },
  ],
];
export const RONDE_PASANG_CC: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "4:5", kanan: "hias:obat" }, { kiri: "4+5", kanan: "9 bagian" },
    { kiri: "4:9", kanan: "hias:total" }, { kiri: "5:9", kanan: "obat:total" },
  ],
  [
    { kiri: "72 bibit", kanan: "32 & 40" }, { kiri: "9:4 & 390", kanan: "270 anak" },
    { kiri: "Part-to-Whole", kanan: "a:(a+b)" }, { kiri: "Additive Parts", kanan: "a+b" },
  ],
  [
    { kiri: "1 km/30 mnt", kanan: "2 km/jam" }, { kiri: "9 km", kanan: "4,5 jam" },
    { kiri: "1200 kata/jam", kanan: "3600 / 3 jam" }, { kiri: "Time-Rate", kanan: "samakan satuan" },
  ],
];
export const RONDE_MEMORI_CC = RONDE_PASANG_CC;
export const RONDE_KETUK_CC: { item: number[]; tanya: number[] }[] = [
  { item: [4, 5, 9, 32, 40, 72], tanya: [9, 32, 40] },
  { item: [9, 4, 13, 270, 120, 390], tanya: [13, 270] },
  { item: [2, 30, 270, 3600, 1200, 9], tanya: [2, 270, 3600] },
];
export const RONDE_SEMUA_CC: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "langkah bagian:total benar", item: [
    { id: "a", label: "jumlahkan suku", cocok: true }, { id: "b", label: "bagi total ke bagian", cocok: true }, { id: "c", label: "abaikan a+b", cocok: false }, { id: "d", label: "tulis a:(a+b)", cocok: true },
  ]},
  { label: "fakta buku C", item: [
    { id: "a", label: "32 & 40 dari 72", cocok: true }, { id: "b", label: "270 anak", cocok: true }, { id: "c", label: "4:5=4:9", cocok: false }, { id: "d", label: "2 km/jam", cocok: true },
  ]},
  { label: "metode luar C", item: [
    { id: "a", label: "Part-to-Whole", cocok: true }, { id: "b", label: "Additive Parts", cocok: true }, { id: "c", label: "GCF saja", cocok: false }, { id: "d", label: "Time-Rate", cocok: true },
  ]},
];
export const RONDE_CERITA_CC: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "Rasio 4:5, total 72, tanaman hias?", jawab: "32", opsi: ["32", "40", "72"], pesan: "4/9×72." },
    { teks: "Rasio hias terhadap seluruh?", jawab: "4:9", opsi: ["4:9", "4:5", "5:9"], pesan: "Part-whole." },
  ],
  [
    { teks: "9:4 total 390, anak-anak?", jawab: "270", opsi: ["270", "120", "390"], pesan: "9/13×390." },
    { teks: "1 km / 30 menit = ? km/jam", jawab: "2", opsi: ["2", "1", "30"], pesan: "Time-Rate." },
  ],
  [
    { teks: "METODE LUAR Additive Parts Sum?", jawab: "jumlah suku = bagian total", opsi: ["jumlah suku = bagian total", "kali suku = total", "kurang suku"], pesan: "Metode." },
    { teks: "1200 kata/jam × 180 menit?", jawab: "3600", opsi: ["3600", "1200", "1800"], pesan: "3 jam." },
  ],
];
export const RONDE_URUT_CC: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [4, 40, 9, 32], dari: "kecil" },
  { angka: [390, 270, 72, 40], dari: "besar" },
  { angka: [2, 270, 9, 32], dari: "kecil" },
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
    { baris: "4+5", jawab: "9", opsi: ["9", "20", "1"], pesan: "Bagian." },
    { baris: "hias:total", jawab: "4:9", opsi: ["4:9", "4:5", "5:9"], pesan: "Whole." },
  ],
  [
    { baris: "72 & 4:5 hias", jawab: "32", opsi: ["32", "40", "9"], pesan: "Hitung." },
    { baris: "390 & 9:4 anak", jawab: "270", opsi: ["270", "120", "13"], pesan: "Pasar." },
  ],
  [
    { baris: "30 menit → jam", jawab: "2 km/jam", opsi: ["2 km/jam", "1 km/jam", "30 km/jam"], pesan: "Time." },
    { baris: "part-to-part vs whole", jawab: "a:b vs a:(a+b)", opsi: ["a:b vs a:(a+b)", "sama saja", "a+b vs a−b"], pesan: "Beda." },
  ],
];
export const RONDE_BENARSALAH_QC: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Jumlah suku rasio menjadi banyak bagian total.", benar: true, penjelasan: "Additive Parts." },
    { teks: "4:5 sama dengan 4:9.", benar: false, penjelasan: "Part-part ≠ part-whole." },
    { teks: "Dari 72 dan 4:5, hias = 32.", benar: true, penjelasan: "Benar." },
  ],
  [
    { teks: "Samakan satuan waktu sebelum menskala jarak.", benar: true, penjelasan: "Time-Rate." },
    { teks: "Part-to-Whole menulis bagian terhadap keseluruhan.", benar: true, penjelasan: "Metode." },
    { teks: "9:4 dengan total 390 menghasilkan 90 anak.", benar: false, penjelasan: "270 anak." },
  ],
];
export const RONDE_DETEKTIF_QC: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["4:5", "72", "hias"], jawab: "32", opsi: ["32", "40", "9"], salah: "4/9×72." },
  { klue: ["bagian", "keseluruhan", "4:5"], jawab: "4:9", opsi: ["4:9", "4:5", "9:4"], salah: "Part-whole." },
  { klue: ["1 km", "30 menit", "per jam"], jawab: "2", opsi: ["2", "1", "30"], salah: "Time-Rate." },
];
export const PETA_KONSEP_QC = [{
  pusat: "Penerapan Rasio",
  kotak: [
    { label: "Jumlah bagian", opsi: ["a+b", "a×b", "a−b"], benar: 0 },
    { label: "Part-whole", opsi: ["a:(a+b)", "a:b saja", "b:a saja"], benar: 0 },
    { label: "Waktu", opsi: ["samakan satuan lalu skala", "campur jam-menit bebas", "abaikan laju"], benar: 0 },
    { label: "Metode luar", opsi: ["Part-Whole / Additive / Time-Rate", "GCF saja", "Ordered saja"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QC = RONDE_CERITA_CC;
