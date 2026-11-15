import type { AdeganStory } from "./logika-story";
import { OWL, W, bingkai, deret, emo, garisBilangan, judul, kartu, lompat, pusatSel, teks, xBil, type Titik } from "./k1b6B-gambar";
import { bersih, hapus, hitungAksi, k, pindah, redamkan, sorotkan, tambah, ubah, urutBilangan } from "./k1b6B-bantu";

const baris = (n: number, y: number, x0 = 28, dx = 38): Titik[] => Array.from({ length: n }, (_, i) => ({ x: x0 + i * dx, y }));
const idr = (p: string, a: number, b: number): string[] => Array.from({ length: b - a }, (_, i) => `${p}${a + i}`);

/* ------------------------------ 1. Garis bilangan: maju ------------------------------ */
const SUARA_G1 = "Kita bisa melihat cara ini di garis bilangan. Ini garis bilangan dari tujuh sampai tiga belas.";
const SUARA_G2 = "Katak mulai berdiri di bilangan tujuh. Setiap melompat, katak maju satu langkah ke kanan.";
const SUARA_G3 = "Ayo lompat tiga kali. Delapan, sembilan, sepuluh.";
const SUARA_G4 = "Lanjut lagi. Sebelas, dua belas, tiga belas. Katak mendarat di tiga belas.";
const SUARA_G5 = "Katak melompat enam kali dari tujuh, dan mendarat di tiga belas. Jadi tujuh ditambah enam sama dengan tiga belas.";
const SUARA_G6 = "Maju berarti bergerak ke kanan. Makin ke kanan, bilangannya makin besar.";
const GX = (n: number): number => xBil(n, 7, 13);
const posG3 = urutBilangan(SUARA_G3, 8, 10, "kali.");
const posG4 = urutBilangan(SUARA_G4, 11, 13, "lagi.");

export const ADEGAN_GARIS_MAJU: AdeganStory = {
  id: "garis-maju",
  judul: "Maju di garis bilangan",
  sumber: "Materi: garis bilangan maju",
  latar: "#ECFEFF",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Garis bilangan")), tambah("garis", ...garisBilangan(110, 7, 13))),
    k(
      SUARA_G2,
      tambah("Katak", emo("kt", GX(7), 78, "\u{1F438}", 22)),
      sorotkan("tujuh.", "gb-n7"),
      tambah("kanan.", teks("kn", 150, 170, "maju: ke kanan, satu langkah", 9.6, W.hijau)),
    ),
    k(SUARA_G3, redamkan(0, "gb-n7"), ...posG3.flatMap((p, i) => [tambah(p, lompat(`lp${8 + i}`, 7 + i, 8 + i, 110, 7, 13)), ubah(p, { id: "kt", x: GX(8 + i) })])),
    k(SUARA_G4, hapus(0, "kn"), ...posG4.flatMap((p, i) => [tambah(p, lompat(`lp${11 + i}`, 10 + i, 11 + i, 110, 7, 13)), ubah(p, { id: "kt", x: GX(11 + i) })]), sorotkan("mendarat", "gb-n13")),
    k(
      SUARA_G5,
      redamkan(0, "gb-n13"),
      sorotkan("tujuh", "gb-n7"),
      tambah("Jadi", ...kartu("gj", 60, 150, 180, 26, W.emas, ["7 + 6 = 13"], 11)),
    ),
    k(
      SUARA_G6,
      redamkan(0, "gb-n7"),
      hapus(0, "gj-k", "gj-t0"),
      tambah("Makin", ...kartu("mb", 40, 150, 220, 24, W.hijauMuda, ["makin ke kanan, makin besar"], 10)),
      tambah("bilangannya", emo("ow", 262, 70, OWL, 28)),
    ),
  ],
};

/* ------------------------------ 2. Maju lagi: kelereng Halim dan Malosi ------------------------------ */
const SUARA_L1 = "Halim punya sembilan kelereng. Malosi punya lima kelereng. Berapa jumlah kelereng mereka?";
const SUARA_L2 = "Mulai dari sembilan. Lalu ketuk kelereng Malosi satu per satu sambil maju.";
const SUARA_L3 = "Sepuluh, sebelas, dua belas, tiga belas, empat belas.";
const SUARA_L4 = "Bilangan terakhir adalah empat belas. Jadi sembilan ditambah lima sama dengan empat belas.";
const SUARA_L5 = "Soalnya boleh ditukar. Lima ditambah sembilan juga sama dengan empat belas. Lebih mudah kalau kita mulai dari bilangan yang besar.";
const H9 = baris(9, 70, 26, 30);
const M5 = baris(5, 134, 26, 30);

