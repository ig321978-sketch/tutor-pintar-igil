/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 4 Sub-Bab B "Sudut Kak Anton" (sudut pada bidang datar), tengah cerita Festival Layang-layang Kampung.
 * Misi lanjutan "Misi Sudut" (nomor misi berlanjut dari Simulasi). Besar sudut berbeda dari Story (90, 50, 130, 120, 300, 60) kecuali sudut acuan siku-siku dan lurus dan seed Cari kesalahan.
 * Concrete memakai benda layang-layang dan festival beremoji di tanah lapang berumput, Pictorial memakai kaki sudut dan busur polos di papan busur kayu terang,
 * Abstract memakai kartu kata, angka, dan lambang derajat pada lembar Kak Anton. Jawaban beragam: memilih besar sudut, jenis sudut, atau kegiatan, menulis satu angka di kanvas,
 * dan mengucapkan satu kata (busur, derajat, lancip, siku-siku, tumpul, lurus, refleks) atau bilangan pendek. Kunci dihitung dari data.
 * Angka jawaban Tulis di kanvas per tahap: Concrete 4, 2, 5, 3; Pictorial 3, 4, 6, 1; Abstract 2, 3, 5, 4 (tidak kembar dalam satu tahap; ruang jawaban satu angka sempit,
 * jadi sebagian sama dengan angka Story seperti 2, 3, dan 6 yang berulang antartahap).
 * Diuji: scripts/uji-sudut-k3b4b.mjs.
 */
import type { Cara, Langkah, LangkahSalah, LangkahSoal, LBaca, LCacah, LHitung, LJenis, LLangkah, LSebut, Rupa, Sisi, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, kataBil } from "./logika-cpa";
import type { JenisSudut } from "./data-sim";

export { MISI_SUDUT_TEKS } from "./data-sim";

