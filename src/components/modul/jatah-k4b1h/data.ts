/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 1 Sub-Bab H "Papan Jatah Bu Ratna" (pembagian sampai seratus: bagi rata, kurang berulang, bagi susun, sisa),
 * cerita Penginapan Pulau Karang Indah. Misi lanjutan "Misi Jatah" (nomor misi berlanjut dari Simulasi). Data berbeda dari Story (56 : 4, 59 : 4, 24 : 6, 36 : 6, 84 : 7) kecuali contoh 48 permen ke 2, 3, 4, 5, 6, 8 wadah yang sengaja ikut di tiap tahap (habis, kecuali ke 5 wadah bersisa),
 * kecuali seed Cari kesalahan dari alur. Concrete memakai benda pulau wisata beremoji di papan jatah berpintu, Pictorial memakai diagram polos (titik, bagan batang, garis loncat, bagan bersusun),
 * Abstract memakai kartu kata dan angka di daftar jatah kamar. Jawaban beragam: memilih bilangan, menulis satu angka di kanvas, dan mengucapkan satu kata (habis, sisa) atau bilangan pendek.
 * Jawaban benar dihitung dari data. Angka jawaban Tulis di kanvas per tahap: Concrete 6, 3, 8, 2; Pictorial 9, 1, 5, 2; Abstract 8, 5, 3, 4 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-jatah-k4b1h.mjs.
 */
import type { Cara, LDasar, Langkah, LangkahSalah, LangkahSoal, Rupa, SoalMisi, Tanya, Tipe } from "./logika-cpa";
import { URUT_METODE, instruksi, ucapkan } from "./logika-cpa";

export { MISI_JATAH_TEKS } from "./data-sim";

