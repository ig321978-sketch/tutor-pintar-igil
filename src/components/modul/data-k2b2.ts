/**
 * Data murni Matematika Kelas 2 Bab 2 (Penjumlahan dan Pengurangan): semua ronde permainan Sub-Bab A, B, dan C
 * beserta logika hitungnya (bersusun, pindah sepuluh, urai puluhan, pasangan bilangan, soal cerita).
 * Tanpa React dan tanpa impor, supaya bisa diuji di Node (scripts/uji-data-k2b2.mjs).
 * Semua bilangan tetap dalam jangkauan Bab 2: sampai 20.
 */

/* ------------------------------ Pembantu umum ----------------------------- */

export const puluhanDari = (n: number) => Math.floor(n / 10);
export const satuanDari = (n: number) => n % 10;

/** Tiga pilihan di sekitar kunci dalam batas. Urutan diputar menurut kunci supaya kunci tidak selalu di tengah. */
export function opsiB2(n: number, batas: [number, number] = [0, 20]): number[] {
  let mulai = n - 1;
  if (mulai < batas[0]) mulai = batas[0];
  if (mulai + 2 > batas[1]) mulai = batas[1] - 2;
  const dasar = [mulai, mulai + 1, mulai + 2];
  const putar = n % 3;
  return [...dasar.slice(putar), ...dasar.slice(0, putar)];
}

/** Urutan tetap (tanpa acak) untuk menukar letak kartu. Hasilnya permutasi dari 0 sampai n-1. */
export function urutanTetap(n: number, langkah = 3): number[] {
  const fpb = (x: number, y: number): number => (y === 0 ? x : fpb(y, x % y));
  let k = Math.max(1, langkah);
  while (fpb(n, k) !== 1) k += 1;
  return Array.from({ length: n }, (_, i) => (i * k) % n);
}

export type Dua = { a: number; b: number };

/* ====================================================================== */
/* SUB-BAB A. Berbagai cara melakukan penjumlahan                          */
/* ====================================================================== */

/** A1 Petik Jambu Air: keranjang berisi a, lalu b jambu dipetik. Menghitung maju. */
export const RONDE_PETIK_A: Dua[] = [
  { a: 12, b: 6 },
  { a: 14, b: 3 },
  { a: 15, b: 4 },
];

/** A2 Gabung Balok: satuan a dan b tidak melewati sembilan, jadi tanpa pindah. */
export const RONDE_GABUNG_A: Dua[] = [
  { a: 12, b: 6 },
  { a: 13, b: 5 },
  { a: 14, b: 3 },
];

/** A3 Mesin Pindah Sepuluh: satuan a ditambah b genap sepuluh. */
export const RONDE_PINDAH_A: Dua[] = [
  { a: 18, b: 2 },
  { a: 13, b: 7 },
  { a: 16, b: 4 },
];

/** A4 Neraca Jambu: x + y = z + ?  Bagian yang hilang adalah x + y - z. */
export type Neraca = { x: number; y: number; z: number };
export const RONDE_NERACA_A: Neraca[] = [
  { x: 8, y: 3, z: 5 },
  { x: 7, y: 5, z: 9 },
  { x: 6, y: 9, z: 10 },
];
export const bagianHilang = (r: Neraca) => r.x + r.y - r.z;

/** A5 Loncat di Jalur Bilangan. */
export const RONDE_LOMPAT_A: Dua[] = [
  { a: 12, b: 4 },
  { a: 15, b: 4 },
  { a: 11, b: 9 },
];
export const JALUR_A = { dari: 10, sampai: 20 };

/** A6 Susun ke Bawah. Ronde 3 memuat pindah sepuluh. */
export const RONDE_SUSUN_A: Dua[] = [
  { a: 14, b: 3 },
  { a: 13, b: 5 },
  { a: 13, b: 7 },
];

/** A7 Bagan Pasangan. */
export const RONDE_BAGAN_A: Dua[] = [
  { a: 14, b: 3 },
  { a: 11, b: 7 },
  { a: 16, b: 4 },
];

