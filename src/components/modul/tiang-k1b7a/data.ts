/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 7 Sub-Bab A "Tiang dan Tangga",
 * awal cerita Rumah Pohon Abang. Angka Story (empat tiang, tiga tali, tiga burung, lima tongkat, dua dan tiga benda, sepuluh tongkat)
 * hanya dipakai di Mind-map dan Infografis. Simulasi dan CPA memakai benda dan panjang lain dan melanjutkan "Misi Rumah Pohon" bagian satu
 * sampai sepuluh. Tanpa satuan baku: panjang hanya dibandingkan dengan melihat ujungnya dari garis awal yang sama.
 * Diuji: scripts/uji-tiang-k1b7a.mjs.
 */
import type { Arah, ArahTangga, Cara, Hubungan, Langkah, LangkahDasar, LangkahSoal, Rupa, SoalMisi, Tempat, TiangSim } from "./logika";
import { instruksi, kata, metodeLangkah } from "./logika";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

/* ------------------------------ Gambar benda (Concrete) ------------------------------ */
/** Benda yang berdiri di garis awal: emoji di ujungnya dan nama untuk pembaca layar. */
export const EMOJI: Record<string, string> = { tiang: "\u{1F43F}\u{FE0F}", tongkat: "\u{1F962}", tali: "\u{1F9F5}", bata: "\u{1F9F1}", balok: "\u{1F528}", pohon: "\u{1F333}" };
export const NAMA_BENDA: Record<string, string> = { tiang: "tiang kayu", tongkat: "tongkat kayu", tali: "tali", bata: "bata", balok: "balok", pohon: "pohon" };
/** Warna benda berurutan (benda ke-i memakai PALET[i % 10]). */
export const PALET = ["#EF4444", "#FACC15", "#22C55E", "#3B82F6", "#F97316", "#A855F7", "#EC4899", "#14B8A6", "#84CC16", "#06B6D4"] as const;

/* ------------------------------ Mind-map: tangga kayu (hanya poin pelajaran) ------------------------------ */
export const PUSAT_TANGGA = "Membandingkan dan mengurutkan panjang";
export const KELOMPOK_TANGGA: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Tanah di kaki tangga", ikon: "\u{1F6A7}", isi: "#FDE68A", garis: "#A16207", petunjuk: "Label ini kuning. Tempelkan di tanah di kaki tangga." },
  metode: { nama: "Penyelesaian", letak: "Anak tangga", ikon: "\u{1F463}", isi: "#BFDBFE", garis: "#1D4ED8", petunjuk: "Label ini biru. Tempelkan di anak tangga yang nomornya pas." },
  hasil: { nama: "Hasil", letak: "Rumah pohon", ikon: "\u{1F3E0}", isi: "#BBF7D0", garis: "#15803D", petunjuk: "Label ini hijau. Tempelkan di rumah pohon di puncak tangga." },
};
export const TEMPAT_TANGGA: Tempat[] = [
  tp("tt-1", "masalah", "Panjang benda berbeda-beda"),
  tp("tt-2", "masalah", "Mana yang lebih panjang?"),
  tp("tt-3", "masalah", "Urutan belum jelas"),
  tp("as-1", "metode", "Mulai dari garis awal sama", 1),
  tp("as-2", "metode", "Banding langsung", 2),
  tp("as-3", "metode", "Dua benda: pakai kata lebih", 3),
  tp("as-4", "metode", "Banding dengan perantara", 4),
  tp("as-5", "metode", "Tiga benda atau lebih: paling", 5),
  tp("as-6", "metode", "Susun dari paling pendek", 6),
  tp("as-7", "metode", "Menyusun tangga", 7),
  tp("rp-1", "hasil", "Lebih tinggi, lebih pendek"),
  tp("rp-2", "hasil", "Ujung sejajar: sama tinggi"),
  tp("rp-3", "hasil", "Paling tinggi, paling pendek"),
  tp("rp-4", "hasil", "Tinggi dan rendah di udara"),
];
export const PETUNJUK_URUT_TANGGA = "Warnanya sudah benar. Nomor anak tangganya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_TANGGA =
  "Ini tangga kayu menuju rumah pohon. Tanah di kaki tangga berisi masalah. Tujuh anak tangga bernomor berisi langkah yang berurutan, ikuti nomornya dari bawah ke atas. Rumah pohon di puncak berisi hasil. Ketuk label, lalu ketuk tempat yang cocok.";

