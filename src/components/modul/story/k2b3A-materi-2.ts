import type { AdeganStory, Obj } from "./logika-story";
import { W, bangun, bawahMelengkung, emo, hati, judul, kartu, kotak, lingkaran, namaBangun, relBeraturan, relRumah, relSegiempat, relSegitiga, setengahLingkaran, sudutBangun, telur, teks, warnaSegi } from "./k2b3A-gambar";
import { bersih, hapus, idx, ids, k, redamkan, sisiAksi, sorotkan, tambah, ubah } from "./k2b3A-bantu";

/* ------------------------------ 6. Memilah: segi banyak atau bentuk lengkung ------------------------------ */
const SUARA_A1 = "Sekarang kita pilah bentuk. Ada dua kotak, kotak segi banyak dan kotak bentuk lengkung.";
const SUARA_A2 = "Segitiga tepinya garis lurus, jadi masuk kotak segi banyak.";
const SUARA_A3 = "Segi empat dan segi lima juga masuk kotak segi banyak.";
const SUARA_A4 = "Lingkaran, telur, dan hati tepinya lengkung. Semuanya masuk kotak bentuk lengkung.";
const SUARA_A5 = "Mudah, kan? Lihat tepinya dulu, lurus atau lengkung.";
/** Urutan awal baris pilah (id pl0..pl5), pusat awal di tinggi 62. */
const X_AWAL = [30, 78, 126, 174, 222, 270];
const BENTUK_PILAH = (i: number, x: number, y: number): Obj =>
  [
    bangun("pl0", relSegitiga(34, 30), x, y, warnaSegi(3)),
    lingkaran("pl1", x, y, 16),
    bangun("pl2", relSegiempat(30, 30), x, y, warnaSegi(4)),
    telur("pl3", x, y, 19, 12),
    bangun("pl4", relBeraturan(5, 17), x, y, warnaSegi(5)),
    hati("pl5", x, y, 15),
  ][i];
/** Letak akhir tiap bentuk di kotak: tiga di kiri (segi banyak) dan tiga di kanan (lengkung). */
const AKHIR_PILAH: [number, number][] = [
  [33, 152],
  [183, 152],
  [77, 152],
  [227, 152],
  [121, 152],
  [271, 152],
];

export const ADEGAN_PILAH_DUA: AdeganStory = {
  id: "pilah-dua",
  judul: "Memilah segi banyak dan bentuk lengkung",
  sumber: "Materi: memilah bentuk",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Pilah bentuk")),
      tambah(idx(SUARA_A1, "pilah"), ...X_AWAL.map((x, i) => BENTUK_PILAH(i, x, 62))),
      tambah(idx(SUARA_A1, "dua"), kotak("zk0", 6, 98, 138, 92, W.langit, W.biru, { rx: 8 }), kotak("zk1", 156, 98, 138, 92, W.hijauMuda, W.biru, { rx: 8 }), teks("zl0", 75, 112, "Segi banyak", 10, W.ungu), teks("zl1", 225, 112, "Bentuk lengkung", 10, W.ungu)),
    ),
    k(SUARA_A2, sorotkan(idx(SUARA_A2, "Segitiga"), "pl0"), ubah(idx(SUARA_A2, "masuk"), { id: "pl0", x: AKHIR_PILAH[0][0], y: AKHIR_PILAH[0][1] }), redamkan(idx(SUARA_A2, "banyak"), "pl0")),
    k(SUARA_A3, ubah(idx(SUARA_A3, "empat"), { id: "pl2", x: AKHIR_PILAH[2][0], y: AKHIR_PILAH[2][1] }), ubah(idx(SUARA_A3, "lima"), { id: "pl4", x: AKHIR_PILAH[4][0], y: AKHIR_PILAH[4][1] })),
    k(
      SUARA_A4,
      ubah(idx(SUARA_A4, "Lingkaran,"), { id: "pl1", x: AKHIR_PILAH[1][0], y: AKHIR_PILAH[1][1] }),
      ubah(idx(SUARA_A4, "telur,"), { id: "pl3", x: AKHIR_PILAH[3][0], y: AKHIR_PILAH[3][1] }),
      ubah(idx(SUARA_A4, "hati"), { id: "pl5", x: AKHIR_PILAH[5][0], y: AKHIR_PILAH[5][1] }),
    ),
    k(SUARA_A5, tambah(idx(SUARA_A5, "Mudah,"), emo("ok", 150, 160, "✅", 26)), sorotkan(idx(SUARA_A5, "lurus"), "zk0"), redamkan(idx(SUARA_A5, "lengkung."), "zk0"), sorotkan(idx(SUARA_A5, "lengkung."), "zk1")),
  ],
};

