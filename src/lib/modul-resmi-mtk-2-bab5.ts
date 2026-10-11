import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK2_BAB5 = "Bab 5: Fondasi Pembagian Dasar";

export const MODUL_MTK2_BAB5: ModulResmiPai = {
  id: "mtk-2-bab5",
  judul: JUDUL_MTK2_BAB5,
  pola:
    /fondasi pembagian|berbagi adil|bagi adil|pengurangan berulang sampai habis|pengurangan bersusun|data sederhana/,
  motivasi:
    "Hore! Kamu sudah membantu Sani berbagi adil. 12 ÷ 3 = 4 karena 12 - 3 - 3 - 3 - 3 = 0. Pembagian adalah pengurangan berulang sampai habis.",
  kunciJawaban: "B,B,A,A,A,A,A,A,A,A",
  sketsaKartu: [
    "Sani membagi 12 permen kepada 3 sahabat sampai habis.",
    "Pengurangan 12 - 3 - 3 - 3 - 3 = 0 diubah menjadi 12 ÷ 3 = 4.",
    "Anak menjadi detektif: 10 permen dibagi 2 anak sampai 0.",
    "Anak mengisi lembar evaluasi tantangan para juara tentang pembagian adil.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Edo menulis 15 - 5 - 5 - 5 = 0 jadi 15 ÷ 3 = 5. Udin bilang harus dikurangi 3 berulang. Siapa yang tepat?
A) Edo benar, karena hasilnya habis 0
B) Udin benar, karena angka pengurangan harus menunjukkan jumlah orang yang menerima, yaitu 3
C) Kedua anak salah
D) Keduanya benar tanpa syarat`,
    `[Soal 2 - PG - Tipe: HOTS]
Ibu membagi seluruh permen kepada 5 anak. Tiap anak dapat 4, habis tanpa sisa. Permen semula...
A) 9
B) 20
C) 1
D) 15`,
    `[Soal 3 - PG - Tipe: HOTS]
Empat kantong sama banyak jumlahnya 20. Kalimat pembagian untuk isi satu kantong...
A) 20 ÷ 4 = 5
B) 20 ÷ 5 = 4
C) 4 ÷ 20 = 5
D) 20 + 4 = 24`,
    `[Soal 4 - PG - Tipe: MOTS]
Lani punya 18 permen ke 6 kotak sama banyak sampai habis. Pengurangan berulang yang tepat...
A) 18 - 6 - 6 - 6 = 0
B) 18 - 3 - 3 - 3 - 3 - 3 - 3 = 0
C) 18 - 9 - 9 = 0
D) 18 - 18 = 0`,
    `[Soal 5 - PG - Tipe: HOTS]
Cerita A: 24 permen untuk 4 anak. Cerita B: 24 permen untuk 6 anak. Pernyataan yang tepat...
A) Anak pada Cerita A mendapat lebih banyak
B) Anak pada Cerita B mendapat lebih banyak
C) Setiap anak mendapat sama persis
D) Tidak bisa dihitung`,
    `[Soal 6 - PG - Tipe: LOTS]
32 - 8 - 8 - 8 - 8 = 0 ditulis pembagian...
A) 32 ÷ 8 = 4
B) 32 ÷ 4 = 8 wajib saja
C) 8 ÷ 32 = 4
D) 32 + 8 = 40`,
    `[Soal 7 - PG - Tipe: HOTS]
12 cokelat dan 8 stroberi dibagi 4 teman secara adil. Isi campuran tiap anak...
A) 5
B) 4
C) 8
D) 20`,
    `[Soal 8 - PG - Tipe: HOTS]
16 permen ke 8 stoples, dan 16 permen ke 2 stoples. Pasangan yang tepat...
A) Kisah 1 = 16 ÷ 8, kisah 2 = 16 ÷ 2
B) Keduanya 16 ÷ 2
C) Keduanya 16 ÷ 8
D) Kisah 1 = 16 ÷ 2, kisah 2 = 16 ÷ 8`,
    `[Soal 9 - PG - Tipe: HOTS]
Riko punya 15 permen, makan 3 dulu, sisa dibagi 3 adik. Tiap adik mendapat...
A) 4
B) 5
C) 3
D) 12`,
    `[Soal 10 - PG - Tipe: HOTS]
