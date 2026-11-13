import type { AdeganStory } from "./logika-story";
import { W, angka, emo, kartu, keping, lembar, panah, tempat, teks } from "./k5b9c-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k5b9c-bantu";

/* ------------------------------ 6. Flexible Decomposition: konsep ------------------------------ */
export const ADEGAN_LUAR_C_FLEKSIBEL: AdeganStory = {
  id: "luarc-fleksibel",
  judul: "Flexible Decomposition: menukar satu dengan sepuluh",
  sumber: "Metode luar · Flexible Decomposition",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Flexible Decomposition: satu nilai tempat boleh ditukar dengan sepuluh nilai tempat di sebelah kanannya.",
      tambah(0, teks("jud", 150, 22, "Flexible Decomposition", 13, W.ungu)),
      tambah("satu", ...kartu("ka", 14, 44, 104, 44, W.mint, ["1 ratus ribuan"], 10)),
      tambah("ditukar", panah("pk", 122, 66, 56, 0, W.merah, 2.5, { gambar: true })),
      tambah("sepuluh", ...kartu("kb", 182, 44, 104, 44, W.mawar, ["10 puluh ribuan"], 10)),
    ),
    k(
      "Satu ratus ribuan sama dengan sepuluh puluh ribuan. Bilangannya tidak berubah, hanya cara menyusunnya.",
      tambah("sama", teks("e1", 150, 114, "100.000 = 10 x 10.000", 10, W.hijau)),
    ),
    k(
      "Satu puluh ribuan sama dengan sepuluh ribuan, dan satu ribuan sama dengan sepuluh ratusan.",
      tambah("puluh", teks("e2", 150, 134, "10.000 = 10 x 1.000", 10, W.hijau)),
      tambah("ratusan.", teks("e3", 150, 154, "1.000 = 10 x 100", 10, W.hijau)),
    ),
    k(
      "Arah sebaliknya juga boleh: sepuluh nilai di satu kolom ditukar menjadi satu nilai di kolom kirinya. Itulah yang terjadi saat 110.000 pindah kolom.",
      tambah("sebaliknya", teks("e4", 150, 176, "11 x 10.000 = 110.000", 10, W.merah)),
      tambah("110.000", teks("e5", 150, 194, "110.000 = 100.000 + 10.000", 10, W.merah)),
    ),
    k(
      "Aturannya: tukar satu menjadi sepuluh ke arah kanan, atau sepuluh menjadi satu ke arah kiri, dan jumlah seluruhnya tidak boleh berubah.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Aturan penukaran", 13, W.ungu)),
      tambah("satu", ...kartu("r1a", 14, 40, 100, 36, W.mint, ["1 nilai"], 9), panah("p1", 118, 58, 64, 0, W.merah, 2.5, { gambar: true }), ...kartu("r1b", 186, 40, 100, 36, W.mawar, ["10 nilai di kanan"], 8.6)),
      tambah("sepuluh@2", ...kartu("r2a", 14, 96, 100, 36, W.mawar, ["10 nilai"], 9), panah("p2", 182, 114, -64, 0, W.merah, 2.5, { gambar: true }), ...kartu("r2b", 186, 96, 100, 36, W.mint, ["1 nilai di kiri"], 8.6)),
      tambah("jumlah", teks("tt", 150, 176, "jumlah seluruhnya tetap", 12, W.hijau)),
    ),
  ],
};

