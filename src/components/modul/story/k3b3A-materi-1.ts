import type { AdeganStory } from "./logika-story";
import { E, W, WK, busur, emo, gerbang, gulungan, judul, kandang, kartu, kotak, meteran, panah, penggaris, rumput, teks, tokoh } from "./k3b3A-gambar";
import { hapus, k, sorotkan, tambah } from "./k3b3A-bantu";

/*
 * Cerita orisinal IGIL "Ukuran Kandang Kak Tari" (Kelas 3 Bab 3 Sub-Bab A, mengukur panjang dengan satuan baku), awal cerita Kebun Binatang Mini.
 * Naskah suara dari naskah/story-naskah-k3b3a.md. Bagian ini: gerbang kebun binatang, jengkal yang berbeda, dan satuan baku.
 */

/* ------------------------------ 1. Gerbang ------------------------------ */
const SUARA_G1 = "Hari Minggu itu Pak Joko mengajak Raka, Salsa, dan Bima ke Kebun Binatang Mini di ujung kampung.";
const SUARA_G2 = "Kak Tari, pemandu berseragam cokelat, menyambut mereka di gerbang kayu.";
const SUARA_G3 = "Hari ini ia perlu ukuran beberapa benda untuk membuat papan nama kandang.";

export const ADEGAN_GERBANG: AdeganStory = {
  id: "gerbang",
  judul: "Gerbang Kebun Binatang Mini",
  sumber: "Materi: gerbang kebun binatang",
  latar: "#ECFCCB",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Kebun Binatang Mini"), ...rumput("rt", 150)),
      tambah("Pak", ...tokoh("pj", 138, 184, "Pak Joko")),
      tambah("Raka,", ...tokoh("rk", 30, 184, "Raka")),
      tambah("Salsa,", ...tokoh("sl", 66, 184, "Salsa")),
      tambah("Bima", ...tokoh("bm", 102, 184, "Bima")),
      tambah("Binatang", ...gerbang("gb", 150, 150, 110, 66)),
      tambah("ujung", kotak("jl", 132, 150, 36, 50, WK.jalan, undefined, { rx: 0, tebal: 0, z: -2 }), ...kandang("kl", 236, 118, 40, 30), emo("kc", 256, 144, E.kelinci, 16)),
    ),
    k(
      SUARA_G2,
      tambah("Kak", ...tokoh("kt", 262, 184, "Kak Tari")),
      tambah("berseragam", emo("lb", 232, 168, E.penggaris, 18)),
      tambah("cokelat,", ...gulungan("gl", 238, 152)),
      tambah("menyambut", emo("sm", 284, 146, E.lambai, 16)),
      sorotkan("gerbang", "gb-b"),
    ),
    k(
      SUARA_G3,
      tambah("ukuran", ...kartu("pk", 170, 30, 100, 30, "#FDE68A", ["papan nama"], 9)),
      tambah("benda", teks("tq", 150, 66, "?", 22, W.merah)),
      sorotkan("papan", "pk-k"),
      tambah("kandang", panah("pa", 250, 62, 0, 52, W.merah, 2.4)),
    ),
  ],
};

/* ------------------------------ 2. Jengkal ------------------------------ */
const SUARA_J1 = "Raka mengukur papan kayu dengan jengkal tangannya, dan hasilnya tujuh jengkal.";
const SUARA_J2 = "Salsa mengukur papan yang sama dan mendapat enam jengkal.";
const SUARA_J3 = "Jengkal setiap orang berbeda, jadi hasilnya berbeda-beda.";
const XP = 36;
const PJ = 224;

