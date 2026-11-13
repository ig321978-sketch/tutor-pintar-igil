import type { AdeganStory } from "./logika-story";
import { W, angka, emo, garis, kartu, kotak, panah, tempat, teks } from "./k5b9c-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k5b9c-bantu";

/** Kartu metode pada peta empat metode: kotak berjudul dan satu baris keterangan. */
const metode = (id: string, x: number, y: number, nama: string[], ket: string, warna: string) => [...kartu(id, x, y, 134, 64, warna, nama, 7.2), teks(`${id}-s`, x + 67, y + 56, ket, 7, W.biru)];

/* ------------------------------ 1. Peta empat metode luar ------------------------------ */
export const ADEGAN_LUAR_C_PEMBUKA: AdeganStory = {
  id: "luarc-pembuka",
  judul: "Empat metode luar untuk komposisi dan dekomposisi",
  sumber: "Metode luar · peta empat metode",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Video ini membahas empat metode luar untuk menyusun dan menguraikan bilangan. Tiap metode kita lihat konsepnya, lalu kita terapkan pada angka dari buku.",
      tambah(0, teks("jud", 150, 26, "Empat Metode Luar", 15, W.ungu)),
      tambah("metode", emo("alat", 150, 76, "🧰", 34)),
      tambah("konsepnya", ...kartu("kn", 40, 100, 100, 44, W.krem, ["konsep"], 11)),
      tambah("terapkan", ...kartu("tr", 160, 100, 100, 44, W.mint, ["terapan"], 11)),
    ),
    k(
      "Metode pertama, Part-Whole Place Model, memandang bilangan sebagai keseluruhan dan tiap kolom nilai tempat sebagai satu bagian.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Empat Metode Luar", 14, W.ungu)),
      tambah("pertama,", ...metode("m1", 10, 36, ["Part-Whole", "Place Model"], "satu bagian per kolom", W.krem)),
      sorotkan("Part-Whole", "m1-k"),
    ),
    k(
      "Metode kedua, Expanded Form Composition, menyusun bilangan dengan menjumlahkan nilai semua bagiannya.",
      tambah("kedua,", ...metode("m2", 156, 36, ["Expanded Form", "Composition"], "jumlahkan semua bagian", W.mint)),
      sorotkan("Expanded", "m2-k"),
      ubah("kedua,", { id: "m1-k", sorot: false }),
    ),
    k(
      "Metode ketiga, Flexible Decomposition, menukar satu nilai tempat dengan sepuluh nilai tempat di sebelah kanannya.",
      tambah("ketiga,", ...metode("m3", 10, 106, ["Flexible", "Decomposition"], "tukar satu dengan sepuluh", W.langit)),
      sorotkan("Flexible", "m3-k"),
      ubah("ketiga,", { id: "m2-k", sorot: false }),
    ),
    k(
      "Metode keempat, Money Denomination Composition, menyusun bilangan dari pecahan uang rupiah yang tersedia.",
      tambah("keempat,", ...metode("m4", 156, 106, ["Money Denomination", "Composition"], "susun dari pecahan uang", W.mawar)),
      sorotkan("Money", "m4-k"),
      ubah("keempat,", { id: "m3-k", sorot: false }),
    ),
    k(
      "Contoh angkanya dari buku: 599.198 dari pembuka bab, uang Yosep 623.000, dan harga jam tangan 345.600.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Angka contoh dari buku", 13, W.ungu)),
      tambah("599.198", ...kartu("a1", 40, 40, 220, 38, W.krem, ["599.198 pembuka bab"], 11)),
      tambah("Yosep", ...kartu("a2", 40, 88, 220, 38, W.mint, ["623.000 uang Yosep"], 11)),
      tambah("345.600.", ...kartu("a3", 40, 136, 220, 38, W.langit, ["345.600 harga jam tangan"], 11)),
    ),
  ],
};

/* ------------------------------ 2. Part-Whole Place Model: konsep ------------------------------ */
const TX = 18;
const GARIS_BAGIAN = (id: string, atasY: number, bawahY: number) =>
  [0, 1, 2, 3, 4, 5].map((c) => garis(`${id}${c}`, 150, atasY, TX + c * 44 + 22 - 150, bawahY - atasY, W.abu, 1.2));

