import type { AdeganStory, Obj } from "./logika-story";
import { W, angkaBlok, blok, emo, idBlok, isiNT, judul, kartu, kepalaNT, namaBlok, rangkaNT, selNT, teks } from "./k2b1C-gambar";
import { gilir, idx, k, redamkan, sorotkan, tambah, ubah } from "./k2b1C-bantu";

const ex = (isi: string, id = "ex", x = 150, y = 150, u = 20): Obj => teks(id, x, y, isi, u, W.merah);

/** Dua baris tabel nilai tempat penuh (kerangka dan isi): baris a dan baris b. */
export const barisPenuh = (a: [number, number], b: [number, number]): Obj[] => [
  ...kepalaNT(),
  ...rangkaNT("a", 0),
  ...rangkaNT("b", 1),
  isiNT("a", 0, "n", String(a[0] * 10 + a[1])),
  isiNT("a", 0, "p", String(a[0])),
  isiNT("a", 0, "s", String(a[1])),
  isiNT("b", 1, "n", String(b[0] * 10 + b[1])),
  isiNT("b", 1, "p", String(b[0])),
  isiNT("b", 1, "s", String(b[1])),
];
export const kolomP = ["nh-p-k", "nh-p", ...selNT("a", "p"), ...selNT("b", "p")];
export const kolomS = ["nh-s-k", "nh-s", ...selNT("a", "s"), ...selNT("b", "s")];

/* ------------------------------ 1. Dua stoples: Kira dan Upe ------------------------------ */
const SUARA_Q1 = "Sekarang Kira punya dua puluh enam permen. Upe punya tiga puluh dua permen.";
const SUARA_Q2 = "Permen siapa yang lebih banyak? Mengapa?";
const SUARA_Q3 = "Kita bisa memakai tabel nilai tempat untuk membandingkan bilangan.";

export const ADEGAN_DUA_BILANGAN: AdeganStory = {
  id: "dua-bilangan",
  judul: "Permen Kira dan permen Upe",
  sumber: "Materi: membandingkan dua bilangan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Permen Kira dan Upe")),
      tambah(idx(SUARA_Q1, "Kira"), namaBlok("k", 44, 110, "Kira")),
      tambah(idx(SUARA_Q1, "punya"), ...blok("k", 2, 6, 44, 110)),
      tambah(idx(SUARA_Q1, "enam"), angkaBlok("k", 44, 110, "26")),
      tambah(idx(SUARA_Q1, "Upe"), namaBlok("u", 184, 110, "Upe")),
      tambah(idx(SUARA_Q1, "punya", 2), ...blok("u", 3, 2, 184, 110)),
      tambah(idx(SUARA_Q1, "dua", 2), angkaBlok("u", 184, 110, "32")),
    ),
    k(SUARA_Q2, tambah(0, emo("tq", 150, 100, "❓", 34)), sorotkan("banyak?", ...idBlok("k", 2, 6), ...idBlok("u", 3, 2))),
    k(SUARA_Q3, redamkan(0, ...idBlok("k", 2, 6), ...idBlok("u", 3, 2)), tambah("tabel", ...kartu("tn", 50, 148, 200, 32, W.lavender, ["tabel nilai tempat"], 12))),
  ],
};

/* ------------------------------ 2. Tabel nilai tempat ------------------------------ */
const SUARA_T1 = "Tabel nilai tempat punya kolom puluhan dan kolom satuan.";
const SUARA_T2 = "Dua puluh enam adalah dua puluhan dan enam satuan.";
const SUARA_T3 = "Tiga puluh dua adalah tiga puluhan dan dua satuan.";
const SUARA_T4 = "Puluhan dihitung per sepuluh. Satuan dihitung satu per satu.";

export const ADEGAN_TABEL_NILAI: AdeganStory = {
  id: "tabel-nilai-tempat",
  judul: "Tabel nilai tempat",
  sumber: "Materi: tabel nilai tempat",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, ...kepalaNT(), ...rangkaNT("a", 0), ...rangkaNT("b", 1)),
      sorotkan(idx(SUARA_T1, "puluhan"), "nh-p-k", "nh-p"),
      redamkan(idx(SUARA_T1, "satuan"), "nh-p-k", "nh-p"),
      sorotkan(idx(SUARA_T1, "satuan"), "nh-s-k", "nh-s"),
    ),
    k(SUARA_T2, tambah(0, isiNT("a", 0, "n", "26")), tambah(idx(SUARA_T2, "dua", 2), isiNT("a", 0, "p", "2")), tambah(idx(SUARA_T2, "enam", 2), isiNT("a", 0, "s", "6"))),
    k(SUARA_T3, tambah(0, isiNT("b", 1, "n", "32")), tambah(idx(SUARA_T3, "tiga", 2), isiNT("b", 1, "p", "3")), tambah(idx(SUARA_T3, "dua", 2), isiNT("b", 1, "s", "2"))),
    k(
      SUARA_T4,
      tambah(idx(SUARA_T4, "Puluhan"), ...blok("x", 1, 0, 70, 178)),
      tambah(idx(SUARA_T4, "sepuluh"), angkaBlok("x", 70, 178, "10")),
      tambah(idx(SUARA_T4, "Satuan"), ...blok("y", 0, 1, 190, 178)),
      tambah(idx(SUARA_T4, "satu"), angkaBlok("y", 190, 178, "1")),
    ),
  ],
};

