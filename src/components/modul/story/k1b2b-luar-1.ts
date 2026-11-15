import type { AdeganStory, Obj } from "./logika-story";
import { W, bulat, deret, emo, judul, kartu, kelompok, tata, teks } from "./k1b2b-gambar";
import { bersih, idx, k, sorotkan, tambah, ubah } from "./k1b2b-bantu";

export const NAMA_METODE = ["Counting On", "Part-Part-Whole", "Ten Frame Add"];
export const NAMA_METODE_ID = ["Menghitung Maju", "Bagian-Utuh", "Jumlah di Bingkai Sepuluh"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara mengajarkan cara berbeda untuk menjumlahkan. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu: Counting On, Part-Part-Whole, dan Ten Frame Add.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Menghitung Maju, Bagian-Utuh, dan Jumlah di Bingkai Sepuluh.";
const SUARA_O4 = "Semua metode ini menjawab satu pertanyaan: bagaimana mencari jumlah dua bagian dengan benar?";
const SUARA_O5 = "Kita akan memakai benda yang akrab, seperti pensil, apel, dan balon.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk menjumlahkan",
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
      ...NAMA_METODE.map((m, i) => tambah(["On,", "Part-Part-Whole,", "Add."][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      ...NAMA_METODE_ID.map((m, i) => tambah(["Maju,", "Bagian-Utuh,", "Sepuluh."][i], ...kartu(`n${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 10.5))),
      tambah("Sepuluh.", teks("n10", 272, 160, "10", 14, W.merah)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah("satu", emo("i1", 60, 90, "\u{1F517}", 36), emo("i2", 150, 90, "\u{1F4CF}", 36), emo("i3", 240, 90, "\u{1F440}", 36)),
      tambah("pertanyaan:", ...kartu("iq", 20, 120, 260, 44, W.emas, ["bagaimana mencari jumlah", "dua bagian dengan benar?"], 10)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Benda yang akrab")),
      tambah("pensil,", ...kelompok("pensil", "tb", 1, 100, 60, 1, 16)),
      tambah("apel,", ...kelompok("apel", "tc", 1, 100, 150, 1, 16)),
      tambah("balon.", ...deret("balon", "td", [{ x: 240, y: 100 }], 18)),
    ),
  ],
};

/* ------------------------------ 2. Counting On: konsep ------------------------------ */
const SUARA_A1 = "Metode pertama, Counting On, atau Menghitung Maju. Kita simpan bilangan pertama di kepala, lalu maju.";
const SUARA_A2 = "Misalnya enam tambah tiga. Kita ucapkan enam, lalu maju tiga langkah. Tujuh, delapan, sembilan.";
const SUARA_A3 = "Sembilan adalah hasilnya. Jadi enam tambah tiga sama dengan sembilan.";
const SUARA_A4 = "Kita tidak menghitung lagi dari awal. Cara ini menghemat waktu, apalagi untuk bilangan yang lebih besar.";
const LOMPAT = [{ x: 140, y: 100 }, { x: 185, y: 100 }, { x: 230, y: 100 }];

export const ADEGAN_LUAR_MAJU: AdeganStory = {
  id: "luar-maju",
  judul: "Counting On: simpan bilangan pertama, lalu maju",
  sumber: "Metode luar: Counting On",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_A1, tambah("pertama,", ...kepala(0)), tambah("simpan", emo("kp", 60, 86, "\u{1F4AD}", 40), teks("a6", 60, 128, "6", 40, W.merah)), tambah("maju.", emo("mj", 190, 100, "\u{27A1}", 36))),
    k(
      SUARA_A2,
      bersih(0),
      tambah(0, ...kepala(0), teks("a6", 60, 112, "6", 48, W.merah)),
      ...["Tujuh,", "delapan,", "sembilan."].map((kata, i) => tambah(kata, bulat(`fj${i}`, LOMPAT[i].x, 100, 15, W.krem, W.biru), teks(`fl${i}`, LOMPAT[i].x, 105, String(7 + i), 14, W.merah))),
      tambah("langkah.", teks("a3", 185, 148, "maju 3 langkah", 10, W.ungu)),
    ),
    k(SUARA_A3, tambah("Jadi", teks("a9", 150, 186, "6 + 3 = 9", 28, W.hijau)), sorotkan("Sembilan", "fl2")),
    k(SUARA_A4, bersih(0), tambah(0, ...kepala(0), emo("ow", 150, 90, "\u{1F989}", 44)), tambah("menghemat", ...kartu("ah", 40, 124, 220, 34, W.emas, ["mulai dari bilangan pertama"], 10.5))),
  ],
};

/* ------------------------------ 3. Counting On: terapan ------------------------------ */
const SUARA_B1 = "Wei punya lima balon, lalu mendapat dua balon lagi. Berapa semua balonnya?";
const SUARA_B2 = "Kita mulai dari lima. Lima balon itu tidak perlu dihitung lagi dari awal.";
const SUARA_B3 = "Lalu kita maju sebanyak dua balon baru. Enam, tujuh.";
const SUARA_B4 = "Jadi lima tambah dua sama dengan tujuh. Wei punya tujuh balon.";
const BALON_LAMA = tata(5, 76);

export const ADEGAN_LUAR_MAJU_TERAPAN: AdeganStory = {
  id: "luar-maju-terapan",
  judul: "Counting On: lima balon, maju dua",
  sumber: "Metode luar: Counting On, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah("lima", ...kepala(0), ...deret("balon", "wa", BALON_LAMA, 12)),
      tambah(idx(SUARA_B1, "dua", 1), ...deret("balon", "wb", [{ x: 125, y: 144 }, { x: 175, y: 144 }], 12)),
    ),
    k(SUARA_B2, sorotkan("lima.", "wa0", "wa1", "wa2", "wa3", "wa4"), tambah("lima.", teks("m5", 150, 112, "5", 24, W.merah))),
    k(SUARA_B3, tambah("Enam,", teks("bq0", 125, 124, "6", 12, W.merah)), tambah("tujuh.", teks("bq1", 175, 124, "7", 12, W.merah))),
    k(SUARA_B4, tambah("Jadi", teks("b7", 150, 192, "5 + 2 = 7", 22, W.hijau)), ubah("tujuh", { id: "m5", warna: W.hijau })),
  ],
};
