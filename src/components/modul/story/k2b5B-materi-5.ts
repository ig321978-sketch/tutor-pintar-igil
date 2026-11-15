import type { AdeganStory } from "./logika-story";
import { OWL, W, benda, emo, hasil, judul, kartu, meja, persamaan, tanda, tempat } from "./k2b5B-gambar";
import { bersih, bersihMeja, duaTempat, geser, hapusKartu, idx, k, mejaSekaligus, pilihKata, pindah, sorotkan, tambah, ubah } from "./k2b5B-bantu";
import { gantian } from "./k2b5B-materi-2";
import { semuaPola } from "./k2b5B-materi-3";

/* ------------------------------ 17. Latihan satu: setengah dari enam bola ------------------------------ */
const SUARA_P1 = "Latihan satu. Wei punya enam bola di meja.";
const SUARA_P2 = "Berapa setengah dari enam bola? Ketuk jawabanmu.";
const SUARA_P3 = "Betul, tiga! Itu cocok, karena tiga ditambah tiga sama dengan enam.";
const SUARA_P4 = "Kita bagi bergantian: kiri, kanan, kiri, kanan, kiri, kanan. Setiap bagian berisi tiga bola.";
const SUARA_P5 = "Jadi setengah dari enam bola adalah tiga bola.";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan: setengah dari enam bola",
  sumber: "Materi: Latihan setengah dari enam",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_P1, tambah(0, judul("Latihan satu"), meja()), mejaSekaligus(idx(SUARA_P1, "enam"), 6, "bola")),
    k(SUARA_P2, tambah(idx(SUARA_P2, "Ketuk"), ...pilihKata(128, ["2", "3", "4"], 16))),
    k(SUARA_P3, sorotkan(idx(SUARA_P3, "Betul"), "c2-k")),
    k(SUARA_P4, hapusKartu(0, 3), duaTempat(0, "Kiri", "Kanan"), ...pindah("bola", 6, gantian(SUARA_P4, 6))),
    k(SUARA_P5, bersihMeja(0), tambah(idx(SUARA_P5, "Jadi"), tanda(true)), tambah(idx(SUARA_P5, "setengah"), ...hasil("hs", "setengah dari 6 = 3"))),
  ],
};

/* ------------------------------ 18. Latihan dua: lima dan tiga bukan setengah ------------------------------ */
const SUARA_Q1 = "Latihan dua. Kira membagi delapan bintang menjadi lima bintang dan tiga bintang.";
const SUARA_Q2 = "Apakah ini setengah dari delapan bintang? Ketuk jawabanmu.";
const SUARA_Q3 = "Betul, bukan setengah! Lima dan tiga tidak sama banyak.";
const SUARA_Q4 = "Pindahkan satu dari kiri ke kanan, dan keduanya jadi empat bintang.";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan: apakah ini setengah",
  sumber: "Materi: Latihan bukan setengah",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Latihan dua")),
      tambah(idx(SUARA_Q1, "membagi"), tempat("pa", "Kiri", 5), tempat("pb", "Kanan", 3)),
      tambah(idx(SUARA_Q1, "lima"), [0, 1, 2, 3, 4].map((i) => benda("pa", i, "bintang", 8))),
      tambah(idx(SUARA_Q1, "tiga"), [0, 1, 2].map((i) => benda("pb", i, "bintang", 8))),
    ),
    k(SUARA_Q2, tambah(idx(SUARA_Q2, "Ketuk"), ...pilihKata(38, ["setengah", "bukan setengah"], 11))),
    k(SUARA_Q3, sorotkan(idx(SUARA_Q3, "Betul"), "c2-k"), tambah(idx(SUARA_Q3, "Lima"), tanda(false))),
    k(SUARA_Q4, hapusKartu(0, 2), ...geser(idx(SUARA_Q4, "kiri"), "bintang", 8, "pa", 4, "pb", 3, 4, 4), ubah(idx(SUARA_Q4, "keduanya"), { id: "tanda", isi: "✅" })),
  ],
};

