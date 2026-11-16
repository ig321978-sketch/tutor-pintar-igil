import type { AdeganStory } from "./logika-story";
import { W, daftar, kartu, judul, kisi, kisiD, kubusDi, tabel, teks } from "./k4b4b-gambar";
import { bersih, k, tambah } from "./k4b4b-bantu";
import { kutipanLokal } from "./kutipan-lokal";

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
  judul: "Latihan: hitung jumlah kubus satuan",
  sumber: "Materi: menghitung kubus satuan",
  latar: "#F0FDFA",
  kutipan: kutipanLokal("k4b4b-materi-3.ts:1"),
  ketukan: [
    k(
      "Hitung kubus satuan. Bangun a empat kubus, b lima kubus, c empat kubus, d dua belas kubus, dan e empat belas kubus sentimeter kubik.",
      bersih(0),
      tambah(0, judul("Latihan 2: bangun a sampai e")),
      ...LABEL_E.map((b, i) => tambah(["empat", "lima", "empat@2", "dua", "belas@2"][i], ...kubusDi(`z${b.h}`, b.h, b.cx, b.y, 10), teks(`z${b.h}t`, b.cx, b.ly, `${b.h}: ${ISI_E[b.h]} cm³`, 9.2, W.biru))),
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
      "Latihan tiga: gambarlah bangun bervolume dua belas sentimeter kubik. Latihan ini terbuka, jadi jawabannya banyak. Contohnya balok dua kali dua kali tiga, atau empat kali tiga kali satu.",
      bersih(0),
      tambah(0, judul("Latihan 3: terbuka")),
      tambah("balok", ...kubusDi("x1", "dua12", 80, 112, 14)),
      tambah("empat", ...kubusDi("x2", "d", 214, 112, 14)),
      tambah("balok", ...kartu("x3", 8, 130, 136, 34, W.krem, ["2 × 2 × 3 = 12 cm³"], 9.6)),
      tambah("empat", ...kartu("x4", 156, 130, 136, 34, W.hijauMuda, ["4 × 3 × 1 = 12 cm³"], 9.6)),
    ),
    k(
      "Hati-hati, kesalahan yang sering terjadi: memakai satuan tidak baku yang berbeda atau dicampur. Padahal satuan harus sejenis, seragam, dan mengisi benda sampai penuh.",
      ...daftar("w", "Hati-hati: volume", [
        { at: "berbeda", t: "satuan berbeda-beda atau dicampur", w: W.merahMuda, u: 9 },
        { at: "sejenis,", t: "benar: sejenis dan berukuran seragam", w: W.hijauMuda, u: 8.6 },
        { at: "penuh.", t: "benar: mengisi benda sampai penuh", w: W.langit, u: 8.8 },
      ]),
    ),
    k(
      "Kalau hasil ukur kalian berbeda, ingat benda harus diisi penuh. Mari kita diskusi dan tanya jawab. Yang sudah cepat, kerjakan tanpa bantuan, guru mendampingi yang masih kesulitan.",
      ...daftar("v", "Tips belajar volume", [
        { at: "hasil", t: "hasil berbeda: isi sampai penuh", w: W.merahMuda, u: 8.8 },
        { at: "diskusi", t: "mari diskusi dan tanya jawab", w: W.krem, u: 9 },
        { at: "cepat", t: "cepat: tantangan tanpa bantuan", w: W.hijauMuda, u: 8.8 },
        { at: "mendampingi", t: "guru mendampingi yang kesulitan", w: W.langit, u: 9 },
      ]),
    ),
  ],
};

