import type { AdeganStory } from "./logika-story";
import { D, E, W, bak, bulat, emo, judul, panah, pecahan, teks, tokoh, tongkat } from "./k4b2b-gambar";
import { hapus, k, sorotkan, tambah, ubah } from "./k4b2b-bantu";

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
const SUARA_BD3 = "Enam lebih besar dari tiga, sehingga enam per delapan lebih banyak dari tiga per delapan.";

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
      tambah("mana", teks("mn", 150, 140, "mana yang lebih banyak?", 10, W.merah)),
    ),
    k(
      SUARA_BD2,
      hapus(0, "mn", "tq"),
      tambah("penyebutnya", teks("ps", 150, 138, "penyebut sama", 10, W.hijau)),
      tambah("bagiannya", teks("bs", 150, 154, "bagian sama besar", 9, W.tinta)),
      tambah("membandingkan", bulat("c1", 262, 47, 9, undefined, W.merah, { tebal: 2.4, z: 5 }), bulat("c2", 262, 99, 9, undefined, W.merah, { tebal: 2.4, z: 5 })),
      sorotkan("pembilangnya.", "fb-p", "fm-p"),
    ),
    k(
      SUARA_BD3,
      hapus(0, "ps", "bs"),
      tambah("Enam", teks("g1", 150, 144, "6 > 3", 16, W.merah)),
      hapus("sehingga", "g1"),
      tambah("sehingga", ...pecahan("ha", 110, 130, 6, 8, 16, W.merah), teks("hg", 150, 142, ">", 22, W.merah), ...pecahan("hb", 190, 130, 3, 8, 16, W.biru)),
      tambah("banyak", emo("mk", 110, 118, E.mahkota, 18)),
    ),
  ],
};

/* ------------------------------ 6. Satria mengaduk bak ------------------------------ */
const SUARA_G1 = "Satria menepati taruhannya dan mulai mengaduk bak-bak itu satu per satu.";
const SUARA_G2 = "Tongkat pengaduk terlalu panjang sehingga ia nyaris tercebur ke dalam bak biru.";
const SUARA_G3 = "Pak Joyo tertawa, dan Laras buru-buru menarik ujung baju Satria.";

export const ADEGAN_MENGADUK: AdeganStory = {
  id: "mengaduk",
  judul: "Satria mengaduk bak",
  sumber: "Materi: Satria mengaduk bak",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Menepati Taruhan"), ...tokoh("st", 60, 184, "Satria")),
      tambah("taruhannya", ...bak("bb", 110, 44, 150, 22, 8, 3, D.biru), ...bak("bm", 110, 80, 150, 22, 8, 6, D.merah)),
      tambah("mengaduk", tongkat("tk", 84, 164, 22, -50)),
      tambah("satu", teks("sp", 200, 140, "1 per 1", 12, W.tinta)),
    ),
    k(
      SUARA_G2,
      hapus(0, "sp"),
      ubah("terlalu", { id: "tk", x2: 60, y2: -100 }),
      tambah("panjang", teks("tp", 190, 140, "terlalu panjang!", 11, W.merah)),
      tambah("nyaris", emo("ky", 22, 160, E.kaget, 22)),
      tambah("tercebur", bulat("pc1", 150, 62, 3, D.biru, W.biru, { z: 5 }), bulat("pc2", 164, 54, 2.4, D.biru, W.biru, { z: 5 }), bulat("pc3", 138, 52, 2, D.biru, W.biru, { z: 5 })),
    ),
    k(
      SUARA_G3,
      hapus(0, "tp"),
      tambah("Pak", ...tokoh("pj", 270, 184, "Pak Joyo")),
      tambah("tertawa,", emo("tw", 240, 160, E.tawa, 22)),
      tambah("Laras", ...tokoh("lr", 110, 184, "Laras")),
      tambah("menarik", panah("pn", 96, 164, -18, 0, W.merah, 2.4)),
      sorotkan("baju", "st-bj"),
    ),
  ],
};
