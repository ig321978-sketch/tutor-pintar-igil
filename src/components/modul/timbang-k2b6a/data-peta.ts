/**
 * Isi Mind-map (Rak Peralatan), Infografis (Papan Lapangan), dan Simulasi (Pos Timbang) Kelas 2 Bab 6 Sub-Bab A "Peralatan Lomba Pak Anton", awal cerita Hari Olahraga Sekolah.
 * Mind-map hanya memuat poin pelajaran. Infografis memakai data Story (kerucut dan kantong pasir, dua kantong, dua bola, boneka harimau, rantai buah).
 * Simulasi memakai benda lain (layang-layang, bulu tangkis, yoyo, sarung tinju, batu curling; satuan dadu dan es batu). Diuji: scripts/uji-timbang-k2b6a.mjs.
 */
import type { Tempat } from "../lemari-k1b1a/logika";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });
const beriContoh = (d: Tempat[], ids: string[]): Tempat[] => d.map((x) => (ids.includes(x.id) ? { ...x, contoh: true } : x));

/* ------------------------------ Infografis: papan lapangan ------------------------------ */
export const KOLOM_PAPAN = ["Cara menimbang", "Yang terjadi", "Katanya"] as const;
export const BARIS_PAPAN: { ikon: string; nama: string; cara: string; terjadi: string; hasil: string }[] = [
  { ikon: "\u{1F538}", nama: "Kerucut dan kantong", cara: "dua tangan", terjadi: "kantong terasa berat", hasil: "kantong lebih berat" },
  { ikon: "\u{1F45C}", nama: "Dua kantong", cara: "gantungan baju", terjadi: "satu kantong turun", hasil: "yang turun lebih berat" },
  { ikon: "\u{26BD}", nama: "Dua bola", cara: "papan jungkat-jungkit", terjadi: "papan jadi datar", hasil: "sama berat" },
  { ikon: "\u{1F42F}", nama: "Boneka harimau", cara: "bola tenis satu per satu", terjadi: "seimbang setelah empat", hasil: "sama dengan empat bola tenis" },
  { ikon: "\u{1F96D}", nama: "Rantai buah", cara: "bandingkan berpasangan", terjadi: "pepaya sama dengan dua mangga", hasil: "empat manggis sama dengan pepaya" },
];
const DASAR_PAPAN: Tempat[] = BARIS_PAPAN.flatMap((b, i) => [tp(`d${i}-cara`, "cara", b.cara), tp(`d${i}-terjadi`, "terjadi", b.terjadi), tp(`d${i}-hasil`, "hasil", b.hasil)]);
export const TEMPAT_PAPAN: Tempat[] = beriContoh(DASAR_PAPAN, ["d0-cara","d0-terjadi","d0-hasil","d1-cara","d2-terjadi","d3-hasil","d4-cara"]);
export const KELOMPOK_PAPAN: Record<string, string> = {
  cara: "Label ini cara menimbang. Tempelkan di kolom Cara menimbang.",
  terjadi: "Label ini yang terjadi pada alat timbang. Tempelkan di kolom Yang terjadi.",
  hasil: "Label ini katanya, hasil perbandingan berat. Tempelkan di kolom Katanya.",
};
export const SUARA_PAPAN = "Ini papan lapangan, dari cerita peralatan lomba Pak Anton. Tiap baris satu kejadian. Tempelkan cara menimbangnya, yang terjadi pada alatnya, dan katanya. Beberapa kotak sudah terisi sebagai contoh, jadi lihat dulu sebagai petunjuk.";

/* ------------------------------ Simulasi: Pos Timbang (berbeda dari Story) ------------------------------ */
export type BendaSim = { id: string; nama: string; emoji: string; w: number; besar?: boolean };
/** Lima benda lomba. Berat tidak tampak; hanya papan yang menunjukkan. Layang-layang besar tetapi ringan. */
export const BENDA_SIM: readonly BendaSim[] = [
  { id: "layang", nama: "layang-layang", emoji: "\u{1FA81}", w: 2, besar: true },
  { id: "kok", nama: "bulu tangkis", emoji: "\u{1F3F8}", w: 2 },
  { id: "yoyo", nama: "yoyo", emoji: "\u{1FA80}", w: 4 },
  { id: "tinju", nama: "sarung tinju", emoji: "\u{1F94A}", w: 6 },
  { id: "curling", nama: "batu curling", emoji: "\u{1F94C}", w: 8 },
];
/** Dua satuan tidak baku: dadu (ringan) dan es batu (dua kali lebih berat). */
export type SatuanSim = { id: string; nama: string; emoji: string; w: number };
export const SATUAN_SIM: readonly SatuanSim[] = [
  { id: "dadu", nama: "dadu", emoji: "\u{1F3B2}", w: 1 },
  { id: "es", nama: "es batu", emoji: "\u{1F9CA}", w: 2 },
];
/** Benda yang disusun dari paling berat (nomor dalam BENDA_SIM). */
export const SUSUN_SIM: readonly number[] = [1, 2, 3, 4];
export const MAKS_SATUAN = 10;
export const MISI_TIMBANG_TEKS =
  "Misi Pos Timbang: bandingkan dua benda di papan jungkat-jungkit, timbang satu benda dengan satuan sampai seimbang, lalu susun benda dari yang paling berat. Urutannya bebas.";
