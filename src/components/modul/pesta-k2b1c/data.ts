/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 2 Bab 1 Sub-Bab C "Dua Nampan untuk Pesta Kue",
 * akhir cerita Kue di Kantin Sekolah. Angka Story (lapis 38 dan donat 41, pastel 32 dan bolu 35, tiga nampan 33, 24, 29) hanya dipakai di Mind-map dan Infografis.
 * Simulasi dan CPA memakai nampan dan bilangan lain, melanjutkan "Misi Meja Pesta". Bilangan paling besar lima puluh.
 * Diuji: scripts/uji-pesta-k2b1c.mjs.
 */
import type { Langkah, LangkahDasar, LangkahSalah, LangkahSoal, NampanSim, Rupa, SoalMisi, Tempat } from "./logika";
import { instruksi, kata, metodeLangkah } from "./logika";
import type { Cara } from "./logika";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

/* ------------------------------ Kue ------------------------------ */
export type Kue = { nama: string; emoji: string; warna: string };
/** Sepuluh jenis kue untuk Concrete (emoji berwarna) dan Simulasi. Pictorial memakai diagram polos, Abstract memakai kata dan angka. */
export const KUE: Kue[] = [
  { nama: "lapis", emoji: "\u{1F370}", warna: "#FCA5A5" },
  { nama: "donat", emoji: "\u{1F369}", warna: "#FDE68A" },
  { nama: "pastel", emoji: "\u{1F95F}", warna: "#BBF7D0" },
  { nama: "bolu", emoji: "\u{1F9C1}", warna: "#BFDBFE" },
  { nama: "roti", emoji: "\u{1F950}", warna: "#FDBA74" },
  { nama: "kukis", emoji: "\u{1F36A}", warna: "#F9A8D4" },
  { nama: "pai", emoji: "\u{1F967}", warna: "#FED7AA" },
  { nama: "wafel", emoji: "\u{1F9C7}", warna: "#DDD6FE" },
  { nama: "pretzel", emoji: "\u{1F968}", warna: "#FDE68A" },
  { nama: "kue bulan", emoji: "\u{1F96E}", warna: "#BAE6FD" },
];

/* ------------------------------ Mind-map: tali umbul-umbul (hanya poin pelajaran) ------------------------------ */
export const PUSAT_UMBUL = "Membandingkan bilangan sampai lima puluh";
export const KELOMPOK_UMBUL: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Tali bawah", ikon: "\u{1F6A7}", isi: "#FDE68A", garis: "#A16207", petunjuk: "Bendera ini kuning. Pasang di tali bawah, tempat masalah." },
  metode: { nama: "Penyelesaian", letak: "Tali tengah", ikon: "\u{1F4CB}", isi: "#BFDBFE", garis: "#1D4ED8", petunjuk: "Bendera ini biru. Pasang di petak bernomor yang pas." },
  hasil: { nama: "Hasil", letak: "Tali atas", ikon: "\u{1F3C6}", isi: "#BBF7D0", garis: "#15803D", petunjuk: "Bendera ini hijau. Pasang di tali atas, tempat hasil." },
};
export const TEMPAT_UMBUL: Tempat[] = [
  tp("um-m1", "masalah", "Dua bilangan hampir sama"),
  tp("um-m2", "masalah", "Satuan besar membuat salah pilih"),
  tp("um-m3", "masalah", "Banyak bilangan belum berurutan"),
  tp("um-p1", "metode", "Perkirakan dulu, kira-kira", 1),
  tp("um-p2", "metode", "Bilangan Patokan", 2),
  tp("um-p3", "metode", "Puluhan dulu", 3),
  tp("um-p4", "metode", "Puluhan sama, lihat satuan", 4),
  tp("um-p5", "metode", "Garis Bilangan: kanan lebih besar", 5),
  tp("um-p6", "metode", "Model Batang: batang lebih panjang", 6),
  tp("um-p7", "metode", "Pasang tanda dan urutkan", 7),
  tp("um-h1", "hasil", "Lebih besar"),
  tp("um-h2", "hasil", "Lebih kecil"),
  tp("um-h3", "hasil", "Sama dengan"),
  tp("um-h4", "hasil", "Urut dari kecil ke besar"),
];
export const PETUNJUK_URUT_UMBUL = "Warnanya sudah benar. Nomor benderanya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_UMBUL =
  "Ini tali umbul-umbul Pesta Kue. Tali bawah berisi masalah. Tali tengah punya tujuh bendera bernomor berisi langkah yang berurutan, ikuti nomornya dari satu sampai tujuh. Tali atas berisi hasil. Ketuk bendera, lalu ketuk tempat yang cocok.";

