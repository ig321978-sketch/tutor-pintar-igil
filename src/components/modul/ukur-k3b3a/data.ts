/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 3 Sub-Bab A "Ukuran Kandang Kak Tari" (mengukur panjang dengan satuan baku), awal cerita Kebun Binatang Mini.
 * Misi lanjutan "Misi Ukur" (nomor misi berlanjut dari Simulasi). Ukuran berbeda dari Story (7 dan 6 jengkal, 15 dan 17, 3 m, 20 dan 22, 6 langkah, 40) kecuali ruang jawaban yang sempit.
 * Concrete memakai benda kebun binatang beremoji pada penggaris tempel di papan kayu bercat, Pictorial memakai batang polos pada penggaris dan pita di kertas denah,
 * Abstract memakai kartu kata dan angka bertuliskan kapur. Jawaban beragam: memilih ukuran bersatuan atau nama alat dan satuan, menulis satu angka di kanvas,
 * dan mengucapkan satu kata (penggaris, meteran, sentimeter, meter, dekat, jauh) atau bilangan pendek. Kunci dihitung dari data.
 * Angka jawaban Tulis di kanvas per tahap: Concrete 5, 4, 8, 9; Pictorial 8, 5, 9, 4; Abstract 4, 9, 5, 8 (tidak kembar dalam satu tahap; ruang jawaban satu angka sempit,
 * jadi sebagian sama dengan angka Story seperti 6 dan 7 tidak dipakai tetapi 4, 5, 8, 9 berulang antartahap).
 * Diuji: scripts/uji-ukur-k3b3a.mjs.
 */
import type { Cara, Langkah, LangkahSalah, LangkahSoal, LAcuan, LAlat, LBaca, LKira, LPita, LSatuan, LSelisih, Rupa, Sat, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, kataBil } from "./logika-cpa";

export { MISI_UKUR_TEKS } from "./data-sim";

