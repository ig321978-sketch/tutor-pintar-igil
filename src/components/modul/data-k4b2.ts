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
