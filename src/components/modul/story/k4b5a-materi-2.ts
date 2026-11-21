import type { AdeganStory } from "./logika-story";
import { E, G, W, bangun, emo, etalase, garis, judul, penyiku, tanah, tandaSisi, tandaSiku, teks, titik, tokoh } from "./k4b5a-gambar";
import { bersih, hapus, k, tambah } from "./k4b5a-bantu";

/*
 * Cerita orisinal IGIL "Etalase Keramik Bu Dewi" (Kelas 4 Bab 5 Sub-Bab A, ciri-ciri bangun datar), awal cerita Toko Keramik Bu Dewi.
 * Naskah suara dari naskah/story-naskah-k4b5a.md. Bagian ini: jenis segitiga, salah langkah jajargenjang yang dikira persegi panjang (taruhan mengelap etalase), dan memeriksa sudut dengan penyiku.
 */

/* ------------------------------ 4. Jenis segitiga ------------------------------ */
const SUARA_G1 = "Laras menggolongkan segitiga menurut sisinya: tiga sisi sama panjang disebut segitiga sama sisi.";
const SUARA_G2 = "Dua sisi sama panjang disebut segitiga sama kaki, dan sisi yang berbeda semua disebut segitiga sembarang.";
const SUARA_G3 = "Menurut sudutnya, segitiga yang punya sudut siku-siku disebut segitiga siku-siku.";
const SS = titik(170, 90, "segitiga-sama-sisi", 12);
const SK = titik(110, 88, "segitiga-sama-kaki", 11);
const SR = titik(170, 90, "segitiga-siku", 18);

export const ADEGAN_SEGITIGA: AdeganStory = {
  id: "segitiga",
  judul: "Jenis-jenis segitiga",
  sumber: "Materi: jenis segitiga",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Segitiga Menurut Sisinya"), ...tanah("tn", 150)),
      tambah("Laras", ...tokoh("lr", 40, 184, "Laras")),
      tambah("segitiga", bangun("sa", 170, 90, "segitiga-sama-sisi", 12, G.merah)),
      tambah("tiga", ...tandaSisi("sa", SS), teks("t3", 170, 136, "3 sisi sama", 9, W.merah)),
      tambah("disebut", teks("nm", 170, 44, "sama sisi", 11, W.hijauTua)),
    ),
    k(
      SUARA_G2,
      bersih(0),
      tambah(0, judul("Segitiga Menurut Sisinya"), ...tanah("tn", 150), ...tokoh("lr", 40, 184, "Laras")),
      tambah("Dua", bangun("sk", 110, 88, "segitiga-sama-kaki", 11, G.kuning), ...tandaSisi("sk", SK), teks("t2", 110, 134, "2 sisi sama", 9, W.merah)),
      tambah("kaki,", teks("n2", 110, 44, "sama kaki", 10, W.hijauTua)),
      tambah("berbeda", bangun("sb", 232, 88, "segitiga-sembarang", 9, G.biru), teks("t4", 232, 134, "berbeda semua", 9, W.merah)),
      tambah("sembarang.", teks("n4", 232, 44, "sembarang", 10, W.hijauTua)),
    ),
    k(
      SUARA_G3,
      bersih(0),
      tambah(0, judul("Segitiga Menurut Sudutnya"), ...tanah("tn", 150), ...tokoh("lr", 40, 184, "Laras")),
      tambah("segitiga", bangun("sr", 170, 90, "segitiga-siku", 18, G.hijau), teks("nm", 170, 44, "segitiga siku-siku", 11, W.hijauTua)),
      tambah("siku-siku", tandaSiku("sr", SR, 1, 9)),
      tambah("disebut", teks("ss", 80, 112, "siku-siku", 9, W.merah), garis("pa", 104, 112, 18, 0, W.merah, 1.6)),
    ),
  ],
};

/* ------------------------------ 5. Salah: jajargenjang dikira persegi panjang ------------------------------ */
const SUARA_J1 = "Genta menaruh keramik jajargenjang di samping keramik persegi panjang.";
const SUARA_J2 = "Satria berseru, kedua keramik ini sama saja, karena sisi yang berhadapan sama panjang!";
const SUARA_J3 = "Kalau aku salah, aku mengelap seluruh etalase, katanya sambil menggulung lengan baju.";
const JG = titik(110, 88, "jajargenjang", 11);
const PP = titik(215, 88, "persegi-panjang", 11);