export const ADEGAN_JENGKAL: AdeganStory = {
  id: "jengkal",
  judul: "Jengkal yang berbeda",
  sumber: "Materi: jengkal yang berbeda",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, judul("Mengukur dengan Jengkal"), ...rumput("rt", 150), kotak("bd", XP, 100, PJ, 14, WK.kayuMuda, WK.kayuTua, { rx: 2, z: 1 }), kotak("bk1", 40, 114, 12, 36, WK.kayu, WK.kayuTua, { rx: 0, tebal: 1, z: 0 }), kotak("bk2", 244, 114, 12, 36, WK.kayu, WK.kayuTua, { rx: 0, tebal: 1, z: 0 })),
      tambah("Raka", ...tokoh("rk", 30, 184, "Raka")),
      tambah("papan", emo("th", 44, 92, E.tangan, 16)),
      tambah("jengkal", ...Array.from({ length: 7 }, (_, i) => busur(`j${i}`, XP + (i * PJ) / 7, XP + ((i + 1) * PJ) / 7, 98, 14, W.merah))),
      tambah("tujuh", teks("n7", 150, 64, "7 jengkal", 14, W.merah)),
    ),
    k(
      SUARA_J2,
      tambah("Salsa", ...tokoh("sl", 270, 184, "Salsa")),
      tambah("papan", ...Array.from({ length: 6 }, (_, i) => busur(`s${i}`, XP + (i * PJ) / 6, XP + ((i + 1) * PJ) / 6, 116, -12, W.hijau))),
      tambah("mendapat", teks("n6", 150, 146, "6 jengkal", 13, W.hijauTua)),
      sorotkan("enam", "bd"),
    ),
    k(
      SUARA_J3,
      tambah("Jengkal", teks("a7", 118, 178, "7", 20, W.merah)),
      tambah("berbeda,", teks("ne", 150, 178, "≠", 20, W.biru)),
      tambah("hasilnya", teks("a6", 182, 178, "6", 20, W.hijau)),
      tambah("berbeda-beda", emo("pu", 276, 112, E.pusing, 20)),
    ),
  ],
};

/* ------------------------------ 3. Satuan baku ------------------------------ */
const SUARA_S1 = "Karena itu kita butuh satuan baku yang sama untuk semua orang.";
const SUARA_S2 = "Satuan baku panjang adalah sentimeter dan meter, ditulis cm dan m.";
const SUARA_S3 = "Penggaris memakai sentimeter, sedangkan meteran memakai meter dan sentimeter.";

export const ADEGAN_SATUAN_BAKU: AdeganStory = {
  id: "satuan-baku",
  judul: "Satuan baku sentimeter dan meter",
  sumber: "Materi: satuan baku sentimeter dan meter",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Satuan Baku")),
      tambah("kita", ...penggaris("pg", 20, 70, 10, 12), ...meteran("mt", 160, 70, 2, 60)),
      tambah("satuan", teks("sb", 150, 118, "satuan baku", 14, W.ungu)),
      tambah("sama", teks("sy", 150, 138, "sama untuk semua", 9, W.hijauTua)),
      tambah("orang", emo("o1", 100, 172, E.raka, 22), emo("o2", 150, 172, E.salsa, 22), emo("o3", 200, 172, E.bima, 22)),
    ),
    k(
      SUARA_S2,
      hapus(0, "sb", "sy", "o1", "o2", "o3"),
      tambah("sentimeter", teks("l1", 80, 106, "sentimeter", 11, W.hijauTua)),
      tambah(6, teks("l2", 220, 106, "meter", 11, W.hijauTua)),
      tambah("cm", teks("c1", 80, 126, "cm", 16, W.merah)),
      tambah(10, teks("c2", 220, 126, "m", 16, W.merah)),
    ),
    k(
      SUARA_S3,
      hapus(0, "l1", "l2", "c1", "c2"),
      tambah(0, teks("n1", 80, 106, "penggaris", 11, W.biru)),
      tambah(2, teks("u1", 80, 126, "cm", 16, W.merah)),
      tambah(4, teks("n2", 220, 106, "meteran", 11, W.biru)),
      tambah(6, teks("u2", 208, 126, "m", 16, W.merah)),
      tambah(8, teks("u3", 242, 126, "dan cm", 11, W.merah), ...tokoh("kt", 150, 184, "Kak Tari")),
    ),
  ],
};