/* ------------------------------ 19. Latihan tiga: sembilan ikan ------------------------------ */
const SUARA_R1 = "Latihan tiga. Halim punya sembilan ikan di meja.";
const SUARA_R2 = "Apakah sembilan ikan bisa dibagi dua sama banyak? Ketuk jawabanmu.";
const SUARA_R3 = "Betul, sembilan itu ganjil! Empat ikan ke kiri, empat ikan ke kanan, dan satu ikan tersisa.";
const SUARA_R4 = "Jadi sembilan ikan tidak bisa dibagi dua sama banyak. Sembilan adalah bilangan ganjil.";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan: genap atau ganjil",
  sumber: "Materi: Latihan genap atau ganjil",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Latihan tiga"), meja()), mejaSekaligus(idx(SUARA_R1, "sembilan"), 9, "ikan")),
    k(SUARA_R2, tambah(idx(SUARA_R2, "Ketuk"), ...pilihKata(128, ["tersisa satu", "bisa dibagi dua"], 11))),
    k(
      SUARA_R3,
      sorotkan(idx(SUARA_R3, "Betul"), "c1-k"),
      hapusKartu(idx(SUARA_R3, "ganjil"), 2),
      duaTempat(idx(SUARA_R3, "ganjil"), "Kiri", "Kanan"),
      ...pindah("ikan", 9, [
        { at: idx(SUARA_R3, "kiri"), n: 0, ke: "pa" },
        { at: idx(SUARA_R3, "kiri"), n: 1, ke: "pa" },
        { at: idx(SUARA_R3, "kiri"), n: 2, ke: "pa" },
        { at: idx(SUARA_R3, "kiri"), n: 3, ke: "pa" },
        { at: idx(SUARA_R3, "kanan"), n: 4, ke: "pb" },
        { at: idx(SUARA_R3, "kanan"), n: 5, ke: "pb" },
        { at: idx(SUARA_R3, "kanan"), n: 6, ke: "pb" },
        { at: idx(SUARA_R3, "kanan"), n: 7, ke: "pb" },
      ]),
    ),
    k(SUARA_R4, sorotkan(idx(SUARA_R4, "Jadi"), "mj_8_ikan"), tambah(idx(SUARA_R4, "Jadi"), tanda(false))),
  ],
};

/* ------------------------------ 20. Latihan empat: dari setengah ke seluruhnya ------------------------------ */
const SUARA_S1 = "Latihan empat. Ini setengah dari kartu Igil, yaitu empat kartu.";
const SUARA_S2 = "Kalau bagian ini setengahnya, berapa semua kartu Igil? Ketuk jawabanmu.";
const SUARA_S3 = "Betul, delapan! Kita tambahkan setengah yang lain di kanan, yaitu empat kartu juga.";
const SUARA_S4 = "Empat tambah empat sama dengan delapan. Jadi semuanya delapan kartu.";

export const ADEGAN_LATIHAN_EMPAT: AdeganStory = {
  id: "latihan-empat",
  judul: "Latihan: dari setengah ke seluruhnya",
  sumber: "Materi: Latihan setengah ke seluruhnya",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_S1, tambah(0, judul("Latihan empat"), tempat("pa", "Setengah", 4)), tambah(idx(SUARA_S1, "empat", 2), [0, 1, 2, 3].map((i) => benda("pa", i, "kartu", 8)))),
    k(SUARA_S2, tambah(idx(SUARA_S2, "Ketuk"), ...pilihKata(38, ["4", "6", "8"], 16))),
    k(SUARA_S3, sorotkan(idx(SUARA_S3, "Betul"), "c3-k"), tambah(idx(SUARA_S3, "tambahkan"), tempat("pb", "Setengah", 4), [0, 1, 2, 3].map((i) => benda("pb", i, "kartu", 8)))),
    k(SUARA_S4, hapusKartu(0, 3), tambah(idx(SUARA_S4, "tambah"), persamaan(4, 4, 8, 70))),
  ],
};

/* ------------------------------ 21. Penutup ------------------------------ */
const SUARA_T1 = "Mari kita ingat lagi. Setengah dari kumpulan benda berarti dua bagian yang sama banyak.";
const SUARA_T2 = "Setengah dari empat adalah dua, dari enam adalah tiga, dari delapan adalah empat, dan dari sepuluh adalah lima.";
const SUARA_T3 = "Bilangan genap bisa dibagi dua sama banyak, sedangkan bilangan ganjil selalu tersisa satu. Terima kasih, sampai jumpa!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Ringkasan setengah dari kumpulan benda",
  sumber: "Materi: ringkasan setengah kumpulan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_T1, tambah(0, judul("Ringkasan")), tambah(idx(SUARA_T1, "Setengah"), ...kartu("e1", 14, 56, 272, 50, W.krem, ["Setengah dari kumpulan benda", "dua bagian yang sama banyak"], 10.4))),
    k(SUARA_T2, bersih(0), tambah(0, judul("Pola setengah")), tambah(idx(SUARA_T2, "Setengah"), semuaPola())),
    k(SUARA_T3, bersih(0), tambah(0, judul("Genap dan ganjil")), tambah(idx(SUARA_T3, "genap"), ...kartu("e2", 14, 44, 272, 40, W.hijauMuda, ["Genap", "bisa dibagi dua sama banyak"], 10.4)), tambah(idx(SUARA_T3, "ganjil"), ...kartu("e3", 14, 94, 272, 40, W.pink, ["Ganjil", "selalu tersisa satu"], 10.4)), tambah(idx(SUARA_T3, "Terima"), emo("ow", 150, 170, OWL, 30))),
  ],
};
