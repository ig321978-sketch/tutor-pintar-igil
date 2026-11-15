import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, X0, CW, bendaH, emo, garisAwal, garisUjung, judul, kartu, kartuAngka, kotak, panjangH, satuanH, teks } from "./k1b7A-gambar";
import { bersih, hapus, idx, isiHitung, k, pilihKata, sorotkan, tambah } from "./k1b7A-bantu";
import { batangNama, Y1, Y2 } from "./k1b7A-materi-1";

export const NAMA_METODE_ID = ["Ulangi Satuan Panjang", "Banding Panjang", "Satuan Tak Baku"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara mengajarkan cara membandingkan panjang yang berbeda-beda. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Ulangi Satuan Panjang, Banding Panjang, dan Satuan Tak Baku.";
const SUARA_O3 = "Semua metode ini menjawab satu pertanyaan. Mana benda yang lebih panjang, dan berapa selisihnya?";
const SUARA_O4 = "Kita akan memakai kotak satuan di layar. Kamu cukup mengetuk dan melihat dengan teliti.";
const SUARA_O5 = "Semua contoh memakai kotak satuan sampai sepuluh. Siap? Ayo kita mulai dengan metode pertama.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk membandingkan panjang",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)), tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      tambah(idx(SUARA_O2, "Ulangi"), ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah(idx(SUARA_O2, "Banding"), ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah(idx(SUARA_O2, "Satuan", 2), ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah("satu", emo("i1", 60, 84, "⚖️", 34), emo("i2", 150, 84, "❓", 34), emo("i3", 240, 84, "\u{1F440}", 34)),
      tambah("Mana", ...kartu("iq", 20, 112, 260, 52, W.emas, ["mana benda yang lebih panjang,", "dan berapa selisihnya?"], 10)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Alat bantu hari ini")),
      tambah("kotak", ...satuanH("ua", 80, 5, W.langit, 100), teks("ua-nm", 150, 116, "kotak satuan", 10, W.ungu)),
      tambah("mengetuk", emo("tg", 190, 124, "\u{1F446}", 22)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Sampai sepuluh")),
      tambah("sepuluh.", ...kartuAngka("ob", 112, 60, "10", W.emas, 76, 44, 26)),
      tambah("pertama.", emo("ow", 150, 168, OWL, 30)),
    ),
  ],
};

/* ------------------------------ 2. Ulangi Satuan Panjang: konsep ------------------------------ */
const SUARA_A1 = "Metode pertama bernama Ulangi Satuan Panjang. Kita mengetuk satu satuan di layar, lalu mengulanginya, mulai dari garis awal.";
const SUARA_A2 = "Ini pita merah. Satuan yang kita pakai bernama klip. Satu klip kita gambar sebagai satu kotak kecil.";
const SUARA_A3 = "Ketuk klip berikutnya, satu demi satu, rapat tanpa celah. Satu, dua, tiga, empat, lima, enam, tujuh.";
const SUARA_A4 = "Ujung pita sejajar dengan ujung klip yang terakhir. Jadi panjang pita merah adalah tujuh klip.";
const SUARA_A5 = "Ingat, klip harus rapat, tidak ada celah, tidak bertumpuk, dan tidak miring. Pakai satu jenis satuan saja.";
const SUARA_A6 = "Ucapkan lagi mengikuti suara guru. Pita merah panjangnya tujuh klip.";
const YB = 66;
const YU = 106;

export const ADEGAN_LUAR_ULANG: AdeganStory = {
  id: "luar-ulang",
  judul: "Ulangi Satuan Panjang: mengetuk klip satu demi satu",
  sumber: "Metode luar: Ulangi Satuan Panjang",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_A1,
      tambah("pertama", ...kepala(0)),
      tambah("mengetuk", bendaH("ua", YB, 7, W.pink), teks("ua-nm", 4, YB + 11, "Pita merah", 8.4, W.biru, { anchor: "start" })),
      tambah("garis", ...garisAwal(58, 130)),
    ),
    k(SUARA_A2, tambah(idx(SUARA_A2, "Satu"), kotak("lg", 110, 152, CW, 16, W.langit, W.biru, { rx: 1, tebal: 1.3 }), teks("lg-t", 136, 164, "satu klip", 9, W.biru, { anchor: "start" }))),
    k(SUARA_A3, ...isiHitung(SUARA_A3, "ua", YU, 7, W.langit, { setelah: "celah." })),
    k(SUARA_A4, hapus(0, "tg"), tambah("Ujung", garisUjung("uj", X0 + 7 * CW, 62, 126)), tambah("tujuh", panjangH("ua", YU, 7, "7 klip"))),
    k(SUARA_A5, hapus(0, "lg", "lg-t"), tambah("Ingat,", ...kartu("ig", 60, 148, 180, 42, W.krem, ["rapat, tanpa celah,", "tidak miring"], 9.6))),
    k(SUARA_A6, tambah("Ucapkan", emo("ucap", 262, 190, "\u{1F5E3}", 24))),
  ],
};

/* ------------------------------ 3. Ulangi Satuan Panjang: terapan ------------------------------ */
const SUARA_B1 = "Terapkan pada dua pita. Pita kuning dan pita hijau diukur dengan klip yang sama, mulai dari garis awal.";
const SUARA_B2 = "Pita kuning panjangnya enam klip. Pita hijau panjangnya sembilan klip.";
const SUARA_B3 = "Pita hijau lebih panjang dari pita kuning. Pita hijau lebih panjang tiga klip dari pita kuning.";
const SUARA_B4 = "Berapa klip lebihnya pita hijau? Pilih: dua, tiga, atau empat. Ketuk bilangan yang tepat.";

export const ADEGAN_LUAR_ULANG_TERAPAN: AdeganStory = {
  id: "luar-ulang-terapan",
  judul: "Ulangi Satuan Panjang: pita kuning dan pita hijau",
  sumber: "Metode luar: Ulangi Satuan Panjang, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_B1, tambah("Terapkan", ...kepala(0)), tambah("pita", ...batangNama("ua", Y1, 6, W.krem, "Pita kuning"), ...batangNama("ub", Y2, 9, W.hijauMuda, "Pita hijau")), tambah("garis", ...garisAwal(58, 150))),
    k(SUARA_B2, tambah(idx(SUARA_B2, "enam"), panjangH("ua", Y1, 6, "6 klip")), tambah(idx(SUARA_B2, "sembilan"), panjangH("ub", Y2, 9, "9 klip"))),
    k(SUARA_B3, sorotkan("lebih", ...[6, 7, 8].map((i) => `ub${i}`)), tambah("tiga", ...kartu("bs", 70, 160, 160, 28, W.emas, ["lebihnya: 3 klip"], 10))),
    k(SUARA_B4, hapus(0, "bs-k", "bs-t0"), tambah("Pilih:", ...pilihKata(152, ["2", "3", "4"])), sorotkan("tiga,", "c2-k")),
  ],
};
