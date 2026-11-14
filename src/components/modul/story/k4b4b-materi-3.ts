import type { AdeganStory } from "./logika-story";
import { W, daftar, kartu, judul, kisi, kisiD, kubusDi, tabel, teks } from "./k4b4b-gambar";
import { bersih, k, tambah } from "./k4b4b-bantu";

/* ------------------------------ 11. Ayo Berlatih 2-3: hitung kubus, miskonsepsi (Buku Siswa hlm. 137; Panduan Guru hlm. 161-163) ------------------------------ */
const LABEL_E = [
  { h: "a", cx: 50, y: 76, ly: 90 },
  { h: "b", cx: 130, y: 76, ly: 90 },
  { h: "c", cx: 210, y: 76, ly: 90 },
  { h: "d", cx: 70, y: 160, ly: 176 },
  { h: "e", cx: 190, y: 160, ly: 176 },
];
const ISI_E: Record<string, string> = { a: "4", b: "5", c: "4", d: "12", e: "14" };
export const ADEGAN_KUBUS_BERLATIH: AdeganStory = {
  id: "kubus-berlatih",
  judul: "Ayo Berlatih: hitung jumlah kubus satuan",
  sumber: "Buku Siswa hlm. 137; Panduan Guru hlm. 161–163",
  latar: "#F0FDFA",
  kutipan: [
    "tentukan volume gambar berikut dengan menghitung jumlah kubus satuan:",
    "Volume bangun (a) adalah 4 cm3",
    "Volume bangun (b) adalah 5 cm3",
    "Volume bangun (c) adalah 4 cm3",
    "Volume bangun (d) adalah 12 cm3",
    "Volume bangun (e) adalah 14 cm3",
    "Diberikan volume bangun adalah 12",
    "Gambarkan bangun dengan kubus satuan!",
    "Soal nomor 3 merupakan soal open ended.",
    "Peserta didik mengukur volume benda menggunakan satuan tidak",
    "Mengukur volume benda harus menggunakan jenis satuan tidak baku yang sama dengan ukuran yang seragam.",
    "Satuan tidak baku yang digunakan harus mengisi suatu benda sampai penuh.",
    "Peserta didik belum memahami bahwa volume suatu benda harus diisi dengan satuan tidak baku sampai penuh.",
    "Metode pembelajaran yang disarankan untuk subbab volume adalah Diskusi",
    "minta mereka mengerjakan latihan tanpa bantuan",
  ],
  ketukan: [
    k(
      "Soal dua: hitung kubus satuan. Bangun a empat kubus, b lima kubus, c empat kubus, d dua belas kubus, dan e empat belas kubus sentimeter kubik.",
      bersih(0),
      tambah(0, judul("Soal 2: bangun a sampai e")),
      ...LABEL_E.map((b, i) => tambah(["empat", "lima", "empat@2", "dua@2", "belas@2"][i], ...kubusDi(`z${b.h}`, b.h, b.cx, b.y, 10), teks(`z${b.h}t`, b.cx, b.ly, `${b.h}: ${ISI_E[b.h]} cm³`, 9.2, W.biru))),
    ),
    k(
      "Bangun d memuat empat kubus kali tiga baris, jadi dua belas. Bangun e beralas dua belas kubus ditambah dua kubus di atas, jadi empat belas sentimeter kubik.",
      bersih(0),
      tambah(0, judul("Menghitung d dan e")),
      tambah("Bangun", ...kubusDi("y1", "d", 75, 100, 14)),
      tambah("beralas", ...kubusDi("y2", "e", 225, 100, 14)),
      tambah("empat", ...kartu("y3", 8, 122, 136, 34, W.krem, ["d: 4 × 3 = 12"], 10.4)),
      tambah("beralas", ...kartu("y4", 156, 122, 136, 34, W.hijauMuda, ["e: 12 + 2 = 14"], 10.4)),
    ),
    k(
      "Soal tiga: gambarlah bangun bervolume dua belas sentimeter kubik. Soal ini terbuka, jadi jawabannya banyak. Contohnya balok dua kali dua kali tiga, atau empat kali tiga kali satu.",
      bersih(0),
      tambah(0, judul("Soal 3: soal terbuka")),
      tambah("balok", ...kubusDi("x1", "dua12", 80, 112, 14)),
      tambah("empat", ...kubusDi("x2", "d", 214, 112, 14)),
      tambah("balok", ...kartu("x3", 8, 130, 136, 34, W.krem, ["2 × 2 × 3 = 12 cm³"], 9.6)),
      tambah("empat", ...kartu("x4", 156, 130, 136, 34, W.hijauMuda, ["4 × 3 × 1 = 12 cm³"], 9.6)),
    ),
    k(
      "Miskonsepsi: murid memakai satuan tidak baku yang berbeda atau dicampur. Padahal satuan harus sejenis, seragam, dan mengisi benda sampai penuh.",
      ...daftar("w", "Miskonsepsi volume", [
        { at: "berbeda", t: "satuan berbeda-beda atau dicampur", w: W.merahMuda, u: 9 },
        { at: "sejenis,", t: "benar: sejenis dan berukuran seragam", w: W.hijauMuda, u: 8.6 },
        { at: "penuh.", t: "benar: mengisi benda sampai penuh", w: W.langit, u: 8.8 },
      ]),
    ),
    k(
      "Kesulitan murid: hasil ukur berbeda, dan belum paham benda harus diisi penuh. Metode yang disarankan diskusi dan tanya jawab. Murid cepat belajar mengerjakan tanpa bantuan, guru mendampingi yang lain.",
      ...daftar("v", "Kesulitan dan diferensiasi", [
        { at: "hasil", t: "hasil ukur berbeda, belum paham penuh", w: W.merahMuda, u: 8.4 },
        { at: "diskusi", t: "metode: diskusi dan tanya jawab", w: W.krem, u: 9 },
        { at: "cepat", t: "cepat: tanpa bantuan + soal tambahan", w: W.hijauMuda, u: 8.6 },
        { at: "mendampingi", t: "guru mendampingi yang kesulitan", w: W.langit, u: 9 },
      ]),
    ),
  ],
};

