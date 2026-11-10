/**
 * Data murni Matematika Kelas 6 Bab 3 (Kubus dan Balok): Sub-Bab A–C.
 * Sumber: Buku Siswa Matematika Kelas VI Kemendikbudristek Bab 3 hlm. 89–112.
 * Visual 3D: matriks tinggi dipakai komponen kubus-3d.tsx (adopsi naskah lama).
 * Tanpa React/jaringan. Uji: scripts/uji-statis-k6b3.mjs.
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

export type MatriksTinggi = number[][];
export const totalDari = (m: MatriksTinggi) => m.flat().reduce((a, b) => a + b, 0);
export const tampakDepanDari = (m: MatriksTinggi) => {
  const k = Math.max(0, ...m.map((r) => r.length));
  let s = 0;
  for (let x = 0; x < k; x += 1) {
    let max = 0;
    for (const row of m) max = Math.max(max, row[x] ?? 0);
    s += max;
  }
  return s;
};
export const tampakSampingDari = (m: MatriksTinggi) => m.reduce((s, row) => s + Math.max(0, ...row, 0), 0);
export const tampakAtasDari = (m: MatriksTinggi) => m.flat().filter((h) => h > 0).length;

/** Susunan siap pakai untuk visual 3D (naskah lama style). */
export const SUSUNAN_CA = {
  L: [[2, 1]] as MatriksTinggi, // bentuk L: depan 2, samping 1 → total 3
  duaDua: [[2, 2], [2, 2]] as MatriksTinggi, // 8
  menara: [[1, 3], [2, 1]] as MatriksTinggi, // 7
  tangga: [[1, 2, 3]] as MatriksTinggi, // 6
  kosongTengah: [[2, 0], [2, 2]] as MatriksTinggi, // 6
} as const;

