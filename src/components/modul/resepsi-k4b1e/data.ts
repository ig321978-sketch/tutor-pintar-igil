/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 1 Sub-Bab E "Meja Resepsi Bu Rina" (penjumlahan bilangan sampai 1.000: susun ke bawah, simpan, tambah per tempat, genapkan dulu),
 * lanjutan cerita Penginapan Pulau Karang Indah. Misi lanjutan "Misi Resepsi" (nomor misi berlanjut dari Simulasi). Data berbeda dari Story (245 + 378, 113, 326 + 259, 540 + 235, 123 + 99, 364 + 158),
 * kecuali seed Cari kesalahan dari alur (Satria lupa menyimpan; Laras menulis tiga simpan satu). Concrete memakai balok cacah berwarna dan benda penginapan beremoji di meja resepsi,
 * Pictorial memakai balok cacah polos dengan bagan tempat angka di kertas petak, Abstract memakai bilangan bersusun pada kartu di lembar tamu resepsi.
 * Jawaban beragam: memilih jumlah atau tulisan simpanan, menulis satu angka di kanvas, dan mengucapkan satu kata (satuan, puluhan, ditambah, dikurangi) atau bilangan.
 * Jawaban benar dihitung dari data. Angka jawaban Tulis di kanvas per tahap: Concrete 7, 8, 6, 3; Pictorial 5, 9, 7, 3; Abstract 4, 7, 5, 1 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-resepsi-k4b1e.mjs.
 */
import type { Cara, Langkah, LangkahSalah, LangkahSoal, LGenap, LJumlah, LSimpan, LTempat, Rupa, SoalMisi, Tempat } from "./logika-cpa";
import { URUT_METODE, instruksi, ucapkan } from "./logika-cpa";

export { MISI_RESEPSI_TEKS } from "./data-sim";

