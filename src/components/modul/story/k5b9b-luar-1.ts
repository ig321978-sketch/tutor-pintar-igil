import type { AdeganStory } from "./logika-story";
import { W, barisTempat, emo, idBaris, kartu, kartuMetode, kotak, panah, kepalaTempat, teks } from "./k5b9b-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k5b9b-bantu";

/** Id sel dan digit satu baris pada kolom tertentu (0 = ratus ribuan ... 5 = satuan). */
const kolom = (id: string, angka: string, cols: number[]): string[] => idBaris(id, angka).filter((x) => cols.some((c) => x === `${id}c${c}` || x === `${id}d${c}`));
const redup = (at: string | number, ids: string[]) => ubah(at, ...ids.map((id) => ({ id, op: 0.3 })));
const warnai = (at: string | number, ids: string[], warna: string) => ubah(at, ...ids.filter((x) => /c\d$/.test(x)).map((id) => ({ id, warna })));
const pusatKolom = (c: number) => 56 + c * 40 + 20;

/* ------------------------------ LB0. Empat metode luar Sub-Bab B ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luarb-pembuka",
  judul: "Empat metode luar untuk membandingkan dan mengurutkan",
  sumber: "Metode luar; empat cara membandingkan dan mengurutkan bilangan Sub-Bab B",
  latar: "#EEF2FF",
  ketukan: [
    k(
      "Video ini membahas metode luar untuk Sub-Bab B. Metode ini membantu kita membandingkan bilangan dengan cepat dan mengurutkan bilangan dengan rapi.",
      tambah(0, teks("jud", 150, 26, "Sub-Bab B: metode luar", 12, W.ungu)),
      tambah("metode", emo("e1", 70, 100, "🔭", 42), teks("t1", 70, 124, "metode luar", 9, W.merah)),
      tambah("membandingkan", emo("e2", 150, 100, "🧮", 42), teks("t2", 150, 124, "bandingkan cepat", 9)),
      tambah("mengurutkan", emo("e3", 230, 100, "🎯", 42), teks("t3", 230, 124, "urutkan rapi", 9, W.hijau)),
    ),
    k(
      "Ada empat metode luar. Pertama, Leftmost Place Priority, yaitu selalu memeriksa kolom paling kiri lebih dulu.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Empat metode luar", 12, W.ungu)),
      tambah("Leftmost", kartuMetode("m1", 10, 30, "#FDE68A", ["Leftmost", "Place Priority"], "kolom kiri dulu")),
    ),
    k(
      "Kedua, Digit-by-Digit Comparison, yaitu membandingkan angka kolom demi kolom sampai menemukan perbedaan.",
      tambah("Digit-by-Digit", kartuMetode("m2", 156, 30, "#FBCFE8", ["Digit-by-Digit", "Comparison"], "geser sampai beda")),
    ),
    k(
      "Ketiga, Ordering Protocol, yaitu aturan langkah demi langkah untuk mengurutkan banyak bilangan. Keempat, Number Line Placement, yaitu menaruh bilangan pada garis bilangan.",
      tambah("Ordering", kartuMetode("m3", 10, 112, "#BBF7D0", ["Ordering", "Protocol"], "urut banyak bilangan")),
      tambah("Number", kartuMetode("m4", 156, 112, "#BFDBFE", ["Number Line", "Placement"], "taruh di garis")),
    ),
  ],
};

/* ------------------------------ LB1. Leftmost Place Priority: konsep ------------------------------ */
export const ADEGAN_LUAR_KIRI: AdeganStory = {
  id: "luarb-kiri",
  judul: "Leftmost Place Priority: kolom paling kiri dulu",
  sumber: "Metode luar; contoh sepatu 432.543 dan 342.231",
  latar: "#FFF4DD",
  ketukan: [
    k(
      "Leftmost Place Priority artinya kolom paling kiri paling berkuasa. Kolom itu memegang nilai terbesar, jadi dilihat lebih dulu.",
      tambah(0, teks("jud", 150, 22, "Leftmost Place Priority", 12, W.ungu)),
      tambah("artinya", kepalaTempat("kp", 44)),
      sorotkan("terbesar,", "kpk0"),
      tambah("berkuasa.", kartu("kr", 30, 104, 240, 48, W.krem, ["kolom paling kiri paling berkuasa", "nilainya paling besar"], 9.6)),
    ),
    k(
      "Mengapa begitu? Satu ratus ribuan sama dengan sepuluh puluh ribuan. Setiap langkah ke kiri membuat nilainya sepuluh kali lebih besar.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Satu langkah ke kiri", 12, W.ungu)),
      tambah("Satu", kotak("big", 30, 44, 240, 34, W.hijauMuda), teks("bigt", 150, 66, "1 ratus ribuan = 100.000", 11)),
      tambah("sepuluh", Array.from({ length: 10 }, (_, i) => kotak(`sm${i}`, 30 + i * 24, 100, 24, 26, W.krem, W.biru, { rx: 0, tebal: 1 })), teks("smt", 150, 144, "10 puluh ribuan = 10 x 10.000", 10, W.merah)),
      tambah("Setiap", teks("kali", 150, 182, "ke kiri: nilainya 10 kali lebih besar", 10, W.ungu)),
    ),
    k(
      "Contoh: 432.543 dan 342.231. Kolom paling kiri berisi 4 dan 3, jadi 432.543 lebih besar, tanpa melihat kolom lain.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Contoh sepatu", 12, W.ungu), kepalaTempat("kp", 40)),
      tambah("432.543", barisTempat("a", 58, "432543", "432.543", W.hijauMuda), barisTempat("b", 80, "342231", "342.231", W.krem)),
      sorotkan("kiri", "ac0", "bc0"),
      tambah("jadi", teks("hs", 150, 132, "4 > 3, jadi 432.543 > 342.231", 12, W.hijau)),
    ),
    k(
      "Aturannya, bila kolom paling kiri berbeda, keputusan langsung diambil. Kolom lain tidak perlu dilihat lagi.",
      redamkan(0, "ac0", "bc0"),
      redup("tidak", [...kolom("a", "432543", [1, 2, 3, 4, 5]), ...kolom("b", "342231", [1, 2, 3, 4, 5])]),
      tambah("Aturannya,", kartu("ar", 30, 150, 240, 44, W.krem, ["kiri berbeda: langsung putuskan", "kolom lain tidak dilihat"], 9.6)),
    ),
  ],
};

