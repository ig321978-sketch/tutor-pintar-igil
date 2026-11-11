/**
 * Naskah Matematika Kelas 6 Bab 1 — Pecahan dan Desimal (mendalam + metode luar berlabel).
 * Sumber buku: Kemendikbudristek Bab 1 hlm. 1–41. Sub-Bab A–C (Materi).
 * Adopsi naskah IGIL lama: Area Model, Panah Lurus, Panah Menyilang, Ubah ke 10/100.
 * Satu sumber: buat-k6-bab1.mjs → kelas6-bab1.json. Tanpa React/jaringan.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K6B1_META = {
  "chapterId": "k6-mat-bab1",
  "phaseCode": "FASE_C",
  "grade": 6,
  "subjectLabel": "MATEMATIKA - KELAS 6 SD",
  "title": "BAB 1: PECAHAN DAN DESIMAL",
  "silabusElemen": "🌈 Fase C • Elemen Bilangan: Perkalian Pecahan, Pembagian Pecahan, dan Bilangan Desimal (Kelas 6 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A61: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Perkalian Pecahan)",
  "fullTitle": "Sub-Bab A: Perkalian Pecahan",
  "targetDescription": "Siswa mengalikan bilangan asli dengan pecahan dan sebaliknya memakai model luas kebun/ember serta aturan Panah Lurus sesuai Buku Siswa Kelas VI Bab 1 Sub-Bab A hlm. 7–15, mengadopsi metode naskah IGIL lama.",
  "secondaryBg": "#FFEDD5",
  "secondaryBorder": "#EA580C",
  "secondaryText": "#7C2D12",
  "silabus": {
    "teksSuara": "Agam membantu Ayah menyiram kebun. Ember kecil menyiram tiga per lima meter persegi. Dua ember menjadi enam per lima. METODE LUAR Area Model Multiplication dan Straight-Arrow Multiply Protocol dari naskah IGIL lama: tulis bilangan asli sebagai pecahan berpenyebut satu, kotak merah pada pecahan kiri, panah hijau lurus, kalikan pembilang dengan pembilang dan penyebut dengan penyebut. Urutan kali tidak mengubah hasil. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa mengalikan bilangan asli dengan pecahan dan pecahan dengan bilangan asli, serta menafsirkan hasil pada konteks luas/banyak.",
    "referensi": "Buku Siswa Matematika Kelas VI Bab 1 Sub-Bab A hlm. 7–15; Naskah IGIL lama · Area Model; Straight-Arrow Multiply (Panah Lurus); Whole-as-Fraction a/1."
  },
  "videos": [
    {
      "id": "K6B1A-V1",
      "judul": "Ember & Area Model",
      "subjudul": "Area Model",
      "adegan": [
        {
          "id": "K6B1A-V1-1",
          "judul": "Ember besar dulu",
          "ketukan": [
            "Ayah memakai ember besar: satu ember menyiram 2 meter persegi.",
            "Lima ember besar: 5 × 2 = 10 meter persegi.",
            "Ini pengingat: bilangan asli dikali bilangan asli.",
            "Lalu kita masuk ke pecahan."
          ],
          "papan": [
            "ember besar",
            "5 × 2 = 10",
            "bilangan asli",
            "siap pecahan"
          ]
        },
        {
          "id": "K6B1A-V1-2",
          "judul": "Ember kecil 3/5",
          "ketukan": [
            "Satu meter persegi dibagi 5 kotak; ember kecil mengisi 3 kotak = 3/5 m².",
            "Dua ember kecil: 2 × 3/5.",
            "METODE LUAR · Area Model Multiplication.",
            "Dua kali tiga kotak dari seperlima = enam seperlima = 6/5."
          ],
          "papan": [
            "3/5 m²",
            "2 × 3/5",
            "Area Model",
            "6/5"
          ]
        },
        {
          "id": "K6B1A-V1-3",
          "judul": "Lima ember kecil",
          "ketukan": [
            "5 × 3/5 = 15/5 = 3 meter persegi.",
            "Hasil bisa lebih dari 1 jika pembilang hasil ≥ penyebut.",
            "Area model membuat arti 'berapa bagian' terlihat.",
            "Siap ke aturan panah lurus."
          ],
          "papan": [
            "5 × 3/5 = 3",
            "boleh > 1",
            "arti visual",
            "panah lurus"
          ]
        }
      ]
    },
    {
      "id": "K6B1A-V2",
      "judul": "Panah Lurus ×",
      "subjudul": "Straight Arrow",
      "adegan": [
        {
          "id": "K6B1A-V2-1",
          "judul": "Tulis a sebagai a/1",
          "ketukan": [
            "Bilangan asli ditulis pecahan: 2 menjadi 2/1.",
            "METODE LUAR · Whole-as-Fraction Protocol (naskah lama: kotak merah pada a/1).",
            "Lalu kalikan dengan pecahan lain.",
            "Ini fondasi Panah Lurus."
          ],
          "papan": [
            "2 = 2/1",
            "kotak merah",
            "Whole-as-Fraction",
            "fondasi"
          ]
        },
        {
          "id": "K6B1A-V2-2",
          "judul": "Panah hijau lurus",
          "ketukan": [
            "METODE LUAR · Straight-Arrow Multiply Protocol (Panah Lurus naskah lama).",
            "Panah lurus: kalikan atas dengan atas, bawah dengan bawah.",
            "2/1 × 3/5 = (2×3)/(1×5) = 6/5.",
            "Jangan menyilang saat operasi kali."
          ],
          "papan": [
            "panah lurus",
            "atas×atas",
            "bawah×bawah",
            "6/5"
          ]
        },
        {
          "id": "K6B1A-V2-3",
          "judul": "Pecahan × asli",
          "ketukan": [
            "2/3 × 15 = 2/3 × 15/1 = 30/3 = 10 pohon manalagi.",
            "1/4 × 20 = 20 × 1/4 = 5; urutan tidak mengubah hasil.",
            "METODE LUAR · Commutative Multiply Check.",
            "Rumus: a/c × b = (a×b)/c."
          ],
          "papan": [
            "2/3 × 15 = 10",
            "komutatif",
            "cek urutan",
            "rumus"
          ]
        }
      ]
    },
    {
      "id": "K6B1A-V3",
      "judul": "Latihan Makna & Siap B",
      "subjudul": "Ayo",
      "adegan": [
        {
          "id": "K6B1A-V3-1",
          "judul": "Cerita gelas & petak",
          "ketukan": [
            "4 gelas × 2/5 liter = 8/5 liter.",
            "2 petak × 3/4 m² = 6/4 = 3/2 m².",
            "5 × 1/5 = 1 (hasil utuh).",
            "Selalu tafsirkan satuan: liter, m², kg."
          ],
          "papan": [
            "8/5 liter",
            "3/2 m²",
            "hasil 1",
            "tafsir satuan"
          ]
        },
        {
          "id": "K6B1A-V3-2",
          "judul": "Kesalahan umum",
          "ketukan": [
            "Salah: menyilang saat kali (itu milik bagi).",
            "Salah: lupa ubah bilangan asli jadi a/1.",
            "Salah: mengalikan hanya pembilang.",
            "Cek dengan area model singkat."
          ],
          "papan": [
            "jangan silang di ×",
            "wajib a/1",
            "bukan hanya atas",
            "cek area"
          ]
        },
        {
          "id": "K6B1A-V3-3",
          "judul": "Siap B",
          "ketukan": [
            "Perkalian memakai panah lurus.",
            "Berikutnya pembagian memakai panah menyilang dan kebalikan.",
            "Area model tetap menolong arti.",
            "Ayo Sub-Bab B!"
          ],
          "papan": [
            "× = lurus",
            "lanjut bagi",
            "area tetap",
            "ke B"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Cerita luas",
      "stepDesc": "Baca soal Perkalian Pecahan dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Ember/kebun Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa mengalikan bilangan asli dengan pecahan dan sebaliknya memakai model luas kebun/ember serta aturan Panah Lurus ses….",
      "icon": "🪴",
      "flowFrom": "Cerita luas",
      "flowTo": "Area model"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Area model",
      "stepDesc": "Bagian sama. Pada Perkalian Pecahan, langkah “Area model” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "▦",
      "flowFrom": "Area model",
      "flowTo": "Tulis a/1"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Tulis a/1",
      "stepDesc": "Whole-as-Fraction. Pada Perkalian Pecahan, langkah “Tulis a/1” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "¹⁄₁",
      "flowFrom": "Tulis a/1",
      "flowTo": "Panah lurus"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Panah lurus",
      "stepDesc": "atas×atas, bawah×bawah. Pada Perkalian Pecahan, langkah “Panah lurus” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "➡️",
      "flowFrom": "Panah lurus",
      "flowTo": "Sederhanakan"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Sederhanakan",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Perkalian Pecahan. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "÷",
      "flowFrom": "Sederhanakan",
      "flowTo": "Tafsir"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Tafsir",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Perkalian Pecahan. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Tafsir",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Area Model",
      "emoji": "▦",
      "countNum": 1,
      "countWord": "luas bagian",
      "suara": "Metode luar."
    },
    {
      "judul": "a = a/1",
      "emoji": "¹",
      "countNum": 1,
      "countWord": "Whole-as-Fraction",
      "suara": "Naskah lama."
    },
    {
      "judul": "Panah lurus",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "× atas & bawah",
      "suara": "Straight-Arrow."
    },
    {
      "judul": "2 × 3/5",
      "emoji": "×",
      "countNum": 1,
      "countWord": "6/5",
      "suara": "Ember."
    },
    {
      "judul": "5 × 3/5",
      "emoji": "×",
      "countNum": 3,
      "countWord": "15/5=3",
      "suara": "Utuh."
    },
    {
      "judul": "2/3 × 15",
      "emoji": "🌳",
      "countNum": 10,
      "countWord": "10 pohon",
      "suara": "Manalagi."
    },
    {
      "judul": "Komutatif",
      "emoji": "↔️",
      "countNum": 1,
      "countWord": "a×b=b×a",
      "suara": "Cek."
    },
    {
      "judul": "Rumus",
      "emoji": "ƒ",
      "countNum": 1,
      "countWord": "(a×b)/c",
      "suara": "Inti."
    },
    {
      "judul": "Satuan",
      "emoji": "📏",
      "countNum": 1,
      "countWord": "liter/m²/kg",
      "suara": "Tafsir."
    },
    {
      "judul": "Siap B",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "pembagian",
      "suara": "Lanjut."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-a-c",
      "title": "Hitung Hasil Kali",
      "bookReference": "hlm. 7–15",
      "objective": "Kalikan pecahan dengan Area Model dan Straight-Arrow Multiply (Panah Lurus).",
      "mechanicDescription": "Tiga ronde: a/1, panah lurus, tafsir satuan.",
      "voiceGuide": "Pilih jawaban terkait perkalian pecahan.",
      "emoji": "×",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-a-c",
      "title": "Arti Panah Lurus",
      "bookReference": "hlm. 7–15",
      "objective": "Kalikan pecahan dengan Area Model dan Straight-Arrow Multiply (Panah Lurus).",
      "mechanicDescription": "Tiga ronde: a/1, panah lurus, tafsir satuan.",
      "voiceGuide": "Pilih jawaban terkait perkalian pecahan.",
      "emoji": "×",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-a-c",
      "title": "Pilih Rumus Kali",
      "bookReference": "hlm. 7–15",
      "objective": "Kalikan pecahan dengan Area Model dan Straight-Arrow Multiply (Panah Lurus).",
      "mechanicDescription": "Tiga ronde: a/1, panah lurus, tafsir satuan.",
      "voiceGuide": "Pilih jawaban terkait perkalian pecahan.",
      "emoji": "×",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-a-c",
      "title": "Pilah Lurus/Silang",
      "bookReference": "hlm. 7–15",
      "objective": "Kalikan pecahan dengan Area Model dan Straight-Arrow Multiply (Panah Lurus).",
      "mechanicDescription": "Tiga ronde: a/1, panah lurus, tafsir satuan.",
      "voiceGuide": "Pilih jawaban terkait perkalian pecahan.",
      "emoji": "×",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-a-c",
      "title": "Jodohkan Cerita-Hasil",
      "bookReference": "hlm. 7–15",
      "objective": "Kalikan pecahan dengan Area Model dan Straight-Arrow Multiply (Panah Lurus).",
      "mechanicDescription": "Tiga ronde: a/1, panah lurus, tafsir satuan.",
      "voiceGuide": "Pilih jawaban terkait perkalian pecahan.",
      "emoji": "×",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-a-c",
      "title": "Memori Perkalian",
      "bookReference": "hlm. 7–15",
      "objective": "Kalikan pecahan dengan Area Model dan Straight-Arrow Multiply (Panah Lurus).",
      "mechanicDescription": "Tiga ronde: a/1, panah lurus, tafsir satuan.",
      "voiceGuide": "Pilih jawaban terkait perkalian pecahan.",
      "emoji": "×",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-a-c",
      "title": "Ketuk Hasil",
      "bookReference": "hlm. 7–15",
      "objective": "Kalikan pecahan dengan Area Model dan Straight-Arrow Multiply (Panah Lurus).",
      "mechanicDescription": "Tiga ronde: a/1, panah lurus, tafsir satuan.",
      "voiceGuide": "Pilih jawaban terkait perkalian pecahan.",
      "emoji": "×",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-a-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 7–15",
      "objective": "Kalikan pecahan dengan Area Model dan Straight-Arrow Multiply (Panah Lurus).",
      "mechanicDescription": "Tiga ronde: a/1, panah lurus, tafsir satuan.",
      "voiceGuide": "Pilih jawaban terkait perkalian pecahan.",
      "emoji": "×",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-a-c",
      "title": "Cerita Ember Kebun",
      "bookReference": "hlm. 7–15",
      "objective": "Kalikan pecahan dengan Area Model dan Straight-Arrow Multiply (Panah Lurus).",
      "mechanicDescription": "Tiga ronde: a/1, panah lurus, tafsir satuan.",
      "voiceGuide": "Pilih jawaban terkait perkalian pecahan.",
      "emoji": "×",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-a-c",
      "title": "Urutkan Hasil Pecahan",
      "bookReference": "hlm. 7–15",
      "objective": "Kalikan pecahan dengan Area Model dan Straight-Arrow Multiply (Panah Lurus).",
      "mechanicDescription": "Tiga ronde: a/1, panah lurus, tafsir satuan.",
      "voiceGuide": "Pilih jawaban terkait perkalian pecahan.",
      "emoji": "×",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-a-p",
      "title": "Diagram Hitung Hasil Kali",
      "bookReference": "hlm. 7–15",
      "objective": "Kalikan pecahan dengan Area Model dan Straight-Arrow Multiply (Panah Lurus).",
      "mechanicDescription": "Tiga ronde: a/1, panah lurus, tafsir satuan.",
      "voiceGuide": "Pilih jawaban terkait perkalian pecahan.",
      "diagramType": "hitung",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "rumus-a-p",
      "title": "Diagram Arti Panah Lurus",
      "bookReference": "hlm. 7–15",
      "objective": "Kalikan pecahan dengan Area Model dan Straight-Arrow Multiply (Panah Lurus).",
      "mechanicDescription": "Tiga ronde: a/1, panah lurus, tafsir satuan.",
      "voiceGuide": "Pilih jawaban terkait perkalian pecahan.",
      "diagramType": "rumus",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "arti-a-p",
      "title": "Diagram Pilih Rumus Kali",
      "bookReference": "hlm. 7–15",
      "objective": "Kalikan pecahan dengan Area Model dan Straight-Arrow Multiply (Panah Lurus).",
      "mechanicDescription": "Tiga ronde: a/1, panah lurus, tafsir satuan.",
      "voiceGuide": "Pilih jawaban terkait perkalian pecahan.",
      "diagramType": "arti",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sortir-a-p",
      "title": "Diagram Pilah Lurus/Silang",
      "bookReference": "hlm. 7–15",
      "objective": "Kalikan pecahan dengan Area Model dan Straight-Arrow Multiply (Panah Lurus).",
      "mechanicDescription": "Tiga ronde: a/1, panah lurus, tafsir satuan.",
      "voiceGuide": "Pilih jawaban terkait perkalian pecahan.",
      "diagramType": "sortir",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-a-p",
      "title": "Diagram Jodohkan Cerita-Hasil",
      "bookReference": "hlm. 7–15",
      "objective": "Kalikan pecahan dengan Area Model dan Straight-Arrow Multiply (Panah Lurus).",
      "mechanicDescription": "Tiga ronde: a/1, panah lurus, tafsir satuan.",
      "voiceGuide": "Pilih jawaban terkait perkalian pecahan.",
      "diagramType": "jodoh",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memori-a-p",
      "title": "Diagram Memori Perkalian",
      "bookReference": "hlm. 7–15",
      "objective": "Kalikan pecahan dengan Area Model dan Straight-Arrow Multiply (Panah Lurus).",
      "mechanicDescription": "Tiga ronde: a/1, panah lurus, tafsir satuan.",
      "voiceGuide": "Pilih jawaban terkait perkalian pecahan.",
      "diagramType": "memori",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-a-p",
      "title": "Diagram Ketuk Hasil",
      "bookReference": "hlm. 7–15",
      "objective": "Kalikan pecahan dengan Area Model dan Straight-Arrow Multiply (Panah Lurus).",
      "mechanicDescription": "Tiga ronde: a/1, panah lurus, tafsir satuan.",
      "voiceGuide": "Pilih jawaban terkait perkalian pecahan.",
      "diagramType": "ketuk",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "semua-a-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 7–15",
      "objective": "Kalikan pecahan dengan Area Model dan Straight-Arrow Multiply (Panah Lurus).",
      "mechanicDescription": "Tiga ronde: a/1, panah lurus, tafsir satuan.",
      "voiceGuide": "Pilih jawaban terkait perkalian pecahan.",
      "diagramType": "semua",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "cerita-a-p",
      "title": "Diagram Cerita Ember Kebun",
      "bookReference": "hlm. 7–15",
      "objective": "Kalikan pecahan dengan Area Model dan Straight-Arrow Multiply (Panah Lurus).",
      "mechanicDescription": "Tiga ronde: a/1, panah lurus, tafsir satuan.",
      "voiceGuide": "Pilih jawaban terkait perkalian pecahan.",
      "diagramType": "cerita",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "urut-a-p",
      "title": "Diagram Urutkan Hasil Pecahan",
      "bookReference": "hlm. 7–15",
      "objective": "Kalikan pecahan dengan Area Model dan Straight-Arrow Multiply (Panah Lurus).",
      "mechanicDescription": "Tiga ronde: a/1, panah lurus, tafsir satuan.",
      "voiceGuide": "Pilih jawaban terkait perkalian pecahan.",
      "diagramType": "urut",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-a-a",
      "title": "Tulis Hitung Hasil Kali",
      "bookReference": "hlm. 7–15",
      "objective": "Kalikan pecahan dengan Area Model dan Straight-Arrow Multiply (Panah Lurus).",
      "mechanicDescription": "Tiga ronde: a/1, panah lurus, tafsir satuan.",
      "voiceGuide": "Pilih jawaban terkait perkalian pecahan.",
      "symbolLarge": "×",
      "wordLarge": "KALI PECAHAN",
      "mathNotation": "a/1 × b/c"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-a-a",
      "title": "Tulis Arti Panah Lurus",
      "bookReference": "hlm. 7–15",
      "objective": "Kalikan pecahan dengan Area Model dan Straight-Arrow Multiply (Panah Lurus).",
      "mechanicDescription": "Tiga ronde: a/1, panah lurus, tafsir satuan.",
      "voiceGuide": "Pilih jawaban terkait perkalian pecahan.",
      "symbolLarge": "×",
      "wordLarge": "KALI PECAHAN",
      "mathNotation": "a/1 × b/c"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-a-a",
      "title": "Tulis Pilih Rumus Kali",
      "bookReference": "hlm. 7–15",
      "objective": "Kalikan pecahan dengan Area Model dan Straight-Arrow Multiply (Panah Lurus).",
      "mechanicDescription": "Tiga ronde: a/1, panah lurus, tafsir satuan.",
      "voiceGuide": "Pilih jawaban terkait perkalian pecahan.",
      "symbolLarge": "×",
      "wordLarge": "KALI PECAHAN",
      "mathNotation": "a/1 × b/c"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-a-a",
      "title": "Tulis Pilah Lurus/Silang",
      "bookReference": "hlm. 7–15",
      "objective": "Kalikan pecahan dengan Area Model dan Straight-Arrow Multiply (Panah Lurus).",
      "mechanicDescription": "Tiga ronde: a/1, panah lurus, tafsir satuan.",
      "voiceGuide": "Pilih jawaban terkait perkalian pecahan.",
      "symbolLarge": "×",
      "wordLarge": "KALI PECAHAN",
      "mathNotation": "a/1 × b/c"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-a-a",
      "title": "Tulis Jodohkan Cerita-Hasil",
      "bookReference": "hlm. 7–15",
      "objective": "Kalikan pecahan dengan Area Model dan Straight-Arrow Multiply (Panah Lurus).",
      "mechanicDescription": "Tiga ronde: a/1, panah lurus, tafsir satuan.",
      "voiceGuide": "Pilih jawaban terkait perkalian pecahan.",
      "symbolLarge": "×",
      "wordLarge": "KALI PECAHAN",
      "mathNotation": "a/1 × b/c"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-a-a",
      "title": "Tulis Memori Perkalian",
      "bookReference": "hlm. 7–15",
      "objective": "Kalikan pecahan dengan Area Model dan Straight-Arrow Multiply (Panah Lurus).",
      "mechanicDescription": "Tiga ronde: a/1, panah lurus, tafsir satuan.",
      "voiceGuide": "Pilih jawaban terkait perkalian pecahan.",
      "symbolLarge": "×",
      "wordLarge": "KALI PECAHAN",
      "mathNotation": "a/1 × b/c"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-a",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 7–15",
      "objective": "Kalikan pecahan dengan Area Model dan Straight-Arrow Multiply (Panah Lurus).",
      "mechanicDescription": "Dua ronde menilai pernyataan.",
      "voiceGuide": "Benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-a",
      "title": "Detektif Pecahan",
      "bookReference": "hlm. 7–15",
      "objective": "Kalikan pecahan dengan Area Model dan Straight-Arrow Multiply (Panah Lurus).",
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
      "bookReference": "hlm. 7–15",
      "objective": "Kalikan pecahan dengan Area Model dan Straight-Arrow Multiply (Panah Lurus).",
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
      "bookReference": "hlm. 7–15",
      "objective": "Kalikan pecahan dengan Area Model dan Straight-Arrow Multiply (Panah Lurus).",
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
      "nama": "Area",
      "isi": "Gambar bagian sama untuk memahami a × b/c (Area Model Multiplication).",
      "suara": "Ember/kebun."
    },
    {
      "ikon": "¹⁄₁",
      "nama": "a/1",
      "isi": "Tulis bilangan asli sebagai pecahan berpenyebut 1 (Whole-as-Fraction).",
      "suara": "Kotak merah naskah lama."
    },
    {
      "ikon": "➡️",
      "nama": "Lurus",
      "isi": "Panah hijau lurus: kali pembilang–pembilang dan penyebut–penyebut (Straight-Arrow).",
      "suara": "Bukan silang."
    },
    {
      "ikon": "↔️",
      "nama": "Urutan",
      "isi": "a × b/c = b/c × a; cek komutatif.",
      "suara": "Jeruk 1/4 × 20."
    }
  ],
  "poinSuara": "Ingat: ubah bilangan asli jadi per satu, panah lurus saat kali, kalikan atas dengan atas dan bawah dengan bawah, lalu tafsirkan satuannya.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Cerita & area",
        "warna": "#FDE68A"
      },
      {
        "teks": "tulis a/1",
        "warna": "#BBF7D0"
      },
      {
        "teks": "panah lurus ×",
        "warna": "#BFDBFE"
      },
      {
        "teks": "sederhanakan & tafsir",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: ukur 2/5 piring nasi dikalikan 3 porsi, hitung dengan panah lurus, lalu cek dengan gambar bagian.",
  "refleksi": [
    "Mengapa bilangan asli ditulis a/1 sebelum dikali pecahan?",
    "Apa bedanya panah lurus dan panah menyilang?",
    "Bagaimana area model menjelaskan 2 × 3/5 = 6/5?"
  ]
};
export const SUB_B61: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Pembagian Pecahan)",
  "fullTitle": "Sub-Bab B: Pembagian Pecahan",
  "targetDescription": "Siswa membagi pecahan dengan bilangan asli dan bilangan asli dengan pecahan memakai panah menyilang (kali kebalikan) sesuai Buku Siswa Kelas VI Bab 1 Sub-Bab B hlm. 15–29, mengadopsi metode naskah IGIL lama.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Setengah liter dibagi tiga gelas menjadi seperenam liter. METODE LUAR Cross-Arrow Divide Protocol atau Panah Menyilang naskah lama: bagi sama dengan kali kebalikan. Kotak merah pada pecahan yang dibagi, panah hijau menyilang. Membagi bilangan asli dengan pecahan memperbanyak hasil karena bagiannya lebih kecil, misalnya 3 dibagi seperempat sama dengan 12. Bilangan kebalikan dari a/b adalah b/a. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa membagi pecahan dengan bilangan asli dan sebaliknya, serta memakai konsep kebalikan.",
    "referensi": "Buku Siswa Matematika Kelas VI Bab 1 Sub-Bab B hlm. 15–29; Naskah IGIL lama · Cross-Arrow Divide (Panah Menyilang); Reciprocal/Invert-and-Multiply; Partition & Measurement Division."
  },
  "videos": [
    {
      "id": "K6B1B-V1",
      "judul": "Bagi ke Gelas",
      "subjudul": "Partition",
      "adegan": [
        {
          "id": "K6B1B-V1-1",
          "judul": "1 liter : 3",
          "ketukan": [
            "Satu liter dibagi 3 gelas = 1/3 liter tiap gelas.",
            "Ini pembagian bilangan asli.",
            "Lalu botol hanya 1/2 liter untuk 3 gelas.",
            "METODE LUAR · Partition Division."
          ],
          "papan": [
            "1 : 3 = 1/3",
            "partisi",
            "1/2 : 3",
            "Partition"
          ]
        },
        {
          "id": "K6B1B-V1-2",
          "judul": "1/2 : 3 = 1/6",
          "ketukan": [
            "Setengah dibagi tiga: tiap gelas sepertiga dari setengah.",
            "Hitung: 1/2 : 3/1.",
            "Hasil 1/6 liter.",
            "Area/partition: potong setengah jadi tiga."
          ],
          "papan": [
            "1/2 : 3",
            "1/6",
            "sepertiga dari ½",
            "visual"
          ]
        },
        {
          "id": "K6B1B-V1-3",
          "judul": "1/3 : 3 = 1/9",
          "ketukan": [
            "Sepertiga dibagi tiga lagi menjadi sepersembilan.",
            "Bagian makin kecil, penyebut membesar.",
            "4/3 : 2 = 2/3 (boleh bagi pembilang dulu jika habis).",
            "Cek dengan panah menyilang harus sama."
          ],
          "papan": [
            "1/3 : 3 = 1/9",
            "penyebut naik",
            "4/3 : 2 = 2/3",
            "cek silang"
          ]
        }
      ]
    },
    {
      "id": "K6B1B-V2",
      "judul": "Panah Menyilang :",
      "subjudul": "Cross Arrow",
      "adegan": [
        {
          "id": "K6B1B-V2-1",
          "judul": "Kali kebalikan",
          "ketukan": [
            "METODE LUAR · Invert-and-Multiply / Reciprocal.",
            "a/b : c/d = a/b × d/c.",
            "Kebalikan 3/1 adalah 1/3.",
            "Naskah lama: panah hijau menyilang."
          ],
          "papan": [
            "kali kebalikan",
            "Reciprocal",
            "panah silang",
            "aturan"
          ]
        },
        {
          "id": "K6B1B-V2-2",
          "judul": "Protokol silang",
          "ketukan": [
            "METODE LUAR · Cross-Arrow Divide Protocol.",
            "Kotak merah pada pecahan kiri yang dibagi.",
            "Panah menyilang menghubungkan ke kebalikan kanan.",
            "1/2 : 3 = 1/2 × 1/3 = 1/6."
          ],
          "papan": [
            "kotak merah",
            "panah silang",
            "× kebalikan",
            "1/6"
          ]
        },
        {
          "id": "K6B1B-V2-3",
          "judul": "Asli : pecahan",
          "ketukan": [
            "3 : 1/4 = 3 × 4/1 = 12 gelas.",
            "Hasil membesar karena gelas lebih kecil dari 1 liter.",
            "3 : 2/5 = 3 × 5/2 = 15/2.",
            "METODE LUAR · Measurement Division."
          ],
          "papan": [
            "3 : 1/4 = 12",
            "hasil membesar",
            "15/2",
            "Measurement"
          ]
        }
      ]
    },
    {
      "id": "K6B1B-V3",
      "judul": "Latihan & Siap C",
      "subjudul": "Ayo",
      "adegan": [
        {
          "id": "K6B1B-V3-1",
          "judul": "Cerita sirup & gula",
          "ketukan": [
            "3/4 : 2 = 3/8 liter tiap gelas.",
            "2/3 : 4 = 1/6 kg tiap adonan.",
            "6 : 3/4 = 8 bolu.",
            "Selalu sebut satuan hasil."
          ],
          "papan": [
            "3/8",
            "1/6",
            "8 bolu",
            "satuan"
          ]
        },
        {
          "id": "K6B1B-V3-2",
          "judul": "Jangan tertukar",
          "ketukan": [
            "Kali = panah lurus. Bagi = panah menyilang.",
            "Jangan lupa kebalikan.",
            "Jika ragu, gambar partisi atau 'berapa muat'.",
            "Cek: bagi lalu kali kebalikan harus konsisten."
          ],
          "papan": [
            "× lurus / : silang",
            "ingat kebalikan",
            "gambar bila ragu",
            "cek konsisten"
          ]
        },
        {
          "id": "K6B1B-V3-3",
          "judul": "Siap C",
          "ketukan": [
            "Pembagian pecahan siap.",
            "Berikutnya: ubah pecahan ke desimal, banding, urut.",
            "Timbangan pasar menulis 0,50 untuk 1/2.",
            "Ayo Sub-Bab C!"
          ],
          "papan": [
            "B siap",
            "lanjut desimal",
            "0,50 = 1/2",
            "ke C"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Baca cerita",
      "stepDesc": "Baca soal Pembagian Pecahan dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Bagi rata / berapa muat Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa membagi pecahan dengan bilangan asli dan bilangan asli dengan pecahan memakai panah menyilang (kali kebalikan) ses….",
      "icon": "🥤",
      "flowFrom": "Baca cerita",
      "flowTo": "Tulis pecahan"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Tulis pecahan",
      "stepDesc": "a/b : c/d. Pada Pembagian Pecahan, langkah “Tulis pecahan” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "½",
      "flowFrom": "Tulis pecahan",
      "flowTo": "Kebalikan"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Kebalikan",
      "stepDesc": "c/d → d/c. Pada Pembagian Pecahan, langkah “Kebalikan” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🔄",
      "flowFrom": "Kebalikan",
      "flowTo": "Panah silang"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Panah silang",
      "stepDesc": "jadi perkalian. Pada Pembagian Pecahan, langkah “Panah silang” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "✖️",
      "flowFrom": "Panah silang",
      "flowTo": "Hitung"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Hitung",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Pembagian Pecahan. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "=",
      "flowFrom": "Hitung",
      "flowTo": "Tafsir"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Tafsir",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Pembagian Pecahan. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Tafsir",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Panah silang",
      "emoji": "✖️",
      "countNum": 1,
      "countWord": "bagi = × kebalikan",
      "suara": "Cross-Arrow."
    },
    {
      "judul": "Kebalikan",
      "emoji": "🔄",
      "countNum": 1,
      "countWord": "a/b → b/a",
      "suara": "Reciprocal."
    },
    {
      "judul": "1/2 : 3",
      "emoji": ":",
      "countNum": 1,
      "countWord": "1/6",
      "suara": "Gelas."
    },
    {
      "judul": "1/3 : 3",
      "emoji": ":",
      "countNum": 1,
      "countWord": "1/9",
      "suara": "Partisi."
    },
    {
      "judul": "3 : 1/4",
      "emoji": ":",
      "countNum": 12,
      "countWord": "12 gelas",
      "suara": "Measurement."
    },
    {
      "judul": "3 : 1/2",
      "emoji": ":",
      "countNum": 6,
      "countWord": "6 gelas",
      "suara": "Contoh."
    },
    {
      "judul": "3 : 2/5",
      "emoji": ":",
      "countNum": 1,
      "countWord": "15/2",
      "suara": "Bukan unit."
    },
    {
      "judul": "6 : 3/4",
      "emoji": ":",
      "countNum": 8,
      "countWord": "8 bolu",
      "suara": "Latihan."
    },
    {
      "judul": "× vs :",
      "emoji": "⚖️",
      "countNum": 1,
      "countWord": "lurus vs silang",
      "suara": "Jangan tertukar."
    },
    {
      "judul": "Siap C",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "desimal",
      "suara": "Lanjut."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-b-c",
      "title": "Hitung Hasil Bagi",
      "bookReference": "hlm. 15–29",
      "objective": "Bagi pecahan dengan Cross-Arrow Divide dan Invert-and-Multiply.",
      "mechanicDescription": "Tiga ronde: kebalikan, panah silang, measurement division.",
      "voiceGuide": "Pilih jawaban terkait pembagian pecahan.",
      "emoji": ":",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-b-c",
      "title": "Arti Panah Silang",
      "bookReference": "hlm. 15–29",
      "objective": "Bagi pecahan dengan Cross-Arrow Divide dan Invert-and-Multiply.",
      "mechanicDescription": "Tiga ronde: kebalikan, panah silang, measurement division.",
      "voiceGuide": "Pilih jawaban terkait pembagian pecahan.",
      "emoji": ":",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-b-c",
      "title": "Pilih Kebalikan",
      "bookReference": "hlm. 15–29",
      "objective": "Bagi pecahan dengan Cross-Arrow Divide dan Invert-and-Multiply.",
      "mechanicDescription": "Tiga ronde: kebalikan, panah silang, measurement division.",
      "voiceGuide": "Pilih jawaban terkait pembagian pecahan.",
      "emoji": ":",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-b-c",
      "title": "Pilah Lurus/Silang",
      "bookReference": "hlm. 15–29",
      "objective": "Bagi pecahan dengan Cross-Arrow Divide dan Invert-and-Multiply.",
      "mechanicDescription": "Tiga ronde: kebalikan, panah silang, measurement division.",
      "voiceGuide": "Pilih jawaban terkait pembagian pecahan.",
      "emoji": ":",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-b-c",
      "title": "Jodohkan Cerita-Hasil",
      "bookReference": "hlm. 15–29",
      "objective": "Bagi pecahan dengan Cross-Arrow Divide dan Invert-and-Multiply.",
      "mechanicDescription": "Tiga ronde: kebalikan, panah silang, measurement division.",
      "voiceGuide": "Pilih jawaban terkait pembagian pecahan.",
      "emoji": ":",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-b-c",
      "title": "Memori Pembagian",
      "bookReference": "hlm. 15–29",
      "objective": "Bagi pecahan dengan Cross-Arrow Divide dan Invert-and-Multiply.",
      "mechanicDescription": "Tiga ronde: kebalikan, panah silang, measurement division.",
      "voiceGuide": "Pilih jawaban terkait pembagian pecahan.",
      "emoji": ":",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-b-c",
      "title": "Ketuk Hasil Bagi",
      "bookReference": "hlm. 15–29",
      "objective": "Bagi pecahan dengan Cross-Arrow Divide dan Invert-and-Multiply.",
      "mechanicDescription": "Tiga ronde: kebalikan, panah silang, measurement division.",
      "voiceGuide": "Pilih jawaban terkait pembagian pecahan.",
      "emoji": ":",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-b-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 15–29",
      "objective": "Bagi pecahan dengan Cross-Arrow Divide dan Invert-and-Multiply.",
      "mechanicDescription": "Tiga ronde: kebalikan, panah silang, measurement division.",
      "voiceGuide": "Pilih jawaban terkait pembagian pecahan.",
      "emoji": ":",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-b-c",
      "title": "Cerita Botol Gelas",
      "bookReference": "hlm. 15–29",
      "objective": "Bagi pecahan dengan Cross-Arrow Divide dan Invert-and-Multiply.",
      "mechanicDescription": "Tiga ronde: kebalikan, panah silang, measurement division.",
      "voiceGuide": "Pilih jawaban terkait pembagian pecahan.",
      "emoji": ":",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-b-c",
      "title": "Urutkan Hasil Bagi",
      "bookReference": "hlm. 15–29",
      "objective": "Bagi pecahan dengan Cross-Arrow Divide dan Invert-and-Multiply.",
      "mechanicDescription": "Tiga ronde: kebalikan, panah silang, measurement division.",
      "voiceGuide": "Pilih jawaban terkait pembagian pecahan.",
      "emoji": ":",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-b-p",
      "title": "Diagram Hitung Hasil Bagi",
      "bookReference": "hlm. 15–29",
      "objective": "Bagi pecahan dengan Cross-Arrow Divide dan Invert-and-Multiply.",
      "mechanicDescription": "Tiga ronde: kebalikan, panah silang, measurement division.",
      "voiceGuide": "Pilih jawaban terkait pembagian pecahan.",
      "diagramType": "hitung",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "rumus-b-p",
      "title": "Diagram Arti Panah Silang",
      "bookReference": "hlm. 15–29",
      "objective": "Bagi pecahan dengan Cross-Arrow Divide dan Invert-and-Multiply.",
      "mechanicDescription": "Tiga ronde: kebalikan, panah silang, measurement division.",
      "voiceGuide": "Pilih jawaban terkait pembagian pecahan.",
      "diagramType": "rumus",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "arti-b-p",
      "title": "Diagram Pilih Kebalikan",
      "bookReference": "hlm. 15–29",
      "objective": "Bagi pecahan dengan Cross-Arrow Divide dan Invert-and-Multiply.",
      "mechanicDescription": "Tiga ronde: kebalikan, panah silang, measurement division.",
      "voiceGuide": "Pilih jawaban terkait pembagian pecahan.",
      "diagramType": "arti",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sortir-b-p",
      "title": "Diagram Pilah Lurus/Silang",
      "bookReference": "hlm. 15–29",
      "objective": "Bagi pecahan dengan Cross-Arrow Divide dan Invert-and-Multiply.",
      "mechanicDescription": "Tiga ronde: kebalikan, panah silang, measurement division.",
      "voiceGuide": "Pilih jawaban terkait pembagian pecahan.",
      "diagramType": "sortir",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-b-p",
      "title": "Diagram Jodohkan Cerita-Hasil",
      "bookReference": "hlm. 15–29",
      "objective": "Bagi pecahan dengan Cross-Arrow Divide dan Invert-and-Multiply.",
      "mechanicDescription": "Tiga ronde: kebalikan, panah silang, measurement division.",
      "voiceGuide": "Pilih jawaban terkait pembagian pecahan.",
      "diagramType": "jodoh",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memori-b-p",
      "title": "Diagram Memori Pembagian",
      "bookReference": "hlm. 15–29",
      "objective": "Bagi pecahan dengan Cross-Arrow Divide dan Invert-and-Multiply.",
      "mechanicDescription": "Tiga ronde: kebalikan, panah silang, measurement division.",
      "voiceGuide": "Pilih jawaban terkait pembagian pecahan.",
      "diagramType": "memori",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-b-p",
      "title": "Diagram Ketuk Hasil Bagi",
      "bookReference": "hlm. 15–29",
      "objective": "Bagi pecahan dengan Cross-Arrow Divide dan Invert-and-Multiply.",
      "mechanicDescription": "Tiga ronde: kebalikan, panah silang, measurement division.",
      "voiceGuide": "Pilih jawaban terkait pembagian pecahan.",
      "diagramType": "ketuk",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "semua-b-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 15–29",
      "objective": "Bagi pecahan dengan Cross-Arrow Divide dan Invert-and-Multiply.",
      "mechanicDescription": "Tiga ronde: kebalikan, panah silang, measurement division.",
      "voiceGuide": "Pilih jawaban terkait pembagian pecahan.",
      "diagramType": "semua",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "cerita-b-p",
      "title": "Diagram Cerita Botol Gelas",
      "bookReference": "hlm. 15–29",
      "objective": "Bagi pecahan dengan Cross-Arrow Divide dan Invert-and-Multiply.",
      "mechanicDescription": "Tiga ronde: kebalikan, panah silang, measurement division.",
      "voiceGuide": "Pilih jawaban terkait pembagian pecahan.",
      "diagramType": "cerita",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "urut-b-p",
      "title": "Diagram Urutkan Hasil Bagi",
      "bookReference": "hlm. 15–29",
      "objective": "Bagi pecahan dengan Cross-Arrow Divide dan Invert-and-Multiply.",
      "mechanicDescription": "Tiga ronde: kebalikan, panah silang, measurement division.",
      "voiceGuide": "Pilih jawaban terkait pembagian pecahan.",
      "diagramType": "urut",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-b-a",
      "title": "Tulis Hitung Hasil Bagi",
      "bookReference": "hlm. 15–29",
      "objective": "Bagi pecahan dengan Cross-Arrow Divide dan Invert-and-Multiply.",
      "mechanicDescription": "Tiga ronde: kebalikan, panah silang, measurement division.",
      "voiceGuide": "Pilih jawaban terkait pembagian pecahan.",
      "symbolLarge": ":",
      "wordLarge": "BAGI PECAHAN",
      "mathNotation": "a/b : c = a/b × 1/c"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-b-a",
      "title": "Tulis Arti Panah Silang",
      "bookReference": "hlm. 15–29",
      "objective": "Bagi pecahan dengan Cross-Arrow Divide dan Invert-and-Multiply.",
      "mechanicDescription": "Tiga ronde: kebalikan, panah silang, measurement division.",
      "voiceGuide": "Pilih jawaban terkait pembagian pecahan.",
      "symbolLarge": ":",
      "wordLarge": "BAGI PECAHAN",
      "mathNotation": "a/b : c = a/b × 1/c"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-b-a",
      "title": "Tulis Pilih Kebalikan",
      "bookReference": "hlm. 15–29",
      "objective": "Bagi pecahan dengan Cross-Arrow Divide dan Invert-and-Multiply.",
      "mechanicDescription": "Tiga ronde: kebalikan, panah silang, measurement division.",
      "voiceGuide": "Pilih jawaban terkait pembagian pecahan.",
      "symbolLarge": ":",
      "wordLarge": "BAGI PECAHAN",
      "mathNotation": "a/b : c = a/b × 1/c"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-b-a",
      "title": "Tulis Pilah Lurus/Silang",
      "bookReference": "hlm. 15–29",
      "objective": "Bagi pecahan dengan Cross-Arrow Divide dan Invert-and-Multiply.",
      "mechanicDescription": "Tiga ronde: kebalikan, panah silang, measurement division.",
      "voiceGuide": "Pilih jawaban terkait pembagian pecahan.",
      "symbolLarge": ":",
      "wordLarge": "BAGI PECAHAN",
      "mathNotation": "a/b : c = a/b × 1/c"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-b-a",
      "title": "Tulis Jodohkan Cerita-Hasil",
      "bookReference": "hlm. 15–29",
      "objective": "Bagi pecahan dengan Cross-Arrow Divide dan Invert-and-Multiply.",
      "mechanicDescription": "Tiga ronde: kebalikan, panah silang, measurement division.",
      "voiceGuide": "Pilih jawaban terkait pembagian pecahan.",
      "symbolLarge": ":",
      "wordLarge": "BAGI PECAHAN",
      "mathNotation": "a/b : c = a/b × 1/c"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-b-a",
      "title": "Tulis Memori Pembagian",
      "bookReference": "hlm. 15–29",
      "objective": "Bagi pecahan dengan Cross-Arrow Divide dan Invert-and-Multiply.",
      "mechanicDescription": "Tiga ronde: kebalikan, panah silang, measurement division.",
      "voiceGuide": "Pilih jawaban terkait pembagian pecahan.",
      "symbolLarge": ":",
      "wordLarge": "BAGI PECAHAN",
      "mathNotation": "a/b : c = a/b × 1/c"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-b",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 15–29",
      "objective": "Bagi pecahan dengan Cross-Arrow Divide dan Invert-and-Multiply.",
      "mechanicDescription": "Dua ronde menilai pernyataan.",
      "voiceGuide": "Benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-b",
      "title": "Detektif Pecahan",
      "bookReference": "hlm. 15–29",
      "objective": "Bagi pecahan dengan Cross-Arrow Divide dan Invert-and-Multiply.",
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
      "bookReference": "hlm. 15–29",
      "objective": "Bagi pecahan dengan Cross-Arrow Divide dan Invert-and-Multiply.",
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
      "bookReference": "hlm. 15–29",
      "objective": "Bagi pecahan dengan Cross-Arrow Divide dan Invert-and-Multiply.",
      "mechanicDescription": "Tiga ronde cerita.",
      "voiceGuide": "Baca lalu pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "✖️",
      "nama": "Silang",
      "isi": "Bagi memakai panah menyilang = kali kebalikan (Cross-Arrow Divide).",
      "suara": "Naskah lama."
    },
    {
      "ikon": "🔄",
      "nama": "Kebalikan",
      "isi": "Kebalikan a/b adalah b/a (Reciprocal / Invert-and-Multiply).",
      "suara": "Inti bagi."
    },
    {
      "ikon": "🥤",
      "nama": "Partisi",
      "isi": "Membagi pecahan ke n bagian membuat bagian lebih kecil.",
      "suara": "1/2 : 3 = 1/6."
    },
    {
      "ikon": "📦",
      "nama": "Measurement",
      "isi": "a : b/c bertanya berapa kali b/c muat di a; hasil sering membesar.",
      "suara": "3 : 1/4 = 12."
    }
  ],
  "poinSuara": "Ingat: bagi sama dengan kali kebalikan, panah menyilang, kotak merah pada yang dibagi, dan tafsirkan apakah hasil mengecil atau membesar.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Tulis soal bagi",
        "warna": "#FDE68A"
      },
      {
        "teks": "cari kebalikan",
        "warna": "#BBF7D0"
      },
      {
        "teks": "panah silang ×",
        "warna": "#BFDBFE"
      },
      {
        "teks": "hitung & tafsir",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: bagi 3/4 liter sirup ke 2 gelas dengan panah silang, lalu cek dengan menuang imajiner.",
  "refleksi": [
    "Apa kebalikan dari 2/5?",
    "Mengapa 3 : 1/4 hasilnya 12?",
    "Kapan memakai panah lurus dan kapan menyilang?"
  ]
};
export const SUB_C61: SubBabNaskah = {
  "id": "C",
  "codeTitle": "Sub-Bab C (Bilangan Desimal)",
  "fullTitle": "Sub-Bab C: Bilangan Desimal",
  "targetDescription": "Siswa mengubah pecahan ke desimal (penyebut 10/100), membaca nilai tempat desimal, serta membandingkan dan mengurutkan desimal sesuai Buku Siswa Kelas VI Bab 1 Sub-Bab C hlm. 29–41, mengadopsi metode naskah IGIL lama.",
  "secondaryBg": "#DCFCE7",
  "secondaryBorder": "#15803D",
  "secondaryText": "#14532D",
  "silabus": {
    "teksSuara": "Timbangan menulis 0,50 untuk jeruk setengah kilogram. METODE LUAR Equivalent Fraction to Tenths/Hundredths: kalikan pembilang dan penyebut agar penyebut 10 atau 100. 1/2 = 5/10 = 0,5 = 0,50. 1/5 = 2/10 = 0,2 = 0,20. METODE LUAR Decimal Place-Value Chart: satuan, persepuluhan, perseratusan. Bandingkan desimal dari kiri setelah samakan digit di belakang koma. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa mengubah pecahan–desimal, membaca nilai tempat desimal, serta membandingkan dan mengurutkan desimal.",
    "referensi": "Buku Siswa Matematika Kelas VI Bab 1 Sub-Bab C hlm. 29–41; Naskah IGIL lama · Equivalent-to-10/100 Conversion; Decimal Place-Value; Decimal Compare-and-Order."
  },
  "videos": [
    {
      "id": "K6B1C-V1",
      "judul": "Pecahan → Desimal",
      "subjudul": "Tenths",
      "adegan": [
        {
          "id": "K6B1C-V1-1",
          "judul": "Timbangan 0,50",
          "ketukan": [
            "Jeruk 1/2 kg muncul sebagai 0,50 di timbangan.",
            "METODE LUAR · Equivalent Fraction to Tenths/Hundredths.",
            "1/2 × 5/5 = 5/10 = 0,5; ×50/50 = 50/100 = 0,50.",
            "0,5 dan 0,50 nilainya sama."
          ],
          "papan": [
            "1/2 = 0,50",
            "× ke 10/100",
            "0,5 = 0,50",
            "Equivalent"
          ]
        },
        {
          "id": "K6B1C-V1-2",
          "judul": "1/5 = 0,20",
          "ketukan": [
            "1/5 × 2/2 = 2/10 = 0,2.",
            "×20/20 = 20/100 = 0,20.",
            "Penyebut 2 dan 5 (atau kelipatannya) mudah ke 10 dan 100.",
            "Arsir persegi sepuluh/seratus membantu."
          ],
          "papan": [
            "1/5 = 0,2",
            "0,20",
            "penyebut 2 & 5",
            "arsir"
          ]
        },
        {
          "id": "K6B1C-V1-3",
          "judul": "1/10 dan 0,10",
          "ketukan": [
            "1/10 = 0,1 = 0,10.",
            "Sepuluh kotak dari seratus = satu dari sepuluh.",
            "METODE LUAR · Grid Tenths-Hundredths Link.",
            "Desimal hanyalah cara lain menulis pecahan."
          ],
          "papan": [
            "1/10 = 0,1",
            "0,10 sama",
            "grid link",
            "bentuk lain"
          ]
        }
      ]
    },
    {
      "id": "K6B1C-V2",
      "judul": "Nilai Tempat Desimal",
      "subjudul": "Place Value",
      "adegan": [
        {
          "id": "K6B1C-V2-1",
          "judul": "Tabel tempat",
          "ketukan": [
            "Kolom: puluhan, satuan, koma, persepuluhan, perseratusan.",
            "METODE LUAR · Decimal Place-Value Chart.",
            "Pada 3,7: 3 satuan dan 7 persepuluhan.",
            "Pada 2,85: 2 satuan, 8 persepuluhan, 5 perseratusan."
          ],
          "papan": [
            "tabel desimal",
            "Chart",
            "3,7",
            "2,85"
          ]
        },
        {
          "id": "K6B1C-V2-2",
          "judul": "Baca desimal",
          "ketukan": [
            "0,6 dibaca nol koma enam atau enam persepuluhan.",
            "0,25 dibaca nol koma dua lima atau dua puluh lima perseratusan.",
            "Jangan baca 'koma' sebagai pecahan tanpa tempat.",
            "Latihan jarak lari: 2,6 km; 3,1 km."
          ],
          "papan": [
            "baca tempat",
            "0,6",
            "0,25",
            "jarak km"
          ]
        },
        {
          "id": "K6B1C-V2-3",
          "judul": "Banding & urut",
          "ketukan": [
            "METODE LUAR · Decimal Compare-and-Order.",
            "Samakan panjang digit di belakang koma bila perlu: 0,5 = 0,50.",
            "Bandingkan dari kiri: 3,7 > 2,9.",
            "Urutkan lompat jauh Arman, Bayu, Didi."
          ],
          "papan": [
            "samakan digit",
            "banding kiri",
            "3,7 > 2,9",
            "urut"
          ]
        }
      ]
    },
    {
      "id": "K6B1C-V3",
      "judul": "Rangkum A–C",
      "subjudul": "Bab 1",
      "adegan": [
        {
          "id": "K6B1C-V3-1",
          "judul": "Alur bab",
          "ketukan": [
            "A: kali pecahan — panah lurus + area.",
            "B: bagi pecahan — panah silang + kebalikan.",
            "C: desimal — ubah 10/100, tempat, banding.",
            "Agam siap memakai pecahan di kebun dan pasar."
          ],
          "papan": [
            "A kali",
            "B bagi",
            "C desimal",
            "cerita utuh"
          ]
        },
        {
          "id": "K6B1C-V3-2",
          "judul": "Label metode",
          "ketukan": [
            "Area Model, Straight-Arrow, Whole-as-Fraction.",
            "Cross-Arrow, Reciprocal, Partition/Measurement.",
            "Equivalent-to-10/100, Decimal Place-Value, Compare-Order.",
            "Warisan naskah IGIL lama + buku Kurikulum Merdeka."
          ],
          "papan": [
            "metode A",
            "metode B",
            "metode C",
            "naskah+buku"
          ]
        },
        {
          "id": "K6B1C-V3-3",
          "judul": "Materi siap",
          "ketukan": [
            "Tab Materi Bab 1 Sub-Bab A sampai C siap.",
            "Latihan dan ujian menyusul instruksi terpisah.",
            "Mainkan Concrete, Picture, Abstract.",
            "Hebat, master pecahan dan desimal!"
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
      "stepTitle": "1. Pecahan",
      "stepDesc": "Baca soal Bilangan Desimal dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. a/b Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa mengubah pecahan ke desimal (penyebut 10/100), membaca nilai tempat desimal, serta membandingkan dan mengurutkan d….",
      "icon": "½",
      "flowFrom": "Pecahan",
      "flowTo": "× ke 10/100"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. × ke 10/100",
      "stepDesc": "Equivalent. Pada Bilangan Desimal, langkah “× ke 10/100” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🔟",
      "flowFrom": "× ke 10/100",
      "flowTo": "Tulis desimal"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Tulis desimal",
      "stepDesc": "0,. Pada Bilangan Desimal, langkah “Tulis desimal” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "0,5",
      "flowFrom": "Tulis desimal",
      "flowTo": "Tabel tempat"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Tabel tempat",
      "stepDesc": "persepuluhan/s. Pada Bilangan Desimal, langkah “Tabel tempat” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "📋",
      "flowFrom": "Tabel tempat",
      "flowTo": "Banding"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Banding",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Bilangan Desimal. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "⚖️",
      "flowFrom": "Banding",
      "flowTo": "Urutkan"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Urutkan",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Bilangan Desimal. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "📶",
      "flowFrom": "Urutkan",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "1/2",
      "emoji": "⚖️",
      "countNum": 1,
      "countWord": "0,5 = 0,50",
      "suara": "Timbangan."
    },
    {
      "judul": "1/5",
      "emoji": "⚖️",
      "countNum": 1,
      "countWord": "0,2 = 0,20",
      "suara": "Salak."
    },
    {
      "judul": "1/10",
      "emoji": "🔟",
      "countNum": 1,
      "countWord": "0,1 = 0,10",
      "suara": "Grid."
    },
    {
      "judul": "×10/100",
      "emoji": "✖️",
      "countNum": 1,
      "countWord": "Equivalent",
      "suara": "Metode."
    },
    {
      "judul": "Persepuluhan",
      "emoji": "0,1",
      "countNum": 1,
      "countWord": "tempat",
      "suara": "Chart."
    },
    {
      "judul": "Perseratusan",
      "emoji": "0,01",
      "countNum": 1,
      "countWord": "tempat",
      "suara": "Chart."
    },
    {
      "judul": "3,7",
      "emoji": "🏃",
      "countNum": 1,
      "countWord": "lompat jauh",
      "suara": "Banding."
    },
    {
      "judul": "0,5=0,50",
      "emoji": "=",
      "countNum": 1,
      "countWord": "nilai sama",
      "suara": "Penting."
    },
    {
      "judul": "Banding kiri",
      "emoji": "⬅️",
      "countNum": 1,
      "countWord": "Compare-Order",
      "suara": "Metode."
    },
    {
      "judul": "Bab 1 A–C",
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
      "title": "Hitung Desimal Setara",
      "bookReference": "hlm. 29–41",
      "objective": "Ubah dan bandingkan desimal dengan Equivalent-to-10/100 dan Decimal Place-Value.",
      "mechanicDescription": "Tiga ronde: ubah pecahan, nilai tempat, banding/urut.",
      "voiceGuide": "Pilih jawaban terkait bilangan desimal.",
      "emoji": "0,",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-c-c",
      "title": "Arti Persepuluhan",
      "bookReference": "hlm. 29–41",
      "objective": "Ubah dan bandingkan desimal dengan Equivalent-to-10/100 dan Decimal Place-Value.",
      "mechanicDescription": "Tiga ronde: ubah pecahan, nilai tempat, banding/urut.",
      "voiceGuide": "Pilih jawaban terkait bilangan desimal.",
      "emoji": "0,",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-c-c",
      "title": "Pilih Ubah 10/100",
      "bookReference": "hlm. 29–41",
      "objective": "Ubah dan bandingkan desimal dengan Equivalent-to-10/100 dan Decimal Place-Value.",
      "mechanicDescription": "Tiga ronde: ubah pecahan, nilai tempat, banding/urut.",
      "voiceGuide": "Pilih jawaban terkait bilangan desimal.",
      "emoji": "0,",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-c-c",
      "title": "Pilah Sama/Tidak",
      "bookReference": "hlm. 29–41",
      "objective": "Ubah dan bandingkan desimal dengan Equivalent-to-10/100 dan Decimal Place-Value.",
      "mechanicDescription": "Tiga ronde: ubah pecahan, nilai tempat, banding/urut.",
      "voiceGuide": "Pilih jawaban terkait bilangan desimal.",
      "emoji": "0,",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-c-c",
      "title": "Jodohkan Pecahan-Desimal",
      "bookReference": "hlm. 29–41",
      "objective": "Ubah dan bandingkan desimal dengan Equivalent-to-10/100 dan Decimal Place-Value.",
      "mechanicDescription": "Tiga ronde: ubah pecahan, nilai tempat, banding/urut.",
      "voiceGuide": "Pilih jawaban terkait bilangan desimal.",
      "emoji": "0,",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-c-c",
      "title": "Memori Desimal",
      "bookReference": "hlm. 29–41",
      "objective": "Ubah dan bandingkan desimal dengan Equivalent-to-10/100 dan Decimal Place-Value.",
      "mechanicDescription": "Tiga ronde: ubah pecahan, nilai tempat, banding/urut.",
      "voiceGuide": "Pilih jawaban terkait bilangan desimal.",
      "emoji": "0,",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-c-c",
      "title": "Ketuk Desimal",
      "bookReference": "hlm. 29–41",
      "objective": "Ubah dan bandingkan desimal dengan Equivalent-to-10/100 dan Decimal Place-Value.",
      "mechanicDescription": "Tiga ronde: ubah pecahan, nilai tempat, banding/urut.",
      "voiceGuide": "Pilih jawaban terkait bilangan desimal.",
      "emoji": "0,",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-c-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 29–41",
      "objective": "Ubah dan bandingkan desimal dengan Equivalent-to-10/100 dan Decimal Place-Value.",
      "mechanicDescription": "Tiga ronde: ubah pecahan, nilai tempat, banding/urut.",
      "voiceGuide": "Pilih jawaban terkait bilangan desimal.",
      "emoji": "0,",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-c-c",
      "title": "Cerita Timbangan",
      "bookReference": "hlm. 29–41",
      "objective": "Ubah dan bandingkan desimal dengan Equivalent-to-10/100 dan Decimal Place-Value.",
      "mechanicDescription": "Tiga ronde: ubah pecahan, nilai tempat, banding/urut.",
      "voiceGuide": "Pilih jawaban terkait bilangan desimal.",
      "emoji": "0,",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-c-c",
      "title": "Urutkan Desimal",
      "bookReference": "hlm. 29–41",
      "objective": "Ubah dan bandingkan desimal dengan Equivalent-to-10/100 dan Decimal Place-Value.",
      "mechanicDescription": "Tiga ronde: ubah pecahan, nilai tempat, banding/urut.",
      "voiceGuide": "Pilih jawaban terkait bilangan desimal.",
      "emoji": "0,",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-c-p",
      "title": "Diagram Hitung Desimal Setara",
      "bookReference": "hlm. 29–41",
      "objective": "Ubah dan bandingkan desimal dengan Equivalent-to-10/100 dan Decimal Place-Value.",
      "mechanicDescription": "Tiga ronde: ubah pecahan, nilai tempat, banding/urut.",
      "voiceGuide": "Pilih jawaban terkait bilangan desimal.",
      "diagramType": "hitung",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "rumus-c-p",
      "title": "Diagram Arti Persepuluhan",
      "bookReference": "hlm. 29–41",
      "objective": "Ubah dan bandingkan desimal dengan Equivalent-to-10/100 dan Decimal Place-Value.",
      "mechanicDescription": "Tiga ronde: ubah pecahan, nilai tempat, banding/urut.",
      "voiceGuide": "Pilih jawaban terkait bilangan desimal.",
      "diagramType": "rumus",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "arti-c-p",
      "title": "Diagram Pilih Ubah 10/100",
      "bookReference": "hlm. 29–41",
      "objective": "Ubah dan bandingkan desimal dengan Equivalent-to-10/100 dan Decimal Place-Value.",
      "mechanicDescription": "Tiga ronde: ubah pecahan, nilai tempat, banding/urut.",
      "voiceGuide": "Pilih jawaban terkait bilangan desimal.",
      "diagramType": "arti",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sortir-c-p",
      "title": "Diagram Pilah Sama/Tidak",
      "bookReference": "hlm. 29–41",
      "objective": "Ubah dan bandingkan desimal dengan Equivalent-to-10/100 dan Decimal Place-Value.",
      "mechanicDescription": "Tiga ronde: ubah pecahan, nilai tempat, banding/urut.",
      "voiceGuide": "Pilih jawaban terkait bilangan desimal.",
      "diagramType": "sortir",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-c-p",
      "title": "Diagram Jodohkan Pecahan-Desimal",
      "bookReference": "hlm. 29–41",
      "objective": "Ubah dan bandingkan desimal dengan Equivalent-to-10/100 dan Decimal Place-Value.",
      "mechanicDescription": "Tiga ronde: ubah pecahan, nilai tempat, banding/urut.",
      "voiceGuide": "Pilih jawaban terkait bilangan desimal.",
      "diagramType": "jodoh",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memori-c-p",
      "title": "Diagram Memori Desimal",
      "bookReference": "hlm. 29–41",
      "objective": "Ubah dan bandingkan desimal dengan Equivalent-to-10/100 dan Decimal Place-Value.",
      "mechanicDescription": "Tiga ronde: ubah pecahan, nilai tempat, banding/urut.",
      "voiceGuide": "Pilih jawaban terkait bilangan desimal.",
      "diagramType": "memori",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-c-p",
      "title": "Diagram Ketuk Desimal",
      "bookReference": "hlm. 29–41",
      "objective": "Ubah dan bandingkan desimal dengan Equivalent-to-10/100 dan Decimal Place-Value.",
      "mechanicDescription": "Tiga ronde: ubah pecahan, nilai tempat, banding/urut.",
      "voiceGuide": "Pilih jawaban terkait bilangan desimal.",
      "diagramType": "ketuk",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "semua-c-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 29–41",
      "objective": "Ubah dan bandingkan desimal dengan Equivalent-to-10/100 dan Decimal Place-Value.",
      "mechanicDescription": "Tiga ronde: ubah pecahan, nilai tempat, banding/urut.",
      "voiceGuide": "Pilih jawaban terkait bilangan desimal.",
      "diagramType": "semua",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "cerita-c-p",
      "title": "Diagram Cerita Timbangan",
      "bookReference": "hlm. 29–41",
      "objective": "Ubah dan bandingkan desimal dengan Equivalent-to-10/100 dan Decimal Place-Value.",
      "mechanicDescription": "Tiga ronde: ubah pecahan, nilai tempat, banding/urut.",
      "voiceGuide": "Pilih jawaban terkait bilangan desimal.",
      "diagramType": "cerita",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "urut-c-p",
      "title": "Diagram Urutkan Desimal",
      "bookReference": "hlm. 29–41",
      "objective": "Ubah dan bandingkan desimal dengan Equivalent-to-10/100 dan Decimal Place-Value.",
      "mechanicDescription": "Tiga ronde: ubah pecahan, nilai tempat, banding/urut.",
      "voiceGuide": "Pilih jawaban terkait bilangan desimal.",
      "diagramType": "urut",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-c-a",
      "title": "Tulis Hitung Desimal Setara",
      "bookReference": "hlm. 29–41",
      "objective": "Ubah dan bandingkan desimal dengan Equivalent-to-10/100 dan Decimal Place-Value.",
      "mechanicDescription": "Tiga ronde: ubah pecahan, nilai tempat, banding/urut.",
      "voiceGuide": "Pilih jawaban terkait bilangan desimal.",
      "symbolLarge": "0,",
      "wordLarge": "DESIMAL",
      "mathNotation": "persepuluhan"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-c-a",
      "title": "Tulis Arti Persepuluhan",
      "bookReference": "hlm. 29–41",
      "objective": "Ubah dan bandingkan desimal dengan Equivalent-to-10/100 dan Decimal Place-Value.",
      "mechanicDescription": "Tiga ronde: ubah pecahan, nilai tempat, banding/urut.",
      "voiceGuide": "Pilih jawaban terkait bilangan desimal.",
      "symbolLarge": "0,",
      "wordLarge": "DESIMAL",
      "mathNotation": "persepuluhan"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-c-a",
      "title": "Tulis Pilih Ubah 10/100",
      "bookReference": "hlm. 29–41",
      "objective": "Ubah dan bandingkan desimal dengan Equivalent-to-10/100 dan Decimal Place-Value.",
      "mechanicDescription": "Tiga ronde: ubah pecahan, nilai tempat, banding/urut.",
      "voiceGuide": "Pilih jawaban terkait bilangan desimal.",
      "symbolLarge": "0,",
      "wordLarge": "DESIMAL",
      "mathNotation": "persepuluhan"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-c-a",
      "title": "Tulis Pilah Sama/Tidak",
      "bookReference": "hlm. 29–41",
      "objective": "Ubah dan bandingkan desimal dengan Equivalent-to-10/100 dan Decimal Place-Value.",
      "mechanicDescription": "Tiga ronde: ubah pecahan, nilai tempat, banding/urut.",
      "voiceGuide": "Pilih jawaban terkait bilangan desimal.",
      "symbolLarge": "0,",
      "wordLarge": "DESIMAL",
      "mathNotation": "persepuluhan"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-c-a",
      "title": "Tulis Jodohkan Pecahan-Desimal",
      "bookReference": "hlm. 29–41",
      "objective": "Ubah dan bandingkan desimal dengan Equivalent-to-10/100 dan Decimal Place-Value.",
      "mechanicDescription": "Tiga ronde: ubah pecahan, nilai tempat, banding/urut.",
      "voiceGuide": "Pilih jawaban terkait bilangan desimal.",
      "symbolLarge": "0,",
      "wordLarge": "DESIMAL",
      "mathNotation": "persepuluhan"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-c-a",
      "title": "Tulis Memori Desimal",
      "bookReference": "hlm. 29–41",
      "objective": "Ubah dan bandingkan desimal dengan Equivalent-to-10/100 dan Decimal Place-Value.",
      "mechanicDescription": "Tiga ronde: ubah pecahan, nilai tempat, banding/urut.",
      "voiceGuide": "Pilih jawaban terkait bilangan desimal.",
      "symbolLarge": "0,",
      "wordLarge": "DESIMAL",
      "mathNotation": "persepuluhan"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-c",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 29–41",
      "objective": "Ubah dan bandingkan desimal dengan Equivalent-to-10/100 dan Decimal Place-Value.",
      "mechanicDescription": "Dua ronde menilai pernyataan.",
      "voiceGuide": "Benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-c",
      "title": "Detektif Pecahan",
      "bookReference": "hlm. 29–41",
      "objective": "Ubah dan bandingkan desimal dengan Equivalent-to-10/100 dan Decimal Place-Value.",
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
      "bookReference": "hlm. 29–41",
      "objective": "Ubah dan bandingkan desimal dengan Equivalent-to-10/100 dan Decimal Place-Value.",
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
      "bookReference": "hlm. 29–41",
      "objective": "Ubah dan bandingkan desimal dengan Equivalent-to-10/100 dan Decimal Place-Value.",
      "mechanicDescription": "Tiga ronde cerita.",
      "voiceGuide": "Baca lalu pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "🔟",
      "nama": "Ubah",
      "isi": "Kalikan ke penyebut 10 atau 100 (Equivalent-to-Tenths/Hundredths).",
      "suara": "1/2 = 0,5 = 0,50."
    },
    {
      "ikon": "📋",
      "nama": "Tempat",
      "isi": "Baca persepuluhan dan perseratusan (Decimal Place-Value Chart).",
      "suara": "3,7 ; 0,25."
    },
    {
      "ikon": "=",
      "nama": "Sama nilai",
      "isi": "0,5 = 0,50; 0,2 = 0,20 meski tulisannya beda.",
      "suara": "Timbangan."
    },
    {
      "ikon": "⚖️",
      "nama": "Banding",
      "isi": "Samakan digit belakang koma, banding dari kiri (Decimal Compare-and-Order).",
      "suara": "Lompat jauh."
    }
  ],
  "poinSuara": "Ingat: ubah pecahan ke penyebut sepuluh atau seratus, baca nilai tempat di belakang koma, ingat nol di belakang tidak mengubah nilai, lalu bandingkan dari kiri.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Pilih pecahan",
        "warna": "#FDE68A"
      },
      {
        "teks": "× ke 10 atau 100",
        "warna": "#BBF7D0"
      },
      {
        "teks": "tulis desimal",
        "warna": "#BFDBFE"
      },
      {
        "teks": "banding/urut",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: ubah 1/2, 1/4, dan 3/4 ke desimal, lalu urutkan dari terkecil.",
  "refleksi": [
    "Mengapa 0,50 sama dengan 0,5?",
    "Bagaimana mengubah 1/5 menjadi desimal?",
    "Apa langkah membandingkan 3,7 dan 3,65?"
  ]
};

export const SUB_BAB_K6B1: SubBabNaskah[] = [SUB_A61, SUB_B61, SUB_C61];
export const semuaAdeganK6B1 = SUB_BAB_K6B1.flatMap((s) => s.videos.flatMap((v) => v.adegan));
