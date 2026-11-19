import type { AdeganStory } from "./logika-story";
import { E, W, emo, gudang, judul, kotak, lantai, panah, papan4, pindahTokoh, tandaiSel, teks, tokoh, tumpukan } from "./k4b1b-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k4b1b-bantu";

/*
 * Cerita orisinal IGIL "Gudang Handuk Pak Laode" (Kelas 4 Bab 1 Sub-Bab B), lanjutan Penginapan Pulau Karang Indah.
 * Naskah suara dari naskah/story-naskah-k4b1b.md. Bagian ini: tukar tempat angka, melipat handuk dan nol penjaga tempat, dan penutup yang menjembatani ke Sub-Bab C.
 */

/* ------------------------------ 7. Tukar ------------------------------ */
const SUARA_X1 = "Pak Laode menukar tempat angka dua dan tiga menjadi tiga ribu dua ratus empat.";
const SUARA_X2 = "Angka tiga kini di ribuan dan berarti tiga ribu.";
const SUARA_X3 = "Bilangannya jauh lebih besar, padahal angkanya masih sama.";

export const ADEGAN_TUKAR: AdeganStory = {
  id: "tukar",
  judul: "Menukar tempat angka dua dan tiga",
  sumber: "Materi: tukar tempat angka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_X1,
      tambah(0, judul("Angka Bertukar"), ...tokoh("pl", 40, 184, "Pak Laode")),
      tambah("menukar", ...papan4("ta", 50, 34, 50, [2, 3, 0, 4]), teks("o1", 276, 66, "2.304", 10, W.biru)),
      tambah("dua", tandaiSel("tx0", 50, 34, 50, 0, 30, W.merah), tandaiSel("tx1", 50, 34, 50, 1, 30, W.merah)),
      tambah("menjadi", panah("pa", 75, 86, 0, 12, W.ungu, 2, { z: 6 }), panah("pb", 125, 98, 0, -12, W.ungu, 2, { z: 6 })),
      tambah("ribu", ...papan4("tb", 50, 100, 50, [3, 2, 0, 4]), teks("o2", 276, 132, "3.204", 10, W.merah)),
    ),
    k(
      SUARA_X2,
      tambah("tiga", tandaiSel("ty", 50, 100, 50, 0, 30, W.hijau)),
      tambah("ribuan", teks("e1", 150, 168, "3 di ribuan", 11, W.hijauTua)),
      tambah("berarti", teks("e2", 150, 184, "3 = 3.000", 11, W.merah)),
    ),
    k(
      SUARA_X3,
      hapus(0, "e1", "e2"),
      tambah("lebih", teks("cmp", 150, 170, "2.304 < 3.204", 13, W.merah)),
      tambah("besar", emo("kg", 262, 150, E.kaget, 22)),
      tambah("sama", emo("ok", 100, 190, E.benar, 14)),
    ),
  ],
};

/* ------------------------------ 8. Lipat ------------------------------ */
const SUARA_L1 = "Satria melipat handuk satu per satu sambil bersungut-sungut.";
const SUARA_L2 = "Genta membantunya dan menghitung, nol di tempat puluhan berarti tidak ada ikat.";
const SUARA_L3 = "Nol menjaga supaya angka lain tetap di tempat yang benar.";

export const ADEGAN_LIPAT: AdeganStory = {
  id: "lipat",
  judul: "Satria melipat handuk",
  sumber: "Materi: melipat dan angka nol",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_L1,
      tambah("Satria", judul("Melipat Handuk"), ...lantai("hl", 150), ...tokoh("sa", 40, 184, "Satria")),
      tambah("melipat", kotak("mj", 96, 112, 120, 8, "#C99A63", W.coklat, { rx: 2, z: 1 })),
      tambah("handuk", ...tumpukan("lp", 110, 112, 2, 40)),
      tambah("per", teks("sp", 150, 70, "1 per 1", 12, W.merah)),
      tambah("satu@2", ...tumpukan("lq", 160, 112, 3, 40)),
      tambah("bersungut", emo("cm", 90, 150, E.cemberut, 20)),
    ),
    k(
      SUARA_L2,
      bersih(0),
      tambah(0, judul("Nol Menandai Tempat"), ...tokoh("sa", 40, 184, "Satria")),
      tambah("Genta", ...tokoh("ge", 260, 184, "Genta")),
      tambah("menghitung", ...papan4("lg", 50, 34, 50, [2, 3, 0, 4])),
      tambah("puluhan", tandaiSel("lt", 50, 34, 50, 2, 30, W.merah)),
      tambah("ikat", teks("ik", 150, 118, "0 ikat", 14, W.merah)),
    ),
    k(
      SUARA_L3,
      tambah("menjaga", teks("a1", 100, 140, "2.304", 14, W.hijauTua), teks("b1", 100, 154, "ada nol", 8, W.hijauTua)),
      tambah("lain", teks("a2", 200, 140, "234", 14, W.merah), teks("b2", 200, 154, "tanpa nol", 8, W.merah)),
      tambah("tempat", emo("ok", 100, 168, E.benar, 16), emo("xs", 200, 168, E.salah, 16)),
      sorotkan("benar", "lg-c2"),
    ),
  ],
};

/* ------------------------------ 9. Penutup (jembatan ke Sub-Bab C) ------------------------------ */
const SUARA_P1 = "Setelah gudang rapi, Kak Tiara, pemandu wisata, datang membawa papan dermaga.";
const SUARA_P2 = "Ia ingin tahu pantai mana yang paling banyak dikunjungi minggu ini.";
const SUARA_P3 = "Menurutmu, bagaimana cara membandingkan banyak pengunjung dua pantai? Terima kasih, Satria, Laras, Genta, Pak Hendro, dan Pak Laode!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Kak Tiara datang membawa papan dermaga",
  sumber: "Materi: jembatan ke Sub-Bab C",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_P1,
      tambah("gudang", judul("Gudang Rapi"), ...lantai("hl", 150), ...gudang("gd", 16, 82, 100, 62)),
      tambah("rapi", ...tumpukan("tm", 130, 144, 4, 30)),
      tambah("Tiara", ...tokoh("kt", 262, 184, "Kak Tiara")),
      tambah("papan", kotak("pd0", 196, 100, 30, 22, "#BAE6FD", "#0369A1", { rx: 2, z: 2 })),
    ),
    k(
      SUARA_P2,
      hapus(0, "pd0"),
      tambah("pantai", kotak("pd", 160, 44, 130, 66, "#E0F2FE", "#0369A1", { rx: 4, tebal: 2, z: 1 }), teks("pt", 225, 56, "PAPAN DERMAGA", 7.4, "#0369A1", { z: 2 })),
      tambah("mana", emo("p1", 184, 90, E.pantai, 20), emo("p2", 224, 90, E.pulau, 20), emo("p3", 264, 90, E.perahu, 20)),
      tambah("banyak", teks("tq", 150, 142, "?", 26, W.tanya)),
    ),
    k(
      SUARA_P3,
      ubah("Menurutmu", ...pindahTokoh("kt", 276, 174, "Kak Tiara")),
      tambah("pengunjung", teks("d2", 80, 100, "2 pantai", 12, W.ungu)),
      tambah("Terima", ...tokoh("sa", 28, 184, "Satria"), ...tokoh("la", 72, 184, "Laras")),
      tambah("Genta", ...tokoh("ge", 116, 184, "Genta"), ...tokoh("ph", 170, 184, "Pak Hendro")),
      tambah("Laode", ...tokoh("pl", 224, 184, "Pak Laode")),
      tambah("kasih", emo("lb", 150, 112, E.lambai, 20)),
    ),
  ],
};

