/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 1 Sub-Bab A "Toples Permen Pak Joko" (bilangan tiga angka), awal cerita Toko Kelontong Pak Joko.
 * Misi lanjutan "Misi Rak Stok" (nomor misi berlanjut dari Simulasi). Bilangan berbeda dari Story (634, 703, 405, 900, 530, 503, 73, 45, 700, 70, 325, 417, 508, 716).
 * Concrete memakai benda beremoji (toples, bungkus, butir permen, balok mainan, papan stok), Pictorial memakai balok Dienes polos dan tabel tiga tempat polos,
 * Abstract memakai kartu kata dan angka. Jawaban beragam: memilih bilangan, menulis satu angka di kanvas (angka pada satu tempat, banyak balok, butir yang tersisa),
 * dan mengucapkan satu kata (nama tempat, satuan kemasan) atau bilangan pendek. Kunci dihitung dari data.
 * Angka jawaban Tulis di kanvas per tahap: Concrete 4, 6, 7, 2; Pictorial 7, 8, 3, 6; Abstract 5, 9, 4, 8 (tidak kembar dalam satu tahap).
 * Bilangan Story (1 sampai 9 sebagai angka satu tempat) dipakai lagi dalam hitungan lain, bukan sebagai data yang sama.
 * Diuji: scripts/uji-tempat-k3b1a.mjs.
 */
import type { Cara, Isi, Langkah, LangkahSalah, LangkahSoal, LBalok, LKem, LNama, LTabel, LTukar, Rupa, SoalMisi, Tempat } from "./logika-cpa";
import { URUT_METODE, instruksi, kataBil } from "./logika-cpa";

export { MISI_STOK_TEKS } from "./data-sim";

const I = (r: number, p: number, s: number): Isi => ({ r, p, s });
const kem = (r: number, p: number, s: number): LKem => ({ tipe: "kem", isi: I(r, p, s) });
const tukar = (r: number, p: number, s: number, dari: "butir" | "bungkus"): LTukar => ({ tipe: "tukar", isi: I(r, p, s), dari });
const balok = (r: number, p: number, s: number, kanvas: Tempat, suara: Tempat): LBalok => ({ tipe: "balok", isi: I(r, p, s), kanvas, suara });
const tabel = (n: number, kanvas: Tempat, suara: Tempat): LTabel => ({ tipe: "tabel", n, kanvas, suara });
const nama = (n: number, kanvas: Tempat): LNama => ({ tipe: "nama", n, kanvas });
const salah = (dasar: LKem | LBalok | LNama, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string): LangkahSalah => ({
  tipe: "salah",
  dasar,
  tokoh,
  kataTokoh,
  jawabTokoh,
  alasan,
  benar,
  keliru,
});

/** Empat langkah satu misi, berurut metode: IGIL, Dienes Blocks, Place-Value Chart, Number Names. */
const satuMisi =
  (rupa: Rupa) =>
  (nomor: number, cara: Cara, judul: string, cerita: string, isi: [Langkah, Langkah, Langkah, Langkah]): SoalMisi => ({
    nomor,
    judul,
    cerita,
    cara,
    langkah: isi.map((l, i): LangkahSoal => {
      const s = instruksi(l, rupa, cara);
      return { metode: URUT_METODE[i], cara, judul: s, suara: s, langkah: l };
    }),
  });

