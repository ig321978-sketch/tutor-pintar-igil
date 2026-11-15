import type { AdeganStory } from "./logika-story";
import {
  OWL,
  W,
  WARNA_SEGIEMPAT,
  WARNA_SEGITIGA,
  bangun,
  bulat,
  emo,
  garisSisi,
  idSisi,
  idSudut,
  jam,
  jendela,
  judul,
  kartu,
  keranjang,
  kotak,
  lonjong,
  nama,
  sudutBangun,
  tangan,
  teks,
} from "./k1b4a-gambar";
import { bersih, hapus, hitungSisi, hitungSudut, k, redamkan, sorotkan, tambah, ubah, urutKata } from "./k1b4a-bantu";

/* ------------------------------ 1. Dua macam segi empat ------------------------------ */
const SUARA_S1 = "Segi empat yang sering kita lihat ada dua macam. Yang satu bernama persegi, yang lain persegi panjang.";
const SUARA_S2 = "Persegi sisinya sama semua. Persegi panjang punya dua sisi pendek dan dua sisi lebih panjang.";
const SUARA_S3 = "Keduanya punya empat sisi lurus dan empat sudut. Jadi keduanya tetap segi empat.";
const SUARA_S4 = "Warna boleh berbeda dan besarnya boleh berbeda. Selama punya empat sisi lurus dan empat sudut, namanya segi empat.";
const PQ = sudutBangun("segiempat", 78, 100, 62, 62);
const PP = sudutBangun("segiempat", 214, 100, 100, 56);

export const ADEGAN_DUA_SEGIEMPAT: AdeganStory = {
  id: "dua-segiempat",
  judul: "Dua macam segi empat: persegi dan persegi panjang",
  sumber: "Materi: persegi dan persegi panjang",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Dua macam segi empat")),
      tambah("persegi,", bangun("qs", "segiempat", 78, 100, 62, 62, WARNA_SEGIEMPAT, 0, { tebal: 2 }), teks("qn", 78, 148, "Persegi", 9.6)),
      tambah("persegi@2", bangun("pp", "segiempat", 214, 100, 100, 56, WARNA_SEGIEMPAT, 0, { tebal: 2 }), teks("pn", 214, 148, "Persegi panjang", 9.6)),
    ),
    k(
      SUARA_S2,
      tambah("sama", ...[0, 1, 2, 3].map((i) => garisSisi("pq", PQ, i, W.hijau))),
      tambah("pendek", garisSisi("pr", PP, 1, W.merah), garisSisi("pr", PP, 3, W.merah)),
      tambah("panjang@2", garisSisi("pr", PP, 0, W.biru), garisSisi("pr", PP, 2, W.biru)),
    ),
    k(
      SUARA_S3,
      hapus(0, "pqs0", "pqs1", "pqs2", "pqs3", "prs0", "prs1", "prs2", "prs3"),
      tambah("empat", teks("c1", 78, 170, "4 sisi • 4 sudut", 9.4, W.merah)),
      tambah("sudut.", teks("c2", 214, 170, "4 sisi • 4 sudut", 9.4, W.merah)),
    ),
    k(SUARA_S4, redamkan(0, "qs", "pp"), sorotkan("Selama", "qs", "pp"), tambah("namanya", ...kartu("sj", 70, 178, 160, 22, W.emas, ["segi empat"], 10))),
  ],
};

/* ------------------------------ 2. Bentuk tetap sama ------------------------------ */
const SUARA_Z1 = "Sekarang kita lihat segitiga yang bisa diputar. Ini segitiga tegak, dengan puncak di atas.";
const SUARA_Z2 = "Kita balik segitiganya. Segitiga terbalik tetap punya tiga sisi dan tiga sudut.";
const SUARA_Z3 = "Kita miringkan segitiganya. Segitiga yang miring tetap segitiga. Tiga sisi dan tiga sudutnya tidak berubah.";
const SUARA_Z4 = "Segitiga yang besar atau kecil juga tetap segitiga. Besar atau kecil tidak mengubah bentuknya.";
const SUARA_Z5 = "Segi empat juga begitu. Segi empat yang miring tetap segi empat, dengan empat sisi dan empat sudut.";
const SUARA_Z6 = "Jadi bentuk tidak berubah karena diputar, dimiringkan, atau karena besar kecilnya. Ingat ya, bentuknya tetap sama.";

