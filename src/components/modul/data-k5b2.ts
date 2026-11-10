/**
 * Data murni Matematika Kelas 5 Bab 2 (KPK dan FPB): Sub-Bab A–E.
 * Sumber: Buku Siswa Matematika Kelas V Kemendikbudristek Bab 2 hlm. 29–61.
 * Tanpa React/jaringan. Uji: scripts/uji-statis-k5b2.mjs.
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
  return urutanTetap(3, 1, seed).map((i) => o[i]);
};

export const fpb = (a: number, b: number): number => {
  let x = Math.abs(a); let y = Math.abs(b);
  while (y) { const t = y; y = x % y; x = t; }
  return x;
};
export const kpk = (a: number, b: number): number => Math.abs(a * b) / fpb(a, b);
export const kpk3 = (a: number, b: number, c: number) => kpk(kpk(a, b), c);
export const kelipatan = (n: number, banyak = 10): number[] => Array.from({ length: banyak }, (_, i) => n * (i + 1));
export const adalahKelipatan = (n: number, dari: number) => dari !== 0 && n % dari === 0;
export const faktor = (n: number): number[] => {
  const hasil: number[] = [];
  for (let i = 1; i <= n; i += 1) if (n % i === 0) hasil.push(i);
  return hasil;
};
export const pasanganFaktor = (n: number): { a: number; b: number }[] =>
  faktor(n).filter((x) => x <= Math.sqrt(n)).map((a) => ({ a, b: n / a }));

export const ANGKA_BUKU = {
  nisaHari: 3, yohanaHari: 4, kpkRenang: 12, tanggalAwal: 3, tanggalBaru: 15,
  asepHari: 3, lukasHari: 5, kpkAsepLukas: 15,
  dindaHari: 5, ameliaHari: 2, kpkPiano: 10,
  contohKpk45: 20, contohFaktor12: [1, 2, 3, 4, 6, 12], contohFaktor18: [1, 2, 3, 6, 9, 18],
} as const;

// ---- A: Kelipatan ----
export const RONDE_KELIPATAN_CA: { dari: number; daftar: number[]; tanya: number; ya: boolean; pesan: string }[][] = [
  [
    { dari: 3, daftar: [3, 6, 9, 12, 15], tanya: 9, ya: true, pesan: "9 = 3×3." },
    { dari: 3, daftar: [3, 6, 9, 12, 15], tanya: 10, ya: false, pesan: "10 bukan kelipatan 3." },
  ],
  [
    { dari: 7, daftar: [7, 14, 21, 28, 35], tanya: 21, ya: true, pesan: "21 = 7×3." },
    { dari: 7, daftar: [7, 14, 21, 28, 35], tanya: 24, ya: false, pesan: "24 bukan kelipatan 7." },
  ],
  [
    { dari: 9, daftar: [9, 18, 27, 36, 45], tanya: 36, ya: true, pesan: "36 = 9×4." },
    { dari: 6, daftar: [6, 12, 18, 24, 30], tanya: 15, ya: false, pesan: "15 bukan kelipatan 6." },
  ],
];
export const RONDE_LANJUT_CA: { dari: number; awal: number[]; lanjut: number; pesan: string }[][] = [
  [
    { dari: 3, awal: [3, 6, 9], lanjut: 12, pesan: "Tambah 3." },
    { dari: 4, awal: [4, 8, 12], lanjut: 16, pesan: "Tambah 4." },
  ],
  [
    { dari: 7, awal: [7, 14, 21], lanjut: 28, pesan: "Tambah 7." },
    { dari: 8, awal: [8, 16, 24], lanjut: 32, pesan: "Tambah 8." },
  ],
  [
    { dari: 9, awal: [9, 18, 27], lanjut: 36, pesan: "Tambah 9." },
    { dari: 5, awal: [5, 10, 15], lanjut: 20, pesan: "Tambah 5." },
  ],
];
export const RONDE_JENIS_CA: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Apa arti kelipatan 3?", jawab: "hasil kali 3 dengan bilangan bulat positif", opsi: ["hasil kali 3 dengan bilangan bulat positif", "hanya 3 dan 6", "faktor dari 3"], pesan: "1×3, 2×3, 3×3, …" },
    { tanya: "Apakah 0 × 3 dihitung kelipatan 3 di buku ini?", jawab: "tidak", opsi: ["tidak", "ya", "kadang"], pesan: "Buku: 0 bukan kelipatan 3." },
  ],
  [
    { tanya: "Dalam tepuk kelipatan 3, kapan bertepuk?", jawab: "saat bilangan kelipatan 3", opsi: ["saat bilangan kelipatan 3", "setiap bilangan ganjil", "hanya bilangan 1"], pesan: "3, 6, 9, …" },
    { tanya: "5 kelipatan 6 minimal?", jawab: "6, 12, 18, 24, 30", opsi: ["6, 12, 18, 24, 30", "1, 2, 3, 6", "5, 10, 15, 20, 25"], pesan: "Kelipatan 6." },
  ],
  [
    { tanya: "Cara cepat cek kelipatan?", jawab: "bagi habis tanpa sisa", opsi: ["bagi habis tanpa sisa", "jumlah digit saja", "bandingkan dengan 100"], pesan: "n % d === 0." },
    { tanya: "Kelipatan 8 yang benar?", jawab: "8, 16, 24, 32, 40", opsi: ["8, 16, 24, 32, 40", "8, 10, 12, 14", "1, 2, 4, 8"], pesan: "×8." },
  ],
];
export const RONDE_SORTIR_CA: { id: string; label: string; bin: "ya" | "tidak" }[][] = [
  [
    { id: "a1", label: "6", bin: "ya" }, { id: "a2", label: "9", bin: "ya" }, { id: "a3", label: "10", bin: "tidak" },
    { id: "a4", label: "12", bin: "ya" }, { id: "a5", label: "14", bin: "tidak" }, { id: "a6", label: "15", bin: "ya" },
  ],
  [
    { id: "b1", label: "14", bin: "ya" }, { id: "b2", label: "21", bin: "ya" }, { id: "b3", label: "20", bin: "tidak" },
    { id: "b4", label: "28", bin: "ya" }, { id: "b5", label: "25", bin: "tidak" }, { id: "b6", label: "35", bin: "ya" },
  ],
  [
    { id: "c1", label: "18", bin: "ya" }, { id: "c2", label: "27", bin: "ya" }, { id: "c3", label: "30", bin: "tidak" },
    { id: "c4", label: "36", bin: "ya" }, { id: "c5", label: "40", bin: "tidak" }, { id: "c6", label: "45", bin: "ya" },
  ],
];
export const RONDE_PASANG_CA: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "kelipatan 3", kanan: "3, 6, 9, 12, …" }, { kiri: "kelipatan 7", kanan: "7, 14, 21, 28, …" },
    { kiri: "kelipatan 9", kanan: "9, 18, 27, 36, …" }, { kiri: "kelipatan 6", kanan: "6, 12, 18, 24, …" },
  ],
  [
    { kiri: "3×4", kanan: "12" }, { kiri: "7×3", kanan: "21" }, { kiri: "9×5", kanan: "45" }, { kiri: "8×4", kanan: "32" },
  ],
  [
    { kiri: "tepuk pada 3", kanan: "kelipatan 3" }, { kiri: "lanjut setelah 9,12", kanan: "15" },
    { kiri: "bukan kelipatan 3", kanan: "10" }, { kiri: "5 kelipatan 8", kanan: "8,16,24,32,40" },
  ],
];
export const RONDE_MEMORI_CA = RONDE_PASANG_CA;
export const RONDE_KETUK_CA: { item: number[]; tanya: number[]; dari: number }[] = [
  { item: [3, 6, 8, 9, 12], tanya: [3, 6, 9], dari: 3 },
  { item: [7, 14, 20, 21, 28], tanya: [7, 14, 21], dari: 7 },
  { item: [9, 15, 18, 27, 36], tanya: [9, 18, 27], dari: 9 },
];
export const RONDE_SEMUA_CA: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "kelipatan 3", item: [
    { id: "a", label: "6", cocok: true }, { id: "b", label: "9", cocok: true }, { id: "c", label: "10", cocok: false }, { id: "d", label: "15", cocok: true },
  ]},
  { label: "kelipatan 7", item: [
    { id: "a", label: "14", cocok: true }, { id: "b", label: "21", cocok: true }, { id: "c", label: "25", cocok: false }, { id: "d", label: "28", cocok: true },
  ]},
  { label: "kelipatan 9", item: [
    { id: "a", label: "18", cocok: true }, { id: "b", label: "27", cocok: true }, { id: "c", label: "30", cocok: false }, { id: "d", label: "36", cocok: true },
  ]},
];
export const RONDE_CERITA_CA: { teks: string; jawab: string | number; opsi: (string | number)[]; pesan: string }[][] = [
  [
    { teks: "Dalam tepuk kelipatan 3, bilangan mana yang ditepuk?", jawab: "9", opsi: ["9", "8", "10"], pesan: "Kelipatan 3." },
    { teks: "Tuliskan 5 kelipatan 6 pertama.", jawab: "6, 12, 18, 24, 30", opsi: ["6, 12, 18, 24, 30", "1, 2, 3, 6, 12", "6, 7, 8, 9, 10"], pesan: "×6." },
  ],
  [
    { teks: "Apakah 28 kelipatan 7?", jawab: "ya", opsi: ["ya", "tidak", "tidak tahu"], pesan: "7×4=28." },
    { teks: "Lanjut barisan 8, 16, 24, …?", jawab: "32", opsi: ["32", "30", "28"], pesan: "+8." },
  ],
  [
    { teks: "Warna semua kelipatan 9 di tabel 1–50. Mana yang diwarnai?", jawab: "36", opsi: ["36", "35", "34"], pesan: "9×4." },
    { teks: "0 × 3 menurut buku?", jawab: "bukan kelipatan 3", opsi: ["bukan kelipatan 3", "kelipatan 3", "faktor 3"], pesan: "Buku mengecualikan 0." },
  ],
];
export const RONDE_URUT_CA: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [12, 3, 9, 6], dari: "kecil" },
  { angka: [28, 7, 21, 14], dari: "besar" },
  { angka: [36, 9, 27, 18], dari: "kecil" },
];
export const RONDE_KELIPATAN_PA = RONDE_KELIPATAN_CA;
export const RONDE_PASANG_PA = RONDE_PASANG_CA;
export const RONDE_MEMORI_PA = RONDE_MEMORI_CA;
export const RONDE_SORTIR_PA = RONDE_SORTIR_CA;
export const RONDE_SEMUA_PA = RONDE_SEMUA_CA;
export const RONDE_LANJUT_PA = RONDE_LANJUT_CA;
export const RONDE_JENIS_PA = RONDE_JENIS_CA;
export const RONDE_TABEL_PA: { baris: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { baris: "kelipatan 3 di 1–15", jawab: "3,6,9,12,15", opsi: ["3,6,9,12,15", "2,4,6,8,10", "1,3,5,7,9"], pesan: "×3." },
    { baris: "lanjut 7,14,21", jawab: "28", opsi: ["28", "24", "27"], pesan: "+7." },
  ],
  [
    { baris: "apakah 45 kelipatan 9?", jawab: "ya", opsi: ["ya", "tidak", "kadang"], pesan: "9×5." },
    { baris: "5 kelipatan 8", jawab: "8,16,24,32,40", opsi: ["8,16,24,32,40", "8,10,12,14,16", "1,2,4,8,16"], pesan: "×8." },
  ],
  [
    { baris: "bukan kelipatan 7", jawab: "20", opsi: ["20", "21", "28"], pesan: "20÷7 sisa." },
    { baris: "arti kelipatan", jawab: "hasil kali bilangan", opsi: ["hasil kali bilangan", "hanya faktor", "hanya prima"], pesan: "Definisi." },
  ],
];
export const RONDE_BENARSALAH_QA: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Kelipatan 3 adalah 3, 6, 9, 12, …", benar: true, penjelasan: "Benar." },
    { teks: "10 adalah kelipatan 3.", benar: false, penjelasan: "10÷3 sisa 1." },
    { teks: "0 × 3 dihitung kelipatan 3 di buku ini.", benar: false, penjelasan: "Buku mengecualikan 0." },
  ],
  [
    { teks: "Dalam tepuk kelipatan, pemain bertepuk pada kelipatan yang dipilih.", benar: true, penjelasan: "Aturan main." },
    { teks: "Setiap bilangan genap adalah kelipatan 3.", benar: false, penjelasan: "Hanya kelipatan 2." },
    { teks: "Kelipatan bisa dicek dengan pembagian habis.", benar: true, penjelasan: "Tanpa sisa." },
  ],
];
export const RONDE_DETEKTIF_QA: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["tepuk bilangan", "kelipatan 3", "antara 8 dan 12"], jawab: "9", opsi: ["9", "8", "10"], salah: "Kelipatan 3." },
  { klue: ["5 bilangan", "kelipatan 6", "mulai dari yang terkecil"], jawab: "6, 12, 18, 24, 30", opsi: ["6, 12, 18, 24, 30", "1, 2, 3, 6, 12", "6, 9, 12, 15, 18"], salah: "×6." },
  { klue: ["barisan 9, 18, 27", "cari berikutnya"], jawab: "36", opsi: ["36", "30", "33"], salah: "+9." },
];
export const PETA_KONSEP_QA = [{
  pusat: "Kelipatan",
  kotak: [
    { label: "Arti", opsi: ["hasil kali bilangan", "hanya faktor", "hanya KPK"], benar: 0 },
    { label: "Contoh 3", opsi: ["3,6,9,12,…", "1,2,3", "2,4,6,8"], benar: 0 },
    { label: "Cek", opsi: ["bagi habis", "acak saja", "banding 100"], benar: 0 },
    { label: "0×n", opsi: ["bukan (buku ini)", "selalu ya", "kadang"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QA = RONDE_CERITA_CA;

// ---- B: Kelipatan Persekutuan & KPK ----
export const RONDE_PERSEKUTUAN_CB: { a: number; b: number; n: number; ya: boolean; pesan: string }[][] = [
  [
    { a: 2, b: 3, n: 6, ya: true, pesan: "6 kelipatan 2 dan 3." },
    { a: 2, b: 3, n: 8, ya: false, pesan: "8 bukan kelipatan 3." },
  ],
  [
    { a: 4, b: 5, n: 20, ya: true, pesan: "20 kelipatan 4 dan 5." },
    { a: 4, b: 5, n: 16, ya: false, pesan: "16 bukan kelipatan 5." },
  ],
  [
    { a: 3, b: 4, n: 12, ya: true, pesan: "KPK renang." },
    { a: 3, b: 5, n: 10, ya: false, pesan: "10 bukan kelipatan 3." },
  ],
];
export const RONDE_KPK_CB: { angka: number[]; hasil: number; pesan: string }[][] = [
  [
    { angka: [4, 5], hasil: 20, pesan: "KPK 4 dan 5 = 20." },
    { angka: [2, 3], hasil: 6, pesan: "KPK 2 dan 3 = 6." },
  ],
  [
    { angka: [5, 7], hasil: 35, pesan: "KPK 5 dan 7 = 35." },
    { angka: [6, 8], hasil: 24, pesan: "KPK 6 dan 8 = 24." },
  ],
  [
    { angka: [3, 4], hasil: 12, pesan: "KPK 3 dan 4 = 12." },
    { angka: [3, 4, 5], hasil: 60, pesan: "KPK 3,4,5 = 60." },
  ],
];
export const RONDE_JADWAL_CB: { teks: string; jawab: string | number; opsi: (string | number)[]; pesan: string }[][] = [
  [
    { teks: "Nisa tiap 3 hari, Yohana tiap 4 hari. KPK hari?", jawab: "12", opsi: ["12", "7", "24"], pesan: "KPK 3 dan 4." },
    { teks: "Mulai 3 Agustus + 12 hari. Tanggal?", jawab: "15 Agustus", opsi: ["15 Agustus", "12 Agustus", "7 Agustus"], pesan: "3+12=15." },
  ],
  [
    { teks: "Asep 3 hari, Lukas 5 hari. KPK?", jawab: "15", opsi: ["15", "8", "30"], pesan: "KPK 3 dan 5." },
    { teks: "Dinda 5 hari, Amelia 2 hari. KPK?", jawab: "10", opsi: ["10", "7", "20"], pesan: "KPK 5 dan 2." },
  ],
  [
    { teks: "Apa nama bilangan kelipatan yang sama?", jawab: "kelipatan persekutuan", opsi: ["kelipatan persekutuan", "faktor saja", "bilangan prima"], pesan: "Definisi." },
    { teks: "Yang terkecil dari kelipatan persekutuan disebut?", jawab: "KPK", opsi: ["KPK", "FPB", "rata-rata"], pesan: "Kelipatan Persekutuan Terkecil." },
  ],
];
export const RONDE_SORTIR_CB: { id: string; label: string; bin: "sama" | "beda" }[][] = [
  [
    { id: "a1", label: "6", bin: "sama" }, { id: "a2", label: "12", bin: "sama" }, { id: "a3", label: "8", bin: "beda" },
    { id: "a4", label: "18", bin: "sama" }, { id: "a5", label: "10", bin: "beda" }, { id: "a6", label: "24", bin: "sama" },
  ],
  [
    { id: "b1", label: "20", bin: "sama" }, { id: "b2", label: "40", bin: "sama" }, { id: "b3", label: "16", bin: "beda" },
    { id: "b4", label: "60", bin: "sama" }, { id: "b5", label: "25", bin: "beda" }, { id: "b6", label: "80", bin: "sama" },
  ],
  [
    { id: "c1", label: "12", bin: "sama" }, { id: "c2", label: "24", bin: "sama" }, { id: "c3", label: "9", bin: "beda" },
    { id: "c4", label: "36", bin: "sama" }, { id: "c5", label: "15", bin: "beda" }, { id: "c6", label: "48", bin: "sama" },
  ],
];
export const RONDE_PASANG_CB: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "KPK 4 dan 5", kanan: "20" }, { kiri: "KPK 2 dan 3", kanan: "6" },
    { kiri: "KPK 3 dan 4", kanan: "12" }, { kiri: "KPK 5 dan 7", kanan: "35" },
  ],
  [
    { kiri: "kelipatan persekutuan 2 & 3", kanan: "6,12,18,…" }, { kiri: "yang terkecil", kanan: "KPK" },
    { kiri: "Nisa 3, Yohana 4", kanan: "12 hari" }, { kiri: "3 Agustus + 12", kanan: "15 Agustus" },
  ],
  [
    { kiri: "KPK 6 dan 8", kanan: "24" }, { kiri: "KPK 3,4,5", kanan: "60" },
    { kiri: "Asep 3, Lukas 5", kanan: "15" }, { kiri: "Dinda 5, Amelia 2", kanan: "10" },
  ],
];
export const RONDE_MEMORI_CB = RONDE_PASANG_CB;
export const RONDE_KETUK_CB: { item: number[]; tanya: number[] }[] = [
  { item: [6, 8, 12, 18, 20], tanya: [6, 12, 18] },
  { item: [20, 16, 40, 25, 60], tanya: [20, 40] },
  { item: [12, 15, 24, 9, 36], tanya: [12, 24, 36] },
];
export const RONDE_SEMUA_CB: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "kelipatan persekutuan 2 dan 3", item: [
    { id: "a", label: "6", cocok: true }, { id: "b", label: "12", cocok: true }, { id: "c", label: "8", cocok: false }, { id: "d", label: "18", cocok: true },
  ]},
  { label: "kelipatan persekutuan 4 dan 5", item: [
    { id: "a", label: "20", cocok: true }, { id: "b", label: "40", cocok: true }, { id: "c", label: "16", cocok: false }, { id: "d", label: "60", cocok: true },
  ]},
  { label: "hasil KPK benar", item: [
    { id: "a", label: "KPK(3,4)=12", cocok: true }, { id: "b", label: "KPK(5,7)=35", cocok: true }, { id: "c", label: "KPK(6,8)=48", cocok: false }, { id: "d", label: "KPK(2,3)=6", cocok: true },
  ]},
];
export const RONDE_CERITA_CB = RONDE_JADWAL_CB;
export const RONDE_URUT_CB: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [20, 6, 12, 35], dari: "kecil" },
  { angka: [24, 60, 10, 15], dari: "besar" },
  { angka: [12, 6, 20, 35], dari: "kecil" },
];
export const RONDE_PERSEKUTUAN_PB = RONDE_PERSEKUTUAN_CB;
export const RONDE_KPK_PB = RONDE_KPK_CB;
export const RONDE_PASANG_PB = RONDE_PASANG_CB;
export const RONDE_MEMORI_PB = RONDE_MEMORI_CB;
export const RONDE_SORTIR_PB = RONDE_SORTIR_CB;
export const RONDE_SEMUA_PB = RONDE_SEMUA_CB;
export const RONDE_JADWAL_PB = RONDE_JADWAL_CB;
export const RONDE_TABEL_PB: { baris: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { baris: "KPK 4 dan 5", jawab: "20", opsi: ["20", "9", "40"], pesan: "List kelipatan." },
    { baris: "kelipatan persekutuan 2 & 3 terkecil", jawab: "6", opsi: ["6", "2", "12"], pesan: "KPK." },
  ],
  [
    { baris: "Nisa 3, Yohana 4 → hari", jawab: "12", opsi: ["12", "7", "1"], pesan: "KPK." },
    { baris: "3 Agustus + 12", jawab: "15 Agustus", opsi: ["15 Agustus", "12 Agustus", "16 Agustus"], pesan: "Tambah hari." },
  ],
  [
    { baris: "KPK 3,4,5", jawab: "60", opsi: ["60", "12", "30"], pesan: "Tiga bilangan." },
    { baris: "arti KPK", jawab: "kelipatan persekutuan terkecil", opsi: ["kelipatan persekutuan terkecil", "faktor terbesar", "selisih"], pesan: "Definisi." },
  ],
];
export const RONDE_BENARSALAH_QB: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Kelipatan persekutuan adalah kelipatan yang sama dari dua bilangan atau lebih.", benar: true, penjelasan: "Benar." },
    { teks: "KPK 4 dan 5 adalah 9.", benar: false, penjelasan: "KPK = 20." },
    { teks: "KPK dipakai untuk jadwal bertemu berikutnya.", benar: true, penjelasan: "Contoh renang." },
  ],
  [
    { teks: "KPK selalu lebih kecil dari kedua bilangan.", benar: false, penjelasan: "Biasanya ≥ bilangan terbesar." },
    { teks: "KPK 3 dan 4 adalah 12.", benar: true, penjelasan: "Benar." },
    { teks: "6, 12, 18 adalah kelipatan persekutuan 2 dan 3.", benar: true, penjelasan: "Benar." },
  ],
];
export const RONDE_DETEKTIF_QB: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["kelipatan 4", "kelipatan 5", "yang sama terkecil"], jawab: "20", opsi: ["20", "9", "40"], salah: "Tandai irisan." },
  { klue: ["Nisa 3 hari", "Yohana 4 hari", "bertemu lagi"], jawab: "12 hari", opsi: ["12 hari", "7 hari", "1 hari"], salah: "KPK." },
  { klue: ["3 Agustus", "tambah KPK 12"], jawab: "15 Agustus", opsi: ["15 Agustus", "12 Agustus", "24 Agustus"], salah: "3+12." },
];
export const PETA_KONSEP_QB = [{
  pusat: "KPK",
  kotak: [
    { label: "Arti", opsi: ["kelipatan persekutuan terkecil", "faktor terbesar", "jumlah"], benar: 0 },
    { label: "Cara", opsi: ["daftar kelipatan lalu irisan", "bagi saja", "acak"], benar: 0 },
    { label: "Contoh 4 & 5", opsi: ["20", "9", "1"], benar: 0 },
    { label: "Pakai", opsi: ["jadwal bersama", "memotong kertas", "hanya baca"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QB = RONDE_CERITA_CB;

// ---- C: Faktor ----
export const RONDE_FAKTOR_CC: { n: number; daftar: number[]; tanya: number; ya: boolean; pesan: string }[][] = [
  [
    { n: 12, daftar: [1, 2, 3, 4, 6, 12], tanya: 4, ya: true, pesan: "12÷4=3." },
    { n: 12, daftar: [1, 2, 3, 4, 6, 12], tanya: 5, ya: false, pesan: "12÷5 sisa." },
  ],
  [
    { n: 18, daftar: [1, 2, 3, 6, 9, 18], tanya: 9, ya: true, pesan: "18÷9=2." },
    { n: 18, daftar: [1, 2, 3, 6, 9, 18], tanya: 4, ya: false, pesan: "18÷4 sisa." },
  ],
  [
    { n: 24, daftar: [1, 2, 3, 4, 6, 8, 12, 24], tanya: 8, ya: true, pesan: "24÷8=3." },
    { n: 36, daftar: [1, 2, 3, 4, 6, 9, 12, 18, 36], tanya: 5, ya: false, pesan: "36÷5 sisa." },
  ],
];
export const RONDE_PASANGAN_CC: { n: number; a: number; b: number; pesan: string }[][] = [
  [
    { n: 18, a: 1, b: 18, pesan: "1×18=18." },
    { n: 18, a: 2, b: 9, pesan: "2×9=18." },
  ],
  [
    { n: 18, a: 3, b: 6, pesan: "3×6=18." },
    { n: 12, a: 3, b: 4, pesan: "3×4=12." },
  ],
  [
    { n: 24, a: 4, b: 6, pesan: "4×6=24." },
    { n: 36, a: 4, b: 9, pesan: "4×9=36." },
  ],
];
export const RONDE_JENIS_CC: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Apa arti faktor dari 12?", jawab: "bilangan yang membagi 12 tanpa sisa", opsi: ["bilangan yang membagi 12 tanpa sisa", "kelipatan 12", "hanya 1 dan 12"], pesan: "Definisi buku." },
    { tanya: "Faktor 12 lengkap?", jawab: "1,2,3,4,6,12", opsi: ["1,2,3,4,6,12", "2,4,6,8,10,12", "1,12 saja"], pesan: "Semua pembagi." },
  ],
  [
    { tanya: "Faktor saling berpasangan berarti?", jawab: "hasil kalinya bilangan itu", opsi: ["hasil kalinya bilangan itu", "selalu sama besar", "hanya prima"], pesan: "1↔18, 2↔9, …" },
    { tanya: "Potong 12 petak tanpa sisa. Panjang bagian boleh?", jawab: "1,2,3,4,6,12", opsi: ["1,2,3,4,6,12", "5 dan 7", "hanya 2"], pesan: "Faktor 12." },
  ],
  [
    { tanya: "Faktor 18?", jawab: "1,2,3,6,9,18", opsi: ["1,2,3,6,9,18", "1,2,4,8,16", "18,36,54"], pesan: "Pembagi 18." },
    { tanya: "Mana bukan faktor 24?", jawab: "5", opsi: ["5", "8", "6"], pesan: "24÷5 sisa." },
  ],
];
export const RONDE_SORTIR_CC: { id: string; label: string; bin: "ya" | "tidak" }[][] = [
  [
    { id: "a1", label: "1", bin: "ya" }, { id: "a2", label: "2", bin: "ya" }, { id: "a3", label: "5", bin: "tidak" },
    { id: "a4", label: "4", bin: "ya" }, { id: "a5", label: "7", bin: "tidak" }, { id: "a6", label: "6", bin: "ya" },
  ],
  [
    { id: "b1", label: "1", bin: "ya" }, { id: "b2", label: "3", bin: "ya" }, { id: "b3", label: "4", bin: "tidak" },
    { id: "b4", label: "9", bin: "ya" }, { id: "b5", label: "5", bin: "tidak" }, { id: "b6", label: "6", bin: "ya" },
  ],
  [
    { id: "c1", label: "8", bin: "ya" }, { id: "c2", label: "12", bin: "ya" }, { id: "c3", label: "5", bin: "tidak" },
    { id: "c4", label: "6", bin: "ya" }, { id: "c5", label: "7", bin: "tidak" }, { id: "c6", label: "24", bin: "ya" },
  ],
];
export const RONDE_PASANG_CC: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "faktor 12", kanan: "1,2,3,4,6,12" }, { kiri: "faktor 18", kanan: "1,2,3,6,9,18" },
    { kiri: "1 × 18", kanan: "18" }, { kiri: "2 × 9", kanan: "18" },
  ],
  [
    { kiri: "3 × 6", kanan: "18" }, { kiri: "3 × 4", kanan: "12" },
    { kiri: "faktor 24", kanan: "1,2,3,4,6,8,12,24" }, { kiri: "bukan faktor 12", kanan: "5" },
  ],
  [
    { kiri: "pasangan faktor 36", kanan: "4 dan 9" }, { kiri: "arti faktor", kanan: "pembagi habis" },
    { kiri: "faktor 54 memuat", kanan: "6 dan 9" }, { kiri: "faktor 72 memuat", kanan: "8 dan 9" },
  ],
];
export const RONDE_MEMORI_CC = RONDE_PASANG_CC;
export const RONDE_KETUK_CC: { item: number[]; tanya: number[]; n: number }[] = [
  { item: [1, 2, 3, 4, 5, 6], tanya: [1, 2, 3, 4, 6], n: 12 },
  { item: [1, 2, 3, 4, 6, 9], tanya: [1, 2, 3, 6, 9], n: 18 },
  { item: [1, 2, 3, 5, 6, 8], tanya: [1, 2, 3, 6, 8], n: 24 },
];
export const RONDE_SEMUA_CC: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "faktor 12", item: [
    { id: "a", label: "4", cocok: true }, { id: "b", label: "6", cocok: true }, { id: "c", label: "5", cocok: false }, { id: "d", label: "3", cocok: true },
  ]},
  { label: "faktor 18", item: [
    { id: "a", label: "9", cocok: true }, { id: "b", label: "6", cocok: true }, { id: "c", label: "4", cocok: false }, { id: "d", label: "3", cocok: true },
  ]},
  { label: "faktor 24", item: [
    { id: "a", label: "8", cocok: true }, { id: "b", label: "12", cocok: true }, { id: "c", label: "5", cocok: false }, { id: "d", label: "6", cocok: true },
  ]},
];
export const RONDE_CERITA_CC: { teks: string; jawab: string | number; opsi: (string | number)[]; pesan: string }[][] = [
  [
    { teks: "Potong 12 petak tanpa sisa. Panjang tiap bagian 3. Berapa potong?", jawab: "4", opsi: ["4", "3", "5"], pesan: "12÷3=4." },
    { teks: "Faktor 12 yang benar?", jawab: "1,2,3,4,6,12", opsi: ["1,2,3,4,6,12", "2,4,6,8,10", "1,12 saja"], pesan: "Semua pembagi." },
  ],
  [
    { teks: "Pasangan faktor 18: 2 berpasangan dengan?", jawab: "9", opsi: ["9", "8", "6"], pesan: "2×9=18." },
    { teks: "Mana bukan faktor 18?", jawab: "4", opsi: ["4", "6", "9"], pesan: "18÷4 sisa." },
  ],
  [
    { teks: "Faktor 24 memuat?", jawab: "8", opsi: ["8", "5", "7"], pesan: "24÷8=3." },
    { teks: "Faktor saling berpasangan artinya?", jawab: "hasil kali = bilangan", opsi: ["hasil kali = bilangan", "selalu prima", "selalu genap"], pesan: "Definisi." },
  ],
];
export const RONDE_URUT_CC: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [12, 1, 6, 3, 4, 2], dari: "kecil" },
  { angka: [18, 1, 9, 3, 6, 2], dari: "besar" },
  { angka: [24, 8, 1, 12, 3, 6], dari: "kecil" },
];
export const RONDE_FAKTOR_PC = RONDE_FAKTOR_CC;
export const RONDE_PASANGAN_PC = RONDE_PASANGAN_CC;
export const RONDE_PASANG_PC = RONDE_PASANG_CC;
export const RONDE_MEMORI_PC = RONDE_MEMORI_CC;
export const RONDE_SORTIR_PC = RONDE_SORTIR_CC;
export const RONDE_SEMUA_PC = RONDE_SEMUA_CC;
export const RONDE_JENIS_PC = RONDE_JENIS_CC;
export const RONDE_TABEL_PC: { baris: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { baris: "faktor 12", jawab: "1,2,3,4,6,12", opsi: ["1,2,3,4,6,12", "2,4,6,8", "1,12"], pesan: "Pembagi." },
    { baris: "12÷3 potong", jawab: "4", opsi: ["4", "3", "9"], pesan: "Tanpa sisa." },
  ],
  [
    { baris: "faktor 18", jawab: "1,2,3,6,9,18", opsi: ["1,2,3,6,9,18", "1,2,4,8", "18,36"], pesan: "Pembagi." },
    { baris: "pasangan 3 pada 18", jawab: "6", opsi: ["6", "9", "5"], pesan: "3×6." },
  ],
  [
    { baris: "bukan faktor 24", jawab: "5", opsi: ["5", "8", "12"], pesan: "Sisa." },
    { baris: "arti faktor", jawab: "pembagi habis", opsi: ["pembagi habis", "kelipatan", "KPK"], pesan: "Definisi." },
  ],
];
export const RONDE_BENARSALAH_QC: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Faktor adalah bilangan yang membagi habis.", benar: true, penjelasan: "Benar." },
    { teks: "5 adalah faktor 12.", benar: false, penjelasan: "12÷5 sisa." },
    { teks: "Faktor saling berpasangan.", benar: true, penjelasan: "Hasil kali = bilangan." },
  ],
  [
    { teks: "Faktor 18 adalah 1,2,3,6,9,18.", benar: true, penjelasan: "Benar." },
    { teks: "Setiap kelipatan adalah faktor.", benar: false, penjelasan: "Kebalikan: faktor membagi." },
    { teks: "1 dan bilangan itu sendiri selalu faktor.", benar: true, penjelasan: "Selalu." },
  ],
];
export const RONDE_DETEKTIF_QC: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["12 petak", "bagi tanpa sisa", "panjang tiap bagian 4"], jawab: "3 potong", opsi: ["3 potong", "4 potong", "2 potong"], salah: "12÷4." },
  { klue: ["faktor 18", "pasangan dari 2"], jawab: "9", opsi: ["9", "6", "8"], salah: "2×9." },
  { klue: ["bukan faktor 24", "pilih satu"], jawab: "5", opsi: ["5", "8", "6"], salah: "24÷5 sisa." },
];
export const PETA_KONSEP_QC = [{
  pusat: "Faktor",
  kotak: [
    { label: "Arti", opsi: ["pembagi habis", "kelipatan", "KPK"], benar: 0 },
    { label: "Contoh 12", opsi: ["1,2,3,4,6,12", "12,24,36", "2,4,8,16"], benar: 0 },
    { label: "Pasangan", opsi: ["hasil kali = bilangan", "selalu sama", "hanya prima"], benar: 0 },
    { label: "Cara", opsi: ["bagi tanpa sisa / petak", "acak", "hanya tambah"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QC = RONDE_CERITA_CC;

/** Angka contoh Sub-Bab D–E (faktor persekutuan / FPB & faktorisasi prima). */
export const ANGKA_BUKU_DE = {
  fpb1218: 6,
  fpb612: 6,
  mawarMerah: 24,
  mawarPutih: 18,
  fpbMawar: 6,
  susu: 36,
  lolipop: 48,
  biskuit: 24,
  fpbPaket: 12,
  kpk72150: 1800,
  fpb72150: 6,
  fakt12: "2 × 2 × 3",
  fakt30: "2 × 3 × 5",
  fakt196: "2 × 2 × 7 × 7",
  fakt300: "2 × 2 × 3 × 5 × 5",
} as const;