export const ADEGAN_LUAR_C_SEBAGIAN: AdeganStory = {
  id: "luarc-sebagian",
  judul: "Part-Whole Place Model: bilangan sebagai keseluruhan",
  sumber: "Metode luar · Part-Whole Place Model",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Part-Whole Place Model. Anggap 599.198 sebagai satu keseluruhan.",
      tambah(0, teks("jud", 150, 20, "Part-Whole Place Model", 12, W.ungu)),
      tambah("Anggap", ...kartu("ws", 90, 32, 120, 32, W.krem, ["599.198"], 16)),
    ),
    k(
      "Keseluruhan itu terbagi enam bagian, satu bagian untuk tiap kolom nilai tempat, dari ratus ribuan sampai satuan.",
      tambah(0, ...GARIS_BAGIAN("gb", 64, 88)),
      tambah("enam", ...tempat("tb", TX, 88)),
    ),
    k(
      "Tiap bagian berisi satu angka. Angka sembilan di puluh ribuan membawa nilai 90.000.",
      tambah(4, angka("dg", TX, 88, 0, "5"), angka("dg", TX, 88, 1, "9", W.merah), angka("dg", TX, 88, 2, "9"), angka("dg", TX, 88, 3, "1"), angka("dg", TX, 88, 4, "9"), angka("dg", TX, 88, 5, "8")),
      tambah(12, teks("n1", TX + 66, 146, "90.000", 7, W.hijau)),
    ),
    k(
      "Nilai tiap bagian: 500.000, 90.000, 9.000, 100, 90, dan 8.",
      tambah(3, teks("n0", TX + 22, 146, "500.000", 7, W.hijau)),
      tambah(5, teks("n2", TX + 110, 146, "9.000", 7, W.hijau)),
      tambah(6, teks("n3", TX + 154, 146, "100", 7, W.hijau)),
      tambah(7, teks("n4", TX + 198, 146, "90", 7, W.hijau)),
      tambah(8, teks("n5", TX + 242, 146, "8", 7, W.hijau)),
    ),
    k(
      "Aturannya: jumlah nilai semua bagian harus kembali menjadi keseluruhan. Bila ada bagian yang hilang, bilangannya berubah.",
      tambah("jumlah", teks("jm", 150, 178, "500.000 + 90.000 + 9.000 + 100 + 90 + 8 = 599.198", 7, W.biru)),
      tambah("hilang,", emo("ck", 24, 198, "✅", 14)),
    ),
  ],
};

/* ------------------------------ 3. Part-Whole Place Model: penerapan pada uang Yosep dan Komang ------------------------------ */
export const ADEGAN_LUAR_C_SEBAGIAN_TERAPAN: AdeganStory = {
  id: "luarc-sebagian-terapan",
  judul: "Part-Whole Place Model pada uang Yosep dan Komang",
  sumber: "Metode luar · Part-Whole Place Model, contoh uang Yosep",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Terapan pada uang Yosep: keseluruhannya 623.000.",
      tambah(0, teks("jud", 150, 20, "Bagian-bagian uang Yosep", 12, W.ungu)),
      tambah("keseluruhannya", ...kartu("ws", 90, 32, 120, 32, W.krem, ["623.000"], 16)),
      tambah("623.000.", ...GARIS_BAGIAN("gb", 64, 88), ...tempat("tb", TX, 88)),
    ),
    k(
      "Bagian ratus ribuan berisi 6, bernilai 600.000. Puluh ribuan berisi 2, bernilai 20.000. Ribuan berisi 3, bernilai 3.000.",
      tambah(4, angka("dg", TX, 88, 0, "6")),
      tambah(6, teks("n0", TX + 22, 146, "600.000", 7, W.hijau)),
      tambah(10, angka("dg", TX, 88, 1, "2")),
      tambah(12, teks("n1", TX + 66, 146, "20.000", 7, W.hijau)),
      tambah(15, angka("dg", TX, 88, 2, "3")),
      tambah(17, teks("n2", TX + 110, 146, "3.000", 7, W.hijau)),
    ),
    k(
      "Tiga kolom sisanya berisi nol, jadi tidak menambah nilai.",
      tambah(0, angka("dg", TX, 88, 3, "0", W.merah), angka("dg", TX, 88, 4, "0", W.merah), angka("dg", TX, 88, 5, "0", W.merah)),
      tambah("menambah", teks("n3", TX + 154, 146, "0", 7, W.merah), teks("n4", TX + 198, 146, "0", 7, W.merah), teks("n5", TX + 242, 146, "0", 7, W.merah)),
    ),
    k(
      "Jumlah bagian: 600.000 ditambah 20.000 ditambah 3.000 sama dengan 623.000, cocok dengan penjumlahan uang lembar demi lembar.",
      tambah("Jumlah", teks("jm", 150, 178, "600.000 + 20.000 + 3.000 = 623.000", 9, W.biru)),
      tambah("cocok", emo("ck", 24, 198, "✅", 14)),
    ),
    k(
      "Bandingkan dengan uang Komang yang bagiannya 4, 9, dan 3: bagian ratus ribuannya lebih kecil, jadi 493.000 lebih kecil dari 623.000.",
      ubah(0, { id: "ws-t0", isi: "493.000" }, { id: "dg0", isi: "4" }, { id: "dg1", isi: "9" }, { id: "dg2", isi: "3" }, { id: "n0", isi: "400.000" }, { id: "n1", isi: "90.000" }, { id: "n2", isi: "3.000" }, { id: "jm", isi: "400.000 + 90.000 + 3.000 = 493.000" }),
      tambah("Bandingkan", teks("bd", 150, 162, "623.000 lebih besar dari 493.000", 8, W.merah)),
    ),
  ],
};

