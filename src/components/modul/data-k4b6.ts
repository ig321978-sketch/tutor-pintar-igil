/**
 * Data murni Matematika Kelas 4 Bab 6 (Piktogram dan Diagram Batang): Sub-Bab A–B.
 * Sumber: Buku Siswa Matematika Kelas IV Kemendikbudristek Bab 6 hlm. 177–194.
 * Tanpa React/jaringan. Uji: scripts/uji-data-k4b6.mjs.
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

export type ItemData = { id: string; label: string; nilai: number; emoji: string };
export type Dataset = {
  id: string;
  judul: string;
  skala: number;
  simbolLabel: string;
  item: ItemData[];
};

export const totalNilai = (d: Dataset) => d.item.reduce((a, x) => a + x.nilai, 0);
export const itemMax = (d: Dataset) => d.item.reduce((a, x) => (x.nilai > a.nilai ? x : a));
export const itemMin = (d: Dataset) => d.item.reduce((a, x) => (x.nilai < a.nilai ? x : a));
export const simbolDariNilai = (nilai: number, skala: number) => nilai / skala;
export const nilaiDariSimbol = (simbol: number, skala: number) => simbol * skala;
export const byId = (d: Dataset, id: string) => d.item.find((x) => x.id === id)!;

/** Contoh buku: benda di kelas (skala 1). */
export const DS_KELAS: Dataset = {
  id: "kelas",
  judul: "Benda di kelas",
  skala: 1,
  simbolLabel: "1 benda",
  item: [
    { id: "pt", label: "papan tulis", nilai: 2, emoji: "📋" },
    { id: "jd", label: "jam dinding", nilai: 1, emoji: "🕐" },
    { id: "lm", label: "lemari", nilai: 1, emoji: "🗄️" },
    { id: "hd", label: "hiasan dinding", nilai: 8, emoji: "🖼️" },
  ],
};

/** Mainan Karel (skala 1): 6+4+3+1+9 = 23. */
export const DS_MAINAN: Dataset = {
  id: "mainan",
  judul: "Mainan Karel",
  skala: 1,
  simbolLabel: "1 mainan",
  item: [
    { id: "mb", label: "mobil", nilai: 6, emoji: "🚗" },
    { id: "rb", label: "robot", nilai: 4, emoji: "🤖" },
    { id: "ps", label: "pesawat", nilai: 3, emoji: "✈️" },
    { id: "pz", label: "puzzle", nilai: 1, emoji: "🧩" },
    { id: "kl", label: "kelereng", nilai: 9, emoji: "🔵" },
  ],
};

/** Warna kesukaan (skala 1): 4+2+1+5 = 12. */
export const DS_WARNA: Dataset = {
  id: "warna",
  judul: "Warna kesukaan",
  skala: 1,
  simbolLabel: "1 siswa",
  item: [
    { id: "ungu", label: "ungu", nilai: 4, emoji: "🟣" },
    { id: "kuning", label: "kuning", nilai: 2, emoji: "🟡" },
    { id: "hitam", label: "hitam", nilai: 1, emoji: "⚫" },
    { id: "merah", label: "merah", nilai: 5, emoji: "🔴" },
  ],
};

/** Kelereng teman (skala 1). */
export const DS_KELERENG: Dataset = {
  id: "kelereng",
  judul: "Kelereng teman",
  skala: 1,
  simbolLabel: "1 kelereng",
  item: [
    { id: "az", label: "Azizah", nilai: 5, emoji: "🔵" },
    { id: "ka", label: "Karel", nilai: 6, emoji: "🔵" },
    { id: "pu", label: "Putu", nilai: 2, emoji: "🔵" },
    { id: "sl", label: "Slamet", nilai: 8, emoji: "🔵" },
    { id: "as", label: "Asep", nilai: 5, emoji: "🔵" },
    { id: "he", label: "Helen", nilai: 4, emoji: "🔵" },
  ],
};

