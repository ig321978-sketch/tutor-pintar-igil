import type { AdeganStory, Obj } from "./logika-story";
import { FX, FY, LAP, RUTE, W, emo, garisRute, judul, kartu, lapangan, panah, poligon, tabel, teks, titikBangunDua, titikBangunSama } from "./k5b4a-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k5b4a-bantu";

/* ------------------------------ 9. Eksplorasi 4.1B: lapangan sebagai bangun datar (Buku Siswa hlm. 113; Panduan Guru hlm. 125 dan 126) ------------------------------ */
export const ADEGAN_EKS41B: AdeganStory = {
  id: "eks-41b",
  judul: "Eksplorasi 4.1B: menjumlahkan panjang sisi lapangan",
  sumber: "Buku Siswa hlm. 113; Panduan Guru hlm. 125–126",
  latar: "#ECFDF5",
  kutipan: [
    "Eksplorasi 4.1B",
    "Perhatikan kembali lintasan berlari Asep di lapangan sepak bola.",
    "Kalian sudah melihat bahwa Asep berangkat dari satu titik, kemudian",
    "berlari menyusuri tepian lapangan, dan berhenti di titik semula.",
    "Jarak yang ia tempuh adalah sepanjang \"keliling\" lapangan sepak",
    "Jadi, keliling lapangan sepak bola dapat dihitung dengan cara",
    "100 + 50 + 100 + 50 = 300, diperoleh kelilingnya 300 m.",
  ],
  ketukan: [
    k(
      "Eksplorasi empat titik satu B. Perhatikan lagi lintasan Asep. Lapangan sepak bola dapat kita lihat sebagai bangun datar. Bagaimana menentukan panjang lintasan berlarinya?",
      tambah(0, judul("Eksplorasi 4.1B")),
      tambah("lintasan", ...lapangan("lp", FX, FY), garisRute("ar", RUTE.asep, W.biru)),
      tambah("bangun", poligon("bd", FX, FY, [[0, 0], [LAP.pw, 0], [LAP.pw, LAP.ph], [0, LAP.ph]], "none", W.hitam, { tebal: 3 })),
      tambah("Bagaimana", teks("lt", FX + LAP.pw / 2, FY - 6, "100 m", 8.4, W.hitam), teks("lb", FX + LAP.pw / 2, FY + LAP.ph + 12, "100 m", 8.4, W.hitam), teks("ll", FX - 6, FY + LAP.ph / 2 + 3, "50 m", 8.4, W.hitam, { anchor: "end" }), teks("lr", FX + LAP.pw + 6, FY + LAP.ph / 2 + 3, "50 m", 8.4, W.hitam, { anchor: "start" })),
    ),
    k(
      "Asep berangkat dari satu titik, menyusuri tepian, dan berhenti di titik semula. Artinya, ia harus menjumlahkan panjang sisi-sisi lapangan sepak bola.",
      tambah("berangkat", emo("rn", FX + 10, FY + LAP.ph - 8, "🏃", 16)),
      tambah("berhenti", emo("ok", FX + 30, FY + LAP.ph - 14, "✅", 16)),
      tambah("menjumlahkan", ...kartu("jk", 50, 164, 200, 28, W.krem, ["jumlahkan panjang semua sisi"], 9.4)),
    ),
    k(
      "Jadi keliling lapangan sepak bola dihitung dengan cara seratus tambah lima puluh tambah seratus tambah lima puluh sama dengan tiga ratus, diperoleh kelilingnya tiga ratus meter.",
      hapus(0, "jk-k", "jk-t0", "rn", "ok"),
      tambah("seratus", teks("ke", 150, 174, "100", 12, W.merah)),
      ubah("lima", { id: "ke", isi: "100 + 50" }),
      ubah("seratus@2", { id: "ke", isi: "100 + 50 + 100" }),
      ubah("lima@2", { id: "ke", isi: "100 + 50 + 100 + 50" }),
      ubah("tiga", { id: "ke", isi: "100 + 50 + 100 + 50 = 300" }),
      tambah("kelilingnya", teks("kh", 150, 192, "keliling lapangan = 300 m", 9.4, W.hijau)),
    ),
    k(
      "Pada pelaksanaannya, guru meminta siswa mengingat rute Asep, menekankan konsep keliling, dan memastikan panjang seluruh sisi lapangan dijumlahkan dengan benar.",
      bersih(0),
      tambah(0, judul("Peran guru")),
      tambah("mengingat", ...kartu("g1", 14, 36, 272, 30, W.langit, ["ingat kembali rute Asep dan cara memperoleh panjangnya"], 8.4)),
      tambah("menekankan", ...kartu("g2", 14, 76, 272, 30, W.krem, ["tekankan konsep keliling"], 8.8)),
      tambah("memastikan", ...kartu("g3", 14, 116, 272, 30, W.hijauMuda, ["pastikan semua sisi lapangan dijumlahkan benar"], 8.4)),
    ),
  ],
};