/* ------------------------------ 12. Uji Kompetensi 1-3 (Buku Siswa hlm. 137-138; Panduan Guru hlm. 163-164) ------------------------------ */
export const ADEGAN_UK_1: AdeganStory = {
  id: "uk-1",
  judul: "Uji 1 sampai 3",
  sumber: "Materi: ukuran dan luas pada kisi",
  latar: "#FFF7ED",
  kutipan: kutipanLokal("k4b4b-materi-3.ts:2"),
  ketukan: [
    k(
      "Uji satu dan dua terbuka, jawabannya boleh bermacam-macam. Seukuran lima sentimeter: kartu atau penghapus. Satu meter: keramik atau jendela. Sentimeter persegi: layar HP. Meter persegi: permukaan meja.",
      ...daftar("u", "Uji 1 dan 2: terbuka", [
        { at: "lima", t: "5 cm: kartu, penghapus", w: W.krem, u: 9.6 },
        { at: "keramik", t: "1 m: keramik, jendela", w: W.hijauMuda, u: 9.6 },
        { at: "layar", t: "cm²: permukaan layar HP", w: W.langit, u: 9.6 },
        { at: "meja", t: "m²: permukaan meja atau lantai", w: W.pink, u: 9.2 },
      ]),
    ),
    k(
      "Uji tiga: hitung luas persegi panjang pada kisi. Bangun A lima kotak kali tiga kotak sama dengan lima belas persegi satuan. Bangun C tiga kali empat sama dengan dua belas.",
      bersih(0),
      tambah(0, judul("Uji 3: luas pada kisi")),
      tambah("Bangun", teks("ka", 76, 40, "A", 10, W.biru), ...kisi("ka", "A", 20, 44, 14), teks("kat", 76, 142, "5 × 3 = 15", 10.4, W.hijau)),
      tambah("Bangun@2", teks("kc", 224, 40, "C", 10, W.biru), ...kisi("kc", "C", 168, 44, 14), teks("kct", 224, 160, "3 × 4 = 12", 10.4, W.hijau)),
    ),
    k(
      "Bangun B: dua belas kotak panjang kali tujuh kotak lebar sama dengan delapan puluh empat persegi satuan.",
      bersih(0),
      tambah(0, judul("Bangun B")),
      tambah("Bangun", ...kisi("kb", "B", 14, 38, 9)),
      tambah("dua", ...kartu("kb1", 172, 56, 116, 30, W.krem, ["panjang 12 kotak"], 9)),
      tambah("tujuh", ...kartu("kb2", 172, 94, 116, 30, W.langit, ["lebar 7 kotak"], 9)),
      tambah("delapan", ...kartu("kb3", 172, 132, 116, 30, W.hijauMuda, ["12 × 7 = 84"], 10.4)),
    ),
    k(
      "Bangun D: gambarnya selebar sepuluh kotak dan setinggi lima belas kotak, jadi luasnya sepuluh kali lima belas sama dengan seratus lima puluh persegi satuan.",
      bersih(0),
      tambah(0, judul("Bangun D: hitung luasnya")),
      tambah("Bangun", ...kisiD("kd", 20, 36, 9)),
      tambah("selebar", ...kartu("kd1", 130, 46, 158, 30, W.krem, ["lebar: 10 kotak"], 10)),
      tambah("setinggi", ...kartu("kd2", 130, 86, 158, 30, W.langit, ["tinggi: 15 kotak"], 10)),
      tambah("seratus", ...kartu("kd3", 130, 126, 158, 30, W.hijauMuda, ["10 × 15 = 150"], 11)),
    ),
  ],
};

/* ------------------------------ 13. Uji Kompetensi 4-7 (Buku Siswa hlm. 138; Panduan Guru hlm. 165-166) ------------------------------ */
export const ADEGAN_UK_2: AdeganStory = {
  id: "uk-2",
  judul: "Uji 4 sampai 7",
  sumber: "Materi: konversi dan hitungan volume",
  latar: "#F5F3FF",
  kutipan: kutipanLokal("k4b4b-materi-3.ts:3"),
  ketukan: [
    k(
      "Uji empat: ubah ke liter. Seribu lima ratus mililiter menjadi satu liter lima ratus mililiter. Satu liter seribu empat ratus lima puluh mililiter menjadi dua liter empat ratus lima puluh mililiter.",
      bersih(0),
      tambah(0, judul("Uji 4: ubah ke liter")),
      tambah("Seribu", ...kartu("a1", 12, 40, 276, 34, W.krem, ["1.500 ml = 1 l 500 ml"], 11)),
      tambah("Satu@2", ...kartu("a2", 12, 90, 276, 34, W.hijauMuda, ["1 l 1.450 ml = 2 l 450 ml"], 11)),
    ),
    k(
      "Uji lima: tujuh liter lima ratus mililiter kurang tiga liter tujuh ratus mililiter. Pinjam satu liter, sisanya tiga liter delapan ratus mililiter. Lewat mililiter, tujuh ribu lima ratus kurang tiga ribu tujuh ratus sama dengan tiga ribu delapan ratus.",
      bersih(0),
      tambah(0, judul("Uji 5: sisa susu")),
      tambah("tujuh", ...kartu("b1", 12, 36, 276, 28, W.krem, ["7 l 500 ml − 3 l 700 ml"], 10.4)),
      tambah("Pinjam", ...kartu("b2", 12, 72, 276, 28, W.langit, ["6 l 1.500 ml − 3 l 700 ml = 3 l 800 ml"], 9)),
      tambah("Lewat", ...kartu("b3", 12, 108, 276, 28, W.hijauMuda, ["7.500 − 3.700 = 3.800 ml"], 10.4)),
    ),
    k(
      "Uji enam: enam ribu tiga ratus empat puluh mililiter menjadi enam liter tiga ratus empat puluh mililiter. Uji tujuh: tiga, dua, dan tiga liter berjumlah delapan, seribu lima ratus mililiter menjadi satu liter lima ratus, jadi sembilan liter lima ratus mililiter.",
      bersih(0),
      tambah(0, judul("Uji 6 dan 7")),
      tambah("Uji", ...kartu("d1", 12, 34, 276, 28, W.krem, ["6.340 ml = 6 l 340 ml"], 10.4)),
      tambah("berjumlah", ...kartu("d2", 12, 68, 276, 28, W.langit, ["3 + 2 + 3 = 8 l"], 10.4)),
      tambah("seribu", ...kartu("d3", 12, 102, 276, 28, W.hijauMuda, ["250 + 750 + 500 = 1.500 ml"], 10.4)),
      tambah("jadi", ...kartu("d4", 12, 136, 276, 34, W.pink, ["8 l + 1 l 500 ml = 9 l 500 ml"], 10.4)),
    ),
  ],
};

