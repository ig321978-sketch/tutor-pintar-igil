import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, batang, batangPapan, emo, judul, kartu, kartuAngka, kubus, kubusPapan, labelN, legenda } from "./k2b1B-gambar";
import { bersih, hapus, idBatangRentang, idKubus, idx, k, pilihKata, redamkan, sorotkan, tambah } from "./k2b1B-bantu";

export const NAMA_METODE_ID = ["Balok Dienes", "Kartu Tumpuk", "Garis Bilangan Puluhan"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 24, 288, 20, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara mengajarkan nilai tempat dengan cara yang berbeda-beda. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Balok Dienes, Kartu Tumpuk, dan Garis Bilangan Puluhan.";
const SUARA_O3 = "Semua metode ini menjawab satu pertanyaan. Berapa puluhan dan berapa satuan dalam satu bilangan?";
const SUARA_O4 = "Kita memakai gambar di layar. Kamu cukup mengetuk dan melihat dengan teliti.";
const SUARA_O5 = "Semua contoh memakai bilangan paling besar lima puluh. Siap? Ayo kita mulai dengan metode pertama.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk nilai tempat",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)), tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      tambah(idx(SUARA_O2, "Balok"), ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah(idx(SUARA_O2, "Kartu"), ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah(idx(SUARA_O2, "Garis"), ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah("satu", emo("i1", 60, 84, "\u{1F9F1}", 34), emo("i2", 150, 84, "❓", 34), emo("i3", 240, 84, "\u{1F440}", 34)),
      tambah("Berapa", ...kartu("iq", 20, 112, 260, 52, W.emas, ["berapa puluhan dan", "berapa satuan?"], 10)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Alat bantu hari ini")),
      tambah("gambar", ...kubusPapan("a", 0, 4), ...batangPapan("a", 0)),
      tambah("mengetuk", emo("tg", 150, 150, "\u{1F446}", 26)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Sampai lima puluh")),
      tambah("lima", ...kartuAngka("ob", 112, 60, "50", W.emas, 76, 44, 26)),
      tambah("pertama.", emo("ow", 150, 168, OWL, 30)),
    ),
  ],
};

/* ------------------------------ 2. Balok Dienes: konsep ------------------------------ */
const SUARA_A1 = "Metode pertama bernama Balok Dienes. Satu kubus kecil melambangkan satu satuan.";
const SUARA_A2 = "Satu batang berisi sepuluh kubus kecil. Satu batang melambangkan satu puluhan.";
const SUARA_A3 = "Sekarang kita bentuk dua puluh tiga. Ketuk dua batang dan tiga kubus.";
const SUARA_A4 = "Dua batang berarti dua puluhan. Tiga kubus berarti tiga satuan.";
const SUARA_A5 = "Jadi dua puluh tiga adalah dua puluhan dan tiga satuan.";
const SUARA_A6 = "Dengan balok, kita bisa melihat sepuluh sekaligus sebagai satu batang.";

export const ADEGAN_LUAR_DIENES: AdeganStory = {
  id: "luar-dienes",
  judul: "Balok Dienes: kubus dan batang",
  sumber: "Metode luar: Balok Dienes",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_A1, tambah("pertama", ...kepala(0)), tambah(idx(SUARA_A1, "kubus"), kubus("a", 0, 64, 56)), tambah(idx(SUARA_A1, "melambangkan"), ...kartu("kl", 14, 80, 120, 24, W.langit, ["kubus: 1 satuan"], 10))),
    k(SUARA_A2, tambah(idx(SUARA_A2, "batang"), ...batang("b", 0, 170, 56)), tambah(idx(SUARA_A2, "berisi"), ...legenda()), tambah(idx(SUARA_A2, "melambangkan"), ...kartu("bl", 160, 80, 130, 24, W.hijauMuda, ["batang: 1 puluhan"], 10))),
    k(SUARA_A3, bersih(0), tambah(0, ...kepala(0), ...legenda()), tambah(idx(SUARA_A3, "kita"), labelN("a", 150, 150, "23", 26)), tambah(idx(SUARA_A3, "batang"), ...batangPapan("a", 0), ...batangPapan("a", 1)), tambah(idx(SUARA_A3, "kubus"), ...kubusPapan("a", 0, 2))),
    k(SUARA_A4, sorotkan(idx(SUARA_A4, "Dua"), ...idBatangRentang("a", 0, 1)), redamkan(idx(SUARA_A4, "Tiga"), ...idBatangRentang("a", 0, 1)), sorotkan(idx(SUARA_A4, "Tiga"), ...idKubus("a", 0, 2))),
    k(SUARA_A5, sorotkan(idx(SUARA_A5, "dua", 2), ...idBatangRentang("a", 0, 1)), redamkan(idx(SUARA_A5, "tiga", 2), ...idBatangRentang("a", 0, 1)), sorotkan(idx(SUARA_A5, "tiga", 2), ...idKubus("a", 0, 2)), tambah(idx(SUARA_A5, "satuan."), emo("ok", 262, 150, "✅", 24))),
    k(SUARA_A6, redamkan(0, ...idKubus("a", 0, 2)), hapus(0, "ok"), sorotkan(idx(SUARA_A6, "sepuluh"), ...idBatangRentang("a", 0, 0)), tambah(idx(SUARA_A6, "batang."), emo("lh", 262, 150, "\u{1F4A1}", 24))),
  ],
};

/* ------------------------------ 3. Balok Dienes: terapan ------------------------------ */
const SUARA_B1 = "Terapkan pada bilangan baru. Ada tiga batang dan lima kubus.";
const SUARA_B2 = "Berapa bilangannya? Hitung puluhan dulu, lalu satuan. Ketuk jawaban yang benar.";
const SUARA_B3 = "Betul! Tiga puluhan dan lima satuan membentuk tiga puluh lima.";
const SUARA_B4 = "Sekarang batang yang ketiga kita buka menjadi sepuluh kubus. Nilainya tetap tiga puluh lima.";
const SUARA_B5 = "Hebat! Balok Dienes membantu kita melihat puluhan dan satuan.";

export const ADEGAN_LUAR_DIENES_TERAPAN: AdeganStory = {
  id: "luar-dienes-terapan",
  judul: "Balok Dienes: membaca tiga batang dan lima kubus",
  sumber: "Metode luar: Balok Dienes, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_B1, tambah("Terapkan", ...kepala(0), ...legenda()), tambah(idx(SUARA_B1, "batang"), ...[0, 1, 2].flatMap((i) => batangPapan("a", i))), tambah(idx(SUARA_B1, "kubus"), ...kubusPapan("a", 0, 4))),
    k(SUARA_B2, tambah(idx(SUARA_B2, "Berapa"), ...pilihKata(110, ["25", "35", "45"]))),
    k(SUARA_B3, sorotkan(idx(SUARA_B3, "Betul!"), "c2-k"), tambah(idx(SUARA_B3, "membentuk"), labelN("a", 150, 182, "35", 20))),
    k(
      SUARA_B4,
      redamkan(0, "c2-k"),
      hapus(idx(SUARA_B4, "buka"), ...idBatangRentang("a", 2, 2)),
      tambah(idx(SUARA_B4, "buka"), ...kubusPapan("a", 5, 14)),
      sorotkan(idx(SUARA_B4, "Nilainya"), "n-a"),
    ),
    k(SUARA_B5, redamkan(0, "n-a"), tambah("Hebat!", emo("ok", 262, 182, "✅", 24))),
  ],
};

