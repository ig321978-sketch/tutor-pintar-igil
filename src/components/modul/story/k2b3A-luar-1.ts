import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, bangun, emo, judul, kartu, kotak, lingkaran, namaBangun, relBeraturan, relSegiempat, relSegitiga, teks, warnaSegi } from "./k2b3A-gambar";
import { bersih, hapus, idx, k, redamkan, sorotkan, tambah } from "./k2b3A-bantu";

export const NAMA_METODE_ID = ["van Hiele Visual", "Pilah Ciri", "Papan Paku"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara punya cara lain untuk mengenal bangun datar. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama van Hiele Visual, Pilah Ciri, dan satu lagi, Papan Paku.";
const SUARA_O3 = "Semua metode ini menjawab satu pertanyaan. Bagaimana cara mengenali bangun datar dengan cepat dan tepat?";
const SUARA_O4 = "Kita memakai bentuk di layar. Kamu cukup mengetuk, menyeret, dan melihat dengan teliti.";
const SUARA_O5 = "Semua bangunnya paling banyak enam sisi. Siap? Ayo kita mulai dengan metode pertama.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk bangun datar",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)), tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      tambah(idx(SUARA_O2, "van"), ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah(idx(SUARA_O2, "Pilah"), ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah(idx(SUARA_O2, "Papan"), ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah("satu", emo("i1", 60, 84, "\u{1F53A}", 34), emo("i2", 150, 84, "❓", 34), emo("i3", 240, 84, "\u{1F440}", 34)),
      tambah("Bagaimana", ...kartu("iq", 20, 112, 260, 52, W.emas, ["bagaimana cara mengenali", "bangun datar dengan tepat?"], 10)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Alat bantu hari ini")),
      tambah("bentuk", bangun("al0", relSegitiga(40, 36), 70, 96, warnaSegi(3)), lingkaran("al1", 150, 96, 20), bangun("al2", relSegiempat(36, 36), 230, 96, warnaSegi(4))),
      tambah("mengetuk,", emo("tg", 160, 130, "\u{1F446}", 22)),
      tambah("melihat", teks("al-t", 150, 168, "bentuk di layar", 10, W.ungu)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Paling banyak enam sisi")),
      tambah(idx(SUARA_O5, "enam"), bangun("al3", relBeraturan(6, 34), 150, 90, warnaSegi(6))),
      tambah(idx(SUARA_O5, "pertama."), emo("ow", 150, 172, OWL, 30)),
    ),
  ],
};

/* ------------------------------ 2. van Hiele Visual: konsep ------------------------------ */
const SUARA_V1 = "Metode pertama bernama van Hiele Visual. Kita mengenali bangun dari bentuknya yang utuh.";
const SUARA_V2 = "Lihat tiga segitiga ini. Ada yang tinggi, ada yang lebar, dan ada yang miring.";
const SUARA_V3 = "Meski berbeda, semuanya segitiga. Bentuknya yang utuh tetap sama.";
const SUARA_V4 = "Sekarang lihat dua segi empat. Satu tegak dan satu miring. Keduanya segi empat.";
const SUARA_V5 = "Kita tidak perlu menghitung dulu. Dari bentuknya yang utuh, kita sudah bisa mengenali.";
const TIGA = [
  { id: "v0", x: 50, rel: relSegitiga(30, 68), rot: 0 },
  { id: "v1", x: 150, rel: relSegitiga(80, 34), rot: 0 },
  { id: "v2", x: 250, rel: relSegitiga(52, 44), rot: 40 },
];

export const ADEGAN_LUAR_VISUAL: AdeganStory = {
  id: "luar-visual",
  judul: "van Hiele Visual: kenali bentuk utuh",
  sumber: "Metode luar: van Hiele Visual",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_V1, tambah(0, ...kepala(0)), tambah(idx(SUARA_V1, "bentuknya"), ...kartu("kk", 50, 100, 200, 30, W.krem, ["kenali dari bentuk utuh"], 11))),
    k(
      SUARA_V2,
      hapus(0, "kk-k", "kk-t0"),
      tambah(idx(SUARA_V2, "tinggi,"), bangun("v0", TIGA[0].rel, TIGA[0].x, 98, warnaSegi(3))),
      tambah(idx(SUARA_V2, "lebar,"), bangun("v1", TIGA[1].rel, TIGA[1].x, 98, warnaSegi(3))),
      tambah(idx(SUARA_V2, "miring."), bangun("v2", TIGA[2].rel, TIGA[2].x, 98, warnaSegi(3), TIGA[2].rot)),
    ),
    k(SUARA_V3, tambah(idx(SUARA_V3, "semuanya"), ...TIGA.map((t) => namaBangun(t.id, t.x, 152, "segitiga", 10))), sorotkan(idx(SUARA_V3, "utuh"), "v0", "v1", "v2")),
    k(
      SUARA_V4,
      redamkan(0, "v0", "v1", "v2"),
      hapus(idx(SUARA_V4, "dua"), "v0", "v1", "v2", "v0-nm", "v1-nm", "v2-nm"),
      tambah(idx(SUARA_V4, "tegak"), bangun("w0", relSegiempat(44, 44), 90, 98, warnaSegi(4))),
      tambah(idx(SUARA_V4, "miring."), bangun("w1", relSegiempat(40, 40), 210, 98, warnaSegi(4), 45)),
      tambah(idx(SUARA_V4, "Keduanya"), namaBangun("w0", 90, 152, "segi empat", 10), namaBangun("w1", 210, 152, "segi empat", 10)),
    ),
    k(SUARA_V5, sorotkan(idx(SUARA_V5, "mengenali."), "w0", "w1"), tambah(idx(SUARA_V5, "utuh,"), ...kartu("kv", 40, 164, 220, 26, W.krem, ["kenali sekilas, lalu hitung"], 10))),
  ],
};

