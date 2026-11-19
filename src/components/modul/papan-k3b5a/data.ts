/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 5 Sub-Bab A "Catatan Pak Hasan" (mengurutkan dan membandingkan data: urutan, data terkecil dan terbesar, jangkauan, turus dan banyak),
 * awal cerita Bengkel Sepeda Pak Hasan. Misi lanjutan "Misi Catatan" (nomor misi berlanjut dari Simulasi). Data berbeda dari Story (enam hari 6, 9, 3, 7, 5, 8; jangkauan 6; turus delapan dan tujuh),
 * kecuali seed Cari kesalahan dari alur (data delapan, dua, lima). Concrete memakai benda bengkel sepeda beremoji di etalase berpapan harga, Pictorial memakai diagram polos (kartu bilangan, garis urutan, turus) di papan tulis berkapur,
 * Abstract memakai kartu kata dan angka di daftar catatan Pak Hasan. Jawaban beragam: memilih urutan atau bilangan, menulis satu angka di kanvas, dan mengucapkan satu kata (terkecil, terbesar, sama, berbeda) atau bilangan pendek.
 * Jawaban benar dihitung dari data. Angka jawaban Tulis di kanvas per tahap: Concrete 6, 5, 7, 2; Pictorial 9, 6, 7, 3; Abstract 8, 6, 5, 2 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-papan-k3b5a.mjs.
 */
import type { Cara, Langkah, LangkahSalah, LangkahSoal, LCek, LGaris, LJangkau, LTurus, LUjung, LUrut, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, ucapkan } from "./logika-cpa";

export { MISI_PAPAN_TEKS } from "./data-sim";

