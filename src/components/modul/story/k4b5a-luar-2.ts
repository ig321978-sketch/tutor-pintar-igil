import type { AdeganStory } from "./logika-story";
import { E, G, K, W, bangun, bangunKapur, bulatkan, emo, garis, judul, kotak, panah, papanTulis, penyiku, tanah, tandaSejajar, tandaSisi, tandaSiku, teks, titik, tokoh } from "./k4b5a-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah } from "./k4b5a-bantu";

/*
 * Cerita orisinal IGIL "Etalase Keramik Bu Dewi" (Kelas 4 Bab 5 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b5a.md. Bagian ini: Sides and Corners (Sisi dan Sudut), Shape Family Tree (Pohon Keluarga Bentuk), terapannya, dan ringkasan.
 */

const MERAH = K.kapurMerah;
const BIRU = K.kapurBiru;
const HIJAU = "#86EFAC";
const sudut4 = [0, 1, 2, 3];

/* ------------------------------ Sides and Corners: konsep ------------------------------ */
const SUARA_S1 = "Cara kedua, Sides and Corners, atau Sisi dan Sudut.";
const SUARA_S2 = "Kita memeriksa sisi yang sama panjang, sisi yang sejajar, dan sudut yang siku-siku pada sebuah bangun.";
const SUARA_S3 = "Sudut siku-siku diperiksa dengan penyiku, dan sisi sama panjang diperiksa dengan penggaris.";
const SUARA_S4 = "Dengan memeriksa ciri satu per satu, kita bisa memastikan nama bangunnya.";
const PG = titik(210, 92, "persegi", 16);

export const ADEGAN_LUAR_SISI: AdeganStory = {
  id: "luar-sisi",
  judul: "Sides and Corners: Sisi dan Sudut",
  sumber: "Metode global: Sides and Corners (konsep)",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Cara 2: Sides and Corners"), ...papanTulis("pt", 8, 28, 284, 132)),
      tambah("Sides", teks("nm", 150, 56, "Sides and Corners", 13, MERAH)),
      tambah("Sisi", teks("ni", 150, 74, "Sisi dan Sudut", 10, K.kapur)),
      tambah("Sudut.", bangunKapur("sq", 210, 92, "persegi", 16)),
    ),
    k(
      SUARA_S2,
      hapus(0, "nm", "ni"),
      tambah("sama", ...tandaSisi("sq", PG, MERAH), teks("l1", 75, 60, "sisi sama panjang", 8, MERAH)),
      tambah("sejajar,", ...tandaSejajar("sq", PG, 0, 0, BIRU), ...tandaSejajar("sq", PG, 2, 0, BIRU), ...tandaSejajar("sq", PG, 1, 1, BIRU), ...tandaSejajar("sq", PG, 3, 1, BIRU), teks("l2", 75, 90, "sisi sejajar", 8, BIRU)),
      tambah("siku-siku", ...sudut4.map((i) => tandaSiku("sq", PG, i, 7, HIJAU)), teks("l3", 75, 120, "sudut siku-siku", 8, HIJAU)),
    ),
    k(
      SUARA_S3,
      hapus(0, "l1", "l2", "l3"),
      tambah("penyiku", penyiku("py", PG[3].x, PG[3].y, 22, 5), teks("tp", 75, 60, "penyiku: sudut", 8, HIJAU)),
      tambah("penggaris.", kotak("rl", PG[3].x, bulatkan(PG[3].y + 4), 64, 8, "#FDE68A", W.kayuTua, { rx: 1, tebal: 1, z: 6 }), ...[0, 1, 2, 3, 4, 5, 6].map((i) => garis(`rl-${i}`, bulatkan(PG[3].x + 5 + i * 9), bulatkan(PG[3].y + 4), 0, 4, W.kayuTua, 1, { z: 7 })), teks("pg", 75, 90, "penggaris: sisi", 8, MERAH)),
    ),
    k(
      SUARA_S4,
      hapus(0, "py", "tp", "pg", "rl", ...[0, 1, 2, 3, 4, 5, 6].map((i) => `rl-${i}`)),
      tambah("satu", teks("sp", 75, 90, "1 per 1", 11, MERAH)),
      tambah("nama", teks("nb", 150, 148, "nama bangun: persegi", 10, K.kapur), emo("ok", 262, 48, E.benar, 18)),
    ),
  ],
};

