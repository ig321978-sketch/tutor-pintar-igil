/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 4 Sub-Bab B "Ember Pak Anto" (volume), akhir cerita Kolam Renang Tirta Ceria.
 * Misi lanjutan "Misi Ember" (nomor misi berlanjut dari Simulasi). Data berbeda dari Story (ember dua liter diisi gelas dua ratus lima puluh mililiter, delapan gelas, tiga kali dua kali dua sama dengan dua belas sentimeter kubik)
 * kecuali ruang jawaban yang sempit. Concrete memakai gelas, botol, dan ember beremoji atau berwarna di rak ember, Pictorial memakai gelas, ember, dan lapisan kubus polos di kertas,
 * Abstract memakai kartu kata dan angka di lembar daftar. Jawaban beragam: memilih satuan atau takaran, menulis satu angka di kanvas, dan mengucapkan satu kata
 * (baku, liter, mililiter, kubik) atau bilangan. Jawaban benar dihitung dari data (1 l = 1.000 ml, 1 cm³ = 1 ml, volume = kubus tiap lapisan dikali banyak lapisan).
 * Angka jawaban Tulis di kanvas per tahap: Concrete 3, 6, 8, 5; Pictorial 2, 9, 6, 4; Abstract 3, 7, 9, 8 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-ember-k4b4b.mjs.
 */
import type { Cara, DasarSalah, KataSebut, LGelas, LIsi, LLapisan, LSatuan, LSebut, LTangga, Langkah, LangkahSalah, LangkahSoal, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, ucapkan } from "./logika-cpa";

export { MISI_EMBER_TEKS } from "./data-sim";

type S3 = [string, string, string];
const satuan = (benda: string, jumlah: number, sat: string, pil: S3): LSatuan => ({ tipe: "satuan", benda, jumlah, satuan: sat, pil });
const gelas = (wadah: string, kecil: number, per: number): LGelas => ({ tipe: "gelas", wadah, kecil, per });
const sebut = (kata: KataSebut): LSebut => ({ tipe: "sebut", kata });
const isi = (takar: number, banyak: number, pil?: S3): LIsi => ({ tipe: "isi", takar, gelas: banyak, ...(pil ? { pil } : {}) });
const lapisan = (kolom: number, baris: number, lapis: number, pil?: S3): LLapisan => ({ tipe: "lapisan", kolom, baris, lapis, ...(pil ? { pil } : {}) });
const tangga = (jenis: "liter" | "kubik", n: number, arah: "turun" | "naik", pil?: S3): LTangga => ({ tipe: "tangga", jenis, n, arah, ...(pil ? { pil } : {}) });
const salah = (dasar: DasarSalah, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: S3, benar: number, betul = false): LangkahSalah => ({
  tipe: "salah",
  dasar,
  tokoh,
  kataTokoh,
  jawabTokoh,
  alasan,
  benar,
  ...(betul ? { betul } : {}),
});

/** Empat langkah satu misi, berurut metode: IGIL, Fill and Pour, Layer Cubes, Liter Ladder. */
const satuMisi =
  (rupa: Rupa) =>
  (nomor: number, cara: Cara, judul: string, cerita: string, isiMisi: [Langkah, Langkah, Langkah, Langkah]): SoalMisi => ({
    nomor,
    judul,
    cerita,
    cara,
    langkah: isiMisi.map((l, i): LangkahSoal => {
      const s = instruksi(l, rupa, cara, URUT_METODE[i]);
      return { metode: URUT_METODE[i], cara, judul: s, suara: s, langkah: l };
    }),
  });

