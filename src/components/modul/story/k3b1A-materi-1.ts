import type { AdeganStory } from "./logika-story";
import { OWL, W, anak, banyakBlok, blok, emo, garis, idBlok, judul, kartu, teks } from "./k3b1A-gambar";
import { bersih, hapus, idKartu, idx, k, tambah } from "./k3b1A-bantu";

/* ------------------------------ 2. Tongkat bendera Halim ------------------------------ */
const SUARA_T1 = "Halim punya sebuah tongkat bendera. Bendera kecil terikat di ujung atas tongkat itu.";
const SUARA_T2 = "Berapa panjang tongkat Halim? Panjangnya seratus enam puluh sentimeter.";
const SUARA_T3 = "Bilangan seratus enam puluh terdiri dari tiga angka. Bagaimana cara membacanya dengan benar?";
const SUARA_T4 = "Untuk mengerti bilangan tiga angka, kita kenali dulu satuan, puluhan, dan ratusan memakai balok.";

export const ADEGAN_CERITA_TONGKAT: AdeganStory = {
  id: "cerita-tongkat",
  judul: "Tongkat bendera Halim",
  sumber: "Materi: tongkat bendera Halim",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Tongkat bendera Halim")),
      tambah(idx(SUARA_T1, "Halim"), ...anak("halim", 40, 80)),
      tambah(idx(SUARA_T1, "tongkat"), garis("tk", 70, 124, 190, 0, W.coklat, 4)),
      tambah(idx(SUARA_T1, "Bendera", 2), emo("bd", 264, 118, "\u{1F6A9}", 26)),
    ),
    k(SUARA_T2, tambah(idx(SUARA_T2, "Berapa"), emo("tn", 150, 80, "❓", 28)), tambah(idx(SUARA_T2, "seratus"), ...kartu("pj", 90, 138, 120, 26, W.emas, ["160 sentimeter"], 11))),
    k(SUARA_T3, hapus(0, "tn"), tambah(idx(SUARA_T3, "Bilangan"), teks("bn", 190, 82, "160", 30, W.merah)), tambah(idx(SUARA_T3, "Bagaimana"), emo("tn2", 262, 70, "❓", 22))),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Kenali dulu balok")),
      tambah(idx(SUARA_T4, "balok."), emo("bl", 150, 70, "\u{1F9F1}", 36)),
      tambah(idx(SUARA_T4, "satuan,"), ...kartu("t0", 20, 100, 78, 28, W.merahMuda, ["satuan"], 10)),
      tambah(idx(SUARA_T4, "puluhan,"), ...kartu("t1", 111, 100, 78, 28, W.langit, ["puluhan"], 10)),
      tambah(idx(SUARA_T4, "ratusan"), ...kartu("t2", 202, 100, 78, 28, W.hijauMuda, ["ratusan"], 10)),
    ),
  ],
};

/* ------------------------------ 3. Satu kotak kecil, satu satuan ------------------------------ */
const SUARA_S1 = "Perhatikan satu kotak kecil ini. Satu kotak kecil adalah satu satuan.";
const SUARA_S2 = "Kita tambah kotak kecil lagi. Hitung bersama: satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh.";
const SUARA_S3 = "Sepuluh kotak kecil bisa ditukar dengan satu batang. Satu batang disebut satu puluhan.";
const SUARA_S4 = "Jadi sepuluh satuan sama dengan satu puluhan. Ingat selalu ya.";
const UNIT = (i: number) => blok("s", i, 30 + (i - 1) * 24, 66, 16, 16);
const KATA_HITUNG = ["dua,", "tiga,", "empat,", "lima,", "enam,", "tujuh,", "delapan,", "sembilan,"];

