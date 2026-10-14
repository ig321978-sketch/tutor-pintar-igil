import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK3_POLA } from "@/lib/misi-mtk-3-pola";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK3_POLA = "Bab 9: Pola Bilangan dan Pola Gambar";

export const MODUL_MTK3_POLA: ModulResmiPai = {
  id: "mtk-3-pola",
  judul: JUDUL_MTK3_POLA,
  pola: /^bab 9: pola bilangan dan pola gambar$/,
  motivasi:
    "Nisa, Farhan, dan Cinta merangkai manik dan batu pijakan bersama burung hantu Igil di taman sekolah.",
  kunciJawaban: "A,C,D,B,C,A,D,B,C,A",
  sketsaKartu: [
    "Nisa, Farhan, dan Cinta merangkai manik bersama burung hantu Igil.",
    "Pola naik, pola turun, pola berulang, angka hilang, dan pola sendiri.",
    "Sepuluh pos manik.",
    "Poin penting dan lembar evaluasi pola.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
5 – 10 – 15 – 20 – ⬜. Berikutnya...
A) 25
B) 22
C) 30
D) 15`,
    `[Soal 2 - PG - Tipe: MOTS]
18 – 16 – 14 – 12 – ⬜. Berikutnya...
A) 14
B) 11
C) 10
D) 8`,
    `[Soal 3 - PG - Tipe: MOTS]
Merah, biru, merah, biru, ⬜. Berikutnya...
A) Kuning
B) Hijau
C) Biru
D) Merah`,
    `[Soal 4 - PG - Tipe: HOTS]
6 – ⬜ – 14 – 18. Angka yang hilang...
A) 8
B) 10
C) 12
D) 16`,
    `[Soal 5 - PG - Tipe: MOTS]
3, 6, 9, 12. Aturannya...
A) Naik 2
B) Turun 3
C) Naik 3
D) Naik 4`,
    `[Soal 6 - PG - Tipe: HOTS]
50 – 40 – 30 – 20 – ⬜. Berikutnya...
A) 10
B) 15
C) 0
D) 30`,
    `[Soal 7 - PG - Tipe: HOTS]
Mana yang tidak ikut pola 2, 4, 6, 9?
A) 2
B) 4
C) 6
D) 9`,
    `[Soal 8 - PG - Tipe: MOTS]
Segitiga, lingkaran, persegi, segitiga, lingkaran, ⬜. Berikutnya...
A) Segitiga
B) Persegi
C) Bintang
D) Lingkaran`,
    `[Soal 9 - PG - Tipe: HOTS]
Pola naik 7: 7 – 14 – 21 – ⬜. Berikutnya...
A) 27
B) 22
C) 28
D) 35`,
    `[Soal 10 - PG - Tipe: HOTS]
