import type { AdeganStory } from "./logika-story";
import { OWL, W, bagianKotak, bagianLingkaran, emo, idBagian, judul, kartu } from "./k2b5C-gambar";
import { bersih, hapus, idx, k, pilihKata, redamkan, sorotkan, tambah } from "./k2b5C-bantu";

const ID_PILIHAN = ["c1-k", "c1-t", "c2-k", "c2-t", "c3-k", "c3-t"];

/* ------------------------------ 14. Latihan 1: gambar mana yang seperempat ------------------------------ */
const L1_A = bagianKotak("a", 24, 44, 64, 64, "tak4");
const L1_B = bagianLingkaran("b", 150, 76, 34, [90, 90, 90, 90]);
const L1_C = bagianLingkaran("c", 244, 76, 34, [180, 180]);

const SUARA_L1 = "Latihan satu. Kira melihat tiga gambar di layar.";
const SUARA_L2 = "Gambar mana yang dibagi menjadi empat bagian sama besar? Ketuk jawaban yang tepat.";
const SUARA_L3 = "Betul! Gambar B dibagi menjadi empat bagian sama besar. Itu seperempat. Hebat!";
const SUARA_L4 = "Gambar A punya empat bagian, tetapi tidak sama besar. Gambar C hanya punya dua bagian.";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: gambar mana yang seperempat",
  sumber: "Materi: latihan memilih seperempat",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_L1, tambah(0, judul("Latihan 1")), tambah(idx(SUARA_L1, "tiga"), ...L1_A, ...L1_B, ...L1_C)),
    k(SUARA_L2, tambah(idx(SUARA_L2, "jawaban"), ...pilihKata(130, ["A", "B", "C"], 15))),
    k(SUARA_L3, sorotkan(idx(SUARA_L3, "Betul!"), "c2-k"), sorotkan(idx(SUARA_L3, "seperempat."), "pc-b-1"), tambah(idx(SUARA_L3, "Hebat!"), emo("ow", 150, 190, OWL, 18))),
    k(
      SUARA_L4,
      hapus(0, "ow"),
      tambah(idx(SUARA_L4, "tidak"), emo("xa", 56, 124, "❌", 14)),
      tambah(idx(SUARA_L4, "hanya"), emo("xc", 244, 124, "❌", 14)),
    ),
  ],
};

/* ------------------------------ 15. Latihan 2: satu bagian disebut apa ------------------------------ */
const L2_EMPAT = bagianKotak("bo", 100, 36, 100, 100, "empat");
const L2_DUA = bagianKotak("bo", 100, 36, 100, 100, "tegak2");

const SUARA_M1 = "Latihan dua. Wei punya kue bolu yang dibagi empat bagian sama besar.";
const SUARA_M2 = "Satu bagian kue bolu disebut apa? Ketuk jawaban yang tepat.";
const SUARA_M3 = "Betul! Satu bagian dari empat bagian sama besar adalah seperempat. Hebat!";
const SUARA_M4 = "Kalau bolunya dibagi menjadi dua bagian sama besar, satu bagian disebut setengah.";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: satu bagian disebut apa",
  sumber: "Materi: latihan nama bagian",
  latar: "#F0FDFA",
  ketukan: [
    k(SUARA_M1, tambah(0, judul("Latihan 2")), tambah(idx(SUARA_M1, "bolu"), ...L2_EMPAT)),
    k(SUARA_M2, sorotkan(idx(SUARA_M2, "Satu"), "pc-bo-1"), tambah(idx(SUARA_M2, "jawaban"), ...pilihKata(150, ["setengah", "seperempat", "utuh"], 11))),
    k(SUARA_M3, sorotkan(idx(SUARA_M3, "Betul!"), "c2-k")),
    k(
      SUARA_M4,
      hapus(idx(SUARA_M4, "dua"), ...ID_PILIHAN, ...idBagian("bo", 4)),
      tambah(idx(SUARA_M4, "dua"), ...L2_DUA),
      sorotkan(idx(SUARA_M4, "setengah."), "pc-bo-1"),
    ),
  ],
};