/* ------------------------------ 3. van Hiele Visual: terapan ------------------------------ */
const SUARA_W1 = "Terapkan pada soal ini. Wei melihat satu segi lima, lalu mencari bentuk yang sama.";
const SUARA_W2 = "Ada tiga pilihan. Pilih bangun yang bentuk utuhnya sama dengan yang ini.";
const SUARA_W3 = "Perhatikan pilihan kedua. Sisinya ada lima, sama seperti contoh, hanya diputar.";
const SUARA_W4 = "Betul! Pilihan kedua juga segi lima. Hanya letaknya yang miring. Hebat!";
const OPSI_X = [12, 106, 200];
const kotakOpsi = (q: number): Obj => kotak(`c${q + 1}-k`, OPSI_X[q], 130, 88, 46, [W.hijauMuda, W.pink, W.langit][q], W.biru, { rx: 8, tebal: 1.6 });

export const ADEGAN_LUAR_VISUAL_TERAPAN: AdeganStory = {
  id: "luar-visual-terapan",
  judul: "van Hiele Visual: cari bentuk yang sama",
  sumber: "Metode luar: van Hiele Visual",
  latar: "#ECFCCB",
  ketukan: [
    k(SUARA_W1, tambah(0, ...kepala(0)), tambah(idx(SUARA_W1, "segi"), bangun("rf", relBeraturan(5, 24), 150, 86, warnaSegi(5)))),
    k(
      SUARA_W2,
      tambah(idx(SUARA_W2, "tiga"), kotakOpsi(0), kotakOpsi(1), kotakOpsi(2)),
      tambah(idx(SUARA_W2, "pilihan."), bangun("o1", relBeraturan(6, 16), OPSI_X[0] + 44, 153, warnaSegi(6)), bangun("o2", relBeraturan(5, 16), OPSI_X[1] + 44, 153, warnaSegi(5), 36), lingkaran("o3", OPSI_X[2] + 44, 153, 16)),
    ),
    k(SUARA_W3, sorotkan(idx(SUARA_W3, "kedua."), "c2-k"), tambah(idx(SUARA_W3, "lima,"), teks("rf-jn", 232, 90, "5 sisi", 12, W.merah))),
    k(SUARA_W4, tambah(idx(SUARA_W4, "segi"), namaBangun("rf", 150, 121, "segi lima", 10)), tambah(idx(SUARA_W4, "Hebat!"), emo("ok", 262, 118, "✅", 22))),
  ],
};

/* ------------------------------ 4. Ringkasan metode luar ------------------------------ */
const SUARA_R1 = "Mari kita ringkas tiga metode dari luar. Semuanya membantu kita mengenali bangun datar.";
const SUARA_R2 = "Metode van Hiele Visual, kenali bangun dari bentuknya yang utuh.";
const SUARA_R3 = "Metode Pilah Ciri, pilah bangun menurut banyak sisinya.";
const SUARA_R4 = "Metode Papan Paku, tarik karet pada paku untuk membentuk bangun.";
const SUARA_R5 = "Pilih metode yang kamu suka, lalu periksa dengan metode lain. Hasilnya harus sama.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Metode luar: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Ringkasan")), tambah(idx(SUARA_R1, "ringkas"), ...kartu("r0", 14, 34, 272, 30, W.emas, ["3 metode dari luar"], 11))),
    k(SUARA_R2, tambah(idx(SUARA_R2, "van"), ...kartu("r1", 14, 72, 272, 34, WARNA_METODE[0], [NAMA_METODE_ID[0], "kenali dari bentuk utuh"], 9.2))),
    k(SUARA_R3, tambah(idx(SUARA_R3, "Pilah"), ...kartu("r2", 14, 114, 272, 34, WARNA_METODE[1], [NAMA_METODE_ID[1], "pilah menurut banyak sisi"], 9.2))),
    k(SUARA_R4, tambah(idx(SUARA_R4, "Papan"), ...kartu("r3", 14, 156, 272, 34, WARNA_METODE[2], [NAMA_METODE_ID[2], "tarik karet pada paku"], 9.2))),
    k(SUARA_R5, bersih(0), tambah(0, judul("Hasilnya harus sama"), emo("rw", 150, 100, OWL, 54)), tambah(idx(SUARA_R5, "sama."), emo("rk", 150, 160, "✅", 30))),
  ],
};