/** A8 Jodohkan Cara dan Langkah. */
export const RONDE_CARA_A: Dua[] = [
  { a: 12, b: 5 },
  { a: 11, b: 8 },
  { a: 15, b: 3 },
];

export type CaraTambah = "maju" | "susun" | "pasang";
export const NAMA_CARA_TAMBAH: Record<CaraTambah, string> = {
  maju: "Menghitung maju",
  susun: "Bersusun",
  pasang: "Pasangan bilangan",
};

/** Rangkaian langkah tiap cara, dalam lambang. Ketiganya berakhir pada a + b. */
export function langkahCaraTambah(cara: CaraTambah, a: number, b: number): string {
  const s = satuanDari(a);
  if (cara === "maju") {
    const daftar = Array.from({ length: b }, (_, i) => a + i + 1).join(", ");
    return `${a} → ${daftar}`;
  }
  if (cara === "susun") return `satuan ${s} + ${b} = ${s + b}, puluhan 1, hasil ${a + b}`;
  return `${a} = 10 + ${s}, ${s} + ${b} = ${s + b}, 10 + ${s + b} = ${a + b}`;
}

/** A9 Kartu Kembar: dua ronde, tiap ronde empat pasangan kalimat dengan hasil sama. Nilai tiap pasangan berbeda dalam satu ronde. */
export type PasanganKembar = [Dua, Dua];
export const RONDE_KEMBAR_A: PasanganKembar[][] = [
  [
    [{ a: 12, b: 6 }, { a: 10, b: 8 }],
    [{ a: 15, b: 4 }, { a: 13, b: 6 }],
    [{ a: 11, b: 9 }, { a: 13, b: 7 }],
    [{ a: 14, b: 3 }, { a: 12, b: 5 }],
  ],
  [
    [{ a: 10, b: 6 }, { a: 12, b: 4 }],
    [{ a: 13, b: 5 }, { a: 11, b: 7 }],
    [{ a: 8, b: 7 }, { a: 10, b: 5 }],
    [{ a: 6, b: 7 }, { a: 10, b: 3 }],
  ],
];

/** A10 Kanvas: ronde 1 tetap, ronde 2 anak memilih salah satu. */
export const TULIS_A_RONDE1: Dua = { a: 12, b: 6 };
export const TULIS_A_PILIHAN: Dua[] = [
  { a: 12, b: 5 },
  { a: 14, b: 4 },
  { a: 15, b: 3 },
];

/* ------------------- Logika penjumlahan bersusun ------------------------- */

export type LangkahSusunTambah = {
  satuanA: number;
  satuanB: number;
  jumlahSatuan: number;
  pindah: boolean;
  satuanHasil: number;
  puluhanA: number;
  puluhanB: number;
  jumlahPuluhan: number;
  hasil: number;
};

/** Penjumlahan bersusun a + b: satuan dulu, pindah 1 puluhan bila satuan genap sepuluh atau lebih, lalu puluhan. */
export function susunTambah(a: number, b: number): LangkahSusunTambah {
  const satuanA = satuanDari(a);
  const satuanB = satuanDari(b);
  const jumlahSatuan = satuanA + satuanB;
  const pindah = jumlahSatuan >= 10;
  const satuanHasil = jumlahSatuan % 10;
  const puluhanA = puluhanDari(a);
  const puluhanB = puluhanDari(b);
  const jumlahPuluhan = puluhanA + puluhanB + (pindah ? 1 : 0);
  return { satuanA, satuanB, jumlahSatuan, pindah, satuanHasil, puluhanA, puluhanB, jumlahPuluhan, hasil: jumlahPuluhan * 10 + satuanHasil };
}

export type LangkahSusunKurang = {
  satuanA: number;
  satuanB: number;
  urai: boolean;
  satuanAtas: number;
  satuanHasil: number;
  puluhanA: number;
  puluhanB: number;
  puluhanAtas: number;
  puluhanHasil: number;
  hasil: number;
};

