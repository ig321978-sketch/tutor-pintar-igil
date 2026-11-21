import type { AdeganStory } from "./logika-story";
import { E, K, W, bagianKain, emo, garis, garisBil, jepitan, judul, kartu, panah, papanTulis, pecahan, teks, tokoh } from "./k4b2a-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah } from "./k4b2a-bantu";

/*
 * Cerita orisinal IGIL "Kain Lipat Bu Wulan" (Kelas 4 Bab 2 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b2a.md. Bagian ini: Fold the Paper (Lipat Kertas), Fraction Number Line (Garis Pecahan), dan ringkasan.
 */

/* ------------------------------ Fold the Paper: konsep ------------------------------ */
const SUARA_L1 = "Cara kedua, Fold the Paper, atau Lipat Kertas.";
const SUARA_L2 = "Selembar kertas kita lipat menjadi bagian sama besar, sesuai penyebut yang kita mau.";
const SUARA_L3 = "Setelah dilipat, bagian yang kita arsir adalah pembilangnya, yaitu satu bagian.";
const SUARA_L4 = "Lipatan membantu kita yakin bahwa semua bagian benar-benar sama besar.";

export const ADEGAN_LUAR_LIPAT: AdeganStory = {
  id: "luar-lipat",
  judul: "Fold the Paper: Lipat Kertas",
  sumber: "Metode global: Fold the Paper (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Cara 2: Fold the Paper"), ...papanTulis("pt", 8, 28, 284, 132)),
      tambah("Fold", teks("nm", 150, 56, "Fold the Paper", 13, K.kapurMerah)),
      tambah("Lipat", teks("ni", 150, 76, "Lipat Kertas", 11, K.kapur), ...bagianKain("ky", 110, 92, 80, 50, 1, [])),
    ),
    k(
      SUARA_L2,
      tambah("lipat", ...bagianKain("ky", 110, 92, 80, 50, 3, [])),
      sorotkan("besar,", "ky-c0", "ky-c1", "ky-c2"),
      tambah("penyebut", teks("sy", 150, 86, "sesuai penyebut", 8, K.kapurBiru)),
    ),
    k(
      SUARA_L3,
      hapus(0, "sy"),
      redamkan(0, "ky-c0", "ky-c1", "ky-c2"),
      tambah("arsir", ...bagianKain("ky", 110, 92, 80, 50, 3, [0])),
      tambah("pembilangnya,", teks("pl", 232, 104, "pembilang", 9, K.kapurMerah), panah("pa", 206, 104, -14, 0, K.kapurMerah, 1.6)),
      tambah("satu", teks("s1", 232, 122, "1 bagian", 9, K.kapur)),
    ),
    k(
      SUARA_L4,
      tambah("membantu", emo("ok", 60, 112, E.benar, 20)),
      sorotkan("semua", "ky-c0", "ky-c1", "ky-c2"),
      tambah("sama", teks("sm", 60, 134, "sama besar", 9, K.kapurBiru)),
    ),
  ],
};

/* ------------------------------ Fold the Paper: terapan ------------------------------ */
const SUARA_T1 = "Genta melipat kertas menjadi dua, lalu empat, lalu delapan bagian.";
const SUARA_T2 = "Setiap lipatan membuat satu bagian menjadi setengah dari bagian sebelumnya.";
const SUARA_T3 = "Cocok untuk memahami mengapa penyebut lebih besar membuat bagian lebih kecil.";
const SUARA_T4 = "Kurang cocok untuk penyebut seperti tujuh, karena melipat kertas menjadi tujuh bagian sama besar itu sulit.";

