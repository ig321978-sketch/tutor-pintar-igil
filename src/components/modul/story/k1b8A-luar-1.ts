import type { AdeganStory, Obj } from "./logika-story";
import { EMO_KUCING, OWL, W, bendaDi, emo, goresan, jumlahG, judul, kartu, kartuAngka, namaG, teks, titikBaris } from "./k1b8A-gambar";
import { bersih, gilir, goresAksi, idx, ids, k, pilihKata, redamkan, sorotUrut, sorotkan, tambah } from "./k1b8A-bantu";

export const NAMA_METODE_ID = ["Turus", "Diagram Gambar", "Banding Kategori"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];
export const EMO_BIRU = "\u{1F535}";

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara mengajarkan cara mengelompokkan dan membaca data yang berbeda-beda. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Turus, Diagram Gambar, dan Banding Kategori.";
const SUARA_O3 = "Semua metode ini menjawab satu pertanyaan. Mana yang paling banyak, dan berapa selisihnya?";
const SUARA_O4 = "Kita memakai benda bergambar di layar. Kamu cukup mengetuk dan melihat dengan teliti.";
const SUARA_O5 = "Semua contoh memakai paling banyak sepuluh benda. Siap? Ayo kita mulai dengan metode pertama.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk mengelompokkan data",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)), tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      tambah(idx(SUARA_O2, "Turus,"), ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah(idx(SUARA_O2, "Diagram"), ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah(idx(SUARA_O2, "Banding"), ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah("satu", emo("i1", 60, 84, "⚖️", 34), emo("i2", 150, 84, "❓", 34), emo("i3", 240, 84, "\u{1F440}", 34)),
      tambah("Mana", ...kartu("iq", 20, 112, 260, 52, W.emas, ["mana yang paling banyak,", "dan berapa selisihnya?"], 10)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Alat bantu hari ini")),
      tambah("benda", ...bendaDi("a", EMO_KUCING, titikBaris(3, 100, 100, 50), 26), teks("ea-t", 150, 128, "benda bergambar", 10, W.ungu)),
      tambah("mengetuk", emo("tg", 190, 152, "\u{1F446}", 22)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Sampai sepuluh")),
      tambah("sepuluh", ...kartuAngka("ob", 112, 60, "10", W.emas, 76, 44, 26)),
      tambah("pertama.", emo("ow", 150, 168, OWL, 30)),
    ),
  ],
};

/* ------------------------------ 2. Turus: konsep ------------------------------ */
const YB = 82;
const YT = 126;
const XT = 84;
const ITEM_B = ids("ea", 0, 7);
const SUARA_A1 = "Metode pertama bernama Turus. Kita memakai goresan kecil untuk menghitung, satu benda satu goresan.";
const SUARA_A2 = "Ini kelereng biru. Ketuk satu kelereng, tambah satu goresan. Kita hitung. Satu, dua, tiga, empat.";
const SUARA_A3 = "Goresan kelima miring, memotong empat goresan tadi. Lima.";
const SUARA_A4 = "Teruskan sampai kelereng habis. Enam, tujuh, delapan. Satu kelompok lima, dan tiga goresan lagi.";
const SUARA_A5 = "Sekarang kita baca turusnya. Satu kelompok lima, dan tiga goresan. Jadi kelereng biru ada delapan.";
const SUARA_A6 = "Ucapkan lagi mengikuti suara guru. Satu benda satu goresan, dan goresan kelima miring.";

export const ADEGAN_LUAR_TURUS: AdeganStory = {
  id: "luar-turus",
  judul: "Turus: satu benda satu goresan",
  sumber: "Metode luar: Turus",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_A1,
      tambah("pertama", ...kepala(0)),
      tambah("memakai", namaG("a", YB, "Kelereng biru"), ...bendaDi("a", EMO_BIRU, titikBaris(8, XT, YB, 24)), teks("tt-a", 4, YT - 4, "Turus", 8.6, W.ungu, { anchor: "start" })),
    ),
    k(SUARA_A2, ...goresAksi(SUARA_A2, "a", 4, XT, YT, { setelah: "hitung." }), ...sorotUrut(SUARA_A2, ITEM_B.slice(0, 4), 1, "hitung.")),
    k(SUARA_A3, ...goresAksi(SUARA_A3, "a", 5, XT, YT, { dari: 4, setelah: "tadi." }), redamkan(0, "ea3"), sorotkan(idx(SUARA_A3, "Lima"), "ea4")),
    k(SUARA_A4, ...goresAksi(SUARA_A4, "a", 8, XT, YT, { dari: 5, setelah: "habis." }), redamkan(0, "ea4"), ...sorotUrut(SUARA_A4, ITEM_B.slice(5, 8), 6, "habis.")),
    k(SUARA_A5, redamkan(0, "ea7"), tambah(idx(SUARA_A5, "delapan"), jumlahG("a", YB, "8"))),
    k(SUARA_A6, tambah("Ucapkan", emo("ucap", 262, 190, "\u{1F5E3}", 24))),
  ],
};

/* ------------------------------ 3. Turus: terapan ------------------------------ */
const YK = 76;
const YR = 116;
const SUARA_B1 = "Terapkan pada data baru. Ada turus kucing dan turus burung. Kita baca satu per satu.";
const SUARA_B2 = "Turus kucing: satu kelompok lima, dan empat goresan lagi. Jadi kucing ada sembilan.";
const SUARA_B3 = "Turus burung: satu kelompok lima, dan satu goresan lagi. Jadi burung ada enam.";
const SUARA_B4 = "Pilih: yang mana lebih banyak? Ketuk hewan yang turusnya lebih banyak.";
const SUARA_B5 = "Betul! Kucing lebih banyak tiga dari burung. Tiga adalah selisihnya.";
const tally = (key: string, y: number, n: number): Obj[] => Array.from({ length: n }, (_, i) => goresan(key, i, XT, y));

export const ADEGAN_LUAR_TURUS_TERAPAN: AdeganStory = {
  id: "luar-turus-terapan",
  judul: "Turus: membaca turus kucing dan burung",
  sumber: "Metode luar: Turus, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_B1, tambah("Terapkan", ...kepala(0)), tambah("turus", namaG("a", YK, "Kucing"), ...tally("a", YK, 9), namaG("b", YR, "Burung"), ...tally("b", YR, 6))),
    k(
      SUARA_B2,
      ...gilir(SUARA_B2, [
        ["lima,", ids("ta-g", 0, 4)],
        ["empat", ids("ta-g", 5, 8)],
      ]),
      tambah(idx(SUARA_B2, "sembilan"), jumlahG("a", YK, "9")),
    ),
    k(
      SUARA_B3,
      redamkan(0, ...ids("ta-g", 0, 8)),
      ...gilir(SUARA_B3, [
        ["lima,", ids("tb-g", 0, 4)],
        ["satu", ["tb-g5"], 2],
      ]),
      tambah(idx(SUARA_B3, "enam"), jumlahG("b", YR, "6")),
    ),
    k(SUARA_B4, redamkan(0, ...ids("tb-g", 0, 5)), tambah("Pilih:", ...pilihKata(146, ["Kucing", "Burung"])), sorotkan("Ketuk", "c1-k")),
    k(SUARA_B5, tambah("Betul!", emo("ok", 150, 197, "✅", 20)), tambah("selisihnya.", emo("ow", 262, 197, OWL, 20))),
  ],
};
