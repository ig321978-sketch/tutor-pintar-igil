import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, buatDt, emo, judul, kartu, teks } from "./k2b8A-gambar";
import { bersih, hapus, idPilihan, idx, k, pilihKata, redamkan, sorotkan, tambah } from "./k2b8A-bantu";

export const NAMA_METODE_ID = ["Turus", "Hitung Frekuensi", "Pilah Kategori"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);

const cap = (isi: string) => teks("cp", 150, 198, isi, 10.5, W.merah);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara punya cara lain untuk belajar diagram turus. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Turus, Hitung Frekuensi, dan Pilah Kategori.";
const SUARA_O3 = "Semua metode ini menjawab satu pertanyaan. Bagaimana cara mencatat dan membaca banyak benda dengan mudah?";
const SUARA_O4 = "Kita memakai gambar di layar. Kamu cukup mengetuk, melihat dengan teliti, dan memilih jawaban.";
const SUARA_O5 = "Ada yang mengikat garis lima-lima, ada yang mengubah turus menjadi bilangan, dan ada yang memilah dulu. Siap? Ayo kita mulai dengan metode pertama.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk diagram turus",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah(idx(SUARA_O1, "negara"), emo("gl", 150, 110, "\u{1F30D}", 50)), tambah(idx(SUARA_O1, "tiga"), ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      tambah(idx(SUARA_O2, "Turus,"), ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah(idx(SUARA_O2, "Hitung"), ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah(idx(SUARA_O2, "Pilah"), ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah(idx(SUARA_O3, "satu"), emo("i1", 60, 84, "\u{1F4CA}", 34), emo("i2", 150, 84, "❓", 34), emo("i3", 240, 84, "\u{1F440}", 34)),
      tambah(idx(SUARA_O3, "Bagaimana"), ...kartu("iq", 20, 112, 260, 52, W.emas, ["bagaimana cara mencatat dan", "membaca banyak benda?"], 10)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Alat bantu hari ini")),
      tambah(idx(SUARA_O4, "layar."), emo("a1", 70, 100, "\u{1F4E6}", 36), emo("a2", 150, 100, "\u{1F522}", 36), emo("a3", 230, 100, "\u{1F4CA}", 36)),
      tambah(idx(SUARA_O4, "mengetuk,"), emo("tg", 150, 150, "\u{1F446}", 24)),
      tambah(idx(SUARA_O4, "memilih"), teks("al-t", 150, 184, "ketuk, lihat, lalu pilih", 10, W.ungu)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Ikat, ubah, dan pilah")),
      tambah(idx(SUARA_O5, "mengikat"), teks("kt0", 150, 70, "mengikat lima-lima", 14, W.ungu)),
      tambah(idx(SUARA_O5, "mengubah"), teks("kt1", 150, 100, "turus jadi bilangan", 14, W.ungu)),
      tambah(idx(SUARA_O5, "memilah"), teks("kt2", 150, 130, "memilah dulu", 14, W.ungu)),
      tambah(idx(SUARA_O5, "pertama."), emo("ow", 150, 182, OWL, 30)),
    ),
  ],
};

/* ------------------------------ 2. Turus: konsep ------------------------------ */
const DT1 = buatDt([{ nama: "11", n: 11 }], { y0: 70, rh: 60, sh: 30, kepala: ["bilangan", "turus", "banyak"] });
const SUARA_T1 = "Metode pertama bernama Turus. Turus membuat benda yang banyak jadi mudah dicatat.";
const SUARA_T2 = "Satu benda satu garis. Empat garis tegak, lalu garis kelima mencoret miring, menjadi satu ikat.";
const SUARA_T3 = "Garis keenam sampai kesepuluh membuat ikat lima yang kedua.";
const SUARA_T4 = "Menghitung ikat lima cepat sekali. Lima, sepuluh, lalu tambah satu garis, jadi sebelas.";
const SUARA_T5 = "Itulah metode Turus. Setiap lima garis diikat, supaya mudah dihitung dan tidak keliru.";

export const ADEGAN_LUAR_TURUS: AdeganStory = {
  id: "luar-turus",
  judul: "Turus: setiap lima garis diikat",
  sumber: "Metode luar: Turus",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_T1, tambah(0, ...kepala(0)), tambah(idx(SUARA_T1, "mudah"), emo("tp", 150, 120, "\u{1F4CB}", 44))),
    k(
      SUARA_T2,
      hapus(0, "tp"),
      tambah(idx(SUARA_T2, "Satu"), ...DT1.kepala(), ...DT1.kerangkaBaris(0)),
      tambah(idx(SUARA_T2, "Empat"), ...DT1.turus(0, 0, 4)),
      tambah(idx(SUARA_T2, "kelima"), DT1.garisKe(0, 4)),
    ),
    k(SUARA_T3, tambah(idx(SUARA_T3, "kesepuluh"), ...DT1.turus(0, 5, 10))),
    k(
      SUARA_T4,
      tambah(idx(SUARA_T4, "lima", 2), DT1.labelIkat(0, 0)),
      tambah(idx(SUARA_T4, "sepuluh,"), DT1.labelIkat(0, 1)),
      tambah(idx(SUARA_T4, "satu"), DT1.garisKe(0, 10)),
      tambah(idx(SUARA_T4, "sebelas."), DT1.banyak(0)),
    ),
    k(SUARA_T5, tambah(idx(SUARA_T5, "Setiap"), ...kartu("tr", 30, 150, 240, 34, W.emas, ["Turus: tiap lima garis diikat"], 11)), tambah(idx(SUARA_T5, "mudah"), emo("ok", 270, 134, "✅", 22))),
  ],
};

/* ------------------------------ 3. Turus: terapan ------------------------------ */
const DT2 = buatDt([{ nama: "bebek", n: 11 }], { y0: 60, rh: 50, sh: 26 });
const SUARA_R1 = "Terapkan pada soal ini. Halim mencatat bebek dengan turus: dua ikat lima dan satu garis.";
const SUARA_R2 = "Berapa banyak bebek? Ketuk jawaban yang tepat.";
const SUARA_R3 = "Betul! Sepuluh ditambah satu sama dengan sebelas.";
const SUARA_R4 = "Dengan turus, Halim tidak perlu menghitung bebek satu per satu lagi.";

export const ADEGAN_LUAR_TURUS_TERAPAN: AdeganStory = {
  id: "luar-turus-terapan",
  judul: "Turus: turus bebek Halim",
  sumber: "Metode luar: Turus",
  latar: "#ECFCCB",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, ...kepala(0), ...DT2.kepala(), ...DT2.kerangkaBaris(0)),
      tambah(idx(SUARA_R1, "dua"), ...DT2.ikat(0, 0)),
      tambah(idx(SUARA_R1, "lima"), ...DT2.ikat(0, 1)),
      tambah(idx(SUARA_R1, "garis."), DT2.garisKe(0, 10)),
    ),
    k(SUARA_R2, tambah(idx(SUARA_R2, "Berapa"), teks("tanya", 150, 126, "berapa banyak bebek?", 12, W.ungu)), tambah(idx(SUARA_R2, "jawaban"), ...pilihKata(134, ["10", "11", "12"], 16))),
    k(SUARA_R3, sorotkan(idx(SUARA_R3, "Betul!"), "c2-k"), tambah(idx(SUARA_R3, "Sepuluh"), cap("10 + 1 = 11")), tambah(idx(SUARA_R3, "sebelas."), DT2.banyak(0))),
    k(SUARA_R4, redamkan(0, "c2-k"), hapus(0, "tanya", ...idPilihan(3)), tambah(idx(SUARA_R4, "menghitung"), ...kartu("tk", 30, 130, 240, 34, W.emas, ["lima, sepuluh, sebelas"], 12))),
  ],
};

