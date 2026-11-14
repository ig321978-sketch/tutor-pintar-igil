import type { AdeganStory } from "./logika-story";
import { W, barisUang, bingkai, emo, isiSel, judul, kartu, panah, satuUang, teks } from "./k5b1c-gambar";
import { bersih, hapus, k, tambah } from "./k5b1c-bantu";
import { G_KOMP } from "./k5b1c-materi-2";
import { CARA_KOMANG, G_CARA, LABEL_CARA } from "./k5b1c-materi-3";

/** Teks rumus di tengah kanvas. */
const rumus = (id: string, y: number, isi: string, u = 9.4, warna: string = W.coklat) => teks(id, 150, y, isi, u, warna);

/** Baris angka dan baris nilai pada tabel komposisi (G_KOMP). `angka` lima digit, `nilai` lima teks nilai. */
const barisAngka = (id: string, angka: string[]) => angka.map((a, j) => isiSel(id, G_KOMP, 0, j, a, 12));
const barisNilai = (id: string, nilai: string[]) => nilai.map((v, j) => isiSel(id, G_KOMP, 1, j, v, 8.6, W.hijau));

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk komposisi dan dekomposisi",
  sumber: "Metode luar: pembuka; angka Buku Siswa hlm. 15 sampai 17",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Bagaimana kita menyusun sebuah bilangan dari uang, atau menguraikannya kembali? Guru di berbagai negara punya cara berbeda. Di video ini ada empat metode, dengan angka dari buku.",
      tambah(0, judul("4 metode dari luar")),
      tambah("menyusun", ...kartu("p1", 30, 40, 100, 44, W.krem, ["uang", "3, 8, 6"], 10)),
      tambah("menguraikannya", panah("pa", 134, 62, 32, 0, W.merah, 2.4), ...kartu("p2", 170, 40, 100, 44, W.hijauMuda, ["bilangan", "38.600"], 10)),
      tambah("berbagai", emo("pg", 150, 148, "🌍", 38)),
    ),
    k(
      "Empat metodenya: Expanded Form, Flexible Grouping, Standard Form Return, dan Money Composition.",
      bersih(0),
      tambah(0, judul("Empat metode")),
      tambah("Expanded", ...kartu("m1", 12, 34, 276, 30, W.hijauMuda, ["1. Expanded Form"], 9.6)),
      tambah("Flexible", ...kartu("m2", 12, 72, 276, 30, W.langit, ["2. Flexible Grouping"], 9.6)),
      tambah("Standard", ...kartu("m3", 12, 110, 276, 30, W.krem, ["3. Standard Form Return"], 9.6)),
      tambah("Money", ...kartu("m4", 12, 148, 276, 30, W.pink, ["4. Money Composition"], 9.6)),
    ),
    k(
      "Semuanya memakai uang di buku: Asep, Lukas, dan Komang. Uang Asep tiga puluh delapan ribu enam ratus, uang Lukas enam puluh tiga ribu lima ratus, dan Komang membayar empat puluh lima ribu enam ratus.",
      bersih(0),
      tambah(0, judul("Angka dari buku")),
      tambah("Asep", ...kartu("b1", 16, 50, 84, 52, W.langit, ["Asep", "38.600"], 10)),
      tambah("Lukas", ...kartu("b2", 108, 50, 84, 52, W.pink, ["Lukas", "63.500"], 10)),
      tambah("Komang", ...kartu("b3", 200, 50, 84, 52, W.hijauMuda, ["Komang", "45.600"], 10)),
      tambah("membayar", teks("b4", 150, 134, "uang Asep, uang Lukas, harga Komang", 9, W.hitam)),
    ),
    k(
      "Kita mulai dari yang paling dasar: menulis bilangan sebagai jumlah nilai tiap angkanya.",
      bersih(0),
      tambah(0, judul("Mulai dari yang dasar")),
      tambah("menulis", ...kartu("d1", 40, 60, 220, 48, W.krem, ["bilangan", "= jumlah nilai tiap angka"], 10.4)),
      tambah("angkanya", emo("d2", 150, 150, "🔢", 34)),
    ),
  ],
};

