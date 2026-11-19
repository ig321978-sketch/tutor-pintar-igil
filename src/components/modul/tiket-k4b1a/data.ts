/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 1 Sub-Bab A "Loket Tiket Bu Maya" (membaca dan menulis bilangan sampai sepuluh ribu: empat tempat angka, membaca dari kiri, nol penjaga tempat),
 * awal cerita Penginapan Pulau Karang Indah. Misi lanjutan "Misi Tiket" (nomor misi berlanjut dari Simulasi). Data berbeda dari Story (tiket 3.406 dan 5.080, tulisan salah 3.46, contoh 7.025, 6.185),
 * kecuali seed Cari kesalahan dari alur (nol hilang saat menulis; 6.070 dibaca enam ribu tujuh puluh). Concrete memakai benda pulau wisata beremoji di loket beratap rumbia (tiket, papan empat kotak),
 * Pictorial memakai diagram polos (kartu bilangan, bagan tempat angka) di kertas denah pulau, Abstract memakai kartu kata dan angka di daftar tiket bercap.
 * Jawaban beragam: memilih tulisan atau bacaan bilangan, menulis satu angka di kanvas, dan mengucapkan satu kata (nama tempat) atau bilangan pendek. Jawaban benar dihitung dari data.
 * Angka jawaban Tulis di kanvas per tahap: Concrete 8, 2, 3, 1; Pictorial 5, 4, 2, 3; Abstract 9, 3, 4, 2 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-tiket-k4b1a.mjs.
 */
import type { Cara, Langkah, LangkahSalah, LangkahSoal, LBaca, LBagian, LKartu, LNamaTempat, LNol, LTempat, LTulis, Rupa, SoalMisi, Tempat } from "./logika-cpa";
import { URUT_METODE, instruksi, kataBil, ucapkan } from "./logika-cpa";

export { MISI_TIKET_TEKS } from "./data-sim";

const tulis = (angka: number): LTulis => ({ tipe: "tulis", angka });
const baca = (angka: number): LBaca => ({ tipe: "baca", angka });
const tempat = (angka: number, t: Tempat): LTempat => ({ tipe: "tempat", angka, tempat: t });
const namaTempat = (angka: number, urut: number): LNamaTempat => ({ tipe: "namaTempat", angka, urut });
const kartu = (angka: number): LKartu => ({ tipe: "kartu", angka });
const bagian = (angka: number): LBagian => ({ tipe: "bagian", angka });
const nol = (angka: number): LNol => ({ tipe: "nol", angka });
const salah = (dasar: LTulis | LBaca | LNol, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
  tipe: "salah",
  dasar,
  tokoh,
  kataTokoh,
  jawabTokoh,
  alasan,
  benar,
  keliru,
  ...(betul ? { betul } : {}),
});

/** Empat langkah satu misi, berurut metode: IGIL, Digit Cards, Chunk and Read, Zero Check. */
const satuMisi =
  (rupa: Rupa) =>
  (nomor: number, cara: Cara, judul: string, cerita: string, isi: [Langkah, Langkah, Langkah, Langkah]): SoalMisi => ({
    nomor,
    judul,
    cerita,
    cara,
    langkah: isi.map((l, i): LangkahSoal => {
      const s = instruksi(l, rupa, cara, URUT_METODE[i]);
      return { metode: URUT_METODE[i], cara, judul: s, suara: s, langkah: l };
    }),
  });

