/**
 * Data murni Matematika Kelas 5 Bab 1 (Bilangan Cacah sampai 100.000): Sub-Bab A–D.
 * Sumber: Buku Siswa Matematika Kelas V Kemendikbudristek Bab 1 hlm. 1–25.
 * Tempat: puluh ribuan–satuan. Tanpa React/jaringan. Uji: scripts/uji-data-k5b1.mjs.
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
export const opsiTeks = (benar: string, pengecoh: string[], seed: number) => {
  const o = [benar, ...pengecoh.slice(0, 2)];
  while (o.length < 3) o.push(`?${o.length}`);
  return urutanTetap(3, 1, seed).map((i) => o[i]);
};

export type Lima = { pr: number; rb: number; r: number; p: number; s: number };
export const lima = (n: number): Lima => ({
  pr: Math.floor(n / 10000) % 10,
  rb: Math.floor(n / 1000) % 10,
  r: Math.floor(n / 100) % 10,
  p: Math.floor(n / 10) % 10,
  s: n % 10,
});
export const gabung5 = (pr: number, rb: number, r: number, p: number, s: number) =>
  pr * 10000 + rb * 1000 + r * 100 + p * 10 + s;

const KATA_SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];

function kataDuaAngka(n: number): string {
  if (n < 10) return KATA_SATUAN[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${KATA_SATUAN[n - 10]} belas`;
  const sisa = n % 10;
  return `${KATA_SATUAN[Math.floor(n / 10)]} puluh${sisa ? ` ${KATA_SATUAN[sisa]}` : ""}`;
}
function kataRatusan(n: number): string {
  if (n === 0) return "";
  if (n === 100) return "seratus";
  const r = Math.floor(n / 100);
  const sisa = n % 100;
  const bagian: string[] = [];
  if (r === 1) bagian.push("seratus");
  else if (r >= 2) bagian.push(`${KATA_SATUAN[r]} ratus`);
  if (sisa > 0) bagian.push(kataDuaAngka(sisa));
  return bagian.join(" ");
}

/** Kata bilangan Indonesia 0–100.000. */
export function kata(n: number): string {
  if (n === 0) return "nol";
  if (n === 100000) return "seratus ribu";
  if (n < 1000) return kataRatusan(n) || "nol";
  if (n < 10000) {
    const rb = Math.floor(n / 1000);
    const sisa = n % 1000;
    const depan = rb === 1 ? "seribu" : `${KATA_SATUAN[rb]} ribu`;
    return sisa === 0 ? depan : `${depan} ${kataRatusan(sisa)}`;
  }
  const ribu = Math.floor(n / 1000);
  const sisa = n % 1000;
  const depan = `${kataDuaAngka(ribu)} ribu`;
  return sisa === 0 ? depan : `${depan} ${kataRatusan(sisa)}`;
}

/** Lambang titik Indonesia: 14500 → "14.500", 100000 → "100.000". */
export function lambang(n: number): string {
  if (n < 1000) return String(n);
  if (n < 1000000) {
    const s = String(n);
    return `${s.slice(0, -3)}.${s.slice(-3)}`;
  }
  return String(n);
}

export type TempatNama = "puluh ribuan" | "ribuan" | "ratusan" | "puluhan" | "satuan";
export const nilaiTempat = (n: number, tempat: TempatNama): number => {
  const d = lima(n);
  if (tempat === "puluh ribuan") return d.pr * 10000;
  if (tempat === "ribuan") return d.rb * 1000;
  if (tempat === "ratusan") return d.r * 100;
  if (tempat === "puluhan") return d.p * 10;
  return d.s;
};
export const digitTempat = (n: number, tempat: TempatNama): number => {
  const d = lima(n);
  if (tempat === "puluh ribuan") return d.pr;
  if (tempat === "ribuan") return d.rb;
  if (tempat === "ratusan") return d.r;
  if (tempat === "puluhan") return d.p;
  return d.s;
};

export const banding = (a: number, b: number): ">" | "<" | "=" => (a > b ? ">" : a < b ? "<" : "=");

/** Angka contoh buku (tanpa konteks tukar). */
export const ANGKA_BUKU = {
  bukuYohana: 14500,
  obat: 66500,
  penduduk: 26932,
  laki: 13354,
  perempuan: 13578,
  a: 15950,
  b: 16667,
  c: 44567,
  dakon: [56560, 65750, 57000, 75360] as const,
  hubung: [88976, 54675, 40350, 25786, 13456] as const,
  tujuh: 87986,
} as const;

