/**
 * Data murni Matematika Kelas 5 Bab 3 (Bilangan Pecahan): Sub-Bab A–C.
 * Sumber: Buku Siswa Matematika Kelas V Kemendikbudristek Bab 3 hlm. 63–104.
 * Tanpa React/jaringan. Uji: scripts/uji-statis-k5b3.mjs.
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

export const fpb = (a: number, b: number): number => {
  let x = Math.abs(a); let y = Math.abs(b);
  while (y) { const t = y; y = x % y; x = t; }
  return x || 1;
};
export const kpk = (a: number, b: number): number => Math.abs(a * b) / fpb(a, b);

export type Pec = { p: number; q: number };
export const teksPec = (x: Pec): string => `${x.p}/${x.q}`;
export const sederhanakan = (p: number, q: number): Pec => {
  const d = fpb(p, q);
  return { p: p / d, q: q / d };
};
export const nilai = (x: Pec): number => x.p / x.q;
export const banding = (a: Pec, b: Pec): -1 | 0 | 1 => {
  const k = a.p * b.q - b.p * a.q;
  return k < 0 ? -1 : k > 0 ? 1 : 0;
};
export const keBiasa = (bulat: number, p: number, q: number): Pec => ({ p: bulat * q + p, q });
export const teksCampuran = (bulat: number, p: number, q: number): string => `${bulat} ${p}/${q}`;
export const jumlahPec = (a: Pec, b: Pec): Pec => {
  const d = kpk(a.q, b.q);
  return sederhanakan((a.p * d) / a.q + (b.p * d) / b.q, d);
};
export const kurangPec = (a: Pec, b: Pec): Pec => {
  const d = kpk(a.q, b.q);
  return sederhanakan((a.p * d) / a.q - (b.p * d) / b.q, d);
};

export const ANGKA_BUKU = {
  lompat1: "2 3/4", lompat1Biasa: "11/4",
  lompat2: "3 1/2", lompat2Biasa: "7/2",
  lompat3: "7/8",
  martabakLukas: "1/8", martabakKomang: "2/8", martabakJumlah: "3/8",
  wingkoLukas: "1/2", wingkoKomang: "1/3", wingkoGabung: "5/6",
  penghapusAsep: "2/10", penghapusYohana: "3/10", penghapusJumlah: "5/10",
  lukisHarus: "2/3", lukisSudah: "1/3", lukisSisa: "1/3",
  lukisYohanaSudah: "1/2", lukisYohanaSisa: "1/6",
} as const;

// ---- A: Membandingkan & Mengurutkan ----
export const RONDE_BANDING_CA: { a: string; b: string; tanda: "<" | ">" | "="; pesan: string }[][] = [
  [
    { a: "1/2", b: "1/5", tanda: ">", pesan: "Penyebut lebih kecil → pecahan lebih besar (pembilang sama)." },
    { a: "1/4", b: "1/3", tanda: "<", pesan: "1/4 lebih kecil dari 1/3." },
  ],
  [
    { a: "3/8", b: "5/8", tanda: "<", pesan: "Penyebut sama: bandingkan pembilang." },
    { a: "2/5", b: "2/5", tanda: "=", pesan: "Sama tepat." },
  ],
  [
    { a: "11/4", b: "7/2", tanda: "<", pesan: "11/4=2,75; 7/2=3,5." },
    { a: "7/8", b: "11/4", tanda: "<", pesan: "7/8 < 2." },
  ],
];

export const RONDE_CAMPURAN_CA: { campuran: string; biasa: string; pesan: string }[][] = [
  [
    { campuran: "2 3/4", biasa: "11/4", pesan: "(2×4)+3 = 11, penyebut 4." },
    { campuran: "3 1/2", biasa: "7/2", pesan: "(3×2)+1 = 7." },
  ],
  [
    { campuran: "1 1/2", biasa: "3/2", pesan: "(1×2)+1 = 3." },
    { campuran: "4 1/4", biasa: "17/4", pesan: "(4×4)+1 = 17." },
  ],
  [
    { campuran: "2 1/5", biasa: "11/5", pesan: "(2×5)+1 = 11." },
    { campuran: "5 3/4", biasa: "23/4", pesan: "(5×4)+3 = 23." },
  ],
];

export const RONDE_URUT_CA: { daftar: string[]; dari: "kecil" | "besar"; kunci: string[]; pesan: string }[] = [
  { daftar: ["7/8", "11/4", "7/2"], dari: "besar", kunci: ["7/2", "11/4", "7/8"], pesan: "Lompatan Yohana: terjauh 3 1/2." },
  { daftar: ["1/2", "1/5", "1/3"], dari: "kecil", kunci: ["1/5", "1/3", "1/2"], pesan: "Pembilang sama: penyebut besar → kecil." },
  { daftar: ["3/8", "1/2", "5/8"], dari: "besar", kunci: ["5/8", "1/2", "3/8"], pesan: "Samakan penyebut 8: 4/8, 5/8, 3/8." },
];

export const RONDE_JENIS_CA: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Pembilang terletak di?", jawab: "atas garis pecahan", opsi: ["atas garis pecahan", "bawah garis pecahan", "di kanan saja"], pesan: "Pembilang / penyebut." },
    { tanya: "Penyebut menyatakan?", jawab: "banyak bagian sama besar keseluruhan", opsi: ["banyak bagian sama besar keseluruhan", "hanya sisa", "hasil kali"], pesan: "Part of a whole." },
  ],
  [
    { tanya: "Pecahan campuran terdiri atas?", jawab: "bilangan bulat dan pecahan biasa", opsi: ["bilangan bulat dan pecahan biasa", "dua penyebut saja", "hanya pembilang"], pesan: "Contoh 2 3/4." },
    { tanya: "Pada garis bilangan, makin ke kanan?", jawab: "nilainya makin besar", opsi: ["nilainya makin besar", "nilainya makin kecil", "tetap"], pesan: "Urut naik ke kanan." },
  ],
  [
    { tanya: "Cara ubah 2 3/4 ke biasa?", jawab: "(2×4)+3 lalu per 4", opsi: ["(2×4)+3 lalu per 4", "2+3+4", "bagi 2 dengan 4"], pesan: "Rumus campuran → biasa." },
    { tanya: "Jika pembilang sama, pecahan lebih besar punya?", jawab: "penyebut lebih kecil", opsi: ["penyebut lebih kecil", "penyebut lebih besar", "penyebut sama saja"], pesan: "1/2 > 1/5." },
  ],
];

export const RONDE_SORTIR_CA: { id: string; label: string; bin: "besar" | "kecil" }[][] = [
  [
    { id: "a1", label: "1/2", bin: "besar" }, { id: "a2", label: "1/5", bin: "kecil" }, { id: "a3", label: "1/3", bin: "besar" },
    { id: "a4", label: "1/8", bin: "kecil" }, { id: "a5", label: "1/4", bin: "kecil" }, { id: "a6", label: "2/3", bin: "besar" },
  ],
  [
    { id: "b1", label: "5/8", bin: "besar" }, { id: "b2", label: "3/8", bin: "kecil" }, { id: "b3", label: "7/8", bin: "besar" },
    { id: "b4", label: "1/8", bin: "kecil" }, { id: "b5", label: "6/8", bin: "besar" }, { id: "b6", label: "2/8", bin: "kecil" },
  ],
  [
    { id: "c1", label: "7/2", bin: "besar" }, { id: "c2", label: "7/8", bin: "kecil" }, { id: "c3", label: "11/4", bin: "besar" },
    { id: "c4", label: "1/2", bin: "kecil" }, { id: "c5", label: "3 1/2", bin: "besar" }, { id: "c6", label: "3/4", bin: "kecil" },
  ],
];

export const RONDE_PASANG_CA: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "2 3/4", kanan: "11/4" }, { kiri: "3 1/2", kanan: "7/2" },
    { kiri: "pembilang", kanan: "angka atas" }, { kiri: "penyebut", kanan: "angka bawah" },
  ],
  [
    { kiri: "1/2 dibanding 1/5", kanan: "1/2 lebih besar" }, { kiri: "garis bilangan kanan", kanan: "nilai makin besar" },
    { kiri: "lompatan terjauh Yohana", kanan: "3 1/2" }, { kiri: "7/8 dibanding 11/4", kanan: "7/8 lebih kecil" },
  ],
  [
    { kiri: "pecahan biasa", kanan: "hanya p/q" }, { kiri: "pecahan campuran", kanan: "bulat + p/q" },
    { kiri: "wingko stroberi", kanan: "bagian dari keseluruhan" }, { kiri: "samakan bentuk dulu", kanan: "baru bandingkan" },
  ],
];
export const RONDE_MEMORI_CA = RONDE_PASANG_CA;

export const RONDE_KETUK_CA: { item: string[]; tanya: string[] }[] = [
  { item: ["1/2", "1/3", "1/4", "1/5", "1/8", "1/10"], tanya: ["1/2", "1/3", "1/4"] },
  { item: ["11/4", "7/2", "7/8", "3/4", "1/2", "5/8"], tanya: ["7/2", "11/4"] },
  { item: ["2 3/4", "3 1/2", "1 1/2", "5 3/4", "4 1/4", "2 1/5"], tanya: ["2 3/4", "3 1/2"] },
];

export const RONDE_SEMUA_CA: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "lebih besar dari 1/3", item: [
    { id: "a", label: "1/2", cocok: true }, { id: "b", label: "1/5", cocok: false }, { id: "c", label: "1/4", cocok: true }, { id: "d", label: "2/3", cocok: true },
  ]},
  { label: "bentuk pecahan biasa dari campuran", item: [
    { id: "a", label: "2 3/4 = 11/4", cocok: true }, { id: "b", label: "3 1/2 = 7/2", cocok: true }, { id: "c", label: "1 1/2 = 2/2", cocok: false }, { id: "d", label: "4 1/4 = 17/4", cocok: true },
  ]},
  { label: "pernyataan benar tentang banding", item: [
    { id: "a", label: "penyebut sama → lihat pembilang", cocok: true }, { id: "b", label: "1/2 > 1/5", cocok: true }, { id: "c", label: "kanan garis = lebih kecil", cocok: false }, { id: "d", label: "campuran bisa diubah ke biasa", cocok: true },
  ]},
];

export const RONDE_CERITA_CA: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "Lompatan Yohana: 2 3/4 m, 3 1/2 m, 7/8 m. Terjauh?", jawab: "3 1/2 m", opsi: ["3 1/2 m", "2 3/4 m", "7/8 m"], pesan: "7/2 terbesar." },
    { teks: "2 3/4 diubah ke pecahan biasa?", jawab: "11/4", opsi: ["11/4", "6/4", "8/4"], pesan: "(2×4)+3." },
  ],
  [
    { teks: "Manakah lebih besar: 1/2 atau 1/5?", jawab: "1/2", opsi: ["1/2", "1/5", "sama"], pesan: "Pembilang sama." },
    { teks: "Gelas berisi 1 dari 2 bagian. Pecahannya?", jawab: "1/2", opsi: ["1/2", "2/1", "1/3"], pesan: "Part of a whole." },
  ],
  [
    { teks: "Urutan dari terbesar: 11/4, 7/2, 7/8?", jawab: "7/2, 11/4, 7/8", opsi: ["7/2, 11/4, 7/8", "7/8, 11/4, 7/2", "11/4, 7/2, 7/8"], pesan: "Garis bilangan." },
    { teks: "Pada garis bilangan, posisi makin kiri artinya?", jawab: "nilai makin kecil", opsi: ["nilai makin kecil", "nilai makin besar", "tidak berubah"], pesan: "Aturan garis." },
  ],
];

export const RONDE_BANDING_PA = RONDE_BANDING_CA;
export const RONDE_CAMPURAN_PA = RONDE_CAMPURAN_CA;
export const RONDE_PASANG_PA = RONDE_PASANG_CA;
export const RONDE_MEMORI_PA = RONDE_MEMORI_CA;
export const RONDE_SORTIR_PA = RONDE_SORTIR_CA;
export const RONDE_SEMUA_PA = RONDE_SEMUA_CA;
export const RONDE_JENIS_PA = RONDE_JENIS_CA;
export const RONDE_CERITA_PA = RONDE_CERITA_CA;

export const RONDE_TABEL_PA: { baris: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { baris: "2 3/4 → biasa", jawab: "11/4", opsi: ["11/4", "6/4", "5/4"], pesan: "Campuran." },
    { baris: "3 1/2 → biasa", jawab: "7/2", opsi: ["7/2", "4/2", "5/2"], pesan: "Campuran." },
  ],
  [
    { baris: "1/2 ? 1/5", jawab: ">", opsi: [">", "<", "="], pesan: "Pembilang sama." },
    { baris: "3/8 ? 5/8", jawab: "<", opsi: ["<", ">", "="], pesan: "Pembilang." },
  ],
  [
    { baris: "terjauh lompatan", jawab: "3 1/2", opsi: ["3 1/2", "2 3/4", "7/8"], pesan: "Yohana." },
    { baris: "arti penyebut", jawab: "banyak bagian keseluruhan", opsi: ["banyak bagian keseluruhan", "sisa saja", "hasil kali"], pesan: "Definisi." },
  ],
];

export const RONDE_BENARSALAH_QA: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Pembilang ada di atas garis pecahan.", benar: true, penjelasan: "Benar." },
    { teks: "1/2 lebih kecil dari 1/5.", benar: false, penjelasan: "1/2 lebih besar." },
    { teks: "2 3/4 = 11/4.", benar: true, penjelasan: "Campuran → biasa." },
  ],
  [
    { teks: "Makin ke kanan pada garis bilangan, nilai makin besar.", benar: true, penjelasan: "Benar." },
    { teks: "Pecahan campuran hanya punya penyebut.", benar: false, penjelasan: "Ada bilangan bulat + pecahan." },
    { teks: "Penyebut sama → bandingkan pembilang.", benar: true, penjelasan: "Benar." },
  ],
];

export const RONDE_DETEKTIF_QA: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["lompat jauh", "3 kali", "terjauh"], jawab: "3 1/2", opsi: ["3 1/2", "2 3/4", "7/8"], salah: "Ubah ke biasa dulu." },
  { klue: ["pembilang sama", "1/2 dan 1/5", "lebih besar"], jawab: "1/2", opsi: ["1/2", "1/5", "sama"], salah: "Penyebut kecil = besar." },
  { klue: ["campuran", "2 3/4", "bentuk biasa"], jawab: "11/4", opsi: ["11/4", "6/4", "8/3"], salah: "(2×4)+3." },
];

export const PETA_KONSEP_QA = [{
  pusat: "Banding Pecahan",
  kotak: [
    { label: "Pembilang sama", opsi: ["lihat penyebut (kecil = besar)", "tambah saja", "acak"], benar: 0 },
    { label: "Penyebut sama", opsi: ["lihat pembilang", "balik pecahan", "kali 10"], benar: 0 },
    { label: "Campuran", opsi: ["ubah ke biasa dulu", "abaikan bulat", "bagi penyebut"], benar: 0 },
    { label: "Garis bilangan", opsi: ["kanan lebih besar", "kiri lebih besar", "sama terus"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QA = RONDE_CERITA_CA;

// ---- B: Penjumlahan ----
export const RONDE_JUMLAH_SAMA_CB: { a: string; b: string; hasil: string; pesan: string }[][] = [
  [
    { a: "1/8", b: "2/8", hasil: "3/8", pesan: "Martabak: jumlahkan pembilang, penyebut tetap." },
    { a: "2/10", b: "3/10", hasil: "5/10", pesan: "Penghapus Asep+Yohana." },
  ],
  [
    { a: "1/5", b: "2/5", hasil: "3/5", pesan: "Penyebut sama." },
    { a: "3/7", b: "2/7", hasil: "5/7", pesan: "3+2=5." },
  ],
  [
    { a: "4/9", b: "2/9", hasil: "6/9", pesan: "Boleh disederhanakan jadi 2/3." },
    { a: "1/6", b: "4/6", hasil: "5/6", pesan: "1+4=5." },
  ],
];

export const RONDE_JUMLAH_BEDA_CB: { a: string; b: string; hasil: string; pesan: string }[][] = [
  [
    { a: "1/2", b: "1/3", hasil: "5/6", pesan: "KPK 6: 3/6+2/6=5/6. Wingko Lukas+Komang." },
    { a: "1/4", b: "1/6", hasil: "5/12", pesan: "KPK 12: 3/12+2/12." },
  ],
  [
    { a: "2/3", b: "1/6", hasil: "5/6", pesan: "4/6+1/6=5/6." },
    { a: "1/5", b: "1/2", hasil: "7/10", pesan: "2/10+5/10." },
  ],
  [
    { a: "3/4", b: "1/8", hasil: "7/8", pesan: "6/8+1/8." },
    { a: "2/5", b: "1/10", hasil: "1/2", pesan: "4/10+1/10=5/10=1/2." },
  ],
];

export const RONDE_JENIS_CB: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Syarat menjumlahkan pecahan?", jawab: "penyebut harus sama", opsi: ["penyebut harus sama", "pembilang harus sama", "hasil harus 1"], pesan: "Buku: samakan dulu." },
    { tanya: "Jika penyebut sama, yang dijumlahkan?", jawab: "pembilangnya", opsi: ["pembilangnya", "penyebutnya", "keduanya dikali"], pesan: "Penyebut tetap." },
  ],
  [
    { tanya: "Cara samakan penyebut berbeda?", jawab: "cari KPK penyebut", opsi: ["cari KPK penyebut", "kurangi pembilang", "buang penyebut"], pesan: "Lalu ubah senilai." },
    { tanya: "1/2 + 1/3 hasilnya?", jawab: "5/6", opsi: ["5/6", "2/5", "1/5"], pesan: "Wingko." },
  ],
  [
    { tanya: "2/8 + 1/8 = ?", jawab: "3/8", opsi: ["3/8", "3/16", "2/8"], pesan: "Martabak." },
    { tanya: "Setelah jumlah, boleh?", jawab: "sederhanakan jika bisa", opsi: ["sederhanakan jika bisa", "selalu kali 2", "buang hasil"], pesan: "FPB pembilang-penyebut." },
  ],
];

export const RONDE_SORTIR_CB: { id: string; label: string; bin: "sama" | "beda" }[][] = [
  [
    { id: "a1", label: "1/8+2/8", bin: "sama" }, { id: "a2", label: "1/2+1/3", bin: "beda" }, { id: "a3", label: "2/10+3/10", bin: "sama" },
    { id: "a4", label: "1/4+1/6", bin: "beda" }, { id: "a5", label: "3/7+2/7", bin: "sama" }, { id: "a6", label: "2/3+1/6", bin: "beda" },
  ],
  [
    { id: "b1", label: "4/9+2/9", bin: "sama" }, { id: "b2", label: "3/4+1/8", bin: "beda" }, { id: "b3", label: "1/5+2/5", bin: "sama" },
    { id: "b4", label: "1/5+1/2", bin: "beda" }, { id: "b5", label: "1/6+4/6", bin: "sama" }, { id: "b6", label: "2/5+1/10", bin: "beda" },
  ],
  [
    { id: "c1", label: "penyebut sama dulu", bin: "sama" }, { id: "c2", label: "perlu KPK", bin: "beda" }, { id: "c3", label: "jumlahkan pembilang saja", bin: "sama" },
    { id: "c4", label: "ubah ke senilai dulu", bin: "beda" }, { id: "c5", label: "3/8+1/8", bin: "sama" }, { id: "c6", label: "1/2+1/4", bin: "beda" },
  ],
];

export const RONDE_PASANG_CB: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "1/8 + 2/8", kanan: "3/8" }, { kiri: "1/2 + 1/3", kanan: "5/6" },
    { kiri: "2/10 + 3/10", kanan: "5/10" }, { kiri: "syarat jumlah", kanan: "penyebut sama" },
  ],
  [
    { kiri: "cara beda penyebut", kanan: "KPK lalu senilai" }, { kiri: "1/4 + 1/6", kanan: "5/12" },
    { kiri: "martabak Lukas+Komang", kanan: "3/8" }, { kiri: "wingko digabung", kanan: "5/6" },
  ],
  [
    { kiri: "2/3 + 1/6", kanan: "5/6" }, { kiri: "3/4 + 1/8", kanan: "7/8" },
    { kiri: "setelah jumlah", kanan: "boleh sederhanakan" }, { kiri: "penyebut tetap jika", kanan: "sudah sama" },
  ],
];
export const RONDE_MEMORI_CB = RONDE_PASANG_CB;

export const RONDE_KETUK_CB: { item: string[]; tanya: string[] }[] = [
  { item: ["3/8", "5/6", "5/10", "2/5", "1/2", "7/8"], tanya: ["3/8", "5/6", "5/10"] },
  { item: ["5/12", "7/10", "5/6", "1/2", "3/5", "7/8"], tanya: ["5/12", "7/10"] },
  { item: ["1/8", "2/8", "3/8", "1/2", "1/3", "5/6"], tanya: ["1/8", "2/8", "3/8"] },
];

export const RONDE_SEMUA_CB: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "hasil penjumlahan benar", item: [
    { id: "a", label: "1/8+2/8=3/8", cocok: true }, { id: "b", label: "1/2+1/3=5/6", cocok: true }, { id: "c", label: "1/2+1/3=2/5", cocok: false }, { id: "d", label: "2/10+3/10=5/10", cocok: true },
  ]},
  { label: "perlu KPK dulu", item: [
    { id: "a", label: "1/2+1/3", cocok: true }, { id: "b", label: "1/8+2/8", cocok: false }, { id: "c", label: "1/4+1/6", cocok: true }, { id: "d", label: "3/7+2/7", cocok: false },
  ]},
  { label: "langkah benar", item: [
    { id: "a", label: "samakan penyebut", cocok: true }, { id: "b", label: "jumlahkan pembilang", cocok: true }, { id: "c", label: "jumlahkan penyebut juga", cocok: false }, { id: "d", label: "boleh sederhanakan", cocok: true },
  ]},
];

export const RONDE_CERITA_CB: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "Martabak: Lukas 1/8, Komang 2/8. Jumlah?", jawab: "3/8", opsi: ["3/8", "3/16", "2/8"], pesan: "Penyebut sama." },
    { teks: "Wingko: 1/2 + 1/3?", jawab: "5/6", opsi: ["5/6", "2/5", "1/6"], pesan: "KPK 6." },
  ],
  [
    { teks: "Penghapus: 2/10 + 3/10?", jawab: "5/10", opsi: ["5/10", "5/20", "6/10"], pesan: "Asep+Yohana." },
    { teks: "Jika penyebut belum sama, lakukan?", jawab: "cari KPK penyebut", opsi: ["cari KPK penyebut", "kurangi saja", "tambah penyebut"], pesan: "Syarat buku." },
  ],
  [
    { teks: "1/4 + 1/6 = ?", jawab: "5/12", opsi: ["5/12", "2/10", "1/5"], pesan: "3/12+2/12." },
    { teks: "Setelah 4/9+2/9=6/9, bentuk sederhana?", jawab: "2/3", opsi: ["2/3", "6/9", "3/9"], pesan: "Bagi FPB 3." },
  ],
];

export const RONDE_URUT_CB: { angka: string[]; dari: "kecil" | "besar"; kunci: string[] }[] = [
  { angka: ["1/8", "3/8", "2/8"], dari: "kecil", kunci: ["1/8", "2/8", "3/8"] },
  { angka: ["5/6", "1/2", "1/3"], dari: "besar", kunci: ["5/6", "1/2", "1/3"] },
  { angka: ["5/12", "7/8", "1/2"], dari: "kecil", kunci: ["5/12", "1/2", "7/8"] },
];

export const RONDE_JUMLAH_SAMA_PB = RONDE_JUMLAH_SAMA_CB;
export const RONDE_JUMLAH_BEDA_PB = RONDE_JUMLAH_BEDA_CB;
export const RONDE_PASANG_PB = RONDE_PASANG_CB;
export const RONDE_MEMORI_PB = RONDE_MEMORI_CB;
export const RONDE_SORTIR_PB = RONDE_SORTIR_CB;
export const RONDE_SEMUA_PB = RONDE_SEMUA_CB;
export const RONDE_JENIS_PB = RONDE_JENIS_CB;
export const RONDE_CERITA_PB = RONDE_CERITA_CB;

export const RONDE_TABEL_PB: { baris: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { baris: "1/8+2/8", jawab: "3/8", opsi: ["3/8", "3/16", "1/4"], pesan: "Sama penyebut." },
    { baris: "1/2+1/3", jawab: "5/6", opsi: ["5/6", "2/5", "1/5"], pesan: "Beda → KPK." },
  ],
  [
    { baris: "2/10+3/10", jawab: "5/10", opsi: ["5/10", "5/20", "1"], pesan: "Penghapus." },
    { baris: "cara beda penyebut", jawab: "KPK", opsi: ["KPK", "FPB saja", "bagi 2"], pesan: "Samakan." },
  ],
  [
    { baris: "3/4+1/8", jawab: "7/8", opsi: ["7/8", "4/12", "1"], pesan: "6/8+1/8." },
    { baris: "syarat jumlah", jawab: "penyebut sama", opsi: ["penyebut sama", "pembilang sama", "hasil genap"], pesan: "Buku." },
  ],
];

export const RONDE_BENARSALAH_QB: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Penyebut harus sama sebelum menjumlahkan.", benar: true, penjelasan: "Syarat buku." },
    { teks: "1/2 + 1/3 = 2/5.", benar: false, penjelasan: "Hasil benar 5/6." },
    { teks: "Jika penyebut sama, jumlahkan pembilang.", benar: true, penjelasan: "Benar." },
  ],
  [
    { teks: "KPK dipakai menyamakan penyebut berbeda.", benar: true, penjelasan: "Benar." },
    { teks: "1/8 + 2/8 = 3/16.", benar: false, penjelasan: "Penyebut tetap 8 → 3/8." },
    { teks: "Hasil penjumlahan boleh disederhanakan.", benar: true, penjelasan: "Pakai FPB." },
  ],
];

export const RONDE_DETEKTIF_QB: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["martabak", "1/8 dan 2/8", "jumlah"], jawab: "3/8", opsi: ["3/8", "3/16", "2/8"], salah: "Pembilang dijumlah." },
  { klue: ["wingko", "1/2 dan 1/3", "gabung"], jawab: "5/6", opsi: ["5/6", "2/5", "1/6"], salah: "KPK 6." },
  { klue: ["penyebut beda", "langkah pertama"], jawab: "cari KPK", opsi: ["cari KPK", "kurangi", "buang penyebut"], salah: "Samakan dulu." },
];

export const PETA_KONSEP_QB = [{
  pusat: "Jumlah Pecahan",
  kotak: [
    { label: "Syarat", opsi: ["penyebut sama", "pembilang sama", "hasil 1"], benar: 0 },
    { label: "Sama penyebut", opsi: ["jumlahkan pembilang", "jumlahkan penyebut", "kali semua"], benar: 0 },
    { label: "Beda penyebut", opsi: ["KPK + pecahan senilai", "langsung tambah", "kurangi"], benar: 0 },
    { label: "Contoh 1/2+1/3", opsi: ["5/6", "2/5", "1/5"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QB = RONDE_CERITA_CB;

// ---- C: Pengurangan ----
export const RONDE_KURANG_SAMA_CC: { a: string; b: string; hasil: string; pesan: string }[][] = [
  [
    { a: "2/3", b: "1/3", hasil: "1/3", pesan: "Lukas: kertas belum dilukis." },
    { a: "6/8", b: "2/8", hasil: "4/8", pesan: "Boleh jadi 1/2." },
  ],
  [
    { a: "5/7", b: "2/7", hasil: "3/7", pesan: "Pembilang dikurangi." },
    { a: "9/10", b: "3/10", hasil: "6/10", pesan: "Boleh 3/5." },
  ],
  [
    { a: "7/8", b: "3/8", hasil: "4/8", pesan: "7−3=4." },
    { a: "5/6", b: "1/6", hasil: "4/6", pesan: "Boleh 2/3." },
  ],
];

export const RONDE_KURANG_BEDA_CC: { a: string; b: string; hasil: string; pesan: string }[][] = [
  [
    { a: "2/3", b: "1/2", hasil: "1/6", pesan: "Yohana: 4/6−3/6=1/6." },
    { a: "3/4", b: "1/6", hasil: "7/12", pesan: "9/12−2/12." },
  ],
  [
    { a: "5/6", b: "1/3", hasil: "1/2", pesan: "5/6−2/6=3/6=1/2." },
    { a: "1/2", b: "1/5", hasil: "3/10", pesan: "5/10−2/10." },
  ],
  [
    { a: "7/8", b: "1/4", hasil: "5/8", pesan: "7/8−2/8." },
    { a: "2/3", b: "1/6", hasil: "1/2", pesan: "4/6−1/6=3/6=1/2." },
  ],
];

export const RONDE_JENIS_CC: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Syarat pengurangan pecahan?", jawab: "penyebut harus sama", opsi: ["penyebut harus sama", "hasil harus nol", "pembilang lebih kecil selalu"], pesan: "Sama seperti penjumlahan." },
    { tanya: "2/3 − 1/3 = ?", jawab: "1/3", opsi: ["1/3", "1/0", "3/3"], pesan: "Lukas." },
  ],
  [
    { tanya: "2/3 − 1/2 = ?", jawab: "1/6", opsi: ["1/6", "1/5", "1/3"], pesan: "Yohana lukis." },
    { tanya: "Jika penyebut berbeda, langkah pertama?", jawab: "samakan dengan KPK", opsi: ["samakan dengan KPK", "langsung kurang pembilang", "tambah dulu"], pesan: "Buku." },
  ],
  [
    { tanya: "Pengurangan campuran perlu?", jawab: "ubah ke biasa atau samakan bentuk", opsi: ["ubah ke biasa atau samakan bentuk", "buang bilangan bulat", "kali 10"], pesan: "Agar aman." },
    { tanya: "Setelah kurang, boleh?", jawab: "sederhanakan", opsi: ["sederhanakan", "selalu kali penyebut", "buang hasil"], pesan: "FPB." },
  ],
];

export const RONDE_SORTIR_CC: { id: string; label: string; bin: "sama" | "beda" }[][] = [
  [
    { id: "a1", label: "2/3−1/3", bin: "sama" }, { id: "a2", label: "2/3−1/2", bin: "beda" }, { id: "a3", label: "6/8−2/8", bin: "sama" },
    { id: "a4", label: "3/4−1/6", bin: "beda" }, { id: "a5", label: "5/7−2/7", bin: "sama" }, { id: "a6", label: "5/6−1/3", bin: "beda" },
  ],
  [
    { id: "b1", label: "9/10−3/10", bin: "sama" }, { id: "b2", label: "1/2−1/5", bin: "beda" }, { id: "b3", label: "7/8−3/8", bin: "sama" },
    { id: "b4", label: "7/8−1/4", bin: "beda" }, { id: "b5", label: "5/6−1/6", bin: "sama" }, { id: "b6", label: "2/3−1/6", bin: "beda" },
  ],
  [
    { id: "c1", label: "kurang pembilang saja", bin: "sama" }, { id: "c2", label: "perlu KPK", bin: "beda" }, { id: "c3", label: "penyebut tetap", bin: "sama" },
    { id: "c4", label: "ubah senilai dulu", bin: "beda" }, { id: "c5", label: "4/8−1/8", bin: "sama" }, { id: "c6", label: "3/4−1/2", bin: "beda" },
  ],
];

export const RONDE_PASANG_CC: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "2/3 − 1/3", kanan: "1/3" }, { kiri: "2/3 − 1/2", kanan: "1/6" },
    { kiri: "6/8 − 2/8", kanan: "4/8" }, { kiri: "syarat kurang", kanan: "penyebut sama" },
  ],
  [
    { kiri: "Yohana belum lukis", kanan: "1/6" }, { kiri: "Lukas belum lukis", kanan: "1/3" },
    { kiri: "5/6 − 1/3", kanan: "1/2" }, { kiri: "cara beda penyebut", kanan: "KPK + senilai" },
  ],
  [
    { kiri: "7/8 − 1/4", kanan: "5/8" }, { kiri: "1/2 − 1/5", kanan: "3/10" },
    { kiri: "setelah kurang", kanan: "boleh sederhanakan" }, { kiri: "3/4 − 1/6", kanan: "7/12" },
  ],
];
export const RONDE_MEMORI_CC = RONDE_PASANG_CC;

export const RONDE_KETUK_CC: { item: string[]; tanya: string[] }[] = [
  { item: ["1/3", "1/6", "4/8", "1/2", "3/7", "5/8"], tanya: ["1/3", "1/6", "4/8"] },
  { item: ["1/2", "3/10", "5/8", "7/12", "2/3", "1/5"], tanya: ["1/2", "3/10", "5/8"] },
  { item: ["2/3", "1/3", "1/2", "1/6", "5/6", "3/4"], tanya: ["2/3", "1/3", "1/2"] },
];

export const RONDE_SEMUA_CC: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "hasil pengurangan benar", item: [
    { id: "a", label: "2/3−1/3=1/3", cocok: true }, { id: "b", label: "2/3−1/2=1/6", cocok: true }, { id: "c", label: "2/3−1/2=1/5", cocok: false }, { id: "d", label: "6/8−2/8=4/8", cocok: true },
  ]},
  { label: "perlu samakan penyebut", item: [
    { id: "a", label: "2/3−1/2", cocok: true }, { id: "b", label: "2/3−1/3", cocok: false }, { id: "c", label: "3/4−1/6", cocok: true }, { id: "d", label: "5/7−2/7", cocok: false },
  ]},
  { label: "langkah benar", item: [
    { id: "a", label: "penyebut sama dulu", cocok: true }, { id: "b", label: "kurangi pembilang", cocok: true }, { id: "c", label: "kurangi penyebut juga", cocok: false }, { id: "d", label: "boleh sederhanakan", cocok: true },
  ]},
];

export const RONDE_CERITA_CC: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "Lukas harus lukis 2/3, sudah 1/3. Sisa?", jawab: "1/3", opsi: ["1/3", "1/2", "3/3"], pesan: "2/3−1/3." },
    { teks: "Yohana harus 2/3, sudah 1/2. Sisa?", jawab: "1/6", opsi: ["1/6", "1/5", "1/3"], pesan: "4/6−3/6." },
  ],
  [
    { teks: "Asep 8 apel, beri Lukas 6. Sisa dari keseluruhan?", jawab: "2/8", opsi: ["2/8", "6/8", "8/6"], pesan: "Boleh 1/4." },
    { teks: "5/6 − 1/3 = ?", jawab: "1/2", opsi: ["1/2", "4/3", "2/3"], pesan: "5/6−2/6." },
  ],
  [
    { teks: "Pengurangan beda penyebut: langkah pertama?", jawab: "samakan penyebut (KPK)", opsi: ["samakan penyebut (KPK)", "langsung kurang", "tambah dulu"], pesan: "Syarat." },
    { teks: "7/8 − 1/4 = ?", jawab: "5/8", opsi: ["5/8", "6/8", "3/4"], pesan: "7/8−2/8." },
  ],
];

export const RONDE_URUT_CC: { angka: string[]; dari: "kecil" | "besar"; kunci: string[] }[] = [
  { angka: ["1/6", "1/3", "1/2"], dari: "kecil", kunci: ["1/6", "1/3", "1/2"] },
  { angka: ["5/8", "1/2", "3/10"], dari: "besar", kunci: ["5/8", "1/2", "3/10"] },
  { angka: ["4/8", "1/3", "7/12"], dari: "kecil", kunci: ["1/3", "4/8", "7/12"] },
];

export const RONDE_KURANG_SAMA_PC = RONDE_KURANG_SAMA_CC;
export const RONDE_KURANG_BEDA_PC = RONDE_KURANG_BEDA_CC;
export const RONDE_PASANG_PC = RONDE_PASANG_CC;
export const RONDE_MEMORI_PC = RONDE_MEMORI_CC;
export const RONDE_SORTIR_PC = RONDE_SORTIR_CC;
export const RONDE_SEMUA_PC = RONDE_SEMUA_CC;
export const RONDE_JENIS_PC = RONDE_JENIS_CC;
export const RONDE_CERITA_PC = RONDE_CERITA_CC;

export const RONDE_TABEL_PC: { baris: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { baris: "2/3−1/3", jawab: "1/3", opsi: ["1/3", "1/2", "0"], pesan: "Lukas." },
    { baris: "2/3−1/2", jawab: "1/6", opsi: ["1/6", "1/5", "1"], pesan: "Yohana." },
  ],
  [
    { baris: "6/8−2/8", jawab: "4/8", opsi: ["4/8", "4/16", "8/6"], pesan: "Sama penyebut." },
    { baris: "cara beda", jawab: "KPK", opsi: ["KPK", "bagi 2", "acak"], pesan: "Samakan." },
  ],
  [
    { baris: "5/6−1/3", jawab: "1/2", opsi: ["1/2", "4/3", "2/6"], pesan: "5/6−2/6." },
    { baris: "syarat kurang", jawab: "penyebut sama", opsi: ["penyebut sama", "hasil genap", "pembilang 0"], pesan: "Buku." },
  ],
];

export const RONDE_BENARSALAH_QC: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Pengurangan pecahan butuh penyebut sama.", benar: true, penjelasan: "Syarat." },
    { teks: "2/3 − 1/2 = 1/5.", benar: false, penjelasan: "Hasil 1/6." },
    { teks: "2/3 − 1/3 = 1/3.", benar: true, penjelasan: "Benar." },
  ],
  [
    { teks: "KPK membantu menyamakan penyebut.", benar: true, penjelasan: "Benar." },
    { teks: "Pada pengurangan, penyebut juga dikurangi.", benar: false, penjelasan: "Penyebut tetap setelah disamakan." },
    { teks: "Hasil boleh disederhanakan.", benar: true, penjelasan: "Pakai FPB." },
  ],
];

export const RONDE_DETEKTIF_QC: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["Lukas lukis", "2/3 harus", "1/3 sudah"], jawab: "1/3", opsi: ["1/3", "1/2", "2/3"], salah: "Kurangi pembilang." },
  { klue: ["Yohana lukis", "2/3 harus", "1/2 sudah"], jawab: "1/6", opsi: ["1/6", "1/5", "1/3"], salah: "Samakan ke 6." },
  { klue: ["apel Asep", "8 total", "beri 6", "sisa pecahan"], jawab: "2/8", opsi: ["2/8", "6/8", "8/2"], salah: "Sisa/keseluruhan." },
];

export const PETA_KONSEP_QC = [{
  pusat: "Kurang Pecahan",
  kotak: [
    { label: "Syarat", opsi: ["penyebut sama", "hasil negatif", "pembilang 0"], benar: 0 },
    { label: "Sama penyebut", opsi: ["kurangi pembilang", "kurangi penyebut", "kali"], benar: 0 },
    { label: "Beda penyebut", opsi: ["KPK + senilai", "langsung kurang", "tambah"], benar: 0 },
    { label: "Contoh 2/3−1/2", opsi: ["1/6", "1/5", "1/3"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QC = RONDE_CERITA_CC;
