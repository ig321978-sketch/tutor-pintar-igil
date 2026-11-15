import type { AdeganStory, Obj } from "./logika-story";
import { W, WB, bentuk, cocok, emo, jam, judul, kartu, pintu, teks } from "./k1b4b-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k1b4b-bantu";

/** Nama tiga metode luar dalam bahasa Indonesia (satu-satunya nama yang dipakai di video). */
export const NAMA_METODE_ID = ["Kenali Bentuk", "Pilah Ciri", "Bentuk di Sekitar"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${i + 1}. ${NAMA_METODE_ID[i]}`], 9.4);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara mengajarkan cara berbeda untuk mengenal bentuk dan mengelompokkan benda. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu: Kenali Bentuk, Pilah Ciri, dan Bentuk di Sekitar.";
const SUARA_O3 = "Ketiganya menjawab satu pertanyaan yang sama: bagaimana kita mengelompokkan benda dengan tepat?";
const SUARA_O4 = "Kita memakai benda yang akrab, seperti kue, bola, dan jam dinding.";
const SUARA_O5 = "Semua metode kita coba di layar. Kita ketuk, kita seret, dan kita pilih jawaban.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk mengelompokkan",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Tiga metode dari luar")),
      tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)),
      tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      ...NAMA_METODE_ID.map((m, i) => tambah(["Kenali", "Pilah", "Sekitar."][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah("satu", emo("i1", 60, 90, "\u{1F4E6}", 36), emo("i2", 150, 90, "\u{1F440}", 36), emo("i3", 240, 90, "\u{2753}", 36)),
      tambah("bagaimana", ...kartu("iq", 20, 120, 260, 44, W.emas, ["bagaimana mengelompokkan", "benda dengan tepat?"], 10)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Benda yang akrab")),
      tambah("kue,", emo("ta", 60, 110, "\u{1F36A}", 34)),
      tambah("bola,", emo("tb", 150, 110, "\u{26BD}", 34)),
      tambah("dinding.", emo("tc", 240, 110, "\u{1F552}", 34)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Di layar kita")),
      tambah("ketuk,", ...kartu("ya", 20, 50, 80, 40, W.langit, ["ketuk"], 12), emo("yb", 60, 124, "\u{1F446}", 30)),
      tambah("seret,", ...kartu("yc", 110, 50, 80, 40, W.hijauMuda, ["seret"], 12), emo("yd", 150, 124, "\u{2194}", 30)),
      tambah("pilih", ...kartu("ye", 200, 50, 80, 40, W.pink, ["pilih"], 12), emo("yf", 240, 124, "\u{2705}", 30)),
    ),
  ],
};

/* ------------------------------ 2. Kenali Bentuk: konsep ------------------------------ */
const SUARA_K1 = "Metode pertama, Kenali Bentuk. Kita kenali bentuk dari wujudnya. Ada tiga bentuk yang kita kenal.";
const SUARA_K2 = "Lingkaran tepinya melengkung. Segitiga punya tiga sisi lurus. Segi empat punya empat sisi lurus.";
const SUARA_K3 = "Lihat wujudnya, lalu sebut namanya. Ini bentuk apa? Ini segitiga.";
const SUARA_K4 = "Cukup lihat wujudnya, tidak perlu mengukur. Itulah cara Kenali Bentuk.";
const BX = [60, 150, 240];

export const ADEGAN_LUAR_KENALI: AdeganStory = {
  id: "luar-kenali",
  judul: "Kenali Bentuk: lihat wujud, sebut nama",
  sumber: "Metode luar: Kenali Bentuk",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, ...kepala(0)),
      tambah("wujudnya.", bentuk("lengkung", "kq0", BX[0], 90, 20, WB.coklat), bentuk("segitiga", "kq1", BX[1], 90, 20, WB.hijau), bentuk("segiempat", "kq2", BX[2], 90, 20, WB.merah)),
    ),
    k(
      SUARA_K2,
      tambah("Lingkaran", teks("kn0", BX[0], 132, "lingkaran", 10), teks("kt0", BX[0], 148, "tepi melengkung", 9, W.merah)),
      tambah("Segitiga", teks("kn1", BX[1], 132, "segitiga", 10), teks("kt1", BX[1], 148, "3 sisi lurus", 9, W.hijau)),
      tambah("empat", teks("kn2", BX[2], 132, "segi empat", 10), teks("kt2", BX[2], 148, "4 sisi lurus", 9, W.hijau)),
    ),
    k(
      SUARA_K3,
      bersih(0),
      tambah(0, ...kepala(0)),
      tambah("Lihat", bentuk("segitiga", "kr", 150, 90, 30, WB.hijau)),
      tambah("apa?", teks("kru", 150, 150, "bentuk apa?", 14, W.merah)),
      tambah("segitiga.", ...kartu("krj", 80, 160, 140, 30, W.emas, ["ini segitiga"], 12)),
    ),
    k(
      SUARA_K4,
      bersih(0),
      tambah(0, ...kepala(0)),
      tambah("Cukup", emo("ow", 150, 100, "\u{1F989}", 50)),
      tambah("Itulah", ...kartu("ku", 40, 140, 220, 36, W.krem, ["lihat wujud, sebut nama"], 11)),
    ),
  ],
};

/* ------------------------------ 3. Kenali Bentuk: terapan ------------------------------ */
const SUARA_Q1 = "Halim menemukan tiga benda, yaitu jam dinding, pintu, dan topi pesta. Ketuk benda yang berbentuk lingkaran.";
const SUARA_Q2 = "Jam dinding berbentuk lingkaran. Cocok dengan aturan, jadi jam ini kita ketuk.";
const SUARA_Q3 = "Sekarang ketuk benda yang berbentuk segitiga. Topi pesta berbentuk segitiga, jadi cocok.";
const SUARA_Q4 = "Pintu berbentuk segi empat. Jadi tiap benda punya satu bentuk yang kita kenali. Hebat sekali!";
const QX = [60, 150, 240];

export const ADEGAN_LUAR_KENALI_TERAPAN: AdeganStory = {
  id: "luar-kenali-terapan",
  judul: "Kenali Bentuk: jam, pintu, dan topi",
  sumber: "Metode luar: Kenali Bentuk, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, ...kepala(0)),
      tambah("jam", ...jam("ja", QX[0], 94, 16), teks("qa", QX[0], 132, "jam dinding", 8.6, W.coklat)),
      tambah("pintu,", ...pintu("pi", QX[1] - 12, 72, 24, 44), teks("qb", QX[1], 132, "pintu", 8.6, W.coklat)),
      tambah("topi", bentuk("segitiga", "tp", QX[2], 94, 16, WB.hijau), teks("qc", QX[2], 132, "topi pesta", 8.6, W.coklat)),
    ),
    k(SUARA_Q2, sorotkan("Jam", "ja"), tambah("Cocok", cocok("qm0", QX[0], 68)), tambah("lingkaran.", teks("qt0", QX[0], 150, "lingkaran", 9.4, W.hijau))),
    k(
      SUARA_Q3,
      ubah(0, { id: "ja", sorot: false }),
      sorotkan("Topi", "tp"),
      tambah("cocok.", cocok("qm1", QX[2], 68)),
      tambah("segitiga,", teks("qt2", QX[2], 150, "segitiga", 9.4, W.hijau)),
    ),
    k(SUARA_Q4, ubah(0, { id: "tp", sorot: false }), sorotkan("Pintu", "pi"), tambah("segi", teks("qt1", QX[1], 150, "segi empat", 9.4, W.hijau)), tambah("Hebat", emo("ow", 150, 184, "\u{1F989}", 24))),
  ],
};
