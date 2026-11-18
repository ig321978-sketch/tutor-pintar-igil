/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 2 Bab 1 Sub-Bab B "Pesanan Kue Hari Olahraga", tengah cerita
 * Kue di Kantin Sekolah. Angka Story (dua puluh lima, tiga puluh empat dan empat puluh tiga, empat puluh, tiga puluh delapan) hanya dipakai di Mind-map
 * dan Infografis. Simulasi dan CPA memakai bilangan lain dan melanjutkan "Misi Meja Kasir". Bilangan paling besar lima puluh.
 * Diuji: scripts/uji-kasir-k2b1b.mjs.
 */
import type { Langkah, LangkahDasar, LangkahSalah, LangkahSoal, Rupa, SoalMisi, TanyaBagan, Tempat } from "./logika";
import { instruksi, kata, metodeLangkah } from "./logika";
import type { Cara } from "./logika";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

/* ------------------------------ Gambar kue (Concrete) ------------------------------ */
export type SetKue = { id: string; nama: string; emoji: string; warna: string };
/** Lima jenis kue untuk Concrete (emoji berwarna). Pictorial memakai titik, bingkai, dan batang polos. */
export const SETS: Record<string, SetKue> = {
  kue: { id: "kue", nama: "kue", emoji: "\u{1F9C1}", warna: "#FBCFE8" },
  donat: { id: "donat", nama: "donat", emoji: "\u{1F369}", warna: "#FDE68A" },
  kukis: { id: "kukis", nama: "kukis", emoji: "\u{1F36A}", warna: "#FED7AA" },
  pastel: { id: "pastel", nama: "pastel", emoji: "\u{1F95F}", warna: "#BBF7D0" },
  lapis: { id: "lapis", nama: "kue lapis", emoji: "\u{1F370}", warna: "#BFDBFE" },
};

/* ------------------------------ Mind-map: rel kertas pesanan (hanya poin pelajaran) ------------------------------ */
export const PUSAT_REL = "Puluhan dan satuan";
export const KELOMPOK_REL: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Rel bawah", ikon: "\u{1F6A7}", isi: "#FDE68A", garis: "#A16207", petunjuk: "Label ini kuning. Jepit di rel bawah, tempat masalah." },
  metode: { nama: "Penyelesaian", letak: "Rel tengah", ikon: "\u{1F4CB}", isi: "#BFDBFE", garis: "#1D4ED8", petunjuk: "Label ini biru. Jepit di jepitan bernomor yang pas." },
  hasil: { nama: "Hasil", letak: "Rel atas", ikon: "\u{1F3C6}", isi: "#BBF7D0", garis: "#15803D", petunjuk: "Label ini hijau. Jepit di rel atas, tempat hasil." },
};
export const TEMPAT_REL: Tempat[] = [
  tp("rm-1", "masalah", "Angka dibaca satu per satu"),
  tp("rm-2", "masalah", "Letak angka tertukar"),
  tp("rm-3", "masalah", "Angka nol dianggap tidak berguna"),
  tp("rp-1", "metode", "Kemas sepuluh jadi satu puluhan", 1),
  tp("rp-2", "metode", "Isi tabel puluhan dan satuan", 2),
  tp("rp-3", "metode", "Baca angka menurut letaknya", 3),
  tp("rp-4", "metode", "Nol: tidak ada satuan", 4),
  tp("rp-5", "metode", "Balok Puluhan dan Satuan", 5),
  tp("rp-6", "metode", "Bagan Puluhan dan Satuan", 6),
  tp("rp-7", "metode", "Bentuk Panjang: puluhan ditambah satuan", 7),
  tp("rh-1", "hasil", "Puluhan dan satuan terbaca benar"),
  tp("rh-2", "hasil", "Arti angka bergantung letaknya"),
  tp("rh-3", "hasil", "Nol menjaga letak puluhan"),
  tp("rh-4", "hasil", "Bilangan sama dengan puluhan ditambah satuan"),
];
export const PETUNJUK_URUT_REL = "Warnanya sudah benar. Nomor jepitannya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_REL =
  "Ini rel kertas pesanan di meja kasir. Rel bawah berisi masalah. Rel tengah punya tujuh jepitan bernomor berisi langkah yang berurutan, ikuti nomornya dari satu sampai tujuh. Rel atas berisi hasil. Ketuk label, lalu ketuk tempat yang cocok.";