/* ------------------------------ Infografis: papan rencana tukang ------------------------------ */
export const KOLOM_RENCANA = ["Banyak benda", "Kata dipakai", "Catatan"] as const;
export const BARIS_RENCANA: { ikon: string; nama: string; banyak: string; kata: string; catatan: string }[] = [
  { ikon: "\u{1F9F1}", nama: "Tiang merah dan kuning", banyak: "2 tiang", kata: "lebih tinggi", catatan: "dua benda, pakai lebih" },
  { ikon: "\u{1F43F}\u{FE0F}", nama: "Empat tiang", banyak: "4 tiang", kata: "paling tinggi", catatan: "tiga benda atau lebih" },
  { ikon: "\u{1F9F5}", nama: "Tali pegangan", banyak: "3 tali", kata: "paling pendek", catatan: "mulai dari garis awal" },
  { ikon: "\u{1F426}", nama: "Burung di dahan", banyak: "3 burung", kata: "lebih rendah", catatan: "letak di udara" },
  { ikon: "\u{1F962}", nama: "Tongkat kayu", banyak: "5 tongkat", kata: "urut tangga", catatan: "pendek ke panjang" },
];
export const TEMPAT_RENCANA: Tempat[] = BARIS_RENCANA.flatMap((b, i) => [tp(`r${i}-banyak`, "banyak", b.banyak), tp(`r${i}-kata`, "kata", b.kata), tp(`r${i}-catatan`, "catatan", b.catatan)]);
export const KELOMPOK_RENCANA: Record<string, string> = {
  banyak: "Label ini banyak benda yang dibandingkan. Tempelkan di kolom Banyak benda.",
  kata: "Label ini kata yang dipakai. Tempelkan di kolom Kata dipakai.",
  catatan: "Label ini catatan caranya. Tempelkan di kolom Catatan.",
};
export const SUARA_RENCANA = "Ini papan rencana tukang di batang pohon, dari cerita tiang dan tangga. Tiap baris satu perbandingan. Tempelkan banyak bendanya, kata yang dipakai, dan catatannya.";

/* ------------------------------ Simulasi: Misi Rumah Pohon bagian satu, meja tukang ------------------------------ */
/** Tiang di meja tukang (berbeda dari Story). Sama dengan TIANG_SIM yang dipakai uji misi. Ungu dan abu sama tinggi; abu berdiri di atas bata, oranye dan merah muda juga. */
export const TIANG_SIM: readonly (TiangSim & { warna: string })[] = [
  { id: "oranye", nama: "Oranye", panjang: 7, alas: 2, warna: "#F97316" },
  { id: "ungu", nama: "Ungu", panjang: 4, alas: 0, warna: "#A855F7" },
  { id: "pink", nama: "Pink", panjang: 9, alas: 1, warna: "#EC4899" },
  { id: "abu", nama: "Abu", panjang: 4, alas: 3, warna: "#9CA3AF" },
  { id: "cokelat", nama: "Cokelat", panjang: 6, alas: 0, warna: "#A16207" },
];
export const MISI_MEJA =
  "Misi Rumah Pohon bagian satu: luruskan tiang di garis awal, bandingkan dua tiang, bawa tali ke tiang lain, lalu susun tangga. Urutannya bebas.";

