/**
 * Data murni dan mesin pemeriksa Matematika Kelas 2 Bab 4 (Posisi Benda dan Pola di Sekitar Kita).
 * Tanpa React dan tanpa impor nilai dari berkas lain, supaya bisa diuji langsung di Node (scripts/uji-data-k2b4.mjs).
 *
 * Sub-Bab A (Posisi Benda): relasi atas, bawah, depan, belakang, kanan, kiri dihitung dari koordinat benda,
 * sehingga gambar dan kunci selalu sama. Sub-Bab B (Pola): pola dicari dari satuan terpendek yang berulang.
 * Tidak ada acak: semua urutan tetap (aman untuk render server).
 */

/* ====================================================================== */
/* Kata posisi dan benda                                                    */
/* ====================================================================== */

export type KataPosisi = "atas" | "bawah" | "depan" | "belakang" | "kanan" | "kiri";
export const KATA_POSISI: KataPosisi[] = ["atas", "bawah", "depan", "belakang", "kanan", "kiri"];
export const LAWAN: Record<KataPosisi, KataPosisi> = { atas: "bawah", bawah: "atas", depan: "belakang", belakang: "depan", kanan: "kiri", kiri: "kanan" };

export type BendaId =
  | "meja" | "kursi" | "kotak" | "bola" | "buku" | "pensil" | "boneka" | "kucing" | "burung" | "ulat" | "kupu" | "bunga"
  | "rumput" | "pohon" | "kelinci" | "tempatTidur" | "sepatu" | "tas" | "mobil" | "ayam" | "lemari" | "jam";

export const NAMA_BENDA: Record<BendaId, string> = {
  meja: "meja", kursi: "kursi", kotak: "kotak", bola: "bola", buku: "buku", pensil: "pensil", boneka: "boneka", kucing: "kucing",
  burung: "burung", ulat: "ulat", kupu: "kupu-kupu", bunga: "bunga", rumput: "rumput", pohon: "pohon", kelinci: "kelinci",
  tempatTidur: "tempat tidur", sepatu: "sepatu", tas: "tas", mobil: "mobil-mobilan", ayam: "ayam", lemari: "lemari", jam: "jam",
};

/** Kalimat posisi baku: "<benda> di <kata> <acuan>". Kanan dan kiri memakai "di sebelah". */
export function kalimatPosisi(benda: string, kata: KataPosisi, acuan: string): string {
  const depan = kata === "kanan" || kata === "kiri" ? `di sebelah ${kata}` : `di ${kata}`;
  return `${benda} ${depan} ${acuan}`;
}

/** Bagian "di sebelah kiri" atau "di atas" saja. */
export const frasaPosisi = (kata: KataPosisi): string => (kata === "kanan" || kata === "kiri" ? `di sebelah ${kata}` : `di ${kata}`);

/* ====================================================================== */
/* Relasi posisi dari koordinat (kotak gambar 100 x 75)                      */
/* ====================================================================== */

export type ObjekPetak = { id: BendaId; x: number; y: number; w: number; h: number; z: number };

const tumpang = (a0: number, a1: number, b0: number, b1: number) => Math.min(a1, b1) - Math.max(a0, b0);

/**
 * Kata posisi benda `a` terhadap benda `b`. Atas dan bawah: bersandar (celah paling banyak 3) dan saling menumpang
 * secara mendatar. Kiri dan kanan: bersebelahan (celah paling banyak 6) dan saling menumpang secara tegak lebih dari separuh tinggi benda yang lebih pendek. Depan dan
 * belakang: selisih lapis tepat 1, menumpang mendatar, dan dasar benda depan tidak lebih tinggi dari dasar benda belakang.
 */
export function relasi(a: ObjekPetak, b: ObjekPetak): KataPosisi[] {
  const hasil: KataPosisi[] = [];
  const ox = tumpang(a.x, a.x + a.w, b.x, b.x + b.w);
  const oy = tumpang(a.y, a.y + a.h, b.y, b.y + b.h);
  const sama = a.z === b.z;
  if (sama && ox > 0 && a.y + a.h <= b.y + 1 && b.y - (a.y + a.h) <= 3) hasil.push("atas");
  if (sama && ox > 0 && a.y >= b.y + b.h - 1 && a.y - (b.y + b.h) <= 3) hasil.push("bawah");
  const oyCukup = oy > 0.5 * Math.min(a.h, b.h);
  if (sama && oyCukup && a.x + a.w <= b.x + 1 && b.x - (a.x + a.w) <= 6) hasil.push("kiri");
  if (sama && oyCukup && a.x >= b.x + b.w - 1 && a.x - (b.x + b.w) <= 6) hasil.push("kanan");
  if (a.z === b.z + 1 && ox > 0 && a.y + a.h >= b.y + b.h) hasil.push("depan");
  if (a.z === b.z - 1 && ox > 0 && a.y + a.h <= b.y + b.h) hasil.push("belakang");
  return hasil;
}

/** Benda yang berada pada posisi `kata` terhadap `acuan` di dalam satu pemandangan. */
export function benda_yang_di(objek: readonly ObjekPetak[], acuan: BendaId, kata: KataPosisi): BendaId[] {
  const b = objek.find((o) => o.id === acuan);
  if (!b) return [];
  return objek.filter((o) => o.id !== acuan && relasi(o, b).includes(kata)).map((o) => o.id);
}

/* ------------------------------ Kamar (A3 Temukan di Kamar) ------------------------------ */