/* ------------------------------ 4. Expanded Form Composition: konsep ------------------------------ */
const chip = (id: string, x: number, y: number, isi: string, warna: string = W.mint) => [kotak(`${id}-k`, x, y, 64, 30, warna, W.biru, { rx: 6 }), teks(`${id}-t`, x + 32, y + 18, isi, 7.4)];

export const ADEGAN_LUAR_C_BENTUK: AdeganStory = {
  id: "luarc-bentuk",
  judul: "Expanded Form Composition: menyusun dari jumlah bagian",
  sumber: "Metode luar · Expanded Form Composition",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Expanded Form Composition: menyusun bilangan dari jumlah bagian-bagiannya, mulai dari bagian paling kiri.",
      tambah(0, teks("jud", 150, 22, "Expanded Form Composition", 12, W.ungu)),
      tambah("menyusun", ...kartu("bg1", 14, 56, 82, 40, W.mint, ["bagian"], 10), teks("pl1", 105, 80, "+", 14), ...kartu("bg2", 114, 56, 82, 40, W.mint, ["bagian"], 10)),
      tambah("bagian-bagiannya,", teks("pl2", 205, 80, "+", 14), ...kartu("bg3", 214, 56, 72, 40, W.mint, ["bagian"], 10), panah("pk", 150, 106, 0, 28, W.merah, 2.5, { gambar: true })),
      tambah("kiri.", ...kartu("bl", 80, 142, 140, 36, W.krem, ["bilangan"], 12)),
    ),
    k(
      "Contoh Uji Kompetensi tiga a: tiga ratus ribuan, dua puluh ribuan, tujuh ribuan, dan satu ratusan.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Soal: susun bilangannya", 12, W.ungu)),
      tambah(5, ...chip("c0", 14, 36, "3 ratus ribuan")),
      tambah(8, ...chip("c1", 82, 36, "2 puluh ribuan")),
      tambah(11, ...chip("c2", 150, 36, "7 ribuan")),
      tambah(14, ...chip("c3", 218, 36, "1 ratusan")),
    ),
    k(
      "Tulis tiap bagian sebagai nilai: 300.000, 20.000, 7.000, dan 100.",
      tambah(5, teks("v0", 46, 90, "300.000", 8.4, W.hijau)),
      tambah(6, teks("v1", 114, 90, "20.000", 8.4, W.hijau)),
      tambah(7, teks("v2", 182, 90, "7.000", 8.4, W.hijau)),
      tambah(9, teks("v3", 250, 90, "100", 8.4, W.hijau)),
    ),
    k(
      "Jumlahkan semua nilai: 300.000 ditambah 20.000 ditambah 7.000 ditambah 100 sama dengan 327.100.",
      tambah("Jumlahkan", teks("jm", 150, 116, "300.000 + 20.000 + 7.000 + 100 = 327.100", 9, W.biru)),
    ),
    k(
      "Kolom yang tidak disebut diisi nol, yaitu puluhan dan satuan. Bilangannya 327.100.",
      tambah(0, ...tempat("tb", 18, 128)),
      tambah(0, angka("dg", 18, 128, 0, "3"), angka("dg", 18, 128, 1, "2"), angka("dg", 18, 128, 2, "7"), angka("dg", 18, 128, 3, "1")),
      tambah("puluhan", angka("dg", 18, 128, 4, "0", W.merah)),
      tambah("satuan.", angka("dg", 18, 128, 5, "0", W.merah)),
    ),
  ],
};

