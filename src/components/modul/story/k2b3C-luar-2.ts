import type { AdeganStory } from "./logika-story";
import { OWL, W, bayangan, chipPermukaan, cocok, emo, kartu, kotak, ruang, rusukBox, teks, titikSudut } from "./k2b3C-gambar";
import { hapus, idf, idx, k, pilihKata, redamkan, sorotkan, tambah, ubah } from "./k2b3C-bantu";
import { KUBUS, BALOK } from "./k2b3C-materi-3";
import { NAMA_METODE_ID, WARNA_METODE, kepala } from "./k2b3C-luar-1";

/** Tas di layar: kotak kosong dengan tanda tanya; bangun ruang di dalamnya muncul saat tas dibuka. */
const tas = (): ReturnType<typeof kartu> => [kotak("tas-k", 20, 52, 110, 64, W.krem, W.coklat, { rx: 10, tebal: 2 }), teks("tas-t", 75, 66, "tas di layar", 9.4, W.coklat), teks("q", 75, 108, "?", 40, W.merah)];
const BAYANG = { x: 220, y: 88, s: 34 };

/* ------------------------------ 1. Tas Misteri: konsep ------------------------------ */
const SUARA_T1 = "Cara kedua bernama Tas Misteri. Ada sebuah bangun ruang yang tersembunyi di dalam tas.";
const SUARA_T2 = "Kita tidak melihat bendanya, hanya bayangannya di layar. Bayangannya berbentuk segi empat yang sama sisinya.";
const SUARA_T3 = "Petunjuk pertama, semua permukaannya datar. Jadi bukan tabung, bukan kerucut, dan bukan bola.";
const SUARA_T4 = "Petunjuk kedua, bayangannya segi empat yang sama sisinya. Balok bayangannya segi empat panjang, jadi bukan balok.";
const SUARA_T5 = "Tinggal satu kemungkinan, yaitu kubus. Tas dibuka, dan benar, di dalamnya ada kubus.";

export const ADEGAN_LUAR_TAS: AdeganStory = {
  id: "luar-tas",
  judul: "Tas Misteri: tebak dari bayangan dan petunjuk",
  sumber: "Metode luar: Tas Misteri",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_T1, tambah(0, ...kepala(1)), tambah(idx(SUARA_T1, "tas"), ...tas())),
    k(SUARA_T2, tambah(idx(SUARA_T2, "bayangannya"), ...bayangan("kubus", "a", BAYANG.x, BAYANG.y, BAYANG.s), teks("by-nm", BAYANG.x, 64, "bayangan", 9, W.biru))),
    k(SUARA_T3, tambah(idx(SUARA_T3, "pertama"), ...kartu("pt0", 8, 124, 284, 24, W.hijauMuda, ["semua permukaan datar"], 9, { tebal: 1.2 })), tambah(idx(SUARA_T3, "bukan"), teks("bk0", 150, 192, "bukan: tabung, kerucut, bola", 9, W.merah))),
    k(SUARA_T4, tambah(idx(SUARA_T4, "kedua"), ...kartu("pt1", 8, 152, 284, 24, W.langit, ["bayangan segi empat sama"], 9, { tebal: 1.2 })), ubah(idx(SUARA_T4, "jadi"), { id: "bk0", isi: "bukan: tabung, kerucut, bola, balok" })),
    k(SUARA_T5, hapus(0, "q"), tambah(idx(SUARA_T5, "kubus"), ...ruang("kubus", "kba", 75, 92, 22)), tambah(idx(SUARA_T5, "benar"), cocok("ok", 270, 188, 20))),
  ],
};

/* ------------------------------ 2. Tas Misteri: terapan ------------------------------ */
const SUARA_U1 = "Sekarang tas misteri yang lain. Bayangannya berbentuk segitiga.";
const SUARA_U2 = "Petunjuk pertama, bangun ruang ini punya satu ujung runcing.";
const SUARA_U3 = "Petunjuk kedua, alasnya berbentuk lingkaran yang rata.";
const SUARA_U4 = "Sekarang pilih namanya. Apakah kubus, kerucut, atau bola?";
const SUARA_U5 = "Jawabannya kerucut. Tas dibuka, dan di dalamnya ada topi ulang tahun.";

