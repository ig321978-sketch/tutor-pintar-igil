/**
 * Data murni Matematika Kelas 5 Bab 6 (Sudut): Sub-Bab A–D.
 * Sumber: Buku Siswa Matematika Kelas V Kemendikbudristek Bab 6 hlm. 163–189.
 * Tanpa React/jaringan. Uji: scripts/uji-statis-k5b6.mjs.
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
  siku: 90,
  lurus: 180,
  penuh: 360,
  nol: 0,
  contoh125: 125,
  jam1: 30,
  jam2: 60,
  jam3: 90,
  jam4: 120,
  jam6: 180,
} as const;

// ========== A: Sudut Siku-Siku ==========
export const RONDE_HITUNG_CA: { label: string; hasil: number; pesan: string }[][] = [
  [
    { label: "pojok bingkai siku", hasil: 90, pesan: "Sudut siku-siku = 90°. Right Angle Benchmark." },
    { label: "lipatan kertas siku", hasil: 90, pesan: "Paper Fold Benchmark menghasilkan 90°." },
  ],
  [
    { label: "penggaris siku-siku", hasil: 90, pesan: "Alat tukang kayu memastikan 90°." },
    { label: "persegi: tiap sudut", hasil: 90, pesan: "Keempat sudut persegi siku-siku." },
  ],
  [
    { label: "sudut siku baku", hasil: 90, pesan: "Benchmark 90°." },
    { label: "detektif: benar siku", hasil: 90, pesan: "Angle Detective: cocokkan dengan patokan 90°." },
  ],
];
export const RONDE_ARTI_CA: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Sudut siku-siku besarnya?", jawab: "90 derajat", opsi: ["90 derajat", "45 derajat", "180 derajat"], pesan: "Benchmark baku." },
    { tanya: "Cara cepat membuat patokan siku dari kertas?", jawab: "melipat kertas hingga sudut patokan terbentuk", opsi: ["melipat kertas hingga sudut patokan terbentuk", "menggambar lingkaran saja", "mengukur keliling"], pesan: "METODE LUAR · Paper Fold Benchmark." },
  ],
  [
    { tanya: "Penggaris siku-siku dipakai tukang kayu untuk?", jawab: "memastikan pojok bingkai tepat siku", opsi: ["memastikan pojok bingkai tepat siku", "menghitung luas lantai", "mengukur volume"], pesan: "Konteks buku." },
    { tanya: "Detektif Sudut bertugas?", jawab: "menemukan sudut lalu cek siku atau bukan", opsi: ["menemukan sudut lalu cek siku atau bukan", "menghitung keliling saja", "mewarnai peta"], pesan: "METODE LUAR · Angle Detective." },
  ],
  [
    { tanya: "Right Angle Benchmark artinya?", jawab: "90° dipakai sebagai patokan pembanding", opsi: ["90° dipakai sebagai patokan pembanding", "semua sudut sama 180°", "sudut tidak perlu dicek"], pesan: "METODE LUAR · Right Angle Benchmark." },
    { tanya: "Pojok bingkai foto yang benar biasanya?", jawab: "membentuk sudut siku-siku", opsi: ["membentuk sudut siku-siku", "selalu sudut tumpul", "tanpa titik sudut"], pesan: "Gambar 6.2." },
  ],
];
export const RONDE_SORTIR_CA: { id: string; label: string; bin: "ya" | "tidak" }[][] = [
  [
    { id: "a1", label: "pojok bingkai siku", bin: "ya" }, { id: "a2", label: "kipas terbuka lebar sekali", bin: "tidak" }, { id: "a3", label: "lipatan kertas patokan", bin: "ya" },
    { id: "a4", label: "sudut 45°", bin: "tidak" }, { id: "a5", label: "penggaris siku", bin: "ya" }, { id: "a6", label: "sudut 120°", bin: "tidak" },
  ],
  [
    { id: "b1", label: "90°", bin: "ya" }, { id: "b2", label: "180°", bin: "tidak" }, { id: "b3", label: "pojok meja siku", bin: "ya" },
    { id: "b4", label: "sudut lancip", bin: "tidak" }, { id: "b5", label: "sudut persegi", bin: "ya" }, { id: "b6", label: "sudut tumpul", bin: "tidak" },
  ],
  [
    { id: "c1", label: "Paper Fold 90°", bin: "ya" }, { id: "c2", label: "path length", bin: "tidak" }, { id: "c3", label: "Right Angle Benchmark", bin: "ya" },
    { id: "c4", label: "volume", bin: "tidak" }, { id: "c5", label: "detektif siku", bin: "ya" }, { id: "c6", label: "sudut 0°", bin: "tidak" },
  ],
];
export const RONDE_PASANG_CA: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "sudut siku-siku", kanan: "90°" }, { kiri: "penggaris siku", kanan: "cek pojok bingkai" },
    { kiri: "lipat kertas", kanan: "Paper Fold Benchmark" }, { kiri: "detektif sudut", kanan: "cari & bandingkan" },
  ],
  [
    { kiri: "pojok bingkai benar", kanan: "siku-siku" }, { kiri: "Right Angle Benchmark", kanan: "patokan 90°" },
    { kiri: "bukan siku", kanan: "≠ 90°" }, { kiri: "persegi", kanan: "4 sudut siku" },
  ],
  [
    { kiri: "Angle Detective", kanan: "temukan lalu uji" }, { kiri: "tukang kayu", kanan: "pakai penggaris siku" },
    { kiri: "patokan lipatan", kanan: "90°" }, { kiri: "sudut 45°", kanan: "lancip (bukan siku)" },
  ],
];
export const RONDE_MEMORI_CA = RONDE_PASANG_CA;
export const RONDE_KETUK_CA: { item: number[]; tanya: number[] }[] = [
  { item: [45, 60, 90, 120, 150, 180], tanya: [90, 90] },
  { item: [30, 90, 100, 135, 180, 270], tanya: [90] },
  { item: [0, 45, 90, 125, 180, 360], tanya: [90, 90] },
];
export const RONDE_SEMUA_CA: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "ciri sudut siku-siku", item: [
    { id: "a", label: "besarnya 90°", cocok: true }, { id: "b", label: "bisa dibuat lipat kertas", cocok: true }, { id: "c", label: "selalu 180°", cocok: false }, { id: "d", label: "patokan tukang kayu", cocok: true },
  ]},
  { label: "contoh siku di sekitar", item: [
    { id: "a", label: "pojok bingkai benar", cocok: true }, { id: "b", label: "pojok buku siku", cocok: true }, { id: "c", label: "kipas terbuka 150°", cocok: false }, { id: "d", label: "sudut persegi", cocok: true },
  ]},
  { label: "metode luar terkait A", item: [
    { id: "a", label: "Right Angle Benchmark", cocok: true }, { id: "b", label: "Paper Fold Benchmark", cocok: true }, { id: "c", label: "Composite Area", cocok: false }, { id: "d", label: "Angle Detective", cocok: true },
  ]},
];
export const RONDE_CERITA_CA: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "Besar sudut siku-siku?", jawab: "90°", opsi: ["90°", "45°", "180°"], pesan: "Benchmark." },
    { teks: "Mengapa tukang kayu memakai penggaris siku?", jawab: "memastikan pojok tepat 90°", opsi: ["memastikan pojok tepat 90°", "menghitung luas", "mewarnai kayu"], pesan: "Buku." },
  ],
  [
    { teks: "Lipatan kertas pada Eksplorasi 6.1 menghasilkan?", jawab: "sudut siku-siku patokan", opsi: ["sudut siku-siku patokan", "sudut nol", "sudut penuh"], pesan: "Paper Fold." },
    { teks: "Tugas Detektif Sudut?", jawab: "temukan sudut dan cek siku/bukan", opsi: ["temukan sudut dan cek siku/bukan", "hitung keliling saja", "gambar lingkaran"], pesan: "Angle Detective." },
  ],
  [
    { teks: "Pojok bingkai foto yang benar membentuk?", jawab: "sudut siku-siku", opsi: ["sudut siku-siku", "sudut tumpul saja", "tanpa sudut"], pesan: "Gambar 6.2." },
    { teks: "METODE LUAR Right Angle Benchmark menekankan?", jawab: "90° sebagai patokan banding", opsi: ["90° sebagai patokan banding", "semua sudut 360°", "abaikan ukuran"], pesan: "Label metode." },
  ],
];
export const RONDE_URUT_CA: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [45, 180, 90, 120], dari: "kecil" },
  { angka: [180, 45, 135, 90], dari: "besar" },
  { angka: [30, 90, 60, 150], dari: "kecil" },
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
    { baris: "sudut siku", jawab: "90°", opsi: ["90°", "45°", "180°"], pesan: "Benchmark." },
    { baris: "alat tukang", jawab: "penggaris siku", opsi: ["penggaris siku", "timbangan", "gelas ukur"], pesan: "Buku." },
  ],
  [
    { baris: "lipat kertas", jawab: "patokan 90°", opsi: ["patokan 90°", "luas", "keliling"], pesan: "Paper Fold." },
    { baris: "detektif", jawab: "cek siku/bukan", opsi: ["cek siku/bukan", "hitung volume", "acak"], pesan: "Detective." },
  ],
  [
    { baris: "pojok bingkai benar", jawab: "siku-siku", opsi: ["siku-siku", "tumpul saja", "nol"], pesan: "Konteks." },
    { baris: "≠ 90°", jawab: "bukan siku", opsi: ["bukan siku", "wajib siku", "penuh"], pesan: "Aturan." },
  ],
];
export const RONDE_BENARSALAH_QA: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Sudut siku-siku besarnya 90°.", benar: true, penjelasan: "Benar." },
    { teks: "Semua pojok benda otomatis siku-siku.", benar: false, penjelasan: "Harus dicek." },
    { teks: "Lipatan kertas bisa jadi patokan siku.", benar: true, penjelasan: "Paper Fold." },
  ],
  [
    { teks: "Penggaris siku membantu cek pojok bingkai.", benar: true, penjelasan: "Buku." },
    { teks: "Sudut 120° adalah siku-siku.", benar: false, penjelasan: "Itu tumpul." },
    { teks: "Angle Detective membandingkan dengan patokan 90°.", benar: true, penjelasan: "Metode luar." },
  ],
];
export const RONDE_DETEKTIF_QA: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["pojok bingkai", "tepat", "patokan"], jawab: "90°", opsi: ["90°", "45°", "180°"], salah: "Siku-siku." },
  { klue: ["lipat kertas", "merah di buku", "jenis"], jawab: "sudut siku-siku", opsi: ["sudut siku-siku", "sudut nol", "sudut penuh"], salah: "Paper Fold." },
  { klue: ["tukang kayu", "alat", "cek sudut"], jawab: "penggaris siku-siku", opsi: ["penggaris siku-siku", "timbangan", "meteran kain"], salah: "Buku." },
];
export const PETA_KONSEP_QA = [{
  pusat: "Sudut Siku-Siku",
  kotak: [
    { label: "Ukuran", opsi: ["90°", "45°", "180°"], benar: 0 },
    { label: "Patokan lipat", opsi: ["Paper Fold Benchmark", "luas petak", "keliling"], benar: 0 },
    { label: "Alat", opsi: ["penggaris siku", "gelas ukur", "timbangan"], benar: 0 },
    { label: "Metode luar", opsi: ["Right Angle / Detective", "Composite Area", "Isoperimetric"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QA = RONDE_CERITA_CA;

// ========== B: Pengertian & jenis sudut ==========
export const RONDE_HITUNG_CB: { derajat: number; hasil: number; pesan: string }[][] = [
  [
    { derajat: 45, hasil: 45, pesan: "45° < 90° → lancip." },
    { derajat: 90, hasil: 90, pesan: "90° → siku-siku." },
  ],
  [
    { derajat: 120, hasil: 120, pesan: "120° > 90° dan < 180° → tumpul." },
    { derajat: 60, hasil: 60, pesan: "60° lancip." },
  ],
  [
    { derajat: 150, hasil: 150, pesan: "150° tumpul." },
    { derajat: 30, hasil: 30, pesan: "30° lancip (jam 01.00 ≈ 30°)." },
  ],
];
export const RONDE_RUMUS_CB: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Definisi sudut menurut buku?", jawab: "daerah dibentuk dua garis bertemu di satu titik", opsi: ["daerah dibentuk dua garis bertemu di satu titik", "panjang keliling bangun", "luas petak saja"], pesan: "Vertex-Ray Model." },
    { tanya: "Titik pertemuan dua kaki sudut disebut?", jawab: "titik sudut", opsi: ["titik sudut", "diagonal", "pusat lingkaran saja"], pesan: "Bagian sudut." },
  ],
  [
    { tanya: "Sudut lebih kecil dari siku-siku disebut?", jawab: "sudut lancip", opsi: ["sudut lancip", "sudut tumpul", "sudut penuh"], pesan: "Klasifikasi buku." },
    { tanya: "Sudut lebih besar dari siku-siku (kurang dari 180°) disebut?", jawab: "sudut tumpul", opsi: ["sudut tumpul", "sudut lancip", "sudut nol"], pesan: "Klasifikasi." },
  ],
  [
    { tanya: "Dua garis yang membentuk sudut disebut?", jawab: "kaki sudut", opsi: ["kaki sudut", "tinggi segitiga", "diameter"], pesan: "Bagian." },
    { tanya: "METODE LUAR Acute-Right-Obtuse Classification?", jawab: "kelompokkan <90°, =90°, >90°(<180°)", opsi: ["kelompokkan <90°, =90°, >90°(<180°)", "hanya hitung luas", "abaikan ukuran"], pesan: "Label metode." },
  ],
];
export const RONDE_SORTIR_CB: { id: string; label: string; bin: "lancip" | "tumpul" }[][] = [
  [
    { id: "a1", label: "45°", bin: "lancip" }, { id: "a2", label: "120°", bin: "tumpul" }, { id: "a3", label: "30°", bin: "lancip" },
    { id: "a4", label: "150°", bin: "tumpul" }, { id: "a5", label: "60°", bin: "lancip" }, { id: "a6", label: "135°", bin: "tumpul" },
  ],
  [
    { id: "b1", label: "jam 02.00", bin: "lancip" }, { id: "b2", label: "gunting terbuka lebar", bin: "tumpul" }, { id: "b3", label: "sudut < 90°", bin: "lancip" },
    { id: "b4", label: "sudut > 90° <180°", bin: "tumpul" }, { id: "b5", label: "kipas sedikit terbuka", bin: "lancip" }, { id: "b6", label: "persimpangan lebar", bin: "tumpul" },
  ],
  [
    { id: "c1", label: "Acute", bin: "lancip" }, { id: "c2", label: "Obtuse", bin: "tumpul" }, { id: "c3", label: "75°", bin: "lancip" },
    { id: "c4", label: "110°", bin: "tumpul" }, { id: "c5", label: "20°", bin: "lancip" }, { id: "c6", label: "160°", bin: "tumpul" },
  ],
];
export const RONDE_PASANG_CB: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "titik sudut", kanan: "titik temu dua kaki" }, { kiri: "kaki sudut", kanan: "dua garis pembentuk" },
    { kiri: "lancip", kanan: "< 90°" }, { kiri: "tumpul", kanan: "> 90° dan < 180°" },
  ],
  [
    { kiri: "siku-siku", kanan: "90°" }, { kiri: "45°", kanan: "lancip" },
    { kiri: "120°", kanan: "tumpul" }, { kiri: "Vertex-Ray", kanan: "titik + dua sinar" },
  ],
  [
    { kiri: "jam 02.00", kanan: "lancip" }, { kiri: "pojok jendela siku", kanan: "90°" },
    { kiri: "Acute", kanan: "lancip" }, { kiri: "Obtuse", kanan: "tumpul" },
  ],
];
export const RONDE_MEMORI_CB = RONDE_PASANG_CB;
export const RONDE_KETUK_CB: { item: number[]; tanya: number[] }[] = [
  { item: [30, 45, 60, 90, 120, 150], tanya: [45, 90, 120] },
  { item: [20, 60, 90, 110, 135, 160], tanya: [60, 110] },
  { item: [30, 75, 90, 125, 150, 170], tanya: [30, 90, 150] },
];
export const RONDE_SEMUA_CB: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "bagian sudut benar", item: [
    { id: "a", label: "titik sudut", cocok: true }, { id: "b", label: "dua kaki sudut", cocok: true }, { id: "c", label: "hanya warna", cocok: false }, { id: "d", label: "daerah di antara kaki", cocok: true },
  ]},
  { label: "jenis benar", item: [
    { id: "a", label: "lancip < 90°", cocok: true }, { id: "b", label: "siku = 90°", cocok: true }, { id: "c", label: "tumpul = 0°", cocok: false }, { id: "d", label: "tumpul >90° <180°", cocok: true },
  ]},
  { label: "contoh klasifikasi", item: [
    { id: "a", label: "45° lancip", cocok: true }, { id: "b", label: "120° tumpul", cocok: true }, { id: "c", label: "90° lancip", cocok: false }, { id: "d", label: "60° lancip", cocok: true },
  ]},
];
export const RONDE_CERITA_CB: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "Sudut 45°. Jenis?", jawab: "lancip", opsi: ["lancip", "tumpul", "penuh"], pesan: "<90°." },
    { teks: "Sudut 120°. Jenis?", jawab: "tumpul", opsi: ["tumpul", "lancip", "nol"], pesan: ">90°." },
  ],
  [
    { teks: "Apa nama titik temu dua kaki sudut?", jawab: "titik sudut", opsi: ["titik sudut", "pusat bumi", "diagonal"], pesan: "Definisi." },
    { teks: "Jam 02.00 jarum membentuk sudut?", jawab: "lancip", opsi: ["lancip", "tumpul", "penuh"], pesan: "Contoh buku." },
  ],
  [
    { teks: "Pojok kotak pensil tanpa titik sudut jelas?", jawab: "belum tentu dihitung sebagai sudut ideal", opsi: ["belum tentu dihitung sebagai sudut ideal", "otomatis sudut penuh", "selalu 360°"], pesan: "Diskusi Yohana." },
    { teks: "Sudut 90°. Jenis?", jawab: "siku-siku", opsi: ["siku-siku", "lancip", "releks"], pesan: "Patokan." },
  ],
];
export const RONDE_URUT_CB: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [30, 150, 90, 60], dari: "kecil" },
  { angka: [160, 45, 120, 90], dari: "besar" },
  { angka: [45, 90, 60, 135], dari: "kecil" },
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
    { baris: "45°", jawab: "lancip", opsi: ["lancip", "tumpul", "penuh"], pesan: "Jenis." },
    { baris: "titik temu", jawab: "titik sudut", opsi: ["titik sudut", "alas", "tinggi"], pesan: "Bagian." },
  ],
  [
    { baris: "120°", jawab: "tumpul", opsi: ["tumpul", "lancip", "nol"], pesan: "Jenis." },
    { baris: "90°", jawab: "siku-siku", opsi: ["siku-siku", "releks", "nol"], pesan: "Jenis." },
  ],
  [
    { baris: "dua garis", jawab: "kaki sudut", opsi: ["kaki sudut", "diagonal saja", "volume"], pesan: "Bagian." },
    { baris: "Acute", jawab: "lancip", opsi: ["lancip", "tumpul", "lurus"], pesan: "Metode luar." },
  ],
];
export const RONDE_BENARSALAH_QB: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Sudut dibentuk dua garis bertemu di satu titik.", benar: true, penjelasan: "Definisi." },
    { teks: "Sudut lancip lebih besar dari 90°.", benar: false, penjelasan: "Lancip < 90°." },
    { teks: "Sudut tumpul lebih besar dari siku dan kurang dari 180°.", benar: true, penjelasan: "Benar." },
  ],
  [
    { teks: "Titik sudut adalah titik temu kaki sudut.", benar: true, penjelasan: "Bagian." },
    { teks: "90° disebut sudut tumpul.", benar: false, penjelasan: "Siku-siku." },
    { teks: "Jam 02.00 biasanya membentuk sudut lancip.", benar: true, penjelasan: "Contoh buku." },
  ],
];
export const RONDE_DETEKTIF_QB: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["lebih kecil", "dari siku", "nama"], jawab: "lancip", opsi: ["lancip", "tumpul", "penuh"], salah: "Buku." },
  { klue: ["120 derajat", "jenis"], jawab: "tumpul", opsi: ["tumpul", "lancip", "nol"], salah: ">90°." },
  { klue: ["titik temu", "dua kaki"], jawab: "titik sudut", opsi: ["titik sudut", "diameter", "luas"], salah: "Bagian." },
];
export const PETA_KONSEP_QB = [{
  pusat: "Pengertian Sudut",
  kotak: [
    { label: "Definisi", opsi: ["dua garis + titik temu", "hanya warna", "luas petak"], benar: 0 },
    { label: "Lancip", opsi: ["< 90°", "= 90°", "> 180°"], benar: 0 },
    { label: "Siku", opsi: ["= 90°", "< 45°", "= 360°"], benar: 0 },
    { label: "Tumpul", opsi: [">90° dan <180°", "= 0°", "= 360°"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QB = RONDE_CERITA_CB;

// ========== C: Mengukur & membandingkan ==========
export const RONDE_HITUNG_CC: { derajat: number; hasil: number; pesan: string }[][] = [
  [
    { derajat: 125, hasil: 125, pesan: "Contoh buku: bacaan busur 125°." },
    { derajat: 90, hasil: 90, pesan: "Ukur lipatan siku → 90°." },
  ],
  [
    { derajat: 30, hasil: 30, pesan: "Jam 01.00 ≈ 30° (30° per jam)." },
    { derajat: 90, hasil: 90, pesan: "Jam 03.00 = 90°." },
  ],
  [
    { derajat: 180, hasil: 180, pesan: "Sudut lurus = 180°." },
    { derajat: 360, hasil: 360, pesan: "Sudut penuh = 360°." },
  ],
];
export const RONDE_ARTI_CC: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Satuan besar sudut yang dipelajari?", jawab: "derajat (°)", opsi: ["derajat (°)", "meter", "kilogram"], pesan: "Buku." },
    { tanya: "Alat ukur sudut disebut?", jawab: "busur derajat", opsi: ["busur derajat", "timbangan", "gelas ukur"], pesan: "Protractor." },
  ],
  [
    { tanya: "Langkah awal mengukur sudut?", jawab: "letakkan pusat busur pada titik sudut", opsi: ["letakkan pusat busur pada titik sudut", "hitung keliling dulu", "gambar kubus"], pesan: "METODE LUAR · Protractor Reading Protocol." },
    { tanya: "Kaki yang berimpit garis dasar menunjukkan?", jawab: "0°", opsi: ["0°", "90°", "360°"], pesan: "Buku langkah 3." },
  ],
  [
    { tanya: "Sudut releks besarnya?", jawab: "lebih dari 180° dan kurang dari 360°", opsi: ["lebih dari 180° dan kurang dari 360°", "tepat 90°", "kurang dari 0°"], pesan: "Definisi buku." },
    { tanya: "Sudut lurus dan sudut penuh?", jawab: "180° dan 360°", opsi: ["180° dan 360°", "45° dan 60°", "10° dan 20°"], pesan: "Benchmark Angles." },
  ],
];
export const RONDE_SORTIR_CC: { id: string; label: string; bin: "ukur" | "bukan" }[][] = [
  [
    { id: "a1", label: "busur derajat", bin: "ukur" }, { id: "a2", label: "timbangan beras", bin: "bukan" }, { id: "a3", label: "skala derajat", bin: "ukur" },
    { id: "a4", label: "meteran kain saja", bin: "bukan" }, { id: "a5", label: "pusat busur di titik sudut", bin: "ukur" }, { id: "a6", label: "volume liter", bin: "bukan" },
  ],
  [
    { id: "b1", label: "125° bacaan", bin: "ukur" }, { id: "b2", label: "path length", bin: "bukan" }, { id: "b3", label: "banding kipas", bin: "ukur" },
    { id: "b4", label: "berat benda", bin: "bukan" }, { id: "b5", label: "derajat (°)", bin: "ukur" }, { id: "b6", label: "cm² luas", bin: "bukan" },
  ],
  [
    { id: "c1", label: "Protractor Protocol", bin: "ukur" }, { id: "c2", label: "Composite Area", bin: "bukan" }, { id: "c3", label: "Benchmark 90/180/360", bin: "ukur" },
    { id: "c4", label: "fencing only", bin: "bukan" }, { id: "c5", label: "sudut releks", bin: "ukur" }, { id: "c6", label: "nisbah uang", bin: "bukan" },
  ],
];
export const RONDE_PASANG_CC: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "satuan sudut", kanan: "derajat" }, { kiri: "alat", kanan: "busur derajat" },
    { kiri: "sudut lurus", kanan: "180°" }, { kiri: "sudut penuh", kanan: "360°" },
  ],
  [
    { kiri: "sudut nol", kanan: "0°" }, { kiri: "sudut releks", kanan: ">180° <360°" },
    { kiri: "contoh buku", kanan: "125°" }, { kiri: "jam 03.00", kanan: "90°" },
  ],
  [
    { kiri: "pusat busur", kanan: "di titik sudut" }, { kiri: "garis dasar", kanan: "berimpit kaki 0°" },
    { kiri: "Tari Pakarena", kanan: "banding lebar kipas" }, { kiri: "Protractor Reading", kanan: "baca skala kaki kedua" },
  ],
];
export const RONDE_MEMORI_CC = RONDE_PASANG_CC;
export const RONDE_KETUK_CC: { item: number[]; tanya: number[] }[] = [
  { item: [0, 90, 125, 180, 270, 360], tanya: [125, 90, 180] },
  { item: [30, 60, 90, 120, 180, 360], tanya: [30, 90] },
  { item: [0, 90, 125, 180, 270, 360], tanya: [0, 360, 180] },
];
export const RONDE_SEMUA_CC: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "langkah ukur benar", item: [
    { id: "a", label: "pusat di titik sudut", cocok: true }, { id: "b", label: "dasar berimpit satu kaki", cocok: true }, { id: "c", label: "abaikan skala", cocok: false }, { id: "d", label: "baca kaki kedua", cocok: true },
  ]},
  { label: "ukuran khusus benar", item: [
    { id: "a", label: "lurus 180°", cocok: true }, { id: "b", label: "penuh 360°", cocok: true }, { id: "c", label: "nol = 90°", cocok: false }, { id: "d", label: "releks >180° <360°", cocok: true },
  ]},
  { label: "konteks C", item: [
    { id: "a", label: "kipas Pakarena", cocok: true }, { id: "b", label: "busur derajat", cocok: true }, { id: "c", label: "hanya keliling pagar", cocok: false }, { id: "d", label: "banding lebar buka", cocok: true },
  ]},
];
export const RONDE_CERITA_CC: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "Contoh bacaan busur di buku?", jawab: "125°", opsi: ["125°", "10°", "400°"], pesan: "Gambar kipas." },
    { teks: "Alat ukur sudut?", jawab: "busur derajat", opsi: ["busur derajat", "timbangan", "termometer"], pesan: "Protractor." },
  ],
  [
    { teks: "Sudut lurus besarnya?", jawab: "180°", opsi: ["180°", "90°", "45°"], pesan: "Benchmark." },
    { teks: "Mengapa kipas Pakarena dibahas?", jawab: "membandingkan besar sudut buka", opsi: ["membandingkan besar sudut buka", "menghitung luas lantai", "mengukur berat"], pesan: "Konteks." },
  ],
  [
    { teks: "Sudut releks?", jawab: ">180° dan <360°", opsi: [">180° dan <360°", "tepat 90°", "<0°"], pesan: "Definisi." },
    { teks: "Jam 03.00 sudut jarum?", jawab: "90°", opsi: ["90°", "30°", "180°"], pesan: "30°×3." },
  ],
];
export const RONDE_URUT_CC: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [0, 360, 90, 180], dari: "kecil" },
  { angka: [360, 30, 180, 90], dari: "besar" },
  { angka: [30, 125, 90, 180], dari: "kecil" },
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
    { baris: "alat", jawab: "busur derajat", opsi: ["busur derajat", "timbangan", "gelas"], pesan: "Alat." },
    { baris: "contoh buku", jawab: "125°", opsi: ["125°", "10°", "400°"], pesan: "Bacaan." },
  ],
  [
    { baris: "lurus", jawab: "180°", opsi: ["180°", "90°", "0°"], pesan: "Jenis." },
    { baris: "penuh", jawab: "360°", opsi: ["360°", "180°", "90°"], pesan: "Jenis." },
  ],
  [
    { baris: "releks", jawab: ">180° <360°", opsi: [">180° <360°", "=90°", "=0°"], pesan: "Definisi." },
    { baris: "jam 1", jawab: "30°", opsi: ["30°", "90°", "180°"], pesan: "Clock." },
  ],
];
export const RONDE_BENARSALAH_QC: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Besar sudut diukur dalam derajat.", benar: true, penjelasan: "Benar." },
    { teks: "Busur derajat tidak perlu berimpit dengan kaki sudut.", benar: false, penjelasan: "Harus berimpit." },
    { teks: "Sudut penuh 360°.", benar: true, penjelasan: "Benar." },
  ],
  [
    { teks: "Sudut releks lebih dari 180° dan kurang dari 360°.", benar: true, penjelasan: "Buku." },
    { teks: "Sudut nol besarnya 90°.", benar: false, penjelasan: "0°." },
    { teks: "Kipas yang lebih lebar membentuk sudut lebih besar.", benar: true, penjelasan: "Pakarena." },
  ],
];
export const RONDE_DETEKTIF_QC: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["alat", "ukur sudut", "skala derajat"], jawab: "busur derajat", opsi: ["busur derajat", "timbangan", "termometer"], salah: "Protractor." },
  { klue: ["180 derajat", "nama jenis"], jawab: "sudut lurus", opsi: ["sudut lurus", "sudut nol", "sudut lancip"], salah: "Benchmark." },
  { klue: ["contoh buku", "kipas", "125"], jawab: "125°", opsi: ["125°", "25°", "360°"], salah: "Bacaan." },
];
export const PETA_KONSEP_QC = [{
  pusat: "Ukur Sudut",
  kotak: [
    { label: "Alat", opsi: ["busur derajat", "timbangan", "gelas ukur"], benar: 0 },
    { label: "Satuan", opsi: ["derajat", "meter", "liter"], benar: 0 },
    { label: "Lurus / Penuh", opsi: ["180° / 360°", "90° / 45°", "0° / 10°"], benar: 0 },
    { label: "Releks", opsi: [">180° <360°", "=90°", "<0°"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QC = RONDE_CERITA_CC;

// ========== D: Melukis sudut ==========
export const RONDE_HITUNG_CD: { target: number; hasil: number; pesan: string }[][] = [
  [
    { target: 30, hasil: 30, pesan: "Lukis 30° (latihan buku)." },
    { target: 75, hasil: 75, pesan: "Lukis 75°." },
  ],
  [
    { target: 90, hasil: 90, pesan: "Lukis siku 90°." },
    { target: 140, hasil: 140, pesan: "Lukis 140° (tumpul)." },
  ],
  [
    { target: 45, hasil: 45, pesan: "Lukis 45°." },
    { target: 110, hasil: 110, pesan: "Lukis 110°." },
  ],
];
export const RONDE_RUMUS_CD: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Langkah 1 melukis sudut?", jawab: "buat titik sudut dan satu kaki sudut", opsi: ["buat titik sudut dan satu kaki sudut", "langsung arsir tanpa titik", "hitung luas dulu"], pesan: "Buku D." },
    { tanya: "Langkah 2?", jawab: "letakkan pusat busur di titik sudut, dasar berimpit kaki", opsi: ["letakkan pusat busur di titik sudut, dasar berimpit kaki", "buang busur", "ukur keliling"], pesan: "Protractor Construction." },
  ],
  [
    { tanya: "Langkah 3?", jawab: "tadai ukuran derajat pada skala lalu hubungkan ke titik sudut", opsi: ["tadai ukuran derajat pada skala lalu hubungkan ke titik sudut", "tebak tanpa skala", "gambar lingkaran penuh saja"], pesan: "Construction Protocol." },
    { tanya: "METODE LUAR Constructing Angles menekankan?", jawab: "urut titik → busur → tanda → kaki kedua", opsi: ["urut titik → busur → tanda → kaki kedua", "acak langkah", "hanya warna"], pesan: "Label metode." },
  ],
  [
    { tanya: "Untuk 140° pastikan?", jawab: "memakai skala yang menjangkau 140°", opsi: ["memakai skala yang menjangkau 140°", "selalu baca 40° saja", "abaikan titik sudut"], pesan: "Hati-hati skala." },
    { tanya: "Setelah dua kaki digambar, sudutnya?", jawab: "daerah di antara dua kaki sesuai ukuran", opsi: ["daerah di antara dua kaki sesuai ukuran", "otomatis 360°", "hilang"], pesan: "Makna lukisan." },
  ],
];
export const RONDE_SORTIR_CD: { id: string; label: string; bin: "langkah" | "bukan" }[][] = [
  [
    { id: "a1", label: "buat titik sudut", bin: "langkah" }, { id: "a2", label: "hitung volume", bin: "bukan" }, { id: "a3", label: "pusat busur di titik", bin: "langkah" },
    { id: "a4", label: "tebak tanpa busur", bin: "bukan" }, { id: "a5", label: "tadai derajat", bin: "langkah" }, { id: "a6", label: "abaikan kaki", bin: "bukan" },
  ],
  [
    { id: "b1", label: "dasar berimpit kaki", bin: "langkah" }, { id: "b2", label: "path length saja", bin: "bukan" }, { id: "b3", label: "gambar kaki kedua", bin: "langkah" },
    { id: "b4", label: "acak titik", bin: "bukan" }, { id: "b5", label: "cek ukuran target", bin: "langkah" }, { id: "b6", label: "ukur berat", bin: "bukan" },
  ],
  [
    { id: "c1", label: "Construction Protocol", bin: "langkah" }, { id: "c2", label: "Composite Area", bin: "bukan" }, { id: "c3", label: "skala menjangkau target", bin: "langkah" },
    { id: "c4", label: "fencing only", bin: "bukan" }, { id: "c5", label: "titik → busur → tanda", bin: "langkah" }, { id: "c6", label: "nisbah uang", bin: "bukan" },
  ],
];
export const RONDE_PASANG_CD: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "langkah 1", kanan: "titik + kaki pertama" }, { kiri: "langkah 2", kanan: "pasang busur" },
    { kiri: "langkah 3", kanan: "tadai derajat" }, { kiri: "langkah 4", kanan: "gambar kaki kedua" },
  ],
  [
    { kiri: "30°", kanan: "lancip dilukis" }, { kiri: "90°", kanan: "siku dilukis" },
    { kiri: "140°", kanan: "tumpul dilukis" }, { kiri: "Construction", kanan: "urut protokol" },
  ],
  [
    { kiri: "52°", kanan: "latihan buku" }, { kiri: "110°", kanan: "latihan buku" },
    { kiri: "pusat busur", kanan: "tepat di titik sudut" }, { kiri: "salah umum", kanan: "skala salah baca" },
  ],
];
export const RONDE_MEMORI_CD = RONDE_PASANG_CD;
export const RONDE_KETUK_CD: { item: number[]; tanya: number[] }[] = [
  { item: [30, 45, 75, 90, 110, 140], tanya: [30, 90, 140] },
  { item: [52, 75, 83, 90, 112, 165], tanya: [75, 112] },
  { item: [30, 45, 90, 110, 140, 165], tanya: [45, 110, 165] },
];
export const RONDE_SEMUA_CD: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "urutan lukis benar", item: [
    { id: "a", label: "titik & kaki dulu", cocok: true }, { id: "b", label: "pasang busur", cocok: true }, { id: "c", label: "tebak tanpa tanda", cocok: false }, { id: "d", label: "hubung tanda ke titik", cocok: true },
  ]},
  { label: "ukuran latihan buku", item: [
    { id: "a", label: "30°", cocok: true }, { id: "b", label: "140°", cocok: true }, { id: "c", label: "400°", cocok: false }, { id: "d", label: "75°", cocok: true },
  ]},
  { label: "syarat akurat", item: [
    { id: "a", label: "pusat tepat", cocok: true }, { id: "b", label: "dasar berimpit", cocok: true }, { id: "c", label: "geser sembarangan", cocok: false }, { id: "d", label: "baca skala benar", cocok: true },
  ]},
];
export const RONDE_CERITA_CD: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "Langkah pertama melukis sudut?", jawab: "buat titik sudut dan satu kaki", opsi: ["buat titik sudut dan satu kaki", "arsir dulu", "hitung luas"], pesan: "Buku D." },
    { teks: "Target 90° yang digambar adalah?", jawab: "sudut siku-siku", opsi: ["sudut siku-siku", "sudut nol", "sudut releks"], pesan: "Jenis." },
  ],
  [
    { teks: "Setelah menadai 140° pada skala, langkah berikutnya?", jawab: "hubungkan tanda ke titik sudut", opsi: ["hubungkan tanda ke titik sudut", "hapus titik sudut", "ganti satuan ke meter"], pesan: "Protocol." },
    { teks: "METODE LUAR Constructing Angles?", jawab: "ikuti urutan protokol busur", opsi: ["ikuti urutan protokol busur", "gambar acak", "abaikan derajat"], pesan: "Label." },
  ],
  [
    { teks: "Latihan buku memuat sudut?", jawab: "30°, 75°, 110°, 140°, dll.", opsi: ["30°, 75°, 110°, 140°, dll.", "hanya 0°", "hanya 1000°"], pesan: "Ayo Berlatih." },
    { teks: "Kesalahan umum saat melukis?", jawab: "pusat busur tidak di titik sudut", opsi: ["pusat busur tidak di titik sudut", "terlalu rapi", "skala terlalu jelas"], pesan: "Cek." },
  ],
];
export const RONDE_URUT_CD: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [30, 140, 75, 90], dari: "kecil" },
  { angka: [165, 45, 110, 75], dari: "besar" },
  { angka: [52, 90, 83, 140], dari: "kecil" },
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
    { baris: "langkah 1", jawab: "titik+kaki", opsi: ["titik+kaki", "arsir dulu", "volume"], pesan: "Urut." },
    { baris: "target siku", jawab: "90°", opsi: ["90°", "45°", "180°"], pesan: "Ukuran." },
  ],
  [
    { baris: "140°", jawab: "tumpul", opsi: ["tumpul", "lancip", "nol"], pesan: "Jenis." },
    { baris: "alat lukis", jawab: "busur derajat", opsi: ["busur derajat", "timbangan", "gelas"], pesan: "Alat." },
  ],
  [
    { baris: "tadai skala", jawab: "lalu hubungkan", opsi: ["lalu hubungkan", "hapus titik", "stop"], pesan: "Protocol." },
    { baris: "salah umum", jawab: "pusat meleset", opsi: ["pusat meleset", "terlalu tepat", "skala jelas"], pesan: "Cek." },
  ],
];
export const RONDE_BENARSALAH_QD: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Melukis sudut dimulai dari titik sudut dan satu kaki.", benar: true, penjelasan: "Buku." },
    { teks: "Busur derajat boleh dipasang jauh dari titik sudut.", benar: false, penjelasan: "Harus di titik." },
    { teks: "Setelah menadai derajat, kaki kedua digambar ke titik sudut.", benar: true, penjelasan: "Protocol." },
  ],
  [
    { teks: "30° dan 140° ada di latihan melukis buku.", benar: true, penjelasan: "Ayo Berlatih." },
    { teks: "Melukis sudut tidak membutuhkan busur derajat.", benar: false, penjelasan: "Butuh untuk akurat." },
    { teks: "Construction Protocol menjaga urutan langkah.", benar: true, penjelasan: "Metode luar." },
  ],
];
export const RONDE_DETEKTIF_QD: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["awal lukis", "titik", "satu kaki"], jawab: "langkah 1", opsi: ["langkah 1", "langkah terakhir", "hapus gambar"], salah: "Buku." },
  { klue: ["target", "siku", "derajat"], jawab: "90°", opsi: ["90°", "45°", "180°"], salah: "Siku." },
  { klue: ["tadai 140", "lalu"], jawab: "hubungkan ke titik sudut", opsi: ["hubungkan ke titik sudut", "buang busur saja", "ukur luas"], salah: "Protocol." },
];
export const PETA_KONSEP_QD = [{
  pusat: "Melukis Sudut",
  kotak: [
    { label: "Awal", opsi: ["titik + kaki", "arsir dulu", "hitung luas"], benar: 0 },
    { label: "Alat", opsi: ["busur derajat", "timbangan", "gelas"], benar: 0 },
    { label: "Tandai", opsi: ["derajat di skala", "warna saja", "abaikan"], benar: 0 },
    { label: "Akhir", opsi: ["kaki kedua ke titik", "hapus titik", "stop di 0"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QD = RONDE_CERITA_CD;
