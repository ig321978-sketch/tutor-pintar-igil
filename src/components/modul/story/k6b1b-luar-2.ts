import type { AdeganStory } from "./logika-story";
import { W, emo, kartu, kartuMetode, kotak, panah, pecahan, teks } from "./k6b1b-gambar";
import { bersih, k, sorotkan, tambah } from "./k6b1b-bantu";

/* ------------------------------ LB5. Cross-Arrow Divide: konsep ------------------------------ */
export const ADEGAN_LUAR_B_SILANG: AdeganStory = {
  id: "luarb1-silang",
  judul: "Cross-Arrow Divide: panah silang",
  sumber: "Metode dari luar buku; pembagian dua pecahan dengan dua panah silang",
  latar: "#ECFDF5",
  ketukan: [
    k(
      "Cross-Arrow Divide dipakai bila kedua bilangan ditulis sebagai pecahan. Panah silang menunjukkan siapa dikalikan dengan siapa.",
      tambah(0, teks("jud", 150, 22, "Cross-Arrow Divide", 12, W.ungu)),
      tambah("pecahan", pecahan("fa", 90, 100, "a", "b", 20, W.biru)),
      tambah("silang", teks("bg", 150, 106, "÷", 22, W.hitam), pecahan("fb", 210, 100, "c", "d", 20, W.biru)),
    ),
    k(
      "Panah merah dari pembilang pertama ke penyebut kedua: a kali d. Hasilnya menjadi pembilang jawaban.",
      tambah("merah", panah("pm", 100, 90, 98, 36, W.merah, 2.5, { gambar: true })),
      tambah("kali", teks("hm", 150, 164, "atas: a × d", 14, W.merah)),
    ),
    k(
      "Panah hijau dari penyebut pertama ke pembilang kedua: b kali c. Hasilnya menjadi penyebut jawaban.",
      tambah("hijau", panah("ph", 100, 126, 98, -36, W.hijau, 2.5, { gambar: true })),
      tambah("kali", teks("hh", 150, 188, "bawah: b × c", 14, W.hijau)),
    ),
    k(
      "Contoh: 4 dibagi tiga per lima. Tulis 4 sebagai empat per 1. Panah merah: 4 kali 5 sama dengan 20. Panah hijau: 1 kali 3 sama dengan 3.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Contoh Cross-Arrow Divide", 12, W.ungu)),
      tambah("Contoh:", pecahan("ca", 90, 80, "4", "1", 20, W.biru), teks("cg", 150, 86, "÷", 22, W.hitam), pecahan("cb", 210, 80, "3", "5", 20, W.biru)),
      tambah("merah:", panah("cm", 100, 70, 98, 36, W.merah, 2.5, { gambar: true }), teks("c1", 80, 140, "4 × 5 = 20", 13, W.merah)),
      tambah("hijau:", panah("ch", 100, 106, 98, -36, W.hijau, 2.5, { gambar: true }), teks("c2", 220, 140, "1 × 3 = 3", 13, W.hijau)),
    ),
    k(
      "Hasilnya dua puluh per 3, atau 6 dua per tiga.",
      tambah("Hasilnya", teks("c3", 150, 180, "4 ÷ 3/5 = 20/3 = 6 2/3", 16, W.ungu)),
    ),
  ],
};

/* ------------------------------ LB6. Cross-Arrow Divide: penerapan ------------------------------ */
export const ADEGAN_LUAR_B_SILANG_TERAPAN: AdeganStory = {
  id: "luarb1-silang-terapan",
  judul: "Cross-Arrow Divide: beras ke empat kantong",
  sumber: "Metode dari luar buku; contoh dua per tiga kilogram beras dibagi 4 kantong",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Terapan: dua per tiga kilogram beras dibagi rata ke 4 kantong. Tulis 4 sebagai empat per 1.",
      tambah(0, teks("jud", 150, 22, "Terapan: beras ke 4 kantong", 12, W.ungu)),
      tambah("beras", emo("br", 40, 90, "🌾", 34), teks("bt", 40, 110, "2/3 kg", 10, W.merah)),
      tambah("Tulis", pecahan("da", 120, 90, "2", "3", 18, W.biru), teks("dg", 170, 96, "÷", 20, W.hitam), pecahan("db", 220, 90, "4", "1", 18, W.biru)),
      tambah("kantong.", ...[kotak("kn0", 60, 150, 26, 26, W.krem, W.coklat), kotak("kn1", 110, 150, 26, 26, W.krem, W.coklat), kotak("kn2", 160, 150, 26, 26, W.krem, W.coklat), kotak("kn3", 210, 150, 26, 26, W.krem, W.coklat)]),
    ),
    k(
      "Panah merah: pembilang 2 kali penyebut 1 sama dengan 2.",
      tambah("merah:", panah("pm", 130, 80, 78, 36, W.merah, 2.5, { gambar: true })),
      tambah("kali", teks("pa", 100, 196, "atas: 2 × 1 = 2", 12, W.merah)),
    ),
    k(
      "Panah hijau: penyebut 3 kali pembilang 4 sama dengan 12.",
      tambah("hijau:", panah("ph", 130, 116, 78, -36, W.hijau, 2.5, { gambar: true })),
      tambah("kali", teks("pb", 210, 196, "bawah: 3 × 4 = 12", 12, W.hijau)),
    ),
    k(
      "Hasilnya dua per dua belas, disederhanakan menjadi satu per enam kilogram per kantong.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Hasil per kantong", 12, W.ungu)),
      tambah("Hasilnya", teks("e1", 150, 80, "2/3 ÷ 4 = 2/12 = 1/6", 18, W.ungu)),
      tambah("kilogram", teks("e2", 150, 124, "1/6 kg per kantong", 14, W.hijau)),
    ),
    k(
      "Periksa: satu per enam kali 4 sama dengan empat per enam, yaitu dua per tiga. Cocok.",
      tambah("Periksa:", teks("e3", 150, 170, "1/6 × 4 = 4/6 = 2/3", 16, W.merah)),
      sorotkan("Cocok.", "e3"),
    ),
  ],
};

