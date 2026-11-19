/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 4 Sub-Bab C "Lintasan Pak Samsul" (garis tegak lurus, garis sejajar, dan bangun datar sederhana), akhir cerita Festival Layang-layang Kampung.
 * Misi lanjutan "Misi Lintasan" (nomor misi berlanjut dari Simulasi). Huruf titik dan bilangan berbeda dari Story (Story memakai A, B, C, E, F, G, H dan jarak tiga petak, dua petak, empat petak).
 * Concrete memakai benda beremoji festival (bendera, layang-layang, benang, pita, balon, kertas) di lintasan lomba dengan tali dan patok oranye,
 * Pictorial memakai kertas petak, garis, pojok kertas, dan bangun polos tanpa emoji benda, Abstract memakai kartu kata, huruf titik, angka, dan lambang di lembar panitia.
 * Jawaban beragam: memilih pernyataan, menulis satu angka di kanvas (jarak petak, banyak titik tegak lurus, banyak sisi atau sudut, banyak bangun), dan mengucapkan satu kata (sejajar, tegak lurus, nama bangun) atau bilangan pendek.
 * Kunci dihitung dari data. Angka jawaban Tulis di kanvas per tahap: Concrete 3, 5, 2, 4; Pictorial 4, 1, 3, 2; Abstract 3, 4, 1, 2 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-lintasan-k3b4c.mjs.
 */
import type { Benda, Bentuk, Ciri, Huruf4, Langkah, LangkahSalah, LangkahSoal, LBangun, LLambang, LPilah, LSejajar, LTegak, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, ucap } from "./logika-cpa";

export { MISI_LINTASAN_TEKS } from "./data-sim";

const sj = (hrf: Huruf4, dKiri: number, dKanan: number, miring: number, benda: Benda, kanvas: LSejajar["kanvas"], suara: LSejajar["suara"] = "hubungan"): LSejajar => ({ tipe: "sejajar", hrf, dKiri, dKanan, miring, benda, kanvas, suara });
const tg = (sudut: number[], benda: Benda, suara: LTegak["suara"] = "hubungan"): LTegak => ({ tipe: "tegak", sudut, benda, suara });
const bg = (bentuk: Bentuk, benda: Benda, kanvas: LBangun["kanvas"]): LBangun => ({ tipe: "bangun", bentuk, benda, kanvas });
const pl = (bentuk: Bentuk[], ciri: Ciri, benda: Benda): LPilah => ({ tipe: "pilah", bentuk, ciri, benda });
const lb = (rel: LLambang["rel"], hrf: Huruf4, benda: Benda): LLambang => ({ tipe: "lambang", rel, hrf, benda });
const salah = (dasar: LangkahSalah["dasar"], tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
  tipe: "salah",
  dasar,
  tokoh,
  kataTokoh,
  jawabTokoh,
  alasan,
  benar,
  keliru,
  ...(betul ? { betul: true } : {}),
});

/** Empat langkah satu misi, berurut metode: IGIL, Grid Paper Check, Fold and Match, Shape Sort. */
const satuMisi =
  (rupa: Rupa) =>
  (nomor: number, cara: SoalMisi["cara"], judul: string, cerita: string, isi: [Langkah, Langkah, Langkah, Langkah]): SoalMisi => ({
    nomor,
    judul,
    cerita,
    cara,
    langkah: isi.map((l, i): LangkahSoal => {
      const s = instruksi(l, rupa, cara);
      return { metode: URUT_METODE[i], cara, judul: s, suara: s, langkah: l };
    }),
  });

