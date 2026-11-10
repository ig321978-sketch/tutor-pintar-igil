/**
 * Data murni Matematika Kelas 4 Bab 2 (Pecahan): Sub-Bab A (pembilang satu),
 * B (penyebut sama), C (pecahan senilai). Sumber: Buku Siswa Matematika Kelas IV
 * Kemendikbudristek Bab 2 hlm. 57–70. Tanpa React/jaringan. Uji: scripts/uji-data-k4b2.mjs.
 */

export const HURUF = ["A", "B", "C", "D", "E", "F", "G", "H"] as const;

export type Pec = { p: number; q: number };
export type RelasiPec = ">" | "<" | "=";

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

export const teksPec = (x: Pec) => `${x.p}/${x.q}`;
export const nilaiPec = (x: Pec) => x.p / x.q;
export const relasiPec = (a: Pec, b: Pec): RelasiPec => {
  const d = nilaiPec(a) - nilaiPec(b);
  if (Math.abs(d) < 1e-9) return "=";
  return d > 0 ? ">" : "<";
};
export const senilai = (a: Pec, b: Pec) => Math.abs(nilaiPec(a) - nilaiPec(b)) < 1e-9;
export const sederhanakan = (x: Pec): Pec => {
  const fpb = (m: number, n: number): number => (n === 0 ? m : fpb(n, m % n));
  const d = fpb(x.p, x.q);
  return { p: x.p / d, q: x.q / d };
};
export const kaliSenilai = (x: Pec, k: number): Pec => ({ p: x.p * k, q: x.q * k });
export const opsiAngka = (h: number, seed: number) => {
  const o = [h, h + 1 + (seed % 2), Math.max(1, h - 1 - (seed % 2))];
  return urutanTetap(3, 1, seed).map((i) => o[i]);
};
export const opsiPec = (benar: Pec, seed: number): Pec[] => {
  const pengecoh: Pec[] = [
    { p: benar.p, q: benar.q + 1 },
    { p: Math.max(1, benar.p + 1), q: benar.q },
  ];
  if (pengecoh[0].q === benar.q) pengecoh[0] = { p: benar.p, q: benar.q + 2 };
  const semua = [benar, pengecoh[0], pengecoh[1]];
  return urutanTetap(3, 2, seed).map((i) => semua[i]);
};
export const kataRelasi = (r: RelasiPec) => (r === ">" ? "lebih dari" : r === "<" ? "kurang dari" : "sama dengan");

/* ===== A: pembilang satu ===== */
export const RONDE_BACA_CA: Pec[][] = [
  [{ p: 1, q: 4 }, { p: 1, q: 2 }],
  [{ p: 1, q: 3 }, { p: 1, q: 5 }],
  [{ p: 1, q: 6 }, { p: 1, q: 8 }],
];
export const RONDE_BANDING_CA: { a: Pec; b: Pec }[][] = [
  [{ a: { p: 1, q: 2 }, b: { p: 1, q: 4 } }, { a: { p: 1, q: 5 }, b: { p: 1, q: 10 } }],
  [{ a: { p: 1, q: 3 }, b: { p: 1, q: 8 } }, { a: { p: 1, q: 4 }, b: { p: 1, q: 5 } }],
  [{ a: { p: 1, q: 2 }, b: { p: 1, q: 5 } }, { a: { p: 1, q: 10 }, b: { p: 1, q: 11 } }],
];
export const RONDE_SORTIR_CA: Pec[][] = [
  [{ p: 1, q: 2 }, { p: 1, q: 4 }, { p: 1, q: 3 }, { p: 1, q: 8 }, { p: 1, q: 5 }, { p: 1, q: 10 }],
  [{ p: 1, q: 2 }, { p: 1, q: 6 }, { p: 1, q: 3 }, { p: 1, q: 12 }, { p: 1, q: 4 }, { p: 1, q: 9 }],
  [{ p: 1, q: 5 }, { p: 1, q: 10 }, { p: 1, q: 2 }, { p: 1, q: 20 }, { p: 1, q: 4 }, { p: 1, q: 8 }],
];
export const RONDE_PASANG_CA: { gambar: Pec; teks: string }[][] = [
  [{ gambar: { p: 1, q: 4 }, teks: "1/4" }, { gambar: { p: 1, q: 2 }, teks: "1/2" }, { gambar: { p: 1, q: 3 }, teks: "1/3" }],
  [{ gambar: { p: 1, q: 5 }, teks: "1/5" }, { gambar: { p: 1, q: 8 }, teks: "1/8" }, { gambar: { p: 1, q: 10 }, teks: "1/10" }],
  [{ gambar: { p: 1, q: 6 }, teks: "1/6" }, { gambar: { p: 1, q: 2 }, teks: "1/2" }, { gambar: { p: 1, q: 4 }, teks: "1/4" }],
];
export const RONDE_MEMORI_CA = RONDE_PASANG_CA;
export const RONDE_KETUK_CA: { item: Pec[]; tanya: Pec[] }[] = [
  { item: [{ p: 1, q: 2 }, { p: 1, q: 4 }, { p: 1, q: 8 }], tanya: [{ p: 1, q: 2 }, { p: 1, q: 4 }] },
  { item: [{ p: 1, q: 3 }, { p: 1, q: 5 }, { p: 1, q: 10 }], tanya: [{ p: 1, q: 3 }, { p: 1, q: 5 }] },
  { item: [{ p: 1, q: 2 }, { p: 1, q: 6 }, { p: 1, q: 12 }], tanya: [{ p: 1, q: 2 }, { p: 1, q: 6 }] },
];
export const RONDE_SEMUA_CA: { syarat: "besar" | "kecil"; acuan: Pec; item: Pec[] }[] = [
  { syarat: "besar", acuan: { p: 1, q: 4 }, item: [{ p: 1, q: 2 }, { p: 1, q: 4 }, { p: 1, q: 8 }, { p: 1, q: 3 }] },
  { syarat: "kecil", acuan: { p: 1, q: 5 }, item: [{ p: 1, q: 2 }, { p: 1, q: 10 }, { p: 1, q: 5 }, { p: 1, q: 20 }] },
  { syarat: "besar", acuan: { p: 1, q: 8 }, item: [{ p: 1, q: 4 }, { p: 1, q: 8 }, { p: 1, q: 16 }, { p: 1, q: 2 }] },
];
export const cocokUnit = (x: Pec, s: { syarat: "besar" | "kecil"; acuan: Pec }) =>
  s.syarat === "besar" ? nilaiPec(x) > nilaiPec(s.acuan) : nilaiPec(x) < nilaiPec(s.acuan);
