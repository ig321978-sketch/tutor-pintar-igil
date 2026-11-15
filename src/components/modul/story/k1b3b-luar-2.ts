import type { AdeganStory } from "./logika-story";
import { W, bingkai, emo, judul, kartu, kotak, teks } from "./k1b3b-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k1b3b-bantu";
import { NAMA_METODE_ID, WARNA_METODE, kepala } from "./k1b3b-luar-1";

const ANAK = "\u{1F9D2}";
const BIRU_MUDA = "#93C5FD";

/* ------------------------------ 4. Hitung Mundur: konsep ------------------------------ */
const SUARA_M1 = "Metode kedua, Hitung Mundur. Kita sebut bilangan awal dulu. Lalu kita menyebut angka mundur, satu per satu.";
const SUARA_M2 = "Misalnya delapan dikurangi tiga. Mulai dari delapan, lalu mundur tiga langkah. Tujuh, enam, lima.";
const SUARA_M3 = "Lima adalah hasilnya. Jadi delapan dikurangi tiga sama dengan lima.";
const SUARA_M4 = "Seperti hitung mundur roket. Angkanya turun satu per satu, dan bilangan awal tidak ikut dihitung.";
const KX = [0, 1, 2, 3].map((i) => 12 + i * 74);

export const ADEGAN_LUAR_MUNDUR: AdeganStory = {
  id: "luar-mundur",
  judul: "Hitung Mundur: sebut angka dari bilangan awal",
  sumber: "Metode luar: Hitung Mundur",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_M1, tambah(0, ...kepala(1)), tambah("bilangan", ...kartu("m0", KX[0], 70, 62, 50, W.krem, ["8"], 26)), tambah("awal", teks("aw", KX[0] + 31, 134, "awal", 9, W.ungu))),
    k(
      SUARA_M2,
      ...["Tujuh,", "enam,", "lima."].flatMap((kata, i) => [
        tambah(kata, ...kartu(`m${i + 1}`, KX[i + 1], 70, 62, 50, W.langit, [String(7 - i)], 26), teks(`pm${i}`, KX[i] + 68, 100, "\u{2192}", 14, W.ungu), teks(`sl${i}`, KX[i + 1] + 31, 144, String(i + 1), 14, W.hijau)),
      ]),
    ),
    k(SUARA_M3, sorotkan("hasilnya.", "m3-k"), tambah("Jadi", teks("ms", 150, 192, "8 − 3 = 5", 22, W.hijau))),
    k(
      SUARA_M4,
      bersih(0),
      tambah(0, ...kepala(1)),
      tambah("roket.", emo("rk", 150, 110, "\u{1F680}", 50)),
      tambah("Angkanya", ...kartu("rt", 30, 140, 240, 30, W.krem, ["angka turun satu per satu"], 10.5)),
    ),
  ],
};

/* ------------------------------ 5. Hitung Mundur: terapan (turun tangga) ------------------------------ */
const TOP = (i: number): number => 176 - 12 * i;
const SX = (i: number): number => 20 + 26 * (i - 1) + 13;
const TANGGA = Array.from({ length: 10 }, (_, q) => q + 1).flatMap((i) => [kotak(`st${i}`, 20 + 26 * (i - 1), TOP(i), 26, 190 - TOP(i), W.krem, W.biru, { rx: 1, tebal: 1 }), teks(`sn${i}`, SX(i), TOP(i) + 10, String(i), 9, W.merah)]);
const SUARA_T1 = "Wei berdiri di anak tangga nomor sembilan. Wei akan turun dua anak tangga.";
const SUARA_T2 = "Turun satu anak tangga, sampai di nomor delapan. Turun satu lagi, sampai di nomor tujuh.";
const SUARA_T3 = "Wei berhenti di nomor tujuh. Sembilan dikurangi dua sama dengan tujuh.";
const SUARA_T4 = "Ucapkan lagi bersama suara guru. Sembilan dikurangi dua sama dengan tujuh. Hebat sekali!";

export const ADEGAN_LUAR_MUNDUR_TERAPAN: AdeganStory = {
  id: "luar-mundur-terapan",
  judul: "Hitung Mundur: Wei turun tangga",
  sumber: "Metode luar: Hitung Mundur, terapan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, ...kepala(1), ...TANGGA),
      tambah("berdiri", emo("wt", SX(9), TOP(9) - 1, ANAK, 20)),
      sorotkan("sembilan.", "st9"),
      tambah("turun", teks("lg", 80, 68, "turun 2 anak tangga", 10, W.ungu)),
    ),
    k(
      SUARA_T2,
      ubah("delapan.", { id: "wt", x: SX(8), y: TOP(8) - 1 }, { id: "lg", isi: "sudah turun 1" }),
      ubah("tujuh.", { id: "wt", x: SX(7), y: TOP(7) - 1 }, { id: "lg", isi: "sudah turun 2" }),
    ),
    k(SUARA_T3, sorotkan("tujuh.", "st7"), tambah("Sembilan", teks("ts", 75, 100, "9 − 2 = 7", 18, W.hijau))),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Ucapkan lagi"), emo("uc", 150, 70, "\u{1F4AC}", 40)),
      tambah("Sembilan", ...kartu("e1", 40, 104, 220, 36, W.hijauMuda, ["9 − 2 = 7"], 18)),
      tambah("Hebat", emo("ow", 150, 176, "\u{1F989}", 30)),
    ),
  ],
};