/* ------------------------------ 12. Uji Kompetensi 1-3 (Buku Siswa hlm. 137-138; Panduan Guru hlm. 163-164) ------------------------------ */
export const ADEGAN_UK_1: AdeganStory = {
  id: "uk-1",
  judul: "Uji Kompetensi 1 sampai 3",
  sumber: "Buku Siswa hlm. 137–138; Panduan Guru hlm. 163–164",
  latar: "#FFF7ED",
  kutipan: [
    "Uji Kompetensi",
    "Buatlah daftar benda yang kira-kira seukuran.",
    "Kartu, penghapus, kotak isi staples",
    "Keramik, Jendela, dll",
    "Berikan contoh sesuatu yang ukurannya kira-kira:",
    "permukaan buku tulis, permukaan HP, dll",
    "Permukaan meja, permukaan lantai",
    "Hitunglah luas daerah yang dibatasi oleh masing-masing persegi",
    "Luas bangun A adalah 15 persegi satuan",
    "Luas bangun B adalah 84 persegi satuan",
    "Luas bangun C adalah 12 persegi satuan",
    "Luas bangun D adalah 95 persegi satuan",
    "Soal tipe ini merupakan open ended",
  ],
  ketukan: [
    k(
      "Uji Kompetensi, soal satu dan dua, terbuka. Seukuran lima sentimeter: kartu atau penghapus. Satu meter: keramik atau jendela. Sentimeter persegi: buku tulis. Meter persegi: permukaan meja.",
      ...daftar("u", "Soal 1 dan 2: terbuka", [
        { at: "lima", t: "5 cm: kartu, penghapus", w: W.krem, u: 9.6 },
        { at: "keramik", t: "1 m: keramik, jendela", w: W.hijauMuda, u: 9.6 },
        { at: "buku", t: "cm²: permukaan buku tulis", w: W.langit, u: 9.6 },
        { at: "meja", t: "m²: permukaan meja atau lantai", w: W.pink, u: 9.2 },
      ]),
    ),
    k(
      "Soal tiga: hitung luas persegi panjang pada kisi. Bangun A lima kotak kali tiga kotak sama dengan lima belas persegi satuan. Bangun C tiga kali empat sama dengan dua belas.",
      bersih(0),
      tambah(0, judul("Soal 3: luas pada kisi")),
      tambah("Bangun", teks("ka", 76, 40, "A", 10, W.biru), ...kisi("ka", "A", 20, 44, 14), teks("kat", 76, 142, "5 × 3 = 15", 10.4, W.hijau)),
      tambah("Bangun@2", teks("kc", 224, 40, "C", 10, W.biru), ...kisi("kc", "C", 168, 44, 14), teks("kct", 224, 160, "3 × 4 = 12", 10.4, W.hijau)),
    ),
    k(
      "Bangun B: dua belas kotak panjang kali tujuh kotak lebar sama dengan delapan puluh empat persegi satuan. Cocok dengan kunci.",
      bersih(0),
      tambah(0, judul("Bangun B")),
      tambah("Bangun", ...kisi("kb", "B", 14, 38, 9)),
      tambah("dua", ...kartu("kb1", 172, 56, 116, 30, W.krem, ["panjang 12 kotak"], 9)),
      tambah("tujuh", ...kartu("kb2", 172, 94, 116, 30, W.langit, ["lebar 7 kotak"], 9)),
      tambah("delapan", ...kartu("kb3", 172, 132, 116, 30, W.hijauMuda, ["12 × 7 = 84"], 10.4)),
    ),
    k(
      "Bangun D: kunci buku menulis sembilan puluh lima, tetapi gambarnya selebar sepuluh kotak dan setinggi lima belas kotak, jadi seratus lima puluh. Kunci ini tidak cocok.",
      bersih(0),
      tambah(0, judul("Bangun D: kunci tidak cocok", W.merah)),
      tambah("Bangun", ...kisiD("kd", 20, 36, 9)),
      tambah("kunci", ...kartu("kd1", 130, 46, 158, 30, W.merahMuda, ["kunci buku: 95"], 10)),
      tambah("sepuluh", ...kartu("kd2", 130, 86, 158, 30, W.krem, ["gambar: 10 × 15"], 10)),
      tambah("seratus", ...kartu("kd3", 130, 126, 158, 30, W.hijauMuda, ["10 × 15 = 150"], 11)),
      tambah("tidak", teks("kd4", 209, 176, "95 tidak cocok ✖", 9.6, W.merah)),
    ),
  ],
};

