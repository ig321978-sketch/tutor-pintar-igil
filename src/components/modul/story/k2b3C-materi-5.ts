import type { AdeganStory } from "./logika-story";
import { OWL, W, cocok, emo, judul, kartu, ruang, rusukBox, teks, tidakCocok } from "./k2b3C-gambar";
import { bersih, hapus, idx, k, pilihKata, redamkan, sorotkan, tambah } from "./k2b3C-bantu";

/* ------------------------------ 1. Latihan satu: mana yang menggelinding? ------------------------------ */
const SUARA_L1 = "Latihan satu. Upe memperhatikan tiga bangun ruang di layar. Mana yang menggelinding?";
const SUARA_L2 = "Pilih bangun ruang yang bisa menggelinding. Ketuk salah satu kartu.";
const SUARA_L3 = "Jawabannya bola. Permukaan bola lengkung, jadi bola menggelinding.";
const SUARA_L4 = "Kubus dan balok punya permukaan datar, jadi keduanya diam.";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan satu: mana yang menggelinding?",
  sumber: "Materi: latihan menggelinding",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_L1, tambah(0, judul("Latihan 1")), tambah(idx(SUARA_L1, "tiga"), ...ruang("bola", "boa", 58, 76, 26), ...ruang("kubus", "kba", 150, 76, 26), ...ruang("balok", "bla", 242, 76, 22)), tambah(idx(SUARA_L1, "Mana"), emo("qq", 150, 160, "❓", 34))),
    k(SUARA_L2, bersih(0), tambah(0, judul("Pilih jawabannya")), tambah(0, ...ruang("bola", "boa", 58, 70, 26), ...ruang("kubus", "kba", 150, 70, 26), ...ruang("balok", "bla", 242, 70, 22)), tambah(idx(SUARA_L2, "Ketuk"), ...pilihKata(112, ["bola", "kubus", "balok"], 12))),
    k(SUARA_L3, sorotkan(idx(SUARA_L3, "bola"), "c1-k", "c1-t"), tambah(idx(SUARA_L3, "lengkung"), cocok("ok", 58, 168, 20))),
    k(SUARA_L4, redamkan(0, "c1-k", "c1-t"), tambah(idx(SUARA_L4, "Kubus"), tidakCocok("x2", 150, 168, 20)), tambah(idx(SUARA_L4, "balok"), tidakCocok("x3", 242, 168, 20))),
  ],
};

/* ------------------------------ 2. Latihan dua: tebak dari dua petunjuk ------------------------------ */
const SUARA_M1 = "Latihan dua. Wei menebak bangun ruang dari dua petunjuk.";
const SUARA_M2 = "Petunjuk pertama, alasnya berbentuk lingkaran. Petunjuk kedua, ujungnya runcing.";
const SUARA_M3 = "Sekarang pilih namanya. Apakah tabung, kerucut, atau bola?";
const SUARA_M4 = "Tabung dan kerucut punya alas lingkaran, tetapi hanya kerucut yang ujungnya runcing. Jawabannya kerucut.";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan dua: tebak dari petunjuk",
  sumber: "Materi: latihan menebak bangun ruang",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_M1, tambah(0, judul("Latihan 2")), tambah(idx(SUARA_M1, "menebak"), emo("qq", 150, 100, "❓", 60)), tambah(idx(SUARA_M1, "petunjuk"), ...kartu("pj", 50, 130, 200, 34, W.emas, ["dua petunjuk"], 13))),
    k(SUARA_M2, bersih(0), tambah(0, judul("Dua petunjuk")), tambah(idx(SUARA_M2, "pertama"), ...kartu("pt0", 40, 34, 220, 30, W.hijauMuda, ["alasnya lingkaran"], 11)), tambah(idx(SUARA_M2, "kedua"), ...kartu("pt1", 40, 70, 220, 30, W.langit, ["ujungnya runcing"], 11))),
    k(SUARA_M3, tambah(idx(SUARA_M3, "pilih"), ...pilihKata(116, ["tabung", "kerucut", "bola"], 11))),
    k(SUARA_M4, sorotkan(idx(SUARA_M4, "kerucut", 3), "c2-k", "c2-t"), tambah(idx(SUARA_M4, "runcing"), ...ruang("kerucut", "kra", 150, 176, 22)), tambah(idx(SUARA_M4, "Jawabannya"), cocok("ok", 230, 176, 22))),
  ],
};

