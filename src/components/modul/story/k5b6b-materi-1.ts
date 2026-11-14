import type { AdeganStory, Obj } from "./logika-story";
import { W, bulat, emo, garis, ide, jalur, kartu, kertasSiku, kotak, sudut, tanda, tandaSiku, teks } from "./k5b6b-gambar";
import { bersih, k, tambah, ubah } from "./k5b6b-bantu";

/* ------------------------------ 1. Pembuka Sub-Bab B (hlm. 170; Panduan Guru hlm. 257-258) ------------------------------ */
export const ADEGAN_PEMBUKA_B: AdeganStory = {
  id: "pembuka-b",
  judul: "Pembuka Sub-Bab B: pengertian sudut",
  sumber: "Buku Siswa hlm. 170; Buku Panduan Guru hlm. 257–258",
  latar: "#EEF2FF",
  kutipan: ["B. Pengertian Sudut", "Apa sebenarnya sudut itu", "Apakah setiap pojok benda dapat", "memahami bagian-bagian sudut", "menyebutkan jenis-jenis sudut", "mengelompokkan sudut berdasarkan ciri-cirinya", "kertas yang dilipat membentuk sudut siku-siku", "Sudut seperti apa yang disebut sudut"],
  ketukan: [
    k(
      "Selamat datang di Sub-Bab B, pengertian sudut. Di sub-bab sebelumnya kita sudah belajar sudut siku-siku dari pojok bingkai foto dan lipatan kertas.",
      tambah(0, teks("jud", 150, 24, "Sub-Bab B: Pengertian Sudut", 12.5, W.ungu)),
      tambah("bingkai", kotak("bk", 30, 54, 100, 72, W.putih, W.jeruk, { tebal: 4, rx: 0 }), tandaSiku("bks", 30, 126, 0, 9), teks("bkt", 80, 146, "pojok bingkai", 8.6, W.biru)),
      tambah("lipatan", kertasSiku("kl", 180, 126, 0, 66), tandaSiku("kls", 180, 126, 0, 9), teks("klt", 215, 146, "lipatan kertas", 8.6, W.biru)),
    ),
    k(
      "Buku bertanya, apa sebenarnya sudut itu? Apakah setiap pojok benda dapat dikatakan sebagai sudut? Pertanyaan ini kita jawab sekarang.",
      bersih(0),
      tambah(0, teks("jud", 150, 26, "Apa itu sudut?", 13, W.ungu)),
      tambah("Apakah", kartu("q", 25, 46, 250, 50, W.krem, ["Apakah setiap pojok benda", "dapat dikatakan sebagai sudut?"], 9.4)),
      tambah("jawab", teks("qq", 150, 160, "?", 48, W.merah)),
    ),
    k(
      "Setelah mempelajari bagian ini, kita dapat memahami bagian-bagian sudut, menyebutkan jenis-jenis sudut, dan mengelompokkan sudut berdasarkan ciri-cirinya.",
      bersih(0),
      tambah(0, teks("jud", 150, 26, "Pengalaman belajar", 13, W.ungu)),
      tambah("memahami", kartu("g1", 30, 44, 240, 34, W.hijauMuda, ["memahami bagian-bagian sudut"], 9.2)),
      tambah("menyebutkan", kartu("g2", 30, 88, 240, 34, W.muda, ["menyebutkan jenis-jenis sudut"], 9.2)),
      tambah("mengelompokkan", kartu("g3", 30, 132, 240, 34, W.krem, ["mengelompokkan sudut menurut ciri"], 9.2)),
    ),
    k(
      "Alat yang disiapkan: alat tulis, penggaris, dan kertas yang dilipat membentuk sudut siku-siku dari kegiatan sebelumnya.",
      bersih(0),
      tambah(0, teks("jud", 150, 26, "Alat dan media", 13, W.ungu)),
      tambah("tulis,", emo("a1", 55, 100, "✏️", 34), teks("a1t", 55, 126, "alat tulis", 9)),
      tambah("penggaris,", emo("a2", 135, 100, "📏", 34), teks("a2t", 135, 126, "penggaris", 9)),
      tambah("kertas", kertasSiku("a3", 208, 112, 0, 40), tandaSiku("a3s", 208, 112, 0, 7), teks("a3t", 228, 126, "kertas lipat", 9)),
    ),
    k(
      "Guru mengingatkan: sudut seperti apa yang disebut sudut siku-siku? Lalu guru menunjukkan beberapa gambar, dan kita menunjuk mana yang siku-siku dan mana yang bukan.",
      bersih(0),
      tambah(0, teks("jud", 150, 26, "Siku-siku atau bukan?", 12.5, W.ungu)),
      tambah("beberapa", sudut("s1", 36, 140, 15, 90, 50), sudut("s2", 126, 140, 10, 35, 56), sudut("s3", 216, 140, 15, 135, 50)),
      tambah("mana", tanda("c1", 66, 176, true, 18)),
      tambah("bukan.", tanda("c2", 156, 176, false, 18), tanda("c3", 246, 176, false, 18)),
    ),
  ],
};

