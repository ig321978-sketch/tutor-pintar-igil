import type { AdeganStory } from "./logika-story";
import { W, anak, emo, hitungKe, idKel, idLepas, idWadah, judul, kartu, lepasKe, lepasSemua, teks, wadahKe, type Kel } from "./k2b7A-gambar";
import { hapus, idKartu, idx, k, redamkan, sorotkan, tambah } from "./k2b7A-bantu";

const KUE = { warna: "#FDE68A", warnaS: "#F59E0B" };

/* ------------------------------ 2. Kue cubit Upe ------------------------------ */
const KC: Kel = { id: "kc", w: 0, s: 9, x: 90, y: 118, ...KUE };
const KB: Kel = { id: "kb", w: 5, s: 0, x: 68, y: 82, dy: 44, ...KUE };
const SUARA_C1 = "Hari ini Upe menata kue cubit di layar. Kue cubit itu kecil, bulat, dan manis.";
const SUARA_C2 = "Kalau kue cubit hanya berserakan seperti ini, kita sulit menghitung semuanya. Upe ingin tahu, berapa banyak kue cubit itu?";
const SUARA_C3 = "Upe punya cara. Setiap sepuluh kue cubit dimasukkan ke dalam satu bungkus. Satu bungkus selalu berisi sepuluh kue cubit.";
const SUARA_C4 = "Sekarang Upe punya lima bungkus. Setiap bungkus berisi sepuluh kue cubit, jadi lebih gampang dihitung.";
const SUARA_C5 = "Ayo menghitung puluhan. Sepuluh, dua puluh, tiga puluh, empat puluh, lima puluh. Ada lima puluh kue cubit.";

export const ADEGAN_CERITA_KUE: AdeganStory = {
  id: "cerita-kue",
  judul: "Kue cubit Upe",
  sumber: "Materi: kue cubit Upe",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_C1, tambah(0, judul("Kue cubit Upe")), tambah(idx(SUARA_C1, "Upe"), ...anak("upe", 40, 46)), tambah(idx(SUARA_C1, "kue"), ...lepasSemua(KC)), tambah(idx(SUARA_C1, "manis."), emo("kk", 240, 70, "\u{1F9C1}", 34))),
    k(SUARA_C2, tambah(idx(SUARA_C2, "sulit"), emo("tn", 258, 126, "❓", 30)), sorotkan(idx(SUARA_C2, "berapa"), ...idLepas(KC))),
    k(
      SUARA_C3,
      hapus(idx(SUARA_C3, "Setiap"), "tn", "kk", ...idLepas(KC)),
      tambah(idx(SUARA_C3, "bungkus."), ...wadahKe(KB, 1)),
      tambah(idx(SUARA_C3, "selalu"), ...kartu("kb1", 40, 150, 220, 28, W.emas, ["1 bungkus = 10 kue"], 11)),
    ),
    k(
      SUARA_C4,
      hapus(0, ...idKartu("kb1")),
      tambah(idx(SUARA_C4, "lima"), ...wadahKe(KB, 2), ...wadahKe(KB, 3)),
      tambah(idx(SUARA_C4, "bungkus."), ...wadahKe(KB, 4), ...wadahKe(KB, 5)),
    ),
    k(
      SUARA_C5,
      tambah(idx(SUARA_C5, "Sepuluh,"), hitungKe(KB, 1)),
      tambah(idx(SUARA_C5, "dua"), hitungKe(KB, 2)),
      tambah(idx(SUARA_C5, "tiga"), hitungKe(KB, 3)),
      tambah(idx(SUARA_C5, "empat"), hitungKe(KB, 4)),
      tambah(idx(SUARA_C5, "lima"), hitungKe(KB, 5)),
      sorotkan(idx(SUARA_C5, "Ada"), ...idKel(KB)),
    ),
  ],
};

/* ------------------------------ 3. Satu bungkus, satu puluhan ------------------------------ */
const SL: Kel = { id: "sl", w: 0, s: 10, x: 86, y: 60, ...KUE };
const SB: Kel = { id: "sb", w: 3, s: 0, x: 105, y: 56, ...KUE };
const SUARA_B1 = "Lihat sepuluh kue cubit lepas ini. Mari kita hitung bersama: satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh.";
const SUARA_B2 = "Sepuluh satuan sama dengan satu puluhan. Sebentar lagi, sepuluh satuan itu akan masuk ke dalam bungkus.";
const SUARA_B3 = "Lihat, sepuluh kue cubit lepas masuk ke dalam satu bungkus. Sekarang tinggal satu bungkus berisi sepuluh.";
const SUARA_B4 = "Satu bungkus adalah satu puluhan. Jadi satu puluhan berisi sepuluh satuan.";
const SUARA_B5 = "Dua bungkus berarti dua puluhan, yaitu dua puluh. Tiga bungkus berarti tiga puluhan, yaitu tiga puluh.";
const HITUNG_B = ["satu,", "dua,", "tiga,", "empat,", "lima,", "enam,", "tujuh,", "delapan,", "sembilan,", "sepuluh."];

