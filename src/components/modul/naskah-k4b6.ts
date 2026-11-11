/**
 * Naskah — poles kerapatan setara K5B4.
 * Metode luar dianyam ketukan per ketukan.
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
  "targetDescription": "Siswa menyajikan dan menafsirkan data dalam piktogram (diagram gambar), termasuk skala 1 dan skala lebih dari 1, menentukan paling banyak/sedikit serta jumlah keseluruhan sesuai Buku Siswa Kelas IV Bab 6. Siswa memakai cara Kunci Piktogram, Turus Kategori, Baca Lalu Banding. Siswa memakai cara Kunci Piktogram, Turus Kategori, Baca Lalu Banding.",
  "secondaryBg": "#FFEDD5",
  "secondaryBorder": "#EA580C",
  "secondaryText": "#7C2D12",
  "silabus": {
    "teksSuara": "Kita belajar piktogram. Piktogram adalah diagram yang memakai gambar untuk menyatakan banyak tiap kategori. Kadang satu gambar berarti satu benda, kadang satu gambar berarti beberapa. Kita baca dengan menghitung gambar lalu mengalikan skala. Kita memakai cara: Kunci Piktogram, Turus Kategori, Baca Lalu Banding. Satu gambar bisa mewakili lebih dari satu benda. Hitung frekuensi tiap kategori dengan turus. Bandingkan tinggi/banyak simbol antar kategori. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
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
            "Bayangkan kamu sedang mempelajari Piktogram. Ada banyak benda di kelas.",
            "Kita ingin menyajikannya rapi.",
            "Pakai gambar yang mewakili banyak.",
            "Ingat cara Kunci Piktogram: Satu gambar bisa mewakili lebih dari satu benda. Ingat cara Kunci Piktogram: Satu gambar bisa mewakili lebih dari satu benda."
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
            "Di sini kita memakai ide Pictograph Key — Satu gambar bisa mewakili lebih dari satu benda. Di sini kita memakai Pictograph Key. Satu gambar bisa mewakili lebih dari satu benda."
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
            "Satu gambar sama dengan satu siswa.",
            "Empat gambar sama dengan empat siswa.",
            "Mudah dihitung.",
            "Ingat cara Turus Kategori: Hitung frekuensi tiap kategori dengan turus. Ingat cara Turus Kategori: Hitung frekuensi tiap kategori dengan turus."
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
            "Di sini kita memakai ide Categorical Tally — Hitung frekuensi tiap kategori dengan turus. Di sini kita memakai Categorical Tally. Hitung frekuensi tiap kategori dengan turus."
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
            "Mobil enam, robot empat.",
            "Pesawat tiga, puzzle satu.",
            "Kelereng sembilan.",
            "Ingat cara Baca Lalu Banding: Bandingkan tinggi/banyak simbol antar kategori. Ingat cara Baca Lalu Banding: Bandingkan tinggi/banyak simbol antar kategori."
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
            "Ungu empat, kuning dua.",
            "Hitam satu, merah lima.",
            "Total dua belas siswa.",
            "Di sini kita memakai ide Read then Compare — Bandingkan tinggi/banyak simbol antar kategori. Di sini kita memakai Read then Compare. Bandingkan tinggi/banyak simbol antar kategori."
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
      "stepDesc": "Baca soal Piktogram dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa menyajikan dan menafsirkan data dalam piktogram (diagram gambar), termasuk skala 1 dan skala lebih dari 1, menentu….",
      "icon": "❓",
      "flowFrom": "Pahami soal",
      "flowTo": "Pictograph Key"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Pictograph Key",
      "stepDesc": "Satu gambar bisa mewakili lebih dari satu benda. Pada Piktogram, langkah “Pictograph Key” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Kunci Piktogram: Satu gambar bisa mewakili lebih dari satu benda. Turus Kategori: Hitung frekuensi tiap kategori dengan turus. Baca Lalu Banding: Bandingkan tin…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🧭",
      "flowFrom": "Pictograph Key",
      "flowTo": "Categorical Tally"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Categorical Tally",
      "stepDesc": "Hitung frekuensi tiap kategori dengan turus. Pada Piktogram, langkah “Categorical Tally” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Kunci Piktogram: Satu gambar bisa mewakili lebih dari satu benda. Turus Kategori: Hitung frekuensi tiap kategori dengan turus. Baca Lalu Banding: Bandingkan tin…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🛠️",
      "flowFrom": "Categorical Tally",
      "flowTo": "Read then Compare"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Read then Compare",
      "stepDesc": "Bandingkan tinggi/banyak simbol antar kategori. Pada Piktogram, langkah “Read then Compare” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Kunci Piktogram: Satu gambar bisa mewakili lebih dari satu benda. Turus Kategori: Hitung frekuensi tiap kategori dengan turus. Baca Lalu Banding: Bandingkan tin…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "✨",
      "flowFrom": "Read then Compare",
      "flowTo": "Kerjakan"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Kerjakan",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Piktogram. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "✏️",
      "flowFrom": "Kerjakan",
      "flowTo": "Cek masuk akal"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek masuk akal",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Piktogram. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Cek masuk akal",
      "flowTo": "Simpulkan"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Simpulkan",
      "stepDesc": "Simpulkan ide utama Piktogram dengan kalimatmu sendiri. Sebutkan cara yang kamu pakai dan mengapa cara itu membantu. Jelaskan kepada teman seolah-olah kamu guru kecil. Simpulan yang jelas menandakan konsepnya sudah dipahami.",
      "icon": "💬",
      "flowFrom": "Simpulkan",
      "flowTo": "Main"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Main",
      "stepDesc": "Latih lagi di tahap Concrete, Picture, lalu Abstract untuk Piktogram. Mulai dari benda nyata, lanjut ke diagram, baru ke lambang angka. Ulangi sampai kamu bisa menjelaskan tanpa melihat contoh. Bermain sambil berlatih membuat konsepnya melekat lebih lama.",
      "icon": "🎮",
      "flowFrom": "Main",
      "flowTo": "Latihan Concrete–Abstract"
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
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-gambar",
      "title": "Hitung Gambar Piktogram",
      "bookReference": "hlm. 180–184",
      "objective": "Pakai Kunci Piktogram: Satu gambar bisa mewakili lebih dari satu benda. Latihan: Menghitung nilai dari banyak gambar..",
      "mechanicDescription": "Tiga ronde data buku. Saat bermain, ingat Kunci Piktogram: Satu gambar bisa mewakili lebih dari satu benda.",
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
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Kunci Piktogram: Satu gambar bisa mewakili lebih dari satu benda.",
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
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Kunci Piktogram: Satu gambar bisa mewakili lebih dari satu benda.",
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
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Kunci Piktogram: Satu gambar bisa mewakili lebih dari satu benda.",
      "voiceGuide": "Kunci Piktogram. Satu gambar bisa mewakili lebih dari satu benda.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-data",
      "title": "Jodohkan Data Piktogram",
      "bookReference": "hlm. 181–186",
      "objective": "Menjodohkan fakta data.. Ingat Kunci Piktogram. (Kunci Piktogram)",
      "mechanicDescription": "Tiga ronde. Gunakan Kunci Piktogram.",
      "voiceGuide": "Kunci Piktogram. Mainkan dengan teliti.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-data",
      "title": "Memori Data Gambar",
      "bookReference": "hlm. 181–184",
      "objective": "Memori pasangan data.. Ingat Kunci Piktogram. (Kunci Piktogram)",
      "mechanicDescription": "Tiga ronde. Gunakan Kunci Piktogram.",
      "voiceGuide": "Kunci Piktogram. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-kategori",
      "title": "Ketuk Kategori Diminta",
      "bookReference": "hlm. 180–184",
      "objective": "Mengetuk baris data.. Ingat Kunci Piktogram. (Kunci Piktogram)",
      "mechanicDescription": "Tiga ronde. Gunakan Kunci Piktogram.",
      "voiceGuide": "Kunci Piktogram. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-nilai",
      "title": "Ketuk Semua Sesuai Nilai",
      "bookReference": "hlm. 181–184",
      "objective": "Ketuk semua yang cocok.. Ingat Kunci Piktogram. (Kunci Piktogram)",
      "mechanicDescription": "Tiga ronde. Gunakan Kunci Piktogram.",
      "voiceGuide": "Kunci Piktogram. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-pikto",
      "title": "Cerita Mainan dan Warna",
      "bookReference": "hlm. 181–184",
      "objective": "Soal cerita data.. Ingat Kunci Piktogram. (Kunci Piktogram)",
      "mechanicDescription": "Tiga ronde. Gunakan Kunci Piktogram.",
      "voiceGuide": "Kunci Piktogram. Mainkan dengan teliti.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-nilai",
      "title": "Urutkan Nilai Data",
      "bookReference": "hlm. 181–185",
      "objective": "Mengurutkan banyak.. Ingat Kunci Piktogram. (Kunci Piktogram)",
      "mechanicDescription": "Tiga ronde. Gunakan Kunci Piktogram.",
      "voiceGuide": "Kunci Piktogram. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "diagram-hitung",
      "title": "Diagram Hitung Simbol",
      "bookReference": "hlm. 180–184",
      "objective": "Pakai Turus Kategori: Hitung frekuensi tiap kategori dengan turus. Latihan: Baca diagram gambar..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Turus Kategori: Hitung frekuensi tiap kategori dengan turus.",
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
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Turus Kategori: Hitung frekuensi tiap kategori dengan turus.",
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
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Turus Kategori: Hitung frekuensi tiap kategori dengan turus.",
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
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Turus Kategori: Hitung frekuensi tiap kategori dengan turus.",
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
      "objective": "Isi tabel.. Ingat Turus Kategori. (Turus Kategori)",
      "mechanicDescription": "Tiga tabel. Gunakan Turus Kategori.",
      "voiceGuide": "Turus Kategori. Mainkan dengan teliti.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-a",
      "title": "Ketuk Semua Diagram",
      "bookReference": "hlm. 181–184",
      "objective": "Ketuk semua.. Ingat Turus Kategori. (Turus Kategori)",
      "mechanicDescription": "Tiga ronde. Gunakan Turus Kategori.",
      "voiceGuide": "Turus Kategori. Mainkan dengan teliti.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-a",
      "title": "Pilah Diagram Gambar",
      "bookReference": "hlm. 184",
      "objective": "Pilah.. Ingat Turus Kategori. (Turus Kategori)",
      "mechanicDescription": "Tiga ronde. Gunakan Turus Kategori.",
      "voiceGuide": "Turus Kategori. Mainkan dengan teliti.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "banding-a",
      "title": "Bandingkan Paling Banyak",
      "bookReference": "hlm. 180–185",
      "objective": "Pilih ekstrem.. Ingat Turus Kategori. (Turus Kategori)",
      "mechanicDescription": "Tiga ronde. Gunakan Turus Kategori.",
      "voiceGuide": "Turus Kategori. Mainkan dengan teliti.",
      "diagramType": "max",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "choose-a",
      "title": "Pilih Bacaan Cocok",
      "bookReference": "hlm. 181–186",
      "objective": "Pilih pernyataan.. Ingat Turus Kategori. (Turus Kategori)",
      "mechanicDescription": "Tiga ronde. Gunakan Turus Kategori.",
      "voiceGuide": "Turus Kategori. Mainkan dengan teliti.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-a",
      "title": "Cerita Diagram Gambar",
      "bookReference": "hlm. 181–186",
      "objective": "Cerita + diagram.. Ingat Turus Kategori. (Turus Kategori)",
      "mechanicDescription": "Tiga ronde. Gunakan Turus Kategori.",
      "voiceGuide": "Turus Kategori. Mainkan dengan teliti.",
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
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Baca Lalu Banding: Bandingkan tinggi/banyak simbol antar kategori.",
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
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Baca Lalu Banding: Bandingkan tinggi/banyak simbol antar kategori.",
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
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Baca Lalu Banding: Bandingkan tinggi/banyak simbol antar kategori.",
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
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Baca Lalu Banding: Bandingkan tinggi/banyak simbol antar kategori.",
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
      "objective": "Jodohkan.. Ingat Baca Lalu Banding. (Baca Lalu Banding)",
      "mechanicDescription": "Tiga ronde. Gunakan Baca Lalu Banding.",
      "voiceGuide": "Baca Lalu Banding. Mainkan dengan teliti.",
      "symbolLarge": "★=4",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-a",
      "title": "Memori Notasi Data",
      "bookReference": "hlm. 181–184",
      "objective": "Memori.. Ingat Baca Lalu Banding. (Baca Lalu Banding)",
      "mechanicDescription": "Tiga ronde. Gunakan Baca Lalu Banding.",
      "voiceGuide": "Baca Lalu Banding. Mainkan dengan teliti.",
      "symbolLarge": "total",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-a",
      "title": "Benar atau Salah: Piktogram",
      "bookReference": "hlm. 180–186",
      "objective": "Menilai.. Ingat Baca Lalu Banding. (Baca Lalu Banding)",
      "mechanicDescription": "Dua ronde. Gunakan Baca Lalu Banding.",
      "voiceGuide": "Baca Lalu Banding. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-a",
      "title": "Detektif Piktogram",
      "bookReference": "hlm. 181–186",
      "objective": "Petunjuk → jawaban.. Ingat Baca Lalu Banding. (Baca Lalu Banding)",
      "mechanicDescription": "Tiga soal. Gunakan Baca Lalu Banding.",
      "voiceGuide": "Baca Lalu Banding. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-a",
      "title": "Peta Konsep Piktogram",
      "bookReference": "hlm. 178–184",
      "objective": "Mengisi kotak.. Ingat Baca Lalu Banding. (Baca Lalu Banding)",
      "mechanicDescription": "Satu peta. Gunakan Baca Lalu Banding.",
      "voiceGuide": "Baca Lalu Banding. Mainkan dengan teliti.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-a",
      "title": "Cerita Angka Data",
      "bookReference": "hlm. 181–186",
      "objective": "Soal cerita.. Ingat Baca Lalu Banding. (Baca Lalu Banding)",
      "mechanicDescription": "Tiga ronde. Gunakan Baca Lalu Banding.",
      "voiceGuide": "Baca Lalu Banding. Mainkan dengan teliti.",
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
  "rumah": "Ayo Mencoba: terapkan Kunci Piktogram pada satu soal nyata di rumah.",
  "refleksi": [
    "Bagaimana Kunci Piktogram membantumu?",
    "Kapan memakai Turus Kategori?",
    "Apa bedanya dengan hanya menghafal tanpa arti?"
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
  "targetDescription": "Siswa menyajikan dan menafsirkan data dalam diagram batang tegak maupun mendatar, membaca sumbu, membandingkan tinggi/panjang batang, serta menentukan paling banyak/sedikit dan jumlah sesuai Buku Siswa Kelas IV Bab 6. Siswa memakai cara Skala Batang, Label Sumbu, Banding Batang. Siswa memakai cara Skala Batang, Label Sumbu, Banding Batang.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Kita belajar diagram batang. Diagram batang memakai batang persegi panjang untuk menunjukkan banyak tiap kategori. Ada yang tegak dan ada yang mendatar. Sumbu membantu kita membaca nilai. Kita memakai cara: Skala Batang, Label Sumbu, Banding Batang. Baca nilai dari tinggi batang dan skala sumbu. Sumbu harus bertuliskan apa yang diukur. Batang lebih tinggi = nilai lebih besar. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
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
            "Bayangkan kamu sedang mempelajari Diagram Batang. Data juga bisa digambar batang.",
            "Batang berbentuk persegi panjang.",
            "Tinggi atau panjang menunjukkan nilai.",
            "Ingat cara Skala Batang: Baca nilai dari tinggi batang dan skala sumbu. Ingat cara Skala Batang: Baca nilai dari tinggi batang dan skala sumbu."
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
            "Di sini kita memakai ide Bar Scale — Baca nilai dari tinggi batang dan skala sumbu. Di sini kita memakai Bar Scale. Baca nilai dari tinggi batang dan skala sumbu."
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
            "Pada batang tegak, lihat tingginya.",
            "Samakan dengan skala sumbu.",
            "Itulah nilai kategori.",
            "Ingat cara Label Sumbu: Sumbu harus bertuliskan apa yang diukur. Ingat cara Label Sumbu: Sumbu harus bertuliskan apa yang diukur."
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
            "Di sini kita memakai ide Axis Labels — Sumbu harus bertuliskan apa yang diukur. Di sini kita memakai Axis Labels. Sumbu harus bertuliskan apa yang diukur."
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
            "Ada jalan kaki, sepeda, motor.",
            "Ada juga becak atau lainnya.",
            "Batang tertinggi paling banyak dipakai.",
            "Ingat cara Banding Batang: Batang lebih tinggi = nilai lebih besar. Ingat cara Banding Batang: Batang lebih tinggi = nilai lebih besar."
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
            "Di sini kita memakai ide Compare Bars — Batang lebih tinggi = nilai lebih besar. Di sini kita memakai Compare Bars. Batang lebih tinggi = nilai lebih besar."
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
      "stepDesc": "Baca soal Diagram Batang dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa menyajikan dan menafsirkan data dalam diagram batang tegak maupun mendatar, membaca sumbu, membandingkan tinggi/pa….",
      "icon": "❓",
      "flowFrom": "Pahami soal",
      "flowTo": "Bar Scale"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Bar Scale",
      "stepDesc": "Baca nilai dari tinggi batang dan skala sumbu. Pada Diagram Batang, langkah “Bar Scale” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Skala Batang: Baca nilai dari tinggi batang dan skala sumbu. Label Sumbu: Sumbu harus bertuliskan apa yang diukur. Banding Batang: Batang lebih tinggi = nilai l…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🧭",
      "flowFrom": "Bar Scale",
      "flowTo": "Axis Labels"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Axis Labels",
      "stepDesc": "Sumbu harus bertuliskan apa yang diukur. Pada Diagram Batang, langkah “Axis Labels” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Skala Batang: Baca nilai dari tinggi batang dan skala sumbu. Label Sumbu: Sumbu harus bertuliskan apa yang diukur. Banding Batang: Batang lebih tinggi = nilai l…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🛠️",
      "flowFrom": "Axis Labels",
      "flowTo": "Compare Bars"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Compare Bars",
      "stepDesc": "Batang lebih tinggi = nilai lebih besar. Pada Diagram Batang, langkah “Compare Bars” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Skala Batang: Baca nilai dari tinggi batang dan skala sumbu. Label Sumbu: Sumbu harus bertuliskan apa yang diukur. Banding Batang: Batang lebih tinggi = nilai l…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "✨",
      "flowFrom": "Compare Bars",
      "flowTo": "Kerjakan"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Kerjakan",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Diagram Batang. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "✏️",
      "flowFrom": "Kerjakan",
      "flowTo": "Cek masuk akal"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek masuk akal",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Diagram Batang. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Cek masuk akal",
      "flowTo": "Simpulkan"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Simpulkan",
      "stepDesc": "Simpulkan ide utama Diagram Batang dengan kalimatmu sendiri. Sebutkan cara yang kamu pakai dan mengapa cara itu membantu. Jelaskan kepada teman seolah-olah kamu guru kecil. Simpulan yang jelas menandakan konsepnya sudah dipahami.",
      "icon": "💬",
      "flowFrom": "Simpulkan",
      "flowTo": "Main"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Main",
      "stepDesc": "Latih lagi di tahap Concrete, Picture, lalu Abstract untuk Diagram Batang. Mulai dari benda nyata, lanjut ke diagram, baru ke lambang angka. Ulangi sampai kamu bisa menjelaskan tanpa melihat contoh. Bermain sambil berlatih membuat konsepnya melekat lebih lama.",
      "icon": "🎮",
      "flowFrom": "Main",
      "flowTo": "Latihan Concrete–Abstract"
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
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "baca-batang",
      "title": "Baca Tinggi Batang",
      "bookReference": "hlm. 187–191",
      "objective": "Pakai Skala Batang: Baca nilai dari tinggi batang dan skala sumbu. Latihan: Membaca nilai batang..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Skala Batang: Baca nilai dari tinggi batang dan skala sumbu.",
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
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Skala Batang: Baca nilai dari tinggi batang dan skala sumbu.",
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
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Skala Batang: Baca nilai dari tinggi batang dan skala sumbu.",
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
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Skala Batang: Baca nilai dari tinggi batang dan skala sumbu.",
      "voiceGuide": "Skala Batang. Baca nilai dari tinggi batang dan skala sumbu.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-batang",
      "title": "Jodohkan Fakta Batang",
      "bookReference": "hlm. 189–192",
      "objective": "Menjodohkan.. Ingat Skala Batang. (Skala Batang)",
      "mechanicDescription": "Tiga ronde. Gunakan Skala Batang.",
      "voiceGuide": "Skala Batang. Mainkan dengan teliti.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-batang",
      "title": "Memori Diagram Batang",
      "bookReference": "hlm. 189–192",
      "objective": "Memori.. Ingat Skala Batang. (Skala Batang)",
      "mechanicDescription": "Tiga ronde. Gunakan Skala Batang.",
      "voiceGuide": "Skala Batang. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-batang",
      "title": "Ketuk Batang Diminta",
      "bookReference": "hlm. 189–193",
      "objective": "Mengetuk batang.. Ingat Skala Batang. (Skala Batang)",
      "mechanicDescription": "Tiga ronde. Gunakan Skala Batang.",
      "voiceGuide": "Skala Batang. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-arah",
      "title": "Ketuk Semua Arah Batang",
      "bookReference": "hlm. 188–191",
      "objective": "Ketuk semua.. Ingat Skala Batang. (Skala Batang)",
      "mechanicDescription": "Tiga ronde. Gunakan Skala Batang.",
      "voiceGuide": "Skala Batang. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-batang",
      "title": "Cerita Transport dan Lomba",
      "bookReference": "hlm. 189–193",
      "objective": "Soal cerita.. Ingat Skala Batang. (Skala Batang)",
      "mechanicDescription": "Tiga ronde. Gunakan Skala Batang.",
      "voiceGuide": "Skala Batang. Mainkan dengan teliti.",
      "emoji": "🚌",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-batang",
      "title": "Urutkan Tinggi Batang",
      "bookReference": "hlm. 189–192",
      "objective": "Mengurutkan nilai.. Ingat Skala Batang. (Skala Batang)",
      "mechanicDescription": "Tiga ronde. Gunakan Skala Batang.",
      "voiceGuide": "Skala Batang. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "diagram-tegak",
      "title": "Diagram Batang Tegak",
      "bookReference": "hlm. 188–189",
      "objective": "Pakai Label Sumbu: Sumbu harus bertuliskan apa yang diukur. Latihan: Baca tinggi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Label Sumbu: Sumbu harus bertuliskan apa yang diukur.",
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
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Label Sumbu: Sumbu harus bertuliskan apa yang diukur.",
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
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Label Sumbu: Sumbu harus bertuliskan apa yang diukur.",
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
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Label Sumbu: Sumbu harus bertuliskan apa yang diukur.",
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
      "objective": "Isi tabel.. Ingat Label Sumbu. (Label Sumbu)",
      "mechanicDescription": "Tiga tabel. Gunakan Label Sumbu.",
      "voiceGuide": "Label Sumbu. Mainkan dengan teliti.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-b",
      "title": "Ketuk Semua Diagram Arah",
      "bookReference": "hlm. 188–191",
      "objective": "Ketuk semua.. Ingat Label Sumbu. (Label Sumbu)",
      "mechanicDescription": "Tiga ronde. Gunakan Label Sumbu.",
      "voiceGuide": "Label Sumbu. Mainkan dengan teliti.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-b",
      "title": "Pilah Diagram Arah",
      "bookReference": "hlm. 188–191",
      "objective": "Pilah.. Ingat Label Sumbu. (Label Sumbu)",
      "mechanicDescription": "Tiga ronde. Gunakan Label Sumbu.",
      "voiceGuide": "Label Sumbu. Mainkan dengan teliti.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "banding-b",
      "title": "Bandingkan Batang",
      "bookReference": "hlm. 189–193",
      "objective": "Pilih ekstrem.. Ingat Label Sumbu. (Label Sumbu)",
      "mechanicDescription": "Tiga ronde. Gunakan Label Sumbu.",
      "voiceGuide": "Label Sumbu. Mainkan dengan teliti.",
      "diagramType": "compare",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "choose-b",
      "title": "Pilih Bacaan Batang",
      "bookReference": "hlm. 189–193",
      "objective": "Pilih pernyataan.. Ingat Label Sumbu. (Label Sumbu)",
      "mechanicDescription": "Tiga ronde. Gunakan Label Sumbu.",
      "voiceGuide": "Label Sumbu. Mainkan dengan teliti.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-b",
      "title": "Cerita Diagram Batang",
      "bookReference": "hlm. 189–193",
      "objective": "Cerita + diagram.. Ingat Label Sumbu. (Label Sumbu)",
      "mechanicDescription": "Tiga ronde. Gunakan Label Sumbu.",
      "voiceGuide": "Label Sumbu. Mainkan dengan teliti.",
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
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Banding Batang: Batang lebih tinggi = nilai lebih besar.",
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
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Banding Batang: Batang lebih tinggi = nilai lebih besar.",
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
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Banding Batang: Batang lebih tinggi = nilai lebih besar.",
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
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Banding Batang: Batang lebih tinggi = nilai lebih besar.",
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
      "objective": "Jodohkan.. Ingat Banding Batang. (Banding Batang)",
      "mechanicDescription": "Tiga ronde. Gunakan Banding Batang.",
      "voiceGuide": "Banding Batang. Mainkan dengan teliti.",
      "symbolLarge": "Y=banyak",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-b",
      "title": "Memori Notasi Batang",
      "bookReference": "hlm. 187–192",
      "objective": "Memori.. Ingat Banding Batang. (Banding Batang)",
      "mechanicDescription": "Tiga ronde. Gunakan Banding Batang.",
      "voiceGuide": "Banding Batang. Mainkan dengan teliti.",
      "symbolLarge": "sumbu",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-b",
      "title": "Benar atau Salah: Batang",
      "bookReference": "hlm. 187–193",
      "objective": "Menilai.. Ingat Banding Batang. (Banding Batang)",
      "mechanicDescription": "Dua ronde. Gunakan Banding Batang.",
      "voiceGuide": "Banding Batang. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-b",
      "title": "Detektif Diagram Batang",
      "bookReference": "hlm. 189–193",
      "objective": "Petunjuk → jawaban.. Ingat Banding Batang. (Banding Batang)",
      "mechanicDescription": "Tiga soal. Gunakan Banding Batang.",
      "voiceGuide": "Banding Batang. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-b",
      "title": "Peta Konsep Batang",
      "bookReference": "hlm. 178–191",
      "objective": "Mengisi kotak.. Ingat Banding Batang. (Banding Batang)",
      "mechanicDescription": "Satu peta. Gunakan Banding Batang.",
      "voiceGuide": "Banding Batang. Mainkan dengan teliti.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-b",
      "title": "Cerita Angka Batang",
      "bookReference": "hlm. 189–193",
      "objective": "Soal cerita.. Ingat Banding Batang. (Banding Batang)",
      "mechanicDescription": "Tiga ronde. Gunakan Banding Batang.",
      "voiceGuide": "Banding Batang. Mainkan dengan teliti.",
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
  "rumah": "Ayo Mencoba: terapkan Skala Batang pada satu soal nyata di rumah.",
  "refleksi": [
    "Bagaimana Skala Batang membantumu?",
    "Kapan memakai Label Sumbu?",
    "Apa bedanya dengan hanya menghafal tanpa arti?"
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
