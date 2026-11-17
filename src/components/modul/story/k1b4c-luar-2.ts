import type { AdeganStory } from "./logika-story";
import { E, KURANG, W, bentukLidi, bulat, emo, geserLidi, judul, kartu, lidi, orang, poligon, segiEmpat, segitiga, teks, WARNA, type Titik } from "./k1b4c-gambar";
import { bersih, hapus, idx, k, kalimatBertahap, redamkan, sorotkan, tambah, ubah } from "./k1b4c-bantu";
import { WARNA_METODE, kepala } from "./k1b4c-luar-1";

/* Video metode global Sub-Bab C: Pattern Blocks (Balok Pola), Toothpick Shapes (Bentuk dari Lidi), dan ringkasan. */

/* ------------------------------ 4. Pattern Blocks: konsep ------------------------------ */
const SUARA_C4 = "Balok Pola cocok untuk gambar berwarna yang cepat dibuat, tetapi bentuk baloknya hanya beberapa macam.";
const SUARA_C1 = "Metode kedua, Pattern Blocks, atau Balok Pola. Balok pola adalah keping bentuk berwarna yang ditempel menjadi gambar.";
const SUARA_C2 = "Setiap warna punya bentuk sendiri: segitiga hijau, segi empat oranye, dan segi empat miring biru.";
const SUARA_C3 = "Setelah gambar jadi, sebut nama bentuknya, lalu hitung banyak baloknya.";

export const ADEGAN_LUAR_BALOK: AdeganStory = {
  id: "luar-balok",
  judul: "Pattern Blocks: balok pola",
  sumber: "Metode global: Pattern Blocks",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_C1,
      tambah("kedua,", ...kepala(1)),
      tambah("keping", segitiga("pb0", 60, 70, [{ x: 0, y: 0 }, { x: 24, y: 40 }, { x: -24, y: 40 }], WARNA.hijau), segiEmpat("pb1", 128, 70, 40, 40, WARNA.oranye)),
      tambah("ditempel", poligon("pb2", 210, 70, [{ x: 10, y: 0 }, { x: 60, y: 0 }, { x: 50, y: 40 }, { x: 0, y: 40 }], WARNA.biru)),
    ),
    k(
      SUARA_C2,
      tambah("hijau,", teks("w0", 60, 128, "segitiga hijau", 8)),
      sorotkan("hijau,", "pb0"),
      tambah("oranye,", teks("w1", 148, 128, "segi empat oranye", 8)),
      sorotkan("oranye,", "pb1"),
      tambah("biru.", teks("w2", 240, 128, "segi empat miring biru", 8)),
      sorotkan("biru.", "pb2"),
    ),
    k(
      SUARA_C3,
      redamkan(0, "pb0", "pb1", "pb2"),
      tambah("sebut", ...kartu("s1", 14, 150, 130, 30, W.putih, ["sebut nama"], 10)),
      tambah("hitung", ...kartu("s2", 156, 150, 130, 30, W.putih, ["hitung banyak"], 10)),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, ...kepala(1)),
      tambah("cocok", emo("bc", 40, 84, "👍", 26), ...kartu("bk", 64, 66, 222, 38, W.hijauMuda, ["cocok: gambar cepat dan berwarna"], 9.4)),
      tambah("tetapi", emo("bt", 40, 142, "🤔", 26), ...kartu("bl", 64, 124, 222, 38, W.merahMuda, ["bentuk baloknya sedikit"], 9.4)),
    ),
  ],
};

/* ------------------------------ 5. Pattern Blocks: terapan ------------------------------ */
const SUARA_D1 = "Igil menempel balok pola menjadi pohon. Tiga segitiga hijau menjadi daun.";
const SUARA_D2 = "Dua segi empat oranye disusun menjadi batang pohon.";
const SUARA_D3 = "Igil menghitung: tiga tambah dua sama dengan lima balok. Pohonnya tersusun dari lima bagian.";
const SUARA_D4 = "Lalu Igil mengurai pohonnya. Daun dan batang terpisah lagi menjadi lima balok.";
const DAUN = [54, 72, 90];
const daunPts: Titik[] = [{ x: 0, y: 0 }, { x: 30, y: 30 }, { x: -30, y: 30 }];

