import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK7_BAB1 = "Bab 1: Bilangan Bulat";

export const MODUL_MTK7_BAB1: ModulResmiPai = {
  id: "mtk-7-bab1",
  judul: JUDUL_MTK7_BAB1,
  pola: /^bab 1: bilangan bulat$/,
  motivasi: "Suhu, kedalaman, dan saldo memakai bilangan bulat. Kamu belajar membandingkan, menghitung, lalu mencari FPB dan KPK.",
  kunciJawaban: "B,B,A,C,D,A,B,C,B,C",
  sketsaKartu: [
    "Pengertian, garis bilangan, dan perbandingan bilangan bulat.",
    "Penjumlahan, pengurangan, perkalian, dan pembagian bilangan bulat.",
    "Faktor, faktorisasi prima, FPB, dan KPK.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
Sebuah gua berada 45 meter di bawah permukaan laut. Penulisannya...
A) 45
B) −45
C) 0
D) 450`,
    `[Soal 2 - PG - Tipe: MOTS]
Tanda yang tepat untuk −9 ... −2 adalah...
A) >
B) <
C) =
D) ≥`,
    `[Soal 3 - PG - Tipe: MOTS]
Lawan penjumlahan dari 13 adalah...
A) −13
B) 0
C) 13
D) 26`,
    `[Soal 4 - PG - Tipe: MOTS]
Hasil (−7) + (−2) adalah...
A) −5
B) 5
C) −9
D) 9`,
    `[Soal 5 - PG - Tipe: MOTS]
Hasil 4 − (−6) adalah...
A) −10
B) −2
C) 2
D) 10`,
    `[Soal 6 - PG - Tipe: HOTS]
Hasil (−8) × 3 adalah...
A) −24
B) 24
C) −11
D) 11`,
    `[Soal 7 - PG - Tipe: HOTS]
Hasil (−36) ÷ (−9) adalah...
A) −4
B) 4
C) −27
D) 27`,
    `[Soal 8 - PG - Tipe: HOTS]
Faktorisasi prima dari 20 adalah...
A) 2 × 10
B) 4 × 5
C) 2² × 5
D) 2 × 2 × 10`,
    `[Soal 9 - PG - Tipe: HOTS]
FPB dari 16 dan 24 adalah...
A) 4
B) 8
C) 16
D) 48`,
    `[Soal 10 - PG - Tipe: HOTS]