/* ------------------------------ Sides and Corners: terapan ------------------------------ */
const SUARA_X1 = "Genta memeriksa sebuah keramik dengan penyiku dan penggaris.";
const SUARA_X2 = "Keempat sisinya sama panjang, tetapi sudutnya tidak ada yang siku-siku, jadi itu belah ketupat.";
const SUARA_X3 = "Cocok untuk membedakan bangun yang tampak mirip, karena ciri diperiksa dengan alat.";
const SUARA_X4 = "Kurang cocok kalau kita hanya melihat sekilas, karena mata mudah tertipu oleh posisi bangun.";
const BK = titik(170, 80, "belah-ketupat", 14);

export const ADEGAN_LUAR_SISI_TERAPAN: AdeganStory = {
  id: "luar-sisi-terapan",
  judul: "Sisi dan Sudut: kapan cocok",
  sumber: "Metode global: Sides and Corners (terapan)",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_X1,
      tambah(0, judul("Genta Memeriksa Keramik"), ...papanTulis("pt", 8, 28, 284, 124), ...tokoh("ge", 40, 184, "Genta")),
      tambah("keramik", bangunKapur("bk", 170, 80, "belah-ketupat", 14)),
      tambah("penyiku", penyiku("py", 60, 130, 30, 5)),
      tambah("penggaris.", kotak("rl", 190, 122, 70, 9, "#FDE68A", W.kayuTua, { rx: 1, tebal: 1, z: 6 }), ...[0, 1, 2, 3, 4, 5, 6].map((i) => garis(`rl-${i}`, 198 + i * 10, 122, 0, 4, W.kayuTua, 1, { z: 7 }))),
    ),
    k(
      SUARA_X2,
      hapus(0, "py", "rl", ...[0, 1, 2, 3, 4, 5, 6].map((i) => `rl-${i}`)),
      tambah("sama", ...tandaSisi("bk", BK, MERAH)),
      tambah("siku-siku,", teks("ts", 90, 80, "tidak siku-siku", 8, HIJAU), emo("xs", 252, 80, E.salah, 20)),
      tambah("ketupat.", teks("nm", 170, 130, "belah ketupat", 11, K.kapur)),
    ),
    k(
      SUARA_X3,
      hapus(0, "ts", "xs"),
      tambah("bangun", bangunKapur("pg", 70, 100, "persegi", 9)),
      tambah("mirip,", teks("mp", 170, 46, "tampak mirip", 9, MERAH)),
      tambah("alat.", teks("ca", 170, 144, "ciri diperiksa", 8, K.kapur), emo("ok", 262, 56, E.benar, 22)),
    ),
    k(
      SUARA_X4,
      hapus(0, "mp", "ca", "ok", "pg"),
      tambah("Kurang", emo("xs", 262, 56, E.salah, 22)),
      tambah("sekilas,", emo("my", 262, 100, E.mata, 20)),
      tambah("posisi", bangunKapur("pr", 70, 100, "persegi", 9, { rot: 45 }), teks("ps", 70, 140, "posisi berbeda", 8, MERAH)),
    ),
  ],
};

/* ------------------------------ Shape Family Tree: konsep ------------------------------ */
const SUARA_F1 = "Cara ketiga, Shape Family Tree, atau Pohon Keluarga Bentuk.";
const SUARA_F2 = "Kita menggambar bagan keluarga, dari bangun umum di atas sampai bangun khusus di bawah.";
const SUARA_F3 = "Bangun yang lebih khusus punya semua ciri bangun di atasnya, ditambah satu ciri baru.";
const SUARA_F4 = "Dengan bagan itu, hubungan antar bangun terlihat jelas dalam satu pandangan.";

