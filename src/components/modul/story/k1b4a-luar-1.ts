import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, WARNA_LENGKUNG, WARNA_SEGIEMPAT, WARNA_SEGITIGA, bangun, bulat, donat, emo, jam, jendela, judul, kartu, keranjang, nama, tangan, teks } from "./k1b4a-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k1b4a-bantu";

export const NAMA_METODE_ID = ["Kenali Bentuk", "Pilah Ciri", "Bentuk di Sekitar"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);

/** Tiga kartu pilihan nama bentuk (id c1, c2, c3), pojok kiri-atas di tinggi `y`. */
export const pilihanNama = (y: number, nama3 = ["Lingkaran", "Segitiga", "Segi empat"]): Obj[] => nama3.flatMap((t, i) => kartu(`c${i + 1}`, [14, 108, 202][i], y, 84, 30, [W.hijauMuda, W.pink, W.langit][i], [t], 9.6));

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara mengajarkan bentuk dengan cara yang berbeda-beda. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Kenali Bentuk, Pilah Ciri, dan Bentuk di Sekitar.";
const SUARA_O3 = "Semua metode ini menjawab satu pertanyaan. Bagaimana mengenali bentuk benda dengan cepat dan benar?";
const SUARA_O4 = "Kita akan melihat tiap metode dengan benda sehari-hari, seperti donat, tenda, jendela, dan telur.";
const SUARA_O5 = "Semua contoh memakai bentuk lengkung, segitiga, dan segi empat saja. Kamu cukup mengetuk dan melihat layar dengan teliti.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk mengenal bentuk",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)), tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      ...NAMA_METODE_ID.map((m, i) => tambah(["Kenali", "Pilah", "Sekitar."][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah("satu", emo("i1", 60, 90, "\u{1F440}", 36), emo("i2", 150, 90, "❓", 36), emo("i3", 240, 90, "\u{1F537}", 36)),
      tambah("Bagaimana", ...kartu("iq", 20, 120, 260, 44, W.emas, ["bagaimana mengenali bentuk benda", "dengan cepat dan benar?"], 10)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Benda sehari-hari")),
      tambah("donat,", donat("td", 40, 80, 36)),
      tambah("tenda,", bangun("tt", "segitiga", 110, 80, 44, 38, "#60A5FA")),
      tambah("jendela,", ...jendela("tj", 190, 80, 44, 38)),
      tambah("telur.", emo("te", 255, 92, "\u{1F95A}", 34)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Tiga bentuk saja")),
      tambah("lengkung,", bulat("o1", 60, 100, 22, WARNA_LENGKUNG, W.biru, { tebal: 2 })),
      tambah("segitiga,", bangun("o2", "segitiga", 150, 100, 50, 44, WARNA_SEGITIGA, 0, { tebal: 2 })),
      tambah("empat", bangun("o3", "segiempat", 240, 100, 48, 40, WARNA_SEGIEMPAT, 0, { tebal: 2 })),
      tambah("mengetuk", tangan(150, 160)),
    ),
  ],
};

/* ------------------------------ 2. Kenali Bentuk: konsep ------------------------------ */
const SUARA_A1 = "Metode pertama bernama Kenali Bentuk. Kita kenali bentuk dari wujudnya secara utuh, tanpa menghitung dulu.";
const SUARA_A2 = "Lihat sekilas wujudnya. Yang ini bulat penuh. Kita sebut lingkaran, sebuah bentuk lengkung.";
const SUARA_A3 = "Yang ini runcing di tiga ujung. Kita sebut segitiga.";
const SUARA_A4 = "Yang ini punya empat pojok yang rapi. Kita sebut segi empat.";
const SUARA_A5 = "Jadi dengan Kenali Bentuk, kita menyebut nama bentuk hanya dengan melihat wujudnya. Ucapkan lagi mengikuti suara guru.";

export const ADEGAN_LUAR_KENALI: AdeganStory = {
  id: "luar-kenali",
  judul: "Kenali Bentuk: lihat wujudnya",
  sumber: "Metode luar: Kenali Bentuk",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_A1,
      tambah("pertama", ...kepala(0)),
      tambah("wujudnya", bulat("ka", 60, 96, 22, WARNA_LENGKUNG, W.biru, { tebal: 2 }), bangun("kb", "segitiga", 150, 96, 52, 46, WARNA_SEGITIGA, 0, { tebal: 2 }), bangun("kc", "segiempat", 240, 96, 48, 40, WARNA_SEGIEMPAT, 0, { tebal: 2 })),
    ),
    k(SUARA_A2, sorotkan("bulat", "ka"), tambah("lingkaran,", teks("na", 60, 144, "lingkaran", 11, W.merah))),
    k(SUARA_A3, redamkan(0, "ka"), sorotkan("runcing", "kb"), tambah("segitiga.", teks("nb", 150, 144, "segitiga", 11, W.merah))),
    k(SUARA_A4, redamkan(0, "kb"), sorotkan("empat", "kc"), tambah("segi", teks("nc", 240, 144, "segi empat", 11, W.merah))),
    k(SUARA_A5, redamkan(0, "kc"), tambah("Jadi", ...kartu("kj", 40, 160, 220, 28, W.emas, ["lihat wujud, sebut nama"], 11)), tambah("Ucapkan", emo("sb", 262, 64, "\u{1F5E3}", 26))),
  ],
};

