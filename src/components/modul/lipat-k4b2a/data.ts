/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 2 Sub-Bab A "Kain Lipat Bu Wulan" (pecahan berpembilang satu dari daerah arsir, membandingkan dan mengurutkan pecahan berpembilang satu, garis pecahan),
 * awal cerita Sanggar Batik Kampung Mekar. Misi lanjutan "Misi Lipat" (nomor misi berlanjut dari Simulasi). Data berbeda dari Story (lipat dua, empat, delapan; satu per delapan dan satu per empat),
 * kecuali seed Cari kesalahan dari alur (penyebut lebih besar dikira pecahan lebih besar). Concrete memakai kain batik dan benda beremoji di meja lipat, Pictorial memakai diagram polos (pita, kertas lipat, garis) di kertas pola,
 * Abstract memakai kartu kata dan angka di daftar Bu Wulan.
 * Jawaban beragam: memilih pecahan, tanda, atau urutan, menulis satu angka di kanvas, dan mengucapkan satu kata. Jawaban benar dihitung dari data.
 * Angka jawaban Tulis di kanvas per tahap: Concrete 7, 5, 8, 6; Pictorial 3, 4, 6, 9; Abstract 6, 7, 4, 5 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-lipat-k4b2a.mjs.
 */
import type { Cara, Istilah, Langkah, LangkahSalah, LangkahSoal, LArsir, LBerat, LGarisBagi, LGarisSisi, LGarisUrut, LLipat, LPita, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, ucapkan } from "./logika-cpa";

export { MISI_LIPAT_TEKS } from "./data-sim";

