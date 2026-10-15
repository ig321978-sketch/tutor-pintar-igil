import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK4_BAB3 } from "@/lib/misi-mtk-4-bab3";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK4_BAB3 = "Bab 3: Pola Gambar dan Pola Bilangan";

export const MODUL_MTK4_BAB3: ModulResmiPai = {
  id: "mtk-4-bab3",
  judul: JUDUL_MTK4_BAB3,
  pola: /^bab 3: pola gambar dan pola bilangan$/,
  motivasi:
    "Nisa, Farhan, dan Cinta merangkai pita layang yang bertambah dan berkurang bersama burung hantu Igil di padang layang.",
  kunciJawaban: "B,C,B,B,C,D,B,B,B,B",
  sketsaKartu: [
    "Nisa, Farhan, dan Cinta merangkai pita layang bersama Igil.",
    "Pola gambar dan pola bilangan yang membesar atau mengecil sampai 100.",
    "Sepuluh pos di padang layang.",
    "Poin penting dan lembar evaluasi pola.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
4 – 9 – 14 – 19 – ⬜. Berikutnya...
A) 23
B) 24
C) 29
D) 20`,
    `[Soal 2 - PG - Tipe: MOTS]
45 – 39 – 33 – 27 – ⬜. Berikutnya...
A) 22
B) 20
C) 21
D) 15`,
    `[Soal 3 - PG - Tipe: MOTS]
Banyak pita: 3, 8, 13, 18. Berikutnya...
A) 21
B) 23
C) 24
D) 20`,
    `[Soal 4 - PG - Tipe: MOTS]
10, 18, 26, 34. Aturannya...
A) Naik 6
B) Naik 8
C) Turun 8
D) Naik 4`,
    `[Soal 5 - PG - Tipe: MOTS]
60 – 55 – 50 – 45 – ⬜. Berikutnya...
A) 35
B) 44
C) 40
D) 46`,
    `[Soal 6 - PG - Tipe: HOTS]
6, 11, 16, 22. Mana yang tidak ikut naik 5?
A) 6
B) 11
C) 16
D) 22`,
    `[Soal 7 - PG - Tipe: HOTS]
Mulai 9, naik 7. Bilangan ketiga adalah...
A) 16
B) 23
C) 30
D) 21`,
    `[Soal 8 - PG - Tipe: MOTS]
72 – 65 – 58 – 51 – ⬜. Berikutnya...
A) 45
B) 44
C) 43
D) 50`,
    `[Soal 9 - PG - Tipe: HOTS]
4, 7, 10 naik 3. Maka 20, 23, ⬜. Berikutnya...
A) 25
B) 26
C) 30
D) 24`,
    `[Soal 10 - PG - Tipe: HOTS]