const baca = (benda: string, mulai: number, ujung: number, sat?: Sat): LBaca => ({ tipe: "baca", benda, mulai, ujung, ...(sat ? { sat } : {}) });
const alat = (benda: string, panjang: number, sat: Sat): LAlat => ({ tipe: "alat", benda, panjang, sat });
const kira = (benda: string, perkiraan: number, ukur: number): LKira => ({ tipe: "kira", benda, perkiraan, ukur });
const acuan = (benda: string, kuku: number): LAcuan => ({ tipe: "acuan", benda, kuku });
const pita = (benda: string, panjang: number, sat: Sat): LPita => ({ tipe: "pita", benda, panjang, sat });
const selisih = (benda: string, a: number, b: number, sat: Sat): LSelisih => ({ tipe: "selisih", benda, a, b, sat });
const satuan = (benda: string, panjang: number, sat: Sat): LSatuan => ({ tipe: "satuan", benda, panjang, sat });
const salah = (dasar: LBaca | LAlat, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
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

/** Empat langkah satu misi, berurut metode: IGIL, Estimate and Check, Benchmark Measuring, Strip Ruler. */
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

/* ------------------------------ Concrete: papan kayu bercat dengan benda kebun binatang beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Ukur 2: papan ukur di kandang kelinci", "Kak Tari menaruh benda di papan kayu bercat yang ada penggaris tempelnya. Periksa ukurannya.", [
    salah(
      baca("krayon", 3, 11),
      "Raka",
      "Ujung krayon di angka tiga dan ujung yang lain di angka sebelas, jadi krayon itu panjangnya sebelas sentimeter.",
      "11 cm",
      [
        "Raka benar, panjang benda selalu sama dengan angka di ujung kanan.",
        "Raka keliru: ujung kiri krayon tidak di angka nol, jadi panjangnya sebelas dikurangi tiga, yaitu delapan sentimeter.",
        "Raka keliru, panjang benda didapat dengan menjumlahkan angka di kedua ujung.",
      ],
      1,
      "Ujung kiri krayon ada di angka tiga, bukan di angka nol. Panjangnya sebelas dikurangi tiga sama dengan delapan sentimeter.",
    ),
    kira("pensil", 12, 14),
    acuan("wortel", 12),
    pita("kardus pakan", 27, "cm"),
  ]),
  C(3, "kanvas", "Misi Ukur 3: catatan Salsa", "Salsa mencatat ukuran benda di papan kayu. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [baca("pensil", 0, 5), kira("jagung", 12, 16), acuan("krayon", 8), selisih("wortel", 18, 9, "cm")]),
  C(4, "suara", "Misi Ukur 4: panggilan Pak Joko", "Pak Joko memanggil dari gerbang kebun binatang. Jawab dengan suaramu.", [alat("jalan setapak rusa", 9, "m"), kira("ekor kura-kura", 16, 25), acuan("jagung", 14), satuan("pensil", 18, "cm")]),
];

/* ------------------------------ Pictorial: kertas denah kandang dengan batang polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Ukur 5: denah kandang", "Bima menggambar denah kandang di kertas bergaris biru. Periksa gambarnya.", [
    salah(
      baca("batang A", 0, 9),
      "Bima",
      "Ujung kiri batang di angka nol dan ujung kanan di angka sembilan, jadi panjang batang itu sembilan sentimeter.",
      "9 cm",
      [
        "Bima keliru: sembilan sentimeter belum benar karena satuannya harus meter.",
        "Bima benar: ujung kiri tepat di angka nol, jadi panjang batang sama dengan angka di ujung kanan, yaitu sembilan sentimeter.",
        "Bima keliru, ujung kiri di angka nol sehingga panjangnya harus ditambah satu.",
      ],
      1,
      "Jawaban Bima benar. Ujung kiri tepat di angka nol, jadi panjang batang sama dengan angka di ujung kanan, yaitu sembilan sentimeter.",
      true,
    ),
    kira("batang B", 24, 28),
    acuan("batang C", 19),
    pita("pagar", 8, "m"),
  ]),
  Pi(6, "kanvas", "Misi Ukur 6: denah Salsa", "Salsa menggambar denah yang lebih besar. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [baca("batang D", 0, 8), kira("batang E", 13, 18), acuan("batang F", 9), selisih("pita merah", 29, 25, "cm")]),
  Pi(7, "suara", "Misi Ukur 7: lapor ke Pak Joko", "Bima melaporkan denahnya kepada Pak Joko. Sebutkan jawabanmu.", [alat("ekor kura-kura", 5, "cm"), kira("batang G", 21, 29), acuan("batang H", 23), satuan("pagar", 5, "m")]),
];

/* ------------------------------ Abstract: papan nama kandang dengan kartu kata dan angka ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Ukur 8: papan nama kandang", "Papan nama kandang hanya berisi kata dan angka.", [
    salah(
      alat("pagar kandang", 6, "m"),
      "Salsa",
      "Pagar kandang panjangnya enam meter, jadi diukur dengan penggaris.",
      "penggaris",
      [
        "Salsa benar, penggaris cocok untuk mengukur semua benda.",
        "Salsa keliru, satuan meter berarti bendanya harus diukur dengan jengkal.",
        "Salsa keliru: pagar enam meter itu panjang, jadi lebih tepat diukur dengan meteran.",
      ],
      2,
      "Pagar enam meter itu panjang. Benda panjang diukur dengan meteran, bukan penggaris.",
    ),
    kira("tali", 19, 26),
    acuan("tali", 18),
    pita("tali", 34, "cm"),
  ]),
  A(9, "kanvas", "Misi Ukur 9: tulis di papan", "Raka meminta kamu menulis jawaban di kanvas.", [baca("papan", 0, 4), kira("tali", 24, 33), acuan("papan", 5), selisih("papan", 31, 23, "cm")]),
  A(10, "suara", "Misi Ukur 10: daftar akhir", "Daftar akhir ukuran untuk Kak Tari. Ucapkan jawabannya.", [alat("papan nama", 12, "cm"), kira("tali", 14, 16), acuan("papan", 21), satuan("jalan setapak", 25, "m")]),
];

export const POIN_PENTING = [
  "Satuan tidak baku, seperti jengkal, berbeda-beda untuk setiap orang, jadi kita memakai satuan baku.",
  "Satuan baku panjang adalah sentimeter dan meter, ditulis dengan cm dan m.",
  "Penggaris dipakai untuk benda pendek, dan meteran dipakai untuk benda panjang.",
  "Letakkan ujung benda tepat di angka nol, lalu baca angka di ujung benda yang lain.",
  "Hasil ukur ditulis dengan satuan, misalnya 15 cm atau 3 m, bukan hanya angkanya.",
  "Selisih dua panjang didapat dengan mengurangkan panjang yang lebih besar dengan yang lebih kecil.",
  "Perkirakan dan Periksa, Ukuran Acuan, dan Pita Penggaris membantu mengukur dengan cermat.",
];
/** Poin penting untuk suara (tanpa digit): angka menjadi kata dan satuan dibaca lengkap. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) =>
  p
    .replace(/\d+/g, (d) => kataBil(Number(d)))
    .replace(/\bcm\b/g, "sentimeter")
    .replace(/\bm\b/g, "meter"),
);

/** Jembatan ke Sub-Bab B. */
export const PENUTUP_A =
  "Raka menepati taruhannya dan mengepel kandang kelinci. Besok Pak Wayan, tukang kandang, datang membawa pita dan meteran. Menurutmu, kalau satu meter sama dengan seratus sentimeter, berapa sentimeter dua meter?";

export const TEMA_UKUR = {
  concrete: { ikon: "\u{1F4CF}", nama: "Concrete", cara: "Papan kayu bercat: benda kebun binatang beremoji, penggaris tempel, dan jejak kaki kelinci" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Kertas denah kandang: penggaris, meteran, dan pita polos dengan batang berwarna" },
  abstract: { ikon: "\u{1F4CB}", nama: "Abstract", cara: "Papan nama kandang: kartu kata dan angka bertuliskan kapur, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_UKUR, PICTORIAL as PICTORIAL_UKUR, ABSTRACT as ABSTRACT_UKUR };
