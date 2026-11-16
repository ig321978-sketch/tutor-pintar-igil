import type { AdeganStory, Obj } from "./logika-story";
import { W, bentukBebas, barisTabel, baris, emo, kartu, kotak, labelSisi, panah, segiBeraturan, tanda, teks } from "./k5b4d-gambar";
import { bersih, k, tambah, ubah } from "./k5b4d-bantu";
import { kutipanLokal } from "./kutipan-lokal";

const jud = (isi: string, y = 20, u = 12): Obj => teks("jud", 150, y, isi, u, W.ungu);

/** Pentagon tidak beraturan untuk contoh sisi tidak sama panjang (hanya bentuk gambar, panjang sisi diberi label). */
const TITIK_BEBAS: [number, number][] = [[-30, -34], [26, -38], [48, 6], [6, 40], [-44, 14]];

/* ------------------------------ 8. Ayo Merangkum (BS hlm. 124; Panduan Guru hlm. 158 dan 159) ------------------------------ */
export const ADEGAN_RANGKUM_D: AdeganStory = {
  id: "rangkum-d",
  judul: "Merangkum: tabel banyak sisi dan keliling",
  sumber: "Materi: rangkuman keliling segi banyak",
  latar: "#F5F3FF",
  kutipan: kutipanLokal("k5b4d-materi-3.ts:1"),
  ketukan: [
    k(
      "Sekarang kita merangkum. Lengkapi tabel dengan tiga kolom: bangun datar, banyak sisi, dan keliling. Barisnya persegi, segi lima, segi enam, dan segi delapan.",
      tambah(0, jud("Merangkum", 20)),
      tambah("tabel", barisTabel("rh", 10, 30, [76, 96, 108], ["Bangun", "Banyak sisi", "Keliling"], W.biru, 8.4, 20, W.putih)),
      tambah("persegi,", barisTabel("r1", 10, 52, [76, 96, 108], ["", "", ""], W.krem, 8.4, 28), kotak("i1", 38, 58, 16, 16, W.muda, W.biru, { rx: 1, tebal: 1.6 })),
      tambah("lima,", barisTabel("r2", 10, 80, [76, 96, 108], ["", "", ""], W.putih, 8.4, 28), segiBeraturan("i2", 46, 94, 5, 10, W.muda, W.biru, { tebal: 1.6 })),
      tambah("enam,", barisTabel("r3", 10, 108, [76, 96, 108], ["", "", ""], W.krem, 8.4, 28), segiBeraturan("i3", 46, 122, 6, 10, W.muda, W.biru, { tebal: 1.6 })),
      tambah("delapan.", barisTabel("r4", 10, 136, [76, 96, 108], ["", "", ""], W.putih, 8.4, 28), segiBeraturan("i4", 46, 150, 8, 10, W.muda, W.biru, { tebal: 1.6 })),
    ),
    k(
      "Baris pertama sudah kita isi: persegi memiliki empat sisi, kelilingnya empat kali panjang sisinya. Pada baris segi lima, banyak sisinya lima dan kelilingnya lima kali panjang sisinya.",
      ubah("empat", { id: "r1-t1", isi: "4", warna: W.merah }),
      ubah("empat@2", { id: "r1-t2", isi: "4 x panjang sisi", warna: W.merah }),
      ubah("lima@2", { id: "r2-t1", isi: "5", warna: W.hijau }),
      ubah("lima@3", { id: "r2-t2", isi: "5 x panjang sisi", warna: W.hijau }),
    ),
    k(
      "Baris segi enam diisi banyak sisi enam dan keliling enam kali panjang sisinya. Baris segi delapan diisi delapan sisi dan keliling delapan kali panjang sisinya.",
      ubah("enam@2", { id: "r3-t1", isi: "6", warna: W.hijau }),
      ubah("enam@3", { id: "r3-t2", isi: "6 x panjang sisi", warna: W.hijau }),
      ubah("delapan@2", { id: "r4-t1", isi: "8", warna: W.hijau }),
      ubah("delapan@3", { id: "r4-t2", isi: "8 x panjang sisi", warna: W.hijau }),
    ),
    k(
      "Dari tabel, kita bisa melihat polanya. Pada bangun beraturan, keliling dicari dengan mengalikan banyaknya sisi dengan panjang salah satu sisinya.",
      bersih(0),
      tambah(0, jud("Pola dari tabel", 22)),
      tambah("keliling", kartu("pl", 20, 44, 260, 50, W.hijauMuda, ["keliling", "banyak sisi x panjang satu sisi"], 10)),
      tambah("mengalikan", teks("pc1", 150, 126, "4 x s   5 x s   6 x s   8 x s", 10.4, W.biru)),
      tambah("panjang", teks("pc2", 150, 150, "s = panjang satu sisi", 9, W.ungu)),
    ),
    k(
      "Sekarang kita coba pada segi delapan. Kalau setiap sisinya tiga sentimeter, kelilingnya delapan kali tiga sama dengan dua puluh empat sentimeter. Mudah, bukan?",
      bersih(0),
      tambah(0, jud("Contoh: segi delapan", 20, 11)),
      tambah("segi", segiBeraturan("o8", 80, 112, 8, 42, W.hijauMuda)),
      tambah("tiga", labelSisi("ls", 80, 112, 8, 42, "3", 10, 8.4)),
      tambah("kelilingnya", teks("ot", 215, 84, "8 x 3 = 24", 12.4, W.merah), teks("ot2", 215, 104, "keliling 24 cm", 9.4, W.hijau)),
      tambah("Mudah,", kartu("ob", 160, 126, 128, 34, W.krem, ["coba sendiri ya"], 9)),
    ),
  ],
};

