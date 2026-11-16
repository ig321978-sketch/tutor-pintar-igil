import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, balokBilangan, deret, emo, idBalok, judul, kartu, teks } from "./k4b1ka-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah } from "./k4b1ka-bantu";

/* Rujukan topik: Matematika untuk SD/MI Kelas IV, Bab 1 Sub-Bab A (membaca dan menulis bilangan cacah sampai 10.000). Tiga metode luar ini adalah cara guru di berbagai negara mengajarkan topik yang sama; gambar, cerita, dan angka orisinal IGIL. */

export const NAMA_METODE_ID = ["Balok Empat Tingkat", "Papan Empat Tempat", "Nol Penjaga Tempat"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara punya cara lain untuk membaca dan menulis bilangan. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Balok Empat Tingkat, Papan Empat Tempat, dan Nol Penjaga Tempat.";
const SUARA_O3 = "Semua metode ini menjawab satu pertanyaan. Bagaimana cara menyebut dan menulis bilangan empat angka?";
const SUARA_O4 = "Kita memakai gambar di layar. Kamu cukup mengetuk, melihat dengan teliti, dan memilih jawaban.";
const SUARA_O5 = "Ada yang menyusun balok, ada yang mengisi papan, dan ada yang menjaga angka nol. Ayo kita mulai dengan metode pertama.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk membaca dan menulis bilangan",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah(idx(SUARA_O1, "negara"), emo("gl", 150, 110, "\u{1F30D}", 50)), tambah(idx(SUARA_O1, "tiga", 1), ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      tambah(idx(SUARA_O2, "Balok"), ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah(idx(SUARA_O2, "Papan"), ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah(idx(SUARA_O2, "Nol"), ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah(idx(SUARA_O3, "satu"), emo("i1", 60, 84, "\u{1F5E3}", 34), emo("i2", 150, 84, "✏️", 34), emo("i3", 240, 84, "\u{1F440}", 34)),
      tambah(idx(SUARA_O3, "Bagaimana"), ...kartu("iq", 20, 112, 260, 52, W.emas, ["bagaimana menyebut dan menulis", "bilangan empat angka?"], 10)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Alat bantu hari ini")),
      tambah(idx(SUARA_O4, "layar."), emo("a1", 70, 100, "\u{1F9F1}", 36), emo("a2", 150, 100, "\u{1F4CB}", 36), emo("a3", 230, 100, "\{2B55}", 36)),
      tambah(idx(SUARA_O4, "mengetuk,"), emo("tg", 150, 150, "\u{1F446}", 24)),
      tambah(idx(SUARA_O4, "memilih"), teks("al-t", 150, 184, "ketuk, lihat, lalu pilih", 10, W.ungu)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Susun, isi, jaga")),
      tambah(idx(SUARA_O5, "menyusun"), teks("kt0", 150, 70, "menyusun balok", 13, W.ungu)),
      tambah(idx(SUARA_O5, "mengisi"), teks("kt1", 150, 100, "mengisi papan", 13, W.ungu)),
      tambah(idx(SUARA_O5, "menjaga"), teks("kt2", 150, 130, "menjaga angka nol", 13, W.ungu)),
      tambah(idx(SUARA_O5, "pertama."), emo("ow", 150, 182, OWL, 30)),
    ),
  ],
};

/* ------------------------------ 2. Balok Empat Tingkat: konsep ------------------------------ */
const SUARA_B1 = "Metode pertama bernama Balok Empat Tingkat. Bilangan disusun dari balok digital di layar.";
const SUARA_B2 = "Ada empat jenis balok. Benda bernilai satu, bungkus sepuluh, dus seratus, dan peti seribu.";
const SUARA_B3 = "Sepuluh benda ditukar menjadi satu bungkus. Sepuluh bungkus ditukar menjadi satu dus.";
const SUARA_B4 = "Sepuluh dus ditukar menjadi satu peti. Karena itu tiap jenis balok paling banyak sembilan.";

export const ADEGAN_LUAR_BALOK: AdeganStory = {
  id: "luar-balok",
  judul: "Balok Empat Tingkat: peti, dus, bungkus, benda",
  sumber: "Metode luar: Balok Empat Tingkat",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_B1, tambah(0, ...kepala(0)), tambah(idx(SUARA_B1, "balok"), emo("bk", 150, 112, "\u{1F9F1}", 56))),
    k(
      SUARA_B2,
      hapus(0, "bk"),
      tambah(idx(SUARA_B2, "Benda"), ...deret("sa", "o", 242, 88, 1, 1), teks("sl3", 246, 74, "benda", 8.6), teks("sv3", 246, 120, "1", 12, W.merah)),
      tambah(idx(SUARA_B2, "bungkus"), ...deret("sa", "b", 178, 80, 1, 1), teks("sl2", 180, 74, "bungkus", 8.6), teks("sv2", 180, 120, "10", 12, W.merah)),
      tambah(idx(SUARA_B2, "dus"), ...deret("sa", "u", 108, 84, 1, 1), teks("sl1", 114, 74, "dus", 8.6), teks("sv1", 114, 120, "100", 12, W.merah)),
      tambah(idx(SUARA_B2, "peti"), ...deret("sa", "p", 40, 80, 1, 1), teks("sl0", 49, 74, "peti", 8.6), teks("sv0", 49, 120, "1.000", 12, W.merah)),
    ),
    k(
      SUARA_B3,
      tambah(idx(SUARA_B3, "benda"), ...kartu("tk1", 14, 134, 272, 20, W.hijauMuda, ["10 benda jadi 1 bungkus"], 9.6)),
      tambah(idx(SUARA_B3, "dus."), ...kartu("tk2", 14, 156, 272, 20, W.langit, ["10 bungkus jadi 1 dus"], 9.6)),
    ),
    k(SUARA_B4, tambah(idx(SUARA_B4, "peti."), ...kartu("tk3", 14, 178, 272, 18, W.krem, ["10 dus jadi 1 peti"], 9.4)), sorotkan(idx(SUARA_B4, "paling"), "tk1-k", "tk2-k", "tk3-k")),
  ],
};

/* ------------------------------ 3. Balok Empat Tingkat: terapan ------------------------------ */
const SUARA_C1 = "Terapkan pada gambar ini. Upe mengumpulkan empat peti, enam bungkus, dan tiga benda. Dus tidak ada.";
const SUARA_C2 = "Hitung tiap jenis. Empat peti berarti empat ribu. Enam bungkus berarti enam puluh. Tiga benda berarti tiga.";
const SUARA_C3 = "Dus kosong, jadi tempat ratusan berisi nol. Bilangannya empat ribu enam puluh tiga.";
const SUARA_C4 = "Namanya tidak menyebut ratusan, karena nol tidak dibaca.";

export const ADEGAN_LUAR_BALOK_TERAPAN: AdeganStory = {
  id: "luar-balok-terapan",
  judul: "Balok Empat Tingkat: kumpulan balok Upe",
  sumber: "Metode luar: Balok Empat Tingkat",
  latar: "#ECFCCB",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, ...kepala(0)),
      tambah(idx(SUARA_C1, "empat"), ...balokBilangan("bk", 62, [4, 0, 6, 3]), teks("bt0", 40, 58, "4 peti", 9), teks("bt3", 246, 58, "3 benda", 9)),
      tambah(idx(SUARA_C1, "enam"), teks("bt2", 180, 58, "6 bungkus", 9)),
      tambah(idx(SUARA_C1, "Dus"), teks("bt1", 108, 58, "0 dus", 9)),
    ),
    k(
      SUARA_C2,
      sorotkan(idx(SUARA_C2, "Empat"), ...idBalok("bk", [4, 0, 0, 0])),
      sorotkan(idx(SUARA_C2, "Enam"), ...idBalok("bk", [0, 0, 6, 0]).filter((id) => id.startsWith("bk-b"))),
      sorotkan(idx(SUARA_C2, "Tiga"), ...idBalok("bk", [0, 0, 0, 3]).filter((id) => id.startsWith("bk-o"))),
    ),
    k(SUARA_C3, tambah(idx(SUARA_C3, "Bilangannya"), ...kartu("bl", 80, 116, 140, 34, W.krem, ["4.063"], 22))),
    k(SUARA_C4, tambah(idx(SUARA_C4, "Namanya"), ...kartu("nm", 20, 154, 260, 40, W.emas, ["empat ribu", "enam puluh tiga"], 11))),
  ],
};
