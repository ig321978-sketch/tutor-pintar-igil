/**
 * Definisi Mesin Bertahap Kelas 4 Bab 5, dijalankan mesin berstasiun mesin-bertahap-k3b1.ts.
 * Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari koordinat titik sudut kasusnya (bilangan bulat).
 *  - MESIN_CIRI (A): Sisi → Sudut → Sejajar → Nama   (penggaris segitiga, jendela, meja)
 *  - MESIN_SUSUN (B): Jenis → Bagian → Nama → Luas    (kertas persegi, hiasan segienam, susunan trapesium)
 * Pengecoh bersumber dari kesalahan umum: menghitung semua sudut sebagai siku-siku, salah hitung sisi satu, mengira
 * trapesium punya dua pasang sisi sejajar, dan mengira persegi panjang sebagai persegi. Teks dieja ejaK3 (bilangan
 * sampai 9.999), jadi tanpa lambang derajat. Murni: tanpa React, tanpa jaringan. Hanya impor tipe.
 * Diuji di scripts/uji-lab-k4b5.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));
const duaPengecoh = (benar: string, calon: string[]): string[] => [...new Set(calon.filter((c) => c !== benar))].slice(0, 2);
const angkaPengecoh = (benar: number, calon: number[]): string[] => duaPengecoh(String(benar), calon.filter((v) => v >= 0 && v !== benar).map(String));
const kapital = (t: string): string => `${t[0].toUpperCase()}${t.slice(1)}`;

/* ------------------------------ A: Mesin Ciri ------------------------------ */

export type KasusCiri = {
  id: string;
  benda: string;
  /** Titik sudut berurutan (koordinat bulat). */
  titik: [number, number][];
  /** Nama yang sering tertukar; yang sama dengan nama hasil hitung dibuang. */
  tertukar: string[];
};
export const KASUS_CIRI: KasusCiri[] = [
  { id: "penggaris", benda: "penggaris segitiga", titik: [[0, 0], [4, 0], [0, 3]], tertukar: ["segitiga tumpul", "segitiga lancip", "segitiga siku-siku"] },
  { id: "jendela", benda: "kaca jendela", titik: [[0, 0], [4, 0], [4, 2], [0, 2]], tertukar: ["persegi", "jajargenjang", "persegi panjang"] },
  { id: "meja", benda: "permukaan meja kelompok", titik: [[0, 0], [6, 0], [4, 2], [1, 2]], tertukar: ["jajargenjang", "layang-layang", "trapesium"] },
];

export const STASIUN_CIRI: StasiunDef[] = [
  { id: "sisi", nama: "Sisi", ikon: "📏" },
  { id: "sudut", nama: "Sudut", ikon: "📐" },
  { id: "sejajar", nama: "Sejajar", ikon: "🛤️" },
  { id: "nama", nama: "Nama", ikon: "🏷️" },
];

type Ciri = { sisi: number; siku: number; sejajar: number; samaSemua: boolean; nama: string };

/** Ciri dari koordinat: hasil kali titik untuk siku, hasil kali silang untuk sejajar, kuadrat panjang untuk sisi sama. */
export function ciriKasus(t: [number, number][]): Ciri {
  const n = t.length;
  const v = (i: number): [number, number] => {
    const a = t[((i % n) + n) % n];
    const b = t[(((i + 1) % n) + n) % n];
    return [b[0] - a[0], b[1] - a[1]];
  };
  let siku = 0;
  for (let i = 0; i < n; i += 1) {
    const a = v(i - 1);
    const b = v(i);
    if (a[0] * b[0] + a[1] * b[1] === 0) siku += 1;
  }
  let sejajar = 0;
  if (n === 4) for (const i of [0, 1]) if (v(i)[0] * v(i + 2)[1] - v(i)[1] * v(i + 2)[0] === 0) sejajar += 1;
  const pj = Array.from({ length: n }, (_, i) => v(i)[0] ** 2 + v(i)[1] ** 2);
  const samaSemua = pj.every((x) => x === pj[0]);
  let nama: string;
  if (n === 3) nama = siku > 0 ? "segitiga siku-siku" : "segitiga lancip atau tumpul";
  else if (sejajar === 2) nama = siku === 4 ? (samaSemua ? "persegi" : "persegi panjang") : samaSemua ? "belah ketupat" : "jajargenjang";
  else if (sejajar === 1) nama = "trapesium";
  else nama = "segiempat lain";
  return { sisi: n, siku, sejajar, samaSemua, nama };
}

const kataSejajar = (p: number): string => (p === 0 ? "tidak ada sisi sejajar" : `${p} pasang sisi sejajar`);