/* ------------------------------ 14. Pengayaan 1-2: luas (Panduan Guru hlm. 170-172) ------------------------------ */
export const ADEGAN_PENGAYAAN_LUAS: AdeganStory = {
  id: "pengayaan-luas",
  judul: "Tantangan 1 dan 2: luas",
  sumber: "Materi: luas dan satuan luas",
  latar: "#FFFBEB",
  kutipan: kutipanLokal("k4b4b-materi-3.ts:4"),
  ketukan: [
    k(
      "Tantangan satu: kebun tiga puluh enam meter persegi, jagung lima belas, ketela seratus empat puluh ribu sentimeter persegi. Seratus empat puluh ribu dibagi sepuluh ribu sama dengan empat belas meter persegi.",
      bersih(0),
      tambah(0, judul("Tantangan 1: kebun ayah")),
      tambah("kebun", ...kartu("p1", 12, 36, 132, 28, W.krem, ["kebun 36 m²"], 10)),
      tambah("Jagung", ...kartu("p2", 156, 36, 132, 28, W.hijauMuda, ["jagung 15 m²"], 10)),
      tambah("ketela", ...kartu("p3", 12, 72, 276, 28, W.langit, ["ketela 140.000 cm²"], 10.4)),
      tambah("Seratus@2", ...kartu("p4", 12, 108, 276, 34, W.pink, ["140.000 ÷ 10.000 = 14 m²"], 11)),
    ),
    k(
      "Sisa kebun ditanami cabe: tiga puluh enam kurang lima belas kurang empat belas sama dengan tujuh meter persegi.",
      bersih(0),
      tambah(0, judul("Tantangan 1: sisa cabe")),
      tambah("Sisa", ...kartu("q1", 12, 44, 276, 34, W.krem, ["36 − 15 − 14 = 7 m²"], 12)),
      tambah("tujuh", teks("q2", 150, 120, "sisa untuk cabe: 7 m² ✔", 11, W.hijau)),
    ),
    k(
      "Tantangan dua: kertas biru nol koma empat dua meter persegi, kertas merah dua ribu tiga ratus sentimeter persegi, tersisa seratus lima puluh. Biru menjadi empat ribu dua ratus sentimeter persegi.",
      bersih(0),
      tambah(0, judul("Tantangan 2: kertas hias")),
      tambah("biru", ...kartu("r1", 12, 36, 276, 28, W.langit, ["biru 0,42 m² = 4.200 cm²"], 10.4)),
      tambah("merah", ...kartu("r2", 12, 72, 276, 28, W.merahMuda, ["merah 2.300 cm²"], 10.4)),
      tambah("tersisa", ...kartu("r3", 12, 108, 276, 28, W.krem, ["tersisa 150 cm²"], 10.4)),
    ),
    k(
      "Seluruh kertas enam ribu lima ratus, dipakai enam ribu tiga ratus lima puluh, yaitu nol koma enam tiga lima meter persegi.",
      bersih(0),
      tambah(0, judul("Tantangan 2: hasil akhir")),
      tambah("Seluruh", ...kartu("s1", 12, 34, 276, 28, W.krem, ["4.200 + 2.300 = 6.500"], 10.4)),
      tambah("dipakai", ...kartu("s2", 12, 68, 276, 28, W.langit, ["6.500 − 150 = 6.350 cm²"], 10.4)),
      tambah("nol", ...kartu("s3", 12, 102, 276, 28, W.hijauMuda, ["6.350 ÷ 10.000 = 0,635 m²"], 10.4)),
    ),
  ],
};

