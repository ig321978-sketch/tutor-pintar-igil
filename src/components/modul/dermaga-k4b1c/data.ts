/**
 * Isi tahap Concrete, Pictorial, dan Abstract K4 Bab 1 Sub-Bab C "Papan Dermaga Kak Tiara" (membandingkan dan mengurutkan bilangan sampai sepuluh ribu: dari kiri, tanda kurang dari dan lebih dari,
 * garis bilangan, urutan kartu), cerita Penginapan Pulau Karang Indah. Misi lanjutan "Misi Dermaga" (nomor misi berlanjut dari Simulasi). Data berbeda dari Story (Barat 4.358, Timur 4.385, Selatan 4.538).
 * Concrete memakai benda pulau wisata beremoji di papan dermaga kayu, Pictorial memakai diagram polos (bagan tempat angka, garis bilangan, kartu bilangan) di peta laut, Abstract memakai kartu kata dan angka di daftar Kak Tiara.
 * Jawaban beragam: memilih tanda, tempat angka, bilangan, atau urutan, menulis satu angka di kanvas, dan mengucapkan satu kata (kurang dari, sama dengan, lebih dari, ribuan, kiri, terkecil, dan sebagainya).
 * Dua bilangan yang persis sama (tanda sama dengan): Concrete 5.620 dan 5.620 (suara), Pictorial 6.410 dan 6.410 (Cari kesalahan, Genta benar), Abstract 3.607 dan 3.607 (Cari kesalahan, Satria keliru); sesuai bahan resmi (4.352 = 4.352).
 * Jawaban benar dihitung dari data. Angka jawaban Tulis di kanvas per tahap: Concrete 3, 8, 5, 2; Pictorial 4, 7, 6, 3; Abstract 2, 1, 7, 3 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-dermaga-k4b1c.mjs.
 */
import type { Arah, Cara, Langkah, LangkahSalah, LangkahSoal, LBanding, LGaris, LKartu, LKiri, Rupa, SoalMisi, Tempat, Ujung } from "./logika-cpa";
import { URUT_METODE, instruksi, ucapkan } from "./logika-cpa";

export { MISI_DERMAGA_TEKS } from "./data-sim";

