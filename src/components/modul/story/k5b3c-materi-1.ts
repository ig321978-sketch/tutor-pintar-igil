import type { AdeganStory } from "./logika-story";
import { E, W, bar, emo, idBar, isikan, judul, lantai, pec, silang, tanda, teks, tokoh } from "./k5b3c-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k5b3c-bantu";

/*
 * Cerita orisinal IGIL "Sisa Adonan Bu Nani" (Kelas 5 Bab 3 Sub-Bab C, pengurangan pecahan), akhir cerita Toko Roti Keliling.
 * Naskah suara dari naskah/story-naskah-k5b3c.md. Bagian ini: loyang yang dibagi delapan, penyebut sama (kurangi pembilang), dan model arsir.
 */

/* ------------------------------ 1. Loyang ------------------------------ */
const SUARA_L1 = "Bu Nani datang dengan selendang biru dan loyang kue yang dibagi delapan bagian sama besar.";
const SUARA_L2 = "Lima bagian masih tersisa, dan dua bagian akan diambil untuk pesanan pelanggan.";
const SUARA_L3 = "Fajar bertanya, tinggal berapa bagian setelah pesanan diambil?";

export const ADEGAN_LOYANG: AdeganStory = {
  id: "loyang",
  judul: "Loyang Bu Nani",
  sumber: "Materi: loyang dan pesanan",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Loyang Bu Nani"), ...lantai("lt", 150)),
      tambah("Nani", ...tokoh("bn", 40, 184, "Bu Nani")),
      tambah("loyang", ...bar("lo", 62, 78, 8, 28, 24, 0)),
      tambah("delapan", teks("n8", 174, 62, "8 bagian sama besar", 10.5, W.merah, { z: 3 })),
    ),
    k(
      SUARA_L2,
      ubah("Lima", ...isikan("lo", 0, 5)),
      tambah("tersisa", teks("n5", 108, 120, "5 terisi", 10.5, W.biru, { z: 3 })),
      tambah("dua", teks("n2", 232, 120, "2 diambil", 10.5, W.merah, { z: 3 })),
      tambah("diambil", ...silang("lo", 3, 62, 78, 28, 24), ...silang("lo", 4, 62, 78, 28, 24)),
    ),
    k(
      SUARA_L3,
      tambah("Fajar", ...tokoh("fj", 250, 184, "Fajar")),
      sorotkan("tinggal", ...idBar("lo", 3)),
      tambah("berapa", teks("tq", 150, 142, "tinggal ? bagian", 11, W.pinkTua, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 2. Penyebut sama ------------------------------ */
const SUARA_S1 = "Penyebutnya sama, yaitu delapan, jadi kita cukup mengurangkan pembilangnya.";
const SUARA_S2 = "Lima per delapan dikurangi dua per delapan sama dengan tiga per delapan.";
const SUARA_S3 = "Penyebutnya tetap delapan, karena ukuran tiap potongan tidak berubah.";

export const ADEGAN_SAMA: AdeganStory = {
  id: "sama",
  judul: "Penyebut sama",
  sumber: "Materi: kurangi pembilang",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Penyebut sama"), ...lantai("lt", 150), ...pec("a", 64, 76, 5, 8, 22), tanda("m1", 100, 78, "−", 24), ...pec("b", 136, 76, 2, 8, 22)),
      sorotkan("sama", "aq", "bq"),
      tambah("delapan", teks("sm", 100, 122, "penyebut sama: 8", 11, W.merah, { z: 3 })),
      tambah("kita", ...tokoh("bm", 250, 184, "Bima")),
      sorotkan("pembilangnya", "ap", "bp"),
    ),
    k(
      SUARA_S2,
      bersih(0),
      tambah(0, judul("Kurangi pembilang"), ...lantai("lt", 150)),
      tambah("Lima", ...pec("a", 42, 80, 5, 8, 22)),
      tambah("dikurangi", tanda("m1", 80, 82, "−", 24)),
      tambah("dua", ...pec("b", 118, 80, 2, 8, 22)),
      tambah("sama", tanda("m2", 156, 82, "=", 24)),
      tambah("tiga", ...pec("c", 196, 80, 3, 8, 22, W.hijauTua)),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Potongan sama besar"), ...lantai("lt", 150), ...bar("pa", 30, 54, 8, 30, 22, 5)),
      tambah("tetap", ...bar("pb", 30, 96, 8, 30, 22, 3), teks("e8", 284, 70, "8", 14, W.merah, { z: 3 }), teks("e8b", 284, 112, "8", 14, W.merah, { z: 3 })),
      tambah("ukuran", teks("uk", 150, 142, "ukuran potongan sama", 11, W.pinkTua, { z: 3 })),
      tambah("berubah", emo("ok", 150, 170, E.benar, 22, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 3. Model arsir ------------------------------ */
const SUARA_A1 = "Bu Nani mengarsir lima bagian pada gambar loyang, lalu mencoret dua bagian yang diambil.";
const SUARA_A2 = "Bagian yang tidak tercoret tinggal tiga dari delapan.";
const SUARA_A3 = "Gambar itu cocok dengan hasil hitungan.";

export const ADEGAN_ARSIR: AdeganStory = {
  id: "arsir",
  judul: "Model arsir",
  sumber: "Materi: model arsir",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Model arsir"), ...lantai("lt", 150), ...tokoh("bn", 40, 184, "Bu Nani")),
      tambah("mengarsir", ...bar("ar", 62, 66, 8, 28, 24, 0)),
      ubah("lima", ...isikan("ar", 0, 5)),
      tambah("lima", teks("n5", 108, 108, "5 diarsir", 10.5, W.biru, { z: 3 })),
      tambah("mencoret", ...silang("ar", 3, 62, 66, 28, 24), ...silang("ar", 4, 62, 66, 28, 24)),
      tambah("dua", teks("n2", 232, 108, "2 dicoret", 10.5, W.merah, { z: 3 })),
    ),
    k(
      SUARA_A2,
      sorotkan("tercoret", ...idBar("ar", 3)),
      tambah("tiga", teks("n3", 150, 132, "3 dari 8", 12, W.hijauTua, { z: 3 })),
      tambah("delapan", ...pec("h", 262, 128, 3, 8, 16, W.hijauTua)),
    ),
    k(
      SUARA_A3,
      tambah("Gambar", ...pec("e1", 60, 154, 5, 8, 14), tanda("e2", 86, 156, "−", 16), ...pec("e3", 110, 154, 2, 8, 14), tanda("e4", 136, 156, "=", 16), ...pec("e5", 162, 154, 3, 8, 14, W.hijauTua)),
      tambah("cocok", emo("ok", 215, 160, E.benar, 24, { z: 3 })),
      tambah("hitungan", teks("hh", 250, 156, "cocok", 10.5, W.hijauTua, { z: 3 })),
    ),
  ],
};
