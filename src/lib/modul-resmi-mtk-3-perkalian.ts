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
    "Nisa, Farhan, dan Cinta belajar perkalian sampai 100 bersama burung hantu Igil di kios balon taman.",
  kunciJawaban: "B,C,B,B,C,A,A,C,C,B",
  sketsaKartu: [
    "Nisa, Farhan, dan Cinta menghitung ikat balon bersama burung hantu Igil.",
    "Penjumlahan berulang, sifat pertukaran, sifat pengelompokan, dan perkalian bersusun.",
    "Sepuluh pos pola di taman balon.",
    "Poin penting dan lembar evaluasi perkalian.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
Ada 5 ikat balon, tiap ikat 6 balon. Bentuk perkaliannya...
A) 5 + 6
B) 5 × 6
C) 6 − 5
D) 5 × 5`,
    `[Soal 2 - PG - Tipe: MOTS]
7 × 8 sama dengan...
A) 48
B) 54
C) 56
D) 64`,
    `[Soal 3 - PG - Tipe: HOTS]
15 × 4 sama dengan...
A) 50
B) 60
C) 45
D) 19`,
    `[Soal 4 - PG - Tipe: HOTS]
Farhan berkata perkalian selalu lebih besar dari penjumlahan. Pernyataannya...
A) Benar
B) Salah, karena 1 × 8 = 8 sedangkan 1 + 8 = 9
C) Benar, karena 2 × 2 = 4
D) Tidak bisa ditentukan`,
    `[Soal 5 - PG - Tipe: HOTS]
⬜ × 6 = 54. Angka yang hilang...
A) 7
B) 8
C) 9
D) 6`,
    `[Soal 6 - PG - Tipe: HOTS]
8 × 5 = 40, dan ⬜ × 8 = 40. Angka yang hilang...
A) 5
B) 6
C) 4
D) 8`,
    `[Soal 7 - PG - Tipe: MOTS]
Manakah yang hasilnya 36?
A) 4 × 9
B) 6 × 5
C) 7 × 5
D) 8 × 4`,
    `[Soal 8 - PG - Tipe: MOTS]
Deret naik 7: 14 – 21 – 28 – ⬜ – 42. Berikutnya...
A) 32
B) 33
C) 35
D) 36`,
    `[Soal 9 - PG - Tipe: MOTS]
6 × 7 dan 7 × 6. Yang benar...
A) Hasil pertama lebih besar
B) Hasil kedua lebih besar
C) Hasilnya sama
D) Tidak bisa ditentukan`,
    `[Soal 10 - PG - Tipe: HOTS]
