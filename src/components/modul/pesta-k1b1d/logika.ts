/**
 * Logika murni Kelas 1 Bab 1 Sub-Bab D "Pesta Rumah Rapi" (pasangan bilangan) untuk tahap Mind-map, Infografis, Simulasi,
 * Concrete, Pictorial, dan Abstract. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-pesta-k1b1d.mjs.
 * Tempel label, kata bilangan, dan cara menjawab memakai ulang Sub-Bab A.
 */
import { kata } from "../lemari-k1b1a/logika";
import type { Cara } from "../lemari-k1b1a/logika";

export { acak, cocok, cocokKelompok, kata, kelompokLabel, labelDari, IKON_CARA, NAMA_CARA, URUT_CARA, type Cara, type Label, type Tempat } from "../lemari-k1b1a/logika";

export type Metode = "igil" | "ikatan" | "batang" | "manik";
export const URUT_METODE: Metode[] = ["igil", "ikatan", "batang", "manik"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: pisah, gabung, pasangan",
  ikatan: "Number Bond: ikatan bilangan",
  batang: "Bar Model: model batang",
  manik: "Rekenrek: rak manik",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F9C1}", ikatan: "\u{1F517}", batang: "\u{1F4CA}", manik: "\u{1F9EE}" };

export type Rupa = "benda" | "diagram" | "lambang";
export type Pasang = [number, number];

export type Langkah =
  /** Pilih semua pasangan yang utuhnya `utuh` di antara `pilihan`. Tanpa jawaban angka. */
  | { tipe: "semua"; utuh: number; pilihan: Pasang[] }
  /** Kanvas: pisahkan `utuh` benda menjadi `a` di kiri dan sisanya di kanan dengan satu garis. Tanpa jawaban angka. */
  | { tipe: "pisah"; utuh: number; a: number }
  /** Gabungkan dua bagian a dan b menjadi utuh. */
  | { tipe: "gabung"; a: number; b: number }
  /** Ikatan bilangan: bagian a dan b, utuh a + b; cari bagian kedua atau utuhnya. */
  | { tipe: "ikatan"; a: number; b: number; cari: "b" | "utuh" }
  /** Model batang: bagian a dan b; cari bagian kedua atau utuhnya. */
  | { tipe: "batang"; a: number; b: number; cari: "b" | "utuh" }
  /** Rak manik `utuh` manik, `kiri` digeser ke kiri; cari banyak di kanan. */
  | { tipe: "manik"; utuh: number; kiri: number };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

/** Pasangan sah untuk utuh. */
export const pasanganSah = (utuh: number, p: Pasang): boolean => p[0] >= 0 && p[1] >= 0 && p[0] + p[1] === utuh;
/** Nomor pilihan yang benar untuk tipe semua. */
export const pilihanBenar = (l: Extract<Langkah, { tipe: "semua" }>): number[] => l.pilihan.map((p, i) => (pasanganSah(l.utuh, p) ? i : -1)).filter((i) => i >= 0);
export const benarSemua = (l: Extract<Langkah, { tipe: "semua" }>, pilih: readonly number[]): boolean => {
  const b = pilihanBenar(l);
  return pilih.length === b.length && b.every((i) => pilih.includes(i));
};

/** Kunci tiap langkah, dihitung dari datanya. Null untuk semua dan pisah. */
export function kunciLangkah(l: Langkah): number | null {
  switch (l.tipe) {
    case "semua":
    case "pisah":
      return null;
    case "gabung":
      return l.a + l.b;
    case "ikatan":
    case "batang":
      return l.cari === "b" ? l.b : l.a + l.b;
    case "manik":
      return l.utuh - l.kiri;
  }
}
export const angkaJawab = kunciLangkah;
/** Utuh tiap langkah. */
export const utuhLangkah = (l: Langkah): number => (l.tipe === "semua" || l.tipe === "pisah" || l.tipe === "manik" ? l.utuh : l.a + l.b);

export function pilihanDari(l: Langkah): number[] {
  const k = kunciLangkah(l) ?? 0;
  const ada = [...new Set([k - 1, k, k + 1].filter((n) => n >= 0 && n <= 10))];
  for (let n = 0; ada.length < 3 && n <= 10; n += 1) if (!ada.includes(n)) ada.push(n);
  return ada.sort((p, q) => p - q);
}

/* ------------------------------ Instruksi (templat, tanpa digit) ------------------------------ */
const AKHIR: Record<Cara, string> = { klik: "Lalu pilih jawabannya.", kanvas: "Lalu tulis angkanya di kanvas.", suara: "Lalu ucapkan jawabannya." };
const benda = (r: Rupa) => (r === "benda" ? "kue" : r === "diagram" ? "titik" : "angka");