export const ADEGAN_SALAH_JAJARGENJANG: AdeganStory = {
  id: "salah-jajargenjang",
  judul: "Satria mengira keduanya sama",
  sumber: "Materi: salah langkah jajargenjang",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, judul("Dua Keramik Berdampingan"), ...tanah("tn", 150)),
      tambah("Genta", ...tokoh("ge", 40, 184, "Genta")),
      tambah("jajargenjang", bangun("jg", 110, 88, "jajargenjang", 11, G.kuning), teks("n1", 110, 130, "jajargenjang", 9, W.coklat)),
      tambah("persegi", bangun("pp", 215, 88, "persegi-panjang", 11, G.hijau), teks("n2", 215, 130, "persegi panjang", 9, W.coklat)),
    ),
    k(
      SUARA_J2,
      tambah("Satria", ...tokoh("sa", 80, 184, "Satria")),
      tambah("berseru,", emo("cm", 118, 166, E.cemberut, 18)),
      tambah("sama", teks("ss", 160, 44, "sama saja?", 11, W.merah)),
      tambah("berhadapan", ...tandaSisi("jg", JG), ...tandaSisi("pp", PP)),
      tambah("panjang!", teks("sj", 160, 144, "sisi berhadapan sama panjang", 8, W.merah)),
    ),
    k(
      SUARA_J3,
      hapus(0, "cm", "ss", "sj"),
      tambah("salah,", teks("ks", 266, 40, "kalau salah:", 8.4, W.merah)),
      tambah("mengelap", teks("sj2", 266, 52, "mengelap", 9, W.coklat), emo("sk", 266, 80, E.sponge, 22)),
      tambah("menggulung", emo("ku", 118, 166, E.kuat, 20)),
    ),
  ],
};

/* ------------------------------ 6. Memeriksa sudut dengan penyiku ------------------------------ */
const SUARA_P1 = "Laras menempelkan penyiku kayu ke sudut keramik persegi panjang, dan pas sekali.";
const SUARA_P2 = "Pada jajargenjang, penyiku itu tidak pas, karena sudutnya miring dan bukan sudut siku-siku.";
const SUARA_P3 = "Satria mengelap etalase sampai topinya tersangkut kain lap, dan semua orang tertawa.";
const PR = titik(170, 84, "persegi-panjang", 15);
const PJ = titik(170, 84, "jajargenjang", 12);

export const ADEGAN_PERIKSA_SUDUT: AdeganStory = {
  id: "periksa-sudut",
  judul: "Memeriksa sudut dengan penyiku",
  sumber: "Materi: memeriksa sudut",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Penyiku Kayu Laras"), ...tanah("tn", 150)),
      tambah("Laras", ...tokoh("lr", 40, 184, "Laras")),
      tambah("menempelkan", bangun("pr", 170, 84, "persegi-panjang", 15, G.hijau), teks("np", 170, 134, "persegi panjang", 9, W.coklat)),
      tambah("penyiku", penyiku("py", PR[3].x, PR[3].y, 34, 6)),
      tambah("pas", tandaSiku("pr", PR, 3, 9), emo("ok", 244, 84, E.benar, 22)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Penyiku Tidak Pas"), ...tanah("tn", 150), ...tokoh("lr", 40, 184, "Laras")),
      tambah("jajargenjang,", bangun("pj", 170, 84, "jajargenjang", 12, G.kuning), teks("nj", 170, 128, "jajargenjang", 9, W.coklat)),
      tambah("penyiku", penyiku("py", PJ[3].x, PJ[3].y, 34, 6)),
      tambah("tidak", emo("xs", 252, 84, E.salah, 22)),
      tambah("miring", teks("mr", 96, 84, "miring", 9, W.merah)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Satria Mengelap Etalase"), ...tanah("tn", 150), ...etalase("et", 150, 44, 130, 86)),
      tambah("Satria", ...tokoh("sa", 70, 184, "Satria")),
      tambah("mengelap", emo("sp", 120, 120, E.sponge, 22), bangun("c1", 180, 70, "persegi", 5, G.biru), bangun("c2", 230, 70, "belah-ketupat", 5, G.pink)),
      tambah("tersangkut", teks("lp", 110, 80, "kain lap", 9, W.coklat)),
      tambah("tertawa.", emo("t1", 40, 150, E.tertawa, 18), emo("t2", 100, 150, E.tertawa, 18), emo("t3", 130, 150, E.tertawa, 18)),
    ),
  ],
};
