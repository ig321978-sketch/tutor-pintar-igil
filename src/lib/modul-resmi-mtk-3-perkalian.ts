import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK3_PERKALIAN } from "@/lib/misi-mtk-3-perkalian";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK3_PERKALIAN = "Bab 3: Perkalian";

export const MODUL_MTK3_PERKALIAN: ModulResmiPai = {
  id: "mtk-3-perkalian",
  judul: JUDUL_MTK3_PERKALIAN,
  pola: /bab 3: perkalian( sampai 100)?/,
  motivasi:
    "Alya, Danu, dan Cika belajar perkalian sampai 100 bersama landak Landak Bulat di kebun stroberi.",
  kunciJawaban: "B,C,B,B,C,B,B,B,C,B",
  sketsaKartu: [
    "Alya, Danu, dan Cika menghitung stroberi bersama landak Landak Bulat.",
    "Perkalian sebagai penjumlahan berulang, sifat pertukaran, dan pecahan puluhan.",
    "Landak Bulat memanen petak stroberi yang berbaris rapi.",
    "Poin penting dan lembar evaluasi perkalian.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
Ada 6 baris stroberi, tiap baris 7 pohon. Bentuk perkaliannya...
A) 6 + 7
B) 6 × 7
C) 7 − 6
D) 6 × 6`,
    `[Soal 2 - PG - Tipe: MOTS]
8 × 7 sama dengan...
A) 48
B) 54
C) 56
D) 64`,
    `[Soal 3 - PG - Tipe: HOTS]
32 × 3 sama dengan...
A) 86
B) 96
C) 106
D) 126`,
    `[Soal 4 - PG - Tipe: HOTS]
Danu berkata perkalian selalu lebih besar dari penjumlahan. Pernyataannya...
A) Benar
B) Salah, karena 1 × 5 = 5 sedangkan 1 + 5 = 6
C) Salah, karena 2 × 2 hasilnya hanya 4
D) Tidak bisa ditentukan`,
    `[Soal 5 - PG - Tipe: HOTS]
⬜ × 7 = 63. Angka yang hilang...
A) 7
B) 8
C) 9
D) 10`,
    `[Soal 6 - PG - Tipe: HOTS]
8 × 6 = 48, dan ⬜ × 8 = 48. Angka yang hilang...
A) 5
B) 6
C) 7
D) 8`,
    `[Soal 7 - PG - Tipe: MOTS]
Manakah yang hasilnya 42?
A) 6 × 6
B) 6 × 7
C) 7 × 7
D) 8 × 5`,
    `[Soal 8 - PG - Tipe: MOTS]
Hasil panen naik 6: 12 – 18 – 24 – ⬜ – 36. Berikutnya...
A) 28
B) 30
C) 32
D) 34`,
    `[Soal 9 - PG - Tipe: MOTS]
4 × 9 dan 9 × 4. Yang benar...
A) Hasil pertama lebih besar
B) Hasil kedua lebih besar
C) Hasilnya sama
D) Tidak bisa ditentukan`,
    `[Soal 10 - PG - Tipe: HOTS]