/* ===== A: Membaca, menulis, nilai tempat ===== */
export const RONDE_BACA_CA: { n: number; kata: string }[][] = [
  [
    { n: 14500, kata: kata(14500) },
    { n: 66500, kata: kata(66500) },
  ],
  [
    { n: 26932, kata: kata(26932) },
    { n: 13578, kata: kata(13578) },
  ],
  [
    { n: 15950, kata: kata(15950) },
    { n: 44567, kata: kata(44567) },
  ],
];
export const RONDE_TULIS_CA: { kata: string; n: number }[][] = [
  [
    { kata: "empat belas ribu lima ratus", n: 14500 },
    { kata: "enam puluh enam ribu lima ratus", n: 66500 },
  ],
  [
    { kata: "dua puluh enam ribu sembilan ratus tiga puluh dua", n: 26932 },
    { kata: "tiga belas ribu tiga ratus lima puluh empat", n: 13354 },
  ],
  [
    { kata: "empat puluh ribu tiga ratus lima puluh", n: 40350 },
    { kata: "delapan puluh delapan ribu sembilan ratus tujuh puluh enam", n: 88976 },
  ],
];
export const RONDE_TEMPAT_CA: { n: number; tempat: TempatNama; digit: number; nilai: number }[][] = [
  [
    { n: 14500, tempat: "puluh ribuan", digit: 1, nilai: 10000 },
    { n: 14500, tempat: "ribuan", digit: 4, nilai: 4000 },
  ],
  [
    { n: 87986, tempat: "ribuan", digit: 7, nilai: 7000 },
    { n: 87986, tempat: "puluh ribuan", digit: 8, nilai: 80000 },
  ],
  [
    { n: 40350, tempat: "puluh ribuan", digit: 4, nilai: 40000 },
    { n: 40350, tempat: "satuan", digit: 0, nilai: 0 },
  ],
];
export const RONDE_SORTIR_CA: { id: string; label: string; bin: "lima" | "empat" }[][] = [
  [
    { id: "a", label: "14.500", bin: "lima" },
    { id: "b", label: "3.456", bin: "empat" },
    { id: "c", label: "66.500", bin: "lima" },
    { id: "d", label: "999", bin: "empat" },
    { id: "e", label: "26.932", bin: "lima" },
    { id: "f", label: "1.025", bin: "empat" },
  ],
  [
    { id: "a2", label: "87.986", bin: "lima" },
    { id: "b2", label: "8.796", bin: "empat" },
    { id: "c2", label: "40.350", bin: "lima" },
    { id: "d2", label: "350", bin: "empat" },
    { id: "e2", label: "100.000", bin: "lima" },
    { id: "f2", label: "10.000", bin: "lima" },
  ],
  [
    { id: "a3", label: "15.950", bin: "lima" },
    { id: "b3", label: "5.950", bin: "empat" },
    { id: "c3", label: "44.567", bin: "lima" },
    { id: "d3", label: "4.567", bin: "empat" },
    { id: "e3", label: "13.456", bin: "lima" },
    { id: "f3", label: "456", bin: "empat" },
  ],
];
export const RONDE_PASANG_CA: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "14.500", kanan: kata(14500) },
    { kiri: "66.500", kanan: kata(66500) },
    { kiri: "puluh ribuan", kanan: "10.000" },
    { kiri: "ribuan", kanan: "1.000" },
  ],
  [
    { kiri: "26.932", kanan: kata(26932) },
    { kiri: "13.578", kanan: kata(13578) },
    { kiri: "digit 7 di 87.986", kanan: "ribuan" },
    { kiri: "nol menjaga tempat", kanan: "tetap ditulis" },
  ],
  [
    { kiri: "40.350", kanan: kata(40350) },
    { kiri: "88.976", kanan: kata(88976) },
    { kiri: "ratusan", kanan: "100" },
    { kiri: "satuan", kanan: "1" },
  ],
];
export const RONDE_MEMORI_CA = RONDE_PASANG_CA;
export const RONDE_KETUK_CA: { item: number[]; tanya: number[] }[] = [
  { item: [14500, 66500, 26932, 15950], tanya: [14500, 66500, 26932] },
  { item: [40350, 88976, 54675, 25786], tanya: [40350, 88976, 25786] },
  { item: [13456, 44567, 16667, 87986], tanya: [13456, 87986, 44567] },
];
export const RONDE_SEMUA_CA: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  {
    label: "≥ 50.000",
    item: [14500, 66500, 26932, 87986, 40350].map((n) => ({ id: String(n), label: lambang(n), cocok: n >= 50000 })),
  },
  {
    label: "digit puluh ribuan = 1",
    item: [14500, 66500, 15950, 26932, 87986].map((n) => ({ id: String(n), label: lambang(n), cocok: lima(n).pr === 1 })),
  },
  {
    label: "ada nol di satuan",
    item: [14500, 66500, 40350, 26932, 13456].map((n) => ({ id: String(n), label: lambang(n), cocok: lima(n).s === 0 })),
  },
];
export const RONDE_CERITA_CA: { teks: string; jawab: string | number; opsi: (string | number)[]; pesan: string }[][] = [
  [
    { teks: "Empat belas ribu lima ratus ditulis …", jawab: "14.500", opsi: ["14.500", "1.450", "145.000"], pesan: "Cara Yohana di buku." },
    { teks: "66.500 dibaca …", jawab: kata(66500), opsi: [kata(66500), kata(6650), kata(66005)], pesan: "Enam puluh enam ribu lima ratus." },
  ],
  [
    { teks: "Penduduk 26.932. Digit puluh ribuan?", jawab: 2, opsi: [2, 6, 9], pesan: "2 × 10.000." },
    { teks: "Nilai tempat digit 7 pada 87.986?", jawab: "ribuan", opsi: ["ribuan", "puluh ribuan", "satuan"], pesan: "7 di kolom ribuan." },
  ],
  [
    { teks: "40.350: nilai puluh ribuan?", jawab: 40000, opsi: [40000, 4, 400], pesan: "4 × 10.000." },
    { teks: "Nol pada 14.500 berfungsi untuk …", jawab: "menjaga tempat", opsi: ["menjaga tempat", "dihapus saja", "diganti sembilan"], pesan: "Nol tetap ditulis." },
  ],
];
export const RONDE_URUT_CA: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [14500, 66500, 26932, 15950], dari: "kecil" },
  { angka: [87986, 40350, 54675, 25786], dari: "besar" },
  { angka: [13456, 44567, 16667, 88976], dari: "kecil" },
];
export const RONDE_BACA_PA = RONDE_BACA_CA;
export const RONDE_PASANG_PA = RONDE_PASANG_CA;
export const RONDE_MEMORI_PA = RONDE_MEMORI_CA;
export const RONDE_SORTIR_PA = RONDE_SORTIR_CA;
export const RONDE_SEMUA_PA = RONDE_SEMUA_CA;
export const RONDE_TEMPAT_PA = RONDE_TEMPAT_CA;
export const RONDE_TABEL_PA: { baris: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { baris: "14.500 → kata", jawab: kata(14500), opsi: [kata(14500), kata(1450), kata(145000)], pesan: "Buku Yohana." },
    { baris: "PR pada 14.500", jawab: "1", opsi: ["1", "4", "5"], pesan: "Puluh ribuan." },
  ],
  [
    { baris: "7 di 87.986", jawab: "ribuan", opsi: ["ribuan", "ratusan", "satuan"], pesan: "Tabel buku." },
    { baris: "26.932 → PR", jawab: "2", opsi: ["2", "6", "9"], pesan: "Digit kiri." },
  ],
  [
    { baris: "40.350 kata", jawab: kata(40350), opsi: [kata(40350), kata(4350), kata(40305)], pesan: "Empat puluh ribu…" },
    { baris: "nilai 4 di 40.350", jawab: "40.000", opsi: ["40.000", "4", "400"], pesan: "4 × 10.000." },
  ],
];
export const RONDE_BENARSALAH_QA: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "14.500 dibaca empat belas ribu lima ratus.", benar: true, penjelasan: "Benar menurut buku." },
    { teks: "Nol pada bilangan boleh dihilangkan saat menulis.", benar: false, penjelasan: "Nol menjaga nilai tempat." },
    { teks: "Digit paling kiri pada lima angka adalah puluh ribuan.", benar: true, penjelasan: "PR–RB–R–P–S." },
  ],
  [
    { teks: "Nilai digit 7 pada 87.986 adalah 7.000.", benar: true, penjelasan: "Ribuan." },
    { teks: "66.500 sama dengan enam ribu enam ratus lima puluh.", benar: false, penjelasan: "Enam puluh enam ribu lima ratus." },
    { teks: "100.000 adalah batas atas bab ini.", benar: true, penjelasan: "Sampai 100.000." },
  ],
];
export const RONDE_DETEKTIF_QA: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["empat belas ribu lima ratus", "PR=1, RB=4, R=5", "puluhan & satuan nol"], jawab: "14.500", opsi: ["14.500", "1.450", "145.000"], salah: "Susun digit." },
  { klue: ["digit 7 di kolom ribuan", "bilangan 87.986", "cari nilai tempat"], jawab: "7.000", opsi: ["7.000", "70.000", "700"], salah: "Ribuan × 1.000." },
  { klue: ["penduduk 26.932", "cari digit puluh ribuan"], jawab: "2", opsi: ["2", "6", "9"], salah: "Paling kiri." },
];
export const PETA_KONSEP_QA = [
  {
    pusat: "Bilangan sampai 100.000",
    kotak: [
      { label: "Tempat", opsi: ["PR–RB–R–P–S", "hanya satuan", "tanpa nol"], benar: 0 },
      { label: "Membaca", opsi: ["dari kiri ke kanan", "acak saja", "abaikan nol"], benar: 0 },
      { label: "Menulis", opsi: ["isi tiap kolom tempat", "tebak panjang", "hapus nol"], benar: 0 },
      { label: "Nol", opsi: ["menjaga tempat", "tidak perlu", "diganti sembilan"], benar: 0 },
    ],
  },
];
export const RONDE_CERITA_QA = RONDE_CERITA_CA;