KPK dari 9 dan 12 adalah...
A) 3
B) 18
C) 36
D) 108`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Memahami Bilangan Bulat",
      pengantar: "Bilangan negatif, nol, dan bilangan positif pada garis bilangan.",
      labelDaftar: "Sepuluh soal pemahaman",
      kolom: 1,
      item: [
        { nama: "Pengertian", singkat: "Negatif, nol, positif", uraian: "Bilangan bulat terdiri dari bilangan negatif, nol, dan bilangan positif.", contoh: "−3, 0, dan 5." },
        { nama: "Garis bilangan", singkat: "Kiri lebih kecil", uraian: "Nilai bertambah ke arah kanan.", contoh: "−6 berada di kiri −2, jadi −6 < −2." },
        { nama: "Lawan", singkat: "Jumlahnya nol", uraian: "Lawan suatu bilangan adalah bilangan yang jika dijumlahkan menghasilkan nol.", contoh: "Lawan −7 adalah 7." },
      ],
      kuis: [
        { pertanyaan: "Kapal 80 m di bawah laut.", alias: ["B"] },
        { pertanyaan: "Nilai lebih besar, −12 atau −5?", alias: ["B"] },
        { pertanyaan: "Tanda −40 dan 15.", alias: ["B"] },
        { pertanyaan: "Urutkan 4, −9, 0, −2.", alias: ["B"] },
        { pertanyaan: "Lawan dari −7.", alias: ["C"] },
        { pertanyaan: "Bilangan di kiri nol.", alias: ["B"] },
        { pertanyaan: "Suhu yang lebih dingin.", alias: ["B"] },
        { pertanyaan: "Kedudukan bilangan 0.", alias: ["C"] },
        { pertanyaan: "Nilai paling besar.", alias: ["C"] },
        { pertanyaan: "Saldo bertambah.", alias: ["C"] },
      ],
      voice: [["Bilangan bulat meliputi bilangan negatif, nol, dan bilangan positif. Pada garis bilangan, nilai bertambah ke kanan."]],
    },
    {
      kode: "B",
      judul: "B. Operasi Hitung Bilangan Bulat",
      pengantar: "Penjumlahan, pengurangan, perkalian, dan pembagian.",
      labelDaftar: "Sepuluh soal operasi",
      kolom: 1,
      item: [
        { nama: "Tambah dan kurang", singkat: "Kurang berarti tambah lawan", uraian: "Mengurangi suatu bilangan sama dengan menambah lawannya.", contoh: "5 − (−2) = 5 + 2 = 7." },
        { nama: "Kali dan bagi", singkat: "Tanda hasil", uraian: "Dua bilangan sejenis menghasilkan hasil positif. Dua bilangan beda tanda menghasilkan hasil negatif.", contoh: "(−4) × (−3) = 12." },
        { nama: "Perkiraan", singkat: "Bulatkan dulu", uraian: "Untuk menaksir, bulatkan bilangan ke puluhan terdekat, lalu hitung.", contoh: "−48 + 53 berada di sekitar 0." },
      ],
      kuis: [
        { pertanyaan: "(−8) + 3", alias: ["B"] },
        { pertanyaan: "6 + (−9)", alias: ["C"] },
        { pertanyaan: "(−4) − (−7)", alias: ["C"] },
        { pertanyaan: "(−5) × (−6)", alias: ["D"] },
        { pertanyaan: "12 ÷ (−3)", alias: ["A"] },
        { pertanyaan: "(−2) + 5 + (−8)", alias: ["C"] },
        { pertanyaan: "Perkiraan −48 + 53", alias: ["B"] },
        { pertanyaan: "Sisa utang", alias: ["B"] },
        { pertanyaan: "Nilai benar dan salah", alias: ["B"] },
        { pertanyaan: "Perubahan tiap bulan", alias: ["B"] },
      ],
      voice: [["Pengurangan sama dengan menambah lawannya. Perkalian dan pembagian dua bilangan sejenis menghasilkan bilangan positif."]],
    },
    {
      kode: "C",
      judul: "C. Faktor Bilangan Bulat",
      pengantar: "Faktor, faktorisasi prima, FPB, dan KPK.",
      labelDaftar: "Sepuluh soal faktor",
      kolom: 1,
      item: [
        { nama: "Faktor", singkat: "Membagi habis", uraian: "Faktor adalah bilangan yang membagi habis bilangan itu, termasuk faktor negatif.", contoh: "−4 adalah faktor dari −12." },
        { nama: "Prima", singkat: "Hasil kali prima", uraian: "Faktorisasi prima menuliskan bilangan sebagai hasil kali bilangan prima.", contoh: "36 = 2² × 3²." },
        { nama: "FPB dan KPK", singkat: "Persekutuan", uraian: "FPB memakai pangkat terkecil. KPK memakai pangkat terbesar.", contoh: "KPK dari 10 dan 15 adalah 30." },
      ],
      kuis: [
        { pertanyaan: "Faktor dari 12", alias: ["C"] },
        { pertanyaan: "Pasangan hasil −18", alias: ["B"] },
        { pertanyaan: "Faktorisasi 36", alias: ["B"] },
        { pertanyaan: "FPB 18 dan 24", alias: ["A"] },
        { pertanyaan: "KPK 6 dan 8", alias: ["C"] },
        { pertanyaan: "FPB tiga bilangan", alias: ["B"] },
        { pertanyaan: "KPK tiga bilangan", alias: ["C"] },
        { pertanyaan: "Faktor dari −12", alias: ["B"] },
        { pertanyaan: "KPK 15 dan 20", alias: ["C"] },
        { pertanyaan: "Dua lampu menyala bersama", alias: ["B"] },
      ],
      voice: [["Faktor membagi habis. FPB adalah faktor persekutuan terbesar. KPK adalah kelipatan persekutuan terkecil."]],
    },
  ],
};