export const faktorPersekutuan = (a: number, b: number): number[] => {
  const fb = new Set(faktor(b));
  return faktor(a).filter((x) => fb.has(x));
};

export const adalahPrima = (n: number): boolean => {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i += 1) if (n % i === 0) return false;
  return true;
};

export const faktorisasiPrima = (n: number): number[] => {
  const hasil: number[] = [];
  let x = n;
  for (let p = 2; p * p <= x; p += 1) {
    while (x % p === 0) {
      hasil.push(p);
      x = Math.floor(x / p);
    }
  }
  if (x > 1) hasil.push(x);
  return hasil;
};

export const teksFaktorisasi = (n: number): string => faktorisasiPrima(n).join(" × ");

// ---- D: Faktor Persekutuan & FPB ----
export const RONDE_PERSEKUTUAN_CD: { a: number; b: number; n: number; ya: boolean; pesan: string }[][] = [
  [
    { a: 12, b: 18, n: 6, ya: true, pesan: "6 faktor 12 dan 18." },
    { a: 12, b: 18, n: 4, ya: false, pesan: "4 bukan faktor 18." },
  ],
  [
    { a: 6, b: 12, n: 3, ya: true, pesan: "3 faktor keduanya." },
    { a: 6, b: 12, n: 5, ya: false, pesan: "5 bukan faktor 6/12." },
  ],
  [
    { a: 24, b: 18, n: 6, ya: true, pesan: "FPB mawar." },
    { a: 24, b: 18, n: 8, ya: false, pesan: "8 bukan faktor 18." },
  ],
];