const urut = (benda: string, data: number[], arah: "naik" | "turun", ke: number): LUrut => ({ tipe: "urut", benda, data, arah, ke });
const ujung = (benda: string, data: number[], cari: "kecil" | "besar"): LUjung => ({ tipe: "ujung", benda, data, cari });
const jangkau = (benda: string, data: number[]): LJangkau => ({ tipe: "jangkau", benda, data });
const garis = (benda: string, data: number[], u: "kiri" | "kanan"): LGaris => ({ tipe: "garis", benda, data, ujung: u });
const cek = (benda: string, kecil: number, besar: number, klaim: number): LCek => ({ tipe: "cek", benda, kecil, besar, klaim });
const turus = (benda: string, banyak: number): LTurus => ({ tipe: "turus", benda, banyak });
const salah = (dasar: LUjung | LJangkau | LTurus, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
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

/** Empat langkah satu misi, berurut metode: IGIL, Number Order Line, Range Check, Tally Count. */
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

/* ------------------------------ Concrete: etalase bengkel dengan rak kayu dan papan harga ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Catatan 2: etalase bengkel", "Pak Hasan menata benda di rak kayu etalase bengkel. Periksa gambarnya.", [
    salah(
      ujung("baut", [7, 4, 9, 5, 8, 6], "kecil"),
      "Raka",
      "Data pertama yang ditulis, yaitu tujuh, pasti data terkecil, jadi aku tidak perlu mengurutkan.",
      "7",
      [
        "Raka benar, data yang ditulis pertama selalu data terkecil.",
        "Raka keliru: data terkecil baru ketahuan setelah data diurutkan atau semuanya dibandingkan, dan data yang ditulis pertama belum tentu paling kecil.",
        "Raka keliru, data terkecil adalah data yang ditulis paling akhir.",
      ],
      1,
      "Data yang ditulis pertama belum tentu data terkecil. Urutkan dulu dari yang terkecil, baru lihat ujung kirinya.",
    ),
    garis("lampu", [2, 5, 7, 3, 6], "kanan"),
    cek("rantai", 3, 8, 6),
    turus("baut", 12),
  ]),
  C(3, "kanvas", "Misi Catatan 3: papan harga", "Salsa mencatat banyak benda di papan harga. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    jangkau("apel", [5, 2, 8, 4, 7]),
    garis("lampu", [2, 5, 3, 7], "kiri"),
    cek("rantai", 2, 9, 7),
    turus("baut", 13),
  ]),
  C(4, "suara", "Misi Catatan 4: panggilan Pak Joko", "Pak Joko memanggil dari depan bengkel. Jawab dengan suaramu.", [
    urut("bel", [6, 3, 8, 5, 2], "naik", 2),
    garis("helm", [3, 7, 4, 8], "kiri"),
    cek("pita", 4, 9, 6),
    turus("sepeda", 11),
  ]),
];

/* ------------------------------ Pictorial: papan tulis berkapur dengan kartu bilangan, garis urutan, dan turus ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Catatan 5: papan tulis", "Bima menyalin catatan ke papan tulis hijau tua. Periksa gambarnya.", [
    salah(
      jangkau("catatan", [8, 2, 5]),
      "Bima",
      "Data delapan, dua, dan lima punya jangkauan enam, karena delapan dikurangi dua.",
      "6",
      [
        "Bima benar: data terbesar delapan dikurangi data terkecil dua adalah jangkauan data itu.",
        "Bima keliru, jangkauan harus ditambah, yaitu data terbesar ditambah data terkecil.",
        "Bima keliru, jangkauan adalah data terbesar saja.",
      ],
      0,
      "Data terbesar dikurangi data terkecil memang jangkauan, jadi jawaban Bima benar.",
      true,
    ),
    garis("catatan", [1, 3, 6, 8], "kiri"),
    cek("catatan", 2, 7, 4),
    salah(
      turus("sepeda", 12),
      "Raka",
      "Satu bundel lima punya enam garis, jadi dua bundel dan dua garis sama dengan empat belas.",
      "14",
      [
        "Raka benar, coretan miring dihitung sebagai garis keenam.",
        "Raka keliru: coretan miring adalah garis kelima, jadi satu bundel hanya berisi lima garis.",
        "Raka keliru, satu bundel lima hanya berisi empat garis.",
      ],
      1,
      "Coretan miring adalah garis kelima, bukan garis keenam. Satu bundel hanya berisi lima garis.",
    ),
  ]),
  Pi(6, "kanvas", "Misi Catatan 6: kapur Salsa", "Salsa menggambar catatan yang lebih besar. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    ujung("catatan", [4, 9, 2, 6, 7], "besar"),
    garis("catatan", [2, 5, 3, 8], "kiri"),
    cek("catatan", 1, 8, 6),
    turus("sepeda", 17),
  ]),
  Pi(7, "suara", "Misi Catatan 7: lapor ke Pak Joko", "Bima melaporkan catatannya kepada Pak Joko. Sebutkan jawabanmu.", [
    urut("catatan", [9, 4, 7, 2, 6], "turun", 3),
    garis("catatan", [2, 6, 4, 9], "kanan"),
    cek("catatan", 2, 8, 6),
    turus("sepeda", 16),
  ]),
];

/* ------------------------------ Abstract: daftar catatan Pak Hasan dengan kartu kata dan angka ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Catatan 8: daftar catatan", "Daftar catatan Pak Hasan hanya berisi kata dan angka.", [
    salah(
      jangkau("catatan", [6, 2, 9, 5, 4]),
      "Salsa",
      "Jangkauannya sebelas, karena data terbesar sembilan ditambah data terkecil dua.",
      "11",
      [
        "Salsa benar, jangkauan didapat dengan menjumlahkan data terbesar dan data terkecil.",
        "Salsa keliru: jangkauan adalah selisih, jadi data terbesar dikurangi data terkecil, bukan ditambah.",
        "Salsa keliru, jangkauan adalah data terbesar saja.",
      ],
      1,
      "Jangkauan adalah selisih, jadi data terbesar dikurangi data terkecil, bukan ditambah.",
    ),
    garis("catatan", [5, 2, 8, 6], "kiri"),
    cek("catatan", 4, 9, 5),
    turus("catatan", 18),
  ]),
  A(9, "kanvas", "Misi Catatan 9: tulis di daftar", "Raka meminta kamu menulis jawaban di kanvas.", [
    urut("catatan", [3, 8, 5, 9, 4], "naik", 4),
    garis("catatan", [1, 4, 7, 3], "kanan"),
    cek("catatan", 3, 8, 4),
    turus("catatan", 14),
  ]),
  A(10, "suara", "Misi Catatan 10: daftar akhir", "Daftar akhir catatan untuk Pak Hasan. Ucapkan jawabannya.", [
    ujung("catatan", [7, 3, 9, 5, 8], "kecil"),
    garis("catatan", [2, 5, 9, 6], "kiri"),
    cek("catatan", 2, 8, 7),
    turus("catatan", 19),
  ]),
];

export const POIN_PENTING = [
  "Data adalah kumpulan bilangan hasil pencatatan, misalnya banyak sepeda yang datang tiap hari.",
  "Data diurutkan dari yang terkecil ke yang terbesar, sehingga data terkecil dan data terbesar ada di kedua ujung.",
  "Jangkauan = data terbesar − data terkecil, jadi jangkauan adalah selisih, bukan jumlah.",
  "Periksa jangkauan dengan menambahkannya kembali: data terkecil + jangkauan harus sama dengan data terbesar.",
  "Turus: satu garis untuk satu data, dan garis kelima mencoret miring sehingga lima garis menjadi satu bundel.",
  "Banyak data didapat dari bundel lima ditambah garis sisanya, misalnya 1 bundel dan 3 garis sama dengan 8.",
  "Garis Urutan, Cek Jangkauan, dan Hitung Turus membantu membaca data tanpa keliru.",
];
/** Poin penting untuk suara (tanpa digit): angka menjadi kata dan lambang dibaca lengkap. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p));

/** Jembatan ke Sub-Bab B. */
export const PENUTUP_A =
  "Raka memompa semua ban sambil menggerutu. Besok Bu Wulan, ketua klub sepeda, datang membawa papan tabel. Menurutmu, bagaimana cara menyusun turus dan banyaknya supaya rapi di satu tempat?";

export const TEMA_PAPAN = {
  concrete: { ikon: "\u{1F6B2}", nama: "Concrete", cara: "Etalase bengkel: benda bengkel sepeda beremoji di rak kayu berpapan harga" },
  pictorial: { ikon: "\u{1F4CA}", nama: "Pictorial", cara: "Papan tulis berkapur: kartu bilangan, garis urutan, dan turus polos" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Daftar catatan Pak Hasan: kartu kata dan angka di kertas bergaris, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_PAPAN, PICTORIAL as PICTORIAL_PAPAN, ABSTRACT as ABSTRACT_PAPAN };
