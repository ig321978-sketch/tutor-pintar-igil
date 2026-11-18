/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 2 Bab 3 Sub-Bab A "Ubin untuk Taman Bermain" (bangun datar), awal cerita Taman Bermain Sekolah.
 * Misi lanjutan "Misi Petak Ubin" (nomor misi berlanjut dari Simulasi). Bentuk dan benda berbeda dari Story (sarang lebah, rumah burung, jam dinding, uang logam,
 * ubin telur). Jawaban bukan hanya angka: nama bentuk (pilih atau ucapkan), satu angka banyak sisi (kanvas), memilah ke diagram Venn, dan mengetuk benda.
 * Angka jawaban Tulis di kanvas per tahap: Concrete 8, 7, 2, 3; Pictorial 7, 8, 1, 4; Abstract 8, 7, 3, 2 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-cpa-ubin-k2b3a.mjs.
 */
import type { Cara, ItemVenn, Kind, Langkah, LangkahDasar, LangkahSalah, LangkahSoal, Rupa, SoalMisi } from "./logika-cpa";
import { instruksi, kata, metodeLangkah } from "./logika-cpa";

export { MISI_PETAK } from "./data-peta";

type P = [number, number][];
/** Susunan paku (kolom, baris) pada papan paku lima kali lima; banyak paku sama dengan banyak sisi. */
const PAKU = {
  layang: [[2, 0], [4, 2], [2, 4], [0, 2]] as P,
  persegiPanjang: [[0, 1], [4, 1], [4, 3], [0, 3]] as P,
  segitiga: [[0, 4], [2, 0], [4, 4]] as P,
  lima: [[2, 0], [4, 2], [3, 4], [1, 4], [0, 2]] as P,
  enam: [[1, 0], [3, 0], [4, 2], [3, 4], [1, 4], [0, 2]] as P,
  tujuh: [[1, 0], [3, 0], [4, 1], [4, 3], [3, 4], [1, 4], [0, 2]] as P,
  delapan: [[1, 0], [3, 0], [4, 1], [4, 3], [3, 4], [1, 4], [0, 3], [0, 1]] as P,
};

const hit = (bentuk: Kind, awal: number): LangkahDasar => ({ tipe: "hitung", bentuk, awal });
const pap = (paku: P): LangkahDasar => ({ tipe: "papan", paku });
const ven = (isi: [Kind, boolean][]): LangkahDasar => ({ tipe: "venn", isi: isi.map(([bentuk, merah]): ItemVenn => ({ bentuk, merah })) });
const bur = (isi: Kind[], sasaran: Kind, sorot = 0): LangkahDasar => ({ tipe: "buru", isi, sasaran, sorot });
const salah = (dasar: LangkahDasar, tokoh: string, kataTokoh: string, jawabTokoh: string | undefined, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
  tipe: "salah",
  dasar: dasar as LangkahSalah["dasar"],
  tokoh,
  kataTokoh,
  ...(jawabTokoh === undefined ? {} : { jawabTokoh }),
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

/* ------------------------------ Concrete: lantai taman dengan keranjang ubin ------------------------------ */
const C = kelompok("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Petak Ubin 2: ubin baru dari Pak Tono", "Pak Tono mengantar ubin baru. Bantu Chacha memasangnya di papan permainan.", [
    salah(
      hit("segilima", 2),
      "Chacha",
      "Aku menghitung ubin ini sambil memutarnya: satu, dua, tiga, empat, lima, enam. Jadi ini segi enam.",
      "segi enam",
      [
        "Chacha benar, ubin segi lima punya enam sisi.",
        "Chacha memutar ubin tanpa tanda awal, jadi satu sisi terhitung dua kali. Ubin ini hanya punya lima sisi.",
        "Ubin ini bukan segi banyak karena tepinya lengkung.",
      ],
      1,
      "Chacha tidak menandai sisi awal, jadi sisi pertama terhitung dua kali. Beri tanda di satu sisi, lalu hitung berputar sampai kembali ke tanda.",
    ),
    pap(PAKU.layang),
    ven([["segitiga", true], ["segiempat", false], ["lingkaran", true], ["telur", false], ["segilima", true]]),
    bur(["segitiga", "segiempat", "lingkaran", "segiempat", "segilima", "segiempat"], "segiempat", 1),
  ]),
  C(3, "kanvas", "Misi Petak Ubin 3: catatan Dika", "Dika mencatat ubin yang masih tersisa. Hitung, lalu tulis jawabanmu di kanvas.", [
    hit("segidelapan", 5),
    pap(PAKU.tujuh),
    ven([["segilima", true], ["segienam", true], ["segitiga", false], ["lingkaran", true], ["telur", false], ["segiempat", false]]),
    bur(["segilima", "segitiga", "segilima", "segiempat", "segilima", "lingkaran"], "segilima"),
  ]),
  C(4, "suara", "Misi Petak Ubin 4: panggilan Bu Sari", "Bu Sari memanggil dari pos taman. Jawab dengan suaramu.", [
    hit("segiempat", 0),
    pap(PAKU.lima),
    ven([["segienam", true], ["segiempat", false], ["lingkaran", true], ["telur", false], ["segitiga", false]]),
    bur(["segitiga", "telur", "segiempat", "segilima", "lingkaran", "segitiga"], "segitiga", 1),
  ]),
];