export const RONDE_CERITA_CA: { teks: string; jawab: Pec; opsi: Pec[]; pesan: string }[][] = [
  [
    { teks: "Pizza dipotong 4 sama besar. Tiap anak mendapat berapa?", jawab: { p: 1, q: 4 }, opsi: [{ p: 1, q: 4 }, { p: 1, q: 2 }, { p: 4, q: 1 }], pesan: "1 dari 4 bagian = 1/4." },
    { teks: "Tiara: bawang 1/2 kg, gula 1/4 kg. Mana lebih berat?", jawab: { p: 1, q: 2 }, opsi: [{ p: 1, q: 2 }, { p: 1, q: 4 }, { p: 1, q: 3 }], pesan: "1/2 > 1/4, bawang lebih berat." },
  ],
  [
    { teks: "Kue dipotong 5 sama. Ambil 1 potong. Bentuk pecahannya?", jawab: { p: 1, q: 5 }, opsi: [{ p: 1, q: 5 }, { p: 1, q: 4 }, { p: 5, q: 1 }], pesan: "1/5." },
    { teks: "Mana lebih besar: 1/3 atau 1/8?", jawab: { p: 1, q: 3 }, opsi: [{ p: 1, q: 3 }, { p: 1, q: 8 }, { p: 1, q: 10 }], pesan: "Penyebut lebih kecil → pecahan unit lebih besar." },
  ],
  [
    { teks: "Roti dibagi 10. Ambil 1. Bentuk pecahan?", jawab: { p: 1, q: 10 }, opsi: [{ p: 1, q: 10 }, { p: 1, q: 5 }, { p: 10, q: 1 }], pesan: "1/10." },
    { teks: "1/11 … 1/5. Isi tanda yang benar untuk 1/11 dibanding 1/5.", jawab: { p: 1, q: 11 }, opsi: [{ p: 1, q: 11 }, { p: 1, q: 5 }, { p: 1, q: 2 }], pesan: "1/11 < 1/5." },
  ],
];
export const RONDE_URUT_CA: { angka: Pec[]; dari: "kecil" | "besar" }[] = [
  { angka: [{ p: 1, q: 2 }, { p: 1, q: 4 }, { p: 1, q: 8 }], dari: "besar" },
  { angka: [{ p: 1, q: 3 }, { p: 1, q: 5 }, { p: 1, q: 10 }], dari: "kecil" },
  { angka: [{ p: 1, q: 2 }, { p: 1, q: 3 }, { p: 1, q: 6 }], dari: "besar" },
];
export const RONDE_BACA_PA = RONDE_BACA_CA;
export const RONDE_BANDING_PA = RONDE_BANDING_CA;
export const RONDE_PASANG_PA = RONDE_PASANG_CA;
export const RONDE_MEMORI_PA = RONDE_MEMORI_CA;
export const RONDE_TABEL_PA: { gambar: Pec; teks: string }[][] = RONDE_PASANG_CA;
export const RONDE_SEMUA_PA = RONDE_SEMUA_CA;
export const RONDE_SORTIR_PA = RONDE_SORTIR_CA;
export const RONDE_BENARSALAH_QA: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Pada pecahan 1/4, pembilang adalah 1 dan penyebut adalah 4.", benar: true, penjelasan: "Pembilang di atas, penyebut di bawah." },
    { teks: "1/2 lebih kecil dari 1/4.", benar: false, penjelasan: "1/2 > 1/4 karena daerah arsir setengah lebih besar." },
    { teks: "Makin besar penyebut pada pecahan unit, makin kecil nilainya.", benar: true, penjelasan: "1/n mengecil saat n membesar." },
    { teks: "Pizza 4 potong sama: tiap anak 1/4.", benar: true, penjelasan: "Contoh buku." },
  ],
  [
    { teks: "1/10 > 1/5.", benar: false, penjelasan: "1/10 < 1/5." },
    { teks: "Pembilang satu artinya hanya satu bagian yang diambil.", benar: true, penjelasan: "Unit fraction." },
    { teks: "1/3 < 1/8.", benar: false, penjelasan: "1/3 > 1/8." },
    { teks: "Daerah arsir dipakai untuk membandingkan pecahan.", benar: true, penjelasan: "Metode buku." },
  ],
];
export const RONDE_DETEKTIF_QA: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["Aku pecahan pizza Ibu Guru.", "Aku 1 dari 4 bagian."], jawab: "1/4", opsi: ["1/4", "1/2", "4/1"], salah: "1 dari 4 = 1/4." },
  { klue: ["Aku lebih besar dari 1/4.", "Aku pecahan unit penyebut 2."], jawab: "1/2", opsi: ["1/2", "1/8", "1/10"], salah: "1/2 > 1/4." },
  { klue: ["Aku kurang dari 1/5.", "Aku penyebutnya 10."], jawab: "1/10", opsi: ["1/10", "1/3", "1/2"], salah: "1/10 < 1/5." },
  { klue: ["Bawang Tiara.", "Aku 1/2 kg."], jawab: "1/2", opsi: ["1/2", "1/4", "1/3"], salah: "Bawang 1/2 kg lebih berat dari gula 1/4 kg." },
];
export const PETA_KONSEP_QA = [
  { pusat: "Pembilang Satu", kotak: [
    { label: "Bentuk", opsi: ["1/n", "n/1", "n/n"], benar: 0 },
    { label: "Pizza 4 potong", opsi: ["1/4", "4/1", "1/2"], benar: 0 },
    { label: "Banding unit", opsi: ["penyebut besar → nilai kecil", "penyebut besar → nilai besar", "selalu sama"], benar: 0 },
    { label: "Alat banding", opsi: ["daerah arsir", "acak", "warna saja"], benar: 0 },
  ]},
];
export const RONDE_CERITA_QA = RONDE_CERITA_CA;