/** Pengurangan bersusun a - b: urai 1 puluhan bila satuan atas lebih kecil dari satuan bawah. */
export function susunKurang(a: number, b: number): LangkahSusunKurang {
  const satuanA = satuanDari(a);
  const satuanB = satuanDari(b);
  const urai = satuanA < satuanB;
  const satuanAtas = urai ? satuanA + 10 : satuanA;
  const puluhanA = puluhanDari(a);
  const puluhanB = puluhanDari(b);
  const puluhanAtas = urai ? puluhanA - 1 : puluhanA;
  const satuanHasil = satuanAtas - satuanB;
  const puluhanHasil = puluhanAtas - puluhanB;
  return { satuanA, satuanB, urai, satuanAtas, satuanHasil, puluhanA, puluhanB, puluhanAtas, puluhanHasil, hasil: puluhanHasil * 10 + satuanHasil };
}

/* ------------------- Logika bagan pasangan (number bond) ----------------- */

export type LangkahBagan = {
  /** Teks pertanyaan yang dibacakan dan ditampilkan. */
  tanya: string;
  jawab: number;
  /** Bagian bagan yang diisi langkah ini. */
  bagian: "a" | "b" | "satuan" | "puluhan" | "hasil";
};

/** Bagan pasangan untuk penjumlahan a + b: a = 10 + satuan(a), jumlahkan satuan, lalu tambahkan sepuluh. */
export function langkahBaganTambah(a: number, b: number): LangkahBagan[] {
  const s = satuanDari(a);
  return [
    { tanya: `${a} dipisah menjadi 10 dan ...`, jawab: s, bagian: "a" },
    { tanya: `${s} + ${b} = ...`, jawab: s + b, bagian: "satuan" },
    { tanya: `10 + ${s + b} = ...`, jawab: 10 + s + b, bagian: "hasil" },
  ];
}

/** Bagan pasangan untuk pengurangan a - b, keduanya antara 10 dan 19. */
export function langkahBaganKurang(a: number, b: number): LangkahBagan[] {
  const x = satuanDari(a);
  const y = satuanDari(b);
  return [
    { tanya: `${a} dipisah menjadi 10 dan ...`, jawab: x, bagian: "a" },
    { tanya: `${b} dipisah menjadi 10 dan ...`, jawab: y, bagian: "b" },
    { tanya: "10 − 10 = ...", jawab: 0, bagian: "puluhan" },
    { tanya: `${x} − ${y} = ...`, jawab: x - y, bagian: "satuan" },
    { tanya: `${a} − ${b} = ...`, jawab: a - b, bagian: "hasil" },
  ];
}

/* ====================================================================== */
/* SUB-BAB B. Berbagai cara melakukan pengurangan                          */
/* ====================================================================== */

/** B1 Beri Jambu ke Lili: a jambu, b diberikan. */
export const RONDE_BERI_B: Dua[] = [
  { a: 15, b: 4 },
  { a: 19, b: 8 },
  { a: 18, b: 6 },
];

/** B2 Pasangkan Selisih: kelompok besar dan kecil. */
export type BesarKecil = { besar: number; kecil: number };
export const RONDE_SELISIH_B: BesarKecil[] = [
  { besar: 18, kecil: 12 },
  { besar: 15, kecil: 9 },
  { besar: 17, kecil: 13 },
];

/** B3 Urai Satu Puluhan. Ronde 3 tidak perlu urai. */
export const RONDE_URAI_B: Dua[] = [
  { a: 12, b: 8 },
  { a: 13, b: 5 },
  { a: 16, b: 4 },
];

/** B4 Tambah Sampai Pas: dari bilangan kecil sampai bilangan besar. */
export const RONDE_TAMBAHPAS_B: BesarKecil[] = [
  { kecil: 12, besar: 18 },
  { kecil: 9, besar: 15 },
  { kecil: 14, besar: 20 },
];

/** B5 Loncat Mundur. */
export const RONDE_MUNDUR_B: Dua[] = [
  { a: 12, b: 6 },
  { a: 15, b: 4 },
  { a: 20, b: 6 },
];
export const JALUR_B = { dari: 5, sampai: 20 };

/** B6 Susun Kurang. Ronde 1 tanpa urai, ronde 2 dan 3 perlu urai. */
export const RONDE_SUSUN_B: Dua[] = [
  { a: 14, b: 3 },
  { a: 13, b: 5 },
  { a: 13, b: 7 },
];

