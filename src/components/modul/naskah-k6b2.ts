/**
 * Naskah Matematika Kelas 6 Bab 2 — Rasio (mendalam + metode luar berlabel).
 * Sumber buku: Kemendikbudristek Bab 2 hlm. 59–88. Sub-Bab A–C (Materi).
 * Satu sumber: buat-k6-bab2.mjs → kelas6-bab2.json. Tanpa React/jaringan.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K6B2_META = {
  "chapterId": "k6-mat-bab2",
  "phaseCode": "FASE_C",
  "grade": 6,
  "subjectLabel": "MATEMATIKA - KELAS 6 SD",
  "title": "BAB 2: RASIO",
  "silabusElemen": "🌈 Fase C • Elemen Bilangan: Konsep Rasio, Kesamaan Rasio, dan Penerapan Rasio (Kelas 6 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A62: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Konsep Rasio)",
  "fullTitle": "Sub-Bab A: Konsep Rasio",
  "targetDescription": "Siswa memahami rasio sebagai perbandingan dua besaran sejenis, menulis a:b, menyederhanakan, dan membedakan arah a:b dengan b:a sesuai Buku Siswa Kelas VI Bab 2 Sub-Bab A hlm. 64–69.",
  "secondaryBg": "#FFEDD5",
  "secondaryBorder": "#EA580C",
  "secondaryText": "#7C2D12",
  "silabus": {
    "teksSuara": "Artus membandingkan paket bibit pohon. Rasio adalah perbandingan dua besaran yang sama. Empat pohon pucuk merah berbanding enam cemara ditulis 4 banding 6, disederhanakan 2 banding 3. METODE LUAR Part-to-Part Ratio Language: baca setiap a ada b. METODE LUAR Ordered-Ratio Protocol: a banding b berbeda makna dengan b banding a. METODE LUAR GCF Simplify Ratio: bagi kedua suku dengan FPB. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa memahami konsep rasio, menyatakan perbandingan dua besaran, dan menyederhanakan rasio.",
    "referensi": "Buku Siswa Matematika Kelas VI Bab 2 Sub-Bab A hlm. 64–69; Part-to-Part Ratio Language; Ordered-Ratio Protocol; GCF Simplify Ratio."
  },
  "videos": [
    {
      "id": "K6B2A-V1",
      "judul": "Paket Bibit & Banding",
      "subjudul": "Membandingkan",
      "adegan": [
        {
          "id": "K6B2A-V1-1",
          "judul": "Dua paket bibit",
          "ketukan": [
            "Artus melihat paket A Rp50.000 dan paket B Rp40.000.",
            "Membandingkan jumlah dan harga saja belum cukup adil.",
            "Perlu membandingkan hubungan banyak terhadap banyak.",
            "Ini pintu masuk konsep rasio."
          ],
          "papan": [
            "paket A & B",
            "banding harga",
            "perlu hubungan",
            "pintu rasio"
          ]
        },
        {
          "id": "K6B2A-V1-2",
          "judul": "Pucuk merah : cemara",
          "ketukan": [
            "Di lahan: 4 pucuk merah dan 6 cemara.",
            "Ditulis rasio 4 : 6.",
            "METODE LUAR · Part-to-Part Ratio Language.",
            "Artinya: setiap 4 pucuk merah ada 6 cemara."
          ],
          "papan": [
            "4 : 6",
            "part-to-part",
            "setiap 4 ada 6",
            "bahasa rasio"
          ]
        },
        {
          "id": "K6B2A-V1-3",
          "judul": "Sederhanakan",
          "ketukan": [
            "4 : 6 = 2 : 3 setelah dibagi FPB 2.",
            "METODE LUAR · GCF Simplify Ratio.",
            "Bentuk paling sederhana memudahkan baca.",
            "Siap ke arah rasio."
          ],
          "papan": [
            "4:6 → 2:3",
            "FPB 2",
            "sederhana",
            "lanjut"
          ]
        }
      ]
    },
    {
      "id": "K6B2A-V2",
      "judul": "Arah Rasio a:b",
      "subjudul": "Ordered",
      "adegan": [
        {
          "id": "K6B2A-V2-1",
          "judul": "2:3 bukan 3:2",
          "ketukan": [
            "Rasio pucuk merah terhadap cemara 2 : 3.",
            "Setiap 2 pucuk merah ada 3 cemara.",
            "Jika 3 : 2, makna berbalik.",
            "METODE LUAR · Ordered-Ratio Protocol."
          ],
          "papan": [
            "2:3",
            "bukan 3:2",
            "arah penting",
            "Ordered"
          ]
        },
        {
          "id": "K6B2A-V2-2",
          "judul": "Perluas lahan",
          "ketukan": [
            "Jika pucuk merah 14, berapa cemara agar rasio 2 : 3?",
            "14 ÷ 2 = 7; 7 × 3 = 21 cemara.",
            "Kalikan kedua suku dengan bilangan sama.",
            "Ini bayangan kesamaan rasio di Sub-Bab B."
          ],
          "papan": [
            "14 pucuk",
            "21 cemara",
            "× sama",
            "bayangan B"
          ]
        },
        {
          "id": "K6B2A-V2-3",
          "judul": "Wahana & antre",
          "ketukan": [
            "Rasio pengunjung bianglala : roller 4 : 3.",
            "Jika roller 24 orang, bianglala = 32.",
            "4/3 × 24 = 32.",
            "Cerita taman hiburan memperkuat arti rasio."
          ],
          "papan": [
            "4:3",
            "24 → 32",
            "skala",
            "taman"
          ]
        }
      ]
    },
    {
      "id": "K6B2A-V3",
      "judul": "Latihan Makna & Siap B",
      "subjudul": "Ayo",
      "adegan": [
        {
          "id": "K6B2A-V3-1",
          "judul": "Bahasa rasio",
          "ketukan": [
            "Selalu sebutkan 'terhadap' atau 'berbanding'.",
            "Sebut satuan bila ada: pohon, orang, meter.",
            "Jangan tertukar kiri-kanan.",
            "Cek sederhanakan dengan FPB."
          ],
          "papan": [
            "bahasa jelas",
            "satuan",
            "arah",
            "FPB"
          ]
        },
        {
          "id": "K6B2A-V3-2",
          "judul": "Kesalahan umum",
          "ketukan": [
            "Salah: menganggap 2:3 sama 3:2.",
            "Salah: hanya bagi satu suku.",
            "Salah: membandingkan besaran beda jenis tanpa konteks.",
            "Cek dengan kalimat 'setiap a ada b'."
          ],
          "papan": [
            "arah beda",
            "bagi keduanya",
            "sejenis",
            "cek kalimat"
          ]
        },
        {
          "id": "K6B2A-V3-3",
          "judul": "Siap B",
          "ketukan": [
            "Konsep rasio siap.",
            "Berikutnya: kesamaan rasio, tabel, dan rasio satuan.",
            "Prinsip sama dengan pecahan senilai.",
            "Ayo Sub-Bab B!"
          ],
          "papan": [
            "A siap",
            "kesamaan",
            "pecahan senilai",
            "ke B"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Banding benda",
      "stepDesc": "Baca soal Konsep Rasio dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Jumlah/harga Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa memahami rasio sebagai perbandingan dua besaran sejenis, menulis a:b, menyederhanakan, dan membedakan arah a:b den….",
      "icon": "🌱",
      "flowFrom": "Banding benda",
      "flowTo": "Tulis a:b"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Tulis a:b",
      "stepDesc": "Part-to-Part. Pada Konsep Rasio, langkah “Tulis a:b” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": ":",
      "flowFrom": "Tulis a:b",
      "flowTo": "Baca makna"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Baca makna",
      "stepDesc": "setiap a ada b. Pada Konsep Rasio, langkah “Baca makna” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🗣️",
      "flowFrom": "Baca makna",
      "flowTo": "Sederhanakan"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Sederhanakan",
      "stepDesc": "bagi FPB. Pada Konsep Rasio, langkah “Sederhanakan” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "÷",
      "flowFrom": "Sederhanakan",
      "flowTo": "Jaga arah"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Jaga arah",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Konsep Rasio. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "↔️",
      "flowFrom": "Jaga arah",
      "flowTo": "Skala cerita"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Skala cerita",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Konsep Rasio. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Skala cerita",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Rasio",
      "emoji": ":",
      "countNum": 1,
      "countWord": "a berbanding b",
      "suara": "Definisi."
    },
    {
      "judul": "4:6",
      "emoji": "🌳",
      "countNum": 1,
      "countWord": "2:3 sederhana",
      "suara": "FPB 2."
    },
    {
      "judul": "Part-to-Part",
      "emoji": "🗣️",
      "countNum": 1,
      "countWord": "setiap a ada b",
      "suara": "Metode."
    },
    {
      "judul": "Ordered",
      "emoji": "↔️",
      "countNum": 1,
      "countWord": "a:b ≠ b:a",
      "suara": "Arah."
    },
    {
      "judul": "GCF Simplify",
      "emoji": "÷",
      "countNum": 1,
      "countWord": "bagi FPB",
      "suara": "Metode."
    },
    {
      "judul": "14 pucuk",
      "emoji": "🌲",
      "countNum": 21,
      "countWord": "21 cemara",
      "suara": "2:3."
    },
    {
      "judul": "4:3 wahana",
      "emoji": "🎡",
      "countNum": 32,
      "countWord": "32 bianglala",
      "suara": "dari 24."
    },
    {
      "judul": "Sejenis",
      "emoji": "📏",
      "countNum": 1,
      "countWord": "besaran sama",
      "suara": "Syarat."
    },
    {
      "judul": "Bahasa",
      "emoji": "📝",
      "countNum": 1,
      "countWord": "terhadap/berbanding",
      "suara": "Tulis."
    },
    {
      "judul": "Siap B",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "kesamaan",
      "suara": "Lanjut."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-a-c",
      "title": "Hitung Sederhana Rasio",
      "bookReference": "hlm. 64–69",
      "objective": "Pahami rasio dengan Part-to-Part Language, Ordered-Ratio, dan GCF Simplify.",
      "mechanicDescription": "Tiga ronde: tulis a:b, sederhanakan, jaga arah.",
      "voiceGuide": "Pilih jawaban terkait konsep rasio.",
      "emoji": ":",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-a-c",
      "title": "Arti a:b",
      "bookReference": "hlm. 64–69",
      "objective": "Pahami rasio dengan Part-to-Part Language, Ordered-Ratio, dan GCF Simplify.",
      "mechanicDescription": "Tiga ronde: tulis a:b, sederhanakan, jaga arah.",
      "voiceGuide": "Pilih jawaban terkait konsep rasio.",
      "emoji": ":",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-a-c",
      "title": "Pilih Bentuk Sederhana",
      "bookReference": "hlm. 64–69",
      "objective": "Pahami rasio dengan Part-to-Part Language, Ordered-Ratio, dan GCF Simplify.",
      "mechanicDescription": "Tiga ronde: tulis a:b, sederhanakan, jaga arah.",
      "voiceGuide": "Pilih jawaban terkait konsep rasio.",
      "emoji": ":",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-a-c",
      "title": "Pilah Arah Benar/Salah",
      "bookReference": "hlm. 64–69",
      "objective": "Pahami rasio dengan Part-to-Part Language, Ordered-Ratio, dan GCF Simplify.",
      "mechanicDescription": "Tiga ronde: tulis a:b, sederhanakan, jaga arah.",
      "voiceGuide": "Pilih jawaban terkait konsep rasio.",
      "emoji": ":",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-a-c",
      "title": "Jodohkan Cerita-Rasio",
      "bookReference": "hlm. 64–69",
      "objective": "Pahami rasio dengan Part-to-Part Language, Ordered-Ratio, dan GCF Simplify.",
      "mechanicDescription": "Tiga ronde: tulis a:b, sederhanakan, jaga arah.",
      "voiceGuide": "Pilih jawaban terkait konsep rasio.",
      "emoji": ":",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-a-c",
      "title": "Memori Rasio",
      "bookReference": "hlm. 64–69",
      "objective": "Pahami rasio dengan Part-to-Part Language, Ordered-Ratio, dan GCF Simplify.",
      "mechanicDescription": "Tiga ronde: tulis a:b, sederhanakan, jaga arah.",
      "voiceGuide": "Pilih jawaban terkait konsep rasio.",
      "emoji": ":",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-a-c",
      "title": "Ketuk Suku Rasio",
      "bookReference": "hlm. 64–69",
      "objective": "Pahami rasio dengan Part-to-Part Language, Ordered-Ratio, dan GCF Simplify.",
      "mechanicDescription": "Tiga ronde: tulis a:b, sederhanakan, jaga arah.",
      "voiceGuide": "Pilih jawaban terkait konsep rasio.",
      "emoji": ":",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-a-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 64–69",
      "objective": "Pahami rasio dengan Part-to-Part Language, Ordered-Ratio, dan GCF Simplify.",
      "mechanicDescription": "Tiga ronde: tulis a:b, sederhanakan, jaga arah.",
      "voiceGuide": "Pilih jawaban terkait konsep rasio.",
      "emoji": ":",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-a-c",
      "title": "Cerita Bibit Pohon",
      "bookReference": "hlm. 64–69",
      "objective": "Pahami rasio dengan Part-to-Part Language, Ordered-Ratio, dan GCF Simplify.",
      "mechanicDescription": "Tiga ronde: tulis a:b, sederhanakan, jaga arah.",
      "voiceGuide": "Pilih jawaban terkait konsep rasio.",
      "emoji": ":",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-a-c",
      "title": "Urutkan Rasio Sederhana",
      "bookReference": "hlm. 64–69",
      "objective": "Pahami rasio dengan Part-to-Part Language, Ordered-Ratio, dan GCF Simplify.",
      "mechanicDescription": "Tiga ronde: tulis a:b, sederhanakan, jaga arah.",
      "voiceGuide": "Pilih jawaban terkait konsep rasio.",
      "emoji": ":",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-a-p",
      "title": "Diagram Hitung Sederhana Rasio",
      "bookReference": "hlm. 64–69",
      "objective": "Pahami rasio dengan Part-to-Part Language, Ordered-Ratio, dan GCF Simplify.",
      "mechanicDescription": "Tiga ronde: tulis a:b, sederhanakan, jaga arah.",
      "voiceGuide": "Pilih jawaban terkait konsep rasio.",
      "diagramType": "hitung",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "rumus-a-p",
      "title": "Diagram Arti a:b",
      "bookReference": "hlm. 64–69",
      "objective": "Pahami rasio dengan Part-to-Part Language, Ordered-Ratio, dan GCF Simplify.",
      "mechanicDescription": "Tiga ronde: tulis a:b, sederhanakan, jaga arah.",
      "voiceGuide": "Pilih jawaban terkait konsep rasio.",
      "diagramType": "rumus",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "arti-a-p",
      "title": "Diagram Pilih Bentuk Sederhana",
      "bookReference": "hlm. 64–69",
      "objective": "Pahami rasio dengan Part-to-Part Language, Ordered-Ratio, dan GCF Simplify.",
      "mechanicDescription": "Tiga ronde: tulis a:b, sederhanakan, jaga arah.",
      "voiceGuide": "Pilih jawaban terkait konsep rasio.",
      "diagramType": "arti",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "sortir-a-p",
      "title": "Diagram Pilah Arah Benar/Salah",
      "bookReference": "hlm. 64–69",
      "objective": "Pahami rasio dengan Part-to-Part Language, Ordered-Ratio, dan GCF Simplify.",
      "mechanicDescription": "Tiga ronde: tulis a:b, sederhanakan, jaga arah.",
      "voiceGuide": "Pilih jawaban terkait konsep rasio.",
      "diagramType": "sortir",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-a-p",
      "title": "Diagram Jodohkan Cerita-Rasio",
      "bookReference": "hlm. 64–69",
      "objective": "Pahami rasio dengan Part-to-Part Language, Ordered-Ratio, dan GCF Simplify.",
      "mechanicDescription": "Tiga ronde: tulis a:b, sederhanakan, jaga arah.",
      "voiceGuide": "Pilih jawaban terkait konsep rasio.",
      "diagramType": "jodoh",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memori-a-p",
      "title": "Diagram Memori Rasio",
      "bookReference": "hlm. 64–69",
      "objective": "Pahami rasio dengan Part-to-Part Language, Ordered-Ratio, dan GCF Simplify.",
      "mechanicDescription": "Tiga ronde: tulis a:b, sederhanakan, jaga arah.",
      "voiceGuide": "Pilih jawaban terkait konsep rasio.",
      "diagramType": "memori",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-a-p",
      "title": "Diagram Ketuk Suku Rasio",
      "bookReference": "hlm. 64–69",
      "objective": "Pahami rasio dengan Part-to-Part Language, Ordered-Ratio, dan GCF Simplify.",
      "mechanicDescription": "Tiga ronde: tulis a:b, sederhanakan, jaga arah.",
      "voiceGuide": "Pilih jawaban terkait konsep rasio.",
      "diagramType": "ketuk",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "semua-a-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 64–69",
      "objective": "Pahami rasio dengan Part-to-Part Language, Ordered-Ratio, dan GCF Simplify.",
      "mechanicDescription": "Tiga ronde: tulis a:b, sederhanakan, jaga arah.",
      "voiceGuide": "Pilih jawaban terkait konsep rasio.",
      "diagramType": "semua",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "cerita-a-p",
      "title": "Diagram Cerita Bibit Pohon",
      "bookReference": "hlm. 64–69",
      "objective": "Pahami rasio dengan Part-to-Part Language, Ordered-Ratio, dan GCF Simplify.",
      "mechanicDescription": "Tiga ronde: tulis a:b, sederhanakan, jaga arah.",
      "voiceGuide": "Pilih jawaban terkait konsep rasio.",
      "diagramType": "cerita",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "urut-a-p",
      "title": "Diagram Urutkan Rasio Sederhana",
      "bookReference": "hlm. 64–69",
      "objective": "Pahami rasio dengan Part-to-Part Language, Ordered-Ratio, dan GCF Simplify.",
      "mechanicDescription": "Tiga ronde: tulis a:b, sederhanakan, jaga arah.",
      "voiceGuide": "Pilih jawaban terkait konsep rasio.",
      "diagramType": "urut",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-a-a",
      "title": "Tulis Hitung Sederhana Rasio",
      "bookReference": "hlm. 64–69",
      "objective": "Pahami rasio dengan Part-to-Part Language, Ordered-Ratio, dan GCF Simplify.",
      "mechanicDescription": "Tiga ronde: tulis a:b, sederhanakan, jaga arah.",
      "voiceGuide": "Pilih jawaban terkait konsep rasio.",
      "symbolLarge": ":",
      "wordLarge": "KONSEP RASIO",
      "mathNotation": "a:b"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-a-a",
      "title": "Tulis Arti a:b",
      "bookReference": "hlm. 64–69",
      "objective": "Pahami rasio dengan Part-to-Part Language, Ordered-Ratio, dan GCF Simplify.",
      "mechanicDescription": "Tiga ronde: tulis a:b, sederhanakan, jaga arah.",
      "voiceGuide": "Pilih jawaban terkait konsep rasio.",
      "symbolLarge": ":",
      "wordLarge": "KONSEP RASIO",
      "mathNotation": "a:b"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-a-a",
      "title": "Tulis Pilih Bentuk Sederhana",
      "bookReference": "hlm. 64–69",
      "objective": "Pahami rasio dengan Part-to-Part Language, Ordered-Ratio, dan GCF Simplify.",
      "mechanicDescription": "Tiga ronde: tulis a:b, sederhanakan, jaga arah.",
      "voiceGuide": "Pilih jawaban terkait konsep rasio.",
      "symbolLarge": ":",
      "wordLarge": "KONSEP RASIO",
      "mathNotation": "a:b"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-a-a",
      "title": "Tulis Pilah Arah Benar/Salah",
      "bookReference": "hlm. 64–69",
      "objective": "Pahami rasio dengan Part-to-Part Language, Ordered-Ratio, dan GCF Simplify.",
      "mechanicDescription": "Tiga ronde: tulis a:b, sederhanakan, jaga arah.",
      "voiceGuide": "Pilih jawaban terkait konsep rasio.",
      "symbolLarge": ":",
      "wordLarge": "KONSEP RASIO",
      "mathNotation": "a:b"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-a-a",
      "title": "Tulis Jodohkan Cerita-Rasio",
      "bookReference": "hlm. 64–69",
      "objective": "Pahami rasio dengan Part-to-Part Language, Ordered-Ratio, dan GCF Simplify.",
      "mechanicDescription": "Tiga ronde: tulis a:b, sederhanakan, jaga arah.",
      "voiceGuide": "Pilih jawaban terkait konsep rasio.",
      "symbolLarge": ":",
      "wordLarge": "KONSEP RASIO",
      "mathNotation": "a:b"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-a-a",
      "title": "Tulis Memori Rasio",
      "bookReference": "hlm. 64–69",
      "objective": "Pahami rasio dengan Part-to-Part Language, Ordered-Ratio, dan GCF Simplify.",
      "mechanicDescription": "Tiga ronde: tulis a:b, sederhanakan, jaga arah.",
      "voiceGuide": "Pilih jawaban terkait konsep rasio.",
      "symbolLarge": ":",
      "wordLarge": "KONSEP RASIO",
      "mathNotation": "a:b"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-a",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 64–69",
      "objective": "Pahami rasio dengan Part-to-Part Language, Ordered-Ratio, dan GCF Simplify.",
      "mechanicDescription": "Dua ronde menilai pernyataan.",
      "voiceGuide": "Benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-a",
      "title": "Detektif Rasio",
      "bookReference": "hlm. 64–69",
      "objective": "Pahami rasio dengan Part-to-Part Language, Ordered-Ratio, dan GCF Simplify.",
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
      "bookReference": "hlm. 64–69",
      "objective": "Pahami rasio dengan Part-to-Part Language, Ordered-Ratio, dan GCF Simplify.",
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
      "bookReference": "hlm. 64–69",
      "objective": "Pahami rasio dengan Part-to-Part Language, Ordered-Ratio, dan GCF Simplify.",
      "mechanicDescription": "Tiga ronde cerita.",
      "voiceGuide": "Baca lalu pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": ":",
      "nama": "Definisi",
      "isi": "Rasio membandingkan dua besaran sejenis (Part-to-Part Ratio Language).",
      "suara": "Setiap a ada b."
    },
    {
      "ikon": "÷",
      "nama": "Sederhana",
      "isi": "Bagi kedua suku dengan FPB (GCF Simplify Ratio).",
      "suara": "4:6=2:3."
    },
    {
      "ikon": "↔️",
      "nama": "Arah",
      "isi": "a:b berbeda makna dengan b:a (Ordered-Ratio Protocol).",
      "suara": "Jaga urutan."
    },
    {
      "ikon": "✖️",
      "nama": "Skala",
      "isi": "Kalikan kedua suku dengan bilangan sama untuk memperbesar cerita.",
      "suara": "14→21."
    }
  ],
  "poinSuara": "Ingat: rasio a banding b, sederhanakan dengan FPB, jaga arah kiri-kanan, dan baca setiap a ada b.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Banding benda",
        "warna": "#FDE68A"
      },
      {
        "teks": "tulis a:b",
        "warna": "#BBF7D0"
      },
      {
        "teks": "sederhanakan FPB",
        "warna": "#BFDBFE"
      },
      {
        "teks": "jaga arah & skala",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: hitung rasio sendok dan garpu di meja makan, sederhanakan, lalu tukar arah dan jelaskan bedanya.",
  "refleksi": [
    "Apa arti 2:3 pada pohon pucuk merah dan cemara?",
    "Mengapa 2:3 tidak sama dengan 3:2?",
    "Bagaimana menyederhanakan 4:6?"
  ]
};
export const SUB_B62: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Kesamaan Rasio)",
  "fullTitle": "Sub-Bab B: Konsep Kesamaan Rasio",
  "targetDescription": "Siswa menentukan kesamaan rasio lewat tabel (×/÷ sama), menghubungkan pecahan senilai, dan menghitung rasio satuan sesuai Buku Siswa Kelas VI Bab 2 Sub-Bab B hlm. 70–79.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Lahan 10 meter persegi menampung 12 bibit. Rasio 10 banding 12 senilai 5 banding 6. METODE LUAR Equivalent Ratio Table: kalikan atau bagi kedua kolom dengan bilangan sama. METODE LUAR Fraction-Equivalence Bridge: a/b sama a kali m per b kali m. METODE LUAR Unit Rate Method: harga atau banyak per satu satuan untuk membandingkan paket. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menentukan kesamaan rasio dengan tabel dan menentukan rasio satuan.",
    "referensi": "Buku Siswa Matematika Kelas VI Bab 2 Sub-Bab B hlm. 70–79; Equivalent Ratio Table; Fraction-Equivalence Bridge; Unit Rate Method."
  },
  "videos": [
    {
      "id": "K6B2B-V1",
      "judul": "Tabel Lahan & Bibit",
      "subjudul": "Kesamaan",
      "adegan": [
        {
          "id": "K6B2B-V1-1",
          "judul": "10 : 12",
          "ketukan": [
            "10 m² lahan : 12 bibit.",
            "Sederhanakan 5 : 6.",
            "METODE LUAR · Equivalent Ratio Table.",
            "×5: 50 m² : 60 bibit; semua rasio sama."
          ],
          "papan": [
            "10:12",
            "5:6",
            "tabel ×",
            "senilai"
          ]
        },
        {
          "id": "K6B2B-V1-2",
          "judul": "Pecahan senilai",
          "ketukan": [
            "10/12 = 30/36 = 5/6.",
            "METODE LUAR · Fraction-Equivalence Bridge.",
            "Kesamaan rasio = pecahan senilai.",
            "Bagi atau kali pembilang dan penyebut sama."
          ],
          "papan": [
            "10/12",
            "5/6",
            "bridge",
            "× atau ÷"
          ]
        },
        {
          "id": "K6B2B-V1-3",
          "judul": "25 m² berapa bibit?",
          "ketukan": [
            "Dari 10:12, faktor 25/10 = 2,5.",
            "12 × 2,5 = 30 bibit.",
            "Atau pakai 5:6 → 25:30.",
            "Tabel menjaga proporsi."
          ],
          "papan": [
            "25 m²",
            "30 bibit",
            "proporsi",
            "tabel"
          ]
        }
      ]
    },
    {
      "id": "K6B2B-V2",
      "judul": "Rasio Satuan",
      "subjudul": "Unit Rate",
      "adegan": [
        {
          "id": "K6B2B-V2-1",
          "judul": "Harga per bibit",
          "ketukan": [
            "Paket 3 bibit Rp50.000 → satuan ≈ Rp16.667.",
            "Paket 5 bibit Rp40.000 → satuan Rp8.000.",
            "METODE LUAR · Unit Rate Method.",
            "Satuan memudahkan banding paket."
          ],
          "papan": [
            "harga/bibit",
            "unit rate",
            "banding adil",
            "pilih hemat"
          ]
        },
        {
          "id": "K6B2B-V2-2",
          "judul": "Kemasan waktu",
          "ketukan": [
            "6 bibit dikemas 1,5 jam → 4 bibit per jam.",
            "Dalam 4 jam: 16 bibit.",
            "Rasio satuan = banyak per 1 satuan waktu.",
            "Kalikan satuan dengan target."
          ],
          "papan": [
            "4 bibit/jam",
            "4 jam → 16",
            "laju",
            "× target"
          ]
        },
        {
          "id": "K6B2B-V2-3",
          "judul": "Wedang & kopi",
          "ketukan": [
            "Resep jahe:lemon dijaga proporsi tabel.",
            "Kopi Ibu 1:2; Dona 4:10 = 2:5 → lebih manis.",
            "Unit rate dan kesamaan menjaga rasa.",
            "Cek dengan sederhanakan dulu."
          ],
          "papan": [
            "resep",
            "4:10≠1:2",
            "lebih manis",
            "cek"
          ]
        }
      ]
    },
    {
      "id": "K6B2B-V3",
      "judul": "Latihan & Siap C",
      "subjudul": "Ayo",
      "adegan": [
        {
          "id": "K6B2B-V3-1",
          "judul": "Aturan tabel",
          "ketukan": [
            "Kalikan atau bagi SELURUH baris/kolom sama.",
            "Jangan hanya satu suku.",
            "Tulis satuan kolom.",
            "Sederhanakan bila diminta."
          ],
          "papan": [
            "× sama",
            "kedua suku",
            "satuan kolom",
            "sederhana"
          ]
        },
        {
          "id": "K6B2B-V3-2",
          "judul": "Kesalahan",
          "ketukan": [
            "Salah: menambah bilangan sama ke kedua suku (itu beda konsep).",
            "Salah: banding paket tanpa unit rate.",
            "Salah: lupa satuan (Rp/bibit, bibit/jam).",
            "Cek dengan pecahan senilai."
          ],
          "papan": [
            "bukan +sama",
            "pakai unit",
            "tulis satuan",
            "cek"
          ]
        },
        {
          "id": "K6B2B-V3-3",
          "judul": "Siap C",
          "ketukan": [
            "Kesamaan dan satuan siap.",
            "Berikutnya: bagian terhadap bagian/keseluruhan dan durasi waktu.",
            "Total bagian = jumlah suku rasio.",
            "Ayo Sub-Bab C!"
          ],
          "papan": [
            "B siap",
            "bagian:total",
            "waktu",
            "ke C"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Tulis rasio",
      "stepDesc": "Baca soal Konsep Kesamaan Rasio dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. a:b awal Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa menentukan kesamaan rasio lewat tabel (×/÷ sama), menghubungkan pecahan senilai, dan menghitung rasio satuan sesua….",
      "icon": ":",
      "flowFrom": "Tulis rasio",
      "flowTo": "Tabel ×/÷"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Tabel ×/÷",
      "stepDesc": "Equivalent Table. Pada Konsep Kesamaan Rasio, langkah “Tabel ×/÷” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "▦",
      "flowFrom": "Tabel ×/÷",
      "flowTo": "Pecahan senilai"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Pecahan senilai",
      "stepDesc": "a/b bridge. Pada Konsep Kesamaan Rasio, langkah “Pecahan senilai” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "½",
      "flowFrom": "Pecahan senilai",
      "flowTo": "Unit rate"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Unit rate",
      "stepDesc": "per 1 satuan. Pada Konsep Kesamaan Rasio, langkah “Unit rate” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "¹",
      "flowFrom": "Unit rate",
      "flowTo": "Banding paket"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Banding paket",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Konsep Kesamaan Rasio. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "💰",
      "flowFrom": "Banding paket",
      "flowTo": "Cek proporsi"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek proporsi",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Konsep Kesamaan Rasio. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Cek proporsi",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "10:12",
      "emoji": "🌱",
      "countNum": 1,
      "countWord": "5:6 senilai",
      "suara": "Sederhana."
    },
    {
      "judul": "Tabel ×5",
      "emoji": "▦",
      "countNum": 1,
      "countWord": "50:60",
      "suara": "Equivalent."
    },
    {
      "judul": "Bridge",
      "emoji": "½",
      "countNum": 1,
      "countWord": "pecahan senilai",
      "suara": "Metode."
    },
    {
      "judul": "25 m²",
      "emoji": "📐",
      "countNum": 30,
      "countWord": "30 bibit",
      "suara": "Skala."
    },
    {
      "judul": "Unit rate",
      "emoji": "¹",
      "countNum": 1,
      "countWord": "per 1 satuan",
      "suara": "Metode."
    },
    {
      "judul": "3 bibit",
      "emoji": "💰",
      "countNum": 1,
      "countWord": "≈16667/bibit",
      "suara": "Paket A."
    },
    {
      "judul": "5 bibit",
      "emoji": "💰",
      "countNum": 8000,
      "countWord": "8000/bibit",
      "suara": "Paket B."
    },
    {
      "judul": "6 bibit/1,5 jam",
      "emoji": "⏱️",
      "countNum": 4,
      "countWord": "4 bibit/jam",
      "suara": "Laju."
    },
    {
      "judul": "4:10 kopi",
      "emoji": "☕",
      "countNum": 1,
      "countWord": "2:5 ≠ 1:2",
      "suara": "Lebih manis."
    },
    {
      "judul": "Siap C",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "penerapan",
      "suara": "Lanjut."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-b-c",
      "title": "Hitung Rasio Senilai",
      "bookReference": "hlm. 70–79",
      "objective": "Tentukan kesamaan rasio dan rasio satuan dengan Equivalent Table dan Unit Rate.",
      "mechanicDescription": "Tiga ronde: tabel ×/÷, pecahan senilai, unit rate.",
      "voiceGuide": "Pilih jawaban terkait kesamaan rasio.",
      "emoji": "=",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-b-c",
      "title": "Arti Tabel Rasio",
      "bookReference": "hlm. 70–79",
      "objective": "Tentukan kesamaan rasio dan rasio satuan dengan Equivalent Table dan Unit Rate.",
      "mechanicDescription": "Tiga ronde: tabel ×/÷, pecahan senilai, unit rate.",
      "voiceGuide": "Pilih jawaban terkait kesamaan rasio.",
      "emoji": "=",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-b-c",
      "title": "Pilih Unit Rate",
      "bookReference": "hlm. 70–79",
      "objective": "Tentukan kesamaan rasio dan rasio satuan dengan Equivalent Table dan Unit Rate.",
      "mechanicDescription": "Tiga ronde: tabel ×/÷, pecahan senilai, unit rate.",
      "voiceGuide": "Pilih jawaban terkait kesamaan rasio.",
      "emoji": "=",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-b-c",
      "title": "Pilah Senilai/Tidak",
      "bookReference": "hlm. 70–79",
      "objective": "Tentukan kesamaan rasio dan rasio satuan dengan Equivalent Table dan Unit Rate.",
      "mechanicDescription": "Tiga ronde: tabel ×/÷, pecahan senilai, unit rate.",
      "voiceGuide": "Pilih jawaban terkait kesamaan rasio.",
      "emoji": "=",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-b-c",
      "title": "Jodohkan Tabel-Hasil",
      "bookReference": "hlm. 70–79",
      "objective": "Tentukan kesamaan rasio dan rasio satuan dengan Equivalent Table dan Unit Rate.",
      "mechanicDescription": "Tiga ronde: tabel ×/÷, pecahan senilai, unit rate.",
      "voiceGuide": "Pilih jawaban terkait kesamaan rasio.",
      "emoji": "=",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-b-c",
      "title": "Memori Kesamaan",
      "bookReference": "hlm. 70–79",
      "objective": "Tentukan kesamaan rasio dan rasio satuan dengan Equivalent Table dan Unit Rate.",
      "mechanicDescription": "Tiga ronde: tabel ×/÷, pecahan senilai, unit rate.",
      "voiceGuide": "Pilih jawaban terkait kesamaan rasio.",
      "emoji": "=",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-b-c",
      "title": "Ketuk Suku Senilai",
      "bookReference": "hlm. 70–79",
      "objective": "Tentukan kesamaan rasio dan rasio satuan dengan Equivalent Table dan Unit Rate.",
      "mechanicDescription": "Tiga ronde: tabel ×/÷, pecahan senilai, unit rate.",
      "voiceGuide": "Pilih jawaban terkait kesamaan rasio.",
      "emoji": "=",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-b-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 70–79",
      "objective": "Tentukan kesamaan rasio dan rasio satuan dengan Equivalent Table dan Unit Rate.",
      "mechanicDescription": "Tiga ronde: tabel ×/÷, pecahan senilai, unit rate.",
      "voiceGuide": "Pilih jawaban terkait kesamaan rasio.",
      "emoji": "=",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-b-c",
      "title": "Cerita Lahan Bibit",
      "bookReference": "hlm. 70–79",
      "objective": "Tentukan kesamaan rasio dan rasio satuan dengan Equivalent Table dan Unit Rate.",
      "mechanicDescription": "Tiga ronde: tabel ×/÷, pecahan senilai, unit rate.",
      "voiceGuide": "Pilih jawaban terkait kesamaan rasio.",
      "emoji": "=",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-b-c",
      "title": "Urutkan Unit Rate",
      "bookReference": "hlm. 70–79",
      "objective": "Tentukan kesamaan rasio dan rasio satuan dengan Equivalent Table dan Unit Rate.",
      "mechanicDescription": "Tiga ronde: tabel ×/÷, pecahan senilai, unit rate.",
      "voiceGuide": "Pilih jawaban terkait kesamaan rasio.",
      "emoji": "=",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-b-p",
      "title": "Diagram Hitung Rasio Senilai",
      "bookReference": "hlm. 70–79",
      "objective": "Tentukan kesamaan rasio dan rasio satuan dengan Equivalent Table dan Unit Rate.",
      "mechanicDescription": "Tiga ronde: tabel ×/÷, pecahan senilai, unit rate.",
      "voiceGuide": "Pilih jawaban terkait kesamaan rasio.",
      "diagramType": "hitung",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "rumus-b-p",
      "title": "Diagram Arti Tabel Rasio",
      "bookReference": "hlm. 70–79",
      "objective": "Tentukan kesamaan rasio dan rasio satuan dengan Equivalent Table dan Unit Rate.",
      "mechanicDescription": "Tiga ronde: tabel ×/÷, pecahan senilai, unit rate.",
      "voiceGuide": "Pilih jawaban terkait kesamaan rasio.",
      "diagramType": "rumus",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "arti-b-p",
      "title": "Diagram Pilih Unit Rate",
      "bookReference": "hlm. 70–79",
      "objective": "Tentukan kesamaan rasio dan rasio satuan dengan Equivalent Table dan Unit Rate.",
      "mechanicDescription": "Tiga ronde: tabel ×/÷, pecahan senilai, unit rate.",
      "voiceGuide": "Pilih jawaban terkait kesamaan rasio.",
      "diagramType": "arti",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "sortir-b-p",
      "title": "Diagram Pilah Senilai/Tidak",
      "bookReference": "hlm. 70–79",
      "objective": "Tentukan kesamaan rasio dan rasio satuan dengan Equivalent Table dan Unit Rate.",
      "mechanicDescription": "Tiga ronde: tabel ×/÷, pecahan senilai, unit rate.",
      "voiceGuide": "Pilih jawaban terkait kesamaan rasio.",
      "diagramType": "sortir",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-b-p",
      "title": "Diagram Jodohkan Tabel-Hasil",
      "bookReference": "hlm. 70–79",
      "objective": "Tentukan kesamaan rasio dan rasio satuan dengan Equivalent Table dan Unit Rate.",
      "mechanicDescription": "Tiga ronde: tabel ×/÷, pecahan senilai, unit rate.",
      "voiceGuide": "Pilih jawaban terkait kesamaan rasio.",
      "diagramType": "jodoh",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memori-b-p",
      "title": "Diagram Memori Kesamaan",
      "bookReference": "hlm. 70–79",
      "objective": "Tentukan kesamaan rasio dan rasio satuan dengan Equivalent Table dan Unit Rate.",
      "mechanicDescription": "Tiga ronde: tabel ×/÷, pecahan senilai, unit rate.",
      "voiceGuide": "Pilih jawaban terkait kesamaan rasio.",
      "diagramType": "memori",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-b-p",
      "title": "Diagram Ketuk Suku Senilai",
      "bookReference": "hlm. 70–79",
      "objective": "Tentukan kesamaan rasio dan rasio satuan dengan Equivalent Table dan Unit Rate.",
      "mechanicDescription": "Tiga ronde: tabel ×/÷, pecahan senilai, unit rate.",
      "voiceGuide": "Pilih jawaban terkait kesamaan rasio.",
      "diagramType": "ketuk",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "semua-b-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 70–79",
      "objective": "Tentukan kesamaan rasio dan rasio satuan dengan Equivalent Table dan Unit Rate.",
      "mechanicDescription": "Tiga ronde: tabel ×/÷, pecahan senilai, unit rate.",
      "voiceGuide": "Pilih jawaban terkait kesamaan rasio.",
      "diagramType": "semua",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "cerita-b-p",
      "title": "Diagram Cerita Lahan Bibit",
      "bookReference": "hlm. 70–79",
      "objective": "Tentukan kesamaan rasio dan rasio satuan dengan Equivalent Table dan Unit Rate.",
      "mechanicDescription": "Tiga ronde: tabel ×/÷, pecahan senilai, unit rate.",
      "voiceGuide": "Pilih jawaban terkait kesamaan rasio.",
      "diagramType": "cerita",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "urut-b-p",
      "title": "Diagram Urutkan Unit Rate",
      "bookReference": "hlm. 70–79",
      "objective": "Tentukan kesamaan rasio dan rasio satuan dengan Equivalent Table dan Unit Rate.",
      "mechanicDescription": "Tiga ronde: tabel ×/÷, pecahan senilai, unit rate.",
      "voiceGuide": "Pilih jawaban terkait kesamaan rasio.",
      "diagramType": "urut",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-b-a",
      "title": "Tulis Hitung Rasio Senilai",
      "bookReference": "hlm. 70–79",
      "objective": "Tentukan kesamaan rasio dan rasio satuan dengan Equivalent Table dan Unit Rate.",
      "mechanicDescription": "Tiga ronde: tabel ×/÷, pecahan senilai, unit rate.",
      "voiceGuide": "Pilih jawaban terkait kesamaan rasio.",
      "symbolLarge": "=",
      "wordLarge": "KESAMAAN RASIO",
      "mathNotation": "a:b = am:bm"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-b-a",
      "title": "Tulis Arti Tabel Rasio",
      "bookReference": "hlm. 70–79",
      "objective": "Tentukan kesamaan rasio dan rasio satuan dengan Equivalent Table dan Unit Rate.",
      "mechanicDescription": "Tiga ronde: tabel ×/÷, pecahan senilai, unit rate.",
      "voiceGuide": "Pilih jawaban terkait kesamaan rasio.",
      "symbolLarge": "=",
      "wordLarge": "KESAMAAN RASIO",
      "mathNotation": "a:b = am:bm"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-b-a",
      "title": "Tulis Pilih Unit Rate",
      "bookReference": "hlm. 70–79",
      "objective": "Tentukan kesamaan rasio dan rasio satuan dengan Equivalent Table dan Unit Rate.",
      "mechanicDescription": "Tiga ronde: tabel ×/÷, pecahan senilai, unit rate.",
      "voiceGuide": "Pilih jawaban terkait kesamaan rasio.",
      "symbolLarge": "=",
      "wordLarge": "KESAMAAN RASIO",
      "mathNotation": "a:b = am:bm"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-b-a",
      "title": "Tulis Pilah Senilai/Tidak",
      "bookReference": "hlm. 70–79",
      "objective": "Tentukan kesamaan rasio dan rasio satuan dengan Equivalent Table dan Unit Rate.",
      "mechanicDescription": "Tiga ronde: tabel ×/÷, pecahan senilai, unit rate.",
      "voiceGuide": "Pilih jawaban terkait kesamaan rasio.",
      "symbolLarge": "=",
      "wordLarge": "KESAMAAN RASIO",
      "mathNotation": "a:b = am:bm"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-b-a",
      "title": "Tulis Jodohkan Tabel-Hasil",
      "bookReference": "hlm. 70–79",
      "objective": "Tentukan kesamaan rasio dan rasio satuan dengan Equivalent Table dan Unit Rate.",
      "mechanicDescription": "Tiga ronde: tabel ×/÷, pecahan senilai, unit rate.",
      "voiceGuide": "Pilih jawaban terkait kesamaan rasio.",
      "symbolLarge": "=",
      "wordLarge": "KESAMAAN RASIO",
      "mathNotation": "a:b = am:bm"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-b-a",
      "title": "Tulis Memori Kesamaan",
      "bookReference": "hlm. 70–79",
      "objective": "Tentukan kesamaan rasio dan rasio satuan dengan Equivalent Table dan Unit Rate.",
      "mechanicDescription": "Tiga ronde: tabel ×/÷, pecahan senilai, unit rate.",
      "voiceGuide": "Pilih jawaban terkait kesamaan rasio.",
      "symbolLarge": "=",
      "wordLarge": "KESAMAAN RASIO",
      "mathNotation": "a:b = am:bm"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-b",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 70–79",
      "objective": "Tentukan kesamaan rasio dan rasio satuan dengan Equivalent Table dan Unit Rate.",
      "mechanicDescription": "Dua ronde menilai pernyataan.",
      "voiceGuide": "Benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-b",
      "title": "Detektif Rasio",
      "bookReference": "hlm. 70–79",
      "objective": "Tentukan kesamaan rasio dan rasio satuan dengan Equivalent Table dan Unit Rate.",
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
      "bookReference": "hlm. 70–79",
      "objective": "Tentukan kesamaan rasio dan rasio satuan dengan Equivalent Table dan Unit Rate.",
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
      "bookReference": "hlm. 70–79",
      "objective": "Tentukan kesamaan rasio dan rasio satuan dengan Equivalent Table dan Unit Rate.",
      "mechanicDescription": "Tiga ronde cerita.",
      "voiceGuide": "Baca lalu pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "▦",
      "nama": "Tabel",
      "isi": "Kalikan/bagi kedua suku sama (Equivalent Ratio Table).",
      "suara": "Proporsi terjaga."
    },
    {
      "ikon": "½",
      "nama": "Bridge",
      "isi": "Kesamaan rasio = pecahan senilai (Fraction-Equivalence Bridge).",
      "suara": "a/b = am/bm."
    },
    {
      "ikon": "¹",
      "nama": "Satuan",
      "isi": "Unit Rate = nilai per 1 satuan untuk banding adil.",
      "suara": "Rp/bibit, bibit/jam."
    },
    {
      "ikon": "⚠️",
      "nama": "Bukan +",
      "isi": "Menambah bilangan sama ke kedua suku tidak menjaga rasio.",
      "suara": "Pakai ×/÷."
    }
  ],
  "poinSuara": "Ingat: kesamaan rasio memakai kali atau bagi yang sama pada kedua suku, hubungkan ke pecahan senilai, dan banding paket dengan rasio satuan.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Tulis rasio",
        "warna": "#FDE68A"
      },
      {
        "teks": "isi tabel ×/÷",
        "warna": "#BBF7D0"
      },
      {
        "teks": "hitung unit rate",
        "warna": "#BFDBFE"
      },
      {
        "teks": "banding & cek",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: banding harga dua kemasan sabun dengan unit rate (harga per 100 ml).",
  "refleksi": [
    "Bagaimana membuat rasio senilai dari 10:12?",
    "Apa itu rasio satuan?",
    "Mengapa menambah 2 ke kedua suku tidak menjaga rasio?"
  ]
};
export const SUB_C62: SubBabNaskah = {
  "id": "C",
  "codeTitle": "Sub-Bab C (Penerapan Rasio)",
  "fullTitle": "Sub-Bab C: Penerapan Rasio",
  "targetDescription": "Siswa menerapkan rasio bagian terhadap bagian dan bagian terhadap keseluruhan, serta rasio pada durasi waktu sesuai Buku Siswa Kelas VI Bab 2 Sub-Bab C hlm. 80–88.",
  "secondaryBg": "#DCFCE7",
  "secondaryBorder": "#15803D",
  "secondaryText": "#14532D",
  "silabus": {
    "teksSuara": "Penjualan 72 bibit dengan rasio hias banding obat 4 banding 5. Total bagian 9. METODE LUAR Part-to-Whole Ratio: bagian terhadap total. METODE LUAR Additive Parts Sum: jumlah suku rasio menjadi penyebut keseluruhan. METODE LUAR Time-Rate Conversion: ubah jam-menit lalu skala jarak atau kata per waktu. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menerapkan rasio bagian-bagian, bagian-keseluruhan, dan rasio pada durasi waktu.",
    "referensi": "Buku Siswa Matematika Kelas VI Bab 2 Sub-Bab C hlm. 80–88; Part-to-Whole Ratio; Additive Parts Sum; Time-Rate Conversion."
  },
  "videos": [
    {
      "id": "K6B2C-V1",
      "judul": "Hias : Obat = 4 : 5",
      "subjudul": "Bagian",
      "adegan": [
        {
          "id": "K6B2C-V1-1",
          "judul": "Total 72",
          "ketukan": [
            "Rasio hias : obat = 4 : 5.",
            "METODE LUAR · Additive Parts Sum: 4+5=9 bagian.",
            "72 ÷ 9 = 8; hias 32, obat 40.",
            "Obat lebih banyak."
          ],
          "papan": [
            "4:5",
            "9 bagian",
            "32 & 40",
            "obat lebih"
          ]
        },
        {
          "id": "K6B2C-V1-2",
          "judul": "Bagian : keseluruhan",
          "ketukan": [
            "Hias terhadap seluruh: 4 : 9.",
            "Obat terhadap seluruh: 5 : 9.",
            "METODE LUAR · Part-to-Whole Ratio.",
            "Beda dengan part-to-part 4:5."
          ],
          "papan": [
            "4:9",
            "5:9",
            "part-whole",
            "bukan 4:5"
          ]
        },
        {
          "id": "K6B2C-V1-3",
          "judul": "Pasar malam",
          "ketukan": [
            "Anak : dewasa = 9 : 4; total 390.",
            "9+4=13 bagian; 390÷13=30.",
            "Anak 270, dewasa 120.",
            "Tabel rasio menolong."
          ],
          "papan": [
            "9:4",
            "13 bagian",
            "270 anak",
            "tabel"
          ]
        }
      ]
    },
    {
      "id": "K6B2C-V2",
      "judul": "Rasio Durasi Waktu",
      "subjudul": "Time Rate",
      "adegan": [
        {
          "id": "K6B2C-V2-1",
          "judul": "1 km / 30 menit",
          "ketukan": [
            "Banyu 1 km dalam 30 menit.",
            "Dalam 1 jam (60 menit) = 2 km.",
            "METODE LUAR · Time-Rate Conversion.",
            "Samakan satuan waktu dulu."
          ],
          "papan": [
            "1 km/30 mnt",
            "2 km/jam",
            "samakan satuan",
            "Time-Rate"
          ]
        },
        {
          "id": "K6B2C-V2-2",
          "judul": "9 km berapa lama?",
          "ketukan": [
            "Dari 1 km : 30 menit → 9 km : 270 menit = 4,5 jam.",
            "Atau 2 km/jam → 9÷2 = 4,5 jam.",
            "Skala kedua suku sama.",
            "Cek satuan akhir."
          ],
          "papan": [
            "9 km",
            "4,5 jam",
            "skala",
            "cek satuan"
          ]
        },
        {
          "id": "K6B2C-V2-3",
          "judul": "Ketik 1200 kata/jam",
          "ketukan": [
            "180 menit = 3 jam → 3600 kata.",
            "3000 kata butuh 3000/1200 = 2,5 jam.",
            "Rasio kata : waktu dijaga.",
            "Unit rate = 1200 kata per jam."
          ],
          "papan": [
            "3600 kata",
            "2,5 jam",
            "kata:waktu",
            "unit"
          ]
        }
      ]
    },
    {
      "id": "K6B2C-V3",
      "judul": "Rangkum A–C",
      "subjudul": "Bab 2",
      "adegan": [
        {
          "id": "K6B2C-V3-1",
          "judul": "Alur bab",
          "ketukan": [
            "A: konsep rasio, arah, sederhanakan.",
            "B: kesamaan, tabel, unit rate.",
            "C: bagian:total dan durasi waktu.",
            "Artus siap memakai rasio di kebun dan toko."
          ],
          "papan": [
            "A konsep",
            "B senilai",
            "C terapan",
            "cerita utuh"
          ]
        },
        {
          "id": "K6B2C-V3-2",
          "judul": "Label metode",
          "ketukan": [
            "Part-to-Part, Ordered-Ratio, GCF Simplify.",
            "Equivalent Table, Fraction Bridge, Unit Rate.",
            "Part-to-Whole, Additive Parts, Time-Rate.",
            "Buku Kurikulum Merdeka + metode luar berlabel."
          ],
          "papan": [
            "metode A",
            "metode B",
            "metode C",
            "naskah+buku"
          ]
        },
        {
          "id": "K6B2C-V3-3",
          "judul": "Materi siap",
          "ketukan": [
            "Tab Materi Bab 2 Sub-Bab A sampai C siap.",
            "Latihan dan ujian menyusul instruksi terpisah.",
            "Mainkan Concrete, Picture, Abstract.",
            "Hebat, master rasio!"
          ],
          "papan": [
            "Materi A–C",
            "tanpa Latihan dulu",
            "30×3",
            "hebat"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Part-to-part",
      "stepDesc": "Baca soal Penerapan Rasio dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. a:b Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa menerapkan rasio bagian terhadap bagian dan bagian terhadap keseluruhan, serta rasio pada durasi waktu sesuai Buku….",
      "icon": ":",
      "flowFrom": "Part-to-part",
      "flowTo": "Jumlah bagian"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Jumlah bagian",
      "stepDesc": "a+b. Pada Penerapan Rasio, langkah “Jumlah bagian” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "➕",
      "flowFrom": "Jumlah bagian",
      "flowTo": "Bagi total"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Bagi total",
      "stepDesc": "total÷(a+b). Pada Penerapan Rasio, langkah “Bagi total” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "÷",
      "flowFrom": "Bagi total",
      "flowTo": "Part-to-whole"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Part-to-whole",
      "stepDesc": "a:(a+b). Pada Penerapan Rasio, langkah “Part-to-whole” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🥧",
      "flowFrom": "Part-to-whole",
      "flowTo": "Time-Rate"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Time-Rate",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Penerapan Rasio. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "⏱️",
      "flowFrom": "Time-Rate",
      "flowTo": "Skala waktu"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Skala waktu",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Penerapan Rasio. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Skala waktu",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "4:5",
      "emoji": "🌿",
      "countNum": 1,
      "countWord": "hias:obat",
      "suara": "Part-part."
    },
    {
      "judul": "4+5=9",
      "emoji": "➕",
      "countNum": 9,
      "countWord": "9 bagian",
      "suara": "Additive."
    },
    {
      "judul": "72 bibit",
      "emoji": "🧮",
      "countNum": 1,
      "countWord": "32 & 40",
      "suara": "Hasil."
    },
    {
      "judul": "4:9",
      "emoji": "🥧",
      "countNum": 1,
      "countWord": "hias:total",
      "suara": "Part-whole."
    },
    {
      "judul": "5:9",
      "emoji": "🥧",
      "countNum": 1,
      "countWord": "obat:total",
      "suara": "Part-whole."
    },
    {
      "judul": "9:4 → 390",
      "emoji": "🎡",
      "countNum": 270,
      "countWord": "270 anak",
      "suara": "Pasar."
    },
    {
      "judul": "1 km/30 mnt",
      "emoji": "🏃",
      "countNum": 2,
      "countWord": "2 km/jam",
      "suara": "Time-Rate."
    },
    {
      "judul": "9 km",
      "emoji": "⏱️",
      "countNum": 1,
      "countWord": "4,5 jam",
      "suara": "Skala."
    },
    {
      "judul": "1200 kata/jam",
      "emoji": "⌨️",
      "countNum": 3600,
      "countWord": "3600/3 jam",
      "suara": "Ketik."
    },
    {
      "judul": "Bab 2 A–C",
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
      "title": "Hitung Bagian Total",
      "bookReference": "hlm. 80–88",
      "objective": "Terapkan Part-to-Whole, Additive Parts Sum, dan Time-Rate Conversion.",
      "mechanicDescription": "Tiga ronde: bagian:total, hitung jumlah, durasi waktu.",
      "voiceGuide": "Pilih jawaban terkait penerapan rasio.",
      "emoji": "🥧",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-c-c",
      "title": "Arti Part-to-Whole",
      "bookReference": "hlm. 80–88",
      "objective": "Terapkan Part-to-Whole, Additive Parts Sum, dan Time-Rate Conversion.",
      "mechanicDescription": "Tiga ronde: bagian:total, hitung jumlah, durasi waktu.",
      "voiceGuide": "Pilih jawaban terkait penerapan rasio.",
      "emoji": "🥧",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-c-c",
      "title": "Pilih Jumlah Bagian",
      "bookReference": "hlm. 80–88",
      "objective": "Terapkan Part-to-Whole, Additive Parts Sum, dan Time-Rate Conversion.",
      "mechanicDescription": "Tiga ronde: bagian:total, hitung jumlah, durasi waktu.",
      "voiceGuide": "Pilih jawaban terkait penerapan rasio.",
      "emoji": "🥧",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-c-c",
      "title": "Pilah Part/Whole",
      "bookReference": "hlm. 80–88",
      "objective": "Terapkan Part-to-Whole, Additive Parts Sum, dan Time-Rate Conversion.",
      "mechanicDescription": "Tiga ronde: bagian:total, hitung jumlah, durasi waktu.",
      "voiceGuide": "Pilih jawaban terkait penerapan rasio.",
      "emoji": "🥧",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-c-c",
      "title": "Jodohkan Cerita-Hasil",
      "bookReference": "hlm. 80–88",
      "objective": "Terapkan Part-to-Whole, Additive Parts Sum, dan Time-Rate Conversion.",
      "mechanicDescription": "Tiga ronde: bagian:total, hitung jumlah, durasi waktu.",
      "voiceGuide": "Pilih jawaban terkait penerapan rasio.",
      "emoji": "🥧",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-c-c",
      "title": "Memori Penerapan",
      "bookReference": "hlm. 80–88",
      "objective": "Terapkan Part-to-Whole, Additive Parts Sum, dan Time-Rate Conversion.",
      "mechanicDescription": "Tiga ronde: bagian:total, hitung jumlah, durasi waktu.",
      "voiceGuide": "Pilih jawaban terkait penerapan rasio.",
      "emoji": "🥧",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-c-c",
      "title": "Ketuk Hasil Bagian",
      "bookReference": "hlm. 80–88",
      "objective": "Terapkan Part-to-Whole, Additive Parts Sum, dan Time-Rate Conversion.",
      "mechanicDescription": "Tiga ronde: bagian:total, hitung jumlah, durasi waktu.",
      "voiceGuide": "Pilih jawaban terkait penerapan rasio.",
      "emoji": "🥧",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-c-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 80–88",
      "objective": "Terapkan Part-to-Whole, Additive Parts Sum, dan Time-Rate Conversion.",
      "mechanicDescription": "Tiga ronde: bagian:total, hitung jumlah, durasi waktu.",
      "voiceGuide": "Pilih jawaban terkait penerapan rasio.",
      "emoji": "🥧",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-c-c",
      "title": "Cerita Toko Bibit",
      "bookReference": "hlm. 80–88",
      "objective": "Terapkan Part-to-Whole, Additive Parts Sum, dan Time-Rate Conversion.",
      "mechanicDescription": "Tiga ronde: bagian:total, hitung jumlah, durasi waktu.",
      "voiceGuide": "Pilih jawaban terkait penerapan rasio.",
      "emoji": "🥧",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-c-c",
      "title": "Urutkan Waktu Tempuh",
      "bookReference": "hlm. 80–88",
      "objective": "Terapkan Part-to-Whole, Additive Parts Sum, dan Time-Rate Conversion.",
      "mechanicDescription": "Tiga ronde: bagian:total, hitung jumlah, durasi waktu.",
      "voiceGuide": "Pilih jawaban terkait penerapan rasio.",
      "emoji": "🥧",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-c-p",
      "title": "Diagram Hitung Bagian Total",
      "bookReference": "hlm. 80–88",
      "objective": "Terapkan Part-to-Whole, Additive Parts Sum, dan Time-Rate Conversion.",
      "mechanicDescription": "Tiga ronde: bagian:total, hitung jumlah, durasi waktu.",
      "voiceGuide": "Pilih jawaban terkait penerapan rasio.",
      "diagramType": "hitung",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "rumus-c-p",
      "title": "Diagram Arti Part-to-Whole",
      "bookReference": "hlm. 80–88",
      "objective": "Terapkan Part-to-Whole, Additive Parts Sum, dan Time-Rate Conversion.",
      "mechanicDescription": "Tiga ronde: bagian:total, hitung jumlah, durasi waktu.",
      "voiceGuide": "Pilih jawaban terkait penerapan rasio.",
      "diagramType": "rumus",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "arti-c-p",
      "title": "Diagram Pilih Jumlah Bagian",
      "bookReference": "hlm. 80–88",
      "objective": "Terapkan Part-to-Whole, Additive Parts Sum, dan Time-Rate Conversion.",
      "mechanicDescription": "Tiga ronde: bagian:total, hitung jumlah, durasi waktu.",
      "voiceGuide": "Pilih jawaban terkait penerapan rasio.",
      "diagramType": "arti",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "sortir-c-p",
      "title": "Diagram Pilah Part/Whole",
      "bookReference": "hlm. 80–88",
      "objective": "Terapkan Part-to-Whole, Additive Parts Sum, dan Time-Rate Conversion.",
      "mechanicDescription": "Tiga ronde: bagian:total, hitung jumlah, durasi waktu.",
      "voiceGuide": "Pilih jawaban terkait penerapan rasio.",
      "diagramType": "sortir",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-c-p",
      "title": "Diagram Jodohkan Cerita-Hasil",
      "bookReference": "hlm. 80–88",
      "objective": "Terapkan Part-to-Whole, Additive Parts Sum, dan Time-Rate Conversion.",
      "mechanicDescription": "Tiga ronde: bagian:total, hitung jumlah, durasi waktu.",
      "voiceGuide": "Pilih jawaban terkait penerapan rasio.",
      "diagramType": "jodoh",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memori-c-p",
      "title": "Diagram Memori Penerapan",
      "bookReference": "hlm. 80–88",
      "objective": "Terapkan Part-to-Whole, Additive Parts Sum, dan Time-Rate Conversion.",
      "mechanicDescription": "Tiga ronde: bagian:total, hitung jumlah, durasi waktu.",
      "voiceGuide": "Pilih jawaban terkait penerapan rasio.",
      "diagramType": "memori",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-c-p",
      "title": "Diagram Ketuk Hasil Bagian",
      "bookReference": "hlm. 80–88",
      "objective": "Terapkan Part-to-Whole, Additive Parts Sum, dan Time-Rate Conversion.",
      "mechanicDescription": "Tiga ronde: bagian:total, hitung jumlah, durasi waktu.",
      "voiceGuide": "Pilih jawaban terkait penerapan rasio.",
      "diagramType": "ketuk",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "semua-c-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 80–88",
      "objective": "Terapkan Part-to-Whole, Additive Parts Sum, dan Time-Rate Conversion.",
      "mechanicDescription": "Tiga ronde: bagian:total, hitung jumlah, durasi waktu.",
      "voiceGuide": "Pilih jawaban terkait penerapan rasio.",
      "diagramType": "semua",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "cerita-c-p",
      "title": "Diagram Cerita Toko Bibit",
      "bookReference": "hlm. 80–88",
      "objective": "Terapkan Part-to-Whole, Additive Parts Sum, dan Time-Rate Conversion.",
      "mechanicDescription": "Tiga ronde: bagian:total, hitung jumlah, durasi waktu.",
      "voiceGuide": "Pilih jawaban terkait penerapan rasio.",
      "diagramType": "cerita",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "urut-c-p",
      "title": "Diagram Urutkan Waktu Tempuh",
      "bookReference": "hlm. 80–88",
      "objective": "Terapkan Part-to-Whole, Additive Parts Sum, dan Time-Rate Conversion.",
      "mechanicDescription": "Tiga ronde: bagian:total, hitung jumlah, durasi waktu.",
      "voiceGuide": "Pilih jawaban terkait penerapan rasio.",
      "diagramType": "urut",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-c-a",
      "title": "Tulis Hitung Bagian Total",
      "bookReference": "hlm. 80–88",
      "objective": "Terapkan Part-to-Whole, Additive Parts Sum, dan Time-Rate Conversion.",
      "mechanicDescription": "Tiga ronde: bagian:total, hitung jumlah, durasi waktu.",
      "voiceGuide": "Pilih jawaban terkait penerapan rasio.",
      "symbolLarge": "🥧",
      "wordLarge": "PENERAPAN RASIO",
      "mathNotation": "a:(a+b)"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-c-a",
      "title": "Tulis Arti Part-to-Whole",
      "bookReference": "hlm. 80–88",
      "objective": "Terapkan Part-to-Whole, Additive Parts Sum, dan Time-Rate Conversion.",
      "mechanicDescription": "Tiga ronde: bagian:total, hitung jumlah, durasi waktu.",
      "voiceGuide": "Pilih jawaban terkait penerapan rasio.",
      "symbolLarge": "🥧",
      "wordLarge": "PENERAPAN RASIO",
      "mathNotation": "a:(a+b)"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-c-a",
      "title": "Tulis Pilih Jumlah Bagian",
      "bookReference": "hlm. 80–88",
      "objective": "Terapkan Part-to-Whole, Additive Parts Sum, dan Time-Rate Conversion.",
      "mechanicDescription": "Tiga ronde: bagian:total, hitung jumlah, durasi waktu.",
      "voiceGuide": "Pilih jawaban terkait penerapan rasio.",
      "symbolLarge": "🥧",
      "wordLarge": "PENERAPAN RASIO",
      "mathNotation": "a:(a+b)"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-c-a",
      "title": "Tulis Pilah Part/Whole",
      "bookReference": "hlm. 80–88",
      "objective": "Terapkan Part-to-Whole, Additive Parts Sum, dan Time-Rate Conversion.",
      "mechanicDescription": "Tiga ronde: bagian:total, hitung jumlah, durasi waktu.",
      "voiceGuide": "Pilih jawaban terkait penerapan rasio.",
      "symbolLarge": "🥧",
      "wordLarge": "PENERAPAN RASIO",
      "mathNotation": "a:(a+b)"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-c-a",
      "title": "Tulis Jodohkan Cerita-Hasil",
      "bookReference": "hlm. 80–88",
      "objective": "Terapkan Part-to-Whole, Additive Parts Sum, dan Time-Rate Conversion.",
      "mechanicDescription": "Tiga ronde: bagian:total, hitung jumlah, durasi waktu.",
      "voiceGuide": "Pilih jawaban terkait penerapan rasio.",
      "symbolLarge": "🥧",
      "wordLarge": "PENERAPAN RASIO",
      "mathNotation": "a:(a+b)"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-c-a",
      "title": "Tulis Memori Penerapan",
      "bookReference": "hlm. 80–88",
      "objective": "Terapkan Part-to-Whole, Additive Parts Sum, dan Time-Rate Conversion.",
      "mechanicDescription": "Tiga ronde: bagian:total, hitung jumlah, durasi waktu.",
      "voiceGuide": "Pilih jawaban terkait penerapan rasio.",
      "symbolLarge": "🥧",
      "wordLarge": "PENERAPAN RASIO",
      "mathNotation": "a:(a+b)"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-c",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 80–88",
      "objective": "Terapkan Part-to-Whole, Additive Parts Sum, dan Time-Rate Conversion.",
      "mechanicDescription": "Dua ronde menilai pernyataan.",
      "voiceGuide": "Benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-c",
      "title": "Detektif Rasio",
      "bookReference": "hlm. 80–88",
      "objective": "Terapkan Part-to-Whole, Additive Parts Sum, dan Time-Rate Conversion.",
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
      "bookReference": "hlm. 80–88",
      "objective": "Terapkan Part-to-Whole, Additive Parts Sum, dan Time-Rate Conversion.",
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
      "bookReference": "hlm. 80–88",
      "objective": "Terapkan Part-to-Whole, Additive Parts Sum, dan Time-Rate Conversion.",
      "mechanicDescription": "Tiga ronde cerita.",
      "voiceGuide": "Baca lalu pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "➕",
      "nama": "Jumlah",
      "isi": "Jumlah suku rasio = banyak bagian total (Additive Parts Sum).",
      "suara": "4+5=9."
    },
    {
      "ikon": "🥧",
      "nama": "Whole",
      "isi": "Bagian terhadap keseluruhan a:(a+b) (Part-to-Whole).",
      "suara": "4:9 bukan 4:5."
    },
    {
      "ikon": "⏱️",
      "nama": "Waktu",
      "isi": "Samakan satuan lalu skala (Time-Rate Conversion).",
      "suara": "km per jam."
    },
    {
      "ikon": "▦",
      "nama": "Tabel",
      "isi": "Tabel rasio tetap andalan saat total diketahui.",
      "suara": "390 pengunjung."
    }
  ],
  "poinSuara": "Ingat: jumlahkan suku untuk total bagian, tulis bagian terhadap keseluruhan, dan samakan satuan waktu sebelum menskala.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Tulis a:b",
        "warna": "#FDE68A"
      },
      {
        "teks": "jumlah bagian",
        "warna": "#BBF7D0"
      },
      {
        "teks": "bagi total",
        "warna": "#BFDBFE"
      },
      {
        "teks": "skala waktu bila perlu",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: catat rasio buku cerita dan buku pelajaran di rak, lalu hitung masing-masing terhadap seluruh buku.",
  "refleksi": [
    "Apa bedanya 4:5 dan 4:9?",
    "Bagaimana mencari jumlah anak dari rasio 9:4 dan total 390?",
    "Mengapa satuan waktu harus disamakan dulu?"
  ]
};

export const SUB_BAB_K6B2: SubBabNaskah[] = [SUB_A62, SUB_B62, SUB_C62];
export const semuaAdeganK6B2 = SUB_BAB_K6B2.flatMap((s) => s.videos.flatMap((v) => v.adegan));
