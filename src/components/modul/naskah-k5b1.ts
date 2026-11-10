/**
 * Naskah — rewrite mendalam setara K5B4.
 * Kelas 5 Bab 1 bilangan sampai 100.000 — ketukan per ketukan.
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
  "targetDescription": "Siswa membaca, menulis, dan menentukan nilai tempat bilangan cacah sampai 100.000 dengan tabel nilai tempat dan perluasan balok Dienes sesuai Buku Siswa Kelas V Bab 1 Sub-Bab A.",
  "secondaryBg": "#FFEDD5",
  "secondaryBorder": "#EA580C",
  "secondaryText": "#7C2D12",
  "silabus": {
    "teksSuara": "Kita naik ke bilangan sampai seratus ribu. Tiap digit punya nilai menurut tempatnya: satuan, puluhan, ratusan, ribuan, puluh ribuan, ratusan ribu. Nol menjaga tempat agar nilai tidak bergeser. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa membaca, menulis, dan menentukan nilai tempat bilangan sampai 100.000.",
    "referensi": "Buku Siswa Matematika Kelas V Kemendikbudristek (Bab 1 Sub-Bab A)."
  },
  "videos": [
    {
      "id": "K5B1A-V1",
      "judul": "Enam Tempat di Tabel",
      "subjudul": "Tabel Nilai Tempat",
      "adegan": [
        {
          "id": "K5B1A-V1-1",
          "judul": "Naik tingkat",
          "ketukan": [
            "Di kelas sebelumnya kita sampai sepuluh ribu. Sekarang ada ratusan ribu.",
            "Tabel nilai tempat bertambah kolom di kiri: ratusan ribu dan puluh ribuan.",
            "Dari kanan: satuan, puluhan, ratusan, ribuan, puluh ribuan, ratusan ribu.",
            "METODE LUAR · Tabel Nilai Tempat: baca nilai digit dari kolomnya."
          ],
          "papan": [
            "naik",
            "kolom baru",
            "urutan",
            "chart"
          ]
        },
        {
          "id": "K5B1A-V1-2",
          "judul": "Contoh 14.500",
          "ketukan": [
            "Empat belas ribu lima ratus ditulis 14.500.",
            "Digit 1 di puluh ribuan bernilai sepuluh ribu.",
            "Digit 4 di ribuan bernilai empat ribu. Digit 5 di ratusan bernilai lima ratus.",
            "Titik pemisah ribuan membantu membaca, bukan tanda desimal di sini."
          ],
          "papan": [
            "14.500",
            "1 → 10.000",
            "4 dan 5",
            "titik RI"
          ]
        },
        {
          "id": "K5B1A-V1-3",
          "judul": "Nol penjaga",
          "ketukan": [
            "Pada 20.040, nol di ratusan dan puluhan menjaga tempat agar 2 tetap di puluh ribuan.",
            "Tanpa nol, angka akan bergeser dan nilainya berubah.",
            "METODE LUAR · Membaca Bilangan Besar: sebut periode dengan benar.",
            "Latihan menulis dan membaca bergantian."
          ],
          "papan": [
            "nol jaga",
            "jangan hapus",
            "baca",
            "latihan"
          ]
        }
      ]
    },
    {
      "id": "K5B1A-V2",
      "judul": "Balok yang Membesar",
      "subjudul": "Balok Dienes Perluas",
      "adegan": [
        {
          "id": "K5B1A-V2-1",
          "judul": "Bundel sepuluh",
          "ketukan": [
            "Sepuluh satuan jadi sepuluhan. Sepuluh puluhan jadi seratusan. Begitu seterusnya.",
            "Bayangkan balok Dienes diperluas sampai ratusan ribu.",
            "METODE LUAR · Balok Dienes Perluas: tiap tingkat adalah sepuluh dari tingkat di bawahnya.",
            "Ini alasan nilai tempat berbasis sepuluh."
          ],
          "papan": [
            "bundel",
            "Dienes",
            "×10",
            "base 10"
          ]
        },
        {
          "id": "K5B1A-V2-2",
          "judul": "Nilai digit",
          "ketukan": [
            "Digit 7 di ribuan bernilai 7.000, bukan 7.",
            "Urai: 52.307 = 50.000 + 2.000 + 300 + 7.",
            "Menulis uraian menegaskan nilai tempat.",
            "Cocokkan kembali ke bentuk lazim."
          ],
          "papan": [
            "nilai",
            "uraian",
            "tulis urai",
            "kembali"
          ]
        },
        {
          "id": "K5B1A-V2-3",
          "judul": "Siap banding",
          "ketukan": [
            "Setelah mahir membaca nilai tempat, membandingkan bilangan jadi mudah.",
            "Kita bandingkan digit dari kiri, tempat terbesar dulu.",
            "Simpan tabel nilai tempat sebagai papan kerja.",
            "Ayo main nilai tempat!"
          ],
          "papan": [
            "jembatan B",
            "preview",
            "alat",
            "main"
          ]
        }
      ]
    },
    {
      "id": "K5B1A-V3",
      "judul": "Baca dengan Periode",
      "subjudul": "Membaca Bilangan Besar",
      "adegan": [
        {
          "id": "K5B1A-V3-1",
          "judul": "Periode",
          "ketukan": [
            "Kelompokkan tiga digit dari kanan: misalnya 305.072 → 305 ribu 072.",
            "Baca: tiga ratus lima ribu tujuh puluh dua.",
            "Jangan membaca digit satu-satu tanpa periode.",
            "Latihan hardik: tulis dengar, dengar tulis."
          ],
          "papan": [
            "periode",
            "baca",
            "jangan",
            "drill"
          ]
        },
        {
          "id": "K5B1A-V3-2",
          "judul": "Kesalahan umum",
          "ketukan": [
            "Kesalahan: mengabaikan nol di tengah.",
            "Kesalahan: tertukar ribuan dan ratusan.",
            "Cek dengan menuliskan di tabel kolom.",
            "Jika ragu, uraikan nilainya."
          ],
          "papan": [
            "nol tengah",
            "tertukar",
            "cek tabel",
            "urai"
          ]
        },
        {
          "id": "K5B1A-V3-3",
          "judul": "Tutup A",
          "ketukan": [
            "Bekal A: tabel, bundel sepuluh, baca periode.",
            "Siap membandingkan dan mengurutkan.",
            "Ulangi contoh 14.500 dan 20.040 bila perlu.",
            "Mainkan permainan nilai tempat!"
          ],
          "papan": [
            "bekal",
            "siap B",
            "ulang",
            "main"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Tulis di tabel",
      "stepDesc": "Isi digit per kolom.",
      "icon": "▦",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Nilai digit",
      "stepDesc": "Digit × nilai tempat.",
      "icon": "🔢",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Nol jaga",
      "stepDesc": "Jangan hapus nol tengah.",
      "icon": "0",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Uraikan",
      "stepDesc": "Jumlah nilai tempat.",
      "icon": "➕",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Baca periode",
      "stepDesc": "Ratusan ribu → ribu → satuan.",
      "icon": "🗣️",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Bentuk lazim",
      "stepDesc": "Tulis kembali bilangan.",
      "icon": "✍️",
      "flowFrom": "5",
      "flowTo": "7"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Cek",
      "stepDesc": "Baca ulang cocok?",
      "icon": "✅",
      "flowFrom": "6",
      "flowTo": "8"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Main",
      "stepDesc": "Latihan nilai tempat.",
      "icon": "🎮",
      "flowFrom": "7",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "Satuan",
      "emoji": "1️⃣",
      "countNum": 1,
      "countWord": "S",
      "suara": "Kanan"
    },
    {
      "judul": "Puluhan",
      "emoji": "🔟",
      "countNum": 10,
      "countWord": "P",
      "suara": "×10"
    },
    {
      "judul": "Ratusan",
      "emoji": "💯",
      "countNum": 100,
      "countWord": "R",
      "suara": "×100"
    },
    {
      "judul": "Ribuan",
      "emoji": "📗",
      "countNum": 1000,
      "countWord": "Rb",
      "suara": "×1000"
    },
    {
      "judul": "Puluh rb",
      "emoji": "📘",
      "countNum": 10000,
      "countWord": "PRb",
      "suara": "×10rb"
    },
    {
      "judul": "Ratus rb",
      "emoji": "📙",
      "countNum": 100000,
      "countWord": "RRb",
      "suara": "×100rb"
    },
    {
      "judul": "14.500",
      "emoji": "🔢",
      "countNum": 14500,
      "countWord": "urai",
      "suara": "Contoh"
    },
    {
      "judul": "Nol jaga",
      "emoji": "0",
      "countNum": 1,
      "countWord": "tetap",
      "suara": "Jangan hapus"
    },
    {
      "judul": "Periode",
      "emoji": "🗣️",
      "countNum": 3,
      "countWord": "kelompok",
      "suara": "Baca"
    },
    {
      "judul": "Siap B",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "banding",
      "suara": "Lanjut"
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "baca-lima",
      "title": "Baca Bilangan Lima Angka",
      "bookReference": "hlm. 7–9",
      "objective": "Isi digit di kolom benar. Latihan: Membaca lambang → kata..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Tabel Nilai Tempat: Nilai mengikuti tempat.",
      "voiceGuide": "Tabel Nilai Tempat. Nilai mengikuti tempat.",
      "emoji": "📢",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tulis-lima",
      "title": "Tulis dari Kata Bilangan",
      "bookReference": "hlm. 5–6",
      "objective": "Isi digit di kolom benar. Latihan: Menulis lambang dari kata..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Tabel Nilai Tempat: Nilai mengikuti tempat.",
      "voiceGuide": "Tabel Nilai Tempat. Nilai mengikuti tempat.",
      "emoji": "✍️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "nilai-tempat",
      "title": "Tentukan Nilai Tempat",
      "bookReference": "hlm. 6–9",
      "objective": "Isi digit di kolom benar. Latihan: Digit & nilai tempat..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Tabel Nilai Tempat: Nilai mengikuti tempat.",
      "voiceGuide": "Tabel Nilai Tempat. Nilai mengikuti tempat.",
      "emoji": "🏛️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-digit",
      "title": "Pilah Lima/Empat Angka",
      "bookReference": "hlm. 4–7",
      "objective": "Isi digit di kolom benar. Latihan: Memilah panjang bilangan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Tabel Nilai Tempat: Nilai mengikuti tempat.",
      "voiceGuide": "Tabel Nilai Tempat. Nilai mengikuti tempat.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-baca",
      "title": "Jodohkan Lambang–Kata",
      "bookReference": "hlm. 8–9",
      "objective": "Menjodohkan.. Ingat Tabel Nilai Tempat. (Tabel Nilai Tempat)",
      "mechanicDescription": "Tiga ronde. Gunakan Tabel Nilai Tempat.",
      "voiceGuide": "Tabel Nilai Tempat. Mainkan dengan teliti.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-baca",
      "title": "Memori Lambang–Kata",
      "bookReference": "hlm. 7–9",
      "objective": "Memori.. Ingat Tabel Nilai Tempat. (Tabel Nilai Tempat)",
      "mechanicDescription": "Tiga ronde. Gunakan Tabel Nilai Tempat.",
      "voiceGuide": "Tabel Nilai Tempat. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-bilangan",
      "title": "Ketuk Bilangan Diminta",
      "bookReference": "hlm. 7–9",
      "objective": "Mengetuk.. Ingat Tabel Nilai Tempat. (Tabel Nilai Tempat)",
      "mechanicDescription": "Tiga ronde. Gunakan Tabel Nilai Tempat.",
      "voiceGuide": "Tabel Nilai Tempat. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-ciri",
      "title": "Ketuk Semua Sesuai Ciri",
      "bookReference": "hlm. 6–9",
      "objective": "Ketuk semua.. Ingat Tabel Nilai Tempat. (Tabel Nilai Tempat)",
      "mechanicDescription": "Tiga ronde. Gunakan Tabel Nilai Tempat.",
      "voiceGuide": "Tabel Nilai Tempat. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-baca",
      "title": "Cerita Buku dan Penduduk",
      "bookReference": "hlm. 5–8",
      "objective": "Soal cerita.. Ingat Tabel Nilai Tempat. (Tabel Nilai Tempat)",
      "mechanicDescription": "Tiga ronde. Gunakan Tabel Nilai Tempat.",
      "voiceGuide": "Tabel Nilai Tempat. Mainkan dengan teliti.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-nilai",
      "title": "Urutkan Bilangan Baca",
      "bookReference": "hlm. 7–9",
      "objective": "Mengurutkan.. Ingat Tabel Nilai Tempat. (Tabel Nilai Tempat)",
      "mechanicDescription": "Tiga ronde. Gunakan Tabel Nilai Tempat.",
      "voiceGuide": "Tabel Nilai Tempat. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "papan-baca",
      "title": "Papan Baca Bilangan",
      "bookReference": "hlm. 6–7",
      "objective": "Ingat bundel sepuluh. Latihan: Baca papan tempat..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Balok Dienes Perluas: Tiap tingkat ×10.",
      "voiceGuide": "Balok Dienes Perluas. Tiap tingkat ×10.",
      "diagramType": "board",
      "numberA": 1,
      "numberB": 5
    },
    {
      "stage": "Picture",
      "gameType": "papan-tempat",
      "title": "Papan Nilai Tempat",
      "bookReference": "hlm. 6–9",
      "objective": "Ingat bundel sepuluh. Latihan: Digit per kolom..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Balok Dienes Perluas: Tiap tingkat ×10.",
      "voiceGuide": "Balok Dienes Perluas. Tiap tingkat ×10.",
      "diagramType": "place",
      "numberA": 1,
      "numberB": 5
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-a",
      "title": "Jodohkan Diagram Tempat",
      "bookReference": "hlm. 6–9",
      "objective": "Ingat bundel sepuluh. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Balok Dienes Perluas: Tiap tingkat ×10.",
      "voiceGuide": "Balok Dienes Perluas. Tiap tingkat ×10.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-a",
      "title": "Memori Diagram Tempat",
      "bookReference": "hlm. 6–9",
      "objective": "Ingat bundel sepuluh. Latihan: Memori..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Balok Dienes Perluas: Tiap tingkat ×10.",
      "voiceGuide": "Balok Dienes Perluas. Tiap tingkat ×10.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-a",
      "title": "Tabel Tempat–Nilai",
      "bookReference": "hlm. 6–9",
      "objective": "Isi tabel.. Ingat Balok Dienes Perluas. (Balok Dienes Perluas)",
      "mechanicDescription": "Tiga tabel. Gunakan Balok Dienes Perluas.",
      "voiceGuide": "Balok Dienes Perluas. Mainkan dengan teliti.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-a",
      "title": "Ketuk Semua Diagram",
      "bookReference": "hlm. 6–9",
      "objective": "Ketuk semua.. Ingat Balok Dienes Perluas. (Balok Dienes Perluas)",
      "mechanicDescription": "Tiga ronde. Gunakan Balok Dienes Perluas.",
      "voiceGuide": "Balok Dienes Perluas. Mainkan dengan teliti.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-a",
      "title": "Pilah Diagram Panjang",
      "bookReference": "hlm. 4–7",
      "objective": "Pilah.. Ingat Balok Dienes Perluas. (Balok Dienes Perluas)",
      "mechanicDescription": "Tiga ronde. Gunakan Balok Dienes Perluas.",
      "voiceGuide": "Balok Dienes Perluas. Mainkan dengan teliti.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "model-blok",
      "title": "Model Blok Tempat",
      "bookReference": "hlm. 6",
      "objective": "Baca model.. Ingat Balok Dienes Perluas. (Balok Dienes Perluas)",
      "mechanicDescription": "Tiga ronde. Gunakan Balok Dienes Perluas.",
      "voiceGuide": "Balok Dienes Perluas. Mainkan dengan teliti.",
      "diagramType": "blocks",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "choose-a",
      "title": "Pilih Bacaan Cocok",
      "bookReference": "hlm. 7–9",
      "objective": "Pilih pernyataan.. Ingat Balok Dienes Perluas. (Balok Dienes Perluas)",
      "mechanicDescription": "Tiga ronde. Gunakan Balok Dienes Perluas.",
      "voiceGuide": "Balok Dienes Perluas. Mainkan dengan teliti.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-a",
      "title": "Cerita Diagram Tempat",
      "bookReference": "hlm. 5–9",
      "objective": "Cerita + papan.. Ingat Balok Dienes Perluas. (Balok Dienes Perluas)",
      "mechanicDescription": "Tiga ronde. Gunakan Balok Dienes Perluas.",
      "voiceGuide": "Balok Dienes Perluas. Mainkan dengan teliti.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-kata",
      "title": "Tulis Kata Bilangan",
      "bookReference": "hlm. 7–9",
      "objective": "Baca per periode. Latihan: Menulis kata..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Membaca Bilangan Besar: Jangan digit acak.",
      "voiceGuide": "Membaca Bilangan Besar. Jangan digit acak.",
      "symbolLarge": "Aa",
      "wordLarge": "KATA",
      "mathNotation": "baca"
    },
    {
      "stage": "Abstract",
      "gameType": "write-lambang",
      "title": "Tulis Lambang Bilangan",
      "bookReference": "hlm. 5–6",
      "objective": "Baca per periode. Latihan: Menulis angka..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Membaca Bilangan Besar: Jangan digit acak.",
      "voiceGuide": "Membaca Bilangan Besar. Jangan digit acak.",
      "symbolLarge": "14.500",
      "wordLarge": "LAMBANG",
      "mathNotation": "tulis"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-tempat",
      "title": "Pilih Nama Tempat",
      "bookReference": "hlm. 6–9",
      "objective": "Baca per periode. Latihan: PR/RB/R/P/S..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Membaca Bilangan Besar: Jangan digit acak.",
      "voiceGuide": "Membaca Bilangan Besar. Jangan digit acak.",
      "symbolLarge": "PR",
      "wordLarge": "TEMPAT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-a",
      "title": "Urutkan Lambang",
      "bookReference": "hlm. 7–9",
      "objective": "Baca per periode. Latihan: Mengurutkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Membaca Bilangan Besar: Jangan digit acak.",
      "voiceGuide": "Membaca Bilangan Besar. Jangan digit acak.",
      "symbolLarge": "14k<26k",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-a",
      "title": "Jodohkan Notasi Tempat",
      "bookReference": "hlm. 6–9",
      "objective": "Jodohkan.. Ingat Membaca Bilangan Besar. (Membaca Bilangan Besar)",
      "mechanicDescription": "Tiga ronde. Gunakan Membaca Bilangan Besar.",
      "voiceGuide": "Membaca Bilangan Besar. Mainkan dengan teliti.",
      "symbolLarge": "7→rb",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-a",
      "title": "Memori Notasi Tempat",
      "bookReference": "hlm. 6–9",
      "objective": "Memori.. Ingat Membaca Bilangan Besar. (Membaca Bilangan Besar)",
      "mechanicDescription": "Tiga ronde. Gunakan Membaca Bilangan Besar.",
      "voiceGuide": "Membaca Bilangan Besar. Mainkan dengan teliti.",
      "symbolLarge": "nol",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-a",
      "title": "Benar atau Salah: Tempat",
      "bookReference": "hlm. 4–9",
      "objective": "Menilai.. Ingat Membaca Bilangan Besar. (Membaca Bilangan Besar)",
      "mechanicDescription": "Dua ronde. Gunakan Membaca Bilangan Besar.",
      "voiceGuide": "Membaca Bilangan Besar. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-a",
      "title": "Detektif Bilangan Lima",
      "bookReference": "hlm. 5–9",
      "objective": "Petunjuk → bilangan.. Ingat Membaca Bilangan Besar. (Membaca Bilangan Besar)",
      "mechanicDescription": "Tiga soal. Gunakan Membaca Bilangan Besar.",
      "voiceGuide": "Membaca Bilangan Besar. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-a",
      "title": "Peta Konsep Nilai Tempat",
      "bookReference": "hlm. 2–9",
      "objective": "Mengisi kotak.. Ingat Membaca Bilangan Besar. (Membaca Bilangan Besar)",
      "mechanicDescription": "Satu peta. Gunakan Membaca Bilangan Besar.",
      "voiceGuide": "Membaca Bilangan Besar. Mainkan dengan teliti.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-a",
      "title": "Cerita Angka Tempat",
      "bookReference": "hlm. 5–9",
      "objective": "Soal cerita.. Ingat Membaca Bilangan Besar. (Membaca Bilangan Besar)",
      "mechanicDescription": "Tiga ronde. Gunakan Membaca Bilangan Besar.",
      "voiceGuide": "Membaca Bilangan Besar. Mainkan dengan teliti.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "▦",
      "nama": "Tabel",
      "isi": "Isi digit sesuai kolom nilai tempat.",
      "suara": "Tabel."
    },
    {
      "ikon": "0",
      "nama": "Nol penjaga",
      "isi": "Nol menjaga agar digit tidak bergeser.",
      "suara": "Nol."
    },
    {
      "ikon": "🗣️",
      "nama": "Baca periode",
      "isi": "Baca per kelompok tiga digit dari kanan.",
      "suara": "Periode."
    },
    {
      "ikon": "➕",
      "nama": "Uraian",
      "isi": "Jumlahkan nilai tiap digit untuk cek.",
      "suara": "Urai."
    }
  ],
  "poinSuara": "Tabel nilai tempat, nol penjaga, baca periode, uraikan untuk cek.",
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
  "rumah": "Ayo Mencoba: terapkan Tabel Nilai Tempat pada satu soal di rumah.",
  "refleksi": [
    "Bagaimana Tabel Nilai Tempat membantumu?",
    "Kapan memakai Balok Dienes Perluas?",
    "Apa bedanya dengan hanya menghafal rumus?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Place-Value Chart",
      "namaId": "Tabel Nilai Tempat",
      "asal": "Base-ten pedagogy",
      "ringkas": "Setiap digit punya nilai menurut tempatnya dari satuan sampai ratusan ribu.",
      "tahap": [
        "Story",
        "Mind",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Extended Dienes",
      "namaId": "Balok Dienes Perluas",
      "asal": "Dienes base-ten blocks",
      "ringkas": "Model fisik/gambar untuk ratusan ribu membantu melihat bundel sepuluh.",
      "tahap": [
        "Story",
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Number Reading",
      "namaId": "Membaca Bilangan Besar",
      "asal": "Language of number",
      "ringkas": "Baca per periode: ratusan ribu, lalu ribuan, lalu satuan.",
      "tahap": [
        "Story",
        "Infografis",
        "Abstract"
      ]
    }
  ]
};

export const SUB_B51: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Membandingkan dan Mengurutkan)",
  "fullTitle": "Sub-Bab B: Membandingkan dan Mengurutkan Bilangan Cacah Sampai 100.000",
  "targetDescription": "Siswa membandingkan dan mengurutkan bilangan sampai 100.000 dengan membandingkan digit per tempat dari kiri serta garis bilangan dan bilangan acuan sesuai Buku Siswa Kelas V Bab 1 Sub-Bab B.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Kita membandingkan bilangan besar dari kiri: tempat terbesar dulu. Jika digit sama, geser ke kanan. Garis bilangan dan bilangan acuan membantu mengurutkan. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa membandingkan dan mengurutkan bilangan cacah sampai 100.000.",
    "referensi": "Buku Siswa Matematika Kelas V Kemendikbudristek (Bab 1 Sub-Bab B)."
  },
  "videos": [
    {
      "id": "K5B1B-V1",
      "judul": "Dari Kiri, Bukan dari Kanan",
      "subjudul": "Banding Digit per Tempat",
      "adegan": [
        {
          "id": "K5B1B-V1-1",
          "judul": "Aturan",
          "ketukan": [
            "Samakan jumlah digit atau bayangkan nol di depan. Lalu bandingkan dari kiri.",
            "45.230 dan 46.001: di puluh ribuan sama 4, di ribuan 5 < 6 jadi 45.230 lebih kecil.",
            "METODE LUAR · Banding Digit per Tempat: jangan mulai dari satuan.",
            "Tulis keduanya di tabel agar kolom sejajar."
          ],
          "papan": [
            "dari kiri",
            "contoh",
            "jangan kanan",
            "sejajar"
          ]
        },
        {
          "id": "K5B1B-V1-2",
          "judul": "Digit sama",
          "ketukan": [
            "Jika digit di tempat terbesar sama, maju ke tempat berikutnya.",
            "Baru berhenti saat menemukan digit yang berbeda.",
            "Itulah yang menentukan mana lebih besar.",
            "Latihan dengan suara: sebut tempatnya saat membandingkan."
          ],
          "papan": [
            "maju",
            "berhenti",
            "penentu",
            "sebut"
          ]
        },
        {
          "id": "K5B1B-V1-3",
          "judul": "Tanda",
          "ketukan": [
            "Pakai >, <, atau = dengan yakin setelah aturan dijalankan.",
            "Bacakan: empat lima dua tiga puluh lebih kecil dari …",
            "Jangan menebak dari banyaknya digit saja jika sudah sama panjang.",
            "Siap mengurutkan banyak bilangan."
          ],
          "papan": [
            "tanda",
            "baca",
            "jangan tebak",
            "lanjut"
          ]
        }
      ]
    },
    {
      "id": "K5B1B-V2",
      "judul": "Garis dan Acuan",
      "subjudul": "Urutan di Garis Bilangan",
      "adegan": [
        {
          "id": "K5B1B-V2-1",
          "judul": "Garis",
          "ketukan": [
            "Letakkan bilangan di garis. Yang lebih kanan lebih besar.",
            "METODE LUAR · Urutan di Garis Bilangan: posisi = besar kecil.",
            "Untuk bilangan dekat, perbesar skala di sekitarnya.",
            "Garis membantu saat mengurutkan tiga atau lebih."
          ],
          "papan": [
            "kanan >",
            "posisi",
            "skala",
            "banyak"
          ]
        },
        {
          "id": "K5B1B-V2-2",
          "judul": "Acuan",
          "ketukan": [
            "Pakai 10.000, 50.000, 100.000 sebagai patokan.",
            "METODE LUAR · Bilangan Acuan: perkiraan dulu, baru banding teliti.",
            "Jika satu di bawah 50.000 dan satu di atas, urutan langsung jelas.",
            "Lalu rapikan dengan banding digit."
          ],
          "papan": [
            "acuan",
            "perkiraan",
            "cepat",
            "rapi"
          ]
        },
        {
          "id": "K5B1B-V2-3",
          "judul": "Urut naik turun",
          "ketukan": [
            "Urut naik: dari terkecil ke terbesar. Urut turun: kebalikannya.",
            "Tulis panah agar tidak tertukar instruksi soal.",
            "Cek pasangan berurutan dengan aturan dari kiri.",
            "Ayo main banding dan urut!"
          ],
          "papan": [
            "arah",
            "panah",
            "cek",
            "main"
          ]
        }
      ]
    },
    {
      "id": "K5B1B-V3",
      "judul": "Latihan Urut",
      "subjudul": "Bilangan Acuan",
      "adegan": [
        {
          "id": "K5B1B-V3-1",
          "judul": "Tiga bilangan",
          "ketukan": [
            "Urutkan 38.500, 40.200, 39.999.",
            "Acuan 40.000 membantu: 38.500 < 39.999 < 40.200.",
            "Cek digit: 38 < 39 < 40 pada ribuan setelah puluh ribuan sama? 3 sama, lalu 8,9,0 — hati-hati 40.200 puluh ribuan 4.",
            "Benar: 38.500, 39.999, 40.200."
          ],
          "papan": [
            "tiga",
            "hasil",
            "teliti",
            "ok"
          ]
        },
        {
          "id": "K5B1B-V3-2",
          "judul": "Kesalahan",
          "ketukan": [
            "Kesalahan: membandingkan dari satuan.",
            "Kesalahan: mengabaikan nol di tengah saat mengurutkan.",
            "Kesalahan: tertukar naik dan turun.",
            "Ulangi aturan dari kiri."
          ],
          "papan": [
            "salah",
            "nol",
            "arah",
            "ulang"
          ]
        },
        {
          "id": "K5B1B-V3-3",
          "judul": "Siap C",
          "ketukan": [
            "Banding dan urut siap. Berikutnya komposisi bilangan.",
            "Nilai tempat tetap fondasinya.",
            "Simpan acuan dan garis sebagai alat bantu.",
            "Mainkan!"
          ],
          "papan": [
            "lanjut C",
            "fondasi",
            "alat",
            "main"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Sejajarkan",
      "stepDesc": "Tulis di tabel kolom sama.",
      "icon": "▦",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Dari kiri",
      "stepDesc": "Banding tempat terbesar.",
      "icon": "⬅️",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Jika sama",
      "stepDesc": "Geser satu tempat ke kanan.",
      "icon": "➡️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Tentukan tanda",
      "stepDesc": "> < =",
      "icon": "✍️",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Acuan",
      "stepDesc": "Perkiraan dengan 10rb/50rb.",
      "icon": "🎯",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Garis",
      "stepDesc": "Letakkan lalu urut.",
      "icon": "📏",
      "flowFrom": "5",
      "flowTo": "7"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Cek arah",
      "stepDesc": "Naik atau turun sesuai soal.",
      "icon": "✅",
      "flowFrom": "6",
      "flowTo": "8"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Main",
      "stepDesc": "Latihan banding-urut.",
      "icon": "🎮",
      "flowFrom": "7",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "Dari kiri",
      "emoji": "⬅️",
      "countNum": 1,
      "countWord": "utama",
      "suara": "Aturan"
    },
    {
      "judul": "Geser",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "jika sama",
      "suara": "Lanjut"
    },
    {
      "judul": "Garis",
      "emoji": "📏",
      "countNum": 1,
      "countWord": "kanan>",
      "suara": "Posisi"
    },
    {
      "judul": "Acuan",
      "emoji": "🎯",
      "countNum": 50000,
      "countWord": "patokan",
      "suara": "50rb"
    },
    {
      "judul": "Contoh",
      "emoji": "🔢",
      "countNum": 1,
      "countWord": "38<40",
      "suara": "Urut"
    },
    {
      "judul": "Jangan satuan",
      "emoji": "🚫",
      "countNum": 1,
      "countWord": "salah",
      "suara": "Bukan dari kanan"
    },
    {
      "judul": "Naik",
      "emoji": "📶",
      "countNum": 1,
      "countWord": "kecil→",
      "suara": "Ascending"
    },
    {
      "judul": "Turun",
      "emoji": "📉",
      "countNum": 1,
      "countWord": "besar→",
      "suara": "Descending"
    },
    {
      "judul": "Nol",
      "emoji": "0",
      "countNum": 1,
      "countWord": "hitung",
      "suara": "Tetap ada"
    },
    {
      "judul": "Siap C",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "urai",
      "suara": "Lanjut"
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "banding-tanda",
      "title": "Isi Tanda Banding",
      "bookReference": "hlm. 14–15",
      "objective": "Banding dari kiri. Latihan: >, <, =..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Banding Digit per Tempat: Geser jika sama.",
      "voiceGuide": "Banding Digit per Tempat. Geser jika sama.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "strategi-banding",
      "title": "Strategi dari Kiri",
      "bookReference": "hlm. 11–13",
      "objective": "Banding dari kiri. Latihan: Mulai puluh ribuan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Banding Digit per Tempat: Geser jika sama.",
      "voiceGuide": "Banding Digit per Tempat. Geser jika sama.",
      "emoji": "⬅️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "pilih-ekstrem",
      "title": "Paling Besar/Kecil",
      "bookReference": "hlm. 10–13",
      "objective": "Banding dari kiri. Latihan: Cari ekstrem..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Banding Digit per Tempat: Geser jika sama.",
      "voiceGuide": "Banding Digit per Tempat. Geser jika sama.",
      "emoji": "🏆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-ukuran",
      "title": "Pilah Besar/Kecil",
      "bookReference": "hlm. 10–13",
      "objective": "Banding dari kiri. Latihan: Memilah..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Banding Digit per Tempat: Geser jika sama.",
      "voiceGuide": "Banding Digit per Tempat. Geser jika sama.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-banding",
      "title": "Jodohkan Hasil Banding",
      "bookReference": "hlm. 14–15",
      "objective": "Menjodohkan.. Ingat Banding Digit per Tempat. (Banding Digit per Tempat)",
      "mechanicDescription": "Tiga ronde. Gunakan Banding Digit per Tempat.",
      "voiceGuide": "Banding Digit per Tempat. Mainkan dengan teliti.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-banding",
      "title": "Memori Banding",
      "bookReference": "hlm. 14–15",
      "objective": "Memori.. Ingat Banding Digit per Tempat. (Banding Digit per Tempat)",
      "mechanicDescription": "Tiga ronde. Gunakan Banding Digit per Tempat.",
      "voiceGuide": "Banding Digit per Tempat. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-bilangan-b",
      "title": "Ketuk Bilangan Banding",
      "bookReference": "hlm. 10–14",
      "objective": "Mengetuk.. Ingat Banding Digit per Tempat. (Banding Digit per Tempat)",
      "mechanicDescription": "Tiga ronde. Gunakan Banding Digit per Tempat.",
      "voiceGuide": "Banding Digit per Tempat. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-b",
      "title": "Ketuk Semua Sesuai Batas",
      "bookReference": "hlm. 10–14",
      "objective": "Ketuk semua.. Ingat Banding Digit per Tempat. (Banding Digit per Tempat)",
      "mechanicDescription": "Tiga ronde. Gunakan Banding Digit per Tempat.",
      "voiceGuide": "Banding Digit per Tempat. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-dakon",
      "title": "Cerita Dakon dan Urutan",
      "bookReference": "hlm. 10–13",
      "objective": "Soal cerita.. Ingat Banding Digit per Tempat. (Banding Digit per Tempat)",
      "mechanicDescription": "Tiga ronde. Gunakan Banding Digit per Tempat.",
      "voiceGuide": "Banding Digit per Tempat. Mainkan dengan teliti.",
      "emoji": "🎲",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-banding",
      "title": "Urutkan Naik/Turun",
      "bookReference": "hlm. 13–15",
      "objective": "Mengurutkan.. Ingat Banding Digit per Tempat. (Banding Digit per Tempat)",
      "mechanicDescription": "Tiga ronde. Gunakan Banding Digit per Tempat.",
      "voiceGuide": "Banding Digit per Tempat. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "diagram-banding",
      "title": "Diagram Banding",
      "bookReference": "hlm. 14–15",
      "objective": "Letakkan di garis. Latihan: Baca tanda..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Urutan di Garis Bilangan: Kanan lebih besar.",
      "voiceGuide": "Urutan di Garis Bilangan. Kanan lebih besar.",
      "diagramType": "cmp",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "diagram-urut",
      "title": "Diagram Urutan",
      "bookReference": "hlm. 13",
      "objective": "Letakkan di garis. Latihan: Baca urutan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Urutan di Garis Bilangan: Kanan lebih besar.",
      "voiceGuide": "Urutan di Garis Bilangan. Kanan lebih besar.",
      "diagramType": "ord",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-b",
      "title": "Jodohkan Diagram Banding",
      "bookReference": "hlm. 14–15",
      "objective": "Letakkan di garis. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Urutan di Garis Bilangan: Kanan lebih besar.",
      "voiceGuide": "Urutan di Garis Bilangan. Kanan lebih besar.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-b",
      "title": "Memori Diagram Banding",
      "bookReference": "hlm. 14–15",
      "objective": "Letakkan di garis. Latihan: Memori..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Urutan di Garis Bilangan: Kanan lebih besar.",
      "voiceGuide": "Urutan di Garis Bilangan. Kanan lebih besar.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-b",
      "title": "Tabel Banding",
      "bookReference": "hlm. 14–15",
      "objective": "Isi tabel.. Ingat Urutan di Garis Bilangan. (Urutan di Garis Bilangan)",
      "mechanicDescription": "Tiga tabel. Gunakan Urutan di Garis Bilangan.",
      "voiceGuide": "Urutan di Garis Bilangan. Mainkan dengan teliti.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-pb",
      "title": "Ketuk Semua Diagram",
      "bookReference": "hlm. 10–14",
      "objective": "Ketuk semua.. Ingat Urutan di Garis Bilangan. (Urutan di Garis Bilangan)",
      "mechanicDescription": "Tiga ronde. Gunakan Urutan di Garis Bilangan.",
      "voiceGuide": "Urutan di Garis Bilangan. Mainkan dengan teliti.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-b",
      "title": "Pilah Diagram Ukuran",
      "bookReference": "hlm. 10–13",
      "objective": "Pilah.. Ingat Urutan di Garis Bilangan. (Urutan di Garis Bilangan)",
      "mechanicDescription": "Tiga ronde. Gunakan Urutan di Garis Bilangan.",
      "voiceGuide": "Urutan di Garis Bilangan. Mainkan dengan teliti.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "papan-banding",
      "title": "Papan Banding Tempat",
      "bookReference": "hlm. 11–12",
      "objective": "Banding kolom.. Ingat Urutan di Garis Bilangan. (Urutan di Garis Bilangan)",
      "mechanicDescription": "Tiga ronde. Gunakan Urutan di Garis Bilangan.",
      "voiceGuide": "Urutan di Garis Bilangan. Mainkan dengan teliti.",
      "diagramType": "board",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "choose-b",
      "title": "Pilih Strategi Cocok",
      "bookReference": "hlm. 11–14",
      "objective": "Pilih pernyataan.. Ingat Urutan di Garis Bilangan. (Urutan di Garis Bilangan)",
      "mechanicDescription": "Tiga ronde. Gunakan Urutan di Garis Bilangan.",
      "voiceGuide": "Urutan di Garis Bilangan. Mainkan dengan teliti.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-b",
      "title": "Cerita Diagram Banding",
      "bookReference": "hlm. 10–15",
      "objective": "Cerita + diagram.. Ingat Urutan di Garis Bilangan. (Urutan di Garis Bilangan)",
      "mechanicDescription": "Tiga ronde. Gunakan Urutan di Garis Bilangan.",
      "voiceGuide": "Urutan di Garis Bilangan. Mainkan dengan teliti.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-tanda",
      "title": "Tulis Tanda Banding",
      "bookReference": "hlm. 15",
      "objective": "Perkiraan dulu. 000 atau 50.000 sebagai acuan perkiraan. Latihan: Menulis > < =..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Bilangan Acuan: Lalu banding teliti.",
      "voiceGuide": "Bilangan Acuan. Lalu banding teliti.",
      "symbolLarge": "><=",
      "wordLarge": "TANDA",
      "mathNotation": "banding"
    },
    {
      "stage": "Abstract",
      "gameType": "write-ekstrem",
      "title": "Tulis Bilangan Ekstrem",
      "bookReference": "hlm. 13",
      "objective": "Perkiraan dulu. 000 atau 50.000 sebagai acuan perkiraan. Latihan: Menulis ekstrem..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Bilangan Acuan: Lalu banding teliti.",
      "voiceGuide": "Bilangan Acuan. Lalu banding teliti.",
      "symbolLarge": "min/max",
      "wordLarge": "EKSTREEM",
      "mathNotation": "urut"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-strategi",
      "title": "Pilih Langkah Banding",
      "bookReference": "hlm. 11–13",
      "objective": "Perkiraan dulu. 000 atau 50.000 sebagai acuan perkiraan. Latihan: Strategi tempat..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Bilangan Acuan: Lalu banding teliti.",
      "voiceGuide": "Bilangan Acuan. Lalu banding teliti.",
      "symbolLarge": "PR→RB",
      "wordLarge": "STRATEGI",
      "mathNotation": "kiri"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-b",
      "title": "Urutkan Abstrak",
      "bookReference": "hlm. 13–15",
      "objective": "Perkiraan dulu. 000 atau 50.000 sebagai acuan perkiraan. Latihan: Mengurutkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Bilangan Acuan: Lalu banding teliti.",
      "voiceGuide": "Bilangan Acuan. Lalu banding teliti.",
      "symbolLarge": "naik",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-b",
      "title": "Jodohkan Notasi Banding",
      "bookReference": "hlm. 14–15",
      "objective": "Jodohkan.. Ingat Bilangan Acuan. (Bilangan Acuan)",
      "mechanicDescription": "Tiga ronde. Gunakan Bilangan Acuan.",
      "voiceGuide": "Bilangan Acuan. Mainkan dengan teliti.",
      "symbolLarge": "a?b",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-b",
      "title": "Memori Notasi Banding",
      "bookReference": "hlm. 14–15",
      "objective": "Memori.. Ingat Bilangan Acuan. (Bilangan Acuan)",
      "mechanicDescription": "Tiga ronde. Gunakan Bilangan Acuan.",
      "voiceGuide": "Bilangan Acuan. Mainkan dengan teliti.",
      "symbolLarge": "urut",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-b",
      "title": "Benar atau Salah: Banding",
      "bookReference": "hlm. 10–15",
      "objective": "Menilai.. Ingat Bilangan Acuan. (Bilangan Acuan)",
      "mechanicDescription": "Dua ronde. Gunakan Bilangan Acuan.",
      "voiceGuide": "Bilangan Acuan. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-b",
      "title": "Detektif Banding Urut",
      "bookReference": "hlm. 10–15",
      "objective": "Petunjuk → jawaban.. Ingat Bilangan Acuan. (Bilangan Acuan)",
      "mechanicDescription": "Tiga soal. Gunakan Bilangan Acuan.",
      "voiceGuide": "Bilangan Acuan. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-b",
      "title": "Peta Konsep Banding",
      "bookReference": "hlm. 2–14",
      "objective": "Mengisi kotak.. Ingat Bilangan Acuan. (Bilangan Acuan)",
      "mechanicDescription": "Satu peta. Gunakan Bilangan Acuan.",
      "voiceGuide": "Bilangan Acuan. Mainkan dengan teliti.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-b",
      "title": "Cerita Angka Banding",
      "bookReference": "hlm. 10–15",
      "objective": "Soal cerita.. Ingat Bilangan Acuan. (Bilangan Acuan)",
      "mechanicDescription": "Tiga ronde. Gunakan Bilangan Acuan.",
      "voiceGuide": "Bilangan Acuan. Mainkan dengan teliti.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "⬅️",
      "nama": "Dari kiri",
      "isi": "Bandingkan digit tempat terbesar dulu.",
      "suara": "Dari kiri."
    },
    {
      "ikon": "📏",
      "nama": "Garis",
      "isi": "Lebih kanan lebih besar.",
      "suara": "Garis."
    },
    {
      "ikon": "🎯",
      "nama": "Acuan",
      "isi": "Pakai bilangan patokan sebelum teliti.",
      "suara": "Acuan."
    },
    {
      "ikon": "🚫",
      "nama": "Bukan dari satuan",
      "isi": "Jangan mulai banding dari kanan.",
      "suara": "Hindari."
    }
  ],
  "poinSuara": "Banding dari kiri, pakai acuan dan garis, cek arah urutan.",
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
  "rumah": "Ayo Mencoba: terapkan Banding Digit per Tempat pada satu soal di rumah.",
  "refleksi": [
    "Bagaimana Banding Digit per Tempat membantumu?",
    "Kapan memakai Urutan di Garis Bilangan?",
    "Apa bedanya dengan hanya menghafal rumus?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Leftmost Compare",
      "namaId": "Banding Digit per Tempat",
      "asal": "Place-value comparison",
      "ringkas": "Bandingkan dari tempat terbesar; baru geser ke kanan jika sama.",
      "tahap": [
        "Story",
        "Mind",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Number Line Order",
      "namaId": "Urutan di Garis Bilangan",
      "asal": "Measurement sense",
      "ringkas": "Bilangan lebih kanan lebih besar.",
      "tahap": [
        "Story",
        "Picture",
        "Concrete"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Benchmark Numbers",
      "namaId": "Bilangan Acuan",
      "asal": "Number sense",
      "ringkas": "Pakai 10.000, 50.000, 100.000 sebagai patokan perkiraan.",
      "tahap": [
        "Story",
        "Infografis"
      ]
    }
  ]
};

export const SUB_C51: SubBabNaskah = {
  "id": "C",
  "codeTitle": "Sub-Bab C (Komposisi dan Dekomposisi)",
  "fullTitle": "Sub-Bab C: Komposisi dan Dekomposisi Bilangan Cacah Sampai 100.000",
  "targetDescription": "Siswa mengurai dan menyusun kembali bilangan sampai 100.000 dengan bentuk uraian nilai tempat serta pengelompokan fleksibel sesuai Buku Siswa Kelas V Bab 1 Sub-Bab C.",
  "secondaryBg": "#DCFCE7",
  "secondaryBorder": "#16A34A",
  "secondaryText": "#14532D",
  "silabus": {
    "teksSuara": "Kita memecah bilangan menjadi jumlah nilai tempat, lalu menyusunnya kembali. Boleh mengelompokkan ulang selama total sama. Itu komposisi dan dekomposisi. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa melakukan komposisi dan dekomposisi bilangan sampai 100.000.",
    "referensi": "Buku Siswa Matematika Kelas V Kemendikbudristek (Bab 1 Sub-Bab C)."
  },
  "videos": [
    {
      "id": "K5B1C-V1",
      "judul": "Urai lalu Susun",
      "subjudul": "Bentuk Uraian",
      "adegan": [
        {
          "id": "K5B1C-V1-1",
          "judul": "Uraian",
          "ketukan": [
            "52.307 = 50.000 + 2.000 + 300 + 7.",
            "Setiap suku adalah nilai digit di tempatnya.",
            "METODE LUAR · Bentuk Uraian: melihat nilai, bukan hanya deretan digit.",
            "Nol di puluhan tidak perlu ditulis sebagai +0, tapi tempatnya tetap ada di bentuk lazim."
          ],
          "papan": [
            "urai",
            "suku",
            "lihat nilai",
            "nol"
          ]
        },
        {
          "id": "K5B1C-V1-2",
          "judul": "Susun kembali",
          "ketukan": [
            "Jumlahkan uraian: kembali 52.307.",
            "METODE LUAR · Kembali ke Bentuk Lazim: cek tidak ada yang hilang.",
            "Jika hasil beda, ada suku yang salah nilai tempat.",
            "Latihan bolak-balik uraian ↔ lazim."
          ],
          "papan": [
            "kembali",
            "cek",
            "debug",
            "drill"
          ]
        },
        {
          "id": "K5B1C-V1-3",
          "judul": "Kenapa penting",
          "ketukan": [
            "Uraian menyiapkan operasi hitung dan perkiraan.",
            "Juga membantu memahami menyimpan dan meminjam nanti.",
            "Pahami dulu sebelum buru-buru algoritma.",
            "Siap pengelompokan fleksibel."
          ],
          "papan": [
            "siap D",
            "jembatan",
            "dasar",
            "lanjut"
          ]
        }
      ]
    },
    {
      "id": "K5B1C-V2",
      "judul": "Tukar Sepuluh",
      "subjudul": "Susun Ulang Nilai Tempat",
      "adegan": [
        {
          "id": "K5B1C-V2-1",
          "judul": "Ide tukar",
          "ketukan": [
            "Sepuluh ratusan = satu ribuan. Sepuluh ribuan = satu puluh ribuan.",
            "METODE LUAR · Susun Ulang Nilai Tempat: total nilai tetap, bentuk boleh beda.",
            "Contoh: 3.000 + 14.00 = 4.000 + 400? Hati-hati satuan — gunakan contoh bersih: 2.500 = 1.500 + 1.000.",
            "Atau 1.400 = 14 ratusan."
          ],
          "papan": [
            "tukar",
            "tetap total",
            "contoh",
            "14 ratusan"
          ]
        },
        {
          "id": "K5B1C-V2-2",
          "judul": "Fleksibel",
          "ketukan": [
            "Anak yang fleksibel melihat banyak cara menulis jumlah yang sama.",
            "Itu bekal kuat untuk penjumlahan bersusun.",
            "Jangan mengubah total saat menukar bundel.",
            "Cek dengan menjumlahkan lagi."
          ],
          "papan": [
            "fleksibel",
            "bekal",
            "total sama",
            "cek"
          ]
        },
        {
          "id": "K5B1C-V2-3",
          "judul": "Siap D",
          "ketukan": [
            "Komposisi-dekomposisi siap.",
            "Berikutnya operasi hitung sampai 100.000.",
            "Uraian dan tukar sepuluh akan muncul saat menyimpan/meminjam.",
            "Ayo main menyusun bilangan!"
          ],
          "papan": [
            "siap",
            "lanjut D",
            "kaitan",
            "main"
          ]
        }
      ]
    },
    {
      "id": "K5B1C-V3",
      "judul": "Latihan Urai",
      "subjudul": "Kembali ke Bentuk Lazim",
      "adegan": [
        {
          "id": "K5B1C-V3-1",
          "judul": "Soal",
          "ketukan": [
            "Urai 70.080. Ada 7 puluh ribuan dan 8 puluhan.",
            "Tulis 70.000 + 80.",
            "Kembali ke lazim: 70.080.",
            "Nol di tengah wajib di bentuk lazim."
          ],
          "papan": [
            "70080",
            "urai",
            "lazim",
            "nol wajib"
          ]
        },
        {
          "id": "K5B1C-V3-2",
          "judul": "Kesalahan",
          "ketukan": [
            "Kesalahan: 70.000 + 8 untuk 70.080 — salah tempat.",
            "Kesalahan: menghilangkan nol saat kembali ke lazim.",
            "Pakai tabel kolom untuk mengunci tempat.",
            "Ulangi baca periode."
          ],
          "papan": [
            "salah",
            "hilangkan",
            "tabel",
            "baca"
          ]
        },
        {
          "id": "K5B1C-V3-3",
          "judul": "Tutup C",
          "ketukan": [
            "Urai, tukar, kembali — tiga gerak utama.",
            "Siap operasi hitung.",
            "Mainkan!",
            "Hebat."
          ],
          "papan": [
            "tiga",
            "siap D",
            "main",
            "hebat"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Lihat bilangan",
      "stepDesc": "Bentuk lazim apa?",
      "icon": "👀",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Urai",
      "stepDesc": "Jumlah nilai tempat.",
      "icon": "➕",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Tukar bundel",
      "stepDesc": "10 di bawah = 1 di atas.",
      "icon": "🔄",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Total sama",
      "stepDesc": "Nilai tidak boleh berubah.",
      "icon": "⚖️",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Kembali lazim",
      "stepDesc": "Tulis bentuk biasa.",
      "icon": "✍️",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Isi nol",
      "stepDesc": "Jaga tempat kosong.",
      "icon": "0",
      "flowFrom": "5",
      "flowTo": "7"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Cek jumlah",
      "stepDesc": "Urai = lazim?",
      "icon": "✅",
      "flowFrom": "6",
      "flowTo": "8"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Main",
      "stepDesc": "Latihan komposisi.",
      "icon": "🎮",
      "flowFrom": "7",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "Urai",
      "emoji": "➕",
      "countNum": 1,
      "countWord": "nilai",
      "suara": "Expanded"
    },
    {
      "judul": "52.307",
      "emoji": "🔢",
      "countNum": 52307,
      "countWord": "urai",
      "suara": "Contoh"
    },
    {
      "judul": "Tukar",
      "emoji": "🔄",
      "countNum": 10,
      "countWord": "bundel",
      "suara": "×10"
    },
    {
      "judul": "Total sama",
      "emoji": "⚖️",
      "countNum": 1,
      "countWord": "tetap",
      "suara": "Invariant"
    },
    {
      "judul": "Lazim",
      "emoji": "✍️",
      "countNum": 1,
      "countWord": "kembali",
      "suara": "Standard"
    },
    {
      "judul": "Nol",
      "emoji": "0",
      "countNum": 1,
      "countWord": "jaga",
      "suara": "Tempat"
    },
    {
      "judul": "14 ratus",
      "emoji": "▦",
      "countNum": 1400,
      "countWord": "=1.400",
      "suara": "Fleksibel"
    },
    {
      "judul": "Salah tempat",
      "emoji": "🚫",
      "countNum": 1,
      "countWord": "hindari",
      "suara": "Cek kolom"
    },
    {
      "judul": "Tabel",
      "emoji": "▦",
      "countNum": 1,
      "countWord": "kunci",
      "suara": "Alat"
    },
    {
      "judul": "Siap D",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "operasi",
      "suara": "Lanjut"
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "komposisi-pecahan",
      "title": "Susun dari Pecahan",
      "bookReference": "hlm. 15–16",
      "objective": "Urai nilai digit. Latihan: Menyusun total dari pecahan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Bentuk Uraian: Jumlahkan suku.",
      "voiceGuide": "Bentuk Uraian. Jumlahkan suku.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "dekomposisi-panjang",
      "title": "Uraikan Bentuk Panjang",
      "bookReference": "hlm. 16–17",
      "objective": "Urai nilai digit. Latihan: Menulis jumlah nilai tempat..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Bentuk Uraian: Jumlahkan suku.",
      "voiceGuide": "Bentuk Uraian. Jumlahkan suku.",
      "emoji": "📜",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "banyak-cara",
      "title": "Banyak Cara Komposisi",
      "bookReference": "hlm. 16–17",
      "objective": "Urai nilai digit. Latihan: Mengenali cara setara..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Bentuk Uraian: Jumlahkan suku.",
      "voiceGuide": "Bentuk Uraian. Jumlahkan suku.",
      "emoji": "🔄",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-komposisi",
      "title": "Pilah Sama/Beda Total",
      "bookReference": "hlm. 15–17",
      "objective": "Urai nilai digit. Latihan: Memilah komposisi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Bentuk Uraian: Jumlahkan suku.",
      "voiceGuide": "Bentuk Uraian. Jumlahkan suku.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-komposisi",
      "title": "Jodohkan Pecahan–Total",
      "bookReference": "hlm. 15–17",
      "objective": "Menjodohkan.. Ingat Bentuk Uraian. (Bentuk Uraian)",
      "mechanicDescription": "Tiga ronde. Gunakan Bentuk Uraian.",
      "voiceGuide": "Bentuk Uraian. Mainkan dengan teliti.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-komposisi",
      "title": "Memori Komposisi",
      "bookReference": "hlm. 15–17",
      "objective": "Memori.. Ingat Bentuk Uraian. (Bentuk Uraian)",
      "mechanicDescription": "Tiga ronde. Gunakan Bentuk Uraian.",
      "voiceGuide": "Bentuk Uraian. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-komposisi",
      "title": "Ketuk Hasil Komposisi",
      "bookReference": "hlm. 15–17",
      "objective": "Mengetuk.. Ingat Bentuk Uraian. (Bentuk Uraian)",
      "mechanicDescription": "Tiga ronde. Gunakan Bentuk Uraian.",
      "voiceGuide": "Bentuk Uraian. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-komposisi",
      "title": "Ketuk Semua Setara",
      "bookReference": "hlm. 16–17",
      "objective": "Ketuk semua.. Ingat Bentuk Uraian. (Bentuk Uraian)",
      "mechanicDescription": "Tiga ronde. Gunakan Bentuk Uraian.",
      "voiceGuide": "Bentuk Uraian. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-komposisi",
      "title": "Cerita Asep Lukas Komang",
      "bookReference": "hlm. 15–17",
      "objective": "Soal cerita.. Ingat Bentuk Uraian. (Bentuk Uraian)",
      "mechanicDescription": "Tiga ronde. Gunakan Bentuk Uraian.",
      "voiceGuide": "Bentuk Uraian. Mainkan dengan teliti.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-komposisi",
      "title": "Urutkan Hasil Susunan",
      "bookReference": "hlm. 15–17",
      "objective": "Mengurutkan.. Ingat Bentuk Uraian. (Bentuk Uraian)",
      "mechanicDescription": "Tiga ronde. Gunakan Bentuk Uraian.",
      "voiceGuide": "Bentuk Uraian. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "papan-komposisi",
      "title": "Papan Susun Pecahan",
      "bookReference": "hlm. 16",
      "objective": "Tukar bundel sepuluh. Latihan: Baca papan tempat..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Susun Ulang Nilai Tempat: Total tetap.",
      "voiceGuide": "Susun Ulang Nilai Tempat. Total tetap.",
      "diagramType": "board",
      "numberA": 1,
      "numberB": 5
    },
    {
      "stage": "Picture",
      "gameType": "diagram-dekom",
      "title": "Diagram Bentuk Panjang",
      "bookReference": "hlm. 16–17",
      "objective": "Tukar bundel sepuluh. Latihan: Baca uraian..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Susun Ulang Nilai Tempat: Total tetap.",
      "voiceGuide": "Susun Ulang Nilai Tempat. Total tetap.",
      "diagramType": "expand",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-c",
      "title": "Jodohkan Diagram Komposisi",
      "bookReference": "hlm. 15–17",
      "objective": "Tukar bundel sepuluh. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Susun Ulang Nilai Tempat: Total tetap.",
      "voiceGuide": "Susun Ulang Nilai Tempat. Total tetap.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-c",
      "title": "Memori Diagram Komposisi",
      "bookReference": "hlm. 15–17",
      "objective": "Tukar bundel sepuluh. Latihan: Memori..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Susun Ulang Nilai Tempat: Total tetap.",
      "voiceGuide": "Susun Ulang Nilai Tempat. Total tetap.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-c",
      "title": "Tabel Komposisi",
      "bookReference": "hlm. 16–17",
      "objective": "Isi tabel.. Ingat Susun Ulang Nilai Tempat. (Susun Ulang Nilai Tempat)",
      "mechanicDescription": "Tiga tabel. Gunakan Susun Ulang Nilai Tempat.",
      "voiceGuide": "Susun Ulang Nilai Tempat. Mainkan dengan teliti.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-pc",
      "title": "Ketuk Semua Diagram C",
      "bookReference": "hlm. 15–17",
      "objective": "Ketuk semua.. Ingat Susun Ulang Nilai Tempat. (Susun Ulang Nilai Tempat)",
      "mechanicDescription": "Tiga ronde. Gunakan Susun Ulang Nilai Tempat.",
      "voiceGuide": "Susun Ulang Nilai Tempat. Mainkan dengan teliti.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-c",
      "title": "Pilah Diagram Setara",
      "bookReference": "hlm. 15–17",
      "objective": "Pilah.. Ingat Susun Ulang Nilai Tempat. (Susun Ulang Nilai Tempat)",
      "mechanicDescription": "Tiga ronde. Gunakan Susun Ulang Nilai Tempat.",
      "voiceGuide": "Susun Ulang Nilai Tempat. Mainkan dengan teliti.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "cara-fleksibel",
      "title": "Model Cara Fleksibel",
      "bookReference": "hlm. 16–17",
      "objective": "Cara setara.. Ingat Susun Ulang Nilai Tempat. (Susun Ulang Nilai Tempat)",
      "mechanicDescription": "Tiga ronde. Gunakan Susun Ulang Nilai Tempat.",
      "voiceGuide": "Susun Ulang Nilai Tempat. Mainkan dengan teliti.",
      "diagramType": "flex",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "choose-c",
      "title": "Pilih Pernyataan Komposisi",
      "bookReference": "hlm. 15–17",
      "objective": "Pilih pernyataan.. Ingat Susun Ulang Nilai Tempat. (Susun Ulang Nilai Tempat)",
      "mechanicDescription": "Tiga ronde. Gunakan Susun Ulang Nilai Tempat.",
      "voiceGuide": "Susun Ulang Nilai Tempat. Mainkan dengan teliti.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-c",
      "title": "Cerita Diagram Komposisi",
      "bookReference": "hlm. 15–17",
      "objective": "Cerita + diagram.. Ingat Susun Ulang Nilai Tempat. (Susun Ulang Nilai Tempat)",
      "mechanicDescription": "Tiga ronde. Gunakan Susun Ulang Nilai Tempat.",
      "voiceGuide": "Susun Ulang Nilai Tempat. Mainkan dengan teliti.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-total",
      "title": "Tulis Total Komposisi",
      "bookReference": "hlm. 15–16",
      "objective": "Tulis bentuk biasa. Latihan: Menulis total..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Kembali ke Bentuk Lazim: Jaga nol.",
      "voiceGuide": "Kembali ke Bentuk Lazim. Jaga nol.",
      "symbolLarge": "38.600",
      "wordLarge": "TOTAL",
      "mathNotation": "jumlah"
    },
    {
      "stage": "Abstract",
      "gameType": "write-uraian",
      "title": "Tulis Bentuk Panjang",
      "bookReference": "hlm. 16–17",
      "objective": "Tulis bentuk biasa. Latihan: Menulis uraian..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Kembali ke Bentuk Lazim: Jaga nol.",
      "voiceGuide": "Kembali ke Bentuk Lazim. Jaga nol.",
      "symbolLarge": "30k+8k+600",
      "wordLarge": "URAIAN",
      "mathNotation": "panjang"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-cara",
      "title": "Pilih Cara Setara",
      "bookReference": "hlm. 16–17",
      "objective": "Tulis bentuk biasa. Latihan: Cara fleksibel..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Kembali ke Bentuk Lazim: Jaga nol.",
      "voiceGuide": "Kembali ke Bentuk Lazim. Jaga nol.",
      "symbolLarge": "cara2",
      "wordLarge": "CARA",
      "mathNotation": "setara"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-c",
      "title": "Urutkan Hasil Abstrak",
      "bookReference": "hlm. 15–17",
      "objective": "Tulis bentuk biasa. Latihan: Mengurutkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Kembali ke Bentuk Lazim: Jaga nol.",
      "voiceGuide": "Kembali ke Bentuk Lazim. Jaga nol.",
      "symbolLarge": "naik",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-c",
      "title": "Jodohkan Notasi Komposisi",
      "bookReference": "hlm. 15–17",
      "objective": "Jodohkan.. Ingat Kembali ke Bentuk Lazim. (Kembali ke Bentuk Lazim)",
      "mechanicDescription": "Tiga ronde. Gunakan Kembali ke Bentuk Lazim.",
      "voiceGuide": "Kembali ke Bentuk Lazim. Mainkan dengan teliti.",
      "symbolLarge": "pecahan",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-c",
      "title": "Memori Notasi Komposisi",
      "bookReference": "hlm. 15–17",
      "objective": "Memori.. Ingat Kembali ke Bentuk Lazim. (Kembali ke Bentuk Lazim)",
      "mechanicDescription": "Tiga ronde. Gunakan Kembali ke Bentuk Lazim.",
      "voiceGuide": "Kembali ke Bentuk Lazim. Mainkan dengan teliti.",
      "symbolLarge": "setara",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-c",
      "title": "Benar atau Salah: Komposisi",
      "bookReference": "hlm. 15–17",
      "objective": "Menilai.. Ingat Kembali ke Bentuk Lazim. (Kembali ke Bentuk Lazim)",
      "mechanicDescription": "Dua ronde. Gunakan Kembali ke Bentuk Lazim.",
      "voiceGuide": "Kembali ke Bentuk Lazim. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-c",
      "title": "Detektif Komposisi",
      "bookReference": "hlm. 15–17",
      "objective": "Petunjuk → bilangan.. Ingat Kembali ke Bentuk Lazim. (Kembali ke Bentuk Lazim)",
      "mechanicDescription": "Tiga soal. Gunakan Kembali ke Bentuk Lazim.",
      "voiceGuide": "Kembali ke Bentuk Lazim. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-c",
      "title": "Peta Konsep Komposisi",
      "bookReference": "hlm. 15–17",
      "objective": "Mengisi kotak.. Ingat Kembali ke Bentuk Lazim. (Kembali ke Bentuk Lazim)",
      "mechanicDescription": "Satu peta. Gunakan Kembali ke Bentuk Lazim.",
      "voiceGuide": "Kembali ke Bentuk Lazim. Mainkan dengan teliti.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-c",
      "title": "Cerita Angka Komposisi",
      "bookReference": "hlm. 15–17",
      "objective": "Soal cerita.. Ingat Kembali ke Bentuk Lazim. (Kembali ke Bentuk Lazim)",
      "mechanicDescription": "Tiga ronde. Gunakan Kembali ke Bentuk Lazim.",
      "voiceGuide": "Kembali ke Bentuk Lazim. Mainkan dengan teliti.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "➕",
      "nama": "Uraian",
      "isi": "Tulis sebagai jumlah nilai tempat.",
      "suara": "Urai."
    },
    {
      "ikon": "🔄",
      "nama": "Tukar sepuluh",
      "isi": "Bundel ulang tanpa mengubah total.",
      "suara": "Tukar."
    },
    {
      "ikon": "✍️",
      "nama": "Bentuk lazim",
      "isi": "Selalu bisa kembali ke tulisan biasa.",
      "suara": "Lazim."
    },
    {
      "ikon": "0",
      "nama": "Nol",
      "isi": "Jaga tempat kosong di bentuk lazim.",
      "suara": "Nol."
    }
  ],
  "poinSuara": "Urai nilai tempat, tukar bundel dengan total sama, kembali ke lazim.",
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
  "rumah": "Ayo Mencoba: terapkan Bentuk Uraian pada satu soal di rumah.",
  "refleksi": [
    "Bagaimana Bentuk Uraian membantumu?",
    "Kapan memakai Susun Ulang Nilai Tempat?",
    "Apa bedanya dengan hanya menghafal rumus?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Expanded Form",
      "namaId": "Bentuk Uraian",
      "asal": "Place-value expanded notation",
      "ringkas": "Tulis bilangan sebagai jumlah nilai tiap digit.",
      "tahap": [
        "Story",
        "Mind",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Flexible Grouping",
      "namaId": "Susun Ulang Nilai Tempat",
      "asal": "Number flexibility",
      "ringkas": "Tukar sepuluh di satu tempat menjadi satu di tempat di atasnya, atau sebaliknya.",
      "tahap": [
        "Story",
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Standard Form Return",
      "namaId": "Kembali ke Bentuk Lazim",
      "asal": "Notation fluency",
      "ringkas": "Setelah mengurai atau menyusun ulang, tulis kembali bentuk biasa.",
      "tahap": [
        "Story",
        "Infografis",
        "Abstract"
      ]
    }
  ]
};

export const SUB_D51: SubBabNaskah = {
  "id": "D",
  "codeTitle": "Sub-Bab D (Operasi Hitung)",
  "fullTitle": "Sub-Bab D: Operasi Hitung pada Bilangan Cacah Sampai 100.000",
  "targetDescription": "Siswa melakukan operasi hitung bilangan sampai 100.000 dengan algoritma bersusun, menyimpan/meminjam, dan perkiraan terlebih dahulu sesuai Buku Siswa Kelas V Bab 1 Sub-Bab D.",
  "secondaryBg": "#FEF3C7",
  "secondaryBorder": "#D97706",
  "secondaryText": "#78350F",
  "silabus": {
    "teksSuara": "Kita menjumlahkan dan mengurangkan bilangan besar dengan bersusun. Perkiraan dulu agar tahu hasil kira-kira. Menyimpan dan meminjam adalah tukar sepuluh antar tempat. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa melakukan operasi hitung pada bilangan cacah sampai 100.000.",
    "referensi": "Buku Siswa Matematika Kelas V Kemendikbudristek (Bab 1 Sub-Bab D)."
  },
  "videos": [
    {
      "id": "K5B1D-V1",
      "judul": "Perkiraan sebelum Teliti",
      "subjudul": "Perkiraan Dulu",
      "adegan": [
        {
          "id": "K5B1D-V1-1",
          "judul": "Kenapa perkiraan",
          "ketukan": [
            "Sebelum bersusun, bulatkan bilangan lalu hitung kasar.",
            "METODE LUAR · Perkiraan Dulu: agar tahu hasil masuk akal atau tidak.",
            "Contoh: 38.600 + 21.400 ≈ 39.000 + 21.000 = 60.000.",
            "Hasil teliti harus dekat dengan itu."
          ],
          "papan": [
            "perkiraan",
            "masuk akal",
            "≈60rb",
            "dekat"
          ]
        },
        {
          "id": "K5B1D-V1-2",
          "judul": "Bersusun",
          "ketukan": [
            "Tulis bilangan sejajar kolom nilai tempat.",
            "METODE LUAR · Algoritma Bersusun: mulai dari satuan ke kiri.",
            "Jumlahkan atau kurangkan per kolom.",
            "Catat menyimpan atau meminjam dengan rapi."
          ],
          "papan": [
            "sejajar",
            "dari kanan kolom",
            "per kolom",
            "catat"
          ]
        },
        {
          "id": "K5B1D-V1-3",
          "judul": "Cek",
          "ketukan": [
            "Bandingkan hasil teliti dengan perkiraan.",
            "Jika jauh sekali, ada kesalahan kolom atau tukar.",
            "Boleh hitung ulang dari kolom yang mencurigakan.",
            "Siap bahas menyimpan-meminjam."
          ],
          "papan": [
            "banding",
            "waspada",
            "ulang",
            "lanjut"
          ]
        }
      ]
    },
    {
      "id": "K5B1D-V2",
      "judul": "Tukar Sepuluh di Operasi",
      "subjudul": "Menyimpan dan Meminjam",
      "adegan": [
        {
          "id": "K5B1D-V2-1",
          "judul": "Menyimpan",
          "ketukan": [
            "Jika jumlah di satu kolom ≥10, tulis satuan kolom itu, simpan ke kiri.",
            "Itu tukar sepuluh ke tempat berikutnya.",
            "METODE LUAR · Menyimpan dan Meminjam: sama dengan susun ulang nilai tempat.",
            "Jangan lupa menambahkan simpanan di kolom berikutnya."
          ],
          "papan": [
            "simpan",
            "tukar",
            "kaitan C",
            "jangan lupa"
          ]
        },
        {
          "id": "K5B1D-V2-2",
          "judul": "Meminjam",
          "ketukan": [
            "Jika digit atas lebih kecil, pinjam satu dari kiri: itu jadi sepuluh di kolom ini.",
            "Tempat pemberi berkurang satu.",
            "Sebut 'meminjam' dengan benar — bukan sekadar coret tanpa arti.",
            "Visual balok membantu anak yang masih ragu."
          ],
          "papan": [
            "pinjam",
            "beri −1",
            "arti",
            "visual"
          ]
        },
        {
          "id": "K5B1D-V2-3",
          "judul": "Latihan sadar",
          "ketukan": [
            "Kerjakan satu soal dengan mengucapkan alasan tiap tukar.",
            "Lalu kerjakan soal berikutnya lebih cepat tapi tetap sejajar.",
            "Perkiraan tetap dilakukan di awal.",
            "Ayo main operasi bilangan besar!"
          ],
          "papan": [
            "ucap",
            "cepat+rapi",
            "habit",
            "main"
          ]
        }
      ]
    },
    {
      "id": "K5B1D-V3",
      "judul": "Rangkum Bab 1",
      "subjudul": "Algoritma Bersusun",
      "adegan": [
        {
          "id": "K5B1D-V3-1",
          "judul": "Peta bab",
          "ketukan": [
            "A nilai tempat, B banding-urut, C uraian, D operasi.",
            "Semua berdiri di atas tabel nilai tempat.",
            "Tanpa sejajar kolom, operasi mudah salah.",
            "Perkiraan adalah sabuk pengaman."
          ],
          "papan": [
            "peta",
            "fondasi",
            "peringatan",
            "sabuk"
          ]
        },
        {
          "id": "K5B1D-V3-2",
          "judul": "Cek akhir",
          "ketukan": [
            "Cek sejajar, cek simpan/pinjam, cek vs perkiraan.",
            "Baca hasil dengan periode yang benar.",
            "Jika soal cerita, cek apakah jawaban masuk akal di konteks.",
            "Siap permainan penutup Bab 1."
          ],
          "papan": [
            "3 cek",
            "baca",
            "konteks",
            "main"
          ]
        },
        {
          "id": "K5B1D-V3-3",
          "judul": "Tutup",
          "ketukan": [
            "Metode luar sudah dianyam di cerita A–D.",
            "Ulangi peta pikiran tiap sub-bab bila perlu.",
            "Selesaikan Concrete sampai Abstract.",
            "Hebat: bilangan sampai 100.000 siap dikuasai."
          ],
          "papan": [
            "anyam",
            "ulang",
            "CPA",
            "hebat"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Perkiraan",
      "stepDesc": "Bulatkan lalu hitung kasar.",
      "icon": "🎯",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Sejajarkan",
      "stepDesc": "Kolom nilai tempat rapi.",
      "icon": "▦",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Dari satuan",
      "stepDesc": "Hitung kolom ke kiri.",
      "icon": "1️⃣",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Simpan/pinjam",
      "stepDesc": "Tukar sepuluh antar tempat.",
      "icon": "🔄",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Hasil teliti",
      "stepDesc": "Tulis lengkap dengan nol.",
      "icon": "✍️",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek perkiraan",
      "stepDesc": "Apakah dekat?",
      "icon": "🔍",
      "flowFrom": "5",
      "flowTo": "7"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Baca periode",
      "stepDesc": "Sebut hasil dengan benar.",
      "icon": "🗣️",
      "flowFrom": "6",
      "flowTo": "8"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Bab 1 utuh",
      "stepDesc": "Nilai tempat → operasi.",
      "icon": "🎉",
      "flowFrom": "7",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "Perkiraan",
      "emoji": "🎯",
      "countNum": 1,
      "countWord": "dulu",
      "suara": "Estimate"
    },
    {
      "judul": "Sejajar",
      "emoji": "▦",
      "countNum": 1,
      "countWord": "kolom",
      "suara": "Align"
    },
    {
      "judul": "Dari satuan",
      "emoji": "1️⃣",
      "countNum": 1,
      "countWord": "ke kiri",
      "suara": "Algorithm"
    },
    {
      "judul": "Simpan",
      "emoji": "⬆️",
      "countNum": 10,
      "countWord": "ke kiri",
      "suara": "Carry"
    },
    {
      "judul": "Pinjam",
      "emoji": "⬇️",
      "countNum": 10,
      "countWord": "dari kiri",
      "suara": "Borrow"
    },
    {
      "judul": "Cek ≈",
      "emoji": "🔍",
      "countNum": 1,
      "countWord": "dekat?",
      "suara": "Verify"
    },
    {
      "judul": "Nol",
      "emoji": "0",
      "countNum": 1,
      "countWord": "jaga",
      "suara": "Place"
    },
    {
      "judul": "Cerita",
      "emoji": "📖",
      "countNum": 1,
      "countWord": "makna",
      "suara": "Konteks"
    },
    {
      "judul": "Fondasi",
      "emoji": "▦",
      "countNum": 1,
      "countWord": "A–C",
      "suara": "PV"
    },
    {
      "judul": "Bab 1",
      "emoji": "🎉",
      "countNum": 1,
      "countWord": "siap",
      "suara": "Utuh"
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "penjumlahan-5digit",
      "title": "Penjumlahan Lima Angka",
      "bookReference": "hlm. 17–19",
      "objective": "Bulatkan lalu kasar. Latihan: Menjumlahkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Perkiraan Dulu: Bandingkan dengan teliti.",
      "voiceGuide": "Perkiraan Dulu. Bandingkan dengan teliti.",
      "emoji": "➕",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "pengurangan-5digit",
      "title": "Pengurangan Lima Angka",
      "bookReference": "hlm. 19–20",
      "objective": "Bulatkan lalu kasar. Latihan: Mengurangi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Perkiraan Dulu: Bandingkan dengan teliti.",
      "voiceGuide": "Perkiraan Dulu. Bandingkan dengan teliti.",
      "emoji": "➖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "perkalian-besar",
      "title": "Perkalian sampai 100.000",
      "bookReference": "hlm. 21–23",
      "objective": "Bulatkan lalu kasar. Latihan: Mengalikan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Perkiraan Dulu: Bandingkan dengan teliti.",
      "voiceGuide": "Perkiraan Dulu. Bandingkan dengan teliti.",
      "emoji": "✖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "pembagian-besar",
      "title": "Pembagian sampai 100.000",
      "bookReference": "hlm. 22–23",
      "objective": "Bulatkan lalu kasar. Latihan: Membagi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Perkiraan Dulu: Bandingkan dengan teliti.",
      "voiceGuide": "Perkiraan Dulu. Bandingkan dengan teliti.",
      "emoji": "➗",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "match-operasi",
      "title": "Jodohkan Operasi–Hasil",
      "bookReference": "hlm. 17–24",
      "objective": "Menjodohkan.. Ingat Algoritma Bersusun. (Perkiraan Dulu)",
      "mechanicDescription": "Tiga ronde. Gunakan Algoritma Bersusun.",
      "voiceGuide": "Perkiraan Dulu. Mainkan dengan teliti.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-operasi",
      "title": "Memori Operasi",
      "bookReference": "hlm. 17–24",
      "objective": "Memori.. Ingat Algoritma Bersusun. (Perkiraan Dulu)",
      "mechanicDescription": "Tiga ronde. Gunakan Algoritma Bersusun.",
      "voiceGuide": "Perkiraan Dulu. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-hasil",
      "title": "Ketuk Hasil Operasi",
      "bookReference": "hlm. 17–24",
      "objective": "Mengetuk.. Ingat Algoritma Bersusun. (Perkiraan Dulu)",
      "mechanicDescription": "Tiga ronde. Gunakan Algoritma Bersusun.",
      "voiceGuide": "Perkiraan Dulu. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-operasi",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 17–24",
      "objective": "Ketuk semua.. Ingat Algoritma Bersusun. (Perkiraan Dulu)",
      "mechanicDescription": "Tiga ronde. Gunakan Algoritma Bersusun.",
      "voiceGuide": "Perkiraan Dulu. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-operasi",
      "title": "Cerita Bakti dan Toko Buah",
      "bookReference": "hlm. 17–25",
      "objective": "Soal cerita.. Ingat Algoritma Bersusun. (Perkiraan Dulu)",
      "mechanicDescription": "Tiga ronde. Gunakan Algoritma Bersusun.",
      "voiceGuide": "Perkiraan Dulu. Mainkan dengan teliti.",
      "emoji": "🛒",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-hasil",
      "title": "Urutkan Hasil Hitung",
      "bookReference": "hlm. 17–25",
      "objective": "Mengurutkan.. Ingat Algoritma Bersusun. (Perkiraan Dulu)",
      "mechanicDescription": "Tiga ronde. Gunakan Algoritma Bersusun.",
      "voiceGuide": "Perkiraan Dulu. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "diagram-tambah",
      "title": "Diagram Penjumlahan",
      "bookReference": "hlm. 18–19",
      "objective": "Tukar sepuluh. Latihan: Baca jumlah..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Menyimpan dan Meminjam: Catat dengan rapi.",
      "voiceGuide": "Menyimpan dan Meminjam. Catat dengan rapi.",
      "diagramType": "add",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "diagram-kurang",
      "title": "Diagram Pengurangan",
      "bookReference": "hlm. 19–20",
      "objective": "Tukar sepuluh. Latihan: Baca selisih..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Menyimpan dan Meminjam: Catat dengan rapi.",
      "voiceGuide": "Menyimpan dan Meminjam. Catat dengan rapi.",
      "diagramType": "sub",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "diagram-kali",
      "title": "Diagram Perkalian",
      "bookReference": "hlm. 21–23",
      "objective": "Tukar sepuluh. Latihan: Baca hasil kali..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Menyimpan dan Meminjam: Catat dengan rapi.",
      "voiceGuide": "Menyimpan dan Meminjam. Catat dengan rapi.",
      "diagramType": "mul",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "diagram-bagi",
      "title": "Diagram Pembagian",
      "bookReference": "hlm. 22–23",
      "objective": "Tukar sepuluh. Latihan: Baca hasil bagi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Menyimpan dan Meminjam: Catat dengan rapi.",
      "voiceGuide": "Menyimpan dan Meminjam. Catat dengan rapi.",
      "diagramType": "div",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-d",
      "title": "Jodohkan Diagram Operasi",
      "bookReference": "hlm. 17–24",
      "objective": "Jodohkan.. Ingat Menyimpan dan Meminjam. (Menyimpan dan Meminjam)",
      "mechanicDescription": "Tiga ronde. Gunakan Menyimpan dan Meminjam.",
      "voiceGuide": "Menyimpan dan Meminjam. Mainkan dengan teliti.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-d",
      "title": "Memori Diagram Operasi",
      "bookReference": "hlm. 17–24",
      "objective": "Memori.. Ingat Menyimpan dan Meminjam. (Menyimpan dan Meminjam)",
      "mechanicDescription": "Tiga ronde. Gunakan Menyimpan dan Meminjam.",
      "voiceGuide": "Menyimpan dan Meminjam. Mainkan dengan teliti.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-d",
      "title": "Tabel Operasi",
      "bookReference": "hlm. 17–25",
      "objective": "Isi tabel.. Ingat Menyimpan dan Meminjam. (Menyimpan dan Meminjam)",
      "mechanicDescription": "Tiga tabel. Gunakan Menyimpan dan Meminjam.",
      "voiceGuide": "Menyimpan dan Meminjam. Mainkan dengan teliti.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-pd",
      "title": "Ketuk Semua Diagram D",
      "bookReference": "hlm. 17–24",
      "objective": "Ketuk semua.. Ingat Menyimpan dan Meminjam. (Menyimpan dan Meminjam)",
      "mechanicDescription": "Tiga ronde. Gunakan Menyimpan dan Meminjam.",
      "voiceGuide": "Menyimpan dan Meminjam. Mainkan dengan teliti.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "choose-d",
      "title": "Pilih Kalimat Operasi",
      "bookReference": "hlm. 17–25",
      "objective": "Pilih pernyataan.. Ingat Menyimpan dan Meminjam. (Menyimpan dan Meminjam)",
      "mechanicDescription": "Tiga ronde. Gunakan Menyimpan dan Meminjam.",
      "voiceGuide": "Menyimpan dan Meminjam. Mainkan dengan teliti.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-d",
      "title": "Cerita Diagram Operasi",
      "bookReference": "hlm. 17–25",
      "objective": "Cerita + diagram.. Ingat Menyimpan dan Meminjam. (Menyimpan dan Meminjam)",
      "mechanicDescription": "Tiga ronde. Gunakan Menyimpan dan Meminjam.",
      "voiceGuide": "Menyimpan dan Meminjam. Mainkan dengan teliti.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-jumlah",
      "title": "Tulis Hasil Penjumlahan",
      "bookReference": "hlm. 17–19",
      "objective": "Dari satuan ke kiri. Latihan: Menulis jumlah..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Algoritma Bersusun: Sejajarkan kolom.",
      "voiceGuide": "Algoritma Bersusun. Sejajarkan kolom.",
      "symbolLarge": "79.500",
      "wordLarge": "JUMLAH",
      "mathNotation": "+"
    },
    {
      "stage": "Abstract",
      "gameType": "write-sisa",
      "title": "Tulis Hasil Pengurangan",
      "bookReference": "hlm. 19–20",
      "objective": "Dari satuan ke kiri. Latihan: Menulis sisa..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Algoritma Bersusun: Sejajarkan kolom.",
      "voiceGuide": "Algoritma Bersusun. Sejajarkan kolom.",
      "symbolLarge": "2.150",
      "wordLarge": "SISA",
      "mathNotation": "-"
    },
    {
      "stage": "Abstract",
      "gameType": "write-kali",
      "title": "Tulis Hasil Perkalian",
      "bookReference": "hlm. 21–23",
      "objective": "Dari satuan ke kiri. Latihan: Menulis hasil kali..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Algoritma Bersusun: Sejajarkan kolom.",
      "voiceGuide": "Algoritma Bersusun. Sejajarkan kolom.",
      "symbolLarge": "60.000",
      "wordLarge": "KALI",
      "mathNotation": "x"
    },
    {
      "stage": "Abstract",
      "gameType": "write-bagi",
      "title": "Tulis Hasil Pembagian",
      "bookReference": "hlm. 22–23",
      "objective": "Dari satuan ke kiri. Latihan: Menulis hasil bagi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Algoritma Bersusun: Sejajarkan kolom.",
      "voiceGuide": "Algoritma Bersusun. Sejajarkan kolom.",
      "symbolLarge": "16.000",
      "wordLarge": "BAGI",
      "mathNotation": ":"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-d",
      "title": "Jodohkan Notasi Operasi",
      "bookReference": "hlm. 17–24",
      "objective": "Jodohkan.. Ingat Perkiraan Dulu. (Algoritma Bersusun)",
      "mechanicDescription": "Tiga ronde. Gunakan Perkiraan Dulu.",
      "voiceGuide": "Algoritma Bersusun. Mainkan dengan teliti.",
      "symbolLarge": "a+b",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-d",
      "title": "Memori Notasi Operasi",
      "bookReference": "hlm. 17–24",
      "objective": "Memori.. Ingat Perkiraan Dulu. (Algoritma Bersusun)",
      "mechanicDescription": "Tiga ronde. Gunakan Perkiraan Dulu.",
      "voiceGuide": "Algoritma Bersusun. Mainkan dengan teliti.",
      "symbolLarge": "hasil",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-d",
      "title": "Benar atau Salah: Operasi",
      "bookReference": "hlm. 17–25",
      "objective": "Menilai.. Ingat Perkiraan Dulu. (Algoritma Bersusun)",
      "mechanicDescription": "Dua ronde. Gunakan Perkiraan Dulu.",
      "voiceGuide": "Algoritma Bersusun. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-d",
      "title": "Detektif Operasi",
      "bookReference": "hlm. 17–25",
      "objective": "Petunjuk → hasil.. Ingat Perkiraan Dulu. (Algoritma Bersusun)",
      "mechanicDescription": "Tiga soal. Gunakan Perkiraan Dulu.",
      "voiceGuide": "Algoritma Bersusun. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-d",
      "title": "Peta Konsep Operasi",
      "bookReference": "hlm. 17–25",
      "objective": "Mengisi kotak.. Ingat Perkiraan Dulu. (Algoritma Bersusun)",
      "mechanicDescription": "Satu peta. Gunakan Perkiraan Dulu.",
      "voiceGuide": "Algoritma Bersusun. Mainkan dengan teliti.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-d",
      "title": "Cerita Angka Operasi",
      "bookReference": "hlm. 17–25",
      "objective": "Soal cerita.. Ingat Perkiraan Dulu. (Algoritma Bersusun)",
      "mechanicDescription": "Tiga ronde. Gunakan Perkiraan Dulu.",
      "voiceGuide": "Algoritma Bersusun. Mainkan dengan teliti.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "🎯",
      "nama": "Perkiraan dulu",
      "isi": "Hitung kasar sebelum bersusun.",
      "suara": "Estimate."
    },
    {
      "ikon": "▦",
      "nama": "Sejajar",
      "isi": "Kolom nilai tempat harus lurus.",
      "suara": "Align."
    },
    {
      "ikon": "🔄",
      "nama": "Simpan/pinjam",
      "isi": "Tukar sepuluh antar tempat dengan sadar.",
      "suara": "Regroup."
    },
    {
      "ikon": "🔍",
      "nama": "Cek",
      "isi": "Hasil teliti harus dekat perkiraan.",
      "suara": "Check."
    }
  ],
  "poinSuara": "Perkiraan dulu, sejajarkan kolom, simpan atau pinjam dengan sadar, lalu cek.",
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
  "rumah": "Ayo Mencoba: terapkan Algoritma Bersusun pada satu soal di rumah.",
  "refleksi": [
    "Bagaimana Algoritma Bersusun membantumu?",
    "Kapan memakai Menyimpan dan Meminjam?",
    "Apa bedanya dengan hanya menghafal rumus?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Standard Algorithm",
      "namaId": "Algoritma Bersusun",
      "asal": "Written computation",
      "ringkas": "Hitung per kolom dari satuan ke kiri.",
      "tahap": [
        "Story",
        "Abstract",
        "Mind"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Regrouping",
      "namaId": "Menyimpan dan Meminjam",
      "asal": "Place-value regrouping",
      "ringkas": "Sepuluh di satu tempat ditukar menjadi satu di tempat berikutnya.",
      "tahap": [
        "Story",
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Estimate First",
      "namaId": "Perkiraan Dulu",
      "asal": "Computational estimation",
      "ringkas": "Bulatkan lalu hitung kasar sebelum bersusun teliti.",
      "tahap": [
        "Story",
        "Infografis",
        "Abstract"
      ]
    }
  ]
};

export const SUB_BAB_K5B1: SubBabNaskah[] = [SUB_A51, SUB_B51, SUB_C51, SUB_D51];
export const semuaAdeganK5B1 = SUB_BAB_K5B1.flatMap((s) => s.videos.flatMap((v) => v.adegan));
