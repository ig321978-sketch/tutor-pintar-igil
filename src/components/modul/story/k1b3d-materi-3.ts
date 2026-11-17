import type { AdeganStory } from "./logika-story";
import { E, W, emo, judul, kartu, orang } from "./k1b3d-gambar";
import { bersih, k, sorotkan, tambah } from "./k1b3d-bantu";

/* Akhir "Tiba di Rumah Nenek" dan akhir cerita Bab 3 Kereta ke Rumah Nenek: semua cerita terjawab, berkumpul bersama Nenek, lalu penutup. Tanpa latihan. */

/* ------------------------------ 6. Berkumpul di rumah Nenek ------------------------------ */
const SUARA_H1 = "Semua cerita hitungan terjawab dengan tepat. Oleh-oleh terbagi rapi untuk para tetangga.";
const SUARA_H2 = "Malam itu Igil, Kaka, Abang, dan Mamah berkumpul bersama Nenek. Perjalanan kereta sudah selesai.";
const SUARA_H3 = "Kata Nenek, kalian pintar menghitung yang berkurang di sepanjang jalan. Terima kasih sudah datang!";

export const ADEGAN_KUMPUL: AdeganStory = {
  id: "kumpul-nenek",
  judul: "Berkumpul di rumah Nenek",
  sumber: "Materi: hasil dan akhir cerita",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Semua terjawab")),
      tambah("terjawab", emo("ok", 150, 80, E.benar, 36)),
      tambah("Oleh-oleh", ...[0, 1, 2].map((i) => emo(`bk${i}`, 90 + i * 60, 140, E.bungkus, 26))),
      tambah("tetangga.", ...orang("tg", 262, 150, E.tetangga, "tetangga")),
    ),
    k(
      SUARA_H2,
      bersih(0),
      tambah(0, judul("Berkumpul bersama")),
      tambah("Malam", emo("bl", 266, 40, "\u{1F319}", 24)),
      tambah("Igil,", ...orang("ig", 30, 120, E.igil, "Igil")),
      tambah("Kaka,", ...orang("kk", 90, 120, E.kaka, "Kaka")),
      tambah("Abang,", ...orang("ab", 150, 120, E.abang, "Abang")),
      tambah("Mamah", ...orang("mm", 210, 120, E.mamah, "Mamah")),
      tambah("Nenek.", ...orang("nn", 270, 120, E.nenek, "Nenek")),
      tambah("selesai.", ...kartu("sl", 50, 160, 200, 24, W.emas, ["perjalanan kereta selesai"], 10)),
    ),
    k(SUARA_H3, sorotkan("pintar", "nn"), tambah("berkurang", emo("ht", 150, 70, E.hati, 28)), tambah("datang!", emo("rm", 60, 66, E.rumah, 26), emo("kr", 240, 70, E.kereta, 24))),
  ],
};

/* ------------------------------ 7. Penutup ------------------------------ */
const SUARA_Z1 = "Ingat langkah cerita hitungan: baca, cari bilangan dan kata kunci, lalu tulis kalimat pengurangan.";
const SUARA_Z2 = "Jawab dengan kalimat lengkap, lalu periksa dengan penjumlahan.";
const SUARA_Z3 = "Terima kasih, Igil, Kaka, Abang, Mamah, dan Nenek. Sampai jumpa di petualangan berikutnya!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: langkah cerita hitungan",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Ingat, ya!")),
      tambah("baca,", ...kartu("p1", 14, 34, 272, 30, W.langit, ["1. baca ceritanya"], 10)),
      tambah("kunci,", ...kartu("p2", 14, 70, 272, 30, W.hijauMuda, ["2. cari bilangan dan kata kunci"], 10)),
      tambah("tulis", ...kartu("p3", 14, 106, 272, 30, W.emas, ["3. tulis kalimat pengurangan"], 10)),
    ),
    k(SUARA_Z2, tambah("Jawab", ...kartu("p4", 14, 142, 272, 26, W.pink, ["4. jawab dengan kalimat lengkap"], 10)), tambah("periksa", ...kartu("p5", 14, 172, 272, 24, W.lavender, ["5. periksa dengan penjumlahan"], 10))),
    k(
      SUARA_Z3,
      bersih(0),
      tambah(0, judul("Sampai jumpa!"), emo("ht", 150, 66, E.hati, 30)),
      tambah("Igil,", ...orang("ig", 30, 140, E.igil, "Igil")),
      tambah("Kaka,", ...orang("kk", 90, 140, E.kaka, "Kaka")),
      tambah("Abang,", ...orang("ab", 150, 140, E.abang, "Abang")),
      tambah("Mamah,", ...orang("mm", 210, 140, E.mamah, "Mamah")),
      tambah("Nenek.", ...orang("nn", 270, 140, E.nenek, "Nenek")),
      tambah("berikutnya!", emo("ps", 150, 186, E.pesta, 22)),
    ),
  ],
};