/* ------------------------------ 7. Menghitung sisi: segitiga dan segi empat ------------------------------ */
const SUARA_H1 = "Banyak sisi menentukan nama bangun. Mari kita hitung sisinya satu per satu.";
const SUARA_H2 = "Bangun pertama. Satu, dua, tiga. Ada tiga sisi.";
const SUARA_H3 = "Segi banyak dengan tiga sisi dinamakan segitiga.";
const SUARA_H4 = "Bangun kedua. Satu, dua, tiga, empat. Ada empat sisi.";
const SUARA_H5 = "Segi banyak dengan empat sisi dinamakan segi empat.";
const SUARA_H6 = "Segi empat bisa pendek atau panjang. Selama sisinya empat, namanya tetap segi empat.";
const REL_H0 = relSegitiga(64, 56);
const PTS_H0 = sudutBangun(REL_H0, 75, 90);
const REL_H1 = relSegiempat(70, 50);
const PTS_H1 = sudutBangun(REL_H1, 225, 90);

export const ADEGAN_HITUNG_SISI: AdeganStory = {
  id: "hitung-sisi",
  judul: "Menghitung sisi: segitiga dan segi empat",
  sumber: "Materi: banyak sisi dan nama",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_H1, tambah(0, judul("Hitung sisinya")), tambah(idx(SUARA_H1, "hitung"), bangun("h0", REL_H0, 75, 90, warnaSegi(3)), bangun("h1", REL_H1, 225, 90, warnaSegi(4)))),
    k(SUARA_H2, sorotkan(idx(SUARA_H2, "pertama."), "h0"), ...sisiAksi(SUARA_H2, "h0", PTS_H0, { setelah: "pertama" }), tambah(idx(SUARA_H2, "tiga", 2), teks("h0-jn", 75, 160, "3 sisi", 12, W.merah))),
    k(SUARA_H3, redamkan(0, "h0"), tambah(idx(SUARA_H3, "segitiga."), namaBangun("h0", 75, 180, "segitiga", 12))),
    k(SUARA_H4, sorotkan(idx(SUARA_H4, "kedua."), "h1"), ...sisiAksi(SUARA_H4, "h1", PTS_H1, { setelah: "kedua" }), tambah(idx(SUARA_H4, "empat", 2), teks("h1-jn", 225, 160, "4 sisi", 12, W.merah))),
    k(SUARA_H5, redamkan(0, "h1"), tambah(idx(SUARA_H5, "segi", 2), namaBangun("h1", 225, 180, "segi empat", 12))),
    k(
      SUARA_H6,
      bersih(0),
      tambah(0, judul("Segi empat")),
      tambah(idx(SUARA_H6, "pendek"), bangun("j0", relSegiempat(44, 44), 75, 92, warnaSegi(4)), namaBangun("j0", 75, 150, "segi empat", 11)),
      tambah(idx(SUARA_H6, "panjang."), bangun("j1", relSegiempat(96, 36), 225, 92, warnaSegi(4)), namaBangun("j1", 225, 150, "segi empat", 11)),
      tambah(idx(SUARA_H6, "sisinya"), teks("j0-jn", 75, 172, "4 sisi", 11, W.merah), teks("j1-jn", 225, 172, "4 sisi", 11, W.merah)),
    ),
  ],
};

/* ------------------------------ 8. Segi lima dan segi enam ------------------------------ */
const SUARA_I1 = "Sekarang kita lihat bangun yang sisinya lebih banyak. Ini bangun pertama.";
const SUARA_I2 = "Satu, dua, tiga, empat, lima. Ada lima sisi.";
const SUARA_I3 = "Segi banyak dengan lima sisi dinamakan segi lima. Banyak rumah burung berbentuk segi lima.";
const SUARA_I4 = "Bangun kedua punya satu, dua, tiga, empat, lima, enam sisi.";
const SUARA_I5 = "Ada enam sisi. Segi banyak dengan enam sisi dinamakan segi enam. Sarang lebah berbentuk segi enam.";
const REL_I0 = relBeraturan(5, 34);
const PTS_I0 = sudutBangun(REL_I0, 75, 90);
const REL_I1 = relBeraturan(6, 34);
const PTS_I1 = sudutBangun(REL_I1, 225, 90);