/** Satu simpul bagan: kotak `${id}` dan nama `${id}-t`, berpusat di (x, y). */
const simpul = (id: string, x: number, y: number, nama: string, w = 90) => [kotak(id, x - w / 2, y - 10, w, 20, K.papan, K.kapur, { rx: 3, tebal: 1.2, z: 2 }), teks(`${id}-t`, x, y + 3, nama, 8.4, K.kapur, { z: 3 })];

export const ADEGAN_LUAR_POHON: AdeganStory = {
  id: "luar-pohon",
  judul: "Pohon Keluarga Bentuk",
  sumber: "Metode global: Shape Family Tree (konsep)",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, judul("Cara 3: Shape Family Tree"), ...papanTulis("pt", 8, 28, 284, 132)),
      tambah("Shape", teks("nm", 150, 56, "Shape Family Tree", 13, MERAH)),
      tambah("Pohon", teks("ni", 150, 74, "Pohon Keluarga Bentuk", 9, K.kapur)),
      tambah("Bentuk.", emo("ph", 150, 118, E.pohon, 28)),
    ),
    k(
      SUARA_F2,
      hapus(0, "nm", "ni", "ph"),
      tambah("bagan", ...simpul("n1", 150, 50, "segiempat")),
      tambah("umum", teks("um", 50, 54, "umum", 8, MERAH), panah("a1", 150, 62, 0, 14, K.kapur, 1.6)),
      tambah("atas", ...simpul("n2", 150, 90, "jajargenjang")),
      tambah("khusus", teks("kh", 50, 130, "khusus", 8, MERAH), panah("a2", 150, 102, 0, 14, K.kapur, 1.6), ...simpul("n3", 150, 126, "persegi panjang")),
    ),
    k(
      SUARA_F3,
      tambah("semua", teks("sc", 240, 90, "semua ciri induk", 8, BIRU)),
      tambah("ditambah", teks("pl", 240, 108, "+", 12, MERAH)),
      tambah("satu", teks("sb", 240, 126, "1 ciri baru", 9, MERAH)),
    ),
    k(
      SUARA_F4,
      hapus(0, "sc", "pl", "sb"),
      tambah("hubungan", teks("hb", 240, 90, "hubungan jelas", 8.4, BIRU)),
      tambah("satu", teks("sp", 240, 126, "1 pandangan", 9, MERAH), emo("my", 262, 56, E.mata, 20)),
    ),
  ],
};

/* ------------------------------ Shape Family Tree: terapan ------------------------------ */
const SUARA_Y1 = "Satria menelusuri pohon dari segiempat turun ke persegi panjang, lalu ke persegi.";
const SUARA_Y2 = "Persegi punya semua ciri persegi panjang, ditambah keempat sisinya sama panjang.";
const SUARA_Y3 = "Cocok untuk memahami keluarga bangun, karena satu ciri bisa dipakai berulang, dan persegi juga termasuk persegi panjang.";
const SUARA_Y4 = "Kurang cocok kalau kita lupa ciri bangun di atasnya, karena bagannya jadi putus.";
const PG2 = titik(240, 70, "persegi", 8);

