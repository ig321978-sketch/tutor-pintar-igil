/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 4 Sub-Bab A "Rangka Layang-layang Bu Ratih" (titik, sinar garis, garis, ruas garis, kurva, ukuran cm dan mm, sisi bangun datar),
 * awal cerita Festival Layang-layang Kampung. Misi lanjutan "Misi Rangka" (nomor misi berlanjut dari Simulasi). Ukuran berbeda dari Story (55 mm, 30 mm, 300 mm, 100 mm, 5 cm 5 mm,
 * segitiga EFG, persegi) kecuali ruang jawaban yang sempit. Concrete memakai benda layang-layang beremoji di meja bengkel bambu, Pictorial memakai penggaris bergaris milimeter,
 * ruas garis, dan bangun polos di kertas denah, Abstract memakai kartu kata dan angka di papan daftar bengkel. Jawaban beragam: memilih nama jenis, ukuran bersatuan, atau nama sisi,
 * menulis satu angka di kanvas, dan mengucapkan satu kata (nama jenis garis, sama, berbeda) atau bilangan pendek. Jawaban benar dihitung dari data.
 * Angka jawaban Tulis di kanvas per tahap: Concrete 6, 3, 2, 5; Pictorial 8, 2, 4, 6; Abstract 7, 1, 6, 5 (tidak kembar dalam satu tahap; ruang jawaban satu angka sempit,
 * jadi sebagian sama dengan angka Story antartahap, misalnya banyak sisi lima dan enam).
 * Diuji: scripts/uji-bilah-k3b4a.mjs.
 */
import type { Bangun, Cara, Jenis, Langkah, LangkahSalah, LangkahSoal, LBaca, LBeda, LDua, LJenis, LSisi, LUbah, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi } from "./logika-cpa";
import { ejaK3B4 } from "../eja-k3b4";

export { MISI_BILAH_TEKS } from "./data-sim";

