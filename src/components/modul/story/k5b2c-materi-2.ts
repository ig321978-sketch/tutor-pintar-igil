import type { AdeganStory, Obj } from "./logika-story";
import { W, deret, emo, faktor, idPita, judul, kartu, kotak, kurungDeret, pita, sebar, teks } from "./k5b2c-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k5b2c-bantu";

/* Tabel hasil potongan: baris atas panjang tiap bagian, baris bawah banyaknya hasil potongan (enam kolom). */
const kolomX = (i: number): number => 80 + i * 34;
const rangkaTabel = (): Obj[] => [
  kotak("tk0", 8, 40, 68, 24, W.langit, W.biru, { rx: 0, tebal: 1.1 }),
  kotak("tk1", 8, 64, 68, 24, W.krem, W.biru, { rx: 0, tebal: 1.1 }),
  teks("tl0", 42, 55, "panjang bagian", 7.4, W.biru),
  teks("tl1", 42, 79, "banyak potongan", 7.4, W.merah),
  ...Array.from({ length: 6 }, (_, i) => [kotak(`tc0-${i}`, kolomX(i), 40, 34, 24, W.langit, W.biru, { rx: 0, tebal: 1.1 }), kotak(`tc1-${i}`, kolomX(i), 64, 34, 24, W.krem, W.biru, { rx: 0, tebal: 1.1 })]).flat(),
];
const isiKolom = (i: number, p: number, b: number): Obj[] => [teks(`tp${i}`, kolomX(i) + 17, 56, String(p), 11, W.biru), teks(`tb${i}`, kolomX(i) + 17, 80, String(b), 11, W.merah)];
const tabelPenuh = (n: number): Obj[] => [...rangkaTabel(), ...faktor(n).flatMap((p, i) => isiKolom(i, p, n / p))];

