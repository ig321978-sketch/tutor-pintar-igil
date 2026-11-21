import type { AdeganStory } from "./logika-story";
import { E, G, W, bangun, emo, etalase, judul, kotak, papanNama, tanah, teks, titik, tokoh, tandaSisi } from "./k4b5a-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k4b5a-bantu";

/*
 * Cerita orisinal IGIL "Etalase Keramik Bu Dewi" (Kelas 4 Bab 5 Sub-Bab A, ciri-ciri bangun datar), awal cerita Toko Keramik Bu Dewi.
 * Naskah suara dari naskah/story-naskah-k4b5a.md. Bagian ini: tiba di toko, segi banyak, dan segi banyak beraturan.
 */

/* ------------------------------ 1. Toko ------------------------------ */
const SUARA_T1 = "Pak Hendro mengajak Satria, Laras, dan Genta ke Toko Keramik Bu Dewi untuk membantu menyiapkan pameran mosaik.";
const SUARA_T2 = "Di etalase terpajang keramik hias dengan banyak bentuk yang berbeda-beda.";
const SUARA_T3 = "Bu Dewi memegang katalog kosong dan bertanya, bagaimana kita memilah dan menamai semua bentuk ini?";

export const ADEGAN_TOKO: AdeganStory = {
  id: "toko",
  judul: "Tiba di Toko Keramik Bu Dewi",
  sumber: "Materi: toko keramik",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Toko Keramik Bu Dewi"), ...tanah("tn", 150)),
      tambah("Hendro", ...tokoh("ph", 28, 184, "Pak Hendro")),
      tambah("Satria,", ...tokoh("sa", 72, 184, "Satria")),
      tambah("Laras,", ...tokoh("lr", 108, 184, "Laras")),
      tambah("Genta", ...tokoh("ge", 144, 184, "Genta")),
      tambah("Toko", ...papanNama("pn", 170, 40, 120)),
    ),
    k(
      SUARA_T2,
      tambah("etalase", ...etalase("et", 14, 64, 150, 82), teks("el", 89, 58, "etalase", 9, W.coklat)),
      tambah("keramik", bangun("a1", 40, 86, "persegi", 6, G.biru), bangun("a2", 89, 86, "segitiga-sama-kaki", 5, G.merah), bangun("a3", 138, 86, "jajargenjang", 4, G.kuning)),
      tambah("bentuk", bangun("b1", 40, 126, "belah-ketupat", 6, G.pink), bangun("b2", 89, 126, "layang-layang", 4, G.ungu), bangun("b3", 138, 126, "trapesium", 5, G.oranye)),
    ),
    k(
      SUARA_T3,
      tambah("Dewi", ...tokoh("bd", 214, 184, "Bu Dewi")),
      tambah("katalog", kotak("kat", 232, 88, 52, 40, "#FFF7ED", W.coklat, { rx: 3, tebal: 1.8, z: 1 }), teks("kt", 258, 104, "katalog", 8, W.coklat, { z: 2 })),
      tambah("kosong", teks("ks", 258, 118, "kosong", 8, W.merah, { z: 2 })),
      tambah("bertanya,", emo("bc", 252, 150, E.bicara, 16)),
      tambah("memilah", teks("mq", 196, 118, "?", 22, W.merah, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 2. Segi banyak ------------------------------ */
const SUARA_S1 = "Laras mengangkat sebuah keramik yang tepinya berupa ruas garis lurus dan tertutup rapat.";
const SUARA_S2 = "Bangun seperti itu disebut segi banyak, dan paling sedikit memiliki tiga ruas garis.";
const SUARA_S3 = "Segitiga punya tiga sisi, segiempat punya empat sisi, dan segilima punya lima sisi.";

export const ADEGAN_SEGI_BANYAK: AdeganStory = {
  id: "segi-banyak",
  judul: "Segi banyak dan sisinya",
  sumber: "Materi: segi banyak",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Keramik Segi Banyak"), ...tanah("tn", 150)),
      tambah("Laras", ...tokoh("lr", 40, 184, "Laras")),
      tambah("keramik", bangun("kr", 150, 86, "segilima-sembarang", 13, G.kuning)),
      sorotkan("ruas", "kr"),
      tambah("tertutup", teks("tt", 150, 142, "tertutup rapat", 9, W.merah)),
    ),
    k(
      SUARA_S2,
      hapus(0, "tt"),
      tambah("disebut", teks("sb", 150, 40, "segi banyak", 12, W.hijauTua)),
      tambah("paling", bangun("sg", 252, 86, "segitiga-sama-kaki", 9, G.merah), teks("p1", 252, 52, "paling sedikit", 8.4, W.coklat)),
      tambah("tiga", teks("t3", 252, 122, "3 ruas garis", 8.4, W.merah)),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Tiga Macam Segi Banyak"), ...tanah("tn", 150)),
      tambah("Segitiga", bangun("s3", 60, 88, "segitiga-sama-kaki", 9, G.merah), teks("n3", 60, 50, "segitiga", 9, W.coklat)),
      tambah("tiga@2", teks("b3", 60, 128, "3 sisi", 10, W.merah)),
      tambah("segiempat", bangun("s4", 150, 88, "persegi", 11, G.biru), teks("n4", 150, 50, "segiempat", 9, W.coklat)),
      tambah("empat@2", teks("b4", 150, 128, "4 sisi", 10, W.merah)),
      tambah("segilima", bangun("s5", 240, 88, "segilima-beraturan", 8, G.hijau), teks("n5", 240, 50, "segilima", 9, W.coklat)),
      tambah("lima@2", teks("b5", 240, 128, "5 sisi", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ 3. Beraturan dan tidak beraturan ------------------------------ */
const SUARA_B1 = "Genta meletakkan keramik segienam yang semua sisinya sama panjang dan semua sudutnya sama besar.";
const SUARA_B2 = "Bangun seperti itu disebut segi banyak beraturan.";
const SUARA_B3 = "Keramik yang sisinya ada panjang dan ada pendek disebut segi banyak tidak beraturan.";
const HEX = titik(150, 88, "segienam-beraturan", 11);

export const ADEGAN_BERATURAN: AdeganStory = {
  id: "beraturan",
  judul: "Segi banyak beraturan",
  sumber: "Materi: segi banyak beraturan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Segi Banyak Beraturan"), ...tanah("tn", 150)),
      tambah("Genta", ...tokoh("ge", 40, 184, "Genta")),
      tambah("segienam", bangun("hx", 150, 88, "segienam-beraturan", 11, G.tosca)),
      tambah("panjang", ...tandaSisi("hx", HEX)),
      tambah("sudutnya", ...HEX.map((p, i) => ({ id: `hx-d${i}`, t: "bulat" as const, x: p.x, y: p.y, r: 3, warna: W.merah, garis: W.putih, tebal: 1, z: 6 }))),
      tambah("besar.", teks("sm", 150, 142, "semua sama", 9, W.merah)),
    ),
    k(
      SUARA_B2,
      hapus(0, "sm"),
      tambah("disebut", teks("n1", 150, 38, "segi banyak", 11, W.coklat)),
      tambah("beraturan.", teks("n2", 150, 142, "beraturan", 12, W.hijauTua), emo("ok", 236, 70, E.benar, 20)),
      tambah("seperti", bangun("r1", 52, 90, "segitiga-sama-sisi", 8, G.merah), bangun("r2", 248, 90, "persegi", 8, G.biru)),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Tidak Beraturan"), ...tanah("tn", 150), ...tokoh("ge", 40, 184, "Genta")),
      tambah("Keramik", bangun("ir", 150, 88, "segilima-sembarang", 13, G.pink)),
      tambah("panjang", teks("lp", 150, 134, "panjang", 9, W.merah)),
      tambah("pendek", teks("lq", 84, 104, "pendek", 9, W.coklat)),
      tambah("tidak", teks("n3", 150, 40, "tidak beraturan", 11, W.coklat)),
      tambah("ada", bangun("i2", 250, 92, "segitiga-sembarang", 8, G.oranye), bangun("i3", 56, 70, "trapesium", 6, G.ungu)),
      tambah("beraturan.", emo("xs", 232, 80, E.salah, 20)),
    ),
  ],
};