/* ------------------------------ 9. Ringkasan metode luar ------------------------------ */
const SUARA_Y1 = "Mari kita ringkas tiga metode dari luar. Semuanya membantu kita mencatat dan membaca data.";
const SUARA_Y2 = "Metode Turus, setiap lima garis diikat dengan satu coretan miring.";
const SUARA_Y3 = "Metode Hitung Frekuensi, mengubah turus menjadi banyaknya.";
const SUARA_Y4 = "Metode Pilah Kategori, mengelompokkan data sebelum menurus.";
const SUARA_Y5 = "Pilih metode yang kamu suka, lalu periksa dengan metode lain. Hasilnya harus sama.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Metode luar: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Y1, tambah(0, judul("Ringkasan")), tambah(idx(SUARA_Y1, "ringkas"), ...kartu("r0", 14, 34, 272, 30, W.emas, ["3 metode dari luar"], 11))),
    k(SUARA_Y2, tambah(idx(SUARA_Y2, "Turus,"), ...kartu("r1", 14, 72, 272, 34, WARNA_METODE[0], [NAMA_METODE_ID[0], "tiap lima garis diikat"], 9.2))),
    k(SUARA_Y3, tambah(idx(SUARA_Y3, "Hitung"), ...kartu("r2", 14, 114, 272, 34, WARNA_METODE[1], [NAMA_METODE_ID[1], "ubah turus jadi banyaknya"], 9.2))),
    k(SUARA_Y4, tambah(idx(SUARA_Y4, "Pilah"), ...kartu("r3", 14, 156, 272, 34, WARNA_METODE[2], [NAMA_METODE_ID[2], "kelompokkan data sebelum menurus"], 9.2))),
    k(SUARA_Y5, bersih(0), tambah(0, judul("Hasilnya harus sama"), emo("rw", 150, 100, OWL, 54)), tambah(idx(SUARA_Y5, "sama."), emo("rk", 150, 160, "✅", 30))),
  ],
};