/* ------------------------------ CPA: lanjutan Misi Rumah Pohon ------------------------------ */
const banding = (isi: number[], acuan: number, arah: Arah, jenis = "tiang", alas?: number[]): Langkah => ({ tipe: "banding", isi, acuan, arah, jenis, ...(alas ? { alas } : {}) });
const langsung = (isi: number[], acuan: number, jenis = "tiang", angka = false): Langkah => ({ tipe: "langsung", isi, acuan, jenis, angka });
const perantara = (isi: number[], acuan: number, tanya: Hubungan, jenis = "tali"): Langkah => ({ tipe: "perantara", isi, acuan, tanya, jenis });
const tangga = (isi: number[], acuan: number, arah: ArahTangga, tanya: "urutan" | "banyak", jenis = "tongkat"): Langkah => ({ tipe: "tangga", isi, acuan, arah, tanya, jenis });
const salah = (dasar: Langkah, tokoh: string, kataTokoh: string, jawabTokoh: number | undefined, alasan: [string, string, string], benar: number, keliru: string): Langkah => ({
  tipe: "salah",
  dasar: dasar as LangkahDasar,
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
  C(1, "klik", "Misi Rumah Pohon 2: bengkel Kakek Jaya", "Kakek Jaya menurunkan tiang, tongkat, dan tali ke bengkel. Bantu Igil memeriksanya.", [
    salah(
      banding([5, 8, 6, 4, 7], 0, "tinggi", "tiang", [3, 0, 0, 0, 0]),
      "Igil",
      "Tiang bertanda paling tinggi, ujungnya paling atas!",
      0,
      [
        "Igil benar, yang ujungnya paling atas pasti paling tinggi.",
        "Tiang bertanda berdiri di atas bata. Bandingkan dari garis awal yang sama, yaitu tanah.",
        "Tiang yang lebih tebal pasti lebih tinggi.",
      ],
      1,
      "Tiang bertanda berdiri di atas bata, jadi ujungnya tampak tinggi. Dari tanah yang sama, ada tiga tiang yang lebih tinggi darinya.",
    ),
    langsung([6, 9, 6, 4, 6, 8], 0, "tongkat"),
    perantara([6, 9, 4, 8, 3, 7, 10, 6], 0, "lebih"),
    tangga([4, 9, 2, 7, 5, 8, 3, 6], 0, "naik", "banyak"),
  ]),
  C(2, "kanvas", "Misi Rumah Pohon 3: catatan Kaka", "Kaka mencatat tiang yang sudah dicat. Beri tanda di kanvas, lalu tulis jawabanmu.", [
    banding([3, 9, 4, 6, 8, 5, 7], 0, "tinggi", "tongkat"),
    langsung([4, 7, 4, 9, 4, 6], 0, "tiang"),
    perantara([5, 3, 2, 4, 7], 0, "lebih"),
    tangga([3, 11, 6, 9, 2, 8, 5, 10, 4, 7], 7, "naik", "urutan"),
  ]),
  C(3, "suara", "Misi Rumah Pohon 4: panggilan Abang", "Abang bertanya dari atas pohon jambu. Jawab dengan suaramu.", [
    banding([2, 10, 3, 8, 5, 7, 9, 4], 0, "tinggi", "tiang"),
    langsung([5, 8, 5, 3, 5, 9], 0, "tongkat", true),
    perantara([7, 3, 9, 2, 5, 4, 8, 10, 6], 0, "kurang"),
    tangga([5, 11, 2, 8, 6, 12, 3, 9, 4, 7], 0, "naik", "banyak", "tiang"),
  ]),
];

const P = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(1, "klik", "Misi Rumah Pohon 5: kertas cetak biru", "Abang menggambar rencana tangga di kertas cetak biru dengan batang polos.", [
    salah(
      banding([9, 5], 1, "tinggi", "tiang"),
      "Abang",
      "Batang kiri paling panjang.",
      undefined,
      [
        "Abang benar, batang kiri memang yang tertinggi.",
        "Hanya ada dua batang, jadi pakai kata lebih, bukan paling.",
        "Batang kanan yang paling panjang.",
      ],
      1,
      "Untuk dua benda dipakai kata lebih. Kata paling dipakai untuk tiga benda atau lebih.",
    ),
    langsung([7, 3, 7, 7, 5, 7], 0),
    perantara([3, 9, 5, 8, 10, 6, 4, 11, 2], 0, "lebih"),
    tangga([4, 9, 2, 7, 5, 8, 3, 6, 11], 8, "naik", "urutan"),
  ]),
  P(2, "kanvas", "Misi Rumah Pohon 6: denah di kertas", "Kaka menggambar denah tiang dengan batang polos. Beri tanda, lalu tulis jawabanmu.", [
    banding([8, 3, 9, 5, 2, 7, 10], 0, "pendek"),
    langsung([3, 8, 3, 5, 3, 8, 3], 0),
    perantara([6, 6, 2, 6, 9, 6, 4], 0, "pas"),
    tangga([12, 3, 9, 6, 2, 11, 5, 8, 4, 10], 0, "naik", "banyak"),
  ]),
  P(3, "suara", "Misi Rumah Pohon 7: lapor ke Mamah", "Abang melaporkan batang polos kepada Mamah. Sebutkan jawabanmu.", [
    banding([3, 9, 5, 8, 4, 7, 10], 0, "tinggi"),
    langsung([6, 2, 6, 9, 6, 6, 6, 4, 6], 0, "tiang", true),
    perantara([5, 3, 8, 2, 7], 0, "kurang"),
    tangga([9, 3, 7, 12, 5, 10, 2, 6], 6, "turun", "urutan"),
  ]),
];

