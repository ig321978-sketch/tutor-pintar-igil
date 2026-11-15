import type { AdeganStory, Obj } from "./logika-story";
import { RUANG, URUT_JENIS, W, bangunDatar, bulat, chipPermukaan, emo, judul, kartu, kotak, ruang, teks, tidakCocok, ukuranLengkung, cocok, type Jenis } from "./k2b3C-gambar";
import { idx, k, redamkan, sorotkan, tambah } from "./k2b3C-bantu";

/* ------------------------------ 1. Kerucut ------------------------------ */
export const KERUCUT = { cx: 86, cy: 108, s: 46 };
const ukK = ukuranLengkung("kerucut", KERUCUT.s);
export const PUNCAK = { x: KERUCUT.cx, y: KERUCUT.cy - (ukK.h + ukK.ry) / 2 };
const SUARA_KR1 = "Sekarang kerucut. Topi ulang tahun dan kerucut es krim adalah contoh kerucut.";
const SUARA_KR2 = "Kerucut punya satu permukaan datar, yaitu alasnya yang berbentuk lingkaran.";
const SUARA_KR3 = "Kerucut juga punya satu permukaan lengkung di bagian sampingnya.";
const SUARA_KR4 = "Ujung kerucut yang runcing kita sebut titik puncak. Kerucut punya satu titik puncak.";
const SUARA_KR5 = "Jadi kerucut punya satu permukaan datar, satu permukaan lengkung, dan satu titik puncak.";

export const ADEGAN_KERUCUT: AdeganStory = {
  id: "kerucut",
  judul: "Kerucut: satu datar, satu lengkung, satu puncak",
  sumber: "Materi: kerucut",
  latar: "#F5F3FF",
  ketukan: [
    k(SUARA_KR1, tambah(0, judul("Kerucut")), tambah(idx(SUARA_KR1, "kerucut"), ...ruang("kerucut", "kra", KERUCUT.cx, KERUCUT.cy, KERUCUT.s)), tambah(idx(SUARA_KR1, "Topi"), teks("dd", KERUCUT.cx, 178, "contoh: topi ulang tahun", 9.4, W.merah))),
    k(SUARA_KR2, tambah(idx(SUARA_KR2, "alasnya"), ...chipPermukaan("kra", 0, 176, 50, "datar"), teks("kra-l0", 152, 64, "alas", 9, W.biru, { anchor: "end" })), tambah(idx(SUARA_KR2, "lingkaran"), ...bangunDatar("lingkaran", "a", 262, 96, 12, W.hijauMuda), teks("dta-nm", 262, 122, "lingkaran", 9, W.biru))),
    k(SUARA_KR3, sorotkan(idx(SUARA_KR3, "lengkung"), "kra-bd"), tambah(idx(SUARA_KR3, "sampingnya"), ...chipPermukaan("kra", 1, 176, 114, "lengkung"), teks("kra-l1", 152, 128, "samping", 9, W.biru, { anchor: "end" }))),
    k(SUARA_KR4, redamkan(0, "kra-bd"), tambah(idx(SUARA_KR4, "runcing"), bulat("kra-pu", PUNCAK.x, PUNCAK.y, 3.6, W.merah, W.biru, { tebal: 1, z: 3 })), tambah(idx(SUARA_KR4, "puncak"), ...kartu("pc", 176, 150, 114, 28, W.krem, ["titik puncak"], 10))),
    k(SUARA_KR5, tambah(idx(SUARA_KR5, "satu"), teks("sm", KERUCUT.cx, 158, "1 datar, 1 lengkung, 1 puncak", 8.2, W.merah))),
  ],
};

/* ------------------------------ 2. Bola ------------------------------ */
export const BOLA = { cx: 86, cy: 106, s: 50 };
const SUARA_BO1 = "Terakhir, bola. Bola sepak dan kelereng adalah contoh bola.";
const SUARA_BO2 = "Seluruh permukaan bola lengkung. Bola hanya punya satu permukaan, yaitu permukaan lengkung.";
const SUARA_BO3 = "Bola tidak punya permukaan datar. Bola juga tidak punya rusuk dan tidak punya titik sudut.";
const SUARA_BO4 = "Karena seluruhnya lengkung, bola paling mudah menggelinding ke segala arah.";

