/**
 * Naskah murni Matematika Kelas 5 Bab 4 (Keliling Bangun Datar): Sub-Bab A–E.
 * Sumber: Buku Siswa Matematika Kelas V Kemendikbudristek Bab 4 hlm. 105–130.
 * Satu sumber: buat-k5-bab4.mjs → kelas5-bab4.json. Tanpa React/jaringan.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K5B4_META = {
  "chapterId": "k5-mat-bab4",
  "phaseCode": "FASE_C",
  "grade": 5,
  "subjectLabel": "MATEMATIKA - KELAS 5 SD",
  "title": "BAB 4: KELILING BANGUN DATAR",
  "silabusElemen": "🌈 Fase C • Elemen Pengukuran: Keliling Bangun Datar — Segitiga, Segi Empat, Segi Banyak, dan Gabungan (Kelas 5 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A54: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Konsep Keliling)",
  "fullTitle": "Sub-Bab A: Apakah Keliling Bangun Datar Itu?",
  "targetDescription": "Siswa memahami arti keliling sebagai jumlah panjang semua sisi, mengaitkannya dengan konteks benteng, pagar, dan bingkai, serta menghitung keliling dari panjang sisi yang diketahui sesuai Buku Siswa Kelas V Bab 4.",
  "secondaryBg": "#FFEDD5",
  "secondaryBorder": "#EA580C",
  "secondaryText": "#7C2D12",
  "silabus": {
    "teksSuara": "Kita belajar apa itu keliling. Keliling adalah jumlah panjang semua sisi bangun datar. Berguna untuk pagar, bingkai, dan batas benteng. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menjelaskan dan menghitung keliling bangun datar.",
    "referensi": "Buku Siswa Matematika Kelas V Kemendikbudristek (Bab 4: Keliling Bangun Datar, Sub-Bab A hlm. 107–114)."
  },
  "videos": [
    {
      "id": "K5B4A-V1",
      "judul": "Apa Itu Keliling",
      "subjudul": "Definisi",
      "adegan": [
        {
          "id": "K5B4A-V1-1",
          "judul": "Jumlah sisi",
          "ketukan": [
            "Keliling adalah jumlah panjang sisi.",
            "Kelilingi bangun dari luar.",
            "Kembali ke titik awal.",
            "Itu panjang jalur batas."
          ],
          "papan": [
            "jumlah sisi",
            "luar",
            "titik awal",
            "batas"
          ]
        },
        {
          "id": "K5B4A-V1-2",
          "judul": "Bukan luas",
          "ketukan": [
            "Luas mengisi dalam.",
            "Keliling mengelilingi luar.",
            "Jangan tertukar.",
            "Ingat bedanya."
          ],
          "papan": [
            "luas dalam",
            "keliling luar",
            "beda",
            "ingat"
          ]
        },
        {
          "id": "K5B4A-V1-3",
          "judul": "Contoh persegi",
          "ketukan": [
            "Sisi empat, empat, empat, empat.",
            "Jumlah enam belas.",
            "Itu keliling.",
            "Siap lanjut.",
            "METODE LUAR. Keliling sebagai Panjang Jalur: Keliling adalah panjang jalur yang menelusuri seluruh batas luar sampai kembali ke titik awal."
          ],
          "papan": [
            "4+4+4+4",
            "16",
            "keliling",
            "lanjut",
            "METODE LUAR · Keliling sebagai Panjang Jalur"
          ]
        }
      ]
    },
    {
      "id": "K5B4A-V2",
      "judul": "Benteng dan Pagar",
      "subjudul": "Konteks",
      "adegan": [
        {
          "id": "K5B4A-V2-1",
          "judul": "Baluwarti",
          "ketukan": [
            "Benteng mengelilingi kraton.",
            "Pemugaran butuh panjang batas.",
            "Itu keliling.",
            "Bentuknya gabungan bangun."
          ],
          "papan": [
            "benteng",
            "batas",
            "keliling",
            "gabungan"
          ]
        },
        {
          "id": "K5B4A-V2-2",
          "judul": "Pagar rumah",
          "ketukan": [
            "Pagar mengelilingi tanah.",
            "Panjang pagar adalah keliling.",
            "Ukur sisi luar.",
            "Jumlahkan."
          ],
          "papan": [
            "pagar",
            "tanah",
            "sisi luar",
            "jumlah"
          ]
        },
        {
          "id": "K5B4A-V2-3",
          "judul": "Bingkai foto",
          "ketukan": [
            "Bingkai mengelilingi foto.",
            "Kayu yang dibutuhkan.",
            "Sama dengan keliling.",
            "Ayo hitung.",
            "METODE LUAR. Konteks Pagar dan Bingkai: Panjang pagar, bingkai, atau batas benteng memakai keliling, bukan luas."
          ],
          "papan": [
            "bingkai",
            "kayu",
            "keliling",
            "hitung",
            "METODE LUAR · Konteks Pagar dan Bingkai"
          ]
        }
      ]
    },
    {
      "id": "K5B4A-V3",
      "judul": "Cara Menghitung",
      "subjudul": "Langkah",
      "adegan": [
        {
          "id": "K5B4A-V3-1",
          "judul": "Tulis sisi",
          "ketukan": [
            "Tulis panjang tiap sisi.",
            "Pastikan satuannya sama.",
            "Jumlahkan semua.",
            "Itu hasilnya."
          ],
          "papan": [
            "tulis sisi",
            "satuan",
            "jumlah",
            "hasil"
          ]
        },
        {
          "id": "K5B4A-V3-2",
          "judul": "Cek",
          "ketukan": [
            "Hitung lagi sekali.",
            "Apakah masuk akal?",
            "Lebih besar dari sisi terpanjang.",
            "Siap bermain!"
          ],
          "papan": [
            "cek",
            "masuk akal",
            "> sisi max",
            "main"
          ]
        },
        {
          "id": "K5B4A-V3-3",
          "judul": "Rumus nanti",
          "ketukan": [
            "Nanti ada rumus khusus.",
            "Segitiga, segi empat, segi banyak.",
            "Dasarnya tetap jumlah sisi.",
            "Ayo!",
            "METODE LUAR. Bedakan Keliling dan Luas: Keliling mengelilingi luar; luas mengisi dalam. Jangan tertukar."
          ],
          "papan": [
            "rumus",
            "bangun",
            "dasar",
            "ayo",
            "METODE LUAR · Bedakan Keliling dan Luas"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Kenali sisi",
      "stepDesc": "Ukur tiap sisi",
      "icon": "📏",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Satuan sama",
      "stepDesc": "cm/m",
      "icon": "📐",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Jumlahkan",
      "stepDesc": "Semua sisi",
      "icon": "➕",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Hasil",
      "stepDesc": "Keliling",
      "icon": "⭕",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Cek",
      "stepDesc": "Masuk akal?",
      "icon": "✅",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Pakai",
      "stepDesc": "Pagar/bingkai",
      "icon": "🏠",
      "flowFrom": "5",
      "flowTo": "7"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. METODE LUAR · Keliling sebagai Panjang Jalur",
      "stepDesc": "Keliling adalah panjang jalur yang menelusuri seluruh batas luar sampai kembali ke titik awal.",
      "icon": "🌍",
      "flowFrom": "6",
      "flowTo": "8"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. METODE LUAR · Konteks Pagar dan Bingkai",
      "stepDesc": "Panjang pagar, bingkai, atau batas benteng memakai keliling, bukan luas.",
      "icon": "🌍",
      "flowFrom": "7",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "Arti",
      "emoji": "⭕",
      "countNum": 1,
      "countWord": "jumlah sisi",
      "suara": "Batas luar."
    },
    {
      "judul": "Contoh",
      "emoji": "4️⃣",
      "countNum": 16,
      "countWord": "4+4+4+4",
      "suara": "Persegi."
    },
    {
      "judul": "Bukan",
      "emoji": "⬜",
      "countNum": 1,
      "countWord": "luas",
      "suara": "Isi dalam."
    },
    {
      "judul": "Pagar",
      "emoji": "🏡",
      "countNum": 1,
      "countWord": "batas tanah",
      "suara": "Aplikasi."
    },
    {
      "judul": "Bingkai",
      "emoji": "🖼️",
      "countNum": 1,
      "countWord": "panjang kayu",
      "suara": "Aplikasi."
    },
    {
      "judul": "Benteng",
      "emoji": "🏰",
      "countNum": 1,
      "countWord": "Baluwarti",
      "suara": "Konteks."
    },
    {
      "judul": "Cara",
      "emoji": "➕",
      "countNum": 1,
      "countWord": "jumlahkan",
      "suara": "Dasar."
    },
    {
      "judul": "Satuan",
      "emoji": "📐",
      "countNum": 1,
      "countWord": "cm atau m",
      "suara": "Sama."
    },
    {
      "judul": "Cek",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "masuk akal",
      "suara": "Validasi."
    },
    {
      "judul": "Siap B",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "segitiga",
      "suara": "Lanjut."
    },
    {
      "judul": "Keliling sebagai Panjang Jalur",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "METODE LUAR · Path Length",
      "suara": "METODE LUAR. Keliling sebagai Panjang Jalur. Keliling adalah panjang jalur yang menelusuri seluruh batas luar sampai kembali ke titik awal."
    },
    {
      "judul": "Konteks Pagar dan Bingkai",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "METODE LUAR · Fencing Context",
      "suara": "METODE LUAR. Konteks Pagar dan Bingkai. Panjang pagar, bingkai, atau batas benteng memakai keliling, bukan luas."
    },
    {
      "judul": "Bedakan Keliling dan Luas",
      "emoji": "🌍",
      "countNum": 3,
      "countWord": "METODE LUAR · Perimeter vs Area",
      "suara": "METODE LUAR. Bedakan Keliling dan Luas. Keliling mengelilingi luar; luas mengisi dalam. Jangan tertukar."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-a-c",
      "title": "Hitung Keliling",
      "bookReference": "hlm. 107–114",
      "objective": "Latihan topik. (METODE LUAR · Keliling sebagai Panjang Jalur)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Keliling sebagai Panjang Jalur. Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-a-c",
      "title": "Arti Keliling",
      "bookReference": "hlm. 107–114",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-a-c",
      "title": "Pilih Definisi",
      "bookReference": "hlm. 107–114",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-a-c",
      "title": "Pilah Ya/Tidak",
      "bookReference": "hlm. 107–114",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-a-c",
      "title": "Jodohkan Keliling",
      "bookReference": "hlm. 107–114",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-a-c",
      "title": "Memori Keliling",
      "bookReference": "hlm. 107–114",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-a-c",
      "title": "Ketuk Hasil",
      "bookReference": "hlm. 107–114",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-a-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 107–114",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-a-c",
      "title": "Cerita Pagar & Bingkai",
      "bookReference": "hlm. 107–114",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-a-c",
      "title": "Urutkan Hasil",
      "bookReference": "hlm. 107–114",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-a-p",
      "title": "Diagram Hitung Keliling",
      "bookReference": "hlm. 107–114",
      "objective": "Baca diagram. (METODE LUAR · Keliling sebagai Panjang Jalur)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Keliling sebagai Panjang Jalur. Pilih.",
      "diagramType": "hitung",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "rumus-a-p",
      "title": "Diagram Arti Keliling",
      "bookReference": "hlm. 107–114",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "rumus",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "arti-a-p",
      "title": "Diagram Pilih Definisi",
      "bookReference": "hlm. 107–114",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "arti",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sortir-a-p",
      "title": "Diagram Pilah Ya/Tidak",
      "bookReference": "hlm. 107–114",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "sortir",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-a-p",
      "title": "Diagram Jodohkan Keliling",
      "bookReference": "hlm. 107–114",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "jodoh",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memori-a-p",
      "title": "Diagram Memori Keliling",
      "bookReference": "hlm. 107–114",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "memori",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-a-p",
      "title": "Diagram Ketuk Hasil",
      "bookReference": "hlm. 107–114",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "ketuk",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "semua-a-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 107–114",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "semua",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "cerita-a-p",
      "title": "Diagram Cerita Pagar & Bingkai",
      "bookReference": "hlm. 107–114",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "cerita",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "urut-a-p",
      "title": "Diagram Urutkan Hasil",
      "bookReference": "hlm. 107–114",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "urut",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-a-a",
      "title": "Tulis Hitung Keliling",
      "bookReference": "hlm. 107–114",
      "objective": "Notasi. (METODE LUAR · Keliling sebagai Panjang Jalur)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Keliling sebagai Panjang Jalur. Pilih.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-a-a",
      "title": "Tulis Arti Keliling",
      "bookReference": "hlm. 107–114",
      "objective": "Notasi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-a-a",
      "title": "Tulis Pilih Definisi",
      "bookReference": "hlm. 107–114",
      "objective": "Notasi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-a-a",
      "title": "Tulis Pilah Ya/Tidak",
      "bookReference": "hlm. 107–114",
      "objective": "Notasi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-a-a",
      "title": "Tulis Jodohkan Keliling",
      "bookReference": "hlm. 107–114",
      "objective": "Notasi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-a-a",
      "title": "Tulis Memori Keliling",
      "bookReference": "hlm. 107–114",
      "objective": "Notasi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-a",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 107–114",
      "objective": "Menilai.",
      "mechanicDescription": "Dua ronde.",
      "voiceGuide": "Benar/salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-a",
      "title": "Detektif Keliling",
      "bookReference": "hlm. 107–114",
      "objective": "Petunjuk.",
      "mechanicDescription": "Tiga soal.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "peta-a",
      "title": "Peta Konsep",
      "bookReference": "hlm. 107–114",
      "objective": "Peta.",
      "mechanicDescription": "Satu peta.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "cerita-q-a",
      "title": "Cerita Angka",
      "bookReference": "hlm. 107–114",
      "objective": "Cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "⭕",
      "nama": "Arti",
      "isi": "Keliling = jumlah panjang semua sisi.",
      "suara": "Batas luar."
    },
    {
      "ikon": "➕",
      "nama": "Cara",
      "isi": "Jumlahkan semua sisi dengan satuan sama.",
      "suara": "Dasar."
    },
    {
      "ikon": "🏠",
      "nama": "Pakai",
      "isi": "Pagar, bingkai, batas benteng.",
      "suara": "Aplikasi."
    },
    {
      "ikon": "⬜",
      "nama": "Bukan luas",
      "isi": "Luas mengisi dalam, keliling mengelilingi luar.",
      "suara": "Jangan tertukar."
    },
    {
      "ikon": "🌍",
      "nama": "Keliling sebagai Panjang Jalur",
      "isi": "METODE LUAR · Path Length: Keliling adalah panjang jalur yang menelusuri seluruh batas luar sampai kembali ke titik awal. (asal: Van de Walle / pengukuran).",
      "suara": "METODE LUAR. Keliling sebagai Panjang Jalur. Keliling adalah panjang jalur yang menelusuri seluruh batas luar sampai kembali ke titik awal."
    },
    {
      "ikon": "🌍",
      "nama": "Konteks Pagar dan Bingkai",
      "isi": "METODE LUAR · Fencing Context: Panjang pagar, bingkai, atau batas benteng memakai keliling, bukan luas. (asal: Real-world measurement pedagogy).",
      "suara": "METODE LUAR. Konteks Pagar dan Bingkai. Panjang pagar, bingkai, atau batas benteng memakai keliling, bukan luas."
    },
    {
      "ikon": "🌍",
      "nama": "Bedakan Keliling dan Luas",
      "isi": "METODE LUAR · Perimeter vs Area: Keliling mengelilingi luar; luas mengisi dalam. Jangan tertukar. (asal: Common misconception research).",
      "suara": "METODE LUAR. Bedakan Keliling dan Luas. Keliling mengelilingi luar; luas mengisi dalam. Jangan tertukar."
    }
  ],
  "poinSuara": "Ingat: keliling jumlah sisi, bukan luas, dipakai pagar dan bingkai.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Ukur sisi",
        "warna": "#FDE68A"
      },
      {
        "teks": "samakan satuan",
        "warna": "#BBF7D0"
      },
      {
        "teks": "jumlahkan",
        "warna": "#BFDBFE"
      },
      {
        "teks": "cek hasil",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: ukur keliling meja atau bingkai foto di rumahmu.",
  "refleksi": [
    "Apa beda keliling dan luas?",
    "Mengapa pagar memakai keliling?",
    "Bagaimana menghitung 4+4+4+4?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Path Length",
      "namaId": "Keliling sebagai Panjang Jalur",
      "asal": "Van de Walle / pengukuran",
      "ringkas": "Keliling adalah panjang jalur yang menelusuri seluruh batas luar sampai kembali ke titik awal.",
      "tahap": [
        "Story",
        "Mind",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Fencing Context",
      "namaId": "Konteks Pagar dan Bingkai",
      "asal": "Real-world measurement pedagogy",
      "ringkas": "Panjang pagar, bingkai, atau batas benteng memakai keliling, bukan luas.",
      "tahap": [
        "Story",
        "Infografis",
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Perimeter vs Area",
      "namaId": "Bedakan Keliling dan Luas",
      "asal": "Common misconception research",
      "ringkas": "Keliling mengelilingi luar; luas mengisi dalam. Jangan tertukar.",
      "tahap": [
        "Story",
        "Infografis",
        "Abstract"
      ]
    }
  ]
};

export const SUB_B54: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Keliling Segitiga)",
  "fullTitle": "Sub-Bab B: Keliling Segitiga",
  "targetDescription": "Siswa menghitung keliling segitiga sembarang dengan menjumlahkan tiga sisi dan keliling segitiga sama sisi dengan 3 × sisi sesuai Buku Siswa Kelas V Bab 4.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Kita belajar keliling segitiga. Jumlahkan tiga sisi. Jika sama sisi, boleh dikali tiga. Contoh lima plus empat plus tujuh sama dengan enam belas. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menentukan keliling segitiga.",
    "referensi": "Buku Siswa Matematika Kelas V Kemendikbudristek (Bab 4: Keliling Bangun Datar, Sub-Bab B hlm. 115–117)."
  },
  "videos": [
    {
      "id": "K5B4B-V1",
      "judul": "Jumlah Tiga Sisi",
      "subjudul": "Umum",
      "adegan": [
        {
          "id": "K5B4B-V1-1",
          "judul": "Segitiga",
          "ketukan": [
            "Segitiga punya tiga sisi.",
            "Kelilingnya jumlah ketiga sisi.",
            "Contoh lima, empat, tujuh.",
            "Hasil enam belas."
          ],
          "papan": [
            "3 sisi",
            "a+b+c",
            "5+4+7",
            "16"
          ]
        },
        {
          "id": "K5B4B-V1-2",
          "judul": "Ukur",
          "ketukan": [
            "Ukur dengan penggaris.",
            "Tulis tiap sisi.",
            "Jumlahkan.",
            "Sebutkan satuannya."
          ],
          "papan": [
            "ukur",
            "tulis",
            "jumlah",
            "cm"
          ]
        },
        {
          "id": "K5B4B-V1-3",
          "judul": "Rumus",
          "ketukan": [
            "Secara umum.",
            "Keliling sama dengan sisi satu plus dua plus tiga.",
            "Berlaku untuk semua segitiga.",
            "Ingat.",
            "METODE LUAR. Jumlah Tiga Sisi: Keliling segitiga = sisi satu + sisi dua + sisi tiga."
          ],
          "papan": [
            "umum",
            "a+b+c",
            "semua",
            "ingat",
            "METODE LUAR · Jumlah Tiga Sisi"
          ]
        }
      ]
    },
    {
      "id": "K5B4B-V2",
      "judul": "Sama Sisi",
      "subjudul": "Rumus 3×",
      "adegan": [
        {
          "id": "K5B4B-V2-1",
          "judul": "Tiga sama",
          "ketukan": [
            "Ketiga sisi sama panjang.",
            "Ada tanda sisi sama.",
            "Contoh sisi lima.",
            "Keliling tiga kali lima."
          ],
          "papan": [
            "sama",
            "tanda",
            "sisi 5",
            "15"
          ]
        },
        {
          "id": "K5B4B-V2-2",
          "judul": "Mengapa dikali",
          "ketukan": [
            "Menjumlah tiga sisi sama.",
            "Sama dengan dikali tiga.",
            "Lebih cepat.",
            "Hasil sama."
          ],
          "papan": [
            "jumlah=kali",
            "3×",
            "cepat",
            "sama"
          ]
        },
        {
          "id": "K5B4B-V2-3",
          "judul": "Sisi enam",
          "ketukan": [
            "Jika sisi enam.",
            "Tiga kali enam.",
            "Delapan belas.",
            "Ayo latihan.",
            "METODE LUAR. Pintasan Segitiga Sama Sisi: Jika ketiga sisi sama, keliling = 3 × panjang sisi."
          ],
          "papan": [
            "sisi 6",
            "3×6",
            "18",
            "latihan",
            "METODE LUAR · Pintasan Segitiga Sama Sisi"
          ]
        }
      ]
    },
    {
      "id": "K5B4B-V3",
      "judul": "Sama Kaki & Cek",
      "subjudul": "Lanjut",
      "adegan": [
        {
          "id": "K5B4B-V3-1",
          "judul": "Sama kaki",
          "ketukan": [
            "Dua sisi sama.",
            "Tetap jumlahkan tiga sisi.",
            "Jangan salah rumus.",
            "Cek dulu."
          ],
          "papan": [
            "2 sama",
            "a+b+c",
            "cek",
            "hati-hati"
          ]
        },
        {
          "id": "K5B4B-V3-2",
          "judul": "Cek hasil",
          "ketukan": [
            "Hasil harus lebih dari sisi terpanjang.",
            "Satuan tetap.",
            "Hitung ulang jika ragu.",
            "Siap bermain!"
          ],
          "papan": [
            "cek",
            "satuan",
            "ulang",
            "main"
          ]
        },
        {
          "id": "K5B4B-V3-3",
          "judul": "Siap C",
          "ketukan": [
            "Segitiga selesai.",
            "Lanjut segi empat.",
            "Ada persegi panjang dan persegi.",
            "Ayo!",
            "METODE LUAR. Ukur Dulu Baru Jumlah: Ukur tiap sisi dengan satuan sama, lalu jumlahkan."
          ],
          "papan": [
            "selesai",
            "segi 4",
            "PP & persegi",
            "ayo",
            "METODE LUAR · Ukur Dulu Baru Jumlah"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Kenali jenis",
      "stepDesc": "Sembarang/sama sisi?",
      "icon": "👀",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Ukur sisi",
      "stepDesc": "a, b, c",
      "icon": "📏",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Pilih rumus",
      "stepDesc": "a+b+c atau 3s",
      "icon": "🧮",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Hitung",
      "stepDesc": "Dapat keliling",
      "icon": "➕",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Satuan",
      "stepDesc": "cm",
      "icon": "📐",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek",
      "stepDesc": "Masuk akal?",
      "icon": "✅",
      "flowFrom": "5",
      "flowTo": "7"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. METODE LUAR · Jumlah Tiga Sisi",
      "stepDesc": "Keliling segitiga = sisi satu + sisi dua + sisi tiga.",
      "icon": "🌍",
      "flowFrom": "6",
      "flowTo": "8"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. METODE LUAR · Pintasan Segitiga Sama Sisi",
      "stepDesc": "Jika ketiga sisi sama, keliling = 3 × panjang sisi.",
      "icon": "🌍",
      "flowFrom": "7",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "Umum",
      "emoji": "🔺",
      "countNum": 1,
      "countWord": "a+b+c",
      "suara": "Semua segitiga."
    },
    {
      "judul": "5+4+7",
      "emoji": "➕",
      "countNum": 16,
      "countWord": "16 cm",
      "suara": "Contoh."
    },
    {
      "judul": "Sama sisi",
      "emoji": "✨",
      "countNum": 1,
      "countWord": "3×sisi",
      "suara": "Cepat."
    },
    {
      "judul": "3×5",
      "emoji": "5️⃣",
      "countNum": 15,
      "countWord": "15 cm",
      "suara": "Contoh."
    },
    {
      "judul": "3×6",
      "emoji": "6️⃣",
      "countNum": 18,
      "countWord": "18 cm",
      "suara": "Contoh."
    },
    {
      "judul": "Tanda sama",
      "emoji": "≡",
      "countNum": 1,
      "countWord": "sisi sama",
      "suara": "Gambar."
    },
    {
      "judul": "3+4+5",
      "emoji": "📐",
      "countNum": 12,
      "countWord": "12 cm",
      "suara": "Siku."
    },
    {
      "judul": "Sama kaki",
      "emoji": "🦵",
      "countNum": 1,
      "countWord": "tetap a+b+c",
      "suara": "Hati-hati."
    },
    {
      "judul": "Cek",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "> sisi max",
      "suara": "Validasi."
    },
    {
      "judul": "Siap C",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "segi 4",
      "suara": "Lanjut."
    },
    {
      "judul": "Jumlah Tiga Sisi",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "METODE LUAR · Side Sum",
      "suara": "METODE LUAR. Jumlah Tiga Sisi. Keliling segitiga = sisi satu + sisi dua + sisi tiga."
    },
    {
      "judul": "Pintasan Segitiga Sama Sisi",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "METODE LUAR · Equilateral Shortcut",
      "suara": "METODE LUAR. Pintasan Segitiga Sama Sisi. Jika ketiga sisi sama, keliling = 3 × panjang sisi."
    },
    {
      "judul": "Ukur Dulu Baru Jumlah",
      "emoji": "🌍",
      "countNum": 3,
      "countWord": "METODE LUAR · Measure Then Sum",
      "suara": "METODE LUAR. Ukur Dulu Baru Jumlah. Ukur tiap sisi dengan satuan sama, lalu jumlahkan."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-b-c",
      "title": "Hitung Segitiga",
      "bookReference": "hlm. 115–117",
      "objective": "Latihan topik. (METODE LUAR · Jumlah Tiga Sisi)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Jumlah Tiga Sisi. Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-b-c",
      "title": "Rumus Segitiga",
      "bookReference": "hlm. 115–117",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-b-c",
      "title": "Arti Rumus",
      "bookReference": "hlm. 115–117",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-b-c",
      "title": "Pilah Sama/Bebas",
      "bookReference": "hlm. 115–117",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-b-c",
      "title": "Jodohkan Segitiga",
      "bookReference": "hlm. 115–117",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-b-c",
      "title": "Memori Segitiga",
      "bookReference": "hlm. 115–117",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-b-c",
      "title": "Ketuk Hasil",
      "bookReference": "hlm. 115–117",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-b-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 115–117",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-b-c",
      "title": "Cerita Segitiga",
      "bookReference": "hlm. 115–117",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-b-c",
      "title": "Urutkan Hasil",
      "bookReference": "hlm. 115–117",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-b-p",
      "title": "Diagram Hitung Segitiga",
      "bookReference": "hlm. 115–117",
      "objective": "Baca diagram. (METODE LUAR · Jumlah Tiga Sisi)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Jumlah Tiga Sisi. Pilih.",
      "diagramType": "hitung",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "rumus-b-p",
      "title": "Diagram Rumus Segitiga",
      "bookReference": "hlm. 115–117",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "rumus",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "arti-b-p",
      "title": "Diagram Arti Rumus",
      "bookReference": "hlm. 115–117",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "arti",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sortir-b-p",
      "title": "Diagram Pilah Sama/Bebas",
      "bookReference": "hlm. 115–117",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "sortir",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-b-p",
      "title": "Diagram Jodohkan Segitiga",
      "bookReference": "hlm. 115–117",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "jodoh",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memori-b-p",
      "title": "Diagram Memori Segitiga",
      "bookReference": "hlm. 115–117",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "memori",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-b-p",
      "title": "Diagram Ketuk Hasil",
      "bookReference": "hlm. 115–117",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "ketuk",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "semua-b-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 115–117",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "semua",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "cerita-b-p",
      "title": "Diagram Cerita Segitiga",
      "bookReference": "hlm. 115–117",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "cerita",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "urut-b-p",
      "title": "Diagram Urutkan Hasil",
      "bookReference": "hlm. 115–117",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "urut",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-b-a",
      "title": "Tulis Hitung Segitiga",
      "bookReference": "hlm. 115–117",
      "objective": "Notasi. (METODE LUAR · Jumlah Tiga Sisi)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Jumlah Tiga Sisi. Pilih.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-b-a",
      "title": "Tulis Rumus Segitiga",
      "bookReference": "hlm. 115–117",
      "objective": "Notasi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-b-a",
      "title": "Tulis Arti Rumus",
      "bookReference": "hlm. 115–117",
      "objective": "Notasi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-b-a",
      "title": "Tulis Pilah Sama/Bebas",
      "bookReference": "hlm. 115–117",
      "objective": "Notasi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-b-a",
      "title": "Tulis Jodohkan Segitiga",
      "bookReference": "hlm. 115–117",
      "objective": "Notasi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-b-a",
      "title": "Tulis Memori Segitiga",
      "bookReference": "hlm. 115–117",
      "objective": "Notasi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-b",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 115–117",
      "objective": "Menilai.",
      "mechanicDescription": "Dua ronde.",
      "voiceGuide": "Benar/salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-b",
      "title": "Detektif Keliling",
      "bookReference": "hlm. 115–117",
      "objective": "Petunjuk.",
      "mechanicDescription": "Tiga soal.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "peta-b",
      "title": "Peta Konsep",
      "bookReference": "hlm. 115–117",
      "objective": "Peta.",
      "mechanicDescription": "Satu peta.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "cerita-q-b",
      "title": "Cerita Angka",
      "bookReference": "hlm. 115–117",
      "objective": "Cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "🔺",
      "nama": "Umum",
      "isi": "Keliling segitiga = a+b+c.",
      "suara": "Jumlah tiga sisi."
    },
    {
      "ikon": "✨",
      "nama": "Sama sisi",
      "isi": "Keliling = 3 × sisi.",
      "suara": "Lebih cepat."
    },
    {
      "ikon": "📏",
      "nama": "Ukur",
      "isi": "Pakai penggaris, satuan sama.",
      "suara": "Akurat."
    },
    {
      "ikon": "✅",
      "nama": "Cek",
      "isi": "Hasil > sisi terpanjang.",
      "suara": "Masuk akal."
    },
    {
      "ikon": "🌍",
      "nama": "Jumlah Tiga Sisi",
      "isi": "METODE LUAR · Side Sum: Keliling segitiga = sisi satu + sisi dua + sisi tiga. (asal: Elementary geometry).",
      "suara": "METODE LUAR. Jumlah Tiga Sisi. Keliling segitiga = sisi satu + sisi dua + sisi tiga."
    },
    {
      "ikon": "🌍",
      "nama": "Pintasan Segitiga Sama Sisi",
      "isi": "METODE LUAR · Equilateral Shortcut: Jika ketiga sisi sama, keliling = 3 × panjang sisi. (asal: Van de Walle).",
      "suara": "METODE LUAR. Pintasan Segitiga Sama Sisi. Jika ketiga sisi sama, keliling = 3 × panjang sisi."
    },
    {
      "ikon": "🌍",
      "nama": "Ukur Dulu Baru Jumlah",
      "isi": "METODE LUAR · Measure Then Sum: Ukur tiap sisi dengan satuan sama, lalu jumlahkan. (asal: Hands-on measurement).",
      "suara": "METODE LUAR. Ukur Dulu Baru Jumlah. Ukur tiap sisi dengan satuan sama, lalu jumlahkan."
    }
  ],
  "poinSuara": "Ingat: a+b+c, atau 3×sisi jika sama sisi.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Kenali jenis",
        "warna": "#FDE68A"
      },
      {
        "teks": "ukur sisi",
        "warna": "#BBF7D0"
      },
      {
        "teks": "pilih rumus",
        "warna": "#BFDBFE"
      },
      {
        "teks": "hitung & cek",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: buat segitiga dari sedotan lalu hitung kelilingnya.",
  "refleksi": [
    "Kapan boleh memakai 3×sisi?",
    "Berapa keliling 5+4+7?",
    "Mengapa satuan penting?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Side Sum",
      "namaId": "Jumlah Tiga Sisi",
      "asal": "Elementary geometry",
      "ringkas": "Keliling segitiga = sisi satu + sisi dua + sisi tiga.",
      "tahap": [
        "Story",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Equilateral Shortcut",
      "namaId": "Pintasan Segitiga Sama Sisi",
      "asal": "Van de Walle",
      "ringkas": "Jika ketiga sisi sama, keliling = 3 × panjang sisi.",
      "tahap": [
        "Story",
        "Mind",
        "Picture",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Measure Then Sum",
      "namaId": "Ukur Dulu Baru Jumlah",
      "asal": "Hands-on measurement",
      "ringkas": "Ukur tiap sisi dengan satuan sama, lalu jumlahkan.",
      "tahap": [
        "Concrete",
        "Infografis"
      ]
    }
  ]
};

export const SUB_C54: SubBabNaskah = {
  "id": "C",
  "codeTitle": "Sub-Bab C (Keliling Segi Empat)",
  "fullTitle": "Sub-Bab C: Keliling Segi Empat",
  "targetDescription": "Siswa menghitung keliling persegi panjang dengan 2(p+l) dan keliling persegi dengan 4×sisi, memahami sisi berhadapan sama panjang sesuai Buku Siswa Kelas V Bab 4.",
  "secondaryBg": "#DCFCE7",
  "secondaryBorder": "#16A34A",
  "secondaryText": "#14532D",
  "silabus": {
    "teksSuara": "Kita belajar keliling segi empat. Persegi panjang: dua kali panjang plus lebar. Persegi: empat kali sisi. Sisi berhadapan sama. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menentukan keliling persegi panjang dan persegi.",
    "referensi": "Buku Siswa Matematika Kelas V Kemendikbudristek (Bab 4: Keliling Bangun Datar, Sub-Bab C hlm. 118–121)."
  },
  "videos": [
    {
      "id": "K5B4C-V1",
      "judul": "Persegi Panjang",
      "subjudul": "2(p+l)",
      "adegan": [
        {
          "id": "K5B4C-V1-1",
          "judul": "Sisi berhadapan",
          "ketukan": [
            "Panjang berhadapan sama.",
            "Lebar berhadapan sama.",
            "Ada dua panjang dan dua lebar.",
            "Jumlahkan semuanya."
          ],
          "papan": [
            "p=p",
            "l=l",
            "2p 2l",
            "jumlah"
          ]
        },
        {
          "id": "K5B4C-V1-2",
          "judul": "Rumus",
          "ketukan": [
            "Keliling dua kali panjang plus lebar.",
            "Atau dua p plus dua l.",
            "Sama saja.",
            "Contoh lima dan tiga."
          ],
          "papan": [
            "2(p+l)",
            "2p+2l",
            "sama",
            "5&3"
          ]
        },
        {
          "id": "K5B4C-V1-3",
          "judul": "Hitung",
          "ketukan": [
            "Dua kali lima plus tiga.",
            "Dua kali delapan.",
            "Enam belas.",
            "Itu keliling.",
            "METODE LUAR. Rumus 2 kali Panjang Plus Lebar: Keliling persegi panjang = 2 × (panjang + lebar), karena sisi berhadapan sama."
          ],
          "papan": [
            "2(5+3)",
            "2×8",
            "16",
            "keliling",
            "METODE LUAR · Rumus 2 kali Panjang Plus Lebar"
          ]
        }
      ]
    },
    {
      "id": "K5B4C-V2",
      "judul": "Persegi",
      "subjudul": "4×sisi",
      "adegan": [
        {
          "id": "K5B4C-V2-1",
          "judul": "Empat sama",
          "ketukan": [
            "Keempat sisi sama.",
            "Cukup kali empat.",
            "Contoh sisi tiga.",
            "Keliling dua belas."
          ],
          "papan": [
            "4 sama",
            "4×s",
            "sisi 3",
            "12"
          ]
        },
        {
          "id": "K5B4C-V2-2",
          "judul": "Sisi lima",
          "ketukan": [
            "Sisi lima.",
            "Empat kali lima.",
            "Dua puluh.",
            "Mudah."
          ],
          "papan": [
            "sisi 5",
            "4×5",
            "20",
            "mudah"
          ]
        },
        {
          "id": "K5B4C-V2-3",
          "judul": "Banding PP",
          "ketukan": [
            "Jika panjang sama lebar.",
            "Itu persegi.",
            "Pakai 4×sisi.",
            "Atau tetap 2(p+l).",
            "METODE LUAR. Pintasan Empat Kali Sisi: Keliling persegi = 4 × sisi karena keempat sisi sama."
          ],
          "papan": [
            "p=l",
            "persegi",
            "4×s",
            "atau 2(p+l)",
            "METODE LUAR · Pintasan Empat Kali Sisi"
          ]
        }
      ]
    },
    {
      "id": "K5B4C-V3",
      "judul": "Latihan Cepat",
      "subjudul": "Cek",
      "adegan": [
        {
          "id": "K5B4C-V3-1",
          "judul": "PP 4 dan 2",
          "ketukan": [
            "Dua kali empat plus dua.",
            "Dua belas.",
            "Cek: empat plus dua plus empat plus dua.",
            "Sama."
          ],
          "papan": [
            "2(4+2)",
            "12",
            "cek",
            "sama"
          ]
        },
        {
          "id": "K5B4C-V3-2",
          "judul": "Jangan tertukar",
          "ketukan": [
            "Jangan kali panjang kali lebar.",
            "Itu luas.",
            "Keliling mengelilingi.",
            "Ingat."
          ],
          "papan": [
            "bukan p×l",
            "luas",
            "keliling",
            "ingat"
          ]
        },
        {
          "id": "K5B4C-V3-3",
          "judul": "Siap D",
          "ketukan": [
            "Segi empat siap.",
            "Lanjut segi banyak.",
            "Segi lima dan enam.",
            "Ayo!",
            "METODE LUAR. Bukan Panjang Kali Lebar: Panjang × lebar adalah luas, bukan keliling."
          ],
          "papan": [
            "siap",
            "segi banyak",
            "5 & 6",
            "ayo",
            "METODE LUAR · Bukan Panjang Kali Lebar"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Kenali",
      "stepDesc": "PP atau persegi?",
      "icon": "👀",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. PP",
      "stepDesc": "2(p+l)",
      "icon": "▭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Persegi",
      "stepDesc": "4×sisi",
      "icon": "⬜",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Hitung",
      "stepDesc": "Dapat K",
      "icon": "🧮",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Cek",
      "stepDesc": "Jumlah sisi?",
      "icon": "✅",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Bukan luas",
      "stepDesc": "Bukan p×l",
      "icon": "⚠️",
      "flowFrom": "5",
      "flowTo": "7"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. METODE LUAR · Rumus 2 kali Panjang Plus Lebar",
      "stepDesc": "Keliling persegi panjang = 2 × (panjang + lebar), karena sisi berhadapan sama.",
      "icon": "🌍",
      "flowFrom": "6",
      "flowTo": "8"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. METODE LUAR · Pintasan Empat Kali Sisi",
      "stepDesc": "Keliling persegi = 4 × sisi karena keempat sisi sama.",
      "icon": "🌍",
      "flowFrom": "7",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "PP",
      "emoji": "▭",
      "countNum": 1,
      "countWord": "2(p+l)",
      "suara": "Rumus."
    },
    {
      "judul": "5&3",
      "emoji": "➕",
      "countNum": 16,
      "countWord": "16 cm",
      "suara": "Contoh."
    },
    {
      "judul": "2p+2l",
      "emoji": "=",
      "countNum": 1,
      "countWord": "sama 2(p+l)",
      "suara": "Setara."
    },
    {
      "judul": "Persegi",
      "emoji": "⬜",
      "countNum": 1,
      "countWord": "4×sisi",
      "suara": "Rumus."
    },
    {
      "judul": "sisi 3",
      "emoji": "3️⃣",
      "countNum": 12,
      "countWord": "12 cm",
      "suara": "Contoh."
    },
    {
      "judul": "sisi 5",
      "emoji": "5️⃣",
      "countNum": 20,
      "countWord": "20 cm",
      "suara": "Contoh."
    },
    {
      "judul": "Berhadapan",
      "emoji": "⇄",
      "countNum": 1,
      "countWord": "sama panjang",
      "suara": "PP."
    },
    {
      "judul": "Bukan",
      "emoji": "⚠️",
      "countNum": 1,
      "countWord": "p×l",
      "suara": "Itu luas."
    },
    {
      "judul": "PP 4&2",
      "emoji": "🔢",
      "countNum": 12,
      "countWord": "12 cm",
      "suara": "Latihan."
    },
    {
      "judul": "Siap D",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "segi banyak",
      "suara": "Lanjut."
    },
    {
      "judul": "Rumus 2 kali Panjang Plus Lebar",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "METODE LUAR · Rectangle Formula",
      "suara": "METODE LUAR. Rumus 2 kali Panjang Plus Lebar. Keliling persegi panjang = 2 × (panjang + lebar), karena sisi berhadapan sama."
    },
    {
      "judul": "Pintasan Empat Kali Sisi",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "METODE LUAR · Square Shortcut",
      "suara": "METODE LUAR. Pintasan Empat Kali Sisi. Keliling persegi = 4 × sisi karena keempat sisi sama."
    },
    {
      "judul": "Bukan Panjang Kali Lebar",
      "emoji": "🌍",
      "countNum": 3,
      "countWord": "METODE LUAR · Not Area Product",
      "suara": "METODE LUAR. Bukan Panjang Kali Lebar. Panjang × lebar adalah luas, bukan keliling."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-c-c",
      "title": "Hitung Segi Empat",
      "bookReference": "hlm. 118–121",
      "objective": "Latihan topik. (METODE LUAR · Rumus 2 kali Panjang Plus Lebar)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Rumus 2 kali Panjang Plus Lebar. Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-c-c",
      "title": "Rumus PP/Persegi",
      "bookReference": "hlm. 118–121",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-c-c",
      "title": "Arti Rumus",
      "bookReference": "hlm. 118–121",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-c-c",
      "title": "Pilah PP/Persegi",
      "bookReference": "hlm. 118–121",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-c-c",
      "title": "Jodohkan Segi Empat",
      "bookReference": "hlm. 118–121",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-c-c",
      "title": "Memori Segi Empat",
      "bookReference": "hlm. 118–121",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-c-c",
      "title": "Ketuk Hasil",
      "bookReference": "hlm. 118–121",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-c-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 118–121",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-c-c",
      "title": "Cerita Segi Empat",
      "bookReference": "hlm. 118–121",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-c-c",
      "title": "Urutkan Hasil",
      "bookReference": "hlm. 118–121",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-c-p",
      "title": "Diagram Hitung Segi Empat",
      "bookReference": "hlm. 118–121",
      "objective": "Baca diagram. (METODE LUAR · Rumus 2 kali Panjang Plus Lebar)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Rumus 2 kali Panjang Plus Lebar. Pilih.",
      "diagramType": "hitung",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "rumus-c-p",
      "title": "Diagram Rumus PP/Persegi",
      "bookReference": "hlm. 118–121",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "rumus",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "arti-c-p",
      "title": "Diagram Arti Rumus",
      "bookReference": "hlm. 118–121",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "arti",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sortir-c-p",
      "title": "Diagram Pilah PP/Persegi",
      "bookReference": "hlm. 118–121",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "sortir",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-c-p",
      "title": "Diagram Jodohkan Segi Empat",
      "bookReference": "hlm. 118–121",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "jodoh",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memori-c-p",
      "title": "Diagram Memori Segi Empat",
      "bookReference": "hlm. 118–121",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "memori",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-c-p",
      "title": "Diagram Ketuk Hasil",
      "bookReference": "hlm. 118–121",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "ketuk",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "semua-c-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 118–121",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "semua",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "cerita-c-p",
      "title": "Diagram Cerita Segi Empat",
      "bookReference": "hlm. 118–121",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "cerita",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "urut-c-p",
      "title": "Diagram Urutkan Hasil",
      "bookReference": "hlm. 118–121",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "urut",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-c-a",
      "title": "Tulis Hitung Segi Empat",
      "bookReference": "hlm. 118–121",
      "objective": "Notasi. (METODE LUAR · Rumus 2 kali Panjang Plus Lebar)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Rumus 2 kali Panjang Plus Lebar. Pilih.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-c-a",
      "title": "Tulis Rumus PP/Persegi",
      "bookReference": "hlm. 118–121",
      "objective": "Notasi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-c-a",
      "title": "Tulis Arti Rumus",
      "bookReference": "hlm. 118–121",
      "objective": "Notasi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-c-a",
      "title": "Tulis Pilah PP/Persegi",
      "bookReference": "hlm. 118–121",
      "objective": "Notasi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-c-a",
      "title": "Tulis Jodohkan Segi Empat",
      "bookReference": "hlm. 118–121",
      "objective": "Notasi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-c-a",
      "title": "Tulis Memori Segi Empat",
      "bookReference": "hlm. 118–121",
      "objective": "Notasi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-c",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 118–121",
      "objective": "Menilai.",
      "mechanicDescription": "Dua ronde.",
      "voiceGuide": "Benar/salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-c",
      "title": "Detektif Keliling",
      "bookReference": "hlm. 118–121",
      "objective": "Petunjuk.",
      "mechanicDescription": "Tiga soal.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "peta-c",
      "title": "Peta Konsep",
      "bookReference": "hlm. 118–121",
      "objective": "Peta.",
      "mechanicDescription": "Satu peta.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "cerita-q-c",
      "title": "Cerita Angka",
      "bookReference": "hlm. 118–121",
      "objective": "Cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "▭",
      "nama": "PP",
      "isi": "Keliling = 2(p+l) = 2p+2l.",
      "suara": "Berhadapan sama."
    },
    {
      "ikon": "⬜",
      "nama": "Persegi",
      "isi": "Keliling = 4 × sisi.",
      "suara": "Semua sisi sama."
    },
    {
      "ikon": "⚠️",
      "nama": "Bukan luas",
      "isi": "p×l adalah luas, bukan keliling.",
      "suara": "Jangan tertukar."
    },
    {
      "ikon": "✅",
      "nama": "Cek",
      "isi": "Boleh dijumlah manual empat sisi.",
      "suara": "Hasil sama."
    },
    {
      "ikon": "🌍",
      "nama": "Rumus 2 kali Panjang Plus Lebar",
      "isi": "METODE LUAR · Rectangle Formula: Keliling persegi panjang = 2 × (panjang + lebar), karena sisi berhadapan sama. (asal: Singapore Math / formula fluency).",
      "suara": "METODE LUAR. Rumus 2 kali Panjang Plus Lebar. Keliling persegi panjang = 2 × (panjang + lebar), karena sisi berhadapan sama."
    },
    {
      "ikon": "🌍",
      "nama": "Pintasan Empat Kali Sisi",
      "isi": "METODE LUAR · Square Shortcut: Keliling persegi = 4 × sisi karena keempat sisi sama. (asal: Elementary geometry).",
      "suara": "METODE LUAR. Pintasan Empat Kali Sisi. Keliling persegi = 4 × sisi karena keempat sisi sama."
    },
    {
      "ikon": "🌍",
      "nama": "Bukan Panjang Kali Lebar",
      "isi": "METODE LUAR · Not Area Product: Panjang × lebar adalah luas, bukan keliling. (asal: Misconception prevention).",
      "suara": "METODE LUAR. Bukan Panjang Kali Lebar. Panjang × lebar adalah luas, bukan keliling."
    }
  ],
  "poinSuara": "Ingat: 2(p+l) untuk PP, 4×sisi untuk persegi.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Kenali bangun",
        "warna": "#FDE68A"
      },
      {
        "teks": "tulis p/l atau s",
        "warna": "#BBF7D0"
      },
      {
        "teks": "pakai rumus",
        "warna": "#BFDBFE"
      },
      {
        "teks": "cek",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: ukur panjang dan lebar buku, hitung kelilingnya.",
  "refleksi": [
    "Apa rumus keliling PP?",
    "Mengapa persegi memakai 4×sisi?",
    "Apa beda keliling dan luas?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Rectangle Formula",
      "namaId": "Rumus 2 kali Panjang Plus Lebar",
      "asal": "Singapore Math / formula fluency",
      "ringkas": "Keliling persegi panjang = 2 × (panjang + lebar), karena sisi berhadapan sama.",
      "tahap": [
        "Story",
        "Mind",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Square Shortcut",
      "namaId": "Pintasan Empat Kali Sisi",
      "asal": "Elementary geometry",
      "ringkas": "Keliling persegi = 4 × sisi karena keempat sisi sama.",
      "tahap": [
        "Story",
        "Picture",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Not Area Product",
      "namaId": "Bukan Panjang Kali Lebar",
      "asal": "Misconception prevention",
      "ringkas": "Panjang × lebar adalah luas, bukan keliling.",
      "tahap": [
        "Infografis",
        "Abstract"
      ]
    }
  ]
};

export const SUB_D54: SubBabNaskah = {
  "id": "D",
  "codeTitle": "Sub-Bab D (Keliling Segi Banyak)",
  "fullTitle": "Sub-Bab D: Keliling Segi Banyak",
  "targetDescription": "Siswa menghitung keliling segi-n beraturan dengan n×sisi (segi lima, segi enam, dan seterusnya) serta menjumlahkan semua sisi jika panjangnya tidak sama sesuai Buku Siswa Kelas V Bab 4.",
  "secondaryBg": "#FCE7F3",
  "secondaryBorder": "#DB2777",
  "secondaryText": "#9D174D",
  "silabus": {
    "teksSuara": "Kita belajar keliling segi banyak. Jika beraturan, kali banyak sisi dengan panjang sisi. Segi lima kali lima. Segi enam kali enam. Jika sisi beda, jumlahkan semua. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menentukan keliling segi banyak beraturan dan tidak beraturan.",
    "referensi": "Buku Siswa Matematika Kelas V Kemendikbudristek (Bab 4: Keliling Bangun Datar, Sub-Bab D hlm. 122–124)."
  },
  "videos": [
    {
      "id": "K5B4D-V1",
      "judul": "Segi Lima",
      "subjudul": "5×sisi",
      "adegan": [
        {
          "id": "K5B4D-V1-1",
          "judul": "Lima sisi",
          "ketukan": [
            "Segi lima punya lima sisi.",
            "Jika sama panjang, beraturan.",
            "Keliling lima kali sisi.",
            "Contoh sisi tiga jadi lima belas."
          ],
          "papan": [
            "5 sisi",
            "beraturan",
            "5×s",
            "15"
          ]
        },
        {
          "id": "K5B4D-V1-2",
          "judul": "Hitung",
          "ketukan": [
            "Tulis lima kali tiga.",
            "Hasil lima belas.",
            "Satuan centi meter.",
            "Benar."
          ],
          "papan": [
            "5×3",
            "15",
            "cm",
            "ok"
          ]
        },
        {
          "id": "K5B4D-V1-3",
          "judul": "Tabel",
          "ketukan": [
            "Di tabel buku.",
            "Lima sisi: lima kali sisi.",
            "Enam sisi: enam kali sisi.",
            "Pola jelas.",
            "METODE LUAR. Segi-n Beraturan n Kali Sisi: Jika semua sisi sama, keliling = banyak sisi × panjang satu sisi."
          ],
          "papan": [
            "tabel",
            "5×s",
            "6×s",
            "pola",
            "METODE LUAR · Segi-n Beraturan n Kali Sisi"
          ]
        }
      ]
    },
    {
      "id": "K5B4D-V2",
      "judul": "Segi Enam",
      "subjudul": "6×sisi",
      "adegan": [
        {
          "id": "K5B4D-V2-1",
          "judul": "Enam sisi",
          "ketukan": [
            "Segi enam punya enam sisi.",
            "Beraturan: kali enam.",
            "Contoh sisi empat.",
            "Hasil dua puluh empat."
          ],
          "papan": [
            "6 sisi",
            "6×s",
            "sisi 4",
            "24"
          ]
        },
        {
          "id": "K5B4D-V2-2",
          "judul": "Lainnya",
          "ketukan": [
            "Segi delapan kali delapan.",
            "Segi-n kali n.",
            "Asalkan sisi sama.",
            "Itu kuncinya."
          ],
          "papan": [
            "8×s",
            "n×s",
            "sisi sama",
            "kunci"
          ]
        },
        {
          "id": "K5B4D-V2-3",
          "judul": "Sisi beda",
          "ketukan": [
            "Jika sisi tidak sama.",
            "Jangan langsung kali n.",
            "Jumlahkan satu-satu.",
            "Aman.",
            "METODE LUAR. Sisi Beda Jumlah Satu-satu: Jika sisi tidak sama, jangan langsung kali n; jumlahkan semua sisi."
          ],
          "papan": [
            "beda",
            "jangan ×n",
            "jumlah",
            "aman",
            "METODE LUAR · Sisi Beda Jumlah Satu-satu"
          ]
        }
      ]
    },
    {
      "id": "K5B4D-V3",
      "judul": "Rangkum",
      "subjudul": "Aturan",
      "adegan": [
        {
          "id": "K5B4D-V3-1",
          "judul": "Beraturan",
          "ketukan": [
            "Semua sisi sama.",
            "Pakai n kali sisi.",
            "Cepat dan tepat.",
            "Ingat tabel."
          ],
          "papan": [
            "sama",
            "n×s",
            "cepat",
            "tabel"
          ]
        },
        {
          "id": "K5B4D-V3-2",
          "judul": "Tidak beraturan",
          "ketukan": [
            "Sisi berbeda.",
            "Jumlahkan semua sisi.",
            "Ukur tiap sisi.",
            "Siap bermain!"
          ],
          "papan": [
            "beda",
            "jumlah",
            "ukur",
            "main"
          ]
        },
        {
          "id": "K5B4D-V3-3",
          "judul": "Siap E",
          "ketukan": [
            "Segi banyak siap.",
            "Lanjut bangun gabungan.",
            "Denah rumah.",
            "Ayo!",
            "METODE LUAR. Pola Tabel Banyak Sisi: Segi lima 5×s, segi enam 6×s: pola n×s untuk segi-n beraturan."
          ],
          "papan": [
            "siap",
            "gabungan",
            "denah",
            "ayo",
            "METODE LUAR · Pola Tabel Banyak Sisi"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Hitung sisi",
      "stepDesc": "Berapa n?",
      "icon": "🔢",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Sama?",
      "stepDesc": "Beraturan?",
      "icon": "👀",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Ya",
      "stepDesc": "n×sisi",
      "icon": "✨",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Tidak",
      "stepDesc": "Jumlah semua",
      "icon": "➕",
      "flowFrom": "2",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Hitung",
      "stepDesc": "Dapat K",
      "icon": "🧮",
      "flowFrom": "3",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek",
      "stepDesc": "Masuk akal?",
      "icon": "✅",
      "flowFrom": "5",
      "flowTo": "7"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. METODE LUAR · Segi-n Beraturan n Kali Sisi",
      "stepDesc": "Jika semua sisi sama, keliling = banyak sisi × panjang satu sisi.",
      "icon": "🌍",
      "flowFrom": "6",
      "flowTo": "8"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. METODE LUAR · Sisi Beda Jumlah Satu-satu",
      "stepDesc": "Jika sisi tidak sama, jangan langsung kali n; jumlahkan semua sisi.",
      "icon": "🌍",
      "flowFrom": "7",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "Segi 5",
      "emoji": "⬠",
      "countNum": 5,
      "countWord": "5×sisi",
      "suara": "Beraturan."
    },
    {
      "judul": "5×3",
      "emoji": "3️⃣",
      "countNum": 15,
      "countWord": "15 cm",
      "suara": "Contoh."
    },
    {
      "judul": "Segi 6",
      "emoji": "⬡",
      "countNum": 6,
      "countWord": "6×sisi",
      "suara": "Beraturan."
    },
    {
      "judul": "6×4",
      "emoji": "4️⃣",
      "countNum": 24,
      "countWord": "24 cm",
      "suara": "Contoh."
    },
    {
      "judul": "Umum",
      "emoji": "n",
      "countNum": 1,
      "countWord": "n×sisi",
      "suara": "Pola."
    },
    {
      "judul": "Sisi beda",
      "emoji": "⚠️",
      "countNum": 1,
      "countWord": "jumlah semua",
      "suara": "Aman."
    },
    {
      "judul": "8×2",
      "emoji": "8️⃣",
      "countNum": 16,
      "countWord": "16 cm",
      "suara": "Segi 8."
    },
    {
      "judul": "Tabel",
      "emoji": "📋",
      "countNum": 1,
      "countWord": "banyak sisi",
      "suara": "Rangkum."
    },
    {
      "judul": "Kunci",
      "emoji": "🔑",
      "countNum": 1,
      "countWord": "sama atau beda?",
      "suara": "Cabang."
    },
    {
      "judul": "Siap E",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "gabungan",
      "suara": "Lanjut."
    },
    {
      "judul": "Segi-n Beraturan n Kali Sisi",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "METODE LUAR · Regular n-gon",
      "suara": "METODE LUAR. Segi-n Beraturan n Kali Sisi. Jika semua sisi sama, keliling = banyak sisi × panjang satu sisi."
    },
    {
      "judul": "Sisi Beda Jumlah Satu-satu",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "METODE LUAR · Irregular Side Sum",
      "suara": "METODE LUAR. Sisi Beda Jumlah Satu-satu. Jika sisi tidak sama, jangan langsung kali n; jumlahkan semua sisi."
    },
    {
      "judul": "Pola Tabel Banyak Sisi",
      "emoji": "🌍",
      "countNum": 3,
      "countWord": "METODE LUAR · Table Pattern",
      "suara": "METODE LUAR. Pola Tabel Banyak Sisi. Segi lima 5×s, segi enam 6×s: pola n×s untuk segi-n beraturan."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-d-c",
      "title": "Hitung Segi Banyak",
      "bookReference": "hlm. 122–124",
      "objective": "Latihan topik. (METODE LUAR · Segi-n Beraturan n Kali Sisi)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Segi-n Beraturan n Kali Sisi. Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-d-c",
      "title": "Rumus n×sisi",
      "bookReference": "hlm. 122–124",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-d-c",
      "title": "Arti Rumus",
      "bookReference": "hlm. 122–124",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-d-c",
      "title": "Pilah Beraturan/Bebas",
      "bookReference": "hlm. 122–124",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-d-c",
      "title": "Jodohkan Segi Banyak",
      "bookReference": "hlm. 122–124",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-d-c",
      "title": "Memori Segi Banyak",
      "bookReference": "hlm. 122–124",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-d-c",
      "title": "Ketuk Hasil",
      "bookReference": "hlm. 122–124",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-d-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 122–124",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-d-c",
      "title": "Cerita Segi Banyak",
      "bookReference": "hlm. 122–124",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-d-c",
      "title": "Urutkan Hasil",
      "bookReference": "hlm. 122–124",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-d-p",
      "title": "Diagram Hitung Segi Banyak",
      "bookReference": "hlm. 122–124",
      "objective": "Baca diagram. (METODE LUAR · Segi-n Beraturan n Kali Sisi)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Segi-n Beraturan n Kali Sisi. Pilih.",
      "diagramType": "hitung",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "rumus-d-p",
      "title": "Diagram Rumus n×sisi",
      "bookReference": "hlm. 122–124",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "rumus",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "arti-d-p",
      "title": "Diagram Arti Rumus",
      "bookReference": "hlm. 122–124",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "arti",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sortir-d-p",
      "title": "Diagram Pilah Beraturan/Bebas",
      "bookReference": "hlm. 122–124",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "sortir",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-d-p",
      "title": "Diagram Jodohkan Segi Banyak",
      "bookReference": "hlm. 122–124",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "jodoh",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memori-d-p",
      "title": "Diagram Memori Segi Banyak",
      "bookReference": "hlm. 122–124",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "memori",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-d-p",
      "title": "Diagram Ketuk Hasil",
      "bookReference": "hlm. 122–124",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "ketuk",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "semua-d-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 122–124",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "semua",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "cerita-d-p",
      "title": "Diagram Cerita Segi Banyak",
      "bookReference": "hlm. 122–124",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "cerita",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "urut-d-p",
      "title": "Diagram Urutkan Hasil",
      "bookReference": "hlm. 122–124",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "urut",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-d-a",
      "title": "Tulis Hitung Segi Banyak",
      "bookReference": "hlm. 122–124",
      "objective": "Notasi. (METODE LUAR · Segi-n Beraturan n Kali Sisi)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Segi-n Beraturan n Kali Sisi. Pilih.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-d-a",
      "title": "Tulis Rumus n×sisi",
      "bookReference": "hlm. 122–124",
      "objective": "Notasi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-d-a",
      "title": "Tulis Arti Rumus",
      "bookReference": "hlm. 122–124",
      "objective": "Notasi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-d-a",
      "title": "Tulis Pilah Beraturan/Bebas",
      "bookReference": "hlm. 122–124",
      "objective": "Notasi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-d-a",
      "title": "Tulis Jodohkan Segi Banyak",
      "bookReference": "hlm. 122–124",
      "objective": "Notasi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-d-a",
      "title": "Tulis Memori Segi Banyak",
      "bookReference": "hlm. 122–124",
      "objective": "Notasi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-d",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 122–124",
      "objective": "Menilai.",
      "mechanicDescription": "Dua ronde.",
      "voiceGuide": "Benar/salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-d",
      "title": "Detektif Keliling",
      "bookReference": "hlm. 122–124",
      "objective": "Petunjuk.",
      "mechanicDescription": "Tiga soal.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "peta-d",
      "title": "Peta Konsep",
      "bookReference": "hlm. 122–124",
      "objective": "Peta.",
      "mechanicDescription": "Satu peta.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "cerita-q-d",
      "title": "Cerita Angka",
      "bookReference": "hlm. 122–124",
      "objective": "Cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "✨",
      "nama": "Beraturan",
      "isi": "Keliling = n × sisi.",
      "suara": "Semua sisi sama."
    },
    {
      "ikon": "➕",
      "nama": "Tidak sama",
      "isi": "Jumlahkan semua sisi satu-satu.",
      "suara": "Jangan ×n."
    },
    {
      "ikon": "⬠",
      "nama": "Segi 5",
      "isi": "5 × sisi. Contoh 5×3=15.",
      "suara": "Pentagon."
    },
    {
      "ikon": "⬡",
      "nama": "Segi 6",
      "isi": "6 × sisi. Contoh 6×4=24.",
      "suara": "Hexagon."
    },
    {
      "ikon": "🌍",
      "nama": "Segi-n Beraturan n Kali Sisi",
      "isi": "METODE LUAR · Regular n-gon: Jika semua sisi sama, keliling = banyak sisi × panjang satu sisi. (asal: Polygon perimeter).",
      "suara": "METODE LUAR. Segi-n Beraturan n Kali Sisi. Jika semua sisi sama, keliling = banyak sisi × panjang satu sisi."
    },
    {
      "ikon": "🌍",
      "nama": "Sisi Beda Jumlah Satu-satu",
      "isi": "METODE LUAR · Irregular Side Sum: Jika sisi tidak sama, jangan langsung kali n; jumlahkan semua sisi. (asal: Flexible strategy).",
      "suara": "METODE LUAR. Sisi Beda Jumlah Satu-satu. Jika sisi tidak sama, jangan langsung kali n; jumlahkan semua sisi."
    },
    {
      "ikon": "🌍",
      "nama": "Pola Tabel Banyak Sisi",
      "isi": "METODE LUAR · Table Pattern: Segi lima 5×s, segi enam 6×s: pola n×s untuk segi-n beraturan. (asal: Pattern generalization).",
      "suara": "METODE LUAR. Pola Tabel Banyak Sisi. Segi lima 5×s, segi enam 6×s: pola n×s untuk segi-n beraturan."
    }
  ],
  "poinSuara": "Ingat: beraturan n×sisi; sisi beda jumlahkan semua.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Hitung n",
        "warna": "#FDE68A"
      },
      {
        "teks": "cek sisi sama?",
        "warna": "#BBF7D0"
      },
      {
        "teks": "pilih rumus",
        "warna": "#BFDBFE"
      },
      {
        "teks": "hitung",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: gambar segi lima beraturan sisi 2 cm dan hitung kelilingnya.",
  "refleksi": [
    "Kapan memakai n×sisi?",
    "Berapa keliling segi lima sisi 3?",
    "Apa yang dilakukan jika sisi berbeda?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Regular n-gon",
      "namaId": "Segi-n Beraturan n Kali Sisi",
      "asal": "Polygon perimeter",
      "ringkas": "Jika semua sisi sama, keliling = banyak sisi × panjang satu sisi.",
      "tahap": [
        "Story",
        "Mind",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Irregular Side Sum",
      "namaId": "Sisi Beda Jumlah Satu-satu",
      "asal": "Flexible strategy",
      "ringkas": "Jika sisi tidak sama, jangan langsung kali n; jumlahkan semua sisi.",
      "tahap": [
        "Story",
        "Picture",
        "Concrete"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Table Pattern",
      "namaId": "Pola Tabel Banyak Sisi",
      "asal": "Pattern generalization",
      "ringkas": "Segi lima 5×s, segi enam 6×s: pola n×s untuk segi-n beraturan.",
      "tahap": [
        "Infografis",
        "Abstract"
      ]
    }
  ]
};

export const SUB_E54: SubBabNaskah = {
  "id": "E",
  "codeTitle": "Sub-Bab E (Bangun Gabungan)",
  "fullTitle": "Sub-Bab E: Keliling Bangun Gabungan",
  "targetDescription": "Siswa menghitung keliling bangun gabungan pada denah dengan hanya menjumlahkan sisi-sisi batas luar, mengabaikan sekat dalam, serta memakai strategi kesamaan ukuran sesuai Buku Siswa Kelas V Bab 4.",
  "secondaryBg": "#EDE9FE",
  "secondaryBorder": "#7C3AED",
  "secondaryText": "#5B21B6",
  "silabus": {
    "teksSuara": "Kita belajar keliling bangun gabungan. Hanya batas luar yang dihitung. Sekat dalam tidak ikut. Bisa ukur sisi luar satu-satu atau bungkus dengan persegi panjang besar. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menentukan keliling bangun gabungan.",
    "referensi": "Buku Siswa Matematika Kelas V Kemendikbudristek (Bab 4: Keliling Bangun Datar, Sub-Bab E hlm. 125–130)."
  },
  "videos": [
    {
      "id": "K5B4E-V1",
      "judul": "Batas Luar",
      "subjudul": "Aturan",
      "adegan": [
        {
          "id": "K5B4E-V1-1",
          "judul": "Denah rumah",
          "ketukan": [
            "Denah gabungan beberapa bangun.",
            "Ada dapur, kamar, ruang tamu.",
            "Kelilingnya dinding terluar.",
            "Bukan sekat dalam."
          ],
          "papan": [
            "denah",
            "gabungan",
            "terluar",
            "bukan dalam"
          ]
        },
        {
          "id": "K5B4E-V1-2",
          "judul": "Sekat dalam",
          "ketukan": [
            "Sekat antar ruang.",
            "Bukan batas luar.",
            "Jangan dijumlah ke keliling luar.",
            "Abaikan."
          ],
          "papan": [
            "sekat",
            "dalam",
            "jangan",
            "abaikan"
          ]
        },
        {
          "id": "K5B4E-V1-3",
          "judul": "Cara Asep",
          "ketukan": [
            "Ukur sisi luar satu-satu.",
            "Tulis panjangnya.",
            "Jumlahkan.",
            "Itu keliling.",
            "METODE LUAR. Hanya Batas Luar: Keliling bangun gabungan hanya menjumlah sisi terluar; sekat dalam diabaikan."
          ],
          "papan": [
            "ukur luar",
            "tulis",
            "jumlah",
            "K",
            "METODE LUAR · Hanya Batas Luar"
          ]
        }
      ]
    },
    {
      "id": "K5B4E-V2",
      "judul": "Strategi Bungkus",
      "subjudul": "Komang",
      "adegan": [
        {
          "id": "K5B4E-V2-1",
          "judul": "Bungkus",
          "ketukan": [
            "Bayangkan persegi panjang besar.",
            "Meliputi seluruh denah.",
            "Samakan ukuran sisi.",
            "Temukan sisi yang hilang."
          ],
          "papan": [
            "bungkus",
            "PP besar",
            "samakan",
            "cari sisi"
          ]
        },
        {
          "id": "K5B4E-V2-2",
          "judul": "Contoh 12 dan 6",
          "ketukan": [
            "Jika luar dua belas kali enam.",
            "Keliling dua kali dua belas plus enam.",
            "Tiga puluh enam.",
            "Cepat."
          ],
          "papan": [
            "12×6",
            "2(12+6)",
            "36",
            "cepat"
          ]
        },
        {
          "id": "K5B4E-V2-3",
          "judul": "Selisih",
          "ketukan": [
            "Sisi belum diketahui.",
            "Pakai selisih panjang.",
            "Atau kesamaan denah.",
            "Lengkapi dulu.",
            "METODE LUAR. Strategi Bungkus Persegi Panjang: Bayangkan persegi panjang besar yang membungkus denah, lalu hitung kelilingnya."
          ],
          "papan": [
            "?",
            "selisih",
            "sama",
            "lengkapi",
            "METODE LUAR · Strategi Bungkus Persegi Panjang"
          ]
        }
      ]
    },
    {
      "id": "K5B4E-V3",
      "judul": "Cek & Tutup",
      "subjudul": "Bab 4",
      "adegan": [
        {
          "id": "K5B4E-V3-1",
          "judul": "Cek luar",
          "ketukan": [
            "Pastikan hanya sisi luar.",
            "Tidak ada sekat dalam.",
            "Satuan sama.",
            "Hasil masuk akal."
          ],
          "papan": [
            "hanya luar",
            "tanpa dalam",
            "satuan",
            "cek"
          ]
        },
        {
          "id": "K5B4E-V3-2",
          "judul": "Latihan",
          "ketukan": [
            "PP delapan kali empat.",
            "Keliling dua puluh empat.",
            "Persegi empat.",
            "Enam belas."
          ],
          "papan": [
            "8×4→24",
            "sisi4→16",
            "latihan",
            "ok"
          ]
        },
        {
          "id": "K5B4E-V3-3",
          "judul": "Bab 4 siap",
          "ketukan": [
            "Konsep, segitiga, segi empat.",
            "Segi banyak, gabungan.",
            "Materi keliling lengkap.",
            "Hebat!",
            "METODE LUAR. Lengkapi Sisi Hilang: Cari sisi belum diketahui dengan selisih atau kesamaan ukuran sebelum menjumlah."
          ],
          "papan": [
            "A–E",
            "lengkap",
            "keliling",
            "hebat",
            "METODE LUAR · Lengkapi Sisi Hilang"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Lihat denah",
      "stepDesc": "Gabungan apa?",
      "icon": "🏠",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Tandai luar",
      "stepDesc": "Bukan sekat dalam",
      "icon": "⭕",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Lengkapi sisi",
      "stepDesc": "Selisih/kesamaan",
      "icon": "🔍",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Jumlah luar",
      "stepDesc": "atau bungkus PP",
      "icon": "➕",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Hasil K",
      "stepDesc": "Keliling gabungan",
      "icon": "📏",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek",
      "stepDesc": "Hanya luar?",
      "icon": "✅",
      "flowFrom": "5",
      "flowTo": "7"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. METODE LUAR · Hanya Batas Luar",
      "stepDesc": "Keliling bangun gabungan hanya menjumlah sisi terluar; sekat dalam diabaikan.",
      "icon": "🌍",
      "flowFrom": "6",
      "flowTo": "8"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. METODE LUAR · Strategi Bungkus Persegi Panjang",
      "stepDesc": "Bayangkan persegi panjang besar yang membungkus denah, lalu hitung kelilingnya.",
      "icon": "🌍",
      "flowFrom": "7",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "Aturan",
      "emoji": "⭕",
      "countNum": 1,
      "countWord": "batas luar",
      "suara": "Inti."
    },
    {
      "judul": "Abaikan",
      "emoji": "🚫",
      "countNum": 1,
      "countWord": "sekat dalam",
      "suara": "Bukan luar."
    },
    {
      "judul": "Cara 1",
      "emoji": "📏",
      "countNum": 1,
      "countWord": "jumlah sisi luar",
      "suara": "Asep."
    },
    {
      "judul": "Cara 2",
      "emoji": "📦",
      "countNum": 1,
      "countWord": "bungkus PP",
      "suara": "Komang."
    },
    {
      "judul": "12×6",
      "emoji": "🔢",
      "countNum": 36,
      "countWord": "36",
      "suara": "2(12+6)."
    },
    {
      "judul": "8×4",
      "emoji": "▭",
      "countNum": 24,
      "countWord": "24",
      "suara": "Contoh."
    },
    {
      "judul": "Persegi 4",
      "emoji": "⬜",
      "countNum": 16,
      "countWord": "16",
      "suara": "Contoh."
    },
    {
      "judul": "Denah",
      "emoji": "🏠",
      "countNum": 1,
      "countWord": "gabungan",
      "suara": "Konteks."
    },
    {
      "judul": "Sisi ?",
      "emoji": "🔍",
      "countNum": 1,
      "countWord": "selisih/sama",
      "suara": "Lengkapi."
    },
    {
      "judul": "Bab 4",
      "emoji": "🎉",
      "countNum": 1,
      "countWord": "A–E siap",
      "suara": "Materi."
    },
    {
      "judul": "Hanya Batas Luar",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "METODE LUAR · Outer Path Only",
      "suara": "METODE LUAR. Hanya Batas Luar. Keliling bangun gabungan hanya menjumlah sisi terluar; sekat dalam diabaikan."
    },
    {
      "judul": "Strategi Bungkus Persegi Panjang",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "METODE LUAR · Bounding Rectangle",
      "suara": "METODE LUAR. Strategi Bungkus Persegi Panjang. Bayangkan persegi panjang besar yang membungkus denah, lalu hitung kelilingnya."
    },
    {
      "judul": "Lengkapi Sisi Hilang",
      "emoji": "🌍",
      "countNum": 3,
      "countWord": "METODE LUAR · Missing Length",
      "suara": "METODE LUAR. Lengkapi Sisi Hilang. Cari sisi belum diketahui dengan selisih atau kesamaan ukuran sebelum menjumlah."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-e-c",
      "title": "Hitung Gabungan",
      "bookReference": "hlm. 125–130",
      "objective": "Latihan topik. (METODE LUAR · Hanya Batas Luar)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Hanya Batas Luar. Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-e-c",
      "title": "Arti Batas Luar",
      "bookReference": "hlm. 125–130",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-e-c",
      "title": "Pilih Aturan",
      "bookReference": "hlm. 125–130",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-e-c",
      "title": "Pilah Luar/Dalam",
      "bookReference": "hlm. 125–130",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-e-c",
      "title": "Jodohkan Gabungan",
      "bookReference": "hlm. 125–130",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-e-c",
      "title": "Memori Gabungan",
      "bookReference": "hlm. 125–130",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-e-c",
      "title": "Ketuk Hasil",
      "bookReference": "hlm. 125–130",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-e-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 125–130",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-e-c",
      "title": "Cerita Denah",
      "bookReference": "hlm. 125–130",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-e-c",
      "title": "Urutkan Hasil",
      "bookReference": "hlm. 125–130",
      "objective": "Latihan topik.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Mainkan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-e-p",
      "title": "Diagram Hitung Gabungan",
      "bookReference": "hlm. 125–130",
      "objective": "Baca diagram. (METODE LUAR · Hanya Batas Luar)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Hanya Batas Luar. Pilih.",
      "diagramType": "hitung",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "rumus-e-p",
      "title": "Diagram Arti Batas Luar",
      "bookReference": "hlm. 125–130",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "rumus",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "arti-e-p",
      "title": "Diagram Pilih Aturan",
      "bookReference": "hlm. 125–130",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "arti",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sortir-e-p",
      "title": "Diagram Pilah Luar/Dalam",
      "bookReference": "hlm. 125–130",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "sortir",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-e-p",
      "title": "Diagram Jodohkan Gabungan",
      "bookReference": "hlm. 125–130",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "jodoh",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memori-e-p",
      "title": "Diagram Memori Gabungan",
      "bookReference": "hlm. 125–130",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "memori",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-e-p",
      "title": "Diagram Ketuk Hasil",
      "bookReference": "hlm. 125–130",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "ketuk",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "semua-e-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 125–130",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "semua",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "cerita-e-p",
      "title": "Diagram Cerita Denah",
      "bookReference": "hlm. 125–130",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "cerita",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "urut-e-p",
      "title": "Diagram Urutkan Hasil",
      "bookReference": "hlm. 125–130",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "urut",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-e-a",
      "title": "Tulis Hitung Gabungan",
      "bookReference": "hlm. 125–130",
      "objective": "Notasi. (METODE LUAR · Hanya Batas Luar)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Hanya Batas Luar. Pilih.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-e-a",
      "title": "Tulis Arti Batas Luar",
      "bookReference": "hlm. 125–130",
      "objective": "Notasi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-e-a",
      "title": "Tulis Pilih Aturan",
      "bookReference": "hlm. 125–130",
      "objective": "Notasi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-e-a",
      "title": "Tulis Pilah Luar/Dalam",
      "bookReference": "hlm. 125–130",
      "objective": "Notasi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-e-a",
      "title": "Tulis Jodohkan Gabungan",
      "bookReference": "hlm. 125–130",
      "objective": "Notasi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-e-a",
      "title": "Tulis Memori Gabungan",
      "bookReference": "hlm. 125–130",
      "objective": "Notasi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-e",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 125–130",
      "objective": "Menilai.",
      "mechanicDescription": "Dua ronde.",
      "voiceGuide": "Benar/salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-e",
      "title": "Detektif Keliling",
      "bookReference": "hlm. 125–130",
      "objective": "Petunjuk.",
      "mechanicDescription": "Tiga soal.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "peta-e",
      "title": "Peta Konsep",
      "bookReference": "hlm. 125–130",
      "objective": "Peta.",
      "mechanicDescription": "Satu peta.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "cerita-q-e",
      "title": "Cerita Angka",
      "bookReference": "hlm. 125–130",
      "objective": "Cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "⭕",
      "nama": "Batas luar",
      "isi": "Hanya sisi terluar yang dijumlah.",
      "suara": "Itu keliling gabungan."
    },
    {
      "ikon": "🚫",
      "nama": "Sekat dalam",
      "isi": "Tidak dihitung ke keliling luar.",
      "suara": "Abaikan."
    },
    {
      "ikon": "📦",
      "nama": "Bungkus",
      "isi": "Boleh bungkus PP besar lalu hitung.",
      "suara": "Strategi Komang."
    },
    {
      "ikon": "🔍",
      "nama": "Sisi hilang",
      "isi": "Cari dengan selisih atau kesamaan ukuran.",
      "suara": "Lengkapi dulu."
    },
    {
      "ikon": "🌍",
      "nama": "Hanya Batas Luar",
      "isi": "METODE LUAR · Outer Path Only: Keliling bangun gabungan hanya menjumlah sisi terluar; sekat dalam diabaikan. (asal: Composite figure pedagogy).",
      "suara": "METODE LUAR. Hanya Batas Luar. Keliling bangun gabungan hanya menjumlah sisi terluar; sekat dalam diabaikan."
    },
    {
      "ikon": "🌍",
      "nama": "Strategi Bungkus Persegi Panjang",
      "isi": "METODE LUAR · Bounding Rectangle: Bayangkan persegi panjang besar yang membungkus denah, lalu hitung kelilingnya. (asal: Problem-solving strategy).",
      "suara": "METODE LUAR. Strategi Bungkus Persegi Panjang. Bayangkan persegi panjang besar yang membungkus denah, lalu hitung kelilingnya."
    },
    {
      "ikon": "🌍",
      "nama": "Lengkapi Sisi Hilang",
      "isi": "METODE LUAR · Missing Length: Cari sisi belum diketahui dengan selisih atau kesamaan ukuran sebelum menjumlah. (asal: Van de Walle).",
      "suara": "METODE LUAR. Lengkapi Sisi Hilang. Cari sisi belum diketahui dengan selisih atau kesamaan ukuran sebelum menjumlah."
    }
  ],
  "poinSuara": "Ingat: hanya batas luar, abaikan sekat dalam, boleh bungkus PP.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Tandai luar",
        "warna": "#FDE68A"
      },
      {
        "teks": "lengkapi sisi",
        "warna": "#BBF7D0"
      },
      {
        "teks": "jumlahkan/bungkus",
        "warna": "#BFDBFE"
      },
      {
        "teks": "cek",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: gambar denah sederhana dua persegi panjang berhimpit, hitung keliling luarnya.",
  "refleksi": [
    "Mengapa sekat dalam tidak dihitung?",
    "Apa strategi bungkus?",
    "Berapa 2(12+6)?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Outer Path Only",
      "namaId": "Hanya Batas Luar",
      "asal": "Composite figure pedagogy",
      "ringkas": "Keliling bangun gabungan hanya menjumlah sisi terluar; sekat dalam diabaikan.",
      "tahap": [
        "Story",
        "Mind",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Bounding Rectangle",
      "namaId": "Strategi Bungkus Persegi Panjang",
      "asal": "Problem-solving strategy",
      "ringkas": "Bayangkan persegi panjang besar yang membungkus denah, lalu hitung kelilingnya.",
      "tahap": [
        "Story",
        "Picture",
        "Concrete"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Missing Length",
      "namaId": "Lengkapi Sisi Hilang",
      "asal": "Van de Walle",
      "ringkas": "Cari sisi belum diketahui dengan selisih atau kesamaan ukuran sebelum menjumlah.",
      "tahap": [
        "Infografis",
        "Picture",
        "Abstract"
      ]
    }
  ]
};

export const SUB_BAB_K5B4: SubBabNaskah[] = [SUB_A54, SUB_B54, SUB_C54, SUB_D54, SUB_E54];
export const semuaAdeganK5B4 = SUB_BAB_K5B4.flatMap((s) => s.videos.flatMap((v) => v.adegan));
