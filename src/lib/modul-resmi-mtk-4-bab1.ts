import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK4_BAB1 } from "@/lib/misi-mtk-4-bab1";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK4_BAB1 = "Bab 1: Bilangan Cacah sampai 10.000";

export const MODUL_MTK4_BAB1: ModulResmiPai = {
  id: "mtk-4-bab1",
  judul: JUDUL_MTK4_BAB1,
  pola: /^bab 1: bilangan cacah sampai 10\.?000$/,
  motivasi:
    "Nisa, Farhan, dan Cinta menghitung peti buah sampai 10.000 bersama burung hantu Igil di dermaga.",
  kunciJawaban: "B,C,B,C,B,A,A,B,D,A",
  sketsaKartu: [
    "Nisa, Farhan, dan Cinta membaca peti di dermaga bersama Igil.",
    "Rak angka, susun, urai, tambah, kurang, kali, bagi, faktor, dan kelipatan.",
    "Sepuluh pos di dermaga peti.",
    "Poin penting dan lembar evaluasi bilangan cacah sampai 10.000.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
Bagaimana membaca 8.015?
A) Delapan ribu seratus lima belas
B) Delapan ribu lima belas
C) Delapan ratus lima belas
D) Delapan puluh ribu lima belas`,
    `[Soal 2 - PG - Tipe: MOTS]
Pada 5.284, angka 2 bernilai...
A) 2
B) 20
C) 200
D) 2.000`,
    `[Soal 3 - PG - Tipe: MOTS]
Mana yang lebih besar, 4.615 atau 4.651?
A) 4.615
B) 4.651
C) Keduanya sama
D) 4.165`,
    `[Soal 4 - PG - Tipe: HOTS]
Dari 1.405, 3.012, dan 1.540, bilangan yang di tengah jika diurutkan dari kecil adalah...
A) 1.405
B) 3.012
C) 1.540
D) 3.120`,
    `[Soal 5 - PG - Tipe: MOTS]
3 ribuan, 0 ratusan, 5 puluhan, dan 8 satuan ditulis...
A) 3.508
B) 3.058
C) 3.580
D) 358`,
    `[Soal 6 - PG - Tipe: HOTS]
486 + 357 = ...
A) 843
B) 743
C) 833
D) 1.343`,
    `[Soal 7 - PG - Tipe: HOTS]
742 − 368 = ...
A) 374
B) 486
C) 1.110
D) 426`,
    `[Soal 8 - PG - Tipe: MOTS]
6 × 7 = ...
A) 13
B) 42
C) 67
D) 36`,
    `[Soal 9 - PG - Tipe: MOTS]
56 ÷ 7 = ...
A) 6
B) 9
C) 7
D) 8`,
    `[Soal 10 - PG - Tipe: HOTS]
