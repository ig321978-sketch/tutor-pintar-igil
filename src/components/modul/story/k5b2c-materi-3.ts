import type { AdeganStory } from "./logika-story";
import { W, deret, emo, faktor, judul, kartu, kurungDeret, pita, sebar, teks } from "./k5b2c-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah } from "./k5b2c-bantu";

const xs8 = sebar(8, 30, 270);
const xs9 = sebar(9, 24, 276);
const xs12 = sebar(12, 20, 280);
const c24 = deret("f24", xs8, 70, 12, faktor(24), 8.6);
const k24 = kurungDeret("f24", xs8, 70, 12, 8);
const c36 = deret("f36", xs9, 70, 12, faktor(36), 8.6);
const k36 = kurungDeret("f36", xs9, 70, 12, 9);
const c54 = deret("f54", xs8, 70, 12, faktor(54), 8.6);
const k54 = kurungDeret("f54", xs8, 70, 12, 8);
const c72 = deret("f72", xs12, 70, 10, faktor(72), 8);
const k72 = kurungDeret("f72", xs12, 70, 10, 12);
const c96 = deret("f96", xs12, 70, 10, faktor(96), 8);
const k96 = kurungDeret("f96", xs12, 70, 10, 12);

/* ------------------------------ 9. Ayo Berlatih: 24 dan 36 (Buku Siswa hlm. 46; Panduan Guru hlm. 65) ------------------------------ */
export const ADEGAN_LATIH_A: AdeganStory = {
  id: "berlatih-24-36",
  judul: "Latihan: faktor dari 24 dan 36",
  sumber: "Materi: latihan faktor 24 dan 36",
  latar: "#FEFCE8",
  kutipan: [
    "Ayo Berlatih",
    "Perhatikan kembali Eksplorasi 2.3B nomor 3 di halaman sebelumnya.",
    "Dengan cara yang sama, tentukan faktor-faktor dari bilangan-bilangan berikut.",
    "1. 24 3. 54 5. 96 2. 36 4. 72",
    "Faktor dari 24",
    "2 1 3 4 6 8 12 24",
    "Faktor dari 36",
    "2 1 3 4 9 12 18 36",
  ],
  ketukan: [
    k(
      "Sekarang saatnya Latihan. Kita ulangi cara yang tadi dengan menulis semua faktor. Coba tentukan faktor dari dua puluh empat, tiga puluh enam, lima puluh empat, tujuh puluh dua, dan sembilan puluh enam.",
      tambah(0, judul("Latihan")),
      tambah(2, ...kartu("bk", 20, 36, 260, 30, W.langit, ["ulangi cara yang tadi"], 9.6)),
      tambah("dua", ...kartu("n24", 10, 100, 50, 40, W.krem, ["24"], 16)),
      tambah("tiga", ...kartu("n36", 68, 100, 50, 40, W.hijauMuda, ["36"], 16)),
      tambah("lima", ...kartu("n54", 126, 100, 50, 40, W.pink, ["54"], 16)),
      tambah("tujuh", ...kartu("n72", 184, 100, 50, 40, W.langit, ["72"], 16)),
      tambah("sembilan", ...kartu("n96", 242, 100, 48, 40, W.jingga, ["96"], 16)),
    ),
    k(
      "Mulai dari dua puluh empat. Pasangannya: satu dengan dua puluh empat, dua dengan dua belas, tiga dengan delapan, dan empat dengan enam. Jadi ada delapan faktor.",
      bersih(0),
      tambah(0, judul("Faktor dari 24")),
      tambah(5, c24),
      tambah(6, k24[0]),
      tambah(11, k24[1]),
      tambah(15, k24[2]),
      tambah(19, k24[3]),
      tambah(24, teks("pc", 150, 150, "8 faktor", 14, W.biru)),
    ),
    k(
      "Jadi faktor dari dua puluh empat ada delapan: satu, dua, tiga, empat, enam, delapan, dua belas, dan dua puluh empat.",
      hapus(0, "pc"),
      tambah("satu,", ...kartu("kn", 20, 132, 260, 40, W.hijauMuda, ["faktor 24: 1, 2, 3, 4, 6, 8, 12, 24", "8 faktor, lengkap"], 8.6)),
    ),
    k(
      "Lanjut ke tiga puluh enam. Pasangannya: satu dengan tiga puluh enam, dua dengan delapan belas, tiga dengan dua belas, empat dengan sembilan, dan enam dengan enam sendiri.",
      bersih(0),
      tambah(0, judul("Faktor dari 36")),
      tambah(5, c36),
      tambah(6, k36[0]),
      tambah(11, k36[1]),
      tambah(15, k36[2]),
      tambah(19, k36[3]),
      tambah(23, teks("sq", 150, 150, "6 × 6 = 36", 16, W.hijau)),
      sorotkan(23, "f36-b4"),
    ),
    k(
      "Jadi faktor dari tiga puluh enam ada sembilan. Perhatikan, enam hanya dihitung satu kali.",
      hapus(0, "sq"),
      redamkan(0, "f36-b4"),
      tambah(7, teks("sb", 150, 138, "9 faktor", 14, W.biru)),
      tambah(8, teks("fl", 150, 164, "faktor 36: 1, 2, 3, 4, 6, 9, 12, 18, 36", 11, W.hijau)),
    ),
    k(
      "Hati-hati, jangan sampai ada faktor yang terlewat. Pada tiga puluh enam, angka enam harus ikut ditulis, sebab enam kali enam sama dengan tiga puluh enam.",
      hapus(0, "sb", "fl"),
      tambah(4, ...kartu("kn", 20, 128, 260, 40, W.hijauMuda, ["hati-hati: 6 jangan terlewat", "faktor 36: 1, 2, 3, 4, 6, 9, 12, 18, 36"], 8.6)),
      tambah("angka", emo("xx", xs9[4], 52, "❗", 14)),
      sorotkan("angka", "f36-b4"),
    ),
    k(
      "Cek sekali lagi: enam kali enam sama dengan tiga puluh enam, jadi enam pasti faktor. Tiga puluh enam dibagi enam sama dengan enam, tanpa sisa.",
      bersih(0),
      tambah(0, judul("Cek: apakah 6 faktor dari 36?", W.hijau)),
      tambah(2, teks("g1", 150, 66, "6 × 6 = 36", 22, W.hijau)),
      tambah(12, ...kartu("g3", 20, 130, 260, 36, W.hijauMuda, ["faktor 36: 1, 2, 3, 4, 6, 9, 12, 18, 36"], 9.6)),
      tambah(18, teks("g2", 150, 104, "36 : 6 = 6, sisa 0", 16, W.hijau)),
    ),
  ],
};