/* ------------------------------ 13. Uji Kompetensi 4-7 (Buku Siswa hlm. 138; Panduan Guru hlm. 165-166) ------------------------------ */
export const ADEGAN_UK_2: AdeganStory = {
  id: "uk-2",
  judul: "Uji Kompetensi 4 sampai 7",
  sumber: "Buku Siswa hlm. 138; Panduan Guru hlm. 165–166",
  latar: "#F5F3FF",
  kutipan: [
    "Konversi satuan volume berikut menjadi liter.",
    "1.500 ml = 1.000 ml + 500 ml",
    "Jadi, 1 liter 500 ml",
    "1 liter 1.450 ml",
    "= 2 liter 450 ml",
    "Olivia membeli 7 liter 500",
    "Dia mengkonsumsi 3 liter 700",
    "Jadi, banyak susu yang tersisa adalah 3 liter 800 ml",
    "7.500 ml – 3.700 ml = 3.800 ml",
    "Isi air yang dituangkan ke ember oleh Helen adalah 6.340",
    "Jadi, 6.340 ml = 6 liter 340 ml",
    "Fina membeli 3 liter 250",
    "= 9 liter 500 ml",
  ],
  ketukan: [
    k(
      "Soal empat: ubah ke liter. Seribu lima ratus mililiter menjadi satu liter lima ratus mililiter. Satu liter seribu empat ratus lima puluh mililiter menjadi dua liter empat ratus lima puluh mililiter.",
      bersih(0),
      tambah(0, judul("Soal 4: ubah ke liter")),
      tambah("Seribu", ...kartu("a1", 12, 40, 276, 34, W.krem, ["1.500 ml = 1 l 500 ml"], 11)),
      tambah("Satu@2", ...kartu("a2", 12, 90, 276, 34, W.hijauMuda, ["1 l 1.450 ml = 2 l 450 ml"], 11)),
    ),
    k(
      "Soal lima: tujuh liter lima ratus mililiter kurang tiga liter tujuh ratus mililiter. Pinjam satu liter, sisanya tiga liter delapan ratus mililiter. Lewat mililiter, tujuh ribu lima ratus kurang tiga ribu tujuh ratus sama dengan tiga ribu delapan ratus.",
      bersih(0),
      tambah(0, judul("Soal 5: sisa susu")),
      tambah("tujuh", ...kartu("b1", 12, 36, 276, 28, W.krem, ["7 l 500 ml − 3 l 700 ml"], 10.4)),
      tambah("Pinjam", ...kartu("b2", 12, 72, 276, 28, W.langit, ["6 l 1.500 ml − 3 l 700 ml = 3 l 800 ml"], 9)),
      tambah("Lewat", ...kartu("b3", 12, 108, 276, 28, W.hijauMuda, ["7.500 − 3.700 = 3.800 ml"], 10.4)),
    ),
    k(
      "Soal enam: enam ribu tiga ratus empat puluh mililiter menjadi enam liter tiga ratus empat puluh mililiter. Soal tujuh: tiga, dua, dan tiga liter berjumlah delapan, seribu lima ratus mililiter menjadi satu liter lima ratus, jadi sembilan liter lima ratus mililiter.",
      bersih(0),
      tambah(0, judul("Soal 6 dan 7")),
      tambah("Soal", ...kartu("d1", 12, 34, 276, 28, W.krem, ["6.340 ml = 6 l 340 ml"], 10.4)),
      tambah("berjumlah", ...kartu("d2", 12, 68, 276, 28, W.langit, ["3 + 2 + 3 = 8 l"], 10.4)),
      tambah("seribu", ...kartu("d3", 12, 102, 276, 28, W.hijauMuda, ["250 + 750 + 500 = 1.500 ml"], 10.4)),
      tambah("jadi", ...kartu("d4", 12, 136, 276, 34, W.pink, ["8 l + 1 l 500 ml = 9 l 500 ml"], 10.4)),
    ),
  ],
};

