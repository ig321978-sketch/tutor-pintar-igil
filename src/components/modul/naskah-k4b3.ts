/**
 * Naskah murni Matematika Kelas 4 Bab 3 (Pola Gambar dan Pola Bilangan): Sub-Bab A–B.
 * Sumber: Buku Siswa Matematika Kelas IV Kemendikbudristek Bab 3 hlm. 85–102.
 * Satu sumber: buat-k4-bab3.mjs → kelas4-bab3.json. Tanpa React/jaringan.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K4B3_META = {
  "chapterId": "k4-mat-bab3",
  "phaseCode": "FASE_B",
  "grade": 4,
  "subjectLabel": "MATEMATIKA - KELAS 4 SD",
  "title": "BAB 3: POLA GAMBAR DAN POLA BILANGAN",
  "silabusElemen": "🌈 Fase B • Elemen Aljabar: Pola Gambar (membesar–mengecil) dan Pola Bilangan (membesar–mengecil) (Kelas 4 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A43: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Pola Gambar)",
  "fullTitle": "Sub-Bab A: Pola Gambar",
  "targetDescription": "Siswa menemukan dan membuat pola gambar membesar (mis. jeruk 2,4,6,… beda +2 hingga kumpulan ke-7 = 14) dan mengecil (mis. permen 9,7,5,… beda −2 hingga kumpulan ke-5 = 1) memakai tabel selisih.",
  "secondaryBg": "#FFEDD5",
  "secondaryBorder": "#EA580C",
  "secondaryText": "#7C2D12",
  "silabus": {
    "teksSuara": "Kita belajar pola gambar. Jeruk disusun 2, 4, 6, lalu ditambah 2 terus sampai kumpulan ketujuh berisi 14. Permen disusun 9, 7, 5, dikurangi 2 sampai tersisa 1. Pola bisa membesar atau mengecil. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menemukan dan membuat pola gambar membesar dan mengecil.",
    "referensi": "Buku Siswa Matematika Kelas IV Bab 3 Sub-Bab A hlm. 87–94; arithmetic visual patterns."
  },
  "videos": [
    {
      "id": "K4B3A-V1",
      "judul": "Jeruk Membesar",
      "subjudul": "2, 4, 6, … → 14",
      "adegan": [
        {
          "id": "K4B3A-V1-1",
          "judul": "Tiga kumpulan",
          "ketukan": [
            "Ada tiga kumpulan jeruk.",
            "Dua, empat, lalu enam.",
            "Apakah kamu melihat polanya?",
            "Setiap kumpulan bertambah dua."
          ],
          "papan": [
            "3 kumpulan",
            "2-4-6",
            "pola?",
            "+2"
          ]
        },
        {
          "id": "K4B3A-V1-2",
          "judul": "Tabel +2",
          "ketukan": [
            "Buat tabel seperti di buku.",
            "Kumpulan empat jadi delapan.",
            "Terus tambah dua.",
            "Sampai kumpulan tujuh."
          ],
          "papan": [
            "tabel",
            "8",
            "+2",
            "ke-7"
          ]
        },
        {
          "id": "K4B3A-V1-3",
          "judul": "Hasil 14",
          "ketukan": [
            "Kumpulan ketujuh berisi empat belas jeruk.",
            "Pola membesar berarti semakin banyak.",
            "Beda tetap positif.",
            "Siap berlatih."
          ],
          "papan": [
            "14 jeruk",
            "membesar",
            "beda +",
            "siap"
          ]
        }
      ]
    },
    {
      "id": "K4B3A-V2",
      "judul": "Permen Mengecil",
      "subjudul": "9, 7, 5, … → 1",
      "adegan": [
        {
          "id": "K4B3A-V2-1",
          "judul": "Semakin sedikit",
          "ketukan": [
            "Ada juga pola yang mengecil.",
            "Sembilan, tujuh, lima permen.",
            "Setiap langkah berkurang dua.",
            "Jumlah semakin sedikit."
          ],
          "papan": [
            "mengecil",
            "9-7-5",
            "−2",
            "sedikit"
          ]
        },
        {
          "id": "K4B3A-V2-2",
          "judul": "Tabel −2",
          "ketukan": [
            "Isi tabel selisih.",
            "Kumpulan empat berisi tiga.",
            "Kumpulan lima berisi satu.",
            "Ikuti beda tetap."
          ],
          "papan": [
            "tabel",
            "3",
            "1",
            "beda −2"
          ]
        },
        {
          "id": "K4B3A-V2-3",
          "judul": "Kesimpulan",
          "ketukan": [
            "Pola mengecil memakai beda negatif.",
            "Pola membesar memakai beda positif.",
            "Selisih antar langkah sama.",
            "Itulah kunci pola gambar."
          ],
          "papan": [
            "beda −",
            "beda +",
            "selisih sama",
            "kunci"
          ]
        }
      ]
    },
    {
      "id": "K4B3A-V3",
      "judul": "Temukan Pola",
      "subjudul": "Amati → beda → lanjutkan",
      "adegan": [
        {
          "id": "K4B3A-V3-1",
          "judul": "Amati",
          "ketukan": [
            "Hitung benda tiap kumpulan.",
            "Bandingkan dengan sebelumnya.",
            "Catat selisihnya.",
            "Apakah selisihnya sama?"
          ],
          "papan": [
            "hitung",
            "banding",
            "selisih",
            "sama?"
          ]
        },
        {
          "id": "K4B3A-V3-2",
          "judul": "Tentukan beda",
          "ketukan": [
            "Jika selisih sama, itu beda pola.",
            "Beda positif berarti membesar.",
            "Beda negatif berarti mengecil.",
            "Lanjutkan dengan beda itu."
          ],
          "papan": [
            "beda",
            "+",
            "−",
            "lanjut"
          ]
        },
        {
          "id": "K4B3A-V3-3",
          "judul": "Prediksi",
          "ketukan": [
            "Prediksi kumpulan berikutnya.",
            "Cek lagi dengan tabel.",
            "Presentasikan pola.",
            "Siap ke pola bilangan."
          ],
          "papan": [
            "prediksi",
            "tabel",
            "presentasi",
            "siap B"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Amati",
      "stepDesc": "Hitung tiap kumpulan.",
      "icon": "👀",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Selisih",
      "stepDesc": "Catat beda tetap.",
      "icon": "➖",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Membesar",
      "stepDesc": "Beda positif.",
      "icon": "📈",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Mengecil",
      "stepDesc": "Beda negatif.",
      "icon": "📉",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Jeruk +2",
      "stepDesc": "2→14 di ke-7.",
      "icon": "🟠",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Permen −2",
      "stepDesc": "9→1 di ke-5.",
      "icon": "🍬",
      "flowFrom": "5",
      "flowTo": "7"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Tabel",
      "stepDesc": "Alat bantu.",
      "icon": "📋",
      "flowFrom": "6",
      "flowTo": "8"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Siap B",
      "stepDesc": "Pola bilangan.",
      "icon": "➡️",
      "flowFrom": "7",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "AMATI",
      "emoji": "👀",
      "countNum": 1,
      "countWord": "lihat",
      "suara": "Hitung benda."
    },
    {
      "judul": "BEDA",
      "emoji": "➖",
      "countNum": 2,
      "countWord": "selisih",
      "suara": "Selisih tetap."
    },
    {
      "judul": "+2",
      "emoji": "📈",
      "countNum": 2,
      "countWord": "jeruk",
      "suara": "Membesar."
    },
    {
      "judul": "−2",
      "emoji": "📉",
      "countNum": 2,
      "countWord": "permen",
      "suara": "Mengecil."
    },
    {
      "judul": "2,4,6",
      "emoji": "🟠",
      "countNum": 6,
      "countWord": "pola",
      "suara": "Contoh buku."
    },
    {
      "judul": "14",
      "emoji": "✅",
      "countNum": 7,
      "countWord": "ke-7",
      "suara": "Hasil jeruk."
    },
    {
      "judul": "9,7,5",
      "emoji": "🍬",
      "countNum": 5,
      "countWord": "pola",
      "suara": "Permen."
    },
    {
      "judul": "1",
      "emoji": "🍬",
      "countNum": 5,
      "countWord": "ke-5",
      "suara": "Sisa satu."
    },
    {
      "judul": "TABEL",
      "emoji": "📋",
      "countNum": 1,
      "countWord": "alat",
      "suara": "Uraian selisih."
    },
    {
      "judul": "SIAP B",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "lanjut",
      "suara": "Pola bilangan."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "baca-pola",
      "title": "Baca Pola Gambar",
      "bookReference": "hlm. 89–90 (jeruk)",
      "objective": "Membaca kumpulan membesar.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih beda/jenis.",
      "emoji": "🟠",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "lanjut-besar",
      "title": "Lanjutkan Pola Membesar",
      "bookReference": "hlm. 90 (kumpulan ke-7)",
      "objective": "Menemukan suku berikutnya.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih banyak benda.",
      "emoji": "📈",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "lanjut-kecil",
      "title": "Lanjutkan Pola Mengecil",
      "bookReference": "hlm. 91–93 (permen)",
      "objective": "Menemukan suku mengecil.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih banyak benda.",
      "emoji": "📉",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-pola",
      "title": "Pilah Membesar/Mengecil",
      "bookReference": "hlm. 87–93",
      "objective": "Memilah jenis pola.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-beda",
      "title": "Jodohkan Pola dan Beda",
      "bookReference": "hlm. 90–93",
      "objective": "Menjodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-pola",
      "title": "Memori Pola Gambar",
      "bookReference": "hlm. 90–93",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-pola",
      "title": "Ketuk Pola Diminta",
      "bookReference": "hlm. 89–93",
      "objective": "Mengetuk.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-pola",
      "title": "Ketuk Semua Jenis Pola",
      "bookReference": "hlm. 87–93",
      "objective": "Ketuk semua.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-pola",
      "title": "Cerita Jeruk dan Permen",
      "bookReference": "hlm. 89–93",
      "objective": "Soal cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-pola",
      "title": "Urutkan Banyak Benda",
      "bookReference": "hlm. 90–93",
      "objective": "Mengurutkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "gambar-besar",
      "title": "Diagram Pola Membesar",
      "bookReference": "hlm. 89–90",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "grow",
      "numberA": 2,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "gambar-kecil",
      "title": "Diagram Pola Mengecil",
      "bookReference": "hlm. 91–93",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "shrink",
      "numberA": 9,
      "numberB": 5
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-a",
      "title": "Jodohkan Diagram Pola",
      "bookReference": "hlm. 90–93",
      "objective": "Jodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-a",
      "title": "Memori Diagram Pola",
      "bookReference": "hlm. 90",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-a",
      "title": "Tabel Selisih Pola",
      "bookReference": "hlm. 90 & 93",
      "objective": "Isi lanjut.",
      "mechanicDescription": "Tiga tabel.",
      "voiceGuide": "Pilih.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-a",
      "title": "Ketuk Semua Diagram",
      "bookReference": "hlm. 87–93",
      "objective": "Ketuk semua.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-a",
      "title": "Pilah Diagram Pola",
      "bookReference": "hlm. 87–93",
      "objective": "Pilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "beda-visual",
      "title": "Temukan Beda Visual",
      "bookReference": "hlm. 90–93",
      "objective": "Pilih beda.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "diff",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "choose-next",
      "title": "Pilih Gambar Berikutnya",
      "bookReference": "hlm. 93–94",
      "objective": "Pilih lanjut.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-a",
      "title": "Cerita Diagram Pola",
      "bookReference": "hlm. 89–93",
      "objective": "Cerita + gambar.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-next",
      "title": "Tulis Suku Berikutnya",
      "bookReference": "hlm. 90–93",
      "objective": "Menulis angka lanjut.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "8",
      "wordLarge": "LANJUT",
      "mathNotation": "suku+beda"
    },
    {
      "stage": "Abstract",
      "gameType": "write-beda",
      "title": "Tulis Beda Pola",
      "bookReference": "hlm. 90–93",
      "objective": "Menulis beda.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "+2",
      "wordLarge": "BEDA",
      "mathNotation": "selisih"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-jenis",
      "title": "Pilih Jenis Pola",
      "bookReference": "hlm. 87–93",
      "objective": "Membesar/mengecil.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "📈",
      "wordLarge": "JENIS",
      "mathNotation": "jenis"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-a",
      "title": "Urutkan Suku",
      "bookReference": "hlm. 90–93",
      "objective": "Mengurutkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "symbolLarge": "2<4<6",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-a",
      "title": "Jodohkan Notasi Pola",
      "bookReference": "hlm. 90–93",
      "objective": "Jodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "symbolLarge": "2,4,6",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-a",
      "title": "Memori Notasi Pola",
      "bookReference": "hlm. 90",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "symbolLarge": "+2",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-a",
      "title": "Benar atau Salah: Pola Gambar",
      "bookReference": "hlm. 87–93",
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
      "title": "Detektif Pola Gambar",
      "bookReference": "hlm. 89–93",
      "objective": "Petunjuk → suku.",
      "mechanicDescription": "Empat soal.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-a",
      "title": "Peta Konsep Pola Gambar",
      "bookReference": "hlm. 87–93",
      "objective": "Mengisi kotak.",
      "mechanicDescription": "Satu peta.",
      "voiceGuide": "Pilih opsi.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-a",
      "title": "Cerita Angka Pola Gambar",
      "bookReference": "hlm. 89–93",
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
      "ikon": "📈",
      "nama": "Amati",
      "isi": "Hitung banyak benda tiap kumpulan dan bandingkan.",
      "suara": "Hitung dulu, lalu bandingkan."
    },
    {
      "ikon": "📉",
      "nama": "Beda tetap",
      "isi": "Selisih antar kumpulan yang berurutan sama.",
      "suara": "Selisih yang sama adalah beda pola."
    },
    {
      "ikon": "📋",
      "nama": "Membesar/mengecil",
      "isi": "Beda positif membesarkan; beda negatif mengecilkan.",
      "suara": "Tanda beda menentukan jenis."
    },
    {
      "ikon": "🔍",
      "nama": "Tabel",
      "isi": "Tabel uraian membantu menemukan suku berikutnya.",
      "suara": "Pakai tabel seperti di buku."
    }
  ],
  "poinSuara": "Empat poin pola gambar.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Amati",
        "warna": "#FDE68A"
      },
      {
        "teks": "Beda tetap",
        "warna": "#BBF7D0"
      },
      {
        "teks": "Membesar/mengecil",
        "warna": "#BFDBFE"
      },
      {
        "teks": "Tabel",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Berlatih: lengkapi pola gambar membesar dan mengecil pada hlm. 93–94.",
  "refleksi": [
    "Aku menghitung benda.",
    "Aku menemukan beda.",
    "Aku membedakan jenis.",
    "Aku memprediksi kumpulan berikutnya."
  ]
};

export const SUB_B43: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Pola Bilangan)",
  "fullTitle": "Sub-Bab B: Pola Bilangan",
  "targetDescription": "Siswa menemukan dan membuat pola bilangan membesar (3,5,7…; 1,4,7…; telur +8) dan mengecil (23,18,13…; 32,28…; produksi TV −6) dengan mengamati selisih tetap, serta menyelesaikan cerita rak buku, kursi, dan panen.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Kita belajar pola bilangan. Tiga, lima, tujuh, sembilan, sebelas, bedanya plus dua. Satu, empat, tujuh, sepuluh, bedanya plus tiga. Dua puluh tiga, delapan belas, tiga belas, delapan, bedanya minus lima. Pola bilangan bisa membesar atau mengecil. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menemukan dan membuat pola bilangan membesar dan mengecil.",
    "referensi": "Buku Siswa Matematika Kelas IV Bab 3 Sub-Bab B hlm. 95–102; arithmetic sequences."
  },
  "videos": [
    {
      "id": "K4B3B-V1",
      "judul": "Beda Tetap",
      "subjudul": "3, 5, 7, 9, 11, …",
      "adegan": [
        {
          "id": "K4B3B-V1-1",
          "judul": "Deret buku",
          "ketukan": [
            "Lihat deret tiga, lima, tujuh, sembilan, sebelas.",
            "Apa hubungan antar bilangan?",
            "Tiap langkah ditambah dua.",
            "Itulah beda tetap."
          ],
          "papan": [
            "3 5 7 9 11",
            "hubungan?",
            "+2",
            "beda"
          ]
        },
        {
          "id": "K4B3B-V1-2",
          "judul": "Suku ke-6",
          "ketukan": [
            "Suku berikutnya sebelas plus dua.",
            "Hasilnya tiga belas.",
            "Pola membesar.",
            "Nilai semakin besar."
          ],
          "papan": [
            "11+2",
            "13",
            "membesar",
            "besar"
          ]
        },
        {
          "id": "K4B3B-V1-3",
          "judul": "Kasus +3",
          "ketukan": [
            "Kasus satu: satu, empat, tujuh, sepuluh.",
            "Bedanya plus tiga.",
            "Lanjutannya tiga belas.",
            "Selalu amati selisih."
          ],
          "papan": [
            "1 4 7 10",
            "+3",
            "13",
            "amati"
          ]
        }
      ]
    },
    {
      "id": "K4B3B-V2",
      "judul": "Pola Mengecil",
      "subjudul": "23, 18, 13, 8, …",
      "adegan": [
        {
          "id": "K4B3B-V2-1",
          "judul": "Kasus dua",
          "ketukan": [
            "Dua puluh tiga, delapan belas, tiga belas, delapan.",
            "Selisihnya minus lima.",
            "Lanjutannya tiga.",
            "Nilai semakin kecil."
          ],
          "papan": [
            "23 18 13 8",
            "−5",
            "3",
            "mengecil"
          ]
        },
        {
          "id": "K4B3B-V2-2",
          "judul": "Ingat definisi",
          "ketukan": [
            "Pola bilangan punya aturan penyusunan.",
            "Bisa membesar atau mengecil.",
            "Kuncinya beda antar suku.",
            "Tulis di tabel agar jelas."
          ],
          "papan": [
            "aturan",
            "±",
            "beda",
            "tabel"
          ]
        },
        {
          "id": "K4B3B-V2-3",
          "judul": "Contoh 32…",
          "ketukan": [
            "Tiga puluh dua, dua puluh delapan, dua puluh empat.",
            "Bedanya minus empat.",
            "Ini pola mengecil.",
            "Latihan cerita menyusul."
          ],
          "papan": [
            "32 28 24",
            "−4",
            "mengecil",
            "cerita"
          ]
        }
      ]
    },
    {
      "id": "K4B3B-V3",
      "judul": "Cerita Telur",
      "subjudul": "20, 28, 36, 44, 52",
      "adegan": [
        {
          "id": "K4B3B-V3-1",
          "judul": "Panen telur",
          "ketukan": [
            "Hari satu dua puluh telur.",
            "Hari dua dua puluh delapan.",
            "Hari tiga tiga puluh enam.",
            "Bedanya plus delapan."
          ],
          "papan": [
            "20",
            "28",
            "36",
            "+8"
          ]
        },
        {
          "id": "K4B3B-V3-2",
          "judul": "Hari ke-5",
          "ketukan": [
            "Lanjutkan pola sampai hari lima.",
            "Hasilnya lima puluh dua.",
            "Cerita memakai pola bilangan.",
            "Sama seperti deret angka."
          ],
          "papan": [
            "hari 5",
            "52",
            "cerita",
            "deret"
          ]
        },
        {
          "id": "K4B3B-V3-3",
          "judul": "Siap berlatih",
          "ketukan": [
            "Rak buku, kursi, dan televisi juga berpola.",
            "Cari bedanya dulu.",
            "Lalu hitung suku yang diminta.",
            "Siap latihan pola bilangan."
          ],
          "papan": [
            "rak/kursi",
            "cari beda",
            "hitung",
            "siap"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Amati deret",
      "stepDesc": "Lihat antar suku.",
      "icon": "👀",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Hitung beda",
      "stepDesc": "Selisih tetap.",
      "icon": "➖",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Membesar",
      "stepDesc": "Beda +.",
      "icon": "📈",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Mengecil",
      "stepDesc": "Beda −.",
      "icon": "📉",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Kasus +3",
      "stepDesc": "1,4,7,10…",
      "icon": "3️⃣",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Kasus −5",
      "stepDesc": "23,18,13…",
      "icon": "5️⃣",
      "flowFrom": "5",
      "flowTo": "7"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Cerita",
      "stepDesc": "Telur +8.",
      "icon": "🥚",
      "flowFrom": "6",
      "flowTo": "8"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Prediksi",
      "stepDesc": "Suku ke-n.",
      "icon": "✅",
      "flowFrom": "7",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "BEDA",
      "emoji": "➖",
      "countNum": 1,
      "countWord": "kunci",
      "suara": "Selisih tetap."
    },
    {
      "judul": "+2",
      "emoji": "📈",
      "countNum": 2,
      "countWord": "contoh",
      "suara": "3,5,7…"
    },
    {
      "judul": "+3",
      "emoji": "3️⃣",
      "countNum": 3,
      "countWord": "kasus",
      "suara": "1,4,7,10…"
    },
    {
      "judul": "−5",
      "emoji": "📉",
      "countNum": 5,
      "countWord": "kasus",
      "suara": "23,18,13…"
    },
    {
      "judul": "−4",
      "emoji": "📉",
      "countNum": 4,
      "countWord": "contoh",
      "suara": "32,28,24…"
    },
    {
      "judul": "+8",
      "emoji": "🥚",
      "countNum": 8,
      "countWord": "telur",
      "suara": "20→52."
    },
    {
      "judul": "13",
      "emoji": "✅",
      "countNum": 6,
      "countWord": "lanjut",
      "suara": "Setelah 11."
    },
    {
      "judul": "3",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "lanjut",
      "suara": "Setelah 8."
    },
    {
      "judul": "TABEL",
      "emoji": "📋",
      "countNum": 1,
      "countWord": "alat",
      "suara": "Uraian hari."
    },
    {
      "judul": "INGAT",
      "emoji": "📜",
      "countNum": 1,
      "countWord": "definisi",
      "suara": "Ada aturan."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "baca-bil",
      "title": "Baca Pola Bilangan",
      "bookReference": "hlm. 96–97 (3,5,7…)",
      "objective": "Membaca beda bilangan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih beda/jenis.",
      "emoji": "🔢",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "lanjut-besar-b",
      "title": "Lanjutkan Pola Membesar",
      "bookReference": "hlm. 97 (kasus +3)",
      "objective": "Suku berikutnya.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih bilangan.",
      "emoji": "📈",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "lanjut-kecil-b",
      "title": "Lanjutkan Pola Mengecil",
      "bookReference": "hlm. 98 (kasus −5)",
      "objective": "Suku mengecil.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih bilangan.",
      "emoji": "📉",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-bil",
      "title": "Pilah Membesar/Mengecil",
      "bookReference": "hlm. 97–98",
      "objective": "Memilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-bil",
      "title": "Jodohkan Deret dan Beda",
      "bookReference": "hlm. 97–100",
      "objective": "Menjodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-bil",
      "title": "Memori Pola Bilangan",
      "bookReference": "hlm. 97–99",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-bil",
      "title": "Ketuk Deret Diminta",
      "bookReference": "hlm. 97–100",
      "objective": "Mengetuk.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-bil",
      "title": "Ketuk Semua Jenis Bilangan",
      "bookReference": "hlm. 97–98",
      "objective": "Ketuk semua.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-bil",
      "title": "Cerita Telur, Rak, Kursi, TV",
      "bookReference": "hlm. 98–100",
      "objective": "Soal cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "🥚",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-bil",
      "title": "Urutkan Bilangan Pola",
      "bookReference": "hlm. 96–99",
      "objective": "Mengurutkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "rantai-besar",
      "title": "Rantai Membesar",
      "bookReference": "hlm. 97",
      "objective": "Baca rantai.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "chain",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "rantai-kecil",
      "title": "Rantai Mengecil",
      "bookReference": "hlm. 98",
      "objective": "Baca rantai.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "chain",
      "numberA": 23,
      "numberB": 8
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-b",
      "title": "Jodohkan Rantai Bilangan",
      "bookReference": "hlm. 97–100",
      "objective": "Jodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-b",
      "title": "Memori Rantai",
      "bookReference": "hlm. 97",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-b",
      "title": "Tabel Uraian Bilangan",
      "bookReference": "hlm. 96 & 99",
      "objective": "Isi lanjut.",
      "mechanicDescription": "Tiga tabel.",
      "voiceGuide": "Pilih.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-b",
      "title": "Ketuk Semua Rantai",
      "bookReference": "hlm. 97–98",
      "objective": "Ketuk semua.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-b",
      "title": "Pilah Rantai Pola",
      "bookReference": "hlm. 97–98",
      "objective": "Pilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "beda-bil",
      "title": "Temukan Beda Bilangan",
      "bookReference": "hlm. 97–98",
      "objective": "Pilih beda.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "diff",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "choose-next-b",
      "title": "Pilih Bilangan Berikutnya",
      "bookReference": "hlm. 99–100",
      "objective": "Pilih lanjut.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-b",
      "title": "Cerita Diagram Bilangan",
      "bookReference": "hlm. 98–100",
      "objective": "Cerita + rantai.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-next-b",
      "title": "Tulis Suku Berikutnya",
      "bookReference": "hlm. 97–100",
      "objective": "Menulis lanjut.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "13",
      "wordLarge": "LANJUT",
      "mathNotation": "a_n"
    },
    {
      "stage": "Abstract",
      "gameType": "write-beda-b",
      "title": "Tulis Beda Bilangan",
      "bookReference": "hlm. 97–98",
      "objective": "Menulis beda.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "+3",
      "wordLarge": "BEDA",
      "mathNotation": "d"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-jenis-b",
      "title": "Pilih Jenis Bilangan",
      "bookReference": "hlm. 98",
      "objective": "Membesar/mengecil.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "📈",
      "wordLarge": "JENIS",
      "mathNotation": "jenis"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-b",
      "title": "Urutkan Suku Bilangan",
      "bookReference": "hlm. 96–99",
      "objective": "Mengurutkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "symbolLarge": "3<5<7",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-b",
      "title": "Jodohkan Notasi Bilangan",
      "bookReference": "hlm. 97–100",
      "objective": "Jodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "symbolLarge": "1,4,7",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-b",
      "title": "Memori Notasi Bilangan",
      "bookReference": "hlm. 97",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "symbolLarge": "-5",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-b",
      "title": "Benar atau Salah: Pola Bilangan",
      "bookReference": "hlm. 96–99",
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
      "title": "Detektif Pola Bilangan",
      "bookReference": "hlm. 96–100",
      "objective": "Petunjuk → suku.",
      "mechanicDescription": "Empat soal.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-b",
      "title": "Peta Konsep Pola Bilangan",
      "bookReference": "hlm. 96–98",
      "objective": "Mengisi kotak.",
      "mechanicDescription": "Satu peta.",
      "voiceGuide": "Pilih opsi.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-b",
      "title": "Cerita Angka Pola Bilangan",
      "bookReference": "hlm. 98–100",
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
      "ikon": "🔢",
      "nama": "Definisi",
      "isi": "Pola bilangan adalah susunan bilangan beraturan.",
      "suara": "Ada aturan penyusunan."
    },
    {
      "ikon": "➖",
      "nama": "Beda",
      "isi": "Hitung selisih suku berurutan; biasanya tetap.",
      "suara": "Selisih tetap = beda."
    },
    {
      "ikon": "📈",
      "nama": "Jenis",
      "isi": "Beda positif membesarkan; beda negatif mengecilkan.",
      "suara": "Tanda beda menentukan arah."
    },
    {
      "ikon": "🥚",
      "nama": "Cerita",
      "isi": "Masalah telur, rak, kursi, TV diselesaikan dengan pola yang sama.",
      "suara": "Cerita = deret dengan beda."
    }
  ],
  "poinSuara": "Empat poin pola bilangan.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Definisi",
        "warna": "#FDE68A"
      },
      {
        "teks": "Beda",
        "warna": "#BBF7D0"
      },
      {
        "teks": "Jenis",
        "warna": "#BFDBFE"
      },
      {
        "teks": "Cerita",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Berlatih: kerjakan latihan 2 hlm. 99–100 (lanjutkan deret dan cerita).",
  "refleksi": [
    "Aku mencari beda.",
    "Aku menentukan jenis.",
    "Aku menulis suku berikutnya.",
    "Aku menyelesaikan cerita pola."
  ]
};

export const SUB_BAB_K4B3: SubBabNaskah[] = [SUB_A43, SUB_B43];
export const semuaAdeganK4B3 = SUB_BAB_K4B3.flatMap((s) => s.videos.flatMap((v) => v.adegan));
