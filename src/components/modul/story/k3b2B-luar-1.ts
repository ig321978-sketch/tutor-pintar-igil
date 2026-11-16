import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, bagan, emo, judul, kartu, kartuAngka, kalimat, pilihan } from "./k3b2B-gambar";
import { bersih, hapus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k3b2B-bantu";

export const NAMA_METODE_ID = ["Bagan Bilangan Awal dan Bagian", "Operasi Kebalikan", "Bungkus Sepuluh"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara mengajarkan cara berbeda untuk memahami kalimat Matematika. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Bagan Bilangan Awal dan Bagian, Operasi Kebalikan, dan Bungkus Sepuluh.";
const SUARA_O3 = "Semua metode ini menjawab satu pertanyaan. Bagaimana kita mencari bilangan yang belum diketahui pada pengurangan?";
const SUARA_O4 = "Kita memakai satu cerita. Halim punya delapan puluh ekor ayam, sebagian dijual, dan tersisa empat puluh lima ekor.";
const SUARA_O5 = "Semua bilangannya paling besar seratus. Siap? Ayo mulai dengan metode pertama.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk kalimat pengurangan",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)), tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      tambah("Bagan", ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah("Operasi", ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah("Bungkus", ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah("satu", emo("i1", 60, 84, "\u{1F522}", 34), emo("i2", 150, 84, "❓", 34), emo("i3", 240, 84, "\u{1F440}", 34)),
      tambah("Bagaimana", ...kartu("iq", 20, 112, 260, 52, W.emas, ["bagaimana mencari bilangan", "yang belum diketahui?"], 10)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Satu cerita")),
      tambah("Halim", emo("eh", 60, 70, "\u{1F466}", 34), emo("ay", 150, 70, "\u{1F414}", 34)),
      tambah(idx(SUARA_O4, "dijual,"), emo("ps", 240, 70, "\u{1F6D2}", 34)),
      tambah("tersisa", ...kartu("cs", 40, 110, 220, 44, W.krem, ["80 − … = 45"], 20)),
    ),
    k(SUARA_O5, bersih(0), tambah(0, judul("Bilangan terbesar")), tambah("seratus.", ...kartuAngka("om", 100, 56, "100", W.emas, 100, 44, 26)), tambah("Siap?", emo("ow", 150, 150, OWL, 36), emo("e1", 60, 150, "🔢", 30), emo("e2", 240, 150, "👍", 30))),
  ],
};

/* ------------------------------ 2. Bagan Bilangan Awal dan Bagian: konsep ------------------------------ */
const BN = bagan("bn", { y: 62, atas: "80", a: "?", b: "45", fa: 35 / 80 });
const SUARA_N1 = "Metode pertama bernama Bagan Bilangan Awal dan Bagian. Kita melihat cerita sebagai batang-batang.";
const SUARA_N2 = "Batang atas menunjukkan bilangan awal, yaitu delapan puluh.";
const SUARA_N3 = "Dua batang di bawahnya adalah dua bagian. Satu bagian adalah sisa, yaitu empat puluh lima.";
const SUARA_N4 = "Bagian yang belum diketahui diberi tanda tanya.";
const SUARA_N5 = "Bilangan awal sama dengan jumlah kedua bagian. Jadi bagian yang hilang adalah delapan puluh kurang empat puluh lima.";

export const ADEGAN_LUAR_BAGAN: AdeganStory = {
  id: "luar-bagan",
  judul: "Bagan Bilangan Awal dan Bagian: batang dan bagian",
  sumber: "Metode luar: Bagan Bilangan Awal dan Bagian",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_N1, tambah("pertama", ...kepala(0)), tambah("batang-batang.", emo("bt", 150, 118, "\u{1F4CA}", 46))),
    k(SUARA_N2, hapus(0, "bt"), tambah("atas", ...BN.atas)),
    k(SUARA_N3, tambah("bagian.", ...BN.b), sorotkan("sisa,", "bn_B")),
    k(SUARA_N4, redamkan(0, "bn_B"), tambah("belum", ...BN.a), sorotkan("tanda", "bn_A")),
    k(SUARA_N5, redamkan(0, "bn_A"), tambah("Jadi", kalimat("hit", 170, "80 − 45 = 35", 24, W.merah)), ubah(idx(SUARA_N5, "kurang"), { id: "bn_An", isi: "35", warna: W.biru })),
  ],
};

/* ------------------------------ 3. Bagan Bilangan Awal dan Bagian: terapan ------------------------------ */
const BT = bagan("bt", { y: 58, atas: "70", a: "?", b: "23", fa: 47 / 70 });
const SUARA_T1 = "Terapkan bagan pada tujuh puluh kurang titik-titik sama dengan dua puluh tiga.";
const SUARA_T2 = "Berapa bagian yang hilang? Ketuk jawabannya. Sembilan puluh tiga, empat puluh tujuh, atau lima puluh tujuh?";
const SUARA_T3 = "Betul! Bagian yang hilang adalah tujuh puluh kurang dua puluh tiga, yaitu empat puluh tujuh.";
const SUARA_T4 = "Hebat! Bila batang atas yang tidak diketahui, kita tambahkan kedua bagian.";

export const ADEGAN_LUAR_BAGAN_TERAPAN: AdeganStory = {
  id: "luar-bagan-terapan",
  judul: "Bagan Bilangan Awal dan Bagian: tujuh puluh kurang titik-titik",
  sumber: "Metode luar: Bagan Bilangan Awal, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_T1, tambah("Terapkan", ...kepala(0)), tambah("tujuh", ...BT.atas), tambah("titik-titik", ...BT.a), tambah("dua", ...BT.b)),
    k(SUARA_T2, tambah("Berapa", ...pilihan(138, ["93", "47", "57"])), sorotkan("hilang?", "bt_A")),
    k(SUARA_T3, sorotkan("Betul!", "c2-k"), hapus(0, "c1-k", "c1-t", "c3-k", "c3-t"), ubah(idx(SUARA_T3, "tujuh", 2), { id: "bt_An", isi: "47", warna: W.biru }), tambah("Betul!", kalimat("hit", 194, "70 − 23 = 47", 18, W.merah))),
    k(SUARA_T4, redamkan(0, "c2-k", "bt_A"), tambah("Hebat!", emo("ok", 262, 194, "✅", 22)), sorotkan("atas", "bt_T")),
  ],
};
