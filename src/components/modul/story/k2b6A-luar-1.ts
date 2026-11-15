import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, deret, emo, idBenda, idDeret, isiSisi, judul, kartu, kerangka, labelSisi, penunjuk, spek, teks, ubahTimbang } from "./k2b6A-gambar";
import { bersih, hapus, idKartu, idPilihan, idx, k, pilihKata, redamkan, sorotkan, tambah, ubah } from "./k2b6A-bantu";

export const NAMA_METODE_ID = ["Banding Berat", "Satuan Tak Baku Berat", "Lebih Berat Lebih Ringan"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara punya cara lain untuk belajar berat. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Banding Berat, Satuan Tak Baku Berat, dan satu lagi, Lebih Berat Lebih Ringan.";
const SUARA_O3 = "Semua metode ini menjawab satu pertanyaan. Bagaimana cara tahu benda mana yang lebih berat?";
const SUARA_O4 = "Kita memakai benda di layar. Kamu cukup mengetuk, melihat dengan teliti, dan memeriksa ujung timbangan.";
const SUARA_O5 = "Berat bisa dibandingkan dan juga diukur. Siap? Ayo kita mulai dengan metode pertama.";
const BD_O = deret(["apel", "pisang", "bola_tenis"], 100, 1.2);

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk berat",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah(idx(SUARA_O1, "negara"), emo("gl", 150, 110, "\u{1F30D}", 50)), tambah(idx(SUARA_O1, "tiga"), ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      tambah(idx(SUARA_O2, "Banding"), ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah(idx(SUARA_O2, "Satuan"), ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah(idx(SUARA_O2, "Lebih"), ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah(idx(SUARA_O3, "satu"), emo("i1", 60, 84, "⚖️", 34), emo("i2", 150, 84, "❓", 34), emo("i3", 240, 84, "\u{1F440}", 34)),
      tambah(idx(SUARA_O3, "Bagaimana"), ...kartu("iq", 20, 112, 260, 52, W.emas, ["bagaimana cara tahu benda", "mana yang lebih berat?"], 10)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Alat bantu hari ini")),
      tambah(idx(SUARA_O4, "layar."), BD_O[0], BD_O[1], BD_O[2], BD_O[3], BD_O[4], BD_O[5]),
      tambah(idx(SUARA_O4, "mengetuk,"), emo("tg", 150, 150, "\u{1F446}", 24)),
      tambah(idx(SUARA_O4, "memeriksa"), teks("al-t", 150, 184, "ujung timbangan yang turun", 10, W.ungu)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Dibandingkan dan diukur")),
      tambah(idx(SUARA_O5, "dibandingkan"), teks("kt0", 150, 74, "membandingkan berat", 14, W.ungu)),
      tambah(idx(SUARA_O5, "diukur."), teks("kt1", 150, 104, "mengukur berat", 14, W.ungu)),
      tambah(idx(SUARA_O5, "pertama."), emo("ow", 150, 172, OWL, 30)),
    ),
  ],
};

/* ------------------------------ 2. Banding Berat: konsep ------------------------------ */
const J0 = spek(1, "timbangan", [], []);
const Ja = spek(1, "timbangan", ["jeruk"], []);
const J = spek(1, "timbangan", ["jeruk"], ["pisang"]);
const SUARA_V1 = "Metode pertama bernama Banding Berat. Kita mulai dari dua benda, yaitu jeruk dan pisang.";
const SUARA_V2 = "Langkah pertama, taruh satu benda di tiap piringan. Jeruk di kiri dan pisang di kanan.";
const SUARA_V3 = "Langkah kedua, lihat ujung mana yang turun. Ujung jeruk turun.";
const SUARA_V4 = "Langkah ketiga, sebut hasilnya dengan kata. Jeruk lebih berat dari pisang, dan pisang lebih ringan dari jeruk.";
const SUARA_V5 = "Jadi Banding Berat berarti menaruh dua benda di timbangan, lalu melihat ujung yang turun.";
const BD_V = deret(["jeruk", "pisang"], 100, 1.3, [100, 200]);

export const ADEGAN_LUAR_BANDING: AdeganStory = {
  id: "luar-banding",
  judul: "Banding Berat: taruh dan lihat",
  sumber: "Metode luar: Banding Berat",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_V1, tambah(0, ...kepala(0)), tambah(idx(SUARA_V1, "jeruk"), BD_V[0], BD_V[1]), tambah(idx(SUARA_V1, "pisang."), BD_V[2], BD_V[3])),
    k(
      SUARA_V2,
      hapus(0, ...idDeret(["jeruk", "pisang"])),
      tambah(0, kerangka(J0)),
      tambah(idx(SUARA_V2, "Jeruk"), ...isiSisi(Ja, "L"), labelSisi(Ja, "L")),
      ubah(idx(SUARA_V2, "Jeruk"), ...ubahTimbang(Ja, { L: true })),
      tambah(idx(SUARA_V2, "pisang"), ...isiSisi(J, "R"), labelSisi(J, "R")),
      ubah(idx(SUARA_V2, "pisang"), ...ubahTimbang(J, { L: true, R: true })),
    ),
    k(SUARA_V3, sorotkan(idx(SUARA_V3, "lihat"), "tm1-bl"), tambah(idx(SUARA_V3, "Ujung"), ...penunjuk(J))),
    k(
      SUARA_V4,
      redamkan(0, "tm1-bl"),
      tambah(idx(SUARA_V4, "Jeruk"), ...kartu("k1", 14, 164, 136, 26, W.hijauMuda, ["jeruk lebih berat"], 9)),
      tambah(idx(SUARA_V4, "pisang", 2), ...kartu("k2", 154, 164, 132, 26, W.pink, ["pisang lebih ringan"], 9)),
    ),
    k(
      SUARA_V5,
      hapus(idx(SUARA_V5, "Jadi"), ...idKartu("k1"), ...idKartu("k2")),
      tambah(idx(SUARA_V5, "Jadi"), ...kartu("rk", 20, 164, 260, 26, W.emas, ["taruh dua benda, lihat yang turun"], 10)),
      sorotkan(idx(SUARA_V5, "timbangan,"), idBenda(1, "L", "jeruk", 1)),
    ),
  ],
};

