import type { AdeganStory, Obj } from "./logika-story";
import { EMO_MERAH, OWL, W, bendaDi, emo, jalur, judul, kartu, kartuAngka, pusatPetak, teks, titikGrid } from "./k2b2A-gambar";
import { YJ, JALUR_10_20 } from "./k2b2A-materi-1";
import { bersih, hapus, hitungAksi, idx, ids, k, pilihKata, redamkan, sorotkan, tambah, ubah } from "./k2b2A-bantu";

export const NAMA_METODE_ID = ["Menghitung Maju", "Pasangan Bilangan", "Balok Dienes dan Menyimpan"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara punya cara lain untuk menjumlahkan. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Menghitung Maju, Pasangan Bilangan, dan satu lagi, Balok Dienes dan Menyimpan.";
const SUARA_O3 = "Semua metode ini menjawab satu pertanyaan. Bagaimana cara menjumlahkan yang cepat dan tepat?";
const SUARA_O4 = "Kita memakai benda bergambar di layar. Kamu cukup mengetuk dan melihat dengan teliti.";
const SUARA_O5 = "Semua hasilnya paling banyak dua puluh. Siap? Ayo kita mulai dengan metode pertama.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk menjumlahkan",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)), tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      tambah(idx(SUARA_O2, "Menghitung"), ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah(idx(SUARA_O2, "Pasangan"), ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah(idx(SUARA_O2, "Balok"), ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah("satu", emo("i1", 60, 84, "\u{2795}", 34), emo("i2", 150, 84, "❓", 34), emo("i3", 240, 84, "\u{1F440}", 34)),
      tambah("Bagaimana", ...kartu("iq", 20, 112, 260, 52, W.emas, ["bagaimana cara menjumlahkan", "yang cepat dan tepat?"], 10)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Alat bantu hari ini")),
      tambah("benda", ...bendaDi("a", EMO_MERAH, titikGrid(3, 100, 100, 50, 0), 26), teks("ea-t", 150, 128, "benda bergambar", 10, W.ungu)),
      tambah("mengetuk", emo("tg", 190, 152, "\u{1F446}", 22)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Sampai dua puluh")),
      tambah("dua", ...kartuAngka("ob", 112, 60, "20", W.emas, 76, 44, 26)),
      tambah("pertama.", emo("ow", 150, 168, OWL, 30)),
    ),
  ],
};

/* ------------------------------ 2. Menghitung Maju: konsep ------------------------------ */
const JALUR_8_18 = Array.from({ length: 11 }, (_, i) => 8 + i);
const petakX = (i: number): number => pusatPetak(11, i, YJ).x;
const SUARA_A1 = "Metode pertama bernama Menghitung Maju. Kita mulai dari bilangan yang lebih besar, lalu maju.";
const SUARA_A2 = "Contohnya empat ditambah sembilan sama dengan berapa? Sembilan lebih besar dari empat, jadi kita mulai dari sembilan.";
const SUARA_A3 = "Dari sembilan, kita maju empat langkah. Satu, dua, tiga, empat.";
const SUARA_A4 = "Kita berhenti di tiga belas. Jadi empat ditambah sembilan sama dengan tiga belas.";
const SUARA_A5 = "Mulai dari bilangan yang lebih besar membuat loncatan lebih sedikit. Hanya empat loncatan, bukan sembilan.";

export const ADEGAN_LUAR_MAJU: AdeganStory = {
  id: "luar-maju",
  judul: "Menghitung Maju: mulai dari yang besar",
  sumber: "Metode luar: Menghitung Maju",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_A1, tambah(0, ...kepala(0)), tambah(idx(SUARA_A1, "besar,"), ...kartu("kk", 60, 100, 180, 30, W.krem, ["mulai dari yang besar"], 11))),
    k(
      SUARA_A2,
      hapus(0, "kk-k", "kk-t0"),
      tambah(idx(SUARA_A2, "ditambah"), ...kartu("eq", 80, 118, 140, 26, W.krem, ["4 + 9 = ?"], 13)),
      tambah(idx(SUARA_A2, "Sembilan", 2), ...jalur(JALUR_8_18, YJ)),
      sorotkan(idx(SUARA_A2, "mulai"), "nl1-k"),
      tambah(idx(SUARA_A2, "sembilan.", 3), emo("fg", petakX(1), 64, "\u{1F438}", 20)),
    ),
    k(SUARA_A3, redamkan(0, "nl1-k"), ...hitungAksi(SUARA_A3, "nl", Array.from({ length: 5 }, (_, q) => pusatPetak(11, 1 + q, YJ)), { dari: 1, awal: 1, setelah: "langkah", naik: 18, u: 10 })),
    k(SUARA_A4, sorotkan(idx(SUARA_A4, "belas."), "nl5-k"), ubah(idx(SUARA_A4, "belas."), { id: "fg", x: petakX(5) }), hapus(idx(SUARA_A4, "Jadi"), "eq-k", "eq-t0"), tambah(idx(SUARA_A4, "ditambah"), ...kartu("eq", 80, 118, 140, 26, W.emas, ["4 + 9 = 13"], 13))),
    k(SUARA_A5, redamkan(0, "nl5-k"), tambah(idx(SUARA_A5, "empat"), ...kartu("lc", 70, 160, 160, 26, W.krem, ["4 loncatan, bukan 9"], 11)), sorotkan(idx(SUARA_A5, "loncatan,"), ...ids("nln", 1, 4))),
  ],
};