/* ------------------------------ 7. Flexible Decomposition: penerapan pada 623.000 ------------------------------ */
export const ADEGAN_LUAR_C_FLEKSIBEL_TERAPAN: AdeganStory = {
  id: "luarc-fleksibel-terapan",
  judul: "Flexible Decomposition pada uang Yosep 623.000",
  sumber: "Metode luar · Flexible Decomposition, contoh uang Yosep",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Uang Yosep 623.000 tersusun 6 ratus ribuan, 2 puluh ribuan, dan 3 ribuan.",
      tambah(0, teks("jud", 150, 20, "Uang Yosep: 623.000", 13, W.ungu), ...tempat("tb", 18, 36)),
      tambah(4, angka("dg", 18, 36, 0, "6")),
      tambah(7, angka("dg", 18, 36, 1, "2")),
      tambah(11, angka("dg", 18, 36, 2, "3")),
      tambah(12, angka("dg", 18, 36, 3, "0", W.abu), angka("dg", 18, 36, 4, "0", W.abu), angka("dg", 18, 36, 5, "0", W.abu)),
      tambah(12, teks("jm", 150, 112, "600.000 + 20.000 + 3.000 = 623.000", 10, W.hijau)),
    ),
    k(
      "Tukar satu ratus ribuan menjadi sepuluh puluh ribuan: ratus ribuan menjadi 5, puluh ribuan menjadi 12.",
      ubah(11, { id: "dg0", isi: "5", warna: W.merah }),
      ubah(15, { id: "dg1", isi: "12", warna: W.merah }, { id: "jm", isi: "500.000 + 120.000 + 3.000 = 623.000" }),
    ),
    k(
      "Tukar satu puluh ribuan menjadi sepuluh ribuan: puluh ribuan menjadi 11, ribuan menjadi 13.",
      ubah(10, { id: "dg1", isi: "11", warna: W.merah }),
      ubah(13, { id: "dg2", isi: "13", warna: W.merah }, { id: "jm", isi: "500.000 + 110.000 + 13.000 = 623.000" }),
    ),
    k(
      "Ketiga bentuk itu berbeda cara menyusunnya, tetapi jumlahnya selalu sama, yaitu 623.000.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Tiga bentuk, satu jumlah", 13, W.ungu)),
      tambah(1, teks("f1", 150, 52, "600.000 + 20.000 + 3.000 = 623.000", 10, W.biru)),
      tambah(3, teks("f2", 150, 78, "500.000 + 120.000 + 3.000 = 623.000", 10, W.biru)),
      tambah(5, teks("f3", 150, 104, "500.000 + 110.000 + 13.000 = 623.000", 10, W.biru)),
      tambah(11, teks("big", 150, 160, "623.000", 26, W.hijau)),
    ),
    k(
      "Penukaran yang membuat jumlahnya berubah, misalnya menambah sepuluh ribu tanpa mengurangi yang lain, berarti salah.",
      tambah("menambah", teks("f4", 150, 126, "500.000 + 120.000 + 13.000 = 633.000", 9, W.merah), emo("sl", 270, 128, "❌", 14)),
    ),
  ],
};

/* ------------------------------ 8. Money Denomination Composition: konsep ------------------------------ */
const langkah = (id: string, y: number, isi: string, warna: string) => kartu(id, 20, y, 260, 38, warna, [isi], 9);

export const ADEGAN_LUAR_C_UANG: AdeganStory = {
  id: "luarc-uang",
  judul: "Money Denomination Composition: menyusun dari pecahan uang",
  sumber: "Metode luar · Money Denomination Composition",
  latar: "#FEFCE8",
  ketukan: [
    k(
      "Money Denomination Composition: menyusun bilangan dari pecahan uang yang tersedia, mulai dari pecahan terbesar.",
      tambah(0, teks("jud", 150, 20, "Money Denomination Composition", 11, W.ungu)),
      tambah(7, ...lembar("u1", 14, 34, 100000, 62, 28), ...lembar("u2", 84, 34, 50000, 62, 28), ...lembar("u3", 154, 34, 20000, 62, 28), ...lembar("u4", 224, 34, 10000, 62, 28)),
      tambah(9, ...lembar("u5", 14, 72, 5000, 62, 28), ...lembar("u6", 84, 72, 2000, 62, 28), ...keping("c5", 190, 86, 500), ...keping("c1", 226, 86, 100)),
      tambah(13, panah("pk", 24, 130, 250, 0, W.merah, 2.5, { gambar: true }), teks("tt", 150, 150, "dari yang terbesar ke yang terkecil", 10, W.merah)),
    ),
    k(
      "Langkah satu: ambil sebanyak mungkin pecahan terbesar yang tidak melebihi sisa uang.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Tiga langkah", 13, W.ungu)),
      tambah("Langkah", ...langkah("l1", 32, "1. Ambil pecahan terbesar yang muat", W.mint)),
    ),
    k(
      "Langkah dua: hitung sisanya, lalu ulangi dengan pecahan yang lebih kecil.",
      tambah("Langkah", ...langkah("l2", 76, "2. Hitung sisa, ulangi dengan yang lebih kecil", W.krem)),
    ),
    k(
      "Langkah tiga: berhenti saat sisa nol, dan pastikan persediaan uang tidak terlampaui.",
      tambah("Langkah", ...langkah("l3", 120, "3. Berhenti saat sisa nol, cek persediaan", W.mawar)),
    ),
    k(
      "Dengan persediaan terbatas, cara ini bukan satu-satunya; kita boleh menukar pecahan untuk mendapat cara lain.",
      tambah("boleh", teks("e1", 150, 186, "50.000 = 2 x 20.000 + 10.000", 10, W.hijau), emo("tk", 24, 202, "🔁", 14)),
    ),
  ],
};

/* ------------------------------ 9. Money Denomination Composition: penerapan membayar jam tangan ------------------------------ */
const sisa = (isi: string) => teks("ss", 150, 44, `Sisa: ${isi}`, 16, W.merah);
const baris = (i: number, isi: string) => teks(`b${i}`, 150, 70 + i * 16, isi, 9.4, W.biru);