/* ------------------------------ 5. Eksplorasi 2.3A: memotong pita (Buku Siswa hlm. 43) ------------------------------ */
export const ADEGAN_EKS23A: AdeganStory = {
  id: "eks-23a",
  judul: "Eksplorasi 2.3A: Ayo Berkreasi",
  sumber: "Buku Siswa hlm. 43",
  latar: "#FFF7ED",
  kutipan: [
    "Eksplorasi 2.3A",
    "Ayo Berkreasi",
    "Sediakan 6 lembar potongan kertas berpetak. Setiap potongan berukuran panjang 12 petak dan lebar 1 petak.",
    "Potong kertas berpetak yang sudah disiapkan di langkah ke-1. Panjang tiap potongan harus sama dan tidak boleh ada kertas yang tersisa.",
    "Panjang tiap bagian adalah 2 satuan. Hasilnya adalah 6 potong.",
    "Potongan seperti gambar di atas tidak diperbolehkan karena ada sisa kertas dengan panjang 2 satuan.",
    "Teman-teman, kita harus berhati-hati saat menggunakan gunting. Ayo, kita gunakan gunting hanya untuk menggunting kertas.",
  ],
  ketukan: [
    k(
      "Eksplorasi dua titik tiga A, Ayo Berkreasi. Langkah satu: sediakan enam lembar potongan kertas berpetak. Tiap potongan panjangnya dua belas petak dan lebarnya satu petak.",
      tambah(0, judul("Eksplorasi 2.3A")),
      tambah("Langkah", teks("l1", 150, 40, "Langkah 1", 11, W.merah)),
      tambah("enam", teks("l6", 150, 58, "6 lembar", 11, W.coklat)),
      tambah("dua@2", ...pita("p12x12", 42, 82, 216, 18, 12, 12, W.hijauPita), teks("kp", 150, 74, "panjang 12 petak", 10, W.hitam)),
      tambah("lebarnya", teks("lb", 150, 120, "lebar 1 petak", 10, W.hitam)),
    ),
    k(
      "Langkah dua: potong kertas berpetak itu. Panjang tiap potongan harus sama, dan tidak boleh ada kertas yang tersisa. Ingat pesan Nisa: gunting hanya untuk menggunting kertas.",
      ubah("Langkah", { id: "l1", isi: "Langkah 2" }),
      tambah("sama", teks("sm", 150, 144, "sama panjang", 12, W.hijau)),
      tambah("tersisa.", teks("ts", 150, 162, "tanpa sisa", 12, W.merah)),
      tambah("menggunting", ...kartu("gk", 70, 170, 160, 24, W.merahMuda, ["gunting hanya untuk kertas"], 8.6)),
    ),
    k(
      "Contoh yang benar: panjang tiap bagian dua satuan. Dua belas petak terbagi menjadi enam potong, dan tidak ada sisa.",
      bersih(0),
      tambah(0, judul("Contoh yang benar", W.hijau)),
      tambah("panjang", ...pita("p12x2", 42, 72, 216, 20, 12, 2), teks("c1", 150, 62, "tiap bagian: 2 satuan", 10, W.hitam)),
      tambah("terbagi", teks("c2", 150, 126, "12 petak = 6 potong", 13, W.hijau)),
      tambah("sisa.", teks("c3", 150, 156, "sisa 0", 14, W.hijau)),
    ),
    k(
      "Contoh yang salah: panjang tiap bagian lima satuan. Dua potongan berisi lima petak, tetapi masih tersisa dua petak. Karena ada sisa, potongan ini tidak diperbolehkan.",
      bersih(0),
      tambah(0, judul("Contoh yang salah", W.merah)),
      tambah("panjang", ...pita("p12x5", 42, 72, 216, 20, 12, 5), teks("w1", 150, 62, "tiap bagian: 5 satuan", 10, W.hitam)),
      tambah("tersisa", teks("w2", 150, 126, "sisa 2 petak", 13, W.merah)),
      tambah("diperbolehkan.", teks("w3", 150, 156, "tidak diperbolehkan", 12, W.merah)),
    ),
    k(
      "Jadi potongan yang boleh hanyalah yang sama panjang dan habis tepat. Panjang dua boleh, panjang lima tidak boleh. Nanti kita coba semua panjang yang mungkin.",
      bersih(0),
      tambah(0, judul("Boleh atau tidak?")),
      tambah("dua", ...kartu("yb", 20, 50, 125, 60, W.hijauMuda, ["panjang 2", "boleh: tanpa sisa"], 9.4)),
      tambah("lima", ...kartu("nb", 155, 50, 125, 60, W.merahMuda, ["panjang 5", "tidak boleh: sisa 2"], 9.4)),
      tambah("semua", teks("mc", 150, 150, "coba semua panjang", 12, W.ungu)),
    ),
  ],
};