/** Kamar: tempat tidur, meja belajar, kursi, kotak, benda di atas dan di bawahnya, mobil-mobilan dan bola di depan. */
export const KAMAR: ObjekPetak[] = [
  { id: "tempatTidur", x: 58, y: 34, w: 38, h: 20, z: 1 },
  { id: "boneka", x: 64, y: 26, w: 9, h: 8, z: 1 },
  { id: "sepatu", x: 66, y: 54, w: 12, h: 6, z: 1 },
  { id: "meja", x: 6, y: 34, w: 26, h: 20, z: 1 },
  { id: "buku", x: 10, y: 29, w: 9, h: 5, z: 1 },
  { id: "kursi", x: 36, y: 38, w: 10, h: 18, z: 1 },
  { id: "tas", x: 37, y: 30, w: 8, h: 8, z: 1 },
  { id: "kotak", x: 47, y: 46, w: 9, h: 9, z: 1 },
  { id: "mobil", x: 20, y: 60, w: 11, h: 7, z: 2 },
  { id: "bola", x: 22, y: 68, w: 7, h: 7, z: 3 },
];

export type SoalKamar = { acuan: BendaId; kata: KataPosisi; jawab: BendaId };
export const RONDE_KAMAR_A: SoalKamar[][] = [
  [
    { acuan: "tempatTidur", kata: "bawah", jawab: "sepatu" },
    { acuan: "tempatTidur", kata: "atas", jawab: "boneka" },
    { acuan: "tempatTidur", kata: "kiri", jawab: "kotak" },
  ],
  [
    { acuan: "kursi", kata: "atas", jawab: "tas" },
    { acuan: "kursi", kata: "kanan", jawab: "kotak" },
    { acuan: "kursi", kata: "kiri", jawab: "meja" },
  ],
  [
    { acuan: "meja", kata: "atas", jawab: "buku" },
    { acuan: "meja", kata: "depan", jawab: "mobil" },
    { acuan: "meja", kata: "kanan", jawab: "kursi" },
  ],
  [
    { acuan: "mobil", kata: "depan", jawab: "bola" },
    { acuan: "mobil", kata: "belakang", jawab: "meja" },
    { acuan: "sepatu", kata: "atas", jawab: "tempatTidur" },
  ],
];

/* ====================================================================== */
/* Panggung posisi (A1, A2, A4): seret benda ke zona di sekitar benda acuan  */
/* ====================================================================== */

export type LapisZona = "belakang" | "biasa" | "depan";
export type ZonaPosisi = { id: string; kata: KataPosisi; x: number; y: number; skala: number; lapis: LapisZona };

/**
 * Enam zona di sekeliling benda acuan (kotak gambar 100 x 75). Atas: di atas benda acuan. Bawah: di bawahnya.
 * Kiri dan kanan: di sampingnya. Depan: menutupi bagian bawah (lebih dekat ke kita). Belakang: tertutup benda acuan.
 */
export const ZONA_ACUAN: ZonaPosisi[] = [
  { id: "atas", kata: "atas", x: 50, y: 11, skala: 1, lapis: "biasa" },
  { id: "bawah", kata: "bawah", x: 50, y: 64, skala: 1, lapis: "biasa" },
  { id: "kiri", kata: "kiri", x: 13, y: 38, skala: 1, lapis: "biasa" },
  { id: "kanan", kata: "kanan", x: 87, y: 38, skala: 1, lapis: "biasa" },
  { id: "depan", kata: "depan", x: 58, y: 47, skala: 1.15, lapis: "depan" },
  { id: "belakang", kata: "belakang", x: 43, y: 33, skala: 0.8, lapis: "belakang" },
];

export type TugasPosisi = { benda: BendaId; kata: KataPosisi; acuan: BendaId };
export type RondePanggung = { acuan: BendaId; tugas: TugasPosisi[] };

/** A1 Taruh di Tempatnya: tiga benda berbeda tiap ronde, satu kata posisi tiap benda. */
export const RONDE_TARUH_A: RondePanggung[] = [
  {
    acuan: "kotak",
    tugas: [
      { benda: "bola", kata: "atas", acuan: "kotak" },
      { benda: "kucing", kata: "kiri", acuan: "kotak" },
      { benda: "buku", kata: "depan", acuan: "kotak" },
    ],
  },
  {
    acuan: "meja",
    tugas: [
      { benda: "boneka", kata: "kanan", acuan: "meja" },
      { benda: "sepatu", kata: "bawah", acuan: "meja" },
      { benda: "tas", kata: "belakang", acuan: "meja" },
    ],
  },
  {
    acuan: "kursi",
    tugas: [
      { benda: "kucing", kata: "bawah", acuan: "kursi" },
      { benda: "bola", kata: "belakang", acuan: "kursi" },
      { benda: "boneka", kata: "atas", acuan: "kursi" },
      { benda: "buku", kata: "kanan", acuan: "kursi" },
    ],
  },
  {
    acuan: "pohon",
    tugas: [
      { benda: "burung", kata: "atas", acuan: "pohon" },
      { benda: "kelinci", kata: "kanan", acuan: "pohon" },
      { benda: "bola", kata: "kiri", acuan: "pohon" },
      { benda: "ayam", kata: "depan", acuan: "pohon" },
    ],
  },
];

