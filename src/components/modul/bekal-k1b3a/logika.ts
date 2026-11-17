/**
 * Logika murni Kelas 1 Bab 3 Sub-Bab A "Bekal untuk Nenek" (cerita pengurangan) untuk tahap Mind-map, Infografis, Simulasi,
 * Concrete, Pictorial, dan Abstract. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-bekal-k1b3a.mjs.
 * Tempel label, kata bilangan, dan cara menjawab memakai ulang Kelas 1 Bab 1 Sub-Bab A.
 */
import { kata } from "../lemari-k1b1a/logika";
import type { Cara } from "../lemari-k1b1a/logika";

export { acak, cocok, cocokKelompok, kata, kelompokLabel, labelDari, IKON_CARA, NAMA_CARA, URUT_CARA, type Cara, type Label, type Tempat } from "../lemari-k1b1a/logika";

export type Metode = "igil" | "ambil" | "mundur" | "bingkai";
export const URUT_METODE: Metode[] = ["igil", "ambil", "mundur", "bingkai"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: mula-mula, berkurang, sisa",
  ambil: "Take Away: mengambil",
  mundur: "Counting Back: menghitung mundur",
  bingkai: "Ten Frame: bingkai sepuluh",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F686}", ambil: "\u{270B}", mundur: "\u{23EA}", bingkai: "\u{1F51F}" };

/** Lambang kurang untuk layar (tanda minus). */
export const KURANG = "−";

export type Rupa = "benda" | "diagram" | "lambang";
/** Kalimat pengurangan a − b = c (boleh salah, untuk pilihan). */
export type Kalimat = [number, number, number];

export type Langkah =
  /** Pilih kalimat pengurangan yang cocok dengan adegan: bekal dimakan atau penumpang turun. Tanpa jawaban angka. */
  | { tipe: "kalimat"; a: number; b: number; adegan: "makan" | "turun"; pilihan: Kalimat[]; tokoh?: string }
  /** Ada a, b pergi (sudah ditandai): ketuk yang pergi supaya keluar, lalu berapa sisanya. */
  | { tipe: "pergi"; a: number; b: number }
  /** Mengambil: ambil (coret) b benda mana saja dari a, lalu hitung yang tinggal. */
  | { tipe: "ambil"; a: number; b: number }
  /** Menghitung mundur: mulai dari a di ujung kanan, mundur b langkah ke kiri. */
  | { tipe: "mundur"; a: number; b: number }
  /** Bingkai sepuluh berisi a, kosongkan b sekat dari belakang. */
  | { tipe: "bingkai"; a: number; b: number };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; benda: string; langkah: LangkahSoal[] };

/** Kalimat benar untuk a dan b. */
export const kalimatBenar = (a: number, b: number): Kalimat => [a, b, a - b];
export const samaKalimat = (p: Kalimat, q: Kalimat): boolean => p[0] === q[0] && p[1] === q[1] && p[2] === q[2];
/** Kalimat cocok dengan adegan: bilangannya a lalu b dan hasilnya benar. */
export const kalimatCocok = (l: Extract<Langkah, { tipe: "kalimat" }>, p: Kalimat): boolean => samaKalimat(p, kalimatBenar(l.a, l.b));
export const nomorBenar = (l: Extract<Langkah, { tipe: "kalimat" }>): number[] => l.pilihan.map((p, i) => (kalimatCocok(l, p) ? i : -1)).filter((i) => i >= 0);
/** Cari kesalahan: kalimat keliru yang sudah ditulis tokoh (bilangan dari cerita, sisanya salah). Null bila bukan soal cari kesalahan. */
export const kalimatTokoh = (l: Extract<Langkah, { tipe: "kalimat" }>): Kalimat | null =>
  l.tokoh ? (l.pilihan.find((p) => p[0] === l.a && p[1] === l.b && p[2] !== l.a - l.b) ?? null) : null;
export const tulisKalimat = (p: Kalimat): string => `${p[0]} ${KURANG} ${p[1]} = ${p[2]}`;
/** Kalimat dibaca dengan kata (untuk suara, tanpa digit). */
export const bacaKalimat = (p: Kalimat): string => `${kata(p[0])} dikurangi ${kata(p[1])} sama dengan ${kata(p[2])}`;

/** Kunci tiap langkah, dihitung dari datanya. Null untuk kalimat. */
export const kunciLangkah = (l: Langkah): number | null => (l.tipe === "kalimat" ? null : l.a - l.b);
export const angkaJawab = kunciLangkah;

export function pilihanDari(l: Langkah): number[] {
  const k = kunciLangkah(l) ?? 0;
  const ada = [...new Set([k - 1, k, k + 1].filter((n) => n >= 0 && n <= 10))];
  for (let n = 0; ada.length < 3 && n <= 10; n += 1) if (!ada.includes(n)) ada.push(n);
  return ada.sort((p, q) => p - q);
}

/* ------------------------------ Instruksi (templat, tanpa digit) ------------------------------ */
const AKHIR: Record<Cara, string> = { klik: "Lalu pilih sisanya.", kanvas: "Lalu tulis sisanya di kanvas.", suara: "Lalu ucapkan sisanya." };
const benda = (r: Rupa) => (r === "benda" ? "benda" : r === "diagram" ? "titik" : "angka");