export const ADEGAN_BOLA: AdeganStory = {
  id: "bola",
  judul: "Bola: hanya satu permukaan lengkung",
  sumber: "Materi: bola",
  latar: "#ECFEFF",
  ketukan: [
    k(SUARA_BO1, tambah(0, judul("Bola")), tambah(idx(SUARA_BO1, "Bola", 2), ...ruang("bola", "boa", BOLA.cx, BOLA.cy, BOLA.s)), tambah(idx(SUARA_BO1, "kelereng"), teks("dd", BOLA.cx, 178, "contoh: bola sepak", 10, W.merah))),
    k(SUARA_BO2, sorotkan(idx(SUARA_BO2, "lengkung"), "boa-bd"), tambah(idx(SUARA_BO2, "satu"), ...chipPermukaan("boa", 0, 176, 60, "lengkung"))),
    k(
      SUARA_BO3,
      redamkan(0, "boa-bd"),
      tambah(idx(SUARA_BO3, "datar"), teks("n1", 232, 108, "datar: tidak ada", 9.4, W.merah), tidakCocok("x1", 270, 118, 12)),
      tambah(idx(SUARA_BO3, "rusuk"), teks("n2", 232, 136, "rusuk: tidak ada", 9.4, W.merah), tidakCocok("x2", 270, 146, 12)),
      tambah(idx(SUARA_BO3, "sudut"), teks("n3", 232, 164, "titik sudut: tidak ada", 8.6, W.merah), tidakCocok("x3", 270, 174, 12)),
    ),
    k(SUARA_BO4, tambah(idx(SUARA_BO4, "menggelinding"), ...kartu("gm", 160, 34, 132, 26, W.pink, ["paling mudah menggelinding"], 8)), tambah(idx(SUARA_BO4, "arah"), cocok("ok", 196, 100, 18))),
  ],
};

/* ------------------------------ 3. Tabel bangun ruang ------------------------------ */
const NAMA_BARIS: Record<Jenis, string> = { kubus: "kubus", balok: "balok", tabung: "tabung", kerucut: "kerucut", bola: "bola" };
const yBaris = (i: number): number => 74 + i * 26;
/** Baris tabel ke-i: latar `tr{i}-k`, nama `tr{i}-n`, permukaan datar `tr{i}-d`, permukaan lengkung `tr{i}-l`. */
const baris = (i: number): Obj[] => {
  const j = URUT_JENIS[i];
  return [
    kotak(`tr${i}-k`, 12, yBaris(i) - 16, 276, 22, i % 2 === 0 ? W.krem : W.putih, W.abu, { rx: 4, tebal: 1 }),
    teks(`tr${i}-n`, 24, yBaris(i), NAMA_BARIS[j], 10.4, W.biru, { anchor: "start" }),
    teks(`tr${i}-d`, 190, yBaris(i), String(RUANG[j].datar), 12, W.merah),
    teks(`tr${i}-l`, 250, yBaris(i), String(RUANG[j].lengkung), 12, W.merah),
  ];
};
const SUARA_TR1 = "Kita rangkum dalam tabel. Setiap baris adalah satu bangun ruang.";
const SUARA_TR2 = "Kubus dan balok punya enam permukaan datar dan tidak punya permukaan lengkung.";
const SUARA_TR3 = "Tabung punya dua permukaan datar dan satu permukaan lengkung.";
const SUARA_TR4 = "Kerucut punya satu permukaan datar dan satu permukaan lengkung.";
const SUARA_TR5 = "Bola tidak punya permukaan datar. Bola hanya punya satu permukaan lengkung.";