/** B7 Bagan Pasangan Kurang. */
export const RONDE_BAGAN_B: Dua[] = [
  { a: 19, b: 15 },
  { a: 17, b: 12 },
  { a: 16, b: 12 },
];

/** Satuan atas lebih kecil dari satuan bawah: perlu urai satu puluhan. */
export const perluUrai = (a: number, b: number) => satuanDari(a) < satuanDari(b);

/** B8 Perlu Urai atau Tidak: dua ronde, lima kalimat pengurangan. */
export const RONDE_SORT_B: Dua[][] = [
  [
    { a: 18, b: 12 },
    { a: 15, b: 4 },
    { a: 12, b: 8 },
    { a: 13, b: 5 },
    { a: 19, b: 8 },
  ],
  [
    { a: 20, b: 6 },
    { a: 17, b: 5 },
    { a: 16, b: 9 },
    { a: 14, b: 3 },
    { a: 11, b: 7 },
  ],
];

/** B9 Keluarga Bilangan: dua bagian dan satu keseluruhan (x + y = z). */
export const RONDE_KELUARGA_B: [number, number, number][] = [
  [6, 12, 18],
  [4, 9, 13],
  [8, 11, 19],
];

export type BarisKeluarga = { teks: string[]; kosong: number; jawab: number };

/** Empat kalimat keluarga bilangan dengan satu bagian kosong. teks berisi lima bagian: a, tanda, b, "=", c. Indeks kosong menunjuk bagian bilangan. */
export function barisKeluarga(x: number, y: number): BarisKeluarga[] {
  const z = x + y;
  return [
    { teks: [`${x}`, "+", `${y}`, "=", "?"], kosong: 4, jawab: z },
    { teks: ["?", "+", `${x}`, "=", `${z}`], kosong: 0, jawab: y },
    { teks: [`${z}`, "−", `${x}`, "=", "?"], kosong: 4, jawab: y },
    { teks: [`${z}`, "−", "?", "=", `${x}`], kosong: 2, jawab: y },
  ];
}

/** B10 Detektif Pengurangan. */
export type SoalDetektif = { petunjuk: string[]; opsi: number[]; jawab: number; salah: string };
export const RONDE_DETEKTIF_B: SoalDetektif[] = [
  {
    petunjuk: ["Kalau aku dikurangi 5, sisaku 12.", "Aku lebih kecil dari 20."],
    opsi: [7, 17, 19],
    jawab: 17,
    salah: "Balik kejadiannya. Sisa dua belas ditambah lima sama dengan tujuh belas. Tujuh belas lebih kecil dari dua puluh.",
  },
  {
    petunjuk: ["Selisihku dengan 12 adalah 6.", "Aku lebih besar dari 12."],
    opsi: [6, 18, 19],
    jawab: 18,
    salah: "Ada dua bilangan yang selisihnya enam dengan dua belas, yaitu enam dan delapan belas. Petunjuk kedua: aku lebih besar dari dua belas.",
  },
  {
    petunjuk: ["Dua puluh dikurangi aku sama dengan 14.", "Aku bilangan satuan."],
    opsi: [4, 6, 14],
    jawab: 6,
    salah: "Dua puluh dikurangi enam sama dengan empat belas. Periksa dengan tambah: empat belas ditambah enam sama dengan dua puluh.",
  },
  {
    petunjuk: ["Kalau aku ditambah 8, hasilnya 19.", "Aku lebih kecil dari 12."],
    opsi: [10, 11, 12],
    jawab: 11,
    salah: "Sembilan belas dikurangi delapan sama dengan sebelas. Sebelas lebih kecil dari dua belas.",
  },
];

/* ====================================================================== */
/* SUB-BAB C. Soal cerita penjumlahan dan pengurangan                      */
/* ====================================================================== */

