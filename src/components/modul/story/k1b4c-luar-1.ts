import type { AdeganStory, Obj } from "./logika-story";
import { E, W, emo, garis, judul, kartu, orang, poligon, segitiga, sikuKananBawah, sikuKiriAtas, tangram, teks, WARNA } from "./k1b4c-gambar";
import { bersih, idx, k, kalimatBertahap, redamkan, sorotkan, tambah, ubah } from "./k1b4c-bantu";

/* Video metode global Sub-Bab C "Mainan untuk Festival": pembuka dan Tangram. */

export const NAMA_METODE = ["Tangram", "Pattern Blocks", "Toothpick Shapes"];
export const NAMA_METODE_ID = ["Tangram", "Balok Pola", "Bentuk dari Lidi"];
export const WARNA_METODE = [W.emas, W.hijauMuda, W.langit];
export const kepala = (i: number): Obj[] =>
  kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [NAMA_METODE[i] === NAMA_METODE_ID[i] ? NAMA_METODE[i] : `${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka ------------------------------ */
const SUARA_O1 = "Sepulang dari festival, juri menitipkan sebuah kotak hadiah. Isinya keping-keping bentuk dari kota lain, dan Abang langsung ingin mencoba menyusun dan mengurai.";
const SUARA_O2 = "Kita lihat tiga metode global: Tangram, Pattern Blocks, dan Toothpick Shapes.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Tangram, Balok Pola, dan Bentuk dari Lidi.";
const SUARA_O4 = "Semua metode mengajak kita menyusun bentuk, mengurai bentuk, lalu menghitung bagiannya.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode global untuk menyusun bentuk",
  sumber: "Metode global: pembuka",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Setelah festival"), emo("tn", 150, 80, E.tenda, 40)),
      tambah("Abang", ...orang("ab", 40, 120, E.abang, "Abang")),
      tambah("kota", emo("gl", 250, 110, E.dunia, 44)),
      tambah("mengurai", ...kartu("pk", 50, 150, 200, 30, W.emas, ["menyusun dan mengurai bentuk"], 10)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("3 metode global")),
      ...NAMA_METODE.map((m, i) => tambah(["Tangram,", "Pattern", "Toothpick"][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [m], 11))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      ...NAMA_METODE_ID.map((m, i) => tambah(["Tangram,", "Balok", "Bentuk"][i], ...kartu(`n${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [m], 11))),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Susun, urai, hitung")),
      tambah("menyusun", ...kartu("a0", 14, 60, 84, 34, W.langit, ["susun"], 11)),
      tambah("mengurai", ...kartu("a1", 108, 60, 84, 34, W.pink, ["urai"], 11)),
      tambah("menghitung", ...kartu("a2", 202, 60, 84, 34, W.hijauMuda, ["hitung"], 11)),
      tambah("bagiannya.", emo("ok", 150, 140, E.benar, 30)),
    ),
  ],
};

/* ------------------------------ 2. Tangram: konsep ------------------------------ */
const SUARA_A4 = "Tangram cocok untuk membuat gambar dari keping yang sudah ada, tetapi kepingnya tetap tujuh, tidak bisa ditambah.";
const SUARA_A1 = "Metode pertama, Tangram. Tangram adalah tujuh keping bentuk yang bisa disusun menjadi banyak gambar.";
const SUARA_A2 = "Ada lima segitiga, satu segi empat, dan satu segi empat miring. Lima tambah dua sama dengan tujuh keping.";
const SUARA_A3 = "Keping bisa diputar dan digeser. Dua segitiga kecil yang digabung menjadi satu segi empat.";

