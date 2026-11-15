import type { AdeganStory } from "./logika-story";
import { W, chipPermukaan, emo, judul, kartu, letakTitikSudut, ruang, rusukBox, teks, tengahRusuk, titikSudut, cocok, type Titik } from "./k2b3C-gambar";
import { bersih, hapus, hitungObjek, idx, k, redamkan, sorotkan, tambah } from "./k2b3C-bantu";

/* Kubus besar: pusat dan ukuran dipakai bersama adegan sisi dan rusuk. */
export const KUBUS = { cx: 92, cy: 112, s: 50 };

/** Titik angka di luar balok: dari pusat menuju tengah rusuk atau titik sudut, ditambah `jarak` ke luar. */
const keluar = (p: Titik, cx: number, cy: number, jarak: number): Titik => {
  const dx = p.x - cx;
  const dy = p.y - cy;
  const n = Math.hypot(dx, dy) || 1;
  return { x: p.x + (dx / n) * jarak, y: p.y + (dy / n) * jarak + 3 };
};
export const titikAngkaRusuk = (jenis: "kubus" | "balok", cx: number, cy: number, s: number): Titik[] => Array.from({ length: 12 }, (_, i) => keluar(tengahRusuk(jenis, cx, cy, s, i), cx, cy, 11));
export const titikAngkaSudut = (jenis: "kubus" | "balok", cx: number, cy: number, s: number): Titik[] => Array.from({ length: 8 }, (_, i) => keluar(letakTitikSudut(jenis, cx, cy, s, i), cx, cy, 10));

/* ------------------------------ 1. Kubus: enam sisi ------------------------------ */
export const SISI_KUBUS = ["depan", "atas", "kanan", "belakang", "bawah", "kiri"];
const letakSisi = (i: number): { x: number; y: number } => ({ x: i < 3 ? 176 : 236, y: 44 + (i % 3) * 32 });
const SUARA_S1 = "Sekarang kita kenali kubus. Dadu adalah contoh kubus.";
const SUARA_S2 = "Kubus punya permukaan berbentuk segi empat yang sama besar. Permukaan kubus kita sebut sisi.";
const SUARA_S3 = "Ayo hitung sisinya. Satu depan, dua atas, tiga kanan, empat belakang, lima bawah, enam kiri.";
const SUARA_S4 = "Jadi kubus punya enam sisi, dan semua sisinya segi empat yang sama besar.";
const SUARA_S5 = "Dadu juga begitu. Dadu punya enam sisi, dan tiap sisi punya satu angka dari satu sampai enam.";

export const ADEGAN_KUBUS_SISI: AdeganStory = {
  id: "kubus-sisi",
  judul: "Kubus: enam sisi",
  sumber: "Materi: kubus dan sisinya",
  latar: "#FEF2F2",
  ketukan: [
    k(SUARA_S1, tambah(0, judul("Kubus")), tambah(idx(SUARA_S1, "kubus"), ...ruang("kubus", "kba", KUBUS.cx, KUBUS.cy, KUBUS.s)), tambah(idx(SUARA_S1, "Dadu"), teks("dd", KUBUS.cx, 178, "contoh: dadu", 10, W.merah))),
    k(SUARA_S2, tambah(idx(SUARA_S2, "segi"), ...kartu("sg", 168, 56, 124, 40, W.krem, ["segi empat", "sama besar"], 10)), sorotkan(idx(SUARA_S2, "sama"), "kba-fd", "kba-fa", "kba-fk"), tambah(idx(SUARA_S2, "sisi"), teks("ns", 230, 124, "disebut sisi", 11, W.merah))),
    k(
      SUARA_S3,
      redamkan(0, "kba-fd", "kba-fa", "kba-fk"),
      hapus(0, "sg-k", "sg-t0", "sg-t1", "ns"),
      ...SISI_KUBUS.map((nama, i) => tambah(idx(SUARA_S3, ["Satu", "dua", "tiga", "empat", "lima", "enam"][i]), ...kartu(`kba-s${i}`, letakSisi(i).x, letakSisi(i).y, 56, 24, i < 3 ? W.hijauMuda : W.langit, [`${i + 1} ${nama}`], 8.6))),
      sorotkan(idx(SUARA_S3, "depan"), "kba-fd"),
      redamkan(idx(SUARA_S3, "atas"), "kba-fd"),
      sorotkan(idx(SUARA_S3, "atas"), "kba-fa"),
      redamkan(idx(SUARA_S3, "kanan"), "kba-fa"),
      sorotkan(idx(SUARA_S3, "kanan"), "kba-fk"),
      redamkan(idx(SUARA_S3, "belakang"), "kba-fk"),
    ),
    k(SUARA_S4, tambah(idx(SUARA_S4, "enam"), teks("e6", 230, 156, "6 sisi", 14, W.merah)), tambah(idx(SUARA_S4, "sama"), cocok("ok", 230, 186, 20))),
    k(SUARA_S5, hapus(0, "dd"), tambah(idx(SUARA_S5, "Dadu"), teks("dd", KUBUS.cx, 178, "dadu: sisi 1 sampai 6", 9.6, W.biru))),
  ],
};