/* ------------------------------ LB2. Leftmost Place Priority: penerapan ------------------------------ */
export const ADEGAN_LUAR_KIRI_TERAPAN: AdeganStory = {
  id: "luarb-kiri-terapan",
  judul: "Leftmost Place Priority: contoh dari soal latihan dan data wisatawan",
  sumber: "Metode luar; contoh 445.000 dan 545.000, data wisatawan, 657.000 dan 675.000",
  latar: "#FEF2F2",
  ketukan: [
    k(
      "Terapan: 445.000 dan 545.000 dari Ayo Berlatih. Kolom paling kiri berisi 4 dan 5, jadi 445.000 lebih kecil dari 545.000.",
      tambah(0, teks("jud", 150, 22, "Terapan: soal latihan", 12, W.ungu), kepalaTempat("kp", 40)),
      tambah("445.000", barisTempat("a", 58, "445000", "445.000", W.krem), barisTempat("b", 80, "545000", "545.000", W.hijauMuda)),
      sorotkan("kiri", "ac0", "bc0"),
      tambah("jadi", teks("hs", 150, 132, "4 < 5, jadi 445.000 < 545.000", 12, W.hijau)),
    ),
    k(
      "Terapan lain: tahun 2020 punya 69.968 wisatawan, sedangkan tahun 2016 punya 355.313. Kolom ratus ribuan 69.968 kosong, jadi lebih kecil dari 355.313.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Terapan: data wisatawan", 12, W.ungu), kepalaTempat("kp", 40)),
      tambah("tahun", barisTempat("a", 58, " 69968", "69.968", W.merahMuda), barisTempat("b", 80, "355313", "355.313", W.hijauMuda)),
      tambah("kosong,", teks("hs", 150, 132, "kolom kiri 69.968 kosong, 3 lebih besar", 10, W.hijau), teks("ht", 150, 150, "tahun 2020 lawan tahun 2016", 10, W.ungu)),
      sorotkan("kosong,", "ac0", "bc0"),
    ),
    k(
      "Tetapi jika kolom paling kiri sama, kita belum bisa memutuskan. Misalnya 657.000 dan 675.000 sama-sama punya 6 di kiri, sehingga kita harus lanjut.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Kolom kiri sama?", 12, W.ungu), kepalaTempat("kp", 40)),
      tambah("657.000", barisTempat("a", 58, "657000", "657.000", W.krem), barisTempat("b", 80, "675000", "675.000", W.krem)),
      warnai("sama-sama", ["ac0", "bc0"], W.hijauMuda),
      tambah("lanjut.", teks("hs", 150, 140, "kiri sama: belum bisa memutuskan", 11, W.merah)),
    ),
    k(
      "Itulah batas metode ini: ia hanya menolong bila kolom kiri berbeda. Untuk kolom kiri yang sama, kita memakai metode berikutnya.",
      hapus(0, "hs"),
      tambah("batas", kartu("bt", 30, 120, 240, 34, W.krem, ["hanya menolong bila kolom kiri berbeda"], 9.6)),
      tambah("berikutnya.", panah("pn", 150, 158, 0, 16, W.merah, 2, { gambar: true }), kartu("nx", 50, 176, 200, 26, W.hijauMuda, ["Digit-by-Digit Comparison"], 9.6)),
    ),
  ],
};

