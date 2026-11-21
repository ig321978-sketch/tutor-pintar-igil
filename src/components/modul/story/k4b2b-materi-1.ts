import type { AdeganStory } from "./logika-story";
import { D, E, W, bak, emo, isiPetak, jemuran, judul, kain, kotak, pecahan, tanah, teks, tokoh } from "./k4b2b-gambar";
import { hapus, k, redamkan, sorotkan, tambah, ubah } from "./k4b2b-bantu";

/*
 * Cerita orisinal IGIL "Bak Warna Pak Joyo" (K4 Bab 2 Sub-Bab B, membandingkan dan mengurutkan pecahan berpenyebut sama), cerita Sanggar Batik Kampung Mekar.
 * Naskah suara dari naskah/story-naskah-k4b2b.md. Bagian ini: halaman belakang dan deretan bak, bak biru tiga per delapan, bak merah enam per delapan.
 */

/* ------------------------------ 1. Halaman belakang dan bak ------------------------------ */
const SUARA_B1 = "Pak Joyo, tukang pewarna sanggar, menyambut Satria, Laras, dan Genta di halaman belakang.";
const SUARA_B2 = "Di sana berderet bak-bak besar yang masing-masing berisi pewarna kain.";
const SUARA_B3 = "Pak Joyo meminta mereka menentukan bak mana yang isinya lebih banyak.";

export const ADEGAN_BAK: AdeganStory = {
  id: "bak",
  judul: "Halaman belakang sanggar",
  sumber: "Materi: halaman belakang dan bak",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Halaman Belakang"), ...tanah("tn", 120)),
      tambah("Pak", ...tokoh("pj", 270, 184, "Pak Joyo")),
      tambah("tukang", jemuran("jm", 186, 34, 108), ...kain("k1", 190, 34, 26, 28, D.biru), ...kain("k2", 222, 34, 26, 28, D.merah), ...kain("k3", 254, 34, 26, 28, D.kuning)),
      tambah("menyambut", ...tokoh("ph", 28, 184, "Pak Hendro")),
      tambah("Satria,", ...tokoh("st", 70, 184, "Satria")),
      tambah("Laras,", ...tokoh("lr", 108, 184, "Laras")),
      tambah("Genta", ...tokoh("gt", 144, 184, "Genta")),
    ),
    k(
      SUARA_B2,
      tambah("berderet", ...bak("b1", 20, 40, 140, 18, 5, 2, D.biru)),
      tambah("bak-bak", ...bak("b2", 20, 68, 140, 18, 4, 3, D.merah)),
      tambah("masing-masing", ...bak("b3", 20, 96, 140, 18, 6, 4, D.hijau)),
      tambah("pewarna", emo("pl", 240, 108, E.palet, 24)),
    ),
    k(
      SUARA_B3,
      hapus("meminta", "pl"),
      tambah("meminta", emo("tq", 240, 108, E.tanya, 24)),
      tambah("mana", teks("mn", 225, 136, "mana lebih banyak?", 9, W.merah)),
      sorotkan("isinya", "b1", "b2", "b3"),
    ),
  ],
};

/* ------------------------------ 2. Bak biru: tiga per delapan ------------------------------ */
const SUARA_BI1 = "Bak biru terbagi menjadi delapan bagian sama besar, dan tiga bagian terisi pewarna.";
const SUARA_BI2 = "Isinya tiga per delapan bak.";
const SUARA_BI3 = "Penyebut delapan memberi tahu ukuran tiap bagian, dan pembilang tiga memberi tahu banyaknya bagian terisi.";
const SEMUA_PETAK_BB = Array.from({ length: 8 }, (_, i) => `bb-c${i}`);
const FB = pecahan("fb", 150, 124, 3, 8, 24, W.biru);

export const ADEGAN_BIRU: AdeganStory = {
  id: "biru",
  judul: "Bak biru tiga per delapan",
  sumber: "Materi: bak biru",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_BI1,
      tambah(0, judul("Bak Biru"), ...bak("bb", 20, 50, 260, 36, 8, 0, D.biru)),
      tambah("delapan", teks("n8", 150, 108, "8 bagian sama besar", 10, W.tinta)),
      ubah("tiga", ...isiPetak("bb", 0, 2, D.biru)),
      tambah("pewarna.", teks("n3", 150, 190, "3 bagian terisi", 10, W.biru)),
    ),
    k(
      SUARA_BI2,
      hapus(0, "n8", "n3"),
      tambah("tiga", FB[0], FB[1]),
      tambah("delapan", FB[2]),
      sorotkan("bak.", "bb-c0", "bb-c1", "bb-c2"),
    ),
    k(
      SUARA_BI3,
      tambah("Penyebut", teks("ls", 220, 149, "penyebut", 10, W.merah)),
      sorotkan("ukuran", ...SEMUA_PETAK_BB),
      tambah("pembilang", teks("lp", 220, 124, "pembilang", 10, W.hijau)),
      redamkan("banyaknya", "bb-c3", "bb-c4", "bb-c5", "bb-c6", "bb-c7"),
    ),
  ],
};

/* ------------------------------ 3. Bak merah: enam per delapan ------------------------------ */
const SUARA_M1 = "Bak merah juga terbagi menjadi delapan bagian sama besar, tetapi enam bagian terisi.";
const SUARA_M2 = "Isinya enam per delapan bak.";
const SUARA_M3 = "Laras mencatat kedua pecahan itu berdampingan di kertas sakunya.";
const FB_KECIL = pecahan("fb", 252, 52, 3, 8, 16, W.biru);
const FM = pecahan("fm", 252, 106, 6, 8, 16, W.merah);

export const ADEGAN_MERAH: AdeganStory = {
  id: "merah",
  judul: "Bak merah enam per delapan",
  sumber: "Materi: bak merah dan catatan",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Bak Merah"), ...bak("bb", 16, 46, 190, 26, 8, 3, D.biru), ...FB_KECIL),
      tambah("terbagi", ...bak("bm", 16, 100, 190, 26, 8, 0, D.merah)),
      tambah("delapan", teks("t8", 110, 144, "8 bagian", 9, W.tinta)),
      ubah("enam", ...isiPetak("bm", 0, 5, D.merah)),
      tambah("terisi.", teks("t6", 110, 160, "6 terisi", 9, W.merah)),
    ),
    k(
      SUARA_M2,
      hapus(0, "t8", "t6"),
      tambah("enam", FM[0], FM[1]),
      tambah("delapan", FM[2]),
      sorotkan("bak.", "bm-c0", "bm-c1", "bm-c2", "bm-c3", "bm-c4", "bm-c5"),
    ),
    k(
      SUARA_M3,
      tambah("Laras", ...tokoh("lr", 40, 184, "Laras")),
      tambah("mencatat", kotak("kr", 96, 140, 150, 50, "#FFFFFF", "#94A3B8", { rx: 4, z: 1 }), teks("kl", 171, 136, "kertas saku", 7.4, W.ungu)),
      tambah("berdampingan", ...pecahan("ka", 140, 160, 3, 8, 16, W.biru), ...pecahan("kb", 200, 160, 6, 8, 16, W.merah)),
      sorotkan("sakunya.", "kr", "ka-p", "kb-p"),
    ),
  ],
};