/* ===== B: Membandingkan & mengurutkan ===== */
export const RONDE_BANDING_CB: { a: number; b: number; tanda: ">" | "<" | "=" }[][] = [
  [
    { a: 56475, b: 43217, tanda: ">" },
    { a: 78897, b: 87897, tanda: "<" },
  ],
  [
    { a: 97768, b: 89876, tanda: ">" },
    { a: 13234, b: 13234, tanda: "=" },
  ],
  [
    { a: 56560, b: 57000, tanda: "<" },
    { a: 75360, b: 65750, tanda: ">" },
  ],
];
export const RONDE_JENIS_CB: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Membandingkan bilangan lima angka dimulai dari …", jawab: "puluh ribuan", opsi: ["puluh ribuan", "satuan", "ratusan saja"], pesan: "Dari kiri." },
    { tanya: "Jika puluh ribuan sama, bandingkan …", jawab: "ribuan", opsi: ["ribuan", "satuan dulu", "acak"], pesan: "Tempat berikutnya." },
  ],
  [
    { tanya: "56.560 dan 57.000: mana lebih besar?", jawab: "57.000", opsi: ["57.000", "56.560", "sama"], pesan: "Ribuan 7 > 6." },
    { tanya: "Mengurutkan dari kecil ke besar disebut …", jawab: "menaik", opsi: ["menaik", "menurun", "acak"], pesan: "Murah → mahal." },
  ],
  [
    { tanya: "Tanda untuk a lebih besar dari b adalah …", jawab: ">", opsi: [">", "<", "="], pesan: "Simbol banding." },
    { tanya: "Jika semua digit sama, hasil banding …", jawab: "=", opsi: ["=", ">", "<"], pesan: "Sama besar." },
  ],
];
export const RONDE_SORTIR_CB: { id: string; label: string; bin: "besar" | "kecil" }[][] = [
  [
    { id: "a", label: "75.360", bin: "besar" },
    { id: "b", label: "56.560", bin: "kecil" },
    { id: "c", label: "65.750", bin: "besar" },
    { id: "d", label: "57.000", bin: "kecil" },
    { id: "e", label: "87.986", bin: "besar" },
    { id: "f", label: "13.456", bin: "kecil" },
  ],
  [
    { id: "a2", label: "97.768", bin: "besar" },
    { id: "b2", label: "43.217", bin: "kecil" },
    { id: "c2", label: "89.876", bin: "besar" },
    { id: "d2", label: "56.475", bin: "kecil" },
    { id: "e2", label: "78.897", bin: "besar" },
    { id: "f2", label: "40.350", bin: "kecil" },
  ],
  [
    { id: "a3", label: "88.976", bin: "besar" },
    { id: "b3", label: "15.950", bin: "kecil" },
    { id: "c3", label: "66.500", bin: "besar" },
    { id: "d3", label: "14.500", bin: "kecil" },
    { id: "e3", label: "54.675", bin: "besar" },
    { id: "f3", label: "25.786", bin: "kecil" },
  ],
];
export const RONDE_PASANG_CB: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "56.560 ? 57.000", kanan: "<" },
    { kiri: "75.360 ? 65.750", kanan: ">" },
    { kiri: "13.234 ? 13.234", kanan: "=" },
    { kiri: "mula banding", kanan: "puluh ribuan" },
  ],
  [
    { kiri: "paling kecil dakon", kanan: "56.560" },
    { kiri: "paling besar dakon", kanan: "75.360" },
    { kiri: "urut naik", kanan: "kecil → besar" },
    { kiri: "urut turun", kanan: "besar → kecil" },
  ],
  [
    { kiri: "56.475 ? 43.217", kanan: ">" },
    { kiri: "78.897 ? 87.897", kanan: "<" },
    { kiri: "PR sama → cek", kanan: "ribuan" },
    { kiri: "semua digit sama", kanan: "=" },
  ],
];
export const RONDE_MEMORI_CB = RONDE_PASANG_CB;
export const RONDE_KETUK_CB: { item: number[]; tanya: number[] }[] = [
  { item: [56560, 65750, 57000, 75360], tanya: [56560, 75360, 57000] },
  { item: [56475, 43217, 78897, 87897], tanya: [43217, 87897, 56475] },
  { item: [15500, 16500, 19500, 50000], tanya: [15500, 19500, 50000] },
];
export const RONDE_SEMUA_CB: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  {
    label: "> 60.000",
    item: [56560, 65750, 57000, 75360].map((n) => ({ id: String(n), label: lambang(n), cocok: n > 60000 })),
  },
  {
    label: "< 50.000",
    item: [56475, 43217, 78897, 40350].map((n) => ({ id: String(n), label: lambang(n), cocok: n < 50000 })),
  },
  {
    label: "PR = 5",
    item: [56560, 65750, 57000, 75360].map((n) => ({ id: String(n), label: lambang(n), cocok: lima(n).pr === 5 })),
  },
];
export const RONDE_CERITA_CB: { teks: string; jawab: string | number; opsi: (string | number)[]; pesan: string }[][] = [
  [
    { teks: "Dakon: 56.560, 65.750, 57.000, 75.360. Paling kecil?", jawab: "56.560", opsi: ["56.560", "57.000", "65.750"], pesan: "PR sama 5; ribuan 6 terkecil di antara yang 5x." },
    { teks: "Paling besar di antara keempat dakon?", jawab: "75.360", opsi: ["75.360", "65.750", "57.000"], pesan: "PR 7 terbesar." },
  ],
  [
    { teks: "56.475 dan 43.217: yang lebih kecil?", jawab: "43.217", opsi: ["43.217", "56.475", "sama"], pesan: "PR 4 < 5." },
    { teks: "Urut naik 15.500, 16.500, 19.500: pola +?", jawab: 1000, opsi: [1000, 100, 10], pesan: "Naik seribu." },
  ],
  [
    { teks: "85.350, 85.450, 85.550: yang tengah?", jawab: "85.450", opsi: ["85.450", "85.350", "85.550"], pesan: "Urutan menaik." },
    { teks: "Jika PR sama, langkah berikutnya?", jawab: "bandingkan ribuan", opsi: ["bandingkan ribuan", "langsung satuan", "acak"], pesan: "Strategi buku." },
  ],
];
export const RONDE_URUT_CB: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [56560, 65750, 57000, 75360], dari: "kecil" },
  { angka: [56475, 43217, 78897, 87897], dari: "besar" },
  { angka: [15500, 16500, 19500, 50000], dari: "kecil" },
];
export const RONDE_BANDING_PB = RONDE_BANDING_CB;
export const RONDE_PASANG_PB = RONDE_PASANG_CB;
export const RONDE_MEMORI_PB = RONDE_MEMORI_CB;
export const RONDE_SORTIR_PB = RONDE_SORTIR_CB;
export const RONDE_SEMUA_PB = RONDE_SEMUA_CB;
export const RONDE_JENIS_PB = RONDE_JENIS_CB;
export const RONDE_TABEL_PB: { baris: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { baris: "56.560 ? 57.000", jawab: "<", opsi: ["<", ">", "="], pesan: "Ribuan 6 < 7." },
    { baris: "paling kecil dakon", jawab: "56.560", opsi: ["56.560", "75.360", "65.750"], pesan: "Urut naik." },
  ],
  [
    { baris: "78.897 ? 87.897", jawab: "<", opsi: ["<", ">", "="], pesan: "PR 7 < 8." },
    { baris: "mula banding", jawab: "puluh ribuan", opsi: ["puluh ribuan", "satuan", "puluhan"], pesan: "Dari kiri." },
  ],
  [
    { baris: "13.234 ? 13.234", jawab: "=", opsi: ["=", ">", "<"], pesan: "Sama." },
    { baris: "urut turun dakon pertama", jawab: "75.360", opsi: ["75.360", "56.560", "57.000"], pesan: "Terbesar dulu." },
  ],
];
export const RONDE_BENARSALAH_QB: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Membandingkan dimulai dari puluh ribuan.", benar: true, penjelasan: "Dari kiri." },
    { teks: "56.560 lebih besar dari 57.000.", benar: false, penjelasan: "57.000 lebih besar." },
    { teks: "Jika semua digit sama, hasilnya =.", benar: true, penjelasan: "Sama besar." },
  ],
  [
    { teks: "75.360 adalah yang terbesar di data dakon buku.", benar: true, penjelasan: "PR 7." },
    { teks: "Urut menaik berarti dari besar ke kecil.", benar: false, penjelasan: "Kecil ke besar." },
    { teks: "Jika PR sama, bandingkan ribuan.", benar: true, penjelasan: "Strategi tempat." },
  ],
];
export const RONDE_DETEKTIF_QB: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["empat harga dakon", "cari paling kecil", "56.560 / 65.750 / 57.000 / 75.360"], jawab: "56.560", opsi: ["56.560", "75.360", "65.750"], salah: "Banding PR lalu RB." },
  { klue: ["56.475 dan 43.217", "cari yang lebih kecil"], jawab: "43.217", opsi: ["43.217", "56.475", "sama"], salah: "PR 4 < 5." },
  { klue: ["PR sama", "langkah berikutnya"], jawab: "bandingkan ribuan", opsi: ["bandingkan ribuan", "langsung selesai", "acak digit"], salah: "Tempat berikutnya." },
];
export const PETA_KONSEP_QB = [
  {
    pusat: "Banding & Urut",
    kotak: [
      { label: "Mulai", opsi: ["puluh ribuan", "satuan", "acak"], benar: 0 },
      { label: "Jika sama", opsi: ["cek tempat berikutnya", "langsung =", "berhenti"], benar: 0 },
      { label: "Menaik", opsi: ["kecil → besar", "besar → kecil", "acak"], benar: 0 },
      { label: "Tanda", opsi: ["> < =", "hanya +", "tanpa simbol"], benar: 0 },
    ],
  },
];
export const RONDE_CERITA_QB = RONDE_CERITA_CB;

