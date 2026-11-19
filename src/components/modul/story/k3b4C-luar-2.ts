import type { AdeganStory } from "./logika-story";
import { E, W, bulat, emo, garisAbs, judul, kartu, kotak, panji, poligon, pojok, rumput, tali, tandaSiku, teks, tiang, tokoh } from "./k3b4C-gambar";
import { bersih, k, redamkan, sorotkan, tambah, ubah } from "./k3b4C-bantu";

/*
 * Cerita orisinal IGIL "Lintasan Pak Samsul" (Kelas 3 Bab 4 Sub-Bab C), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b4c.md. Bagian ini: Fold and Match (Lipat dan Cocokkan), Shape Sort (Pilah Bangun), terapannya, dan ringkasan.
 */

/* ------------------------------ Fold and Match: konsep ------------------------------ */
const SUARA_L1 = "Cara kedua, Fold and Match, atau Lipat dan Cocokkan.";
const SUARA_L2 = "Kita melipat kertas dua kali supaya punya pojok siku-siku.";
const SUARA_L3 = "Pojok itu kita cocokkan dengan tempat dua garis bertemu.";
const SUARA_L4 = "Kalau pas, garisnya tegak lurus. Kalau tidak pas, bukan.";

export const ADEGAN_LUAR_LIPAT: AdeganStory = {
  id: "luar-lipat",
  judul: "Fold and Match atau Lipat dan Cocokkan",
  sumber: "Metode global: Lipat dan Cocokkan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Fold and Match")),
      tambah("Fold", kotak("kr", 100, 40, 100, 80, "#FEF9C3", W.kertasGaris, { rx: 2, tebal: 1.8 })),
      tambah("Match,", teks("nm", 150, 150, "Fold and Match", 13, W.coklat)),
      tambah("Cocokkan.", teks("nm2", 150, 168, "Lipat dan Cocokkan", 9, W.ungu)),
    ),
    k(
      SUARA_L2,
      tambah("melipat", garisAbs("f1", 150, 40, 150, 120, W.merah, 2, { putus: true })),
      tambah("dua", garisAbs("f2", 100, 80, 200, 80, W.merah, 2, { putus: true }), teks("n2", 250, 70, "2 kali", 10, W.merah)),
      tambah("pojok", pojok("pj", 150, 80, 26)),
      tambah("siku-siku.", tandaSiku("ts", 152, 80, 10), teks("sk", 150, 134, "pojok siku-siku", 9, W.hijauTua)),
    ),
    k(
      SUARA_L3,
      bersih(0),
      tambah(0, judul("Pojok Dicocokkan"), pojok("pj", 24, 150, 34)),
      tambah("cocokkan", garisAbs("v1", 170, 130, 170, 60, W.tali2, 4, { z: 1 }), garisAbs("v2", 170, 130, 250, 130, W.tali1, 4, { z: 1 })),
      ubah("cocokkan", { id: "pj", x: 170, y: 130 }),
      tambah("dua", teks("n2", 60, 70, "2 garis", 10, W.biru)),
      tambah("bertemu.", tandaSiku("ts", 172, 130, 10), teks("tt", 210, 110, "tempat bertemu", 9, W.coklat)),
    ),
    k(
      SUARA_L4,
      bersih(0),
      tambah(0, judul("Pas atau Tidak Pas"), garisAbs("a1", 40, 120, 116, 120, W.tali1, 4, { z: 1 }), garisAbs("a2", 40, 120, 40, 50, W.tali2, 4, { z: 1 }), pojok("p1", 40, 120, 30)),
      tambah("tegak", teks("t1", 78, 140, "tegak lurus", 10, W.hijauTua), emo("o1", 78, 160, E.benar, 22)),
      tambah("Kalau@2", garisAbs("b1", 190, 120, 266, 120, W.tali1, 4, { z: 1 }), garisAbs("b2", 190, 120, 225, 60, W.tali2, 4, { z: 1 }), pojok("p2", 190, 120, 30)),
      tambah("tidak", teks("t2", 228, 140, "tidak pas", 10, W.merah), emo("o2", 228, 160, E.salah, 22)),
      tambah("bukan.", teks("t3", 228, 86, "bukan", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ Fold and Match: terapan ------------------------------ */
const SUARA_M1 = "Salsa mencocokkan pojok kertas dengan tiang bendera dan tanah.";
const SUARA_M2 = "Pojok itu pas, jadi tiang dan tanah tegak lurus.";
const SUARA_M3 = "Cocok untuk memeriksa garis tegak lurus tanpa alat ukur.";
const SUARA_M4 = "Kurang cocok kalau garisnya berada di tempat yang sulit dijangkau kertas.";

export const ADEGAN_LUAR_LIPAT_TERAPAN: AdeganStory = {
  id: "luar-lipat-terapan",
  judul: "Salsa mencocokkan pojok kertas",
  sumber: "Metode global: terapan Lipat dan Cocokkan",
  latar: "#F7FEE7",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Salsa Memeriksa"), ...rumput("tn", 150), ...tokoh("sl", 40, 184, "Salsa")),
      tambah("pojok", pojok("pj", 80, 140, 34)),
      tambah("tiang", ...tiang("tg", 180, 140, 80)),
      tambah("tanah.", garisAbs("th", 110, 140, 270, 140, "#C08A4D", 5, { z: 0 })),
      ubah("tanah.", { id: "pj", x: 180, y: 140 }),
    ),
    k(
      SUARA_M2,
      tambah("pas,", emo("ok", 262, 100, E.benar, 24), teks("ps", 262, 82, "pas", 10, W.hijauTua)),
      sorotkan("tiang", "tg", "th"),
      tambah("tegak", tandaSiku("ts", 182, 140, 12), teks("tl", 232, 120, "tegak lurus", 10, W.merah)),
    ),
    k(
      SUARA_M3,
      bersih(0),
      tambah(0, judul("Tanpa Alat Ukur"), ...rumput("tn", 150), emo("kr", 90, 100, E.kertas, 36)),
      tambah("Cocok", emo("ok", 150, 100, E.benar, 30)),
      tambah("tanpa", emo("pg", 214, 100, "\u{1F4CF}", 36)),
      tambah("alat", emo("xs", 214, 100, E.salah, 30, { z: 5 })),
      tambah("ukur.", teks("tu", 214, 134, "tanpa alat ukur", 9, W.coklat)),
    ),
    k(
      SUARA_M4,
      bersih(0),
      tambah(0, judul("Tempat yang Sulit"), ...rumput("tn", 150)),
      tambah("garisnya", garisAbs("v1", 220, 150, 220, 40, W.tali2, 4, { z: 1 }), garisAbs("v2", 220, 40, 280, 40, W.tali1, 4, { z: 1 })),
      tambah("tempat", teks("tt", 250, 62, "di tempat tinggi", 9, W.merah)),
      tambah("sulit", ...tokoh("sl", 60, 184, "Salsa"), emo("kr", 100, 120, E.kertas, 26)),
      tambah("kertas.", emo("xs", 160, 80, E.salah, 28), garisAbs("pa", 108, 112, 150, 84, W.merah, 1.8, { putus: true })),
    ),
  ],
};

/* ------------------------------ Shape Sort: konsep ------------------------------ */
const SUARA_H1 = "Cara ketiga, Shape Sort, atau Pilah Bangun.";
const SUARA_H2 = "Kita memilah bangun dengan menghitung sisi dan sudutnya.";
const SUARA_H3 = "Tiga sisi dan tiga sudut berarti segitiga, empat sisi dan empat sudut siku-siku berarti persegi panjang.";
const SUARA_H4 = "Bangun tanpa sudut dan dibatasi garis lengkung adalah lingkaran.";

export const ADEGAN_LUAR_PILAH: AdeganStory = {
  id: "luar-pilah",
  judul: "Shape Sort atau Pilah Bangun",
  sumber: "Metode global: Pilah Bangun",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Shape Sort")),
      tambah("Shape", kotak("b1", 14, 56, 88, 64, W.langit, W.biru, { rx: 6 }), kotak("b2", 106, 56, 88, 64, W.hijauMuda, W.hijauTua, { rx: 6 }), kotak("b3", 198, 56, 88, 64, W.krem, W.coklat, { rx: 6 })),
      tambah("Sort,", teks("nm", 150, 150, "Shape Sort", 13, W.biru)),
      tambah("Bangun.", teks("nm2", 150, 168, "Pilah Bangun", 9, W.ungu)),
    ),
    k(
      SUARA_H2,
      bersih(0),
      tambah(0, judul("Memilah Bangun")),
      tambah("bangun", poligon("c1", [[54, 44], [30, 92], [78, 92]], W.emas, "#92400E", { tebal: 1.8 }), kotak("c2", 108, 52, 84, 40, "#FDE68A", "#92400E", { rx: 2, tebal: 1.8 }), bulat("c3", 246, 70, 24, "#FDBA74", "#9A3412", { tebal: 2 })),
      tambah("sisi", teks("hs", 150, 120, "hitung sisi", 10, W.biru)),
      tambah("sudutnya.", teks("hu", 150, 136, "hitung sudut", 10, W.biru)),
    ),
    k(
      SUARA_H3,
      bersih(0),
      tambah(0, judul("Menyebut dari Ciri")),
      tambah("Tiga", poligon("c1", [[50, 44], [30, 84], [70, 84]], W.emas, "#92400E", { tebal: 1.8 }), teks("a1", 100, 52, "3 sisi", 9.6, W.biru, { anchor: "start" })),
      tambah("tiga@2", teks("a2", 100, 66, "3 sudut", 9.6, W.biru, { anchor: "start" })),
      tambah("segitiga,", teks("a3", 100, 82, "segitiga", 10, W.merah, { anchor: "start" })),
      tambah("empat", kotak("c2", 26, 112, 50, 34, "#FDE68A", "#92400E", { rx: 2, tebal: 1.8 }), teks("b1", 100, 114, "4 sisi", 9.6, W.biru, { anchor: "start" })),
      tambah("empat@2", teks("b2", 100, 128, "4 sudut siku-siku", 9.6, W.biru, { anchor: "start" })),
      tambah("panjang.", teks("b3", 100, 144, "persegi panjang", 10, W.merah, { anchor: "start" })),
    ),
    k(
      SUARA_H4,
      bersih(0),
      tambah(0, judul("Lingkaran"), bulat("c3", 150, 90, 38, "#FDBA74", "#9A3412", { tebal: 2.4 })),
      tambah("sudut", teks("ts", 70, 150, "tanpa sudut", 10, W.biru)),
      tambah("lengkung", teks("gl", 230, 150, "garis lengkung", 10, W.biru)),
      sorotkan("lengkung", "c3"),
      tambah("lingkaran.", teks("nm", 150, 96, "lingkaran", 11, W.merah)),
    ),
  ],
};

