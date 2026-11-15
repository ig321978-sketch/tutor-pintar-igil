import type { AdeganStory, Obj } from "./logika-story";
import { W, WB, angka, bingkai, bulat, emo, judul, kartu, keping, panah, teks } from "./k1b5b-gambar";
import { bersih, bilKe, hapus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k1b5b-bantu";
import { NAMA_METODE_ID, WARNA_METODE, kepala } from "./k1b5b-luar-1";

/* ------------------------------ 1. Sepuluh dan Satuan: konsep ------------------------------ */
const SUARA_S1 = "Metode kedua, Sepuluh dan Satuan. Bilangan sebelas sampai dua puluh bisa dipecah menjadi sepuluh dan sisanya.";
const SUARA_S2 = "Lihat empat belas. Empat belas adalah sepuluh dan empat.";
const SUARA_S3 = "Tiga belas adalah sepuluh dan tiga. Dua belas adalah sepuluh dan dua. Setiap kali, sepuluhnya tetap.";
const SUARA_S4 = "Kalau menghitung maju, sepuluhnya tetap dan sisanya naik. Kalau menghitung mundur, sepuluhnya tetap dan sisanya turun.";

export const ADEGAN_LUAR_SATUAN: AdeganStory = {
  id: "luar-satuan",
  judul: "Sepuluh dan Satuan: pecah menjadi sepuluh dan sisa",
  sumber: "Metode luar: Sepuluh dan Satuan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, ...kepala(1)),
      tambah("Bilangan", teks("sr", 150, 76, "11 sampai 20", 14, W.ungu)),
      tambah(idx(SUARA_S1, "Sepuluh"), ...angka("sa", 50, 100, 10, 90, 56, W.hijauMuda, 30)),
      tambah("sisanya.", ...kartu("sb", 160, 100, 90, 56, W.merahMuda, ["sisa"], 20)),
    ),
    k(
      SUARA_S2,
      bersih(0),
      tambah(0, ...kepala(1)),
      tambah("Lihat", ...angka("sc", 110, 58, 14, 80, 46, W.langit, 28)),
      tambah(idx(SUARA_S2, "sepuluh"), panah("sp1", 130, 106, -40, 22, W.merah, 2.4), ...angka("sd", 40, 134, 10, 70, 46, W.hijauMuda, 26)),
      tambah(idx(SUARA_S2, "empat", 3), panah("sp2", 170, 106, 40, 22, W.merah, 2.4), ...angka("se", 190, 134, 4, 70, 46, W.merahMuda, 26)),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, ...kepala(1)),
      tambah("Tiga", teks("sf0", 150, 86, "13: 10 dan 3", 16, W.biru)),
      tambah(idx(SUARA_S3, "Dua"), teks("sf1", 150, 118, "12: 10 dan 2", 16, W.biru)),
      tambah("tetap.", ...kartu("sg", 60, 140, 180, 36, W.hijauMuda, ["sepuluhnya tetap: 10"], 11)),
    ),
    k(
      SUARA_S4,
      bersih(0),
      tambah(0, ...kepala(1)),
      tambah("maju,", ...kartu("sh", 12, 56, 134, 100, W.hijauMuda, ["maju", "10 dan 1", "10 dan 2", "10 dan 3"], 10.5), panah("si", 79, 160, 0, 30, W.hijau, 2.6)),
      tambah("mundur,", ...kartu("sj", 154, 56, 134, 100, W.merahMuda, ["mundur", "10 dan 3", "10 dan 2", "10 dan 1"], 10.5), panah("sk", 221, 190, 0, -30, W.merah, 2.6)),
      sorotkan("naik", "sh-k"),
      redamkan("Kalau@2", "sh-k"),
      sorotkan("turun.", "sj-k"),
    ),
  ],
};

