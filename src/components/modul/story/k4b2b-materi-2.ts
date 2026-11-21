import type { AdeganStory } from "./logika-story";
import { D, E, W, bak, bulat, emo, judul, kotak, panah, pecahan, teks, tokoh, tongkat } from "./k4b2b-gambar";
import { hapus, k, sorotkan, tambah } from "./k4b2b-bantu";

/*
 * Cerita orisinal IGIL "Bak Warna Pak Joyo" (K4 Bab 2 Sub-Bab B, membandingkan dan mengurutkan pecahan berpenyebut sama), cerita Sanggar Batik Kampung Mekar.
 * Naskah suara dari naskah/story-naskah-k4b2b.md. Bagian ini: salah langkah Satria (sama-sama penyebut delapan), membandingkan pembilang, Satria mengaduk bak.
 */

const PETAK_BB = Array.from({ length: 3 }, (_, i) => `bb-c${i}`);
const PETAK_BM = Array.from({ length: 6 }, (_, i) => `bm-c${i}`);

/* ------------------------------ 4. Salah langkah: sama-sama penyebut delapan ------------------------------ */
const SUARA_S1 = "Satria melirik sebentar dan berseru, keduanya sama, karena sama-sama penyebut delapan!";
const SUARA_S2 = "Genta mengangkat alis, tetapi Satria sudah terlanjur yakin.";
const SUARA_S3 = "Kalau aku salah, aku mengaduk semua bak warna, katanya sambil mengangkat tongkat pengaduk.";

export const ADEGAN_SALAH_SAMA: AdeganStory = {
  id: "salah-sama",
  judul: "Sama-sama penyebut delapan",
  sumber: "Materi: salah langkah sama-sama penyebut",
  latar: "#FEE2E2",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Kata Satria"), ...tokoh("st", 40, 184, "Satria")),
      tambah("sebentar", ...bak("bb", 90, 40, 150, 22, 8, 3, D.biru), ...pecahan("fb", 268, 46, 3, 8, 14, W.biru)),
      tambah("berseru,", ...bak("bm", 90, 84, 150, 22, 8, 6, D.merah), ...pecahan("fm", 268, 90, 6, 8, 14, W.merah)),
      tambah("sama,", teks("sm", 180, 138, "sama!", 16, W.merah)),
      tambah("penyebut", teks("ps", 180, 156, "penyebut sama", 9, W.tinta)),
    ),
    k(
      SUARA_S2,
      tambah("Genta", ...tokoh("gt", 262, 184, "Genta")),
      tambah("alis,", emo("al", 232, 166, E.pikir, 20)),
      tambah("terlanjur", emo("yk", 80, 164, E.jempol, 20)),
    ),
    k(
      SUARA_S3,
      hapus(0, "sm", "ps"),
      tambah("salah,", teks("tr", 180, 142, "taruhan!", 16, W.merah)),
      tambah("mengaduk", emo("tt", 168, 168, E.tetes, 20)),
      sorotkan("warna,", "bb", "bm"),
      tambah("tongkat", tongkat("tk", 62, 164, 16, -46)),
    ),
  ],
};

/* ------------------------------ 5. Membandingkan pembilang ------------------------------ */
const SUARA_BD1 = "Genta menunjuk bagian terisi pada kedua bak dan bertanya, mana yang lebih banyak?";
const SUARA_BD2 = "Karena penyebutnya sama, bagiannya sama besar, jadi kita cukup membandingkan pembilangnya.";
const SUARA_BD3 = "Enam lebih besar dari tiga, sehingga enam per delapan lebih banyak dari tiga per delapan. Begitu pula satu per tiga kurang dari dua per tiga, dan dua per sepuluh lebih dari satu per sepuluh.";

