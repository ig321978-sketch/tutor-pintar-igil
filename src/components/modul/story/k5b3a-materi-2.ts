import type { AdeganStory } from "./logika-story";
import { W, batang, emo, garis, judul, kartu, kotak, pai, panah, tabel, teks } from "./k5b3a-gambar";
import { bersih, k, sorotkan, tambah, ubah, warnai } from "./k5b3a-bantu";

/* ------------------------------ 4. Mengingat Kembali: empat latihan (Buku Siswa hlm. 66) ------------------------------ */
export const ADEGAN_INGAT: AdeganStory = {
  id: "mengingat-kembali",
  judul: "Mengingat Kembali: empat latihan",
  sumber: "Buku Siswa hlm. 66",
  latar: "#FDF2F8",
  kutipan: [
    "Pada kelas IV dan bab sebelumnya, kalian sudah mempelajari materi",
    "tentang pecahan serta KPK dan FPB.",
    "Tuliskan bentuk pecahan berikut.",
    "Manakah yang merupakan pembilang dan manakah yang",
    "merupakan penyebut?",
    "Manakah yang lebih besar antara",
    "Berapakah KPK dan FPB dari 4 dan 5?",
    "Berapakah pecahan senilai dari",
  ],
  ketukan: [
    k(
      "Mengingat Kembali. Di kelas empat dan bab sebelumnya kalian sudah belajar pecahan serta KPK dan FPB. Ada empat latihan untuk menghangatkan ingatan.",
      tambah(0, judul("Mengingat Kembali")),
      tambah("kelas", emo("bk", 150, 56, "📚", 30)),
      tambah("latihan", ...kartu("c1", 14, 84, 130, 30, W.hijauMuda, ["1. tulis pecahan"], 8.8), ...kartu("c2", 156, 84, 130, 30, W.langit, ["2. mana lebih besar"], 8.8), ...kartu("c3", 14, 122, 130, 30, W.krem, ["3. KPK dan FPB"], 8.8), ...kartu("c4", 156, 122, 130, 30, W.pink, ["4. pecahan senilai"], 8.8)),
    ),
    k(
      "Latihan satu. Sebuah batang dibagi menjadi empat bagian sama besar, dua di antaranya berwarna. Pecahannya dua per empat. Pembilangnya dua, penyebutnya empat.",
      bersih(0),
      tambah(0, judul("Latihan 1: tulis pecahan")),
      tambah("batang", ...batang("lt", 60, 46, 180, 34, 4, 0)),
      warnai("berwarna.", W.karang, "lt-c0", "lt-c1"),
      tambah("Pecahannya", teks("pf", 150, 118, "2/4", 24, W.biru)),
      tambah("Pembilangnya", teks("pb", 80, 160, "pembilang = 2", 9.4, W.merah)),
      tambah("penyebutnya", teks("pn", 220, 160, "penyebut = 4", 9.4, W.hijau)),
    ),
    k(
      "Latihan dua. Mana yang lebih besar, satu per dua atau satu per lima? Sama-sama satu bagian, tetapi satu per dua dibagi menjadi bagian yang lebih sedikit, sehingga bagiannya lebih besar. Jadi satu per dua lebih besar.",
      bersih(0),
      tambah(0, judul("Latihan 2: mana lebih besar?")),
      tambah(8, ...batang("b2", 30, 44, 180, 30, 2, 1), teks("f2", 250, 64, "1/2", 14, W.biru)),
      tambah("lima?", ...batang("b5", 30, 90, 180, 30, 5, 1), teks("f5", 250, 110, "1/5", 14, W.biru)),
      tambah("sedikit,", teks("sd", 150, 140, "bagian lebih sedikit = tiap bagian lebih besar", 8.2, W.ungu)),
      tambah("Jadi", ...kartu("jw", 70, 152, 160, 32, W.emas, ["1/2 > 1/5"], 12)),
    ),
    k(
      "Latihan tiga. KPK dan FPB dari empat dan lima. Kelipatan empat: empat, delapan, dua belas, enam belas, dua puluh. Kelipatan lima: lima, sepuluh, lima belas, dua puluh. KPK-nya dua puluh dan FPB-nya satu.",
      bersih(0),
      tambah(0, judul("Latihan 3: KPK dan FPB")),
      tambah("Kelipatan", teks("k4", 150, 56, "Kelipatan 4: 4, 8, 12, 16, 20", 10, W.biru)),
      tambah("Kelipatan@2", teks("k5", 150, 86, "Kelipatan 5: 5, 10, 15, 20", 10, W.biru)),
      tambah("KPK-nya", teks("kp", 150, 128, "KPK = 20", 16, W.merah)),
      tambah("FPB-nya", teks("fp", 150, 162, "FPB = 1", 16, W.hijau)),
    ),
    k(
      "Latihan empat. Pecahan senilai tiga per empat. Kalikan pembilang dan penyebut dengan bilangan yang sama, misalnya dua. Hasilnya enam per delapan.",
      bersih(0),
      tambah(0, judul("Latihan 4: pecahan senilai")),
      tambah("tiga", ...batang("s4", 20, 40, 110, 30, 4, 3), teks("t4", 75, 90, "3/4", 14, W.biru)),
      tambah("Kalikan", ...kartu("kl", 76, 112, 148, 28, W.krem, ["× 2 atas dan bawah"], 9)),
      tambah("enam", ...batang("s8", 170, 40, 110, 30, 8, 6), teks("t8", 225, 90, "6/8", 14, W.biru)),
      tambah("Hasilnya", teks("sm", 150, 168, "3/4 = 6/8", 20, W.merah)),
    ),
  ],
};

