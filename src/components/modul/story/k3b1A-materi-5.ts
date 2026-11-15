import type { AdeganStory } from "./logika-story";
import { OWL, W, anak, angkaPv, bilPv, blokPv, emo, idKataPv, judul, kartu, kataPv, kerangkaPv, kotakAngkaPv, teks } from "./k3b1A-gambar";
import { bersih, hapus, idKartu, idPilihan, idx, k, pilihBaris, pilihKata, redamkan, sorotkan, tambah } from "./k3b1A-bantu";

const cap = (isi: string) => teks("cp", 150, 198, isi, 10.5, W.merah);

/* ------------------------------ 15. Nol penjaga tempat: empat ratus lima ------------------------------ */
const SUARA_N1 = "Bagaimana menulis empat ratus lima? Tidak ada puluhan, jadi puluhannya nol.";
const SUARA_N2 = "Kita tulis empat di ratusan, nol di puluhan, dan lima di satuan.";
const SUARA_N3 = "Jadi empat ratus lima ditulis seperti di layar. Nol di tengah menjaga tempat puluhan.";
const SUARA_N4 = "Kalau nolnya dihilangkan, bilangannya menjadi empat puluh lima. Nilainya berubah jauh.";
const SUARA_N5 = "Karena itu nol penting. Nol adalah penjaga tempat supaya angka lain tidak bergeser.";

export const ADEGAN_NOL_PENJAGA: AdeganStory = {
  id: "nol-penjaga",
  judul: "Nol penjaga tempat: empat ratus lima",
  sumber: "Materi: nol penjaga tempat",
  latar: "#FEF2F2",
  ketukan: [
    k(SUARA_N1, tambah(0, ...kerangkaPv()), tambah(idx(SUARA_N1, "empat"), ...kataPv("empat ratus lima")), sorotkan(idx(SUARA_N1, "puluhan,"), "pv-hk1")),
    k(
      SUARA_N2,
      redamkan(0, "pv-hk1"),
      tambah(idx(SUARA_N2, "ratusan,"), angkaPv(0, 4)),
      tambah(idx(SUARA_N2, "puluhan,"), angkaPv(1, 0)),
      tambah(idx(SUARA_N2, "satuan."), angkaPv(2, 5)),
    ),
    k(SUARA_N3, tambah(idx(SUARA_N3, "Jadi"), bilPv(405)), sorotkan(idx(SUARA_N3, "Nol"), "pv-dk1")),
    k(SUARA_N4, redamkan(0, "pv-dk1"), hapus(0, ...idKataPv), tambah(idx(SUARA_N4, "Kalau"), ...kartu("tn", 20, 172, 260, 24, W.merahMuda, ["tanpa nol menjadi 45"], 10))),
    k(SUARA_N5, hapus(0, ...idKartu("tn")), tambah(idx(SUARA_N5, "Nol", 2), ...kartu("nj", 20, 172, 260, 24, W.emas, ["nol = penjaga tempat"], 10))),
  ],
};

/* ------------------------------ 16. Latihan 1: balok menjadi lambang ------------------------------ */
const SUARA_L1 = "Latihan satu. Lihat model balok di papan. Ada tiga lempeng, empat batang, dan delapan kotak kecil.";
const SUARA_L2 = "Bilangan berapa yang ditunjukkan balok ini? Ketuk jawaban yang tepat.";
const SUARA_L3 = "Betul! Tiga ratus empat puluh delapan.";
const SUARA_L4 = "Cara membacanya, ratusan tiga, puluhan empat, satuan delapan.";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: balok menjadi lambang",
  sumber: "Materi: Latihan 1",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Latihan 1"), ...kerangkaPv(false)),
      tambah(idx(SUARA_L1, "tiga"), ...blokPv(0, 3)),
      tambah(idx(SUARA_L1, "empat"), ...blokPv(1, 4)),
      tambah(idx(SUARA_L1, "delapan"), ...blokPv(2, 8)),
    ),
    k(SUARA_L2, tambah(idx(SUARA_L2, "Bilangan"), teks("tanya", 150, 188, "berapa bilangan balok ini?", 11, W.ungu)), tambah(idx(SUARA_L2, "jawaban"), ...pilihKata(142, ["384", "348", "438"], 15))),
    k(SUARA_L3, sorotkan(idx(SUARA_L3, "Betul!"), "c2-k"), tambah(idx(SUARA_L3, "Tiga"), cap("300 + 40 + 8 = 348"))),
    k(
      SUARA_L4,
      redamkan(0, "c2-k"),
      hapus(0, "jud", "tanya", "cp", ...idPilihan(3)),
      tambah(0, ...kotakAngkaPv()),
      tambah(idx(SUARA_L4, "tiga,"), angkaPv(0, 3)),
      tambah(idx(SUARA_L4, "empat,"), angkaPv(1, 4)),
      tambah(idx(SUARA_L4, "delapan."), angkaPv(2, 8), bilPv(348)),
    ),
  ],
};