/** C1 Burung Kata Kunci: hijau dan merah. */
export type Burung = { h: number; m: number };
export const RONDE_BURUNG_C: Burung[] = [
  { h: 4, m: 5 },
  { h: 3, m: 7 },
  { h: 6, m: 9 },
];
export type KataKunci = "lebihnya" | "kurangnya" | "selisih" | "jumlah";
export const URUTAN_KATA: KataKunci[] = ["lebihnya", "kurangnya", "selisih", "jumlah"];

/** Jawaban tiap kata kunci untuk burung hijau h dan merah m (m lebih banyak). */
export function jawabKataBurung(kata: KataKunci, r: Burung): number {
  if (kata === "jumlah") return r.h + r.m;
  return Math.abs(r.m - r.h);
}

export function tanyaKataBurung(kata: KataKunci, r: Burung): string {
  if (kata === "lebihnya") return `Burung merah lebihnya berapa dari burung hijau? (hijau ${r.h}, merah ${r.m})`;
  if (kata === "kurangnya") return `Burung hijau kurangnya berapa dari burung merah? (hijau ${r.h}, merah ${r.m})`;
  if (kata === "selisih") return `Berapa selisih burung hijau dan burung merah? (hijau ${r.h}, merah ${r.m})`;
  return `Berapa jumlah burung hijau dan burung merah? (hijau ${r.h}, merah ${r.m})`;
}

/** C2 Meja Donat dan C5 Model Batang: pembanding dibuat dari acuan a, selisih d, lebih atau kurang. */
export type Banding = { acuan: string; pembanding: string; benda: string; a: number; d: number; jenis: "lebih" | "kurang" };
export const bilanganPembanding = (r: Banding) => (r.jenis === "lebih" ? r.a + r.d : r.a - r.d);
export const jumlahBanding = (r: Banding) => r.a + bilanganPembanding(r);

export const RONDE_DONAT_C: Banding[] = [
  { acuan: "Tika", pembanding: "Malosi", benda: "donat", a: 12, d: 5, jenis: "kurang" },
  { acuan: "Kira", pembanding: "Upe", benda: "donat", a: 8, d: 4, jenis: "lebih" },
  { acuan: "Lili", pembanding: "Dodi", benda: "donat", a: 11, d: 6, jenis: "kurang" },
];

export const RONDE_MODEL_C: Banding[] = [
  { acuan: "Upe", pembanding: "Halim", benda: "donat", a: 8, d: 3, jenis: "lebih" },
  { acuan: "Lili", pembanding: "Tika", benda: "stiker", a: 13, d: 6, jenis: "kurang" },
  { acuan: "Dodi", pembanding: "Nia", benda: "kelereng", a: 7, d: 5, jenis: "lebih" },
];

/** C3 Keranjang Jeruk Halim: diberikan dan sisa. */
export type Jeruk = { diberi: number; sisa: number };
export const RONDE_JERUK_C: Jeruk[] = [
  { diberi: 4, sisa: 12 },
  { diberi: 3, sisa: 9 },
  { diberi: 5, sisa: 10 },
];
export const jerukSemula = (r: Jeruk) => r.sisa + r.diberi;

/** C4 Boneka Tiga Sahabat. */
export const RONDE_BONEKA_C: [number, number, number][] = [
  [5, 7, 8],
  [4, 9, 6],
  [3, 8, 7],
];
export const NAMA_BONEKA = ["Tika", "Kira", "Lili"];

/** Dua kelompok yang jumlahnya sepuluh, bila ada. Mengembalikan pasangan indeks. */
export function pasanganSepuluh(k: number[]): [number, number] | null {
  for (let i = 0; i < k.length; i += 1) for (let j = i + 1; j < k.length; j += 1) if (k[i] + k[j] === 10) return [i, j];
  return null;
}