/* ------------------------------ 2. Kubus: rusuk dan titik sudut ------------------------------ */
const PTS_RUSUK = titikAngkaRusuk("kubus", KUBUS.cx, KUBUS.cy, KUBUS.s);
const PTS_SUDUT = titikAngkaSudut("kubus", KUBUS.cx, KUBUS.cy, KUBUS.s);
const SUARA_RK1 = "Sisi-sisi kubus bertemu di sebuah garis. Garis tempat sisi bertemu itu kita sebut rusuk.";
const SUARA_RK2 = "Ayo hitung rusuknya. Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh, sebelas, dua belas.";
const SUARA_RK3 = "Rusuk yang putus-putus tersembunyi di belakang kubus. Jadi kubus punya dua belas rusuk.";
const SUARA_RK4 = "Rusuk-rusuk bertemu di pojok. Pojok itu kita sebut titik sudut.";
const SUARA_RK5 = "Ayo hitung titik sudutnya. Satu, dua, tiga, empat, lima, enam, tujuh, delapan.";
const SUARA_RK6 = "Jadi kubus punya enam sisi, dua belas rusuk, dan delapan titik sudut.";

export const ADEGAN_KUBUS_RUSUK: AdeganStory = {
  id: "kubus-rusuk",
  judul: "Kubus: rusuk dan titik sudut",
  sumber: "Materi: rusuk dan titik sudut kubus",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_RK1, tambah(0, judul("Rusuk kubus"), ...ruang("kubus", "kba", KUBUS.cx, KUBUS.cy, KUBUS.s)), tambah(idx(SUARA_RK1, "garis"), rusukBox("kubus", "kba", KUBUS.cx, KUBUS.cy, KUBUS.s, 3)), tambah(idx(SUARA_RK1, "rusuk"), teks("lr", 230, 100, "rusuk", 14, W.merah))),
    k(
      SUARA_RK2,
      hapus(0, "lr"),
      ...hitungObjek(SUARA_RK2, "kbar", PTS_RUSUK, (i) => [rusukBox("kubus", "kba", KUBUS.cx, KUBUS.cy, KUBUS.s, i)], { setelah: "rusuknya" }),
    ),
    k(SUARA_RK3, tambah(idx(SUARA_RK3, "putus-putus"), ...kartu("hd", 176, 150, 114, 28, W.krem, ["tersembunyi: putus-putus"], 7.4)), tambah(idx(SUARA_RK3, "dua"), teks("e12", 232, 110, "12 rusuk", 14, W.merah))),
    k(
      SUARA_RK4,
      bersih(0),
      tambah(0, judul("Titik sudut kubus"), ...ruang("kubus", "kba", KUBUS.cx, KUBUS.cy, KUBUS.s)),
      tambah(idx(SUARA_RK4, "pojok"), titikSudut("kubus", "kba", KUBUS.cx, KUBUS.cy, KUBUS.s, 0)),
      tambah(idx(SUARA_RK4, "titik"), teks("lt", 230, 100, "titik sudut", 12, W.merah)),
    ),
    k(SUARA_RK5, hapus(0, "lt"), ...hitungObjek(SUARA_RK5, "kbat", PTS_SUDUT, (i) => [titikSudut("kubus", "kba", KUBUS.cx, KUBUS.cy, KUBUS.s, i)], { setelah: "sudutnya" })),
    k(
      SUARA_RK6,
      tambah(idx(SUARA_RK6, "enam"), teks("r1", 236, 70, "6 sisi", 12, W.merah)),
      tambah(idx(SUARA_RK6, "dua"), teks("r2", 236, 100, "12 rusuk", 12, W.merah)),
      tambah(idx(SUARA_RK6, "delapan"), teks("r3", 236, 130, "8 titik sudut", 11, W.merah)),
    ),
  ],
};