/* ------------------------------ 5. Expanded Form Composition: penerapan, nol penyangga ------------------------------ */
export const ADEGAN_LUAR_C_BENTUK_TERAPAN: AdeganStory = {
  id: "luarc-bentuk-terapan",
  judul: "Expanded Form Composition: nol sebagai penyangga",
  sumber: "Metode luar · Expanded Form Composition, soal Uji Kompetensi 3b dan 4e",
  latar: "#FDF2F8",
  ketukan: [
    k(
      "Terapan satu, Uji Kompetensi tiga b: lima ratus ribuan, lima ribuan, empat ratusan, dan satu satuan.",
      tambah(0, teks("jud", 150, 20, "Soal 3b", 12, W.ungu)),
      tambah(6, ...chip("c0", 14, 36, "5 ratus ribuan")),
      tambah(9, ...chip("c1", 82, 36, "5 ribuan")),
      tambah(11, ...chip("c2", 150, 36, "4 ratusan")),
      tambah(14, ...chip("c3", 218, 36, "1 satuan")),
    ),
    k(
      "Nilainya 500.000, 5.000, 400, dan 1. Jumlahnya 505.401.",
      tambah(1, teks("v0", 46, 90, "500.000", 8.4, W.hijau)),
      tambah(2, teks("v1", 114, 90, "5.000", 8.4, W.hijau)),
      tambah(3, teks("v2", 182, 90, "400", 8.4, W.hijau)),
      tambah(5, teks("v3", 250, 90, "1", 8.4, W.hijau)),
      tambah("Jumlahnya", teks("jm", 150, 116, "500.000 + 5.000 + 400 + 1 = 505.401", 9, W.biru)),
    ),
    k(
      "Puluh ribuan dan puluhan tidak disebut, jadi diisi nol penyangga, sehingga tabelnya 5, 0, 5, 4, 0, 1.",
      tambah(0, ...tempat("tb", 18, 128)),
      tambah(12, angka("dg", 18, 128, 0, "5")),
      tambah(13, angka("dg", 18, 128, 1, "0", W.merah)),
      tambah(14, angka("dg", 18, 128, 2, "5")),
      tambah(15, angka("dg", 18, 128, 3, "4")),
      tambah(16, angka("dg", 18, 128, 4, "0", W.merah)),
      tambah(17, angka("dg", 18, 128, 5, "1")),
    ),
    k(
      "Sekarang soal e: dua ratus ribuan, tiga ribuan, tiga puluhan, dan lima satuan. Tidak ada ratusan.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Soal 4e", 12, W.ungu)),
      tambah(3, ...chip("c0", 14, 36, "2 ratus ribuan", W.mawar)),
      tambah(6, ...chip("c1", 82, 36, "3 ribuan", W.mawar)),
      tambah(8, ...chip("c2", 150, 36, "3 puluhan", W.mawar)),
      tambah(12, ...chip("c3", 218, 36, "5 satuan", W.mawar)),
    ),
    k(
      "Nilainya 200.000, 3.000, 30, dan 5. Jumlahnya 203.035, dengan nol di ratusan. Buku menulis 203.305, itu keliru.",
      tambah(1, teks("v0", 46, 90, "200.000", 8.4, W.hijau)),
      tambah(2, teks("v1", 114, 90, "3.000", 8.4, W.hijau)),
      tambah(3, teks("v2", 182, 90, "30", 8.4, W.hijau)),
      tambah(5, teks("v3", 250, 90, "5", 8.4, W.hijau)),
      tambah("Jumlahnya", teks("jm", 150, 116, "200.000 + 3.000 + 30 + 5 = 203.035", 9, W.biru)),
      tambah("Buku", teks("sl", 150, 140, "buku: 203.305 (keliru)", 10, W.merah)),
    ),
    k(
      "Jadi nol tidak boleh dilupakan, sebab nol menjaga angka lain tetap di nilai tempatnya.",
      hapus(0, "sl"),
      tambah(0, ...tempat("tb", 18, 130)),
      tambah(0, angka("dg", 18, 130, 0, "2"), angka("dg", 18, 130, 1, "0", W.merah), angka("dg", 18, 130, 2, "3"), angka("dg", 18, 130, 3, "0", W.merah), angka("dg", 18, 130, 4, "3"), angka("dg", 18, 130, 5, "5")),
    ),
  ],
};
