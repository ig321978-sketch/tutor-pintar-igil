/**
 * Data Infografis (label kosong, papan urutan dan garis bilangan stadion) Kelas 5 Bab 1 Sub-Bab B "Urutan Tribun Pak Hasto": DUA kartu, tiap kartu satu layar tanpa gulir.
 * Kartu 1 = papan urutan keempat tribun (data bersambung dari Sub-Bab A: Timur 9.060, Selatan 18.705, Utara 24.350, Barat 30.402) dari paling sepi: kolom banyak angka dan tanda
 * ke tribun di bawahnya berisi sel kosong "?" yang diketuk, dan tombol Balik mengubah urutan naik menjadi turun.
 * Kartu 2 = garis bilangan stadion berpatokan 0, 10.000, 20.000, 30.000, 40.000 dengan empat titik berlabel kosong "?", ditambah pasangan Utara minggu ini 24.350 dan pekan lalu 24.305
 * (angka yang sama digeser dari kiri sampai puluhan). Semua gambar dan hitungan dari logika-data.ts. Digital saja: suara dan kanvas hanya di CPA. Diuji: scripts/uji-urutan-k5b1b.mjs.
 */
import { banyakAngka, fmt, namaPenentu, rancangGaris, tandaDari, urutkan, type Garis } from "./logika-data";
import { ucapkan as ucap } from "./logika-cpa";

/** Ucapan tanpa digit yang diawali huruf kapital. */
const ucapkan = (t: string): string => {
  const u = ucap(t);
  return u.charAt(0).toUpperCase() + u.slice(1);
};

/** Data bersambung dari Sub-Bab A (kontrak data bab): penonton empat tribun Stadion Kota, satuan orang. */
export const TRIBUN: { nama: string; n: number }[] = [
  { nama: "Timur", n: 9060 },
  { nama: "Selatan", n: 18705 },
  { nama: "Utara", n: 24350 },
  { nama: "Barat", n: 30402 },
];
/** Utara pekan lalu (tambahan Sub-Bab B): pasangan yang baru berbeda di puluhan. */
export const UTARA_LALU = 24305;
export const IKON_TRIBUN = "\u{1F3DF}\u{FE0F}";

export const URUT_NAIK = urutkan(TRIBUN.map((t) => t.n), "naik").map((n) => TRIBUN.findIndex((t) => t.n === n));
export const URUT_TURUN = urutkan(TRIBUN.map((t) => t.n), "turun").map((n) => TRIBUN.findIndex((t) => t.n === n));

export type BarisInfo = { i: number; nama: string; n: number; angka: number; tanda: ">" | "<" | "=" | null; suaraAngka: string; suaraTanda: string };
/** Baris papan menurut arah. Tanda = hasil membandingkan baris itu dengan baris di bawahnya. */
export function barisPapan(arah: "naik" | "turun"): BarisInfo[] {
  const urut = arah === "naik" ? URUT_NAIK : URUT_TURUN;
  return urut.map((idx, pos) => {
    const t = TRIBUN[idx];
    const bawah = urut[pos + 1] === undefined ? null : TRIBUN[urut[pos + 1]];
    const tanda = bawah ? tandaDari(t.n, bawah.n) : null;
    const lebih = tanda === ">" ? "lebih besar dari" : tanda === "<" ? "lebih kecil dari" : "sama dengan";
    const alasan = bawah ? (banyakAngka(t.n) !== banyakAngka(bawah.n) ? `banyak angkanya ${banyakAngka(t.n)} dan ${banyakAngka(bawah.n)}` : `angka penentunya ada di ${namaPenentu(t.n, bawah.n)}`) : "";
    return {
      i: idx,
      nama: t.nama,
      n: t.n,
      angka: banyakAngka(t.n),
      tanda,
      suaraAngka: ucapkan(`Tribun ${t.nama}, ${fmt(t.n)}, ditulis dengan ${banyakAngka(t.n)} angka.`),
      suaraTanda: bawah ? ucapkan(`${t.nama} ${fmt(t.n)} ${lebih} ${bawah.nama} ${fmt(bawah.n)}, karena ${alasan}.`) : "",
    };
  });
}

/** Kartu 2: garis bilangan dengan lima patokan. */
export const GARIS_INFO: Garis = rancangGaris(
  0,
  TRIBUN.map((t) => ({ nama: t.nama, n: t.n })),
  5,
);
export const SUARA_TITIK: Record<string, string> = Object.fromEntries(
  TRIBUN.map((t) => {
    const lo = Math.floor(t.n / 10000) * 10000;
    return [t.nama, ucapkan(`Tribun ${t.nama}, ${fmt(t.n)}, ada di antara patokan ${fmt(lo)} dan ${fmt(lo + 10000)}.`)];
  }),
);
export const PASANGAN_LALU = {
  teks: `Utara minggu ini ${fmt(TRIBUN[2].n)} dan pekan lalu ${fmt(UTARA_LALU)}`,
  penentu: namaPenentu(TRIBUN[2].n, UTARA_LALU),
  suara: ucapkan(`Utara minggu ini ${fmt(TRIBUN[2].n)}, pekan lalu ${fmt(UTARA_LALU)}. Angka yang sama digeser dari kiri sampai ${namaPenentu(TRIBUN[2].n, UTARA_LALU)}, dan 5 lebih besar dari 0, jadi minggu ini lebih ramai.`),
};

export const JUDUL_INFO_1 = "Papan Urutan Tribun";
export const JUDUL_INFO_2 = "Garis Bilangan Stadion";
export const PETUNJUK_INFO_1 = "Papan urutan keempat tribun. Ketuk tanda tanya untuk melihat banyak angka dan tandanya, lalu tekan Balik untuk mengubah urutannya.";
export const PETUNJUK_INFO_2 = "Garis bilangan stadion berpatokan. Ketuk tanda tanya di tiap titik, lalu ketuk pasangan pekan lalu.";
export const SELESAI_INFO_1 = "Papan lengkap! Dibalik pun bilangannya sama, hanya urutannya naik atau turun.";
export const SELESAI_INFO_2 = "Garis lengkap! Makin ke kanan makin besar.";
export const PESAN_BELUM_BALIK = "Tekan Balik untuk melihat urutan turun.";
export const SUARA_BALIK_NAIK = ucapkan("Urutan naik, dari yang paling kecil ke yang paling besar.");
export const SUARA_BALIK_TURUN = ucapkan("Urutan turun, dari yang paling besar ke yang paling kecil.");