/* ------------------------------ 3. Balok ------------------------------ */
export const BALOK = { cx: 90, cy: 106, s: 34 };
const SUARA_BL1 = "Sekarang balok. Kardus dan kotak hadiah yang panjang adalah contoh balok.";
const SUARA_BL2 = "Balok juga punya enam sisi berbentuk segi empat. Tetapi ukuran sisinya tidak sama semua.";
const SUARA_BL3 = "Kubus punya sisi yang semuanya sama besar. Balok punya sisi yang berbeda ukuran.";
const SUARA_BL4 = "Balok punya dua belas rusuk dan delapan titik sudut. Jumlahnya sama dengan kubus.";
const SUARA_BL5 = "Jadi kubus dan balok sama-sama punya enam sisi, dua belas rusuk, dan delapan titik sudut.";

export const ADEGAN_BALOK: AdeganStory = {
  id: "balok",
  judul: "Balok: enam sisi berbeda ukuran",
  sumber: "Materi: balok",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_BL1, tambah(0, judul("Balok")), tambah(idx(SUARA_BL1, "balok"), ...ruang("balok", "bla", BALOK.cx, BALOK.cy, BALOK.s)), tambah(idx(SUARA_BL1, "Kardus"), teks("dd", BALOK.cx, 170, "contoh: kardus", 10, W.merah))),
    k(SUARA_BL2, tambah(idx(SUARA_BL2, "enam"), teks("e6", 232, 60, "6 sisi", 14, W.merah)), sorotkan(idx(SUARA_BL2, "segi"), "bla-fd", "bla-fa", "bla-fk"), tambah(idx(SUARA_BL2, "tidak"), ...kartu("bs", 176, 76, 116, 30, W.krem, ["ukuran berbeda"], 10))),
    k(
      SUARA_BL3,
      redamkan(0, "bla-fd", "bla-fa", "bla-fk"),
      tambah(idx(SUARA_BL3, "Kubus"), ...ruang("kubus", "kba", 232, 142, 26), teks("lk-kb", 232, 180, "kubus: sama", 8.6)),
      tambah(idx(SUARA_BL3, "Balok", 1), teks("lk-bl", BALOK.cx, 150, "balok: berbeda", 8.6)),
    ),
    k(
      SUARA_BL4,
      hapus(0, "lk-bl", "dd"),
      ...Array.from({ length: 12 }, (_, i) => tambah(idx(SUARA_BL4, "dua"), rusukBox("balok", "bla", BALOK.cx, BALOK.cy, BALOK.s, i, W.hijau))),
      ...Array.from({ length: 8 }, (_, i) => tambah(idx(SUARA_BL4, "delapan"), titikSudut("balok", "bla", BALOK.cx, BALOK.cy, BALOK.s, i))),
      tambah(idx(SUARA_BL4, "dua"), teks("r2", 60, 168, "12 rusuk", 11, W.merah)),
      tambah(idx(SUARA_BL4, "delapan"), teks("r3", 140, 168, "8 titik sudut", 10.4, W.merah)),
    ),
    k(
      SUARA_BL5,
      bersih(0),
      tambah(0, judul("Kubus dan balok")),
      tambah(idx(SUARA_BL5, "Jadi"), ...ruang("kubus", "kba", 60, 70, 24), ...ruang("balok", "bla", 140, 70, 20)),
      tambah(idx(SUARA_BL5, "enam"), ...kartu("t1", 20, 118, 80, 28, W.hijauMuda, ["6 sisi"], 11)),
      tambah(idx(SUARA_BL5, "dua"), ...kartu("t2", 110, 118, 80, 28, W.krem, ["12 rusuk"], 11)),
      tambah(idx(SUARA_BL5, "delapan"), ...kartu("t3", 200, 118, 90, 28, W.pink, ["8 titik sudut"], 10)),
    ),
  ],
};