/* ------------------------------ 2. Expanded Form: konsep ------------------------------ */
export const ADEGAN_LUAR_URAIAN: AdeganStory = {
  id: "luar-uraian",
  judul: "Metode luar 1: Expanded Form",
  sumber: "Metode luar: Expanded Form; angka uang Asep, Buku Siswa hlm. 15 dan 16",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Metode pertama, Expanded Form, atau bentuk uraian. Tulis bilangan sebagai jumlah nilai tiap angkanya.",
      tambah(0, judul("Expanded Form")),
      tambah("Expanded", teks("bg", 150, 98, "38.600", 34, W.hijau)),
      tambah("uraian", ...kartu("kk", 50, 122, 200, 36, W.hijauMuda, ["bentuk uraian"], 11)),
    ),
    k(
      "Ambil tiga puluh delapan ribu enam ratus, yang di buku tadi adalah uang Asep. Tiap angkanya punya tempat sendiri.",
      bersih(0),
      tambah(0, judul("Expanded Form")),
      tambah("Ambil", bingkai("ud", G_KOMP, 2, ["angka", "nilai"]), teks("hb", 150, 118, "38.600", 14, W.hijau)),
      tambah("Tiap", ...barisAngka("ud", ["3", "8", "6", "0", "0"])),
    ),
    k(
      "Angka tiga di puluh ribuan bernilai tiga puluh ribu. Angka delapan di ribuan bernilai delapan ribu. Angka enam di ratusan bernilai enam ratus.",
      tambah("bernilai", isiSel("ud", G_KOMP, 1, 0, "30.000", 8.6, W.hijau)),
      tambah("bernilai@2", isiSel("ud", G_KOMP, 1, 1, "8.000", 8.6, W.hijau)),
      tambah("bernilai@3", isiSel("ud", G_KOMP, 1, 2, "600", 8.6, W.hijau)),
    ),
    k(
      "Puluhan dan satuan nol, jadi tidak menambah nilai. Bentuk uraiannya: tiga puluh ribu tambah delapan ribu tambah enam ratus.",
      tambah("Puluhan", isiSel("ud", G_KOMP, 1, 3, "0", 8.6, W.hijau), isiSel("ud", G_KOMP, 1, 4, "0", 8.6, W.hijau)),
      tambah("uraiannya", rumus("ur", 152, "38.600 = 30.000 + 8.000 + 600", 10, W.coklat)),
    ),
    k(
      "Perhatikan, angka tiga di sini bukan sekadar tiga, melainkan tiga puluh ribu. Nilai sebuah angka bergantung pada tempatnya.",
      tambah("melainkan", teks("nl", 150, 178, "3 di puluh ribuan: 30.000", 9.4, W.merah)),
    ),
  ],
};