export const ADEGAN_BANDING: AdeganStory = {
  id: "banding",
  judul: "Membandingkan pembilang",
  sumber: "Materi: membandingkan pembilang",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_BD1,
      tambah(0, judul("Mana Lebih Banyak?"), ...bak("bb", 40, 44, 190, 26, 8, 3, D.biru), ...bak("bm", 40, 96, 190, 26, 8, 6, D.merah), ...pecahan("fb", 262, 52, 3, 8, 16, W.biru), ...pecahan("fm", 262, 104, 6, 8, 16, W.merah)),
      tambah("Genta", ...tokoh("gt", 40, 184, "Genta")),
      sorotkan("terisi", ...PETAK_BB, ...PETAK_BM),
      tambah("bertanya,", emo("tq", 200, 164, E.tanya, 22)),
      tambah("mana", teks("mn", 150, 140, "mana yang lebih banyak?", 11, W.merah)),
    ),
    k(
      SUARA_BD2,
      hapus(0, "mn", "tq"),
      tambah("penyebutnya", teks("ps", 150, 138, "penyebut sama", 11, W.hijau)),
      tambah("bagiannya", teks("bs", 150, 156, "bagian sama besar", 11, W.tinta)),
      tambah("membandingkan", bulat("c1", 262, 47, 9, undefined, W.merah, { tebal: 2.4, z: 5 }), bulat("c2", 262, 99, 9, undefined, W.merah, { tebal: 2.4, z: 5 })),
      sorotkan("pembilangnya.", "fb-p", "fm-p"),
    ),
    k(
      SUARA_BD3,
      hapus(0, "ps", "bs"),
      tambah("Enam", teks("g1", 150, 144, "6 > 3", 16, W.merah)),
      hapus("sehingga", "g1"),
      tambah("sehingga", ...pecahan("ha", 110, 142, 6, 8, 16, W.merah), teks("hg", 150, 154, ">", 22, W.merah), ...pecahan("hb", 190, 142, 3, 8, 16, W.biru)),
      tambah("banyak", emo("mk", 66, 148, E.mahkota, 18)),
      tambah("kurang", teks("c3", 150, 177, "1/3 < 2/3", 12.5, W.hijauTua)),
      tambah("sepuluh", teks("c10", 150, 193, "2/10 > 1/10", 12.5, W.biru)),
    ),
  ],
};

/* ------------------------------ 6. Satria mengaduk bak: dua tongkat pengaduk, tiga per enam meter dan dua per enam meter ------------------------------ */
const SUARA_G1 = "Satria menepati taruhannya, dan Pak Joyo memberinya dua tongkat pengaduk, tiga per enam meter dan dua per enam meter.";
const SUARA_G2 = "Tiga lebih besar dari dua, jadi tongkat tiga per enam meter lebih panjang, dan Satria memilihnya, tetapi nyaris tercebur ke bak biru.";
const SUARA_G3 = "Pak Joyo tertawa, dan Laras buru-buru menarik ujung baju Satria.";
const FTA = pecahan("fa", 72, 62, 3, 6, 15, W.merah);
const FTB = pecahan("fc", 72, 108, 2, 6, 15, W.biru);

export const ADEGAN_MENGADUK: AdeganStory = {
  id: "mengaduk",
  judul: "Satria mengaduk bak",
  sumber: "Materi: Satria mengaduk bak",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Menepati Taruhan"), ...tokoh("st", 40, 184, "Satria")),
      tambah("Pak", ...tokoh("pj", 270, 160, "Pak Joyo")),
      tambah("tongkat", kotak("ta", 96, 56, 90, 9, "#B45309", W.tinta, { rx: 2, tebal: 1.2, z: 2 }), kotak("tb", 96, 102, 60, 9, "#B45309", W.tinta, { rx: 2, tebal: 1.2, z: 2 })),
      tambah("tiga", ...FTA, teks("ma", 220, 66, "meter", 11, W.tinta)),
      tambah("dua@2", ...FTB, teks("mb", 190, 112, "meter", 11, W.tinta)),
    ),
    k(
      SUARA_G2,
      tambah("Tiga", teks("gb", 252, 128, "3 > 2", 16, W.merah)),
      sorotkan("panjang,", "ta"),
      tambah("Satria", tongkat("tk", 62, 166, 22, -50)),
      tambah("tetapi", ...bak("bb", 100, 132, 120, 16, 8, 3, D.biru)),
      tambah("nyaris", emo("ky", 20, 136, E.kaget, 22)),
      tambah("tercebur", bulat("pc1", 150, 124, 3, D.biru, W.biru, { z: 5 }), bulat("pc2", 164, 118, 2.4, D.biru, W.biru, { z: 5 }), bulat("pc3", 138, 118, 2, D.biru, W.biru, { z: 5 })),
    ),
    k(
      SUARA_G3,
      hapus(0, "ta", "tb", "fa-p", "fa-g", "fa-q", "fc-p", "fc-g", "fc-q", "ma", "mb", "gb", "ky"),
      tambah("tertawa,", emo("tw", 240, 128, E.tawa, 22)),
      tambah("Laras", ...tokoh("lr", 110, 184, "Laras")),
      tambah("menarik", panah("pn", 96, 164, -18, 0, W.merah, 2.4)),
      sorotkan("baju", "st-bj"),
    ),
  ],
};
