import type { AdeganStory, Obj } from "./logika-story";
import { W, bentukBebas, barisTabel, baris, emo, kartu, kotak, labelSisi, panah, segiBeraturan, tanda, teks } from "./k5b4d-gambar";
import { bersih, k, tambah, ubah } from "./k5b4d-bantu";

const jud = (isi: string, y = 20, u = 12): Obj => teks("jud", 150, y, isi, u, W.ungu);

/** Pentagon tidak beraturan untuk contoh sisi tidak sama panjang (hanya bentuk gambar, panjang sisi diberi label). */
const TITIK_BEBAS: [number, number][] = [[-30, -34], [26, -38], [48, 6], [6, 40], [-44, 14]];

/* ------------------------------ 8. Ayo Merangkum (BS hlm. 124; Panduan Guru hlm. 158 dan 159) ------------------------------ */
export const ADEGAN_RANGKUM_D: AdeganStory = {
  id: "rangkum-d",
  judul: "Ayo Merangkum: tabel banyak sisi dan keliling",
  sumber: "Buku Siswa hlm. 124; Buku Panduan Guru hlm. 158 dan 159",
  latar: "#F5F3FF",
  kutipan: [
    "Ayo Merangkum",
    "Lengkapi tabel berikut",
    "Bangun Datar",
    "Banyak Sisi",
    "keliling dapat dicari dengan cara mengalikan banyaknya sisi dengan panjang salah satu sisinya",
  ],
  ketukan: [
    k(
      "Sekarang Ayo Merangkum. Siswa melengkapi tabel dengan tiga kolom: bangun datar, banyak sisi, dan keliling. Barisnya persegi, segi lima, segi enam, dan segi delapan.",
      tambah(0, jud("Ayo Merangkum", 20)),
      tambah("tabel", barisTabel("rh", 10, 30, [76, 96, 108], ["Bangun", "Banyak sisi", "Keliling"], W.biru, 8.4, 20, W.putih)),
      tambah("persegi,", barisTabel("r1", 10, 52, [76, 96, 108], ["", "", ""], W.krem, 8.4, 28), kotak("i1", 38, 58, 16, 16, W.muda, W.biru, { rx: 1, tebal: 1.6 })),
      tambah("lima,", barisTabel("r2", 10, 80, [76, 96, 108], ["", "", ""], W.putih, 8.4, 28), segiBeraturan("i2", 46, 94, 5, 10, W.muda, W.biru, { tebal: 1.6 })),
      tambah("enam,", barisTabel("r3", 10, 108, [76, 96, 108], ["", "", ""], W.krem, 8.4, 28), segiBeraturan("i3", 46, 122, 6, 10, W.muda, W.biru, { tebal: 1.6 })),
      tambah("delapan.", barisTabel("r4", 10, 136, [76, 96, 108], ["", "", ""], W.putih, 8.4, 28), segiBeraturan("i4", 46, 150, 8, 10, W.muda, W.biru, { tebal: 1.6 })),
    ),
    k(
      "Baris pertama sudah terisi di buku: persegi memiliki 4 sisi, kelilingnya 4 kali panjang sisinya. Pada baris segi lima, banyak sisinya 5 dan kelilingnya 5 kali panjang sisinya.",
      ubah("4", { id: "r1-t1", isi: "4", warna: W.merah }),
      ubah("4@2", { id: "r1-t2", isi: "4 x panjang sisi", warna: W.merah }),
      ubah("5", { id: "r2-t1", isi: "5", warna: W.hijau }),
      ubah("5@2", { id: "r2-t2", isi: "5 x panjang sisi", warna: W.hijau }),
    ),
    k(
      "Baris segi enam diisi banyak sisi 6 dan keliling 6 kali panjang sisinya. Baris segi delapan diisi 8 sisi dan keliling 8 kali panjang sisinya.",
      ubah("6", { id: "r3-t1", isi: "6", warna: W.hijau }),
      ubah("6@2", { id: "r3-t2", isi: "6 x panjang sisi", warna: W.hijau }),
      ubah("8", { id: "r4-t1", isi: "8", warna: W.hijau }),
      ubah("8@2", { id: "r4-t2", isi: "8 x panjang sisi", warna: W.hijau }),
    ),
    k(
      "Dari tabel, siswa diarahkan menggeneralisasi pola: pada bangun beraturan, keliling dicari dengan mengalikan banyaknya sisi dengan panjang salah satu sisinya.",
      bersih(0),
      tambah(0, jud("Pola dari tabel", 22)),
      tambah("keliling", kartu("pl", 20, 44, 260, 50, W.hijauMuda, ["keliling", "banyak sisi x panjang satu sisi"], 10)),
      tambah("mengalikan", teks("pc1", 150, 126, "4 x s   5 x s   6 x s   8 x s", 10.4, W.biru)),
      tambah("panjang", teks("pc2", 150, 150, "s = panjang satu sisi", 9, W.ungu)),
    ),
    k(
      "Contoh tambahan pada segi delapan: jika setiap sisinya 3 sentimeter, kelilingnya 8 kali 3 sama dengan 24 sentimeter. Buku tidak memberi ukuran segi delapan, jadi angka ini hitungan kita sendiri.",
      bersih(0),
      tambah(0, jud("Contoh tambahan: segi delapan", 20, 11)),
      tambah("segi", segiBeraturan("o8", 80, 112, 8, 42, W.hijauMuda)),
      tambah("3", labelSisi("ls", 80, 112, 8, 42, "3", 10, 8.4)),
      tambah("kelilingnya", teks("ot", 215, 84, "8 x 3 = 24", 12.4, W.merah), teks("ot2", 215, 104, "keliling 24 cm", 9.4, W.hijau)),
      tambah("hitungan", kartu("ob", 160, 126, 128, 34, W.krem, ["hitungan tambahan"], 9)),
    ),
  ],
};