/* ------------------------------ 10. Ayo Berlatih: 54, 72, dan 96 (Buku Siswa hlm. 46; Panduan Guru hlm. 65 dan 66) ------------------------------ */
export const ADEGAN_LATIH_B: AdeganStory = {
  id: "berlatih-54-72-96",
  judul: "Latihan: faktor dari 54, 72, dan 96",
  sumber: "Materi: latihan faktor 54, 72, 96",
  latar: "#F5F3FF",
  kutipan: [
    "Faktor dari 54",
    "2 1 3 4 9 18 27 54",
    "Faktor dari 72",
    "2 1 3 4 6 18 8 24 9 36 12 72",
    "Faktor dari 96",
    "2 1 3 4 6 24 8 32 12 48 16 96",
  ],
  ketukan: [
    k(
      "Berikutnya lima puluh empat. Pasangannya: satu dengan lima puluh empat, dua dengan dua puluh tujuh, tiga dengan delapan belas, dan enam dengan sembilan. Faktornya ada delapan.",
      tambah(0, judul("Faktor dari 54")),
      tambah(4, c54),
      tambah(5, k54[0]),
      tambah(10, k54[1]),
      tambah(15, k54[2]),
      tambah(19, k54[3]),
      tambah(25, teks("pb", 150, 150, "8 faktor", 14, W.biru)),
    ),
    k(
      "Periksa pasangannya dengan perkalian: satu kali lima puluh empat, dua kali dua puluh tujuh, tiga kali delapan belas, dan enam kali sembilan. Semuanya sama dengan lima puluh empat.",
      hapus(0, "pb"),
      tambah("satu", teks("e1", 80, 146, "1 × 54 = 54", 11, W.oranye)),
      tambah("dua", teks("e2", 220, 146, "2 × 27 = 54", 11, W.biru)),
      tambah("tiga", teks("e3", 80, 168, "3 × 18 = 54", 11, W.pinkTua)),
      tambah("enam", teks("e4", 220, 168, "6 × 9 = 54", 11, W.hijau)),
    ),
    k(
      "Hati-hati, ada angka yang sering dikira faktor, yaitu empat. Lima puluh empat dibagi empat hasilnya tiga belas, dan masih sisa dua. Jadi empat bukan faktor dari lima puluh empat.",
      bersih(0),
      tambah(0, judul("Hati-hati: 4 faktor dari 54?", W.merah)),
      tambah("dibagi", teks("j1", 150, 76, "54 : 4 = 13, sisa 2", 18, W.merah)),
      tambah("Jadi", ...kartu("j2", 30, 108, 240, 44, W.merahMuda, ["4 bukan faktor dari 54", "54 : 4 tidak habis"], 10)),
    ),
    k(
      "Jadi daftar yang benar memuat enam, bukan empat, sebab enam kali sembilan sama dengan lima puluh empat.",
      bersih(0),
      tambah(0, judul("Daftar yang benar: faktor 54", W.hijau)),
      tambah(3, c54, k54),
      tambah(5, ...kartu("kb", 20, 128, 260, 36, W.hijauMuda, ["faktor 54: 1, 2, 3, 6, 9, 18, 27, 54", "yang benar 6, bukan 4"], 9.2)),
      tambah(11, teks("pg", 150, 184, "6 × 9 = 54", 16, W.hijau)),
    ),
    k(
      "Tujuh puluh dua. Pasangannya: satu dengan tujuh puluh dua, dua dengan tiga puluh enam, tiga dengan dua puluh empat, empat dengan delapan belas, enam dengan dua belas, dan delapan dengan sembilan.",
      bersih(0),
      tambah(0, judul("Faktor dari 72")),
      tambah(3, c72),
      tambah(4, k72[0]),
      tambah(9, k72[1]),
      tambah(14, k72[2]),
      tambah(19, k72[3]),
      tambah(23, k72[4]),
      tambah(28, k72[5]),
      tambah(30, teks("pb", 150, 164, "6 pasang = 12 faktor", 12, W.biru)),
    ),
    k(
      "Jadi faktor dari tujuh puluh dua ada dua belas. Enam pasang, dan semuanya sudah terpakai.",
      hapus(0, "pb"),
      tambah(10, ...kartu("kn", 10, 148, 280, 40, W.hijauMuda, ["faktor 72: 1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72", "12 faktor, lengkap"], 8)),
    ),
    k(
      "Terakhir sembilan puluh enam: satu dengan sembilan puluh enam, dua dengan empat puluh delapan, tiga dengan tiga puluh dua, empat dengan dua puluh empat, enam dengan enam belas, dan delapan dengan dua belas.",
      bersih(0),
      tambah(0, judul("Faktor dari 96")),
      tambah(3, c96),
      tambah(4, k96[0]),
      tambah(9, k96[1]),
      tambah(14, k96[2]),
      tambah(19, k96[3]),
      tambah(24, k96[4]),
      tambah(29, k96[5]),
      tambah(32, teks("pb", 150, 164, "6 pasang = 12 faktor", 12, W.biru)),
    ),
    k(
      "Mari rangkum kelima bilangan tadi. Dua puluh empat punya delapan faktor, tiga puluh enam sembilan faktor, dan lima puluh empat delapan faktor. Tujuh puluh dua dan sembilan puluh enam sama-sama dua belas faktor.",
      bersih(0),
      tambah(0, judul("Rangkuman latihan")),
      tambah(0, teks("h0", 150, 40, "5 bilangan tadi", 10, W.coklat)),
      tambah("Dua", teks("h1", 150, 64, "24: 8 faktor", 11, W.hijau)),
      tambah("tiga", teks("h4", 150, 88, "36: 9 faktor", 11, W.hijau)),
      tambah("lima@2", teks("h5", 150, 112, "54: 8 faktor", 11, W.hijau)),
      tambah("Tujuh", teks("h6", 150, 136, "72: 12 faktor", 11, W.hijau)),
      tambah("sembilan@2", teks("h7", 150, 160, "96: 12 faktor", 11, W.hijau)),
    ),
  ],
};