/* ------------------------------ 3. Menghitung Maju: terapan ------------------------------ */
const SUARA_B1 = "Terapkan pada tiga ditambah empat belas sama dengan berapa? Ini jalur bilangan dari sepuluh sampai dua puluh.";
const SUARA_B2 = "Empat belas lebih besar dari tiga. Jadi kita mulai dari empat belas.";
const SUARA_B3 = "Kita maju tiga langkah. Satu, dua, tiga.";
const SUARA_B4 = "Pilih jawabannya. Tiga ditambah empat belas sama dengan berapa? Ketuk bilangan yang tepat.";
const SUARA_B5 = "Betul! Tiga ditambah empat belas sama dengan tujuh belas. Hebat!";

export const ADEGAN_LUAR_MAJU_TERAPAN: AdeganStory = {
  id: "luar-maju-terapan",
  judul: "Menghitung Maju: tiga ditambah empat belas",
  sumber: "Metode luar: Menghitung Maju, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_B1, tambah(0, ...kepala(0)), tambah(idx(SUARA_B1, "ditambah"), ...kartu("eq", 80, 112, 140, 24, W.krem, ["3 + 14 = ?"], 12)), tambah(idx(SUARA_B1, "jalur"), ...jalur(JALUR_10_20, YJ))),
    k(SUARA_B2, sorotkan(idx(SUARA_B2, "empat"), "nl4-k"), tambah(idx(SUARA_B2, "kita"), emo("fg", petakX(4), 64, "\u{1F438}", 20))),
    k(SUARA_B3, redamkan(0, "nl4-k"), ...hitungAksi(SUARA_B3, "nl", Array.from({ length: 4 }, (_, q) => pusatPetak(11, 4 + q, YJ)), { dari: 1, awal: 1, setelah: "langkah.", naik: 18, u: 10 })),
    k(SUARA_B4, tambah(idx(SUARA_B4, "jawabannya."), ...pilihKata(148, ["16", "17", "18"])), sorotkan(idx(SUARA_B4, "Ketuk"), "c2-k")),
    k(SUARA_B5, hapus(0, "eq-k", "eq-t0"), sorotkan(idx(SUARA_B5, "tujuh"), "nl7-k"), ubah(idx(SUARA_B5, "tujuh"), { id: "fg", x: petakX(7) }), tambah(idx(SUARA_B5, "ditambah"), ...kartu("eq", 80, 112, 140, 24, W.emas, ["3 + 14 = 17"], 12)), tambah(idx(SUARA_B5, "Hebat!"), emo("ow", 150, 198, OWL, 18))),
  ],
};

/* ------------------------------ 4. Ringkasan ------------------------------ */
const SUARA_R1 = "Mari kita ingat tiga metode dari luar. Metode pertama, Menghitung Maju. Mulai dari bilangan yang lebih besar, lalu maju.";
const SUARA_R2 = "Metode kedua, Pasangan Bilangan. Pecah bilangan jadi pasangan yang mudah, supaya terbentuk sepuluh.";
const SUARA_R3 = "Metode ketiga, Balok Dienes dan Menyimpan. Sepuluh satuan disimpan jadi satu puluhan.";
const SUARA_R4 = "Tiga metode ini membantu kita menjumlahkan dengan cepat dan tepat. Sampai jumpa!";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Metode luar: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Ingat tiga metode")), tambah("pertama,", ...kartu("r1", 14, 34, 272, 44, W.hijauMuda, ["Menghitung Maju", "mulai dari yang lebih besar"], 10))),
    k(SUARA_R2, tambah("kedua,", ...kartu("r2", 14, 86, 272, 44, W.langit, ["Pasangan Bilangan", "pecah, lalu bentuk 10"], 10))),
    k(SUARA_R3, tambah("ketiga,", ...kartu("r3", 14, 138, 272, 44, W.pink, ["Balok Dienes dan Menyimpan", "10 satuan jadi 1 puluhan"], 10))),
    k(SUARA_R4, bersih(0), tambah(0, judul("Sampai jumpa lagi!"), emo("sj", 150, 100, "\u{1F44B}", 56)), tambah("Sampai", emo("pa", 60, 160, OWL, 30), emo("pb", 240, 160, OWL, 30))),
  ],
};
