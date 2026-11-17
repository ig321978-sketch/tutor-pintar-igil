/**
 * Logika murni Kelas 1 Bab 3 Sub-Bab C "Kondektur dan Penumpang" (hubungan penjumlahan dan pengurangan) untuk tahap Mind-map,
 * Infografis, Simulasi, Concrete, Pictorial, dan Abstract. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-kondektur-k1b3c.mjs.
 * Tempel label, kata bilangan, dan cara menjawab memakai ulang Kelas 1 Bab 1 Sub-Bab A.
 */
import { kata } from "../lemari-k1b1a/logika";
import type { Cara } from "../lemari-k1b1a/logika";
import { KURANG } from "../bekal-k1b3a/logika";

export { acak, cocok, cocokKelompok, kata, kelompokLabel, labelDari, IKON_CARA, NAMA_CARA, URUT_CARA, type Cara, type Label, type Tempat } from "../lemari-k1b1a/logika";
export { KURANG } from "../bekal-k1b3a/logika";

export type Metode = "igil" | "keluarga" | "segitiga" | "pikir";
export const URUT_METODE: Metode[] = ["igil", "keluarga", "segitiga", "pikir"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: tukar tempat dan periksa",
  keluarga: "Fact Family: keluarga fakta",
  segitiga: "Fact Triangle: segitiga fakta",
  pikir: "Think Addition: berpikir penjumlahan",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F686}", keluarga: "\u{1F46A}", segitiga: "\u{1F53A}", pikir: "\u{1F9E0}" };

export type Rupa = "benda" | "diagram" | "lambang";
/** Kalimat dengan tanda: x op y = z (boleh salah, untuk pilihan). */
export type KalimatOp = { x: number; op: "+" | "-"; y: number; z: number };

export type Langkah =
  /** Kondektur menulis a − b = a − b; pilih penjumlahan yang memeriksanya: (a − b) + b = a. Tanpa jawaban angka. */
  | { tipe: "periksa"; a: number; b: number; pilihan: KalimatOp[] }
  /** Tukar tempat: a + b sama dengan b + a; berapa hasilnya. */
  | { tipe: "tukar"; a: number; b: number }
  /** Keluarga x, y, x + y: berapa (x + y) − x. */
  | { tipe: "keluarga"; x: number; y: number }
  /** Segitiga fakta pucuk x + y, pojok x dan y; satu tertutup (pucuk atau pojok y). */
  | { tipe: "segitiga"; x: number; y: number; tutup: "z" | "y" }
  /** Bilangan hilang: a + ? = a + b; cari b dengan hitung maju. */
  | { tipe: "hilang"; a: number; b: number };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; benda: string; langkah: LangkahSoal[] };

const tanda = (op: KalimatOp["op"]) => (op === "+" ? "+" : KURANG);
export const tulisOp = (k: KalimatOp): string => `${k.x} ${tanda(k.op)} ${k.y} = ${k.z}`;
export const bacaOp = (k: KalimatOp): string => `${kata(k.x)} ${k.op === "+" ? "ditambah" : "dikurangi"} ${kata(k.y)} sama dengan ${kata(k.z)}`;
export const samaOp = (p: KalimatOp, q: KalimatOp): boolean => p.x === q.x && p.op === q.op && p.y === q.y && p.z === q.z;
export const benarOp = (k: KalimatOp): boolean => (k.op === "+" ? k.x + k.y === k.z : k.x - k.y === k.z);
/** Penjumlahan pemeriksa a − b: sisa ditambah yang pergi sama dengan mula-mula. */
export const pemeriksa = (l: Extract<Langkah, { tipe: "periksa" }>): KalimatOp => ({ x: l.a - l.b, op: "+", y: l.b, z: l.a });
export const nomorBenar = (l: Extract<Langkah, { tipe: "periksa" }>): number[] => l.pilihan.map((p, i) => (samaOp(p, pemeriksa(l)) ? i : -1)).filter((i) => i >= 0);