/** A2 Pindahkan Buku: satu benda dipindah beberapa kali, lalu ditanya posisi akhirnya. */
export type RondePindah = { benda: BendaId; acuan: BendaId; langkah: KataPosisi[] };
export const RONDE_PINDAH_A: RondePindah[] = [
  { benda: "buku", acuan: "meja", langkah: ["atas", "depan", "kanan", "bawah"] },
  { benda: "pensil", acuan: "kursi", langkah: ["atas", "bawah", "kanan", "kiri"] },
  { benda: "bola", acuan: "kotak", langkah: ["kiri", "atas", "belakang"] },
];

/** A4 Tempel Stiker di Taman: enam stiker, enam petunjuk. Acuannya Kira dan pohon. */
export type StikerTaman = { id: string; benda: BendaId | "halim" | "deretanBunga"; acuan: "kira" | "pohon"; kata: KataPosisi; kalimat: string };
export const STIKER_TAMAN_A: StikerTaman[] = [
  { id: "s1", benda: "kupu", acuan: "kira", kata: "depan", kalimat: "Kupu-kupu terbang di depan Kira." },
  { id: "s2", benda: "kelinci", acuan: "pohon", kata: "kanan", kalimat: "Kelinci ada di sebelah kanan pohon." },
  { id: "s3", benda: "burung", acuan: "pohon", kata: "atas", kalimat: "Burung terbang di atas pohon." },
  { id: "s4", benda: "bola", acuan: "pohon", kata: "kiri", kalimat: "Bola ada di sebelah kiri pohon." },
  { id: "s5", benda: "halim", acuan: "kira", kata: "belakang", kalimat: "Halim berlari di belakang Kira." },
  { id: "s6", benda: "deretanBunga", acuan: "kira", kata: "depan", kalimat: "Deretan bunga ada di depan Kira." },
];

/* ====================================================================== */
/* Peta kotak 3 x 3 (A5, A7, A9)                                            */
/* ====================================================================== */

export type Sel = { b: number; k: number };
export const selSama = (a: Sel, b: Sel) => a.b === b.b && a.k === b.k;

/** Sel yang berada pada posisi `kata` terhadap `acuan`, bersebelahan. Depan dan belakang tidak ada di peta datar. */
export function selDi(acuan: Sel, kata: KataPosisi, ukuran = 3): Sel | null {
  const geser: Partial<Record<KataPosisi, [number, number]>> = { atas: [-1, 0], bawah: [1, 0], kiri: [0, -1], kanan: [0, 1] };
  const g = geser[kata];
  if (!g) return null;
  const s = { b: acuan.b + g[0], k: acuan.k + g[1] };
  return s.b >= 0 && s.b < ukuran && s.k >= 0 && s.k < ukuran ? s : null;
}

export type SoalPeta = { kata: KataPosisi };
export type RondePeta = { acuan: Sel; soal: SoalPeta[] };
export const RONDE_PETA_A: RondePeta[] = [
  { acuan: { b: 1, k: 1 }, soal: [{ kata: "atas" }, { kata: "kiri" }, { kata: "bawah" }, { kata: "kanan" }] },
  { acuan: { b: 0, k: 0 }, soal: [{ kata: "kanan" }, { kata: "bawah" }] },
  { acuan: { b: 2, k: 1 }, soal: [{ kata: "atas" }, { kata: "kiri" }, { kata: "kanan" }] },
  { acuan: { b: 1, k: 2 }, soal: [{ kata: "kiri" }, { kata: "atas" }, { kata: "bawah" }] },
];

/* ====================================================================== */
/* Pilih kata untuk diagram dua bangun (A6)                                  */
/* ====================================================================== */

export type KotakB = { x: number; y: number; w: number; h: number };
export type ItemDiagram = { ref: KotakB; tgt: { cx: number; cy: number; r: number }; lapis: "depan" | "belakang" | null; jawab: KataPosisi };

/** Kata posisi lingkaran terhadap persegi, dihitung dari koordinat. Hasil null bila tidak jelas. */
export function kataDiagram(d: Pick<ItemDiagram, "ref" | "tgt" | "lapis">): KataPosisi | null {
  const { ref, tgt, lapis } = d;
  const kiri = tgt.cx - tgt.r;
  const kanan = tgt.cx + tgt.r;
  const atas = tgt.cy - tgt.r;
  const bawah = tgt.cy + tgt.r;
  const menumpang = kanan > ref.x && kiri < ref.x + ref.w && bawah > ref.y && atas < ref.y + ref.h;
  if (menumpang) return lapis;
  if (bawah <= ref.y) return "atas";
  if (atas >= ref.y + ref.h) return "bawah";
  if (kanan <= ref.x) return "kiri";
  if (kiri >= ref.x + ref.w) return "kanan";
  return null;
}

const R1: KotakB = { x: 38, y: 34, w: 28, h: 28 };
export const RONDE_DIAGRAM_A: ItemDiagram[][] = [
  [
    { ref: R1, tgt: { cx: 52, cy: 17, r: 9 }, lapis: null, jawab: "atas" },
    { ref: R1, tgt: { cx: 52, cy: 80, r: 9 }, lapis: null, jawab: "bawah" },
    { ref: R1, tgt: { cx: 20, cy: 48, r: 9 }, lapis: null, jawab: "kiri" },
    { ref: R1, tgt: { cx: 84, cy: 48, r: 9 }, lapis: null, jawab: "kanan" },
  ],
  [
    { ref: R1, tgt: { cx: 84, cy: 48, r: 9 }, lapis: null, jawab: "kanan" },
    { ref: R1, tgt: { cx: 56, cy: 54, r: 10 }, lapis: "depan", jawab: "depan" },
    { ref: R1, tgt: { cx: 20, cy: 48, r: 9 }, lapis: null, jawab: "kiri" },
    { ref: R1, tgt: { cx: 48, cy: 42, r: 10 }, lapis: "belakang", jawab: "belakang" },
  ],
  [
    { ref: R1, tgt: { cx: 52, cy: 80, r: 9 }, lapis: null, jawab: "bawah" },
    { ref: R1, tgt: { cx: 48, cy: 42, r: 10 }, lapis: "belakang", jawab: "belakang" },
    { ref: R1, tgt: { cx: 52, cy: 17, r: 9 }, lapis: null, jawab: "atas" },
    { ref: R1, tgt: { cx: 56, cy: 54, r: 10 }, lapis: "depan", jawab: "depan" },
  ],
];

