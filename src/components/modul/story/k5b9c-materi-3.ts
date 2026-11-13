import type { AdeganStory } from "./logika-story";
import { W, angka, emo, kartu, idAngka, tempat, teks } from "./k5b9c-gambar";
import { bersih, hapus, k, tambah } from "./k5b9c-bantu";

/* ------------------------------ 8. Uji Kompetensi nomor 1 sampai 3 (hlm. 291; kunci Buku Panduan Guru hlm. 410) ------------------------------ */
const TX = 18;
const TY = 60;
/** Dua baris pernyataan soal di atas tabel. */
const soal = (a: string, b?: string) => [teks("st0", 150, 38, a, 8.4, W.biru), ...(b ? [teks("st1", 150, 50, b, 8.4, W.biru)] : [])];

export const ADEGAN_UJI_ANGKA: AdeganStory = {
  id: "uji-angka",
  judul: "Uji Kompetensi nomor 1 sampai 3: menulis, membaca, dan menyusun bilangan",
  sumber: "Buku Siswa hlm. 291; Buku Panduan Guru hlm. 410",
  latar: "#FFF7ED",
  kutipan: [
    "Nyatakan bilangan berikut dalam bentuk angka",
    "Lima ratus lima puluh ribu tiga ratus tiga",
    "Sembilan ratus ribu tiga puluh tiga ribu empat ratus tiga",
    "Bacalah bilangan berikut",
    "Jumlah penduduk Kabupaten Sumba Barat tahun 2021",
    "Ibu membeli rak mainan seharga Rp345.675,00",
    "Tuliskan bilangan berikut dalam bentuk angka, kemudian",
    "Bilangan yang merupakan jumlah dari 3 ratus ribuan, 2 puluh",
  ],
  ketukan: [
    k(
      "Uji Kompetensi nomor satu a: lima ratus lima puluh ribu tiga ratus tiga. Kolom ribuan dan puluhan tidak disebut, jadi diisi nol. Hasilnya 550.303.",
      tambah(0, teks("jud", 150, 18, "Uji Kompetensi 1a: tulis dengan angka", 11, W.ungu), ...soal("lima ratus lima puluh ribu tiga ratus tiga"), ...tempat("tb", TX, TY)),
      tambah(5, angka("dg", TX, TY, 0, "5")),
      tambah(7, angka("dg", TX, TY, 1, "5")),
      tambah(10, angka("dg", TX, TY, 3, "3")),
      tambah(12, angka("dg", TX, TY, 5, "3")),
      tambah(21, angka("dg", TX, TY, 2, "0", W.merah), angka("dg", TX, TY, 4, "0", W.merah)),
      tambah(22, teks("hs", 150, 140, "550.303", 26, W.hijau)),
    ),
    k(
      "Nomor satu b: sembilan ratus ribu tiga puluh tiga ribu empat ratus tiga. Sembilan ratus ribu ditambah 33.000 ditambah 403 sama dengan 933.403.",
      hapus(0, "st0", ...idAngka("dg"), "hs"),
      tambah(0, ...soal("sembilan ratus ribu tiga puluh tiga ribu", "empat ratus tiga")),
      tambah(3, angka("dg", TX, TY, 0, "9")),
      tambah(6, angka("dg", TX, TY, 1, "3")),
      tambah(8, angka("dg", TX, TY, 2, "3")),
      tambah(10, angka("dg", TX, TY, 3, "4")),
      tambah(12, angka("dg", TX, TY, 4, "0", W.merah), angka("dg", TX, TY, 5, "3")),
      tambah(13, teks("hs", 150, 140, "900.000 + 33.000 + 403 = 933.403", 11, W.hijau)),
    ),
    k(
      "Nomor dua minta kita membaca. 149.641 dibaca seratus empat puluh sembilan ribu enam ratus empat puluh satu. Harga rak 345.675 rupiah dibaca tiga ratus empat puluh lima ribu enam ratus tujuh puluh lima.",
      bersih(0),
      tambah(0, teks("jud", 150, 18, "Uji Kompetensi 2: bacalah", 11, W.ungu)),
      tambah(4, ...kartu("b1", 14, 34, 272, 58, W.mint, [], 10), teks("n1", 62, 68, "149.641", 15, W.ungu), teks("r1a", 200, 60, "seratus empat puluh sembilan ribu", 7, W.biru), teks("r1b", 200, 74, "enam ratus empat puluh satu", 7, W.biru)),
      tambah(17, ...kartu("b2", 14, 104, 272, 58, W.langit, [], 10), teks("n2", 62, 138, "345.675", 15, W.ungu), teks("r2a", 200, 130, "tiga ratus empat puluh lima ribu", 7, W.biru), teks("r2b", 200, 144, "enam ratus tujuh puluh lima", 7, W.biru)),
      tambah(31, teks("rk", 150, 190, "harga rak mainan: rupiah", 8.4, W.coklat)),
    ),
    k(
      "Nomor tiga a: tiga ratus ribuan, dua puluh ribuan, tujuh ribuan, dan satu ratusan. Puluhan dan satuan tidak disebut, jadi nol. Hasilnya 327.100.",
      bersih(0),
      tambah(0, teks("jud", 150, 18, "Uji Kompetensi 3a: susun bilangan", 11, W.ungu), ...soal("3 ratus ribuan + 2 puluh ribuan + 7 ribuan + 1 ratusan"), ...tempat("tb", TX, TY)),
      tambah(3, angka("dg", TX, TY, 0, "3")),
      tambah(6, angka("dg", TX, TY, 1, "2")),
      tambah(9, angka("dg", TX, TY, 2, "7")),
      tambah(12, angka("dg", TX, TY, 3, "1")),
      tambah(20, angka("dg", TX, TY, 4, "0", W.merah), angka("dg", TX, TY, 5, "0", W.merah)),
      tambah(21, teks("hs", 150, 138, "327.100", 26, W.hijau), teks("bc", 150, 162, "tiga ratus dua puluh tujuh ribu seratus", 8.4, W.biru)),
    ),
    k(
      "Nomor tiga b: lima ratus ribuan, lima ribuan, empat ratusan, dan satu satuan. Puluh ribuan dan puluhan kosong, jadi nol. Hasilnya 505.401.",
      hapus(0, "st0", ...idAngka("dg"), "hs", "bc"),
      tambah(0, ...soal("5 ratus ribuan + 5 ribuan + 4 ratusan + 1 satuan")),
      tambah(3, angka("dg", TX, TY, 0, "5")),
      tambah(6, angka("dg", TX, TY, 2, "5")),
      tambah(8, angka("dg", TX, TY, 3, "4")),
      tambah(11, angka("dg", TX, TY, 5, "1")),
      tambah(19, angka("dg", TX, TY, 1, "0", W.merah), angka("dg", TX, TY, 4, "0", W.merah)),
      tambah(20, teks("hs", 150, 138, "505.401", 26, W.hijau), teks("bc", 150, 162, "lima ratus lima ribu empat ratus satu", 8.4, W.biru)),
    ),
    k(
      "Nomor tiga c: delapan ratus ribuan, lima puluh ribuan, tujuh ribuan, dua ratusan, lima puluhan, dan sembilan satuan. Hasilnya 857.259, dibaca delapan ratus lima puluh tujuh ribu dua ratus lima puluh sembilan.",
      hapus(0, "st0", ...idAngka("dg"), "hs", "bc"),
      tambah(0, ...soal("8 ratus ribuan + 5 puluh ribuan + 7 ribuan", "+ 2 ratusan + 5 puluhan + 9 satuan")),
      tambah(3, angka("dg", TX, TY, 0, "8")),
      tambah(6, angka("dg", TX, TY, 1, "5")),
      tambah(9, angka("dg", TX, TY, 2, "7")),
      tambah(11, angka("dg", TX, TY, 3, "2")),
      tambah(13, angka("dg", TX, TY, 4, "5")),
      tambah(16, angka("dg", TX, TY, 5, "9")),
      tambah(18, teks("hs", 150, 138, "857.259", 26, W.hijau)),
      tambah(20, teks("bc", 150, 162, "delapan ratus lima puluh tujuh ribu dua ratus lima puluh sembilan", 7, W.biru)),
    ),
  ],
};

