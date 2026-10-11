import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK2_BAB2 = "Bab 2: Penjumlahan dan Pengurangan Bersusun";

export const MODUL_MTK2_BAB2: ModulResmiPai = {
  id: "mtk-2-bab2",
  judul: JUDUL_MTK2_BAB2,
  pola:
    /penjumlahan dan pengurangan bersusun|pesta permen sani|hitung bersusun trik kantong|cara berhitung|operasi hitung/,
  motivasi:
    "Hore! Kamu sudah membantu Sani di pesta permen. Sejajarkan kantong dengan kantong, eceran dengan eceran. Hitung dari kanan dulu.",
  kunciJawaban: "B,B,A,B,A,A,A,B,A,A",
  sketsaKartu: [
    "Sani membawa 2 kantong dan 4 permen eceran, lalu Adi menambah 1 kantong dan 3 eceran.",
    "Sani menjumlahkan 24 + 13 bersusun menjadi 37, lalu mengurangkan 15 untuk Lani.",
    "Anak menjadi kasir toko permen: 42 + 26 dan 58 - 34.",
    "Anak mengisi lembar evaluasi tantangan para juara tentang hitung bersusun.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Siti menulis 35 + 23 bersusun dan mendapat 52. Kesalahan Siti...
A) Siti salah menghitung 3 + 2
B) Siti menghitung dari kolom kiri (kantong) dulu, lalu salah menulis hasil eceran
C) Hasil Siti sudah benar
D) Siti lupa menulis tanda plus`,
    `[Soal 2 - PG - Tipe: HOTS]
Beni memberi 12 permen ke Dayu, sisanya 25. Permen Beni mula-mula...
A) 13
B) 37
C) 38
D) 27`,
    `[Soal 3 - PG - Tipe: HOTS]
Sebuah bilangan ditambah 21 hasilnya 65. Bilangan itu...
A) 44
B) 86
C) 45
D) 54`,
    `[Soal 4 - PG - Tipe: MOTS]
46 permen cokelat ditambah 32 permen stroberi. Jumlah seluruhnya...
A) 74
B) 78
C) 14
D) 68`,
    `[Soal 5 - PG - Tipe: HOTS]
Kotak A: 12 + 34. Kotak B: 98 - 53. Pernyataan yang benar...
A) Hasil Kotak A lebih besar daripada Kotak B
B) Hasil Kotak A lebih kecil daripada Kotak B
C) Hasil Kotak A sama besar dengan Kotak B
D) Kedua kotak tidak bisa dihitung`,
    `[Soal 6 - PG - Tipe: LOTS]
75 dikurangi 41 secara bersusun hasilnya...
A) 34
B) 36
C) 24
D) 44`,
    `[Soal 7 - PG - Tipe: HOTS]
Lani punya 56 permen. Edo diberi 12, Tono diberi 23. Sisa permen Lani...
A) 21
B) 33
C) 44
D) 11`,
    `[Soal 8 - PG - Tipe: HOTS]
Grafik permen Sani: jam 07.00 ada 48, jam 08.00 ada 36, jam 09.00 ada 24. Setiap jam berkurang...
A) 10
B) 12
C) 8
D) 15`,
    `[Soal 9 - PG - Tipe: HOTS]
Bersusun: bintang dan 7, ditambah 2 dan matahari, hasil 89. Nilai bintang dan matahari...
A) 6 dan 2
B) 5 dan 3
C) 8 dan 9
D) 7 dan 2`,
    `[Soal 10 - PG - Tipe: HOTS]
