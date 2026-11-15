import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, emo, judul, kartu, kartuAngka, papan, pilihan } from "./k3b1B-gambar";
import { bersih, idx, k, redamkan, sorotkan, tambah } from "./k3b1B-bantu";

export const NAMA_METODE_ID = ["Nilai Tempat", "Kartu Angka Montessori", "Bentuk Uraian"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const PO = papan("po", "   ", { y0: 76, h: 40, u: 26 });
const SUARA_O1 = "Guru di banyak negara mengajarkan cara berbeda untuk memahami bilangan. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Nilai Tempat, Kartu Angka Montessori, dan Bentuk Uraian.";
const SUARA_O3 = "Semua metode ini menjawab satu pertanyaan. Bagaimana kita membaca dan menyusun bilangan tiga angka dengan benar?";
const SUARA_O4 = "Kita memakai papan tiga tempat di layar. Ada ratusan yang hijau, puluhan yang biru, dan satuan yang merah.";
const SUARA_O5 = "Semua bilangannya tiga angka, paling besar sembilan ratus sembilan puluh sembilan. Siap? Ayo mulai dengan metode pertama.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk nilai tempat",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)), tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      tambah("Nilai", ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah("Kartu", ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah("Bentuk", ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah("satu", emo("i1", 60, 84, "\u{1F522}", 34), emo("i2", 150, 84, "❓", 34), emo("i3", 240, 84, "\u{1F440}", 34)),
      tambah("Bagaimana", ...kartu("iq", 20, 112, 260, 52, W.emas, ["bagaimana membaca dan menyusun", "bilangan tiga angka dengan benar?"], 10)),
    ),
    k(SUARA_O4, bersih(0), tambah(0, judul("Papan tiga tempat")), tambah("papan", ...[0, 1, 2].map((i) => PO.kolom(i))), tambah("ratusan", PO.kepala(0)), tambah("puluhan", PO.kepala(1)), tambah("satuan", PO.kepala(2))),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Bilangan terbesar")),
      tambah("sembilan", ...kartuAngka("om", 100, 56, "999", W.emas, 100, 44, 26)),
      tambah("Siap?", emo("ow", 150, 150, OWL, 36)),
    ),
  ],
};

/* ------------------------------ 2. Nilai Tempat: konsep ------------------------------ */
const LN = papan("ln", "438", { y0: 74, h: 44, u: 28, nilaiY: 142 });
const SUARA_N1 = "Metode pertama bernama Nilai Tempat. Nilai sebuah angka bergantung pada tempatnya.";
const SUARA_N2 = "Bilangannya empat ratus tiga puluh delapan.";
const SUARA_N3 = "Angka empat ada di ratusan, jadi nilainya empat ratus.";
const SUARA_N4 = "Angka tiga ada di puluhan, jadi nilainya tiga puluh. Angka delapan ada di satuan, jadi nilainya delapan.";
const SUARA_N5 = "Tempat yang berbeda membuat nilai yang berbeda. Itulah inti Nilai Tempat.";

export const ADEGAN_LUAR_NILAI: AdeganStory = {
  id: "luar-nilai",
  judul: "Nilai Tempat: nilai bergantung tempat",
  sumber: "Metode luar: Nilai Tempat",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_N1, tambah("pertama", ...kepala(0)), tambah("Nilai", ...LN.dasar)),
    k(SUARA_N2, tambah("empat", LN.digit(0)), tambah("tiga", LN.digit(1)), tambah("delapan.", LN.digit(2))),
    k(SUARA_N3, sorotkan("Angka", "ln_d0"), tambah("nilainya", LN.nilai(0))),
    k(
      SUARA_N4,
      redamkan(0, "ln_d0"),
      sorotkan(idx(SUARA_N4, "tiga"), "ln_d1"),
      tambah(idx(SUARA_N4, "nilainya", 1), LN.nilai(1)),
      redamkan(idx(SUARA_N4, "Angka", 2), "ln_d1"),
      sorotkan(idx(SUARA_N4, "delapan"), "ln_d2"),
      tambah(idx(SUARA_N4, "nilainya", 2), LN.nilai(2)),
    ),
    k(SUARA_N5, redamkan(0, "ln_d2"), tambah("Tempat", ...kartu("ti", 40, 160, 220, 30, W.emas, ["tempat beda, nilai beda"], 11))),
  ],
};

/* ------------------------------ 3. Nilai Tempat: terapan ------------------------------ */
const LT = papan("lt", "365", { y0: 74, h: 44, u: 28, nilaiY: 130 });
const SUARA_T1 = "Terapkan Nilai Tempat pada bilangan tiga ratus enam puluh lima.";
const SUARA_T2 = "Berapa nilai angka enam? Ketuk jawabannya. Enam, enam puluh, atau enam ratus?";
const SUARA_T3 = "Betul! Angka enam ada di puluhan, jadi nilainya enam puluh.";
const SUARA_T4 = "Hebat! Bila angka enam dipindah ke tempat paling kiri, nilainya menjadi enam ratus.";

export const ADEGAN_LUAR_NILAI_TERAPAN: AdeganStory = {
  id: "luar-nilai-terapan",
  judul: "Nilai Tempat: bilangan tiga ratus enam puluh lima",
  sumber: "Metode luar: Nilai Tempat, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_T1, tambah("Terapkan", ...kepala(0)), tambah("pada", ...LT.dasar), tambah("tiga", LT.digit(0)), tambah("enam", LT.digit(1)), tambah("lima.", LT.digit(2))),
    k(SUARA_T2, tambah("Berapa", ...pilihan(142, ["6", "60", "600"])), sorotkan("enam?", "lt_d1")),
    k(SUARA_T3, sorotkan("Betul!", "c2-k"), tambah("nilainya", LT.nilai(1))),
    k(SUARA_T4, redamkan(0, "c2-k", "lt_d1"), tambah("Hebat!", emo("ok", 262, 62, "✅", 22)), sorotkan("kiri,", "lt_c0")),
  ],
};