/* ------------------------------ Pictorial: kertas kisi putih dengan bentuk polos ------------------------------ */
const Pi = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Petak Ubin 5: kertas kisi", "Nia menggambar bentuk polos pada kertas kisi. Hitung sisinya dan pilah bentuknya.", [
    hit("segienam", 3),
    salah(
      pap(PAKU.segitiga),
      "Nia",
      "Gambar yang karetnya melewati tiga paku ini bentuk lengkung.",
      "bentuk lengkung",
      [
        "Nia benar, bentuk ini bertepi lengkung.",
        "Tepinya garis lurus, jadi ini segi banyak. Ada tiga sisi, jadi namanya segitiga.",
        "Bentuk lengkung selalu punya tiga sisi.",
      ],
      1,
      "Tepi gambar itu garis lurus, bukan lengkung. Karena ada tiga sisi lurus, namanya segitiga.",
    ),
    ven([["segilima", false], ["segiempat", true], ["lingkaran", true], ["segitiga", true], ["separuh", false]]),
    bur(["segienam", "lingkaran", "segienam", "segitiga", "segilima", "segienam"], "segienam"),
  ]),
  Pi(6, "kanvas", "Misi Petak Ubin 6: lembar Dika", "Dika menggambar lembar bentuk. Hitung, lalu tulis jawabanmu di kanvas.", [
    hit("segitujuh", 1),
    pap(PAKU.delapan),
    ven([["segitiga", true], ["segiempat", false], ["lingkaran", true], ["telur", false], ["segilima", false]]),
    bur(["segiempat", "segiempat", "lingkaran", "segiempat", "segitiga", "segiempat"], "segiempat"),
  ]),
  Pi(7, "suara", "Misi Petak Ubin 7: lapor ke Bu Sari", "Nia melaporkan gambarnya kepada Bu Sari. Sebutkan jawabanmu.", [
    hit("segilima", 4),
    pap(PAKU.persegiPanjang),
    ven([["segienam", true], ["segitiga", false], ["lingkaran", true], ["separuh", false], ["segilima", false]]),
    bur(["segilima", "segitiga", "lingkaran", "segiempat", "segitiga", "segienam"], "segilima", 2),
  ]),
];

