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
    "Nisa, Farhan, dan Cinta belajar membagi es lilin sama banyak bersama burung hantu Igil di lapangan sekolah.",
  kunciJawaban: "B,B,A,A,C,B,B,B,C,C",
  sketsaKartu: [
    "Nisa, Farhan, dan Cinta membagi es lilin bersama burung hantu Igil.",
    "Sama banyak, pengurangan berulang, tanpa sisa, dengan sisa, dan keluarga perkalian.",
    "Sepuluh pos pola di lapangan sekolah.",
    "Poin penting dan lembar evaluasi pembagian.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
18 es lilin dibagi ke 6 gelas. Isi tiap gelas...
A) 2
B) 3
C) 4
D) 6`,
    `[Soal 2 - PG - Tipe: MOTS]
24 dikurangi 6 terus sampai habis. Pengurangannya...
A) 3 kali
B) 4 kali
C) 5 kali
D) 6 kali`,
    `[Soal 3 - PG - Tipe: HOTS]
27 ÷ 4 sama dengan...
A) 6 sisa 3
B) 5 sisa 7
C) 7 sisa 1
D) 6 sisa 4`,
    `[Soal 4 - PG - Tipe: HOTS]
8 × 6 = 48. Kalimat bagi yang benar...
A) 48 ÷ 8 = 6 dan 48 ÷ 6 = 8
B) 48 ÷ 8 = 8 saja
C) 8 ÷ 6 = 48
D) 6 ÷ 8 = 48`,
    `[Soal 5 - PG - Tipe: HOTS]
⬜ ÷ 7 = 8. Angka yang hilang...
A) 48
B) 49
C) 56
D) 64`,
    `[Soal 6 - PG - Tipe: MOTS]
9 × 5 = 45. Maka 45 ÷ 9 sama dengan...
A) 4
B) 5
C) 6
D) 9`,
    `[Soal 7 - PG - Tipe: MOTS]
Manakah yang hasilnya 4?
A) 24 ÷ 4
B) 32 ÷ 8
C) 36 ÷ 6
D) 28 ÷ 4`,
    `[Soal 8 - PG - Tipe: MOTS]
Deret naik 3: 4 – 7 – 10 – ⬜. Berikutnya...
A) 11
B) 13
C) 14
D) 16`,
    `[Soal 9 - PG - Tipe: MOTS]
42 es lilin dibagi ke 7 gelas. Isi tiap gelas...
A) 4
B) 5
C) 6
D) 7`,
    `[Soal 10 - PG - Tipe: HOTS]
