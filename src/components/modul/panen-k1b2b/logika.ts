/**
 * Logika murni Kelas 1 Bab 2 Sub-Bab B "Panen Pertama dan Keranjang Sepuluh" (berbagai cara menjumlah) untuk tahap Mind-map,
 * Infografis, Simulasi, Concrete, Pictorial, dan Abstract. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-panen-k1b2b.mjs.
 * Tempel label, kata bilangan, cara menjawab, dan kalimat penjumlahan memakai ulang Sub-Bab A.
 */
import { bacaKalimat, kata, type Kalimat } from "../kebun-k1b2a/logika";
import type { Cara } from "../lemari-k1b1a/logika";

export { acak, cocok, cocokKelompok, kata, kelompokLabel, labelDari, IKON_CARA, NAMA_CARA, URUT_CARA, type Cara, type Label, type Tempat } from "../lemari-k1b1a/logika";
export { bacaKalimat, samaKalimat, tulisKalimat, type Kalimat } from "../kebun-k1b2a/logika";

export type Metode = "igil" | "garis" | "kembar" | "sepuluh";
export const URUT_METODE: Metode[] = ["igil", "garis", "kembar", "sepuluh"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: pasangan bilangan dan tukar tempat",
  garis: "Number Line: garis bilangan",
  kembar: "Doubles: penjumlahan kembar dan berulang",
  sepuluh: "Make Ten: membuat sepuluh",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F504}", garis: "\u{1F4CF}", kembar: "\u{1F46F}", sepuluh: "\u{1F51F}" };

export type Rupa = "benda" | "diagram" | "lambang";

export type Langkah =
  /** Dua keranjang ditukar tempatnya: pilih kalimat yang cocok dengan keranjang sesudah ditukar. Tanpa jawaban angka. */
  | { tipe: "tukar"; a: number; b: number; pilihan: Kalimat[] }
  /** Pasangan bilangan a dan b: tekan Tukar tempat, lalu berapa semuanya. */
  | { tipe: "pasangan"; a: number; b: number }
  /** Garis bilangan: mulai dari a, melompat b kali. */
  | { tipe: "garis"; a: number; b: number }
  /** Penjumlahan berulang: k kantong, tiap kantong berisi n. */
  | { tipe: "berulang"; n: number; k: number }
  /** Membuat sepuluh: bingkai berisi a, berapa lagi supaya sepuluh. */
  | { tipe: "sepuluh"; a: number };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; benda: string; langkah: LangkahSoal[] };

/** Kalimat cocok untuk tukar tempat: bilangan kanan dulu (b + a). */
export const kalimatTukar = (l: Extract<Langkah, { tipe: "tukar" }>): Kalimat => [l.b, l.a, l.a + l.b];
export const nomorTukar = (l: Extract<Langkah, { tipe: "tukar" }>): number[] => {
  const t = kalimatTukar(l);
  return l.pilihan.map((p, i) => (p[0] === t[0] && p[1] === t[1] && p[2] === t[2] ? i : -1)).filter((i) => i >= 0);
};

/** Kunci tiap langkah, dihitung dari datanya. Null untuk tukar. */
export function kunciLangkah(l: Langkah): number | null {
  switch (l.tipe) {
    case "tukar":
      return null;
    case "pasangan":
    case "garis":
      return l.a + l.b;
    case "berulang":
      return l.n * l.k;
    case "sepuluh":
      return 10 - l.a;
  }
}
export const angkaJawab = kunciLangkah;

export function pilihanDari(l: Langkah): number[] {
  const k = kunciLangkah(l) ?? 0;
  const ada = [...new Set([k - 1, k, k + 1].filter((n) => n >= 0 && n <= 10))];
  for (let n = 0; ada.length < 3 && n <= 10; n += 1) if (!ada.includes(n)) ada.push(n);
  return ada.sort((p, q) => p - q);
}

/** Kalimat penjumlahan berulang, mis. 2 + 2 + 2 = 6. */
export const tulisBerulang = (n: number, k: number): string => `${Array.from({ length: k }, () => n).join(" + ")} = ${n * k}`;
export const bacaBerulang = (n: number, k: number): string => `${Array.from({ length: k }, () => kata(n)).join(" ditambah ")} sama dengan ${kata(n * k)}`;

