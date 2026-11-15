import type { AdeganStory } from "./logika-story";
import { OWL, W, emo, judul, kartu, kelompokSemua, rumus, teks } from "./k3b1F-gambar";
import { bersih, hapus, idKartu, idPilihan, idx, k, pilihKata, redamkan, sorotkan, tambah } from "./k3b1F-bantu";

/* ------------------------------ 13. Latihan 1: berapa semuanya ------------------------------ */
const SUARA_A1 = "Latihan satu. Kira menata stroberi di tiga piring. Tiap piring berisi empat stroberi.";
const SUARA_A2 = "Berapa stroberi semuanya? Hitung dengan teliti dahulu. Ketuk jawaban yang tepat.";
const SUARA_A3 = "Betul! Empat tambah empat tambah empat sama dengan dua belas.";
const SUARA_A4 = "Atau tiga kali empat sama dengan dua belas. Semuanya ada dua belas stroberi.";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: berapa stroberi?",
  sumber: "Materi: Latihan 1",
  latar: "#FEF2F2",
  ketukan: [
    k(SUARA_A1, tambah(0, judul("Latihan 1")), tambah(idx(SUARA_A1, "piring"), ...kelompokSemua(3, 4, "stroberi"))),
    k(SUARA_A2, tambah(idx(SUARA_A2, "Berapa"), teks("tanya", 150, 100, "berapa semuanya?", 12, W.ungu)), tambah(idx(SUARA_A2, "jawaban"), ...pilihKata(108, ["10", "12", "14"], 16))),
    k(SUARA_A3, sorotkan(idx(SUARA_A3, "Betul!"), "c2-k"), tambah(idx(SUARA_A3, "sama"), rumus("ps", 166, "4 + 4 + 4 = 12", 12, W.ungu))),
    k(SUARA_A4, redamkan(0, "c2-k"), hapus(0, "tanya", ...idPilihan(3)), tambah(idx(SUARA_A4, "tiga"), rumus("eq", 130, "3 × 4 = 12"))),
  ],
};

/* ------------------------------ 14. Latihan 2: perkalian yang cocok ------------------------------ */
const SUARA_B1 = "Latihan dua. Upe menata balon di lima kotak. Tiap kotak berisi tiga balon.";
const SUARA_B2 = "Perkalian mana yang cocok? Ingat, banyak kelompok ditulis lebih dulu. Ketuk jawaban yang tepat.";
const SUARA_B3 = "Betul! Banyak kelompok dulu, lalu isi tiap kelompok. Jadi lima kali tiga.";
const SUARA_B4 = "Hasilnya lima belas. Tiga tambah tiga tambah tiga tambah tiga tambah tiga sama dengan lima belas.";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: perkalian yang cocok",
  sumber: "Materi: Latihan 2",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Latihan 2")), tambah(idx(SUARA_B1, "kotak."), ...kelompokSemua(5, 3, "balon"))),
    k(SUARA_B2, tambah(idx(SUARA_B2, "Perkalian"), teks("tanya", 150, 128, "perkalian yang cocok?", 12, W.ungu)), tambah(idx(SUARA_B2, "jawaban"), ...pilihKata(136, ["3 × 5", "5 × 3", "3 × 3"], 15))),
    k(SUARA_B3, sorotkan(idx(SUARA_B3, "Betul!"), "c2-k"), sorotkan(idx(SUARA_B3, "kelompok,"), "kg-b0", "kg-b1", "kg-b2", "kg-b3", "kg-b4")),
    k(
      SUARA_B4,
      redamkan(0, "c2-k", "kg-b0", "kg-b1", "kg-b2", "kg-b3", "kg-b4"),
      hapus(0, "tanya", ...idPilihan(3)),
      tambah(idx(SUARA_B4, "Hasilnya"), rumus("eq", 160, "5 × 3 = 15")),
      tambah(idx(SUARA_B4, "sama"), rumus("ps", 134, "3 + 3 + 3 + 3 + 3 = 15", 12, W.ungu)),
    ),
  ],
};

/* ------------------------------ 15. Latihan 3: periksa dengan tukar tempat ------------------------------ */
const SUARA_C1 = "Latihan tiga. Halim menata jeruk di enam kotak. Tiap kotak berisi empat jeruk.";
const SUARA_C2 = "Berapa jeruk semuanya? Pikirkan banyak kelompok dan isinya. Ketuk jawaban yang tepat.";
const SUARA_C3 = "Betul! Enam kali empat sama dengan dua puluh empat.";
const SUARA_C4 = "Cek dengan menukar tempat. Empat kali enam juga sama dengan dua puluh empat.";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: berapa jeruk?",
  sumber: "Materi: Latihan 3",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_C1, tambah(0, judul("Latihan 3")), tambah(idx(SUARA_C1, "enam"), ...kelompokSemua(6, 4, "jeruk"))),
    k(SUARA_C2, tambah(idx(SUARA_C2, "Berapa"), teks("tanya", 150, 126, "berapa semuanya?", 12, W.ungu)), tambah(idx(SUARA_C2, "jawaban"), ...pilihKata(132, ["20", "28", "24"], 16))),
    k(SUARA_C3, sorotkan(idx(SUARA_C3, "Betul!"), "c3-k"), tambah(idx(SUARA_C3, "Enam"), rumus("eq", 190, "6 × 4 = 24"))),
    k(SUARA_C4, redamkan(0, "c3-k"), hapus(0, "tanya", ...idPilihan(3)), tambah(idx(SUARA_C4, "Empat"), rumus("tk", 150, "6 × 4 = 4 × 6", 12, W.ungu))),
  ],
};

/* ------------------------------ 16. Penutup ------------------------------ */
const SUARA_E1 = "Wah, kita sudah belajar banyak tentang perkalian. Igil mengajak kita mengingat lagi bersama. Mari kita ulang tiga hal penting.";
const SUARA_E2 = "Pertama, perkalian adalah penjumlahan berulang dari kelompok yang sama banyak.";
const SUARA_E3 = "Kedua, bilangan pertama adalah banyak kelompok, dan bilangan kedua adalah isi tiap kelompok.";
const SUARA_E4 = "Ketiga, bilangan pada perkalian boleh ditukar tempatnya, dan hasilnya tetap sama.";
const SUARA_E5 = "Hebat! Sekarang kamu bisa menghitung perkalian sampai seratus. Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_E1, tambah(0, judul("Mari ingat lagi")), tambah(idx(SUARA_E1, "belajar"), emo("ow", 150, 62, OWL, 36)), tambah(idx(SUARA_E1, "mengajak"), ...kartu("r0", 14, 80, 272, 26, W.emas, ["tiga hal tentang perkalian"], 11))),
    k(SUARA_E2, hapus(0, ...idKartu("r0")), tambah(idx(SUARA_E2, "Pertama,"), ...kartu("r1", 14, 70, 272, 30, W.hijauMuda, ["1. jumlah berulang, sama banyak"], 11))),
    k(SUARA_E3, tambah(idx(SUARA_E3, "Kedua,"), ...kartu("r2", 14, 106, 272, 38, W.langit, ["2. banyak kelompok × isi tiap", "kelompok = jumlah semuanya"], 10))),
    k(SUARA_E4, tambah(idx(SUARA_E4, "Ketiga,"), ...kartu("r3", 14, 150, 272, 38, W.pink, ["3. boleh ditukar tempatnya", "hasilnya tetap sama"], 10))),
    k(SUARA_E5, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("rw", 150, 100, OWL, 54)), tambah(idx(SUARA_E5, "menghitung"), emo("rk", 150, 160, "✅", 30))),
  ],
};
