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
  "videos": [
    {
      "id": "K5B5A-V1",
      "judul": "Alun-Alun dan Arti Luas",
      "subjudul": "Covering",
      "adegan": [
        {
          "id": "K5B5A-V1-1",
          "judul": "Pasir Alun-Alun",
          "ketukan": [
            "Di buku ada Alun-Alun Utara Keraton Yogyakarta yang dipugar dengan pasir pantai.",
            "Banyak pasir bergantung pada seberapa besar daerah alun-alun yang ditutup.",
            "Itulah pertanyaan luas: berapa besar daerah di dalam batas?",
            "Bukan pertanyaan keliling pagar di tepi luar."
          ],
          "papan": [
            "Alun-Alun",
            "pasir menutup",
            "daerah dalam",
            "bukan keliling"
          ]
        },
        {
          "id": "K5B5A-V1-2",
          "judul": "Definisi",
          "ketukan": [
            "Luas daerah bangun datar adalah ukuran besar kecilnya daerah yang dibatasi bangun itu.",
            "Satuan yang dipakai disebut satuan luas.",
            "Bayangkan menutup seluruh daerah tanpa celah dan tanpa lubang.",
            "METODE LUAR · Unit Square Covering: tutup rapat dengan petak satuan."
          ],
          "papan": [
            "definisi",
            "satuan luas",
            "tutup rapat",
            "Unit Square"
          ]
        },
        {
          "id": "K5B5A-V1-3",
          "judul": "Bukan keliling",
          "ketukan": [
            "Keliling menjawab panjang jalur di tepi luar.",
            "Luas menjawab isi daerah di dalam.",
            "Jangan tertukar seperti di Bab 4 dan Bab 5.",
            "Satuannya juga beda: cm versus cm persegi."
          ],
          "papan": [
            "keliling = tepi",
            "luas = dalam",
            "jangan tertukar",
            "cm²"
          ]
        }
      ]
    },
    {
      "id": "K5B5A-V2",
      "judul": "Ubin, Petak, Array",
      "subjudul": "Array Model",
      "adegan": [
        {
          "id": "K5B5A-V2-1",
          "judul": "Denah rumah",
          "ketukan": [
            "Lukas dan teman menghitung ubin 1 meter kali 1 meter untuk tiap ruang.",
            "Satu ubin mewakili 1 meter persegi.",
            "Ruang yang lebih luas butuh lebih banyak ubin.",
            "Itu makna praktis luas di denah."
          ],
          "papan": [
            "ubin 1m²",
            "denah",
            "lebih luas",
            "lebih ubin"
          ]
        },
        {
          "id": "K5B5A-V2-2",
          "judul": "Petak satuan",
          "ketukan": [
            "Buat persegi 1 cm kali 1 cm. Itu 1 sentimeter persegi.",
            "Atau 1 m kali 1 m untuk 1 meter persegi.",
            "Tempel atau gambar petak sampai menutup seluruh bangun.",
            "Hitung banyak petak: itulah luas dalam satuan petak."
          ],
          "papan": [
            "1 cm²",
            "1 m²",
            "tempel petak",
            "hitung petak"
          ]
        },
        {
          "id": "K5B5A-V2-3",
          "judul": "Array Model",
          "ketukan": [
            "Pada persegi panjang, petak tersusun baris dan kolom.",
            "Luas sama dengan banyak baris dikali banyak kolom.",
            "Contoh 5 kali 2 sama dengan 10 petak.",
            "METODE LUAR · Array Model: baris × kolom = luas."
          ],
          "papan": [
            "baris×kolom",
            "5×2",
            "10",
            "Array Model"
          ]
        }
      ]
    },
    {
      "id": "K5B5A-V3",
      "judul": "Cara Yohana",
      "subjudul": "Conservation",
      "adegan": [
        {
          "id": "K5B5A-V3-1",
          "judul": "Petak tak utuh",
          "ketukan": [
            "Ada bangun yang sisi memotong petak tidak utuh.",
            "Yohana memotong bagian lebih dan menempel ke bagian kurang.",
            "Bentuk tampak berubah, tetapi luas tetap.",
            "METODE LUAR · Area Conservation: luas tidak berubah saat dipotong-tempel tanpa hilang."
          ],
          "papan": [
            "tak utuh",
            "potong-tempel",
            "luas tetap",
            "Conservation"
          ]
        },
        {
          "id": "K5B5A-V3-2",
          "judul": "Contoh 9",
          "ketukan": [
            "Setelah dirapikan jadi petak utuh, Yohana mendapat 9 satuan luas.",
            "Cara ini membantu memperkirakan luas bangun E, F, G di buku.",
            "Kunci: jangan buang atau menambah daerah.",
            "Hanya memindahkan."
          ],
          "papan": [
            "9 satuan",
            "E F G",
            "jangan buang",
            "pindah saja"
          ]
        },
        {
          "id": "K5B5A-V3-3",
          "judul": "Siap rumus",
          "ketukan": [
            "Konsep luas, satuan, pengubinan, dan konservasi sudah siap.",
            "Berikutnya kita temukan rumus cepat untuk tiap bangun.",
            "Dasarnya tetap covering dan array.",
            "Ayo lanjut Sub-Bab B!"
          ],
          "papan": [
            "konsep siap",
            "rumus berikutnya",
            "dasar covering",
            "lanjut B"
          ]
        }
      ]
    }
  ],
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
      "suara": "Definisi buku."
    },
    {
      "judul": "Satuan",
      "emoji": "📐",
      "countNum": 1,
      "countWord": "cm² / m²",
      "suara": "Persegi satuan."
    },
    {
      "judul": "Covering",
      "emoji": "🧩",
      "countNum": 1,
      "countWord": "Unit Square",
      "suara": "Tutup rapat."
    },
    {
      "judul": "Array",
      "emoji": "▦",
      "countNum": 10,
      "countWord": "5×2=10",
      "suara": "Baris×kolom."
    },
    {
      "judul": "Ubin",
      "emoji": "🧱",
      "countNum": 1,
      "countWord": "1 m²",
      "suara": "Denah rumah."
    },
    {
      "judul": "Alun-Alun",
      "emoji": "🏖️",
      "countNum": 1,
      "countWord": "butuh luas",
      "suara": "Konteks pasir."
    },
    {
      "judul": "Yohana",
      "emoji": "✂️",
      "countNum": 9,
      "countWord": "luas tetap",
      "suara": "Conservation."
    },
    {
      "judul": "Bukan K",
      "emoji": "⭕",
      "countNum": 1,
      "countWord": "path length",
      "suara": "Bab 4."
    },
    {
      "judul": "Metode",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "3 label luar",
      "suara": "Covering·Array·Conservation."
    },
    {
      "judul": "Siap B",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "rumus bangun",
      "suara": "Lanjut."
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
  "videos": [
    {
      "id": "K5B5B-V1",
      "judul": "PP dan Persegi",
      "subjudul": "p×l / s×s",
      "adegan": [
        {
          "id": "K5B5B-V1-1",
          "judul": "Temukan p×l",
          "ketukan": [
            "Dari petak, panjang 5 dan lebar 2 memberi 10 satuan luas.",
            "Pola: luas persegi panjang = panjang × lebar.",
            "Itu percepatan dari Array Model Sub-Bab A.",
            "Tulis L = p × l."
          ],
          "papan": [
            "5×2=10",
            "L=p×l",
            "dari array",
            "rumus PP"
          ]
        },
        {
          "id": "K5B5B-V1-2",
          "judul": "Persegi",
          "ketukan": [
            "Jika panjang sama lebar, bangun itu persegi.",
            "Luas = sisi × sisi.",
            "Atau tetap p × l dengan p = l.",
            "Contoh sisi 4 → luas 16."
          ],
          "papan": [
            "p=l",
            "L=s×s",
            "sisi 4",
            "16"
          ]
        },
        {
          "id": "K5B5B-V1-3",
          "judul": "Base×Height",
          "ketukan": [
            "Panjang dan lebar adalah alas dan tinggi yang saling tegak lurus.",
            "METODE LUAR · Base×Height Unification: banyak rumus luas memakai alas × tinggi.",
            "Simpan ide ini untuk jajar dan segitiga.",
            "Siap lanjut."
          ],
          "papan": [
            "alas×tinggi",
            "Base×Height",
            "tegak lurus",
            "lanjut"
          ]
        }
      ]
    },
    {
      "id": "K5B5B-V2",
      "judul": "Segitiga dan Jajar",
      "subjudul": "Dissection & Shear",
      "adegan": [
        {
          "id": "K5B5B-V2-1",
          "judul": "Dissection",
          "ketukan": [
            "Dua segitiga kongruen bisa digabung jadi satu persegi panjang.",
            "Maka luas satu segitiga setengah luas PP itu.",
            "Rumus: L = setengah × alas × tinggi.",
            "METODE LUAR · Dissection Method."
          ],
          "papan": [
            "2 segitiga→PP",
            "½ luas PP",
            "½×a×t",
            "Dissection"
          ]
        },
        {
          "id": "K5B5B-V2-2",
          "judul": "Shear",
          "ketukan": [
            "Jajargenjang bisa digeser menjadi persegi panjang sama alas dan tinggi.",
            "Luas tidak berubah saat digeser sejajar.",
            "Rumus: L = alas × tinggi.",
            "METODE LUAR · Shear Principle."
          ],
          "papan": [
            "geser jajar",
            "jadi PP",
            "a×t",
            "Shear"
          ]
        },
        {
          "id": "K5B5B-V2-3",
          "judul": "Contoh",
          "ketukan": [
            "Segitiga alas 6 tinggi 4 → luas 12.",
            "Jajar alas 8 tinggi 3 → luas 24.",
            "Jangan lupa: tinggi tegak lurus alas.",
            "Bukan sisi miring sembarang."
          ],
          "papan": [
            "½×6×4=12",
            "8×3=24",
            "tinggi ⊥",
            "hati-hati"
          ]
        }
      ]
    },
    {
      "id": "K5B5B-V3",
      "judul": "Trapesium, Belah, Layang",
      "subjudul": "Rumus lanjut",
      "adegan": [
        {
          "id": "K5B5B-V3-1",
          "judul": "Trapesium",
          "ketukan": [
            "Trapesium punya sepasang sisi sejajar.",
            "Luas = setengah × (jumlah sisi sejajar) × tinggi.",
            "Contoh alas 5 dan 3, tinggi 4 → 16.",
            "Bisa dibuktikan dengan dua segitiga atau potong-gabung."
          ],
          "papan": [
            "½(a+b)×t",
            "5&3 t4",
            "16",
            "sejajar"
          ]
        },
        {
          "id": "K5B5B-V3-2",
          "judul": "Diagonal",
          "ketukan": [
            "Belah ketupat: L = setengah × d1 × d2.",
            "Layang-layang rumusnya sama: setengah kali dua diagonal.",
            "Contoh d1=6 d2=4 → 12.",
            "Diagonal saling tegak lurus di bangun ini."
          ],
          "papan": [
            "½×d1×d2",
            "belah & layang",
            "6&4→12",
            "⊥ diagonal"
          ]
        },
        {
          "id": "K5B5B-V3-3",
          "judul": "Rangkum B",
          "ketukan": [
            "Simpan keluarga rumus: p×l, s×s, ½a t, a t, ½(a+b)t, ½ d1 d2.",
            "Semua bisa ditelusuri dari covering dan Base×Height.",
            "Siap ke bangun gabungan.",
            "Ayo Sub-Bab C!"
          ],
          "papan": [
            "keluarga rumus",
            "dari covering",
            "gabungan",
            "lanjut C"
          ]
        }
      ]
    }
  ],
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
      "suara": "5×2."
    },
    {
      "judul": "Persegi",
      "emoji": "⬜",
      "countNum": 16,
      "countWord": "s×s",
      "suara": "sisi 4."
    },
    {
      "judul": "Segitiga",
      "emoji": "🔺",
      "countNum": 12,
      "countWord": "½×a×t",
      "suara": "Dissection."
    },
    {
      "judul": "Jajar",
      "emoji": "▱",
      "countNum": 24,
      "countWord": "a×t",
      "suara": "Shear."
    },
    {
      "judul": "Trapesium",
      "emoji": "⏢",
      "countNum": 16,
      "countWord": "½(a+b)×t",
      "suara": "Sejajar."
    },
    {
      "judul": "Belah",
      "emoji": "◇",
      "countNum": 12,
      "countWord": "½×d1×d2",
      "suara": "Diagonal."
    },
    {
      "judul": "Layang",
      "emoji": "🪁",
      "countNum": 24,
      "countWord": "½×d1×d2",
      "suara": "Sama rumus."
    },
    {
      "judul": "Base×H",
      "emoji": "⊥",
      "countNum": 1,
      "countWord": "alas×tinggi",
      "suara": "Unifikasi."
    },
    {
      "judul": "Metode",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "3 label",
      "suara": "Dissection·Shear·Base×H."
    },
    {
      "judul": "Siap C",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "gabungan",
      "suara": "Lanjut."
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
  "videos": [
    {
      "id": "K5B5C-V1",
      "judul": "Mengapa Diurai?",
      "subjudul": "Composite",
      "adegan": [
        {
          "id": "K5B5C-V1-1",
          "judul": "Bangun aneh",
          "ketukan": [
            "Ada bangun yang tidak langsung cocok satu rumus saja.",
            "Kita membaginya menjadi bangun yang sudah dikenal.",
            "METODE LUAR · Composite Area Strategy: urai, hitung, jumlahkan.",
            "Pastikan bagian tidak saling menutup dua kali."
          ],
          "papan": [
            "tidak 1 rumus",
            "urai bagian",
            "Composite Area",
            "tanpa tindih"
          ]
        },
        {
          "id": "K5B5C-V1-2",
          "judul": "Sifat aditif",
          "ketukan": [
            "Jika dua daerah saling tempel tanpa tumpang tindih, luas total = jumlah luas.",
            "METODE LUAR · Additive Decomposition.",
            "Itu alasan menjumlahkan sah.",
            "Kalau tumpang tindih, jangan dihitung dua kali."
          ],
          "papan": [
            "aditif",
            "jumlah luas",
            "Additive",
            "jangan 2×"
          ]
        },
        {
          "id": "K5B5C-V1-3",
          "judul": "Dua cara",
          "ketukan": [
            "Boleh lebih dari satu cara mengurai.",
            "Hasil akhir harus sama jika semuanya benar.",
            "Itu alat cek silang.",
            "Siap lihat Yohana dan Komang."
          ],
          "papan": [
            "banyak cara",
            "hasil sama",
            "cek silang",
            "Yohana/Komang"
          ]
        }
      ]
    },
    {
      "id": "K5B5C-V2",
      "judul": "Cara Yohana & Komang",
      "subjudul": "Contoh buku",
      "adegan": [
        {
          "id": "K5B5C-V2-1",
          "judul": "Yohana",
          "ketukan": [
            "Yohana membagi bangun jadi layang-layang dan segitiga.",
            "Luas layang = setengah × d1 × d2.",
            "Luas segitiga = setengah × alas × tinggi.",
            "Jumlahkan keduanya."
          ],
          "papan": [
            "layang+segitiga",
            "½ d1 d2",
            "½ a t",
            "jumlah"
          ]
        },
        {
          "id": "K5B5C-V2-2",
          "judul": "Komang",
          "ketukan": [
            "Komang membagi jadi jajargenjang dan segitiga.",
            "Luas jajar = alas × tinggi.",
            "Luas segitiga lagi setengah alas tinggi.",
            "Jumlahkan: dapat luas gabungan yang sama target."
          ],
          "papan": [
            "jajar+segitiga",
            "a×t",
            "½ a t",
            "jumlah"
          ]
        },
        {
          "id": "K5B5C-V2-3",
          "judul": "Angka latihan",
          "ketukan": [
            "Contoh latihan: 12 plus 8 sama dengan 20.",
            "Atau 24 plus 12 sama dengan 36.",
            "Fokus pada langkah, bukan menebak.",
            "Tulis rumus tiap bagian dulu."
          ],
          "papan": [
            "12+8=20",
            "24+12=36",
            "langkah",
            "tulis rumus"
          ]
        }
      ]
    },
    {
      "id": "K5B5C-V3",
      "judul": "Aturan Aman",
      "subjudul": "Cek",
      "adegan": [
        {
          "id": "K5B5C-V3-1",
          "judul": "Checklist",
          "ketukan": [
            "Satu: gambar garis uraian yang jelas.",
            "Dua: setiap bagian punya rumus.",
            "Tiga: tidak ada daerah terlewat atau dobel.",
            "Empat: jumlahkan dengan satuan sama."
          ],
          "papan": [
            "garis uraian",
            "ada rumus",
            "tak dobel",
            "satuan sama"
          ]
        },
        {
          "id": "K5B5C-V3-2",
          "judul": "Validasi",
          "ketukan": [
            "Jika sempat, hitung dengan cara uraian kedua.",
            "Hasil harus cocok.",
            "Kalau beda, cari bagian yang keliru.",
            "Itu kebiasaan matematikawan kecil."
          ],
          "papan": [
            "cara 2",
            "hasil cocok",
            "cari salah",
            "kebiasaan"
          ]
        },
        {
          "id": "K5B5C-V3-3",
          "judul": "Siap D",
          "ketukan": [
            "Gabungan luas siap.",
            "Berikutnya: keliling sama, luas bisa beda.",
            "Hubungan K dan L.",
            "Ayo Sub-Bab D!"
          ],
          "papan": [
            "C siap",
            "K vs L",
            "isoperimetric",
            "lanjut D"
          ]
        }
      ]
    }
  ],
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
      "suara": "Langkah 1."
    },
    {
      "judul": "Yohana",
      "emoji": "🪁",
      "countNum": 1,
      "countWord": "layang+△",
      "suara": "Buku."
    },
    {
      "judul": "Komang",
      "emoji": "▱",
      "countNum": 1,
      "countWord": "jajar+△",
      "suara": "Buku."
    },
    {
      "judul": "Jumlah",
      "emoji": "➕",
      "countNum": 20,
      "countWord": "12+8",
      "suara": "Additive."
    },
    {
      "judul": "24+12",
      "emoji": "🔢",
      "countNum": 36,
      "countWord": "36",
      "suara": "Contoh."
    },
    {
      "judul": "Composite",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "urai+hitung+Σ",
      "suara": "Metode luar."
    },
    {
      "judul": "Tak tindih",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "jangan 2×",
      "suara": "Aturan."
    },
    {
      "judul": "Validasi",
      "emoji": "🔍",
      "countNum": 1,
      "countWord": "dua cara",
      "suara": "Cek."
    },
    {
      "judul": "Satuan",
      "emoji": "📐",
      "countNum": 1,
      "countWord": "sama",
      "suara": "cm²."
    },
    {
      "judul": "Siap D",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "K dan L",
      "suara": "Lanjut."
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
  "videos": [
    {
      "id": "K5B5D-V1",
      "judul": "Kawat 60 cm",
      "subjudul": "Syarat K",
      "adegan": [
        {
          "id": "K5B5D-V1-1",
          "judul": "Kerangka",
          "ketukan": [
            "Bapak punya kawat 60 cm untuk kerangka persegi panjang.",
            "Keliling kerangka = 60 cm.",
            "Jadi 2(p + l) = 60, atau p + l = 30.",
            "Banyak cara memilih p dan l."
          ],
          "papan": [
            "kawat 60",
            "K=60",
            "p+l=30",
            "banyak cara"
          ]
        },
        {
          "id": "K5B5D-V1-2",
          "judul": "Tabel buku",
          "ketukan": [
            "Contoh: panjang 20 lebar 10 → K=60, L=200.",
            "Panjang 25 lebar 5 → K=60, L=125.",
            "Keliling sama, luas berbeda!",
            "METODE LUAR · Isoperimetric Relationship."
          ],
          "papan": [
            "20×10→200",
            "25×5→125",
            "K sama",
            "L beda"
          ]
        },
        {
          "id": "K5B5D-V1-3",
          "judul": "Aplikasi",
          "ketukan": [
            "Kawat dan pagar butuh keliling.",
            "Ubin, cat lantai, pasir butuh luas.",
            "Jangan memakai angka K untuk menjawab pertanyaan L.",
            "Pilih konsep sesuai kebutuhan."
          ],
          "papan": [
            "kawat→K",
            "ubin→L",
            "jangan tertukar",
            "sesuai kebutuhan"
          ]
        }
      ]
    },
    {
      "id": "K5B5D-V2",
      "judul": "Mencari yang Terluas",
      "subjudul": "Maximize Area",
      "adegan": [
        {
          "id": "K5B5D-V2-1",
          "judul": "Bandingkan",
          "ketukan": [
            "Di antara pasangan dengan p + l = 30, hitung luas p × l.",
            "20×10=200, 18×12=216, 15×15=225, 28×2=56.",
            "Yang mendekati persegi lebih luas.",
            "Yang sangat pipih luasnya kecil."
          ],
          "papan": [
            "banding L",
            "15×15=225",
            "28×2=56",
            "dekat persegi"
          ]
        },
        {
          "id": "K5B5D-V2-2",
          "judul": "Intuisi",
          "ketukan": [
            "METODE LUAR · Fixed Perimeter Maximize Area.",
            "Untuk keliling tetap, daerah terbesar cenderung bentuk paling 'gendut' atau mendekati bundar/persegi.",
            "Di kelas 5 cukup amati tabel: persegi menang di antara PP.",
            "Tidak perlu rumus lanjutan."
          ],
          "papan": [
            "Fixed Perimeter",
            "maksimalkan L",
            "gendut/persegi",
            "tabel cukup"
          ]
        },
        {
          "id": "K5B5D-V2-3",
          "judul": "Hati-hati",
          "ketukan": [
            "Jangan bilang keliling besar otomatis luas besar tanpa konteks.",
            "Di soal ini keliling dikunci sama.",
            "Yang berubah hanya pasangan p dan l.",
            "Fokus pada perbandingan luas."
          ],
          "papan": [
            "K dikunci",
            "p,l berubah",
            "banding L",
            "fokus"
          ]
        }
      ]
    },
    {
      "id": "K5B5D-V3",
      "judul": "Rangkum Bab 5",
      "subjudul": "A–D",
      "adegan": [
        {
          "id": "K5B5D-V3-1",
          "judul": "Alur bab",
          "ketukan": [
            "A: konsep covering dan array.",
            "B: rumus bangun lewat dissection dan shear.",
            "C: gabungan aditif.",
            "D: K tetap, L bisa beda."
          ],
          "papan": [
            "A konsep",
            "B rumus",
            "C gabungan",
            "D K vs L"
          ]
        },
        {
          "id": "K5B5D-V3-2",
          "judul": "Label metode",
          "ketukan": [
            "Unit Square Covering, Array Model, Area Conservation.",
            "Dissection, Shear, Base×Height.",
            "Additive Decomposition, Composite Area.",
            "Isoperimetric Relationship."
          ],
          "papan": [
            "Covering/Array",
            "Dissection/Shear",
            "Additive",
            "Isoperimetric"
          ]
        },
        {
          "id": "K5B5D-V3-3",
          "judul": "Siap materi",
          "ketukan": [
            "Materi Tab Materi Bab 5 Sub-Bab A sampai D siap dimainkan.",
            "Latihan dan ujian menyusul instruksi terpisah.",
            "Mainkan permainan Concrete, Picture, Abstract.",
            "Hebat sudah sampai sini!"
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
      "suara": "Syarat."
    },
    {
      "judul": "p+l",
      "emoji": "➕",
      "countNum": 30,
      "countWord": "30",
      "suara": "Turunan."
    },
    {
      "judul": "20×10",
      "emoji": "▭",
      "countNum": 200,
      "countWord": "L=200",
      "suara": "Buku."
    },
    {
      "judul": "25×5",
      "emoji": "📏",
      "countNum": 125,
      "countWord": "L=125",
      "suara": "Pipih."
    },
    {
      "judul": "15×15",
      "emoji": "⬜",
      "countNum": 225,
      "countWord": "L=225",
      "suara": "Terluas PP."
    },
    {
      "judul": "28×2",
      "emoji": "➖",
      "countNum": 56,
      "countWord": "L=56",
      "suara": "Sangat pipih."
    },
    {
      "judul": "Isoperimetric",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "K sama ≠ L sama",
      "suara": "Metode luar."
    },
    {
      "judul": "Kawat",
      "emoji": "🧵",
      "countNum": 1,
      "countWord": "keliling",
      "suara": "Aplikasi K."
    },
    {
      "judul": "Ubin/cat",
      "emoji": "🧱",
      "countNum": 1,
      "countWord": "luas",
      "suara": "Aplikasi L."
    },
    {
      "judul": "Bab 5",
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
