/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 2 Sub-Bab C "Meja Jahit Kak Sekar" (pecahan yang sama besar: dikali atau dibagi bilangan sama pada pembilang dan penyebut, menyederhanakan),
 * cerita Sanggar Batik Kampung Mekar. Misi lanjutan "Misi Jahit" (nomor misi berlanjut dari Simulasi). Data berbeda dari Story (satu per dua, dua per empat, empat per delapan, tiga per empat, enam per delapan,
 * satu per tiga, empat per dua belas, delapan per dua belas, dua per tiga, sepuluh per lima belas, tiga per lima, enam per sepuluh, dua belas per enam belas),
 * kecuali seed Cari kesalahan dari alur (dua per tiga menjadi tiga per empat dengan menambah satu; Genta mengalikan pembilang dan penyebut dengan bilangan sama).
 * Concrete memakai benda jahit beremoji di meja jahit (kain, benang, gunting), Pictorial memakai diagram polos (batang kain polos) di kertas pola, Abstract memakai kartu kata dan angka di nota pesanan.
 * Jawaban beragam: memilih pecahan atau alasan, menulis satu angka di kanvas, dan mengucapkan satu kata (sama, besar, kecil) atau bilangan pendek. Jawaban benar dihitung dari data.
 * Angka jawaban Tulis di kanvas per tahap: Concrete 4, 6, 3, 5; Pictorial 6, 2, 5, 4; Abstract 8, 6, 7, 9 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-jahit-k4b2c.mjs.
 */
import type { Cara, Langkah, LangkahSalah, LangkahSoal, LBagi, LDaerah, LEkuiv, LKali, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, ucapkan } from "./logika-cpa";

export { MISI_JAHIT_TEKS } from "./data-sim";