export const ADEGAN_TETAP: AdeganStory = {
  id: "bentuk-tetap",
  judul: "Bentuk tetap sama walau diputar",
  sumber: "Materi: bentuk tetap sama",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Segitiga diputar")),
      tambah("segitiga", bangun("zt", "segitiga", 150, 100, 76, 66, WARNA_SEGITIGA, 0, { tebal: 2.2 })),
      tambah("tegak,", teks("zl", 150, 170, "tegak", 12, W.merah)),
    ),
    k(
      SUARA_Z2,
      ubah("balik", { id: "zt", rot: 180 }),
      ubah("balik", { id: "zl", isi: "terbalik" }),
      tambah("tiga", teks("zc", 150, 190, "3 sisi • 3 sudut", 10, W.hijau)),
    ),
    k(SUARA_Z3, ubah("miringkan", { id: "zt", rot: 40 }), ubah("miringkan", { id: "zl", isi: "miring" }), sorotkan("tidak", "zt")),
    k(
      SUARA_Z4,
      bersih(0),
      tambah(0, judul("Besar atau kecil"), bangun("kc", "segitiga", 60, 104, 36, 32, WARNA_SEGITIGA, 0, { tebal: 2 })),
      tambah("besar", bangun("bs", "segitiga", 224, 92, 100, 88, WARNA_SEGITIGA, 0, { tebal: 2 })),
      tambah("kecil", bangun("sd", "segitiga", 130, 104, 56, 50, WARNA_SEGITIGA, 0, { tebal: 2 })),
      tambah("tetap", teks("ct", 150, 178, "tetap segitiga", 12, W.merah)),
    ),
    k(
      SUARA_Z5,
      bersih(0),
      tambah(0, judul("Segi empat miring")),
      tambah("empat", bangun("se1", "segiempat", 90, 98, 62, 44, WARNA_SEGIEMPAT, 0, { tebal: 2 }), teks("l1", 90, 150, "tegak", 11, W.merah)),
      tambah("miring", bangun("se2", "segiempat", 210, 98, 62, 44, WARNA_SEGIEMPAT, 30, { tebal: 2 }), teks("l2", 210, 150, "miring", 11, W.merah)),
      tambah("sudut.", teks("l3", 150, 186, "4 sisi • 4 sudut", 11, W.hijau)),
    ),
    k(
      SUARA_Z6,
      bersih(0),
      tambah(0, judul("Bentuknya tetap sama"), emo("ow", 150, 100, OWL, 50)),
      tambah("diputar,", ...kartu("y1", 14, 140, 130, 24, W.langit, ["diputar"], 10)),
      tambah("dimiringkan,", ...kartu("y2", 156, 140, 130, 24, W.hijauMuda, ["dimiringkan"], 10)),
      tambah("kecilnya.", ...kartu("y3", 14, 172, 272, 24, W.krem, ["besar atau kecil, tetap sama"], 10)),
    ),
  ],
};

/* ------------------------------ 3. Mendeskripsikan jendela ------------------------------ */
const SUARA_J1 = "Sekarang kita belajar mendeskripsikan benda. Caranya ada empat langkah: lihat, ketuk, hitung, lalu sebut.";
const SUARA_J2 = "Contohnya sebuah jendela. Langkah pertama, lihat. Tepi jendela lurus, tidak melengkung.";
const SUARA_J3 = "Langkah kedua, ketuk tepinya. Ketuk tiap sisi sambil menghitung. Satu, dua, tiga, empat.";
const SUARA_J4 = "Langkah ketiga, hitung sudutnya. Satu, dua, tiga, empat.";
const SUARA_J5 = "Langkah keempat, sebut. Jendela berbentuk segi empat. Jendela punya empat sisi lurus dan empat sudut. Ucapkan lagi mengikuti suara guru.";
const PJ = sudutBangun("segiempat", 150, 96, 110, 76);
const LANGKAH: [string, string, string][] = [["\u{1F440}", "Lihat tepinya", "lihat"], ["\u{1F446}", "Ketuk tiap sisi", "ketuk"], ["\u{1F522}", "Hitung sisi dan sudut", "hitung"], ["\u{1F5E3}", "Sebut namanya", "sebut"]];

