/**
 * Data murni Matematika Kelas 5 Bab 9 (Bilangan sampai 1.000.000): Sub-Bab A–C.
 * Sumber: Buku Siswa Matematika Kelas V Kemendikbudristek Bab 9 hlm. 273–291.
 * Tanpa React/jaringan. Uji: scripts/uji-statis-k5b9.mjs.
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
  lemari: 979875,
  gianyar: 963000,
  ratusRibuan: 100000,
  sejuta: 1000000,
  lukas: 432543,
  komang: 342231,
  nisa: 232231,
} as const;

// ========== A ==========
export const RONDE_HITUNG_CA: { label: string; hasil: number; pesan: string }[][] = [
  [
    { label: "nilai 9 di ratus ribuan (979.875)", hasil: 900000, pesan: "9 × 100.000 = 900.000." },
    { label: "nilai tempat ratus ribuan", hasil: 100000, pesan: "Ratus ribuan = 100.000." },
  ],
  [
    { label: "berapa kolom tempat utama (s.d. ratus rb)", hasil: 6, pesan: "Satuan…ratus ribuan = 6 kolom." },
    { label: "1.000.000 (satu juta)", hasil: 1000000, pesan: "Batas bab." },
  ],
  [
    { label: "nilai 7 di puluh ribuan (979.875)", hasil: 70000, pesan: "7 × 10.000 = 70.000." },
    { label: "penduduk Gianyar contoh", hasil: 963000, pesan: "963.000 jiwa." },
  ],
];
export const RONDE_ARTI_CA: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "979.875 dibaca?", jawab: "sembilan ratus tujuh puluh sembilan ribu delapan ratus tujuh puluh lima", opsi: ["sembilan ratus tujuh puluh sembilan ribu delapan ratus tujuh puluh lima", "sembilan juta tujuh ratus", "sembilan ratus saja"], pesan: "Number-Name Mapping." },
    { tanya: "Place Value Chart Protocol menekankan?", jawab: "isi setiap digit ke kolom nilai tempatnya", opsi: ["isi setiap digit ke kolom nilai tempatnya", "abaikan nol", "banding dari satuan saja"], pesan: "Metode luar." },
  ],
  [
    { tanya: "Nilai digit = ?", jawab: "digit dikalikan nilai tempatnya", opsi: ["digit dikalikan nilai tempatnya", "jumlah semua digit saja", "hapus titik ribuan"], pesan: "Digit-Place Value Link." },
    { tanya: "Titik pada 979.875 berfungsi?", jawab: "pemisah ribuan agar mudah dibaca", opsi: ["pemisah ribuan agar mudah dibaca", "tanda desimal wajib", "menghapus nilai"], pesan: "Konvensi Indonesia." },
  ],
  [
    { tanya: "1.000.000 dibaca?", jawab: "satu juta", opsi: ["satu juta", "seratus ribu", "sepuluh juta"], pesan: "Batas." },
    { tanya: "Tempat langsung di kiri ribuan (enam digit)?", jawab: "puluh ribuan lalu ratus ribuan", opsi: ["puluh ribuan lalu ratus ribuan", "hanya satuan", "hanya jutaan tanpa nol"], pesan: "Urutan tempat." },
  ],
];
export const RONDE_SORTIR_CA: { id: string; label: string; bin: "ya" | "tidak" }[][] = [
  [
    { id: "a1", label: "baca dari kiri", bin: "ya" }, { id: "a2", label: "lupa nol OK", bin: "tidak" }, { id: "a3", label: "6 kolom tempat", bin: "ya" },
    { id: "a4", label: "9 di ratus rb = 9", bin: "tidak" }, { id: "a5", label: "Chart Protocol", bin: "ya" }, { id: "a6", label: "titik = desimal wajib", bin: "tidak" },
  ],
  [
    { id: "b1", label: "Number-Name Mapping", bin: "ya" }, { id: "b2", label: "tertukar puluh/ratus rb OK", bin: "tidak" }, { id: "b3", label: "digit × tempat", bin: "ya" },
    { id: "b4", label: "abaikan tabel tempat", bin: "tidak" }, { id: "b5", label: "cek baca ulang", bin: "ya" }, { id: "b6", label: "1.000.000 = seratus", bin: "tidak" },
  ],
  [
    { id: "c1", label: "900.000 dari 9 ratus rb", bin: "ya" }, { id: "c2", label: "Gianyar 963 tanpa ribuan", bin: "tidak" }, { id: "c3", label: "Place Value Link", bin: "ya" },
    { id: "c4", label: "tulis acak digit", bin: "tidak" }, { id: "c5", label: "lemari 979.875", bin: "ya" }, { id: "c6", label: "satuan di kiri sekali", bin: "tidak" },
  ],
];
export const RONDE_PASANG_CA: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "ratus ribuan", kanan: "100.000" }, { kiri: "puluh ribuan", kanan: "10.000" },
    { kiri: "ribuan", kanan: "1.000" }, { kiri: "1.000.000", kanan: "satu juta" },
  ],
  [
    { kiri: "979.875", kanan: "lemari Jepara" }, { kiri: "963.000", kanan: "Gianyar" },
    { kiri: "9 di ratus rb", kanan: "900.000" }, { kiri: "Chart Protocol", kanan: "isi kolom tempat" },
  ],
  [
    { kiri: "Number-Name", kanan: "baca nama Indonesia" }, { kiri: "Digit-Place Link", kanan: "digit × tempat" },
    { kiri: "titik ribuan", kanan: "pemisah baca" }, { kiri: "nol penyangga", kanan: "jaga nilai tempat" },
  ],
];
export const RONDE_MEMORI_CA = RONDE_PASANG_CA;
export const RONDE_KETUK_CA: { item: number[]; tanya: number[] }[] = [
  { item: [1, 10, 100, 1000, 10000, 100000], tanya: [100000, 1000] },
  { item: [6, 7, 9, 100000, 900000, 1000000], tanya: [6, 900000, 1000000] },
  { item: [5, 70, 800, 9000, 70000, 900000], tanya: [5, 900000] },
];
export const RONDE_SEMUA_CA: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "ciri baca-tulis benar", item: [
    { id: "a", label: "baca dari kiri", cocok: true }, { id: "b", label: "isi tabel tempat", cocok: true }, { id: "c", label: "lupa nol boleh", cocok: false }, { id: "d", label: "cek baca ulang", cocok: true },
  ]},
  { label: "nilai tempat benar", item: [
    { id: "a", label: "ratus ribuan 100.000", cocok: true }, { id: "b", label: "digit × tempat", cocok: true }, { id: "c", label: "9 di ratus rb = 9", cocok: false }, { id: "d", label: "puluh ribuan 10.000", cocok: true },
  ]},
  { label: "contoh buku A", item: [
    { id: "a", label: "lemari 979.875", cocok: true }, { id: "b", label: "Gianyar 963.000", cocok: true }, { id: "c", label: "batas 100 saja", cocok: false }, { id: "d", label: "sampai 1.000.000", cocok: true },
  ]},
];
export const RONDE_CERITA_CA: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "Nilai 9 di ratus ribuan pada 979.875?", jawab: "900000", opsi: ["900000", "9", "900"], pesan: "9×100.000." },
    { teks: "1.000.000 dibaca?", jawab: "satu juta", opsi: ["satu juta", "seratus ribu", "sepuluh"], pesan: "Batas." },
  ],
  [
    { teks: "Berapa kolom tempat s.d. ratus ribuan?", jawab: "6", opsi: ["6", "3", "10"], pesan: "Chart." },
    { teks: "Penduduk Gianyar contoh buku?", jawab: "963000", opsi: ["963000", "979875", "100"], pesan: "Sensus." },
  ],
  [
    { teks: "METODE LUAR Place Value Chart Protocol?", jawab: "memetakan digit ke kolom tempat", opsi: ["memetakan digit ke kolom tempat", "membanding dari satuan saja", "menghapus nol"], pesan: "Metode." },
    { teks: "Fungsi titik pada 720.736?", jawab: "pemisah ribuan", opsi: ["pemisah ribuan", "tanda kali", "hapus digit"], pesan: "Konvensi." },
  ],
];
export const RONDE_URUT_CA: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [1, 100000, 1000, 10], dari: "kecil" },
  { angka: [1000000, 100, 100000, 10000], dari: "besar" },
  { angka: [5, 70, 800, 900000], dari: "kecil" },
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
    { baris: "ratus ribuan", jawab: "100000", opsi: ["100000", "10", "100"], pesan: "Tempat." },
    { baris: "9 × 100000", jawab: "900000", opsi: ["900000", "9", "900"], pesan: "Nilai." },
  ],
  [
    { baris: "1.000.000", jawab: "satu juta", opsi: ["satu juta", "seratus", "sepuluh ribu"], pesan: "Baca." },
    { baris: "kolom utama", jawab: "6", opsi: ["6", "2", "12"], pesan: "Chart." },
  ],
  [
    { baris: "lemari", jawab: "979875", opsi: ["979875", "963000", "100"], pesan: "Contoh." },
    { baris: "puluh ribuan", jawab: "10000", opsi: ["10000", "100", "1"], pesan: "Tempat." },
  ],
];
export const RONDE_BENARSALAH_QA: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Nilai digit = digit × nilai tempat.", benar: true, penjelasan: "Link." },
    { teks: "Boleh lupa nol di tengah bilangan.", benar: false, penjelasan: "Nol penting." },
    { teks: "1.000.000 dibaca satu juta.", benar: true, penjelasan: "Benar." },
  ],
  [
    { teks: "Place Value Chart mengisi digit per kolom.", benar: true, penjelasan: "Protocol." },
    { teks: "9 di ratus ribuan bernilai 9.", benar: false, penjelasan: "900.000." },
    { teks: "Titik ribuan membantu membaca.", benar: true, penjelasan: "Konvensi." },
  ],
];
export const RONDE_DETEKTIF_QA: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["lemari Jepara", "harga", "angka"], jawab: "979875", opsi: ["979875", "100", "963000"], salah: "Buku." },
  { klue: ["digit 9", "ratus ribuan", "nilai"], jawab: "900000", opsi: ["900000", "9", "90"], salah: "Nilai." },
  { klue: ["satu", "juta", "angka"], jawab: "1000000", opsi: ["1000000", "100000", "1000"], salah: "Sejuta." },
];
export const PETA_KONSEP_QA = [{
  pusat: "Nilai Tempat s.d. 1.000.000",
  kotak: [
    { label: "Baca", opsi: ["dari kiri / nama Indonesia", "dari satuan saja", "abaikan titik"], benar: 0 },
    { label: "Tabel", opsi: ["isi digit per kolom", "hapus kolom", "acak digit"], benar: 0 },
    { label: "Nilai digit", opsi: ["digit × tempat", "jumlah digit saja", "warna digit"], benar: 0 },
    { label: "Metode luar", opsi: ["Chart / Number-Name / Link", "Inequality segitiga", "Paper Fold"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QA = RONDE_CERITA_CA;

// ========== B ==========
export const RONDE_HITUNG_CB: { derajat: number; hasil: number; pesan: string }[][] = [
  [
    { derajat: 432543, hasil: 432543, pesan: "Harga Lukas terbesar." },
    { derajat: 232231, hasil: 232231, pesan: "Harga Nisa terkecil." },
  ],
  [
    { derajat: 4, hasil: 4, pesan: "Ratus ribuan Lukas = 4 (terbesar)." },
    { derajat: 2, hasil: 2, pesan: "Ratus ribuan Nisa = 2." },
  ],
  [
    { derajat: 599198, hasil: 599198, pesan: "599.198 > 599.047." },
    { derajat: 1, hasil: 1, pesan: "Beda di ratusan: 1 vs 0." },
  ],
];
export const RONDE_RUMUS_CB: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Leftmost Place Priority artinya?", jawab: "bandingkan nilai tempat paling kiri lebih dulu", opsi: ["bandingkan nilai tempat paling kiri lebih dulu", "mulai dari satuan", "abaikan ratus ribuan"], pesan: "Metode luar." },
    { tanya: "Siapa harga sepatu termahal?", jawab: "Lukas 432.543", opsi: ["Lukas 432.543", "Nisa 232.231", "Komang tanpa angka"], pesan: "Eksplorasi 9.2A." },
  ],
  [
    { tanya: "599.198 dibanding 599.047?", jawab: "599.198 lebih besar", opsi: ["599.198 lebih besar", "599.047 lebih besar", "sama"], pesan: "Digit-by-Digit." },
    { tanya: "Ordering Protocol dipakai untuk?", jawab: "menyusun naik atau turun dengan banding berulang", opsi: ["menyusun naik atau turun dengan banding berulang", "menghapus digit kiri", "mengukur sudut"], pesan: "Urut." },
  ],
  [
    { tanya: "Sepatu termurah?", jawab: "Nisa 232.231", opsi: ["Nisa 232.231", "Lukas 432.543", "Komang 999.999"], pesan: "Buku." },
    { tanya: "Jika ratus ribuan sama, langkah berikutnya?", jawab: "bandingkan puluh ribuan", opsi: ["bandingkan puluh ribuan", "langsung satuan", "berhenti"], pesan: "Geser kanan." },
  ],
];
export const RONDE_SORTIR_CB: { id: string; label: string; bin: "lancip" | "tumpul" }[][] = [
  [
    { id: "a1", label: "mulai dari kiri", bin: "lancip" }, { id: "a2", label: "mulai dari satuan", bin: "tumpul" }, { id: "a3", label: "Lukas > Komang", bin: "lancip" },
    { id: "a4", label: "Nisa > Lukas", bin: "tumpul" }, { id: "a5", label: "Digit-by-Digit", bin: "lancip" }, { id: "a6", label: "abaikan ratus rb", bin: "tumpul" },
  ],
  [
    { id: "b1", label: "Ordering Protocol", bin: "lancip" }, { id: "b2", label: "urut tanpa banding", bin: "tumpul" }, { id: "b3", label: "599.198 > 599.047", bin: "lancip" },
    { id: "b4", label: "789.867 > 789.876", bin: "tumpul" }, { id: "b5", label: "simbol > < =", bin: "lancip" }, { id: "b6", label: "jumlah digit = nilai", bin: "tumpul" },
  ],
  [
    { id: "c1", label: "Priority kiri", bin: "lancip" }, { id: "c2", label: "banding acak tempat", bin: "tumpul" }, { id: "c3", label: "urut naik kecil→besar", bin: "lancip" },
    { id: "c4", label: "sama digit = lebih besar", bin: "tumpul" }, { id: "c5", label: "geser kanan jika sama", bin: "lancip" }, { id: "c6", label: "Nisa termahal", bin: "tumpul" },
  ],
];
export const RONDE_PASANG_CB: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "Lukas", kanan: "432.543" }, { kiri: "Komang", kanan: "342.231" },
    { kiri: "Nisa", kanan: "232.231" }, { kiri: "Priority", kanan: "mulai kiri" },
  ],
  [
    { kiri: "599.198", kanan: "> 599.047" }, { kiri: "urut naik", kanan: "kecil → besar" },
    { kiri: "urut turun", kanan: "besar → kecil" }, { kiri: "Digit-by-Digit", kanan: "satu tempat per langkah" },
  ],
  [
    { kiri: "termahal", kanan: "Lukas" }, { kiri: "termurah", kanan: "Nisa" },
    { kiri: "Ordering", kanan: "banding berulang" }, { kiri: "simbol sama", kanan: "=" },
  ],
];
export const RONDE_MEMORI_CB = RONDE_PASANG_CB;
export const RONDE_KETUK_CB: { item: number[]; tanya: number[] }[] = [
  { item: [232231, 342231, 432543, 599047, 599198, 100], tanya: [432543, 232231] },
  { item: [2, 3, 4, 599198, 789876, 789867], tanya: [4, 599198] },
  { item: [232231, 342231, 432543, 676785, 786897, 789876], tanya: [232231, 432543, 789876] },
];
export const RONDE_SEMUA_CB: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "langkah banding benar", item: [
    { id: "a", label: "mulai kiri", cocok: true }, { id: "b", label: "geser jika sama", cocok: true }, { id: "c", label: "mulai satuan", cocok: false }, { id: "d", label: "pakai > < =", cocok: true },
  ]},
  { label: "fakta sepatu buku", item: [
    { id: "a", label: "Lukas termahal", cocok: true }, { id: "b", label: "Nisa termurah", cocok: true }, { id: "c", label: "Komang > Lukas", cocok: false }, { id: "d", label: "ratus rb menentukan awal", cocok: true },
  ]},
  { label: "urut benar", item: [
    { id: "a", label: "Ordering Protocol", cocok: true }, { id: "b", label: "naik = kecil ke besar", cocok: true }, { id: "c", label: "789.867 > 789.876", cocok: false }, { id: "d", label: "turun = besar ke kecil", cocok: true },
  ]},
];
export const RONDE_CERITA_CB: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "Harga sepatu termahal?", jawab: "432543", opsi: ["432543", "232231", "100"], pesan: "Lukas." },
    { teks: "599.198 ? 599.047", jawab: "lebih besar", opsi: ["lebih besar", "lebih kecil", "sama"], pesan: "Ratusan." },
  ],
  [
    { teks: "Mulai banding dari mana?", jawab: "nilai tempat paling kiri", opsi: ["nilai tempat paling kiri", "satuan", "titik saja"], pesan: "Priority." },
    { teks: "Termurah di tiga sepatu?", jawab: "232231", opsi: ["232231", "432543", "999999"], pesan: "Nisa." },
  ],
  [
    { teks: "789.876 dibanding 789.867?", jawab: "789.876 lebih besar", opsi: ["789.876 lebih besar", "789.867 lebih besar", "sama"], pesan: "Puluhan." },
    { teks: "METODE LUAR Ordering Protocol?", jawab: "menyusun dengan banding berulang", opsi: ["menyusun dengan banding berulang", "menghapus digit", "mengukur luas"], pesan: "Urut." },
  ],
];
export const RONDE_URUT_CB: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [232231, 432543, 342231], dari: "kecil" },
  { angka: [599198, 599047, 432543], dari: "besar" },
  { angka: [789867, 789876, 676785], dari: "kecil" },
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
    { baris: "Lukas", jawab: "432543", opsi: ["432543", "232231", "100"], pesan: "Harga." },
    { baris: "Nisa", jawab: "232231", opsi: ["232231", "432543", "999"], pesan: "Harga." },
  ],
  [
    { baris: "599.198 vs 047", jawab: "198 lebih besar", opsi: ["198 lebih besar", "047 lebih besar", "sama"], pesan: "Banding." },
    { baris: "mulai banding", jawab: "kiri", opsi: ["kiri", "satuan", "acak"], pesan: "Priority." },
  ],
  [
    { baris: "urut naik", jawab: "kecil ke besar", opsi: ["kecil ke besar", "besar ke kecil", "acak"], pesan: "Ordering." },
    { baris: "ratus rb Lukas", jawab: "4", opsi: ["4", "2", "9"], pesan: "Digit." },
  ],
];
export const RONDE_BENARSALAH_QB: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Bandingkan dari nilai tempat paling kiri.", benar: true, penjelasan: "Priority." },
    { teks: "Nisa punya sepatu termahal.", benar: false, penjelasan: "Nisa termurah." },
    { teks: "599.198 lebih besar dari 599.047.", benar: true, penjelasan: "Benar." },
  ],
  [
    { teks: "Jika digit kiri sama, geser ke kanan.", benar: true, penjelasan: "Digit-by-Digit." },
    { teks: "Ordering Protocol mengabaikan perbandingan.", benar: false, penjelasan: "Justru banding berulang." },
    { teks: "Lukas 432.543 termahal di contoh sepatu.", benar: true, penjelasan: "Buku." },
  ],
];
export const RONDE_DETEKTIF_QB: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["sepatu", "termahal", "harga"], jawab: "432543", opsi: ["432543", "232231", "100"], salah: "Lukas." },
  { klue: ["mulai", "banding", "tempat"], jawab: "paling kiri", opsi: ["paling kiri", "satuan", "titik saja"], salah: "Priority." },
  { klue: ["599198", "599047", "hasil"], jawab: "198 lebih besar", opsi: ["198 lebih besar", "047 lebih besar", "sama"], salah: "Banding." },
];
export const PETA_KONSEP_QB = [{
  pusat: "Banding & Urut",
  kotak: [
    { label: "Priority", opsi: ["mulai kiri", "mulai satuan", "acak"], benar: 0 },
    { label: "Jika sama", opsi: ["geser kanan", "berhenti", "hapus digit"], benar: 0 },
    { label: "Urut naik", opsi: ["kecil → besar", "besar → kecil", "acak"], benar: 0 },
    { label: "Metode luar", opsi: ["Priority / Digit-by-Digit / Ordering", "Tally Mark", "Paper Fold"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QB = RONDE_CERITA_CB;

// ========== C ==========
export const RONDE_HITUNG_CC: { derajat: number; hasil: number; pesan: string }[][] = [
  [
    { derajat: 327100, hasil: 327100, pesan: "3 rr + 2 pr + 7 r + 1 ratus = 327.100." },
    { derajat: 203305, hasil: 203305, pesan: "2 rr + 3 rb + 3 puluh + 5 = 203.305." },
  ],
  [
    { derajat: 505401, hasil: 505401, pesan: "5 rr + 5 rb + 4 ratus + 1 = 505.401." },
    { derajat: 857259, hasil: 857259, pesan: "Hasil komposisi latihan buku." },
  ],
  [
    { derajat: 100000, hasil: 10, pesan: "1 ratus ribuan = 10 puluh ribuan (fleksibel)." },
    { derajat: 599198, hasil: 599198, pesan: "Target dekomposisi contoh." },
  ],
];
export const RONDE_ARTI_CC: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Komposisi bilangan artinya?", jawab: "menyusun bilangan dari nilai-nilai tempat", opsi: ["menyusun bilangan dari nilai-nilai tempat", "menghapus digit kiri", "membanding dari satuan"], pesan: "Expanded Form Composition." },
    { tanya: "Dekomposisi bilangan artinya?", jawab: "menguraikan bilangan menjadi jumlah nilai tempat", opsi: ["menguraikan bilangan menjadi jumlah nilai tempat", "mengurutkan naik saja", "mengukur sudut"], pesan: "Flexible Decomposition." },
  ],
  [
    { tanya: "Part-Whole Place Model menekankan?", jawab: "bagian nilai tempat membentuk bilangan utuh", opsi: ["bagian nilai tempat membentuk bilangan utuh", "abaikan nol", "hapus ratus ribuan"], pesan: "Metode luar." },
    { tanya: "Mengapa nol penting pada 203.305?", jawab: "menjaga tempat agar nilai tidak bergeser", opsi: ["menjaga tempat agar nilai tidak bergeser", "hanya hiasan", "menghapus puluhan"], pesan: "Nol." },
  ],
  [
    { tanya: "3 rr + 2 pr + 7 rb + 1 ratus = ?", jawab: "327100", opsi: ["327100", "3271", "203305"], pesan: "Komposisi." },
    { tanya: "Komposisi dan dekomposisi bersifat?", jawab: "saling balik / saling cek", opsi: ["saling balik / saling cek", "tidak berhubungan", "hanya untuk sudut"], pesan: "Validasi." },
  ],
];
export const RONDE_SORTIR_CC: { id: string; label: string; bin: "ya" | "tidak" }[][] = [
  [
    { id: "a1", label: "komposisi = susun", bin: "ya" }, { id: "a2", label: "hapus nol tengah OK", bin: "tidak" }, { id: "a3", label: "dekomposisi = uraikan", bin: "ya" },
    { id: "a4", label: "203305 tanpa nol = sama", bin: "tidak" }, { id: "a5", label: "Expanded Form", bin: "ya" }, { id: "a6", label: "bagian tanpa jumlah", bin: "tidak" },
  ],
  [
    { id: "b1", label: "Flexible Decomposition", bin: "ya" }, { id: "b2", label: "total boleh beda", bin: "tidak" }, { id: "b3", label: "Part-Whole", bin: "ya" },
    { id: "b4", label: "1 rr ≠ 10 pr", bin: "tidak" }, { id: "b5", label: "cek balik susun↔urai", bin: "ya" }, { id: "b6", label: "komposisi = urut naik saja", bin: "tidak" },
  ],
  [
    { id: "c1", label: "327100 contoh susun", bin: "ya" }, { id: "c2", label: "abaikan tempat kosong", bin: "tidak" }, { id: "c3", label: "505401 latihan", bin: "ya" },
    { id: "c4", label: "urai tanpa jumlah bagian", bin: "tidak" }, { id: "c5", label: "banyak cara asal total sama", bin: "ya" }, { id: "c6", label: "dekomposisi hapus digit", bin: "tidak" },
  ],
];
export const RONDE_PASANG_CC: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "komposisi", kanan: "susun bagian" }, { kiri: "dekomposisi", kanan: "uraikan bagian" },
    { kiri: "327.100", kanan: "3rr+2pr+7rb+1ratus" }, { kiri: "203.305", kanan: "jaga nol" },
  ],
  [
    { kiri: "Expanded Form", kanan: "Composition" }, { kiri: "Flexible", kanan: "banyak cara" },
    { kiri: "Part-Whole", kanan: "bagian→utuh" }, { kiri: "1 ratus rb", kanan: "10 puluh rb" },
  ],
  [
    { kiri: "505.401", kanan: "latihan susun" }, { kiri: "857.259", kanan: "latihan susun" },
    { kiri: "balikan", kanan: "susun↔urai" }, { kiri: "599.198", kanan: "contoh urai" },
  ],
];
export const RONDE_MEMORI_CC = RONDE_PASANG_CC;
export const RONDE_KETUK_CC: { item: number[]; tanya: number[] }[] = [
  { item: [10, 100000, 203305, 327100, 505401, 857259], tanya: [327100, 203305] },
  { item: [1, 10, 1000, 100000, 505401, 599198], tanya: [10, 505401] },
  { item: [203305, 327100, 505401, 599198, 857259, 1000000], tanya: [203305, 857259, 1000000] },
];
export const RONDE_SEMUA_CC: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "ciri komposisi benar", item: [
    { id: "a", label: "jumlahkan nilai tempat", cocok: true }, { id: "b", label: "jaga nol", cocok: true }, { id: "c", label: "hapus tempat kosong", cocok: false }, { id: "d", label: "cek baca hasil", cocok: true },
  ]},
  { label: "ciri dekomposisi benar", item: [
    { id: "a", label: "uraikan ke tempat", cocok: true }, { id: "b", label: "total tetap sama", cocok: true }, { id: "c", label: "boleh total berubah", cocok: false }, { id: "d", label: "fleksibel asal sah", cocok: true },
  ]},
  { label: "contoh buku C", item: [
    { id: "a", label: "327.100", cocok: true }, { id: "b", label: "203.305", cocok: true }, { id: "c", label: "hanya sudut Bab 6", cocok: false }, { id: "d", label: "cara 1–4 uraian", cocok: true },
  ]},
];
export const RONDE_CERITA_CC: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "3 rr + 2 pr + 7 rb + 1 ratus = ?", jawab: "327100", opsi: ["327100", "3271", "203305"], pesan: "Komposisi." },
    { teks: "2 rr + 3 rb + 3 puluh + 5 = ?", jawab: "203305", opsi: ["203305", "2335", "327100"], pesan: "Nol." },
  ],
  [
    { teks: "Dekomposisi artinya?", jawab: "menguraikan ke nilai tempat", opsi: ["menguraikan ke nilai tempat", "mengurut naik saja", "menghapus digit"], pesan: "Urai." },
    { teks: "1 ratus ribuan setara berapa puluh ribuan?", jawab: "10", opsi: ["10", "100", "1"], pesan: "Fleksibel." },
  ],
  [
    { teks: "METODE LUAR Part-Whole Place Model?", jawab: "bagian tempat membentuk bilangan utuh", opsi: ["bagian tempat membentuk bilangan utuh", "banding dari satuan saja", "abaikan nol"], pesan: "Metode." },
    { teks: "Setelah menyusun, langkah cek terbaik?", jawab: "uraikan lagi ke bilangan awal", opsi: ["uraikan lagi ke bilangan awal", "hapus hasil", "ganti ke sudut"], pesan: "Balikan." },
  ],
];
export const RONDE_URUT_CC: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [203305, 505401, 327100], dari: "kecil" },
  { angka: [857259, 327100, 599198], dari: "besar" },
  { angka: [10, 100000, 1], dari: "kecil" },
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
    { baris: "3+2+7+1 tempat", jawab: "327100", opsi: ["327100", "3271", "100"], pesan: "Susun." },
    { baris: "203305 kunci", jawab: "jaga nol", opsi: ["jaga nol", "hapus nol", "acak"], pesan: "Nol." },
  ],
  [
    { baris: "komposisi", jawab: "susun", opsi: ["susun", "hapus", "urut saja"], pesan: "Arti." },
    { baris: "dekomposisi", jawab: "uraikan", opsi: ["uraikan", "warnai", "ukur sudut"], pesan: "Arti." },
  ],
  [
    { baris: "1 rr = ? pr", jawab: "10", opsi: ["10", "100", "1000"], pesan: "Fleksibel." },
    { baris: "cek balik", jawab: "susun↔urai", opsi: ["susun↔urai", "hapus hasil", "abaikan"], pesan: "Validasi." },
  ],
];
export const RONDE_BENARSALAH_QC: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Komposisi menyusun bilangan dari nilai tempat.", benar: true, penjelasan: "Benar." },
    { teks: "Nol di tengah boleh dihapus tanpa mengubah nilai.", benar: false, penjelasan: "Nilai bergeser." },
    { teks: "Dekomposisi menguraikan bilangan ke bagian tempat.", benar: true, penjelasan: "Benar." },
  ],
  [
    { teks: "Satu bilangan boleh diuraikan dengan beberapa cara yang jumlahnya sama.", benar: true, penjelasan: "Flexible." },
    { teks: "3 rr + 2 pr + 7 rb + 1 ratus = 3.271.", benar: false, penjelasan: "327.100." },
    { teks: "Komposisi dan dekomposisi saling mengecek.", benar: true, penjelasan: "Balikan." },
  ],
];
export const RONDE_DETEKTIF_QC: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["3 ratus ribuan", "2 puluh ribuan", "7 ribuan", "1 ratusan"], jawab: "327100", opsi: ["327100", "3271", "203305"], salah: "Komposisi." },
  { klue: ["jaga tempat", "nol tengah", "contoh"], jawab: "203305", opsi: ["203305", "2335", "100"], salah: "Nol." },
  { klue: ["uraikan", "nilai tempat", "nama proses"], jawab: "dekomposisi", opsi: ["dekomposisi", "urut naik saja", "ukur sudut"], salah: "Arti." },
];
export const PETA_KONSEP_QC = [{
  pusat: "Komposisi & Dekomposisi",
  kotak: [
    { label: "Komposisi", opsi: ["susun dari tempat", "hapus digit", "banding satuan"], benar: 0 },
    { label: "Dekomposisi", opsi: ["uraikan ke tempat", "urut turun saja", "ukur luas"], benar: 0 },
    { label: "Nol", opsi: ["jaga nilai tempat", "boleh dihapus bebas", "hanya hiasan"], benar: 0 },
    { label: "Metode luar", opsi: ["Part-Whole / Expanded / Flexible", "Tally / Pictograph", "Right Angle"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QC = RONDE_CERITA_CC;
