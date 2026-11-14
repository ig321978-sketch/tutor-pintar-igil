import type { AdeganStory, Obj } from "./logika-story";
import { PENGAYAAN, TITIK_DENAH, TITIK_EKSTRA, W, denahHuruf, denahRuang, denahSisi, denahTepi, emo, judul, kartu, kotak, layar, panah, poligon, skala, tabel, teks } from "./k5b4e-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k5b4e-bantu";

const OX = 22;
const OY = 36;
const S = 11;
const PX = 234;
const baris = (id: string, y: number, isi: string, u = 9.6, warna: string = W.biru): Obj => teks(id, PX, y, isi, u, warna);
const ruang = (id: string, kode?: string[]): Obj[] => denahRuang(id, OX, OY, S, kode);
const sisi = (id: string, n: string, warna: string = W.merah, tebal = 3.6): Obj => denahSisi(id, OX, OY, S, n, warna, tebal, { z: 6 });
const huruf = (id: string, h: string, dx: number, dy: number, warna: string = W.merah): Obj => {
  const [x, y] = layar(OX, OY, S, TITIK_DENAH[h] ?? TITIK_EKSTRA[h]);
  return teks(id, x + dx, y + dy + 2, h, 7, warna);
};

/* ------------------------------ 6. Missing Length: konsep ------------------------------ */
export const ADEGAN_LUAR_ML: AdeganStory = {
  id: "luar-ml",
  judul: "Missing Length: mencari sisi yang hilang",
  sumber: "Metode luar: Missing Length",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Metode ketiga, Missing Length, artinya mencari sisi yang hilang. Panjang yang tidak tertulis ditemukan dari panjang-panjang lain yang diketahui.",
      tambah(0, judul("Missing Length")),
      tambah("Metode", kotak("ml1", 40, 70, 160, 40, W.krem, W.biru, { rx: 0, tebal: 2 }), teks("ml1a", 120, 64, "8", 11, W.biru)),
      tambah("tidak", kotak("ml1b", 120, 70, 80, 40, W.pink, W.merah, { rx: 0, tebal: 2 }), teks("ml1c", 160, 94, "?", 20, W.merah)),
      tambah("diketahui.", teks("ml1d", 80, 94, "6", 14, W.biru)),
    ),
    k(
      "Aturan pertama: bagian ditambah bagian sama dengan keseluruhan. Jadi bagian yang hilang sama dengan keseluruhan dikurangi bagian yang diketahui.",
      bersih(0),
      tambah(0, judul("Aturan 1: bagian dan keseluruhan")),
      tambah("bagian", kotak("a1", 30, 50, 240, 30, W.langit, W.biru, { rx: 0, tebal: 2 }), teks("a1t", 150, 70, "keseluruhan: 8", 11, W.biru)),
      tambah("ditambah", kotak("a2", 30, 90, 150, 30, W.krem, W.biru, { rx: 0, tebal: 2 }), teks("a2t", 105, 110, "diketahui: 6", 10, W.biru)),
      tambah("hilang", kotak("a3", 180, 90, 90, 30, W.pink, W.merah, { rx: 0, tebal: 2 }), teks("a3t", 225, 110, "hilang: ?", 10, W.merah)),
      tambah("dikurangi", teks("a4", 150, 150, "hilang = keseluruhan − bagian", 11, W.coklat), teks("a5", 150, 172, "8 − 6 = 2", 14, W.hijau)),
    ),
    k(
      "Aturan kedua: sisi yang berhadapan pada persegi panjang sama panjang. Ukuran bisa dipindahkan dari sisi yang diketahui ke sisi yang belum diketahui.",
      bersih(0),
      tambah(0, judul("Aturan 2: sisi berhadapan")),
      tambah("persegi", kotak("b1", 70, 50, 160, 70, W.hijauMuda, W.biru, { rx: 0, tebal: 2 })),
      tambah("sama", teks("b2", 150, 44, "4 m", 11, W.biru), teks("b3", 150, 138, "?", 14, W.merah)),
      tambah("dipindahkan", teks("b5", 150, 168, "? = 4 m", 14, W.hijau)),
    ),
    k(
      "Kelebihannya, tidak perlu mengukur ulang. Kekurangannya, kita harus teliti memilih mana keseluruhan dan mana bagiannya.",
      bersih(0),
      tambah(0, judul("Kelebihan dan kekurangan")),
      tambah("Kelebihannya,", ...kartu("kl", 14, 40, 130, 54, W.hijauMuda, ["tidak perlu", "mengukur ulang"], 9), emo("kle", 79, 120, "👍", 24)),
      tambah("Kekurangannya,", ...kartu("kk", 156, 40, 130, 54, W.merahMuda, ["harus teliti memilih", "keseluruhan dan bagian"], 8.6), emo("kke", 221, 120, "🤔", 24)),
    ),
  ],
};

