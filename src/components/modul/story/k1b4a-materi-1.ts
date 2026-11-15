import type { AdeganStory } from "./logika-story";
import {
  ANAK_EMO,
  OWL,
  W,
  WARNA_LENGKUNG,
  WARNA_SEGIEMPAT,
  WARNA_SEGITIGA,
  bangun,
  bendera,
  bulat,
  donat,
  emo,
  garis,
  idSisi,
  idSudut,
  jam,
  jendela,
  judul,
  kartu,
  kotak,
  kueLapis,
  melon,
  nama,
  papan,
  pintu,
  sudutBangun,
  tangan,
  teks,
  telur,
} from "./k1b4a-gambar";
import { bersih, hapus, hitungSisi, hitungSudut, k, redamkan, sorotkan, tambah } from "./k1b4a-bantu";

/* ------------------------------ 1. Piknik di taman ------------------------------ */
const SUARA_P1 = "Hari ini Kira, Upe, Wei, dan Malosi piknik di taman. Igil, si burung hantu, juga ada di sana.";
const SUARA_P2 = "Di atas tikar ada tiga makanan. Ada donat yang bulat. Ada irisan semangka yang runcing. Ada kue lapis yang punya empat pojok.";
const SUARA_P3 = "Igil bertanya, bentuk apa saja yang kamu temukan? Coba lihat tepi tiap makanan dengan teliti.";
const SUARA_P4 = "Hari ini kita belajar tiga hal. Pertama, bentuk lengkung. Kedua, bentuk segitiga. Ketiga, bentuk segi empat.";
const SUARA_P5 = "Kita hanya menghitung sampai empat. Pelan-pelan saja, ya. Kalau perlu, ketuk bentuknya di layar sambil menghitung.";
const ANAK: [string, number][] = [["Kira", 40], ["Upe", 95], ["Wei", 150], ["Malosi", 205]];

export const ADEGAN_PIKNIK: AdeganStory = {
  id: "piknik",
  judul: "Piknik Kira, Upe, Wei, dan Malosi",
  sumber: "Materi: cerita piknik di taman",
  latar: "#ECFCCB",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Piknik di taman"), garis("tanah", 14, 142, 272, 0, W.hijau, 3)),
      ...ANAK.map(([n, x]) => tambah(n, emo(`a-${n}`, x, 112, ANAK_EMO, 30), teks(`n-${n}`, x, 132, n, 8.6))),
      tambah("Igil", emo("a-Igil", 262, 112, OWL, 30), teks("n-Igil", 262, 132, "Igil", 8.6, W.ungu)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Makanan di tikar"), kotak("tikar", 14, 118, 272, 66, "#FEF3C7", W.coklat, { rx: 8, z: -1 })),
      tambah("donat", donat("pd", 62, 92, 36), nama("pdn", 62, 142, "donat", 9)),
      tambah("semangka", bangun("ps", "segitiga", 150, 92, 46, 40, "#F87171"), nama("psn", 150, 142, "semangka", 9)),
      tambah("lapis", ...kueLapis("pl", 238, 92, 48, 34), nama("pln", 238, 142, "kue lapis", 9)),
    ),
    k(
      SUARA_P3,
      tambah("Igil", emo("ow3", 262, 62, OWL, 28)),
      tambah("temukan?", emo("tn", 150, 52, "❓", 24)),
      sorotkan("tepi", "pd", "ps", "pl"),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Hari ini kita belajar")),
      tambah("lengkung", ...kartu("h1", 20, 36, 260, 32, W.hijauMuda, ["Bentuk lengkung"], 10)),
      tambah("segitiga", ...kartu("h2", 20, 80, 260, 32, W.langit, ["Bentuk segitiga"], 10)),
      tambah("empat", ...kartu("h3", 20, 124, 260, 32, W.pink, ["Bentuk segi empat"], 10)),
    ),
    k(
      SUARA_P5,
      bersih(0),
      tambah(0, judul("Sampai empat saja")),
      tambah("empat", teks("s4", 150, 96, "4", 44, W.merah)),
      tambah("ketuk", tangan(150, 150, "jr")),
    ),
  ],
};