/* ------------------------------ 3. Puluhan dulu ------------------------------ */
const SUARA_U1 = "Sekarang amati kolom puluhan pada tabel nilai tempat. Mana yang lebih banyak?";
const SUARA_U2 = "Dua puluh enam punya dua puluhan. Tiga puluh dua punya tiga puluhan.";
const SUARA_U3 = "Tiga puluhan lebih banyak daripada dua puluhan.";
const SUARA_U4 = "Jadi tiga puluh dua lebih besar daripada dua puluh enam.";
const SUARA_U5 = "Bilangan yang menunjukkan benda lebih banyak disebut bilangan lebih besar.";
const SUARA_U6 = "Sebaliknya, dua puluh enam lebih kecil daripada tiga puluh dua.";

export const ADEGAN_PULUHAN_DULU: AdeganStory = {
  id: "puluhan-dulu",
  judul: "Puluhan dulu",
  sumber: "Materi: membandingkan puluhan lebih dulu",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_U1, tambah(0, ...barisPenuh([2, 6], [3, 2])), sorotkan(idx(SUARA_U1, "puluhan"), ...kolomP)),
    k(SUARA_U2, redamkan(0, ...kolomP), ...gilir(SUARA_U2, [["Dua", selNT("a", "p")], ["Tiga", selNT("b", "p")]])),
    k(SUARA_U3, redamkan(0, ...selNT("a", "p")), sorotkan(0, ...selNT("b", "p")), tambah("lebih", ex("3 > 2"))),
    k(SUARA_U4, redamkan(0, ...selNT("b", "p")), ubah("lebih", { id: "ex", isi: "32 > 26" })),
    k(SUARA_U5, tambah("Bilangan", ...kartu("bs", 30, 172, 240, 24, W.krem, ["lebih banyak: lebih besar"], 10))),
    k(SUARA_U6, ubah("dua", { id: "ex", isi: "26 < 32" })),
  ],
};

/* ------------------------------ 4. Puluhan sama, lihat satuan ------------------------------ */
const SUARA_V1 = "Sekarang dua bilangan lain: dua puluh empat dan dua puluh sembilan.";
const SUARA_V2 = "Dua puluh empat punya dua puluhan. Dua puluh sembilan juga punya dua puluhan.";
const SUARA_V3 = "Puluhannya sama, jadi sekarang kita lihat kolom satuan.";
const SUARA_V4 = "Empat satuan dan sembilan satuan. Sembilan satuan lebih banyak daripada empat satuan.";
const SUARA_V5 = "Jadi dua puluh sembilan lebih besar daripada dua puluh empat.";
const SUARA_V6 = "Kalau puluhannya sama, satuan yang menentukan.";

export const ADEGAN_PULUHAN_SAMA: AdeganStory = {
  id: "puluhan-sama",
  judul: "Puluhan sama, lihat satuan",
  sumber: "Materi: puluhan sama, banding satuan",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_V1, tambah(0, ...barisPenuh([2, 4], [2, 9]))),
    k(SUARA_V2, ...gilir(SUARA_V2, [["Dua", selNT("a", "p")], ["Dua", selNT("b", "p"), 3]])),
    k(SUARA_V3, redamkan(0, ...selNT("a", "p"), ...selNT("b", "p")), sorotkan("satuan.", ...kolomS)),
    k(SUARA_V4, redamkan(0, ...kolomS), ...gilir(SUARA_V4, [["Empat", selNT("a", "s")], ["sembilan", selNT("b", "s")]]), tambah("lebih", ex("9 > 4"))),
    k(SUARA_V5, redamkan(0, ...selNT("b", "s")), ubah("lebih", { id: "ex", isi: "29 > 24" })),
    k(SUARA_V6, tambah("satuan", ...kartu("ks", 30, 172, 240, 24, W.krem, ["puluhan sama: lihat satuan"], 10))),
  ],
};