/* ------------------------------ 6. Tabel hasil potongan dan faktor dari 12 (Buku Siswa hlm. 44; Panduan Guru hlm. 64) ------------------------------ */
export const ADEGAN_TABEL12: AdeganStory = {
  id: "tabel-12",
  judul: "Tabel potongan dan faktor dari 12",
  sumber: "Buku Siswa hlm. 44; Panduan Guru hlm. 64",
  latar: "#F0F9FF",
  kutipan: [
    "Tuliskan hasil pemotongan kertas pada tabel berikut.",
    "Panjang tiap bagian 1 2 ... ... ... ... Banyaknya hasil potongan 12 6 ... ... ... ...",
    "Tuliskan semua bilangan yang muncul dalam tabel pada langkah ke-3. Jika ada 2 bilangan yang sama, kalian cukup menuliskan sekali saja.",
    "Bilangan yang kalian tuliskan pada langkah ke-4 disebut faktor dari 12.",
    "Bilangan cacah yang dapat membagi 12 tanpa ada sisa disebut faktor dari 12.",
    "Faktor dari 12 adalah 1, 2, 3, 4, 6, dan 12.",
    "Panjang tiap bagian 1 2 3 4 6 12 Banyaknya hasil potongan 12 6 4 3 2 1",
  ],
  ketukan: [
    k(
      "Langkah tiga: tuliskan hasil pemotongan pada tabel. Tabelnya punya baris panjang tiap bagian, dan baris banyaknya hasil potongan.",
      tambah(0, judul("Langkah 3: tabel hasil potongan")),
      tambah("tabel", rangkaTabel()),
    ),
    k(
      "Kalau panjang tiap bagian satu, hasilnya dua belas potong. Panjang dua, jadi enam potong. Panjang tiga, jadi empat potong.",
      tambah("satu", isiKolom(0, 1, 12), pita("p12x1", 42, 128, 216, 18, 12, 1), teks("pl", 150, 120, "tiap bagian 1 petak", 10, W.hitam)),
      hapus("dua@2", ...idPita("p12x1", 12, 1)),
      tambah("dua@2", isiKolom(1, 2, 6), pita("p12x2", 42, 128, 216, 18, 12, 2)),
      ubah("dua@2", { id: "pl", isi: "tiap bagian 2 petak" }),
      hapus("tiga", ...idPita("p12x2", 12, 2)),
      tambah("tiga", isiKolom(2, 3, 4), pita("p12x3", 42, 128, 216, 18, 12, 3)),
      ubah("tiga", { id: "pl", isi: "tiap bagian 3 petak" }),
    ),
    k(
      "Panjang empat, jadi tiga potong. Panjang enam, jadi dua potong. Panjang dua belas, jadi satu potong. Semuanya habis tanpa sisa.",
      hapus("empat", ...idPita("p12x3", 12, 3)),
      tambah("empat", isiKolom(3, 4, 3), pita("p12x4", 42, 128, 216, 18, 12, 4)),
      ubah("empat", { id: "pl", isi: "tiap bagian 4 petak" }),
      hapus("enam", ...idPita("p12x4", 12, 4)),
      tambah("enam", isiKolom(4, 6, 2), pita("p12x6", 42, 128, 216, 18, 12, 6)),
      ubah("enam", { id: "pl", isi: "tiap bagian 6 petak" }),
      hapus("belas,", ...idPita("p12x6", 12, 6)),
      tambah("belas,", isiKolom(5, 12, 1), pita("p12x12", 42, 128, 216, 18, 12, 12, W.hijauPita)),
      ubah("belas,", { id: "pl", isi: "tiap bagian 12 petak" }),
      tambah("sisa.", teks("ss", 150, 176, "semua habis, tanpa sisa", 11, W.hijau)),
    ),
    k(
      "Bagaimana dengan panjang lima? Dua potong lima petak, dan masih tersisa dua petak. Jadi lima tidak masuk tabel, karena potongannya bersisa.",
      hapus("lima", ...idPita("p12x12", 12, 12), "pl", "ss"),
      tambah("lima", ...pita("p12x5", 42, 128, 216, 18, 12, 5), teks("pq", 150, 118, "12 : 5 = 2, sisa 2", 11, W.merah)),
      tambah("tabel,", teks("pt", 150, 176, "5 tidak masuk tabel", 12, W.merah)),
    ),
    k(
      "Langkah empat: tuliskan semua bilangan yang muncul dalam tabel. Kalau ada dua bilangan yang sama, cukup ditulis sekali.",
      bersih(0),
      tambah(0, judul("Langkah 4: bilangan yang muncul")),
      tambah("bilangan", tabelPenuh(12)),
      tambah("sama,", teks("sk", 150, 116, "bilangan kembar ditulis sekali", 10, W.coklat)),
      tambah("sekali.", teks("bl", 150, 154, "1, 2, 3, 4, 6, 12", 22, W.hijau)),
    ),
    k(
      "Langkah lima: bilangan itu disebut faktor dari dua belas. Bilangan cacah yang dapat membagi dua belas tanpa sisa disebut faktor dari dua belas.",
      bersih(0),
      tambah(0, judul("Langkah 5: faktor")),
      tambah("disebut", teks("fk0", 150, 140, "faktor dari 12", 18, W.ungu)),
      tambah("cacah", ...kartu("fk1", 10, 36, 280, 56, W.krem, ["Bilangan cacah yang dapat membagi 12", "tanpa sisa disebut faktor dari 12"], 10)),
    ),
    k(
      "Faktor dari dua belas adalah satu, dua, tiga, empat, enam, dan dua belas. Enam bilangan, dan semuanya membagi dua belas tanpa sisa.",
      bersih(0),
      tambah(0, judul("Faktor dari 12")),
      tambah(5, ...deret("f12", sebar(6, 40, 260), 80, 15, faktor(12)).slice(0, 2)),
      tambah(6, ...deret("f12", sebar(6, 40, 260), 80, 15, faktor(12)).slice(2, 4)),
      tambah(7, ...deret("f12", sebar(6, 40, 260), 80, 15, faktor(12)).slice(4, 6)),
      tambah(8, ...deret("f12", sebar(6, 40, 260), 80, 15, faktor(12)).slice(6, 8)),
      tambah(9, ...deret("f12", sebar(6, 40, 260), 80, 15, faktor(12)).slice(8, 10)),
      tambah(12, ...deret("f12", sebar(6, 40, 260), 80, 15, faktor(12)).slice(10, 12)),
      tambah(13, teks("fl", 150, 150, "faktor 12: 1, 2, 3, 4, 6, 12", 12, W.hijau)),
    ),
  ],
};