/* ------------------------------ 3. Expanded Form: penerapan ------------------------------ */
export const ADEGAN_LUAR_URAIAN_TERAPAN: AdeganStory = {
  id: "luar-uraian-terapan",
  judul: "Expanded Form pada uang Lukas dan harga Komang",
  sumber: "Metode luar: Expanded Form, penerapan; angka Buku Siswa hlm. 15 sampai 17",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Terapkan pada uang Lukas, enam puluh tiga ribu lima ratus. Angkanya enam, tiga, lima, nol, nol.",
      tambah(0, judul("Expanded Form: uang Lukas")),
      tambah("Terapkan", bingkai("ul", G_KOMP, 2, ["angka", "nilai"]), teks("hb", 150, 118, "63.500", 14, W.hijau)),
      tambah("Angkanya", ...barisAngka("ul", ["6", "3", "5", "0", "0"])),
    ),
    k(
      "Angka enam bernilai enam puluh ribu, angka tiga bernilai tiga ribu, dan angka lima bernilai lima ratus.",
      tambah("bernilai", isiSel("ul", G_KOMP, 1, 0, "60.000", 8.6, W.hijau)),
      tambah("bernilai@2", isiSel("ul", G_KOMP, 1, 1, "3.000", 8.6, W.hijau)),
      tambah("bernilai@3", isiSel("ul", G_KOMP, 1, 2, "500", 8.6, W.hijau), isiSel("ul", G_KOMP, 1, 3, "0", 8.6, W.hijau), isiSel("ul", G_KOMP, 1, 4, "0", 8.6, W.hijau)),
    ),
    k(
      "Bentuk uraian uang Lukas: enam puluh ribu tambah tiga ribu tambah lima ratus.",
      tambah("uraian", rumus("ur", 152, "63.500 = 60.000 + 3.000 + 500", 10, W.coklat)),
    ),
    k(
      "Sekarang harga peralatan Komang, empat puluh lima ribu enam ratus. Angkanya empat, lima, enam, nol, nol.",
      bersih(0),
      tambah(0, judul("Expanded Form: harga Komang")),
      tambah("Sekarang", bingkai("uk", G_KOMP, 2, ["angka", "nilai"]), teks("hb", 150, 118, "45.600", 14, W.hijau)),
      tambah("Angkanya", ...barisAngka("uk", ["4", "5", "6", "0", "0"])),
    ),
    k(
      "Nilainya empat puluh ribu, lima ribu, dan enam ratus. Perhatikan, angka empat, lima, enam inilah yang kita pakai pada Cara satu uang Komang.",
      tambah("Nilainya", ...barisNilai("uk", ["40.000", "5.000", "600", "0", "0"])),
      tambah("Cara", rumus("ur", 152, "45.600 = 40.000 + 5.000 + 600", 10, W.coklat)),
      tambah("satu", ...kartu("cr", 70, 164, 160, 28, W.krem, ["Cara 1: 4, 5, 6"], 9.4)),
    ),
  ],
};

/* ------------------------------ 4. Flexible Grouping: konsep ------------------------------ */
export const ADEGAN_LUAR_TUKAR: AdeganStory = {
  id: "luar-tukar",
  judul: "Metode luar 2: Flexible Grouping",
  sumber: "Metode luar: Flexible Grouping; pecahan uang Buku Siswa hlm. 15 dan 16",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Metode kedua, Flexible Grouping, atau susun ulang nilai tempat. Idenya: sepuluh di satu tempat boleh ditukar dengan satu di tempat di atasnya, atau sebaliknya.",
      tambah(0, judul("Flexible Grouping")),
      tambah("sepuluh", ...kartu("f1", 20, 56, 110, 46, W.krem, ["10 di satu", "tempat"], 10)),
      tambah("ditukar", panah("fa", 134, 79, 32, 0, W.merah, 2.4), ...kartu("f2", 170, 56, 110, 46, W.hijauMuda, ["1 di tempat", "di atasnya"], 10)),
      tambah("sebaliknya", emo("fe", 150, 150, "🔁", 32)),
    ),
    k(
      "Contoh: sepuluh keping seratusan nilainya sama dengan satu lembar seribuan.",
      bersih(0),
      tambah(0, judul("Sepuluh ratusan, satu ribuan")),
      tambah("keping", ...barisUang("fa", 14, 62, 10, "s", 17.5)),
      tambah("keping", teks("fl", 96, 92, "10 keping 100", 9, W.biru)),
      tambah("sama", panah("fp", 196, 66, 28, 0, W.merah, 2.4)),
      tambah("satu", satuUang("fb", 236, 62, "r"), teks("fm", 244, 92, "1 lembar 1.000", 8.4, W.biru)),
    ),
    k(
      "Begitu juga satu lembar sepuluh ribuan boleh ditukar dengan sepuluh lembar seribuan.",
      tambah("satu", satuUang("fc", 14, 122, "p"), teks("fn", 22, 152, "1 lembar 10.000", 8.4, W.biru, { anchor: "start" })),
      tambah("ditukar", panah("fq", 40, 126, 16, 0, W.merah, 2.4)),
      tambah("sepuluh@2", ...barisUang("fd", 66, 122, 10, "r", 17.5)),
      tambah("seribuan", teks("fo", 156, 152, "10 lembar 1.000", 8.4, W.biru, { anchor: "start" })),
    ),
    k(
      "Penukaran seperti ini yang kita pakai pada empat cara uang Komang: pindah antar tempat, tanpa mengubah jumlah uang.",
      bersih(0),
      tambah(0, judul("Menukar tidak mengubah nilai")),
      tambah("empat", ...kartu("g1", 30, 50, 240, 44, W.hijauMuda, ["4 cara uang Komang", "pindah antar tempat"], 10)),
      tambah("tanpa", ...kartu("g2", 30, 108, 240, 44, W.krem, ["jumlah uang", "tetap sama"], 10.4)),
    ),
  ],
};