/* ===== B: penyebut sama ===== */
export const RONDE_BACA_CB: Pec[][] = [
  [{ p: 1, q: 3 }, { p: 2, q: 3 }],
  [{ p: 2, q: 10 }, { p: 1, q: 10 }],
  [{ p: 3, q: 5 }, { p: 2, q: 5 }],
];
export const RONDE_BANDING_CB: { a: Pec; b: Pec }[][] = [
  [{ a: { p: 1, q: 3 }, b: { p: 2, q: 3 } }, { a: { p: 2, q: 10 }, b: { p: 1, q: 10 } }],
  [{ a: { p: 1, q: 5 }, b: { p: 2, q: 5 } }, { a: { p: 3, q: 8 }, b: { p: 2, q: 8 } }],
  [{ a: { p: 3, q: 6 }, b: { p: 2, q: 6 } }, { a: { p: 11, q: 13 }, b: { p: 12, q: 13 } }],
];
export const RONDE_SORTIR_CB: Pec[][] = [
  [{ p: 1, q: 5 }, { p: 3, q: 5 }, { p: 2, q: 5 }, { p: 4, q: 5 }, { p: 1, q: 4 }, { p: 2, q: 4 }],
  [{ p: 1, q: 8 }, { p: 3, q: 8 }, { p: 2, q: 8 }, { p: 5, q: 8 }, { p: 1, q: 6 }, { p: 2, q: 6 }],
  [{ p: 2, q: 10 }, { p: 5, q: 10 }, { p: 1, q: 10 }, { p: 7, q: 10 }, { p: 3, q: 6 }, { p: 1, q: 6 }],
];
export const RONDE_PASANG_CB: { gambar: Pec; teks: string }[][] = [
  [{ gambar: { p: 2, q: 3 }, teks: "2/3" }, { gambar: { p: 1, q: 3 }, teks: "1/3" }, { gambar: { p: 2, q: 10 }, teks: "2/10" }],
  [{ gambar: { p: 3, q: 5 }, teks: "3/5" }, { gambar: { p: 2, q: 4 }, teks: "2/4" }, { gambar: { p: 5, q: 10 }, teks: "5/10" }],
  [{ gambar: { p: 3, q: 6 }, teks: "3/6" }, { gambar: { p: 2, q: 6 }, teks: "2/6" }, { gambar: { p: 12, q: 13 }, teks: "12/13" }],
];
export const RONDE_MEMORI_CB = RONDE_PASANG_CB;
export const RONDE_KETUK_CB: { item: Pec[]; tanya: Pec[] }[] = [
  { item: [{ p: 1, q: 3 }, { p: 2, q: 3 }, { p: 3, q: 3 }], tanya: [{ p: 2, q: 3 }, { p: 1, q: 3 }] },
  { item: [{ p: 1, q: 10 }, { p: 2, q: 10 }, { p: 5, q: 10 }], tanya: [{ p: 2, q: 10 }, { p: 5, q: 10 }] },
  { item: [{ p: 2, q: 6 }, { p: 3, q: 6 }, { p: 1, q: 6 }], tanya: [{ p: 3, q: 6 }, { p: 2, q: 6 }] },
];
export const RONDE_SEMUA_CB: { q: number; minP: number; item: Pec[] }[] = [
  { q: 5, minP: 3, item: [{ p: 1, q: 5 }, { p: 3, q: 5 }, { p: 2, q: 5 }, { p: 4, q: 5 }] },
  { q: 8, minP: 3, item: [{ p: 1, q: 8 }, { p: 3, q: 8 }, { p: 2, q: 8 }, { p: 5, q: 8 }] },
  { q: 6, minP: 3, item: [{ p: 1, q: 6 }, { p: 2, q: 6 }, { p: 3, q: 6 }, { p: 5, q: 6 }] },
];
export const cocokPenyebut = (x: Pec, s: { q: number; minP: number }) => x.q === s.q && x.p >= s.minP;
export const RONDE_CERITA_CB: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "Asep tongkat 3/6 m, Azizah 2/6 m. Siapa lebih panjang?", jawab: "Asep", opsi: ["Asep", "Azizah", "sama"], pesan: "3/6 > 2/6 karena pembilang lebih besar." },
    { teks: "1/3 … 2/3. Tanda yang benar?", jawab: "<", opsi: ["<", ">", "="], pesan: "1/3 < 2/3." },
  ],
  [
    { teks: "2/10 … 1/10?", jawab: ">", opsi: [">", "<", "="], pesan: "2/10 > 1/10." },
    { teks: "Penyebut sama. Mana aturan banding?", jawab: "lihat pembilang", opsi: ["lihat pembilang", "lihat penyebut saja", "acak"], pesan: "Pembilang besar → pecahan besar." },
  ],
  [
    { teks: "12/13 … 11/13?", jawab: ">", opsi: [">", "<", "="], pesan: "12/13 > 11/13." },
    { teks: "3/5 … 2/4 (beda penyebut — hati-hati). Untuk latihan B fokus penyebut sama: 3/5 … 2/5?", jawab: ">", opsi: [">", "<", "="], pesan: "3/5 > 2/5." },
  ],
];
export const RONDE_URUT_CB: { angka: Pec[]; dari: "kecil" | "besar" }[] = [
  { angka: [{ p: 1, q: 5 }, { p: 3, q: 5 }, { p: 2, q: 5 }], dari: "kecil" },
  { angka: [{ p: 1, q: 8 }, { p: 5, q: 8 }, { p: 3, q: 8 }], dari: "besar" },
  { angka: [{ p: 2, q: 6 }, { p: 3, q: 6 }, { p: 1, q: 6 }], dari: "kecil" },
];
export const RONDE_BACA_PB = RONDE_BACA_CB;
export const RONDE_BANDING_PB = RONDE_BANDING_CB;
export const RONDE_PASANG_PB = RONDE_PASANG_CB;
export const RONDE_MEMORI_PB = RONDE_MEMORI_CB;
export const RONDE_TABEL_PB = RONDE_PASANG_CB;
export const RONDE_SEMUA_PB = RONDE_SEMUA_CB;
export const RONDE_SORTIR_PB = RONDE_SORTIR_CB;
export const RONDE_BENARSALAH_QB: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Jika penyebut sama, bandingkan pembilangnya.", benar: true, penjelasan: "Aturan buku Sub-Bab B." },
    { teks: "1/3 > 2/3.", benar: false, penjelasan: "1/3 < 2/3." },
    { teks: "2/10 > 1/10.", benar: true, penjelasan: "Pembilang 2 lebih besar." },
    { teks: "Tongkat Asep 3/6 lebih panjang dari Azizah 2/6.", benar: true, penjelasan: "Contoh buku." },
  ],
  [
    { teks: "Penyebut sama berarti potongan sama besar.", benar: true, penjelasan: "Ukuran tiap bagian sama." },
    { teks: "5/10 < 2/10.", benar: false, penjelasan: "5/10 > 2/10." },
    { teks: "12/13 > 11/13.", benar: true, penjelasan: "Pembilang lebih besar." },
    { teks: "Pada penyebut sama, daerah arsir mengikuti banyak bagian diarsir.", benar: true, penjelasan: "Visual buku." },
  ],
];
export const RONDE_DETEKTIF_QB: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["Penyebutku 3.", "Pembilangku 2."], jawab: "2/3", opsi: ["2/3", "1/3", "3/2"], salah: "2/3." },
  { klue: ["Aku lebih kecil dari 2/3.", "Penyebutku juga 3."], jawab: "1/3", opsi: ["1/3", "3/3", "2/5"], salah: "1/3 < 2/3." },
  { klue: ["Tongkat lebih panjang.", "Aku 3/6 meter."], jawab: "Asep", opsi: ["Asep", "Azizah", "sama"], salah: "Asep 3/6 > Azizah 2/6." },
  { klue: ["2/10 dibanding 1/10.", "Aku tanda yang benar."], jawab: ">", opsi: [">", "<", "="], salah: "2/10 > 1/10." },
];
export const PETA_KONSEP_QB = [
  { pusat: "Penyebut Sama", kotak: [
    { label: "Aturan", opsi: ["banding pembilang", "banding penyebut", "acak"], benar: 0 },
    { label: "1/3 dan 2/3", opsi: ["1/3 < 2/3", "1/3 > 2/3", "sama"], benar: 0 },
    { label: "Artinya", opsi: ["ukuran potongan sama", "pembilang sama", "nilai selalu sama"], benar: 0 },
    { label: "Contoh cerita", opsi: ["tongkat 3/6 vs 2/6", "pizza 1/4", "kelipatan 2"], benar: 0 },
  ]},
];
export const RONDE_CERITA_QB = RONDE_CERITA_CB;