export function kasusMesinCiri(k: KasusCiri, idx: number): KasusMesin {
  const c = ciriKasus(k.titik);
  const langkah: LangkahMesin[] = [
    {
      stasiun: "sisi",
      tanya: `${kapital(k.benda)} dibatasi berapa sisi lurus?`,
      opsi: susunOpsi(String(c.sisi), angkaPengecoh(c.sisi, [c.sisi + 1, c.sisi - 1]), idx),
      benar: String(c.sisi),
      petunjuk: "Telusuri tepinya dengan jari. Hitung tiap ruas lurus satu kali, dari pojok ke pojok.",
    },
    {
      stasiun: "sudut",
      tanya: `Berapa sudut siku-siku pada ${k.benda}?`,
      opsi: susunOpsi(String(c.siku), angkaPengecoh(c.siku, [c.sisi, c.siku + 1, c.siku - 1]), idx + 1),
      benar: String(c.siku),
      petunjuk: "Tempelkan pojok buku di tiap sudut. Hanya sudut yang pas dengan pojok buku yang siku-siku.",
    },
    {
      stasiun: "sejajar",
      tanya: `Berapa pasang sisi sejajar pada ${k.benda}?`,
      opsi: susunOpsi(String(c.sejajar), ["0", "1", "2"].filter((o) => o !== String(c.sejajar)), idx + 2),
      benar: String(c.sejajar),
      petunjuk: "Sisi sejajar tidak pernah bertemu walau diperpanjang, seperti dua rel kereta. Periksa sisi yang berhadapan.",
    },
    {
      stasiun: "nama",
      tanya: `Dengan ciri itu, ${k.benda} berbentuk…`,
      opsi: susunOpsi(c.nama, duaPengecoh(c.nama, k.tertukar), idx),
      benar: c.nama,
      petunjuk: `Ingat cirinya: ${c.sisi} sisi, ${c.siku} sudut siku-siku, ${kataSejajar(c.sejajar)}${c.sisi === 4 ? (c.samaSemua ? ", semua sisi sama panjang" : ", sisinya tidak sama semua") : ""}.`,
    },
  ];
  return {
    id: k.id,
    nama: k.benda,
    ringkas: `${kapital(k.benda)}: ${c.sisi} sisi, ${c.siku} sudut siku-siku, ${kataSejajar(c.sejajar)}. Bentuknya ${c.nama}.`,
    langkah,
  };
}

export const MESIN_CIRI: DefMesin = {
  id: "mesin-ciri-k4b5",
  judul: "Mesin Ciri",
  selesaiId: "mesin-ciri",
  stasiun: STASIUN_CIRI,
  kasus: KASUS_CIRI.map(kasusMesinCiri),
};

/* ------------------------------ B: Mesin Susun-Urai ------------------------------ */

type T2 = [number, number];
/** Kisi persegi (x, y) atau kisi segitiga (a, b): titik a·(1, 0) + b·(½, ½√3). */
export type KasusSusun = {
  id: string;
  benda: string;
  arah: "susun" | "urai";
  kisi: "persegi" | "segitiga";
  utuh: T2[];
  bagian: T2[][];
  /** Nama yang sering tertukar; yang sama dengan nama hasil hitung dibuang. */
  tertukar: string[];
};
const HEKS: T2[] = [[2, 0], [0, 2], [-2, 2], [-2, 0], [0, -2], [2, -2]];
export const KASUS_SUSUN: KasusSusun[] = [
  {
    id: "kertas",
    benda: "kertas persegi Helen",
    arah: "urai",
    kisi: "persegi",
    utuh: [[0, 0], [4, 0], [4, 4], [0, 4]],
    bagian: [[[0, 0], [4, 0], [4, 4]], [[0, 0], [4, 4], [0, 4]]],
    tertukar: ["persegi panjang", "segitiga sama sisi", "segitiga siku-siku"],
  },
  {
    id: "hiasan",
    benda: "hiasan segienam",
    arah: "urai",
    kisi: "segitiga",
    utuh: HEKS,
    bagian: HEKS.map((t, i) => [[0, 0], t, HEKS[(i + 1) % 6]] as T2[]),
    tertukar: ["segitiga siku-siku", "persegi", "segitiga sama sisi"],
  },
  {
    id: "trapesium",
    benda: "susunan segitiga sama sisi",
    arah: "susun",
    kisi: "segitiga",
    utuh: [[0, 0], [4, 0], [2, 2], [0, 2]],
    bagian: [[[0, 0], [2, 0], [0, 2]], [[2, 0], [2, 2], [0, 2]], [[2, 0], [4, 0], [2, 2]]],
    tertukar: ["jajargenjang", "segienam", "trapesium"],
  },
];

export const STASIUN_SUSUN: StasiunDef[] = [
  { id: "jenis", nama: "Jenis", ikon: "🧩" },
  { id: "bagian", nama: "Bagian", ikon: "🔢" },
  { id: "nama", nama: "Nama", ikon: "🏷️" },
  { id: "luas", nama: "Luas", ikon: "⚖️" },
];

/** Hasil kali titik menurut kisi (×2 untuk kisi segitiga agar tetap bulat). */
const titikKisi = (k: KasusSusun["kisi"], u: T2, v: T2): number => (k === "persegi" ? u[0] * v[0] + u[1] * v[1] : 2 * u[0] * v[0] + u[0] * v[1] + u[1] * v[0] + 2 * u[1] * v[1]);
/** Dua kali luas (rumus tali sepatu) dalam satuan kisi. */
export const luasKisi = (p: T2[]): number => Math.abs(p.reduce((s, a, i) => s + a[0] * p[(i + 1) % p.length][1] - a[1] * p[(i + 1) % p.length][0], 0));

