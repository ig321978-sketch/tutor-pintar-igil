import type { AdeganStory, Obj } from "./logika-story";
import { W, bingkaiDua, emo, judul, kartu, kotak, teks, titikPetak, petak, type Titik } from "./k1b5d-gambar";
import { bersih, hapus, hitungMuncul, idx, penghitung, k, redamkan, sorotkan, tambah } from "./k1b5d-bantu";
import { ids, puluhan, satuan } from "./k1b5d-materi-3";
import { NAMA_METODE_ID, RINGKAS_METODE, WARNA_METODE, kepala } from "./k1b5d-luar-1";

const IGIL = "\u{1F989}";
const WA = "#38BDF8";
const WB = "#F472B6";

/* ------------------------------ 1. Sepuluh dan Satuan: konsep ------------------------------ */
const SUARA_B1 = "Metode kedua, Sepuluh dan Satuan. Bilangan sebelas sampai dua puluh kita lihat sebagai sepuluh dan sisa.";
const SUARA_B2 = "Ambil empat belas titik. Sepuluh titik masuk ke satu kotak. Itu satu puluhan.";
const SUARA_B3 = "Sisanya empat titik di luar kotak. Itu empat satuan.";
const SUARA_B4 = "Jadi empat belas sama dengan sepuluh ditambah empat. Sepuluh dan sisa, itu cara melihat bilangan sebelas sampai dua puluh.";

export const ADEGAN_LUAR_SEPULUH: AdeganStory = {
  id: "luar-sepuluh",
  judul: "Sepuluh dan Satuan: sepuluh dan sisa",
  sumber: "Metode luar: Sepuluh dan Satuan",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_B1, tambah("kedua,", ...kepala(1)), tambah("sepuluh@2", emo("sp", 150, 120, "\u{1F51F}", 44))),
    k(SUARA_B2, hapus(0, "sp"), tambah("Ambil", teks("b14", 85, 58, "14 titik", 10, W.merah)), tambah("Sepuluh", ...puluhan("a", 30, 66, 22, 7, WA)), tambah("puluhan.", ...kartu("bp", 160, 84, 126, 26, W.krem, ["1 puluhan"], 10))),
    k(SUARA_B3, sorotkan(0, "ab"), tambah("Sisanya", ...satuan("a", 41, 134, 4, 22, 7, WB)), tambah("satuan.", ...kartu("bs", 160, 122, 126, 26, W.pink, ["4 satuan"], 10))),
    k(SUARA_B4, hapus(0, "bp-k", "bp-t0", "bs-k", "bs-t0"), tambah("Jadi", ...kartu("bj", 150, 92, 140, 32, W.emas, ["10 + 4 = 14"], 13)), sorotkan("Sepuluh@2", ...ids("a", 10, "p"))),
  ],
};

/* ------------------------------ 2. Sepuluh dan Satuan: terapan ------------------------------ */
const SUARA_C1 = "Soal cerita: Upe punya tiga belas apel, dan Halim punya tujuh belas apel. Kita pisahkan puluhan dan satuannya.";
const SUARA_C2 = "Lihat puluhannya dulu. Puluhan Upe satu, puluhan Halim juga satu. Puluhannya sama.";
const SUARA_C3 = "Karena sama, kita lihat satuannya. Satuan Upe tiga, satuan Halim tujuh. Tiga lebih sedikit dari tujuh.";
const SUARA_C4 = "Jadi tiga belas lebih kecil dari tujuh belas. Apel Halim lebih banyak, dan apel Upe lebih sedikit.";

export const ADEGAN_LUAR_SEPULUH_TERAPAN: AdeganStory = {
  id: "luar-sepuluh-terapan",
  judul: "Sepuluh dan Satuan: apel Upe dan Halim",
  sumber: "Metode luar: Sepuluh dan Satuan, terapan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, ...kepala(1)),
      tambah("Upe", teks("cu", 75, 62, "Upe: 13 apel", 9.6, W.ungu)),
      tambah("Halim", teks("ch", 217, 62, "Halim: 17 apel", 9.6, W.ungu)),
      tambah("pisahkan", ...puluhan("a", 20, 70, 22, 7, WA), ...puluhan("b", 162, 70, 22, 7, WB)),
      tambah("satuannya.", ...satuan("a", 31, 136, 3, 22, 7, WA), ...satuan("b", 173, 136, 7, 19, 6.5, WB)),
    ),
    k(SUARA_C2, sorotkan("puluhannya", "ab", "bb"), tambah("Puluhan", ...kartu("cp", 40, 164, 220, 24, W.krem, ["puluhan: 1 dan 1, sama"], 10)), sorotkan("sama.", ...ids("a", 10, "p"), ...ids("b", 10, "p"))),
    k(
      SUARA_C3,
      redamkan(0, "ab", "bb", ...ids("a", 10, "p"), ...ids("b", 10, "p")),
      hapus(0, "cp-k", "cp-t0"),
      sorotkan("satuannya.", ...ids("a", 3, "s"), ...ids("b", 7, "s")),
      tambah("tiga,", teks("ca", 75, 156, "3 satuan", 9.6, W.merah)),
      tambah("tujuh.", teks("cb", 217, 156, "7 satuan", 9.6, W.merah)),
    ),
    k(SUARA_C4, redamkan(0, ...ids("a", 3, "s"), ...ids("b", 7, "s")), tambah("Jadi", ...kartu("cj", 40, 166, 220, 24, W.emas, ["13 lebih kecil dari 17"], 10)), sorotkan("Halim", ...ids("b", 10, "p"), ...ids("b", 7, "s"))),
  ],
};