/** Angka contoh Sub-Bab C–D (komposisi & operasi). Tanpa konteks tukar. */
export const ANGKA_BUKU_CD = {
  asep: 38600,
  lukas: 63500,
  komang: 45600,
  nisaIbu: 57500,
  nisaAyah: 22000,
  nisaJumlah: 79500,
  ayam: 32500,
  plencing: 13250,
  bayarMakan: 45750,
  uangLukas: 47900,
  sisaLukas: 2150,
  angpau: 5000,
  angpauJumlah: 60000,
  bagiOrtu: 64000,
  bagiAnak: 16000,
  mangga: 23500,
  jeruk: 17000,
  kelengkeng: 34000,
  naga: 15000,
  alpukat: 32000,
} as const;

export type Pecahan = { pr: number; rb: number; r: number; p?: number; s?: number };
export const jumlahPecahan = (p: Pecahan) =>
  (p.pr || 0) * 10000 + (p.rb || 0) * 1000 + (p.r || 0) * 100 + (p.p || 0) * 10 + (p.s || 0);

// ---- Sub-Bab C: Komposisi & Dekomposisi ----
export const RONDE_KOMPOS_CC: { pecahan: Pecahan; total: number; pesan: string }[][] = [
  [
    { pecahan: { pr: 3, rb: 8, r: 6 }, total: 38600, pesan: "3×10.000 + 8×1.000 + 6×100 = 38.600" },
    { pecahan: { pr: 6, rb: 3, r: 5 }, total: 63500, pesan: "6×10.000 + 3×1.000 + 5×100 = 63.500" },
  ],
  [
    { pecahan: { pr: 4, rb: 5, r: 6 }, total: 45600, pesan: "4×10.000 + 5×1.000 + 6×100 = 45.600" },
    { pecahan: { pr: 2, rb: 7, r: 0 }, total: 27000, pesan: "2×10.000 + 7×1.000 = 27.000" },
  ],
  [
    { pecahan: { pr: 5, rb: 15, r: 16 }, total: 66600, pesan: "5×10.000 + 15×1.000 + 16×100 = 66.600" },
    { pecahan: { pr: 1, rb: 2, r: 3, p: 4, s: 5 }, total: 12345, pesan: "1×10.000 + 2×1.000 + 3×100 + 4×10 + 5 = 12.345" },
  ],
];