/* ------------------------------ 7. Eksplorasi 2.3B: faktor dari 18 (Buku Siswa hlm. 44 dan 45; Panduan Guru hlm. 64 dan 65) ------------------------------ */
export const ADEGAN_EKS23B: AdeganStory = {
  id: "eks-23b",
  judul: "Eksplorasi 2.3B: faktor dari 18",
  sumber: "Buku Siswa hlm. 44–45; Panduan Guru hlm. 64–65",
  latar: "#ECFDF5",
  kutipan: [
    "Eksplorasi 2.3B Ayo Menemukan Faktor dari 18",
    "Di kertas berpetak, gambarlah 6 buah persegi panjang dengan panjang 18 satuan.",
    "Selanjutnya, bagilah persegi panjang tersebut menjadi beberapa bagian. Setiap bagian sama panjang dan tidak ada sisa.",
    "Warnai setiap bagian yang berdekatan dengan warna berbeda.",
    "Eksplorasi bagian ini dapat dilakukan bersama-sama dengan bagian sebelumnya.",
    "Kegiatannya masih sama, yaitu menemukan faktor suatu bilangan. Pada bagian ini, bilangan yang dicari faktornya adalah 18.",
    "Tuliskan hasil dari kegiatan nomor 1 pada tabel.",
    "Lengkapi lingkaran-lingkaran berikut dengan faktor dari 18. Urutkan dari yang paling kecil.",
    "Panjang tiap bagian 1 2 3 6 9 18 Banyaknya hasil potongan 18 9 6 3 2 1",
  ],
  ketukan: [
    k(
      "Eksplorasi dua titik tiga B, Ayo Menemukan Faktor dari delapan belas. Kegiatannya sama dengan sebelumnya, dan boleh dikerjakan bersama-sama. Sekarang yang dicari faktornya adalah delapan belas.",
      tambah(0, judul("Eksplorasi 2.3B")),
      tambah("Menemukan", teks("n18", 150, 100, "18", 52, W.hijau)),
      tambah("sebelumnya,", ...kartu("e1", 40, 118, 220, 32, W.langit, ["kegiatan sama dengan 2.3A"], 9.8)),
      tambah("Sekarang", teks("e2", 150, 176, "cari faktor dari 18", 12, W.ungu)),
    ),
    k(
      "Langkah satu: gambar enam persegi panjang dengan panjang delapan belas satuan. Bagi tiap persegi panjang menjadi bagian sama panjang tanpa sisa, lalu warnai bagian yang berdekatan dengan warna berbeda.",
      bersih(0),
      tambah(0, judul("Langkah 1: bagi dan warnai")),
      tambah("enam", teks("l6", 150, 40, "6 persegi panjang", 11, W.coklat)),
      tambah("delapan", ...pita("p18x1", 30, 76, 240, 20, 18, 1), teks("lk", 150, 68, "panjang 18 satuan", 10, W.merah)),
      tambah("bagian", teks("cx", 150, 124, "contoh: tiap bagian 1 satuan", 10, W.hijau)),
      tambah("warnai", teks("wb", 150, 152, "warna berbeda untuk bagian bersebelahan", 9, W.hitam)),
    ),
    k(
      "Tabel hasilnya: panjang bagian satu menghasilkan delapan belas potong, panjang dua menghasilkan sembilan, dan panjang tiga menghasilkan enam.",
      bersih(0),
      tambah(0, judul("Tabel faktor dari 18")),
      tambah("Tabel", rangkaTabel()),
      tambah("satu", isiKolom(0, 1, 18), pita("q18x1", 30, 134, 240, 18, 18, 1), teks("pl", 150, 124, "tiap bagian 1 satuan", 10, W.hitam)),
      hapus("dua", ...idPita("q18x1", 18, 1)),
      tambah("dua", isiKolom(1, 2, 9), pita("q18x2", 30, 134, 240, 18, 18, 2)),
      ubah("dua", { id: "pl", isi: "tiap bagian 2 satuan" }),
      hapus("tiga", ...idPita("q18x2", 18, 2)),
      tambah("tiga", isiKolom(2, 3, 6), pita("q18x3", 30, 134, 240, 18, 18, 3)),
      ubah("tiga", { id: "pl", isi: "tiap bagian 3 satuan" }),
    ),
    k(
      "Panjang enam menghasilkan tiga potong, panjang sembilan menghasilkan dua potong, dan panjang delapan belas menghasilkan satu potong. Tabelnya pun lengkap.",
      hapus("enam", ...idPita("q18x3", 18, 3)),
      tambah("enam", isiKolom(3, 6, 3), pita("q18x6", 30, 134, 240, 18, 18, 6)),
      ubah("enam", { id: "pl", isi: "tiap bagian 6 satuan" }),
      hapus("sembilan", ...idPita("q18x6", 18, 6)),
      tambah("sembilan", isiKolom(4, 9, 2), pita("q18x9", 30, 134, 240, 18, 18, 9)),
      ubah("sembilan", { id: "pl", isi: "tiap bagian 9 satuan" }),
      hapus("belas", ...idPita("q18x9", 18, 9)),
      tambah("belas", isiKolom(5, 18, 1), pita("q18x18", 30, 134, 240, 18, 18, 18, W.hijauPita)),
      ubah("belas", { id: "pl", isi: "tiap bagian 18 satuan" }),
    ),
    k(
      "Sebagai pembanding, coba panjang empat. Delapan belas dibagi empat hasilnya empat, dan masih sisa dua. Panjang lima juga bersisa tiga. Jadi empat dan lima tidak masuk tabel.",
      bersih(0),
      tambah(0, judul("Pembanding: panjang 4 dan 5", W.merah)),
      tambah("empat", teks("v1", 150, 46, "18 : 4 = 4, sisa 2", 11, W.merah), ...pita("p18x4", 30, 54, 240, 18, 18, 4)),
      tambah("lima", teks("v2", 150, 104, "18 : 5 = 3, sisa 3", 11, W.merah), ...pita("p18x5", 30, 112, 240, 18, 18, 5)),
      tambah("Jadi", ...kartu("vk", 40, 148, 220, 32, W.merahMuda, ["4 dan 5 tidak masuk tabel"], 10)),
    ),
    k(
      "Langkah tiga: lengkapi lingkaran dengan faktor delapan belas, urut dari yang terkecil. Hasilnya satu, dua, tiga, enam, sembilan, dan delapan belas.",
      bersih(0),
      tambah(0, judul("Langkah 3: lingkaran faktor")),
      tambah("lingkaran", ...[0, 2, 4, 6, 8, 10].map((i) => deret("f18", sebar(6, 40, 260), 96, 15, faktor(18))[i])),
      tambah(13, deret("f18", sebar(6, 40, 260), 96, 15, faktor(18))[1]),
      tambah(14, deret("f18", sebar(6, 40, 260), 96, 15, faktor(18))[3]),
      tambah(15, deret("f18", sebar(6, 40, 260), 96, 15, faktor(18))[5]),
      tambah(16, deret("f18", sebar(6, 40, 260), 96, 15, faktor(18))[7]),
      tambah(17, deret("f18", sebar(6, 40, 260), 96, 15, faktor(18))[9]),
      tambah(19, deret("f18", sebar(6, 40, 260), 96, 15, faktor(18))[11]),
      tambah(20, teks("fl", 150, 150, "faktor 18: 1, 2, 3, 6, 9, 18", 12, W.hijau)),
    ),
  ],
};

