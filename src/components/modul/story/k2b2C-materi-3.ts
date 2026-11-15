import type { AdeganStory, Obj } from "./logika-story";
import { EMO, W, bendaDi, emo, jumlahG, judul, kartu, kotak, namaG, panah, pasang, petakKosong, teks, titikBaris, titikPetak } from "./k2b2C-gambar";
import { hapus, idx, ids, k, pindahKe, redamkan, sorotkan, tambah, ubah } from "./k2b2C-bantu";

const ex = (isi: string, id = "ex", x = 150, y = 160, u = 16): Obj => teks(id, x, y, isi, u, W.merah);
const xBaris = (i: number): number => 26 + 22 * i;
const petakBaris = (dari: number, sampai: number, y: number): Obj[] => Array.from({ length: sampai - dari + 1 }, (_, q) => petakKosong(`pk${dari + q}`, xBaris(dari + q), y));

/* ------------------------------ 1. Lebihnya: Igil punya tiga lebihnya dari Wei ------------------------------ */
export const Y_BARIS_ATAS = 72;
export const Y_BARIS_BAWAH = 128;
const ptsWei = titikBaris(8, 26, Y_BARIS_ATAS, 22);
const ptsIgilDelapan = titikBaris(8, 26, Y_BARIS_BAWAH, 22);
const ptsIgilTiga = titikBaris(3, xBaris(8), Y_BARIS_BAWAH, 22);
const SUARA_E1 = "Sekarang kata lebihnya. Wei punya delapan kelereng. Igil punya tiga lebihnya dari Wei.";
const SUARA_E2 = "Igil punya lebih banyak dari Wei. Jadi banyak kelereng Igil kita cari dengan menambah.";
const SUARA_E3 = "Delapan ditambah tiga sama dengan sebelas. Kelereng Igil ada sebelas.";
const SUARA_E4 = "Kita periksa. Sebelas dikurangi tiga sama dengan delapan. Hasilnya cocok.";

export const ADEGAN_LEBIHNYA: AdeganStory = {
  id: "kata-lebihnya",
  judul: "Kata lebihnya: Igil punya lebih banyak",
  sumber: "Materi: kata kunci lebihnya",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Kata lebihnya")),
      tambah(idx(SUARA_E1, "Wei"), namaG("a", 10, 48, "Wei"), ...bendaDi("a", EMO.kelereng, ptsWei, 17), jumlahG("a", 62, 50, "8")),
      tambah(idx(SUARA_E1, "Igil"), namaG("b", 10, 104, "Igil"), jumlahG("b", 62, 106, "?")),
    ),
    k(
      SUARA_E2,
      tambah(idx(SUARA_E2, "lebih"), ...bendaDi("b", EMO.kelereng, ptsIgilDelapan, 17), ...petakBaris(8, 10, Y_BARIS_BAWAH)),
      sorotkan(idx(SUARA_E2, "menambah"), "pk8", "pk9", "pk10"),
    ),
    k(
      SUARA_E3,
      hapus(idx(SUARA_E3, "Delapan"), "pk8", "pk9", "pk10"),
      tambah(idx(SUARA_E3, "Delapan"), ...ptsIgilTiga.map((p, q) => emo(`eb${8 + q}`, p.x, p.y, EMO.kelereng, 17))),
      tambah(idx(SUARA_E3, "Delapan"), ex("8 + 3 = 11")),
      ubah(idx(SUARA_E3, "sebelas", 2), { id: "eb-ln", isi: "11" }),
    ),
    k(SUARA_E4, tambah(idx(SUARA_E4, "Sebelas"), ex("11 − 3 = 8", "xk", 130, 184, 14)), tambah(idx(SUARA_E4, "cocok"), emo("ok", 222, 184, "✅", 16))),
  ],
};