/* ------------------------------ 14. Pengayaan 1-2: luas (Panduan Guru hlm. 170-172) ------------------------------ */
export const ADEGAN_PENGAYAAN_LUAS: AdeganStory = {
  id: "pengayaan-luas",
  judul: "Soal pengayaan 1 dan 2: luas",
  sumber: "Panduan Guru hlm. 170–172",
  latar: "#FFFBEB",
  kutipan: [
    "Soal-soal Pengayaan",
    "Luas kebun ayah 36 m2. Kebun ditanami jagung 15 m2, ditanami ketela",
    "= 140.000 : 10.000",
    "Luas kebun yang ditanami cabe adalah 7 m2.",
    "Anti mempunyai dua lembar kertas warna",
    "0,42 m2",
    "2.300 cm2",
    "tersisa 150 cm2",
    "= 0,42 x 10.000",
    "= 4.200 cm2",
    "=6.500 cm2",
    "Luas Meja = 6.500 – 150",
    "= 6.350 cm2",
    "= 6.350 : 10.000",
    "= 0.623 m2",
  ],
  ketukan: [
    k(
      "Pengayaan satu: kebun tiga puluh enam meter persegi, jagung lima belas, ketela seratus empat puluh ribu sentimeter persegi. Seratus empat puluh ribu dibagi sepuluh ribu sama dengan empat belas meter persegi.",
      bersih(0),
      tambah(0, judul("Pengayaan 1: kebun ayah")),
      tambah("kebun", ...kartu("p1", 12, 36, 132, 28, W.krem, ["kebun 36 m²"], 10)),
      tambah("Jagung", ...kartu("p2", 156, 36, 132, 28, W.hijauMuda, ["jagung 15 m²"], 10)),
      tambah("ketela", ...kartu("p3", 12, 72, 276, 28, W.langit, ["ketela 140.000 cm²"], 10.4)),
      tambah("Seratus@2", ...kartu("p4", 12, 108, 276, 34, W.pink, ["140.000 ÷ 10.000 = 14 m²"], 11)),
    ),
    k(
      "Sisa cabe: tiga puluh enam kurang lima belas kurang empat belas sama dengan tujuh meter persegi. Kunci benar.",
      bersih(0),
      tambah(0, judul("Pengayaan 1: sisa cabe")),
      tambah("Sisa", ...kartu("q1", 12, 44, 276, 34, W.krem, ["36 − 15 − 14 = 7 m²"], 12)),
      tambah("benar", teks("q2", 150, 120, "kunci buku benar ✔", 11, W.hijau)),
    ),
    k(
      "Pengayaan dua: kertas biru nol koma empat dua meter persegi, kertas merah dua ribu tiga ratus sentimeter persegi, tersisa seratus lima puluh. Biru menjadi empat ribu dua ratus sentimeter persegi.",
      bersih(0),
      tambah(0, judul("Pengayaan 2: kertas hias")),
      tambah("biru", ...kartu("r1", 12, 36, 276, 28, W.langit, ["biru 0,42 m² = 4.200 cm²"], 10.4)),
      tambah("merah", ...kartu("r2", 12, 72, 276, 28, W.merahMuda, ["merah 2.300 cm²"], 10.4)),
      tambah("tersisa", ...kartu("r3", 12, 108, 276, 28, W.krem, ["tersisa 150 cm²"], 10.4)),
    ),
    k(
      "Seluruh kertas enam ribu lima ratus, dipakai enam ribu tiga ratus lima puluh, yaitu nol koma enam tiga lima meter persegi. Kunci buku menulis nol koma enam dua tiga, keliru.",
      bersih(0),
      tambah(0, judul("Pengayaan 2: kunci keliru", W.merah)),
      tambah("Seluruh", ...kartu("s1", 12, 34, 276, 28, W.krem, ["4.200 + 2.300 = 6.500"], 10.4)),
      tambah("dipakai", ...kartu("s2", 12, 68, 276, 28, W.langit, ["6.500 − 150 = 6.350 cm²"], 10.4)),
      tambah("nol", ...kartu("s3", 12, 102, 276, 28, W.hijauMuda, ["6.350 ÷ 10.000 = 0,635 m²"], 10.4)),
      tambah("Kunci", ...kartu("s4", 12, 138, 276, 34, W.merahMuda, ["kunci buku: 0,623 m² ✖"], 10.4)),
    ),
  ],
};

