/**
 * Naskah murni Matematika Kelas 4 Bab 6 (Piktogram dan Diagram Batang): Sub-Bab A–B.
 * Sumber: Buku Siswa Matematika Kelas IV Kemendikbudristek Bab 6 hlm. 177–194.
 * Satu sumber: buat-k4-bab6.mjs → kelas4-bab6.json. Tanpa React/jaringan.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K4B6_META = {
  "chapterId": "k4-mat-bab6",
  "phaseCode": "FASE_B",
  "grade": 4,
  "subjectLabel": "MATEMATIKA - KELAS 4 SD",
  "title": "BAB 6: PIKTOGRAM DAN DIAGRAM BATANG",
  "silabusElemen": "🌈 Fase B • Elemen Data dan Ketidakpastian: Piktogram serta Diagram Batang (Kelas 4 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A46: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Piktogram)",
  "fullTitle": "Sub-Bab A: Piktogram",
  "targetDescription": "Siswa menyajikan dan menafsirkan data dalam piktogram (diagram gambar), termasuk skala 1 dan skala lebih dari 1, menentukan paling banyak/sedikit serta jumlah keseluruhan sesuai Buku Siswa Kelas IV Bab 6.",
  "secondaryBg": "#FFEDD5",
  "secondaryBorder": "#EA580C",
  "secondaryText": "#7C2D12",
  "silabus": {
    "teksSuara": "Kita belajar piktogram. Piktogram adalah diagram yang memakai gambar untuk menyatakan banyak tiap kategori. Kadang satu gambar berarti satu benda, kadang satu gambar berarti beberapa. Kita baca dengan menghitung gambar lalu mengalikan skala. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menampilkan dan menafsirkan data dalam bentuk diagram gambar (piktogram).",
    "referensi": "Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 6 Sub-Bab A)."
  },
  "videos": [
    {
      "id": "K4B6A-V1",
      "judul": "Apa itu Piktogram?",
      "subjudul": "Diagram gambar",
      "adegan": [
        {
          "id": "K4B6A-V1-1",
          "judul": "Data butuh gambar",
          "ketukan": [
            "Ada banyak benda di kelas.",
            "Kita ingin menyajikannya rapi.",
            "Pakai gambar yang mewakili banyak.",
            "Itulah piktogram."
          ],
          "papan": [
            "data",
            "gambar",
            "mewakili",
            "piktogram"
          ]
        },
        {
          "id": "K4B6A-V1-2",
          "judul": "Satu gambar satu arti",
          "ketukan": [
            "Setiap gambar harus sama.",
            "Satu gambar bisa berarti satu benda.",
            "Atau satu gambar berarti beberapa.",
            "Baca keterangan skalanya."
          ],
          "papan": [
            "gambar sama",
            "skala 1",
            "skala n",
            "baca legenda"
          ]
        },
        {
          "id": "K4B6A-V1-3",
          "judul": "Baca paling banyak",
          "ketukan": [
            "Hitung gambar tiap baris.",
            "Kalikan dengan skala.",
            "Bandingkan hasilnya.",
            "Itu paling banyak atau sedikit.",
            "METODE LUAR. Kunci Piktogram: Satu gambar bisa mewakili lebih dari satu benda."
          ],
          "papan": [
            "hitung",
            "× skala",
            "banding",
            "ekstrem",
            "METODE LUAR · Kunci Piktogram"
          ]
        }
      ]
    },
    {
      "id": "K4B6A-V2",
      "judul": "Skala pada Piktogram",
      "subjudul": "1 gambar = n",
      "adegan": [
        {
          "id": "K4B6A-V2-1",
          "judul": "Skala satu",
          "ketukan": [
            "Satu gambar sama dengan satu siswa.",
            "Empat gambar sama dengan empat siswa.",
            "Mudah dihitung.",
            "Cocok untuk bilangan kecil."
          ],
          "papan": [
            "1 = 1",
            "4 gambar",
            "4 siswa",
            "mudah"
          ]
        },
        {
          "id": "K4B6A-V2-2",
          "judul": "Skala empat",
          "ketukan": [
            "Satu gambar bisa sama dengan empat siswa.",
            "Tiga gambar menjadi dua belas.",
            "Hemat ruang gambar.",
            "Tetap akurat jika skala jelas."
          ],
          "papan": [
            "1 = 4",
            "3 gambar",
            "12",
            "hemat"
          ]
        },
        {
          "id": "K4B6A-V2-3",
          "judul": "Jangan lupa skala",
          "ketukan": [
            "Tanpa skala, gambar membingungkan.",
            "Selalu baca baris keterangan.",
            "Nilai = gambar dikali skala.",
            "Latih sampai mahir.",
            "METODE LUAR. Turus Kategori: Hitung frekuensi tiap kategori dengan turus."
          ],
          "papan": [
            "wajib skala",
            "keterangan",
            "nilai",
            "latihan",
            "METODE LUAR · Turus Kategori"
          ]
        }
      ]
    },
    {
      "id": "K4B6A-V3",
      "judul": "Mainan dan Warna",
      "subjudul": "Contoh buku",
      "adegan": [
        {
          "id": "K4B6A-V3-1",
          "judul": "Mainan Karel",
          "ketukan": [
            "Mobil enam, robot empat.",
            "Pesawat tiga, puzzle satu.",
            "Kelereng sembilan.",
            "Total dua puluh tiga."
          ],
          "papan": [
            "6 4 3 1",
            "9",
            "total 23",
            "paling banyak"
          ]
        },
        {
          "id": "K4B6A-V3-2",
          "judul": "Warna kesukaan",
          "ketukan": [
            "Ungu empat, kuning dua.",
            "Hitam satu, merah lima.",
            "Total dua belas siswa.",
            "Merah paling disukai."
          ],
          "papan": [
            "4 2 1 5",
            "total 12",
            "merah",
            "hitam"
          ]
        },
        {
          "id": "K4B6A-V3-3",
          "judul": "Siap bermain",
          "ketukan": [
            "Kita sudah paham piktogram.",
            "Saatnya menghitung dan membandingkan.",
            "Ayo ke permainan.",
            "Semangat!",
            "METODE LUAR. Baca Lalu Banding: Bandingkan tinggi/banyak simbol antar kategori."
          ],
          "papan": [
            "paham",
            "hitung",
            "main",
            "semangat",
            "METODE LUAR · Baca Lalu Banding"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Data",
      "stepDesc": "Kumpulan keterangan yang bisa dihitung",
      "icon": "📋",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Tabel",
      "stepDesc": "Susun kategori dan banyaknya",
      "icon": "📑",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Piktogram",
      "stepDesc": "Diagram memakai gambar",
      "icon": "🖼️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Skala",
      "stepDesc": "Satu gambar = n data",
      "icon": "✖️",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Membaca",
      "stepDesc": "Hitung gambar × skala",
      "icon": "👀",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Menafsirkan",
      "stepDesc": "Paling banyak, sedikit, total",
      "icon": "💡",
      "flowFrom": "5",
      "flowTo": "7"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. METODE LUAR · Kunci Piktogram",
      "stepDesc": "Satu gambar bisa mewakili lebih dari satu benda.",
      "icon": "🌍",
      "flowFrom": "6",
      "flowTo": "8"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. METODE LUAR · Turus Kategori",
      "stepDesc": "Hitung frekuensi tiap kategori dengan turus.",
      "icon": "🌍",
      "flowFrom": "7",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "Definisi",
      "emoji": "🖼️",
      "countNum": 1,
      "countWord": "diagram gambar",
      "suara": "Piktogram memakai gambar untuk menyatakan banyak."
    },
    {
      "judul": "Skala 1",
      "emoji": "1️⃣",
      "countNum": 1,
      "countWord": "1 gambar = 1",
      "suara": "Satu gambar mewakili satu data."
    },
    {
      "judul": "Skala n",
      "emoji": "4️⃣",
      "countNum": 4,
      "countWord": "1 gambar = n",
      "suara": "Satu gambar mewakili beberapa data."
    },
    {
      "judul": "Mainan",
      "emoji": "🔵",
      "countNum": 23,
      "countWord": "total 23",
      "suara": "Mainan Karel berjumlah dua puluh tiga."
    },
    {
      "judul": "Kelereng",
      "emoji": "9️⃣",
      "countNum": 9,
      "countWord": "paling banyak",
      "suara": "Kelereng paling banyak."
    },
    {
      "judul": "Puzzle",
      "emoji": "1️⃣",
      "countNum": 1,
      "countWord": "paling sedikit",
      "suara": "Puzzle paling sedikit."
    },
    {
      "judul": "Warna merah",
      "emoji": "🔴",
      "countNum": 5,
      "countWord": "5 siswa",
      "suara": "Merah paling disukai."
    },
    {
      "judul": "Total warna",
      "emoji": "1️⃣2️⃣",
      "countNum": 12,
      "countWord": "12 siswa",
      "suara": "Total dua belas siswa."
    },
    {
      "judul": "Baca",
      "emoji": "✖️",
      "countNum": 1,
      "countWord": "gambar × skala",
      "suara": "Nilai sama dengan gambar dikali skala."
    },
    {
      "judul": "Siap B",
      "emoji": "📊",
      "countNum": 1,
      "countWord": "lanjut batang",
      "suara": "Berikutnya diagram batang."
    },
    {
      "judul": "Kunci Piktogram",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "METODE LUAR · Pictograph Key",
      "suara": "METODE LUAR. Kunci Piktogram. Satu gambar bisa mewakili lebih dari satu benda."
    },
    {
      "judul": "Turus Kategori",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "METODE LUAR · Categorical Tally",
      "suara": "METODE LUAR. Turus Kategori. Hitung frekuensi tiap kategori dengan turus."
    },
    {
      "judul": "Baca Lalu Banding",
      "emoji": "🌍",
      "countNum": 3,
      "countWord": "METODE LUAR · Read then Compare",
      "suara": "METODE LUAR. Baca Lalu Banding. Bandingkan tinggi/banyak simbol antar kategori."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-gambar",
      "title": "Hitung Gambar Piktogram",
      "bookReference": "hlm. 180–184",
      "objective": "Menghitung nilai dari banyak gambar. (METODE LUAR · Kunci Piktogram)",
      "mechanicDescription": "Tiga ronde data buku.",
      "voiceGuide": "METODE LUAR · Kunci Piktogram. Hitung gambar.",
      "emoji": "🔵",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jenis-diagram",
      "title": "Pilih Jenis Diagram",
      "bookReference": "hlm. 184",
      "objective": "Mengenali piktogram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih istilah.",
      "emoji": "📊",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "skala-baca",
      "title": "Baca Skala Simbol",
      "bookReference": "hlm. 182–186",
      "objective": "Mengalikan gambar × skala.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih hasil.",
      "emoji": "✖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-pikto",
      "title": "Pilah Piktogram/Bukan",
      "bookReference": "hlm. 184",
      "objective": "Memilah bentuk penyajian.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-data",
      "title": "Jodohkan Data Piktogram",
      "bookReference": "hlm. 181–186",
      "objective": "Menjodohkan fakta data.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-data",
      "title": "Memori Data Gambar",
      "bookReference": "hlm. 181–184",
      "objective": "Memori pasangan data.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-kategori",
      "title": "Ketuk Kategori Diminta",
      "bookReference": "hlm. 180–184",
      "objective": "Mengetuk baris data.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-nilai",
      "title": "Ketuk Semua Sesuai Nilai",
      "bookReference": "hlm. 181–184",
      "objective": "Ketuk semua yang cocok.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-pikto",
      "title": "Cerita Mainan dan Warna",
      "bookReference": "hlm. 181–184",
      "objective": "Soal cerita data.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-nilai",
      "title": "Urutkan Nilai Data",
      "bookReference": "hlm. 181–185",
      "objective": "Mengurutkan banyak.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "diagram-hitung",
      "title": "Diagram Hitung Simbol",
      "bookReference": "hlm. 180–184",
      "objective": "Baca diagram gambar. (METODE LUAR · Kunci Piktogram)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Kunci Piktogram. Pilih.",
      "diagramType": "picto",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "diagram-skala",
      "title": "Diagram Skala n",
      "bookReference": "hlm. 182–186",
      "objective": "Skala lebih dari 1.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "scale",
      "numberA": 4,
      "numberB": 12
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-a",
      "title": "Jodohkan Diagram Data",
      "bookReference": "hlm. 181–186",
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
      "title": "Memori Diagram Data",
      "bookReference": "hlm. 181–184",
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
      "title": "Tabel Kategori–Nilai",
      "bookReference": "hlm. 180–185",
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
      "bookReference": "hlm. 181–184",
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
      "title": "Pilah Diagram Gambar",
      "bookReference": "hlm. 184",
      "objective": "Pilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "banding-a",
      "title": "Bandingkan Paling Banyak",
      "bookReference": "hlm. 180–185",
      "objective": "Pilih ekstrem.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "max",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "choose-a",
      "title": "Pilih Bacaan Cocok",
      "bookReference": "hlm. 181–186",
      "objective": "Pilih pernyataan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-a",
      "title": "Cerita Diagram Gambar",
      "bookReference": "hlm. 181–186",
      "objective": "Cerita + diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-istilah",
      "title": "Tulis Istilah Piktogram",
      "bookReference": "hlm. 184",
      "objective": "Menulis istilah. (METODE LUAR · Kunci Piktogram)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Kunci Piktogram. Pilih.",
      "symbolLarge": "📊",
      "wordLarge": "PIKTOGRAM",
      "mathNotation": "definisi"
    },
    {
      "stage": "Abstract",
      "gameType": "write-nilai",
      "title": "Tulis Nilai dari Simbol",
      "bookReference": "hlm. 182–186",
      "objective": "Menulis angka.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "n×s",
      "wordLarge": "NILAI",
      "mathNotation": "skala"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-jenis-a",
      "title": "Pilih Klasifikasi Data",
      "bookReference": "hlm. 184",
      "objective": "Piktogram atau bukan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "gambar",
      "wordLarge": "JENIS",
      "mathNotation": "klasifikasi"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-a",
      "title": "Urutkan Nilai Abstrak",
      "bookReference": "hlm. 181–185",
      "objective": "Mengurutkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "symbolLarge": "9>6>1",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-a",
      "title": "Jodohkan Notasi Data",
      "bookReference": "hlm. 181–186",
      "objective": "Jodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "symbolLarge": "★=4",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-a",
      "title": "Memori Notasi Data",
      "bookReference": "hlm. 181–184",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "symbolLarge": "total",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-a",
      "title": "Benar atau Salah: Piktogram",
      "bookReference": "hlm. 180–186",
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
      "title": "Detektif Piktogram",
      "bookReference": "hlm. 181–186",
      "objective": "Petunjuk → jawaban.",
      "mechanicDescription": "Tiga soal.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-a",
      "title": "Peta Konsep Piktogram",
      "bookReference": "hlm. 178–184",
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
      "title": "Cerita Angka Data",
      "bookReference": "hlm. 181–186",
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
      "ikon": "🖼️",
      "nama": "Piktogram",
      "isi": "Diagram yang memakai gambar untuk menyatakan banyak tiap kategori.",
      "suara": "Piktogram adalah diagram gambar."
    },
    {
      "ikon": "✖️",
      "nama": "Skala",
      "isi": "Satu gambar dapat mewakili 1 atau n data; selalu baca keterangan.",
      "suara": "Baca skala sebelum menghitung."
    },
    {
      "ikon": "👀",
      "nama": "Membaca",
      "isi": "Hitung banyak gambar, kalikan skala, bandingkan hasil.",
      "suara": "Hitung, kalikan, bandingkan."
    },
    {
      "ikon": "➕",
      "nama": "Total",
      "isi": "Jumlah keseluruhan = jumlah semua nilai kategori.",
      "suara": "Total adalah jumlah semua."
    },
    {
      "ikon": "🌍",
      "nama": "Kunci Piktogram",
      "isi": "METODE LUAR · Pictograph Key: Satu gambar bisa mewakili lebih dari satu benda. (asal: Data literacy).",
      "suara": "METODE LUAR. Kunci Piktogram. Satu gambar bisa mewakili lebih dari satu benda."
    },
    {
      "ikon": "🌍",
      "nama": "Turus Kategori",
      "isi": "METODE LUAR · Categorical Tally: Hitung frekuensi tiap kategori dengan turus. (asal: Tally marks).",
      "suara": "METODE LUAR. Turus Kategori. Hitung frekuensi tiap kategori dengan turus."
    },
    {
      "ikon": "🌍",
      "nama": "Baca Lalu Banding",
      "isi": "METODE LUAR · Read then Compare: Bandingkan tinggi/banyak simbol antar kategori. (asal: Graph reading).",
      "suara": "METODE LUAR. Baca Lalu Banding. Bandingkan tinggi/banyak simbol antar kategori."
    }
  ],
  "poinSuara": "Ingat empat kunci piktogram: definisi, skala, cara baca, dan total.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Data → tabel",
        "warna": "#FDE68A"
      },
      {
        "teks": "Gambar sama",
        "warna": "#BBF7D0"
      },
      {
        "teks": "Skala jelas",
        "warna": "#BFDBFE"
      },
      {
        "teks": "Hitung × skala",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: catat 4 jenis benda di meja belajarmu, buat piktogram skala 1, lalu tulis paling banyak dan total.",
  "refleksi": [
    "Mengapa skala harus ditulis jelas?",
    "Apa beda piktogram skala 1 dan skala 4?",
    "Bagaimana mencari total dari piktogram?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Pictograph Key",
      "namaId": "Kunci Piktogram",
      "asal": "Data literacy",
      "ringkas": "Satu gambar bisa mewakili lebih dari satu benda.",
      "tahap": [
        "Story",
        "Infografis",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Categorical Tally",
      "namaId": "Turus Kategori",
      "asal": "Tally marks",
      "ringkas": "Hitung frekuensi tiap kategori dengan turus.",
      "tahap": [
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Read then Compare",
      "namaId": "Baca Lalu Banding",
      "asal": "Graph reading",
      "ringkas": "Bandingkan tinggi/banyak simbol antar kategori.",
      "tahap": [
        "Mind",
        "Abstract"
      ]
    }
  ]
};

export const SUB_B46: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Diagram Batang)",
  "fullTitle": "Sub-Bab B: Diagram Batang",
  "targetDescription": "Siswa menyajikan dan menafsirkan data dalam diagram batang tegak maupun mendatar, membaca sumbu, membandingkan tinggi/panjang batang, serta menentukan paling banyak/sedikit dan jumlah sesuai Buku Siswa Kelas IV Bab 6.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Kita belajar diagram batang. Diagram batang memakai batang persegi panjang untuk menunjukkan banyak tiap kategori. Ada yang tegak dan ada yang mendatar. Sumbu membantu kita membaca nilai. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menampilkan dan menafsirkan data dalam bentuk diagram batang.",
    "referensi": "Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 6 Sub-Bab B)."
  },
  "videos": [
    {
      "id": "K4B6B-V1",
      "judul": "Apa itu Diagram Batang?",
      "subjudul": "Batang persegi panjang",
      "adegan": [
        {
          "id": "K4B6B-V1-1",
          "judul": "Bukan hanya gambar",
          "ketukan": [
            "Data juga bisa digambar batang.",
            "Batang berbentuk persegi panjang.",
            "Tinggi atau panjang menunjukkan nilai.",
            "Itulah diagram batang."
          ],
          "papan": [
            "batang",
            "persegi panjang",
            "nilai",
            "diagram"
          ]
        },
        {
          "id": "K4B6B-V1-2",
          "judul": "Dua sumbu",
          "ketukan": [
            "Ada sumbu tegak.",
            "Ada sumbu datar.",
            "Satu untuk banyak.",
            "Satu untuk nama kategori."
          ],
          "papan": [
            "tegak",
            "datar",
            "banyak",
            "kategori"
          ]
        },
        {
          "id": "K4B6B-V1-3",
          "judul": "Tegak atau mendatar",
          "ketukan": [
            "Batang bisa naik ke atas.",
            "Atau memanjang ke samping.",
            "Artinya sama.",
            "Hanya arah berbeda.",
            "METODE LUAR. Skala Batang: Baca nilai dari tinggi batang dan skala sumbu."
          ],
          "papan": [
            "tegak",
            "mendatar",
            "sama arti",
            "beda arah",
            "METODE LUAR · Skala Batang"
          ]
        }
      ]
    },
    {
      "id": "K4B6B-V2",
      "judul": "Membaca Batang",
      "subjudul": "Tinggi dan panjang",
      "adegan": [
        {
          "id": "K4B6B-V2-1",
          "judul": "Lihat tinggi",
          "ketukan": [
            "Pada batang tegak, lihat tingginya.",
            "Samakan dengan skala sumbu.",
            "Itulah nilai kategori.",
            "Bandingkan dengan batang lain."
          ],
          "papan": [
            "tinggi",
            "skala",
            "nilai",
            "banding"
          ]
        },
        {
          "id": "K4B6B-V2-2",
          "judul": "Lihat panjang",
          "ketukan": [
            "Pada batang mendatar, lihat panjangnya.",
            "Panjang mewakili banyak.",
            "Cara membacanya sama.",
            "Cari paling tinggi atau panjang."
          ],
          "papan": [
            "panjang",
            "banyak",
            "sama cara",
            "ekstrem"
          ]
        },
        {
          "id": "K4B6B-V2-3",
          "judul": "Total dari batang",
          "ketukan": [
            "Jumlahkan nilai tiap batang.",
            "Itu total keseluruhan.",
            "Bisa juga hitung selisih.",
            "Latih dengan data transportasi.",
            "METODE LUAR. Label Sumbu: Sumbu harus bertuliskan apa yang diukur."
          ],
          "papan": [
            "jumlah",
            "total",
            "selisih",
            "latihan",
            "METODE LUAR · Label Sumbu"
          ]
        }
      ]
    },
    {
      "id": "K4B6B-V3",
      "judul": "Transportasi dan Lomba",
      "subjudul": "Contoh konteks",
      "adegan": [
        {
          "id": "K4B6B-V3-1",
          "judul": "Ke sekolah",
          "ketukan": [
            "Ada jalan kaki, sepeda, motor.",
            "Ada juga becak atau lainnya.",
            "Batang tertinggi paling banyak dipakai.",
            "Batang terendah paling sedikit."
          ],
          "papan": [
            "jalan kaki",
            "sepeda",
            "motor",
            "banding"
          ]
        },
        {
          "id": "K4B6B-V3-2",
          "judul": "Lomba dan bunga",
          "ketukan": [
            "Data lomba memakai batang tegak.",
            "Data bunga bisa batang mendatar.",
            "Keduanya diagram batang.",
            "Pilih bentuk yang mudah dibaca."
          ],
          "papan": [
            "lomba",
            "bunga",
            "dua bentuk",
            "mudah"
          ]
        },
        {
          "id": "K4B6B-V3-3",
          "judul": "Siap bermain",
          "ketukan": [
            "Kita sudah paham batang.",
            "Saatnya membaca sumbu dan nilai.",
            "Ayo ke permainan.",
            "Semangat!",
            "METODE LUAR. Banding Batang: Batang lebih tinggi = nilai lebih besar."
          ],
          "papan": [
            "paham",
            "sumbu",
            "main",
            "semangat",
            "METODE LUAR · Banding Batang"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Data",
      "stepDesc": "Keterangan banyak per kategori",
      "icon": "📋",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Sumbu",
      "stepDesc": "Tegak = banyak, datar = nama (atau sebaliknya)",
      "icon": "➕",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Batang tegak",
      "stepDesc": "Tinggi batang = nilai",
      "icon": "▮",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Batang mendatar",
      "stepDesc": "Panjang batang = nilai",
      "icon": "▬",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Membaca",
      "stepDesc": "Samakan ujung batang dengan skala",
      "icon": "👀",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Menafsirkan",
      "stepDesc": "Paling banyak, sedikit, total, selisih",
      "icon": "💡",
      "flowFrom": "5",
      "flowTo": "7"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. METODE LUAR · Skala Batang",
      "stepDesc": "Baca nilai dari tinggi batang dan skala sumbu.",
      "icon": "🌍",
      "flowFrom": "6",
      "flowTo": "8"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. METODE LUAR · Label Sumbu",
      "stepDesc": "Sumbu harus bertuliskan apa yang diukur.",
      "icon": "🌍",
      "flowFrom": "7",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "Definisi",
      "emoji": "▮",
      "countNum": 1,
      "countWord": "batang",
      "suara": "Diagram batang memakai persegi panjang."
    },
    {
      "judul": "Sumbu Y",
      "emoji": "⬆️",
      "countNum": 1,
      "countWord": "banyak",
      "suara": "Sumbu tegak sering menyatakan banyak."
    },
    {
      "judul": "Sumbu X",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "kategori",
      "suara": "Sumbu datar sering menyatakan nama."
    },
    {
      "judul": "Tegak",
      "emoji": "📊",
      "countNum": 1,
      "countWord": "ke atas",
      "suara": "Batang tegak tumbuh ke atas."
    },
    {
      "judul": "Mendatar",
      "emoji": "📈",
      "countNum": 1,
      "countWord": "ke samping",
      "suara": "Batang mendatar memanjang ke samping."
    },
    {
      "judul": "Baca",
      "emoji": "👀",
      "countNum": 1,
      "countWord": "tinggi/panjang",
      "suara": "Nilai dibaca dari tinggi atau panjang."
    },
    {
      "judul": "Transport",
      "emoji": "🚶",
      "countNum": 8,
      "countWord": "jalan kaki 8",
      "suara": "Contoh nilai jalan kaki delapan."
    },
    {
      "judul": "Banding",
      "emoji": "⚖️",
      "countNum": 1,
      "countWord": "ekstrem",
      "suara": "Bandingkan batang untuk paling banyak."
    },
    {
      "judul": "Total",
      "emoji": "➕",
      "countNum": 1,
      "countWord": "jumlah nilai",
      "suara": "Total = jumlah semua batang."
    },
    {
      "judul": "Bab 6 siap",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "A+B",
      "suara": "Piktogram dan batang siap."
    },
    {
      "judul": "Skala Batang",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "METODE LUAR · Bar Scale",
      "suara": "METODE LUAR. Skala Batang. Baca nilai dari tinggi batang dan skala sumbu."
    },
    {
      "judul": "Label Sumbu",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "METODE LUAR · Axis Labels",
      "suara": "METODE LUAR. Label Sumbu. Sumbu harus bertuliskan apa yang diukur."
    },
    {
      "judul": "Banding Batang",
      "emoji": "🌍",
      "countNum": 3,
      "countWord": "METODE LUAR · Compare Bars",
      "suara": "METODE LUAR. Banding Batang. Batang lebih tinggi = nilai lebih besar."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "baca-batang",
      "title": "Baca Tinggi Batang",
      "bookReference": "hlm. 187–191",
      "objective": "Membaca nilai batang. (METODE LUAR · Skala Batang)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Skala Batang. Pilih.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jenis-batang",
      "title": "Tegak atau Mendatar",
      "bookReference": "hlm. 188–191",
      "objective": "Membedakan arah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "↕️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sumbu",
      "title": "Sumbu Tegak dan Datar",
      "bookReference": "hlm. 187–190",
      "objective": "Mengenali sumbu.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "➕",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-arah",
      "title": "Pilah Batang Tegak/Mendatar",
      "bookReference": "hlm. 188–191",
      "objective": "Memilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-batang",
      "title": "Jodohkan Fakta Batang",
      "bookReference": "hlm. 189–192",
      "objective": "Menjodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-batang",
      "title": "Memori Diagram Batang",
      "bookReference": "hlm. 189–192",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-batang",
      "title": "Ketuk Batang Diminta",
      "bookReference": "hlm. 189–193",
      "objective": "Mengetuk batang.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-arah",
      "title": "Ketuk Semua Arah Batang",
      "bookReference": "hlm. 188–191",
      "objective": "Ketuk semua.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-batang",
      "title": "Cerita Transport dan Lomba",
      "bookReference": "hlm. 189–193",
      "objective": "Soal cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "🚌",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-batang",
      "title": "Urutkan Tinggi Batang",
      "bookReference": "hlm. 189–192",
      "objective": "Mengurutkan nilai.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "diagram-tegak",
      "title": "Diagram Batang Tegak",
      "bookReference": "hlm. 188–189",
      "objective": "Baca tinggi. (METODE LUAR · Skala Batang)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Skala Batang. Pilih.",
      "diagramType": "bar-v",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "diagram-mendatar",
      "title": "Diagram Batang Mendatar",
      "bookReference": "hlm. 190–192",
      "objective": "Baca panjang.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "bar-h",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-b",
      "title": "Jodohkan Diagram Batang",
      "bookReference": "hlm. 189–192",
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
      "title": "Memori Diagram Batang",
      "bookReference": "hlm. 189–192",
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
      "title": "Tabel Sumbu–Arti",
      "bookReference": "hlm. 187–191",
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
      "title": "Ketuk Semua Diagram Arah",
      "bookReference": "hlm. 188–191",
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
      "title": "Pilah Diagram Arah",
      "bookReference": "hlm. 188–191",
      "objective": "Pilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "banding-b",
      "title": "Bandingkan Batang",
      "bookReference": "hlm. 189–193",
      "objective": "Pilih ekstrem.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "compare",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "choose-b",
      "title": "Pilih Bacaan Batang",
      "bookReference": "hlm. 189–193",
      "objective": "Pilih pernyataan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-b",
      "title": "Cerita Diagram Batang",
      "bookReference": "hlm. 189–193",
      "objective": "Cerita + diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-istilah-b",
      "title": "Tulis Istilah Batang",
      "bookReference": "hlm. 188–191",
      "objective": "Menulis istilah. (METODE LUAR · Skala Batang)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "METODE LUAR · Skala Batang. Pilih.",
      "symbolLarge": "▮",
      "wordLarge": "BATANG",
      "mathNotation": "definisi"
    },
    {
      "stage": "Abstract",
      "gameType": "write-nilai-b",
      "title": "Tulis Nilai Batang",
      "bookReference": "hlm. 189–192",
      "objective": "Menulis angka.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "h",
      "wordLarge": "NILAI",
      "mathNotation": "tinggi"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-jenis-b",
      "title": "Pilih Arah Batang",
      "bookReference": "hlm. 188–191",
      "objective": "Tegak/mendatar.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "↕️",
      "wordLarge": "ARAH",
      "mathNotation": "klasifikasi"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-b",
      "title": "Urutkan Nilai Batang",
      "bookReference": "hlm. 189–192",
      "objective": "Mengurutkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "symbolLarge": "14>10>5",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-b",
      "title": "Jodohkan Notasi Batang",
      "bookReference": "hlm. 187–192",
      "objective": "Jodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "symbolLarge": "Y=banyak",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-b",
      "title": "Memori Notasi Batang",
      "bookReference": "hlm. 187–192",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "symbolLarge": "sumbu",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-b",
      "title": "Benar atau Salah: Batang",
      "bookReference": "hlm. 187–193",
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
      "title": "Detektif Diagram Batang",
      "bookReference": "hlm. 189–193",
      "objective": "Petunjuk → jawaban.",
      "mechanicDescription": "Tiga soal.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-b",
      "title": "Peta Konsep Batang",
      "bookReference": "hlm. 178–191",
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
      "title": "Cerita Angka Batang",
      "bookReference": "hlm. 189–193",
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
      "ikon": "▮",
      "nama": "Diagram batang",
      "isi": "Diagram memakai batang persegi panjang untuk menunjukkan banyak kategori.",
      "suara": "Diagram batang memakai batang."
    },
    {
      "ikon": "➕",
      "nama": "Sumbu",
      "isi": "Sumbu tegak dan datar memuat nilai dan nama kategori.",
      "suara": "Baca kedua sumbu."
    },
    {
      "ikon": "↕️",
      "nama": "Dua arah",
      "isi": "Batang bisa tegak atau mendatar; arti data tetap sama.",
      "suara": "Arah boleh berbeda."
    },
    {
      "ikon": "👀",
      "nama": "Membaca",
      "isi": "Samakan ujung batang dengan skala untuk mendapat nilai.",
      "suara": "Samakan dengan skala."
    },
    {
      "ikon": "🌍",
      "nama": "Skala Batang",
      "isi": "METODE LUAR · Bar Scale: Baca nilai dari tinggi batang dan skala sumbu. (asal: Bar graph pedagogy).",
      "suara": "METODE LUAR. Skala Batang. Baca nilai dari tinggi batang dan skala sumbu."
    },
    {
      "ikon": "🌍",
      "nama": "Label Sumbu",
      "isi": "METODE LUAR · Axis Labels: Sumbu harus bertuliskan apa yang diukur. (asal: Data display).",
      "suara": "METODE LUAR. Label Sumbu. Sumbu harus bertuliskan apa yang diukur."
    },
    {
      "ikon": "🌍",
      "nama": "Banding Batang",
      "isi": "METODE LUAR · Compare Bars: Batang lebih tinggi = nilai lebih besar. (asal: Comparative reading).",
      "suara": "METODE LUAR. Banding Batang. Batang lebih tinggi = nilai lebih besar."
    }
  ],
  "poinSuara": "Ingat empat kunci batang: definisi, sumbu, dua arah, dan cara baca.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Gambar sumbu",
        "warna": "#FDE68A"
      },
      {
        "teks": "Skala teratur",
        "warna": "#BBF7D0"
      },
      {
        "teks": "Gambar batang",
        "warna": "#BFDBFE"
      },
      {
        "teks": "Baca & bandingkan",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: catat lama belajar 4 hari, buat diagram batang tegak, lalu tulis hari paling lama dan total menit.",
  "refleksi": [
    "Apa beda batang tegak dan mendatar?",
    "Mengapa skala sumbu harus teratur?",
    "Bagaimana mencari selisih dua batang?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Bar Scale",
      "namaId": "Skala Batang",
      "asal": "Bar graph pedagogy",
      "ringkas": "Baca nilai dari tinggi batang dan skala sumbu.",
      "tahap": [
        "Story",
        "Picture",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Axis Labels",
      "namaId": "Label Sumbu",
      "asal": "Data display",
      "ringkas": "Sumbu harus bertuliskan apa yang diukur.",
      "tahap": [
        "Mind",
        "Infografis"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Compare Bars",
      "namaId": "Banding Batang",
      "asal": "Comparative reading",
      "ringkas": "Batang lebih tinggi = nilai lebih besar.",
      "tahap": [
        "Concrete",
        "Abstract"
      ]
    }
  ]
};

export const SUB_BAB_K4B6: SubBabNaskah[] = [SUB_A46, SUB_B46];
export const semuaAdeganK4B6 = SUB_BAB_K4B6.flatMap((s) => s.videos.flatMap((v) => v.adegan));
