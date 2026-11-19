/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 3 Sub-Bab C "Pakan Bu Lastri" (mengukur berat dengan satuan baku), tema Kebun Binatang Mini.
 * Misi lanjutan "Misi Pakan" (nomor misi berlanjut dari Simulasi). Berat berbeda dari Story (250 g, 4 kg, 100 g, 500 g, 400 g, 200 g, 10 kg, 11 kg, 10 g, 150 g, jarum di 1 dan 5).
 * Concrete memakai benda beremoji di lantai gudang pakan, Pictorial memakai layar, jarum, dan batang polos di papan timbangan,
 * Abstract memakai kartu kata dan angka di catatan juru pakan. Jawaban beragam: memilih ukuran bersatuan, tangan, langkah, atau jenis timbangan (klik),
 * menulis satu angka di kanvas (angka jarum, selisih, banyak kantong, jarum mundur), dan mengucapkan satu kata (gram, kilogram, kiri, kanan, digital, duduk, badan) atau bilangan pendek.
 * Kunci dihitung dari data. Angka jawaban Tulis di kanvas per tahap: Concrete 7, 6, 8, 3; Pictorial 9, 2, 6, 8; Abstract 6, 3, 9, 7 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-timbang-k3b3c.mjs.
 */
import type { Cara, Langkah, LAcuan, LAlat, LBanding, LBaca, LNol, LangkahSalah, LangkahSoal, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, kataBil } from "./logika-cpa";

export { MISI_TIMBANG_TEKS } from "./data-sim";

