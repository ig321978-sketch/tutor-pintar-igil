/**
 * Naskah — rewrite mendalam.
 * Metode luar dianyam ke Story, peta, infografis, poin, dan meta permainan.
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
  "targetDescription": "Siswa menyajikan dan menafsirkan data dalam piktogram (diagram gambar), termasuk skala 1 dan skala lebih dari 1, menentukan paling banyak/sedikit serta jumlah keseluruhan sesuai Buku Siswa Kelas IV Bab 6. Siswa memakai cara Kunci Piktogram, Turus Kategori, Baca Lalu Banding.",
  "secondaryBg": "#FFEDD5",
  "secondaryBorder": "#EA580C",
  "secondaryText": "#7C2D12",
  "silabus": {
    "teksSuara": "Kita belajar piktogram. Piktogram adalah diagram yang memakai gambar untuk menyatakan banyak tiap kategori. Kadang satu gambar berarti satu benda, kadang satu gambar berarti beberapa. Kita baca dengan menghitung gambar lalu mengalikan skala. Kita memakai cara dari luar buku: Kunci Piktogram (Pictograph Key); Turus Kategori (Categorical Tally); Baca Lalu Banding (Read then Compare). Satu gambar bisa mewakili lebih dari satu benda. Hitung frekuensi tiap kategori dengan turus. Bandingkan tinggi/banyak simbol antar kategori. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menampilkan dan menafsirkan data dalam bentuk diagram gambar (piktogram).",
    "referensi": "Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 6 Sub-Bab A)."
  },
  "videos": [
    {
      "id": "K4B6A-V1",
      "judul": "Apa itu Piktogram?",
      "subjudul": "Pictograph Key",
      "adegan": [
        {
          "id": "K4B6A-V1-1",
          "judul": "Data butuh gambar",
          "ketukan": [
            "Bayangkan situasi nyata di kelas atau di rumah. Ada banyak benda di kelas. Mari kita pahami bersama.",
            "Kita ingin menyajikannya rapi. Mari kita pahami bersama.",
            "Pakai gambar yang mewakili banyak. Mari kita pahami bersama.",
            "Ingat cara Kunci Piktogram: Satu gambar bisa mewakili lebih dari satu benda."
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
            "Setiap gambar harus sama. Mari kita pahami bersama.",
            "Satu gambar bisa berarti satu benda. Mari kita pahami bersama.",
            "Atau satu gambar berarti beberapa. Mari kita pahami bersama.",
            "Di sini kita memakai ide Pictograph Key — Satu gambar bisa mewakili lebih dari satu benda."
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
            "Hitung gambar tiap baris. Mari kita pahami bersama.",
            "Kalikan dengan skala. Mari kita pahami bersama.",
            "Bandingkan hasilnya. Mari kita pahami bersama.",
            "METODE LUAR · Kunci Piktogram: Satu gambar bisa mewakili lebih dari satu benda."
          ],
          "papan": [
            "hitung",
            "× skala",
            "banding",
            "ekstrem"
          ]
        }
      ]
    },
    {
      "id": "K4B6A-V2",
      "judul": "Latihan: Turus Kategori",
      "subjudul": "Categorical Tally",
      "adegan": [
        {
          "id": "K4B6A-V2-1",
          "judul": "Skala satu",
          "ketukan": [
            "Satu gambar sama dengan satu siswa. Mari kita pahami bersama.",
            "Empat gambar sama dengan empat siswa. Mari kita pahami bersama.",
            "Mudah dihitung. Mari kita pahami bersama.",
            "Ingat cara Turus Kategori: Hitung frekuensi tiap kategori dengan turus."
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
            "Satu gambar bisa sama dengan empat siswa. Mari kita pahami bersama.",
            "Tiga gambar menjadi dua belas. Mari kita pahami bersama.",
            "Hemat ruang gambar. Mari kita pahami bersama.",
            "Di sini kita memakai ide Categorical Tally — Hitung frekuensi tiap kategori dengan turus."
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
            "Tanpa skala, gambar membingungkan. Mari kita pahami bersama.",
            "Selalu baca baris keterangan. Mari kita pahami bersama.",
            "Nilai = gambar dikali skala. Mari kita pahami bersama.",
            "METODE LUAR · Turus Kategori: Hitung frekuensi tiap kategori dengan turus."
          ],
          "papan": [
            "wajib skala",
            "keterangan",
            "nilai",
            "latihan"
          ]
        }
      ]
    },
    {
      "id": "K4B6A-V3",
      "judul": "Siap pakai Read then Compare",
      "subjudul": "Read then Compare",
      "adegan": [
        {
          "id": "K4B6A-V3-1",
          "judul": "Mainan Karel",
          "ketukan": [
            "Mobil enam, robot empat. Mari kita pahami bersama.",
            "Pesawat tiga, puzzle satu. Mari kita pahami bersama.",
            "Kelereng sembilan. Mari kita pahami bersama.",
            "Ingat cara Baca Lalu Banding: Bandingkan tinggi/banyak simbol antar kategori."
          ],
          "papan": [
            "6 4 3 1",
            "total 23",
            "paling banyak",
            "baca"
          ]
        },
        {
          "id": "K4B6A-V3-2",
          "judul": "Warna kesukaan",
          "ketukan": [
            "Ungu empat, kuning dua. Mari kita pahami bersama.",
            "Hitam satu, merah lima. Mari kita pahami bersama.",
            "Total dua belas siswa. Mari kita pahami bersama.",
            "Di sini kita memakai ide Read then Compare — Bandingkan tinggi/banyak simbol antar kategori."
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
            "Kita sudah paham piktogram. Mari kita pahami bersama.",
            "Saatnya menghitung dan membandingkan. Mari kita pahami bersama.",
            "Ayo ke permainan. Mari kita pahami bersama.",
            "METODE LUAR · Baca Lalu Banding: Bandingkan tinggi/banyak simbol antar kategori."
          ],
          "papan": [
            "paham",
            "hitung",
            "main",
            "semangat"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Piktogram. Apa yang ditanyakan?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Pictograph Key",
      "stepDesc": "Satu gambar bisa mewakili lebih dari satu benda.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Categorical Tally",
      "stepDesc": "Hitung frekuensi tiap kategori dengan turus.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Read then Compare",
      "stepDesc": "Bandingkan tinggi/banyak simbol antar kategori.",
      "icon": "✨",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Kerjakan",
      "stepDesc": "Terapkan cara itu pada angka atau gambar soal.",
      "icon": "✏️",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek masuk akal",
      "stepDesc": "Apakah hasilnya masuk akal? Bandingkan dengan perkiraan.",
      "icon": "✅",
      "flowFrom": "5",
      "flowTo": "7"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Simpulkan",
      "stepDesc": "Ulangi ide utamanya dengan kalimatmu sendiri.",
      "icon": "💬",
      "flowFrom": "6",
      "flowTo": "8"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Lanjut main",
      "stepDesc": "Siap melatih di permainan Concrete sampai Abstract.",
      "icon": "🎮",
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
      "countWord": "ingat",
      "suara": "Satu gambar bisa mewakili lebih dari satu benda."
    },
    {
      "judul": "Turus Kategori",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "ingat",
      "suara": "Hitung frekuensi tiap kategori dengan turus."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-gambar",
      "title": "Hitung Gambar Piktogram",
      "bookReference": "hlm. 180–184",
      "objective": "Pakai Kunci Piktogram: Satu gambar bisa mewakili lebih dari satu benda. Latihan: Menghitung nilai dari banyak gambar..",
      "mechanicDescription": "Tiga ronde data buku. Saat bermain, terapkan Pictograph Key: Satu gambar bisa mewakili lebih dari satu benda.",
      "voiceGuide": "Kunci Piktogram. Satu gambar bisa mewakili lebih dari satu benda.",
      "emoji": "🔵",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jenis-diagram",
      "title": "Pilih Jenis Diagram",
      "bookReference": "hlm. 184",
      "objective": "Pakai Kunci Piktogram: Satu gambar bisa mewakili lebih dari satu benda. Latihan: Mengenali piktogram..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Pictograph Key: Satu gambar bisa mewakili lebih dari satu benda.",
      "voiceGuide": "Kunci Piktogram. Satu gambar bisa mewakili lebih dari satu benda.",
      "emoji": "📊",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "skala-baca",
      "title": "Baca Skala Simbol",
      "bookReference": "hlm. 182–186",
      "objective": "Pakai Kunci Piktogram: Satu gambar bisa mewakili lebih dari satu benda. Latihan: Mengalikan gambar × skala..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Pictograph Key: Satu gambar bisa mewakili lebih dari satu benda.",
      "voiceGuide": "Kunci Piktogram. Satu gambar bisa mewakili lebih dari satu benda.",
      "emoji": "✖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-pikto",
      "title": "Pilah Piktogram/Bukan",
      "bookReference": "hlm. 184",
      "objective": "Pakai Kunci Piktogram: Satu gambar bisa mewakili lebih dari satu benda. Latihan: Memilah bentuk penyajian..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Pictograph Key: Satu gambar bisa mewakili lebih dari satu benda.",
      "voiceGuide": "Kunci Piktogram. Satu gambar bisa mewakili lebih dari satu benda.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-data",
      "title": "Jodohkan Data Piktogram",
      "bookReference": "hlm. 181–186",
      "objective": "Menjodohkan fakta data.. Ingat Kunci Piktogram.",
      "mechanicDescription": "Tiga ronde. Gunakan Kunci Piktogram.",
      "voiceGuide": "Kunci Piktogram. Jodohkan.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-data",
      "title": "Memori Data Gambar",
      "bookReference": "hlm. 181–184",
      "objective": "Memori pasangan data.. Ingat Kunci Piktogram.",
      "mechanicDescription": "Tiga ronde. Gunakan Kunci Piktogram.",
      "voiceGuide": "Kunci Piktogram. Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-kategori",
      "title": "Ketuk Kategori Diminta",
      "bookReference": "hlm. 180–184",
      "objective": "Mengetuk baris data.. Ingat Kunci Piktogram.",
      "mechanicDescription": "Tiga ronde. Gunakan Kunci Piktogram.",
      "voiceGuide": "Kunci Piktogram. Ketuk.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-nilai",
      "title": "Ketuk Semua Sesuai Nilai",
      "bookReference": "hlm. 181–184",
      "objective": "Ketuk semua yang cocok.. Ingat Kunci Piktogram.",
      "mechanicDescription": "Tiga ronde. Gunakan Kunci Piktogram.",
      "voiceGuide": "Kunci Piktogram. Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-pikto",
      "title": "Cerita Mainan dan Warna",
      "bookReference": "hlm. 181–184",
      "objective": "Soal cerita data.. Ingat Kunci Piktogram.",
      "mechanicDescription": "Tiga ronde. Gunakan Kunci Piktogram.",
      "voiceGuide": "Kunci Piktogram. Pilih.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-nilai",
      "title": "Urutkan Nilai Data",
      "bookReference": "hlm. 181–185",
      "objective": "Mengurutkan banyak.. Ingat Kunci Piktogram.",
      "mechanicDescription": "Tiga ronde. Gunakan Kunci Piktogram.",
      "voiceGuide": "Kunci Piktogram. Urutkan.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "diagram-hitung",
      "title": "Diagram Hitung Simbol",
      "bookReference": "hlm. 180–184",
      "objective": "Pakai Turus Kategori: Hitung frekuensi tiap kategori dengan turus. Latihan: Baca diagram gambar..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Categorical Tally: Hitung frekuensi tiap kategori dengan turus.",
      "voiceGuide": "Turus Kategori. Hitung frekuensi tiap kategori dengan turus.",
      "diagramType": "picto",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "diagram-skala",
      "title": "Diagram Skala n",
      "bookReference": "hlm. 182–186",
      "objective": "Pakai Turus Kategori: Hitung frekuensi tiap kategori dengan turus. Latihan: Skala lebih dari 1..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Categorical Tally: Hitung frekuensi tiap kategori dengan turus.",
      "voiceGuide": "Turus Kategori. Hitung frekuensi tiap kategori dengan turus.",
      "diagramType": "scale",
      "numberA": 4,
      "numberB": 12
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-a",
      "title": "Jodohkan Diagram Data",
      "bookReference": "hlm. 181–186",
      "objective": "Pakai Turus Kategori: Hitung frekuensi tiap kategori dengan turus. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Categorical Tally: Hitung frekuensi tiap kategori dengan turus.",
      "voiceGuide": "Turus Kategori. Hitung frekuensi tiap kategori dengan turus.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-a",
      "title": "Memori Diagram Data",
      "bookReference": "hlm. 181–184",
      "objective": "Pakai Turus Kategori: Hitung frekuensi tiap kategori dengan turus. Latihan: Memori..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Categorical Tally: Hitung frekuensi tiap kategori dengan turus.",
      "voiceGuide": "Turus Kategori. Hitung frekuensi tiap kategori dengan turus.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-a",
      "title": "Tabel Kategori–Nilai",
      "bookReference": "hlm. 180–185",
      "objective": "Isi tabel.. Ingat Turus Kategori.",
      "mechanicDescription": "Tiga tabel. Gunakan Turus Kategori.",
      "voiceGuide": "Turus Kategori. Pilih.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-a",
      "title": "Ketuk Semua Diagram",
      "bookReference": "hlm. 181–184",
      "objective": "Ketuk semua.. Ingat Turus Kategori.",
      "mechanicDescription": "Tiga ronde. Gunakan Turus Kategori.",
      "voiceGuide": "Turus Kategori. Ketuk semua.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-a",
      "title": "Pilah Diagram Gambar",
      "bookReference": "hlm. 184",
      "objective": "Pilah.. Ingat Turus Kategori.",
      "mechanicDescription": "Tiga ronde. Gunakan Turus Kategori.",
      "voiceGuide": "Turus Kategori. Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "banding-a",
      "title": "Bandingkan Paling Banyak",
      "bookReference": "hlm. 180–185",
      "objective": "Pilih ekstrem.. Ingat Turus Kategori.",
      "mechanicDescription": "Tiga ronde. Gunakan Turus Kategori.",
      "voiceGuide": "Turus Kategori. Pilih.",
      "diagramType": "max",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "choose-a",
      "title": "Pilih Bacaan Cocok",
      "bookReference": "hlm. 181–186",
      "objective": "Pilih pernyataan.. Ingat Turus Kategori.",
      "mechanicDescription": "Tiga ronde. Gunakan Turus Kategori.",
      "voiceGuide": "Turus Kategori. Pilih.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-a",
      "title": "Cerita Diagram Gambar",
      "bookReference": "hlm. 181–186",
      "objective": "Cerita + diagram.. Ingat Turus Kategori.",
      "mechanicDescription": "Tiga ronde. Gunakan Turus Kategori.",
      "voiceGuide": "Turus Kategori. Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-istilah",
      "title": "Tulis Istilah Piktogram",
      "bookReference": "hlm. 184",
      "objective": "Pakai Baca Lalu Banding: Bandingkan tinggi/banyak simbol antar kategori. Latihan: Menulis istilah..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Read then Compare: Bandingkan tinggi/banyak simbol antar kategori.",
      "voiceGuide": "Baca Lalu Banding. Bandingkan tinggi/banyak simbol antar kategori.",
      "symbolLarge": "📊",
      "wordLarge": "PIKTOGRAM",
      "mathNotation": "definisi"
    },
    {
      "stage": "Abstract",
      "gameType": "write-nilai",
      "title": "Tulis Nilai dari Simbol",
      "bookReference": "hlm. 182–186",
      "objective": "Pakai Baca Lalu Banding: Bandingkan tinggi/banyak simbol antar kategori. Latihan: Menulis angka..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Read then Compare: Bandingkan tinggi/banyak simbol antar kategori.",
      "voiceGuide": "Baca Lalu Banding. Bandingkan tinggi/banyak simbol antar kategori.",
      "symbolLarge": "n×s",
      "wordLarge": "NILAI",
      "mathNotation": "skala"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-jenis-a",
      "title": "Pilih Klasifikasi Data",
      "bookReference": "hlm. 184",
      "objective": "Pakai Baca Lalu Banding: Bandingkan tinggi/banyak simbol antar kategori. Latihan: Piktogram atau bukan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Read then Compare: Bandingkan tinggi/banyak simbol antar kategori.",
      "voiceGuide": "Baca Lalu Banding. Bandingkan tinggi/banyak simbol antar kategori.",
      "symbolLarge": "gambar",
      "wordLarge": "JENIS",
      "mathNotation": "klasifikasi"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-a",
      "title": "Urutkan Nilai Abstrak",
      "bookReference": "hlm. 181–185",
      "objective": "Pakai Baca Lalu Banding: Bandingkan tinggi/banyak simbol antar kategori. Latihan: Mengurutkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Read then Compare: Bandingkan tinggi/banyak simbol antar kategori.",
      "voiceGuide": "Baca Lalu Banding. Bandingkan tinggi/banyak simbol antar kategori.",
      "symbolLarge": "9>6>1",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-a",
      "title": "Jodohkan Notasi Data",
      "bookReference": "hlm. 181–186",
      "objective": "Jodohkan.. Ingat Baca Lalu Banding.",
      "mechanicDescription": "Tiga ronde. Gunakan Baca Lalu Banding.",
      "voiceGuide": "Baca Lalu Banding. Jodohkan.",
      "symbolLarge": "★=4",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-a",
      "title": "Memori Notasi Data",
      "bookReference": "hlm. 181–184",
      "objective": "Memori.. Ingat Baca Lalu Banding.",
      "mechanicDescription": "Tiga ronde. Gunakan Baca Lalu Banding.",
      "voiceGuide": "Baca Lalu Banding. Balik kartu.",
      "symbolLarge": "total",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-a",
      "title": "Benar atau Salah: Piktogram",
      "bookReference": "hlm. 180–186",
      "objective": "Menilai.. Ingat Baca Lalu Banding.",
      "mechanicDescription": "Dua ronde. Gunakan Baca Lalu Banding.",
      "voiceGuide": "Baca Lalu Banding. Benar/salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-a",
      "title": "Detektif Piktogram",
      "bookReference": "hlm. 181–186",
      "objective": "Petunjuk → jawaban.. Ingat Baca Lalu Banding.",
      "mechanicDescription": "Tiga soal. Gunakan Baca Lalu Banding.",
      "voiceGuide": "Baca Lalu Banding. Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-a",
      "title": "Peta Konsep Piktogram",
      "bookReference": "hlm. 178–184",
      "objective": "Mengisi kotak.. Ingat Baca Lalu Banding.",
      "mechanicDescription": "Satu peta. Gunakan Baca Lalu Banding.",
      "voiceGuide": "Baca Lalu Banding. Pilih opsi.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-a",
      "title": "Cerita Angka Data",
      "bookReference": "hlm. 181–186",
      "objective": "Soal cerita.. Ingat Baca Lalu Banding.",
      "mechanicDescription": "Tiga ronde. Gunakan Baca Lalu Banding.",
      "voiceGuide": "Baca Lalu Banding. Pilih.",
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
      "ikon": "🌍",
      "nama": "Kunci Piktogram",
      "isi": "Satu gambar bisa mewakili lebih dari satu benda.",
      "suara": "Kunci Piktogram. Satu gambar bisa mewakili lebih dari satu benda."
    },
    {
      "ikon": "🌍",
      "nama": "Turus Kategori",
      "isi": "Hitung frekuensi tiap kategori dengan turus.",
      "suara": "Turus Kategori. Hitung frekuensi tiap kategori dengan turus."
    },
    {
      "ikon": "🌍",
      "nama": "Baca Lalu Banding",
      "isi": "Bandingkan tinggi/banyak simbol antar kategori.",
      "suara": "Baca Lalu Banding. Bandingkan tinggi/banyak simbol antar kategori."
    }
  ],
  "poinSuara": "Ingat: Kunci Piktogram, Turus Kategori, Baca Lalu Banding.",
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
  "rumah": "Ayo Mencoba di rumah: terapkan Kunci Piktogram pada satu benda atau soal nyata, lalu ceritakan langkahmu.",
  "refleksi": [
    "Bagaimana Kunci Piktogram membantumu memahami soal?",
    "Kapan kamu memakai Turus Kategori?",
    "Apa bedanya dengan hanya menghafal rumus atau langkah tanpa arti?"
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
  "targetDescription": "Siswa menyajikan dan menafsirkan data dalam diagram batang tegak maupun mendatar, membaca sumbu, membandingkan tinggi/panjang batang, serta menentukan paling banyak/sedikit dan jumlah sesuai Buku Siswa Kelas IV Bab 6. Siswa memakai cara Skala Batang, Label Sumbu, Banding Batang.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Kita belajar diagram batang. Diagram batang memakai batang persegi panjang untuk menunjukkan banyak tiap kategori. Ada yang tegak dan ada yang mendatar. Sumbu membantu kita membaca nilai. Kita memakai cara dari luar buku: Skala Batang (Bar Scale); Label Sumbu (Axis Labels); Banding Batang (Compare Bars). Baca nilai dari tinggi batang dan skala sumbu. Sumbu harus bertuliskan apa yang diukur. Batang lebih tinggi = nilai lebih besar. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menampilkan dan menafsirkan data dalam bentuk diagram batang.",
    "referensi": "Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 6 Sub-Bab B)."
  },
  "videos": [
    {
      "id": "K4B6B-V1",
      "judul": "Apa itu Diagram Batang?",
      "subjudul": "Bar Scale",
      "adegan": [
        {
          "id": "K4B6B-V1-1",
          "judul": "Bukan hanya gambar",
          "ketukan": [
            "Bayangkan situasi nyata di kelas atau di rumah. Data juga bisa digambar batang. Mari kita pahami bersama.",
            "Batang berbentuk persegi panjang. Mari kita pahami bersama.",
            "Tinggi atau panjang menunjukkan nilai. Mari kita pahami bersama.",
            "Ingat cara Skala Batang: Baca nilai dari tinggi batang dan skala sumbu."
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
            "Ada sumbu tegak. Mari kita pahami bersama.",
            "Ada sumbu datar. Mari kita pahami bersama.",
            "Satu untuk banyak. Mari kita pahami bersama.",
            "Di sini kita memakai ide Bar Scale — Baca nilai dari tinggi batang dan skala sumbu."
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
            "Batang bisa naik ke atas. Mari kita pahami bersama.",
            "Atau memanjang ke samping. Mari kita pahami bersama.",
            "Artinya sama. Mari kita pahami bersama.",
            "METODE LUAR · Skala Batang: Baca nilai dari tinggi batang dan skala sumbu."
          ],
          "papan": [
            "tegak",
            "mendatar",
            "sama arti",
            "beda arah"
          ]
        }
      ]
    },
    {
      "id": "K4B6B-V2",
      "judul": "Latihan: Label Sumbu",
      "subjudul": "Axis Labels",
      "adegan": [
        {
          "id": "K4B6B-V2-1",
          "judul": "Lihat tinggi",
          "ketukan": [
            "Pada batang tegak, lihat tingginya. Mari kita pahami bersama.",
            "Samakan dengan skala sumbu. Mari kita pahami bersama.",
            "Itulah nilai kategori. Mari kita pahami bersama.",
            "Ingat cara Label Sumbu: Sumbu harus bertuliskan apa yang diukur."
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
            "Pada batang mendatar, lihat panjangnya. Mari kita pahami bersama.",
            "Panjang mewakili banyak. Mari kita pahami bersama.",
            "Cara membacanya sama. Mari kita pahami bersama.",
            "Di sini kita memakai ide Axis Labels — Sumbu harus bertuliskan apa yang diukur."
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
            "Jumlahkan nilai tiap batang. Mari kita pahami bersama.",
            "Itu total keseluruhan. Mari kita pahami bersama.",
            "Bisa juga hitung selisih. Mari kita pahami bersama.",
            "METODE LUAR · Label Sumbu: Sumbu harus bertuliskan apa yang diukur."
          ],
          "papan": [
            "jumlah",
            "total",
            "selisih",
            "latihan"
          ]
        }
      ]
    },
    {
      "id": "K4B6B-V3",
      "judul": "Siap pakai Compare Bars",
      "subjudul": "Compare Bars",
      "adegan": [
        {
          "id": "K4B6B-V3-1",
          "judul": "Ke sekolah",
          "ketukan": [
            "Ada jalan kaki, sepeda, motor. Mari kita pahami bersama.",
            "Ada juga becak atau lainnya. Mari kita pahami bersama.",
            "Batang tertinggi paling banyak dipakai. Mari kita pahami bersama.",
            "Ingat cara Banding Batang: Batang lebih tinggi = nilai lebih besar."
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
            "Data lomba memakai batang tegak. Mari kita pahami bersama.",
            "Data bunga bisa batang mendatar. Mari kita pahami bersama.",
            "Keduanya diagram batang. Mari kita pahami bersama.",
            "Di sini kita memakai ide Compare Bars — Batang lebih tinggi = nilai lebih besar."
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
            "Kita sudah paham batang. Mari kita pahami bersama.",
            "Saatnya membaca sumbu dan nilai. Mari kita pahami bersama.",
            "Ayo ke permainan. Mari kita pahami bersama.",
            "METODE LUAR · Banding Batang: Batang lebih tinggi = nilai lebih besar."
          ],
          "papan": [
            "paham",
            "sumbu",
            "main",
            "semangat"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Diagram Batang. Apa yang ditanyakan?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Bar Scale",
      "stepDesc": "Baca nilai dari tinggi batang dan skala sumbu.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Axis Labels",
      "stepDesc": "Sumbu harus bertuliskan apa yang diukur.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Compare Bars",
      "stepDesc": "Batang lebih tinggi = nilai lebih besar.",
      "icon": "✨",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Kerjakan",
      "stepDesc": "Terapkan cara itu pada angka atau gambar soal.",
      "icon": "✏️",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek masuk akal",
      "stepDesc": "Apakah hasilnya masuk akal? Bandingkan dengan perkiraan.",
      "icon": "✅",
      "flowFrom": "5",
      "flowTo": "7"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Simpulkan",
      "stepDesc": "Ulangi ide utamanya dengan kalimatmu sendiri.",
      "icon": "💬",
      "flowFrom": "6",
      "flowTo": "8"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Lanjut main",
      "stepDesc": "Siap melatih di permainan Concrete sampai Abstract.",
      "icon": "🎮",
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
      "countWord": "ingat",
      "suara": "Baca nilai dari tinggi batang dan skala sumbu."
    },
    {
      "judul": "Label Sumbu",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "ingat",
      "suara": "Sumbu harus bertuliskan apa yang diukur."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "baca-batang",
      "title": "Baca Tinggi Batang",
      "bookReference": "hlm. 187–191",
      "objective": "Pakai Skala Batang: Baca nilai dari tinggi batang dan skala sumbu. Latihan: Membaca nilai batang..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Bar Scale: Baca nilai dari tinggi batang dan skala sumbu.",
      "voiceGuide": "Skala Batang. Baca nilai dari tinggi batang dan skala sumbu.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jenis-batang",
      "title": "Tegak atau Mendatar",
      "bookReference": "hlm. 188–191",
      "objective": "Pakai Skala Batang: Baca nilai dari tinggi batang dan skala sumbu. Latihan: Membedakan arah..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Bar Scale: Baca nilai dari tinggi batang dan skala sumbu.",
      "voiceGuide": "Skala Batang. Baca nilai dari tinggi batang dan skala sumbu.",
      "emoji": "↕️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sumbu",
      "title": "Sumbu Tegak dan Datar",
      "bookReference": "hlm. 187–190",
      "objective": "Pakai Skala Batang: Baca nilai dari tinggi batang dan skala sumbu. Latihan: Mengenali sumbu..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Bar Scale: Baca nilai dari tinggi batang dan skala sumbu.",
      "voiceGuide": "Skala Batang. Baca nilai dari tinggi batang dan skala sumbu.",
      "emoji": "➕",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-arah",
      "title": "Pilah Batang Tegak/Mendatar",
      "bookReference": "hlm. 188–191",
      "objective": "Pakai Skala Batang: Baca nilai dari tinggi batang dan skala sumbu. Latihan: Memilah..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Bar Scale: Baca nilai dari tinggi batang dan skala sumbu.",
      "voiceGuide": "Skala Batang. Baca nilai dari tinggi batang dan skala sumbu.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-batang",
      "title": "Jodohkan Fakta Batang",
      "bookReference": "hlm. 189–192",
      "objective": "Menjodohkan.. Ingat Skala Batang.",
      "mechanicDescription": "Tiga ronde. Gunakan Skala Batang.",
      "voiceGuide": "Skala Batang. Jodohkan.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-batang",
      "title": "Memori Diagram Batang",
      "bookReference": "hlm. 189–192",
      "objective": "Memori.. Ingat Skala Batang.",
      "mechanicDescription": "Tiga ronde. Gunakan Skala Batang.",
      "voiceGuide": "Skala Batang. Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-batang",
      "title": "Ketuk Batang Diminta",
      "bookReference": "hlm. 189–193",
      "objective": "Mengetuk batang.. Ingat Skala Batang.",
      "mechanicDescription": "Tiga ronde. Gunakan Skala Batang.",
      "voiceGuide": "Skala Batang. Ketuk.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-arah",
      "title": "Ketuk Semua Arah Batang",
      "bookReference": "hlm. 188–191",
      "objective": "Ketuk semua.. Ingat Skala Batang.",
      "mechanicDescription": "Tiga ronde. Gunakan Skala Batang.",
      "voiceGuide": "Skala Batang. Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-batang",
      "title": "Cerita Transport dan Lomba",
      "bookReference": "hlm. 189–193",
      "objective": "Soal cerita.. Ingat Skala Batang.",
      "mechanicDescription": "Tiga ronde. Gunakan Skala Batang.",
      "voiceGuide": "Skala Batang. Pilih.",
      "emoji": "🚌",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-batang",
      "title": "Urutkan Tinggi Batang",
      "bookReference": "hlm. 189–192",
      "objective": "Mengurutkan nilai.. Ingat Skala Batang.",
      "mechanicDescription": "Tiga ronde. Gunakan Skala Batang.",
      "voiceGuide": "Skala Batang. Urutkan.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "diagram-tegak",
      "title": "Diagram Batang Tegak",
      "bookReference": "hlm. 188–189",
      "objective": "Pakai Label Sumbu: Sumbu harus bertuliskan apa yang diukur. Latihan: Baca tinggi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Axis Labels: Sumbu harus bertuliskan apa yang diukur.",
      "voiceGuide": "Label Sumbu. Sumbu harus bertuliskan apa yang diukur.",
      "diagramType": "bar-v",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "diagram-mendatar",
      "title": "Diagram Batang Mendatar",
      "bookReference": "hlm. 190–192",
      "objective": "Pakai Label Sumbu: Sumbu harus bertuliskan apa yang diukur. Latihan: Baca panjang..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Axis Labels: Sumbu harus bertuliskan apa yang diukur.",
      "voiceGuide": "Label Sumbu. Sumbu harus bertuliskan apa yang diukur.",
      "diagramType": "bar-h",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-b",
      "title": "Jodohkan Diagram Batang",
      "bookReference": "hlm. 189–192",
      "objective": "Pakai Label Sumbu: Sumbu harus bertuliskan apa yang diukur. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Axis Labels: Sumbu harus bertuliskan apa yang diukur.",
      "voiceGuide": "Label Sumbu. Sumbu harus bertuliskan apa yang diukur.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-b",
      "title": "Memori Diagram Batang",
      "bookReference": "hlm. 189–192",
      "objective": "Pakai Label Sumbu: Sumbu harus bertuliskan apa yang diukur. Latihan: Memori..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Axis Labels: Sumbu harus bertuliskan apa yang diukur.",
      "voiceGuide": "Label Sumbu. Sumbu harus bertuliskan apa yang diukur.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-b",
      "title": "Tabel Sumbu–Arti",
      "bookReference": "hlm. 187–191",
      "objective": "Isi tabel.. Ingat Label Sumbu.",
      "mechanicDescription": "Tiga tabel. Gunakan Label Sumbu.",
      "voiceGuide": "Label Sumbu. Pilih.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-b",
      "title": "Ketuk Semua Diagram Arah",
      "bookReference": "hlm. 188–191",
      "objective": "Ketuk semua.. Ingat Label Sumbu.",
      "mechanicDescription": "Tiga ronde. Gunakan Label Sumbu.",
      "voiceGuide": "Label Sumbu. Ketuk semua.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-b",
      "title": "Pilah Diagram Arah",
      "bookReference": "hlm. 188–191",
      "objective": "Pilah.. Ingat Label Sumbu.",
      "mechanicDescription": "Tiga ronde. Gunakan Label Sumbu.",
      "voiceGuide": "Label Sumbu. Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "banding-b",
      "title": "Bandingkan Batang",
      "bookReference": "hlm. 189–193",
      "objective": "Pilih ekstrem.. Ingat Label Sumbu.",
      "mechanicDescription": "Tiga ronde. Gunakan Label Sumbu.",
      "voiceGuide": "Label Sumbu. Pilih.",
      "diagramType": "compare",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "choose-b",
      "title": "Pilih Bacaan Batang",
      "bookReference": "hlm. 189–193",
      "objective": "Pilih pernyataan.. Ingat Label Sumbu.",
      "mechanicDescription": "Tiga ronde. Gunakan Label Sumbu.",
      "voiceGuide": "Label Sumbu. Pilih.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-b",
      "title": "Cerita Diagram Batang",
      "bookReference": "hlm. 189–193",
      "objective": "Cerita + diagram.. Ingat Label Sumbu.",
      "mechanicDescription": "Tiga ronde. Gunakan Label Sumbu.",
      "voiceGuide": "Label Sumbu. Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-istilah-b",
      "title": "Tulis Istilah Batang",
      "bookReference": "hlm. 188–191",
      "objective": "Pakai Banding Batang: Batang lebih tinggi = nilai lebih besar. Latihan: Menulis istilah..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Compare Bars: Batang lebih tinggi = nilai lebih besar.",
      "voiceGuide": "Banding Batang. Batang lebih tinggi = nilai lebih besar.",
      "symbolLarge": "▮",
      "wordLarge": "BATANG",
      "mathNotation": "definisi"
    },
    {
      "stage": "Abstract",
      "gameType": "write-nilai-b",
      "title": "Tulis Nilai Batang",
      "bookReference": "hlm. 189–192",
      "objective": "Pakai Banding Batang: Batang lebih tinggi = nilai lebih besar. Latihan: Menulis angka..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Compare Bars: Batang lebih tinggi = nilai lebih besar.",
      "voiceGuide": "Banding Batang. Batang lebih tinggi = nilai lebih besar.",
      "symbolLarge": "h",
      "wordLarge": "NILAI",
      "mathNotation": "tinggi"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-jenis-b",
      "title": "Pilih Arah Batang",
      "bookReference": "hlm. 188–191",
      "objective": "Pakai Banding Batang: Batang lebih tinggi = nilai lebih besar. Latihan: Tegak/mendatar..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Compare Bars: Batang lebih tinggi = nilai lebih besar.",
      "voiceGuide": "Banding Batang. Batang lebih tinggi = nilai lebih besar.",
      "symbolLarge": "↕️",
      "wordLarge": "ARAH",
      "mathNotation": "klasifikasi"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-b",
      "title": "Urutkan Nilai Batang",
      "bookReference": "hlm. 189–192",
      "objective": "Pakai Banding Batang: Batang lebih tinggi = nilai lebih besar. Latihan: Mengurutkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Compare Bars: Batang lebih tinggi = nilai lebih besar.",
      "voiceGuide": "Banding Batang. Batang lebih tinggi = nilai lebih besar.",
      "symbolLarge": "14>10>5",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-b",
      "title": "Jodohkan Notasi Batang",
      "bookReference": "hlm. 187–192",
      "objective": "Jodohkan.. Ingat Banding Batang.",
      "mechanicDescription": "Tiga ronde. Gunakan Banding Batang.",
      "voiceGuide": "Banding Batang. Jodohkan.",
      "symbolLarge": "Y=banyak",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-b",
      "title": "Memori Notasi Batang",
      "bookReference": "hlm. 187–192",
      "objective": "Memori.. Ingat Banding Batang.",
      "mechanicDescription": "Tiga ronde. Gunakan Banding Batang.",
      "voiceGuide": "Banding Batang. Balik kartu.",
      "symbolLarge": "sumbu",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-b",
      "title": "Benar atau Salah: Batang",
      "bookReference": "hlm. 187–193",
      "objective": "Menilai.. Ingat Banding Batang.",
      "mechanicDescription": "Dua ronde. Gunakan Banding Batang.",
      "voiceGuide": "Banding Batang. Benar/salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-b",
      "title": "Detektif Diagram Batang",
      "bookReference": "hlm. 189–193",
      "objective": "Petunjuk → jawaban.. Ingat Banding Batang.",
      "mechanicDescription": "Tiga soal. Gunakan Banding Batang.",
      "voiceGuide": "Banding Batang. Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-b",
      "title": "Peta Konsep Batang",
      "bookReference": "hlm. 178–191",
      "objective": "Mengisi kotak.. Ingat Banding Batang.",
      "mechanicDescription": "Satu peta. Gunakan Banding Batang.",
      "voiceGuide": "Banding Batang. Pilih opsi.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-b",
      "title": "Cerita Angka Batang",
      "bookReference": "hlm. 189–193",
      "objective": "Soal cerita.. Ingat Banding Batang.",
      "mechanicDescription": "Tiga ronde. Gunakan Banding Batang.",
      "voiceGuide": "Banding Batang. Pilih.",
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
      "ikon": "🌍",
      "nama": "Skala Batang",
      "isi": "Baca nilai dari tinggi batang dan skala sumbu.",
      "suara": "Skala Batang. Baca nilai dari tinggi batang dan skala sumbu."
    },
    {
      "ikon": "🌍",
      "nama": "Label Sumbu",
      "isi": "Sumbu harus bertuliskan apa yang diukur.",
      "suara": "Label Sumbu. Sumbu harus bertuliskan apa yang diukur."
    },
    {
      "ikon": "🌍",
      "nama": "Banding Batang",
      "isi": "Batang lebih tinggi = nilai lebih besar.",
      "suara": "Banding Batang. Batang lebih tinggi = nilai lebih besar."
    }
  ],
  "poinSuara": "Ingat: Skala Batang, Label Sumbu, Banding Batang.",
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
  "rumah": "Ayo Mencoba di rumah: terapkan Skala Batang pada satu benda atau soal nyata, lalu ceritakan langkahmu.",
  "refleksi": [
    "Bagaimana Skala Batang membantumu memahami soal?",
    "Kapan kamu memakai Label Sumbu?",
    "Apa bedanya dengan hanya menghafal rumus atau langkah tanpa arti?"
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
