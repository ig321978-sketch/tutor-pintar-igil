import type { AdeganStory } from "./logika-story";
import { W, anak, angkaNT, barisBil, emo, judul, kartu, kartuTebak, kotak, lepasKe, papanNT, teks, tumpukBil, wadahKe, type Kel } from "./k2b7A-gambar";
import { bersih, hapus, idx, k, redamkan, sorotkan, tambah } from "./k2b7A-bantu";

/* ------------------------------ 9. Membaca nama bilangan ------------------------------ */
const SUARA_B1 = "Sekarang kita belajar membaca nama bilangan. Kita mulai dari nama puluhan yang bulat.";
const SUARA_B2 = "Dua puluh, tiga puluh, empat puluh, dan lima puluh. Lambang dan namanya harus cocok.";
const SUARA_B3 = "Lanjutkan lagi. Enam puluh, tujuh puluh, delapan puluh, dan sembilan puluh.";
const SUARA_B4 = "Sesudah nama puluhan, kita sebut satuannya. Misalnya enam puluh dua, delapan puluh tujuh, dan tiga puluh lima.";
const SUARA_B5 = "Hati-hati, dua puluh enam dan enam puluh dua adalah dua bilangan yang berbeda.";
const WARNA_BIL = [W.krem, W.hijauMuda, W.langit, W.pink];

export const ADEGAN_BACA_TULIS: AdeganStory = {
  id: "baca-tulis",
  judul: "Membaca dan menulis bilangan",
  sumber: "Materi: membaca nama bilangan",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Membaca nama bilangan")), tambah(idx(SUARA_B1, "membaca"), emo("bc", 150, 100, "\u{1F522}", 56)), tambah(idx(SUARA_B1, "puluhan"), ...kartu("bn", 50, 140, 200, 30, W.emas, ["nama puluhan yang bulat"], 11))),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, judul("Nama puluhan")),
      tambah(idx(SUARA_B2, "Dua"), ...barisBil("bl1", 30, 20, WARNA_BIL[0])),
      tambah(idx(SUARA_B2, "tiga"), ...barisBil("bl2", 66, 30, WARNA_BIL[1])),
      tambah(idx(SUARA_B2, "empat"), ...barisBil("bl3", 102, 40, WARNA_BIL[2])),
      tambah(idx(SUARA_B2, "lima"), ...barisBil("bl4", 138, 50, WARNA_BIL[3])),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Nama puluhan")),
      tambah(idx(SUARA_B3, "Enam"), ...barisBil("bl1", 30, 60, WARNA_BIL[0])),
      tambah(idx(SUARA_B3, "tujuh"), ...barisBil("bl2", 66, 70, WARNA_BIL[1])),
      tambah(idx(SUARA_B3, "delapan"), ...barisBil("bl3", 102, 80, WARNA_BIL[2])),
      tambah(idx(SUARA_B3, "sembilan"), ...barisBil("bl4", 138, 90, WARNA_BIL[3])),
    ),
    k(
      SUARA_B4,
      bersih(0),
      tambah(0, judul("Puluhan lalu satuan")),
      tambah(idx(SUARA_B4, "dua,"), ...barisBil("bl1", 30, 62, WARNA_BIL[0])),
      tambah(idx(SUARA_B4, "tujuh,"), ...barisBil("bl2", 66, 87, WARNA_BIL[1])),
      tambah(idx(SUARA_B4, "lima."), ...barisBil("bl3", 102, 35, WARNA_BIL[2])),
    ),
    k(
      SUARA_B5,
      bersih(0),
      tambah(0, judul("Jangan tertukar")),
      tambah(idx(SUARA_B5, "dua"), ...tumpukBil("bl1", 14, 56, 26, W.krem, 128)),
      tambah(idx(SUARA_B5, "enam", 2), ...tumpukBil("bl2", 158, 56, 62, W.pink, 128)),
      tambah(idx(SUARA_B5, "berbeda."), teks("bb", 150, 140, "dua bilangan yang berbeda", 12, W.ungu)),
    ),
  ],
};

/* ------------------------------ 10. Angka tertukar ------------------------------ */
const PG: Kel = { id: "pg", w: 2, s: 6, x: 105, y: 96, warna: W.krem, warnaS: W.emas, emoji: "⭐" };
const SUARA_G1 = "Perhatikan bintang di layar. Ada dua bungkus dan enam bintang lepas.";
const SUARA_G2 = "Itu dua puluhan dan enam satuan. Jadi bilangannya dua puluh enam.";
const SUARA_G3 = "Kalau angkanya tertukar, bilangannya jadi enam puluh dua. Itu bukan banyak bintang di layar.";
const SUARA_G4 = "Jadi angka puluhan ada di sebelah kiri, dan angka satuan ada di sebelah kanan. Angka dua di kiri, angka enam di kanan.";