/* ------------------------------ 6. Kurang di Bingkai: konsep ------------------------------ */
const SUARA_F1 = "Metode ketiga, Kurang di Bingkai. Kita isi bingkai dengan bilangan awal.";
const SUARA_F2 = "Misalnya sembilan dikurangi empat. Sembilan petak berisi titik merah.";
const SUARA_F3 = "Sekarang kosongkan empat petak. Titik di empat petak itu kita angkat.";
const SUARA_F4 = "Titik yang tersisa ada lima. Sembilan dikurangi empat sama dengan lima.";
const titik = (id: string, dari: number, sampai: number) => Array.from({ length: sampai - dari }, (_, q) => `${id}-t${dari + q}`);

export const ADEGAN_LUAR_BINGKAI: AdeganStory = {
  id: "luar-bingkai",
  judul: "Kurang di Bingkai: kosongkan petak",
  sumber: "Metode luar: Kurang di Bingkai",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_F1, tambah(0, ...kepala(2)), tambah("bingkai", ...bingkai("kb", 80, 62, 0, 28))),
    k(SUARA_F2, tambah(idx(SUARA_F2, "sembilan", 2), ...bingkai("kb", 80, 62, 9, 28).filter((o) => /^kb-t/.test(o.id))), tambah("titik", teks("t9", 150, 140, "9 terisi", 11, W.merah))),
    k(
      SUARA_F3,
      ubah("kosongkan", ...[5, 6, 7, 8].map((i) => ({ id: `kb-c${i}`, warna: BIRU_MUDA }))),
      tambah("kosongkan", teks("t4", 150, 158, "kosongkan 4", 11, W.biru)),
      hapus("angkat.", ...titik("kb", 5, 9), "t9"),
    ),
    k(SUARA_F4, sorotkan("tersisa", ...titik("kb", 0, 5)), tambah("Sembilan", teks("fs", 150, 194, "9 − 4 = 5", 22, W.hijau))),
  ],
};

/* ------------------------------ 7. Kurang di Bingkai: terapan ------------------------------ */
const SUARA_G1 = "Halim punya sepuluh bola. Bola itu mengisi semua petak di bingkai.";
const SUARA_G2 = "Empat bola menggelinding pergi. Kita kosongkan empat petak.";
const SUARA_G3 = "Sekarang hitung titik yang tersisa. Ada enam titik.";
const SUARA_G4 = "Sepuluh dikurangi empat sama dengan enam. Halim sudah mendapat jawabannya.";

export const ADEGAN_LUAR_BINGKAI_TERAPAN: AdeganStory = {
  id: "luar-bingkai-terapan",
  judul: "Kurang di Bingkai: sepuluh bola Halim",
  sumber: "Metode luar: Kurang di Bingkai, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_G1, tambah(0, ...kepala(2)), tambah("sepuluh", ...bingkai("ub", 80, 62, 10, 28)), tambah("bola.", teks("g10", 150, 140, "10 bola", 12, W.ungu))),
    k(
      SUARA_G2,
      hapus("pergi.", ...titik("ub", 6, 10)),
      ubah("kosongkan", ...[6, 7, 8, 9].map((i) => ({ id: `ub-c${i}`, warna: BIRU_MUDA }))),
      tambah("pergi.", teks("g4", 150, 160, "pergi: 4 bola", 11, W.merah)),
    ),
    k(SUARA_G3, sorotkan("tersisa.", ...titik("ub", 0, 6)), hapus(0, "g10"), tambah("enam", teks("g6", 150, 140, "6 titik tersisa", 11, W.hijau))),
    k(SUARA_G4, tambah("Sepuluh", teks("gs", 150, 194, "10 − 4 = 6", 22, W.hijau))),
  ],
};

/* ------------------------------ 8. Ringkasan metode luar ------------------------------ */
const SUARA_R1 = "Mari kita ingat tiga metode dari luar. Mengambil, Hitung Mundur, dan Kurang di Bingkai.";
const SUARA_R2 = "Mengambil: kita ambil sebagian keluar dari kumpulan, lalu menghitung benda yang tinggal.";
const SUARA_R3 = "Hitung Mundur: kita sebut bilangan awal, lalu menyebut angka mundur. Kurang di Bingkai: kita kosongkan petak, lalu menghitung titik yang tersisa.";
const SUARA_R4 = "Boleh memilih metode yang paling kamu suka. Semuanya menuju jawaban yang sama. Hebat sekali!";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Metode luar: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tiga metode dari luar")),
      ...NAMA_METODE_ID.map((m, i) => tambah(["Mengambil,", "Mundur,", "Bingkai."][i], ...kartu(`r${i}`, 20, 38 + i * 46, 260, 36, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, judul("Mengambil"), emo("ra", 150, 80, "\u{1F34E}", 44)),
      tambah("ambil", ...kartu("rb", 20, 108, 260, 50, W.hijauMuda, ["ambil sebagian keluar", "hitung yang tinggal"], 10.5)),
    ),
    k(
      SUARA_R3,
      bersih(0),
      tambah(0, judul("Dua metode lagi")),
      tambah("Hitung", ...kartu("rc", 20, 38, 260, 50, W.langit, ["Hitung Mundur", "sebut angka mundur"], 10.5)),
      tambah("Bingkai:", ...kartu("rd", 20, 108, 260, 50, W.pink, ["Kurang di Bingkai", "kosongkan petak, hitung titik"], 10.5)),
    ),
    k(SUARA_R4, bersih(0), tambah(0, judul("Pilih yang kamu suka"), emo("ow", 150, 92, "\u{1F989}", 54)), tambah("Hebat", ...kartu("rh", 60, 130, 180, 34, W.emas, ["hasilnya sama"], 12))),
  ],
};
