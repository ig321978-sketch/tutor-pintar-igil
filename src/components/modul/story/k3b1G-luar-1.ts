import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, bagian, bagikan, emo, hbAtas, hbBawah, idPilihan, jumlahBagian, judul, kartu, pilihKata, teks, tumpukan } from "./k3b1G-gambar";
import { bersih, hapus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k3b1G-bantu";

export const NAMA_METODE_ID = ["Bagi Rata", "Kurang Berulang", "Keluarga Fakta"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara punya cara lain untuk belajar pembagian. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Bagi Rata, Kurang Berulang, dan Keluarga Fakta.";
const SUARA_O3 = "Semua metode ini menjawab satu pertanyaan. Bagaimana cara membagi sebuah bilangan dengan mudah dan benar?";
const SUARA_O4 = "Kita memakai gambar di layar. Kamu cukup mengetuk, melihat dengan teliti, dan memilih jawaban.";
const SUARA_O5 = "Ada yang membagi bergiliran, ada yang mengurangi berulang, dan ada yang memakai pasangan kali dan bagi. Siap? Ayo kita mulai dengan metode pertama.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk pembagian",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah(idx(SUARA_O1, "negara"), emo("gl", 150, 110, "\u{1F30D}", 50)), tambah(idx(SUARA_O1, "tiga"), ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      tambah(idx(SUARA_O2, "Rata,"), ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah(idx(SUARA_O2, "Kurang"), ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah(idx(SUARA_O2, "Keluarga"), ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah(idx(SUARA_O3, "satu"), emo("i1", 60, 84, "\u{1F36A}", 34), emo("i2", 150, 84, "❓", 34), emo("i3", 240, 84, "\u{1F440}", 34)),
      tambah(idx(SUARA_O3, "Bagaimana"), ...kartu("iq", 20, 112, 260, 52, W.emas, ["bagaimana cara membagi", "bilangan dengan mudah?"], 10)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Alat bantu hari ini")),
      tambah(idx(SUARA_O4, "layar."), emo("a1", 70, 100, "\u{1F4E6}", 36), emo("a2", 150, 100, "\u{1F522}", 36), emo("a3", 230, 100, "\u{1F34E}", 36)),
      tambah(idx(SUARA_O4, "mengetuk,"), emo("tg", 150, 150, "\u{1F446}", 24)),
      tambah(idx(SUARA_O4, "memilih"), teks("al-t", 150, 184, "ketuk, lihat, lalu pilih", 10, W.ungu)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Bagi, kurang, dan kali")),
      tambah(idx(SUARA_O5, "membagi"), teks("kt0", 150, 70, "membagi bergiliran", 14, W.ungu)),
      tambah(idx(SUARA_O5, "mengurangi"), teks("kt1", 150, 100, "mengurangi berulang", 14, W.ungu)),
      tambah(idx(SUARA_O5, "memakai"), teks("kt2", 150, 130, "kali dan bagi berpasangan", 14, W.ungu)),
      tambah(idx(SUARA_O5, "pertama."), emo("ow", 150, 182, OWL, 30)),
    ),
  ],
};

/* ------------------------------ 2. Bagi Rata: konsep ------------------------------ */
const SUARA_R1 = "Metode pertama bernama Bagi Rata. Bagikan benda satu per satu supaya semua bagian sama.";
const SUARA_R2 = "Kita punya enam belas apel untuk Malosi, Kira, Upe, dan Wei.";
const SUARA_R3 = "Putaran pertama, tiap anak kebagian satu apel. Putaran kedua, tiap anak kebagian satu lagi.";
const SUARA_R4 = "Setelah empat putaran, apel habis. Setiap anak mendapat empat apel.";
const SUARA_R5 = "Enam belas dibagi empat sama dengan empat. Itulah metode Bagi Rata, bagikan bergiliran sampai habis.";
const TRAY16 = { y0: 68, perBaris: 16, dx: 17 };

export const ADEGAN_LUAR_BAGI: AdeganStory = {
  id: "luar-bagi",
  judul: "Bagi Rata: bagikan bergiliran",
  sumber: "Metode luar: Bagi Rata",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_R1, tambah(0, ...kepala(0)), tambah(idx(SUARA_R1, "benda"), ...tumpukan("apel", 16, 1, 16, TRAY16))),
    k(SUARA_R2, tambah(idx(SUARA_R2, "Malosi,"), ...bagian(["Malosi", "Kira", "Upe", "Wei"]))),
    k(SUARA_R3, ubah(idx(SUARA_R3, "pertama,"), bagikan("apel", 4, 1, 4)), ubah(idx(SUARA_R3, "kedua,"), bagikan("apel", 4, 5, 8))),
    k(
      SUARA_R4,
      ubah(idx(SUARA_R4, "Setelah"), bagikan("apel", 4, 9, 16)),
      tambah(idx(SUARA_R4, "empat", 2), ...[0, 1, 2, 3].map((g) => jumlahBagian(g, 4, 4))),
    ),
    k(SUARA_R5, tambah(0, hbAtas("16 : 4 = 4"))),
  ],
};

/* ------------------------------ 3. Bagi Rata: terapan ------------------------------ */
const SUARA_T1 = "Terapkan pada soal ini. Halim punya dua puluh bunga untuk dibagi sama banyak ke empat anak.";
const SUARA_T2 = "Berapa bunga yang didapat tiap anak? Ketuk jawaban yang tepat.";
const SUARA_T3 = "Betul! Dua puluh dibagi empat sama dengan lima.";
const SUARA_T4 = "Jadi tiap anak mendapat lima bunga. Dengan bagi rata, semua bagian sama banyak.";

export const ADEGAN_LUAR_BAGI_TERAPAN: AdeganStory = {
  id: "luar-bagi-terapan",
  judul: "Bagi Rata: bunga Halim",
  sumber: "Metode luar: Bagi Rata",
  latar: "#ECFCCB",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, ...kepala(0)),
      tambah(idx(SUARA_T1, "dua"), ...tumpukan("bunga", 20, 1, 20, { y0: 62, dy: 20, perBaris: 10, dx: 26 })),
      tambah(idx(SUARA_T1, "empat"), ...kartu("so", 50, 96, 200, 26, W.emas, ["20 bunga, 4 anak"], 11)),
    ),
    k(SUARA_T2, tambah(idx(SUARA_T2, "Berapa"), teks("tanya", 150, 142, "20 : 4 = ?", 12, W.ungu)), tambah(idx(SUARA_T2, "jawaban"), ...pilihKata(150, ["4", "5", "6"], 16))),
    k(SUARA_T3, sorotkan(idx(SUARA_T3, "Betul!"), "c2-k"), tambah(idx(SUARA_T3, "Dua"), hbBawah("20 : 4 = 5"))),
    k(SUARA_T4, redamkan(0, "c2-k"), hapus(0, "tanya", ...idPilihan(3)), tambah(idx(SUARA_T4, "tiap"), emo("ok", 150, 150, "✅", 30))),
  ],
};

