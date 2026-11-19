/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 1 Sub-Bab C "Karung Pak Dodi" (membandingkan dan mengurutkan bilangan sampai seribu).
 * Misi lanjutan "Misi Papan Urut" (nomor misi berlanjut dari Simulasi). Jawaban tidak hanya angka: memilih tanda atau kata, mengetuk kartu menurut urutan,
 * memilih kartu, satu angka di kanvas, dan satu kata atau bilangan yang diucapkan.
 * Angka jawaban per tahap (tidak kembar dalam satu tahap): Concrete kanvas 3, 8, 5, 2, suara 1; Pictorial kanvas 4, 9, 7, 3; Abstract kanvas 3, 1, 6, 4, suara 2.
 * Ruang jawaban sempit (angka satu sampai sembilan): beberapa jawaban sama dengan angka pada data Story (empat, lima, enam), tetapi tidak kembar dalam satu tahap.
 * Diuji: scripts/uji-urut-k3b1c.mjs.
 */
import type { Cara, Klaim, Langkah, LangkahSalah, LangkahSoal, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi } from "./logika-cpa";

export { MISI_URUTAN_TEKS } from "./data-sim";

const salah = (tokoh: string, klaim: Klaim, kataTokoh: string, alasan: [string, string, string], benar: number, keliru: string): LangkahSalah => ({ tipe: "salah", tokoh, klaim, kataTokoh, alasan, benar, keliru });

const misi =
  (rupa: Rupa) =>
  (nomor: number, cara: Cara, judul: string, cerita: string, isi: [Langkah, Langkah, Langkah, Langkah]): SoalMisi => ({
    nomor,
    judul,
    cerita,
    cara,
    langkah: isi.map((l, i): LangkahSoal => {
      const s = instruksi(l, rupa, cara);
      return { metode: URUT_METODE[i], cara, judul: s, suara: s, langkah: l };
    }),
  });

/* ------------------------------ Concrete: bak truk dengan kardus, bungkus, dan kaleng ------------------------------ */
const C = misi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Papan Urut 2: bak truk Pak Dodi", "Pak Dodi menurunkan tumpukan kardus, bungkus, dan kaleng dari truk. Bandingkan dan urutkan tumpukannya.", [
    salah(
      "Raka",
      { jenis: "satuan", a: 364, b: 346, katak: "b" },
      "Tumpukan B lebih banyak, karena kalengnya lebih banyak!",
      [
        "Raka benar, karena satuan adalah tempat yang paling dulu dilihat.",
        "Raka salah. Ratusan sama, lalu puluhan: tumpukan A punya lebih banyak bungkus sepuluh, jadi tumpukan A yang lebih banyak.",
        "Raka benar, bilangan yang satuannya lebih besar selalu lebih besar.",
      ],
      1,
      "Bandingkan dari ratusan, bukan dari satuan. Ratusannya sama, lalu puluhan tumpukan A lebih banyak, jadi tumpukan A yang lebih banyak.",
    ),
    { tipe: "banding", a: 428, b: 482 },
    { tipe: "letak", awal: 400, p: 640, q: 480 },
    { tipe: "urut", angka: [523, 352, 532, 325], arah: "naik" },
  ]),
  C(3, "kanvas", "Misi Papan Urut 3: catatan Salsa", "Salsa mencatat banyak barang di bak truk. Bandingkan, lalu tulis jawabanmu di kanvas.", [
    { tipe: "tempat", a: 635, b: 672 },
    { tipe: "banding", a: 481, b: 437 },
    { tipe: "garis", awal: 300, n: 547 },
    { tipe: "rank", angka: [374, 347, 437], i: 0 },
  ]),
  C(4, "suara", "Misi Papan Urut 4: panggilan Pak Dodi", "Pak Dodi memanggil dari bak truk. Jawab dengan suaramu.", [
    { tipe: "tempat", a: 519, b: 514 },
    { tipe: "banding", a: 372, b: 732 },
    { tipe: "letak", awal: 200, p: 330, q: 270 },
    { tipe: "ekstrem", angka: [608, 680, 806], cari: "kecil" },
  ]),
];

/* ------------------------------ Pictorial: papan balok dan garis bilangan polos ------------------------------ */
const Pi = misi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Papan Urut 5: papan balok", "Bima menyusun balok ratusan, batang puluhan, dan kotak satuan di papan. Periksa susunannya.", [
    salah(
      "Bima",
      { jenis: "tanda", a: 612, b: 621, tanda: ">" },
      "A lebih besar dari B, jadi aku menulis tanda lebih besar.",
      [
        "Bima benar, bilangan pertama selalu memakai tanda lebih besar.",
        "Bima benar, karena ratusan dan satuannya mirip.",
        "Bima salah. Ratusan sama, lalu puluhan A lebih kecil dari puluhan B, jadi A lebih kecil dan tandanya kurang dari.",
      ],
      2,
      "Ratusannya sama. Puluhan A lebih kecil dari puluhan B, jadi A lebih kecil dari B. Tanda yang benar adalah kurang dari.",
    ),
    { tipe: "banding", a: 508, b: 508 },
    { tipe: "garis", awal: 500, n: 684 },
    { tipe: "urut", angka: [814, 841, 418], arah: "turun" },
  ]),
  Pi(6, "kanvas", "Misi Papan Urut 6: papan Salsa", "Salsa menggambar balok bilangan di papan. Bandingkan, lalu tulis jawabanmu di kanvas.", [
    { tipe: "tempat", a: 847, b: 867 },
    { tipe: "banding", a: 392, b: 372 },
    { tipe: "garis", awal: 600, n: 781 },
    { tipe: "rank", angka: [561, 516, 651, 615], i: 3 },
  ]),
  Pi(7, "suara", "Misi Papan Urut 7: lapor ke Pak Joko", "Bima melaporkan hasil papannya kepada Pak Joko. Sebutkan jawabanmu.", [
    { tipe: "tempat", a: 326, b: 426 },
    { tipe: "banding", a: 809, b: 890 },
    { tipe: "letak", awal: 400, p: 430, q: 660 },
    { tipe: "arah", angka: [259, 295, 529] },
  ]),
];