/** Nama bangun dari titik sudut dan kisinya (hanya segitiga, segiempat, segienam yang dipakai mesin). */
export function namaKisi(k: KasusSusun["kisi"], p: T2[]): string {
  const n = p.length;
  const v = Array.from({ length: n }, (_, i) => [p[(i + 1) % n][0] - p[i][0], p[(i + 1) % n][1] - p[i][1]] as T2);
  const pj = v.map((x) => titikKisi(k, x, x));
  const siku = v.filter((x, i) => titikKisi(k, v[(i - 1 + n) % n], x) === 0).length;
  const sama = pj.every((x) => x === pj[0]);
  if (n === 3) return siku > 0 ? "segitiga siku-siku" : sama ? "segitiga sama sisi" : "segitiga";
  if (n === 4) {
    const sejajar = [0, 1].filter((i) => v[i][0] * v[i + 2][1] - v[i][1] * v[i + 2][0] === 0).length;
    if (sejajar === 2) return siku === 4 ? (sama ? "persegi" : "persegi panjang") : sama ? "belah ketupat" : "jajargenjang";
    return sejajar === 1 ? "trapesium" : "segiempat";
  }
  return n === 6 ? (sama ? "segienam beraturan" : "segienam") : `segi banyak ${n} sisi`;
}

const kataJenis = (a: KasusSusun["arah"]): string => (a === "susun" ? "komposisi" : "dekomposisi");

export function kasusMesinSusun(k: KasusSusun, idx: number): KasusMesin {
  const jenis = kataJenis(k.arah);
  const n = k.bagian.length;
  const namaBagian = [...new Set(k.bagian.map((b) => namaKisi(k.kisi, b)))];
  const namaUtuh = namaKisi(k.kisi, k.utuh);
  const target = k.arah === "urai" ? namaBagian[0] : namaUtuh;
  const jumlahLuas = k.bagian.reduce((s, b) => s + luasKisi(b), 0);
  const hasilLuas = banding(jumlahLuas, luasKisi(k.utuh));
  const kalimat = k.arah === "urai" ? `${kapital(k.benda)} diurai menjadi ${n} bagian` : `${n} segitiga sama sisi disusun menjadi satu bangun`;
  const langkah: LangkahMesin[] = [
    {
      stasiun: "jenis",
      tanya: `${kalimat}. Kegiatan ini disebut…`,
      opsi: susunOpsi(jenis, ["komposisi", "dekomposisi", "pengukuran"].filter((o) => o !== jenis), idx),
      benar: jenis,
      petunjuk: "Menyusun bagian menjadi satu bangun disebut komposisi. Mengurai satu bangun menjadi bagian disebut dekomposisi.",
    },
    {
      stasiun: "bagian",
      tanya: k.arah === "urai" ? `Berapa bagian hasil uraian ${k.benda}?` : `Berapa segitiga yang disusun?`,
      opsi: susunOpsi(String(n), angkaPengecoh(n, [n + 1, n - 1, n * 2]), idx + 1),
      benar: String(n),
      petunjuk: "Hitung bagiannya satu per satu. Tiap bagian dihitung satu kali.",
    },
    {
      stasiun: "nama",
      tanya: k.arah === "urai" ? `Tiap bagian berbentuk…` : `Bangun hasil susunan berbentuk…`,
      opsi: susunOpsi(target, duaPengecoh(target, k.tertukar), idx + 2),
      benar: target,
      petunjuk: k.arah === "urai" ? "Hitung sisi tiap bagian dan periksa sudutnya." : "Hitung sisi bangun hasil susunan, lalu cari sisi yang sejajar.",
    },
    {
      stasiun: "luas",
      tanya: `Jumlah luas semua bagian dibanding luas bangun utuh…`,
      opsi: susunOpsi(hasilLuas, BANDING.filter((b) => b !== hasilLuas), idx),
      benar: hasilLuas,
      petunjuk: "Tidak ada bagian yang dibuang atau ditambah. Bagian hanya disusun atau diurai, jadi luas totalnya tidak berubah.",
    },
  ];
  const ringkas =
    k.arah === "urai"
      ? `${kapital(k.benda)} diurai menjadi ${n} ${namaBagian.join(" dan ")}. Luas totalnya tetap. Ini dekomposisi.`
      : `${n} segitiga sama sisi disusun menjadi ${namaUtuh}. Luas totalnya tetap. Ini komposisi.`;
  return { id: k.id, nama: k.benda, ringkas, langkah };
}

const BANDING = ["sama", "lebih besar", "lebih kecil"];
const banding = (a: number, b: number): string => (a === b ? "sama" : a > b ? "lebih besar" : "lebih kecil");

export const MESIN_SUSUN: DefMesin = {
  id: "mesin-susun-k4b5",
  judul: "Mesin Susun-Urai",
  selesaiId: "mesin-susun",
  stasiun: STASIUN_SUSUN,
  kasus: KASUS_SUSUN.map(kasusMesinSusun),
};

export const SEMUA_MESIN_K4B5 = [MESIN_CIRI, MESIN_SUSUN];