/* ------------------------------ LB7. Repeated-Subtraction Measurement: konsep ------------------------------ */
const tangga = [30, 90, 150, 210];

export const ADEGAN_LUAR_B_UKUR: AdeganStory = {
  id: "luarb1-ukur",
  judul: "Repeated-Subtraction Measurement: kurangi berulang",
  sumber: "Metode dari luar buku; menghitung berapa kali pembagi muat",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Repeated-Subtraction Measurement menjawab: berapa kali pembagi bisa dikurangkan dari bilangan awal sampai habis? Banyak pengurangan itulah hasil bagi.",
      tambah(0, teks("jud", 150, 22, "Repeated-Subtraction Measurement", 11, W.ungu)),
      tambah("bilangan", kartu("ba", 20, 50, 110, 50, W.krem, ["bilangan awal"], 10)),
      tambah("pembagi", kartu("bp", 170, 50, 110, 50, W.hijauMuda, ["pembagi"], 10)),
      tambah("hasil", teks("bh", 150, 150, "hasil bagi = banyak pengurangan", 11, W.merah)),
    ),
    k(
      "Contoh: 3 dibagi tiga per empat. Ubah 3 menjadi dua belas per empat, supaya satuannya sama dengan pembagi.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Contoh: 3 ÷ 3/4", 12, W.ungu)),
      tambah("Ubah", teks("u1", 150, 80, "3 = 12/4", 22, W.biru)),
      tambah("satuannya", teks("u2", 150, 130, "satuan: seperempat", 12, W.hijau)),
    ),
    k(
      "Kurangkan tiga per empat berulang kali: dua belas per empat, sembilan per empat, enam per empat, tiga per empat, lalu nol.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Kurangi 3/4 berulang", 12, W.ungu)),
      tambah("dua", teks("v0", tangga[0] + 12, 90, "12/4", 14)),
      tambah("sembilan", teks("v1", tangga[1] + 12, 90, "9/4", 14), panah("w1", tangga[0] + 32, 84, 16, 0, W.merah, 2, { gambar: true })),
      tambah("enam", teks("v2", tangga[2] + 12, 90, "6/4", 14), panah("w2", tangga[1] + 32, 84, 16, 0, W.merah, 2, { gambar: true })),
      tambah("tiga@2", teks("v3", tangga[3] + 12, 90, "3/4", 14), panah("w3", tangga[2] + 32, 84, 16, 0, W.merah, 2, { gambar: true })),
      tambah("nol.", teks("v4", 270, 90, "0", 14, W.hijau), panah("w4", tangga[3] + 32, 84, 16, 0, W.merah, 2, { gambar: true })),
    ),
    k(
      "Pengurangan dilakukan 4 kali sampai habis. Jadi 3 dibagi tiga per empat sama dengan 4.",
      tambah("Pengurangan", teks("s1", 150, 136, "dikurangi 3/4 sebanyak 4 kali", 11, W.merah)),
      tambah("Jadi", teks("s2", 150, 172, "3 ÷ 3/4 = 4", 18, W.hijau)),
    ),
    k(
      "Cek dengan kali kebalikan: 3 kali empat per tiga sama dengan 12 per 3, yaitu 4. Hasilnya sama.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Cek dengan kali kebalikan", 12, W.ungu)),
      tambah("Cek", teks("x1", 150, 90, "3 × 4/3 = 12/3 = 4", 18, W.ungu)),
      tambah("sama.", teks("x2", 150, 140, "hasilnya sama: 4", 14, W.hijau)),
    ),
  ],
};