/* ------------------------------ 2. Tiga bentuk di papan ------------------------------ */
const SUARA_T1 = "Igil menunjukkan tiga bentuk di papan tulis. Kita lihat satu per satu.";
const SUARA_T2 = "Bentuk pertama bernama bentuk lengkung. Tepinya melengkung dan tidak punya sudut.";
const SUARA_T3 = "Bentuk kedua bernama segitiga. Punya tiga sisi lurus dan tiga sudut.";
const SUARA_T4 = "Bentuk ketiga bernama segi empat. Punya empat sisi lurus dan empat sudut.";
const SUARA_T5 = "Semua benda di sekitar kita bisa dipilah dengan tiga bentuk ini. Mudah sekali, bukan?";
const TX = [60, 150, 240];
const putihTepi = { garis: W.putih };

export const ADEGAN_TIGA_BENTUK: AdeganStory = {
  id: "tiga-bentuk",
  judul: "Igil menunjukkan tiga bentuk di papan",
  sumber: "Materi: tiga bentuk di papan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Papan tulis Igil"), papan("pp", 14, 30, 272, 134), emo("ig", 266, 196, OWL, 26)),
      tambah("tiga", bulat("b1", TX[0], 78, 21, WARNA_LENGKUNG, W.putih, { tebal: 2 }), bangun("b2", "segitiga", TX[1], 78, 48, 42, WARNA_SEGITIGA, 0, putihTepi), bangun("b3", "segiempat", TX[2], 78, 46, 38, WARNA_SEGIEMPAT, 0, putihTepi)),
    ),
    k(
      SUARA_T2,
      tambah("pertama", teks("m1", TX[0], 120, "Bentuk lengkung", 8.6, W.emas)),
      sorotkan("pertama", "b1"),
      tambah("melengkung", teks("r1a", TX[0], 136, "0 sisi lurus", 8.4, W.putih)),
      tambah("sudut.", teks("r1b", TX[0], 150, "0 sudut", 8.4, W.putih)),
    ),
    k(
      SUARA_T3,
      redamkan(0, "b1"),
      sorotkan("segitiga.", "b2"),
      tambah("segitiga.", teks("m2", TX[1], 120, "Segitiga", 8.6, W.emas)),
      tambah("sisi", teks("r2a", TX[1], 136, "3 sisi lurus", 8.4, W.putih)),
      tambah("sudut.", teks("r2b", TX[1], 150, "3 sudut", 8.4, W.putih)),
    ),
    k(
      SUARA_T4,
      redamkan(0, "b2"),
      sorotkan("segi", "b3"),
      tambah("segi", teks("m3", TX[2], 120, "Segi empat", 8.6, W.emas)),
      tambah("sisi", teks("r3a", TX[2], 136, "4 sisi lurus", 8.4, W.putih)),
      tambah("sudut.", teks("r3b", TX[2], 150, "4 sudut", 8.4, W.putih)),
    ),
    k(SUARA_T5, redamkan(0, "b3"), sorotkan("tiga", "b1", "b2", "b3"), tambah("Mudah", emo("ok", 40, 196, "✅", 26))),
  ],
};

/* ------------------------------ 3. Benda bentuk lengkung ------------------------------ */
const SUARA_L1 = "Lihat meja makan Tika! Ada jam dinding, piring, donat, melon, dan telur.";
const SUARA_L2 = "Semuanya punya tepi yang melengkung. Tidak ada ujung yang runcing, dan tidak ada sudut.";
const SUARA_L3 = "Ketuk tepi donat dengan teliti. Tepinya mulus. Tidak ada sudut di sana.";
const SUARA_L4 = "Ada benda yang bulat. Ada juga benda yang lonjong seperti telur. Keduanya tetap bentuk lengkung.";
const SUARA_L5 = "Bulat penuh seperti ini disebut lingkaran. Jam dinding, piring, donat, dan melon bentuknya lingkaran.";
const SUARA_L6 = "Jadi bentuk lengkung tidak punya sisi lurus dan tidak punya sudut. Itu ciri bentuk lengkung.";
const XL = [40, 95, 150, 205, 258];
const ID_L = ["jm", "pr", "dn", "ml", "te"];