/* ------------------------------ 2. Kotak pensil (hlm. 170-171; Panduan Guru hlm. 258) ------------------------------ */
const kotakPensil = (): Obj[] => [
  kotak("kp1", 22, 52, 62, 104, "#A3B18A", W.biru, { rx: 14, tebal: 2 }),
  kotak("kp2", 92, 52, 62, 104, "#A3B18A", W.biru, { rx: 14, tebal: 2 }),
  garis("kpa", 38, 68, 0, 62, W.merah, 4),
  garis("kpb", 52, 68, 0, 62, W.ungu, 4),
  garis("kpc", 66, 76, 0, 54, W.jeruk, 4),
];

export const ADEGAN_KOTAK_PENSIL: AdeganStory = {
  id: "kotak-pensil",
  judul: "Apakah pojok kotak pensil termasuk sudut?",
  sumber: "Buku Siswa hlm. 170–171; Buku Panduan Guru hlm. 258",
  latar: "#FFF7ED",
  kutipan: ["Gambar 6.6 Kotak Pensil", "Pojok kotak pensil ini termasuk", "sudut bukan, ya?", "Apakah pojok kotak pensil seperti pada Gambar 6.6", "ayo kalian simak penjelasan tentang sudut", "Apakah pojokan tempat pensil seperti gambar"],
  ketukan: [
    k(
      "Perhatikan Gambar 6.6, sebuah kotak pensil. Seorang anak berkata, eeem, pojok kotak pensil ini termasuk sudut bukan, ya?",
      tambah(0, teks("jud", 150, 24, "Kotak pensil", 13, W.ungu)),
      tambah("kotak", kotakPensil()),
      tambah("Gambar", teks("cap", 88, 176, "Gambar 6.6 Kotak Pensil", 8.4, W.biru)),
      tambah("anak", ide("an", 172, 52, 118, 56, "Seorang anak", ["Pojok kotak pensil ini", "termasuk sudut bukan, ya?"], W.krem, 7.4)),
    ),
    k(
      "Guru menyajikannya sebagai masalah: apakah pojokan tempat pensil seperti gambar ini termasuk sudut? Kita belum memutuskan, jadi pahami dulu pengertian sudut.",
      tambah("pojokan", bulat("lg", 29, 59, 15, "none", W.merah, { tebal: 2.4 })),
      tambah("termasuk", teks("tq", 232, 150, "sudut?", 24, W.merah)),
      tambah("memutuskan,", teks("tp", 232, 176, "belum diputuskan", 8.4, W.hijau)),
    ),
    k(
      "Perhatikan pojoknya. Pojok kotak pensil ini membulat, bukan pertemuan dua garis yang runcing. Ingat pengamatan ini, kita periksa lagi sesudah mengenal pengertian sudut.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Perhatikan pojoknya", 12.5, W.ungu)),
      tambah("membulat,", jalur("pb", 40, 150, "M0 0 L0 -70 Q0 -90 20 -90 L80 -90", "none", W.biru, { tebal: 3.5 })),
      tambah("pertemuan", teks("pbt", 74, 172, "pojok membulat", 9, W.merah)),
      tambah("runcing.", jalur("pr", 180, 150, "M0 0 L0 -90 M0 0 L80 0", "none", W.biru, { tebal: 3.5 }), teks("prt", 210, 172, "pojok runcing", 9, W.hijau)),
    ),
  ],
};

