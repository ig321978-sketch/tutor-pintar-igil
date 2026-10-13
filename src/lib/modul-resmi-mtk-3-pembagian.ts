import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK3_PEMBAGIAN } from "@/lib/misi-mtk-3-pembagian";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK3_PEMBAGIAN = "Bab 4: Pembagian";

export const MODUL_MTK3_PEMBAGIAN: ModulResmiPai = {
  id: "mtk-3-pembagian",
  judul: JUDUL_MTK3_PEMBAGIAN,
  pola: /^bab 4: pembagian$/,
  motivasi:
    "Rina, Bagas, dan Melati belajar membagi rata bersama kelinci Kelinci Putih di kebun wortel.",
  kunciJawaban: "B,B,A,A,C,C,B,B,B,C",
  sketsaKartu: [
    "Rina, Bagas, dan Melati membagi wortel bersama kelinci Kelinci Putih.",
    "Pembagian rata, pengurangan berulang, sisa, dan keluarga angka.",
    "Kelinci Putih membagi wortel di meja pesta.",
    "Poin penting dan lembar evaluasi pembagian.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
42 wortel dibagi ke 7 kantong. Isi tiap kantong...
A) 5
B) 6
C) 7
D) 8`,
    `[Soal 2 - PG - Tipe: MOTS]
40 dikurangi 8 terus sampai habis. Banyak pengurangannya...
A) 4 kali
B) 5 kali
C) 6 kali
D) 7 kali`,
    `[Soal 3 - PG - Tipe: HOTS]
40 ÷ 6 sama dengan...
A) 6 sisa 4
B) 7 sisa 2
C) 8 sisa 8
D) 5 sisa 10`,
    `[Soal 4 - PG - Tipe: HOTS]
Bagas menulis: kalau 9 × 7 = 63, maka 63 ÷ 9 = 7 dan 63 ÷ 7 = 9. Pernyataannya...
A) Benar
B) Salah, seharusnya 63 ÷ 7 = 8
C) Salah, seharusnya 63 ÷ 9 = 8
D) Tidak bisa ditentukan`,
    `[Soal 5 - PG - Tipe: HOTS]
⬜ ÷ 8 = 6. Bilangan yang dibagi...
A) 42
B) 46
C) 48
D) 54`,
    `[Soal 6 - PG - Tipe: HOTS]
Aku hasil dari 8 × 4. Kalau aku dibagi 4, hasilnya 8. Aku adalah...
A) 24
B) 28
C) 32
D) 36`,
    `[Soal 7 - PG - Tipe: MOTS]
24 kue dibagi ke 6 kotak sama banyak. Isi tiap kotak...
A) 3
B) 4
C) 5
D) 6`,
    `[Soal 8 - PG - Tipe: MOTS]
Hasil pembagian naik 2: 2 – 4 – 6 – ⬜ – 10. Berikutnya...
A) 7
B) 8
C) 9
D) 11`,
    `[Soal 9 - PG - Tipe: MOTS]
Kalau 5 × 8 = 40, pembagian yang benar...
A) 40 ÷ 5 = 7
B) 40 ÷ 8 = 5
C) 40 ÷ 8 = 6
D) 40 ÷ 5 = 9`,
    `[Soal 10 - PG - Tipe: HOTS]