const arsir = (n: number, istilah: Istilah = "penyebut", bentuk?: "lingkaran"): LArsir => ({ tipe: "arsir", n, istilah, ...(bentuk ? { bentuk } : {}) });
const pita = (a: number, b: number): LPita => ({ tipe: "pita", a, b });
const berat = (a: number, b: number): LBerat => ({ tipe: "berat", a, b });
const lipat = (p: number, q: number): LLipat => ({ tipe: "lipat", p, q });
const garisUrut = (urut: [number, number, number]): LGarisUrut => ({ tipe: "garisUrut", urut });
const garisBagi = (n: number): LGarisBagi => ({ tipe: "garisBagi", n });
const garisSisi = (a: number, b: number): LGarisSisi => ({ tipe: "garisSisi", a, b });
const salah = (dasar: LPita | LLipat, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
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

/** Empat langkah satu misi, berurut metode: IGIL, Unit Fraction Strip, Fold the Paper, Fraction Number Line. */
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

/* ------------------------------ Concrete: meja lipat dengan kain batik dan benda beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Lipat 2: kain di meja", "Bu Wulan menyiapkan kain putih di meja lipat. Periksa gambarnya.", [
    arsir(6),
    salah(
      pita(5, 9),
      "Satria",
      "Satu per sembilan pasti lebih besar daripada satu per lima, karena sembilan lebih besar daripada lima.",
      "<",
      [
        "Satria benar, penyebut yang lebih besar berarti pecahan yang lebih besar.",
        "Satria keliru: bagian yang lebih banyak membuat tiap bagian lebih kecil, jadi penyebut yang lebih besar berarti pecahan yang lebih kecil.",
        "Satria keliru, pecahan berpembilang satu tidak bisa dibandingkan.",
      ],
      1,
      "Penyebut yang lebih besar berarti seluruhnya dibagi menjadi lebih banyak bagian, sehingga tiap bagian lebih kecil.",
    ),
    lipat(4, 10),
    garisUrut([3, 6, 9]),
  ]),
  C(3, "kanvas", "Misi Lipat 3: papan sanggar", "Laras mencatat bagian kain dan bahan di papan sanggar. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [arsir(7, "penyebut", "lingkaran"), berat(5, 8), lipat(3, 9), garisBagi(6)]),
  C(4, "suara", "Misi Lipat 4: panggilan Pak Hendro", "Pak Hendro memanggil dari halaman sanggar. Jawab dengan suaramu.", [arsir(10, "penyebut"), pita(3, 7), lipat(8, 5), garisSisi(3, 5)]),
];

/* ------------------------------ Pictorial: kertas pola dengan pita, kertas lipat, dan garis polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Lipat 5: kertas pola", "Genta menyalin lipatan kain ke kertas pola. Periksa gambarnya.", [
    arsir(5),
    pita(11, 13),
    salah(
      lipat(4, 6),
      "Genta",
      "Kertas kedua dilipat menjadi enam bagian sama besar, jadi satu bagiannya ditulis satu per enam.",
      "1/6",
      [
        "Genta keliru, satu bagian harus ditulis dengan banyak bagian kertas pertama.",
        "Genta keliru, pembilangnya harus sama dengan banyak bagian.",
        "Genta benar: kertas kedua terbagi menjadi enam bagian sama besar, jadi satu bagian ditulis satu per enam.",
      ],
      2,
      "Jawaban Genta benar: satu bagian dari enam bagian sama besar ditulis satu per enam.",
      true,
    ),
    garisUrut([7, 3, 5]),
  ]),
  Pi(6, "kanvas", "Misi Lipat 6: bagan Laras", "Laras menggambar bagan bagian kain. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [arsir(3, "penyebut", "lingkaran"), berat(6, 4), lipat(5, 7), garisBagi(9)]),
  Pi(7, "suara", "Misi Lipat 7: lapor ke Pak Hendro", "Genta melaporkan bagannya kepada Pak Hendro. Sebutkan jawabanmu.", [arsir(4, "pembilang"), pita(3, 6), lipat(5, 9), garisSisi(10, 5)]),
];

/* ------------------------------ Abstract: daftar Bu Wulan dengan kartu kata dan angka ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Lipat 8: daftar Bu Wulan", "Daftar Bu Wulan hanya berisi kata dan angka.", [
    arsir(3),
    salah(
      pita(6, 7),
      "Satria",
      "Satu per tujuh lebih besar daripada satu per enam, karena tujuh lebih besar daripada enam.",
      "<",
      [
        "Satria benar, angka yang lebih besar selalu menghasilkan pecahan yang lebih besar.",
        "Satria keliru, kedua pecahan itu sama besar karena pembilangnya sama.",
        "Satria keliru: penyebut yang lebih besar berarti bagian lebih banyak dan tiap bagian lebih kecil, jadi pecahannya lebih kecil.",
      ],
      2,
      "Penyebut yang lebih besar berarti seluruhnya dibagi menjadi lebih banyak bagian, sehingga tiap bagian lebih kecil.",
    ),
    lipat(4, 5),
    garisUrut([10, 5, 2]),
  ]),
  A(9, "kanvas", "Misi Lipat 9: tulis di daftar", "Laras meminta kamu menulis jawaban di kanvas.", [arsir(6), pita(9, 7), lipat(7, 5), garisBagi(5)]),
  A(10, "suara", "Misi Lipat 10: daftar akhir", "Daftar akhir pecahan untuk Bu Wulan. Ucapkan jawabannya.", [arsir(7, "penyebut"), berat(13, 11), lipat(3, 7), garisSisi(7, 4)]),
];

export const POIN_PENTING = [
  "Pecahan menyatakan sebagian dari seluruh bagian yang sama besar. Contoh: satu bagian dari 4 bagian sama besar ditulis 1/4.",
  "Angka di atas garis pecahan disebut pembilang, dan angka di bawahnya disebut penyebut.",
  "Penyebut menunjukkan banyak bagian seluruhnya, dan pembilang menunjukkan banyak bagian yang diambil.",
  "Bagian yang lebih banyak berarti tiap bagian lebih kecil. Maka 1/8 lebih kecil dari 1/4.",
  "Pecahan berpembilang satu dibandingkan lewat penyebutnya: penyebut lebih besar berarti pecahan lebih kecil.",
  "Pita Pecahan, Lipat Kertas, dan Garis Pecahan membantu membandingkan dan mengurutkan pecahan tanpa tertukar.",
];
/** Poin penting untuk suara (tanpa digit): pecahan menjadi kata. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p));

/** Jembatan ke Sub-Bab B. */
export const PENUTUP_A = "Pak Joyo, tukang pewarna, datang membawa bak-bak warna yang isinya berbeda-beda. Pecahan satu bagian tadi ternyata hanya awal cerita. Menurutmu, bak mana yang paling banyak isinya?";

export const TEMA_LIPAT = {
  concrete: { ikon: "\u{1F9F5}", nama: "Concrete", cara: "Meja lipat: kain batik dan benda beremoji yang dilipat menjadi bagian sama besar" },
  pictorial: { ikon: "\u{1F4CA}", nama: "Pictorial", cara: "Kertas pola: pita, kertas lipat, dan garis pecahan polos" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Daftar Bu Wulan: kartu kata dan angka, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_LIPAT, PICTORIAL as PICTORIAL_LIPAT, ABSTRACT as ABSTRACT_LIPAT };
