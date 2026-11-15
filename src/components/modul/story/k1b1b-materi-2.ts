import type { AdeganStory } from "./logika-story";
import { W, emo, garis, judul, kartu, kelompok, pasang, teks } from "./k1b1b-gambar";
import { bersih, hapus, idx, k, sebar, sorotkan, tambah, ubah, urutKata } from "./k1b1b-bantu";

/* ------------------------------ 1. Kelereng: lebih sedikit ------------------------------ */
const SUARA_S1 = "Kira dan Malosi bermain kelereng. Kira menjajarkan lima kelerengnya. Malosi menjajarkan delapan kelerengnya.";
const SUARA_S2 = "Sekarang kita pasangkan satu per satu. Setiap kelereng Kira dapat satu kelereng Malosi.";
const SUARA_S3 = "Lima kelereng Kira sudah punya pasangan. Kelereng Malosi masih punya sisa.";
const SUARA_S4 = "Sisanya ada tiga kelereng. Satu, dua, tiga.";
const SUARA_S5 = "Kelereng Malosi lebih banyak. Kelereng Kira lebih sedikit, sebab habis lebih dulu.";
const SUARA_S6 = "Jadi lima lebih sedikit dari delapan. Dan delapan lebih banyak dari lima.";
const KIRA = kelompok("kelereng", "kk", 5, 68, 45, 30, 16);
const MALOSI = kelompok("kelereng", "km", 8, 126, 45, 30, 16);
const posGarisS = sebar(SUARA_S2, "Setiap", 5, 1);
const posSisa = urutKata(SUARA_S4, ["satu,", "dua,", "tiga."]);

export const ADEGAN_SEDIKIT: AdeganStory = {
  id: "lebih-sedikit",
  judul: "Kelereng Kira lebih sedikit",
  sumber: "Materi: kelereng Kira dan Malosi",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Kelereng Kira dan Malosi")),
      tambah("lima", teks("nk", 30, 46, "Kira", 9.4, W.ungu, { anchor: "start" }), ...KIRA),
      tambah("delapan", teks("nm", 30, 104, "Malosi", 9.4, W.ungu, { anchor: "start" }), ...MALOSI),
    ),
    k(SUARA_S2, ...posGarisS.map((p, i) => tambah(p, pasang("sg", i, 45 + i * 30, 78, 45 + i * 30, 116)))),
    k(SUARA_S3, sorotkan("sisa.", "km5", "km6", "km7"), tambah("sisa.", ...[5, 6, 7].map((i) => teks(`sz${i - 5}`, 45 + i * 30, 152, "sisa", 9, W.merah)))),
    k(SUARA_S4, ...posSisa.map((p, i) => ubah(p, { id: `sz${i}`, isi: String(i + 1), u: 13 }))),
    k(
      SUARA_S5,
      tambah("Malosi", ...kartu("c1", 10, 164, 135, 26, W.emas, ["Malosi lebih banyak"], 9.4)),
      tambah("Kira", ...kartu("c2", 155, 164, 135, 26, W.langit, ["Kira lebih sedikit"], 9.4)),
    ),
    k(
      SUARA_S6,
      bersih(0),
      tambah(0, judul("Lima dan delapan"), teks("a5", 90, 86, "5", 44, W.merah), teks("a8", 210, 86, "8", 44, W.merah)),
      tambah("sedikit", ...kartu("d1", 30, 112, 240, 30, W.langit, ["5 lebih sedikit dari 8"], 11)),
      tambah("banyak", ...kartu("d2", 30, 152, 240, 30, W.emas, ["8 lebih banyak dari 5"], 11)),
    ),
  ],
};

/* ------------------------------ 2. Jangan tertipu panjang barisan ------------------------------ */
const SUARA_T1 = "Upe punya lima bola yang dirapatkan, sehingga barisannya pendek.";
const SUARA_T2 = "Wei juga punya lima bola, tetapi direnggangkan, sehingga barisannya panjang.";
const SUARA_T3 = "Barisan Wei kelihatan lebih panjang. Apakah bolanya juga lebih banyak?";
const SUARA_T4 = "Mari kita pasangkan bola satu per satu. Setiap bola Upe dapat satu bola Wei.";
const SUARA_T5 = "Semua bola punya pasangan. Tidak ada yang bersisa. Jadi keduanya sama banyak.";
const SUARA_T6 = "Ingat, barisan yang panjang belum tentu lebih banyak. Pasangkan dulu, baru kita tahu pasti.";
const RAPAT = [0, 1, 2, 3, 4].map((i) => 106 + i * 22);
const RENGGANG = [0, 1, 2, 3, 4].map((i) => 40 + i * 55);
const posGarisT = sebar(SUARA_T4, "Setiap", 5, 1);