/** Buku pinjaman (skala 1) — angka wajar untuk latihan membaca. */
export const DS_BUKU: Dataset = {
  id: "buku",
  judul: "Buku dipinjam",
  skala: 1,
  simbolLabel: "1 buku",
  item: [
    { id: "sen", label: "Senin", nilai: 10, emoji: "📚" },
    { id: "sel", label: "Selasa", nilai: 8, emoji: "📚" },
    { id: "rab", label: "Rabu", nilai: 14, emoji: "📚" },
    { id: "kam", label: "Kamis", nilai: 6, emoji: "📚" },
    { id: "jum", label: "Jumat", nilai: 9, emoji: "📚" },
    { id: "sab", label: "Sabtu", nilai: 5, emoji: "📚" },
  ],
};

/** Banyak siswa per kelas (skala 4). */
export const DS_KELAS_SKALA: Dataset = {
  id: "kelas-skala",
  judul: "Siswa per kelas",
  skala: 4,
  simbolLabel: "4 siswa",
  item: [
    { id: "k1", label: "Kelas I", nilai: 28, emoji: "👧" },
    { id: "k2", label: "Kelas II", nilai: 24, emoji: "👦" },
    { id: "k3", label: "Kelas III", nilai: 32, emoji: "👧" },
    { id: "k4", label: "Kelas IV", nilai: 20, emoji: "👦" },
    { id: "k5", label: "Kelas V", nilai: 16, emoji: "👧" },
    { id: "k6", label: "Kelas VI", nilai: 12, emoji: "👦" },
  ],
};

/** Transportasi (skala 1) — konteks diagram batang buku. */
export const DS_TRANSPORT: Dataset = {
  id: "transport",
  judul: "Alat transportasi",
  skala: 1,
  simbolLabel: "1 siswa",
  item: [
    { id: "jk", label: "jalan kaki", nilai: 8, emoji: "🚶" },
    { id: "sp", label: "sepeda", nilai: 5, emoji: "🚲" },
    { id: "mo", label: "motor", nilai: 7, emoji: "🛵" },
    { id: "bc", label: "becak/lain", nilai: 3, emoji: "🛺" },
  ],
};

export const SEMUA_DS = [DS_KELAS, DS_MAINAN, DS_WARNA, DS_KELERENG, DS_BUKU, DS_KELAS_SKALA, DS_TRANSPORT];