const baca = (benda: string, deg: number, sisi: Sisi = "kanan"): LBaca => ({ tipe: "baca", benda, deg, sisi });
const lipat = (benda: string, deg: number): LJenis => ({ tipe: "jenis", benda, deg, acuan: false });
const acuan = (benda: string, deg: number): LJenis => ({ tipe: "jenis", benda, deg, acuan: true });
const hitung = (benda: string, deg: number): LHitung => ({ tipe: "hitung", benda, deg });
const cacah = (benda: string, daftar: number[], jenis: JenisSudut): LCacah => ({ tipe: "cacah", benda, daftar, jenis });
const langkah = (benda: string, nomor: number): LLangkah => ({ tipe: "langkah", benda, nomor });
const sebut = (benda: string, tanya: "alat" | "satuan"): LSebut => ({ tipe: "sebut", benda, tanya });
const salah = (dasar: LBaca | LJenis, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
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

/** Empat langkah satu misi, berurut metode: IGIL, Paper Folding, Benchmark Angles, Protractor Walk. */
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

/* ------------------------------ Concrete: tanah lapang berumput dengan benda layang-layang beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Sudut 2: tali di tanah lapang", "Kak Anton menaruh tali dan bilah di tanah lapang berumput. Periksa sudutnya.", [
    salah(
      baca("tali layang-layang", 140, "kiri"),
      "Raka",
      "Kaki pertama ada di nol sisi kiri, kaki kedua menunjuk empat puluh derajat. Jadi sudut tali ini tumpul, besarnya empat puluh derajat.",
      "40°",
      [
        "Raka benar, sudut tumpul memang boleh sebesar empat puluh derajat.",
        "Raka keliru: kaki pertama di sisi kiri, jadi skala yang dibaca terbalik. Sudut tumpul lebih dari sembilan puluh derajat, jadi bacaan yang benar seratus empat puluh derajat.",
        "Raka keliru, sudut tumpul harus dibaca dari skala yang dimulai dari seratus delapan puluh.",
      ],
      1,
      "Kaki pertama ada di nol pada sisi kiri, jadi skala yang dibaca adalah skala dalam. Sudut tumpul pasti lebih dari sembilan puluh derajat, jadi besarnya seratus empat puluh derajat.",
    ),
    lipat("bilah bambu", 110),
    acuan("bendera", 240),
    langkah("penggaris segitiga", 3),
  ]),
  C(3, "kanvas", "Misi Sudut 3: catatan Salsa", "Salsa mencatat sudut yang ia temukan di lapangan. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    hitung("balon", 360),
    cacah("layang-layang", [90, 30, 110, 90, 70, 150, 40], "siku-siku"),
    cacah("pita", [35, 160, 20, 40, 110, 70, 25, 140], "lancip"),
    langkah("gunting", 3),
  ]),
  C(4, "suara", "Misi Sudut 4: panggilan Pak Joko", "Pak Joko memanggil dari tepi sawah. Jawab dengan suaramu.", [sebut("penggaris segitiga", "alat"), lipat("kertas lipat", 35), acuan("bilah bambu", 180), baca("bendera", 70)]),
];

/* ------------------------------ Pictorial: papan busur kayu terang dengan kaki sudut dan busur polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Sudut 5: papan busur", "Bima menggambar sudut di papan busur kayu yang terang. Periksa gambarnya.", [
    salah(
      lipat("sudut A", 90),
      "Bima",
      "Sudut ini pas dengan pojok kertas lipat, jadi sudut siku-siku.",
      "siku-siku",
      [
        "Bima keliru, sudut yang pas dengan pojok kertas pasti sudut lurus.",
        "Bima benar: pas dengan pojok kertas lipat berarti besarnya sembilan puluh derajat, yaitu sudut siku-siku.",
        "Bima keliru karena sudut siku-siku harus lebih kecil daripada pojok kertas.",
      ],
      1,
      "Jawaban Bima benar. Sudut yang pas dengan pojok kertas lipat adalah sudut siku-siku, besarnya sembilan puluh derajat.",
      true,
    ),
    lipat("sudut B", 40),
    acuan("sudut C", 200),
    langkah("busur", 2),
  ]),
  Pi(6, "kanvas", "Misi Sudut 6: papan Salsa", "Salsa menggambar lebih banyak sudut di papan busur. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    hitung("sudut D", 270),
    cacah("kumpulan sudut", [90, 40, 90, 150, 90, 110, 90, 30], "siku-siku"),
    cacah("deret sudut", [115, 30, 150, 170, 110, 70, 160, 140], "tumpul"),
    langkah("busur", 1),
  ]),
  Pi(7, "suara", "Misi Sudut 7: lapor ke Pak Joko", "Bima melaporkan papan busurnya kepada Pak Joko. Sebutkan jawabanmu.", [sebut("busur", "satuan"), lipat("sudut E", 150), acuan("sudut F", 160), baca("sudut G", 110, "kiri")]),
];

/* ------------------------------ Abstract: lembar Kak Anton dengan kartu kata, angka, dan lambang ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Sudut 8: lembar Kak Anton", "Lembar Kak Anton hanya berisi kata, angka, dan lambang.", [
    salah(
      baca("sudut lurus", 180, "kanan"),
      "Raka",
      "Kaki kedua tepat di ujung busur, jadi sudut lurus besarnya sembilan puluh derajat.",
      "90°",
      [
        "Raka benar, sudut lurus sama besar dengan pojok kertas.",
        "Raka keliru: kaki kedua di ujung busur, jadi sudut lurus besarnya seratus delapan puluh derajat, sama dengan dua sudut siku-siku.",
        "Raka keliru, sudut lurus harus dibaca dari skala dalam saja.",
      ],
      1,
      "Sudut lurus tepat seratus delapan puluh derajat, sama dengan dua sudut siku-siku. Kaki kedua di ujung busur menunjuk seratus delapan puluh, bukan sembilan puluh.",
    ),
    lipat("sudut H", 25),
    acuan("sudut J", 150),
    langkah("busur", 4),
  ]),
  A(9, "kanvas", "Misi Sudut 9: tulis di lembar", "Raka meminta kamu menulis jawaban di kanvas.", [
    hitung("sudut K", 180),
    cacah("kumpulan sudut", [30, 90, 110, 90, 70, 90, 150], "siku-siku"),
    cacah("deret sudut", [20, 150, 65, 35, 160, 40, 30], "lancip"),
    langkah("busur", 4),
  ]),
  A(10, "suara", "Misi Sudut 10: daftar akhir", "Daftar akhir sudut untuk Kak Anton. Ucapkan jawabannya.", [sebut("busur", "alat"), lipat("sudut L", 90), acuan("sudut M", 330), baca("sudut N", 40, "kiri")]),
];

export const POIN_PENTING = [
  "Sudut terbentuk bila dua kaki bertemu di titik sudut, dan sudut AOB ditulis dengan titik sudut O di tengah.",
  "Pojok kertas yang dilipat dua kali adalah sudut siku-siku, besarnya 90°.",
  "Sudut lancip kurang dari 90°, sudut tumpul lebih dari 90° dan kurang dari 180°.",
  "Sudut lurus tepat 180°, sama dengan dua sudut siku-siku. Sudut refleks lebih dari 180° dan kurang dari 360°.",
  "Satuan baku sudut adalah derajat, dan satu putaran penuh sama dengan 360°.",
  "Busur derajat dipasang dengan titik tengah di titik sudut dan garis nol di kaki pertama, lalu skala dibaca dari nol.",
  "Dua sudut yang berpasangan jumlahnya 360°, misalnya sudut refleks 300° dan sudut 60°.",
  "Lipat Kertas, Sudut Acuan, dan Langkah Busur membantu mengenali dan mengukur sudut tanpa keliru.",
];
/** Poin penting untuk suara (tanpa digit): angka menjadi kata dan lambang derajat dibaca lengkap. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace(/(\d+)°/g, (_m, d: string) => `${kataBil(Number(d))} derajat`).replace(/\d+/g, (d) => kataBil(Number(d))));

/** Jembatan ke Sub-Bab C. */
export const PENUTUP_B =
  "Raka mencuci semua tali layang-layang dengan sabun. Besok Pak Samsul, panitia lomba, datang membawa tali lintasan. Menurutmu, kalau dua tali lintasan ditarik pada jarak yang selalu sama, apakah keduanya akan bertemu?";

export const TEMA_SUDUT = {
  concrete: { ikon: "\u{1FA81}", nama: "Concrete", cara: "Tanah lapang berumput: benda layang-layang beremoji, patok, dan busur di atas rumput" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Papan busur kayu terang: kaki sudut, busur, dan sudut berwarna polos dengan garis biru" },
  abstract: { ikon: "\u{1F9E2}", nama: "Abstract", cara: "Lembar Kak Anton biru pucat: kartu kata, angka, dan lambang derajat, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_SUDUT, PICTORIAL as PICTORIAL_SUDUT, ABSTRACT as ABSTRACT_SUDUT };
