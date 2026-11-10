/**
 * Naskah murni Matematika Kelas 5 Bab 1 (Bilangan Cacah sampai 100.000): Sub-Bab A–D.
 * Sumber: Buku Siswa Matematika Kelas V Kemendikbudristek Bab 1 hlm. 1–25.
 * Satu sumber: buat-k5-bab1.mjs → kelas5-bab1.json. Tanpa React/jaringan.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K5B1_META = {
  "chapterId": "k5-mat-bab1",
  "phaseCode": "FASE_C",
  "grade": 5,
  "subjectLabel": "MATEMATIKA - KELAS 5 SD",
  "title": "BAB 1: BILANGAN CACAH SAMPAI 100.000",
  "silabusElemen": "🌈 Fase C • Elemen Bilangan: Membaca–Menulis, Nilai Tempat, Membandingkan–Mengurutkan, Komposisi–Dekomposisi, serta Operasi Hitung Bilangan Cacah sampai 100.000 (Kelas 5 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A51: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Membaca, Menulis, Nilai Tempat)",
  "fullTitle": "Sub-Bab A: Membaca dan Menulis Bilangan Cacah Sampai 100.000 dan Menentukan Nilai Tempatnya",
  "targetDescription": "Siswa membaca dan menulis bilangan cacah sampai 100.000 serta menentukan digit dan nilai pada tempat puluh ribuan, ribuan, ratusan, puluhan, dan satuan sesuai Buku Siswa Kelas V Bab 1.",
  "secondaryBg": "#FFEDD5",
  "secondaryBorder": "#EA580C",
  "secondaryText": "#7C2D12",
  "silabus": {
    "teksSuara": "Kita belajar bilangan cacah sampai seratus ribu. Kita membaca lambang, menulis dari kata, dan mengisi papan puluh ribuan sampai satuan. Nol tetap ditulis agar tempat tidak bergeser. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa membaca, menuliskan, dan menentukan nilai tempat bilangan cacah sampai 100.000.",
    "referensi": "Buku Siswa Matematika Kelas V Bab 1 Sub-Bab A hlm. 4–9; place-value chart; Dienes multi-base blocks (extended to ten-thousands)."
  },
  "videos": [
    {
      "id": "K5B1A-V1",
      "judul": "Lima Tempat Baru",
      "subjudul": "Puluh ribuan",
      "adegan": [
        {
          "id": "K5B1A-V1-1",
          "judul": "Lebih dari empat angka",
          "ketukan": [
            "Di kelas empat kita sampai sepuluh ribu.",
            "Sekarang ada puluh ribuan.",
            "Lima tempat: PR, RB, R, P, S.",
            "Paling kiri adalah puluh ribuan."
          ],
          "papan": [
            "4 angka",
            "puluh ribuan",
            "5 tempat",
            "dari kiri"
          ]
        },
        {
          "id": "K5B1A-V1-2",
          "judul": "Contoh empat belas ribu",
          "ketukan": [
            "Empat belas ribu lima ratus.",
            "Ditulis satu empat titik lima nol nol.",
            "Satu di puluh ribuan.",
            "Empat di ribuan."
          ],
          "papan": [
            "14.500",
            "PR=1",
            "RB=4",
            "R=5"
          ]
        },
        {
          "id": "K5B1A-V1-3",
          "judul": "Nol menjaga tempat",
          "ketukan": [
            "Puluhan dan satuan bernilai nol.",
            "Nol tetap ditulis.",
            "Tanpa nol, tempat bergeser.",
            "Ingat selalu isi kolom."
          ],
          "papan": [
            "nol",
            "tetap tulis",
            "jangan geser",
            "isi kolom"
          ]
        }
      ]
    },
    {
      "id": "K5B1A-V2",
      "judul": "Membaca Lima Angka",
      "subjudul": "Dari kiri",
      "adegan": [
        {
          "id": "K5B1A-V2-1",
          "judul": "Enam puluh enam ribu",
          "ketukan": [
            "Lihat enam enam lima nol nol.",
            "Baca puluh ribuan dan ribuan dulu.",
            "Enam puluh enam ribu.",
            "Lalu lima ratus."
          ],
          "papan": [
            "66.500",
            "66 ribu",
            "lima ratus",
            "gabung"
          ]
        },
        {
          "id": "K5B1A-V2-2",
          "judul": "Penduduk dan data",
          "ketukan": [
            "Angka besar sering muncul di data.",
            "Dua puluh enam ribu sembilan ratus tiga puluh dua.",
            "Latih membaca perlahan.",
            "Pisahkan ribuan dengan titik."
          ],
          "papan": [
            "26.932",
            "titik",
            "perlahan",
            "latihan"
          ]
        },
        {
          "id": "K5B1A-V2-3",
          "judul": "Nilai digit tujuh",
          "ketukan": [
            "Pada delapan tujuh sembilan delapan enam.",
            "Digit tujuh ada di ribuan.",
            "Nilainya tujuh ribu.",
            "Bukan tujuh puluh ribu."
          ],
          "papan": [
            "87.986",
            "digit 7",
            "ribuan",
            "7.000"
          ]
        }
      ]
    },
    {
      "id": "K5B1A-V3",
      "judul": "Menulis dari Kata",
      "subjudul": "Isi papan",
      "adegan": [
        {
          "id": "K5B1A-V3-1",
          "judul": "Dengar kata, isi kolom",
          "ketukan": [
            "Dengar empat belas ribu lima ratus.",
            "Isi puluh ribuan satu.",
            "Isi ribuan empat.",
            "Isi ratusan lima, lalu nol nol."
          ],
          "papan": [
            "dengar",
            "PR",
            "RB",
            "R P S"
          ]
        },
        {
          "id": "K5B1A-V3-2",
          "judul": "Jangan lupa nol",
          "ketukan": [
            "Jika tidak ada puluhan, tulis nol.",
            "Jika tidak ada satuan, tulis nol.",
            "Kolom harus lengkap.",
            "Hasilnya empat belas ribu lima ratus."
          ],
          "papan": [
            "nol P",
            "nol S",
            "lengkap",
            "14.500"
          ]
        },
        {
          "id": "K5B1A-V3-3",
          "judul": "Siap bermain",
          "ketukan": [
            "Kita sudah bisa baca dan tulis.",
            "Nilai tempat sudah jelas.",
            "Ayo ke permainan.",
            "Semangat!"
          ],
          "papan": [
            "baca",
            "tulis",
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
      "stepTitle": "1. Bilangan cacah",
      "stepDesc": "0, 1, 2, … sampai 100.000",
      "icon": "🔢",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Lima tempat",
      "stepDesc": "PR, RB, R, P, S",
      "icon": "🏛️",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Membaca",
      "stepDesc": "Dari kiri, gabungkan kata",
      "icon": "📢",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Menulis",
      "stepDesc": "Isi tiap kolom dari kata",
      "icon": "✍️",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Nilai digit",
      "stepDesc": "Digit × nilai tempat",
      "icon": "✖️",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Peran nol",
      "stepDesc": "Menjaga agar tempat tidak bergeser",
      "icon": "0️⃣",
      "flowFrom": "5",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "Puluh ribuan",
      "emoji": "🔟",
      "countNum": 10000,
      "countWord": "10.000",
      "suara": "Satu di puluh ribuan bernilai sepuluh ribu."
    },
    {
      "judul": "Ribuan",
      "emoji": "1️⃣",
      "countNum": 1000,
      "countWord": "1.000",
      "suara": "Satu di ribuan bernilai seribu."
    },
    {
      "judul": "Ratusan",
      "emoji": "💯",
      "countNum": 100,
      "countWord": "100",
      "suara": "Satu di ratusan bernilai seratus."
    },
    {
      "judul": "Puluhan",
      "emoji": "🔟",
      "countNum": 10,
      "countWord": "10",
      "suara": "Satu di puluhan bernilai sepuluh."
    },
    {
      "judul": "Satuan",
      "emoji": "1️⃣",
      "countNum": 1,
      "countWord": "1",
      "suara": "Satu di satuan bernilai satu."
    },
    {
      "judul": "14.500",
      "emoji": "📘",
      "countNum": 14500,
      "countWord": "contoh buku",
      "suara": "Empat belas ribu lima ratus."
    },
    {
      "judul": "66.500",
      "emoji": "💊",
      "countNum": 66500,
      "countWord": "contoh baca",
      "suara": "Enam puluh enam ribu lima ratus."
    },
    {
      "judul": "Nol",
      "emoji": "0️⃣",
      "countNum": 0,
      "countWord": "penjaga",
      "suara": "Nol menjaga nilai tempat."
    },
    {
      "judul": "Titik",
      "emoji": "·",
      "countNum": 1,
      "countWord": "pemisah",
      "suara": "Titik memisahkan ribuan."
    },
    {
      "judul": "Siap B",
      "emoji": "⚖️",
      "countNum": 1,
      "countWord": "banding",
      "suara": "Berikutnya banding dan urut."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "baca-lima",
      "title": "Baca Bilangan Lima Angka",
      "bookReference": "hlm. 7–9",
      "objective": "Membaca lambang → kata.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih kata.",
      "emoji": "📢",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tulis-lima",
      "title": "Tulis dari Kata Bilangan",
      "bookReference": "hlm. 5–6",
      "objective": "Menulis lambang dari kata.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih lambang.",
      "emoji": "✍️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "nilai-tempat",
      "title": "Tentukan Nilai Tempat",
      "bookReference": "hlm. 6–9",
      "objective": "Digit & nilai tempat.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "🏛️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-digit",
      "title": "Pilah Lima/Empat Angka",
      "bookReference": "hlm. 4–7",
      "objective": "Memilah panjang bilangan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-baca",
      "title": "Jodohkan Lambang–Kata",
      "bookReference": "hlm. 8–9",
      "objective": "Menjodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-baca",
      "title": "Memori Lambang–Kata",
      "bookReference": "hlm. 7–9",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-bilangan",
      "title": "Ketuk Bilangan Diminta",
      "bookReference": "hlm. 7–9",
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
      "bookReference": "hlm. 6–9",
      "objective": "Ketuk semua.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-baca",
      "title": "Cerita Buku dan Penduduk",
      "bookReference": "hlm. 5–8",
      "objective": "Soal cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-nilai",
      "title": "Urutkan Bilangan Baca",
      "bookReference": "hlm. 7–9",
      "objective": "Mengurutkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "papan-baca",
      "title": "Papan Baca Bilangan",
      "bookReference": "hlm. 6–7",
      "objective": "Baca papan tempat.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "board",
      "numberA": 1,
      "numberB": 5
    },
    {
      "stage": "Picture",
      "gameType": "papan-tempat",
      "title": "Papan Nilai Tempat",
      "bookReference": "hlm. 6–9",
      "objective": "Digit per kolom.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "place",
      "numberA": 1,
      "numberB": 5
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-a",
      "title": "Jodohkan Diagram Tempat",
      "bookReference": "hlm. 6–9",
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
      "title": "Memori Diagram Tempat",
      "bookReference": "hlm. 6–9",
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
      "title": "Tabel Tempat–Nilai",
      "bookReference": "hlm. 6–9",
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
      "bookReference": "hlm. 6–9",
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
      "title": "Pilah Diagram Panjang",
      "bookReference": "hlm. 4–7",
      "objective": "Pilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "model-blok",
      "title": "Model Blok Tempat",
      "bookReference": "hlm. 6",
      "objective": "Baca model.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "blocks",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "choose-a",
      "title": "Pilih Bacaan Cocok",
      "bookReference": "hlm. 7–9",
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
      "title": "Cerita Diagram Tempat",
      "bookReference": "hlm. 5–9",
      "objective": "Cerita + papan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-kata",
      "title": "Tulis Kata Bilangan",
      "bookReference": "hlm. 7–9",
      "objective": "Menulis kata.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "Aa",
      "wordLarge": "KATA",
      "mathNotation": "baca"
    },
    {
      "stage": "Abstract",
      "gameType": "write-lambang",
      "title": "Tulis Lambang Bilangan",
      "bookReference": "hlm. 5–6",
      "objective": "Menulis angka.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "14.500",
      "wordLarge": "LAMBANG",
      "mathNotation": "tulis"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-tempat",
      "title": "Pilih Nama Tempat",
      "bookReference": "hlm. 6–9",
      "objective": "PR/RB/R/P/S.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "PR",
      "wordLarge": "TEMPAT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-a",
      "title": "Urutkan Lambang",
      "bookReference": "hlm. 7–9",
      "objective": "Mengurutkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "symbolLarge": "14k<26k",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-a",
      "title": "Jodohkan Notasi Tempat",
      "bookReference": "hlm. 6–9",
      "objective": "Jodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "symbolLarge": "7→rb",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-a",
      "title": "Memori Notasi Tempat",
      "bookReference": "hlm. 6–9",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "symbolLarge": "nol",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-a",
      "title": "Benar atau Salah: Tempat",
      "bookReference": "hlm. 4–9",
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
      "title": "Detektif Bilangan Lima",
      "bookReference": "hlm. 5–9",
      "objective": "Petunjuk → bilangan.",
      "mechanicDescription": "Tiga soal.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-a",
      "title": "Peta Konsep Nilai Tempat",
      "bookReference": "hlm. 2–9",
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
      "title": "Cerita Angka Tempat",
      "bookReference": "hlm. 5–9",
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
      "ikon": "🏛️",
      "nama": "Lima tempat",
      "isi": "Puluh ribuan, ribuan, ratusan, puluhan, satuan.",
      "suara": "Ada lima tempat nilai."
    },
    {
      "ikon": "📢",
      "nama": "Membaca",
      "isi": "Baca dari kiri, gabungkan kata puluh ribuan dan ribuan dulu.",
      "suara": "Baca dari kiri."
    },
    {
      "ikon": "✍️",
      "nama": "Menulis",
      "isi": "Isi setiap kolom tempat sesuai kata bilangan.",
      "suara": "Isi kolom satu per satu."
    },
    {
      "ikon": "0️⃣",
      "nama": "Nol",
      "isi": "Nol tetap ditulis agar tempat tidak bergeser.",
      "suara": "Nol menjaga tempat."
    }
  ],
  "poinSuara": "Ingat empat kunci: lima tempat, baca dari kiri, tulis per kolom, dan nol penjaga.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Gambar papan 5 kolom",
        "warna": "#FDE68A"
      },
      {
        "teks": "Isi dari kiri",
        "warna": "#BBF7D0"
      },
      {
        "teks": "Tulis nol jika kosong",
        "warna": "#BFDBFE"
      },
      {
        "teks": "Baca & cek",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: catat 3 bilangan lima angka dari koran atau papan skor, tulis di papan PR–S, dan baca keras-keras.",
  "refleksi": [
    "Mengapa nol tetap ditulis?",
    "Apa beda nilai digit 7 di ribuan dan di puluh ribuan?",
    "Bagaimana menulis 'empat puluh ribu tiga ratus lima puluh'?"
  ]
};

export const SUB_B51: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Membandingkan dan Mengurutkan)",
  "fullTitle": "Sub-Bab B: Membandingkan dan Mengurutkan Bilangan Cacah Sampai 100.000",
  "targetDescription": "Siswa membandingkan bilangan sampai 100.000 dengan strategi nilai tempat dari kiri, memakai tanda > < =, serta mengurutkan menaik dan menurun sesuai Buku Siswa Kelas V Bab 1.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Kita belajar membandingkan dan mengurutkan bilangan sampai seratus ribu. Mulai dari puluh ribuan. Jika sama, lanjut ke ribuan, dan seterusnya. Kita memakai tanda lebih besar, lebih kecil, atau sama dengan. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa membandingkan dan mengurutkan bilangan cacah sampai 100.000.",
    "referensi": "Buku Siswa Matematika Kelas V Bab 1 Sub-Bab B hlm. 10–15; place-value comparison algorithm; number line ordering."
  },
  "videos": [
    {
      "id": "K5B1B-V1",
      "judul": "Banding dari Kiri",
      "subjudul": "Puluh ribuan dulu",
      "adegan": [
        {
          "id": "K5B1B-V1-1",
          "judul": "Dua bilangan",
          "ketukan": [
            "Lihat dua bilangan lima angka.",
            "Mulai dari puluh ribuan.",
            "Yang digitnya lebih besar, bilangannya lebih besar.",
            "Jika sama, lanjut ke kanan."
          ],
          "papan": [
            "dua bilangan",
            "PR dulu",
            "lebih besar",
            "lanjut kanan"
          ]
        },
        {
          "id": "K5B1B-V1-2",
          "judul": "Contoh dakon",
          "ketukan": [
            "Lima enam ribu dan tujuh lima ribu.",
            "Puluh ribuan lima versus tujuh.",
            "Tujuh lebih besar.",
            "Jadi tujuh lima ribu lebih besar."
          ],
          "papan": [
            "56rb",
            "75rb",
            "PR 7",
            "lebih besar"
          ]
        },
        {
          "id": "K5B1B-V1-3",
          "judul": "Jika PR sama",
          "ketukan": [
            "Lima enam dan lima tujuh.",
            "Puluh ribuan sama.",
            "Bandingkan ribuan.",
            "Tujuh lebih besar dari enam."
          ],
          "papan": [
            "PR sama",
            "cek RB",
            "7>6",
            "keputusan"
          ]
        }
      ]
    },
    {
      "id": "K5B1B-V2",
      "judul": "Tanda dan Urutan",
      "subjudul": "> < =",
      "adegan": [
        {
          "id": "K5B1B-V2-1",
          "judul": "Tiga tanda",
          "ketukan": [
            "Lebih besar memakai tanda ini.",
            "Lebih kecil memakai tanda itu.",
            "Sama memakai sama dengan.",
            "Latih sampai otomatis."
          ],
          "papan": [
            ">",
            "<",
            "=",
            "latihan"
          ]
        },
        {
          "id": "K5B1B-V2-2",
          "judul": "Urut naik",
          "ketukan": [
            "Dari yang paling kecil.",
            "Ke yang paling besar.",
            "Itu urutan menaik.",
            "Berguna memilih yang termurah."
          ],
          "papan": [
            "kecil",
            "besar",
            "menaik",
            "termurah"
          ]
        },
        {
          "id": "K5B1B-V2-3",
          "judul": "Urut turun",
          "ketukan": [
            "Dari yang paling besar.",
            "Ke yang paling kecil.",
            "Itu urutan menurun.",
            "Berguna mencari yang terbesar."
          ],
          "papan": [
            "besar",
            "kecil",
            "menurun",
            "terbesar"
          ]
        }
      ]
    },
    {
      "id": "K5B1B-V3",
      "judul": "Latihan Dakon",
      "subjudul": "Empat bilangan",
      "adegan": [
        {
          "id": "K5B1B-V3-1",
          "judul": "Empat harga",
          "ketukan": [
            "Ada empat bilangan dakon.",
            "Cari yang terkecil.",
            "Cari yang terbesar.",
            "Lalu urutkan semua."
          ],
          "papan": [
            "empat",
            "terkecil",
            "terbesar",
            "urut"
          ]
        },
        {
          "id": "K5B1B-V3-2",
          "judul": "Pola seribu",
          "ketukan": [
            "Lima belas ribu lima ratus.",
            "Enam belas ribu lima ratus.",
            "Naik seribu tiap langkah.",
            "Pola membantu mengisi."
          ],
          "papan": [
            "15.500",
            "16.500",
            "+1000",
            "pola"
          ]
        },
        {
          "id": "K5B1B-V3-3",
          "judul": "Siap bermain",
          "ketukan": [
            "Strategi banding sudah siap.",
            "Tanda dan urutan sudah jelas.",
            "Ayo ke permainan.",
            "Semangat!"
          ],
          "papan": [
            "strategi",
            "tanda",
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
      "stepTitle": "1. Dua bilangan",
      "stepDesc": "Siapkan lambang sejajar",
      "icon": "🔢",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Mulai PR",
      "stepDesc": "Bandingkan puluh ribuan",
      "icon": "⬅️",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Jika sama",
      "stepDesc": "Lanjut RB → R → P → S",
      "icon": "➡️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Tanda",
      "stepDesc": "Tuliskan > < atau =",
      "icon": "⚖️",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Urut naik",
      "stepDesc": "Kecil ke besar",
      "icon": "📶",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Urut turun",
      "stepDesc": "Besar ke kecil",
      "icon": "📉",
      "flowFrom": "5",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "Mulai kiri",
      "emoji": "⬅️",
      "countNum": 1,
      "countWord": "PR dulu",
      "suara": "Bandingkan puluh ribuan lebih dulu."
    },
    {
      "judul": "Lanjut",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "RB berikutnya",
      "suara": "Jika sama, cek ribuan."
    },
    {
      "judul": ">",
      "emoji": "🔼",
      "countNum": 1,
      "countWord": "lebih besar",
      "suara": "Tanda lebih besar."
    },
    {
      "judul": "<",
      "emoji": "🔽",
      "countNum": 1,
      "countWord": "lebih kecil",
      "suara": "Tanda lebih kecil."
    },
    {
      "judul": "=",
      "emoji": "🟰",
      "countNum": 1,
      "countWord": "sama",
      "suara": "Semua digit sama."
    },
    {
      "judul": "56.560",
      "emoji": "🎲",
      "countNum": 56560,
      "countWord": "dakon kecil",
      "suara": "Contoh bilangan lebih kecil."
    },
    {
      "judul": "75.360",
      "emoji": "🏆",
      "countNum": 75360,
      "countWord": "dakon besar",
      "suara": "Contoh bilangan lebih besar."
    },
    {
      "judul": "Menaik",
      "emoji": "📶",
      "countNum": 1,
      "countWord": "kecil→besar",
      "suara": "Urutan dari kecil."
    },
    {
      "judul": "Menurun",
      "emoji": "📉",
      "countNum": 1,
      "countWord": "besar→kecil",
      "suara": "Urutan dari besar."
    },
    {
      "judul": "Bab 1 A–B",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "siap",
      "suara": "Baca-tempat dan banding siap."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "banding-tanda",
      "title": "Isi Tanda Banding",
      "bookReference": "hlm. 14–15",
      "objective": ">, <, =.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih tanda.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "strategi-banding",
      "title": "Strategi dari Kiri",
      "bookReference": "hlm. 11–13",
      "objective": "Mulai puluh ribuan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "⬅️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "pilih-ekstrem",
      "title": "Paling Besar/Kecil",
      "bookReference": "hlm. 10–13",
      "objective": "Cari ekstrem.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "🏆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-ukuran",
      "title": "Pilah Besar/Kecil",
      "bookReference": "hlm. 10–13",
      "objective": "Memilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-banding",
      "title": "Jodohkan Hasil Banding",
      "bookReference": "hlm. 14–15",
      "objective": "Menjodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-banding",
      "title": "Memori Banding",
      "bookReference": "hlm. 14–15",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-bilangan-b",
      "title": "Ketuk Bilangan Banding",
      "bookReference": "hlm. 10–14",
      "objective": "Mengetuk.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-b",
      "title": "Ketuk Semua Sesuai Batas",
      "bookReference": "hlm. 10–14",
      "objective": "Ketuk semua.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-dakon",
      "title": "Cerita Dakon dan Urutan",
      "bookReference": "hlm. 10–13",
      "objective": "Soal cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "🎲",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-banding",
      "title": "Urutkan Naik/Turun",
      "bookReference": "hlm. 13–15",
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
      "bookReference": "hlm. 14–15",
      "objective": "Baca tanda.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "cmp",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "diagram-urut",
      "title": "Diagram Urutan",
      "bookReference": "hlm. 13",
      "objective": "Baca urutan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "ord",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-b",
      "title": "Jodohkan Diagram Banding",
      "bookReference": "hlm. 14–15",
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
      "title": "Memori Diagram Banding",
      "bookReference": "hlm. 14–15",
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
      "title": "Tabel Banding",
      "bookReference": "hlm. 14–15",
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
      "title": "Ketuk Semua Diagram",
      "bookReference": "hlm. 10–14",
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
      "title": "Pilah Diagram Ukuran",
      "bookReference": "hlm. 10–13",
      "objective": "Pilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "papan-banding",
      "title": "Papan Banding Tempat",
      "bookReference": "hlm. 11–12",
      "objective": "Banding kolom.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "board",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "choose-b",
      "title": "Pilih Strategi Cocok",
      "bookReference": "hlm. 11–14",
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
      "title": "Cerita Diagram Banding",
      "bookReference": "hlm. 10–15",
      "objective": "Cerita + diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-tanda",
      "title": "Tulis Tanda Banding",
      "bookReference": "hlm. 15",
      "objective": "Menulis > < =.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "><=",
      "wordLarge": "TANDA",
      "mathNotation": "banding"
    },
    {
      "stage": "Abstract",
      "gameType": "write-ekstrem",
      "title": "Tulis Bilangan Ekstrem",
      "bookReference": "hlm. 13",
      "objective": "Menulis ekstrem.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "min/max",
      "wordLarge": "EKSTREEM",
      "mathNotation": "urut"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-strategi",
      "title": "Pilih Langkah Banding",
      "bookReference": "hlm. 11–13",
      "objective": "Strategi tempat.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "PR→RB",
      "wordLarge": "STRATEGI",
      "mathNotation": "kiri"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-b",
      "title": "Urutkan Abstrak",
      "bookReference": "hlm. 13–15",
      "objective": "Mengurutkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "symbolLarge": "naik",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-b",
      "title": "Jodohkan Notasi Banding",
      "bookReference": "hlm. 14–15",
      "objective": "Jodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "symbolLarge": "a?b",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-b",
      "title": "Memori Notasi Banding",
      "bookReference": "hlm. 14–15",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "symbolLarge": "urut",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-b",
      "title": "Benar atau Salah: Banding",
      "bookReference": "hlm. 10–15",
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
      "title": "Detektif Banding Urut",
      "bookReference": "hlm. 10–15",
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
      "title": "Peta Konsep Banding",
      "bookReference": "hlm. 2–14",
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
      "title": "Cerita Angka Banding",
      "bookReference": "hlm. 10–15",
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
      "ikon": "⬅️",
      "nama": "Dari kiri",
      "isi": "Bandingkan mulai puluh ribuan, lalu tempat berikutnya.",
      "suara": "Mulai dari puluh ribuan."
    },
    {
      "ikon": "⚖️",
      "nama": "Tanda",
      "isi": "Gunakan > , < , atau = sesuai hasil banding.",
      "suara": "Pilih tanda yang tepat."
    },
    {
      "ikon": "📶",
      "nama": "Urut naik",
      "isi": "Susun dari bilangan terkecil ke terbesar.",
      "suara": "Kecil ke besar."
    },
    {
      "ikon": "📉",
      "nama": "Urut turun",
      "isi": "Susun dari bilangan terbesar ke terkecil.",
      "suara": "Besar ke kecil."
    }
  ],
  "poinSuara": "Ingat empat kunci banding: dari kiri, tanda, urut naik, dan urut turun.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Sejajarkan digit",
        "warna": "#FDE68A"
      },
      {
        "teks": "Banding PR→S",
        "warna": "#BBF7D0"
      },
      {
        "teks": "Tulis tanda",
        "warna": "#BFDBFE"
      },
      {
        "teks": "Urutkan jika diminta",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: tulis 4 bilangan lima angka, bandingkan berpasangan dengan tanda, lalu urutkan naik dan turun.",
  "refleksi": [
    "Mengapa banding dimulai dari puluh ribuan?",
    "Kapan hasil banding menjadi sama dengan?",
    "Apa beda urut naik dan urut turun?"
  ]
};

export const SUB_C51: SubBabNaskah = {
  "id": "C",
  "codeTitle": "Sub-Bab C (Komposisi dan Dekomposisi)",
  "fullTitle": "Sub-Bab C: Komposisi dan Dekomposisi Bilangan Cacah Sampai 100.000",
  "targetDescription": "Siswa menyusun bilangan dari pecahan nilai tempat (komposisi) dan menguraikannya ke bentuk panjang (dekomposisi), termasuk banyak cara setara seperti contoh Asep, Lukas, dan Komang pada Buku Siswa Kelas V Bab 1.",
  "secondaryBg": "#DCFCE7",
  "secondaryBorder": "#16A34A",
  "secondaryText": "#14532D",
  "silabus": {
    "teksSuara": "Kita belajar menyusun dan menguraikan bilangan sampai seratus ribu. Pecahan sepuluh ribuan, seribuan, dan seratusan digabung menjadi satu bilangan. Satu bilangan juga bisa diuraikan menjadi jumlah nilai tempat. Banyak cara boleh, asalkan jumlahnya sama. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa melakukan komposisi dan dekomposisi bilangan cacah sampai 100.000.",
    "referensi": "Buku Siswa Matematika Kelas V Bab 1 Sub-Bab C hlm. 15–17; expanded form; flexible place-value composition (Van de Walle)."
  },
  "videos": [
    {
      "id": "K5B1C-V1",
      "judul": "Susun dari Pecahan",
      "subjudul": "Komposisi",
      "adegan": [
        {
          "id": "K5B1C-V1-1",
          "judul": "Uang Asep",
          "ketukan": [
            "Tiga lembar sepuluh ribuan.",
            "Delapan lembar seribuan.",
            "Enam keping seratusan.",
            "Jumlahkan nilainya."
          ],
          "papan": [
            "3×10rb",
            "8×1rb",
            "6×100",
            "jumlah"
          ]
        },
        {
          "id": "K5B1C-V1-2",
          "judul": "Hasil 38.600",
          "ketukan": [
            "Tiga puluh ribu.",
            "Tambah delapan ribu.",
            "Tambah enam ratus.",
            "Jadi tiga delapan titik enam nol nol."
          ],
          "papan": [
            "30.000",
            "+8.000",
            "+600",
            "38.600"
          ]
        },
        {
          "id": "K5B1C-V1-3",
          "judul": "Uang Lukas",
          "ketukan": [
            "Enam lembar sepuluh ribuan.",
            "Tiga lembar seribuan.",
            "Lima keping seratusan.",
            "Hasil enam tiga titik lima nol nol."
          ],
          "papan": [
            "6×10rb",
            "3×1rb",
            "5×100",
            "63.500"
          ]
        }
      ]
    },
    {
      "id": "K5B1C-V2",
      "judul": "Uraikan Bentuk Panjang",
      "subjudul": "Dekomposisi",
      "adegan": [
        {
          "id": "K5B1C-V2-1",
          "judul": "Buka nilai tempat",
          "ketukan": [
            "Ambil bilangan utuh.",
            "Pisahkan tiap tempat.",
            "Tulis jumlah nilai.",
            "Itu bentuk panjang."
          ],
          "papan": [
            "bilangan",
            "pisah",
            "nilai",
            "panjang"
          ]
        },
        {
          "id": "K5B1C-V2-2",
          "judul": "Contoh 45.600",
          "ketukan": [
            "Empat puluh lima ribu enam ratus.",
            "Empat puluh ribu.",
            "Lima ribu.",
            "Enam ratus."
          ],
          "papan": [
            "45.600",
            "40.000",
            "5.000",
            "600"
          ]
        },
        {
          "id": "K5B1C-V2-3",
          "judul": "Saling berkebalikan",
          "ketukan": [
            "Komposisi menyusun.",
            "Dekomposisi menguraikan.",
            "Keduanya saling cek.",
            "Jumlah harus sama."
          ],
          "papan": [
            "susun",
            "urai",
            "cek",
            "sama"
          ]
        }
      ]
    },
    {
      "id": "K5B1C-V3",
      "judul": "Banyak Cara Setara",
      "subjudul": "Fleksibel",
      "adegan": [
        {
          "id": "K5B1C-V3-1",
          "judul": "Komang 45.600",
          "ketukan": [
            "Komang butuh empat lima titik enam nol nol.",
            "Boleh empat kali sepuluh ribu.",
            "Atau empat puluh lima kali seribu.",
            "Asalkan total sama."
          ],
          "papan": [
            "45.600",
            "4×10rb",
            "45×1rb",
            "setara"
          ]
        },
        {
          "id": "K5B1C-V3-2",
          "judul": "Digit boleh lebih 9",
          "ketukan": [
            "Lima belas lembar seribu.",
            "Enam belas keping seratus.",
            "Digit sementara boleh besar.",
            "Lalu dijumlahkan."
          ],
          "papan": [
            "15×1rb",
            "16×100",
            "boleh",
            "jumlah"
          ]
        },
        {
          "id": "K5B1C-V3-3",
          "judul": "Siap bermain",
          "ketukan": [
            "Komposisi sudah jelas.",
            "Dekomposisi sudah jelas.",
            "Ayo ke permainan.",
            "Semangat!"
          ],
          "papan": [
            "susun",
            "urai",
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
      "stepTitle": "1. Pecahan",
      "stepDesc": "Siapkan nilai tempat",
      "icon": "💵",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Komposisi",
      "stepDesc": "Jumlahkan pecahan",
      "icon": "🧩",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Total",
      "stepDesc": "Dapat bilangan utuh",
      "icon": "🔢",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Dekomposisi",
      "stepDesc": "Uraikan ke bentuk panjang",
      "icon": "📜",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Cara lain",
      "stepDesc": "Cari komposisi setara",
      "icon": "🔄",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek",
      "stepDesc": "Jumlah harus sama",
      "icon": "✅",
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
      "suara": "Susun pecahan menjadi bilangan."
    },
    {
      "judul": "Dekomposisi",
      "emoji": "📜",
      "countNum": 1,
      "countWord": "urai",
      "suara": "Uraikan ke nilai tempat."
    },
    {
      "judul": "38.600",
      "emoji": "👦",
      "countNum": 38600,
      "countWord": "Asep",
      "suara": "Contoh uang Asep."
    },
    {
      "judul": "63.500",
      "emoji": "🧑",
      "countNum": 63500,
      "countWord": "Lukas",
      "suara": "Contoh uang Lukas."
    },
    {
      "judul": "45.600",
      "emoji": "🎒",
      "countNum": 45600,
      "countWord": "Komang",
      "suara": "Banyak cara bayar."
    },
    {
      "judul": "Bentuk panjang",
      "emoji": "➕",
      "countNum": 1,
      "countWord": "nilai+nilai",
      "suara": "Jumlah nilai tempat."
    },
    {
      "judul": "Fleksibel",
      "emoji": "🔄",
      "countNum": 1,
      "countWord": "banyak cara",
      "suara": "Cara setara diperbolehkan."
    },
    {
      "judul": "Digit >9",
      "emoji": "📈",
      "countNum": 1,
      "countWord": "sementara",
      "suara": "Boleh lalu dijumlah."
    },
    {
      "judul": "Cek total",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "sama",
      "suara": "Semua cara harus sama."
    },
    {
      "judul": "Siap Sub-Bab D",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "operasi",
      "suara": "Lanjut hitung + − × ÷."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "komposisi-pecahan",
      "title": "Susun dari Pecahan",
      "bookReference": "hlm. 15–16",
      "objective": "Menyusun total dari pecahan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih total.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "dekomposisi-panjang",
      "title": "Uraikan Bentuk Panjang",
      "bookReference": "hlm. 16–17",
      "objective": "Menulis jumlah nilai tempat.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih uraian.",
      "emoji": "📜",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "banyak-cara",
      "title": "Banyak Cara Komposisi",
      "bookReference": "hlm. 16–17",
      "objective": "Mengenali cara setara.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "🔄",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-komposisi",
      "title": "Pilah Sama/Beda Total",
      "bookReference": "hlm. 15–17",
      "objective": "Memilah komposisi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-komposisi",
      "title": "Jodohkan Pecahan–Total",
      "bookReference": "hlm. 15–17",
      "objective": "Menjodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-komposisi",
      "title": "Memori Komposisi",
      "bookReference": "hlm. 15–17",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-komposisi",
      "title": "Ketuk Hasil Komposisi",
      "bookReference": "hlm. 15–17",
      "objective": "Mengetuk.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-komposisi",
      "title": "Ketuk Semua Setara",
      "bookReference": "hlm. 16–17",
      "objective": "Ketuk semua.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-komposisi",
      "title": "Cerita Asep Lukas Komang",
      "bookReference": "hlm. 15–17",
      "objective": "Soal cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-komposisi",
      "title": "Urutkan Hasil Susunan",
      "bookReference": "hlm. 15–17",
      "objective": "Mengurutkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "papan-komposisi",
      "title": "Papan Susun Pecahan",
      "bookReference": "hlm. 16",
      "objective": "Baca papan tempat.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "board",
      "numberA": 1,
      "numberB": 5
    },
    {
      "stage": "Picture",
      "gameType": "diagram-dekom",
      "title": "Diagram Bentuk Panjang",
      "bookReference": "hlm. 16–17",
      "objective": "Baca uraian.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "expand",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-c",
      "title": "Jodohkan Diagram Komposisi",
      "bookReference": "hlm. 15–17",
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
      "title": "Memori Diagram Komposisi",
      "bookReference": "hlm. 15–17",
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
      "title": "Tabel Komposisi",
      "bookReference": "hlm. 16–17",
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
      "bookReference": "hlm. 15–17",
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
      "title": "Pilah Diagram Setara",
      "bookReference": "hlm. 15–17",
      "objective": "Pilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "cara-fleksibel",
      "title": "Model Cara Fleksibel",
      "bookReference": "hlm. 16–17",
      "objective": "Cara setara.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "flex",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "choose-c",
      "title": "Pilih Pernyataan Komposisi",
      "bookReference": "hlm. 15–17",
      "objective": "Pilih pernyataan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-c",
      "title": "Cerita Diagram Komposisi",
      "bookReference": "hlm. 15–17",
      "objective": "Cerita + diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-total",
      "title": "Tulis Total Komposisi",
      "bookReference": "hlm. 15–16",
      "objective": "Menulis total.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "38.600",
      "wordLarge": "TOTAL",
      "mathNotation": "jumlah"
    },
    {
      "stage": "Abstract",
      "gameType": "write-uraian",
      "title": "Tulis Bentuk Panjang",
      "bookReference": "hlm. 16–17",
      "objective": "Menulis uraian.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "30k+8k+600",
      "wordLarge": "URAIAN",
      "mathNotation": "panjang"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-cara",
      "title": "Pilih Cara Setara",
      "bookReference": "hlm. 16–17",
      "objective": "Cara fleksibel.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "cara2",
      "wordLarge": "CARA",
      "mathNotation": "setara"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-c",
      "title": "Urutkan Hasil Abstrak",
      "bookReference": "hlm. 15–17",
      "objective": "Mengurutkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "symbolLarge": "naik",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-c",
      "title": "Jodohkan Notasi Komposisi",
      "bookReference": "hlm. 15–17",
      "objective": "Jodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "symbolLarge": "pecahan",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-c",
      "title": "Memori Notasi Komposisi",
      "bookReference": "hlm. 15–17",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "symbolLarge": "setara",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-c",
      "title": "Benar atau Salah: Komposisi",
      "bookReference": "hlm. 15–17",
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
      "title": "Detektif Komposisi",
      "bookReference": "hlm. 15–17",
      "objective": "Petunjuk → bilangan.",
      "mechanicDescription": "Tiga soal.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-c",
      "title": "Peta Konsep Komposisi",
      "bookReference": "hlm. 15–17",
      "objective": "Mengisi kotak.",
      "mechanicDescription": "Satu peta.",
      "voiceGuide": "Pilih opsi.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-c",
      "title": "Cerita Angka Komposisi",
      "bookReference": "hlm. 15–17",
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
      "isi": "Menyusun bilangan dari pecahan nilai tempat.",
      "suara": "Komposisi artinya menyusun."
    },
    {
      "ikon": "📜",
      "nama": "Dekomposisi",
      "isi": "Menguraikan bilangan menjadi jumlah nilai tempat.",
      "suara": "Dekomposisi artinya menguraikan."
    },
    {
      "ikon": "🔄",
      "nama": "Fleksibel",
      "isi": "Satu bilangan punya banyak cara komposisi setara.",
      "suara": "Banyak cara asalkan total sama."
    },
    {
      "ikon": "➕",
      "nama": "Bentuk panjang",
      "isi": "Tulis sebagai jumlah 10.000, 1.000, 100, 10, dan 1.",
      "suara": "Itu bentuk panjang."
    }
  ],
  "poinSuara": "Ingat: susun, uraikan, dan cek totalnya sama.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Pecahan",
        "warna": "#FDE68A"
      },
      {
        "teks": "jumlahkan",
        "warna": "#BBF7D0"
      },
      {
        "teks": "urai",
        "warna": "#BFDBFE"
      },
      {
        "teks": "cek sama",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: susun ulang satu bilangan dengan dua cara berbeda, lalu uraikan bentuk panjangnya.",
  "refleksi": [
    "Apa beda komposisi dan dekomposisi?",
    "Mengapa satu bilangan bisa punya banyak cara susun?",
    "Bagaimana menuliskan 45.600 dalam bentuk panjang?"
  ]
};

export const SUB_D51: SubBabNaskah = {
  "id": "D",
  "codeTitle": "Sub-Bab D (Operasi Hitung)",
  "fullTitle": "Sub-Bab D: Operasi Hitung pada Bilangan Cacah Sampai 100.000",
  "targetDescription": "Siswa menjumlahkan, mengurangi, mengalikan, dan membagi bilangan cacah sampai 100.000 dengan strategi nilai tempat, susun pendek/panjang, serta soal cerita konteks bakti sosial, angpau, dan toko buah sesuai Buku Siswa Kelas V Bab 1.",
  "secondaryBg": "#FEF3C7",
  "secondaryBorder": "#D97706",
  "secondaryText": "#78350F",
  "silabus": {
    "teksSuara": "Kita belajar empat operasi pada bilangan sampai seratus ribu. Penjumlahan dan pengurangan disusun menurut nilai tempat. Perkalian bisa dipecah faktor. Pembagian membagi rata. Kita pakai cerita bakti sosial, angpau, dan toko buah. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa melakukan operasi hitung bilangan cacah sampai 100.000.",
    "referensi": "Buku Siswa Matematika Kelas V Bab 1 Sub-Bab D hlm. 17–25; partial products; place-value addition/subtraction; equal groups division."
  },
  "videos": [
    {
      "id": "K5B1D-V1",
      "judul": "Jumlah dan Kurang",
      "subjudul": "+ dan −",
      "adegan": [
        {
          "id": "K5B1D-V1-1",
          "judul": "Bakti sosial Nisa",
          "ketukan": [
            "Ibu memberi lima tujuh titik lima nol nol.",
            "Ayah memberi dua dua titik nol nol nol.",
            "Jumlahkan menurut tempat.",
            "Hasil tujuh sembilan titik lima nol nol."
          ],
          "papan": [
            "57.500",
            "+22.000",
            "tempat",
            "79.500"
          ]
        },
        {
          "id": "K5B1D-V1-2",
          "judul": "Susun pendek",
          "ketukan": [
            "Tulis sejajar kolom.",
            "Puluh ribuan dengan puluh ribuan.",
            "Jumlahkan tiap kolom.",
            "Bawa simpanan jika perlu."
          ],
          "papan": [
            "sejajar",
            "kolom",
            "jumlah",
            "simpan"
          ]
        },
        {
          "id": "K5B1D-V1-3",
          "judul": "Sisa di warung",
          "ketukan": [
            "Uang empat tujuh titik sembilan nol nol.",
            "Bayar empat lima titik tujuh lima nol.",
            "Kurangkan.",
            "Sisa dua titik satu lima nol."
          ],
          "papan": [
            "47.900",
            "−45.750",
            "kurang",
            "2.150"
          ]
        }
      ]
    },
    {
      "id": "K5B1D-V2",
      "judul": "Kali dan Bagi",
      "subjudul": "× dan ÷",
      "adegan": [
        {
          "id": "K5B1D-V2-1",
          "judul": "Dua belas angpau",
          "ketukan": [
            "Dua belas amplop.",
            "Tiap amplop lima ribu.",
            "Sepuluh kali lima ribu lima puluh ribu.",
            "Dua kali lima ribu sepuluh ribu. Total enam puluh ribu."
          ],
          "papan": [
            "12",
            "×5.000",
            "pecah",
            "60.000"
          ]
        },
        {
          "id": "K5B1D-V2-2",
          "judul": "Bagi empat anak",
          "ketukan": [
            "Enam empat ribu.",
            "Bagi empat anak.",
            "Sama rata.",
            "Tiap anak enam belas ribu."
          ],
          "papan": [
            "64.000",
            "÷4",
            "rata",
            "16.000"
          ]
        },
        {
          "id": "K5B1D-V2-3",
          "judul": "Kebalikan",
          "ketukan": [
            "Kali dan bagi berkebalikan.",
            "Empat kali enam belas ribu.",
            "Kembali enam empat ribu.",
            "Cek hasil dengan kebalikan."
          ],
          "papan": [
            "× ↔ ÷",
            "4×16rb",
            "64rb",
            "cek"
          ]
        }
      ]
    },
    {
      "id": "K5B1D-V3",
      "judul": "Cerita Toko Buah",
      "subjudul": "Campur operasi",
      "adegan": [
        {
          "id": "K5B1D-V3-1",
          "judul": "Harga buah",
          "ketukan": [
            "Mangga dua tiga titik lima nol nol.",
            "Jeruk tujuh belas ribu.",
            "Naga lima belas ribu.",
            "Kelengkeng tiga empat ribu."
          ],
          "papan": [
            "mangga",
            "jeruk",
            "naga",
            "kelengkeng"
          ]
        },
        {
          "id": "K5B1D-V3-2",
          "judul": "Belanja Yohana",
          "ketukan": [
            "Dua mangga dan satu jeruk.",
            "Dua kali dua tiga titik lima.",
            "Tambah tujuh belas ribu.",
            "Total enam empat ribu."
          ],
          "papan": [
            "2 mangga",
            "+jeruk",
            "hitung",
            "64.000"
          ]
        },
        {
          "id": "K5B1D-V3-3",
          "judul": "Siap bermain",
          "ketukan": [
            "Empat operasi sudah siap.",
            "Strategi tempat sudah jelas.",
            "Ayo ke permainan.",
            "Semangat!"
          ],
          "papan": [
            "+ − × ÷",
            "tempat",
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
      "stepTitle": "1. Baca soal",
      "stepDesc": "Tentukan operasi",
      "icon": "📖",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Susun tempat",
      "stepDesc": "Sejajarkan kolom",
      "icon": "🏛️",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. + / −",
      "stepDesc": "Jumlah atau selisih",
      "icon": "➕",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. × / ÷",
      "stepDesc": "Gandakan atau bagi rata",
      "icon": "✖️",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Cek",
      "stepDesc": "Perkirakan / kebalikan",
      "icon": "✅",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cerita",
      "stepDesc": "Terapkan ke konteks",
      "icon": "🛒",
      "flowFrom": "5",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "+",
      "emoji": "➕",
      "countNum": 1,
      "countWord": "jumlah",
      "suara": "Jumlahkan nilai tempat."
    },
    {
      "judul": "−",
      "emoji": "➖",
      "countNum": 1,
      "countWord": "selisih",
      "suara": "Cari sisa atau selisih."
    },
    {
      "judul": "×",
      "emoji": "✖️",
      "countNum": 1,
      "countWord": "kali",
      "suara": "Pecah faktor bila perlu."
    },
    {
      "judul": "÷",
      "emoji": "➗",
      "countNum": 1,
      "countWord": "bagi",
      "suara": "Bagi rata sama banyak."
    },
    {
      "judul": "79.500",
      "emoji": "🤝",
      "countNum": 79500,
      "countWord": "bakti",
      "suara": "57.500 + 22.000."
    },
    {
      "judul": "2.150",
      "emoji": "🍗",
      "countNum": 2150,
      "countWord": "sisa",
      "suara": "47.900 − 45.750."
    },
    {
      "judul": "60.000",
      "emoji": "🧧",
      "countNum": 60000,
      "countWord": "angpau",
      "suara": "12 × 5.000."
    },
    {
      "judul": "16.000",
      "emoji": "👧",
      "countNum": 16000,
      "countWord": "bagi",
      "suara": "64.000 ÷ 4."
    },
    {
      "judul": "Susun kolom",
      "emoji": "📐",
      "countNum": 1,
      "countWord": "sejajar",
      "suara": "Tempat harus sejajar."
    },
    {
      "judul": "Bab 1 siap",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "A–D",
      "suara": "Materi Bab 1 lengkap."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "penjumlahan-5digit",
      "title": "Penjumlahan Lima Angka",
      "bookReference": "hlm. 17–19",
      "objective": "Menjumlahkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih hasil.",
      "emoji": "➕",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "pengurangan-5digit",
      "title": "Pengurangan Lima Angka",
      "bookReference": "hlm. 19–20",
      "objective": "Mengurangi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih sisa.",
      "emoji": "➖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "perkalian-besar",
      "title": "Perkalian sampai 100.000",
      "bookReference": "hlm. 21–23",
      "objective": "Mengalikan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih hasil.",
      "emoji": "✖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "pembagian-besar",
      "title": "Pembagian sampai 100.000",
      "bookReference": "hlm. 22–23",
      "objective": "Membagi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih hasil.",
      "emoji": "➗",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "match-operasi",
      "title": "Jodohkan Operasi–Hasil",
      "bookReference": "hlm. 17–24",
      "objective": "Menjodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-operasi",
      "title": "Memori Operasi",
      "bookReference": "hlm. 17–24",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-hasil",
      "title": "Ketuk Hasil Operasi",
      "bookReference": "hlm. 17–24",
      "objective": "Mengetuk.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-operasi",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 17–24",
      "objective": "Ketuk semua.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-operasi",
      "title": "Cerita Bakti dan Toko Buah",
      "bookReference": "hlm. 17–25",
      "objective": "Soal cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "🛒",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-hasil",
      "title": "Urutkan Hasil Hitung",
      "bookReference": "hlm. 17–25",
      "objective": "Mengurutkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "diagram-tambah",
      "title": "Diagram Penjumlahan",
      "bookReference": "hlm. 18–19",
      "objective": "Baca jumlah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "add",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "diagram-kurang",
      "title": "Diagram Pengurangan",
      "bookReference": "hlm. 19–20",
      "objective": "Baca selisih.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "sub",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "diagram-kali",
      "title": "Diagram Perkalian",
      "bookReference": "hlm. 21–23",
      "objective": "Baca hasil kali.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "mul",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "diagram-bagi",
      "title": "Diagram Pembagian",
      "bookReference": "hlm. 22–23",
      "objective": "Baca hasil bagi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "div",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-d",
      "title": "Jodohkan Diagram Operasi",
      "bookReference": "hlm. 17–24",
      "objective": "Jodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-d",
      "title": "Memori Diagram Operasi",
      "bookReference": "hlm. 17–24",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-d",
      "title": "Tabel Operasi",
      "bookReference": "hlm. 17–25",
      "objective": "Isi tabel.",
      "mechanicDescription": "Tiga tabel.",
      "voiceGuide": "Pilih.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-pd",
      "title": "Ketuk Semua Diagram D",
      "bookReference": "hlm. 17–24",
      "objective": "Ketuk semua.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "choose-d",
      "title": "Pilih Kalimat Operasi",
      "bookReference": "hlm. 17–25",
      "objective": "Pilih pernyataan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-d",
      "title": "Cerita Diagram Operasi",
      "bookReference": "hlm. 17–25",
      "objective": "Cerita + diagram.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-jumlah",
      "title": "Tulis Hasil Penjumlahan",
      "bookReference": "hlm. 17–19",
      "objective": "Menulis jumlah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "79.500",
      "wordLarge": "JUMLAH",
      "mathNotation": "+"
    },
    {
      "stage": "Abstract",
      "gameType": "write-sisa",
      "title": "Tulis Hasil Pengurangan",
      "bookReference": "hlm. 19–20",
      "objective": "Menulis sisa.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "2.150",
      "wordLarge": "SISA",
      "mathNotation": "-"
    },
    {
      "stage": "Abstract",
      "gameType": "write-kali",
      "title": "Tulis Hasil Perkalian",
      "bookReference": "hlm. 21–23",
      "objective": "Menulis hasil kali.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "60.000",
      "wordLarge": "KALI",
      "mathNotation": "x"
    },
    {
      "stage": "Abstract",
      "gameType": "write-bagi",
      "title": "Tulis Hasil Pembagian",
      "bookReference": "hlm. 22–23",
      "objective": "Menulis hasil bagi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "16.000",
      "wordLarge": "BAGI",
      "mathNotation": ":"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-d",
      "title": "Jodohkan Notasi Operasi",
      "bookReference": "hlm. 17–24",
      "objective": "Jodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "symbolLarge": "a+b",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-d",
      "title": "Memori Notasi Operasi",
      "bookReference": "hlm. 17–24",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "symbolLarge": "hasil",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-d",
      "title": "Benar atau Salah: Operasi",
      "bookReference": "hlm. 17–25",
      "objective": "Menilai.",
      "mechanicDescription": "Dua ronde.",
      "voiceGuide": "Benar/salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-d",
      "title": "Detektif Operasi",
      "bookReference": "hlm. 17–25",
      "objective": "Petunjuk → hasil.",
      "mechanicDescription": "Tiga soal.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-d",
      "title": "Peta Konsep Operasi",
      "bookReference": "hlm. 17–25",
      "objective": "Mengisi kotak.",
      "mechanicDescription": "Satu peta.",
      "voiceGuide": "Pilih opsi.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-d",
      "title": "Cerita Angka Operasi",
      "bookReference": "hlm. 17–25",
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
      "ikon": "➕",
      "nama": "Penjumlahan",
      "isi": "Jumlahkan menurut nilai tempat, sejajarkan kolom.",
      "suara": "Jumlahkan per tempat."
    },
    {
      "ikon": "➖",
      "nama": "Pengurangan",
      "isi": "Kurangkan untuk mencari sisa atau selisih.",
      "suara": "Kurangkan dengan teliti."
    },
    {
      "ikon": "✖️",
      "nama": "Perkalian",
      "isi": "Boleh dipecah faktor, lalu jumlahkan hasil bagian.",
      "suara": "Pecah faktor bila membantu."
    },
    {
      "ikon": "➗",
      "nama": "Pembagian",
      "isi": "Bagi rata; cek dengan perkalian kebalikan.",
      "suara": "Bagi rata lalu cek."
    }
  ],
  "poinSuara": "Ingat empat operasi: tambah, kurang, kali, bagi.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Baca",
        "warna": "#FDE68A"
      },
      {
        "teks": "susun",
        "warna": "#BBF7D0"
      },
      {
        "teks": "hitung",
        "warna": "#BFDBFE"
      },
      {
        "teks": "cek",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: buat satu soal cerita penjumlahan dan satu soal pembagian memakai bilangan sampai seratus ribu.",
  "refleksi": [
    "Kapan memakai penjumlahan dan kapan pengurangan?",
    "Bagaimana memecah 12 × 5.000 agar lebih mudah?",
    "Mengapa pembagian dicek dengan perkalian?"
  ]
};

export const SUB_BAB_K5B1: SubBabNaskah[] = [SUB_A51, SUB_B51, SUB_C51, SUB_D51];
export const semuaAdeganK5B1 = SUB_BAB_K5B1.flatMap((s) => s.videos.flatMap((v) => v.adegan));
