import type { AdeganStory } from "./logika-story";
import { E, W, WL, bulat, emo, garisAbs, judul, kotak, padi, rumput, tali, tandaSiku, tenda, teks, tiang, tokoh, pojok } from "./k3b4C-gambar";
import { k, sorotkan, tambah } from "./k3b4C-bantu";

/*
 * Cerita orisinal IGIL "Lintasan Pak Samsul" (Kelas 3 Bab 4 Sub-Bab C, garis tegak lurus, garis sejajar, dan bangun datar sederhana), akhir cerita Festival Layang-layang Kampung.
 * Naskah suara dari naskah/story-naskah-k3b4c.md. Bagian ini: hari lomba dan Pak Samsul, tiang bendera tegak lurus dengan tanah, dan lambang tegak lurus.
 */

/* ------------------------------ 1. Lintasan ------------------------------ */
const SUARA_L1 = "Hari lomba tiba, dan lapangan penuh layang-layang warna-warni.";
const SUARA_L2 = "Pak Samsul, panitia berompi oranye, menggulung tali lintasan dan meniup peluit.";
const SUARA_L3 = "Ia ingin lintasan lomba dipasang rapi, dan Raka, Salsa, serta Bima ikut membantu.";

export const ADEGAN_LINTASAN: AdeganStory = {
  id: "lintasan",
  judul: "Hari lomba dan Pak Samsul",
  sumber: "Materi: hari lomba layang-layang",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Hari Lomba"), ...rumput("tn", 150)),
      tambah("lapangan", kotak("sp", 40, 28, 220, 16, W.emas, "#92400E", { rx: 3 }), teks("spt", 150, 39.6, "FESTIVAL LAYANG-LAYANG", 9.4, W.merah)),
      tambah("layang-layang", emo("l1", 40, 84, E.layang, 22), emo("l2", 104, 100, E.layang, 22), emo("l3", 168, 74, E.layang, 22)),
      tambah("warna-warni.", emo("l4", 226, 98, E.layang, 22), emo("l5", 272, 82, E.layang, 22), ...padi("pd", 146)),
    ),
    k(
      SUARA_L2,
      tambah("Samsul,", ...tokoh("ps", 190, 184, "Pak Samsul")),
      tambah("panitia", ...tenda("td", 196, 96, 70)),
      tambah("menggulung", emo("gl", 232, 166, E.benang, 20)),
      tambah("peluit.", teks("pr", 222, 142, "priit!", 10, W.merah)),
    ),
    k(
      SUARA_L3,
      tambah("lintasan", ...tali("tl1", 20, 140, 168, 140, W.tali1)),
      tambah("rapi,", ...tali("tl2", 20, 124, 168, 124, W.tali2), emo("ok", 100, 108, E.benar, 20)),
      tambah("Raka,", ...tokoh("rk", 30, 184, "Raka")),
      tambah("Salsa,", ...tokoh("sl", 74, 184, "Salsa")),
      tambah("Bima", ...tokoh("bm", 118, 184, "Bima")),
      tambah("ikut", ...tokoh("pj", 262, 184, "Pak Joko")),
    ),
  ],
};

/* ------------------------------ 2. Tiang bendera dan tanah ------------------------------ */
const SUARA_T1 = "Tiang bendera berdiri tegak di atas tanah, dan keduanya bertemu pada sudut siku-siku.";
const SUARA_T2 = "Dua garis yang bertemu pada sudut siku-siku disebut garis tegak lurus.";
const SUARA_T3 = "Salsa memeriksanya dengan pojok kertas lipat, dan pojok itu pas.";

export const ADEGAN_TEGAK_LURUS: AdeganStory = {
  id: "tegak-lurus",
  judul: "Tiang bendera dan tanah",
  sumber: "Materi: garis tegak lurus",
  latar: "#F7FEE7",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Tiang dan Tanah"), ...rumput("tn", 150), ...tiang("tg", 120, 140, 80)),
      tambah("tanah,", garisAbs("th", 50, 140, 250, 140, WL.tanah, 5, { z: 0 }), teks("tt", 230, 158, "tanah", 9, W.coklat)),
      tambah("siku-siku.", tandaSiku("ts", 122, 140, 12), teks("tk", 160, 128, "siku-siku", 9, W.merah)),
    ),
    k(
      SUARA_T2,
      tambah("Dua", teks("d2", 66, 84, "2 garis", 10, W.biru)),
      sorotkan("bertemu", "tg", "th"),
      tambah("disebut", teks("gt", 212, 70, "garis tegak lurus", 10, W.merah)),
    ),
    k(
      SUARA_T3,
      tambah("Salsa", ...tokoh("sl", 40, 184, "Salsa")),
      tambah("pojok", pojok("pj", 120, 140, 34)),
      tambah("pas.", emo("ok", 212, 124, E.benar, 24), teks("ps", 212, 104, "pojok pas", 10, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ 3. Lambang tegak lurus ------------------------------ */
const SUARA_M1 = "Salsa menamai titik-titiknya A, B, dan C, lalu menulis A B tegak lurus B C.";
const SUARA_M2 = "Lambangnya miring ke atas, seperti huruf T terbalik.";
const SUARA_M3 = "Dibaca, garis A B tegak lurus garis B C.";

export const ADEGAN_LAMBANG_TEGAK: AdeganStory = {
  id: "lambang-tegak",
  judul: "Lambang garis tegak lurus",
  sumber: "Materi: lambang tegak lurus",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Menamai Titik"), ...rumput("tn", 150), garisAbs("tg", 80, 140, 80, 62, W.tali2, 4, { z: 1 }), garisAbs("th", 80, 140, 200, 140, W.tali1, 4, { z: 1 }), tandaSiku("ts", 82, 140, 10)),
      tambah("Salsa", ...tokoh("sl", 250, 184, "Salsa")),
      tambah(3, bulat("pa", 80, 62, 4, W.merah, "#7F1D1D"), teks("ta", 68, 60, "A", 11, W.merah)),
      tambah(4, bulat("pb", 80, 140, 4, W.merah, "#7F1D1D"), teks("tb", 66, 152, "B", 11, W.merah)),
      tambah(6, bulat("pc", 200, 140, 4, W.merah, "#7F1D1D"), teks("tc", 208, 156, "C", 11, W.merah)),
      tambah("menulis", kotak("ks", 156, 48, 128, 38, W.putih, "#94A3B8", { rx: 4, z: 1 }), teks("kt", 220, 74, "AB ⊥ BC", 14, W.biru, { z: 2 })),
    ),
    k(
      SUARA_M2,
      tambah("Lambangnya", teks("lm", 236, 128, "⊥", 30, W.merah)),
      sorotkan("miring", "kt"),
      tambah("huruf", teks("tl", 236, 144, "seperti T terbalik", 8.4, W.coklat)),
    ),
    k(
      SUARA_M3,
      tambah("Dibaca,", teks("db", 70, 100, "dibaca:", 9, W.coklat, { anchor: "start" })),
      tambah("tegak", teks("rd", 112, 100, "garis AB tegak lurus garis BC", 9.4, W.hijauTua, { anchor: "start" })),
      tambah("C.", emo("ok", 284, 98, E.benar, 20)),
    ),
  ],
};