/* ------------------------------ 8. Faktor saling berpasangan (Buku Siswa hlm. 45) ------------------------------ */
const xs6 = sebar(6, 40, 260);
const ks18 = kurungDeret("f18", xs6, 70, 15, 6);
const ks12 = kurungDeret("f12", xs6, 70, 15, 6);
export const ADEGAN_PASANGAN: AdeganStory = {
  id: "pasangan-faktor",
  judul: "Faktor saling berpasangan",
  sumber: "Buku Siswa hlm. 45",
  latar: "#FDF4FF",
  kutipan: [
    "Faktor-faktor pada suatu bilangan saling berpasangan. Contohnya faktor dari 18 berikut.",
    "1 berpasangan dengan 18, artinya 1 x 18 = 18",
    "2 berpasangan dengan 9, artinya 2 x 9 = 18",
    "3 berpasangan dengan 6, artinya 3 x 6 = 18",
  ],
  ketukan: [
    k(
      "Perhatikan kotak ide di buku: faktor-faktor pada suatu bilangan saling berpasangan. Contohnya faktor dari delapan belas.",
      tambah(0, judul("Faktor saling berpasangan")),
      tambah("kotak", emo("id", 150, 150, "💡", 30)),
      tambah("Contohnya", ...deret("f18", xs6, 70, 15, faktor(18))),
    ),
    k(
      "Satu berpasangan dengan delapan belas, artinya satu kali delapan belas sama dengan delapan belas.",
      hapus(0, "id"),
      tambah("Satu", ks18[0]),
      tambah("artinya", teks("q1", 150, 150, "1 × 18 = 18", 16, W.oranye)),
    ),
    k(
      "Dua berpasangan dengan sembilan, artinya dua kali sembilan sama dengan delapan belas.",
      tambah("Dua", ks18[1]),
      ubah("artinya", { id: "q1", isi: "2 × 9 = 18", warna: W.biru }),
    ),
    k(
      "Tiga berpasangan dengan enam, artinya tiga kali enam sama dengan delapan belas. Ketiga pasangan inilah yang membentuk lingkaran-lingkaran tadi.",
      tambah("Tiga", ks18[2]),
      ubah("artinya", { id: "q1", isi: "3 × 6 = 18", warna: W.pinkTua }),
    ),
    k(
      "Pasangan yang sama juga ada pada dua belas: satu dengan dua belas, dua dengan enam, dan tiga dengan empat.",
      bersih(0),
      tambah(0, judul("Pasangan faktor dari 12")),
      tambah(6, ...deret("f12", xs6, 70, 15, faktor(12))),
      tambah(8, ks12[0], teks("r1", 150, 138, "1 × 12 = 12", 12, W.oranye)),
      tambah(12, ks12[1], teks("r2", 150, 156, "2 × 6 = 12", 12, W.biru)),
      tambah(16, ks12[2], teks("r3", 150, 174, "3 × 4 = 12", 12, W.pinkTua)),
    ),
    k(
      "Cara berpikir ini membantu: kalau kita sudah menemukan sebuah faktor, pasangannya langsung ikut ketemu.",
      bersih(0),
      tambah(0, judul("Satu faktor, dua temuan")),
      tambah("menemukan", teks("m1", 150, 72, "ketemu faktor 3", 14, W.pinkTua)),
      tambah("pasangannya", teks("m2", 150, 112, "12 : 3 = 4", 22, W.hijau), teks("m3", 150, 144, "pasangannya 4", 12, W.biru)),
    ),
  ],
};