const t = (tipe: Tipe) => (benda: string, n: number, d: number, tanya: Tanya): LDasar => ({ tipe, benda, n, d, tanya });
const bagi = t("bagi");
const rata = t("rata");
const kurang = t("kurang");
const susun = t("susun");
const salah = (dasar: LDasar, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
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

/** Empat langkah satu misi, berurut metode: IGIL, Equal Sharing, Repeated Subtraction, Long Division. */
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

/* ------------------------------ Concrete: papan jatah berpintu dengan benda pulau wisata beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Jatah 2: papan jatah lorong", "Bu Ratna menata benda di papan jatah lorong penginapan. Periksa gambarnya.", [
    bagi("permen", 48, 4, "hasil"),
    salah(
      rata("kelapa", 30, 4, "sisa"),
      "Genta",
      "Tiga puluh kelapa dibagi ke empat kamar, jadi tiap kamar mendapat tujuh kelapa, karena empat kali tujuh tidak melebihi tiga puluh.",
      "7",
      [
        "Genta benar: empat kali tujuh tidak melebihi tiga puluh, sedangkan empat kali delapan sudah melebihinya.",
        "Genta keliru, tiap kamar harus mendapat delapan kelapa.",
        "Genta keliru, semua kelapa harus habis terbagi dan tidak boleh ada yang tersisa.",
      ],
      0,
      "Jawaban Genta benar untuk banyak kelapa di tiap kamar, tetapi pertanyaan di bawah menanyakan hal yang lain.",
      true,
    ),
    kurang("payung", 35, 5, "kali"),
    susun("nanas", 52, 4, "hasil"),
  ]),
  C(3, "kanvas", "Misi Jatah 3: gantungan nomor", "Bu Ratna mencatat jatah di gantungan nomor. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    bagi("koper", 42, 7, "hasil"),
    rata("kerang", 27, 4, "sisa"),
    kurang("lentera", 40, 5, "kali"),
    susun("semangka", 51, 3, "s1"),
  ]),
  C(4, "suara", "Misi Jatah 4: panggilan Pak Hendro", "Pak Hendro memanggil dari ujung lorong. Jawab dengan suaramu.", [
    bagi("kelapa", 54, 3, "hasil"),
    rata("permen", 48, 6, "habis"),
    kurang("nanas", 47, 9, "sisa"),
    susun("kerang", 60, 4, "hasil"),
  ]),
];

/* ------------------------------ Pictorial: kertas jatah dengan titik, bagan batang, garis loncat, dan bagan bersusun polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Jatah 5: kertas jatah", "Laras menyalin jatah ke kertas biru berpetak. Periksa gambarnya.", [
    bagi("jatah", 48, 2, "hasil"),
    rata("jatah", 45, 5, "tiap"),
    kurang("jatah", 63, 9, "kali"),
    salah(
      susun("jatah", 96, 3, "hasil"),
      "Satria",
      "Sembilan puluh enam dibagi tiga: sembilan dibagi tiga sama dengan tiga, lalu aku lupa menurunkan angka enam, jadi hasilnya tiga.",
      "3",
      [
        "Satria benar, pembagian boleh berhenti setelah membagi angka puluhan saja.",
        "Satria keliru: setelah membagi puluhan, angka satuan harus diturunkan lalu dibagi lagi sampai habis.",
        "Satria keliru, hasil bagi selalu sama dengan angka puluhan dibagi pembagi.",
      ],
      1,
      "Angka satuan belum diturunkan dan dibagi, jadi pembagiannya belum selesai.",
    ),
  ]),
  Pi(6, "kanvas", "Misi Jatah 6: kapur Genta", "Genta menggambar jatah yang lebih besar. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    bagi("jatah", 48, 8, "hasil"),
    rata("jatah", 41, 4, "sisa"),
    kurang("jatah", 30, 6, "kali"),
    susun("jatah", 92, 4, "q1"),
  ]),
  Pi(7, "suara", "Misi Jatah 7: lapor ke Pak Hendro", "Laras melaporkan jatahnya kepada Pak Hendro. Sebutkan jawabanmu.", [
    bagi("jatah", 98, 7, "hasil"),
    rata("jatah", 48, 5, "habis"),
    kurang("jatah", 54, 9, "kali"),
    susun("jatah", 85, 5, "gabung"),
  ]),
];

/* ------------------------------ Abstract: daftar jatah kamar dengan kartu kata dan angka ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Jatah 8: daftar jatah", "Daftar jatah kamar hanya berisi kata dan angka.", [
    bagi("daftar", 48, 3, "hasil"),
    rata("daftar", 49, 7, "tiap"),
    salah(
      kurang("daftar", 42, 6, "kali"),
      "Satria",
      "Empat puluh dua dibagi enam, jadi hasil baginya enam, sama dengan pembaginya.",
      "6",
      [
        "Satria benar, hasil bagi selalu sama dengan pembagi.",
        "Satria keliru: hasil bagi adalah banyaknya pengurangan sampai habis, bukan angka pembaginya.",
        "Satria keliru, hasil bagi adalah sisa dari pengurangan.",
      ],
      1,
      "Hitung banyaknya pengurangan sampai bilangan habis. Banyaknya pengurangan itulah hasil bagi, bukan pembaginya.",
    ),
    susun("daftar", 95, 5, "hasil"),
  ]),
  A(9, "kanvas", "Misi Jatah 9: tulis di daftar", "Satria meminta kamu menulis jawaban di kanvas.", [
    bagi("daftar", 64, 8, "hasil"),
    rata("daftar", 29, 6, "sisa"),
    kurang("daftar", 27, 9, "kali"),
    susun("daftar", 74, 2, "turun"),
  ]),
  A(10, "suara", "Misi Jatah 10: daftar akhir", "Daftar akhir jatah untuk Bu Ratna. Ucapkan jawabannya.", [
    bagi("daftar", 90, 6, "hasil"),
    rata("daftar", 48, 8, "habis"),
    kurang("daftar", 38, 7, "sisa"),
    susun("daftar", 72, 6, "hasil"),
  ]),
];

export const POIN_PENTING = [
  "Membagi berarti menaruh benda sama banyak ke tiap tempat, misalnya 56 : 4 = 14.",
  "Bagi Rata: bagikan satu per satu bergiliran, banyak benda di satu wadah adalah hasil bagi.",
  "Kurang Berulang: kurangi dengan pembagi berkali-kali, banyaknya pengurangan adalah hasil bagi.",
  "Bagi Susun: bagi dari puluhan ke satuan, turunkan angka satuan, lalu bagi lagi.",
  "Makin banyak wadah, makin sedikit benda di tiap wadah: 48 benda ke 2, 3, 4, 6, 8 wadah habis terbagi, tiap wadah mendapat 24, 16, 12, 8, 6.",
  "Sisa pembagian selalu lebih kecil daripada pembagi, misalnya 59 : 4 = 14 sisa 3.",
  "Periksa dengan perkalian: hasil bagi × pembagi + sisa harus sama dengan bilangan awal.",
];
/** Poin penting untuk suara (tanpa digit): angka menjadi kata dan lambang dibaca lengkap. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p));

/** Jembatan ke Sub-Bab I. */
export const PENUTUP_H = "Kak Yoga, pemandu pantai, datang membawa payung dan jadwal perahu yang masih berantakan. Menurutmu, bagaimana cara menata payung dalam baris sama banyak?";

export const TEMA_JATAH = {
  concrete: { ikon: "\u{1F6CF}", nama: "Concrete", cara: "Lorong kamar: benda pulau wisata beremoji di papan jatah berpintu" },
  pictorial: { ikon: "\u{1F4CA}", nama: "Pictorial", cara: "Kertas jatah: titik, bagan batang, garis loncat, dan bagan bersusun polos" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Daftar jatah kamar: kartu kata dan angka di kertas bergaris, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_JATAH, PICTORIAL as PICTORIAL_JATAH, ABSTRACT as ABSTRACT_JATAH };