Dua pembagian berbeda yang hasilnya 3...
A) 6 ÷ 2 dan 9 ÷ 3
B) 3 + 3 dan 1 × 3
C) 8 ÷ 4 dan 10 ÷ 2
D) 3 ÷ 3 dan 0 ÷ 3`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog Berbagi Permen Ulang Tahun",
      pengantar:
        "🗺️ Sani punya 12 permen. Tiga sahabat datang. Sani ingin berbagi sama rata sampai habis.",
      labelDaftar: "Target dan cerita apersepsi",
      kolom: 1,
      item: [
        {
          nama: "🌟 Target belajarku hari ini",
          singkat: "Pembagian adil",
          uraian:
            "🎯 Aku bisa memahami pembagian sebagai pengurangan berulang sampai habis. 🎯 Aku bisa membagi permen secara adil tanpa sisa.",
          contoh: "Kurangi terus sampai 0.",
        },
        {
          nama: "🗺️ Berbagi permen ulang tahun",
          singkat: "12 permen untuk 3 sahabat",
          uraian:
            "Sani ingin 3 sahabat mendapat sama banyak, dan permen di tangannya habis. Bagaimana membagi 12 kepada 3 teman secara adil?",
          contoh: "Yuk bantu Sani dengan trik matematika adil!",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Sani punya berapa permen di kantong baru?",
          alias: ["12", "dua belas"],
        },
        {
          pertanyaan: "2. Ada berapa sahabat Sani yang datang?",
          alias: ["3", "tiga"],
        },
        {
          pertanyaan: "3. Sani ingin permennya dibagi sampai apa?",
          alias: ["habis", "nol", "0", "tidak bersisa", "adil"],
        },
      ],
      voice: [
        [
          "Sani membuka kantong berisi 12 permen. Tiga sahabat datang. Sani ingin berbagi sama rata sampai habis, agar tidak ada yang sedih.",
          "Bagaimana membagi 12 permen kepada 3 teman secara adil? Yuk, kita bantu Sani dengan trik matematika adil!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis Berbagi Adil",
      pengantar:
        "🍬 Setiap keliling Sani memberi 1 permen ke tiap anak. Ada 3 anak, jadi setiap keliling berkurang 3. 12 - 3 - 3 - 3 - 3 = 0. Itu 4 kali. Jadi 12 ÷ 3 = 4.",
      labelDaftar: "Pengurangan berulang dan rumus pembagian",
      kolom: 1,
      item: [
        {
          nama: "🍬 Kurangi terus sampai habis",
          singkat: "12 - 3 - 3 - 3 - 3 = 0",
          uraian:
            "Keliling 1 sisa 9. Keliling 2 sisa 6. Keliling 3 sisa 3. Keliling 4 sisa 0. Pengurangan angka 3 terjadi 4 kali.",
          contoh: "Tiap anak dapat 4.",
        },
        {
          nama: "✍️ Rumus kotak rahasia",
          singkat: "12 ÷ 3 = 4",
          uraian:
            "Jumlah semua permen dibagi banyaknya teman atau wadah. 12 ÷ 3 = 4. Dibaca dua belas dibagi tiga sama dengan empat.",
          contoh: "Semua ÷ wadah = isi per anak.",
        },
        {
          nama: "💡 Nama kerennya pembagian",
          singkat: "Pengurangan berulang sampai 0",
          uraian:
            "Pengurangan berulang sampai habis disebut pembagian. Angka yang dikurangi berulang adalah jumlah orang yang menerima.",
          contoh: "Kurangi wadahnya, bukan hasilnya.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. 12 dikurangi 3 berulang sampai 0 terjadi berapa kali?",
          alias: ["4", "empat", "4 kali"],
        },
        {
          pertanyaan: "2. 12 dibagi 3 sama dengan berapa?",
          alias: ["4", "empat"],
        },
        {
          pertanyaan: "3. Pembagian adalah pengurangan berulang sampai angka berapa?",
          alias: ["0", "nol", "habis"],
        },
      ],
      voice: [
        [
          "Setiap keliling Sani memberi satu permen ke tiap anak. Ada tiga anak, jadi berkurang tiga. Dua belas kurang tiga kurang tiga kurang tiga kurang tiga sama dengan nol. Itu empat kali.",
          "Jadi tiap anak mendapat empat. Ditulis 12 dibagi 3 sama dengan 4. Pengurangan berulang sampai habis namanya pembagian.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Detektif Pembagian Adil",
      pengantar:
        "🕵️‍♂️ Sani punya 10 permen cokelat. Dibagi kepada 2 anak sampai habis. Kurangi 2 berulang, lalu tulis pembagiannya.",
      labelDaftar: "Aktivitas terbimbing dan jurnal",
      kolom: 1,
      item: [
        {
          nama: "🕵️‍♂️ Aktivitas 1",
          singkat: "10 ÷ 2 = 5",
          uraian:
            "Mula-mula 10. Dikurangi 2. 10 - 2 - 2 - 2 - 2 - 2 = 0. Angka 2 muncul 5 kali. Pembagian 10 ÷ 2 = 5.",
          contoh: "10 ÷ 2 = 5.",
        },
        {
          nama: "🎭 Jurnal perasaanku",
          singkat: "Pilih wajah",
          uraian:
            "😀 Sangat seru, sekarang aku bisa membagi makanan dengan adil! 😐 Sedikit bingung menghitung berapa kali angka pengurangan muncul. 😢 Masih butuh bantuan menghitung mundur sampai 0.",
          contoh: "Pilih satu wajah.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Sani punya berapa permen cokelat mula-mula?",
          alias: ["10", "sepuluh"],
        },
        {
          pertanyaan: "2. Dikurangi angka berapa secara berulang?",
          alias: ["2", "dua"],
        },
        {
          pertanyaan: "3. 10 dibagi 2 sama dengan berapa?",
          alias: ["5", "lima"],
        },
      ],
      voice: [
        [
          "Yuk jadi detektif pembagian adil. Ada 10 permen untuk 2 anak. Sepuluh kurang dua kurang dua kurang dua kurang dua kurang dua sama dengan nol.",
          "Angka dua muncul lima kali. Pembagiannya 10 dibagi 2 sama dengan 5.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "📝 Tantangan para juara! Bagi adil permen Edo, Udin, Lani, Dodi, dan Riko sampai habis.",
      labelDaftar: "Evaluasi pilihan ganda dan isian",
      kolom: 1,
      item: [
        {
          nama: "🍓 Bagian A",
          singkat: "Pilihan ganda",
          uraian:
            "Udin benar: kurangi jumlah orang. Kantong semula 20. Empat kantong 20 adalah 20 ÷ 4. Lani 18 - 6 - 6 - 6. Cerita A dapat lebih banyak.",
          contoh: "Kurangi wadahnya. 20 ÷ 4 = 5.",
        },
        {
          nama: "✏️ Bagian B",
          singkat: "Isian singkat",
          uraian:
            "32 ÷ 8 = 4. Campuran Dodi 5. Kisah 1 = B, kisah 2 = A. Adik Riko 4. Dua bentuk yang hasilnya 3.",
          contoh: "32 ÷ 8 = 4. Tiap anak 5.",
        },
      ],
      kuis: [
        { pertanyaan: "1. 15 permen untuk 3 teman, dikurangi angka berapa berulang?", alias: ["3", "tiga"] },
        { pertanyaan: "2. 5 anak masing-masing 4, permen semula?", alias: ["20"] },
        { pertanyaan: "3. Empat kantong jumlah 20, isi satu kantong?", alias: ["5", "20 ÷ 4"] },
        { pertanyaan: "4. 18 ke 6 kotak, pengurangan berulangnya?", alias: ["18 - 6 - 6 - 6"] },
        { pertanyaan: "5. 24 untuk 4 anak dibanding 24 untuk 6 anak?", alias: ["lebih banyak", "cerita a"] },
        { pertanyaan: "6. 32 - 8 - 8 - 8 - 8 ditulis pembagian?", alias: ["32 ÷ 8", "32:8", "4"] },
        { pertanyaan: "7. 12 cokelat dan 8 stroberi dibagi 4, tiap anak?", alias: ["5"] },
        { pertanyaan: "8. 16 ke 8 stoples, pembagiannya?", alias: ["16 ÷ 8", "2"] },
        { pertanyaan: "9. 15 makan 3, sisa dibagi 3 adik, tiap adik?", alias: ["4"] },
        { pertanyaan: "10. Dua pembagian berbeda yang hasilnya 3?", alias: ["6 ÷ 2", "9 ÷ 3", "12 ÷ 4", "3"] },
      ],
      voice: [
        [
          "Ini lembar evaluasi tantangan para juara. Lima belas permen untuk tiga teman dikurangi tiga berulang. Lima anak kali empat sama dengan 20. Empat kantong jumlah 20 artinya 20 dibagi 4.",
          "Delapan belas ke enam kotak: 18 kurang 6 kurang 6 kurang 6. Dua puluh empat untuk empat anak lebih banyak daripada untuk enam anak.",
        ],
        [
          "Tiga puluh dua kurang delapan empat kali sama dengan 32 dibagi 8. Campuran Dodi tiap anak 5. Enam belas ke delapan stoples adalah 16 dibagi 8. Riko makan 3, sisa 12, tiap adik 4.",
        ],
      ],
    },
  ],
};