const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(1, "klik", "Misi Rumah Pohon 8: papan tulis kapur", "Papan tulis kecil di bengkel hanya berisi kata dan huruf.", [
    salah(
      banding([9, 6, 3], 2, "tinggi"),
      "Igil",
      "C paling tinggi.",
      0,
      [
        "Igil benar, C ada di urutan terakhir jadi paling tinggi.",
        "A lebih tinggi dari B, dan B lebih tinggi dari C. Jadi A paling tinggi, C paling pendek.",
        "B paling tinggi karena ada di tengah.",
      ],
      1,
      "A lebih tinggi dari B dan B lebih tinggi dari C, jadi C justru paling pendek. Ada dua benda yang lebih tinggi dari C.",
    ),
    langsung([6, 9, 6, 4, 6], 0),
    perantara([3, 9, 5, 8, 10, 2, 1], 0, "lebih"),
    tangga([7, 12, 4, 9, 6, 11, 3, 10], 6, "turun", "urutan"),
  ]),
  A(2, "kanvas", "Misi Rumah Pohon 9: tulis di papan", "Kaka meminta Igil menulis jawaban di kanvas.", [
    banding([1, 9, 4, 7, 12, 5, 10, 3], 0, "tinggi"),
    langsung([4, 7, 4, 6, 4, 2], 0),
    perantara([6, 2, 9, 4, 5], 0, "lebih"),
    tangga([5, 2, 11, 7, 3, 9, 12, 4, 8, 6], 0, "naik", "banyak"),
  ]),
  A(3, "suara", "Misi Rumah Pohon 10: papan lantai menanti", "Papan lantai rumah pohon sudah menanti. Bacakan jawaban terakhir untuk Abang.", [
    banding([3, 9, 5, 2, 8, 4, 7], 3, "tinggi"),
    langsung([4, 4, 7, 4, 2, 4], 0, "tiang", true),
    perantara([8, 3, 9, 2, 7, 4, 6, 10], 0, "kurang"),
    tangga([6, 11, 3, 9, 2, 12, 5, 8, 4], 5, "naik", "urutan"),
  ]),
];

export const POIN_PENTING = [
  "Bandingkan dari garis awal yang sama. Benda di atas bata tampak lebih tinggi.",
  "Dua benda: lebih tinggi atau lebih pendek. Ujung sejajar berarti sama tinggi.",
  "Tiga benda atau lebih: paling tinggi dan paling pendek.",
  "Tali perantara: bawa tali sepanjang satu benda, lihat pas, kurang, atau lebih.",
  "Menyusun tangga: mulai dari yang paling pendek. Benda sama tinggi boleh bertukar.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace(/\d+/g, (d) => kata(Number(d))));

export const JEMBATAN = "Tangga sudah rapi. Papan lantai rumah pohon harus berapa panjang? Ayo lanjut ke Sub-Bab B untuk mengukurnya.";
export const JEMBATAN_SUARA = "Tangga sudah rapi. Papan lantai rumah pohon harus berapa panjang? Ayo lanjut ke Sub-Bab B untuk mengukurnya. Hebat!";

export const TEMA_TAHAP = {
  concrete: { ikon: "\u{1F528}", nama: "Concrete", cara: "Serbuk kayu di bengkel: ketuk benda berwarna, bawa tali, susun tangga" },
  pictorial: { ikon: "\u{1F4C4}", nama: "Pictorial", cara: "Kertas cetak biru: batang polos untuk diketuk, ditandai, dan disusun" },
  abstract: { ikon: "\u{270F}\u{FE0F}", nama: "Abstract", cara: "Papan tulis kapur: huruf dan kata saja, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_TIANG, PICTORIAL as PICTORIAL_TIANG, ABSTRACT as ABSTRACT_TIANG, TEMA_TAHAP as TEMA_TIANG };
