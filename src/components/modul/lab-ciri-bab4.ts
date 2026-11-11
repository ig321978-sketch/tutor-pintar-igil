/**
 * Laboratorium Ciri Bentuk (Bab 4): model PhET. Satu bentuk datar dipilih, lalu diputar, dibesarkan, dan
 * diperiksa ciri-cirinya (sisi lurus, sisi lengkung, sudut). Ciri tidak berubah ketika bentuk diputar atau
 * dibesarkan. Bagian "Menyusun" menggabungkan dua atau empat bagian menjadi bentuk baru.
 * Murni: tanpa React, tanpa jaringan. Diuji di scripts/uji-lab-kelas1.mjs.
 */

export type IdBentuk = "persegi" | "persegi-panjang" | "segitiga" | "lingkaran" | "setengah-lingkaran";

export type Bentuk = {
  id: IdBentuk;
  nama: string;
  sisiLurus: number;
  sisiLengkung: number;
  sudut: number;
  ciri: string[];
};

export const BENTUK: Bentuk[] = [
  {
    id: "persegi",
    nama: "Persegi",
    sisiLurus: 4,
    sisiLengkung: 0,
    sudut: 4,
    ciri: ["Punya 4 sisi lurus yang sama panjang.", "Punya 4 sudut."],
  },
  {
    id: "persegi-panjang",
    nama: "Persegi panjang",
    sisiLurus: 4,
    sisiLengkung: 0,
    sudut: 4,
    ciri: ["Punya 4 sisi lurus. Dua sisi lebih panjang.", "Punya 4 sudut."],
  },
  {
    id: "segitiga",
    nama: "Segitiga",
    sisiLurus: 3,
    sisiLengkung: 0,
    sudut: 3,
    ciri: ["Punya 3 sisi lurus.", "Punya 3 sudut."],
  },
  {
    id: "lingkaran",
    nama: "Lingkaran",
    sisiLurus: 0,
    sisiLengkung: 1,
    sudut: 0,
    ciri: ["Punya 1 sisi lengkung.", "Tidak punya sisi lurus dan tidak punya sudut."],
  },
  {
    id: "setengah-lingkaran",
    nama: "Setengah lingkaran",
    sisiLurus: 1,
    sisiLengkung: 1,
    sudut: 2,
    ciri: ["Punya 1 sisi lurus dan 1 sisi lengkung.", "Punya 2 sudut."],
  },
];

export const bentukDari = (id: IdBentuk): Bentuk => BENTUK.find((b) => b.id === id) as Bentuk;

export const SKALA_MIN = 1;
export const SKALA_MAKS = 3;

export type Pose = { putar: number; skala: number };

export const poseAwal: Pose = { putar: 0, skala: 1 };

export const putar90 = (p: Pose): Pose => ({ ...p, putar: (p.putar + 90) % 360 });

export function ubahSkala(p: Pose, delta: 1 | -1): Pose {
  return { ...p, skala: Math.max(SKALA_MIN, Math.min(SKALA_MAKS, p.skala + delta)) };
}

/** Ciri bentuk. Tidak bergantung pada pose, sengaja: diputar atau dibesarkan, cirinya sama. */
export function ciriBentuk(id: IdBentuk): { sisiLurus: number; sisiLengkung: number; sudut: number } {
  const b = bentukDari(id);
  return { sisiLurus: b.sisiLurus, sisiLengkung: b.sisiLengkung, sudut: b.sudut };
}

export function ucapanCiri(id: IdBentuk, p: Pose): string {
  const b = bentukDari(id);
  const ubah = p.putar !== 0 || p.skala !== 1 ? " Bentuknya sudah diputar atau dibesarkan, tetapi cirinya tetap sama." : "";
  return `${b.nama}. ${b.ciri.join(" ")}${ubah}`;
}

/**
 * Kelompok bentuk menurut kata Sub-Bab A: bentuk lengkung (tanpa sisi lurus), segitiga (3 sisi lurus), segi empat
 * (4 sisi lurus). Setengah lingkaran punya sisi lurus dan sisi lengkung, jadi masuk campuran.
 */
export function kelompokBentuk(id: IdBentuk): string {
  const b = bentukDari(id);
  if (b.sisiLurus === 0) return "Bentuk lengkung";
  if (b.sisiLengkung > 0) return "Campuran sisi lurus dan lengkung";
  if (b.sisiLurus === 3) return "Segitiga";
  if (b.sisiLurus === 4) return "Segi empat";
  return `Bentuk ${b.sisiLurus} sisi`;
}

/* ------------------------------- Menyusun -------------------------------- */

export type Bagian = {
  /** Jalur SVG bagian dalam kotak 0 0 120 80, posisi saat digabung. */
  d: string;
  warna: string;
  /** Geseran saat dipisah. */
  dx: number;
  dy: number;
};

