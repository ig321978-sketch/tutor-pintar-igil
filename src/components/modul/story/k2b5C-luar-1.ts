import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, bagianKotak, bagianLingkaran, bulat, emo, idBagian, judul, kartu, kotak, labelBagian, panah, teks } from "./k2b5C-gambar";
import { bersih, hapus, idx, k, pilihKata, sorotkan, tambah } from "./k2b5C-bantu";

export const NAMA_METODE_ID = ["Seperempat", "Setengah dari Setengah", "Lipat Dua Kali"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const PO = bagianLingkaran("po", 150, 108, 50, [90, 90, 90, 90]);

const SUARA_O1 = "Guru di banyak negara punya cara lain untuk mengajarkan seperempat. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Seperempat, Setengah dari Setengah, dan satu lagi, Lipat Dua Kali.";
const SUARA_O3 = "Semua metode menjawab satu pertanyaan. Bagaimana cara mendapat seperempat dari benda utuh?";
const SUARA_O4 = "Kita memakai benda di layar. Kamu cukup mengetuk, menyeret, dan melihat dengan teliti.";
const SUARA_O5 = "Seperempat selalu satu dari empat bagian sama besar. Siap? Ayo kita mulai dengan metode pertama.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk seperempat",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)), tambah("tiga", ...kartu("pk", 50, 142, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      tambah(idx(SUARA_O2, "Seperempat,"), ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah(idx(SUARA_O2, "Setengah"), ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah(idx(SUARA_O2, "Lipat"), ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah("satu", emo("i1", 60, 84, "\u{1F355}", 34), emo("i2", 150, 84, "❓", 34), emo("i3", 240, 84, "\u{1F440}", 34)),
      tambah("Bagaimana", ...kartu("iq", 20, 112, 260, 52, W.emas, ["bagaimana cara mendapat", "seperempat dari benda utuh?"], 10)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Alat bantu hari ini")),
      tambah("benda", bulat("al0", 70, 96, 18, W.oranye), kotak("al1", 132, 78, 36, 36, W.langit, W.biru, { rx: 5, tebal: 2 }), emo("al2", 230, 104, "\u{1F355}", 34)),
      tambah("mengetuk,", emo("tg", 160, 140, "\u{1F446}", 22)),
      tambah("melihat", teks("al-t", 150, 178, "benda di layar", 10, W.ungu)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Seperempat")),
      tambah(idx(SUARA_O5, "empat"), ...PO),
      sorotkan(idx(SUARA_O5, "satu"), "pc-po-1"),
      tambah(idx(SUARA_O5, "pertama."), emo("ow", 252, 40, OWL, 28)),
    ),
  ],
};

/* ------------------------------ 2. Seperempat: konsep ------------------------------ */
const PZ_UTUH = bagianLingkaran("pz", 150, 104, 46, [360]);
const PZ_EMPAT = bagianLingkaran("pz", 150, 104, 46, [90, 90, 90, 90]);

const SUARA_V1 = "Metode pertama bernama Seperempat. Kita mulai dari satu pizza yang utuh.";
const SUARA_V2 = "Bagi pizza menjadi empat bagian yang sama besar.";
const SUARA_V3 = "Pastikan keempat bagian sama besar, sebab bagian yang berbeda ukuran bukan seperempat.";
const SUARA_V4 = "Satu bagian pizza itu adalah seperempat pizza.";
const SUARA_V5 = "Itulah intinya, bagi menjadi empat bagian sama.";

export const ADEGAN_LUAR_SEPEREMPAT: AdeganStory = {
  id: "luar-seperempat",
  judul: "Seperempat: bagi menjadi empat sama",
  sumber: "Metode luar: Seperempat",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_V1, tambah(0, ...kepala(0)), tambah(idx(SUARA_V1, "pizza"), ...PZ_UTUH), tambah(idx(SUARA_V1, "utuh."), ...labelBagian(PZ_UTUH, "utuh", 10))),
    k(SUARA_V2, hapus(idx(SUARA_V2, "empat"), ...idBagian("pz", 1, true)), tambah(idx(SUARA_V2, "empat"), ...PZ_EMPAT)),
    k(SUARA_V3, tambah(idx(SUARA_V3, "Pastikan"), emo("ok", 150, 174, "✅", 24))),
    k(SUARA_V4, hapus(0, "ok"), sorotkan(idx(SUARA_V4, "Satu"), "pc-pz-1"), tambah(idx(SUARA_V4, "pizza"), ...labelBagian([PZ_EMPAT[0]], "1/4", 11))),
    k(SUARA_V5, tambah(idx(SUARA_V5, "intinya,"), ...kartu("in", 40, 162, 220, 24, W.krem, ["bagi jadi empat bagian sama"], 9.6))),
  ],
};

/* ------------------------------ 3. Seperempat: terapan ------------------------------ */
const BP = bagianKotak("bp", 90, 58, 120, 56, "jalur4");

const SUARA_W1 = "Terapkan pada soal ini. Malosi punya kue bolu panjang yang dibagi empat bagian sama besar.";
const SUARA_W2 = "Satu bagian kue bolu disebut apa? Ketuk jawaban yang tepat.";
const SUARA_W3 = "Lihat dengan teliti. Satu dari empat bagian yang sama besar.";
const SUARA_W4 = "Betul! Satu bagian itu seperempat. Hebat!";

export const ADEGAN_LUAR_SEPEREMPAT_TERAPAN: AdeganStory = {
  id: "luar-seperempat-terapan",
  judul: "Seperempat: kue bolu panjang",
  sumber: "Metode luar: Seperempat",
  latar: "#ECFCCB",
  ketukan: [
    k(SUARA_W1, tambah(0, ...kepala(0)), tambah(idx(SUARA_W1, "bolu"), ...BP)),
    k(SUARA_W2, sorotkan(idx(SUARA_W2, "Satu"), "pc-bp-1"), tambah(idx(SUARA_W2, "tepat."), ...pilihKata(150, ["seperempat", "utuh", "setengah"], 11))),
    k(SUARA_W3, tambah(idx(SUARA_W3, "Satu"), panah("pw", 110, 134, 0, -14))),
    k(SUARA_W4, hapus(0, "pw"), sorotkan(idx(SUARA_W4, "Betul!"), "c1-k"), tambah(idx(SUARA_W4, "Hebat!"), emo("ok", 262, 90, "✅", 22))),
  ],
};

/* ------------------------------ 8. Ringkasan metode luar ------------------------------ */
const R_A = bagianLingkaran("a", 44, 80, 15, [90, 90, 90, 90]);
const R_B = bagianLingkaran("b", 44, 120, 15, [90, 90, 90, 90]);
const R_C = bagianKotak("c", 29, 145, 30, 30, "empat");

const SUARA_R1 = "Mari kita ringkas tiga metode dari luar. Semuanya membantu kita mendapat seperempat.";
const SUARA_R2 = "Metode Seperempat, bagi menjadi empat bagian sama.";
const SUARA_R3 = "Metode Setengah dari Setengah, seperempat adalah setengah dari setengah.";
const SUARA_R4 = "Metode Lipat Dua Kali, lipat dua kali menghasilkan seperempat.";
const SUARA_R5 = "Pilih metode yang kamu suka, lalu periksa dengan metode lain. Hasilnya harus sama.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Metode luar: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Ringkasan")), tambah(idx(SUARA_R1, "ringkas"), ...kartu("r0", 14, 28, 272, 26, W.emas, ["3 metode dari luar"], 11))),
    k(SUARA_R2, tambah(idx(SUARA_R2, "Seperempat,"), ...kartu("r1", 80, 62, 206, 36, WARNA_METODE[0], [NAMA_METODE_ID[0], "bagi jadi empat bagian sama"], 9)), tambah(idx(SUARA_R2, "empat"), ...R_A)),
    k(
      SUARA_R3,
      tambah(idx(SUARA_R3, "Setengah"), ...kartu("r2", 80, 102, 206, 36, WARNA_METODE[1], [NAMA_METODE_ID[1], "seperempat: setengah dari setengah"], 8.6)),
      tambah(idx(SUARA_R3, "seperempat"), ...R_B),
      sorotkan(idx(SUARA_R3, "seperempat"), "pc-b-1"),
    ),
    k(
      SUARA_R4,
      tambah(idx(SUARA_R4, "Lipat"), ...kartu("r3", 80, 142, 206, 36, WARNA_METODE[2], [NAMA_METODE_ID[2], "lipat dua kali jadi seperempat"], 9)),
      tambah(idx(SUARA_R4, "menghasilkan"), ...R_C),
      sorotkan(idx(SUARA_R4, "seperempat."), "pc-c-1"),
    ),
    k(SUARA_R5, bersih(0), tambah(0, judul("Hasilnya harus sama"), emo("rw", 150, 100, OWL, 54)), tambah(idx(SUARA_R5, "sama."), emo("rk", 150, 160, "✅", 30))),
  ],
};
