import type { AdeganStory, Obj } from "./logika-story";
import { BK, JJG, W, emo, garis, kartu, kartuMetode, kisi, lintasan, panah, poli, teks, type Pt } from "./k5b5b-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k5b5b-bantu";

const ket = (id: string, y: number, isi: string, warna: string = W.biru, x = 150): Obj => teks(id, x, y, isi, 8.8, warna, { anchor: "start" });
const potong = (id: string, x: number, y: number, x2: number, y2: number): Obj => garis(id, x, y, x2, y2, W.merah, 1.8, { putus: true });
const tepi = (id: string, x: number, y: number, pts: Pt[]): Obj => poli(id, x, y, pts, "none", W.merah, { tebal: 2.4 });

/* ------------------------------ LB0. Empat metode luar Sub-Bab B ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luarb-pembuka",
  judul: "Empat metode luar untuk menemukan luas",
  sumber: "Metode luar; empat cara menemukan luas daerah",
  latar: "#EEF2FF",
  ketukan: [
    k(
      "Video ini membahas metode luar untuk menemukan luas daerah bangun datar. Isinya empat cara berpikir, dan semuanya kita terapkan pada angka-angka yang ada di buku.",
      tambah(0, teks("jud", 150, 26, "Luas daerah: metode luar", 12.5, W.ungu)),
      tambah("empat", emo("e1", 48, 100, "✂️", 34), teks("t1", 48, 124, "potong", 8.6, W.merah)),
      tambah("cara", emo("e2", 118, 100, "↔️", 34), teks("t2", 118, 124, "geser", 8.6)),
      tambah("semuanya", emo("e3", 188, 100, "🧩", 34), teks("t3", 188, 124, "satukan rumus", 8.6, W.hijau)),
      tambah("angka-angka", emo("e4", 258, 100, "🔲", 34), teks("t4", 258, 124, "bungkus", 8.6, W.ungu)),
    ),
    k(
      "Pertama, Dissection Method, yaitu memotong bangun lalu menyusun potongannya menjadi bangun lain.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Empat metode luar", 12, W.ungu)),
      tambah("Pertama,", kartuMetode("m1", 10, 30, "#FDE68A", ["Dissection", "Method"], "potong, susun ulang")),
    ),
    k(
      "Kedua, Shear Principle, yaitu menggeser bangun sejajar alasnya tanpa mengubah luas. Ketiga, Base Height Unification, yaitu semua luas adalah alas efektif kali tinggi efektif.",
      tambah("Kedua,", kartuMetode("m2", 156, 30, "#FBCFE8", ["Shear", "Principle"], "geser sejajar alas")),
      tambah("Ketiga,", kartuMetode("m3", 10, 112, "#BBF7D0", ["Base x Height", "Unification"], "alas efektif x tinggi")),
    ),
    k(
      "Keempat, Rectangle Enclosure Halving, yaitu membungkus bangun dengan persegi panjang lalu mengambil separuhnya. Mari kita mulai dari yang pertama.",
      tambah("Keempat,", kartuMetode("m4", 156, 112, "#BFDBFE", ["Rectangle", "Enclosure Halving"], "bungkus lalu separuh")),
    ),
  ],
};

/* ------------------------------ LB1. Dissection Method: konsep ------------------------------ */
export const ADEGAN_LUAR_DIS: AdeganStory = {
  id: "luarb-dis",
  judul: "Dissection Method: potong lalu susun ulang",
  sumber: "Metode luar; memotong dan menyusun ulang bangun",
  latar: "#FFF4DD",
  ketukan: [
    k(
      "Dissection Method memotong sebuah bangun menjadi beberapa potongan, lalu menyusun ulang potongan itu menjadi bangun lain yang luasnya sudah kita kenal.",
      tambah(0, teks("jud", 150, 22, "Dissection Method", 13, W.ungu)),
      tambah("memotong", poli("d1a", 14, 76, JJG.asal, W.langitMuda), potong("d1c", 34, 76, 0, 40), teks("d1at", 64, 134, "dipotong", 8.6, W.merah)),
      tambah("menyusun", panah("d1p", 122, 96, 30, 0, W.biru, 2.4), poli("d1b", 160, 76, JJG.hasil, W.hijauMuda)),
      tambah("kenal.", teks("d1bt", 220, 134, "luas sudah dikenal", 8.6, W.hijau)),
    ),
    k(
      "Prinsipnya, luas tidak berubah, karena tidak ada potongan yang dibuang dan tidak ada yang ditambah. Jumlah luas semua potongan tetap sama.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Luas tetap", 13, W.ungu)),
      tambah("Prinsipnya,", poli("d2a", 20, 64, JJG.sisa, W.langitMuda), poli("d2b", 20, 64, JJG.potong, W.jeruk), teks("d2t", 70, 124, "1 + 7 = 8", 14, W.biru)),
      tambah("dibuang", teks("d2u", 220, 76, "tidak dibuang", 9.4, W.merah)),
      tambah("ditambah.", teks("d2v", 220, 96, "tidak ditambah", 9.4, W.merah)),
      tambah("Jumlah", teks("d2w", 220, 134, "luas sebelum", 9.4, W.biru), teks("d2x", 220, 148, "= luas sesudah", 9.4, W.hijau)),
    ),
    k(
      "Langkahnya tiga. Satu, pilih garis potong yang membuat potongan bisa menjadi persegi panjang. Dua, geser atau putar potongan. Tiga, hitung luas bangun baru dengan rumus yang sudah dikenal.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Tiga langkah", 13, W.ungu)),
      tambah("Satu,", ...kartu("l1", 14, 38, 272, 40, W.hijauMuda, ["1. pilih garis potong yang tepat"], 9.4)),
      tambah("Dua,", ...kartu("l2", 14, 88, 272, 40, W.krem, ["2. geser atau putar potongan"], 9.4)),
      tambah("Tiga,", ...kartu("l3", 14, 138, 272, 40, W.muda, ["3. hitung dengan rumus yang dikenal"], 9.4)),
    ),
    k(
      "Kalau potongannya bisa disusun menjadi persegi panjang atau jajargenjang, luasnya langsung dapat dihitung. Karena itu rumus-rumus di buku berawal dari persegi panjang.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Mengapa berhasil?", 13, W.ungu)),
      tambah("persegi", ...kartu("k1", 100, 40, 100, 34, W.hijauMuda, ["persegi panjang"], 9.4)),
      tambah("jajargenjang,", ...kartu("k2", 100, 90, 100, 34, W.krem, ["jajargenjang"], 9.4), panah("k2a", 150, 90, 0, -16, W.biru, 1.8)),
      tambah("langsung", ...kartu("k3", 100, 140, 100, 34, W.muda, ["luas dihitung"], 9.4), panah("k3a", 150, 140, 0, -16, W.biru, 1.8)),
    ),
  ],
};