export const ADEGAN_LUAR_BALOK_TERAPAN: AdeganStory = {
  id: "luar-balok-terapan",
  judul: "Pattern Blocks: pohon Igil",
  sumber: "Metode global: Pattern Blocks, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, ...kepala(1), ...orang("ig", 36, 110, E.igil, "Igil")),
      tambah(idx(SUARA_D1, "Tiga"), ...DAUN.map((y, i) => segitiga(`dn${i}`, 130, y, daunPts, WARNA.hijau)), teks("n3", 240, 80, "3 segitiga", 10)),
      sorotkan("daun.", "dn0", "dn1", "dn2"),
    ),
    k(
      SUARA_D2,
      redamkan(0, "dn0", "dn1", "dn2"),
      tambah("Dua", segiEmpat("bt0", 120, 120, 20, 20, WARNA.oranye), segiEmpat("bt1", 120, 140, 20, 20, WARNA.oranye), teks("n2", 240, 130, "2 segi empat", 10)),
      sorotkan("batang", "bt0", "bt1"),
    ),
    k(
      SUARA_D3,
      redamkan(0, "bt0", "bt1"),
      ...kalimatBertahap(SUARA_D3, "kb", 150, 184, ["3", "+", "2", "=", "5"], ["tiga", "tambah", "dua", "sama", "lima"]),
      sorotkan(idx(SUARA_D3, "lima", 2), "kb4"),
    ),
    k(
      SUARA_D4,
      ubah("mengurai", { id: "dn0", x: 100, y: 52 }, { id: "dn1", x: 160, y: 60 }, { id: "dn2", x: 196, y: 92 }, { id: "bt0", x: 84, y: 128 }, { id: "bt1", x: 168, y: 138 }, { id: "kb4", sorot: false }),
      tambah("terpisah", teks("n5", 240, 160, "5 balok", 10, W.ungu)),
    ),
  ],
};

/* ------------------------------ 6. Toothpick Shapes: konsep ------------------------------ */
const SUARA_F5 = "Bentuk dari Lidi cocok untuk menghitung sisi lurus, tetapi tidak bisa membuat bentuk lengkung.";
const SUARA_F1 = "Metode ketiga, Toothpick Shapes, atau Bentuk dari Lidi. Kita menyusun bentuk dengan batang lidi yang lurus.";
const SUARA_F2 = "Segitiga perlu tiga lidi, karena segitiga punya tiga sisi lurus.";
const SUARA_F3 = "Segi empat perlu empat lidi, karena segi empat punya empat sisi lurus.";
const SUARA_F4 = "Bentuk lengkung tidak bisa dibuat dari lidi, sebab lidi selalu lurus.";
const SGT: Titik[] = [{ x: 70, y: 70 }, { x: 110, y: 140 }, { x: 30, y: 140 }];
const SGE: Titik[] = [{ x: 184, y: 76 }, { x: 250, y: 76 }, { x: 250, y: 140 }, { x: 184, y: 140 }];

export const ADEGAN_LUAR_LIDI: AdeganStory = {
  id: "luar-lidi",
  judul: "Toothpick Shapes: bentuk dari lidi",
  sumber: "Metode global: Toothpick Shapes",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_F1, tambah("ketiga,", ...kepala(2)), tambah("lidi", ...[0, 1, 2].map((i) => lidi(`lp${i}`, 110, 80 + i * 24, 190, 80 + i * 24))), sorotkan("lurus.", "lp0", "lp1", "lp2")),
    k(
      SUARA_F2,
      hapus(0, "lp0", "lp1", "lp2"),
      tambah(0, ...bentukLidi("sg", SGT)),
      tambah(idx(SUARA_F2, "tiga"), teks("a0", 104, 100, "1", 11, W.merah), teks("a1", 70, 156, "2", 11, W.merah), teks("a2", 36, 100, "3", 11, W.merah)),
      tambah(idx(SUARA_F2, "tiga", 2), teks("t3", 70, 176, "3 lidi", 11)),
    ),
    k(
      SUARA_F3,
      tambah(0, ...bentukLidi("se", SGE)),
      tambah(idx(SUARA_F3, "empat", 2), teks("b0", 217, 68, "1", 11, W.merah), teks("b1", 262, 112, "2", 11, W.merah), teks("b2", 217, 156, "3", 11, W.merah), teks("b3", 172, 112, "4", 11, W.merah)),
      tambah(idx(SUARA_F3, "empat", 4), teks("t4", 217, 176, "4 lidi", 11)),
    ),
    k(
      SUARA_F4,
      tambah("lengkung", bulat("lk", 146, 112, 16, "transparent", W.biru, { tebal: 2, putus: true })),
      tambah("tidak", emo("no", 146, 118, E.salah, 18)),
      sorotkan("lurus.", "sg0", "se0"),
    ),
    k(
      SUARA_F5,
      bersih(0),
      tambah(0, ...kepala(2)),
      tambah("cocok", emo("bc", 40, 84, "👍", 26), ...kartu("bk", 64, 66, 222, 38, W.hijauMuda, ["cocok: menghitung sisi lurus"], 9.4)),
      tambah("tetapi", emo("bt", 40, 142, "🚫", 26), ...kartu("bl", 64, 124, 222, 38, W.merahMuda, ["tidak bisa: bentuk lengkung"], 9.4)),
    ),
  ],
};