Kios A 6 × 8, kios B 9 × 7, kios C 5 × 8. Balon paling banyak ada di...
A) Kios A
B) Kios B
C) Kios C
D) Ketiganya sama`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar: "Nisa, Farhan, Cinta, dan Igil mengubah penjumlahan berulang menjadi perkalian di kios balon.",
      labelDaftar: "Lima adegan kios balon",
      kolom: 1,
      item: [
        {
          nama: "Penjumlahan berulang",
          singkat: "Cara cepat",
          uraian: "4 × 6 = 24, sama dengan 6 + 6 + 6 + 6.",
          contoh: "Empat kali enam sama dengan dua puluh empat.",
        },
        {
          nama: "Sifat pertukaran",
          singkat: "Dibalik tetap sama",
          uraian: "8 × 6 = 48 dan 6 × 8 = 48.",
          contoh: "Dua bilangan boleh bertukar tempat.",
        },
        {
          nama: "Sifat pengelompokan",
          singkat: "Kerjakan bertahap",
          uraian: "(2 × 5) × 3 = 30 dan 2 × (5 × 3) = 30.",
          contoh: "Kurung boleh berpindah.",
        },
        {
          nama: "Perkalian dua angka",
          singkat: "Dari kanan",
          uraian: "24 × 5: 4 × 5 = 20, tulis 0, naik 2+. 2 × 5 = 10, tambah 2, jadi 12. Hasilnya 120.",
          contoh: "Lebih dari 9: tulis satuan, naikkan ke kiri.",
        },
        {
          nama: "Soal cerita",
          singkat: "Kata setiap",
          uraian: "4 tamu, setiap tamu 7 balon: 4 × 7 = 28.",
          contoh: "Setiap, tiap, dan masing-masing berarti kali.",
        },
      ],
      kuis: [
        { pertanyaan: "5 ikat, tiap ikat 4 balon. Ucapkan bentuk kalinya dan hasilnya.", alias: ["20"] },
        { pertanyaan: "Tulis 3 + 3 + 3 + 3 dan bentuk kalinya.", alias: ["12"] },
        { pertanyaan: "8 × 6 dan 6 × 8. Ucapkan hasilnya.", alias: ["48", "sama"] },
        { pertanyaan: "Tulis 9 × 5 dan 5 × 9 beserta hasilnya.", alias: ["45"] },
        { pertanyaan: "(2 × 5) × 3. Ucapkan hasil dalam kurung dan hasil akhir.", alias: ["10", "30"] },
        { pertanyaan: "Tulis satu langkah 4 × 2 × 5 dan hasilnya.", alias: ["40"] },
        { pertanyaan: "Pada 16 × 5, satuan 6 × 5 = 30. Apa yang ditulis dan yang naik?", alias: ["0", "3"] },
        { pertanyaan: "Tulis hasil 16 × 4.", alias: ["64"] },
        { pertanyaan: "7 anak, masing-masing 4 balon. Ucapkan hasilnya.", alias: ["28"] },
        { pertanyaan: "9 ikat, tiap ikat 6 balon. Tulis kalimatnya.", alias: ["54"] },
        { pertanyaan: "4 ikat berisi 6. Bentuk kalinya?", alias: ["4 x 6"] },
        { pertanyaan: "Pasangkan 5 × 4, 6 × 6, 7 × 3, dan 8 × 8.", alias: ["20", "36", "21", "64"] },
        { pertanyaan: "Susun 16, 24, 35, dan 42.", alias: ["16", "24", "35", "42"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "Mana yang hasilnya bukan 18?", alias: ["20"] },
      ],
      voice: [
        [
          "Hari Minggu di kios balon taman. Ikatnya berisi jumlah yang sama.",
          "Perkalian adalah cara cepat menjumlahkan angka yang sama. Hasilnya sampai 100.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis",
      pengantar: "Papan kios: contoh, cara, dan hasil sampai 100.",
      labelDaftar: "Lima papan perkalian",
      kolom: 1,
      item: [
        {
          nama: "Penjumlahan berulang",
          singkat: "Hitung kemunculan",
          uraian: "4 + 4 + 4 + 4 + 4 = 5 × 4 = 20. Batas bab ini 10 × 10 = 100.",
          contoh: "Jumlah kelompok kali isi tiap kelompok.",
        },
        {
          nama: "Sifat pertukaran",
          singkat: "Dibalik tetap sama",
          uraian: "7 × 8 = 56 dan 8 × 7 = 56.",
          contoh: "Kalau hafalan macet, balik posisinya.",
        },
        {
          nama: "Sifat pengelompokan",
          singkat: "Kurung berpindah",
          uraian: "(5 × 2) × 4 = 40 dan 5 × (2 × 4) = 40.",
          contoh: "Kerjakan yang di dalam kurung dulu.",
        },
        {
          nama: "Perkalian dua angka",
          singkat: "Dari kanan",
          uraian: "17 × 4: 7 × 4 = 28, tulis 8, naik 2+. 1 × 4 = 4, tambah 2, jadi 6. Hasilnya 68.",
          contoh: "Lebih dari 9: tulis satuan, naikkan ke kiri.",
        },
        {
          nama: "Soal cerita",
          singkat: "Setiap berarti kali",
          uraian: "8 anak, tiap anak 7 balon: 8 × 7 = 56. 5 dus, tiap dus 8 balon: 5 × 8 = 40.",
          contoh: "Setiap, tiap, dan masing-masing berarti kali.",
        },
      ],
      kuis: [
        { pertanyaan: "6 + 6 + 6 + 6. Ucapkan bentuk kalinya dan hasilnya.", alias: ["24"] },
        { pertanyaan: "Tulis 7 + 7 + 7 dan bentuk kalinya.", alias: ["21"] },
        { pertanyaan: "7 × 8 dan 8 × 7. Ucapkan hasilnya.", alias: ["56", "sama"] },
        { pertanyaan: "Tulis 6 × 9 dan 9 × 6 beserta hasilnya.", alias: ["54"] },
        { pertanyaan: "(5 × 2) × 4. Ucapkan hasil dalam kurung dan hasil akhir.", alias: ["10", "40"] },
        { pertanyaan: "Tulis satu langkah 3 × 3 × 2 dan hasilnya.", alias: ["18"] },
        { pertanyaan: "Pada 18 × 3, satuan 8 × 3 = 24. Apa yang ditulis dan yang naik?", alias: ["4", "2"] },
        { pertanyaan: "Tulis hasil 19 × 3.", alias: ["57"] },
        { pertanyaan: "6 baris, setiap baris 9 balon. Ucapkan hasilnya.", alias: ["54"] },
        { pertanyaan: "5 dus, tiap dus 8 balon. Tulis kalimatnya.", alias: ["40"] },
        { pertanyaan: "15 × 4 sama dengan?", alias: ["60"] },
        { pertanyaan: "Pasangkan 12 × 3, 14 × 2, 11 × 5, dan 13 × 4.", alias: ["36", "28", "55", "52"] },
        { pertanyaan: "Susun 18, 27, 32, dan 45.", alias: ["18", "27", "32", "45"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "4 × 5 = 20. Maka 4 × 8 sama dengan?", alias: ["32"] },
      ],
      voice: [
        [
          "Papan ini merangkum cara kali. Hitung berapa kali angka yang sama dijumlah.",
          "Dua bilangan boleh ditukar. Tiga bilangan dikerjakan bertahap. Dua angka dikali dari kanan.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Pos Balon Igil",
      pengantar: "Sepuluh soal pola: deret, angka hilang, analogi, dan mana yang beda.",
      labelDaftar: "Sepuluh soal pola",
      kolom: 1,
      item: [
        {
          nama: "Soal pola",
          singkat: "Deret dan yang beda",
          uraian: "Cari angka berikutnya, angka yang hilang, atau hasil yang tidak cocok. Sepuluh pos, sepuluh stempel.",
          contoh: "Salah boleh diulang. Stempel tidak berkurang.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK3_PERKALIAN),
      voice: [
        [
          "Sepuluh soal pola. Cari angka berikutnya, angka yang hilang, atau yang beda.",
          "Pilih satu pos, lalu jawab. Sepuluh stempel membuka kios balon.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal perkalian, sifat, susunan dua angka, dan soal cerita.",
      labelDaftar: "Lembar evaluasi perkalian",
      kolom: 1,
      item: [
        {
          nama: "Sifat dan susunan",
          singkat: "Jejak hitung",
          uraian: "9 × 5 sama dengan 5 × 9. 18 × 4 = 72. (3 × 4) × 2 = 24.",
          contoh: "Hitung dulu, baru bandingkan.",
        },
        {
          nama: "Tiga kios",
          singkat: "Bandingkan",
          uraian: "Kios A 48, kios B 45, kios C 42. Kios A paling banyak.",
          contoh: "Kalikan tiap kios, lalu cari yang terbesar.",
        },
      ],
      kuis: [
        { pertanyaan: "6 kelompok berisi 4. Tulis bentuk kalinya.", alias: ["24"] },
        { pertanyaan: "9 × 5 dan 5 × 9. Apa yang bisa dikatakan?", alias: ["sama"] },
        { pertanyaan: "(3 × 4) × 2. Ucapkan langkah dan hasil.", alias: ["12", "24"] },
        { pertanyaan: "Mana yang hasilnya bukan 36?", alias: ["35"] },
        { pertanyaan: "Pasangkan 8 × 7, 9 × 8, 6 × 8, dan 7 × 9.", alias: ["56", "72", "48", "63"] },
        { pertanyaan: "Tulis hasil 18 × 4.", alias: ["72"] },
        { pertanyaan: "Susun 21, 28, 35, dan 42.", alias: ["21", "28", "35", "42"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "7 ikat berisi 8. Ucapkan hasilnya.", alias: ["56"] },
        { pertanyaan: "Kios A 6 × 8, B 9 × 5, C 7 × 6. Mana yang paling banyak?", alias: ["48", "kios a"] },
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
