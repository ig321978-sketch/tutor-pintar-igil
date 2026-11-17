/**
 * Logika murni Kelas 1 Bab 3 Sub-Bab D "Tiba di Rumah Nenek" (soal cerita pengurangan) untuk tahap Mind-map, Infografis, Simulasi,
 * Concrete, Pictorial, dan Abstract. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-rumah-k1b3d.mjs.
 * Tempel label, kata bilangan, cara menjawab, dan kalimat pengurangan memakai ulang Sub-Bab A.
 */
import { bacaKalimat, kata, type Kalimat } from "../bekal-k1b3a/logika";
import type { Cara } from "../lemari-k1b1a/logika";

export { acak, cocok, cocokKelompok, kata, kelompokLabel, labelDari, IKON_CARA, NAMA_CARA, URUT_CARA, type Cara, type Label, type Tempat } from "../lemari-k1b1a/logika";
export { KURANG, bacaKalimat, samaKalimat, tulisKalimat, type Kalimat } from "../bekal-k1b3a/logika";

export type Metode = "igil" | "batang" | "cubes" | "sketsa";
export const URUT_METODE: Metode[] = ["igil", "batang", "cubes", "sketsa"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: baca, tulis, jawab, periksa",
  batang: "Bar Model: model batang",
  cubes: "CUBES: kotaki kata kunci",
  sketsa: "Draw a Picture: berkurang dua kali",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F3E0}", batang: "\u{1F4CF}", cubes: "\u{1F50E}", sketsa: "\u{270F}\u{FE0F}" };

export type Rupa = "benda" | "diagram" | "lambang";
export type Benda = "kue" | "jeruk" | "permen" | "teh" | "rambutan";
export const NAMA_BENDA: Record<Benda, string> = { kue: "kue", jeruk: "jeruk", permen: "permen", teh: "gelas teh", rambutan: "rambutan" };

export type Langkah =
  /** Baca cerita a berkurang b, lalu pilih kalimat pengurangan yang cocok. Tanpa jawaban angka. */
  | { tipe: "cerita"; benda: Benda; a: number; b: number; kata: string; pilihan: Kalimat[]; tokoh?: string }
  /** Baca cerita a berkurang b; ketuk yang pergi, lalu jawab sisanya. */
  | { tipe: "jawab"; benda: Benda; a: number; b: number; kata: string }
  /** Model batang: utuh a; cari sisa (b pergi) atau cari yang pergi (sisa b). Jawaban a − b. */
  | { tipe: "batang"; benda: Benda; a: number; b: number; cari: "sisa" | "pergi" }
  /** CUBES: pilih kata kunci yang berarti berkurang dari tiga kata, lalu jawab a − b. */
  | { tipe: "kunci"; benda: Benda; a: number; b: number; kata: string; pengecoh: [string, string] }
  /** Berkurang dua kali: a, pergi b, lalu pergi c. Jawaban a − b − c. */
  | { tipe: "dua"; benda: Benda; a: number; b: number; c: number };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

/** Kalimat cocok untuk cerita. */
export const kalimatCerita = (l: Extract<Langkah, { tipe: "cerita" }>): Kalimat => [l.a, l.b, l.a - l.b];
/** Cari kesalahan: kalimat keliru yang sudah ditulis tokoh (bilangan dari cerita, sisanya salah). Null bila bukan soal cari kesalahan. */
export const kalimatTokoh = (l: Extract<Langkah, { tipe: "cerita" }>): Kalimat | null =>
  l.tokoh ? (l.pilihan.find((p) => p[0] === l.a && p[1] === l.b && p[2] !== l.a - l.b) ?? null) : null;
export const nomorBenar = (l: Extract<Langkah, { tipe: "cerita" }>): number[] => {
  const t = kalimatCerita(l);
  return l.pilihan.map((p, i) => (p[0] === t[0] && p[1] === t[1] && p[2] === t[2] ? i : -1)).filter((i) => i >= 0);
};
/** Urutan tiga kata pada langkah kunci (kata benar di tengah, digeser oleh panjang data supaya tidak selalu di tempat yang sama). */
export const kataKunci = (l: Extract<Langkah, { tipe: "kunci" }>): string[] => {
  const tiga = [l.pengecoh[0], l.kata, l.pengecoh[1]];
  const geser = (l.a + l.b) % 3;
  return tiga.map((_, i) => tiga[(i + geser) % 3]);
};

/** Kunci tiap langkah, dihitung dari datanya. Null untuk cerita. */
export function kunciLangkah(l: Langkah): number | null {
  switch (l.tipe) {
    case "cerita":
      return null;
    case "dua":
      return l.a - l.b - l.c;
    default:
      return l.a - l.b;
  }
}
export const angkaJawab = kunciLangkah;

export function pilihanDari(l: Langkah): number[] {
  const k = kunciLangkah(l) ?? 0;
  const ada = [...new Set([k - 1, k, k + 1].filter((n) => n >= 0 && n <= 10))];
  for (let n = 0; ada.length < 3 && n <= 10; n += 1) if (!ada.includes(n)) ada.push(n);
  return ada.sort((p, q) => p - q);
}