export const RONDE_DEKOM_CC: { n: number; uraian: string; pesan: string }[][] = [
  [
    { n: 38600, uraian: "30.000 + 8.000 + 600", pesan: "Bentuk panjang Asep." },
    { n: 63500, uraian: "60.000 + 3.000 + 500", pesan: "Bentuk panjang Lukas." },
  ],
  [
    { n: 45600, uraian: "40.000 + 5.000 + 600", pesan: "Bentuk panjang Komang." },
    { n: 57500, uraian: "50.000 + 7.000 + 500", pesan: "Uraian uang Ibu." },
  ],
  [
    { n: 22000, uraian: "20.000 + 2.000", pesan: "Uraian uang Ayah." },
    { n: 14500, uraian: "10.000 + 4.000 + 500", pesan: "Uraian 14.500." },
  ],
];

export const RONDE_CARA_CC: { total: number; tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { total: 45600, tanya: "Cara 1: 4×10.000 + 5×1.000 + 6×100. Benar?", jawab: "benar", opsi: ["benar", "salah", "kurang data"], pesan: "Jumlahnya 45.600." },
    { total: 45600, tanya: "Cara 2: 3×10.000 + 15×1.000 + 6×100. Hasil?", jawab: "45.600", opsi: ["45.600", "36.600", "51.600"], pesan: "3×10rb + 15×1rb + 6×100." },
  ],
  [
    { total: 45600, tanya: "Cara 3: 2×10.000 + 25×1.000 + 6×100. Hasil?", jawab: "45.600", opsi: ["45.600", "27.600", "55.600"], pesan: "Komposisi fleksibel." },
    { total: 45600, tanya: "Cara 4: 45×1.000 + 6×100. Hasil?", jawab: "45.600", opsi: ["45.600", "4.560", "51.000"], pesan: "Tanpa pecahan 10rb tetap sah." },
  ],
  [
    { total: 38600, tanya: "Apakah 2×10.000 + 18×1.000 + 6×100 = 38.600?", jawab: "ya", opsi: ["ya", "tidak", "tidak cukup"], pesan: "2×10rb + 18×1rb + 6×100." },
    { total: 63500, tanya: "Apakah 63×1.000 + 5×100 = 63.500?", jawab: "ya", opsi: ["ya", "tidak", "hanya 63.000"], pesan: "63 ribu + 500." },
  ],
];

export const RONDE_SORTIR_CC: { id: string; label: string; bin: "sama" | "beda" }[][] = [
  [
    { id: "c1", label: "3×10rb+8×1rb+6×100", bin: "sama" },
    { id: "c2", label: "2×10rb+18×1rb+6×100", bin: "sama" },
    { id: "c3", label: "4×10rb+8×1rb+6×100", bin: "beda" },
    { id: "c4", label: "38×1rb+6×100", bin: "sama" },
    { id: "c5", label: "30.000+8.000+500", bin: "beda" },
    { id: "c6", label: "30.000+8.000+600", bin: "sama" },
  ],
  [
    { id: "d1", label: "6×10rb+3×1rb+5×100", bin: "sama" },
    { id: "d2", label: "5×10rb+13×1rb+5×100", bin: "sama" },
    { id: "d3", label: "63×1rb+5×100", bin: "sama" },
    { id: "d4", label: "60.000+3.000+400", bin: "beda" },
    { id: "d5", label: "7×10rb+3×1rb+5×100", bin: "beda" },
    { id: "d6", label: "60.000+3.000+500", bin: "sama" },
  ],
  [
    { id: "e1", label: "4×10rb+5×1rb+6×100", bin: "sama" },
    { id: "e2", label: "45×1rb+6×100", bin: "sama" },
    { id: "e3", label: "5×10rb+15×1rb+16×100", bin: "beda" },
    { id: "e4", label: "40.000+5.000+600", bin: "sama" },
    { id: "e5", label: "3×10rb+15×1rb+6×100", bin: "sama" },
    { id: "e6", label: "40.000+6.000+600", bin: "beda" },
  ],
];

export const RONDE_PASANG_CC: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "3×10rb + 8×1rb + 6×100", kanan: "38.600" },
    { kiri: "6×10rb + 3×1rb + 5×100", kanan: "63.500" },
    { kiri: "4×10rb + 5×1rb + 6×100", kanan: "45.600" },
    { kiri: "5×10rb + 7×1rb + 5×100", kanan: "57.500" },
  ],
  [
    { kiri: "30.000 + 8.000 + 600", kanan: "38.600" },
    { kiri: "60.000 + 3.000 + 500", kanan: "63.500" },
    { kiri: "40.000 + 5.000 + 600", kanan: "45.600" },
    { kiri: "20.000 + 2.000", kanan: "22.000" },
  ],
  [
    { kiri: "45×1.000 + 6×100", kanan: "45.600" },
    { kiri: "38×1.000 + 6×100", kanan: "38.600" },
    { kiri: "63×1.000 + 5×100", kanan: "63.500" },
    { kiri: "57×1.000 + 5×100", kanan: "57.500" },
  ],
];
export const RONDE_MEMORI_CC = RONDE_PASANG_CC;