/* ------------------------------ 5. Pengertian pecahan dan bentuknya (Buku Siswa hlm. 66 sampai 68) ------------------------------ */
const gelas = (id: string, x: number, y: number, isi: boolean) => [kotak(`${id}-g`, x, y, 44, 80, W.putih, W.biru, { rx: 4, tebal: 2 }), kotak(`${id}-a`, x + 2, y + 40, 40, 38, W.langit, "none", { rx: 2, op: isi ? 1 : 0.0 })];

export const ADEGAN_PENGERTIAN: AdeganStory = {
  id: "pengertian-pecahan",
  judul: "Pengertian pecahan, pembilang dan penyebut, pecahan biasa dan campuran",
  sumber: "Buku Siswa hlm. 66–68",
  latar: "#F0F9FF",
  kutipan: [
    "Pecahan merupakan bagian dari keseluruhan (part of a whole), pecahan",
    "juga bisa diartikan sebagai bagian dari satuan (part of a unit).",
    "Contoh bagian dari satuan",
    "Gelas tersebut berisi 1 bagian dari 2 bagian gelas.",
    "Contoh bagian dari keseluruhan",
    "Dalam istilah matematika, pecahan terdiri atas pembilang dan penyebut.",
    "Bentuk-Bentuk Pecahan",
    "Pecahan Biasa",
    "Pecahan Campuran",
    "bilangan bulat dan pecahan",
  ],
  ketukan: [
    k(
      "Pengertian pecahan. Pecahan adalah bagian dari keseluruhan, dan bisa juga diartikan sebagai bagian dari satuan.",
      tambah(0, judul("Pengertian pecahan")),
      tambah("keseluruhan,", ...pai("pg", 62, 96, 42, 4, 1), ...kartu("w1", 124, 56, 166, 36, W.krem, ["bagian dari keseluruhan", "(part of a whole)"], 8.4)),
      tambah("satuan.", ...kartu("w2", 124, 110, 166, 36, W.hijauMuda, ["bagian dari satuan", "(part of a unit)"], 8.4)),
    ),
    k(
      "Contoh bagian dari satuan. Gelas ini berisi satu bagian dari dua bagian gelas. Satu bagian dari dua bagian ditulis satu per dua.",
      bersih(0),
      tambah(0, judul("Bagian dari satuan")),
      tambah("Gelas", ...gelas("ge", 70, 52, false)),
      ubah("berisi", { id: "ge-a", op: 1 }),
      tambah("berisi", teks("gt", 205, 84, "1 bagian dari", 9.4, W.biru), teks("gu", 205, 98, "2 bagian gelas", 9.4, W.biru)),
      tambah("ditulis", teks("gf", 205, 140, "1/2", 28, W.merah)),
    ),
    k(
      "Contoh bagian dari keseluruhan. Yohana mengambil dua gelas air putih, lalu meminum satu gelas. Satu dari dua gelas, ditulis satu per dua.",
      bersih(0),
      tambah(0, judul("Bagian dari keseluruhan")),
      tambah("mengambil", ...gelas("ga", 70, 52, true), ...gelas("gb", 150, 52, true), teks("g2", 150, 160, "2 gelas", 10, W.biru)),
      ubah("meminum", { id: "gb-a", op: 0 }),
      tambah("meminum", teks("dm", 172, 46, "diminum", 8.6, W.merah)),
      tambah("ditulis", teks("gf", 245, 100, "1/2", 28, W.merah)),
    ),
    k(
      "Pecahan terdiri atas pembilang dan penyebut. Angka di atas garis pecahan adalah pembilang, angka di bawah garis adalah penyebut.",
      bersih(0),
      tambah(0, judul("Pembilang dan penyebut")),
      tambah("Pecahan", teks("n1", 150, 80, "1", 34, W.biru), garis("gp", 130, 90, 40, 0, W.biru, 3), teks("n2", 150, 128, "2", 34, W.biru)),
      tambah("pembilang@2", teks("lp", 116, 74, "pembilang", 9.6, W.merah, { anchor: "end" })),
      tambah("penyebut@2", teks("ls", 184, 124, "penyebut", 9.6, W.hijau, { anchor: "start" })),
    ),
    k(
      "Ada dua bentuk pecahan. Pecahan biasa, atau murni, punya pembilang dan penyebut, misalnya satu per dua dan tiga per empat. Pecahan campuran terdiri atas bilangan bulat dan pecahan murni, misalnya dua dan satu per dua.",
      bersih(0),
      tambah(0, judul("Dua bentuk pecahan")),
      tambah("biasa,", ...kartu("bb", 10, 34, 134, 40, W.hijauMuda, ["Pecahan biasa", "(murni)"], 8.8)),
      tambah("satu", teks("e1", 77, 108, "1/2", 20, W.biru)),
      tambah("tiga", teks("e2", 77, 144, "3/4", 20, W.biru)),
      tambah("bulat", ...kartu("bc", 156, 34, 134, 40, W.krem, ["Pecahan campuran", "(bulat dan pecahan)"], 8.4)),
      tambah("misalnya@2", teks("e3", 223, 124, "2 1/2", 22, W.merah)),
    ),
  ],
};