export type Susunan = {
  id: string;
  judul: string;
  bagian: Bagian[];
  hasil: IdBentuk;
  kalimat: string;
  /** Titik poligon tiap bagian bila semua bagian berupa poligon. Dipakai untuk pemeriksaan luas. */
  poligon?: [number, number][][];
};

export const SUSUNAN: Susunan[] = [
  {
    id: "dua-segitiga",
    judul: "2 segitiga",
    bagian: [
      { d: "M20 10 L100 10 L20 70 Z", warna: "#60A5FA", dx: -9, dy: -7 },
      { d: "M100 10 L100 70 L20 70 Z", warna: "#FBBF24", dx: 9, dy: 7 },
    ],
    hasil: "persegi-panjang",
    kalimat: "2 segitiga yang sama besar, jika sisi miringnya direkatkan, menjadi 1 persegi panjang.",
    poligon: [
      [
        [20, 10],
        [100, 10],
        [20, 70],
      ],
      [
        [100, 10],
        [100, 70],
        [20, 70],
      ],
    ],
  },
  {
    id: "dua-persegi",
    judul: "2 persegi",
    bagian: [
      { d: "M20 20 H60 V60 H20 Z", warna: "#F472B6", dx: -10, dy: 0 },
      { d: "M60 20 H100 V60 H60 Z", warna: "#34D399", dx: 10, dy: 0 },
    ],
    hasil: "persegi-panjang",
    kalimat: "2 persegi yang sama besar, jika sisinya dirapatkan, menjadi 1 persegi panjang.",
    poligon: [
      [
        [20, 20],
        [60, 20],
        [60, 60],
        [20, 60],
      ],
      [
        [60, 20],
        [100, 20],
        [100, 60],
        [60, 60],
      ],
    ],
  },
  {
    id: "empat-persegi",
    judul: "4 persegi",
    bagian: [
      { d: "M35 10 H60 V35 H35 Z", warna: "#F472B6", dx: -7, dy: -7 },
      { d: "M60 10 H85 V35 H60 Z", warna: "#34D399", dx: 7, dy: -7 },
      { d: "M35 35 H60 V60 H35 Z", warna: "#FBBF24", dx: -7, dy: 7 },
      { d: "M60 35 H85 V60 H60 Z", warna: "#60A5FA", dx: 7, dy: 7 },
    ],
    hasil: "persegi",
    kalimat: "4 persegi kecil yang sama besar, jika dirapatkan, menjadi 1 persegi yang besar.",
    poligon: [
      [
        [35, 10],
        [60, 10],
        [60, 35],
        [35, 35],
      ],
      [
        [60, 10],
        [85, 10],
        [85, 35],
        [60, 35],
      ],
      [
        [35, 35],
        [60, 35],
        [60, 60],
        [35, 60],
      ],
      [
        [60, 35],
        [85, 35],
        [85, 60],
        [60, 60],
      ],
    ],
  },
  {
    id: "dua-setengah",
    judul: "2 setengah lingkaran",
    bagian: [
      { d: "M30 40 A30 30 0 0 1 90 40 Z", warna: "#A78BFA", dx: 0, dy: -9 },
      { d: "M30 40 A30 30 0 0 0 90 40 Z", warna: "#FB923C", dx: 0, dy: 9 },
    ],
    hasil: "lingkaran",
    kalimat: "2 setengah lingkaran yang sama besar, jika sisi lurusnya direkatkan, menjadi 1 lingkaran.",
  },
];

/** Ucapan guru untuk bagian Menyusun: bagian terpisah atau sudah digabung (diuraikan lagi bila dimatikan). */
export function ucapanSusun(s: Susunan, gabung: boolean): string {
  if (!gabung) return `Ada ${s.bagian.length} bagian. Gabungkan bagian-bagian ini untuk melihat bentuk barunya.`;
  return `${s.kalimat} Hasilnya ${bentukDari(s.hasil).nama.toLowerCase()}. Matikan pilihan gabungkan untuk menguraikannya lagi menjadi ${s.bagian.length} bagian.`;
}

/** Luas poligon (rumus tali sepatu). */
export function luasPoligon(titik: [number, number][]): number {
  let jumlah = 0;
  for (let i = 0; i < titik.length; i += 1) {
    const [x1, y1] = titik[i];
    const [x2, y2] = titik[(i + 1) % titik.length];
    jumlah += x1 * y2 - x2 * y1;
  }
  return Math.abs(jumlah) / 2;
}

/** Kotak pembatas gabungan semua bagian poligon saat digabung. */
export function kotakGabungan(poligon: [number, number][][]) {
  const semua = poligon.flat();
  const xs = semua.map((p) => p[0]);
  const ys = semua.map((p) => p[1]);
  return { x1: Math.min(...xs), y1: Math.min(...ys), x2: Math.max(...xs), y2: Math.max(...ys) };
}