export const ADEGAN_TABEL_RUANG: AdeganStory = {
  id: "tabel-ruang",
  judul: "Tabel permukaan bangun ruang",
  sumber: "Materi: tabel permukaan",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_TR1, tambah(0, judul("Tabel bangun ruang")), tambah(idx(SUARA_TR1, "tabel"), teks("th-n", 24, 52, "bangun ruang", 9.4, W.ungu, { anchor: "start" }), teks("th-d", 190, 52, "datar", 9.4, W.ungu), teks("th-l", 250, 52, "lengkung", 9.4, W.ungu))),
    k(SUARA_TR2, tambah(idx(SUARA_TR2, "Kubus"), ...baris(0)), tambah(idx(SUARA_TR2, "balok"), ...baris(1))),
    k(SUARA_TR3, tambah(idx(SUARA_TR3, "Tabung"), ...baris(2))),
    k(SUARA_TR4, tambah(idx(SUARA_TR4, "Kerucut"), ...baris(3))),
    k(SUARA_TR5, tambah(idx(SUARA_TR5, "Bola"), ...baris(4)), sorotkan(idx(SUARA_TR5, "satu"), "tr4-l")),
  ],
};

/* ------------------------------ 4. Mencari bangun ruang ------------------------------ */
const POS = [30, 90, 150, 210, 270];
const BENDA: [Jenis, string, number][] = [
  ["kubus", "dadu", 20],
  ["balok", "kardus", 18],
  ["tabung", "kaleng", 22],
  ["kerucut", "topi", 22],
  ["bola", "kelereng", 22],
];
const kunci = (j: Jenis): string => `${j === "kubus" ? "kb" : j === "balok" ? "bl" : j === "tabung" ? "tb" : j === "kerucut" ? "kr" : "bo"}a`;
const SUARA_C1 = "Sekarang kita cari bangun ruang pada benda di layar. Ada dadu, kardus, kaleng, topi, dan kelereng.";
const SUARA_C2 = "Dadu bentuknya kubus. Kardus bentuknya balok. Keduanya punya permukaan datar.";
const SUARA_C3 = "Kaleng bentuknya tabung. Topi ulang tahun bentuknya kerucut. Keduanya punya permukaan lengkung.";
const SUARA_C4 = "Kelereng bentuknya bola. Bola seluruhnya lengkung.";
const SUARA_C5 = "Dengan cara ini, kita bisa mengenali bangun ruang pada benda apa saja yang tampil di layar.";

export const ADEGAN_CARI_RUANG: AdeganStory = {
  id: "cari-ruang",
  judul: "Mencari bangun ruang pada benda",
  sumber: "Materi: mengenali bangun ruang",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Benda dan bentuknya")),
      ...BENDA.map(([j, nama, s], i) => tambah(idx(SUARA_C1, nama), ...ruang(j, kunci(j), POS[i], 82, s), teks(`bn${i}`, POS[i], 122, nama, 9))),
    ),
    k(SUARA_C2, tambah(idx(SUARA_C2, "kubus"), teks("jn0", POS[0], 140, "kubus", 9.6, W.merah)), tambah(idx(SUARA_C2, "balok"), teks("jn1", POS[1], 140, "balok", 9.6, W.merah)), tambah(idx(SUARA_C2, "datar"), ...kartu("gd", 10, 158, 110, 26, W.hijauMuda, ["permukaan datar"], 9.4))),
    k(SUARA_C3, tambah(idx(SUARA_C3, "tabung"), teks("jn2", POS[2], 140, "tabung", 9.6, W.merah)), tambah(idx(SUARA_C3, "kerucut"), teks("jn3", POS[3], 140, "kerucut", 9.6, W.merah)), tambah(idx(SUARA_C3, "lengkung"), ...kartu("gl", 130, 158, 160, 26, W.pink, ["permukaan lengkung"], 9.4))),
    k(SUARA_C4, tambah(idx(SUARA_C4, "bola"), teks("jn4", POS[4], 140, "bola", 9.6, W.merah)), sorotkan(idx(SUARA_C4, "seluruhnya"), "boa-bd")),
    k(SUARA_C5, redamkan(0, "boa-bd"), tambah(idx(SUARA_C5, "mengenali"), emo("ow", 150, 198, "\u{1F50E}", 16))),
  ],
};