/* ------------------------------ 9. Sisi tidak sama panjang (BS hlm. 124; Panduan Guru hlm. 159) ------------------------------ */
export const ADEGAN_TIDAK_SAMA: AdeganStory = {
  id: "tidak-sama",
  judul: "Jika sisi-sisinya tidak sama panjang",
  sumber: "Materi: sisi tidak sama panjang",
  latar: "#FDF2F8",
  kutipan: kutipanLokal("k5b4d-materi-3.ts:2"),
  ketukan: [
    k(
      "Sekarang pertanyaan menarik. Kalau sisi-sisinya tidak sama panjang, bagaimana cara menghitung kelilingnya?",
      tambah(0, jud("Bagaimana jika tidak sama?", 22)),
      tambah("pertanyaan", emo("q1", 40, 90, "🧒", 34)),
      tambah("sisi-sisinya", kartu("q2", 70, 60, 214, 56, W.krem, ["sisi tidak sama panjang,", "bagaimana kelilingnya?"], 9.4)),
      tambah("bagaimana", bentukBebas("q3", 150, 160, TITIK_BEBAS.map(([x, y]) => [x * 0.45, y * 0.45] as [number, number]), W.merahMuda)),
    ),
    k(
      "Jawabannya begini. Kalau sisi-sisinya tidak sama panjang, keliling diperoleh dengan cara menjumlahkan semua panjang sisinya.",
      bersih(0),
      tambah(0, jud("Jawabannya", 22)),
      tambah("Jawabannya", emo("a1", 40, 90, "👧", 34)),
      tambah("keliling", kartu("a2", 70, 56, 214, 66, W.hijauMuda, ["keliling diperoleh dengan", "menjumlahkan semua", "panjang sisinya"], 9.4)),
    ),
    k(
      "Misalnya ada segi lima yang sisinya tiga, tiga, tiga, empat, dan lima sentimeter. Ini contoh kita sendiri. Kelilingnya dijumlahkan satu per satu, yaitu delapan belas sentimeter.",
      bersih(0),
      tambah(0, jud("Contoh: sisi berbeda", 20, 11)),
      tambah("segi", bentukBebas("b0", 82, 110, TITIK_BEBAS, W.krem)),
      tambah("tiga", teks("b1", 36, 70, "3", 9, W.merah), teks("b2", 82, 66, "3", 9, W.merah), teks("b3", 134, 96, "3", 9, W.merah)),
      tambah("empat,", teks("b4", 100, 164, "4", 9, W.merah)),
      tambah("lima@2", teks("b5", 24, 140, "5", 9, W.merah)),
      tambah("sendiri.", teks("bt", 232, 70, "contoh kita", 8.6, W.ungu)),
      tambah("Kelilingnya", teks("bs", 232, 104, "3+3+3+4+5 = 18", 10, W.biru), teks("bk", 232, 124, "keliling 18 cm", 9.4, W.hijau)),
    ),
    k(
      "Hati-hati, rumus kali tidak boleh dipakai di sini. Kalau lima kali tiga dipakai, hasilnya lima belas, padahal keliling yang benar delapan belas. Perkalian hanya berlaku bila semua sisinya sama panjang.",
      bersih(0),
      tambah(0, jud("Awas: jangan dikalikan", 22)),
      tambah("Kalau", baris("w1", 30, 44, 240, "5 x 3 = 15", W.merahMuda, 11, 28), tanda("w1x", 258, 64, false)),
      tambah("padahal", baris("w2", 30, 84, 240, "3+3+3+4+5 = 18", W.hijauMuda, 11, 28), tanda("w2c", 258, 104, true)),
      tambah("Perkalian", teks("w3", 150, 148, "kali hanya jika semua sisi sama", 9.4, W.ungu)),
    ),
    k(
      "Jadi ada dua aturan. Kalau sisi-sisinya sama panjang: kalikan banyak sisi dengan panjang sisi. Kalau sisi-sisinya tidak sama panjang: jumlahkan semua sisinya.",
      bersih(0),
      tambah(0, jud("Dua aturan keliling", 22)),
      tambah("sama", kartu("d1", 20, 44, 260, 52, W.hijauMuda, ["sisi sama panjang", "banyak sisi x panjang sisi"], 9.6)),
      tambah("tidak", kartu("d2", 20, 108, 260, 52, W.krem, ["sisi tidak sama panjang", "jumlahkan semua sisi"], 9.6)),
    ),
  ],
};