/* ===== A: Piktogram ===== */
export const RONDE_HITUNG_CA: { ds: Dataset; id: string; jawab: number }[][] = [
  [
    { ds: DS_MAINAN, id: "kl", jawab: 9 },
    { ds: DS_MAINAN, id: "pz", jawab: 1 },
  ],
  [
    { ds: DS_WARNA, id: "merah", jawab: 5 },
    { ds: DS_WARNA, id: "hitam", jawab: 1 },
  ],
  [
    { ds: DS_KELAS, id: "hd", jawab: 8 },
    { ds: DS_KELAS, id: "pt", jawab: 2 },
  ],
];
export const RONDE_JENIS_CA: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Diagram yang memakai gambar untuk menyatakan banyak disebut …", jawab: "piktogram", opsi: ["piktogram", "diagram batang", "garis bilangan"], pesan: "Definisi buku: diagram gambar." },
    { tanya: "Piktogram disebut juga …", jawab: "diagram gambar", opsi: ["diagram gambar", "diagram batang tegak", "tabel saja"], pesan: "Sinonim buku." },
  ],
  [
    { tanya: "Jika 1 gambar = 1 siswa, 4 gambar berarti … siswa.", jawab: "4", opsi: ["4", "1", "8"], pesan: "Skala 1 × 4 gambar." },
    { tanya: "Jika 1 gambar = 4 siswa, 3 gambar berarti … siswa.", jawab: "12", opsi: ["12", "3", "7"], pesan: "3 × 4 = 12." },
  ],
  [
    { tanya: "Untuk membaca piktogram, perhatikan …", jawab: "banyak gambar dan skala", opsi: ["banyak gambar dan skala", "warna pensil saja", "tinggi huruf"], pesan: "Kunci membaca piktogram." },
    { tanya: "Baris legenda 'gambar menyatakan 1 bunga' disebut …", jawab: "skala / keterangan simbol", opsi: ["skala / keterangan simbol", "sumbu tegak", "judul bab"], pesan: "Setiap gambar mewakili 1." },
  ],
];
export const RONDE_SORTIR_CA: { id: string; label: string; bin: "piktogram" | "bukan" }[][] = [
  [
    { id: "a", label: "gambar 🚗🚗🚗 = 3 mobil", bin: "piktogram" },
    { id: "b", label: "batang tinggi 5", bin: "bukan" },
    { id: "c", label: "🌸🌸 = 2 bunga", bin: "piktogram" },
    { id: "d", label: "hanya angka tanpa gambar", bin: "bukan" },
    { id: "e", label: "📚📚📚📚 = 4 buku", bin: "piktogram" },
    { id: "f", label: "sumbu X–Y batang", bin: "bukan" },
  ],
  [
    { id: "a2", label: "🟣🟣🟣🟣 = 4 ungu", bin: "piktogram" },
    { id: "b2", label: "diagram batang mendatar", bin: "bukan" },
    { id: "c2", label: "1★ = 4 siswa", bin: "piktogram" },
    { id: "d2", label: "teks cerita panjang", bin: "bukan" },
    { id: "e2", label: "🔵🔵🔵 = 3 kelereng", bin: "piktogram" },
    { id: "f2", label: "hanya judul tanpa data", bin: "bukan" },
  ],
  [
    { id: "a3", label: "gambar sama tiap kategori", bin: "piktogram" },
    { id: "b3", label: "tinggi batang = nilai", bin: "bukan" },
    { id: "c3", label: "sketsa benda di tabel", bin: "piktogram" },
    { id: "d3", label: "garis bilangan saja", bin: "bukan" },
    { id: "e3", label: "legenda 1 gambar = 1", bin: "piktogram" },
    { id: "f3", label: "sumbu tegak skala", bin: "bukan" },
  ],
];
export const RONDE_PASANG_CA: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "paling banyak mainan Karel", kanan: "kelereng (9)" },
    { kiri: "paling sedikit mainan Karel", kanan: "puzzle (1)" },
    { kiri: "total mainan Karel", kanan: "23" },
    { kiri: "piktogram", kanan: "diagram gambar" },
  ],
  [
    { kiri: "warna paling disukai", kanan: "merah (5)" },
    { kiri: "warna paling sedikit", kanan: "hitam (1)" },
    { kiri: "total siswa warna", kanan: "12" },
    { kiri: "1 gambar = 4 siswa", kanan: "skala 4" },
  ],
  [
    { kiri: "benda paling banyak di kelas", kanan: "hiasan dinding (8)" },
    { kiri: "jam dinding + lemari", kanan: "masing-masing 1" },
    { kiri: "baca piktogram", kanan: "hitung gambar × skala" },
    { kiri: "kategori", kanan: "nama baris data" },
  ],
];
export const RONDE_MEMORI_CA = RONDE_PASANG_CA;
export const RONDE_KETUK_CA: { ds: Dataset; tanya: string[] }[] = [
  { ds: DS_MAINAN, tanya: ["kelereng", "puzzle", "mobil"] },
  { ds: DS_WARNA, tanya: ["merah", "hitam", "ungu"] },
  { ds: DS_KELAS, tanya: ["hiasan dinding", "jam dinding", "papan tulis"] },
];
export const RONDE_SEMUA_CA: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  {
    label: "nilai ≥ 5",
    item: DS_MAINAN.item.map((x) => ({ id: x.id, label: `${x.label} (${x.nilai})`, cocok: x.nilai >= 5 })),
  },
  {
    label: "nilai ≤ 2",
    item: DS_WARNA.item.map((x) => ({ id: x.id, label: `${x.label} (${x.nilai})`, cocok: x.nilai <= 2 })),
  },
  {
    label: "nilai genap",
    item: DS_KELAS.item.map((x) => ({ id: x.id, label: `${x.label} (${x.nilai})`, cocok: x.nilai % 2 === 0 })),
  },
];
export const RONDE_CERITA_CA: { teks: string; jawab: string | number; opsi: (string | number)[]; pesan: string }[][] = [
  [
    { teks: "Karel punya 6 mobil, 4 robot, 3 pesawat, 1 puzzle, 9 kelereng. Paling banyak?", jawab: "kelereng", opsi: ["kelereng", "mobil", "robot"], pesan: "9 kelereng." },
    { teks: "Total mainan Karel?", jawab: 23, opsi: [23, 20, 25], pesan: "6+4+3+1+9=23." },
  ],
  [
    { teks: "Ungu 4, kuning 2, hitam 1, merah 5. Total siswa?", jawab: 12, opsi: [12, 10, 15], pesan: "4+2+1+5=12." },
    { teks: "Warna paling sedikit?", jawab: "hitam", opsi: ["hitam", "kuning", "ungu"], pesan: "1 siswa." },
  ],
  [
    { teks: "1 gambar = 4 siswa. Ada 5 gambar. Banyak siswa?", jawab: 20, opsi: [20, 5, 9], pesan: "5×4=20." },
    { teks: "Hiasan dinding 8, jam 1. Selisih?", jawab: 7, opsi: [7, 8, 9], pesan: "8−1=7." },
  ],
];
export const RONDE_URUT_CA: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [9, 1, 6, 4], dari: "besar" },
  { angka: [5, 1, 4, 2], dari: "kecil" },
  { angka: [8, 2, 1, 1], dari: "besar" },
];
export const RONDE_HITUNG_PA = RONDE_HITUNG_CA;
export const RONDE_PASANG_PA = RONDE_PASANG_CA;
export const RONDE_MEMORI_PA = RONDE_MEMORI_CA;
export const RONDE_SORTIR_PA = RONDE_SORTIR_CA;
export const RONDE_SEMUA_PA = RONDE_SEMUA_CA;
export const RONDE_JENIS_PA = RONDE_JENIS_CA;
export const RONDE_TABEL_PA: { baris: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { baris: "kelereng Karel", jawab: "9", opsi: ["9", "6", "1"], pesan: "Data buku." },
    { baris: "puzzle Karel", jawab: "1", opsi: ["1", "3", "4"], pesan: "Paling sedikit." },
  ],
  [
    { baris: "merah", jawab: "5", opsi: ["5", "4", "2"], pesan: "5 gambar." },
    { baris: "total warna", jawab: "12", opsi: ["12", "11", "10"], pesan: "4+2+1+5." },
  ],
  [
    { baris: "1★ = 4, ★★★", jawab: "12", opsi: ["12", "3", "7"], pesan: "3×4." },
    { baris: "hiasan dinding", jawab: "8", opsi: ["8", "2", "1"], pesan: "Paling banyak di kelas." },
  ],
];
export const RONDE_BENARSALAH_QA: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Piktogram memakai gambar untuk menyatakan banyak.", benar: true, penjelasan: "Definisi buku." },
    { teks: "Lingkaran selalu sama dengan diagram batang.", benar: false, penjelasan: "Bentuk penyajian berbeda." },
    { teks: "Skala 1 gambar = 4 berarti 2 gambar = 8.", benar: true, penjelasan: "2×4=8." },
  ],
  [
    { teks: "Mainan Karel paling banyak adalah puzzle.", benar: false, penjelasan: "Paling banyak kelereng." },
    { teks: "Total mainan Karel 23.", benar: true, penjelasan: "6+4+3+1+9." },
    { teks: "Warna hitam paling banyak disukai.", benar: false, penjelasan: "Hitam paling sedikit." },
  ],
];
export const RONDE_DETEKTIF_QA: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["Ada 9 gambar kelereng", "skala 1", "bandingkan dengan puzzle 1"], jawab: "kelereng paling banyak", opsi: ["kelereng paling banyak", "puzzle paling banyak", "total 10"], salah: "Baca ulang gambar." },
  { klue: ["ungu 4, kuning 2, hitam 1, merah 5", "cari total"], jawab: "12 siswa", opsi: ["12 siswa", "5 siswa", "4 siswa"], salah: "Jumlahkan semua." },
  { klue: ["1 gambar = 4 siswa", "kelas punya 5 gambar"], jawab: "20 siswa", opsi: ["20 siswa", "5 siswa", "9 siswa"], salah: "Kalikan skala." },
];
export const PETA_KONSEP_QA = [
  {
    pusat: "Piktogram",
    kotak: [
      { label: "Definisi", opsi: ["diagram gambar", "hanya batang", "garis saja"], benar: 0 },
      { label: "Skala", opsi: ["1 gambar = n data", "tanpa arti", "warna acak"], benar: 0 },
      { label: "Baca", opsi: ["hitung gambar × skala", "tebak saja", "abaikan legenda"], benar: 0 },
      { label: "Tujuan", opsi: ["menyajikan & menafsirkan data", "mengukur volume", "menggambar bangunan"], benar: 0 },
    ],
  },
];
export const RONDE_CERITA_QA = RONDE_CERITA_CA;