const jenis = (benda: string, j: Jenis): LJenis => ({ tipe: "jenis", benda, jenis: j });
const baca = (benda: string, mulai: number, ujung: number, sat: "mm" | "cm"): LBaca => ({ tipe: "baca", benda, mulai, ujung, sat });
const ubah = (benda: string, cm: number): LUbah => ({ tipe: "ubah", benda, cm });
const beda = (benda: string, gambar: [Jenis, Jenis, Jenis, Jenis], b: number): LBeda => ({ tipe: "beda", benda, gambar, beda: b });
const dua = (benda: string, panjang: number, awal: number): LDua => ({ tipe: "dua", benda, panjang, awal });
const sisi = (benda: string, bangun: Bangun): LSisi => ({ tipe: "sisi", benda, bangun });
const salah = (dasar: LJenis | LBaca | LSisi, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
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

const RUAS: Jenis = "ruas garis";
const SINAR: Jenis = "sinar garis";
const GARIS: Jenis = "garis";
const KURVA: Jenis = "kurva";

/** Empat langkah satu misi, berurut metode: IGIL, Odd One Out, Measure Twice, Label and Name. */
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

/* ------------------------------ Concrete: meja bengkel bambu dengan benda layang-layang beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Rangka 2: meja bengkel bambu", "Bu Ratih menaruh perkakas layang-layang di meja bengkel bambu. Periksa gambarnya.", [
    salah(
      jenis("sinar senter", "sinar garis"),
      "Salsa",
      "Sinar senter itu garis, karena panjang sekali dan ujungnya tidak kelihatan.",
      "garis",
      [
        "Salsa benar, sinar senter tidak punya pangkal sehingga disebut garis.",
        "Salsa keliru: sinar senter berpangkal di satu titik dan hanya menuju satu arah, jadi disebut sinar garis.",
        "Salsa keliru, sinar senter punya dua titik ujung sehingga disebut ruas garis.",
      ],
      1,
      "Sinar senter berpangkal di satu titik dan hanya menuju satu arah. Itu sinar garis, bukan garis.",
    ),
    beda("benang layang-layang", [RUAS, RUAS, KURVA, RUAS], 2),
    dua("bilah bambu", 45, 20),
    sisi("kertas persegi", { nama: "persegi", huruf: ["K", "L", "M", "N"] }),
  ]),
  C(3, "kanvas", "Misi Rangka 3: catatan Salsa", "Salsa mencatat ukuran perkakas di meja bambu. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    baca("pensil", 0, 60, "cm"),
    beda("layang-layang", [RUAS, RUAS, GARIS, RUAS], 2),
    dua("pita merah", 40, 20),
    sisi("bendera segilima", { nama: "segilima", huruf: ["P", "Q", "R", "S", "T"] }),
  ]),
  C(4, "suara", "Misi Rangka 4: panggilan Pak Joko", "Pak Joko memanggil dari tepi sawah. Jawab dengan suaramu.", [
    ubah("bilah bambu", 7),
    beda("bilah bambu", [SINAR, RUAS, RUAS, RUAS], 0),
    dua("benang layang-layang", 25, 40),
    sisi("kertas segienam", { nama: "segienam", huruf: ["A", "B", "C", "D", "E", "F"] }),
  ]),
];

/* ------------------------------ Pictorial: kertas denah rangka dengan penggaris dan bangun polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Rangka 5: denah rangka", "Bima menggambar denah rangka di kertas bergaris krem. Periksa gambarnya.", [
    salah(
      baca("ruas AB", 0, 40, "mm"),
      "Raka",
      "Ruas garis AB mulai dari angka nol dan berakhir di empat sentimeter, jadi panjangnya empat ratus milimeter.",
      "400 mm",
      [
        "Raka benar, satu sentimeter sama dengan seratus milimeter.",
        "Raka keliru: satu sentimeter hanya sama dengan sepuluh milimeter, jadi empat sentimeter adalah empat puluh milimeter.",
        "Raka keliru, panjang ruas garis harus ditulis dalam sentimeter saja.",
      ],
      1,
      "Satu sentimeter sama dengan sepuluh milimeter, bukan seratus. Empat sentimeter sama dengan empat puluh milimeter.",
    ),
    beda("empat gambar", [SINAR, RUAS, RUAS, RUAS], 0),
    dua("ruas CD", 60, 20),
    sisi("segilima ABCDE", { nama: "segilima", huruf: ["A", "B", "C", "D", "E"] }),
  ]),
  Pi(6, "kanvas", "Misi Rangka 6: denah Salsa", "Salsa menggambar denah yang lebih besar. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    baca("ruas EF", 0, 80, "cm"),
    beda("empat gambar", [SINAR, KURVA, SINAR, SINAR], 1),
    dua("ruas GH", 25, 40),
    sisi("segienam GHIJKL", { nama: "segienam", huruf: ["G", "H", "I", "J", "K", "L"] }),
  ]),
  Pi(7, "suara", "Misi Rangka 7: lapor ke Pak Joko", "Bima melaporkan denahnya kepada Pak Joko. Sebutkan jawabanmu.", [
    ubah("ruas MN", 9),
    beda("empat gambar", [RUAS, RUAS, GARIS, RUAS], 2),
    dua("ruas PQ", 35, 0),
    sisi("lingkaran polos", { nama: "lingkaran", huruf: [] }),
  ]),
];

/* ------------------------------ Abstract: papan daftar bengkel dengan kartu kata dan angka ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Rangka 8: papan daftar bengkel", "Papan daftar bengkel hanya berisi kata dan angka.", [
    salah(
      sisi("tutup bundar", { nama: "lingkaran", huruf: [] }),
      "Raka",
      "Tutup bundar itu punya satu sisi, yaitu tepinya yang melingkar.",
      "1 sisi",
      [
        "Raka benar, tepi yang melingkar dihitung satu sisi.",
        "Raka keliru, bangun bundar punya dua sisi, yaitu sisi dalam dan sisi luar.",
        "Raka keliru: tepi tutup bundar berupa kurva, bukan ruas garis lurus, jadi tidak ada sisi lurus yang bisa dihitung.",
      ],
      2,
      "Tepi tutup bundar berupa kurva, bukan ruas garis lurus. Bangun bundar tidak punya sisi lurus.",
    ),
    beda("empat kartu", [SINAR, RUAS, SINAR, SINAR], 1),
    dua("ruas ST", 70, 20),
    sisi("persegi panjang PQRS", { nama: "persegi panjang", huruf: ["P", "Q", "R", "S"] }),
  ]),
  A(9, "kanvas", "Misi Rangka 9: tulis di papan", "Raka meminta kamu menulis jawaban di kanvas.", [
    baca("ruas UV", 0, 70, "cm"),
    beda("empat kartu", [GARIS, SINAR, SINAR, SINAR], 0),
    dua("ruas XY", 25, 60),
    sisi("segilima STUVW", { nama: "segilima", huruf: ["S", "T", "U", "V", "W"] }),
  ]),
  A(10, "suara", "Misi Rangka 10: daftar akhir", "Daftar akhir rangka untuk Bu Ratih. Ucapkan jawabannya.", [
    ubah("ruas ZA", 6),
    beda("empat kartu", [RUAS, RUAS, KURVA, RUAS], 2),
    dua("ruas BC", 75, 20),
    sisi("segienam ABCDEF", { nama: "segienam", huruf: ["A", "B", "C", "D", "E", "F"] }),
  ]),
];

export const POIN_PENTING = [
  "Titik menandai satu tempat, dan ruas garis punya dua titik ujung serta panjang tertentu.",
  "Sinar garis berpangkal di satu titik dan menuju satu arah, sedangkan garis tidak punya ujung.",
  "Kurva melengkung atau berkelok, dan ruas garis yang lurus adalah jalan terpendek antara dua titik.",
  "1 cm = 10 mm, jadi 5 cm 5 mm sama dengan 55 mm atau 5,5 cm.",
  "Mulai mengukur dari angka nol, baca angka di ujung ruas garis, lalu tulis ukuran dengan satuan, misalnya 7 cm atau 45 mm.",
  "Sisi adalah ruas garis yang membatasi bangun datar, dan benda bundar tidak punya sisi lurus.",
  "Cari yang Beda, Ukur Dua Kali, dan Beri Nama Huruf membantu mengenali, mengukur, dan menamai dengan cermat.",
];
/** Poin penting untuk suara (tanpa digit): angka menjadi kata dan satuan dibaca lengkap. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ejaK3B4(p));

/** Jembatan ke Sub-Bab B. */
export const PENUTUP_A =
  "Raka menepati taruhannya dan menyapu lapangan. Besok Kak Anton, pelatih lomba, datang membawa busur derajat dan kertas lipat. Menurutmu, kalau dua bilah bambu bertemu di satu ujung, apa yang terbentuk di sana?";

export const TEMA_BILAH = {
  concrete: { ikon: "\u{1FA81}", nama: "Concrete", cara: "Meja bengkel bambu: benda layang-layang beremoji, kertas warna, dan penggaris bergaris milimeter" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Kertas denah rangka: penggaris, ruas garis, dan bangun polos berwarna" },
  abstract: { ikon: "\u{1F380}", nama: "Abstract", cara: "Papan daftar bengkel: kartu kata dan angka di kertas cokelat, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_BILAH, PICTORIAL as PICTORIAL_BILAH, ABSTRACT as ABSTRACT_BILAH };