export const ADEGAN_SEGI_LIMA_ENAM: AdeganStory = {
  id: "segi-lima-enam",
  judul: "Segi lima dan segi enam",
  sumber: "Materi: segi lima dan segi enam",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_I1, tambah(0, judul("Sisi lebih banyak")), tambah(idx(SUARA_I1, "Ini"), bangun("i0", REL_I0, 75, 90, warnaSegi(5)))),
    k(SUARA_I2, ...sisiAksi(SUARA_I2, "i0", PTS_I0), tambah(idx(SUARA_I2, "lima", 2), teks("i0-jn", 75, 160, "5 sisi", 12, W.merah))),
    k(SUARA_I3, tambah(idx(SUARA_I3, "segi", 2), namaBangun("i0", 75, 180, "segi lima", 12)), tambah(idx(SUARA_I3, "rumah"), bangun("rb", relRumah(44, 44), 225, 90, "#FDE68A"), teks("rb-bd", 225, 152, "rumah burung", 10, W.ungu))),
    k(SUARA_I4, hapus(idx(SUARA_I4, "kedua"), "rb", "rb-bd"), tambah(idx(SUARA_I4, "kedua"), bangun("i1", REL_I1, 225, 90, warnaSegi(6))), ...sisiAksi(SUARA_I4, "i1", PTS_I1, { setelah: "punya" })),
    k(SUARA_I5, tambah(idx(SUARA_I5, "enam"), teks("i1-jn", 225, 160, "6 sisi", 12, W.merah)), tambah(idx(SUARA_I5, "segi", 2), namaBangun("i1", 225, 180, "segi enam", 12)), sorotkan(idx(SUARA_I5, "Sarang"), "i1")),
  ],
};

/* ------------------------------ 9. Pola nama segi banyak ------------------------------ */
const SUARA_N1 = "Nama segi banyak mengikuti banyak sisinya. Mari kita lihat polanya.";
const SUARA_N2 = "Tiga sisi, segitiga. Empat sisi, segi empat.";
const SUARA_N3 = "Lima sisi, segi lima. Enam sisi, segi enam.";
const SUARA_N4 = "Hitung sisinya, lalu sebut namanya. Mudah, kan?";
const POLA = [
  { n: 3, rel: relSegitiga(30, 26), nama: "segitiga" },
  { n: 4, rel: relSegiempat(26, 26), nama: "segi empat" },
  { n: 5, rel: relBeraturan(5, 15), nama: "segi lima" },
  { n: 6, rel: relBeraturan(6, 15), nama: "segi enam" },
];
const YP = [52, 90, 128, 166];
const barisPola = (i: number): Obj[] => [
  kotak(`pr${i}`, 10, YP[i] - 17, 280, 34, i % 2 === 0 ? W.langit : W.hijauMuda, W.biru, { rx: 8, tebal: 1.2 }),
  bangun(`pn${i}`, POLA[i].rel, 40, YP[i], warnaSegi(POLA[i].n)),
  teks(`pn${i}-jn`, 112, YP[i] + 4.5, `${POLA[i].n} sisi`, 13, W.merah),
  namaBangun(`pn${i}`, 218, YP[i] + 4.5, POLA[i].nama, 13),
];

export const ADEGAN_POLA_NAMA: AdeganStory = {
  id: "pola-nama",
  judul: "Pola nama segi banyak",
  sumber: "Materi: pola nama segi banyak",
  latar: "#FAF5FF",
  ketukan: [
    k(SUARA_N1, tambah(0, judul("Pola nama")), tambah(idx(SUARA_N1, "polanya."), emo("pk", 150, 112, "\u{1F9E9}", 50))),
    k(SUARA_N2, hapus(0, "pk"), tambah(0, ...barisPola(0)), tambah(idx(SUARA_N2, "Empat"), ...barisPola(1))),
    k(SUARA_N3, tambah(0, ...barisPola(2)), tambah(idx(SUARA_N3, "Enam"), ...barisPola(3))),
    k(SUARA_N4, sorotkan(idx(SUARA_N4, "sebut"), ...ids("pn", 0, 3).map((q) => `${q}-nm`)), tambah(idx(SUARA_N4, "Mudah,"), emo("ok", 272, 110, "✅", 24))),
  ],
};

/* ------------------------------ 6b. Syarat segi banyak: semua sisi lurus ------------------------------ */
const SUARA_X1 = "Tidak semua bangun datar adalah segi banyak. Segi banyak harus punya semua sisi yang lurus.";
const SUARA_X2 = "Perhatikan segi empat ini. Semua sisinya lurus, jadi ia segi banyak.";
const SUARA_X3 = "Bangun yang ini punya satu sisi yang lengkung. Jadi ia bukan segi banyak.";
const SUARA_X4 = "Segitiga ini punya tiga sisi lurus, jadi ia segi banyak.";
const SUARA_X5 = "Bangun yang terakhir punya sisi bawah yang melengkung. Jadi ia juga bukan segi banyak.";
const SUARA_X6 = "Ingat, segi banyak hanya punya sisi lurus. Satu sisi lengkung saja sudah membuatnya bukan segi banyak.";
const XC = [42, 114, 186, 258];
const bentukCek = (i: number): Obj =>
  [
    bangun("cb0", relSegiempat(40, 36), XC[0], 84, warnaSegi(4)),
    setengahLingkaran("cb1", XC[1], 84, 22),
    bangun("cb2", relSegitiga(44, 38), XC[2], 84, warnaSegi(3)),
    bawahMelengkung("cb3", XC[3], 84, 40, 38),
  ][i];