// ========== A · Mengonstruksi & Mengurai ==========
export const RONDE_HITUNG_CA: { label: string; hasil: number; pesan: string; matriks?: MatriksTinggi }[][] = [
  [
    { label: "bentuk L (3D)", hasil: 3, pesan: "Dua mendatar + satu naik = 3. Putar model!", matriks: SUSUNAN_CA.L },
    { label: "kubus 2×2×2 penuh", hasil: 8, pesan: "2×2×2=8. Layer Counting.", matriks: SUSUNAN_CA.duaDua },
  ],
  [
    { label: "menara matriks [[1,3],[2,1]]", hasil: 7, pesan: "1+3+2+1=7 termasuk tersembunyi.", matriks: SUSUNAN_CA.menara },
    { label: "tangga [[1,2,3]]", hasil: 6, pesan: "1+2+3=6. Hidden Support OK.", matriks: SUSUNAN_CA.tangga },
  ],
  [
    { label: "3×3×3 penuh", hasil: 27, pesan: "P×L×T=27." },
    { label: "balok 5×3×2", hasil: 30, pesan: "5×3×2=30." },
  ],
];
export const RONDE_ARTI_CA: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Construct-Decompose Protocol artinya?", jawab: "menyusun unit lalu bisa mengurai kembali", opsi: ["menyusun unit lalu bisa mengurai kembali", "hanya menggambar tanpa unit", "menghapus rusuk"], pesan: "Metode." },
    { tanya: "Hidden Support Rule menekankan?", jawab: "kubus atas tidak boleh melayang tanpa penopang", opsi: ["kubus atas tidak boleh melayang tanpa penopang", "kubus atas boleh melayang", "hanya hitung muka depan"], pesan: "Naskah lama." },
  ],
  [
    { tanya: "Layer Counting Method?", jawab: "hitung lantai dasar dulu lalu tingkat di atasnya", opsi: ["hitung lantai dasar dulu lalu tingkat di atasnya", "hitung hanya atap", "abaikan lantai dasar"], pesan: "Metode." },
    { tanya: "Bentuk L dari berapa kubus satuan?", jawab: "3", opsi: ["3", "4", "2"], pesan: "Naskah lama." },
  ],
  [
    { tanya: "Mengapa jangan hanya hitung yang kelihatan?", jawab: "ada kubus tersembunyi di belakang/bawah", opsi: ["ada kubus tersembunyi di belakang/bawah", "kubus tersembunyi tidak dihitung", "hanya warna yang dihitung"], pesan: "Jebakan." },
    { tanya: "Kubus dan balok sama-sama punya?", jawab: "6 sisi, 12 rusuk, 8 titik sudut", opsi: ["6 sisi, 12 rusuk, 8 titik sudut", "4 sisi saja", "tidak punya rusuk"], pesan: "Unsur." },
  ],
];
export const RONDE_SORTIR_CA: { id: string; label: string; bin: "ya" | "tidak" }[][] = [
  [
    { id: "a1", label: "kubus atas wajib penopang", bin: "ya" }, { id: "a2", label: "melayang OK", bin: "tidak" }, { id: "a3", label: "Layer Counting", bin: "ya" },
    { id: "a4", label: "hanya hitung muka", bin: "tidak" }, { id: "a5", label: "2×2×2=8", bin: "ya" }, { id: "a6", label: "2×2×2=4", bin: "tidak" },
  ],
  [
    { id: "b1", label: "bentuk L = 3", bin: "ya" }, { id: "b2", label: "Construct-Decompose", bin: "ya" }, { id: "b3", label: "urai mustahil", bin: "tidak" },
    { id: "b4", label: "3×3×3=27", bin: "ya" }, { id: "b5", label: "abaikan tersembunyi", bin: "tidak" }, { id: "b6", label: "putar 3D membantu", bin: "ya" },
  ],
  [
    { id: "c1", label: "5×3×2=30", bin: "ya" }, { id: "c2", label: "Hidden Support", bin: "ya" }, { id: "c3", label: "balok tanpa sisi", bin: "tidak" },
    { id: "c4", label: "susun berdampingan OK", bin: "ya" }, { id: "c5", label: "total = hanya atap", bin: "tidak" }, { id: "c6", label: "unit kontainer", bin: "ya" },
  ],
];
export const RONDE_PASANG_CA: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "bentuk L", kanan: "3 kubus" }, { kiri: "2×2×2", kanan: "8" },
    { kiri: "Hidden Support", kanan: "tidak melayang" }, { kiri: "Layer Counting", kanan: "lantai demi lantai" },
  ],
  [
    { kiri: "3×3×3", kanan: "27" }, { kiri: "5×3×2", kanan: "30" },
    { kiri: "Construct", kanan: "menyusun" }, { kiri: "Decompose", kanan: "mengurai" },
  ],
  [
    { kiri: "putar 3D", kanan: "lihat semua sisi" }, { kiri: "tersembunyi", kanan: "tetap dihitung" },
    { kiri: "6 sisi", kanan: "kubus & balok" }, { kiri: "penopang", kanan: "di bawah atas" },
  ],
];
export const RONDE_MEMORI_CA = RONDE_PASANG_CA;
export const RONDE_KETUK_CA: { item: number[]; tanya: number[] }[] = [
  { item: [3, 6, 7, 8, 27, 30], tanya: [3, 8] },
  { item: [2, 7, 8, 27, 30, 4], tanya: [7, 27, 30] },
  { item: [3, 6, 8, 9, 27, 30], tanya: [3, 6, 8] },
];
export const RONDE_SEMUA_CA: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "langkah hitung 3D benar", item: [
    { id: "a", label: "hitung semua lantai", cocok: true }, { id: "b", label: "termasuk tersembunyi", cocok: true }, { id: "c", label: "hanya muka depan", cocok: false }, { id: "d", label: "cek penopang", cocok: true },
  ]},
  { label: "fakta buku A", item: [
    { id: "a", label: "bisa susun & urai", cocok: true }, { id: "b", label: "bentuk L = 3", cocok: true }, { id: "c", label: "melayang OK", cocok: false }, { id: "d", label: "2×2×2=8", cocok: true },
  ]},
  { label: "metode luar A", item: [
    { id: "a", label: "Construct-Decompose", cocok: true }, { id: "b", label: "Layer Counting", cocok: true }, { id: "c", label: "Manhattan saja", cocok: false }, { id: "d", label: "Hidden Support", cocok: true },
  ]},
];
export const RONDE_CERITA_CA: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "Bentuk L naskah lama: berapa kubus?", jawab: "3", opsi: ["3", "4", "2"], pesan: "Putar 3D." },
    { teks: "Kubus besar 2×2×2 butuh berapa satuan?", jawab: "8", opsi: ["8", "4", "6"], pesan: "P×L×T." },
  ],
  [
    { teks: "METODE LUAR Hidden Support?", jawab: "kubus atas wajib penopang", opsi: ["kubus atas wajib penopang", "boleh melayang", "hapus lantai dasar"], pesan: "Aturan." },
    { teks: "3×3×3 penuh?", jawab: "27", opsi: ["27", "9", "18"], pesan: "Volume." },
  ],
  [
    { teks: "Mengapa putar model 3D?", jawab: "agar kubus tersembunyi terlihat", opsi: ["agar kubus tersembunyi terlihat", "agar angka hilang", "agar melayang"], pesan: "Visual lama." },
    { teks: "Balok 5×3×2?", jawab: "30", opsi: ["30", "15", "10"], pesan: "Kali." },
  ],
];
export const RONDE_URUT_CA: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [3, 8, 6, 7], dari: "kecil" },
  { angka: [30, 8, 27, 3], dari: "besar" },
  { angka: [3, 27, 8, 6], dari: "kecil" },
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
    { baris: "bentuk L", jawab: "3", opsi: ["3", "4", "2"], pesan: "Kubus." },
    { baris: "2×2×2", jawab: "8", opsi: ["8", "4", "6"], pesan: "Total." },
  ],
  [
    { baris: "Hidden Support", jawab: "tidak melayang", opsi: ["tidak melayang", "boleh melayang", "hapus bawah"], pesan: "Aturan." },
    { baris: "3×3×3", jawab: "27", opsi: ["27", "9", "18"], pesan: "Volume." },
  ],
  [
    { baris: "Layer Counting", jawab: "lantai demi lantai", opsi: ["lantai demi lantai", "hanya atap", "acak"], pesan: "Metode." },
    { baris: "5×3×2", jawab: "30", opsi: ["30", "15", "8"], pesan: "Balok." },
  ],
];
export const RONDE_BENARSALAH_QA: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Kubus di lantai atas harus bertumpu pada kubus di bawahnya.", benar: true, penjelasan: "Hidden Support." },
    { teks: "Cukup menghitung kubus yang terlihat dari depan.", benar: false, penjelasan: "Ada yang tersembunyi." },
    { teks: "Bentuk L memakai 3 kubus satuan.", benar: true, penjelasan: "Naskah lama." },
  ],
  [
    { teks: "2×2×2 = 8 kubus satuan.", benar: true, penjelasan: "Benar." },
    { teks: "Layer Counting mengabaikan lantai dasar.", benar: false, penjelasan: "Dasar dihitung dulu." },
    { teks: "Kubus dan balok punya 6 sisi.", benar: true, penjelasan: "Unsur." },
  ],
];
export const RONDE_DETEKTIF_QA: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["L", "tiga", "kubus"], jawab: "3", opsi: ["3", "4", "2"], salah: "Bentuk L." },
  { klue: ["tidak", "melayang", "aturan"], jawab: "Hidden Support", opsi: ["Hidden Support", "Manhattan", "Occlusion saja"], salah: "Metode A." },
  { klue: ["3", "3", "3", "penuh"], jawab: "27", opsi: ["27", "9", "18"], salah: "Volume." },
];
export const PETA_KONSEP_QA = [{
  pusat: "Mengonstruksi & Mengurai",
  kotak: [
    { label: "Unit", opsi: ["kubus/balok satuan", "hanya garis", "tanpa sisi"], benar: 0 },
    { label: "Hitung", opsi: ["lapisan + tersembunyi", "hanya muka", "warna saja"], benar: 0 },
    { label: "Aturan atas", opsi: ["wajib penopang", "boleh melayang", "hapus bawah"], benar: 0 },
    { label: "Metode luar", opsi: ["Construct / Layer / Hidden Support", "Manhattan saja", "Grid saja"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QA = RONDE_CERITA_CA;

// ========== B · Visualisasi Spasial ==========
export const RONDE_HITUNG_CB: { derajat: number; hasil: number; pesan: string; matriks?: MatriksTinggi; tanya?: string }[][] = [
  [
    { derajat: 1, hasil: 4, pesan: "Depan: max kolom 2 dan 2 → 4.", matriks: [[2, 2], [1, 2]], tanya: "Tampak DEPAN?" },
    { derajat: 2, hasil: 3, pesan: "Atas: 3 petak > 0 (satu nol).", matriks: [[2, 0], [2, 2]], tanya: "Tampak ATAS?" },
  ],
  [
    { derajat: 3, hasil: 5, pesan: "Depan max: kolom 3 dan 2 → 5.", matriks: [[1, 2], [3, 1]], tanya: "Tampak DEPAN?" },
    { derajat: 4, hasil: 4, pesan: "Samping: max baris 2 + 2 = 4.", matriks: [[2, 1], [1, 2]], tanya: "Tampak SAMPING?" },
  ],
  [
    { derajat: 5, hasil: 1, pesan: "Empat ditumpuk 1 kolom → atas = 1.", matriks: [[4]], tanya: "Tampak ATAS?" },
    { derajat: 6, hasil: 4, pesan: "Tumpuk 4 → depan = 4.", matriks: [[4]], tanya: "Tampak DEPAN?" },
  ],
];
export const RONDE_RUMUS_CB: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Orthographic Projection artinya?", jawab: "gambar tampak datar tanpa perspektif", opsi: ["gambar tampak datar tanpa perspektif", "gambar miring 3D saja", "hapus semua petak"], pesan: "Metode." },
    { tanya: "Occlusion Max Rule dari depan?", jawab: "ambil tinggi maksimum tiap kolom", opsi: ["ambil tinggi maksimum tiap kolom", "jumlahkan semua tinggi mentah", "abaikan kolom belakang"], pesan: "Metode." },
  ],
  [
    { tanya: "Tampak atas memberi tahu?", jawab: "petak mana yang terisi, bukan tingginya", opsi: ["petak mana yang terisi, bukan tingginya", "tinggi pasti setiap menara", "warna saja"], pesan: "Jebakan." },
    { tanya: "Height-Matrix Silhouette?", jawab: "mencatat tinggi kubus pada tiap petak alas", opsi: ["mencatat tinggi kubus pada tiap petak alas", "menghapus angka tinggi", "hanya menggambar lingkaran"], pesan: "Metode." },
  ],
  [
    { tanya: "4 kubus ditumpuk lurus, tampak atas?", jawab: "1 petak", opsi: ["1 petak", "4 petak", "0 petak"], pesan: "Tertutup." },
    { tanya: "Depan 1 & belakang 3 pada satu kolom, tampak depan?", jawab: "3", opsi: ["3", "1", "4"], pesan: "Max." },
  ],
];
export const RONDE_SORTIR_CB: { id: string; label: string; bin: "lancip" | "tumpul" }[][] = [
  [
    { id: "a1", label: "atas ≠ tinggi", bin: "lancip" }, { id: "a2", label: "atas = tahu tinggi", bin: "tumpul" }, { id: "a3", label: "Occlusion Max", bin: "lancip" },
    { id: "a4", label: "jumlah mentah tanpa max", bin: "tumpul" }, { id: "a5", label: "Orthographic", bin: "lancip" }, { id: "a6", label: "tumpuk 4 atas=4", bin: "tumpul" },
  ],
  [
    { id: "b1", label: "Height-Matrix", bin: "lancip" }, { id: "b2", label: "tumpuk 4 atas=1", bin: "lancip" }, { id: "b3", label: "abaikan terhalang", bin: "tumpul" },
    { id: "b4", label: "max per kolom depan", bin: "lancip" }, { id: "b5", label: "perspektif wajib", bin: "tumpul" }, { id: "b6", label: "putar 3D membantu", bin: "lancip" },
  ],
  [
    { id: "c1", label: "1&3 → tampak 3", bin: "lancip" }, { id: "c2", label: "1&3 → tampak 4", bin: "tumpul" }, { id: "c3", label: "rekonstruksi dari 3 tampak", bin: "lancip" },
    { id: "c4", label: "atas memberi tinggi pasti", bin: "tumpul" }, { id: "c5", label: "siluet samping = max baris", bin: "lancip" }, { id: "c6", label: "hapus matriks OK", bin: "tumpul" },
  ],
];
export const RONDE_PASANG_CB: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "tampak atas", kanan: "petak terisi" }, { kiri: "Occlusion Max", kanan: "tinggi maksimum" },
    { kiri: "Orthographic", kanan: "tanpa perspektif" }, { kiri: "tumpuk 4", kanan: "atas = 1" },
  ],
  [
    { kiri: "Height-Matrix", kanan: "angka per petak" }, { kiri: "tampak depan", kanan: "max per kolom" },
    { kiri: "tampak samping", kanan: "max per baris" }, { kiri: "1 & 3 kolom sama", kanan: "tampak 3" },
  ],
  [
    { kiri: "putar 3D", kanan: "cek arah" }, { kiri: "Anike", kanan: "gambar 3 arah" },
    { kiri: "rekonstruksi", kanan: "model dari gambar" }, { kiri: "jebakan atas", kanan: "bukan tinggi" },
  ],
];
export const RONDE_MEMORI_CB = RONDE_PASANG_CB;
export const RONDE_KETUK_CB: { item: number[]; tanya: number[] }[] = [
  { item: [1, 3, 4, 5, 2, 6], tanya: [1, 4] },
  { item: [1, 3, 4, 5, 7, 8], tanya: [3, 5, 4] },
  { item: [1, 2, 4, 5, 6, 8], tanya: [1, 4] },
];
export const RONDE_SEMUA_CB: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "langkah proyeksi benar", item: [
    { id: "a", label: "isi matriks tinggi", cocok: true }, { id: "b", label: "ambil max per arah", cocok: true }, { id: "c", label: "jumlah mentah semua", cocok: false }, { id: "d", label: "ingat atas ≠ tinggi", cocok: true },
  ]},
  { label: "fakta buku B", item: [
    { id: "a", label: "tiga arah pandang", cocok: true }, { id: "b", label: "tumpuk 4 atas=1", cocok: true }, { id: "c", label: "atas = tinggi pasti", cocok: false }, { id: "d", label: "bisa rekonstruksi", cocok: true },
  ]},
  { label: "metode luar B", item: [
    { id: "a", label: "Orthographic", cocok: true }, { id: "b", label: "Occlusion Max", cocok: true }, { id: "c", label: "Hidden Support saja", cocok: false }, { id: "d", label: "Height-Matrix", cocok: true },
  ]},
];
export const RONDE_CERITA_CB: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "4 kubus ditumpuk, tampak atas?", jawab: "1", opsi: ["1", "4", "0"], pesan: "Tertutup." },
    { teks: "Occlusion Max dari depan?", jawab: "tinggi maksimum tiap kolom", opsi: ["tinggi maksimum tiap kolom", "jumlah semua mentah", "abaikan depan"], pesan: "Metode." },
  ],
  [
    { teks: "Tampak atas memberi tahu tinggi?", jawab: "tidak", opsi: ["tidak", "ya", "kadang pasti"], pesan: "Jebakan." },
    { teks: "Depan 1 belakang 3, tampak?", jawab: "3", opsi: ["3", "1", "4"], pesan: "Max." },
  ],
  [
    { teks: "METODE LUAR Height-Matrix?", jawab: "catat tinggi tiap petak", opsi: ["catat tinggi tiap petak", "hapus angka", "gambar lingkaran"], pesan: "Metode." },
    { teks: "Orthographic artinya?", jawab: "tampak datar tanpa perspektif", opsi: ["tampak datar tanpa perspektif", "hanya 3D miring", "tanpa petak"], pesan: "Proyeksi." },
  ],
];
export const RONDE_URUT_CB: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [1, 5, 3, 4], dari: "kecil" },
  { angka: [8, 1, 5, 4], dari: "besar" },
  { angka: [1, 4, 3, 2], dari: "kecil" },
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
    { baris: "tumpuk 4 atas", jawab: "1", opsi: ["1", "4", "0"], pesan: "Atas." },
    { baris: "Occlusion depan", jawab: "max kolom", opsi: ["max kolom", "jumlah mentah", "acak"], pesan: "Max." },
  ],
  [
    { baris: "tampak atas", jawab: "petak terisi", opsi: ["petak terisi", "tinggi pasti", "warna saja"], pesan: "Atas." },
    { baris: "1 & 3", jawab: "3", opsi: ["3", "1", "4"], pesan: "Siluet." },
  ],
  [
    { baris: "Height-Matrix", jawab: "tinggi per petak", opsi: ["tinggi per petak", "hapus tinggi", "hanya 0/1"], pesan: "Matriks." },
    { baris: "Orthographic", jawab: "tanpa perspektif", opsi: ["tanpa perspektif", "wajib miring", "tanpa petak"], pesan: "Proyeksi." },
  ],
];
export const RONDE_BENARSALAH_QB: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Dari atas kita tidak otomatis tahu tinggi menara.", benar: true, penjelasan: "Jebakan." },
    { teks: "Occlusion Max menjumlahkan semua tinggi tanpa maksimum.", benar: false, penjelasan: "Ambil max." },
    { teks: "Empat kubus ditumpuk tampak satu petak dari atas.", benar: true, penjelasan: "Benar." },
  ],
  [
    { teks: "Height-Matrix mencatat tinggi tiap petak alas.", benar: true, penjelasan: "Metode." },
    { teks: "Tampak depan selalu sama dengan jumlah semua kubus.", benar: false, penjelasan: "Ada yang terhalang." },
    { teks: "Orthographic memakai tampak datar.", benar: true, penjelasan: "Proyeksi." },
  ],
];
export const RONDE_DETEKTIF_QB: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["tumpuk", "empat", "atas"], jawab: "1", opsi: ["1", "4", "0"], salah: "Atas." },
  { klue: ["max", "kolom", "depan"], jawab: "Occlusion Max", opsi: ["Occlusion Max", "Manhattan", "Hidden Support"], salah: "Metode B." },
  { klue: ["1", "belakang 3", "tampak"], jawab: "3", opsi: ["3", "1", "4"], salah: "Max." },
];
export const PETA_KONSEP_QB = [{
  pusat: "Visualisasi Spasial",
  kotak: [
    { label: "Alat", opsi: ["matriks tinggi", "hanya warna", "tanpa angka"], benar: 0 },
    { label: "Depan/samping", opsi: ["ambil maksimum", "jumlah mentah", "abaikan"], benar: 0 },
    { label: "Atas", opsi: ["petak terisi saja", "tinggi pasti", "hapus petak"], benar: 0 },
    { label: "Metode luar", opsi: ["Orthographic / Matrix / Occlusion", "Manhattan saja", "Layer saja"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QB = RONDE_CERITA_CB;

// ========== C · Lokasi ==========
export const RONDE_HITUNG_CC: { derajat: number; hasil: number; pesan: string; tanya?: string; denah?: { huruf: string; angka: number; label?: string }[] }[][] = [
  [
    { derajat: 1, hasil: 6, pesan: "A3→E5: |4|+|2|=6.", tanya: "Jarak A3 ke E5?", denah: [{ huruf: "A", angka: 3, label: "P" }, { huruf: "E", angka: 5, label: "Q" }] },
    { derajat: 2, hasil: 3, pesan: "F1→D2: |F−D|+|1−2|=2+1=3.", tanya: "Jarak F1 ke D2?", denah: [{ huruf: "F", angka: 1, label: "K" }, { huruf: "D", angka: 2, label: "T" }] },
  ],
  [
    { derajat: 3, hasil: 5, pesan: "B6→D3: |B−D|+|6−3|=2+3=5.", tanya: "Jarak B6 ke D3?", denah: [{ huruf: "B", angka: 6, label: "P" }, { huruf: "D", angka: 3, label: "Q" }] },
    { derajat: 4, hasil: 2, pesan: "C2 ke C4 = 0+2=2.", tanya: "Jarak C2 ke C4?", denah: [{ huruf: "C", angka: 2, label: "M" }, { huruf: "C", angka: 4, label: "K" }] },
  ],
  [
    { derajat: 5, hasil: 4, pesan: "A1→E1 = 4+0=4.", tanya: "Jarak A1 ke E1?", denah: [{ huruf: "A", angka: 1, label: "P" }, { huruf: "E", angka: 1, label: "Q" }] },
    { derajat: 6, hasil: 0, pesan: "Titik sama jarak 0.", tanya: "Jarak B3 ke B3?", denah: [{ huruf: "B", angka: 3, label: "X" }] },
  ],
];
export const RONDE_ARTI_CC: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Grid Coordinate Naming?", jawab: "vertikal huruf, horizontal bilangan", opsi: ["vertikal huruf, horizontal bilangan", "vertikal bilangan saja", "tanpa huruf"], pesan: "Metode." },
    { tanya: "Manhattan Path Distance?", jawab: "|Δhuruf| + |Δangka|", opsi: ["|Δhuruf| + |Δangka|", "hanya Δhuruf", "akar kuadrat"], pesan: "Metode." },
  ],
  [
    { tanya: "Pesan berantai boleh diagonal?", jawab: "tidak, hanya tetangga sisi", opsi: ["tidak, hanya tetangga sisi", "boleh diagonal", "boleh lompat jauh"], pesan: "Buku." },
    { tanya: "Shortest Grid Path menekankan?", jawab: "beberapa jalur bisa sama pendek", opsi: ["beberapa jalur bisa sama pendek", "hanya satu jalur pernah ada", "diagonal selalu lebih pendek dihitung 1"], pesan: "Metode." },
  ],
  [
    { tanya: "Contoh lokasi Makassar di buku?", jawab: "C2", opsi: ["C2", "A1", "Z9"], pesan: "Buku." },
    { tanya: "A3 ke E5 jarak?", jawab: "6", opsi: ["6", "2", "8"], pesan: "4+2." },
  ],
];
export const RONDE_SORTIR_CC: { id: string; label: string; bin: "ya" | "tidak" }[][] = [
  [
    { id: "a1", label: "huruf = vertikal", bin: "ya" }, { id: "a2", label: "diagonal diizinkan", bin: "tidak" }, { id: "a3", label: "Manhattan", bin: "ya" },
    { id: "a4", label: "A3→E5=6", bin: "ya" }, { id: "a5", label: "A3→E5=2", bin: "tidak" }, { id: "a6", label: "tetangga sisi saja", bin: "ya" },
  ],
  [
    { id: "b1", label: "C2 contoh buku", bin: "ya" }, { id: "b2", label: "Shortest Path jamak", bin: "ya" }, { id: "b3", label: "jarak diagonal=1 langkah", bin: "tidak" },
    { id: "b4", label: "F1→D2=3", bin: "ya" }, { id: "b5", label: "tanpa angka OK", bin: "tidak" }, { id: "b6", label: "Grid Naming", bin: "ya" },
  ],
  [
    { id: "c1", label: "B6→D3=5", bin: "ya" }, { id: "c2", label: "titik sama jarak 0", bin: "ya" }, { id: "c3", label: "lompat bebas", bin: "tidak" },
    { id: "c4", label: "denah kelas pakai petak", bin: "ya" }, { id: "c5", label: "huruf horizontal wajib", bin: "tidak" }, { id: "c6", label: "4 arah gerak", bin: "ya" },
  ],
];
export const RONDE_PASANG_CC: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "huruf", kanan: "vertikal" }, { kiri: "angka", kanan: "horizontal" },
    { kiri: "Manhattan", kanan: "|Δh|+|Δa|" }, { kiri: "C2", kanan: "Makassar" },
  ],
  [
    { kiri: "A3→E5", kanan: "6" }, { kiri: "F1→D2", kanan: "3" },
    { kiri: "tetangga", kanan: "sisi saja" }, { kiri: "Shortest Path", kanan: "banyak cara" },
  ],
  [
    { kiri: "B6→D3", kanan: "5" }, { kiri: "diagonal", kanan: "tidak diizinkan" },
    { kiri: "denah kelas", kanan: "kursi (H,N)" }, { kiri: "titik sama", kanan: "jarak 0" },
  ],
];
export const RONDE_MEMORI_CC = RONDE_PASANG_CC;
export const RONDE_KETUK_CC: { item: number[]; tanya: number[] }[] = [
  { item: [0, 2, 3, 5, 6, 4], tanya: [6, 3] },
  { item: [0, 2, 5, 6, 8, 1], tanya: [5, 2, 0] },
  { item: [3, 4, 5, 6, 0, 2], tanya: [3, 6] },
];
export const RONDE_SEMUA_CC: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "aturan lokasi benar", item: [
    { id: "a", label: "huruf & angka", cocok: true }, { id: "b", label: "Manhattan", cocok: true }, { id: "c", label: "diagonal OK", cocok: false }, { id: "d", label: "banyak jalur pendek", cocok: true },
  ]},
  { label: "fakta buku C", item: [
    { id: "a", label: "C2 Makassar", cocok: true }, { id: "b", label: "A3→E5=6", cocok: true }, { id: "c", label: "pesan diagonal", cocok: false }, { id: "d", label: "F1→D2 contoh", cocok: true },
  ]},
  { label: "metode luar C", item: [
    { id: "a", label: "Grid Naming", cocok: true }, { id: "b", label: "Manhattan", cocok: true }, { id: "c", label: "Occlusion Max saja", cocok: false }, { id: "d", label: "Shortest Path", cocok: true },
  ]},
];
export const RONDE_CERITA_CC: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "Jarak (A,3) ke (E,5)?", jawab: "6", opsi: ["6", "2", "8"], pesan: "Manhattan." },
    { teks: "Lokasi contoh Makassar?", jawab: "C2", opsi: ["C2", "A1", "E5"], pesan: "Buku." },
  ],
  [
    { teks: "Pesan berantai boleh diagonal?", jawab: "tidak", opsi: ["tidak", "ya", "kadang"], pesan: "Sisi saja." },
    { teks: "F1 ke D2 jarak minimal?", jawab: "3", opsi: ["3", "1", "5"], pesan: "2+1." },
  ],
  [
    { teks: "METODE LUAR Manhattan?", jawab: "|Δhuruf|+|Δangka|", opsi: ["|Δhuruf|+|Δangka|", "hanya Δangka", "kali koordinat"], pesan: "Metode." },
    { teks: "B6 ke D3?", jawab: "5", opsi: ["5", "3", "2"], pesan: "2+3." },
  ],
];
export const RONDE_URUT_CC: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [0, 6, 3, 2], dari: "kecil" },
  { angka: [6, 2, 5, 3], dari: "besar" },
  { angka: [0, 3, 5, 4], dari: "kecil" },
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
    { baris: "A3→E5", jawab: "6", opsi: ["6", "2", "8"], pesan: "Jarak." },
    { baris: "Makassar", jawab: "C2", opsi: ["C2", "A1", "B3"], pesan: "Lokasi." },
  ],
  [
    { baris: "F1→D2", jawab: "3", opsi: ["3", "1", "5"], pesan: "Jarak." },
    { baris: "gerak sah", jawab: "4 arah sisi", opsi: ["4 arah sisi", "diagonal OK", "lompat bebas"], pesan: "Aturan." },
  ],
  [
    { baris: "Manhattan", jawab: "|Δh|+|Δa|", opsi: ["|Δh|+|Δa|", "Δh saja", "kali"], pesan: "Rumus." },
    { baris: "B6→D3", jawab: "5", opsi: ["5", "2", "9"], pesan: "Jarak." },
  ],
];
export const RONDE_BENARSALAH_QC: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Jarak Manhattan = |Δhuruf| + |Δangka|.", benar: true, penjelasan: "Metode." },
    { teks: "Pesan berantai boleh diagonal.", benar: false, penjelasan: "Hanya sisi." },
    { teks: "A3 ke E5 berjarak 6.", benar: true, penjelasan: "4+2." },
  ],
  [
    { teks: "Huruf pada sumbu vertikal sistem berpetak buku.", benar: true, penjelasan: "Grid Naming." },
    { teks: "Hanya ada satu jalur terpendek selalu.", benar: false, penjelasan: "Bisa banyak." },
    { teks: "C2 adalah contoh lokasi Makassar.", benar: true, penjelasan: "Buku." },
  ],
];
export const RONDE_DETEKTIF_QC: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["A3", "E5", "jarak"], jawab: "6", opsi: ["6", "2", "8"], salah: "Manhattan." },
  { klue: ["Makassar", "petak", "buku"], jawab: "C2", opsi: ["C2", "A1", "F1"], salah: "Grid." },
  { klue: ["F1", "D2", "kubus"], jawab: "3", opsi: ["3", "1", "5"], salah: "Jarak." },
];
export const PETA_KONSEP_QC = [{
  pusat: "Lokasi & Jalur",
  kotak: [
    { label: "Nama petak", opsi: ["huruf + angka", "hanya warna", "tanpa sumbu"], benar: 0 },
    { label: "Jarak", opsi: ["Manhattan", "diagonal 1 langkah", "acak"], benar: 0 },
    { label: "Gerak", opsi: ["4 arah sisi", "diagonal wajib", "lompat bebas"], benar: 0 },
    { label: "Metode luar", opsi: ["Grid / Manhattan / Shortest Path", "Occlusion saja", "Layer saja"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QC = RONDE_CERITA_CC;
