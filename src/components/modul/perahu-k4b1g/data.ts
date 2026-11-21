/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 1 Sub-Bab G "Baris Perahu Bu Marni" (perkalian sampai seratus: penjumlahan berulang, urai puluhan dan satuan, kali bersusun pendek),
 * cerita Penginapan Pulau Karang Indah. Misi lanjutan "Misi Perahu" (nomor misi berlanjut dari Simulasi). Data berbeda dari Story (12 x 5, 14 x 4, 15 x 6, 11 x 5, 24 x 2, 13 x 3, hasil 52, 55, 56, 60, 90)
 * kecuali ruang jawaban yang sempit. Concrete memakai perahu dan benda pulau beremoji di dermaga kayu, Pictorial memakai perahu dan kotak polos di kertas kotak biru muda,
 * Abstract memakai kartu kata dan angka di lembar jadwal perahu. Jawaban beragam: memilih hasil, penjumlahan berulang, uraian, atau cara menulis dan menyimpan, menulis satu angka di kanvas,
 * dan mengucapkan bilangan pendek atau satu kata (simpan). Jawaban benar dihitung dari data.
 * Kali susun dicampur sesuai acuan kurikulum: tanpa menyimpan (hasil kali satuan kurang dari sepuluh: Concrete 11 x 3 di kanvas, Pictorial 33 x 2 di suara, Abstract 31 x 3 di klik) dan dengan menyimpan (selebihnya).
 * Pada susun tanpa simpanan, jawaban kanvas adalah angka satuan yang ditulis (bukan simpanan nol, karena kanvas satu angka 1 sampai 9).
 * Angka jawaban Tulis di kanvas per tahap: Concrete 9, 6, 8, 3; Pictorial 7, 3, 6, 2; Abstract 8, 7, 3, 4 (tidak kembar dalam satu tahap; ruang jawaban satu angka sempit, jadi sebagian sama dengan angka Story antartahap).
 * Diuji: scripts/uji-perahu-k4b1g.mjs.
 */
import type { Cara, Langkah, LangkahSalah, LangkahSoal, LKali, LSusun, LTambah, LUrai, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, ucapkan } from "./logika-cpa";

export { MISI_PERAHU_TEKS } from "./data-sim";

