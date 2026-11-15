import type { AdeganStory } from "./logika-story";
import { OWL, W, bangun, emo, hati, idSisi, judul, kartu, namaBangun, relBeraturan, relRumah, sudutBangun, teks, warnaSegi } from "./k2b3A-gambar";
import { bersih, hapus, idx, k, pilihKata, sisiAksi, sorotkan, tambah } from "./k2b3A-bantu";

/* ------------------------------ 13. Latihan 1: menamai segi banyak ------------------------------ */
const SUARA_L1 = "Latihan satu. Halim melihat sebuah bangun datar di layar. Kita hitung sisinya dulu.";
const SUARA_L2 = "Satu, dua, tiga, empat, lima. Ada lima sisi.";
const SUARA_L3 = "Pilih namanya. Bangun dengan lima sisi dinamakan apa? Ketuk jawaban yang tepat.";
const SUARA_L4 = "Betul! Bangun dengan lima sisi dinamakan segi lima. Hebat!";
export const REL_L1 = relRumah(56, 52);
export const ROT_L1 = 20;
const PTS_L1 = sudutBangun(REL_L1, 150, 82, ROT_L1);

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: menamai segi banyak",
  sumber: "Materi: latihan menamai segi banyak",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_L1, tambah(0, judul("Latihan 1")), tambah(idx(SUARA_L1, "bangun"), bangun("bg", REL_L1, 150, 82, warnaSegi(5), ROT_L1))),
    k(SUARA_L2, ...sisiAksi(SUARA_L2, "bg", PTS_L1), tambah(idx(SUARA_L2, "lima", 2), teks("bg-jn", 232, 84, "5 sisi", 12, W.merah))),
    k(SUARA_L3, hapus(0, ...idSisi("bg", 5)), tambah(idx(SUARA_L3, "jawaban"), ...pilihKata(150, ["segi empat", "segi lima", "segi enam"], 9.5))),
    k(SUARA_L4, sorotkan(idx(SUARA_L4, "Betul!"), "c2-k"), tambah(idx(SUARA_L4, "segi", 1), namaBangun("bg", 150, 138, "segi lima", 12)), tambah(idx(SUARA_L4, "Hebat!"), emo("ow", 150, 196, OWL, 16))),
  ],
};

/* ------------------------------ 14. Latihan 2: bentuk hati ------------------------------ */
const SUARA_M1 = "Latihan dua. Wei melihat bentuk hati di layar. Tepinya melengkung.";
const SUARA_M2 = "Pada bentuk hati tidak ada sisi yang lurus. Jadi bentuk hati bukan segi banyak.";
const SUARA_M3 = "Pilih jenisnya. Bentuk hati termasuk apa? Ketuk jawaban yang tepat.";
const SUARA_M4 = "Betul! Bentuk hati adalah bentuk lengkung. Hebat!";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: bentuk hati",
  sumber: "Materi: latihan bentuk lengkung",
  latar: "#F0FDFA",
  ketukan: [
    k(SUARA_M1, tambah(0, judul("Latihan 2")), tambah(idx(SUARA_M1, "hati"), hati("ht", 150, 84, 34))),
    k(SUARA_M2, tambah(idx(SUARA_M2, "tidak"), ...kartu("nl", 196, 70, 96, 28, W.krem, ["0 sisi lurus"], 10))),
    k(SUARA_M3, tambah(idx(SUARA_M3, "jawaban"), ...pilihKata(150, ["segi banyak", "lingkaran", "bentuk lengkung"], 8.6))),
    k(SUARA_M4, sorotkan(idx(SUARA_M4, "Betul!"), "c3-k"), tambah(idx(SUARA_M4, "Hebat!"), emo("ow", 150, 196, OWL, 16))),
  ],
};

/* ------------------------------ 15. Latihan 3: menghitung sisi segi enam ------------------------------ */
const SUARA_N1 = "Latihan tiga. Igil melihat satu lubang sarang lebah. Berapa sisinya?";
const SUARA_N2 = "Kita hitung bersama. Satu, dua, tiga, empat, lima, enam.";
const SUARA_N3 = "Pilih jawabannya. Lubang sarang itu punya berapa sisi? Ketuk jawaban yang tepat.";
const SUARA_N4 = "Betul! Ada enam sisi, jadi namanya segi enam. Hebat!";
const REL_N = relBeraturan(6, 34);
const PTS_N = sudutBangun(REL_N, 150, 78);

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: menghitung sisi segi enam",
  sumber: "Materi: latihan menghitung sisi",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_N1, tambah(0, judul("Latihan 3")), tambah(idx(SUARA_N1, "lubang"), bangun("hx", REL_N, 150, 78, warnaSegi(6)))),
    k(SUARA_N2, ...sisiAksi(SUARA_N2, "hx", PTS_N, { setelah: "bersama" })),
    k(SUARA_N3, hapus(0, ...idSisi("hx", 6)), tambah(idx(SUARA_N3, "jawaban"), ...pilihKata(150, ["5", "6", "7"], 16))),
    k(SUARA_N4, sorotkan(idx(SUARA_N4, "Betul!"), "c2-k"), tambah(idx(SUARA_N4, "segi", 1), namaBangun("hx", 150, 136, "segi enam", 12)), tambah(idx(SUARA_N4, "Hebat!"), emo("ow", 150, 196, OWL, 16))),
  ],
};

/* ------------------------------ 16. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi. Ada tiga hal yang kita pelajari tentang bangun datar.";
const SUARA_Z2 = "Pertama, bangun datar bisa dikelompokkan jadi segi banyak dan bentuk lengkung.";
const SUARA_Z3 = "Kedua, hitung sisi segi banyak, lalu sebut namanya. Segitiga, segi empat, segi lima, dan segi enam.";
const SUARA_Z4 = "Ketiga, lingkaran selalu pas saat diputar. Bentuk lengkung yang lain belum tentu pas.";
const SUARA_Z5 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Mari ingat lagi")), tambah(idx(SUARA_Z1, "Ada"), ...kartu("p0", 14, 30, 272, 36, W.emas, ["tiga hal tentang", "bangun datar"], 9.2))),
    k(SUARA_Z2, tambah(idx(SUARA_Z2, "Pertama,"), ...kartu("p1", 14, 72, 272, 36, W.hijauMuda, ["segi banyak: sisi lurus", "bentuk lengkung: kurva"], 9.2))),
    k(SUARA_Z3, tambah(idx(SUARA_Z3, "Kedua,"), ...kartu("p2", 14, 114, 272, 36, W.pink, ["hitung sisi, lalu beri nama:", "3 segitiga, 4 segi empat, 5 segi lima, 6 segi enam"], 8.2))),
    k(SUARA_Z4, tambah(idx(SUARA_Z4, "Ketiga,"), ...kartu("p3", 14, 156, 272, 36, W.langit, ["lingkaran selalu pas", "saat diputar"], 9.2))),
    k(SUARA_Z5, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, OWL, 56)), tambah(idx(SUARA_Z5, "anak-anak!"), emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
