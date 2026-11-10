import type { SubBabNaskah } from "./naskah-k2b2";

export const K4B2_META = {
  "chapterId": "k4-mat-bab2",
  "phaseCode": "FASE_B",
  "grade": 4,
  "subjectLabel": "MATEMATIKA - KELAS 4 SD",
  "title": "BAB 2: PECAHAN",
  "silabusElemen": "🌈 Fase B • Elemen Bilangan: Pecahan (Pembilang Satu, Penyebut Sama, Senilai, Desimal Persepuluhan–Perseratusan, dan Persen) (Kelas 4 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A42: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Pecahan Pembilang Satu)",
  "fullTitle": "Sub-Bab A: Pecahan dengan Pembilang Satu",
  "targetDescription": "Siswa menyatakan pecahan dengan pembilang satu (1/n) dari daerah arsir, membandingkan dan mengurutkan pecahan unit (1/2 > 1/4, 1/10 < 1/5), serta menyelesaikan cerita pizza dan perbandingan berat Tiara.",
  "secondaryBg": "#FEF3C7",
  "secondaryBorder": "#D97706",
  "secondaryText": "#78350F",
  "silabus": {
    "teksSuara": "Kita belajar pecahan dengan pembilang satu. Pizza dipotong empat sama besar, tiap anak mendapat seperempat. Makin besar penyebut, makin kecil pecahan unit. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa membandingkan dan mengurutkan pecahan dengan pembilang satu.",
    "referensi": "Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 2 Sub-Bab A)."
  },
  "videos": [
    {
      "id": "K4B2A-V1",
      "judul": "Pizza Ibu Guru",
      "subjudul": "1 dari 4 bagian",
      "adegan": [
        {
          "id": "K4B2A-V1-1",
          "judul": "Potong pizza",
          "ketukan": [
            "Ibu Guru membawa sebuah pizza.",
            "Pizza dipotong menjadi 4 bagian sama besar.",
            "Empat siswa mendapat nilai tertinggi.",
            "Berapa bagian tiap siswa?"
          ],
          "papan": [
            "pizza",
            "4 potong",
            "4 siswa",
            "berapa?"
          ]
        },
        {
          "id": "K4B2A-V1-2",
          "judul": "Seperempat",
          "ketukan": [
            "Tiap anak mendapat 1 dari 4 bagian.",
            "Ditulis pecahan satu per empat.",
            "Pembilang 1, penyebut 4.",
            "Itulah pecahan pembilang satu."
          ],
          "papan": [
            "1 dari 4",
            "1/4",
            "pembilang 1",
            "penyebut 4"
          ]
        },
        {
          "id": "K4B2A-V1-3",
          "judul": "Baca gambar",
          "ketukan": [
            "Lihat daerah yang diarsir.",
            "Hitung seluruh bagian sama besar.",
            "Hitung bagian yang diarsir.",
            "Tulis sebagai pecahan.",
            "METODE LUAR. Pecahan Satuan: Pembilang 1 berarti satu bagian dari penyebut bagian sama."
          ],
          "papan": [
            "arsir",
            "seluruh",
            "diarsir",
            "pecahan",
            "METODE LUAR · Pecahan Satuan"
          ]
        }
      ]
    },
    {
      "id": "K4B2A-V2",
      "judul": "1/2 Lebih dari 1/4",
      "subjudul": "Membandingkan unit",
      "adegan": [
        {
          "id": "K4B2A-V2-1",
          "judul": "Dua gambar",
          "ketukan": [
            "Lihat dua daerah arsir.",
            "Satu menunjukkan setengah.",
            "Satu menunjukkan seperempat.",
            "Mana yang lebih besar?"
          ],
          "papan": [
            "dua gambar",
            "1/2",
            "1/4",
            "mana?"
          ]
        },
        {
          "id": "K4B2A-V2-2",
          "judul": "Kesimpulan",
          "ketukan": [
            "Daerah arsir 1/2 lebih besar.",
            "Jadi 1/2 lebih dari 1/4.",
            "Ditulis 1/2 > 1/4.",
            "Penyebut kecil membuat pecahan unit besar."
          ],
          "papan": [
            "1/2 besar",
            ">",
            "1/2 > 1/4",
            "aturan"
          ]
        },
        {
          "id": "K4B2A-V2-3",
          "judul": "1/10 dan 1/5",
          "ketukan": [
            "Sekarang 1/10 dan 1/5.",
            "Daerah 1/10 lebih kecil.",
            "Jadi 1/10 kurang dari 1/5.",
            "Ditulis 1/10 < 1/5.",
            "METODE LUAR. Model Daerah: Arsir satu bagian dari keseluruhan."
          ],
          "papan": [
            "1/10",
            "1/5",
            "<",
            "1/10 < 1/5",
            "METODE LUAR · Model Daerah"
          ]
        }
      ]
    },
    {
      "id": "K4B2A-V3",
      "judul": "Cerita Tiara",
      "subjudul": "Bawang dan gula",
      "adegan": [
        {
          "id": "K4B2A-V3-1",
          "judul": "Dua bahan",
          "ketukan": [
            "Tiara punya bawang putih 1/2 kg.",
            "Gula pasirnya 1/4 kg.",
            "Mana yang lebih berat?",
            "Bandingkan pecahannya."
          ],
          "papan": [
            "bawang 1/2",
            "gula 1/4",
            "mana?",
            "banding"
          ]
        },
        {
          "id": "K4B2A-V3-2",
          "judul": "Jawaban",
          "ketukan": [
            "1/2 lebih dari 1/4.",
            "Bawang lebih berat.",
            "Pecahan unit membantu cerita.",
            "Ayo berlatih lagi."
          ],
          "papan": [
            "1/2 > 1/4",
            "bawang",
            "cerita",
            "latihan"
          ]
        },
        {
          "id": "K4B2A-V3-3",
          "judul": "Ingat aturan",
          "ketukan": [
            "Pembilang tetap satu.",
            "Penyebut menyatakan banyak bagian.",
            "Semakin banyak bagian, tiap bagian semakin kecil.",
            "Siap lanjut penyebut sama.",
            "METODE LUAR. Pecahan di Garis: 1/n terletak antara 0 dan 1."
          ],
          "papan": [
            "pembilang 1",
            "penyebut",
            "bagian kecil",
            "siap B",
            "METODE LUAR · Pecahan di Garis"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Bagian sama",
      "stepDesc": "Benda utuh dibagi n sama besar.",
      "icon": "🍕",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. 1/n",
      "stepDesc": "Ambil 1 bagian → pecahan unit.",
      "icon": "1️⃣",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Pembilang",
      "stepDesc": "Angka atas: banyak bagian diambil.",
      "icon": "⬆️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Penyebut",
      "stepDesc": "Angka bawah: banyak bagian seluruh.",
      "icon": "⬇️",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Banding unit",
      "stepDesc": "Penyebut besar → nilai kecil.",
      "icon": "⚖️",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. 1/2 > 1/4",
      "stepDesc": "Contoh buku.",
      "icon": "✅",
      "flowFrom": "5",
      "flowTo": "7"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Cerita",
      "stepDesc": "Pizza dan Tiara.",
      "icon": "📖",
      "flowFrom": "6",
      "flowTo": "8"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Siap B",
      "stepDesc": "Lanjut penyebut sama.",
      "icon": "➡️",
      "flowFrom": "7",
      "flowTo": "9"
    },
    {
      "stepNumber": 9,
      "stepTitle": "9. METODE LUAR · Pecahan Satuan",
      "stepDesc": "Pembilang 1 berarti satu bagian dari penyebut bagian sama.",
      "icon": "🌍",
      "flowFrom": "8",
      "flowTo": "10"
    },
    {
      "stepNumber": 10,
      "stepTitle": "10. METODE LUAR · Model Daerah",
      "stepDesc": "Arsir satu bagian dari keseluruhan.",
      "icon": "🌍",
      "flowFrom": "9",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "1/n",
      "emoji": "🍕",
      "countNum": 1,
      "countWord": "unit",
      "suara": "Pecahan pembilang satu."
    },
    {
      "judul": "1/4",
      "emoji": "🍕",
      "countNum": 4,
      "countWord": "pizza",
      "suara": "Pizza 4 potong."
    },
    {
      "judul": "PEMBILANG",
      "emoji": "⬆️",
      "countNum": 1,
      "countWord": "atas",
      "suara": "Bagian diambil."
    },
    {
      "judul": "PENYEBUT",
      "emoji": "⬇️",
      "countNum": 4,
      "countWord": "bawah",
      "suara": "Bagian seluruh."
    },
    {
      "judul": "1/2 > 1/4",
      "emoji": "⚖️",
      "countNum": 2,
      "countWord": "banding",
      "suara": "Setengah lebih besar."
    },
    {
      "judul": "1/10 < 1/5",
      "emoji": "📉",
      "countNum": 10,
      "countWord": "kecil",
      "suara": "Penyebut besar."
    },
    {
      "judul": "ARSIR",
      "emoji": "🖍️",
      "countNum": 1,
      "countWord": "gambar",
      "suara": "Baca daerah arsir."
    },
    {
      "judul": "ATURAN",
      "emoji": "📜",
      "countNum": 1,
      "countWord": "unit",
      "suara": "n besar → 1/n kecil."
    },
    {
      "judul": "CERITA",
      "emoji": "📖",
      "countNum": 2,
      "countWord": "Tiara",
      "suara": "Bawang 1/2 kg."
    },
    {
      "judul": "SIAP B",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "lanjut",
      "suara": "Penyebut sama."
    },
    {
      "judul": "Pecahan Satuan",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "METODE LUAR · Unit Fraction",
      "suara": "METODE LUAR. Pecahan Satuan. Pembilang 1 berarti satu bagian dari penyebut bagian sama."
    },
    {
      "judul": "Model Daerah",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "METODE LUAR · Area Model",
      "suara": "METODE LUAR. Model Daerah. Arsir satu bagian dari keseluruhan."
    },
    {
      "judul": "Pecahan di Garis",
      "emoji": "🌍",
      "countNum": 3,
      "countWord": "METODE LUAR · Number Line Unit",
      "suara": "METODE LUAR. Pecahan di Garis. 1/n terletak antara 0 dan 1."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "pizza-bagi",
      "title": "Potong Pizza Sama Besar",
      "bookReference": "hlm. 58–59 (pizza 1/4)",
      "objective": "Mengenal 1 dari n bagian. (METODE LUAR · Pecahan Satuan)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Pecahan Satuan. Pilih pecahan.",
      "emoji": "🍕",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "baca-arsir",
      "title": "Baca Daerah Arsir",
      "bookReference": "hlm. 59–60",
      "objective": "Menulis pecahan dari gambar.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih 1/n.",
      "emoji": "🖍️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "banding-unit",
      "title": "Bandingkan Unit Fraction",
      "bookReference": "hlm. 60–61 (1/2 vs 1/4)",
      "objective": "Membandingkan pecahan pembilang satu.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih yang lebih besar.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-unit",
      "title": "Pilah: Lebih Besar/Kecil dari Acuan",
      "bookReference": "hlm. 61–62",
      "objective": "Memilah menurut nilai.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-unit",
      "title": "Jodohkan Gambar dan 1/n",
      "bookReference": "hlm. 59–60",
      "objective": "Menjodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "memory-unit",
      "title": "Memori Pecahan Unit",
      "bookReference": "hlm. 59–61",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-unit",
      "title": "Ketuk Pecahan yang Diminta",
      "bookReference": "hlm. 60–62",
      "objective": "Mengetuk.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk.",
      "emoji": "👆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-unit",
      "title": "Ketuk Semua Lebih Besar/Kecil",
      "bookReference": "hlm. 61",
      "objective": "Ketuk semua sesuai syarat.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-unit",
      "title": "Cerita Pizza dan Tiara",
      "bookReference": "hlm. 58 & 63",
      "objective": "Soal cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih jawaban.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-unit",
      "title": "Urutkan Pecahan Unit",
      "bookReference": "hlm. 61–62",
      "objective": "Mengurutkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "circle-read",
      "title": "Baca Lingkaran Arsir",
      "bookReference": "hlm. 59–60",
      "objective": "Membaca diagram lingkaran. (METODE LUAR · Pecahan Satuan)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Pecahan Satuan. Pilih pecahan.",
      "diagramType": "circle",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "bar-compare",
      "title": "Banding Batang Unit",
      "bookReference": "hlm. 60–61",
      "objective": "Membandingkan batang.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih relasi.",
      "diagramType": "bar",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram",
      "title": "Jodohkan Diagram Unit",
      "bookReference": "hlm. 59–61",
      "objective": "Jodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram",
      "title": "Memori Diagram Unit",
      "bookReference": "hlm. 60",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-unit",
      "title": "Tabel Gambar → Pecahan",
      "bookReference": "hlm. 59–60",
      "objective": "Isi tabel.",
      "mechanicDescription": "Tiga tabel.",
      "voiceGuide": "Pilih teks.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-diagram",
      "title": "Ketuk Semua Syarat Diagram",
      "bookReference": "hlm. 61",
      "objective": "Ketuk semua.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram",
      "title": "Pilah Diagram Unit",
      "bookReference": "hlm. 61–62",
      "objective": "Pilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "denom-effect",
      "title": "Pengaruh Penyebut",
      "bookReference": "hlm. 61",
      "objective": "Penyebut besar → nilai kecil.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "denom",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "shade-choose",
      "title": "Pilih Gambar yang Cocok",
      "bookReference": "hlm. 59–60",
      "objective": "Pilih diagram benar.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "shade",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture",
      "title": "Cerita dengan Diagram",
      "bookReference": "hlm. 58–63",
      "objective": "Cerita + gambar.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-unit",
      "title": "Tulis 1/n",
      "bookReference": "hlm. 59",
      "objective": "Menulis notasi. (METODE LUAR · Pecahan Satuan)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Pecahan Satuan. Pilih notasi.",
      "symbolLarge": "1/4",
      "wordLarge": "UNIT",
      "mathNotation": "1/n"
    },
    {
      "stage": "Abstract",
      "gameType": "compare-sign",
      "title": "Isi > atau <",
      "bookReference": "hlm. 62",
      "objective": "Mengisi tanda.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih tanda.",
      "symbolLarge": ">",
      "wordLarge": "BANDING",
      "mathNotation": "1/a ? 1/b"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-unit",
      "title": "Pilih Pecahan Unit",
      "bookReference": "hlm. 59–62",
      "objective": "Memilih.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "1/2",
      "wordLarge": "PILIH",
      "mathNotation": "1/n"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract",
      "title": "Urutkan Notasi Unit",
      "bookReference": "hlm. 61–62",
      "objective": "Mengurutkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "symbolLarge": "1/2>1/4",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract",
      "title": "Jodohkan Teks Unit",
      "bookReference": "hlm. 59–61",
      "objective": "Jodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "symbolLarge": "1/5",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract",
      "title": "Memori Notasi Unit",
      "bookReference": "hlm. 60",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "symbolLarge": "1/8",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-a",
      "title": "Benar atau Salah: Unit",
      "bookReference": "hlm. 57–62",
      "objective": "Menilai.",
      "mechanicDescription": "Dua ronde.",
      "voiceGuide": "Benar/salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-a",
      "title": "Detektif Pembilang Satu",
      "bookReference": "hlm. 58–63",
      "objective": "Petunjuk → pecahan.",
      "mechanicDescription": "Empat soal.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-a",
      "title": "Peta Konsep Unit",
      "bookReference": "hlm. 57–61",
      "objective": "Mengisi kotak.",
      "mechanicDescription": "Satu peta.",
      "voiceGuide": "Pilih opsi.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract",
      "title": "Cerita Angka Unit",
      "bookReference": "hlm. 58–63",
      "objective": "Soal cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "🍕",
      "nama": "Unit",
      "isi": "Pecahan pembilang satu berbentuk 1/n.",
      "suara": "Pembilang satu berarti satu bagian."
    },
    {
      "ikon": "➗",
      "nama": "Arsir",
      "isi": "Baca pecahan dari daerah yang diarsir.",
      "suara": "Hitung bagian diarsir per seluruh."
    },
    {
      "ikon": "⚖️",
      "nama": "Banding",
      "isi": "Pada 1/n, penyebut besar membuat nilai kecil.",
      "suara": "1/2 lebih dari 1/4."
    },
    {
      "ikon": "🔍",
      "nama": "Cerita",
      "isi": "Pakai pecahan untuk membandingkan ukuran.",
      "suara": "Bawang 1/2 lebih berat dari gula 1/4."
    },
    {
      "ikon": "🌍",
      "nama": "Pecahan Satuan",
      "isi": "METODE LUAR · Unit Fraction: Pembilang 1 berarti satu bagian dari penyebut bagian sama. (asal: Van de Walle).",
      "suara": "METODE LUAR. Pecahan Satuan. Pembilang 1 berarti satu bagian dari penyebut bagian sama."
    },
    {
      "ikon": "🌍",
      "nama": "Model Daerah",
      "isi": "METODE LUAR · Area Model: Arsir satu bagian dari keseluruhan. (asal: Fraction area model).",
      "suara": "METODE LUAR. Model Daerah. Arsir satu bagian dari keseluruhan."
    },
    {
      "ikon": "🌍",
      "nama": "Pecahan di Garis",
      "isi": "METODE LUAR · Number Line Unit: 1/n terletak antara 0 dan 1. (asal: Number line fractions).",
      "suara": "METODE LUAR. Pecahan di Garis. 1/n terletak antara 0 dan 1."
    }
  ],
  "poinSuara": "Empat poin pecahan pembilang satu.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Unit",
        "warna": "#FDE68A"
      },
      {
        "teks": "Arsir",
        "warna": "#BBF7D0"
      },
      {
        "teks": "Banding",
        "warna": "#BFDBFE"
      },
      {
        "teks": "Cerita",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Berlatih: isi tanda > atau < untuk 1/8 … 1/5.",
  "refleksi": [
    "Aku menulis 1/n.",
    "Aku membaca arsir.",
    "Aku membandingkan unit.",
    "Aku menyelesaikan cerita."
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Unit Fraction",
      "namaId": "Pecahan Satuan",
      "asal": "Van de Walle",
      "ringkas": "Pembilang 1 berarti satu bagian dari penyebut bagian sama.",
      "tahap": [
        "Story",
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Area Model",
      "namaId": "Model Daerah",
      "asal": "Fraction area model",
      "ringkas": "Arsir satu bagian dari keseluruhan.",
      "tahap": [
        "Infografis",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Number Line Unit",
      "namaId": "Pecahan di Garis",
      "asal": "Number line fractions",
      "ringkas": "1/n terletak antara 0 dan 1.",
      "tahap": [
        "Mind",
        "Abstract"
      ]
    }
  ]
};

export const SUB_B42: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Penyebut Sama)",
  "fullTitle": "Sub-Bab B: Pecahan dengan Penyebut Sama",
  "targetDescription": "Siswa membandingkan dan mengurutkan pecahan berpenyebut sama dengan melihat pembilang (1/3 < 2/3, 2/10 > 1/10), serta menyelesaikan cerita tongkat Asep 3/6 dan Azizah 2/6.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Kita belajar pecahan dengan penyebut sama. Jika penyebut sama, bandingkan pembilangnya. Satu per tiga kurang dari dua per tiga. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa membandingkan dan mengurutkan pecahan dengan penyebut sama.",
    "referensi": "Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 2 Sub-Bab B)."
  },
  "videos": [
    {
      "id": "K4B2B-V1",
      "judul": "1/3 dan 2/3",
      "subjudul": "Penyebut sama",
      "adegan": [
        {
          "id": "K4B2B-V1-1",
          "judul": "Dua arsir",
          "ketukan": [
            "Lihat dua daerah arsir.",
            "Keduanya dibagi tiga sama besar.",
            "Satu mengarsir 1 bagian.",
            "Satu mengarsir 2 bagian."
          ],
          "papan": [
            "bagi 3",
            "1 bagian",
            "2 bagian",
            "banding"
          ]
        },
        {
          "id": "K4B2B-V1-2",
          "judul": "Kesimpulan",
          "ketukan": [
            "Daerah 1/3 lebih kecil.",
            "Jadi 1/3 kurang dari 2/3.",
            "Ditulis 1/3 < 2/3.",
            "Pembilang yang menentukan."
          ],
          "papan": [
            "1/3 kecil",
            "<",
            "1/3 < 2/3",
            "pembilang"
          ]
        },
        {
          "id": "K4B2B-V1-3",
          "judul": "2/10 dan 1/10",
          "ketukan": [
            "Sekarang penyebut 10.",
            "2 bagian dibanding 1 bagian.",
            "2/10 lebih dari 1/10.",
            "Aturan sama: lihat pembilang.",
            "METODE LUAR. Penyebut Sama: Banding/jumlah lebih mudah jika penyebut sama."
          ],
          "papan": [
            "penyebut 10",
            "2 vs 1",
            ">",
            "aturan",
            "METODE LUAR · Penyebut Sama"
          ]
        }
      ]
    },
    {
      "id": "K4B2B-V2",
      "judul": "Tongkat Asep",
      "subjudul": "3/6 vs 2/6",
      "adegan": [
        {
          "id": "K4B2B-V2-1",
          "judul": "Dua tongkat",
          "ketukan": [
            "Asep punya tongkat 3/6 meter.",
            "Azizah punya 2/6 meter.",
            "Penyebut sama: per enam.",
            "Siapa lebih panjang?"
          ],
          "papan": [
            "3/6",
            "2/6",
            "sama penyebut",
            "siapa?"
          ]
        },
        {
          "id": "K4B2B-V2-2",
          "judul": "Jawaban",
          "ketukan": [
            "3 lebih besar dari 2.",
            "Tongkat Asep lebih panjang.",
            "3/6 > 2/6.",
            "Cerita memakai aturan yang sama."
          ],
          "papan": [
            "3 > 2",
            "Asep",
            ">",
            "cerita"
          ]
        },
        {
          "id": "K4B2B-V2-3",
          "judul": "Latihan tanda",
          "ketukan": [
            "Isi titik-titik dengan > atau <.",
            "Pastikan penyebut sama dulu.",
            "Lalu bandingkan pembilang.",
            "Ayo kerjakan dengan teliti.",
            "METODE LUAR. Banding Pembilang: Penyebut sama: pembilang lebih besar = pecahan lebih besar."
          ],
          "papan": [
            "> atau <",
            "cek penyebut",
            "cek pembilang",
            "teliti",
            "METODE LUAR · Banding Pembilang"
          ]
        }
      ]
    },
    {
      "id": "K4B2B-V3",
      "judul": "Urutan p/q",
      "subjudul": "Dari kecil ke besar",
      "adegan": [
        {
          "id": "K4B2B-V3-1",
          "judul": "Satu keluarga",
          "ketukan": [
            "Kumpulkan pecahan berpenyebut sama.",
            "Misal penyebut 5.",
            "1/5, 2/5, 3/5, 4/5.",
            "Urutkan dari kecil."
          ],
          "papan": [
            "penyebut 5",
            "1/5…4/5",
            "urut",
            "kecil→besar"
          ]
        },
        {
          "id": "K4B2B-V3-2",
          "judul": "Cara cepat",
          "ketukan": [
            "Cukup urutkan pembilangnya.",
            "1, lalu 2, lalu 3, lalu 4.",
            "Nilai pecahan ikut membesar.",
            "Mudah dan cepat."
          ],
          "papan": [
            "urut pembilang",
            "1-2-3-4",
            "nilai naik",
            "cepat"
          ]
        },
        {
          "id": "K4B2B-V3-3",
          "judul": "Siap C",
          "ketukan": [
            "Kadang bentuk berbeda tapi nilai sama.",
            "Itu namanya pecahan senilai.",
            "Contoh 2/6 dan 1/3.",
            "Siap Sub-Bab C.",
            "METODE LUAR. Batang Pecahan: Batang sama panjang memudahkan banding."
          ],
          "papan": [
            "bentuk beda",
            "nilai sama",
            "2/6=1/3",
            "siap C",
            "METODE LUAR · Batang Pecahan"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Penyebut sama",
      "stepDesc": "Ukuran tiap potongan sama.",
      "icon": "🧱",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Lihat pembilang",
      "stepDesc": "Pembilang besar → pecahan besar.",
      "icon": "⬆️",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. 1/3 < 2/3",
      "stepDesc": "Contoh buku.",
      "icon": "✅",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. 2/10 > 1/10",
      "stepDesc": "Contoh kedua.",
      "icon": "✅",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Tanda",
      "stepDesc": "Isi > atau <.",
      "icon": "✏️",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cerita",
      "stepDesc": "Tongkat 3/6 vs 2/6.",
      "icon": "📏",
      "flowFrom": "5",
      "flowTo": "7"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Urut",
      "stepDesc": "Urutkan pembilang.",
      "icon": "📶",
      "flowFrom": "6",
      "flowTo": "8"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Siap C",
      "stepDesc": "Lanjut pecahan senilai.",
      "icon": "➡️",
      "flowFrom": "7",
      "flowTo": "9"
    },
    {
      "stepNumber": 9,
      "stepTitle": "9. METODE LUAR · Penyebut Sama",
      "stepDesc": "Banding/jumlah lebih mudah jika penyebut sama.",
      "icon": "🌍",
      "flowFrom": "8",
      "flowTo": "10"
    },
    {
      "stepNumber": 10,
      "stepTitle": "10. METODE LUAR · Banding Pembilang",
      "stepDesc": "Penyebut sama: pembilang lebih besar = pecahan lebih besar.",
      "icon": "🌍",
      "flowFrom": "9",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "q SAMA",
      "emoji": "🧱",
      "countNum": 3,
      "countWord": "potongan",
      "suara": "Ukuran bagian sama."
    },
    {
      "judul": "LIHAT p",
      "emoji": "⬆️",
      "countNum": 2,
      "countWord": "pembilang",
      "suara": "Banding pembilang."
    },
    {
      "judul": "1/3 < 2/3",
      "emoji": "⚖️",
      "countNum": 3,
      "countWord": "contoh",
      "suara": "Contoh buku."
    },
    {
      "judul": "2/10 > 1/10",
      "emoji": "✅",
      "countNum": 10,
      "countWord": "contoh",
      "suara": "Pembilang 2 > 1."
    },
    {
      "judul": "TANDA",
      "emoji": "✏️",
      "countNum": 1,
      "countWord": "> <",
      "suara": "Isi titik-titik."
    },
    {
      "judul": "ASEP",
      "emoji": "📏",
      "countNum": 6,
      "countWord": "3/6",
      "suara": "Tongkat lebih panjang."
    },
    {
      "judul": "URUT",
      "emoji": "📶",
      "countNum": 5,
      "countWord": "1→4",
      "suara": "Urut pembilang."
    },
    {
      "judul": "ATURAN",
      "emoji": "📜",
      "countNum": 1,
      "countWord": "sama q",
      "suara": "Jangan bandingkan q."
    },
    {
      "judul": "ARSIR",
      "emoji": "🖍️",
      "countNum": 2,
      "countWord": "gambar",
      "suara": "Banyak bagian diarsir."
    },
    {
      "judul": "SIAP C",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "lanjut",
      "suara": "Pecahan senilai."
    },
    {
      "judul": "Penyebut Sama",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "METODE LUAR · Same Denominator",
      "suara": "METODE LUAR. Penyebut Sama. Banding/jumlah lebih mudah jika penyebut sama."
    },
    {
      "judul": "Banding Pembilang",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "METODE LUAR · Compare Numerators",
      "suara": "METODE LUAR. Banding Pembilang. Penyebut sama: pembilang lebih besar = pecahan lebih besar."
    },
    {
      "judul": "Batang Pecahan",
      "emoji": "🌍",
      "countNum": 3,
      "countWord": "METODE LUAR · Fraction Bars",
      "suara": "METODE LUAR. Batang Pecahan. Batang sama panjang memudahkan banding."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "baca-sama",
      "title": "Baca Pecahan Penyebut Sama",
      "bookReference": "hlm. 63–64",
      "objective": "Membaca p/q. (METODE LUAR · Penyebut Sama)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Penyebut Sama. Pilih pecahan.",
      "emoji": "🧱",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "banding-sama",
      "title": "Bandingkan Penyebut Sama",
      "bookReference": "hlm. 63–64 (1/3 vs 2/3)",
      "objective": "Membandingkan pembilang.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih yang lebih besar.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-sama",
      "title": "Pilah menurut Pembilang",
      "bookReference": "hlm. 64–65",
      "objective": "Memilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-sama",
      "title": "Jodohkan Gambar dan p/q",
      "bookReference": "hlm. 63–65",
      "objective": "Menjodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "memory-sama",
      "title": "Memori Penyebut Sama",
      "bookReference": "hlm. 64",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-sama",
      "title": "Ketuk Pecahan Diminta",
      "bookReference": "hlm. 64–65",
      "objective": "Mengetuk.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk.",
      "emoji": "👆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-sama",
      "title": "Ketuk Semua Pembilang ≥",
      "bookReference": "hlm. 65",
      "objective": "Ketuk semua.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-sama",
      "title": "Cerita Tongkat Asep",
      "bookReference": "hlm. 65",
      "objective": "Soal cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sign-sama",
      "title": "Isi Tanda > <",
      "bookReference": "hlm. 64–65",
      "objective": "Mengisi tanda.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih tanda.",
      "emoji": "✏️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-sama",
      "title": "Urutkan Penyebut Sama",
      "bookReference": "hlm. 65",
      "objective": "Mengurutkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "bar-sama",
      "title": "Batang Penyebut Sama",
      "bookReference": "hlm. 63–64",
      "objective": "Membaca batang. (METODE LUAR · Penyebut Sama)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Penyebut Sama. Pilih.",
      "diagramType": "bar",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "circle-sama",
      "title": "Lingkaran Penyebut Sama",
      "bookReference": "hlm. 63",
      "objective": "Membaca lingkaran.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "circle",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-b",
      "title": "Jodohkan Diagram B",
      "bookReference": "hlm. 64",
      "objective": "Jodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "diagramType": "match",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-b",
      "title": "Memori Diagram B",
      "bookReference": "hlm. 64",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "diagramType": "mem",
      "numberA": 2,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-b",
      "title": "Tabel Gambar → Pecahan B",
      "bookReference": "hlm. 64",
      "objective": "Isi tabel.",
      "mechanicDescription": "Tiga tabel.",
      "voiceGuide": "Pilih.",
      "diagramType": "table",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-b",
      "title": "Ketuk Semua Syarat B",
      "bookReference": "hlm. 65",
      "objective": "Ketuk semua.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "diagramType": "select",
      "numberA": 2,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-b",
      "title": "Pilah Diagram B",
      "bookReference": "hlm. 65",
      "objective": "Pilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "diagramType": "sort",
      "numberA": 2,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "rule-b",
      "title": "Aturan Pembilang",
      "bookReference": "hlm. 63",
      "objective": "Pilih aturan benar.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "rule",
      "numberA": 2,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "compare-picture-b",
      "title": "Banding Gambar B",
      "bookReference": "hlm. 63–64",
      "objective": "Pilih relasi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "cmp",
      "numberA": 2,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-b",
      "title": "Cerita Diagram B",
      "bookReference": "hlm. 65",
      "objective": "Cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "story",
      "numberA": 2,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-b",
      "title": "Tulis p/q",
      "bookReference": "hlm. 63–65",
      "objective": "Menulis notasi. (METODE LUAR · Penyebut Sama)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Penyebut Sama. Pilih.",
      "symbolLarge": "2/3",
      "wordLarge": "SAMA",
      "mathNotation": "p/q"
    },
    {
      "stage": "Abstract",
      "gameType": "sign-abstract-b",
      "title": "Tanda > < Angka",
      "bookReference": "hlm. 65",
      "objective": "Mengisi tanda.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "<",
      "wordLarge": "TANDA",
      "mathNotation": "p/q ? r/q"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-b",
      "title": "Pilih Hasil Banding",
      "bookReference": "hlm. 65",
      "objective": "Memilih.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "2/3",
      "wordLarge": "PILIH",
      "mathNotation": "banding"
    },
    {
      "stage": "Abstract",
      "gameType": "order-b",
      "title": "Urutkan Notasi B",
      "bookReference": "hlm. 65",
      "objective": "Mengurutkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "symbolLarge": "1/5<2/5",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-b",
      "title": "Jodohkan Teks B",
      "bookReference": "hlm. 64–65",
      "objective": "Jodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "symbolLarge": "3/6",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-b",
      "title": "Memori Notasi B",
      "bookReference": "hlm. 65",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "symbolLarge": "2/10",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-b",
      "title": "Benar atau Salah: B",
      "bookReference": "hlm. 63–65",
      "objective": "Menilai.",
      "mechanicDescription": "Dua ronde.",
      "voiceGuide": "Benar/salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-b",
      "title": "Detektif Penyebut Sama",
      "bookReference": "hlm. 63–65",
      "objective": "Petunjuk.",
      "mechanicDescription": "Empat soal.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-b",
      "title": "Peta Konsep B",
      "bookReference": "hlm. 63–64",
      "objective": "Mengisi kotak.",
      "mechanicDescription": "Satu peta.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-b",
      "title": "Cerita Angka B",
      "bookReference": "hlm. 65",
      "objective": "Soal cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "🍕",
      "nama": "Sama q",
      "isi": "Penyebut sama artinya potongan sama besar.",
      "suara": "Bandingkan pembilangnya."
    },
    {
      "ikon": "➗",
      "nama": "Pembilang",
      "isi": "Pembilang lebih besar → pecahan lebih besar.",
      "suara": "2/3 lebih dari 1/3."
    },
    {
      "ikon": "⚖️",
      "nama": "Tanda",
      "isi": "Isi > atau < dengan teliti.",
      "suara": "Cek penyebut dulu."
    },
    {
      "ikon": "🔍",
      "nama": "Cerita",
      "isi": "Tongkat Asep 3/6 lebih panjang.",
      "suara": "3/6 > 2/6."
    },
    {
      "ikon": "🌍",
      "nama": "Penyebut Sama",
      "isi": "METODE LUAR · Same Denominator: Banding/jumlah lebih mudah jika penyebut sama. (asal: Singapore Math).",
      "suara": "METODE LUAR. Penyebut Sama. Banding/jumlah lebih mudah jika penyebut sama."
    },
    {
      "ikon": "🌍",
      "nama": "Banding Pembilang",
      "isi": "METODE LUAR · Compare Numerators: Penyebut sama: pembilang lebih besar = pecahan lebih besar. (asal: Fraction comparison).",
      "suara": "METODE LUAR. Banding Pembilang. Penyebut sama: pembilang lebih besar = pecahan lebih besar."
    },
    {
      "ikon": "🌍",
      "nama": "Batang Pecahan",
      "isi": "METODE LUAR · Fraction Bars: Batang sama panjang memudahkan banding. (asal: Manipulative pedagogy).",
      "suara": "METODE LUAR. Batang Pecahan. Batang sama panjang memudahkan banding."
    }
  ],
  "poinSuara": "Empat poin pecahan penyebut sama.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Sama q",
        "warna": "#FDE68A"
      },
      {
        "teks": "Pembilang",
        "warna": "#BBF7D0"
      },
      {
        "teks": "Tanda",
        "warna": "#BFDBFE"
      },
      {
        "teks": "Cerita",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Berlatih: bandingkan 3/5 … 2/5.",
  "refleksi": [
    "Aku cek penyebut sama.",
    "Aku banding pembilang.",
    "Aku isi tanda benar.",
    "Aku selesaikan cerita."
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Same Denominator",
      "namaId": "Penyebut Sama",
      "asal": "Singapore Math",
      "ringkas": "Banding/jumlah lebih mudah jika penyebut sama.",
      "tahap": [
        "Story",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Compare Numerators",
      "namaId": "Banding Pembilang",
      "asal": "Fraction comparison",
      "ringkas": "Penyebut sama: pembilang lebih besar = pecahan lebih besar.",
      "tahap": [
        "Picture",
        "Mind"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Fraction Bars",
      "namaId": "Batang Pecahan",
      "asal": "Manipulative pedagogy",
      "ringkas": "Batang sama panjang memudahkan banding.",
      "tahap": [
        "Infografis",
        "Concrete"
      ]
    }
  ]
};

export const SUB_C42: SubBabNaskah = {
  "id": "C",
  "codeTitle": "Sub-Bab C (Pecahan Senilai)",
  "fullTitle": "Sub-Bab C: Pecahan Senilai",
  "targetDescription": "Siswa mengenali pecahan senilai (2/6 = 1/3) melalui model coklat dan lipat kertas, serta menghasilkan senilai dengan mengalikan atau membagi pembilang dan penyebut dengan bilangan sama.",
  "secondaryBg": "#FCE7F3",
  "secondaryBorder": "#DB2777",
  "secondaryText": "#9D174D",
  "silabus": {
    "teksSuara": "Kita belajar pecahan senilai. Dua per enam sama dengan satu per tiga. Kalikan atau bagi pembilang dan penyebut dengan bilangan yang sama. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa mengenali pecahan senilai setelah mengamati gambar dan simbol.",
    "referensi": "Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 2 Sub-Bab C)."
  },
  "videos": [
    {
      "id": "K4B2C-V1",
      "judul": "Coklat Putu",
      "subjudul": "2/6 = 1/3",
      "adegan": [
        {
          "id": "K4B2C-V1-1",
          "judul": "Dua batang",
          "ketukan": [
            "Ibu Guru punya 2 batang coklat.",
            "Coklat pertama dibagi 6, Putu mendapat 2/6.",
            "Coklat kedua dibagi 3, Putu mendapat 1/3.",
            "Apakah sama besar?"
          ],
          "papan": [
            "2 coklat",
            "2/6",
            "1/3",
            "sama?"
          ]
        },
        {
          "id": "K4B2C-V1-2",
          "judul": "Gambar membuktikan",
          "ketukan": [
            "Lihat daerah coklat Putu.",
            "2 dari 6 sama luas dengan 1 dari 3.",
            "Jadi 2/6 = 1/3.",
            "Itu pecahan senilai."
          ],
          "papan": [
            "luas sama",
            "2/6",
            "=",
            "1/3"
          ]
        },
        {
          "id": "K4B2C-V1-3",
          "judul": "Lipat kertas",
          "ketukan": [
            "Lipat kertas jadi 4, warnai 1 → 1/4.",
            "Lipat kertas lain jadi 16, warnai 4 → 4/16.",
            "Daerah warnanya sama besar.",
            "1/4 senilai 4/16.",
            "METODE LUAR. Pecahan Senilai: Senilai menunjuk bagian sama dengan tulisan beda."
          ],
          "papan": [
            "1/4",
            "4/16",
            "sama besar",
            "senilai",
            "METODE LUAR · Pecahan Senilai"
          ]
        }
      ]
    },
    {
      "id": "K4B2C-V2",
      "judul": "Dua Cara",
      "subjudul": "×k dan :k",
      "adegan": [
        {
          "id": "K4B2C-V2-1",
          "judul": "Kalikan",
          "ketukan": [
            "Ambil 1/3.",
            "Kalikan pembilang dan penyebut dengan 2.",
            "Dapat 2/6.",
            "Nilainya tetap sama."
          ],
          "papan": [
            "1/3",
            "×2 / ×2",
            "2/6",
            "sama"
          ]
        },
        {
          "id": "K4B2C-V2-2",
          "judul": "Bagi",
          "ketukan": [
            "Ambil 2/6.",
            "Bagi pembilang dan penyebut dengan 2.",
            "Dapat 1/3.",
            "Kembali ke bentuk sederhana."
          ],
          "papan": [
            "2/6",
            "÷2 / ÷2",
            "1/3",
            "sederhana"
          ]
        },
        {
          "id": "K4B2C-V2-3",
          "judul": "Ingat",
          "ketukan": [
            "Jangan hanya ubah pembilang.",
            "Jangan hanya ubah penyebut.",
            "Ubah keduanya dengan bilangan sama.",
            "Itulah kunci senilai.",
            "METODE LUAR. Kali dengan Bentuk Satu: Kali pembilang dan penyebut dengan bilangan sama."
          ],
          "papan": [
            "bukan salah satu",
            "keduanya",
            "bilangan sama",
            "kunci",
            "METODE LUAR · Kali dengan Bentuk Satu"
          ]
        }
      ]
    },
    {
      "id": "K4B2C-V3",
      "judul": "Latihan Senilai",
      "subjudul": "Gambar dan simbol",
      "adegan": [
        {
          "id": "K4B2C-V3-1",
          "judul": "Baca arsir",
          "ketukan": [
            "Lihat dua gambar diarsir.",
            "Tulis pecahan masing-masing.",
            "Apakah nilainya sama?",
            "Jika sama, mereka senilai."
          ],
          "papan": [
            "dua gambar",
            "tulis",
            "nilai?",
            "senilai?"
          ]
        },
        {
          "id": "K4B2C-V3-2",
          "judul": "Buat tiga gambar",
          "ketukan": [
            "Buat tiga gambar pecahan senilai.",
            "Misal 1/2, 2/4, dan 3/6.",
            "Semua bernilai setengah.",
            "Berlatih membuat sendiri."
          ],
          "papan": [
            "tiga gambar",
            "1/2",
            "2/4",
            "3/6"
          ]
        },
        {
          "id": "K4B2C-V3-3",
          "judul": "Siap desimal",
          "ketukan": [
            "Pecahan biasa sudah dikuasai.",
            "Berikutnya pecahan desimal.",
            "Persepuluhan dan perseratusan.",
            "Simpan dulu untuk Sub-Bab D.",
            "METODE LUAR. Sederhanakan: Bagi pembilang dan penyebut dengan FPB."
          ],
          "papan": [
            "biasa ok",
            "desimal",
            "1/10",
            "nanti D",
            "METODE LUAR · Sederhanakan"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Nilai sama",
      "stepDesc": "Bentuk boleh beda, nilai sama.",
      "icon": "⚖️",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Model",
      "stepDesc": "Coklat dan lipat kertas.",
      "icon": "🍫",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. 2/6 = 1/3",
      "stepDesc": "Contoh buku.",
      "icon": "✅",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. ×k",
      "stepDesc": "Kalikan p dan q dengan k.",
      "icon": "✖️",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. :k",
      "stepDesc": "Bagi p dan q dengan k.",
      "icon": "➗",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Keduanya",
      "stepDesc": "Ubah pembilang dan penyebut bersama.",
      "icon": "🔗",
      "flowFrom": "5",
      "flowTo": "7"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Latihan",
      "stepDesc": "Gambar arsir senilai.",
      "icon": "🖍️",
      "flowFrom": "6",
      "flowTo": "8"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Refleksi",
      "stepDesc": "Siap pecahan desimal.",
      "icon": "➡️",
      "flowFrom": "7",
      "flowTo": "9"
    },
    {
      "stepNumber": 9,
      "stepTitle": "9. METODE LUAR · Pecahan Senilai",
      "stepDesc": "Senilai menunjuk bagian sama dengan tulisan beda.",
      "icon": "🌍",
      "flowFrom": "8",
      "flowTo": "10"
    },
    {
      "stepNumber": 10,
      "stepTitle": "10. METODE LUAR · Kali dengan Bentuk Satu",
      "stepDesc": "Kali pembilang dan penyebut dengan bilangan sama.",
      "icon": "🌍",
      "flowFrom": "9",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "SENILAI",
      "emoji": "⚖️",
      "countNum": 1,
      "countWord": "nilai",
      "suara": "Nilai sama."
    },
    {
      "judul": "2/6=1/3",
      "emoji": "🍫",
      "countNum": 6,
      "countWord": "coklat",
      "suara": "Contoh Putu."
    },
    {
      "judul": "×k",
      "emoji": "✖️",
      "countNum": 2,
      "countWord": "kali",
      "suara": "Kalikan p dan q."
    },
    {
      "judul": ":k",
      "emoji": "➗",
      "countNum": 2,
      "countWord": "bagi",
      "suara": "Bagi p dan q."
    },
    {
      "judul": "1/4=4/16",
      "emoji": "📄",
      "countNum": 16,
      "countWord": "lipat",
      "suara": "Aktivitas kertas."
    },
    {
      "judul": "1/2=2/4",
      "emoji": "✅",
      "countNum": 2,
      "countWord": "setengah",
      "suara": "Banyak bentuk."
    },
    {
      "judul": "JANGAN",
      "emoji": "🚫",
      "countNum": 1,
      "countWord": "salah",
      "suara": "Jangan ubah satu saja."
    },
    {
      "judul": "SEDERHANA",
      "emoji": "✨",
      "countNum": 1,
      "countWord": "bagi",
      "suara": "Bagi sampai tidak bisa."
    },
    {
      "judul": "ARSIR",
      "emoji": "🖍️",
      "countNum": 1,
      "countWord": "bukti",
      "suara": "Luas arsir sama."
    },
    {
      "judul": "SIAP D",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "desimal",
      "suara": "Sub-Bab berikutnya."
    },
    {
      "judul": "Pecahan Senilai",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "METODE LUAR · Equivalent Fractions",
      "suara": "METODE LUAR. Pecahan Senilai. Senilai menunjuk bagian sama dengan tulisan beda."
    },
    {
      "judul": "Kali dengan Bentuk Satu",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "METODE LUAR · Multiply Identity",
      "suara": "METODE LUAR. Kali dengan Bentuk Satu. Kali pembilang dan penyebut dengan bilangan sama."
    },
    {
      "judul": "Sederhanakan",
      "emoji": "🌍",
      "countNum": 3,
      "countWord": "METODE LUAR · Simplify",
      "suara": "METODE LUAR. Sederhanakan. Bagi pembilang dan penyebut dengan FPB."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "coklat-senilai",
      "title": "Coklat Putu 2/6 = 1/3",
      "bookReference": "hlm. 67–68",
      "objective": "Mengenal senilai dari benda. (METODE LUAR · Pecahan Senilai)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Pecahan Senilai. Pilih sama/beda.",
      "emoji": "🍫",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "kali-senilai",
      "title": "Kalikan Jadi Senilai",
      "bookReference": "hlm. 69",
      "objective": "×k pada pembilang & penyebut.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih hasil.",
      "emoji": "✖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "bagi-senilai",
      "title": "Bagi Jadi Senilai",
      "bookReference": "hlm. 69",
      "objective": ":k pada pembilang & penyebut.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih hasil.",
      "emoji": "➗",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-senilai",
      "title": "Pilah: Senilai atau Tidak",
      "bookReference": "hlm. 67–69",
      "objective": "Memilah pasangan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-senilai",
      "title": "Jodohkan Pasangan Senilai",
      "bookReference": "hlm. 68–70",
      "objective": "Menjodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "memory-senilai",
      "title": "Memori Senilai",
      "bookReference": "hlm. 68–69",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-senilai",
      "title": "Ketuk yang Senilai Acuan",
      "bookReference": "hlm. 69–70",
      "objective": "Mengetuk.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk.",
      "emoji": "👆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-senilai",
      "title": "Ketuk Semua Senilai",
      "bookReference": "hlm. 69",
      "objective": "Ketuk semua.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-senilai",
      "title": "Cerita Lipat Kertas & Coklat",
      "bookReference": "hlm. 66–68",
      "objective": "Soal cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-nilai",
      "title": "Urutkan menurut Nilai",
      "bookReference": "hlm. 70",
      "objective": "Mengurutkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "grid-senilai",
      "title": "Kotak Senilai",
      "bookReference": "hlm. 66–67",
      "objective": "Membaca grid arsir. (METODE LUAR · Pecahan Senilai)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Pecahan Senilai. Pilih sama/beda.",
      "diagramType": "grid",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "bar-senilai",
      "title": "Batang Senilai",
      "bookReference": "hlm. 68",
      "objective": "Membandingkan batang.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "bar",
      "numberA": 2,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "kali-picture",
      "title": "×k pada Diagram",
      "bookReference": "hlm. 69",
      "objective": "Pilih hasil kali.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "mul",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "bagi-picture",
      "title": ":k pada Diagram",
      "bookReference": "hlm. 69",
      "objective": "Pilih hasil bagi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "div",
      "numberA": 2,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "match-picture-c",
      "title": "Jodohkan Diagram Senilai",
      "bookReference": "hlm. 68–70",
      "objective": "Jodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memory-picture-c",
      "title": "Memori Diagram Senilai",
      "bookReference": "hlm. 68",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-c",
      "title": "Tabel ×k Senilai",
      "bookReference": "hlm. 69",
      "objective": "Isi hasil.",
      "mechanicDescription": "Tiga tabel.",
      "voiceGuide": "Pilih.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-c",
      "title": "Ketuk Semua Senilai Diagram",
      "bookReference": "hlm. 69",
      "objective": "Ketuk semua.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-picture-c",
      "title": "Pilah Diagram Senilai",
      "bookReference": "hlm. 67–69",
      "objective": "Pilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "rule-c",
      "title": "Dua Cara Senilai",
      "bookReference": "hlm. 69",
      "objective": "Pilih cara benar.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "rule",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "check-equal",
      "title": "Apakah Senilai?",
      "bookReference": "hlm. 68–70",
      "objective": "Menilai kesamaan nilai. (METODE LUAR · Pecahan Senilai)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Pecahan Senilai. Pilih sama/beda.",
      "symbolLarge": "=",
      "wordLarge": "SENILAI",
      "mathNotation": "a/b = c/d"
    },
    {
      "stage": "Abstract",
      "gameType": "kali-abstract",
      "title": "Hitung ×k",
      "bookReference": "hlm. 69",
      "objective": "Mengalikan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih hasil.",
      "symbolLarge": "×2",
      "wordLarge": "KALI",
      "mathNotation": "p/q ×k"
    },
    {
      "stage": "Abstract",
      "gameType": "bagi-abstract",
      "title": "Hitung :k",
      "bookReference": "hlm. 69",
      "objective": "Membagi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih hasil.",
      "symbolLarge": "÷2",
      "wordLarge": "BAGI",
      "mathNotation": "p/q :k"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-c",
      "title": "Pilih Bentuk Senilai",
      "bookReference": "hlm. 69–70",
      "objective": "Memilih.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "2/6",
      "wordLarge": "PILIH",
      "mathNotation": "senilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-c",
      "title": "Jodohkan Bentuk Senilai",
      "bookReference": "hlm. 68–70",
      "objective": "Jodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "symbolLarge": "1/3",
      "wordLarge": "JODOH",
      "mathNotation": "pasangan"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-c",
      "title": "Memori Bentuk Senilai",
      "bookReference": "hlm. 69",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "symbolLarge": "1/2",
      "wordLarge": "MEMORI",
      "mathNotation": "pasangan"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-c",
      "title": "Benar atau Salah: Senilai",
      "bookReference": "hlm. 66–70",
      "objective": "Menilai.",
      "mechanicDescription": "Dua ronde.",
      "voiceGuide": "Benar/salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-c",
      "title": "Detektif Senilai",
      "bookReference": "hlm. 67–70",
      "objective": "Petunjuk.",
      "mechanicDescription": "Empat soal.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-c",
      "title": "Peta Konsep Senilai",
      "bookReference": "hlm. 69",
      "objective": "Mengisi kotak.",
      "mechanicDescription": "Satu peta.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-c",
      "title": "Cerita Angka Senilai",
      "bookReference": "hlm. 66–68",
      "objective": "Soal cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "🍕",
      "nama": "Senilai",
      "isi": "Bentuk berbeda boleh, nilai harus sama.",
      "suara": "2/6 sama dengan 1/3."
    },
    {
      "ikon": "➗",
      "nama": "×k",
      "isi": "Kalikan pembilang dan penyebut dengan bilangan sama.",
      "suara": "1/3 ×2 menjadi 2/6."
    },
    {
      "ikon": "⚖️",
      "nama": ":k",
      "isi": "Bagi pembilang dan penyebut dengan bilangan sama.",
      "suara": "2/6 ÷2 menjadi 1/3."
    },
    {
      "ikon": "🔍",
      "nama": "Bukti",
      "isi": "Daerah arsir sama luas menandai senilai.",
      "suara": "Coklat dan kertas lipat."
    },
    {
      "ikon": "🌍",
      "nama": "Pecahan Senilai",
      "isi": "METODE LUAR · Equivalent Fractions: Senilai menunjuk bagian sama dengan tulisan beda. (asal: Van de Walle).",
      "suara": "METODE LUAR. Pecahan Senilai. Senilai menunjuk bagian sama dengan tulisan beda."
    },
    {
      "ikon": "🌍",
      "nama": "Kali dengan Bentuk Satu",
      "isi": "METODE LUAR · Multiply Identity: Kali pembilang dan penyebut dengan bilangan sama. (asal: Fraction equivalence).",
      "suara": "METODE LUAR. Kali dengan Bentuk Satu. Kali pembilang dan penyebut dengan bilangan sama."
    },
    {
      "ikon": "🌍",
      "nama": "Sederhanakan",
      "isi": "METODE LUAR · Simplify: Bagi pembilang dan penyebut dengan FPB. (asal: GCF simplification).",
      "suara": "METODE LUAR. Sederhanakan. Bagi pembilang dan penyebut dengan FPB."
    }
  ],
  "poinSuara": "Empat poin pecahan senilai.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Senilai",
        "warna": "#FDE68A"
      },
      {
        "teks": "×k",
        "warna": "#BBF7D0"
      },
      {
        "teks": ":k",
        "warna": "#BFDBFE"
      },
      {
        "teks": "Bukti",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Berpikir: buat tiga gambar pecahan senilai 1/3.",
  "refleksi": [
    "Aku mengenali senilai.",
    "Aku bisa mengalikan.",
    "Aku bisa membagi.",
    "Aku membuktikan dengan gambar."
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Equivalent Fractions",
      "namaId": "Pecahan Senilai",
      "asal": "Van de Walle",
      "ringkas": "Senilai menunjuk bagian sama dengan tulisan beda.",
      "tahap": [
        "Story",
        "Mind",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Multiply Identity",
      "namaId": "Kali dengan Bentuk Satu",
      "asal": "Fraction equivalence",
      "ringkas": "Kali pembilang dan penyebut dengan bilangan sama.",
      "tahap": [
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Simplify",
      "namaId": "Sederhanakan",
      "asal": "GCF simplification",
      "ringkas": "Bagi pembilang dan penyebut dengan FPB.",
      "tahap": [
        "Infografis",
        "Abstract"
      ]
    }
  ]
};

export const SUB_D42: SubBabNaskah = {
  "id": "D",
  "codeTitle": "Sub-Bab D (Desimal Persepuluhan & Perseratusan)",
  "fullTitle": "Sub-Bab D: Pecahan Desimal Persepuluhan dan Perseratusan",
  "targetDescription": "Siswa mengubah pecahan biasa persepuluhan (penyebut 10) dan perseratusan (penyebut 100) menjadi pecahan desimal (0,1; 0,01; 0,25), serta membaca aturan satu/dua angka di belakang koma.",
  "secondaryBg": "#ECFDF5",
  "secondaryBorder": "#059669",
  "secondaryText": "#064E3B",
  "silabus": {
    "teksSuara": "Kita belajar pecahan desimal. Satu dari sepuluh roti sama dengan nol koma satu. Satu dari seratus biskuit sama dengan nol koma nol satu. Satu angka di belakang koma berarti penyebut sepuluh. Dua angka berarti penyebut seratus. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menyatakan pecahan desimal persepuluhan dan perseratusan serta mengubah pecahan biasa menjadi desimal.",
    "referensi": "Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 2 Sub-Bab D)."
  },
  "videos": [
    {
      "id": "K4B2D-V1",
      "judul": "Roti Sepuluh",
      "subjudul": "1/10 = 0,1",
      "adegan": [
        {
          "id": "K4B2D-V1-1",
          "judul": "Sepuluh roti",
          "ketukan": [
            "Ibu menyiapkan sepuluh roti.",
            "Satu roti dilapisi selai coklat.",
            "Berapa bagian yang berlapis?",
            "Satu dari sepuluh."
          ],
          "papan": [
            "10 roti",
            "1 berlapis",
            "bagian?",
            "1/10"
          ]
        },
        {
          "id": "K4B2D-V1-2",
          "judul": "Jadi desimal",
          "ketukan": [
            "Satu per sepuluh ditulis desimal.",
            "Hasilnya nol koma satu.",
            "Satu angka di belakang koma.",
            "Itulah persepuluhan."
          ],
          "papan": [
            "1/10",
            "0,1",
            "1 digit",
            "persepuluhan"
          ]
        },
        {
          "id": "K4B2D-V1-3",
          "judul": "Tiga per sepuluh",
          "ketukan": [
            "Tiga roti berlapis.",
            "Tiga per sepuluh.",
            "Ditulis nol koma tiga.",
            "Masih persepuluhan.",
            "METODE LUAR. Desimal Persepuluhan Perseratusan: Digit setelah koma = persepuluhan dan perseratusan."
          ],
          "papan": [
            "3/10",
            "0,3",
            "desimal",
            "OK",
            "METODE LUAR · Desimal Persepuluhan Perseratusan"
          ]
        }
      ]
    },
    {
      "id": "K4B2D-V2",
      "judul": "Biskuit Seratus",
      "subjudul": "1/100 = 0,01",
      "adegan": [
        {
          "id": "K4B2D-V2-1",
          "judul": "Seratus biskuit",
          "ketukan": [
            "Ada seratus biskuit.",
            "Satu biskuit berlapis selai.",
            "Bentuk pecahannya?",
            "Satu per seratus."
          ],
          "papan": [
            "100 biskuit",
            "1 berlapis",
            "pecahan?",
            "1/100"
          ]
        },
        {
          "id": "K4B2D-V2-2",
          "judul": "Nol koma nol satu",
          "ketukan": [
            "Satu per seratus jadi desimal.",
            "Nol koma nol satu.",
            "Dua angka di belakang koma.",
            "Itulah perseratusan."
          ],
          "papan": [
            "1/100",
            "0,01",
            "2 digit",
            "perseratusan"
          ]
        },
        {
          "id": "K4B2D-V2-3",
          "judul": "Tujuh per seratus",
          "ketukan": [
            "Tujuh per seratus.",
            "Ditulis nol koma nol tujuh.",
            "Dua puluh lima per seratus jadi nol koma dua lima.",
            "Paham desimal.",
            "METODE LUAR. Kisi Desimal: Kisi 10×10 menunjukkan perseratusan."
          ],
          "papan": [
            "7/100",
            "0,07",
            "25/100",
            "0,25",
            "METODE LUAR · Kisi Desimal"
          ]
        }
      ]
    },
    {
      "id": "K4B2D-V3",
      "judul": "Aturan Digit Koma",
      "subjudul": "1 digit → 10, 2 digit → 100",
      "adegan": [
        {
          "id": "K4B2D-V3-1",
          "judul": "Satu digit",
          "ketukan": [
            "Lihat di belakang koma.",
            "Ada satu angka.",
            "Penyebutnya sepuluh.",
            "Contoh: nol koma satu."
          ],
          "papan": [
            "1 digit",
            "penyebut 10",
            "contoh",
            "0,1"
          ]
        },
        {
          "id": "K4B2D-V3-2",
          "judul": "Dua digit",
          "ketukan": [
            "Ada dua angka di belakang koma.",
            "Penyebutnya seratus.",
            "Contoh: nol koma nol tujuh.",
            "Atau nol koma dua lima."
          ],
          "papan": [
            "2 digit",
            "penyebut 100",
            "0,07",
            "0,25"
          ]
        },
        {
          "id": "K4B2D-V3-3",
          "judul": "Latihan ubah",
          "ketukan": [
            "Ubah pecahan biasa ke desimal.",
            "Lima per sepuluh jadi nol koma lima.",
            "Sembilan per sepuluh jadi nol koma sembilan.",
            "Siap berlatih.",
            "METODE LUAR. Jembatan Pecahan–Desimal: 0,3 = 3/10; 0,25 = 25/100."
          ],
          "papan": [
            "5/10",
            "0,5",
            "9/10",
            "0,9",
            "METODE LUAR · Jembatan Pecahan–Desimal"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Roti /10",
      "stepDesc": "Bagian dari 10.",
      "icon": "🍞",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. 1/10=0,1",
      "stepDesc": "Persepuluhan.",
      "icon": "🔟",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Biskuit /100",
      "stepDesc": "Bagian dari 100.",
      "icon": "🍪",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. 1/100=0,01",
      "stepDesc": "Perseratusan.",
      "icon": "💯",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. 1 digit",
      "stepDesc": "Penyebut 10.",
      "icon": "1️⃣",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. 2 digit",
      "stepDesc": "Penyebut 100.",
      "icon": "2️⃣",
      "flowFrom": "5",
      "flowTo": "7"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Ubah",
      "stepDesc": "p/q → desimal.",
      "icon": "✏️",
      "flowFrom": "6",
      "flowTo": "8"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Siap E",
      "stepDesc": "Lanjut persen.",
      "icon": "➡️",
      "flowFrom": "7",
      "flowTo": "9"
    },
    {
      "stepNumber": 9,
      "stepTitle": "9. METODE LUAR · Desimal Persepuluhan Perseratusan",
      "stepDesc": "Digit setelah koma = persepuluhan dan perseratusan.",
      "icon": "🌍",
      "flowFrom": "8",
      "flowTo": "10"
    },
    {
      "stepNumber": 10,
      "stepTitle": "10. METODE LUAR · Kisi Desimal",
      "stepDesc": "Kisi 10×10 menunjukkan perseratusan.",
      "icon": "🌍",
      "flowFrom": "9",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "1/10",
      "emoji": "🍞",
      "countNum": 10,
      "countWord": "roti",
      "suara": "Satu per sepuluh."
    },
    {
      "judul": "0,1",
      "emoji": "🔟",
      "countNum": 1,
      "countWord": "digit",
      "suara": "Persepuluhan."
    },
    {
      "judul": "1/100",
      "emoji": "🍪",
      "countNum": 100,
      "countWord": "biskuit",
      "suara": "Satu per seratus."
    },
    {
      "judul": "0,01",
      "emoji": "💯",
      "countNum": 2,
      "countWord": "digit",
      "suara": "Perseratusan."
    },
    {
      "judul": "0,3",
      "emoji": "✏️",
      "countNum": 3,
      "countWord": "contoh",
      "suara": "Tiga per sepuluh."
    },
    {
      "judul": "0,07",
      "emoji": "📗",
      "countNum": 7,
      "countWord": "contoh",
      "suara": "Tujuh per seratus."
    },
    {
      "judul": "0,25",
      "emoji": "🟧",
      "countNum": 25,
      "countWord": "seperempat",
      "suara": "Dua puluh lima per seratus."
    },
    {
      "judul": "ATURAN",
      "emoji": "📜",
      "countNum": 1,
      "countWord": "koma",
      "suara": "Digit = petunjuk penyebut."
    },
    {
      "judul": "UBAH",
      "emoji": "🔁",
      "countNum": 1,
      "countWord": "bentuk",
      "suara": "Biasa ke desimal."
    },
    {
      "judul": "SIAP E",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "lanjut",
      "suara": "Menuju persen."
    },
    {
      "judul": "Desimal Persepuluhan Perseratusan",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "METODE LUAR · Decimal Tenths Hundredths",
      "suara": "METODE LUAR. Desimal Persepuluhan Perseratusan. Digit setelah koma = persepuluhan dan perseratusan."
    },
    {
      "judul": "Kisi Desimal",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "METODE LUAR · Decimal Grid",
      "suara": "METODE LUAR. Kisi Desimal. Kisi 10×10 menunjukkan perseratusan."
    },
    {
      "judul": "Jembatan Pecahan–Desimal",
      "emoji": "🌍",
      "countNum": 3,
      "countWord": "METODE LUAR · Fraction–Decimal Link",
      "suara": "METODE LUAR. Jembatan Pecahan–Desimal. 0,3 = 3/10; 0,25 = 25/100."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "roti-10",
      "title": "Roti Sepuluh Bagian",
      "bookReference": "hlm. 71–72 (roti 1/10)",
      "objective": "Mengenal 1/10 = 0,1. (METODE LUAR · Desimal Persepuluhan Perseratusan)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Desimal Persepuluhan Perseratusan. Pilih desimal.",
      "emoji": "🍞",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "biskuit-100",
      "title": "Biskuit Seratus",
      "bookReference": "hlm. 72 (1/100)",
      "objective": "Mengenal 1/100 = 0,01.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih desimal.",
      "emoji": "🍪",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ubah-10",
      "title": "Ubah Persepuluhan",
      "bookReference": "hlm. 72–74",
      "objective": "p/10 → 0,p.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih desimal.",
      "emoji": "🔟",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ubah-100",
      "title": "Ubah Perseratusan",
      "bookReference": "hlm. 72–75",
      "objective": "p/100 → 0,pp.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih desimal.",
      "emoji": "💯",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-jenis",
      "title": "Pilah Persepuluhan/Perseratusan",
      "bookReference": "hlm. 73",
      "objective": "Memilah jenis.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-des",
      "title": "Jodohkan Pecahan–Desimal",
      "bookReference": "hlm. 72–74",
      "objective": "Menjodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-des",
      "title": "Memori Desimal",
      "bookReference": "hlm. 72–74",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-des",
      "title": "Ketuk Desimal Diminta",
      "bookReference": "hlm. 73–74",
      "objective": "Mengetuk.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-des",
      "title": "Ketuk Semua Jenis",
      "bookReference": "hlm. 73",
      "objective": "Ketuk semua.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-des",
      "title": "Cerita Roti dan Biskuit",
      "bookReference": "hlm. 71–73",
      "objective": "Soal cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "bar-10",
      "title": "Batang Sepuluh",
      "bookReference": "hlm. 71–72",
      "objective": "Baca batang /10. (METODE LUAR · Desimal Persepuluhan Perseratusan)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Desimal Persepuluhan Perseratusan. Pilih.",
      "diagramType": "bar10",
      "numberA": 1,
      "numberB": 10
    },
    {
      "stage": "Picture",
      "gameType": "grid-100",
      "title": "Kotak Seratus",
      "bookReference": "hlm. 72–73",
      "objective": "Baca grid /100.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "grid",
      "numberA": 1,
      "numberB": 100
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-d",
      "title": "Jodohkan Diagram Desimal",
      "bookReference": "hlm. 72–74",
      "objective": "Jodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-d",
      "title": "Memori Diagram Desimal",
      "bookReference": "hlm. 73",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-d",
      "title": "Tabel Pecahan → Desimal",
      "bookReference": "hlm. 74–75",
      "objective": "Isi tabel.",
      "mechanicDescription": "Tiga tabel.",
      "voiceGuide": "Pilih.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-d",
      "title": "Ketuk Semua Jenis Diagram",
      "bookReference": "hlm. 73",
      "objective": "Ketuk semua.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-d",
      "title": "Pilah Diagram Desimal",
      "bookReference": "hlm. 73",
      "objective": "Pilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "digit-rule",
      "title": "Aturan Digit Koma",
      "bookReference": "hlm. 73",
      "objective": "1 digit→10, 2 digit→100.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "rule",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "choose-des",
      "title": "Pilih Desimal Cocok",
      "bookReference": "hlm. 72–74",
      "objective": "Pilih desimal.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-d",
      "title": "Cerita Diagram Desimal",
      "bookReference": "hlm. 71–74",
      "objective": "Cerita + gambar.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-des10",
      "title": "Tulis 0,p",
      "bookReference": "hlm. 72–74",
      "objective": "Menulis persepuluhan. (METODE LUAR · Desimal Persepuluhan Perseratusan)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Desimal Persepuluhan Perseratusan. Pilih.",
      "symbolLarge": "0,1",
      "wordLarge": "PERSEPULUHAN",
      "mathNotation": "p/10"
    },
    {
      "stage": "Abstract",
      "gameType": "write-des100",
      "title": "Tulis 0,pp",
      "bookReference": "hlm. 72–75",
      "objective": "Menulis perseratusan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "0,01",
      "wordLarge": "PERSERATUSAN",
      "mathNotation": "p/100"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-des-a",
      "title": "Pilih Bentuk Desimal",
      "bookReference": "hlm. 73–74",
      "objective": "Memilih.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "0,25",
      "wordLarge": "PILIH",
      "mathNotation": "desimal"
    },
    {
      "stage": "Abstract",
      "gameType": "order-des",
      "title": "Urutkan Desimal",
      "bookReference": "hlm. 74",
      "objective": "Mengurutkan nilai.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "symbolLarge": "0,01<0,1",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-d",
      "title": "Jodohkan Notasi Desimal",
      "bookReference": "hlm. 72–74",
      "objective": "Jodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "symbolLarge": "1/10",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-d",
      "title": "Memori Notasi Desimal",
      "bookReference": "hlm. 73",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "symbolLarge": "0,07",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-d",
      "title": "Benar atau Salah: Desimal",
      "bookReference": "hlm. 71–74",
      "objective": "Menilai.",
      "mechanicDescription": "Dua ronde.",
      "voiceGuide": "Benar/salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-d",
      "title": "Detektif Desimal",
      "bookReference": "hlm. 71–74",
      "objective": "Petunjuk → desimal.",
      "mechanicDescription": "Empat soal.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-d",
      "title": "Peta Konsep Desimal",
      "bookReference": "hlm. 71–73",
      "objective": "Mengisi kotak.",
      "mechanicDescription": "Satu peta.",
      "voiceGuide": "Pilih opsi.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-d",
      "title": "Cerita Angka Desimal",
      "bookReference": "hlm. 71–74",
      "objective": "Soal cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "🔟",
      "nama": "Persepuluhan",
      "isi": "Satu digit di belakang koma → penyebut 10 (contoh 1/10 = 0,1).",
      "suara": "Satu digit berarti persepuluhan."
    },
    {
      "ikon": "💯",
      "nama": "Perseratusan",
      "isi": "Dua digit di belakang koma → penyebut 100 (contoh 1/100 = 0,01).",
      "suara": "Dua digit berarti perseratusan."
    },
    {
      "ikon": "✏️",
      "nama": "Ubah",
      "isi": "Tulis pembilang di belakang koma sesuai banyak digit.",
      "suara": "Salin pembilang ke belakang koma."
    },
    {
      "ikon": "📖",
      "nama": "Cerita",
      "isi": "Roti dan biskuit membantu membayangkan bagian.",
      "suara": "Benda nyata memudahkan desimal."
    },
    {
      "ikon": "🌍",
      "nama": "Desimal Persepuluhan Perseratusan",
      "isi": "METODE LUAR · Decimal Tenths Hundredths: Digit setelah koma = persepuluhan dan perseratusan. (asal: Place-value decimals).",
      "suara": "METODE LUAR. Desimal Persepuluhan Perseratusan. Digit setelah koma = persepuluhan dan perseratusan."
    },
    {
      "ikon": "🌍",
      "nama": "Kisi Desimal",
      "isi": "METODE LUAR · Decimal Grid: Kisi 10×10 menunjukkan perseratusan. (asal: Base-ten grid).",
      "suara": "METODE LUAR. Kisi Desimal. Kisi 10×10 menunjukkan perseratusan."
    },
    {
      "ikon": "🌍",
      "nama": "Jembatan Pecahan–Desimal",
      "isi": "METODE LUAR · Fraction–Decimal Link: 0,3 = 3/10; 0,25 = 25/100. (asal: Van de Walle).",
      "suara": "METODE LUAR. Jembatan Pecahan–Desimal. 0,3 = 3/10; 0,25 = 25/100."
    }
  ],
  "poinSuara": "Empat poin pecahan desimal.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Persepuluhan",
        "warna": "#FDE68A"
      },
      {
        "teks": "Perseratusan",
        "warna": "#BBF7D0"
      },
      {
        "teks": "Ubah",
        "warna": "#BFDBFE"
      },
      {
        "teks": "Cerita",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Berlatih: ubah 5/10, 9/10, 15/100, 81/100 ke desimal.",
  "refleksi": [
    "Aku menulis 0,p.",
    "Aku menulis 0,pp.",
    "Aku bedakan jenis.",
    "Aku ubah dari pecahan biasa."
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Decimal Tenths Hundredths",
      "namaId": "Desimal Persepuluhan Perseratusan",
      "asal": "Place-value decimals",
      "ringkas": "Digit setelah koma = persepuluhan dan perseratusan.",
      "tahap": [
        "Story",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Decimal Grid",
      "namaId": "Kisi Desimal",
      "asal": "Base-ten grid",
      "ringkas": "Kisi 10×10 menunjukkan perseratusan.",
      "tahap": [
        "Picture",
        "Infografis"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Fraction–Decimal Link",
      "namaId": "Jembatan Pecahan–Desimal",
      "asal": "Van de Walle",
      "ringkas": "0,3 = 3/10; 0,25 = 25/100.",
      "tahap": [
        "Mind",
        "Abstract"
      ]
    }
  ]
};

export const SUB_E42: SubBabNaskah = {
  "id": "E",
  "codeTitle": "Sub-Bab E (Desimal Perseratusan & Persen)",
  "fullTitle": "Sub-Bab E: Menghubungkan Pecahan Desimal Perseratusan dengan Konsep Persen",
  "targetDescription": "Siswa mengubah desimal perseratusan menjadi persen (0,75 = 75%) dengan cara biasa (via pecahan /100) maupun cara langsung (×100% / geser koma dua kali), serta mengubah balik persen ke desimal dan menyelesaikan cerita persen.",
  "secondaryBg": "#FEF3C7",
  "secondaryBorder": "#D97706",
  "secondaryText": "#78350F",
  "silabus": {
    "teksSuara": "Kita menghubungkan desimal perseratusan dengan persen. Nol koma tujuh lima sama dengan tujuh puluh lima per seratus sama dengan tujuh puluh lima persen. Boleh pakai cara biasa atau langsung kali seratus persen. Geser koma dua kali ke kanan. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa mengubah pecahan desimal perseratusan menjadi persen dan sebaliknya, serta memakai persen dalam cerita.",
    "referensi": "Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 2 Sub-Bab E)."
  },
  "videos": [
    {
      "id": "K4B2E-V1",
      "judul": "Apa Itu Persen?",
      "subjudul": "% = per seratus",
      "adegan": [
        {
          "id": "K4B2E-V1-1",
          "judul": "Diskon di toko",
          "ketukan": [
            "Saat belanja sering ada diskon persen.",
            "Persen ditulis dengan tanda persen.",
            "Artinya per seratus.",
            "Lima persen sama dengan lima per seratus."
          ],
          "papan": [
            "diskon",
            "%",
            "per 100",
            "5%=5/100"
          ]
        },
        {
          "id": "K4B2E-V1-2",
          "judul": "Dari desimal",
          "ketukan": [
            "Contoh: nol koma tujuh lima.",
            "Ubah jadi tujuh puluh lima per seratus.",
            "Lalu tulis tujuh puluh lima persen.",
            "Itulah hubungan desimal dan persen."
          ],
          "papan": [
            "0,75",
            "75/100",
            "75%",
            "hubungan"
          ]
        },
        {
          "id": "K4B2E-V1-3",
          "judul": "Dua cara",
          "ketukan": [
            "Cara biasa: lewat pecahan dulu.",
            "Cara langsung: kali seratus persen.",
            "Hasilnya sama.",
            "Pilih cara yang kamu suka.",
            "METODE LUAR. Persen sebagai Perseratusan: Persen artinya per seratus."
          ],
          "papan": [
            "cara biasa",
            "cara langsung",
            "sama",
            "pilih",
            "METODE LUAR · Persen sebagai Perseratusan"
          ]
        }
      ]
    },
    {
      "id": "K4B2E-V2",
      "judul": "Cara Langsung",
      "subjudul": "×100% dan geser koma",
      "adegan": [
        {
          "id": "K4B2E-V2-1",
          "judul": "Kali seratus",
          "ketukan": [
            "Ambil nol koma tiga enam.",
            "Kalikan seratus persen.",
            "Hasil tiga puluh enam persen.",
            "Cepat dan ringkas."
          ],
          "papan": [
            "0,36",
            "×100%",
            "36%",
            "cepat"
          ]
        },
        {
          "id": "K4B2E-V2-2",
          "judul": "Geser koma",
          "ketukan": [
            "Tips buku: geser koma dua kali ke kanan.",
            "Nol koma dua lima jadi dua puluh lima.",
            "Tambahkan tanda persen.",
            "Selesai."
          ],
          "papan": [
            "geser 2×",
            "0,25",
            "25",
            "25%"
          ]
        },
        {
          "id": "K4B2E-V2-3",
          "judul": "Lebih dari 100%",
          "ketukan": [
            "Dua koma empat enam.",
            "Kali seratus persen.",
            "Hasil dua ratus empat puluh enam persen.",
            "Persen boleh lebih dari seratus.",
            "METODE LUAR. Kisi Seratus Persen: Satu kotak dari 100 = 1%."
          ],
          "papan": [
            "2,46",
            "×100%",
            "246%",
            ">100%",
            "METODE LUAR · Kisi Seratus Persen"
          ]
        }
      ]
    },
    {
      "id": "K4B2E-V3",
      "judul": "Cerita Kelas",
      "subjudul": "20/50 = 40%",
      "adegan": [
        {
          "id": "K4B2E-V3-1",
          "judul": "Olahraga",
          "ketukan": [
            "Lima puluh siswa di kelas.",
            "Dua puluh ikut olahraga.",
            "Ubah ke penyebut seratus.",
            "Jadi empat puluh persen."
          ],
          "papan": [
            "50 siswa",
            "20 olahraga",
            "×2",
            "40%"
          ]
        },
        {
          "id": "K4B2E-V3-2",
          "judul": "Balik ke desimal",
          "ketukan": [
            "Delapan belas persen.",
            "Bagi seratus.",
            "Hasil nol koma satu delapan.",
            "Persen kembali jadi desimal."
          ],
          "papan": [
            "18%",
            "÷100",
            "0,18",
            "balik"
          ]
        },
        {
          "id": "K4B2E-V3-3",
          "judul": "Latihan siap",
          "ketukan": [
            "Ubah desimal ke persen.",
            "Ubah persen ke desimal.",
            "Selesaikan cerita persen.",
            "Siap berlatih.",
            "METODE LUAR. Jembatan Desimal–Persen: 0,25 = 25%."
          ],
          "papan": [
            "des→%",
            "%→des",
            "cerita",
            "siap",
            "METODE LUAR · Jembatan Desimal–Persen"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Arti %",
      "stepDesc": "Per seratus.",
      "icon": "％",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. 0,75",
      "stepDesc": "Contoh desimal.",
      "icon": "🧮",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. 75/100",
      "stepDesc": "Pecahan biasa.",
      "icon": "💯",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. 75%",
      "stepDesc": "Bentuk persen.",
      "icon": "✅",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. ×100%",
      "stepDesc": "Cara langsung.",
      "icon": "⚡",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Geser 2×",
      "stepDesc": "Tips koma.",
      "icon": "➡️➡️",
      "flowFrom": "5",
      "flowTo": "7"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Cerita",
      "stepDesc": "20/50=40%.",
      "icon": "🏫",
      "flowFrom": "6",
      "flowTo": "8"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Balik",
      "stepDesc": "% → desimal.",
      "icon": "↩️",
      "flowFrom": "7",
      "flowTo": "9"
    },
    {
      "stepNumber": 9,
      "stepTitle": "9. METODE LUAR · Persen sebagai Perseratusan",
      "stepDesc": "Persen artinya per seratus.",
      "icon": "🌍",
      "flowFrom": "8",
      "flowTo": "10"
    },
    {
      "stepNumber": 10,
      "stepTitle": "10. METODE LUAR · Kisi Seratus Persen",
      "stepDesc": "Satu kotak dari 100 = 1%.",
      "icon": "🌍",
      "flowFrom": "9",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "%",
      "emoji": "％",
      "countNum": 100,
      "countWord": "per",
      "suara": "Per seratus."
    },
    {
      "judul": "0,75",
      "emoji": "🧮",
      "countNum": 75,
      "countWord": "desimal",
      "suara": "Contoh buku."
    },
    {
      "judul": "75/100",
      "emoji": "💯",
      "countNum": 75,
      "countWord": "pecahan",
      "suara": "Langkah biasa."
    },
    {
      "judul": "75%",
      "emoji": "✅",
      "countNum": 75,
      "countWord": "persen",
      "suara": "Hasil akhir."
    },
    {
      "judul": "×100%",
      "emoji": "⚡",
      "countNum": 100,
      "countWord": "langsung",
      "suara": "Cara cepat."
    },
    {
      "judul": "GESER",
      "emoji": "➡️",
      "countNum": 2,
      "countWord": "kanan",
      "suara": "Dua kali ke kanan."
    },
    {
      "judul": "246%",
      "emoji": "📈",
      "countNum": 246,
      "countWord": "besar",
      "suara": "Boleh >100%."
    },
    {
      "judul": "40%",
      "emoji": "🏫",
      "countNum": 40,
      "countWord": "cerita",
      "suara": "20/50 siswa."
    },
    {
      "judul": "0,18",
      "emoji": "↩️",
      "countNum": 18,
      "countWord": "balik",
      "suara": "18% → desimal."
    },
    {
      "judul": "INGAT",
      "emoji": "📜",
      "countNum": 1,
      "countWord": "tips",
      "suara": "Desimal ×100%."
    },
    {
      "judul": "Persen sebagai Perseratusan",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "METODE LUAR · Percent as Hundredths",
      "suara": "METODE LUAR. Persen sebagai Perseratusan. Persen artinya per seratus."
    },
    {
      "judul": "Kisi Seratus Persen",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "METODE LUAR · Hundred Grid Percent",
      "suara": "METODE LUAR. Kisi Seratus Persen. Satu kotak dari 100 = 1%."
    },
    {
      "judul": "Jembatan Desimal–Persen",
      "emoji": "🌍",
      "countNum": 3,
      "countWord": "METODE LUAR · Decimal–Percent Link",
      "suara": "METODE LUAR. Jembatan Desimal–Persen. 0,25 = 25%."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "des-ke-persen",
      "title": "Desimal Jadi Persen",
      "bookReference": "hlm. 76–78 (0,75→75%)",
      "objective": "0,pp → persen. (METODE LUAR · Persen sebagai Perseratusan)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Persen sebagai Perseratusan. Pilih persen.",
      "emoji": "％",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "besar-persen",
      "title": "Persen Lebih dari 100",
      "bookReference": "hlm. 78–79 (2,46→246%)",
      "objective": "Desimal >1 jadi persen.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "📈",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "balik-persen",
      "title": "Persen Jadi Desimal",
      "bookReference": "hlm. 82",
      "objective": "% → 0,pp.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih desimal.",
      "emoji": "↩️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cara-langsung",
      "title": "Cara Langsung ×100%",
      "bookReference": "hlm. 80–81",
      "objective": "Kalikan 100%.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "⚡",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-persen",
      "title": "Pilah Persen/Desimal",
      "bookReference": "hlm. 76–80",
      "objective": "Memilah bentuk.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-persen",
      "title": "Jodohkan Desimal–Persen",
      "bookReference": "hlm. 78–82",
      "objective": "Menjodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-persen",
      "title": "Memori Persen",
      "bookReference": "hlm. 78–81",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-persen",
      "title": "Ketuk Persen Diminta",
      "bookReference": "hlm. 78–82",
      "objective": "Mengetuk.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-persen",
      "title": "Ketuk Semua Syarat Persen",
      "bookReference": "hlm. 79–82",
      "objective": "Ketuk semua.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-persen",
      "title": "Cerita Diskon dan Kelas",
      "bookReference": "hlm. 75 & 79",
      "objective": "Soal cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "🛒",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "bar-persen",
      "title": "Batang ke Persen",
      "bookReference": "hlm. 76–78",
      "objective": "Baca lalu ubah. (METODE LUAR · Persen sebagai Perseratusan)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Persen sebagai Perseratusan. Pilih.",
      "diagramType": "bar",
      "numberA": 75,
      "numberB": 100
    },
    {
      "stage": "Picture",
      "gameType": "grid-persen",
      "title": "Kotak Seratus ke Persen",
      "bookReference": "hlm. 76–78",
      "objective": "Grid → %.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "grid",
      "numberA": 35,
      "numberB": 100
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-e",
      "title": "Jodohkan Diagram Persen",
      "bookReference": "hlm. 78–82",
      "objective": "Jodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-e",
      "title": "Memori Diagram Persen",
      "bookReference": "hlm. 80",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-e",
      "title": "Tabel Desimal → Persen",
      "bookReference": "hlm. 78–82",
      "objective": "Isi tabel.",
      "mechanicDescription": "Tiga tabel.",
      "voiceGuide": "Pilih.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-e",
      "title": "Ketuk Semua Diagram Persen",
      "bookReference": "hlm. 79",
      "objective": "Ketuk semua.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-e",
      "title": "Pilah Bentuk Persen",
      "bookReference": "hlm. 80",
      "objective": "Pilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "geser-koma",
      "title": "Geser Koma Dua Kali",
      "bookReference": "hlm. 82",
      "objective": "Tips geser koma.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "shift",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "choose-persen",
      "title": "Pilih Persen Cocok",
      "bookReference": "hlm. 78–81",
      "objective": "Pilih persen.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-e",
      "title": "Cerita Diagram Persen",
      "bookReference": "hlm. 75–79",
      "objective": "Cerita + gambar.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-persen",
      "title": "Tulis …%",
      "bookReference": "hlm. 78–81",
      "objective": "Menulis persen. (METODE LUAR · Persen sebagai Perseratusan)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Persen sebagai Perseratusan. Pilih.",
      "symbolLarge": "75%",
      "wordLarge": "PERSEN",
      "mathNotation": "0,pp→%"
    },
    {
      "stage": "Abstract",
      "gameType": "write-balik",
      "title": "Tulis Desimal dari %",
      "bookReference": "hlm. 82",
      "objective": "Menulis desimal.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "0,18",
      "wordLarge": "BALIK",
      "mathNotation": "%→0,pp"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-persen-a",
      "title": "Pilih Hasil Persen",
      "bookReference": "hlm. 78–82",
      "objective": "Memilih.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "36%",
      "wordLarge": "PILIH",
      "mathNotation": "hasil"
    },
    {
      "stage": "Abstract",
      "gameType": "order-persen",
      "title": "Urutkan Persen/Desimal",
      "bookReference": "hlm. 79–82",
      "objective": "Mengurutkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "symbolLarge": "5%<75%",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-e",
      "title": "Jodohkan Notasi Persen",
      "bookReference": "hlm. 78–82",
      "objective": "Jodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "symbolLarge": "0,35↔35%",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-e",
      "title": "Memori Notasi Persen",
      "bookReference": "hlm. 80",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "symbolLarge": "25%",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-e",
      "title": "Benar atau Salah: Persen",
      "bookReference": "hlm. 75–82",
      "objective": "Menilai.",
      "mechanicDescription": "Dua ronde.",
      "voiceGuide": "Benar/salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-e",
      "title": "Detektif Persen",
      "bookReference": "hlm. 75–82",
      "objective": "Petunjuk → persen.",
      "mechanicDescription": "Empat soal.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-e",
      "title": "Peta Konsep Persen",
      "bookReference": "hlm. 76–81",
      "objective": "Mengisi kotak.",
      "mechanicDescription": "Satu peta.",
      "voiceGuide": "Pilih opsi.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-e",
      "title": "Cerita Angka Persen",
      "bookReference": "hlm. 75–82",
      "objective": "Soal cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "％",
      "nama": "Arti %",
      "isi": "Persen adalah bentuk lain pecahan berpenyebut 100.",
      "suara": "Persen artinya per seratus."
    },
    {
      "ikon": "🧮",
      "nama": "Cara biasa",
      "isi": "Desimal → pecahan /100 → tulis %.",
      "suara": "Lewat pecahan dulu."
    },
    {
      "ikon": "⚡",
      "nama": "Cara langsung",
      "isi": "Kalikan desimal dengan 100% atau geser koma dua kali ke kanan.",
      "suara": "Langsung kali seratus persen."
    },
    {
      "ikon": "🏫",
      "nama": "Cerita",
      "isi": "Samakan penyebut 100 untuk menemukan persen, misalnya 20/50 = 40%.",
      "suara": "Cerita kelas memakai persen."
    },
    {
      "ikon": "🌍",
      "nama": "Persen sebagai Perseratusan",
      "isi": "METODE LUAR · Percent as Hundredths: Persen artinya per seratus. (asal: Percent pedagogy).",
      "suara": "METODE LUAR. Persen sebagai Perseratusan. Persen artinya per seratus."
    },
    {
      "ikon": "🌍",
      "nama": "Kisi Seratus Persen",
      "isi": "METODE LUAR · Hundred Grid Percent: Satu kotak dari 100 = 1%. (asal: Visual percent).",
      "suara": "METODE LUAR. Kisi Seratus Persen. Satu kotak dari 100 = 1%."
    },
    {
      "ikon": "🌍",
      "nama": "Jembatan Desimal–Persen",
      "isi": "METODE LUAR · Decimal–Percent Link: 0,25 = 25%. (asal: Number relationships).",
      "suara": "METODE LUAR. Jembatan Desimal–Persen. 0,25 = 25%."
    }
  ],
  "poinSuara": "Empat poin konsep persen.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Arti %",
        "warna": "#FDE68A"
      },
      {
        "teks": "Cara biasa",
        "warna": "#BBF7D0"
      },
      {
        "teks": "Cara langsung",
        "warna": "#BFDBFE"
      },
      {
        "teks": "Cerita",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Berlatih: ubah 0,12; 1,15; 5,62 ke persen dan 18%; 65%; 123% ke desimal.",
  "refleksi": [
    "Aku paham arti %.",
    "Aku pakai dua cara.",
    "Aku bisa balik ke desimal.",
    "Aku selesaikan cerita persen."
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Percent as Hundredths",
      "namaId": "Persen sebagai Perseratusan",
      "asal": "Percent pedagogy",
      "ringkas": "Persen artinya per seratus.",
      "tahap": [
        "Story",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Hundred Grid Percent",
      "namaId": "Kisi Seratus Persen",
      "asal": "Visual percent",
      "ringkas": "Satu kotak dari 100 = 1%.",
      "tahap": [
        "Picture",
        "Infografis"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Decimal–Percent Link",
      "namaId": "Jembatan Desimal–Persen",
      "asal": "Number relationships",
      "ringkas": "0,25 = 25%.",
      "tahap": [
        "Mind",
        "Abstract"
      ]
    }
  ]
};

export const SUB_BAB_K4B2: SubBabNaskah[] = [SUB_A42, SUB_B42, SUB_C42, SUB_D42, SUB_E42];
export const semuaAdeganK4B2 = SUB_BAB_K4B2.flatMap((s) => s.videos.flatMap((v) => v.adegan));
