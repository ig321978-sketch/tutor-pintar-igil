/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 2 Sub-Bab A "Kayu untuk Api Unggun" (kalimat Matematika penjumlahan), awal cerita Perkemahan Akhir Pekan.
 * Misi lanjutan "Misi Kayu" (nomor misi berlanjut dari Simulasi). Bilangan berbeda dari Story (30, 50, 20, 25, 60, 35, 75, 40, 80, 18, 12, 28, dan seratus).
 * Concrete memakai benda beremoji (biskuit, kaleng, ransel, tenda) di tikar kemah, Pictorial memakai bagan batang, garis bilangan, dan timbangan polos di peta kemah,
 * Abstract memakai kartu kata dan angka di papan pengumuman. Jawaban beragam: memilih bilangan atau pasangan, menulis satu angka di kanvas (bilangan yang belum diketahui, lompatan pertama),
 * dan mengucapkan satu kata (jumlah, bagian, depan, tengah) atau bilangan pendek. Kunci dihitung dari data.
 * Angka jawaban Tulis di kanvas per tahap: Concrete 7, 4, 6, 9; Pictorial 7, 4, 2, 9; Abstract 6, 5, 3, 8 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-kayu-k3b2a.mjs.
 */
import type { Cara, Langkah, LangkahSalah, LangkahSoal, LBagan, LKal, LKira, LMaju, LTimbang, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, kataBil } from "./logika-cpa";

export { MISI_KAYU_TEKS } from "./data-sim";