16 – 13 – 10 – 7 – ⬜. Berikutnya...
A) 4
B) 5
C) 6
D) 3`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar: "Nisa, Farhan, Cinta, dan Igil merangkai manik di taman.",
      labelDaftar: "Lima adegan manik",
      kolom: 1,
      item: [
        { nama: "Pola naik", singkat: "Tambah tetap", uraian: "3, 6, 9, 12 naik 3.", contoh: "Selisihnya ditambahkan." },
        { nama: "Pola turun", singkat: "Kurang tetap", uraian: "18, 15, 12 turun 3.", contoh: "Selisihnya dikurangkan." },
        { nama: "Pola berulang", singkat: "Gambar diulang", uraian: "Merah, kuning, lalu diulang.", contoh: "Lihat kelompoknya." },
        { nama: "Angka hilang", singkat: "Isi yang kosong", uraian: "7, kosong, 11, 13. Yang hilang 9.", contoh: "Cari selisih yang sama." },
        { nama: "Pola sendiri", singkat: "Tentukan aturan", uraian: "1, 3, 5, 7 naik 2.", contoh: "Sebut aturannya, lalu lanjutkan." },
      ],
      kuis: [
        { pertanyaan: "4 – 8 – 12 – berikutnya?", alias: ["16"] },
        { pertanyaan: "5 – 10 – 15 – berikutnya?", alias: ["20"] },
        { pertanyaan: "40 – 35 – 30 – berikutnya?", alias: ["25"] },
        { pertanyaan: "24 – 20 – 16 – berikutnya?", alias: ["12"] },
        { pertanyaan: "Bintang, bulan, bintang, bulan. Berikutnya?", alias: ["bintang"] },
        { pertanyaan: "Segitiga, lingkaran, persegi, segitiga, lingkaran. Berikutnya?", alias: ["persegi"] },
        { pertanyaan: "3 – kosong – 9 – 12. Yang hilang?", alias: ["6"] },
        { pertanyaan: "10 – kosong – 30 – 40. Yang hilang?", alias: ["20"] },
        { pertanyaan: "6 – 12 – 18 – berikutnya?", alias: ["24"] },
        { pertanyaan: "14 – 12 – 10 – berikutnya?", alias: ["8"] },
        { pertanyaan: "6 – 9 – 12 – 15 – berikutnya?", alias: ["18"] },
        { pertanyaan: "Pasangkan pola dan lanjutnya.", alias: ["8", "10", "biru"] },
        { pertanyaan: "Susun 4, 8, 12, 16.", alias: ["4", "8", "12", "16"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "Hati, bintang, hati, bintang. Berikutnya?", alias: ["hati"] },
      ],
      voice: [["Di taman, manik dan batu pijakan punya aturan. Ada yang naik, ada yang turun, ada yang berulang."]],
    },
    {
      kode: "B",
      judul: "B. Infografis",
      pengantar: "Papan manik: naik, turun, ulang, hilang, dan pola sendiri.",
      labelDaftar: "Lima papan pola",
      kolom: 1,
      item: [
        { nama: "Naik 4", singkat: "1, 5, 9, 13", uraian: "Setiap langkah ditambah 4. Berikutnya 17.", contoh: "Tambahkan selisihnya." },
        { nama: "Turun 3", singkat: "22, 19, 16, 13", uraian: "Setiap langkah dikurangi 3. Berikutnya 10.", contoh: "Kurangkan selisihnya." },
        { nama: "Ulang", singkat: "Dua atau tiga", uraian: "Merah, biru diulang. Tiga bentuk juga diulang.", contoh: "Lihat kelompok pertama." },
        { nama: "Hilang", singkat: "4, kosong, 12, 16", uraian: "Naik 4, jadi yang hilang 8.", contoh: "Selisih dua angka yang ada." },
        { nama: "Buat sendiri", singkat: "Naik 10", uraian: "10, 20, 30, 40. Berikutnya 50.", contoh: "Tentukan aturan, lalu lanjutkan." },
      ],
      kuis: [
        { pertanyaan: "7 – 14 – 21 – berikutnya?", alias: ["28"] },
        { pertanyaan: "3 – 6 – 9 – berikutnya?", alias: ["12"] },
        { pertanyaan: "50 – 40 – 30 – berikutnya?", alias: ["20"] },
        { pertanyaan: "18 – 15 – 12 – berikutnya?", alias: ["9"] },
        { pertanyaan: "Lingkaran, persegi, lingkaran, persegi. Berikutnya?", alias: ["lingkaran"] },
        { pertanyaan: "Kuning, hijau, biru, kuning, hijau. Berikutnya?", alias: ["biru"] },
        { pertanyaan: "8 – kosong – 24 – 32. Yang hilang?", alias: ["16"] },
        { pertanyaan: "15 – kosong – 9 – 6. Yang hilang?", alias: ["12"] },
        { pertanyaan: "9 – 18 – 27 – berikutnya?", alias: ["36"] },
        { pertanyaan: "30 – 24 – 18 – berikutnya?", alias: ["12"] },
        { pertanyaan: "11 – 13 – 15 – berikutnya?", alias: ["17"] },
        { pertanyaan: "Pasangkan pola dan lanjutnya.", alias: ["20", "8", "bintang"] },
        { pertanyaan: "Susun 21, 18, 15, 12.", alias: ["21", "18", "15", "12"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "100 – 90 – 80 – berikutnya?", alias: ["70"] },
      ],
      voice: [["Papan ini menunjukkan aturannya. Cari selisihnya, atau lihat gambar yang diulang."]],
    },
    {
      kode: "C",
      judul: "C. Pos Manik Igil",
      pengantar: "Sepuluh soal pola: deret, angka hilang, analogi, dan mana yang beda.",
      labelDaftar: "Sepuluh soal pola",
      kolom: 1,
      item: [
        {
          nama: "Soal pola",
          singkat: "Deret dan yang beda",
          uraian: "Cari angka berikutnya, angka yang hilang, atau yang tidak cocok.",
          contoh: "Salah boleh diulang. Manik tidak berkurang.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK3_POLA),
      voice: [["Sepuluh pos manik. Pilih satu, lalu jawab."]],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal pola naik, turun, dan gambar.",
      labelDaftar: "Lembar evaluasi pola",
      kolom: 1,
      item: [
        {
          nama: "Evaluasi",
          singkat: "Sepuluh soal",
          uraian: "Melanjutkan pola, mengisi yang hilang, dan menemukan yang beda.",
          contoh: "Cari aturannya dulu.",
        },
      ],
      kuis: [
        { pertanyaan: "9 – 12 – 15 – 18 – berikutnya?", alias: ["21"] },
        { pertanyaan: "20, 16, 12, 8. Aturannya?", alias: ["turun 4"] },
        { pertanyaan: "Lingkaran, bintang, lingkaran, bintang. Berikutnya?", alias: ["lingkaran"] },
        { pertanyaan: "4 – kosong – 12 – 16. Yang hilang?", alias: ["8"] },
        { pertanyaan: "Pasangkan pola dan lanjutnya.", alias: ["13", "40", "bulan"] },
        { pertanyaan: "45 – 40 – 35 – berikutnya?", alias: ["30"] },
        { pertanyaan: "Susun 2, 5, 8, 11.", alias: ["2", "5", "8", "11"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "25 – 22 – 19 – berikutnya?", alias: ["16"] },
        { pertanyaan: "2, 4, 6, 8 kelereng. Berikutnya?", alias: ["10"] },
      ],
      voice: [["Sepuluh soal. Cari selisihnya, atau lihat gambar yang diulang."]],
    },
  ],
};