/* ------------------------------ LB3. Digit-by-Digit Comparison: konsep ------------------------------ */
export const ADEGAN_LUAR_KOLOM: AdeganStory = {
  id: "luarb-kolom",
  judul: "Digit-by-Digit Comparison: geser sampai berbeda",
  sumber: "Metode luar; contoh 657.000 dan 675.000",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Digit-by-Digit Comparison dipakai ketika kolom kiri sama. Kita geser penunjuk ke kanan, satu kolom setiap kali, sampai angkanya berbeda.",
      tambah(0, teks("jud", 150, 22, "Digit-by-Digit Comparison", 12, W.ungu), kepalaTempat("kp", 52)),
      tambah("kolom", barisTempat("a", 70, "657000", "657.000", W.krem), barisTempat("b", 92, "675000", "675.000", W.krem)),
      tambah("geser", panah("pt", pusatKolom(0), 32, 0, 16, W.merah, 3), teks("ptt", 150, 140, "penunjuk bergeser ke kanan", 10, W.merah)),
    ),
    k(
      "Langkah satu: periksa ratus ribuan, 6 dan 6, sama, jadi geser. Langkah dua: periksa puluh ribuan, 5 dan 7, berbeda, jadi berhenti.",
      ubah(0, { id: "ptt", isi: "langkah 1: ratus ribuan, 6 sama 6" }),
      warnai("sama,", ["ac0", "bc0"], W.hijauMuda),
      ubah("geser.", { id: "pt", x: pusatKolom(1) }, { id: "ptt", isi: "langkah 2: puluh ribuan, 5 beda 7" }),
      warnai("berbeda,", ["ac1", "bc1"], W.merahMuda),
    ),
    k(
      "Pada kolom yang berbeda, bilangan dengan angka lebih besar menang. Lima lebih kecil dari tujuh, jadi 657.000 lebih kecil dari 675.000.",
      ubah(0, { id: "ptt", isi: "berhenti di puluh ribuan" }),
      tambah("jadi", teks("hs", 150, 168, "657.000 < 675.000", 14, W.hijau)),
    ),
    k(
      "Kolom sesudahnya tidak lagi menentukan. Berhenti di kolom pertama yang berbeda, itulah inti metode ini.",
      redup("tidak", [...kolom("a", "657000", [2, 3, 4, 5]), ...kolom("b", "675000", [2, 3, 4, 5])]),
      hapus("Berhenti", "hs", "ptt"),
      tambah("Berhenti", kartu("rg", 30, 140, 240, 44, W.krem, ["kolom sama: geser", "kolom berbeda: berhenti"], 10)),
    ),
  ],
};

/* ------------------------------ LB4. Digit-by-Digit Comparison: penerapan ------------------------------ */
export const ADEGAN_LUAR_KOLOM_TERAPAN: AdeganStory = {
  id: "luarb-kolom-terapan",
  judul: "Digit-by-Digit Comparison: 876.987 dan 876.789",
  sumber: "Metode luar; contoh Ayo Berlatih 1e",
  latar: "#ECFEFF",
  ketukan: [
    k(
      "Terapan: 876.987 dan 876.789. Kolom pertama sampai ketiga, yaitu 8, 7, dan 6, sama semua, jadi kita terus bergeser.",
      tambah(0, teks("jud", 150, 22, "Terapan: Ayo Berlatih 1e", 12, W.ungu), kepalaTempat("kp", 52)),
      tambah("876.987", barisTempat("a", 70, "876987", "876.987", W.krem), barisTempat("b", 92, "876789", "876.789", W.krem)),
      tambah("Kolom", panah("pt", pusatKolom(0), 32, 0, 16, W.merah, 3)),
      warnai("sama", kolom("a", "876987", [0, 1, 2]).concat(kolom("b", "876789", [0, 1, 2])), W.hijauMuda),
      ubah("bergeser.", { id: "pt", x: pusatKolom(3) }),
    ),
    k(
      "Kolom keempat, ratusan: 9 dan 7, berbeda, jadi berhenti. Sembilan lebih besar dari tujuh, maka 876.987 lebih besar dari 876.789.",
      warnai("berbeda,", ["ac3", "bc3"], W.merahMuda),
      tambah("ratusan:", teks("cp", 150, 140, "ratusan: 9 > 7, berhenti", 12, W.merah)),
      tambah("maka", teks("hs", 150, 168, "876.987 > 876.789", 14, W.hijau)),
    ),
    k(
      "Perhatikan, dua kolom terakhir tidak perlu dibaca. Satuannya 7 dan 9 bahkan berlawanan, tetapi tidak berpengaruh.",
      redup("tidak", [...kolom("a", "876987", [4, 5]), ...kolom("b", "876789", [4, 5])]),
      tambah("Satuannya", teks("cs", 150, 190, "satuan 7 dan 9 tidak berpengaruh", 10, W.ungu)),
    ),
    k(
      "Pegangan mudah: kolom sama, geser. Kolom berbeda, berhenti. Pegangan ini berlaku untuk bilangan dengan berapa pun banyak angka.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Pegangan Digit-by-Digit", 12, W.ungu)),
      tambah("sama,", kartu("g1", 30, 54, 240, 44, W.hijauMuda, ["kolom sama", "geser ke kanan"], 10)),
      tambah("berbeda,", kartu("g2", 30, 112, 240, 44, W.merahMuda, ["kolom berbeda", "berhenti dan putuskan"], 10)),
    ),
  ],
};