/* ------------------------------ 3. Kenali Bentuk: terapan ------------------------------ */
const SUARA_B1 = "Terapkan pada tiga benda. Ada jam dinding, tenda, dan jendela.";
const SUARA_B2 = "Lihat wujud jam dinding. Wujudnya bulat penuh. Ketuk nama lingkaran.";
const SUARA_B3 = "Lihat wujud tenda. Wujudnya runcing di atas. Ketuk nama segitiga.";
const SUARA_B4 = "Lihat wujud jendela. Wujudnya berpojok empat. Ketuk nama segi empat. Mudah sekali, bukan?";

export const ADEGAN_LUAR_KENALI_TERAPAN: AdeganStory = {
  id: "luar-kenali-terapan",
  judul: "Kenali Bentuk: jam, tenda, dan jendela",
  sumber: "Metode luar: Kenali Bentuk, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah("Terapkan", ...kepala(0)),
      tambah("jam", jam("bj", 50, 84, 18), nama("bjn", 50, 114, "jam dinding")),
      tambah("tenda,", bangun("bt", "segitiga", 150, 84, 50, 44, "#60A5FA"), nama("btn", 150, 114, "tenda")),
      tambah("jendela.", ...jendela("bw", 245, 84, 46, 40), nama("bwn", 245, 114, "jendela")),
    ),
    k(SUARA_B2, sorotkan("Lihat", "bj"), tambah("Wujudnya", ...pilihanNama(136)), tambah("Ketuk", tangan(56, 184)), sorotkan("lingkaran.", "c1-k")),
    k(SUARA_B3, redamkan(0, "bj", "c1-k"), sorotkan("Lihat", "bt"), ubah("Ketuk", { id: "tg", x: 150 }), sorotkan("segitiga.", "c2-k")),
    k(SUARA_B4, redamkan(0, "bt", "c2-k"), sorotkan("Lihat", "bw", "bw-x", "bw-y"), ubah("Ketuk", { id: "tg", x: 244 }), sorotkan("empat.@2", "c3-k")),
  ],
};

/* ------------------------------ 4. Pilah Ciri: konsep ------------------------------ */
const SUARA_C1 = "Metode kedua bernama Pilah Ciri. Kita pilah benda menurut tepinya, lengkung atau lurus.";
const SUARA_C2 = "Ketuk donat. Tepinya lengkung, jadi masuk ke keranjang tepi lengkung.";
const SUARA_C3 = "Ketuk tenda. Tepinya lurus, jadi masuk ke keranjang sisi lurus.";
const SUARA_C4 = "Benda bersisi lurus kita hitung lagi sisinya. Tiga sisi berarti segitiga, empat sisi berarti segi empat.";
const SUARA_C5 = "Dengan Pilah Ciri, kita memilih bentuk dari cirinya, yaitu tepi lengkung atau sisi lurus.";

export const ADEGAN_LUAR_PILAH: AdeganStory = {
  id: "luar-pilah",
  judul: "Pilah Ciri: tepi lengkung atau sisi lurus",
  sumber: "Metode luar: Pilah Ciri",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah("kedua", ...kepala(1)),
      tambah("tepinya", ...keranjang("ck1", 14, 100, 100, 38, { z: -1 }), ...keranjang("ck2", 130, 100, 156, 38, { z: -1 })),
      tambah("lengkung,", teks("cl1", 64, 154, "Tepi lengkung", 9.4, W.merah)),
      tambah("lurus.", teks("cl2", 208, 154, "Sisi lurus", 9.4, W.merah)),
    ),
    k(
      SUARA_C2,
      tambah("Ketuk", bulat("cd", 64, 70, 14, "#F59E0B", W.coklat, { tebal: 2.4 }), nama("cdn", 64, 94, "donat", 8), tangan(64, 90, "tg")),
      ubah("masuk", { id: "cd", x: 64, y: 120 }, { id: "cdn", x: 64, y: 136 }, { id: "tg", x: 64, y: 146 }),
    ),
    k(
      SUARA_C3,
      hapus(0, "tg"),
      tambah("Ketuk", bangun("ct", "segitiga", 208, 70, 34, 30, "#60A5FA"), nama("ctn", 208, 94, "tenda", 8), tangan(208, 90, "tg")),
      ubah("masuk", { id: "ct", x: 208, y: 120 }, { id: "ctn", x: 208, y: 136 }, { id: "tg", x: 208, y: 146 }),
    ),
    k(
      SUARA_C4,
      hapus(0, "tg"),
      tambah("Tiga", ...kartu("cs1", 130, 160, 156, 18, W.pink, ["3 sisi lurus: segitiga"], 8.6)),
      tambah("empat@2", ...kartu("cs2", 130, 182, 156, 18, W.langit, ["4 sisi lurus: segi empat"], 8.6)),
    ),
    k(SUARA_C5, sorotkan(0, "ck1", "ck2"), tambah("memilih", emo("ow", 262, 64, OWL, 28))),
  ],
};