/* ------------------------------ Concrete: loket beratap rumbia dengan tiket beremoji dan papan empat kotak ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Tiket 2: loket tiket", "Bu Maya menata tiket di loket beratap rumbia. Periksa gambarnya.", [
    salah(
      tulis(4052),
      "Satria",
      "Bu Maya bilang empat ribu lima puluh dua. Aku tulis angka yang kudengar saja: 4.52.",
      "4.52",
      [
        "Satria benar, tempat yang tidak disebut boleh dilewati begitu saja.",
        "Satria keliru: tempat ratusan tidak disebut, jadi harus diisi nol dan tulisannya empat angka, yaitu 4.052.",
        "Satria keliru, bilangan ribuan selalu ditulis dengan tiga angka.",
      ],
      1,
      "Tempat ratusan tidak disebut, tetapi harus diisi nol supaya angka lain tidak bergeser. Tulisan bilangan ribuan punya empat angka.",
    ),
    kartu(8039),
    bagian(2904),
    nol(7308),
  ]),
  C(3, "kanvas", "Misi Tiket 3: papan harga", "Laras mencatat nomor di papan harga loket. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    tempat(6859, "ratusan"),
    kartu(5032),
    bagian(9401),
    nol(4607),
  ]),
  C(4, "suara", "Misi Tiket 4: panggilan Pak Hendro", "Pak Hendro memanggil dari dermaga. Jawab dengan suaramu.", [
    namaTempat(8261, 2),
    tempat(4095, "ratusan"),
    bagian(6504),
    nol(905),
  ]),
];

/* ------------------------------ Pictorial: kertas denah pulau dengan kartu bilangan dan bagan tempat angka polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Tiket 5: kertas denah", "Genta menyalin nomor ke kertas denah pulau. Periksa gambarnya.", [
    salah(
      baca(6070),
      "Genta",
      "Bilangan 6.070 dibaca enam ribu tujuh puluh. Angka nol di ratusan tidak dibaca.",
      kataBil(6070),
      [
        "Genta benar: nol tidak dibaca, tetapi tempat ratusannya tetap dihitung.",
        "Genta keliru: nol di tengah bilangan harus dibaca nol.",
        "Genta keliru, ribuan tidak boleh disebut saat membaca.",
      ],
      0,
      "Jawaban Genta benar: nol tidak dibaca, tetapi tempatnya tetap dihitung.",
      true,
    ),
    kartu(9061),
    bagian(7360),
    nol(5807),
  ]),
  Pi(6, "kanvas", "Misi Tiket 6: bagan Laras", "Laras menggambar bagan tempat angka. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    tempat(4516, "ratusan"),
    kartu(7680),
    bagian(8040),
    nol(9000),
  ]),
  Pi(7, "suara", "Misi Tiket 7: lapor ke Pak Hendro", "Genta melaporkan bagannya kepada Pak Hendro. Sebutkan jawabanmu.", [
    namaTempat(5924, 1),
    tempat(8340, "satuan"),
    bagian(3027),
    nol(2480),
  ]),
];

/* ------------------------------ Abstract: daftar tiket bercap dengan kartu kata dan angka ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Tiket 8: daftar tiket", "Daftar tiket Bu Maya hanya berisi kata dan angka.", [
    salah(
      tulis(9036),
      "Satria",
      "Sembilan ribu tiga puluh enam kutulis 9.36 saja, supaya lebih singkat.",
      "9.36",
      [
        "Satria benar, menulis lebih singkat selalu diperbolehkan.",
        "Satria keliru, angka nol harus ditulis lebih kecil dari angka lain.",
        "Satria keliru: ratusan tidak disebut, jadi harus diisi nol dan tulisannya 9.036.",
      ],
      2,
      "Ratusan tidak disebut, tetapi harus diisi nol. Tulisan yang benar punya empat angka.",
    ),
    kartu(1805),
    bagian(5049),
    nol(6203),
  ]),
  A(9, "kanvas", "Misi Tiket 9: tulis di daftar", "Laras meminta kamu menulis jawaban di kanvas.", [
    tempat(7934, "ratusan"),
    kartu(2504),
    bagian(3628),
    nol(8004),
  ]),
  A(10, "suara", "Misi Tiket 10: daftar akhir", "Daftar akhir nomor tiket untuk Bu Maya. Ucapkan jawabannya.", [
    namaTempat(6713, 3),
    tempat(9407, "puluhan"),
    bagian(8390),
    nol(6082),
  ]),
];

export const POIN_PENTING = [
  "Bilangan empat angka punya empat tempat, yaitu ribuan, ratusan, puluhan, dan satuan.",
  "Bilangan dibaca dari kiri, dimulai dari ribuan. Contoh: 3.406 dibaca tiga ribu empat ratus enam.",
  "Angka nol tidak dibaca, tetapi nol menjaga tempat supaya angka lain tidak bergeser.",
  "Menulis bilangan dari ucapan: taruh tiap angka di tempatnya, lalu isi tempat yang kosong dengan nol. Contoh: lima ribu delapan puluh ditulis 5.080.",
  "Periksa tulisanmu: hitung banyak angkanya, lalu bacalah sekali lagi.",
  "Kartu Angka, Baca Per Bagian, dan Periksa Nol membantu membaca dan menulis bilangan tanpa angka yang hilang.",
];
/** Poin penting untuk suara (tanpa digit): angka menjadi kata dan lambang dibaca lengkap. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p));

/** Jembatan ke Sub-Bab B. */
export const PENUTUP_A = "Pak Laode, penjaga gudang, datang dan bilang handuk tamu menumpuk tanpa hitungan. Tiap angka pada sebuah bilangan ternyata punya tempat dan harga berbeda. Menurutmu, berapa banyak handuk di gudang itu?";

export const TEMA_TIKET = {
  concrete: { ikon: "\u{1F3AB}", nama: "Concrete", cara: "Loket beratap rumbia: tiket dan papan empat kotak beremoji pulau wisata" },
  pictorial: { ikon: "\u{1F4CA}", nama: "Pictorial", cara: "Kertas denah pulau: kartu bilangan dan bagan tempat angka polos" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Daftar tiket bercap: kartu kata dan angka, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_TIKET, PICTORIAL as PICTORIAL_TIKET, ABSTRACT as ABSTRACT_TIKET };
