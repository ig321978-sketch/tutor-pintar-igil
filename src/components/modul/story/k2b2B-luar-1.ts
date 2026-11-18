import type { AdeganStory, Obj } from "./logika-story";
import { E, W, WK, buSari, emo, jalurBilangan, judul, kartu, lantai, poster, rak, teks, tokoh, panah } from "./k2b2B-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k2b2B-bantu";

/* Video metode global Sub-Bab B "Rak Seragam Diserbu": pembuka, Think Addition (Berpikir Penjumlahan), dan terapannya. */

export const NAMA_METODE = ["Think Addition", "Fact Family", "Subtract from Ten"];
export const NAMA_METODE_ID = ["Berpikir Penjumlahan", "Keluarga Bilangan", "Kurangi dari Sepuluh"];
export const WARNA_METODE = [W.hijauMuda, W.krem, W.pink];
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka ------------------------------ */
const SUARA_O1 = "Ketika Chacha menggeser rak seragam, sehelai poster tua jatuh dari belakangnya.";
const SUARA_O2 = "Bu Sari membacanya dengan mata berbinar. Itu poster cara mengurangi dari koperasi zaman dulu!";
const SUARA_O3 = "Tiga cara itu: Think Addition, Fact Family, dan Subtract from Ten.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Berpikir Penjumlahan, Keluarga Bilangan, dan Kurangi dari Sepuluh.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Poster tua di belakang rak",
  sumber: "Metode global: pembuka",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Poster di belakang rak"), lantai("tn", 150), ...rak("rk", 20, 36, 130, 108)),
      tambah("Chacha", ...tokoh("ch", 210, 150, E.chacha, "Chacha")),
      ubah("menggeser", { id: "rk", x: 34 }, { id: "rk-a", x: 34 }, { id: "rk-b", x: 34 }),
      tambah("poster", ...poster("po", 24, 60, 30, 44)),
      ubah("jatuh", { id: "po", x: 64, y: 104 }, { id: "po-l", x: 84, y: 104 }),
    ),
    k(
      SUARA_O2,
      hapus(0, "rk", "rk-a", "rk-b"),
      tambah("Bu", ...buSari("bs", 250, 150)),
      ubah("membacanya", { id: "po", x: 100, y: 44, w: 84, h: 96 }, { id: "po-l", x: 174, y: 44 }),
      tambah("mata", emo("mt", 214, 120, E.mata, 22)),
      tambah("cara", teks("p1", 142, 84, "cara", 11, W.coklat), teks("p2", 142, 100, "mengurangi", 9.2, W.coklat)),
      tambah("zaman", teks("p3", 142, 122, "zaman dulu", 8.4, W.coklat)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("3 metode global")),
      tambah("Think", ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], ["1. Think Addition"], 11)),
      tambah("Fact", ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], ["2. Fact Family"], 11)),
      tambah("Subtract", ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], ["3. Subtract from Ten"], 11)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      tambah("Berpikir", ...kartu("n0", 20, 40, 260, 38, WARNA_METODE[0], ["1. Berpikir Penjumlahan"], 11)),
      tambah("Keluarga", ...kartu("n1", 20, 88, 260, 38, WARNA_METODE[1], ["2. Keluarga Bilangan"], 11)),
      tambah("Kurangi", ...kartu("n2", 20, 136, 260, 38, WARNA_METODE[2], ["3. Kurangi dari Sepuluh"], 11)),
      tambah("Sepuluh.", teks("n10", 258, 160, "10", 14, W.merah)),
    ),
  ],
};

/* ------------------------------ 2. Think Addition: konsep ------------------------------ */
const SUARA_B1 = "Cara pertama, Think Addition, atau Berpikir Penjumlahan.";
const SUARA_B2 = "Ubah pengurangan menjadi pertanyaan penjumlahan: bilangan apa yang harus ditambahkan?";
const SUARA_B3 = "Kita mulai dari bilangan yang dikurangkan, lalu mencari tambahannya sampai bilangan awal.";
const SUARA_B4 = "Ini seperti memeriksa hasil, tetapi dilakukan sejak awal.";

