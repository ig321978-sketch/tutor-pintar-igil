import type { AdeganStory, Obj } from "./logika-story";
import { E, W, batang, bulat, emo, garis, judul, kartu, lapak, orang, teks } from "./k1b6A-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k1b6A-bantu";

/* Video metode global Sub-Bab A "Dua Nampan Kue": pembuka dan Bar Model (Model Batang). */

export const NAMA_METODE = ["Bar Model", "Number Line Difference", "Equalizing"];
export const NAMA_METODE_ID = ["Model Batang", "Selisih di Garis Bilangan", "Menyamakan"];
export const WARNA_METODE = [W.langit, W.merahMuda, W.lavender];
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

export const MERAH = "#F87171";
export const KUNING = "#FDE047";
export const HIJAU = "#86EFAC";

/* ------------------------------ 1. Pembuka ------------------------------ */
const SUARA_O1 = "Di lapak sebelah, Pak RT menempelkan selembar kertas lomba dengan tiga cara membandingkan. Igil bertanya, mana yang paling cepat untuk lapak kita?";
const SUARA_O2 = "Tiga metode itu: Bar Model, Number Line Difference, dan Equalizing.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Model Batang, Selisih di Garis Bilangan, dan Menyamakan.";
const SUARA_O4 = "Ketiganya mencari beda banyaknya dua kumpulan.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode global untuk mencari selisih",
  sumber: "Metode global: pembuka",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Lapak sebelah")),
      tambah("lapak", ...lapak("lp", 6, 22, 288, 50)),
      tambah("Pak", ...orang("pk", 40, 124, E.pakRT, "Pak RT")),
      tambah("kertas", emo("kt", 98, 116, E.kertas, 30)),
      tambah("tiga", ...kartu("tg", 130, 104, 100, 24, W.emas, ["3 cara"], 11)),
      tambah("Igil", ...orang("ig", 262, 150, E.igil, "Igil")),
      tambah("cepat", teks("qq", 262, 126, "?", 18, W.merah)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("3 metode global")),
      ...NAMA_METODE.map((m, i) => tambah(["Bar", "Number", "Equalizing"][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      ...NAMA_METODE_ID.map((m, i) => tambah(["Model", "Selisih", "Menyamakan"][i], ...kartu(`n${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Mencari beda banyaknya")),
      tambah("mencari", ...batang("ba", 40, 70, 9, MERAH), ...batang("bb", 40, 96, 6, KUNING)),
      sorotkan("beda", "ba6", "ba7", "ba8"),
      tambah("dua", teks("k2", 215, 90, "2 kumpulan", 10, W.ungu)),
      tambah("kumpulan.", ...kartu("bd", 100, 140, 100, 24, W.emas, ["selisih"], 11)),
    ),
  ],
};

/* ------------------------------ 2. Bar Model: konsep ------------------------------ */
const SUARA_B1 = "Metode pertama, Bar Model, atau Model Batang. Tiap bilangan digambar sebagai satu batang kotak.";
const SUARA_B2 = "Bilangan yang lebih banyak punya batang lebih panjang. Kotak yang melebihi batang pendek adalah selisihnya.";
const SUARA_B3 = "Sejajarkan kedua batang dari kiri, lalu lihat ujung kanannya.";
const SUARA_B4 = "Batang lima belas dan batang sebelas, selisihnya empat kotak.";

export const ADEGAN_LUAR_BATANG: AdeganStory = {
  id: "luar-batang",
  judul: "Bar Model: model batang",
  sumber: "Metode global: Bar Model",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah("pertama,", ...kepala(0)),
      tambah("Tiap", teks("bs", 150, 80, "1 bilangan = 1 batang", 11, W.ungu)),
      tambah("batang@2", ...batang("bt", 80, 100, 7, MERAH), teks("bk", 150, 138, "tiap kotak satu", 9, W.biru)),
    ),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, ...kepala(0)),
      tambah("banyak", ...batang("bp", 40, 70, 10, MERAH), teks("tp", 40, 64, "lebih banyak", 8.4, W.merah, { anchor: "start" })),
      tambah("panjang.", ...batang("bq", 40, 100, 6, KUNING), teks("tq", 40, 94, "lebih sedikit", 8.4, W.coklat, { anchor: "start" })),
      sorotkan("melebihi", "bp6", "bp7", "bp8", "bp9"),
      tambah("selisihnya.", teks("ts", 230, 90, "selisih", 11, W.merah)),
    ),
    k(
      SUARA_B3,
      tambah("kiri,", garis("gk", 40, 62, 0, 62, W.hijau, 2.4, { gambar: true }), teks("kk", 40, 142, "mulai dari kiri", 9, W.hijau, { anchor: "start" })),
      tambah("ujung", bulat("u1", 182, 78, 4, W.merah, W.putih, { tebal: 1.2 }), bulat("u2", 126, 108, 4, W.merah, W.putih, { tebal: 1.2 })),
      tambah("kanannya.", garis("gr", 154, 108, 28, -30, W.hijau, 2, { putus: true })),
    ),
    k(
      SUARA_B4,
      bersih(0),
      tambah(0, ...kepala(0)),
      tambah("lima", ...batang("bp", 40, 60, 15, MERAH), teks("n15", 270, 72, "15", 12, W.merah)),
      tambah("sebelas,", ...batang("bq", 40, 92, 11, KUNING), teks("n11", 210, 104, "11", 12, W.coklat)),
      sorotkan("selisihnya", "bp11", "bp12", "bp13", "bp14"),
      tambah("empat", teks("t4", 256, 100, "4 kotak", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ 3. Bar Model: terapan ------------------------------ */
const SUARA_T1 = "Abang menggambar batang jambu enam belas kotak dan batang mangga sembilan kotak.";
const SUARA_T2 = "Kotak yang melebihi ada tujuh, jadi selisihnya tujuh.";
const SUARA_T3 = "Batang membuat selisih terlihat jelas, bahkan untuk benda yang tidak bisa dipasangkan.";
const SUARA_T4 = "Tetapi menggambar banyak kotak lama, jadi kurang cocok kalau bilangannya besar.";

export const ADEGAN_LUAR_BATANG_TERAPAN: AdeganStory = {
  id: "luar-batang-terapan",
  judul: "Bar Model: jambu dan mangga",
  sumber: "Metode global: Bar Model, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, ...kepala(0)),
      tambah("Abang", ...orang("ab", 24, 168, E.abang, "Abang")),
      tambah("jambu", teks("tj", 34, 64, "jambu", 9, W.hijau, { anchor: "start" })),
      tambah("belas", ...batang("bj", 34, 70, 16, HIJAU), teks("n16", 274, 82, "16", 11, W.hijau)),
      tambah("mangga", teks("tm", 34, 94, "mangga", 9, W.coklat, { anchor: "start" })),
      tambah("sembilan", ...batang("bm", 34, 100, 9, "#FDE68A"), teks("n9", 174, 112, "9", 11, W.coklat)),
    ),
    k(
      SUARA_T2,
      sorotkan("melebihi", "bj9", "bj10", "bj11", "bj12", "bj13", "bj14", "bj15"),
      tambah("tujuh,", teks("s7", 150, 140, "7 kotak melebihi", 11, W.merah)),
      tambah("tujuh@2", ...kartu("sl", 100, 154, 100, 24, W.emas, ["selisih = 7"], 10.4)),
    ),
    k(
      SUARA_T3,
      hapus(0, "s7", "sl-k", "sl-t0"),
      tambah("jelas,", emo("ok", 280, 146, E.benar, 20)),
      tambah("benda", emo("em1", 14, 84, "\u{1F350}", 14), emo("em2", 14, 114, "\u{1F96D}", 14)),
      tambah("tidak", ...kartu("tp", 40, 146, 220, 24, W.merahMuda, ["beda benda, tetap bisa"], 9.4)),
    ),
    k(
      SUARA_T4,
      hapus(0, "tp-k", "tp-t0", "ok"),
      tambah("lama,", emo("jm", 270, 150, E.jam, 22), ...kartu("lm", 40, 146, 200, 24, W.merahMuda, ["banyak kotak: lama"], 9.4)),
      ubah("kurang", ...Array.from({ length: 16 }, (_, i) => ({ id: `bj${i}`, op: 0.55 }))),
      tambah("besar.", emo("ng", 270, 120, E.salah, 20)),
    ),
  ],
};