/* ------------------------------ Abstract: papan kapur dengan angka, tanda, dan tabel ------------------------------ */
const A = misi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Papan Urut 8: kartu pengumuman", "Kartu pengumuman Pak Joko hanya berisi angka, tanda, dan kata.", [
    salah(
      "Salsa",
      { jenis: "urutan", susunan: [478, 748, 487], arah: "naik" },
      "Aku sudah mengurutkan dari yang terkecil sampai yang terbesar!",
      [
        "Salsa benar, ratusan yang paling besar harus ditaruh di tengah.",
        "Salsa salah. Pada urutan naik, tiap bilangan harus lebih besar dari sebelumnya, tetapi bilangan ketiga lebih kecil dari bilangan kedua.",
        "Salsa benar, karena semua bilangan itu punya ratusan yang sama.",
      ],
      1,
      "Urutan naik berarti makin ke kanan makin besar. Bilangan ketiga lebih kecil dari bilangan kedua, jadi urutannya belum naik. Taruh yang terkecil lebih dulu.",
    ),
    { tipe: "banding", a: 369, b: 396 },
    { tipe: "garis", awal: 600, n: 832 },
    { tipe: "urut", angka: [906, 690, 960, 609], arah: "naik" },
  ]),
  A(9, "kanvas", "Misi Papan Urut 9: tulis di papan kapur", "Raka meminta kamu menulis jawaban di papan kapur.", [
    { tipe: "tempat", a: 538, b: 548 },
    { tipe: "banding", a: 915, b: 905 },
    { tipe: "garis", awal: 600, n: 661 },
    { tipe: "rank", angka: [123, 132, 213, 231], i: 3 },
  ]),
  A(10, "suara", "Misi Papan Urut 10: pengumuman penutup", "Pengumuman terakhir Sub-Bab C. Bacakan jawabannya.", [
    { tipe: "tempat", a: 777, b: 787 },
    { tipe: "banding", a: 864, b: 846 },
    { tipe: "letak", awal: 500, p: 715, q: 574 },
    { tipe: "ekstrem", angka: [419, 914, 491], cari: "besar" },
  ]),
];

export const POIN_PENTING = [
  "Bilangan tiga angka dibandingkan mulai dari ratusan, lalu puluhan, lalu satuan.",
  "Tempat pertama yang berbeda menentukan: angka yang lebih besar di tempat itu berarti bilangan yang lebih besar.",
  "Tanda lebih besar dan lebih kecil seperti mulut yang terbuka ke bilangan yang lebih besar. Bilangan yang sama memakai tanda sama dengan.",
  "Pada garis bilangan ratusan, makin ke kanan makin besar dan makin ke kiri makin kecil.",
  "Mengurutkan bilangan berarti menyusunnya dari yang terkecil ke terbesar, yaitu urutan naik, atau sebaliknya, yaitu urutan turun.",
  "Cara mengurutkan: cari yang paling kecil, taruh di depan, lalu ulangi dengan bilangan yang tersisa.",
  "Baca tanda dengan teliti: kalau tanda dibalik, artinya berubah.",
];
/** Poin penting untuk suara (tanpa digit dan tanpa lambang). */
export const POIN_PENTING_SUARA = POIN_PENTING;

/** Penutup Sub-Bab C dan jembatan ke Sub-Bab D. */
export const PENUTUP_C = "Raka bangga karena sudah membandingkan dari kiri. Besok Bu Tuti datang memesan kue. Menurutmu, bilangan mana yang lebih besar kalau ratusannya sama tetapi puluhannya berbeda?";

export const TEMA_URUT = {
  concrete: { ikon: "\u{1F69A}", nama: "Concrete", cara: "Bak truk Pak Dodi: tumpukan kardus, bungkus, dan kaleng yang dibandingkan, diurutkan, dan ditandai pada rak penanda" },
  pictorial: { ikon: "\u{1F4CF}", nama: "Pictorial", cara: "Papan balok dan garis bilangan polos: balok ratusan, batang puluhan, kotak satuan, tanpa gambar benda" },
  abstract: { ikon: "\u{1F9EE}", nama: "Abstract", cara: "Papan kapur: kartu angka, tanda, dan tabel garis bilangan, hanya lambang dan kata" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_URUT, PICTORIAL as PICTORIAL_URUT, ABSTRACT as ABSTRACT_URUT };
