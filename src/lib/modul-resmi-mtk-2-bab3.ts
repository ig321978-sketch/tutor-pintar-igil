import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK2_BAB3 = "Bab 3: Fondasi Perkalian Dasar";

export const MODUL_MTK2_BAB3: ModulResmiPai = {
  id: "mtk-2-bab3",
  judul: JUDUL_MTK2_BAB3,
  pola:
    /fondasi perkalian|penjumlahan berulang|kotak x isi|waktu dan durasi|pengukuran waktu dan uang/,
  motivasi:
    "Perkalian = penjumlahan berulang. 3 x 2 artinya 2 + 2 + 2. Kotak dulu, baru isi. Kali 0 hasilnya 0.",
  kunciJawaban: "B,B,S,B,B,A,C,B,A,B",
  sketsaKartu: [
    "Anak menghitung 3 piring berisi 2 donat menjadi 3 x 2.",
    "Anak mengubah 4 x 3 menjadi 3 + 3 + 3 + 3.",
    "Anak mengerjakan evaluasi perkalian dan penjumlahan berulang.",
    "Anak menarik garis 2x6, menggeser hasil 12 atau 10, mengurutkan 2x3-3x3-4x3, dan menulis 20.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
5 + 5 + 5 + 5 ditulis perkalian...
A) 5 x 5
B) 4 x 5
C) 5 x 4 wajib saja
D) 9 x 1`,
    `[Soal 2 - PG - Tipe: HOTS]
4 x 3 dalam penjumlahan berulang adalah...
A) 4 + 3
B) 3 + 3 + 3 + 3
C) 4 + 4 + 4 + 4 + 4
D) 12 + 12`,
    `[Soal 3 - PG - Tipe: HOTS]
5 x 1 artinya 5 + 5 + 5 + 5 + 5. Pernyataan ini...
A) Benar.
B) Salah; 5 x 1 = 1 + 1 + 1 + 1 + 1.
C) Benar karena hasilnya 5.
D) Perkalian tidak punya arti.`,
    `[Soal 4 - PG - Tipe: HOTS]
Setiap bilangan dikalikan 0 hasilnya 0. Pernyataan ini...
A) Salah.
B) Benar; kotak tanpa isi tetap nol.
C) Benar hanya 1 x 0.
D) Hasilnya 1.`,
    `[Soal 5 - PG - Tipe: Reguler]
3 piring, tiap piring 2 donat. Perkaliannya...
A) 2 x 3 wajib saja
B) 3 x 2 = 6
C) 5 x 1
D) 3 + 2`,
    `[Soal 6 - PG - Tipe: Reguler]
2 x 6 sama dengan...
A) 6 + 6
B) 2 + 2 + 2 + 2 + 2 + 2 + 2
C) 12 + 2
D) 6 x 6`,
    `[Soal 7 - PG - Tipe: Reguler]
5 kucing, tiap kucing 4 kaki. Jumlah kaki...
A) 9
B) 16
C) 20
D) 4`,
    `[Soal 8 - PG - Tipe: Reguler]
Hasil 3 x 4 dan 4 x 3 adalah...
A) Beda 12 dan 7
B) Sama 12, arti susunannya beda
C) 0
D) 34`,
    `[Soal 9 - PG - Tipe: HOTS]
Mengapa rumusnya kotak dikali isi, bukan sebaliknya?
A) Supaya kita tahu berapa wadah dan berapa benda di tiap wadah.
B) Supaya hasil selalu 0.
C) Supaya tidak perlu menjumlah.
D) Supaya lingkaran jadi segitiga.`,
    `[Soal 10 - PG - Tipe: Reguler]
