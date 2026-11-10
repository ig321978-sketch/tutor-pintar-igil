/**
 * Naskah murni Matematika Kelas 4 Bab 2 (Pecahan): Sub-Bab A–C.
 * Sumber: Buku Siswa Matematika Kelas IV Kemendikbudristek Bab 2 hlm. 57–70.
 * Satu sumber: buat-k4-bab2.mjs → kelas4-bab2.json. Tanpa React/jaringan.
 */
import type { GameNaskah, SubBabNaskah } from "./naskah-k2b2";

export const K4B2_META = {
  "chapterId": "k4-mat-bab2",
  "phaseCode": "FASE_B",
  "grade": 4,
  "subjectLabel": "MATEMATIKA - KELAS 4 SD",
  "title": "BAB 2: PECAHAN",
  "silabusElemen": "🌈 Fase B • Elemen Bilangan: Pecahan Pembilang Satu, Penyebut Sama, dan Pecahan Senilai (Kelas 4 SD/MI)",
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
    "referensi": "Buku Siswa Matematika Kelas IV Bab 2 Sub-Bab A hlm. 57–62; unit fraction & area model."
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
            "Tulis sebagai pecahan."
          ],
          "papan": [
            "arsir",
            "seluruh",
            "diarsir",
            "pecahan"
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
            "Ditulis 1/10 < 1/5."
          ],
          "papan": [
            "1/10",
            "1/5",
            "<",
            "1/10 < 1/5"
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
            "Siap lanjut penyebut sama."
          ],
          "papan": [
            "pembilang 1",
            "penyebut",
            "bagian kecil",
            "siap B"
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
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "pizza-bagi",
      "title": "Potong Pizza Sama Besar",
      "bookReference": "hlm. 58–59 (pizza 1/4)",
      "objective": "Mengenal 1 dari n bagian.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih pecahan.",
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
      "objective": "Membaca diagram lingkaran.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih pecahan.",
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
      "objective": "Menulis notasi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih notasi.",
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
    "referensi": "Buku Siswa Matematika Kelas IV Bab 2 Sub-Bab B hlm. 63–65; common denominator comparison."
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
            "Aturan sama: lihat pembilang."
          ],
          "papan": [
            "penyebut 10",
            "2 vs 1",
            ">",
            "aturan"
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
            "Ayo kerjakan dengan teliti."
          ],
          "papan": [
            "> atau <",
            "cek penyebut",
            "cek pembilang",
            "teliti"
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
            "Siap Sub-Bab C."
          ],
          "papan": [
            "bentuk beda",
            "nilai sama",
            "2/6=1/3",
            "siap C"
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
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "baca-sama",
      "title": "Baca Pecahan Penyebut Sama",
      "bookReference": "hlm. 63–64",
      "objective": "Membaca p/q.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih pecahan.",
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
      "objective": "Membaca batang.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
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
      "objective": "Menulis notasi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
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
    "referensi": "Buku Siswa Matematika Kelas IV Bab 2 Sub-Bab C hlm. 66–70; equivalent fractions."
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
            "1/4 senilai 4/16."
          ],
          "papan": [
            "1/4",
            "4/16",
            "sama besar",
            "senilai"
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
            "Itulah kunci senilai."
          ],
          "papan": [
            "bukan salah satu",
            "keduanya",
            "bilangan sama",
            "kunci"
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
            "Simpan dulu untuk Sub-Bab D."
          ],
          "papan": [
            "biasa ok",
            "desimal",
            "1/10",
            "nanti D"
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
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "coklat-senilai",
      "title": "Coklat Putu 2/6 = 1/3",
      "bookReference": "hlm. 67–68",
      "objective": "Mengenal senilai dari benda.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih sama/beda.",
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
      "objective": "Membaca grid arsir.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih sama/beda.",
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
      "objective": "Menilai kesamaan nilai.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih sama/beda.",
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
  ]
};

export const SUB_BAB_K4B2: SubBabNaskah[] = [SUB_A42, SUB_B42, SUB_C42];
export const semuaAdeganK4B2 = SUB_BAB_K4B2.flatMap((s) => s.videos.flatMap((v) => v.adegan));
