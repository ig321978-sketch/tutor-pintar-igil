/**
 * Naskah Matematika Kelas 5 Bab 6 — Sudut (mendalam + metode luar berlabel).
 * Sumber buku: Kemendikbudristek Bab 6 hlm. 163–189.
 * Satu sumber: buat-k5-bab6.mjs → kelas5-bab6.json. Tanpa React/jaringan.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K5B6_META = {
  "chapterId": "k5-mat-bab6",
  "phaseCode": "FASE_C",
  "grade": 5,
  "subjectLabel": "MATEMATIKA - KELAS 5 SD",
  "title": "BAB 6: SUDUT",
  "silabusElemen": "🌈 Fase C • Elemen Geometri: Sudut — Siku-Siku, Pengertian & Jenis, Mengukur, dan Melukis (Kelas 5 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A56: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Sudut Siku-Siku)",
  "fullTitle": "Sub-Bab A: Sudut Siku-Siku",
  "targetDescription": "Siswa mengenali sudut siku-siku di lingkungan, membuat patokan 90° dari lipatan kertas, dan membandingkan sudut temuan dengan Right Angle Benchmark sesuai Buku Siswa Kelas V Bab 6 Sub-Bab A hlm. 166–169.",
  "secondaryBg": "#FFEDD5",
  "secondaryBorder": "#EA580C",
  "secondaryText": "#7C2D12",
  "silabus": {
    "teksSuara": "Kita jadi detektif sudut. Pojok bingkai foto yang benar membentuk sudut siku-siku. Tukang kayu memakai penggaris siku. Kita lipat kertas untuk membuat patokan sembilan puluh derajat. METODE LUAR Right Angle Benchmark, Paper Fold Benchmark, dan Angle Detective. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menemukan dan mengidentifikasi sudut siku-siku di sekitar serta memakai patokan 90°.",
    "referensi": "Buku Siswa Matematika Kelas V Bab 6 Sub-Bab A hlm. 166–169; METODE LUAR · Right Angle Benchmark; Paper Fold Benchmark; Angle Detective."
  },
  "videos": [
    {
      "id": "K5B6A-V1",
      "judul": "Pojok Bingkai Siku",
      "subjudul": "Benchmark",
      "adegan": [
        {
          "id": "K5B6A-V1-1",
          "judul": "Bingkai foto",
          "ketukan": [
            "Perhatikan pojok bingkai foto di rumah atau sekolah.",
            "Pojok yang dibuat benar membentuk sudut siku-siku.",
            "Tukang kayu memakai penggaris siku-siku agar pojok tepat.",
            "METODE LUAR · Right Angle Benchmark: sembilan puluh derajat jadi patokan."
          ],
          "papan": [
            "pojok bingkai",
            "siku-siku",
            "penggaris siku",
            "patokan 90°"
          ]
        },
        {
          "id": "K5B6A-V1-2",
          "judul": "Apa itu siku",
          "ketukan": [
            "Sudut siku-siku terasa 'tepat siku', tidak lancip dan tidak tumpul.",
            "Nanti kita ukur: besarnya sembilan puluh derajat.",
            "Sekarang cukup bandingkan dengan patokan.",
            "Jika cocok dengan penggaris siku, itu siku-siku."
          ],
          "papan": [
            "tepat siku",
            "nanti 90°",
            "banding patokan",
            "cocok = siku"
          ]
        },
        {
          "id": "K5B6A-V1-3",
          "judul": "Di sekitar kita",
          "ketukan": [
            "Pojok buku, pojok meja, sudut ubin, sering siku-siku.",
            "Tapi tidak semua pojok otomatis siku.",
            "Kita harus memeriksa.",
            "Itulah kerja detektif sudut."
          ],
          "papan": [
            "meja & buku",
            "tidak otomatis",
            "harus cek",
            "detektif"
          ]
        }
      ]
    },
    {
      "id": "K5B6A-V2",
      "judul": "Detektif & Lipatan",
      "subjudul": "Paper Fold",
      "adegan": [
        {
          "id": "K5B6A-V2-1",
          "judul": "Main peran",
          "ketukan": [
            "Eksplorasi 6.1: kalian jadi Detektif Sudut berkelompok.",
            "Tugas: temukan sebanyak mungkin sudut di sekitar.",
            "Lalu tentukan: siku-siku atau bukan.",
            "METODE LUAR · Angle Detective."
          ],
          "papan": [
            "Eksplorasi 6.1",
            "cari sudut",
            "siku/bukan",
            "Angle Detective"
          ]
        },
        {
          "id": "K5B6A-V2-2",
          "judul": "Lipat kertas",
          "ketukan": [
            "Ambil selembar kertas. Lipat hingga terbentuk sudut patokan.",
            "Sudut berwarna pada gambar buku adalah sudut siku-siku.",
            "METODE LUAR · Paper Fold Benchmark.",
            "Patokan ini dipakai untuk memeriksa sudut lain."
          ],
          "papan": [
            "lipat kertas",
            "sudut patokan",
            "Paper Fold",
            "untuk memeriksa"
          ]
        },
        {
          "id": "K5B6A-V2-3",
          "judul": "Cara cek",
          "ketukan": [
            "Tempelkan atau bandingkan patokan lipatan ke sudut temuan.",
            "Jika berimpit rapi, sudut itu siku-siku.",
            "Jika lebih sempit: lancip. Jika lebih lebar: tumpul.",
            "Catat di tabel detektif."
          ],
          "papan": [
            "bandingkan",
            "berimpit = siku",
            "sempit/lebar",
            "catat tabel"
          ]
        }
      ]
    },
    {
      "id": "K5B6A-V3",
      "judul": "Latihan Siku",
      "subjudul": "Ayo cek",
      "adegan": [
        {
          "id": "K5B6A-V3-1",
          "judul": "Bangun datar",
          "ketukan": [
            "Hitung banyak sudut siku pada bangun latihan buku.",
            "Persegi dan persegi panjang punya empat sudut siku.",
            "Segitiga siku-siku punya satu.",
            "Jangan menebak tanpa memeriksa."
          ],
          "papan": [
            "hitung siku",
            "PP: 4 siku",
            "segitiga siku: 1",
            "cek dulu"
          ]
        },
        {
          "id": "K5B6A-V3-2",
          "judul": "Ingat patokan",
          "ketukan": [
            "Siku-siku = sembilan puluh derajat.",
            "Patokan lipatan dan penggaris siku menolong sebelum ada busur.",
            "Nanti di Sub-Bab C kita ukur dengan busur derajat.",
            "Siap bermain permainan sudut!"
          ],
          "papan": [
            "= 90°",
            "patokan dulu",
            "busur nanti",
            "main"
          ]
        },
        {
          "id": "K5B6A-V3-3",
          "judul": "Siap B",
          "ketukan": [
            "Kita sudah punya mata detektif untuk siku-siku.",
            "Berikutnya: apa sebenarnya sudut, kaki sudut, titik sudut.",
            "Lalu kelompokkan lancip dan tumpul.",
            "Ayo Sub-Bab B!"
          ],
          "papan": [
            "detektif siap",
            "pengertian",
            "lancip/tumpul",
            "lanjut B"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Cari sudut",
      "stepDesc": "Baca soal Sudut Siku-Siku dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Di sekitar kita Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa mengenali sudut siku-siku di lingkungan, membuat patokan 90° dari lipatan kertas, dan membandingkan sudut temuan d….",
      "icon": "🔍",
      "flowFrom": "Cari sudut",
      "flowTo": "Buat patokan"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Buat patokan",
      "stepDesc": "Lipat kertas 90°. Pada Sudut Siku-Siku, langkah “Buat patokan” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "📄",
      "flowFrom": "Buat patokan",
      "flowTo": "Bandingkan"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Bandingkan",
      "stepDesc": "Cocok patokan?. Pada Sudut Siku-Siku, langkah “Bandingkan” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "⚖️",
      "flowFrom": "Bandingkan",
      "flowTo": "Siku?"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Siku?",
      "stepDesc": "Ya = 90°. Pada Sudut Siku-Siku, langkah “Siku?” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "✅",
      "flowFrom": "Siku?",
      "flowTo": "Catat"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Catat",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Sudut Siku-Siku. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "📋",
      "flowFrom": "Catat",
      "flowTo": "Pakai alat"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Pakai alat",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Sudut Siku-Siku. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "📐",
      "flowFrom": "Pakai alat",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Siku-siku",
      "emoji": "∟",
      "countNum": 90,
      "countWord": "90°",
      "suara": "Benchmark."
    },
    {
      "judul": "Bingkai",
      "emoji": "🖼️",
      "countNum": 1,
      "countWord": "pojok siku",
      "suara": "Konteks."
    },
    {
      "judul": "Penggaris siku",
      "emoji": "📐",
      "countNum": 1,
      "countWord": "alat tukang",
      "suara": "Cek pojok."
    },
    {
      "judul": "Lipat kertas",
      "emoji": "📄",
      "countNum": 1,
      "countWord": "Paper Fold",
      "suara": "Patokan."
    },
    {
      "judul": "Detektif",
      "emoji": "🕵️",
      "countNum": 1,
      "countWord": "cari & cek",
      "suara": "Angle Detective."
    },
    {
      "judul": "Cocok",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "berimpit = siku",
      "suara": "Uji."
    },
    {
      "judul": "Lebih sempit",
      "emoji": "∕",
      "countNum": 1,
      "countWord": "lancip",
      "suara": "Nanti B."
    },
    {
      "judul": "Lebih lebar",
      "emoji": "∠",
      "countNum": 1,
      "countWord": "tumpul",
      "suara": "Nanti B."
    },
    {
      "judul": "Metode",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "3 label luar",
      "suara": "Benchmark·Fold·Detective."
    },
    {
      "judul": "Siap B",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "pengertian",
      "suara": "Lanjut."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-a-c",
      "title": "Hitung 90°",
      "bookReference": "hlm. 166–169",
      "objective": "Kenali sudut siku-siku dengan Right Angle Benchmark dan Paper Fold.",
      "mechanicDescription": "Tiga ronde: patokan 90°, detektif sudut, pilah siku/bukan.",
      "voiceGuide": "Pilih 90° atau jawaban terkait siku-siku.",
      "emoji": "∟",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-a-c",
      "title": "Arti Siku-Siku",
      "bookReference": "hlm. 166–169",
      "objective": "Kenali sudut siku-siku dengan Right Angle Benchmark dan Paper Fold.",
      "mechanicDescription": "Tiga ronde: patokan 90°, detektif sudut, pilah siku/bukan.",
      "voiceGuide": "Pilih 90° atau jawaban terkait siku-siku.",
      "emoji": "∟",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-a-c",
      "title": "Pilih Definisi",
      "bookReference": "hlm. 166–169",
      "objective": "Kenali sudut siku-siku dengan Right Angle Benchmark dan Paper Fold.",
      "mechanicDescription": "Tiga ronde: patokan 90°, detektif sudut, pilah siku/bukan.",
      "voiceGuide": "Pilih 90° atau jawaban terkait siku-siku.",
      "emoji": "∟",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-a-c",
      "title": "Pilah Siku/Bukan",
      "bookReference": "hlm. 166–169",
      "objective": "Kenali sudut siku-siku dengan Right Angle Benchmark dan Paper Fold.",
      "mechanicDescription": "Tiga ronde: patokan 90°, detektif sudut, pilah siku/bukan.",
      "voiceGuide": "Pilih 90° atau jawaban terkait siku-siku.",
      "emoji": "∟",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-a-c",
      "title": "Jodohkan Patokan",
      "bookReference": "hlm. 166–169",
      "objective": "Kenali sudut siku-siku dengan Right Angle Benchmark dan Paper Fold.",
      "mechanicDescription": "Tiga ronde: patokan 90°, detektif sudut, pilah siku/bukan.",
      "voiceGuide": "Pilih 90° atau jawaban terkait siku-siku.",
      "emoji": "∟",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-a-c",
      "title": "Memori Siku",
      "bookReference": "hlm. 166–169",
      "objective": "Kenali sudut siku-siku dengan Right Angle Benchmark dan Paper Fold.",
      "mechanicDescription": "Tiga ronde: patokan 90°, detektif sudut, pilah siku/bukan.",
      "voiceGuide": "Pilih 90° atau jawaban terkait siku-siku.",
      "emoji": "∟",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-a-c",
      "title": "Ketuk 90°",
      "bookReference": "hlm. 166–169",
      "objective": "Kenali sudut siku-siku dengan Right Angle Benchmark dan Paper Fold.",
      "mechanicDescription": "Tiga ronde: patokan 90°, detektif sudut, pilah siku/bukan.",
      "voiceGuide": "Pilih 90° atau jawaban terkait siku-siku.",
      "emoji": "∟",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-a-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 166–169",
      "objective": "Kenali sudut siku-siku dengan Right Angle Benchmark dan Paper Fold.",
      "mechanicDescription": "Tiga ronde: patokan 90°, detektif sudut, pilah siku/bukan.",
      "voiceGuide": "Pilih 90° atau jawaban terkait siku-siku.",
      "emoji": "∟",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-a-c",
      "title": "Cerita Detektif",
      "bookReference": "hlm. 166–169",
      "objective": "Kenali sudut siku-siku dengan Right Angle Benchmark dan Paper Fold.",
      "mechanicDescription": "Tiga ronde: patokan 90°, detektif sudut, pilah siku/bukan.",
      "voiceGuide": "Pilih 90° atau jawaban terkait siku-siku.",
      "emoji": "∟",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-a-c",
      "title": "Urutkan Derajat",
      "bookReference": "hlm. 166–169",
      "objective": "Kenali sudut siku-siku dengan Right Angle Benchmark dan Paper Fold.",
      "mechanicDescription": "Tiga ronde: patokan 90°, detektif sudut, pilah siku/bukan.",
      "voiceGuide": "Pilih 90° atau jawaban terkait siku-siku.",
      "emoji": "∟",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-a-p",
      "title": "Diagram Hitung 90°",
      "bookReference": "hlm. 166–169",
      "objective": "Kenali sudut siku-siku dengan Right Angle Benchmark dan Paper Fold.",
      "mechanicDescription": "Tiga ronde: patokan 90°, detektif sudut, pilah siku/bukan.",
      "voiceGuide": "Pilih 90° atau jawaban terkait siku-siku.",
      "diagramType": "hitung",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "rumus-a-p",
      "title": "Diagram Arti Siku-Siku",
      "bookReference": "hlm. 166–169",
      "objective": "Kenali sudut siku-siku dengan Right Angle Benchmark dan Paper Fold.",
      "mechanicDescription": "Tiga ronde: patokan 90°, detektif sudut, pilah siku/bukan.",
      "voiceGuide": "Pilih 90° atau jawaban terkait siku-siku.",
      "diagramType": "rumus",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "arti-a-p",
      "title": "Diagram Pilih Definisi",
      "bookReference": "hlm. 166–169",
      "objective": "Kenali sudut siku-siku dengan Right Angle Benchmark dan Paper Fold.",
      "mechanicDescription": "Tiga ronde: patokan 90°, detektif sudut, pilah siku/bukan.",
      "voiceGuide": "Pilih 90° atau jawaban terkait siku-siku.",
      "diagramType": "arti",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sortir-a-p",
      "title": "Diagram Pilah Siku/Bukan",
      "bookReference": "hlm. 166–169",
      "objective": "Kenali sudut siku-siku dengan Right Angle Benchmark dan Paper Fold.",
      "mechanicDescription": "Tiga ronde: patokan 90°, detektif sudut, pilah siku/bukan.",
      "voiceGuide": "Pilih 90° atau jawaban terkait siku-siku.",
      "diagramType": "sortir",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-a-p",
      "title": "Diagram Jodohkan Patokan",
      "bookReference": "hlm. 166–169",
      "objective": "Kenali sudut siku-siku dengan Right Angle Benchmark dan Paper Fold.",
      "mechanicDescription": "Tiga ronde: patokan 90°, detektif sudut, pilah siku/bukan.",
      "voiceGuide": "Pilih 90° atau jawaban terkait siku-siku.",
      "diagramType": "jodoh",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memori-a-p",
      "title": "Diagram Memori Siku",
      "bookReference": "hlm. 166–169",
      "objective": "Kenali sudut siku-siku dengan Right Angle Benchmark dan Paper Fold.",
      "mechanicDescription": "Tiga ronde: patokan 90°, detektif sudut, pilah siku/bukan.",
      "voiceGuide": "Pilih 90° atau jawaban terkait siku-siku.",
      "diagramType": "memori",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-a-p",
      "title": "Diagram Ketuk 90°",
      "bookReference": "hlm. 166–169",
      "objective": "Kenali sudut siku-siku dengan Right Angle Benchmark dan Paper Fold.",
      "mechanicDescription": "Tiga ronde: patokan 90°, detektif sudut, pilah siku/bukan.",
      "voiceGuide": "Pilih 90° atau jawaban terkait siku-siku.",
      "diagramType": "ketuk",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "semua-a-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 166–169",
      "objective": "Kenali sudut siku-siku dengan Right Angle Benchmark dan Paper Fold.",
      "mechanicDescription": "Tiga ronde: patokan 90°, detektif sudut, pilah siku/bukan.",
      "voiceGuide": "Pilih 90° atau jawaban terkait siku-siku.",
      "diagramType": "semua",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "cerita-a-p",
      "title": "Diagram Cerita Detektif",
      "bookReference": "hlm. 166–169",
      "objective": "Kenali sudut siku-siku dengan Right Angle Benchmark dan Paper Fold.",
      "mechanicDescription": "Tiga ronde: patokan 90°, detektif sudut, pilah siku/bukan.",
      "voiceGuide": "Pilih 90° atau jawaban terkait siku-siku.",
      "diagramType": "cerita",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "urut-a-p",
      "title": "Diagram Urutkan Derajat",
      "bookReference": "hlm. 166–169",
      "objective": "Kenali sudut siku-siku dengan Right Angle Benchmark dan Paper Fold.",
      "mechanicDescription": "Tiga ronde: patokan 90°, detektif sudut, pilah siku/bukan.",
      "voiceGuide": "Pilih 90° atau jawaban terkait siku-siku.",
      "diagramType": "urut",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-a-a",
      "title": "Tulis Hitung 90°",
      "bookReference": "hlm. 166–169",
      "objective": "Kenali sudut siku-siku dengan Right Angle Benchmark dan Paper Fold.",
      "mechanicDescription": "Tiga ronde: patokan 90°, detektif sudut, pilah siku/bukan.",
      "voiceGuide": "Pilih 90° atau jawaban terkait siku-siku.",
      "symbolLarge": "∠",
      "wordLarge": "SUDUT",
      "mathNotation": "derajat"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-a-a",
      "title": "Tulis Arti Siku-Siku",
      "bookReference": "hlm. 166–169",
      "objective": "Kenali sudut siku-siku dengan Right Angle Benchmark dan Paper Fold.",
      "mechanicDescription": "Tiga ronde: patokan 90°, detektif sudut, pilah siku/bukan.",
      "voiceGuide": "Pilih 90° atau jawaban terkait siku-siku.",
      "symbolLarge": "∠",
      "wordLarge": "SUDUT",
      "mathNotation": "derajat"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-a-a",
      "title": "Tulis Pilih Definisi",
      "bookReference": "hlm. 166–169",
      "objective": "Kenali sudut siku-siku dengan Right Angle Benchmark dan Paper Fold.",
      "mechanicDescription": "Tiga ronde: patokan 90°, detektif sudut, pilah siku/bukan.",
      "voiceGuide": "Pilih 90° atau jawaban terkait siku-siku.",
      "symbolLarge": "∠",
      "wordLarge": "SUDUT",
      "mathNotation": "derajat"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-a-a",
      "title": "Tulis Pilah Siku/Bukan",
      "bookReference": "hlm. 166–169",
      "objective": "Kenali sudut siku-siku dengan Right Angle Benchmark dan Paper Fold.",
      "mechanicDescription": "Tiga ronde: patokan 90°, detektif sudut, pilah siku/bukan.",
      "voiceGuide": "Pilih 90° atau jawaban terkait siku-siku.",
      "symbolLarge": "∠",
      "wordLarge": "SUDUT",
      "mathNotation": "derajat"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-a-a",
      "title": "Tulis Jodohkan Patokan",
      "bookReference": "hlm. 166–169",
      "objective": "Kenali sudut siku-siku dengan Right Angle Benchmark dan Paper Fold.",
      "mechanicDescription": "Tiga ronde: patokan 90°, detektif sudut, pilah siku/bukan.",
      "voiceGuide": "Pilih 90° atau jawaban terkait siku-siku.",
      "symbolLarge": "∠",
      "wordLarge": "SUDUT",
      "mathNotation": "derajat"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-a-a",
      "title": "Tulis Memori Siku",
      "bookReference": "hlm. 166–169",
      "objective": "Kenali sudut siku-siku dengan Right Angle Benchmark dan Paper Fold.",
      "mechanicDescription": "Tiga ronde: patokan 90°, detektif sudut, pilah siku/bukan.",
      "voiceGuide": "Pilih 90° atau jawaban terkait siku-siku.",
      "symbolLarge": "∠",
      "wordLarge": "SUDUT",
      "mathNotation": "derajat"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-a",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 166–169",
      "objective": "Kenali sudut siku-siku dengan Right Angle Benchmark dan Paper Fold.",
      "mechanicDescription": "Dua ronde menilai pernyataan.",
      "voiceGuide": "Benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-a",
      "title": "Detektif Sudut",
      "bookReference": "hlm. 166–169",
      "objective": "Kenali sudut siku-siku dengan Right Angle Benchmark dan Paper Fold.",
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
      "bookReference": "hlm. 166–169",
      "objective": "Kenali sudut siku-siku dengan Right Angle Benchmark dan Paper Fold.",
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
      "bookReference": "hlm. 166–169",
      "objective": "Kenali sudut siku-siku dengan Right Angle Benchmark dan Paper Fold.",
      "mechanicDescription": "Tiga ronde cerita.",
      "voiceGuide": "Baca lalu pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "∟",
      "nama": "Ukuran",
      "isi": "Sudut siku-siku = 90°.",
      "suara": "Right Angle Benchmark."
    },
    {
      "ikon": "📄",
      "nama": "Lipat",
      "isi": "Lipatan kertas jadi patokan siku (Paper Fold Benchmark).",
      "suara": "Eksplorasi 6.1."
    },
    {
      "ikon": "🕵️",
      "nama": "Detektif",
      "isi": "Temukan sudut, bandingkan dengan patokan.",
      "suara": "Angle Detective."
    },
    {
      "ikon": "📐",
      "nama": "Alat",
      "isi": "Penggaris siku memastikan pojok bingkai tepat.",
      "suara": "Konteks tukang kayu."
    }
  ],
  "poinSuara": "Ingat: siku-siku sembilan puluh derajat, buat patokan lipatan, lalu cek sudut di sekitar.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Cari sudut",
        "warna": "#FDE68A"
      },
      {
        "teks": "buat patokan lipat",
        "warna": "#BBF7D0"
      },
      {
        "teks": "bandingkan",
        "warna": "#BFDBFE"
      },
      {
        "teks": "catat siku/bukan",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: lipat kertas jadi patokan siku, lalu periksa empat pojok sebuah bingkai atau buku.",
  "refleksi": [
    "Berapa derajat sudut siku-siku?",
    "Mengapa tukang kayu butuh penggaris siku?",
    "Bagaimana Paper Fold Benchmark membantu?"
  ]
};
export const SUB_B56: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Pengertian Sudut)",
  "fullTitle": "Sub-Bab B: Pengertian dan Jenis Sudut",
  "targetDescription": "Siswa menjelaskan sudut sebagai daerah dua garis bertemu di titik sudut, menyebut kaki sudut, serta mengelompokkan lancip, siku-siku, dan tumpul (Acute-Right-Obtuse) sesuai Buku Siswa Kelas V Bab 6 Sub-Bab B hlm. 170–174.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Apa itu sudut? Daerah yang dibentuk dua garis bertemu di satu titik. Titik itu titik sudut. Dua garis itu kaki sudut. Lebih kecil dari siku disebut lancip. Lebih besar dari siku sampai sebelum seratus delapan puluh disebut tumpul. METODE LUAR Vertex-Ray Model dan Acute-Right-Obtuse Classification. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menjelaskan bagian-bagian sudut dan mengelompokkan jenis sudut lancip, siku-siku, dan tumpul.",
    "referensi": "Buku Siswa Matematika Kelas V Bab 6 Sub-Bab B hlm. 170–174; METODE LUAR · Vertex-Ray Model; Acute-Right-Obtuse Classification."
  },
  "videos": [
    {
      "id": "K5B6B-V1",
      "judul": "Apa Itu Sudut?",
      "subjudul": "Vertex-Ray",
      "adegan": [
        {
          "id": "K5B6B-V1-1",
          "judul": "Definisi",
          "ketukan": [
            "Sudut adalah daerah yang dibentuk oleh dua buah garis yang bertemu di satu titik.",
            "Titik pertemuan dinamakan titik sudut.",
            "Dua garis pembentuk disebut kaki sudut.",
            "METODE LUAR · Vertex-Ray Model: titik sudut plus dua sinar."
          ],
          "papan": [
            "definisi",
            "titik sudut",
            "kaki sudut",
            "Vertex-Ray"
          ]
        },
        {
          "id": "K5B6B-V1-2",
          "judul": "Kotak pensil",
          "ketukan": [
            "Yohana bertanya: pojok kotak pensil termasuk sudut?",
            "Jika tidak terlihat titik sudut yang jelas sebagai temu dua kaki, perlu hati-hati.",
            "Yang penting: kenali titik dan dua kaki.",
            "Jangan hanya bilang 'pojokan' tanpa bagian sudut."
          ],
          "papan": [
            "pojok pensil?",
            "perlu titik jelas",
            "titik+2 kaki",
            "hati-hati"
          ]
        },
        {
          "id": "K5B6B-V1-3",
          "judul": "Gambar bagian",
          "ketukan": [
            "Bayangkan huruf V atau dua jarum jam dari pusat.",
            "Pusat = titik sudut. Jarum = kaki sudut.",
            "Daerah di antara jarum itulah sudut.",
            "Siap mengelompokkan jenisnya."
          ],
          "papan": [
            "seperti V",
            "pusat=titik",
            "daerah di antara",
            "jenis berikutnya"
          ]
        }
      ]
    },
    {
      "id": "K5B6B-V2",
      "judul": "Lancip, Siku, Tumpul",
      "subjudul": "Klasifikasi",
      "adegan": [
        {
          "id": "K5B6B-V2-1",
          "judul": "Tiga kelompok",
          "ketukan": [
            "Tabel 6.3: lebih kecil dari siku, tepat siku, lebih besar dari siku.",
            "Lebih kecil = sudut lancip.",
            "Lebih besar (kurang dari seratus delapan puluh) = sudut tumpul.",
            "METODE LUAR · Acute-Right-Obtuse Classification."
          ],
          "papan": [
            "tiga kelompok",
            "lancip <90°",
            "tumpul >90°",
            "Acute-Right-Obtuse"
          ]
        },
        {
          "id": "K5B6B-V2-2",
          "judul": "Contoh benda",
          "ketukan": [
            "Jam pukul delapan: jarum bisa membentuk sudut lancip atau tumpul tergantung posisi.",
            "Persimpangan jalan, tangga, gunting, kipas, jendela: beda jenis.",
            "Kamu pilih lancip, siku, atau tumpul dengan membandingkan ke 90°.",
            "Pakai patokan Sub-Bab A."
          ],
          "papan": [
            "jam & jalan",
            "gunting & kipas",
            "banding 90°",
            "pakai patokan"
          ]
        },
        {
          "id": "K5B6B-V2-3",
          "judul": "Jam analog",
          "ketukan": [
            "Pada pukul dua, jarum pendek dan panjang membentuk sudut lancip.",
            "Kamu bisa menggambar sudut lancip dan tumpul lain dari jarum jam.",
            "Ini latihan klasifikasi tanpa busur dulu.",
            "Nanti busur memperkuat ukuran pastinya."
          ],
          "papan": [
            "pukul 02.00",
            "lancip",
            "gambar jarum",
            "busur nanti"
          ]
        }
      ]
    },
    {
      "id": "K5B6B-V3",
      "judul": "Latihan Jenis",
      "subjudul": "Cek paham",
      "adegan": [
        {
          "id": "K5B6B-V3-1",
          "judul": "Cepat klasifikasi",
          "ketukan": [
            "45 derajat: lancip. 90: siku. 120: tumpul.",
            "Ingat batas: lancip di bawah sembilan puluh, tumpul di atas sembilan puluh sebelum seratus delapan puluh.",
            "Jangan bilang tumpul untuk sudut releks.",
            "Releks dibahas di Sub-Bab C."
          ],
          "papan": [
            "45/90/120",
            "batas jelas",
            "bukan releks dulu",
            "C menyusul"
          ]
        },
        {
          "id": "K5B6B-V3-2",
          "judul": "Bagian wajib",
          "ketukan": [
            "Sebutkan selalu: titik sudut dan dua kaki sudut.",
            "Tanpa itu, 'pojokan' belum lengkap sebagai sudut.",
            "Vertex-Ray Model menjaga bahasa tepat.",
            "Siap ukur dengan busur!"
          ],
          "papan": [
            "titik+kaki",
            "bahasa tepat",
            "Vertex-Ray",
            "siap ukur"
          ]
        },
        {
          "id": "K5B6B-V3-3",
          "judul": "Siap C",
          "ketukan": [
            "Pengertian dan jenis siap.",
            "Berikutnya Tari Pakarena dan kipas: bandingkan lebar buka.",
            "Satuan derajat dan busur derajat.",
            "Ayo Sub-Bab C!"
          ],
          "papan": [
            "B siap",
            "Pakarena",
            "derajat & busur",
            "lanjut C"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Titik sudut",
      "stepDesc": "Baca soal Pengertian dan Jenis Sudut dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Temu dua kaki Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa menjelaskan sudut sebagai daerah dua garis bertemu di titik sudut, menyebut kaki sudut, serta mengelompokkan lanci….",
      "icon": "•",
      "flowFrom": "Titik sudut",
      "flowTo": "Kaki sudut"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Kaki sudut",
      "stepDesc": "Dua garis/sinar. Pada Pengertian dan Jenis Sudut, langkah “Kaki sudut” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "／",
      "flowFrom": "Kaki sudut",
      "flowTo": "Daerah sudut"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Daerah sudut",
      "stepDesc": "Di antara kaki. Pada Pengertian dan Jenis Sudut, langkah “Daerah sudut” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "∠",
      "flowFrom": "Daerah sudut",
      "flowTo": "Banding 90°"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Banding 90°",
      "stepDesc": "Patokan siku. Pada Pengertian dan Jenis Sudut, langkah “Banding 90°” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "∟",
      "flowFrom": "Banding 90°",
      "flowTo": "Lancip/Tumpul"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Lancip/Tumpul",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Pengertian dan Jenis Sudut. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "📊",
      "flowFrom": "Lancip/Tumpul",
      "flowTo": "Contoh"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Contoh",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Pengertian dan Jenis Sudut. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "🕐",
      "flowFrom": "Contoh",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Definisi",
      "emoji": "∠",
      "countNum": 1,
      "countWord": "2 garis+titik",
      "suara": "Vertex-Ray."
    },
    {
      "judul": "Titik sudut",
      "emoji": "•",
      "countNum": 1,
      "countWord": "titik temu",
      "suara": "Bagian."
    },
    {
      "judul": "Kaki sudut",
      "emoji": "／",
      "countNum": 2,
      "countWord": "dua kaki",
      "suara": "Bagian."
    },
    {
      "judul": "Lancip",
      "emoji": "∕",
      "countNum": 45,
      "countWord": "< 90°",
      "suara": "Acute."
    },
    {
      "judul": "Siku",
      "emoji": "∟",
      "countNum": 90,
      "countWord": "= 90°",
      "suara": "Right."
    },
    {
      "judul": "Tumpul",
      "emoji": "∠",
      "countNum": 120,
      "countWord": ">90° <180°",
      "suara": "Obtuse."
    },
    {
      "judul": "Jam 02.00",
      "emoji": "🕐",
      "countNum": 1,
      "countWord": "contoh lancip",
      "suara": "Buku."
    },
    {
      "judul": "Tabel 6.3",
      "emoji": "📋",
      "countNum": 3,
      "countWord": "3 kelompok",
      "suara": "Klasifikasi."
    },
    {
      "judul": "Metode",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "2 label luar",
      "suara": "Vertex-Ray·ARO."
    },
    {
      "judul": "Siap C",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "ukur derajat",
      "suara": "Lanjut."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-b-c",
      "title": "Hitung Derajat Jenis",
      "bookReference": "hlm. 170–174",
      "objective": "Jelaskan bagian sudut dan klasifikasi lancip–siku–tumpul.",
      "mechanicDescription": "Tiga ronde Vertex-Ray dan Acute-Right-Obtuse.",
      "voiceGuide": "Pilih jenis atau bagian sudut yang tepat.",
      "emoji": "∠",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-b-c",
      "title": "Pilih Jenis Sudut",
      "bookReference": "hlm. 170–174",
      "objective": "Jelaskan bagian sudut dan klasifikasi lancip–siku–tumpul.",
      "mechanicDescription": "Tiga ronde Vertex-Ray dan Acute-Right-Obtuse.",
      "voiceGuide": "Pilih jenis atau bagian sudut yang tepat.",
      "emoji": "∠",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-b-c",
      "title": "Arti Bagian Sudut",
      "bookReference": "hlm. 170–174",
      "objective": "Jelaskan bagian sudut dan klasifikasi lancip–siku–tumpul.",
      "mechanicDescription": "Tiga ronde Vertex-Ray dan Acute-Right-Obtuse.",
      "voiceGuide": "Pilih jenis atau bagian sudut yang tepat.",
      "emoji": "∠",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-b-c",
      "title": "Pilah Lancip/Tumpul",
      "bookReference": "hlm. 170–174",
      "objective": "Jelaskan bagian sudut dan klasifikasi lancip–siku–tumpul.",
      "mechanicDescription": "Tiga ronde Vertex-Ray dan Acute-Right-Obtuse.",
      "voiceGuide": "Pilih jenis atau bagian sudut yang tepat.",
      "emoji": "∠",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-b-c",
      "title": "Jodohkan Istilah",
      "bookReference": "hlm. 170–174",
      "objective": "Jelaskan bagian sudut dan klasifikasi lancip–siku–tumpul.",
      "mechanicDescription": "Tiga ronde Vertex-Ray dan Acute-Right-Obtuse.",
      "voiceGuide": "Pilih jenis atau bagian sudut yang tepat.",
      "emoji": "∠",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-b-c",
      "title": "Memori Jenis",
      "bookReference": "hlm. 170–174",
      "objective": "Jelaskan bagian sudut dan klasifikasi lancip–siku–tumpul.",
      "mechanicDescription": "Tiga ronde Vertex-Ray dan Acute-Right-Obtuse.",
      "voiceGuide": "Pilih jenis atau bagian sudut yang tepat.",
      "emoji": "∠",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-b-c",
      "title": "Ketuk Derajat",
      "bookReference": "hlm. 170–174",
      "objective": "Jelaskan bagian sudut dan klasifikasi lancip–siku–tumpul.",
      "mechanicDescription": "Tiga ronde Vertex-Ray dan Acute-Right-Obtuse.",
      "voiceGuide": "Pilih jenis atau bagian sudut yang tepat.",
      "emoji": "∠",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-b-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 170–174",
      "objective": "Jelaskan bagian sudut dan klasifikasi lancip–siku–tumpul.",
      "mechanicDescription": "Tiga ronde Vertex-Ray dan Acute-Right-Obtuse.",
      "voiceGuide": "Pilih jenis atau bagian sudut yang tepat.",
      "emoji": "∠",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-b-c",
      "title": "Cerita Jam & Benda",
      "bookReference": "hlm. 170–174",
      "objective": "Jelaskan bagian sudut dan klasifikasi lancip–siku–tumpul.",
      "mechanicDescription": "Tiga ronde Vertex-Ray dan Acute-Right-Obtuse.",
      "voiceGuide": "Pilih jenis atau bagian sudut yang tepat.",
      "emoji": "∠",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-b-c",
      "title": "Urutkan Derajat",
      "bookReference": "hlm. 170–174",
      "objective": "Jelaskan bagian sudut dan klasifikasi lancip–siku–tumpul.",
      "mechanicDescription": "Tiga ronde Vertex-Ray dan Acute-Right-Obtuse.",
      "voiceGuide": "Pilih jenis atau bagian sudut yang tepat.",
      "emoji": "∠",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-b-p",
      "title": "Diagram Hitung Derajat Jenis",
      "bookReference": "hlm. 170–174",
      "objective": "Jelaskan bagian sudut dan klasifikasi lancip–siku–tumpul.",
      "mechanicDescription": "Tiga ronde Vertex-Ray dan Acute-Right-Obtuse.",
      "voiceGuide": "Pilih jenis atau bagian sudut yang tepat.",
      "diagramType": "hitung",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "rumus-b-p",
      "title": "Diagram Pilih Jenis Sudut",
      "bookReference": "hlm. 170–174",
      "objective": "Jelaskan bagian sudut dan klasifikasi lancip–siku–tumpul.",
      "mechanicDescription": "Tiga ronde Vertex-Ray dan Acute-Right-Obtuse.",
      "voiceGuide": "Pilih jenis atau bagian sudut yang tepat.",
      "diagramType": "rumus",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "arti-b-p",
      "title": "Diagram Arti Bagian Sudut",
      "bookReference": "hlm. 170–174",
      "objective": "Jelaskan bagian sudut dan klasifikasi lancip–siku–tumpul.",
      "mechanicDescription": "Tiga ronde Vertex-Ray dan Acute-Right-Obtuse.",
      "voiceGuide": "Pilih jenis atau bagian sudut yang tepat.",
      "diagramType": "arti",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sortir-b-p",
      "title": "Diagram Pilah Lancip/Tumpul",
      "bookReference": "hlm. 170–174",
      "objective": "Jelaskan bagian sudut dan klasifikasi lancip–siku–tumpul.",
      "mechanicDescription": "Tiga ronde Vertex-Ray dan Acute-Right-Obtuse.",
      "voiceGuide": "Pilih jenis atau bagian sudut yang tepat.",
      "diagramType": "sortir",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-b-p",
      "title": "Diagram Jodohkan Istilah",
      "bookReference": "hlm. 170–174",
      "objective": "Jelaskan bagian sudut dan klasifikasi lancip–siku–tumpul.",
      "mechanicDescription": "Tiga ronde Vertex-Ray dan Acute-Right-Obtuse.",
      "voiceGuide": "Pilih jenis atau bagian sudut yang tepat.",
      "diagramType": "jodoh",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memori-b-p",
      "title": "Diagram Memori Jenis",
      "bookReference": "hlm. 170–174",
      "objective": "Jelaskan bagian sudut dan klasifikasi lancip–siku–tumpul.",
      "mechanicDescription": "Tiga ronde Vertex-Ray dan Acute-Right-Obtuse.",
      "voiceGuide": "Pilih jenis atau bagian sudut yang tepat.",
      "diagramType": "memori",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-b-p",
      "title": "Diagram Ketuk Derajat",
      "bookReference": "hlm. 170–174",
      "objective": "Jelaskan bagian sudut dan klasifikasi lancip–siku–tumpul.",
      "mechanicDescription": "Tiga ronde Vertex-Ray dan Acute-Right-Obtuse.",
      "voiceGuide": "Pilih jenis atau bagian sudut yang tepat.",
      "diagramType": "ketuk",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "semua-b-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 170–174",
      "objective": "Jelaskan bagian sudut dan klasifikasi lancip–siku–tumpul.",
      "mechanicDescription": "Tiga ronde Vertex-Ray dan Acute-Right-Obtuse.",
      "voiceGuide": "Pilih jenis atau bagian sudut yang tepat.",
      "diagramType": "semua",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "cerita-b-p",
      "title": "Diagram Cerita Jam & Benda",
      "bookReference": "hlm. 170–174",
      "objective": "Jelaskan bagian sudut dan klasifikasi lancip–siku–tumpul.",
      "mechanicDescription": "Tiga ronde Vertex-Ray dan Acute-Right-Obtuse.",
      "voiceGuide": "Pilih jenis atau bagian sudut yang tepat.",
      "diagramType": "cerita",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "urut-b-p",
      "title": "Diagram Urutkan Derajat",
      "bookReference": "hlm. 170–174",
      "objective": "Jelaskan bagian sudut dan klasifikasi lancip–siku–tumpul.",
      "mechanicDescription": "Tiga ronde Vertex-Ray dan Acute-Right-Obtuse.",
      "voiceGuide": "Pilih jenis atau bagian sudut yang tepat.",
      "diagramType": "urut",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-b-a",
      "title": "Tulis Hitung Derajat Jenis",
      "bookReference": "hlm. 170–174",
      "objective": "Jelaskan bagian sudut dan klasifikasi lancip–siku–tumpul.",
      "mechanicDescription": "Tiga ronde Vertex-Ray dan Acute-Right-Obtuse.",
      "voiceGuide": "Pilih jenis atau bagian sudut yang tepat.",
      "symbolLarge": "∠",
      "wordLarge": "SUDUT",
      "mathNotation": "derajat"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-b-a",
      "title": "Tulis Pilih Jenis Sudut",
      "bookReference": "hlm. 170–174",
      "objective": "Jelaskan bagian sudut dan klasifikasi lancip–siku–tumpul.",
      "mechanicDescription": "Tiga ronde Vertex-Ray dan Acute-Right-Obtuse.",
      "voiceGuide": "Pilih jenis atau bagian sudut yang tepat.",
      "symbolLarge": "∠",
      "wordLarge": "SUDUT",
      "mathNotation": "derajat"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-b-a",
      "title": "Tulis Arti Bagian Sudut",
      "bookReference": "hlm. 170–174",
      "objective": "Jelaskan bagian sudut dan klasifikasi lancip–siku–tumpul.",
      "mechanicDescription": "Tiga ronde Vertex-Ray dan Acute-Right-Obtuse.",
      "voiceGuide": "Pilih jenis atau bagian sudut yang tepat.",
      "symbolLarge": "∠",
      "wordLarge": "SUDUT",
      "mathNotation": "derajat"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-b-a",
      "title": "Tulis Pilah Lancip/Tumpul",
      "bookReference": "hlm. 170–174",
      "objective": "Jelaskan bagian sudut dan klasifikasi lancip–siku–tumpul.",
      "mechanicDescription": "Tiga ronde Vertex-Ray dan Acute-Right-Obtuse.",
      "voiceGuide": "Pilih jenis atau bagian sudut yang tepat.",
      "symbolLarge": "∠",
      "wordLarge": "SUDUT",
      "mathNotation": "derajat"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-b-a",
      "title": "Tulis Jodohkan Istilah",
      "bookReference": "hlm. 170–174",
      "objective": "Jelaskan bagian sudut dan klasifikasi lancip–siku–tumpul.",
      "mechanicDescription": "Tiga ronde Vertex-Ray dan Acute-Right-Obtuse.",
      "voiceGuide": "Pilih jenis atau bagian sudut yang tepat.",
      "symbolLarge": "∠",
      "wordLarge": "SUDUT",
      "mathNotation": "derajat"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-b-a",
      "title": "Tulis Memori Jenis",
      "bookReference": "hlm. 170–174",
      "objective": "Jelaskan bagian sudut dan klasifikasi lancip–siku–tumpul.",
      "mechanicDescription": "Tiga ronde Vertex-Ray dan Acute-Right-Obtuse.",
      "voiceGuide": "Pilih jenis atau bagian sudut yang tepat.",
      "symbolLarge": "∠",
      "wordLarge": "SUDUT",
      "mathNotation": "derajat"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-b",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 170–174",
      "objective": "Jelaskan bagian sudut dan klasifikasi lancip–siku–tumpul.",
      "mechanicDescription": "Dua ronde menilai pernyataan.",
      "voiceGuide": "Benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-b",
      "title": "Detektif Sudut",
      "bookReference": "hlm. 170–174",
      "objective": "Jelaskan bagian sudut dan klasifikasi lancip–siku–tumpul.",
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
      "bookReference": "hlm. 170–174",
      "objective": "Jelaskan bagian sudut dan klasifikasi lancip–siku–tumpul.",
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
      "bookReference": "hlm. 170–174",
      "objective": "Jelaskan bagian sudut dan klasifikasi lancip–siku–tumpul.",
      "mechanicDescription": "Tiga ronde cerita.",
      "voiceGuide": "Baca lalu pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "∠",
      "nama": "Definisi",
      "isi": "Sudut = daerah dua garis bertemu di titik sudut.",
      "suara": "Vertex-Ray Model."
    },
    {
      "ikon": "／",
      "nama": "Bagian",
      "isi": "Titik sudut + dua kaki sudut.",
      "suara": "Wajib disebut."
    },
    {
      "ikon": "∕",
      "nama": "Lancip",
      "isi": "Lebih kecil dari 90°.",
      "suara": "Acute."
    },
    {
      "ikon": "∠",
      "nama": "Tumpul",
      "isi": "Lebih besar dari 90° dan kurang dari 180°.",
      "suara": "Obtuse."
    }
  ],
  "poinSuara": "Ingat: titik sudut dan dua kaki, lancip di bawah sembilan puluh, tumpul di atas sembilan puluh sebelum seratus delapan puluh.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Kenali titik+kaki",
        "warna": "#FDE68A"
      },
      {
        "teks": "banding ke 90°",
        "warna": "#BBF7D0"
      },
      {
        "teks": "beri nama jenis",
        "warna": "#BFDBFE"
      },
      {
        "teks": "beri contoh",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: gambar jarum jam pada pukul berbeda, tandai mana lancip dan mana tumpul.",
  "refleksi": [
    "Apa itu titik sudut?",
    "Kapan sudut disebut tumpul?",
    "Mengapa jam 02.00 biasanya lancip?"
  ]
};
export const SUB_C56: SubBabNaskah = {
  "id": "C",
  "codeTitle": "Sub-Bab C (Mengukur Sudut)",
  "fullTitle": "Sub-Bab C: Mengukur dan Membandingkan Sudut",
  "targetDescription": "Siswa mengukur sudut dengan busur derajat dalam satuan derajat, membandingkan lebar kipas (Tari Pakarena), serta mengenal sudut nol, lurus, penuh, dan releks sesuai Buku Siswa Kelas V Bab 6 Sub-Bab C hlm. 175–182.",
  "secondaryBg": "#DCFCE7",
  "secondaryBorder": "#16A34A",
  "secondaryText": "#14532D",
  "silabus": {
    "teksSuara": "Kipas Tari Pakarena terbuka beda-beda lebar. Membandingkan lebar berarti membandingkan besar sudut. Satuannya derajat. Alatnya busur derajat. Letakkan pusat di titik sudut, dasar berimpit satu kaki, baca kaki kedua. Ada juga sudut nol, lurus, penuh, dan releks. METODE LUAR Protractor Reading Protocol dan Benchmark Angles. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa mengukur dan membandingkan besar sudut dengan busur derajat serta menyebut jenis sudut menurut ukurannya.",
    "referensi": "Buku Siswa Matematika Kelas V Bab 6 Sub-Bab C hlm. 175–182; METODE LUAR · Protractor Reading Protocol; Benchmark Angles; Degree Measure."
  },
  "videos": [
    {
      "id": "K5B6C-V1",
      "judul": "Kipas Pakarena",
      "subjudul": "Membandingkan",
      "adegan": [
        {
          "id": "K5B6C-V1-1",
          "judul": "Tari & kipas",
          "ketukan": [
            "Tari Pakarena dari Sulawesi Selatan memakai kipas lipat.",
            "Kipas bisa dibuka sempit atau lebar.",
            "Kipas lebih lebar membentuk sudut lebih besar.",
            "Membandingkan lebar = membandingkan besar sudut."
          ],
          "papan": [
            "Pakarena",
            "kipas lipat",
            "lebih lebar",
            "sudut lebih besar"
          ]
        },
        {
          "id": "K5B6C-V1-2",
          "judul": "Butuh satuan",
          "ketukan": [
            "Seperti panjang punya meter, sudut punya derajat.",
            "Ditulis dengan tanda derajat.",
            "Tanpa satuan, sulit bilang 'berapa besar'.",
            "METODE LUAR · Degree Measure."
          ],
          "papan": [
            "satuan derajat",
            "tanda °",
            "ukur pasti",
            "Degree Measure"
          ]
        },
        {
          "id": "K5B6C-V1-3",
          "judul": "Busur derajat",
          "ketukan": [
            "Alat ukurnya busur derajat.",
            "Ada titik pusat, garis dasar, skala dalam dan luar.",
            "Kita pelajari cara memasangnya benar.",
            "Siap protokol ukur."
          ],
          "papan": [
            "busur derajat",
            "pusat & dasar",
            "skala",
            "protokol"
          ]
        }
      ]
    },
    {
      "id": "K5B6C-V2",
      "judul": "Cara Mengukur",
      "subjudul": "Protocol",
      "adegan": [
        {
          "id": "K5B6C-V2-1",
          "judul": "Langkah 1-2",
          "ketukan": [
            "Letakkan pusat busur pada titik sudut.",
            "Geser hingga garis dasar berimpit salah satu kaki sudut.",
            "Pastikan kaki lain masih dalam jangkauan skala.",
            "METODE LUAR · Protractor Reading Protocol."
          ],
          "papan": [
            "pusat di titik",
            "dasar berimpit",
            "kaki dalam jangkauan",
            "Protocol"
          ]
        },
        {
          "id": "K5B6C-V2-2",
          "judul": "Langkah 3",
          "ketukan": [
            "Kaki yang berimpit dasar menunjukkan nol derajat.",
            "Lihat kaki sudut lainnya pada skala.",
            "Angka itulah ukuran sudut.",
            "Contoh buku: seratus dua puluh lima derajat."
          ],
          "papan": [
            "dasar = 0°",
            "baca kaki kedua",
            "angka = ukuran",
            "125° contoh"
          ]
        },
        {
          "id": "K5B6C-V2-3",
          "judul": "Ukur siku",
          "ketukan": [
            "Ukur juga patokan lipatan siku dari Sub-Bab A.",
            "Hasilnya harus sembilan puluh derajat.",
            "Ini mengunci hubungan patokan dan satuan.",
            "Benchmark Angles: 90, 180, 360."
          ],
          "papan": [
            "ukur lipatan",
            "hasil 90°",
            "patokan=satuan",
            "90/180/360"
          ]
        }
      ]
    },
    {
      "id": "K5B6C-V3",
      "judul": "Jenis menurut Ukuran",
      "subjudul": "Benchmark",
      "adegan": [
        {
          "id": "K5B6C-V3-1",
          "judul": "Nol, lurus, penuh",
          "ketukan": [
            "Sudut nol: nol derajat.",
            "Sudut lurus: seratus delapan puluh derajat.",
            "Sudut penuh: tiga ratus enam puluh derajat.",
            "METODE LUAR · Benchmark Angles."
          ],
          "papan": [
            "0°",
            "180°",
            "360°",
            "Benchmark"
          ]
        },
        {
          "id": "K5B6C-V3-2",
          "judul": "Releks",
          "ketukan": [
            "Sudut releks lebih dari seratus delapan puluh dan kurang dari tiga ratus enam puluh.",
            "Itu sudut 'bagian luar' yang besar.",
            "Jangan tertukar dengan tumpul.",
            "Tumpul masih di bawah seratus delapan puluh."
          ],
          "papan": [
            "releks",
            ">180° <360°",
            "bukan tumpul",
            "beda batas"
          ]
        },
        {
          "id": "K5B6C-V3-3",
          "judul": "Jam & siap D",
          "ketukan": [
            "Latihan: ukur sudut jarum jam, misalnya pukul satu sekitar tiga puluh derajat.",
            "Pukul tiga: sembilan puluh derajat.",
            "Berikutnya kita lukis sudut dengan ukuran tertentu.",
            "Ayo Sub-Bab D!"
          ],
          "papan": [
            "jam 1 ≈ 30°",
            "jam 3 = 90°",
            "melukis",
            "lanjut D"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Banding dulu",
      "stepDesc": "Baca soal Mengukur dan Membandingkan Sudut dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Mana lebih lebar? Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa mengukur sudut dengan busur derajat dalam satuan derajat, membandingkan lebar kipas (Tari Pakarena), serta mengena….",
      "icon": "🪞",
      "flowFrom": "Banding dulu",
      "flowTo": "Pakai derajat"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Pakai derajat",
      "stepDesc": "Satuan sudut. Pada Mengukur dan Membandingkan Sudut, langkah “Pakai derajat” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "°",
      "flowFrom": "Pakai derajat",
      "flowTo": "Pasang busur"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Pasang busur",
      "stepDesc": "Pusat di titik. Pada Mengukur dan Membandingkan Sudut, langkah “Pasang busur” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "📐",
      "flowFrom": "Pasang busur",
      "flowTo": "Baca skala"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Baca skala",
      "stepDesc": "Kaki kedua. Pada Mengukur dan Membandingkan Sudut, langkah “Baca skala” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "👀",
      "flowFrom": "Baca skala",
      "flowTo": "Benchmark"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Benchmark",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Mengukur dan Membandingkan Sudut. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "⭐",
      "flowFrom": "Benchmark",
      "flowTo": "Releks?"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Releks?",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Mengukur dan Membandingkan Sudut. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "↻",
      "flowFrom": "Releks?",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Derajat",
      "emoji": "°",
      "countNum": 1,
      "countWord": "satuan sudut",
      "suara": "Degree Measure."
    },
    {
      "judul": "Busur",
      "emoji": "📐",
      "countNum": 1,
      "countWord": "alat ukur",
      "suara": "Protractor."
    },
    {
      "judul": "Protocol",
      "emoji": "1️⃣",
      "countNum": 1,
      "countWord": "pusat→dasar→baca",
      "suara": "Langkah."
    },
    {
      "judul": "Contoh",
      "emoji": "🔢",
      "countNum": 125,
      "countWord": "125°",
      "suara": "Buku."
    },
    {
      "judul": "Siku ukur",
      "emoji": "∟",
      "countNum": 90,
      "countWord": "90°",
      "suara": "Cek patokan."
    },
    {
      "judul": "Lurus",
      "emoji": "—",
      "countNum": 180,
      "countWord": "180°",
      "suara": "Benchmark."
    },
    {
      "judul": "Penuh",
      "emoji": "○",
      "countNum": 360,
      "countWord": "360°",
      "suara": "Benchmark."
    },
    {
      "judul": "Releks",
      "emoji": "↻",
      "countNum": 1,
      "countWord": ">180° <360°",
      "suara": "Definisi."
    },
    {
      "judul": "Pakarena",
      "emoji": "🪭",
      "countNum": 1,
      "countWord": "banding kipas",
      "suara": "Konteks."
    },
    {
      "judul": "Siap D",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "melukis",
      "suara": "Lanjut."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-c-c",
      "title": "Hitung Bacaan Busur",
      "bookReference": "hlm. 175–182",
      "objective": "Ukur dan bandingkan sudut dengan Protractor Reading Protocol.",
      "mechanicDescription": "Tiga ronde bacaan busur, benchmark 0/90/180/360, releks.",
      "voiceGuide": "Pilih ukuran atau langkah ukur yang benar.",
      "emoji": "📐",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-c-c",
      "title": "Arti Alat & Satuan",
      "bookReference": "hlm. 175–182",
      "objective": "Ukur dan bandingkan sudut dengan Protractor Reading Protocol.",
      "mechanicDescription": "Tiga ronde bacaan busur, benchmark 0/90/180/360, releks.",
      "voiceGuide": "Pilih ukuran atau langkah ukur yang benar.",
      "emoji": "📐",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-c-c",
      "title": "Pilih Langkah Ukur",
      "bookReference": "hlm. 175–182",
      "objective": "Ukur dan bandingkan sudut dengan Protractor Reading Protocol.",
      "mechanicDescription": "Tiga ronde bacaan busur, benchmark 0/90/180/360, releks.",
      "voiceGuide": "Pilih ukuran atau langkah ukur yang benar.",
      "emoji": "📐",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-c-c",
      "title": "Pilah Ukur/Bukan",
      "bookReference": "hlm. 175–182",
      "objective": "Ukur dan bandingkan sudut dengan Protractor Reading Protocol.",
      "mechanicDescription": "Tiga ronde bacaan busur, benchmark 0/90/180/360, releks.",
      "voiceGuide": "Pilih ukuran atau langkah ukur yang benar.",
      "emoji": "📐",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-c-c",
      "title": "Jodohkan Benchmark",
      "bookReference": "hlm. 175–182",
      "objective": "Ukur dan bandingkan sudut dengan Protractor Reading Protocol.",
      "mechanicDescription": "Tiga ronde bacaan busur, benchmark 0/90/180/360, releks.",
      "voiceGuide": "Pilih ukuran atau langkah ukur yang benar.",
      "emoji": "📐",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-c-c",
      "title": "Memori Derajat",
      "bookReference": "hlm. 175–182",
      "objective": "Ukur dan bandingkan sudut dengan Protractor Reading Protocol.",
      "mechanicDescription": "Tiga ronde bacaan busur, benchmark 0/90/180/360, releks.",
      "voiceGuide": "Pilih ukuran atau langkah ukur yang benar.",
      "emoji": "📐",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-c-c",
      "title": "Ketuk Ukuran",
      "bookReference": "hlm. 175–182",
      "objective": "Ukur dan bandingkan sudut dengan Protractor Reading Protocol.",
      "mechanicDescription": "Tiga ronde bacaan busur, benchmark 0/90/180/360, releks.",
      "voiceGuide": "Pilih ukuran atau langkah ukur yang benar.",
      "emoji": "📐",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-c-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 175–182",
      "objective": "Ukur dan bandingkan sudut dengan Protractor Reading Protocol.",
      "mechanicDescription": "Tiga ronde bacaan busur, benchmark 0/90/180/360, releks.",
      "voiceGuide": "Pilih ukuran atau langkah ukur yang benar.",
      "emoji": "📐",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-c-c",
      "title": "Cerita Kipas & Jam",
      "bookReference": "hlm. 175–182",
      "objective": "Ukur dan bandingkan sudut dengan Protractor Reading Protocol.",
      "mechanicDescription": "Tiga ronde bacaan busur, benchmark 0/90/180/360, releks.",
      "voiceGuide": "Pilih ukuran atau langkah ukur yang benar.",
      "emoji": "📐",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-c-c",
      "title": "Urutkan Derajat",
      "bookReference": "hlm. 175–182",
      "objective": "Ukur dan bandingkan sudut dengan Protractor Reading Protocol.",
      "mechanicDescription": "Tiga ronde bacaan busur, benchmark 0/90/180/360, releks.",
      "voiceGuide": "Pilih ukuran atau langkah ukur yang benar.",
      "emoji": "📐",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-c-p",
      "title": "Diagram Hitung Bacaan Busur",
      "bookReference": "hlm. 175–182",
      "objective": "Ukur dan bandingkan sudut dengan Protractor Reading Protocol.",
      "mechanicDescription": "Tiga ronde bacaan busur, benchmark 0/90/180/360, releks.",
      "voiceGuide": "Pilih ukuran atau langkah ukur yang benar.",
      "diagramType": "hitung",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "rumus-c-p",
      "title": "Diagram Arti Alat & Satuan",
      "bookReference": "hlm. 175–182",
      "objective": "Ukur dan bandingkan sudut dengan Protractor Reading Protocol.",
      "mechanicDescription": "Tiga ronde bacaan busur, benchmark 0/90/180/360, releks.",
      "voiceGuide": "Pilih ukuran atau langkah ukur yang benar.",
      "diagramType": "rumus",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "arti-c-p",
      "title": "Diagram Pilih Langkah Ukur",
      "bookReference": "hlm. 175–182",
      "objective": "Ukur dan bandingkan sudut dengan Protractor Reading Protocol.",
      "mechanicDescription": "Tiga ronde bacaan busur, benchmark 0/90/180/360, releks.",
      "voiceGuide": "Pilih ukuran atau langkah ukur yang benar.",
      "diagramType": "arti",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sortir-c-p",
      "title": "Diagram Pilah Ukur/Bukan",
      "bookReference": "hlm. 175–182",
      "objective": "Ukur dan bandingkan sudut dengan Protractor Reading Protocol.",
      "mechanicDescription": "Tiga ronde bacaan busur, benchmark 0/90/180/360, releks.",
      "voiceGuide": "Pilih ukuran atau langkah ukur yang benar.",
      "diagramType": "sortir",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-c-p",
      "title": "Diagram Jodohkan Benchmark",
      "bookReference": "hlm. 175–182",
      "objective": "Ukur dan bandingkan sudut dengan Protractor Reading Protocol.",
      "mechanicDescription": "Tiga ronde bacaan busur, benchmark 0/90/180/360, releks.",
      "voiceGuide": "Pilih ukuran atau langkah ukur yang benar.",
      "diagramType": "jodoh",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memori-c-p",
      "title": "Diagram Memori Derajat",
      "bookReference": "hlm. 175–182",
      "objective": "Ukur dan bandingkan sudut dengan Protractor Reading Protocol.",
      "mechanicDescription": "Tiga ronde bacaan busur, benchmark 0/90/180/360, releks.",
      "voiceGuide": "Pilih ukuran atau langkah ukur yang benar.",
      "diagramType": "memori",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-c-p",
      "title": "Diagram Ketuk Ukuran",
      "bookReference": "hlm. 175–182",
      "objective": "Ukur dan bandingkan sudut dengan Protractor Reading Protocol.",
      "mechanicDescription": "Tiga ronde bacaan busur, benchmark 0/90/180/360, releks.",
      "voiceGuide": "Pilih ukuran atau langkah ukur yang benar.",
      "diagramType": "ketuk",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "semua-c-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 175–182",
      "objective": "Ukur dan bandingkan sudut dengan Protractor Reading Protocol.",
      "mechanicDescription": "Tiga ronde bacaan busur, benchmark 0/90/180/360, releks.",
      "voiceGuide": "Pilih ukuran atau langkah ukur yang benar.",
      "diagramType": "semua",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "cerita-c-p",
      "title": "Diagram Cerita Kipas & Jam",
      "bookReference": "hlm. 175–182",
      "objective": "Ukur dan bandingkan sudut dengan Protractor Reading Protocol.",
      "mechanicDescription": "Tiga ronde bacaan busur, benchmark 0/90/180/360, releks.",
      "voiceGuide": "Pilih ukuran atau langkah ukur yang benar.",
      "diagramType": "cerita",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "urut-c-p",
      "title": "Diagram Urutkan Derajat",
      "bookReference": "hlm. 175–182",
      "objective": "Ukur dan bandingkan sudut dengan Protractor Reading Protocol.",
      "mechanicDescription": "Tiga ronde bacaan busur, benchmark 0/90/180/360, releks.",
      "voiceGuide": "Pilih ukuran atau langkah ukur yang benar.",
      "diagramType": "urut",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-c-a",
      "title": "Tulis Hitung Bacaan Busur",
      "bookReference": "hlm. 175–182",
      "objective": "Ukur dan bandingkan sudut dengan Protractor Reading Protocol.",
      "mechanicDescription": "Tiga ronde bacaan busur, benchmark 0/90/180/360, releks.",
      "voiceGuide": "Pilih ukuran atau langkah ukur yang benar.",
      "symbolLarge": "∠",
      "wordLarge": "SUDUT",
      "mathNotation": "derajat"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-c-a",
      "title": "Tulis Arti Alat & Satuan",
      "bookReference": "hlm. 175–182",
      "objective": "Ukur dan bandingkan sudut dengan Protractor Reading Protocol.",
      "mechanicDescription": "Tiga ronde bacaan busur, benchmark 0/90/180/360, releks.",
      "voiceGuide": "Pilih ukuran atau langkah ukur yang benar.",
      "symbolLarge": "∠",
      "wordLarge": "SUDUT",
      "mathNotation": "derajat"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-c-a",
      "title": "Tulis Pilih Langkah Ukur",
      "bookReference": "hlm. 175–182",
      "objective": "Ukur dan bandingkan sudut dengan Protractor Reading Protocol.",
      "mechanicDescription": "Tiga ronde bacaan busur, benchmark 0/90/180/360, releks.",
      "voiceGuide": "Pilih ukuran atau langkah ukur yang benar.",
      "symbolLarge": "∠",
      "wordLarge": "SUDUT",
      "mathNotation": "derajat"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-c-a",
      "title": "Tulis Pilah Ukur/Bukan",
      "bookReference": "hlm. 175–182",
      "objective": "Ukur dan bandingkan sudut dengan Protractor Reading Protocol.",
      "mechanicDescription": "Tiga ronde bacaan busur, benchmark 0/90/180/360, releks.",
      "voiceGuide": "Pilih ukuran atau langkah ukur yang benar.",
      "symbolLarge": "∠",
      "wordLarge": "SUDUT",
      "mathNotation": "derajat"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-c-a",
      "title": "Tulis Jodohkan Benchmark",
      "bookReference": "hlm. 175–182",
      "objective": "Ukur dan bandingkan sudut dengan Protractor Reading Protocol.",
      "mechanicDescription": "Tiga ronde bacaan busur, benchmark 0/90/180/360, releks.",
      "voiceGuide": "Pilih ukuran atau langkah ukur yang benar.",
      "symbolLarge": "∠",
      "wordLarge": "SUDUT",
      "mathNotation": "derajat"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-c-a",
      "title": "Tulis Memori Derajat",
      "bookReference": "hlm. 175–182",
      "objective": "Ukur dan bandingkan sudut dengan Protractor Reading Protocol.",
      "mechanicDescription": "Tiga ronde bacaan busur, benchmark 0/90/180/360, releks.",
      "voiceGuide": "Pilih ukuran atau langkah ukur yang benar.",
      "symbolLarge": "∠",
      "wordLarge": "SUDUT",
      "mathNotation": "derajat"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-c",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 175–182",
      "objective": "Ukur dan bandingkan sudut dengan Protractor Reading Protocol.",
      "mechanicDescription": "Dua ronde menilai pernyataan.",
      "voiceGuide": "Benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-c",
      "title": "Detektif Sudut",
      "bookReference": "hlm. 175–182",
      "objective": "Ukur dan bandingkan sudut dengan Protractor Reading Protocol.",
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
      "bookReference": "hlm. 175–182",
      "objective": "Ukur dan bandingkan sudut dengan Protractor Reading Protocol.",
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
      "bookReference": "hlm. 175–182",
      "objective": "Ukur dan bandingkan sudut dengan Protractor Reading Protocol.",
      "mechanicDescription": "Tiga ronde cerita.",
      "voiceGuide": "Baca lalu pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "°",
      "nama": "Satuan",
      "isi": "Besar sudut diukur dalam derajat.",
      "suara": "Degree Measure."
    },
    {
      "ikon": "📐",
      "nama": "Alat",
      "isi": "Busur derajat; pusat di titik sudut.",
      "suara": "Protractor Reading Protocol."
    },
    {
      "ikon": "⭐",
      "nama": "Benchmark",
      "isi": "0°, 90°, 180°, 360°.",
      "suara": "Benchmark Angles."
    },
    {
      "ikon": "↻",
      "nama": "Releks",
      "isi": "Lebih dari 180° dan kurang dari 360°.",
      "suara": "Bukan tumpul."
    }
  ],
  "poinSuara": "Ingat: pasang pusat busur di titik sudut, dasar di kaki nol, baca kaki kedua; kenali nol, siku, lurus, penuh, releks.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Pasang pusat",
        "warna": "#FDE68A"
      },
      {
        "teks": "impit dasar",
        "warna": "#BBF7D0"
      },
      {
        "teks": "baca skala",
        "warna": "#BFDBFE"
      },
      {
        "teks": "banding/jenis",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: ukur sudut buka sebuah gunting atau kipas dengan busur derajat (atau gambar perkiraan lalu cocokkan jenisnya).",
  "refleksi": [
    "Apa satuan besar sudut?",
    "Bagaimana langkah mengukur dengan busur?",
    "Apa beda tumpul dan releks?"
  ]
};
export const SUB_D56: SubBabNaskah = {
  "id": "D",
  "codeTitle": "Sub-Bab D (Melukis Sudut)",
  "fullTitle": "Sub-Bab D: Melukis Sudut",
  "targetDescription": "Siswa melukis sudut berukuran tertentu dengan busur derajat mengikuti urutan titik sudut → pasang busur → tadai derajat → kaki kedua (Constructing Angles Protocol) sesuai Buku Siswa Kelas V Bab 6 Sub-Bab D hlm. 183–185.",
  "secondaryBg": "#FCE7F3",
  "secondaryBorder": "#DB2777",
  "secondaryText": "#9D174D",
  "silabus": {
    "teksSuara": "Kita melukis sudut. Buat titik sudut dan satu kaki. Pasang pusat busur di titik itu, dasar berimpit kaki. Tadai angka derajat yang diminta. Hubungkan tanda ke titik sudut: itu kaki kedua. METODE LUAR Constructing Angles Protocol. Latihan: tiga puluh, tujuh puluh lima, seratus sepuluh, seratus empat puluh derajat, dan lainnya. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menggambar sudut sesuai ukuran yang diminta dengan busur derajat.",
    "referensi": "Buku Siswa Matematika Kelas V Bab 6 Sub-Bab D hlm. 183–185; METODE LUAR · Constructing Angles Protocol; Protractor Construction."
  },
  "videos": [
    {
      "id": "K5B6D-V1",
      "judul": "Urutan Melukis",
      "subjudul": "Protocol",
      "adegan": [
        {
          "id": "K5B6D-V1-1",
          "judul": "Langkah 1",
          "ketukan": [
            "Buat titik sudut dan satu kaki sudut.",
            "Boleh garis mendatar sebagai kaki pertama.",
            "Tanpa titik jelas, lukisan sudut goyah.",
            "Ini fondasi Constructing Angles."
          ],
          "papan": [
            "titik sudut",
            "kaki pertama",
            "fondasi",
            "Construction"
          ]
        },
        {
          "id": "K5B6D-V1-2",
          "judul": "Langkah 2",
          "ketukan": [
            "Letakkan pusat busur derajat pada titik sudut.",
            "Pastikan dasar busur berimpit kaki yang sudah ada.",
            "Sama seperti saat mengukur, tapi sekarang untuk menandai target.",
            "METODE LUAR · Constructing Angles Protocol."
          ],
          "papan": [
            "pusat di titik",
            "dasar berimpit",
            "seperti mengukur",
            "Protocol"
          ]
        },
        {
          "id": "K5B6D-V1-3",
          "judul": "Langkah 3-4",
          "ketukan": [
            "Cari angka ukuran yang diminta pada skala, misalnya tujuh puluh lima.",
            "Beri tanda kecil di situ.",
            "Gambar kaki kedua dari tanda menuju titik sudut.",
            "Sudut siap."
          ],
          "papan": [
            "cari angka",
            "beri tanda",
            "kaki kedua",
            "sudut siap"
          ]
        }
      ]
    },
    {
      "id": "K5B6D-V2",
      "judul": "Latihan Ukuran",
      "subjudul": "Ayo Berlatih",
      "adegan": [
        {
          "id": "K5B6D-V2-1",
          "judul": "Ukuran buku",
          "ketukan": [
            "Latihan: tiga puluh, tujuh puluh lima, seratus sepuluh, lima puluh dua, seratus empat puluh derajat, dan lainnya.",
            "Ada yang lancip, siku, dan tumpul.",
            "Pilih skala yang menjangkau angka target.",
            "Jangan baca skala terbalik."
          ],
          "papan": [
            "30° 75° 110°",
            "lancip/siku/tumpul",
            "skala menjangkau",
            "jangan terbalik"
          ]
        },
        {
          "id": "K5B6D-V2-2",
          "judul": "Cek hasil",
          "ketukan": [
            "Setelah dilukis, ukur kembali dengan busur.",
            "Jika hasilnya cocok target, lukisan akurat.",
            "Jika meleset, cek pusat dan dasar busur.",
            "Kesalahan umum: pusat tidak tepat di titik."
          ],
          "papan": [
            "ukur ulang",
            "cocok = akurat",
            "cek pusat",
            "salah umum"
          ]
        },
        {
          "id": "K5B6D-V2-3",
          "judul": "Hubung A–C",
          "ketukan": [
            "Melukis membalik keterampilan mengukur.",
            "Patokan sembilan puluh membantu rasa siku.",
            "Jenis sudut tetap berlaku pada hasil lukisan.",
            "Protokol yang sama: titik, busur, tanda, kaki."
          ],
          "papan": [
            "ukur ↔ lukis",
            "patokan 90°",
            "jenis tetap",
            "protokol sama"
          ]
        }
      ]
    },
    {
      "id": "K5B6D-V3",
      "judul": "Rangkum Bab 6",
      "subjudul": "A–D",
      "adegan": [
        {
          "id": "K5B6D-V3-1",
          "judul": "Alur bab",
          "ketukan": [
            "A: detektif siku dan patokan lipat.",
            "B: pengertian dan klasifikasi lancip–siku–tumpul.",
            "C: ukur derajat, busur, benchmark, releks.",
            "D: lukis sudut sesuai ukuran."
          ],
          "papan": [
            "A siku",
            "B jenis",
            "C ukur",
            "D lukis"
          ]
        },
        {
          "id": "K5B6D-V3-2",
          "judul": "Label metode",
          "ketukan": [
            "Right Angle Benchmark, Paper Fold, Angle Detective.",
            "Vertex-Ray, Acute-Right-Obtuse.",
            "Protractor Reading, Benchmark Angles, Degree Measure.",
            "Constructing Angles Protocol."
          ],
          "papan": [
            "A methods",
            "B methods",
            "C methods",
            "D protocol"
          ]
        },
        {
          "id": "K5B6D-V3-3",
          "judul": "Materi siap",
          "ketukan": [
            "Tab Materi Bab 6 Sub-Bab A sampai D siap dimainkan.",
            "Latihan dan ujian menyusul instruksi terpisah.",
            "Mainkan Concrete, Picture, Abstract.",
            "Hebat, detektif sudut!"
          ],
          "papan": [
            "Materi siap",
            "tanpa Latihan dulu",
            "30 permainan",
            "hebat"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Titik+kaki",
      "stepDesc": "Baca soal Melukis Sudut dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Fondasi lukisan Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa melukis sudut berukuran tertentu dengan busur derajat mengikuti urutan titik sudut → pasang busur → tadai derajat ….",
      "icon": "•",
      "flowFrom": "Titik+kaki",
      "flowTo": "Pasang busur"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Pasang busur",
      "stepDesc": "Pusat & dasar. Pada Melukis Sudut, langkah “Pasang busur” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "📐",
      "flowFrom": "Pasang busur",
      "flowTo": "Tadai target"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Tadai target",
      "stepDesc": "Angka derajat. Pada Melukis Sudut, langkah “Tadai target” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "✏️",
      "flowFrom": "Tadai target",
      "flowTo": "Kaki kedua"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Kaki kedua",
      "stepDesc": "Tanda → titik. Pada Melukis Sudut, langkah “Kaki kedua” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "／",
      "flowFrom": "Kaki kedua",
      "flowTo": "Ukur ulang"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Ukur ulang",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Melukis Sudut. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "🔍",
      "flowFrom": "Ukur ulang",
      "flowTo": "Jenis"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Jenis",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Melukis Sudut. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "📊",
      "flowFrom": "Jenis",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Langkah 1",
      "emoji": "1️⃣",
      "countNum": 1,
      "countWord": "titik+kaki",
      "suara": "Awal."
    },
    {
      "judul": "Langkah 2",
      "emoji": "2️⃣",
      "countNum": 1,
      "countWord": "pasang busur",
      "suara": "Protocol."
    },
    {
      "judul": "Langkah 3",
      "emoji": "3️⃣",
      "countNum": 1,
      "countWord": "tadai derajat",
      "suara": "Skala."
    },
    {
      "judul": "Langkah 4",
      "emoji": "4️⃣",
      "countNum": 1,
      "countWord": "kaki kedua",
      "suara": "Selesai."
    },
    {
      "judul": "30°",
      "emoji": "∠",
      "countNum": 30,
      "countWord": "latihan",
      "suara": "Lancip."
    },
    {
      "judul": "90°",
      "emoji": "∟",
      "countNum": 90,
      "countWord": "latihan",
      "suara": "Siku."
    },
    {
      "judul": "140°",
      "emoji": "∠",
      "countNum": 140,
      "countWord": "latihan",
      "suara": "Tumpul."
    },
    {
      "judul": "Cek",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "ukur ulang",
      "suara": "Akurasi."
    },
    {
      "judul": "Metode",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "Construction",
      "suara": "Protocol."
    },
    {
      "judul": "Bab 6",
      "emoji": "🎉",
      "countNum": 1,
      "countWord": "A–D siap",
      "suara": "Materi."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-d-c",
      "title": "Hitung Target Lukis",
      "bookReference": "hlm. 183–185",
      "objective": "Lukis sudut dengan Constructing Angles Protocol.",
      "mechanicDescription": "Tiga ronde urutan langkah dan target derajat latihan buku.",
      "voiceGuide": "Pilih langkah atau ukuran lukisan yang benar.",
      "emoji": "✏️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-d-c",
      "title": "Urutan Langkah",
      "bookReference": "hlm. 183–185",
      "objective": "Lukis sudut dengan Constructing Angles Protocol.",
      "mechanicDescription": "Tiga ronde urutan langkah dan target derajat latihan buku.",
      "voiceGuide": "Pilih langkah atau ukuran lukisan yang benar.",
      "emoji": "✏️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-d-c",
      "title": "Arti Protocol",
      "bookReference": "hlm. 183–185",
      "objective": "Lukis sudut dengan Constructing Angles Protocol.",
      "mechanicDescription": "Tiga ronde urutan langkah dan target derajat latihan buku.",
      "voiceGuide": "Pilih langkah atau ukuran lukisan yang benar.",
      "emoji": "✏️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-d-c",
      "title": "Pilah Langkah/Bukan",
      "bookReference": "hlm. 183–185",
      "objective": "Lukis sudut dengan Constructing Angles Protocol.",
      "mechanicDescription": "Tiga ronde urutan langkah dan target derajat latihan buku.",
      "voiceGuide": "Pilih langkah atau ukuran lukisan yang benar.",
      "emoji": "✏️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-d-c",
      "title": "Jodohkan Langkah",
      "bookReference": "hlm. 183–185",
      "objective": "Lukis sudut dengan Constructing Angles Protocol.",
      "mechanicDescription": "Tiga ronde urutan langkah dan target derajat latihan buku.",
      "voiceGuide": "Pilih langkah atau ukuran lukisan yang benar.",
      "emoji": "✏️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-d-c",
      "title": "Memori Lukis",
      "bookReference": "hlm. 183–185",
      "objective": "Lukis sudut dengan Constructing Angles Protocol.",
      "mechanicDescription": "Tiga ronde urutan langkah dan target derajat latihan buku.",
      "voiceGuide": "Pilih langkah atau ukuran lukisan yang benar.",
      "emoji": "✏️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-d-c",
      "title": "Ketuk Target",
      "bookReference": "hlm. 183–185",
      "objective": "Lukis sudut dengan Constructing Angles Protocol.",
      "mechanicDescription": "Tiga ronde urutan langkah dan target derajat latihan buku.",
      "voiceGuide": "Pilih langkah atau ukuran lukisan yang benar.",
      "emoji": "✏️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-d-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 183–185",
      "objective": "Lukis sudut dengan Constructing Angles Protocol.",
      "mechanicDescription": "Tiga ronde urutan langkah dan target derajat latihan buku.",
      "voiceGuide": "Pilih langkah atau ukuran lukisan yang benar.",
      "emoji": "✏️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-d-c",
      "title": "Cerita Melukis",
      "bookReference": "hlm. 183–185",
      "objective": "Lukis sudut dengan Constructing Angles Protocol.",
      "mechanicDescription": "Tiga ronde urutan langkah dan target derajat latihan buku.",
      "voiceGuide": "Pilih langkah atau ukuran lukisan yang benar.",
      "emoji": "✏️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-d-c",
      "title": "Urutkan Derajat",
      "bookReference": "hlm. 183–185",
      "objective": "Lukis sudut dengan Constructing Angles Protocol.",
      "mechanicDescription": "Tiga ronde urutan langkah dan target derajat latihan buku.",
      "voiceGuide": "Pilih langkah atau ukuran lukisan yang benar.",
      "emoji": "✏️",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-d-p",
      "title": "Diagram Hitung Target Lukis",
      "bookReference": "hlm. 183–185",
      "objective": "Lukis sudut dengan Constructing Angles Protocol.",
      "mechanicDescription": "Tiga ronde urutan langkah dan target derajat latihan buku.",
      "voiceGuide": "Pilih langkah atau ukuran lukisan yang benar.",
      "diagramType": "hitung",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "rumus-d-p",
      "title": "Diagram Urutan Langkah",
      "bookReference": "hlm. 183–185",
      "objective": "Lukis sudut dengan Constructing Angles Protocol.",
      "mechanicDescription": "Tiga ronde urutan langkah dan target derajat latihan buku.",
      "voiceGuide": "Pilih langkah atau ukuran lukisan yang benar.",
      "diagramType": "rumus",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "arti-d-p",
      "title": "Diagram Arti Protocol",
      "bookReference": "hlm. 183–185",
      "objective": "Lukis sudut dengan Constructing Angles Protocol.",
      "mechanicDescription": "Tiga ronde urutan langkah dan target derajat latihan buku.",
      "voiceGuide": "Pilih langkah atau ukuran lukisan yang benar.",
      "diagramType": "arti",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sortir-d-p",
      "title": "Diagram Pilah Langkah/Bukan",
      "bookReference": "hlm. 183–185",
      "objective": "Lukis sudut dengan Constructing Angles Protocol.",
      "mechanicDescription": "Tiga ronde urutan langkah dan target derajat latihan buku.",
      "voiceGuide": "Pilih langkah atau ukuran lukisan yang benar.",
      "diagramType": "sortir",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-d-p",
      "title": "Diagram Jodohkan Langkah",
      "bookReference": "hlm. 183–185",
      "objective": "Lukis sudut dengan Constructing Angles Protocol.",
      "mechanicDescription": "Tiga ronde urutan langkah dan target derajat latihan buku.",
      "voiceGuide": "Pilih langkah atau ukuran lukisan yang benar.",
      "diagramType": "jodoh",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memori-d-p",
      "title": "Diagram Memori Lukis",
      "bookReference": "hlm. 183–185",
      "objective": "Lukis sudut dengan Constructing Angles Protocol.",
      "mechanicDescription": "Tiga ronde urutan langkah dan target derajat latihan buku.",
      "voiceGuide": "Pilih langkah atau ukuran lukisan yang benar.",
      "diagramType": "memori",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-d-p",
      "title": "Diagram Ketuk Target",
      "bookReference": "hlm. 183–185",
      "objective": "Lukis sudut dengan Constructing Angles Protocol.",
      "mechanicDescription": "Tiga ronde urutan langkah dan target derajat latihan buku.",
      "voiceGuide": "Pilih langkah atau ukuran lukisan yang benar.",
      "diagramType": "ketuk",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "semua-d-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 183–185",
      "objective": "Lukis sudut dengan Constructing Angles Protocol.",
      "mechanicDescription": "Tiga ronde urutan langkah dan target derajat latihan buku.",
      "voiceGuide": "Pilih langkah atau ukuran lukisan yang benar.",
      "diagramType": "semua",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "cerita-d-p",
      "title": "Diagram Cerita Melukis",
      "bookReference": "hlm. 183–185",
      "objective": "Lukis sudut dengan Constructing Angles Protocol.",
      "mechanicDescription": "Tiga ronde urutan langkah dan target derajat latihan buku.",
      "voiceGuide": "Pilih langkah atau ukuran lukisan yang benar.",
      "diagramType": "cerita",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "urut-d-p",
      "title": "Diagram Urutkan Derajat",
      "bookReference": "hlm. 183–185",
      "objective": "Lukis sudut dengan Constructing Angles Protocol.",
      "mechanicDescription": "Tiga ronde urutan langkah dan target derajat latihan buku.",
      "voiceGuide": "Pilih langkah atau ukuran lukisan yang benar.",
      "diagramType": "urut",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-d-a",
      "title": "Tulis Hitung Target Lukis",
      "bookReference": "hlm. 183–185",
      "objective": "Lukis sudut dengan Constructing Angles Protocol.",
      "mechanicDescription": "Tiga ronde urutan langkah dan target derajat latihan buku.",
      "voiceGuide": "Pilih langkah atau ukuran lukisan yang benar.",
      "symbolLarge": "∠",
      "wordLarge": "SUDUT",
      "mathNotation": "derajat"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-d-a",
      "title": "Tulis Urutan Langkah",
      "bookReference": "hlm. 183–185",
      "objective": "Lukis sudut dengan Constructing Angles Protocol.",
      "mechanicDescription": "Tiga ronde urutan langkah dan target derajat latihan buku.",
      "voiceGuide": "Pilih langkah atau ukuran lukisan yang benar.",
      "symbolLarge": "∠",
      "wordLarge": "SUDUT",
      "mathNotation": "derajat"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-d-a",
      "title": "Tulis Arti Protocol",
      "bookReference": "hlm. 183–185",
      "objective": "Lukis sudut dengan Constructing Angles Protocol.",
      "mechanicDescription": "Tiga ronde urutan langkah dan target derajat latihan buku.",
      "voiceGuide": "Pilih langkah atau ukuran lukisan yang benar.",
      "symbolLarge": "∠",
      "wordLarge": "SUDUT",
      "mathNotation": "derajat"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-d-a",
      "title": "Tulis Pilah Langkah/Bukan",
      "bookReference": "hlm. 183–185",
      "objective": "Lukis sudut dengan Constructing Angles Protocol.",
      "mechanicDescription": "Tiga ronde urutan langkah dan target derajat latihan buku.",
      "voiceGuide": "Pilih langkah atau ukuran lukisan yang benar.",
      "symbolLarge": "∠",
      "wordLarge": "SUDUT",
      "mathNotation": "derajat"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-d-a",
      "title": "Tulis Jodohkan Langkah",
      "bookReference": "hlm. 183–185",
      "objective": "Lukis sudut dengan Constructing Angles Protocol.",
      "mechanicDescription": "Tiga ronde urutan langkah dan target derajat latihan buku.",
      "voiceGuide": "Pilih langkah atau ukuran lukisan yang benar.",
      "symbolLarge": "∠",
      "wordLarge": "SUDUT",
      "mathNotation": "derajat"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-d-a",
      "title": "Tulis Memori Lukis",
      "bookReference": "hlm. 183–185",
      "objective": "Lukis sudut dengan Constructing Angles Protocol.",
      "mechanicDescription": "Tiga ronde urutan langkah dan target derajat latihan buku.",
      "voiceGuide": "Pilih langkah atau ukuran lukisan yang benar.",
      "symbolLarge": "∠",
      "wordLarge": "SUDUT",
      "mathNotation": "derajat"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-d",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 183–185",
      "objective": "Lukis sudut dengan Constructing Angles Protocol.",
      "mechanicDescription": "Dua ronde menilai pernyataan.",
      "voiceGuide": "Benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-d",
      "title": "Detektif Sudut",
      "bookReference": "hlm. 183–185",
      "objective": "Lukis sudut dengan Constructing Angles Protocol.",
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
      "bookReference": "hlm. 183–185",
      "objective": "Lukis sudut dengan Constructing Angles Protocol.",
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
      "bookReference": "hlm. 183–185",
      "objective": "Lukis sudut dengan Constructing Angles Protocol.",
      "mechanicDescription": "Tiga ronde cerita.",
      "voiceGuide": "Baca lalu pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "1️⃣",
      "nama": "Awal",
      "isi": "Buat titik sudut dan satu kaki sudut.",
      "suara": "Fondasi."
    },
    {
      "ikon": "📐",
      "nama": "Busur",
      "isi": "Pusat di titik, dasar berimpit kaki.",
      "suara": "Sama seperti mengukur."
    },
    {
      "ikon": "✏️",
      "nama": "Tandai",
      "isi": "Tadai derajat target, gambar kaki kedua.",
      "suara": "Constructing Angles Protocol."
    },
    {
      "ikon": "🔍",
      "nama": "Cek",
      "isi": "Ukur ulang hasil lukisan.",
      "suara": "Akurasi."
    }
  ],
  "poinSuara": "Ingat: titik dan kaki dulu, pasang busur, tadai derajat, gambar kaki kedua, lalu ukur ulang.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Titik+kaki",
        "warna": "#FDE68A"
      },
      {
        "teks": "pasang busur",
        "warna": "#BBF7D0"
      },
      {
        "teks": "tadai derajat",
        "warna": "#BFDBFE"
      },
      {
        "teks": "kaki kedua & cek",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: lukis sudut 45° dan 120° dengan busur derajat, lalu sebut jenisnya.",
  "refleksi": [
    "Apa langkah pertama melukis sudut?",
    "Mengapa pusat busur harus di titik sudut?",
    "Bagaimana memastikan lukisan 140° akurat?"
  ]
};

export const SUB_BAB_K5B6: SubBabNaskah[] = [SUB_A56, SUB_B56, SUB_C56, SUB_D56];
export const semuaAdeganK5B6 = SUB_BAB_K5B6.flatMap((s) => s.videos.flatMap((v) => v.adegan));
