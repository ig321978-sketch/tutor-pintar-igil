/**
 * Naskah Matematika Kelas 5 Bab 7 — Membandingkan Ciri-Ciri Bangun Datar (mendalam + metode luar berlabel).
 * Sumber buku: Kemendikbudristek Bab 7 hlm. 193–233. Sub-Bab A–B saja (Materi).
 * Satu sumber: buat-k5-bab7.mjs → kelas5-bab7.json. Tanpa React/jaringan.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K5B7_META = {
  "chapterId": "k5-mat-bab7",
  "phaseCode": "FASE_C",
  "grade": 5,
  "subjectLabel": "MATEMATIKA - KELAS 5 SD",
  "title": "BAB 7: MEMBANDINGKAN CIRI-CIRI BANGUN DATAR",
  "silabusElemen": "🌈 Fase C • Elemen Geometri: Membandingkan Ciri Segitiga dan Segi Empat (Kelas 5 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A57: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Ciri Segitiga)",
  "fullTitle": "Sub-Bab A: Membandingkan Ciri-Ciri Segitiga",
  "targetDescription": "Siswa menerapkan syarat ketaksamaan segitiga, mengelompokkan segitiga menurut sudut (lancip/siku/tumpul) dan sisi (sama kaki/sama sisi/sembarang), memakai jumlah sudut dalam 180°, serta memahami hierarki inklusif segitiga sama sisi sebagai sama kaki sesuai Buku Siswa Kelas V Bab 7 Sub-Bab A hlm. 196–209.",
  "secondaryBg": "#FFEDD5",
  "secondaryBorder": "#EA580C",
  "secondaryText": "#7C2D12",
  "silabus": {
    "teksSuara": "Di Candi Sewu, atap dan hiasan banyak berbentuk segitiga. Tiga sedotan belum tentu jadi segitiga: jumlah dua sisi harus lebih panjang dari sisi ketiga. Itu METODE LUAR Triangle Inequality Theorem. Kita kelompokkan menurut sudut: lancip, siku-siku, tumpul. Menurut sisi: sama kaki, sama sisi, sembarang. Jumlah tiga sudut dalam selalu seratus delapan puluh derajat. METODE LUAR Angle Sum Property dan Side-Angle Classification. Segitiga sama sisi juga sama kaki. METODE LUAR Inclusive Triangle Hierarchy. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa membandingkan ciri segitiga berdasarkan syarat sisi, jenis sudut, jumlah sudut 180°, dan hubungan sama sisi–sama kaki.",
    "referensi": "Buku Siswa Matematika Kelas V Bab 7 Sub-Bab A hlm. 196–209; METODE LUAR · Triangle Inequality Theorem; Angle Sum Property; Side-Angle Classification; Inclusive Triangle Hierarchy."
  },
  "videos": [],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Syarat sisi",
      "stepDesc": "Baca soal Membandingkan Ciri-Ciri Segitiga dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. a+b>c (Inequality) Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa menerapkan syarat ketaksamaan segitiga, mengelompokkan segitiga menurut sudut (lancip/siku/tumpul) dan sisi (sama ….",
      "icon": "📏",
      "flowFrom": "Syarat sisi",
      "flowTo": "Jenis sudut"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Jenis sudut",
      "stepDesc": "Lancip/siku/tumpul. Pada Membandingkan Ciri-Ciri Segitiga, langkah “Jenis sudut” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "∠",
      "flowFrom": "Jenis sudut",
      "flowTo": "Jumlah 180°"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Jumlah 180°",
      "stepDesc": "Angle Sum. Pada Membandingkan Ciri-Ciri Segitiga, langkah “Jumlah 180°” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "➕",
      "flowFrom": "Jumlah 180°",
      "flowTo": "Jenis sisi"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Jenis sisi",
      "stepDesc": "Sama kaki/sisi/sembarang. Pada Membandingkan Ciri-Ciri Segitiga, langkah “Jenis sisi” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "△",
      "flowFrom": "Jenis sisi",
      "flowTo": "Simetri"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Simetri",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Membandingkan Ciri-Ciri Segitiga. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "🪞",
      "flowFrom": "Simetri",
      "flowTo": "Hierarki"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Hierarki",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Membandingkan Ciri-Ciri Segitiga. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "📊",
      "flowFrom": "Hierarki",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Inequality",
      "emoji": "📏",
      "countNum": 1,
      "countWord": "a+b>c",
      "suara": "Inequality — a+b>c. Syarat: a+b lebih dari c, a+c lebih dari b, dan b+c lebih dari a. Jika salah satu gagal, sedotan tidak menutup menjadi segitiga. Ingat: a+b>c; Inequality; gagal = bukan.",
      "teksVisual": "📏 Inequality: a+b>c"
    },
    {
      "judul": "Lancip",
      "emoji": "△",
      "countNum": 1,
      "countWord": "3 sudut <90°",
      "suara": "Lancip — 3 sudut <90°. Pada Membandingkan Ciri-Ciri Segitiga, cocokkan gambar “Lancip” dengan artinya (3 sudut <90°), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "△ Lancip: 3 sudut <90°"
    },
    {
      "judul": "Siku-siku",
      "emoji": "⊿",
      "countNum": 1,
      "countWord": "1 sudut 90°",
      "suara": "Siku-siku — 1 sudut 90°. Pada Membandingkan Ciri-Ciri Segitiga, cocokkan gambar “Siku-siku” dengan artinya (1 sudut 90°), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "⊿ Siku-siku: 1 sudut 90°"
    },
    {
      "judul": "Tumpul",
      "emoji": "△",
      "countNum": 1,
      "countWord": "1 sudut >90°",
      "suara": "Tumpul — 1 sudut >90°. Pada Membandingkan Ciri-Ciri Segitiga, cocokkan gambar “Tumpul” dengan artinya (1 sudut >90°), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "△ Tumpul: 1 sudut >90°"
    },
    {
      "judul": "Jumlah",
      "emoji": "➕",
      "countNum": 180,
      "countWord": "180°",
      "suara": "Jumlah — 180°. Pada Membandingkan Ciri-Ciri Segitiga, cocokkan gambar “Jumlah” dengan artinya (180°), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Membandingkan…",
      "teksVisual": "➕ Jumlah: 180°"
    },
    {
      "judul": "Sama kaki",
      "emoji": "△",
      "countNum": 2,
      "countWord": "2 sisi sama",
      "suara": "Sama kaki — 2 sisi sama. Eksplorasi 7.1D: impitkan sisi alat peraga. Dua sisi berimpit → kaki-kaki sama panjang → segitiga sama kaki. Ingat: 2 sisi sama; sudut dasar sama; 1 lipat.",
      "teksVisual": "△ Sama kaki: 2 sisi sama"
    },
    {
      "judul": "Sama sisi",
      "emoji": "△",
      "countNum": 3,
      "countWord": "3 sisi = 60°",
      "suara": "Sama sisi — 3 sisi = 60°. Ketiga sisi berimpit → segitiga sama sisi; tiap sudut 180 bagi 3 = 60 derajat. Punya 3 simetri lipat dan 3 simetri putar. Ingat: 3 sisi sama; tiap sudut 60 derajat.",
      "teksVisual": "△ Sama sisi: 3 sisi = 60°"
    },
    {
      "judul": "Sembarang",
      "emoji": "△",
      "countNum": 0,
      "countWord": "sisi beda",
      "suara": "Sembarang — sisi beda. Ketiga sisi berbeda panjang. Tidak punya sisi yang sama, dan sudut-sudutnya juga umumnya berbeda. Ingat: semua sisi beda; tidak wajib ada sudut istimewa.",
      "teksVisual": "△ Sembarang: sisi beda"
    },
    {
      "judul": "Inclusive",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "sama sisi⊂sama kaki",
      "suara": "Inclusive — sama sisi⊂sama kaki. Pada Membandingkan Ciri-Ciri Segitiga, cocokkan gambar “Inclusive” dengan artinya (sama sisi⊂sama kaki), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🌍 Inclusive: sama sisi⊂sama kaki"
    },
    {
      "judul": "Siap B",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "segi empat",
      "suara": "Siap B — segi empat. Ciri segitiga sudah siap. Berikutnya kita bandingkan ciri segi empat: trapesium, jajargenjang, persegi panjang, belah ketupat, persegi, dan layang-layang.",
      "teksVisual": "➡️ Siap B: segi empat"
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-a-c",
      "title": "Hitung Syarat Sisi",
      "bookReference": "hlm. 196–209",
      "objective": "Bandingkan ciri segitiga dengan Triangle Inequality, Angle Sum, dan Inclusive Hierarchy.",
      "mechanicDescription": "Tiga ronde: syarat sisi, jenis sudut/sisi, hierarki sama sisi–sama kaki.",
      "voiceGuide": "Pilih jawaban terkait ciri segitiga.",
      "emoji": "△",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-a-c",
      "title": "Arti Inequality",
      "bookReference": "hlm. 196–209",
      "objective": "Bandingkan ciri segitiga dengan Triangle Inequality, Angle Sum, dan Inclusive Hierarchy.",
      "mechanicDescription": "Tiga ronde: syarat sisi, jenis sudut/sisi, hierarki sama sisi–sama kaki.",
      "voiceGuide": "Pilih jawaban terkait ciri segitiga.",
      "emoji": "△",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-a-c",
      "title": "Pilih Jenis Segitiga",
      "bookReference": "hlm. 196–209",
      "objective": "Bandingkan ciri segitiga dengan Triangle Inequality, Angle Sum, dan Inclusive Hierarchy.",
      "mechanicDescription": "Tiga ronde: syarat sisi, jenis sudut/sisi, hierarki sama sisi–sama kaki.",
      "voiceGuide": "Pilih jawaban terkait ciri segitiga.",
      "emoji": "△",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-a-c",
      "title": "Pilah Bisa/Tidak",
      "bookReference": "hlm. 196–209",
      "objective": "Bandingkan ciri segitiga dengan Triangle Inequality, Angle Sum, dan Inclusive Hierarchy.",
      "mechanicDescription": "Tiga ronde: syarat sisi, jenis sudut/sisi, hierarki sama sisi–sama kaki.",
      "voiceGuide": "Pilih jawaban terkait ciri segitiga.",
      "emoji": "△",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-a-c",
      "title": "Jodohkan Ciri",
      "bookReference": "hlm. 196–209",
      "objective": "Bandingkan ciri segitiga dengan Triangle Inequality, Angle Sum, dan Inclusive Hierarchy.",
      "mechanicDescription": "Tiga ronde: syarat sisi, jenis sudut/sisi, hierarki sama sisi–sama kaki.",
      "voiceGuide": "Pilih jawaban terkait ciri segitiga.",
      "emoji": "△",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-a-c",
      "title": "Memori Segitiga",
      "bookReference": "hlm. 196–209",
      "objective": "Bandingkan ciri segitiga dengan Triangle Inequality, Angle Sum, dan Inclusive Hierarchy.",
      "mechanicDescription": "Tiga ronde: syarat sisi, jenis sudut/sisi, hierarki sama sisi–sama kaki.",
      "voiceGuide": "Pilih jawaban terkait ciri segitiga.",
      "emoji": "△",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-a-c",
      "title": "Ketuk 180°",
      "bookReference": "hlm. 196–209",
      "objective": "Bandingkan ciri segitiga dengan Triangle Inequality, Angle Sum, dan Inclusive Hierarchy.",
      "mechanicDescription": "Tiga ronde: syarat sisi, jenis sudut/sisi, hierarki sama sisi–sama kaki.",
      "voiceGuide": "Pilih jawaban terkait ciri segitiga.",
      "emoji": "△",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-a-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 196–209",
      "objective": "Bandingkan ciri segitiga dengan Triangle Inequality, Angle Sum, dan Inclusive Hierarchy.",
      "mechanicDescription": "Tiga ronde: syarat sisi, jenis sudut/sisi, hierarki sama sisi–sama kaki.",
      "voiceGuide": "Pilih jawaban terkait ciri segitiga.",
      "emoji": "△",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-a-c",
      "title": "Cerita Candi",
      "bookReference": "hlm. 196–209",
      "objective": "Bandingkan ciri segitiga dengan Triangle Inequality, Angle Sum, dan Inclusive Hierarchy.",
      "mechanicDescription": "Tiga ronde: syarat sisi, jenis sudut/sisi, hierarki sama sisi–sama kaki.",
      "voiceGuide": "Pilih jawaban terkait ciri segitiga.",
      "emoji": "△",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-a-c",
      "title": "Urutkan Sudut",
      "bookReference": "hlm. 196–209",
      "objective": "Bandingkan ciri segitiga dengan Triangle Inequality, Angle Sum, dan Inclusive Hierarchy.",
      "mechanicDescription": "Tiga ronde: syarat sisi, jenis sudut/sisi, hierarki sama sisi–sama kaki.",
      "voiceGuide": "Pilih jawaban terkait ciri segitiga.",
      "emoji": "△",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-a-p",
      "title": "Diagram Hitung Syarat Sisi",
      "bookReference": "hlm. 196–209",
      "objective": "Bandingkan ciri segitiga dengan Triangle Inequality, Angle Sum, dan Inclusive Hierarchy.",
      "mechanicDescription": "Tiga ronde: syarat sisi, jenis sudut/sisi, hierarki sama sisi–sama kaki.",
      "voiceGuide": "Pilih jawaban terkait ciri segitiga.",
      "diagramType": "hitung",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "rumus-a-p",
      "title": "Diagram Arti Inequality",
      "bookReference": "hlm. 196–209",
      "objective": "Bandingkan ciri segitiga dengan Triangle Inequality, Angle Sum, dan Inclusive Hierarchy.",
      "mechanicDescription": "Tiga ronde: syarat sisi, jenis sudut/sisi, hierarki sama sisi–sama kaki.",
      "voiceGuide": "Pilih jawaban terkait ciri segitiga.",
      "diagramType": "rumus",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "arti-a-p",
      "title": "Diagram Pilih Jenis Segitiga",
      "bookReference": "hlm. 196–209",
      "objective": "Bandingkan ciri segitiga dengan Triangle Inequality, Angle Sum, dan Inclusive Hierarchy.",
      "mechanicDescription": "Tiga ronde: syarat sisi, jenis sudut/sisi, hierarki sama sisi–sama kaki.",
      "voiceGuide": "Pilih jawaban terkait ciri segitiga.",
      "diagramType": "arti",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sortir-a-p",
      "title": "Diagram Pilah Bisa/Tidak",
      "bookReference": "hlm. 196–209",
      "objective": "Bandingkan ciri segitiga dengan Triangle Inequality, Angle Sum, dan Inclusive Hierarchy.",
      "mechanicDescription": "Tiga ronde: syarat sisi, jenis sudut/sisi, hierarki sama sisi–sama kaki.",
      "voiceGuide": "Pilih jawaban terkait ciri segitiga.",
      "diagramType": "sortir",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-a-p",
      "title": "Diagram Jodohkan Ciri",
      "bookReference": "hlm. 196–209",
      "objective": "Bandingkan ciri segitiga dengan Triangle Inequality, Angle Sum, dan Inclusive Hierarchy.",
      "mechanicDescription": "Tiga ronde: syarat sisi, jenis sudut/sisi, hierarki sama sisi–sama kaki.",
      "voiceGuide": "Pilih jawaban terkait ciri segitiga.",
      "diagramType": "jodoh",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memori-a-p",
      "title": "Diagram Memori Segitiga",
      "bookReference": "hlm. 196–209",
      "objective": "Bandingkan ciri segitiga dengan Triangle Inequality, Angle Sum, dan Inclusive Hierarchy.",
      "mechanicDescription": "Tiga ronde: syarat sisi, jenis sudut/sisi, hierarki sama sisi–sama kaki.",
      "voiceGuide": "Pilih jawaban terkait ciri segitiga.",
      "diagramType": "memori",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-a-p",
      "title": "Diagram Ketuk 180°",
      "bookReference": "hlm. 196–209",
      "objective": "Bandingkan ciri segitiga dengan Triangle Inequality, Angle Sum, dan Inclusive Hierarchy.",
      "mechanicDescription": "Tiga ronde: syarat sisi, jenis sudut/sisi, hierarki sama sisi–sama kaki.",
      "voiceGuide": "Pilih jawaban terkait ciri segitiga.",
      "diagramType": "ketuk",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "semua-a-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 196–209",
      "objective": "Bandingkan ciri segitiga dengan Triangle Inequality, Angle Sum, dan Inclusive Hierarchy.",
      "mechanicDescription": "Tiga ronde: syarat sisi, jenis sudut/sisi, hierarki sama sisi–sama kaki.",
      "voiceGuide": "Pilih jawaban terkait ciri segitiga.",
      "diagramType": "semua",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "cerita-a-p",
      "title": "Diagram Cerita Candi",
      "bookReference": "hlm. 196–209",
      "objective": "Bandingkan ciri segitiga dengan Triangle Inequality, Angle Sum, dan Inclusive Hierarchy.",
      "mechanicDescription": "Tiga ronde: syarat sisi, jenis sudut/sisi, hierarki sama sisi–sama kaki.",
      "voiceGuide": "Pilih jawaban terkait ciri segitiga.",
      "diagramType": "cerita",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "urut-a-p",
      "title": "Diagram Urutkan Sudut",
      "bookReference": "hlm. 196–209",
      "objective": "Bandingkan ciri segitiga dengan Triangle Inequality, Angle Sum, dan Inclusive Hierarchy.",
      "mechanicDescription": "Tiga ronde: syarat sisi, jenis sudut/sisi, hierarki sama sisi–sama kaki.",
      "voiceGuide": "Pilih jawaban terkait ciri segitiga.",
      "diagramType": "urut",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-a-a",
      "title": "Tulis Hitung Syarat Sisi",
      "bookReference": "hlm. 196–209",
      "objective": "Bandingkan ciri segitiga dengan Triangle Inequality, Angle Sum, dan Inclusive Hierarchy.",
      "mechanicDescription": "Tiga ronde: syarat sisi, jenis sudut/sisi, hierarki sama sisi–sama kaki.",
      "voiceGuide": "Pilih jawaban terkait ciri segitiga.",
      "symbolLarge": "△",
      "wordLarge": "SEGITIGA",
      "mathNotation": "a+b>c · 180°"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-a-a",
      "title": "Tulis Arti Inequality",
      "bookReference": "hlm. 196–209",
      "objective": "Bandingkan ciri segitiga dengan Triangle Inequality, Angle Sum, dan Inclusive Hierarchy.",
      "mechanicDescription": "Tiga ronde: syarat sisi, jenis sudut/sisi, hierarki sama sisi–sama kaki.",
      "voiceGuide": "Pilih jawaban terkait ciri segitiga.",
      "symbolLarge": "△",
      "wordLarge": "SEGITIGA",
      "mathNotation": "a+b>c · 180°"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-a-a",
      "title": "Tulis Pilih Jenis Segitiga",
      "bookReference": "hlm. 196–209",
      "objective": "Bandingkan ciri segitiga dengan Triangle Inequality, Angle Sum, dan Inclusive Hierarchy.",
      "mechanicDescription": "Tiga ronde: syarat sisi, jenis sudut/sisi, hierarki sama sisi–sama kaki.",
      "voiceGuide": "Pilih jawaban terkait ciri segitiga.",
      "symbolLarge": "△",
      "wordLarge": "SEGITIGA",
      "mathNotation": "a+b>c · 180°"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-a-a",
      "title": "Tulis Pilah Bisa/Tidak",
      "bookReference": "hlm. 196–209",
      "objective": "Bandingkan ciri segitiga dengan Triangle Inequality, Angle Sum, dan Inclusive Hierarchy.",
      "mechanicDescription": "Tiga ronde: syarat sisi, jenis sudut/sisi, hierarki sama sisi–sama kaki.",
      "voiceGuide": "Pilih jawaban terkait ciri segitiga.",
      "symbolLarge": "△",
      "wordLarge": "SEGITIGA",
      "mathNotation": "a+b>c · 180°"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-a-a",
      "title": "Tulis Jodohkan Ciri",
      "bookReference": "hlm. 196–209",
      "objective": "Bandingkan ciri segitiga dengan Triangle Inequality, Angle Sum, dan Inclusive Hierarchy.",
      "mechanicDescription": "Tiga ronde: syarat sisi, jenis sudut/sisi, hierarki sama sisi–sama kaki.",
      "voiceGuide": "Pilih jawaban terkait ciri segitiga.",
      "symbolLarge": "△",
      "wordLarge": "SEGITIGA",
      "mathNotation": "a+b>c · 180°"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-a-a",
      "title": "Tulis Memori Segitiga",
      "bookReference": "hlm. 196–209",
      "objective": "Bandingkan ciri segitiga dengan Triangle Inequality, Angle Sum, dan Inclusive Hierarchy.",
      "mechanicDescription": "Tiga ronde: syarat sisi, jenis sudut/sisi, hierarki sama sisi–sama kaki.",
      "voiceGuide": "Pilih jawaban terkait ciri segitiga.",
      "symbolLarge": "△",
      "wordLarge": "SEGITIGA",
      "mathNotation": "a+b>c · 180°"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-a",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 196–209",
      "objective": "Bandingkan ciri segitiga dengan Triangle Inequality, Angle Sum, dan Inclusive Hierarchy.",
      "mechanicDescription": "Dua ronde menilai pernyataan.",
      "voiceGuide": "Benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-a",
      "title": "Detektif Bangun",
      "bookReference": "hlm. 196–209",
      "objective": "Bandingkan ciri segitiga dengan Triangle Inequality, Angle Sum, dan Inclusive Hierarchy.",
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
      "bookReference": "hlm. 196–209",
      "objective": "Bandingkan ciri segitiga dengan Triangle Inequality, Angle Sum, dan Inclusive Hierarchy.",
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
      "bookReference": "hlm. 196–209",
      "objective": "Bandingkan ciri segitiga dengan Triangle Inequality, Angle Sum, dan Inclusive Hierarchy.",
      "mechanicDescription": "Tiga ronde cerita.",
      "voiceGuide": "Baca lalu pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "📏",
      "nama": "Syarat",
      "isi": "Tiga sisi jadi segitiga jika a+b>c, a+c>b, b+c>a (Triangle Inequality).",
      "suara": "Eksplorasi 7.1A."
    },
    {
      "ikon": "➕",
      "nama": "180°",
      "isi": "Jumlah sudut dalam segitiga = 180° (Angle Sum Property).",
      "suara": "Eksplorasi 7.1C."
    },
    {
      "ikon": "△",
      "nama": "Jenis",
      "isi": "Menurut sudut: lancip, siku, tumpul. Menurut sisi: sama kaki, sama sisi, sembarang.",
      "suara": "Side-Angle Classification."
    },
    {
      "ikon": "📊",
      "nama": "Hierarki",
      "isi": "Segitiga sama sisi digolongkan sebagai sama kaki (Inclusive Hierarchy).",
      "suara": "hlm. 208."
    }
  ],
  "poinSuara": "Ingat: uji a plus b lebih dari c, jumlah sudut seratus delapan puluh, kelompokkan menurut sudut dan sisi, sama sisi termasuk sama kaki.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Uji a+b>c",
        "warna": "#FDE68A"
      },
      {
        "teks": "cek jenis sudut",
        "warna": "#BBF7D0"
      },
      {
        "teks": "jumlah 180°",
        "warna": "#BFDBFE"
      },
      {
        "teks": "jenis sisi & hierarki",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: ukur tiga sisi sebuah penggaris segitiga atau sedotan, uji Triangle Inequality, lalu sebut jenis sudut dan sisinya.",
  "refleksi": [
    "Kapan tiga panjang tidak membentuk segitiga?",
    "Mengapa tidak mungkin ada dua sudut tumpul dalam satu segitiga?",
    "Mengapa segitiga sama sisi boleh disebut sama kaki?"
  ]
};
export const SUB_B57: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Ciri Segi Empat)",
  "fullTitle": "Sub-Bab B: Membandingkan Ciri-Ciri Segi Empat",
  "targetDescription": "Siswa membandingkan ciri trapesium, jajargenjang, persegi panjang, belah ketupat, persegi, dan layang-layang; memakai definisi inklusif trapesium (setidaknya sepasang sisi sejajar); serta menempatkan bangun pada hierarki segi empat sesuai Buku Siswa Kelas V Bab 7 Sub-Bab B hlm. 209–233.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Denah Candi Sewu memicu debat: persegi atau persegi panjang? Segi empat punya empat sisi. Trapesium punya setidaknya sepasang sisi sejajar. METODE LUAR Inclusive Trapezoid Definition. Jajargenjang punya dua pasang sisi berhadapan sejajar. Persegi panjang adalah jajargenjang bersudut siku. Belah ketupat punya empat sisi sama. Persegi adalah belah ketupat bersudut siku, sekaligus persegi panjang. Layang-layang punya dua pasang sisi berurutan sama panjang. METODE LUAR Inclusive Quadrilateral Hierarchy atau Van Hiele Property Comparison. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa membandingkan dan menghubungkan ciri segi empat hingga memahami hubungan inklusif antarjenis.",
    "referensi": "Buku Siswa Matematika Kelas V Bab 7 Sub-Bab B hlm. 209–233; METODE LUAR · Inclusive Trapezoid Definition; Inclusive Quadrilateral Hierarchy (Van Hiele); Property Comparison Matrix."
  },
  "videos": [],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Segi empat",
      "stepDesc": "Baca soal Membandingkan Ciri-Ciri Segi Empat dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. 4 sisi Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa membandingkan ciri trapesium, jajargenjang, persegi panjang, belah ketupat, persegi, dan layang-layang; memakai de….",
      "icon": "⬜",
      "flowFrom": "Segi empat",
      "flowTo": "Trapesium"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Trapesium",
      "stepDesc": "≥1 sejajar. Pada Membandingkan Ciri-Ciri Segi Empat, langkah “Trapesium” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "⬡",
      "flowFrom": "Trapesium",
      "flowTo": "Jajargenjang"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Jajargenjang",
      "stepDesc": "2 pasang sejajar. Pada Membandingkan Ciri-Ciri Segi Empat, langkah “Jajargenjang” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "▱",
      "flowFrom": "Jajargenjang",
      "flowTo": "PP & BK"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. PP & BK",
      "stepDesc": "siku / sisi sama. Pada Membandingkan Ciri-Ciri Segi Empat, langkah “PP & BK” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "▭◆",
      "flowFrom": "PP & BK",
      "flowTo": "Persegi"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Persegi",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Membandingkan Ciri-Ciri Segi Empat. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "⬜",
      "flowFrom": "Persegi",
      "flowTo": "Layang"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Layang",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Membandingkan Ciri-Ciri Segi Empat. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "🪁",
      "flowFrom": "Layang",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Segi empat",
      "emoji": "⬜",
      "countNum": 4,
      "countWord": "4 sisi",
      "suara": "Segi empat — 4 sisi. Segi empat dibatasi empat sisi. Di denah Candi Sewu, Asep melihat bentuk persegi, Lukas melihat panjang dan lebar berbeda. Ingat: 4 sisi; debat denah; persegi ⊂ PP.",
      "teksVisual": "⬜ Segi empat: 4 sisi"
    },
    {
      "judul": "Trapesium",
      "emoji": "⬡",
      "countNum": 1,
      "countWord": "≥1 sejajar",
      "suara": "Trapesium — ≥1 sejajar. Eksplorasi 7.2B: trapesium punya setidaknya sepasang sisi sejajar. Buku bersepakat definisi luas ini agar jajargenjang termasuk trapesium. Ingat: ≥1 sejajar; inklusif; siku / sama kaki.",
      "teksVisual": "⬡ Trapesium: ≥1 sejajar"
    },
    {
      "judul": "Jajargenjang",
      "emoji": "▱",
      "countNum": 2,
      "countWord": "2 pasang sejajar",
      "suara": "Jajargenjang — 2 pasang sejajar. Eksplorasi 7.2C: dua pasang sisi berhadapan sejajar dan sama panjang. Sudut berhadapan sama besar. Ingat: 2 pasang sejajar; sudut hadap sama; ⊂ trapesium.",
      "teksVisual": "▱ Jajargenjang: 2 pasang sejajar"
    },
    {
      "judul": "Persegi panjang",
      "emoji": "▭",
      "countNum": 4,
      "countWord": "4 siku",
      "suara": "Persegi panjang — 4 siku. Semua sudut siku-siku; sisi berhadapan sama dan sejajar. Memiliki semua ciri jajargenjang, plus siku-siku. Ingat: 4 siku; ciri JG + siku; PP ⊂ JG.",
      "teksVisual": "▭ Persegi panjang: 4 siku"
    },
    {
      "judul": "Belah ketupat",
      "emoji": "◆",
      "countNum": 4,
      "countWord": "4 sisi sama",
      "suara": "Belah ketupat — 4 sisi sama. Belah ketupat: empat sisi sama panjang; sudut hadap sama; diagonal tegak lurus. Termasuk jajargenjang. Persegi = belah ketupat bersudut siku.",
      "teksVisual": "◆ Belah ketupat: 4 sisi sama"
    },
    {
      "judul": "Persegi",
      "emoji": "⬜",
      "countNum": 4,
      "countWord": "siku+sama",
      "suara": "Persegi — siku+sama. Semua sudut siku-siku; sisi berhadapan sama dan sejajar. Memiliki semua ciri jajargenjang, plus siku-siku. Ingat: 4 siku; ciri JG + siku; PP ⊂ JG.",
      "teksVisual": "⬜ Persegi: siku+sama"
    },
    {
      "judul": "Layang-layang",
      "emoji": "🪁",
      "countNum": 2,
      "countWord": "sisi berurutan",
      "suara": "Layang-layang — sisi berurutan. Eksplorasi 7.2G: dua pasang sisi berurutan sama panjang. Satu pasang sudut berhadapan sama besar. Ingat: 2 pasang berurutan; sudut hadap; diagonal ⊥.",
      "teksVisual": "🪁 Layang-layang: sisi berurutan"
    },
    {
      "judul": "Diagonal",
      "emoji": "✖️",
      "countNum": 1,
      "countWord": "cek ⊥ / bagi 2",
      "suara": "Diagonal — cek ⊥ / bagi 2. Pada Membandingkan Ciri-Ciri Segi Empat, cocokkan gambar “Diagonal” dengan artinya (cek ⊥ / bagi 2), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "✖️ Diagonal: cek ⊥ / bagi 2"
    },
    {
      "judul": "Van Hiele",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "Property Matrix",
      "suara": "Van Hiele — Property Matrix. Pada Membandingkan Ciri-Ciri Segi Empat, cocokkan gambar “Van Hiele” dengan artinya (Property Matrix), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🌍 Van Hiele: Property Matrix"
    },
    {
      "judul": "Bab 7 A–B",
      "emoji": "🎉",
      "countNum": 1,
      "countWord": "Materi siap",
      "suara": "Bab 7 A–B — Materi siap. Pada Membandingkan Ciri-Ciri Segi Empat, cocokkan gambar “Bab 7 A–B” dengan artinya (Materi siap), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🎉 Bab 7 A–B: Materi siap"
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-b-c",
      "title": "Hitung Ciri Sejajar",
      "bookReference": "hlm. 209–233",
      "objective": "Bandingkan ciri segi empat dengan Inclusive Trapezoid dan Quadrilateral Hierarchy.",
      "mechanicDescription": "Tiga ronde: sejajar, hierarki inklusif, matriks ciri Van Hiele.",
      "voiceGuide": "Pilih jawaban terkait ciri segi empat.",
      "emoji": "⬜",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-b-c",
      "title": "Urutan Hierarki",
      "bookReference": "hlm. 209–233",
      "objective": "Bandingkan ciri segi empat dengan Inclusive Trapezoid dan Quadrilateral Hierarchy.",
      "mechanicDescription": "Tiga ronde: sejajar, hierarki inklusif, matriks ciri Van Hiele.",
      "voiceGuide": "Pilih jawaban terkait ciri segi empat.",
      "emoji": "⬜",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-b-c",
      "title": "Arti Definisi",
      "bookReference": "hlm. 209–233",
      "objective": "Bandingkan ciri segi empat dengan Inclusive Trapezoid dan Quadrilateral Hierarchy.",
      "mechanicDescription": "Tiga ronde: sejajar, hierarki inklusif, matriks ciri Van Hiele.",
      "voiceGuide": "Pilih jawaban terkait ciri segi empat.",
      "emoji": "⬜",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-b-c",
      "title": "Pilah Jenis Bangun",
      "bookReference": "hlm. 209–233",
      "objective": "Bandingkan ciri segi empat dengan Inclusive Trapezoid dan Quadrilateral Hierarchy.",
      "mechanicDescription": "Tiga ronde: sejajar, hierarki inklusif, matriks ciri Van Hiele.",
      "voiceGuide": "Pilih jawaban terkait ciri segi empat.",
      "emoji": "⬜",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-b-c",
      "title": "Jodohkan Ciri",
      "bookReference": "hlm. 209–233",
      "objective": "Bandingkan ciri segi empat dengan Inclusive Trapezoid dan Quadrilateral Hierarchy.",
      "mechanicDescription": "Tiga ronde: sejajar, hierarki inklusif, matriks ciri Van Hiele.",
      "voiceGuide": "Pilih jawaban terkait ciri segi empat.",
      "emoji": "⬜",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-b-c",
      "title": "Memori Segi Empat",
      "bookReference": "hlm. 209–233",
      "objective": "Bandingkan ciri segi empat dengan Inclusive Trapezoid dan Quadrilateral Hierarchy.",
      "mechanicDescription": "Tiga ronde: sejajar, hierarki inklusif, matriks ciri Van Hiele.",
      "voiceGuide": "Pilih jawaban terkait ciri segi empat.",
      "emoji": "⬜",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-b-c",
      "title": "Ketuk Sejajar",
      "bookReference": "hlm. 209–233",
      "objective": "Bandingkan ciri segi empat dengan Inclusive Trapezoid dan Quadrilateral Hierarchy.",
      "mechanicDescription": "Tiga ronde: sejajar, hierarki inklusif, matriks ciri Van Hiele.",
      "voiceGuide": "Pilih jawaban terkait ciri segi empat.",
      "emoji": "⬜",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-b-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 209–233",
      "objective": "Bandingkan ciri segi empat dengan Inclusive Trapezoid dan Quadrilateral Hierarchy.",
      "mechanicDescription": "Tiga ronde: sejajar, hierarki inklusif, matriks ciri Van Hiele.",
      "voiceGuide": "Pilih jawaban terkait ciri segi empat.",
      "emoji": "⬜",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-b-c",
      "title": "Cerita Denah Candi",
      "bookReference": "hlm. 209–233",
      "objective": "Bandingkan ciri segi empat dengan Inclusive Trapezoid dan Quadrilateral Hierarchy.",
      "mechanicDescription": "Tiga ronde: sejajar, hierarki inklusif, matriks ciri Van Hiele.",
      "voiceGuide": "Pilih jawaban terkait ciri segi empat.",
      "emoji": "⬜",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-b-c",
      "title": "Urutkan Keluarga",
      "bookReference": "hlm. 209–233",
      "objective": "Bandingkan ciri segi empat dengan Inclusive Trapezoid dan Quadrilateral Hierarchy.",
      "mechanicDescription": "Tiga ronde: sejajar, hierarki inklusif, matriks ciri Van Hiele.",
      "voiceGuide": "Pilih jawaban terkait ciri segi empat.",
      "emoji": "⬜",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-b-p",
      "title": "Diagram Hitung Ciri Sejajar",
      "bookReference": "hlm. 209–233",
      "objective": "Bandingkan ciri segi empat dengan Inclusive Trapezoid dan Quadrilateral Hierarchy.",
      "mechanicDescription": "Tiga ronde: sejajar, hierarki inklusif, matriks ciri Van Hiele.",
      "voiceGuide": "Pilih jawaban terkait ciri segi empat.",
      "diagramType": "hitung",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "rumus-b-p",
      "title": "Diagram Urutan Hierarki",
      "bookReference": "hlm. 209–233",
      "objective": "Bandingkan ciri segi empat dengan Inclusive Trapezoid dan Quadrilateral Hierarchy.",
      "mechanicDescription": "Tiga ronde: sejajar, hierarki inklusif, matriks ciri Van Hiele.",
      "voiceGuide": "Pilih jawaban terkait ciri segi empat.",
      "diagramType": "rumus",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "arti-b-p",
      "title": "Diagram Arti Definisi",
      "bookReference": "hlm. 209–233",
      "objective": "Bandingkan ciri segi empat dengan Inclusive Trapezoid dan Quadrilateral Hierarchy.",
      "mechanicDescription": "Tiga ronde: sejajar, hierarki inklusif, matriks ciri Van Hiele.",
      "voiceGuide": "Pilih jawaban terkait ciri segi empat.",
      "diagramType": "arti",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sortir-b-p",
      "title": "Diagram Pilah Jenis Bangun",
      "bookReference": "hlm. 209–233",
      "objective": "Bandingkan ciri segi empat dengan Inclusive Trapezoid dan Quadrilateral Hierarchy.",
      "mechanicDescription": "Tiga ronde: sejajar, hierarki inklusif, matriks ciri Van Hiele.",
      "voiceGuide": "Pilih jawaban terkait ciri segi empat.",
      "diagramType": "sortir",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-b-p",
      "title": "Diagram Jodohkan Ciri",
      "bookReference": "hlm. 209–233",
      "objective": "Bandingkan ciri segi empat dengan Inclusive Trapezoid dan Quadrilateral Hierarchy.",
      "mechanicDescription": "Tiga ronde: sejajar, hierarki inklusif, matriks ciri Van Hiele.",
      "voiceGuide": "Pilih jawaban terkait ciri segi empat.",
      "diagramType": "jodoh",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memori-b-p",
      "title": "Diagram Memori Segi Empat",
      "bookReference": "hlm. 209–233",
      "objective": "Bandingkan ciri segi empat dengan Inclusive Trapezoid dan Quadrilateral Hierarchy.",
      "mechanicDescription": "Tiga ronde: sejajar, hierarki inklusif, matriks ciri Van Hiele.",
      "voiceGuide": "Pilih jawaban terkait ciri segi empat.",
      "diagramType": "memori",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-b-p",
      "title": "Diagram Ketuk Sejajar",
      "bookReference": "hlm. 209–233",
      "objective": "Bandingkan ciri segi empat dengan Inclusive Trapezoid dan Quadrilateral Hierarchy.",
      "mechanicDescription": "Tiga ronde: sejajar, hierarki inklusif, matriks ciri Van Hiele.",
      "voiceGuide": "Pilih jawaban terkait ciri segi empat.",
      "diagramType": "ketuk",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "semua-b-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 209–233",
      "objective": "Bandingkan ciri segi empat dengan Inclusive Trapezoid dan Quadrilateral Hierarchy.",
      "mechanicDescription": "Tiga ronde: sejajar, hierarki inklusif, matriks ciri Van Hiele.",
      "voiceGuide": "Pilih jawaban terkait ciri segi empat.",
      "diagramType": "semua",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "cerita-b-p",
      "title": "Diagram Cerita Denah Candi",
      "bookReference": "hlm. 209–233",
      "objective": "Bandingkan ciri segi empat dengan Inclusive Trapezoid dan Quadrilateral Hierarchy.",
      "mechanicDescription": "Tiga ronde: sejajar, hierarki inklusif, matriks ciri Van Hiele.",
      "voiceGuide": "Pilih jawaban terkait ciri segi empat.",
      "diagramType": "cerita",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "urut-b-p",
      "title": "Diagram Urutkan Keluarga",
      "bookReference": "hlm. 209–233",
      "objective": "Bandingkan ciri segi empat dengan Inclusive Trapezoid dan Quadrilateral Hierarchy.",
      "mechanicDescription": "Tiga ronde: sejajar, hierarki inklusif, matriks ciri Van Hiele.",
      "voiceGuide": "Pilih jawaban terkait ciri segi empat.",
      "diagramType": "urut",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-b-a",
      "title": "Tulis Hitung Ciri Sejajar",
      "bookReference": "hlm. 209–233",
      "objective": "Bandingkan ciri segi empat dengan Inclusive Trapezoid dan Quadrilateral Hierarchy.",
      "mechanicDescription": "Tiga ronde: sejajar, hierarki inklusif, matriks ciri Van Hiele.",
      "voiceGuide": "Pilih jawaban terkait ciri segi empat.",
      "symbolLarge": "⬜",
      "wordLarge": "SEGI EMPAT",
      "mathNotation": "sejajar · hierarki"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-b-a",
      "title": "Tulis Urutan Hierarki",
      "bookReference": "hlm. 209–233",
      "objective": "Bandingkan ciri segi empat dengan Inclusive Trapezoid dan Quadrilateral Hierarchy.",
      "mechanicDescription": "Tiga ronde: sejajar, hierarki inklusif, matriks ciri Van Hiele.",
      "voiceGuide": "Pilih jawaban terkait ciri segi empat.",
      "symbolLarge": "⬜",
      "wordLarge": "SEGI EMPAT",
      "mathNotation": "sejajar · hierarki"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-b-a",
      "title": "Tulis Arti Definisi",
      "bookReference": "hlm. 209–233",
      "objective": "Bandingkan ciri segi empat dengan Inclusive Trapezoid dan Quadrilateral Hierarchy.",
      "mechanicDescription": "Tiga ronde: sejajar, hierarki inklusif, matriks ciri Van Hiele.",
      "voiceGuide": "Pilih jawaban terkait ciri segi empat.",
      "symbolLarge": "⬜",
      "wordLarge": "SEGI EMPAT",
      "mathNotation": "sejajar · hierarki"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-b-a",
      "title": "Tulis Pilah Jenis Bangun",
      "bookReference": "hlm. 209–233",
      "objective": "Bandingkan ciri segi empat dengan Inclusive Trapezoid dan Quadrilateral Hierarchy.",
      "mechanicDescription": "Tiga ronde: sejajar, hierarki inklusif, matriks ciri Van Hiele.",
      "voiceGuide": "Pilih jawaban terkait ciri segi empat.",
      "symbolLarge": "⬜",
      "wordLarge": "SEGI EMPAT",
      "mathNotation": "sejajar · hierarki"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-b-a",
      "title": "Tulis Jodohkan Ciri",
      "bookReference": "hlm. 209–233",
      "objective": "Bandingkan ciri segi empat dengan Inclusive Trapezoid dan Quadrilateral Hierarchy.",
      "mechanicDescription": "Tiga ronde: sejajar, hierarki inklusif, matriks ciri Van Hiele.",
      "voiceGuide": "Pilih jawaban terkait ciri segi empat.",
      "symbolLarge": "⬜",
      "wordLarge": "SEGI EMPAT",
      "mathNotation": "sejajar · hierarki"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-b-a",
      "title": "Tulis Memori Segi Empat",
      "bookReference": "hlm. 209–233",
      "objective": "Bandingkan ciri segi empat dengan Inclusive Trapezoid dan Quadrilateral Hierarchy.",
      "mechanicDescription": "Tiga ronde: sejajar, hierarki inklusif, matriks ciri Van Hiele.",
      "voiceGuide": "Pilih jawaban terkait ciri segi empat.",
      "symbolLarge": "⬜",
      "wordLarge": "SEGI EMPAT",
      "mathNotation": "sejajar · hierarki"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-b",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 209–233",
      "objective": "Bandingkan ciri segi empat dengan Inclusive Trapezoid dan Quadrilateral Hierarchy.",
      "mechanicDescription": "Dua ronde menilai pernyataan.",
      "voiceGuide": "Benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-b",
      "title": "Detektif Bangun",
      "bookReference": "hlm. 209–233",
      "objective": "Bandingkan ciri segi empat dengan Inclusive Trapezoid dan Quadrilateral Hierarchy.",
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
      "bookReference": "hlm. 209–233",
      "objective": "Bandingkan ciri segi empat dengan Inclusive Trapezoid dan Quadrilateral Hierarchy.",
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
      "bookReference": "hlm. 209–233",
      "objective": "Bandingkan ciri segi empat dengan Inclusive Trapezoid dan Quadrilateral Hierarchy.",
      "mechanicDescription": "Tiga ronde cerita.",
      "voiceGuide": "Baca lalu pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "⬡",
      "nama": "Trapesium",
      "isi": "Setidaknya sepasang sisi sejajar (Inclusive Trapezoid Definition).",
      "suara": "Eksplorasi 7.2B."
    },
    {
      "ikon": "▱",
      "nama": "Jajargenjang",
      "isi": "Dua pasang sisi berhadapan sejajar dan sama panjang; sudut hadap sama.",
      "suara": "Termasuk trapesium."
    },
    {
      "ikon": "⬜",
      "nama": "Hierarki",
      "isi": "PP ⊂ JG; BK ⊂ JG; persegi ⊂ PP dan BK; BK ⊂ layang-layang.",
      "suara": "Inclusive Quadrilateral Hierarchy."
    },
    {
      "ikon": "📋",
      "nama": "Matriks",
      "isi": "Bandingkan ciri dengan Property Comparison Matrix, jangan hafal nama saja.",
      "suara": "Van Hiele."
    }
  ],
  "poinSuara": "Ingat: trapesium setidaknya sepasang sejajar, jajargenjang dua pasang, persegi panjang dan belah ketupat serta persegi saling terkait secara inklusif, uji ciri dengan matriks.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Kenali 4 sisi",
        "warna": "#FDE68A"
      },
      {
        "teks": "cek sejajar",
        "warna": "#BBF7D0"
      },
      {
        "teks": "cek sisi & sudut",
        "warna": "#BFDBFE"
      },
      {
        "teks": "tempatkan di hierarki",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: cari benda berbentuk persegi panjang dan belah ketupat, tulis ciri sejajar/sisi/sudut, lalu tentukan di keluarga mana mereka berada.",
  "refleksi": [
    "Mengapa buku memakai definisi trapesium 'setidaknya sepasang sejajar'?",
    "Mengapa persegi panjang boleh disebut jajargenjang?",
    "Ciri apa yang membedakan layang-layang dan belah ketupat?"
  ]
};

export const SUB_BAB_K5B7: SubBabNaskah[] = [SUB_A57, SUB_B57];
export const semuaAdeganK5B7 = SUB_BAB_K5B7.flatMap((s) => s.videos.flatMap((v) => v.adegan));