const ekuiv = (p: number, q: number, m: number): LEkuiv => ({ tipe: "ekuiv", p, q, m });
const daerah = (p: number, q: number, r: number, t?: number): LDaerah => ({ tipe: "daerah", p, q, r, ...(t === undefined ? {} : { t }) });
const kali = (p: number, q: number, m: number): LKali => ({ tipe: "kali", p, q, m });
const bagi = (P: number, Q: number, d: number): LBagi => ({ tipe: "bagi", P, Q, d });
const salah = (dasar: LEkuiv, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
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

/** Empat langkah satu misi, berurut metode: IGIL, Area Model Match, Multiply by One, Divide Both. */
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

/* ------------------------------ Concrete: meja jahit dengan kain, benang, dan gunting beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Jahit 2: kain di meja", "Kak Sekar memotong kain di meja jahit. Periksa gambarnya.", [
    salah(
      ekuiv(2, 3, 2),
      "Satria",
      "Dua per tiga menjadi tiga per empat. Tinggal ditambah satu pada pembilang dan penyebut, kan?",
      "3/4",
      [
        "Satria benar, menambah bilangan yang sama pada pembilang dan penyebut tidak mengubah besar pecahan.",
        "Yang menjaga besar pecahan adalah mengalikan pembilang dan penyebut dengan bilangan yang sama, bukan menambah.",
        "Satria keliru, pecahan yang sama besar harus punya penyebut yang sama.",
      ],
      1,
      "Menambah satu pada pembilang dan penyebut mengubah besar pecahan. Yang menjaga besar pecahan adalah mengalikan keduanya dengan bilangan yang sama.",
    ),
    daerah(1, 4, 12),
    kali(2, 5, 3),
    bagi(8, 20, 4),
  ]),
  C(3, "kanvas", "Misi Jahit 3: pita ukur", "Laras mencatat ukuran kain dengan pita ukur. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [ekuiv(2, 5, 2), daerah(3, 7, 14), kali(1, 6, 3), bagi(10, 25, 5)]),
  C(4, "suara", "Misi Jahit 4: panggilan Kak Sekar", "Kak Sekar memanggil dari meja jahit. Jawab dengan suaramu.", [ekuiv(1, 5, 4), daerah(2, 5, 10, 3), kali(1, 4, 2), bagi(14, 16, 2)]),
];

/* ------------------------------ Pictorial: kertas pola dengan batang kain polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Jahit 5: kertas pola", "Genta menyalin pola ke kertas pola. Periksa gambarnya.", [
    salah(
      ekuiv(5, 6, 2),
      "Genta",
      "Lima per enam sama besar dengan sepuluh per dua belas, karena pembilang dan penyebut sama-sama dikali dua.",
      "10/12",
      [
        "Genta benar: pembilang dan penyebut dikali bilangan yang sama, jadi besar pecahan tetap.",
        "Genta keliru: yang dikali dua hanya boleh pembilangnya.",
        "Genta keliru, pecahan yang sama besar harus punya pembilang yang sama.",
      ],
      0,
      "Jawaban Genta benar: pembilang dan penyebut sama-sama dikali dua, jadi besar pecahan tetap.",
      true,
    ),
    daerah(2, 5, 10),
    kali(3, 7, 4),
    bagi(6, 14, 2),
  ]),
  Pi(6, "kanvas", "Misi Jahit 6: papan pola Laras", "Laras menggambar pola di papan. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [ekuiv(2, 7, 3), daerah(1, 4, 8), kali(1, 5, 5), bagi(4, 16, 4)]),
  Pi(7, "suara", "Misi Jahit 7: lapor ke Kak Sekar", "Genta melaporkan polanya kepada Kak Sekar. Sebutkan jawabanmu.", [ekuiv(4, 5, 2), daerah(1, 6, 12, 2), kali(5, 6, 3), bagi(24, 30, 6)]),
];

/* ------------------------------ Abstract: nota pesanan dengan kartu kata dan angka ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Jahit 8: nota pesanan", "Nota pesanan Kak Sekar hanya berisi kata dan angka.", [
    salah(
      ekuiv(1, 5, 2),
      "Satria",
      "Satu per lima sama besar dengan dua per lima, karena pembilangnya dikali dua.",
      "2/5",
      [
        "Satria benar, mengalikan pembilangnya saja sudah cukup.",
        "Satria keliru, pembilang tidak boleh dikalikan.",
        "Satria keliru: penyebut juga harus dikali dua, sehingga hasilnya dua per sepuluh.",
      ],
      2,
      "Kalau hanya pembilang yang dikali, besar pecahan berubah. Penyebut juga harus dikali dengan bilangan yang sama.",
    ),
    daerah(3, 7, 14),
    kali(2, 9, 2),
    bagi(10, 16, 2),
  ]),
  A(9, "kanvas", "Misi Jahit 9: tulis di nota", "Kak Sekar meminta kamu menulis jawaban di kanvas.", [ekuiv(4, 5, 2), daerah(2, 7, 21), kali(1, 9, 7), bagi(6, 27, 3)]),
  A(10, "suara", "Misi Jahit 10: nota akhir", "Nota akhir untuk Kak Sekar. Ucapkan jawabannya.", [ekuiv(3, 7, 3), daerah(1, 5, 10, 3), kali(4, 7, 3), bagi(12, 15, 3)]),
];

export const POIN_PENTING = [
  "Pecahan yang berbeda bagian bisa sama besar, contoh 1/2 sama besar dengan 2/4 dan 4/8.",
  "Menumpuk dua potongan memperlihatkan apakah arsirannya sama panjang.",
  "Menambah bilangan yang sama pada pembilang dan penyebut mengubah besar pecahan.",
  "Mengalikan atau membagi pembilang dan penyebut dengan bilangan yang sama menjaga besar pecahan.",
  "Menyederhanakan pecahan berarti membagi pembilang dan penyebut sampai tidak ada bilangan lain yang membagi habis keduanya. Contoh: 6/8 menjadi 3/4.",
  "Cocokkan Daerah, Kali Bentuk Satu, dan Bagi Keduanya membantu mencari pecahan yang sama besar.",
];
/** Poin penting untuk suara (tanpa digit): angka menjadi kata dan lambang dibaca lengkap. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p));

/** Jembatan ke Sub-Bab D. */
export const PENUTUP_C = "Pak Bagas, penjual kain meteran, datang sambil memanggul gulungan kain panjang. Ia bilang kainnya dibagi sepuluh dan seratus bagian, dan harus ditulis dengan koma. Menurutmu, bagaimana menulis tiga per sepuluh dengan koma?";

export const TEMA_JAHIT = {
  concrete: { ikon: "\u{1F9F5}", nama: "Concrete", cara: "Meja jahit: kain, benang, dan gunting beremoji" },
  pictorial: { ikon: "\u{1F4CA}", nama: "Pictorial", cara: "Kertas pola: batang kain polos dan pecahan bertingkat" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Nota pesanan: kartu kata dan angka, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_JAHIT, PICTORIAL as PICTORIAL_JAHIT, ABSTRACT as ABSTRACT_JAHIT };