Ada 38 es lilin. Tiap kantong diisi 6. Satu kantong mendapat sisanya juga. Isi kantong itu...
A) 6
B) 7
C) 8
D) 9`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar: "Nisa, Farhan, Cinta, dan Igil membagi es lilin di lapangan sekolah.",
      labelDaftar: "Lima adegan stan es lilin",
      kolom: 1,
      item: [
        {
          nama: "Pembagian sama banyak",
          singkat: "Bagian rata",
          uraian: "12 es lilin untuk 4 teman: 12 ÷ 4 = 3.",
          contoh: "Jumlah benda dibagi jumlah penerima.",
        },
        {
          nama: "Pengurangan berulang",
          singkat: "Kurangi sampai habis",
          uraian: "20 − 4 sebanyak 5 kali. 20 ÷ 4 = 5.",
          contoh: "Banyak kurangan adalah hasil bagi.",
        },
        {
          nama: "Pembagian tanpa sisa",
          singkat: "Habis",
          uraian: "24 ÷ 8 = 3 karena 8 × 3 = 24. Sisanya 0.",
          contoh: "Cek dengan perkalian.",
        },
        {
          nama: "Pembagian dengan sisa",
          singkat: "Ada yang tertinggal",
          uraian: "17 ÷ 5 = 3 sisa 2. 5 × 3 = 15, lalu 17 − 15 = 2.",
          contoh: "Sisa lebih kecil dari pembagi.",
        },
        {
          nama: "Hubungan perkalian",
          singkat: "Satu keluarga",
          uraian: "7 × 6 = 42, maka 42 ÷ 7 = 6 dan 42 ÷ 6 = 7.",
          contoh: "Satu perkalian dibalik jadi dua pembagian.",
        },
      ],
      kuis: [
        { pertanyaan: "15 es lilin untuk 5 teman. Ucapkan bentuk baginya dan hasilnya.", alias: ["3"] },
        { pertanyaan: "18 es lilin untuk 6 gelas. Tulis kalimat baginya.", alias: ["3"] },
        { pertanyaan: "18 dikurangi 6 terus sampai habis. Ucapkan berapa kali.", alias: ["3"] },
        { pertanyaan: "24 dikurangi 8 sampai habis. Tulis kalimat baginya.", alias: ["3"] },
        { pertanyaan: "36 ÷ 9. Ucapkan hasilnya, lalu habis atau ada sisa.", alias: ["4", "habis"] },
        { pertanyaan: "Tulis 28 ÷ 7.", alias: ["4"] },
        { pertanyaan: "23 ÷ 4. Ucapkan hasilnya dan sisanya.", alias: ["5", "3"] },
        { pertanyaan: "Tulis hasil dan sisa 19 ÷ 6.", alias: ["3", "1"] },
        { pertanyaan: "8 × 5 = 40. Ucapkan satu kalimat baginya.", alias: ["5"] },
        { pertanyaan: "Tulis dua kalimat bagi dari 9 × 4 = 36.", alias: ["4", "9"] },
        { pertanyaan: "18 es lilin dibagi ke 3 kotak.", alias: ["6"] },
        { pertanyaan: "Pasangkan 16 ÷ 4, 21 ÷ 7, 27 ÷ 3, dan 35 ÷ 5.", alias: ["4", "3", "9", "7"] },
        { pertanyaan: "Susun hasil 3, 6, 7, dan 9.", alias: ["3", "6", "7", "9"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "Mana yang hasilnya bukan 5?", alias: ["4"] },
      ],
      voice: [
        [
          "Hari Jumat di lapangan sekolah. Stan es lilin Igil ramai.",
          "Pembagian membuat bagian yang sama. Kadang habis, kadang ada sisa.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis",
      pengantar: "Papan stan: contoh, cara, dan hasil bagi.",
      labelDaftar: "Lima papan pembagian",
      kolom: 1,
      item: [
        {
          nama: "Sama banyak",
          singkat: "Bagi jumlah wadah",
          uraian: "20 ÷ 4 = 5. Tiap gelas berisi 5.",
          contoh: "Jumlah benda dibagi jumlah wadah.",
        },
        {
          nama: "Pengurangan berulang",
          singkat: "Sampai nol",
          uraian: "15 − 5 sebanyak 3 kali. 15 ÷ 5 = 3.",
          contoh: "Hitung berapa kali sampai habis.",
        },
        {
          nama: "Tanpa sisa",
          singkat: "Sisa nol",
          uraian: "32 ÷ 8 = 4 karena 8 × 4 = 32.",
          contoh: "Habis berarti tidak ada sisa.",
        },
        {
          nama: "Dengan sisa",
          singkat: "Selisihnya",
          uraian: "26 ÷ 4 = 6 sisa 2. 4 × 6 = 24, lalu 26 − 24 = 2.",
          contoh: "Sisa lebih kecil dari pembagi.",
        },
        {
          nama: "Keluarga angka",
          singkat: "Balik perkalian",
          uraian: "6 × 8 = 48, maka 48 ÷ 6 = 8 dan 48 ÷ 8 = 6.",
          contoh: "Tiga bilangan itu satu keluarga.",
        },
      ],
      kuis: [
        { pertanyaan: "14 es lilin untuk 2 gelas. Ucapkan bentuk baginya dan hasilnya.", alias: ["7"] },
        { pertanyaan: "Tulis 27 ÷ 9.", alias: ["3"] },
        { pertanyaan: "16 dikurangi 4 terus sampai habis. Ucapkan berapa kali.", alias: ["4"] },
        { pertanyaan: "21 dikurangi 7 sampai habis. Tulis kalimat baginya.", alias: ["3"] },
        { pertanyaan: "45 ÷ 9. Ucapkan hasilnya, lalu habis atau ada sisa.", alias: ["5", "habis"] },
        { pertanyaan: "Tulis 54 ÷ 6.", alias: ["9"] },
        { pertanyaan: "31 ÷ 7. Ucapkan hasilnya dan sisanya.", alias: ["4", "3"] },
        { pertanyaan: "Tulis hasil dan sisa 22 ÷ 5.", alias: ["4", "2"] },
        { pertanyaan: "7 × 4 = 28. Ucapkan satu kalimat baginya.", alias: ["4"] },
        { pertanyaan: "Tulis dua kalimat bagi dari 5 × 9 = 45.", alias: ["9", "5"] },
        { pertanyaan: "34 ÷ 5 sama dengan?", alias: ["6 sisa 4"] },
        { pertanyaan: "Pasangkan 42 ÷ 7, 36 ÷ 9, 56 ÷ 8, dan 81 ÷ 9.", alias: ["6", "4", "7", "9"] },
        { pertanyaan: "Susun hasil 2, 4, 5, dan 8.", alias: ["2", "4", "5", "8"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "4 × 6 = 24. Maka 24 ÷ 6 sama dengan?", alias: ["4"] },
      ],
      voice: [
        [
          "Papan ini merangkum cara bagi. Jumlah benda dibagi jumlah penerima.",
          "Kalau habis, sisanya nol. Kalau tidak, sisanya harus lebih kecil dari pembagi.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Pos Es Lilin Igil",
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
      kuis: kuisDariMisi(MISI_MTK3_PEMBAGIAN),
      voice: [
        [
          "Sepuluh soal pola. Cari angka berikutnya, angka yang hilang, atau yang beda.",
          "Pilih satu pos, lalu jawab. Sepuluh stempel membuka stan es lilin.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal pembagian, sisa, dan hubungan dengan perkalian.",
      labelDaftar: "Lembar evaluasi pembagian",
      kolom: 1,
      item: [
        {
          nama: "Habis dan sisa",
          singkat: "Cek dulu",
          uraian: "21 ÷ 3 = 7. 26 ÷ 4 = 6 sisa 2. 29 ÷ 6 = 4 sisa 5.",
          contoh: "Sisa harus lebih kecil dari pembagi.",
        },
        {
          nama: "Tiga kotak",
          singkat: "Bandingkan",
          uraian: "Kotak A 9, kotak B 5, kotak C 7. Kotak A paling banyak.",
          contoh: "Bagi tiap kotak, lalu cari yang terbesar.",
        },
      ],
      kuis: [
        { pertanyaan: "21 es lilin untuk 3 gelas. Tulis kalimat baginya.", alias: ["7"] },
        { pertanyaan: "26 ÷ 4 sama dengan?", alias: ["6 sisa 2"] },
        { pertanyaan: "32 ÷ 8. Ucapkan hasilnya, lalu habis atau ada sisa.", alias: ["4", "habis"] },
        { pertanyaan: "Mana yang ada sisanya?", alias: ["25"] },
        { pertanyaan: "Pasangkan 45 ÷ 9, 56 ÷ 7, 63 ÷ 9, dan 72 ÷ 8.", alias: ["5", "8", "7", "9"] },
        { pertanyaan: "Tulis hasil dan sisa 29 ÷ 6.", alias: ["4", "5"] },
        { pertanyaan: "Susun hasil 3, 6, 7, dan 8.", alias: ["3", "6", "7", "8"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "9 × 6 = 54. Ucapkan satu kalimat baginya.", alias: ["6"] },
        { pertanyaan: "Kotak mana yang paling banyak?", alias: ["kotak a", "9"] },
      ],
      voice: [
        [
          "Saatnya kalian mengerjakan sendiri. Ada sepuluh soal pembagian.",
          "Ada yang habis, ada yang bersisa, dan ada yang dibalik dari perkalian.",
          "Kalau ragu, cek dengan perkalian. Periksa lagi jawabanmu.",
        ],
      ],
    },
  ],
};