/* ------------------------------ Infografis: laci kasir berbilik ------------------------------ */
export const KOLOM_LACI = ["Puluhan", "Satuan", "Bentuk panjang"] as const;
export const BARIS_LACI: { nama: string; bil: string; puluhan: string; satuan: string; panjang: string }[] = [
  { nama: "Pesanan awal", bil: "25", puluhan: "dua puluh", satuan: "lima", panjang: "20 + 5" },
  { nama: "Pesanan terakhir", bil: "38", puluhan: "tiga puluh", satuan: "delapan", panjang: "30 + 8" },
  { nama: "Pesanan tambahan", bil: "40", puluhan: "empat puluh", satuan: "nol", panjang: "40 + 0" },
];
export const KUNCI_KOLOM = ["puluhan", "satuan", "panjang"] as const;
export const TEMPAT_LACI: Tempat[] = BARIS_LACI.flatMap((b, i) => KUNCI_KOLOM.map((kol) => tp(`l${i}-${kol}`, kol, b[kol])));
export const KELOMPOK_LACI: Record<string, string> = {
  puluhan: "Label ini banyak puluhan. Taruh di bilik Puluhan.",
  satuan: "Label ini banyak satuan. Taruh di bilik Satuan.",
  panjang: "Label ini bentuk panjang. Taruh di bilik Bentuk panjang.",
};
export const SUARA_LACI = "Ini laci kasir kantin, dari cerita pesanan kue hari olahraga. Tiap baris satu pesanan. Taruh puluhannya, satuannya, dan bentuk panjangnya di bilik yang pas.";

/* ------------------------------ Simulasi: Misi Meja Kasir bagian satu ------------------------------ */
export const MISI_MEJA =
  "Misi Meja Kasir bagian satu: susun pesanan dari kotak penuh dan kue lepas, kemas sepuluh kue lepas jadi satu kotak, baca tabel puluhan dan satuan, lalu buka bentuk panjangnya. Urutannya bebas.";

/* ------------------------------ CPA: lanjutan Misi Meja Kasir ------------------------------ */
const tabel = (set: string, t: number, s: number, tanya: "bilangan" | "puluhan" | "satuan" = "bilangan", benih = 1): LangkahDasar => ({ tipe: "tabel", set, t, s, tanya, benih });
const balok = (set: string, t: number, s: number, benih = 1): LangkahDasar => ({ tipe: "balok", set, t, s, benih });
const bagan = (set: string, t: number, s: number, tanya: TanyaBagan, benih = 1, lingkari?: "puluhan" | "satuan"): LangkahDasar => ({ tipe: "bagan", set, t, s, tanya, benih, ...(lingkari ? { lingkari } : {}) });
const panjang = (set: string, t: number, s: number, tanya: "susun" | "gabung" | "satuan" | "puluhan", benih = 1): LangkahDasar => ({ tipe: "panjang", set, t, s, tanya, benih });
const salah = (dasar: LangkahDasar, tokoh: string, kataTokoh: string, jawabTokoh: number | undefined, alasan: [string, string, string], benar: number, keliru: string): LangkahSalah => ({
  tipe: "salah",
  dasar,
  tokoh,
  kataTokoh,
  ...(jawabTokoh === undefined ? {} : { jawabTokoh }),
  alasan,
  benar,
  keliru,
});