/** Tiga bilangan keluarga tiap langkah (kecil, kecil, besar), untuk memeriksa pasangan Story. */
export function keluargaLangkah(l: Langkah): [number, number, number] {
  switch (l.tipe) {
    case "periksa":
      return [l.b, l.a - l.b, l.a];
    case "tukar":
    case "hilang":
      return [l.a, l.b, l.a + l.b];
    default:
      return [l.x, l.y, l.x + l.y];
  }
}

/** Kunci tiap langkah, dihitung dari datanya. Null untuk periksa. */
export function kunciLangkah(l: Langkah): number | null {
  switch (l.tipe) {
    case "periksa":
      return null;
    case "tukar":
      return l.a + l.b;
    case "keluarga":
      return l.y;
    case "segitiga":
      return l.tutup === "z" ? l.x + l.y : l.y;
    case "hilang":
      return l.b;
  }
}
export const angkaJawab = kunciLangkah;
/** Kalimat jawaban lengkap (untuk pesan benar). */
export function kalimatJawab(l: Langkah): KalimatOp | null {
  switch (l.tipe) {
    case "periksa":
      return null;
    case "tukar":
      return { x: l.b, op: "+", y: l.a, z: l.a + l.b };
    case "keluarga":
      return { x: l.x + l.y, op: "-", y: l.x, z: l.y };
    case "segitiga":
      return l.tutup === "z" ? { x: l.x, op: "+", y: l.y, z: l.x + l.y } : { x: l.x + l.y, op: "-", y: l.x, z: l.y };
    case "hilang":
      return { x: l.a, op: "+", y: l.b, z: l.a + l.b };
  }
}

export function pilihanDari(l: Langkah): number[] {
  const k = kunciLangkah(l) ?? 0;
  const ada = [...new Set([k - 1, k, k + 1].filter((n) => n >= 0 && n <= 10))];
  for (let n = 0; ada.length < 3 && n <= 10; n += 1) if (!ada.includes(n)) ada.push(n);
  return ada.sort((p, q) => p - q);
}

/* ------------------------------ Instruksi (templat, tanpa digit) ------------------------------ */
const AKHIR: Record<Cara, string> = { klik: "Lalu pilih jawabannya.", kanvas: "Lalu tulis jawabannya di kanvas.", suara: "Lalu ucapkan jawabannya." };
const benda = (r: Rupa) => (r === "benda" ? "penumpang" : "titik");

export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  const akhir = AKHIR[cara];
  switch (l.tipe) {
    case "periksa":
      return cara === "kanvas" ? "Lingkari penjumlahan yang memeriksa catatan pengurangan itu." : "Ketuk penjumlahan yang memeriksa catatan pengurangan itu.";
    case "tukar":
      if (rupa === "lambang") return `${kata(l.a)} ditambah ${kata(l.b)} sama dengan ${kata(l.b)} ditambah ${kata(l.a)}. Berapa hasilnya? ${akhir}`;
      return `Tekan tukar tempat. Hasilnya tetap sama. Berapa semuanya? ${akhir}`;
    case "keluarga":
      if (rupa === "lambang") return `Keluarga ${kata(l.x)}, ${kata(l.y)}, dan ${kata(l.x + l.y)}. Lengkapi kalimat yang kosong. ${akhir}`;
      if (cara === "kanvas") return `Beri tanda pada tiap ${benda(rupa)} berwarna biru, karena biru yang turun. ${akhir}`;
      return `Ketuk tiap ${benda(rupa)} berwarna biru supaya turun. ${akhir}`;
    case "segitiga":
      if (rupa === "lambang") return `Segitiga fakta dengan satu bilangan tertutup. Cari bilangan yang tertutup. ${akhir}`;
      if (l.tutup === "z") return cara === "kanvas" ? `Pucuk tertutup. Beri tanda pada tiap ${benda(rupa)} di dua pojok bawah. ${akhir}` : `Pucuk tertutup. Ketuk tiap ${benda(rupa)} di dua pojok bawah sambil menghitung. ${akhir}`;
      return cara === "kanvas" ? `Pojok kanan tertutup. Lingkari ${benda(rupa)} di pucuk yang tidak ada di pojok kiri. ${akhir}` : `Pojok kanan tertutup. Ketuk ${benda(rupa)} di pucuk yang tidak ada di pojok kiri. ${akhir}`;
    case "hilang":
      if (rupa === "lambang") return `${kata(l.a)} ditambah berapa sama dengan ${kata(l.a + l.b)}? ${akhir}`;
      if (cara === "kanvas") return `Beri tanda pada tiap kursi kosong sambil menghitung maju dari ${kata(l.a)}. ${akhir}`;
      return `Mulai dari ${kata(l.a)}. Ketuk tiap kursi kosong sambil menghitung maju. ${akhir}`;
  }
}