/** Urutan tampil tiga kata untuk satu pilihan: kunci tidak selalu di tempat yang sama. */
export function pilihanKata(jawab: KataPosisi, nomor: number): KataPosisi[] {
  const lain = KATA_POSISI.filter((k) => k !== jawab && k !== LAWAN[jawab]);
  const pengecoh = [LAWAN[jawab], lain[nomor % lain.length]];
  const semua: KataPosisi[] = [jawab, pengecoh[0], pengecoh[1]];
  const putar = nomor % 3;
  return [0, 1, 2].map((i) => semua[(i + putar) % 3]);
}

/* ====================================================================== */
/* Susun bangun di petak (A7)                                                */
/* ====================================================================== */

export type BangunId = "segitiga" | "persegi" | "lingkaran" | "bintang" | "hati";
export const NAMA_BANGUN: Record<BangunId, string> = { segitiga: "segitiga", persegi: "persegi", lingkaran: "lingkaran", bintang: "bintang", hati: "bentuk hati" };
export type SyaratBangun = { a: BangunId; kata: KataPosisi; b: BangunId };
export type RondeSusun = { bangun: BangunId[]; syarat: SyaratBangun[] };

export const RONDE_SUSUN_A: RondeSusun[] = [
  { bangun: ["segitiga", "persegi", "lingkaran"], syarat: [{ a: "segitiga", kata: "kiri", b: "persegi" }, { a: "lingkaran", kata: "atas", b: "persegi" }] },
  { bangun: ["bintang", "persegi", "hati"], syarat: [{ a: "bintang", kata: "bawah", b: "persegi" }, { a: "hati", kata: "kanan", b: "persegi" }] },
  { bangun: ["lingkaran", "segitiga", "bintang", "hati"], syarat: [{ a: "lingkaran", kata: "kanan", b: "segitiga" }, { a: "bintang", kata: "atas", b: "segitiga" }, { a: "hati", kata: "bawah", b: "lingkaran" }] },
];

/** Periksa penempatan: bangun -> sel. Semua bangun harus ada di sel berbeda dan semua syarat terpenuhi. */
export function periksaSusunan(r: RondeSusun, tempat: Partial<Record<BangunId, Sel>>): { sah: boolean; gagal: SyaratBangun | null } {
  const sel = r.bangun.map((b) => tempat[b]);
  if (sel.some((s) => !s)) return { sah: false, gagal: null };
  const unik = new Set(sel.map((s) => `${s!.b}-${s!.k}`));
  if (unik.size !== r.bangun.length) return { sah: false, gagal: null };
  for (const s of r.syarat) {
    const ref = tempat[s.b]!;
    const dituju = selDi(ref, s.kata);
    if (!dituju || !selSama(dituju, tempat[s.a]!)) return { sah: false, gagal: s };
  }
  return { sah: true, gagal: null };
}

/** Satu susunan yang memenuhi semua syarat (dipakai uji dan petunjuk). */
export function cariSusunan(r: RondeSusun, ukuran = 3): Partial<Record<BangunId, Sel>> | null {
  const semuaSel: Sel[] = [];
  for (let b = 0; b < ukuran; b += 1) for (let k = 0; k < ukuran; k += 1) semuaSel.push({ b, k });
  const tempat: Partial<Record<BangunId, Sel>> = {};
  const pakai = new Set<string>();
  const coba = (i: number): boolean => {
    if (i === r.bangun.length) return periksaSusunan(r, tempat).sah;
    for (const s of semuaSel) {
      const kunci = `${s.b}-${s.k}`;
      if (pakai.has(kunci)) continue;
      pakai.add(kunci);
      tempat[r.bangun[i]] = s;
      if (coba(i + 1)) return true;
      pakai.delete(kunci);
      delete tempat[r.bangun[i]];
    }
    return false;
  };
  return coba(0) ? { ...tempat } : null;
}

/* ====================================================================== */
/* Lengkapi kalimat dengan lawan kata (A8)                                  */
/* ====================================================================== */

export type KalimatIsian = { depan: string; belakang: string; opsi: string[]; benar: number };
export const RONDE_KALIMAT_A: KalimatIsian[][] = [
  [
    { depan: "Bola ada di atas meja, jadi meja ada di", belakang: "bola.", opsi: ["bawah", "atas", "kanan"], benar: 0 },
    { depan: "Kupu-kupu hinggap di atas bunga. Bunga ada di", belakang: "kupu-kupu.", opsi: ["depan", "bawah", "kiri"], benar: 1 },
    { depan: "Burung berjalan di depan ulat. Ulat bergerak di", belakang: "burung.", opsi: ["belakang", "depan", "atas"], benar: 0 },
  ],
  [
    { depan: "Burung berdiri di sebelah kiri rumput. Rumput ada di sebelah", belakang: "burung.", opsi: ["kiri", "bawah", "kanan"], benar: 2 },
    { depan: "Kucing duduk di bawah meja. Meja ada di", belakang: "kucing.", opsi: ["atas", "belakang", "kiri"], benar: 0 },
    { depan: "Kata yang berlawanan dengan depan adalah", belakang: ".", opsi: ["atas", "kanan", "belakang"], benar: 2 },
  ],
];