/* ------------------------------ Infografis: taplak Pesta Kue ------------------------------ */
export const KOLOM_TAPLAK = ["Bilangan", "Puluhan dan satuan", "Hasil"] as const;
export const BARIS_TAPLAK: { ikon: string; nama: string; banyak: string; ps: string; hasil: string }[] = [
  { ikon: "\u{1F370}", nama: "Lapis", banyak: "38", ps: "3 puluhan 8 satuan", hasil: "lebih kecil dari 41" },
  { ikon: "\u{1F369}", nama: "Donat", banyak: "41", ps: "4 puluhan 1 satuan", hasil: "lebih besar dari 38" },
  { ikon: "\u{1F95F}", nama: "Pastel", banyak: "32", ps: "3 puluhan 2 satuan", hasil: "satuan 2 kurang dari 5" },
  { ikon: "\u{1F9C1}", nama: "Bolu", banyak: "35", ps: "3 puluhan 5 satuan", hasil: "satuan 5 lebih dari 2" },
  { ikon: "\u{1F4E6}", nama: "Terkecil", banyak: "24", ps: "2 puluhan 4 satuan", hasil: "paling kecil dari tiga" },
  { ikon: "\u{1F381}", nama: "Terbesar", banyak: "33", ps: "3 puluhan 3 satuan", hasil: "paling besar dari tiga" },
];
export const TEMPAT_TAPLAK: Tempat[] = BARIS_TAPLAK.flatMap((b, i) => [tp(`t${i}-banyak`, "banyak", b.banyak), tp(`t${i}-ps`, "ps", b.ps), tp(`t${i}-hasil`, "hasil", b.hasil)]);
export const KELOMPOK_TAPLAK: Record<string, string> = {
  banyak: "Label ini banyak kue. Tempelkan di kolom Bilangan.",
  ps: "Label ini puluhan dan satuan. Tempelkan di kolom Puluhan dan satuan.",
  hasil: "Label ini hasil membandingkan. Tempelkan di kolom Hasil.",
};
export const SUARA_TAPLAK = "Ini taplak Pesta Kue, dari cerita dua nampan untuk pesta kue. Tiap baris satu nampan. Tempelkan bilangannya, puluhan dan satuannya, dan hasil membandingkannya.";

/* ------------------------------ Simulasi: Misi Meja Pesta bagian satu ------------------------------ */
/** Nampan di Meja Pesta (berbeda dari Story): kukis 26, roti 18, pai 44, wafel 36, kue bulan 26, pretzel 39. Kukis dan kue bulan sama banyak; wafel dan pretzel puluhannya sama. */
export const NAMPAN_SIM: readonly NampanSim[] = [
  { id: "kukis", kue: 5, n: 26 },
  { id: "roti", kue: 4, n: 18 },
  { id: "pai", kue: 6, n: 44 },
  { id: "wafel", kue: 7, n: 36 },
  { id: "bulan", kue: 9, n: 26 },
  { id: "pretzel", kue: 8, n: 39 },
];
export const NAMA_SIM: string[] = NAMPAN_SIM.map((x) => KUE[x.kue].nama);
export const MISI_PESTA =
  "Misi Meja Pesta bagian satu: perkirakan dulu banyak kue tiap nampan, bandingkan dua nampan lewat tabel puluhan dan satuan, pasang tandanya, lalu urutkan tiga nampan. Urutannya bebas.";