/* ------------------------------ Simulasi Papan Kondektur ------------------------------ */
export type Pojok = "x" | "y" | "z";
export type KeadaanKeluarga = {
  alat: "keluarga";
  /** Penumpang biru (bagian pertama) dan merah (bagian kedua); semuanya x + y, paling banyak sepuluh. */
  x: number;
  y: number;
  /** Pojok segitiga yang sedang ditutup. */
  tutup: Pojok | null;
  /** Pojok yang pernah ditutup lalu dibuka dengan benar. */
  dibuka: Pojok[];
  /** Kalimat yang sudah dicatat, ditulis "x+y=z" atau "z-x=y". */
  catat: string[];
};
export const awalKeluarga = (x: number, y: number): KeadaanKeluarga => ({ alat: "keluarga", x, y, tutup: null, dibuka: [], catat: [] });
/** Ubah banyak penumpang biru (x) atau merah (y); semuanya tidak lebih dari sepuluh. */
export function ubahBagian(k: KeadaanKeluarga, bagian: "x" | "y", d: 1 | -1): KeadaanKeluarga {
  const n = k[bagian] + d;
  const lain = bagian === "x" ? k.y : k.x;
  if (n < 0 || n + lain > 10) return k;
  return { ...k, [bagian]: n, tutup: null };
}
/** Empat kalimat keluarga: dua penjumlahan dan dua pengurangan. */
export const empatKalimat = (k: KeadaanKeluarga): [string, string, string, string] => {
  const z = k.x + k.y;
  return [`${k.x}+${k.y}=${z}`, `${k.y}+${k.x}=${z}`, `${z}-${k.x}=${k.y}`, `${z}-${k.y}=${k.x}`];
};
export function catatKeluarga(k: KeadaanKeluarga, i: 0 | 1 | 2 | 3): KeadaanKeluarga {
  const t = empatKalimat(k)[i];
  if (k.catat.includes(t)) return k;
  return { ...k, catat: [...k.catat, t] };
}
export const tutupPojok = (k: KeadaanKeluarga, p: Pojok): KeadaanKeluarga => ({ ...k, tutup: k.tutup === p ? null : p });
export const nilaiPojok = (k: KeadaanKeluarga, p: Pojok): number => (p === "x" ? k.x : p === "y" ? k.y : k.x + k.y);
/** Tebak bilangan yang tertutup; benar = pojok dibuka dan dicatat di `dibuka`. */
export function tebakPojok(k: KeadaanKeluarga, n: number): { benar: boolean; k: KeadaanKeluarga } {
  if (!k.tutup) return { benar: false, k };
  if (nilaiPojok(k, k.tutup) !== n) return { benar: false, k };
  const p = k.tutup;
  return { benar: true, k: { ...k, tutup: null, dibuka: k.dibuka.includes(p) ? k.dibuka : [...k.dibuka, p] } };
}
const bacaTeks = (t: string): string => {
  const [x, op, y, z] = t.split(/([+-])|=/).filter((v) => v !== undefined && v !== "");
  return `${kata(Number(x))} ${op === "+" ? "ditambah" : "dikurangi"} ${kata(Number(y))} sama dengan ${kata(Number(z))}`;
};
export const bacaCatat = bacaTeks;
