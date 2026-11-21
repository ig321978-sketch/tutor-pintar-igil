import type { AdeganStory } from "./logika-story";
import { E, W, barisTabel, chip, emo, garis, judul, kartu, kerangkaTabel, kotak, lampuGantung, lantai, teks, tokoh } from "./k5b2e-gambar";
import { hapus, k, sorotkan, tambah, ubah, warnai } from "./k5b2e-bantu";

/*
 * Cerita orisinal IGIL "Papan Bilangan Kak Lintang" (Kelas 5 Bab 2 Sub-Bab E), akhir cerita Pasar Kuliner Malam.
 * Naskah suara dari naskah/story-naskah-k5b2e.md. Bagian ini: KPK dan FPB dari faktorisasi 12 dan 18, pembagian berulang, dan perayaan akhir bab.
 */

/* ------------------------------ 7. KPK dan FPB dari faktorisasi ------------------------------ */
const SUARA_KPK1 = "Bima menyatukan dua faktorisasi itu, dan bilangan prima yang berpasangan ditulis sekali saja.";
const SUARA_KPK2 = "KPK dari dua belas dan delapan belas: dua kali dua kali tiga kali tiga, yaitu tiga puluh enam.";
const SUARA_KPK3 = "FPB adalah hasil kali prima yang berpasangan, yaitu dua kali tiga, jadi enam.";

const X_CHIP = [100, 130, 160, 190];
const FA = [2, 2, 3];
const FB = [2, 3, 3];
export const ADEGAN_KPK_FPB: AdeganStory = {
  id: "kpk-fpb",
  judul: "Bima menyatukan faktorisasi",
  sumber: "Materi: KPK dan FPB dari faktorisasi prima",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_KPK1,
      tambah(0, judul("Faktorisasi Dipasangkan"), ...lantai("lt", 160), ...tokoh("bi", 266, 184, "Bima")),
      tambah("faktorisasi", teks("l12", 20, 54, "12 =", 12, W.biru, { anchor: "start" }), ...FA.flatMap((v, i) => chip(`a${i}`, X_CHIP[i], 50, v)), teks("l18", 20, 88, "18 =", 12, W.biru, { anchor: "start" }), ...FB.flatMap((v, i) => chip(`b${i}`, X_CHIP[i], 84, v))),
      tambah("berpasangan", garis("pg1", 100, 61, 0, 12, W.oranye, 2.6), garis("pg2", 160, 61, -30, 12, W.oranye, 2.6)),
      ubah("berpasangan", ...["a0", "b0", "a2", "b1"].map((id) => ({ id, warna: W.hijauMuda }))),
      tambah("sekali", teks("sk", 236, 56, "ditulis sekali", 9, W.hijauTua)),
    ),
    k(
      SUARA_KPK2,
      tambah("KPK", teks("lk", 20, 126, "KPK =", 12, W.merahTua, { anchor: "start" })),
      ...[7, 9, 11, 13].map((at, i) => tambah(at, ...chip(`k${i}`, X_CHIP[i], 122, [2, 2, 3, 3][i], W.emas))),
      tambah("yaitu", teks("hk", 238, 126, "= 36", 14, W.merah)),
    ),
    k(
      SUARA_KPK3,
      tambah("FPB", teks("lf", 20, 160, "FPB =", 12, W.merahTua, { anchor: "start" })),
      sorotkan("berpasangan", "a0", "b0", "a2", "b1"),
      tambah(8, ...chip("f0", 100, 156, 2, W.emas)),
      tambah(10, ...chip("f1", 130, 156, 3, W.emas)),
      tambah("enam", teks("hf", 176, 160, "= 6", 14, W.merah)),
    ),
  ],
};

/* ------------------------------ 8. Pembagian berulang ------------------------------ */
const SUARA_ULANG1 = "Kak Lintang menunjukkan cara lain: pembagian berulang dengan bilangan prima.";
const SUARA_ULANG2 = "Dua belas dan delapan belas dibagi dua, lalu dibagi tiga, sampai semuanya menjadi satu.";
const SUARA_ULANG3 = "Semua pembagi dikali menjadi KPK, dan pembagi yang membagi keduanya menjadi FPB.";