/* ------------------------------ 9. Sisi tidak sama panjang (BS hlm. 124; Panduan Guru hlm. 159) ------------------------------ */
export const ADEGAN_TIDAK_SAMA: AdeganStory = {
  id: "tidak-sama",
  judul: "Jika sisi-sisinya tidak sama panjang",
  sumber: "Buku Siswa hlm. 124; Buku Panduan Guru hlm. 159",
  latar: "#FDF2F8",
  kutipan: [
    "Jika sisi-sisinya tidak sama panjang, bagaimana cara menghitung kelilingnya?",
    "untuk keliling diperoleh dengan cara",
    "menjumlahkan semua panjang sisinya",
  ],
  ketukan: [
    k(
      "Di bagian bawah halaman, seorang anak bertanya: jika sisi-sisinya tidak sama panjang, bagaimana cara menghitung kelilingnya?",
      tambah(0, jud("Bagaimana jika tidak sama?", 22)),
      tambah("seorang", emo("q1", 40, 90, "🧒", 34)),
      tambah("bertanya:", kartu("q2", 70, 60, 214, 56, W.krem, ["sisi tidak sama panjang,", "bagaimana kelilingnya?"], 9.4)),
      tambah("bagaimana", bentukBebas("q3", 150, 160, TITIK_BEBAS.map(([x, y]) => [x * 0.45, y * 0.45] as [number, number]), W.merahMuda)),
    ),
    k(
      "Anak yang lain menjawab: jika sisi-sisinya tidak sama panjang, keliling diperoleh dengan cara menjumlahkan semua panjang sisinya.",
      bersih(0),
      tambah(0, jud("Jawaban di buku", 22)),
      tambah("menjawab:", emo("a1", 40, 90, "👧", 34)),
      tambah("keliling", kartu("a2", 70, 56, 214, 66, W.hijauMuda, ["keliling diperoleh dengan", "menjumlahkan semua", "panjang sisinya"], 9.4)),
    ),
    k(
      "Misalnya ada segi lima yang sisinya 3, 3, 3, 4, dan 5 sentimeter. Ini contoh tambahan kita, bukan dari buku. Kelilingnya dijumlahkan satu per satu, yaitu 18 sentimeter.",
      bersih(0),
      tambah(0, jud("Contoh tambahan: sisi berbeda", 20, 11)),
      tambah("segi", bentukBebas("b0", 82, 110, TITIK_BEBAS, W.krem)),
      tambah("3", teks("b1", 36, 70, "3", 9, W.merah), teks("b2", 82, 66, "3", 9, W.merah), teks("b3", 134, 96, "3", 9, W.merah)),
      tambah("4,", teks("b4", 100, 164, "4", 9, W.merah)),
      tambah("5", teks("b5", 24, 140, "5", 9, W.merah)),
      tambah("tambahan", teks("bt", 232, 70, "contoh tambahan", 8.6, W.ungu)),
      tambah("Kelilingnya", teks("bs", 232, 104, "3+3+3+4+5 = 18", 10, W.biru), teks("bk", 232, 124, "keliling 18 cm", 9.4, W.hijau)),
    ),
    k(
      "Rumus kali tidak boleh dipakai di sini. Jika 5 kali 3 dipakai, hasilnya 15, padahal keliling yang benar 18. Perkalian hanya berlaku bila semua sisinya sama panjang.",
      bersih(0),
      tambah(0, jud("Awas: jangan dikalikan", 22)),
      tambah("Jika", baris("w1", 30, 44, 240, "5 x 3 = 15", W.merahMuda, 11, 28), tanda("w1x", 258, 64, false)),
      tambah("padahal", baris("w2", 30, 84, 240, "3+3+3+4+5 = 18", W.hijauMuda, 11, 28), tanda("w2c", 258, 104, true)),
      tambah("Perkalian", teks("w3", 150, 148, "kali hanya jika semua sisi sama", 9.4, W.ungu)),
    ),
    k(
      "Jadi ada dua aturan. Sisi-sisi sama panjang: kalikan banyak sisi dengan panjang sisi. Sisi-sisi tidak sama panjang: jumlahkan semua sisinya.",
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
  judul: "Akhir pembelajaran dan Refleksi 13, 14, 15",
  sumber: "Buku Panduan Guru hlm. 159; Buku Siswa hlm. 129",
  latar: "#F0F9FF",
  kutipan: [
    "memastikan pemahaman peserta didik melalui kegiatan tanya jawab",
    "banyaknya sisi pada segi banyak beraturan akan menjadi pengali dalam rumus kelilingnya",
    "Berilah tanda centang",
    "Aku bisa menemukan cara menghitung keliling segi lima beraturan",
    "Aku bisa menemukan cara menghitung keliling segi enam beraturan",
    "Aku bisa menemukan cara menghitung keliling segi delapan beraturan",
  ],
  ketukan: [
    k(
      "Di akhir eksplorasi, guru memberi penguatan tentang cara menghitung keliling segi lima, segi enam, dan segi delapan beraturan. Guru juga memastikan pemahaman siswa lewat tanya jawab.",
      tambah(0, jud("Penguatan di akhir", 22)),
      tambah("lima,", segiBeraturan("e5", 54, 90, 5, 28), teks("e5t", 54, 140, "5 x sisi", 9.6, W.merah)),
      tambah("enam,", segiBeraturan("e6", 150, 90, 6, 28, W.krem), teks("e6t", 150, 140, "6 x sisi", 9.6, W.merah)),
      tambah("delapan", segiBeraturan("e8", 246, 90, 8, 28, W.hijauMuda), teks("e8t", 246, 140, "8 x sisi", 9.6, W.merah)),
      tambah("tanya", emo("eq", 150, 184, "💬", 22), teks("eqt", 190, 184, "tanya jawab", 8.6, W.ungu)),
    ),
    k(
      "Guru menekankan bahwa banyaknya sisi pada segi banyak beraturan akan menjadi pengali dalam rumus kelilingnya.",
      bersih(0),
      tambah(0, jud("Yang ditekankan guru", 22)),
      tambah("banyaknya", emo("f1", 150, 76, "💡", 34)),
      tambah("pengali", kartu("f2", 30, 94, 240, 40, W.hijauMuda, ["banyak sisi = pengali"], 11)),
      tambah("rumus", teks("f3", 150, 160, "keliling = banyak sisi x panjang sisi", 9.4, W.merah)),
    ),
    k(
      "Refleksi Sub-Bab D memakai pertanyaan nomor 13, 14, dan 15 pada tabel refleksi di buku siswa. Siswa memberi tanda centang pada kolom Ya atau Tidak.",
      bersih(0),
      tambah(0, jud("Refleksi Sub-Bab D", 20)),
      tambah("tabel", barisTabel("fh", 14, 34, [170, 50, 52], ["Pernyataan", "Ya", "Tidak"], W.biru, 8.4, 20, W.putih)),
      tambah("13,", barisTabel("f13", 14, 54, [170, 50, 52], ["13. keliling segi lima", "", ""], W.krem, 8.4, 28)),
      tambah("14,", barisTabel("f14", 14, 82, [170, 50, 52], ["14. keliling segi enam", "", ""], W.putih, 8.4, 28)),
      tambah("15", barisTabel("f15", 14, 110, [170, 50, 52], ["15. keliling segi delapan", "", ""], W.krem, 8.4, 28)),
      tambah("centang", tanda("fc1", 204, 130, true), tanda("fc2", 204, 72, true), tanda("fc3", 204, 100, true)),
    ),
    k(
      "Pernyataan 13: aku bisa menemukan cara menghitung keliling segi lima beraturan. Pernyataan 14 untuk segi enam beraturan, dan pernyataan 15 untuk segi delapan beraturan.",
      bersih(0),
      tambah(0, jud("Isi pernyataan refleksi", 20)),
      tambah("13:", kartu("g13", 14, 34, 272, 40, W.krem, ["13. Aku bisa menemukan cara menghitung", "keliling segi lima beraturan"], 8)),
      tambah("14", kartu("g14", 14, 82, 272, 40, W.muda, ["14. Aku bisa menemukan cara menghitung", "keliling segi enam beraturan"], 8)),
      tambah("15", kartu("g15", 14, 130, 272, 40, W.hijauMuda, ["15. Aku bisa menemukan cara menghitung", "keliling segi delapan beraturan"], 8)),
    ),
    k(
      "Jika siswa menjawab Tidak, ulangi bagian yang bersangkutan: segi lima di halaman 122, segi enam di halaman 123, dan tabel rangkuman di halaman 124.",
      bersih(0),
      tambah(0, jud("Jika jawabannya Tidak", 22)),
      tambah("lima", baris("h1", 30, 44, 240, "segi lima: Buku Siswa hlm. 122", W.krem, 9, 26)),
      tambah("enam", baris("h2", 30, 78, 240, "segi enam: Buku Siswa hlm. 123", W.muda, 9, 26)),
      tambah("rangkuman", baris("h3", 30, 112, 240, "tabel rangkuman: hlm. 124", W.hijauMuda, 9, 26)),
      tambah("ulangi", panah("h4", 150, 150, 0, 18, W.ungu, 2.4)),
    ),
  ],
};

/* ------------------------------ 11. Menguji pola dengan ukuran baru (hitungan tambahan) ------------------------------ */
export const ADEGAN_UJI_D: AdeganStory = {
  id: "uji-d",
  judul: "Menguji pola dengan ukuran baru",
  sumber: "Hitungan tambahan; pola dari Buku Siswa hlm. 122 sampai 124",
  latar: "#ECFDF5",
  ketukan: [
    k(
      "Mari menguji pola dengan ukuran baru. Segi lima beraturan bersisi 4 sentimeter: 5 kali 4 sama dengan 20 sentimeter.",
      tambah(0, jud("Uji pola: segi lima, sisi 4 cm", 22, 11)),
      tambah("Segi", segiBeraturan("u5", 82, 112, 5, 42, W.krem)),
      tambah("4", labelSisi("ul", 82, 112, 5, 42, "4", 10, 8.6)),
      tambah("5", teks("ut", 214, 92, "5 x 4 = 20", 13, W.merah), teks("ut2", 214, 114, "keliling 20 cm", 9.4, W.hijau)),
    ),
    k(
      "Segi enam beraturan bersisi 5 sentimeter: 6 kali 5 sama dengan 30. Segi delapan beraturan bersisi 2 sentimeter: 8 kali 2 sama dengan 16.",
      bersih(0),
      tambah(0, jud("Dua ukuran lain", 22)),
      tambah("Segi", segiBeraturan("v6", 62, 100, 6, 34, W.muda), teks("v6a", 62, 148, "sisi 5 cm", 8.6)),
      tambah("30.", teks("v6b", 62, 166, "6 x 5 = 30", 10, W.merah)),
      tambah("delapan", segiBeraturan("v8", 218, 100, 8, 34, W.hijauMuda), teks("v8a", 218, 148, "sisi 2 cm", 8.6)),
      tambah("16.", teks("v8b", 218, 166, "8 x 2 = 16", 10, W.merah)),
    ),
    k(
      "Satuannya mengikuti panjang sisi. Sisi dalam sentimeter berarti keliling juga dalam sentimeter, karena keliling mengukur panjang garis, bukan isi daerah.",
      bersih(0),
      tambah(0, jud("Perhatikan satuannya", 22)),
      tambah("Sisi", kartu("s1", 20, 50, 110, 56, W.krem, ["panjang sisi", "dalam cm"], 10)),
      tambah("keliling@1", panah("s2", 136, 78, 28, 0, W.ungu, 2.4)),
      tambah("juga", kartu("s3", 170, 50, 110, 56, W.hijauMuda, ["keliling", "dalam cm"], 10)),
      tambah("bukan", teks("s4", 150, 146, "bukan cm persegi", 10.4, W.merah), tanda("s5", 262, 146, false)),
    ),
    k(
      "Satu kesalahan yang mungkin muncul adalah salah menghitung banyak sisi, misalnya mengira segi enam punya 5 sisi. Hitung dan tandai sisinya satu per satu agar tidak terlewat.",
      bersih(0),
      tambah(0, jud("Hati-hati menghitung sisi", 22)),
      tambah("segi", segiBeraturan("w6", 82, 116, 6, 44, W.muda)),
      tambah("tandai", labelSisi("wn", 82, 116, 6, 44, ["1", "2", "3", "4", "5", "6"], 12, 9, W.merah)),
      tambah("mengira", kartu("wk", 176, 66, 108, 40, W.merahMuda, ["bukan 5 sisi"], 10), tanda("wkx", 272, 100, false)),
      tambah("agar", kartu("wl", 176, 118, 108, 40, W.hijauMuda, ["6 sisi"], 10.4), tanda("wlc", 272, 152, true)),
    ),
    k(
      "Itulah isi Sub-Bab D. Keliling segi lima, enam, dan delapan beraturan sama dengan banyak sisi kali panjang sisi, sedangkan sisi yang tidak sama dijumlahkan satu per satu.",
      bersih(0),
      tambah(0, jud("Ringkasan Sub-Bab D", 22)),
      tambah("beraturan", kartu("z1", 20, 44, 260, 46, W.hijauMuda, ["sisi sama: banyak sisi x panjang sisi"], 9.4)),
      tambah("tidak", kartu("z2", 20, 102, 260, 46, W.krem, ["sisi beda: jumlahkan semua sisi"], 9.4)),
      tambah("Itulah", emo("z3", 150, 184, "🎉", 22)),
    ),
  ],
};