/* ------------------------------ 3. Dua Bingkai Sepuluh: konsep ------------------------------ */
const SUARA_D1 = "Metode ketiga, Dua Bingkai Sepuluh. Kita pakai dua bingkai untuk bilangan sebelas sampai dua puluh.";
const SUARA_D2 = "Ketuk petak untuk tiga belas titik: satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh, sebelas, dua belas, tiga belas.";
const SUARA_D3 = "Bingkai pertama penuh, ada sepuluh. Bingkai kedua berisi tiga. Jadi sepuluh ditambah tiga sama dengan tiga belas.";
const SUARA_D4 = "Bingkai pertama selalu kita isi sampai penuh dulu. Baru bingkai kedua. Begitu juga untuk bilangan sebelas sampai dua puluh.";
const BY2 = 64;
const PET2 = (a: number, b: number): Titik[] => Array.from({ length: b - a }, (_, i) => petak(a + i, BY2));

export const ADEGAN_LUAR_BINGKAI: AdeganStory = {
  id: "luar-bingkai",
  judul: "Dua Bingkai Sepuluh: dua bingkai untuk sebelas sampai dua puluh",
  sumber: "Metode luar: Dua Bingkai Sepuluh",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_D1, tambah("ketiga,", ...kepala(2)), tambah("bingkai", ...bingkaiDua("bf", BY2))),
    k(SUARA_D2, ...hitungMuncul(SUARA_D2, "bt", PET2(0, 13), (i) => titikPetak(`m${i}`, i, BY2), "titik", false), ...penghitung(SUARA_D2, "ct", 150, 140, 1, 13, "titik")),
    k(
      SUARA_D3,
      hapus(0, "ct"),
      sorotkan("pertama", ...Array.from({ length: 10 }, (_, i) => `bf-c${i}`)),
      redamkan("kedua", ...Array.from({ length: 10 }, (_, i) => `bf-c${i}`)),
      sorotkan("kedua", "bf-c10", "bf-c11", "bf-c12"),
      tambah("Jadi", ...kartu("bj", 70, 134, 160, 30, W.emas, ["10 + 3 = 13"], 13)),
    ),
    k(SUARA_D4, redamkan(0, "bf-c10", "bf-c11", "bf-c12"), hapus(0, "bj-k", "bj-t0"), tambah("Bingkai", ...kartu("bk", 20, 134, 260, 30, W.krem, ["bingkai pertama penuh dulu"], 10.4)), tambah("Begitu", emo("ow", 150, 190, IGIL, 22))),
  ],
};

/* ------------------------------ 4. Dua Bingkai Sepuluh: terapan ------------------------------ */
const SUARA_E1 = "Soal cerita: Malosi punya dua belas kelereng, dan Wei punya enam belas kelereng. Kita isi dua bingkai untuk tiap anak.";
const SUARA_E2 = "Isi bingkai Malosi: satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh, sebelas, dua belas. Satu bingkai penuh, bingkai kedua berisi dua.";
const SUARA_E3 = "Sekarang bingkai Wei: satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh, sebelas, dua belas, tiga belas, empat belas, lima belas, enam belas. Bingkai kedua berisi enam.";
const SUARA_E4 = "Bingkai kedua Malosi berisi dua. Bingkai kedua Wei berisi enam. Dua lebih sedikit dari enam. Jadi enam belas lebih banyak dari dua belas.";
const SEL2 = 18;
const X1 = 30;
const X2 = 150;
const YM = 66;
const YW = 122;
const dotM = (i: number): Obj => titikPetak(`mm${i}`, i, YM, W.merah, SEL2, X1, X2);
const dotW = (i: number): Obj => titikPetak(`ww${i}`, i, YW, "#2563EB", SEL2, X1, X2);
const PM = (n: number): Titik[] => Array.from({ length: n }, (_, i) => petak(i, YM, SEL2, X1, X2));
const PW = (n: number): Titik[] => Array.from({ length: n }, (_, i) => petak(i, YW, SEL2, X1, X2));

