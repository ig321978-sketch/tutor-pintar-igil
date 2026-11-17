/**
 * Logika murni Kelas 1 Bab 2 Sub-Bab A "Bibit Kiriman Nenek" (cerita penjumlahan) untuk tahap Mind-map, Infografis, Simulasi,
 * Concrete, Pictorial, dan Abstract. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-kebun-k1b2a.mjs.
 * Tempel label, kata bilangan, dan cara menjawab memakai ulang Kelas 1 Bab 1 Sub-Bab A.
 */
import { kata } from "../lemari-k1b1a/logika";
import type { Cara } from "../lemari-k1b1a/logika";

export { acak, cocok, cocokKelompok, kata, kelompokLabel, labelDari, IKON_CARA, NAMA_CARA, URUT_CARA, type Cara, type Label, type Tempat } from "../lemari-k1b1a/logika";

export type Metode = "igil" | "maju" | "bagian" | "bingkai";
export const URUT_METODE: Metode[] = ["igil", "maju", "bagian", "bingkai"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: bertambah, gabung, tulis kalimat",
  maju: "Counting On: menghitung maju",
  bagian: "Part-Part-Whole: bagian-bagian-utuh",
  bingkai: "Ten Frame: bingkai sepuluh",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F331}", maju: "\u{1F463}", bagian: "\u{1F9E9}", bingkai: "\u{1F51F}" };

export type Rupa = "benda" | "diagram" | "lambang";
/** Kalimat penjumlahan a + b = c (boleh salah, untuk pilihan). */
export type Kalimat = [number, number, number];

export type Langkah =
  /** Pilih kalimat penjumlahan yang cocok dengan adegan: dua kumpulan digabung atau bibit datang lagi. Tanpa jawaban angka. */
  | { tipe: "kalimat"; a: number; b: number; adegan: "gabung" | "datang"; pilihan: Kalimat[] }
  /** Ada a bibit, datang lagi b bibit: tanam yang datang satu per satu, lalu berapa semuanya. */
  | { tipe: "datang"; a: number; b: number }
  /** Menghitung maju: a disimpan di karung berangka, b dihitung maju satu per satu. */
  | { tipe: "maju"; a: number; b: number }
  /** Tikar bagian-bagian-utuh: cari utuh (a + b) atau bagian kedua (b) dari utuh dan bagian pertama. */
  | { tipe: "bagian"; a: number; b: number; cari: "utuh" | "b" }
  /** Bingkai sepuluh berisi a, isi b lagi. */
  | { tipe: "bingkai"; a: number; b: number };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; benda: string; langkah: LangkahSoal[] };

/** Kalimat benar untuk a dan b. */
export const kalimatBenar = (a: number, b: number): Kalimat => [a, b, a + b];
export const samaKalimat = (p: Kalimat, q: Kalimat): boolean => p[0] === q[0] && p[1] === q[1] && p[2] === q[2];
/** Kalimat sah (penjumlahannya benar) DAN cocok dengan adegan (bilangannya a lalu b). */
export const kalimatCocok = (l: Extract<Langkah, { tipe: "kalimat" }>, p: Kalimat): boolean => samaKalimat(p, kalimatBenar(l.a, l.b));
export const nomorBenar = (l: Extract<Langkah, { tipe: "kalimat" }>): number[] => l.pilihan.map((p, i) => (kalimatCocok(l, p) ? i : -1)).filter((i) => i >= 0);
export const tulisKalimat = (p: Kalimat): string => `${p[0]} + ${p[1]} = ${p[2]}`;
/** Kalimat dibaca dengan kata (untuk suara, tanpa digit). */
export const bacaKalimat = (p: Kalimat): string => `${kata(p[0])} ditambah ${kata(p[1])} sama dengan ${kata(p[2])}`;

/** Kunci tiap langkah, dihitung dari datanya. Null untuk kalimat. */
export function kunciLangkah(l: Langkah): number | null {
  switch (l.tipe) {
    case "kalimat":
      return null;
    case "bagian":
      return l.cari === "b" ? l.b : l.a + l.b;
    default:
      return l.a + l.b;
  }
}
export const angkaJawab = kunciLangkah;
export const utuhLangkah = (l: Langkah): number => l.a + l.b;

export function pilihanDari(l: Langkah): number[] {
  const k = kunciLangkah(l) ?? 0;
  const ada = [...new Set([k - 1, k, k + 1].filter((n) => n >= 0 && n <= 10))];
  for (let n = 0; ada.length < 3 && n <= 10; n += 1) if (!ada.includes(n)) ada.push(n);
  return ada.sort((p, q) => p - q);
}

/* ------------------------------ Instruksi (templat, tanpa digit) ------------------------------ */
const AKHIR: Record<Cara, string> = { klik: "Lalu pilih jawabannya.", kanvas: "Lalu tulis angkanya di kanvas.", suara: "Lalu ucapkan jawabannya." };
const benda = (r: Rupa) => (r === "benda" ? "bibit" : r === "diagram" ? "titik" : "angka");

