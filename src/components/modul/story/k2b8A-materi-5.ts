import type { AdeganStory } from "./logika-story";
import { OWL, W, buatDt, emo, judul, kartu, teks } from "./k2b8A-gambar";
import { bersih, hapus, idKartu, idPilihan, idx, k, pilihKata, redamkan, sorotkan, tambah } from "./k2b8A-bantu";

const cap = (isi: string) => teks("cp", 150, 198, isi, 10.5, W.merah);

/* ------------------------------ 15. Latihan 1: membaca turus ------------------------------ */
const D1 = buatDt([{ nama: "ikan", n: 8 }], { y0: 44, rh: 52, sh: 24 });
const SUARA_A1 = "Latihan satu. Lihat turus ikan di layar. Ada satu ikat lima dan tiga garis.";
const SUARA_A2 = "Berapa banyak ikan semuanya? Ketuk jawaban yang tepat.";
const SUARA_A3 = "Betul! Lima ditambah tiga sama dengan delapan.";
const SUARA_A4 = "Cara mudahnya, hitung ikat lima dahulu, lalu tambahkan garis yang tersisa.";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: berapa banyak ikan?",
  sumber: "Materi: Latihan 1",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Latihan 1"), ...D1.kepala(), ...D1.kerangkaBaris(0)),
      tambah(idx(SUARA_A1, "satu", 2), ...D1.ikat(0, 0)),
      tambah(idx(SUARA_A1, "tiga"), ...D1.turus(0, 5, 8)),
    ),
    k(SUARA_A2, tambah(idx(SUARA_A2, "Berapa"), teks("tanya", 150, 114, "berapa banyak ikan?", 12, W.ungu)), tambah(idx(SUARA_A2, "jawaban"), ...pilihKata(122, ["7", "8", "9"], 16))),
    k(SUARA_A3, sorotkan(idx(SUARA_A3, "Betul!"), "c2-k"), tambah(idx(SUARA_A3, "Lima"), cap("5 + 3 = 8")), tambah(idx(SUARA_A3, "delapan."), D1.banyak(0))),
    k(SUARA_A4, redamkan(0, "c2-k"), hapus(0, "tanya", ...idPilihan(3)), tambah(idx(SUARA_A4, "hitung"), ...kartu("lm", 40, 120, 220, 30, W.emas, ["ikat lima dahulu, lalu garis"], 11))),
  ],
};

/* ------------------------------ 16. Latihan 2: paling sedikit ------------------------------ */
const D2 = buatDt(
  [
    { nama: "bintang", n: 5 },
    { nama: "bulan", n: 3 },
    { nama: "awan", n: 6 },
    { nama: "pelangi", n: 4 },
  ],
  { y0: 34, rh: 24 },
);
const SUARA_B1 = "Latihan dua. Upe mencatat benda yang ia lihat di langit. Ini turus bintang, bulan, awan, dan pelangi.";
const SUARA_B2 = "Benda apa yang paling sedikit? Ketuk jawaban yang tepat.";
const SUARA_B3 = "Betul! Turus bulan paling pendek, jadi bulan paling sedikit.";
const SUARA_B4 = "Kita periksa banyaknya. Bulan ada tiga, pelangi ada empat, bintang ada lima, dan awan ada enam.";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: benda yang paling sedikit",
  sumber: "Materi: Latihan 2",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Latihan 2"), ...D2.kepala()),
      tambah(idx(SUARA_B1, "bintang,"), ...D2.kerangkaBaris(0), ...D2.semua(0)),
      tambah(idx(SUARA_B1, "bulan,"), ...D2.kerangkaBaris(1), ...D2.semua(1)),
      tambah(idx(SUARA_B1, "awan,"), ...D2.kerangkaBaris(2), ...D2.semua(2)),
      tambah(idx(SUARA_B1, "pelangi."), ...D2.kerangkaBaris(3), ...D2.semua(3)),
    ),
    k(SUARA_B2, tambah(idx(SUARA_B2, "Benda"), teks("tanya", 150, 143, "paling sedikit yang mana?", 11, W.ungu)), tambah(idx(SUARA_B2, "jawaban"), ...pilihKata(150, ["bintang", "bulan", "awan"], 11))),
    k(SUARA_B3, sorotkan(idx(SUARA_B3, "Betul!"), "c2-k"), sorotkan(idx(SUARA_B3, "bulan"), ...D2.sorot(1))),
    k(
      SUARA_B4,
      redamkan(0, "c2-k", ...D2.sorot(1)),
      hapus(0, "tanya", ...idPilihan(3)),
      tambah(idx(SUARA_B4, "tiga,"), D2.banyak(1)),
      tambah(idx(SUARA_B4, "empat,"), D2.banyak(3)),
      tambah(idx(SUARA_B4, "lima,"), D2.banyak(0)),
      tambah(idx(SUARA_B4, "enam."), D2.banyak(2)),
    ),
  ],
};