export const ADEGAN_LUAR_BINGKAI_TERAPAN: AdeganStory = {
  id: "luar-bingkai-terapan",
  judul: "Dua Bingkai Sepuluh: kelereng Malosi dan Wei",
  sumber: "Metode luar: Dua Bingkai Sepuluh, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, ...kepala(2)),
      tambah("Malosi", teks("em", 150, 58, "Malosi: 12", 9.4, W.ungu)),
      tambah("Wei", teks("ew", 150, 114, "Wei: 16", 9.4, W.ungu)),
      tambah("isi", ...bingkaiDua("mf", YM, {}, SEL2, X1, X2), ...bingkaiDua("wf", YW, {}, SEL2, X1, X2)),
    ),
    k(SUARA_E2, ...hitungMuncul(SUARA_E2, "em", PM(12), (i) => dotM(i), "Malosi", false), ...penghitung(SUARA_E2, "cm", 272, 92, 1, 12, "Malosi"), sorotkan("kedua", "mf-c10", "mf-c11")),
    k(SUARA_E3, ...hitungMuncul(SUARA_E3, "ew", PW(16), (i) => dotW(i), "Wei", false), ...penghitung(SUARA_E3, "cw", 272, 148, 1, 16, "Wei"), sorotkan("kedua", "wf-c10", "wf-c11", "wf-c12", "wf-c13", "wf-c14", "wf-c15")),
    k(
      SUARA_E4,
      tambah("Bingkai", ...kartu("ej", 40, 168, 220, 24, W.emas, ["16 lebih banyak dari 12"], 10)),
      tambah(idx(SUARA_E4, "Malosi"), kotak("sm", X2 - 2, YM - 2, SEL2 * 5 + 4, SEL2 * 2 + 4, "none", W.hijau, { rx: 2, tebal: 2.4 })),
      tambah(idx(SUARA_E4, "Wei"), kotak("sw", X2 - 2, YW - 2, SEL2 * 5 + 4, SEL2 * 2 + 4, "none", W.hijau, { rx: 2, tebal: 2.4 })),
    ),
  ],
};

/* ------------------------------ 5. Ringkasan tiga metode ------------------------------ */
const SUARA_R1 = "Mari kita ringkas tiga metode dari luar tadi.";
const SUARA_R2 = "Hitung sampai dua puluh: lanjut hitung melewati sepuluh. Sepuluh dan Satuan: bilangan sebelas sampai dua puluh jadi sepuluh dan sisa.";
const SUARA_R3 = "Dua Bingkai Sepuluh: pakai dua bingkai, isi bingkai pertama penuh dulu, lalu bingkai kedua.";
const SUARA_R4 = "Ketiganya membantu kita membandingkan dan mengurutkan bilangan sampai dua puluh. Terima kasih sudah belajar.";
const kartuMetode = (i: number): Obj[] => [kotak(`rm${i}-k`, 14, 34 + i * 54, 272, 46, WARNA_METODE[i], W.biru, { rx: 8, tebal: 1.5 }), teks(`rm${i}-n`, 150, 34 + i * 54 + 19, NAMA_METODE_ID[i], 10, W.biru)];
const deskripsi = (i: number): Obj => teks(`rm${i}-d`, 150, 34 + i * 54 + 36, RINGKAS_METODE[i], 8.8, W.merah);

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Ringkasan metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Ringkasan")), tambah("ringkas", ...kartuMetode(0)), tambah("tiga", ...kartuMetode(1)), tambah("luar", ...kartuMetode(2))),
    k(SUARA_R2, sorotkan("Hitung", "rm0-k"), tambah("melewati", deskripsi(0)), redamkan("Sepuluh@2", "rm0-k"), sorotkan("Sepuluh@2", "rm1-k"), tambah("jadi", deskripsi(1))),
    k(SUARA_R3, redamkan(0, "rm1-k"), sorotkan("Dua", "rm2-k"), tambah("pakai", deskripsi(2))),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Terima kasih"), emo("ow", 150, 100, IGIL, 54)),
      tambah("sampai", ...kartu("rz", 50, 124, 200, 34, W.emas, ["membandingkan sampai 20"], 11)),
      tambah("Terima", teks("rt", 150, 184, "Sampai jumpa!", 12, W.ungu)),
    ),
  ],
};