/* ------------------------------ Teks cerita ------------------------------ */
type Bil = (n: number) => string;
const angka: Bil = (n) => String(n);
const kapital = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
/** Kalimat cerita tiap langkah. `bil` = angka (layar) atau kata (suara). */
export function teksCerita(l: Langkah, bil: Bil = angka): string[] {
  const nm = NAMA_BENDA[l.benda];
  switch (l.tipe) {
    case "cerita":
    case "jawab":
    case "kunci":
      return [`Ada ${bil(l.a)} ${nm}.`, `${kapital(bil(l.b))} ${nm} ${l.kata}.`, `Berapa ${nm} yang tersisa?`];
    case "batang":
      return l.cari === "sisa" ? [`Ada ${bil(l.a)} ${nm}.`, `${kapital(bil(l.b))} ${nm} dimakan.`, "Berapa yang tersisa?"] : [`Ada ${bil(l.a)} ${nm}.`, `Sekarang tinggal ${bil(l.b)}.`, "Berapa yang dimakan?"];
    case "dua":
      return [`Ada ${bil(l.a)} ${nm}.`, `${kapital(bil(l.b))} dimakan, lalu ${bil(l.c)} diberikan.`, "Berapa yang tersisa?"];
  }
}

/* ------------------------------ Instruksi (templat, tanpa digit) ------------------------------ */
const AKHIR: Record<Cara, string> = { klik: "Lalu pilih jawabannya.", kanvas: "Lalu tulis jawabannya di kanvas.", suara: "Lalu ucapkan jawabannya." };

export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  const akhir = AKHIR[cara];
  const cerita = teksCerita(l, kata).join(" ");
  switch (l.tipe) {
    case "cerita":
      if (l.tokoh) return `${cerita} Cari kesalahan. ${l.tokoh} sudah menjawab. Apakah benar? ${cara === "kanvas" ? "Lingkari" : "Ketuk"} kalimat yang benar.`;
      return `${cerita} ${cara === "kanvas" ? "Lingkari kalimat pengurangan yang cocok." : "Ketuk kalimat pengurangan yang cocok."}`;
    case "jawab":
      if (rupa === "lambang" || l.b === 0) return `${cerita} ${akhir}`;
      return `${cerita} Ketuk yang bergaris putus-putus supaya pergi. ${akhir}`;
    case "batang":
      if (rupa === "lambang") return `${cerita} ${akhir}`;
      if (cara === "kanvas") return `${cerita} Beri tanda pada tiap bagian yang dicari. ${akhir}`;
      return `${cerita} Ketuk tiap bagian yang dicari sambil menghitung. ${akhir}`;
    case "kunci":
      return `${cerita} ${cara === "kanvas" ? "Lingkari kata kunci yang berarti berkurang." : "Ketuk kata kunci yang berarti berkurang."} ${akhir}`;
    case "dua":
      if (rupa === "lambang") return `${cerita} ${akhir}`;
      if (cara === "kanvas") return `${cerita} Coret yang dimakan dan yang diberikan, satu coretan untuk satu benda. ${akhir}`;
      return `${cerita} Ketuk yang dimakan dulu, lalu yang diberikan. ${akhir}`;
  }
}

/* ------------------------------ Simulasi Pembuat Cerita Nenek ------------------------------ */
export const URUT_BENDA_SIM: Benda[] = ["kue", "jeruk", "teh", "rambutan"];
export const KATA_SIM = ["dimakan", "diberikan", "dibagikan", "diminum"] as const;
export type KeadaanCerita = {
  alat: "cerita";
  benda: Benda;
  a: number;
  b: number;
  kata: string;
  /** Jawaban sekarang sudah diperiksa dengan penjumlahan. */
  dicek: boolean;
  /** Berapa kali tombol Periksa ditekan. */
  diperiksa: number;
  /** Cerita yang sudah dikirim ke Nenek, ditulis "benda:kata:a-b=c". */
  kirim: string[];
};
export const awalCerita = (a: number, b: number): KeadaanCerita => ({ alat: "cerita", benda: "kue", a, b, kata: "dimakan", dicek: false, diperiksa: 0, kirim: [] });
export const pilihBenda = (k: KeadaanCerita, benda: Benda): KeadaanCerita => ({ ...k, benda, dicek: false });
export const pilihKata = (k: KeadaanCerita, kata: string): KeadaanCerita => ({ ...k, kata, dicek: false });
/** Ubah mula-mula (a) atau yang berkurang (b); b tidak lebih dari a, a satu sampai sepuluh. */
export function ubahCerita(k: KeadaanCerita, apa: "a" | "b", d: 1 | -1): KeadaanCerita {
  if (apa === "a") {
    const a = k.a + d;
    if (a < 1 || a > 10) return k;
    return { ...k, a, b: Math.min(k.b, a), dicek: false };
  }
  const b = k.b + d;
  if (b < 0 || b > k.a) return k;
  return { ...k, b, dicek: false };
}
export const sisaCerita = (k: KeadaanCerita): number => k.a - k.b;
export const periksaCerita = (k: KeadaanCerita): KeadaanCerita => ({ ...k, dicek: true, diperiksa: k.diperiksa + 1 });
export const teksKirim = (k: KeadaanCerita): string => `${k.benda}:${k.kata}:${k.a}-${k.b}=${sisaCerita(k)}`;
/** Kirim cerita sekarang ke Nenek (tanpa kembar). */
export function kirimCerita(k: KeadaanCerita): KeadaanCerita {
  const t = teksKirim(k);
  if (k.kirim.includes(t)) return k;
  return { ...k, kirim: [...k.kirim, t] };
}
export const ceritaSim = (k: KeadaanCerita): string[] => teksCerita({ tipe: "jawab", benda: k.benda, a: k.a, b: k.b, kata: k.kata });
export const jawabLengkap = (k: KeadaanCerita): string => `Jadi, tersisa ${sisaCerita(k)} ${NAMA_BENDA[k.benda]}.`;
export const bacaSim = (k: KeadaanCerita): string => `${kapital(bacaKalimat([k.a, k.b, sisaCerita(k)]))}. Jadi, tersisa ${kata(sisaCerita(k))} ${NAMA_BENDA[k.benda]}.`;