/* ------------------------------ 10. Akhir pembelajaran dan Refleksi 13-15 (Panduan Guru hlm. 159; BS hlm. 129) ------------------------------ */
export const ADEGAN_AKHIR_D: AdeganStory = {
  id: "akhir-d",
  judul: "Pesan guru: penguatan, renungan, tantangan",
  sumber: "Materi: pesan guru dan tantangan",
  latar: "#F0F9FF",
  kutipan: kutipanLokal("k5b4d-materi-3.ts:3"),
  ketukan: [
    k(
      "Sekarang pesan dari guru. Untuk segi lima, segi enam, dan segi delapan beraturan, cara menghitung kelilingnya sama. Coba jelaskan lagi dengan kata-katamu sendiri.",
      tambah(0, jud("Penguatan di akhir", 22)),
      tambah("lima,", segiBeraturan("e5", 54, 90, 5, 28), teks("e5t", 54, 140, "5 x sisi", 9.6, W.merah)),
      tambah("enam,", segiBeraturan("e6", 150, 90, 6, 28, W.krem), teks("e6t", 150, 140, "6 x sisi", 9.6, W.merah)),
      tambah("delapan", segiBeraturan("e8", 246, 90, 8, 28, W.hijauMuda), teks("e8t", 246, 140, "8 x sisi", 9.6, W.merah)),
      tambah("jelaskan", emo("eq", 150, 184, "💬", 22), teks("eqt", 190, 184, "jelaskan ulang", 8.6, W.ungu)),
    ),
    k(
      "Ingat pesan pentingnya: banyak sisi pada segi banyak beraturan akan menjadi pengali dalam rumus keliling.",
      bersih(0),
      tambah(0, jud("Yang perlu diingat", 22)),
      tambah("banyak", emo("f1", 150, 76, "💡", 34)),
      tambah("pengali", kartu("f2", 30, 94, 240, 40, W.hijauMuda, ["banyak sisi = pengali"], 11)),
      tambah("rumus", teks("f3", 150, 160, "keliling = banyak sisi x panjang sisi", 9.4, W.merah)),
    ),
    k(
      "Renungan untukmu. Apakah kamu bisa menemukan cara menghitung keliling segi lima beraturan? Bagaimana dengan segi enam dan segi delapan beraturan? Ceritakan caramu kepada temanmu.",
      bersih(0),
      tambah(0, jud("Renungan", 20)),
      tambah("lima", kartu("g13", 14, 34, 272, 40, W.krem, ["Bisakah aku menghitung keliling", "segi lima beraturan?"], 8.6)),
      tambah("enam", kartu("g14", 14, 82, 272, 40, W.muda, ["Bisakah aku menghitung keliling", "segi enam beraturan?"], 8.6)),
      tambah("delapan", kartu("g15", 14, 130, 272, 40, W.hijauMuda, ["Bisakah aku menghitung keliling", "segi delapan beraturan?"], 8.6)),
    ),
    k(
      "Tantangan untukmu: segi lima beraturan dengan panjang sisi tujuh sentimeter. Berapa kelilingnya? Pikirkan dulu, lalu hitung dengan rumus kita.",
      bersih(0),
      tambah(0, jud("Tantangan", 22)),
      tambah("segi", segiBeraturan("tq", 82, 112, 5, 42, W.krem)),
      tambah("tujuh", labelSisi("tl", 82, 112, 5, 42, "7", 10, 8.6)),
      tambah("Berapa", kartu("tk", 170, 80, 116, 56, W.hijauMuda, ["keliling = ?", "pikirkan dulu"], 10)),
    ),
    k(
      "Jawabannya lima kali tujuh sama dengan tiga puluh lima sentimeter. Kalau kamu ragu, hitung dan tandai sisinya satu per satu. Kerja bagus!",
      bersih(0),
      tambah(0, jud("Jawaban tantangan", 22)),
      tambah("Jawabannya", segiBeraturan("ta", 82, 112, 5, 42, W.krem)),
      tambah("kali", teks("tb", 215, 92, "5 x 7 = 35", 13, W.merah)),
      tambah("puluh", teks("tc", 215, 114, "keliling 35 cm", 9.4, W.hijau)),
      tambah("tandai", emo("td", 215, 160, "✅", 24)),
    ),
  ],
};