/* ===== C: senilai ===== */
export const RONDE_SENILAI_CC: { a: Pec; b: Pec; sama: boolean }[][] = [
  [{ a: { p: 1, q: 3 }, b: { p: 2, q: 6 }, sama: true }, { a: { p: 1, q: 2 }, b: { p: 2, q: 4 }, sama: true }],
  [{ a: { p: 1, q: 4 }, b: { p: 2, q: 8 }, sama: true }, { a: { p: 1, q: 3 }, b: { p: 1, q: 6 }, sama: false }],
  [{ a: { p: 2, q: 5 }, b: { p: 4, q: 10 }, sama: true }, { a: { p: 3, q: 6 }, b: { p: 1, q: 3 }, sama: true }],
];
export const RONDE_KALI_CC: { asal: Pec; k: number; hasil: Pec }[][] = [
  [{ asal: { p: 1, q: 3 }, k: 2, hasil: { p: 2, q: 6 } }, { asal: { p: 1, q: 2 }, k: 3, hasil: { p: 3, q: 6 } }],
  [{ asal: { p: 1, q: 4 }, k: 2, hasil: { p: 2, q: 8 } }, { asal: { p: 2, q: 5 }, k: 2, hasil: { p: 4, q: 10 } }],
  [{ asal: { p: 1, q: 5 }, k: 3, hasil: { p: 3, q: 15 } }, { asal: { p: 3, q: 4 }, k: 2, hasil: { p: 6, q: 8 } }],
];
export const RONDE_BAGI_CC: { asal: Pec; k: number; hasil: Pec }[][] = [
  [{ asal: { p: 2, q: 6 }, k: 2, hasil: { p: 1, q: 3 } }, { asal: { p: 2, q: 4 }, k: 2, hasil: { p: 1, q: 2 } }],
  [{ asal: { p: 4, q: 8 }, k: 4, hasil: { p: 1, q: 2 } }, { asal: { p: 3, q: 6 }, k: 3, hasil: { p: 1, q: 2 } }],
  [{ asal: { p: 4, q: 10 }, k: 2, hasil: { p: 2, q: 5 } }, { asal: { p: 6, q: 9 }, k: 3, hasil: { p: 2, q: 3 } }],
];
export const RONDE_PASANG_CC: { a: Pec; b: Pec }[][] = [
  [{ a: { p: 1, q: 3 }, b: { p: 2, q: 6 } }, { a: { p: 1, q: 2 }, b: { p: 2, q: 4 } }, { a: { p: 1, q: 4 }, b: { p: 2, q: 8 } }],
  [{ a: { p: 2, q: 5 }, b: { p: 4, q: 10 } }, { a: { p: 1, q: 5 }, b: { p: 2, q: 10 } }, { a: { p: 3, q: 6 }, b: { p: 1, q: 2 } }],
  [{ a: { p: 2, q: 3 }, b: { p: 4, q: 6 } }, { a: { p: 1, q: 6 }, b: { p: 2, q: 12 } }, { a: { p: 3, q: 4 }, b: { p: 6, q: 8 } }],
];
export const RONDE_MEMORI_CC = RONDE_PASANG_CC;
export const RONDE_SORTIR_CC: { a: Pec; b: Pec }[][] = [
  [{ a: { p: 1, q: 3 }, b: { p: 2, q: 6 } }, { a: { p: 1, q: 3 }, b: { p: 1, q: 6 } }, { a: { p: 1, q: 2 }, b: { p: 2, q: 4 } }, { a: { p: 1, q: 4 }, b: { p: 1, q: 2 } }, { a: { p: 2, q: 5 }, b: { p: 4, q: 10 } }, { a: { p: 1, q: 5 }, b: { p: 2, q: 5 } }],
  [{ a: { p: 1, q: 4 }, b: { p: 2, q: 8 } }, { a: { p: 3, q: 6 }, b: { p: 1, q: 3 } }, { a: { p: 1, q: 2 }, b: { p: 3, q: 6 } }, { a: { p: 2, q: 6 }, b: { p: 1, q: 4 } }, { a: { p: 2, q: 3 }, b: { p: 4, q: 6 } }, { a: { p: 1, q: 3 }, b: { p: 3, q: 6 } }],
  [{ a: { p: 1, q: 5 }, b: { p: 2, q: 10 } }, { a: { p: 3, q: 4 }, b: { p: 6, q: 8 } }, { a: { p: 1, q: 2 }, b: { p: 4, q: 8 } }, { a: { p: 2, q: 5 }, b: { p: 3, q: 5 } }, { a: { p: 1, q: 6 }, b: { p: 2, q: 12 } }, { a: { p: 2, q: 4 }, b: { p: 1, q: 3 } }],
];
export const RONDE_KETUK_CC: { item: Pec[]; pasangan: Pec; tanya: Pec[] }[] = [
  { item: [{ p: 2, q: 6 }, { p: 1, q: 4 }, { p: 3, q: 6 }], pasangan: { p: 1, q: 3 }, tanya: [{ p: 2, q: 6 }] },
  { item: [{ p: 2, q: 4 }, { p: 2, q: 8 }, { p: 3, q: 6 }], pasangan: { p: 1, q: 2 }, tanya: [{ p: 2, q: 4 }, { p: 3, q: 6 }] },
  { item: [{ p: 4, q: 10 }, { p: 2, q: 8 }, { p: 2, q: 5 }], pasangan: { p: 2, q: 5 }, tanya: [{ p: 4, q: 10 }, { p: 2, q: 5 }] },
];
export const RONDE_SEMUA_CC: { acuan: Pec; item: Pec[] }[] = [
  { acuan: { p: 1, q: 3 }, item: [{ p: 2, q: 6 }, { p: 1, q: 4 }, { p: 3, q: 9 }, { p: 1, q: 2 }] },
  { acuan: { p: 1, q: 2 }, item: [{ p: 2, q: 4 }, { p: 3, q: 6 }, { p: 1, q: 3 }, { p: 4, q: 8 }] },
  { acuan: { p: 2, q: 5 }, item: [{ p: 4, q: 10 }, { p: 2, q: 6 }, { p: 6, q: 15 }, { p: 1, q: 5 }] },
];
export const RONDE_CERITA_CC: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "Coklat Putu: 2/6 dan 1/3. Apakah sama?", jawab: "sama", opsi: ["sama", "beda", "tidak tahu"], pesan: "2/6 = 1/3." },
    { teks: "1/3 ×2/×2 menjadi?", jawab: "2/6", opsi: ["2/6", "2/3", "1/6"], pesan: "Kalikan pembilang dan penyebut dengan 2." },
  ],
  [
    { teks: "2/6 ÷2/÷2 menjadi?", jawab: "1/3", opsi: ["1/3", "1/6", "2/3"], pesan: "Bagi pembilang dan penyebut dengan 2." },
    { teks: "Lipat kertas: 1/4 diwarnai vs 4/16. Senilai?", jawab: "ya", opsi: ["ya", "tidak", "kadang"], pesan: "1/4 = 4/16." },
  ],
  [
    { teks: "Cara mencari senilai selain mengalikan?", jawab: "membagi sama", opsi: ["membagi sama", "menambah 1", "mengacak"], pesan: "Bagi pembilang dan penyebut dengan bilangan sama." },
    { teks: "3/6 senilai dengan?", jawab: "1/2", opsi: ["1/2", "1/3", "2/3"], pesan: "3/6 = 1/2." },
  ],
];
export const RONDE_URUT_CC: { angka: Pec[]; dari: "kecil" | "besar" }[] = [
  { angka: [{ p: 1, q: 4 }, { p: 1, q: 2 }, { p: 3, q: 4 }], dari: "kecil" },
  { angka: [{ p: 2, q: 6 }, { p: 1, q: 2 }, { p: 1, q: 6 }], dari: "besar" },
  { angka: [{ p: 1, q: 5 }, { p: 2, q: 5 }, { p: 4, q: 5 }], dari: "kecil" },
];
export const RONDE_SENILAI_PC = RONDE_SENILAI_CC;
export const RONDE_KALI_PC = RONDE_KALI_CC;
export const RONDE_BAGI_PC = RONDE_BAGI_CC;
export const RONDE_PASANG_PC = RONDE_PASANG_CC;
export const RONDE_MEMORI_PC = RONDE_MEMORI_CC;
export const RONDE_SORTIR_PC = RONDE_SORTIR_CC;
export const RONDE_SEMUA_PC = RONDE_SEMUA_CC;
export const RONDE_TABEL_PC: { asal: Pec; k: number; hasil: Pec }[][] = RONDE_KALI_CC;
export const RONDE_BENARSALAH_QC: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "2/6 = 1/3.", benar: true, penjelasan: "Coklat Putu di buku." },
    { teks: "Pecahan senilai selalu punya penyebut sama.", benar: false, penjelasan: "Senilai bisa penyebut berbeda, nilainya sama." },
    { teks: "Mengalikan pembilang dan penyebut dengan bilangan sama menghasilkan senilai.", benar: true, penjelasan: "Cara a di buku." },
    { teks: "1/2 = 2/4 = 3/6.", benar: true, penjelasan: "Semua bernilai setengah." },
  ],
  [
    { teks: "Membagi pembilang dan penyebut dengan bilangan sama juga menghasilkan senilai.", benar: true, penjelasan: "Cara b di buku." },
    { teks: "1/3 = 1/6.", benar: false, penjelasan: "Nilai berbeda." },
    { teks: "4/8 = 1/2.", benar: true, penjelasan: "Bagi 4." },
    { teks: "Daerah arsir sama besar menandai pecahan senilai.", benar: true, penjelasan: "Aktivitas lipat kertas." },
  ],
];
export const RONDE_DETEKTIF_QC: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["Aku senilai 1/3.", "Pembilangku 2."], jawab: "2/6", opsi: ["2/6", "2/3", "1/6"], salah: "1/3 ×2 = 2/6." },
  { klue: ["Aku coklat Putu bagian kedua.", "Aku 1/3."], jawab: "1/3", opsi: ["1/3", "2/6", "1/6"], salah: "Pembagian kedua: 1/3." },
  { klue: ["Aku hasil 2/6 ÷2.", "Aku bentuk sederhana."], jawab: "1/3", opsi: ["1/3", "1/2", "2/3"], salah: "2/6 ÷2 = 1/3." },
  { klue: ["Aku senilai 1/2.", "Penyebutku 8."], jawab: "4/8", opsi: ["4/8", "2/8", "1/8"], salah: "1/2 = 4/8." },
];
export const PETA_KONSEP_QC = [
  { pusat: "Pecahan Senilai", kotak: [
    { label: "Arti", opsi: ["nilai sama, bentuk boleh beda", "penyebut harus sama", "pembilang harus 1"], benar: 0 },
    { label: "Cara 1", opsi: ["× bilangan sama", "tambah 1", "acak"], benar: 0 },
    { label: "Cara 2", opsi: [": bilangan sama", "kurang 1", "tukar posisi"], benar: 0 },
    { label: "Contoh", opsi: ["2/6 = 1/3", "1/3 = 1/6", "2/3 = 1/3"], benar: 0 },
  ]},
];
export const RONDE_CERITA_QC = RONDE_CERITA_CC;