export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  const akhir = AKHIR[cara];
  switch (l.tipe) {
    case "kalimat":
      if (l.tokoh) return `Cari kesalahan. ${l.tokoh} sudah menulis kalimat untuk cerita ini. Apakah benar? ${cara === "kanvas" ? "Lingkari" : "Ketuk"} kalimat yang benar.`;
      return cara === "kanvas" ? "Lingkari kalimat pengurangan yang cocok dengan ceritanya." : "Ketuk kalimat pengurangan yang cocok dengan ceritanya.";
    case "pergi":
      if (rupa === "lambang") return `Mula-mula ${kata(l.a)}, pergi ${kata(l.b)}. Berapa sisanya? ${akhir}`;
      if (l.b === 0) return `Lihat baik-baik. Tidak ada yang bergaris putus-putus, jadi tidak ada yang pergi. ${akhir}`;
      if (cara === "kanvas") return `Beri satu tanda pada tiap ${benda(rupa)} yang bergaris putus-putus, karena itu yang pergi. ${akhir}`;
      return `Ketuk tiap ${benda(rupa)} yang bergaris putus-putus supaya pergi. ${akhir}`;
    case "ambil":
      if (rupa === "lambang") return `Ada ${kata(l.a)}, diambil ${kata(l.b)}. Berapa yang tinggal? ${akhir}`;
      if (cara === "kanvas") return `Coret ${kata(l.b)} ${benda(rupa)}, mana saja, satu coretan untuk satu ${benda(rupa)}. ${akhir}`;
      return `Ketuk ${kata(l.b)} ${benda(rupa)}, mana saja, supaya diambil. ${akhir}`;
    case "mundur":
      if (rupa === "lambang") return `Mulai dari ${kata(l.a)}, lalu hitung mundur ${kata(l.b)} kali. ${akhir}`;
      if (cara === "kanvas") return `Mulai dari ujung kanan. Beri tanda pada ${kata(l.b)} ${benda(rupa)} paling kanan sambil menghitung mundur. ${akhir}`;
      return `Mulai dari angka di ujung kanan. Ketuk ${benda(rupa)} dari kanan sambil menghitung mundur ${kata(l.b)} kali. ${akhir}`;
    case "bingkai":
      if (rupa === "lambang") return `Bingkai sepuluh berisi ${kata(l.a)}. Kosongkan ${kata(l.b)}. Berapa sisanya? ${akhir}`;
      if (l.b === 0) return `Bingkai berisi ${kata(l.a)}. Tidak ada sekat yang dikosongkan. ${akhir}`;
      if (cara === "kanvas") return `Beri tanda pada ${kata(l.b)} sekat terisi yang paling belakang. ${akhir}`;
      return `Ketuk sekat terisi yang paling belakang ${kata(l.b)} kali supaya kosong. ${akhir}`;
  }
}

/* ------------------------------ Simulasi Kotak Bekal ------------------------------ */
export type Bekal = "roti" | "jeruk" | "pisang";
export const URUT_BEKAL: Bekal[] = ["roti", "jeruk", "pisang"];
export type KeadaanBekal = {
  alat: "bekal";
  bekal: Bekal;
  /** Isi kotak mula-mula (bingkai sepuluh). */
  mula: Record<Bekal, number>;
  /** Berapa yang sudah diambil (dimakan) dari kotak. */
  ambil: Record<Bekal, number>;
  /** Kalimat yang sudah dicatat, ditulis "a-b=c". */
  catat: Record<Bekal, string[]>;
};
export const awalBekal = (mula: Record<Bekal, number>): KeadaanBekal => ({
  alat: "bekal",
  bekal: "roti",
  mula,
  ambil: { roti: 0, jeruk: 0, pisang: 0 },
  catat: { roti: [], jeruk: [], pisang: [] },
});
export const pilihBekal = (k: KeadaanBekal, bekal: Bekal): KeadaanBekal => ({ ...k, bekal });
export const sisaBekal = (k: KeadaanBekal, s: Bekal = k.bekal): number => k.mula[s] - k.ambil[s];
/** Ambil satu dari belakang kotak (d = 1) atau kembalikan satu (d = -1). Tidak di bawah nol, tidak lebih dari isi mula-mula. */
export function ambilSatu(k: KeadaanBekal, d: 1 | -1): KeadaanBekal {
  const s = k.bekal;
  const n = k.ambil[s] + d;
  if (n < 0 || n > k.mula[s]) return k;
  return { ...k, ambil: { ...k.ambil, [s]: n } };
}
export const teksCatat = (k: KeadaanBekal, s: Bekal = k.bekal): string => `${k.mula[s]}-${k.ambil[s]}=${sisaBekal(k, s)}`;
/** Catat kalimat sekarang (tanpa kembar). */
export function catatKalimat(k: KeadaanBekal): KeadaanBekal {
  const t = teksCatat(k);
  if (k.catat[k.bekal].includes(t)) return k;
  return { ...k, catat: { ...k.catat, [k.bekal]: [...k.catat[k.bekal], t] } };
}
const kapital = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
export const kalimatBekal = (k: KeadaanBekal): string => {
  const s = k.bekal;
  return `${kapital(s)}: ${bacaKalimat([k.mula[s], k.ambil[s], sisaBekal(k, s)])}.`;
};