/* ===== B: Diagram Batang ===== */
export type Batang = { id: string; label: string; nilai: number; arah: "tegak" | "mendatar" };
export const BATANG_TRANSPORT: Batang[] = DS_TRANSPORT.item.map((x) => ({ id: x.id, label: x.label, nilai: x.nilai, arah: "tegak" as const }));
export const BATANG_WARNA: Batang[] = DS_WARNA.item.map((x) => ({ id: x.id, label: x.label, nilai: x.nilai, arah: "tegak" as const }));
export const BATANG_BUKU: Batang[] = DS_BUKU.item.map((x) => ({ id: x.id, label: x.label, nilai: x.nilai, arah: "mendatar" as const }));
export const BATANG_MAINAN: Batang[] = DS_MAINAN.item.map((x) => ({ id: x.id, label: x.label, nilai: x.nilai, arah: "tegak" as const }));

export const RONDE_BACA_CB: { batang: Batang[]; tanya: string; jawab: number | string; opsi: (number | string)[]; pesan: string }[][] = [
  [
    { batang: BATANG_TRANSPORT, tanya: "Nilai jalan kaki?", jawab: 8, opsi: [8, 5, 3], pesan: "Baca tinggi batang." },
    { batang: BATANG_TRANSPORT, tanya: "Paling sedikit?", jawab: "becak/lain", opsi: ["becak/lain", "sepeda", "motor"], pesan: "Nilai 3." },
  ],
  [
    { batang: BATANG_WARNA, tanya: "Nilai merah?", jawab: 5, opsi: [5, 4, 1], pesan: "Batang tertinggi warna." },
    { batang: BATANG_WARNA, tanya: "Total?", jawab: 12, opsi: [12, 10, 15], pesan: "4+2+1+5." },
  ],
  [
    { batang: BATANG_BUKU, tanya: "Hari nilai 14?", jawab: "Rabu", opsi: ["Rabu", "Senin", "Sabtu"], pesan: "Batang Rabu." },
    { batang: BATANG_BUKU, tanya: "Kamis + Jumat?", jawab: 15, opsi: [15, 14, 11], pesan: "6+9=15." },
  ],
];
export const RONDE_JENIS_CB: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Diagram yang memakai batang persegi panjang disebut …", jawab: "diagram batang", opsi: ["diagram batang", "piktogram", "lingkaran saja"], pesan: "Definisi buku." },
    { tanya: "Sumbu mendatar biasanya memuat …", jawab: "nama kategori", opsi: ["nama kategori", "hanya warna", "judul buku"], pesan: "Sumbu datar = kategori." },
  ],
  [
    { tanya: "Sumbu tegak biasanya memuat …", jawab: "banyak / skala nilai", opsi: ["banyak / skala nilai", "nama siswa saja", "emoji"], pesan: "Sumbu tegak = nilai." },
    { tanya: "Batang mendatar berbeda dari tegak pada …", jawab: "arah batang", opsi: ["arah batang", "arti data", "skala wajib 10"], pesan: "Orientasi saja." },
  ],
  [
    { tanya: "Tinggi (atau panjang) batang mewakili …", jawab: "nilai data", opsi: ["nilai data", "warna pensil", "judul bab"], pesan: "Inti diagram batang." },
    { tanya: "Menyajikan data bisa dengan piktogram atau …", jawab: "diagram batang", opsi: ["diagram batang", "hanya puisi", "tanpa tabel"], pesan: "Dua bentuk buku Bab 6." },
  ],
];
export const RONDE_SORTIR_CB: { id: string; label: string; bin: "tegak" | "mendatar" }[][] = [
  [
    { id: "a", label: "batang naik ke atas", bin: "tegak" },
    { id: "b", label: "batang ke samping", bin: "mendatar" },
    { id: "c", label: "sumbu nilai di kiri vertikal", bin: "tegak" },
    { id: "d", label: "sumbu nilai di bawah horizontal", bin: "mendatar" },
    { id: "e", label: "kategori di sumbu X bawah", bin: "tegak" },
    { id: "f", label: "kategori di sumbu Y kiri", bin: "mendatar" },
  ],
  [
    { id: "a2", label: "tinggi batang = nilai", bin: "tegak" },
    { id: "b2", label: "panjang batang = nilai", bin: "mendatar" },
    { id: "c2", label: "transportasi tegak di buku", bin: "tegak" },
    { id: "d2", label: "aktivitas batang mendatar", bin: "mendatar" },
    { id: "e2", label: "kolom batang vertikal", bin: "tegak" },
    { id: "f2", label: "baris batang horizontal", bin: "mendatar" },
  ],
  [
    { id: "a3", label: "skala naik ke atas", bin: "tegak" },
    { id: "b3", label: "skala ke kanan", bin: "mendatar" },
    { id: "c3", label: "batang berdiri", bin: "tegak" },
    { id: "d3", label: "batang tidur", bin: "mendatar" },
    { id: "e3", label: "Y = banyak", bin: "tegak" },
    { id: "f3", label: "X = banyak", bin: "mendatar" },
  ],
];
export const RONDE_PASANG_CB: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "sumbu tegak", kanan: "banyak / nilai" },
    { kiri: "sumbu datar", kanan: "nama kategori" },
    { kiri: "diagram batang tegak", kanan: "batang ke atas" },
    { kiri: "diagram batang mendatar", kanan: "batang ke samping" },
  ],
  [
    { kiri: "jalan kaki 8", kanan: "batang tertinggi transport" },
    { kiri: "becak/lain 3", kanan: "batang terendah transport" },
    { kiri: "tinggi batang", kanan: "mewakili nilai" },
    { kiri: "skala sumbu", kanan: "langkah angka teratur" },
  ],
  [
    { kiri: "Rabu 14 buku", kanan: "batang pinjaman tertinggi" },
    { kiri: "Sabtu 5 buku", kanan: "batang pinjaman terendah" },
    { kiri: "bandingkan batang", kanan: "lihat tinggi/panjang" },
    { kiri: "total dari batang", kanan: "jumlahkan nilai" },
  ],
];
export const RONDE_MEMORI_CB = RONDE_PASANG_CB;
export const RONDE_KETUK_CB: { batang: Batang[]; tanya: string[] }[] = [
  { batang: BATANG_TRANSPORT, tanya: ["jalan kaki", "becak/lain", "sepeda"] },
  { batang: BATANG_WARNA, tanya: ["merah", "hitam", "ungu"] },
  { batang: BATANG_MAINAN, tanya: ["kelereng", "puzzle", "mobil"] },
];
export const RONDE_SEMUA_CB = RONDE_SORTIR_CB.map((ro) => ({
  jenis: ro[0].bin === "tegak" ? "tegak" : "mendatar",
  item: ro.map((s) => ({ id: s.id, label: s.label, bin: s.bin })),
}));
export const cocokArah = (x: { bin: string }, jenis: string) => x.bin === jenis;
export const RONDE_CERITA_CB: { teks: string; jawab: string | number; opsi: (string | number)[]; pesan: string }[][] = [
  [
    { teks: "Transport: jalan kaki 8, sepeda 5, motor 7, becak 3. Paling banyak?", jawab: "jalan kaki", opsi: ["jalan kaki", "motor", "sepeda"], pesan: "8 terbesar." },
    { teks: "Total transportasi?", jawab: 23, opsi: [23, 20, 25], pesan: "8+5+7+3=23." },
  ],
  [
    { teks: "Batang Rabu 14, Sabtu 5. Selisih?", jawab: 9, opsi: [9, 14, 5], pesan: "14−5=9." },
    { teks: "Kamis 6 + Jumat 9 = …", jawab: 15, opsi: [15, 16, 12], pesan: "6+9." },
  ],
  [
    { teks: "Sumbu tegak pada diagram batang tegak menyatakan …", jawab: "banyak", opsi: ["banyak", "nama kategori", "judul"], pesan: "Nilai di sumbu tegak." },
    { teks: "Batang mendatar membedakan arah, bukan …", jawab: "arti data", opsi: ["arti data", "panjang batang", "skala"], pesan: "Data sama, orientasi beda." },
  ],
];
export const RONDE_URUT_CB: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [8, 3, 7, 5], dari: "besar" },
  { angka: [14, 5, 10, 6], dari: "kecil" },
  { angka: [9, 1, 6, 4], dari: "besar" },
];
export const RONDE_BACA_PB = RONDE_BACA_CB;
export const RONDE_PASANG_PB = RONDE_PASANG_CB;
export const RONDE_MEMORI_PB = RONDE_MEMORI_CB;
export const RONDE_SORTIR_PB = RONDE_SORTIR_CB;
export const RONDE_SEMUA_PB = RONDE_SEMUA_CB;
export const RONDE_JENIS_PB = RONDE_JENIS_CB;
export const RONDE_TABEL_PB: { baris: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { baris: "jalan kaki", jawab: "8", opsi: ["8", "5", "3"], pesan: "Data transport." },
    { baris: "becak/lain", jawab: "3", opsi: ["3", "7", "5"], pesan: "Terkecil." },
  ],
  [
    { baris: "sumbu tegak", jawab: "banyak", opsi: ["banyak", "nama", "warna"], pesan: "Nilai." },
    { baris: "sumbu datar", jawab: "kategori", opsi: ["kategori", "volume", "luas"], pesan: "Nama." },
  ],
  [
    { baris: "Rabu", jawab: "14", opsi: ["14", "10", "5"], pesan: "Buku pinjaman." },
    { baris: "arah mendatar", jawab: "ke samping", opsi: ["ke samping", "ke atas", "melingkar"], pesan: "Batang mendatar." },
  ],
];
export const RONDE_BENARSALAH_QB: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Diagram batang memakai batang persegi panjang.", benar: true, penjelasan: "Definisi buku." },
    { teks: "Sumbu datar pada batang tegak biasanya kategori.", benar: true, penjelasan: "Benar." },
    { teks: "Batang mendatar tidak bisa dipakai untuk data yang sama.", benar: false, penjelasan: "Bisa; hanya arah berbeda." },
  ],
  [
    { teks: "Tinggi batang mewakili nilai.", benar: true, penjelasan: "Inti membaca batang." },
    { teks: "Piktogram dan diagram batang sama bentuknya.", benar: false, penjelasan: "Gambar vs batang." },
    { teks: "Skala sumbu harus teratur.", benar: true, penjelasan: "Agar perbandingan adil." },
  ],
];
export const RONDE_DETEKTIF_QB: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["batang jalan kaki tertinggi", "nilai 8", "banding becak 3"], jawab: "jalan kaki paling banyak", opsi: ["jalan kaki paling banyak", "becak paling banyak", "semua sama"], salah: "Bandingkan tinggi." },
  { klue: ["batang Rabu 14", "Sabtu 5", "cari hari 14"], jawab: "Rabu", opsi: ["Rabu", "Sabtu", "Senin"], salah: "Nilai 14." },
  { klue: ["sumbu tegak = banyak", "sumbu datar = nama", "batang ke atas"], jawab: "diagram batang tegak", opsi: ["diagram batang tegak", "piktogram", "diagram batang mendatar"], salah: "Orientasi tegak." },
];
export const PETA_KONSEP_QB = [
  {
    pusat: "Diagram Batang",
    kotak: [
      { label: "Bentuk", opsi: ["batang persegi panjang", "hanya emoji", "tanpa sumbu"], benar: 0 },
      { label: "Sumbu tegak", opsi: ["banyak / nilai", "nama kategori saja", "judul bab"], benar: 0 },
      { label: "Sumbu datar", opsi: ["nama kategori", "volume m³", "warna acak"], benar: 0 },
      { label: "Variasi", opsi: ["tegak atau mendatar", "hanya lingkaran", "tanpa skala"], benar: 0 },
    ],
  },
];
export const RONDE_CERITA_QB = RONDE_CERITA_CB;