/* ------------------------------ 3. Pengertian sudut (hlm. 171; Panduan Guru hlm. 258) ------------------------------ */
const PS = { x: 70, y: 150 };
export const ADEGAN_PENGERTIAN: AdeganStory = {
  id: "pengertian",
  judul: "Pengertian sudut, titik sudut, dan kaki sudut",
  sumber: "Buku Siswa hlm. 171; Buku Panduan Guru hlm. 258",
  latar: "#EEF2FF",
  kutipan: ["Sudut adalah daerah yang dibentuk oleh dua buah garis", "yang bertemu di satu titik", "Titik tempat pertemuan dua garis", "tersebut dinamakan titik sudut", "Kaki Sudut", "Apakah kalian dapat menemukan kaki", "Bagian mana titik sudutnya", "Apa kriteria sudut"],
  ketukan: [
    k(
      "Inilah pengertian sudut dari buku. Sudut adalah daerah yang dibentuk oleh dua buah garis yang bertemu di satu titik.",
      tambah(0, teks("jud", 150, 24, "Pengertian sudut", 13, W.ungu)),
      tambah("daerah", sudut("ps", PS.x, PS.y, 0, 40, 170).slice(0, 1)),
      tambah("garis", sudut("ps", PS.x, PS.y, 0, 40, 170).slice(1, 3)),
      tambah("titik.", sudut("ps", PS.x, PS.y, 0, 40, 170).slice(3)),
    ),
    k(
      "Titik tempat pertemuan dua garis tersebut dinamakan titik sudut.",
      tambah("pertemuan", teks("lt", 56, 176, "Titik Sudut", 10, W.merah), garis("ltg", 56, 166, 10, -10, W.merah, 1.6)),
      ubah("titik", { id: "ps-t", r: 5 }),
    ),
    k(
      "Kedua garis yang membentuk sudut dinamakan kaki sudut. Jadi sudut punya dua kaki dan satu titik sudut.",
      tambah("kaki", teks("lk1", 200, 170, "Kaki Sudut", 9.6, W.ungu)),
      tambah("dua", teks("lk2", 122, 78, "Kaki Sudut", 9.6, W.ungu, { rot: -40 })),
      tambah("satu", teks("lj", 150, 190, "dua kaki, satu titik sudut", 10, W.hijau)),
    ),
    k(
      "Daerah di antara kedua kaki inilah sudutnya, yang diberi warna pada gambar.",
      tambah("Daerah", teks("ld", 112, 140, "sudut", 9, W.biru)),
      ubah("daerah", { id: "ps-d", warna: W.merah, op: 0.55 }),
    ),
    k(
      "Panduan guru menyarankan tanya jawab. Apakah kalian dapat menemukan kaki sudutnya? Bagian mana titik sudutnya? Jadi, pojokan itu sudut atau bukan? Apa kriteria sudut?",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Tanya jawab guru", 13, W.ungu)),
      tambah("kaki", kartu("t1", 24, 38, 252, 26, W.hijauMuda, ["Adakah kaki sudutnya?"], 9)),
      tambah("Bagian", kartu("t2", 24, 70, 252, 26, W.muda, ["Bagian mana titik sudutnya?"], 9)),
      tambah("pojokan", kartu("t3", 24, 102, 252, 26, W.krem, ["Pojokan itu sudut atau bukan?"], 9)),
      tambah("kriteria", kartu("t4", 24, 134, 252, 26, W.ungMuda, ["Apa kriteria sudut?"], 9)),
    ),
  ],
};