/* ------------------------------ 9. Uji Kompetensi nomor 4: benar atau salah (hlm. 291 dan 292) ------------------------------ */
const PERNYATAAN = [
  "a. 275.000 lebih banyak dari 256.000",
  "b. Urut naik: 676.785, 786.897, 789.876, 789.867",
  "c. 900.025 lebih kecil dari 900.052",
  "d. 678.987 punya komposisi dengan 8 ratusan",
  "e. 2 ratus ribuan, 3 ribuan, 3 puluhan, 5 satuan = 203.305",
];
const daftar = () => PERNYATAAN.map((p, i) => teks(`p${i}`, 8, 40 + i * 14, p, 7, W.biru, { anchor: "start" }));
const tag = (i: number, benar: boolean) => teks(`t${i}`, 292, 40 + i * 14, benar ? "Benar" : "Salah", 8, benar ? W.hijau : W.merah, { anchor: "end" });

export const ADEGAN_UJI_PERNYATAAN: AdeganStory = {
  id: "uji-pernyataan",
  judul: "Uji Kompetensi nomor 4: benar atau salah",
  sumber: "Buku Siswa hlm. 291–292; Buku Panduan Guru hlm. 410",
  latar: "#FDF2F8",
  kutipan: [
    "Pilihlah pernyataan berikut yang benar dan salah sesuai dengan",
    "Dua ratus tujuh puluh lima ribu lebih banyak",
    "Urutan bilangan dari yang terkecil ke yang",
    "Sembilan ratus ribu dua puluh lima lebih kecil",
    "Jika kita mempunyai 2 ratus ribuan",
  ],
  ketukan: [
    k(
      "Nomor empat a: 275.000 dibandingkan 256.000. Ratus ribuan sama-sama 2, puluh ribuan 7 lawan 5. Jadi pernyataan benar.",
      tambah(0, teks("jud", 150, 20, "Uji Kompetensi 4: benar atau salah?", 11, W.ungu), ...daftar()),
      tambah(8, teks("d1", 150, 126, "ratus ribuan: 2 dan 2, sama", 9, W.biru)),
      tambah(12, teks("d2", 150, 142, "puluh ribuan: 7 lawan 5", 9, W.merah)),
      tambah(15, teks("d3", 150, 164, "275.000 lebih besar dari 256.000", 9.4, W.hijau)),
      tambah("benar.", tag(0, true)),
    ),
    k(
      "Nomor empat b: urutannya 676.785, 786.897, 789.876, 789.867. Dua bilangan terakhir salah urut, karena 789.876 lebih besar dari 789.867. Pernyataan salah.",
      hapus(0, "d1", "d2", "d3"),
      tambah("urutannya", teks("d4", 150, 126, "789.876 dan 789.867", 11, W.biru)),
      tambah("karena", teks("d5", 150, 144, "ratusan sama 8, puluhan 7 lawan 6", 9, W.merah)),
      tambah("Pernyataan", teks("d6", 150, 168, "789.876 lebih besar, bukan lebih kecil", 9.4, W.hijau), tag(1, false)),
    ),
    k(
      "Nomor empat c: 900.025 dibandingkan 900.052. Ribuan dan ratusan sama, puluhan 2 lawan 5. Jadi 900.025 lebih kecil dan pernyataan di Buku Siswa benar.",
      hapus(0, "d4", "d5", "d6"),
      tambah(10, teks("d1", 150, 126, "puluhan: 2 lawan 5", 10, W.merah)),
      tambah(14, teks("d2", 150, 146, "900.025 lebih kecil dari 900.052", 9.4, W.hijau)),
      tambah("benar.", tag(2, true)),
    ),
    k(
      "Kunci Buku Panduan Guru menandai salah, karena kalimatnya berbunyi lebih besar, berbeda dari Buku Siswa. Kita ikuti kalimat di Buku Siswa.",
      hapus(0, "d1", "d2"),
      tambah("Kunci", ...kartu("bg", 14, 112, 128, 54, W.langit, ["Buku Panduan Guru", "lebih besar: Salah"], 8)),
      tambah("Siswa.", ...kartu("bs", 158, 112, 128, 54, W.mint, ["Buku Siswa", "lebih kecil: Benar"], 8)),
    ),
    k(
      "Nomor empat d: 678.987 disebut punya delapan ratusan. Padahal angka ratusannya sembilan, jadi pernyataan salah.",
      hapus(0, "bg-k", "bg-t0", "bg-t1", "bs-k", "bs-t0", "bs-t1"),
      tambah(0, teks("d1", 150, 108, "678.987", 11, W.ungu), ...tempat("td", 18, 114)),
      tambah(2, ...["6", "7", "8", "9", "8", "7"].map((d, c) => angka("dd", 18, 114, c, d, c === 3 ? W.merah : W.biru))),
      tambah("Padahal", teks("d2", 150, 178, "ratusan: 9, bukan 8", 10, W.merah)),
      tambah("pernyataan", tag(3, false)),
    ),
    k(
      "Nomor empat e: dua ratus ribuan, tiga ribuan, tiga puluhan, dan lima satuan. Tidak ada ratusan, jadi bilangannya 203.035, bukan 203.305. Pernyataan salah.",
      hapus(0, "d1", "d2", ...idAngka("dd")),
      tambah(0, teks("d1", 150, 108, "203.035, bukan 203.305", 11, W.ungu)),
      tambah(3, angka("dd", 18, 114, 0, "2")),
      tambah(6, angka("dd", 18, 114, 2, "3")),
      tambah(8, angka("dd", 18, 114, 4, "3")),
      tambah(11, angka("dd", 18, 114, 5, "5")),
      tambah(15, angka("dd", 18, 114, 1, "0", W.merah), angka("dd", 18, 114, 3, "0", W.merah)),
      tambah("Pernyataan", teks("d2", 150, 178, "tidak ada ratusan: nol", 10, W.merah), tag(4, false)),
    ),
    k(
      "Rekap nomor empat: a benar, b salah, c benar, d salah, dan e salah.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Rekap nomor 4", 13, W.ungu), ...daftar(), tag(0, true), tag(1, false), tag(2, true), tag(3, false), tag(4, false)),
      tambah("benar,", teks("rk", 150, 150, "a benar, b salah, c benar, d salah, e salah", 10, W.hijau)),
    ),
  ],
};