/* ===== D: desimal persepuluhan & perseratusan ===== */
export type PasanganDes = { pec: Pec; des: string; jenis: "persepuluhan" | "perseratusan" };
export const teksDes = (s: string) => s;
export const pecKeDes = (x: Pec): string => {
  if (x.q === 10) return `0,${x.p}`;
  if (x.q === 100) return x.p < 10 ? `0,0${x.p}` : `0,${String(x.p).padStart(2, "0")}`;
  const v = x.p / x.q;
  return v.toFixed(x.q === 10 ? 1 : 2).replace(".", ",");
};
export const opsiDes = (benar: string, seed: number): string[] => {
  const n = Number(benar.replace(",", "."));
  const pengecoh = [
    (n + 0.1).toFixed(benar.includes("0,0") || benar.length >= 4 ? 2 : 1).replace(".", ","),
    Math.max(0.01, n - 0.1).toFixed(benar.includes("0,0") || benar.length >= 4 ? 2 : 1).replace(".", ","),
  ];
  if (pengecoh[0] === benar) pengecoh[0] = (n + 0.2).toFixed(2).replace(".", ",");
  if (pengecoh[1] === benar) pengecoh[1] = (n + 0.3).toFixed(2).replace(".", ",");
  return urutanTetap(3, 1, seed).map((i) => [benar, pengecoh[0], pengecoh[1]][i]);
};
export const opsiPersen = (benar: string, seed: number): string[] => {
  const n = Number(benar.replace("%", ""));
  const o = [`${n}%`, `${n + 10}%`, `${Math.max(1, n - 5)}%`];
  return urutanTetap(3, 1, seed).map((i) => o[i]);
};
export const desKePersen = (des: string): string => {
  const n = Number(des.replace(",", "."));
  return `${Math.round(n * 100)}%`;
};
export const persenKeDes = (persen: string): string => {
  const n = Number(persen.replace("%", ""));
  const v = n / 100;
  return v < 1 ? v.toFixed(2).replace(".", ",") : v.toFixed(2).replace(".", ",");
};

