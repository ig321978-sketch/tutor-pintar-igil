import type { AdeganStory, Obj } from "./logika-story";
import { BIRU_BENDA, KUNING, W, deret, emo, ikatan, judul, kartu, keranjang, teks, titikDua, type Titik } from "./k1b1d-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k1b1d-bantu";

const OWL = "\u{1F989}";

export const NAMA_METODE = ["CPA / SMISCPA Concrete", "CPA Pictorial", "CPA Abstract"];
export const NAMA_METODE_ID = ["Benda Nyata Dulu", "Gambar Representasi", "Simbol Matematika"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara mengajarkan pasangan bilangan lewat tiga tahap yang berurutan. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu: CPA Concrete, CPA Pictorial, dan CPA Abstract. Cara ini berasal dari seorang ahli bernama Bruner.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Benda Nyata Dulu, Gambar Representasi, dan Simbol Matematika.";
const SUARA_O4 = "Ketiganya berurutan seperti tangga. Mulai dari benda, lalu gambar, lalu simbol angka.";
const SUARA_O5 = "Kita akan melihat tiap metode memakai pasangan bilangan sampai sepuluh. Ayo kita mulai.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk pasangan bilangan",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Tiga metode dari luar")),
      tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)),
      tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      ...NAMA_METODE.map((m, i) => tambah(["Concrete,", "Pictorial,", "Abstract."][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
      tambah("Bruner.", emo("br", 262, 186, "\u{1F393}", 24)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      ...NAMA_METODE_ID.map((m, i) => tambah(["Benda", "Gambar", "Simbol"][i], ...kartu(`n${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Seperti tangga")),
      tambah("benda,", emo("t1", 60, 110, "✋", 40), teks("t1t", 60, 140, "benda", 10, W.hijau)),
      tambah("gambar,", emo("t2", 150, 90, "\u{1F5BC}", 40), teks("t2t", 150, 120, "gambar", 10, W.biru)),
      tambah("simbol", emo("t3", 240, 70, "\u{1F522}", 40), teks("t3t", 240, 100, "simbol angka", 10, W.merah)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Pasangan bilangan")),
      tambah("pasangan", ...kartu("o5", 40, 60, 220, 36, W.emas, ["pasangan sampai 10"], 12)),
      tambah("Ayo", emo("ow", 150, 150, OWL, 44)),
    ),
  ],
};

/* ------------------------------ 2. Benda Nyata Dulu: konsep ------------------------------ */
const SUARA_C1 = "Metode pertama, CPA Concrete, atau Benda Nyata Dulu. Anak belajar membilang mulai dari benda yang bisa dipegang.";
const SUARA_C2 = "Anak memegang benda sungguhan, lalu memindahkannya dengan tangannya sendiri.";
const SUARA_C3 = "Dengan memegang, anak merasakan sendiri bahwa satu kelompok benda bisa dipisahkan menjadi dua bagian.";
const SUARA_C4 = "Karena itu tahap pertama selalu memakai benda. Anak belum langsung bertemu dengan angka.";

export const ADEGAN_LUAR_KONKRET: AdeganStory = {
  id: "luar-konkret",
  judul: "Benda Nyata Dulu: belajar dari benda yang dipegang",
  sumber: "Metode luar: CPA Concrete",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_C1, tambah("pertama,", ...kepala(0)), tambah("benda", emo("c1", 90, 110, "✋", 56), emo("c2", 200, 110, "⚽", 44))),
    k(SUARA_C2, tambah("memegang", teks("c3", 150, 160, "pegang dan pindahkan", 11, W.hijau)), ubah("memindahkannya", { id: "c2", x: 230 })),
    k(SUARA_C3, tambah("pisah", ...kartu("c4", 40, 172, 220, 22, W.krem, ["satu kelompok, dua bagian"], 9)), sorotkan("merasakan", "c1")),
    k(SUARA_C4, tambah("langsung", emo("c5", 262, 70, "\u{1F6AB}", 28)), tambah("angka.", teks("c6", 262, 100, "angka", 9, W.merah))),
  ],
};

/* ------------------------------ 3. Benda Nyata Dulu: terapan ------------------------------ */
const SUARA_T1 = "Terapkan pada enam kelereng. Di meja ada dua mangkuk kosong.";
const SUARA_T2 = "Pegang kelereng satu per satu. Dua kelereng dipindah ke mangkuk kiri.";
const SUARA_T3 = "Empat kelereng yang lain dipindah ke mangkuk kanan.";
const SUARA_T4 = "Mangkuk kiri berisi dua dan mangkuk kanan berisi empat. Dua dan empat adalah pasangan enam.";
const SUARA_T5 = "Anak bisa mencoba lagi dengan pasangan lain. Satu kelereng pindah ke kiri, dan sekarang tiga dan tiga.";
const PKE: Titik[] = Array.from({ length: 6 }, (_, i) => ({ x: 45 + 42 * i, y: 72 }));
const dalamKiri = (i: number) => ({ id: `ke${i}`, x: 70 + 30 * i, y: 150 });
const dalamKanan = (i: number) => ({ id: `ke${i + 2}`, x: 190 + 24 * i, y: 150 });

export const ADEGAN_LUAR_KONKRET_TERAPAN: AdeganStory = {
  id: "luar-konkret-terapan",
  judul: "Benda Nyata Dulu: memisahkan enam kelereng",
  sumber: "Metode luar: CPA Concrete, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah("pada", ...kepala(0)),
      tambah("kelereng.", ...deret("kelereng", "ke", PKE, 16)),
      tambah("mangkuk", ...keranjang("mk1", 20, 130, 110, 44, { z: -1 }), ...keranjang("mk2", 170, 130, 110, 44, { z: -1 })),
    ),
    k(SUARA_T2, ubah("Dua", ...[0, 1].map(dalamKiri))),
    k(SUARA_T3, ubah("Empat", ...[0, 1, 2, 3].map(dalamKanan))),
    k(
      SUARA_T4,
      tambah("kiri", teks("a2", 75, 120, "2", 20, W.merah)),
      tambah("kanan", teks("a4", 225, 120, "4", 20, W.merah)),
      tambah("pasangan", ...kartu("kt", 70, 56, 160, 26, W.emas, ["2 dan 4 jadi 6"], 10)),
    ),
    k(
      SUARA_T5,
      ubah("pindah", { id: "ke0", x: 55, y: 150 }, { id: "ke1", x: 85, y: 150 }, { id: "ke2", x: 115, y: 150 }, { id: "ke3", x: 200, y: 150 }, { id: "ke4", x: 230, y: 150 }, { id: "ke5", x: 260, y: 150 }, { id: "a2", isi: "3" }, { id: "a4", isi: "3" }, { id: "kt-t0", isi: "3 dan 3 jadi 6" }),
    ),
  ],
};

/* ------------------------------ 4. Gambar Representasi: konsep ------------------------------ */
const SUARA_G1 = "Metode kedua, CPA Pictorial, atau Gambar Representasi. Pindah ke gambar atau diagram sebelum memakai simbol.";
const SUARA_G2 = "Benda yang tadi dipegang kini digambar sebagai bulatan. Satu bulatan mewakili satu benda.";
const SUARA_G3 = "Lalu bulatan itu dikelompokkan dalam diagram ikatan. Lingkaran atas untuk yang utuh, lingkaran bawah untuk bagian.";
const SUARA_G4 = "Gambar menjadi jembatan antara benda sungguhan dan angka.";

export const ADEGAN_LUAR_GAMBAR: AdeganStory = {
  id: "luar-gambar",
  judul: "Gambar Representasi: dari benda ke gambar",
  sumber: "Metode luar: CPA Pictorial",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_G1, tambah("kedua,", ...kepala(1)), tambah("gambar", emo("g1", 100, 120, "\u{1F5BC}", 56), emo("g2", 200, 120, "\u{1F4D0}", 50))),
    k(SUARA_G2, bersih(0), tambah(0, ...kepala(1)), tambah("bulatan.", ...titikDua("gd", 94, 90, 5, 0, W.biru, W.merah, 9, 28)), tambah("Satu", teks("g3", 150, 140, "satu bulatan, satu benda", 10, W.ungu))),
    k(SUARA_G3, bersih(0), tambah(0, ...kepala(1)), tambah("ikatan.", ...ikatan("gi", 150, 84, ["5", "2", "3"], ["u"])), tambah("bawah", ...ikatan("gi", 150, 84, ["5", "2", "3"], ["a", "b"]))),
    k(SUARA_G4, bersih(0), tambah(0, ...kepala(1)), tambah("jembatan", emo("j1", 50, 110, "✋", 36), emo("j2", 150, 110, "\u{1F5BC}", 36), emo("j3", 250, 110, "\u{1F522}", 36)), tambah("angka.", teks("j4", 150, 160, "benda, gambar, angka", 11, W.ungu))),
  ],
};

/* ------------------------------ 5. Gambar Representasi: terapan ------------------------------ */
const SUARA_P1 = "Terapkan pada bilangan sepuluh. Kita gambar sepuluh bulatan.";
const SUARA_P2 = "Enam bulatan diwarnai biru, dan empat bulatan diwarnai kuning.";
const SUARA_P3 = "Sekarang kita gambar ikatan bilangannya. Lingkaran atas diisi dengan sepuluh.";
const SUARA_P4 = "Lingkaran bawah diisi dengan enam dan empat. Gambar sudah mewakili benda tadi.";
const SUARA_P5 = "Gambar ini ringkas, tetapi tetap mengingatkan kita pada bendanya.";

export const ADEGAN_LUAR_GAMBAR_TERAPAN: AdeganStory = {
  id: "luar-gambar-terapan",
  judul: "Gambar Representasi: diagram sepuluh",
  sumber: "Metode luar: CPA Pictorial, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_P1, tambah("pada", ...kepala(1)), tambah("gambar", ...titikDua("pg", 30, 66, 10, 0, W.biru, W.merah, 8, 26)), tambah("sepuluh", teks("p10", 150, 98, "10", 18, W.merah))),
    k(SUARA_P2, ubah("Enam", ...Array.from({ length: 10 }, (_, i) => ({ id: `pg${i}`, warna: i < 6 ? BIRU_BENDA : KUNING })))),
    k(SUARA_P3, hapus(0, "p10"), tambah("ikatan", ...ikatan("pk", 150, 100, ["10", "6", "4"], ["u"]))),
    k(SUARA_P4, tambah("bawah", ...ikatan("pk", 150, 100, ["10", "6", "4"], ["a", "b"]))),
    k(SUARA_P5, tambah("ringkas,", emo("ow", 262, 170, OWL, 30)), sorotkan("ringkas,", "pk-u")),
  ],
};