export const RONDE_KETUK_CC: { item: number[]; tanya: number[] }[] = [
  { item: [38600, 63500, 45600, 57500], tanya: [38600, 63500] },
  { item: [45600, 22000, 79500, 14500], tanya: [45600, 22000] },
  { item: [38600, 45600, 63500, 27000], tanya: [45600, 63500] },
];

export const RONDE_SEMUA_CC: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  {
    label: "hasilnya 38.600",
    item: [
      { id: "a", label: "3×10rb+8×1rb+6×100", cocok: true },
      { id: "b", label: "2×10rb+18×1rb+6×100", cocok: true },
      { id: "c", label: "4×10rb+8×1rb+6×100", cocok: false },
      { id: "d", label: "38×1rb+6×100", cocok: true },
    ],
  },
  {
    label: "hasilnya 45.600",
    item: [
      { id: "a", label: "4×10rb+5×1rb+6×100", cocok: true },
      { id: "b", label: "3×10rb+15×1rb+6×100", cocok: true },
      { id: "c", label: "5×10rb+5×1rb+6×100", cocok: false },
      { id: "d", label: "45×1rb+6×100", cocok: true },
    ],
  },
  {
    label: "hasilnya 63.500",
    item: [
      { id: "a", label: "6×10rb+3×1rb+5×100", cocok: true },
      { id: "b", label: "60.000+3.000+500", cocok: true },
      { id: "c", label: "60.000+3.000+400", cocok: false },
      { id: "d", label: "63×1rb+5×100", cocok: true },
    ],
  },
];

export const RONDE_CERITA_CC: { teks: string; jawab: string | number; opsi: (string | number)[]; pesan: string }[][] = [
  [
    { teks: "Asep: 3 lembar 10rb, 8 lembar 1rb, 6 keping 100. Total?", jawab: "38.600", opsi: ["38.600", "36.800", "48.600"], pesan: "30.000+8.000+600." },
    { teks: "Lukas: 6 lembar 10rb, 3 lembar 1rb, 5 keping 100. Total?", jawab: "63.500", opsi: ["63.500", "36.500", "65.300"], pesan: "60.000+3.000+500." },
  ],
  [
    { teks: "Komang butuh 45.600. Apakah 4×10rb + 5×1rb + 6×100 cukup?", jawab: "ya, pas", opsi: ["ya, pas", "kurang", "lebih"], pesan: "Jumlah tepat 45.600." },
    { teks: "Uraian 57.500 bentuk panjang?", jawab: "50.000 + 7.000 + 500", opsi: ["50.000 + 7.000 + 500", "5.000 + 700 + 50", "57 + 500"], pesan: "Nilai tempat." },
  ],
  [
    { teks: "5×10rb + 15×1rb + 16×100 = ?", jawab: "66.600", opsi: ["66.600", "56.600", "51.600"], pesan: "50.000+15.000+1.600." },
    { teks: "Mana komposisi lain untuk 38.600?", jawab: "38×1rb + 6×100", opsi: ["38×1rb + 6×100", "3×10rb + 6×100", "8×10rb + 3×1rb"], pesan: "38 ribu + 600." },
  ],
];

export const RONDE_URUT_CC: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [38600, 63500, 45600], dari: "kecil" },
  { angka: [57500, 22000, 79500], dari: "besar" },
  { angka: [14500, 45600, 38600, 27000], dari: "kecil" },
];

export const RONDE_KOMPOS_PC = RONDE_KOMPOS_CC;
export const RONDE_DEKOM_PC = RONDE_DEKOM_CC;
export const RONDE_PASANG_PC = RONDE_PASANG_CC;
export const RONDE_MEMORI_PC = RONDE_MEMORI_CC;
export const RONDE_SORTIR_PC = RONDE_SORTIR_CC;
export const RONDE_SEMUA_PC = RONDE_SEMUA_CC;
export const RONDE_CARA_PC = RONDE_CARA_CC;

export const RONDE_TABEL_PC: { baris: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { baris: "3×10rb + 8×1rb + 6×100", jawab: "38.600", opsi: ["38.600", "36.800", "48.600"], pesan: "Komposisi Asep." },
    { baris: "uraian 63.500", jawab: "60.000 + 3.000 + 500", opsi: ["60.000 + 3.000 + 500", "6.000 + 300 + 50", "63 + 500"], pesan: "Dekomposisi." },
  ],
  [
    { baris: "4×10rb + 5×1rb + 6×100", jawab: "45.600", opsi: ["45.600", "54.600", "46.500"], pesan: "Komposisi standar." },
    { baris: "45×1rb + 6×100", jawab: "45.600", opsi: ["45.600", "4.560", "51.000"], pesan: "Cara lain." },
  ],
  [
    { baris: "5×10rb + 15×1rb + 16×100", jawab: "66.600", opsi: ["66.600", "56.600", "51.600"], pesan: "Melebihi 9 tetap dijumlah." },
    { baris: "bentuk panjang 22.000", jawab: "20.000 + 2.000", opsi: ["20.000 + 2.000", "2.000 + 200", "22 + 000"], pesan: "PR dan RB." },
  ],
];

export const RONDE_BENARSALAH_QC: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Komposisi bilangan boleh memakai pecahan yang digitnya lebih dari 9.", benar: true, penjelasan: "Lalu dijumlahkan." },
    { teks: "3×10.000 + 8×1.000 + 6×100 = 36.800.", benar: false, penjelasan: "Hasilnya 38.600." },
    { teks: "Dekomposisi menulis bilangan sebagai jumlah nilai tempat.", benar: true, penjelasan: "Bentuk panjang." },
  ],
  [
    { teks: "45.600 hanya punya satu cara komposisi.", benar: false, penjelasan: "Banyak cara setara." },
    { teks: "60.000 + 3.000 + 500 adalah dekomposisi 63.500.", benar: true, penjelasan: "Benar." },
    { teks: "Tanpa pecahan 10rb, bilangan lima angka tidak bisa dibentuk.", benar: false, penjelasan: "Bisa pakai banyak 1rb." },
  ],
];

