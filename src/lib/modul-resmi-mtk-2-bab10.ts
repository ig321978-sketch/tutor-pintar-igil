import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK2_BAB10 = "Bab 10: Perkalian";

export const MODUL_MTK2_BAB10: ModulResmiPai = {
  id: "mtk-2-bab10",
  judul: JUDUL_MTK2_BAB10,
  pola:
    /pesanan besar sani|perkalian lanjutan|perkalian belasan|bab 10: perkalian|perkalian bersusun pendek/,
  motivasi:
    "Hore! Kamu sudah membantu Sani menghitung pesanan besar. Tulis 12 × 4 bersusun. Kalikan dari kanan dulu: 4 × 2 = 8, lalu 4 × 1 = 4. Hasilnya 48.",
  kunciJawaban: "B,B,A,A,C,A,A,A,A,A",
  sketsaKartu: [
    "Ibu Guru memesan 4 kotak, setiap kotak berisi 12 permen karet.",
    "Sani menghitung 12 × 4 bersusun menjadi 48.",
    "Anak menjadi asisten: 13 × 3 = 39 dan 14 × 2 = 28.",
    "Anak mengisi lembar evaluasi tantangan para juara tentang perkalian belasan.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Edo menulis 13 × 2 bersusun menjadi 25. Udin bilang salah di satuan. Kesalahan Edo...
A) Salah mengalikan 2 × 1 di puluhan
B) Menjumlahkan 3 + 2 di satuan, seharusnya 3 × 2 = 6
C) Hasil Edo sudah benar
D) Salah menulis 13`,
    `[Soal 2 - PG - Tipe: HOTS]
Setiap kotak berisi 11 permen. Total 44. Jumlah kotak...
A) 3
B) 4
C) 5
D) 11`,
    `[Soal 3 - PG - Tipe: HOTS]
14 dikalikan aku hasilnya 28. Aku adalah...
A) 2
B) 4
C) 3
D) 14`,
    `[Soal 4 - PG - Tipe: MOTS]
3 bungkus, tiap bungkus 12 lolipop. Total bersusun...
A) 36
B) 15
C) 32
D) 12`,
    `[Soal 5 - PG - Tipe: HOTS]
Keranjang A 11 × 5. Keranjang B 12 × 4. Pernyataan tepat...
A) A sama banyak dengan B
B) A lebih sedikit daripada B
C) A lebih banyak daripada B
D) Keduanya 0`,
    `[Soal 6 - PG - Tipe: LOTS]
23 × 3 bersusun...
A) 69
B) 26
C) 53
D) 233`,
    `[Soal 7 - PG - Tipe: HOTS]
3 kantong × 13 permen, lalu diberi 10. Sisa...
A) 29
B) 39
C) 23
D) 10`,
    `[Soal 8 - PG - Tipe: HOTS]
(1) 2 kantong isi 14. (2) 2 kantong isi 12. Pasangan...
A) 1B 2A
B) 1A 2B
C) Keduanya A
D) Keduanya B`,
    `[Soal 9 - PG - Tipe: HOTS]
1📦 × 2 = 24. Angka di kotak...
A) 2
B) 4
C) 1
D) 12`,
    `[Soal 10 - PG - Tipe: HOTS]
