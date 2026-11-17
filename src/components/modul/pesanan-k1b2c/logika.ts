/**
 * Logika murni Kelas 1 Bab 2 Sub-Bab C "Pesanan Tetangga" (soal cerita penjumlahan) untuk tahap Mind-map, Infografis, Simulasi,
 * Concrete, Pictorial, dan Abstract. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-pesanan-k1b2c.mjs.
 * Tempel label, kata bilangan, cara menjawab, dan kalimat penjumlahan memakai ulang Sub-Bab A.
 */
import { bacaKalimat, kata, type Kalimat } from "../kebun-k1b2a/logika";
import type { Cara } from "../lemari-k1b1a/logika";

export { acak, cocok, cocokKelompok, kata, kelompokLabel, labelDari, IKON_CARA, NAMA_CARA, URUT_CARA, type Cara, type Label, type Tempat } from "../lemari-k1b1a/logika";
export { bacaKalimat, samaKalimat, tulisKalimat, type Kalimat } from "../kebun-k1b2a/logika";

export type Metode = "igil" | "peraga" | "gambar" | "batang";
export const URUT_METODE: Metode[] = ["igil", "peraga", "gambar", "batang"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: baca, cari bilangan, tulis, jawab",
  peraga: "Act It Out: peragakan",
  gambar: "Read-Draw-Write: baca, gambar, tulis",
  batang: "Bar Model: model batang",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F4E8}", peraga: "\u{1F450}", gambar: "\u{270F}\u{FE0F}", batang: "\u{1F4CA}" };

export type Rupa = "benda" | "diagram" | "lambang";
export type Jenis = "gabung" | "datang";

/** Cerita pesanan dengan kata (tanpa digit). `n` = nama sayur. */
export const kisah = (jenis: Jenis, a: number, b: number, n: string): string =>
  jenis === "gabung"
    ? `Kantong kiri berisi ${kata(a)} ${n}. Kantong kanan berisi ${kata(b)} ${n}. Berapa ${n} semuanya?`
    : `Ada ${kata(a)} ${n} di meja. Tetangga memesan ${kata(b)} ${n} lagi. Berapa ${n} semuanya?`;

export type Langkah =
  /** Pilih kalimat penjumlahan yang cocok dengan cerita. Tanpa jawaban angka. */
  | { tipe: "kalimat"; a: number; b: number; jenis: Jenis; pilihan: Kalimat[] }
  /** Ketuk dua bilangan dalam cerita, lalu berapa semuanya. */
  | { tipe: "cerita"; a: number; b: number; jenis: Jenis }
  /** Peragakan: pindahkan semua benda dari dua rak ke kantong pesanan. */
  | { tipe: "peraga"; a: number; b: number; jenis: Jenis }
  /** Baca-gambar-tulis: gambar a titik di baris atas dan b titik di baris bawah. */
  | { tipe: "gambar"; a: number; b: number; jenis: Jenis }
  /** Model batang: dua batang disambung menjadi semuanya. */
  | { tipe: "batang"; a: number; b: number; jenis: Jenis };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; benda: string; nama: string; langkah: LangkahSoal[] };

export const kalimatCocok = (l: Extract<Langkah, { tipe: "kalimat" }>, p: Kalimat): boolean => p[0] === l.a && p[1] === l.b && p[2] === l.a + l.b;
export const nomorBenar = (l: Extract<Langkah, { tipe: "kalimat" }>): number[] => l.pilihan.map((p, i) => (kalimatCocok(l, p) ? i : -1)).filter((i) => i >= 0);

/** Kunci tiap langkah: semuanya a + b. Null untuk kalimat. */
export const kunciLangkah = (l: Langkah): number | null => (l.tipe === "kalimat" ? null : l.a + l.b);
export const angkaJawab = kunciLangkah;

export function pilihanDari(l: Langkah): number[] {
  const k = kunciLangkah(l) ?? 0;
  const ada = [...new Set([k - 1, k, k + 1].filter((n) => n >= 0 && n <= 10))];
  for (let n = 0; ada.length < 3 && n <= 10; n += 1) if (!ada.includes(n)) ada.push(n);
  return ada.sort((p, q) => p - q);
}