export const ADEGAN_LUAR_TAS_TERAPAN: AdeganStory = {
  id: "luar-tas-terapan",
  judul: "Tas Misteri: bayangan segitiga",
  sumber: "Metode luar: Tas Misteri, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_U1, tambah(0, ...kepala(1), ...tas()), tambah(idx(SUARA_U1, "Bayangannya"), ...bayangan("kerucut", "a", BAYANG.x, BAYANG.y, BAYANG.s), teks("by-nm", BAYANG.x, 64, "bayangan", 9, W.biru))),
    k(SUARA_U2, tambah(idx(SUARA_U2, "pertama"), ...kartu("pt0", 8, 124, 284, 24, W.hijauMuda, ["satu ujung runcing"], 9, { tebal: 1.2 })), tambah(idx(SUARA_U2, "ujung"), teks("bk0", 150, 192, "cocok: kerucut", 9, W.merah))),
    k(SUARA_U3, tambah(idx(SUARA_U3, "kedua"), ...kartu("pt1", 8, 152, 284, 24, W.langit, ["alas lingkaran"], 9, { tebal: 1.2 }))),
    k(SUARA_U4, hapus(0, "pt0-k", "pt0-t0", "pt1-k", "pt1-t0", "bk0"), tambah(idx(SUARA_U4, "pilih"), ...pilihKata(136, ["kubus", "kerucut", "bola"], 11))),
    k(SUARA_U5, sorotkan(idx(SUARA_U5, "kerucut"), "c2-k", "c2-t"), hapus(idx(SUARA_U5, "dibuka"), "q"), tambah(idx(SUARA_U5, "topi"), ...ruang("kerucut", "kra", 75, 92, 22), cocok("ok", 270, 188, 20))),
  ],
};

/* ------------------------------ 3. Ciri Bangun Ruang: konsep (kubus) ------------------------------ */
const SUARA_C1 = "Cara ketiga bernama Ciri Bangun Ruang. Kita menyebut sisi, rusuk, dan titik sudut.";
const SUARA_C2 = "Sisi adalah permukaan yang datar. Kubus punya enam sisi.";
const SUARA_C3 = "Rusuk adalah garis tempat dua permukaan bertemu. Kubus punya dua belas rusuk.";
const SUARA_C4 = "Titik sudut adalah pojok tempat rusuk bertemu. Kubus punya delapan titik sudut.";
const SUARA_C5 = "Dengan menyebut sisi, rusuk, dan titik sudut, kita mengenali ciri bangun ruang.";
const posChip = (i: number): { x: number; y: number } => ({ x: i % 2 === 0 ? 176 : 236, y: 54 + Math.floor(i / 2) * 28 });

export const ADEGAN_LUAR_CIRI: AdeganStory = {
  id: "luar-ciri",
  judul: "Ciri Bangun Ruang: sisi, rusuk, titik sudut",
  sumber: "Metode luar: Ciri Bangun Ruang",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, ...kepala(2), ...ruang("kubus", "kba", KUBUS.cx, KUBUS.cy, KUBUS.s)),
      tambah(idx(SUARA_C1, "sisi"), ...kartu("ls0", 176, 60, 110, 24, W.hijauMuda, ["sisi"], 10)),
      tambah(idx(SUARA_C1, "rusuk"), ...kartu("ls1", 176, 92, 110, 24, W.krem, ["rusuk"], 10)),
      tambah(idx(SUARA_C1, "titik"), ...kartu("ls2", 176, 124, 110, 24, W.pink, ["titik sudut"], 10)),
    ),
    k(
      SUARA_C2,
      hapus(0, "ls0-k", "ls0-t0", "ls1-k", "ls1-t0", "ls2-k", "ls2-t0"),
      ...[0, 1, 2, 3, 4, 5].map((i) => tambah(idx(SUARA_C2, "enam"), ...chipPermukaan("kba", i, posChip(i).x, posChip(i).y, "datar"))),
      tambah(idx(SUARA_C2, "sisi", 2), teks("cs", 232, 156, "6 sisi", 12, W.merah)),
    ),
    k(
      SUARA_C3,
      ...Array.from({ length: 12 }, (_, i) => tambah(idf(SUARA_C3, "dua belas"), rusukBox("kubus", "kba", KUBUS.cx, KUBUS.cy, KUBUS.s, i))),
      tambah(idf(SUARA_C3, "dua belas"), teks("cr", 232, 174, "12 rusuk", 12, W.merah)),
    ),
    k(SUARA_C4, ...Array.from({ length: 8 }, (_, i) => tambah(idx(SUARA_C4, "delapan"), titikSudut("kubus", "kba", KUBUS.cx, KUBUS.cy, KUBUS.s, i))), tambah(idx(SUARA_C4, "delapan"), teks("ct", 232, 192, "8 titik sudut", 11, W.merah))),
    k(SUARA_C5, sorotkan(idx(SUARA_C5, "sisi"), "cs"), sorotkan(idx(SUARA_C5, "rusuk"), "cr"), sorotkan(idx(SUARA_C5, "titik"), "ct")),
  ],
};