export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  const akhir = AKHIR[cara];
  switch (l.tipe) {
    case "kalimat":
      return cara === "kanvas" ? "Lingkari kalimat penjumlahan yang cocok dengan ceritanya." : "Ketuk kalimat penjumlahan yang cocok dengan ceritanya.";
    case "datang":
      if (rupa === "lambang") return `Ada ${kata(l.a)}, datang lagi ${kata(l.b)}. Berapa semuanya? ${akhir}`;
      if (cara === "kanvas") return `Beri satu tanda pada tiap ${benda(rupa)} yang datang. ${akhir}`;
      return `Ketuk tiap ${benda(rupa)} yang datang supaya masuk ke bedeng. ${akhir}`;
    case "maju":
      if (rupa === "lambang") return `Mulai dari ${kata(l.a)}, lalu hitung maju ${kata(l.b)} kali. ${akhir}`;
      if (cara === "kanvas") return `Jangan hitung karungnya lagi. Beri satu tanda pada tiap ${benda(rupa)} di luar karung sambil menghitung maju. ${akhir}`;
      return `Mulai dari angka di karung. Ketuk ${benda(rupa)} di luar karung dari kiri sambil menghitung maju. ${akhir}`;
    case "bagian":
      if (rupa === "lambang") return `Lihat tikar bagian dan utuh. Cari ${l.cari === "b" ? "bagian yang belum diketahui" : "utuhnya"}. ${akhir}`;
      if (l.cari === "b") return cara === "kanvas" ? `Lingkari ${benda(rupa)} di kotak utuh yang belum masuk bagian pertama. ${akhir}` : `Ketuk ${benda(rupa)} di kotak utuh yang belum masuk bagian pertama. ${akhir}`;
      return cara === "kanvas" ? `Beri satu tanda pada tiap ${benda(rupa)} di kedua kotak bagian. ${akhir}` : `Tekan Pindahkan supaya kedua bagian masuk ke kotak utuh. ${akhir}`;
    case "bingkai":
      if (rupa === "lambang") return `Bingkai sepuluh berisi ${kata(l.a)}. Isi ${kata(l.b)} lagi. Berapa semuanya? ${akhir}`;
      if (cara === "kanvas") return `Beri tanda pada ${kata(l.b)} kotak kosong berikutnya, mulai dari kotak kosong pertama. ${akhir}`;
      return `Ketuk kotak kosong berikutnya ${kata(l.b)} kali. ${akhir}`;
  }
}

/* ------------------------------ Simulasi Bedeng Mamah ------------------------------ */
export type Sayur = "timun" | "kentang" | "bawang";
export const URUT_SAYUR: Sayur[] = ["timun", "kentang", "bawang"];
export type KeadaanKebun = {
  alat: "kebun";
  sayur: Sayur;
  /** Bibit yang sudah tertanam sejak awal di bedeng. */
  mula: Record<Sayur, number>;
  /** Isi keranjang kiriman (bibit yang datang). */
  datang: Record<Sayur, number>;
  /** Berapa bibit dari keranjang yang sudah ditanam. */
  tanam: Record<Sayur, number>;
  /** Kalimat yang sudah dicatat, ditulis "a+b=c". */
  catat: Record<Sayur, string[]>;
};
export const awalKebun = (mula: Record<Sayur, number>, datang: Record<Sayur, number>): KeadaanKebun => ({
  alat: "kebun",
  sayur: "timun",
  mula,
  datang,
  tanam: { timun: 0, kentang: 0, bawang: 0 },
  catat: { timun: [], kentang: [], bawang: [] },
});
export const pilihSayur = (k: KeadaanKebun, sayur: Sayur): KeadaanKebun => ({ ...k, sayur });
export const semuanya = (k: KeadaanKebun, s: Sayur = k.sayur): number => k.mula[s] + k.tanam[s];
export const sisaKeranjang = (k: KeadaanKebun, s: Sayur = k.sayur): number => k.datang[s] - k.tanam[s];
/** Tanam satu bibit dari keranjang (d = 1) atau kembalikan ke keranjang (d = -1). Bedeng paling banyak sepuluh. */
export function tanamSatu(k: KeadaanKebun, d: 1 | -1): KeadaanKebun {
  const s = k.sayur;
  const n = k.tanam[s] + d;
  if (n < 0 || n > k.datang[s] || k.mula[s] + n > 10) return k;
  return { ...k, tanam: { ...k.tanam, [s]: n } };
}
export const teksCatat = (k: KeadaanKebun, s: Sayur = k.sayur): string => `${k.mula[s]}+${k.tanam[s]}=${semuanya(k, s)}`;
/** Catat kalimat sekarang (tanpa kembar). */
export function catatKalimat(k: KeadaanKebun): KeadaanKebun {
  const t = teksCatat(k);
  if (k.catat[k.sayur].includes(t)) return k;
  return { ...k, catat: { ...k.catat, [k.sayur]: [...k.catat[k.sayur], t] } };
}
export const kalimatKebun = (k: KeadaanKebun): string => {
  const s = k.sayur;
  return `${kapital(s)}: ${bacaKalimat([k.mula[s], k.tanam[s], semuanya(k, s)])}.`;
};
const kapital = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