/** Kata-kata cerita (untuk diketuk); nomor kata yang merupakan bilangan a dan b. */
export const kataCerita = (l: Langkah, n: string): string[] => kisah(l.jenis, l.a, l.b, n).split(/\s+/).filter(Boolean);
export function nomorBilangan(l: Langkah, n: string): number[] {
  const ks = kataCerita(l, n).map((k) => k.toLowerCase().replace(/[^a-z]/g, ""));
  const ia = ks.indexOf(kata(l.a));
  const ib = ks.indexOf(kata(l.b), ia + 1);
  return [ia, ib];
}
/** Jawaban kalimat lengkap. */
export const jawabLengkap = (l: Langkah, n: string): string => `Jadi, ${kata(l.a + l.b)} ${n}.`;

/* ------------------------------ Instruksi (templat, tanpa digit) ------------------------------ */
const AKHIR: Record<Cara, string> = { klik: "Lalu pilih jawabannya.", kanvas: "Lalu tulis angkanya di kanvas.", suara: "Lalu ucapkan jawabannya." };

export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, n: string): string {
  const akhir = AKHIR[cara];
  const c = kisah(l.jenis, l.a, l.b, n);
  switch (l.tipe) {
    case "kalimat":
      return `${c} ${cara === "kanvas" ? "Lingkari" : "Ketuk"} kalimat penjumlahan yang cocok.`;
    case "cerita":
      return `${c} Ketuk dua bilangan dalam cerita. ${akhir}`;
    case "peraga":
      if (rupa === "lambang") return `${c} Bayangkan semua digabung. ${akhir}`;
      if (cara === "kanvas") return `${c} Beri satu tanda pada tiap ${rupa === "benda" ? n : "titik"} di kedua rak. ${akhir}`;
      return `${c} Peragakan: ketuk semua ${rupa === "benda" ? n : "titik"} supaya masuk ke kantong pesanan. ${akhir}`;
    case "gambar":
      if (rupa === "lambang") return `${c} Bayangkan gambarnya, lalu tulis kalimatnya. ${akhir}`;
      if (cara === "kanvas") return `${c} Gambar ${kata(l.a)} titik di baris atas dan ${kata(l.b)} titik di baris bawah. ${akhir}`;
      return `${c} Ketuk kotak untuk menggambar ${kata(l.a)} titik di baris atas dan ${kata(l.b)} titik di baris bawah. ${akhir}`;
    case "batang":
      if (rupa === "lambang") return `${c} Lihat model batang. Berapa semuanya? ${akhir}`;
      if (cara === "kanvas") return `${c} Beri satu tanda pada tiap kotak di kedua batang. ${akhir}`;
      return `${c} Tekan Sambung supaya dua batang menjadi satu. ${akhir}`;
  }
}

/* ------------------------------ Simulasi Pembuat Pesanan ------------------------------ */
export type SayurPesan = "tomat" | "timun" | "wortel";
export const URUT_SAYUR_PESAN: SayurPesan[] = ["tomat", "timun", "wortel"];
export type KeadaanPesanan = {
  alat: "pesanan";
  sayur: SayurPesan;
  jenis: Jenis;
  a: number;
  b: number;
  /** Berapa kali Periksa dengan tukar tempat ditekan saat a dan b berbeda. */
  diperiksa: number;
  /** Pesanan terkirim, ditulis "jenis:a+b=c:sayur". */
  kirim: string[];
};
export const awalPesanan = (): KeadaanPesanan => ({ alat: "pesanan", sayur: "tomat", jenis: "datang", a: 1, b: 1, diperiksa: 0, kirim: [] });
export function ubahBilangan(k: KeadaanPesanan, sisi: "a" | "b", d: 1 | -1): KeadaanPesanan {
  const n = k[sisi] + d;
  if (n < 0 || k.a + k.b + d > 10) return k;
  return { ...k, [sisi]: n };
}
export const periksaTukar = (k: KeadaanPesanan): KeadaanPesanan => ({ ...k, diperiksa: k.diperiksa + (k.a !== k.b ? 1 : 0) });
export const teksKirim = (k: KeadaanPesanan): string => `${k.jenis}:${k.a}+${k.b}=${k.a + k.b}:${k.sayur}`;
export function kirimPesanan(k: KeadaanPesanan): KeadaanPesanan {
  const t = teksKirim(k);
  return k.kirim.includes(t) ? k : { ...k, kirim: [...k.kirim, t] };
}
export const ceritaPesanan = (k: KeadaanPesanan): string => kisah(k.jenis, k.a, k.b, k.sayur);
export const jawabanPesanan = (k: KeadaanPesanan): string => `${kapital(bacaKalimat([k.a, k.b, k.a + k.b]))}. Jadi, ${kata(k.a + k.b)} ${k.sayur}.`;
const kapital = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
