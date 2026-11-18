import type { AdeganStory } from "./logika-story";
import { E, W, bulat, cermin, daun, emo, garis, idCermin, idPitaBar, judul, kartu, kotak, panah, pitaBar, poligon, rumput, teks, tokoh } from "./k2b5A-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k2b5A-bantu";

/*
 * Cerita orisinal IGIL "Semangka Raksasa Pak Danu" (Kelas 2 Bab 5 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k2b5a.md. Bagian ini: Mirror Test (Uji Cermin), Fraction Strips (Pita Pecahan), terapannya, dan ringkasan.
 */

const WK_HIJAU = "#166534";

/* ------------------------------ Mirror Test: konsep ------------------------------ */
const SUARA_C1 = "Cara kedua, Mirror Test, atau Uji Cermin.";
const SUARA_C2 = "Letakkan cermin kecil tepat di garis pembagi gambar.";
const SUARA_C3 = "Kalau bayangan bagian yang satu persis seperti bagian yang lain, garis itu membagi dua sama besar.";
const SUARA_C4 = "Kalau bayangannya miring atau tidak pas, bagiannya tidak sama besar.";

export const ADEGAN_LUAR_CERMIN: AdeganStory = {
  id: "luar-cermin",
  judul: "Mirror Test: Uji Cermin",
  sumber: "Metode global: Mirror Test (konsep)",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 2: Mirror Test"), rumput("rm", 150)),
      tambah("Mirror", ...cermin("cm", 143, 58, 14, 80)),
      tambah("Test,", teks("nm", 150, 172, "Uji Cermin", 11, W.ungu)),
      tambah("Uji", ...kartu("kc", 74, 30, 152, 22, W.putih, ["bayangan harus pas"], 9)),
    ),
    k(
      SUARA_C2,
      hapus(0, ...idCermin("cm"), "nm", "kc-k", "kc-t0"),
      tambah("Letakkan", kotak("gm", 70, 62, 160, 72, "#FEF3C7", W.biru, { rx: 3, tebal: 2.4 })),
      tambah("cermin", ...cermin("cm2", 146.5, 56, 7, 84)),
      tambah("garis", garis("gg", 150, 60, 0, 76, W.merah, 2, { putus: true, z: 4 })),
      tambah("gambar.", emo("kc", 150, 176, E.kaca, 26)),
    ),
    k(
      SUARA_C3,
      hapus(0, "kc"),
      tambah("bayangan", poligon("bg", [[84, 74], [146, 74], [146, 122], [84, 122]], "#FDE68A", W.biru, { z: 1 })),
      tambah("satu", teks("n1", 115, 160, "bagian 1", 9, W.ungu)),
      tambah("persis", poligon("by", [[154, 74], [216, 74], [216, 122], [154, 122]], "#DDD6FE", W.ungu, { putus: true, z: 1 }), teks("n1b", 185, 160, "bayangan", 9, W.ungu), emo("ok", 150, 182, E.benar, 20)),
      sorotkan("garis", "gg"),
      tambah("dua", teks("n2", 150, 50, "2 bagian sama", 9, W.hijau)),
    ),
    k(
      SUARA_C4,
      hapus(0, "by", "n1b", "ok", "n2"),
      tambah("bayangannya", poligon("by2", [[154, 74], [222, 92], [222, 132], [154, 120]], "#DDD6FE", W.ungu, { putus: true, z: 1 })),
      tambah("miring", teks("lm", 190, 160, "miring", 9, W.merah)),
      tambah("tidak", emo("xp", 150, 182, E.salah, 20)),
      tambah("bagiannya", teks("tb", 150, 50, "tidak sama besar", 9, W.merah)),
    ),
  ],
};

/* ------------------------------ Mirror Test: terapan ------------------------------ */
const SUARA_T1 = "Nia meletakkan cermin di tengah gambar daun. Bayangannya persis daun yang utuh.";
const SUARA_T2 = "Jadi garis itu membagi daun menjadi dua bagian yang sama.";
const SUARA_T3 = "Cocok kalau gambarnya rapi dan kita ingin memeriksa garis dengan cepat.";
const SUARA_T4 = "Kurang cocok kalau bentuknya tidak beraturan, karena bayangannya tidak pernah pas.";