/* ------------------------------ 16. Latihan 3: dua seperempat sama dengan apa ------------------------------ */
const L3_PIZZA = bagianLingkaran("z", 150, 76, 36, [90, 90, 90, 90], -90, ["#FDBA74", "#FCA5A5", "#FDE68A", "#FDBA74"]);

const SUARA_N1 = "Latihan tiga. Kira mendapat dua seperempat dari sebuah pizza.";
const SUARA_N2 = "Itu sama dengan berapa bagian pizza? Ketuk jawaban yang tepat.";
const SUARA_N3 = "Betul! Dua seperempat sama besar dengan setengah pizza. Hebat!";
const SUARA_N4 = "Kalau Kira mendapat empat seperempat, itu satu pizza utuh.";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: dua seperempat sama dengan apa",
  sumber: "Materi: latihan seperempat dan setengah",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_N1, tambah(0, judul("Latihan 3")), tambah(idx(SUARA_N1, "Kira"), ...L3_PIZZA), sorotkan(idx(SUARA_N1, "dua"), "pc-z-1", "pc-z-2")),
    k(SUARA_N2, tambah(idx(SUARA_N2, "jawaban"), ...pilihKata(130, ["setengah", "utuh", "seperempat"], 11))),
    k(SUARA_N3, sorotkan(idx(SUARA_N3, "Betul!"), "c1-k")),
    k(SUARA_N4, hapus(0, ...ID_PILIHAN), sorotkan(idx(SUARA_N4, "empat"), "pc-z-3", "pc-z-4")),
  ],
};

/* ------------------------------ 17. Penutup ------------------------------ */
const P_A = bagianLingkaran("a", 44, 77, 15, [90, 90, 90, 90]);
const P_B = bagianLingkaran("b", 44, 117, 15, [90, 90, 90, 90]);
const P_C = bagianLingkaran("c", 44, 157, 15, [90, 90, 90, 90]);

const SUARA_Y1 = "Mari kita ingat lagi. Ada tiga hal yang kita pelajari tentang seperempat.";
const SUARA_Y2 = "Pertama, satu benda utuh dibagi menjadi empat bagian sama besar. Tiap bagian adalah seperempat.";
const SUARA_Y3 = "Kedua, seperempat adalah setengah dari setengah. Kita memotong dua kali.";
const SUARA_Y4 = "Ketiga, empat seperempat disatukan menjadi satu benda utuh.";
const SUARA_Y5 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Y1, tambah(0, judul("Mari ingat lagi")), tambah(idx(SUARA_Y1, "Ada"), ...kartu("p0", 14, 28, 272, 26, W.emas, ["tiga hal tentang seperempat"], 10))),
    k(
      SUARA_Y2,
      tambah(idx(SUARA_Y2, "Pertama,"), ...kartu("p1", 80, 60, 206, 34, W.hijauMuda, ["empat bagian sama besar", "tiap bagian: seperempat"], 8.6)),
      tambah(idx(SUARA_Y2, "empat"), ...P_A),
    ),
    k(
      SUARA_Y3,
      tambah(idx(SUARA_Y3, "Kedua,"), ...kartu("p2", 80, 100, 206, 34, W.pink, ["seperempat adalah", "setengah dari setengah"], 8.6)),
      tambah(idx(SUARA_Y3, "setengah"), ...P_B),
      sorotkan(idx(SUARA_Y3, "memotong"), "pc-b-1"),
    ),
    k(
      SUARA_Y4,
      redamkan(0, "pc-b-1"),
      tambah(idx(SUARA_Y4, "Ketiga,"), ...kartu("p3", 80, 140, 206, 34, W.langit, ["empat seperempat", "sama dengan satu utuh"], 8.6)),
      tambah(idx(SUARA_Y4, "seperempat"), ...P_C),
      sorotkan(idx(SUARA_Y4, "disatukan"), ...idBagian("c", 4)),
    ),
    k(SUARA_Y5, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, OWL, 56)), tambah(idx(SUARA_Y5, "anak-anak!"), emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