Riko punya 45 permen, beli 14, lalu bungkus tiap 10 ke kantong. Kantong dan sisa eceran...
A) 5 kantong dan 9 eceran
B) 4 kantong dan 9 eceran
C) 5 kantong dan 4 eceran
D) 6 kantong dan 0 eceran`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog Pesta Permen Sani",
      pengantar:
        "🗺️ Sani bawa 2 kantong dan 4 permen eceran ke sekolah. Adi memberi 1 kantong dan 3 eceran lagi.",
      labelDaftar: "Target dan cerita apersepsi",
      kolom: 1,
      item: [
        {
          nama: "🌟 Target belajarku hari ini",
          singkat: "Bersusun pendek",
          uraian:
            "🎯 Aku bisa menjumlahkan dua bilangan dengan cara bersusun pendek. 🎯 Aku bisa mengurangkan dua bilangan dengan cara bersusun pendek.",
          contoh: "Sejajarkan, hitung dari kanan.",
        },
        {
          nama: "🗺️ Berbagi permen dengan teman",
          singkat: "24 + 13 dan 37 - 15",
          uraian:
            "Sani punya 24 permen. Adi menambah 13. Lalu Sani memberi 15 kepada Lani. Bagaimana menghitung total dan sisa dengan cepat?",
          contoh: "Yuk bantu Sani dengan hitung bersusun trik kantong!",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Sani membawa berapa kantong besar ke sekolah?",
          alias: ["2", "dua", "2 kantong"],
        },
        {
          pertanyaan: "2. Adi memberi Sani berapa permen eceran?",
          alias: ["3", "tiga", "3 eceran"],
        },
        {
          pertanyaan: "3. 1 kantong besar berisi berapa permen?",
          alias: ["10", "sepuluh", "10 permen"],
        },
      ],
      voice: [
        [
          "Hari ini pesta permen Sani. Ingat, 1 kantong besar berisi 10 permen. Sani membawa 2 kantong dan 4 permen eceran. Adi memberi 1 kantong dan 3 eceran.",
          "Sani ingin membagi permen kepada Lani. Yuk, kita bantu Sani menghitung dengan hitung bersusun trik kantong!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis Hitung Bersusun",
      pengantar:
        "🛍️ Sejajarkan kantong dengan kantong, eceran dengan eceran. 🍬 Hitung dari kanan dulu, baru ke kiri.",
      labelDaftar: "Penjumlahan dan pengurangan bersusun",
      kolom: 1,
      item: [
        {
          nama: "➕ Penjumlahan bersusun",
          singkat: "24 + 13 = 37",
          uraian:
            "Permen Sani 24. Dari Adi 13. Eceran 4 + 3 = 7. Kantong 2 + 1 = 3. Hasil 37. Dibaca tiga puluh tujuh.",
          contoh: "24 + 13 = 37.",
        },
        {
          nama: "➖ Pengurangan bersusun",
          singkat: "37 - 15 = 22",
          uraian:
            "Total 37. Diberi ke Lani 15. Eceran 7 - 5 = 2. Kantong 3 - 1 = 2. Sisa 22. Dibaca dua puluh dua.",
          contoh: "37 - 15 = 22.",
        },
        {
          nama: "💡 Rahasia sukses",
          singkat: "Dari kanan dulu",
          uraian:
            "Selalu hitung dari kotak paling kanan (permen eceran/satuan), baru bergeser ke kiri (kantong besar/puluhan).",
          contoh: "Kanan dulu, baru kiri.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. 24 ditambah 13 sama dengan berapa?",
          alias: ["37", "tiga puluh tujuh"],
        },
        {
          pertanyaan: "2. 37 dikurangi 15 sama dengan berapa?",
          alias: ["22", "dua puluh dua"],
        },
        {
          pertanyaan: "3. Kita harus mulai menghitung dari sisi mana?",
          alias: ["kanan", "eceran", "satuan", "paling kanan"],
        },
      ],
      voice: [
        [
          "Untuk menjumlahkan, sejajarkan kantong dengan kantong, eceran dengan eceran. Empat ditambah tiga sama dengan tujuh. Dua ditambah satu sama dengan tiga. Hasilnya 37.",
          "Sekarang kurangkan. Tujuh kurang lima sama dengan dua. Tiga kurang satu sama dengan dua. Sisa permen Sani 22.",
        ],
        [
          "Rahasia sukses: selalu hitung dari kotak paling kanan, yaitu permen eceran, baru bergeser ke kiri, yaitu kantong besar. Jangan terbalik!",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Menjadi Kasir Toko Permen",
      pengantar:
        "🕵️‍♂️ Bantu Sani menghitung pesanan. Soal A: 42 + 26. Soal B: 58 - 34. Isi dari kolom eceran dulu.",
      labelDaftar: "Aktivitas terbimbing dan jurnal",
      kolom: 1,
      item: [
        {
          nama: "🕵️‍♂️ Aktivitas 1",
          singkat: "42 + 26 dan 58 - 34",
          uraian:
            "42 + 26: eceran 2 + 6 = 8, kantong 4 + 2 = 6, hasil 68. 58 - 34: eceran 8 - 4 = 4, kantong 5 - 3 = 2, hasil 24.",
          contoh: "68 dan 24.",
        },
        {
          nama: "🎭 Jurnal perasaanku",
          singkat: "Pilih wajah",
          uraian:
            "😀 Mudah sekali, aku langsung bisa! 😐 Butuh latihan sedikit lagi agar teliti. 😢 Masih bingung urutan kanan-kirinya.",
          contoh: "Pilih satu wajah.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. 42 ditambah 26 sama dengan berapa?",
          alias: ["68", "enam puluh delapan"],
        },
        {
          pertanyaan: "2. 58 dikurangi 34 sama dengan berapa?",
          alias: ["24", "dua puluh empat"],
        },
        {
          pertanyaan: "3. Kolom mana yang diisi lebih dulu?",
          alias: ["eceran", "kanan", "satuan", "permen eceran"],
        },
      ],
      voice: [
        [
          "Yuk jadi kasir toko permen. Soal A: 4 kantong dan 2 eceran ditambah 2 kantong dan 6 eceran. Dua tambah enam sama dengan delapan. Empat tambah dua sama dengan enam. Hasil 68.",
          "Soal B: 5 kantong dan 8 eceran dikurangi 3 kantong dan 4 eceran. Delapan kurang empat sama dengan empat. Lima kurang tiga sama dengan dua. Hasil 24.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "📝 Tantangan para juara! Hitung bersusun permen Siti, Beni, Lani, Edo, Tono, dan Riko.",
      labelDaftar: "Evaluasi pilihan ganda dan isian",
      kolom: 1,
      item: [
        {
          nama: "🍓 Bagian A",
          singkat: "Pilihan ganda",
          uraian:
            "Siti salah karena hitung dari kiri. Beni mula-mula 37. Misteri 44. Meja 78. Kotak A 46 lebih besar dari Kotak B 45.",
          contoh: "Siti salah dari kiri. Beni 37.",
        },
        {
          nama: "✏️ Bagian B",
          singkat: "Isian singkat",
          uraian:
            "75 - 41 = 34. Sisa Lani 21. Grafik berkurang 12. Bintang 6 dan matahari 2. Riko 5 kantong dan 9 eceran.",
          contoh: "34, 21, 12.",
        },
      ],
      kuis: [
        { pertanyaan: "1. Kesalahan Siti pada 35 + 23?", alias: ["kiri", "kantong", "eceran"] },
        { pertanyaan: "2. Permen Beni mula-mula jika sisa 25 setelah beri 12?", alias: ["37"] },
        { pertanyaan: "3. Bilangan yang ditambah 21 hasilnya 65?", alias: ["44"] },
        { pertanyaan: "4. 46 ditambah 32?", alias: ["78"] },
        { pertanyaan: "5. 12 + 34 dibanding 98 - 53?", alias: ["lebih besar", "besar", "a"] },
        { pertanyaan: "6. 75 dikurangi 41?", alias: ["34"] },
        { pertanyaan: "7. Sisa permen Lani setelah beri Edo 12 dan Tono 23?", alias: ["21"] },
        { pertanyaan: "8. Setiap jam permen Sani berkurang berapa?", alias: ["12", "dua belas"] },
        { pertanyaan: "9. Nilai bintang pada 🌟7 + 2☀️ = 89?", alias: ["6"] },
        { pertanyaan: "10. 45 + 14 jadi berapa kantong besar?", alias: ["5", "lima"] },
      ],
      voice: [
        [
          "Ini lembar evaluasi tantangan para juara. Siti salah karena menghitung dari kiri. Beni mula-mula 37. Bilangan misteri 44. Empat puluh enam ditambah tiga puluh dua sama dengan 78.",
          "Dua belas ditambah tiga puluh empat sama dengan 46. Sembilan puluh delapan kurang lima puluh tiga sama dengan 45. Jadi kotak A lebih besar.",
        ],
        [
          "Tujuh puluh lima kurang empat puluh satu sama dengan 34. Sisa Lani 21. Grafik berkurang 12 setiap jam. Bintang 6, matahari 2. Riko membuat 5 kantong, sisa 9 eceran.",
        ],
      ],
    },
  ],
};