/* ------------------------------ LB8. Repeated-Subtraction Measurement: penerapan ------------------------------ */
export const ADEGAN_LUAR_B_UKUR_TERAPAN: AdeganStory = {
  id: "luarb1-ukur-terapan",
  judul: "Repeated-Subtraction Measurement: sirup dan botol",
  sumber: "Metode dari luar buku; contoh 4 liter sirup ke botol tiga per delapan liter",
  latar: "#FFF1F2",
  ketukan: [
    k(
      "Terapan: 4 liter sirup dituang ke botol berkapasitas tiga per delapan liter. Berapa botol penuh, dan berapa sisanya?",
      tambah(0, teks("jud", 150, 22, "Terapan: 4 liter sirup", 12, W.ungu)),
      tambah("liter", teks("l4", 80, 90, "4 liter", 18, W.merah), emo("sy", 80, 130, "🧴", 32)),
      tambah("botol", kartu("bk", 150, 56, 130, 56, W.krem, ["1 botol = 3/8 liter"], 10)),
      tambah("Berapa", teks("lq", 215, 150, "berapa botol?", 11, W.merah)),
    ),
    k(
      "Ubah 4 liter menjadi tiga puluh dua per delapan. Satu botol memakai tiga per delapan, jadi kurangkan berulang.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Samakan satuan", 12, W.ungu)),
      tambah("Ubah", teks("m1", 150, 80, "4 = 32/8", 22, W.biru)),
      tambah("Satu", teks("m2", 150, 126, "1 botol memakai 3/8", 13, W.hijau)),
    ),
    k(
      "Sepuluh kali dikurangi tiga per delapan, tersisa dua per delapan. Dua per delapan lebih kecil dari satu botol.",
      tambah("Sepuluh", teks("m3", 150, 160, "10 × 3/8 = 30/8", 14, W.merah)),
      tambah("tersisa", teks("m4", 150, 190, "32/8 − 30/8 = 2/8", 14, W.ungu)),
    ),
    k(
      "Jadi ada 10 botol penuh. Sisa dua per delapan, atau satu per empat liter, adalah dua per tiga botol.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Botol penuh dan sisa", 12, W.ungu)),
      tambah("ada", teks("n1", 150, 70, "10 botol penuh", 18, W.hijau)),
      tambah("Sisa", teks("n2", 150, 112, "sisa 2/8 = 1/4 liter", 14, W.merah)),
      tambah("adalah", teks("n3", 150, 154, "2/8 ÷ 3/8 = 2/3 botol", 14, W.ungu)),
    ),
    k(
      "Hasilnya 10 dua per tiga botol. Periksa: 4 kali delapan per tiga sama dengan 32 per 3, yaitu 10 dua per tiga.",
      tambah("Periksa:", teks("n4", 150, 194, "4 × 8/3 = 32/3 = 10 2/3", 15, W.merah)),
      sorotkan("Hasilnya", "n1"),
    ),
  ],
};

/* ------------------------------ LB9. Ringkasan ------------------------------ */
export const ADEGAN_LUAR_B_RINGKAS: AdeganStory = {
  id: "luarb1-ringkas",
  judul: "Ringkasan empat metode luar Sub-Bab B",
  sumber: "Ringkasan metode luar Sub-Bab B",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Ringkasan empat metode luar. Partition Division: pecahan dibagi bilangan asli, penyebut dikali pembagi.",
      tambah(0, teks("jud", 150, 20, "Ringkasan", 12, W.ungu)),
      tambah("Partition", ...kartuMetode("r1", 10, 30, "#FDE68A", ["Partition", "Division"], "penyebut dikali pembagi")),
    ),
    k(
      "Reciprocal Flip: balik pembagi, lalu ubah bagi menjadi kali.",
      tambah("Reciprocal", ...kartuMetode("r2", 156, 30, "#FBCFE8", ["Reciprocal", "Flip"], "balik, lalu kali")),
    ),
    k(
      "Cross-Arrow Divide: dua panah silang, atas kali bawah dan bawah kali atas.",
      tambah("Cross-Arrow", ...kartuMetode("r3", 10, 112, "#BBF7D0", ["Cross-Arrow", "Divide"], "dua panah silang")),
    ),
    k(
      "Repeated-Subtraction Measurement: hitung berapa kali pembagi dikurangkan sampai habis.",
      tambah("Repeated-Subtraction", ...kartuMetode("r4", 156, 112, "#BFDBFE", ["Repeated-Subtraction", "Measurement"], "hitung pengurangan")),
    ),
    k(
      "Keempatnya memberi hasil yang sama dan dapat diperiksa dengan perkalian balik. Pecahan dibagi bilangan asli mengecil, bilangan asli dibagi pecahan kurang dari 1 membesar.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Periksa dengan perkalian balik", 12, W.ungu)),
      tambah("perkalian", kartu("pb", 20, 40, 260, 40, W.krem, ["hasil × pembagi = bilangan awal"], 11)),
      tambah("mengecil,", teks("z1", 150, 112, "pecahan ÷ asli: mengecil", 12, W.merah), panah("z2", 40, 120, 0, 24, W.merah, 2.5, { gambar: true })),
      tambah("kurang", teks("z3", 150, 170, "asli ÷ pecahan < 1: membesar", 12, W.hijau), panah("z4", 40, 190, 0, -24, W.hijau, 2.5, { gambar: true })),
    ),
  ],
};