/** C6 Susun Alur Penyelesaian: tiga soal, tiap soal empat kartu langkah dalam urutan yang benar. */
export type SoalAlur = { cerita: string; langkah: { nama: string; isi: string }[] };
export const RONDE_ALUR_C: SoalAlur[] = [
  {
    cerita: "Tika mempunyai 12 donat. Malosi mempunyai 5 kurangnya dari donat Tika. Berapa donat milik Malosi?",
    langkah: [
      { nama: "Diketahui", isi: "Tika 12 donat. Malosi 5 kurangnya dari Tika." },
      { nama: "Ditanya", isi: "Banyak donat Malosi." },
      { nama: "Solusi", isi: "12 − 5 = 7" },
      { nama: "Kesimpulan", isi: "Jadi, Malosi memiliki 7 donat." },
    ],
  },
  {
    cerita: "Halim memberikan 4 jeruk kepada Lili. Jeruk Halim tersisa 12 buah. Berapa jeruk Halim sebelumnya?",
    langkah: [
      { nama: "Diketahui", isi: "Diberikan 4 jeruk. Sisa 12 jeruk." },
      { nama: "Ditanya", isi: "Banyak jeruk Halim sebelumnya." },
      { nama: "Solusi", isi: "… − 4 = 12, maka 12 + 4 = 16" },
      { nama: "Kesimpulan", isi: "Jadi, jeruk Halim sebelumnya 16 buah." },
    ],
  },
  {
    cerita: "Tika membawa 5 boneka, Kira 7 boneka, dan Lili 8 boneka. Berapa jumlah semua boneka?",
    langkah: [
      { nama: "Diketahui", isi: "Tika 5, Kira 7, Lili 8 boneka." },
      { nama: "Ditanya", isi: "Jumlah semua boneka." },
      { nama: "Solusi", isi: "5 + 7 = 12, lalu 12 + 8 = 20" },
      { nama: "Kesimpulan", isi: "Jadi, jumlah semua boneka 20 buah." },
    ],
  },
];
/** Urutan kartu teracak (tetap) untuk tiap soal alur. Menunjuk indeks langkah. */
export const URUTAN_KARTU_ALUR: number[][] = [
  [2, 0, 3, 1],
  [3, 1, 0, 2],
  [1, 3, 2, 0],
];

/** C7 Panah di Jalur Bilangan. */
export type SoalPanah = { cerita: string; arah: "maju" | "mundur"; mulai: number; langkah: number; dari: number; sampai: number; petunjuk: string };
export const RONDE_PANAH_C: SoalPanah[] = [
  {
    cerita: "Kira punya 14 stiker. Ia mendapat 5 stiker lagi. Berapa stiker Kira sekarang?",
    arah: "maju",
    mulai: 14,
    langkah: 5,
    dari: 13,
    sampai: 20,
    petunjuk: "Mendapat lagi berarti bertambah, jadi lompat maju.",
  },
  {
    cerita: "Ada 18 kue di meja. Kue yang dimakan ada 6. Berapa kue yang tersisa?",
    arah: "mundur",
    mulai: 18,
    langkah: 6,
    dari: 10,
    sampai: 19,
    petunjuk: "Dimakan berarti berkurang, jadi lompat mundur.",
  },
  {
    cerita: "Upe punya 9 kelereng. Kelereng Halim 7 lebihnya dari kelereng Upe. Berapa kelereng Halim?",
    arah: "maju",
    mulai: 9,
    langkah: 7,
    dari: 8,
    sampai: 17,
    petunjuk: "Halim punya lebih banyak dari Upe, jadi lompat maju dari bilangan Upe.",
  },
];
export const hasilPanah = (s: SoalPanah) => (s.arah === "maju" ? s.mulai + s.langkah : s.mulai - s.langkah);

