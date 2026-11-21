/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 2 Sub-Bab E "Papan Pameran Bu Tuti" (desimal perseratusan dan persen), akhir cerita Sanggar Batik Kampung Mekar.
 * Misi lanjutan "Misi Pameran" (nomor misi berlanjut dari Simulasi). Data berbeda dari Story (0,75 dan 75 persen, 0,4 dan 40 persen, 0,6 dan 60 persen, 30, 55, 25, 80, 90 persen)
 * kecuali ruang jawaban yang sempit. Concrete memakai kain dan perlengkapan pameran beremoji di halaman pameran, Pictorial memakai kisi seratus polos di kertas kisi,
 * Abstract memakai kartu kata dan angka di lembar daftar pameran. Jawaban beragam: memilih persen atau desimal, menulis satu angka di kanvas, dan mengucapkan satu kata
 * (persen, koma, seratus, kanan, kiri) atau bilangan pendek. Jawaban benar dihitung dari data.
 * Angka jawaban Tulis di kanvas per tahap: Concrete 4, 9, 5, 2; Pictorial 3, 7, 2, 8; Abstract 2, 8, 7, 1 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-pameran-k4b2e.mjs.
 */
import type { Cara, LJembatan, LKisi, LPerseratus, LSebut, LUbah, Langkah, LangkahSalah, LangkahSoal, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, ucapkan } from "./logika-cpa";

export { MISI_PAMERAN_TEKS } from "./data-sim";

type S3 = [string, string, string];
const ubah = (benda: string, p: number, pil?: S3): LUbah => ({ tipe: "ubah", benda, p, ...(pil ? { pil } : {}) });
const perseratus = (benda: string, p: number, pil?: S3): LPerseratus => ({ tipe: "perseratus", benda, p, ...(pil ? { pil } : {}) });
const kisi = (benda: string, p: number, pil?: S3): LKisi => ({ tipe: "kisi", benda, p, ...(pil ? { pil } : {}) });
const jembatan = (benda: string, p: number, arah: "kanan" | "kiri", pil?: S3): LJembatan => ({ tipe: "jembatan", benda, p, arah, ...(pil ? { pil } : {}) });
const sebut = (benda: string, p: number, kata: LSebut["kata"]): LSebut => ({ tipe: "sebut", benda, p, kata });
const salah = (dasar: LangkahSalah["dasar"], tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: S3, benar: number, betul = false): LangkahSalah => ({
  tipe: "salah",
  dasar,
  tokoh,
  kataTokoh,
  jawabTokoh,
  alasan,
  benar,
  ...(betul ? { betul } : {}),
});

/** Empat langkah satu misi, berurut metode: IGIL, Percent as Hundredths, Hundred Grid, Decimal Percent Bridge. */
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