export const ADEGAN_LUAR_LIPAT_TERAPAN: AdeganStory = {
  id: "luar-lipat-terapan",
  judul: "Lipat Kertas: kapan cocok",
  sumber: "Metode global: Fold the Paper (terapan)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Lipat Kertas Genta"), ...papanTulis("pt", 8, 28, 284, 124), ...tokoh("ge", 40, 184, "Genta")),
      tambah("dua,", ...bagianKain("r2", 60, 44, 200, 22, 2, [0]), teks("m2", 38, 59, "2", 10, K.kapur)),
      tambah("empat,", ...bagianKain("r4", 60, 76, 200, 22, 4, [0]), teks("m4", 38, 91, "4", 10, K.kapur)),
      tambah("delapan", ...bagianKain("r8", 60, 108, 200, 22, 8, [0]), teks("m8", 38, 123, "8", 10, K.kapur)),
    ),
    k(
      SUARA_T2,
      tambah("lipatan", panah("a1", 274, 68, 0, 6, K.kapurMerah, 2), panah("a2", 274, 100, 0, 6, K.kapurMerah, 2)),
      tambah("setengah", teks("sg", 150, 40, "tiap bagian jadi 1/2 dari sebelumnya", 8, K.kapurBiru)),
      sorotkan("sebelumnya.", "r2-c0", "r4-c0", "r8-c0"),
    ),
    k(
      SUARA_T3,
      hapus(0, "sg"),
      tambah("Cocok", emo("ok", 28, 52, E.benar, 20)),
      tambah("penyebut", teks("pk", 150, 40, "penyebut besar, bagian kecil", 9, K.kapur)),
      redamkan("kecil.", "r2-c0", "r4-c0"),
    ),
    k(
      SUARA_T4,
      hapus(0, "ok", "pk"),
      tambah("Kurang", emo("xs", 280, 52, E.salah, 18)),
      tambah("tujuh,", teks("t7", 150, 36, "penyebut 7?", 11, K.kapurMerah)),
      tambah("melipat", emo("kr", 272, 52, E.keringat, 18)),
      tambah("sulit.", teks("sl", 150, 144, "sulit sama besar", 9, K.kapur)),
    ),
  ],
};

/* ------------------------------ Fraction Number Line: konsep ------------------------------ */
const SUARA_G1 = "Cara ketiga, Fraction Number Line, atau Garis Pecahan.";
const SUARA_G2 = "Kita menarik garis dari nol sampai satu, lalu membaginya menjadi bagian sama panjang.";
const SUARA_G3 = "Setiap tanda pada garis adalah sebuah pecahan, dan makin ke kanan makin besar.";
const SUARA_G4 = "Dengan garis, kita bisa mengurutkan banyak pecahan sekaligus.";
const GBK = garisBil("gb", 40, 116, 220, 0);

export const ADEGAN_LUAR_GARIS: AdeganStory = {
  id: "luar-garis",
  judul: "Fraction Number Line: Garis Pecahan",
  sumber: "Metode global: Fraction Number Line (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Cara 3: Fraction Number Line"), ...papanTulis("pt", 8, 28, 284, 132)),
      tambah("Fraction", teks("nm", 150, 56, "Fraction Number Line", 13, K.kapurMerah)),
      tambah("Garis", teks("ni", 150, 76, "Garis Pecahan", 11, K.kapur)),
    ),
    k(
      SUARA_G2,
      tambah("garis", ...GBK.slice(0, 3)),
      tambah("nol", GBK[3]),
      tambah("satu", GBK[4]),
      tambah("membaginya", ...garisBil("gb", 40, 116, 220, 4)),
    ),
    k(
      SUARA_G3,
      tambah("tanda", teks("e4", 95, 100, "1/4", 9, K.kapur), teks("e2", 150, 100, "1/2", 9, K.kapur)),
      tambah("pecahan,", emo("tj", 272, 56, E.jari, 16)),
      tambah("kanan", panah("ar", 70, 140, 150, 0, K.kapurMerah, 2)),
      tambah("besar.", teks("mb", 220, 152, "makin besar", 8, K.kapurMerah)),
    ),
    k(
      SUARA_G4,
      hapus(0, "tj", "mb"),
      tambah("mengurutkan", jepitan("jx", 95, 116), jepitan("jy", 150, 116)),
      tambah("pecahan", emo("mt", 272, 56, E.mata, 18)),
      tambah("sekaligus.", jepitan("jz", 205, 116), teks("bk", 150, 152, "banyak pecahan sekaligus", 8, K.kapur)),
    ),
  ],
};

/* ------------------------------ Fraction Number Line: terapan ------------------------------ */
const SUARA_N1 = "Satria menjepit tanda satu per delapan, satu per empat, dan satu per dua pada garis.";
const SUARA_N2 = "Urutan jepitan dari kiri ke kanan adalah urutan dari yang terkecil.";
const SUARA_N3 = "Cocok untuk mengurutkan tiga pecahan atau lebih, karena posisinya langsung terlihat.";
const SUARA_N4 = "Kurang cocok kalau garisnya digambar sembarangan, karena bagian yang tidak sama panjang menyesatkan.";
const GBT = garisBil("gt", 30, 100, 240, 0);