export const ADEGAN_BUNGKUS: AdeganStory = {
  id: "bungkus",
  judul: "Satu bungkus, satu puluhan",
  sumber: "Materi: satu bungkus, satu puluhan",
  latar: "#ECFEFF",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Satu bungkus, satu puluhan")), ...HITUNG_B.map((kata, j) => tambah(idx(SUARA_B1, kata, 1), ...lepasKe(SL, j + 1)))),
    k(SUARA_B2, sorotkan(idx(SUARA_B2, "satuan"), ...idLepas(SL)), tambah(idx(SUARA_B2, "satu"), ...kartu("kt1", 50, 130, 200, 30, W.emas, ["10 satuan = 1 puluhan"], 12))),
    k(SUARA_B3, hapus(idx(SUARA_B3, "sepuluh"), ...idLepas(SL)), tambah(idx(SUARA_B3, "bungkus."), ...wadahKe(SB, 1))),
    k(SUARA_B4, hapus(0, ...idKartu("kt1")), tambah(idx(SUARA_B4, "adalah"), teks("sb-ln", 118, 106, "1 puluhan", 13, W.merah))),
    k(
      SUARA_B5,
      hapus(0, "sb-ln"),
      tambah(idx(SUARA_B5, "Dua"), ...wadahKe(SB, 2)),
      tambah(idx(SUARA_B5, "yaitu"), teks("t2", 80, 140, "2 puluhan = 20", 12, W.merah)),
      tambah(idx(SUARA_B5, "Tiga"), ...wadahKe(SB, 3)),
      tambah(idx(SUARA_B5, "yaitu", 2), teks("t3", 220, 140, "3 puluhan = 30", 12, W.merah)),
    ),
  ],
};

/* ------------------------------ 4. Melompat sepuluh-sepuluh ------------------------------ */
const LP: Kel = { id: "lp", w: 10, s: 0, x: 75, y: 34, dy: 46, ...KUE };
const SUARA_L1 = "Kita menghitung puluhan dengan melompat. Satu bungkus berisi sepuluh, jadi kita mulai dari sepuluh.";
const SUARA_L2 = "Lompat lagi! Sepuluh, dua puluh, tiga puluh, empat puluh, lima puluh.";
const SUARA_L3 = "Teruskan melompat. Enam puluh, tujuh puluh, delapan puluh, sembilan puluh, dan seratus.";
const SUARA_L4 = "Sepuluh puluhan sama dengan seratus. Ada sepuluh bungkus, dan semuanya berisi seratus kue cubit.";
const SUARA_L5 = "Ingat, puluhan melompat sepuluh demi sepuluh sampai seratus. Itu cara cepat untuk menghitung banyak benda.";

export const ADEGAN_LOMPAT: AdeganStory = {
  id: "lompat",
  judul: "Melompat sepuluh-sepuluh",
  sumber: "Materi: puluhan sampai seratus",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_L1, tambah(0, judul("Melompat sepuluh-sepuluh")), tambah(idx(SUARA_L1, "Satu"), ...wadahKe(LP, 1)), tambah(idx(SUARA_L1, "sepuluh,"), hitungKe(LP, 1))),
    k(
      SUARA_L2,
      tambah(idx(SUARA_L2, "dua"), ...wadahKe(LP, 2), hitungKe(LP, 2)),
      tambah(idx(SUARA_L2, "tiga"), ...wadahKe(LP, 3), hitungKe(LP, 3)),
      tambah(idx(SUARA_L2, "empat"), ...wadahKe(LP, 4), hitungKe(LP, 4)),
      tambah(idx(SUARA_L2, "lima"), ...wadahKe(LP, 5), hitungKe(LP, 5)),
    ),
    k(
      SUARA_L3,
      tambah(idx(SUARA_L3, "Enam"), ...wadahKe(LP, 6), hitungKe(LP, 6)),
      tambah(idx(SUARA_L3, "tujuh"), ...wadahKe(LP, 7), hitungKe(LP, 7)),
      tambah(idx(SUARA_L3, "delapan"), ...wadahKe(LP, 8), hitungKe(LP, 8)),
      tambah(idx(SUARA_L3, "sembilan"), ...wadahKe(LP, 9), hitungKe(LP, 9)),
      tambah(idx(SUARA_L3, "seratus."), ...wadahKe(LP, 10), hitungKe(LP, 10)),
    ),
    k(SUARA_L4, tambah(idx(SUARA_L4, "seratus."), ...kartu("lk", 50, 134, 200, 30, W.emas, ["10 puluhan = 100"], 12)), sorotkan(idx(SUARA_L4, "bungkus,"), ...idWadah(LP))),
    k(SUARA_L5, redamkan(0, ...idWadah(LP)), hapus(0, ...idKartu("lk")), tambah(idx(SUARA_L5, "puluhan"), ...kartu("lm", 30, 134, 240, 30, W.emas, ["melompat sepuluh demi sepuluh"], 11)), tambah(idx(SUARA_L5, "cepat"), emo("lz", 150, 190, "⚡", 18))),
  ],
};