export const RONDE_FPB_CD: { angka: number[]; hasil: number; pesan: string }[][] = [
  [
    { angka: [12, 18], hasil: 6, pesan: "FPB 12 dan 18 = 6." },
    { angka: [6, 12], hasil: 6, pesan: "FPB 6 dan 12 = 6." },
  ],
  [
    { angka: [24, 18], hasil: 6, pesan: "FPB mawar = 6." },
    { angka: [36, 48, 24], hasil: 12, pesan: "FPB tiga bilangan paket = 12." },
  ],
  [
    { angka: [15, 28], hasil: 1, pesan: "Tidak ada prima berpasangan → FPB 1." },
    { angka: [8, 12], hasil: 4, pesan: "FPB 8 dan 12 = 4." },
  ],
];

export const RONDE_CERITA_CD: { teks: string; jawab: string | number; opsi: (string | number)[]; pesan: string }[][] = [
  [
    { teks: "Faktor sama 12 dan 18: 1,2,3,6. FPB?", jawab: "6", opsi: ["6", "3", "12"], pesan: "Terbesar." },
    { teks: "Dalam congklak faktor 12 & 18, lubang berisi 2 biji?", jawab: "1, 2, 3, 6", opsi: ["1, 2, 3, 6", "1, 2, 4, 8", "12 dan 18 saja"], pesan: "Irisan faktor." },
  ],
  [
    { teks: "24 mawar merah, 18 putih. Vas maksimal sama rata?", jawab: "6", opsi: ["6", "8", "3"], pesan: "FPB 24 dan 18." },
    { teks: "Tiap vas dari FPB 6: merah dan putih?", jawab: "4 dan 3", opsi: ["4 dan 3", "6 dan 6", "2 dan 2"], pesan: "24÷6=4, 18÷6=3." },
  ],
  [
    { teks: "36 susu, 48 lolipop, 24 biskuit. Paket maksimal?", jawab: "12", opsi: ["12", "6", "24"], pesan: "FPB tiga bilangan." },
    { teks: "Apa nama faktor yang sama terbesar?", jawab: "FPB", opsi: ["FPB", "KPK", "kelipatan"], pesan: "Faktor Persekutuan Terbesar." },
  ],
];

