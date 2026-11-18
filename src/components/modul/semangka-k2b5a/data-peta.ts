/**
 * Isi Mind-map (Pagar Bambu), Infografis (Papan Tiang), dan Simulasi (Meja Bagi) Kelas 2 Bab 5 Sub-Bab A "Semangka Raksasa Pak Danu", awal cerita Kebun Sekolah.
 * Mind-map hanya memuat poin pelajaran. Infografis memakai data Story (semangka, ember, gelas jus, labu kecil, kertas dilipat). Simulasi memakai benda lain
 * (jeruk bali, keju, sosis, nasi kepal; kertas persegi panjang, segitiga, lingkaran; dua gelas susu). Diuji: scripts/uji-semangka-k2b5a.mjs.
 */
import type { Tempat } from "../lemari-k1b1a/logika";
import { datar, lewat, tegak, type Bentuk, type Garis } from "./bagian";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

/* ------------------------------ Mind-map: pagar bambu dengan papan nama ------------------------------ */
export const PUSAT_PAGAR = "Setengah dari benda utuh";
export const KELOMPOK_PAGAR: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Pagar bawah", ikon: "\u{1F6A7}", isi: "#FDE68A", garis: "#A16207", petunjuk: "Papan ini kuning. Pasang di pagar bawah, tempat masalah." },
  metode: { nama: "Penyelesaian", letak: "Pagar tengah", ikon: "\u{1F4CB}", isi: "#BFDBFE", garis: "#1D4ED8", petunjuk: "Papan ini biru. Pasang di papan bernomor yang pas." },
  hasil: { nama: "Hasil", letak: "Pagar atas", ikon: "\u{1F3C6}", isi: "#BBF7D0", garis: "#15803D", petunjuk: "Papan ini hijau. Pasang di pagar atas, tempat hasil." },
};
export const TEMPAT_PAGAR: Tempat[] = [
  tp("pg-m1", "masalah", "Bagian tidak sama besar"),
  tp("pg-m2", "masalah", "Satu benda untuk dua orang"),
  tp("pg-m3", "masalah", "Garis potong sembarangan"),
  tp("pg-p1", "metode", "Bagi benda menjadi dua bagian", 1),
  tp("pg-p2", "metode", "Potong tepat di tengah", 2),
  tp("pg-p3", "metode", "Tumpuk dan periksa sama besar", 3),
  tp("pg-p4", "metode", "Tanya: dua bagian, sama besar, satu ditunjuk", 4),
  tp("pg-p5", "metode", "Berbagi Adil: bagian sama besar", 5),
  tp("pg-p6", "metode", "Uji Cermin: bayangan harus pas", 6),
  tp("pg-p7", "metode", "Pita Pecahan: bandingkan dengan utuh", 7),
  tp("pg-h1", "hasil", "Dua bagian sama besar"),
  tp("pg-h2", "hasil", "Tiap bagian disebut setengah"),
  tp("pg-h3", "hasil", "Lipatan yang pas menghasilkan setengah"),
  tp("pg-h4", "hasil", "Dua setengah jadi satu utuh"),
];
export const PETUNJUK_URUT_PAGAR = "Warnanya sudah benar. Nomor papannya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_PAGAR =
  "Ini pagar bambu dengan papan nama. Pagar bawah berisi masalah. Pagar tengah punya tujuh papan bernomor berisi langkah yang berurutan, ikuti nomornya dari satu sampai tujuh. Pagar atas berisi hasil. Ketuk label, lalu ketuk papan yang cocok.";

/* ------------------------------ Infografis: papan catatan Dika ------------------------------ */
export const KOLOM_PAPAN = ["Cara membagi", "Cara memeriksa", "Hasilnya"] as const;
export const BARIS_PAPAN: { ikon: string; nama: string; cara: string; periksa: string; hasil: string }[] = [
  { ikon: "\u{1F349}", nama: "Semangka", cara: "potong tepat di tengah", periksa: "tumpuk, harus pas", hasil: "setengah semangka" },
  { ikon: "\u{1F4A7}", nama: "Ember", cara: "isi sampai garis tengah", periksa: "air sama tinggi dengan kosong", hasil: "setengah ember" },
  { ikon: "\u{1F964}", nama: "Gelas jus", cara: "tuang sampai garis tengah", periksa: "dua gelas sama tinggi", hasil: "setengah gelas" },
  { ikon: "\u{1F383}", nama: "Labu kecil", cara: "belah tepat di tengah", periksa: "dua belahan menutup pas", hasil: "setengah labu" },
  { ikon: "\u{1F4C4}", nama: "Kertas", cara: "lipat tegak, datar, atau miring", periksa: "dua sisi saling menutup", hasil: "setengah kertas" },
];
export const TEMPAT_PAPAN: Tempat[] = BARIS_PAPAN.flatMap((b, i) => [tp(`d${i}-cara`, "cara", b.cara), tp(`d${i}-periksa`, "periksa", b.periksa), tp(`d${i}-hasil`, "hasil", b.hasil)]);
export const KELOMPOK_PAPAN: Record<string, string> = {
  cara: "Label ini cara membagi. Tempelkan di kolom Cara membagi.",
  periksa: "Label ini cara memeriksa sama besar. Tempelkan di kolom Cara memeriksa.",
  hasil: "Label ini hasilnya, disebut setengah. Tempelkan di kolom Hasilnya.",
};
export const SUARA_PAPAN = "Ini papan catatan Dika, dari cerita semangka raksasa Pak Danu. Tiap baris satu benda. Tempelkan cara membaginya, cara memeriksanya, dan hasilnya.";