/* ------------------------------ 6. Eksplorasi 3.1A: wingko babat (Buku Siswa hlm. 68 sampai 70) ------------------------------ */
const kolom = [30, 120, 100];
const baris = (id: string, r: number, isi: string[], kepala = false) => tabel(id, 24, 34 + r * 24, kolom, [isi], 24, 9, kepala ? W.krem : W.putih);
const POTONG = [2, 3, 5, 6];

export const ADEGAN_EKS31A: AdeganStory = {
  id: "eks-31a-wingko",
  judul: "Eksplorasi 3.1A: pecahan potongan wingko",
  sumber: "Buku Siswa hlm. 68–70",
  latar: "#FFFBEB",
  kutipan: [
    "Wingko babat merupakan makanan khas dari Semarang.",
    "Saat ini",
    "wingko babat memiliki rasa yang beraneka, yaitu orisinal, cokelat,",
    "stroberi, dan sebagainya.",
    "Mari kalian tuliskan pecahan potongan",
    "wingko stroberi pada tabel berikut.",
    "Dapatkah kalian membantuku menentukan bagian yang",
    "lebih besar atau lebih kecil dengan menggunakan konsep",
    "Mari amati dan bandingkan gambar berikut, lalu berilah tanda <, >,",
    "Selanjutnya, tuliskan bagian tersebut dalam bentuk pecahan.",
  ],
  ketukan: [
    k(
      "Eksplorasi tiga titik satu A. Wingko babat adalah makanan khas Semarang. Kini rasanya beraneka: orisinal, cokelat, stroberi, dan lainnya.",
      tambah(0, judul("Eksplorasi 3.1A")),
      tambah("Wingko", ...pai("wg", 74, 104, 46, 1, 1, W.jingga), teks("wgt", 74, 170, "wingko babat", 9, W.coklat)),
      tambah("orisinal,", ...kartu("r0", 150, 52, 130, 26, W.krem, ["orisinal"], 9)),
      tambah("cokelat,", ...kartu("r1", 150, 88, 130, 26, W.jingga, ["cokelat"], 9)),
      tambah("stroberi,", ...kartu("r2", 150, 124, 130, 26, W.pink, ["stroberi"], 9)),
    ),
    k(
      "Tugasnya menuliskan pecahan potongan wingko stroberi pada tabel. Ada empat gambar wingko: dibagi dua, tiga, lima, dan enam bagian sama besar.",
      bersih(0),
      tambah(0, judul("Eksplorasi 3.1A")),
      tambah("tabel.", baris("r0", 0, ["No.", "Wingko dibagi", "Pecahan stroberi"], true)),
      tambah("dua,", baris("r1", 1, ["1", `${POTONG[0]} bagian`, "..."])),
      tambah("tiga,", baris("r2", 2, ["2", `${POTONG[1]} bagian`, "..."])),
      tambah("lima,", baris("r3", 3, ["3", `${POTONG[2]} bagian`, "..."])),
      tambah("enam", baris("r4", 4, ["4", `${POTONG[3]} bagian`, "..."])),
    ),
    k(
      "Satu potong stroberi dari wingko yang dibagi dua adalah satu per dua. Dari tiga bagian, satu per tiga. Dari lima, satu per lima. Dari enam, satu per enam.",
      ubah("adalah", { id: "r1-t02", isi: "1/2", warna: W.merah }),
      ubah("tiga", { id: "r2-t02", isi: "1/3", warna: W.merah }),
      ubah("lima,", { id: "r3-t02", isi: "1/5", warna: W.merah }),
      ubah("enam", { id: "r4-t02", isi: "1/6", warna: W.merah }),
    ),
    k(
      "Dapatkah kalian menentukan bagian yang lebih besar atau lebih kecil dengan konsep pecahan? Perhatikan, makin banyak potongan sama besar, makin kecil tiap potongannya. Jadi satu per dua jauh lebih besar daripada satu per enam.",
      bersih(0),
      tambah(0, judul("Mana lebih besar, mana lebih kecil?")),
      tambah("Perhatikan,", ...pai("pa", 80, 92, 44, 2, 1), teks("fa", 80, 160, "1/2", 14, W.biru)),
      tambah("kecil@2", ...pai("pb", 220, 92, 44, 6, 1), teks("fb", 220, 160, "1/6", 14, W.biru)),
      tambah("Jadi", ...kartu("jw", 90, 172, 120, 24, W.emas, ["1/2 > 1/6"], 11)),
    ),
    k(
      "Lalu bandingkan dua gambar wingko dengan tanda lebih kecil, lebih besar, atau sama dengan. Gambar kiri memperlihatkan satu per dua bagian, gambar kanan satu per tiga bagian.",
      bersih(0),
      tambah(0, judul("Bandingkan dua wingko")),
      tambah("kiri", ...pai("ql", 80, 92, 42, 2, 1), teks("qa", 80, 152, "1/2", 14, W.biru)),
      tambah("kanan", ...pai("qr", 220, 92, 42, 3, 1), teks("qb", 220, 152, "1/3", 14, W.biru)),
      tambah("Lalu", teks("qt", 150, 96, "...", 22, W.merah)),
    ),
    k(
      "Satu per dua lebih besar daripada satu per tiga, jadi tanda yang tepat adalah lebih besar.",
      ubah("tepat", { id: "qt", isi: ">" }),
      tambah("Satu", ...kartu("qk", 70, 168, 160, 26, W.emas, ["1/2 > 1/3"], 11.5)),
    ),
  ],
};