/* ------------------------------ 2. Kurangnya: Upe punya empat kurangnya dari Halim ------------------------------ */
const ptsUpe = titikBaris(8, 26, Y_BARIS_ATAS, 22);
const ptsHalimDelapan = titikBaris(8, 26, Y_BARIS_BAWAH, 22);
const ptsHalimEmpat = titikBaris(4, xBaris(8), Y_BARIS_BAWAH, 22);
const SUARA_F1 = "Sekarang hati-hati dengan kata kurangnya. Upe punya delapan bola. Upe punya empat bola kurangnya dari Halim.";
const SUARA_F2 = "Yang dicari adalah bola Halim. Upe punya lebih sedikit, jadi Halim punya lebih banyak.";
const SUARA_F3 = "Karena yang dicari lebih banyak, kita pilih tambah. Delapan ditambah empat sama dengan dua belas.";
const SUARA_F4 = "Jadi bola Halim ada dua belas. Kata kurangnya tidak selalu berarti kita mengurangi.";

export const ADEGAN_KURANGNYA: AdeganStory = {
  id: "kata-kurangnya",
  judul: "Kata kurangnya: lihat siapa yang dicari",
  sumber: "Materi: kata kunci kurangnya",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, judul("Kata kurangnya")),
      tambah(idx(SUARA_F1, "Upe"), namaG("a", 10, 48, "Upe"), ...bendaDi("a", EMO.bola, ptsUpe, 17), jumlahG("a", 62, 50, "8")),
      tambah(idx(SUARA_F1, "Halim"), namaG("b", 10, 104, "Halim"), jumlahG("b", 62, 106, "?")),
    ),
    k(
      SUARA_F2,
      tambah(idx(SUARA_F2, "Halim"), ...bendaDi("b", EMO.bola, ptsHalimDelapan, 17), ...petakBaris(8, 11, Y_BARIS_BAWAH)),
      sorotkan(idx(SUARA_F2, "banyak"), "pk8", "pk9", "pk10", "pk11"),
    ),
    k(
      SUARA_F3,
      hapus(idx(SUARA_F3, "pilih"), ...ids("pk", 8, 11)),
      tambah(idx(SUARA_F3, "pilih"), ...ptsHalimEmpat.map((p, q) => emo(`eb${8 + q}`, p.x, p.y, EMO.bola, 17))),
      tambah(idx(SUARA_F3, "Delapan"), ex("8 + 4 = 12", "ex", 150, 160)),
      ubah(idx(SUARA_F3, "dua"), { id: "eb-ln", isi: "12" }),
    ),
    k(SUARA_F4, redamkan(0, ...ids("eb", 8, 11)), tambah(idx(SUARA_F4, "kurangnya"), ...kartu("sd", 40, 170, 220, 26, W.krem, ["lihat dulu siapa yang dicari"], 10.4))),
  ],
};

/* ------------------------------ 3. Selisih: sebelas dan tujuh ------------------------------ */
const ptsKira = titikBaris(11, 26, Y_BARIS_ATAS, 22);
const ptsWeiS = titikBaris(7, 26, Y_BARIS_BAWAH, 22);
const SUARA_G1 = "Sekarang kata selisih. Kira punya sebelas stiker. Wei punya tujuh stiker.";
const SUARA_G2 = "Selisih berarti beda banyaknya. Kita pasangkan stiker satu-satu.";
const SUARA_G3 = "Ada empat stiker Kira yang tidak punya pasangan. Empat stiker itulah selisihnya.";
const SUARA_G4 = "Selisih dicari dengan mengurangi. Sebelas dikurangi tujuh sama dengan empat.";
const SUARA_G5 = "Kita periksa. Tujuh ditambah empat sama dengan sebelas. Jadi selisih stiker Kira dan Wei adalah empat.";

