import type { AdeganStory, Obj } from "./logika-story";
import { W, barisTabel, baris, emo, kartu, kartuMetode, kotak, panah, teks } from "./k5b5d-gambar";
import { bersih, k, tambah } from "./k5b5d-bantu";

const jud = (isi: string, y = 20, u = 12): Obj => teks("jud", 150, y, isi, u, W.ungu);

/** Persegi panjang berskala 2 piksel per sentimeter dengan alas di yAlas, kiri di x. */
const persegiPanjang = (id: string, x: number, yAlas: number, p: number, l: number, warna: string): Obj => kotak(id, x, yAlas - l * 2, p * 2, l * 2, warna, W.jeruk, { rx: 1, tebal: 2 });

/* ------------------------------ LB0. Empat metode luar Sub-Bab D ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar5d-pembuka",
  judul: "Empat metode luar untuk keliling dan luas",
  sumber: "Metode luar: empat cara",
  latar: "#EEF2FF",
  ketukan: [
    k(
      "Di video ini kita melihat metode luar untuk hubungan keliling dan luas daerah. Semua metode memakai kerangka dari kawat enam puluh sentimeter sebagai contoh.",
      tambah(0, jud("Keliling dan luas: metode luar", 24, 11.5)),
      tambah("kerangka", kotak("pb2", 140, 72, 120, 50, W.krem, W.jeruk, { tebal: 2.4 }), teks("pb2t", 200, 102, "kerangka kawat", 8.6)),
      tambah("kawat", emo("pb1", 70, 100, "📏", 38), teks("pb1t", 70, 124, "kawat 60 cm", 9, W.merah)),
    ),
    k(
      "Ada empat metode luar. Pertama, Isoperimetric Relationship, yaitu hubungan antarbangun yang kelilingnya sama. Kedua, Fixed Perimeter Maximize Area, yaitu mencari luas terbesar dari keliling tetap.",
      bersih(0),
      tambah(0, jud("Empat metode luar", 20)),
      tambah("Pertama,", kartuMetode("m1", 10, 34, "#FDE68A", ["Isoperimetric", "Relationship"], "keliling sama")),
      tambah("Kedua,", kartuMetode("m2", 156, 34, "#FBCFE8", ["Fixed Perimeter", "Maximize Area"], "luas terbesar")),
    ),
    k(
      "Ketiga, Fixed Area Minimize Perimeter, yaitu kebalikannya: luas tetap, cari keliling terkecil. Keempat, Squareness Ratio, yaitu rasio kepersegian untuk menilai seberapa dekat persegi panjang dengan persegi.",
      tambah("Ketiga,", kartuMetode("m3", 10, 116, "#BBF7D0", ["Fixed Area", "Minimize Perimeter"], "keliling terkecil")),
      tambah("Keempat,", kartuMetode("m4", 156, 116, "#BFDBFE", ["Squareness", "Ratio"], "mirip persegi?")),
    ),
  ],
};

/* ------------------------------ LB1. Isoperimetric Relationship: konsep ------------------------------ */
export const ADEGAN_LUAR_ISO: AdeganStory = {
  id: "luar5d-iso",
  judul: "Isoperimetric Relationship: keliling sama, luas berbeda",
  sumber: "Metode luar: Isoperimetric Relationship",
  latar: "#FFF4DD",
  ketukan: [
    k(
      "Isoperimetric berasal dari kata iso yang berarti sama dan perimeter yang berarti keliling. Jadi Isoperimetric Relationship adalah hubungan antarbangun yang kelilingnya sama.",
      tambah(0, jud("Isoperimetric Relationship", 22, 11)),
      tambah("iso", kartu("i1", 30, 46, 110, 50, W.krem, ["iso", "= sama"], 10.4)),
      tambah("perimeter", kartu("i2", 160, 46, 110, 50, W.muda, ["perimeter", "= keliling"], 10.4)),
      tambah("hubungan", teks("i3", 150, 140, "keliling sama: bagaimana luasnya?", 9.6, W.ungu)),
    ),
    k(
      "Idenya: bangun yang berkeliling sama bisa punya luas yang berbeda jauh. Contohnya tiga persegi panjang berkeliling enam puluh sentimeter.",
      bersih(0),
      tambah(0, jud("Tiga kerangka dari kawat", 20)),
      tambah("tiga", persegiPanjang("ra", 55, 130, 5, 25, W.merahMuda)),
      tambah("persegi", persegiPanjang("rb", 135, 130, 10, 20, W.krem)),
      tambah("panjang", persegiPanjang("rc", 225, 130, 15, 15, W.hijauMuda)),
      tambah("enam", teks("ka", 60, 150, "keliling 60", 8.4, W.merah), teks("kb", 150, 150, "keliling 60", 8.4, W.merah), teks("kc", 240, 150, "keliling 60", 8.4, W.merah)),
    ),
    k(
      "Lihat luasnya: lima kali dua puluh lima hasilnya seratus dua puluh lima, sepuluh kali dua puluh hasilnya dua ratus, dan lima belas kali lima belas hasilnya dua ratus dua puluh lima. Keliling sama, luas berbeda.",
      tambah("lima", teks("la", 60, 168, "5 x 25 = 125", 8.6, W.biru)),
      tambah("sepuluh", teks("lb", 150, 168, "10 x 20 = 200", 8.6, W.biru)),
      tambah("belas", teks("lc", 240, 168, "15 x 15 = 225", 8.6, W.biru)),
      tambah("berbeda.", teks("ld", 150, 188, "keliling sama, luas berbeda", 9.4, W.hijau)),
    ),
    k(
      "Jadi keliling saja tidak cukup untuk menyebut besar suatu daerah. Keliling mengukur panjang garis tepi, sedangkan luas mengukur isi daerahnya.",
      bersih(0),
      tambah(0, jud("Dua ukuran berbeda", 22)),
      tambah("Keliling", kartu("d1", 25, 46, 110, 64, W.krem, ["Keliling", "garis tepi"], 10)),
      tambah("luas", kartu("d2", 165, 46, 110, 64, W.muda, ["Luas", "isi daerah"], 10)),
      tambah("cukup", teks("d3", 150, 150, "satu ukuran tidak cukup", 9.6, W.merah)),
    ),
    k(
      "Cara berpikir metode ini: kalau dua bangun berkeliling sama, jangan buru-buru menyimpulkan luasnya sama. Hitung dulu luas masing-masing.",
      bersih(0),
      tambah(0, jud("Cara berpikir", 22)),
      tambah("kalau", baris("e1", 30, 50, 240, "✗ keliling sama, jadi luas sama", W.merahMuda, 9, 28)),
      tambah("Hitung", baris("e2", 30, 98, 240, "✓ hitung luas masing-masing", W.hijauMuda, 9, 28)),
    ),
  ],
};

