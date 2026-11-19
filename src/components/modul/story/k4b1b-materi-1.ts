import type { AdeganStory } from "./logika-story";
import { E, W, angkaSel, deretBalok, emo, judul, ikat, kotak, kotakKarton, lantai, papan4, papanNama, peti, gudang, lembar, teks, tokoh, tumpukan } from "./k4b1b-gambar";
import { bersih, k, sorotkan, tambah } from "./k4b1b-bantu";

/*
 * Cerita orisinal IGIL "Gudang Handuk Pak Laode" (Kelas 4 Bab 1 Sub-Bab B, tempat angka dan banyaknya tiap angka), lanjutan Penginapan Pulau Karang Indah.
 * Naskah suara dari naskah/story-naskah-k4b1b.md. Bagian ini: gudang, aturan sepuluh kali, dan menghitung isi gudang.
 */

/* ------------------------------ 1. Gudang ------------------------------ */
const SUARA_G1 = "Pak Laode membuka pintu gudang di belakang penginapan dan menunjukkan tumpukan handuk.";
const SUARA_G2 = "Handuk itu disusun dalam peti, kotak, ikat, dan lembar.";
const SUARA_G3 = "Ia ingin tahu berapa seluruh handuk, dan meminta bantuan Satria, Laras, dan Genta.";
const JENIS = ["peti", "kotak", "ikat", "lembar"] as const;
const CX = [45, 115, 185, 255];

export const ADEGAN_GUDANG: AdeganStory = {
  id: "gudang",
  judul: "Gudang handuk di belakang penginapan",
  sumber: "Materi: gudang handuk",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Gudang Handuk"), ...lantai("hl", 150), ...tokoh("pl", 262, 184, "Pak Laode")),
      tambah("pintu", ...gudang("gd", 16, 82, 110, 62), ...papanNama("pn", 71, 36, "GUDANG HANDUK", 100)),
      tambah("penginapan", ...papanNama("pg", 218, 56, "PENGINAPAN", 90)),
      tambah("tumpukan", ...tumpukan("tm", 150, 144, 5, 34)),
      tambah("handuk", teks("hd", 167, 100, "handuk", 8.5, W.ungu)),
    ),
    k(
      SUARA_G2,
      bersih(0),
      tambah(0, judul("Disusun Begitu")),
      tambah("peti", ...peti("b0", CX[0] - 13, 60, 26), teks("l0", CX[0], 112, JENIS[0], 9, W.coklat)),
      tambah("kotak", ...kotakKarton("b1", CX[1] - 11, 63, 22), teks("l1", CX[1], 112, JENIS[1], 9, W.coklat)),
      tambah("ikat", ...ikat("b2", CX[2] - 9, 66, 18), teks("l2", CX[2], 112, JENIS[2], 9, W.coklat)),
      tambah("lembar", ...lembar("b3", CX[3] - 8, 70, 16), teks("l3", CX[3], 112, JENIS[3], 9, W.coklat)),
    ),
    k(
      SUARA_G3,
      tambah("berapa", teks("tq", 150, 142, "?", 26, W.tanya)),
      tambah("seluruh", teks("sr", 150, 84, "seluruhnya?", 8.5, W.merah)),
      tambah("Satria", ...tokoh("sa", 60, 184, "Satria")),
      tambah("Laras", ...tokoh("la", 130, 184, "Laras")),
      tambah("Genta", ...tokoh("ge", 200, 184, "Genta")),
    ),
  ],
};

/* ------------------------------ 2. Aturan ------------------------------ */
const SUARA_A1 = "Genta menerangkan, satu peti berisi sepuluh kotak, satu kotak berisi sepuluh ikat.";
const SUARA_A2 = "Satu ikat berisi sepuluh lembar, jadi tiap tempat sepuluh kali tempat di kanannya.";
const SUARA_A3 = "Satu peti sama dengan seribu lembar.";