/* ------------------------------ 3. Banding Berat: terapan ------------------------------ */
const T0 = spek(1, "timbangan", [], []);
const Ta = spek(1, "timbangan", ["mangga"], []);
const T = spek(1, "timbangan", ["mangga"], ["apel"]);
const SUARA_W1 = "Terapkan pada soal ini. Upe menaruh mangga di piringan kiri dan apel di piringan kanan.";
const SUARA_W2 = "Mana yang lebih berat? Ketuk jawaban yang tepat.";
const SUARA_W3 = "Betul! Mangga lebih berat, karena ujung mangga turun. Hebat!";
const SUARA_W4 = "Mangga lebih berat dari apel, jadi apel lebih ringan dari mangga.";

export const ADEGAN_LUAR_BANDING_TERAPAN: AdeganStory = {
  id: "luar-banding-terapan",
  judul: "Banding Berat: mangga Upe",
  sumber: "Metode luar: Banding Berat",
  latar: "#ECFCCB",
  ketukan: [
    k(
      SUARA_W1,
      tambah(0, ...kepala(0), kerangka(T0)),
      tambah(idx(SUARA_W1, "mangga"), ...isiSisi(Ta, "L")),
      ubah(idx(SUARA_W1, "mangga"), ...ubahTimbang(Ta)),
      tambah(idx(SUARA_W1, "apel"), ...isiSisi(T, "R")),
      ubah(idx(SUARA_W1, "apel"), ...ubahTimbang(T)),
    ),
    k(SUARA_W2, tambah(idx(SUARA_W2, "Mana"), teks("tanya", 150, 152, "mana yang lebih berat?", 11, W.ungu)), tambah(idx(SUARA_W2, "jawaban"), ...pilihKata(160, ["mangga", "apel", "sama berat"], 11))),
    k(SUARA_W3, sorotkan(idx(SUARA_W3, "Betul!"), "c1-k"), tambah(idx(SUARA_W3, "turun."), ...penunjuk(T))),
    k(SUARA_W4, redamkan(0, "c1-k"), hapus(idx(SUARA_W4, "Mangga"), "tanya", ...idPilihan(3)), tambah(idx(SUARA_W4, "jadi"), ...kartu("wk", 30, 164, 240, 26, W.emas, ["apel lebih ringan dari mangga"], 10))),
  ],
};

/* ------------------------------ 4. Ringkasan metode luar ------------------------------ */
const SUARA_R1 = "Mari kita ringkas tiga metode dari luar. Semuanya membantu kita membandingkan dan mengukur berat.";
const SUARA_R2 = "Metode Banding Berat, taruh dua benda di timbangan dan lihat ujung yang turun.";
const SUARA_R3 = "Metode Satuan Tak Baku Berat, hitung satuan kecil sampai timbangan sejajar.";
const SUARA_R4 = "Metode Lebih Berat Lebih Ringan, pakai kata untuk menceritakan perbandingan berat.";
const SUARA_R5 = "Pilih metode yang kamu suka, lalu periksa dengan metode lain. Hasilnya harus sama.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Metode luar: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Ringkasan")), tambah(idx(SUARA_R1, "ringkas"), ...kartu("r0", 14, 34, 272, 30, W.emas, ["3 metode dari luar"], 11))),
    k(SUARA_R2, tambah(idx(SUARA_R2, "Banding"), ...kartu("r1", 14, 72, 272, 34, WARNA_METODE[0], [NAMA_METODE_ID[0], "taruh dua benda, lihat ujung turun"], 9.2))),
    k(SUARA_R3, tambah(idx(SUARA_R3, "Satuan"), ...kartu("r2", 14, 114, 272, 34, WARNA_METODE[1], [NAMA_METODE_ID[1], "hitung satuan sampai sejajar"], 9.2))),
    k(SUARA_R4, tambah(idx(SUARA_R4, "Lebih"), ...kartu("r3", 14, 156, 272, 34, WARNA_METODE[2], [NAMA_METODE_ID[2], "kata untuk menceritakan berat"], 9.2))),
    k(SUARA_R5, bersih(0), tambah(0, judul("Hasilnya harus sama"), emo("rw", 150, 100, OWL, 54)), tambah(idx(SUARA_R5, "sama."), emo("rk", 150, 160, "✅", 30))),
  ],
};
