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
    "Nisa, Farhan, dan Cinta menghitung jeruk, permen, telur, dan kelapa bersama burung hantu Igil.",
  kunciJawaban: "B,C,B,B,C,D,B,B,B,B",
  sketsaKartu: [
    "Nisa, Farhan, dan Cinta menghitung jeruk dan permen bersama Igil.",
    "Pola gambar dan pola bilangan yang membesar atau mengecil sampai 100.",
    "Sepuluh pos di padang layang.",
    "Poin penting dan lembar evaluasi pola.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
Jeruk: 2 – 4 – 6 – ⬜. Kumpulan berikutnya...
A) 6
B) 8
C) 10
D) 4`,
    `[Soal 2 - PG - Tipe: MOTS]
Permen: 9 – 7 – 5. Kumpulan ke-5 ada...
A) 4
B) 2
C) 1
D) 3`,
    `[Soal 3 - PG - Tipe: MOTS]
3 – 5 – 7 – 9 – 11 – ⬜. Berikutnya...
A) 12
B) 13
C) 14
D) 10`,
    `[Soal 4 - PG - Tipe: MOTS]
1 – 4 – 7 – 10 – ⬜. Berikutnya...
A) 12
B) 13
C) 14
D) 11`,
    `[Soal 5 - PG - Tipe: MOTS]
Telur hari ke-1 sampai ke-3: 20, 28, 36. Hari kelima...
A) 44
B) 48
C) 52
D) 40`,
    `[Soal 6 - PG - Tipe: HOTS]
13, 22, 31, 49. Mana yang tidak ikut naik 9?
A) 13
B) 22
C) 31
D) 49`,
    `[Soal 7 - PG - Tipe: HOTS]
Rak buku: 5, 9, 13. Rak kelima ada...
A) 17
B) 21
C) 25
D) 15`,
    `[Soal 8 - PG - Tipe: MOTS]
Kursi baris 1 sampai 3: 20, 23, 26. Baris kelima...
A) 29
B) 32
C) 35
D) 26`,
    `[Soal 9 - PG - Tipe: HOTS]
Televisi: Januari 70, Februari 64, Maret 58. Juni ada...
A) 46
B) 40
C) 34
D) 52`,
    `[Soal 10 - PG - Tipe: HOTS]