export const ADEGAN_LUAR_POHON_TERAPAN: AdeganStory = {
  id: "luar-pohon-terapan",
  judul: "Pohon Bentuk: kapan cocok",
  sumber: "Metode global: Shape Family Tree (terapan)",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_Y1,
      tambah(0, judul("Satria Menelusuri Pohon"), ...papanTulis("pt", 8, 28, 284, 124), ...tokoh("sa", 40, 184, "Satria")),
      tambah("segiempat", ...simpul("n1", 130, 50, "segiempat"), emo("fj", 192, 50, E.pohon, 16)),
      tambah("persegi", panah("a1", 130, 62, 0, 14, K.kapur, 1.6), ...simpul("n2", 130, 90, "persegi panjang")),
      tambah("persegi@2", panah("a2", 130, 102, 0, 14, K.kapur, 1.6), ...simpul("n3", 130, 126, "persegi")),
    ),
    k(
      SUARA_Y2,
      tambah("Persegi", bangunKapur("pg", 240, 70, "persegi", 8)),
      tambah("sama", ...tandaSisi("pg", PG2, MERAH)),
      tambah("keempat", teks("pl", 240, 110, "+ 4 sisi sama", 9, MERAH)),
      sorotkan("panjang@2", "n3"),
    ),
    k(
      SUARA_Y3,
      hapus(0, "pl"),
      redamkan(0, "n3"),
      tambah("Cocok", emo("ok", 262, 140, E.benar, 22)),
      tambah("satu", teks("sc", 240, 110, "1 ciri dipakai", 8.4, BIRU)),
      tambah("berulang,", teks("br", 240, 124, "berulang", 8.4, BIRU)),
      tambah("termasuk", teks("tm", 230, 146, "persegi juga persegi panjang", 7.5, HIJAU)),
    ),
    k(
      SUARA_Y4,
      hapus(0, "ok", "sc", "br", "tm", "a2"),
      tambah("Kurang", emo("xs", 262, 140, E.salah, 22)),
      tambah("lupa", garis("p1", 130, 102, 0, 4, K.kapur, 1.6), garis("p2", 130, 118, 0, 4, K.kapur, 1.6)),
      tambah("putus.", teks("pt2", 240, 110, "bagan putus", 9, MERAH)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita pelajari bersama Bu Dewi. Mana yang pas tergantung keadaan.";
const SUARA_R2 = "Ingin merapikan banyak keramik, pakai Pilah Keramik. Ingin memastikan nama bangun, pakai Sisi dan Sudut.";
const SUARA_R3 = "Ingin melihat hubungan antar bangun, pakai Pohon Keluarga Bentuk. Apa pun caranya, sebut cirinya dengan jelas.";
const SUARA_R4 = "Menurutmu, untuk membedakan layang-layang dan belah ketupat, cara mana yang paling pas?";
const KARTU = ["Pilah Keramik", "Sisi dan Sudut", "Pohon Keluarga Bentuk"];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Memilih cara yang pas",
  sumber: "Metode global: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tiga Cara"), ...tanah("tn", 150), teks("n3", 262, 44, "3 cara", 10, W.merah)),
      tambah("Tiga", ...KARTU.flatMap((n, i) => [kotak(`r${i}-k`, 8 + i * 98, 60, 88, 40, "#7C2D12", W.putih, { rx: 6, tebal: 1.4 }), teks(`r${i}-t`, 52 + i * 98, 84, n, i === 2 ? 6.8 : 8, W.sorot, { z: 2 })])),
      tambah("Bu", ...tokoh("bd", 150, 184, "Bu Dewi")),
    ),
    k(
      SUARA_R2,
      sorotkan("Pilah", "r0-k"),
      tambah("Pilah", emo("ok1", 52, 118, E.benar, 20)),
      redamkan("Sisi", "r0-k"),
      sorotkan("Sisi", "r1-k"),
      tambah("Sisi", emo("ok2", 150, 118, E.benar, 20)),
    ),
    k(
      SUARA_R3,
      redamkan(0, "r1-k"),
      hapus(0, "ok1", "ok2"),
      sorotkan("Pohon", "r2-k"),
      tambah("Pohon", emo("ok3", 248, 118, E.benar, 20)),
      tambah("sebut", teks("ps", 150, 138, "sebut ciri dengan jelas", 8.4, W.hijauTua)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Pilih Cara yang Pas"), ...tanah("tn", 150), ...tokoh("bd", 150, 184, "Bu Dewi")),
      tambah("layang-layang", bangun("ll", 90, 88, "layang-layang", 9, G.ungu), teks("t1", 90, 132, "layang-layang", 9, W.coklat)),
      tambah("belah", bangun("bk", 210, 88, "belah-ketupat", 12, G.pink), teks("t2", 210, 132, "belah ketupat", 9, W.coklat)),
      tambah("pas?", teks("tq", 150, 92, "?", 26, W.merah), emo("i1", 252, 150, E.penggaris, 16), emo("i2", 272, 150, E.pohon, 16)),
    ),
  ],
};