/** C8 Kata Kunci Jadi Tanda: dua ronde, empat kalimat. kunci kata pendek untuk disorot. */
export type KartuKata = { teks: string; sorot: string; tanda: "+" | "−"; alasan: string };
export const RONDE_KATA_C: KartuKata[][] = [
  [
    { teks: "Kira memetik 6 lebih banyak dari Tika. Cari milik Kira.", sorot: "lebih banyak", tanda: "+", alasan: "Kira punya lebih banyak, jadi bilangan Tika ditambah 6." },
    { teks: "Malosi punya 5 kurangnya dari Tika. Cari milik Malosi.", sorot: "kurangnya", tanda: "−", alasan: "Malosi punya lebih sedikit, jadi bilangan Tika dikurangi 5." },
    { teks: "Cari selisih jambu air Tika dan Kira.", sorot: "selisih", tanda: "−", alasan: "Selisih adalah bilangan besar dikurangi bilangan kecil." },
    { teks: "Cari jumlah jambu air Tika dan Kira.", sorot: "jumlah", tanda: "+", alasan: "Jumlah berarti semuanya digabung, jadi menambah." },
  ],
  [
    { teks: "Ibu memberi 3 kue lagi.", sorot: "lagi", tanda: "+", alasan: "Kue bertambah, jadi menambah." },
    { teks: "Adik memakan 4 kue.", sorot: "memakan", tanda: "−", alasan: "Kue berkurang, jadi mengurangi." },
    { teks: "Semua kue digabung di satu piring.", sorot: "digabung", tanda: "+", alasan: "Digabung berarti menambah." },
    { teks: "Cari sisa kue setelah dibagikan.", sorot: "sisa", tanda: "−", alasan: "Sisa berarti yang tertinggal, jadi mengurangi." },
  ],
];

/** C9 Laporan Detektif Cerita: tiga soal, tiap soal empat langkah pilihan ganda. Kunci selalu opsi pertama sebelum diacak. */
export type LangkahLaporan = { nama: string; opsi: string[]; benar: number; salah: string };
export type SoalLaporan = { cerita: string; langkah: LangkahLaporan[]; hasil: number };
export const RONDE_LAPORAN_C: SoalLaporan[] = [
  {
    cerita: "Di toko mainan, ada 6 mainan pesawat dan 13 mobil-mobilan. Berapa selisih banyak mainan pesawat dan mobil-mobilan?",
    hasil: 7,
    langkah: [
      { nama: "Diketahui", opsi: ["6 pesawat dan 13 mobil-mobilan", "13 pesawat dan 6 mobil-mobilan", "6 pesawat saja"], benar: 0, salah: "Baca lagi soalnya. Pesawat ada 6 dan mobil-mobilan ada 13." },
      { nama: "Ditanya", opsi: ["selisih pesawat dan mobil-mobilan", "jumlah semua mainan", "banyak pesawat"], benar: 0, salah: "Lihat kalimat pertanyaan di akhir soal. Yang dicari adalah selisih." },
      { nama: "Solusi", opsi: ["13 − 6 = 7", "13 + 6 = 19", "13 − 6 = 8"], benar: 0, salah: "Selisih berarti bilangan besar dikurangi bilangan kecil. Hitung lagi dengan teliti." },
      { nama: "Kesimpulan", opsi: ["Jadi, selisihnya 7 mainan.", "Jadi, selisihnya 19 mainan.", "Jadi, selisihnya 6 mainan."], benar: 0, salah: "Kesimpulan harus memakai hasil hitunganmu, yaitu 7." },
    ],
  },
  {
    cerita: "Ada 8 kupu-kupu di atas bunga, 6 di atas daun, dan 4 di rumput. Berapa jumlah seluruh kupu-kupu?",
    hasil: 18,
    langkah: [
      { nama: "Diketahui", opsi: ["8 di bunga, 6 di daun, 4 di rumput", "8 di bunga dan 6 di daun saja", "4 di bunga, 6 di daun, 8 di rumput"], benar: 0, salah: "Ada tiga tempat. Cocokkan bilangan dengan tempatnya." },
      { nama: "Ditanya", opsi: ["jumlah seluruh kupu-kupu", "selisih kupu-kupu di bunga dan daun", "kupu-kupu di rumput"], benar: 0, salah: "Yang ditanya adalah jumlah seluruhnya." },
      { nama: "Solusi", opsi: ["8 + 6 = 14, lalu 14 + 4 = 18", "8 + 6 = 14, lalu 14 − 4 = 10", "8 − 6 = 2, lalu 2 + 4 = 6"], benar: 0, salah: "Jumlah seluruhnya berarti ketiganya ditambah, dua dulu lalu yang ketiga." },
      { nama: "Kesimpulan", opsi: ["Jadi, jumlah seluruh kupu-kupu 18 ekor.", "Jadi, jumlah seluruh kupu-kupu 10 ekor.", "Jadi, jumlah seluruh kupu-kupu 14 ekor."], benar: 0, salah: "Kesimpulan memakai hasil akhir, yaitu 18." },
    ],
  },
  {
    cerita: "Upe mempunyai 11 kelereng. Kelereng Upe 3 lebihnya dari kelereng Halim. Berapa kelereng Halim?",
    hasil: 8,
    langkah: [
      { nama: "Diketahui", opsi: ["Upe 11 kelereng, Upe 3 lebihnya dari Halim", "Halim 11 kelereng, Halim 3 lebihnya dari Upe", "Upe 3 kelereng"], benar: 0, salah: "Siapa yang punya 11? Upe. Upe punya lebih banyak dari Halim." },
      { nama: "Ditanya", opsi: ["banyak kelereng Halim", "banyak kelereng Upe", "jumlah kelereng Upe dan Halim"], benar: 0, salah: "Yang dicari adalah kelereng Halim." },
      { nama: "Solusi", opsi: ["11 − 3 = 8", "11 + 3 = 14", "11 − 3 = 7"], benar: 0, salah: "Awas jebakan kata lebihnya! Upe punya lebih banyak, jadi milik Halim lebih sedikit. Kita kurangi." },
      { nama: "Kesimpulan", opsi: ["Jadi, kelereng Halim ada 8 butir.", "Jadi, kelereng Halim ada 14 butir.", "Jadi, kelereng Halim ada 3 butir."], benar: 0, salah: "Kesimpulan memakai hasil hitunganmu, yaitu 8." },
    ],
  },
];
/** Posisi kunci pada tiap langkah setelah diputar, supaya kunci tidak selalu di atas. */
export const putarOpsi = (i: number, panjang: number) => i % panjang;