Hari pertama 8 layang. Tiap hari bertambah 9. Hari kelima ada...
A) 35
B) 44
C) 53
D) 36`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar: "Nisa, Farhan, Cinta, dan Igil merangkai pita di padang layang.",
      labelDaftar: "Empat adegan padang layang",
      kolom: 1,
      item: [
        { nama: "Gambar membesar", singkat: "Pita bertambah", uraian: "Benda berikutnya lebih banyak. Cari selisih tambahnya, lalu jumlahkan.", contoh: "4, 8, 12, 16, berikutnya 20." },
        { nama: "Gambar mengecil", singkat: "Pita berkurang", uraian: "Benda berikutnya lebih sedikit. Cari selisih kurangnya, lalu kurangkan.", contoh: "18, 15, 12, 9, berikutnya 6." },
        { nama: "Bilangan membesar", singkat: "Angka naik", uraian: "Bilangan berikutnya lebih besar. Jumlahkan dengan aturan yang sama.", contoh: "8, 13, 18, 23, berikutnya 28." },
        { nama: "Bilangan mengecil", singkat: "Angka turun", uraian: "Bilangan berikutnya lebih kecil. Kurangkan dengan aturan yang sama, sampai 100.", contoh: "90, 82, 74, berikutnya 66." },
      ],
      kuis: [
        { pertanyaan: "4, 8, 12, 16. Berikutnya?", alias: ["20"] },
        { pertanyaan: "3, 7, 11, 15. Berikutnya?", alias: ["19"] },
        { pertanyaan: "18, 15, 12, 9. Berikutnya?", alias: ["6"] },
        { pertanyaan: "30, 26, 22, 18. Berikutnya?", alias: ["14"] },
        { pertanyaan: "8, 13, 18, 23. Berikutnya?", alias: ["28"] },
        { pertanyaan: "11, 20, 29, 38. Berikutnya?", alias: ["47"] },
        { pertanyaan: "90, 82, 74. Berikutnya?", alias: ["66"] },
        { pertanyaan: "100, 91, 82, 73. Berikutnya?", alias: ["64"] },
        { pertanyaan: "6, 11, 16, 21. Berikutnya?", alias: ["26"] },
        { pertanyaan: "Pasangkan pola dengan aturannya.", alias: ["naik 3", "turun 4", "naik 10"] },
        { pertanyaan: "Susun 12, 19, 26, 33.", alias: ["12", "19", "26", "33"] },
        { pertanyaan: "Periksa tiga pernyataan pita.", alias: ["benar", "salah"] },
        { pertanyaan: "Mana yang tidak ikut naik 4?", alias: ["19"] },
        { pertanyaan: "50, 43, 36. Berikutnya?", alias: ["29"] },
      ],
      voice: [[
        "Hari ini kita melihat pita layang di padang Igil.",
        "Pola membesar berarti berikutnya lebih banyak. Pola mengecil berarti berikutnya lebih sedikit.",
        "Gambar dan bilangan memakai tambah atau kurang, sampai seratus.",
      ]],
    },
    {
      kode: "B",
      judul: "B. Infografis",
      pengantar: "Intisari mencari aturan tambah atau kurang.",
      labelDaftar: "Empat peta padang",
      kolom: 1,
      item: [
        { nama: "Gambar naik", singkat: "Selisih tambah", uraian: "2, 6, 10, 14 naik 4. Berikutnya 18.", contoh: "Kurangi dua bilangan yang bersebelahan." },
        { nama: "Gambar turun", singkat: "Selisih kurang", uraian: "40, 35, 30, 25 turun 5. Berikutnya 20.", contoh: "Bilangan di kiri dikurangi aturan." },
        { nama: "Angka naik", singkat: "Terus tambah", uraian: "15, 23, 31 naik 8. Berikutnya 39.", contoh: "Aturan yang sama dipakai terus." },
        { nama: "Angka turun", singkat: "Terus kurang", uraian: "80, 73, 66 turun 7. Berikutnya 59.", contoh: "Jangan melewati nol pada bab ini." },
      ],
      kuis: [
        { pertanyaan: "2, 6, 10, 14. Berikutnya?", alias: ["18"] },
        { pertanyaan: "9, 14, 19, 24. Berikutnya?", alias: ["29"] },
        { pertanyaan: "40, 35, 30, 25. Berikutnya?", alias: ["20"] },
        { pertanyaan: "24, 20, 16, 12. Berikutnya?", alias: ["8"] },
        { pertanyaan: "15, 23, 31. Berikutnya?", alias: ["39"] },
        { pertanyaan: "4, 13, 22, 31. Berikutnya?", alias: ["40"] },
        { pertanyaan: "80, 73, 66. Berikutnya?", alias: ["59"] },
        { pertanyaan: "55, 48, 41, 34. Berikutnya?", alias: ["27"] },
        { pertanyaan: "7, 16, 25, 34. Berikutnya?", alias: ["43"] },
        { pertanyaan: "Pasangkan barisan dengan aturannya.", alias: ["naik 6", "turun 9", "naik 2"] },
        { pertanyaan: "Susun 60, 52, 44, 36.", alias: ["60", "52", "44", "36"] },
        { pertanyaan: "Periksa tiga pernyataan peta.", alias: ["benar", "salah"] },
        { pertanyaan: "100, 92, 84. Berikutnya?", alias: ["76"] },
      ],
      voice: [[
        "Peta ini merangkum cara mencari aturan pita.",
        "Kurangi dua bilangan yang bersebelahan. Jika hasilnya tetap, itulah aturannya.",
        "Naik berarti tambah. Turun berarti kurang.",
      ]],
    },
    {
      kode: "C",
      judul: "C. Pos Padang Layang",
      pengantar: "Sepuluh soal pola. Selesai sepuluh pos, pita terkumpul sepuluh.",
      labelDaftar: "Sepuluh pos padang",
      kolom: 1,
      item: [
        {
          nama: "Pos pola",
          singkat: "Naik, turun, yang beda",
          uraian: "Deret membesar, deret mengecil, aturan yang sama, dan bilangan yang tidak ikut.",
          contoh: "Dua soal suara dan dua soal tulis.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK4_BAB3),
      voice: [[
        "Igil menjaga sepuluh pos di padang layang.",
        "Ada pola naik, pola turun, dan yang beda. Dua pos dijawab dengan suara, dua pos ditulis.",
      ]],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal pola gambar dan pola bilangan sampai 100.",
      labelDaftar: "Lembar evaluasi pola",
      kolom: 1,
      item: [
        {
          nama: "Pita sampai seratus",
          singkat: "Cari aturan dulu",
          uraian: "14, 21, 28, 35 berikutnya 42. 100, 93, 86 berikutnya 79. Layang keempat dari 12 naik 6 adalah 30.",
          contoh: "Selisih dua bilangan bersebelahan adalah aturannya.",
        },
      ],
      kuis: [
        { pertanyaan: "14, 21, 28, 35. Berikutnya?", alias: ["42"] },
        { pertanyaan: "36, 30, 24, 18. Berikutnya?", alias: ["12"] },
        { pertanyaan: "7, 15, 23, 31. Berikutnya?", alias: ["39"] },
        { pertanyaan: "Mana yang tidak ikut naik 8?", alias: ["45"] },
        { pertanyaan: "Pasangkan barisan dengan aturannya.", alias: ["naik 3", "turun 4", "naik 10"] },
        { pertanyaan: "88, 79, 70, 61. Berikutnya?", alias: ["52"] },
        { pertanyaan: "2, 9, 16, 23. Berikutnya?", alias: ["30"] },
        { pertanyaan: "Mulai 12, naik 6. Layang keempat?", alias: ["30"] },
        { pertanyaan: "100, 93, 86. Berikutnya?", alias: ["79"] },
        { pertanyaan: "5, 11, 17. Berikutnya?", alias: ["23"] },
      ],
      voice: [[
        "Sepuluh soal padang layang. Cari selisih dua bilangan yang bersebelahan dulu.",
        "Membesar ditambah. Mengecil dikurangi. Angkanya sampai seratus.",
      ]],
    },
  ],
};