/* ------------------------------ 17. Latihan 3: lebihnya ------------------------------ */
const D3 = buatDt(
  [
    { nama: "bola", n: 9 },
    { nama: "balon", n: 6 },
  ],
  { y0: 44, rh: 40 },
);
const SUARA_C1 = "Latihan tiga. Malosi menghitung bola dan balon. Bola ada sembilan, balon ada enam.";
const SUARA_C2 = "Berapa lebihnya bola dari balon? Ketuk jawaban yang tepat.";
const SUARA_C3 = "Betul! Bola tiga lebihnya dari balon.";
const SUARA_C4 = "Selisihnya tiga. Sembilan dikurangi enam sama dengan tiga.";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: berapa lebihnya?",
  sumber: "Materi: Latihan 3",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Latihan 3"), ...D3.kepala()),
      tambah(idx(SUARA_C1, "bola", 2), ...D3.kerangkaBaris(0)),
      tambah(idx(SUARA_C1, "sembilan,"), ...D3.semua(0)),
      tambah(idx(SUARA_C1, "balon", 2), ...D3.kerangkaBaris(1)),
      tambah(idx(SUARA_C1, "enam."), ...D3.semua(1)),
    ),
    k(SUARA_C2, tambah(idx(SUARA_C2, "Berapa"), teks("tanya", 150, 138, "berapa lebihnya bola dari balon?", 11, W.ungu)), tambah(idx(SUARA_C2, "jawaban"), ...pilihKata(146, ["2", "3", "4"], 16))),
    k(SUARA_C3, sorotkan(idx(SUARA_C3, "Betul!"), "c2-k"), sorotkan(idx(SUARA_C3, "Bola"), ...D3.sorot(0))),
    k(
      SUARA_C4,
      redamkan(0, "c2-k", ...D3.sorot(0)),
      hapus(0, "tanya", ...idPilihan(3)),
      tambah(idx(SUARA_C4, "Sembilan"), D3.banyak(0)),
      tambah(idx(SUARA_C4, "enam"), D3.banyak(1)),
      tambah(idx(SUARA_C4, "tiga.", 2), cap("9 - 6 = 3")),
    ),
  ],
};

/* ------------------------------ 18. Penutup ------------------------------ */
const SUARA_E1 = "Wah, kita sudah belajar banyak tentang diagram turus. Igil mengajak kita mengingat lagi bersama.";
const SUARA_E2 = "Pertama, kelompokkan benda menurut jenisnya, lalu hitung satu per satu.";
const SUARA_E3 = "Kedua, satu benda satu garis, dan setiap lima garis diikat dengan satu coretan miring.";
const SUARA_E4 = "Ketiga, baca turusnya. Baris paling panjang paling banyak, baris paling pendek paling sedikit. Kita juga bisa mencari selisih dan jumlah.";
const SUARA_E5 = "Hebat! Sekarang kamu sudah bisa membuat dan membaca diagram turus. Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_E1, tambah(0, judul("Mari ingat lagi")), tambah(idx(SUARA_E1, "belajar"), emo("ow", 150, 62, OWL, 36)), tambah(idx(SUARA_E1, "mengajak"), ...kartu("r0", 14, 80, 272, 26, W.emas, ["tiga hal tentang turus"], 11))),
    k(SUARA_E2, hapus(0, ...idKartu("r0")), tambah(idx(SUARA_E2, "Pertama,"), ...kartu("r1", 14, 70, 272, 30, W.hijauMuda, ["1. kelompokkan, lalu hitung"], 11))),
    k(SUARA_E3, tambah(idx(SUARA_E3, "Kedua,"), ...kartu("r2", 14, 106, 272, 38, W.langit, ["2. satu benda satu garis", "setiap lima diikat miring"], 10))),
    k(SUARA_E4, tambah(idx(SUARA_E4, "Ketiga,"), ...kartu("r3", 14, 150, 272, 38, W.pink, ["3. baca turus: terpanjang, terpendek", "cari selisih dan jumlah"], 10))),
    k(SUARA_E5, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("rw", 150, 100, OWL, 54)), tambah(idx(SUARA_E5, "membuat"), emo("rk", 150, 160, "✅", 30))),
  ],
};
