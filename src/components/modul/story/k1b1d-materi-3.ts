import type { AdeganStory } from "./logika-story";
import { E, W, emo, ikatan, judul, kartu, meja, orang } from "./k1b1d-gambar";
import { bersih, k, sorotkan, tambah } from "./k1b1d-bantu";

/* Akhir "Pesta Rumah Rapi" dan akhir cerita Misi Rumah Rapi Bab 1: semua terbagi, lalu penutup. Tanpa latihan. */

/* ------------------------------ 6. Semua terbagi ------------------------------ */
const SUARA_H1 = "Semua kue, gelas, dan kursi sudah terbagi ke dua meja. Tidak ada yang tertinggal.";
const SUARA_H2 = "Satu bilangan bisa dipisah menjadi dua bagian. Dua bagian digabung kembali menjadi utuh.";
const SUARA_H3 = "Setiap tamu pesta mendapat kue, gelas, dan kursi. Nenek tersenyum bangga.";

export const ADEGAN_TERBAGI: AdeganStory = {
  id: "semua-terbagi",
  judul: "Semua sudah terbagi",
  sumber: "Materi: bagian dan utuh",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Semua terbagi")),
      tambah("dua", ...meja("md", 14, 150, 120, "Meja dalam"), ...meja("mt", 166, 150, 120, "Meja teras")),
      tambah("kue,", emo("k1", 48, 144, E.kue, 18), emo("k2", 200, 144, E.kue, 18)),
      tambah("gelas,", emo("g1", 74, 144, E.gelas, 18), emo("g2", 226, 144, E.gelas, 18)),
      tambah("kursi", emo("r1", 100, 144, E.kursi, 18), emo("r2", 252, 144, E.kursi, 18)),
    ),
    k(SUARA_H2, tambah("dipisah", ...ikatan("ik", 150, 40, "utuh", "bagian", "bagian", 60, 22)), sorotkan("digabung", "ik-u")),
    k(SUARA_H3, tambah("tamu", emo("nn", 40, 100, E.nenek, 26), emo("ta", 260, 100, E.senyum, 26))),
  ],
};

/* ------------------------------ 7. Penutup ------------------------------ */
const SUARA_Z1 = "Mamah memeluk semuanya. Misi Rumah Rapi selesai, dari kamar, rak, gudang, sampai loteng!";
const SUARA_Z2 = "Ingat, pisahkan menjadi dua bagian, gabungkan menjadi utuh, dan cari pasangan sepuluh.";
const SUARA_Z3 = "Terima kasih, Igil, Kaka, Abang, dan Mamah. Sampai jumpa di petualangan berikutnya!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: Misi Rumah Rapi selesai",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Misi Rumah Rapi selesai!"), ...orang("mm", 150, 120, E.mamah, "Mamah")), tambah("memeluk", emo("pk", 150, 70, E.peluk, 30)), tambah("selesai,", emo("b1", 50, 90, E.konfeti, 30), emo("b2", 250, 90, E.konfeti, 30))),
    k(
      SUARA_Z2,
      bersih(0),
      tambah(0, judul("Ingat, ya!")),
      tambah("pisahkan", ...kartu("p1", 14, 34, 272, 34, W.hijauMuda, ["pisahkan menjadi dua bagian"], 9.6)),
      tambah("gabungkan", ...kartu("p2", 14, 78, 272, 34, W.langit, ["gabungkan menjadi utuh"], 9.6)),
      tambah("sepuluh.", ...kartu("p3", 14, 122, 272, 34, W.emas, ["cari pasangan 10"], 9.6)),
    ),
    k(
      SUARA_Z3,
      bersih(0),
      tambah(0, judul("Terima kasih!"), emo("ht", 150, 66, E.hati, 30)),
      tambah("Igil,", ...orang("ig", 45, 130, E.igil, "Igil")),
      tambah("Kaka,", ...orang("kk", 115, 130, E.kaka, "Kaka")),
      tambah("Abang,", ...orang("ab", 185, 130, E.abang, "Abang")),
      tambah("Mamah.", ...orang("mm", 255, 130, E.mamah, "Mamah")),
      tambah("jumpa", emo("pa", 90, 186, E.pesta, 26), emo("pb", 210, 186, E.pesta, 26)),
    ),
  ],
};