export const RONDE_SORTIR_CD: { id: string; label: string; bin: "sama" | "beda" }[][] = [
  [
    { id: "a1", label: "1", bin: "sama" }, { id: "a2", label: "2", bin: "sama" }, { id: "a3", label: "4", bin: "beda" },
    { id: "a4", label: "3", bin: "sama" }, { id: "a5", label: "6", bin: "sama" }, { id: "a6", label: "9", bin: "beda" },
  ],
  [
    { id: "b1", label: "1", bin: "sama" }, { id: "b2", label: "2", bin: "sama" }, { id: "b3", label: "5", bin: "beda" },
    { id: "b4", label: "3", bin: "sama" }, { id: "b5", label: "6", bin: "sama" }, { id: "b6", label: "8", bin: "beda" },
  ],
  [
    { id: "c1", label: "1", bin: "sama" }, { id: "c2", label: "2", bin: "sama" }, { id: "c3", label: "5", bin: "beda" },
    { id: "c4", label: "3", bin: "sama" }, { id: "c5", label: "6", bin: "sama" }, { id: "c6", label: "9", bin: "beda" },
  ],
];

export const RONDE_PASANG_CD: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "FPB 12 dan 18", kanan: "6" }, { kiri: "FPB 6 dan 12", kanan: "juga 6" },
    { kiri: "faktor persekutuan 12 dan 18", kanan: "1,2,3,6" }, { kiri: "congklak 2 biji", kanan: "lubang irisan" },
  ],
  [
    { kiri: "FPB 24 dan 18", kanan: "6 vas" }, { kiri: "24÷6 dan 18÷6", kanan: "4 dan 3" },
    { kiri: "FPB 36,48,24", kanan: "12 paket" }, { kiri: "FPB 15 dan 28", kanan: "1" },
  ],
  [
    { kiri: "arti FPB", kanan: "faktor persekutuan terbesar" }, { kiri: "FPB 8 dan 12", kanan: "4" },
    { kiri: "bukan faktor persekutuan 12 dan 18", kanan: "angka 4" }, { kiri: "vas maksimal mawar", kanan: "enam vas" },
  ],
];
export const RONDE_MEMORI_CD = RONDE_PASANG_CD;