const kelompok =
  (rupa: Rupa) =>
  (nomor: number, cara: Cara, judul: string, cerita: string, isi: [Langkah, Langkah, Langkah, Langkah]): SoalMisi => ({
    nomor,
    judul,
    cerita,
    cara,
    langkah: isi.map((l): LangkahSoal => {
      const s = instruksi(l, rupa, cara);
      return { metode: metodeLangkah(l), cara, judul: s, suara: s, langkah: l };
    }),
  });

const C = kelompok("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Meja Kasir 2: pesanan baru dari kantin", "Bu Sari mencatat pesanan baru. Bantu Chacha dan Dika membaca puluhan dan satuannya.", [
    salah(
      tabel("kue", 2, 6),
      "Chacha",
      "Dua kotak dan enam kue lepas, jadi dua ditambah enam sama dengan delapan.",
      8,
      [
        "Chacha benar, dua kotak dan enam kue lepas memang jadi delapan.",
        "Satu kotak penuh itu sepuluh, jadi dua kotak adalah dua puluh. Dua puluh ditambah enam kue lepas.",
        "Kue lepas dihitung dulu, kotak penuh tidak ikut dihitung.",
      ],
      1,
      "Dua kotak penuh itu dua puluhan, bukan dua. Dua puluh ditambah enam sama dengan dua puluh enam.",
    ),
    balok("donat", 1, 12),
    bagan("kukis", 1, 7, { t: "bilangan" }),
    panjang("pastel", 4, 6, "susun"),
  ]),
  C(3, "kanvas", "Misi Meja Kasir 3: catatan Dika", "Dika menyalin pesanan ke papan. Beri tanda atau lingkari, lalu tulis jawabanmu.", [
    tabel("lapis", 3, 5),
    balok("kue", 4, 4),
    bagan("donat", 2, 7, { t: "bilangan" }, 1, "puluhan"),
    panjang("kukis", 3, 9, "gabung"),
  ]),
  C(4, "suara", "Misi Meja Kasir 4: panggilan Bu Sari", "Bu Sari bertanya dari balik meja kasir. Jawab dengan suaramu.", [
    tabel("pastel", 2, 3),
    balok("lapis", 1, 8),
    bagan("kue", 1, 2, { t: "arti", kolom: "puluhan" }),
    panjang("donat", 4, 6, "satuan"),
  ]),
];

const P = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(5, "klik", "Misi Meja Kasir 5: kertas kolom", "Nia menggambar kertas pesanan dengan bentuk polos.", [
    tabel("kue", 2, 8),
    balok("kue", 4, 6),
    salah(
      bagan("kue", 2, 1, { t: "bilangan" }),
      "Nia",
      "Aku taruh angka satu di kolom puluhan dan angka dua di kolom satuan.",
      12,
      [
        "Nia benar, angka yang kecil boleh ditaruh di kolom puluhan.",
        "Ada dua puluhan dan satu satuan, jadi angka dua di kolom puluhan dan angka satu di kolom satuan.",
        "Kolom satuan selalu diisi angka yang lebih besar.",
      ],
      1,
      "Letak angkanya tertukar. Dua puluhan ada di kolom puluhan, satu satuan di kolom satuan, jadi bilangannya dua puluh satu.",
    ),
    panjang("kue", 3, 7, "susun"),
  ]),
  P(6, "kanvas", "Misi Meja Kasir 6: lembar Nia", "Nia mengisi lembar pesanan. Beri tanda atau lingkari, lalu tulis jawabanmu.", [
    tabel("kue", 5, 0),
    balok("kue", 1, 3),
    bagan("kue", 4, 9, { t: "bilangan" }, 1, "satuan"),
    panjang("kue", 2, 4, "gabung"),
  ]),
  P(7, "suara", "Misi Meja Kasir 7: lapor ke Bu Sari", "Nia melaporkan lembar pesanan kepada Bu Sari. Sebutkan jawabanmu.", [
    tabel("kue", 3, 3),
    balok("kue", 2, 7),
    bagan("kue", 2, 3, { t: "tukar" }),
    panjang("kue", 1, 1, "satuan"),
  ]),
];

