import type { AdeganStory } from "./logika-story";
import { BUNGA, MAINAN, W, banyakBenda, barisBenda, buatDt, emo, idBenda, kartu, namaBenda, sebar, teks } from "./k2b8A-gambar";
import { hapus, idPilihan, idx, k, pilihKata, redamkan, sorotkan, tambah, ubah } from "./k2b8A-bantu";
import { kepala } from "./k2b8A-luar-1";

const cap = (isi: string) => teks("cp", 150, 198, isi, 10.5, W.merah);

/* ------------------------------ 4. Hitung Frekuensi: konsep ------------------------------ */
const DF = buatDt(
  [
    { nama: "kambing", n: 8 },
    { nama: "sapi", n: 6 },
  ],
  { y0: 60, rh: 44, sh: 24, kepala: ["jenis", "turus", "frekuensi"] },
);
const SUARA_F1 = "Metode kedua bernama Hitung Frekuensi. Frekuensi artinya banyaknya, yaitu seberapa sering sesuatu muncul.";
const SUARA_F2 = "Mulai dari turus kambing. Ada satu ikat lima dan tiga garis.";
const SUARA_F3 = "Langkah pertama, hitung ikat lima. Langkah kedua, tambahkan garisnya, yaitu lima ditambah tiga, jadi delapan.";
const SUARA_F4 = "Sapi ada satu ikat lima dan satu garis, jadi enam.";
const SUARA_F5 = "Itulah Hitung Frekuensi. Turus berubah menjadi banyaknya, yaitu delapan dan enam.";

export const ADEGAN_LUAR_FREKUENSI: AdeganStory = {
  id: "luar-frekuensi",
  judul: "Hitung Frekuensi: turus jadi banyaknya",
  sumber: "Metode luar: Hitung Frekuensi",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_F1, tambah(0, ...kepala(1)), tambah(idx(SUARA_F1, "banyaknya,"), emo("fq", 150, 110, "\u{1F522}", 40)), tambah(idx(SUARA_F1, "yaitu"), emo("fs", 150, 160, "\u{1F4CA}", 30))),
    k(
      SUARA_F2,
      hapus(0, "fq", "fs"),
      tambah(idx(SUARA_F2, "Mulai"), ...DF.kepala(), ...DF.kerangkaBaris(0), ...DF.kerangkaBaris(1)),
      tambah(idx(SUARA_F2, "satu"), ...DF.ikat(0, 0)),
      tambah(idx(SUARA_F2, "tiga"), ...DF.turus(0, 5, 8)),
    ),
    k(SUARA_F3, sorotkan(idx(SUARA_F3, "hitung"), ...DF.sorot(0)), tambah(idx(SUARA_F3, "ditambah"), cap("5 + 3 = 8")), tambah(idx(SUARA_F3, "delapan."), DF.banyak(0))),
    k(
      SUARA_F4,
      redamkan(0, ...DF.sorot(0)),
      tambah(idx(SUARA_F4, "satu"), ...DF.ikat(1, 0)),
      tambah(idx(SUARA_F4, "garis,"), DF.garisKe(1, 5)),
      ubah(idx(SUARA_F4, "jadi"), { id: "cp", isi: "5 + 1 = 6" }),
      tambah(idx(SUARA_F4, "enam."), DF.banyak(1)),
    ),
    k(SUARA_F5, tambah(idx(SUARA_F5, "Itulah"), ...kartu("fr", 20, 156, 260, 30, W.emas, ["frekuensi = banyaknya"], 11)), sorotkan(idx(SUARA_F5, "banyaknya,"), ...DF.sorot(0), ...DF.sorot(1))),
  ],
};