export const ADEGAN_SELISIH: AdeganStory = {
  id: "kata-selisih",
  judul: "Kata selisih: beda banyaknya",
  sumber: "Materi: kata kunci selisih",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Kata selisih")),
      tambah(idx(SUARA_G1, "Kira"), namaG("a", 10, 48, "Kira"), ...bendaDi("a", EMO.bintang, ptsKira, 17), jumlahG("a", 62, 50, "11")),
      tambah(idx(SUARA_G1, "Wei"), namaG("b", 10, 104, "Wei"), ...bendaDi("b", EMO.bintang, ptsWeiS, 17), jumlahG("b", 62, 106, "7")),
    ),
    k(SUARA_G2, ...Array.from({ length: 7 }, (_, i) => tambah(i + 1, pasang(i, xBaris(i), Y_BARIS_ATAS + 6, Y_BARIS_BAWAH - 18)))),
    k(SUARA_G3, sorotkan(idx(SUARA_G3, "tidak"), ...ids("ea", 7, 10)), tambah(idx(SUARA_G3, "selisihnya"), teks("sl", 258, 98, "selisih 4", 10, W.merah))),
    k(SUARA_G4, redamkan(0, ...ids("ea", 7, 10)), tambah(idx(SUARA_G4, "Sebelas"), ex("11 − 7 = 4", "ex", 150, 160))),
    k(SUARA_G5, tambah(idx(SUARA_G5, "Tujuh"), ex("7 + 4 = 11", "xk", 130, 184, 14)), tambah(idx(SUARA_G5, "Jadi"), emo("ok", 222, 184, "✅", 16))),
  ],
};

/* ------------------------------ 4. Bilangan awal: jeruk Halim ------------------------------ */
export const SLOT_JERUK = titikPetak(16, 5, 30, 70, 28, 28);
export const PTS_JERUK_KIRA = titikPetak(4, 2, 226, 104, 30, 28);
const jeruk = (key: string, dari: number, pts: { x: number; y: number }[]): Obj[] => bendaDi(key, EMO.jeruk, pts, 18).map((o, i) => ({ ...o, id: `e${key}${dari + i}` }));
const SUARA_J1 = "Halim punya satu keranjang jeruk. Halim memberikan empat jeruk kepada Kira.";
const SUARA_J2 = "Sekarang jeruk Halim tersisa dua belas.";
const SUARA_J3 = "Berapa jeruk Halim sebelum diberikan? Kita tulis: titik-titik dikurangi empat sama dengan dua belas.";
const SUARA_J4 = "Untuk mencari bilangan awal, kita balik ceritanya. Jeruk yang diberikan kita kembalikan ke keranjang.";
const SUARA_J5 = "Dua belas ditambah empat sama dengan enam belas. Jadi jeruk Halim semula ada enam belas.";

export const ADEGAN_JERUK_AWAL: AdeganStory = {
  id: "jeruk-awal",
  judul: "Mencari bilangan awal: jeruk Halim",
  sumber: "Materi: mencari bilangan awal",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, judul("Jeruk Halim")),
      tambah(idx(SUARA_J1, "keranjang"), kotak("kj", 10, 30, 170, 128, W.krem, W.coklat, { rx: 10, tebal: 2 }), namaG("a", 18, 46, "Halim")),
      tambah(idx(SUARA_J1, "memberikan"), panah("pa", 184, 100, 14, 0, W.hijau, 2.4)),
      tambah(idx(SUARA_J1, "Kira"), kotak("kb", 200, 60, 92, 84, W.langit, W.biru, { rx: 8 }), teks("kn", 246, 76, "Kira", 9, W.biru), ...jeruk("b", 0, PTS_JERUK_KIRA)),
    ),
    k(SUARA_J2, tambah(idx(SUARA_J2, "jeruk"), ...jeruk("a", 0, SLOT_JERUK.slice(0, 12))), tambah(idx(SUARA_J2, "dua"), jumlahG("a", 160, 48, "12"))),
    k(SUARA_J3, tambah(idx(SUARA_J3, "Kita"), ex("? − 4 = 12", "ex", 150, 184))),
    k(
      SUARA_J4,
      ubah(idx(SUARA_J4, "balik"), { id: "pa", x: 198, x2: -14 }),
      pindahKe(idx(SUARA_J4, "kembalikan"), "b", SLOT_JERUK.slice(12, 16), 0),
      sorotkan(idx(SUARA_J4, "kembalikan"), ...ids("eb", 0, 3)),
    ),
    k(
      SUARA_J5,
      redamkan(0, ...ids("eb", 0, 3)),
      ubah(idx(SUARA_J5, "Dua"), { id: "ex", isi: "12 + 4 = 16" }),
      tambah(idx(SUARA_J5, "semula"), teks("tot", 246, 108, "semula: 16", 10.5, W.merah)),
      tambah(idx(SUARA_J5, "enam", 2), emo("ok", 262, 184, "✅", 16)),
    ),
  ],
};
