import type { AdeganStory } from "./logika-story";
import { W, balon, deret, emo, garis, kartu, kotak, tabel, teks } from "./k6b2c-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k6b2c-bantu";
import { kutipanLokal } from "./kutipan-lokal";

/* ------------------------------ 1. Permasalahan Toko Herbal Tani ------------------------------ */
export const ADEGAN_TOKO: AdeganStory = {
  id: "toko-herbal",
  judul: "Permasalahan Toko Herbal Tani",
  sumber: "Materi: Toko Herbal Tani",
  latar: "#F0FDF4",
  kutipan: kutipanLokal("k6b2c-materi-1.ts:1"),
  ketukan: [
    k(
      "Sub-Bab C membahas penerapan rasio. Kita mulai dari Toko Herbal Tani, yang menjual berbagai bibit tanaman obat maupun bibit tanaman hias.",
      tambah(0, teks("jud", 150, 24, "C. Penerapan Rasio", 14, W.ungu)),
      tambah("Toko", emo("toko", 58, 100, "🏪", 38), teks("tt", 58, 120, "Toko Herbal Tani", 8)),
      tambah("obat", emo("eo", 150, 96, "🌿", 30), teks("to", 150, 114, "tanaman obat", 8, W.hijau)),
      tambah("hias", emo("eh", 240, 96, "🌸", 30), teks("th", 240, 114, "tanaman hias", 8, W.merah)),
    ),
    k(
      "Persediaan tanaman hias dan tanaman obat memiliki rasio tiga banding dua.",
      bersih(0),
      tambah("hias", teks("lh", 38, 82, "hias", 8, W.merah), deret("h", 60, 66, 3, 24, W.hiasMuda)),
      tambah("obat", teks("lo", 38, 122, "obat", 8, W.hijau), deret("o", 60, 106, 2, 24, W.obatMuda)),
      tambah("banding", teks("r32", 236, 102, "3 : 2", 24, W.ungu)),
    ),
    k(
      "Coba pikirkan dulu. Dapatkah kamu menentukan rasio tanaman hias terhadap jumlah keseluruhan tanaman? Berikan alasanmu.",
      tambah("hias", teks("q1", 150, 166, "hias : seluruh = ?", 13, W.merah)),
      tambah("keseluruhan", kotak("all", 54, 58, 148, 80, "none", W.salem, { putus: true, rx: 6 })),
      sorotkan("alasanmu.", "all"),
    ),
    k(
      "Misalkan tanaman hias ada tiga dan tanaman obat ada dua. Maka seluruhnya lima, sehingga rasio hias terhadap seluruh adalah tiga banding lima.",
      tambah("Maka", teks("jml", 150, 190, "3 + 2 = 5", 13, W.hijau)),
      ubah("banding", { id: "q1", isi: "hias : seluruh = 3 : 5", warna: W.hijau }),
    ),
    k(
      "Rasio ini membandingkan satu bagian dengan keseluruhan. Sebentar lagi kita juga belajar rasio pada durasi waktu.",
      bersih(0),
      tambah("bagian", kartu("kb", 40, 40, 220, "bagian : bagian  (hias : obat)", W.hiasMuda)),
      tambah("keseluruhan", kartu("kk", 40, 82, 220, "bagian : keseluruhan  (hias : seluruh)", W.obatMuda)),
      tambah("durasi", kartu("kd", 40, 124, 220, "rasio pada durasi waktu", W.langit), emo("jam", 150, 180, "⏰", 28)),
    ),
  ],
};

/* ------------------------------ 2. Latihan bersama: angka penjualan bibit tanaman ------------------------------ */
const T25 = tabel("tb", 18, 58, [80, 58, 58, 68], 26, [
  ["", "Hias", "Obat", "Total"],
  ["Rasio", "4", "5", "4 + 5 = 9"],
  ["Sebenarnya", "?", "?", "72"],
]);