/* ------------------------------ Shape Sort: terapan ------------------------------ */
const SUARA_Q1 = "Raka memilah panji, papan nama, dan spanduk bundar ke tiga kotak.";
const SUARA_Q2 = "Panji masuk kotak segitiga, papan nama masuk kotak persegi panjang, spanduk masuk kotak lingkaran.";
const SUARA_Q3 = "Cocok untuk menyebut nama bangun dari cirinya.";
const SUARA_Q4 = "Kurang cocok kalau bangunnya miring atau berubah, karena ciri sisi dan sudutnya harus dihitung teliti.";

export const ADEGAN_LUAR_PILAH_TERAPAN: AdeganStory = {
  id: "luar-pilah-terapan",
  judul: "Raka memilah panji, papan nama, dan spanduk",
  sumber: "Metode global: terapan Pilah Bangun",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Raka Memilah"), ...rumput("tn", 150), ...tokoh("rk", 36, 184, "Raka")),
      tambah("panji,", panji("pn", 34, 38, 36, 32, W.emas)),
      tambah("papan", kotak("pp", 112, 40, 60, 30, "#FDE68A", "#92400E", { rx: 2, tebal: 1.6 })),
      tambah("spanduk", bulat("sb", 250, 56, 18, "#FDBA74", "#9A3412", { tebal: 1.8 })),
      tambah("tiga", teks("n3", 150, 90, "3 kotak", 10, W.ungu), kotak("b1", 20, 98, 80, 44, W.langit, W.biru, { rx: 5 }), kotak("b2", 110, 98, 80, 44, W.hijauMuda, W.hijauTua, { rx: 5 }), kotak("b3", 200, 98, 80, 44, W.krem, W.coklat, { rx: 5 })),
    ),
    k(
      SUARA_Q2,
      ubah("Panji", { id: "pn", x: 42, y: 104 }),
      tambah("segitiga,", teks("m1", 60, 158, "segitiga", 9, W.merah)),
      ubah("papan", { id: "pp", x: 124, y: 108 }),
      tambah("persegi", teks("m2", 150, 158, "persegi panjang", 9, W.merah)),
      ubah("spanduk", { id: "sb", x: 240, y: 120 }),
      tambah("lingkaran.", teks("m3", 240, 158, "lingkaran", 9, W.merah)),
    ),
    k(
      SUARA_Q3,
      tambah("Cocok", emo("ok", 250, 60, E.benar, 24)),
      tambah("menyebut", teks("cb", 150, 56, "sebut nama bangun", 10, W.hijauTua)),
      tambah("cirinya.", teks("cc", 150, 76, "dari sisi dan sudutnya", 9, W.biru)),
    ),
    k(
      SUARA_Q4,
      bersih(0),
      tambah(0, judul("Bangun yang Berubah"), ...rumput("tn", 150)),
      tambah("bangunnya", poligon("mg", [[80, 110], [190, 110], [222, 62], [112, 62]], "#FDE68A", "#92400E", { tebal: 2 })),
      tambah("miring", teks("mr", 150, 130, "bangun miring", 10, W.merah)),
      tambah("ciri", teks("hc", 150, 146, "hitung sisi dan sudut", 9, W.biru)),
      tambah("teliti.", emo("xs", 150, 176, E.tanya, 24)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita lihat. Mana yang pas tergantung keadaan.";
const SUARA_R2 = "Ingin memeriksa garis sejajar, pakai Cek Kertas Petak. Ingin memeriksa garis tegak lurus, pakai Lipat dan Cocokkan.";
const SUARA_R3 = "Ingin menyebut nama bangun, pakai Pilah Bangun. Apa pun caranya, periksa dengan teliti sebelum menyebutnya.";
const SUARA_R4 = "Menurutmu, untuk memeriksa dua tali lintasan sejajar atau tidak, cara mana yang paling pas?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Ringkasan: tiga cara memeriksa garis dan bangun",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Mana yang Pas?"), teks("n3", 252, 44, "3 cara", 10, W.ungu)),
      tambah("cara", ...kartu("r0", 14, 60, 88, 46, W.langit, ["Cek", "Kertas Petak"], 9), ...kartu("r1", 106, 60, 88, 46, W.hijauMuda, ["Lipat dan", "Cocokkan"], 9), ...kartu("r2", 198, 60, 88, 46, W.krem, ["Pilah", "Bangun"], 9)),
      tambah("Mana", emo("tq", 150, 150, E.tanya, 30)),
    ),
    k(
      SUARA_R2,
      { at: 0, hapus: ["tq"] },
      sorotkan("Cek", "r0-k"),
      tambah("sejajar,", teks("g0", 58, 128, "garis sejajar", 9, W.hijauTua)),
      redamkan("Ingin@2", "r0-k"),
      sorotkan("Lipat", "r1-k"),
      tambah("lurus,", teks("g1", 150, 128, "garis tegak lurus", 9, W.hijauTua)),
    ),
    k(
      SUARA_R3,
      redamkan("Ingin", "r1-k"),
      sorotkan("Pilah", "r2-k"),
      tambah("bangun,", teks("g2", 242, 128, "nama bangun", 9, W.hijauTua)),
      tambah("periksa", teks("ss", 150, 172, "periksa dengan teliti", 10, W.ungu)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Cara yang Paling Pas?"), ...rumput("tn", 150), ...tokoh("ps", 40, 184, "Pak Samsul")),
      tambah("dua", teks("q2", 190, 50, "2 tali", 10, W.biru), ...tali("q1", 90, 70, 250, 70, W.tali1)),
      tambah("tali", ...tali("q3", 90, 104, 250, 104, W.tali2)),
      tambah("sejajar", teks("qs", 170, 130, "sejajar?", 11, W.merah)),
      tambah("cara", emo("tq", 270, 90, E.tanya, 34)),
    ),
  ],
};