/* ------------------------------ 3. Latihan tiga: banyak rusuk balok ------------------------------ */
const SUARA_N1 = "Latihan tiga. Halim ingin tahu, berapa banyak rusuk balok?";
const SUARA_N2 = "Perhatikan balok di layar. Semua rusuknya kita tandai dengan garis hijau.";
const SUARA_N3 = "Sekarang pilih jawabannya. Ketuk kartu yang benar.";
const SUARA_N4 = "Balok punya dua belas rusuk. Jumlah ini sama dengan banyak rusuk kubus.";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan tiga: rusuk balok",
  sumber: "Materi: latihan rusuk balok",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_N1, tambah(0, judul("Latihan 3")), tambah(idx(SUARA_N1, "balok"), ...ruang("balok", "bla", 150, 80, 36)), tambah(idx(SUARA_N1, "Berapa"), emo("qq", 150, 168, "❓", 34))),
    k(SUARA_N2, ...Array.from({ length: 12 }, (_, i) => tambah(idx(SUARA_N2, "rusuknya"), rusukBox("balok", "bla", 150, 80, 36, i, W.hijau)))),
    k(SUARA_N3, hapus(0, "qq"), tambah(idx(SUARA_N3, "pilih"), ...pilihKata(150, ["6", "12", "8"], 16))),
    k(SUARA_N4, sorotkan(idx(SUARA_N4, "dua"), "c2-k", "c2-t"), tambah(idx(SUARA_N4, "sama"), cocok("ok", 150, 198, 14))),
  ],
};

/* ------------------------------ 4. Penutup ------------------------------ */
const SUARA_T1 = "Hebat, kamu sudah belajar bangun datar dan bangun ruang. Bangun ruang bisa diisi, bangun datar tidak.";
const SUARA_T2 = "Kamu juga sudah mengenal lima bangun ruang: kubus, balok, tabung, kerucut, dan bola.";
const SUARA_T3 = "Kubus dan balok punya permukaan datar. Tabung, kerucut, dan bola punya permukaan lengkung.";
const SUARA_T4 = "Sampai jumpa di video berikutnya. Igil bangga padamu, tetap semangat belajar!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Rangkuman dan penutup",
  sumber: "Materi: rangkuman",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_T1, tambah(0, judul("Rangkuman")), tambah(idx(SUARA_T1, "bisa"), ...kartu("r1", 20, 50, 260, 40, W.hijauMuda, ["bangun ruang: bisa diisi"], 11)), tambah(idx(SUARA_T1, "tidak"), ...kartu("r2", 20, 106, 260, 40, W.langit, ["bangun datar: tidak bisa diisi"], 11))),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Lima bangun ruang")),
      tambah(idx(SUARA_T2, "kubus"), ...ruang("kubus", "kba", 30, 80, 20), teks("nm-kb", 30, 120, "kubus", 9)),
      tambah(idx(SUARA_T2, "balok"), ...ruang("balok", "bla", 90, 80, 18), teks("nm-bl", 90, 120, "balok", 9)),
      tambah(idx(SUARA_T2, "tabung"), ...ruang("tabung", "tba", 150, 80, 22), teks("nm-tb", 150, 120, "tabung", 9)),
      tambah(idx(SUARA_T2, "kerucut"), ...ruang("kerucut", "kra", 210, 80, 22), teks("nm-kr", 210, 120, "kerucut", 9)),
      tambah(idx(SUARA_T2, "bola", 1), ...ruang("bola", "boa", 270, 80, 22), teks("nm-bo", 270, 120, "bola", 9)),
    ),
    k(SUARA_T3, tambah(idx(SUARA_T3, "datar"), ...kartu("gd", 10, 146, 110, 28, W.hijauMuda, ["permukaan datar"], 9.4)), tambah(idx(SUARA_T3, "lengkung"), ...kartu("gl", 130, 146, 160, 28, W.pink, ["permukaan lengkung"], 9.4))),
    k(SUARA_T4, bersih(0), tambah(0, judul("Sampai jumpa!")), tambah(idx(SUARA_T4, "Sampai"), emo("ow", 150, 108, OWL, 60)), tambah(idx(SUARA_T4, "semangat"), teks("sm", 150, 160, "Tetap semangat!", 14, W.merah))),
  ],
};
