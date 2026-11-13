/**
 * Definisi Mesin Bertahap Kelas 6 Bab 2 Sub-Bab B (Kesamaan Rasio), dijalankan mesin berstasiun mesin-bertahap-k3b1.ts dan dieja ejaK6B2.
 * Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari data tiap kasus.
 *  - MESIN_SENILAI (B): Pengali → Isi → Senilai → Satuan   (kasus Lahan Bibit, Kopi Wedang, Adonan Kue)
 *    Pengali : kedua suku dikali bilangan yang sama (bukan ditambah).
 *    Isi     : suku kanan baris baru.
 *    Senilai : dua pecahan dicek dengan perkalian silang.
 *    Satuan  : nilai untuk satu satuan (harga per bibit, bibit per jam, harga per kg).
 * Data buatan sendiri mengikuti konteks Buku Siswa Kelas VI Bab 2 Sub-Bab B (lahan dan bibit, kopi, paket bibit).
 * Murni: tanpa React, tanpa jaringan. Hanya impor tipe. Diuji di scripts/uji-lab-k6b2.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));

const rp = (n: number): string => {
  const s = String(n);
  let hasil = "";
  for (let i = 0; i < s.length; i += 1) {
    if (i > 0 && (s.length - i) % 3 === 0) hasil += ".";
    hasil += s[i];
  }
  return `Rp${hasil}`;
};

export type KasusSenilai = {
  id: string;
  nama: string;
  konteks: string;
  /** Baris awal a : b dikali k. */
  a: number;
  b: number;
  k: number;
  ka: string;
  kb: string;
  /** Dua pecahan yang dibandingkan: p/q dan r/s. */
  p: number;
  q: number;
  r: number;
  s: number;
  /** a2 untuk w satuan; jenis nilai: rupiah atau benda. */
  a2: number;
  w: number;
  jenis: "rupiah" | "benda";
  satuan: string;
  benda: string;
};

export const KASUS_SENILAI: KasusSenilai[] = [
  { id: "lahan", nama: "Lahan Bibit", konteks: "Artus menghitung bibit untuk lahan", a: 10, b: 12, k: 5, ka: "m² lahan", kb: "bibit", p: 10, q: 12, r: 30, s: 36, a2: 40000, w: 5, jenis: "rupiah", satuan: "bibit", benda: "" },
  { id: "kopi", nama: "Kopi Wedang", konteks: "Dona meracik kopi dan gula", a: 5, b: 6, k: 5, ka: "sendok kopi", kb: "sendok gula", p: 1, q: 2, r: 4, s: 10, a2: 12, w: 3, jenis: "benda", satuan: "jam", benda: "bibit" },
  { id: "adonan", nama: "Adonan Kue", konteks: "Ibu membuat adonan kue", a: 2, b: 3, k: 4, ka: "gelas tepung", kb: "gelas air", p: 2, q: 3, r: 8, s: 12, a2: 60000, w: 3, jenis: "rupiah", satuan: "kg", benda: "" },
];

export const STASIUN_SENILAI: StasiunDef[] = [
  { id: "pengali", nama: "Pengali", ikon: "✖️" },
  { id: "isi", nama: "Isi", ikon: "📝" },
  { id: "senilai", nama: "Senilai", ikon: "⚖️" },
  { id: "satuan", nama: "Satuan", ikon: "1️⃣" },
];

export function kasusMesinSenilai(c: KasusSenilai, idx: number): KasusMesin {
  const x = c.a * c.k;
  const sama = c.p * c.s === c.q * c.r;
  const nilai = (v: number): string => (c.jenis === "rupiah" ? rp(v) : `${v} ${c.benda}`);
  const u = c.a2 / c.w;
  const SENILAI = "Senilai, perkalian silang sama";
  const BEDA = "Tidak senilai, perkalian silang berbeda";
  const NAIK = "Senilai, karena angkanya sama-sama naik";
  const langkah: LangkahMesin[] = [
    {
      stasiun: "pengali",
      tanya: `${c.konteks}: ${c.a} ${c.ka} : ${c.b} ${c.kb}. Suku kiri ingin menjadi ${x}. Kedua suku harus …`,
      opsi: susunOpsi(`dikali ${c.k}`, [`ditambah ${x - c.a}`, `dibagi ${c.k}`], idx),
      benar: `dikali ${c.k}`,
      petunjuk: "Baris baru yang senilai dibuat dengan mengalikan kedua suku dengan bilangan yang sama, bukan menambah.",
    },
    {
      stasiun: "isi",
      tanya: `Suku kiri ${c.a} menjadi ${x}. Suku kanan, dari ${c.b} ${c.kb}, menjadi …`,
      opsi: susunOpsi(String(c.b * c.k), [String(c.b + (x - c.a)), String(c.b * (c.k + 1))], idx + 1),
      benar: String(c.b * c.k),
      petunjuk: "Suku kanan dikali dengan bilangan yang sama seperti suku kiri.",
    },
    {
      stasiun: "senilai",
      tanya: `Apakah ${c.p}/${c.q} senilai dengan ${c.r}/${c.s}? Periksa dengan perkalian silang, yaitu ${c.p} × ${c.s} dan ${c.q} × ${c.r}.`,
      opsi: susunOpsi(sama ? SENILAI : BEDA, sama ? [BEDA, NAIK] : [SENILAI, NAIK], idx + 2),
      benar: sama ? SENILAI : BEDA,
      petunjuk: "Dua pecahan senilai bila hasil perkalian silangnya sama.",
    },
    {
      stasiun: "satuan",
      tanya: `${nilai(c.a2)} untuk ${c.w} ${c.satuan}. Nilai untuk satu ${c.satuan} adalah …`,
      opsi: susunOpsi(nilai(u), [nilai(c.a2), nilai(c.w)], idx + 3),
      benar: nilai(u),
      petunjuk: `Bagi ${nilai(c.a2)} dengan ${c.w} untuk mendapat nilai satu satuan.`,
    },
  ];
  return {
    id: c.id,
    nama: c.nama,
    ringkas: `${c.a} : ${c.b} dikali ${c.k} menjadi ${x} : ${c.b * c.k}. ${c.p}/${c.q} dan ${c.r}/${c.s} ${sama ? "senilai" : "tidak senilai"} lewat perkalian silang. ${nilai(c.a2)} untuk ${c.w} ${c.satuan} sama dengan ${nilai(u)} per ${c.satuan}.`,
    langkah,
  };
}

export const MESIN_SENILAI: DefMesin = {
  id: "mesin-senilai-k6b2",
  judul: "Mesin Senilai",
  selesaiId: "mesin-senilai",
  stasiun: STASIUN_SENILAI,
  kasus: KASUS_SENILAI.map(kasusMesinSenilai),
};