/* ------------------------------ Instruksi (templat, tanpa digit) ------------------------------ */
const AKHIR: Record<Cara, string> = { klik: "Lalu pilih jawabannya.", kanvas: "Lalu tulis angkanya di kanvas.", suara: "Lalu ucapkan jawabannya." };

export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  const akhir = AKHIR[cara];
  switch (l.tipe) {
    case "tukar":
      return cara === "kanvas" ? "Keranjang sudah ditukar tempatnya. Lingkari kalimat yang cocok dengan keranjang sesudah ditukar." : "Keranjang sudah ditukar tempatnya. Ketuk kalimat yang cocok dengan keranjang sesudah ditukar.";
    case "pasangan":
      if (rupa === "lambang") return `Pasangan ${kata(l.a)} dan ${kata(l.b)}. Kalau ditukar tempat, hasilnya tetap sama. Berapa semuanya? ${akhir}`;
      return `Tekan Tukar tempat dan lihat hasilnya tetap sama. Berapa semuanya? ${akhir}`;
    case "garis":
      if (rupa === "lambang") return `Mulai dari ${kata(l.a)}, lalu melompat ${kata(l.b)} kali. ${akhir}`;
      if (cara === "kanvas") return `Mulai dari angka yang ditandai. Beri tanda pada tiap angka tempat mendarat. ${akhir}`;
      return `Mulai dari angka yang ditandai. Ketuk angka berikutnya untuk melompat ${kata(l.b)} kali. ${akhir}`;
    case "berulang":
      if (rupa === "lambang") return `Bilangan yang sama ditambahkan berulang. Berapa hasilnya? ${akhir}`;
      if (cara === "kanvas") return `Tiap kantong berisi sama banyak. Beri satu tanda pada tiap kantong sambil menghitung lompat. ${akhir}`;
      return `Tiap kantong berisi sama banyak. Ketuk kantong satu per satu dari kiri sambil menghitung lompat. ${akhir}`;
    case "sepuluh":
      if (rupa === "lambang") return `Berapa lagi supaya menjadi sepuluh? ${akhir}`;
      if (cara === "kanvas") return `Beri satu tanda pada tiap kotak yang masih kosong. ${akhir}`;
      return l.a === 10 ? `Lihat bingkainya. Berapa lagi supaya sepuluh? ${akhir}` : `Ketuk kotak kosong sampai bingkai penuh sepuluh. ${akhir}`;
  }
}

/* ------------------------------ Simulasi Meja Kemas ------------------------------ */
export type KeadaanPanen = {
  alat: "panen";
  /** Isi keranjang kiri dan kanan. */
  a: number;
  b: number;
  /** Berapa kali Tukar tempat ditekan saat isi kedua keranjang berbeda. */
  ditukar: number;
  /** Kalimat yang dicatat, ditulis "a+b=c". */
  catat: string[];
};
export const MUAT = 10;
export const awalPanen = (a: number, b: number): KeadaanPanen => ({ alat: "panen", a, b, ditukar: 0, catat: [] });
/** Tambah (d = 1) atau ambil (d = -1) satu sayur di keranjang kiri atau kanan. Jumlah paling banyak sepuluh. */
export function ubahIsi(k: KeadaanPanen, sisi: "a" | "b", d: 1 | -1): KeadaanPanen {
  const n = k[sisi] + d;
  if (n < 0 || k.a + k.b + d > MUAT) return k;
  return { ...k, [sisi]: n };
}
export const tukarTempat = (k: KeadaanPanen): KeadaanPanen => ({ ...k, a: k.b, b: k.a, ditukar: k.ditukar + (k.a !== k.b ? 1 : 0) });
export const teksPanen = (k: KeadaanPanen): string => `${k.a}+${k.b}=${k.a + k.b}`;
export function catatPanen(k: KeadaanPanen): KeadaanPanen {
  const t = teksPanen(k);
  return k.catat.includes(t) ? k : { ...k, catat: [...k.catat, t] };
}
export const kalimatPanen = (k: KeadaanPanen): string => {
  const c = k.a + k.b;
  const kh = k.a === k.b && k.a > 0 ? " Kembar!" : "";
  const sp = c === MUAT ? " Penuh sepuluh!" : ` Perlu ${kata(MUAT - c)} lagi supaya sepuluh.`;
  return `${kapital(bacaKalimat([k.a, k.b, c]))}.${kh}${sp}`;
};
const kapital = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
