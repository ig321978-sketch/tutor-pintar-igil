import type { AdeganStory, Obj } from "./logika-story";
import { W, baris, bingkaiDua, emo, judul, kartu, kelereng, petak, teks, titikPetak, type Titik } from "./k1b5d-gambar";
import { bersih, hitungMuncul, idx, penghitung, k, sorotkan, tambah, ubah } from "./k1b5d-bantu";

/** Nama metode luar dalam bahasa Indonesia saja (data sumber memuat nama Inggris, yang tidak dipakai di video). */
export const NAMA_METODE_ID = ["Hitung sampai 20", "Sepuluh dan Satuan", "Dua Bingkai Sepuluh"];
export const RINGKAS_METODE = ["lanjut hitung melewati 10", "11 sampai 20 jadi 10 dan sisa", "dua bingkai untuk 11 sampai 20"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE_ID[i]} · ${RINGKAS_METODE[i]}`], 8.8);

const ANAK = "\u{1F9D2}";
const BY1 = 64;

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara punya cara lain untuk mengajar membandingkan bilangan sampai dua puluh. Di video ini kita lihat tiga cara itu.";
const SUARA_O2 = "Tiga metode itu: Hitung sampai dua puluh, Sepuluh dan Satuan, dan Dua Bingkai Sepuluh.";
const SUARA_O3 = "Hitung sampai dua puluh artinya kita lanjut hitung melewati sepuluh. Sepuluh dan Satuan artinya bilangan sebelas sampai dua puluh kita lihat sebagai sepuluh dan sisa. Dua Bingkai Sepuluh artinya kita pakai dua bingkai untuk bilangan sebelas sampai dua puluh.";
const SUARA_O4 = "Ketiga cara ini sama-sama membantu kita membandingkan bilangan dengan mudah, dari menghitung sampai menemukan jawabannya.";
const SUARA_O5 = "Kita akan mencoba tiap cara bersama Upe, Kira, Malosi, dan Wei, di layar.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk membandingkan bilangan",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)), tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11)), tambah("puluh.", teks("p20", 150, 54, "bilangan sampai 20", 11, W.merah))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      tambah(idx(SUARA_O2, "Hitung"), ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah(idx(SUARA_O2, "Satuan"), ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah(idx(SUARA_O2, "Bingkai"), ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Apa artinya?")),
      tambah(idx(SUARA_O3, "Hitung"), ...kartu("n0", 14, 40, 272, 38, WARNA_METODE[0], [NAMA_METODE_ID[0], RINGKAS_METODE[0]], 9.6)),
      tambah(idx(SUARA_O3, "Satuan"), ...kartu("n1", 14, 88, 272, 38, WARNA_METODE[1], [NAMA_METODE_ID[1], RINGKAS_METODE[1]], 9.6)),
      tambah(idx(SUARA_O3, "Bingkai"), ...kartu("n2", 14, 136, 272, 38, WARNA_METODE[2], [NAMA_METODE_ID[2], RINGKAS_METODE[2]], 9.6)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Dari menghitung ke jawaban")),
      tambah("membantu", emo("i1", 60, 90, "\u{1F463}", 40), emo("i2", 150, 90, "\u{1F9E9}", 40), emo("i3", 240, 90, "\u{1F51F}", 40)),
      tambah("mudah,", ...kartu("iq", 30, 124, 240, 44, W.emas, ["membandingkan dengan mudah", "dari hitungan sampai jawaban"], 10)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Dicoba di layar")),
      ...[["Upe", 45], ["Kira", 115], ["Malosi", 185], ["Wei", 255]].map(([nama, px]) => tambah(nama as string, emo(`o-${nama}`, px as number, 110, ANAK, 34), teks(`on-${nama}`, px as number, 130, nama as string, 8.6))),
      tambah("layar.", ...kartu("ot", 40, 150, 220, 30, W.krem, ["bingkai, titik, dan angka"], 10)),
    ),
  ],
};

/* ------------------------------ 2. Hitung sampai 20: konsep ------------------------------ */
const SUARA_A1 = "Metode pertama, Hitung sampai dua puluh. Kita hitung benda satu per satu, dan tidak berhenti di sepuluh.";
const SUARA_A2 = "Ketuk kelereng di layar: satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh. Bingkai pertama sudah penuh.";
const SUARA_A3 = "Lanjut hitung melewati sepuluh: sebelas, dua belas, tiga belas, empat belas, lima belas, enam belas. Ada enam belas titik.";
const SUARA_A4 = "Jadi kita terus menghitung, tidak berhenti di sepuluh. Sampai dua puluh pun bisa kita hitung.";
const PTS = (a: number, b: number): Titik[] => Array.from({ length: b - a }, (_, i) => petak(a + i, BY1));

export const ADEGAN_LUAR_HITUNG: AdeganStory = {
  id: "luar-hitung",
  judul: "Hitung sampai 20: lanjut hitung melewati sepuluh",
  sumber: "Metode luar: Hitung sampai 20",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_A1, tambah("pertama,", ...kepala(0)), tambah("benda", ...bingkaiDua("bf", BY1))),
    k(
      SUARA_A2,
      ...hitungMuncul(SUARA_A2, "bt", PTS(0, 10), (i) => titikPetak(`m${i}`, i, BY1), "layar", false),
      ...penghitung(SUARA_A2, "ct", 150, 140, 1, 10, "layar"),
      tambah("penuh.", teks("tp", 80, 130, "penuh: 10", 10, W.merah)),
    ),
    k(
      SUARA_A3,
      ...hitungMuncul(SUARA_A3, "bu", PTS(10, 16), (i) => titikPetak(`m${10 + i}`, 10 + i, BY1), "melewati", false, 11),
      ...penghitung(SUARA_A3, "ct", 150, 140, 11, 16, "melewati", true),
      tambah(idx(SUARA_A3, "titik"), teks("tt", 150, 170, "16 titik", 13, W.merah)),
    ),
    k(
      SUARA_A4,
      tambah("Sampai", ...[16, 17, 18, 19].map((i) => titikPetak(`m${i}`, i, BY1, W.hijau))),
      ubah("pun", { id: "tt", isi: "20 titik" }),
    ),
  ],
};

/* ------------------------------ 3. Hitung sampai 20: terapan ------------------------------ */
const SUARA_T1 = "Soal cerita: Kira punya kelereng, dan Wei juga punya kelereng. Siapa yang kelerengnya lebih banyak? Kita hitung dulu.";
const SUARA_T2 = "Hitung kelereng Kira dulu: satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh, sebelas, dua belas, tiga belas, empat belas, lima belas, enam belas, tujuh belas.";
const SUARA_T3 = "Lalu kelereng Wei, hitung juga: satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh, sebelas, dua belas, tiga belas, empat belas.";
const SUARA_T4 = "Tujuh belas lebih banyak dari empat belas. Jadi kelereng Kira lebih banyak, dan kelereng Wei lebih sedikit.";
const KIRA: Titik[] = baris(17, 84, 22, 15.5);
const WEI: Titik[] = baris(14, 140, 22, 15.5);

export const ADEGAN_LUAR_HITUNG_TERAPAN: AdeganStory = {
  id: "luar-hitung-terapan",
  judul: "Hitung sampai 20: kelereng Kira dan Wei",
  sumber: "Metode luar: Hitung sampai 20, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, ...kepala(0)),
      tambah("Kira", teks("nk", 150, 62, "Kira", 9.4, W.ungu), ...KIRA.map((p, i) => kelereng(`ki${i}`, p.x, p.y, 6.5, i))),
      tambah("Wei", teks("nw", 150, 118, "Wei", 9.4, W.ungu), ...WEI.map((p, i) => kelereng(`we${i}`, p.x, p.y, 6.5, i + 2))),
    ),
    k(SUARA_T2, ...hitungMuncul(SUARA_T2, "k", KIRA, () => [], "dulu", true, 1, 13), ubah(idx(SUARA_T2, "belas", 6), { id: "nk", isi: "Kira: 17", warna: W.merah })),
    k(SUARA_T3, ...hitungMuncul(SUARA_T3, "w", WEI, () => [], "juga", true, 1, 13), ubah(idx(SUARA_T3, "belas", 3), { id: "nw", isi: "Wei: 14", warna: W.merah })),
    k(SUARA_T4, sorotkan("Jadi", ...KIRA.map((_, i) => `ki${i}`)), tambah("banyak", ...kartu("tk", 30, 160, 240, 24, W.emas, ["17 lebih banyak dari 14"], 10))),
  ],
};