/* ------------------------------ 10. Mengukur dengan penggaris: dua bangun datar (Buku Siswa hlm. 114; Panduan Guru hlm. 126 dan 127) ------------------------------ */
const U1 = 12;
const U2 = 14;
const tambahLabel = (id: string, x: number, y: number, isi: string, anchor: "start" | "middle" | "end" = "middle"): Obj => teks(id, x, y, isi, 8.4, W.merah, { anchor });

export const ADEGAN_UKUR: AdeganStory = {
  id: "ukur-penggaris",
  judul: "Mengukur sisi dengan penggaris: dua bangun datar",
  sumber: "Buku Siswa hlm. 114; Panduan Guru hlm. 126–127",
  latar: "#EFF6FF",
  kutipan: [
    "Sekarang, perhatikan gambar-gambar berikut. Bagaimanakah cara",
    "menentukan kelilingnya?",
    "Untuk menentukan kelilingnya, kalian dapat mengukur sisi-sisi",
    "bangun datar tersebut dengan menggunakan penggaris.",
    "Keliling = 4 + 4 + 4 + 4 = 16.",
    "Jadi, kelilingnya 16 cm.",
    "Keliling = ... + ... + ... + ... = ....",
    "Keliling = 5 + 4 + 5 + 5 = 19",
    "Jadi, kelilingnya 19 cm.",
  ],
  ketukan: [
    k(
      "Sekarang perhatikan dua gambar bangun datar. Bagaimana cara menentukan kelilingnya? Kalian dapat mengukur sisi-sisinya menggunakan penggaris.",
      tambah(0, judul("Mengukur dengan penggaris")),
      tambah("dua", poligon("bs", 30, 50, titikBangunSama(U1), W.hijauMuda, W.biru, { tebal: 2 }), poligon("bd", 180, 56, titikBangunDua(U1), W.krem, W.biru, { tebal: 2 })),
      tambah("Bagaimana", teks("q1", 64, 146, "keliling = ?", 9.4, W.merah), teks("q2", 208, 146, "keliling = ?", 9.4, W.merah)),
      tambah("mengukur", emo("pg", 150, 176, "📏", 28)),
    ),
    k(
      "Bangun pertama bersisi empat, keempat sisinya empat sentimeter. Keliling sama dengan empat tambah empat tambah empat tambah empat sama dengan enam belas. Jadi kelilingnya enam belas sentimeter.",
      hapus(0, "q1", "q2", "pg"),
      ubah(0, { id: "bd", op: 0.25 }),
      tambah(4, tambahLabel("s1", 96, 62, "4 cm", "start")),
      tambah(5, tambahLabel("s2", 96, 106, "4 cm", "start")),
      tambah(6, tambahLabel("s3", 34, 112, "4 cm", "end")),
      tambah(7, tambahLabel("s4", 34, 62, "4 cm", "end")),
      tambah(8, teks("se", 64, 150, "4 + 4 + 4 + 4 = 16", 10, W.biru)),
      tambah(22, teks("sh", 64, 170, "keliling 16 cm", 9.6, W.hijau)),
    ),
    k(
      "Bangun kedua punya sisi atas empat sentimeter, sisi bawah lima sentimeter, dan kedua sisi miring masing-masing lima sentimeter. Di buku, bagian ini dibiarkan kosong untuk diisi siswa.",
      bersih(0),
      tambah(0, judul("Bangun kedua")),
      tambah(0, poligon("b2", 115, 52, titikBangunDua(U2), W.krem, W.biru, { tebal: 2 })),
      tambah("atas", tambahLabel("t1", 150, 46, "4 cm")),
      tambah("bawah", tambahLabel("t2", 150, 134, "5 cm")),
      tambah("miring", tambahLabel("t3", 108, 92, "5 cm", "end"), tambahLabel("t4", 192, 92, "5 cm", "start")),
      tambah("kosong", ...kartu("kb", 40, 146, 220, 38, W.putih, ["Keliling = … + … + … + … = …", "Jadi, kelilingnya … cm."], 9)),
    ),
    k(
      "Menurut kunci panduan guru, kelilingnya lima tambah empat tambah lima tambah lima sama dengan sembilan belas. Jadi kelilingnya sembilan belas sentimeter.",
      hapus(0, "kb-k", "kb-t0", "kb-t1"),
      tambah("lima", teks("te", 150, 160, "5 + 4 + 5 + 5 = 19", 11, W.biru)),
      tambah("Jadi", teks("th", 150, 180, "keliling 19 cm", 9.6, W.hijau)),
    ),
    k(
      "Guru meminta siswa mengukur sisi dengan penggaris, mengisi titik-titik, lalu menghitung kelilingnya. Bila pengukuran salah, siswa diminta mengulanginya dengan lebih teliti.",
      bersih(0),
      tambah(0, judul("Peran guru")),
      tambah("mengukur", ...kartu("l1", 14, 34, 272, 28, W.langit, ["1. ukur sisi dengan penggaris"], 8.8), emo("l1e", 266, 55, "📏", 16)),
      tambah("mengisi", ...kartu("l2", 14, 70, 272, 28, W.krem, ["2. isi titik-titik dengan hasil ukur"], 8.8)),
      tambah("menghitung", ...kartu("l3", 14, 106, 272, 28, W.hijauMuda, ["3. hitung kelilingnya"], 8.8)),
      tambah("salah,", ...kartu("l4", 14, 142, 272, 34, W.merahMuda, ["salah ukur: ulangi dengan lebih teliti"], 8.8), emo("l4e", 266, 164, "🔁", 16)),
    ),
  ],
};

