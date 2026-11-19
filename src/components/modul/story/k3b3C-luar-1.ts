import type { AdeganStory } from "./logika-story";
import { E, W, bulat, emo, judul, kotak, lantai, panah, teks, timbDigital, tokoh } from "./k3b3C-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k3b3C-bantu";

/*
 * Cerita orisinal IGIL "Pakan Bu Lastri" (Kelas 3 Bab 3 Sub-Bab C), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b3c.md. Bagian ini: pembuka (tiga cara tua juru pakan), Hefting (Mengangkat dan Merasakan), dan terapannya.
 */

export const NAMA_METODE = ["Hefting", "Benchmark Weights", "Zero Check"] as const;
export const NAMA_METODE_ID = ["Mengangkat dan Merasakan", "Berat Acuan", "Cek Angka Nol"] as const;

const KUNING_KARTU = "#FEF3C7";

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Malam itu di gudang pakan, Bu Lastri memperlihatkan tiga cara tua para juru pakan.";
const SUARA_O2 = "Cara itu membantu mereka menimbang dengan cepat dan cermat, bahkan ketika sedang terburu-buru.";
const SUARA_O3 = "Tiga cara itu: Hefting, Benchmark Weights, dan Zero Check.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Mengangkat dan Merasakan, Berat Acuan, dan Cek Angka Nol.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga cara tua juru pakan",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Cara Tua Juru Pakan"), ...lantai("lt", 150), kotak("mlm", 2, 24, 296, 126, "#1E3A8A", undefined, { rx: 0, tebal: 0, z: -1, op: 0.3 }), emo("bln", 40, 54, E.bulan, 18)),
      tambah("Lastri", ...tokoh("bl", 150, 184, "Bu Lastri")),
      tambah("tiga", teks("n3", 240, 76, "3 cara", 11, W.ungu)),
      tambah("tua", ...[0, 1, 2].flatMap((i) => [kotak(`c${i}-k`, 196 + i * 30, 100, 26, 30, KUNING_KARTU, W.biru, { rx: 4 }), teks(`c${i}-t`, 209 + i * 30, 119, "cara", 7, W.biru)])),
    ),
    k(
      SUARA_O2,
      tambah("cepat", emo("ic", 40, 100, E.cepat, 24)),
      tambah("cermat,", emo("im", 90, 100, E.cermat, 24)),
      tambah("terburu", emo("ib", 40, 140, E.buru, 24)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara Juru Pakan"), teks("n3", 260, 40, "3 cara", 10, W.ungu)),
      tambah("Hefting,", emo("ik1", 36, 62, E.tangan, 24), teks("m0", 70, 56, "1. Hefting", 10, W.biru, { anchor: "start" })),
      tambah("Benchmark", kotak("ik2", 20, 94, 32, 24, "#BFDBFE", W.biru, { rx: 4 }), teks("ik2t", 36, 110, "1 kg", 8, W.biru), teks("m1", 70, 106, "2. Benchmark Weights", 10, W.biru, { anchor: "start" })),
      tambah("Zero", bulat("ik3", 36, 152, 13, W.putih, W.biru), teks("ik3t", 36, 157, "0", 12, W.merah), teks("m2", 70, 156, "3. Zero Check", 10, W.biru, { anchor: "start" })),
    ),
    k(
      SUARA_O4,
      tambah("Mengangkat", teks("g0", 70, 69, "Mengangkat dan Merasakan", 8.4, W.ungu, { anchor: "start" })),
      tambah("Berat", teks("g1", 70, 119, "Berat Acuan", 8.4, W.ungu, { anchor: "start" })),
      tambah("Cek", teks("g2", 70, 169, "Cek Angka Nol", 8.4, W.ungu, { anchor: "start" })),
    ),
  ],
};

/* ------------------------------ Hefting (Mengangkat dan Merasakan): konsep ------------------------------ */
const SUARA_H1 = "Cara pertama, Hefting, atau Mengangkat dan Merasakan.";
const SUARA_H2 = "Sebelum menimbang, kita angkat dua benda dan merasakan mana yang lebih berat.";
const SUARA_H3 = "Lalu kita menimbang untuk memastikannya, supaya tidak keliru.";
const SUARA_H4 = "Rasa tangan membantu memperkirakan, tetapi timbangan yang menentukan.";