export const RONDE_DETEKTIF_QC: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["3 lembar 10rb", "8 lembar 1rb", "6 keping 100"], jawab: "38.600", opsi: ["38.600", "36.800", "48.600"], salah: "Jumlahkan nilai pecahan." },
  { klue: ["total 45.600", "cara tanpa 10rb", "hanya 1rb dan 100"], jawab: "45×1rb + 6×100", opsi: ["45×1rb + 6×100", "4×10rb saja", "456×100"], salah: "45 ribu + 600." },
  { klue: ["6×10rb", "3×1rb", "5×100"], jawab: "63.500", opsi: ["63.500", "36.500", "65.300"], salah: "60.000+3.000+500." },
];

export const PETA_KONSEP_QC = [
  {
    pusat: "Komposisi-Dekomposisi",
    kotak: [
      { label: "Komposisi", opsi: ["menyusun dari pecahan", "membandingkan", "membagi"], benar: 0 },
      { label: "Dekomposisi", opsi: ["menguraikan nilai tempat", "mengurutkan", "mengurangi"], benar: 0 },
      { label: "Fleksibel", opsi: ["banyak cara setara", "hanya satu cara", "harus digit ≤9"], benar: 0 },
      { label: "Bentuk panjang", opsi: ["jumlah nilai tempat", "hanya kata", "tanpa angka"], benar: 0 },
    ],
  },
];
export const RONDE_CERITA_QC = RONDE_CERITA_CC;

// ---- Sub-Bab D: Operasi + − × ÷ ----
export const RONDE_TAMBAH_CD: { a: number; b: number; hasil: number; pesan: string }[][] = [
  [
    { a: 57500, b: 22000, hasil: 79500, pesan: "57.500 + 22.000 = 79.500" },
    { a: 32500, b: 13250, hasil: 45750, pesan: "32.500 + 13.250 = 45.750" },
  ],
  [
    { a: 23500, b: 17000, hasil: 40500, pesan: "Mangga + jeruk." },
    { a: 15000, b: 34000, hasil: 49000, pesan: "Naga + kelengkeng." },
  ],
  [
    { a: 38600, b: 14500, hasil: 53100, pesan: "38.600 + 14.500." },
    { a: 45600, b: 22000, hasil: 67600, pesan: "45.600 + 22.000." },
  ],
];

export const RONDE_KURANG_CD: { a: number; b: number; hasil: number; pesan: string }[][] = [
  [
    { a: 47900, b: 45750, hasil: 2150, pesan: "47.900 − 45.750 = 2.150" },
    { a: 100000, b: 47000, hasil: 53000, pesan: "100.000 − 47.000." },
  ],
  [
    { a: 34000, b: 30000, hasil: 4000, pesan: "Kelengkeng − 2 naga." },
    { a: 79500, b: 57500, hasil: 22000, pesan: "Balik penjumlahan Nisa." },
  ],
  [
    { a: 63500, b: 38600, hasil: 24900, pesan: "63.500 − 38.600." },
    { a: 45600, b: 14500, hasil: 31100, pesan: "45.600 − 14.500." },
  ],
];

export const RONDE_KALI_CD: { a: number; b: number; hasil: number; pesan: string }[][] = [
  [
    { a: 12, b: 5000, hasil: 60000, pesan: "12 × 5.000 = 60.000" },
    { a: 2, b: 23500, hasil: 47000, pesan: "2 bungkus mangga." },
  ],
  [
    { a: 2, b: 15000, hasil: 30000, pesan: "2 bungkus naga." },
    { a: 3, b: 17000, hasil: 51000, pesan: "3 bungkus jeruk." },
  ],
  [
    { a: 4, b: 16000, hasil: 64000, pesan: "Balik pembagian." },
    { a: 5, b: 12000, hasil: 60000, pesan: "5 × 12.000." },
  ],
];

export const RONDE_BAGI_CD: { a: number; b: number; hasil: number; pesan: string }[][] = [
  [
    { a: 64000, b: 4, hasil: 16000, pesan: "64.000 ÷ 4 = 16.000" },
    { a: 60000, b: 12, hasil: 5000, pesan: "60.000 ÷ 12 = 5.000" },
  ],
  [
    { a: 100000, b: 2, hasil: 50000, pesan: "100.000 ÷ 2." },
    { a: 51000, b: 3, hasil: 17000, pesan: "51.000 ÷ 3." },
  ],
  [
    { a: 30000, b: 2, hasil: 15000, pesan: "30.000 ÷ 2." },
    { a: 48000, b: 4, hasil: 12000, pesan: "48.000 ÷ 4." },
  ],
];

export const RONDE_PASANG_CD: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "57.500 + 22.000", kanan: "79.500" },
    { kiri: "32.500 + 13.250", kanan: "45.750" },
    { kiri: "47.900 − 45.750", kanan: "2.150" },
    { kiri: "12 × 5.000", kanan: "60.000" },
  ],
  [
    { kiri: "64.000 ÷ 4", kanan: "16.000" },
    { kiri: "2 × 23.500", kanan: "47.000" },
    { kiri: "15.000 + 34.000", kanan: "49.000" },
    { kiri: "100.000 − 47.000", kanan: "53.000" },
  ],
  [
    { kiri: "3 × 17.000", kanan: "51.000" },
    { kiri: "34.000 − 30.000", kanan: "4.000" },
    { kiri: "2 × 15.000", kanan: "30.000" },
    { kiri: "100.000 ÷ 2", kanan: "50.000" },
  ],
];
export const RONDE_MEMORI_CD = RONDE_PASANG_CD;

export const RONDE_KETUK_CD: { item: number[]; tanya: number[] }[] = [
  { item: [79500, 45750, 2150, 60000], tanya: [79500, 2150] },
  { item: [16000, 47000, 49000, 53000], tanya: [16000, 47000] },
  { item: [51000, 4000, 30000, 50000], tanya: [4000, 50000] },
];