/* ------------------------------ CPA: lanjutan Misi Meja Pesta ------------------------------ */
const pul = (a: number, b: number, tanya: "besar" | "kecil", kue = 0): LangkahDasar => ({ tipe: "puluhan", a, b, tanya, kue });
const gar = (isi: number[], tanya: "besar" | "kecil" | "tengah", kue = 0): LangkahDasar => ({ tipe: "garis", isi, tanya, kue });
const pat = (n: number, angka: boolean, kue = 0): LangkahDasar => ({ tipe: "patokan", n, angka, kue });
const bat = (isi: number[], tanya: "besar" | "kecil", kue = 0): LangkahDasar => ({ tipe: "batang", isi, tanya, kue });
const salah = (dasar: LangkahDasar, tokoh: string, kataTokoh: string, jawabTokoh: number | undefined, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
  tipe: "salah",
  dasar,
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

const C = kelompok("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Meja Pesta 2: nampan baru dari dapur", "Bu Dewi membawa nampan baru dari dapur. Bantu Chacha membandingkannya di meja Pesta Kue.", [
    salah(
      pul(19, 22, "besar", 5),
      "Chacha",
      "Satuannya sembilan lebih besar dari dua, jadi nampan kiri lebih banyak.",
      19,
      [
        "Chacha benar, satuan yang lebih besar berarti kuenya lebih banyak.",
        "Bandingkan puluhannya dulu. Dua kotak sepuluh lebih banyak dari satu kotak sepuluh.",
        "Nampan kiri lebih banyak karena kuenya lebih besar.",
      ],
      1,
      "Chacha hanya melihat satuannya. Lihat kotak sepuluhnya dulu: nampan kanan punya dua kotak, nampan kiri hanya satu.",
    ),
    gar([47, 16, 28], "tengah", 1),
    pat(17, false, 2),
    bat([15, 43, 28], "besar", 3),
  ]),
  C(3, "kanvas", "Misi Meja Pesta 3: catatan Dika", "Dika mencatat kue di nampan. Lingkari atau tandai, lalu tulis jawabanmu.", [
    pul(17, 14, "kecil", 6),
    gar([12, 48, 37], "besar", 7),
    pat(26, false, 4),
    bat([49, 21, 35], "kecil", 5),
  ]),
  C(4, "suara", "Misi Meja Pesta 4: panggilan Bu Sari", "Bu Sari bertanya dari balik etalase. Jawab dengan suaramu.", [
    pul(36, 44, "besar", 0),
    gar([49, 18, 36], "kecil", 2),
    pat(14, true, 1),
    bat([26, 11, 37], "besar", 3),
  ]),
];

const P = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(5, "klik", "Misi Meja Pesta 5: kertas lipat", "Nia melipat kertas dan menggambar diagram polos untuk membandingkan bilangan.", [
    pul(21, 17, "besar"),
    salah(
      gar([28, 36, 31], "kecil"),
      "Nia",
      "Di garis bilangan, yang paling ke kanan itu paling kecil.",
      36,
      [
        "Nia benar, makin ke kanan makin kecil.",
        "Yang paling kecil ada di tengah garis.",
        "Makin ke kanan makin besar, jadi yang paling kecil ada di paling kiri.",
      ],
      2,
      "Pada garis bilangan, makin ke kanan makin besar. Yang paling kecil ada di paling kiri.",
    ),
    pat(36, false),
    bat([19, 47, 32], "besar"),
  ]),
  P(6, "kanvas", "Misi Meja Pesta 6: lembar Dika", "Dika menggambar lembar diagram. Lingkari atau tandai, lalu tulis jawabanmu.", [
    pul(25, 20, "kecil"),
    gar([37, 44, 41], "besar"),
    pat(12, false),
    bat([16, 33, 49], "kecil"),
  ]),
  P(7, "suara", "Misi Meja Pesta 7: lapor ke Bu Dewi", "Nia melaporkan hasil diagram kepada Bu Dewi. Sebutkan jawabanmu.", [
    pul(39, 36, "besar"),
    gar([13, 19, 22], "tengah"),
    pat(48, true),
    bat([22, 12, 38], "kecil"),
  ]),
];

