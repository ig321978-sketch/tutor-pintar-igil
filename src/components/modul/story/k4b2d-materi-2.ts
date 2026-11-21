import type { AdeganStory } from "./logika-story";
import { E, W, bulat, emo, garis, gulungan, ids, judul, kisi, kotak, panah, pecah, poligon, rumput, strip, teks, tokoh } from "./k4b2d-gambar";
import { bersih, k, sorotkan, tambah, warnai } from "./k4b2d-bantu";

/*
 * Cerita orisinal IGIL "Meteran Kain Pak Bagas" (Kelas 4 Bab 2 Sub-Bab D, pecahan per sepuluh dan per seratus menjadi desimal), Sanggar Batik Kampung Mekar.
 * Naskah suara dari naskah/story-naskah-k4b2d.md. Bagian ini: salah langkah Satria (nol tambahan), perbaikan Genta, dan taruhan menggulung kain.
 */
const JINGGA = "#FDBA74";

/* ------------------------------ 4. Salah langkah Satria ------------------------------ */
const SUARA_N1 = "Satria menulis cepat, tiga per sepuluh adalah nol koma nol tiga, katanya.";
const SUARA_N2 = "Ia menulis angka nol tambahan karena melihat angka tiga di dekat sepuluh.";
const SUARA_N3 = "Kalau aku salah, aku menggulung semua kain di halaman ini, katanya sambil menepuk dada.";

export const ADEGAN_SALAH_NOL: AdeganStory = {
  id: "salah-nol",
  judul: "Satria menulis nol tambahan",
  sumber: "Materi: tulisan yang salah",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Satria Menulis"), ...tokoh("st", 40, 184, "Satria")),
      tambah("menulis", kotak("pb-k", 80, 34, 200, 82, W.putih, W.coklat, { tebal: 2.4 })),
      tambah("tiga", ...pecah("pc", 130, 70, "3", "10", 22)),
      tambah("adalah", teks("sm", 170, 84, "=", 22, W.merah)),
      tambah("nol", teks("dc", 225, 84, "0,03", 24, W.merah)),
    ),
    k(
      SUARA_N2,
      tambah("tambahan", bulat("lg", 231, 78, 10, undefined, W.merah, { tebal: 2, z: 4 })),
      sorotkan("tiga", "pc-a"),
      sorotkan("sepuluh.", "pc-b"),
      tambah("tambahan", teks("nt", 231, 130, "nol tambahan", 10, W.merah), panah("pa", 231, 122, 0, -34, W.merah, 1.6)),
    ),
    k(
      SUARA_N3,
      tambah("Kalau", emo("ds", 78, 160, E.tangan, 20)),
      tambah("menggulung", ...gulungan("t1", 130, 152, 60, 16), ...gulungan("t2", 138, 134, 56, 16, "#FCE7F3")),
      tambah("katanya", teks("tr", 240, 158, "taruhan!", 12, W.merah)),
    ),
  ],
};

/* ------------------------------ 5. Perbaikan Genta ------------------------------ */
const SUARA_P1 = "Genta menunjukkan bahwa nol koma nol tiga artinya tiga dari seratus bagian.";
const SUARA_P2 = "Tiga dari sepuluh bagian harus ditulis nol koma tiga, dengan satu angka di belakang koma.";
const SUARA_P3 = "Satu angka di belakang koma berarti persepuluhan, dan dua angka berarti perseratusan.";
const KS = ids("ks", 0, 99);
const KP = ids("kp", 0, 9);

export const ADEGAN_PERBAIKI: AdeganStory = {
  id: "perbaiki",
  judul: "Genta memperbaiki tulisan",
  sumber: "Materi: nol koma nol tiga artinya",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Nol Koma Nol Tiga"), ...tokoh("gn", 268, 184, "Genta")),
      tambah("menunjukkan", ...kisi("ks", 24, 34, 14, 10)),
      tambah("nol", teks("dc", 215, 62, "0,03", 26, W.merah)),
      warnai("tiga@2", JINGGA, ...KS.slice(0, 3)),
      tambah("tiga@2", teks("l3", 215, 92, "3 bagian", 11, W.merah)),
      tambah("seratus", teks("l100", 215, 116, "100 bagian", 11, W.ungu)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Nol Koma Tiga"), ...tokoh("gn", 268, 184, "Genta"), ...strip("kp", 20, 36, 260, 26)),
      warnai("Tiga", JINGGA, ...KP.slice(0, 3)),
      tambah("Tiga", teks("l3", 60, 80, "3 bagian", 11, W.merah)),
      tambah("sepuluh", teks("l10", 240, 80, "10 bagian", 11, W.ungu)),
      tambah("nol", teks("dc", 110, 124, "0,3", 34, W.hijauTua), teks("dw", 200, 124, "0,03", 26, W.merah, { op: 0.7 }), garis("sc", 172, 124, 56, -20, W.merah, 2)),
      tambah("satu", teks("a1", 110, 148, "1 angka", 11, W.hijauTua)),
    ),
    k(
      SUARA_P3,
      tambah("Satu", teks("p1", 120, 172, "1 angka: persepuluhan", 10, W.ungu)),
      sorotkan("berarti", "a1"),
      tambah("dua", teks("p2", 120, 188, "2 angka: perseratusan", 10, W.ungu)),
    ),
  ],
};

/* ------------------------------ 6. Taruhan menggulung kain ------------------------------ */
const SUARA_G1 = "Satria menepati taruhannya dan menggulung kain satu per satu.";
const SUARA_G2 = "Gulungannya terlalu longgar sehingga kain malah berlipat-lipat dan menutupi kepalanya.";
const SUARA_G3 = "Semua orang tertawa, dan Pak Bagas menarik kain itu dengan hati-hati.";

export const ADEGAN_MENGGULUNG: AdeganStory = {
  id: "menggulung",
  judul: "Satria menggulung kain",
  sumber: "Materi: taruhan Satria",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Menepati Taruhan"), ...rumput("rp", 150), ...tokoh("st", 60, 184, "Satria")),
      tambah("menggulung", ...gulungan("g1", 96, 150, 60, 16), ...gulungan("g2", 100, 132, 56, 16, "#FCE7F3")),
      tambah("satu", ...gulungan("g3", 98, 114, 52, 16, "#FDE68A"), kotak("kb", 190, 120, 90, 46, "#C7D2FE", W.biru, { z: 1 })),
    ),
    k(
      SUARA_G2,
      tambah("kain", poligon("kn", [[40, 142], [82, 142], [86, 172], [34, 172]], "#C7D2FE", W.biru, { z: 5 })),
      tambah("berlipat-lipat", garis("f1", 52, 146, 0, 24, W.biru, 1.2, { z: 6 }), garis("f2", 62, 146, 0, 24, W.biru, 1.2, { z: 6 }), garis("f3", 72, 146, 2, 24, W.biru, 1.2, { z: 6 })),
      tambah("menutupi", emo("qq", 62, 134, E.tanya, 16), emo("tg", 96, 166, E.tangan, 18)),
    ),
    k(
      SUARA_G3,
      tambah("tertawa,", ...tokoh("lr", 150, 184, "Laras"), emo("tw", 150, 140, E.tawa, 20)),
      tambah("Bagas", ...tokoh("pb", 232, 184, "Pak Bagas")),
      tambah("menarik", panah("pn", 214, 154, -118, -10, W.merah, 2)),
      tambah("hati-hati.", teks("ht", 150, 112, "pelan-pelan", 10, W.hijauTua)),
    ),
  ],
};