/* ------------------------------ LB2. Dissection Method: penerapan ------------------------------ */
const XD = 30;
const YD = 76;
const XE = 40;
const YE = 56;

export const ADEGAN_LUAR_DIS_TERAPAN: AdeganStory = {
  id: "luarb-dis-terapan",
  judul: "Dissection Method: jajargenjang dan belah ketupat",
  sumber: "Metode luar; penerapan pada angka Eksplorasi 5.2D dan 5.2F",
  latar: "#FFF4DD",
  ketukan: [
    k(
      "Terapkan pada jajargenjang alas 4 satuan, tinggi 2 satuan. Potong segitiga kecil di ujung kiri, lalu pindahkan ke ujung kanan. Jadilah persegi panjang 4 kali 2.",
      tambah(0, teks("jud", 150, 22, "Jajargenjang", 13, W.ungu)),
      tambah("Terapkan", poli("dj-bw", XD, YD, JJG.sisa, W.langitMuda), poli("dj-ps", XD, YD, JJG.potong, W.jeruk), kisi("dj-g", XD, YD, 5, 2), ket("djk1", 90, "alas 4, tinggi 2", W.ungu, 160)),
      tambah("Potong", potong("djc", XD + 20, YD, 0, 40)),
      ubah("pindahkan", { id: "dj-ps", d: lintasan(JJG.baru) }),
      tambah("Jadilah", teks("djk2", 226, 140, "4 x 2 = 8", 20, W.hijau)),
    ),
    k(
      "Sekarang belah ketupat dengan diagonal 2 dan 4. Potong menjadi empat segitiga siku-siku kecil. Tiap potongan berkaki 1 dan 2, sehingga luasnya 1 satuan luas.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Belah ketupat", 13, W.ungu)),
      tambah("Sekarang", poli("db-a", XE, YE, BK.kiriAtas, W.merahMuda), poli("db-b", XE, YE, BK.kananAtas, W.ungMuda), poli("db-c", XE, YE, [[0, 2], [1, 2], [1, 4]], W.hijauMuda), poli("db-d", XE, YE, [[1, 2], [2, 2], [1, 4]], W.krem)),
      tambah("diagonal", ket("dbk1", 80, "diagonal 2 dan 4", W.ungu, 120)),
      tambah("empat", teks("dba", XE + 13, YE + 30, "1", 9, W.biru), teks("dbb", XE + 27, YE + 30, "1", 9, W.biru), teks("dbc", XE + 13, YE + 62, "1", 9, W.biru), teks("dbd", XE + 27, YE + 62, "1", 9, W.biru)),
      tambah("sehingga", ket("dbk2", 104, "tiap potongan: luas 1", W.hijau, 120)),
    ),
    k(
      "Empat potongan, masing-masing 1 satuan luas, jadi jumlahnya 4 satuan luas. Susun ulang menjadi persegi 2 kali 2, luasnya juga 4 satuan luas.",
      tambah("Empat", teks("dbj", 190, 130, "4 x 1 = 4", 18, W.biru)),
      ubah("Susun", { id: "db-a", d: lintasan(BK.kiriBaru) }, { id: "db-b", d: lintasan(BK.kananBaru) }, { id: "dba", x: XE + 33, y: YE + 70 }, { id: "dbb", x: XE + 7, y: YE + 70 }),
      tambah("persegi", teks("dbk", 190, 164, "2 x 2 = 4", 18, W.hijau)),
    ),
    k(
      "Jadi dengan metode ini, luas jajargenjang 8 satuan luas dan luas belah ketupat 4 satuan luas kita peroleh hanya dari memotong dan menyusun ulang, tanpa rumus baru.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Hasilnya", 13, W.ungu)),
      tambah("jajargenjang", ...kartu("h1", 14, 44, 272, 56, W.langitMuda, ["jajargenjang", "luas 8 satuan luas"], 10.4)),
      tambah("belah", ...kartu("h2", 14, 112, 272, 56, W.hijauMuda, ["belah ketupat", "luas 4 satuan luas"], 10.4)),
      tambah("tanpa", emo("h3", 150, 192, "✂️", 18)),
    ),
  ],
};

