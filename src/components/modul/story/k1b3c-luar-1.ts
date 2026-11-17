import type { AdeganStory, Obj } from "./logika-story";
import { E, KURANG, W, emo, judul, kalimatC, kartu, orang, teks } from "./k1b3c-gambar";
import { bersih, k, sorotkan, tambah } from "./k1b3c-bantu";

/* Video metode global Sub-Bab C "Kondektur dan Penumpang": pembuka dan Fact Family (Keluarga Fakta). */

export const NAMA_METODE = ["Fact Family", "Fact Triangle", "Think Addition"];
export const NAMA_METODE_ID = ["Keluarga Fakta", "Segitiga Fakta", "Berpikir Penjumlahan"];
export const WARNA_METODE = [W.pink, W.lavender, W.hijauMuda];
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka ------------------------------ */
const SUARA_O1 = "Catatan kondektur sudah cocok. Kaka bercerita, anak-anak di negara lain juga belajar hubungan penjumlahan dan pengurangan. Kita lihat tiga metode global.";
const SUARA_O2 = "Tiga metode itu: Fact Family, Fact Triangle, dan Think Addition.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Keluarga Fakta, Segitiga Fakta, dan Berpikir Penjumlahan.";
const SUARA_O4 = "Semua metode memakai satu ide: penjumlahan dan pengurangan saling berkebalikan.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode global untuk hubungan tambah dan kurang",
  sumber: "Metode global: pembuka",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Tiga metode global"), emo("kc", 150, 96, E.karcis, 40)),
      tambah("Kaka", ...orang("kk", 40, 120, E.kaka, "Kaka")),
      tambah("negara", emo("gl", 250, 110, "\u{1F30D}", 44)),
      tambah("tiga", ...kartu("pk", 50, 146, 200, 32, W.emas, ["3 metode global"], 11)),
    ),
    k(SUARA_O2, bersih(0), tambah(0, judul("Tiga metode")), ...NAMA_METODE.map((m, i) => tambah(["Fact", "Triangle,", "Addition."][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11)))),
    k(SUARA_O3, bersih(0), tambah(0, judul("Nama dalam bahasa Indonesia")), ...NAMA_METODE_ID.map((m, i) => tambah(["Keluarga", "Segitiga", "Berpikir"][i], ...kartu(`n${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11)))),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Satu ide")),
      tambah("penjumlahan", ...kartu("pj", 30, 70, 110, 40, W.hijauMuda, ["+"], 26)),
      tambah("pengurangan", ...kartu("pg", 160, 70, 110, 40, W.merahMuda, [KURANG], 26)),
      tambah("berkebalikan.", teks("bk", 150, 150, "saling berkebalikan", 12, W.ungu)),
    ),
  ],
};

/* ------------------------------ 2. Fact Family: konsep ------------------------------ */
const SUARA_A1 = "Metode pertama, Fact Family, atau Keluarga Fakta. Satu keluarga punya tiga bilangan.";
const SUARA_A2 = "Dua bilangan kecil adalah bagian. Bilangan paling besar adalah semuanya.";
const SUARA_A3 = "Dari tiga bilangan itu lahir empat kalimat: dua penjumlahan dan dua pengurangan.";
const SUARA_A4 = "Pada pengurangan, bilangan paling besar selalu ditulis di depan.";

export const ADEGAN_LUAR_KELUARGA: AdeganStory = {
  id: "luar-keluarga",
  judul: "Fact Family: keluarga fakta",
  sumber: "Metode global: Fact Family",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_A1, tambah("pertama,", ...kepala(0)), tambah("tiga", ...kartu("r", 80, 60, 140, 34, W.emas, ["bagian, bagian, semua"], 10))),
    k(SUARA_A2, tambah("kecil", teks("bg", 100, 116, "bagian kecil", 10, W.biru)), tambah("semuanya.", teks("sm", 210, 116, "paling besar", 10, W.merah))),
    k(SUARA_A3, tambah("empat", ...kartu("e", 40, 136, 220, 26, W.pink, ["2 tambah, 2 kurang"], 11))),
    k(SUARA_A4, tambah("depan.", teks("dp", 150, 186, "kurang: yang besar di depan", 10, W.ungu))),
  ],
};

/* ------------------------------ 3. Fact Family: terapan ------------------------------ */
const SUARA_B1 = "Di gerbong ada dua penumpang tidur dan enam penumpang membaca. Semuanya delapan.";
const SUARA_B2 = "Penjumlahannya: dua ditambah enam sama dengan delapan, dan enam ditambah dua sama dengan delapan.";
const SUARA_B3 = "Pengurangannya: delapan dikurangi dua sama dengan enam, dan delapan dikurangi enam sama dengan dua.";
const SUARA_B4 = "Empat kalimat, satu keluarga: dua, enam, dan delapan.";

export const ADEGAN_LUAR_KELUARGA_TERAPAN: AdeganStory = {
  id: "luar-keluarga-terapan",
  judul: "Fact Family: penumpang tidur dan membaca",
  sumber: "Metode global: Fact Family, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, ...kepala(0)),
      tambah("tidur", ...[0, 1].map((i) => emo(`td${i}`, 40 + i * 30, 70, E.tidur, 22))),
      tambah("membaca.", ...[0, 1, 2, 3, 4, 5].map((i) => emo(`bc${i}`, 120 + i * 28, 70, E.baca, 20))),
      tambah("delapan.", teks("t8", 150, 100, "semuanya 8", 10, W.ungu)),
    ),
    k(SUARA_B2, tambah("dua", ...kalimatC("k1", 80, 130, ["2", "+", "6", "=", "8"], 14, 20)), tambah("enam@2", ...kalimatC("k2", 220, 130, ["6", "+", "2", "=", "8"], 14, 20))),
    k(SUARA_B3, tambah("delapan", ...kalimatC("k3", 80, 160, ["8", KURANG, "2", "=", "6"], 14, 20)), tambah("delapan@2", ...kalimatC("k4", 220, 160, ["8", KURANG, "6", "=", "2"], 14, 20))),
    k(SUARA_B4, tambah("keluarga:", teks("kl", 150, 190, "keluarga: 2, 6, 8", 11, W.ungu)), sorotkan("delapan.", "k14", "k24", "k30", "k40")),
  ],
};

