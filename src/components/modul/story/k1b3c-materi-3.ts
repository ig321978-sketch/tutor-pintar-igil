import type { AdeganStory } from "./logika-story";
import { E, W, emo, judul, kartu, kotak, kurangK, orang, tambahK, teks } from "./k1b3c-gambar";
import { bersih, k, sorotkan, tambah } from "./k1b3c-bantu";

/* Akhir "Kondektur dan Penumpang": semua catatan cocok, kereta mendekati desa Nenek, lalu penutup. Tanpa latihan. */

/* ------------------------------ 6. Semua catatan cocok ------------------------------ */
const SUARA_C1 = "Semua catatan kondektur sekarang cocok dengan banyak penumpang di gerbong. Tidak ada karcis yang tertukar.";
const SUARA_C2 = "Kondektur berterima kasih. Abang menunjukkan catatannya: empat ditambah tiga, tujuh dikurangi tiga, sembilan dikurangi lima, enam ditambah tiga.";
const SUARA_C3 = "Igil melihat sawah dan gunung dari jendela. Kata Mamah, sebentar lagi kita tiba di desa Nenek!";
const CATATAN = [
  { t: tambahK(4, 3), at: "empat" },
  { t: kurangK(7, 3), at: "tujuh" },
  { t: kurangK(9, 5), at: "sembilan" },
  { t: tambahK(6, 3), at: "enam" },
];

export const ADEGAN_COCOK: AdeganStory = {
  id: "catatan-cocok",
  judul: "Semua catatan cocok",
  sumber: "Materi: hasil dan catatan kondektur",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Semua catatan cocok")),
      tambah("kondektur", ...orang("kd", 80, 110, E.kondektur, "kondektur")),
      tambah("cocok", emo("ok", 150, 96, E.benar, 30)),
      tambah("penumpang", ...[0, 1, 2].map((i) => emo(`pn${i}`, 200 + i * 28, 110, E.penumpang, 22))),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Catatan kondektur"), ...orang("ab", 34, 110, E.abang, "Abang")),
      tambah("catatannya:", kotak("ct", 74, 32, 212, 160, "#FFFFFF", W.biru, { rx: 6, tebal: 2, z: -1 })),
      ...CATATAN.map((c, i) => tambah(c.at, emo(`ck${i}`, 104, 62 + i * 34, E.karcis, 14), teks(`ct${i}`, 184, 68 + i * 34, c.t, 16, W.biru))),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Hampir sampai")),
      tambah("Igil", ...orang("ig", 40, 166, E.igil, "Igil")),
      tambah("sawah", ...[0, 1, 2, 3, 4].map((i) => emo(`sw${i}`, 40 + i * 30, 120, E.sawah, 22))),
      tambah("gunung.", emo("gn", 240, 80, E.gunung, 40)),
      tambah("Mamah,", ...orang("mm", 120, 166, E.mamah, "Mamah")),
      tambah("Nenek!", ...kartu("dn", 190, 150, 100, 24, W.emas, ["desa Nenek"], 10)),
    ),
  ],
};

/* ------------------------------ 7. Penutup ------------------------------ */
const SUARA_Z1 = "Ingat, penjumlahan dan pengurangan saling berkebalikan.";
const SUARA_Z2 = "Tiga bilangan membuat keluarga bilangan. Periksa pengurangan dengan penjumlahan, dan cari bilangan yang hilang dengan pengurangan.";
const SUARA_Z3 = "Coba pikirkan, enam ditambah berapa sama dengan sepuluh? Terima kasih, Abang. Sampai jumpa di desa Nenek!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: tambah dan kurang berkebalikan",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Ingat, ya!")), tambah("berkebalikan.", ...kartu("p1", 14, 34, 272, 34, W.langit, ["tambah dan kurang berkebalikan"], 10))),
    k(
      SUARA_Z2,
      tambah("keluarga", ...kartu("p2", 14, 76, 272, 34, W.hijauMuda, ["3 bilangan: 4 kalimat"], 10)),
      tambah("Periksa", ...kartu("p3", 14, 118, 272, 34, W.emas, ["periksa kurang dengan tambah"], 10)),
      tambah("hilang", ...kartu("p4", 14, 160, 272, 34, W.pink, ["yang hilang: pakai kebalikan"], 10)),
    ),
    k(
      SUARA_Z3,
      bersih(0),
      tambah(0, judul("Sampai jumpa!"), emo("ht", 150, 66, E.hati, 30)),
      tambah("sepuluh?", teks("tq", 150, 104, "6 + ? = 10", 14, W.merah)),
      tambah("Abang.", ...orang("ab", 110, 140, E.abang, "Abang")),
      tambah("Nenek!", emo("rm", 200, 140, E.rumah, 30)),
      sorotkan("Nenek!", "ab"),
    ),
  ],
};