export const ADEGAN_LUAR_ANGKAT: AdeganStory = {
  id: "luar-angkat",
  judul: "Hefting: Mengangkat dan Merasakan",
  sumber: "Metode global: Hefting (konsep)",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Cara Pertama"), ...lantai("lt", 150), teks("nm", 150, 50, "Hefting", 16, W.biru)),
      tambah("Hefting,", emo("h1", 110, 110, E.tangan, 36), emo("h2", 190, 110, E.tangan, 36)),
      tambah("Mengangkat", teks("nm2", 150, 76, "Mengangkat dan Merasakan", 9, W.ungu)),
    ),
    k(
      SUARA_H2,
      hapus(0, "nm2"),
      tambah("angkat", kotak("kb1", 92, 118, 36, 26, "#BBF7D0", W.biru, { rx: 5 }), kotak("kb2", 172, 118, 36, 26, "#FDE68A", W.biru, { rx: 5 })),
      tambah("dua", teks("n2", 150, 150, "2 benda", 10, W.ungu)),
      ubah("berat.", { id: "kb2", y: 128 }, { id: "h2", y: 120 }),
    ),
    k(
      SUARA_H3,
      hapus(0, "n2"),
      tambah("menimbang", ...timbDigital("dg", 123, 44, "0", 54)),
      sorotkan("memastikannya,", "dg-s"),
      tambah("keliru.", emo("ok", 150, 150, E.benar, 22)),
    ),
    k(
      SUARA_H4,
      sorotkan("Rasa", "h1", "h2"),
      tambah("memperkirakan,", emo("tq", 150, 100, E.tanya, 22)),
      sorotkan("timbangan", "dg-s"),
      tambah("menentukan.", teks("pt", 150, 172, "timbangan yang pasti", 9, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ Hefting: terapan ------------------------------ */
const SUARA_HT1 = "Raka mengangkat sekantong biji dan sekantong jagung di kedua tangannya.";
const SUARA_HT2 = "Tangan yang memegang jagung turun lebih rendah, jadi jagung terasa lebih berat.";
const SUARA_HT3 = "Timbangan membenarkannya: jagung lima ratus gram, biji dua ratus gram.";
const SUARA_HT4 = "Cocok untuk memperkirakan cepat, tetapi kurang cocok kalau dua benda hampir sama berat, karena tangan sulit membedakan.";

export const ADEGAN_LUAR_ANGKAT_TERAPAN: AdeganStory = {
  id: "luar-angkat-terapan",
  judul: "Hefting: biji dan jagung",
  sumber: "Metode global: Hefting (terapan)",
  latar: "#FFEDD5",
  ketukan: [
    k(
      SUARA_HT1,
      tambah(0, judul("Biji dan Jagung"), ...lantai("lt", 150), ...tokoh("rk", 150, 184, "Raka")),
      tambah("biji", emo("bj", 100, 100, E.biji, 30)),
      tambah("jagung", emo("jg", 200, 100, E.jagung, 30)),
      tambah("tangannya.", emo("t1", 100, 132, E.tangan, 26), emo("t2", 200, 132, E.tangan, 26)),
    ),
    k(
      SUARA_HT2,
      ubah("turun", { id: "jg", y: 118 }, { id: "t2", y: 150 }),
      tambah("rendah,", panah("pd", 240, 96, 0, 28, W.merah, 2.4)),
      sorotkan("terasa", "jg"),
      tambah("berat.", teks("br", 200, 76, "lebih berat", 9, W.merah)),
    ),
    k(
      SUARA_HT3,
      hapus(0, "pd", "br"),
      tambah(0, emo("ok", 150, 92, E.benar, 22)),
      tambah("lima", teks("w1", 200, 60, "500 g", 12, W.biru)),
      tambah("dua", teks("w2", 100, 60, "200 g", 12, W.biru)),
    ),
    k(
      SUARA_HT4,
      hapus(0, "w1", "w2"),
      tambah("cepat,", emo("ic", 60, 90, E.cepat, 24)),
      ubah("hampir", { id: "jg", y: 100 }, { id: "t2", y: 132 }),
      tambah("dua", teks("n2", 150, 70, "2 benda", 10, W.ungu)),
      tambah("sulit", emo("tq", 250, 100, E.tanya, 24)),
    ),
  ],
};
