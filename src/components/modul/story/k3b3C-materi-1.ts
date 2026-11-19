import type { AdeganStory } from "./logika-story";
import { E, W, emo, judul, kartu, karung, lantai, panah, rak, teks, timbBadan, timbDigital, timbDuduk, tokoh, kotak } from "./k3b3C-gambar";
import { hapus, k, sorotkan, tambah, ubah } from "./k3b3C-bantu";

/*
 * Cerita orisinal IGIL "Pakan Bu Lastri" (Kelas 3 Bab 3 Sub-Bab C, mengukur berat dengan satuan baku), cerita Kebun Binatang Mini.
 * Naskah suara dari naskah/story-naskah-k3b3c.md. Bagian ini: gudang pakan, timbangan, gram dan kilogram, dan timbangan digital.
 */

/* ------------------------------ 1. Gudang pakan ------------------------------ */
const SUARA_G1 = "Siang itu Raka, Salsa, dan Bima ikut Bu Lastri, juru pakan berapron hijau, ke gudang pakan.";
const SUARA_G2 = "Bu Lastri harus mencatat berat pakan untuk setiap hewan.";
const SUARA_G3 = "Untuk itu ia memakai timbangan.";

export const ADEGAN_GUDANG_PAKAN: AdeganStory = {
  id: "gudang-pakan",
  judul: "Gudang pakan",
  sumber: "Materi: gudang pakan",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Gudang Pakan"), ...lantai("lt", 150)),
      tambah("Raka,", ...tokoh("rk", 30, 184, "Raka")),
      tambah("Salsa,", ...tokoh("sl", 72, 184, "Salsa")),
      tambah("Bima", ...tokoh("bm", 114, 184, "Bima"), ...tokoh("pj", 160, 184, "Pak Joko")),
      tambah("Lastri,", ...tokoh("bl", 214, 184, "Bu Lastri")),
      sorotkan("hijau,", "bl-bj"),
      tambah("gudang", ...karung("k1", 14, 100), ...karung("k2", 44, 108), emo("kj", 86, 140, E.keranjang, 22), emo("wt", 86, 128, E.wortel, 14)),
    ),
    k(
      SUARA_G2,
      tambah("mencatat", emo("ct", 238, 152, E.catat, 16)),
      tambah("berat", teks("bt", 150, 46, "berat pakan", 10, W.ungu)),
      tambah("hewan.", emo("hk", 262, 152, E.kelinci, 20), emo("hb", 284, 152, E.kambing, 20)),
    ),
    k(
      SUARA_G3,
      hapus(0, "bt"),
      tambah("memakai", ...rak("rk2", 112, 118, 86, 32)),
      tambah("timbangan.", ...timbDuduk("td", 138, 90, 20, 0), ...timbDigital("dg", 168, 86, "0", 44)),
    ),
  ],
};

/* ------------------------------ 2. Timbangan ------------------------------ */
const SUARA_T1 = "Timbangan adalah alat untuk mengukur berat benda.";
const SUARA_T2 = "Ada timbangan digital berlayar, timbangan duduk berjarum, dan timbangan badan.";
const SUARA_T3 = "Satuan baku berat adalah gram dan kilogram, ditulis g dan kg.";

export const ADEGAN_TIMBANGAN: AdeganStory = {
  id: "timbangan",
  judul: "Tiga jenis timbangan",
  sumber: "Materi: tiga jenis timbangan",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Timbangan"), ...lantai("lt", 150)),
      tambah("Timbangan", ...kartu("tk", 100, 40, 100, 30, W.krem, ["alat ukur berat"], 10)),
      tambah("mengukur", ...karung("kr", 134, 104, 32, 38)),
      tambah("berat", panah("pa", 150, 72, 0, 28, W.merah, 2.4)),
      sorotkan("benda.", "kr"),
    ),
    k(
      SUARA_T2,
      hapus(0, "kr", "kr-t", "pa", "tk-k", "tk-t0"),
      tambah("digital", ...timbDigital("dg", 16, 96, "0", 56), teks("ld", 44, 150, "digital", 9, W.ungu)),
      tambah("duduk", ...timbDuduk("td", 150, 100, 22, 0), teks("lu", 150, 150, "duduk", 9, W.ungu)),
      tambah("badan.", ...timbBadan("bd", 220, 116, 64), teks("lb", 252, 150, "badan", 9, W.ungu)),
    ),
    k(
      SUARA_T3,
      tambah("gram", ...kartu("g1", 40, 160, 100, 28, "#FEF08A", ["g = gram"], 10)),
      tambah("kilogram,", ...kartu("g2", 160, 160, 100, 28, "#BFDBFE", ["kg = kilogram"], 10)),
      sorotkan("ditulis", "g1-k", "g2-k"),
    ),
  ],
};