/* ------------------------------ Concrete: halaman pameran dengan benda batik beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Pameran 2: papan pameran halaman sanggar", "Bu Tuti menggantung kaus batik di papan pameran. Periksa papannya.", [
    salah(
      ubah("kaus", 70, ["7%", "70%", "77%"]),
      "Satria",
      "Nol koma tujuh ditulis tujuh persen, karena angka di belakang koma hanya tujuh.",
      "7%",
      [
        "Satria benar, angka di belakang koma langsung menjadi angka persennya.",
        "Satria keliru: persen berarti per seratus, jadi desimal itu harus ditulis dengan dua angka di belakang koma lebih dulu.",
        "Satria keliru, desimal itu pasti lebih kecil dari satu persen.",
      ],
      1,
    ),
    perseratus("gaun", 35, ["3,5", "0,35", "0,035"]),
    kisi("tas", 48, ["52%", "84%", "48%"]),
    jembatan("pita", 56, "kanan", ["560%", "56%", "5,6%"]),
  ]),
  C(3, "kanvas", "Misi Pameran 3: catatan Laras", "Laras mencatat benda batik yang terjual. Periksa papannya, lalu tulis jawabanmu di kanvas.", [
    ubah("topi", 4),
    perseratus("tas", 9),
    kisi("kaus", 50),
    jembatan("gaun", 20, "kiri"),
  ]),
  C(4, "suara", "Misi Pameran 4: panggilan Pak Hendro", "Pak Hendro memanggil dari pinggir halaman. Jawab dengan suaramu.", [
    sebut("pita", 85, "persen"),
    perseratus("kaus", 12),
    kisi("topi", 27),
    jembatan("lampion", 33, "kanan"),
  ]),
];

/* ------------------------------ Pictorial: kertas kisi dengan diagram polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Pameran 5: kertas kisi seratus", "Genta menggambar kisi seratus di kertas kisi. Periksa gambarnya.", [
    ubah("diagram A", 15, ["150%", "15%", "1,5%"]),
    perseratus("diagram B", 8, ["0,8", "0,08", "8,0"]),
    salah(
      kisi("diagram C", 65, ["56%", "65%", "650%"]),
      "Laras",
      "Enam puluh lima kotak berwarna dari seratus kotak, jadi enam puluh lima persen, karena persen berarti per seratus.",
      "65%",
      [
        "Laras keliru, banyak kotak berwarna harus dibagi dua dulu sebelum menjadi persen.",
        "Laras keliru, persen harus ditulis dengan koma di antara kedua angkanya.",
        "Laras benar: persen berarti per seratus, jadi banyak kotak berwarna dari seratus kotak langsung menjadi persennya.",
      ],
      2,
      true,
    ),
    jembatan("diagram D", 45, "kiri", ["4,5", "0,045", "0,45"]),
  ]),
  Pi(6, "kanvas", "Misi Pameran 6: diagram Genta", "Genta membuat diagram yang lebih lengkap. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    ubah("diagram E", 3),
    perseratus("diagram F", 7),
    kisi("diagram G", 20),
    jembatan("diagram H", 8, "kiri"),
  ]),
  Pi(7, "suara", "Misi Pameran 7: lapor ke Bu Tuti", "Genta melaporkan diagramnya kepada Bu Tuti. Sebutkan jawabanmu.", [
    sebut("diagram I", 52, "koma"),
    perseratus("diagram J", 19),
    kisi("diagram K", 83),
    jembatan("diagram L", 36, "kiri"),
  ]),
];

/* ------------------------------ Abstract: lembar daftar pameran dengan kartu kata dan angka ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Pameran 8: lembar daftar pameran", "Lembar daftar pameran hanya berisi kata dan angka.", [
    ubah("kartu satu", 5, ["50%", "5%", "500%"]),
    perseratus("kartu dua", 62, ["6,2", "0,062", "0,62"]),
    kisi("kartu tiga", 28, ["72%", "28%", "2,8%"]),
    salah(
      jembatan("kartu empat", 18, "kiri", ["18", "0,18", "1,8"]),
      "Satria",
      "Dari persen ke desimal, tanda persen dihilangkan saja, jadi delapan belas persen ditulis delapan belas.",
      "18",
      [
        "Satria benar, tanda persen cukup dihilangkan tanpa menggeser koma.",
        "Satria keliru: setelah tanda persen dihilangkan, koma harus digeser dua tempat ke kiri.",
        "Satria keliru, desimal tidak boleh memakai koma.",
      ],
      1,
    ),
  ]),
  A(9, "kanvas", "Misi Pameran 9: tulis di lembar", "Laras meminta kamu menulis jawaban di kanvas.", [
    ubah("kartu lima", 2),
    perseratus("kartu enam", 8),
    kisi("kartu tujuh", 70),
    jembatan("kartu delapan", 10, "kiri"),
  ]),
  A(10, "suara", "Misi Pameran 10: laporan akhir", "Laporan akhir pameran untuk Bu Wulan. Ucapkan jawabannya.", [
    sebut("kartu sembilan", 66, "seratus"),
    perseratus("kartu sepuluh", 47),
    kisi("kartu sebelas", 91),
    jembatan("kartu dua belas", 14, "kanan"),
  ]),
];

export const POIN_PENTING = [
  "Persen berarti per seratus, jadi 75% sama dengan 75/100.",
  "Desimal perseratus punya dua angka di belakang koma, misalnya 0,75 = 75/100.",
  "Desimal ke persen: geser koma dua tempat ke kanan lalu tulis tanda persen, misalnya 0,75 = 75%.",
  "Persen ke desimal: hilangkan tanda persen lalu geser koma dua tempat ke kiri, misalnya 75% = 0,75.",
  "Nol di ujung belakang koma tidak mengubah besarnya, misalnya 0,6 = 0,60 = 60%.",
  "Kisi seratus: banyak kotak berwarna dari seratus kotak adalah persennya.",
  "Persen Perseratusan, Kisi Seratus, dan Jembatan Persen membantu menulis persen dengan teliti.",
];
/** Poin penting untuk suara (tanpa digit): angka, desimal, dan persen menjadi kata. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p.replace(/ = /g, " sama dengan ")));

/** Perayaan akhir cerita bab (diucapkan setelah Poin Penting): semua tamu dan semua tokoh hadir. */
export const PENUTUP_E =
  "Satria, Laras, Genta, Pak Hendro, Bu Wulan, Pak Joyo, Kak Sekar, Pak Bagas, dan Bu Tuti merayakan akhir bab di Pameran Batik Kampung Mekar. Spanduk terpasang, lampion menyala, balon naik, dan konfeti beterbangan. Terima kasih sudah belajar bersama, sampai jumpa di bab berikutnya!";

export const TEMA_PAMERAN = {
  concrete: { ikon: "\u{1F3EE}", nama: "Concrete", cara: "Halaman pameran: benda batik beremoji, tali lampion, dan papan pameran yang dilihat" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Kertas kisi seratus krem: kisi polos berwarna, kotak yang dihitung, dan panah geser koma" },
  abstract: { ikon: "\u{1F4DC}", nama: "Abstract", cara: "Lembar daftar pameran Bu Tuti: kartu kata dan angka di kertas krem, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_PAMERAN, PICTORIAL as PICTORIAL_PAMERAN, ABSTRACT as ABSTRACT_PAMERAN };