/* ------------------------------ 7. Missing Length: penerapan ------------------------------ */
export const ADEGAN_LUAR_ML_TERAPAN: AdeganStory = {
  id: "luar-ml-terapan",
  judul: "Missing Length pada denah rumah dan soal pengayaan",
  sumber: "Metode luar: Missing Length; Buku Siswa hlm. 127; Panduan Guru hlm. 164 dan 173",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Pada denah rumah, panjang A O delapan meter, dan B O sama dengan C D, yaitu enam meter. Maka A B sama dengan delapan dikurangi enam, dua meter.",
      tambah(0, judul("Denah: sisi A B")),
      tambah(0, ...ruang("mt"), denahTepi("mtt", OX, OY, S, W.biru, 2, { z: 5 })),
      tambah("Pada", sisi("ab1", "AO", W.ungu, 3), baris("t1", 64, "AO = 8 m", 10, W.ungu), huruf("hA", "A", -6, 6), huruf("hO", "O", 7, 6), huruf("hB", "B", 5, 6)),
      tambah("Maka", sisi("ab2", "AB", W.hijau), baris("t2", 84, "BO = CD = 6 m", 9.6), baris("t3", 104, "AB = 8 − 6 = 2 m", 10, W.hijau)),
    ),
    k(
      "A B dan M N berhadapan pada sebuah persegi panjang, jadi sisi M N juga dua meter.",
      hapus(0, "ab1", "t1", "t2", "t3", "hO", "hB"),
      tambah("berhadapan", sisi("mn1", "MN", W.hijau), huruf("hM", "M", 7, -3), huruf("hN", "N", -6, -3), baris("t4", 90, "MN = AB = 2 m", 10.4, W.hijau)),
    ),
    k(
      "J D dua belas meter dan I E delapan meter. Maka sisa J I ditambah E D sama dengan dua belas dikurangi delapan, yaitu empat meter.",
      hapus(0, "hA", "hM", "hN", "ab2", "mn1", "t4"),
      tambah("dua", sisi("jd1", "JD", W.ungu, 3), baris("t5", 70, "JD = 12 m", 10, W.ungu)),
      tambah("delapan", sisi("ie1", "IE", W.hijau, 3), baris("t6", 88, "IE = 8 m", 10, W.hijau)),
      tambah("yaitu", baris("t7", 112, "JI + ED = 12 − 8 = 4 m", 8.8, W.merah)),
    ),
    k(
      "Pada soal pengayaan, bagian bawah E G dua belas meter dan E F tiga meter. Maka F G sama dengan dua belas dikurangi tiga, sembilan meter. Lalu A B sama dengan dua puluh empat dikurangi sembilan, lima belas meter.",
      bersih(0),
      tambah(0, judul("Pengayaan: sisi F G dan A B")),
      tambah("soal", poligon("pe", 14, 44, skala(PENGAYAAN, 6), W.langit, W.biru, { tebal: 2 })),
      tambah("Maka", baris("u1", 66, "FG = 12 − 3 = 9", 9.6)),
      tambah("Lalu", baris("u2", 86, "AB = 24 − 9 = 15", 9.6, W.hijau)),
      tambah("sembilan", teks("u3", 14 + 20 * 6, 44 + 20 * 6 + 12, "9", 8, W.merah)),
      tambah("lima", teks("u4", 14 + 7.5 * 6, 44 + 6 * 6 + 10, "15", 8, W.hijau)),
    ),
    k(
      "Dengan semua sisi lengkap, keliling tinggal dijumlahkan: denah rumah empat puluh delapan meter, dan gedung sekolah sembilan puluh empat meter.",
      bersih(0),
      tambah(0, judul("Setelah sisi lengkap")),
      tambah("denah", ...kartu("w1", 20, 44, 260, 40, W.hijauMuda, ["denah rumah:", "keliling 48 m"], 10)),
      tambah("gedung", ...kartu("w2", 20, 100, 260, 40, W.langit, ["gedung sekolah:", "keliling 94 m"], 10)),
    ),
  ],
};