/* ------------------------------ 5. Flexible Grouping: penerapan pada empat cara uang Komang ------------------------------ */
const baris = (id: string, i: number) => {
  const [p, r, s] = CARA_KOMANG[i];
  return [isiSel(id, G_CARA, i, 0, String(p)), isiSel(id, G_CARA, i, 1, String(r)), isiSel(id, G_CARA, i, 2, String(s)), isiSel(id, G_CARA, i, 3, "0"), isiSel(id, G_CARA, i, 4, "0")];
};

export const ADEGAN_LUAR_TUKAR_TERAPAN: AdeganStory = {
  id: "luar-tukar-terapan",
  judul: "Flexible Grouping pada empat cara uang Komang",
  sumber: "Metode luar: Flexible Grouping, penerapan; angka Buku Siswa hlm. 16 dan 17",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Mulai dari Cara satu: empat lembar sepuluh ribuan, lima lembar seribuan, enam keping seratusan. Jumlahnya empat puluh lima ribu enam ratus.",
      tambah(0, judul("Menukar dari Cara 1")),
      tambah("Mulai", bingkai("tt", G_CARA, 4, LABEL_CARA)),
      tambah("empat", ...baris("tt", 0)),
      tambah("Jumlahnya", rumus("nt", 150, "pecahan 10.000, 1.000, 100: jumlah 45.600", 9, W.coklat)),
    ),
    k(
      "Tukar satu lembar seribuan menjadi sepuluh keping seratusan. Seribuan tinggal empat, seratusan menjadi enam belas.",
      tambah("Tukar", ...baris("tt", 1)),
      tambah("Tukar", rumus("nu", 168, "1 ribuan jadi 10 ratusan: ratusan 6 jadi 16", 8.6, W.merah)),
    ),
    k(
      "Kembali ke Cara satu, tukar satu lembar sepuluh ribuan menjadi sepuluh lembar seribuan. Puluh ribuan tinggal tiga, seribuan menjadi lima belas.",
      tambah("Kembali", ...baris("tt", 2)),
      tambah("Kembali", { id: "nu", t: "teks", x: 150, y: 168, isi: "1 puluh ribuan jadi 10 ribuan: ribuan 5 jadi 15", u: 8.6, warna: W.merah }),
    ),
    k(
      "Dari Cara tiga, tukar lagi satu lembar seribuan menjadi sepuluh keping seratusan: tiga, empat belas, enam belas. Itu Cara empat.",
      tambah("Dari", ...baris("tt", 3)),
      tambah("Dari", { id: "nu", t: "teks", x: 150, y: 168, isi: "1 ribuan jadi 10 ratusan: ribuan 14, ratusan 16", u: 8.6, warna: W.merah }),
    ),
    k(
      "Keempat susunan berbeda, tetapi jumlah uang tetap empat puluh lima ribu enam ratus. Menukar tidak mengubah nilai.",
      hapus("Keempat", "nu"),
      tambah("tetap", ...kartu("zz", 40, 156, 220, 34, W.hijauMuda, ["semua tetap 45.600"], 11)),
    ),
  ],
};