const kal = (a: number, c: number, depan: boolean, tanya?: LKal["tanya"]): LKal => ({ tipe: "kal", a, c, depan, ...(tanya ? { tanya } : {}) });
const bagan = (total: number, bagian: number, sorot?: LBagan["sorot"]): LBagan => ({ tipe: "bagan", total, bagian, ...(sorot ? { sorot } : {}) });
const maju = (dari: number, ke: number): LMaju => ({ tipe: "maju", dari, ke });
const timbang = (a: number, c: number): LTimbang => ({ tipe: "timbang", a, c });
const kira = (jumlah: number, a: number): LKira => ({ tipe: "kira", jumlah, a });
const salah = (dasar: LKal | LBagan, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
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

/** Empat langkah satu misi, berurut metode: IGIL, Bar Model, Counting On, Balance Scale. */
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

/* ------------------------------ Concrete: tikar kemah dengan benda beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Kayu 2: bekal di tikar kemah", "Kak Rina membuka bekal di atas tikar kemah. Cari bilangan yang belum diketahui dari benda dan dari timbangan.", [
    salah(
      kal(24, 41, false),
      "Raka",
      "Dua puluh empat tambah titik-titik sama dengan empat puluh satu, jadi titik-titik itu enam puluh lima.",
      "65",
      [
        "Raka benar, bilangan yang belum diketahui didapat dengan menjumlahkan kedua bilangan.",
        "Raka keliru: empat puluh satu adalah jumlah semuanya, jadi bilangan yang belum diketahui didapat dengan mengurangkan, yaitu tujuh belas.",
        "Raka keliru, bilangan yang belum diketahui harus lebih besar daripada jumlah semuanya.",
      ],
      1,
      "Raka menjumlahkan dua bilangan padahal empat puluh satu adalah jumlah semuanya. Bilangan yang belum diketahui didapat dengan mengurangkan, yaitu tujuh belas.",
    ),
    bagan(57, 38),
    maju(47, 73),
    kira(90, 37),
  ]),
  C(3, "kanvas", "Misi Kayu 3: catatan Salsa", "Salsa mencatat bekal di tikar kemah. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [kal(17, 24, true), bagan(62, 58), maju(54, 63), timbang(36, 45)]),
  C(4, "suara", "Misi Kayu 4: panggilan Pak Joko", "Pak Joko memanggil dari tenda. Jawab dengan suaramu.", [kal(31, 57, false, "isi"), bagan(86, 52, "total"), maju(38, 91), timbang(45, 72)]),
];

/* ------------------------------ Pictorial: peta kemah dengan bagan, garis bilangan, dan timbangan polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Kayu 5: peta kemah", "Bima menggambar peta kemah dengan bagan dan garis. Periksa gambarnya.", [
    salah(
      bagan(72, 49),
      "Bima",
      "Jumlah semuanya tujuh puluh dua, satu bagian empat puluh sembilan, jadi bagian yang lain dua puluh tiga.",
      "23",
      [
        "Bima keliru, bagian yang lain didapat dengan menjumlahkan tujuh puluh dua dan empat puluh sembilan.",
        "Bima benar: jumlah semuanya dikurangi bagian yang diketahui, tujuh puluh dua dikurangi empat puluh sembilan sama dengan dua puluh tiga.",
        "Bima keliru, batang atas adalah bagian dan bukan jumlah semuanya.",
      ],
      1,
      "Jawaban Bima benar. Tujuh puluh dua dikurangi empat puluh sembilan sama dengan dua puluh tiga.",
      true,
    ),
    kal(38, 64, false),
    maju(63, 94),
    kira(70, 43),
  ]),
  Pi(6, "kanvas", "Misi Kayu 6: peta Salsa", "Salsa menggambar peta yang lebih besar. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [kal(46, 53, false), bagan(81, 77), maju(68, 85), timbang(52, 61)]),
  Pi(7, "suara", "Misi Kayu 7: lapor ke Pak Joko", "Bima melaporkan petanya kepada Pak Joko. Sebutkan jawabanmu.", [kal(19, 63, true, "letak"), bagan(94, 37, "bagian"), maju(29, 71), timbang(58, 91)]),
];

/* ------------------------------ Abstract: papan pengumuman dengan kartu kata dan angka ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Kayu 8: papan pengumuman", "Papan pengumuman kemah hanya berisi kata dan angka.", [
    salah(
      kal(27, 63, true),
      "Salsa",
      "Titik-titik tambah dua puluh tujuh sama dengan enam puluh tiga, dicari dengan enam puluh tiga ditambah dua puluh tujuh, jadi sembilan puluh.",
      "90",
      [
        "Salsa benar, bilangan yang belum diketahui selalu dicari dengan menambah.",
        "Salsa keliru, titik-titik di depan membuat caranya berbeda, jadi hasilnya harus dibalik.",
        "Salsa keliru: enam puluh tiga adalah jumlah semuanya, jadi dikurangi dua puluh tujuh, bukan ditambah, yaitu tiga puluh enam.",
      ],
      2,
      "Salsa menjumlahkan padahal enam puluh tiga adalah jumlah semuanya. Titik-titik di depan atau di tengah sama-sama dicari dengan mengurangkan, yaitu tiga puluh enam.",
    ),
    bagan(88, 59),
    maju(45, 78),
    kira(85, 36),
  ]),
  A(9, "kanvas", "Misi Kayu 9: tulis di papan", "Raka meminta kamu menulis jawaban di kanvas.", [kal(56, 62, false), bagan(73, 68), maju(67, 82), timbang(41, 49)]),
  A(10, "suara", "Misi Kayu 10: daftar akhir", "Daftar akhir kayu untuk Pak Joko. Ucapkan jawabannya.", [kal(33, 71, false, "periksa"), bagan(66, 21, "total"), maju(24, 87), timbang(54, 93)]),
];

export const POIN_PENTING = [
  "Kalimat Matematika penjumlahan memakai titik-titik untuk bilangan yang belum diketahui.",
  "Titik-titik bisa di depan, seperti titik-titik tambah bilangan sama dengan jumlah, atau di tengah, seperti bilangan tambah titik-titik sama dengan jumlah.",
  "Bilangan yang belum diketahui dicari dengan mengurangkan jumlah semuanya dengan bagian yang diketahui.",
  "Bagan jumlah dan bagian: batang atas adalah jumlah semuanya, batang bawah adalah bagian-bagiannya.",
  "Periksa hasilnya dengan menjumlahkan: bagian yang diketahui ditambah bilangan yang ditemukan harus sama dengan jumlah semuanya.",
  "Bila hanya jumlahnya yang diketahui, ada banyak kemungkinan pasangan bilangan.",
  "Bagan Batang, Menghitung Maju, dan Timbangan Seimbang membantu mencari bilangan yang belum diketahui.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace(/\d+/g, (d) => kataBil(Number(d))));

/** Jembatan ke Sub-Bab B. */
export const PENUTUP_A =
  "Dua puluh batang kayu terkumpul dan Raka menepati taruhannya. Besok Pak Darto datang membawa air minum. Menurutmu, kalau sebagian botol dibagikan dan tersisa sedikit, bagaimana mencari yang dibagikan?";

export const TEMA_KAYU = {
  concrete: { ikon: "\u{26FA}", nama: "Concrete", cara: "Tikar kemah: benda beremoji, kaleng, biskuit, ransel, tenda, dan timbangan" },
  pictorial: { ikon: "\u{1F5FA}", nama: "Pictorial", cara: "Peta kemah: bagan batang, garis bilangan, dan timbangan polos" },
  abstract: { ikon: "\u{1F4CC}", nama: "Abstract", cara: "Papan pengumuman: kartu kata dan angka, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_KAYU, PICTORIAL as PICTORIAL_KAYU, ABSTRACT as ABSTRACT_KAYU };