/* ------------------------------ 8. Closed Path Balance: konsep ------------------------------ */
export const ADEGAN_LUAR_CPB: AdeganStory = {
  id: "luar-cpb",
  judul: "Closed Path Balance: keseimbangan jalur tertutup",
  sumber: "Metode luar: Closed Path Balance",
  latar: "#FDF4FF",
  ketukan: [
    k(
      "Metode keempat, Closed Path Balance, memeriksa keliling dengan keseimbangan jalur tertutup. Berjalan menyusuri tepi satu putaran akan kembali tepat ke titik awal.",
      tambah(0, judul("Closed Path Balance")),
      tambah("Metode", kotak("c1", 80, 50, 140, 90, W.krem, W.biru, { rx: 0, tebal: 2 })),
      tambah("menyusuri", panah("c2", 80, 50, 140, 0, W.merah, 2.4, { z: 6 }), panah("c3", 220, 50, 0, 90, W.merah, 2.4, { z: 6 }), panah("c4", 220, 140, -140, 0, W.merah, 2.4, { z: 6 }), panah("c5", 80, 140, 0, -90, W.merah, 2.4, { z: 6 })),
      tambah("titik", teks("c6", 150, 100, "kembali ke awal", 10, W.merah)),
    ),
    k(
      "Karena kembali ke awal, jumlah langkah ke timur sama dengan jumlah langkah ke barat, dan jumlah langkah ke utara sama dengan jumlah langkah ke selatan.",
      bersih(0),
      tambah(0, judul("Timur = barat, utara = selatan")),
      tambah("timur", ...kartu("d1", 20, 36, 120, 40, W.langit, ["timur", "sama dengan barat"], 9)),
      tambah("utara", ...kartu("d2", 160, 36, 120, 40, W.hijauMuda, ["utara", "sama dengan selatan"], 9)),
      tambah("kembali", teks("d3", 150, 130, "jalur tertutup: seimbang", 12, W.ungu)),
    ),
    k(
      "Contoh ruang tamu enam kali empat meter: timur enam, barat enam, utara empat, selatan empat. Keliling sama dengan semua langkah, yaitu enam ditambah enam ditambah empat ditambah empat, dua puluh meter.",
      bersih(0),
      tambah(0, judul("Contoh ruang tamu")),
      tambah("ruang", kotak("e1", 52, 52, 132, 88, W.langit, W.biru, { rx: 0, tebal: 2 })),
      tambah("timur", teks("e2", 118, 150, "timur 6", 9, W.biru), teks("e3", 118, 46, "barat 6", 9, W.biru)),
      tambah("utara", teks("e4", 216, 100, "utara 4", 9, W.hijau), teks("e5", 26, 100, "selatan 4", 9, W.hijau)),
      tambah("Keliling", baris("e6", 140, "6 + 6 + 4 + 4 = 20 m", 9.6, W.merah)),
    ),
    k(
      "Gunanya ganda: memeriksa jumlah, dan menemukan sisi yang hilang. Kalau timur dan barat tidak sama, ada panjang yang salah atau belum tercatat.",
      bersih(0),
      tambah(0, judul("Gunanya ganda")),
      tambah("memeriksa", ...kartu("f1", 20, 40, 260, 36, W.hijauMuda, ["memeriksa jumlah keliling"], 9.6)),
      tambah("menemukan", ...kartu("f2", 20, 88, 260, 36, W.krem, ["menemukan sisi yang hilang"], 9.6)),
      tambah("tidak", teks("f3", 150, 160, "timur ≠ barat: ada yang salah", 10.4, W.merah)),
    ),
  ],
};