const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Meja Pesta 8: spanduk Pesta Kue", "Spanduk Pesta Kue hanya berisi kata dan lambang.", [
    salah(
      pul(18, 21, "besar"),
      "Dika",
      "Delapan lebih besar dari satu, jadi delapan belas lebih besar dari dua puluh satu.",
      18,
      [
        "Dika benar, satuan yang lebih besar membuat bilangannya lebih besar.",
        "Bandingkan puluhannya dulu. Dua puluhan lebih banyak dari satu puluhan.",
        "Bilangan yang lebih besar adalah yang angkanya paling kecil.",
      ],
      1,
      "Dika membandingkan satuannya saja. Puluhan dulu: dua puluhan lebih banyak dari satu puluhan, jadi dua puluh satu lebih besar.",
    ),
    gar([26, 43, 19], "tengah"),
    pat(37, false),
    salah(
      bat([37, 12, 25], "kecil"),
      "Nia",
      "Batang yang paling pendek menunjukkan dua belas.",
      undefined,
      [
        "Batang paling pendek berarti bilangan paling kecil, dan dua belas memang yang paling kecil.",
        "Batang paling pendek berarti bilangan paling besar.",
        "Semua batang sama panjang, jadi tidak ada yang paling pendek.",
      ],
      0,
      "Nia benar. Batang yang paling pendek menunjukkan bilangan yang paling kecil, yaitu dua belas.",
      true,
    ),
  ]),
  A(9, "kanvas", "Misi Meja Pesta 9: tulis di spanduk", "Chacha meminta kamu menulis jawaban di kanvas.", [
    pul(15, 13, "besar"),
    gar([14, 39, 22], "besar"),
    pat(22, false),
    bat([36, 48, 18], "kecil"),
  ]),
  A(10, "suara", "Misi Meja Pesta 10: sambutan Bu Sari", "Sambutan terakhir untuk Pesta Kue. Bacakan jawabannya.", [
    pul(44, 39, "besar"),
    gar([17, 41, 25], "tengah"),
    pat(47, true),
    bat([11, 49, 33], "besar"),
  ]),
];

export const POIN_PENTING = [
  "Perkirakan dulu dengan bilangan patokan, lalu hitung untuk membuktikannya.",
  "Bandingkan puluhannya dulu. Yang puluhannya lebih banyak, bilangannya lebih besar.",
  "Kalau puluhannya sama, bandingkan satuannya.",
  "Tanda lebih besar dan lebih kecil terbuka ke bilangan yang lebih besar. Kalau sama banyak, pakai tanda sama dengan.",
  "Garis Bilangan: makin ke kanan makin besar. Model Batang: makin panjang makin besar.",
  "Mengurutkan: cari yang paling kecil dulu, lalu berikutnya, sampai yang paling besar.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace(/\d+/g, (d) => kata(Number(d))));

/** Perayaan akhir cerita bab (Abstract). */
export const PERAYAAN = "Pesta Kue dibuka! Nampan donat sudah di meja, semua anak kebagian kue, dan kantin ramai oleh tawa. Hebat, kamu sudah bisa membandingkan bilangan sampai lima puluh!";
export const PERAYAAN_SUARA = "Pesta Kue dibuka! Nampan donat sudah di meja, semua anak kebagian kue, dan kantin ramai oleh tawa. Hebat, kamu sudah bisa membandingkan bilangan sampai lima puluh!";
/** Penutup bab: tidak ada jembatan ke Sub-Bab berikutnya, hanya ucapan selamat. */
export const PENUTUP_BAB = "Kamu telah menyelesaikan Bab satu: Ayo Membilang sampai dengan Lima Puluh. Terima kasih, Chacha, Dika, Nia, Bu Sari, dan Bu Dewi!";

export const TEMA_TAHAP = {
  concrete: { ikon: "\u{1F388}", nama: "Concrete", cara: "Meja Pesta Kue: nampan berisi kotak sepuluh dan kue lepas untuk dibandingkan" },
  pictorial: { ikon: "\u{1F4C4}", nama: "Pictorial", cara: "Kertas lipat: diagram polos, garis bilangan, dan batang untuk dibandingkan" },
  abstract: { ikon: "\u{1F389}", nama: "Abstract", cara: "Spanduk Pesta Kue: kata dan lambang saja, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_PESTA, PICTORIAL as PICTORIAL_PESTA, ABSTRACT as ABSTRACT_PESTA, TEMA_TAHAP as TEMA_PESTA };