/* ------------------------------ 15. Pengayaan 3-5: volume (Panduan Guru hlm. 170-173) ------------------------------ */
export const ADEGAN_PENGAYAAN_VOLUME: AdeganStory = {
  id: "pengayaan-volume",
  judul: "Tantangan 3 sampai 5: volume",
  sumber: "Materi: volume dan satuan volume",
  latar: "#F0FDFA",
  kutipan: kutipanLokal("k4b4b-materi-3.ts:5"),
  ketukan: [
    k(
      "Tantangan tiga sama dengan latihan tangki tadi, hasilnya sama. Tantangan empat: dua belas lusin botol, tiap botol lima ratus mililiter.",
      bersih(0),
      tambah(0, judul("Tantangan 3 dan 4")),
      tambah("tangki", ...kartu("t1", 12, 38, 276, 34, W.hijauMuda, ["latihan tangki: 1.249 l 675 ml ✔"], 10)),
      tambah("Tantangan@2", ...kartu("t2", 12, 88, 276, 34, W.krem, ["12 lusin botol × 500 ml"], 10.4)),
    ),
    k(
      "Dua belas lusin sama dengan seratus empat puluh empat botol. Seratus empat puluh empat kali lima ratus sama dengan tujuh puluh dua ribu mililiter, yaitu tujuh puluh dua liter.",
      bersih(0),
      tambah(0, judul("Tantangan 4: antiseptik")),
      tambah("Dua", ...kartu("u1", 12, 36, 276, 28, W.krem, ["12 × 12 = 144 botol"], 10.4)),
      tambah("Seratus@2", ...kartu("u2", 12, 72, 276, 28, W.langit, ["144 × 500 = 72.000 ml"], 10.4)),
      tambah("liter@2", ...kartu("u3", 12, 108, 276, 28, W.hijauMuda, ["72.000 ml = 72 l"], 10.4)),
    ),
    k(
      "Tantangan lima: drum berisi dua belas liter seratus lima puluh enam mililiter pernis untuk dua belas toko. Tiap toko membutuhkan sembilan ratus mililiter.",
      bersih(0),
      tambah(0, judul("Tantangan 5: pernis")),
      tambah("drum", ...kartu("v1", 12, 36, 276, 28, W.krem, ["soal: 12 l 156 ml = 12.156 ml"], 10)),
      tambah("toko@2", ...kartu("v2", 12, 72, 276, 28, W.langit, ["tiap toko 900 ml"], 10.4)),
      tambah("membutuhkan", ...kartu("v3", 12, 108, 276, 34, W.krem, ["12 toko × 900 ml"], 10.4)),
    ),
    k(
      "Dua belas toko butuh dua belas kali sembilan ratus, yaitu sepuluh ribu delapan ratus mililiter. Sisanya dua belas ribu seratus lima puluh enam kurang itu, yaitu seribu tiga ratus lima puluh enam mililiter. Jadi setiap toko mendapat pasokan.",
      bersih(0),
      tambah(0, judul("Tantangan 5: sisa pernis")),
      tambah("Dua", ...kartu("w1", 12, 40, 276, 30, W.hijauMuda, ["12 × 900 = 10.800 ml"], 10.4)),
      tambah("Sisanya", ...kartu("w3", 12, 84, 276, 30, W.krem, ["12.156 − 10.800 = 1.356 ml"], 10.4)),
      tambah("mendapat", ...kartu("w5", 12, 128, 276, 30, W.langit, ["ya, setiap toko dapat pasokan ✔"], 9.8)),
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
  kutipan: kutipanLokal("k4b4b-materi-3.ts:6"),
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