/* ====================================================================== */
/* Tebak aku apa (A9): kotak kata 3 x 3                                      */
/* ====================================================================== */

export type PetunjukTebak = { kata: KataPosisi; acuan: string };
export type SoalTebak = { grid: (string | null)[][]; petunjuk: PetunjukTebak[]; opsi: string[]; jawab: string };

/** Nama yang cocok dengan semua petunjuk: nama itu berada pada posisi `kata` terhadap tiap acuan. */
export function kandidatTebak(grid: (string | null)[][], petunjuk: readonly PetunjukTebak[]): string[] {
  const letak = (nama: string): Sel | null => {
    for (let b = 0; b < grid.length; b += 1) for (let k = 0; k < grid[b].length; k += 1) if (grid[b][k] === nama) return { b, k };
    return null;
  };
  const hasil: string[] = [];
  for (let b = 0; b < grid.length; b += 1) {
    for (let k = 0; k < grid[b].length; k += 1) {
      const nama = grid[b][k];
      if (!nama) continue;
      const ok = petunjuk.every((p) => {
        const ref = letak(p.acuan);
        if (!ref) return false;
        // "Aku di atas X": sel milikku berada tepat di atas sel X, maka X berada di bawah sel milikku.
        const dituju = selDi(ref, p.kata, grid.length);
        return dituju !== null && dituju.b === b && dituju.k === k;
      });
      if (ok) hasil.push(nama);
    }
  }
  return hasil;
}

export const RONDE_TEBAK_A: SoalTebak[] = [
  {
    grid: [
      ["jam", "lukisan", "lampu"],
      ["lemari", "ikan", "buku"],
      ["boneka", "bola", "pot"],
    ],
    petunjuk: [{ kata: "atas", acuan: "ikan" }, { kata: "kanan", acuan: "jam" }],
    opsi: ["lukisan", "bola", "lemari"],
    jawab: "lukisan",
  },
  {
    grid: [
      ["jam", "lukisan", "lampu"],
      ["lemari", "ikan", "buku"],
      ["boneka", "bola", "pot"],
    ],
    petunjuk: [{ kata: "bawah", acuan: "buku" }, { kata: "kanan", acuan: "bola" }],
    opsi: ["pot", "boneka", "lampu"],
    jawab: "pot",
  },
  {
    grid: [
      ["bunga", "kupu", "awan"],
      ["rumput", "burung", "pohon"],
      ["batu", "ulat", "sungai"],
    ],
    petunjuk: [{ kata: "kiri", acuan: "pohon" }, { kata: "atas", acuan: "ulat" }, { kata: "bawah", acuan: "kupu" }],
    opsi: ["burung", "rumput", "batu"],
    jawab: "burung",
  },
  {
    grid: [
      ["bunga", "kupu", "awan"],
      ["rumput", "burung", "pohon"],
      ["batu", "ulat", "sungai"],
    ],
    petunjuk: [{ kata: "kiri", acuan: "burung" }, { kata: "atas", acuan: "batu" }],
    opsi: ["rumput", "ulat", "kupu"],
    jawab: "rumput",
  },
];

/* ====================================================================== */
/* Peta konsep (A10 dan B10)                                                 */
/* ====================================================================== */

export type KotakPeta = { label: string; opsi: string[]; benar: number };
export const PETA_KONSEP_A: { pusat: string; kotak: KotakPeta[] }[] = [
  {
    pusat: "Posisi benda",
    kotak: [
      { label: "Posisi benda adalah", opsi: ["letak suatu benda terhadap benda lain", "warna suatu benda", "banyak benda dalam satu kelompok"], benar: 0 },
      { label: "Enam kata posisi", opsi: ["atas, bawah, depan, belakang, kanan, kiri", "merah, biru, kuning, hijau, ungu, jingga", "satu, dua, tiga, empat, lima, enam"], benar: 0 },
      { label: "Pasangan berlawanan", opsi: ["atas dengan bawah", "atas dengan kiri", "depan dengan kanan"], benar: 0 },
      { label: "Menurutku, posisi benda dijelaskan dengan", opsi: ["benda yang diceritakan, kata posisi, dan benda acuan", "warna dan ukuran saja", "angka saja"], benar: 0 },
    ],
  },
  {
    pusat: "Kanan dan kiri",
    kotak: [
      { label: "Pada gambar, kanan dan kiri mengikuti", opsi: ["posisi pembaca", "posisi benda di gambar", "warna gambar"], benar: 0 },
      { label: "Contoh kalimat", opsi: ["Burung di sebelah kiri rumput", "Burung di sebelah atas kiri", "Burung dan rumput sama besar"], benar: 0 },
      { label: "Kalau burung di kiri rumput, maka rumput di", opsi: ["sebelah kanan burung", "sebelah kiri burung", "bawah burung"], benar: 0 },
      { label: "Menurutku, agar tidak keliru kita", opsi: ["menentukan dulu benda acuan dan arah pandang", "menebak saja", "memilih kata yang pertama diingat"], benar: 0 },
    ],
  },
];

