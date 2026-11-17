import type { AdeganStory } from "./logika-story";
import { E, KURANG, W, deret, deretEmo, emo, judul, kartu, kotak, kotakBekal, label, orang, teks, tulis } from "./k1b3a-gambar";
import { bersih, k, sorotkan, tambah } from "./k1b3a-bantu";

/* Akhir "Bekal untuk Nenek": kue untuk Nenek aman, catatan perjalanan, kereta tiba di stasiun besar, lalu penutup. Tanpa latihan. */

/* ------------------------------ 7. Kue untuk Nenek aman ------------------------------ */
const SUARA_H1 = "Kue untuk Nenek masih tersisa enam. Mamah lega, oleh-olehnya aman sampai desa.";
const SUARA_H2 = "Kaka membacakan catatan perjalanan. Delapan dikurangi dua, tujuh dikurangi tiga, sepuluh dikurangi tiga, tiga dikurangi tiga.";
const SUARA_H3 = "Kereta berhenti di stasiun besar. Kata Mamah, kita harus pindah kereta di sini. Ayo bersiap!";
const CATATAN = [
  { t: tulis(8, 2), at: "Delapan" },
  { t: tulis(7, 3), at: "tujuh" },
  { t: tulis(10, 3), at: "sepuluh" },
  { t: tulis(3, 3), at: "tiga@3" },
  { t: tulis(6, 0), at: "tiga@4" },
];

export const ADEGAN_HASIL: AdeganStory = {
  id: "kue-aman",
  judul: "Kue untuk Nenek aman",
  sumber: "Materi: hasil dan catatan perjalanan",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Kue untuk Nenek aman"), ...kotakBekal("kt", 70, 60, 160, 64), ...deretEmo(E.kue, "ku", [...deret(3, 110, 40, 82), ...deret(3, 110, 40, 110)], 20)),
      tambah("enam.", ...label("un", 90, 134, 120, "untuk Nenek: 6", W.emas)),
      tambah("Mamah", ...orang("mm", 150, 180, E.mamah, "Mamah")),
      tambah("lega,", emo("lg", 186, 172, E.lega, 20)),
      tambah("aman", emo("ok", 250, 92, E.benar, 26)),
    ),
    k(
      SUARA_H2,
      bersih(0),
      tambah(0, judul("Catatan perjalanan"), ...orang("kk", 34, 110, E.kaka, "Kaka")),
      tambah("catatan", kotak("ct", 74, 30, 212, 166, "#FFFFFF", W.biru, { rx: 6, tebal: 2, z: -1 }), emo("ce", 270, 46, E.catatan, 16)),
      ...CATATAN.map((c, i) => tambah(c.at, emo(`ce${i}`, 104, 56 + i * 30, E.karcis, 14), teks(`ct${i}`, 184, 62 + i * 30, c.t, 16, W.biru))),
    ),
    k(
      SUARA_H3,
      bersih(0),
      tambah(0, judul("Stasiun besar")),
      tambah("Kereta", emo("kr", 80, 90, E.kereta, 44)),
      tambah("stasiun", emo("st", 220, 86, E.stasiun, 40), teks("sb", 220, 120, "stasiun besar", 9, W.ungu)),
      tambah("Mamah,", ...orang("mm", 150, 160, E.mamah, "Mamah")),
      tambah("pindah", ...kartu("pk", 40, 178, 220, 20, W.pink, ["pindah kereta"], 10)),
      sorotkan("bersiap!", "mm"),
    ),
  ],
};

/* ------------------------------ 8. Penutup ------------------------------ */
const SUARA_Q1 = "Ingat, pengurangan berarti benda berkurang karena diambil, dimakan, atau pergi.";
const SUARA_Q2 = "Mula-mula dikurangi yang pergi sama dengan sisa. Bisa juga hitung mundur dari bilangan pertama.";
const SUARA_Q3 = "Coba pikirkan, kalau Mamah makan satu kue lagi, berapa kue untuk Nenek? Sampai jumpa di stasiun besar!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: ingat cara mengurangi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Ingat, ya!")),
      tambah("berkurang", ...kartu("p1", 14, 34, 272, 34, W.merahMuda, ["berkurang: diambil, dimakan, pergi"], 9.6)),
      tambah("pergi.", emo("pg", 150, 100, E.kue, 26)),
    ),
    k(
      SUARA_Q2,
      tambah("Mula-mula", ...kartu("p2", 14, 76, 272, 34, W.emas, [`mula-mula ${KURANG} pergi = sisa`], 10)),
      tambah("mundur", ...kartu("p3", 14, 118, 272, 34, W.langit, ["hitung mundur dari bilangan pertama"], 9.6)),
      tambah("pertama.", ...kartu("p4", 14, 160, 272, 34, W.hijauMuda, [tulis(8, 2)], 13)),
    ),
    k(
      SUARA_Q3,
      bersih(0),
      tambah(0, judul("Coba pikirkan!"), emo("tn", 150, 56, E.tanya, 26)),
      tambah("Mamah", ...orang("mm", 50, 120, E.mamah, "Mamah")),
      tambah("kue", ...deret(6, 110, 28, 110).map((p, i) => emo(`kq${i}`, p.x, p.y, E.kue, 20))),
      tambah("berapa", teks("tq", 180, 150, `6 ${KURANG} 1 = ?`, 16, W.merah)),
      tambah("besar!", emo("kr", 90, 186, E.kereta, 24), emo("st", 210, 186, E.stasiun, 24)),
    ),
  ],
};