export const ADEGAN_LUAR_GARIS_TERAPAN: AdeganStory = {
  id: "luar-garis-terapan",
  judul: "Garis Pecahan: kapan cocok",
  sumber: "Metode global: Fraction Number Line (terapan)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Garis Pecahan Satria"), ...papanTulis("pt", 8, 28, 284, 124), ...tokoh("sa", 40, 184, "Satria"), ...GBT),
      tambah("delapan,", jepitan("j8", 60, 100), ...pecahan("f8", 60, 70, 8, 12, K.kapur)),
      tambah("empat,", jepitan("j4", 90, 100), ...pecahan("f4", 90, 70, 4, 12, K.kapur)),
      tambah("dua", jepitan("j2", 150, 100), ...pecahan("f2", 150, 70, 2, 12, K.kapur)),
    ),
    k(
      SUARA_N2,
      tambah("kiri", teks("lk", 50, 134, "kiri", 9, K.kapurBiru)),
      tambah("kanan", teks("lr", 250, 134, "kanan", 9, K.kapurBiru), panah("ar", 70, 120, 160, 0, K.kapurMerah, 2)),
      tambah("terkecil.", teks("tk", 150, 144, "terkecil ke terbesar", 8, K.kapur)),
    ),
    k(
      SUARA_N3,
      hapus(0, "lk", "lr", "ar", "tk"),
      tambah("Cocok", emo("ok", 28, 52, E.benar, 20)),
      tambah("tiga", teks("n3", 222, 46, "3 pecahan atau lebih", 8, K.kapur)),
      sorotkan("terlihat.", "j8", "j4", "j2"),
    ),
    k(
      SUARA_N4,
      bersih(0),
      tambah(0, judul("Garis Pecahan Satria"), ...papanTulis("pt", 8, 28, 284, 124), ...tokoh("sa", 40, 184, "Satria")),
      tambah("Kurang", emo("xs", 28, 52, E.salah, 20)),
      tambah("garisnya", garis("gu-l", 24, 100, 252, 0, K.kapur, 2.4, { z: 1 }), ...[40, 62, 128, 150, 262].map((x) => garis(`gu-t${x}`, x, 94, 0, 12, K.kapurBiru, 1.8, { z: 2 }))),
      tambah("tidak", teks("tg", 150, 76, "bagian tidak sama panjang", 9, K.kapurMerah)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita lihat bersama Bu Wulan. Mana yang pas tergantung keadaan.";
const SUARA_R2 = "Ingin membandingkan dua pecahan dengan cepat, pakai Pita Pecahan. Ingin tahu alasan bagian makin kecil, pakai Lipat Kertas.";
const SUARA_R3 = "Ingin mengurutkan banyak pecahan, pakai Garis Pecahan. Apa pun caranya, pastikan bagian-bagiannya sama besar.";
const SUARA_R4 = "Menurutmu, untuk mengurutkan empat potongan kain berbeda, cara mana yang paling pas?";
const KARTU_CARA = ["Pita Pecahan", "Lipat Kertas", "Garis Pecahan"];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Ringkasan metode global",
  latar: "#FAF5FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Ringkasan"), teks("n3", 150, 36, "3 cara", 10, W.ungu), ...KARTU_CARA.flatMap((c, i) => kartu(`r${i}`, 14 + i * 92, 44, 88, 40, ["#DBEAFE", "#DCFCE7", "#FEF9C3"][i], [c], 9))),
      tambah("Bu", ...tokoh("bw", 40, 184, "Bu Wulan")),
      tambah("pas", emo("tq", 150, 140, E.tanya, 22)),
    ),
    k(
      SUARA_R2,
      hapus(0, "tq"),
      tambah("dua", teks("n2", 150, 112, "2 pecahan", 9, W.coklat)),
      tambah("cepat,", emo("ok1", 58, 108, E.benar, 18)),
      sorotkan("Pita", "r0-k"),
      redamkan("Ingin@2", "r0-k"),
      sorotkan("Lipat", "r1-k"),
      tambah("Kertas.", emo("ok2", 150, 150, E.benar, 18)),
    ),
    k(
      SUARA_R3,
      hapus(0, "n2"),
      redamkan(0, "r1-k"),
      sorotkan("Garis", "r2-k"),
      tambah("Apa", emo("ok3", 242, 108, E.benar, 18)),
      tambah("sama", teks("sb", 150, 130, "bagian sama besar", 10, W.merah)),
    ),
    k(
      SUARA_R4,
      hapus(0, "n3", "ok1", "ok2", "ok3", "sb"),
      redamkan(0, "r2-k"),
      tambah("empat", teks("n4", 150, 92, "4 potongan", 10, W.coklat)),
      tambah("potongan", teks("tq2", 150, 134, "?", 40, W.merah)),
      tambah("cara", emo("kn", 90, 128, "\u{1F9E3}", 22)),
    ),
  ],
};