export const ADEGAN_PENJUALAN: AdeganStory = {
  id: "penjualan-bibit",
  judul: "Latihan bersama: angka penjualan bibit tanaman",
  sumber: "Materi: penjualan bibit tanaman",
  latar: "#FFF7ED",
  kutipan: kutipanLokal("k6b2c-materi-1.ts:2"),
  ketukan: [
    k(
      "Pada bulan Juni, toko menjual tujuh puluh dua bibit tanaman hias dan tanaman obat. Rasio penjualan hias banding obat adalah empat banding lima.",
      tambah(0, teks("jud", 150, 24, "Latihan bersama · Juni", 12, W.ungu)),
      tambah("tujuh", kartu("k72", 70, 44, 160, "total terjual: 72 bibit", W.krem, 10), emo("bibit", 150, 104, "🌱", 30)),
      tambah("banding@2", teks("r45", 150, 160, "hias : obat = 4 : 5", 16, W.ungu)),
    ),
    k(
      "Jenis tanaman apa yang lebih banyak terjual? Karena lima lebih besar dari empat, tanaman obat yang lebih banyak terjual.",
      bersih(0),
      tambah(0, teks("l4", 40, 88, "hias 4", 8, W.merah), deret("a", 62, 70, 4, 24, W.hiasMuda), teks("l5", 40, 130, "obat 5", 8, W.hijau), deret("b", 62, 112, 5, 24, W.obatMuda)),
      tambah("obat", teks("lb", 150, 172, "obat lebih banyak terjual", 12, W.hijau)),
      sorotkan("obat", "b0", "b1", "b2", "b3", "b4"),
    ),
    k(
      "Kita pakai tabel rasio. Kolom pertama empat, kolom kedua lima, dan kolom ketiga adalah jumlahnya, yaitu empat ditambah lima sama dengan sembilan.",
      bersih(0),
      tambah(0, T25[0]),
      tambah("pertama", T25[1]),
      tambah("ketiga", teks("ktg", 150, 160, "kolom ketiga = jumlah rasio", 11, W.salem)),
    ),
    k(
      "Total sebenarnya adalah tujuh puluh dua. Karena sembilan kali delapan sama dengan tujuh puluh dua, semua angka rasio dikali delapan.",
      tambah("Total", T25[2]),
      tambah("kali", teks("k8", 150, 160, "semua angka rasio dikali 8", 12, W.merah)),
      sorotkan("kali", "tb-2-3-k"),
    ),
    k(
      "Hias: empat kali delapan sama dengan tiga puluh dua. Obat: lima kali delapan sama dengan empat puluh. Jadi ada tiga puluh dua bibit hias dan empat puluh bibit obat, jumlahnya tujuh puluh dua.",
      ubah("tiga", { id: "tb-2-1-t", isi: "32", warna: W.merah }),
      ubah("empat@2", { id: "tb-2-2-t", isi: "40", warna: W.hijau }),
      tambah("jumlahnya", teks("ck", 150, 190, "32 + 40 = 72", 13, W.hijau)),
      hapus("jumlahnya", "k8"),
    ),
    k(
      "Hati-hati membedakan dua macam rasio. Rasio hias terhadap obat membandingkan bagian dengan bagian. Itu disebut part to part.",
      bersih(0),
      tambah(0, teks("jd2", 150, 26, "bagian terhadap bagian", 13, W.ungu)),
      tambah("hias", deret("h", 60, 56, 4, 20, W.hiasMuda), deret("o", 150, 56, 5, 20, W.obatMuda)),
      tambah("obat", teks("pp", 150, 118, "hias : obat = 4 : 5", 15)),
      tambah("part", teks("pp2", 150, 150, "(part to part)", 12, W.salem)),
    ),
    k(
      "Rasio hias terhadap seluruh adalah empat banding sembilan, dan obat terhadap seluruh adalah lima banding sembilan. Ini bagian terhadap keseluruhan, atau part to whole.",
      bersih(0),
      tambah(0, teks("jd3", 150, 26, "bagian terhadap keseluruhan", 13, W.ungu)),
      tambah("hias", deret("h", 60, 44, 4, 18, W.hiasMuda, 2), deret("o", 140, 44, 5, 18, W.obatMuda, 2), garis("br", 60, 74, 180, 0, W.biru, 2)),
      tambah("banding", teks("hs", 150, 108, "hias : seluruh = 4 : 9", 14, W.merah)),
      tambah("banding@2", teks("os", 150, 136, "obat : seluruh = 5 : 9", 14, W.hijau)),
      tambah("part", teks("pw", 150, 166, "(part to whole)", 12, W.salem), balon("bl", 150, 176, ["seluruh = 9"], 90, "#FEF9C3")),
    ),
  ],
};