export const ADEGAN_MAJU_LAGI: AdeganStory = {
  id: "maju-lagi",
  judul: "Maju lagi: kelereng Halim dan Malosi",
  sumber: "Materi: menghitung maju, contoh kedua",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Kelereng Halim dan Malosi")),
      tambah("sembilan", ...deret("kelereng", "h", H9, 7), teks("th", 14, 50, "Halim: 9", 8.6, W.biru, { anchor: "start" })),
      tambah("lima", ...deret("kelereng", "m", M5, 7), teks("tm", 14, 104, "Malosi: 5", 8.6, W.biru, { anchor: "start" })),
    ),
    k(
      SUARA_L2,
      sorotkan("Mulai", ...idr("h", 0, 9)),
      tambah("ketuk", { id: "tg", t: "teks", x: M5[0].x, y: M5[0].y + 24, isi: "\u{1F446}", u: 20, warna: W.biru }),
    ),
    k(SUARA_L3, redamkan(0, ...idr("h", 0, 9)), ...hitungAksi(SUARA_L3, "m", M5, { dari: 10, tanganAda: true })),
    k(
      SUARA_L4,
      sorotkan("terakhir", "m4", "mn4"),
      tambah("Jadi", ...kartu("hj", 14, 168, 134, 24, W.emas, ["9 + 5 = 14"], 11)),
    ),
    k(
      SUARA_L5,
      hapus(0, "tg"),
      redamkan(0, "m4", "mn4"),
      tambah("Lima", ...kartu("tk", 156, 168, 134, 24, W.langit, ["5 + 9 = 14"], 11)),
      sorotkan("mulai", ...idr("h", 0, 9)),
    ),
  ],
};

/* ------------------------------ 3. Genapkan sepuluh: donat ------------------------------ */
const SUARA_S1 = "Cara kedua: menghitung dengan sepuluh. Donat Kira ada tujuh, dan mereka duduk di kotak sepuluh.";
const SUARA_S2 = "Lihat, masih ada tiga petak yang kosong. Ayo isi petak kosong itu dengan donat Wei.";
const SUARA_S3 = "Seret satu donat Wei ke tiap petak kosong. Satu, dua, tiga.";
const SUARA_S4 = "Sekarang kotak sepuluh sudah penuh. Tujuh ditambah tiga menjadi sepuluh.";
const SUARA_S5 = "Enam donat Wei kita pisah menjadi tiga dan tiga. Tiga sudah masuk kotak, tinggal tiga lagi di luar.";
const SUARA_S6 = "Sepuluh ditambah tiga sama dengan tiga belas. Jadi tujuh ditambah enam sama dengan tiga belas.";
const SUARA_S7 = "Cara ini namanya genapkan sepuluh. Isi dulu kotak sampai penuh, lalu tambahkan sisanya.";
const KX = 85;
const KY = 34;
const SW6 = baris(6, 140, 30, 44);
const posS3 = urutBilangan(SUARA_S3, 1, 3, "kosong.");