/* ------------------------------ 2. Sepuluh dan Satuan: terapan ------------------------------ */
const SUARA_T1 = "Wei bertemu ulat bilangan lagi. Badan ulat bertanda sepuluh, sebelas, satu bulatan kosong, dan tiga belas.";
const SUARA_T2 = "Pakai cara Sepuluh dan Satuan. Sebelas adalah sepuluh dan satu. Tiga belas adalah sepuluh dan tiga.";
const SUARA_T3 = "Sisanya satu, lalu kosong, lalu tiga. Kalau sisanya naik satu demi satu, yang kosong punya sisa dua.";
const SUARA_T4 = "Sepuluh dan dua, itu bilangan apa? Pilih kartu angka yang pas, lalu seret ke badan ulat.";
const SUARA_T5 = "Ketuk dua belas. Benar! Sepuluh dan dua adalah dua belas. Hebat sekali!";
const UX = [45, 95, 145, 195];
const ruas = (i: number, isi: number | null): Obj[] => [
  bulat(`tu${i}`, UX[i], 86, 21, isi === null ? W.krem : WB.kuning, W.biru, { tebal: 1.8 }),
  teks(`tut${i}`, UX[i], 91, isi === null ? "?" : String(isi), 14, isi === null ? W.merah : W.biru),
];

export const ADEGAN_LUAR_SATUAN_TERAPAN: AdeganStory = {
  id: "luar-satuan-terapan",
  judul: "Sepuluh dan Satuan: ulat bilangan",
  sumber: "Metode luar: Sepuluh dan Satuan, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, ...kepala(1)),
      tambah(0, bulat("tu-h", 245, 86, 24, W.hijau, W.biru, { tebal: 1.8 }), emo("tu-m", 245, 93, "\u{1F60A}", 20)),
      tambah(idx(SUARA_T1, "sepuluh"), ...ruas(0, 10)),
      tambah(idx(SUARA_T1, "sebelas"), ...ruas(1, 11)),
      tambah("kosong,", ...ruas(2, null)),
      tambah(idx(SUARA_T1, "tiga"), ...ruas(3, 13)),
    ),
    k(
      SUARA_T2,
      tambah(idx(SUARA_T2, "Sebelas"), teks("tv1", UX[1], 130, "10 dan 1", 9.4, W.hijau)),
      tambah(idx(SUARA_T2, "Tiga"), teks("tv3", UX[3], 130, "10 dan 3", 9.4, W.hijau)),
    ),
    k(
      SUARA_T3,
      tambah("Sisanya", teks("tw1", UX[1], 150, "sisa 1", 10, W.biru), teks("tw3", UX[3], 150, "sisa 3", 10, W.biru)),
      tambah("kosong,", teks("tw2", UX[2], 150, "sisa ?", 10, W.merah)),
      ubah(idx(SUARA_T3, "dua"), { id: "tw2", isi: "sisa 2", warna: W.hijau }),
      sorotkan(idx(SUARA_T3, "dua"), "tu2"),
    ),
    k(
      SUARA_T4,
      redamkan(0, "tu2"),
      tambah("Pilih", ...angka("tk0", 45, 164, 12, 50, 34, W.langit, 18), ...angka("tk1", 125, 164, 14, 50, 34, W.langit, 18), ...angka("tk2", 205, 164, 16, 50, 34, W.langit, 18)),
      sorotkan("apa?", "tu2"),
    ),
    k(
      SUARA_T5,
      redamkan(0, "tu2"),
      sorotkan("Ketuk", "tk0-k"),
      ubah(idx(SUARA_T5, "Benar"), { id: "tk0-k", sorot: false }, { id: "tut2", isi: "12", warna: W.biru }, { id: "tu2", warna: W.hijauMuda }),
      tambah("Hebat", emo("ow", 245, 140, "\u{1F989}", 26)),
    ),
  ],
};