/** C10 Pencipta Soal Cerita. */
export const TOKOH_C = ["Tika", "Kira", "Malosi", "Upe", "Lili", "Halim"];
export const BENDA_C = ["donat", "jeruk", "boneka", "kelereng", "jambu air", "stiker"];
export type JenisCerita = "tambah" | "kurang";
export type PilihanCerita = { jenis: JenisCerita; tokohA: string; tokohB: string; benda: string; n: number; m: number };
export const BATAS_CERITA = { n: [5, 15] as [number, number], m: [1, 9] as [number, number], maks: 20 };

export function cerita(p: PilihanCerita) {
  const hasil = p.jenis === "tambah" ? p.n + p.m : p.n - p.m;
  const kata = p.jenis === "tambah" ? "lebihnya" : "kurangnya";
  const tanda = p.jenis === "tambah" ? "+" : "−";
  const alasan: string[] = [];
  if (p.tokohA === p.tokohB) alasan.push("Pilih dua tokoh yang berbeda.");
  if (p.jenis === "tambah" && p.n + p.m > BATAS_CERITA.maks) alasan.push("Hasilnya lebih dari 20. Kecilkan salah satu bilangan.");
  if (p.jenis === "kurang" && p.m >= p.n) alasan.push("Bilangan kurangnya harus lebih kecil dari bilangan pertama.");
  return {
    valid: alasan.length === 0,
    alasan,
    teks: `${p.tokohA} punya ${p.n} ${p.benda}. ${p.tokohB} punya ${p.m} ${kata} dari ${p.benda} milik ${p.tokohA}. Berapa ${p.benda} milik ${p.tokohB}?`,
    diketahui: `${p.tokohA} punya ${p.n} ${p.benda}. ${p.tokohB} punya ${p.m} ${kata}.`,
    ditanya: `Banyak ${p.benda} milik ${p.tokohB}.`,
    solusi: `${p.n} ${tanda} ${p.m} = ${hasil}`,
    jadi: `Jadi, ${p.tokohB} memiliki ${hasil} ${p.benda}.`,
    hasil,
  };
}

export const AWAL_CERITA: PilihanCerita[] = [
  { jenis: "tambah", tokohA: "Tika", tokohB: "Kira", benda: "donat", n: 9, m: 4 },
  { jenis: "kurang", tokohA: "Malosi", tokohB: "Upe", benda: "kelereng", n: 12, m: 5 },
];
