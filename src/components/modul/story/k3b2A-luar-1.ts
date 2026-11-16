import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, emo, judul, kartu, teks, timbangan } from "./k3b2A-gambar";
import { bersih, hapus, idPilihan, idx, k, pilihKata, redamkan, sorotkan, tambah, ubah } from "./k3b2A-bantu";

export const NAMA_METODE_ID = ["Timbangan Seimbang", "Loncat Garis Bilangan", "Bungkus Sepuluh"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara punya cara lain untuk belajar kalimat Matematika penjumlahan. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Timbangan Seimbang, Loncat Garis Bilangan, dan Bungkus Sepuluh.";
const SUARA_O3 = "Semua metode ini menjawab satu pertanyaan. Bagaimana cara mengisi titik-titik pada kalimat penjumlahan?";
const SUARA_O4 = "Kita memakai gambar di layar. Kamu cukup mengetuk, melihat dengan teliti, dan memilih jawaban.";
const SUARA_O5 = "Ada yang menyeimbangkan timbangan, ada yang meloncat di garis bilangan, dan ada yang membuka bungkus. Siap? Ayo kita mulai dengan metode pertama.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk kalimat penjumlahan",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah(idx(SUARA_O1, "negara"), emo("gl", 150, 110, "\u{1F30D}", 50)), tambah(idx(SUARA_O1, "tiga", 1), ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      tambah(idx(SUARA_O2, "Timbangan"), ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah(idx(SUARA_O2, "Loncat"), ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah(idx(SUARA_O2, "Bungkus"), ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah(idx(SUARA_O3, "satu"), emo("i1", 60, 84, "➕", 34), emo("i2", 150, 84, "❓", 34), emo("i3", 240, 84, "\u{1F440}", 34)),
      tambah(idx(SUARA_O3, "Bagaimana"), ...kartu("iq", 20, 112, 260, 52, W.emas, ["bagaimana cara mengisi titik-titik", "pada kalimat penjumlahan?"], 10)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Alat bantu hari ini")),
      tambah(idx(SUARA_O4, "layar."), emo("a1", 70, 100, "⚖️", 36), emo("a2", 150, 100, "\u{1F4CF}", 36), emo("a3", 230, 100, "\u{1F4E6}", 36)),
      tambah(idx(SUARA_O4, "mengetuk,"), emo("tg", 150, 150, "\u{1F446}", 24)),
      tambah(idx(SUARA_O4, "memilih"), teks("al-t", 150, 184, "ketuk, lihat, lalu pilih", 10, W.ungu)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Seimbang, loncat, bungkus")),
      tambah(idx(SUARA_O5, "menyeimbangkan"), teks("kt0", 150, 70, "menyeimbangkan timbangan", 13, W.ungu)),
      tambah(idx(SUARA_O5, "meloncat"), teks("kt1", 150, 100, "meloncat di garis bilangan", 13, W.ungu)),
      tambah(idx(SUARA_O5, "membuka"), teks("kt2", 150, 130, "membuka bungkus", 13, W.ungu)),
      tambah(idx(SUARA_O5, "pertama."), emo("ow", 150, 182, OWL, 30)),
    ),
  ],
};

/* ------------------------------ 2. Timbangan Seimbang: konsep ------------------------------ */
const SUARA_B1 = "Metode pertama bernama Timbangan Seimbang. Kalimat Matematika dianggap seperti timbangan.";
const SUARA_B2 = "Sisi kiri berisi tiga puluh tambah titik-titik. Sisi kanan berisi lima puluh.";
const SUARA_B3 = "Timbangan harus seimbang. Jadi sisi kiri harus sama dengan sisi kanan.";
const SUARA_B4 = "Titik-titik diisi supaya kedua sisi sama. Itulah Timbangan Seimbang.";

export const ADEGAN_LUAR_TIMBANGAN: AdeganStory = {
  id: "luar-timbangan",
  judul: "Timbangan Seimbang: dua sisi sama",
  sumber: "Metode luar: Timbangan Seimbang",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_B1, tambah(0, ...kepala(0)), tambah(idx(SUARA_B1, "timbangan."), emo("tb", 150, 120, "⚖️", 56))),
    k(
      SUARA_B2,
      hapus(0, "tb"),
      tambah(idx(SUARA_B2, "Sisi"), ...timbangan("30 + ?", "50")),
      sorotkan(idx(SUARA_B2, "kiri"), "tm-kiri-k"),
      sorotkan(idx(SUARA_B2, "Sisi", 2), "tm-kanan-k"),
    ),
    k(SUARA_B3, tambah(idx(SUARA_B3, "seimbang."), ...kartu("sb", 50, 176, 200, 22, W.emas, ["kiri sama dengan kanan"], 10))),
    k(SUARA_B4, redamkan(0, "tm-kiri-k", "tm-kanan-k"), tambah(idx(SUARA_B4, "sama."), emo("sm", 272, 194, "❓", 22)), ubah(idx(SUARA_B4, "Titik-titik"), { id: "tm-kiri-k", warna: W.merahMuda })),
  ],
};

/* ------------------------------ 3. Timbangan Seimbang: terapan ------------------------------ */
const SUARA_C1 = "Terapkan pada soal ini. Upe menaruh dua puluh lima tambah titik-titik di sisi kiri, dan tujuh puluh di sisi kanan.";
const SUARA_C2 = "Berapa isi titik-titik supaya timbangan seimbang? Ketuk jawaban yang tepat.";
const SUARA_C3 = "Betul! Tujuh puluh dikurangi dua puluh lima sama dengan empat puluh lima.";
const SUARA_C4 = "Kedua sisi sama, jadi timbangannya seimbang.";

export const ADEGAN_LUAR_TIMBANGAN_TERAPAN: AdeganStory = {
  id: "luar-timbangan-terapan",
  judul: "Timbangan Seimbang: soal Upe",
  sumber: "Metode luar: Timbangan Seimbang",
  latar: "#ECFCCB",
  ketukan: [
    k(SUARA_C1, tambah(0, ...kepala(0)), tambah(idx(SUARA_C1, "dua"), ...timbangan("25 + ?", "70"))),
    k(SUARA_C2, hapus(0, "tm-tiang", "tm-dasar"), tambah(idx(SUARA_C2, "jawaban"), ...pilihKata(142, ["45", "95", "55"], 16))),
    k(
      SUARA_C3,
      sorotkan(idx(SUARA_C3, "Betul!"), "c1-k"),
      hapus(idx(SUARA_C3, "dikurangi"), ...idPilihan(3)),
      ubah(idx(SUARA_C3, "empat"), { id: "tm-kiri-t", isi: "25 + 45" }),
      tambah(idx(SUARA_C3, "dikurangi"), ...kartu("kz", 70, 146, 160, 26, W.emas, ["70 − 25 = 45"], 12)),
    ),
    k(SUARA_C4, tambah(idx(SUARA_C4, "seimbang."), emo("ok", 150, 190, "✅", 24))),
  ],
};

/* ------------------------------ 9. Ringkasan metode luar ------------------------------ */
const SUARA_Y1 = "Mari kita ringkas tiga metode dari luar. Semuanya membantu kita mengisi titik-titik.";
const SUARA_Y2 = "Metode Timbangan Seimbang, kedua sisi harus sama.";
const SUARA_Y3 = "Metode Loncat Garis Bilangan, kita meloncat dari bilangan kecil ke bilangan besar.";
const SUARA_Y4 = "Metode Bungkus Sepuluh, kita membuka bungkus supaya mudah mengurangi.";
const SUARA_Y5 = "Pilih metode yang kamu suka, lalu periksa dengan metode lain. Hasilnya harus sama.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Metode luar: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Y1, tambah(0, judul("Ringkasan")), tambah(idx(SUARA_Y1, "ringkas"), ...kartu("r0", 14, 34, 272, 30, W.emas, ["3 metode dari luar"], 11))),
    k(SUARA_Y2, tambah(idx(SUARA_Y2, "Timbangan"), ...kartu("r1", 14, 72, 272, 34, WARNA_METODE[0], [NAMA_METODE_ID[0], "kedua sisi harus sama"], 9.2))),
    k(SUARA_Y3, tambah(idx(SUARA_Y3, "Loncat"), ...kartu("r2", 14, 114, 272, 34, WARNA_METODE[1], [NAMA_METODE_ID[1], "meloncat dari kecil ke besar"], 9.2))),
    k(SUARA_Y4, tambah(idx(SUARA_Y4, "Bungkus"), ...kartu("r3", 14, 156, 272, 34, WARNA_METODE[2], [NAMA_METODE_ID[2], "buka bungkus untuk mengurangi"], 9.2))),
    k(SUARA_Y5, bersih(0), tambah(0, judul("Hasilnya harus sama"), emo("rw", 150, 100, OWL, 54)), tambah(idx(SUARA_Y5, "sama."), emo("rk", 150, 160, "✅", 30))),
  ],
};
