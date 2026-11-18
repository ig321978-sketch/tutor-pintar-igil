/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 2 Bab 6 Sub-Bab A "Peralatan Lomba Pak Anton" (berat benda), awal cerita Hari Olahraga Sekolah.
 * Misi lanjutan "Misi Pos Timbang" (nomor misi berlanjut dari Simulasi). Benda berbeda dari Story (balon, batu bata, ransel, sepatu, topi, piala, medali, keranjang,
 * kardus, gelas, kaus kaki, kaos lari; Pictorial memakai balok berhuruf, batang, dan titik polos; Abstract memakai kartu kata dan angka). Jawaban bukan hanya angka:
 * memilih kata, mengetuk batang atau neraca, mengetuk benda berurutan, mengucapkan satu kata atau bilangan, dan satu angka di kanvas. Kunci dihitung dari berat.
 * Angka jawaban Tulis di kanvas per tahap: Concrete 5, 7, 2, 8; Pictorial 7, 5, 3, 9; Abstract 8, 3, 5, 6 (tidak kembar dalam satu tahap).
 * Ruang jawaban 1 sampai 9 sempit sehingga angka Story (1, 2, 3, 4, 6, 9) kadang dipakai lagi dalam hitungan lain, bukan sebagai operan yang sama.
 * Diuji: scripts/uji-timbang-k2b6a.mjs.
 */
import type { Benda, Cara, Langkah, LangkahSalah, LangkahSoal, Rupa, SoalMisi } from "./logika-cpa";
import { instruksi, kata, metodeLangkah } from "./logika-cpa";

export { MISI_TIMBANG_TEKS } from "./data-peta";

const B = (w: number, o?: number, besar?: boolean): Benda => ({ w, ...(o === undefined ? {} : { o }), ...(besar ? { besar: true } : {}) });
const banding = (kiri: Benda, kanan: Benda): Langkah => ({ tipe: "igil", mode: "banding", kiri, kanan });
const satuan = (benda: Benda, sat: Benda): Langkah => ({ tipe: "igil", mode: "satuan", benda, satuan: sat });
const batang = (items: Benda[], cari: "terberat" | "teringan" = "terberat"): Langkah => ({ tipe: "batang", items, cari });
const titik = (...pasang: [Benda, Benda][]): Langkah => ({ tipe: "titik", pasang });
const urut = (items: Benda[], pasang: [number, number][], tanda: number): Langkah => ({ tipe: "dasar", mode: "urut", items, pasang, tanda });
const rantai = (a: Benda, b: Benda, c: Benda, r1: number, r2: number): Langkah => ({ tipe: "dasar", mode: "rantai", a, b, c, r1, r2 });
const salah = (kiri: Benda, kanan: Benda, tokoh: string, kataTokoh: string, jawabTokoh: LangkahSalah["jawabTokoh"], alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
  tipe: "salah",
  dasar: { tipe: "igil", mode: "banding", kiri, kanan },
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

/* ------------------------------ Concrete: lapangan dengan troli dan benda beremoji ------------------------------ */
// Benda: 0 balon, 1 batu bata, 2 ransel, 3 sepatu, 4 topi, 5 piala, 6 medali, 7 keranjang, 8 kardus, 9 gelas, 10 kaus kaki, 11 kaos lari.
const C = kelompok("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Pos Timbang 2: troli Pak Anton", "Pak Anton menurunkan benda dari troli. Bandingkan beratnya dengan adil.", [
    salah(
      B(1, 0, true),
      B(7, 1),
      "Chacha",
      "Balon besar ini lebih berat daripada batu bata kecil, karena balon lebih besar.",
      "lebih berat",
      [
        "Chacha benar, benda yang lebih besar selalu lebih berat.",
        "Chacha keliru: yang lebih berat berada lebih bawah, dan papan menunjukkan batu bata yang turun. Besar belum tentu berat.",
        "Papan jungkat-jungkit tidak bisa dipakai untuk membandingkan balon dengan batu bata.",
      ],
      1,
      "Chacha hanya melihat ukurannya. Papan menunjukkan batu bata yang turun, jadi batu bata lebih berat. Besar belum tentu berat.",
    ),
    batang([B(6, 2), B(3, 3), B(8, 5), B(2, 4)]),
    titik([B(3, 9), B(5, 7)], [B(4, 2), B(4, 11)], [B(7, 5), B(2, 4)]),
    urut([B(5, 2), B(3, 3), B(8, 8)], [[1, 0], [0, 2]], 0),
  ]),
  C(3, "kanvas", "Misi Pos Timbang 3: catatan Dika", "Dika mencatat hasil timbang di papan lapangan. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    satuan(B(10, 2), B(2, 10)),
    batang([B(9, 5), B(4, 3), B(2, 4), B(6, 7)]),
    titik([B(7, 8), B(5, 9)]),
    rantai(B(8, 8), B(4, 2), B(1, 4), 2, 4),
  ]),
  C(4, "suara", "Misi Pos Timbang 4: panggilan Bu Sari", "Bu Sari memanggil dari tenda panitia. Jawab dengan suaramu.", [
    banding(B(4, 7), B(4, 9)),
    batang([B(3, 11), B(8, 8), B(5, 9)]),
    titik([B(3, 6), B(6, 5)]),
    urut([B(6, 7), B(3, 3), B(9, 11), B(2, 4)], [[0, 2], [1, 0], [3, 1]], 0),
  ]),
];