export const ADEGAN_TERTUKAR: AdeganStory = {
  id: "tertukar",
  judul: "Hati-hati, angka tertukar",
  sumber: "Materi: angka puluhan dan satuan tertukar",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Hati-hati, angka tertukar")),
      tambah(idx(SUARA_G1, "dua"), ...wadahKe(PG, 1), ...wadahKe(PG, 2)),
      tambah(idx(SUARA_G1, "enam"), ...[1, 2, 3, 4, 5, 6].flatMap((j) => lepasKe(PG, j))),
    ),
    k(
      SUARA_G2,
      tambah(idx(SUARA_G2, "dua"), ...barisBil("bl1", 138, 26, W.hijauMuda), teks("bl1-ok", 270, 159, "✅", 14)),
      sorotkan(idx(SUARA_G2, "Itu"), "pg-w1", "pg-w2"),
    ),
    k(
      SUARA_G3,
      redamkan(0, "pg-w1", "pg-w2"),
      tambah(idx(SUARA_G3, "tertukar,"), ...barisBil("bl2", 170, 62, W.merahMuda), teks("bl2-x", 270, 191, "❌", 14)),
      sorotkan(idx(SUARA_G3, "bukan"), "bl2-k"),
    ),
    k(
      SUARA_G4,
      hapus(0, "bl1-k", "bl1-a", "bl1-b", "bl1-ok", "bl2-k", "bl2-a", "bl2-b", "bl2-x"),
      tambah(idx(SUARA_G4, "puluhan"), ...papanNT(28)),
      tambah(idx(SUARA_G4, "dua", 1), angkaNT("p", 2, 28)),
      tambah(idx(SUARA_G4, "enam"), angkaNT("s", 6, 28)),
    ),
  ],
};

/* ------------------------------ 11. Memperkirakan banyak ikan ------------------------------ */
const IKAN = [
  [112, 64, "\u{1F420}"],
  [150, 52, "\u{1F41F}"],
  [188, 70, "\u{1F420}"],
  [124, 96, "\u{1F41F}"],
  [168, 100, "\u{1F420}"],
  [138, 124, "\u{1F420}"],
  [186, 128, "\u{1F41F}"],
] as const;
const idIkan = IKAN.map((_, q) => `if${q + 1}`);
const SUARA_K1 = "Sekarang Kira dan Malosi melihat banyak ikan hias di kolam. Ikannya terlalu banyak untuk dihitung satu per satu.";
const SUARA_K2 = "Karena terlalu banyak, mereka menebak dulu. Menebak berarti memperkirakan banyaknya.";
const SUARA_K3 = "Kira menebak, kira-kira ada lima puluh ikan di kolam itu.";
const SUARA_K4 = "Malosi menebak lebih banyak, yaitu enam puluh ikan.";
const SUARA_K5 = "Menebak boleh keliru. Menebak melatih kita memperkirakan banyak benda sebelum menghitung.";

export const ADEGAN_PERKIRAAN: AdeganStory = {
  id: "perkiraan",
  judul: "Menebak banyak ikan",
  sumber: "Materi: memperkirakan banyak benda",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Menebak banyak ikan")),
      tambah(idx(SUARA_K1, "Kira"), ...anak("kira", 40, 66)),
      tambah(idx(SUARA_K1, "Malosi"), ...anak("malosi", 260, 66)),
      tambah(idx(SUARA_K1, "kolam."), kotak("kolam", 90, 36, 120, 108, "#BAE6FD", W.biru, { rx: 14 }), ...IKAN.map(([x, y, e], q) => emo(`if${q + 1}`, x, y, e, 18))),
    ),
    k(SUARA_K2, tambah(idx(SUARA_K2, "menebak"), emo("pk-t", 150, 172, "\u{1F914}", 28)), tambah(idx(SUARA_K2, "memperkirakan"), teks("pk-l", 150, 195, "memperkirakan", 11, W.ungu))),
    k(SUARA_K3, hapus(0, "pk-t", "pk-l"), tambah(idx(SUARA_K3, "menebak,"), ...kartuTebak(1, 8, "Kira", 50, 128))),
    k(SUARA_K4, tambah(idx(SUARA_K4, "menebak"), ...kartuTebak(2, 212, "Malosi", 60, 128))),
    k(
      SUARA_K5,
      hapus(0, "kolam", ...idIkan),
      tambah(idx(SUARA_K5, "boleh"), ...kartu("kr", 40, 40, 220, 34, W.emas, ["menebak boleh keliru"], 12)),
      tambah(idx(SUARA_K5, "melatih"), emo("bl", 150, 108, "\u{1F4A1}", 34)),
    ),
  ],
};