export const ADEGAN_LUAR_PIKIR: AdeganStory = {
  id: "luar-pikir",
  judul: "Think Addition: berpikir penjumlahan",
  sumber: "Metode global: Think Addition",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, ...kepala(0)),
      tambah("Think", ...kartu("ep", 30, 70, 240, 40, W.krem, ["Think Addition"], 14)),
      tambah("Berpikir", ...kartu("bp", 30, 124, 240, 40, W.putih, ["Berpikir Penjumlahan"], 14)),
    ),
    k(
      SUARA_B2,
      hapus(0, "ep-k", "ep-t0", "bp-k", "bp-t0"),
      tambah("pengurangan", ...kartu("u1", 24, 70, 112, 36, W.merahMuda, ["besar − kecil = ?"], 9.2)),
      tambah("penjumlahan:", emo("pn", 150, 96, E.tukar, 22), ...kartu("u2", 164, 70, 112, 36, W.hijauMuda, ["kecil + ? = besar"], 9.2)),
      tambah("bilangan", emo("tq", 220, 130, E.tanya, 26)),
      sorotkan("ditambahkan?", "u2-k"),
    ),
    k(
      SUARA_B3,
      hapus(0, "u1-k", "u1-t0", "u2-k", "u2-t0", "pn", "tq"),
      tambah("Kita", ...kartu("w1", 14, 78, 80, 34, WK.satuan, ["kecil"], 11)),
      tambah("dikurangkan,", panah("a1", 96, 95, 118, 95, W.merah)),
      tambah("mencari", ...kartu("w2", 120, 78, 60, 34, W.krem, ["?"], 14)),
      tambah("tambahannya", panah("a2", 182, 95, 204, 95, W.merah)),
      tambah("awal.", ...kartu("w3", 206, 78, 80, 34, WK.puluhan, ["besar"], 11)),
    ),
    k(
      SUARA_B4,
      tambah("seperti", emo("kc", 150, 144, E.kaca, 28)),
      tambah("hasil,", emo("ok", 60, 144, E.benar, 24)),
      tambah("awal.", emo("lp", 240, 144, E.lampu, 24)),
    ),
  ],
};

/* ------------------------------ 3. Think Addition: terapan ------------------------------ */
const SUARA_Q1 = "Nia menghitung lima belas dikurangi sembilan. Ia berpikir, sembilan ditambah berapa sama dengan lima belas?";
const SUARA_Q2 = "Sembilan ditambah enam sama dengan lima belas, jadi hasilnya enam.";
const SUARA_Q3 = "Cocok kalau kedua bilangannya berdekatan, karena tambahannya kecil.";
const SUARA_Q4 = "Kurang cocok kalau selisihnya besar, karena mencari tambahannya jadi lama.";

const JX = (n: number): number => 36 + (n - 9) * 36;

export const ADEGAN_LUAR_PIKIR_TERAPAN: AdeganStory = {
  id: "luar-pikir-terapan",
  judul: "Berpikir penjumlahan: terapan",
  sumber: "Metode global: Think Addition (terapan)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, ...kepala(0), lantai("tn", 150), ...tokoh("ni", 30, 184, E.nia, "Nia")),
      tambah("lima", teks("q1", 150, 76, "15", 24, W.merah)),
      ubah("dikurangi", { id: "q1", isi: "15 −" }),
      ubah("sembilan", { id: "q1", isi: "15 − 9" }),
      tambah("berpikir,", emo("pk", 262, 108, E.pikir, 26)),
      tambah("sembilan@2", teks("q2", 150, 128, "9", 24, W.biru)),
      ubah("ditambah", { id: "q2", isi: "9 +" }),
      ubah("berapa", { id: "q2", isi: "9 + ?" }),
      ubah("lima@2", { id: "q2", isi: "9 + ? = 15" }),
    ),
    k(
      SUARA_Q2,
      hapus(0, "q1", "q2", "pk"),
      tambah(0, ...jalurBilangan("jb", 120, 9, 15, 36, 252)),
      tambah("Sembilan", teks("r1", 150, 62, "9", 22, W.biru)),
      ubah("ditambah", { id: "r1", isi: "9 +" }),
      ubah("enam", { id: "r1", isi: "9 + 6" }),
      tambah("enam", panah("hp", JX(9) + 3, 100, JX(15) - 3, 100, W.merah), teks("h6", 144, 94, "+6", 10, W.merah)),
      ubah("sama", { id: "r1", isi: "9 + 6 =" }),
      ubah("lima", { id: "r1", isi: "9 + 6 = 15" }),
      sorotkan("lima", "jb-q15"),
      tambah("hasilnya", teks("r2", 150, 168, "15 − 9 = 6", 18, W.merah)),
    ),
    k(
      SUARA_Q3,
      hapus(0, "r1", "h6", "r2"),
      tambah("Cocok", emo("ok", 262, 72, E.benar, 26)),
      sorotkan("berdekatan,", "jb-q9", "jb-q15"),
      tambah("tambahannya", ...kartu("c6", 100, 156, 100, 22, W.hijauMuda, ["tambahan kecil"], 9.6)),
    ),
    k(
      SUARA_Q4,
      hapus(0, "ok", "c6-k", "c6-t0"),
      tambah("Kurang", emo("sl", 262, 72, E.salah, 26)),
      tambah("selisihnya", ...kartu("b1", 20, 152, 80, 28, W.merahMuda, ["3"], 14), ...kartu("b2", 200, 152, 80, 28, W.merahMuda, ["19"], 14)),
      tambah("besar,", panah("lp", 104, 166, 196, 166, W.merah)),
      tambah("lama.", emo("jm", 150, 190, "\u{23F3}", 20)),
    ),
  ],
};
