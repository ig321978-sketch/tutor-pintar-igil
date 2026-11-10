/**
 * Naskah murni Matematika Kelas 4 Bab 5 (Bangun Datar): Sub-Bab A–B.
 * Sumber: Buku Siswa Matematika Kelas IV Kemendikbudristek Bab 5 hlm. 139–176.
 * Satu sumber: buat-k4-bab5.mjs → kelas4-bab5.json. Tanpa React/jaringan.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K4B5_META = {
  "chapterId": "k4-mat-bab5",
  "phaseCode": "FASE_B",
  "grade": 4,
  "subjectLabel": "MATEMATIKA - KELAS 4 SD",
  "title": "BAB 5: BANGUN DATAR",
  "silabusElemen": "🌈 Fase B • Elemen Geometri: Ciri-Ciri Bangun Datar serta Komposisi dan Dekomposisi (Kelas 4 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A45: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Ciri-Ciri Bangun Datar)",
  "fullTitle": "Sub-Bab A: Ciri-Ciri Bangun Datar",
  "targetDescription": "Siswa mengenal segi banyak, membedakan beraturan/tak beraturan, mengelompokkan segitiga (sisi & sudut), serta menyebutkan ciri segiempat (persegi, persegi panjang, jajargenjang, belah ketupat, layang-layang, trapesium) sesuai Buku Siswa Kelas IV Bab 5.",
  "secondaryBg": "#FFEDD5",
  "secondaryBorder": "#EA580C",
  "secondaryText": "#7C2D12",
  "silabus": {
    "teksSuara": "Kita belajar ciri-ciri bangun datar. Segi banyak adalah kurva tertutup paling sedikit tiga ruas garis. Ada yang beraturan dan tak beraturan. Segitiga dikelompokkan menurut sisi dan sudut. Segiempat punya banyak keluarga: persegi, persegi panjang, dan lainnya. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menjelaskan ciri-ciri bangun datar segi banyak, segitiga, dan segiempat.",
    "referensi": "Buku Siswa Matematika Kelas IV Bab 5 Sub-Bab A hlm. 142–165; van Hiele level 0–1; property-based classification."
  },
  "videos": [
    {
      "id": "K4B5A-V1",
      "judul": "Apa itu Segi Banyak?",
      "subjudul": "Kurva tertutup ≥3 sisi",
      "adegan": [
        {
          "id": "K4B5A-V1-1",
          "judul": "Bukan sembarang gambar",
          "ketukan": [
            "Lihat garis yang tertutup.",
            "Paling sedikit tiga ruas lurus.",
            "Itulah segi banyak.",
            "Lingkaran bukan segi banyak."
          ],
          "papan": [
            "tertutup",
            "≥3 sisi",
            "segi banyak",
            "bukan lingkaran"
          ]
        },
        {
          "id": "K4B5A-V1-2",
          "judul": "Nama mengikuti sisi",
          "ketukan": [
            "Tiga sisi: segitiga.",
            "Empat sisi: segiempat.",
            "Lima sisi: segilima.",
            "Enam sisi: segienam."
          ],
          "papan": [
            "3",
            "4",
            "5",
            "6"
          ]
        },
        {
          "id": "K4B5A-V1-3",
          "judul": "Beraturan",
          "ketukan": [
            "Semua sisi sama panjang.",
            "Semua sudut sama besar.",
            "Itu segi banyak beraturan.",
            "Jika tidak, tak beraturan."
          ],
          "papan": [
            "sisi sama",
            "sudut sama",
            "beraturan",
            "tak"
          ]
        }
      ]
    },
    {
      "id": "K4B5A-V2",
      "judul": "Jenis Segitiga",
      "subjudul": "Sisi dan sudut",
      "adegan": [
        {
          "id": "K4B5A-V2-1",
          "judul": "Menurut sisi",
          "ketukan": [
            "Sama sisi: ketiga sisi sama.",
            "Sama kaki: dua sisi sama.",
            "Sembarang: semua sisi beda.",
            "Amati dengan cermat."
          ],
          "papan": [
            "sama sisi",
            "sama kaki",
            "sembarang",
            "amati"
          ]
        },
        {
          "id": "K4B5A-V2-2",
          "judul": "Menurut sudut",
          "ketukan": [
            "Lancip: semua sudut lancip.",
            "Siku-siku: ada sudut sembilan puluh.",
            "Tumpul: ada sudut lebih dari sembilan puluh.",
            "Satu segitiga satu jenis sudut utama."
          ],
          "papan": [
            "lancip",
            "siku-siku",
            "tumpul",
            "satu jenis"
          ]
        },
        {
          "id": "K4B5A-V2-3",
          "judul": "Contoh buku",
          "ketukan": [
            "Segitiga KLM siku di K.",
            "Segitiga PQR tumpul di P.",
            "Ciri membantu memberi nama.",
            "Siap kenali segiempat."
          ],
          "papan": [
            "KLM",
            "PQR",
            "ciri",
            "lanjut"
          ]
        }
      ]
    },
    {
      "id": "K4B5A-V3",
      "judul": "Keluarga Segiempat",
      "subjudul": "Persegi sampai trapesium",
      "adegan": [
        {
          "id": "K4B5A-V3-1",
          "judul": "Persegi & persegi panjang",
          "ketukan": [
            "Persegi: semua sisi sama, semua siku.",
            "Persegi panjang: siku semua,",
            "sisi berhadapan sama.",
            "Keduanya punya dua pasang sejajar."
          ],
          "papan": [
            "persegi",
            "persegi panjang",
            "siku",
            "sejajar"
          ]
        },
        {
          "id": "K4B5A-V3-2",
          "judul": "Jajargenjang & belah ketupat",
          "ketukan": [
            "Jajargenjang: dua pasang sejajar.",
            "Belah ketupat: semua sisi sama.",
            "Layang-layang: sisi berdekatan sama.",
            "Trapesium: satu pasang sejajar."
          ],
          "papan": [
            "jajargenjang",
            "belah ketupat",
            "layang",
            "trapesium"
          ]
        },
        {
          "id": "K4B5A-V3-3",
          "judul": "Siap berlatih",
          "ketukan": [
            "Ciri membedakan bangun.",
            "Hitung sisi dan sudut.",
            "Pilah beraturan.",
            "Ayo ke permainan."
          ],
          "papan": [
            "ciri",
            "hitung",
            "pilah",
            "main"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Segi banyak",
      "stepDesc": "Kurva tertutup ≥3 ruas",
      "icon": "🔷",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Beraturan?",
      "stepDesc": "Sisi & sudut sama / tidak",
      "icon": "✅",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Segitiga",
      "stepDesc": "Sisi & sudut",
      "icon": "🔺",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Segiempat",
      "stepDesc": "Persegi … trapesium",
      "icon": "⬛",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Segilima/enam",
      "stepDesc": "Nama = banyak sisi",
      "icon": "⬠",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Bukan segi banyak",
      "stepDesc": "Mis. lingkaran",
      "icon": "⭕",
      "flowFrom": "5",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "Segi banyak",
      "emoji": "🔷",
      "countNum": 3,
      "countWord": "min sisi",
      "suara": "Segi banyak paling sedikit tiga sisi lurus."
    },
    {
      "judul": "Beraturan",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "sama",
      "suara": "Sisi sama dan sudut sama."
    },
    {
      "judul": "Segitiga",
      "emoji": "🔺",
      "countNum": 3,
      "countWord": "sisi",
      "suara": "Tiga sisi dan tiga sudut."
    },
    {
      "judul": "Siku-siku",
      "emoji": "📐",
      "countNum": 90,
      "countWord": "derajat",
      "suara": "Ada satu sudut sembilan puluh derajat."
    },
    {
      "judul": "Persegi",
      "emoji": "⬛",
      "countNum": 4,
      "countWord": "siku",
      "suara": "Semua sisi sama, semua sudut siku."
    },
    {
      "judul": "Persegi panjang",
      "emoji": "▭",
      "countNum": 4,
      "countWord": "siku",
      "suara": "Semua sudut siku, sisi berhadapan sama."
    },
    {
      "judul": "Jajargenjang",
      "emoji": "▱",
      "countNum": 2,
      "countWord": "sejajar",
      "suara": "Dua pasang sisi sejajar."
    },
    {
      "judul": "Trapesium",
      "emoji": "⏢",
      "countNum": 1,
      "countWord": "sejajar",
      "suara": "Satu pasang sisi sejajar."
    },
    {
      "judul": "Segilima",
      "emoji": "⬠",
      "countNum": 5,
      "countWord": "sisi",
      "suara": "Lima sisi, lima sudut."
    },
    {
      "judul": "Siap Sub-Bab B",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "susun",
      "suara": "Berikutnya komposisi dan dekomposisi."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-sisi",
      "title": "Hitung Sisi dan Sudut",
      "bookReference": "hlm. 144–145",
      "objective": "Menghitung sisi/sudut.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih angka.",
      "emoji": "🔺",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jenis-bangun",
      "title": "Pilih Jenis Bangun",
      "bookReference": "hlm. 145–160",
      "objective": "Mengenali jenis.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih nama.",
      "emoji": "📐",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "beraturan",
      "title": "Beraturan atau Tidak",
      "bookReference": "hlm. 145–147",
      "objective": "Membedakan beraturan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "✅",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-aturan",
      "title": "Pilah Beraturan/Tak",
      "bookReference": "hlm. 145–147",
      "objective": "Memilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-ciri",
      "title": "Jodohkan Ciri Bangun",
      "bookReference": "hlm. 148–162",
      "objective": "Menjodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-ciri",
      "title": "Memori Ciri Bangun",
      "bookReference": "hlm. 148–160",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-bangun",
      "title": "Ketuk Bangun Diminta",
      "bookReference": "hlm. 146–161",
      "objective": "Mengetuk.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-ciri",
      "title": "Ketuk Semua Sesuai Ciri",
      "bookReference": "hlm. 145–160",
      "objective": "Ketuk semua.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-ciri",
      "title": "Cerita Rambu dan Meja",
      "bookReference": "hlm. 147–160",
      "objective": "Soal cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "🚦",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-sisi",
      "title": "Urutkan Banyak Sisi",
      "bookReference": "hlm. 144–145",
      "objective": "Mengurutkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "gambar-sisi",
      "title": "Diagram Hitung Sisi",
      "bookReference": "hlm. 145",
      "objective": "Baca diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "sides",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "gambar-sudut",
      "title": "Diagram Jenis Sudut",
      "bookReference": "hlm. 155–157",
      "objective": "Lancip/siku/tumpul.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "angle",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-a",
      "title": "Jodohkan Diagram Bangun",
      "bookReference": "hlm. 148–162",
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
      "title": "Memori Diagram Bangun",
      "bookReference": "hlm. 145–160",
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
      "title": "Tabel Sisi–Sudut",
      "bookReference": "hlm. 144–145",
      "objective": "Isi tabel.",
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
      "bookReference": "hlm. 145–160",
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
      "title": "Pilah Diagram Beraturan",
      "bookReference": "hlm. 145–147",
      "objective": "Pilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "segiempat",
      "title": "Ciri Segiempat",
      "bookReference": "hlm. 158–162",
      "objective": "Pilih ciri.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "quad",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "choose-bangun",
      "title": "Pilih Bangun Cocok",
      "bookReference": "hlm. 146–161",
      "objective": "Pilih bangun.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-a",
      "title": "Cerita Diagram Bangun",
      "bookReference": "hlm. 147–162",
      "objective": "Cerita + gambar.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-nama",
      "title": "Tulis Nama Bangun",
      "bookReference": "hlm. 145–160",
      "objective": "Menulis nama.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "△",
      "wordLarge": "NAMA",
      "mathNotation": "jenis"
    },
    {
      "stage": "Abstract",
      "gameType": "write-jumlah",
      "title": "Tulis Jumlah Sisi/Sudut",
      "bookReference": "hlm. 144–145",
      "objective": "Menulis angka.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "3/4/5",
      "wordLarge": "JUMLAH",
      "mathNotation": "sisi=sudut"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-jenis",
      "title": "Pilih Klasifikasi",
      "bookReference": "hlm. 145–157",
      "objective": "Beraturan/sudut.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "beraturan",
      "wordLarge": "JENIS",
      "mathNotation": "klasifikasi"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-a",
      "title": "Urutkan Banyak Sisi",
      "bookReference": "hlm. 144–145",
      "objective": "Mengurutkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "symbolLarge": "3<4<5",
      "wordLarge": "URUT",
      "mathNotation": "sisi"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-a",
      "title": "Jodohkan Notasi Ciri",
      "bookReference": "hlm. 148–162",
      "objective": "Jodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "symbolLarge": "3 sisi",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-a",
      "title": "Memori Notasi Ciri",
      "bookReference": "hlm. 145–160",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "symbolLarge": "persegi",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-a",
      "title": "Benar atau Salah: Ciri",
      "bookReference": "hlm. 142–162",
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
      "title": "Detektif Bangun Datar",
      "bookReference": "hlm. 145–162",
      "objective": "Petunjuk → bangun.",
      "mechanicDescription": "Empat soal.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-a",
      "title": "Peta Konsep Bangun",
      "bookReference": "hlm. 141–160",
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
      "title": "Cerita Angka Ciri",
      "bookReference": "hlm. 147–162",
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
      "ikon": "🔷",
      "nama": "Segi banyak",
      "isi": "Kurva tertutup dibatasi ≥3 ruas garis. Nama mengikuti banyak sisi.",
      "suara": "Segi banyak paling sedikit tiga sisi."
    },
    {
      "ikon": "✅",
      "nama": "Beraturan",
      "isi": "Semua sisi sama dan semua sudut sama.",
      "suara": "Beraturan berarti sisi dan sudut sama."
    },
    {
      "ikon": "🔺",
      "nama": "Segitiga",
      "isi": "Dikelompokkan menurut sisi dan menurut sudut.",
      "suara": "Segitiga punya jenis sisi dan jenis sudut."
    },
    {
      "ikon": "⬛",
      "nama": "Segiempat",
      "isi": "Persegi, persegi panjang, jajargenjang, belah ketupat, layang-layang, trapesium punya ciri berbeda.",
      "suara": "Tiap segiempat punya ciri khas."
    }
  ],
  "poinSuara": "Ingat empat kunci ciri bangun.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Segi banyak",
        "warna": "#FDE68A"
      },
      {
        "teks": "Beraturan",
        "warna": "#BBF7D0"
      },
      {
        "teks": "Segitiga",
        "warna": "#BFDBFE"
      },
      {
        "teks": "Segiempat",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: cari 5 benda berbentuk bangun datar. Catat banyak sisi/sudut dan apakah beraturan.",
  "refleksi": [
    "Apa beda persegi dan belah ketupat?",
    "Mengapa lingkaran bukan segi banyak?",
    "Bisakah segitiga tumpul sekaligus siku-siku?"
  ]
};

export const SUB_B45: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Komposisi dan Dekomposisi)",
  "fullTitle": "Sub-Bab B: Komposisi dan Dekomposisi Bangun Datar",
  "targetDescription": "Siswa menyusun (komposisi) dan menguraikan (dekomposisi) bangun datar dengan banyak cara, misalnya persegi ↔ 2 segitiga, segienam → 6 segitiga, serta konteks peta/tangram sesuai Buku Siswa Kelas IV Bab 5.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Kita belajar komposisi dan dekomposisi bangun datar. Menyusun bagian menjadi utuh disebut komposisi. Mengurai utuh menjadi bagian disebut dekomposisi. Satu bangun bisa disusun atau diurai dengan banyak cara. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa melakukan komposisi dan dekomposisi bangun datar.",
    "referensi": "Buku Siswa Matematika Kelas IV Bab 5 Sub-Bab B hlm. 166–176; composition/decomposition; tangram spatial reasoning."
  },
  "videos": [
    {
      "id": "K4B5B-V1",
      "judul": "Apa itu Komposisi?",
      "subjudul": "Bagian → utuh",
      "adegan": [
        {
          "id": "K4B5B-V1-1",
          "judul": "Susun",
          "ketukan": [
            "Ambil beberapa bangun kecil.",
            "Susun tanpa celah.",
            "Jadi satu bangun baru.",
            "Itu komposisi."
          ],
          "papan": [
            "bagian",
            "susun",
            "utuh",
            "komposisi"
          ]
        },
        {
          "id": "K4B5B-V1-2",
          "judul": "Contoh",
          "ketukan": [
            "Dua segitiga jadi persegi.",
            "Atau jadi persegi panjang.",
            "Tiga segitiga jadi trapesium.",
            "Banyak cara mungkin."
          ],
          "papan": [
            "2△→□",
            "2△→▭",
            "3△→⏢",
            "banyak cara"
          ]
        },
        {
          "id": "K4B5B-V1-3",
          "judul": "Rumah",
          "ketukan": [
            "Persegi sebagai badan.",
            "Dua segitiga sebagai atap.",
            "Itu menyusun rumah.",
            "Kreatif dan teliti."
          ],
          "papan": [
            "persegi",
            "atap",
            "rumah",
            "kreatif"
          ]
        }
      ]
    },
    {
      "id": "K4B5B-V2",
      "judul": "Apa itu Dekomposisi?",
      "subjudul": "Utuh → bagian",
      "adegan": [
        {
          "id": "K4B5B-V2-1",
          "judul": "Urai",
          "ketukan": [
            "Ambil satu bangun utuh.",
            "Iris atau uraikan.",
            "Jadi beberapa bangun.",
            "Itu dekomposisi."
          ],
          "papan": [
            "utuh",
            "iris",
            "bagian",
            "dekomposisi"
          ]
        },
        {
          "id": "K4B5B-V2-2",
          "judul": "Contoh buku",
          "ketukan": [
            "Persegi diiris diagonal.",
            "Hasil dua segitiga.",
            "Segienam jadi enam segitiga.",
            "Luas total tetap sama."
          ],
          "papan": [
            "diagonal",
            "2△",
            "6△",
            "luas tetap"
          ]
        },
        {
          "id": "K4B5B-V2-3",
          "judul": "Peta",
          "ketukan": [
            "Peta bisa diurai jadi bangun.",
            "Latihan mengamati bentuk.",
            "Lalu disusun kembali.",
            "Itu latihan spasial."
          ],
          "papan": [
            "peta",
            "urai",
            "susun lagi",
            "spasial"
          ]
        }
      ]
    },
    {
      "id": "K4B5B-V3",
      "judul": "Banyak Cara",
      "subjudul": "Satu soal, banyak jawaban",
      "adegan": [
        {
          "id": "K4B5B-V3-1",
          "judul": "Tidak hanya satu",
          "ketukan": [
            "Satu bangun bisa diurai beda cara.",
            "Satu target bisa disusun beda cara.",
            "Buku menekankan kreativitas.",
            "Coba dan bandingkan."
          ],
          "papan": [
            "banyak cara",
            "urai",
            "susun",
            "kreatif"
          ]
        },
        {
          "id": "K4B5B-V3-2",
          "judul": "Cek hasil",
          "ketukan": [
            "Pastikan tanpa celah.",
            "Tanpa tumpang tindih.",
            "Bagian menutup utuh.",
            "Itu syarat baik."
          ],
          "papan": [
            "tanpa celah",
            "rapat",
            "menutup",
            "syarat"
          ]
        },
        {
          "id": "K4B5B-V3-3",
          "judul": "Siap main",
          "ketukan": [
            "Kamu siap menyusun.",
            "Dan mengurai.",
            "Pilih komposisi atau dekomposisi.",
            "Ayo bermain."
          ],
          "papan": [
            "susun",
            "urai",
            "pilih",
            "main"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Komposisi",
      "stepDesc": "Bagian → utuh",
      "icon": "🧩",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Dekomposisi",
      "stepDesc": "Utuh → bagian",
      "icon": "✂️",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Contoh dasar",
      "stepDesc": "□ ↔ 2△",
      "icon": "⬛",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Segienam",
      "stepDesc": "→ 6 segitiga",
      "icon": "⬡",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Banyak cara",
      "stepDesc": "Satu soal banyak jawaban",
      "icon": "💡",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Konteks",
      "stepDesc": "Peta & tangram",
      "icon": "🗺️",
      "flowFrom": "5",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "Komposisi",
      "emoji": "🧩",
      "countNum": 1,
      "countWord": "susun",
      "suara": "Menyusun bagian menjadi bangun utuh."
    },
    {
      "judul": "Dekomposisi",
      "emoji": "✂️",
      "countNum": 1,
      "countWord": "urai",
      "suara": "Mengurai bangun utuh menjadi bagian."
    },
    {
      "judul": "□ → 2△",
      "emoji": "⬛",
      "countNum": 2,
      "countWord": "segitiga",
      "suara": "Persegi diiris jadi dua segitiga."
    },
    {
      "judul": "2△ → □",
      "emoji": "🔺",
      "countNum": 2,
      "countWord": "susun",
      "suara": "Dua segitiga disusun jadi persegi."
    },
    {
      "judul": "⬡ → 6△",
      "emoji": "⬡",
      "countNum": 6,
      "countWord": "urai",
      "suara": "Segienam jadi enam segitiga."
    },
    {
      "judul": "3△ → ⏢",
      "emoji": "🔺",
      "countNum": 3,
      "countWord": "trapesium",
      "suara": "Tiga segitiga jadi trapesium."
    },
    {
      "judul": "Rumah",
      "emoji": "🏠",
      "countNum": 1,
      "countWord": "susun",
      "suara": "Persegi plus segitiga jadi rumah."
    },
    {
      "judul": "Tanpa celah",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "rapat",
      "suara": "Susunan rapat tanpa tumpang tindih."
    },
    {
      "judul": "Banyak cara",
      "emoji": "💡",
      "countNum": 1,
      "countWord": "kreatif",
      "suara": "Satu bangun bisa banyak cara urai/susun."
    },
    {
      "judul": "Bab 5 siap",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "Materi",
      "suara": "Ciri dan komposisi lengkap untuk Materi."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "baca-resep",
      "title": "Baca Resep Susun/Urai",
      "bookReference": "hlm. 167–173",
      "objective": "Membaca komposisi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jenis-aksi",
      "title": "Komposisi atau Dekomposisi",
      "bookReference": "hlm. 167–170",
      "objective": "Membedakan aksi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "🔀",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "hasil-susun",
      "title": "Hasil Penyusunan",
      "bookReference": "hlm. 167–169",
      "objective": "Menebak hasil.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "🏠",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-aksi",
      "title": "Pilah Susun/Urai",
      "bookReference": "hlm. 167–173",
      "objective": "Memilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-resep",
      "title": "Jodohkan Resep Bangun",
      "bookReference": "hlm. 167–173",
      "objective": "Menjodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-resep",
      "title": "Memori Komposisi",
      "bookReference": "hlm. 167–171",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-resep",
      "title": "Ketuk Resep Diminta",
      "bookReference": "hlm. 168–173",
      "objective": "Mengetuk.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-aksi",
      "title": "Ketuk Semua Jenis Aksi",
      "bookReference": "hlm. 167–170",
      "objective": "Ketuk semua.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-komp",
      "title": "Cerita Potong dan Susun",
      "bookReference": "hlm. 167–173",
      "objective": "Soal cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "✂️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-bagian",
      "title": "Urutkan Banyak Bagian",
      "bookReference": "hlm. 168–173",
      "objective": "Mengurutkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "diagram-susun",
      "title": "Diagram Menyusun",
      "bookReference": "hlm. 167–169",
      "objective": "Baca susunan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "compose",
      "numberA": 2,
      "numberB": 1
    },
    {
      "stage": "Picture",
      "gameType": "diagram-urai",
      "title": "Diagram Mengurai",
      "bookReference": "hlm. 170–173",
      "objective": "Baca uraian.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "decompose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-b",
      "title": "Jodohkan Diagram Resep",
      "bookReference": "hlm. 167–173",
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
      "title": "Memori Diagram Resep",
      "bookReference": "hlm. 168–171",
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
      "title": "Tabel Bagian → Hasil",
      "bookReference": "hlm. 167–173",
      "objective": "Isi tabel.",
      "mechanicDescription": "Tiga tabel.",
      "voiceGuide": "Pilih.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-b",
      "title": "Ketuk Semua Diagram Aksi",
      "bookReference": "hlm. 167–170",
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
      "title": "Pilah Diagram Aksi",
      "bookReference": "hlm. 167–173",
      "objective": "Pilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "banyak-cara",
      "title": "Banyak Cara Urai/Susun",
      "bookReference": "hlm. 173–175",
      "objective": "Pilih pernyataan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "ways",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "choose-hasil",
      "title": "Pilih Hasil Cocok",
      "bookReference": "hlm. 168–173",
      "objective": "Pilih hasil.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-b",
      "title": "Cerita Diagram Resep",
      "bookReference": "hlm. 167–175",
      "objective": "Cerita + gambar.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-aksi",
      "title": "Tulis Komposisi/Dekomposisi",
      "bookReference": "hlm. 167–170",
      "objective": "Menulis istilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "↔",
      "wordLarge": "AKSI",
      "mathNotation": "istilah"
    },
    {
      "stage": "Abstract",
      "gameType": "write-hasil",
      "title": "Tulis Hasil Urai/Susun",
      "bookReference": "hlm. 168–173",
      "objective": "Menulis hasil.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "2△",
      "wordLarge": "HASIL",
      "mathNotation": "resep"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-jenis-b",
      "title": "Pilih Jenis Aksi",
      "bookReference": "hlm. 167–170",
      "objective": "Klasifikasi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "komposisi",
      "wordLarge": "JENIS",
      "mathNotation": "klasifikasi"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-b",
      "title": "Urutkan Banyak Bagian",
      "bookReference": "hlm. 168–173",
      "objective": "Mengurutkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "symbolLarge": "2<3<6",
      "wordLarge": "URUT",
      "mathNotation": "bagian"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-b",
      "title": "Jodohkan Notasi Resep",
      "bookReference": "hlm. 167–173",
      "objective": "Jodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "symbolLarge": "□→2△",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-b",
      "title": "Memori Notasi Resep",
      "bookReference": "hlm. 168–171",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "symbolLarge": "urai",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-b",
      "title": "Benar atau Salah: Resep",
      "bookReference": "hlm. 167–175",
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
      "title": "Detektif Komposisi",
      "bookReference": "hlm. 167–175",
      "objective": "Petunjuk → jawaban.",
      "mechanicDescription": "Empat soal.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-b",
      "title": "Peta Konsep Komposisi",
      "bookReference": "hlm. 167–173",
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
      "title": "Cerita Angka Resep",
      "bookReference": "hlm. 167–175",
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
      "ikon": "🧩",
      "nama": "Komposisi",
      "isi": "Menyusun beberapa bangun menjadi satu bangun baru.",
      "suara": "Komposisi artinya menyusun."
    },
    {
      "ikon": "✂️",
      "nama": "Dekomposisi",
      "isi": "Mengurai satu bangun menjadi beberapa bangun.",
      "suara": "Dekomposisi artinya mengurai."
    },
    {
      "ikon": "⬛",
      "nama": "Resep dasar",
      "isi": "Persegi ↔ 2 segitiga; segienam → 6 segitiga.",
      "suara": "Hafalkan resep dasar."
    },
    {
      "ikon": "💡",
      "nama": "Banyak cara",
      "isi": "Satu bangun boleh disusun/diurai dengan cara berbeda.",
      "suara": "Kreativitas diizinkan."
    }
  ],
  "poinSuara": "Ingat empat kunci komposisi.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Komposisi",
        "warna": "#FDE68A"
      },
      {
        "teks": "Dekomposisi",
        "warna": "#BBF7D0"
      },
      {
        "teks": "Resep dasar",
        "warna": "#BFDBFE"
      },
      {
        "teks": "Banyak cara",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: potong kertas jadi 2 segitiga lalu susun lagi jadi persegi. Coba cara lain.",
  "refleksi": [
    "Apa beda komposisi dan dekomposisi?",
    "Mengapa luas total tetap saat mengurai?",
    "Sebut satu cara mengurai segienam."
  ]
};

export const SUB_BAB_K4B5: SubBabNaskah[] = [SUB_A45, SUB_B45];
export const semuaAdeganK4B5 = SUB_BAB_K4B5.flatMap((s) => s.videos.flatMap((v) => v.adegan));
