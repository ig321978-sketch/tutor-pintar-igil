/**
 * Naskah Matematika Kelas 5 Bab 5 — Luas Daerah Bangun Datar (mendalam + metode luar berlabel).
 * Sumber buku: Kemendikbudristek Bab 5 hlm. 131–162.
 * Satu sumber: buat-k5-bab5.mjs → kelas5-bab5.json. Tanpa React/jaringan.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K5B5_META = {
  "chapterId": "k5-mat-bab5",
  "phaseCode": "FASE_C",
  "grade": 5,
  "subjectLabel": "MATEMATIKA - KELAS 5 SD",
  "title": "BAB 5: LUAS DAERAH BANGUN DATAR",
  "silabusElemen": "🌈 Fase C • Elemen Pengukuran: Luas Daerah Bangun Datar — Konsep, Rumus, Gabungan, dan Hubungan Keliling–Luas (Kelas 5 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A55: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Konsep Luas)",
  "fullTitle": "Sub-Bab A: Konsep Luas Daerah Bangun Datar",
  "targetDescription": "Siswa memahami luas sebagai ukuran daerah di dalam batas bangun, mengukur dengan pengubinan petak satuan (cm²/m²), memakai Array Model pada persegi panjang, serta konservasi luas ala Cara Yohana sesuai Buku Siswa Kelas V Bab 5 Sub-Bab A hlm. 133–143.",
  "secondaryBg": "#FFEDD5",
  "secondaryBorder": "#EA580C",
  "secondaryText": "#7C2D12",
  "silabus": {
    "teksSuara": "Kita belajar apa itu luas daerah. Luas menjawab: seberapa besar daerah di dalam batas bangun. Kita menutup lantai dengan ubin atau petak satuan sampai rapat. Guru dunia menyebutnya Unit Square Covering dan Array Model. Ada juga Cara Yohana: potong-tempel petak tak utuh tanpa mengubah luas, namanya Area Conservation. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menjelaskan arti luas, satuan luas, dan menghitung luas dengan petak satuan serta pengubinan.",
    "referensi": "Buku Siswa Matematika Kelas V Bab 5 Sub-Bab A hlm. 133–143; METODE LUAR · Unit Square Covering; Array Model; Area Conservation (Cara Yohana)."
  },
  "videos": [],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Tanya luas",
      "stepDesc": "Baca soal Konsep Luas Daerah Bangun Datar dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Seberapa besar daerah dalam? Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa memahami luas sebagai ukuran daerah di dalam batas bangun, mengukur dengan pengubinan petak satuan (cm²/m²), memak….",
      "icon": "❓",
      "flowFrom": "Tanya luas",
      "flowTo": "Satuan"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Satuan",
      "stepDesc": "cm² / m² / petak. Pada Konsep Luas Daerah Bangun Datar, langkah “Satuan” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "📐",
      "flowFrom": "Satuan",
      "flowTo": "Covering"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Covering",
      "stepDesc": "Tutup rapat petak. Pada Konsep Luas Daerah Bangun Datar, langkah “Covering” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🧩",
      "flowFrom": "Covering",
      "flowTo": "Array"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Array",
      "stepDesc": "baris × kolom. Pada Konsep Luas Daerah Bangun Datar, langkah “Array” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "▦",
      "flowFrom": "Array",
      "flowTo": "Konservasi"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Konservasi",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Konsep Luas Daerah Bangun Datar. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "✂️",
      "flowFrom": "Konservasi",
      "flowTo": "Bukan K"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Bukan K",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Konsep Luas Daerah Bangun Datar. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "⚠️",
      "flowFrom": "Bukan K",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Arti luas",
      "emoji": "⬜",
      "countNum": 1,
      "countWord": "daerah dalam",
      "suara": "Arti luas — daerah dalam. Pada Konsep Luas Daerah Bangun Datar, cocokkan gambar “Arti luas” dengan artinya (daerah dalam), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "⬜ Arti luas: daerah dalam"
    },
    {
      "judul": "Satuan",
      "emoji": "📐",
      "countNum": 1,
      "countWord": "cm² / m²",
      "suara": "Satuan — cm² / m². Buat persegi 1 cm kali 1 cm. Itu 1 sentimeter persegi. Atau 1 m kali 1 m untuk 1 meter persegi. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Konsep Luas Daerah Bangun Datar.",
      "teksVisual": "📐 Satuan: cm² / m²"
    },
    {
      "judul": "Covering",
      "emoji": "🧩",
      "countNum": 1,
      "countWord": "Unit Square",
      "suara": "Covering — Unit Square. Pada Konsep Luas Daerah Bangun Datar, cocokkan gambar “Covering” dengan artinya (Unit Square), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🧩 Covering: Unit Square"
    },
    {
      "judul": "Array",
      "emoji": "▦",
      "countNum": 10,
      "countWord": "5×2=10",
      "suara": "Array — 5×2=10. Pada persegi panjang, petak tersusun baris dan kolom. Luas sama dengan banyak baris dikali banyak kolom. Ingat: baris×kolom; 5×2; 10. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Konsep Luas…",
      "teksVisual": "▦ Array: 5×2=10"
    },
    {
      "judul": "Ubin",
      "emoji": "🧱",
      "countNum": 1,
      "countWord": "1 m²",
      "suara": "Ubin — 1 m². Pada Konsep Luas Daerah Bangun Datar, cocokkan gambar “Ubin” dengan artinya (1 m²), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Konsep Luas Daerah Bangun…",
      "teksVisual": "🧱 Ubin: 1 m²"
    },
    {
      "judul": "Alun-Alun",
      "emoji": "🏖️",
      "countNum": 1,
      "countWord": "butuh luas",
      "suara": "Alun-Alun — butuh luas. Di buku ada Alun-Alun Utara Keraton Yogyakarta yang dipugar dengan pasir pantai. Banyak pasir bergantung pada seberapa besar daerah alun-alun yang ditutup. Ingat: Alun-Alun; pasir menutup; daerah dalam.",
      "teksVisual": "🏖️ Alun-Alun: butuh luas"
    },
    {
      "judul": "Yohana",
      "emoji": "✂️",
      "countNum": 9,
      "countWord": "luas tetap",
      "suara": "Yohana — luas tetap. Pada Konsep Luas Daerah Bangun Datar, cocokkan gambar “Yohana” dengan artinya (luas tetap), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "✂️ Yohana: luas tetap"
    },
    {
      "judul": "Bukan K",
      "emoji": "⭕",
      "countNum": 1,
      "countWord": "path length",
      "suara": "Bukan K — path length. Keliling menjawab panjang jalur di tepi luar. Luas menjawab isi daerah di dalam. Ingat: keliling = tepi; luas = dalam; jangan tertukar.",
      "teksVisual": "⭕ Bukan K: path length"
    },
    {
      "judul": "Metode",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "3 label luar",
      "suara": "Covering·Array·Conservation. Pada Konsep Luas Daerah Bangun Datar, cocokkan gambar “Metode” dengan artinya (3 label luar), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🌍 Metode: 3 label luar"
    },
    {
      "judul": "Siap B",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "rumus bangun",
      "suara": "Siap B (rumus bangun). Skala kualitatif sudah siap. Berikutnya bandingkan dua peluang dengan rasio untung/total, lalu putuskan adil atau kurang adil. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Konsep Luas…",
      "teksVisual": "➡️ Siap B: rumus bangun"
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-a-c",
      "title": "Hitung Petak",
      "bookReference": "hlm. 133–143",
      "objective": "Ukur daerah dalam dengan petak satuan, Array Model, dan konservasi luas.",
      "mechanicDescription": "Tiga ronde. Terapkan Unit Square Covering / Array / Conservation sesuai soal.",
      "voiceGuide": "Hitung petak atau pilih arti luas. Bukan keliling.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-a-c",
      "title": "Arti Luas",
      "bookReference": "hlm. 133–143",
      "objective": "Ukur daerah dalam dengan petak satuan, Array Model, dan konservasi luas.",
      "mechanicDescription": "Tiga ronde. Terapkan Unit Square Covering / Array / Conservation sesuai soal.",
      "voiceGuide": "Hitung petak atau pilih arti luas. Bukan keliling.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-a-c",
      "title": "Pilih Definisi",
      "bookReference": "hlm. 133–143",
      "objective": "Ukur daerah dalam dengan petak satuan, Array Model, dan konservasi luas.",
      "mechanicDescription": "Tiga ronde. Terapkan Unit Square Covering / Array / Conservation sesuai soal.",
      "voiceGuide": "Hitung petak atau pilih arti luas. Bukan keliling.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-a-c",
      "title": "Pilah Luas/Bukan",
      "bookReference": "hlm. 133–143",
      "objective": "Ukur daerah dalam dengan petak satuan, Array Model, dan konservasi luas.",
      "mechanicDescription": "Tiga ronde. Terapkan Unit Square Covering / Array / Conservation sesuai soal.",
      "voiceGuide": "Hitung petak atau pilih arti luas. Bukan keliling.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-a-c",
      "title": "Jodohkan Konsep",
      "bookReference": "hlm. 133–143",
      "objective": "Ukur daerah dalam dengan petak satuan, Array Model, dan konservasi luas.",
      "mechanicDescription": "Tiga ronde. Terapkan Unit Square Covering / Array / Conservation sesuai soal.",
      "voiceGuide": "Hitung petak atau pilih arti luas. Bukan keliling.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-a-c",
      "title": "Memori Luas",
      "bookReference": "hlm. 133–143",
      "objective": "Ukur daerah dalam dengan petak satuan, Array Model, dan konservasi luas.",
      "mechanicDescription": "Tiga ronde. Terapkan Unit Square Covering / Array / Conservation sesuai soal.",
      "voiceGuide": "Hitung petak atau pilih arti luas. Bukan keliling.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-a-c",
      "title": "Ketuk Hasil",
      "bookReference": "hlm. 133–143",
      "objective": "Ukur daerah dalam dengan petak satuan, Array Model, dan konservasi luas.",
      "mechanicDescription": "Tiga ronde. Terapkan Unit Square Covering / Array / Conservation sesuai soal.",
      "voiceGuide": "Hitung petak atau pilih arti luas. Bukan keliling.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-a-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 133–143",
      "objective": "Ukur daerah dalam dengan petak satuan, Array Model, dan konservasi luas.",
      "mechanicDescription": "Tiga ronde. Terapkan Unit Square Covering / Array / Conservation sesuai soal.",
      "voiceGuide": "Hitung petak atau pilih arti luas. Bukan keliling.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-a-c",
      "title": "Cerita Ubin & Pasir",
      "bookReference": "hlm. 133–143",
      "objective": "Ukur daerah dalam dengan petak satuan, Array Model, dan konservasi luas.",
      "mechanicDescription": "Tiga ronde. Terapkan Unit Square Covering / Array / Conservation sesuai soal.",
      "voiceGuide": "Hitung petak atau pilih arti luas. Bukan keliling.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-a-c",
      "title": "Urutkan Luas",
      "bookReference": "hlm. 133–143",
      "objective": "Ukur daerah dalam dengan petak satuan, Array Model, dan konservasi luas.",
      "mechanicDescription": "Tiga ronde. Terapkan Unit Square Covering / Array / Conservation sesuai soal.",
      "voiceGuide": "Hitung petak atau pilih arti luas. Bukan keliling.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-a-p",
      "title": "Diagram Hitung Petak",
      "bookReference": "hlm. 133–143",
      "objective": "Ukur daerah dalam dengan petak satuan, Array Model, dan konservasi luas.",
      "mechanicDescription": "Tiga ronde. Terapkan Unit Square Covering / Array / Conservation sesuai soal.",
      "voiceGuide": "Hitung petak atau pilih arti luas. Bukan keliling.",
      "diagramType": "hitung",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "rumus-a-p",
      "title": "Diagram Arti Luas",
      "bookReference": "hlm. 133–143",
      "objective": "Ukur daerah dalam dengan petak satuan, Array Model, dan konservasi luas.",
      "mechanicDescription": "Tiga ronde. Terapkan Unit Square Covering / Array / Conservation sesuai soal.",
      "voiceGuide": "Hitung petak atau pilih arti luas. Bukan keliling.",
      "diagramType": "rumus",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "arti-a-p",
      "title": "Diagram Pilih Definisi",
      "bookReference": "hlm. 133–143",
      "objective": "Ukur daerah dalam dengan petak satuan, Array Model, dan konservasi luas.",
      "mechanicDescription": "Tiga ronde. Terapkan Unit Square Covering / Array / Conservation sesuai soal.",
      "voiceGuide": "Hitung petak atau pilih arti luas. Bukan keliling.",
      "diagramType": "arti",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sortir-a-p",
      "title": "Diagram Pilah Luas/Bukan",
      "bookReference": "hlm. 133–143",
      "objective": "Ukur daerah dalam dengan petak satuan, Array Model, dan konservasi luas.",
      "mechanicDescription": "Tiga ronde. Terapkan Unit Square Covering / Array / Conservation sesuai soal.",
      "voiceGuide": "Hitung petak atau pilih arti luas. Bukan keliling.",
      "diagramType": "sortir",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-a-p",
      "title": "Diagram Jodohkan Konsep",
      "bookReference": "hlm. 133–143",
      "objective": "Ukur daerah dalam dengan petak satuan, Array Model, dan konservasi luas.",
      "mechanicDescription": "Tiga ronde. Terapkan Unit Square Covering / Array / Conservation sesuai soal.",
      "voiceGuide": "Hitung petak atau pilih arti luas. Bukan keliling.",
      "diagramType": "jodoh",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memori-a-p",
      "title": "Diagram Memori Luas",
      "bookReference": "hlm. 133–143",
      "objective": "Ukur daerah dalam dengan petak satuan, Array Model, dan konservasi luas.",
      "mechanicDescription": "Tiga ronde. Terapkan Unit Square Covering / Array / Conservation sesuai soal.",
      "voiceGuide": "Hitung petak atau pilih arti luas. Bukan keliling.",
      "diagramType": "memori",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-a-p",
      "title": "Diagram Ketuk Hasil",
      "bookReference": "hlm. 133–143",
      "objective": "Ukur daerah dalam dengan petak satuan, Array Model, dan konservasi luas.",
      "mechanicDescription": "Tiga ronde. Terapkan Unit Square Covering / Array / Conservation sesuai soal.",
      "voiceGuide": "Hitung petak atau pilih arti luas. Bukan keliling.",
      "diagramType": "ketuk",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "semua-a-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 133–143",
      "objective": "Ukur daerah dalam dengan petak satuan, Array Model, dan konservasi luas.",
      "mechanicDescription": "Tiga ronde. Terapkan Unit Square Covering / Array / Conservation sesuai soal.",
      "voiceGuide": "Hitung petak atau pilih arti luas. Bukan keliling.",
      "diagramType": "semua",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "cerita-a-p",
      "title": "Diagram Cerita Ubin & Pasir",
      "bookReference": "hlm. 133–143",
      "objective": "Ukur daerah dalam dengan petak satuan, Array Model, dan konservasi luas.",
      "mechanicDescription": "Tiga ronde. Terapkan Unit Square Covering / Array / Conservation sesuai soal.",
      "voiceGuide": "Hitung petak atau pilih arti luas. Bukan keliling.",
      "diagramType": "cerita",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "urut-a-p",
      "title": "Diagram Urutkan Luas",
      "bookReference": "hlm. 133–143",
      "objective": "Ukur daerah dalam dengan petak satuan, Array Model, dan konservasi luas.",
      "mechanicDescription": "Tiga ronde. Terapkan Unit Square Covering / Array / Conservation sesuai soal.",
      "voiceGuide": "Hitung petak atau pilih arti luas. Bukan keliling.",
      "diagramType": "urut",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-a-a",
      "title": "Tulis Hitung Petak",
      "bookReference": "hlm. 133–143",
      "objective": "Ukur daerah dalam dengan petak satuan, Array Model, dan konservasi luas.",
      "mechanicDescription": "Tiga ronde. Terapkan Unit Square Covering / Array / Conservation sesuai soal.",
      "voiceGuide": "Hitung petak atau pilih arti luas. Bukan keliling.",
      "symbolLarge": "L",
      "wordLarge": "LUAS",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-a-a",
      "title": "Tulis Arti Luas",
      "bookReference": "hlm. 133–143",
      "objective": "Ukur daerah dalam dengan petak satuan, Array Model, dan konservasi luas.",
      "mechanicDescription": "Tiga ronde. Terapkan Unit Square Covering / Array / Conservation sesuai soal.",
      "voiceGuide": "Hitung petak atau pilih arti luas. Bukan keliling.",
      "symbolLarge": "L",
      "wordLarge": "LUAS",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-a-a",
      "title": "Tulis Pilih Definisi",
      "bookReference": "hlm. 133–143",
      "objective": "Ukur daerah dalam dengan petak satuan, Array Model, dan konservasi luas.",
      "mechanicDescription": "Tiga ronde. Terapkan Unit Square Covering / Array / Conservation sesuai soal.",
      "voiceGuide": "Hitung petak atau pilih arti luas. Bukan keliling.",
      "symbolLarge": "L",
      "wordLarge": "LUAS",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-a-a",
      "title": "Tulis Pilah Luas/Bukan",
      "bookReference": "hlm. 133–143",
      "objective": "Ukur daerah dalam dengan petak satuan, Array Model, dan konservasi luas.",
      "mechanicDescription": "Tiga ronde. Terapkan Unit Square Covering / Array / Conservation sesuai soal.",
      "voiceGuide": "Hitung petak atau pilih arti luas. Bukan keliling.",
      "symbolLarge": "L",
      "wordLarge": "LUAS",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-a-a",
      "title": "Tulis Jodohkan Konsep",
      "bookReference": "hlm. 133–143",
      "objective": "Ukur daerah dalam dengan petak satuan, Array Model, dan konservasi luas.",
      "mechanicDescription": "Tiga ronde. Terapkan Unit Square Covering / Array / Conservation sesuai soal.",
      "voiceGuide": "Hitung petak atau pilih arti luas. Bukan keliling.",
      "symbolLarge": "L",
      "wordLarge": "LUAS",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-a-a",
      "title": "Tulis Memori Luas",
      "bookReference": "hlm. 133–143",
      "objective": "Ukur daerah dalam dengan petak satuan, Array Model, dan konservasi luas.",
      "mechanicDescription": "Tiga ronde. Terapkan Unit Square Covering / Array / Conservation sesuai soal.",
      "voiceGuide": "Hitung petak atau pilih arti luas. Bukan keliling.",
      "symbolLarge": "L",
      "wordLarge": "LUAS",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-a",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 133–143",
      "objective": "Ukur daerah dalam dengan petak satuan, Array Model, dan konservasi luas.",
      "mechanicDescription": "Dua ronde menilai pernyataan.",
      "voiceGuide": "Benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-a",
      "title": "Detektif Luas",
      "bookReference": "hlm. 133–143",
      "objective": "Ukur daerah dalam dengan petak satuan, Array Model, dan konservasi luas.",
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
      "bookReference": "hlm. 133–143",
      "objective": "Ukur daerah dalam dengan petak satuan, Array Model, dan konservasi luas.",
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
      "bookReference": "hlm. 133–143",
      "objective": "Ukur daerah dalam dengan petak satuan, Array Model, dan konservasi luas.",
      "mechanicDescription": "Tiga ronde cerita.",
      "voiceGuide": "Baca lalu pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "⬜",
      "nama": "Arti",
      "isi": "Luas = ukuran daerah di dalam batas bangun.",
      "suara": "Definisi buku."
    },
    {
      "ikon": "🧩",
      "nama": "Covering",
      "isi": "Tutup rapat dengan petak satuan (Unit Square Covering).",
      "suara": "Tanpa celah/lubang."
    },
    {
      "ikon": "▦",
      "nama": "Array",
      "isi": "Pada PP: luas = baris × kolom.",
      "suara": "METODE LUAR · Array Model."
    },
    {
      "ikon": "✂️",
      "nama": "Yohana",
      "isi": "Potong-tempel tanpa mengubah luas (Area Conservation).",
      "suara": "Petak tak utuh."
    }
  ],
  "poinSuara": "Ingat: luas daerah dalam, petak satuan, array baris kali kolom, Cara Yohana luas tetap.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Tentukan satuan",
        "warna": "#FDE68A"
      },
      {
        "teks": "tutup petak",
        "warna": "#BBF7D0"
      },
      {
        "teks": "hitung / array",
        "warna": "#BFDBFE"
      },
      {
        "teks": "cek konservasi",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: gambar persegi panjang di kertas berpetak, hitung petaknya, lalu bandingkan dengan panjang kali lebar.",
  "refleksi": [
    "Apa beda luas dan keliling?",
    "Mengapa ubin 1 m² mewakili 1 m² luas?",
    "Apa yang tetap saat Cara Yohana?"
  ]
};
export const SUB_B55: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Rumus Luas)",
  "fullTitle": "Sub-Bab B: Luas Daerah Bangun Datar",
  "targetDescription": "Siswa menemukan dan memakai rumus luas persegi panjang, persegi, segitiga, jajargenjang, trapesium, belah ketupat, dan layang-layang melalui Dissection Method, Shear Principle, dan unifikasi Base×Height sesuai Buku Siswa Kelas V Bab 5 Sub-Bab B hlm. 144–157.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Kita menemukan rumus luas. Persegi panjang panjang kali lebar. Persegi sisi kali sisi. Segitiga setengah alas kali tinggi lewat Dissection Method. Jajargenjang alas kali tinggi lewat Shear Principle. Trapesium setengah jumlah sisi sejajar kali tinggi. Belah ketupat dan layang-layang setengah kali dua diagonal. Semua bertemu di Base kali Height. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menentukan luas berbagai bangun datar dengan rumus yang tepat.",
    "referensi": "Buku Siswa Matematika Kelas V Bab 5 Sub-Bab B hlm. 144–157; METODE LUAR · Dissection Method; Shear Principle; Base×Height Unification."
  },
  "videos": [],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Kenali bangun",
      "stepDesc": "Baca soal Luas Daerah Bangun Datar dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. PP/persegi/segitiga/… Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa menemukan dan memakai rumus luas persegi panjang, persegi, segitiga, jajargenjang, trapesium, belah ketupat, dan l….",
      "icon": "👀",
      "flowFrom": "Kenali bangun",
      "flowTo": "Pilih rumus"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Pilih rumus",
      "stepDesc": "Sesuai ciri. Pada Luas Daerah Bangun Datar, langkah “Pilih rumus” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🧮",
      "flowFrom": "Pilih rumus",
      "flowTo": "Tegak lurus"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Tegak lurus",
      "stepDesc": "Tinggi ⊥ alas. Pada Luas Daerah Bangun Datar, langkah “Tegak lurus” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "⊥",
      "flowFrom": "Tegak lurus",
      "flowTo": "Hitung"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Hitung",
      "stepDesc": "Ganti angka. Pada Luas Daerah Bangun Datar, langkah “Hitung” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🔢",
      "flowFrom": "Hitung",
      "flowTo": "Metode luar"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Metode luar",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Luas Daerah Bangun Datar. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "🌍",
      "flowFrom": "Metode luar",
      "flowTo": "Cek"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Luas Daerah Bangun Datar. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Cek",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "PP",
      "emoji": "▭",
      "countNum": 10,
      "countWord": "p×l",
      "suara": "Pada Luas Daerah Bangun Datar, cocokkan gambar “PP” dengan artinya (p×l), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Luas Daerah Bangun Datar.",
      "teksVisual": "▭ PP: p×l"
    },
    {
      "judul": "Persegi",
      "emoji": "⬜",
      "countNum": 16,
      "countWord": "s×s",
      "suara": "Persegi — s×s. Jika panjang sama lebar, bangun itu persegi. Luas = sisi × sisi. Ingat: p=l; L=s×s; sisi 4. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Luas Daerah Bangun Datar.",
      "teksVisual": "⬜ Persegi: s×s"
    },
    {
      "judul": "Segitiga",
      "emoji": "🔺",
      "countNum": 12,
      "countWord": "½×a×t",
      "suara": "Segitiga — ½×a×t. Pada Luas Daerah Bangun Datar, cocokkan gambar “Segitiga” dengan artinya (½×a×t), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Luas Daerah Bangun Datar.",
      "teksVisual": "🔺 Segitiga: ½×a×t"
    },
    {
      "judul": "Jajar",
      "emoji": "▱",
      "countNum": 24,
      "countWord": "a×t",
      "suara": "Jajar — a×t. Pada Luas Daerah Bangun Datar, cocokkan gambar “Jajar” dengan artinya (a×t), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Luas Daerah Bangun Datar.",
      "teksVisual": "▱ Jajar: a×t"
    },
    {
      "judul": "Trapesium",
      "emoji": "⏢",
      "countNum": 16,
      "countWord": "½(a+b)×t",
      "suara": "Trapesium — ½(a+b)×t. Trapesium punya sepasang sisi sejajar. Luas = setengah × (jumlah sisi sejajar) × tinggi. Ingat: ½(a+b)×t; 5&3 t4; 16. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Luas Daerah Bangun…",
      "teksVisual": "⏢ Trapesium: ½(a+b)×t"
    },
    {
      "judul": "Belah",
      "emoji": "◇",
      "countNum": 12,
      "countWord": "½×d1×d2",
      "suara": "Belah — ½×d1×d2. Pada Luas Daerah Bangun Datar, cocokkan gambar “Belah” dengan artinya (½×d1×d2), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Luas Daerah Bangun Datar.",
      "teksVisual": "◇ Belah: ½×d1×d2"
    },
    {
      "judul": "Layang",
      "emoji": "🪁",
      "countNum": 24,
      "countWord": "½×d1×d2",
      "suara": "Layang — ½×d1×d2. Pada Luas Daerah Bangun Datar, cocokkan gambar “Layang” dengan artinya (½×d1×d2), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Luas Daerah Bangun Datar.",
      "teksVisual": "🪁 Layang: ½×d1×d2"
    },
    {
      "judul": "Base×H",
      "emoji": "⊥",
      "countNum": 1,
      "countWord": "alas×tinggi",
      "suara": "Base×H — alas×tinggi. Panjang dan lebar adalah alas dan tinggi yang saling tegak lurus. Simpan ide ini untuk jajar dan segitiga. Ingat: alas×tinggi; Base×Height; tegak lurus.",
      "teksVisual": "⊥ Base×H: alas×tinggi"
    },
    {
      "judul": "Metode",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "3 label",
      "suara": "Dissection·Shear·Base×H. Pada Luas Daerah Bangun Datar, cocokkan gambar “Metode” dengan artinya (3 label), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Luas Daerah…",
      "teksVisual": "🌍 Metode: 3 label"
    },
    {
      "judul": "Siap C",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "gabungan",
      "suara": "Siap C — gabungan. Pada Luas Daerah Bangun Datar, cocokkan gambar “Siap C” dengan artinya (gabungan), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Luas Daerah Bangun…",
      "teksVisual": "➡️ Siap C: gabungan"
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-b-c",
      "title": "Hitung Rumus Luas",
      "bookReference": "hlm. 144–157",
      "objective": "Pilih dan hitung rumus luas dengan Dissection, Shear, dan Base×Height.",
      "mechanicDescription": "Tiga ronde rumus dan hitung untuk PP, persegi, segitiga, jajar, trap, belah/layang.",
      "voiceGuide": "Pilih rumus atau hasil luas yang tepat.",
      "emoji": "🧮",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-b-c",
      "title": "Pilih Rumus",
      "bookReference": "hlm. 144–157",
      "objective": "Pilih dan hitung rumus luas dengan Dissection, Shear, dan Base×Height.",
      "mechanicDescription": "Tiga ronde rumus dan hitung untuk PP, persegi, segitiga, jajar, trap, belah/layang.",
      "voiceGuide": "Pilih rumus atau hasil luas yang tepat.",
      "emoji": "🧮",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-b-c",
      "title": "Arti Base×Height",
      "bookReference": "hlm. 144–157",
      "objective": "Pilih dan hitung rumus luas dengan Dissection, Shear, dan Base×Height.",
      "mechanicDescription": "Tiga ronde rumus dan hitung untuk PP, persegi, segitiga, jajar, trap, belah/layang.",
      "voiceGuide": "Pilih rumus atau hasil luas yang tepat.",
      "emoji": "🧮",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-b-c",
      "title": "Pilah Rumus/Bukan",
      "bookReference": "hlm. 144–157",
      "objective": "Pilih dan hitung rumus luas dengan Dissection, Shear, dan Base×Height.",
      "mechanicDescription": "Tiga ronde rumus dan hitung untuk PP, persegi, segitiga, jajar, trap, belah/layang.",
      "voiceGuide": "Pilih rumus atau hasil luas yang tepat.",
      "emoji": "🧮",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-b-c",
      "title": "Jodohkan Bangun-Rumus",
      "bookReference": "hlm. 144–157",
      "objective": "Pilih dan hitung rumus luas dengan Dissection, Shear, dan Base×Height.",
      "mechanicDescription": "Tiga ronde rumus dan hitung untuk PP, persegi, segitiga, jajar, trap, belah/layang.",
      "voiceGuide": "Pilih rumus atau hasil luas yang tepat.",
      "emoji": "🧮",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-b-c",
      "title": "Memori Rumus",
      "bookReference": "hlm. 144–157",
      "objective": "Pilih dan hitung rumus luas dengan Dissection, Shear, dan Base×Height.",
      "mechanicDescription": "Tiga ronde rumus dan hitung untuk PP, persegi, segitiga, jajar, trap, belah/layang.",
      "voiceGuide": "Pilih rumus atau hasil luas yang tepat.",
      "emoji": "🧮",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-b-c",
      "title": "Ketuk Hasil",
      "bookReference": "hlm. 144–157",
      "objective": "Pilih dan hitung rumus luas dengan Dissection, Shear, dan Base×Height.",
      "mechanicDescription": "Tiga ronde rumus dan hitung untuk PP, persegi, segitiga, jajar, trap, belah/layang.",
      "voiceGuide": "Pilih rumus atau hasil luas yang tepat.",
      "emoji": "🧮",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-b-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 144–157",
      "objective": "Pilih dan hitung rumus luas dengan Dissection, Shear, dan Base×Height.",
      "mechanicDescription": "Tiga ronde rumus dan hitung untuk PP, persegi, segitiga, jajar, trap, belah/layang.",
      "voiceGuide": "Pilih rumus atau hasil luas yang tepat.",
      "emoji": "🧮",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-b-c",
      "title": "Cerita Rumus",
      "bookReference": "hlm. 144–157",
      "objective": "Pilih dan hitung rumus luas dengan Dissection, Shear, dan Base×Height.",
      "mechanicDescription": "Tiga ronde rumus dan hitung untuk PP, persegi, segitiga, jajar, trap, belah/layang.",
      "voiceGuide": "Pilih rumus atau hasil luas yang tepat.",
      "emoji": "🧮",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-b-c",
      "title": "Urutkan Luas",
      "bookReference": "hlm. 144–157",
      "objective": "Pilih dan hitung rumus luas dengan Dissection, Shear, dan Base×Height.",
      "mechanicDescription": "Tiga ronde rumus dan hitung untuk PP, persegi, segitiga, jajar, trap, belah/layang.",
      "voiceGuide": "Pilih rumus atau hasil luas yang tepat.",
      "emoji": "🧮",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-b-p",
      "title": "Diagram Hitung Rumus Luas",
      "bookReference": "hlm. 144–157",
      "objective": "Pilih dan hitung rumus luas dengan Dissection, Shear, dan Base×Height.",
      "mechanicDescription": "Tiga ronde rumus dan hitung untuk PP, persegi, segitiga, jajar, trap, belah/layang.",
      "voiceGuide": "Pilih rumus atau hasil luas yang tepat.",
      "diagramType": "hitung",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "rumus-b-p",
      "title": "Diagram Pilih Rumus",
      "bookReference": "hlm. 144–157",
      "objective": "Pilih dan hitung rumus luas dengan Dissection, Shear, dan Base×Height.",
      "mechanicDescription": "Tiga ronde rumus dan hitung untuk PP, persegi, segitiga, jajar, trap, belah/layang.",
      "voiceGuide": "Pilih rumus atau hasil luas yang tepat.",
      "diagramType": "rumus",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "arti-b-p",
      "title": "Diagram Arti Base×Height",
      "bookReference": "hlm. 144–157",
      "objective": "Pilih dan hitung rumus luas dengan Dissection, Shear, dan Base×Height.",
      "mechanicDescription": "Tiga ronde rumus dan hitung untuk PP, persegi, segitiga, jajar, trap, belah/layang.",
      "voiceGuide": "Pilih rumus atau hasil luas yang tepat.",
      "diagramType": "arti",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sortir-b-p",
      "title": "Diagram Pilah Rumus/Bukan",
      "bookReference": "hlm. 144–157",
      "objective": "Pilih dan hitung rumus luas dengan Dissection, Shear, dan Base×Height.",
      "mechanicDescription": "Tiga ronde rumus dan hitung untuk PP, persegi, segitiga, jajar, trap, belah/layang.",
      "voiceGuide": "Pilih rumus atau hasil luas yang tepat.",
      "diagramType": "sortir",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-b-p",
      "title": "Diagram Jodohkan Bangun-Rumus",
      "bookReference": "hlm. 144–157",
      "objective": "Pilih dan hitung rumus luas dengan Dissection, Shear, dan Base×Height.",
      "mechanicDescription": "Tiga ronde rumus dan hitung untuk PP, persegi, segitiga, jajar, trap, belah/layang.",
      "voiceGuide": "Pilih rumus atau hasil luas yang tepat.",
      "diagramType": "jodoh",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memori-b-p",
      "title": "Diagram Memori Rumus",
      "bookReference": "hlm. 144–157",
      "objective": "Pilih dan hitung rumus luas dengan Dissection, Shear, dan Base×Height.",
      "mechanicDescription": "Tiga ronde rumus dan hitung untuk PP, persegi, segitiga, jajar, trap, belah/layang.",
      "voiceGuide": "Pilih rumus atau hasil luas yang tepat.",
      "diagramType": "memori",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-b-p",
      "title": "Diagram Ketuk Hasil",
      "bookReference": "hlm. 144–157",
      "objective": "Pilih dan hitung rumus luas dengan Dissection, Shear, dan Base×Height.",
      "mechanicDescription": "Tiga ronde rumus dan hitung untuk PP, persegi, segitiga, jajar, trap, belah/layang.",
      "voiceGuide": "Pilih rumus atau hasil luas yang tepat.",
      "diagramType": "ketuk",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "semua-b-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 144–157",
      "objective": "Pilih dan hitung rumus luas dengan Dissection, Shear, dan Base×Height.",
      "mechanicDescription": "Tiga ronde rumus dan hitung untuk PP, persegi, segitiga, jajar, trap, belah/layang.",
      "voiceGuide": "Pilih rumus atau hasil luas yang tepat.",
      "diagramType": "semua",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "cerita-b-p",
      "title": "Diagram Cerita Rumus",
      "bookReference": "hlm. 144–157",
      "objective": "Pilih dan hitung rumus luas dengan Dissection, Shear, dan Base×Height.",
      "mechanicDescription": "Tiga ronde rumus dan hitung untuk PP, persegi, segitiga, jajar, trap, belah/layang.",
      "voiceGuide": "Pilih rumus atau hasil luas yang tepat.",
      "diagramType": "cerita",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "urut-b-p",
      "title": "Diagram Urutkan Luas",
      "bookReference": "hlm. 144–157",
      "objective": "Pilih dan hitung rumus luas dengan Dissection, Shear, dan Base×Height.",
      "mechanicDescription": "Tiga ronde rumus dan hitung untuk PP, persegi, segitiga, jajar, trap, belah/layang.",
      "voiceGuide": "Pilih rumus atau hasil luas yang tepat.",
      "diagramType": "urut",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-b-a",
      "title": "Tulis Hitung Rumus Luas",
      "bookReference": "hlm. 144–157",
      "objective": "Pilih dan hitung rumus luas dengan Dissection, Shear, dan Base×Height.",
      "mechanicDescription": "Tiga ronde rumus dan hitung untuk PP, persegi, segitiga, jajar, trap, belah/layang.",
      "voiceGuide": "Pilih rumus atau hasil luas yang tepat.",
      "symbolLarge": "L",
      "wordLarge": "LUAS",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-b-a",
      "title": "Tulis Pilih Rumus",
      "bookReference": "hlm. 144–157",
      "objective": "Pilih dan hitung rumus luas dengan Dissection, Shear, dan Base×Height.",
      "mechanicDescription": "Tiga ronde rumus dan hitung untuk PP, persegi, segitiga, jajar, trap, belah/layang.",
      "voiceGuide": "Pilih rumus atau hasil luas yang tepat.",
      "symbolLarge": "L",
      "wordLarge": "LUAS",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-b-a",
      "title": "Tulis Arti Base×Height",
      "bookReference": "hlm. 144–157",
      "objective": "Pilih dan hitung rumus luas dengan Dissection, Shear, dan Base×Height.",
      "mechanicDescription": "Tiga ronde rumus dan hitung untuk PP, persegi, segitiga, jajar, trap, belah/layang.",
      "voiceGuide": "Pilih rumus atau hasil luas yang tepat.",
      "symbolLarge": "L",
      "wordLarge": "LUAS",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-b-a",
      "title": "Tulis Pilah Rumus/Bukan",
      "bookReference": "hlm. 144–157",
      "objective": "Pilih dan hitung rumus luas dengan Dissection, Shear, dan Base×Height.",
      "mechanicDescription": "Tiga ronde rumus dan hitung untuk PP, persegi, segitiga, jajar, trap, belah/layang.",
      "voiceGuide": "Pilih rumus atau hasil luas yang tepat.",
      "symbolLarge": "L",
      "wordLarge": "LUAS",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-b-a",
      "title": "Tulis Jodohkan Bangun-Rumus",
      "bookReference": "hlm. 144–157",
      "objective": "Pilih dan hitung rumus luas dengan Dissection, Shear, dan Base×Height.",
      "mechanicDescription": "Tiga ronde rumus dan hitung untuk PP, persegi, segitiga, jajar, trap, belah/layang.",
      "voiceGuide": "Pilih rumus atau hasil luas yang tepat.",
      "symbolLarge": "L",
      "wordLarge": "LUAS",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-b-a",
      "title": "Tulis Memori Rumus",
      "bookReference": "hlm. 144–157",
      "objective": "Pilih dan hitung rumus luas dengan Dissection, Shear, dan Base×Height.",
      "mechanicDescription": "Tiga ronde rumus dan hitung untuk PP, persegi, segitiga, jajar, trap, belah/layang.",
      "voiceGuide": "Pilih rumus atau hasil luas yang tepat.",
      "symbolLarge": "L",
      "wordLarge": "LUAS",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-b",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 144–157",
      "objective": "Pilih dan hitung rumus luas dengan Dissection, Shear, dan Base×Height.",
      "mechanicDescription": "Dua ronde menilai pernyataan.",
      "voiceGuide": "Benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-b",
      "title": "Detektif Luas",
      "bookReference": "hlm. 144–157",
      "objective": "Pilih dan hitung rumus luas dengan Dissection, Shear, dan Base×Height.",
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
      "bookReference": "hlm. 144–157",
      "objective": "Pilih dan hitung rumus luas dengan Dissection, Shear, dan Base×Height.",
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
      "bookReference": "hlm. 144–157",
      "objective": "Pilih dan hitung rumus luas dengan Dissection, Shear, dan Base×Height.",
      "mechanicDescription": "Tiga ronde cerita.",
      "voiceGuide": "Baca lalu pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "▭",
      "nama": "PP/Persegi",
      "isi": "L = p×l; persegi L = s×s.",
      "suara": "Dari array."
    },
    {
      "ikon": "🔺",
      "nama": "Segitiga",
      "isi": "L = ½×alas×tinggi (Dissection).",
      "suara": "Setengah PP."
    },
    {
      "ikon": "▱",
      "nama": "Jajar",
      "isi": "L = alas×tinggi (Shear).",
      "suara": "Geser jadi PP."
    },
    {
      "ikon": "◇",
      "nama": "Trap/Belah/Layang",
      "isi": "½(a+b)×t atau ½×d1×d2.",
      "suara": "Ciri sejajar/diagonal."
    }
  ],
  "poinSuara": "Ingat rumus: p kali l, s kali s, setengah a t, a t, setengah a plus b kali t, setengah d1 d2.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Kenali bangun",
        "warna": "#FDE68A"
      },
      {
        "teks": "pilih rumus",
        "warna": "#BBF7D0"
      },
      {
        "teks": "tinggi tegak lurus",
        "warna": "#BFDBFE"
      },
      {
        "teks": "hitung & cek",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: ukur alas dan tinggi sebuah jajargenjang atau segitiga pada benda datar, lalu hitung luasnya.",
  "refleksi": [
    "Mengapa segitiga memakai setengah?",
    "Apa arti Shear pada jajargenjang?",
    "Rumus belah ketupat memakai apa?"
  ]
};
export const SUB_C55: SubBabNaskah = {
  "id": "C",
  "codeTitle": "Sub-Bab C (Bangun Gabungan)",
  "fullTitle": "Sub-Bab C: Luas Daerah Bangun Gabungan",
  "targetDescription": "Siswa mengurai bangun gabungan menjadi bagian yang dikenal (cara Yohana: layang+segitiga; cara Komang: jajar+segitiga), menghitung tiap luas, lalu menjumlahkannya dengan Additive Decomposition / Composite Area Strategy sesuai Buku Siswa Kelas V Bab 5 Sub-Bab C hlm. 158–159.",
  "secondaryBg": "#DCFCE7",
  "secondaryBorder": "#16A34A",
  "secondaryText": "#14532D",
  "silabus": {
    "teksSuara": "Kita hitung luas bangun gabungan. Urai jadi bagian yang sudah punya rumus. Yohana membagi jadi layang-layang dan segitiga. Komang membagi jadi jajargenjang dan segitiga. Jumlahkan luas bagian. Itu Additive Decomposition atau Composite Area Strategy. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menentukan luas bangun gabungan dengan mengurai dan menjumlahkan luas bagian.",
    "referensi": "Buku Siswa Matematika Kelas V Bab 5 Sub-Bab C hlm. 158–159; METODE LUAR · Additive Decomposition; Composite Area Strategy."
  },
  "videos": [],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Lihat bangun",
      "stepDesc": "Baca soal Luas Daerah Bangun Gabungan dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Gabungan apa? Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa mengurai bangun gabungan menjadi bagian yang dikenal (cara Yohana: layang+segitiga; cara Komang: jajar+segitiga), ….",
      "icon": "🧩",
      "flowFrom": "Lihat bangun",
      "flowTo": "Urai"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Urai",
      "stepDesc": "Bagian dikenal. Pada Luas Daerah Bangun Gabungan, langkah “Urai” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "✂️",
      "flowFrom": "Urai",
      "flowTo": "Rumus tiap"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Rumus tiap",
      "stepDesc": "PP/segitiga/…. Pada Luas Daerah Bangun Gabungan, langkah “Rumus tiap” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🧮",
      "flowFrom": "Rumus tiap",
      "flowTo": "Jumlahkan"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Jumlahkan",
      "stepDesc": "Additive. Pada Luas Daerah Bangun Gabungan, langkah “Jumlahkan” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "➕",
      "flowFrom": "Jumlahkan",
      "flowTo": "Cek tindih"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Cek tindih",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Luas Daerah Bangun Gabungan. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "⚠️",
      "flowFrom": "Cek tindih",
      "flowTo": "Validasi"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Validasi",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Luas Daerah Bangun Gabungan. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Validasi",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Urai",
      "emoji": "✂️",
      "countNum": 1,
      "countWord": "bagi bagian",
      "suara": "Urai — bagi bagian. Pada Luas Daerah Bangun Gabungan, cocokkan gambar “Urai” dengan artinya (bagi bagian), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Luas Daerah…",
      "teksVisual": "✂️ Urai: bagi bagian"
    },
    {
      "judul": "Yohana",
      "emoji": "🪁",
      "countNum": 1,
      "countWord": "layang+△",
      "suara": "Yohana — layang+△. Yohana membagi bangun jadi layang-layang dan segitiga. Luas layang = setengah × d1 × d2. Ingat: layang+segitiga; ½ d1 d2; ½ a t. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Luas Daerah…",
      "teksVisual": "🪁 Yohana: layang+△"
    },
    {
      "judul": "Komang",
      "emoji": "▱",
      "countNum": 1,
      "countWord": "jajar+△",
      "suara": "Komang — jajar+△. Komang membagi jadi jajargenjang dan segitiga. Luas jajar = alas × tinggi. Ingat: jajar+segitiga; a×t; ½ a t. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Luas Daerah Bangun Gabungan.",
      "teksVisual": "▱ Komang: jajar+△"
    },
    {
      "judul": "Jumlah",
      "emoji": "➕",
      "countNum": 20,
      "countWord": "12+8",
      "suara": "Jumlah — 12+8. Pada Luas Daerah Bangun Gabungan, cocokkan gambar “Jumlah” dengan artinya (12+8), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Luas Daerah Bangun Gabungan.",
      "teksVisual": "➕ Jumlah: 12+8"
    },
    {
      "judul": "24+12",
      "emoji": "🔢",
      "countNum": 36,
      "countWord": "36",
      "suara": "Pada Luas Daerah Bangun Gabungan, cocokkan gambar “24+12” dengan artinya (36), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Luas Daerah Bangun Gabungan.",
      "teksVisual": "🔢 24+12: 36"
    },
    {
      "judul": "Composite",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "urai+hitung+Σ",
      "suara": "Composite — urai+hitung+Σ. Pada Luas Daerah Bangun Gabungan, cocokkan gambar “Composite” dengan artinya (urai+hitung+Σ), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🌍 Composite: urai+hitung+Σ"
    },
    {
      "judul": "Tak tindih",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "jangan 2×",
      "suara": "Tak tindih — jangan 2×. Pada Luas Daerah Bangun Gabungan, cocokkan gambar “Tak tindih” dengan artinya (jangan 2×), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "✅ Tak tindih: jangan 2×"
    },
    {
      "judul": "Validasi",
      "emoji": "🔍",
      "countNum": 1,
      "countWord": "dua cara",
      "suara": "Validasi — dua cara. Jika sempat, hitung dengan cara uraian kedua. Hasil harus cocok. Ingat: cara 2; hasil cocok; cari salah. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Luas Daerah Bangun Gabungan.",
      "teksVisual": "🔍 Validasi: dua cara"
    },
    {
      "judul": "Satuan",
      "emoji": "📐",
      "countNum": 1,
      "countWord": "sama",
      "suara": "Satuan — sama. Pada Luas Daerah Bangun Gabungan, cocokkan gambar “Satuan” dengan artinya (sama), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Luas Daerah Bangun Gabungan.",
      "teksVisual": "📐 Satuan: sama"
    },
    {
      "judul": "Siap D",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "K dan L",
      "suara": "Siap D — K dan L. Gabungan luas siap. Berikutnya: keliling sama, luas bisa beda. Ingat: C siap; K vs L; isoperimetric. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Luas Daerah Bangun Gabungan.",
      "teksVisual": "➡️ Siap D: K dan L"
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-c-c",
      "title": "Hitung Gabungan",
      "bookReference": "hlm. 158–159",
      "objective": "Urai bangun gabungan lalu jumlahkan luas bagian (Composite Area).",
      "mechanicDescription": "Tiga ronde Additive Decomposition: jumlah bagian, strategi Yohana/Komang.",
      "voiceGuide": "Jumlahkan atau pilih cara uraian yang benar.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-c-c",
      "title": "Cara Urai",
      "bookReference": "hlm. 158–159",
      "objective": "Urai bangun gabungan lalu jumlahkan luas bagian (Composite Area).",
      "mechanicDescription": "Tiga ronde Additive Decomposition: jumlah bagian, strategi Yohana/Komang.",
      "voiceGuide": "Jumlahkan atau pilih cara uraian yang benar.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-c-c",
      "title": "Pilih Strategi",
      "bookReference": "hlm. 158–159",
      "objective": "Urai bangun gabungan lalu jumlahkan luas bagian (Composite Area).",
      "mechanicDescription": "Tiga ronde Additive Decomposition: jumlah bagian, strategi Yohana/Komang.",
      "voiceGuide": "Jumlahkan atau pilih cara uraian yang benar.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-c-c",
      "title": "Pilah Urai/Bukan",
      "bookReference": "hlm. 158–159",
      "objective": "Urai bangun gabungan lalu jumlahkan luas bagian (Composite Area).",
      "mechanicDescription": "Tiga ronde Additive Decomposition: jumlah bagian, strategi Yohana/Komang.",
      "voiceGuide": "Jumlahkan atau pilih cara uraian yang benar.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-c-c",
      "title": "Jodohkan Cara",
      "bookReference": "hlm. 158–159",
      "objective": "Urai bangun gabungan lalu jumlahkan luas bagian (Composite Area).",
      "mechanicDescription": "Tiga ronde Additive Decomposition: jumlah bagian, strategi Yohana/Komang.",
      "voiceGuide": "Jumlahkan atau pilih cara uraian yang benar.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-c-c",
      "title": "Memori Gabungan",
      "bookReference": "hlm. 158–159",
      "objective": "Urai bangun gabungan lalu jumlahkan luas bagian (Composite Area).",
      "mechanicDescription": "Tiga ronde Additive Decomposition: jumlah bagian, strategi Yohana/Komang.",
      "voiceGuide": "Jumlahkan atau pilih cara uraian yang benar.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-c-c",
      "title": "Ketuk Hasil",
      "bookReference": "hlm. 158–159",
      "objective": "Urai bangun gabungan lalu jumlahkan luas bagian (Composite Area).",
      "mechanicDescription": "Tiga ronde Additive Decomposition: jumlah bagian, strategi Yohana/Komang.",
      "voiceGuide": "Jumlahkan atau pilih cara uraian yang benar.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-c-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 158–159",
      "objective": "Urai bangun gabungan lalu jumlahkan luas bagian (Composite Area).",
      "mechanicDescription": "Tiga ronde Additive Decomposition: jumlah bagian, strategi Yohana/Komang.",
      "voiceGuide": "Jumlahkan atau pilih cara uraian yang benar.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-c-c",
      "title": "Cerita Yohana/Komang",
      "bookReference": "hlm. 158–159",
      "objective": "Urai bangun gabungan lalu jumlahkan luas bagian (Composite Area).",
      "mechanicDescription": "Tiga ronde Additive Decomposition: jumlah bagian, strategi Yohana/Komang.",
      "voiceGuide": "Jumlahkan atau pilih cara uraian yang benar.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-c-c",
      "title": "Urutkan Luas",
      "bookReference": "hlm. 158–159",
      "objective": "Urai bangun gabungan lalu jumlahkan luas bagian (Composite Area).",
      "mechanicDescription": "Tiga ronde Additive Decomposition: jumlah bagian, strategi Yohana/Komang.",
      "voiceGuide": "Jumlahkan atau pilih cara uraian yang benar.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-c-p",
      "title": "Diagram Hitung Gabungan",
      "bookReference": "hlm. 158–159",
      "objective": "Urai bangun gabungan lalu jumlahkan luas bagian (Composite Area).",
      "mechanicDescription": "Tiga ronde Additive Decomposition: jumlah bagian, strategi Yohana/Komang.",
      "voiceGuide": "Jumlahkan atau pilih cara uraian yang benar.",
      "diagramType": "hitung",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "rumus-c-p",
      "title": "Diagram Cara Urai",
      "bookReference": "hlm. 158–159",
      "objective": "Urai bangun gabungan lalu jumlahkan luas bagian (Composite Area).",
      "mechanicDescription": "Tiga ronde Additive Decomposition: jumlah bagian, strategi Yohana/Komang.",
      "voiceGuide": "Jumlahkan atau pilih cara uraian yang benar.",
      "diagramType": "rumus",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "arti-c-p",
      "title": "Diagram Pilih Strategi",
      "bookReference": "hlm. 158–159",
      "objective": "Urai bangun gabungan lalu jumlahkan luas bagian (Composite Area).",
      "mechanicDescription": "Tiga ronde Additive Decomposition: jumlah bagian, strategi Yohana/Komang.",
      "voiceGuide": "Jumlahkan atau pilih cara uraian yang benar.",
      "diagramType": "arti",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sortir-c-p",
      "title": "Diagram Pilah Urai/Bukan",
      "bookReference": "hlm. 158–159",
      "objective": "Urai bangun gabungan lalu jumlahkan luas bagian (Composite Area).",
      "mechanicDescription": "Tiga ronde Additive Decomposition: jumlah bagian, strategi Yohana/Komang.",
      "voiceGuide": "Jumlahkan atau pilih cara uraian yang benar.",
      "diagramType": "sortir",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-c-p",
      "title": "Diagram Jodohkan Cara",
      "bookReference": "hlm. 158–159",
      "objective": "Urai bangun gabungan lalu jumlahkan luas bagian (Composite Area).",
      "mechanicDescription": "Tiga ronde Additive Decomposition: jumlah bagian, strategi Yohana/Komang.",
      "voiceGuide": "Jumlahkan atau pilih cara uraian yang benar.",
      "diagramType": "jodoh",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memori-c-p",
      "title": "Diagram Memori Gabungan",
      "bookReference": "hlm. 158–159",
      "objective": "Urai bangun gabungan lalu jumlahkan luas bagian (Composite Area).",
      "mechanicDescription": "Tiga ronde Additive Decomposition: jumlah bagian, strategi Yohana/Komang.",
      "voiceGuide": "Jumlahkan atau pilih cara uraian yang benar.",
      "diagramType": "memori",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-c-p",
      "title": "Diagram Ketuk Hasil",
      "bookReference": "hlm. 158–159",
      "objective": "Urai bangun gabungan lalu jumlahkan luas bagian (Composite Area).",
      "mechanicDescription": "Tiga ronde Additive Decomposition: jumlah bagian, strategi Yohana/Komang.",
      "voiceGuide": "Jumlahkan atau pilih cara uraian yang benar.",
      "diagramType": "ketuk",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "semua-c-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 158–159",
      "objective": "Urai bangun gabungan lalu jumlahkan luas bagian (Composite Area).",
      "mechanicDescription": "Tiga ronde Additive Decomposition: jumlah bagian, strategi Yohana/Komang.",
      "voiceGuide": "Jumlahkan atau pilih cara uraian yang benar.",
      "diagramType": "semua",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "cerita-c-p",
      "title": "Diagram Cerita Yohana/Komang",
      "bookReference": "hlm. 158–159",
      "objective": "Urai bangun gabungan lalu jumlahkan luas bagian (Composite Area).",
      "mechanicDescription": "Tiga ronde Additive Decomposition: jumlah bagian, strategi Yohana/Komang.",
      "voiceGuide": "Jumlahkan atau pilih cara uraian yang benar.",
      "diagramType": "cerita",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "urut-c-p",
      "title": "Diagram Urutkan Luas",
      "bookReference": "hlm. 158–159",
      "objective": "Urai bangun gabungan lalu jumlahkan luas bagian (Composite Area).",
      "mechanicDescription": "Tiga ronde Additive Decomposition: jumlah bagian, strategi Yohana/Komang.",
      "voiceGuide": "Jumlahkan atau pilih cara uraian yang benar.",
      "diagramType": "urut",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-c-a",
      "title": "Tulis Hitung Gabungan",
      "bookReference": "hlm. 158–159",
      "objective": "Urai bangun gabungan lalu jumlahkan luas bagian (Composite Area).",
      "mechanicDescription": "Tiga ronde Additive Decomposition: jumlah bagian, strategi Yohana/Komang.",
      "voiceGuide": "Jumlahkan atau pilih cara uraian yang benar.",
      "symbolLarge": "L",
      "wordLarge": "LUAS",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-c-a",
      "title": "Tulis Cara Urai",
      "bookReference": "hlm. 158–159",
      "objective": "Urai bangun gabungan lalu jumlahkan luas bagian (Composite Area).",
      "mechanicDescription": "Tiga ronde Additive Decomposition: jumlah bagian, strategi Yohana/Komang.",
      "voiceGuide": "Jumlahkan atau pilih cara uraian yang benar.",
      "symbolLarge": "L",
      "wordLarge": "LUAS",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-c-a",
      "title": "Tulis Pilih Strategi",
      "bookReference": "hlm. 158–159",
      "objective": "Urai bangun gabungan lalu jumlahkan luas bagian (Composite Area).",
      "mechanicDescription": "Tiga ronde Additive Decomposition: jumlah bagian, strategi Yohana/Komang.",
      "voiceGuide": "Jumlahkan atau pilih cara uraian yang benar.",
      "symbolLarge": "L",
      "wordLarge": "LUAS",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-c-a",
      "title": "Tulis Pilah Urai/Bukan",
      "bookReference": "hlm. 158–159",
      "objective": "Urai bangun gabungan lalu jumlahkan luas bagian (Composite Area).",
      "mechanicDescription": "Tiga ronde Additive Decomposition: jumlah bagian, strategi Yohana/Komang.",
      "voiceGuide": "Jumlahkan atau pilih cara uraian yang benar.",
      "symbolLarge": "L",
      "wordLarge": "LUAS",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-c-a",
      "title": "Tulis Jodohkan Cara",
      "bookReference": "hlm. 158–159",
      "objective": "Urai bangun gabungan lalu jumlahkan luas bagian (Composite Area).",
      "mechanicDescription": "Tiga ronde Additive Decomposition: jumlah bagian, strategi Yohana/Komang.",
      "voiceGuide": "Jumlahkan atau pilih cara uraian yang benar.",
      "symbolLarge": "L",
      "wordLarge": "LUAS",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-c-a",
      "title": "Tulis Memori Gabungan",
      "bookReference": "hlm. 158–159",
      "objective": "Urai bangun gabungan lalu jumlahkan luas bagian (Composite Area).",
      "mechanicDescription": "Tiga ronde Additive Decomposition: jumlah bagian, strategi Yohana/Komang.",
      "voiceGuide": "Jumlahkan atau pilih cara uraian yang benar.",
      "symbolLarge": "L",
      "wordLarge": "LUAS",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-c",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 158–159",
      "objective": "Urai bangun gabungan lalu jumlahkan luas bagian (Composite Area).",
      "mechanicDescription": "Dua ronde menilai pernyataan.",
      "voiceGuide": "Benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-c",
      "title": "Detektif Luas",
      "bookReference": "hlm. 158–159",
      "objective": "Urai bangun gabungan lalu jumlahkan luas bagian (Composite Area).",
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
      "bookReference": "hlm. 158–159",
      "objective": "Urai bangun gabungan lalu jumlahkan luas bagian (Composite Area).",
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
      "bookReference": "hlm. 158–159",
      "objective": "Urai bangun gabungan lalu jumlahkan luas bagian (Composite Area).",
      "mechanicDescription": "Tiga ronde cerita.",
      "voiceGuide": "Baca lalu pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "✂️",
      "nama": "Urai",
      "isi": "Bagi jadi bangun yang punya rumus.",
      "suara": "Composite Area."
    },
    {
      "ikon": "➕",
      "nama": "Jumlah",
      "isi": "Luas total = jumlah luas bagian tak tindih.",
      "suara": "Additive Decomposition."
    },
    {
      "ikon": "🪁",
      "nama": "Yohana",
      "isi": "Layang-layang + segitiga.",
      "suara": "Contoh buku."
    },
    {
      "ikon": "▱",
      "nama": "Komang",
      "isi": "Jajargenjang + segitiga.",
      "suara": "Validasi silang."
    }
  ],
  "poinSuara": "Ingat: urai, hitung tiap rumus, jumlahkan tanpa tumpang tindih, cek dua cara.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Urai bangun",
        "warna": "#FDE68A"
      },
      {
        "teks": "hitung tiap bagian",
        "warna": "#BBF7D0"
      },
      {
        "teks": "jumlahkan",
        "warna": "#BFDBFE"
      },
      {
        "teks": "validasi",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: gambar rumah dari persegi panjang plus segitiga atap, hitung luas gabungannya dua cara.",
  "refleksi": [
    "Apa beda cara Yohana dan Komang?",
    "Mengapa bagian tak boleh tumpang tindih?",
    "Berapa 12+8?"
  ]
};
export const SUB_D55: SubBabNaskah = {
  "id": "D",
  "codeTitle": "Sub-Bab D (K dan L)",
  "fullTitle": "Sub-Bab D: Hubungan Keliling dan Luas Daerah",
  "targetDescription": "Siswa memahami bahwa kerangka kawat ber-keliling tetap (mis. 60 cm) dapat membentuk banyak persegi panjang dengan luas berbeda, dan luas cenderung besar saat bentuk mendekati persegi (Isoperimetric Relationship / Fixed Perimeter Maximize Area) sesuai Buku Siswa Kelas V Bab 5 Sub-Bab D hlm. 159–161.",
  "secondaryBg": "#FCE7F3",
  "secondaryBorder": "#DB2777",
  "secondaryText": "#9D174D",
  "silabus": {
    "teksSuara": "Kita bandingkan keliling dan luas. Kawat 60 centi meter membuat kerangka persegi panjang: dua kali panjang plus lebar sama 60, jadi panjang plus lebar 30. Banyak pasangan panjang-lebar. Luasnya bisa 200, 125, bahkan 225 jika mendekati persegi. METODE LUAR Isoperimetric Relationship: keliling sama tidak menjamin luas sama. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa membandingkan luas berbagai persegi panjang ber-keliling sama dan menjelaskan kapan luas cenderung besar.",
    "referensi": "Buku Siswa Matematika Kelas V Bab 5 Sub-Bab D hlm. 159–161; METODE LUAR · Isoperimetric Relationship; Fixed Perimeter Maximize Area."
  },
  "videos": [],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Kunci K",
      "stepDesc": "Baca soal Hubungan Keliling dan Luas Daerah dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. 2(p+l) tetap Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa memahami bahwa kerangka kawat ber-keliling tetap (mis. 60 cm) dapat membentuk banyak persegi panjang dengan luas b….",
      "icon": "🔒",
      "flowFrom": "Kunci K",
      "flowTo": "Pasangan p,l"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Pasangan p,l",
      "stepDesc": "p+l tetap. Pada Hubungan Keliling dan Luas Daerah, langkah “Pasangan p,l” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🔢",
      "flowFrom": "Pasangan p,l",
      "flowTo": "Hitung L"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Hitung L",
      "stepDesc": "p×l tiap pasangan. Pada Hubungan Keliling dan Luas Daerah, langkah “Hitung L” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🧮",
      "flowFrom": "Hitung L",
      "flowTo": "Bandingkan"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Bandingkan",
      "stepDesc": "L bisa beda. Pada Hubungan Keliling dan Luas Daerah, langkah “Bandingkan” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "⚖️",
      "flowFrom": "Bandingkan",
      "flowTo": "Terluas"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Terluas",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Hubungan Keliling dan Luas Daerah. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "⬜",
      "flowFrom": "Terluas",
      "flowTo": "Pilih konsep"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Pilih konsep",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Hubungan Keliling dan Luas Daerah. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "🎯",
      "flowFrom": "Pilih konsep",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "K=60",
      "emoji": "🔒",
      "countNum": 60,
      "countWord": "2(p+l)",
      "suara": "K=60 — 2(p+l). Pada Hubungan Keliling dan Luas Daerah, cocokkan gambar “K=60” dengan artinya (2(p+l)), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Hubungan Keliling dan…",
      "teksVisual": "🔒 K=60: 2(p+l)"
    },
    {
      "judul": "p+l",
      "emoji": "➕",
      "countNum": 30,
      "countWord": "30",
      "suara": "Pada Hubungan Keliling dan Luas Daerah, cocokkan gambar “p+l” dengan artinya (30), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Hubungan Keliling dan Luas Daerah.",
      "teksVisual": "➕ p+l: 30"
    },
    {
      "judul": "20×10",
      "emoji": "▭",
      "countNum": 200,
      "countWord": "L=200",
      "suara": "20×10 — L=200. Pada Hubungan Keliling dan Luas Daerah, cocokkan gambar “20×10” dengan artinya (L=200), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Hubungan Keliling dan…",
      "teksVisual": "▭ 20×10: L=200"
    },
    {
      "judul": "25×5",
      "emoji": "📏",
      "countNum": 125,
      "countWord": "L=125",
      "suara": "25×5 — L=125. Pada Hubungan Keliling dan Luas Daerah, cocokkan gambar “25×5” dengan artinya (L=125), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Hubungan Keliling dan…",
      "teksVisual": "📏 25×5: L=125"
    },
    {
      "judul": "15×15",
      "emoji": "⬜",
      "countNum": 225,
      "countWord": "L=225",
      "suara": "15×15 — L=225. Pada Hubungan Keliling dan Luas Daerah, cocokkan gambar “15×15” dengan artinya (L=225), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Hubungan Keliling dan…",
      "teksVisual": "⬜ 15×15: L=225"
    },
    {
      "judul": "28×2",
      "emoji": "➖",
      "countNum": 56,
      "countWord": "L=56",
      "suara": "28×2 — L=56. Pada Hubungan Keliling dan Luas Daerah, cocokkan gambar “28×2” dengan artinya (L=56), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Hubungan Keliling dan…",
      "teksVisual": "➖ 28×2: L=56"
    },
    {
      "judul": "Isoperimetric",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "K sama ≠ L sama",
      "suara": "Isoperimetric — K sama ≠ L sama. Pada Hubungan Keliling dan Luas Daerah, cocokkan gambar “Isoperimetric” dengan artinya (K sama ≠ L sama), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🌍 Isoperimetric: K sama ≠ L sama"
    },
    {
      "judul": "Kawat",
      "emoji": "🧵",
      "countNum": 1,
      "countWord": "keliling",
      "suara": "Kawat — keliling. Pada Hubungan Keliling dan Luas Daerah, cocokkan gambar “Kawat” dengan artinya (keliling), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Hubungan…",
      "teksVisual": "🧵 Kawat: keliling"
    },
    {
      "judul": "Ubin/cat",
      "emoji": "🧱",
      "countNum": 1,
      "countWord": "luas",
      "suara": "Ubin/cat — luas. Pada Hubungan Keliling dan Luas Daerah, cocokkan gambar “Ubin/cat” dengan artinya (luas), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Hubungan Keliling…",
      "teksVisual": "🧱 Ubin/cat: luas"
    },
    {
      "judul": "Bab 5",
      "emoji": "🎉",
      "countNum": 1,
      "countWord": "A–D siap",
      "suara": "Bab 5 — A–D siap. Pada Hubungan Keliling dan Luas Daerah, cocokkan gambar “Bab 5” dengan artinya (A–D siap), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Hubungan…",
      "teksVisual": "🎉 Bab 5: A–D siap"
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-d-c",
      "title": "Hitung K dan L",
      "bookReference": "hlm. 159–161",
      "objective": "Bandingkan luas PP ber-keliling sama (Isoperimetric Relationship).",
      "mechanicDescription": "Tiga ronde: hitung L dari pasangan p,l dengan K tetap 60.",
      "voiceGuide": "Pilih luas atau pasangan yang benar.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-d-c",
      "title": "Syarat Kawat",
      "bookReference": "hlm. 159–161",
      "objective": "Bandingkan luas PP ber-keliling sama (Isoperimetric Relationship).",
      "mechanicDescription": "Tiga ronde: hitung L dari pasangan p,l dengan K tetap 60.",
      "voiceGuide": "Pilih luas atau pasangan yang benar.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-d-c",
      "title": "Banding Luas",
      "bookReference": "hlm. 159–161",
      "objective": "Bandingkan luas PP ber-keliling sama (Isoperimetric Relationship).",
      "mechanicDescription": "Tiga ronde: hitung L dari pasangan p,l dengan K tetap 60.",
      "voiceGuide": "Pilih luas atau pasangan yang benar.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-d-c",
      "title": "Pilah K/L",
      "bookReference": "hlm. 159–161",
      "objective": "Bandingkan luas PP ber-keliling sama (Isoperimetric Relationship).",
      "mechanicDescription": "Tiga ronde: hitung L dari pasangan p,l dengan K tetap 60.",
      "voiceGuide": "Pilih luas atau pasangan yang benar.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-d-c",
      "title": "Jodohkan Pasangan",
      "bookReference": "hlm. 159–161",
      "objective": "Bandingkan luas PP ber-keliling sama (Isoperimetric Relationship).",
      "mechanicDescription": "Tiga ronde: hitung L dari pasangan p,l dengan K tetap 60.",
      "voiceGuide": "Pilih luas atau pasangan yang benar.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-d-c",
      "title": "Memori K&L",
      "bookReference": "hlm. 159–161",
      "objective": "Bandingkan luas PP ber-keliling sama (Isoperimetric Relationship).",
      "mechanicDescription": "Tiga ronde: hitung L dari pasangan p,l dengan K tetap 60.",
      "voiceGuide": "Pilih luas atau pasangan yang benar.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-d-c",
      "title": "Ketuk Luas",
      "bookReference": "hlm. 159–161",
      "objective": "Bandingkan luas PP ber-keliling sama (Isoperimetric Relationship).",
      "mechanicDescription": "Tiga ronde: hitung L dari pasangan p,l dengan K tetap 60.",
      "voiceGuide": "Pilih luas atau pasangan yang benar.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-d-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 159–161",
      "objective": "Bandingkan luas PP ber-keliling sama (Isoperimetric Relationship).",
      "mechanicDescription": "Tiga ronde: hitung L dari pasangan p,l dengan K tetap 60.",
      "voiceGuide": "Pilih luas atau pasangan yang benar.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-d-c",
      "title": "Cerita Isoperimetric",
      "bookReference": "hlm. 159–161",
      "objective": "Bandingkan luas PP ber-keliling sama (Isoperimetric Relationship).",
      "mechanicDescription": "Tiga ronde: hitung L dari pasangan p,l dengan K tetap 60.",
      "voiceGuide": "Pilih luas atau pasangan yang benar.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-d-c",
      "title": "Urutkan Luas",
      "bookReference": "hlm. 159–161",
      "objective": "Bandingkan luas PP ber-keliling sama (Isoperimetric Relationship).",
      "mechanicDescription": "Tiga ronde: hitung L dari pasangan p,l dengan K tetap 60.",
      "voiceGuide": "Pilih luas atau pasangan yang benar.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-d-p",
      "title": "Diagram Hitung K dan L",
      "bookReference": "hlm. 159–161",
      "objective": "Bandingkan luas PP ber-keliling sama (Isoperimetric Relationship).",
      "mechanicDescription": "Tiga ronde: hitung L dari pasangan p,l dengan K tetap 60.",
      "voiceGuide": "Pilih luas atau pasangan yang benar.",
      "diagramType": "hitung",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "rumus-d-p",
      "title": "Diagram Syarat Kawat",
      "bookReference": "hlm. 159–161",
      "objective": "Bandingkan luas PP ber-keliling sama (Isoperimetric Relationship).",
      "mechanicDescription": "Tiga ronde: hitung L dari pasangan p,l dengan K tetap 60.",
      "voiceGuide": "Pilih luas atau pasangan yang benar.",
      "diagramType": "rumus",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "arti-d-p",
      "title": "Diagram Banding Luas",
      "bookReference": "hlm. 159–161",
      "objective": "Bandingkan luas PP ber-keliling sama (Isoperimetric Relationship).",
      "mechanicDescription": "Tiga ronde: hitung L dari pasangan p,l dengan K tetap 60.",
      "voiceGuide": "Pilih luas atau pasangan yang benar.",
      "diagramType": "arti",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sortir-d-p",
      "title": "Diagram Pilah K/L",
      "bookReference": "hlm. 159–161",
      "objective": "Bandingkan luas PP ber-keliling sama (Isoperimetric Relationship).",
      "mechanicDescription": "Tiga ronde: hitung L dari pasangan p,l dengan K tetap 60.",
      "voiceGuide": "Pilih luas atau pasangan yang benar.",
      "diagramType": "sortir",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-d-p",
      "title": "Diagram Jodohkan Pasangan",
      "bookReference": "hlm. 159–161",
      "objective": "Bandingkan luas PP ber-keliling sama (Isoperimetric Relationship).",
      "mechanicDescription": "Tiga ronde: hitung L dari pasangan p,l dengan K tetap 60.",
      "voiceGuide": "Pilih luas atau pasangan yang benar.",
      "diagramType": "jodoh",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memori-d-p",
      "title": "Diagram Memori K&L",
      "bookReference": "hlm. 159–161",
      "objective": "Bandingkan luas PP ber-keliling sama (Isoperimetric Relationship).",
      "mechanicDescription": "Tiga ronde: hitung L dari pasangan p,l dengan K tetap 60.",
      "voiceGuide": "Pilih luas atau pasangan yang benar.",
      "diagramType": "memori",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-d-p",
      "title": "Diagram Ketuk Luas",
      "bookReference": "hlm. 159–161",
      "objective": "Bandingkan luas PP ber-keliling sama (Isoperimetric Relationship).",
      "mechanicDescription": "Tiga ronde: hitung L dari pasangan p,l dengan K tetap 60.",
      "voiceGuide": "Pilih luas atau pasangan yang benar.",
      "diagramType": "ketuk",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "semua-d-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 159–161",
      "objective": "Bandingkan luas PP ber-keliling sama (Isoperimetric Relationship).",
      "mechanicDescription": "Tiga ronde: hitung L dari pasangan p,l dengan K tetap 60.",
      "voiceGuide": "Pilih luas atau pasangan yang benar.",
      "diagramType": "semua",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "cerita-d-p",
      "title": "Diagram Cerita Isoperimetric",
      "bookReference": "hlm. 159–161",
      "objective": "Bandingkan luas PP ber-keliling sama (Isoperimetric Relationship).",
      "mechanicDescription": "Tiga ronde: hitung L dari pasangan p,l dengan K tetap 60.",
      "voiceGuide": "Pilih luas atau pasangan yang benar.",
      "diagramType": "cerita",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "urut-d-p",
      "title": "Diagram Urutkan Luas",
      "bookReference": "hlm. 159–161",
      "objective": "Bandingkan luas PP ber-keliling sama (Isoperimetric Relationship).",
      "mechanicDescription": "Tiga ronde: hitung L dari pasangan p,l dengan K tetap 60.",
      "voiceGuide": "Pilih luas atau pasangan yang benar.",
      "diagramType": "urut",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-d-a",
      "title": "Tulis Hitung K dan L",
      "bookReference": "hlm. 159–161",
      "objective": "Bandingkan luas PP ber-keliling sama (Isoperimetric Relationship).",
      "mechanicDescription": "Tiga ronde: hitung L dari pasangan p,l dengan K tetap 60.",
      "voiceGuide": "Pilih luas atau pasangan yang benar.",
      "symbolLarge": "L",
      "wordLarge": "LUAS",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-d-a",
      "title": "Tulis Syarat Kawat",
      "bookReference": "hlm. 159–161",
      "objective": "Bandingkan luas PP ber-keliling sama (Isoperimetric Relationship).",
      "mechanicDescription": "Tiga ronde: hitung L dari pasangan p,l dengan K tetap 60.",
      "voiceGuide": "Pilih luas atau pasangan yang benar.",
      "symbolLarge": "L",
      "wordLarge": "LUAS",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-d-a",
      "title": "Tulis Banding Luas",
      "bookReference": "hlm. 159–161",
      "objective": "Bandingkan luas PP ber-keliling sama (Isoperimetric Relationship).",
      "mechanicDescription": "Tiga ronde: hitung L dari pasangan p,l dengan K tetap 60.",
      "voiceGuide": "Pilih luas atau pasangan yang benar.",
      "symbolLarge": "L",
      "wordLarge": "LUAS",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-d-a",
      "title": "Tulis Pilah K/L",
      "bookReference": "hlm. 159–161",
      "objective": "Bandingkan luas PP ber-keliling sama (Isoperimetric Relationship).",
      "mechanicDescription": "Tiga ronde: hitung L dari pasangan p,l dengan K tetap 60.",
      "voiceGuide": "Pilih luas atau pasangan yang benar.",
      "symbolLarge": "L",
      "wordLarge": "LUAS",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-d-a",
      "title": "Tulis Jodohkan Pasangan",
      "bookReference": "hlm. 159–161",
      "objective": "Bandingkan luas PP ber-keliling sama (Isoperimetric Relationship).",
      "mechanicDescription": "Tiga ronde: hitung L dari pasangan p,l dengan K tetap 60.",
      "voiceGuide": "Pilih luas atau pasangan yang benar.",
      "symbolLarge": "L",
      "wordLarge": "LUAS",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-d-a",
      "title": "Tulis Memori K&L",
      "bookReference": "hlm. 159–161",
      "objective": "Bandingkan luas PP ber-keliling sama (Isoperimetric Relationship).",
      "mechanicDescription": "Tiga ronde: hitung L dari pasangan p,l dengan K tetap 60.",
      "voiceGuide": "Pilih luas atau pasangan yang benar.",
      "symbolLarge": "L",
      "wordLarge": "LUAS",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-d",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 159–161",
      "objective": "Bandingkan luas PP ber-keliling sama (Isoperimetric Relationship).",
      "mechanicDescription": "Dua ronde menilai pernyataan.",
      "voiceGuide": "Benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-d",
      "title": "Detektif Luas",
      "bookReference": "hlm. 159–161",
      "objective": "Bandingkan luas PP ber-keliling sama (Isoperimetric Relationship).",
      "mechanicDescription": "Tiga soal petunjuk.",
      "voiceGuide": "Pilih dari petunjuk.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "peta-d",
      "title": "Peta Konsep",
      "bookReference": "hlm. 159–161",
      "objective": "Bandingkan luas PP ber-keliling sama (Isoperimetric Relationship).",
      "mechanicDescription": "Satu peta konsep.",
      "voiceGuide": "Pilih isi kotak.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "cerita-q-d",
      "title": "Cerita Angka",
      "bookReference": "hlm. 159–161",
      "objective": "Bandingkan luas PP ber-keliling sama (Isoperimetric Relationship).",
      "mechanicDescription": "Tiga ronde cerita.",
      "voiceGuide": "Baca lalu pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "🔒",
      "nama": "Syarat",
      "isi": "K=60 → 2(p+l)=60 → p+l=30.",
      "suara": "Kerangka kawat."
    },
    {
      "ikon": "⚖️",
      "nama": "Beda L",
      "isi": "K sama tidak menjamin L sama.",
      "suara": "Isoperimetric."
    },
    {
      "ikon": "⬜",
      "nama": "Terluas",
      "isi": "Mendekati persegi cenderung L lebih besar.",
      "suara": "Fixed Perimeter Maximize Area."
    },
    {
      "ikon": "🎯",
      "nama": "Pilih konsep",
      "isi": "Kawat/pagar → K; ubin/cat/pasir → L.",
      "suara": "Konteks."
    }
  ],
  "poinSuara": "Ingat: keliling sama luas bisa beda; mendekati persegi lebih luas; pilih K atau L sesuai kebutuhan.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Kunci keliling",
        "warna": "#FDE68A"
      },
      {
        "teks": "daftar p,l",
        "warna": "#BBF7D0"
      },
      {
        "teks": "hitung luas",
        "warna": "#BFDBFE"
      },
      {
        "teks": "bandingkan",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: dengan tali sama panjang, bentuk beberapa persegi panjang berbeda, perkirakan mana daerah dalamnya paling luas.",
  "refleksi": [
    "Mengapa 20×10 lebih luas dari 25×5 saat K sama?",
    "Apa arti Isoperimetric Relationship?",
    "Kapan memakai keliling, kapan luas?"
  ]
};

export const SUB_BAB_K5B5: SubBabNaskah[] = [SUB_A55, SUB_B55, SUB_C55, SUB_D55];
export const semuaAdeganK5B5 = SUB_BAB_K5B5.flatMap((s) => s.videos.flatMap((v) => v.adegan));