export const ADEGAN_LENGKUNG: AdeganStory = {
  id: "benda-lengkung",
  judul: "Benda bentuk lengkung di meja makan",
  sumber: "Materi: benda bentuk lengkung",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Meja makan Tika")),
      tambah("jam", jam("jm", XL[0], 70, 16), nama("jmn", XL[0], 100, "jam")),
      tambah("piring,", bulat("pr", XL[1], 70, 17, W.putih, W.coklat, { tebal: 2.4 }), nama("prn", XL[1], 100, "piring")),
      tambah("donat,", donat("dn", XL[2], 70, 34), nama("dnn", XL[2], 100, "donat")),
      tambah("melon,", melon("ml", XL[3], 70, 14), nama("mln", XL[3], 100, "melon")),
      tambah("telur.", telur("te", XL[4], 70, 10, 14), nama("ten", XL[4], 100, "telur")),
    ),
    k(
      SUARA_L2,
      sorotkan("tepi", ...ID_L),
      tambah("Tidak", ...kartu("tp", 40, 120, 220, 28, W.krem, ["tepinya melengkung, tanpa sudut"], 9.4)),
    ),
    k(
      SUARA_L3,
      redamkan(0, ...ID_L),
      hapus(0, "tp-k", "tp-t0"),
      tambah("Ketuk", tangan(XL[2], 120)),
      tambah("sudut", teks("ns", 150, 160, "0 sudut", 15, W.merah)),
    ),
    k(
      SUARA_L4,
      hapus(0, "tg", "ns"),
      tambah("bulat.", teks("bl", XL[1], 130, "bulat", 11, W.merah)),
      sorotkan("bulat.", "pr"),
      tambah("lonjong", teks("lj", XL[4], 130, "lonjong", 11, W.merah)),
      redamkan("lonjong", "pr"),
      sorotkan("lonjong", "te"),
    ),
    k(
      SUARA_L5,
      hapus(0, "bl", "lj"),
      redamkan(0, "te"),
      sorotkan("Jam", "jm", "pr", "dn", "ml"),
      tambah("lingkaran.", ...kartu("lg", 40, 130, 220, 26, W.hijauMuda, ["bulat penuh: lingkaran"], 9.8)),
    ),
    k(
      SUARA_L6,
      hapus(0, "lg-k", "lg-t0"),
      redamkan(0, "jm", "pr", "dn", "ml"),
      tambah("sisi", ...kartu("cl", 30, 130, 240, 34, W.emas, ["0 sisi lurus • 0 sudut"], 12)),
    ),
  ],
};

/* ------------------------------ 4. Benda bentuk segitiga ------------------------------ */
const SUARA_G1 = "Halim menemukan benda berbentuk segitiga. Ada tenda, irisan semangka, kue risol, penggaris segitiga, dan kue lupis.";
const SUARA_G2 = "Ujung-ujungnya runcing. Kita lihat satu segitiga saja, supaya hitungannya jelas.";
const SUARA_G3 = "Ayo hitung sisinya. Satu, dua, tiga. Segitiga punya tiga sisi lurus.";
const SUARA_G4 = "Sekarang hitung sudutnya. Satu, dua, tiga. Segitiga punya tiga sudut.";
const SUARA_G5 = "Jadi segitiga punya tiga sisi lurus dan tiga sudut. Banyak sisinya sama dengan banyak sudutnya.";
const XG = [36, 92, 148, 204, 260];
const WARNA_G = ["#60A5FA", "#F87171", "#D97706", "#FDE68A", "#BBF7D0"];
const NAMA_G = ["tenda", "semangka", "risol", "penggaris", "lupis"];
const PT = sudutBangun("segitiga", 150, 108, 110, 92);

