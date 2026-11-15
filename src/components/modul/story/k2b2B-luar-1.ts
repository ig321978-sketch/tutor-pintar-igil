import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, emo, jalurBilangan, jambuKisi, judul, kartu, kartuAngka, kubus, langkah, lompat, rumus, tandaAkhir, tandaAwal, teks } from "./k2b2B-gambar";
import { hapus, idx, k, pilihKata, redamkan, sorotkan, tambah, ubah, urutBilangan, urutNilai } from "./k2b2B-bantu";

export const NAMA_METODE_ID = ["Menghitung Naik", "Mengambil", "Meminjam"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama kecil di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 20, 288, 14, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.2);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara mengajarkan pengurangan dengan cara yang berbeda-beda. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Menghitung Naik, Mengambil, dan Meminjam.";
const SUARA_O3 = "Semua metode ini menjawab satu pertanyaan. Berapa sisanya, atau berapa selisihnya?";
const SUARA_O4 = "Kita memakai gambar di layar. Kamu cukup mengetuk dan melihat dengan teliti.";
const SUARA_O5 = "Semua contoh memakai bilangan paling besar dua puluh. Siap? Ayo kita mulai dengan metode pertama.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk pengurangan",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)), tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      { at: 0, bersih: true },
      tambah(0, judul("Tiga metode")),
      tambah(idx(SUARA_O2, "Menghitung"), ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah(idx(SUARA_O2, "Mengambil,"), ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah(idx(SUARA_O2, "Meminjam."), ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      { at: 0, bersih: true },
      tambah(0, judul("Satu pertanyaan")),
      tambah("satu", emo("i1", 60, 84, "\u{1F34E}", 34), emo("i2", 150, 84, "❓", 34), emo("i3", 240, 84, "\u{1F440}", 34)),
      tambah("Berapa", ...kartu("iq", 20, 112, 260, 52, W.emas, ["berapa sisanya, atau", "berapa selisihnya?"], 10)),
    ),
    k(
      SUARA_O4,
      { at: 0, bersih: true },
      tambah(0, judul("Alat bantu hari ini")),
      tambah("gambar", ...jambuKisi("a", 0, 4), ...[0, 1, 2].map((j) => kubus("a", j, 170 + j * 14, 54))),
      tambah("mengetuk", emo("tg", 150, 150, "\u{1F446}", 26)),
    ),
    k(
      SUARA_O5,
      { at: 0, bersih: true },
      tambah(0, judul("Sampai dua puluh")),
      tambah("dua", ...kartuAngka("ob", 112, 60, "20", W.emas, 76, 44, 26)),
      tambah("pertama.", emo("ow", 150, 168, OWL, 30)),
    ),
  ],
};

/* ------------------------------ 2. Menghitung Naik: konsep ------------------------------ */
const SUARA_N1 = "Metode pertama bernama Menghitung Naik. Kita mulai dari bilangan yang kecil.";
const SUARA_N2 = "Untuk delapan belas dikurangi dua belas, kita berdiri di dua belas dan naik sampai delapan belas.";
const SUARA_N3 = "Naik satu-satu: tiga belas, empat belas, lima belas, enam belas, tujuh belas, delapan belas.";
const SUARA_N4 = "Ada berapa lompatan? Satu, dua, tiga, empat, lima, enam. Ada enam lompatan.";
const SUARA_N5 = "Banyak lompatan itu adalah selisihnya. Delapan belas dikurangi dua belas sama dengan enam.";
const SUARA_N6 = "Cara ini enak dipakai kalau dua bilangannya berdekatan.";
const POS_N3 = urutNilai(SUARA_N3, [13, 14, 15, 16, 17, 18], "satu-satu:");
const POS_N4 = urutBilangan(SUARA_N4, 1, 6, "lompatan?");