85 wortel dibagi ke 9 kantong. Sisa ditambahkan ke satu kantong. Isi kantong itu menjadi...
A) 11
B) 12
C) 13
D) 14`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar: "Rina, Bagas, Melati, dan Kelinci Putih membagi wortel sama banyak.",
      labelDaftar: "Lima adegan kebun wortel",
      kolom: 1,
      item: [
        { nama: "Bagi rata", singkat: "Sama banyak", uraian: "12 ÷ 4 = 3. Setiap keranjang mendapat 3 wortel.", contoh: "Dua belas bagi empat sama dengan tiga." },
        { nama: "Pengurangan berulang", singkat: "Sampai habis", uraian: "20 − 5 diulang 4 kali, jadi 20 ÷ 5 = 4.", contoh: "Banyaknya pengurangan adalah hasil bagi." },
        { nama: "Tanpa sisa", singkat: "Habis terbagi", uraian: "28 ÷ 4 = 7, karena 4 × 7 = 28.", contoh: "Periksa dengan perkalian." },
        { nama: "Dengan sisa", singkat: "Sisa lebih kecil", uraian: "14 ÷ 3 = 4 sisa 2. Sisa 2 lebih kecil dari 3.", contoh: "Sisa tidak cukup untuk satu kelompok lagi." },
        { nama: "Keluarga angka", singkat: "Satu perkalian, dua pembagian", uraian: "5 × 6 = 30, maka 30 ÷ 5 = 6 dan 30 ÷ 6 = 5.", contoh: "Perkalian dan pembagian bersaudara." },
      ],
      kuis: [
        { pertanyaan: "15 apel dibagi 3 keranjang. Berapa isi tiap keranjang?", alias: ["lima", "5"] },
        { pertanyaan: "Berapa 18 ÷ 6?", alias: ["3"] },
        { pertanyaan: "18 dikurangi 6 sampai habis. Berapa kali?", alias: ["tiga kali", "3 kali"] },
        { pertanyaan: "Hitung 24 ÷ 8 dengan pengurangan berulang.", alias: ["16", "0", "3"] },
        { pertanyaan: "36 kelereng dibagi 6 kantong. Berapa isi tiap kantong?", alias: ["enam", "6"] },
        { pertanyaan: "Hitung 45 ÷ 5 dan periksa dengan perkalian.", alias: ["9", "45"] },
        { pertanyaan: "17 kue dibagi 5 piring. Berapa sisanya?", alias: ["dua", "2"] },
        { pertanyaan: "Hitung 23 ÷ 4.", alias: ["5", "3", "sisa"] },
        { pertanyaan: "7 × 8 = 56. Berapa 56 ÷ 8?", alias: ["tujuh", "7"] },
        { pertanyaan: "Lengkapi 4 × 9, 36 ÷ 4, dan 36 ÷ 9.", alias: ["36", "9", "4"] },
        { pertanyaan: "24 kue dibagi 6 kotak. Berapa isi tiap kotak?", alias: ["4"] },
        { pertanyaan: "Pasangkan 32 ÷ 8, 63 ÷ 7, dan 45 ÷ 5.", alias: ["4", "9"] },
        { pertanyaan: "Susun 42 ÷ 6 = 7.", alias: ["42", "6", "7"] },
        { pertanyaan: "Periksa tiga pernyataan pembagian.", alias: ["benar"] },
        { pertanyaan: "Mana yang hasilnya berbeda dari 8?", alias: ["9"] },
      ],
      voice: [[
        "Pembagian artinya membagi rata. Setiap kelompok mendapat jumlah yang sama.",
        "Pembagian juga bisa dikerjakan dengan pengurangan berulang sampai habis.",
        "Kalau ada sisa, sisanya lebih kecil dari pembagi. Perkalian dan pembagian bersaudara.",
      ]],
    },
    {
      kode: "B",
      judul: "B. Infografis",
      pengantar: "Bagi rata, kurangi sampai habis, periksa dengan perkalian, dan buat keluarga angka.",
      labelDaftar: "Lima papan pembagian",
      kolom: 1,
      item: [
        { nama: "Bagi rata", singkat: "Isi tiap kelompok", uraian: "20 ÷ 4 = 5. 35 ÷ 5 = 7. 54 ÷ 6 = 9.", contoh: "Pembagi adalah jumlah kelompok." },
        { nama: "Pengurangan berulang", singkat: "Hitung langkah", uraian: "24 ÷ 8 = 3. 30 ÷ 6 = 5. 28 ÷ 7 = 4.", contoh: "Kurangi sampai habis." },
        { nama: "Tanpa sisa", singkat: "Habis terbagi", uraian: "36 ÷ 9 = 4 karena 9 × 4 = 36. 64 ÷ 8 = 8.", contoh: "Hasil bagi kali pembagi kembali ke bilangan semula." },
        { nama: "Dengan sisa", singkat: "Sisa lebih kecil", uraian: "26 ÷ 5 = 5 sisa 1. 22 ÷ 4 = 5 sisa 2. 31 ÷ 6 = 5 sisa 1.", contoh: "Cari yang paling dekat tanpa melebihi." },
        { nama: "Keluarga angka", singkat: "Dua pembagian", uraian: "6 × 7 = 42 menghasilkan 42 ÷ 6 = 7 dan 42 ÷ 7 = 6.", contoh: "Satu perkalian, dua pembagian." },
      ],
      kuis: [
        { pertanyaan: "35 buku dibagi 5 rak. Berapa buku tiap rak?", alias: ["tujuh", "7"] },
        { pertanyaan: "Berapa 54 ÷ 6?", alias: ["9"] },
        { pertanyaan: "30 dikurangi 6 sampai habis. Berapa kali, dan berapa 30 ÷ 6?", alias: ["lima kali", "5"] },
        { pertanyaan: "Hitung 28 ÷ 7 dengan pengurangan berulang.", alias: ["21", "14", "4"] },
        { pertanyaan: "Berapa 42 ÷ 6?", alias: ["tujuh", "7"] },
        { pertanyaan: "Hitung 64 ÷ 8 dan periksa.", alias: ["8", "64"] },
        { pertanyaan: "22 dibagi 4. Berapa sisanya?", alias: ["dua", "2"] },
        { pertanyaan: "Hitung 31 ÷ 6.", alias: ["5", "1", "sisa"] },
        { pertanyaan: "9 × 4 = 36. Berapa 36 ÷ 4?", alias: ["sembilan", "9"] },
        { pertanyaan: "Lengkapi 7 × 8, 56 ÷ 7, dan 56 ÷ 8.", alias: ["56", "8", "7"] },
        { pertanyaan: "Manakah yang hasilnya 7?", alias: ["63"] },
        { pertanyaan: "Pasangkan perkalian dengan pembagiannya.", alias: ["48", "45", "42"] },
        { pertanyaan: "Urutkan hasil 3, 5, 8, dan 9.", alias: ["3", "5", "8", "9"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "8 × 4 = 32 dan 32 ÷ 4 = 8. Angka berapa?", alias: ["32"] },
      ],
      voice: [[
        "Pembagian membagi rata. Tanda pembagian adalah titik dua.",
        "Kurangi sampai habis, lalu hitung berapa kali. Habis terbagi diperiksa dengan perkalian.",
        "Sisa selalu lebih kecil dari pembagi. Satu perkalian menghasilkan dua pembagian.",
      ]],
    },
    {
      kode: "C",
      judul: "C. Pesta Wortel Kelinci Putih",
      pengantar: "Siswa menjadi petugas pesta. Sepuluh pos selesai, sepuluh wortel terkumpul.",
      labelDaftar: "Sepuluh pos pesta",
      kolom: 1,
      item: [
        {
          nama: "Meja pesta",
          singkat: "Bagi, sisa, periksa",
          uraian: "Level 1: 24 ÷ 6 = 4. Level 2: 35 ÷ 7 = 5. Level 3: 6 × 9 = 54. Level 4: 38 ÷ 5 = 7 sisa 3. Level 5: 72 ÷ 8 = 9, lalu 9 + 3 = 12.",
          contoh: "Salah membagi tidak mengurangi wortel. Coba lagi.",
        },
      ],
      kuis: [
        ...kuisDariMisi(MISI_MTK3_PEMBAGIAN),
        { pertanyaan: "42 wortel dan 7 kantong. Berapa isi tiap kantong?", alias: ["6"] },
        { pertanyaan: "40 dikurangi 8 sampai habis. Berapa kali?", alias: ["5"] },
        { pertanyaan: "Pasangkan pembagian dengan pemeriksaannya.", alias: ["63", "42", "28"] },
        { pertanyaan: "Urutkan 36 ÷ 9, 45 ÷ 9, 56 ÷ 8, dan 72 ÷ 8.", alias: ["4", "5", "7", "9"] },
        { pertanyaan: "Periksa tiga pernyataan pesta.", alias: ["benar", "salah"] },
        { pertanyaan: "Mana yang benar untuk 50 ÷ 6?", alias: ["8 sisa 2"] },
        { pertanyaan: "Kalau 5 × 8 = 40, mana pembagian yang benar?", alias: ["40 bagi 8"] },
        { pertanyaan: "Deret naik 2: 2, 4, 6, berikutnya?", alias: ["8"] },
        { pertanyaan: "63 wortel dibagi 9 kantong. Sebutkan isi tiap kantong.", alias: ["tujuh", "7"] },
        { pertanyaan: "72 ÷ 8, lalu tambah 3. Tulis dua hasil.", alias: ["9", "12"] },
      ],
      voice: [[
        "Kalian menjadi petugas pesta di kebun wortel. Setiap tamu mendapat bagian yang sama.",
        "Kalau ada sisa, kumpulkan untuk cadangan. Periksa hasilnya dengan perkalian.",
        "Sepuluh pos selesai, sepuluh wortel terkumpul, pesta kebun besar terbuka.",
      ]],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal pembagian rata, pembagian bersisa, dan keluarga angka.",
      labelDaftar: "Lembar evaluasi pembagian",
      kolom: 1,
      item: [
        { nama: "Periksa hasil", singkat: "Kali balik", uraian: "56 ÷ 7 = 8 karena 7 × 8 = 56. 37 ÷ 5 = 7 sisa 2.", contoh: "Sisa harus lebih kecil dari pembagi." },
        { nama: "Pesta 85 wortel", singkat: "Tiga langkah", uraian: "85 ÷ 9 = 9 sisa 4. Satu kantong menjadi 13.", contoh: "Bagi dulu, cari sisa, lalu tambahkan." },
      ],
      kuis: [
        { pertanyaan: "Hitung 56 ÷ 7 dan periksa.", alias: ["8", "56"] },
        { pertanyaan: "Manakah yang benar untuk 40 ÷ 6?", alias: ["6 sisa 4"] },
        { pertanyaan: "Ucapkan 72 ÷ 8 = 9.", alias: ["tujuh puluh dua bagi delapan"] },
        { pertanyaan: "Apakah 63 ÷ 9 = 7 dan 63 ÷ 7 = 9 benar?", alias: ["benar"] },
        { pertanyaan: "Pasangkan 32 ÷ 4, 54 ÷ 6, dan 45 ÷ 5.", alias: ["32", "54", "45"] },
        { pertanyaan: "Hitung 37 ÷ 5.", alias: ["7", "2", "sisa"] },
        { pertanyaan: "⬜ ÷ 8 = 6. Bilangan yang dibagi?", alias: ["48"] },
        { pertanyaan: "Urutkan hasil 3, 5, 8, dan 9.", alias: ["3", "5", "8", "9"] },
        { pertanyaan: "29 ÷ 4 = 7 sisa 1. Apakah sisa ini boleh?", alias: ["boleh", "kecil"] },
        { pertanyaan: "85 wortel dibagi 9 kantong. Tulis isi, sisa, dan isi satu kantong setelah sisa ditambahkan.", alias: ["9", "4", "13"] },
      ],
      voice: [[
        "Saatnya kalian mengerjakan sendiri. Ada sepuluh soal pembagian.",
        "Periksa hasilmu dengan perkalian, dan pastikan sisanya lebih kecil dari pembagi.",
        "Jangan terburu-buru, dan periksa lagi jawabanmu.",
      ]],
    },
  ],
};