/* ------------------------------ LB1t. Isoperimetric pada enam bentuk buku ------------------------------ */
const CHIP: [string, string][] = [
  ["20 x 10", "#FEF3C7"],
  ["10 x 20", "#FEF3C7"],
  ["5 x 25", "#FECACA"],
  ["25 x 5", "#FECACA"],
  ["15 x 15", "#BBF7D0"],
  ["18 x 12", "#DBEAFE"],
];

export const ADEGAN_LUAR_ISO_TERAPAN: AdeganStory = {
  id: "luar5d-iso-terapan",
  judul: "Isoperimetric Relationship: enam bentuk berkeliling 60",
  sumber: "Metode luar: Isoperimetric, penerapan",
  latar: "#FFF4DD",
  ketukan: [
    k(
      "Terapkan pada enam bentuk kerangka tadi. Semuanya berkeliling enam puluh sentimeter. Inilah enam bangun yang kelilingnya sama.",
      tambah(0, jud("Enam bentuk, keliling 60", 20)),
      tambah("enam", CHIP.flatMap(([t, w], i) => kartu(`ch${i}`, 8 + (i % 3) * 98, 40 + Math.floor(i / 3) * 62, 88, 50, w, [t, "keliling 60"], 8.8))),
    ),
    k(
      "Kelompokkan menurut luasnya. Luas seratus dua puluh lima untuk lima kali dua puluh lima dan dua puluh lima kali lima. Luas dua ratus untuk dua puluh kali sepuluh dan sepuluh kali dua puluh.",
      bersih(0),
      tambah(0, jud("Kelompok menurut luas", 20)),
      tambah("seratus", baris("g1", 25, 44, 250, "125: 5 x 25 dan 25 x 5", W.merahMuda, 9.2, 26)),
      tambah("ratus@2", baris("g2", 25, 82, 250, "200: 20 x 10 dan 10 x 20", W.krem, 9.2, 26)),
    ),
    k(
      "Luas dua ratus enam belas untuk delapan belas kali dua belas, dan luas dua ratus dua puluh lima untuk lima belas kali lima belas. Jadi dari enam bangun berkeliling sama, luasnya ada empat nilai yang berbeda.",
      tambah("enam", baris("g3", 25, 120, 250, "216: 18 x 12", W.muda, 9.2, 26)),
      tambah("puluh", baris("g4", 25, 158, 250, "225: 15 x 15", W.hijauMuda, 9.2, 26)),
      tambah("empat", teks("g5", 150, 196, "4 nilai luas berbeda", 8.4, W.merah)),
    ),
    k(
      "Selisih luas terbesar dan terkecil adalah dua ratus dua puluh lima dikurangi seratus dua puluh lima, hasilnya seratus sentimeter persegi. Padahal kelilingnya sama persis.",
      bersih(0),
      tambah(0, jud("Selisih luas", 22)),
      tambah("terbesar", kartu("s1", 25, 46, 110, 50, W.hijauMuda, ["terbesar", "225 cm²"], 10)),
      tambah("terkecil", kartu("s2", 165, 46, 110, 50, W.merahMuda, ["terkecil", "125 cm²"], 10)),
      tambah("hasilnya", teks("s3", 150, 130, "225 - 125 = 100", 13, W.biru)),
      tambah("sama", teks("s4", 150, 160, "keliling tetap 60", 9.6, W.ungu)),
    ),
  ],
};