export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  const akhir = AKHIR[cara];
  switch (l.tipe) {
    case "semua":
      return cara === "kanvas" ? `Lingkari semua pasangan yang utuhnya ${kata(l.utuh)}.` : `Ketuk semua pasangan yang utuhnya ${kata(l.utuh)}, lalu tekan Periksa.`;
    case "pisah":
      return `Tarik satu garis tegak untuk memisahkan ${kata(l.utuh)} ${benda(rupa)}: ${kata(l.a)} di kiri, sisanya di kanan.`;
    case "gabung":
      return `Gabungkan dua bagian menjadi utuh. ${rupa === "lambang" ? "" : "Tekan Gabungkan. "}${akhir}`;
    case "ikatan":
      if (rupa === "lambang") return `Lihat ikatan bilangan. Cari ${l.cari === "b" ? "bagian yang belum diketahui" : "utuhnya"}. ${akhir}`;
      if (cara === "kanvas") return `Lingkari ${benda(rupa)} yang menjadi bagian kedua. ${akhir}`;
      return l.cari === "b" ? `Ketuk ${benda(rupa)} di lingkaran utuh yang belum masuk bagian pertama. ${akhir}` : `Tekan Gabungkan supaya kedua bagian masuk ke utuh. ${akhir}`;
    case "batang":
      if (rupa === "lambang") return `Lihat model batang. Cari ${l.cari === "b" ? "bagian yang belum diketahui" : "utuhnya"}. ${akhir}`;
      if (cara === "kanvas") return `Beri satu tanda pada tiap kotak ${l.cari === "b" ? "bagian yang kosong" : "di batang"}. ${akhir}`;
      return l.cari === "b" ? `Ketuk kotak kosong sampai batang penuh. ${akhir}` : `Tekan Sambung supaya dua batang menjadi satu. ${akhir}`;
    case "manik":
      if (rupa === "lambang") return `Rak manik: sebagian manik digeser ke kiri. Berapa yang tinggal di kanan? ${akhir}`;
      if (cara === "kanvas") return `Lingkari manik yang tinggal di kanan. ${akhir}`;
      return `Geser manik ke kiri satu per satu sesuai angka di kiri. Berapa yang tinggal di kanan? ${akhir}`;
  }
}

/* ------------------------------ Simulasi Meja Pesta ------------------------------ */
export type Barang = "kue" | "gelas" | "kursi";
export const URUT_BARANG: Barang[] = ["kue", "gelas", "kursi"];
export type KeadaanPesta = {
  alat: "pesta";
  barang: Barang;
  utuh: Record<Barang, number>;
  /** Banyak di meja dalam; meja teras = utuh dikurangi ini. */
  dalam: Record<Barang, number>;
  /** Pasangan yang sudah dicatat, ditulis "a-b" dengan a meja dalam dan b meja teras. */
  catat: Record<Barang, string[]>;
};
export const awalPesta = (utuh: Record<Barang, number>): KeadaanPesta => ({
  alat: "pesta",
  barang: "kue",
  utuh,
  dalam: { kue: utuh.kue, gelas: utuh.gelas, kursi: utuh.kursi },
  catat: { kue: [], gelas: [], kursi: [] },
});
export const teras = (k: KeadaanPesta, b: Barang = k.barang): number => k.utuh[b] - k.dalam[b];
export const pilihBarang = (k: KeadaanPesta, barang: Barang): KeadaanPesta => ({ ...k, barang });
/** Pindahkan satu benda ke meja teras (d = 1) atau ke meja dalam (d = -1). */
export function pindah(k: KeadaanPesta, d: 1 | -1): KeadaanPesta {
  const n = k.dalam[k.barang] - d;
  if (n < 0 || n > k.utuh[k.barang]) return k;
  return { ...k, dalam: { ...k.dalam, [k.barang]: n } };
}
/** Catat pasangan sekarang (tanpa kembar). */
export function catatPasangan(k: KeadaanPesta): KeadaanPesta {
  const p = `${k.dalam[k.barang]}-${teras(k)}`;
  if (k.catat[k.barang].includes(p)) return k;
  return { ...k, catat: { ...k.catat, [k.barang]: [...k.catat[k.barang], p] } };
}
/** Pasangan tanpa urutan yang sudah dicatat (a dan b dianggap sama dengan b dan a). */
export const pasanganUnik = (k: KeadaanPesta, b: Barang): number => new Set(k.catat[b].map((p) => p.split("-").map(Number).sort((x, y) => x - y).join("-"))).size;
/** Banyak pasangan tanpa urutan untuk utuh n. */
export const semuaPasangan = (n: number): number => Math.floor(n / 2) + 1;

export const kalimatPesta = (k: KeadaanPesta): string => `${kapital(k.barang)} ${kata(k.utuh[k.barang])}: meja dalam ${kata(k.dalam[k.barang])}, meja teras ${kata(teras(k))}.`;
const kapital = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
