/**
 * Naskah murni Matematika Kelas 5 Bab 3 (Bilangan Pecahan): Sub-Bab A–C.
 * Sumber: Buku Siswa Matematika Kelas V Kemendikbudristek Bab 3 hlm. 63–104.
 * Satu sumber: buat-k5-bab3.mjs → kelas5-bab3.json. Tanpa React/jaringan.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K5B3_META = {
  "chapterId": "k5-mat-bab3",
  "phaseCode": "FASE_C",
  "grade": 5,
  "subjectLabel": "MATEMATIKA - KELAS 5 SD",
  "title": "BAB 3: BILANGAN PECAHAN",
  "silabusElemen": "🌈 Fase C • Elemen Bilangan: Membandingkan, Mengurutkan, Penjumlahan, dan Pengurangan Pecahan (Kelas 5 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A53: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Banding Pecahan)",
  "fullTitle": "Sub-Bab A: Membandingkan dan Mengurutkan Pecahan",
  "targetDescription": "Siswa membandingkan dan mengurutkan pecahan biasa serta campuran dengan menyamakan bentuk, memakai garis bilangan, dan strategi pembilang/penyebut sesuai Buku Siswa Kelas V Bab 3.",
  "secondaryBg": "#FFEDD5",
  "secondaryBorder": "#EA580C",
  "secondaryText": "#7C2D12",
  "silabus": {
    "teksSuara": "Kita belajar membandingkan dan mengurutkan pecahan. Ingat pembilang dan penyebut. Ubah campuran menjadi biasa. Pakai garis bilangan. Bandingkan pembilang jika penyebut sama, atau penyebut jika pembilang sama. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa membandingkan dan mengurutkan bilangan pecahan.",
    "referensi": "Buku Siswa Matematika Kelas V Bab 3 Sub-Bab A hlm. 68–75; number line fractions; equivalent fractions (Van de Walle)."
  },
  "videos": [
    {
      "id": "K5B3A-V1",
      "judul": "Pembilang dan Penyebut",
      "subjudul": "Dasar",
      "adegan": [
        {
          "id": "K5B3A-V1-1",
          "judul": "Bagian keseluruhan",
          "ketukan": [
            "Pecahan adalah bagian dari keseluruhan.",
            "Angka atas disebut pembilang.",
            "Angka bawah disebut penyebut.",
            "Contoh satu per dua."
          ],
          "papan": [
            "bagian",
            "pembilang",
            "penyebut",
            "1/2"
          ]
        },
        {
          "id": "K5B3A-V1-2",
          "judul": "Bentuk pecahan",
          "ketukan": [
            "Ada pecahan biasa.",
            "Ada pecahan campuran.",
            "Campuran punya bilangan bulat.",
            "Contoh dua tiga per empat."
          ],
          "papan": [
            "biasa",
            "campuran",
            "bulat",
            "2 3/4"
          ]
        },
        {
          "id": "K5B3A-V1-3",
          "judul": "Jajanan pasar",
          "ketukan": [
            "Empat potong makanan.",
            "Kamu makan dua.",
            "Itu dua per empat.",
            "Boleh disederhanakan."
          ],
          "papan": [
            "4 potong",
            "makan 2",
            "2/4",
            "1/2"
          ]
        }
      ]
    },
    {
      "id": "K5B3A-V2",
      "judul": "Lompat Jauh Yohana",
      "subjudul": "Urut",
      "adegan": [
        {
          "id": "K5B3A-V2-1",
          "judul": "Tiga lompatan",
          "ketukan": [
            "Dua tiga per empat meter.",
            "Tiga satu per dua meter.",
            "Tujuh per delapan meter.",
            "Mana yang terjauh?"
          ],
          "papan": [
            "2 3/4",
            "3 1/2",
            "7/8",
            "?"
          ]
        },
        {
          "id": "K5B3A-V2-2",
          "judul": "Ubah ke biasa",
          "ketukan": [
            "Dua tiga per empat jadi sebelas per empat.",
            "Tiga satu per dua jadi tujuh per dua.",
            "Tujuh per delapan tetap.",
            "Siap dibandingkan."
          ],
          "papan": [
            "11/4",
            "7/2",
            "7/8",
            "siap"
          ]
        },
        {
          "id": "K5B3A-V2-3",
          "judul": "Garis bilangan",
          "ketukan": [
            "Letakkan di garis bilangan.",
            "Makin kanan makin besar.",
            "Terjauh tujuh per dua.",
            "Itu tiga satu per dua."
          ],
          "papan": [
            "garis",
            "kanan besar",
            "7/2",
            "terjauh"
          ]
        }
      ]
    },
    {
      "id": "K5B3A-V3",
      "judul": "Strategi Banding",
      "subjudul": "Cara",
      "adegan": [
        {
          "id": "K5B3A-V3-1",
          "judul": "Pembilang sama",
          "ketukan": [
            "Satu per dua dan satu per lima.",
            "Pembilang sama.",
            "Penyebut kecil lebih besar.",
            "Jadi satu per dua lebih besar."
          ],
          "papan": [
            "1/2",
            "1/5",
            "penyebut",
            "1/2 >"
          ]
        },
        {
          "id": "K5B3A-V3-2",
          "judul": "Penyebut sama",
          "ketukan": [
            "Tiga per delapan dan lima per delapan.",
            "Penyebut sama.",
            "Lihat pembilang.",
            "Lima lebih besar."
          ],
          "papan": [
            "3/8",
            "5/8",
            "pembilang",
            "5/8 >"
          ]
        },
        {
          "id": "K5B3A-V3-3",
          "judul": "Siap bermain",
          "ketukan": [
            "Samakan bentuk dulu.",
            "Bandingkan dengan hati-hati.",
            "Urutkan dari kecil atau besar.",
            "Ayo bermain!"
          ],
          "papan": [
            "samakan",
            "banding",
            "urut",
            "main"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Kenali p/q",
      "stepDesc": "Pembilang & penyebut",
      "icon": "📖",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Campuran?",
      "stepDesc": "Ubah ke biasa",
      "icon": "🔄",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Strategi",
      "stepDesc": "Sama p atau sama q",
      "icon": "⚖️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Garis",
      "stepDesc": "Letak nilai",
      "icon": "📏",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Tanda",
      "stepDesc": "< > =",
      "icon": "≷",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Urut",
      "stepDesc": "Naik/turun",
      "icon": "📶",
      "flowFrom": "5",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "Pembilang",
      "emoji": "⬆️",
      "countNum": 1,
      "countWord": "atas",
      "suara": "Angka atas."
    },
    {
      "judul": "Penyebut",
      "emoji": "⬇️",
      "countNum": 1,
      "countWord": "bawah",
      "suara": "Banyak bagian."
    },
    {
      "judul": "1/2 > 1/5",
      "emoji": "⚖️",
      "countNum": 1,
      "countWord": "lebih besar",
      "suara": "Pembilang sama."
    },
    {
      "judul": "2 3/4",
      "emoji": "🔄",
      "countNum": 11,
      "countWord": "11/4",
      "suara": "Ke biasa."
    },
    {
      "judul": "3 1/2",
      "emoji": "🔄",
      "countNum": 7,
      "countWord": "7/2",
      "suara": "Ke biasa."
    },
    {
      "judul": "Terjauh",
      "emoji": "🏃",
      "countNum": 1,
      "countWord": "3 1/2",
      "suara": "Lompat Yohana."
    },
    {
      "judul": "Garis",
      "emoji": "📏",
      "countNum": 1,
      "countWord": "kanan besar",
      "suara": "Urut nilai."
    },
    {
      "judul": "Sama q",
      "emoji": "👀",
      "countNum": 1,
      "countWord": "lihat p",
      "suara": "Strategi."
    },
    {
      "judul": "Sama p",
      "emoji": "👀",
      "countNum": 1,
      "countWord": "lihat q",
      "suara": "Strategi."
    },
    {
      "judul": "Siap B",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "jumlah",
      "suara": "Lanjut."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "banding-pecahan",
      "title": "Bandingkan Pecahan",
      "bookReference": "hlm. 68–75",
      "objective": "Membandingkan dua pecahan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih tanda.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "campuran-biasa",
      "title": "Campuran ke Biasa",
      "bookReference": "hlm. 71–72",
      "objective": "Mengubah bentuk.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "🔄",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-pecahan",
      "title": "Arti Pecahan",
      "bookReference": "hlm. 66–68",
      "objective": "Definisi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-banding",
      "title": "Pilah Besar/Kecil",
      "bookReference": "hlm. 68–70",
      "objective": "Memilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-banding",
      "title": "Jodohkan Pecahan",
      "bookReference": "hlm. 68–75",
      "objective": "Menjodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-banding",
      "title": "Memori Pecahan",
      "bookReference": "hlm. 68–75",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-pecahan",
      "title": "Ketuk Pecahan",
      "bookReference": "hlm. 68–75",
      "objective": "Mengetuk.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-banding",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 68–75",
      "objective": "Ketuk semua.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-banding",
      "title": "Cerita Lompat & Wingko",
      "bookReference": "hlm. 68–75",
      "objective": "Soal cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "🏃",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-pecahan",
      "title": "Urutkan Pecahan",
      "bookReference": "hlm. 71–75",
      "objective": "Mengurutkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "diagram-banding",
      "title": "Diagram Banding",
      "bookReference": "hlm. 68–70",
      "objective": "Baca tanda.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "compare",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "diagram-campuran",
      "title": "Diagram Campuran",
      "bookReference": "hlm. 71–72",
      "objective": "Ubah bentuk.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "mixed",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-a",
      "title": "Jodohkan Diagram A",
      "bookReference": "hlm. 68–75",
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
      "title": "Memori Diagram A",
      "bookReference": "hlm. 68–75",
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
      "title": "Tabel Banding",
      "bookReference": "hlm. 68–75",
      "objective": "Isi tabel.",
      "mechanicDescription": "Tiga tabel.",
      "voiceGuide": "Pilih.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-pa",
      "title": "Ketuk Semua Diagram A",
      "bookReference": "hlm. 68–75",
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
      "title": "Pilah Diagram A",
      "bookReference": "hlm. 68–70",
      "objective": "Pilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "choose-a",
      "title": "Pilih Pernyataan A",
      "bookReference": "hlm. 66–75",
      "objective": "Pilih.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jenis-pa",
      "title": "Pilih Arti Diagram A",
      "bookReference": "hlm. 66–68",
      "objective": "Definisi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "def",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-a",
      "title": "Cerita Diagram A",
      "bookReference": "hlm. 68–75",
      "objective": "Cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-banding",
      "title": "Tulis Tanda Banding",
      "bookReference": "hlm. 68–75",
      "objective": "Menulis tanda.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "≷",
      "wordLarge": "TANDA",
      "mathNotation": "banding"
    },
    {
      "stage": "Abstract",
      "gameType": "write-campuran",
      "title": "Tulis Bentuk Biasa",
      "bookReference": "hlm. 71–72",
      "objective": "Menulis.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "a b/c",
      "wordLarge": "BIASA",
      "mathNotation": "campuran"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-def-a",
      "title": "Pilih Definisi A",
      "bookReference": "hlm. 66–68",
      "objective": "Definisi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "p/q",
      "wordLarge": "DEFINISI",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-a",
      "title": "Urutkan Abstrak A",
      "bookReference": "hlm. 71–75",
      "objective": "Urut.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "symbolLarge": "naik",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-a",
      "title": "Jodohkan Notasi A",
      "bookReference": "hlm. 68–75",
      "objective": "Jodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "symbolLarge": "p/q",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-a",
      "title": "Memori Notasi A",
      "bookReference": "hlm. 68–75",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "symbolLarge": "p/q",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-a",
      "title": "Benar atau Salah: Banding",
      "bookReference": "hlm. 68–75",
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
      "title": "Detektif Pecahan",
      "bookReference": "hlm. 68–75",
      "objective": "Petunjuk.",
      "mechanicDescription": "Tiga soal.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-a",
      "title": "Peta Konsep Banding",
      "bookReference": "hlm. 68–75",
      "objective": "Peta.",
      "mechanicDescription": "Satu peta.",
      "voiceGuide": "Pilih opsi.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-a",
      "title": "Cerita Angka Banding",
      "bookReference": "hlm. 68–75",
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
      "ikon": "⬆️",
      "nama": "Pembilang",
      "isi": "Angka atas: berapa bagian diambil.",
      "suara": "Itu pembilang."
    },
    {
      "ikon": "⬇️",
      "nama": "Penyebut",
      "isi": "Angka bawah: banyak bagian sama besar.",
      "suara": "Itu penyebut."
    },
    {
      "ikon": "🔄",
      "nama": "Campuran",
      "isi": "Ubah ke biasa: (bulat×penyebut)+pembilang.",
      "suara": "Siap banding."
    },
    {
      "ikon": "📏",
      "nama": "Garis bilangan",
      "isi": "Kanan lebih besar, kiri lebih kecil.",
      "suara": "Urut dengan posisi."
    }
  ],
  "poinSuara": "Ingat: pembilang, penyebut, campuran ke biasa, dan garis bilangan.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Kenali bentuk",
        "warna": "#FDE68A"
      },
      {
        "teks": "ubah campuran",
        "warna": "#BBF7D0"
      },
      {
        "teks": "pilih strategi",
        "warna": "#BFDBFE"
      },
      {
        "teks": "beri tanda/urut",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: bandingkan 2/5 dan 3/7, lalu urutkan 1/2, 3/4, dan 5/8 dari terkecil.",
  "refleksi": [
    "Apa beda pembilang dan penyebut?",
    "Bagaimana mengubah 2 3/4 menjadi pecahan biasa?",
    "Mengapa 1/2 lebih besar dari 1/5?"
  ]
};

export const SUB_B53: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Jumlah Pecahan)",
  "fullTitle": "Sub-Bab B: Penjumlahan Bilangan Pecahan",
  "targetDescription": "Siswa menjumlahkan pecahan berpenyebut sama dan berbeda dengan menyamakan penyebut melalui KPK, termasuk konteks martabak, wingko, dan penghapus sesuai Buku Siswa Kelas V Bab 3.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Kita belajar penjumlahan pecahan. Penyebut harus sama. Jika belum sama, cari KPK lalu buat pecahan senilai. Jumlahkan pembilangnya. Hasil boleh disederhanakan. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menjumlahkan bilangan pecahan berpenyebut sama dan berbeda.",
    "referensi": "Buku Siswa Matematika Kelas V Bab 3 Sub-Bab B hlm. 76–90; adding fractions with LCD; area models."
  },
  "videos": [
    {
      "id": "K5B3B-V1",
      "judul": "Syarat Menjumlah",
      "subjudul": "Aturan",
      "adegan": [
        {
          "id": "K5B3B-V1-1",
          "judul": "Penyebut sama",
          "ketukan": [
            "Syarat utama: penyebut sama.",
            "Jika sudah sama, jumlahkan pembilang.",
            "Penyebut tetap.",
            "Contoh satu per delapan plus dua per delapan."
          ],
          "papan": [
            "syarat",
            "jumlah p",
            "q tetap",
            "3/8"
          ]
        },
        {
          "id": "K5B3B-V1-2",
          "judul": "Martabak Nisa",
          "ketukan": [
            "Delapan rasa sama besar.",
            "Lukas satu bagian.",
            "Komang dua bagian.",
            "Jumlah tiga per delapan."
          ],
          "papan": [
            "8 rasa",
            "1/8",
            "2/8",
            "3/8"
          ]
        },
        {
          "id": "K5B3B-V1-3",
          "judul": "Arsir gabung",
          "ketukan": [
            "Arsir bagian Lukas.",
            "Arsir bagian Komang.",
            "Gabungkan arsiran.",
            "Terlihat tiga dari delapan."
          ],
          "papan": [
            "arsir",
            "gabung",
            "3 dari 8",
            "jelas"
          ]
        }
      ]
    },
    {
      "id": "K5B3B-V2",
      "judul": "Penyebut Berbeda",
      "subjudul": "KPK",
      "adegan": [
        {
          "id": "K5B3B-V2-1",
          "judul": "Wingko",
          "ketukan": [
            "Lukas satu per dua.",
            "Komang satu per tiga.",
            "Penyebut beda.",
            "Perlu disamakan."
          ],
          "papan": [
            "1/2",
            "1/3",
            "beda",
            "samakan"
          ]
        },
        {
          "id": "K5B3B-V2-2",
          "judul": "Cari KPK",
          "ketukan": [
            "KPK dua dan tiga adalah enam.",
            "Satu per dua jadi tiga per enam.",
            "Satu per tiga jadi dua per enam.",
            "Jumlah lima per enam."
          ],
          "papan": [
            "KPK 6",
            "3/6",
            "2/6",
            "5/6"
          ]
        },
        {
          "id": "K5B3B-V2-3",
          "judul": "Sederhanakan",
          "ketukan": [
            "Kadang hasil bisa diperkecil.",
            "Pakai FPB pembilang dan penyebut.",
            "Contoh lima per sepuluh jadi satu per dua.",
            "Ayo lanjut."
          ],
          "papan": [
            "FPB",
            "5/10",
            "1/2",
            "lanjut"
          ]
        }
      ]
    },
    {
      "id": "K5B3B-V3",
      "judul": "Penghapus Lukas",
      "subjudul": "Latihan",
      "adegan": [
        {
          "id": "K5B3B-V3-1",
          "judul": "Sepuluh penghapus",
          "ketukan": [
            "Lukas punya sepuluh.",
            "Beri Asep dua.",
            "Beri Yohana tiga.",
            "Tulis sebagai pecahan."
          ],
          "papan": [
            "10",
            "2/10",
            "3/10",
            "pecahan"
          ]
        },
        {
          "id": "K5B3B-V3-2",
          "judul": "Jumlahkan",
          "ketukan": [
            "Dua per sepuluh plus tiga per sepuluh.",
            "Pembilang dua plus tiga.",
            "Hasil lima per sepuluh.",
            "Boleh satu per dua."
          ],
          "papan": [
            "2/10",
            "+3/10",
            "5/10",
            "1/2"
          ]
        },
        {
          "id": "K5B3B-V3-3",
          "judul": "Siap bermain",
          "ketukan": [
            "Ingat syarat penyebut.",
            "Pakai KPK jika perlu.",
            "Jumlahkan pembilang.",
            "Ayo bermain!"
          ],
          "papan": [
            "syarat",
            "KPK",
            "jumlah p",
            "main"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Cek penyebut",
      "stepDesc": "Sama atau beda?",
      "icon": "👀",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Jika beda",
      "stepDesc": "Cari KPK",
      "icon": "🎯",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Senilai",
      "stepDesc": "Ubah kedua pecahan",
      "icon": "🔄",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Jumlahkan p",
      "stepDesc": "q tetap",
      "icon": "➕",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Sederhanakan",
      "stepDesc": "Pakai FPB",
      "icon": "✨",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek cerita",
      "stepDesc": "Masuk akal?",
      "icon": "✅",
      "flowFrom": "5",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "Syarat",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "q sama",
      "suara": "Wajib."
    },
    {
      "judul": "1/8+2/8",
      "emoji": "🥞",
      "countNum": 3,
      "countWord": "3/8",
      "suara": "Martabak."
    },
    {
      "judul": "1/2+1/3",
      "emoji": "🍡",
      "countNum": 5,
      "countWord": "5/6",
      "suara": "Wingko."
    },
    {
      "judul": "KPK",
      "emoji": "🎯",
      "countNum": 1,
      "countWord": "samakan q",
      "suara": "Beda penyebut."
    },
    {
      "judul": "2/10+3/10",
      "emoji": "🧽",
      "countNum": 5,
      "countWord": "5/10",
      "suara": "Penghapus."
    },
    {
      "judul": "Sederhana",
      "emoji": "✨",
      "countNum": 1,
      "countWord": "FPB",
      "suara": "Perkecil."
    },
    {
      "judul": "Senilai",
      "emoji": "🔄",
      "countNum": 1,
      "countWord": "kali sama",
      "suara": "Ubah bentuk."
    },
    {
      "judul": "Model arsir",
      "emoji": "🎨",
      "countNum": 1,
      "countWord": "gabung",
      "suara": "Visual."
    },
    {
      "judul": "Pembilang",
      "emoji": "⬆️",
      "countNum": 1,
      "countWord": "dijumlah",
      "suara": "Inti."
    },
    {
      "judul": "Siap C",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "kurang",
      "suara": "Lanjut."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "jumlah-sama",
      "title": "Jumlah Penyebut Sama",
      "bookReference": "hlm. 76–80",
      "objective": "Menjumlahkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih hasil.",
      "emoji": "➕",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jumlah-beda",
      "title": "Jumlah Penyebut Beda",
      "bookReference": "hlm. 85–90",
      "objective": "Pakai KPK.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih hasil.",
      "emoji": "🧮",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-jumlah",
      "title": "Arti Penjumlahan",
      "bookReference": "hlm. 76–90",
      "objective": "Definisi & cara.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-jumlah",
      "title": "Pilah Sama/Beda",
      "bookReference": "hlm. 76–90",
      "objective": "Memilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-jumlah",
      "title": "Jodohkan Jumlah",
      "bookReference": "hlm. 76–90",
      "objective": "Menjodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-jumlah",
      "title": "Memori Jumlah",
      "bookReference": "hlm. 76–90",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-jumlah",
      "title": "Ketuk Hasil Jumlah",
      "bookReference": "hlm. 76–90",
      "objective": "Mengetuk.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-jumlah",
      "title": "Ketuk Semua Benar Jumlah",
      "bookReference": "hlm. 76–90",
      "objective": "Ketuk semua.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-jumlah",
      "title": "Cerita Martabak & Wingko",
      "bookReference": "hlm. 76–90",
      "objective": "Soal cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "🥞",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-jumlah",
      "title": "Urutkan Hasil Jumlah",
      "bookReference": "hlm. 76–90",
      "objective": "Mengurutkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "diagram-sama-b",
      "title": "Diagram Penyebut Sama",
      "bookReference": "hlm. 76–80",
      "objective": "Baca jumlah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "same",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "diagram-beda-b",
      "title": "Diagram Penyebut Beda",
      "bookReference": "hlm. 85–90",
      "objective": "Baca KPK.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "diff",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-b",
      "title": "Jodohkan Diagram B",
      "bookReference": "hlm. 76–90",
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
      "title": "Memori Diagram B",
      "bookReference": "hlm. 76–90",
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
      "title": "Tabel Jumlah",
      "bookReference": "hlm. 76–90",
      "objective": "Isi tabel.",
      "mechanicDescription": "Tiga tabel.",
      "voiceGuide": "Pilih.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-pb",
      "title": "Ketuk Semua Diagram B",
      "bookReference": "hlm. 76–90",
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
      "title": "Pilah Diagram B",
      "bookReference": "hlm. 76–90",
      "objective": "Pilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "choose-b",
      "title": "Pilih Pernyataan B",
      "bookReference": "hlm. 76–90",
      "objective": "Pilih.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jenis-pb",
      "title": "Pilih Arti Diagram B",
      "bookReference": "hlm. 76–90",
      "objective": "Definisi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "def",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-b",
      "title": "Cerita Diagram B",
      "bookReference": "hlm. 76–90",
      "objective": "Cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-sama-b",
      "title": "Tulis Jumlah Sama",
      "bookReference": "hlm. 76–80",
      "objective": "Menulis.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "+",
      "wordLarge": "SAMA",
      "mathNotation": "p/q"
    },
    {
      "stage": "Abstract",
      "gameType": "write-beda-b",
      "title": "Tulis Jumlah Beda",
      "bookReference": "hlm. 85–90",
      "objective": "Menulis.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "KPK+",
      "wordLarge": "BEDA",
      "mathNotation": "p/q"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-def-b",
      "title": "Pilih Definisi B",
      "bookReference": "hlm. 76–90",
      "objective": "Definisi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "Σ",
      "wordLarge": "DEFINISI",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-b",
      "title": "Urutkan Abstrak B",
      "bookReference": "hlm. 76–90",
      "objective": "Urut.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "symbolLarge": "naik",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-b",
      "title": "Jodohkan Notasi B",
      "bookReference": "hlm. 76–90",
      "objective": "Jodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "symbolLarge": "+",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-b",
      "title": "Memori Notasi B",
      "bookReference": "hlm. 76–90",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "symbolLarge": "+",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-b",
      "title": "Benar atau Salah: Jumlah",
      "bookReference": "hlm. 76–90",
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
      "title": "Detektif Jumlah",
      "bookReference": "hlm. 76–90",
      "objective": "Petunjuk.",
      "mechanicDescription": "Tiga soal.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-b",
      "title": "Peta Konsep Jumlah",
      "bookReference": "hlm. 76–90",
      "objective": "Peta.",
      "mechanicDescription": "Satu peta.",
      "voiceGuide": "Pilih opsi.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-b",
      "title": "Cerita Angka Jumlah",
      "bookReference": "hlm. 76–90",
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
      "ikon": "✅",
      "nama": "Syarat",
      "isi": "Penyebut harus sama sebelum menjumlahkan.",
      "suara": "Samakan dulu."
    },
    {
      "ikon": "🎯",
      "nama": "KPK",
      "isi": "Dipakai menyamakan penyebut berbeda.",
      "suara": "Lalu pecahan senilai."
    },
    {
      "ikon": "➕",
      "nama": "Jumlahkan p",
      "isi": "Pembilang dijumlah, penyebut tetap.",
      "suara": "Itu aturannya."
    },
    {
      "ikon": "✨",
      "nama": "Sederhanakan",
      "isi": "Bagi pembilang dan penyebut dengan FPB.",
      "suara": "Hasil rapi."
    }
  ],
  "poinSuara": "Ingat: syarat penyebut sama, KPK, jumlahkan pembilang, sederhanakan.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Cek penyebut",
        "warna": "#FDE68A"
      },
      {
        "teks": "KPK jika beda",
        "warna": "#BBF7D0"
      },
      {
        "teks": "jumlahkan pembilang",
        "warna": "#BFDBFE"
      },
      {
        "teks": "sederhanakan",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: hitung 2/5 + 1/4 dan 3/8 + 1/8, lalu ceritakan langkahnya.",
  "refleksi": [
    "Mengapa penyebut harus sama?",
    "Bagaimana menjumlahkan 1/2 dan 1/3?",
    "Kapan hasil perlu disederhanakan?"
  ]
};

export const SUB_C53: SubBabNaskah = {
  "id": "C",
  "codeTitle": "Sub-Bab C (Kurang Pecahan)",
  "fullTitle": "Sub-Bab C: Pengurangan Bilangan Pecahan",
  "targetDescription": "Siswa mengurangkan pecahan berpenyebut sama dan berbeda dengan menyamakan penyebut melalui KPK, termasuk konteks melukis kertas dan pembagian apel sesuai Buku Siswa Kelas V Bab 3.",
  "secondaryBg": "#FCE7F3",
  "secondaryBorder": "#DB2777",
  "secondaryText": "#9D174D",
  "silabus": {
    "teksSuara": "Kita belajar pengurangan pecahan. Penyebut harus sama. Jika belum, samakan dengan KPK. Kurangi pembilangnya. Hasil boleh disederhanakan. Kita bantu Lukas dan Yohana menghitung sisa kertas lukis. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa mengurangkan bilangan pecahan berpenyebut sama dan berbeda.",
    "referensi": "Buku Siswa Matematika Kelas V Bab 3 Sub-Bab C hlm. 91–102; subtracting fractions with LCD; residual area models."
  },
  "videos": [
    {
      "id": "K5B3C-V1",
      "judul": "Syarat Mengurangi",
      "subjudul": "Aturan",
      "adegan": [
        {
          "id": "K5B3C-V1-1",
          "judul": "Penyebut sama",
          "ketukan": [
            "Syarat pengurangan: penyebut sama.",
            "Kurangi pembilang.",
            "Penyebut tetap.",
            "Contoh dua per tiga kurang satu per tiga."
          ],
          "papan": [
            "syarat",
            "kurang p",
            "q tetap",
            "1/3"
          ]
        },
        {
          "id": "K5B3C-V1-2",
          "judul": "Lukas lukis",
          "ketukan": [
            "Harus dua per tiga kertas.",
            "Sudah satu per tiga.",
            "Sisa satu per tiga.",
            "Belum selesai."
          ],
          "papan": [
            "2/3",
            "1/3",
            "sisa",
            "1/3"
          ]
        },
        {
          "id": "K5B3C-V1-3",
          "judul": "Arsir sisa",
          "ketukan": [
            "Arsir yang harus dilukis.",
            "Tandai yang sudah.",
            "Sisa terlihat jelas.",
            "Itu jawaban."
          ],
          "papan": [
            "arsir",
            "sudah",
            "sisa",
            "jelas"
          ]
        }
      ]
    },
    {
      "id": "K5B3C-V2",
      "judul": "Penyebut Berbeda",
      "subjudul": "KPK",
      "adegan": [
        {
          "id": "K5B3C-V2-1",
          "judul": "Yohana lukis",
          "ketukan": [
            "Harus dua per tiga.",
            "Sudah satu per dua.",
            "Penyebut beda.",
            "Samakan dulu."
          ],
          "papan": [
            "2/3",
            "1/2",
            "beda",
            "samakan"
          ]
        },
        {
          "id": "K5B3C-V2-2",
          "judul": "Ke penyebut 6",
          "ketukan": [
            "Dua per tiga jadi empat per enam.",
            "Satu per dua jadi tiga per enam.",
            "Kurangi: satu per enam.",
            "Itu sisa Yohana."
          ],
          "papan": [
            "4/6",
            "3/6",
            "1/6",
            "sisa"
          ]
        },
        {
          "id": "K5B3C-V2-3",
          "judul": "Apel Asep",
          "ketukan": [
            "Delapan apel.",
            "Beri enam.",
            "Sisa dua dari delapan.",
            "Boleh satu per empat."
          ],
          "papan": [
            "8",
            "beri 6",
            "2/8",
            "1/4"
          ]
        }
      ]
    },
    {
      "id": "K5B3C-V3",
      "judul": "Campuran & Cek",
      "subjudul": "Lanjut",
      "adegan": [
        {
          "id": "K5B3C-V3-1",
          "judul": "Campuran",
          "ketukan": [
            "Pengurangan campuran.",
            "Ubah ke biasa dulu.",
            "Atau samakan bentuk.",
            "Lalu kurangi."
          ],
          "papan": [
            "campuran",
            "ke biasa",
            "samakan",
            "kurang"
          ]
        },
        {
          "id": "K5B3C-V3-2",
          "judul": "Cek masuk akal",
          "ketukan": [
            "Hasil harus lebih kecil dari pecahan awal.",
            "Jika tidak, cek lagi.",
            "Sederhanakan bila bisa.",
            "Siap bermain!"
          ],
          "papan": [
            "cek",
            "lebih kecil",
            "sederhana",
            "main"
          ]
        },
        {
          "id": "K5B3C-V3-3",
          "judul": "Bab 3 siap",
          "ketukan": [
            "Kita sudah banding.",
            "Sudah jumlah.",
            "Sudah kurang.",
            "Materi pecahan lengkap!"
          ],
          "papan": [
            "banding",
            "jumlah",
            "kurang",
            "selesai"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Cek penyebut",
      "stepDesc": "Sama atau beda?",
      "icon": "👀",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Jika beda",
      "stepDesc": "Cari KPK",
      "icon": "🎯",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Senilai",
      "stepDesc": "Ubah kedua pecahan",
      "icon": "🔄",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Kurangi p",
      "stepDesc": "q tetap",
      "icon": "➖",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Sederhanakan",
      "stepDesc": "Pakai FPB",
      "icon": "✨",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek sisa",
      "stepDesc": "Masuk akal?",
      "icon": "✅",
      "flowFrom": "5",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "Syarat",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "q sama",
      "suara": "Wajib."
    },
    {
      "judul": "2/3−1/3",
      "emoji": "🎨",
      "countNum": 1,
      "countWord": "1/3",
      "suara": "Lukas."
    },
    {
      "judul": "2/3−1/2",
      "emoji": "🖌️",
      "countNum": 1,
      "countWord": "1/6",
      "suara": "Yohana."
    },
    {
      "judul": "KPK",
      "emoji": "🎯",
      "countNum": 1,
      "countWord": "samakan q",
      "suara": "Beda penyebut."
    },
    {
      "judul": "6/8−2/8",
      "emoji": "🍎",
      "countNum": 4,
      "countWord": "4/8",
      "suara": "Boleh 1/2."
    },
    {
      "judul": "Sederhana",
      "emoji": "✨",
      "countNum": 1,
      "countWord": "FPB",
      "suara": "Perkecil."
    },
    {
      "judul": "Sisa",
      "emoji": "📉",
      "countNum": 1,
      "countWord": "awal−sudah",
      "suara": "Cerita lukis."
    },
    {
      "judul": "Campuran",
      "emoji": "🔄",
      "countNum": 1,
      "countWord": "ke biasa",
      "suara": "Aman."
    },
    {
      "judul": "Cek",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "hasil < awal",
      "suara": "Masuk akal."
    },
    {
      "judul": "Bab 3",
      "emoji": "🎉",
      "countNum": 1,
      "countWord": "A–C siap",
      "suara": "Materi."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "kurang-sama",
      "title": "Kurang Penyebut Sama",
      "bookReference": "hlm. 91–95",
      "objective": "Mengurangkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih hasil.",
      "emoji": "➖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "kurang-beda",
      "title": "Kurang Penyebut Beda",
      "bookReference": "hlm. 98–102",
      "objective": "Pakai KPK.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih hasil.",
      "emoji": "🧮",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-kurang",
      "title": "Arti Pengurangan",
      "bookReference": "hlm. 91–102",
      "objective": "Definisi & cara.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-kurang",
      "title": "Pilah Sama/Beda Kurang",
      "bookReference": "hlm. 91–102",
      "objective": "Memilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-kurang",
      "title": "Jodohkan Kurang",
      "bookReference": "hlm. 91–102",
      "objective": "Menjodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-kurang",
      "title": "Memori Kurang",
      "bookReference": "hlm. 91–102",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-kurang",
      "title": "Ketuk Hasil Kurang",
      "bookReference": "hlm. 91–102",
      "objective": "Mengetuk.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-kurang",
      "title": "Ketuk Semua Benar Kurang",
      "bookReference": "hlm. 91–102",
      "objective": "Ketuk semua.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-kurang",
      "title": "Cerita Lukis & Apel",
      "bookReference": "hlm. 91–102",
      "objective": "Soal cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "🎨",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-kurang",
      "title": "Urutkan Hasil Kurang",
      "bookReference": "hlm. 91–102",
      "objective": "Mengurutkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "diagram-sama-c",
      "title": "Diagram Kurang Sama",
      "bookReference": "hlm. 91–95",
      "objective": "Baca sisa.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "same",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "diagram-beda-c",
      "title": "Diagram Kurang Beda",
      "bookReference": "hlm. 98–102",
      "objective": "Baca KPK.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "diff",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-c",
      "title": "Jodohkan Diagram C",
      "bookReference": "hlm. 91–102",
      "objective": "Jodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-c",
      "title": "Memori Diagram C",
      "bookReference": "hlm. 91–102",
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
      "title": "Tabel Kurang",
      "bookReference": "hlm. 91–102",
      "objective": "Isi tabel.",
      "mechanicDescription": "Tiga tabel.",
      "voiceGuide": "Pilih.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-pc",
      "title": "Ketuk Semua Diagram C",
      "bookReference": "hlm. 91–102",
      "objective": "Ketuk semua.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-c",
      "title": "Pilah Diagram C",
      "bookReference": "hlm. 91–102",
      "objective": "Pilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "choose-c",
      "title": "Pilih Pernyataan C",
      "bookReference": "hlm. 91–102",
      "objective": "Pilih.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jenis-pc",
      "title": "Pilih Arti Diagram C",
      "bookReference": "hlm. 91–102",
      "objective": "Definisi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "def",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-c",
      "title": "Cerita Diagram C",
      "bookReference": "hlm. 91–102",
      "objective": "Cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-sama-c",
      "title": "Tulis Kurang Sama",
      "bookReference": "hlm. 91–95",
      "objective": "Menulis.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "−",
      "wordLarge": "SAMA",
      "mathNotation": "p/q"
    },
    {
      "stage": "Abstract",
      "gameType": "write-beda-c",
      "title": "Tulis Kurang Beda",
      "bookReference": "hlm. 98–102",
      "objective": "Menulis.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "KPK−",
      "wordLarge": "BEDA",
      "mathNotation": "p/q"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-def-c",
      "title": "Pilih Definisi C",
      "bookReference": "hlm. 91–102",
      "objective": "Definisi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "Δ",
      "wordLarge": "DEFINISI",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-c",
      "title": "Urutkan Abstrak C",
      "bookReference": "hlm. 91–102",
      "objective": "Urut.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "symbolLarge": "naik",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-c",
      "title": "Jodohkan Notasi C",
      "bookReference": "hlm. 91–102",
      "objective": "Jodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "symbolLarge": "−",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-c",
      "title": "Memori Notasi C",
      "bookReference": "hlm. 91–102",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "symbolLarge": "−",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-c",
      "title": "Benar atau Salah: Kurang",
      "bookReference": "hlm. 91–102",
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
      "title": "Detektif Kurang",
      "bookReference": "hlm. 91–102",
      "objective": "Petunjuk.",
      "mechanicDescription": "Tiga soal.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-c",
      "title": "Peta Konsep Kurang",
      "bookReference": "hlm. 91–102",
      "objective": "Peta.",
      "mechanicDescription": "Satu peta.",
      "voiceGuide": "Pilih opsi.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-c",
      "title": "Cerita Angka Kurang",
      "bookReference": "hlm. 91–102",
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
      "ikon": "✅",
      "nama": "Syarat",
      "isi": "Penyebut harus sama sebelum mengurangkan.",
      "suara": "Samakan dulu."
    },
    {
      "ikon": "🎯",
      "nama": "KPK",
      "isi": "Menyamakan penyebut berbeda.",
      "suara": "Lalu kurangi."
    },
    {
      "ikon": "➖",
      "nama": "Kurangi p",
      "isi": "Pembilang dikurangi, penyebut tetap.",
      "suara": "Itu aturannya."
    },
    {
      "ikon": "📉",
      "nama": "Sisa",
      "isi": "Yang belum dikerjakan = harus − sudah.",
      "suara": "Cek masuk akal."
    }
  ],
  "poinSuara": "Ingat: syarat penyebut sama, KPK, kurangi pembilang, cek sisa.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Cek penyebut",
        "warna": "#FDE68A"
      },
      {
        "teks": "KPK jika beda",
        "warna": "#BBF7D0"
      },
      {
        "teks": "kurangi pembilang",
        "warna": "#BFDBFE"
      },
      {
        "teks": "sederhanakan",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: hitung 5/6 − 1/4 dan 3/4 − 1/4, lalu jelaskan sisa dengan gambar.",
  "refleksi": [
    "Apa beda langkah jumlah dan kurang?",
    "Bagaimana menghitung 2/3 − 1/2?",
    "Mengapa hasil pengurangan harus lebih kecil dari pecahan awal?"
  ]
};

export const SUB_BAB_K5B3: SubBabNaskah[] = [SUB_A53, SUB_B53, SUB_C53];
export const semuaAdeganK5B3 = SUB_BAB_K5B3.flatMap((s) => s.videos.flatMap((v) => v.adegan));