/* ------------------------------ Pictorial: lembar strategi berkisi dengan balok berhuruf ------------------------------ */
const Pi = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Pos Timbang 5: lembar strategi", "Nia menggambar neraca balok di lembar strategi. Periksa timbangannya.", [
    salah(
      B(2),
      B(6),
      "Nia",
      "Sisi kiri neraca balok naik, jadi balok kiri lebih berat.",
      "lebih berat",
      [
        "Nia benar, sisi yang naik menunjukkan balok yang lebih berat.",
        "Nia keliru: sisi yang turun yang lebih berat. Sisi kiri naik, jadi balok kiri lebih ringan.",
        "Neraca balok tidak bisa dipakai untuk membandingkan dua balok.",
      ],
      1,
      "Nia melihat sisi yang naik. Padahal yang lebih berat berada lebih bawah, jadi sisi kiri yang naik menunjukkan balok kiri lebih ringan.",
    ),
    batang([B(5), B(2), B(7), B(4)], "teringan"),
    titik([B(5), B(3)], [B(4), B(6)], [B(2), B(2)]),
    urut([B(4), B(9), B(6)], [[0, 2], [2, 1]], 0),
  ]),
  Pi(6, "kanvas", "Misi Pos Timbang 6: lembar Dika", "Dika menyusun lembar strategi yang lebih besar. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    satuan(B(14), B(2)),
    batang([B(8), B(3), B(5), B(6)]),
    titik([B(8), B(5)]),
    rantai(B(9), B(3), B(1), 3, 3),
  ]),
  Pi(7, "suara", "Misi Pos Timbang 7: lapor ke Bu Sari", "Nia melaporkan lembar strateginya kepada Bu Sari. Sebutkan jawabanmu.", [
    banding(B(7), B(3)),
    batang([B(6), B(9), B(4)]),
    titik([B(5), B(5)]),
    urut([B(7), B(3), B(5), B(9)], [[3, 0], [2, 0], [1, 2]], 2),
  ]),
];

/* ------------------------------ Abstract: papan taktik putih dengan kartu kata ------------------------------ */
const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Pos Timbang 8: papan taktik", "Papan taktik hanya berisi kata dan angka.", [
    salah(
      B(6),
      B(4),
      "Dika",
      "Sisi kiri turun dan sisi kanan naik, jadi benda P lebih berat daripada benda Q.",
      "lebih berat",
      [
        "Dika salah, sisi yang turun menunjukkan benda yang lebih ringan.",
        "Dika salah, papan tidak boleh dipakai untuk membandingkan berat.",
        "Dika benar: sisi yang turun menunjukkan benda yang lebih berat.",
      ],
      2,
      "Dika benar. Sisi yang turun menunjukkan benda yang lebih berat, jadi benda di sisi kiri lebih berat.",
      true,
    ),
    batang([B(3), B(7), B(5), B(6)]),
    titik([B(8), B(5)], [B(3), B(7)], [B(4), B(4)]),
    urut([B(5), B(2), B(8), B(6)], [[2, 3], [3, 0], [0, 1]], 0),
  ]),
  A(9, "kanvas", "Misi Pos Timbang 9: tulis di papan", "Chacha meminta kamu menulis jawaban di kanvas.", [
    satuan(B(16), B(2)),
    batang([B(8), B(5), B(6), B(7)]),
    titik([B(9), B(4)]),
    rantai(B(6), B(3), B(1), 2, 3),
  ]),
  A(10, "suara", "Misi Pos Timbang 10: pengumuman Bu Sari", "Pengumuman terakhir untuk pos timbang. Bacakan jawabannya.", [
    banding(B(2), B(5)),
    batang([B(7), B(4), B(6)]),
    titik([B(7), B(3)]),
    urut([B(9), B(3), B(6), B(5)], [[0, 2], [3, 2], [1, 3]], 1),
  ]),
];

export const POIN_PENTING = [
  "Benda yang lebih berat turun, dan benda yang lebih ringan naik. Papan datar berarti sama berat.",
  "Besar belum tentu berat. Kira-kira dulu, lalu timbang untuk membuktikan.",
  "Untuk tiga benda atau lebih, pakai kata paling berat dan paling ringan.",
  "Satuan tidak baku harus satu jenis, dan banyak satuan adalah hasil ukurnya.",
  "Satuan yang lebih ringan perlu jumlah yang lebih banyak, jadi hasil ukur bergantung pada satuannya.",
  "Model Batang, Neraca Titik, dan Berat di Dasar membantu membandingkan dan menata benda.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace(/\d+/g, (d) => kata(Number(d))));

/** Jembatan ke Sub-Bab B. */
export const PENUTUP_A = "Peralatan lomba sudah sama berat untuk kedua tim. Sekarang Bu Ratna datang membawa jam besar. Menurutmu, bagaimana jam menolong lomba besok?";

export const TEMA_TIMBANG = {
  concrete: { ikon: "\u{1F6D2}", nama: "Concrete", cara: "Lapangan dengan troli: benda lomba beremoji di papan jungkat-jungkit, batang, dan neraca" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Lembar strategi berkisi: neraca balok berhuruf, batang, dan titik polos" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Papan taktik putih: kartu kata dan angka, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_TIMBANG, PICTORIAL as PICTORIAL_TIMBANG, ABSTRACT as ABSTRACT_TIMBANG };
