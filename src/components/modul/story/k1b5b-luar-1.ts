import type { AdeganStory, Obj } from "./logika-story";
import { W, WB, angka, bulat, emo, judul, kartu, nampan, panah, teks } from "./k1b5b-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah, urutBil } from "./k1b5b-bantu";

/** Nama tiga metode luar dalam bahasa Indonesia (satu-satunya nama yang dipakai di video). */
export const NAMA_METODE_ID = ["Hitung sampai 20", "Sepuluh dan Satuan", "Dua Bingkai Sepuluh"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${i + 1}. ${NAMA_METODE_ID[i]}`], 9.4);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara mengajarkan cara berbeda untuk menghitung maju dan mundur. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu: Hitung sampai dua puluh, Sepuluh dan Satuan, dan Dua Bingkai Sepuluh.";
const SUARA_O3 = "Ketiganya menjawab satu pertanyaan yang sama: bagaimana kita menghitung maju dan mundur dengan mudah?";
const SUARA_O4 = "Kita memakai benda yang akrab, seperti kelereng, es krim, dan lampu roket.";
const SUARA_O5 = "Semua metode kita coba di layar. Kita ketuk, kita seret, dan kita pilih jawaban.";
const SUB_METODE = ["lanjut melewati 10", "10 dan sisanya", "dua bingkai 10"];

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk menghitung maju dan mundur",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Tiga metode dari luar")),
      tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)),
      tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      tambah("Hitung", ...kartu("m0", 20, 36, 260, 46, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`, SUB_METODE[0]], 10.5)),
      tambah("Sepuluh", ...kartu("m1", 20, 90, 260, 46, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`, SUB_METODE[1]], 10.5)),
      tambah("Bingkai", ...kartu("m2", 20, 144, 260, 46, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`, SUB_METODE[2]], 10.5)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah("satu", emo("i1", 60, 90, "\u{1F4CF}", 36), emo("i2", 150, 90, "\u{1F440}", 36), emo("i3", 240, 90, "\u{2753}", 36)),
      tambah("bagaimana", ...kartu("iq", 20, 120, 260, 44, W.emas, ["bagaimana menghitung maju", "dan mundur dengan mudah?"], 10)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Benda yang akrab")),
      tambah("kelereng,", emo("ta", 60, 110, "\u{1F535}", 34)),
      tambah("krim,", emo("tb", 150, 110, "\u{1F366}", 34)),
      tambah("roket.", emo("tc", 240, 110, "\u{1F680}", 34)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Di layar kita")),
      tambah("ketuk,", ...kartu("ya", 20, 50, 80, 40, W.langit, ["ketuk"], 12), emo("yb", 60, 124, "\u{1F446}", 30)),
      tambah("seret,", ...kartu("yc", 110, 50, 80, 40, W.hijauMuda, ["seret"], 12), emo("yd", 150, 124, "\u{2194}", 30)),
      tambah("pilih", ...kartu("ye", 200, 50, 80, 40, W.pink, ["pilih"], 12), emo("yf", 240, 124, "\u{2705}", 30)),
    ),
  ],
};

/* ------------------------------ 2. Hitung sampai dua puluh: konsep ------------------------------ */
const SUARA_H1 = "Metode pertama, Hitung sampai dua puluh. Idenya sederhana: setelah sepuluh, kita lanjut menghitung.";
const SUARA_H2 = "Banyak anak berhenti di sepuluh. Padahal sepuluh bukan akhir. Sebelas datang sesudah sepuluh.";
const SUARA_H3 = "Kita hitung terus: sebelas, dua belas, tiga belas, empat belas, lima belas.";
const SUARA_H4 = "Kita berhenti kalau sudah sampai dua puluh. Itulah cara Hitung sampai dua puluh.";
const P_H3 = urutBil(SUARA_H3, [11, 12, 13, 14, 15]);

export const ADEGAN_LUAR_HITUNG: AdeganStory = {
  id: "luar-hitung",
  judul: "Hitung sampai 20: lanjut melewati sepuluh",
  sumber: "Metode luar: Hitung sampai dua puluh",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, ...kepala(0)),
      tambah("Idenya", ...angka("cc0", 20, 80, 8, 34, 34, W.langit, 16), ...angka("cc1", 60, 80, 9, 34, 34, W.langit, 16), ...angka("cc2", 100, 80, 10, 34, 34, W.langit, 16)),
      tambah("lanjut", panah("cp", 140, 97, 26, 0, W.merah, 2.6), ...angka("cc3", 176, 80, 11, 34, 34, W.hijauMuda, 16), ...angka("cc4", 216, 80, 12, 34, 34, W.hijauMuda, 16)),
    ),
    k(
      SUARA_H2,
      bersih(0),
      tambah(0, ...kepala(0)),
      tambah("sepuluh.", ...angka("cd0", 40, 74, 10, 80, 60, W.langit, 34)),
      tambah("berhenti", emo("cs", 80, 150, "\u{26D4}", 28), teks("cst", 80, 172, "berhenti?", 10, W.merah)),
      tambah("Sebelas", panah("cq", 128, 104, 30, 0, W.hijau, 3), ...angka("cd1", 168, 74, 11, 80, 60, W.hijauMuda, 34)),
      sorotkan("Sebelas", "cd1-k"),
    ),
    k(
      SUARA_H3,
      bersih(0),
      tambah(0, ...kepala(0)),
      ...P_H3.map((p, i) => tambah(p, ...angka(`ce${i}`, 20 + i * 52, 80, 11 + i, 48, 44, W.hijauMuda, 20))),
      sorotkan(P_H3[4], "ce4-k"),
    ),
    k(
      SUARA_H4,
      bersih(0),
      tambah(0, ...kepala(0)),
      tambah("dua", ...angka("cf", 100, 72, 20, 100, 70, W.emas, 44)),
      tambah("Itulah", emo("cg", 150, 170, "\u{1F389}", 26), teks("cgt", 150, 190, "lanjut melewati 10", 10, W.hijau)),
    ),
  ],
};