export const RONDE_KETUK_CD: { item: number[]; tanya: number[] }[] = [
  { item: [1, 2, 3, 4, 6, 9], tanya: [1, 2, 3, 6] },
  { item: [1, 2, 3, 5, 6, 8], tanya: [1, 2, 3, 6] },
  { item: [1, 2, 3, 4, 6, 12], tanya: [1, 2, 3, 6] },
];

export const RONDE_SEMUA_CD: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "faktor persekutuan 12 dan 18", item: [
    { id: "a", label: "1", cocok: true }, { id: "b", label: "2", cocok: true }, { id: "c", label: "4", cocok: false }, { id: "d", label: "6", cocok: true },
  ]},
  { label: "hasil FPB benar", item: [
    { id: "a", label: "FPB(12,18)=6", cocok: true }, { id: "b", label: "FPB(24,18)=6", cocok: true }, { id: "c", label: "FPB(15,28)=5", cocok: false }, { id: "d", label: "FPB(8,12)=4", cocok: true },
  ]},
  { label: "bisa jadi jumlah vas (FPB 24 & 18)", item: [
    { id: "a", label: "6", cocok: true }, { id: "b", label: "3", cocok: true }, { id: "c", label: "5", cocok: false }, { id: "d", label: "2", cocok: true },
  ]},
];

