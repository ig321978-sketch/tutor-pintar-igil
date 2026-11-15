import type { AdeganStory, Obj } from "./logika-story";
import { W, bulat, emo, judul, kartu, teks } from "./k1b5c-gambar";
import { bersih, hapus, hitungSatu, idx, k, redamkan, rumus, sorotkan, tambah, ubah } from "./k1b5c-bantu";

export const NAMA_METODE = ["Hitung sampai 20", "Sepuluh dan Satuan", "Dua Bingkai Sepuluh"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [NAMA_METODE[i]], 9.6);

const ANAK = "\u{1F9D2}";
const IGIL = "\u{1F989}";

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara punya cara lain untuk mengajarkan puluhan dan satuan. Di video ini kita lihat tiga cara itu.";
const SUARA_O2 = "Cara pertama bernama Hitung sampai dua puluh. Cara kedua bernama Sepuluh dan Satuan. Cara ketiga bernama Dua Bingkai Sepuluh.";
const SUARA_O3 = "Hitung sampai dua puluh melatih kita menghitung terus melewati sepuluh. Sepuluh dan Satuan memisahkan sepuluh dari sisanya. Dua Bingkai Sepuluh memperlihatkan sepuluh dalam satu bingkai.";
const SUARA_O4 = "Ketiganya membantu kita melihat bahwa bilangan sebelas sampai dua puluh terdiri dari satu puluhan dan beberapa satuan. Semuanya kita lakukan dengan mengetuk di layar.";
const SUARA_O5 = "Kita akan mencoba tiap cara bersama Igil, Upe, Kira, Malosi, dan Wei, seperti kamu mencobanya di layar.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk puluhan dan satuan",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah("negara", emo("gl", 150, 100, "\u{1F30D}", 50)), tambah("puluhan", ...kartu("pk", 50, 140, 200, 32, W.emas, ["1 puluhan = 10 benda"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      ...NAMA_METODE.map((m, i) => tambah(["Hitung", "Sepuluh", "Sepuluh@2"][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Apa yang kita lakukan?")),
      tambah("menghitung", ...kartu("n0", 20, 40, 260, 38, W.hijauMuda, ["hitung terus melewati 10"], 11), emo("e0", 40, 66, "\u{1F522}", 20)),
      tambah("memisahkan", ...kartu("n1", 20, 88, 260, 38, W.langit, ["pisahkan 10 dari sisanya"], 11), emo("e1", 40, 114, "\u{2702}\u{FE0F}", 20)),
      tambah("memperlihatkan", ...kartu("n2", 20, 136, 260, 38, W.pink, ["lihat 10 dalam satu bingkai"], 11), emo("e2", 40, 162, "\u{1F532}", 20)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Satu puluhan dan satuan")),
      tambah("sebelas", ...kartu("i1", 20, 44, 80, 56, W.krem, ["11", "1 puluhan", "1 satuan"], 10)),
      tambah("puluhan", ...kartu("i2", 110, 44, 80, 56, W.krem, ["15", "1 puluhan", "5 satuan"], 10)),
      tambah("satuan.", ...kartu("i3", 200, 44, 80, 56, W.krem, ["20", "2 puluhan", "0 satuan"], 10)),
      tambah("mengetuk", ...kartu("iq", 40, 124, 220, 36, W.emas, ["ketuk di layar"], 11)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Dicoba di layar")),
      ...[["Igil", 30], ["Upe", 90], ["Kira", 150], ["Malosi", 210], ["Wei", 270]].map(([nama, px]) => tambah(nama as string, emo(`o-${nama}`, px as number, 110, nama === "Igil" ? IGIL : ANAK, 34), teks(`on-${nama}`, px as number, 130, nama as string, 8.6))),
      tambah("layar.", ...kartu("ot", 40, 150, 220, 30, W.krem, ["ketuk, seret, dan pilih"], 10)),
    ),
  ],
};

/* ------------------------------ 2. Hitung sampai dua puluh: konsep ------------------------------ */
/** Dua puluh titik dalam dua baris, tiap baris sepuluh. */
export const ID_TITIK20 = Array.from({ length: 20 }, (_, i) => `dt${i}`);
export const letakTitik20 = (i: number): { x: number; y: number } => ({ x: 36 + 24 * (i % 10), y: 72 + 30 * Math.floor(i / 10) });
const titik20 = (i: number): Obj => bulat(ID_TITIK20[i], letakTitik20(i).x, letakTitik20(i).y, 7, W.titik, W.biru, { tebal: 1.2 });

const SUARA_H1 = "Cara pertama, Hitung sampai dua puluh. Kita terus menghitung dan tidak berhenti di sepuluh.";
const SUARA_H2 = "Kita mulai dari awal. Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh.";
const SUARA_H3 = "Setelah sepuluh, kita lanjut. Sebelas, dua belas, tiga belas, empat belas, lima belas.";
const SUARA_H4 = "Lanjut lagi sampai dua puluh: enam belas, tujuh belas, delapan belas, sembilan belas, dua puluh.";
const SUARA_H5 = "Hebat! Setelah sembilan belas, kita sampai di dua puluh. Ucapkan lagi mengikuti suara guru: sebelas, dua belas, tiga belas.";

export const ADEGAN_LUAR_HITUNG: AdeganStory = {
  id: "luar-hitung",
  judul: "Hitung sampai 20: terus hitung",
  sumber: "Metode luar: Hitung sampai 20",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_H1, tambah(0, ...kepala(0)), tambah("terus", emo("mt", 150, 100, "\u{1F522}", 44)), tambah("sepuluh.", ...kartu("kk", 50, 140, 200, 32, W.emas, ["hitung terus lewati 10"], 10))),
    k(
      SUARA_H2,
      hapus(0, "mt", "kk-k", "kk-t0"),
      tambah(0, ...ID_TITIK20.slice(0, 10).map((_, i) => titik20(i))),
      ...hitungSatu(SUARA_H2, ID_TITIK20.slice(0, 10), "hitung", "ch", 150, 150, "awal.", 1, true, W.merah, 16),
    ),
    k(SUARA_H3, tambah(0, ...ID_TITIK20.slice(10, 15).map((_, i) => titik20(10 + i))), redamkan(0, "dt9"), ...hitungSatu(SUARA_H3, ID_TITIK20.slice(10, 15), "hitung", "ch", 150, 150, "lanjut.", 11, false)),
    k(SUARA_H4, tambah(0, ...ID_TITIK20.slice(15, 20).map((_, i) => titik20(15 + i))), redamkan(0, "dt14"), ...hitungSatu(SUARA_H4, ID_TITIK20.slice(15, 20), "hitung", "ch", 150, 150, "puluh:", 16, false)),
    k(SUARA_H5, redamkan(0, "dt19"), tambah("Hebat!", emo("ow", 262, 170, IGIL, 28)), tambah("Ucapkan", emo("sg", 150, 190, "\u{1F50A}", 24))),
  ],
};

/* ------------------------------ 3. Hitung sampai dua puluh: kancing Upe ------------------------------ */
export const ID_KANCING = Array.from({ length: 16 }, (_, i) => `kn${i}`);
export const letakKancing = (i: number): { x: number; y: number } => ({ x: 50 + 28 * (i % 8), y: 84 + 28 * Math.floor(i / 8) });
const kancing = (i: number): Obj => bulat(ID_KANCING[i], letakKancing(i).x, letakKancing(i).y, 7, W.oranye, W.biru, { tebal: 1.2 });

const SUARA_J1 = "Upe punya kancing warna-warni di atas meja. Berapa banyak kancingnya? Ayo hitung dengan cara pertama.";
const SUARA_J2 = "Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh. Sampai di sepuluh, kita beri tanda.";
const SUARA_J3 = "Lanjut hitung melewati sepuluh: sebelas, dua belas, tiga belas, empat belas, lima belas, enam belas.";
const SUARA_J4 = "Jadi kancing Upe ada enam belas. Sepuluh kancing pertama adalah satu puluhan, dan enam kancing sisanya adalah enam satuan.";
const SUARA_J5 = "Kalimatnya: sepuluh ditambah enam sama dengan enam belas.";

export const ADEGAN_LUAR_HITUNG_TERAPAN: AdeganStory = {
  id: "luar-hitung-terapan",
  judul: "Hitung sampai 20: kancing Upe",
  sumber: "Metode luar: Hitung sampai 20, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_J1, tambah(0, ...kepala(0)), tambah("Upe", emo("a-Upe", 24, 62, ANAK, 24), teks("n-Upe", 24, 76, "Upe", 8.4)), tambah("kancing", ...ID_KANCING.map((_, i) => kancing(i)))),
    k(SUARA_J2, ...hitungSatu(SUARA_J2, ID_KANCING.slice(0, 10), "kancing", "ch", 150, 158, undefined, 1, true, W.merah, 16), tambah(idx(SUARA_J2, "sepuluh", 2), emo("fl", 78, 100, "\u{1F6A9}", 14))),
    k(SUARA_J3, redamkan(0, "kn9"), ...hitungSatu(SUARA_J3, ID_KANCING.slice(10), "kancing", "ch", 150, 158, "sepuluh:", 11, false)),
    k(
      SUARA_J4,
      redamkan(0, "kn15"),
      ubah("sisanya", ...ID_KANCING.slice(10).map((id) => ({ id, warna: W.merahMuda }))),
      tambah("puluhan,", teks("l1", 100, 138, "1 puluhan", 10, W.merah)),
      tambah(idx(SUARA_J4, "satuan"), teks("l2", 200, 138, "6 satuan", 10, W.merah)),
    ),
    k(SUARA_J5, ...rumus(SUARA_J5, "ru", 188, 10, 6, "Kalimatnya:")),
  ],
};

/* ------------------------------ 4. Sepuluh dan Satuan: konsep ------------------------------ */
const SUARA_P1 = "Cara kedua, Sepuluh dan Satuan. Bilangan sebelas sampai dua puluh kita lihat sebagai sepuluh ditambah sisanya.";
const SUARA_P2 = "Sebelas adalah sepuluh ditambah satu. Dua belas adalah sepuluh ditambah dua. Tiga belas adalah sepuluh ditambah tiga.";
const SUARA_P3 = "Perhatikan, sepuluh selalu ada di depan, dan sisanya adalah satuan. Satuan itu yang berubah dari satu sampai sembilan.";
const SUARA_P4 = "Bilangan lima belas adalah sepuluh ditambah lima. Bilangan sembilan belas adalah sepuluh ditambah sembilan.";
const SUARA_P5 = "Sekarang ucapkan lagi mengikuti suara guru: sepuluh ditambah lima sama dengan lima belas.";
const persamaan = (id: string, y: number, isi: string, warna = W.merah) => teks(id, 150, y, isi, 18, warna);

export const ADEGAN_LUAR_SATUAN: AdeganStory = {
  id: "luar-satuan",
  judul: "Sepuluh dan Satuan: sepuluh ditambah sisa",
  sumber: "Metode luar: Sepuluh dan Satuan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_P1, tambah(0, ...kepala(1)), tambah("Bilangan", emo("mt", 150, 92, "\u{1F50D}", 44)), tambah("ditambah", ...kartu("kk", 50, 128, 200, 32, W.emas, ["10 + sisa"], 12))),
    k(
      SUARA_P2,
      hapus(0, "mt", "kk-k", "kk-t0"),
      tambah("Sebelas", persamaan("f1", 74, "10 + 1 = 11")),
      tambah(idx(SUARA_P2, "dua"), persamaan("f2", 104, "10 + 2 = 12")),
      tambah(idx(SUARA_P2, "tiga"), persamaan("f3", 134, "10 + 3 = 13")),
    ),
    k(SUARA_P3, tambah("sepuluh", ...kartu("kp", 14, 150, 130, 28, W.hijauMuda, ["10 selalu di depan"], 9.4)), tambah("satuan.", ...kartu("ks", 156, 150, 130, 28, W.pink, ["sisanya: satuan"], 9.4))),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, ...kepala(1)),
      tambah(idx(SUARA_P4, "lima"), persamaan("f4", 84, "10 + 5 = 15")),
      tambah(idx(SUARA_P4, "sembilan"), persamaan("f5", 124, "10 + 9 = 19")),
    ),
    k(SUARA_P5, sorotkan("ucapkan", "f4"), tambah("ucapkan", emo("sg", 150, 180, "\u{1F50A}", 26))),
  ],
};
