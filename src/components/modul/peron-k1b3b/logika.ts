/**
 * Logika murni Kelas 1 Bab 3 Sub-Bab B "Pindah Kereta di Stasiun Besar" (berbagai cara mengurangi) untuk tahap Mind-map,
 * Infografis, Simulasi, Concrete, Pictorial, dan Abstract. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-peron-k1b3b.mjs.
 * Tempel label, kata bilangan, cara menjawab, dan kalimat pengurangan memakai ulang Sub-Bab A.
 */
import { bacaKalimat, kata, type Kalimat } from "../bekal-k1b3a/logika";
import type { Cara } from "../lemari-k1b1a/logika";

export { acak, cocok, cocokKelompok, kata, kelompokLabel, labelDari, IKON_CARA, NAMA_CARA, URUT_CARA, type Cara, type Label, type Tempat } from "../lemari-k1b1a/logika";
export { KURANG, bacaKalimat, samaKalimat, tulisKalimat, type Kalimat } from "../bekal-k1b3a/logika";

export type Metode = "igil" | "bagan" | "garis" | "sepuluh";
export const URUT_METODE: Metode[] = ["igil", "bagan", "garis", "sepuluh"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: dua kalimat, nol, dan sama",
  bagan: "Number Bond: bagan pasangan",
  garis: "Number Line: lompat mundur",
  sepuluh: "Make Ten: pasangan sepuluh",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F686}", bagan: "\u{1F517}", garis: "\u{1F4CF}", sepuluh: "\u{1F51F}" };

export type Rupa = "benda" | "diagram" | "lambang";

export type Langkah =
  /** Satu bagan (utuh u, bagian a dan u − a) sudah punya kalimat u − a; pilih kalimat kedua u − (u − a) = a. Tanpa jawaban angka. */
  | { tipe: "dua"; u: number; a: number; pilihan: Kalimat[]; tokoh?: string }
  /** Dikurangi nol (b = 0) atau dikurangi bilangan yang sama (b = a). */
  | { tipe: "nolsama"; a: number; b: number }
  /** Bagan pasangan: utuh u, satu bagian a; cari bagian yang lain. */
  | { tipe: "bagan"; u: number; a: number }
  /** Lompat mundur: mulai dari a, mundur b langkah. */
  | { tipe: "garis"; a: number; b: number }
  /** Sepuluh kursi, b terisi; berapa yang kosong (pasangan sepuluh). */
  | { tipe: "sepuluh"; b: number };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; benda: string; langkah: LangkahSoal[] };

/** Pasangan pengurangan tiap langkah sebagai [yang dikurangi, pengurang]. */
export function pasanganLangkah(l: Langkah): [number, number] {
  switch (l.tipe) {
    case "dua":
    case "bagan":
      return [l.u, l.a];
    case "sepuluh":
      return [10, l.b];
    default:
      return [l.a, l.b];
  }
}
/** Kalimat kedua yang benar dari bagan pada langkah dua. */
export const kalimatKedua = (l: Extract<Langkah, { tipe: "dua" }>): Kalimat => [l.u, l.u - l.a, l.a];
export const kalimatPertama = (l: Extract<Langkah, { tipe: "dua" }>): Kalimat => [l.u, l.a, l.u - l.a];
/** Cari kesalahan: kalimat kedua keliru yang sudah ditulis tokoh. Null bila bukan soal cari kesalahan. */
export const kalimatTokoh = (l: Extract<Langkah, { tipe: "dua" }>): Kalimat | null =>
  l.tokoh ? (l.pilihan.find((p) => p[0] === l.u && p[1] === l.u - l.a && p[2] !== l.a) ?? null) : null;
export const nomorBenar = (l: Extract<Langkah, { tipe: "dua" }>): number[] => {
  const t = kalimatKedua(l);
  return l.pilihan.map((p, i) => (p[0] === t[0] && p[1] === t[1] && p[2] === t[2] ? i : -1)).filter((i) => i >= 0);
};

/** Kunci tiap langkah, dihitung dari datanya. Null untuk dua. */
export function kunciLangkah(l: Langkah): number | null {
  if (l.tipe === "dua") return null;
  const [a, b] = pasanganLangkah(l);
  return a - b;
}
export const angkaJawab = kunciLangkah;

export function pilihanDari(l: Langkah): number[] {
  const k = kunciLangkah(l) ?? 0;
  const ada = [...new Set([k - 1, k, k + 1].filter((n) => n >= 0 && n <= 10))];
  for (let n = 0; ada.length < 3 && n <= 10; n += 1) if (!ada.includes(n)) ada.push(n);
  return ada.sort((p, q) => p - q);
}

/* ------------------------------ Instruksi (templat, tanpa digit) ------------------------------ */
const AKHIR: Record<Cara, string> = { klik: "Lalu pilih jawabannya.", kanvas: "Lalu tulis jawabannya di kanvas.", suara: "Lalu ucapkan jawabannya." };
const benda = (r: Rupa) => (r === "benda" ? "benda" : "titik");