export const RONDE_JENIS_CD: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Apa faktor persekutuan?", jawab: "faktor yang sama dari dua bilangan atau lebih", opsi: ["faktor yang sama dari dua bilangan atau lebih", "kelipatan terkecil", "bilangan prima saja"], pesan: "Irisan faktor." },
    { tanya: "FPB artinya?", jawab: "faktor persekutuan terbesar", opsi: ["faktor persekutuan terbesar", "kelipatan persekutuan terkecil", "jumlah faktor"], pesan: "Definisi." },
  ],
  [
    { tanya: "Dalam congklak faktor, lubang 2 biji menandai?", jawab: "faktor persekutuan", opsi: ["faktor persekutuan", "kelipatan", "bilangan prima"], pesan: "Irisan." },
    { tanya: "Jika tidak ada faktor prima berpasangan, FPB?", jawab: "1", opsi: ["1", "0", "bilangan terbesar"], pesan: "Contoh 15 dan 28." },
  ],
  [
    { tanya: "FPB dipakai untuk?", jawab: "membagi rata sebanyak mungkin tanpa sisa", opsi: ["membagi rata sebanyak mungkin tanpa sisa", "mencari jadwal bertemu", "mengurutkan saja"], pesan: "Vas/paket." },
    { tanya: "FPB 36, 48, 24?", jawab: "12", opsi: ["12", "6", "24"], pesan: "Paket bingkisan." },
  ],
];

export const RONDE_URUT_CD: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [1, 6, 2, 3], dari: "kecil" },
  { angka: [12, 6, 4, 1], dari: "besar" },
  { angka: [6, 1, 3, 2], dari: "kecil" },
];

export const RONDE_PERSEKUTUAN_PD = RONDE_PERSEKUTUAN_CD;
export const RONDE_FPB_PD = RONDE_FPB_CD;
export const RONDE_PASANG_PD = RONDE_PASANG_CD;
export const RONDE_MEMORI_PD = RONDE_MEMORI_CD;
export const RONDE_SORTIR_PD = RONDE_SORTIR_CD;
export const RONDE_SEMUA_PD = RONDE_SEMUA_CD;
export const RONDE_JENIS_PD = RONDE_JENIS_CD;
export const RONDE_CERITA_PD = RONDE_CERITA_CD;