/* ------------------------------ LB3. Shear Principle: konsep ------------------------------ */
const XS = 30;
const YS = 76;
const RECT: Pt[] = [[0, 2], [4, 2], [4, 0], [0, 0]];
const MIRING: Pt[] = [[0, 2], [4, 2], [5, 0], [1, 0]];

export const ADEGAN_LUAR_SHR: AdeganStory = {
  id: "luarb-shr",
  judul: "Shear Principle: geser sejajar alas",
  sumber: "Metode luar; menggeser bangun sejajar alasnya",
  latar: "#FDF2F8",
  ketukan: [
    k(
      "Shear Principle berarti menggeser bangun sejajar alasnya. Setiap titik di sisi atas bergeser ke samping sama jauh, sedangkan alas dan tinggi tidak berubah.",
      tambah(0, teks("jud", 150, 22, "Shear Principle", 13, W.ungu)),
      tambah("menggeser", poli("sr-bg", XS, YS, RECT, W.langitMuda), kisi("sr-g", XS, YS, 5, 2)),
      tambah("sisi", panah("sra", XS + 20, YS - 6, 24, 0, W.merah, 2.4)),
      ubah("bergeser", { id: "sr-bg", d: lintasan(MIRING) }),
      tambah("alas@2", ket("srk1", 90, "alas tetap", W.merah, 164)),
      tambah("tinggi", ket("srk2", 112, "tinggi tetap", W.hijau, 164)),
    ),
    k(
      "Mengapa luasnya tetap? Karena pada setiap tingkat ketinggian, lebar bangunnya tetap 4 satuan. Hanya posisinya yang bergeser, bukan ukurannya.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Mengapa luas tetap?", 13, W.ungu), poli("sr2-bg", XS, YS, MIRING, W.langitMuda)),
      tambah("tingkat", garis("sr2a", XS + 15, YS + 10, 80, 0, W.merah, 1.6, { putus: true }), garis("sr2b", XS + 10, YS + 20, 80, 0, W.merah, 1.6, { putus: true }), garis("sr2c", XS + 5, YS + 30, 80, 0, W.merah, 1.6, { putus: true })),
      tambah("lebar", ket("srk3", 94, "lebar tiap tingkat = 4", W.merah, 150)),
      tambah("Hanya", ket("srk4", 116, "hanya posisi yang bergeser", W.biru, 150)),
    ),
    k(
      "Jadi luas bangun hanya ditentukan oleh alas dan tinggi. Segitiga dengan alas dan tinggi yang sama, dan puncaknya digeser sepanjang garis sejajar alas, luasnya juga sama.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Puncak digeser", 13, W.ungu)),
      tambah("Segitiga", poli("sr3a", 30, 70, [[0, 3], [4, 3], [1, 0]], W.langitMuda), kisi("sr3-g", 30, 70, 4, 3)),
      tambah("puncaknya", garis("sr3l", 30, 70, 80, 0, W.merah, 1.8, { putus: true }), tepi("sr3b", 30, 70, [[0, 3], [4, 3], [3, 0]]), tepi("sr3c", 30, 70, [[0, 3], [4, 3], [0, 0]])),
      tambah("luasnya", ket("srk5", 100, "luas ketiganya sama", W.hijau, 140)),
    ),
    k(
      "Ini membuat kita bisa mengubah bentuk yang sulit menjadi bentuk yang mudah, selama alas dan tinggi tetap. Jajargenjang digeser menjadi persegi panjang.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Sulit menjadi mudah", 13, W.ungu)),
      tambah("sulit", ...kartu("sr4a", 12, 60, 112, 50, W.krem, ["jajargenjang"], 9.4)),
      tambah("mudah,", ...kartu("sr4b", 176, 60, 112, 50, W.hijauMuda, ["persegi panjang"], 9.4), panah("sr4p", 128, 85, 44, 0, W.biru, 2.4)),
      tambah("tetap.", teks("sr4t", 150, 148, "alas dan tinggi tetap", 11, W.merah)),
    ),
  ],
};