/* ------------------------------ 9. Closed Path Balance: penerapan ------------------------------ */
export const ADEGAN_LUAR_CPB_TERAPAN: AdeganStory = {
  id: "luar-cpb-terapan",
  judul: "Closed Path Balance pada denah rumah dan soal pengayaan",
  sumber: "Metode luar: Closed Path Balance; Buku Siswa hlm. 126; Panduan Guru hlm. 173",
  latar: "#FDF4FF",
  ketukan: [
    k(
      "Berjalanlah dari titik A mengikuti urutan huruf pada denah. Langkah ke timur ada tiga: dua, enam, dan empat, jumlahnya dua belas meter.",
      tambah(0, judul("Denah: langkah ke timur")),
      tambah(0, ...ruang("cp"), denahTepi("cpt", OX, OY, S, W.biru, 2, { z: 5 }), ...denahHuruf("cph", OX, OY, S)),
      tambah("timur", sisi("pAB", "AB", W.merah), sisi("pCD", "CD", W.merah), sisi("pEF", "EF", W.merah)),
      tambah("jumlahnya", baris("w1", 80, "timur: 2 + 6 + 4 = 12", 9.4, W.merah)),
    ),
    k(
      "Langkah ke barat ada empat: empat, dua, empat, dan dua, jumlahnya dua belas. Seimbang dengan timur.",
      tambah("barat", sisi("pHI", "HI", W.biru), sisi("pJK", "JK", W.biru), sisi("pKL", "KL", W.biru), sisi("pMN", "MN", W.biru)),
      tambah("jumlahnya", baris("w2", 100, "barat: 4 + 2 + 4 + 2 = 12", 9.4, W.biru)),
      tambah("Seimbang", emo("w2e", PX, 128, "⚖", 24)),
    ),
    k(
      "Langkah ke utara: dua, empat, empat, dan dua, jumlahnya dua belas. Langkah ke selatan: empat, empat, dan empat, juga dua belas. Semuanya seimbang.",
      ubah(0, { id: "w2e", op: 0 }),
      tambah("utara:", sisi("pDE", "DE", W.hijau), sisi("pFG", "FG", W.hijau), sisi("pGH", "GH", W.hijau), sisi("pIJ", "IJ", W.hijau)),
      tambah("jumlahnya", baris("w3", 144, "utara: 2 + 4 + 4 + 2 = 12", 9.4, W.hijau)),
      tambah("selatan:", sisi("pBC", "BC", W.ungu), sisi("pLM", "LM", W.ungu), sisi("pNA", "NA", W.ungu)),
      tambah("juga", baris("w4", 164, "selatan: 4 + 4 + 4 = 12", 9.4, W.ungu)),
    ),
    k(
      "Keliling sama dengan semua langkah: dua kali dua belas ditambah dua kali dua belas, yaitu empat puluh delapan meter.",
      bersih(0),
      tambah(0, judul("Keliling denah")),
      tambah("Keliling", ...kartu("x1", 30, 44, 240, 36, W.langit, ["timur + barat = 12 + 12"], 10)),
      tambah("dua@2", ...kartu("x2", 30, 92, 240, 36, W.hijauMuda, ["utara + selatan = 12 + 12"], 10)),
      tambah("yaitu", teks("x3", 150, 168, "24 + 24 = 48 m", 16, W.hijau)),
    ),
    k(
      "Pada soal pengayaan: timur dua puluh empat ditambah tiga sama dengan barat dua belas ditambah A B. Jadi A B lima belas meter, dan keliling dua kali dua puluh tujuh ditambah dua kali dua puluh, sembilan puluh empat.",
      bersih(0),
      tambah(0, judul("Pengayaan: keseimbangan")),
      tambah("soal", poligon("px", 14, 44, skala(PENGAYAAN, 6), W.langit, W.biru, { tebal: 2 })),
      tambah("timur", baris("y1", 66, "timur: 24 + 3 = 27", 9.4, W.merah)),
      tambah("barat", baris("y2", 84, "barat: 12 + AB = 27", 9.4, W.biru)),
      tambah("Jadi", baris("y3", 102, "AB = 27 − 12 = 15 m", 9.4, W.hijau)),
      tambah("keliling", baris("y4", 126, "2 × 27 + 2 × 20 = 94", 8.8, W.coklat)),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode luar",
  sumber: "Ringkasan metode luar; Sub-Bab E",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Ringkasan empat metode. Outer Path Only: hanya tepi luar. Bounding Rectangle: bungkus dengan persegi panjang. Missing Length: cari sisi yang hilang. Closed Path Balance: timur sama dengan barat, utara sama dengan selatan.",
      tambah(0, judul("Ringkasan empat metode")),
      tambah("Outer", ...kartu("r1", 14, 30, 272, 32, W.hijauMuda, ["Outer Path Only: hanya tepi luar"], 9)),
      tambah("Bounding", ...kartu("r2", 14, 70, 272, 32, W.langit, ["Bounding Rectangle: bungkus dengan persegi panjang"], 8.6)),
      tambah("Missing", ...kartu("r3", 14, 110, 272, 32, W.krem, ["Missing Length: cari sisi yang hilang"], 9)),
      tambah("Closed", ...kartu("r4", 14, 150, 272, 32, W.pink, ["Closed Path Balance: timur = barat, utara = selatan"], 8.4)),
    ),
    k(
      "Kapan memakai apa? Bila bentuknya tangga, bingkai paling cepat. Bila ada bagian menjorok atau sisi yang hilang, cari sisinya, lalu periksa dengan keseimbangan jalur.",
      bersih(0),
      tambah(0, judul("Kapan memakai apa?")),
      tambah("tangga,", ...kartu("s1", 20, 40, 260, 40, W.langit, ["bentuk tangga:", "bingkai paling cepat"], 9.4)),
      tambah("menjorok", ...kartu("s2", 20, 94, 260, 40, W.krem, ["menjorok atau sisi hilang:", "cari sisi, periksa keseimbangan"], 9.4)),
    ),
    k(
      "Apa pun metodenya, hasilnya sama. Denah rumah empat puluh delapan meter, Uji Kompetensi nomor lima empat puluh enam sentimeter, dan gedung sekolah sembilan puluh empat meter.",
      bersih(0),
      tambah(0, judul("Hasil yang sama")),
      tambah("Denah", ...tabel("hs", 30, 44, [150, 90], [["Soal", "Keliling"], ["denah rumah", "48 m"], ["Uji Kompetensi 5", "46 cm"], ["gedung sekolah", "94 m"]], 24, 9.4)),
      tambah("Apa", emo("hse", 150, 170, "🎯", 22)),
    ),
    k(
      "Pilih metode yang paling nyaman bagimu, lalu periksa dengan metode lain. Dua jalan yang sampai pada hasil yang sama membuat kita yakin.",
      bersih(0),
      tambah(0, judul("Periksa dengan dua jalan")),
      tambah("Pilih", ...kartu("p1", 20, 40, 120, 50, W.hijauMuda, ["metode yang", "paling nyaman"], 9.4)),
      tambah("periksa", ...kartu("p2", 160, 40, 120, 50, W.langit, ["periksa dengan", "metode lain"], 9.4)),
      tambah("sama", emo("p3", 150, 128, "✅", 36)),
    ),
  ],
};