export const PETA_KONSEP_B: { pusat: string; kotak: KotakPeta[] }[] = [
  {
    pusat: "Pola",
    kotak: [
      { label: "Pola adalah", opsi: ["hal yang berulang dan teratur", "hal yang selalu berbeda-beda", "hal yang hanya terjadi sekali"], benar: 0 },
      { label: "Macam pola", opsi: ["bentuk, warna, gerakan, dan suara", "besar, berat, panjang, dan lebar", "pagi, siang, sore, dan malam saja"], benar: 0 },
      { label: "Contoh pola", opsi: ["merah, biru, merah, biru, merah, biru", "merah, biru, kuning, hijau, ungu, jingga", "merah, merah, biru, kuning, merah, hijau"], benar: 0 },
      { label: "Menurutku, pola dapat dilanjutkan karena", opsi: ["kelompoknya berulang dengan urutan yang sama", "setiap benda berbeda", "kita boleh memilih sesuka hati"], benar: 0 },
    ],
  },
  {
    pusat: "Satuan pola",
    kotak: [
      { label: "Satuan pola adalah", opsi: ["kelompok terkecil yang berulang", "benda yang paling besar", "benda yang paling banyak"], benar: 0 },
      { label: "Pada A B B A B B A B B, satuannya", opsi: ["A B B", "A B", "B B A"], benar: 0 },
      { label: "Setelah A A B A A B A A, yang berikutnya", opsi: ["B", "A", "C"], benar: 0 },
      { label: "Menurutku, cara mencari satuan pola adalah", opsi: ["mencari kelompok yang muncul lagi dari awal", "menghitung semua benda", "memilih benda yang terakhir"], benar: 0 },
    ],
  },
];

/* ====================================================================== */
/* Pola                                                                      */
/* ====================================================================== */

/** Panjang satuan terpendek `p` (p <= n/2) sehingga seq[i] sama dengan seq[i mod p]. 0 bila bukan pola. */
export function satuanTerpendek(seq: readonly string[]): number {
  const n = seq.length;
  for (let p = 1; p <= Math.floor(n / 2); p += 1) {
    if (seq.every((t, i) => t === seq[i % p])) return p;
  }
  return 0;
}

/** Pola: berulang teratur dan memuat paling sedikit dua unsur berbeda. Barisan yang semuanya sama bukan pola. */
export function adalahPola(seq: readonly string[]): boolean {
  const p = satuanTerpendek(seq);
  return p > 0 && new Set(seq).size >= 2;
}

/** Barisan dari satuan yang diulang sampai `panjang` unsur. */
export const susunPola = (satuan: readonly string[], panjang: number): string[] => Array.from({ length: panjang }, (_, i) => satuan[i % satuan.length]);

/** Unsur berikutnya setelah `seq`, atau null bila `seq` bukan pola. */
export function berikutnya(seq: readonly string[], n = 1): string[] | null {
  const p = satuanTerpendek(seq);
  if (p === 0 || !adalahPola(seq)) return null;
  return Array.from({ length: n }, (_, i) => seq[(seq.length + i) % p]);
}

/** Nama Indonesia untuk satuan pola: "merah, biru". */
export const sebutSatuan = (satuan: readonly string[]) => satuan.join(", ");

/* ------------------------------ Jenis unsur dan warna ------------------------------ */

export type JenisPola = "warna" | "bentuk" | "gerakan" | "suara";
export const HEX_WARNA: Record<string, string> = {
  merah: "#EF4444", biru: "#3B82F6", kuning: "#FBBF24", hijau: "#22C55E", ungu: "#A855F7", jingga: "#F97316",
};
export const NAMA_BENTUK_POLA: Record<string, string> = {
  lingkaran: "lingkaran", persegi: "persegi", segitiga: "segitiga", bintang: "bintang", hati: "bentuk hati", belahKetupat: "belah ketupat",
};
export const NAMA_POSE: Record<string, string> = { berdiri: "berdiri", tanganNaik: "tangan naik", membungkuk: "membungkuk" };
export const NAMA_BUNYI: Record<string, string> = { keras: "tepuk keras", pelan: "tepuk pelan", diam: "diam" };

export type RondeLanjut = { jenis: JenisPola; satuan: string[]; tampil: number; lanjut: number; pengecoh: string };
const nm = (jenis: JenisPola, t: string): string =>
  jenis === "warna" ? t : jenis === "bentuk" ? NAMA_BENTUK_POLA[t] : jenis === "gerakan" ? NAMA_POSE[t] : NAMA_BUNYI[t];
export const namaUnsur = nm;

/** Pilihan unsur untuk satu ronde: unsur dalam satuan ditambah satu pengecoh, urutan tetap. */
export function pilihanUnsur(r: RondeLanjut): string[] {
  const dasar = [...new Set([...r.satuan, r.pengecoh])];
  const putar = r.satuan.length % dasar.length;
  return dasar.map((_, i) => dasar[(i + putar) % dasar.length]);
}

/** Barisan penuh (tampil + lanjut) sebuah ronde. */
export const barisanRonde = (r: RondeLanjut): string[] => susunPola(r.satuan, r.tampil + r.lanjut);