export const ADEGAN_LUAR_CERMIN_TERAPAN: AdeganStory = {
  id: "luar-cermin-terapan",
  judul: "Mirror Test: Nia menguji daun",
  sumber: "Metode global: Mirror Test (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Nia Menguji Daun"), rumput("rm", 150)),
      tambah("Nia", ...tokoh("ni", 40, 182, "Nia")),
      tambah("meletakkan", ...daun("dn", 170, 100, 38)),
      tambah("cermin", ...cermin("cm", 166.5, 52, 7, 96)),
      tambah("daun.", emo("pk", 240, 120, E.kaca, 24)),
      tambah("Bayangannya", poligon("by", [[170, 62], [190.9, 84.8], [187.1, 115.2], [170, 138]], "#DDD6FE", W.ungu, { putus: true, z: 2 })),
      tambah("utuh.", emo("ok", 232, 80, E.benar, 24)),
    ),
    k(
      SUARA_T2,
      hapus(0, "ok"),
      sorotkan("garis", "dn-t"),
      tambah("membagi", poligon("hl", [[170, 62], [149.1, 84.8], [152.9, 115.2], [170, 138]], "#BBF7D0", WK_HIJAU, { z: 2 })),
      tambah("dua", teks("n2", 250, 66, "2 bagian", 10, W.ungu)),
      tambah("sama.", teks("sm", 250, 88, "sama besar", 10, W.hijau)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?")),
      tambah("Cocok", emo("ok", 236, 84, E.benar, 28)),
      tambah("gambarnya", ...kartu("gr", 40, 66, 130, 24, W.hijauMuda, ["gambar rapi"], 10), ...daun("dn2", 205, 130, 24)),
      tambah("memeriksa", emo("kc", 60, 150, E.kaca, 28)),
      tambah("cepat.", emo("sk", 120, 160, E.sorak, 26)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?")),
      tambah("Kurang", emo("xs", 236, 84, E.salah, 28)),
      tambah("bentuknya", poligon("ir", [[60, 108], [100, 88], [130, 118], [112, 150], [70, 140]], "#FCA5A5", W.biru, { tebal: 2 })),
      tambah("beraturan,", teks("tb", 100, 176, "tidak beraturan", 9, W.merah)),
      tambah("bayangannya", poligon("bi", [[160, 100], [202, 92], [218, 130], [186, 152], [166, 140]], "#DDD6FE", W.ungu, { putus: true, tebal: 2 })),
      tambah("pas.", emo("tq", 190, 68, E.tanya, 28)),
    ),
  ],
};
/* ------------------------------ Fraction Strips: konsep ------------------------------ */
const SUARA_P1 = "Cara ketiga, Fraction Strips, atau Pita Pecahan.";
const SUARA_P2 = "Siapkan dua pita sama panjang. Satu pita dibiarkan utuh, dan satu pita dilipat menjadi dua.";
const SUARA_P3 = "Pita yang dilipat dibuka, dan setiap bagiannya disebut setengah.";
const SUARA_P4 = "Letakkan di bawah pita utuh, dan dua bagian itu menutupi pita utuh dengan pas.";

