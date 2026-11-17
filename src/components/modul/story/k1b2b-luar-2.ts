import type { AdeganStory } from "./logika-story";
import { E, W, bedengSepuluh, emo, garis, judul, kalimat, kartu, petak, teks } from "./k1b2b-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k1b2b-bantu";
import { WARNA_METODE, kepala } from "./k1b2b-luar-1";

/* Video metode global Sub-Bab B: Doubles (Penjumlahan Kembar), Make Ten (Membuat Sepuluh), dan ringkasan. */

/* ------------------------------ 4. Doubles: konsep ------------------------------ */
const SUARA_D1 = "Metode kedua, Doubles, atau Penjumlahan Kembar. Dua bilangan yang sama ditambahkan.";
const SUARA_D2 = "Seperti bayangan di cermin. Sisi kiri dan sisi kanan sama banyak.";
const SUARA_D3 = "Satu ditambah satu sama dengan dua. Dua ditambah dua sama dengan empat.";
const SUARA_D4 = "Kalau sudah hafal yang kembar, menjumlah jadi lebih cepat.";

export const ADEGAN_LUAR_KEMBAR: AdeganStory = {
  id: "luar-kembar",
  judul: "Doubles: penjumlahan kembar",
  sumber: "Metode global: Doubles",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_D1, tambah("kedua,", ...kepala(1)), tambah("sama", teks("sm", 150, 80, "bilangan yang sama", 11, W.ungu))),
    k(SUARA_D2, tambah("cermin.", garis("cm", 150, 94, 0, 70, W.biru, 2, { putus: true })), tambah("kiri", emo("a0", 110, 128, E.bawang, 20), emo("a1", 84, 128, E.bawang, 20)), tambah("kanan", emo("b0", 190, 128, E.bawang, 20), emo("b1", 216, 128, E.bawang, 20))),
    k(SUARA_D3, bersih(0), tambah(0, ...kepala(1)), tambah("Satu", ...kalimat("k2", 150, 90, ["1", "+", "1", "=", "2"], 18, 26)), tambah("Dua", ...kalimat("k4", 150, 130, ["2", "+", "2", "=", "4"], 18, 26))),
    k(SUARA_D4, tambah("hafal", ...kalimat("k6", 150, 170, ["3", "+", "3", "=", "?"], 18, 26)), tambah("cepat.", emo("ok", 262, 170, E.benar, 20))),
  ],
};

/* ------------------------------ 5. Doubles: terapan ------------------------------ */
const SUARA_E1 = "Mamah menaruh tiga bawang di piring kiri dan tiga bawang di piring kanan.";
const SUARA_E2 = "Kedua piring sama banyak. Ini kembar tiga.";
const SUARA_E3 = "Tiga ditambah tiga sama dengan enam. Semuanya enam bawang.";
const SUARA_E4 = "Igil langsung ingat, kembar tiga hasilnya enam, tanpa menghitung lagi.";

export const ADEGAN_LUAR_KEMBAR_TERAPAN: AdeganStory = {
  id: "luar-kembar-terapan",
  judul: "Doubles: bawang di dua piring",
  sumber: "Metode global: Doubles, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, ...kepala(1)),
      tambah("kiri", { id: "p1", t: "bulat", x: 90, y: 110, r: 40, warna: W.putih, garis: W.biru, tebal: 2 }, ...[0, 1, 2].map((i) => emo(`bk${i}`, 66 + i * 24, 118, E.bawang, 20))),
      tambah("kanan.", { id: "p2", t: "bulat", x: 210, y: 110, r: 40, warna: W.putih, garis: W.biru, tebal: 2 }, ...[0, 1, 2].map((i) => emo(`bn${i}`, 186 + i * 24, 118, E.bawang, 20))),
    ),
    k(SUARA_E2, sorotkan("sama", "p1", "p2"), tambah("kembar", ...kartu("kb", 110, 160, 80, 22, W.pink, ["kembar 3"], 10))),
    k(SUARA_E3, tambah("Tiga", ...kalimat("kl", 150, 66, ["3", "+", "3", "=", "6"], 18, 26)), tambah("Semuanya", teks("s6", 150, 194, "6 bawang", 11, W.merah))),
    k(SUARA_E4, tambah("Igil", emo("ig", 262, 166, E.igil, 24)), tambah("ingat,", emo("ot", 262, 136, "\u{1F4A1}", 20))),
  ],
};

/* ------------------------------ 6. Make Ten: konsep ------------------------------ */
const SUARA_M1 = "Metode ketiga, Make Ten, atau Membuat Sepuluh. Kita cari berapa lagi supaya menjadi sepuluh.";
const SUARA_M2 = "Pakai bingkai sepuluh. Hitung kotak yang masih kosong.";
const SUARA_M3 = "Kotak kosong itu adalah pasangan sepuluh dari bilangan yang sudah ada.";
const SUARA_M4 = "Sepuluh itu bilangan yang penting. Banyak penjumlahan jadi mudah kalau kita ingat pasangan sepuluh.";
const BF = { x: 85, y: 64, s: 26 };
const sel = (i: number) => {
  const p = petak(BF.x, BF.y, i, BF.s);
  return { x: p.x, y: p.y + 7 };
};