/* ------------------------------ Concrete: lintasan lomba dengan tali, patok oranye, dan benda beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Lintasan 2: catatan lapangan", "Pak Samsul mencatat keadaan lintasan lomba. Lihat tali dan benda di lapangan, lalu periksa dengan cara yang tepat.", [
    salah(
      sj(["K", "L", "M", "N"], 1, 3, 0, "bendera", "selisih"),
      "Raka",
      "Dua tali ini tampak tidak bertemu, jadi pasti sejajar. Kalau salah, aku menggulung semua tali sendirian!",
      "KL // MN",
      [
        "Raka benar, dua tali yang tampak tidak bertemu pasti sejajar.",
        "Raka keliru: jarak kedua tali di ujung kiri dan di ujung kanan berbeda, jadi kedua tali itu tidak sejajar.",
        "Raka keliru karena tali sejajar selalu bertemu di ujungnya.",
      ],
      1,
      "Raka hanya melihat tali yang tidak bertemu. Garis sejajar harus berjarak sama di kedua ujung, sedangkan di sini jaraknya berbeda.",
    ),
    sj(["R", "S", "T", "U"], 4, 4, 1, "benang", "kiri"),
    tg([60, 120, 90], "layang"),
    pl(["segitiga", "lingkaran", "persegiPanjang"], "tanpaSudut", "pita"),
  ]),
  C(3, "kanvas", "Misi Lintasan 3: catatan Salsa", "Salsa mencatat keadaan lintasan lomba. Periksa bendanya, lalu tulis jawabanmu di kanvas.", [
    bg("segitiga", "bendera", "sudut"),
    sj(["R", "S", "T", "U"], 5, 5, 1, "benang", "kiri"),
    tg([90, 45, 90, 135], "layang"),
    pl(["persegi", "lingkaran", "persegiPanjang", "segitiga", "persegi", "persegiPanjang"], "empatSisi", "pita"),
  ]),
  C(4, "suara", "Misi Lintasan 4: panggilan Pak Samsul", "Pak Samsul memanggil dari tenda panitia. Jawab dengan suaramu.", [
    lb("sejajar", ["V", "W", "X", "Y"], "balon"),
    sj(["P", "Q", "R", "S"], 2, 2, 0, "benang", "kiri", "jarak"),
    tg([120, 90, 60], "layang", "hubungan"),
    pl(["persegi", "lingkaran", "persegi", "segitiga", "persegi"], "sisiSama", "pita"),
  ]),
];

/* ------------------------------ Pictorial: kertas petak hijau muda dengan garis, pojok kertas, dan bangun polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Lintasan 5: gambar Bima", "Bima menggambar lintasan di kertas petak hijau. Periksa gambarnya.", [
    salah(
      bg("persegiPanjang", "kertas", "sisi"),
      "Bima",
      "Bangun ini punya empat sisi dan empat sudut siku-siku, tetapi sisinya tidak sama panjang. Jadi namanya persegi panjang.",
      "persegi panjang",
      [
        "Bima keliru: bangun dengan empat sisi pasti bernama persegi.",
        "Bima keliru karena persegi panjang tidak punya sudut siku-siku.",
        "Bima benar: empat sisi, empat sudut siku-siku, dan sisi yang tidak sama panjang adalah ciri persegi panjang.",
      ],
      2,
      "Jawaban Bima benar. Persegi panjang punya empat sisi dan empat sudut siku-siku, dengan sisi yang berhadapan sama panjang.",
      true,
    ),
    sj(["M", "N", "P", "Q"], 5, 2, 0, "benang", "selisih"),
    tg([90, 135, 45], "layang"),
    pl(["segitiga", "persegiPanjang", "persegi"], "sisiSama", "pita"),
  ]),
  Pi(6, "kanvas", "Misi Lintasan 6: kertas petak Salsa", "Salsa menggambar tali dan bangun di kertas petak hijau. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    bg("persegi", "kertas", "siku"),
    sj(["M", "N", "P", "Q"], 1, 1, 2, "benang", "kiri"),
    tg([90, 60, 90, 90], "layang"),
    pl(["lingkaran", "segitiga", "persegi", "lingkaran", "persegiPanjang"], "tanpaSudut", "pita"),
  ]),
  Pi(7, "suara", "Misi Lintasan 7: lapor ke Pak Samsul", "Bima melaporkan gambarnya kepada Pak Samsul. Sebutkan jawabanmu.", [
    lb("tegak", ["J", "K", "L", "M"], "balon"),
    sj(["R", "S", "T", "U"], 4, 4, 2, "benang", "kiri", "hubungan"),
    tg([120, 90, 45, 90], "layang", "banyak"),
    pl(["lingkaran", "segitiga", "lingkaran", "lingkaran", "persegiPanjang"], "tanpaSudut", "pita"),
  ]),
];

/* ------------------------------ Abstract: lembar panitia dengan kartu kata, huruf titik, angka, dan lambang ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Lintasan 8: lembar panitia", "Lembar panitia hanya berisi kata, huruf titik, angka, dan lambang.", [
    salah(
      lb("tegak", ["P", "Q", "R", "S"], "balon"),
      "Salsa",
      "Garis PQ dan garis RS bertemu pada sudut siku-siku, jadi aku menuliskan lambang dua garis miring.",
      "PQ // RS",
      [
        "Salsa benar, dua garis miring dipakai untuk garis tegak lurus.",
        "Salsa keliru: garis tegak lurus ditulis dengan lambang yang seperti huruf T terbalik, sedangkan dua garis miring untuk garis sejajar.",
        "Salsa keliru karena garis yang bertemu tidak bisa ditulis dengan lambang.",
      ],
      1,
      "Dua garis miring dipakai untuk garis sejajar. Dua garis yang bertemu pada sudut siku-siku ditulis dengan lambang yang seperti huruf T terbalik.",
    ),
    sj(["W", "X", "Y", "Z"], 2, 2, 0, "benang", "kiri"),
    tg([45, 90, 135], "layang"),
    pl(["persegi", "segitiga", "lingkaran"], "empatSisi", "pita"),
  ]),
  A(9, "kanvas", "Misi Lintasan 9: tulis di lembar panitia", "Salsa meminta kamu menulis jawaban di kanvas.", [
    bg("segitiga", "bendera", "sisi"),
    sj(["W", "X", "Y", "Z"], 1, 5, 0, "benang", "selisih"),
    tg([60, 90, 120], "layang"),
    pl(["segitiga", "persegi", "segitiga", "lingkaran", "persegiPanjang"], "tigaSisi", "pita"),
  ]),
  A(10, "suara", "Misi Lintasan 10: laporan akhir", "Laporan akhir lintasan lomba untuk Pak Samsul. Bacakan jawabannya.", [
    lb("sejajar", ["N", "P", "Q", "R"], "balon"),
    sj(["W", "X", "Y", "Z"], 5, 5, 0, "benang", "kiri", "jarak"),
    tg([135, 90, 60], "layang", "hubungan"),
    pl(["persegiPanjang", "segitiga", "persegiPanjang", "persegiPanjang", "lingkaran"], "empatSisi", "pita"),
  ]),
];

export const POIN_PENTING = [
  "Dua garis yang bertemu pada sudut siku-siku disebut garis tegak lurus, ditulis AB ⊥ BC.",
  "Garis tegak lurus diperiksa dengan pojok kertas lipat: kalau pojoknya pas, garisnya tegak lurus.",
  "Dua garis yang jaraknya selalu sama dan tidak pernah bertemu disebut garis sejajar, ditulis EF // GH.",
  "Garis sejajar diperiksa dengan jarak di kedua ujung pada kertas petak: kalau jaraknya sama, garisnya sejajar.",
  "Segitiga punya 3 sisi dan 3 sudut. Persegi panjang punya 4 sisi dan 4 sudut siku-siku. Persegi sisinya sama panjang.",
  "Lingkaran dibatasi garis lengkung, tanpa sisi lurus dan tanpa sudut.",
  "Cek Kertas Petak, Lipat dan Cocokkan, dan Pilah Bangun membantu memeriksa garis dan bangun.",
];
/** Poin penting untuk suara (tanpa digit dan lambang): bilangan dan lambang dieja. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucap(p));

/** Penutup akhir cerita bab (Sub-Bab C). */
export const PENUTUP_C = "Lintasan Pak Samsul sudah rapi dan Festival Layang-layang Kampung dimulai. Terima kasih, Raka, Salsa, Bima, Pak Joko, Bu Ratih, Kak Anton, dan Pak Samsul!";

export const TEMA_LINTASAN = {
  concrete: { ikon: "\u{1F38F}", nama: "Concrete", cara: "Lintasan lomba: tali, patok oranye, dan benda beremoji festival" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Kertas petak hijau muda: garis, pojok kertas, dan bangun polos" },
  abstract: { ikon: "\u{1F4E3}", nama: "Abstract", cara: "Lembar panitia: kartu kata, huruf titik, angka, dan lambang, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_LINTASAN, PICTORIAL as PICTORIAL_LINTASAN, ABSTRACT as ABSTRACT_LINTASAN };
