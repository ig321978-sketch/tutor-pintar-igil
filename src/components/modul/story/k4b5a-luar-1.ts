import type { AdeganStory } from "./logika-story";
import { E, K, W, bangunKapur, emo, garis, judul, kotak, papanTulis, tanah, teks, tokoh } from "./k4b5a-gambar";
import { bersih, hapus, k, tambah } from "./k4b5a-bantu";

/*
 * Cerita orisinal IGIL "Etalase Keramik Bu Dewi" (Kelas 4 Bab 5 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b5a.md. Bagian ini: pembuka (katalog yang kosong), Sort the Tiles (Pilah Keramik), dan terapannya.
 */

export const NAMA_METODE = ["Sort the Tiles", "Sides and Corners", "Shape Family Tree"] as const;
export const NAMA_METODE_ID = ["Pilah Keramik", "Sisi dan Sudut", "Pohon Keluarga Bentuk"] as const;

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Pagi itu, di tepi etalase, Bu Dewi membuka katalog yang masih kosong dan menunggu diisi.";
const SUARA_O2 = "Ada tiga cara supaya keramik mudah dikenali, tanpa tertukar nama dan cirinya.";
const SUARA_O3 = "Tiga cara itu: Sort the Tiles, Sides and Corners, dan Shape Family Tree.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Pilah Keramik, Sisi dan Sudut, dan Pohon Keluarga Bentuk.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Katalog Bu Dewi yang kosong",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Pagi di Toko Keramik"), ...tanah("tn", 150), emo("mt", 262, 46, E.matahari, 26)),
      tambah("Bu", ...tokoh("bd", 60, 184, "Bu Dewi")),
      tambah("katalog", kotak("gl", 130, 70, 110, 56, "#FFF7ED", W.kayuTua, { rx: 4, tebal: 1.8, z: 1 }), teks("dn", 185, 62, "katalog", 8.4, W.coklat)),
      tambah("kosong", teks("ks", 185, 102, "masih kosong", 8.4, W.coklat, { z: 2 })),
    ),
    k(
      SUARA_O2,
      hapus(0, "gl", "dn", "ks"),
      tambah("tiga", teks("n3", 110, 60, "3 cara", 12, W.merah)),
      tambah("cara", ...[0, 1, 2].flatMap((i) => [kotak(`c${i}-k`, 90 + i * 34, 74, 28, 24, "#FDE68A", W.coklat, { rx: 4 }), teks(`c${i}-t`, 104 + i * 34, 90, "cara", 6.4, W.coklat)])),
      tambah("mudah", emo("ok", 262, 100, E.benar, 20)),
      tambah("tertukar", emo("xs", 236, 100, E.salah, 18)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara"), teks("n3", 260, 40, "3 cara", 10, W.merah)),
      tambah("Sort", teks("m0", 112, 70, "1. Sort the Tiles", 10, W.hijauTua), emo("i0", 30, 72, E.segilima, 16)),
      tambah("Sides", teks("m1", 112, 120, "2. Sides and Corners", 10, W.hijauTua), emo("i1", 30, 122, E.penggaris, 16)),
      tambah("Shape", teks("m2", 112, 170, "3. Shape Family Tree", 10, W.hijauTua), emo("i2", 30, 172, E.pohon, 16)),
    ),
    k(
      SUARA_O4,
      tambah("Nama", kotak("bk", 196, 52, 100, 130, "#7C2D12", W.putih, { rx: 6, tebal: 1, z: -1 })),
      tambah("Pilah", teks("g0", 246, 70, "Pilah Keramik", 9, W.sorot)),
      tambah("Sisi", teks("g1", 246, 120, "Sisi dan Sudut", 9, W.sorot)),
      tambah("Pohon", teks("g2", 246, 170, "Pohon Keluarga Bentuk", 7.5, W.sorot)),
    ),
  ],
};

/* ------------------------------ Sort the Tiles: konsep ------------------------------ */
const SUARA_P1 = "Cara pertama, Sort the Tiles, atau Pilah Keramik.";
const SUARA_P2 = "Kita memisahkan keramik menjadi golongan menurut satu ciri yang sama, seperti banyak sisinya.";
const SUARA_P3 = "Setiap keramik harus masuk tepat ke satu golongan, tidak boleh ada yang tersisa dan tidak boleh ganda.";
const SUARA_P4 = "Ciri yang dipakai harus jelas, supaya siapa pun memilah dengan hasil yang sama.";