12 × [?]. Kartu 2 atau 3. Hasil paling besar...
A) 3, karena 36
B) 2, karena 24
C) 2, karena 36
D) 3, karena 24`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog Pesanan untuk Acara Sekolah",
      pengantar:
        "🗺️ Ibu Guru memesan 4 kotak kardus. Setiap kotak berisi 12 permen karet. Sani takut salah jika menjumlahkan 12 + 12 + 12 + 12. Lani punya cara lebih cepat: perkalian susun pendek!",
      labelDaftar: "Target dan cerita apersepsi",
      kolom: 1,
      item: [
        {
          nama: "🌟 Target belajarku hari ini",
          singkat: "Perkalian belasan bersusun",
          uraian:
            "🎯 Aku bisa menghitung perkalian bilangan belasan dengan angka satuan secara cepat. 🎯 Aku bisa menyelesaikan perkalian besar menggunakan metode perkalian bersusun pendek.",
          contoh: "Kalikan dari kanan dulu.",
        },
        {
          nama: "🗺️ Pesanan untuk acara sekolah",
          singkat: "4 kotak × 12 permen",
          uraian:
            "Ibu Guru dari Sekolah Juara memesan banyak permen. 4 kotak, tiap kotak 12 butir. Sani pusing menjumlah berulang. Lani mengajak memakai perkalian susun pendek.",
          contoh: "Yuk bantu Sani menghitung pesanan besar!",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Setiap kotak berisi berapa permen?",
          alias: ["12", "dua belas"],
        },
        {
          pertanyaan: "2. Ibu Guru memesan berapa kotak?",
          alias: ["4", "empat"],
        },
        {
          pertanyaan: "3. Cara cepat yang diajarkan Lani disebut apa?",
          alias: ["perkalian", "bersusun", "susun pendek", "perkalian bersusun"],
        },
      ],
      voice: [
        [
          "Wah, toko permen Sani mendapat pesanan besar. Ibu guru memesan empat kotak. Setiap kotak berisi dua belas permen karet.",
          "Sani takut salah jika menjumlahkan dua belas berulang. Lani bilang, pakai perkalian susun pendek. Yuk kita bantu Sani!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis Perkalian Susun Pendek",
      pengantar:
        "✖️ Bilangan belasan seperti 12, 13, atau 15 terlalu besar untuk jari. Susun puluhan di kiri dan satuan di kanan. Tulis 12 × 4, lalu kalikan dari kanan.",
      labelDaftar: "Dua langkah rahasia bersusun",
      kolom: 1,
      item: [
        {
          nama: "✖️ Rumah puluhan dan satuan",
          singkat: "12 di atas, 4 di bawah",
          uraian:
            "Tulis 12 di atas. Tulis 4 di bawah, sejajar kolom satuan. Angka pengali di bawah berjalan mengunjungi angka di atas, dari kanan ke kiri.",
          contoh: "Jangan terbalik jalurnya.",
        },
        {
          nama: "🥋 Langkah 1 kanan",
          singkat: "4 × 2 = 8",
          uraian:
            "Angka bawah dikalikan satuan atas. 4 × 2 = 8. Tulis 8 di kolom satuan.",
          contoh: "Mulai dari kanan.",
        },
        {
          nama: "🥋 Langkah 2 kiri",
          singkat: "4 × 1 = 4",
          uraian:
            "Angka bawah dikalikan puluhan atas. 4 × 1 = 4. Tulis 4 di kolom puluhan. Hasil 48, empat puluh delapan.",
          contoh: "Total pesanan 48 butir.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. 12 × 4, hasilnya?",
          alias: ["48"],
        },
        {
          pertanyaan: "2. Langkah pertama, 4 dikalikan angka berapa?",
          alias: ["2", "satuan", "kanan"],
        },
        {
          pertanyaan: "3. 4 × 1 di puluhan hasilnya?",
          alias: ["4"],
        },
      ],
      voice: [
        [
          "Tulis dua belas kali empat bersusun. Puluhan di kiri, satuan di kanan. Kalikan dari kanan. Empat kali dua sama dengan delapan.",
          "Lalu empat kali satu sama dengan empat. Hasilnya empat puluh delapan. Itu total permen pesanan ibu guru.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Asisten Pesanan Belasan",
      pengantar:
        "🕵️‍♂️ Bantu Sani menghitung daftar pesanan. Kalikan angka bawah ke kanan atas dulu, baru ke kiri atas. Pesanan A stroberi, pesanan B jeruk.",
      labelDaftar: "Aktivitas terbimbing dan jurnal",
      kolom: 1,
      item: [
        {
          nama: "🕵️‍♂️ Aktivitas 1",
          singkat: "39 dan 28",
          uraian:
            "Pesanan A: 13 × 3 = 39. Pesanan B: 14 × 2 = 28. Hitung satuan dulu, lalu puluhan.",
          contoh: "3 × 3 = 9. 2 × 4 = 8.",
        },
        {
          nama: "🎭 Jurnal perasaanku",
          singkat: "Pilih wajah",
          uraian:
            "😀 Sangat ajaib, perkalian angka besar bisa cepat! 😐 Harus hati-hati agar urutan silang tidak tertukar. 😢 Masih sering tertukar antara menambah dan mengalikan.",
          contoh: "Pilih satu wajah.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Pesanan A: 13 × 3, hasilnya?",
          alias: ["39"],
        },
        {
          pertanyaan: "2. Pesanan B: 14 × 2, hasilnya?",
          alias: ["28"],
        },
        {
          pertanyaan: "3. Kolom mana yang dikalikan lebih dulu?",
          alias: ["kanan", "satuan"],
        },
      ],
      voice: [
        [
          "Yuk jadi asisten Sani. Pesanan stroberi: tiga belas kali tiga sama dengan tiga puluh sembilan.",
          "Pesanan jeruk: empat belas kali dua sama dengan dua puluh delapan. Kalikan dari kanan dulu.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "📝 Tantangan para juara! Kalikan dari kanan, jangan sampai tertukar dengan penjumlahan. Tulis puluhan di kiri dan satuan di kanan.",
      labelDaftar: "Evaluasi pilihan ganda dan isian",
      kolom: 1,
      item: [
        {
          nama: "🍓 Bagian A",
          singkat: "Pilihan ganda",
          uraian:
            "Edo salah, 3 + 2 bukan 3 × 2. Kotak Siti 4. Angka misteri 2. Lolipop Lani 36. Keranjang A 55 lebih banyak dari B 48.",
          contoh: "Kalikan, jangan jumlahkan.",
        },
        {
          nama: "✏️ Bagian B",
          singkat: "Isian singkat",
          uraian:
            "23 × 3 = 69. Sisa Dodi 29. Kisah 1 = B, kisah 2 = A. Kotak rahasia 2. Kartu 3 karena hasilnya 36.",
          contoh: "69. 29. 1B 2A. 2. 3 dan 36.",
        },
      ],
      kuis: [
        { pertanyaan: "1. Kesalahan Edo pada 13 × 2?", alias: ["jumlah", "6"] },
        { pertanyaan: "2. Jumlah kotak Siti jika 11 × kotak = 44?", alias: ["4"] },
        { pertanyaan: "3. 14 dikalikan angka berapa hasilnya 28?", alias: ["2"] },
        { pertanyaan: "4. 12 × 3?", alias: ["36"] },
        { pertanyaan: "5. Keranjang A 11 × 5 dan B 12 × 4, mana lebih banyak?", alias: ["a"] },
        { pertanyaan: "6. 23 × 3?", alias: ["69"] },
        { pertanyaan: "7. Sisa permen Dodi?", alias: ["29"] },
        { pertanyaan: "8. Kisah 1 dan 2, pasangannya?", alias: ["1b"] },
        { pertanyaan: "9. Angka rahasia di kotak?", alias: ["2"] },
        { pertanyaan: "10. Kartu mana untuk hasil paling besar?", alias: ["3"] },
      ],
      voice: [
        [
          "Ini lembar evaluasi tantangan para juara. Edo salah, tiga ditambah dua bukan dikalikan. Kotak Siti empat. Angka misteri dua. Lolipop Lani tiga puluh enam.",
          "Keranjang A lima puluh lima, lebih banyak dari keranjang B empat puluh delapan.",
        ],
        [
          "Dua puluh tiga kali tiga sama dengan enam puluh sembilan. Sisa Dodi dua puluh sembilan. Kisah satu empat belas kali dua, kisah dua dua belas kali dua. Kotak rahasia dua. Pilih kartu tiga karena hasilnya tiga puluh enam.",
        ],
      ],
    },
  ],
};