/* ------------------------------ 3. Hitung sampai dua puluh: terapan ------------------------------ */
const SUARA_Q1 = "Halim punya satu baris kelereng. Ada sepuluh kelereng. Ketuk nampan, dan satu kelereng muncul di ujung baris.";
const SUARA_Q2 = "Ketuk lagi. Sebelas! Ketuk lagi. Dua belas! Ketuk lagi. Tiga belas! Hitungannya naik satu demi satu.";
const SUARA_Q3 = "Sekarang Halim punya lima belas kelereng. Kali ini kita menghitung mundur. Ketuk kelereng paling ujung, dan kelerengnya pergi.";
const SUARA_Q4 = "Empat belas, tiga belas, dua belas. Setiap kali ketuk, satu kelereng pergi dan bilangannya turun.";
const SUARA_Q5 = "Terakhir, Halim mengucapkan banyak kelereng di baris. Ada dua belas. Hebat sekali!";
const MQ = (i: number, warna: string = WB.biru): Obj => bulat(`qm${i}`, 20 + i * 12, 96, 5.2, warna, W.biru, { tebal: 1 });
const LQ = (n: number): Obj => teks("qd", 244, 102, String(n), 20, W.merah);
const P_Q2 = urutBil(SUARA_Q2, [11, 12, 13]);
const P_Q4 = urutBil(SUARA_Q4, [14, 13, 12]);

export const ADEGAN_LUAR_HITUNG_TERAPAN: AdeganStory = {
  id: "luar-hitung-terapan",
  judul: "Hitung sampai 20: barisan kelereng Halim",
  sumber: "Metode luar: Hitung sampai dua puluh, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, ...kepala(0)),
      tambah("Halim", emo("qh", 40, 66, "\u{1F466}", 24), teks("qht", 74, 64, "Halim", 8.6)),
      tambah("sepuluh", Array.from({ length: 10 }, (_, i) => MQ(i)), LQ(10)),
      tambah("nampan,", ...nampan("qn", 200, 150, 80, 36, "nampan")),
      tambah("muncul", emo("qt", 240, 176, "\u{1F446}", 20)),
    ),
    k(
      SUARA_Q2,
      tambah(P_Q2[0], MQ(10, WB.kuning)),
      ubah(P_Q2[0], { id: "qd", isi: "11" }),
      tambah(P_Q2[1], MQ(11, WB.kuning)),
      ubah(P_Q2[1], { id: "qd", isi: "12" }),
      tambah(P_Q2[2], MQ(12, WB.kuning)),
      ubah(P_Q2[2], { id: "qd", isi: "13" }),
    ),
    k(
      SUARA_Q3,
      bersih(0),
      tambah(0, ...kepala(0)),
      tambah("lima", Array.from({ length: 15 }, (_, i) => MQ(i, i >= 10 ? WB.kuning : WB.biru)), LQ(15)),
      tambah("Kali", teks("qk", 150, 134, "hitung mundur", 11, W.merah)),
      tambah("ujung,", emo("qt", 20 + 14 * 12, 122, "\u{1F446}", 20)),
    ),
    k(
      SUARA_Q4,
      hapus(P_Q4[0], "qm14"),
      ubah(P_Q4[0], { id: "qd", isi: "14" }, { id: "qt", x: 20 + 13 * 12 }),
      hapus(P_Q4[1], "qm13"),
      ubah(P_Q4[1], { id: "qd", isi: "13" }, { id: "qt", x: 20 + 12 * 12 }),
      hapus(P_Q4[2], "qm12"),
      ubah(P_Q4[2], { id: "qd", isi: "12" }, { id: "qt", x: 20 + 11 * 12 }),
    ),
    k(
      SUARA_Q5,
      hapus(0, "qt", "qk"),
      sorotkan("Ada", ...Array.from({ length: 12 }, (_, i) => `qm${i}`)),
      redamkan("sekali!", "qm0"),
      tambah("sekali!", emo("ow", 150, 176, "\u{1F989}", 28)),
      ubah("Ada", { id: "qd", warna: W.hijau }),
    ),
  ],
};
