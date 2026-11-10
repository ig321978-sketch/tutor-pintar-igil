/**
 * Data murni Matematika Kelas 5 Bab 8 (Data): Sub-Bab A–C.
 * Sumber: Buku Siswa Matematika Kelas V Kemendikbudristek Bab 8 hlm. 237–271.
 * Tanpa React/jaringan. Uji: scripts/uji-statis-k5b8.mjs.
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
  bayam: 8,
  kangkung: 6,
  wortel: 8,
  kunciApem: 4,
  kelompokTurus: 5,
} as const;

// ========== A: Mengumpulkan Data ==========
export const RONDE_HITUNG_CA: { label: string; hasil: number; pesan: string }[][] = [
  [
    { label: "frekuensi bayam (contoh buku)", hasil: 8, pesan: "8 anak menyukai bayam → f=8." },
    { label: "garis dalam 1 kelompok turus", hasil: 5, pesan: "4 tegak + 1 miring = 5." },
  ],
  [
    { label: "frekuensi kangkung tabel contoh", hasil: 6, pesan: "Tabel 8.4: kangkung 6." },
    { label: "1 hasil pengamatan = berapa turus", hasil: 1, pesan: "Tally: 1 hasil = 1 garis." },
  ],
  [
    { label: "Senin donat cokelat Tabel 8.1", hasil: 3, pesan: "Senin cokelat = 3." },
    { label: "Jumat donat kacang", hasil: 0, pesan: "Jumat kacang = 0; data untuk keputusan." },
  ],
];
export const RONDE_ARTI_CA: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Apa itu data menurut buku?", jawab: "sekumpulan informasi atau fakta", opsi: ["sekumpulan informasi atau fakta", "hanya gambar tanpa angka", "tebakan semata"], pesan: "Definisi hlm. 238." },
    { tanya: "Turus dipakai untuk?", jawab: "mencatat hasil pengamatan agar tidak terlewat", opsi: ["mencatat hasil pengamatan agar tidak terlewat", "mengganti penggaris siku", "mengukur sudut"], pesan: "METODE LUAR · Tally Mark Protocol." },
  ],
  [
    { tanya: "Frekuensi adalah?", jawab: "bilangan yang menyatakan berapa kali suatu nilai muncul", opsi: ["bilangan yang menyatakan berapa kali suatu nilai muncul", "nama sumbu mendatar saja", "kunci piktogram wajib 100"], pesan: "Definisi frekuensi." },
    { tanya: "Mengapa turus dikelompokkan lima?", jawab: "agar mudah dihitung lima-lima", opsi: ["agar mudah dihitung lima-lima", "karena wajib sudut 90°", "supaya data dihapus"], pesan: "4 tegak + 1 miring." },
  ],
  [
    { tanya: "METODE LUAR Frequency Table Construction menyusun?", jawab: "kategori, turus, dan frekuensi", opsi: ["kategori, turus, dan frekuensi", "hanya warna batang", "hanya judul tanpa angka"], pesan: "Tabel frekuensi." },
    { tanya: "Anggi menambah donat cokelat karena?", jawab: "data menunjukkan penjualan cokelat naik", opsi: ["data menunjukkan penjualan cokelat naik", "warna kemasan saja", "tanpa melihat tabel"], pesan: "Data-Informed Decision." },
  ],
];
export const RONDE_SORTIR_CA: { id: string; label: string; bin: "ya" | "tidak" }[][] = [
  [
    { id: "a1", label: "turus 1 hasil=1 garis", bin: "ya" }, { id: "a2", label: "abaikan data dobel ok", bin: "tidak" }, { id: "a3", label: "kelompok turus = 5", bin: "ya" },
    { id: "a4", label: "frekuensi = tebakan", bin: "tidak" }, { id: "a5", label: "tabel f punya kolom f", bin: "ya" }, { id: "a6", label: "data tanpa fakta", bin: "tidak" },
  ],
  [
    { id: "b1", label: "Collection Cycle", bin: "ya" }, { id: "b2", label: "hapus turus acak", bin: "tidak" }, { id: "b3", label: "f bayam 8 contoh", bin: "ya" },
    { id: "b4", label: "turus wajib 7 garis", bin: "tidak" }, { id: "b5", label: "keputusan dari data", bin: "ya" }, { id: "b6", label: "tabel f tanpa kategori", bin: "tidak" },
  ],
  [
    { id: "c1", label: "mode = f tertinggi", bin: "ya" }, { id: "c2", label: "jumlah f boleh ≠ n", bin: "tidak" }, { id: "c3", label: "Tally Protocol", bin: "ya" },
    { id: "c4", label: "data = hanya opini", bin: "tidak" }, { id: "c5", label: "catat satu per satu", bin: "ya" }, { id: "c6", label: "skip tabel frekuensi", bin: "tidak" },
  ],
];
export const RONDE_PASANG_CA: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "data", kanan: "kumpulan fakta" }, { kiri: "turus", kanan: "1 hasil = 1 garis" },
    { kiri: "frekuensi", kanan: "berapa kali muncul" }, { kiri: "kelompok turus", kanan: "5 garis" },
  ],
  [
    { kiri: "tabel frekuensi", kanan: "kategori|turus|f" }, { kiri: "bayam contoh", kanan: "f = 8" },
    { kiri: "Tally Protocol", kanan: "catat tanpa terlewat" }, { kiri: "Collection Cycle", kanan: "kumpul→catat→ringkas" },
  ],
  [
    { kiri: "mode", kanan: "f tertinggi" }, { kiri: "Anggi kacang", kanan: "penjualan turun" },
    { kiri: "Frequency Table", kanan: "susun f rapi" }, { kiri: "keputusan", kanan: "berdasarkan data" },
  ],
];
export const RONDE_MEMORI_CA = RONDE_PASANG_CA;
export const RONDE_KETUK_CA: { item: number[]; tanya: number[] }[] = [
  { item: [5, 6, 7, 8, 0, 3], tanya: [5, 8] },
  { item: [1, 4, 5, 6, 8, 10], tanya: [1, 5, 8] },
  { item: [0, 3, 5, 6, 8, 9], tanya: [0, 5, 8] },
];
export const RONDE_SEMUA_CA: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "ciri turus benar", item: [
    { id: "a", label: "1 hasil = 1 garis", cocok: true }, { id: "b", label: "kelompok 5", cocok: true }, { id: "c", label: "boleh dobel hitung", cocok: false }, { id: "d", label: "4 tegak + 1 miring", cocok: true },
  ]},
  { label: "isi tabel frekuensi", item: [
    { id: "a", label: "kategori", cocok: true }, { id: "b", label: "turus", cocok: true }, { id: "c", label: "warna baju saja", cocok: false }, { id: "d", label: "frekuensi", cocok: true },
  ]},
  { label: "manfaat data Anggi", item: [
    { id: "a", label: "lihat tren rasa", cocok: true }, { id: "b", label: "putuskan stok", cocok: true }, { id: "c", label: "abaikan tabel", cocok: false }, { id: "d", label: "banding harian", cocok: true },
  ]},
];
export const RONDE_CERITA_CA: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "Frekuensi siswa suka bayam pada contoh?", jawab: "8", opsi: ["8", "5", "2"], pesan: "Buku." },
    { teks: "Berapa garis dalam satu kelompok turus?", jawab: "5", opsi: ["5", "3", "10"], pesan: "Protocol." },
  ],
  [
    { teks: "Mengapa Anggi stop jual kacang?", jawab: "data penjualan kacang turun/habis", opsi: ["data penjualan kacang turun/habis", "warna kacang jelek saja", "tanpa alasan"], pesan: "Keputusan data." },
    { teks: "Apa nama bilangan banyaknya kejadian?", jawab: "frekuensi", opsi: ["frekuensi", "diagonal", "volume"], pesan: "Definisi." },
  ],
  [
    { teks: "METODE LUAR Data Collection Cycle urutannya?", jawab: "kumpul → catat → ringkas → baca makna", opsi: ["kumpul → catat → ringkas → baca makna", "hapus → tebak → selesai", "gambar saja tanpa hitung"], pesan: "Metode luar." },
    { teks: "Kolom wajib tabel frekuensi?", jawab: "kategori, turus, frekuensi", opsi: ["kategori, turus, frekuensi", "hanya judul lagu", "hanya warna"], pesan: "Construction." },
  ],
];
export const RONDE_URUT_CA: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [6, 8, 0, 5], dari: "kecil" },
  { angka: [8, 3, 6, 5], dari: "besar" },
  { angka: [0, 5, 1, 8], dari: "kecil" },
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
    { baris: "bayam", jawab: "8", opsi: ["8", "2", "15"], pesan: "f." },
    { baris: "kelompok turus", jawab: "5", opsi: ["5", "7", "9"], pesan: "Protocol." },
  ],
  [
    { baris: "kangkung", jawab: "6", opsi: ["6", "1", "20"], pesan: "Tabel." },
    { baris: "1 hasil", jawab: "1 garis", opsi: ["1 garis", "3 garis", "0 garis"], pesan: "Tally." },
  ],
  [
    { baris: "definisi f", jawab: "berapa kali muncul", opsi: ["berapa kali muncul", "nama sumbu saja", "kunci 100 wajib"], pesan: "Definisi." },
    { baris: "mode", jawab: "f tertinggi", opsi: ["f tertinggi", "f nol", "hapus data"], pesan: "Mode." },
  ],
];
export const RONDE_BENARSALAH_QA: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Data adalah kumpulan fakta atau informasi.", benar: true, penjelasan: "Definisi." },
    { teks: "Turus boleh menghitung satu hasil dua kali.", benar: false, penjelasan: "Hindari dobel." },
    { teks: "Frekuensi menyatakan berapa kali nilai muncul.", benar: true, penjelasan: "Benar." },
  ],
  [
    { teks: "Kelompok turus berisi 5 garis.", benar: true, penjelasan: "4+1." },
    { teks: "Tabel frekuensi tidak perlu kategori.", benar: false, penjelasan: "Perlu kategori." },
    { teks: "Anggi memakai data untuk keputusan penjualan.", benar: true, penjelasan: "Konteks." },
  ],
];
export const RONDE_DETEKTIF_QA: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["bayam", "delapan anak", "nama bilangan"], jawab: "frekuensi", opsi: ["frekuensi", "diagonal", "volume"], salah: "f." },
  { klue: ["empat tegak", "satu miring", "berapa"], jawab: "5", opsi: ["5", "3", "8"], salah: "Kelompok." },
  { klue: ["catat pengamatan", "satu garis", "nama cara"], jawab: "turus", opsi: ["turus", "busur", "diagonal"], salah: "Tally." },
];
export const PETA_KONSEP_QA = [{
  pusat: "Mengumpulkan Data",
  kotak: [
    { label: "Data", opsi: ["kumpulan fakta", "hanya tebakan", "tanpa angka/kata"], benar: 0 },
    { label: "Turus", opsi: ["1 hasil = 1 garis", "wajib 10 garis", "tanpa simbol"], benar: 0 },
    { label: "Frekuensi", opsi: ["berapa kali muncul", "nama warna saja", "kunci piktogram"], benar: 0 },
    { label: "Metode luar", opsi: ["Tally / Frequency Table / Cycle", "abaikan data", "hafal warna"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QA = RONDE_CERITA_CA;

// ========== B: Piktogram ==========
export const RONDE_HITUNG_CB: { derajat: number; hasil: number; pesan: string }[][] = [
  [
    { derajat: 4, hasil: 4, pesan: "Kunci contoh: 1 simbol = 4 kue apem." },
    { derajat: 3, hasil: 12, pesan: "3 simbol × 4 = 12." },
  ],
  [
    { derajat: 100, hasil: 200, pesan: "Jika 1 simbol = 100, dua simbol = 200." },
    { derajat: 60, hasil: 30, pesan: "½ simbol dari kunci 60 → 30." },
  ],
  [
    { derajat: 5, hasil: 20, pesan: "5 simbol × 4 = 20." },
    { derajat: 2, hasil: 8, pesan: "2 simbol × 4 = 8." },
  ],
];
export const RONDE_RUMUS_CB: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Piktogram adalah?", jawab: "penyajian data dengan gambar/simbol dan kunci", opsi: ["penyajian data dengan gambar/simbol dan kunci", "hanya sudut siku", "tabel tanpa angka"], pesan: "Definisi." },
    { tanya: "Mengapa kunci wajib?", jawab: "tanpa kunci simbol tidak punya nilai angka", opsi: ["tanpa kunci simbol tidak punya nilai angka", "hanya untuk menghias", "mengganti judul"], pesan: "METODE LUAR · Pictograph Scale Legend." },
  ],
  [
    { tanya: "Cara hitung nilai dari piktogram?", jawab: "banyak simbol × nilai kunci", opsi: ["banyak simbol × nilai kunci", "tambah sudut saja", "abaikan kunci"], pesan: "Rumus baca." },
    { tanya: "Unit Symbol Consistency artinya?", jawab: "simbol sama bentuk dan ukuran", opsi: ["simbol sama bentuk dan ukuran", "ubah ukuran sesuka hati", "hapus kunci"], pesan: "Metode luar." },
  ],
  [
    { tanya: "Pictograph Error Hunt mencari?", jawab: "kesalahan kunci, ukuran, atau cocok tabel", opsi: ["kesalahan kunci, ukuran, atau cocok tabel", "warna favorit saja", "nama hewan acak"], pesan: "Error Hunt." },
    { tanya: "Jika kunci 4 dan frekuensi 12, banyak simbol?", jawab: "3", opsi: ["3", "12", "48"], pesan: "12 ÷ 4 = 3." },
  ],
];
export const RONDE_SORTIR_CB: { id: string; label: string; bin: "lancip" | "tumpul" }[][] = [
  [
    { id: "a1", label: "ada kunci jelas", bin: "lancip" }, { id: "a2", label: "tanpa kunci", bin: "tumpul" }, { id: "a3", label: "simbol seragam", bin: "lancip" },
    { id: "a4", label: "gambar dibesar tipu mata", bin: "tumpul" }, { id: "a5", label: "simbol × N = f", bin: "lancip" }, { id: "a6", label: "abaikan tabel asli", bin: "tumpul" },
  ],
  [
    { id: "b1", label: "Scale Legend", bin: "lancip" }, { id: "b2", label: "kunci berubah diam-diam", bin: "tumpul" }, { id: "b3", label: "½ simbol = N/2", bin: "lancip" },
    { id: "b4", label: "simbol beda-beda acak", bin: "tumpul" }, { id: "b5", label: "judul ada", bin: "lancip" }, { id: "b6", label: "Error Hunt diabaikan", bin: "tumpul" },
  ],
  [
    { id: "c1", label: "Consistency", bin: "lancip" }, { id: "c2", label: "ukuran tipuan", bin: "tumpul" }, { id: "c3", label: "cek cocok tabel", bin: "lancip" },
    { id: "c4", label: "hapus legenda", bin: "tumpul" }, { id: "c5", label: "kunci=4 apem", bin: "lancip" }, { id: "c6", label: "1 simbol = apa saja", bin: "tumpul" },
  ],
];
export const RONDE_PASANG_CB: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "kunci", kanan: "1 simbol = N" }, { kiri: "hitung", kanan: "simbol × N" },
    { kiri: "½ simbol", kanan: "N/2" }, { kiri: "Consistency", kanan: "ukuran seragam" },
  ],
  [
    { kiri: "Error Hunt", kanan: "cari kesalahan" }, { kiri: "kunci apem", kanan: "1 = 4" },
    { kiri: "3 simbol × 4", kanan: "12" }, { kiri: "legenda", kanan: "penjelasan kunci" },
  ],
  [
    { kiri: "f ÷ N", kanan: "banyak simbol" }, { kiri: "judul", kanan: "konteks data" },
    { kiri: "tipu mata", kanan: "ukuran tidak jujur" }, { kiri: "Scale Legend", kanan: "metode luar" },
  ],
];
export const RONDE_MEMORI_CB = RONDE_PASANG_CB;
export const RONDE_KETUK_CB: { item: number[]; tanya: number[] }[] = [
  { item: [4, 8, 12, 16, 20, 100], tanya: [4, 12] },
  { item: [2, 4, 8, 30, 60, 200], tanya: [4, 8, 200] },
  { item: [3, 4, 12, 20, 28, 100], tanya: [3, 4, 12] },
];
export const RONDE_SEMUA_CB: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "syarat piktogram baik", item: [
    { id: "a", label: "ada kunci", cocok: true }, { id: "b", label: "simbol seragam", cocok: true }, { id: "c", label: "tanpa judul boleh kacau", cocok: false }, { id: "d", label: "cocok tabel", cocok: true },
  ]},
  { label: "cara baca benar", item: [
    { id: "a", label: "baca kunci dulu", cocok: true }, { id: "b", label: "simbol × N", cocok: true }, { id: "c", label: "abaikan setengah simbol", cocok: false }, { id: "d", label: "½ = N/2", cocok: true },
  ]},
  { label: "kesalahan umum", item: [
    { id: "a", label: "ukuran tipuan", cocok: true }, { id: "b", label: "kunci hilang", cocok: true }, { id: "c", label: "simbol seragam", cocok: false }, { id: "d", label: "tidak cocok tabel", cocok: true },
  ]},
];
export const RONDE_CERITA_CB: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "Kunci 1 simbol = 4. Ada 3 simbol. Nilai?", jawab: "12", opsi: ["12", "7", "4"], pesan: "3×4." },
    { teks: "Tanpa kunci, piktogram?", jawab: "tidak punya nilai angka jelas", opsi: ["tidak punya nilai angka jelas", "otomatis benar", "sama dengan sudut"], pesan: "Legend." },
  ],
  [
    { teks: "½ simbol dari kunci 60 bernilai?", jawab: "30", opsi: ["30", "60", "120"], pesan: "N/2." },
    { teks: "Mengapa simbol harus seragam?", jawab: "agar tidak menyesatkan pembaca", opsi: ["agar tidak menyesatkan pembaca", "supaya lebih acak", "menghapus kunci"], pesan: "Consistency." },
  ],
  [
    { teks: "f=20 dan kunci=4. Banyak simbol?", jawab: "5", opsi: ["5", "20", "80"], pesan: "20÷4." },
    { teks: "METODE LUAR Pictograph Error Hunt?", jawab: "mencari dan memperbaiki kesalahan sajian", opsi: ["mencari dan memperbaiki kesalahan sajian", "menghapus semua data", "mengukur sudut saja"], pesan: "Error Hunt." },
  ],
];
export const RONDE_URUT_CB: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [4, 12, 8, 20], dari: "kecil" },
  { angka: [200, 30, 100, 60], dari: "besar" },
  { angka: [3, 12, 4, 8], dari: "kecil" },
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
    { baris: "3 simbol × 4", jawab: "12", opsi: ["12", "7", "34"], pesan: "Hitung." },
    { baris: "kunci apem", jawab: "4", opsi: ["4", "10", "100"], pesan: "Buku." },
  ],
  [
    { baris: "½ dari 60", jawab: "30", opsi: ["30", "60", "90"], pesan: "Setengah." },
    { baris: "f20 kunci4", jawab: "5 simbol", opsi: ["5 simbol", "20 simbol", "1 simbol"], pesan: "÷." },
  ],
  [
    { baris: "wajib", jawab: "kunci", opsi: ["kunci", "busur", "diagonal"], pesan: "Legend." },
    { baris: "seragam", jawab: "ukuran sama", opsi: ["ukuran sama", "acak besar", "tanpa gambar"], pesan: "Consistency." },
  ],
];
export const RONDE_BENARSALAH_QB: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Piktogram membutuhkan kunci atau legenda.", benar: true, penjelasan: "Legend." },
    { teks: "Memperbesar satu gambar tanpa ubah kunci selalu jujur.", benar: false, penjelasan: "Bisa menipu." },
    { teks: "Nilai = banyak simbol × N.", benar: true, penjelasan: "Rumus." },
  ],
  [
    { teks: "½ simbol bernilai setengah kunci.", benar: true, penjelasan: "N/2." },
    { teks: "Error Hunt mengabaikan ketidakcocokan tabel.", benar: false, penjelasan: "Harus dicek." },
    { teks: "Unit Symbol Consistency menuntut simbol seragam.", benar: true, penjelasan: "Metode luar." },
  ],
];
export const RONDE_DETEKTIF_QB: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["satu simbol", "empat apem", "nama"], jawab: "kunci", opsi: ["kunci", "sudut", "volume"], salah: "Legend." },
  { klue: ["tiga simbol", "kali empat", "hasil"], jawab: "12", opsi: ["12", "7", "3"], salah: "3×4." },
  { klue: ["cari salah", "piktogram", "metode"], jawab: "Error Hunt", opsi: ["Error Hunt", "Angle Sum", "Inequality"], salah: "Metode." },
];
export const PETA_KONSEP_QB = [{
  pusat: "Piktogram",
  kotak: [
    { label: "Kunci", opsi: ["1 simbol = N", "tanpa nilai", "wajib 360°"], benar: 0 },
    { label: "Hitung", opsi: ["simbol × N", "hapus N", "tambah sudut"], benar: 0 },
    { label: "Seragam", opsi: ["ukuran sama", "acak besar", "tanpa gambar"], benar: 0 },
    { label: "Cek", opsi: ["Error Hunt / cocok tabel", "abaikan data", "hafal warna"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QB = RONDE_CERITA_CB;

// ========== C: Diagram Batang ==========
export const RONDE_HITUNG_CC: { derajat: number; hasil: number; pesan: string }[][] = [
  [
    { derajat: 9, hasil: 9, pesan: "Contoh baca batang: tinggi 9 → f=9." },
    { derajat: 0, hasil: 0, pesan: "Skala ideal dimulai dari 0." },
  ],
  [
    { derajat: 12, hasil: 5, pesan: "Selisih contoh 12 − 7 = 5." },
    { derajat: 7, hasil: 7, pesan: "Tinggi batang 7 → frekuensi 7." },
  ],
  [
    { derajat: 32, hasil: 32, pesan: "Contoh panen: baca total dari jumlah batang/tabel." },
    { derajat: 2, hasil: 2, pesan: "Batang ganda: dua kelompok dibanding." },
  ],
];
export const RONDE_ARTI_CC: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Tinggi batang mewakili?", jawab: "frekuensi kategori", opsi: ["frekuensi kategori", "warna baju saja", "nama guru saja"], pesan: "Bar Chart Reading Protocol." },
    { tanya: "Yang dibaca lebih dulu?", jawab: "judul lalu skala lalu tinggi batang", opsi: ["judul lalu skala lalu tinggi batang", "warna acak dulu", "hapus sumbu dulu"], pesan: "Protocol." },
  ],
  [
    { tanya: "Axis Scale Consistency menekankan?", jawab: "jarak skala teratur dan sebaiknya mulai dari 0", opsi: ["jarak skala teratur dan sebaiknya mulai dari 0", "skala boleh meloncat bebas", "sumbu dihapus"], pesan: "Metode luar." },
    { tanya: "Comparative Bar Analysis dipakai untuk?", jawab: "membandingkan tinggi/selisih antarbatang", opsi: ["membandingkan tinggi/selisih antarbatang", "mengukur sudut siku saja", "menghapus legenda"], pesan: "Banding." },
  ],
  [
    { tanya: "Batang ganda membutuhkan?", jawab: "legenda dua kelompok dengan skala sama", opsi: ["legenda dua kelompok dengan skala sama", "kunci piktogram wajib 4 saja", "tanpa sumbu"], pesan: "Ganda." },
    { tanya: "Sea Games pada buku dilatih sebagai?", jawab: "tabel medali emas digambar jadi batang per tahun", opsi: ["tabel medali emas digambar jadi batang per tahun", "hanya cerita tanpa angka", "turus tanpa frekuensi"], pesan: "Tabel 8.8." },
  ],
];
export const RONDE_SORTIR_CC: { id: string; label: string; bin: "ya" | "tidak" }[][] = [
  [
    { id: "a1", label: "skala mulai 0", bin: "ya" }, { id: "a2", label: "skala meloncat acak", bin: "tidak" }, { id: "a3", label: "tinggi = f", bin: "ya" },
    { id: "a4", label: "abaikan judul", bin: "tidak" }, { id: "a5", label: "jarak skala teratur", bin: "ya" }, { id: "a6", label: "tipu tinggi batang", bin: "tidak" },
  ],
  [
    { id: "b1", label: "Reading Protocol", bin: "ya" }, { id: "b2", label: "banding beda skala", bin: "tidak" }, { id: "b3", label: "selisih f besar−kecil", bin: "ya" },
    { id: "b4", label: "legenda ganda hilang", bin: "tidak" }, { id: "b5", label: "tabel→batang", bin: "ya" }, { id: "b6", label: "sumbu tanpa angka", bin: "tidak" },
  ],
  [
    { id: "c1", label: "Comparative Analysis", bin: "ya" }, { id: "c2", label: "hapus skala", bin: "tidak" }, { id: "c3", label: "tren naik/turun", bin: "ya" },
    { id: "c4", label: "batang tanpa kategori", bin: "tidak" }, { id: "c5", label: "Sea Games konteks", bin: "ya" }, { id: "c6", label: "f ≠ tinggi", bin: "tidak" },
  ],
];
export const RONDE_PASANG_CC: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "tinggi batang", kanan: "frekuensi" }, { kiri: "sumbu Y", kanan: "skala angka" },
    { kiri: "sumbu X", kanan: "kategori" }, { kiri: "mulai 0", kanan: "skala jujur" },
  ],
  [
    { kiri: "selisih", kanan: "f besar − f kecil" }, { kiri: "batang ganda", kanan: "dua kelompok" },
    { kiri: "Protocol", kanan: "judul→skala→batang" }, { kiri: "Sea Games", kanan: "emas per tahun" },
  ],
  [
    { kiri: "Consistency", kanan: "skala teratur" }, { kiri: "Comparative", kanan: "banding tinggi" },
    { kiri: "legenda", kanan: "arti warna/kelompok" }, { kiri: "tren", kanan: "naik atau turun" },
  ],
];
export const RONDE_MEMORI_CC = RONDE_PASANG_CC;
export const RONDE_KETUK_CC: { item: number[]; tanya: number[] }[] = [
  { item: [0, 5, 7, 9, 12, 15], tanya: [0, 9] },
  { item: [2, 5, 7, 9, 12, 20], tanya: [5, 7, 12] },
  { item: [0, 4, 8, 12, 16, 32], tanya: [0, 12, 32] },
];
export const RONDE_SEMUA_CC: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "ciri diagram batang baik", item: [
    { id: "a", label: "judul jelas", cocok: true }, { id: "b", label: "skala teratur dari 0", cocok: true }, { id: "c", label: "tinggi ≠ frekuensi", cocok: false }, { id: "d", label: "kategori di sumbu", cocok: true },
  ]},
  { label: "cara banding benar", item: [
    { id: "a", label: "lihat selisih tinggi", cocok: true }, { id: "b", label: "pakai skala sama", cocok: true }, { id: "c", label: "campur skala beda", cocok: false }, { id: "d", label: "baca legenda ganda", cocok: true },
  ]},
  { label: "konteks buku C", item: [
    { id: "a", label: "Sea Games emas", cocok: true }, { id: "b", label: "panen / pengunjung", cocok: true }, { id: "c", label: "hanya sudut siku Bab 6", cocok: false }, { id: "d", label: "L vs P per tahun", cocok: true },
  ]},
];
export const RONDE_CERITA_CC: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "Batang tertinggi artinya?", jawab: "frekuensi terbesar", opsi: ["frekuensi terbesar", "kunci piktogram hilang", "sudut 90°"], pesan: "Baca batang." },
    { teks: "Mengapa skala mulai dari 0?", jawab: "agar perbedaan tidak dilebih-lebihkan", opsi: ["agar perbedaan tidak dilebih-lebihkan", "supaya sulit dibaca", "menghapus kategori"], pesan: "Consistency." },
  ],
  [
    { teks: "f=12 dan f=7. Selisih?", jawab: "5", opsi: ["5", "19", "84"], pesan: "12−7." },
    { teks: "Urutan baca diagram batang?", jawab: "judul → skala → tinggi", opsi: ["judul → skala → tinggi", "warna → hapus → tebak", "kunci → turus → sudut"], pesan: "Protocol." },
  ],
  [
    { teks: "Batang ganda membandingkan?", jawab: "dua kelompok pada kategori yang sama", opsi: ["dua kelompok pada kategori yang sama", "hanya satu angka rahasia", "tanpa legenda lebih baik"], pesan: "Comparative." },
    { teks: "METODE LUAR Representation Choice?", jawab: "pilih tabel/piktogram/batang sesuai tujuan", opsi: ["pilih tabel/piktogram/batang sesuai tujuan", "pakai satu bentuk saja selamanya", "abaikan pembaca"], pesan: "A–C rangkum." },
  ],
];
export const RONDE_URUT_CC: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [5, 12, 0, 9], dari: "kecil" },
  { angka: [15, 7, 12, 9], dari: "besar" },
  { angka: [0, 8, 4, 16], dari: "kecil" },
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
    { baris: "tinggi 9", jawab: "f=9", opsi: ["f=9", "f=0", "f=90"], pesan: "Baca." },
    { baris: "12−7", jawab: "5", opsi: ["5", "19", "84"], pesan: "Selisih." },
  ],
  [
    { baris: "sumbu Y", jawab: "skala", opsi: ["skala", "kunci apem saja", "turus miring"], pesan: "Sumbu." },
    { baris: "mulai skala", jawab: "0", opsi: ["0", "50 wajib", "100 wajib"], pesan: "Jujur." },
  ],
  [
    { baris: "Protocol", jawab: "judul→skala→batang", opsi: ["judul→skala→batang", "hapus→tebak", "warna saja"], pesan: "Baca." },
    { baris: "ganda", jawab: "legenda + skala sama", opsi: ["legenda + skala sama", "tanpa kategori", "kunci hilang"], pesan: "Ganda." },
  ],
];
export const RONDE_BENARSALAH_QC: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Tinggi batang mewakili frekuensi.", benar: true, penjelasan: "Benar." },
    { teks: "Skala boleh meloncat tidak teratur.", benar: false, penjelasan: "Harus teratur." },
    { teks: "Baca judul sebelum menafsir batang.", benar: true, penjelasan: "Protocol." },
  ],
  [
    { teks: "Batang ganda butuh legenda kelompok.", benar: true, penjelasan: "Ganda." },
    { teks: "Membandingkan dua diagram dengan skala berbeda selalu adil.", benar: false, penjelasan: "Skala harus diperhatikan." },
    { teks: "Sea Games dipakai sebagai konteks diagram batang di buku.", benar: true, penjelasan: "Tabel 8.8." },
  ],
];
export const RONDE_DETEKTIF_QC: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["tinggi batang", "mewakili", "apa"], jawab: "frekuensi", opsi: ["frekuensi", "kunci wajib 4 saja", "sudut siku"], salah: "Batang." },
  { klue: ["12", "7", "selisih"], jawab: "5", opsi: ["5", "19", "84"], salah: "Banding." },
  { klue: ["skala", "mulai", "jujur"], jawab: "0", opsi: ["0", "50", "100"], salah: "Consistency." },
];
export const PETA_KONSEP_QC = [{
  pusat: "Diagram Batang",
  kotak: [
    { label: "Tinggi", opsi: ["= frekuensi", "= kunci piktogram saja", "= sudut"], benar: 0 },
    { label: "Skala", opsi: ["teratur dari 0", "meloncat bebas", "dihapus"], benar: 0 },
    { label: "Banding", opsi: ["selisih / tren / ganda", "abaikan tinggi", "tanpa legenda"], benar: 0 },
    { label: "Metode luar", opsi: ["Reading / Scale / Comparative", "Inequality segitiga", "Paper Fold"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QC = RONDE_CERITA_CC;
