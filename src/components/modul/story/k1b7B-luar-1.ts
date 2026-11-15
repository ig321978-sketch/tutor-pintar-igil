import type { AdeganStory, Obj } from "./logika-story";
import { GX, OWL, SATUAN, W, emo, hasil, judul, kartu, kartuAngka, kotak, pilihan, teks, ukur, type Jenis } from "./k1b7B-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ukurAksi } from "./k1b7B-bantu";

export const NAMA_METODE_ID = ["Ulangi Satuan Panjang", "Banding Panjang", "Satuan Tak Baku"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara mengajarkan cara mengukur yang berbeda-beda. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Ulangi Satuan Panjang, Banding Panjang, dan Satuan Tak Baku.";
const SUARA_O3 = "Semua metode ini menjawab satu pertanyaan. Bagaimana mengukur panjang benda dengan benar dan adil?";
const SUARA_O4 = "Kita memakai klip, stik, dan kotak di layar. Kamu cukup melihat dan mengetuk dengan teliti.";
const SUARA_O5 = "Semua ukuran memakai bilangan sampai dua puluh. Siap? Ayo kita mulai dengan metode pertama.";
const SAMPEL: Jenis[] = ["klip", "stik", "kotak"];

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk mengukur panjang",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)), tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      tambah("Ulangi", ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah("Banding", ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah(idx(SUARA_O2, "Satuan", 2), ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah("satu", emo("i1", 60, 84, "\u{1F4CF}", 34), emo("i2", 150, 84, "❓", 34), emo("i3", 240, 84, "\u{1F440}", 34)),
      tambah("Bagaimana", ...kartu("iq", 20, 112, 260, 52, W.emas, ["bagaimana mengukur panjang benda", "dengan benar dan adil?"], 10)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Satuan di layar")),
      ...SAMPEL.map((j, i) => tambah(j === "kotak" ? "kotak" : j, kotak(`sp${i}`, 150 - SATUAN[j].w / 2 + (i - 1) * 90, 84, SATUAN[j].w, SATUAN[j].h, SATUAN[j].warna, W.biru, { rx: 2, tebal: 1.2 }), teks(`spn${i}`, 150 + (i - 1) * 90, 124, j, 10, W.ungu))),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Bilangan sampai dua puluh")),
      ...[7, 9, 12, 15].map((n, i) => tambah(0, ...kartuAngka(`ob${i}`, 20 + i * 66, 50, String(n), [W.krem, W.langit, W.hijauMuda, W.pink][i], 54, 36, 18))),
      tambah("dua", ...kartuAngka("ob4", 124, 100, "20", W.emas, 52, 36, 20)),
      tambah("pertama.", emo("ow", 150, 168, OWL, 30)),
    ),
  ],
};

/* ------------------------------ 2. Ulangi Satuan Panjang: konsep ------------------------------ */
const PITA = ukur("ua", "klip", 6, GX, 60, "pita Upe", W.merahMuda);
const SUARA_A1 = "Metode pertama bernama Ulangi Satuan Panjang. Kita memakai satu satuan, lalu mengulangnya berkali-kali.";
const SUARA_A2 = "Pilih satu klip. Taruh tepat di garis awal.";
const SUARA_A3 = "Ulangi klip yang sama di sebelahnya, rapat. Satu, dua, tiga, empat, lima, enam.";
const SUARA_A4 = "Berhenti di ujung benda. Hitung berapa kali klip itu diulang. Pita ini enam klip.";
const SUARA_A5 = "Karena satuannya sama, hasilnya adil. Ulangi satuan sampai ujung, lalu hitung.";

export const ADEGAN_LUAR_ULANGI: AdeganStory = {
  id: "luar-ulangi",
  judul: "Ulangi Satuan Panjang: ulangi satu satuan",
  sumber: "Metode luar: Ulangi Satuan Panjang",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_A1, tambah("pertama", ...kepala(0)), tambah("Kita", ...PITA.bar, PITA.garisAwal)),
    k(SUARA_A2, tambah("tepat", PITA.unit(0)), tambah("garis", teks("ga", GX, 124, "garis awal", 8.4, W.merah))),
    k(SUARA_A3, hapus(0, "ga"), ...ukurAksi(SUARA_A3, PITA, { setelah: "rapat," })),
    k(SUARA_A4, tambah("Hitung", teks("ul", 150, 150, "diulang sampai ujung", 9.4, W.coklat)), tambah(idx(SUARA_A4, "klip", 2), hasil("ua", "klip", 6, 230, 128, 12))),
    k(SUARA_A5, hapus(0, "tg", "ul"), tambah("Karena", ...kartu("ak", 14, 170, 272, 24, W.emas, ["ulangi satu satuan, lalu hitung"], 9.6))),
  ],
};

/* ------------------------------ 3. Ulangi Satuan Panjang: terapan ------------------------------ */
const IKAN = ukur("ub", "kotak", 9, GX, 60, "ikan Halim", W.pink);
const SUARA_B1 = "Terapkan pada ikan Halim. Kita ulangi kotak satuan dari garis awal.";
const SUARA_B2 = "Hitung kotaknya. Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan.";
const SUARA_B3 = "Berapa panjang ikan itu? Ketuk jawabannya. Delapan, sembilan, atau sepuluh?";
const SUARA_B4 = "Betul! Ikan Halim sembilan kotak. Satuan diulang sampai ujung.";

export const ADEGAN_LUAR_ULANGI_TERAPAN: AdeganStory = {
  id: "luar-ulangi-terapan",
  judul: "Ulangi Satuan Panjang: ikan Halim",
  sumber: "Metode luar: Ulangi Satuan Panjang, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_B1, tambah("Terapkan", ...kepala(0)), tambah("ikan", ...IKAN.bar, IKAN.garisAwal)),
    k(SUARA_B2, ...ukurAksi(SUARA_B2, IKAN, { setelah: "kotaknya." })),
    k(SUARA_B3, hapus(0, "tg"), tambah("Ketuk", ...pilihan(150, ["8", "9", "10"]))),
    k(SUARA_B4, sorotkan("Betul!", "c2-k"), tambah("sembilan", hasil("ub", "kotak", 9, 150, 136, 14))),
  ],
};