/* ------------------------------ 17. Latihan 2: membaca bilangan ------------------------------ */
const SUARA_M1 = "Latihan dua. Lihat bilangan di layar. Kita akan memilih cara membacanya yang benar.";
const SUARA_M2 = "Bagaimana membaca bilangan ini? Ketuk jawaban yang tepat.";
const SUARA_M3 = "Betul! Lima ratus enam. Puluhannya nol, jadi tidak dibaca.";
const SUARA_M4 = "Jadi kita baca ratusannya, lalu satuannya. Nol di tengah tidak dibaca.";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: membaca bilangan",
  sumber: "Materi: Latihan 2",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_M1, tambah(0, judul("Latihan 2")), tambah(idx(SUARA_M1, "bilangan"), teks("bn", 150, 66, "506", 34, W.merah))),
    k(SUARA_M2, tambah(idx(SUARA_M2, "Bagaimana"), teks("tanya", 150, 84, "bagaimana membaca 506?", 11, W.ungu)), tambah(idx(SUARA_M2, "jawaban"), ...pilihBaris(92, ["lima ratus nol enam", "lima ratus enam puluh", "lima ratus enam"], 11))),
    k(SUARA_M3, sorotkan(idx(SUARA_M3, "Betul!"), "c3-k"), tambah(idx(SUARA_M3, "Puluhannya"), cap("500 + 0 + 6 = 506"))),
    k(
      SUARA_M4,
      redamkan(0, "c3-k"),
      hapus(0, "tanya", "cp", ...idPilihan(3)),
      tambah(idx(SUARA_M4, "ratusannya,"), ...kartu("hs", 30, 100, 240, 40, W.emas, ["500 dan 6", "nol di tengah tidak dibaca"], 10)),
    ),
  ],
};

/* ------------------------------ 18. Latihan 3: menulis lambang ------------------------------ */
const SUARA_O1 = "Latihan tiga. Igil mendengar kata bilangan dua ratus tujuh puluh lima. Bagaimana menulis lambangnya?";
const SUARA_O2 = "Mana lambang yang benar? Ketuk jawaban yang tepat.";
const SUARA_O3 = "Betul! Dua ratus tujuh puluh lima ditulis dua, tujuh, lima.";
const SUARA_O4 = "Angka dua di ratusan, tujuh di puluhan, dan lima di satuan.";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: menulis lambang bilangan",
  sumber: "Materi: Latihan 3",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Latihan 3")),
      tambah(idx(SUARA_O1, "Igil"), ...anak("igil", 36, 70)),
      tambah(idx(SUARA_O1, "kata"), ...kartu("kt", 70, 54, 210, 30, W.emas, ["dua ratus tujuh puluh lima"], 11)),
    ),
    k(SUARA_O2, tambah(idx(SUARA_O2, "Mana"), teks("tanya", 150, 112, "mana lambangnya?", 11, W.ungu)), tambah(idx(SUARA_O2, "jawaban"), ...pilihKata(124, ["257", "275", "752"], 16))),
    k(SUARA_O3, sorotkan(idx(SUARA_O3, "Betul!"), "c2-k"), tambah(idx(SUARA_O3, "Dua"), cap("200 + 70 + 5 = 275"))),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, ...kerangkaPv(), ...kataPv("dua ratus tujuh puluh lima")),
      tambah(idx(SUARA_O4, "ratusan,"), angkaPv(0, 2)),
      tambah(idx(SUARA_O4, "puluhan,"), angkaPv(1, 7)),
      tambah(idx(SUARA_O4, "satuan."), angkaPv(2, 5), bilPv(275)),
    ),
  ],
};

/* ------------------------------ 19. Penutup ------------------------------ */
const SUARA_E1 = "Wah, kita sudah belajar banyak tentang bilangan tiga angka. Igil mengajak kita mengingat lagi bersama.";
const SUARA_E2 = "Pertama, sepuluh satuan jadi satu puluhan, dan sepuluh puluhan jadi satu ratusan.";
const SUARA_E3 = "Kedua, membaca bilangan dari kiri, yaitu ratusan, puluhan, lalu satuan. Angka nol tidak dibaca.";
const SUARA_E4 = "Ketiga, menulis lambang bilangan. Taruh tiap angka di tempatnya, dan isi tempat kosong dengan nol.";
const SUARA_E5 = "Hebat! Sekarang kamu bisa membaca dan menulis bilangan tiga angka. Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_E1, tambah(0, judul("Mari ingat lagi")), tambah(idx(SUARA_E1, "belajar"), emo("ow", 150, 62, OWL, 36)), tambah(idx(SUARA_E1, "mengajak"), ...kartu("r0", 14, 80, 272, 26, W.emas, ["tiga hal tentang bilangan"], 11))),
    k(SUARA_E2, hapus(0, ...idKartu("r0")), tambah(idx(SUARA_E2, "Pertama,"), ...kartu("r1", 14, 70, 272, 30, W.hijauMuda, ["1. sepuluh jadi satu"], 11))),
    k(SUARA_E3, tambah(idx(SUARA_E3, "Kedua,"), ...kartu("r2", 14, 106, 272, 38, W.langit, ["2. baca ratusan, puluhan, satuan", "nol tidak dibaca"], 10))),
    k(SUARA_E4, tambah(idx(SUARA_E4, "Ketiga,"), ...kartu("r3", 14, 150, 272, 38, W.pink, ["3. tiap angka di tempatnya", "tempat kosong diisi nol"], 10))),
    k(SUARA_E5, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("rw", 150, 100, OWL, 54)), tambah(idx(SUARA_E5, "membaca"), emo("rk", 150, 160, "✅", 30))),
  ],
};