/* ------------------------------ 4. Pendapat Yohana (hlm. 171; Panduan Guru hlm. 258, 260) ------------------------------ */
export const ADEGAN_YOHANA: AdeganStory = {
  id: "yohana",
  judul: "Pendapat Yohana: pojok kotak pensil bukan sudut",
  sumber: "Buku Siswa hlm. 171; Buku Panduan Guru hlm. 258, 260",
  latar: "#FDF2F8",
  kutipan: ["Jadi, apakah", "pojok kotak pensil pada Gambar", "termasuk sudut?", "Menurutku bukan", "tersebut tidak memiliki titik sudut", "Apakah kalian setuju dengan pendapat Yohana", "kriteria sudut"],
  ketukan: [
    k(
      "Kembali ke kotak pensil. Seorang anak bertanya, jadi apakah pojok kotak pensil pada gambar tadi termasuk sudut?",
      tambah(0, teks("jud", 150, 24, "Pendapat Yohana", 13, W.ungu)),
      tambah("anak", ide("an", 20, 40, 190, 46, "Seorang anak", ["Jadi, apakah pojok kotak pensil", "pada Gambar 6.6 termasuk sudut?"], W.krem, 8)),
    ),
    k(
      "Yohana menjawab, menurutku bukan, karena pojok kotak pensil tersebut tidak memiliki titik sudut.",
      tambah("Yohana", ide("yo", 90, 98, 190, 46, "Yohana", ["Menurutku bukan. Karena pojok", "kotak pensil tidak memiliki titik sudut."], W.hijauMuda, 8)),
    ),
    k(
      "Buku bertanya, apakah kalian setuju dengan pendapat Yohana? Mari kita periksa, sudut harus punya dua kaki yang bertemu di satu titik sudut.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Setujukah dengan Yohana?", 12, W.ungu)),
      tambah("periksa,", kartu("pk", 30, 44, 240, 30, W.krem, ["syarat sudut: dua kaki bertemu di satu titik"], 8.2)),
      tambah("kaki", teks("pk1", 90, 112, "dua kaki?", 10, W.biru), tanda("pk1c", 160, 114, true, 14)),
      tambah("titik", teks("pk2", 90, 142, "satu titik sudut?", 10, W.biru), tanda("pk2c", 190, 144, false, 14)),
    ),
    k(
      "Pojok kotak pensil membulat, jadi tidak ada satu titik tempat dua kaki bertemu. Kita setuju dengan Yohana, pojok itu bukan sudut.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Kesimpulan", 13, W.ungu)),
      tambah("membulat,", jalur("kb", 60, 150, "M0 0 L0 -70 Q0 -90 20 -90 L80 -90", "none", W.biru, { tebal: 3.5 })),
      tambah("setuju", tanda("kbc", 100, 176, false, 20), teks("kbt", 180, 120, "bukan sudut", 12, W.merah)),
    ),
    k(
      "Kriteria sudut: ada dua kaki yang bertemu di satu titik sudut. Kalau tidak ada titik pertemuan seperti itu, pojokan benda belum tentu sudut.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Kriteria sudut", 13, W.ungu)),
      tambah("ada", ...sudut("kr", 70, 130, 10, 55, 70), teks("kra", 70, 160, "sudut", 10, W.hijau), tanda("krc", 70, 182, true, 16)),
      tambah("Kalau", jalur("kq", 190, 130, "M0 0 L0 -50 Q0 -70 20 -70 L65 -70", "none", W.biru, { tebal: 3 }), teks("kqa", 220, 160, "bukan sudut", 10, W.merah), tanda("kqc", 220, 182, false, 16)),
    ),
  ],
};