export const ADEGAN_SEGITIGA: AdeganStory = {
  id: "benda-segitiga",
  judul: "Benda bentuk segitiga: tiga sisi, tiga sudut",
  sumber: "Materi: benda bentuk segitiga",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Benda segitiga")),
      tambah("Halim", emo("a-Halim", 40, 170, ANAK_EMO, 28), teks("n-Halim", 40, 188, "Halim", 8.6, W.ungu)),
      ...["tenda,", "semangka,", "risol,", "penggaris", "lupis."].map((kata, i) => tambah(kata, bangun(`gt${i}`, "segitiga", XG[i], 76, 36, 32, WARNA_G[i]), nama(`gn${i}`, XG[i], 104, NAMA_G[i]))),
    ),
    k(SUARA_G2, bersih(0), tambah(0, judul("Satu segitiga")), tambah("satu", bangun("sg", "segitiga", 150, 108, 110, 92, WARNA_SEGITIGA, 0, { tebal: 2.2 })), sorotkan("segitiga", "sg")),
    k(SUARA_G3, redamkan(0, "sg"), ...hitungSisi(SUARA_G3, "t", PT, "sisinya."), tambah("lurus.", teks("c1", 150, 192, "3 sisi lurus", 11, W.merah))),
    k(
      SUARA_G4,
      hapus(0, "c1", ...idSisi("t", 3)),
      ...hitungSudut(SUARA_G4, "t", PT, "sudutnya."),
      tambah("sudut.", teks("c2", 150, 192, "3 sudut", 11, W.merah)),
    ),
    k(
      SUARA_G5,
      hapus(0, "c2", ...idSudut("t", 3)),
      sorotkan(0, "sg"),
      tambah("Jadi", ...kartu("sj", 40, 166, 220, 28, W.emas, ["3 sisi lurus • 3 sudut"], 11)),
    ),
  ],
};

/* ------------------------------ 5. Benda bentuk segi empat ------------------------------ */
const SUARA_E1 = "Wei mencari benda di dalam rumah. Ada jendela, pintu, bingkai foto, bendera, dan kue lapis.";
const SUARA_E2 = "Semuanya berbentuk segi empat. Kita lihat satu segi empat dengan teliti.";
const SUARA_E3 = "Hitung sisinya. Satu, dua, tiga, empat. Segi empat punya empat sisi lurus.";
const SUARA_E4 = "Sekarang hitung sudutnya. Satu, dua, tiga, empat. Segi empat punya empat sudut.";
const SUARA_E5 = "Jadi segi empat punya empat sisi lurus dan empat sudut. Banyak sisinya sama dengan banyak sudutnya.";
const PE = sudutBangun("segiempat", 150, 108, 110, 80);

export const ADEGAN_SEGIEMPAT: AdeganStory = {
  id: "benda-segiempat",
  judul: "Benda bentuk segi empat: empat sisi, empat sudut",
  sumber: "Materi: benda bentuk segi empat",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Benda segi empat")),
      tambah("Wei", emo("a-Wei", 40, 170, ANAK_EMO, 28), teks("n-Wei", 40, 188, "Wei", 8.6, W.ungu)),
      tambah("jendela,", ...jendela("ej", XG[0], 76, 34, 30), nama("ejn", XG[0], 104, "jendela")),
      tambah("pintu,", ...pintu("ep", XG[1], 76, 24, 38), nama("epn", XG[1], 104, "pintu")),
      tambah("bingkai", kotak("eb", XG[2] - 17, 62, 34, 28, "#FDE68A", W.coklat, { tebal: 2.4 }), kotak("eb-x", XG[2] - 12, 67, 24, 18, "#E0F2FE", W.coklat, { rx: 0, tebal: 1 }), nama("ebn", XG[2], 104, "bingkai")),
      tambah("bendera,", ...bendera("ed", XG[3], 72, 34, 22), nama("edn", XG[3], 104, "bendera")),
      tambah("lapis.", ...kueLapis("el", XG[4], 76, 38, 28), nama("eln", XG[4], 104, "kue lapis")),
    ),
    k(SUARA_E2, bersih(0), tambah(0, judul("Satu segi empat")), tambah("satu", bangun("se", "segiempat", 150, 108, 110, 80, WARNA_SEGIEMPAT, 0, { tebal: 2.2 })), sorotkan("segi", "se")),
    k(SUARA_E3, redamkan(0, "se"), ...hitungSisi(SUARA_E3, "e", PE, "sisinya."), tambah("lurus.", teks("c1", 150, 192, "4 sisi lurus", 11, W.merah))),
    k(
      SUARA_E4,
      hapus(0, "c1", ...idSisi("e", 4)),
      ...hitungSudut(SUARA_E4, "e", PE, "sudutnya."),
      tambah("sudut.", teks("c2", 150, 192, "4 sudut", 11, W.merah)),
    ),
    k(
      SUARA_E5,
      hapus(0, "c2", ...idSudut("e", 4)),
      sorotkan(0, "se"),
      tambah("Jadi", ...kartu("ej2", 40, 166, 220, 28, W.emas, ["4 sisi lurus • 4 sudut"], 11)),
    ),
  ],
};