const baca = (alat: LBaca["alat"], angka: number, satuan: LBaca["satuan"], benda: string, emoji = ""): LBaca => ({ tipe: "baca", alat, angka, satuan, benda, emoji });
const banding = (benda: [string, string], emoji: [string, string], berat: [number, number], satuan: LBanding["satuan"]): LBanding => ({ tipe: "banding", benda, emoji, berat, satuan });
const acuan = (a: LAcuan["acuan"], n: number): LAcuan => ({ tipe: "acuan", acuan: a, n });
const nol = (alat: LNol["alat"], awal: number): LNol => ({ tipe: "nol", alat, awal });
const alat = (benda: string, emoji: string, a: LAlat["alat"]): LAlat => ({ tipe: "alat", benda, emoji, alat: a });
const salah = (dasar: LBaca | LNol, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
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

/** Empat langkah satu misi, berurut metode: IGIL, Hefting, Benchmark Weights, Zero Check. */
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

/* ------------------------------ Concrete: lantai gudang pakan dengan benda beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Pakan 2: lantai gudang pakan", "Bu Lastri menaruh timbangan di lantai gudang pakan beralas karung goni. Periksa gambarnya dan jawab dengan memilih.", [
    baca("digital", 320, "g", "biji jagung", "\u{1F33D}"),
    banding(["keranjang apel", "keranjang jagung"], ["\u{1F34E}", "\u{1F33D}"], [700, 450], "g"),
    acuan("telur", 7),
    salah(
      nol("jarum", 2),
      "Raka",
      "Jarumnya menunjuk angka dua sebelum karung diletakkan, tetapi langsung kuletakkan karungnya dan kubaca saja.",
      "letakkan benda",
      [
        "Raka benar, benda boleh diletakkan lebih dulu lalu angkanya dikurangi sendiri.",
        "Raka keliru: jarum harus tepat di angka nol sebelum benda diletakkan, jadi setel dulu ke nol.",
        "Raka keliru, timbangan duduk harus diganti dengan timbangan digital.",
      ],
      1,
      "Raka meletakkan karung padahal jarum belum di nol. Jarum harus tepat di angka nol sebelum menimbang, jadi setel dulu ke nol.",
    ),
  ]),
  C(3, "kanvas", "Misi Pakan 3: catatan Salsa", "Salsa mencatat berat pakan di timbangan duduk. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    baca("jarum", 7, "kg", "karung dedak", "\u{1F6CD}\u{FE0F}"),
    banding(["karung wortel", "karung jagung"], ["\u{1F955}", "\u{1F33D}"], [9, 3], "kg"),
    acuan("gula", 8),
    nol("jarum", 3),
  ]),
  C(4, "suara", "Misi Pakan 4: panggilan Pak Joko", "Pak Joko memanggil dari pintu gudang. Jawab dengan suaramu.", [
    baca("jarum", 2, "kg", "kelinci", "\u{1F407}"),
    banding(["wortel", "jagung"], ["\u{1F955}", "\u{1F33D}"], [180, 350], "g"),
    acuan("gula", 12),
    nol("digital", 8),
  ]),
];

/* ------------------------------ Pictorial: papan timbangan dengan layar, jarum, dan batang polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Pakan 5: papan timbangan", "Bima menggambar layar dan jarum timbangan di papan hijau. Periksa gambarnya.", [
    salah(
      baca("digital", 60, "g", "sebutir telur ayam"),
      "Bima",
      "Layarnya menunjukkan enam puluh, dan telur itu ringan, jadi beratnya enam puluh gram.",
      "60 g",
      [
        "Bima keliru, telur itu berat sehingga satuannya harus kilogram.",
        "Bima keliru karena layar harus menunjukkan nol lagi sebelum dibaca.",
        "Bima benar: telur itu ringan, jadi satuannya gram, dan angka layar dibaca apa adanya.",
      ],
      2,
      "Jawaban Bima benar. Telur itu ringan sehingga memakai gram, dan layarnya menunjukkan enam puluh gram.",
      true,
    ),
    banding(["tas pakan", "tas biji"], ["", ""], [8, 3], "kg"),
    acuan("telur", 6),
    nol("jarum", 7),
  ]),
  Pi(6, "kanvas", "Misi Pakan 6: papan Salsa", "Salsa menggambar papan yang lebih besar. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    baca("jarum", 9, "kg", "keranjang kentang"),
    banding(["tas jagung", "tas dedak"], ["", ""], [8, 6], "kg"),
    acuan("gula", 6),
    nol("jarum", 8),
  ]),
  Pi(7, "suara", "Misi Pakan 7: lapor ke Bu Lastri", "Bima melaporkan papan timbangannya kepada Bu Lastri. Sebutkan jawabanmu.", [
    alat("sebiji kentang", "", "digital"),
    banding(["kantong biji", "kantong dedak"], ["", ""], [600, 350], "g"),
    acuan("gula", 15),
    nol("digital", 6),
  ]),
];

/* ------------------------------ Abstract: catatan juru pakan dengan kartu kata dan angka ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Pakan 8: catatan juru pakan", "Catatan juru pakan hanya berisi kata dan angka.", [
    salah(
      baca("jarum", 7, "kg", "karung beras"),
      "Salsa",
      "Jarumnya menunjuk angka tujuh untuk karung beras, jadi beratnya tujuh gram.",
      "7 g",
      [
        "Salsa benar, jarum selalu dibaca dengan satuan gram.",
        "Salsa keliru karena karung beras itu ringan sehingga harus gram.",
        "Salsa keliru: karung beras itu berat, jadi angka tujuh ditulis dengan satuan kilogram.",
      ],
      2,
      "Salsa menulis satuan gram padahal karung beras itu berat. Benda berat memakai kilogram, jadi beratnya tujuh kilogram.",
    ),
    banding(["kantong gula", "kantong tepung"], ["", ""], [640, 905], "g"),
    acuan("gula", 7),
    nol("digital", 7),
  ]),
  A(9, "kanvas", "Misi Pakan 9: tulis di catatan", "Raka meminta kamu menulis jawaban di kanvas.", [
    baca("jarum", 6, "kg", "karung biji"),
    banding(["karung A", "karung B"], ["", ""], [9, 6], "kg"),
    acuan("gula", 9),
    nol("jarum", 7),
  ]),
  A(10, "suara", "Misi Pakan 10: daftar akhir", "Daftar akhir pakan untuk Bu Lastri. Ucapkan jawabannya.", [
    baca("digital", 90, "g", "segenggam kacang"),
    banding(["kandang pertama", "kandang kedua"], ["", ""], [3, 8], "kg"),
    acuan("gula", 20),
    nol("jarum", 2),
  ]),
];

export const POIN_PENTING = [
  "Timbangan adalah alat untuk mengukur berat benda: ada timbangan digital, timbangan duduk berjarum, dan timbangan badan.",
  "Satuan baku berat adalah gram dan kilogram, ditulis g dan kg.",
  "Gram dipakai untuk benda ringan, kilogram dipakai untuk benda berat.",
  "Sebelum menimbang, jarum atau layar harus tepat di angka nol.",
  "Baca angka pada layar atau jarum, lalu tulis beratnya dengan satuan.",
  "Pilih timbangan sesuai bendanya, dan satuannya mengikuti beratnya.",
  "Selisih dua berat didapat dengan mengurangkan berat yang besar dengan berat yang kecil, dan satuannya sama.",
  "Mengangkat dan Merasakan, Berat Acuan, dan Cek Angka Nol membantu menimbang dengan cermat.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace(/\d+/g, (d) => kataBil(Number(d))));

/** Jembatan ke Sub-Bab D. */
export const PENUTUP_C =
  "Raka menepati taruhannya dan menyuapi semua burung beo. Besok Dokter Hana datang membawa timbangan kodok dan bandul. Menurutmu, kalau satu kilogram diisi gram, kira-kira berapa gram?";

export const TEMA_TIMBANG = {
  concrete: { ikon: "\u{1F955}", nama: "Concrete", cara: "Lantai gudang pakan: benda beremoji, karung, keranjang, dan timbangan" },
  pictorial: { ikon: "\u{1F4DF}", nama: "Pictorial", cara: "Papan timbangan: layar, jarum, dan batang polos" },
  abstract: { ikon: "\u{1F4D2}", nama: "Abstract", cara: "Catatan juru pakan: kartu kata dan angka, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_TIMBANG, PICTORIAL as PICTORIAL_TIMBANG, ABSTRACT as ABSTRACT_TIMBANG };