/* ------------------------------ LB4. Shear Principle: penerapan ------------------------------ */
const SX = [
  [[0, 4], [5, 4], [2, 0]],
  [[0, 4], [5, 4], [0, 0]],
  [[0, 4], [5, 4], [5, 0]],
] as Pt[][];

export const ADEGAN_LUAR_SHR_TERAPAN: AdeganStory = {
  id: "luarb-shr-terapan",
  judul: "Shear Principle: segitiga PQR dan jajargenjang",
  sumber: "Metode luar; penerapan pada angka Eksplorasi 5.2C dan 5.2D",
  latar: "#FDF2F8",
  ketukan: [
    k(
      "Terapkan pada segitiga PQR, alas 5 satuan, tinggi 4 satuan. Puncak R boleh di atas titik O, atau digeser ke ujung kiri, atau ke ujung kanan.",
      tambah(0, teks("jud", 150, 22, "Segitiga PQR", 13, W.ungu)),
      tambah("Terapkan", poli("sx-a", 30, 56, SX[0], W.langitMuda), kisi("sx-g", 30, 56, 5, 4), garis("sxl", 30, 56, 100, 0, W.merah, 1.6, { putus: true }), ket("sxk1", 100, "alas 5, tinggi 4", W.ungu, 154)),
      tambah("kiri,", poli("sx-b", 30, 56, SX[1], "none", W.merah, { tebal: 2.2 })),
      tambah("kanan.", poli("sx-c", 30, 56, SX[2], "none", W.hijau, { tebal: 2.2 })),
    ),
    k(
      "Apa pun letak puncaknya, alas tetap 5 dan tinggi tetap 4. Luasnya sama, yaitu 5 kali 4 dibagi 2 sama dengan 10 satuan luas.",
      hapus(0, "sxk1"),
      tambah("Apa", ket("sxk2", 82, "alas tetap 5", W.merah, 154), ket("sxk3", 100, "tinggi tetap 4", W.hijau, 154)),
      tambah("yaitu", ket("sxk4", 126, "5 x 4 = 20", W.biru, 154)),
      tambah("sama@2", ket("sxk5", 146, "20 : 2 = 10", W.biru, 154)),
      tambah("10", ket("sxk6", 170, "luas = 10 satuan luas", W.hijau, 154)),
    ),
    k(
      "Sekarang jajargenjang alas 4, tinggi 2. Sisi atasnya digeser ke kiri sampai tegak lurus, menjadi persegi panjang 4 kali 2 sama dengan 8 satuan luas.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Jajargenjang", 13, W.ungu)),
      tambah("Sekarang", poli("sy-bg", 30, 76, JJG.asal, W.langitMuda), kisi("sy-g", 30, 76, 5, 2), ket("syk1", 90, "alas 4, tinggi 2", W.ungu, 154)),
      ubah("digeser", { id: "sy-bg", d: lintasan(JJG.hasil.map((p): Pt => [p[0] - 1, p[1]])) }),
      tambah("digeser", panah("sya", 60, 70, -20, 0, W.merah, 2.4)),
      tambah("menjadi", teks("syk2", 228, 136, "4 x 2 = 8", 20, W.hijau)),
    ),
    k(
      "Hasil geser cocok dengan hasil potong dan pindah: segitiga 10 satuan luas, jajargenjang 8 satuan luas. Dua metode, jawabannya sama.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Jawabannya sama", 13, W.ungu)),
      tambah("segitiga", ...kartu("sz1", 14, 44, 272, 56, W.langitMuda, ["segitiga PQR", "luas 10 satuan luas"], 10.4)),
      tambah("jajargenjang", ...kartu("sz2", 14, 112, 272, 56, W.hijauMuda, ["jajargenjang", "luas 8 satuan luas"], 10.4)),
      tambah("Dua", teks("sz3", 150, 192, "potong = geser", 11, W.ungu)),
    ),
  ],
};