/* ------------------------------ Concrete: gudang dan rak dengan benda beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Rak Stok 2: stok baru dari Kak Dewi", "Kak Dewi mengantar stok baru ke gudang. Baca bilangan dari benda dan dari kata dengan cara yang tepat.", [
    salah(
      kem(2, 0, 5),
      "Salsa",
      "Dua toples dan lima butir, jadi ada dua puluh lima.",
      "25",
      [
        "Salsa benar, tempat puluhan yang kosong tidak perlu ditulis.",
        "Salsa keliru: bungkusnya nol, tetapi tempat puluhan tetap dijaga dengan angka nol, jadi bilangannya dua ratus lima.",
        "Toples dan butir tidak boleh dibaca bersama.",
      ],
      1,
      "Salsa melewatkan tempat puluhan. Dua toples, nol bungkus, dan lima butir dibaca dua ratus lima, bukan dua puluh lima.",
    ),
    balok(3, 1, 6, 1, 0),
    tabel(250, 0, 1),
    nama(360, 0),
  ]),
  C(3, "kanvas", "Misi Rak Stok 3: catatan Salsa", "Salsa mencatat stok di gudang. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    tukar(1, 2, 14, "butir"),
    balok(2, 6, 3, 1, 0),
    tabel(782, 0, 1),
    nama(291, 0),
  ]),
  C(4, "suara", "Misi Rak Stok 4: panggilan Pak Joko", "Pak Joko memanggil dari gudang. Jawab dengan suaramu.", [
    tukar(2, 13, 5, "bungkus"),
    balok(5, 2, 7, 1, 0),
    tabel(845, 0, 1),
    nama(308, 0),
  ]),
];

/* ------------------------------ Pictorial: papan kapur dengan balok Dienes polos dan tabel tiga tempat ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Rak Stok 5: papan stok", "Bima menggambar papan stok dengan balok dan tabel. Periksa gambarnya.", [
    salah(
      balok(3, 4, 0, 1, 0),
      "Bima",
      "Tiga lempeng, empat batang, dan nol kubus, jadi empat ratus tiga puluh.",
      "430",
      [
        "Bima benar, batang dibaca lebih dulu daripada lempeng.",
        "Bima keliru: lempeng adalah ratusan, jadi tiga lempeng dibaca lebih dulu, lalu empat batang, sehingga bilangannya tiga ratus empat puluh.",
        "Kubus yang nol harus dihapus dari bilangan.",
      ],
      1,
      "Bima membaca dari tempat yang salah. Tiga lempeng adalah tiga ratusan dan empat batang adalah empat puluhan, jadi bilangannya tiga ratus empat puluh.",
    ),
    balok(1, 0, 6, 1, 0),
    tabel(620, 0, 1),
    nama(815, 0),
  ]),
  Pi(6, "kanvas", "Misi Rak Stok 6: papan Salsa", "Salsa menyusun papan stok yang lebih besar. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    tukar(3, 1, 17, "butir"),
    balok(4, 8, 2, 1, 0),
    tabel(953, 2, 1),
    nama(146, 2),
  ]),
  Pi(7, "suara", "Misi Rak Stok 7: lapor ke Pak Joko", "Bima melaporkan papan stoknya kepada Pak Joko. Sebutkan jawabanmu.", [
    tukar(6, 3, 12, "butir"),
    balok(9, 1, 4, 2, 0),
    tabel(472, 0, 0),
    nama(270, 0),
  ]),
];

/* ------------------------------ Abstract: nota stok dengan kartu kata dan angka ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Rak Stok 8: nota stok", "Nota stok hanya berisi kata dan angka.", [
    salah(
      nama(608, 0),
      "Raka",
      "Enam ratus delapan cukup ditulis enam puluh delapan, nolnya tidak perlu.",
      "68",
      [
        "Raka benar, nol tidak perlu ditulis karena tidak diucapkan.",
        "Raka keliru: nol memang tidak diucapkan, tetapi nol tetap ditulis supaya angka delapan berada di tempat satuan.",
        "Enam ratus delapan memang hanya punya dua angka.",
      ],
      1,
      "Raka menghilangkan nol. Nol tidak diucapkan, tetapi harus ditulis supaya tempat puluhan terjaga, jadi enam ratus delapan ditulis dengan tiga angka.",
    ),
    balok(7, 2, 0, 1, 0),
    tabel(341, 0, 1),
    nama(950, 0),
  ]),
  A(9, "kanvas", "Misi Rak Stok 9: tulis di nota", "Raka meminta kamu menulis jawaban di kanvas.", [
    tukar(2, 4, 15, "butir"),
    balok(6, 9, 1, 1, 0),
    tabel(426, 0, 2),
    nama(837, 0),
  ]),
  A(10, "suara", "Misi Rak Stok 10: daftar akhir", "Daftar akhir stok untuk Pak Joko. Bacakan jawabannya.", [
    tukar(3, 12, 6, "bungkus"),
    balok(8, 3, 5, 0, 1),
    tabel(263, 0, 2),
    nama(907, 0),
  ]),
];

export const POIN_PENTING = [
  "Satu butir adalah satu satuan. Sepuluh satuan sama dengan satu puluhan, dan sepuluh puluhan sama dengan satu ratusan.",
  "Bilangan tiga angka punya tiga tempat: ratusan, puluhan, dan satuan, dari kiri ke kanan.",
  "Membaca bilangan dimulai dari kiri: ratusan dulu, lalu puluhan, lalu satuan.",
  "Angka nol tidak diucapkan, tetapi nol tetap ditulis supaya tempatnya terjaga.",
  "Menulis dari kata: cari angka tiap tempat, lalu isi tempat yang kosong dengan nol.",
  "Balok Dienes, Tabel Tiga Tempat, dan Nama Bilangan membantu membaca dan menulis bilangan.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace(/\d+/g, (d) => kataBil(Number(d))));

/** Jembatan ke Sub-Bab B. */
export const PENUTUP_A = "Daftar stok sudah rapi dan Raka menepati taruhannya. Sekarang Bu Wati datang membawa kartu angka untuk label harga. Menurutmu, angka yang sama di tempat yang berbeda, jumlahnya sama atau berbeda?";

export const TEMA_TEMPAT = {
  concrete: { ikon: "\u{1F36C}", nama: "Concrete", cara: "Rak gudang: benda beremoji, toples, bungkus, butir lepas, balok mainan, dan papan stok" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Papan kapur: balok Dienes polos, tabel tiga tempat, dan kartu nama bilangan" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Nota stok: kartu kata dan angka, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_TEMPAT, PICTORIAL as PICTORIAL_TEMPAT, ABSTRACT as ABSTRACT_TEMPAT };