export const ADEGAN_LUAR_PITA: AdeganStory = {
  id: "luar-pita",
  judul: "Fraction Strips: Pita Pecahan",
  sumber: "Metode global: Fraction Strips (konsep)",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Cara 3: Fraction Strips"), rumput("rm", 150)),
      tambah("Fraction", ...pitaBar("pt", 50, 80, 200, "#F9A8D4", 8)),
      tambah("Strips,", emo("pi", 150, 62, E.pita, 24)),
      tambah("Pita", teks("nm", 150, 128, "Pita Pecahan", 11, W.ungu)),
    ),
    k(
      SUARA_P2,
      hapus(0, ...idPitaBar("pt"), "pi", "nm"),
      tambah("dua", teks("n2", 250, 44, "2 pita", 10, W.ungu)),
      tambah("pita", ...pitaBar("p1", 50, 70, 200, "#F9A8D4", 8)),
      tambah("sama", ...pitaBar("p2", 50, 106, 200, "#F9A8D4", 8)),
      tambah("Satu", teks("l1", 150, 64, "1 pita utuh", 9, W.ungu)),
      tambah("dilipat", garis("fl", 150, 100, 0, 26, W.merah, 2.4, { putus: true, z: 3 }), teks("l2", 150, 140, "1 pita dilipat", 9, W.ungu)),
      tambah("dua.", teks("n3", 150, 158, "jadi 2 bagian", 9, W.ungu)),
    ),
    k(
      SUARA_P3,
      hapus("dibuka,", "fl"),
      ubah("dibuka,", { id: "p2", warna: "#FBCFE8" }),
      tambah("setiap", teks("s1", 100, 117, "setengah", 8, WK_HIJAU), teks("s2", 200, 117, "setengah", 8, WK_HIJAU)),
      tambah("setengah.", emo("ok", 150, 182, E.benar, 20)),
    ),
    k(
      SUARA_P4,
      hapus(0, ...idPitaBar("p2"), "l2", "n3", "s1", "s2", "ok"),
      tambah("Letakkan", kotak("a1", 50, 86, 100, 14, "#FBCFE8", W.biru, { rx: 2, tebal: 1.4, z: 1 }), kotak("a2", 150, 86, 100, 14, "#F9A8D4", W.biru, { rx: 2, tebal: 1.4, z: 1 })),
      tambah("dua", teks("n4", 250, 118, "2 bagian", 9, W.ungu)),
      tambah("menutupi", garis("al", 50, 66, 0, 38, W.ungu, 1.4, { putus: true, z: 3 }), garis("ar", 250, 66, 0, 38, W.ungu, 1.4, { putus: true, z: 3 })),
      tambah("pas.", emo("ok2", 150, 150, E.benar, 24)),
    ),
  ],
};

/* ------------------------------ Fraction Strips: terapan ------------------------------ */
const SUARA_Q1 = "Chacha meletakkan satu pita setengah di bawah pita utuh. Terlihat jelas panjangnya hanya separuh.";
const SUARA_Q2 = "Dika menambahkan pita setengah yang lain, dan keduanya pas menutupi pita utuh.";
const SUARA_Q3 = "Cocok kalau kita ingin membandingkan bagian dengan seluruhnya.";
const SUARA_Q4 = "Kurang cocok kalau bendanya bulat seperti lingkaran, karena pita yang lurus sulit dipakai.";