/* ------------------------------ Concrete: rak ember di tepi kolam dengan benda beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Ember 2: rak ember", "Pak Anto menata rak ember dan gelas takar di tepi kolam. Periksa raknya.", [
    satuan("sendok", 5, "ml", ["l", "cm²", "ml"]),
    isi(200, 6, ["206 ml", "1.200 ml", "1.000 ml"]),
    lapisan(2, 2, 4, ["8 cm³", "16 cm³", "4 cm³"]),
    salah(
      tangga("liter", 4, "turun", ["40 ml", "4.000 ml", "400 ml"]),
      "Satria",
      "Satu liter itu seratus mililiter, jadi empat liter sama dengan empat ratus mililiter.",
      "400 ml",
      [
        "Satria benar, satu liter memang sama dengan seratus mililiter.",
        "Satria keliru: satu liter sama dengan seribu mililiter, jadi dari liter ke mililiter bilangannya dikali seribu.",
        "Satria keliru: dari liter ke mililiter bilangannya harus dibagi, bukan dikali.",
      ],
      1,
    ),
  ]),
  C(3, "kanvas", "Misi Ember 3: catatan Laras", "Laras mencatat takaran di rak ember. Periksa raknya, lalu tulis jawabanmu di kanvas.", [
    gelas("bak", 6, 2),
    isi(500, 6),
    lapisan(2, 2, 2),
    tangga("liter", 5, "naik"),
  ]),
  C(4, "suara", "Misi Ember 4: panggilan Pak Anto", "Pak Anto memanggil dari tepi kolam. Jawab dengan suaramu.", [
    sebut("baku"),
    isi(300, 3),
    lapisan(3, 4, 3),
    tangga("liter", 7, "turun"),
  ]),
];

/* ------------------------------ Pictorial: kertas biru muda dengan gelas ukur, ember, dan lapisan kubus polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Ember 5: kertas gelas ukur", "Genta menggambar gelas ukur dan lapisan kubus di kertas. Periksa gambarnya.", [
    satuan("ember", 4, "l", ["ml", "l", "cm²"]),
    isi(150, 5, ["155 ml", "600 ml", "750 ml"]),
    lapisan(5, 3, 2, ["10 cm³", "30 cm³", "15 cm³"]),
    salah(
      tangga("liter", 6, "turun", ["60 ml", "6.000 ml", "600 ml"]),
      "Laras",
      "Satu liter sama dengan seribu mililiter, jadi enam liter dikali seribu sama dengan enam ribu mililiter.",
      "6.000 ml",
      [
        "Laras keliru, dari liter ke mililiter bilangannya harus dibagi seribu.",
        "Laras keliru, satuan liter dan mililiter sama besar.",
        "Laras benar: tiap liter berisi seribu mililiter, jadi banyak liter dikali seribu.",
      ],
      2,
      true,
    ),
  ]),
  Pi(6, "kanvas", "Misi Ember 6: diagram Genta", "Genta membuat diagram yang lebih lengkap. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    gelas("ember", 8, 4),
    isi(100, 9),
    lapisan(3, 1, 2),
    tangga("liter", 4, "naik"),
  ]),
  Pi(7, "suara", "Misi Ember 7: lapor ke Pak Anto", "Genta melaporkan diagramnya kepada Pak Anto. Sebutkan jawabanmu.", [
    sebut("mililiter"),
    isi(400, 4),
    lapisan(5, 4, 2),
    tangga("kubik", 18, "turun"),
  ]),
];

/* ------------------------------ Abstract: lembar daftar dengan kartu kata dan angka ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Ember 8: lembar daftar", "Lembar daftar tepi kolam hanya berisi kata dan angka.", [
    satuan("botol", 600, "ml", ["cm²", "l", "ml"]),
    isi(500, 3, ["1.000 ml", "503 ml", "1.500 ml"]),
    salah(
      lapisan(2, 4, 6, ["8 cm³", "48 cm³", "12 cm³"]),
      "Satria",
      "Ada dua kubus, empat baris, dan enam lapisan, jadi semuanya tinggal ditambah.",
      "12 cm³",
      [
        "Satria benar, ukuran dari tiap bagian boleh dijumlah begitu saja.",
        "Satria keliru: kubus tiap lapisan harus dikali banyak lapisan, bukan dijumlah.",
        "Satria keliru, volume hanya dihitung dari satu lapisan.",
      ],
      1,
    ),
    tangga("kubik", 35, "turun", ["350 ml", "35 ml", "3.500 ml"]),
  ]),
  A(9, "kanvas", "Misi Ember 9: tulis di lembar", "Laras meminta kamu menulis jawaban di kanvas.", [
    gelas("bak", 12, 4),
    isi(300, 7),
    lapisan(3, 1, 3),
    tangga("liter", 8, "naik"),
  ]),
  A(10, "suara", "Misi Ember 10: laporan akhir", "Laporan akhir ember Pak Anto untuk Bu Sinta. Ucapkan jawabannya.", [
    sebut("kubik"),
    isi(500, 5),
    lapisan(6, 3, 3),
    tangga("liter", 9, "turun"),
  ]),
];

export const POIN_PENTING = [
  "Volume adalah banyak ruang yang diisi air, diukur dengan satuan baku.",
  "Gelas atau botol yang berbeda memberi banyak yang berbeda, jadi volume memakai satuan baku.",
  "1 l = 1.000 ml: dari liter ke mililiter dikali 1.000, dan dari mililiter ke liter dibagi 1.000.",
  "1 cm³ = 1 ml: sentimeter kubik dan mililiter sama besar.",
  "Volume balok dihitung dari kubus tiap lapisan dikali banyak lapisan.",
  "Contoh: 3 × 2 × 2 = 12 cm³ = 12 ml.",
  "Isi dan Tuang, Susun Lapisan, dan Tangga Liter membantu mengukur volume dengan teliti, dan satuan selalu ditulis di belakang bilangan.",
];
/** Poin penting untuk suara (tanpa digit): angka dan tanda menjadi kata. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p));

/** Perayaan akhir cerita bab (diucapkan setelah Poin Penting): kedua tamu dan semua tokoh hadir. */
export const PENUTUP_B =
  "Satria, Laras, Genta, Pak Hendro, Bu Sinta, dan Pak Anto merayakan akhir bab di Pesta Renang Tirta Ceria. Spanduk terpasang, pelampung berderet, balon naik, dan konfeti beterbangan. Terima kasih sudah belajar bersama, sampai jumpa di bab berikutnya!";

export const TEMA_EMBER = {
  concrete: { ikon: "\u{1F95B}", nama: "Concrete", cara: "Rak ember di tepi kolam: gelas, botol, dan ember berwarna yang dilihat dan dituang" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Kertas biru muda: gelas ukur, ember, dan lapisan kubus polos yang digambar" },
  abstract: { ikon: "\u{1F4DC}", nama: "Abstract", cara: "Lembar daftar Pak Anto: kartu kata dan angka di kertas krem, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_EMBER, PICTORIAL as PICTORIAL_EMBER, ABSTRACT as ABSTRACT_EMBER };