export const ADEGAN_LUAR_C_UANG_TERAPAN: AdeganStory = {
  id: "luarc-uang-terapan",
  judul: "Money Denomination Composition: membayar 345.600",
  sumber: "Metode luar · Money Denomination Composition, contoh jam tangan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      "Terapan: bayar 345.600 dengan uang Ibu. Sisa awalnya 345.600.",
      tambah(0, teks("jud", 150, 20, "Bayar jam tangan dari uang Ibu", 11, W.ungu)),
      tambah("Sisa", sisa("345.600")),
    ),
    k(
      "Ambil dua lembar seratus ribuan, jumlahnya 200.000. Sisanya 145.600.",
      tambah(5, baris(0, "2 x 100.000 = 200.000")),
      hapus(7, "ss"),
      tambah(7, sisa("145.600")),
    ),
    k(
      "Ambil dua lembar lima puluh ribuan, jumlahnya 100.000. Tiga lembar akan melebihi sisa. Sisanya 45.600.",
      tambah(6, baris(1, "2 x 50.000 = 100.000")),
      hapus(13, "ss"),
      tambah(13, sisa("45.600")),
    ),
    k(
      "Ambil dua lembar dua puluh ribuan, jumlahnya 40.000. Sisanya 5.600.",
      tambah(6, baris(2, "2 x 20.000 = 40.000")),
      hapus(8, "ss"),
      tambah(8, sisa("5.600")),
    ),
    k(
      "Sepuluh ribuan terlalu besar untuk sisa 5.600, jadi ambil satu lembar lima ribuan. Sisanya 600.",
      tambah(8, baris(3, "1 x 5.000 = 5.000")),
      hapus(13, "ss"),
      tambah(13, sisa("600")),
    ),
    k(
      "Ambil satu keping lima ratus dan satu keping seratus. Sisanya nol.",
      tambah(2, baris(4, "500 + 100 = 600")),
      hapus(9, "ss"),
      tambah(9, sisa("0")),
    ),
    k(
      "Hasilnya cocok dengan cara empat di buku. Cara dua muncul bila satu lembar lima puluh ribuan ditukar dengan dua lembar dua puluh ribuan dan satu lembar sepuluh ribuan.",
      tambah("cocok", teks("c4", 150, 168, "Cara 4: dua, dua, dua, nol, satu, satu, satu", 8.6, W.hijau)),
      tambah("ditukar", teks("e1", 150, 188, "50.000 = 2 x 20.000 + 10.000", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan empat metode ------------------------------ */
const ring = (id: string, y: number, nama: string, ket: string, warna: string) => kartu(id, 14, y, 272, 34, warna, [nama, ket], 8);

export const ADEGAN_LUAR_C_RINGKAS: AdeganStory = {
  id: "luarc-ringkas",
  judul: "Ringkasan empat metode luar",
  sumber: "Ringkasan metode luar Sub-Bab C",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Ringkasan. Part-Whole Place Model memecah bilangan menjadi bagian, satu bagian untuk tiap kolom nilai tempat.",
      tambah(0, teks("jud", 150, 18, "Ringkasan empat metode", 12, W.ungu)),
      tambah("Part-Whole", ...ring("s1", 28, "Part-Whole Place Model", "bilangan jadi bagian per kolom", W.krem)),
    ),
    k(
      "Expanded Form Composition menjumlahkan nilai semua bagian, dan nol menjaga angka tetap di tempatnya.",
      tambah("Expanded", ...ring("s2", 66, "Expanded Form Composition", "jumlahkan bagian, nol menjaga tempat", W.mint)),
    ),
    k(
      "Flexible Decomposition menukar satu nilai tempat dengan sepuluh nilai di kanannya, tanpa mengubah jumlah.",
      tambah("Flexible", ...ring("s3", 104, "Flexible Decomposition", "tukar satu dengan sepuluh, jumlah tetap", W.langit)),
    ),
    k(
      "Money Denomination Composition menyusun bilangan dari pecahan uang, mulai dari yang terbesar.",
      tambah("Money", ...ring("s4", 142, "Money Denomination Composition", "mulai dari pecahan terbesar", W.mawar)),
    ),
    k(
      "Keempatnya menjawab pertanyaan pembuka bab: komposisi 599.198 adalah 500.000, 90.000, 9.000, 100, 90, dan 8.",
      tambah("599.198", teks("jw", 150, 192, "500.000 + 90.000 + 9.000 + 100 + 90 + 8 = 599.198", 7, W.hijau), emo("ok", 24, 200, "✅", 12)),
    ),
  ],
};
