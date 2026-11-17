import type { AdeganStory } from "./logika-story";
import { E, W, emo, judul, kartu, kotak, orang, teks, tulis } from "./k1b3b-gambar";
import { bersih, k, sorotkan, tambah } from "./k1b3b-bantu";

/* Akhir "Pindah Kereta di Stasiun Besar": semua duduk di kereta lanjutan, catatan baru, kondektur datang, lalu penutup. Tanpa latihan. */

/* ------------------------------ 6. Semua duduk di kereta lanjutan ------------------------------ */
const SUARA_H1 = "Mereka duduk di baris yang punya empat kursi kosong. Koper, tas, dan oleh-oleh lengkap.";
const SUARA_H2 = "Kaka menulis catatan baru. Tujuh dikurangi lima, tujuh dikurangi dua, delapan dikurangi tiga, sepuluh dikurangi enam.";
const SUARA_H3 = "Kereta lanjutan mulai berjalan. Lalu kondektur datang memeriksa karcis dan menghitung penumpang.";
const CATATAN = [
  { t: tulis(7, 5), at: "Tujuh" },
  { t: tulis(7, 2), at: "tujuh@2" },
  { t: tulis(8, 3), at: "delapan" },
  { t: tulis(10, 6), at: "sepuluh" },
];

export const ADEGAN_DUDUK: AdeganStory = {
  id: "semua-duduk",
  judul: "Semua duduk di kereta lanjutan",
  sumber: "Materi: hasil dan catatan baru",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Semua duduk")),
      tambah("duduk", ...orang("ig", 60, 100, E.igil, "Igil"), ...orang("kk", 120, 100, E.kaka, "Kaka"), ...orang("ab", 180, 100, E.abang, "Abang"), ...orang("mm", 240, 100, E.mamah, "Mamah")),
      tambah("kursi", ...[60, 120, 180, 240].map((x, i) => emo(`ks${i}`, x, 132, E.kursi, 22))),
      tambah("Koper,", emo("kp", 70, 176, E.koper, 22)),
      tambah("tas,", emo("ts", 150, 176, E.tas, 22)),
      tambah("lengkap.", emo("bk", 230, 176, E.bungkus, 22), emo("ok", 270, 40, E.benar, 22)),
    ),
    k(
      SUARA_H2,
      bersih(0),
      tambah(0, judul("Catatan baru Kaka"), ...orang("kk", 34, 110, E.kaka, "Kaka")),
      tambah("catatan", kotak("ct", 74, 32, 212, 160, "#FFFFFF", W.biru, { rx: 6, tebal: 2, z: -1 }), emo("ce", 270, 48, E.catatan, 16)),
      ...CATATAN.map((c, i) => tambah(c.at, emo(`ck${i}`, 104, 62 + i * 34, E.karcis, 14), teks(`ct${i}`, 184, 68 + i * 34, c.t, 16, W.biru))),
    ),
    k(
      SUARA_H3,
      bersih(0),
      tambah(0, judul("Kereta lanjutan berjalan")),
      tambah("berjalan.", emo("kr", 90, 92, E.kereta, 44), kotak("rel", 10, 124, 160, 5, "#94A3B8", W.biru, { rx: 2, z: -1 })),
      tambah("kondektur", ...orang("kd", 230, 100, E.kondektur, "kondektur")),
      tambah("karcis", emo("kc", 230, 150, E.karcis, 24)),
      tambah("penumpang.", ...kartu("hp", 40, 170, 220, 22, W.pink, ["menghitung penumpang"], 10)),
      sorotkan("penumpang.", "kd"),
    ),
  ],
};

/* ------------------------------ 7. Penutup ------------------------------ */
const SUARA_Z1 = "Ingat, satu bagan pasangan memberi dua kalimat pengurangan.";
const SUARA_Z2 = "Dikurangi nol hasilnya tetap. Dikurangi bilangan yang sama hasilnya nol. Hitung mundur di garis bilangan.";
const SUARA_Z3 = "Untuk sepuluh, cari pasangan sepuluhnya. Sampai jumpa saat kondektur datang!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: ingat berbagai cara",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Ingat, ya!")), tambah("bagan", ...kartu("p1", 14, 34, 272, 34, W.langit, ["satu bagan, dua kalimat pengurangan"], 9.6))),
    k(
      SUARA_Z2,
      tambah("nol", ...kartu("p2", 14, 76, 272, 34, W.hijauMuda, ["dikurangi nol: tetap"], 10)),
      tambah("sama", ...kartu("p3", 14, 118, 272, 34, W.merahMuda, ["dikurangi bilangan yang sama: nol"], 9.6)),
      tambah("mundur", ...kartu("p4", 14, 160, 272, 34, W.emas, ["mundur di garis bilangan"], 10)),
    ),
    k(
      SUARA_Z3,
      bersih(0),
      tambah(0, judul("Sampai jumpa!"), emo("ht", 150, 66, E.hati, 30)),
      tambah("sepuluhnya.", ...kartu("p5", 60, 96, 180, 26, W.lavender, ["10: cari pasangannya"], 10)),
      tambah("Sampai", ...orang("ig", 45, 160, E.igil, "Igil"), ...orang("kk", 115, 160, E.kaka, "Kaka"), ...orang("ab", 185, 160, E.abang, "Abang"), ...orang("mm", 255, 160, E.mamah, "Mamah")),
      tambah("datang!", emo("kd", 150, 186, E.kondektur, 20)),
    ),
  ],
};
