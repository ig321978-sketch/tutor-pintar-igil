import type { AdeganStory, Obj } from "./logika-story";
import { W, bingkai, deret, emo, isiBingkai, judul, kartu, kartuAngka, kelompok, tata, teks, tulisAngka } from "./k1b1b-gambar";
import { bersih, hitungAksi, idx, k, sorotkan, tambah, urutKata } from "./k1b1b-bantu";

export const NAMA_METODE = ["Number Names", "Ten Frame", "Number Line Mini"];
export const NAMA_METODE_ID = ["Nama Bilangan", "Bingkai Sepuluh", "Garis Bilangan Kecil"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara mengajarkan cara berbeda untuk membandingkan banyak benda. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu: Number Names, Ten Frame, dan Number Line Mini.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Nama Bilangan, Bingkai Sepuluh, dan Garis Bilangan Kecil.";
const SUARA_O4 = "Semua metode ini menjawab satu pertanyaan: bagaimana membandingkan dua kelompok benda dengan benar?";
const SUARA_O5 = "Kita akan memakai benda-benda di taman, seperti kursi, balon, dan kelereng.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk membandingkan",
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
      ...NAMA_METODE.map((m, i) => tambah(["Names,", "Frame,", "Mini."][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      ...NAMA_METODE_ID.map((m, i) => tambah(["Bilangan,", "Sepuluh,", "Kecil."][i], ...kartu(`n${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
      tambah("Sepuluh,", teks("n10", 258, 108, "10", 14, W.merah)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah("satu", emo("i1", 60, 90, "\u{1F517}", 36), emo("i2", 150, 90, "\u{1F4CF}", 36), emo("i3", 240, 90, "\u{1F440}", 36)),
      tambah("pertanyaan:", ...kartu("iq", 20, 120, 260, 44, W.emas, ["bagaimana membandingkan", "dua kelompok benda dengan benar?"], 10)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Benda-benda di taman")),
      tambah("kursi,", ...kelompok("kursi", "tb", 1, 100, 60, 1, 16)),
      tambah("balon,", ...deret("balon", "tc", [{ x: 150, y: 100 }], 18)),
      tambah("kelereng.", ...deret("kelereng", "td", [{ x: 240, y: 100 }], 28)),
    ),
  ],
};

/* ------------------------------ 2. Number Names: konsep ------------------------------ */
const SUARA_A1 = "Metode pertama, Number Names, atau Nama Bilangan. Setiap bilangan punya nama dan punya lambang.";
const SUARA_A2 = "Kita ucapkan namanya, lalu kita tulis lambangnya. Namanya empat, lambangnya begini.";
const SUARA_A3 = "Lihat empat pensil Kira. Kita ucapkan: satu, dua, tiga, empat. Nama terakhir adalah empat.";
const SUARA_A4 = "Lihat lima pensil Malosi. Satu, dua, tiga, empat, lima. Nama terakhir adalah lima. Kita tulis lambang lima.";
const P4 = tata(4, 104);
const P5 = tata(5, 104);

export const ADEGAN_LUAR_NAMA: AdeganStory = {
  id: "luar-nama",
  judul: "Number Names: nama dan lambang bilangan",
  sumber: "Metode luar: Number Names",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_A1,
      tambah("pertama,", ...kepala(0)),
      tambah(idx(SUARA_A1, "nama", 2), teks("ne", 90, 112, "empat", 22, W.ungu)),
      tambah("lambang.", ...kartuAngka("na", 170, 74, "4", W.krem, 80, 70, 44)),
    ),
    k(
      SUARA_A2,
      bersih(0),
      tambah(0, ...kepala(0), teks("ne", 90, 112, "empat", 22, W.ungu)),
      tambah("ucapkan", emo("uc", 90, 150, "\u{1F4AC}", 30)),
      tambah("begini.", ...tulisAngka("w", 172, 66, "4", 2)),
    ),
    k(SUARA_A3, bersih(0), tambah(0, ...kepala(0), ...deret("pensil", "pa", P4, 12)), ...hitungAksi(SUARA_A3, "pa", P4, "ucapkan:"), sorotkan("terakhir", "pa3")),
    k(
      SUARA_A4,
      bersih(0),
      tambah(0, ...kepala(0), ...deret("pensil", "pb", P5, 12)),
      ...hitungAksi(SUARA_A4, "pb", P5, "Malosi."),
      tambah("lambang", ...tulisAngka("w", 134, 150, "5", 1)),
    ),
  ],
};

/* ------------------------------ 3. Number Names: terapan ------------------------------ */
const SUARA_B1 = "Sekarang kita bandingkan dua nama bilangan. Nama dan lambang empat, serta nama dan lambang lima.";
const SUARA_B2 = "Kita ucapkan urutannya. Empat disebut lebih dulu, lima disebut sesudahnya.";
const SUARA_B3 = "Bilangan yang disebut sesudahnya lebih banyak. Jadi lima lebih banyak dari empat.";
const SUARA_B4 = "Itulah cara memakai nama dan lambang bilangan untuk membandingkan benda.";

export const ADEGAN_LUAR_NAMA_TERAPAN: AdeganStory = {
  id: "luar-nama-terapan",
  judul: "Number Names: membandingkan empat dan lima",
  sumber: "Metode luar: Number Names, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah("bandingkan", ...kepala(0)),
      tambah(idx(SUARA_B1, "empat,"), ...kartuAngka("n4", 40, 62, "4", W.krem, 80, 70, 44), teks("nq4", 80, 154, "empat", 14, W.ungu)),
      tambah(idx(SUARA_B1, "lima."), ...kartuAngka("n5", 180, 62, "5", W.krem, 80, 70, 44), teks("nq5", 220, 154, "lima", 14, W.ungu)),
    ),
    k(
      SUARA_B2,
      tambah("urutannya.", { id: "ur", t: "garis", x: 125, y: 97, x2: 50, y2: 0, warna: W.biru, tebal: 2.5 }),
      sorotkan("dulu,", "n4-k"),
      sorotkan("sesudahnya.", "n5-k"),
    ),
    k(SUARA_B3, tambah("Jadi", teks("nt", 200, 188, "5 > 4", 26, W.hijau))),
    k(SUARA_B4, tambah("Itulah", emo("ow", 262, 190, "\u{1F989}", 26)), tambah("membandingkan", ...kartu("nk", 20, 156, 130, 22, W.emas, ["nama dan lambang"], 9.6))),
  ],
};

/* ------------------------------ 4. Ten Frame: konsep ------------------------------ */
const SUARA_C1 = "Metode kedua, Ten Frame, atau Bingkai Sepuluh. Bingkai ini punya sepuluh kotak, dua baris, tiap baris lima kotak.";
const SUARA_C2 = "Sekarang kita isi titik, satu titik untuk satu kotak. Satu, dua, tiga, empat, lima, enam.";
const SUARA_C3 = "Enam titik: lima titik memenuhi baris atas, dan satu titik ada di baris bawah.";
const SUARA_C4 = "Dengan bingkai, kita langsung melihat banyaknya. Kita tidak perlu menghitung satu per satu.";
const posIsi = urutKata(SUARA_C2, ["satu", "dua", "tiga", "empat", "lima", "enam"], "kotak.");

export const ADEGAN_LUAR_BINGKAI: AdeganStory = {
  id: "luar-bingkai",
  judul: "Ten Frame: bingkai sepuluh kotak",
  sumber: "Metode luar: Ten Frame",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah("kedua,", ...kepala(1)),
      tambah("punya", ...bingkai("bk", 85, 62, 0, 26)),
      tambah(idx(SUARA_C1, "sepuluh", 2), teks("b10", 150, 158, "10", 32, W.merah)),
    ),
    k(SUARA_C2, ...posIsi.map((p, i) => tambah(p, ...isiBingkai("bk", 85, 62, i, i + 1, 26)))),
    k(SUARA_C3, tambah("Enam", teks("b6", 250, 100, "6", 36, W.merah)), sorotkan("lima", "bk-t0", "bk-t1", "bk-t2", "bk-t3", "bk-t4")),
    k(SUARA_C4, tambah("melihat", emo("bm", 262, 160, "\u{1F440}", 30)), tambah("perlu", teks("bt", 150, 186, "lihat, jangan hitung", 10, W.ungu))),
  ],
};

/* ------------------------------ 5. Ten Frame: terapan ------------------------------ */
const SUARA_D1 = "Sekarang bingkai untuk enam kursi dan empat balon. Bingkai kursi diisi enam titik, bingkai balon diisi empat titik.";
const SUARA_D2 = "Lihat, bingkai kursi lebih penuh daripada bingkai balon.";
const SUARA_D3 = "Bingkai yang lebih penuh berarti bilangannya lebih banyak. Jadi enam lebih banyak dari empat.";
const SUARA_D4 = "Dua titik terakhir di bingkai kursi adalah sisanya. Pada bingkai balon, dua kotak itu masih kosong.";

export const ADEGAN_LUAR_BINGKAI_TERAPAN: AdeganStory = {
  id: "luar-bingkai-terapan",
  judul: "Ten Frame: bingkai kursi dan balon",
  sumber: "Metode luar: Ten Frame, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_D1,
      tambah("untuk", ...kepala(1)),
      tambah(idx(SUARA_D1, "bingkai"), ...bingkai("bu", 20, 62, 0, 22), ...bingkai("bw", 170, 62, 0, 22)),
      tambah(idx(SUARA_D1, "enam", 2), ...isiBingkai("bu", 20, 62, 0, 6, 22), teks("bz1", 75, 142, "kursi", 10, W.ungu)),
      tambah(idx(SUARA_D1, "empat", 2), ...isiBingkai("bw", 170, 62, 0, 4, 22), teks("bz2", 225, 142, "balon", 10, W.ungu)),
    ),
    k(SUARA_D2, sorotkan("penuh", "bu-t0", "bu-t1", "bu-t2", "bu-t3", "bu-t4", "bu-t5")),
    k(SUARA_D3, tambah("Jadi", ...kartu("bj", 50, 158, 200, 28, W.emas, ["6 lebih banyak dari 4"], 11))),
    k(SUARA_D4, sorotkan("sisanya.", "bu-t4", "bu-t5"), sorotkan("kosong.", "bw-c4", "bw-c5")),
  ],
};