/* ------------------------------ 7. Eksplorasi 3.1B: lompatan Yohana, mengubah campuran menjadi biasa (Buku Siswa hlm. 70 sampai 72) ------------------------------ */
export const ADEGAN_EKS31B: AdeganStory = {
  id: "eks-31b-lompat",
  judul: "Eksplorasi 3.1B: lompat jauh Yohana",
  sumber: "Buku Siswa hlm. 70–72",
  latar: "#F0FDF4",
  kutipan: [
    "Yohana seorang atlet lompat jauh.",
    "untuk mempersiapkan kejuaraan.",
    "Yohana mengurutkan hasil lompatannya dari jarak yang terjauh",
    "sampai terdekat? Lompatan mana yang paling panjang?",
    "Terlebih dahulu, mari kita berlatih mengubah bentuk pecahan",
    "campuran menjadi bentuk pecahan biasa.",
    "Mengubah ke bentuk pecahan biasa",
  ],
  ketukan: [
    k(
      "Eksplorasi tiga titik satu B. Yohana atlet lompat jauh dan rajin berlatih untuk kejuaraan. Tiga lompatannya: dua dan tiga per empat meter, tiga dan satu per dua meter, serta tujuh per delapan meter.",
      tambah(0, judul("Eksplorasi 3.1B")),
      tambah("Yohana", emo("yh", 40, 66, "🤸", 34)),
      tambah("lompatannya:", ...tabel("lm", 70, 40, [64, 118], [["Lompatan", "Jarak"]], 22, 9, W.krem)),
      tambah("empat", ...tabel("lm1", 70, 62, [64, 118], [["1", "2 3/4 m"]], 22, 10, W.putih)),
      tambah("dua@2", ...tabel("lm2", 70, 84, [64, 118], [["2", "3 1/2 m"]], 22, 10, W.putih)),
      tambah("delapan", ...tabel("lm3", 70, 106, [64, 118], [["3", "7/8 m"]], 22, 10, W.putih)),
    ),
    k(
      "Pertanyaannya, dapatkah kalian membantu Yohana mengurutkan lompatan dari yang terjauh sampai terdekat? Lompatan mana yang paling panjang?",
      tambah("terjauh", ...kartu("tj", 30, 146, 90, 28, W.hijauMuda, ["terjauh"], 9.4)),
      tambah("sampai", panah("pj", 124, 160, 52, 0, W.biru, 2, { gambar: true })),
      tambah("terdekat?", ...kartu("td", 180, 146, 90, 28, W.pink, ["terdekat"], 9.4)),
      tambah("paling", teks("pq", 150, 192, "mana yang paling panjang?", 9.6, W.merah)),
    ),
    k(
      "Langkah pertama, menyamakan bentuk pecahan. Pecahan campuran diubah dulu menjadi pecahan biasa. Itu berlaku untuk dua dan tiga per empat, serta tiga dan satu per dua.",
      sorotkan("campuran", "lm1-s01", "lm2-s01"),
      tambah("diubah", teks("cb", 256, 76, "campuran", 8, W.merah, { anchor: "start" }), teks("cb2", 256, 98, "campuran", 8, W.merah, { anchor: "start" })),
      tambah("biasa.", teks("sb", 256, 120, "biasa", 8, W.hijau, { anchor: "start" })),
    ),
    k(
      "Dua dan tiga per empat: dua kali empat, lalu tambah tiga, hasilnya sebelas, tetap per empat. Jadi sebelas per empat.",
      bersih(0),
      tambah(0, judul("Campuran menjadi biasa")),
      tambah(0, teks("m1", 150, 58, "2 3/4", 22, W.biru)),
      tambah("kali", teks("m2", 150, 100, "(2 × 4) + 3 = 11", 14, W.biru)),
      tambah("tetap", teks("m3", 150, 126, "penyebut tetap 4", 9.6, W.ungu)),
      tambah("Jadi", teks("m4", 150, 168, "2 3/4 = 11/4", 20, W.merah)),
    ),
    k(
      "Tiga dan satu per dua: tiga kali dua, lalu tambah satu, hasilnya tujuh, tetap per dua. Jadi tujuh per dua.",
      bersih(0),
      tambah(0, judul("Campuran menjadi biasa")),
      tambah(0, teks("n1", 150, 58, "3 1/2", 22, W.biru)),
      tambah("kali", teks("n2", 150, 100, "(3 × 2) + 1 = 7", 14, W.biru)),
      tambah("tetap", teks("n3", 150, 126, "penyebut tetap 2", 9.6, W.ungu)),
      tambah("Jadi", teks("n4", 150, 168, "3 1/2 = 7/2", 20, W.merah)),
    ),
  ],
};