/* ------------------------------ LB2. Fixed Perimeter Maximize Area: konsep ------------------------------ */
const LEB = [60, 60, 66];
const baGaris = (id: string, y: number, isi: string[], warna: string, u = 8.4): Obj[] => barisTabel(id, 57, y, LEB, isi, warna, u, 18);

export const ADEGAN_LUAR_MAKS: AdeganStory = {
  id: "luar5d-maks",
  judul: "Fixed Perimeter Maximize Area: keliling tetap, luas terbesar",
  sumber: "Metode luar: Fixed Perimeter Maximize Area",
  latar: "#FDF2F8",
  ketukan: [
    k(
      "Fixed Perimeter Maximize Area artinya keliling dibuat tetap, lalu luas dimaksimalkan. Inilah pertanyaan soal kawat tadi: dari kawat enam puluh, kerangka mana yang terluas?",
      tambah(0, jud("Fixed Perimeter Maximize Area", 22, 10.6)),
      tambah("keliling", kartu("a1", 20, 44, 120, 50, W.krem, ["keliling tetap", "60 cm"], 9.6)),
      tambah("luas", panah("a2", 144, 69, 14, 0, W.ungu, 2.2), kartu("a3", 160, 44, 120, 50, W.hijauMuda, ["luas terbesar?"], 9.6)),
      tambah("Inilah", teks("a4", 150, 130, "soal kawat Bapak", 10, W.ungu)),
    ),
    k(
      "Trik pertama: keliling enam puluh berarti panjang ditambah lebar harus tiga puluh, yaitu setengah keliling. Setiap pasangan panjang dan lebar harus berjumlah tiga puluh.",
      bersih(0),
      tambah(0, jud("Trik 1: setengah keliling", 22)),
      tambah("keliling", teks("t1", 150, 60, "60 : 2 = 30", 14, W.biru)),
      tambah("panjang", teks("t2", 150, 92, "panjang + lebar = 30", 11, W.merah)),
      tambah("pasangan", teks("t3", 150, 128, "semua pasangan berjumlah 30", 9.6, W.ungu)),
    ),
    k(
      "Trik kedua: daftar pasangan yang berjumlah tiga puluh, lalu hitung luasnya. Mulai dari lima dan dua puluh lima, lalu naikkan panjangnya pelan-pelan, misalnya sepuluh dan dua puluh.",
      bersih(0),
      tambah(0, jud("Trik 2: daftar dan hitung", 22)),
      tambah("daftar", baGaris("th", 40, ["panjang", "lebar", "luas"], W.biru, 8.4).map((o) => (o.t === "teks" ? { ...o, warna: W.putih } : o))),
      tambah("lima", baGaris("r1", 58, ["5", "25", "125"], W.krem)),
      tambah("sepuluh", baGaris("r2", 76, ["10", "20", "200"], W.krem)),
    ),
    k(
      "Luasnya naik, mencapai puncak, lalu turun lagi. Puncaknya pada lima belas dan lima belas, yaitu dua ratus dua puluh lima. Setelah itu kembali dua ratus dan seratus dua puluh lima karena panjang dan lebar hanya tertukar.",
      tambah("belas", baGaris("r3", 94, ["15", "15", "225"], W.hijauMuda)),
      tambah("ratus@2", baGaris("r4", 112, ["20", "10", "200"], W.krem)),
      tambah("ratus@3", baGaris("r5", 130, ["25", "5", "125"], W.krem)),
      tambah("tertukar.", teks("pk", 150, 168, "puncak: panjang sama dengan lebar", 9.2, W.hijau)),
    ),
    k(
      "Kesimpulan metode ini: untuk keliling tetap, luas terbesar dicapai ketika panjang sama dengan lebar, yaitu persegi.",
      bersih(0),
      tambah(0, jud("Kesimpulan", 22)),
      tambah("keliling", kotak("sq", 110, 60, 80, 80, W.hijauMuda, W.hijau, { tebal: 2.6 }), teks("sqt", 150, 104, "persegi", 11, W.hijau)),
      tambah("luas", teks("sk", 150, 168, "keliling tetap, luas terbesar", 10, W.ungu)),
    ),
  ],
};