/* ------------------------------ 11. Kesimpulan: apakah keliling bangun datar itu? (Buku Siswa hlm. 114; Panduan Guru hlm. 127) ------------------------------ */
export const ADEGAN_KESIMPULAN: AdeganStory = {
  id: "kesimpulan-keliling",
  judul: "Kesimpulan: apakah keliling bangun datar itu?",
  sumber: "Buku Siswa hlm. 114; Panduan Guru hlm. 124 dan 127",
  latar: "#FFF7ED",
  kutipan: [
    "Jadi, dengan menggunakan kata-katamu sendiri, apakah keliling",
    "bangun datar itu?",
    "Keliling bangun datar adalah jumlahan panjang sisi-",
    "sisi bangun datar tersebut.",
    "Setiap sisi lapangan ia lalui satu kali.",
    "bukan bolak balik pada sisi yang sama.",
  ],
  ketukan: [
    k(
      "Jadi, dengan kata-katamu sendiri, apakah keliling bangun datar itu? Guru mengajak siswa menyebutkannya secara lisan.",
      tambah(0, judul("Apa itu keliling?")),
      tambah("apakah", teks("qq", 150, 100, "?", 64, W.merah)),
      tambah("lisan.", emo("sy", 150, 150, "🗣", 34)),
    ),
    k(
      "Kesimpulan buku: keliling bangun datar adalah jumlahan panjang sisi-sisi bangun datar tersebut.",
      bersih(0),
      tambah(0, judul("Kesimpulan")),
      tambah("keliling", ...kartu("df", 20, 46, 260, 70, W.emas, ["Keliling bangun datar adalah", "jumlahan panjang sisi-sisi", "bangun datar tersebut."], 10.4)),
      tambah("jumlahan", emo("lm", 270, 40, "💡", 24)),
    ),
    k(
      "Kalau jawaban siswa kurang tepat, mereka diminta membaca kesimpulan di buku. Guru juga mengantisipasi ide mengelilingi, yaitu tiap sisi dilalui satu kali, bukan bolak-balik pada sisi yang sama.",
      bersih(0),
      tambah(0, judul("Antisipasi guru")),
      tambah("Kalau", ...kartu("an1", 14, 40, 272, 38, W.langit, ["jawaban kurang tepat:", "baca kesimpulan di buku"], 9)),
      tambah("mengantisipasi", ...kartu("an2", 14, 90, 272, 38, W.krem, ["mengelilingi: tiap sisi dilalui satu kali,", "bukan bolak-balik di sisi yang sama"], 8.6)),
    ),
    k(
      "Ringkasnya, keliling muncul dari rute yang mengelilingi tepian dan kembali ke titik semula. Lapangan seratus meter kali lima puluh meter berkeliling tiga ratus meter. Dua bangun tadi berkeliling enam belas dan sembilan belas sentimeter.",
      bersih(0),
      tambah(0, judul("Ringkasan angka")),
      tambah(0, ...tabel("rg0", 10, 36, [96, 112, 72], [["Bangun", "Panjang sisi", "Keliling"]], 24, 8.4, W.krem)),
      tambah(13, ...tabel("rg1", 10, 60, [96, 112, 72], [["Lapangan", "100, 50, 100, 50", "300 m"]], 24, 8.4, W.putih)),
      tambah(28, ...tabel("rg2", 10, 84, [96, 112, 72], [["Bangun pertama", "4, 4, 4, 4", "16 cm"]], 24, 8.4, W.putih)),
      tambah(31, ...tabel("rg3", 10, 108, [96, 112, 72], [["Bangun kedua", "4, 5, 5, 5", "19 cm"]], 24, 8.4, W.putih)),
    ),
    k(
      "Dengan ini dua tujuan subbab A tercapai: kita mengenali situasi soal keliling dan menemukan keliling sebagai jumlahan panjang sisi-sisinya. Subbab berikutnya memakai gagasan ini untuk bangun-bangun yang lain.",
      bersih(0),
      tambah(0, judul("Tujuan subbab A tercapai")),
      tambah("mengenali", ...kartu("tc1", 14, 36, 272, 32, W.hijauMuda, ["mengenali situasi soal keliling"], 9.2), emo("tc1e", 262, 58, "✅", 16)),
      tambah("menemukan", ...kartu("tc2", 14, 78, 272, 32, W.hijauMuda, ["menemukan keliling = jumlah panjang sisi"], 9.2), emo("tc2e", 262, 100, "✅", 16)),
      tambah("berikutnya", panah("tca", 150, 114, 0, 22, W.biru, 2.2, { gambar: true }), ...kartu("tc3", 50, 142, 200, 32, W.krem, ["subbab berikutnya: bangun lain"], 9.2)),
    ),
  ],
};

