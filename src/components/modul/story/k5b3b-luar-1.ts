import type { AdeganStory } from "./logika-story";
import { W, batang, emo, judul, kartu, teks } from "./k5b3b-gambar";
import { bersih, k, tambah } from "./k5b3b-bantu";

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk menjumlahkan pecahan",
  sumber: "Metode luar: pembuka; contoh Buku Siswa hlm. 76–90",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Bagaimana cara menjumlahkan dua pecahan? Guru di berbagai negara punya cara berbeda. Dalam video ini kita lihat empat metode dari luar.",
      tambah(0, judul("Empat metode dari luar")),
      tambah("Bagaimana", teks("pq", 150, 80, "1/2 + 1/3 = ?", 22, W.merah)),
      tambah("berbeda.", emo("gl", 150, 140, "🌍", 36)),
    ),
    k(
      "Empat metode itu: Like Denominators, Common Denominator via LCM, Area Model, dan Number Line Jumps.",
      bersih(0),
      tambah(0, judul("Empat metode")),
      tambah("Like", ...kartu("m1", 20, 32, 260, 30, W.hijauMuda, ["1. Like Denominators"], 9.4)),
      tambah("Common", ...kartu("m2", 20, 70, 260, 30, W.langit, ["2. Common Denominator via LCM"], 9.4)),
      tambah("Area", ...kartu("m3", 20, 108, 260, 30, W.krem, ["3. Area Model"], 9.4)),
      tambah("Number", ...kartu("m4", 20, 146, 260, 30, W.pink, ["4. Number Line Jumps"], 9.4)),
    ),
    k(
      "Semua metode sepakat pada satu gagasan: dua pecahan hanya bisa digabung bila potongannya sama besar. Bedanya, tiap metode punya cara sendiri untuk menyamakan atau memperlihatkan potongan itu.",
      bersih(0),
      tambah(0, judul("Satu gagasan yang sama")),
      tambah("potongannya", ...batang("g1", 30, 56, 120, 28, 6, [[0, 2, W.hijauPita]]), ...batang("g2", 150, 56, 120, 28, 6, [[0, 3, W.jingga]])),
      tambah("sama", teks("g3", 150, 112, "potongan sama besar", 11, W.hijau)),
      tambah("sendiri", teks("g4", 150, 140, "cara menyamakannya yang berbeda", 9.8, W.merah)),
    ),
    k(
      "Angka yang kita pakai dari buku: martabak, penghapus, dan pita Yohana; kertas Lukas dan Komang; serta wingko Lukas.",
      bersih(0),
      tambah(0, judul("Angka dari buku")),
      tambah("martabak,", ...kartu("a1", 14, 32, 272, 28, W.hijauMuda, ["sama: 1/8 + 2/8 dan 2/10 + 3/10"], 9)),
      tambah("pita", ...kartu("a2", 14, 68, 272, 28, W.langit, ["campuran: 2 1/5 + 3 1/5"], 9)),
      tambah("kertas", ...kartu("a3", 14, 104, 272, 28, W.pink, ["berbeda: 1/3 + 4/6"], 9)),
      tambah("wingko", ...kartu("a4", 14, 140, 272, 28, W.krem, ["wingko Lukas: 1/2 + 1/3"], 9)),
    ),
  ],
};

