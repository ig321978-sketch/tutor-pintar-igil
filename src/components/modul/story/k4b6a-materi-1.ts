import type { AdeganStory } from "./logika-story";
import { E, W, barisPapan, deret, emo, judul, kotak, lampuBohlam, panah, papanData, tanah, teks, tenda, tokoh } from "./k4b6a-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k4b6a-bantu";

/*
 * Cerita orisinal IGIL "Piktogram Jajanan Bu Rini" (Kelas 4 Bab 6 Sub-Bab A, piktogram skala satu dan lebih dari satu), awal cerita Bazar Kuliner Sekolah.
 * Naskah suara dari naskah/story-naskah-k4b6a.md. Bagian ini: tiba di bazar, piktogram, dan keterangan (satu ikon sama dengan lima porsi).
 */

/* ------------------------------ 1. Bazar ------------------------------ */
const SUARA_B1 = "Pak Hendro mengajak Satria, Laras, dan Genta ke bazar kuliner sekolah yang sedang ramai.";
const SUARA_B2 = "Bu Rini, penjual jajanan, sibuk melayani pembeli di tendanya yang berhias lampu.";
const SUARA_B3 = "Panitia meminta Bu Rini menyajikan hasil jualan pagi ini dalam gambar yang mudah dibaca.";

export const ADEGAN_BAZAR: AdeganStory = {
  id: "bazar",
  judul: "Tiba di bazar kuliner",
  sumber: "Materi: bazar kuliner",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Bazar Kuliner Sekolah"), ...tanah("tn", 150)),
      tambah("Hendro", ...tokoh("ph", 28, 184, "Pak Hendro")),
      tambah("Satria,", ...tokoh("sa", 72, 184, "Satria")),
      tambah("Laras,", ...tokoh("lr", 108, 184, "Laras")),
      tambah("Genta", ...tokoh("ge", 144, 184, "Genta")),
      tambah("bazar", kotak("bz", 170, 32, 118, 22, W.krem, W.merah, { rx: 4, tebal: 2, z: 1 }), teks("bzt", 229, 47, "BAZAR KULINER", 9, W.merah, { z: 2 })),
      tambah("ramai.", emo("rm", 252, 92, E.bintang, 18)),
    ),
    k(
      SUARA_B2,
      hapus(0, "bz", "bzt", "rm"),
      tambah("Bu", ...tokoh("br", 230, 104, "Bu Rini")),
      tambah("penjual", emo("j1", 192, 108, E.risoles, 14, { z: 3 }), emo("j2", 206, 108, E.pisang, 14, { z: 3 })),
      tambah("tendanya", ...tenda("td", 172, 40, 116, 80)),
      tambah("lampu.", ...lampuBohlam("lp", 178, 282, 58, 7)),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Hasil Jualan Pagi Ini"), ...tanah("tn", 150), ...tokoh("br", 250, 184, "Bu Rini")),
      tambah("Panitia", emo("mg", 262, 78, E.megafon, 22), teks("pt", 262, 96, "panitia", 8.4, W.coklat)),
      tambah("menyajikan", ...papanData("pn", 20, 30, 190, 104)),
      tambah("jualan", teks("ct", 115, 64, "catatan jualan", 9, W.kapur, { z: 3 })),
      tambah("gambar", teks("tq", 115, 108, "?", 26, W.sorot, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 2. Piktogram ------------------------------ */
const SUARA_P1 = "Laras menjelaskan bahwa diagram yang memakai gambar untuk menyatakan banyak data disebut piktogram.";
const SUARA_P2 = "Setiap gambar kecil di dalamnya disebut ikon, dan satu ikon mewakili sejumlah data.";
const SUARA_P3 = "Keterangan di pojok piktogram memberi tahu berapa banyak yang diwakili satu ikon.";

export const ADEGAN_PIKTOGRAM: AdeganStory = {
  id: "piktogram",
  judul: "Apa itu piktogram",
  sumber: "Materi: piktogram",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Piktogram"), ...tanah("tn", 150)),
      tambah("Laras", ...tokoh("lr", 40, 184, "Laras")),
      tambah("diagram", ...papanData("pp", 80, 30, 210, 104)),
      tambah("gambar", ...barisPapan("r1", 60, "risoles", E.risoles, 3, 150, 22, 16), ...barisPapan("r2", 82, "pisang", E.pisang, 2, 150, 22, 16), ...barisPapan("r3", 104, "lemper", E.lemper, 4, 150, 22, 16)),
      tambah("disebut", teks("pk", 185, 48, "piktogram", 11, W.sorot, { z: 3 })),
    ),
    k(
      SUARA_P2,
      tambah("gambar", teks("ik", 122, 48, "ikon", 9, W.sorot, { z: 3 })),
      sorotkan("kecil", "r10"),
      tambah("disebut", panah("pa", 134, 52, 12, 6, W.sorot, 1.6, { z: 3 })),
      tambah("mewakili", teks("sj", 240, 124, "1 ikon = sejumlah data", 7.6, W.sorot, { z: 3 })),
    ),
    k(
      SUARA_P3,
      hapus(0, "ik", "pa", "sj", "pk"),
      tambah("Keterangan", kotak("kt", 190, 108, 92, 20, W.krem, W.coklat, { rx: 3, tebal: 1.4, z: 4 }), teks("kt1", 236, 117, "keterangan", 7.5, W.coklat, { z: 5 })),
      sorotkan("pojok", "kt"),
      tambah("berapa", teks("kt2", 236, 126, "1 ikon = ?", 8, W.merah, { z: 5 })),
    ),
  ],
};

/* ------------------------------ 3. Keterangan: satu ikon sama dengan lima porsi ------------------------------ */
const SUARA_K1 = "Genta menempelkan kertas bertuliskan, satu ikon sama dengan lima porsi.";
const SUARA_K2 = "Risoles terjual tiga puluh porsi, sehingga Bu Rini menggambar enam ikon risoles.";
const SUARA_K3 = "Dua puluh porsi pisang goreng menjadi empat ikon, karena dua puluh dibagi lima sama dengan empat.";

export const ADEGAN_KETERANGAN: AdeganStory = {
  id: "keterangan",
  judul: "Satu ikon sama dengan lima",
  sumber: "Materi: keterangan",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Keterangan Piktogram"), ...tanah("tn", 150)),
      tambah("Genta", ...tokoh("ge", 40, 184, "Genta")),
      tambah("menempelkan", kotak("kr", 100, 44, 130, 56, W.krem, W.coklat, { rx: 4, tebal: 2, z: 1 })),
      tambah("bertuliskan,", teks("kr1", 165, 66, "keterangan", 9, W.coklat, { z: 2 }), teks("kr2", 165, 86, "1 ikon = 5 porsi", 10, W.merah, { z: 2 })),
      sorotkan("lima", "kr"),
    ),
    k(
      SUARA_K2,
      bersih(0),
      tambah(0, judul("Risoles: Enam Ikon"), ...tanah("tn", 150), ...papanData("pp", 86, 28, 204, 116)),
      tambah("Risoles", teks("rs", 116, 56, "risoles", 8, W.kapur, { z: 3 })),
      tambah("tiga", teks("p30", 178, 80, "30 porsi", 9, W.sorot, { z: 3 })),
      tambah("Bu", ...tokoh("br", 40, 184, "Bu Rini")),
      tambah("menggambar", ...deret("ri", 150, 54, E.risoles, 6, 22, 16)),
      tambah("enam", teks("i6", 250, 80, "6 ikon", 9, W.sorot, { z: 3 })),
    ),
    k(
      SUARA_K3,
      tambah("Dua", ...barisPapan("pg", 106, "pisang", E.pisang, 4, 156, 22, 16, 118), teks("p20", 178, 124, "20 porsi", 9, W.sorot, { z: 3 })),
      tambah("goreng", teks("pgn", 118, 114, "goreng", 7, W.kapur, { z: 3 })),
      tambah("dibagi", teks("bg", 262, 106, "20 : 5 = 4", 9, W.sorot, { z: 3 })),
      tambah("empat@2", teks("i4", 262, 124, "4 ikon", 9, W.sorot, { z: 3 })),
    ),
  ],
};
