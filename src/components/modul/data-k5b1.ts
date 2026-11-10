/**
 * Data murni Matematika Kelas 5 Bab 1 (Bilangan Cacah sampai 100.000): Sub-Bab A–B.
 * Sumber: Buku Siswa Matematika Kelas V Kemendikbudristek Bab 1 hlm. 1–14.
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