/* ------------------------------ 9. Ringkasan metode luar ------------------------------ */
const SUARA_Y1 = "Mari kita ringkas tiga metode dari luar. Semuanya membantu kita membagi.";
const SUARA_Y2 = "Metode Bagi Rata, bagikan benda bergiliran sampai habis.";
const SUARA_Y3 = "Metode Kurang Berulang, kurangi terus sampai nol.";
const SUARA_Y4 = "Metode Keluarga Fakta, periksa hasil bagi dengan kali.";
const SUARA_Y5 = "Pilih metode yang kamu suka, lalu periksa dengan metode lain. Hasilnya harus sama.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Metode luar: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Y1, tambah(0, judul("Ringkasan")), tambah(idx(SUARA_Y1, "ringkas"), ...kartu("r0", 14, 34, 272, 30, W.emas, ["3 metode dari luar"], 11))),
    k(SUARA_Y2, tambah(idx(SUARA_Y2, "Bagi"), ...kartu("r1", 14, 72, 272, 34, WARNA_METODE[0], [NAMA_METODE_ID[0], "bagikan bergiliran sampai habis"], 9.2))),
    k(SUARA_Y3, tambah(idx(SUARA_Y3, "Kurang"), ...kartu("r2", 14, 114, 272, 34, WARNA_METODE[1], [NAMA_METODE_ID[1], "kurangi terus sampai nol"], 9.2))),
    k(SUARA_Y4, tambah(idx(SUARA_Y4, "Keluarga"), ...kartu("r3", 14, 156, 272, 34, WARNA_METODE[2], [NAMA_METODE_ID[2], "periksa hasil bagi dengan kali"], 9.2))),
    k(SUARA_Y5, bersih(0), tambah(0, judul("Hasilnya harus sama"), emo("rw", 150, 100, OWL, 54)), tambah(idx(SUARA_Y5, "sama."), emo("rk", 150, 160, "✅", 30))),
  ],
};
