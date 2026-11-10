/**
 * Data murni Matematika Kelas 5 Bab 4 (Keliling Bangun Datar): Sub-Bab A–E.
 * Sumber: Buku Siswa Matematika Kelas V Kemendikbudristek Bab 4 hlm. 105–130.
 * Tanpa React/jaringan. Uji: scripts/uji-statis-k5b4.mjs.
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

export const jumlahSisi = (...sisi: number[]) => sisi.reduce((a, b) => a + b, 0);
export const kelilingPersegi = (s: number) => 4 * s;
export const kelilingPersegiPanjang = (p: number, l: number) => 2 * (p + l);
export const kelilingSegitiga = (a: number, b: number, c: number) => a + b + c;
export const kelilingSegitigaSamaSisi = (s: number) => 3 * s;
export const kelilingSegiN = (n: number, s: number) => n * s;

export const ANGKA_BUKU = {
  persegi4: 16, // 4+4+4+4
  segitiga547: 16, // 5+4+7
  samaSisi5: 15, samaSisi6: 18,
  pp53: 16, // 2(5+3)
  segiLima3: 15, // 5×3
  segiEnamContoh: 24, // contoh 6×4
} as const;

// ========== A: Konsep Keliling ==========
export const RONDE_HITUNG_CA: { sisi: number[]; hasil: number; pesan: string }[][] = [
  [
    { sisi: [4, 4, 4, 4], hasil: 16, pesan: "Path Length: jumlah sisi = panjang jalur luar." },
    { sisi: [5, 3, 5, 3], hasil: 16, pesan: "Jalur PP: 5+3+5+3=16 (bukan luas 15)." },
  ],
  [
    { sisi: [2, 2, 2, 2], hasil: 8, pesan: "Path Length persegi: 2+2+2+2=8." },
    { sisi: [6, 4, 6, 4], hasil: 20, pesan: "Jalur 6+4+6+4=20; bandingkan dengan luas 24." },
  ],
  [
    { sisi: [3, 4, 5], hasil: 12, pesan: "Side Sum segitiga: 3+4+5=12." },
    { sisi: [7, 7, 7, 7], hasil: 28, pesan: "Persegi: Path Length 4×7=28, bukan luas 49." },
  ],
];
export const RONDE_ARTI_CA: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Keliling bangun datar adalah?", jawab: "jumlah panjang semua sisinya", opsi: ["jumlah panjang semua sisinya", "luas daerah dalamnya", "banyak sudut saja"], pesan: "Path Length: jumlah panjang sisi = jalur tepi." },
    { tanya: "Menghitung keliling berguna untuk?", jawab: "panjang pagar/bingkai/batas luar", opsi: ["panjang pagar/bingkai/batas luar", "isi cairan saja", "warna cat dalam"], pesan: "Fencing Context: pagar/bingkai butuh jalur luar." },
  ],
  [
    { tanya: "Benteng Baluwarti dihitung kelilingnya karena?", jawab: "mengetahui panjang keseluruhan batas luar", opsi: ["mengetahui panjang keseluruhan batas luar", "menghitung luas lantai saja", "menghitung volume"], pesan: "Baluwarti: panjang dinding luar, bukan luas dalam." },
    { tanya: "Jika sisi-sisi diketahui, keliling dihitung dengan?", jawab: "menjumlahkan semua sisi", opsi: ["menjumlahkan semua sisi", "mengalikan luas", "membagi dua"], pesan: "Side Sum / Path Length: jumlahkan semua sisi jalur." },
  ],
  [
    { tanya: "Bingkai foto membutuhkan?", jawab: "keliling sebagai panjang kayu", opsi: ["keliling sebagai panjang kayu", "luas foto saja", "diagonal saja"], pesan: "Fencing: panjang kayu bingkai = keliling." },
    { tanya: "Pagar rumah mengelilingi?", jawab: "batas luar tanah/rumah", opsi: ["batas luar tanah/rumah", "hanya pintu", "atap"], pesan: "Fencing Context: pagar mengelilingi batas luar." },
  ],
];
export const RONDE_SORTIR_CA: { id: string; label: string; bin: "ya" | "tidak" }[][] = [
  [
    { id: "a1", label: "4+4+4+4", bin: "ya" }, { id: "a2", label: "luas 4×4", bin: "tidak" }, { id: "a3", label: "5+3+5+3", bin: "ya" },
    { id: "a4", label: "isi bangku", bin: "tidak" }, { id: "a5", label: "2+2+2+2", bin: "ya" }, { id: "a6", label: "volume", bin: "tidak" },
  ],
  [
    { id: "b1", label: "pagar luar", bin: "ya" }, { id: "b2", label: "cat lantai", bin: "tidak" }, { id: "b3", label: "bingkai foto", bin: "ya" },
    { id: "b4", label: "isi kolam", bin: "tidak" }, { id: "b5", label: "batas benteng", bin: "ya" }, { id: "b6", label: "berat batu", bin: "tidak" },
  ],
  [
    { id: "c1", label: "jumlah sisi", bin: "ya" }, { id: "c2", label: "hasil kali panjang×lebar", bin: "tidak" }, { id: "c3", label: "keliling=16", bin: "ya" },
    { id: "c4", label: "sudut saja", bin: "tidak" }, { id: "c5", label: "batas luar", bin: "ya" }, { id: "c6", label: "isi ruang", bin: "tidak" },
  ],
];
export const RONDE_PASANG_CA: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "arti keliling", kanan: "jumlah panjang sisi" }, { kiri: "4+4+4+4", kanan: "16" },
    { kiri: "pagar rumah", kanan: "batas luar" }, { kiri: "bingkai foto", kanan: "panjang kayu" },
  ],
  [
    { kiri: "Benteng Baluwarti", kanan: "Yogyakarta" }, { kiri: "5+3+5+3", kanan: "16" },
    { kiri: "bukan keliling", kanan: "luas daerah" }, { kiri: "cara dasar", kanan: "jumlahkan sisi" },
  ],
  [
    { kiri: "2+2+2+2", kanan: "8" }, { kiri: "6+4+6+4", kanan: "20" },
    { kiri: "denah benteng", kanan: "gabungan bangun" }, { kiri: "keliling dipakai untuk", kanan: "batas/pagar/bingkai" },
  ],
];
export const RONDE_MEMORI_CA = RONDE_PASANG_CA;
export const RONDE_KETUK_CA: { item: number[]; tanya: number[] }[] = [
  { item: [8, 12, 16, 20, 24, 28], tanya: [16, 8, 20] },
  { item: [10, 14, 16, 18, 22, 30], tanya: [16, 14] },
  { item: [4, 8, 12, 16, 20, 24], tanya: [12, 16, 24] },
];
export const RONDE_SEMUA_CA: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "cara menghitung keliling", item: [
    { id: "a", label: "jumlahkan semua sisi", cocok: true }, { id: "b", label: "kali panjang×lebar", cocok: false }, { id: "c", label: "4×sisi (persegi)", cocok: true }, { id: "d", label: "ukur batas luar", cocok: true },
  ]},
  { label: "contoh aplikasi keliling", item: [
    { id: "a", label: "pagar", cocok: true }, { id: "b", label: "bingkai", cocok: true }, { id: "c", label: "isi bak", cocok: false }, { id: "d", label: "batas benteng", cocok: true },
  ]},
  { label: "hasil keliling benar", item: [
    { id: "a", label: "4+4+4+4=16", cocok: true }, { id: "b", label: "5+3+5+3=16", cocok: true }, { id: "c", label: "2+2+2+2=10", cocok: false }, { id: "d", label: "6+4+6+4=20", cocok: true },
  ]},
];
export const RONDE_CERITA_CA: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "Persegi sisi 4 cm. Keliling?", jawab: "16", opsi: ["16", "8", "12"], pesan: "Path Length: 4+4+4+4=16; 4×4 adalah luas." },
    { teks: "Apa arti keliling bangun datar?", jawab: "jumlah panjang sisi", opsi: ["jumlah panjang sisi", "luas dalam", "banyak titik"], pesan: "Keliling = panjang jalur sisi luar." },
  ],
  [
    { teks: "Untuk membuat bingkai foto, yang dihitung?", jawab: "keliling", opsi: ["keliling", "luas saja", "volume"], pesan: "Fencing/bingkai: hitung keliling, bukan luas foto." },
    { teks: "Persegi panjang 6 dan 4. Keliling?", jawab: "20", opsi: ["20", "24", "10"], pesan: "Rectangle formula 2(6+4)=20 = jalur luar." },
  ],
  [
    { teks: "Mengapa pemugaran benteng perlu keliling?", jawab: "tahu panjang batas luar", opsi: ["tahu panjang batas luar", "tahu isi benteng", "tahu tinggi menara"], pesan: "Outer path benteng: panjang batas luar." },
    { teks: "3+4+5 keliling?", jawab: "12", opsi: ["12", "15", "7"], pesan: "Side Sum: jumlahkan sisi jalur." },
  ],
];
export const RONDE_URUT_CA: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [8, 20, 16, 12], dari: "kecil" },
  { angka: [28, 16, 8, 20], dari: "besar" },
  { angka: [12, 16, 15, 18], dari: "kecil" },
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
    { baris: "4+4+4+4", jawab: "16", opsi: ["16", "8", "12"], pesan: "Path Length: jumlah sisi jalur." },
    { baris: "arti keliling", jawab: "jumlah sisi", opsi: ["jumlah sisi", "luas", "sudut"], pesan: "Keliling = panjang jalur sisi luar." },
  ],
  [
    { baris: "5+3+5+3", jawab: "16", opsi: ["16", "15", "8"], pesan: "Jalur PP: jumlah empat sisi." },
    { baris: "aplikasi", jawab: "pagar/bingkai", opsi: ["pagar/bingkai", "isi bak", "berat"], pesan: "Fencing: pagar/bingkai = keliling." },
  ],
  [
    { baris: "2(6+4)", jawab: "20", opsi: ["20", "24", "10"], pesan: "Rumus = jalan pintas Path Length." },
    { baris: "bukan keliling", jawab: "luas", opsi: ["luas", "batas luar", "jumlah sisi"], pesan: "Perimeter vs Area: luas ≠ keliling." },
  ],
];
export const RONDE_BENARSALAH_QA: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Keliling adalah jumlah panjang semua sisi.", benar: true, penjelasan: "Benar." },
    { teks: "Keliling sama dengan luas daerah.", benar: false, penjelasan: "Berbeda." },
    { teks: "4+4+4+4 = 16 adalah keliling persegi sisi 4.", benar: true, penjelasan: "Benar." },
  ],
  [
    { teks: "Pagar dan bingkai memakai konsep keliling.", benar: true, penjelasan: "Aplikasi." },
    { teks: "Keliling dihitung dengan panjang × lebar saja.", benar: false, penjelasan: "Itu luas." },
    { teks: "Batas luar benteng terkait keliling.", benar: true, penjelasan: "Baluwarti." },
  ],
];
export const RONDE_DETEKTIF_QA: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["empat sisi", "masing-masing 4", "jumlah"], jawab: "16", opsi: ["16", "8", "12"], salah: "Jumlahkan." },
  { klue: ["pagar", "batas luar", "konsep"], jawab: "keliling", opsi: ["keliling", "luas", "volume"], salah: "Batas luar." },
  { klue: ["5 dan 3", "berhadapan sama", "keliling PP"], jawab: "16", opsi: ["16", "15", "8"], salah: "2(p+l)." },
];
export const PETA_KONSEP_QA = [{
  pusat: "Keliling",
  kotak: [
    { label: "Arti", opsi: ["jumlah panjang sisi", "luas dalam", "banyak sudut"], benar: 0 },
    { label: "Cara dasar", opsi: ["jumlahkan semua sisi", "kali p×l", "bagi 2"], benar: 0 },
    { label: "Contoh 4 sisi 4", opsi: ["16", "8", "4"], benar: 0 },
    { label: "Pakai untuk", opsi: ["pagar/bingkai/batas", "isi cairan", "berat benda"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QA = RONDE_CERITA_CA;

// ========== B: Segitiga ==========
export const RONDE_HITUNG_CB: { sisi: number[]; hasil: number; pesan: string }[][] = [
  [
    { sisi: [5, 4, 7], hasil: 16, pesan: "Side Sum Path Length: 5+4+7=16." },
    { sisi: [5, 5, 5], hasil: 15, pesan: "Equilateral shortcut: 3×5 karena ketiga sisi sama." },
  ],
  [
    { sisi: [6, 6, 6], hasil: 18, pesan: "Equilateral: 3×6=18 = jalur tiga sisi." },
    { sisi: [3, 4, 5], hasil: 12, pesan: "Side Sum siku-siku: 3+4+5=12." },
  ],
  [
    { sisi: [8, 5, 5], hasil: 18, pesan: "Isosceles: dua kaki sama; tetap jumlahkan ketiga sisi." },
    { sisi: [7, 7, 7], hasil: 21, pesan: "Equilateral shortcut: 3×7=21." },
  ],
];
export const RONDE_RUMUS_CB: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Keliling segitiga sembarang?", jawab: "sisi1 + sisi2 + sisi3", opsi: ["sisi1 + sisi2 + sisi3", "3 × salah satu sisi saja selalu", "alas × tinggi"], pesan: "Side Sum segitiga: 3+4+5=12." },
    { tanya: "Keliling segitiga sama sisi?", jawab: "3 × panjang sisi", opsi: ["3 × panjang sisi", "2 × sisi", "sisi × sisi"], pesan: "Hanya bila ketiga sisi sama boleh 3×sisi." },
  ],
  [
    { tanya: "Jika sisi 5 cm sama sisi, keliling?", jawab: "15 cm", opsi: ["15 cm", "10 cm", "25 cm"], pesan: "Equilateral Path Length: 3×5." },
    { tanya: "Tanda sisi sama pada gambar berarti?", jawab: "panjang sisi sama", opsi: ["panjang sisi sama", "sudut 90°", "luas sama"], pesan: "Sesuai buku: tanda sisi sama = panjang sama." },
  ],
  [
    { tanya: "5+4+7 = ?", jawab: "16", opsi: ["16", "14", "20"], pesan: "Side Sum contoh buku: 5+4+7=16." },
    { tanya: "Sama sisi sisi 6 cm?", jawab: "18", opsi: ["18", "12", "36"], pesan: "Equilateral: 3×6=18." },
  ],
];
export const RONDE_SORTIR_CB: { id: string; label: string; bin: "sama" | "bebas" }[][] = [
  [
    { id: "a1", label: "5+5+5", bin: "sama" }, { id: "a2", label: "5+4+7", bin: "bebas" }, { id: "a3", label: "6+6+6", bin: "sama" },
    { id: "a4", label: "3+4+5", bin: "bebas" }, { id: "a5", label: "7+7+7", bin: "sama" }, { id: "a6", label: "8+5+5", bin: "bebas" },
  ],
  [
    { id: "b1", label: "3 × sisi", bin: "sama" }, { id: "b2", label: "a+b+c", bin: "bebas" }, { id: "b3", label: "semua sisi sama", bin: "sama" },
    { id: "b4", label: "sisi berbeda", bin: "bebas" }, { id: "b5", label: "keliling 15 dari sisi 5", bin: "sama" }, { id: "b6", label: "keliling 16 dari 5,4,7", bin: "bebas" },
  ],
  [
    { id: "c1", label: "sama sisi", bin: "sama" }, { id: "c2", label: "sembarang", bin: "bebas" }, { id: "c3", label: "kali 3", bin: "sama" },
    { id: "c4", label: "jumlah tiga berbeda", bin: "bebas" }, { id: "c5", label: "6+6+6=18", bin: "sama" }, { id: "c6", label: "3+4+5=12", bin: "bebas" },
  ],
];
export const RONDE_PASANG_CB: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "5+4+7", kanan: "16" }, { kiri: "3 × 5", kanan: "15" },
    { kiri: "rumus sama sisi", kanan: "3 × sisi" }, { kiri: "rumus sembarang", kanan: "a+b+c" },
  ],
  [
    { kiri: "3 × 6", kanan: "18" }, { kiri: "3+4+5", kanan: "12" },
    { kiri: "tanda sisi sama", kanan: "panjang sama" }, { kiri: "7+7+7", kanan: "21" },
  ],
  [
    { kiri: "8+5+5", kanan: "18" }, { kiri: "banyak sisi segitiga", kanan: "3" },
    { kiri: "sama kaki contoh", kanan: "dua sisi sama" }, { kiri: "keliling satuan", kanan: "cm" },
  ],
];
export const RONDE_MEMORI_CB = RONDE_PASANG_CB;
export const RONDE_KETUK_CB: { item: number[]; tanya: number[] }[] = [
  { item: [12, 15, 16, 18, 21, 24], tanya: [16, 15, 18] },
  { item: [10, 12, 15, 18, 20, 21], tanya: [12, 21] },
  { item: [15, 16, 18, 20, 21, 24], tanya: [15, 16, 18] },
];
export const RONDE_SEMUA_CB: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "keliling segitiga benar", item: [
    { id: "a", label: "5+4+7=16", cocok: true }, { id: "b", label: "3×5=15", cocok: true }, { id: "c", label: "5+4+7=14", cocok: false }, { id: "d", label: "3×6=18", cocok: true },
  ]},
  { label: "ciri sama sisi", item: [
    { id: "a", label: "tiga sisi sama", cocok: true }, { id: "b", label: "keliling=3×sisi", cocok: true }, { id: "c", label: "hanya dua sisi sama", cocok: false }, { id: "d", label: "boleh dikali 3", cocok: true },
  ]},
  { label: "rumus yang sah", item: [
    { id: "a", label: "a+b+c", cocok: true }, { id: "b", label: "3×sisi (sama sisi)", cocok: true }, { id: "c", label: "alas×tinggi", cocok: false }, { id: "d", label: "jumlah tiga sisi", cocok: true },
  ]},
];
export const RONDE_CERITA_CB: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "Segitiga sisi 5, 4, 7 cm. Keliling?", jawab: "16", opsi: ["16", "14", "20"], pesan: "Side Sum: jumlahkan ketiga sisi jalur." },
    { teks: "Sama sisi sisi 5 cm. Keliling?", jawab: "15", opsi: ["15", "10", "25"], pesan: "Equilateral Path Length: 3×5." },
  ],
  [
    { teks: "Sama sisi sisi 6 cm?", jawab: "18", opsi: ["18", "12", "36"], pesan: "Equilateral: 3×6=18." },
    { teks: "Rumus keliling segitiga sama sisi?", jawab: "3 × sisi", opsi: ["3 × sisi", "2 × sisi", "sisi²"], pesan: "Sesuai buku: tanda sisi sama = panjang sama." },
  ],
  [
    { teks: "3+4+5 = ?", jawab: "12", opsi: ["12", "15", "7"], pesan: "Side Sum siku-siku: 3+4+5." },
    { teks: "Mengapa sama sisi boleh dikali 3?", jawab: "ketiga sisi sama panjang", opsi: ["ketiga sisi sama panjang", "karena ada 3 sudut saja", "karena luas"], pesan: "Boleh ×3 hanya jika ketiga sisi sama panjang." },
  ],
];
export const RONDE_URUT_CB: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [12, 18, 15, 16], dari: "kecil" },
  { angka: [21, 15, 12, 18], dari: "besar" },
  { angka: [16, 12, 18, 15], dari: "kecil" },
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
    { baris: "5+4+7", jawab: "16", opsi: ["16", "14", "20"], pesan: "Side Sum: jumlahkan ketiga sisi jalur." },
    { baris: "3×5", jawab: "15", opsi: ["15", "10", "8"], pesan: "Equilateral shortcut bila sisi sama." },
  ],
  [
    { baris: "3×6", jawab: "18", opsi: ["18", "12", "9"], pesan: "Equilateral shortcut bila sisi sama." },
    { baris: "rumus sama sisi", jawab: "3×sisi", opsi: ["3×sisi", "2×sisi", "sisi+sisi"], pesan: "Rumus = jalan pintas Path Length." },
  ],
  [
    { baris: "3+4+5", jawab: "12", opsi: ["12", "15", "20"], pesan: "Sembarang: jangan ×3; jumlahkan satu-satu." },
    { baris: "banyak sisi", jawab: "3", opsi: ["3", "4", "5"], pesan: "Segitiga selalu punya 3 sisi pada jalur." },
  ],
];
export const RONDE_BENARSALAH_QB: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Keliling segitiga = jumlah ketiga sisi.", benar: true, penjelasan: "Benar." },
    { teks: "Sama sisi selalu memakai rumus a+b+c dengan a≠b.", benar: false, penjelasan: "Boleh 3×sisi." },
    { teks: "5+4+7 = 16.", benar: true, penjelasan: "Benar." },
  ],
  [
    { teks: "Sama sisi sisi 5 → keliling 15.", benar: true, penjelasan: "3×5." },
    { teks: "Keliling segitiga = alas × tinggi.", benar: false, penjelasan: "Itu terkait luas." },
    { teks: "Tanda sisi sama menandai panjang sama.", benar: true, penjelasan: "Buku." },
  ],
];
export const RONDE_DETEKTIF_QB: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["tiga sisi", "5,4,7", "jumlah"], jawab: "16", opsi: ["16", "14", "20"], salah: "Jumlahkan." },
  { klue: ["sama sisi", "sisi 5", "kali 3"], jawab: "15", opsi: ["15", "10", "25"], salah: "3×5." },
  { klue: ["sama sisi", "sisi 6"], jawab: "18", opsi: ["18", "12", "36"], salah: "3×6." },
];
export const PETA_KONSEP_QB = [{
  pusat: "Keliling Segitiga",
  kotak: [
    { label: "Umum", opsi: ["a+b+c", "a×b×c", "2(a+b)"], benar: 0 },
    { label: "Sama sisi", opsi: ["3×sisi", "4×sisi", "2×sisi"], benar: 0 },
    { label: "Contoh 5+4+7", opsi: ["16", "14", "20"], benar: 0 },
    { label: "Contoh 3×5", opsi: ["15", "10", "8"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QB = RONDE_CERITA_CB;

// ========== C: Segi empat ==========
export const RONDE_HITUNG_CC: { jenis: "pp" | "persegi"; a: number; b?: number; hasil: number; pesan: string }[][] = [
  [
    { jenis: "pp", a: 5, b: 3, hasil: 16, pesan: "Rectangle formula Path Length: 2(5+3)=16." },
    { jenis: "persegi", a: 3, hasil: 12, pesan: "Square shortcut: 4×3=12." },
  ],
  [
    { jenis: "pp", a: 4, b: 2, hasil: 12, pesan: "Rectangle: 2(4+2)=12 = dua p + dua l." },
    { jenis: "persegi", a: 5, hasil: 20, pesan: "Square Path Length: 4×5." },
  ],
  [
    { jenis: "pp", a: 8, b: 4, hasil: 24, pesan: "Rectangle: 2(8+4)=24; luas 32 beda soal." },
    { jenis: "persegi", a: 6, hasil: 24, pesan: "Square: 4×6=24." },
  ],
];
export const RONDE_RUMUS_CC: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Keliling persegi panjang?", jawab: "2 × (panjang + lebar)", opsi: ["2 × (panjang + lebar)", "panjang × lebar", "4 × panjang saja"], pesan: "Rectangle formula = 2(p+l) = 2p+2l." },
    { tanya: "Keliling persegi?", jawab: "4 × sisi", opsi: ["4 × sisi", "2 × sisi", "sisi × sisi"], pesan: "Square: empat sisi sama → 4×sisi." },
  ],
  [
    { tanya: "Pada PP, sisi berhadapan?", jawab: "sama panjang", opsi: ["sama panjang", "selalu berbeda", "selalu miring"], pesan: "Sesuai buku: tanda sisi sama = panjang sama." },
    { tanya: "PP 5 dan 3, keliling?", jawab: "16", opsi: ["16", "15", "8"], pesan: "Rectangle Path Length: 2(5+3)=16." },
  ],
  [
    { tanya: "Persegi sisi 3?", jawab: "12", opsi: ["12", "9", "6"], pesan: "Square: 4×3=12, bukan luas 9." },
    { tanya: "Rumus lain PP?", jawab: "2p + 2l", opsi: ["2p + 2l", "p × l", "p + l saja"], pesan: "2(p+l) setara Path Length empat sisi." },
  ],
];
export const RONDE_SORTIR_CC: { id: string; label: string; bin: "pp" | "persegi" }[][] = [
  [
    { id: "a1", label: "2(p+l)", bin: "pp" }, { id: "a2", label: "4×sisi", bin: "persegi" }, { id: "a3", label: "5 dan 3", bin: "pp" },
    { id: "a4", label: "semua sisi sama", bin: "persegi" }, { id: "a5", label: "2p+2l", bin: "pp" }, { id: "a6", label: "sisi 3 → 12", bin: "persegi" },
  ],
  [
    { id: "b1", label: "panjang≠lebar", bin: "pp" }, { id: "b2", label: "empat sisi sama", bin: "persegi" }, { id: "b3", label: "keliling 16 dari 5&3", bin: "pp" },
    { id: "b4", label: "keliling 20 dari sisi 5", bin: "persegi" }, { id: "b5", label: "berhadapan sama", bin: "pp" }, { id: "b6", label: "4×5=20", bin: "persegi" },
  ],
  [
    { id: "c1", label: "p=8 l=4 →24", bin: "pp" }, { id: "c2", label: "s=6 →24", bin: "persegi" }, { id: "c3", label: "2(4+2)=12", bin: "pp" },
    { id: "c4", label: "4×3=12", bin: "persegi" }, { id: "c5", label: "panjang+lebar dikali 2", bin: "pp" }, { id: "c6", label: "kali empat sisi", bin: "persegi" },
  ],
];
export const RONDE_PASANG_CC: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "2(5+3)", kanan: "16" }, { kiri: "4×3", kanan: "12" },
    { kiri: "rumus PP", kanan: "2(p+l)" }, { kiri: "rumus persegi", kanan: "4×sisi" },
  ],
  [
    { kiri: "2(4+2)", kanan: "12" }, { kiri: "4×5", kanan: "20" },
    { kiri: "sisi berhadapan PP", kanan: "sama panjang" }, { kiri: "2p+2l", kanan: "sama dengan 2(p+l)" },
  ],
  [
    { kiri: "2(8+4)", kanan: "24" }, { kiri: "4×6", kanan: "24" },
    { kiri: "banyak sisi segi empat", kanan: "4" }, { kiri: "PP 5&3", kanan: "keliling 16" },
  ],
];
export const RONDE_MEMORI_CC = RONDE_PASANG_CC;
export const RONDE_KETUK_CC: { item: number[]; tanya: number[] }[] = [
  { item: [12, 16, 20, 24, 28, 32], tanya: [16, 12, 20] },
  { item: [10, 12, 16, 18, 20, 24], tanya: [12, 24] },
  { item: [12, 16, 20, 24, 30, 36], tanya: [16, 20, 24] },
];
export const RONDE_SEMUA_CC: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "rumus/keliling benar", item: [
    { id: "a", label: "2(5+3)=16", cocok: true }, { id: "b", label: "4×3=12", cocok: true }, { id: "c", label: "5×3=15 adalah keliling", cocok: false }, { id: "d", label: "2p+2l sah", cocok: true },
  ]},
  { label: "ciri persegi", item: [
    { id: "a", label: "4 sisi sama", cocok: true }, { id: "b", label: "K=4×sisi", cocok: true }, { id: "c", label: "panjang≠lebar", cocok: false }, { id: "d", label: "semua sudut siku", cocok: true },
  ]},
  { label: "ciri PP", item: [
    { id: "a", label: "berhadapan sama", cocok: true }, { id: "b", label: "K=2(p+l)", cocok: true }, { id: "c", label: "wajib semua sisi sama", cocok: false }, { id: "d", label: "ada panjang dan lebar", cocok: true },
  ]},
];
export const RONDE_CERITA_CC: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "PP panjang 5 cm lebar 3 cm. Keliling?", jawab: "16", opsi: ["16", "15", "8"], pesan: "Rectangle Path Length: 2(5+3)=16." },
    { teks: "Persegi sisi 3 cm?", jawab: "12", opsi: ["12", "9", "6"], pesan: "Square: 4×3=12, bukan luas 9." },
  ],
  [
    { teks: "Rumus keliling persegi panjang?", jawab: "2(p+l)", opsi: ["2(p+l)", "p×l", "4×p"], pesan: "Sesuai buku: tanda sisi sama = panjang sama." },
    { teks: "PP 4 dan 2. Keliling?", jawab: "12", opsi: ["12", "8", "6"], pesan: "Rectangle: 2(4+2)=12." },
  ],
  [
    { teks: "Persegi sisi 5?", jawab: "20", opsi: ["20", "25", "10"], pesan: "Square Path Length: 4×5." },
    { teks: "Mengapa PP memakai 2(p+l)?", jawab: "ada 2 panjang dan 2 lebar", opsi: ["ada 2 panjang dan 2 lebar", "karena luas", "karena diagonal"], pesan: "Dua p dan dua l karena sisi berhadapan sama." },
  ],
];
export const RONDE_URUT_CC: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [12, 24, 16, 20], dari: "kecil" },
  { angka: [24, 12, 20, 16], dari: "besar" },
  { angka: [16, 12, 20, 24], dari: "kecil" },
];
export const RONDE_HITUNG_PC = RONDE_HITUNG_CC;
export const RONDE_RUMUS_PC = RONDE_RUMUS_CC;
export const RONDE_PASANG_PC = RONDE_PASANG_CC;
export const RONDE_MEMORI_PC = RONDE_MEMORI_CC;
export const RONDE_SORTIR_PC = RONDE_SORTIR_CC;
export const RONDE_SEMUA_PC = RONDE_SEMUA_CC;
export const RONDE_CERITA_PC = RONDE_CERITA_CC;
export const RONDE_TABEL_PC: { baris: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { baris: "2(5+3)", jawab: "16", opsi: ["16", "15", "8"], pesan: "Jalur PP: jumlah empat sisi." },
    { baris: "4×3", jawab: "12", opsi: ["12", "9", "6"], pesan: "Square shortcut 4×sisi." },
  ],
  [
    { baris: "rumus PP", jawab: "2(p+l)", opsi: ["2(p+l)", "p×l", "4×s"], pesan: "Rumus = jalan pintas Path Length." },
    { baris: "rumus persegi", jawab: "4×sisi", opsi: ["4×sisi", "2×sisi", "s²"], pesan: "Rumus = jalan pintas Path Length." },
  ],
  [
    { baris: "2(8+4)", jawab: "24", opsi: ["24", "32", "12"], pesan: "Jalur PP: jumlah empat sisi." },
    { baris: "4×5", jawab: "20", opsi: ["20", "25", "10"], pesan: "Square shortcut 4×sisi." },
  ],
];
export const RONDE_BENARSALAH_QC: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Keliling PP = 2(p+l).", benar: true, penjelasan: "Benar." },
    { teks: "Keliling persegi = sisi × sisi.", benar: false, penjelasan: "Itu luas; keliling 4×sisi." },
    { teks: "2(5+3)=16.", benar: true, penjelasan: "Benar." },
  ],
  [
    { teks: "Sisi berhadapan PP sama panjang.", benar: true, penjelasan: "Buku." },
    { teks: "Persegi tidak bisa memakai 4×sisi.", benar: false, penjelasan: "Itu rumusnya." },
    { teks: "2p+2l sama dengan 2(p+l).", benar: true, penjelasan: "Setara." },
  ],
];
export const RONDE_DETEKTIF_QC: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["panjang 5", "lebar 3", "keliling PP"], jawab: "16", opsi: ["16", "15", "8"], salah: "2(p+l)." },
  { klue: ["persegi", "sisi 3"], jawab: "12", opsi: ["12", "9", "6"], salah: "4×3." },
  { klue: ["rumus", "empat sisi sama"], jawab: "4×sisi", opsi: ["4×sisi", "2(p+l)", "p×l"], salah: "Persegi." },
];
export const PETA_KONSEP_QC = [{
  pusat: "Keliling Segi Empat",
  kotak: [
    { label: "PP", opsi: ["2(p+l)", "p×l", "4×p"], benar: 0 },
    { label: "Persegi", opsi: ["4×sisi", "2×sisi", "s²"], benar: 0 },
    { label: "Contoh 5&3", opsi: ["16", "15", "8"], benar: 0 },
    { label: "Contoh sisi 3", opsi: ["12", "9", "6"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QC = RONDE_CERITA_CC;

// ========== D: Segi banyak ==========
export const RONDE_HITUNG_CD: { n: number; sisi: number; hasil: number; pesan: string }[][] = [
  [
    { n: 5, sisi: 3, hasil: 15, pesan: "Regular n-gon: 5×3 karena semua sisi sama." },
    { n: 6, sisi: 4, hasil: 24, pesan: "Regular hexagon Path Length: 6×4." },
  ],
  [
    { n: 5, sisi: 2, hasil: 10, pesan: "Regular pentagon: 5×2." },
    { n: 6, sisi: 3, hasil: 18, pesan: "Regular hexagon: 6×3." },
  ],
  [
    { n: 8, sisi: 2, hasil: 16, pesan: "Regular octagon: 8×2." },
    { n: 4, sisi: 5, hasil: 20, pesan: "n=4 beraturan = persegi: 4×5." },
  ],
];
export const RONDE_RUMUS_CD: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Keliling segi-n beraturan?", jawab: "n × panjang sisi", opsi: ["n × panjang sisi", "n + sisi", "n × n"], pesan: "Regular: n×sisi; irregular: jumlahkan." },
    { tanya: "Jika sisi tidak sama panjang?", jawab: "jumlahkan semua sisi", opsi: ["jumlahkan semua sisi", "kali n saja", "ambil sisi terpanjang"], pesan: "Sesuai buku: tanda sisi sama = panjang sama." },
  ],
  [
    { tanya: "Segi lima beraturan sisi 3?", jawab: "15", opsi: ["15", "8", "12"], pesan: "Regular: 5×3." },
    { tanya: "Banyak sisi segi enam?", jawab: "6", opsi: ["6", "5", "8"], pesan: "Segi enam = 6 sisi pada jalur." },
  ],
  [
    { tanya: "Segi enam sisi 4?", jawab: "24", opsi: ["24", "10", "16"], pesan: "Regular: 6×4." },
    { tanya: "Tabel: 5 sisi beraturan →", jawab: "5 × sisi", opsi: ["5 × sisi", "4 × sisi", "sisi + 5"], pesan: "Rangkuman." },
  ],
];
export const RONDE_SORTIR_CD: { id: string; label: string; bin: "beraturan" | "bebas" }[][] = [
  [
    { id: "a1", label: "5×3", bin: "beraturan" }, { id: "a2", label: "2+3+4+5+6", bin: "bebas" }, { id: "a3", label: "6×4", bin: "beraturan" },
    { id: "a4", label: "jumlah sisi berbeda", bin: "bebas" }, { id: "a5", label: "n×sisi", bin: "beraturan" }, { id: "a6", label: "sisi tak sama", bin: "bebas" },
  ],
  [
    { id: "b1", label: "segi lima sisi sama", bin: "beraturan" }, { id: "b2", label: "segi lima sisi beda", bin: "bebas" }, { id: "b3", label: "8×2", bin: "beraturan" },
    { id: "b4", label: "1+2+3+4+5", bin: "bebas" }, { id: "b5", label: "6×3=18", bin: "beraturan" }, { id: "b6", label: "jumlah satu-satu", bin: "bebas" },
  ],
  [
    { id: "c1", label: "semua sisi sama", bin: "beraturan" }, { id: "c2", label: "ada sisi beda", bin: "bebas" }, { id: "c3", label: "kali banyak sisi", bin: "beraturan" },
    { id: "c4", label: "tidak boleh dikali n", bin: "bebas" }, { id: "c5", label: "5×2=10", bin: "beraturan" }, { id: "c6", label: "2+2+3+4+5", bin: "bebas" },
  ],
];
export const RONDE_PASANG_CD: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "5×3", kanan: "15" }, { kiri: "6×4", kanan: "24" },
    { kiri: "rumus beraturan", kanan: "n×sisi" }, { kiri: "sisi tak sama", kanan: "jumlah semua" },
  ],
  [
    { kiri: "segi lima", kanan: "5 sisi" }, { kiri: "segi enam", kanan: "6 sisi" },
    { kiri: "5×2", kanan: "10" }, { kiri: "6×3", kanan: "18" },
  ],
  [
    { kiri: "8×2", kanan: "16" }, { kiri: "tabel 5 sisi", kanan: "5×sisi" },
    { kiri: "tabel 6 sisi", kanan: "6×sisi" }, { kiri: "cara aman selalu", kanan: "jumlahkan sisi" },
  ],
];
export const RONDE_MEMORI_CD = RONDE_PASANG_CD;
export const RONDE_KETUK_CD: { item: number[]; tanya: number[] }[] = [
  { item: [10, 15, 16, 18, 20, 24], tanya: [15, 24, 18] },
  { item: [8, 10, 12, 15, 16, 18], tanya: [10, 15] },
  { item: [15, 16, 18, 20, 24, 30], tanya: [15, 16, 24] },
];
export const RONDE_SEMUA_CD: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "keliling segi banyak benar", item: [
    { id: "a", label: "5×3=15", cocok: true }, { id: "b", label: "6×4=24", cocok: true }, { id: "c", label: "5×3=8", cocok: false }, { id: "d", label: "n×sisi beraturan", cocok: true },
  ]},
  { label: "ciri beraturan", item: [
    { id: "a", label: "semua sisi sama", cocok: true }, { id: "b", label: "boleh n×sisi", cocok: true }, { id: "c", label: "wajib sisi beda", cocok: false }, { id: "d", label: "segi lima contoh 5×s", cocok: true },
  ]},
  { label: "jika sisi tidak sama", item: [
    { id: "a", label: "jumlahkan semua", cocok: true }, { id: "b", label: "jangan langsung ×n", cocok: true }, { id: "c", label: "cukup kali n", cocok: false }, { id: "d", label: "ukur tiap sisi", cocok: true },
  ]},
];
export const RONDE_CERITA_CD: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "Segi lima beraturan sisi 3 cm. Keliling?", jawab: "15", opsi: ["15", "8", "12"], pesan: "Regular: 5×3." },
    { teks: "Segi enam beraturan sisi 4 cm?", jawab: "24", opsi: ["24", "10", "16"], pesan: "Regular: 6×4." },
  ],
  [
    { teks: "Rumus segi-n beraturan?", jawab: "n × sisi", opsi: ["n × sisi", "n + sisi", "2n"], pesan: "Beraturan → n×sisi (Path Length)." },
    { teks: "Sisi tidak sama panjang, cara?", jawab: "jumlahkan semua sisi", opsi: ["jumlahkan semua sisi", "kali n", "abaikan"], pesan: "Sesuai buku: tanda sisi sama = panjang sama." },
  ],
  [
    { teks: "Segi delapan sisi 2 cm beraturan?", jawab: "16", opsi: ["16", "10", "8"], pesan: "8×2." },
    { teks: "Banyak sisi segi lima?", jawab: "5", opsi: ["5", "6", "4"], pesan: "Segi lima = 5 sisi." },
  ],
];
export const RONDE_URUT_CD: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [10, 24, 15, 18], dari: "kecil" },
  { angka: [24, 10, 18, 15], dari: "besar" },
  { angka: [15, 16, 18, 24], dari: "kecil" },
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
    { baris: "5×3", jawab: "15", opsi: ["15", "8", "12"], pesan: "Regular pentagon Path Length." },
    { baris: "6×4", jawab: "24", opsi: ["24", "10", "16"], pesan: "Regular hexagon Path Length." },
  ],
  [
    { baris: "rumus beraturan", jawab: "n×sisi", opsi: ["n×sisi", "n+sisi", "2n"], pesan: "Beraturan → n×sisi (Path Length)." },
    { baris: "sisi tak sama", jawab: "jumlah semua", opsi: ["jumlah semua", "kali n", "bagi 2"], pesan: "Irregular: jumlah semua sisi, jangan ×n." },
  ],
  [
    { baris: "8×2", jawab: "16", opsi: ["16", "10", "8"], pesan: "Regular octagon: 8×sisi." },
    { baris: "banyak sisi segi 6", jawab: "6", opsi: ["6", "5", "8"], pesan: "Segi enam = 6 sisi pada jalur." },
  ],
];
export const RONDE_BENARSALAH_QD: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Segi-n beraturan: keliling = n×sisi.", benar: true, penjelasan: "Benar." },
    { teks: "Sisi tidak sama tetap boleh dikali n saja.", benar: false, penjelasan: "Harus dijumlah." },
    { teks: "5×3=15 untuk segi lima sisi 3.", benar: true, penjelasan: "Benar." },
  ],
  [
    { teks: "Segi enam punya 6 sisi.", benar: true, penjelasan: "Benar." },
    { teks: "Keliling segi banyak selalu luas.", benar: false, penjelasan: "Keliling ≠ luas." },
    { teks: "Jika sisi beda, jumlahkan semua sisi.", benar: true, penjelasan: "Buku." },
  ],
];
export const RONDE_DETEKTIF_QD: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["segi lima", "beraturan", "sisi 3"], jawab: "15", opsi: ["15", "8", "12"], salah: "5×3." },
  { klue: ["segi enam", "sisi 4"], jawab: "24", opsi: ["24", "10", "16"], salah: "6×4." },
  { klue: ["sisi tidak sama", "cara aman"], jawab: "jumlahkan semua", opsi: ["jumlahkan semua", "kali n", "abaikan"], salah: "Buku." },
];
export const PETA_KONSEP_QD = [{
  pusat: "Keliling Segi Banyak",
  kotak: [
    { label: "Beraturan", opsi: ["n×sisi", "n+sisi", "2n"], benar: 0 },
    { label: "Tidak sama", opsi: ["jumlah semua sisi", "kali n", "ambil max"], benar: 0 },
    { label: "Segi 5 sisi 3", opsi: ["15", "8", "12"], benar: 0 },
    { label: "Segi 6 sisi 4", opsi: ["24", "10", "16"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QD = RONDE_CERITA_CD;

// ========== E: Bangun gabungan ==========
export const RONDE_HITUNG_CE: { luar: number[]; hasil: number; pesan: string }[][] = [
  [
    { luar: [4, 4, 4, 6, 4, 4, 4, 2, 4, 8, 6, 4], hasil: 54, pesan: "Outer Path Only: jumlah sisi terluar denah." },
    { luar: [12, 6, 12, 6], hasil: 36, pesan: "Bounding rectangle: 2(12+6)=36." },
  ],
  [
    { luar: [8, 4, 8, 4], hasil: 24, pesan: "Bounding/outer PP: 2(8+4)=24." },
    { luar: [4, 4, 4, 4], hasil: 16, pesan: "Outer path persegi: 4×4=16." },
  ],
  [
    { luar: [10, 5, 10, 5], hasil: 30, pesan: "2(10+5)." },
    { luar: [6, 6, 6, 6, 6, 6], hasil: 36, pesan: "Enam sisi luar 6." },
  ],
];
export const RONDE_ARTI_CE: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Keliling bangun gabungan menghitung?", jawab: "batas luar saja", opsi: ["batas luar saja", "semua dinding dalam juga", "luas tiap ruang"], pesan: "Dinding terluar denah." },
    { tanya: "Sisi dalam yang bertemu dua ruang?", jawab: "tidak dihitung sebagai keliling luar", opsi: ["tidak dihitung sebagai keliling luar", "dihitung dua kali", "selalu dikali 2"], pesan: "Cara Asep/Komang." },
  ],
  [
    { tanya: "Denah rumah adalah?", jawab: "gabungan beberapa bangun datar", opsi: ["gabungan beberapa bangun datar", "satu lingkaran saja", "hanya titik"], pesan: "Sesuai buku: tanda sisi sama = panjang sama." },
    { tanya: "Cara aman mencari keliling gabungan?", jawab: "jumlahkan panjang sisi-sisi luar", opsi: ["jumlahkan panjang sisi-sisi luar", "jumlahkan luas ruang", "kali jumlah kamar"], pesan: "Ukur sisi luar." },
  ],
  [
    { tanya: "Mengapa tidak semua sisi penyusun dijumlah?", jawab: "ada sisi dalam yang bukan batas luar", opsi: ["ada sisi dalam yang bukan batas luar", "karena sulit", "karena satuan beda"], pesan: "Komang." },
    { tanya: "Strategi bungkus persegi besar berguna untuk?", jawab: "menemukan sisi luar yang belum diketahui", opsi: ["menemukan sisi luar yang belum diketahui", "menghitung volume", "menghapus denah"], pesan: "Cara Komang." },
  ],
];
export const RONDE_SORTIR_CE: { id: string; label: string; bin: "luar" | "dalam" }[][] = [
  [
    { id: "a1", label: "dinding depan rumah", bin: "luar" }, { id: "a2", label: "sekat dapur-kamar", bin: "dalam" }, { id: "a3", label: "pagar luar", bin: "luar" },
    { id: "a4", label: "dinding antar kamar", bin: "dalam" }, { id: "a5", label: "tepi denah", bin: "luar" }, { id: "a6", label: "partisi dalam", bin: "dalam" },
  ],
  [
    { id: "b1", label: "batas terluar", bin: "luar" }, { id: "b2", label: "sisi bersama dua ruang", bin: "dalam" }, { id: "b3", label: "keliling gabungan", bin: "luar" },
    { id: "b4", label: "bukan keliling luar", bin: "dalam" }, { id: "b5", label: "bingkai denah", bin: "luar" }, { id: "b6", label: "sekat mandi", bin: "dalam" },
  ],
  [
    { id: "c1", label: "jumlah sisi luar", bin: "luar" }, { id: "c2", label: "abaikan sekat dalam", bin: "dalam" }, { id: "c3", label: "2(P+L) bungkus luar", bin: "luar" },
    { id: "c4", label: "dinding dalam denah", bin: "dalam" }, { id: "c5", label: "perimeter", bin: "luar" }, { id: "c6", label: "shared edge", bin: "dalam" },
  ],
];
export const RONDE_PASANG_CE: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "keliling gabungan", kanan: "batas luar" }, { kiri: "sekat dalam", kanan: "tidak dihitung luar" },
    { kiri: "denah rumah", kanan: "gabungan bangun" }, { kiri: "2(12+6)", kanan: "36" },
  ],
  [
    { kiri: "cara Asep", kanan: "ukur sisi luar satu-satu" }, { kiri: "cara Komang", kanan: "bungkus & samakan ukuran" },
    { kiri: "PP 8×4", kanan: "keliling 24" }, { kiri: "persegi 4", kanan: "keliling 16" },
  ],
  [
    { kiri: "sisi belum diketahui", kanan: "cari dari selisih/kesamaan" }, { kiri: "dinding terluar", kanan: "yang dijumlah" },
    { kiri: "2(10+5)", kanan: "30" }, { kiri: "tujuan denah", kanan: "rencana bangun/arah" },
  ],
];
export const RONDE_MEMORI_CE = RONDE_PASANG_CE;
export const RONDE_KETUK_CE: { item: number[]; tanya: number[] }[] = [
  { item: [16, 24, 30, 36, 40, 54], tanya: [36, 24, 16] },
  { item: [20, 24, 30, 32, 36, 40], tanya: [24, 30] },
  { item: [16, 24, 30, 36, 48, 54], tanya: [16, 36, 30] },
];
export const RONDE_SEMUA_CE: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "aturan keliling gabungan", item: [
    { id: "a", label: "hitung batas luar", cocok: true }, { id: "b", label: "abaikan sekat dalam", cocok: true }, { id: "c", label: "jumlahkan semua dinding dalam", cocok: false }, { id: "d", label: "boleh bungkus PP besar", cocok: true },
  ]},
  { label: "contoh hasil benar", item: [
    { id: "a", label: "2(12+6)=36", cocok: true }, { id: "b", label: "2(8+4)=24", cocok: true }, { id: "c", label: "8×4=32 adalah keliling", cocok: false }, { id: "d", label: "4×4=16 persegi", cocok: true },
  ]},
  { label: "yang termasuk sisi luar", item: [
    { id: "a", label: "tepi denah", cocok: true }, { id: "b", label: "pagar luar", cocok: true }, { id: "c", label: "sekat antar kamar", cocok: false }, { id: "d", label: "dinding depan", cocok: true },
  ]},
];
export const RONDE_CERITA_CE: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "Keliling bangun gabungan menghitung bagian?", jawab: "batas luar", opsi: ["batas luar", "semua sekat dalam", "luas kamar"], pesan: "Denah." },
    { teks: "Persegi panjang luar 12 m × 6 m. Keliling?", jawab: "36", opsi: ["36", "72", "18"], pesan: "Bounding rectangle: 2(12+6)=36." },
  ],
  [
    { teks: "Mengapa sekat dalam tidak dijumlah ke keliling luar?", jawab: "bukan batas luar", opsi: ["bukan batas luar", "karena pendek", "karena kayu"], pesan: "Aturan." },
    { teks: "PP 8×4 keliling?", jawab: "24", opsi: ["24", "32", "12"], pesan: "2(8+4)." },
  ],
  [
    { teks: "Strategi Komang memakai?", jawab: "bungkus & kesamaan ukuran", opsi: ["bungkus & kesamaan ukuran", "acak saja", "hanya luas"], pesan: "Sesuai buku: tanda sisi sama = panjang sama." },
    { teks: "2(10+5)=?", jawab: "30", opsi: ["30", "50", "15"], pesan: "Keliling PP." },
  ],
];
export const RONDE_URUT_CE: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [16, 36, 24, 30], dari: "kecil" },
  { angka: [36, 16, 30, 24], dari: "besar" },
  { angka: [24, 16, 30, 36], dari: "kecil" },
];
export const RONDE_HITUNG_PE = RONDE_HITUNG_CE;
export const RONDE_ARTI_PE = RONDE_ARTI_CE;
export const RONDE_PASANG_PE = RONDE_PASANG_CE;
export const RONDE_MEMORI_PE = RONDE_MEMORI_CE;
export const RONDE_SORTIR_PE = RONDE_SORTIR_CE;
export const RONDE_SEMUA_PE = RONDE_SEMUA_CE;
export const RONDE_CERITA_PE = RONDE_CERITA_CE;
export const RONDE_TABEL_PE: { baris: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { baris: "2(12+6)", jawab: "36", opsi: ["36", "72", "18"], pesan: "Luar." },
    { baris: "yang dihitung", jawab: "batas luar", opsi: ["batas luar", "sekat dalam", "luas"], pesan: "Aturan." },
  ],
  [
    { baris: "2(8+4)", jawab: "24", opsi: ["24", "32", "12"], pesan: "Jalur PP: jumlah empat sisi." },
    { baris: "sekat dalam", jawab: "tidak dihitung luar", opsi: ["tidak dihitung luar", "dihitung 2×", "wajib"], pesan: "Aturan." },
  ],
  [
    { baris: "2(10+5)", jawab: "30", opsi: ["30", "50", "15"], pesan: "Jalur PP: jumlah empat sisi." },
    { baris: "denah rumah", jawab: "gabungan bangun", opsi: ["gabungan bangun", "satu titik", "lingkaran saja"], pesan: "Sesuai buku: tanda sisi sama = panjang sama." },
  ],
];
export const RONDE_BENARSALAH_QE: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Keliling gabungan = batas luar.", benar: true, penjelasan: "Benar." },
    { teks: "Semua sekat dalam ikut dijumlah ke keliling luar.", benar: false, penjelasan: "Tidak." },
    { teks: "2(12+6)=36.", benar: true, penjelasan: "Benar." },
  ],
  [
    { teks: "Denah rumah gabungan beberapa bangun datar.", benar: true, penjelasan: "Buku." },
    { teks: "Keliling gabungan sama dengan jumlah luas ruang.", benar: false, penjelasan: "Berbeda." },
    { teks: "Sisi bersama dua ruang bukan keliling luar.", benar: true, penjelasan: "Benar." },
  ],
];
export const RONDE_DETEKTIF_QE: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["denah", "batas luar", "bukan sekat dalam"], jawab: "keliling gabungan", opsi: ["keliling gabungan", "luas total", "volume"], salah: "Batas luar." },
  { klue: ["bungkus", "12 dan 6", "keliling"], jawab: "36", opsi: ["36", "72", "18"], salah: "2(12+6)." },
  { klue: ["PP", "8 dan 4"], jawab: "24", opsi: ["24", "32", "12"], salah: "2(p+l)." },
];
export const PETA_KONSEP_QE = [{
  pusat: "Keliling Gabungan",
  kotak: [
    { label: "Yang dihitung", opsi: ["batas luar", "semua sekat", "luas kamar"], benar: 0 },
    { label: "Yang diabaikan", opsi: ["sekat dalam", "sisi luar", "satuan"], benar: 0 },
    { label: "Cara", opsi: ["jumlah sisi luar / bungkus", "kali luas", "bagi diagonal"], benar: 0 },
    { label: "Contoh 12×6", opsi: ["36", "72", "18"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QE = RONDE_CERITA_CE;