export const ADEGAN_LUAR_PILAH: AdeganStory = {
  id: "luar-pilah",
  judul: "Sort the Tiles: Pilah Keramik",
  sumber: "Metode global: Sort the Tiles (konsep)",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Cara 1: Sort the Tiles"), ...papanTulis("pt", 8, 28, 284, 132)),
      tambah("Sort", teks("nm", 150, 56, "Sort the Tiles", 13, K.kapurMerah)),
      tambah("Pilah", teks("ni", 150, 74, "Pilah Keramik", 10, K.kapur)),
      tambah("Keramik.", kotak("rk", 106, 92, 88, 44, undefined, K.kapurBiru, { rx: 2, tebal: 1.4, putus: true, z: 2 }), teks("rkt", 150, 118, "rak keramik", 8, K.kapurBiru)),
    ),
    k(
      SUARA_P2,
      hapus(0, "rk", "rkt", "nm", "ni"),
      tambah("memisahkan", bangunKapur("ta", 54, 84, "segitiga-sama-kaki", 7), bangunKapur("tb", 104, 84, "segitiga-siku", 8), bangunKapur("pa", 200, 84, "persegi", 8), bangunKapur("pb", 250, 84, "jajargenjang", 5)),
      tambah("golongan", teks("gl", 79, 126, "golongan A", 8, K.kapurBiru), teks("gm", 225, 126, "golongan B", 8, K.kapurBiru)),
      tambah("satu", teks("sa1", 150, 48, "1 ciri", 11, K.kapurMerah)),
      tambah("banyak", teks("sa2", 150, 62, "banyak sisi", 9, K.kapur)),
    ),
    k(
      SUARA_P3,
      hapus(0, "sa1", "sa2"),
      tambah("tepat", teks("tp", 150, 48, "1 keramik, 1 golongan", 9, K.kapurMerah)),
      tambah("tersisa", teks("ts", 150, 90, "tidak tersisa", 8, K.kapur)),
      tambah("ganda.", teks("gd", 150, 104, "tidak ganda", 8, K.kapur), emo("ok", 150, 140, E.benar, 18)),
    ),
    k(
      SUARA_P4,
      hapus(0, "tp", "ts", "gd", "ok"),
      tambah("jelas,", teks("cj", 150, 50, "ciri jelas", 11, K.kapurMerah)),
      tambah("siapa", emo("o1", 110, 146, E.satria, 16), emo("o2", 150, 146, E.laras, 16), emo("o3", 190, 146, E.genta, 16)),
      tambah("hasil", teks("hs", 150, 104, "hasil sama", 9, K.kapur), emo("ok2", 150, 126, E.benar, 18)),
    ),
  ],
};

/* ------------------------------ Sort the Tiles: terapan ------------------------------ */
const SUARA_T1 = "Laras memilah keramik menjadi golongan bersisi tiga, bersisi empat, dan bersisi lima.";
const SUARA_T2 = "Dalam sekejap, etalase yang berantakan menjadi tiga deretan yang rapi.";
const SUARA_T3 = "Cocok untuk banyak bangun yang bercampur, karena kita mulai dari ciri yang paling mudah dilihat.";
const SUARA_T4 = "Kurang cocok untuk membedakan bangun yang sisinya sama banyak, karena butuh ciri tambahan.";

export const ADEGAN_LUAR_PILAH_TERAPAN: AdeganStory = {
  id: "luar-pilah-terapan",
  judul: "Pilah Keramik: kapan cocok",
  sumber: "Metode global: Sort the Tiles (terapan)",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Rak Laras"), ...papanTulis("pt", 8, 28, 284, 124), ...tokoh("lr", 40, 184, "Laras")),
      tambah("tiga,", bangunKapur("g3", 100, 84, "segitiga-sama-kaki", 7), teks("l3", 100, 124, "3 sisi", 9, K.kapurMerah)),
      tambah("empat,", bangunKapur("g4", 170, 84, "persegi", 8), teks("l4", 170, 124, "4 sisi", 9, K.kapurMerah)),
      tambah("lima.", bangunKapur("g5", 240, 84, "segilima-beraturan", 7), teks("l5", 240, 124, "5 sisi", 9, K.kapurMerah)),
    ),
    k(
      SUARA_T2,
      tambah("sekejap,", teks("br", 170, 46, "berantakan", 9, K.kapurMerah)),
      hapus("tiga", "br"),
      tambah("tiga", teks("dr", 170, 46, "3 deretan", 11, K.kapurMerah)),
      tambah("deretan", ...[100, 170, 240].map((x, i) => garis(`rk${i}`, x - 30, 104, 60, 0, K.kapurBiru, 2))),
      tambah("rapi.", emo("ok", 270, 56, E.benar, 20)),
    ),
    k(
      SUARA_T3,
      hapus(0, "dr", "ok"),
      tambah("Cocok", emo("ok2", 270, 56, E.benar, 22)),
      tambah("bercampur,", teks("bc", 170, 48, "banyak bangun bercampur", 8.4, K.kapurMerah)),
      tambah("mudah", teks("md", 170, 144, "ciri paling mudah dilihat", 8, K.kapur)),
    ),
    k(
      SUARA_T4,
      hapus(0, "ok2", "bc", "md"),
      tambah("Kurang", emo("xs", 270, 56, E.salah, 22)),
      tambah("sisinya", teks("sb", 170, 48, "sisi sama banyak", 8.4, K.kapurMerah)),
      tambah("butuh", teks("bt", 170, 144, "butuh ciri tambahan", 8, K.kapur)),
    ),
  ],
};
