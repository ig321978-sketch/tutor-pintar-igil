import type { AdeganStory, Obj } from "./logika-story";
import { W, bulat, emo, garis, judul, kartu, kelompok, kotak, teks } from "./k1b2b-gambar";
import { bersih, hitungAksi, idx, k, sorotkan, tambah, ubah } from "./k1b2b-bantu";

/* ------------------------------ 1. Upe melompat di petak angka ------------------------------ */
const PX = (i: number): number => 26 + 24 * i;
/** Deret petak nol sampai sepuluh: kotak `pt{i}` dan angka `pn{i}`. */
const petak = (): Obj[] =>
  Array.from({ length: 11 }, (_, i) => i).flatMap((i) => [kotak(`pt${i}`, 14 + 24 * i, 110, 24, 24, i === 0 ? W.putih : W.krem, W.biru, { rx: 2, tebal: 1.3 }), teks(`pn${i}`, PX(i), 126, String(i), 10, W.merah)]);

const SUARA_M1 = "Upe berdiri di petak angka lima. Di depannya ada petak enam, tujuh, dan delapan.";
const SUARA_M2 = "Upe akan melompat tiga langkah ke depan. Kita tulis dulu, lima tambah tiga.";
const SUARA_M3 = "Lompatan pertama, enam. Lompatan kedua, tujuh. Lompatan ketiga, delapan.";
const SUARA_M4 = "Sekarang Upe berada di petak delapan. Jadi lima tambah tiga sama dengan delapan.";
const SUARA_M5 = "Cara ini cepat. Kita tidak perlu menghitung lagi dari awal. Kita mulai dari bilangan pertama, lalu maju.";
const SUARA_M6 = "Coba lagi. Upe mulai dari empat dan maju dua langkah. Lima, enam. Jadi empat tambah dua sama dengan enam.";
const SUARA_M7 = "Ingat, bilangan pertama tidak perlu dihitung lagi. Kita hanya menghitung langkah majunya.";

export const ADEGAN_MAJU: AdeganStory = {
  id: "maju",
  judul: "Upe melompat di petak angka",
  sumber: "Materi: maju dari bilangan pertama",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_M1, tambah(0, judul("Petak angka")), tambah("petak", ...petak()), tambah("lima.", emo("up", PX(5), 104, "\u{1F9D2}", 22)), sorotkan("lima.", "pt5")),
    k(SUARA_M2, tambah("tulis", teks("mt", 150, 62, "5 + 3", 28, W.ungu))),
    k(
      SUARA_M3,
      tambah("pertama,", teks("lm0", PX(6), 152, "1", 14, W.hijau)),
      ubah("enam.", { id: "up", x: PX(6) }),
      tambah("kedua,", teks("lm1", PX(7), 152, "2", 14, W.hijau)),
      ubah("tujuh.", { id: "up", x: PX(7) }),
      tambah("ketiga,", teks("lm2", PX(8), 152, "3", 14, W.hijau)),
      ubah("delapan.", { id: "up", x: PX(8) }),
    ),
    k(SUARA_M4, sorotkan("delapan.", "pt8"), ubah("tambah", { id: "mt", isi: "5 + 3 = 8", warna: W.hijau })),
    k(
      SUARA_M5,
      bersih(0),
      tambah(0, judul("Cara yang cepat"), emo("ow5", 150, 76, "\u{1F989}", 44)),
      tambah("mulai", ...kartu("mc", 30, 104, 240, 50, W.hijauMuda, ["mulai dari bilangan pertama", "lalu maju"], 10.5)),
    ),
    k(
      SUARA_M6,
      bersih(0),
      tambah(0, judul("Coba lagi"), ...petak()),
      tambah(idx(SUARA_M6, "empat", 1), emo("up", PX(4), 104, "\u{1F9D2}", 22)),
      sorotkan(idx(SUARA_M6, "empat", 1), "pt4"),
      ubah(idx(SUARA_M6, "lima", 1), { id: "up", x: PX(5) }),
      ubah(idx(SUARA_M6, "enam", 1), { id: "up", x: PX(6) }),
      tambah(idx(SUARA_M6, "enam", 2), teks("mt2", 150, 62, "4 + 2 = 6", 28, W.hijau)),
    ),
    k(SUARA_M7, bersih(0), tambah(0, judul("Ingat!"), emo("ow7", 150, 76, "\u{1F989}", 44)), tambah("bilangan", ...kartu("mi", 30, 104, 240, 40, W.krem, ["bilangan pertama: tidak dihitung", "langkah maju: dihitung"], 9.6))),
  ],
};