/* ------------------------------ 4. Ciri Bangun Ruang: terapan (balok) ------------------------------ */
const SUARA_D1 = "Sekarang kita pakai cara ini untuk balok. Kita sebut sisi, rusuk, dan titik sudutnya.";
const SUARA_D2 = "Sisi balok ada enam. Semuanya segi empat.";
const SUARA_D3 = "Rusuk balok ada dua belas. Kita tandai semuanya dengan garis hijau.";
const SUARA_D4 = "Titik sudut balok ada delapan. Kita tandai semuanya dengan titik merah.";
const SUARA_D5 = "Jadi balok punya enam sisi, dua belas rusuk, dan delapan titik sudut. Jumlahnya sama dengan kubus.";

export const ADEGAN_LUAR_CIRI_TERAPAN: AdeganStory = {
  id: "luar-ciri-terapan",
  judul: "Ciri Bangun Ruang: ciri balok",
  sumber: "Metode luar: Ciri Bangun Ruang, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_D1, tambah(0, ...kepala(2), ...ruang("balok", "bla", BALOK.cx, BALOK.cy, BALOK.s)), tambah(idx(SUARA_D1, "balok"), teks("dd", BALOK.cx, 160, "balok", 10, W.merah))),
    k(SUARA_D2, ...[0, 1, 2, 3, 4, 5].map((i) => tambah(idx(SUARA_D2, "enam"), ...chipPermukaan("bla", i, posChip(i).x, posChip(i).y, "datar"))), tambah(idx(SUARA_D2, "segi"), teks("cs", 232, 156, "6 sisi", 12, W.merah))),
    k(SUARA_D3, ...Array.from({ length: 12 }, (_, i) => tambah(idx(SUARA_D3, "dua"), rusukBox("balok", "bla", BALOK.cx, BALOK.cy, BALOK.s, i, W.hijau))), tambah(idx(SUARA_D3, "dua"), teks("cr", 232, 174, "12 rusuk", 12, W.merah))),
    k(SUARA_D4, ...Array.from({ length: 8 }, (_, i) => tambah(idx(SUARA_D4, "delapan"), titikSudut("balok", "bla", BALOK.cx, BALOK.cy, BALOK.s, i))), tambah(idx(SUARA_D4, "delapan"), teks("ct", 232, 192, "8 titik sudut", 11, W.merah))),
    k(SUARA_D5, sorotkan(idx(SUARA_D5, "enam"), "cs"), sorotkan(idx(SUARA_D5, "dua", 1), "cr"), sorotkan(idx(SUARA_D5, "delapan"), "ct"), tambah(idx(SUARA_D5, "kubus"), cocok("ok", 60, 190, 18))),
  ],
};

/* ------------------------------ 5. Ringkasan tiga metode ------------------------------ */
const SUARA_R1 = "Kita sudah melihat tiga metode dari luar untuk belajar bangun ruang.";
const SUARA_R2 = "Cetak Permukaan. Bangun ruang ditekan, lalu muncul cap yang berbentuk bangun datar.";
const SUARA_R3 = "Tas Misteri. Kita menebak bangun ruang dari bayangan dan petunjuknya.";
const SUARA_R4 = "Ciri Bangun Ruang. Kita menyebut sisi, rusuk, dan titik sudutnya.";
const SUARA_R5 = "Ketiga cara ini membantu kamu mengenali bangun ruang. Sampai jumpa, dan tetap semangat belajar!";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Ringkasan metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, teks("jud", 150, 18, "Ringkasan", 11, W.ungu)),
      tambah(idx(SUARA_R1, "tiga"), ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11), ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11), ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(SUARA_R2, sorotkan(idx(SUARA_R2, "Cetak"), "m0-k", "m0-t0"), tambah(idx(SUARA_R2, "cap"), emo("e0", 262, 64, "\u{1F5A8}", 18))),
    k(SUARA_R3, redamkan(0, "m0-k", "m0-t0"), sorotkan(idx(SUARA_R3, "Tas"), "m1-k", "m1-t0"), tambah(idx(SUARA_R3, "bayangan"), emo("e1", 262, 112, "\u{1F45C}", 18))),
    k(SUARA_R4, redamkan(0, "m1-k", "m1-t0"), sorotkan(idx(SUARA_R4, "Ciri"), "m2-k", "m2-t0"), tambah(idx(SUARA_R4, "sisi"), emo("e2", 262, 160, "\u{1F4D0}", 18))),
    k(SUARA_R5, redamkan(0, "m2-k", "m2-t0"), tambah(idx(SUARA_R5, "Ketiga"), emo("ow", 150, 196, OWL, 22))),
  ],
};