/** Tabel pembagian berulang 12 dan 18: kolom pembagi di x 40, bilangan di x 86 dan 130, baris di y 68, 88, 108, 128. */
const Y_BARIS = [68, 88, 108, 128];
const BARIS = [
  { p: 2, v: [6, 9] },
  { p: 2, v: [3, 9] },
  { p: 3, v: [1, 3] },
  { p: 3, v: [1, 1] },
];
const objBaris = (i: number) => barisTabel(`r${i}`, 40, Y_BARIS[i], BARIS[i].p, BARIS[i].v);
export const ADEGAN_BERULANG: AdeganStory = {
  id: "berulang",
  judul: "Kak Lintang membagi berulang",
  sumber: "Materi: pembagian berulang dengan prima",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_ULANG1,
      tambah(0, judul("Pembagian Berulang"), ...lantai("lt", 160)),
      tambah("Lintang", ...tokoh("kl", 268, 168, "Kak Lintang")),
      tambah("cara", ...kartu("cl", 176, 40, 112, 26, "#FEF9C3", ["cara lain"], 10)),
      tambah("pembagian", ...kerangkaTabel("kt", 40, 40, 140, 150), teks("hp", 40, 44, "pembagi", 9, W.oranye), teks("h0", 86, 44, "12", 11, W.biru), teks("h1", 130, 44, "18", 11, W.biru)),
      tambah("prima", teks("pt", 232, 84, "pembagi prima", 9, W.hijauTua)),
    ),
    k(
      SUARA_ULANG2,
      tambah(6, ...objBaris(0), ...objBaris(1)),
      tambah(9, ...objBaris(2), ...objBaris(3)),
      warnai("satu", W.hijauTua, "r3-c0", "r3-c1"),
      tambah("satu", emo("ok", 182, 130, E.benar, 18)),
    ),
    k(
      SUARA_ULANG3,
      hapus(0, "cl-k", "cl-t0", "pt"),
      tambah("dikali", teks("e1", 226, 62, "2 × 2 × 3 × 3", 10, W.biru)),
      tambah("KPK", teks("e2", 226, 78, "KPK = 36", 12, W.merah)),
      tambah("yang", kotak("s1", 20, 56, 128, 16, "#FDE047", undefined, { op: 0.35, rx: 3, tebal: 0, z: 0 })),
      tambah("keduanya", kotak("s3", 20, 96, 128, 16, "#FDE047", undefined, { op: 0.35, rx: 3, tebal: 0, z: 0 })),
      tambah("FPB", teks("f1", 226, 96, "2 × 3", 10, W.biru), teks("f2", 226, 112, "FPB = 6", 12, W.merah)),
    ),
  ],
};

/* ------------------------------ 9. Perayaan akhir bab ------------------------------ */
const SUARA_PENUTUP1 = "Malam itu Pasar Kuliner Malam penuh lampu, dengan lonceng, klepon, kotak bingkisan, dan papan bilangan.";
const SUARA_PENUTUP2 = "Bu Marni, Pak Tarno, Bu Wati, Pak Joko, dan Kak Lintang bertepuk tangan bersama Pak Arif.";
const SUARA_PENUTUP3 = "Menurutmu, bilangan prima apa yang paling kamu sukai? Terima kasih, Bima, Citra, Fajar, Pak Arif, dan Kak Lintang!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Perayaan Pasar Kuliner Malam",
  sumber: "Materi: perayaan akhir bab",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_PENUTUP1,
      tambah(0, judul("Pasar Kuliner Malam"), ...lantai("lt", 156)),
      tambah("lampu", ...lampuGantung("lg", 36, 8)),
      tambah("lonceng", emo("e1", 50, 82, E.lonceng, 26), teks("l1", 50, 99, "lonceng", 9, W.hijauTua)),
      tambah("klepon", emo("e2", 110, 82, E.klepon, 26), teks("l2", 110, 99, "klepon", 9, W.hijauTua)),
      tambah("kotak", emo("e3", 170, 82, E.kotak, 26), teks("l3", 170, 99, "kotak", 9, W.hijauTua)),
      tambah("papan", kotak("e4", 218, 62, 66, 26, W.papan, W.kayuTua, { rx: 3, tebal: 2 }), teks("e4-t", 251, 79, "1 - 100", 10, W.biru), teks("l4", 251, 99, "papan", 9, W.hijauTua)),
    ),
    k(
      SUARA_PENUTUP2,
      tambah("Marni", ...tokoh("bm", 30, 184, "Bu Marni")),
      tambah("Tarno", ...tokoh("pt", 86, 184, "Pak Tarno")),
      tambah("Wati", ...tokoh("bw", 142, 184, "Bu Wati")),
      tambah("Joko", ...tokoh("pj", 198, 184, "Pak Joko")),
      tambah("Lintang", ...tokoh("kl", 254, 184, "Kak Lintang")),
      tambah("tangan", emo("tp1", 70, 150, E.tangan, 16), emo("tp2", 226, 150, E.tangan, 16)),
      tambah("Arif", ...tokoh("pa", 150, 128, "Pak Arif")),
    ),
    k(
      SUARA_PENUTUP3,
      hapus(0, "e1", "e2", "e3", "e4", "e4-t", "l1", "l2", "l3", "l4"),
      tambah("sukai", ...kartu("qs", 60, 46, 190, 26, "#FEF9C3", ["bilangan prima kesukaanmu?"], 10), teks("qm", 272, 76, "?", 30, W.ungu)),
      tambah("Terima", emo("e5", 268, 128, E.konfeti, 24), emo("e6", 24, 64, E.balon, 22)),
      tambah("Bima", ...tokoh("bi", 40, 128, "Bima")),
      tambah("Citra", ...tokoh("ci", 95, 128, "Citra")),
      tambah("Fajar", ...tokoh("fa", 205, 128, "Fajar")),
      sorotkan("Lintang", "kl-sp"),
    ),
  ],
};