export const ADEGAN_TERTIPU: AdeganStory = {
  id: "tertipu",
  judul: "Jangan tertipu panjang barisan",
  sumber: "Materi: panjang barisan dan banyak",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_T1, tambah(0, judul("Jangan tertipu barisan")), tambah("lima", teks("nu", 14, 44, "Upe", 9.4, W.ungu, { anchor: "start" }), ...kelompok("bola", "ub", 5, 66, 106, 22, 9))),
    k(SUARA_T2, tambah("lima", teks("nw", 14, 102, "Wei", 9.4, W.ungu, { anchor: "start" }), ...kelompok("bola", "wb", 5, 126, 40, 55, 9))),
    k(SUARA_T3, sorotkan("panjang.", "wb0", "wb1", "wb2", "wb3", "wb4"), tambah("Apakah", emo("tq", 150, 178, "\u{2753}", 30))),
    k(SUARA_T4, ...posGarisT.map((p, i) => tambah(p, pasang("tg", i, RAPAT[i], 77, RENGGANG[i], 115)))),
    k(
      SUARA_T5,
      hapus(0, "tq"),
      sorotkan("Semua", "ub0", "ub1", "ub2", "ub3", "ub4"),
      tambah("sama", ...kartu("ts", 70, 154, 160, 28, W.emas, ["Sama banyak"], 12)),
    ),
    k(
      SUARA_T6,
      bersih(0),
      tambah(0, judul("Ingat!"), emo("ow", 150, 76, "\u{1F989}", 44)),
      tambah("panjang", ...kartu("ti", 40, 104, 220, 40, W.hijauMuda, ["panjang barisan", "belum tentu banyak"], 10.5)),
    ),
  ],
};

/* ------------------------------ 3. Tanda lebih besar ------------------------------ */
const SUARA_TB1 = "Sekarang kita belajar tanda. Tanda dipakai untuk menunjukkan mana yang lebih banyak. Bayangkan seekor buaya yang lapar.";
const SUARA_TB2 = "Buaya lapar selalu membuka mulutnya ke kelompok yang lebih banyak. Dia ingin makan yang banyak.";
const SUARA_TB3 = "Tujuh lebih banyak dari empat. Jadi mulut buaya terbuka ke arah tujuh.";
const SUARA_TB4 = "Tanda ini disebut lebih besar. Cara membacanya, tujuh lebih besar dari empat.";
const SUARA_TB5 = "Sekarang lima dan empat. Lima lebih banyak, jadi mulut buaya terbuka ke arah lima. Mudah, bukan?";

export const ADEGAN_TANDA_BANYAK: AdeganStory = {
  id: "tanda-banyak",
  judul: "Tanda lebih besar: mulut buaya",
  sumber: "Materi: tanda lebih besar",
  latar: "#ECFDF5",
  ketukan: [
    k(SUARA_TB1, tambah(0, judul("Tanda mulut buaya")), tambah("buaya", emo("bu", 150, 112, "\u{1F40A}", 60))),
    k(
      SUARA_TB2,
      ubah(0, { id: "bu", y: 60, u: 32 }),
      tambah("kelompok", teks("t7", 80, 128, "7", 48, W.merah)),
      tambah(idx(SUARA_TB2, "banyak.", 1), teks("t4", 220, 128, "4", 48, W.merah)),
    ),
    k(SUARA_TB3, tambah("terbuka", teks("tn", 150, 128, ">", 48, W.hijau)), sorotkan(idx(SUARA_TB3, "tujuh", 2), "t7")),
    k(SUARA_TB4, tambah("membacanya,", ...kartu("tk", 40, 150, 220, 28, W.emas, ["7 lebih besar dari 4"], 11))),
    k(
      SUARA_TB5,
      bersih(0),
      tambah(0, judul("Lima dan empat")),
      tambah("lima", teks("u5", 80, 100, "5", 48, W.merah)),
      tambah(idx(SUARA_TB5, "empat.", 1), teks("u4", 220, 100, "4", 48, W.merah)),
      tambah("terbuka", teks("un", 150, 100, ">", 48, W.hijau), emo("ub", 150, 160, "\u{1F40A}", 40)),
    ),
  ],
};

/* ------------------------------ 4. Tanda lebih kecil ------------------------------ */
const SUARA_TS1 = "Sekarang tanda yang kedua. Buaya lapar tetap membuka mulutnya ke kelompok yang lebih banyak.";
const SUARA_TS2 = "Kita punya empat dan delapan. Delapan lebih banyak, jadi mulut buaya terbuka ke arah delapan.";
const SUARA_TS3 = "Tanda ini disebut lebih kecil. Cara membacanya, empat lebih kecil dari delapan.";
const SUARA_TS4 = "Perhatikan ujung tanda yang runcing. Ujung runcing selalu menunjuk ke kelompok yang lebih sedikit, yaitu empat.";
const SUARA_TS5 = "Tanda ini tidak pernah salah arah. Mulutnya selalu menghadap ke yang lebih banyak.";