/* ------------------------------ 15. Pengayaan 3-5: volume (Panduan Guru hlm. 170-173) ------------------------------ */
export const ADEGAN_PENGAYAAN_VOLUME: AdeganStory = {
  id: "pengayaan-volume",
  judul: "Soal pengayaan 3 sampai 5: volume",
  sumber: "Panduan Guru hlm. 170–173",
  latar: "#F0FDFA",
  kutipan: [
    "Sebuah tangki air berisi 2.225 liter air.",
    "Jadi, volume sisa air di tangka adalah 1.249 liter 675 ml.",
    "Sebotol cairan antiseptik memiliki volume 500 ml.",
    "12 lusin botol = 12 x 12",
    "= 144 botol",
    "144 botol = 144 x 500",
    "= 72.000 ml",
    "= 72 liter",
    "Sebuah drum berisi 12 liter 156 ml pernis.",
    "setiap toko membutuhkan 900 ml sekali pasok.",
    "Volume drum = 12 liter 136 ml",
    "= 12.136 ml",
    "Pernis yang dibutuhkan adalah 12 x 900 ml = 11.700 ml.",
    "= 436 ml",
    "Ya , terdapat sisa pernis yaitu 436 ml.",
  ],
  ketukan: [
    k(
      "Pengayaan tiga sama dengan soal tangki tadi, hasilnya sama. Pengayaan empat: dua belas lusin botol, tiap botol lima ratus mililiter.",
      bersih(0),
      tambah(0, judul("Pengayaan 3 dan 4")),
      tambah("tangki", ...kartu("t1", 12, 38, 276, 34, W.hijauMuda, ["soal tangki: 1.249 l 675 ml ✔"], 10)),
      tambah("Pengayaan@2", ...kartu("t2", 12, 88, 276, 34, W.krem, ["12 lusin botol × 500 ml"], 10.4)),
    ),
    k(
      "Dua belas lusin sama dengan seratus empat puluh empat botol. Seratus empat puluh empat kali lima ratus sama dengan tujuh puluh dua ribu mililiter, yaitu tujuh puluh dua liter.",
      bersih(0),
      tambah(0, judul("Pengayaan 4: antiseptik")),
      tambah("Dua", ...kartu("u1", 12, 36, 276, 28, W.krem, ["12 × 12 = 144 botol"], 10.4)),
      tambah("Seratus@2", ...kartu("u2", 12, 72, 276, 28, W.langit, ["144 × 500 = 72.000 ml"], 10.4)),
      tambah("liter@2", ...kartu("u3", 12, 108, 276, 28, W.hijauMuda, ["72.000 ml = 72 l"], 10.4)),
    ),
    k(
      "Pengayaan lima: drum berisi dua belas liter seratus lima puluh enam mililiter pernis untuk dua belas toko, tiap toko sembilan ratus. Kunci memakai seratus tiga puluh enam, bukan seratus lima puluh enam.",
      bersih(0),
      tambah(0, judul("Pengayaan 5: pernis")),
      tambah("drum", ...kartu("v1", 12, 36, 276, 28, W.krem, ["soal: 12 l 156 ml = 12.156 ml"], 10)),
      tambah("toko@2", ...kartu("v2", 12, 72, 276, 28, W.langit, ["tiap toko 900 ml"], 10.4)),
      tambah("Kunci", ...kartu("v3", 12, 108, 276, 34, W.merahMuda, ["kunci memakai 12 l 136 ml ✖"], 10)),
    ),
    k(
      "Dua belas toko butuh dua belas kali sembilan ratus, yaitu sepuluh ribu delapan ratus mililiter, bukan sebelas ribu tujuh ratus. Sisa dua belas ribu seratus lima puluh enam kurang itu, seribu tiga ratus lima puluh enam, bukan empat ratus tiga puluh enam.",
      bersih(0),
      tambah(0, judul("Pengayaan 5: kunci keliru", W.merah)),
      tambah("Dua", ...kartu("w1", 12, 34, 276, 26, W.hijauMuda, ["12 × 900 = 10.800 ml"], 10.4)),
      tambah("bukan", ...kartu("w2", 12, 66, 276, 26, W.merahMuda, ["kunci buku: 11.700 ml ✖"], 10.4)),
      tambah("Sisa", ...kartu("w3", 12, 98, 276, 26, W.krem, ["12.156 − 10.800 = 1.356 ml"], 10.4)),
      tambah("bukan@2", ...kartu("w4", 12, 130, 276, 26, W.merahMuda, ["kunci buku: 436 ml ✖"], 10.4)),
      tambah("kurang", ...kartu("w5", 12, 164, 276, 26, W.langit, ["a: ya, setiap toko dapat pasokan ✔"], 9.4)),
    ),
  ],
};