const banding = (benda: string, a: number, b: number): LBanding => ({ tipe: "banding", benda, a, b });
const kiri = (benda: string, a: number, b: number): LKiri => ({ tipe: "kiri", benda, a, b });
const garis = (benda: string, mulai: number, langkah: number, a: number, b: number, cari: Ujung = "besar"): LGaris => ({ tipe: "garis", benda, mulai, langkah, a, b, cari });
const kartu = (benda: string, data: number[], arah: Arah, cari: Ujung = "kecil", tempat: Tempat = "ratusan"): LKartu => ({ tipe: "kartu", benda, data, arah, cari, tempat });
const salah = (dasar: LBanding, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
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

/** Empat langkah satu misi, berurut metode: IGIL, Left-to-Right Compare, Number Line, Card Sort. */
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

/* ------------------------------ Concrete: papan dermaga kayu dengan benda pulau wisata beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Dermaga 2: papan tiket", "Kak Tiara menempel bilangan pengunjung pada papan dermaga kayu. Periksa gambarnya.", [
    salah(
      banding("perahu", 3629, 3692),
      "Satria",
      "Aku bandingkan dari angka paling kanan. Sembilan lebih dari dua, jadi bilangan pertama lebih dari bilangan kedua.",
      ">",
      [
        "Satria benar, membandingkan harus dimulai dari angka paling kanan.",
        "Satria keliru: membandingkan dimulai dari tempat paling kiri, yaitu ribuan, lalu lanjut ke kanan sampai angka berbeda.",
        "Satria keliru, bilangan dengan angka satuan lebih besar selalu lebih besar.",
      ],
      1,
      "Membandingkan dimulai dari tempat paling kiri, bukan dari kanan. Angka berbeda pertama dari kiri yang menentukan.",
    ),
    kiri("kerang", 5481, 5438),
    garis("kelapa", 6000, 100, 6300, 6700, "besar"),
    kartu("payung", [3846, 3264, 3426], "naik"),
  ]),
  C(3, "kanvas", "Misi Dermaga 3: catatan Laras", "Laras mencatat banyak pengunjung pantai pada papan. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    banding("perahu", 7314, 7351),
    kiri("kelapa", 2650, 2680),
    garis("kerang", 1000, 100, 1200, 1700, "besar"),
    kartu("payung", [9120, 9012, 9210], "naik", "besar", "ratusan"),
  ]),
  C(4, "suara", "Misi Dermaga 4: panggilan Pak Hendro", "Pak Hendro memanggil dari ujung dermaga sambil meniup peluit. Jawab dengan suaramu.", [
    banding("kerang", 5620, 5620),
    kiri("payung", 6208, 6908),
    garis("perahu", 3000, 100, 3700, 3200, "besar"),
    kartu("kelapa", [4017, 4170, 4071], "naik", "kecil", "ratusan"),
  ]),
];

/* ------------------------------ Pictorial: peta laut dengan bagan tempat angka, garis bilangan, dan kartu bilangan polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Dermaga 5: peta laut", "Genta menyalin bilangan pengunjung ke peta laut. Periksa gambarnya.", [
    salah(
      banding("catatan", 6410, 6410),
      "Genta",
      "Ribuan, ratusan, puluhan, dan satuan sama semua, dari kiri sampai kanan. Jadi kedua bilangan sama besar, dan tandanya sama dengan.",
      "=",
      [
        "Genta benar: kalau semua tempat angkanya sama, kedua bilangan sama besar, jadi tandanya sama dengan.",
        "Genta keliru: dua bilangan selalu ada yang lebih besar, jadi tandanya lebih dari.",
        "Genta keliru: bilangan yang angkanya sama semua tidak boleh diberi tanda.",
      ],
      0,
      "Semua tempat angkanya sama dari ribuan sampai satuan, jadi kedua bilangan sama besar. Tandanya sama dengan, jadi jawaban Genta benar.",
      true,
    ),
    kiri("catatan", 4812, 4912),
    garis("catatan", 2000, 100, 2800, 2400, "kecil"),
    kartu("catatan", [6150, 6105, 6510, 6051], "naik"),
  ]),
  Pi(6, "kanvas", "Misi Dermaga 6: garis Genta", "Genta menggambar garis bilangan yang lebih panjang. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    banding("catatan", 2547, 2548),
    kiri("catatan", 5748, 5778),
    garis("catatan", 4000, 10, 4030, 4090, "besar"),
    kartu("catatan", [2736, 2763, 2376], "naik", "kecil", "ratusan"),
  ]),
  Pi(7, "suara", "Misi Dermaga 7: lapor ke Kak Tiara", "Genta melaporkan hasil peta kepada Kak Tiara. Sebutkan jawabanmu.", [
    banding("catatan", 9301, 9031),
    kiri("catatan", 1478, 2478),
    garis("catatan", 5000, 100, 5400, 5900, "besar"),
    kartu("catatan", [7240, 7420, 7024], "turun", "besar", "ratusan"),
  ]),
];

/* ------------------------------ Abstract: daftar Kak Tiara dengan kartu kata dan angka ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Dermaga 8: daftar Kak Tiara", "Daftar Kak Tiara hanya berisi kata dan angka.", [
    salah(
      banding("catatan", 3607, 3607),
      "Satria",
      "Angka-angkanya sama semua, jadi aku pilih kurang dari, karena bilangan pertama dibaca lebih dulu.",
      "<",
      [
        "Satria benar, bilangan yang dibaca lebih dulu selalu lebih kecil.",
        "Satria keliru: kalau semua tempat angkanya sama dari kiri sampai kanan, kedua bilangan sama besar, jadi tandanya sama dengan.",
        "Satria keliru, bilangan yang sama persis harus diberi tanda lebih dari.",
      ],
      1,
      "Ribuan, ratusan, puluhan, dan satuan semuanya sama, jadi kedua bilangan persis sama. Urutan dibaca tidak membuat bilangan lebih kecil; tandanya sama dengan.",
    ),
    kiri("catatan", 9246, 9249),
    garis("catatan", 8000, 100, 8300, 8800, "besar"),
    kartu("catatan", [8091, 8910, 8109], "naik"),
  ]),
  A(9, "kanvas", "Misi Dermaga 9: tulis di daftar", "Satria meminta kamu menulis jawaban di kanvas.", [
    banding("catatan", 3475, 3875),
    kiri("catatan", 7106, 7116),
    garis("catatan", 5000, 100, 5200, 5900, "besar"),
    kartu("catatan", [6340, 6430, 6304], "naik", "besar", "puluhan"),
  ]),
  A(10, "suara", "Misi Dermaga 10: daftar akhir", "Daftar akhir pengunjung untuk Kak Tiara. Ucapkan jawabannya.", [
    banding("catatan", 3150, 3510),
    kiri("catatan", 8316, 8396),
    garis("catatan", 4000, 100, 4800, 4200, "besar"),
    kartu("catatan", [2950, 2059, 2590], "naik", "kecil", "ribuan"),
  ]),
];

/** Poin penting: teks tampil dan teks suara (lambang diganti kata). */
const POIN: [string, string][] = [
  ["Bilangan empat angka dibandingkan dari tempat paling kiri: ribuan dulu, lalu ratusan, puluhan, dan satuan.", "Bilangan empat angka dibandingkan dari tempat paling kiri: ribuan dulu, lalu ratusan, puluhan, dan satuan."],
  ["Kalau satu tempat angkanya sama, lanjut ke tempat di kanannya sampai ketemu angka yang berbeda.", "Kalau satu tempat angkanya sama, lanjut ke tempat di kanannya sampai ketemu angka yang berbeda."],
  ["Kalau ribuan, ratusan, puluhan, dan satuan semuanya sama, kedua bilangan persis sama, misalnya 4.352 = 4.352, dan tandanya sama dengan.", "Kalau ribuan, ratusan, puluhan, dan satuan semuanya sama, kedua bilangan persis sama, misalnya empat ribu tiga ratus lima puluh dua sama dengan empat ribu tiga ratus lima puluh dua, dan tandanya sama dengan."],
  ["Angka berbeda pertama dari kiri menentukan bilangan mana yang lebih besar.", "Angka berbeda pertama dari kiri menentukan bilangan mana yang lebih besar."],
  ["Tanda < dibaca kurang dari, tanda > dibaca lebih dari, dan tanda = dibaca sama dengan. Mulut tanda menghadap bilangan yang lebih besar.", "Tanda kurang dari, tanda lebih dari, dan tanda sama dengan punya lambang sendiri. Mulut tanda menghadap bilangan yang lebih besar."],
  ["Pada garis bilangan, bilangan yang lebih ke kanan lebih besar dan bilangan yang lebih ke kiri lebih kecil.", "Pada garis bilangan, bilangan yang lebih ke kanan lebih besar dan bilangan yang lebih ke kiri lebih kecil."],
  ["Urutan dari terkecil ke terbesar disebut urutan naik, dan dari terbesar ke terkecil disebut urutan turun.", "Urutan dari terkecil ke terbesar disebut urutan naik, dan dari terbesar ke terkecil disebut urutan turun."],
  ["Banding dari Kiri, Garis Bilangan, dan Urut Kartu membantu membandingkan dan mengurutkan bilangan tanpa tertukar.", "Banding dari Kiri, Garis Bilangan, dan Urut Kartu membantu membandingkan dan mengurutkan bilangan tanpa tertukar."],
];
export const POIN_PENTING = POIN.map(([tampil]) => tampil);
/** Poin penting untuk suara (tanpa digit dan tanpa lambang). */
export const POIN_PENTING_SUARA = POIN.map(([, suara]) => ucapkan(suara));

/** Jembatan ke Sub-Bab D. */
export const PENUTUP_C = "Pak Darwis, penjual kelapa, datang membawa hasil panen yang sangat banyak. Menurutmu, bagaimana cara membagi ribuan kelapa ke dalam keranjang?";

export const TEMA_DERMAGA = {
  concrete: { ikon: "\u{1F6A4}", nama: "Concrete", cara: "Dermaga kayu: benda pulau wisata beremoji di papan kayu bertiang, dibandingkan dari kiri" },
  pictorial: { ikon: "\u{1F4CA}", nama: "Pictorial", cara: "Peta laut: bagan tempat angka, garis bilangan, dan kartu bilangan polos" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Daftar Kak Tiara: kartu kata dan angka di kertas bergaris, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_DERMAGA, PICTORIAL as PICTORIAL_DERMAGA, ABSTRACT as ABSTRACT_DERMAGA };