export const ADEGAN_LUAR_PITA_TERAPAN: AdeganStory = {
  id: "luar-pita-terapan",
  judul: "Fraction Strips: Chacha dan pita",
  sumber: "Metode global: Fraction Strips (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Chacha dan Pita"), rumput("rm", 150)),
      tambah("Chacha", ...tokoh("ch", 40, 182, "Chacha")),
      tambah("meletakkan", ...pitaBar("u", 60, 72, 200, "#F9A8D4", 8), teks("lu", 160, 66, "pita utuh", 9, W.ungu)),
      tambah("satu", teks("n1", 110, 124, "1 pita setengah", 9, W.ungu)),
      tambah("setengah", ...pitaBar("s1", 60, 90, 100, "#FBCFE8", 4)),
      tambah("separuh.", teks("sp", 212, 100, "hanya separuh", 9, W.merah)),
    ),
    k(
      SUARA_Q2,
      hapus(0, "sp"),
      tambah("Dika", ...tokoh("dk", 88, 182, "Dika")),
      tambah("setengah", ...pitaBar("s2", 160, 90, 100, "#F9A8D4", 4)),
      tambah("pas", emo("ok", 160, 134, E.benar, 24)),
    ),
    k(
      SUARA_Q3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?")),
      tambah("Cocok", emo("ok", 236, 84, E.benar, 28)),
      tambah("membandingkan", ...pitaBar("cu", 50, 76, 160, "#F9A8D4", 8)),
      tambah("bagian", ...pitaBar("ch", 50, 98, 80, "#FBCFE8", 4)),
      tambah("seluruhnya.", ...kartu("cb", 50, 130, 160, 24, W.hijauMuda, ["bagian dan seluruhnya"], 9)),
    ),
    k(
      SUARA_Q4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?")),
      tambah("Kurang", emo("xs", 236, 84, E.salah, 28)),
      tambah("bulat", bulat("lg", 100, 120, 30, "#FDE68A", W.biru, { tebal: 2 })),
      tambah("pita", ...pitaBar("lp", 150, 110, 110, "#F9A8D4", 5)),
      tambah("lurus", emo("tq", 190, 160, E.tanya, 28)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_G1 = "Kita sudah melihat tiga cara. Mana yang pas? Itu tergantung bendanya.";
const SUARA_G2 = "Ingin membagi benda yang bisa dipotong, pakai Berbagi Adil. Ingin memeriksa garis pembagi, pakai Uji Cermin.";
const SUARA_G3 = "Ingin membandingkan bagian dengan seluruhnya, pakai Pita Pecahan. Apa pun caranya, setengah harus sama besar.";
const SUARA_G4 = "Menurutmu, untuk membagi selembar kertas menjadi setengah, kamu pilih cara yang mana?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Ringkasan metode global",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Tiga Cara, Satu Tugas")),
      tambah("melihat", ...kartu("r0", 20, 40, 200, 28, W.langit, ["1. Berbagi Adil"], 11)),
      tambah("tiga", teks("t3", 262, 138, "3 cara", 10, W.ungu), ...kartu("r1", 20, 80, 200, 28, W.hijauMuda, ["2. Uji Cermin"], 11)),
      tambah("cara.", ...kartu("r2", 20, 120, 200, 28, W.pink, ["3. Pita Pecahan"], 11)),
      tambah("pas?", emo("tq", 262, 172, E.tanya, 30)),
    ),
    k(
      SUARA_G2,
      sorotkan("membagi", "r0-k"),
      tambah("benda", emo("jg", 262, 56, E.jagung, 26)),
      tambah("Berbagi", panah("o0", 224, 54, 22, 0, W.ungu, 2.6)),
      redamkan("Ingin@2", "r0-k"),
      sorotkan("memeriksa", "r1-k"),
      tambah("pembagi,", emo("kc", 262, 104, E.kaca, 26)),
      tambah("Uji", panah("o1", 224, 98, 22, 0, W.ungu, 2.6)),
    ),
    k(
      SUARA_G3,
      hapus(0, "jg", "o0", "kc", "o1", "tq", "t3"),
      redamkan(0, "r1-k"),
      sorotkan("membandingkan", "r2-k"),
      tambah("Pita", emo("pi", 262, 140, E.pita, 28), panah("o2", 224, 134, 22, 0, W.ungu, 2.6)),
      tambah("setengah", ...kartu("kk", 20, 160, 260, 28, W.hijauMuda, ["setengah harus sama besar"], 10)),
    ),
    k(
      SUARA_G4,
      bersih(0),
      tambah(0, judul("Kertas Jadi Setengah")),
      tambah("selembar", kotak("kt", 100, 36, 100, 70, W.putih, W.biru, { rx: 2, tebal: 2.4 })),
      tambah("setengah,", garis("gk", 150, 32, 0, 78, W.merah, 2.2, { putus: true, z: 3 })),
      tambah("cara", ...kartu("o0", 14, 126, 86, 28, W.langit, ["Berbagi Adil"], 8.6), ...kartu("o1", 107, 126, 86, 28, W.hijauMuda, ["Uji Cermin"], 8.6), ...kartu("o2", 200, 126, 86, 28, W.pink, ["Pita Pecahan"], 8.6)),
      tambah("mana?", emo("tq", 150, 180, E.tanya, 26)),
    ),
  ],
};