/* ------------------------------ 7. Toothpick Shapes: terapan ------------------------------ */
const SUARA_G1 = "Abang menyusun rumah dari lidi. Atapnya segitiga dari tiga lidi, dindingnya segi empat dari empat lidi.";
const SUARA_G2 = "Abang menghitung lidinya: tiga tambah empat sama dengan tujuh lidi.";
const SUARA_G3 = "Lalu Abang mengurai atapnya. Tujuh dikurangi tiga sama dengan empat lidi yang tersisa.";
const ATAP: Titik[] = [{ x: 130, y: 52 }, { x: 170, y: 88 }, { x: 90, y: 88 }];
const DINDING: Titik[] = [{ x: 96, y: 94 }, { x: 164, y: 94 }, { x: 164, y: 150 }, { x: 96, y: 150 }];

export const ADEGAN_LUAR_LIDI_TERAPAN: AdeganStory = {
  id: "luar-lidi-terapan",
  judul: "Toothpick Shapes: rumah lidi Abang",
  sumber: "Metode global: Toothpick Shapes, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, ...kepala(2), ...orang("ab", 34, 120, E.abang, "Abang")),
      tambah("Atapnya", ...bentukLidi("la", ATAP)),
      tambah(idx(SUARA_G1, "tiga"), teks("n3", 240, 72, "3 lidi", 11)),
      tambah("dindingnya", ...bentukLidi("ld", DINDING)),
      tambah(idx(SUARA_G1, "empat", 2), teks("n4", 240, 124, "4 lidi", 11)),
    ),
    k(SUARA_G2, ...kalimatBertahap(SUARA_G2, "kl", 150, 180, ["3", "+", "4", "=", "7"], ["tiga", "tambah", "empat", "sama", "tujuh"])),
    k(
      SUARA_G3,
      hapus(0, "kl0", "kl1", "kl2", "kl3", "kl4"),
      ubah("mengurai", ...geserLidi("la", ATAP, -60, 0)),
      ...kalimatBertahap(SUARA_G3, "kk", 150, 180, ["7", KURANG, "3", "=", "4"], ["tujuh", "dikurangi", "tiga", "sama", "empat"]),
      sorotkan(idx(SUARA_G3, "tersisa."), "ld0", "ld1", "ld2", "ld3"),
    ),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_Z1 = "Tiga metode, tiga kegunaan. Pilih sesuai mainan yang ingin kamu susun dan urai.";
const SUARA_Z2 = "Kalau ingin membuat gambar dari tujuh keping yang sama, pakai Tangram.";
const SUARA_Z3 = "Kalau ingin gambar berwarna yang cepat jadi, pakai Pattern Blocks atau Balok Pola.";
const SUARA_Z4 = "Kalau ingin menghitung sisi lurus sebuah bentuk, pakai Toothpick Shapes atau Bentuk dari Lidi.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode global",
  sumber: "Ringkasan metode global",
  latar: "#FEF9C3",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Ringkasan")), tambah("tiga", emo("rk", 150, 96, E.pesta, 44)), tambah("urai.", ...kartu("rt", 60, 124, 180, 26, W.emas, ["3 metode global"], 10))),
    k(SUARA_Z2, bersih(0), tambah(0, judul("Ringkasan")), tambah("Tangram.", ...kartu("r0", 14, 34, 272, 44, WARNA_METODE[0], ["Tangram", "gambar dari 7 keping"], 9.4))),
    k(SUARA_Z3, tambah("Pattern", ...kartu("r1", 14, 86, 272, 44, WARNA_METODE[1], ["Pattern Blocks · Balok Pola", "gambar berwarna, cepat jadi"], 9.4))),
    k(SUARA_Z4, tambah("Toothpick", ...kartu("r2", 14, 138, 272, 44, WARNA_METODE[2], ["Toothpick Shapes · Bentuk dari Lidi", "menghitung sisi lurus"], 9.4))),
  ],
};