export const RONDE_TABEL_PD: { baris: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { baris: "FPB 12 & 18", jawab: "6", opsi: ["6", "3", "12"], pesan: "Terbesar irisan." },
    { baris: "faktor persekutuan 12 & 18", jawab: "1,2,3,6", opsi: ["1,2,3,6", "1,2,4,8", "12,18"], pesan: "Irisan." },
  ],
  [
    { baris: "vas dari 24 & 18", jawab: "6", opsi: ["6", "8", "9"], pesan: "FPB." },
    { baris: "isi tiap vas", jawab: "4 merah, 3 putih", opsi: ["4 merah, 3 putih", "6 dan 6", "2 dan 1"], pesan: "Bagi FPB." },
  ],
  [
    { baris: "FPB 36,48,24", jawab: "12", opsi: ["12", "6", "8"], pesan: "Tiga bilangan." },
    { baris: "arti FPB", jawab: "faktor persekutuan terbesar", opsi: ["faktor persekutuan terbesar", "kelipatan terkecil", "selisih"], pesan: "Definisi." },
  ],
];

export const RONDE_BENARSALAH_QD: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Faktor persekutuan adalah faktor yang sama.", benar: true, penjelasan: "Benar." },
    { teks: "FPB 12 dan 18 adalah 3.", benar: false, penjelasan: "FPB = 6." },
    { teks: "Congklak dapat menandai faktor persekutuan.", benar: true, penjelasan: "Lubang berisi 2 biji." },
  ],
  [
    { teks: "FPB dipakai membagi rata tanpa sisa.", benar: true, penjelasan: "Vas/paket." },
    { teks: "FPB selalu lebih besar dari KPK.", benar: false, penjelasan: "FPB ≤ bilangan; KPK ≥ bilangan." },
    { teks: "FPB 15 dan 28 adalah 1.", benar: true, penjelasan: "Tidak ada prima berpasangan." },
  ],
];

export const RONDE_DETEKTIF_QD: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["faktor 12", "faktor 18", "sama terbesar"], jawab: "6", opsi: ["6", "3", "12"], salah: "Irisan lalu max." },
  { klue: ["24 merah", "18 putih", "vas maksimal sama"], jawab: "6", opsi: ["6", "8", "4"], salah: "FPB." },
  { klue: ["36, 48, 24", "paket maksimal"], jawab: "12", opsi: ["12", "6", "24"], salah: "FPB tiga bilangan." },
];

export const PETA_KONSEP_QD = [{
  pusat: "FPB",
  kotak: [
    { label: "Arti", opsi: ["faktor persekutuan terbesar", "kelipatan terkecil", "jumlah"], benar: 0 },
    { label: "Cara", opsi: ["irisan faktor lalu terbesar", "tambah saja", "acak"], benar: 0 },
    { label: "Contoh 12 & 18", opsi: ["6", "36", "3"], benar: 0 },
    { label: "Pakai", opsi: ["bagi rata / vas / paket", "jadwal bertemu", "hanya baca"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QD = RONDE_CERITA_CD;

// ---- E: Prima, faktorisasi, KPK/FPB via prima ----
export const RONDE_PRIMA_CE: { n: number; ya: boolean; pesan: string }[][] = [
  [
    { n: 2, ya: true, pesan: "Prima terkecil." },
    { n: 1, ya: false, pesan: "1 bukan prima." },
  ],
  [
    { n: 17, ya: true, pesan: "Hanya 1 dan 17." },
    { n: 15, ya: false, pesan: "15 = 3×5." },
  ],
  [
    { n: 29, ya: true, pesan: "Prima." },
    { n: 49, ya: false, pesan: "49 = 7×7." },
  ],
];

export const RONDE_FAKTORISASI_CE: { n: number; teks: string; pesan: string }[][] = [
  [
    { n: 12, teks: "2 × 2 × 3", pesan: "Pohon faktor 12." },
    { n: 30, teks: "2 × 3 × 5", pesan: "Pohon faktor 30." },
  ],
  [
    { n: 196, teks: "2 × 2 × 7 × 7", pesan: "196 = 2²×7²." },
    { n: 300, teks: "2 × 2 × 3 × 5 × 5", pesan: "300 = 2²×3×5²." },
  ],
  [
    { n: 60, teks: "2 × 2 × 3 × 5", pesan: "60 = 2²×3×5." },
    { n: 96, teks: "2 × 2 × 2 × 2 × 2 × 3", pesan: "96 = 2⁵×3." },
  ],
];

export const RONDE_KPKFPB_CE: { a: number; b: number; jenis: "KPK" | "FPB"; hasil: number; pesan: string }[][] = [
  [
    { a: 72, b: 150, jenis: "KPK", hasil: 1800, pesan: "Ambil semua prima (pangkat max)." },
    { a: 72, b: 150, jenis: "FPB", hasil: 6, pesan: "Prima berpasangan: 2×3." },
  ],
  [
    { a: 42, b: 60, jenis: "KPK", hasil: 420, pesan: "KPK 42 & 60." },
    { a: 42, b: 60, jenis: "FPB", hasil: 6, pesan: "FPB 42 & 60." },
  ],
  [
    { a: 27, b: 81, jenis: "KPK", hasil: 81, pesan: "81 = 3⁴." },
    { a: 15, b: 28, jenis: "FPB", hasil: 1, pesan: "Tidak berpasangan." },
  ],
];

export const RONDE_JENIS_CE: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Bilangan prima adalah?", jawab: "hanya dibagi 1 dan dirinya", opsi: ["hanya dibagi 1 dan dirinya", "semua ganjil", "kelipatan 2"], pesan: "Definisi." },
    { tanya: "1 termasuk bilangan prima?", jawab: "tidak", opsi: ["tidak", "ya", "kadang"], pesan: "Buku: 1 bukan prima." },
  ],
  [
    { tanya: "Saringan Eratosthenes dipakai untuk?", jawab: "menemukan bilangan prima", opsi: ["menemukan bilangan prima", "mencari KPK saja", "mengukur sudut"], pesan: "Hapus kelipatan." },
    { tanya: "Faktorisasi prima artinya?", jawab: "tulis sebagai hasil kali bilangan prima", opsi: ["tulis sebagai hasil kali bilangan prima", "urutkan naik saja", "cari selisih"], pesan: "Pohon faktor." },
  ],
  [
    { tanya: "FPB dari faktorisasi prima diambil dari?", jawab: "prima yang berpasangan (pangkat min)", opsi: ["prima yang berpasangan (pangkat min)", "semua prima tanpa pasangan", "jumlah digit"], pesan: "Irisan prima." },
    { tanya: "KPK dari faktorisasi prima diambil dari?", jawab: "semua prima dengan pangkat terbesar", opsi: ["semua prima dengan pangkat terbesar", "hanya yang berpasangan", "selisih prima"], pesan: "Gabungan max." },
  ],
];

export const RONDE_SORTIR_CE: { id: string; label: string; bin: "ya" | "tidak" }[][] = [
  [
    { id: "a1", label: "2", bin: "ya" }, { id: "a2", label: "3", bin: "ya" }, { id: "a3", label: "4", bin: "tidak" },
    { id: "a4", label: "5", bin: "ya" }, { id: "a5", label: "9", bin: "tidak" }, { id: "a6", label: "7", bin: "ya" },
  ],
  [
    { id: "b1", label: "11", bin: "ya" }, { id: "b2", label: "13", bin: "ya" }, { id: "b3", label: "15", bin: "tidak" },
    { id: "b4", label: "17", bin: "ya" }, { id: "b5", label: "21", bin: "tidak" }, { id: "b6", label: "19", bin: "ya" },
  ],
  [
    { id: "c1", label: "23", bin: "ya" }, { id: "c2", label: "29", bin: "ya" }, { id: "c3", label: "25", bin: "tidak" },
    { id: "c4", label: "31", bin: "ya" }, { id: "c5", label: "27", bin: "tidak" }, { id: "c6", label: "37", bin: "ya" },
  ],
];

export const RONDE_PASANG_CE: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "12", kanan: "2 × 2 × 3" }, { kiri: "30", kanan: "2 × 3 × 5" },
    { kiri: "KPK 72 & 150", kanan: "1.800" }, { kiri: "FPB 72 & 150", kanan: "6" },
  ],
  [
    { kiri: "196", kanan: "2 × 2 × 7 × 7" }, { kiri: "300", kanan: "2 × 2 × 3 × 5 × 5" },
    { kiri: "prima?", kanan: "2,3,5,7,…" }, { kiri: "bukan prima", kanan: "1" },
  ],
  [
    { kiri: "cara KPK prima", kanan: "pangkat terbesar" }, { kiri: "cara FPB prima", kanan: "pangkat terkecil / pasangan" },
    { kiri: "saringan", kanan: "Eratosthenes" }, { kiri: "pohon faktor", kanan: "faktorisasi prima" },
  ],
];
export const RONDE_MEMORI_CE = RONDE_PASANG_CE;