/* ------------------------------ 11. Menguji pola dengan ukuran baru (hitungan tambahan) ------------------------------ */
export const ADEGAN_UJI_D: AdeganStory = {
  id: "uji-d",
  judul: "Uji 1 dan Uji 2: ukuran baru",
  sumber: "Materi: Uji 1 dan Uji 2",
  latar: "#ECFDF5",
  ketukan: [
    k(
      "Mari menguji pola dengan ukuran baru. Uji satu: segi lima beraturan bersisi empat sentimeter, lima kali empat sama dengan dua puluh sentimeter.",
      tambah(0, jud("Uji 1: segi lima, sisi 4 cm", 22, 11)),
      tambah("segi", segiBeraturan("u5", 82, 112, 5, 42, W.krem)),
      tambah("empat", labelSisi("ul", 82, 112, 5, 42, "4", 10, 8.6)),
      tambah("lima@2", teks("ut", 214, 92, "5 x 4 = 20", 13, W.merah), teks("ut2", 214, 114, "keliling 20 cm", 9.4, W.hijau)),
    ),
    k(
      "Uji dua. Segi enam beraturan bersisi lima sentimeter, enam kali lima sama dengan tiga puluh. Segi delapan beraturan bersisi dua sentimeter, delapan kali dua sama dengan enam belas.",
      bersih(0),
      tambah(0, jud("Uji 2: dua ukuran lain", 22)),
      tambah("Segi", segiBeraturan("v6", 62, 100, 6, 34, W.muda), teks("v6a", 62, 148, "sisi 5 cm", 8.6)),
      tambah("puluh", teks("v6b", 62, 166, "6 x 5 = 30", 10, W.merah)),
      tambah("delapan", segiBeraturan("v8", 218, 100, 8, 34, W.hijauMuda), teks("v8a", 218, 148, "sisi 2 cm", 8.6)),
      tambah("belas.", teks("v8b", 218, 166, "8 x 2 = 16", 10, W.merah)),
    ),
    k(
      "Perhatikan satuannya, ikut panjang sisi. Kalau sisi dalam sentimeter, keliling juga dalam sentimeter, karena keliling mengukur panjang garis, bukan isi daerah.",
      bersih(0),
      tambah(0, jud("Perhatikan satuannya", 22)),
      tambah("sisi", kartu("s1", 20, 50, 110, 56, W.krem, ["panjang sisi", "dalam cm"], 10)),
      tambah("keliling@1", panah("s2", 136, 78, 28, 0, W.ungu, 2.4)),
      tambah("juga", kartu("s3", 170, 50, 110, 56, W.hijauMuda, ["keliling", "dalam cm"], 10)),
      tambah("bukan", teks("s4", 150, 146, "bukan cm persegi", 10.4, W.merah), tanda("s5", 262, 146, false)),
    ),
    k(
      "Hati-hati, kesalahan yang sering terjadi adalah salah menghitung banyak sisi, misalnya mengira segi enam punya lima sisi. Hitung dan tandai sisinya satu per satu agar tidak terlewat.",
      bersih(0),
      tambah(0, jud("Hati-hati menghitung sisi", 22)),
      tambah("segi", segiBeraturan("w6", 82, 116, 6, 44, W.muda)),
      tambah("tandai", labelSisi("wn", 82, 116, 6, 44, ["1", "2", "3", "4", "5", "6"], 12, 9, W.merah)),
      tambah("mengira", kartu("wk", 176, 66, 108, 40, W.merahMuda, ["bukan 5 sisi"], 10), tanda("wkx", 272, 100, false)),
      tambah("agar", kartu("wl", 176, 118, 108, 40, W.hijauMuda, ["6 sisi"], 10.4), tanda("wlc", 272, 152, true)),
    ),
    k(
      "Itulah isi pelajaran hari ini. Keliling segi lima, enam, dan delapan beraturan sama dengan banyak sisi kali panjang sisi, sedangkan sisi yang tidak sama dijumlahkan satu per satu.",
      bersih(0),
      tambah(0, jud("Ringkasan", 22)),
      tambah("beraturan", kartu("z1", 20, 44, 260, 46, W.hijauMuda, ["sisi sama: banyak sisi x panjang sisi"], 9.4)),
      tambah("tidak", kartu("z2", 20, 102, 260, 46, W.krem, ["sisi beda: jumlahkan semua sisi"], 9.4)),
      tambah("Itulah", emo("z3", 150, 184, "🎉", 22)),
    ),
  ],
};