/* ------------------------------ 16. Penutup bab: rubrik, nilai, refleksi, orang tua (Buku Siswa hlm. 138; Panduan Guru hlm. 166-174) ------------------------------ */
const BOBOT = [10, 10, 20, 10, 10, 20, 20];
const TABEL_BOBOT = tabel("bb", 8, 40, [52, 30, 30, 30, 30, 30, 30, 30], [["Butir", "1", "2", "3", "4", "5", "6", "7"], ["Bobot", ...BOBOT.map(String)]], 22, 9);
export const ADEGAN_PENUTUP_B: AdeganStory = {
  id: "penutup-b",
  judul: "Penilaian, refleksi, dan penutup bab",
  sumber: "Buku Siswa hlm. 138; Panduan Guru hlm. 166–174",
  latar: "#FDF4FF",
  kutipan: [
    "Tabel 4.2 Pedoman Penilaian Hasil Belajar",
    "Tabel 4.4 Penilaian pada Tahap Ayo Berlatih",
    "x 100 = ...",
    "Kalian sudah mempelajari bagaimana menentukan luas dan volume dengan",
    "Jika masih ada materi",
    "yang sulit dan belum kalian pahami, ajaklah teman kalian berdiskusi tentang",
    "Selanjutnya, manfaat apa yang kalian peroleh dari materi ini untuk",
    "Agar proses belajar selanjutnya lebih baik lagi, guru dapat melakukan refleksi",
    "Guru dapat menambahkan pertanyaan refleksi sesuai kebutuhan.",
    "Keberhasilan peserta didik dalam pendidikan tidak hanya tanggungjawab",
    "Guru setiap semester mengadakan rapat dengan orang tua peserta didik",
    "Guru dapat membuat grup komunitas untuk setiap kelas dengan para",
    "Guru menyediakan setiap minggu untuk konseling orang tua peserta didik.",
    "Guru mengadakan seminar atau layanan konsultasi tiap bulan",
  ],
  ketukan: [
    k(
      "Rubrik pengetahuan: tujuh butir berbobot sepuluh, sepuluh, dua puluh, sepuluh, sepuluh, dua puluh, dan dua puluh, jumlahnya seratus. Bobot butir lima kosong di buku, dihitung sepuluh.",
      bersih(0),
      tambah(0, judul("Rubrik pengetahuan")),
      tambah("Rubrik", ...TABEL_BOBOT),
      tambah("jumlahnya", ...kartu("rb", 12, 96, 276, 30, W.hijauMuda, ["10 + 10 + 20 + 10 + 10 + 20 + 20 = 100"], 9.2)),
      tambah("kosong", teks("rbn", 150, 150, "butir 5: bobot kosong di buku", 9, W.merah), teks("rbo", 150, 166, "dihitung 10 agar jumlahnya 100", 9, W.coklat)),
    ),
    k(
      "Urutan rubrik berbeda dari soal: butir enam soal Fina, butir tujuh soal Olivia. Butir tiga memberi skor lima bagi murid yang tidak menjawab, bukan nol.",
      ...daftar("rr", "Catatan rubrik", [
        { at: "enam", t: "butir 6 = soal 7 (Fina)", w: W.krem, u: 9.6 },
        { at: "tujuh", t: "butir 7 = soal 5 (Olivia)", w: W.langit, u: 9.6 },
        { at: "tiga", t: "butir 3: tidak menjawab = skor 5", w: W.merahMuda, u: 9 },
      ]),
    ),
    k(
      "Nilai akhir: lima kali N satu ditambah dua kali N dua ditambah tiga kali N tiga, dibagi sepuluh. Nilai keterampilan: n dibagi dua belas, dikali seratus.",
      bersih(0),
      tambah(0, judul("Rumus nilai")),
      tambah("Nilai", ...kartu("nn", 12, 44, 276, 34, W.krem, ["Np = (5 × N1 + 2 × N2 + 3 × N3) ÷ 10"], 9)),
      tambah("keterampilan:", ...kartu("nk", 12, 100, 276, 34, W.hijauMuda, ["Nk = n ÷ 12 × 100"], 11)),
    ),
    k(
      "Refleksi murid: ajak teman berdiskusi atau tanya guru bila belum paham. Refleksi guru sembilan butir. Interaksi dengan orang tua: rapat tiap semester, grup kelas, dan konseling.",
      ...daftar("rf", "Refleksi dan orang tua", [
        { at: "murid:", t: "murid: diskusi atau tanya guru", w: W.hijauMuda, u: 9.2 },
        { at: "sembilan", t: "guru: sembilan butir refleksi", w: W.langit, u: 9.4 },
        { at: "Interaksi", t: "orang tua: rapat, grup, konseling", w: W.krem, u: 9 },
      ]),
    ),
    k(
      "Jadi volume adalah banyak satuan yang mengisi benda. Satuan tidak baku memberi hasil berbeda. Satuan baku: mililiter, liter, sentimeter kubik, meter kubik.",
      ...daftar("sm", "Ringkasan Sub-Bab B", [
        { at: "volume", t: "volume = banyak satuan yang mengisi benda", w: W.hijauMuda, u: 8.6 },
        { at: "tidak", t: "satuan tidak baku: hasil berbeda", w: W.merahMuda, u: 9 },
        { at: "baku@2", t: "baku: ml, l, cm³, m³", w: W.langit, u: 9.6 },
        { at: "meter@2", t: "1 l = 1.000 ml", w: W.krem, u: 10.4 },
      ]),
    ),
  ],
};