export const ADEGAN_DESKRIPSI: AdeganStory = {
  id: "deskripsi-jendela",
  judul: "Mendeskripsikan benda: lihat, ketuk, hitung, sebut",
  sumber: "Materi: cara mendeskripsikan benda",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, judul("Empat langkah")),
      ...LANGKAH.map(([e, t, kata], i) => tambah(kata, emo(`le${i}`, 28, 56 + i * 42, e, 22), ...kartu(`lk${i}`, 48, 34 + i * 42, 236, 34, [W.langit, W.hijauMuda, W.krem, W.pink][i], [t], 10))),
    ),
    k(
      SUARA_J2,
      bersih(0),
      tambah(0, judul("Langkah 1: lihat")),
      tambah("jendela.", ...jendela("jw", 150, 96, 110, 76)),
      tambah("lurus,", teks("jl", 150, 180, "tepinya lurus", 12, W.merah)),
    ),
    k(
      SUARA_J3,
      hapus(0, "jl"),
      ubah(0, { id: "jud", isi: "Langkah 2: ketuk" }),
      ...hitungSisi(SUARA_J3, "j", PJ, "menghitung."),
      tambah("empat.", teks("jc", 150, 192, "4 sisi lurus", 11, W.merah)),
    ),
    k(
      SUARA_J4,
      hapus(0, "jc", ...idSisi("j", 4)),
      ubah(0, { id: "jud", isi: "Langkah 3: hitung" }),
      ...hitungSudut(SUARA_J4, "j", PJ, "sudutnya."),
      tambah("empat.", teks("jc2", 150, 192, "4 sudut", 11, W.merah)),
    ),
    k(
      SUARA_J5,
      hapus(0, "jc2", ...idSudut("j", 4)),
      ubah(0, { id: "jud", isi: "Langkah 4: sebut" }),
      tambah("segi", ...kartu("js1", 30, 150, 240, 22, W.emas, ["Jendela: segi empat"], 10)),
      tambah("sudut.", ...kartu("js2", 30, 176, 240, 22, W.hijauMuda, ["4 sisi lurus • 4 sudut"], 10)),
      tambah("Ucapkan", emo("sb", 262, 40, "\u{1F5E3}", 26)),
    ),
  ],
};

/* ------------------------------ 4. Keranjang tiga bentuk ------------------------------ */
const SUARA_K1 = "Sekarang kita memilah benda. Ada tiga keranjang. Satu untuk bentuk lengkung, satu untuk segitiga, dan satu untuk segi empat.";
const SUARA_K2 = "Seret donat ke keranjang lengkung. Donat tepinya melengkung.";
const SUARA_K3 = "Seret tenda ke keranjang segitiga. Tenda punya tiga sudut.";
const SUARA_K4 = "Seret pintu ke keranjang segi empat. Pintu punya empat sudut.";
const SUARA_K5 = "Jam dinding juga lengkung, jadi masuk ke keranjang lengkung. Irisan semangka masuk ke keranjang segitiga. Bendera masuk ke keranjang segi empat.";
const SUARA_K6 = "Sekarang hitung benda di keranjang lengkung. Satu, dua. Ada dua benda lengkung.";
const XK = [30, 75, 120, 165, 210, 255];
const NAMA_K = ["donat", "tenda", "pintu", "jam", "semangka", "bendera"];
const KEL = [0, 1, 2, 0, 1, 2];
const PUSAT_KERANJANG = [56, 150, 244];
const slot = (i: number): number => PUSAT_KERANJANG[KEL[i]] + (i < 3 ? -20 : 20);
const benda = (i: number) =>
  [
    bulat("k0", XK[0], 62, 13, "#F59E0B", W.coklat, { tebal: 2.4 }),
    bangun("k1", "segitiga", XK[1], 62, 30, 26, "#60A5FA"),
    kotak("k2", XK[2] - 9, 46, 18, 30, "#D97706", W.coklat, { rx: 2, tebal: 2 }),
    jam("k3", XK[3], 62, 13),
    bangun("k4", "segitiga", XK[4], 62, 30, 26, "#F87171"),
    kotak("k5", XK[5] - 15, 52, 30, 20, "#EF4444", W.biru, { rx: 0 }),
  ][i];
/** Gerak benda ke-i ke keranjangnya; kotak berpojok kiri-atas, lainnya berpusat. */
const masuk = (i: number) => {
  const tujuan = i === 2 ? { x: slot(i) - 9, y: 131 } : i === 5 ? { x: slot(i) - 15, y: 136 } : { x: slot(i), y: 146 };
  return [{ id: `k${i}`, ...tujuan }, { id: `kn${i}`, x: slot(i), y: 166 }];
};