/* ------------------------------ 11. Akhir pembelajaran dan Refleksi nomor 4 (Panduan Guru hlm. 65; Buku Siswa hlm. 60) ------------------------------ */
export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup-c",
  judul: "Rangkuman faktor",
  sumber: "Materi: rangkuman faktor",
  latar: "#FFF1F2",
  kutipan: [
    "Akhir Pembelajaran",
    "Berikan kesempatan kepada peserta didik untuk mempresentasikan hasil kerjanya.",
    "Ajak peserta didik untuk menyimpulkan makna dari memotong kertas.",
    "Berikan penguatan tentang manfaat dari faktor bilangan, misalnya untuk membagi sejumlah barang menjadi bagian yang sama banyak dan tidak bersisa.",
    "Berilah tanda centang (√) pada kolom yang sesuai.",
    "Aku dapat menentukan faktor suatu bilangan.",
  ],
  ketukan: [
    k(
      "Sekarang kita rangkum. Coba kamu ceritakan hasil kerjamu, misalnya tabel potongan kertas dan lingkaran faktor.",
      tambah(0, judul("Ayo rangkum")),
      tambah("ceritakan", emo("pr", 150, 76, "🗣", 34)),
      tambah("tabel", ...kartu("pa", 20, 100, 125, 40, W.langit, ["tabel potongan", "kertas"], 9.4)),
      tambah("lingkaran", ...kartu("pb", 155, 100, 125, 40, W.hijauMuda, ["lingkaran", "faktor"], 9.4)),
    ),
    k(
      "Apa makna memotong kertas tadi? Bagian yang sama panjang dan tidak bersisa menunjukkan faktor dari bilangan itu.",
      bersih(0),
      tambah(0, judul("Makna memotong kertas")),
      tambah(3, ...pita("p12x4", 42, 74, 216, 20, 12, 4)),
      tambah(5, teks("mk1", 150, 62, "3 bagian sama panjang, tanpa sisa", 10, W.hitam)),
      tambah(12, teks("mk2", 150, 126, "4 membagi habis 12", 13, W.hijau)),
      tambah(13, teks("mk3", 150, 154, "4 adalah faktor dari 12", 13, W.ungu)),
    ),
    k(
      "Faktor itu bermanfaat, misalnya untuk membagi sejumlah barang menjadi bagian sama banyak dan tidak bersisa, seperti enam permen untuk tiga siswa.",
      bersih(0),
      tambah(0, judul("Manfaat faktor")),
      tambah("barang", emo("mf", 150, 70, "📦", 32)),
      tambah("enam", teks("mp", 150, 122, "6 permen", 14, W.pinkTua)),
      tambah("tiga", teks("ms", 150, 150, "6 : 3 = 2, sisa 0", 14, W.hijau)),
    ),
    k(
      "Rangkuman cara menentukan faktor: cari bilangan yang membagi habis, tulis berpasangan dari yang terkecil, dan jangan lupa satu serta bilangan itu sendiri.",
      bersih(0),
      tambah(0, judul("Cara menentukan faktor")),
      tambah("membagi", ...kartu("rk1", 20, 40, 260, 34, W.hijauMuda, ["bagi habis tanpa sisa"], 10)),
      tambah("berpasangan", ...kartu("rk2", 20, 84, 260, 34, W.langit, ["tulis berpasangan dari yang terkecil"], 10)),
      tambah("satu", ...kartu("rk3", 20, 128, 260, 34, W.pink, ["selalu ada 1 dan bilangan itu sendiri"], 10)),
    ),
    k(
      "Renungan. Tanyakan pada dirimu: apakah aku dapat menentukan faktor dari suatu bilangan? Coba tulis semua faktor dari dua puluh empat tanpa melihat daftar tadi.",
      bersih(0),
      tambah(0, judul("Renungan")),
      tambah("apakah", ...kartu("rf", 20, 44, 260, 44, W.krem, ["Apakah aku dapat menentukan", "faktor suatu bilangan?"], 10.4)),
      tambah("dua", ...kartu("ry", 40, 108, 220, 34, W.hijauMuda, ["coba tulis faktor dari 24"], 11)),
      tambah("tanpa", teks("rc", 150, 170, "tanpa melihat daftar tadi", 10, W.coklat)),
    ),
    k(
      "Itulah faktor: bilangan yang membagi habis sebuah bilangan tanpa sisa. Siapa yang belum yakin, ulangi dengan memotong kertas atau menulis pasangan faktor. Tantangan: cari faktor dari sembilan puluh enam.",
      bersih(0),
      tambah(0, judul("Ringkasan faktor")),
      tambah("Itulah", emo("rg", 150, 78, "🎉", 34)),
      tambah("membagi", ...kartu("rg2", 30, 98, 240, 50, W.hijauMuda, ["faktor: bilangan yang", "membagi habis tanpa sisa"], 10.4)),
      tambah("ulangi", teks("rg3", 150, 166, "ulangi: potong kertas, tulis pasangan", 9.6, W.coklat)),
      tambah("Tantangan", teks("rg4", 150, 190, "Tantangan: faktor dari 96", 11, W.ungu)),
    ),
  ],
};