/* ------------------------------ 5. Hitung Frekuensi: terapan ------------------------------ */
const DG = buatDt([{ nama: "mawar", n: 7 }], { y0: 60, rh: 50, sh: 26, kepala: ["jenis", "turus", "frekuensi"] });
const SUARA_G1 = "Terapkan pada soal ini. Wei mencatat mawar dengan turus. Ada satu ikat lima dan dua garis.";
const SUARA_G2 = "Berapa frekuensi mawar? Ketuk jawaban yang tepat.";
const SUARA_G3 = "Betul! Lima ditambah dua sama dengan tujuh.";
const SUARA_G4 = "Frekuensi mawar adalah tujuh, artinya ada tujuh mawar.";

export const ADEGAN_LUAR_FREKUENSI_TERAPAN: AdeganStory = {
  id: "luar-frekuensi-terapan",
  judul: "Hitung Frekuensi: mawar Wei",
  sumber: "Metode luar: Hitung Frekuensi",
  latar: "#DBEAFE",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, ...kepala(1), ...DG.kepala(), ...DG.kerangkaBaris(0)),
      tambah(idx(SUARA_G1, "satu"), ...DG.ikat(0, 0)),
      tambah(idx(SUARA_G1, "dua"), ...DG.turus(0, 5, 7)),
    ),
    k(SUARA_G2, tambah(idx(SUARA_G2, "Berapa"), teks("tanya", 150, 126, "berapa frekuensi mawar?", 12, W.ungu)), tambah(idx(SUARA_G2, "jawaban"), ...pilihKata(134, ["5", "7", "9"], 16))),
    k(SUARA_G3, sorotkan(idx(SUARA_G3, "Betul!"), "c2-k"), tambah(idx(SUARA_G3, "Lima"), cap("5 + 2 = 7")), tambah(idx(SUARA_G3, "tujuh."), DG.banyak(0))),
    k(SUARA_G4, redamkan(0, "c2-k"), hapus(0, "tanya", ...idPilihan(3)), tambah(idx(SUARA_G4, "Frekuensi"), ...kartu("fz", 40, 130, 220, 30, W.emas, ["frekuensi mawar: tujuh"], 11))),
  ],
};

/* ------------------------------ 6. Pilah Kategori: konsep ------------------------------ */
const SUARA_P1 = "Metode ketiga bernama Pilah Kategori. Kategori artinya jenis benda yang sama.";
const SUARA_P2 = "Lihat mainan Kira yang bercampur. Kalau langsung diturus, kita bisa keliru dan ada yang terlewat.";
const SUARA_P3 = "Jadi pilah dulu. Mobil-mobilan bersama mobil-mobilan, boneka bersama boneka.";
const SUARA_P4 = "Kelereng bersama kelereng, balok bersama balok. Sekarang tiap kategori sudah rapi.";
const SUARA_P5 = "Sesudah dipilah, kita menurus tiap kategori dengan mudah. Pilah dulu, baru menurus.";
const SEBAR_MAINAN = sebar(MAINAN, 66, 72, 40, 34);
const ID_AWAL = (nama: string) => idBenda(MAINAN.filter((m) => m.nama === nama));

export const ADEGAN_LUAR_PILAH: AdeganStory = {
  id: "luar-pilah",
  judul: "Pilah Kategori: pilah dulu",
  sumber: "Metode luar: Pilah Kategori",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_P1, tambah(0, ...kepala(2)), tambah(idx(SUARA_P1, "Kategori", 2), emo("kb", 150, 120, "\u{1F9FA}", 44))),
    k(SUARA_P2, hapus(0, "kb"), tambah(idx(SUARA_P2, "mainan"), ...SEBAR_MAINAN)),
    k(
      SUARA_P3,
      hapus(idx(SUARA_P3, "Jadi"), ...ID_AWAL("mobil-mobilan"), ...ID_AWAL("boneka")),
      tambah(idx(SUARA_P3, "Mobil-mobilan"), namaBenda("mobil-mobilan", 0), ...barisBenda("mobil-mobilan", 0, 1, 2)),
      tambah(idx(SUARA_P3, "boneka"), namaBenda("boneka", 1), ...barisBenda("boneka", 1, 1, 4)),
    ),
    k(
      SUARA_P4,
      hapus(idx(SUARA_P4, "Kelereng"), ...ID_AWAL("kelereng"), ...ID_AWAL("balok")),
      tambah(idx(SUARA_P4, "Kelereng"), namaBenda("kelereng", 2), ...barisBenda("kelereng", 2, 1, 6)),
      tambah(idx(SUARA_P4, "balok"), namaBenda("balok", 3), ...barisBenda("balok", 3, 1, 7)),
      tambah(idx(SUARA_P4, "rapi."), banyakBenda("mobil-mobilan", 0, 2), banyakBenda("boneka", 1, 4), banyakBenda("kelereng", 2, 6), banyakBenda("balok", 3, 7)),
    ),
    k(SUARA_P5, tambah(idx(SUARA_P5, "Sesudah"), ...kartu("pl", 30, 176, 240, 22, W.emas, ["1 pilah dulu, 2 baru menurus"], 10))),
  ],
};