export const ADEGAN_KERANJANG: AdeganStory = {
  id: "keranjang-bentuk",
  judul: "Seret benda ke keranjang bentuk yang sama",
  sumber: "Materi: keranjang tiga bentuk",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Pilah ke keranjang")),
      tambah("memilah", ...XK.flatMap((x, i) => [benda(i), nama(`kn${i}`, x, 90, NAMA_K[i], 7.6)])),
      tambah("keranjang.", ...PUSAT_KERANJANG.flatMap((c, i) => keranjang(`kj${i}`, c - 42, 128, 84, 44, { z: -1 }))),
      tambah("lengkung,", teks("bl0", 56, 192, "Lengkung", 9.4, W.merah)),
      tambah("segitiga,", teks("bl1", 150, 192, "Segitiga", 9.4, W.merah)),
      tambah("empat.", teks("bl2", 244, 192, "Segi empat", 9.4, W.merah)),
    ),
    k(SUARA_K2, tambah("Seret", tangan(XK[0], 80)), ubah("keranjang", ...masuk(0), { id: "tg", x: slot(0), y: 118 })),
    k(SUARA_K3, hapus(0, "tg"), tambah("Seret", tangan(XK[1], 80)), ubah("keranjang", ...masuk(1), { id: "tg", x: slot(1), y: 118 })),
    k(SUARA_K4, hapus(0, "tg"), tambah("Seret", tangan(XK[2], 80)), ubah("keranjang", ...masuk(2), { id: "tg", x: slot(2), y: 118 })),
    k(SUARA_K5, hapus(0, "tg"), ubah("masuk", ...masuk(3)), ubah("masuk@2", ...masuk(4)), ubah("masuk@3", ...masuk(5))),
    k(
      SUARA_K6,
      ...urutKata(SUARA_K6, ["satu", "dua"], "keranjang").map((p, i) => tambah(p, teks(`cb${i}`, slot(3 * i), 116, String(i + 1), 11, W.merah))),
      tambah("benda@2", teks("cbt", 56, 104, "2 benda", 10, W.merah)),
      sorotkan("benda@2", "k0", "k3"),
    ),
  ],
};

/* ------------------------------ 5. Bayangan siapa ini ------------------------------ */
const SUARA_B1 = "Sekarang kita tebak bayangan. Lihat garis tepi bayangan ini dengan teliti. Bentuk apa yang kamu lihat?";
const SUARA_B2 = "Garis tepinya lurus. Hitung sudutnya, ada empat. Pilih nama bentuknya di layar.";
const SUARA_B3 = "Betul, segi empat! Benda itu sebuah pintu. Pintu punya empat sisi lurus dan empat sudut.";
const SUARA_B4 = "Sekarang bayangan yang lain. Tepinya melengkung dan tidak ada sudut. Pilih nama bentuknya di layar.";
const SUARA_B5 = "Betul, lengkung! Benda itu sebuah telur. Telur itu lonjong, tetapi tetap bentuk lengkung.";
const PILIHAN: [string, string, string][] = [["Lengkung", W.hijauMuda, "c1"], ["Segitiga", W.pink, "c2"], ["Segi empat", W.langit, "c3"]];
const KARTU_X = [14, 108, 202];

export const ADEGAN_BAYANGAN: AdeganStory = {
  id: "bayangan",
  judul: "Bayangan siapa ini?",
  sumber: "Materi: tebak bayangan benda",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Bayangan siapa ini?")),
      tambah("bayangan.", kotak("sh", 122, 42, 56, 72, "#334155", "#0F172A", { rx: 3, tebal: 2 })),
      tambah("tepi", ...PILIHAN.flatMap(([t, w, id], i) => kartu(id, KARTU_X[i], 142, 84, 30, w, [t], 9.6))),
    ),
    k(
      SUARA_B2,
      tambah("lurus.", teks("bt", 150, 130, "tepi lurus", 11, W.merah)),
      ubah("empat.", { id: "bt", isi: "tepi lurus, 4 sudut" }),
      tambah("Pilih", tangan(244, 192)),
    ),
    k(
      SUARA_B3,
      hapus(0, "tg"),
      ubah(0, { id: "sh", warna: "#D97706" }),
      sorotkan("segi", "c3-k"),
      ubah("pintu.", { id: "bt", isi: "pintu" }),
      tambah("sisi", emo("ok", 262, 80, "✅", 28)),
    ),
    k(
      SUARA_B4,
      hapus(0, "sh", "ok"),
      redamkan(0, "c3-k"),
      tambah(0, lonjong("sh2", 150, 80, 24, 34, "#334155", { garis: "#0F172A", tebal: 2 })),
      ubah(0, { id: "bt", isi: "tepi melengkung" }),
      tambah("Pilih", tangan(56, 192)),
    ),
    k(SUARA_B5, hapus(0, "tg"), ubah(0, { id: "sh2", warna: "#FEF3C7" }), sorotkan("lengkung!", "c1-k"), ubah("telur.", { id: "bt", isi: "telur" }), tambah("lonjong,", emo("ok2", 262, 80, "✅", 28))),
  ],
};