export const ADEGAN_KOTAK_SATUAN: AdeganStory = {
  id: "kotak-satuan",
  judul: "Satu kotak kecil, satu satuan",
  sumber: "Materi: kotak kecil dan satuan",
  latar: "#FEF2F2",
  ketukan: [
    k(SUARA_S1, tambah(0, judul("Satuan")), tambah(idx(SUARA_S1, "kotak"), UNIT(1)), tambah(idx(SUARA_S1, "satuan."), ...kartu("s1", 14, 100, 92, 26, W.merahMuda, ["1 satuan"], 11))),
    k(
      SUARA_S2,
      hapus(0, ...idKartu("s1")),
      ...KATA_HITUNG.map((kt, q) => tambah(idx(SUARA_S2, kt), UNIT(q + 2))),
      tambah(idx(SUARA_S2, "sepuluh."), UNIT(10), banyakBlok("s", 10, 150, 130)),
    ),
    k(
      SUARA_S3,
      hapus(idx(SUARA_S3, "ditukar"), ...idBlok("s", 1, 10), "bk-n-s"),
      tambah(idx(SUARA_S3, "batang", 1), blok("p", 1, 50, 50, 16, 84)),
      tambah(idx(SUARA_S3, "puluhan."), ...kartu("p1", 100, 80, 110, 26, W.langit, ["1 puluhan"], 11)),
    ),
    k(SUARA_S4, tambah(idx(SUARA_S4, "Jadi"), ...kartu("kk", 30, 152, 240, 28, W.emas, ["10 satuan = 1 puluhan"], 11))),
  ],
};

/* ------------------------------ 4. Puluhan dan ratusan ------------------------------ */
const SUARA_P1 = "Satu batang adalah satu puluhan. Di dalam satu batang ada sepuluh satuan.";
const SUARA_P2 = "Kita kumpulkan sepuluh batang puluhan. Hitung satu per satu sampai sepuluh batang.";
const SUARA_P3 = "Sepuluh batang ditumpuk menjadi satu lempeng besar. Lempeng itu adalah satu ratusan.";
const SUARA_P4 = "Satu lempeng sama dengan sepuluh puluhan, atau seratus satuan.";
const SUARA_P5 = "Ingat ya. Sepuluh satuan jadi satu puluhan, dan sepuluh puluhan jadi satu ratusan.";
const ROD = (i: number) => blok("p", i, 30 + (i - 1) * 18, 50, 12, 80);

export const ADEGAN_PULUHAN_RATUSAN: AdeganStory = {
  id: "puluhan-ratusan",
  judul: "Puluhan dan ratusan",
  sumber: "Materi: puluhan dan ratusan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Puluhan dan ratusan")),
      tambah(idx(SUARA_P1, "batang"), ROD(1)),
      tambah(idx(SUARA_P1, "puluhan."), ...kartu("q0", 100, 56, 150, 26, W.langit, ["1 puluhan"], 11)),
      tambah(idx(SUARA_P1, "sepuluh"), ...kartu("q1", 100, 96, 150, 26, W.merahMuda, ["10 satuan"], 11)),
    ),
    k(
      SUARA_P2,
      hapus(0, ...idKartu("q0"), ...idKartu("q1")),
      tambah(idx(SUARA_P2, "satu", 2), ROD(2), ROD(3), ROD(4)),
      tambah(idx(SUARA_P2, "sampai"), ROD(5), ROD(6), ROD(7), ROD(8), ROD(9)),
      tambah(idx(SUARA_P2, "sepuluh", 2), ROD(10), banyakBlok("p", 10, 150, 150)),
    ),
    k(
      SUARA_P3,
      hapus(idx(SUARA_P3, "ditumpuk"), ...idBlok("p", 1, 10), "bk-n-p"),
      tambah(idx(SUARA_P3, "lempeng"), blok("r", 1, 40, 46, 88, 84)),
      tambah(idx(SUARA_P3, "ratusan."), ...kartu("q2", 160, 78, 120, 26, W.hijauMuda, ["1 ratusan"], 11)),
    ),
    k(SUARA_P4, tambah(idx(SUARA_P4, "Satu"), ...kartu("q3", 30, 150, 240, 28, W.emas, ["10 puluhan = 100 satuan"], 11))),
    k(
      SUARA_P5,
      bersih(0),
      tambah(0, judul("Sepuluh jadi satu")),
      tambah(idx(SUARA_P5, "satuan"), ...kartu("r1", 30, 44, 240, 32, W.merahMuda, ["10 satuan = 1 puluhan"], 11)),
      tambah(idx(SUARA_P5, "puluhan", 2), ...kartu("r2", 30, 90, 240, 32, W.langit, ["10 puluhan = 1 ratusan"], 11)),
      tambah(idx(SUARA_P5, "ratusan."), emo("ow", 150, 168, OWL, 34)),
    ),
  ],
};
