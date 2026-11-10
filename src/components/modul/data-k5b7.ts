/**
 * Data murni Matematika Kelas 5 Bab 7 (Bangun Datar): Sub-Bab A–B.
 * Sumber: Buku Siswa Matematika Kelas V Kemendikbudristek Bab 7 hlm. 193–233.
 * Tanpa React/jaringan. Uji: scripts/uji-statis-k5b7.mjs.
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
  jumlahSudut: 180,
  sudutSamaSisi: 60,
  contohBisa: [5, 6, 7],
  contohTidak: [5, 4, 12],
} as const;

// ========== A: Ciri Segitiga ==========
export const RONDE_HITUNG_CA: { label: string; hasil: number; pesan: string }[][] = [
  [
    { label: "jumlah sudut dalam segitiga", hasil: 180, pesan: "Angle Sum Property = 180°." },
    { label: "sudut segitiga sama sisi", hasil: 60, pesan: "180 ÷ 3 = 60°." },
  ],
  [
    { label: "5+6 dibanding 7 (bisa? 1=ya)", hasil: 1, pesan: "5+6=11 > 7 → bisa. Triangle Inequality." },
    { label: "5+4 dibanding 12 (bisa? 0=tidak)", hasil: 0, pesan: "5+4=9 < 12 → tidak bisa." },
  ],
  [
    { label: "simetri lipat sama kaki", hasil: 1, pesan: "Segitiga sama kaki punya 1 simetri lipat." },
    { label: "simetri putar sama sisi", hasil: 3, pesan: "Segitiga sama sisi punya 3 simetri putar." },
  ],
];
export const RONDE_ARTI_CA: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Syarat tiga sisi membentuk segitiga?", jawab: "jumlah dua sisi lebih dari sisi ketiga", opsi: ["jumlah dua sisi lebih dari sisi ketiga", "cukup ada tiga angka apa saja", "jumlah dua sisi kurang dari sisi ketiga"], pesan: "METODE LUAR · Triangle Inequality Theorem." },
    { tanya: "Jumlah sudut dalam segitiga?", jawab: "180 derajat", opsi: ["180 derajat", "90 derajat", "360 derajat"], pesan: "METODE LUAR · Angle Sum Property." },
  ],
  [
    { tanya: "Segitiga dengan satu sudut siku-siku disebut?", jawab: "segitiga siku-siku", opsi: ["segitiga siku-siku", "segitiga tumpul", "segitiga sembarang saja"], pesan: "Side-Angle Classification." },
    { tanya: "Segitiga tiga sisi sama panjang disebut?", jawab: "segitiga sama sisi", opsi: ["segitiga sama sisi", "segitiga sembarang", "trapesium"], pesan: "Klasifikasi sisi." },
  ],
  [
    { tanya: "Apakah segitiga sama sisi digolongkan sama kaki?", jawab: "ya, karena punya setidaknya 2 sisi sama", opsi: ["ya, karena punya setidaknya 2 sisi sama", "tidak pernah", "hanya jika ada sudut tumpul"], pesan: "METODE LUAR · Inclusive Triangle Hierarchy." },
    { tanya: "Mengapa tidak mungkin dua sudut tumpul dalam satu segitiga?", jawab: "jumlahnya sudah lebih dari 180°", opsi: ["jumlahnya sudah lebih dari 180°", "karena sisi harus sejajar", "karena wajib ada diagonal"], pesan: "Akibat Angle Sum." },
  ],
];
export const RONDE_SORTIR_CA: { id: string; label: string; bin: "ya" | "tidak" }[][] = [
  [
    { id: "a1", label: "sisi 5-6-7", bin: "ya" }, { id: "a2", label: "sisi 5-4-12", bin: "tidak" }, { id: "a3", label: "sisi 4-6-6", bin: "ya" },
    { id: "a4", label: "sisi 10-5-15", bin: "tidak" }, { id: "a5", label: "sisi 5-12-13", bin: "ya" }, { id: "a6", label: "sisi 2-3-9", bin: "tidak" },
  ],
  [
    { id: "b1", label: "3 sudut lancip", bin: "ya" }, { id: "b2", label: "2 sudut siku", bin: "tidak" }, { id: "b3", label: "1 sudut siku", bin: "ya" },
    { id: "b4", label: "2 sudut tumpul", bin: "tidak" }, { id: "b5", label: "1 sudut tumpul", bin: "ya" }, { id: "b6", label: "jumlah sudut 200°", bin: "tidak" },
  ],
  [
    { id: "c1", label: "sama sisi ⊂ sama kaki", bin: "ya" }, { id: "c2", label: "sama kaki pasti sama sisi", bin: "tidak" }, { id: "c3", label: "Angle Sum 180°", bin: "ya" },
    { id: "c4", label: "Inequality a+b<c boleh", bin: "tidak" }, { id: "c5", label: "sama sisi sudut 60°", bin: "ya" }, { id: "c6", label: "sembarang punya 3 lipat", bin: "tidak" },
  ],
];
export const RONDE_PASANG_CA: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "Triangle Inequality", kanan: "a+b>c" }, { kiri: "Angle Sum", kanan: "180°" },
    { kiri: "sama sisi", kanan: "3 sisi sama" }, { kiri: "sama kaki", kanan: "≥2 sisi sama" },
  ],
  [
    { kiri: "segitiga siku", kanan: "1 sudut 90°" }, { kiri: "segitiga tumpul", kanan: "1 sudut >90°" },
    { kiri: "segitiga lancip", kanan: "3 sudut <90°" }, { kiri: "sembarang", kanan: "sisi semua beda" },
  ],
  [
    { kiri: "Inclusive Hierarchy", kanan: "sama sisi ⊂ sama kaki" }, { kiri: "simetri sama kaki", kanan: "1 lipat" },
    { kiri: "simetri sama sisi", kanan: "3 lipat" }, { kiri: "sudut sama sisi", kanan: "60°" },
  ],
];
export const RONDE_MEMORI_CA = RONDE_PASANG_CA;
export const RONDE_KETUK_CA: { item: number[]; tanya: number[] }[] = [
  { item: [60, 90, 120, 180, 45, 30], tanya: [180, 60] },
  { item: [1, 2, 3, 60, 90, 180], tanya: [1, 3, 180] },
  { item: [60, 60, 60, 90, 45, 180], tanya: [60, 180] },
];
export const RONDE_SEMUA_CA: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "ciri syarat segitiga", item: [
    { id: "a", label: "a+b>c", cocok: true }, { id: "b", label: "a+c>b", cocok: true }, { id: "c", label: "a+b<c selalu", cocok: false }, { id: "d", label: "b+c>a", cocok: true },
  ]},
  { label: "ciri Angle Sum", item: [
    { id: "a", label: "jumlah 180°", cocok: true }, { id: "b", label: "paling satu siku", cocok: true }, { id: "c", label: "boleh dua tumpul", cocok: false }, { id: "d", label: "paling satu tumpul", cocok: true },
  ]},
  { label: "ciri hierarki inklusif", item: [
    { id: "a", label: "sama sisi adalah sama kaki", cocok: true }, { id: "b", label: "sama kaki belum tentu sama sisi", cocok: true }, { id: "c", label: "sembarang = sama sisi", cocok: false }, { id: "d", label: "sama sisi sudut 60°", cocok: true },
  ]},
];
export const RONDE_CERITA_CA: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "Panjang sedotan 5, 4, 12 cm. Bisa jadi segitiga?", jawab: "tidak", opsi: ["tidak", "ya", "selalu"], pesan: "5+4 < 12." },
    { teks: "Jumlah sudut dalam segitiga?", jawab: "180°", opsi: ["180°", "90°", "360°"], pesan: "Angle Sum." },
  ],
  [
    { teks: "Atap candi mirip segitiga tiga sisi sama. Nama?", jawab: "segitiga sama sisi", opsi: ["segitiga sama sisi", "trapesium", "layang-layang"], pesan: "Klasifikasi sisi." },
    { teks: "Satu sudut 100°, dua lainnya lancip. Jenis segitiga?", jawab: "segitiga tumpul", opsi: ["segitiga tumpul", "segitiga siku-siku", "segitiga lancip"], pesan: "Ada sudut tumpul." },
  ],
  [
    { teks: "Nisa: bolehkah sama sisi disebut sama kaki?", jawab: "boleh, karena ciri sama kaki terpenuhi", opsi: ["boleh, karena ciri sama kaki terpenuhi", "tidak boleh sama sekali", "hanya jika siku-siku"], pesan: "Inclusive Hierarchy." },
    { teks: "METODE LUAR Triangle Inequality menekankan?", jawab: "uji a+b>c sebelum membentuk", opsi: ["uji a+b>c sebelum membentuk", "abaikan panjang sisi", "wajib sudut 90°"], pesan: "Label metode." },
  ],
];
export const RONDE_URUT_CA: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [60, 180, 90, 45], dari: "kecil" },
  { angka: [180, 60, 120, 90], dari: "besar" },
  { angka: [1, 3, 2, 60], dari: "kecil" },
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
    { baris: "a+b>c", jawab: "bisa segitiga", opsi: ["bisa segitiga", "wajib trapesium", "sudut 360°"], pesan: "Inequality." },
    { baris: "jumlah sudut", jawab: "180°", opsi: ["180°", "90°", "270°"], pesan: "Angle Sum." },
  ],
  [
    { baris: "3 sisi sama", jawab: "sama sisi", opsi: ["sama sisi", "sembarang", "jajargenjang"], pesan: "Sisi." },
    { baris: "1 sudut 90°", jawab: "segitiga siku", opsi: ["segitiga siku", "segitiga tumpul", "persegi"], pesan: "Sudut." },
  ],
  [
    { baris: "sama sisi vs sama kaki", jawab: "sama sisi ⊂ sama kaki", opsi: ["sama sisi ⊂ sama kaki", "sama kaki ⊂ sama sisi selalu", "tidak berhubungan"], pesan: "Inclusive." },
    { baris: "sudut sama sisi", jawab: "60°", opsi: ["60°", "90°", "120°"], pesan: "180÷3." },
  ],
];
export const RONDE_BENARSALAH_QA: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Jumlah sudut dalam segitiga adalah 180°.", benar: true, penjelasan: "Angle Sum." },
    { teks: "Setiap tiga panjang pasti membentuk segitiga.", benar: false, penjelasan: "Harus a+b>c." },
    { teks: "Segitiga sama sisi juga sama kaki.", benar: true, penjelasan: "Inclusive Hierarchy." },
  ],
  [
    { teks: "Segitiga boleh punya dua sudut siku-siku.", benar: false, penjelasan: "2×90=180, sisi ketiga tidak punya sudut." },
    { teks: "Segitiga sembarang sisi-sisinya berbeda.", benar: true, penjelasan: "Definisi." },
    { teks: "Triangle Inequality: a+b harus lebih dari c.", benar: true, penjelasan: "Metode luar." },
  ],
];
export const RONDE_DETEKTIF_QA: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["tiga sudut", "impitkan", "sudut lurus"], jawab: "180°", opsi: ["180°", "90°", "360°"], salah: "Angle Sum." },
  { klue: ["5", "4", "12", "bisa?"], jawab: "tidak bisa", opsi: ["tidak bisa", "bisa", "kadang"], salah: "Inequality." },
  { klue: ["tiga sisi sama", "juga punya", "ciri sama kaki"], jawab: "hierarki inklusif", opsi: ["hierarki inklusif", "wajib siku", "bukan segitiga"], salah: "Inclusive." },
];
export const PETA_KONSEP_QA = [{
  pusat: "Ciri Segitiga",
  kotak: [
    { label: "Syarat sisi", opsi: ["a+b>c", "a+b<c", "hanya sudut"], benar: 0 },
    { label: "Jumlah sudut", opsi: ["180°", "90°", "360°"], benar: 0 },
    { label: "Sama sisi", opsi: ["3 sisi sama / 60°", "1 sisi saja", "tanpa sudut"], benar: 0 },
    { label: "Hierarki", opsi: ["sama sisi ⊂ sama kaki", "sama kaki ⊂ sama sisi wajib", "tidak terkait"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QA = RONDE_CERITA_CA;

// ========== B: Ciri Segi Empat ==========
export const RONDE_HITUNG_CB: { derajat: number; hasil: number; pesan: string }[][] = [
  [
    { derajat: 4, hasil: 4, pesan: "Segi empat punya 4 sisi." },
    { derajat: 1, hasil: 1, pesan: "Trapesium: setidaknya 1 pasang sisi sejajar." },
  ],
  [
    { derajat: 2, hasil: 2, pesan: "Jajargenjang: 2 pasang sisi berhadapan sejajar." },
    { derajat: 4, hasil: 4, pesan: "Persegi panjang: 4 sudut siku-siku." },
  ],
  [
    { derajat: 4, hasil: 4, pesan: "Belah ketupat / persegi: 4 sisi sama panjang." },
    { derajat: 2, hasil: 2, pesan: "Layang-layang: 2 pasang sisi berurutan sama." },
  ],
];
export const RONDE_RUMUS_CB: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Definisi trapesium menurut buku ini?", jawab: "segi empat dengan setidaknya sepasang sisi sejajar", opsi: ["segi empat dengan setidaknya sepasang sisi sejajar", "segi empat tanpa sisi sejajar", "segitiga dengan alas sejajar"], pesan: "METODE LUAR · Inclusive Trapezoid Definition." },
    { tanya: "Ciri utama jajargenjang?", jawab: "dua pasang sisi berhadapan sejajar", opsi: ["dua pasang sisi berhadapan sejajar", "hanya satu sisi", "tiga sudut siku saja"], pesan: "Eksplorasi 7.2C." },
  ],
  [
    { tanya: "Mengapa persegi panjang digolongkan jajargenjang?", jawab: "memiliki semua ciri jajargenjang plus siku-siku", opsi: ["memiliki semua ciri jajargenjang plus siku-siku", "karena namanya mirip", "karena tidak punya sudut"], pesan: "Inclusive Quadrilateral Hierarchy." },
    { tanya: "Persegi adalah?", jawab: "belah ketupat yang bersudut siku (juga PP)", opsi: ["belah ketupat yang bersudut siku (juga PP)", "trapesium tanpa sejajar", "segitiga sama sisi"], pesan: "Hierarki." },
  ],
  [
    { tanya: "Ciri layang-layang?", jawab: "dua pasang sisi berurutan sama panjang", opsi: ["dua pasang sisi berurutan sama panjang", "empat sudut siku wajib", "tanpa diagonal"], pesan: "Eksplorasi 7.2G." },
    { tanya: "METODE LUAR Property Comparison Matrix?", jawab: "bandingkan ciri satu per satu antar bangun", opsi: ["bandingkan ciri satu per satu antar bangun", "hafal nama tanpa ciri", "abaikan sisi sejajar"], pesan: "Van Hiele." },
  ],
];
export const RONDE_SORTIR_CB: { id: string; label: string; bin: "lancip" | "tumpul" }[][] = [
  [
    { id: "a1", label: "jajargenjang ⊂ trapesium", bin: "lancip" }, { id: "a2", label: "trapesium tanpa sejajar", bin: "tumpul" }, { id: "a3", label: "PP ⊂ jajargenjang", bin: "lancip" },
    { id: "a4", label: "persegi bukan belah ketupat", bin: "tumpul" }, { id: "a5", label: "BK ⊂ jajargenjang", bin: "lancip" }, { id: "a6", label: "layang wajib 4 siku", bin: "tumpul" },
  ],
  [
    { id: "b1", label: "≥1 pasang sejajar", bin: "lancip" }, { id: "b2", label: "0 pasang sejajar = trapesium", bin: "tumpul" }, { id: "b3", label: "4 sisi sama = BK", bin: "lancip" },
    { id: "b4", label: "persegi ≠ PP", bin: "tumpul" }, { id: "b5", label: "diagonal BK tegak lurus", bin: "lancip" }, { id: "b6", label: "JG selalu punya sumbu simetri", bin: "tumpul" },
  ],
  [
    { id: "c1", label: "Inclusive Hierarchy", bin: "lancip" }, { id: "c2", label: "hafal nama saja", bin: "tumpul" }, { id: "c3", label: "Property Matrix", bin: "lancip" },
    { id: "c4", label: "abaikan ciri sudut", bin: "tumpul" }, { id: "c5", label: "BK ⊂ layang-layang", bin: "lancip" }, { id: "c6", label: "segi empat = 3 sisi", bin: "tumpul" },
  ],
];
export const RONDE_PASANG_CB: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "trapesium", kanan: "≥1 sejajar" }, { kiri: "jajargenjang", kanan: "2 pasang sejajar" },
    { kiri: "persegi panjang", kanan: "4 sudut siku" }, { kiri: "belah ketupat", kanan: "4 sisi sama" },
  ],
  [
    { kiri: "persegi", kanan: "siku + sisi sama" }, { kiri: "layang-layang", kanan: "sisi berurutan sama" },
    { kiri: "PP ⊂ JG", kanan: "hierarki inklusif" }, { kiri: "BK ⊂ layang", kanan: "dua pasang berurutan" },
  ],
  [
    { kiri: "Inclusive Trapezoid", kanan: "definisi setidaknya sejajar" }, { kiri: "Van Hiele", kanan: "Property Comparison" },
    { kiri: "trapesium sama kaki", kanan: "1 simetri lipat" }, { kiri: "diagonal BK", kanan: "tegak lurus" },
  ],
];
export const RONDE_MEMORI_CB = RONDE_PASANG_CB;
export const RONDE_KETUK_CB: { item: number[]; tanya: number[] }[] = [
  { item: [1, 2, 3, 4, 5, 6], tanya: [1, 2, 4] },
  { item: [4, 2, 1, 3, 8, 0], tanya: [4, 2, 1] },
  { item: [4, 4, 2, 1, 90, 180], tanya: [4, 2] },
];
export const RONDE_SEMUA_CB: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "ciri trapesium (buku)", item: [
    { id: "a", label: "segi empat", cocok: true }, { id: "b", label: "≥1 pasang sejajar", cocok: true }, { id: "c", label: "wajib 3 sisi", cocok: false }, { id: "d", label: "boleh lebih dari 1 sejajar", cocok: true },
  ]},
  { label: "ciri jajargenjang", item: [
    { id: "a", label: "2 pasang sejajar", cocok: true }, { id: "b", label: "sisi hadap sama panjang", cocok: true }, { id: "c", label: "wajib 4 siku", cocok: false }, { id: "d", label: "sudut hadap sama", cocok: true },
  ]},
  { label: "hierarki benar", item: [
    { id: "a", label: "persegi ⊂ PP", cocok: true }, { id: "b", label: "persegi ⊂ BK", cocok: true }, { id: "c", label: "JG ⊂ persegi selalu", cocok: false }, { id: "d", label: "PP ⊂ JG", cocok: true },
  ]},
];
export const RONDE_CERITA_CB: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "Denah candi panjang 185 m lebar 165 m. Lebih tepat disebut?", jawab: "persegi panjang", opsi: ["persegi panjang", "persegi", "segitiga"], pesan: "Panjang ≠ lebar." },
    { teks: "Jajargenjang termasuk trapesium?", jawab: "ya, karena ≥1 pasang sejajar", opsi: ["ya, karena ≥1 pasang sejajar", "tidak pernah", "hanya jika siku"], pesan: "Inclusive Trapezoid." },
  ],
  [
    { teks: "Semua sudut siku dan sisi hadap sama. Bangun?", jawab: "persegi panjang", opsi: ["persegi panjang", "layang-layang saja", "segitiga siku"], pesan: "Ciri PP." },
    { teks: "Empat sisi sama dan ada sudut siku. Bangun?", jawab: "persegi", opsi: ["persegi", "trapesium sembarang", "segitiga sama sisi"], pesan: "Persegi = BK + siku." },
  ],
  [
    { teks: "Dua pasang sisi berurutan sama. Bangun?", jawab: "layang-layang", opsi: ["layang-layang", "hanya trapesium siku", "lingkaran"], pesan: "Kite." },
    { teks: "METODE LUAR Inclusive Quadrilateral Hierarchy menekankan?", jawab: "bangun khusus tetap anggota keluarga lebih umum", opsi: ["bangun khusus tetap anggota keluarga lebih umum", "setiap bangun terpisah total", "abaikan ciri sejajar"], pesan: "Van Hiele / Hierarchy." },
  ],
];
export const RONDE_URUT_CB: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [1, 4, 2, 3], dari: "kecil" },
  { angka: [4, 1, 3, 2], dari: "besar" },
  { angka: [2, 4, 1, 3], dari: "kecil" },
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
    { baris: "≥1 sejajar", jawab: "trapesium", opsi: ["trapesium", "segitiga", "lingkaran"], pesan: "Definisi." },
    { baris: "2 pasang sejajar", jawab: "jajargenjang", opsi: ["jajargenjang", "sembarang 3 sisi", "hanya layang"], pesan: "Ciri." },
  ],
  [
    { baris: "4 siku", jawab: "persegi panjang", opsi: ["persegi panjang", "segitiga tumpul", "trapesium tanpa sejajar"], pesan: "PP (persegi juga)." },
    { baris: "4 sisi sama", jawab: "belah ketupat", opsi: ["belah ketupat", "hanya trapesium siku", "segitiga sembarang"], pesan: "BK (persegi juga)." },
  ],
  [
    { baris: "siku + sisi sama", jawab: "persegi", opsi: ["persegi", "layang tanpa diagonal", "segitiga"], pesan: "Hierarki." },
    { baris: "sisi berurutan sama", jawab: "layang-layang", opsi: ["layang-layang", "wajib 3 sisi", "sudut penuh"], pesan: "Kite." },
  ],
];
export const RONDE_BENARSALAH_QB: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Trapesium punya setidaknya sepasang sisi sejajar.", benar: true, penjelasan: "Definisi buku." },
    { teks: "Persegi panjang tidak pernah jajargenjang.", benar: false, penjelasan: "PP ⊂ JG." },
    { teks: "Persegi adalah belah ketupat bersudut siku.", benar: true, penjelasan: "Hierarki." },
  ],
  [
    { teks: "Jajargenjang selalu punya sumbu simetri seperti trapesium sama kaki.", benar: false, penjelasan: "JG umumnya tanpa sumbu simetri." },
    { teks: "Belah ketupat termasuk jajargenjang.", benar: true, penjelasan: "4 sisi sama + sejajar hadap." },
    { teks: "Property Comparison Matrix membandingkan ciri, bukan hafal nama.", benar: true, penjelasan: "Van Hiele." },
  ],
];
export const RONDE_DETEKTIF_QB: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["setidaknya", "sepasang", "sejajar"], jawab: "trapesium", opsi: ["trapesium", "segitiga", "lingkaran"], salah: "Definisi." },
  { klue: ["empat sisi sama", "sudut siku", "nama"], jawab: "persegi", opsi: ["persegi", "trapesium sembarang", "segitiga sama kaki"], salah: "Hierarki." },
  { klue: ["dua pasang", "sisi berurutan", "sama"], jawab: "layang-layang", opsi: ["layang-layang", "hanya sudut 180°", "tanpa sisi"], salah: "Kite." },
];
export const PETA_KONSEP_QB = [{
  pusat: "Ciri Segi Empat",
  kotak: [
    { label: "Trapesium", opsi: ["≥1 sejajar", "0 sejajar", "3 sisi"], benar: 0 },
    { label: "Jajargenjang", opsi: ["2 pasang sejajar", "tanpa sisi", "hanya 1 sudut"], benar: 0 },
    { label: "Persegi", opsi: ["siku + sisi sama", "hanya tumpul", "3 sisi sama"], benar: 0 },
    { label: "Metode luar", opsi: ["Inclusive Hierarchy / Matrix", "abaikan ciri", "hafal warna"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QB = RONDE_CERITA_CB;