Petak A 6 × 8, petak B 7 × 9, petak C 5 × 8. Pohon paling banyak ada di...
A) Petak A
B) Petak B
C) Petak C
D) Ketiganya sama`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar: "Alya, Danu, Cika, dan Landak Bulat mengubah penjumlahan berulang menjadi perkalian.",
      labelDaftar: "Lima adegan kebun stroberi",
      kolom: 1,
      item: [
        {
          nama: "Penjumlahan berulang",
          singkat: "Cara cepat",
          uraian: "4 × 3 = 12, sama dengan 3 + 3 + 3 + 3.",
          contoh: "Empat kali tiga sama dengan dua belas.",
        },
        {
          nama: "Sifat pertukaran",
          singkat: "Dibalik tetap sama",
          uraian: "4 × 6 = 24 dan 6 × 4 = 24.",
          contoh: "Dua bilangan boleh bertukar tempat.",
        },
        {
          nama: "Sifat pengelompokan",
          singkat: "Kerjakan bertahap",
          uraian: "(2 × 3) × 4 = 24 dan 2 × (3 × 4) = 24.",
          contoh: "Kurung boleh berpindah.",
        },
        {
          nama: "Perkalian dua angka",
          singkat: "Pecah dulu",
          uraian: "23 × 4 = 80 + 12 = 92.",
          contoh: "Puluhan dan satuan dikali terpisah.",
        },
        {
          nama: "Soal cerita",
          singkat: "Kata setiap",
          uraian: "8 baris, setiap baris 7 pohon: 8 × 7 = 56.",
          contoh: "Setiap, tiap, per, dan masing-masing berarti kali.",
        },
      ],
      kuis: [
        { pertanyaan: "Tiga keranjang berisi 5. Ucapkan penjumlahan berulangnya.", alias: ["lima tambah lima tambah lima"] },
        { pertanyaan: "Empat kotak berisi 4. Tulis penjumlahan dan perkaliannya.", alias: ["4+4+4+4", "16"] },
        { pertanyaan: "7 × 3 dan 3 × 7 sama atau berbeda?", alias: ["sama"] },
        { pertanyaan: "Berapa 8 × 5 dan 5 × 8?", alias: ["40"] },
        { pertanyaan: "Pada (3 × 2) × 5, berapa langkah pertama?", alias: ["enam", "6"] },
        { pertanyaan: "Hitung 2 × 4 × 3.", alias: ["8", "24"] },
        { pertanyaan: "Berapa 30 × 2?", alias: ["enam puluh", "60"] },
        { pertanyaan: "Hitung 42 × 3.", alias: ["120", "6", "126"] },
        { pertanyaan: "Kata mana yang menandakan perkalian: setiap, sisa, atau berkurang?", alias: ["setiap"] },
        { pertanyaan: "6 keranjang, setiap keranjang 9 jeruk. Tulis kalimatnya.", alias: ["6 x 9 = 54"] },
        { pertanyaan: "Lima keranjang berisi 6 jeruk. Bentuk perkaliannya?", alias: ["5 x 6"] },
        { pertanyaan: "Pasangkan penjumlahan berulang dengan perkaliannya.", alias: ["4 x 3", "5 x 4", "2 x 7"] },
        { pertanyaan: "Susun 6 × 7 = 42.", alias: ["6", "7", "42"] },
        { pertanyaan: "Periksa tiga pernyataan perkalian.", alias: ["benar", "salah"] },
        { pertanyaan: "Mana yang hasilnya berbeda: 6 × 7, 7 × 6, 8 × 5, atau 42?", alias: ["40"] },
      ],
      voice: [
        [
          "Perkalian adalah cara cepat menjumlahkan angka yang sama berulang kali.",
          "Dua bilangan boleh dibalik, hasilnya sama. Tiga bilangan boleh dikelompokkan berbeda.",
          "Bilangan dua angka dipecah jadi puluhan dan satuan. Kata setiap menandakan perkalian.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis",
      pengantar: "Bentuk pendek, sifat pertukaran, sifat pengelompokan, dan pecahan dua angka.",
      labelDaftar: "Lima papan perkalian",
      kolom: 1,
      item: [
        {
          nama: "Bentuk pendek",
          singkat: "Kelompok kali isi",
          uraian: "7 + 7 + 7 = 3 × 7 = 21.",
          contoh: "Hitung berapa kali angkanya muncul.",
        },
        {
          nama: "Pertukaran",
          singkat: "Balik posisi",
          uraian: "9 × 4 = 4 × 9 = 36. 9 × 7 = 7 × 9 = 63.",
          contoh: "Kalau lupa, balik posisinya.",
        },
        {
          nama: "Pengelompokan",
          singkat: "Kurung dulu",
          uraian: "(2 × 5) × 3 = 30 dan 2 × (5 × 3) = 30.",
          contoh: "Pilih kelompok yang paling mudah.",
        },
        {
          nama: "Dua angka",
          singkat: "Pecah, kali, jumlah",
          uraian: "34 × 2 = 60 + 8 = 68. 63 × 4 = 240 + 12 = 252.",
          contoh: "Puluhan dikali, satuan dikali, lalu dijumlahkan.",
        },
        {
          nama: "Kata kunci",
          singkat: "Setiap berarti kali",
          uraian: "7 kotak, setiap kotak 8 pensil: 7 × 8 = 56. 9 meja, setiap meja 4 kursi: 9 × 4 = 36.",
          contoh: "Setiap, tiap-tiap, per, masing-masing.",
        },
      ],
      kuis: [
        { pertanyaan: "Ucapkan bentuk perkalian 5 + 5 + 5 + 5 dan hasilnya.", alias: ["empat kali lima", "20"] },
        { pertanyaan: "Tulis bentuk perkalian 6 + 6 + 6.", alias: ["3 x 6 = 18"] },
        { pertanyaan: "Berapa hasil 6 × 9 dan 9 × 6?", alias: ["54", "lima puluh empat"] },
        { pertanyaan: "Hitung 9 × 7 dan tulis bentuk pertukarannya.", alias: ["63", "7", "9"] },
        { pertanyaan: "Pada (3 × 3) × 5, berapa langkah pertama?", alias: ["sembilan", "9"] },
        { pertanyaan: "Hitung 2 × 6 × 4.", alias: ["12", "48"] },
        { pertanyaan: "Berapa 50 × 3?", alias: ["150", "seratus lima puluh"] },
        { pertanyaan: "Hitung 63 × 4.", alias: ["240", "12", "252"] },
        { pertanyaan: "Kata masing-masing menandakan operasi apa?", alias: ["perkalian"] },
        { pertanyaan: "9 meja, setiap meja 4 kursi. Tulis kalimatnya.", alias: ["9 x 4 = 36"] },
        { pertanyaan: "Manakah yang hasilnya 42?", alias: ["6 x 7"] },
        { pertanyaan: "Pasangkan soal dengan sifatnya.", alias: ["pertukaran", "pengelompokan"] },
        { pertanyaan: "Urutkan hasil 12, 30, 56, dan 81.", alias: ["12", "30", "56", "81"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "8 × 6 = 48 dan ⬜ × 8 = 48. Angka yang hilang?", alias: ["6"] },
      ],
      voice: [
        [
          "Perkalian adalah cara cepat menjumlahkan angka yang sama. Jumlah kelompok dikali isi tiap kelompok.",
          "Dua angka boleh bertukar posisi. Tiga angka boleh dikelompokkan berbeda.",
          "Pecah bilangan dua angka, lalu kalikan terpisah. Kata setiap berarti kali.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Kebun Stroberi Landak Bulat",
      pengantar:
        "Siswa menjadi kepala kebun. Sepuluh pos selesai, sepuluh keranjang terkumpul.",
      labelDaftar: "Sepuluh pos panen",
      kolom: 1,
      item: [
        {
          nama: "Petak stroberi",
          singkat: "Hitung dengan kali",
          uraian:
            "Level 1: 4 × 5 = 20. Level 2: 6 × 3 = 18. Level 3: 2 × 4 × 5 = 40. Level 4: 24 × 4 = 96. Level 5: 7 × 8 × 5 = 280 kg.",
          contoh: "Salah hitung tidak mengurangi keranjang. Coba lagi.",
        },
      ],
      kuis: [
        ...kuisDariMisi(MISI_MTK3_PERKALIAN),
        { pertanyaan: "Ada 6 baris, tiap baris 7 pohon. Bentuk perkaliannya?", alias: ["6 x 7"] },
        { pertanyaan: "Berapa 8 × 7?", alias: ["56"] },
        { pertanyaan: "Pasangkan penjumlahan berulang dengan perkaliannya.", alias: ["24", "30", "12"] },
        { pertanyaan: "Urutkan 9 × 3, 5 × 8, 7 × 7, dan 4 × 4.", alias: ["16", "27", "40", "49"] },
        { pertanyaan: "Periksa tiga pernyataan kebun.", alias: ["benar", "salah"] },
        { pertanyaan: "4 × 9 dan 9 × 4. Apa yang bisa dikatakan?", alias: ["sama"] },
        { pertanyaan: "Berapa 32 × 3?", alias: ["96"] },
        { pertanyaan: "Deret naik 6: 12, 18, 24, berikutnya?", alias: ["30"] },
        { pertanyaan: "Sembilan baris, setiap baris delapan pohon. Sebutkan perkalian dan hasilnya.", alias: ["72", "tujuh puluh dua"] },
        { pertanyaan: "Hitung 47 × 6 dengan langkah.", alias: ["240", "42", "282"] },
      ],
      voice: [
        [
          "Kalian menjadi kepala kebun stroberi. Setiap petak punya baris dan pohon yang sama banyak.",
          "Hitung cepat dengan perkalian. Kalau tepat, kalian mendapat keranjang stroberi.",
          "Sepuluh pos selesai, sepuluh keranjang terkumpul, kebun besar terbuka.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal perkalian sampai 100, sifat, pecahan dua angka, dan soal cerita.",
      labelDaftar: "Lembar evaluasi perkalian",
      kolom: 1,
      item: [
        {
          nama: "Dua bentuk dan dua angka",
          singkat: "Jejak hitung",
          uraian: "Tujuh kelompok berisi 8: 7 × 8 = 56. 56 × 4 = 200 + 24 = 224.",
          contoh: "Pecah puluhan dan satuan, lalu jumlahkan.",
        },
        {
          nama: "Tiga petak",
          singkat: "Bandingkan",
          uraian: "Petak A 48, petak B 63, petak C 40. Selisih terbanyak dan tersedikit adalah 23.",
          contoh: "Hitung dulu, baru bandingkan.",
        },
      ],
      kuis: [
        { pertanyaan: "Tujuh kelompok berisi 8. Tulis penjumlahan dan perkaliannya.", alias: ["56"] },
        { pertanyaan: "Bentuk mana yang sama dengan 9 × 6?", alias: ["6 x 9"] },
        { pertanyaan: "Ucapkan hasil 7 × 8.", alias: ["56", "lima puluh enam"] },
        { pertanyaan: "Apakah perkalian selalu lebih besar dari penjumlahan?", alias: ["salah"] },
        { pertanyaan: "Pasangkan 8 × 8, 5 × 9, dan 6 × 8.", alias: ["64", "45", "48"] },
        { pertanyaan: "Hitung 56 × 4.", alias: ["200", "24", "224"] },
        { pertanyaan: "⬜ × 7 = 63. Angka yang hilang?", alias: ["9"] },
        { pertanyaan: "Urutkan hasil 27, 28, 48, dan 81.", alias: ["27", "28", "48", "81"] },
        { pertanyaan: "6 × 8 dan 8 × 6. Sebutkan hasil dan nama sifatnya.", alias: ["48", "pertukaran"] },
        { pertanyaan: "Tiga petak: 6 × 8, 7 × 9, dan 5 × 8. Tulis jumlah, petak terbanyak, dan selisihnya.", alias: ["48", "63", "40", "23"] },
      ],
      voice: [
        [
          "Saatnya kalian mengerjakan sendiri. Ada sepuluh soal perkalian sampai 100.",
          "Ada penjumlahan berulang, sifat pertukaran, sifat pengelompokan, dan perkalian dua angka.",
          "Kalau lupa hasilnya, coba balik posisinya. Periksa lagi jawabanmu.",
        ],
      ],
    },
  ],
};