/* ------------------------------ 4. Tabung ------------------------------ */
export const TABUNG = { cx: 86, cy: 108, s: 46 };
const SUARA_TB1 = "Sekarang tabung. Kaleng dan botol adalah contoh tabung.";
const SUARA_TB2 = "Tabung punya dua permukaan datar. Bentuknya lingkaran, satu di atas dan satu di bawah.";
const SUARA_TB3 = "Tabung juga punya satu permukaan lengkung, yaitu bagian sampingnya.";
const SUARA_TB4 = "Karena ada permukaan lengkung, tabung mudah menggelinding kalau berbaring. Kalau berdiri, tabung kokoh.";
const SUARA_TB5 = "Jadi tabung punya dua permukaan datar dan satu permukaan lengkung.";

export const ADEGAN_TABUNG: AdeganStory = {
  id: "tabung",
  judul: "Tabung: dua datar, satu lengkung",
  sumber: "Materi: tabung",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_TB1, tambah(0, judul("Tabung")), tambah(idx(SUARA_TB1, "tabung"), ...ruang("tabung", "tba", TABUNG.cx, TABUNG.cy, TABUNG.s)), tambah(idx(SUARA_TB1, "Kaleng"), teks("dd", TABUNG.cx, 178, "contoh: kaleng", 10, W.merah))),
    k(
      SUARA_TB2,
      sorotkan(idx(SUARA_TB2, "lingkaran"), "tba-ta"),
      tambah(idx(SUARA_TB2, "satu"), ...chipPermukaan("tba", 0, 176, 50, "datar"), teks("tba-l0", 152, 64, "atas", 9, W.biru, { anchor: "end" })),
      tambah(idx(SUARA_TB2, "satu", 2), ...chipPermukaan("tba", 1, 176, 82, "datar"), teks("tba-l1", 152, 96, "bawah", 9, W.biru, { anchor: "end" })),
    ),
    k(SUARA_TB3, redamkan(0, "tba-ta"), sorotkan(idx(SUARA_TB3, "lengkung"), "tba-bd"), tambah(idx(SUARA_TB3, "sampingnya"), ...chipPermukaan("tba", 2, 176, 114, "lengkung"), teks("tba-l2", 152, 128, "samping", 9, W.biru, { anchor: "end" }))),
    k(SUARA_TB4, redamkan(0, "tba-bd"), tambah(idx(SUARA_TB4, "menggelinding"), ...kartu("mg", 176, 150, 114, 28, W.krem, ["berbaring: menggelinding"], 7.6)), tambah(idx(SUARA_TB4, "berdiri"), emo("ok", 232, 196, "✅", 14))),
    k(SUARA_TB5, tambah(idx(SUARA_TB5, "dua"), teks("sm", TABUNG.cx, 158, "2 datar, 1 lengkung", 9.6, W.merah))),
  ],
};