export const ADEGAN_TANDA_SEDIKIT: AdeganStory = {
  id: "tanda-sedikit",
  judul: "Tanda lebih kecil: ujung runcing",
  sumber: "Materi: tanda lebih kecil",
  latar: "#FDF4FF",
  ketukan: [
    k(SUARA_TS1, tambah(0, judul("Tanda yang kedua"), emo("bu", 150, 112, "\u{1F40A}", 56))),
    k(
      SUARA_TS2,
      ubah(0, { id: "bu", y: 60, u: 32 }),
      tambah("empat", teks("s4", 80, 128, "4", 48, W.merah)),
      tambah(idx(SUARA_TS2, "delapan.", 1), teks("s8", 220, 128, "8", 48, W.merah)),
      tambah("terbuka", teks("sn", 150, 128, "<", 48, W.hijau)),
    ),
    k(SUARA_TS3, tambah("membacanya,", ...kartu("sk", 40, 150, 220, 28, W.emas, ["4 lebih kecil dari 8"], 11))),
    k(
      SUARA_TS4,
      hapus(0, "sk-k", "sk-t0"),
      sorotkan("runcing.", "sn"),
      sorotkan("sedikit,", "s4"),
      tambah("runcing", ...kartu("sr", 40, 150, 220, 28, W.langit, ["ujung runcing: lebih sedikit"], 10)),
    ),
    k(
      SUARA_TS5,
      bersih(0),
      tambah(0, judul("Selalu ke yang banyak"), teks("e1", 80, 84, "7 > 4", 32, W.hijau)),
      tambah("selalu", teks("e2", 220, 84, "4 < 8", 32, W.hijau)),
      tambah("menghadap", emo("ow", 150, 150, "\u{1F989}", 44)),
    ),
  ],
};

/* ------------------------------ 5. Tanda sama dengan ------------------------------ */
const SUARA_TM1 = "Bagaimana kalau kedua kelompok sama banyak? Misalnya enam dan enam. Buaya tidak perlu membuka mulutnya.";
const SUARA_TM2 = "Kita pakai tanda sama dengan. Tandanya dua garis yang sama panjang.";
const SUARA_TM3 = "Enam sama banyak dengan enam. Semua benda punya pasangan, dan tidak ada yang bersisa.";
const SUARA_TM4 = "Satu hal lagi. Sepasang bilangan bisa ditulis dengan dua cara. Lima lebih besar dari empat, dan empat lebih kecil dari lima.";
const SUARA_TM5 = "Sekarang kita punya tiga tanda: lebih besar, lebih kecil, dan sama dengan. Ayo kita ingat selalu.";

export const ADEGAN_TANDA_SAMA: AdeganStory = {
  id: "tanda-sama",
  judul: "Tanda sama dengan",
  sumber: "Materi: tanda sama dengan",
  latar: "#F0FDFA",
  ketukan: [
    k(
      SUARA_TM1,
      tambah(0, judul("Sama banyak")),
      tambah(idx(SUARA_TM1, "enam", 1), teks("m6", 80, 120, "6", 48, W.merah)),
      tambah(idx(SUARA_TM1, "enam", 2), teks("m6b", 220, 120, "6", 48, W.merah)),
      tambah("Buaya", emo("bu", 150, 64, "\u{1F40A}", 30)),
    ),
    k(SUARA_TM2, tambah("garis", garis("ma", 128, 106, 44, 0, W.hijau, 5), garis("mb", 128, 124, 44, 0, W.hijau, 5))),
    k(SUARA_TM3, sorotkan("pasangan,", "m6", "m6b"), tambah("pasangan,", ...kartu("ms", 80, 150, 140, 26, W.emas, ["Sama banyak"], 11))),
    k(
      SUARA_TM4,
      bersih(0),
      tambah(0, judul("Dua cara menulis")),
      tambah("Lima", teks("w1", 150, 80, "5 > 4", 34, W.hijau)),
      tambah(idx(SUARA_TM4, "empat", 2), teks("w2", 150, 140, "4 < 5", 34, W.hijau)),
    ),
    k(
      SUARA_TM5,
      bersih(0),
      tambah(0, judul("Tiga tanda")),
      tambah("besar,", ...kartu("x1", 20, 34, 260, 38, W.hijauMuda, ["> lebih banyak"], 12)),
      tambah("kecil,", ...kartu("x2", 20, 82, 260, 38, W.pink, ["< lebih sedikit"], 12)),
      tambah("dengan.", ...kartu("x3", 20, 130, 260, 38, W.krem, ["= sama banyak"], 12)),
    ),
  ],
};