/* B1 Rangkai Manik-Manik (warna) */
export const RONDE_MANIK_B: RondeLanjut[] = [
  { jenis: "warna", satuan: ["merah", "biru"], tampil: 6, lanjut: 3, pengecoh: "kuning" },
  { jenis: "warna", satuan: ["merah", "merah", "biru"], tampil: 6, lanjut: 3, pengecoh: "hijau" },
  { jenis: "warna", satuan: ["kuning", "ungu", "hijau"], tampil: 6, lanjut: 3, pengecoh: "merah" },
  { jenis: "warna", satuan: ["jingga", "jingga", "biru", "biru"], tampil: 8, lanjut: 4, pengecoh: "ungu" },
];

/* B3 Gerakan berpola */
export const RONDE_GERAK_B: RondeLanjut[] = [
  { jenis: "gerakan", satuan: ["membungkuk", "berdiri"], tampil: 6, lanjut: 3, pengecoh: "tanganNaik" },
  { jenis: "gerakan", satuan: ["berdiri", "tanganNaik"], tampil: 6, lanjut: 3, pengecoh: "membungkuk" },
  { jenis: "gerakan", satuan: ["berdiri", "tanganNaik", "membungkuk"], tampil: 6, lanjut: 3, pengecoh: "berdiri" },
  { jenis: "gerakan", satuan: ["tanganNaik", "tanganNaik", "berdiri"], tampil: 6, lanjut: 3, pengecoh: "membungkuk" },
];

/* B4 Tepuk berpola */
export const RONDE_TEPUK_B: RondeLanjut[] = [
  { jenis: "suara", satuan: ["keras", "pelan"], tampil: 6, lanjut: 3, pengecoh: "diam" },
  { jenis: "suara", satuan: ["keras", "pelan", "pelan"], tampil: 6, lanjut: 3, pengecoh: "diam" },
  { jenis: "suara", satuan: ["keras", "keras", "diam"], tampil: 6, lanjut: 3, pengecoh: "pelan" },
  { jenis: "suara", satuan: ["pelan", "keras", "diam", "keras"], tampil: 8, lanjut: 4, pengecoh: "pelan" },
];

/* B6 Lanjutkan pola bentuk (Picture: bentuk polos) */
export const RONDE_LANJUT_B: RondeLanjut[] = [
  { jenis: "bentuk", satuan: ["lingkaran", "hati"], tampil: 6, lanjut: 2, pengecoh: "segitiga" },
  { jenis: "bentuk", satuan: ["bintang", "persegi", "persegi"], tampil: 6, lanjut: 2, pengecoh: "hati" },
  { jenis: "bentuk", satuan: ["segitiga", "segitiga", "belahKetupat"], tampil: 7, lanjut: 2, pengecoh: "lingkaran" },
  { jenis: "bentuk", satuan: ["hati", "hati", "segitiga", "segitiga"], tampil: 8, lanjut: 2, pengecoh: "bintang" },
];

/* B5 Pola atau bukan */
export type BarisanPola = { jenis: "bentuk"; seq: string[]; pola: boolean };
export const RONDE_POLABUKAN_B: BarisanPola[][] = [
  [
    { jenis: "bentuk", seq: susunPola(["hati", "segitiga"], 8), pola: true },
    { jenis: "bentuk", seq: ["persegi", "bintang", "persegi", "persegi", "bintang", "lingkaran", "persegi"], pola: false },
    { jenis: "bentuk", seq: susunPola(["bintang", "belahKetupat", "belahKetupat"], 9), pola: true },
    { jenis: "bentuk", seq: ["lingkaran", "hati", "segitiga", "bintang", "persegi", "belahKetupat", "lingkaran"], pola: false },
  ],
  [
    { jenis: "bentuk", seq: ["lingkaran", "lingkaran", "lingkaran", "lingkaran", "lingkaran", "lingkaran"], pola: false },
    { jenis: "bentuk", seq: susunPola(["persegi", "persegi", "lingkaran"], 9), pola: true },
    { jenis: "bentuk", seq: ["hati", "segitiga", "hati", "hati", "segitiga", "segitiga", "hati"], pola: false },
    { jenis: "bentuk", seq: susunPola(["segitiga", "lingkaran"], 8), pola: true },
  ],
];

/* B7 Warnai pola */
export type RondeWarnai = { bentuk: "lingkaran" | "persegi" | "bintang"; satuan: string[]; tampil: number; total: number; bebas: boolean };
export const RONDE_WARNAI_B: RondeWarnai[] = [
  { bentuk: "lingkaran", satuan: ["jingga", "hijau", "hijau"], tampil: 6, total: 9, bebas: false },
  { bentuk: "persegi", satuan: ["merah", "biru"], tampil: 4, total: 8, bebas: false },
  { bentuk: "bintang", satuan: ["biru", "biru", "jingga"], tampil: 6, total: 9, bebas: false },
  { bentuk: "persegi", satuan: [], tampil: 0, total: 8, bebas: true },
];
export const PALET_WARNA = ["merah", "biru", "kuning", "hijau", "ungu", "jingga"];

/** Periksa warna siswa. Ronde bebas: harus pola dan memakai paling sedikit dua warna. */
export function periksaWarnai(r: RondeWarnai, warna: readonly (string | null)[]): { sah: boolean; pesan: string } {
  if (warna.some((w) => !w)) return { sah: false, pesan: "belum semua kotak diwarnai" };
  const isi = warna as string[];
  if (r.bebas) return adalahPola(isi) ? { sah: true, pesan: "" } : { sah: false, pesan: "warnamu belum berulang dan teratur" };
  const kunci = susunPola(r.satuan, r.total);
  const salah = kunci.findIndex((k, i) => k !== isi[i]);
  return salah < 0 ? { sah: true, pesan: "" } : { sah: false, pesan: `kotak ke-${salah + 1} belum sesuai pola` };
}