export const RONDE_UBAH_CD: PasanganDes[][] = [
  [
    { pec: { p: 1, q: 10 }, des: "0,1", jenis: "persepuluhan" },
    { pec: { p: 3, q: 10 }, des: "0,3", jenis: "persepuluhan" },
  ],
  [
    { pec: { p: 5, q: 10 }, des: "0,5", jenis: "persepuluhan" },
    { pec: { p: 9, q: 10 }, des: "0,9", jenis: "persepuluhan" },
  ],
  [
    { pec: { p: 4, q: 10 }, des: "0,4", jenis: "persepuluhan" },
    { pec: { p: 7, q: 10 }, des: "0,7", jenis: "persepuluhan" },
  ],
];
export const RONDE_UBAH100_CD: PasanganDes[][] = [
  [
    { pec: { p: 1, q: 100 }, des: "0,01", jenis: "perseratusan" },
    { pec: { p: 7, q: 100 }, des: "0,07", jenis: "perseratusan" },
  ],
  [
    { pec: { p: 25, q: 100 }, des: "0,25", jenis: "perseratusan" },
    { pec: { p: 15, q: 100 }, des: "0,15", jenis: "perseratusan" },
  ],
  [
    { pec: { p: 62, q: 100 }, des: "0,62", jenis: "perseratusan" },
    { pec: { p: 81, q: 100 }, des: "0,81", jenis: "perseratusan" },
  ],
];
export const RONDE_PASANG_CD: { pec: Pec; des: string }[][] = [
  [
    { pec: { p: 1, q: 10 }, des: "0,1" },
    { pec: { p: 3, q: 10 }, des: "0,3" },
    { pec: { p: 1, q: 100 }, des: "0,01" },
    { pec: { p: 25, q: 100 }, des: "0,25" },
  ],
  [
    { pec: { p: 5, q: 10 }, des: "0,5" },
    { pec: { p: 7, q: 100 }, des: "0,07" },
    { pec: { p: 9, q: 10 }, des: "0,9" },
    { pec: { p: 15, q: 100 }, des: "0,15" },
  ],
  [
    { pec: { p: 4, q: 10 }, des: "0,4" },
    { pec: { p: 62, q: 100 }, des: "0,62" },
    { pec: { p: 7, q: 10 }, des: "0,7" },
    { pec: { p: 81, q: 100 }, des: "0,81" },
  ],
];
export const RONDE_MEMORI_CD = RONDE_PASANG_CD;
export const RONDE_SORTIR_CD: PasanganDes[][] = [
  [
    { pec: { p: 1, q: 10 }, des: "0,1", jenis: "persepuluhan" },
    { pec: { p: 3, q: 10 }, des: "0,3", jenis: "persepuluhan" },
    { pec: { p: 1, q: 100 }, des: "0,01", jenis: "perseratusan" },
    { pec: { p: 25, q: 100 }, des: "0,25", jenis: "perseratusan" },
    { pec: { p: 5, q: 10 }, des: "0,5", jenis: "persepuluhan" },
    { pec: { p: 7, q: 100 }, des: "0,07", jenis: "perseratusan" },
  ],
  [
    { pec: { p: 9, q: 10 }, des: "0,9", jenis: "persepuluhan" },
    { pec: { p: 15, q: 100 }, des: "0,15", jenis: "perseratusan" },
    { pec: { p: 4, q: 10 }, des: "0,4", jenis: "persepuluhan" },
    { pec: { p: 62, q: 100 }, des: "0,62", jenis: "perseratusan" },
    { pec: { p: 7, q: 10 }, des: "0,7", jenis: "persepuluhan" },
    { pec: { p: 81, q: 100 }, des: "0,81", jenis: "perseratusan" },
  ],
  [
    { pec: { p: 2, q: 10 }, des: "0,2", jenis: "persepuluhan" },
    { pec: { p: 8, q: 100 }, des: "0,08", jenis: "perseratusan" },
    { pec: { p: 6, q: 10 }, des: "0,6", jenis: "persepuluhan" },
    { pec: { p: 36, q: 100 }, des: "0,36", jenis: "perseratusan" },
    { pec: { p: 8, q: 10 }, des: "0,8", jenis: "persepuluhan" },
    { pec: { p: 99, q: 100 }, des: "0,99", jenis: "perseratusan" },
  ],
];
export const RONDE_KETUK_CD: { item: PasanganDes[]; tanya: string[] }[] = [
  {
    item: [
      { pec: { p: 1, q: 10 }, des: "0,1", jenis: "persepuluhan" },
      { pec: { p: 3, q: 10 }, des: "0,3", jenis: "persepuluhan" },
      { pec: { p: 1, q: 100 }, des: "0,01", jenis: "perseratusan" },
      { pec: { p: 25, q: 100 }, des: "0,25", jenis: "perseratusan" },
      { pec: { p: 5, q: 10 }, des: "0,5", jenis: "persepuluhan" },
      { pec: { p: 7, q: 100 }, des: "0,07", jenis: "perseratusan" },
    ],
    tanya: ["0,1", "0,01", "0,25"],
  },
  {
    item: [
      { pec: { p: 9, q: 10 }, des: "0,9", jenis: "persepuluhan" },
      { pec: { p: 15, q: 100 }, des: "0,15", jenis: "perseratusan" },
      { pec: { p: 4, q: 10 }, des: "0,4", jenis: "persepuluhan" },
      { pec: { p: 62, q: 100 }, des: "0,62", jenis: "perseratusan" },
      { pec: { p: 7, q: 10 }, des: "0,7", jenis: "persepuluhan" },
      { pec: { p: 81, q: 100 }, des: "0,81", jenis: "perseratusan" },
    ],
    tanya: ["0,9", "0,15", "0,81"],
  },
  {
    item: [
      { pec: { p: 2, q: 10 }, des: "0,2", jenis: "persepuluhan" },
      { pec: { p: 8, q: 100 }, des: "0,08", jenis: "perseratusan" },
      { pec: { p: 6, q: 10 }, des: "0,6", jenis: "persepuluhan" },
      { pec: { p: 36, q: 100 }, des: "0,36", jenis: "perseratusan" },
      { pec: { p: 8, q: 10 }, des: "0,8", jenis: "persepuluhan" },
      { pec: { p: 99, q: 100 }, des: "0,99", jenis: "perseratusan" },
    ],
    tanya: ["0,2", "0,08", "0,99"],
  },
];
export const RONDE_SEMUA_CD: { jenis: "persepuluhan" | "perseratusan"; item: PasanganDes[] }[] = [
  {
    jenis: "persepuluhan",
    item: [
      { pec: { p: 1, q: 10 }, des: "0,1", jenis: "persepuluhan" },
      { pec: { p: 3, q: 10 }, des: "0,3", jenis: "persepuluhan" },
      { pec: { p: 1, q: 100 }, des: "0,01", jenis: "perseratusan" },
      { pec: { p: 25, q: 100 }, des: "0,25", jenis: "perseratusan" },
      { pec: { p: 5, q: 10 }, des: "0,5", jenis: "persepuluhan" },
      { pec: { p: 7, q: 100 }, des: "0,07", jenis: "perseratusan" },
    ],
  },
  {
    jenis: "perseratusan",
    item: [
      { pec: { p: 9, q: 10 }, des: "0,9", jenis: "persepuluhan" },
      { pec: { p: 15, q: 100 }, des: "0,15", jenis: "perseratusan" },
      { pec: { p: 4, q: 10 }, des: "0,4", jenis: "persepuluhan" },
      { pec: { p: 62, q: 100 }, des: "0,62", jenis: "perseratusan" },
      { pec: { p: 7, q: 10 }, des: "0,7", jenis: "persepuluhan" },
      { pec: { p: 81, q: 100 }, des: "0,81", jenis: "perseratusan" },
    ],
  },
  {
    jenis: "persepuluhan",
    item: [
      { pec: { p: 2, q: 10 }, des: "0,2", jenis: "persepuluhan" },
      { pec: { p: 8, q: 100 }, des: "0,08", jenis: "perseratusan" },
      { pec: { p: 6, q: 10 }, des: "0,6", jenis: "persepuluhan" },
      { pec: { p: 36, q: 100 }, des: "0,36", jenis: "perseratusan" },
      { pec: { p: 8, q: 10 }, des: "0,8", jenis: "persepuluhan" },
      { pec: { p: 99, q: 100 }, des: "0,99", jenis: "perseratusan" },
    ],
  },
];
export const cocokJenisDes = (x: PasanganDes, jenis: "persepuluhan" | "perseratusan") => x.jenis === jenis;
export const RONDE_CERITA_CD: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "1 dari 10 roti berlapis selai. Bentuk desimalnya?", jawab: "0,1", opsi: ["0,1", "0,01", "1,0"], pesan: "1/10 = 0,1." },
    { teks: "3 dari 10 bagian. Desimal?", jawab: "0,3", opsi: ["0,3", "0,03", "3,0"], pesan: "3/10 = 0,3." },
  ],
  [
    { teks: "1 dari 100 biskuit. Desimal?", jawab: "0,01", opsi: ["0,01", "0,1", "1,00"], pesan: "1/100 = 0,01." },
    { teks: "7/100 ditulis desimal?", jawab: "0,07", opsi: ["0,07", "0,7", "7,00"], pesan: "7/100 = 0,07." },
  ],
  [
    { teks: "Satu angka di belakang koma berarti penyebut?", jawab: "10", opsi: ["10", "100", "1"], pesan: "Persepuluhan → penyebut 10." },
    { teks: "Dua angka di belakang koma berarti penyebut?", jawab: "100", opsi: ["100", "10", "1000"], pesan: "Perseratusan → penyebut 100." },
  ],
];
export const RONDE_URUT_CD: { angka: string[]; dari: "kecil" | "besar" }[] = [
  { angka: ["0,1", "0,3", "0,01", "0,25"], dari: "kecil" },
  { angka: ["0,9", "0,15", "0,4", "0,07"], dari: "besar" },
  { angka: ["0,5", "0,05", "0,8", "0,25"], dari: "kecil" },
];
export const nilaiDes = (s: string) => Number(s.replace(",", "."));