/* ------------------------------ Abstract: papan tulis hijau dengan kartu kata ------------------------------ */
const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Petak Ubin 8: papan tulis taman", "Papan tulis taman hanya berisi kata dan lambang.", [
    salah(
      hit("segienam", 0),
      "Dika",
      "Bentuk dengan enam sisi namanya segi lima.",
      "segi lima",
      [
        "Dika benar, nama segi lima dipakai untuk bentuk dengan enam sisi.",
        "Nama segi ditentukan oleh banyak sisinya. Enam sisi namanya segi enam, bukan segi lima.",
        "Bentuk dengan enam sisi tidak punya nama.",
      ],
      1,
      "Dika keliru memberi nama. Nama segi mengikuti banyak sisinya: enam sisi berarti segi enam.",
    ),
    salah(
      pap(PAKU.layang),
      "Chacha",
      "Karet melewati paku A, B, C, D, lalu kembali ke A, jadi bentuknya segi empat.",
      undefined,
      [
        "Chacha benar. Karet melewati empat paku, jadi ada empat sisi dan namanya segi empat.",
        "Karet harus melewati lima paku supaya jadi segi empat.",
        "Banyak paku tidak ada hubungannya dengan banyak sisi.",
      ],
      0,
      "Chacha benar. Banyak paku yang dilewati karet sama dengan banyak sisinya, yaitu empat, jadi namanya segi empat.",
      true,
    ),
    ven([["segilima", true], ["segiempat", false], ["lingkaran", true], ["segienam", false], ["telur", false]]),
    bur(["segienam", "lingkaran", "segiempat", "segitiga", "segiempat", "segilima"], "segiempat"),
  ]),
  A(9, "kanvas", "Misi Petak Ubin 9: tulis di papan", "Chacha meminta kamu menulis jawaban di kanvas.", [
    hit("segidelapan", 0),
    pap(PAKU.tujuh),
    ven([["segilima", true], ["segienam", true], ["segitiga", true], ["lingkaran", false], ["segiempat", false], ["telur", true]]),
    bur(["segienam", "lingkaran", "segienam", "segitiga", "segiempat", "segilima"], "segienam"),
  ]),
  A(10, "suara", "Misi Petak Ubin 10: pengumuman Bu Sari", "Pengumuman terakhir untuk papan permainan. Bacakan jawabannya.", [
    hit("segitujuh", 0),
    pap(PAKU.lima),
    ven([["segienam", true], ["telur", false], ["segiempat", false], ["lingkaran", true]]),
    bur(["segiempat", "lingkaran", "segitiga", "segilima", "segiempat", "segienam"], "segitiga", 1),
  ]),
];

export const POIN_PENTING = [
  "Tepi yang lurus disebut sisi. Bentuk yang tepinya lurus disebut segi banyak.",
  "Bentuk yang tepinya melengkung disebut bentuk lengkung, misalnya lingkaran.",
  "Beri tanda di satu sisi sebagai awal, lalu hitung berputar sampai kembali ke tanda.",
  "Nama segi banyak mengikuti banyak sisinya: segitiga, segi empat, segi lima, dan segi enam.",
  "Lingkaran adalah bentuk lengkung yang bulat sempurna: selalu pas ke arah mana pun diputar.",
  "Amati tepinya dulu: lurus atau melengkung. Lalu hitung sisinya atau lihat apakah pas bila diputar.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace(/\d+/g, (d) => kata(Number(d))));

/** Jembatan ke Sub-Bab B. */
export const PENUTUP_A = "Semua petak sudah terisi pas. Besok ada papan puzzle di pagar taman. Menurutmu, satu persegi bisa dipotong menjadi bentuk apa saja?";

export const TEMA_UBIN = {
  concrete: { ikon: "\u{1F9F1}", nama: "Concrete", cara: "Lantai taman: ubin berwarna, papan paku, dan benda di taman untuk dipilah dan dihitung" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Kertas kisi: bentuk polos, papan paku, dan diagram Venn untuk dihitung sisinya" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Papan tulis taman: kartu kata dan lambang saja, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_UBIN, PICTORIAL as PICTORIAL_UBIN, ABSTRACT as ABSTRACT_UBIN };
