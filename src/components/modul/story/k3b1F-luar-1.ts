import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, emo, judul, kartu, kelompokSemua, rumus, teks } from "./k3b1F-gambar";
import { bersih, hapus, idPilihan, idx, k, pilihKata, redamkan, sorotkan, tambah } from "./k3b1F-bantu";

export const NAMA_METODE_ID = ["Kelompok Sama", "Susunan Baris Kolom", "Lompat Hitung"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara punya cara lain untuk belajar perkalian. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Kelompok Sama, Susunan Baris Kolom, dan Lompat Hitung.";
const SUARA_O3 = "Semua metode ini menjawab satu pertanyaan. Bagaimana cara menghitung benda yang sama banyak dengan cepat?";
const SUARA_O4 = "Kita memakai gambar di layar. Kamu cukup mengetuk, melihat dengan teliti, dan memilih jawaban.";
const SUARA_O5 = "Ada yang menjumlah berulang, ada yang menyusun baris dan kolom, dan ada yang melompat di garis bilangan. Siap? Ayo kita mulai dengan metode pertama.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk perkalian",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah(idx(SUARA_O1, "negara"), emo("gl", 150, 110, "\u{1F30D}", 50)), tambah(idx(SUARA_O1, "tiga"), ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      tambah(idx(SUARA_O2, "Kelompok"), ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah(idx(SUARA_O2, "Susunan"), ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah(idx(SUARA_O2, "Lompat"), ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah(idx(SUARA_O3, "satu"), emo("i1", 60, 84, "\u{1F34A}", 34), emo("i2", 150, 84, "❓", 34), emo("i3", 240, 84, "\u{1F522}", 34)),
      tambah(idx(SUARA_O3, "Bagaimana"), ...kartu("iq", 20, 112, 260, 52, W.emas, ["bagaimana cara menghitung benda", "yang sama banyak dengan cepat?"], 10)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Alat bantu hari ini")),
      tambah(idx(SUARA_O4, "layar."), emo("a1", 70, 100, "\u{1F4E6}", 36), emo("a2", 150, 100, "\u{1F522}", 36), emo("a3", 230, 100, "\u{1F4CA}", 36)),
      tambah(idx(SUARA_O4, "mengetuk,"), emo("tg", 150, 150, "\u{1F446}", 24)),
      tambah(idx(SUARA_O4, "memilih"), teks("al-t", 150, 184, "ketuk, lihat, lalu pilih", 10, W.ungu)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Jumlah, susun, dan lompat")),
      tambah(idx(SUARA_O5, "menjumlah"), teks("kt0", 150, 70, "menjumlah berulang", 14, W.ungu)),
      tambah(idx(SUARA_O5, "menyusun"), teks("kt1", 150, 100, "baris dan kolom", 14, W.ungu)),
      tambah(idx(SUARA_O5, "melompat"), teks("kt2", 150, 130, "melompat di garis", 14, W.ungu)),
      tambah(idx(SUARA_O5, "pertama."), emo("ow", 150, 182, OWL, 30)),
    ),
  ],
};

/* ------------------------------ 2. Kelompok Sama: konsep ------------------------------ */
const SUARA_K1 = "Metode pertama bernama Kelompok Sama. Benda ditata dalam kelompok yang sama banyak.";
const SUARA_K2 = "Lihat empat piring. Tiap piring berisi tiga jeruk.";
const SUARA_K3 = "Jumlahkan isi tiap piring. Tiga tambah tiga tambah tiga tambah tiga sama dengan dua belas.";
const SUARA_K4 = "Jumlah berulang itu ditulis empat kali tiga. Empat kali tiga sama dengan dua belas.";
const SUARA_K5 = "Itulah metode Kelompok Sama. Penjumlahan berulang dari kelompok yang sama banyak.";

export const ADEGAN_LUAR_KELOMPOK: AdeganStory = {
  id: "luar-kelompok",
  judul: "Kelompok Sama: jumlah berulang",
  sumber: "Metode luar: Kelompok Sama",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_K1, tambah(0, ...kepala(0)), tambah(idx(SUARA_K1, "ditata"), emo("tp", 150, 112, "\u{1F34A}", 44))),
    k(SUARA_K2, hapus(0, "tp"), tambah(idx(SUARA_K2, "empat"), ...kelompokSemua(4, 3, "jeruk", 56))),
    k(SUARA_K3, sorotkan(idx(SUARA_K3, "Jumlahkan"), "kg-b0", "kg-b1", "kg-b2", "kg-b3"), tambah(idx(SUARA_K3, "sama"), rumus("ps", 148, "3 + 3 + 3 + 3 = 12", 12, W.ungu))),
    k(SUARA_K4, redamkan(0, "kg-b0", "kg-b1", "kg-b2", "kg-b3"), tambah(idx(SUARA_K4, "empat", 2), rumus("eq", 176, "4 × 3 = 12"))),
    k(SUARA_K5, hapus(0, "ps"), tambah(idx(SUARA_K5, "Itulah"), ...kartu("kk", 30, 134, 240, 26, W.emas, ["Kelompok Sama: jumlah berulang"], 11))),
  ],
};

/* ------------------------------ 3. Kelompok Sama: terapan ------------------------------ */
const SUARA_R1 = "Terapkan pada soal ini. Upe menata kelereng di tiga kotak, tiap kotak berisi lima kelereng.";
const SUARA_R2 = "Berapa kelereng semuanya? Ketuk jawaban yang tepat.";
const SUARA_R3 = "Betul! Lima tambah lima tambah lima sama dengan lima belas.";
const SUARA_R4 = "Dengan Kelompok Sama, tiga kali lima sama dengan lima belas.";

export const ADEGAN_LUAR_KELOMPOK_TERAPAN: AdeganStory = {
  id: "luar-kelompok-terapan",
  judul: "Kelompok Sama: kelereng Upe",
  sumber: "Metode luar: Kelompok Sama",
  latar: "#ECFCCB",
  ketukan: [
    k(SUARA_R1, tambah(0, ...kepala(0)), tambah(idx(SUARA_R1, "tiga"), ...kelompokSemua(3, 5, "kelereng", 56))),
    k(SUARA_R2, tambah(idx(SUARA_R2, "Berapa"), teks("tanya", 150, 136, "berapa semuanya?", 12, W.ungu)), tambah(idx(SUARA_R2, "jawaban"), ...pilihKata(142, ["15", "18", "20"], 16))),
    k(SUARA_R3, sorotkan(idx(SUARA_R3, "Betul!"), "c1-k"), tambah(idx(SUARA_R3, "sama"), rumus("ps", 196, "5 + 5 + 5 = 15", 11, W.ungu))),
    k(SUARA_R4, redamkan(0, "c1-k"), hapus(0, "tanya", "ps", ...idPilihan(3)), tambah(idx(SUARA_R4, "tiga"), rumus("eq", 150, "3 × 5 = 15")), tambah(idx(SUARA_R4, "belas."), emo("ok", 250, 150, "✅", 24))),
  ],
};