export const ADEGAN_LUAR_SEPULUH: AdeganStory = {
  id: "luar-sepuluh",
  judul: "Make Ten: membuat sepuluh",
  sumber: "Metode global: Make Ten",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_M1, tambah("ketiga,", ...kepala(2)), tambah("sepuluh.", ...kartu("ts", 90, 150, 120, 26, W.emas, ["... lagi jadi 10"], 10))),
    k(SUARA_M2, tambah("bingkai", ...bedengSepuluh("bf", BF.x, BF.y, BF.s), ...[0, 1, 2, 3, 4, 5].map((i) => emo(`mk${i}`, sel(i).x, sel(i).y, E.kentang, 18))), sorotkan("kosong.", "bfc6", "bfc7", "bfc8", "bfc9")),
    k(SUARA_M3, ubah("pasangan", { id: "ts-t0", isi: "6 dan 4 jadi 10" })),
    k(SUARA_M4, tambah("penting.", emo("bt", 262, 80, E.bintang, 26)), tambah("ingat", teks("ig", 150, 194, "9 dan 1, 8 dan 2, 7 dan 3", 10, W.ungu))),
  ],
};

/* ------------------------------ 7. Make Ten: terapan ------------------------------ */
const SUARA_P1 = "Keranjang kentang sudah berisi delapan. Berapa lagi supaya penuh sepuluh?";
const SUARA_P2 = "Lihat bingkai. Masih ada dua kotak kosong.";
const SUARA_P3 = "Abang menambah dua kentang. Delapan ditambah dua sama dengan sepuluh.";
const SUARA_P4 = "Delapan dan dua adalah pasangan sepuluh. Keranjang penuh!";

export const ADEGAN_LUAR_SEPULUH_TERAPAN: AdeganStory = {
  id: "luar-sepuluh-terapan",
  judul: "Make Ten: delapan kentang",
  sumber: "Metode global: Make Ten, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_P1, tambah(0, ...kepala(2), ...bedengSepuluh("bf", BF.x, BF.y, BF.s)), tambah("delapan.", ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => emo(`kt${i}`, sel(i).x, sel(i).y, E.kentang, 18))), tambah("Berapa", teks("tq", 150, 150, "berapa lagi?", 11, W.merah))),
    k(SUARA_P2, sorotkan("kosong.", "bfc8", "bfc9"), tambah("dua", teks("t2", 252, 104, "2", 16, W.merah))),
    k(SUARA_P3, tambah("menambah", emo("kt8", sel(8).x, sel(8).y, E.kentang, 18), emo("kt9", sel(9).x, sel(9).y, E.kentang, 18)), ubah("Delapan", { id: "tq", isi: "penuh 10" }), tambah("ditambah", ...kalimat("kl", 150, 182, ["8", "+", "2", "=", "10"], 16, 26))),
    k(SUARA_P4, tambah("pasangan", ...kartu("ps", 196, 136, 90, 22, W.hijauMuda, ["8 dan 2"], 10)), sorotkan("penuh!", ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => `bfc${i}`))),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_Z1 = "Kita sudah melihat tiga metode global untuk menjumlah dengan cepat.";
const SUARA_Z2 = "Number Line: mulai dari bilangan pertama, lalu melompat ke kanan.";
const SUARA_Z3 = "Doubles: hafalkan penjumlahan kembar, dua bilangan yang sama.";
const SUARA_Z4 = "Make Ten: cari berapa lagi supaya menjadi sepuluh.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode global",
  sumber: "Ringkasan metode global",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Ringkasan")), tambah("tiga", emo("rk", 150, 96, E.bintang, 44)), tambah("cepat.", ...kartu("rt", 60, 124, 180, 26, W.emas, ["3 metode global"], 10))),
    k(SUARA_Z2, bersih(0), tambah(0, judul("Ringkasan")), tambah("Number", ...kartu("r0", 14, 34, 272, 44, WARNA_METODE[0], ["Number Line", "mulai, lalu lompat ke kanan"], 9.4))),
    k(SUARA_Z3, tambah("Doubles:", ...kartu("r1", 14, 86, 272, 44, WARNA_METODE[1], ["Doubles", "dua bilangan yang sama"], 9.4))),
    k(SUARA_Z4, tambah("Make", ...kartu("r2", 14, 138, 272, 44, WARNA_METODE[2], ["Make Ten", "berapa lagi supaya 10"], 9.4))),
  ],
};