/* ------------------------------ Simulasi: Meja Bagi (berbeda dari Story) ------------------------------ */
export type GarisSim = { nama: string; g: Garis };
/** Benda yang dibelah: jeruk bali (lingkaran), keju (persegi), sosis (persegi panjang), nasi kepal (segitiga). */
export type BendaBagi = { id: string; nama: string; emoji: string; b: Bentuk; warna: string; garisWarna: string; garis: GarisSim[] };
export const BENDA_BAGI: readonly BendaBagi[] = [
  {
    id: "jeruk",
    nama: "jeruk bali",
    emoji: "\u{1F34A}",
    b: "lingkaran",
    warna: "#FDBA74",
    garisWarna: "#9A3412",
    garis: [
      { nama: "tegak di tengah", g: tegak("lingkaran", 0.5) },
      { nama: "miring lewat titik tengah", g: lewat("lingkaran", 60) },
      { nama: "tegak bergeser", g: tegak("lingkaran", 0.3) },
      { nama: "mendatar bergeser", g: datar("lingkaran", 0.7) },
    ],
  },
  {
    id: "keju",
    nama: "keju",
    emoji: "\u{1F9C0}",
    b: "persegi",
    warna: "#FDE047",
    garisWarna: "#A16207",
    garis: [
      { nama: "tegak di tengah", g: tegak("persegi", 0.5) },
      { nama: "mendatar di tengah", g: datar("persegi", 0.5) },
      { nama: "miring pojok ke pojok", g: [0.1, 0.1, 0.9, 0.9] },
      { nama: "tegak bergeser", g: tegak("persegi", 0.35) },
    ],
  },
  {
    id: "sosis",
    nama: "sosis",
    emoji: "\u{1F32D}",
    b: "panjang",
    warna: "#FCA5A5",
    garisWarna: "#991B1B",
    garis: [
      { nama: "tegak di tengah", g: tegak("panjang", 0.5) },
      { nama: "mendatar di tengah", g: datar("panjang", 0.5) },
      { nama: "tegak bergeser", g: tegak("panjang", 0.65) },
      { nama: "mendatar bergeser", g: datar("panjang", 0.3) },
    ],
  },
  {
    id: "nasi",
    nama: "nasi kepal",
    emoji: "\u{1F359}",
    b: "segitiga",
    warna: "#E5E7EB",
    garisWarna: "#374151",
    garis: [
      { nama: "tegak dari puncak", g: tegak("segitiga", 0.5) },
      { nama: "mendatar di tengah", g: datar("segitiga", 0.5) },
      { nama: "tegak bergeser", g: tegak("segitiga", 0.3) },
    ],
  },
];
/** Kertas lipat. Lipatan dinilai pas bila bayangan satu sisi persis menutup sisi yang lain (Uji Cermin). */
export type KertasLipat = { id: string; nama: string; b: Bentuk; warna: string; garis: GarisSim[] };
export const KERTAS_LIPAT: readonly KertasLipat[] = [
  {
    id: "biru",
    nama: "kertas biru persegi panjang",
    b: "panjang",
    warna: "#93C5FD",
    garis: [
      { nama: "lipat tegak di tengah", g: tegak("panjang", 0.5) },
      { nama: "lipat mendatar di tengah", g: datar("panjang", 0.5) },
      { nama: "lipat tegak bergeser", g: tegak("panjang", 0.3) },
      { nama: "lipat mendatar bergeser", g: datar("panjang", 0.7) },
    ],
  },
  {
    id: "hijau",
    nama: "kertas hijau segitiga",
    b: "segitiga",
    warna: "#86EFAC",
    garis: [
      { nama: "lipat tegak dari puncak", g: tegak("segitiga", 0.5) },
      { nama: "lipat mendatar di tengah", g: datar("segitiga", 0.5) },
      { nama: "lipat tegak bergeser", g: tegak("segitiga", 0.3) },
    ],
  },
  {
    id: "kuning",
    nama: "kertas kuning lingkaran",
    b: "lingkaran",
    warna: "#FDE68A",
    garis: [
      { nama: "lipat tegak lewat titik tengah", g: tegak("lingkaran", 0.5) },
      { nama: "lipat miring lewat titik tengah", g: lewat("lingkaran", 30) },
      { nama: "lipat tegak bergeser", g: tegak("lingkaran", 0.7) },
    ],
  },
];
/** Dua gelas susu: banyak takaran seluruhnya tiap putaran (tuang dari gelas penuh sampai kedua gelas sama tinggi). */
export const TOTAL_TUANG: readonly number[] = [6, 10];
export const MISI_BAGI_TEKS =
  "Misi Meja Bagi: belah benda tepat di tengah lalu tumpuk bagiannya, tuang susu sampai dua gelas sama tinggi, dan lipat kertas sampai kedua sisinya pas. Urutannya bebas.";