/* ------------------------------ 2. Like Denominators: konsep ------------------------------ */
export const ADEGAN_LUAR_SAMA: AdeganStory = {
  id: "luar-sama",
  judul: "Like Denominators: penyebut sama",
  sumber: "Metode luar: Like Denominators",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Metode pertama, Like Denominators, artinya penyebut sama. Kalau penyebutnya sama, potongannya sama besar, jadi kita cukup menghitung berapa potongan yang terkumpul.",
      tambah(0, judul("Like Denominators")),
      tambah("penyebut", ...batang("b1", 30, 54, 105, 28, 7, [[0, 2, W.hijauPita]]), ...batang("b2", 165, 54, 105, 28, 7, [[0, 3, W.jingga]])),
      tambah("potongannya", teks("bp", 150, 74, "+", 18, W.merah), teks("t1", 82, 104, "2/7", 12, W.hitam), teks("t2", 218, 104, "3/7", 12, W.hitam)),
      tambah("menghitung", teks("t3", 150, 150, "potongan sama besar", 11, W.hijau)),
    ),
    k(
      "Aturannya: jumlahkan pembilang, tulis penyebut yang sama. Dua per tujuh ditambah tiga per tujuh sama dengan lima per tujuh.",
      bersih(0),
      tambah(0, judul("Aturan Like Denominators")),
      tambah("jumlahkan", ...kartu("r1", 30, 36, 240, 28, W.hijauMuda, ["jumlahkan pembilang"], 9.4)),
      tambah("penyebut", ...kartu("r2", 30, 72, 240, 28, W.krem, ["penyebut tetap"], 9.4)),
      tambah("Dua", teks("r3", 150, 140, "2/7 + 3/7 = (2 + 3)/7 = 5/7", 14, W.hitam)),
    ),
    k(
      "Mengapa penyebut tidak ikut dijumlahkan? Karena penyebut hanya memberi nama potongan, seperti satuan. Dua ketujuh ditambah tiga ketujuh menjadi lima ketujuh, sama seperti dua apel ditambah tiga apel menjadi lima apel.",
      bersih(0),
      tambah(0, judul("Penyebut hanyalah nama")),
      tambah("seperti", emo("ap", 40, 80, "🍎", 26), teks("ap1", 170, 76, "2 apel + 3 apel = 5 apel", 13, W.hitam)),
      tambah("Dua@2", teks("ap2", 150, 116, "2 ketujuh + 3 ketujuh = 5 ketujuh", 11, W.hitam)),
      tambah("apel@2", teks("ap3", 150, 150, "yang dijumlahkan: banyak potongan", 9.8, W.hijau)),
    ),
    k(
      "Metode ini paling cepat, tetapi hanya berlaku bila penyebutnya sudah sama. Kalau belum sama, kita perlu metode lain.",
      bersih(0),
      tambah(0, judul("Kapan dipakai?")),
      tambah("cepat,", ...kartu("kd1", 40, 46, 220, 40, W.hijauMuda, ["paling cepat"], 11)),
      tambah("hanya", ...kartu("kd2", 40, 100, 220, 40, W.krem, ["syarat: penyebut sudah sama"], 10.4)),
      tambah("lain.", teks("kd3", 150, 170, "penyebut berbeda: perlu cara lain", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ 3. Like Denominators: penerapan ------------------------------ */
export const ADEGAN_LUAR_SAMA_TERAPAN: AdeganStory = {
  id: "luar-sama-terapan",
  judul: "Like Denominators pada angka buku",
  sumber: "Metode luar: Like Denominators; Buku Siswa hlm. 76–83",
  latar: "#ECFDF5",
  ketukan: [
    k(
      "Terapkan pada martabak Nisa, Eksplorasi tiga titik dua A. Lukas mendapat satu per delapan, Komang dua per delapan. Penyebutnya sama-sama delapan.",
      tambah(0, judul("Martabak Nisa")),
      tambah("Lukas", ...batang("m1", 20, 56, 112, 26, 8, [[0, 1, W.jingga]]), teks("m1t", 76, 100, "1/8", 14, W.hitam)),
      tambah("Komang", teks("mp", 150, 74, "+", 18, W.merah), ...batang("m2", 168, 56, 112, 26, 8, [[0, 2, W.merahPita]]), teks("m2t", 224, 100, "2/8", 14, W.hitam)),
      tambah("Penyebutnya", teks("m3", 150, 150, "penyebut sama: 8", 11, W.hijau)),
    ),
    k(
      "Jumlahkan pembilangnya: satu ditambah dua sama dengan tiga. Penyebutnya tetap delapan. Hasilnya tiga per delapan.",
      bersih(0),
      tambah(0, judul("Martabak: hasil")),
      tambah("Jumlahkan", teks("h1", 150, 72, "1/8 + 2/8 = (1 + 2)/8", 15, W.hitam)),
      tambah("Hasilnya", teks("h2", 150, 110, "= 3/8", 24, W.hijau), ...batang("h3", 40, 128, 220, 28, 8, [[0, 3, W.hijauPita]])),
    ),
    k(
      "Contoh kedua, penghapus Lukas, Eksplorasi tiga titik dua B: dua per sepuluh ditambah tiga per sepuluh sama dengan lima per sepuluh. Disederhanakan, lima per sepuluh menjadi satu per dua.",
      bersih(0),
      tambah(0, judul("Penghapus Lukas")),
      tambah("dua", teks("p1", 150, 72, "2/10 + 3/10 = 5/10", 17, W.hitam)),
      tambah("Disederhanakan,", teks("p2", 150, 112, "5/10 = 1/2", 22, W.hijau)),
    ),
    k(
      "Contoh ketiga, pita Yohana, Eksplorasi tiga titik dua C. Dua satu per lima ditambah tiga satu per lima. Jumlahkan bilangan bulatnya: dua tambah tiga sama dengan lima.",
      bersih(0),
      tambah(0, judul("Pita Yohana")),
      tambah("Contoh", teks("y1", 150, 58, "2 1/5 + 3 1/5", 17, W.hitam)),
      tambah("bulatnya:", ...kartu("y2", 40, 72, 220, 28, W.krem, ["bilangan bulat"], 9.4)),
      tambah("sama", teks("y3", 150, 130, "2 + 3 = 5", 20, W.hijau)),
    ),
    k(
      "Lalu jumlahkan pecahannya: satu per lima ditambah satu per lima sama dengan dua per lima. Gabungkan, hasilnya lima dua per lima meter.",
      bersih(0),
      tambah(0, judul("Pita Yohana: pecahannya")),
      tambah("Lalu", teks("y7", 150, 52, "2 1/5 + 3 1/5", 15, W.hitam)),
      tambah("pecahannya:", ...kartu("y4", 40, 66, 220, 28, W.langit, ["bilangan pecahan"], 9.4)),
      tambah("satu", teks("y5", 150, 124, "1/5 + 1/5 = 2/5", 17, W.hijau)),
      tambah("Gabungkan,", teks("y6", 150, 162, "= 5 2/5 m", 18, W.merah)),
    ),
  ],
};

/* ------------------------------ 4. Common Denominator via LCM: konsep ------------------------------ */
export const ADEGAN_LUAR_KPK: AdeganStory = {
  id: "luar-kpk",
  judul: "Common Denominator via LCM: samakan penyebut dengan KPK",
  sumber: "Metode luar: Common Denominator via LCM",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Metode kedua, Common Denominator via LCM, artinya penyebut sama lewat KPK. Dipakai bila penyebut kedua pecahan berbeda, karena potongannya belum sama besar.",
      tambah(0, judul("Common Denominator via LCM")),
      tambah("penyebut", ...batang("b1", 30, 54, 105, 28, 4, [[0, 1, W.hijauPita]]), ...batang("b2", 165, 54, 105, 28, 6, [[0, 1, W.jingga]])),
      tambah("berbeda,", teks("bp", 150, 74, "+", 18, W.merah), teks("t1", 82, 104, "1/4", 12, W.hitam), teks("t2", 218, 104, "1/6", 12, W.hitam)),
      tambah("belum", teks("t3", 150, 150, "potongan belum sama besar", 11, W.merah)),
    ),
    k(
      "Langkah satu, cari KPK dari kedua penyebut. Daftar kelipatan masing-masing, lalu ambil kelipatan sama yang paling kecil. Kelipatan empat dan kelipatan enam bertemu pertama kali di dua belas.",
      bersih(0),
      tambah(0, judul("Langkah 1: cari KPK")),
      tambah("Daftar", ...kartu("k1", 20, 40, 260, 30, W.langit, ["kelipatan 4: 4, 8, 12, 16, ..."], 9.4)),
      tambah("kelipatan@4", ...kartu("k2", 20, 80, 260, 30, W.krem, ["kelipatan 6: 6, 12, 18, ..."], 9.4)),
      tambah("belas.", ...kartu("k3", 70, 124, 160, 32, W.hijauMuda, ["KPK 4 dan 6 = 12"], 10.5)),
    ),
    k(
      "Langkah dua, ubah tiap pecahan menjadi pecahan senilai berpenyebut KPK itu. Caranya, KPK dibagi penyebut lama, lalu hasilnya dikali pembilang lama.",
      bersih(0),
      tambah(0, judul("Langkah 2: pecahan senilai")),
      tambah("KPK", teks("s1", 150, 76, "1/4 = ((12 : 4) × 1)/12 = 3/12", 12, W.hitam)),
      tambah("hasilnya", teks("s2", 150, 112, "1/6 = ((12 : 6) × 1)/12 = 2/12", 12, W.hitam)),
    ),
    k(
      "Langkah tiga, jumlahkan seperti penyebut sama, lalu sederhanakan bila bisa. Tiga per dua belas ditambah dua per dua belas sama dengan lima per dua belas.",
      bersih(0),
      tambah(0, judul("Langkah 3: jumlahkan")),
      tambah("jumlahkan", ...kartu("j1", 30, 44, 240, 28, W.hijauMuda, ["penyebut sudah sama"], 9.4)),
      tambah("Tiga", teks("j2", 150, 130, "3/12 + 2/12 = 5/12", 17, W.hitam)),
    ),
    k(
      "Metode ini bisa dipakai untuk pasangan penyebut apa saja. KPK membuat angka yang kita pakai sekecil mungkin, sehingga hitungannya lebih ringan.",
      bersih(0),
      tambah(0, judul("Mengapa KPK?")),
      tambah("pasangan", ...kartu("w1", 40, 46, 220, 36, W.langit, ["berlaku untuk penyebut apa saja"], 9.8)),
      tambah("KPK", ...kartu("w2", 40, 98, 220, 36, W.hijauMuda, ["angka sekecil mungkin"], 9.8)),
      tambah("ringan.", emo("w3", 150, 170, "🎈", 24)),
    ),
  ],
};
