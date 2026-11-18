/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 2 Bab 3 Sub-Bab B "Papan Puzzle yang Berantakan",
 * tengah cerita Taman Bermain Sekolah. Angka Story (persegi, segi enam, tangram tujuh keping, empat dan enam segitiga) hanya dipakai di Mind-map dan Infografis.
 * Simulasi dan CPA memakai bangun dan bayangan lain, melanjutkan "Misi Papan Puzzle". Bilangan paling besar sembilan.
 * Jawaban CPA bukan hanya angka: nama bentuk, menyusun keping ke bayangan, mengurutkan langkah, Cari kesalahan, dan satu angka banyak keping.
 * Diuji: scripts/uji-puzzle-k2b3b.mjs.
 */
import type { Cara, Langkah, LangkahSalah, LangkahSoal, Rupa, SoalMisi, Tempat } from "./logika";
import { instruksi, metodeLangkah } from "./logika";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

/** Gambar kecil pada keping kayu Concrete (emoji benda taman); Pictorial tanpa gambar. */
export const GAMBAR_KEPING = ["\u{1F333}", "\u{1F33C}", "\u{1F98B}", "\u{1F41E}", "\u{1F3E0}", "\u{2B50}", "\u{1F308}"];
export const WARNA_KAYU = ["#FCA5A5", "#FDE68A", "#BBF7D0", "#BFDBFE", "#DDD6FE", "#FDBA74", "#A5F3FC"];

/* ------------------------------ Mind-map: papan puzzle raksasa (hanya poin pelajaran) ------------------------------ */
export const PUSAT_PAPAN = "Mengurai dan menyusun bangun datar";
export const KELOMPOK_PAPAN: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Keping bawah", ikon: "\u{1F6A7}", isi: "#FDE68A", garis: "#A16207", petunjuk: "Keping ini kuning. Pasang di baris bawah, tempat masalah." },
  metode: { nama: "Penyelesaian", letak: "Keping tengah", ikon: "\u{1F4CB}", isi: "#BFDBFE", garis: "#1D4ED8", petunjuk: "Keping ini biru. Pasang di keping bernomor yang pas." },
  hasil: { nama: "Hasil", letak: "Keping atas", ikon: "\u{1F3C6}", isi: "#BBF7D0", garis: "#15803D", petunjuk: "Keping ini hijau. Pasang di baris atas, tempat hasil." },
};
export const TEMPAT_PAPAN: Tempat[] = [
  tp("pp-m1", "masalah", "Keping bertumpuk tidak boleh"),
  tp("pp-m2", "masalah", "Satu bangun harus dibagi jadi bagian"),
  tp("pp-m3", "masalah", "Banyak keping harus jadi satu bentuk"),
  tp("pp-p1", "metode", "Pakai semua keping, sisi menempel", 1),
  tp("pp-p2", "metode", "Urai: garis miring atau garis tengah", 2),
  tp("pp-p3", "metode", "Susun: sisi ke sisi, boleh putar dan balik", 3),
  tp("pp-p4", "metode", "Pola Blok: susun blok", 4),
  tp("pp-p5", "metode", "Lipat Kertas: lipat lalu urai", 5),
  tp("pp-p6", "metode", "Teka-Teki Bayangan: tutup bayangan", 6),
  tp("pp-p7", "metode", "Tangram: tujuh keping selalu", 7),
  tp("pp-h1", "hasil", "Satu bangun jadi banyak keping"),
  tp("pp-h2", "hasil", "Banyak keping jadi satu bentuk"),
  tp("pp-h3", "hasil", "Cara berbeda, hasil berbeda"),
  tp("pp-h4", "hasil", "Pola segitiga dari pojok dan tengah"),
];
export const PETUNJUK_URUT_PAPAN = "Warnanya sudah benar. Nomor kepingnya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_PAPAN =
  "Ini papan puzzle raksasa. Baris bawah berisi masalah. Baris tengah punya tujuh keping bernomor berisi langkah yang berurutan, ikuti nomornya dari satu sampai tujuh. Baris atas berisi hasil. Ketuk keping label, lalu ketuk tempat yang cocok.";

/* ------------------------------ Infografis: meja gambar guru seni ------------------------------ */
export const KOLOM_MEJA = ["Cara", "Keping hasil"] as const;
export const BARIS_MEJA: { nama: string; cara: string; hasil: string }[] = [
  { nama: "Persegi", cara: "garis miring", hasil: "2 segitiga" },
  { nama: "Persegi", cara: "garis tengah", hasil: "2 segi empat" },
  { nama: "2 segitiga siku-siku", cara: "sisi miring menempel", hasil: "1 persegi" },
  { nama: "2 segitiga siku-siku", cara: "sisi pendek menempel", hasil: "1 segitiga besar" },
  { nama: "Segi enam", cara: "garis dari satu pojok", hasil: "4 segitiga" },
  { nama: "Segi enam", cara: "garis dari titik tengah", hasil: "6 segitiga" },
];
export const TEMPAT_MEJA: Tempat[] = BARIS_MEJA.flatMap((b, i) => [tp(`m${i}-cara`, "cara", b.cara), tp(`m${i}-hasil`, "hasil", b.hasil)]);
export const KELOMPOK_MEJA: Record<string, string> = {
  cara: "Label ini cara mengurai atau menyusun. Tempelkan di kolom Cara.",
  hasil: "Label ini keping hasil. Tempelkan di kolom Keping hasil.",
};
export const SUARA_MEJA = "Ini meja gambar guru seni, dari cerita papan puzzle yang berantakan. Tiap baris satu bangun. Tempelkan cara mengurai atau menyusunnya, dan keping hasilnya.";

