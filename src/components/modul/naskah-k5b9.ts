/**
 * Naskah Matematika Kelas 5 Bab 9 — Bilangan Cacah sampai 1.000.000 (mendalam + metode luar berlabel).
 * Sumber buku: Kemendikbudristek Bab 9 hlm. 273–291. Sub-Bab A–C (Materi).
 * Satu sumber: buat-k5-bab9.mjs → kelas5-bab9.json. Tanpa React/jaringan.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K5B9_META = {
  "chapterId": "k5-mat-bab9",
  "phaseCode": "FASE_C",
  "grade": 5,
  "subjectLabel": "MATEMATIKA - KELAS 5 SD",
  "title": "BAB 9: BILANGAN CACAH SAMPAI 1.000.000",
  "silabusElemen": "🌈 Fase C • Elemen Bilangan: Baca-Tulis & Nilai Tempat, Banding-Urut, Komposisi-Dekomposisi sampai 1.000.000 (Kelas 5 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A59: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Baca-Tulis & Nilai Tempat)",
  "fullTitle": "Sub-Bab A: Membaca, Menulis, dan Nilai Tempat sampai 1.000.000",
  "targetDescription": "Siswa membaca dan menulis bilangan cacah sampai 1.000.000 serta menentukan nilai tempat (satuan sampai ratus ribuan) sesuai Buku Siswa Kelas V Bab 9 Sub-Bab A hlm. 276–284.",
  "secondaryBg": "#FFEDD5",
  "secondaryBorder": "#EA580C",
  "secondaryText": "#7C2D12",
  "silabus": {
    "teksSuara": "Sensus penduduk dan harga lemari Jepara memakai bilangan besar. Kita baca 979.875 sebagai sembilan ratus tujuh puluh sembilan ribu delapan ratus tujuh puluh lima. METODE LUAR Place Value Chart Protocol dan Indonesian Number-Name Mapping. Setiap digit punya nilai tempat: satuan, puluhan, ratusan, ribuan, puluh ribuan, ratus ribuan, sampai satu juta. Titik pemisah ribuan Indonesia menolong membaca. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa membaca, menulis, dan menentukan nilai tempat bilangan cacah sampai 1.000.000.",
    "referensi": "Buku Siswa Matematika Kelas V Bab 9 Sub-Bab A hlm. 276–284; METODE LUAR · Place Value Chart Protocol; Indonesian Number-Name Mapping; Digit-Place Value Link."
  },
  "videos": [
    {
      "id": "K5B9A-V1",
      "judul": "Lemari & Baca Bilangan",
      "subjudul": "Number Name",
      "adegan": [
        {
          "id": "K5B9A-V1-1",
          "judul": "Harga lemari",
          "ketukan": [
            "Nisa dan Ibu melihat lemari Jepara seharga 979.875 rupiah.",
            "Dibaca: sembilan ratus tujuh puluh sembilan ribu delapan ratus tujuh puluh lima.",
            "METODE LUAR · Indonesian Number-Name Mapping.",
            "Titik memisahkan ribuan agar mudah dibaca."
          ],
          "papan": [
            "979.875",
            "baca nama",
            "Number-Name",
            "titik ribuan"
          ]
        },
        {
          "id": "K5B9A-V1-2",
          "judul": "Dari Bab 1 ke sejuta",
          "ketukan": [
            "Di Bab 1 kita sampai 100.000. Sekarang sampai 1.000.000.",
            "Contoh sensus: Gianyar 963.000 jiwa.",
            "Contoh lain: 720.736 — bagaimana membaca dan nilai tempat 6?",
            "Latihan baca dari kiri (nilai terbesar) ke kanan."
          ],
          "papan": [
            "sampai 1.000.000",
            "963.000",
            "720.736",
            "baca kiri→kanan"
          ]
        },
        {
          "id": "K5B9A-V1-3",
          "judul": "Tulis dari kata",
          "ketukan": [
            "Jika mendengar nama bilangan, tulis digit sesuai tempatnya.",
            "Isi yang kosong dengan nol bila perlu, misalnya 500.040.",
            "Jangan menukar urutan ratus ribuan dan puluh ribuan.",
            "Cek ulang dengan membaca kembali."
          ],
          "papan": [
            "kata → angka",
            "nol penyangga",
            "jangan tertukar",
            "cek baca"
          ]
        }
      ]
    },
    {
      "id": "K5B9A-V2",
      "judul": "Tabel Nilai Tempat",
      "subjudul": "Place Value",
      "adegan": [
        {
          "id": "K5B9A-V2-1",
          "judul": "Enam tempat utama",
          "ketukan": [
            "Kolom: ratus ribuan, puluh ribuan, ribuan, ratusan, puluhan, satuan.",
            "METODE LUAR · Place Value Chart Protocol.",
            "Setiap digit mengisi tepat satu kolom.",
            "Nilai digit = digit × nilai tempatnya."
          ],
          "papan": [
            "6 kolom",
            "Chart Protocol",
            "1 digit/kolom",
            "digit × tempat"
          ]
        },
        {
          "id": "K5B9A-V2-2",
          "judul": "Contoh 979.875",
          "ketukan": [
            "9 di ratus ribuan, 7 di puluh ribuan, 9 di ribuan.",
            "8 di ratusan, 7 di puluhan, 5 di satuan.",
            "Nilai tempat angka 9 pertama = 900.000.",
            "METODE LUAR · Digit-Place Value Link."
          ],
          "papan": [
            "979.875",
            "pemetaan digit",
            "9 → 900.000",
            "Link"
          ]
        },
        {
          "id": "K5B9A-V2-3",
          "judul": "Latihan harga & sensus",
          "ketukan": [
            "Tulis harga peralatan komputer ke tabel nilai tempat.",
            "Tentukan nilai tempat digit tertentu, misalnya angka 9.",
            "Uang di kasir: berapa yang menempati ratus ribuan?",
            "Latihan membuat mata tajam pada posisi digit."
          ],
          "papan": [
            "harga → tabel",
            "nilai digit 9",
            "ratus ribuan",
            "latihan"
          ]
        }
      ]
    },
    {
      "id": "K5B9A-V3",
      "judul": "Satu Juta & Siap B",
      "subjudul": "1.000.000",
      "adegan": [
        {
          "id": "K5B9A-V3-1",
          "judul": "1.000.000",
          "ketukan": [
            "Satu juta = 1 di tempat jutaan, diikuti enam nol.",
            "Di kelas V kita fokus sampai 1.000.000 sebagai batas atas.",
            "Membaca sejuta: satu juta.",
            "Pahami bahwa 999.999 + 1 = 1.000.000."
          ],
          "papan": [
            "1.000.000",
            "satu juta",
            "batas bab",
            "+1 = sejuta"
          ]
        },
        {
          "id": "K5B9A-V3-2",
          "judul": "Cek kesalahan umum",
          "ketukan": [
            "Salah umum: lupa nol, tertukar puluh ribuan/ratus ribuan, salah titik.",
            "Baca ulang setelah menulis.",
            "Bandingkan dengan tabel nilai tempat.",
            "Ketelitian lebih penting daripada kecepatan."
          ],
          "papan": [
            "lupa nol",
            "tertukar tempat",
            "cek tabel",
            "teliti"
          ]
        },
        {
          "id": "K5B9A-V3-3",
          "judul": "Siap B",
          "ketukan": [
            "Kita bisa baca, tulis, dan petakan nilai tempat.",
            "Berikutnya: bandingkan dan urutkan bilangan besar.",
            "Kunci: mulai dari nilai tempat paling kiri.",
            "Ayo Sub-Bab B!"
          ],
          "papan": [
            "A siap",
            "lanjut banding",
            "dari kiri",
            "ke B"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Lihat digit",
      "stepDesc": "Baca soal Membaca, Menulis, dan Nilai Tempat sampai 1.000.000 dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Dari kiri Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa membaca dan menulis bilangan cacah sampai 1.000.000 serta menentukan nilai tempat (satuan sampai ratus ribuan) ses….",
      "icon": "👀",
      "flowFrom": "Lihat digit",
      "flowTo": "Baca nama"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Baca nama",
      "stepDesc": "Number-Name. Pada Membaca, Menulis, dan Nilai Tempat sampai 1.000.000, langkah “Baca nama” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🗣️",
      "flowFrom": "Baca nama",
      "flowTo": "Tabel tempat"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Tabel tempat",
      "stepDesc": "6 kolom. Pada Membaca, Menulis, dan Nilai Tempat sampai 1.000.000, langkah “Tabel tempat” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "📋",
      "flowFrom": "Tabel tempat",
      "flowTo": "Isi digit"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Isi digit",
      "stepDesc": "1 kolom/digit. Pada Membaca, Menulis, dan Nilai Tempat sampai 1.000.000, langkah “Isi digit” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🔢",
      "flowFrom": "Isi digit",
      "flowTo": "Nilai digit"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Nilai digit",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Membaca, Menulis, dan Nilai Tempat sampai 1.000.000. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "✖️",
      "flowFrom": "Nilai digit",
      "flowTo": "Cek baca"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek baca",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Membaca, Menulis, dan Nilai Tempat sampai 1.000.000. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Cek baca",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Ratus ribuan",
      "emoji": "💯",
      "countNum": 100000,
      "countWord": "100.000",
      "suara": "Tempat."
    },
    {
      "judul": "Puluh ribuan",
      "emoji": "🔟",
      "countNum": 10000,
      "countWord": "10.000",
      "suara": "Tempat."
    },
    {
      "judul": "Ribuan",
      "emoji": "1",
      "countNum": 1000,
      "countWord": "1.000",
      "suara": "Tempat."
    },
    {
      "judul": "Ratusan",
      "emoji": "C",
      "countNum": 100,
      "countWord": "100",
      "suara": "Tempat."
    },
    {
      "judul": "Puluhan",
      "emoji": "X",
      "countNum": 10,
      "countWord": "10",
      "suara": "Tempat."
    },
    {
      "judul": "Satuan",
      "emoji": "I",
      "countNum": 1,
      "countWord": "1",
      "suara": "Tempat."
    },
    {
      "judul": "979.875",
      "emoji": "🪵",
      "countNum": 979875,
      "countWord": "lemari",
      "suara": "Contoh."
    },
    {
      "judul": "963.000",
      "emoji": "🗺️",
      "countNum": 963000,
      "countWord": "Gianyar",
      "suara": "Sensus."
    },
    {
      "judul": "1.000.000",
      "emoji": "1️⃣",
      "countNum": 1000000,
      "countWord": "satu juta",
      "suara": "Batas."
    },
    {
      "judul": "Siap B",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "banding/urut",
      "suara": "Lanjut."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-a-c",
      "title": "Hitung Nilai Tempat",
      "bookReference": "hlm. 276–284",
      "objective": "Baca-tulis bilangan dengan Place Value Chart dan Number-Name Mapping.",
      "mechanicDescription": "Tiga ronde: baca nama, isi tabel tempat, nilai digit × tempat.",
      "voiceGuide": "Pilih jawaban terkait baca-tulis dan nilai tempat.",
      "emoji": "🔢",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-a-c",
      "title": "Arti Nama Bilangan",
      "bookReference": "hlm. 276–284",
      "objective": "Baca-tulis bilangan dengan Place Value Chart dan Number-Name Mapping.",
      "mechanicDescription": "Tiga ronde: baca nama, isi tabel tempat, nilai digit × tempat.",
      "voiceGuide": "Pilih jawaban terkait baca-tulis dan nilai tempat.",
      "emoji": "🔢",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-a-c",
      "title": "Pilih Baca Benar",
      "bookReference": "hlm. 276–284",
      "objective": "Baca-tulis bilangan dengan Place Value Chart dan Number-Name Mapping.",
      "mechanicDescription": "Tiga ronde: baca nama, isi tabel tempat, nilai digit × tempat.",
      "voiceGuide": "Pilih jawaban terkait baca-tulis dan nilai tempat.",
      "emoji": "🔢",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-a-c",
      "title": "Pilah Tempat Digit",
      "bookReference": "hlm. 276–284",
      "objective": "Baca-tulis bilangan dengan Place Value Chart dan Number-Name Mapping.",
      "mechanicDescription": "Tiga ronde: baca nama, isi tabel tempat, nilai digit × tempat.",
      "voiceGuide": "Pilih jawaban terkait baca-tulis dan nilai tempat.",
      "emoji": "🔢",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-a-c",
      "title": "Jodohkan Digit-Tempat",
      "bookReference": "hlm. 276–284",
      "objective": "Baca-tulis bilangan dengan Place Value Chart dan Number-Name Mapping.",
      "mechanicDescription": "Tiga ronde: baca nama, isi tabel tempat, nilai digit × tempat.",
      "voiceGuide": "Pilih jawaban terkait baca-tulis dan nilai tempat.",
      "emoji": "🔢",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-a-c",
      "title": "Memori Nilai Tempat",
      "bookReference": "hlm. 276–284",
      "objective": "Baca-tulis bilangan dengan Place Value Chart dan Number-Name Mapping.",
      "mechanicDescription": "Tiga ronde: baca nama, isi tabel tempat, nilai digit × tempat.",
      "voiceGuide": "Pilih jawaban terkait baca-tulis dan nilai tempat.",
      "emoji": "🔢",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-a-c",
      "title": "Ketuk Digit",
      "bookReference": "hlm. 276–284",
      "objective": "Baca-tulis bilangan dengan Place Value Chart dan Number-Name Mapping.",
      "mechanicDescription": "Tiga ronde: baca nama, isi tabel tempat, nilai digit × tempat.",
      "voiceGuide": "Pilih jawaban terkait baca-tulis dan nilai tempat.",
      "emoji": "🔢",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-a-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 276–284",
      "objective": "Baca-tulis bilangan dengan Place Value Chart dan Number-Name Mapping.",
      "mechanicDescription": "Tiga ronde: baca nama, isi tabel tempat, nilai digit × tempat.",
      "voiceGuide": "Pilih jawaban terkait baca-tulis dan nilai tempat.",
      "emoji": "🔢",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-a-c",
      "title": "Cerita Lemari Jepara",
      "bookReference": "hlm. 276–284",
      "objective": "Baca-tulis bilangan dengan Place Value Chart dan Number-Name Mapping.",
      "mechanicDescription": "Tiga ronde: baca nama, isi tabel tempat, nilai digit × tempat.",
      "voiceGuide": "Pilih jawaban terkait baca-tulis dan nilai tempat.",
      "emoji": "🔢",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-a-c",
      "title": "Urutkan Tempat",
      "bookReference": "hlm. 276–284",
      "objective": "Baca-tulis bilangan dengan Place Value Chart dan Number-Name Mapping.",
      "mechanicDescription": "Tiga ronde: baca nama, isi tabel tempat, nilai digit × tempat.",
      "voiceGuide": "Pilih jawaban terkait baca-tulis dan nilai tempat.",
      "emoji": "🔢",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-a-p",
      "title": "Diagram Hitung Nilai Tempat",
      "bookReference": "hlm. 276–284",
      "objective": "Baca-tulis bilangan dengan Place Value Chart dan Number-Name Mapping.",
      "mechanicDescription": "Tiga ronde: baca nama, isi tabel tempat, nilai digit × tempat.",
      "voiceGuide": "Pilih jawaban terkait baca-tulis dan nilai tempat.",
      "diagramType": "hitung",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "rumus-a-p",
      "title": "Diagram Arti Nama Bilangan",
      "bookReference": "hlm. 276–284",
      "objective": "Baca-tulis bilangan dengan Place Value Chart dan Number-Name Mapping.",
      "mechanicDescription": "Tiga ronde: baca nama, isi tabel tempat, nilai digit × tempat.",
      "voiceGuide": "Pilih jawaban terkait baca-tulis dan nilai tempat.",
      "diagramType": "rumus",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "arti-a-p",
      "title": "Diagram Pilih Baca Benar",
      "bookReference": "hlm. 276–284",
      "objective": "Baca-tulis bilangan dengan Place Value Chart dan Number-Name Mapping.",
      "mechanicDescription": "Tiga ronde: baca nama, isi tabel tempat, nilai digit × tempat.",
      "voiceGuide": "Pilih jawaban terkait baca-tulis dan nilai tempat.",
      "diagramType": "arti",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sortir-a-p",
      "title": "Diagram Pilah Tempat Digit",
      "bookReference": "hlm. 276–284",
      "objective": "Baca-tulis bilangan dengan Place Value Chart dan Number-Name Mapping.",
      "mechanicDescription": "Tiga ronde: baca nama, isi tabel tempat, nilai digit × tempat.",
      "voiceGuide": "Pilih jawaban terkait baca-tulis dan nilai tempat.",
      "diagramType": "sortir",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-a-p",
      "title": "Diagram Jodohkan Digit-Tempat",
      "bookReference": "hlm. 276–284",
      "objective": "Baca-tulis bilangan dengan Place Value Chart dan Number-Name Mapping.",
      "mechanicDescription": "Tiga ronde: baca nama, isi tabel tempat, nilai digit × tempat.",
      "voiceGuide": "Pilih jawaban terkait baca-tulis dan nilai tempat.",
      "diagramType": "jodoh",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memori-a-p",
      "title": "Diagram Memori Nilai Tempat",
      "bookReference": "hlm. 276–284",
      "objective": "Baca-tulis bilangan dengan Place Value Chart dan Number-Name Mapping.",
      "mechanicDescription": "Tiga ronde: baca nama, isi tabel tempat, nilai digit × tempat.",
      "voiceGuide": "Pilih jawaban terkait baca-tulis dan nilai tempat.",
      "diagramType": "memori",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-a-p",
      "title": "Diagram Ketuk Digit",
      "bookReference": "hlm. 276–284",
      "objective": "Baca-tulis bilangan dengan Place Value Chart dan Number-Name Mapping.",
      "mechanicDescription": "Tiga ronde: baca nama, isi tabel tempat, nilai digit × tempat.",
      "voiceGuide": "Pilih jawaban terkait baca-tulis dan nilai tempat.",
      "diagramType": "ketuk",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "semua-a-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 276–284",
      "objective": "Baca-tulis bilangan dengan Place Value Chart dan Number-Name Mapping.",
      "mechanicDescription": "Tiga ronde: baca nama, isi tabel tempat, nilai digit × tempat.",
      "voiceGuide": "Pilih jawaban terkait baca-tulis dan nilai tempat.",
      "diagramType": "semua",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "cerita-a-p",
      "title": "Diagram Cerita Lemari Jepara",
      "bookReference": "hlm. 276–284",
      "objective": "Baca-tulis bilangan dengan Place Value Chart dan Number-Name Mapping.",
      "mechanicDescription": "Tiga ronde: baca nama, isi tabel tempat, nilai digit × tempat.",
      "voiceGuide": "Pilih jawaban terkait baca-tulis dan nilai tempat.",
      "diagramType": "cerita",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "urut-a-p",
      "title": "Diagram Urutkan Tempat",
      "bookReference": "hlm. 276–284",
      "objective": "Baca-tulis bilangan dengan Place Value Chart dan Number-Name Mapping.",
      "mechanicDescription": "Tiga ronde: baca nama, isi tabel tempat, nilai digit × tempat.",
      "voiceGuide": "Pilih jawaban terkait baca-tulis dan nilai tempat.",
      "diagramType": "urut",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-a-a",
      "title": "Tulis Hitung Nilai Tempat",
      "bookReference": "hlm. 276–284",
      "objective": "Baca-tulis bilangan dengan Place Value Chart dan Number-Name Mapping.",
      "mechanicDescription": "Tiga ronde: baca nama, isi tabel tempat, nilai digit × tempat.",
      "voiceGuide": "Pilih jawaban terkait baca-tulis dan nilai tempat.",
      "symbolLarge": "9",
      "wordLarge": "NILAI TEMPAT",
      "mathNotation": "digit × tempat"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-a-a",
      "title": "Tulis Arti Nama Bilangan",
      "bookReference": "hlm. 276–284",
      "objective": "Baca-tulis bilangan dengan Place Value Chart dan Number-Name Mapping.",
      "mechanicDescription": "Tiga ronde: baca nama, isi tabel tempat, nilai digit × tempat.",
      "voiceGuide": "Pilih jawaban terkait baca-tulis dan nilai tempat.",
      "symbolLarge": "9",
      "wordLarge": "NILAI TEMPAT",
      "mathNotation": "digit × tempat"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-a-a",
      "title": "Tulis Pilih Baca Benar",
      "bookReference": "hlm. 276–284",
      "objective": "Baca-tulis bilangan dengan Place Value Chart dan Number-Name Mapping.",
      "mechanicDescription": "Tiga ronde: baca nama, isi tabel tempat, nilai digit × tempat.",
      "voiceGuide": "Pilih jawaban terkait baca-tulis dan nilai tempat.",
      "symbolLarge": "9",
      "wordLarge": "NILAI TEMPAT",
      "mathNotation": "digit × tempat"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-a-a",
      "title": "Tulis Pilah Tempat Digit",
      "bookReference": "hlm. 276–284",
      "objective": "Baca-tulis bilangan dengan Place Value Chart dan Number-Name Mapping.",
      "mechanicDescription": "Tiga ronde: baca nama, isi tabel tempat, nilai digit × tempat.",
      "voiceGuide": "Pilih jawaban terkait baca-tulis dan nilai tempat.",
      "symbolLarge": "9",
      "wordLarge": "NILAI TEMPAT",
      "mathNotation": "digit × tempat"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-a-a",
      "title": "Tulis Jodohkan Digit-Tempat",
      "bookReference": "hlm. 276–284",
      "objective": "Baca-tulis bilangan dengan Place Value Chart dan Number-Name Mapping.",
      "mechanicDescription": "Tiga ronde: baca nama, isi tabel tempat, nilai digit × tempat.",
      "voiceGuide": "Pilih jawaban terkait baca-tulis dan nilai tempat.",
      "symbolLarge": "9",
      "wordLarge": "NILAI TEMPAT",
      "mathNotation": "digit × tempat"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-a-a",
      "title": "Tulis Memori Nilai Tempat",
      "bookReference": "hlm. 276–284",
      "objective": "Baca-tulis bilangan dengan Place Value Chart dan Number-Name Mapping.",
      "mechanicDescription": "Tiga ronde: baca nama, isi tabel tempat, nilai digit × tempat.",
      "voiceGuide": "Pilih jawaban terkait baca-tulis dan nilai tempat.",
      "symbolLarge": "9",
      "wordLarge": "NILAI TEMPAT",
      "mathNotation": "digit × tempat"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-a",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 276–284",
      "objective": "Baca-tulis bilangan dengan Place Value Chart dan Number-Name Mapping.",
      "mechanicDescription": "Dua ronde menilai pernyataan.",
      "voiceGuide": "Benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-a",
      "title": "Detektif Bilangan",
      "bookReference": "hlm. 276–284",
      "objective": "Baca-tulis bilangan dengan Place Value Chart dan Number-Name Mapping.",
      "mechanicDescription": "Tiga soal petunjuk.",
      "voiceGuide": "Pilih dari petunjuk.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "peta-a",
      "title": "Peta Konsep",
      "bookReference": "hlm. 276–284",
      "objective": "Baca-tulis bilangan dengan Place Value Chart dan Number-Name Mapping.",
      "mechanicDescription": "Satu peta konsep.",
      "voiceGuide": "Pilih isi kotak.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "cerita-q-a",
      "title": "Cerita Angka",
      "bookReference": "hlm. 276–284",
      "objective": "Baca-tulis bilangan dengan Place Value Chart dan Number-Name Mapping.",
      "mechanicDescription": "Tiga ronde cerita.",
      "voiceGuide": "Baca lalu pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "🗣️",
      "nama": "Baca",
      "isi": "Baca dari kiri dengan nama Indonesia (Indonesian Number-Name Mapping).",
      "suara": "979.875 contoh."
    },
    {
      "ikon": "📋",
      "nama": "Tabel",
      "isi": "Isi digit ke kolom ratus ribuan sampai satuan (Place Value Chart Protocol).",
      "suara": "Enam kolom utama."
    },
    {
      "ikon": "✖️",
      "nama": "Nilai",
      "isi": "Nilai digit = digit × nilai tempatnya (Digit-Place Value Link).",
      "suara": "Contoh 9 di ratus ribuan = 900.000."
    },
    {
      "ikon": "1️⃣",
      "nama": "Sejuta",
      "isi": "1.000.000 dibaca satu juta; cek nol dan titik pemisah.",
      "suara": "Batas bab."
    }
  ],
  "poinSuara": "Ingat: baca dari kiri, isi tabel nilai tempat, kalikan digit dengan tempatnya, lalu baca ulang untuk mengecek.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Baca dari kiri",
        "warna": "#FDE68A"
      },
      {
        "teks": "isi tabel tempat",
        "warna": "#BBF7D0"
      },
      {
        "teks": "hitung nilai digit",
        "warna": "#BFDBFE"
      },
      {
        "teks": "cek dengan baca ulang",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: tulis harga tiga barang di supermarket ke tabel nilai tempat, lalu bacakan namanya.",
  "refleksi": [
    "Bagaimana membaca 720.736?",
    "Apa nilai tempat digit 7 pada 720.736?",
    "Mengapa titik pemisah ribuan membantu?"
  ]
};
export const SUB_B59: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Banding & Urut)",
  "fullTitle": "Sub-Bab B: Mengurutkan dan Membandingkan Bilangan sampai 1.000.000",
  "targetDescription": "Siswa membandingkan dua bilangan dan mengurutkan beberapa bilangan sampai 1.000.000 dengan memulai dari nilai tempat paling kiri sesuai Buku Siswa Kelas V Bab 9 Sub-Bab B hlm. 284–287.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Harga sepatu Komang 342.231, Lukas 432.543, Nisa 232.231. Mana termahal? METODE LUAR Leftmost Place Priority dan Digit-by-Digit Comparison: bandingkan ratus ribuan dulu, jika sama baru puluh ribuan, dan seterusnya. Simbol lebih besar, lebih kecil, atau sama dengan. Pengurutan naik atau turun memakai perbandingan berulang. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa membandingkan dan mengurutkan bilangan cacah sampai 1.000.000 dengan strategi nilai tempat.",
    "referensi": "Buku Siswa Matematika Kelas V Bab 9 Sub-Bab B hlm. 284–287; METODE LUAR · Leftmost Place Priority; Digit-by-Digit Comparison; Ordering Protocol."
  },
  "videos": [
    {
      "id": "K5B9B-V1",
      "judul": "Sepatu Termahal",
      "subjudul": "Compare",
      "adegan": [
        {
          "id": "K5B9B-V1-1",
          "judul": "Tiga harga",
          "ketukan": [
            "Komang 342.231, Lukas 432.543, Nisa 232.231.",
            "Lihat ratus ribuan: 4, 3, dan 2.",
            "Lukas terbesar di ratus ribuan → termahal.",
            "METODE LUAR · Leftmost Place Priority."
          ],
          "papan": [
            "3 harga",
            "lihat ratus ribuan",
            "Lukas termahal",
            "Priority"
          ]
        },
        {
          "id": "K5B9B-V1-2",
          "judul": "Jika sama di kiri",
          "ketukan": [
            "Contoh: 599.198 dan 599.047.",
            "Ratus, puluh, dan ribuan sama: 599.",
            "Bandingkan ratusan: 1 lebih besar dari 0.",
            "Jadi 599.198 lebih besar. Digit-by-Digit Comparison."
          ],
          "papan": [
            "599.198 vs 047",
            "kiri sama",
            "lanjut kanan",
            "Digit-by-Digit"
          ]
        },
        {
          "id": "K5B9B-V1-3",
          "judul": "Simbol banding",
          "ketukan": [
            "Pakai lebih besar, lebih kecil, atau sama dengan.",
            "A lebih besar B sama artinya B lebih kecil A.",
            "Jangan hanya menghitung jumlah digit; lihat nilai tempat.",
            "Latihan sepatu: siapa termurah? Nisa."
          ],
          "papan": [
            "> < =",
            "simetri banding",
            "bukan jumlah digit",
            "Nisa termurah"
          ]
        }
      ]
    },
    {
      "id": "K5B9B-V2",
      "judul": "Urutkan Banyak Bilangan",
      "subjudul": "Ordering",
      "adegan": [
        {
          "id": "K5B9B-V2-1",
          "judul": "Protokol urut",
          "ketukan": [
            "METODE LUAR · Ordering Protocol: bandingkan berpasangan dari kiri.",
            "Untuk urutan naik: dari terkecil ke terbesar.",
            "Untuk urutan turun: dari terbesar ke terkecil.",
            "Tuliskan hasil akhir setelah semua dibanding."
          ],
          "papan": [
            "Ordering Protocol",
            "naik",
            "turun",
            "tulis hasil"
          ]
        },
        {
          "id": "K5B9B-V2-2",
          "judul": "Wisatawan Yogya",
          "ketukan": [
            "Data wisatawan mancanegara 2016–2020 dilatih mengurutkan.",
            "Lihat tren naik atau turun antar tahun.",
            "Bandingkan dua tahun yang angkanya dekat dengan Digit-by-Digit.",
            "Grafik batang membantu, tapi bukti tetap di digit."
          ],
          "papan": [
            "data wisata",
            "tren tahun",
            "digit bukti",
            "bantu visual"
          ]
        },
        {
          "id": "K5B9B-V2-3",
          "judul": "Perangkap salah",
          "ketukan": [
            "Salah umum: membandingkan dari satuan dulu.",
            "Atau mengira bilangan dengan digit 0 di tengah selalu lebih kecil tanpa cek kiri.",
            "Selalu mulai dari nilai tempat terbesar.",
            "Latihan: 789.876 vs 789.867 — beda di puluhan."
          ],
          "papan": [
            "jangan dari satuan",
            "cek kiri dulu",
            "tempat terbesar",
            "876 vs 867"
          ]
        }
      ]
    },
    {
      "id": "K5B9B-V3",
      "judul": "Latihan Banding & Siap C",
      "subjudul": "Ayo",
      "adegan": [
        {
          "id": "K5B9B-V3-1",
          "judul": "Latihan buku",
          "ketukan": [
            "Bandingkan pernyataan benar-salah tentang dua ratus ribu.",
            "Urutkan 676.785, 786.897, 789.876, 789.867 dengan hati-hati.",
            "Cek pasangan yang hampir sama digitnya.",
            "Teliti di puluhan dan satuan."
          ],
          "papan": [
            "benar/salah",
            "urut empat bilangan",
            "hampir sama",
            "teliti"
          ]
        },
        {
          "id": "K5B9B-V3-2",
          "judul": "Keputusan harga",
          "ketukan": [
            "Siapa lebih mahal antara dua sepatu? Pakai protokol kiri dulu.",
            "Siapa lebih murah? Kebalikan hasil banding.",
            "Sama berharga hanya jika semua digit sama.",
            "Data harga jadi keputusan belanja."
          ],
          "papan": [
            "lebih mahal",
            "lebih murah",
            "sama =",
            "keputusan"
          ]
        },
        {
          "id": "K5B9B-V3-3",
          "judul": "Siap C",
          "ketukan": [
            "Kita bisa banding dan urut bilangan besar.",
            "Berikutnya: menyusun (komposisi) dan menguraikan (dekomposisi).",
            "Nilai tempat tetap jadi kunci.",
            "Ayo Sub-Bab C!"
          ],
          "papan": [
            "B siap",
            "komposisi",
            "dekomposisi",
            "ke C"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Samakan digit",
      "stepDesc": "Baca soal Mengurutkan dan Membandingkan Bilangan sampai 1.000.000 dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Panjang/titik Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa membandingkan dua bilangan dan mengurutkan beberapa bilangan sampai 1.000.000 dengan memulai dari nilai tempat pal….",
      "icon": "📐",
      "flowFrom": "Samakan digit",
      "flowTo": "Mulai kiri"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Mulai kiri",
      "stepDesc": "Ratus ribuan. Pada Mengurutkan dan Membandingkan Bilangan sampai 1.000.000, langkah “Mulai kiri” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "⬅️",
      "flowFrom": "Mulai kiri",
      "flowTo": "Banding digit"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Banding digit",
      "stepDesc": "Lebih/kurang/sama. Pada Mengurutkan dan Membandingkan Bilangan sampai 1.000.000, langkah “Banding digit” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "⚖️",
      "flowFrom": "Banding digit",
      "flowTo": "Jika sama"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Jika sama",
      "stepDesc": "Geser kanan. Pada Mengurutkan dan Membandingkan Bilangan sampai 1.000.000, langkah “Jika sama” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "➡️",
      "flowFrom": "Jika sama",
      "flowTo": "Simbol"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Simbol",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Mengurutkan dan Membandingkan Bilangan sampai 1.000.000. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "🔣",
      "flowFrom": "Simbol",
      "flowTo": "Urutkan"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Urutkan",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Mengurutkan dan Membandingkan Bilangan sampai 1.000.000. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "📶",
      "flowFrom": "Urutkan",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Priority",
      "emoji": "⬅️",
      "countNum": 1,
      "countWord": "mulai kiri",
      "suara": "Metode luar."
    },
    {
      "judul": "Digit-by-Digit",
      "emoji": "🔢",
      "countNum": 1,
      "countWord": "satu per satu",
      "suara": "Banding."
    },
    {
      "judul": "432.543",
      "emoji": "👟",
      "countNum": 432543,
      "countWord": "Lukas",
      "suara": "Termahal."
    },
    {
      "judul": "342.231",
      "emoji": "👟",
      "countNum": 342231,
      "countWord": "Komang",
      "suara": "Tengah."
    },
    {
      "judul": "232.231",
      "emoji": "👟",
      "countNum": 232231,
      "countWord": "Nisa",
      "suara": "Termurah."
    },
    {
      "judul": "599.198",
      "emoji": ">",
      "countNum": 599198,
      "countWord": "> 599.047",
      "suara": "Contoh."
    },
    {
      "judul": "> < =",
      "emoji": "🔣",
      "countNum": 3,
      "countWord": "simbol",
      "suara": "Notasi."
    },
    {
      "judul": "Urut naik",
      "emoji": "📈",
      "countNum": 1,
      "countWord": "kecil→besar",
      "suara": "Ordering."
    },
    {
      "judul": "Urut turun",
      "emoji": "📉",
      "countNum": 1,
      "countWord": "besar→kecil",
      "suara": "Ordering."
    },
    {
      "judul": "Siap C",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "komposisi",
      "suara": "Lanjut."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-b-c",
      "title": "Hitung Selisih Tempat",
      "bookReference": "hlm. 284–287",
      "objective": "Bandingkan dan urutkan dengan Leftmost Place Priority dan Ordering Protocol.",
      "mechanicDescription": "Tiga ronde: banding digit kiri, simbol, urutan naik/turun.",
      "voiceGuide": "Pilih jawaban terkait banding dan urut bilangan.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-b-c",
      "title": "Arti Banding Kiri",
      "bookReference": "hlm. 284–287",
      "objective": "Bandingkan dan urutkan dengan Leftmost Place Priority dan Ordering Protocol.",
      "mechanicDescription": "Tiga ronde: banding digit kiri, simbol, urutan naik/turun.",
      "voiceGuide": "Pilih jawaban terkait banding dan urut bilangan.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-b-c",
      "title": "Pilih Lebih Besar",
      "bookReference": "hlm. 284–287",
      "objective": "Bandingkan dan urutkan dengan Leftmost Place Priority dan Ordering Protocol.",
      "mechanicDescription": "Tiga ronde: banding digit kiri, simbol, urutan naik/turun.",
      "voiceGuide": "Pilih jawaban terkait banding dan urut bilangan.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-b-c",
      "title": "Pilah Naik/Turun",
      "bookReference": "hlm. 284–287",
      "objective": "Bandingkan dan urutkan dengan Leftmost Place Priority dan Ordering Protocol.",
      "mechanicDescription": "Tiga ronde: banding digit kiri, simbol, urutan naik/turun.",
      "voiceGuide": "Pilih jawaban terkait banding dan urut bilangan.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-b-c",
      "title": "Jodohkan Pasangan Banding",
      "bookReference": "hlm. 284–287",
      "objective": "Bandingkan dan urutkan dengan Leftmost Place Priority dan Ordering Protocol.",
      "mechanicDescription": "Tiga ronde: banding digit kiri, simbol, urutan naik/turun.",
      "voiceGuide": "Pilih jawaban terkait banding dan urut bilangan.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-b-c",
      "title": "Memori Urutan",
      "bookReference": "hlm. 284–287",
      "objective": "Bandingkan dan urutkan dengan Leftmost Place Priority dan Ordering Protocol.",
      "mechanicDescription": "Tiga ronde: banding digit kiri, simbol, urutan naik/turun.",
      "voiceGuide": "Pilih jawaban terkait banding dan urut bilangan.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-b-c",
      "title": "Ketuk Terbesar",
      "bookReference": "hlm. 284–287",
      "objective": "Bandingkan dan urutkan dengan Leftmost Place Priority dan Ordering Protocol.",
      "mechanicDescription": "Tiga ronde: banding digit kiri, simbol, urutan naik/turun.",
      "voiceGuide": "Pilih jawaban terkait banding dan urut bilangan.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-b-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 284–287",
      "objective": "Bandingkan dan urutkan dengan Leftmost Place Priority dan Ordering Protocol.",
      "mechanicDescription": "Tiga ronde: banding digit kiri, simbol, urutan naik/turun.",
      "voiceGuide": "Pilih jawaban terkait banding dan urut bilangan.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-b-c",
      "title": "Cerita Sepatu",
      "bookReference": "hlm. 284–287",
      "objective": "Bandingkan dan urutkan dengan Leftmost Place Priority dan Ordering Protocol.",
      "mechanicDescription": "Tiga ronde: banding digit kiri, simbol, urutan naik/turun.",
      "voiceGuide": "Pilih jawaban terkait banding dan urut bilangan.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-b-c",
      "title": "Urutkan Bilangan",
      "bookReference": "hlm. 284–287",
      "objective": "Bandingkan dan urutkan dengan Leftmost Place Priority dan Ordering Protocol.",
      "mechanicDescription": "Tiga ronde: banding digit kiri, simbol, urutan naik/turun.",
      "voiceGuide": "Pilih jawaban terkait banding dan urut bilangan.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-b-p",
      "title": "Diagram Hitung Selisih Tempat",
      "bookReference": "hlm. 284–287",
      "objective": "Bandingkan dan urutkan dengan Leftmost Place Priority dan Ordering Protocol.",
      "mechanicDescription": "Tiga ronde: banding digit kiri, simbol, urutan naik/turun.",
      "voiceGuide": "Pilih jawaban terkait banding dan urut bilangan.",
      "diagramType": "hitung",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "rumus-b-p",
      "title": "Diagram Arti Banding Kiri",
      "bookReference": "hlm. 284–287",
      "objective": "Bandingkan dan urutkan dengan Leftmost Place Priority dan Ordering Protocol.",
      "mechanicDescription": "Tiga ronde: banding digit kiri, simbol, urutan naik/turun.",
      "voiceGuide": "Pilih jawaban terkait banding dan urut bilangan.",
      "diagramType": "rumus",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "arti-b-p",
      "title": "Diagram Pilih Lebih Besar",
      "bookReference": "hlm. 284–287",
      "objective": "Bandingkan dan urutkan dengan Leftmost Place Priority dan Ordering Protocol.",
      "mechanicDescription": "Tiga ronde: banding digit kiri, simbol, urutan naik/turun.",
      "voiceGuide": "Pilih jawaban terkait banding dan urut bilangan.",
      "diagramType": "arti",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sortir-b-p",
      "title": "Diagram Pilah Naik/Turun",
      "bookReference": "hlm. 284–287",
      "objective": "Bandingkan dan urutkan dengan Leftmost Place Priority dan Ordering Protocol.",
      "mechanicDescription": "Tiga ronde: banding digit kiri, simbol, urutan naik/turun.",
      "voiceGuide": "Pilih jawaban terkait banding dan urut bilangan.",
      "diagramType": "sortir",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-b-p",
      "title": "Diagram Jodohkan Pasangan Banding",
      "bookReference": "hlm. 284–287",
      "objective": "Bandingkan dan urutkan dengan Leftmost Place Priority dan Ordering Protocol.",
      "mechanicDescription": "Tiga ronde: banding digit kiri, simbol, urutan naik/turun.",
      "voiceGuide": "Pilih jawaban terkait banding dan urut bilangan.",
      "diagramType": "jodoh",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memori-b-p",
      "title": "Diagram Memori Urutan",
      "bookReference": "hlm. 284–287",
      "objective": "Bandingkan dan urutkan dengan Leftmost Place Priority dan Ordering Protocol.",
      "mechanicDescription": "Tiga ronde: banding digit kiri, simbol, urutan naik/turun.",
      "voiceGuide": "Pilih jawaban terkait banding dan urut bilangan.",
      "diagramType": "memori",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-b-p",
      "title": "Diagram Ketuk Terbesar",
      "bookReference": "hlm. 284–287",
      "objective": "Bandingkan dan urutkan dengan Leftmost Place Priority dan Ordering Protocol.",
      "mechanicDescription": "Tiga ronde: banding digit kiri, simbol, urutan naik/turun.",
      "voiceGuide": "Pilih jawaban terkait banding dan urut bilangan.",
      "diagramType": "ketuk",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "semua-b-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 284–287",
      "objective": "Bandingkan dan urutkan dengan Leftmost Place Priority dan Ordering Protocol.",
      "mechanicDescription": "Tiga ronde: banding digit kiri, simbol, urutan naik/turun.",
      "voiceGuide": "Pilih jawaban terkait banding dan urut bilangan.",
      "diagramType": "semua",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "cerita-b-p",
      "title": "Diagram Cerita Sepatu",
      "bookReference": "hlm. 284–287",
      "objective": "Bandingkan dan urutkan dengan Leftmost Place Priority dan Ordering Protocol.",
      "mechanicDescription": "Tiga ronde: banding digit kiri, simbol, urutan naik/turun.",
      "voiceGuide": "Pilih jawaban terkait banding dan urut bilangan.",
      "diagramType": "cerita",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "urut-b-p",
      "title": "Diagram Urutkan Bilangan",
      "bookReference": "hlm. 284–287",
      "objective": "Bandingkan dan urutkan dengan Leftmost Place Priority dan Ordering Protocol.",
      "mechanicDescription": "Tiga ronde: banding digit kiri, simbol, urutan naik/turun.",
      "voiceGuide": "Pilih jawaban terkait banding dan urut bilangan.",
      "diagramType": "urut",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-b-a",
      "title": "Tulis Hitung Selisih Tempat",
      "bookReference": "hlm. 284–287",
      "objective": "Bandingkan dan urutkan dengan Leftmost Place Priority dan Ordering Protocol.",
      "mechanicDescription": "Tiga ronde: banding digit kiri, simbol, urutan naik/turun.",
      "voiceGuide": "Pilih jawaban terkait banding dan urut bilangan.",
      "symbolLarge": ">",
      "wordLarge": "BANDING",
      "mathNotation": "kiri dulu"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-b-a",
      "title": "Tulis Arti Banding Kiri",
      "bookReference": "hlm. 284–287",
      "objective": "Bandingkan dan urutkan dengan Leftmost Place Priority dan Ordering Protocol.",
      "mechanicDescription": "Tiga ronde: banding digit kiri, simbol, urutan naik/turun.",
      "voiceGuide": "Pilih jawaban terkait banding dan urut bilangan.",
      "symbolLarge": ">",
      "wordLarge": "BANDING",
      "mathNotation": "kiri dulu"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-b-a",
      "title": "Tulis Pilih Lebih Besar",
      "bookReference": "hlm. 284–287",
      "objective": "Bandingkan dan urutkan dengan Leftmost Place Priority dan Ordering Protocol.",
      "mechanicDescription": "Tiga ronde: banding digit kiri, simbol, urutan naik/turun.",
      "voiceGuide": "Pilih jawaban terkait banding dan urut bilangan.",
      "symbolLarge": ">",
      "wordLarge": "BANDING",
      "mathNotation": "kiri dulu"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-b-a",
      "title": "Tulis Pilah Naik/Turun",
      "bookReference": "hlm. 284–287",
      "objective": "Bandingkan dan urutkan dengan Leftmost Place Priority dan Ordering Protocol.",
      "mechanicDescription": "Tiga ronde: banding digit kiri, simbol, urutan naik/turun.",
      "voiceGuide": "Pilih jawaban terkait banding dan urut bilangan.",
      "symbolLarge": ">",
      "wordLarge": "BANDING",
      "mathNotation": "kiri dulu"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-b-a",
      "title": "Tulis Jodohkan Pasangan Banding",
      "bookReference": "hlm. 284–287",
      "objective": "Bandingkan dan urutkan dengan Leftmost Place Priority dan Ordering Protocol.",
      "mechanicDescription": "Tiga ronde: banding digit kiri, simbol, urutan naik/turun.",
      "voiceGuide": "Pilih jawaban terkait banding dan urut bilangan.",
      "symbolLarge": ">",
      "wordLarge": "BANDING",
      "mathNotation": "kiri dulu"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-b-a",
      "title": "Tulis Memori Urutan",
      "bookReference": "hlm. 284–287",
      "objective": "Bandingkan dan urutkan dengan Leftmost Place Priority dan Ordering Protocol.",
      "mechanicDescription": "Tiga ronde: banding digit kiri, simbol, urutan naik/turun.",
      "voiceGuide": "Pilih jawaban terkait banding dan urut bilangan.",
      "symbolLarge": ">",
      "wordLarge": "BANDING",
      "mathNotation": "kiri dulu"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-b",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 284–287",
      "objective": "Bandingkan dan urutkan dengan Leftmost Place Priority dan Ordering Protocol.",
      "mechanicDescription": "Dua ronde menilai pernyataan.",
      "voiceGuide": "Benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-b",
      "title": "Detektif Bilangan",
      "bookReference": "hlm. 284–287",
      "objective": "Bandingkan dan urutkan dengan Leftmost Place Priority dan Ordering Protocol.",
      "mechanicDescription": "Tiga soal petunjuk.",
      "voiceGuide": "Pilih dari petunjuk.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "peta-b",
      "title": "Peta Konsep",
      "bookReference": "hlm. 284–287",
      "objective": "Bandingkan dan urutkan dengan Leftmost Place Priority dan Ordering Protocol.",
      "mechanicDescription": "Satu peta konsep.",
      "voiceGuide": "Pilih isi kotak.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "cerita-q-b",
      "title": "Cerita Angka",
      "bookReference": "hlm. 284–287",
      "objective": "Bandingkan dan urutkan dengan Leftmost Place Priority dan Ordering Protocol.",
      "mechanicDescription": "Tiga ronde cerita.",
      "voiceGuide": "Baca lalu pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "⬅️",
      "nama": "Kiri dulu",
      "isi": "Bandingkan nilai tempat terbesar lebih dulu (Leftmost Place Priority).",
      "suara": "Sepatu Lukas."
    },
    {
      "ikon": "🔢",
      "nama": "Digit",
      "isi": "Jika sama, geser ke kanan satu tempat (Digit-by-Digit Comparison).",
      "suara": "599.198 > 599.047."
    },
    {
      "ikon": "🔣",
      "nama": "Simbol",
      "isi": "Pakai lebih besar, lebih kecil, atau sama dengan.",
      "suara": "Notasi."
    },
    {
      "ikon": "📶",
      "nama": "Urut",
      "isi": "Ulangi banding untuk menyusun naik atau turun (Ordering Protocol).",
      "suara": "Data wisata/latihan."
    }
  ],
  "poinSuara": "Ingat: mulai dari ratus ribuan, bandingkan digit, jika sama geser kanan, lalu susun naik atau turun.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Samakan penulisan",
        "warna": "#FDE68A"
      },
      {
        "teks": "banding dari kiri",
        "warna": "#BBF7D0"
      },
      {
        "teks": "geser jika sama",
        "warna": "#BFDBFE"
      },
      {
        "teks": "urutkan naik/turun",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: tulis empat harga mainan, urutkan dari termurah ke termahal dengan protokol kiri dulu.",
  "refleksi": [
    "Mengapa tidak boleh mulai banding dari satuan?",
    "Mana lebih besar: 789.876 atau 789.867?",
    "Apa arti Leftmost Place Priority?"
  ]
};
export const SUB_C59: SubBabNaskah = {
  "id": "C",
  "codeTitle": "Sub-Bab C (Komposisi & Dekomposisi)",
  "fullTitle": "Sub-Bab C: Komposisi dan Dekomposisi sampai 1.000.000",
  "targetDescription": "Siswa menyusun bilangan dari nilai-nilai tempat (komposisi) dan menguraikan bilangan menjadi jumlah nilai tempat (dekomposisi) sampai 1.000.000 sesuai Buku Siswa Kelas V Bab 9 Sub-Bab C hlm. 287–290.",
  "secondaryBg": "#DCFCE7",
  "secondaryBorder": "#15803D",
  "secondaryText": "#14532D",
  "silabus": {
    "teksSuara": "Komposisi berarti menyusun bilangan dari bagian nilai tempat. Contoh: 3 ratus ribuan + 2 puluh ribuan + 7 ribuan + 1 ratusan = 327.100. Dekomposisi memecah bilangan menjadi jumlah bagian tempat. METODE LUAR Part-Whole Place Model, Expanded Form Composition, dan Flexible Decomposition. Satu bilangan bisa diuraikan dengan beberapa cara yang sah selama jumlahnya sama. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa melakukan komposisi dan dekomposisi bilangan cacah sampai 1.000.000.",
    "referensi": "Buku Siswa Matematika Kelas V Bab 9 Sub-Bab C hlm. 287–290; METODE LUAR · Part-Whole Place Model; Expanded Form Composition; Flexible Decomposition."
  },
  "videos": [
    {
      "id": "K5B9C-V1",
      "judul": "Susun dari Bagian",
      "subjudul": "Composition",
      "adegan": [
        {
          "id": "K5B9C-V1-1",
          "judul": "Apa komposisi",
          "ketukan": [
            "Komposisi: menyusun bilangan dari nilai tempat.",
            "Contoh buku: 3 ratus ribuan, 2 puluh ribuan, 7 ribuan, 1 ratusan → 327.100.",
            "METODE LUAR · Expanded Form Composition.",
            "Jumlahkan nilai setiap bagian."
          ],
          "papan": [
            "susun bagian",
            "327.100",
            "Expanded Form",
            "jumlahkan"
          ]
        },
        {
          "id": "K5B9C-V1-2",
          "judul": "Part-Whole",
          "ketukan": [
            "METODE LUAR · Part-Whole Place Model: bagian-bagian tempat membentuk bilangan utuh.",
            "Jangan lupa nol jika suatu tempat kosong, misalnya 203.305.",
            "2 ratus ribuan + 3 ribuan + 3 puluhan + 5 satuan.",
            "Cek dengan tabel nilai tempat."
          ],
          "papan": [
            "Part-Whole",
            "nol penting",
            "203.305",
            "cek tabel"
          ]
        },
        {
          "id": "K5B9C-V1-3",
          "judul": "Latihan susun",
          "ketukan": [
            "5 ratus ribuan + 5 ribuan + 4 ratusan + 1 satuan = 505.401.",
            "8 ratus ribuan + 5 puluh ribuan + 7 ribuan + 2 ratusan + 5 puluhan + 9 satuan.",
            "Hasil: 857.259.",
            "Baca ulang hasil komposisi."
          ],
          "papan": [
            "505.401",
            "857.259",
            "latihan",
            "baca ulang"
          ]
        }
      ]
    },
    {
      "id": "K5B9C-V2",
      "judul": "Uraikan Bilangan",
      "subjudul": "Decomposition",
      "adegan": [
        {
          "id": "K5B9C-V2-1",
          "judul": "Apa dekomposisi",
          "ketukan": [
            "Dekomposisi: menguraikan bilangan menjadi jumlah nilai tempat.",
            "599.198 = 5 ratus ribuan + 9 puluh ribuan + 9 ribuan + 1 ratusan + 9 puluhan + 8 satuan.",
            "METODE LUAR · Flexible Decomposition.",
            "Boleh digabung fleksibel asal total sama."
          ],
          "papan": [
            "uraikan",
            "599.198",
            "Flexible",
            "total sama"
          ]
        },
        {
          "id": "K5B9C-V2-2",
          "judul": "Beberapa cara",
          "ketukan": [
            "Buku menampilkan beberapa cara menguraikan uang atau bilangan.",
            "Cara 1 sampai Cara 4: beda pecahan tempat, jumlah sama.",
            "Contoh fleksibel: 1 ratus ribuan = 10 puluh ribuan.",
            "Pilih cara yang memudahkan hitung."
          ],
          "papan": [
            "banyak cara",
            "jumlah sama",
            "10× tukar tempat",
            "pilih mudah"
          ]
        },
        {
          "id": "K5B9C-V2-3",
          "judul": "Cek pasangan",
          "ketukan": [
            "Komposisi dan dekomposisi saling balik.",
            "Susun lalu uraikan lagi harus kembali ke bilangan awal.",
            "Jika tidak kembali, ada digit atau nol yang salah.",
            "Latihan pasangan A–B di uji kompetensi buku."
          ],
          "papan": [
            "saling balik",
            "kembali awal",
            "cek nol",
            "latihan"
          ]
        }
      ]
    },
    {
      "id": "K5B9C-V3",
      "judul": "Rangkum A–C",
      "subjudul": "Bab 9",
      "adegan": [
        {
          "id": "K5B9C-V3-1",
          "judul": "Alur bab",
          "ketukan": [
            "A: baca, tulis, nilai tempat.",
            "B: banding dan urut dari kiri.",
            "C: komposisi dan dekomposisi.",
            "Semua bertumpu pada nilai tempat sampai sejuta."
          ],
          "papan": [
            "A tempat",
            "B banding",
            "C susun/urai",
            "nilai tempat"
          ]
        },
        {
          "id": "K5B9C-V3-2",
          "judul": "Label metode",
          "ketukan": [
            "Place Value Chart, Number-Name Mapping, Digit-Place Link.",
            "Leftmost Priority, Digit-by-Digit, Ordering Protocol.",
            "Part-Whole, Expanded Form, Flexible Decomposition.",
            "Pakai label saat menjelaskan ke teman."
          ],
          "papan": [
            "metode A",
            "metode B",
            "metode C",
            "jelaskan"
          ]
        },
        {
          "id": "K5B9C-V3-3",
          "judul": "Materi siap",
          "ketukan": [
            "Tab Materi Bab 9 Sub-Bab A sampai C siap dimainkan.",
            "Latihan dan ujian menyusul instruksi terpisah.",
            "Mainkan Concrete, Picture, Abstract.",
            "Hebat, master bilangan sejuta!"
          ],
          "papan": [
            "Materi A–C",
            "tanpa Latihan dulu",
            "30×3 permainan",
            "hebat"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pilih bilangan",
      "stepDesc": "Baca soal Komposisi dan Dekomposisi sampai 1.000.000 dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Target Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa menyusun bilangan dari nilai-nilai tempat (komposisi) dan menguraikan bilangan menjadi jumlah nilai tempat (dekomp….",
      "icon": "🎯",
      "flowFrom": "Pilih bilangan",
      "flowTo": "Pecah tempat"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Pecah tempat",
      "stepDesc": "Part-Whole. Pada Komposisi dan Dekomposisi sampai 1.000.000, langkah “Pecah tempat” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🧩",
      "flowFrom": "Pecah tempat",
      "flowTo": "Tulis bagian"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Tulis bagian",
      "stepDesc": "Expanded. Pada Komposisi dan Dekomposisi sampai 1.000.000, langkah “Tulis bagian” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "✍️",
      "flowFrom": "Tulis bagian",
      "flowTo": "Jumlahkan / uraikan"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Jumlahkan / uraikan",
      "stepDesc": "Komposisi↔Dekomposisi. Pada Komposisi dan Dekomposisi sampai 1.000.000, langkah “Jumlahkan / uraikan” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🔄",
      "flowFrom": "Jumlahkan / uraikan",
      "flowTo": "Cek nol"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Cek nol",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Komposisi dan Dekomposisi sampai 1.000.000. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "0",
      "flowFrom": "Cek nol",
      "flowTo": "Baca ulang"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Baca ulang",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Komposisi dan Dekomposisi sampai 1.000.000. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Baca ulang",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Komposisi",
      "emoji": "🧱",
      "countNum": 1,
      "countWord": "susun bagian",
      "suara": "Expanded."
    },
    {
      "judul": "Dekomposisi",
      "emoji": "🧩",
      "countNum": 1,
      "countWord": "uraikan",
      "suara": "Flexible."
    },
    {
      "judul": "327.100",
      "emoji": "➕",
      "countNum": 327100,
      "countWord": "contoh susun",
      "suara": "Buku."
    },
    {
      "judul": "203.305",
      "emoji": "0",
      "countNum": 203305,
      "countWord": "nol penting",
      "suara": "Part-Whole."
    },
    {
      "judul": "505.401",
      "emoji": "➕",
      "countNum": 505401,
      "countWord": "latihan",
      "suara": "Susun."
    },
    {
      "judul": "857.259",
      "emoji": "➕",
      "countNum": 857259,
      "countWord": "latihan",
      "suara": "Susun."
    },
    {
      "judul": "599.198",
      "emoji": "🧩",
      "countNum": 599198,
      "countWord": "urai",
      "suara": "Dekomposisi."
    },
    {
      "judul": "10× tukar",
      "emoji": "🔄",
      "countNum": 10,
      "countWord": "1 ratus rb=10 puluh rb",
      "suara": "Fleksibel."
    },
    {
      "judul": "Balikan",
      "emoji": "↔️",
      "countNum": 1,
      "countWord": "susun↔urai",
      "suara": "Cek."
    },
    {
      "judul": "Bab 9 A–C",
      "emoji": "🎉",
      "countNum": 1,
      "countWord": "Materi siap",
      "suara": "Selesai."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-c-c",
      "title": "Hitung Hasil Komposisi",
      "bookReference": "hlm. 287–290",
      "objective": "Susun dan uraikan bilangan dengan Part-Whole Place Model dan Flexible Decomposition.",
      "mechanicDescription": "Tiga ronde: komposisi, dekomposisi, cek balik.",
      "voiceGuide": "Pilih jawaban terkait komposisi dan dekomposisi.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-c-c",
      "title": "Arti Dekomposisi",
      "bookReference": "hlm. 287–290",
      "objective": "Susun dan uraikan bilangan dengan Part-Whole Place Model dan Flexible Decomposition.",
      "mechanicDescription": "Tiga ronde: komposisi, dekomposisi, cek balik.",
      "voiceGuide": "Pilih jawaban terkait komposisi dan dekomposisi.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-c-c",
      "title": "Pilih Uraian Benar",
      "bookReference": "hlm. 287–290",
      "objective": "Susun dan uraikan bilangan dengan Part-Whole Place Model dan Flexible Decomposition.",
      "mechanicDescription": "Tiga ronde: komposisi, dekomposisi, cek balik.",
      "voiceGuide": "Pilih jawaban terkait komposisi dan dekomposisi.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-c-c",
      "title": "Pilah Susun/Urai",
      "bookReference": "hlm. 287–290",
      "objective": "Susun dan uraikan bilangan dengan Part-Whole Place Model dan Flexible Decomposition.",
      "mechanicDescription": "Tiga ronde: komposisi, dekomposisi, cek balik.",
      "voiceGuide": "Pilih jawaban terkait komposisi dan dekomposisi.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-c-c",
      "title": "Jodohkan Bagian Tempat",
      "bookReference": "hlm. 287–290",
      "objective": "Susun dan uraikan bilangan dengan Part-Whole Place Model dan Flexible Decomposition.",
      "mechanicDescription": "Tiga ronde: komposisi, dekomposisi, cek balik.",
      "voiceGuide": "Pilih jawaban terkait komposisi dan dekomposisi.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-c-c",
      "title": "Memori Komposisi",
      "bookReference": "hlm. 287–290",
      "objective": "Susun dan uraikan bilangan dengan Part-Whole Place Model dan Flexible Decomposition.",
      "mechanicDescription": "Tiga ronde: komposisi, dekomposisi, cek balik.",
      "voiceGuide": "Pilih jawaban terkait komposisi dan dekomposisi.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-c-c",
      "title": "Ketuk Bagian",
      "bookReference": "hlm. 287–290",
      "objective": "Susun dan uraikan bilangan dengan Part-Whole Place Model dan Flexible Decomposition.",
      "mechanicDescription": "Tiga ronde: komposisi, dekomposisi, cek balik.",
      "voiceGuide": "Pilih jawaban terkait komposisi dan dekomposisi.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-c-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 287–290",
      "objective": "Susun dan uraikan bilangan dengan Part-Whole Place Model dan Flexible Decomposition.",
      "mechanicDescription": "Tiga ronde: komposisi, dekomposisi, cek balik.",
      "voiceGuide": "Pilih jawaban terkait komposisi dan dekomposisi.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-c-c",
      "title": "Cerita Uang Ibu",
      "bookReference": "hlm. 287–290",
      "objective": "Susun dan uraikan bilangan dengan Part-Whole Place Model dan Flexible Decomposition.",
      "mechanicDescription": "Tiga ronde: komposisi, dekomposisi, cek balik.",
      "voiceGuide": "Pilih jawaban terkait komposisi dan dekomposisi.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-c-c",
      "title": "Urutkan Nilai Bagian",
      "bookReference": "hlm. 287–290",
      "objective": "Susun dan uraikan bilangan dengan Part-Whole Place Model dan Flexible Decomposition.",
      "mechanicDescription": "Tiga ronde: komposisi, dekomposisi, cek balik.",
      "voiceGuide": "Pilih jawaban terkait komposisi dan dekomposisi.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-c-p",
      "title": "Diagram Hitung Hasil Komposisi",
      "bookReference": "hlm. 287–290",
      "objective": "Susun dan uraikan bilangan dengan Part-Whole Place Model dan Flexible Decomposition.",
      "mechanicDescription": "Tiga ronde: komposisi, dekomposisi, cek balik.",
      "voiceGuide": "Pilih jawaban terkait komposisi dan dekomposisi.",
      "diagramType": "hitung",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "rumus-c-p",
      "title": "Diagram Arti Dekomposisi",
      "bookReference": "hlm. 287–290",
      "objective": "Susun dan uraikan bilangan dengan Part-Whole Place Model dan Flexible Decomposition.",
      "mechanicDescription": "Tiga ronde: komposisi, dekomposisi, cek balik.",
      "voiceGuide": "Pilih jawaban terkait komposisi dan dekomposisi.",
      "diagramType": "rumus",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "arti-c-p",
      "title": "Diagram Pilih Uraian Benar",
      "bookReference": "hlm. 287–290",
      "objective": "Susun dan uraikan bilangan dengan Part-Whole Place Model dan Flexible Decomposition.",
      "mechanicDescription": "Tiga ronde: komposisi, dekomposisi, cek balik.",
      "voiceGuide": "Pilih jawaban terkait komposisi dan dekomposisi.",
      "diagramType": "arti",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sortir-c-p",
      "title": "Diagram Pilah Susun/Urai",
      "bookReference": "hlm. 287–290",
      "objective": "Susun dan uraikan bilangan dengan Part-Whole Place Model dan Flexible Decomposition.",
      "mechanicDescription": "Tiga ronde: komposisi, dekomposisi, cek balik.",
      "voiceGuide": "Pilih jawaban terkait komposisi dan dekomposisi.",
      "diagramType": "sortir",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-c-p",
      "title": "Diagram Jodohkan Bagian Tempat",
      "bookReference": "hlm. 287–290",
      "objective": "Susun dan uraikan bilangan dengan Part-Whole Place Model dan Flexible Decomposition.",
      "mechanicDescription": "Tiga ronde: komposisi, dekomposisi, cek balik.",
      "voiceGuide": "Pilih jawaban terkait komposisi dan dekomposisi.",
      "diagramType": "jodoh",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memori-c-p",
      "title": "Diagram Memori Komposisi",
      "bookReference": "hlm. 287–290",
      "objective": "Susun dan uraikan bilangan dengan Part-Whole Place Model dan Flexible Decomposition.",
      "mechanicDescription": "Tiga ronde: komposisi, dekomposisi, cek balik.",
      "voiceGuide": "Pilih jawaban terkait komposisi dan dekomposisi.",
      "diagramType": "memori",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-c-p",
      "title": "Diagram Ketuk Bagian",
      "bookReference": "hlm. 287–290",
      "objective": "Susun dan uraikan bilangan dengan Part-Whole Place Model dan Flexible Decomposition.",
      "mechanicDescription": "Tiga ronde: komposisi, dekomposisi, cek balik.",
      "voiceGuide": "Pilih jawaban terkait komposisi dan dekomposisi.",
      "diagramType": "ketuk",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "semua-c-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 287–290",
      "objective": "Susun dan uraikan bilangan dengan Part-Whole Place Model dan Flexible Decomposition.",
      "mechanicDescription": "Tiga ronde: komposisi, dekomposisi, cek balik.",
      "voiceGuide": "Pilih jawaban terkait komposisi dan dekomposisi.",
      "diagramType": "semua",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "cerita-c-p",
      "title": "Diagram Cerita Uang Ibu",
      "bookReference": "hlm. 287–290",
      "objective": "Susun dan uraikan bilangan dengan Part-Whole Place Model dan Flexible Decomposition.",
      "mechanicDescription": "Tiga ronde: komposisi, dekomposisi, cek balik.",
      "voiceGuide": "Pilih jawaban terkait komposisi dan dekomposisi.",
      "diagramType": "cerita",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "urut-c-p",
      "title": "Diagram Urutkan Nilai Bagian",
      "bookReference": "hlm. 287–290",
      "objective": "Susun dan uraikan bilangan dengan Part-Whole Place Model dan Flexible Decomposition.",
      "mechanicDescription": "Tiga ronde: komposisi, dekomposisi, cek balik.",
      "voiceGuide": "Pilih jawaban terkait komposisi dan dekomposisi.",
      "diagramType": "urut",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-c-a",
      "title": "Tulis Hitung Hasil Komposisi",
      "bookReference": "hlm. 287–290",
      "objective": "Susun dan uraikan bilangan dengan Part-Whole Place Model dan Flexible Decomposition.",
      "mechanicDescription": "Tiga ronde: komposisi, dekomposisi, cek balik.",
      "voiceGuide": "Pilih jawaban terkait komposisi dan dekomposisi.",
      "symbolLarge": "➕",
      "wordLarge": "KOMPOSISI",
      "mathNotation": "part-whole"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-c-a",
      "title": "Tulis Arti Dekomposisi",
      "bookReference": "hlm. 287–290",
      "objective": "Susun dan uraikan bilangan dengan Part-Whole Place Model dan Flexible Decomposition.",
      "mechanicDescription": "Tiga ronde: komposisi, dekomposisi, cek balik.",
      "voiceGuide": "Pilih jawaban terkait komposisi dan dekomposisi.",
      "symbolLarge": "➕",
      "wordLarge": "KOMPOSISI",
      "mathNotation": "part-whole"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-c-a",
      "title": "Tulis Pilih Uraian Benar",
      "bookReference": "hlm. 287–290",
      "objective": "Susun dan uraikan bilangan dengan Part-Whole Place Model dan Flexible Decomposition.",
      "mechanicDescription": "Tiga ronde: komposisi, dekomposisi, cek balik.",
      "voiceGuide": "Pilih jawaban terkait komposisi dan dekomposisi.",
      "symbolLarge": "➕",
      "wordLarge": "KOMPOSISI",
      "mathNotation": "part-whole"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-c-a",
      "title": "Tulis Pilah Susun/Urai",
      "bookReference": "hlm. 287–290",
      "objective": "Susun dan uraikan bilangan dengan Part-Whole Place Model dan Flexible Decomposition.",
      "mechanicDescription": "Tiga ronde: komposisi, dekomposisi, cek balik.",
      "voiceGuide": "Pilih jawaban terkait komposisi dan dekomposisi.",
      "symbolLarge": "➕",
      "wordLarge": "KOMPOSISI",
      "mathNotation": "part-whole"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-c-a",
      "title": "Tulis Jodohkan Bagian Tempat",
      "bookReference": "hlm. 287–290",
      "objective": "Susun dan uraikan bilangan dengan Part-Whole Place Model dan Flexible Decomposition.",
      "mechanicDescription": "Tiga ronde: komposisi, dekomposisi, cek balik.",
      "voiceGuide": "Pilih jawaban terkait komposisi dan dekomposisi.",
      "symbolLarge": "➕",
      "wordLarge": "KOMPOSISI",
      "mathNotation": "part-whole"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-c-a",
      "title": "Tulis Memori Komposisi",
      "bookReference": "hlm. 287–290",
      "objective": "Susun dan uraikan bilangan dengan Part-Whole Place Model dan Flexible Decomposition.",
      "mechanicDescription": "Tiga ronde: komposisi, dekomposisi, cek balik.",
      "voiceGuide": "Pilih jawaban terkait komposisi dan dekomposisi.",
      "symbolLarge": "➕",
      "wordLarge": "KOMPOSISI",
      "mathNotation": "part-whole"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-c",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 287–290",
      "objective": "Susun dan uraikan bilangan dengan Part-Whole Place Model dan Flexible Decomposition.",
      "mechanicDescription": "Dua ronde menilai pernyataan.",
      "voiceGuide": "Benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-c",
      "title": "Detektif Bilangan",
      "bookReference": "hlm. 287–290",
      "objective": "Susun dan uraikan bilangan dengan Part-Whole Place Model dan Flexible Decomposition.",
      "mechanicDescription": "Tiga soal petunjuk.",
      "voiceGuide": "Pilih dari petunjuk.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "peta-c",
      "title": "Peta Konsep",
      "bookReference": "hlm. 287–290",
      "objective": "Susun dan uraikan bilangan dengan Part-Whole Place Model dan Flexible Decomposition.",
      "mechanicDescription": "Satu peta konsep.",
      "voiceGuide": "Pilih isi kotak.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "cerita-q-c",
      "title": "Cerita Angka",
      "bookReference": "hlm. 287–290",
      "objective": "Susun dan uraikan bilangan dengan Part-Whole Place Model dan Flexible Decomposition.",
      "mechanicDescription": "Tiga ronde cerita.",
      "voiceGuide": "Baca lalu pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "🧱",
      "nama": "Komposisi",
      "isi": "Jumlahkan nilai tempat untuk membentuk bilangan (Expanded Form Composition).",
      "suara": "327.100."
    },
    {
      "ikon": "🧩",
      "nama": "Dekomposisi",
      "isi": "Uraikan bilangan menjadi jumlah nilai tempat (Flexible Decomposition).",
      "suara": "599.198."
    },
    {
      "ikon": "0",
      "nama": "Nol",
      "isi": "Tempat kosong tetap nol agar nilai tidak bergeser (Part-Whole Place Model).",
      "suara": "203.305."
    },
    {
      "ikon": "🔄",
      "nama": "Balikan",
      "isi": "Susun lalu uraikan harus kembali ke bilangan awal.",
      "suara": "Validasi."
    }
  ],
  "poinSuara": "Ingat: komposisi menjumlahkan bagian tempat, dekomposisi menguraikan, jaga nol, dan cek dengan membalik proses.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Tentukan bagian tempat",
        "warna": "#FDE68A"
      },
      {
        "teks": "jumlahkan atau uraikan",
        "warna": "#BBF7D0"
      },
      {
        "teks": "jaga nol",
        "warna": "#BFDBFE"
      },
      {
        "teks": "cek balik",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: uraikan uang saku mingguan ke ratusan/puluhan/satuan ribu, lalu susun kembali.",
  "refleksi": [
    "Apa bedanya komposisi dan dekomposisi?",
    "Mengapa nol penting pada 203.305?",
    "Sebut satu cara fleksibel menguraikan 100.000."
  ]
};

export const SUB_BAB_K5B9: SubBabNaskah[] = [SUB_A59, SUB_B59, SUB_C59];
export const semuaAdeganK5B9 = SUB_BAB_K5B9.flatMap((s) => s.videos.flatMap((v) => v.adegan));