/* B2 Atur barisan sahabat */
export type Sahabat = { nama: string; sifat: string };
export type RondeBarisan = { atribut: string; nama: Record<string, string>; sahabat: Sahabat[]; pola: string[] };
const ENAM: Sahabat[] = [
  { nama: "Upe", sifat: "laki-laki" },
  { nama: "Lili", sifat: "perempuan" },
  { nama: "Halim", sifat: "laki-laki" },
  { nama: "Kira", sifat: "perempuan" },
  { nama: "Malosi", sifat: "laki-laki" },
  { nama: "Tika", sifat: "perempuan" },
];
export const RONDE_BARISAN_B: RondeBarisan[] = [
  { atribut: "jenis kelamin", nama: {}, sahabat: ENAM, pola: susunPola(["laki-laki", "perempuan"], 6) },
  { atribut: "jenis kelamin", nama: {}, sahabat: ENAM, pola: susunPola(["perempuan", "laki-laki"], 6) },
  {
    atribut: "warna topi",
    nama: {},
    sahabat: [
      { nama: "Upe", sifat: "merah" },
      { nama: "Lili", sifat: "merah" },
      { nama: "Halim", sifat: "biru" },
      { nama: "Kira", sifat: "merah" },
      { nama: "Malosi", sifat: "merah" },
      { nama: "Tika", sifat: "biru" },
    ],
    pola: susunPola(["merah", "merah", "biru"], 6),
  },
];

/** Periksa urutan nama pada barisan: sifat tiap posisi sama dengan pola, dan tiap sahabat dipakai sekali. */
export function periksaBarisan(r: RondeBarisan, urutan: readonly (string | null)[]): { sah: boolean; salah: number } {
  const sifat = (n: string | null) => r.sahabat.find((s) => s.nama === n)?.sifat ?? null;
  if (urutan.some((u) => !u) || new Set(urutan).size !== r.sahabat.length) return { sah: false, salah: -1 };
  const salah = r.pola.findIndex((p, i) => sifat(urutan[i]) !== p);
  return { sah: salah < 0, salah };
}

/* B8 Isi kotak pola */
export type RondeIsi = { satuan: string[]; panjang: number; kosong: number[]; pengecoh: string };
export const RONDE_ISI_B: RondeIsi[] = [
  { satuan: ["A", "B"], panjang: 8, kosong: [6, 7], pengecoh: "C" },
  { satuan: ["A", "A", "B"], panjang: 9, kosong: [4, 8], pengecoh: "C" },
  { satuan: ["merah", "biru", "kuning"], panjang: 9, kosong: [3, 7], pengecoh: "hijau" },
  { satuan: ["kecil", "kecil", "besar", "besar"], panjang: 10, kosong: [5, 9], pengecoh: "sedang" },
];

/** Syarat soal isi kotak: bagian yang tampil menentukan satuan secara unik (dua kotak kosong tidak merusak satuan). */
export function soalIsiValid(r: RondeIsi): boolean {
  const penuh = susunPola(r.satuan, r.panjang);
  const tampil = penuh.map((t, i) => (r.kosong.includes(i) ? null : t));
  // Untuk setiap satuan lain dengan panjang p <= panjang/2, bila cocok dengan unsur yang tampil maka satuannya harus sama dengan satuan asli.
  for (let p = 1; p <= Math.floor(r.panjang / 2); p += 1) {
    const kandidat = Array.from({ length: p }, (_, j) => tampil.find((t, i) => t !== null && i % p === j) ?? null);
    const cocok = tampil.every((t, i) => t === null || kandidat[i % p] === t);
    if (cocok && p < r.satuan.length) return false;
  }
  return satuanTerpendek(penuh) === r.satuan.length;
}

/* B9 Cari satuan pola */
export type RondeCari = { satuan: string[]; panjang: number; opsi: string[][] };
export const RONDE_CARI_B: RondeCari[] = [
  { satuan: ["A", "A", "B"], panjang: 9, opsi: [["A", "B", "A"], ["A", "A", "B"], ["A", "B", "B"]] },
  { satuan: ["A", "B", "B"], panjang: 9, opsi: [["A", "B", "B"], ["B", "B", "A"], ["A", "A", "B"]] },
  { satuan: ["A", "B", "C"], panjang: 9, opsi: [["B", "C", "A"], ["A", "C", "B"], ["A", "B", "C"]] },
  { satuan: ["A", "A", "B", "B"], panjang: 8, opsi: [["A", "B", "B", "A"], ["A", "A", "B", "B"], ["A", "A", "A", "B"]] },
];

/** Pilihan satuan yang benar: diulang dari awal sampai panjang barisan sama dengan barisan. */
export function satuanCocok(r: RondeCari, opsi: readonly string[]): boolean {
  const seq = susunPola(r.satuan, r.panjang);
  return susunPola(opsi, r.panjang).every((t, i) => t === seq[i]);
}

/** Urutan tampil beberapa pilihan, tetap tanpa acak. */
export function urutanTetap(n: number, langkah = 3, geser = 0): number[] {
  const g = ((geser % n) + n) % n;
  const awal = (g * langkah) % n;
  return Array.from({ length: n }, (_, i) => (i + awal) % n);
}