/* ------------------------------ 3. Gram dan kilogram ------------------------------ */
const SUARA_M1 = "Gram dipakai untuk benda ringan, seperti segenggam biji dan sebutir telur puyuh.";
const SUARA_M2 = "Kilogram dipakai untuk benda berat, seperti karung pakan dan seekor anak kambing.";
const SUARA_M3 = "Memilih satuan yang tepat membuat bilangannya mudah dibaca.";

export const ADEGAN_GRAM_KG: AdeganStory = {
  id: "gram-kg",
  judul: "Gram untuk ringan, kilogram untuk berat",
  sumber: "Materi: gram dan kilogram",
  latar: "#ECFCCB",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Gram dan Kilogram"), ...lantai("lt", 150), kotak("bk1", 10, 34, 134, 110, "#FEF9C3", W.biru, { rx: 8, z: -1 }), teks("tg", 77, 56, "gram (g)", 13, W.coklat)),
      tambah("ringan,", teks("rg", 77, 76, "ringan", 9, W.biru)),
      tambah("biji", emo("bj", 50, 122, E.biji, 24)),
      tambah("telur", emo("tl", 104, 122, E.telur, 24)),
    ),
    k(
      SUARA_M2,
      tambah("Kilogram", kotak("bk2", 156, 34, 134, 110, "#DBEAFE", W.biru, { rx: 8, z: -1 }), teks("tk", 223, 56, "kilogram (kg)", 13, W.biru)),
      tambah("berat,", teks("br", 223, 76, "berat", 9, W.biru)),
      tambah("karung", ...karung("kk", 176, 98, 30, 36)),
      tambah("kambing.", emo("kb", 258, 128, E.kambing, 26)),
    ),
    k(
      SUARA_M3,
      tambah("Memilih", emo("pk", 150, 90, E.cermat, 20)),
      tambah("tepat", emo("ok", 150, 126, E.benar, 20)),
      tambah("mudah", teks("md", 150, 172, "mudah dibaca", 10, W.hijauTua)),
      ubah("dibaca.", { id: "kb", rot: -12 }),
    ),
  ],
};

/* ------------------------------ 4. Timbangan digital ------------------------------ */
const SUARA_D1 = "Bima meletakkan wortel di atas timbangan digital.";
const SUARA_D2 = "Layar menunjukkan dua ratus lima puluh, jadi berat wortel dua ratus lima puluh gram.";
const SUARA_D3 = "Salsa mencatatnya di kertas catatan, lengkap dengan satuannya.";

export const ADEGAN_DIGITAL: AdeganStory = {
  id: "digital",
  judul: "Wortel di timbangan digital",
  sumber: "Materi: timbangan digital",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Timbangan Digital"), ...lantai("lt", 150), ...tokoh("bm", 40, 184, "Bima")),
      tambah("meletakkan", ...timbDigital("dg", 120, 96, "0", 72)),
      tambah("wortel", emo("wt", 156, 92, E.wortel, 24)),
      sorotkan("digital.", "dg-s"),
    ),
    k(
      SUARA_D2,
      ubah("Layar", { id: "dg-t", isi: "250" }),
      tambah("berat", teks("br", 150, 60, "berat wortel", 10, W.ungu)),
      ubah("gram.", { id: "dg-t", isi: "250 g" }),
    ),
    k(
      SUARA_D3,
      tambah("Salsa", ...tokoh("sl", 250, 184, "Salsa")),
      tambah("kertas", ...kartu("kc", 196, 40, 92, 40, W.putih, ["wortel", "250 g"], 10)),
      sorotkan("satuannya.", "kc-t1"),
    ),
  ],
};