const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Meja Kasir 8: tiket pesanan", "Tiket pesanan lomba hanya berisi kata dan angka.", [
    tabel("kue", 4, 5),
    balok("kue", 3, 19),
    salah(
      bagan("kue", 1, 8, { t: "arti", kolom: "puluhan" }),
      "Dika",
      "Angka satu pada bilangan itu artinya satu saja.",
      1,
      [
        "Dika benar, sebuah angka selalu berarti dirinya sendiri di mana pun letaknya.",
        "Angka satu di kolom puluhan artinya satu puluhan, yaitu sepuluh.",
        "Angka di kolom puluhan artinya sama dengan angka di kolom satuan.",
      ],
      1,
      "Angka di kolom puluhan artinya puluhan. Satu puluhan itu sepuluh, bukan satu.",
    ),
    panjang("kue", 3, 2, "susun"),
  ]),
  A(9, "kanvas", "Misi Meja Kasir 9: tulis di tiket", "Chacha meminta Dika menulis jawaban di kanvas.", [
    tabel("kue", 4, 8),
    balok("kue", 1, 5),
    bagan("kue", 5, 0, { t: "bilangan" }, 1, "puluhan"),
    panjang("kue", 3, 5, "gabung"),
  ]),
  A(10, "suara", "Misi Meja Kasir 10: lapor terakhir", "Laporan terakhir untuk Bu Sari. Bacakan jawabannya.", [
    tabel("kue", 1, 4),
    balok("kue", 3, 7),
    bagan("kue", 3, 2, { t: "tukar" }),
    panjang("kue", 1, 6, "satuan"),
  ]),
];

export const POIN_PENTING = [
  "Sepuluh kue dikemas dalam satu kotak penuh: satu puluhan. Kue yang tidak cukup sepuluh disebut satuan.",
  "Tabel puluhan dan satuan: angka kiri menunjukkan puluhan, angka kanan menunjukkan satuan.",
  "Arti angka bergantung pada letaknya. 34 dan 43 memakai angka yang sama, tetapi artinya berbeda.",
  "Angka nol di kolom satuan artinya tidak ada satuan. Nol menjaga letak puluhan.",
  "Sepuluh satuan bisa ditukar dengan satu puluhan. Cara paling ringkas: satuannya kurang dari sepuluh.",
  "Bentuk panjang: bilangan sama dengan puluhan ditambah satuan, misalnya 38 = 30 + 8.",
];
/** Poin penting untuk suara (tanpa digit dan tanpa lambang). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) =>
  p
    .replace(/\d+/g, (d) => kata(Number(d)))
    .replace(/ = /g, " sama dengan ")
    .replace(/ \+ /g, " ditambah "),
);

export const JEMBATAN = "Pesanan sudah tepat dan semua pelari kebagian kue. Dapur membawa dua nampan baru yang berbeda isinya. Ayo lanjut ke Sub-Bab C untuk membandingkan dua nampan itu.";
export const JEMBATAN_SUARA = `${JEMBATAN} Hebat!`;

export const TEMA_TAHAP = {
  concrete: { ikon: "\u{1F4B0}", nama: "Concrete", cara: "Meja kasir kayu: kotak kue, kue lepas, balok, dan kartu angka" },
  pictorial: { ikon: "\u{1F4C4}", nama: "Pictorial", cara: "Kertas kolom: bingkai, titik, dan batang polos" },
  abstract: { ikon: "\u{1F3AB}", nama: "Abstract", cara: "Tiket pesanan bergerigi: kata dan angka saja" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_KASIR, PICTORIAL as PICTORIAL_KASIR, ABSTRACT as ABSTRACT_KASIR, TEMA_TAHAP as TEMA_KASIR, MISI_MEJA as MISI_MEJA_KASIR };