const kali = (benda: string, a: number, b: number): LKali => ({ tipe: "kali", benda, a, b });
const tambah = (benda: string, a: number, b: number): LTambah => ({ tipe: "tambah", benda, a, b });
const urai = (benda: string, a: number, b: number): LUrai => ({ tipe: "urai", benda, a, b });
const susun = (benda: string, a: number, b: number, kata = false): LSusun => ({ tipe: "susun", benda, a, b, ...(kata ? { kata } : {}) });
const salah = (dasar: LKali | LUrai | LSusun, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
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

/** Empat langkah satu misi, berurut metode: IGIL, Repeated Addition, Split and Multiply, Column Multiply. */
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

/* ------------------------------ Concrete: dermaga kayu dengan perahu dan benda pulau beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Perahu 2: dermaga kayu", "Bu Marni menata perahu dan barang di dermaga kayu. Periksa barisnya.", [
    salah(
      kali("perahu", 15, 3),
      "Satria",
      "Sepuluh kali tiga tiga puluh, ditambah lima, jadi tiga puluh lima.",
      "35",
      [
        "Satria benar, angka lima hanya satuan jadi tidak perlu dikalikan.",
        "Satria keliru: angka lima juga harus dikalikan tiga, yaitu lima belas, lalu dijumlahkan dengan tiga puluh. Hasilnya empat puluh lima.",
        "Satria keliru, tiga puluh dan lima harus dikurangkan.",
      ],
      1,
      "Angka satuan juga harus dikalikan. Lima kali tiga lima belas, ditambah tiga puluh sama dengan empat puluh lima, bukan tiga puluh lima.",
    ),
    tambah("layar", 21, 4),
    urai("kelapa", 32, 3),
    susun("kerang", 17, 3),
  ]),
  C(3, "kanvas", "Misi Perahu 3: catatan Laras", "Laras mencatat penumpang dan barang di dermaga. Periksa barisnya, lalu tulis jawabanmu di kanvas.", [
    kali("nanas", 23, 4),
    tambah("semangka", 16, 6),
    urai("koper", 22, 4),
    susun("lentera", 11, 3),
  ]),
  C(4, "suara", "Misi Perahu 4: panggilan Pak Hendro", "Pak Hendro memanggil dari ujung dermaga. Jawab dengan suaramu.", [
    kali("perahu", 18, 4),
    tambah("layar", 27, 3),
    urai("kelapa", 43, 2),
    susun("kerang", 38, 2, true),
  ]),
];

/* ------------------------------ Pictorial: kertas kotak biru muda dengan perahu dan kotak polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Perahu 5: kertas kotak", "Genta menggambar baris perahu di kertas kotak biru muda. Periksa gambarnya.", [
    kali("baris A", 19, 3),
    tambah("baris B", 31, 3),
    urai("baris C", 42, 2),
    salah(
      susun("baris D", 26, 3),
      "Laras",
      "Enam kali tiga delapan belas, tulis delapan dan simpan satu.",
      "tulis 8, simpan 1",
      [
        "Laras keliru, delapan belas seharusnya ditulis semuanya.",
        "Laras keliru, yang disimpan seharusnya delapan.",
        "Laras benar: delapan belas terdiri dari satu puluhan dan delapan satuan, jadi delapan ditulis dan satu disimpan.",
      ],
      2,
      "Jawaban Laras tepat: delapan belas ditulis delapan dan disimpan satu.",
      true,
    ),
  ]),
  Pi(6, "kanvas", "Misi Perahu 6: gambar Genta", "Genta membuat gambar yang lebih lengkap. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    kali("baris E", 25, 3),
    tambah("baris F", 21, 3),
    urai("baris G", 23, 2),
    susun("baris H", 29, 3),
  ]),
  Pi(7, "suara", "Misi Perahu 7: lapor ke Bu Marni", "Genta melaporkan gambarnya kepada Bu Marni. Sebutkan jawabanmu.", [
    kali("baris I", 34, 2),
    tambah("baris J", 24, 3),
    urai("baris K", 27, 2),
    susun("baris L", 33, 2),
  ]),
];

/* ------------------------------ Abstract: lembar jadwal perahu dengan kartu kata dan angka ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Perahu 8: lembar jadwal", "Lembar jadwal perahu hanya berisi kata dan angka.", [
    kali("kartu satu", 22, 3),
    tambah("kartu dua", 19, 4),
    salah(
      urai("kartu tiga", 37, 2),
      "Satria",
      "Tiga puluh kali dua enam puluh, ditambah tujuh, jadi enam puluh tujuh.",
      "60 + 7",
      [
        "Satria benar, tujuh adalah satuan sehingga cukup ditambahkan.",
        "Satria keliru, enam puluh harus dibagi dua.",
        "Satria keliru: tujuh juga harus dikalikan dua, yaitu empat belas, lalu dijumlahkan dengan enam puluh. Hasilnya tujuh puluh empat.",
      ],
      2,
      "Satuan juga dikalikan. Tujuh kali dua empat belas, jadi enam puluh ditambah empat belas, bukan enam puluh ditambah tujuh.",
    ),
    susun("kartu empat", 31, 3),
  ]),
  A(9, "kanvas", "Misi Perahu 9: tulis di lembar", "Genta meminta kamu menulis jawaban di kanvas.", [
    kali("kartu lima", 44, 2),
    tambah("kartu enam", 13, 7),
    urai("kartu tujuh", 31, 3),
    susun("kartu delapan", 19, 5),
  ]),
  A(10, "suara", "Misi Perahu 10: laporan akhir", "Laporan akhir perahu untuk Bu Marni. Ucapkan jawabannya.", [
    kali("kartu sembilan", 23, 3),
    tambah("kartu sepuluh", 33, 3),
    urai("kartu sebelas", 41, 2),
    susun("kartu dua belas", 36, 2),
  ]),
];

export const POIN_PENTING = [
  "Perkalian adalah penjumlahan berulang, misalnya 16 × 3 berarti 16 + 16 + 16.",
  "Cara urai: uraikan bilangan menjadi puluhan dan satuan, kalikan keduanya, lalu jumlahkan hasilnya.",
  "Jangan lupa mengalikan bagian satuan. Bilangan 15 × 3 bukan 10 × 3 ditambah 5.",
  "Kali susun: kalikan satuan dulu, tulis angka satuannya, dan simpan angka puluhannya.",
  "Simpanan ditambahkan pada hasil kali puluhan. Kalau hasil kali satuan kurang dari 10, tidak ada simpanan, misalnya 12 × 4 hasilnya 48.",
  "Hasil perkalian dua angka dengan satu angka bisa diperiksa dengan cara lain.",
  "Tambah Berulang, Urai Lalu Kali, dan Kali Susun membantu mengalikan dengan teliti.",
  "Berikutnya, tamu dibagi rata ke kamar. Itu pembagian, kebalikan dari perkalian.",
];
/** Poin penting untuk suara (tanpa digit): angka menjadi kata. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p));

/** Jembatan ke Sub-Bab H (diucapkan setelah Poin Penting). */
export const JEMBATAN_G =
  "Semua perahu sudah penuh, dan Bu Marni berterima kasih. Tiba-tiba Bu Ratna datang membawa daftar tamu yang harus dibagi ke kamar. Bagaimana cara membagi tamu sama banyak? Kita pelajari di Sub-Bab berikutnya.";

export const TEMA_PERAHU = {
  concrete: { ikon: "\u{1F6F6}", nama: "Concrete", cara: "Dermaga kayu: perahu wisata, kelapa, kerang, dan benda pulau beremoji berderet di papan dermaga" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Kertas kotak biru muda: perahu dan kotak polos, garis loncat, dan susunan bersusun" },
  abstract: { ikon: "\u{1F4CB}", nama: "Abstract", cara: "Lembar jadwal perahu: kartu kata dan angka di kertas krem, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_PERAHU, PICTORIAL as PICTORIAL_PERAHU, ABSTRACT as ABSTRACT_PERAHU };