/* ------------------------------ 10. Uji Kompetensi nomor 5 dan pengayaan (hlm. 292; Buku Panduan Guru hlm. 411 dan 415) ------------------------------ */
export const ADEGAN_UJI_PASANG: AdeganStory = {
  id: "uji-pasang",
  judul: "Uji Kompetensi nomor 5 dan pengayaan",
  sumber: "Buku Siswa hlm. 292; Buku Panduan Guru hlm. 411 dan 415",
  latar: "#F0FDF4",
  kutipan: [
    "Pasangkan Bagian A dengan Bagian B secara tepat",
    "Ibu akan membeli seragam sekolah",
    "Nisa mempunyai uang Rp250.000,00",
    "Kelompok Komang berhasil mengumpulkan",
    "Komang mempunyai uang lima ratus",
  ],
  ketukan: [
    k(
      "Nomor lima menjodohkan soal dengan jawaban. Ibu membeli seragam seharga 450.000 dan punya empat lembar seratus ribuan, empat lembar sepuluh ribuan, dan tiga lembar seribuan.",
      tambah(0, teks("jud", 150, 22, "Uji Kompetensi 5: jodohkan", 12, W.ungu)),
      tambah("seragam", ...kartu("sr", 60, 34, 180, 30, W.krem, ["seragam: 450.000 rupiah"], 10)),
      tambah("seratus", teks("q1", 150, 92, "4 x 100.000 = 400.000", 10)),
      tambah("sepuluh", teks("q2", 150, 112, "4 x 10.000 = 40.000", 10)),
      tambah("seribuan.", teks("q3", 150, 132, "3 x 1.000 = 3.000", 10)),
    ),
    k(
      "Uang Ibu 400.000 ditambah 40.000 ditambah 3.000, yaitu 443.000. Kurangnya 450.000 kurang 443.000, yaitu 7.000. Jodohkan dengan jawaban 7.000 rupiah.",
      tambah("Uang", teks("q4", 150, 158, "400.000 + 40.000 + 3.000 = 443.000", 10, W.hijau)),
      tambah("Kurangnya", teks("q5", 150, 178, "450.000 - 443.000 = 7.000", 10, W.merah)),
    ),
    k(
      "Nisa punya 250.000 dan menerima kembalian 15.400. Harga buku adalah 250.000 kurang 15.400, yaitu 234.600.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Uang Nisa dan harga buku", 12, W.ungu)),
      tambah("Nisa", ...kartu("ns", 40, 40, 220, 34, W.mint, ["uang 250.000, kembalian 15.400"], 10)),
      tambah("Harga", teks("q6", 150, 110, "250.000 - 15.400 = 234.600", 13, W.hijau)),
    ),
    k(
      "Kelompok Yohana mengumpulkan 345.600 dan kelompok Komang 354.500. Dana yang lebih banyak adalah 354.500: bandingkan dari kiri, puluh ribuan 4 lawan 5.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Dana dua kelompok", 12, W.ungu)),
      tambah("Yohana", ...kartu("yh", 20, 38, 120, 44, W.mawar, ["Yohana", "345.600"], 11)),
      tambah("Komang", ...kartu("km", 160, 38, 120, 44, W.mint, ["Komang", "354.500"], 11)),
      tambah("bandingkan", teks("q7", 150, 112, "puluh ribuan: 4 lawan 5", 11, W.biru)),
      tambah(13, emo("pk", 220, 150, "👑", 26), teks("q8", 150, 184, "354.500 lebih banyak", 11, W.hijau)),
    ),
    k(
      "Selisih keduanya 8.900 tidak ada di pilihan jawaban, jadi yang dimaksud soal adalah dana terbanyak, yaitu 354.500.",
      hapus(0, "q7", "pk", "q8"),
      tambah(0, teks("q9", 150, 120, "354.500 - 345.600 = 8.900", 12, W.merah), teks("q10", 150, 150, "pilihan jawaban: 354.500", 11, W.hijau)),
    ),
    k(
      "Soal keempat: lima ratus enam puluh tujuh ribu rupiah ditulis 567.000.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Menulis dengan angka", 12, W.ungu), ...tempat("tb", 18, 50)),
      tambah(2, ...["5", "6", "7", "0", "0", "0"].map((d, c) => angka("dg", 18, 50, c, d))),
      tambah("ditulis", teks("q11", 150, 134, "567.000", 26, W.hijau)),
    ),
    k(
      "Penutup bab. Buku Panduan Guru memberi pengayaan: wawancarai orang tua tentang belanja sehari-hari, apakah lebih dari 1.000.000, dan apakah pemasukan cukup. Kuncinya tabel kosong yang diisi data keluarga.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Pengayaan", 13, W.ungu)),
      tambah("wawancarai", ...kartu("w1", 20, 40, 260, 34, W.langit, ["wawancara orang tua tentang belanja"], 9)),
      tambah("1.000.000,", ...kartu("w2", 20, 82, 260, 34, W.krem, ["apakah belanja lebih dari 1.000.000?"], 9)),
      tambah("pemasukan", ...kartu("w3", 20, 124, 260, 34, W.mint, ["apakah pemasukan cukup?"], 9)),
      tambah("Kuncinya", teks("w4", 150, 184, "kunci: tabel barang dan harga", 9, W.coklat)),
    ),
  ],
};