export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  const akhir = AKHIR[cara];
  switch (l.tipe) {
    case "dua":
      if (l.tokoh) return `Cari kesalahan. ${l.tokoh} sudah menulis kalimat kedua dari bagan ini. Apakah benar? ${cara === "kanvas" ? "Lingkari" : "Ketuk"} kalimat kedua yang benar.`;
      return cara === "kanvas" ? "Satu kalimat sudah ditulis. Lingkari kalimat kedua dari bagan yang sama." : "Satu kalimat sudah ditulis. Ketuk kalimat kedua dari bagan yang sama.";
    case "nolsama":
      if (rupa === "lambang") return `Ada ${kata(l.a)}, diambil ${kata(l.b)}. Berapa sisanya? ${akhir}`;
      if (l.b === 0) return `Tidak ada yang diambil. Tekan tombol tidak ada yang diambil. ${akhir}`;
      return `Semuanya diambil. Ketuk tiap ${benda(rupa)} di troli. ${akhir}`;
    case "bagan":
      if (rupa === "lambang") return `Bagan pasangan: utuh ${kata(l.u)}, satu bagian ${kata(l.a)}. Berapa bagian yang lain? ${akhir}`;
      if (cara === "kanvas") return `Lingkari ${benda(rupa)} di kotak utuh yang belum masuk bagian pertama. ${akhir}`;
      return `Ketuk ${benda(rupa)} di kotak utuh yang belum masuk bagian pertama supaya pindah ke bagian kedua. ${akhir}`;
    case "garis":
      if (rupa === "lambang") return `Mulai dari ${kata(l.a)}, lompat mundur ${kata(l.b)} kali. Di mana berhenti? ${akhir}`;
      if (cara === "kanvas") return `Mulai dari ${kata(l.a)}. Beri tanda pada ${kata(l.b)} tempat di sebelah kirinya, satu tanda untuk satu lompatan. ${akhir}`;
      return `Mulai dari ${kata(l.a)}. Ketuk tempat di sebelah kiri, satu per satu, ${kata(l.b)} kali. ${akhir}`;
    case "sepuluh":
      if (rupa === "lambang") return `Sepuluh kursi, ${kata(l.b)} terisi. Berapa yang kosong? ${akhir}`;
      if (l.b === 10) return `Lihat baik-baik. Semua kursi terisi. ${akhir}`;
      if (cara === "kanvas") return `Beri satu tanda pada tiap kursi kosong. ${akhir}`;
      return `Ketuk tiap kursi kosong sambil menghitung. ${akhir}`;
  }
}

/* ------------------------------ Simulasi Kursi Kereta Lanjutan ------------------------------ */
export type KeadaanKursi = {
  alat: "kursi";
  /** Banyak kursi di baris (utuh), satu sampai sepuluh. */
  utuh: number;
  /** Kursi terisi dari kiri. */
  terisi: number;
  /** Kalimat yang sudah dicatat, ditulis "a-b=c". */
  catat: string[];
};
export const awalKursi = (utuh: number, terisi: number): KeadaanKursi => ({ alat: "kursi", utuh, terisi, catat: [] });
export const kosongKursi = (k: KeadaanKursi): number => k.utuh - k.terisi;
/** Ubah banyak kursi; kursi terisi tidak boleh lebih dari kursi. */
export function ubahUtuh(k: KeadaanKursi, d: 1 | -1): KeadaanKursi {
  const utuh = k.utuh + d;
  if (utuh < 1 || utuh > 10) return k;
  return { ...k, utuh, terisi: Math.min(k.terisi, utuh) };
}
/** Ketuk kursi ke-i: terisi sampai kursi itu; ketuk kursi terisi terakhir untuk mengosongkannya. */
export function ketukKursi(k: KeadaanKursi, i: number): KeadaanKursi {
  if (i < 0 || i >= k.utuh) return k;
  const terisi = i + 1 === k.terisi ? i : i + 1;
  return { ...k, terisi };
}
export const teksKalimat = (a: number, b: number): string => `${a}-${b}=${a - b}`;
/** Dua kalimat dari bagan sekarang: utuh dikurangi terisi, dan utuh dikurangi kosong. */
export const duaKalimat = (k: KeadaanKursi): [string, string] => [teksKalimat(k.utuh, k.terisi), teksKalimat(k.utuh, kosongKursi(k))];
/** Catat salah satu kalimat (0 = dikurangi terisi, 1 = dikurangi kosong), tanpa kembar. */
export function catatKursi(k: KeadaanKursi, ke: 0 | 1): KeadaanKursi {
  const t = duaKalimat(k)[ke];
  if (k.catat.includes(t)) return k;
  return { ...k, catat: [...k.catat, t] };
}
export const bacaKursi = (k: KeadaanKursi, ke: 0 | 1): string => {
  const b = ke === 0 ? k.terisi : kosongKursi(k);
  return bacaKalimat([k.utuh, b, k.utuh - b]);
};