export const RONDE_UBAH_PD = RONDE_UBAH_CD;
export const RONDE_UBAH100_PD = RONDE_UBAH100_CD;
export const RONDE_PASANG_PD = RONDE_PASANG_CD;
export const RONDE_MEMORI_PD = RONDE_MEMORI_CD;
export const RONDE_SORTIR_PD = RONDE_SORTIR_CD;
export const RONDE_KETUK_PD = RONDE_KETUK_CD;
export const RONDE_SEMUA_PD = RONDE_SEMUA_CD;
export const RONDE_TABEL_PD = RONDE_PASANG_CD;
export const RONDE_BENARSALAH_QD: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "1/10 = 0,1.", benar: true, penjelasan: "Satu angka di belakang koma = persepuluhan." },
    { teks: "1/100 = 0,1.", benar: false, penjelasan: "1/100 = 0,01." },
    { teks: "Dua angka di belakang koma berarti penyebut 100.", benar: true, penjelasan: "Perseratusan." },
    { teks: "25/100 = 0,25.", benar: true, penjelasan: "Contoh buku." },
  ],
  [
    { teks: "7/100 = 0,7.", benar: false, penjelasan: "7/100 = 0,07." },
    { teks: "3/10 = 0,3.", benar: true, penjelasan: "Persepuluhan." },
    { teks: "0,01 lebih kecil dari 0,1.", benar: true, penjelasan: "Perseratusan lebih kecil dari persepuluhan yang sama digit." },
    { teks: "Penyebut 10 → satu digit di belakang koma.", benar: true, penjelasan: "Aturan buku." },
  ],
];
export const RONDE_DETEKTIF_QD: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["Aku 1 dari 10 roti.", "Aku punya satu angka di belakang koma."], jawab: "0,1", opsi: ["0,1", "0,01", "1,0"], salah: "1/10 = 0,1." },
  { klue: ["Aku 1 dari 100 biskuit.", "Aku 0,0…"], jawab: "0,01", opsi: ["0,01", "0,1", "0,10"], salah: "1/100 = 0,01." },
  { klue: ["Aku 25 dari 100.", "Aku seperempat."], jawab: "0,25", opsi: ["0,25", "0,025", "2,5"], salah: "25/100 = 0,25." },
  { klue: ["Penyebutku 10.", "Digitku di belakang koma: satu."], jawab: "persepuluhan", opsi: ["persepuluhan", "perseratusan", "persen"], salah: "Satu digit → persepuluhan." },
];
export const PETA_KONSEP_QD = [
  {
    pusat: "Desimal",
    kotak: [
      { label: "Persepuluhan", opsi: ["penyebut 10 / 1 digit", "penyebut 100 / 2 digit", "persen"], benar: 0 },
      { label: "Perseratusan", opsi: ["penyebut 100 / 2 digit", "penyebut 10", "penyebut 1000"], benar: 0 },
      { label: "1/10", opsi: ["0,1", "0,01", "1,0"], benar: 0 },
      { label: "1/100", opsi: ["0,01", "0,1", "1,00"], benar: 0 },
    ],
  },
];
export const RONDE_CERITA_QD = RONDE_CERITA_CD;