/* ------------------------------ LB2t. Fixed Perimeter Maximize Area: pasangan di sekitar puncak ------------------------------ */
export const ADEGAN_LUAR_MAKS_TERAPAN: AdeganStory = {
  id: "luar5d-maks-terapan",
  judul: "Fixed Perimeter Maximize Area: menguji sekitar puncak",
  sumber: "Metode luar: Maximize Area, penerapan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      "Uji dengan pasangan di sekitar puncak. Tiga belas dan tujuh belas berjumlah tiga puluh, luasnya tiga belas kali tujuh belas hasilnya dua ratus dua puluh satu.",
      tambah(0, jud("Uji di sekitar puncak", 22)),
      tambah("Tiga", baris("u1", 30, 46, 240, "13 + 17 = 30", W.krem, 9.6, 24), baris("u1b", 30, 76, 240, "13 x 17 = 221", W.putih, 9.6, 24)),
    ),
    k(
      "Pasangan empat belas dan enam belas juga berjumlah tiga puluh, dan luasnya empat belas kali enam belas hasilnya dua ratus dua puluh empat.",
      tambah("empat", baris("u2", 30, 112, 240, "14 + 16 = 30", W.krem, 9.6, 24), baris("u2b", 30, 142, 240, "14 x 16 = 224", W.putih, 9.6, 24)),
    ),
    k(
      "Terakhir lima belas dan lima belas, berjumlah tiga puluh, luasnya lima belas kali lima belas hasilnya dua ratus dua puluh lima. Puncak ini lebih besar dari dua ratus dua puluh empat dan dua ratus dua puluh satu.",
      bersih(0),
      tambah(0, jud("Puncaknya", 22)),
      tambah("lima", baris("u3", 30, 46, 240, "15 + 15 = 30", W.hijauMuda, 9.6, 24), baris("u3b", 30, 76, 240, "15 x 15 = 225", W.hijauMuda, 9.6, 24)),
      tambah("Puncak", teks("u3c", 150, 130, "225 > 224 > 221", 14, W.hijau)),
    ),
    k(
      "Bandingkan dengan bentuk keenam tadi: delapan belas kali dua belas hasilnya dua ratus enam belas, lebih kecil dari dua ratus dua puluh lima karena selisih panjang dan lebarnya enam.",
      bersih(0),
      tambah(0, jud("Bentuk 6 tadi", 22)),
      tambah("delapan", teks("v1", 150, 60, "18 x 12 = 216", 12, W.biru)),
      tambah("selisih", teks("v2", 150, 88, "18 - 12 = 6", 12, W.merah)),
      tambah("lebih", teks("v3", 150, 118, "216 < 225", 12, W.hijau)),
    ),
    k(
      "Polanya: selisih nol memberi dua ratus dua puluh lima, selisih dua memberi dua ratus dua puluh empat, selisih enam memberi dua ratus enam belas, selisih sepuluh memberi dua ratus, dan selisih dua puluh memberi seratus dua puluh lima.",
      bersih(0),
      tambah(0, jud("Selisih panjang dan lebar", 20, 11)),
      tambah("selisih@1", baris("w0", 40, 36, 220, "selisih 0: luas 225", W.hijauMuda, 9, 22)),
      tambah("selisih@2", baris("w1", 40, 62, 220, "selisih 2: luas 224", W.krem, 9, 22)),
      tambah("selisih@3", baris("w2", 40, 88, 220, "selisih 6: luas 216", W.krem, 9, 22)),
      tambah("selisih@4", baris("w3", 40, 114, 220, "selisih 10: luas 200", W.krem, 9, 22)),
      tambah("selisih@5", baris("w4", 40, 140, 220, "selisih 20: luas 125", W.merahMuda, 9, 22)),
      tambah("memberi@5", teks("w5", 150, 180, "makin kecil selisih, makin luas", 9.4, W.ungu)),
    ),
  ],
};