Urutan hasil dari kecil: 3x3, 2x3, 4x3 adalah...
A) 4x3, 3x3, 2x3
B) 2x3, 3x3, 4x3
C) 3x3, 4x3, 2x3
D) Semuanya 9`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Arti Simbol Perkalian",
      pengantar:
        "Infografis logika perkalian: kotak dikali isi. 3 piring berisi 2 donat = 2+2+2 = 3 x 2 = 6. Hasil 2 x 3 sama, arti susunannya beda.",
      labelDaftar: "Kotak, isi, penjumlahan berulang",
      kolom: 1,
      item: [
        {
          nama: "Penjumlahan berulang",
          singkat: "Jalan pintas hitung sama",
          uraian:
            "Perkalian adalah jalan pintas menjumlahkan benda yang jumlahnya sama berulang-ulang. 5+5+5+5 = 4 x 5.",
          contoh: "4 x 5 = 5+5+5+5.",
        },
        {
          nama: "Kotak dikali isi",
          singkat: "Wadah dulu, benda kemudian",
          uraian:
            "Kotak = piring, kantong, atau wadah. Isi = banyak benda di dalamnya. 3 piring, tiap piring 2 donat: 3 x 2 = 2+2+2 = 6.",
          contoh: "3 x 2 = 6 donat.",
        },
        {
          nama: "Hasil sama, arti beda",
          singkat: "3 x 2 dan 2 x 3",
          uraian:
            "3 x 2 = 2+2+2. 2 x 3 = 3+3. Hasilnya sama 6, tetapi susunan bendanya berbeda. Tulis sesuai cerita.",
          contoh: "3 x 2 ≠ arti 2 x 3, hasil sama.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Jika ada penjumlahan berulang 5 + 5 + 5 + 5, bagaimana menulisnya dalam bentuk perkalian yang tepat?",
          alias: ["4 x 5", "4 kali 5", "empat kali lima"],
        },
      ],
      kuisTulis: {
        pertanyaan: "Ubah 4 x 3 menjadi penjumlahan berulang.",
        alias: ["3 + 3 + 3 + 3", "3+3+3+3"],
      },
      voice: [
        [
          "Anak-anak kelas 2 yang hebat, perkalian itu jalan pintas menjumlahkan benda yang jumlahnya sama berulang-ulang.",
          "Rumus sakti: kotak dikali isi. Kotak adalah wadahnya. Isi adalah benda di dalamnya. Tiga piring, tiap piring dua donat: 2 + 2 + 2. Kita tulis 3 dikali 2 sama dengan 6.",
          "Ingat wadahnya dulu, baru isinya!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Hasil 12, Hasil 10, dan Kali Nol",
      pengantar:
        "Infografis hasil sama: 3x4 dan 4x3 = 12. 2x5 dan 5x2 = 10. Kali 1 artinya isi satu. Kali 0 artinya tidak ada isi.",
      labelDaftar: "Hasil 12, hasil 10, kali 0 dan 1",
      kolom: 1,
      item: [
        {
          nama: "Keluarga 12 dan 10",
          singkat: "Pasangan yang hasilnya sama",
          uraian:
            "3 x 4 = 4+4+4 = 12. 4 x 3 = 3+3+3+3 = 12. 2 x 5 = 5+5 = 10. 5 x 2 = 2+2+2+2+2 = 10.",
          contoh: "3 x 4 = 12. 2 x 5 = 10.",
        },
        {
          nama: "Kali satu",
          singkat: "Isi satu di tiap kotak",
          uraian:
            "5 x 1 artinya lima kotak, tiap kotak isinya 1: 1+1+1+1+1. Bukan 5+5+5+5+5. Hasilnya 5, maknanya berbeda.",
          contoh: "5 x 1 = 1+1+1+1+1.",
        },
        {
          nama: "Kali nol",
          singkat: "Tidak ada isi",
          uraian:
            "Berapa pun kotaknya, jika isinya 0, total benda tetap 0. 7 x 0 = 0. 0 x 4 = 0. Lima kucing kali 4 kaki = 20.",
          contoh: "5 x 4 = 20 kaki.",
        },
      ],
      kuis: [
        {
          pertanyaan: "5 x 1 ditulis penjumlahan berulang bagaimana?",
          alias: ["1 + 1 + 1 + 1 + 1", "satu"],
        },
      ],
      kuisTulis: {
        pertanyaan: "5 kucing, tiap kucing 4 kaki. Jumlah seluruh kaki adalah...",
        alias: ["20"],
      },
      voice: [
        [
          "Beberapa perkalian punya hasil sama. 3 kali 4 dan 4 kali 3 sama-sama 12, tetapi ceritanya beda.",
          "5 kali 1 bukan lima ditambah lima berkali-kali. Isinya satu, diulang lima kali.",
          "Kalau dikali nol, kotaknya kosong. Tidak ada benda. Hasilnya selalu nol. Lima kucing, empat kaki: dua puluh.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih 4x5 dari 5+5+5+5 dan 3+3+3+3 dari 4x3, tentukan benar-salah 5x1 serta kali 0, jodohkan 2x6 3x4 4x2, lalu jelaskan rumus kotak kali isi.",
      labelDaftar: "Pilihan, benar-salah, mencocokkan, dan esai",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A dan B",
          singkat: "Ubah bentuk",
          uraian:
            "5+5+5+5 = 4x5. 4x3 = 3+3+3+3. 5x1 bukan 5+5+5+5+5. Kali 0 hasilnya 0.",
          contoh: "4x5. 3+3+3+3. 0.",
        },
        {
          nama: "Kelompok C dan D",
          singkat: "Pasangan dan kaki",
          uraian:
            "2x6=6+6. 3x4=4+4+4. 4x2=2+2+2+2. 5x4=20. Urutan hasil: 6, 9, 12.",
          contoh: "6+6. 20 kaki.",
        },
      ],
      kuis: [
        { pertanyaan: "5+5+5+5 perkalian?", alias: ["4 x 5", "4"] },
        { pertanyaan: "4x3 penjumlahan?", alias: ["3 + 3 + 3 + 3"] },
        { pertanyaan: "5x1 = 5+5+5+5+5?", alias: ["salah"] },
        { pertanyaan: "Kali 0 hasil 0?", alias: ["benar"] },
        { pertanyaan: "3 piring 2 donat?", alias: ["3 x 2", "6"] },
        { pertanyaan: "Mengapa kotak dulu?", alias: ["wadah", "isi", "cerita"] },
      ],
      voice: [
        ["4 kali 5 artinya lima dijumlah empat kali."],
        ["Kali nol hasilnya nol. Tulis sesuai wadah dan isi."],
      ],
    },
    {
      kode: "D",
      judul: "D. Kartu Evaluasi Ekstra",
      pengantar:
        "Tanpa keyboard. Tarik garis 2x6, 3x4, 4x2, geser ke keranjang 12 atau 10, urutkan 2x3-3x3-4x3, coretkan 2 pada 20, lalu tekan BENAR atau SALAH.",
      labelDaftar: "Tarik garis, keranjang, urutan, kanvas, detektif",
      kolom: 1,
      item: [
        {
          nama: "Permainan A sampai C",
          singkat: "Garis, keranjang, urutan",
          uraian:
            "2x6=6+6. 3x4=4+4+4. 4x2=2+2+2+2. Hasil 12: 3x4, 4x3. Hasil 10: 2x5, 5x2. Urutan: 2x3=6, 3x3=9, 4x3=12.",
          contoh: "6+6. 12. 2x3 dulu.",
        },
        {
          nama: "Permainan D dan E",
          singkat: "Kanvas dan detektif",
          uraian:
            "5x4=20, coretkan 2. 5x1 bukan 5+5+5+5+5. Kali 0 hasilnya 0.",
          contoh: "Coretkan 2. SALAH lalu BENAR.",
        },
      ],
      kuis: [
        { pertanyaan: "Tarik garis perkalian?", alias: ["6 + 6", "4 + 4 + 4"] },
        { pertanyaan: "Keranjang 12 atau 10?", alias: ["3 x 4", "2 x 5"] },
        { pertanyaan: "Urutan 6 9 12?", alias: ["2 x 3", "3 x 3", "4 x 3"] },
        { pertanyaan: "5x1 = lima ditambah lima?", alias: ["salah"] },
        { pertanyaan: "Kali 0 hasil 0?", alias: ["benar"] },
      ],
      kuisTulis: {
        pertanyaan: "Coretkan angka depan __ - 0 dari jumlah kaki 5 x 4.",
        alias: ["20", "2"],
      },
      voice: [
        [
          "Tanpa keyboard. Tarik garis 2x6 ke 6+6, 3x4 ke 4+4+4, 4x2 ke 2+2+2+2. Geser 3x4 ke hasil 12, 2x5 ke hasil 10.",
          "Urutkan 2x3, 3x3, 4x3. Coretkan 2 untuk dua puluh kaki kucing.",
          "Detektif: 5x1 bukan lima ditambah lima. Kali nol selalu nol.",
        ],
      ],
    },
  ],
};