/* ------------------------------ 3. Dua Bingkai Sepuluh: konsep ------------------------------ */
const SUARA_B1 = "Metode ketiga, Dua Bingkai Sepuluh. Satu bingkai punya sepuluh kotak, dua baris dengan lima kotak tiap baris.";
const SUARA_B2 = "Untuk bilangan sebelas sampai dua puluh, kita pakai dua bingkai. Bingkai pertama penuh, isinya sepuluh.";
const SUARA_B3 = "Bingkai kedua berisi sisanya. Ini lima belas: satu bingkai penuh dan lima kepingnya di bingkai kedua.";
const SUARA_B4 = "Kalau bingkai kedua juga penuh, banyaknya dua puluh. Dua bingkai penuh, sepuluh dan sepuluh.";
const FA = { x: 30, y: 84 };
const FB = { x: 190, y: 84 };

export const ADEGAN_LUAR_BINGKAI: AdeganStory = {
  id: "luar-bingkai",
  judul: "Dua Bingkai Sepuluh: dua bingkai untuk sebelas sampai dua puluh",
  sumber: "Metode luar: Dua Bingkai Sepuluh",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, ...kepala(2)),
      tambah(idx(SUARA_B1, "bingkai", 2), ...bingkai("fa", 110, 76)),
      tambah("sepuluh", ...keping("fa", 110, 76, 0, 9, WB.biru), teks("fl", 150, 130, "10", 18, W.merah)),
    ),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, ...kepala(2)),
      tambah("sebelas", teks("fr", 150, 70, "11 sampai 20", 12, W.ungu)),
      tambah("dua", ...bingkai("fa", FA.x, FA.y), ...bingkai("fb", FB.x, FB.y)),
      tambah("penuh,", ...keping("fa", FA.x, FA.y, 0, 9, WB.biru)),
      tambah("isinya", teks("fl", FA.x + 40, 134, "10", 18, W.merah)),
    ),
    k(
      SUARA_B3,
      sorotkan("kedua", ...Array.from({ length: 10 }, (_, i) => `fbc${i}`)),
      redamkan("Ini", ...Array.from({ length: 10 }, (_, i) => `fbc${i}`)),
      tambah(idx(SUARA_B3, "kepingnya"), ...keping("fb", FB.x, FB.y, 0, 4, WB.kuning)),
      tambah(bilKe(SUARA_B3, 15), teks("fm", 150, 170, "15", 22, W.hijau)),
    ),
    k(
      SUARA_B4,
      ubah(0, { id: "fm", isi: "20" }),
      tambah("penuh,", ...keping("fb", FB.x, FB.y, 5, 9, WB.kuning)),
      tambah("sepuluh", teks("fn", 150, 192, "10 dan 10", 11, W.ungu)),
    ),
  ],
};

/* ------------------------------ 4. Dua Bingkai Sepuluh: terapan roket hitung mundur ------------------------------ */
const SUARA_R1 = "Kira punya sebuah roket. Dua bingkai menunjukkan lima belas: satu bingkai penuh, dan lima keping di bingkai kedua.";
const SUARA_R2 = "Mulai hitung mundur. Ketuk keping terakhir, dan lima belas menjadi empat belas.";
const SUARA_R3 = "Ketuk lagi. Tiga belas, dua belas, sebelas. Keping di bingkai kedua tinggal satu.";
const SUARA_R4 = "Ketuk sekali lagi, kepingnya pergi, dan tersisa sepuluh. Tinggal satu bingkai penuh.";
const SUARA_R5 = "Roket meluncur! Dari lima belas kita menghitung mundur sampai sepuluh, dan satu bingkai penuh tersisa.";
const LABEL_R = (n: number): Obj => teks("rl", 150, 150, String(n), 20, W.merah);

