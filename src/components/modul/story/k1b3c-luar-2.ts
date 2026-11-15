import type { AdeganStory, Obj } from "./logika-story";
import { W, bingkai, bulat, emo, judul, kartu, kotak, teks, titikBingkai } from "./k1b3c-gambar";
import { bersih, hapus, hitungMuncul, k, redamkan, sorotkan, tambah, ubah, urutKata } from "./k1b3c-bantu";
import { NAMA_METODE, WARNA_METODE, kepala } from "./k1b3c-luar-1";

const IGIL = "\u{1F989}";
const BX = 85;
const BY = 66;
const titik = (i: number) => titikBingkai(BX, BY, i);
const merah = (i: number): Obj => bulat(`bm${i}`, titik(i).x, titik(i).y, 8.3, W.merah, W.merah, { tebal: 1 });

/* ------------------------------ 1. Kurang di Bingkai: konsep ------------------------------ */
const SUARA_G1 = "Cara ketiga, Kurang di Bingkai. Bingkai sepuluh punya sepuluh petak. Sekarang ada tujuh titik di bingkai.";
const SUARA_G2 = "Ketuk tiga titik supaya dikosongkan. Satu, dua, tiga.";
const SUARA_G3 = "Tinggal empat titik di bingkai. Tujuh kurang tiga sama dengan empat.";
const SUARA_G4 = "Ketuk tiga petak kosong untuk mengisinya lagi. Satu, dua, tiga. Empat tambah tiga sama dengan tujuh.";
const posG2 = urutKata(SUARA_G2, ["satu", "dua", "tiga"], "dikosongkan.");

export const ADEGAN_LUAR_BINGKAI: AdeganStory = {
  id: "luar-bingkai",
  judul: "Kurang di Bingkai: kosongkan titik",
  sumber: "Metode luar: Kurang di Bingkai",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_G1,
      tambah("ketiga,", ...kepala(2)),
      tambah("Bingkai@2", ...bingkai("bf", BX, BY, 0)),
      tambah("petak.", teks("tp", 150, 148, "10 petak", 12, W.merah)),
      tambah("tujuh", ...[0, 1, 2, 3, 4, 5, 6].map(merah)),
    ),
    k(SUARA_G2, ...[6, 5, 4].map((v, i) => hapus(posG2[i], `bm${v}`))),
    k(SUARA_G3, tambah("Tujuh", ...kartu("bj", 80, 164, 140, 28, W.emas, ["7 − 3 = 4"], 13))),
    k(SUARA_G4, hapus(0, "bj-k", "bj-t0"), ...hitungMuncul(SUARA_G4, "bt", [4, 5, 6].map(titik), (i) => merah(i + 4), "lagi.", false), tambah("Empat", ...kartu("bk", 80, 164, 140, 28, W.emas, ["4 + 3 = 7"], 13))),
  ],
};

/* ------------------------------ 2. Kurang di Bingkai: terapan ------------------------------ */
const SUARA_H1 = "Soal cerita: Wei punya delapan jeruk di bingkai. Lima jeruk dimakan. Tinggal berapa jeruk?";
const SUARA_H2 = "Ketuk lima jeruk yang dimakan. Satu, dua, tiga, empat, lima.";
const SUARA_H3 = "Tinggal tiga jeruk. Delapan kurang lima sama dengan tiga.";
const SUARA_H4 = "Periksa dengan kebalikan. Isi lagi lima petak: satu, dua, tiga, empat, lima. Tiga tambah lima sama dengan delapan.";
const posH2 = urutKata(SUARA_H2, ["satu", "dua", "tiga", "empat", "lima"], "dimakan.");

export const ADEGAN_LUAR_BINGKAI_TERAPAN: AdeganStory = {
  id: "luar-bingkai-terapan",
  judul: "Kurang di Bingkai: jeruk Wei",
  sumber: "Metode luar: Kurang di Bingkai, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, ...kepala(2), ...bingkai("bf", BX, BY, 0)),
      tambah("delapan", ...[0, 1, 2, 3, 4, 5, 6, 7].map(merah)),
      tambah("jeruk@2", emo("je", 150, 172, "\u{1F34A}", 26)),
      tambah("berapa", emo("tn", 268, 172, "\u{2753}", 26)),
    ),
    k(SUARA_H2, ...[7, 6, 5, 4, 3].map((v, i) => hapus(posH2[i], `bm${v}`))),
    k(SUARA_H3, hapus(0, "tn"), tambah("Delapan", ...kartu("bj", 80, 150, 140, 28, W.emas, ["8 − 5 = 3"], 13))),
    k(SUARA_H4, hapus(0, "bj-k", "bj-t0"), ...hitungMuncul(SUARA_H4, "bt", [3, 4, 5, 6, 7].map(titik), (i) => merah(i + 3), "petak:", false), tambah(12, ...kartu("bk", 80, 150, 140, 28, W.emas, ["3 + 5 = 8"], 13)), tambah("delapan.", emo("ok", 262, 164, "\u{2705}", 26))),
  ],
};

/* ------------------------------ 3. Ringkasan tiga metode ------------------------------ */
const SUARA_R1 = "Mari kita ringkas tiga cara dari luar tadi.";
const SUARA_R2 = "Mengambil: ketuk benda yang diambil. Hitung Mundur: mundur di deretan bilangan.";
const SUARA_R3 = "Kurang di Bingkai: kosongkan titik di bingkai. Ketiganya menunjukkan bahwa pengurangan dan penjumlahan saling berkebalikan.";
const SUARA_R4 = "Terima kasih sudah belajar. Teruslah berlatih di layar, ya. Sampai jumpa!";
const DESKRIPSI = ["ketuk benda yang diambil", "mundur di deretan bilangan", "kosongkan titik di bingkai"];
const kartuMetode = (i: number): Obj[] => [kotak(`rm${i}-k`, 14, 34 + i * 54, 272, 46, WARNA_METODE[i], W.biru, { rx: 8, tebal: 1.5 }), teks(`rm${i}-n`, 150, 34 + i * 54 + 19, NAMA_METODE[i], 10, W.biru)];
const deskripsi = (i: number): Obj => teks(`rm${i}-d`, 150, 34 + i * 54 + 36, DESKRIPSI[i], 8.8, W.merah);

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Ringkasan metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Ringkasan")), tambah("ringkas", ...kartuMetode(0)), tambah("tiga", ...kartuMetode(1)), tambah("luar", ...kartuMetode(2))),
    k(SUARA_R2, sorotkan("Mengambil:", "rm0-k"), tambah("ketuk", deskripsi(0)), redamkan("Hitung", "rm0-k"), sorotkan("Hitung", "rm1-k"), tambah("mundur@2", deskripsi(1))),
    k(SUARA_R3, redamkan(0, "rm1-k"), sorotkan("Kurang", "rm2-k"), tambah("kosongkan", deskripsi(2)), ubah("Ketiganya", { id: "jud", isi: "Tambah dan kurang berkebalikan" })),
    k(SUARA_R4, bersih(0), tambah(0, judul("Terima kasih"), emo("ow", 150, 100, IGIL, 54)), tambah("layar,", ...kartu("rz", 40, 124, 220, 34, W.emas, ["tambah dan kurang"], 11)), tambah("Sampai", teks("rt", 150, 184, "Sampai jumpa!", 12, W.ungu))),
  ],
};