export const RONDE_KETUK_CE: { item: number[]; tanya: number[] }[] = [
  { item: [1, 2, 3, 4, 5, 6], tanya: [2, 3, 5] },
  { item: [11, 12, 13, 14, 15, 17], tanya: [11, 13, 17] },
  { item: [6, 1800, 1, 12, 30], tanya: [6, 1800] },
];

export const RONDE_SEMUA_CE: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "bilangan prima", item: [
    { id: "a", label: "2", cocok: true }, { id: "b", label: "9", cocok: false }, { id: "c", label: "11", cocok: true }, { id: "d", label: "17", cocok: true },
  ]},
  { label: "faktorisasi benar", item: [
    { id: "a", label: "12=2×2×3", cocok: true }, { id: "b", label: "30=2×3×5", cocok: true }, { id: "c", label: "15=3×3×3", cocok: false }, { id: "d", label: "196=2×2×7×7", cocok: true },
  ]},
  { label: "pernyataan KPK/FPB benar", item: [
    { id: "a", label: "KPK(72,150)=1800", cocok: true }, { id: "b", label: "FPB(72,150)=6", cocok: true }, { id: "c", label: "FPB(15,28)=5", cocok: false }, { id: "d", label: "1 bukan prima", cocok: true },
  ]},
];

export const RONDE_CERITA_CE: { teks: string; jawab: string | number; opsi: (string | number)[]; pesan: string }[][] = [
  [
    { teks: "Faktorisasi prima 12?", jawab: "2 × 2 × 3", opsi: ["2 × 2 × 3", "2 × 6", "3 × 4"], pesan: "Pohon faktor." },
    { teks: "KPK 72 dan 150 via prima?", jawab: "1.800", opsi: ["1.800", "6", "222"], pesan: "Pangkat max." },
  ],
  [
    { teks: "FPB 72 dan 150 via prima?", jawab: "6", opsi: ["6", "1.800", "2"], pesan: "2×3." },
    { teks: "Dalam saringan, setelah ambil 2 kita hapus?", jawab: "kelipatan 2 berikutnya", opsi: ["kelipatan 2 berikutnya", "semua ganjil", "hanya 1"], pesan: "Eratosthenes." },
  ],
  [
    { teks: "Mengapa FPB 15 dan 28 = 1?", jawab: "tidak ada prima berpasangan", opsi: ["tidak ada prima berpasangan", "karena keduanya genap", "karena 15<28"], pesan: "3×5 vs 2×2×7." },
    { teks: "Pembagian berulang: KPK = ?", jawab: "hasil kali semua pembagi prima", opsi: ["hasil kali semua pembagi prima", "hanya pembagi pertama", "selisih baris"], pesan: "Cara buku." },
  ],
];

export const RONDE_URUT_CE: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [2, 11, 5, 3, 7], dari: "kecil" },
  { angka: [1800, 6, 12, 30], dari: "besar" },
  { angka: [2, 17, 13, 5], dari: "kecil" },
];

export const RONDE_PRIMA_PE = RONDE_PRIMA_CE;
export const RONDE_FAKTORISASI_PE = RONDE_FAKTORISASI_CE;
export const RONDE_KPKFPB_PE = RONDE_KPKFPB_CE;
export const RONDE_PASANG_PE = RONDE_PASANG_CE;
export const RONDE_MEMORI_PE = RONDE_MEMORI_CE;
export const RONDE_SORTIR_PE = RONDE_SORTIR_CE;
export const RONDE_SEMUA_PE = RONDE_SEMUA_CE;
export const RONDE_JENIS_PE = RONDE_JENIS_CE;
export const RONDE_CERITA_PE = RONDE_CERITA_CE;

export const RONDE_TABEL_PE: { baris: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { baris: "12 faktorisasi", jawab: "2 × 2 × 3", opsi: ["2 × 2 × 3", "2 × 6", "4 × 3"], pesan: "Prima." },
    { baris: "KPK 72 & 150", jawab: "1.800", opsi: ["1.800", "6", "222"], pesan: "Max pangkat." },
  ],
  [
    { baris: "FPB 72 & 150", jawab: "6", opsi: ["6", "1.800", "12"], pesan: "Min pangkat." },
    { baris: "196 faktorisasi", jawab: "2 × 2 × 7 × 7", opsi: ["2 × 2 × 7 × 7", "14 × 14", "2 × 98"], pesan: "Pohon." },
  ],
  [
    { baris: "1 prima?", jawab: "tidak", opsi: ["tidak", "ya", "kadang"], pesan: "Bukan prima." },
    { baris: "arti saringan", jawab: "cari bilangan prima", opsi: ["cari bilangan prima", "cari KPK saja", "ukur panjang"], pesan: "Eratosthenes." },
  ],
];

export const RONDE_BENARSALAH_QE: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Bilangan prima hanya dibagi 1 dan dirinya.", benar: true, penjelasan: "Benar." },
    { teks: "1 adalah bilangan prima.", benar: false, penjelasan: "Bukan." },
    { teks: "Faktorisasi prima memakai pohon faktor.", benar: true, penjelasan: "Benar." },
  ],
  [
    { teks: "KPK 72 dan 150 adalah 1.800.", benar: true, penjelasan: "Benar." },
    { teks: "FPB diambil dari semua prima tanpa pasangan.", benar: false, penjelasan: "Dari yang berpasangan / pangkat min." },
    { teks: "Pembagian berulang adalah cara lain mencari KPK/FPB.", benar: true, penjelasan: "Ada di buku." },
  ],
];

export const RONDE_DETEKTIF_QE: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["pohon faktor", "12", "hanya prima"], jawab: "2 × 2 × 3", opsi: ["2 × 2 × 3", "3 × 4", "2 × 6"], salah: "Urai sampai prima." },
  { klue: ["72 = 2³×3²", "150 = 2×3×5²", "cari FPB"], jawab: "6", opsi: ["6", "1.800", "2"], salah: "2¹×3¹." },
  { klue: ["saringan", "hapus kelipatan", "sisa adalah"], jawab: "bilangan prima", opsi: ["bilangan prima", "kelipatan saja", "FPB"], salah: "Eratosthenes." },
];

export const PETA_KONSEP_QE = [{
  pusat: "Prima & KPK/FPB",
  kotak: [
    { label: "Prima", opsi: ["1 dan dirinya saja", "semua ganjil", "kelipatan 10"], benar: 0 },
    { label: "Faktorisasi", opsi: ["hasil kali prima", "urut saja", "tambah"], benar: 0 },
    { label: "FPB prima", opsi: ["pangkat terkecil / pasangan", "semua prima", "jumlah"], benar: 0 },
    { label: "KPK prima", opsi: ["pangkat terbesar", "hanya pasangan", "selisih"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QE = RONDE_CERITA_CE;