const jumlah = (benda: string, a: number, b: number): LJumlah => ({ tipe: "jumlah", benda, a, b });
const simpan = (benda: string, a: number, b: number): LSimpan => ({ tipe: "simpan", benda, a, b });
const tempat = (benda: string, a: number, b: number, t: Tempat): LTempat => ({ tipe: "tempat", benda, a, b, tempat: t });
const genap = (benda: string, a: number, b: number, bulat: number): LGenap => ({ tipe: "genap", benda, a, b, bulat });
const salah = (dasar: LJumlah | LSimpan | LGenap, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
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

/** Empat langkah satu misi, berurut metode: IGIL, Column Add, Place Add, Round and Adjust. */
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

/* ------------------------------ Concrete: balok cacah berwarna di meja resepsi ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Resepsi 2: meja resepsi", "Bu Rina menata koper tamu di meja resepsi. Periksa gambarnya.", [
    salah(
      jumlah("koper", 358, 164),
      "Satria",
      "358 ditambah 164 sama dengan 412, karena tiap tempat kutulis sisanya saja tanpa menyimpan.",
      "412",
      [
        "Satria benar, tiap tempat cukup menulis sisanya saja.",
        "Satria keliru: bila jumlah satu tempat sepuluh atau lebih, satu harus disimpan ke tempat di kirinya, jadi hasil yang benar lebih besar.",
        "Satria keliru, hasilnya harus dikurangi, bukan dijumlahkan.",
      ],
      1,
      "Jumlah satu tempat yang sepuluh atau lebih harus menyimpan satu ke tempat di kirinya. Tanpa menyimpan, hasilnya jadi lebih kecil dari yang sebenarnya.",
    ),
    simpan("tiket", 238, 145),
    tempat("kerang", 524, 263, "puluhan"),
    genap("lonceng", 346, 297, 300),
  ]),
  C(3, "kanvas", "Misi Resepsi 3: papan tamu", "Laras mencatat tamu di papan resepsi. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    jumlah("keranjang", 428, 319),
    simpan("kelapa", 267, 519),
    tempat("payung", 432, 215, "ratusan"),
    genap("sandal", 431, 197, 200),
  ]),
  C(4, "suara", "Misi Resepsi 4: panggilan Bu Rina", "Bu Rina memanggil dari balik meja resepsi. Jawab dengan suaramu.", [
    jumlah("lentera", 514, 368),
    simpan("nanas", 237, 156),
    tempat("semangka", 371, 262, "puluhan"),
    genap("kamar", 254, 301, 300),
  ]),
];

/* ------------------------------ Pictorial: balok cacah polos dan bagan tempat angka di kertas petak ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Resepsi 5: kertas petak", "Genta menggambar bilangan di kertas petak. Periksa gambarnya.", [
    jumlah("koper", 263, 519),
    salah(
      simpan("koper", 249, 135),
      "Laras",
      "9 ditambah 5 sama dengan 14, jadi di satuan kutulis 4 dan satu kusimpan ke puluhan.",
      "tulis 4, simpan 1",
      [
        "Laras benar: satuan hanya boleh berisi satu angka, jadi sepuluh satuan pindah menjadi satu puluhan dan sisanya ditulis.",
        "Laras keliru, satuan boleh ditulis dua angka sekaligus.",
        "Laras keliru, simpanan harus dituliskan di kolom satuan juga.",
      ],
      0,
      "Laras benar: empat belas satuan ditulis empat di satuan dan satu disimpan ke puluhan.",
      true,
    ),
    tempat("koper", 462, 315, "ratusan"),
    salah(
      genap("koper", 517, 398, 400),
      "Satria",
      "398 hampir 400, jadi 517 ditambah 400 sama dengan 917, lalu ditambah 2 menjadi 919.",
      "919",
      [
        "Satria benar, setelah dibulatkan selalu ditambah.",
        "Satria keliru: bilangan itu dibulatkan ke atas, jadi ada kelebihan dan hasilnya harus dikurangi, bukan ditambah.",
        "Satria keliru, bilangan itu harus dibulatkan ke ratusan yang paling jauh.",
      ],
      1,
      "Bilangan yang dibulatkan ke atas membuat hasil kelebihan, jadi hasilnya dikurangi, bukan ditambah.",
    ),
  ]),
  Pi(6, "kanvas", "Misi Resepsi 6: kapur Laras", "Laras menggambar balok yang lain. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    jumlah("koper", 236, 309),
    simpan("koper", 137, 456),
    tempat("koper", 253, 124, "satuan"),
    genap("koper", 462, 297, 300),
  ]),
  Pi(7, "suara", "Misi Resepsi 7: lapor ke Bu Rina", "Genta melaporkan hitungannya kepada Bu Rina. Sebutkan jawabanmu.", [
    jumlah("koper", 337, 485),
    simpan("koper", 276, 149),
    tempat("koper", 435, 317, "satuan"),
    genap("koper", 324, 399, 400),
  ]),
];

/* ------------------------------ Abstract: bilangan bersusun pada kartu di lembar tamu resepsi ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Resepsi 8: lembar tamu", "Lembar tamu resepsi hanya berisi kata dan angka.", [
    salah(
      jumlah("koper", 469, 273),
      "Satria",
      "469 ditambah 273 sama dengan 632, karena tiap kolom hanya kutulis sisanya.",
      "632",
      [
        "Satria benar, simpanan tidak perlu ikut dijumlahkan.",
        "Satria keliru: tiga kolomnya menyimpan satu ke kolom di kirinya, dan simpanan itu harus ikut dijumlahkan.",
        "Satria keliru, kedua bilangan harus dikurangkan.",
      ],
      1,
      "Simpanan dari kolom kanan harus ikut dijumlahkan di kolom kirinya, jadi hasilnya lebih besar dari jawaban Satria.",
    ),
    simpan("koper", 185, 237),
    tempat("koper", 384, 157, "satuan"),
    salah(
      genap("koper", 237, 495, 500),
      "Genta",
      "495 hampir 500, jadi 237 ditambah 500 sama dengan 737, lalu dikurangi 5 menjadi 732.",
      "732",
      [
        "Genta benar: bilangan yang dibulatkan ke atas menimbulkan kelebihan, jadi kelebihan itu dikurangi dari hasilnya.",
        "Genta keliru, kelebihan itu harus ditambahkan.",
        "Genta keliru, bilangan hampir bulat tidak boleh dibulatkan.",
      ],
      0,
      "Genta benar: dibulatkan ke atas berarti ada kelebihan, jadi hasilnya dikurangi.",
      true,
    ),
  ]),
  A(9, "kanvas", "Misi Resepsi 9: tulis di lembar tamu", "Satria meminta kamu menulis jawaban di kanvas.", [
    jumlah("koper", 148, 297),
    simpan("koper", 227, 345),
    tempat("koper", 624, 137, "puluhan"),
    genap("koper", 438, 199, 200),
  ]),
  A(10, "suara", "Misi Resepsi 10: daftar akhir", "Daftar akhir tamu untuk Bu Rina. Ucapkan jawabannya.", [
    jumlah("koper", 256, 489),
    simpan("koper", 179, 237),
    tempat("koper", 461, 272, "puluhan"),
    genap("koper", 315, 402, 400),
  ]),
];

export const POIN_PENTING = [
  "Menjumlahkan bersusun: tulis bilangan ke bawah, satuan di bawah satuan, puluhan di bawah puluhan, dan ratusan di bawah ratusan.",
  "Jumlahkan dari kanan, mulai dari satuan, lalu puluhan, lalu ratusan.",
  "Bila jumlah satu tempat sepuluh atau lebih, tulis sisanya dan simpan satu ke tempat di kirinya.",
  "Sepuluh satuan berubah menjadi satu puluhan, dan sepuluh puluhan berubah menjadi satu ratusan.",
  "Simpanan ikut dijumlahkan di tempat berikutnya, jadi jangan sampai terlupa.",
  "Tambah Per Tempat: jumlahkan ratusan, puluhan, dan satuan sendiri-sendiri, lalu gabungkan hasilnya.",
  "Genapkan Dulu: bulatkan satu bilangan, jumlahkan, lalu sesuaikan dengan kelebihan atau kekurangannya.",
  "Periksa hasil dengan pembulatan: jumlah dua bilangan harus dekat dengan jumlah bilangan bulatnya.",
];
/** Poin penting untuk suara (tanpa digit): angka menjadi kata dan lambang dibaca lengkap. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p));

/** Jembatan ke Sub-Bab F. */
export const PENUTUP_E =
  "Sore itu sebagian tamu mulai pulang. Pak Usman di dermaga menunggu laporan tamu yang masih menginap. Menurutmu, bagaimana cara mengurangkan bilangan bersusun supaya sisa tamunya tepat?";

export const TEMA_RESEPSI = {
  concrete: { ikon: "\u{1F6CE}", nama: "Concrete", cara: "Meja resepsi: balok cacah berwarna dan benda penginapan beremoji, hitung kotak, batang, dan butirnya" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Kertas petak: balok cacah polos dan bagan tempat angka tanpa benda" },
  abstract: { ikon: "\u{1F4D2}", nama: "Abstract", cara: "Lembar tamu resepsi: bilangan bersusun ke bawah pada kartu, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_RESEPSI, PICTORIAL as PICTORIAL_RESEPSI, ABSTRACT as ABSTRACT_RESEPSI };