export const ADEGAN_LUAR_NAIK: AdeganStory = {
  id: "luar-naik",
  judul: "Menghitung Naik: dari dua belas ke delapan belas",
  sumber: "Metode luar: Menghitung Naik",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_N1, tambah(0, ...kepala(0), ...jalurBilangan(), rumus("18 − 12 = ?", 160))),
    k(SUARA_N2, tambah(idx(SUARA_N2, "berdiri"), tandaAwal(12)), tambah(idx(SUARA_N2, "naik"), tandaAkhir(18))),
    k(SUARA_N3, ...[0, 1, 2, 3, 4, 5].map((q) => tambah(POS_N3[q], lompat(q, 12 + q, 13 + q)))),
    k(SUARA_N4, ...[0, 1, 2, 3, 4, 5].map((q) => tambah(POS_N4[q], langkah(q, 12 + q, 13 + q, String(q + 1))))),
    k(SUARA_N5, ubah(idx(SUARA_N5, "sama"), { id: "rm", isi: "18 − 12 = 6" }), sorotkan(idx(SUARA_N5, "Delapan"), "rm")),
    k(SUARA_N6, redamkan(0, "rm"), tambah(idx(SUARA_N6, "enak"), ...kartu("tp", 30, 120, 240, 24, W.emas, ["dua bilangan berdekatan: naik"], 10))),
  ],
};

/* ------------------------------ 3. Menghitung Naik: terapan ------------------------------ */
const SUARA_T1 = "Coba lagi dengan lima belas dikurangi delapan. Kita berdiri di delapan.";
const SUARA_T2 = "Naik dua langkah sampai ke sepuluh. Sepuluh adalah bilangan yang mudah.";
const SUARA_T3 = "Dari sepuluh naik lima langkah sampai lima belas.";
const SUARA_T4 = "Dua ditambah lima sama dengan tujuh. Jadi selisihnya tujuh.";
const SUARA_T5 = "Sekarang giliranmu. Dari enam naik ke sebelas. Berapa langkahnya? Ketuk jawabannya.";
const SUARA_T6 = "Betul, lima langkah! Dari enam naik lima sampai sebelas, jadi sebelas dikurangi enam sama dengan lima.";

export const ADEGAN_LUAR_NAIK_TERAPAN: AdeganStory = {
  id: "luar-naik-terapan",
  judul: "Menghitung Naik: lompat ke sepuluh dulu",
  sumber: "Metode luar: Menghitung Naik, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_T1, tambah(0, ...kepala(0), ...jalurBilangan(), rumus("15 − 8 = ?", 160)), tambah(idx(SUARA_T1, "berdiri"), tandaAwal(8), tandaAkhir(15))),
    k(SUARA_T2, tambah(idx(SUARA_T2, "Naik"), lompat(0, 8, 10), langkah(0, 8, 10, "2"))),
    k(SUARA_T3, tambah(idx(SUARA_T3, "naik"), lompat(1, 10, 15, W.hijau), langkah(1, 10, 15, "5"))),
    k(SUARA_T4, tambah(idx(SUARA_T4, "ditambah"), teks("m1", 150, 128, "2 + 5 = 7", 13, W.merah)), ubah(idx(SUARA_T4, "Jadi"), { id: "rm", isi: "15 − 8 = 7" })),
    k(
      SUARA_T5,
      hapus(idx(SUARA_T5, "Sekarang"), "m1", "gb-h0", "gb-h1", "gb-s0", "gb-s1", "gb-awal", "gb-akhir"),
      ubah(idx(SUARA_T5, "Sekarang"), { id: "rm", isi: "11 − 6 = ?" }),
      tambah(idx(SUARA_T5, "Dari"), tandaAwal(6), tandaAkhir(11)),
      tambah(idx(SUARA_T5, "Ketuk"), ...pilihKata(114, ["4", "5", "6"])),
    ),
    k(
      SUARA_T6,
      sorotkan(idx(SUARA_T6, "Betul,"), "c2-k"),
      tambah(idx(SUARA_T6, "naik"), lompat(0, 6, 11), langkah(0, 6, 11, "5")),
      ubah(idx(SUARA_T6, "jadi"), { id: "rm", isi: "11 − 6 = 5" }),
    ),
  ],
};