export const RONDE_SEMUA_CD: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  {
    label: "hasil penjumlahan benar",
    item: [
      { id: "a", label: "57.500+22.000=79.500", cocok: true },
      { id: "b", label: "32.500+13.250=45.750", cocok: true },
      { id: "c", label: "23.500+17.000=41.500", cocok: false },
      { id: "d", label: "15.000+34.000=49.000", cocok: true },
    ],
  },
  {
    label: "hasil pengurangan benar",
    item: [
      { id: "a", label: "47.900−45.750=2.150", cocok: true },
      { id: "b", label: "34.000−30.000=4.000", cocok: true },
      { id: "c", label: "100.000−47.000=43.000", cocok: false },
      { id: "d", label: "79.500−57.500=22.000", cocok: true },
    ],
  },
  {
    label: "hasil kali/bagi benar",
    item: [
      { id: "a", label: "12×5.000=60.000", cocok: true },
      { id: "b", label: "64.000÷4=16.000", cocok: true },
      { id: "c", label: "2×23.500=46.000", cocok: false },
      { id: "d", label: "100.000÷2=50.000", cocok: true },
    ],
  },
];

export const RONDE_CERITA_CD: { teks: string; jawab: string | number; opsi: (string | number)[]; pesan: string }[][] = [
  [
    { teks: "Ibu 57.500 dan Ayah 22.000 untuk bakti sosial. Jumlah?", jawab: "79.500", opsi: ["79.500", "75.900", "35.500"], pesan: "Jumlahkan nilai tempat." },
    { teks: "Ayam 32.500 + plencing 13.250. Bayar?", jawab: "45.750", opsi: ["45.750", "45.250", "19.250"], pesan: "32.500+13.250." },
  ],
  [
    { teks: "Uang 47.900, bayar 45.750. Sisa?", jawab: "2.150", opsi: ["2.150", "1.250", "92.650"], pesan: "Pengurangan." },
    { teks: "12 angpau × 5.000. Total?", jawab: "60.000", opsi: ["60.000", "17.000", "5.012"], pesan: "12×5.000." },
  ],
  [
    { teks: "64.000 dibagi 4 anak. Tiap anak?", jawab: "16.000", opsi: ["16.000", "60.000", "4.000"], pesan: "64.000÷4." },
    { teks: "2 mangga 23.500 dan 1 jeruk 17.000. Bayar?", jawab: "64.000", opsi: ["64.000", "47.000", "40.500"], pesan: "2×23.500+17.000=64.000." },
  ],
];

export const RONDE_URUT_CD: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [2150, 45750, 79500, 60000], dari: "kecil" },
  { angka: [16000, 47000, 49000, 53000], dari: "besar" },
  { angka: [4000, 30000, 51000, 50000], dari: "kecil" },
];

export const RONDE_TAMBAH_PD = RONDE_TAMBAH_CD;
export const RONDE_KURANG_PD = RONDE_KURANG_CD;
export const RONDE_KALI_PD = RONDE_KALI_CD;
export const RONDE_BAGI_PD = RONDE_BAGI_CD;
export const RONDE_PASANG_PD = RONDE_PASANG_CD;
export const RONDE_MEMORI_PD = RONDE_MEMORI_CD;
export const RONDE_SEMUA_PD = RONDE_SEMUA_CD;
export const RONDE_CERITA_PD = RONDE_CERITA_CD;

export const RONDE_TABEL_PD: { baris: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { baris: "57.500 + 22.000", jawab: "79.500", opsi: ["79.500", "75.900", "35.500"], pesan: "Susun tempat." },
    { baris: "47.900 − 45.750", jawab: "2.150", opsi: ["2.150", "1.250", "93.650"], pesan: "Pengurangan." },
  ],
  [
    { baris: "12 × 5.000", jawab: "60.000", opsi: ["60.000", "17.000", "50.000"], pesan: "Pecah 10× dan 2×." },
    { baris: "64.000 ÷ 4", jawab: "16.000", opsi: ["16.000", "60.000", "4"], pesan: "Bagi rata." },
  ],
  [
    { baris: "2×23.500 + 17.000", jawab: "64.000", opsi: ["64.000", "47.000", "40.500"], pesan: "Campur operasi." },
    { baris: "15.000 + 34.000", jawab: "49.000", opsi: ["49.000", "19.000", "44.000"], pesan: "Murah + mahal." },
  ],
];

export const RONDE_BENARSALAH_QD: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "57.500 + 22.000 = 79.500.", benar: true, penjelasan: "Benar." },
    { teks: "47.900 − 45.750 = 1.250.", benar: false, penjelasan: "Sisanya 2.150." },
    { teks: "Penjumlahan bisa disusun menurut nilai tempat.", benar: true, penjelasan: "Cara Yohana/Lukas." },
  ],
  [
    { teks: "12 × 5.000 = 60.000.", benar: true, penjelasan: "10×5.000 + 2×5.000." },
    { teks: "64.000 ÷ 4 = 14.000.", benar: false, penjelasan: "Hasilnya 16.000." },
    { teks: "Perkalian dan pembagian saling berkebalikan.", benar: true, penjelasan: "4×16.000=64.000." },
  ],
];

export const RONDE_DETEKTIF_QD: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["Ibu 57.500", "Ayah 22.000", "bakti sosial"], jawab: "79.500", opsi: ["79.500", "35.500", "75.900"], salah: "Jumlahkan." },
  { klue: ["12 angpau", "tiap 5.000"], jawab: "60.000", opsi: ["60.000", "17.000", "5.012"], salah: "Kalikan." },
  { klue: ["uang 47.900", "bayar 45.750", "cari sisa"], jawab: "2.150", opsi: ["2.150", "1.250", "93.650"], salah: "Kurangkan." },
];

export const PETA_KONSEP_QD = [
  {
    pusat: "Operasi sampai 100.000",
    kotak: [
      { label: "+", opsi: ["jumlahkan nilai tempat", "cari selisih", "bagi rata"], benar: 0 },
      { label: "−", opsi: ["cari selisih/sisa", "gandakan", "susun naik"], benar: 0 },
      { label: "×", opsi: ["penjumlahan berulang / pecah faktor", "bagi sama", "banding"], benar: 0 },
      { label: "÷", opsi: ["bagi rata / kebalikan kali", "tambah terus", "urutkan"], benar: 0 },
    ],
  },
];
export const RONDE_CERITA_QD = RONDE_CERITA_CD;