export const ADEGAN_SEPULUH: AdeganStory = {
  id: "sepuluh-dulu",
  judul: "Cara 2: genapkan sepuluh",
  sumber: "Materi: genapkan sepuluh",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Cara 2: genapkan sepuluh")),
      tambah("Donat", ...bingkai("kb", KX, KY)),
      tambah("tujuh,", ...deret("donat", "k", Array.from({ length: 7 }, (_, i) => pusatSel(i, KX, KY)), 8)),
      tambah("kotak", ...kartu("kp", 60, 92, 180, 20, W.krem, ["kotak sepuluh: 10 petak"], 8.8)),
    ),
    k(
      SUARA_S2,
      hapus(0, "kp-k", "kp-t0"),
      ubah("tiga", ...[7, 8, 9].map((i) => ({ id: `kb-c${i}`, warna: "#FECACA" }))),
      tambah("Wei.", ...deret("donat", "w", SW6, 8)),
    ),
    k(SUARA_S3, ...posS3.map((p, i) => pindah(p, `w${i}`, pusatSel(7 + i, KX, KY).x, pusatSel(7 + i, KX, KY).y))),
    k(
      SUARA_S4,
      ubah("penuh.", ...Array.from({ length: 10 }, (_, i) => ({ id: `kb-c${i}`, warna: "#FEF08A" }))),
      tambah("Tujuh", ...kartu("kj", 60, 96, 180, 22, W.emas, ["7 + 3 = 10"], 11)),
    ),
    k(
      SUARA_S5,
      tambah("Enam", ...kartu("ke", 40, 166, 220, 22, W.krem, ["6 = 3 + 3"], 11)),
      sorotkan("tinggal", "w3", "w4", "w5"),
      pindah("luar.", "w3", 100, 140),
      pindah("luar.", "w4", 150, 140),
      pindah("luar.", "w5", 200, 140),
    ),
    k(
      SUARA_S6,
      hapus(0, "ke-k", "ke-t0", "kj-k", "kj-t0"),
      redamkan(0, "w3", "w4", "w5"),
      tambah("Sepuluh", ...kartu("kf", 40, 158, 220, 18, W.hijauMuda, ["10 + 3 = 13"], 9.6)),
      tambah("Jadi", ...kartu("kg", 40, 180, 220, 18, W.emas, ["7 + 6 = 13"], 9.6)),
    ),
    k(
      SUARA_S7,
      bersih(0),
      tambah(0, judul("Genapkan sepuluh")),
      tambah("Cara", emo("ow", 150, 104, OWL, 46)),
      tambah("Isi", ...kartu("kz", 40, 130, 220, 32, W.hijauMuda, ["isi 10 dulu, lalu sisanya"], 10.6)),
    ),
  ],
};

/* ------------------------------ 4. Genapkan sepuluh lagi: kelereng ------------------------------ */
const SUARA_T1 = "Coba lagi. Halim punya sembilan kelereng di kotak sepuluh, dan Malosi punya enam kelereng.";
const SUARA_T2 = "Sembilan butuh satu lagi untuk menjadi sepuluh. Seret satu kelereng Malosi ke petak yang kosong.";
const SUARA_T3 = "Sembilan ditambah satu menjadi sepuluh. Kotak sudah penuh.";
const SUARA_T4 = "Enam kelereng Malosi kita pisah menjadi satu dan lima. Satu sudah masuk, tinggal lima.";
const SUARA_T5 = "Sepuluh ditambah lima menjadi lima belas. Jadi sembilan ditambah enam sama dengan lima belas.";
const TM6 = baris(6, 140, 30, 44);

export const ADEGAN_SEPULUH_LAGI: AdeganStory = {
  id: "sepuluh-lagi",
  judul: "Genapkan sepuluh lagi: sembilan dan enam",
  sumber: "Materi: genapkan sepuluh, contoh kedua",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Genapkan sepuluh lagi")),
      tambah("Halim", ...bingkai("tb", KX, KY)),
      tambah("sembilan", ...deret("kelereng", "t", Array.from({ length: 9 }, (_, i) => pusatSel(i, KX, KY)), 7)),
      tambah("kotak", ...kartu("tp", 60, 92, 180, 20, W.krem, ["kotak sepuluh: 10 petak"], 8.8)),
      tambah("enam", ...deret("kelereng", "m", TM6, 7)),
    ),
    k(
      SUARA_T2,
      hapus(0, "tp-k", "tp-t0"),
      ubah("butuh", { id: "tb-c9", warna: "#FECACA" }),
      ubah("kosong.", { id: "m0", x: pusatSel(9, KX, KY).x, y: pusatSel(9, KX, KY).y }),
    ),
    k(
      SUARA_T3,
      ubah("penuh.", ...Array.from({ length: 10 }, (_, i) => ({ id: `tb-c${i}`, warna: "#FEF08A" }))),
      tambah("Sembilan", ...kartu("tj", 60, 96, 180, 22, W.emas, ["9 + 1 = 10"], 11)),
    ),
    k(
      SUARA_T4,
      tambah("Enam", ...kartu("te", 40, 166, 220, 22, W.krem, ["6 = 1 + 5"], 11)),
      sorotkan("tinggal", "m1", "m2", "m3", "m4", "m5"),
    ),
    k(
      SUARA_T5,
      hapus(0, "te-k", "te-t0", "tj-k", "tj-t0"),
      redamkan(0, "m1", "m2", "m3", "m4", "m5"),
      tambah("Sepuluh", ...kartu("tf", 40, 158, 220, 18, W.hijauMuda, ["10 + 5 = 15"], 9.6)),
      tambah("Jadi", ...kartu("tg2", 40, 180, 220, 18, W.emas, ["9 + 6 = 15"], 9.6)),
    ),
  ],
};