/* ------------------------------ Simulasi: Misi Papan Puzzle bagian satu ------------------------------ */
export const MISI_PAPAN_TEKS =
  "Misi Papan Puzzle bagian satu: urai segi lima dengan garis dari satu pojok dan dari titik tengah, susun keping pada bayangan tanpa bertumpuk, lalu pasang tujuh keping tangram. Urutannya bebas.";

/* ------------------------------ CPA: lanjutan Misi Papan Puzzle ------------------------------ */
const salah = (dasar: LangkahSalah["dasar"], tokoh: string, kataTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
  tipe: "salah",
  dasar,
  tokoh,
  kataTokoh,
  alasan,
  benar,
  keliru,
  ...(betul ? { betul: true } : {}),
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
  C(2, "klik", "Misi Papan Puzzle 2: meja kayu Bu Ratna", "Bu Ratna menaruh keping kayu bergambar di meja. Bantu Chacha mengurai, menyusun, dan memeriksa.", [
    { tipe: "uraiNama", n: 4, garis: "tengah" },
    { tipe: "susun", kind: "miring" },
    { tipe: "urut", metode: "lipat", judul: "Urutkan langkah Lipat Kertas.", langkah: ["Lipat kertas dari pojok ke pojok", "Gunting sepanjang bekas lipatan", "Tumpuk kedua bagian untuk memeriksa ukurannya"] },
    salah(
      { tipe: "tumpuk" },
      "Chacha",
      "Dua keping kutumpuk supaya cepat muat, jadi bayangannya pasti tertutup.",
      [
        "Chacha benar, makin cepat selesai makin baik.",
        "Keping tidak boleh bertumpuk. Sisinya harus menempel, dan tidak ada keping yang menutupi keping lain.",
        "Keping boleh bertumpuk kalau ukurannya kecil.",
      ],
      1,
      "Chacha menumpuk keping. Aturannya: semua keping dipakai, tidak bertumpuk, dan sisinya menempel.",
    ),
  ]),
  C(3, "kanvas", "Misi Papan Puzzle 3: catatan Dika", "Dika menghitung keping di meja. Hitung dengan teliti, lalu tulis satu angka di kanvas.", [
    { tipe: "pola", n: 5, dari: "pojok" },
    { tipe: "hitung", keping: [{ jenis: "segitiga", n: 3 }, { jenis: "persegi", n: 2 }, { jenis: "segiEmpat", n: 3 }], tanya: "semua" },
    { tipe: "lipat", lipatan: "duaMiring", tanya: "banyak" },
    { tipe: "bayangan", kind: "enamSegitiga", tanya: "banyak" },
  ]),
  C(4, "suara", "Misi Papan Puzzle 4: panggilan Bu Sari", "Bu Sari bertanya dari pagar taman. Jawab dengan suaramu.", [
    { tipe: "pola", n: 4, dari: "pojok" },
    { tipe: "gabungNama", kind: "pendek" },
    { tipe: "lipat", lipatan: "duaTengah", tanya: "nama" },
    { tipe: "bayangan", kind: "kiriKanan", tanya: "nama" },
  ]),
];

const P = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(5, "klik", "Misi Papan Puzzle 5: lembar bayangan", "Nia menggambar keping polos di lembar bayangan gelap. Periksa gambarnya dengan teliti.", [
    salah(
      { tipe: "uraiNama", n: 4, garis: "miring" },
      "Nia",
      "Garis miring dari pojok ke pojok membuat persegi itu menjadi tiga segitiga.",
      [
        "Nia benar, garis miring selalu membuat tiga segitiga.",
        "Garis miring dari pojok ke pojok membagi persegi menjadi dua segitiga yang sama besar, bukan tiga.",
        "Garis miring membuat dua persegi kecil.",
      ],
      1,
      "Nia salah menghitung. Satu garis miring hanya membagi persegi menjadi dua bagian, dan keduanya segitiga.",
    ),
    { tipe: "susun", kind: "pendek" },
    { tipe: "urut", metode: "lipat", judul: "Urutkan langkah Lipat Kertas.", langkah: ["Lipat persegi sekali di tengah", "Buka lipatan dan lihat garisnya", "Gunting sepanjang garis menjadi dua keping"] },
    { tipe: "bayangan", kind: "kiriKanan", tanya: "nama" },
  ]),
  P(6, "kanvas", "Misi Papan Puzzle 6: lembar Dika", "Dika menggambar lembar bayangan lain. Hitung kepingnya, lalu tulis satu angka di kanvas.", [
    { tipe: "pola", n: 6, dari: "pojok" },
    { tipe: "hitung", keping: [{ jenis: "segitiga", n: 2 }, { jenis: "segiEmpat", n: 3 }, { jenis: "persegi", n: 2 }], tanya: "semua" },
    { tipe: "lipat", lipatan: "miring", tanya: "banyak" },
    { tipe: "bayangan", kind: "atasBawah", tanya: "banyak" },
  ]),
  P(7, "suara", "Misi Papan Puzzle 7: lapor ke Bu Ratna", "Nia melaporkan hasil lembar bayangan kepada Bu Ratna. Sebutkan jawabanmu.", [
    { tipe: "pola", n: 5, dari: "pusat" },
    { tipe: "gabungNama", kind: "atasBawah" },
    { tipe: "lipat", lipatan: "tengah", tanya: "nama" },
    { tipe: "bayangan", kind: "pendek", tanya: "nama" },
  ]),
];