Kelapa: hari 1 ada 36, lalu berkurang 5 tiap hari. Hari ke-7 ada...
A) 11
B) 6
C) 16
D) 1`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar: "Nisa, Farhan, Cinta, dan Igil menghitung pola dari buku: jeruk, permen, telur, dan kelapa. Peta ada di dalam tiap bagian.",
      labelDaftar: "Empat bagian pola",
      kolom: 1,
      item: [
        { nama: "Gambar membesar", singkat: "Jeruk bertambah", uraian: "Kumpulan jeruk 2, 4, 6. Tambah 2. Kumpulan ke-7 ada 14 jeruk.", contoh: "Benda berikutnya lebih banyak." },
        { nama: "Gambar mengecil", singkat: "Permen berkurang", uraian: "Permen 9, 7, 5. Kurang 2. Kumpulan ke-5 tinggal 1 permen.", contoh: "Benda berikutnya lebih sedikit." },
        { nama: "Bilangan membesar", singkat: "Telur naik", uraian: "3, 5, 7, 9, 11 berikutnya 13. Telur 20, 28, 36, hari kelima 52.", contoh: "Jangan menebak 12 kalau selisihnya 2." },
        { nama: "Bilangan mengecil", singkat: "Kelapa turun", uraian: "23, 18, 13, 8 berikutnya 3. Kelapa 36 turun 5, hari ke-7 ada 6.", contoh: "Televisi Januari 70 turun 6, Juni ada 40." },
      ],
      kuis: [
        { pertanyaan: "Jeruk 2, 4, 6. Kumpulan ke-7?", alias: ["14"] },
        { pertanyaan: "4, 8, 12. Berikutnya?", alias: ["16"] },
        { pertanyaan: "Permen 9, 7, 5. Kumpulan ke-5?", alias: ["1"] },
        { pertanyaan: "24, 20, 16, 12. Berikutnya?", alias: ["8"] },
        { pertanyaan: "3, 5, 7, 9, 11. Berikutnya?", alias: ["13"] },
        { pertanyaan: "Telur 20, 28, 36. Hari kelima?", alias: ["52"] },
        { pertanyaan: "23, 18, 13, 8. Berikutnya?", alias: ["3"] },
        { pertanyaan: "Kelapa 36, 31, 26, 21. Hari ke-7?", alias: ["6"] },
        { pertanyaan: "Jeruk 2, 4, 6. Kumpulan ke-4?", alias: ["8"] },
        { pertanyaan: "Pasangkan pola dengan aturannya.", alias: ["naik 2", "turun 2", "naik 8"] },
        { pertanyaan: "Susun rak buku 5, 9, 13, 17.", alias: ["5", "9", "13", "17"] },
        { pertanyaan: "Periksa tiga pernyataan pola.", alias: ["benar", "salah"] },
        { pertanyaan: "Mana yang tidak ikut naik 9?", alias: ["49"] },
        { pertanyaan: "Rak buku kelima dari 5, 9, 13?", alias: ["21"] },
      ],
      voice: [[
        "Hari ini kita mencari pola jeruk, permen, telur, dan kelapa.",
        "Membesar berarti berikutnya lebih banyak. Mengecil berarti berikutnya lebih sedikit.",
        "Kurangi dua bilangan yang bersebelahan. Selisih yang sama adalah aturannya.",
      ]],
    },
    {
      kode: "B",
      judul: "B. Latihan di dalam sub-bab",
      pengantar: "Peta dan latihan tiap bagian ada di dalam materi pola.",
      labelDaftar: "Latihan di dalam pola gambar dan pola bilangan",
      kolom: 1,
      item: [
        { nama: "Gambar naik", singkat: "Jeruk tambah 2", uraian: "2, 4, 6, 8. Kumpulan ke-7 ada 14 jeruk.", contoh: "Selisih tetap, lalu tambah." },
        { nama: "Gambar turun", singkat: "Permen kurang 2", uraian: "9, 7, 5, 3, 1. Kumpulan ke-5 ada 1 permen.", contoh: "Selisih tetap, lalu kurang." },
        { nama: "Angka naik", singkat: "Telur tambah 8", uraian: "3, 5, 7, 9, 11 berikutnya 13. Hari kelima telur ada 52.", contoh: "Rak kelima Ali ada 21 buku." },
        { nama: "Angka turun", singkat: "Kelapa kurang 5", uraian: "23, 18, 13, 8 berikutnya 3. Hari ke-7 kelapa ada 6. Juni ada 40 televisi.", contoh: "Baris terakhir bioskop ada 46 kursi." },
      ],
      kuis: [
        { pertanyaan: "Kursi 20, 23, 26. Baris kelima?", alias: ["32"] },
        { pertanyaan: "Pasangkan barisan dengan aturannya.", alias: ["naik 12", "turun 11", "turun 6"] },
        { pertanyaan: "Susun 36, 31, 26, 21.", alias: ["36", "31", "26", "21"] },
        { pertanyaan: "Periksa tiga pernyataan pola.", alias: ["benar", "salah"] },
        { pertanyaan: "Bioskop baris ke-10 dari 10, 14, 18?", alias: ["46"] },
      ],
      voice: [[
        "Peta pola ada di dalam materi, pada tiap bagian gambar dan bilangan.",
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
        "Igil menjaga sepuluh pos pola jeruk, telur, dan kelapa.",
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
          nama: "Pola sampai seratus",
          singkat: "Cari aturan dulu",
          uraian: "7, 19, 31, 43 berikutnya 55. Permen kumpulan ke-4 ada 3. 1, 4, 7, 10 berikutnya 13. 91, 77, 63 berikutnya 49. Kursi baris ketujuh ada 38. Juni 40 televisi. Bioskop baris terakhir 46 kursi.",
          contoh: "Selisih dua bilangan bersebelahan adalah aturannya.",
        },
      ],
      kuis: [
        { pertanyaan: "7, 19, 31, 43. Berikutnya?", alias: ["55"] },
        { pertanyaan: "Permen 9, 7, 5. Kumpulan ke-4?", alias: ["3"] },
        { pertanyaan: "1, 4, 7, 10. Berikutnya?", alias: ["13"] },
        { pertanyaan: "Mana yang tidak ikut naik 6 dari 6, 12, 24?", alias: ["24"] },
        { pertanyaan: "Pasangkan barisan dengan aturannya.", alias: ["naik 4", "turun 14", "naik 15"] },
        { pertanyaan: "91, 77, 63. Berikutnya?", alias: ["49"] },
        { pertanyaan: "Kursi baris ketujuh dari 20, 23, 26?", alias: ["38"] },
        { pertanyaan: "Televisi Agustus dari 70 turun 6 tiap bulan?", alias: ["28"] },
        { pertanyaan: "96, 85, 74, 63. Berikutnya?", alias: ["52"] },
        { pertanyaan: "Bioskop 10, 14, 18. Baris ke-10?", alias: ["46"] },
      ],
      voice: [[
        "Sepuluh soal pola. Cari selisih dua bilangan yang bersebelahan dulu.",
        "Membesar ditambah. Mengecil dikurangi. Contohnya jeruk, telur, dan kelapa.",
      ]],
    },
  ],
};