/* ===== E: desimal perseratusan ↔ persen ===== */
export type PasanganPersen = { des: string; pec: Pec; persen: string };
export const RONDE_DES_PERS_CE: PasanganPersen[][] = [
  [
    { des: "0,35", pec: { p: 35, q: 100 }, persen: "35%" },
    { des: "0,75", pec: { p: 75, q: 100 }, persen: "75%" },
  ],
  [
    { des: "0,25", pec: { p: 25, q: 100 }, persen: "25%" },
    { des: "0,36", pec: { p: 36, q: 100 }, persen: "36%" },
  ],
  [
    { des: "0,12", pec: { p: 12, q: 100 }, persen: "12%" },
    { des: "0,05", pec: { p: 5, q: 100 }, persen: "5%" },
  ],
];
export const RONDE_BESAR_CE: PasanganPersen[][] = [
  [
    { des: "2,46", pec: { p: 246, q: 100 }, persen: "246%" },
    { des: "1,15", pec: { p: 115, q: 100 }, persen: "115%" },
  ],
  [
    { des: "5,62", pec: { p: 562, q: 100 }, persen: "562%" },
    { des: "1,38", pec: { p: 138, q: 100 }, persen: "138%" },
  ],
  [
    { des: "10,55", pec: { p: 1055, q: 100 }, persen: "1055%" },
    { des: "2,36", pec: { p: 236, q: 100 }, persen: "236%" },
  ],
];
export const RONDE_BALIK_CE: { persen: string; des: string }[][] = [
  [
    { persen: "18%", des: "0,18" },
    { persen: "65%", des: "0,65" },
  ],
  [
    { persen: "35%", des: "0,35" },
    { persen: "56%", des: "0,56" },
  ],
  [
    { persen: "123%", des: "1,23" },
    { persen: "125%", des: "1,25" },
  ],
];
export const RONDE_PASANG_CE: { des: string; persen: string }[][] = [
  [
    { des: "0,35", persen: "35%" },
    { des: "0,75", persen: "75%" },
    { des: "0,25", persen: "25%" },
    { des: "0,12", persen: "12%" },
  ],
  [
    { des: "0,36", persen: "36%" },
    { des: "0,05", persen: "5%" },
    { des: "1,15", persen: "115%" },
    { des: "0,65", persen: "65%" },
  ],
  [
    { des: "2,46", persen: "246%" },
    { des: "0,18", persen: "18%" },
    { des: "1,38", persen: "138%" },
    { des: "0,56", persen: "56%" },
  ],
];
export const RONDE_MEMORI_CE = RONDE_PASANG_CE;
export const RONDE_SORTIR_CE: { teks: string; jenis: "persen" | "desimal" }[][] = [
  [
    { teks: "35%", jenis: "persen" },
    { teks: "0,35", jenis: "desimal" },
    { teks: "75%", jenis: "persen" },
    { teks: "0,25", jenis: "desimal" },
    { teks: "12%", jenis: "persen" },
    { teks: "0,05", jenis: "desimal" },
  ],
  [
    { teks: "246%", jenis: "persen" },
    { teks: "2,46", jenis: "desimal" },
    { teks: "18%", jenis: "persen" },
    { teks: "0,18", jenis: "desimal" },
    { teks: "115%", jenis: "persen" },
    { teks: "1,15", jenis: "desimal" },
  ],
  [
    { teks: "5%", jenis: "persen" },
    { teks: "0,65", jenis: "desimal" },
    { teks: "56%", jenis: "persen" },
    { teks: "1,23", jenis: "desimal" },
    { teks: "125%", jenis: "persen" },
    { teks: "0,36", jenis: "desimal" },
  ],
];
export const RONDE_KETUK_CE: { item: string[]; tanya: string[] }[] = [
  { item: ["35%", "75%", "25%", "12%", "5%", "36%"], tanya: ["35%", "12%", "5%"] },
  { item: ["0,35", "0,75", "0,25", "0,12", "0,05", "0,36"], tanya: ["0,75", "0,05", "0,36"] },
  { item: ["246%", "115%", "18%", "65%", "125%", "56%"], tanya: ["246%", "18%", "125%"] },
];
export const RONDE_SEMUA_CE: { syarat: "kurang100" | "lebih100"; item: string[] }[] = [
  { syarat: "kurang100", item: ["35%", "75%", "125%", "12%", "246%", "5%"] },
  { syarat: "lebih100", item: ["115%", "65%", "246%", "18%", "125%", "56%"] },
  { syarat: "kurang100", item: ["25%", "138%", "36%", "562%", "12%", "99%"] },
];
export const cocokPersenSyarat = (teks: string, syarat: "kurang100" | "lebih100") => {
  const n = Number(teks.replace("%", ""));
  return syarat === "kurang100" ? n < 100 : n > 100;
};
export const RONDE_CERITA_CE: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "0,75 diubah ke persen?", jawab: "75%", opsi: ["75%", "7,5%", "750%"], pesan: "0,75 × 100% = 75%." },
    { teks: "0,35 = … %", jawab: "35%", opsi: ["35%", "3,5%", "350%"], pesan: "Cara langsung ×100%." },
  ],
  [
    { teks: "20 dari 50 siswa olahraga. Berapa persen?", jawab: "40%", opsi: ["40%", "20%", "50%"], pesan: "20/50 = 40/100 = 40%." },
    { teks: "30 dari 100 siswa ikut lomba. Persen?", jawab: "30%", opsi: ["30%", "3%", "70%"], pesan: "30/100 = 30%." },
  ],
  [
    { teks: "6 benar dari 10 soal. Persen?", jawab: "60%", opsi: ["60%", "6%", "40%"], pesan: "6/10 = 60/100 = 60%." },
    { teks: "Cara langsung: geser koma desimal … kali ke kanan.", jawab: "2", opsi: ["2", "1", "3"], pesan: "Geser dua kali ke kanan." },
  ],
];
export const RONDE_URUT_CE: { angka: string[]; dari: "kecil" | "besar" }[] = [
  { angka: ["12%", "35%", "75%", "115%"], dari: "kecil" },
  { angka: ["246%", "125%", "65%", "5%"], dari: "besar" },
  { angka: ["0,05", "0,25", "0,75", "1,15"], dari: "kecil" },
];

export const RONDE_DES_PERS_PE = RONDE_DES_PERS_CE;
export const RONDE_BESAR_PE = RONDE_BESAR_CE;
export const RONDE_BALIK_PE = RONDE_BALIK_CE;
export const RONDE_PASANG_PE = RONDE_PASANG_CE;
export const RONDE_MEMORI_PE = RONDE_MEMORI_CE;
export const RONDE_SORTIR_PE = RONDE_SORTIR_CE;
export const RONDE_KETUK_PE = RONDE_KETUK_CE;
export const RONDE_SEMUA_PE = RONDE_SEMUA_CE;
export const RONDE_TABEL_PE = RONDE_DES_PERS_CE;
export const RONDE_BENARSALAH_QE: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "0,75 = 75/100 = 75%.", benar: true, penjelasan: "Cara biasa buku." },
    { teks: "Persen selalu penyebut 10.", benar: false, penjelasan: "Persen = per seratus." },
    { teks: "Boleh langsung × 100% untuk desimal perseratusan.", benar: true, penjelasan: "Cara langsung." },
    { teks: "2,46 = 246%.", benar: true, penjelasan: "Contoh buku." },
  ],
  [
    { teks: "Geser koma dua kali ke kanan mengubah ke persen.", benar: true, penjelasan: "Tips buku." },
    { teks: "18% = 0,18.", benar: true, penjelasan: "Balik: bagi 100." },
    { teks: "20/50 = 20%.", benar: false, penjelasan: "20/50 = 40%." },
    { teks: "5% artinya 5/100.", benar: true, penjelasan: "Definisi persen." },
  ],
];
export const RONDE_DETEKTIF_QE: { klue: string[]; jawab: string; opsi: string[]; salah: string }[] = [
  { klue: ["Aku 0,75.", "Aku jadi persen dengan ×100%."], jawab: "75%", opsi: ["75%", "7,5%", "750%"], salah: "0,75 × 100% = 75%." },
  { klue: ["20 siswa olahraga dari 50.", "Samakan penyebut 100."], jawab: "40%", opsi: ["40%", "20%", "50%"], salah: "×2 → 40/100." },
  { klue: ["Aku simbol %.", "Aku pecahan berpenyebut 100."], jawab: "persen", opsi: ["persen", "persepuluhan", "desimal saja"], salah: "% = per seratus." },
  { klue: ["Aku 18%.", "Ubah ke desimal perseratusan."], jawab: "0,18", opsi: ["0,18", "1,8", "18"], salah: "Bagi 100 → 0,18." },
];
export const PETA_KONSEP_QE = [
  {
    pusat: "Persen",
    kotak: [
      { label: "Arti %", opsi: ["per seratus", "per sepuluh", "per seribu"], benar: 0 },
      { label: "Cara langsung", opsi: ["× 100%", "× 10%", "÷ 100"], benar: 0 },
      { label: "0,36", opsi: ["36%", "3,6%", "360%"], benar: 0 },
      { label: "Geser koma", opsi: ["dua kali ke kanan", "satu kali", "ke kiri"], benar: 0 },
    ],
  },
];
export const RONDE_CERITA_QE = RONDE_CERITA_CE;