export const ADEGAN_ATURAN: AdeganStory = {
  id: "aturan",
  judul: "Aturan tempat sepuluh kali",
  sumber: "Materi: aturan sepuluh kali",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Aturan Tempat")),
      tambah("Genta", ...tokoh("gt", 262, 184, "Genta")),
      tambah("peti", ...peti("p1", 24, 36, 26)),
      tambah("sepuluh", teks("r1", 150, 56, "1 peti = 10 kotak", 10, W.biru)),
      tambah("satu@2", ...kotakKarton("k1", 22, 80, 22)),
      tambah("sepuluh@2", teks("r2", 150, 98, "1 kotak = 10 ikat", 10, W.biru)),
    ),
    k(
      SUARA_A2,
      tambah("ikat", ...ikat("i1", 24, 124, 18)),
      tambah("sepuluh", teks("r3", 150, 140, "1 ikat = 10 lembar", 10, W.biru)),
      tambah("kali", teks("x1", 254, 56, "× 10", 11, W.merah), teks("x2", 254, 98, "× 10", 11, W.merah), teks("x3", 254, 140, "× 10", 11, W.merah)),
    ),
    k(
      SUARA_A3,
      sorotkan("peti", "p1"),
      tambah("sama", ...lembar("l1", 26, 160, 16)),
      tambah("seribu", teks("sb", 130, 172, "1 peti = 1.000 lembar", 11, W.merah)),
      tambah("lembar", emo("kk", 220, 150, E.kilau, 18)),
    ),
  ],
};

/* ------------------------------ 3. Hitung ------------------------------ */
const SUARA_H1 = "Laras menghitung isi gudang, yaitu dua peti, tiga kotak, tidak ada ikat, dan empat lembar.";
const SUARA_H2 = "Ia menulisnya pada papan: dua, tiga, nol, empat.";
const SUARA_H3 = "Jadi seluruh handuk dua ribu tiga ratus empat.";
const CK = [38, 98, 158, 218];

export const ADEGAN_HITUNG: AdeganStory = {
  id: "hitung",
  judul: "Laras menghitung isi gudang",
  sumber: "Materi: menghitung isi gudang",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Isi Gudang"), ...tokoh("la", 268, 184, "Laras")),
      tambah("peti", ...deretBalok("peti", "q", CK[0], 56, 2, 20), teks("n0", CK[0], 106, "2 peti", 9, W.coklat)),
      tambah("kotak", ...deretBalok("kotak", "w", CK[1], 58, 3, 16), teks("n1", CK[1], 106, "3 kotak", 9, W.coklat)),
      tambah("ikat", kotak("ko", CK[2] - 22, 56, 44, 34, undefined, W.abu, { rx: 4, tebal: 1.4, putus: true, z: 1 }), teks("n2", CK[2], 106, "0 ikat", 9, W.coklat)),
      tambah("lembar", ...deretBalok("lembar", "e", CK[3], 62, 4, 11, 2), teks("n3", CK[3], 106, "4 lembar", 9, W.coklat)),
    ),
    k(
      SUARA_H2,
      bersih(0),
      tambah(0, judul("Ditulis pada Papan"), ...tokoh("la", 268, 184, "Laras")),
      tambah("papan", ...papan4("pp", 30, 56, 56, ["", "", "", ""])),
      tambah("dua", angkaSel("pp", 30, 56, 56, 0, 2)),
      tambah("tiga", angkaSel("pp", 30, 56, 56, 1, 3)),
      tambah("nol", angkaSel("pp", 30, 56, 56, 2, 0)),
      tambah("empat", angkaSel("pp", 30, 56, 56, 3, 4)),
    ),
    k(
      SUARA_H3,
      tambah("seluruh", teks("sl", 150, 132, "seluruh handuk", 9, W.ungu)),
      tambah("dua", teks("hs", 150, 160, "2.304", 24, W.merah)),
      sorotkan("ratus", "pp-c0", "pp-c1", "pp-c2", "pp-c3"),
    ),
  ],
};