/* ------------------------------ 2. Kue dari meja ke kotak ------------------------------ */
const SUARA_Q1 = "Malosi punya sebuah kotak berisi empat kue. Di atas meja ada tiga kue lagi.";
const SUARA_Q2 = "Kita seret kue dari meja ke dalam kotak. Mulai dari empat, lalu lima, enam, tujuh.";
const SUARA_Q3 = "Sekarang di kotak ada tujuh kue. Jadi empat tambah tiga sama dengan tujuh.";
const SUARA_Q4 = "Bilangan pertama boleh ditukar. Tiga tambah empat juga sama dengan tujuh. Mulai dari bilangan yang besar lebih cepat.";
const SUARA_Q5 = "Ayo coba yang kecil. Di kotak ada dua kue dan di meja ada satu kue. Dua tambah satu sama dengan tiga.";
const KX = (i: number): number => 34 + 22 * i;
const MEJA = [205, 235, 265];

export const ADEGAN_KUE: AdeganStory = {
  id: "kue",
  judul: "Menyeret kue ke dalam kotak",
  sumber: "Materi: maju dengan kue",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Kue Malosi"), kotak("kb", 14, 96, 170, 40, W.krem, W.coklat, { rx: 6, tebal: 1.8 })),
      tambah("empat", ...kelompok("kue", "kq", 4, 112, KX(0), 22, 9), teks("l4", 70, 152, "4 kue", 9.4, W.ungu)),
      tambah("meja", kotak("mj", 190, 120, 100, 7, W.coklat, W.coklat, { rx: 2 })),
      tambah("tiga", ...MEJA.map((x, i) => emo(`kr${i}`, x, 118.9, "\u{1F36A}", 19.8)), teks("l3", 235, 152, "3 kue", 9.4, W.ungu)),
    ),
    k(
      SUARA_Q2,
      sorotkan(idx(SUARA_Q2, "empat"), "kq0", "kq1", "kq2", "kq3"),
      ubah(idx(SUARA_Q2, "lima"), { id: "kr0", x: KX(4) }),
      tambah(idx(SUARA_Q2, "lima"), teks("ql0", KX(4), 90, "5", 11, W.merah)),
      ubah(idx(SUARA_Q2, "enam"), { id: "kr1", x: KX(5) }),
      tambah(idx(SUARA_Q2, "enam"), teks("ql1", KX(5), 90, "6", 11, W.merah)),
      ubah(idx(SUARA_Q2, "tujuh"), { id: "kr2", x: KX(6) }),
      tambah(idx(SUARA_Q2, "tujuh"), teks("ql2", KX(6), 90, "7", 11, W.merah)),
    ),
    k(SUARA_Q3, tambah("tujuh", teks("qs", 150, 184, "4 + 3 = 7", 24, W.hijau))),
    k(
      SUARA_Q4,
      ubah(0, { id: "qs", x: 80, u: 18 }),
      tambah("Tiga", teks("qt", 220, 184, "3 + 4 = 7", 18, W.hijau)),
      tambah("Mulai", emo("ow4", 262, 70, "\u{1F989}", 26)),
    ),
    k(
      SUARA_Q5,
      bersih(0),
      tambah(0, judul("Coba yang kecil")),
      tambah("dua", ...kelompok("kue", "qa", 2, 84, 100, 30, 11)),
      tambah("satu", ...kelompok("kue", "qb", 1, 84, 200, 30, 11)),
      tambah("Dua@2", teks("qx", 150, 150, "2 + 1 = 3", 30, W.hijau)),
    ),
  ],
};

/* ------------------------------ 3. Kepik kembar ------------------------------ */
const TOTOL: [number, number][] = [[90, 84], [118, 92], [96, 116], [210, 84], [182, 92], [204, 116]];
const PTS_TOTOL = TOTOL.map(([x, y]) => ({ x, y }));
const totol = (dari: number, sampai: number): Obj[] => TOTOL.slice(dari, sampai).map(([x, y], i) => bulat(`tt${dari + i}`, x, y, 7, "#1F2937", "#1F2937", { tebal: 1 }));
const sayap = (): Obj[] => [
  bulat("wk", 105, 100, 44, "#FCA5A5", W.biru),
  bulat("wn", 195, 100, 44, "#FCA5A5", W.biru),
  garis("bd", 150, 52, 0, 96, W.biru, 3),
  teks("sk", 105, 164, "sayap kiri", 9.4, W.ungu),
  teks("sn", 195, 164, "sayap kanan", 9.4, W.ungu),
];

