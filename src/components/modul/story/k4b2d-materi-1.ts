import type { AdeganStory } from "./logika-story";
import { E, W, emo, gulungan, ids, judul, kotak, pecah, rumput, sanggar, strip, teks, tokoh } from "./k4b2d-gambar";
import { bersih, k, sorotkan, tambah, warnai } from "./k4b2d-bantu";

/*
 * Cerita orisinal IGIL "Meteran Kain Pak Bagas" (Kelas 4 Bab 2 Sub-Bab D, pecahan per sepuluh dan per seratus menjadi desimal), Sanggar Batik Kampung Mekar.
 * Naskah suara dari naskah/story-naskah-k4b2d.md. Bagian ini: kain bermeteran, tiga per sepuluh meter, dan kisi sepuluh kolom.
 */
const JINGGA = "#FDBA74";

/* ------------------------------ 1. Kain bermeteran ------------------------------ */
const SUARA_M1 = "Pak Bagas, penjual kain meteran, memanggul gulungan kain panjang ke halaman sanggar.";
const SUARA_M2 = "Di pinggir kainnya tercetak garis-garis kecil, tiap meter dibagi menjadi sepuluh bagian sama.";
const SUARA_M3 = "Pak Bagas minta Satria, Laras, dan Genta menuliskan panjang potongan dengan koma.";

export const ADEGAN_METERAN: AdeganStory = {
  id: "meteran",
  judul: "Pak Bagas membawa kain bermeteran",
  sumber: "Materi: kain bermeteran",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Pak Bagas dan Kainnya"), ...rumput("rp", 150)),
      tambah("Bagas,", ...tokoh("pb", 44, 184, "Pak Bagas")),
      tambah("gulungan", ...gulungan("g1", 76, 150, 74, 20)),
      tambah("sanggar.", ...sanggar("sg", 190, 80, 96, 56)),
    ),
    k(
      SUARA_M2,
      bersih(0),
      tambah(0, judul("Garis Meteran")),
      tambah("pinggir", ...strip("mt", 20, 52, 260, 30)),
      tambah("kainnya", ...gulungan("g2", 40, 130, 190, 26)),
      tambah("meter", teks("l1", 50, 100, "1 meter", 11, W.coklat)),
      tambah("sepuluh", teks("l2", 230, 100, "10 bagian", 11, W.ungu)),
    ),
    k(
      SUARA_M3,
      bersih(0),
      tambah(0, judul("Tulis dengan Koma")),
      tambah("Pak", ...tokoh("pb", 28, 184, "Pak Bagas")),
      tambah("Satria,", ...tokoh("st", 82, 184, "Satria")),
      tambah("Laras,", ...tokoh("lr", 136, 184, "Laras")),
      tambah("Genta", ...tokoh("gn", 190, 184, "Genta")),
      tambah("menuliskan", ...tokoh("ph", 244, 184, "Pak Hendro"), kotak("pk", 96, 40, 108, 50, W.putih, W.coklat, { tebal: 2.4 }), teks("pkt", 150, 70, "tulis dengan koma", 9.6, W.biru, { z: 2 })),
      tambah("koma.", emo("ct", 150, 112, E.catat, 20)),
    ),
  ],
};

/* ------------------------------ 2. Tiga per sepuluh meter ------------------------------ */
const SUARA_S1 = "Pak Bagas memotong tiga bagian dari satu meter yang dibagi sepuluh.";
const SUARA_S2 = "Panjangnya tiga per sepuluh meter.";
const SUARA_S3 = "Satu angka di belakang koma menunjukkan persepuluhan.";
const KN = ids("kn", 0, 9);

export const ADEGAN_SEPULUH: AdeganStory = {
  id: "sepuluh",
  judul: "Tiga per sepuluh meter",
  sumber: "Materi: tiga per sepuluh",
  latar: "#EEF2FF",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Satu Meter, Sepuluh Bagian"), ...strip("kn", 20, 36, 260, 28)),
      tambah("Bagas", ...tokoh("pb", 40, 184, "Pak Bagas")),
      tambah("memotong", emo("gt", 74, 160, E.gunting, 22)),
      warnai("tiga", JINGGA, ...KN.slice(0, 3)),
      tambah("tiga", teks("l3", 60, 84, "3 bagian", 11, W.merah)),
      tambah("satu", teks("l1", 150, 84, "1 meter", 11, W.coklat)),
      tambah("sepuluh.", teks("l10", 240, 84, "10 bagian", 11, W.ungu)),
    ),
    k(
      SUARA_S2,
      tambah("Panjangnya", ...pecah("pc", 100, 126, "3", "10", 28)),
      sorotkan("per", "kn0", "kn1", "kn2"),
      tambah("meter.", teks("mt", 150, 145, "meter", 14, W.coklat)),
    ),
    k(
      SUARA_S3,
      tambah("angka", teks("a1", 230, 120, "1 angka", 12, W.merah)),
      tambah("belakang", teks("sm", 188, 148, "=", 24, W.merah)),
      tambah("koma", teks("dc", 230, 152, "0,3", 28, W.biru)),
      tambah("persepuluhan.", teks("pp", 230, 176, "persepuluhan", 10, W.ungu)),
    ),
  ],
};

/* ------------------------------ 3. Kisi sepuluh kolom ------------------------------ */
const SUARA_K1 = "Laras menggambar kisi dengan sepuluh kolom sama besar dan mewarnai tiga kolom.";
const SUARA_K2 = "Tiga per sepuluh ditulis nol koma tiga, dibaca nol koma tiga.";
const SUARA_K3 = "Angka nol di depan koma menunjukkan bahwa belum ada satu meter utuh.";

export const ADEGAN_KISI: AdeganStory = {
  id: "kisi",
  judul: "Kisi sepuluh kolom Laras",
  sumber: "Materi: kisi sepuluh kolom",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Kisi Laras"), ...tokoh("lr", 40, 184, "Laras")),
      tambah("menggambar", emo("pn", 76, 160, E.catat, 20)),
      tambah("kisi", ...strip("ks", 20, 48, 260, 40)),
      tambah("sepuluh", teks("k10", 240, 108, "10 kolom", 11, W.ungu)),
      warnai("mewarnai", JINGGA, "ks0", "ks1", "ks2"),
      tambah("tiga", teks("k3", 60, 108, "3 kolom", 11, W.merah)),
    ),
    k(
      SUARA_K2,
      tambah("Tiga", ...pecah("pc", 100, 134, "3", "10", 26)),
      tambah("ditulis", teks("sm", 150, 152, "=", 24, W.merah)),
      tambah("nol", teks("dc", 215, 152, "0,3", 28, W.biru)),
      tambah("dibaca", teks("br", 215, 176, "dibaca nol koma tiga", 9, W.hijauTua)),
    ),
    k(
      SUARA_K3,
      sorotkan("nol", "dc"),
      tambah("depan", teks("n1", 215, 122, "belum 1 meter", 10, W.merah)),
      tambah("belum", emo("sr", 262, 130, E.seru, 18)),
    ),
  ],
};