/* ------------------------------ 7. Pilah Kategori: terapan ------------------------------ */
const SUARA_Q1 = "Terapkan pada soal ini. Wei punya bunga yang bercampur. Ada mawar, lili, tulip, dan aster.";
const SUARA_Q2 = "Apa yang harus dilakukan dulu? Ketuk jawaban yang tepat.";
const SUARA_Q3 = "Betul! Bunga dipilah menurut jenisnya, lalu dihitung.";
const SUARA_Q4 = "Setelah dipilah, mawar ada tujuh, lili ada empat, tulip ada lima, dan aster ada empat.";
const SEBAR_BUNGA = sebar(BUNGA, 66, 72, 40, 34);

export const ADEGAN_LUAR_PILAH_TERAPAN: AdeganStory = {
  id: "luar-pilah-terapan",
  judul: "Pilah Kategori: bunga Wei",
  sumber: "Metode luar: Pilah Kategori",
  latar: "#FCE7F3",
  ketukan: [
    k(SUARA_Q1, tambah(0, ...kepala(2)), tambah(idx(SUARA_Q1, "bunga"), ...SEBAR_BUNGA)),
    k(SUARA_Q2, hapus(0, ...idBenda(BUNGA)), tambah(idx(SUARA_Q2, "Apa"), teks("tanya", 150, 88, "apa yang dilakukan dulu?", 12, W.ungu)), tambah(idx(SUARA_Q2, "jawaban"), ...pilihKata(100, ["pilah dulu", "turus dulu", "jumlah dulu"], 10))),
    k(SUARA_Q3, sorotkan(idx(SUARA_Q3, "Betul!"), "c1-k"), tambah(idx(SUARA_Q3, "dipilah"), emo("pk", 270, 70, "✅", 22))),
    k(
      SUARA_Q4,
      redamkan(0, "c1-k"),
      hapus(0, "tanya", "pk", ...idPilihan(3)),
      tambah(idx(SUARA_Q4, "mawar"), namaBenda("mawar", 0), ...barisBenda("mawar", 0, 1, 7)),
      tambah(idx(SUARA_Q4, "tujuh,"), banyakBenda("mawar", 0, 7)),
      tambah(idx(SUARA_Q4, "lili"), namaBenda("lili", 1), ...barisBenda("lili", 1, 1, 4)),
      tambah(idx(SUARA_Q4, "empat,"), banyakBenda("lili", 1, 4)),
      tambah(idx(SUARA_Q4, "tulip"), namaBenda("tulip", 2), ...barisBenda("tulip", 2, 1, 5)),
      tambah(idx(SUARA_Q4, "lima,"), banyakBenda("tulip", 2, 5)),
      tambah(idx(SUARA_Q4, "aster"), namaBenda("aster", 3), ...barisBenda("aster", 3, 1, 4)),
      tambah(idx(SUARA_Q4, "empat", 2), banyakBenda("aster", 3, 4)),
    ),
  ],
};