const SUARA_K1 = "Lihat kepik ini. Sayap kirinya punya tiga totol.";
const SUARA_K2 = "Sayap kanannya juga punya tiga totol. Banyak totol di sayap kiri dan kanan sama.";
const SUARA_K3 = "Kita hitung semua totolnya. Satu, dua, tiga, empat, lima, enam. Ada enam totol.";
const SUARA_K5 = "Coba ingat: kepik punya tiga totol di kiri dan tiga totol di kanan. Itu bilangan kembar yang pertama.";
const SUARA_K4 = "Tiga ditambah tiga sama dengan enam. Bilangan yang sama ditambahkan disebut penjumlahan berulang, atau bilangan kembar.";

export const ADEGAN_KEMBAR: AdeganStory = {
  id: "kembar",
  judul: "Kepik kembar: tiga tambah tiga",
  sumber: "Materi: penjumlahan berulang",
  latar: "#FFF1F2",
  ketukan: [
    k(SUARA_K1, tambah(0, judul("Kepik kembar"), ...sayap()), tambah("tiga", ...totol(0, 3))),
    k(SUARA_K2, tambah("tiga", ...totol(3, 6))),
    k(SUARA_K3, ...hitungAksi(SUARA_K3, "tt", PTS_TOTOL, "totolnya."), tambah(idx(SUARA_K3, "enam", 2), teks("tj", 150, 192, "6 totol", 12, W.ungu))),
    k(
      SUARA_K4,
      bersih(0),
      tambah(0, judul("Bilangan kembar")),
      tambah("Tiga", teks("kz", 150, 72, "3 + 3 = 6", 38, W.hijau)),
      tambah("penjumlahan", ...kartu("kb1", 40, 104, 220, 30, W.emas, ["penjumlahan berulang"], 11)),
      tambah("kembar.", ...kartu("kb2", 40, 144, 220, 30, W.langit, ["bilangan kembar"], 11)),
    ),
    k(SUARA_K5, bersih(0), tambah(0, judul("Kepik kembar"), emo("kp", 150, 90, "\u{1F41E}", 52)), tambah("tiga", teks("kq1", 90, 140, "3", 34, W.merah)), tambah(idx(SUARA_K5, "tiga", 2), teks("kq2", 210, 140, "3", 34, W.merah)), tambah("kembar", ...kartu("kq3", 60, 154, 180, 30, W.emas, ["3 + 3 = 6"], 12))),
  ],
};

/* ------------------------------ 4. Kembar yang lain ------------------------------ */
const SUARA_L1 = "Ada kembar yang lain. Dua tambah dua sama dengan empat.";
const SUARA_L2 = "Empat tambah empat sama dengan delapan. Dua bilangannya sama, jadi kembar.";
const SUARA_L3 = "Lima tambah lima sama dengan sepuluh. Lima jari di tangan kiri dan lima jari di tangan kanan.";
const SUARA_L4 = "Kembar mudah dikenali. Dua bilangannya sama. Kalau berbeda, itu bukan kembar.";

export const ADEGAN_KEMBAR_LAIN: AdeganStory = {
  id: "kembar-lain",
  judul: "Bilangan kembar yang lain",
  sumber: "Materi: bilangan kembar",
  latar: "#FDF4FF",
  ketukan: [
    k(SUARA_L1, tambah(0, judul("Kembar yang lain")), tambah("Dua", teks("la", 150, 80, "2 + 2 = 4", 36, W.hijau))),
    k(SUARA_L2, tambah("Empat", teks("lb", 150, 140, "4 + 4 = 8", 36, W.hijau)), sorotkan("kembar.", "la", "lb")),
    k(
      SUARA_L3,
      bersih(0),
      tambah(0, judul("Dua tangan")),
      tambah("Lima", teks("lc", 150, 150, "5 + 5 = 10", 34, W.hijau)),
      tambah(idx(SUARA_L3, "kiri"), emo("hk", 85, 100, "\u{1F590}", 52)),
      tambah(idx(SUARA_L3, "kanan."), emo("hn", 215, 100, "\u{1F590}", 52)),
    ),
    k(
      SUARA_L4,
      bersih(0),
      tambah(0, judul("Kembar atau bukan?")),
      tambah("sama.", ...kartu("lk", 20, 40, 260, 44, W.hijauMuda, ["3 + 3", "dua bilangan sama: kembar"], 10.5)),
      tambah("berbeda,", ...kartu("lt", 20, 100, 260, 44, W.pink, ["2 + 5", "dua bilangan beda: bukan kembar"], 10.5)),
    ),
  ],
};