export const ADEGAN_LUAR_BINGKAI_TERAPAN: AdeganStory = {
  id: "luar-bingkai-terapan",
  judul: "Dua Bingkai Sepuluh: roket hitung mundur",
  sumber: "Metode luar: Dua Bingkai Sepuluh, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, ...kepala(2)),
      tambah("roket.", emo("rk", 40, 190, "\u{1F680}", 30)),
      tambah("Dua", ...bingkai("fa", FA.x, FA.y), ...bingkai("fb", FB.x, FB.y)),
      tambah("penuh,", ...keping("fa", FA.x, FA.y, 0, 9, WB.biru)),
      tambah(idx(SUARA_R1, "keping"), ...keping("fb", FB.x, FB.y, 0, 4, WB.kuning)),
      tambah(bilKe(SUARA_R1, 15), LABEL_R(15)),
    ),
    k(
      SUARA_R2,
      tambah("Ketuk", emo("tg", FB.x + sbOff(4), FB.y + 50, "\u{1F446}", 20)),
      hapus("terakhir,", "fbb4"),
      ubah(bilKe(SUARA_R2, 14), { id: "rl", isi: "14" }),
    ),
    k(
      SUARA_R3,
      hapus(bilKe(SUARA_R3, 13), "fbb3"),
      ubah(bilKe(SUARA_R3, 13), { id: "rl", isi: "13" }, { id: "tg", x: FB.x + sbOff(3) }),
      hapus(bilKe(SUARA_R3, 12), "fbb2"),
      ubah(bilKe(SUARA_R3, 12), { id: "rl", isi: "12" }, { id: "tg", x: FB.x + sbOff(2) }),
      hapus(bilKe(SUARA_R3, 11), "fbb1"),
      ubah(bilKe(SUARA_R3, 11), { id: "rl", isi: "11" }, { id: "tg", x: FB.x + sbOff(1) }),
    ),
    k(
      SUARA_R4,
      hapus("pergi,", "fbb0"),
      ubah(bilKe(SUARA_R4, 10), { id: "rl", isi: "10" }, { id: "tg", x: FB.x + sbOff(0) }),
      sorotkan("Tinggal", ...Array.from({ length: 10 }, (_, i) => `fac${i}`)),
    ),
    k(
      SUARA_R5,
      hapus(0, "tg"),
      redamkan(0, ...Array.from({ length: 10 }, (_, i) => `fac${i}`)),
      tambah("Dari", teks("rm", 150, 176, "mulai 15, mundur ke 10", 10.5, W.ungu)),
      ubah("meluncur!", { id: "rk", y: 150 }),
      tambah("meluncur!", emo("ap", 40, 192, "\u{1F525}", 20)),
    ),
  ],
};
/** Letak mendatar pusat sel ke-i (0 sampai 4, baris atas) terhadap pojok kiri bingkai. */
function sbOff(i: number): number {
  return 8 + (i % 5) * 16;
}

/* ------------------------------ 5. Ringkasan ------------------------------ */
const SUARA_Z1 = "Kita ringkas tiga metode. Metode pertama, Hitung sampai dua puluh: lanjut hitung melewati sepuluh.";
const SUARA_Z2 = "Metode kedua, Sepuluh dan Satuan: sebelas sampai dua puluh adalah sepuluh dan sisanya.";
const SUARA_Z3 = "Metode ketiga, Dua Bingkai Sepuluh: dua bingkai untuk bilangan sebelas sampai dua puluh.";
const SUARA_Z4 = "Ketiganya membantu kita menghitung maju dan mundur. Pilih cara yang paling cocok untukmu. Sampai jumpa!";
const DETAIL = ["lanjut melewati 10, sampai 20", "11 sampai 20: 10 dan sisa", "dua bingkai: 11 sampai 20"];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Ringkasan metode luar",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Ringkasan tiga metode")),
      tambah("pertama,", ...kartu("zm0", 20, 36, 260, 46, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`, DETAIL[0]], 10.5)),
    ),
    k(SUARA_Z2, tambah("kedua,", ...kartu("zm1", 20, 90, 260, 46, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`, DETAIL[1]], 10.5))),
    k(SUARA_Z3, tambah("ketiga,", ...kartu("zm2", 20, 144, 260, 46, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`, DETAIL[2]], 10.5))),
    k(
      SUARA_Z4,
      bersih(0),
      tambah(0, judul("Sampai jumpa!"), emo("zo", 150, 100, "\u{1F989}", 56)),
      tambah("Pilih", ...kartu("zt", 40, 130, 220, 34, W.emas, ["pilih cara yang cocok"], 11)),
    ),
  ],
};