export const ADEGAN_BUKAN_SEGI_BANYAK: AdeganStory = {
  id: "bukan-segi-banyak",
  judul: "Syarat segi banyak: semua sisi lurus",
  sumber: "Materi: syarat segi banyak",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_X1, tambah(0, judul("Semua sisi lurus")), tambah(idx(SUARA_X1, "bangun"), ...[0, 1, 2, 3].map(bentukCek)), tambah(idx(SUARA_X1, "lurus."), ...kartu("sl", 50, 160, 200, 28, W.krem, ["segi banyak: sisi lurus semua"], 10))),
    k(SUARA_X2, sorotkan(idx(SUARA_X2, "Perhatikan"), "cb0"), tambah(idx(SUARA_X2, "jadi"), emo("cb0-ya", XC[0], 132, "✅", 24)), redamkan(idx(SUARA_X2, "banyak."), "cb0")),
    k(SUARA_X3, sorotkan(idx(SUARA_X3, "Bangun"), "cb1"), tambah(idx(SUARA_X3, "bukan"), emo("cb1-tdk", XC[1], 132, "❌", 24)), redamkan(idx(SUARA_X3, "banyak."), "cb1")),
    k(SUARA_X4, sorotkan(idx(SUARA_X4, "Segitiga"), "cb2"), tambah(idx(SUARA_X4, "jadi"), emo("cb2-ya", XC[2], 132, "✅", 24)), redamkan(idx(SUARA_X4, "banyak."), "cb2")),
    k(SUARA_X5, sorotkan(idx(SUARA_X5, "terakhir"), "cb3"), tambah(idx(SUARA_X5, "bukan"), emo("cb3-tdk", XC[3], 132, "❌", 24)), redamkan(idx(SUARA_X5, "banyak."), "cb3")),
    k(SUARA_X6, sorotkan(idx(SUARA_X6, "lurus."), "cb0", "cb2"), hapus(0, "sl-k", "sl-t0"), tambah(idx(SUARA_X6, "lengkung"), ...kartu("sm", 50, 160, 200, 28, W.pink, ["ada yang lengkung: bukan"], 10))),
  ],
};

/* ------------------------------ 8b. Membandingkan banyak sisi ------------------------------ */
const SUARA_Y1 = "Sekarang kita bandingkan dua segi banyak. Mana yang punya sisi lebih banyak?";
const SUARA_Y2 = "Segi lima punya lima sisi. Kita tulis banyaknya di bawah bangun.";
const SUARA_Y3 = "Segi enam punya enam sisi. Kita tulis banyaknya juga.";
const SUARA_Y4 = "Enam lebih banyak dari lima. Jadi segi enam punya sisi yang lebih banyak.";
const SUARA_Y5 = "Selisihnya hanya satu sisi. Segi enam punya satu sisi lebih banyak daripada segi lima.";

export const ADEGAN_BANDINGKAN_SISI: AdeganStory = {
  id: "bandingkan-sisi",
  judul: "Membandingkan banyak sisi",
  sumber: "Materi: membandingkan banyak sisi",
  latar: "#F0FDFA",
  ketukan: [
    k(SUARA_Y1, tambah(0, judul("Mana lebih banyak?")), tambah(idx(SUARA_Y1, "bandingkan"), bangun("bp0", relBeraturan(5, 32), 75, 84, warnaSegi(5)), bangun("bp1", relBeraturan(6, 32), 225, 84, warnaSegi(6)))),
    k(SUARA_Y2, tambah(idx(SUARA_Y2, "lima", 2), teks("bp0-jn", 75, 140, "5 sisi", 12, W.merah), namaBangun("bp0", 75, 158, "segi lima", 11))),
    k(SUARA_Y3, tambah(idx(SUARA_Y3, "enam", 2), teks("bp1-jn", 225, 140, "6 sisi", 12, W.merah), namaBangun("bp1", 225, 158, "segi enam", 11))),
    k(SUARA_Y4, sorotkan(idx(SUARA_Y4, "banyak", 1), "bp1"), tambah(idx(SUARA_Y4, "Jadi"), ...kartu("bd", 50, 170, 200, 24, W.emas, ["6 lebih banyak dari 5"], 11))),
    k(SUARA_Y5, redamkan(0, "bp1"), hapus(0, "bd-k", "bd-t0"), tambah(idx(SUARA_Y5, "satu"), ...kartu("sl", 70, 170, 160, 24, W.langit, ["selisih 1 sisi"], 11))),
  ],
};