const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Papan Puzzle 8: lembar petunjuk lipat", "Lembar petunjuk lipat hanya berisi kata dan lambang.", [
    salah(
      { tipe: "pola", n: 6, dari: "pojok" },
      "Dika",
      "Segi enam diurai dari satu pojok menjadi empat segitiga, karena banyak sisi dikurangi dua.",
      [
        "Dika benar, dari satu pojok banyak segitiga adalah banyak sisi dikurangi dua, jadi enam dikurangi dua sama dengan empat.",
        "Dari satu pojok banyak segitiga sama dengan banyak sisi.",
        "Banyak segitiga tidak bergantung pada banyak sisi.",
      ],
      0,
      "Dika benar. Dari satu pojok, banyak segitiga adalah banyak sisi dikurangi dua, jadi segi enam menjadi empat segitiga.",
      true,
    ),
    { tipe: "gabungNama", kind: "kiriKanan" },
    { tipe: "urut", metode: "lipat", judul: "Urutkan langkah Lipat Kertas.", langkah: ["Lipat kertas persegi dari pojok ke pojok", "Gunting sepanjang lipatan", "Hitung banyak keping hasil guntingan"] },
    { tipe: "bayangan", kind: "enamSegitiga", tanya: "nama" },
  ]),
  A(9, "kanvas", "Misi Papan Puzzle 9: tulis di lembar", "Chacha meminta kamu menulis satu angka jawaban di kanvas.", [
    { tipe: "pola", n: 4, dari: "pusat" },
    { tipe: "hitung", keping: [{ jenis: "segitiga", n: 5 }, { jenis: "persegi", n: 1 }, { jenis: "segiEmpat", n: 1 }], tanya: "segitiga" },
    { tipe: "lipat", lipatan: "tengah", tanya: "banyak" },
    { tipe: "bayangan", kind: "enamSegitiga", tanya: "banyak" },
  ]),
  A(10, "suara", "Misi Papan Puzzle 10: laporan terakhir", "Laporan terakhir untuk papan puzzle. Bacakan jawabannya.", [
    { tipe: "pola", n: 5, dari: "pojok" },
    { tipe: "gabungNama", kind: "miring" },
    { tipe: "lipat", lipatan: "duaMiring", tanya: "nama" },
    { tipe: "bayangan", kind: "atasBawah", tanya: "nama" },
  ]),
];

export const POIN_PENTING = [
  "Pakai semua keping, jangan bertumpuk, dan sisi keping harus menempel rapat.",
  "Mengurai itu satu bangun menjadi beberapa keping. Menyusun itu beberapa keping menjadi satu bentuk.",
  "Cara mengurai dan cara menyusun memengaruhi hasilnya.",
  "Garis miring membagi persegi menjadi dua segitiga. Garis lurus di tengah membuatnya menjadi dua segi empat.",
  "Dari satu pojok, banyak segitiga adalah banyak sisi dikurangi dua. Dari titik tengah, banyak segitiga sama dengan banyak sisi.",
  "Tangram selalu tujuh keping, apa pun bentuk susunannya.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace(/\d+/g, ""));
/** Jembatan ke Sub-Bab C. */
export const PENUTUP_B = "Papan puzzle sudah utuh! Besok Pak Rudi membuka gudang mainan. Benda apa yang bisa diisi? Kita cari tahu di Sub-Bab C.";

export const TEMA_TAHAP = {
  concrete: { ikon: "\u{1F9E9}", nama: "Concrete", cara: "Meja kayu Bu Ratna: keping kayu bergambar taman untuk diurai dan disusun" },
  pictorial: { ikon: "\u{1F311}", nama: "Pictorial", cara: "Lembar bayangan gelap: keping polos untuk diurai, disusun, dan dihitung" },
  abstract: { ikon: "\u{1F4DC}", nama: "Abstract", cara: "Lembar petunjuk lipat: kata dan lambang saja, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_PUZZLE, PICTORIAL as PICTORIAL_PUZZLE, ABSTRACT as ABSTRACT_PUZZLE, TEMA_TAHAP as TEMA_PUZZLE };
export { MISI_PAPAN_TEKS as MISI_PAPAN };