export const ADEGAN_LUAR_TANGRAM: AdeganStory = {
  id: "luar-tangram",
  judul: "Tangram: tujuh keping bentuk",
  sumber: "Metode global: Tangram",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_A1, tambah("pertama,", ...kepala(0)), tambah(idx(SUARA_A1, "tujuh"), ...tangram("tg", 24, 56, 12), teks("n7", 72, 168, "7 keping", 11)), tambah("gambar.", emo("gm", 210, 104, E.lampu, 30))),
    k(
      SUARA_A2,
      { at: 0, hapus: "gm" },
      tambah(idx(SUARA_A2, "lima"), teks("l5", 210, 70, "5 segitiga", 9)),
      sorotkan(idx(SUARA_A2, "lima"), "tg0", "tg1", "tg2", "tg3", "tg4"),
      tambah(idx(SUARA_A2, "satu"), teks("l1", 210, 90, "1 segi empat", 9)),
      { at: idx(SUARA_A2, "satu"), ubah: [...["tg0", "tg1", "tg2", "tg3", "tg4"].map((id) => ({ id, sorot: false })), { id: "tg5", sorot: true }] },
      tambah(idx(SUARA_A2, "satu", 2), teks("l2", 210, 110, "1 segi empat miring", 9)),
      { at: idx(SUARA_A2, "satu", 2), ubah: [{ id: "tg5", sorot: false }, { id: "tg6", sorot: true }] },
      ...kalimatBertahap(SUARA_A2, "kt", 210, 150, ["5", "+", "2", "=", "7"], ["lima", "tambah", "dua", "sama", "tujuh"], "miring.", 16, 18),
      redamkan(idx(SUARA_A2, "tujuh"), "tg6"),
    ),
    k(
      SUARA_A3,
      bersih(0),
      tambah(0, ...kepala(0)),
      tambah("diputar", teks("pg", 150, 66, "putar dan geser", 10, W.ungu)),
      tambah(idx(SUARA_A3, "Dua"), segitiga("sa", 132, 80, sikuKiriAtas(36), WARNA.kuning), segitiga("sb", 152, 100, sikuKananBawah(36), WARNA.ungu), teks("n2", 150, 150, "2 segitiga kecil", 10)),
      ubah("digabung", { id: "sb", x: 132, y: 80 }),
      tambah(idx(SUARA_A3, "satu"), teks("n1", 150, 168, "1 segi empat", 10)),
      sorotkan(idx(SUARA_A3, "empat."), "sa", "sb"),
    ),
    k(
      SUARA_A4,
      bersih(0),
      tambah(0, ...kepala(0)),
      tambah("cocok", emo("bc", 40, 84, "👍", 26), ...kartu("bk", 64, 66, 222, 38, W.hijauMuda, ["cocok: gambar dari keping yang ada"], 9.4)),
      tambah("tetapi", emo("bt", 40, 142, "🔒", 26), ...kartu("bl", 64, 124, 222, 38, W.merahMuda, ["kepingnya tetap 7"], 9.4)),
    ),
  ],
};

/* ------------------------------ 3. Tangram: terapan ------------------------------ */
const SUARA_B1 = "Kaka menyusun perahu dari keping Tangram. Dua segitiga besar menjadi layar perahu.";
const SUARA_B2 = "Satu segi empat miring menjadi badan perahu, dan satu segitiga kecil menjadi bendera.";
const SUARA_B3 = "Kaka mengurai perahunya dan menghitung bagiannya: dua tambah satu tambah satu sama dengan empat keping.";

export const ADEGAN_LUAR_TANGRAM_TERAPAN: AdeganStory = {
  id: "luar-tangram-terapan",
  judul: "Tangram: perahu Kaka",
  sumber: "Metode global: Tangram, terapan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, ...kepala(0), ...orang("kk", 30, 100, E.kaka, "Kaka")),
      tambah("perahu", garis("tp", 151, 62, 0, 70, W.coklat, 2.4, { z: -1 })),
      tambah(idx(SUARA_B1, "Dua"), segitiga("ly0", 148, 64, [{ x: 0, y: 0 }, { x: 0, y: 60 }, { x: -40, y: 60 }], WARNA.merah), segitiga("ly1", 154, 64, [{ x: 0, y: 0 }, { x: 0, y: 60 }, { x: 40, y: 60 }], WARNA.biru)),
      tambah("layar", teks("l2", 252, 70, "2 segitiga besar", 8.6)),
    ),
    k(
      SUARA_B2,
      tambah("Satu", poligon("bd", 100, 132, [{ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 120, y: 22 }, { x: 20, y: 22 }], WARNA.tosca, { tebal: 1.8 }), teks("l1", 252, 90, "1 segi empat miring", 8.6)),
      tambah(idx(SUARA_B2, "satu", 2), segitiga("bn", 153, 50, [{ x: 0, y: 0 }, { x: 16, y: 6 }, { x: 0, y: 12 }], WARNA.kuning), teks("l3", 252, 110, "1 segitiga kecil", 8.6)),
      sorotkan("bendera.", "bn"),
    ),
    k(
      SUARA_B3,
      ubah("mengurai", { id: "ly0", x: 134, sorot: false }, { id: "ly1", x: 168 }, { id: "bd", y: 140 }, { id: "bn", x: 164, sorot: false }, { id: "tp", op: 0 }),
      ...kalimatBertahap(SUARA_B3, "kp", 150, 182, ["2", "+", "1", "+", "1", "=", "4"], ["dua", "tambah", "satu", "tambah", "satu", "sama", "empat"]),
    ),
  ],
};
