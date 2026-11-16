import type { AdeganStory, Obj } from "./logika-story";
import { W, bulat, emo, hapus, k, panah, redamkan, sorotkan, tambah, ubah } from "./kit/dasar";
import { BENDA, KALIMAT_KUNCI_1A, LINTANG, NIKO, TALA, benda, lambang, rumput } from "./kit/dunia-k1";
import {
  APEL,
  LATAR_KEBUN,
  LATAR_TERANG,
  U_APEL,
  anak,
  aksiKunci,
  apelSebar,
  beringin,
  cincin,
  hitungBenda,
  idApel,
  idBenda,
  idPenghitung,
  judulLangkah,
  keranjangKebun,
  masuk,
  penghitung,
  posSebar,
  slotKr,
} from "./o2k1a-bantu";

/** Video Sub-Bab A (bagian 2): nol (angin kedua) dan langkah GESER (mengambil tujuh, apel berserakan, jeruk melingkar). Sepuluh apel tetap sepuluh. */

/* ------------------------------ Nol: angin kedua menjatuhkan keranjang (enam apel keluar, jadi sepuluh di rumput) ------------------------------ */
export const ADEGAN_ANGIN_NOL: AdeganStory = {
  id: "angin-nol",
  judul: "Nol: angin membuat keranjang kosong",
  sumber: "Cerita: angin kedua dan keranjang kosong",
  latar: LATAR_KEBUN,
  ketukan: [
    k(
      "Angin datang lagi, kencang sekali.",
      tambah(
        0,
        rumput(150),
        ...anak(LINTANG),
        ...anak(TALA),
        ...anak(NIKO),
        ...keranjangKebun(),
        ...[5, 6, 7, 8, 9, 10].map((n) => benda("a" + n, slotKr(n - 5)[0], slotKr(n - 5)[1], APEL, U_APEL)),
        ...[1, 2, 3, 4].map((n) => benda("a" + n, posSebar(n - 1)[0], posSebar(n - 1)[1], APEL, U_APEL)),
      ),
      tambah(2, emo("an", 150, 66, "\u{1F4A8}", 30)),
    ),
    k(
      "Keranjang jatuh. Apel berserakan di rumput.",
      ubah(1, { id: "kr-tp", y: 148 }, { id: "kr-bd", y: 106 }),
      ubah(3, ...[5, 6, 7, 8, 9, 10].map((n) => ({ id: "a" + n, x: posSebar(n - 1)[0], y: posSebar(n - 1)[1] }))),
      hapus(4, "an"),
    ),
    k("Tidak ada apel di keranjang.", sorotkan(2, "kr-bd", "kr-tp")),
    k(
      "Nol artinya tidak ada apel di keranjang.",
      redamkan(0, "kr-bd", "kr-tp"),
      tambah(0, ...lambang("lb", 110, 28, "0", 56, 52, 40)),
      sorotkan(0, "lb-k", "lb-t"),
      tambah(5, panah("pn", 166, 80, 40, 22, W.merah, 3)),
    ),
  ],
};

/* ------------------------------ GESER, benda berserakan: Nenek minta tujuh apel ------------------------------ */
export const ADEGAN_GESER_SEBAR: AdeganStory = {
  id: "geser-sebar",
  judul: "Geser: tujuh apel untuk Nenek",
  sumber: "Metode: geser yang sudah dihitung",
  latar: LATAR_KEBUN,
  ketukan: [
    k(
      "Kata Nenek, tolong ambil tujuh apel.",
      tambah(0, rumput(150), ...anak(LINTANG), ...keranjangKebun(), ...apelSebar(10), judulLangkah("GESER", 196, 16)),
      tambah(1, emo("bc", 96, 52, "\u{1F4AC}", 28)),
      tambah(4, ...lambang("nk", 112, 30, "7", 36, 36, 24)),
    ),
    k(
      "Lintang menggeser apelnya. Satu, dua, tiga, empat, lima, enam, tujuh.",
      hapus(0, "bc", "nk-k", "nk-t"),
      tambah(3, ...penghitung("1")),
      ...idApel(1, 7).map((_, i) => masuk(3 + i, i + 1, i + 1)),
    ),
    k("Lintang berhenti. Tepat tujuh apel.", tambah(2, cincin("rg", 174, 112, 94, 40))),
    k("Yang sudah dihitung digeser, supaya tidak lupa.", hapus(0, "rg"), tambah(3, emo("ck", 222, 100, "\u{2705}", 26))),
    k(
      "Igil berkata begini. " + KALIMAT_KUNCI_1A,
      hapus(0, ...idPenghitung, "ck"),
      tambah(0, ...beringin()),
      sorotkan(0, "tk-igil"),
      ...aksiKunci(3),
      sorotkan(5, ...idApel(1, 7)),
    ),
  ],
};

/* ------------------------------ GESER, benda melingkar: jeruk di piring, ditandai bendera ------------------------------ */
const PUSAT_PIRING: [number, number] = [165, 118];
const R_PIRING = 38;
export const POS_JERUK: [number, number][] = Array.from({ length: 6 }, (_, i) => [
  Math.round(PUSAT_PIRING[0] + R_PIRING * Math.cos(-Math.PI / 2 + (Math.PI / 3) * i)),
  Math.round(PUSAT_PIRING[1] + R_PIRING * Math.sin(-Math.PI / 2 + (Math.PI / 3) * i)),
]);
const jeruk = (): Obj[] => POS_JERUK.map(([x, y], i) => benda("j" + (i + 1), x, y, BENDA.jeruk, 26));

export const ADEGAN_GESER_LINGKAR: AdeganStory = {
  id: "geser-lingkar",
  judul: "Geser: menandai jeruk pertama dengan bendera",
  sumber: "Metode: tandai benda pertama",
  latar: LATAR_TERANG,
  ketukan: [
    k(
      "Di piring ada jeruk, melingkar.",
      tambah(0, ...anak(NIKO, 34), ...anak(TALA), bulat("pl", PUSAT_PIRING[0], PUSAT_PIRING[1], 56, W.putih, W.abuTua)),
      tambah(2, ...jeruk()),
    ),
    k(
      "Tala berkata, tandai jeruk pertama dengan bendera. Berhenti di bendera.",
      sorotkan(0, "tk-tala"),
      tambah(4, emo("bd", POS_JERUK[0][0], POS_JERUK[0][1] - 24, "\u{1F6A9}", 14)),
      sorotkan(4, "j1"),
      sorotkan(8, "bd"),
    ),
    k(
      "Satu, dua, tiga, empat, lima, enam.",
      redamkan(0, "tk-tala", "j1", "bd"),
      tambah(0, ...penghitung("1")),
      ...hitungBenda(idBenda("j", 6)),
    ),
    k(
      "Yang terakhir enam. Jeruk atau apel, hitungnya begitu juga.",
      hapus(0, ...idPenghitung),
      redamkan(0, "j6"),
      tambah(1, bulat("rg", PUSAT_PIRING[0], PUSAT_PIRING[1], 62, "none", W.merah, { tebal: 2.5 })),
      tambah(3, emo("i1", 262, 62, APEL, 30), emo("i2", 262, 104, BENDA.jeruk, 30)),
    ),
  ],
};