Kelipatan 6 yang tepat setelah 18 adalah...
A) 24
B) 20
C) 22
D) 16`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar: "Nisa, Farhan, Cinta, dan Igil menghitung peti buah di dermaga sampai 10.000.",
      labelDaftar: "Sembilan adegan dermaga",
      kolom: 1,
      item: [
        { nama: "Membaca dan menulis", singkat: "Empat rak", uraian: "6.418 dibaca enam ribu empat ratus delapan belas. Titik pada 6.418 hanya pemisah ribuan.", contoh: "Baca dari rak kiri." },
        { nama: "Nilai tempat", singkat: "Rak mengubah nilai", uraian: "5.284 = 5.000 + 200 + 80 + 4. Angka yang sama berubah nilai jika pindah rak.", contoh: "Rak kiri dikali sepuluh." },
        { nama: "Membandingkan dan mengurutkan", singkat: "Dari kiri", uraian: "8.264 lebih besar dari 8.246 karena puluhan 6 lebih besar dari 4. Kelompokkan ribuan sebelum mengurutkan.", contoh: "Beda di kiri, berhenti." },
        { nama: "Komposisi dan dekomposisi", singkat: "Susun dan urai", uraian: "3 ribuan, 0 ratusan, 5 puluhan, 8 satuan menjadi 3.058. 5.406 diurai 5.000 + 400 + 6.", contoh: "Rak kosong tetap ditulis." },
        { nama: "Penjumlahan sampai 1.000", singkat: "Menyimpan satu", uraian: "264 + 173 = 437. Jika jumlah satu rak 10 atau lebih, ada +1 di rak kirinya.", contoh: "Mulai dari satuan." },
        { nama: "Pengurangan sampai 1.000", singkat: "Meminjam satu", uraian: "630 − 215 = 415. Jika satuan tidak cukup, rak kirinya memberi 1.", contoh: "Mulai dari satuan." },
        { nama: "Perkalian sampai 100", singkat: "Kelompok sama", uraian: "6 kelompok berisi 7 peti sama dengan 42. Gambar baris membantu sebelum simbol.", contoh: "Banyak kelompok dikali isi." },
        { nama: "Pembagian sampai 100", singkat: "Bagi rata", uraian: "48 peti untuk 6 perahu, tiap perahu mendapat 8. 6 × 8 = 48.", contoh: "Cari kali yang cocok." },
        { nama: "Faktor dan kelipatan", singkat: "Bagi habis dan lompat", uraian: "Faktor 18 adalah 1, 2, 3, 6, 9, dan 18. Kelipatan 6 melompat 6: 6, 12, 18, 24.", contoh: "Faktor membagi habis. Kelipatan melompat." },
      ],
      kuis: [
        { pertanyaan: "Baca 2.735.", alias: ["2735", "dua ribu tujuh ratus tiga puluh lima"] },
        { pertanyaan: "Tulis sembilan ribu empat puluh delapan.", alias: ["9048"] },
        { pertanyaan: "Nilai angka 8 pada 4.839.", alias: ["80", "delapan puluh"] },
        { pertanyaan: "Urai 3.672.", alias: ["3000", "600", "70", "2"] },
        { pertanyaan: "Mana lebih besar, 8.246 atau 8.264?", alias: ["8264"] },
        { pertanyaan: "Urutkan 2.508, 2.850, 7.085, 7.508.", alias: ["2508", "2850", "7085", "7508"] },
        { pertanyaan: "Susun 3 ribuan, 0 ratusan, 5 puluhan, 8 satuan.", alias: ["3058"] },
        { pertanyaan: "6.000 + 400 + 20 + 9 = ...", alias: ["6429"] },
        { pertanyaan: "264 + 173 = ...", alias: ["437"] },
        { pertanyaan: "508 + 295 = ...", alias: ["803"] },
        { pertanyaan: "630 − 215 = ...", alias: ["415"] },
        { pertanyaan: "500 − 176 = ...", alias: ["324"] },
        { pertanyaan: "6 × 7 = ...", alias: ["42"] },
        { pertanyaan: "5 × 9 = ...", alias: ["45"] },
        { pertanyaan: "48 ÷ 6 = ...", alias: ["8"] },
        { pertanyaan: "56 ÷ 7 = ...", alias: ["8"] },
        { pertanyaan: "Apakah 18 kelipatan 6?", alias: ["ya", "kelipatan"] },
        { pertanyaan: "Tulis faktor 18.", alias: ["1", "2", "3", "6", "9", "18"] },
        { pertanyaan: "Bacaan 8.015 yang tepat.", alias: ["delapan ribu lima belas"] },
        { pertanyaan: "Pasangkan 4.207, 4.270, dan 4.027.", alias: ["empat ribu dua ratus tujuh"] },
        { pertanyaan: "Urutkan 5.009, 5.090, 5.099, 5.900.", alias: ["5009", "5090", "5099", "5900"] },
        { pertanyaan: "Periksa tiga pernyataan dermaga.", alias: ["benar", "salah"] },
        { pertanyaan: "7 × 8 = ...", alias: ["56"] },
        { pertanyaan: "Kelipatan 5 setelah 15.", alias: ["20"] },
      ],
      voice: [[
        "Hari ini kita menghitung peti di dermaga, sampai sepuluh ribu.",
        "Empat rak: ribuan, ratusan, puluhan, satuan. Titik hanya pemisah ribuan.",
        "Kita juga menyusun, mengurai, menambah, mengurangi, mengali, membagi, lalu mencari faktor dan kelipatan.",
      ]],
    },
    {
      kode: "B",
      judul: "B. Infografis",
      pengantar: "Intisari membaca, rak, urut, susun, hitung, dan kelipatan sampai 10.000.",
      labelDaftar: "Sembilan peta dermaga",
      kolom: 1,
      item: [
        { nama: "Membaca", singkat: "Nol di tengah diam", uraian: "5.206 dibaca lima ribu dua ratus enam. Rak yang kosong tidak disebut, tetapi tetap ditulis.", contoh: "Kosong, tulis nol." },
        { nama: "Rak angka", singkat: "Kali sepuluh", uraian: "7.145 = 7.000 + 100 + 40 + 5. Pindah satu rak ke kiri, nilai dikali sepuluh.", contoh: "Kiri lebih besar." },
        { nama: "Banding dan urut", singkat: "Ribuan dulu", uraian: "3.754 lebih besar dari 3.745 karena puluhan 5 lebih besar dari 4.", contoh: "Kelompokkan ribuan." },
        { nama: "Susun dan urai", singkat: "Dua arah", uraian: "7.032 tersusun dari 7 ribuan, 0 ratusan, 3 puluhan, 2 satuan. 4.150 = 4.000 + 100 + 50.", contoh: "Susun dari rak. Urai ke rak." },
        { nama: "Jumlah", singkat: "Mulai kanan", uraian: "375 + 148 = 523. Satuan 13, ada +1 ke puluhan.", contoh: "Jumlah 10 atau lebih, geser +1." },
        { nama: "Selisih", singkat: "Beri satu", uraian: "481 − 256 = 225. Satuan meminjam 1 dari puluhan.", contoh: "Yang memberi menulis −1." },
        { nama: "Kali", singkat: "Baris sama", uraian: "4 baris berisi 7 mangga sama dengan 28.", contoh: "Gambar dulu, baru simbol." },
        { nama: "Bagi", singkat: "Habis rata", uraian: "45 mangga untuk 5 keranjang, tiap keranjang 9.", contoh: "Kali balik untuk memeriksa." },
        { nama: "Faktor", singkat: "Habis dan lompat", uraian: "Faktor 10: 1, 2, 5, 10. Kelipatan 3: 3, 6, 9, 12.", contoh: "Faktor membagi. Kelipatan dilompati." },
      ],
      kuis: [
        { pertanyaan: "Baca 4.019.", alias: ["4019", "empat ribu sembilan belas"] },
        { pertanyaan: "Tulis delapan ribu tiga ratus enam puluh.", alias: ["8360"] },
        { pertanyaan: "Nilai angka 9 pada 6.392.", alias: ["90"] },
        { pertanyaan: "Urai 2.938.", alias: ["2000", "900", "30", "8"] },
        { pertanyaan: "Mana lebih besar, 3.754 atau 3.745?", alias: ["3754"] },
        { pertanyaan: "Urutkan 4.012, 4.102, 4.120, 4.210.", alias: ["4012", "4102", "4120", "4210"] },
        { pertanyaan: "Susun 7 ribuan, 0 ratusan, 3 puluhan, 2 satuan.", alias: ["7032"] },
        { pertanyaan: "Urai 4.150.", alias: ["4000", "100", "50"] },
        { pertanyaan: "142 + 230 = ...", alias: ["372"] },
        { pertanyaan: "609 + 186 = ...", alias: ["795"] },
        { pertanyaan: "900 − 400 = ...", alias: ["500"] },
        { pertanyaan: "703 − 248 = ...", alias: ["455"] },
        { pertanyaan: "8 × 6 = ...", alias: ["48"] },
        { pertanyaan: "7 × 5 = ...", alias: ["35"] },
        { pertanyaan: "36 ÷ 6 = ...", alias: ["6"] },
        { pertanyaan: "64 ÷ 8 = ...", alias: ["8"] },
        { pertanyaan: "Apakah 20 kelipatan 4?", alias: ["ya", "kelipatan"] },
        { pertanyaan: "Tulis faktor 15.", alias: ["1", "3", "5", "15"] },
        { pertanyaan: "Paling besar: 9.040, 9.400, 9.004.", alias: ["9400"] },
        { pertanyaan: "Pasangkan 3.080, 3.800, 3.008.", alias: ["tiga ribu delapan puluh"] },
        { pertanyaan: "Urutkan 2.045, 2.405, 2.450, 2.540.", alias: ["2045", "2405", "2450", "2540"] },
        { pertanyaan: "Periksa tiga pernyataan peta.", alias: ["benar", "salah"] },
        { pertanyaan: "48 ÷ 6 = ...", alias: ["8"] },
      ],
      voice: [[
        "Peta ini merangkum cara membaca peti sampai sepuluh ribu.",
        "Bandingkan dari kiri. Jumlahkan dari kanan. Kalikan lewat kelompok yang sama.",
        "Faktor membagi habis. Kelipatan adalah lompatan yang sama.",
      ]],
    },
    {
      kode: "C",
      judul: "C. Pos Dermaga Peti",
      pengantar: "Sepuluh soal pola di dermaga. Selesai sepuluh pos, peti terkumpul sepuluh.",
      labelDaftar: "Sepuluh pos dermaga",
      kolom: 1,
      item: [
        {
          nama: "Pos pola",
          singkat: "Deret, analogi, yang beda",
          uraian: "Deret naik 200. Angka hilang pada penjumlahan. Analogi kali. Kelipatan yang beda. Baca, kurang, paling besar, jumlah yang keliru, kali, dan bagi.",
          contoh: "Dua soal suara dan dua soal tulis.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK4_BAB1),
      voice: [[
        "Igil menjaga sepuluh pos di dermaga.",
        "Ada deret, angka hilang, analogi, dan yang beda. Dua pos dijawab dengan suara, dua pos ditulis.",
      ]],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal membaca, rak, hitung, dan kelipatan.",
      labelDaftar: "Lembar evaluasi dermaga",
      kolom: 1,
      item: [
        {
          nama: "Hitung dan urut",
          singkat: "Periksa dari kiri dan dari kanan",
          uraian: "467 + 258 = 725. 800 − 275 = 525. Urutan 8.016, 8.106, 8.160, 8.601. 8 × 7 = 56 lebih besar dari 9 × 6 = 54.",
          contoh: "Kelompokkan ribuan sebelum mengurutkan.",
        },
      ],
      kuis: [
        { pertanyaan: "467 + 258 = ...", alias: ["725"] },
        { pertanyaan: "Bacaan 4.083.", alias: ["empat ribu delapan puluh tiga"] },
        { pertanyaan: "800 − 275 = ...", alias: ["525"] },
        { pertanyaan: "Nilai angka 6 pada 6.514.", alias: ["6000"] },
        { pertanyaan: "Pasangkan hitungan.", alias: ["843", "42", "9"] },
        { pertanyaan: "Urutkan 8.016, 8.106, 8.160, 8.601.", alias: ["8016", "8106", "8160", "8601"] },
        { pertanyaan: "Deret 150, 300, 450, berikutnya.", alias: ["600"] },
        { pertanyaan: "Mana lebih besar, 54 atau 56?", alias: ["56"] },
        { pertanyaan: "Kelipatan 7 yang keempat.", alias: ["28"] },
        { pertanyaan: "63 ÷ 7 = ...", alias: ["9"] },
      ],
      voice: [[
        "Sepuluh soal dermaga. Baca pelan, lalu hitung.",
        "Periksa rak dari kiri saat membandingkan. Mulai dari satuan saat menambah atau mengurangi.",
      ]],
    },
  ],
};
