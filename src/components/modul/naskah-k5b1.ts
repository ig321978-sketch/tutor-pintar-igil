/**
 * Naskah — rewrite mendalam.
 * Metode luar dianyam ke Story, peta, infografis, poin, dan meta permainan.
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
  "targetDescription": "Siswa membaca dan menulis bilangan cacah sampai 100.000 serta menentukan digit dan nilai pada tempat puluh ribuan, ribuan, ratusan, puluhan, dan satuan sesuai Buku Siswa Kelas V Bab 1. Siswa memakai cara Tabel Nilai Tempat, Balok Dienes Perluas, Membaca Bilangan Besar.",
  "secondaryBg": "#FFEDD5",
  "secondaryBorder": "#EA580C",
  "secondaryText": "#7C2D12",
  "silabus": {
    "teksSuara": "Kita belajar bilangan cacah sampai seratus ribu. Kita membaca lambang, menulis dari kata, dan mengisi papan puluh ribuan sampai satuan. Nol tetap ditulis agar tempat tidak bergeser. Kita memakai cara dari luar buku: Tabel Nilai Tempat (Place-Value Chart); Balok Dienes Perluas (Dienes Blocks); Membaca Bilangan Besar (Reading Large Numbers). Setiap digit punya nilai menurut tempatnya: satuan sampai ratusan ribu. Benda–batang–keping–peti membantu membaca nilai tempat besar. Baca dari kiri, kelompokkan per tiga digit. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa membaca, menuliskan, dan menentukan nilai tempat bilangan cacah sampai 100.000.",
    "referensi": "Buku Siswa Matematika Kelas V Kemendikbudristek (Bab 1: Bilangan Cacah sampai 100.000, Sub-Bab A)."
  },
  "videos": [
    {
      "id": "K5B1A-V1",
      "judul": "Lima Tempat Baru",
      "subjudul": "Place-Value Chart",
      "adegan": [
        {
          "id": "K5B1A-V1-1",
          "judul": "Lebih dari empat angka",
          "ketukan": [
            "Bayangkan situasi nyata di kelas atau di rumah. Di kelas empat kita sampai sepuluh ribu. Mari kita pahami bersama.",
            "Sekarang ada puluh ribuan. Mari kita pahami bersama.",
            "Lima tempat: PR, RB, R, P, S. Mari kita pahami bersama.",
            "Ingat cara Tabel Nilai Tempat: Setiap digit punya nilai menurut tempatnya: satuan sampai ratusan ribu."
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
            "Empat belas ribu lima ratus. Mari kita pahami bersama.",
            "Ditulis satu empat titik lima nol nol. Mari kita pahami bersama.",
            "Satu di puluh ribuan. Mari kita pahami bersama.",
            "Di sini kita memakai ide Place-Value Chart — Setiap digit punya nilai menurut tempatnya: satuan sampai ratusan ribu."
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
            "Puluhan dan satuan bernilai nol. Mari kita pahami bersama.",
            "Nol tetap ditulis. Mari kita pahami bersama.",
            "Tanpa nol, tempat bergeser. Mari kita pahami bersama.",
            "METODE LUAR · Tabel Nilai Tempat: Setiap digit punya nilai menurut tempatnya: satuan sampai ratusan ribu."
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
      "judul": "Latihan: Balok Dienes Perluas",
      "subjudul": "Dienes Blocks",
      "adegan": [
        {
          "id": "K5B1A-V2-1",
          "judul": "Enam puluh enam ribu",
          "ketukan": [
            "Lihat enam enam lima nol nol. Mari kita pahami bersama.",
            "Baca puluh ribuan dan ribuan dulu. Mari kita pahami bersama.",
            "Enam puluh enam ribu. Mari kita pahami bersama.",
            "Ingat cara Balok Dienes Perluas: Benda–batang–keping–peti membantu membaca nilai tempat besar."
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
            "Angka besar sering muncul di data. Mari kita pahami bersama.",
            "Dua puluh enam ribu sembilan ratus tiga puluh dua. Mari kita pahami bersama.",
            "Latih membaca perlahan. Mari kita pahami bersama.",
            "Di sini kita memakai ide Dienes Blocks — Benda–batang–keping–peti membantu membaca nilai tempat besar."
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
            "Pada delapan tujuh sembilan delapan enam. Mari kita pahami bersama.",
            "Digit tujuh ada di ribuan. Mari kita pahami bersama.",
            "Nilainya tujuh ribu. Mari kita pahami bersama.",
            "METODE LUAR · Balok Dienes Perluas: Benda–batang–keping–peti membantu membaca nilai tempat besar."
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
      "judul": "Siap pakai Reading Large Numbers",
      "subjudul": "Reading Large Numbers",
      "adegan": [
        {
          "id": "K5B1A-V3-1",
          "judul": "Dengar kata, isi kolom",
          "ketukan": [
            "Dengar empat belas ribu lima ratus. Mari kita pahami bersama.",
            "Isi puluh ribuan satu. Mari kita pahami bersama.",
            "Isi ribuan empat. Mari kita pahami bersama.",
            "Ingat cara Membaca Bilangan Besar: Baca dari kiri, kelompokkan per tiga digit."
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
            "Jika tidak ada puluhan, tulis nol. Mari kita pahami bersama.",
            "Jika tidak ada satuan, tulis nol. Mari kita pahami bersama.",
            "Kolom harus lengkap. Mari kita pahami bersama.",
            "Di sini kita memakai ide Reading Large Numbers — Baca dari kiri, kelompokkan per tiga digit."
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
            "Kita sudah bisa baca dan tulis. Mari kita pahami bersama.",
            "Nilai tempat sudah jelas. Mari kita pahami bersama.",
            "Ayo ke permainan. Mari kita pahami bersama.",
            "METODE LUAR · Membaca Bilangan Besar: Baca dari kiri, kelompokkan per tiga digit."
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
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Membaca dan Menulis Bilangan Cacah Sampai 100.000 dan Menentukan Nilai Tempatnya. Apa yang ditanyakan?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Place-Value Chart",
      "stepDesc": "Setiap digit punya nilai menurut tempatnya: satuan sampai ratusan ribu.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Dienes Blocks",
      "stepDesc": "Benda–batang–keping–peti membantu membaca nilai tempat besar.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Reading Large Numbers",
      "stepDesc": "Baca dari kiri, kelompokkan per tiga digit.",
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
    },
    {
      "judul": "Tabel Nilai Tempat",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "ingat",
      "suara": "Setiap digit punya nilai menurut tempatnya: satuan sampai ratusan ribu."
    },
    {
      "judul": "Balok Dienes Perluas",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "ingat",
      "suara": "Benda–batang–keping–peti membantu membaca nilai tempat besar."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "baca-lima",
      "title": "Baca Bilangan Lima Angka",
      "bookReference": "hlm. 7–9",
      "objective": "Pakai Tabel Nilai Tempat: Setiap digit punya nilai menurut tempatnya: satuan sampai ratusan ribu. Latihan: Membaca lambang → kata..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Place-Value Chart: Setiap digit punya nilai menurut tempatnya: satuan sampai ratusan ribu.",
      "voiceGuide": "Tabel Nilai Tempat. Setiap digit punya nilai menurut tempatnya: satuan sampai ratusan ribu.",
      "emoji": "📢",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tulis-lima",
      "title": "Tulis dari Kata Bilangan",
      "bookReference": "hlm. 5–6",
      "objective": "Pakai Tabel Nilai Tempat: Setiap digit punya nilai menurut tempatnya: satuan sampai ratusan ribu. Latihan: Menulis lambang dari kata..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Place-Value Chart: Setiap digit punya nilai menurut tempatnya: satuan sampai ratusan ribu.",
      "voiceGuide": "Tabel Nilai Tempat. Setiap digit punya nilai menurut tempatnya: satuan sampai ratusan ribu.",
      "emoji": "✍️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "nilai-tempat",
      "title": "Tentukan Nilai Tempat",
      "bookReference": "hlm. 6–9",
      "objective": "Pakai Tabel Nilai Tempat: Setiap digit punya nilai menurut tempatnya: satuan sampai ratusan ribu. Latihan: Digit & nilai tempat..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Place-Value Chart: Setiap digit punya nilai menurut tempatnya: satuan sampai ratusan ribu.",
      "voiceGuide": "Tabel Nilai Tempat. Setiap digit punya nilai menurut tempatnya: satuan sampai ratusan ribu.",
      "emoji": "🏛️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-digit",
      "title": "Pilah Lima/Empat Angka",
      "bookReference": "hlm. 4–7",
      "objective": "Pakai Tabel Nilai Tempat: Setiap digit punya nilai menurut tempatnya: satuan sampai ratusan ribu. Latihan: Memilah panjang bilangan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Place-Value Chart: Setiap digit punya nilai menurut tempatnya: satuan sampai ratusan ribu.",
      "voiceGuide": "Tabel Nilai Tempat. Setiap digit punya nilai menurut tempatnya: satuan sampai ratusan ribu.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-baca",
      "title": "Jodohkan Lambang–Kata",
      "bookReference": "hlm. 8–9",
      "objective": "Menjodohkan.. Ingat Tabel Nilai Tempat.",
      "mechanicDescription": "Tiga ronde. Gunakan Tabel Nilai Tempat.",
      "voiceGuide": "Tabel Nilai Tempat. Jodohkan.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-baca",
      "title": "Memori Lambang–Kata",
      "bookReference": "hlm. 7–9",
      "objective": "Memori.. Ingat Tabel Nilai Tempat.",
      "mechanicDescription": "Tiga ronde. Gunakan Tabel Nilai Tempat.",
      "voiceGuide": "Tabel Nilai Tempat. Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-bilangan",
      "title": "Ketuk Bilangan Diminta",
      "bookReference": "hlm. 7–9",
      "objective": "Mengetuk.. Ingat Tabel Nilai Tempat.",
      "mechanicDescription": "Tiga ronde. Gunakan Tabel Nilai Tempat.",
      "voiceGuide": "Tabel Nilai Tempat. Ketuk.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-ciri",
      "title": "Ketuk Semua Sesuai Ciri",
      "bookReference": "hlm. 6–9",
      "objective": "Ketuk semua.. Ingat Tabel Nilai Tempat.",
      "mechanicDescription": "Tiga ronde. Gunakan Tabel Nilai Tempat.",
      "voiceGuide": "Tabel Nilai Tempat. Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-baca",
      "title": "Cerita Buku dan Penduduk",
      "bookReference": "hlm. 5–8",
      "objective": "Soal cerita.. Ingat Tabel Nilai Tempat.",
      "mechanicDescription": "Tiga ronde. Gunakan Tabel Nilai Tempat.",
      "voiceGuide": "Tabel Nilai Tempat. Pilih.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-nilai",
      "title": "Urutkan Bilangan Baca",
      "bookReference": "hlm. 7–9",
      "objective": "Mengurutkan.. Ingat Tabel Nilai Tempat.",
      "mechanicDescription": "Tiga ronde. Gunakan Tabel Nilai Tempat.",
      "voiceGuide": "Tabel Nilai Tempat. Urutkan.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "papan-baca",
      "title": "Papan Baca Bilangan",
      "bookReference": "hlm. 6–7",
      "objective": "Pakai Balok Dienes Perluas: Benda–batang–keping–peti membantu membaca nilai tempat besar. Latihan: Baca papan tempat..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Dienes Blocks: Benda–batang–keping–peti membantu membaca nilai tempat besar.",
      "voiceGuide": "Balok Dienes Perluas. Benda–batang–keping–peti membantu membaca nilai tempat besar.",
      "diagramType": "board",
      "numberA": 1,
      "numberB": 5
    },
    {
      "stage": "Picture",
      "gameType": "papan-tempat",
      "title": "Papan Nilai Tempat",
      "bookReference": "hlm. 6–9",
      "objective": "Pakai Balok Dienes Perluas: Benda–batang–keping–peti membantu membaca nilai tempat besar. Latihan: Digit per kolom..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Dienes Blocks: Benda–batang–keping–peti membantu membaca nilai tempat besar.",
      "voiceGuide": "Balok Dienes Perluas. Benda–batang–keping–peti membantu membaca nilai tempat besar.",
      "diagramType": "place",
      "numberA": 1,
      "numberB": 5
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-a",
      "title": "Jodohkan Diagram Tempat",
      "bookReference": "hlm. 6–9",
      "objective": "Pakai Balok Dienes Perluas: Benda–batang–keping–peti membantu membaca nilai tempat besar. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Dienes Blocks: Benda–batang–keping–peti membantu membaca nilai tempat besar.",
      "voiceGuide": "Balok Dienes Perluas. Benda–batang–keping–peti membantu membaca nilai tempat besar.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-a",
      "title": "Memori Diagram Tempat",
      "bookReference": "hlm. 6–9",
      "objective": "Pakai Balok Dienes Perluas: Benda–batang–keping–peti membantu membaca nilai tempat besar. Latihan: Memori..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Dienes Blocks: Benda–batang–keping–peti membantu membaca nilai tempat besar.",
      "voiceGuide": "Balok Dienes Perluas. Benda–batang–keping–peti membantu membaca nilai tempat besar.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-a",
      "title": "Tabel Tempat–Nilai",
      "bookReference": "hlm. 6–9",
      "objective": "Isi tabel.. Ingat Balok Dienes Perluas.",
      "mechanicDescription": "Tiga tabel. Gunakan Balok Dienes Perluas.",
      "voiceGuide": "Balok Dienes Perluas. Pilih.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-a",
      "title": "Ketuk Semua Diagram",
      "bookReference": "hlm. 6–9",
      "objective": "Ketuk semua.. Ingat Balok Dienes Perluas.",
      "mechanicDescription": "Tiga ronde. Gunakan Balok Dienes Perluas.",
      "voiceGuide": "Balok Dienes Perluas. Ketuk semua.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-a",
      "title": "Pilah Diagram Panjang",
      "bookReference": "hlm. 4–7",
      "objective": "Pilah.. Ingat Balok Dienes Perluas.",
      "mechanicDescription": "Tiga ronde. Gunakan Balok Dienes Perluas.",
      "voiceGuide": "Balok Dienes Perluas. Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "model-blok",
      "title": "Model Blok Tempat",
      "bookReference": "hlm. 6",
      "objective": "Baca model.. Ingat Balok Dienes Perluas.",
      "mechanicDescription": "Tiga ronde. Gunakan Balok Dienes Perluas.",
      "voiceGuide": "Balok Dienes Perluas. Pilih.",
      "diagramType": "blocks",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "choose-a",
      "title": "Pilih Bacaan Cocok",
      "bookReference": "hlm. 7–9",
      "objective": "Pilih pernyataan.. Ingat Balok Dienes Perluas.",
      "mechanicDescription": "Tiga ronde. Gunakan Balok Dienes Perluas.",
      "voiceGuide": "Balok Dienes Perluas. Pilih.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-a",
      "title": "Cerita Diagram Tempat",
      "bookReference": "hlm. 5–9",
      "objective": "Cerita + papan.. Ingat Balok Dienes Perluas.",
      "mechanicDescription": "Tiga ronde. Gunakan Balok Dienes Perluas.",
      "voiceGuide": "Balok Dienes Perluas. Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-kata",
      "title": "Tulis Kata Bilangan",
      "bookReference": "hlm. 7–9",
      "objective": "Pakai Membaca Bilangan Besar: Baca dari kiri, kelompokkan per tiga digit. Latihan: Menulis kata..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Reading Large Numbers: Baca dari kiri, kelompokkan per tiga digit.",
      "voiceGuide": "Membaca Bilangan Besar. Baca dari kiri, kelompokkan per tiga digit.",
      "symbolLarge": "Aa",
      "wordLarge": "KATA",
      "mathNotation": "baca"
    },
    {
      "stage": "Abstract",
      "gameType": "write-lambang",
      "title": "Tulis Lambang Bilangan",
      "bookReference": "hlm. 5–6",
      "objective": "Pakai Membaca Bilangan Besar: Baca dari kiri, kelompokkan per tiga digit. Latihan: Menulis angka..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Reading Large Numbers: Baca dari kiri, kelompokkan per tiga digit.",
      "voiceGuide": "Membaca Bilangan Besar. Baca dari kiri, kelompokkan per tiga digit.",
      "symbolLarge": "14.500",
      "wordLarge": "LAMBANG",
      "mathNotation": "tulis"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-tempat",
      "title": "Pilih Nama Tempat",
      "bookReference": "hlm. 6–9",
      "objective": "Pakai Membaca Bilangan Besar: Baca dari kiri, kelompokkan per tiga digit. Latihan: PR/RB/R/P/S..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Reading Large Numbers: Baca dari kiri, kelompokkan per tiga digit.",
      "voiceGuide": "Membaca Bilangan Besar. Baca dari kiri, kelompokkan per tiga digit.",
      "symbolLarge": "PR",
      "wordLarge": "TEMPAT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-a",
      "title": "Urutkan Lambang",
      "bookReference": "hlm. 7–9",
      "objective": "Pakai Membaca Bilangan Besar: Baca dari kiri, kelompokkan per tiga digit. Latihan: Mengurutkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Reading Large Numbers: Baca dari kiri, kelompokkan per tiga digit.",
      "voiceGuide": "Membaca Bilangan Besar. Baca dari kiri, kelompokkan per tiga digit.",
      "symbolLarge": "14k<26k",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-a",
      "title": "Jodohkan Notasi Tempat",
      "bookReference": "hlm. 6–9",
      "objective": "Jodohkan.. Ingat Membaca Bilangan Besar.",
      "mechanicDescription": "Tiga ronde. Gunakan Membaca Bilangan Besar.",
      "voiceGuide": "Membaca Bilangan Besar. Jodohkan.",
      "symbolLarge": "7→rb",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-a",
      "title": "Memori Notasi Tempat",
      "bookReference": "hlm. 6–9",
      "objective": "Memori.. Ingat Membaca Bilangan Besar.",
      "mechanicDescription": "Tiga ronde. Gunakan Membaca Bilangan Besar.",
      "voiceGuide": "Membaca Bilangan Besar. Balik kartu.",
      "symbolLarge": "nol",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-a",
      "title": "Benar atau Salah: Tempat",
      "bookReference": "hlm. 4–9",
      "objective": "Menilai.. Ingat Membaca Bilangan Besar.",
      "mechanicDescription": "Dua ronde. Gunakan Membaca Bilangan Besar.",
      "voiceGuide": "Membaca Bilangan Besar. Benar/salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-a",
      "title": "Detektif Bilangan Lima",
      "bookReference": "hlm. 5–9",
      "objective": "Petunjuk → bilangan.. Ingat Membaca Bilangan Besar.",
      "mechanicDescription": "Tiga soal. Gunakan Membaca Bilangan Besar.",
      "voiceGuide": "Membaca Bilangan Besar. Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-a",
      "title": "Peta Konsep Nilai Tempat",
      "bookReference": "hlm. 2–9",
      "objective": "Mengisi kotak.. Ingat Membaca Bilangan Besar.",
      "mechanicDescription": "Satu peta. Gunakan Membaca Bilangan Besar.",
      "voiceGuide": "Membaca Bilangan Besar. Pilih opsi.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-a",
      "title": "Cerita Angka Tempat",
      "bookReference": "hlm. 5–9",
      "objective": "Soal cerita.. Ingat Membaca Bilangan Besar.",
      "mechanicDescription": "Tiga ronde. Gunakan Membaca Bilangan Besar.",
      "voiceGuide": "Membaca Bilangan Besar. Pilih.",
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
      "ikon": "🌍",
      "nama": "Tabel Nilai Tempat",
      "isi": "Setiap digit punya nilai menurut tempatnya: satuan sampai ratusan ribu.",
      "suara": "Tabel Nilai Tempat. Setiap digit punya nilai menurut tempatnya: satuan sampai ratusan ribu."
    },
    {
      "ikon": "🌍",
      "nama": "Balok Dienes Perluas",
      "isi": "Benda–batang–keping–peti membantu membaca nilai tempat besar.",
      "suara": "Balok Dienes Perluas. Benda–batang–keping–peti membantu membaca nilai tempat besar."
    },
    {
      "ikon": "🌍",
      "nama": "Membaca Bilangan Besar",
      "isi": "Baca dari kiri, kelompokkan per tiga digit.",
      "suara": "Membaca Bilangan Besar. Baca dari kiri, kelompokkan per tiga digit."
    }
  ],
  "poinSuara": "Ingat: Tabel Nilai Tempat, Balok Dienes Perluas, Membaca Bilangan Besar.",
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
  "rumah": "Ayo Mencoba di rumah: terapkan Tabel Nilai Tempat pada satu benda atau soal nyata, lalu ceritakan langkahmu.",
  "refleksi": [
    "Bagaimana Tabel Nilai Tempat membantumu memahami soal?",
    "Kapan kamu memakai Balok Dienes Perluas?",
    "Apa bedanya dengan hanya menghafal rumus atau langkah tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Place-Value Chart",
      "namaId": "Tabel Nilai Tempat",
      "asal": "Van de Walle",
      "ringkas": "Setiap digit punya nilai menurut tempatnya: satuan sampai ratusan ribu.",
      "tahap": [
        "Story",
        "Mind",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Dienes Blocks",
      "namaId": "Balok Dienes Perluas",
      "asal": "Zoltan Dienes",
      "ringkas": "Benda–batang–keping–peti membantu membaca nilai tempat besar.",
      "tahap": [
        "Concrete",
        "Picture",
        "Infografis"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Reading Large Numbers",
      "namaId": "Membaca Bilangan Besar",
      "asal": "Number naming pedagogy",
      "ringkas": "Baca dari kiri, kelompokkan per tiga digit.",
      "tahap": [
        "Story",
        "Abstract"
      ]
    }
  ]
};

export const SUB_B51: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Membandingkan dan Mengurutkan)",
  "fullTitle": "Sub-Bab B: Membandingkan dan Mengurutkan Bilangan Cacah Sampai 100.000",
  "targetDescription": "Siswa membandingkan bilangan sampai 100.000 dengan strategi nilai tempat dari kiri, memakai tanda > < =, serta mengurutkan menaik dan menurun sesuai Buku Siswa Kelas V Bab 1. Siswa memakai cara Banding Digit per Tempat, Urutan di Garis Bilangan, Bilangan Acuan.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Kita belajar membandingkan dan mengurutkan bilangan sampai seratus ribu. Mulai dari puluh ribuan. Jika sama, lanjut ke ribuan, dan seterusnya. Kita memakai tanda lebih besar, lebih kecil, atau sama dengan. Kita memakai cara dari luar buku: Banding Digit per Tempat (Compare Place by Place); Urutan di Garis Bilangan (Number Line Order); Bilangan Acuan (Benchmark Numbers). Bandingkan dari nilai tempat terbesar ke terkecil. Bilangan lebih kanan lebih besar. Pakai 10.000 atau 50.000 sebagai acuan perkiraan. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa membandingkan dan mengurutkan bilangan cacah sampai 100.000.",
    "referensi": "Buku Siswa Matematika Kelas V Kemendikbudristek (Bab 1: Bilangan Cacah sampai 100.000, Sub-Bab B)."
  },
  "videos": [
    {
      "id": "K5B1B-V1",
      "judul": "Banding dari Kiri",
      "subjudul": "Compare Place by Place",
      "adegan": [
        {
          "id": "K5B1B-V1-1",
          "judul": "Dua bilangan",
          "ketukan": [
            "Bayangkan situasi nyata di kelas atau di rumah. Lihat dua bilangan lima angka. Mari kita pahami bersama.",
            "Mulai dari puluh ribuan. Mari kita pahami bersama.",
            "Yang digitnya lebih besar, bilangannya lebih besar. Mari kita pahami bersama.",
            "Ingat cara Banding Digit per Tempat: Bandingkan dari nilai tempat terbesar ke terkecil."
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
            "Lima enam ribu dan tujuh lima ribu. Mari kita pahami bersama.",
            "Puluh ribuan lima versus tujuh. Mari kita pahami bersama.",
            "Tujuh lebih besar. Mari kita pahami bersama.",
            "Di sini kita memakai ide Compare Place by Place — Bandingkan dari nilai tempat terbesar ke terkecil."
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
            "Lima enam dan lima tujuh. Mari kita pahami bersama.",
            "Puluh ribuan sama. Mari kita pahami bersama.",
            "Bandingkan ribuan. Mari kita pahami bersama.",
            "METODE LUAR · Banding Digit per Tempat: Bandingkan dari nilai tempat terbesar ke terkecil."
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
      "judul": "Latihan: Urutan di Garis Bilangan",
      "subjudul": "Number Line Order",
      "adegan": [
        {
          "id": "K5B1B-V2-1",
          "judul": "Tiga tanda",
          "ketukan": [
            "Lebih besar memakai tanda ini. Mari kita pahami bersama.",
            "Lebih kecil memakai tanda itu. Mari kita pahami bersama.",
            "Sama memakai sama dengan. Mari kita pahami bersama.",
            "Ingat cara Urutan di Garis Bilangan: Bilangan lebih kanan lebih besar."
          ],
          "papan": [
            "latihan",
            "urutan",
            "urutan",
            "urutan"
          ]
        },
        {
          "id": "K5B1B-V2-2",
          "judul": "Urut naik",
          "ketukan": [
            "Dari yang paling kecil. Mari kita pahami bersama.",
            "Ke yang paling besar. Mari kita pahami bersama.",
            "Itu urutan menaik. Mari kita pahami bersama.",
            "Di sini kita memakai ide Number Line Order — Bilangan lebih kanan lebih besar."
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
            "Dari yang paling besar. Mari kita pahami bersama.",
            "Ke yang paling kecil. Mari kita pahami bersama.",
            "Itu urutan menurun. Mari kita pahami bersama.",
            "METODE LUAR · Urutan di Garis Bilangan: Bilangan lebih kanan lebih besar."
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
      "judul": "Siap pakai Benchmark Numbers",
      "subjudul": "Benchmark Numbers",
      "adegan": [
        {
          "id": "K5B1B-V3-1",
          "judul": "Empat harga",
          "ketukan": [
            "Ada empat bilangan dakon. Mari kita pahami bersama.",
            "Cari yang terkecil. Mari kita pahami bersama.",
            "Cari yang terbesar. Mari kita pahami bersama.",
            "Ingat cara Bilangan Acuan: Pakai 10.000 atau 50.000 sebagai acuan perkiraan."
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
            "Lima belas ribu lima ratus. Mari kita pahami bersama.",
            "Enam belas ribu lima ratus. Mari kita pahami bersama.",
            "Naik seribu tiap langkah. Mari kita pahami bersama.",
            "Di sini kita memakai ide Benchmark Numbers — Pakai 10.000 atau 50.000 sebagai acuan perkiraan."
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
            "Strategi banding sudah siap. Mari kita pahami bersama.",
            "Tanda dan urutan sudah jelas. Mari kita pahami bersama.",
            "Ayo ke permainan. Mari kita pahami bersama.",
            "Semangat. Mari kita pahami bersama.",
            "METODE LUAR · Bilangan Acuan: Pakai 10.000 atau 50.000 sebagai acuan perkiraan."
          ],
          "papan": [
            "strategi",
            "tanda",
            "main",
            "semangat",
            "bilangan"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Membandingkan dan Mengurutkan Bilangan Cacah Sampai 100.000. Apa yang ditanyakan?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Compare Place by Place",
      "stepDesc": "Bandingkan dari nilai tempat terbesar ke terkecil.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Number Line Order",
      "stepDesc": "Bilangan lebih kanan lebih besar.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Benchmark Numbers",
      "stepDesc": "Pakai 10.000 atau 50.000 sebagai acuan perkiraan.",
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
    },
    {
      "judul": "Banding Digit per Tempat",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "ingat",
      "suara": "Bandingkan dari nilai tempat terbesar ke terkecil."
    },
    {
      "judul": "Urutan di Garis Bilangan",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "ingat",
      "suara": "Bilangan lebih kanan lebih besar."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "banding-tanda",
      "title": "Isi Tanda Banding",
      "bookReference": "hlm. 14–15",
      "objective": "Pakai Banding Digit per Tempat: Bandingkan dari nilai tempat terbesar ke terkecil. Latihan: >, <, =..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Compare Place by Place: Bandingkan dari nilai tempat terbesar ke terkecil.",
      "voiceGuide": "Banding Digit per Tempat. Bandingkan dari nilai tempat terbesar ke terkecil.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "strategi-banding",
      "title": "Strategi dari Kiri",
      "bookReference": "hlm. 11–13",
      "objective": "Pakai Banding Digit per Tempat: Bandingkan dari nilai tempat terbesar ke terkecil. Latihan: Mulai puluh ribuan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Compare Place by Place: Bandingkan dari nilai tempat terbesar ke terkecil.",
      "voiceGuide": "Banding Digit per Tempat. Bandingkan dari nilai tempat terbesar ke terkecil.",
      "emoji": "⬅️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "pilih-ekstrem",
      "title": "Paling Besar/Kecil",
      "bookReference": "hlm. 10–13",
      "objective": "Pakai Banding Digit per Tempat: Bandingkan dari nilai tempat terbesar ke terkecil. Latihan: Cari ekstrem..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Compare Place by Place: Bandingkan dari nilai tempat terbesar ke terkecil.",
      "voiceGuide": "Banding Digit per Tempat. Bandingkan dari nilai tempat terbesar ke terkecil.",
      "emoji": "🏆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-ukuran",
      "title": "Pilah Besar/Kecil",
      "bookReference": "hlm. 10–13",
      "objective": "Pakai Banding Digit per Tempat: Bandingkan dari nilai tempat terbesar ke terkecil. Latihan: Memilah..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Compare Place by Place: Bandingkan dari nilai tempat terbesar ke terkecil.",
      "voiceGuide": "Banding Digit per Tempat. Bandingkan dari nilai tempat terbesar ke terkecil.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-banding",
      "title": "Jodohkan Hasil Banding",
      "bookReference": "hlm. 14–15",
      "objective": "Menjodohkan.. Ingat Banding Digit per Tempat.",
      "mechanicDescription": "Tiga ronde. Gunakan Banding Digit per Tempat.",
      "voiceGuide": "Banding Digit per Tempat. Jodohkan.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-banding",
      "title": "Memori Banding",
      "bookReference": "hlm. 14–15",
      "objective": "Memori.. Ingat Banding Digit per Tempat.",
      "mechanicDescription": "Tiga ronde. Gunakan Banding Digit per Tempat.",
      "voiceGuide": "Banding Digit per Tempat. Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-bilangan-b",
      "title": "Ketuk Bilangan Banding",
      "bookReference": "hlm. 10–14",
      "objective": "Mengetuk.. Ingat Banding Digit per Tempat.",
      "mechanicDescription": "Tiga ronde. Gunakan Banding Digit per Tempat.",
      "voiceGuide": "Banding Digit per Tempat. Ketuk.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-b",
      "title": "Ketuk Semua Sesuai Batas",
      "bookReference": "hlm. 10–14",
      "objective": "Ketuk semua.. Ingat Banding Digit per Tempat.",
      "mechanicDescription": "Tiga ronde. Gunakan Banding Digit per Tempat.",
      "voiceGuide": "Banding Digit per Tempat. Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-dakon",
      "title": "Cerita Dakon dan Urutan",
      "bookReference": "hlm. 10–13",
      "objective": "Soal cerita.. Ingat Banding Digit per Tempat.",
      "mechanicDescription": "Tiga ronde. Gunakan Banding Digit per Tempat.",
      "voiceGuide": "Banding Digit per Tempat. Pilih.",
      "emoji": "🎲",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-banding",
      "title": "Urutkan Naik/Turun",
      "bookReference": "hlm. 13–15",
      "objective": "Mengurutkan.. Ingat Banding Digit per Tempat.",
      "mechanicDescription": "Tiga ronde. Gunakan Banding Digit per Tempat.",
      "voiceGuide": "Banding Digit per Tempat. Urutkan.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "diagram-banding",
      "title": "Diagram Banding",
      "bookReference": "hlm. 14–15",
      "objective": "Pakai Urutan di Garis Bilangan: Bilangan lebih kanan lebih besar. Latihan: Baca tanda..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Number Line Order: Bilangan lebih kanan lebih besar.",
      "voiceGuide": "Urutan di Garis Bilangan. Bilangan lebih kanan lebih besar.",
      "diagramType": "cmp",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "diagram-urut",
      "title": "Diagram Urutan",
      "bookReference": "hlm. 13",
      "objective": "Pakai Urutan di Garis Bilangan: Bilangan lebih kanan lebih besar. Latihan: Baca urutan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Number Line Order: Bilangan lebih kanan lebih besar.",
      "voiceGuide": "Urutan di Garis Bilangan. Bilangan lebih kanan lebih besar.",
      "diagramType": "ord",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-b",
      "title": "Jodohkan Diagram Banding",
      "bookReference": "hlm. 14–15",
      "objective": "Pakai Urutan di Garis Bilangan: Bilangan lebih kanan lebih besar. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Number Line Order: Bilangan lebih kanan lebih besar.",
      "voiceGuide": "Urutan di Garis Bilangan. Bilangan lebih kanan lebih besar.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-b",
      "title": "Memori Diagram Banding",
      "bookReference": "hlm. 14–15",
      "objective": "Pakai Urutan di Garis Bilangan: Bilangan lebih kanan lebih besar. Latihan: Memori..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Number Line Order: Bilangan lebih kanan lebih besar.",
      "voiceGuide": "Urutan di Garis Bilangan. Bilangan lebih kanan lebih besar.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-b",
      "title": "Tabel Banding",
      "bookReference": "hlm. 14–15",
      "objective": "Isi tabel.. Ingat Urutan di Garis Bilangan.",
      "mechanicDescription": "Tiga tabel. Gunakan Urutan di Garis Bilangan.",
      "voiceGuide": "Urutan di Garis Bilangan. Pilih.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-pb",
      "title": "Ketuk Semua Diagram",
      "bookReference": "hlm. 10–14",
      "objective": "Ketuk semua.. Ingat Urutan di Garis Bilangan.",
      "mechanicDescription": "Tiga ronde. Gunakan Urutan di Garis Bilangan.",
      "voiceGuide": "Urutan di Garis Bilangan. Ketuk semua.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-b",
      "title": "Pilah Diagram Ukuran",
      "bookReference": "hlm. 10–13",
      "objective": "Pilah.. Ingat Urutan di Garis Bilangan.",
      "mechanicDescription": "Tiga ronde. Gunakan Urutan di Garis Bilangan.",
      "voiceGuide": "Urutan di Garis Bilangan. Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "papan-banding",
      "title": "Papan Banding Tempat",
      "bookReference": "hlm. 11–12",
      "objective": "Banding kolom.. Ingat Urutan di Garis Bilangan.",
      "mechanicDescription": "Tiga ronde. Gunakan Urutan di Garis Bilangan.",
      "voiceGuide": "Urutan di Garis Bilangan. Pilih.",
      "diagramType": "board",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "choose-b",
      "title": "Pilih Strategi Cocok",
      "bookReference": "hlm. 11–14",
      "objective": "Pilih pernyataan.. Ingat Urutan di Garis Bilangan.",
      "mechanicDescription": "Tiga ronde. Gunakan Urutan di Garis Bilangan.",
      "voiceGuide": "Urutan di Garis Bilangan. Pilih.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-b",
      "title": "Cerita Diagram Banding",
      "bookReference": "hlm. 10–15",
      "objective": "Cerita + diagram.. Ingat Urutan di Garis Bilangan.",
      "mechanicDescription": "Tiga ronde. Gunakan Urutan di Garis Bilangan.",
      "voiceGuide": "Urutan di Garis Bilangan. Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-tanda",
      "title": "Tulis Tanda Banding",
      "bookReference": "hlm. 15",
      "objective": "Pakai Bilangan Acuan: Pakai 10.000 atau 50.000 sebagai acuan perkiraan. Latihan: Menulis > < =..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Benchmark Numbers: Pakai 10.000 atau 50.000 sebagai acuan perkiraan.",
      "voiceGuide": "Bilangan Acuan. Pakai 10.000 atau 50.000 sebagai acuan perkiraan.",
      "symbolLarge": "><=",
      "wordLarge": "TANDA",
      "mathNotation": "banding"
    },
    {
      "stage": "Abstract",
      "gameType": "write-ekstrem",
      "title": "Tulis Bilangan Ekstrem",
      "bookReference": "hlm. 13",
      "objective": "Pakai Bilangan Acuan: Pakai 10.000 atau 50.000 sebagai acuan perkiraan. Latihan: Menulis ekstrem..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Benchmark Numbers: Pakai 10.000 atau 50.000 sebagai acuan perkiraan.",
      "voiceGuide": "Bilangan Acuan. Pakai 10.000 atau 50.000 sebagai acuan perkiraan.",
      "symbolLarge": "min/max",
      "wordLarge": "EKSTREEM",
      "mathNotation": "urut"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-strategi",
      "title": "Pilih Langkah Banding",
      "bookReference": "hlm. 11–13",
      "objective": "Pakai Bilangan Acuan: Pakai 10.000 atau 50.000 sebagai acuan perkiraan. Latihan: Strategi tempat..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Benchmark Numbers: Pakai 10.000 atau 50.000 sebagai acuan perkiraan.",
      "voiceGuide": "Bilangan Acuan. Pakai 10.000 atau 50.000 sebagai acuan perkiraan.",
      "symbolLarge": "PR→RB",
      "wordLarge": "STRATEGI",
      "mathNotation": "kiri"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-b",
      "title": "Urutkan Abstrak",
      "bookReference": "hlm. 13–15",
      "objective": "Pakai Bilangan Acuan: Pakai 10.000 atau 50.000 sebagai acuan perkiraan. Latihan: Mengurutkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Benchmark Numbers: Pakai 10.000 atau 50.000 sebagai acuan perkiraan.",
      "voiceGuide": "Bilangan Acuan. Pakai 10.000 atau 50.000 sebagai acuan perkiraan.",
      "symbolLarge": "naik",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-b",
      "title": "Jodohkan Notasi Banding",
      "bookReference": "hlm. 14–15",
      "objective": "Jodohkan.. Ingat Bilangan Acuan.",
      "mechanicDescription": "Tiga ronde. Gunakan Bilangan Acuan.",
      "voiceGuide": "Bilangan Acuan. Jodohkan.",
      "symbolLarge": "a?b",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-b",
      "title": "Memori Notasi Banding",
      "bookReference": "hlm. 14–15",
      "objective": "Memori.. Ingat Bilangan Acuan.",
      "mechanicDescription": "Tiga ronde. Gunakan Bilangan Acuan.",
      "voiceGuide": "Bilangan Acuan. Balik kartu.",
      "symbolLarge": "urut",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-b",
      "title": "Benar atau Salah: Banding",
      "bookReference": "hlm. 10–15",
      "objective": "Menilai.. Ingat Bilangan Acuan.",
      "mechanicDescription": "Dua ronde. Gunakan Bilangan Acuan.",
      "voiceGuide": "Bilangan Acuan. Benar/salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-b",
      "title": "Detektif Banding Urut",
      "bookReference": "hlm. 10–15",
      "objective": "Petunjuk → jawaban.. Ingat Bilangan Acuan.",
      "mechanicDescription": "Tiga soal. Gunakan Bilangan Acuan.",
      "voiceGuide": "Bilangan Acuan. Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-b",
      "title": "Peta Konsep Banding",
      "bookReference": "hlm. 2–14",
      "objective": "Mengisi kotak.. Ingat Bilangan Acuan.",
      "mechanicDescription": "Satu peta. Gunakan Bilangan Acuan.",
      "voiceGuide": "Bilangan Acuan. Pilih opsi.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-b",
      "title": "Cerita Angka Banding",
      "bookReference": "hlm. 10–15",
      "objective": "Soal cerita.. Ingat Bilangan Acuan.",
      "mechanicDescription": "Tiga ronde. Gunakan Bilangan Acuan.",
      "voiceGuide": "Bilangan Acuan. Pilih.",
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
      "ikon": "🌍",
      "nama": "Banding Digit per Tempat",
      "isi": "Bandingkan dari nilai tempat terbesar ke terkecil.",
      "suara": "Banding Digit per Tempat. Bandingkan dari nilai tempat terbesar ke terkecil."
    },
    {
      "ikon": "🌍",
      "nama": "Urutan di Garis Bilangan",
      "isi": "Bilangan lebih kanan lebih besar.",
      "suara": "Urutan di Garis Bilangan. Bilangan lebih kanan lebih besar."
    },
    {
      "ikon": "🌍",
      "nama": "Bilangan Acuan",
      "isi": "Pakai 10.000 atau 50.000 sebagai acuan perkiraan.",
      "suara": "Bilangan Acuan. Pakai 10.000 atau 50.000 sebagai acuan perkiraan."
    }
  ],
  "poinSuara": "Ingat: Banding Digit per Tempat, Urutan di Garis Bilangan, Bilangan Acuan.",
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
  "rumah": "Ayo Mencoba di rumah: terapkan Banding Digit per Tempat pada satu benda atau soal nyata, lalu ceritakan langkahmu.",
  "refleksi": [
    "Bagaimana Banding Digit per Tempat membantumu memahami soal?",
    "Kapan kamu memakai Urutan di Garis Bilangan?",
    "Apa bedanya dengan hanya menghafal rumus atau langkah tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Compare Place by Place",
      "namaId": "Banding Digit per Tempat",
      "asal": "Van de Walle",
      "ringkas": "Bandingkan dari nilai tempat terbesar ke terkecil.",
      "tahap": [
        "Story",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Number Line Order",
      "namaId": "Urutan di Garis Bilangan",
      "asal": "Number line pedagogy",
      "ringkas": "Bilangan lebih kanan lebih besar.",
      "tahap": [
        "Picture",
        "Mind"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Benchmark Numbers",
      "namaId": "Bilangan Acuan",
      "asal": "Number sense",
      "ringkas": "Pakai 10.000 atau 50.000 sebagai acuan perkiraan.",
      "tahap": [
        "Infografis",
        "Abstract"
      ]
    }
  ]
};

export const SUB_C51: SubBabNaskah = {
  "id": "C",
  "codeTitle": "Sub-Bab C (Komposisi dan Dekomposisi)",
  "fullTitle": "Sub-Bab C: Komposisi dan Dekomposisi Bilangan Cacah Sampai 100.000",
  "targetDescription": "Siswa menyusun bilangan dari pecahan nilai tempat (komposisi) dan menguraikannya ke bentuk panjang (dekomposisi), termasuk banyak cara setara seperti contoh Asep, Lukas, dan Komang pada Buku Siswa Kelas V Bab 1. Siswa memakai cara Bentuk Uraian, Susun Ulang Nilai Tempat, Kembali ke Bentuk Lazim.",
  "secondaryBg": "#DCFCE7",
  "secondaryBorder": "#16A34A",
  "secondaryText": "#14532D",
  "silabus": {
    "teksSuara": "Kita belajar menyusun dan menguraikan bilangan sampai seratus ribu. Pecahan sepuluh ribuan, seribuan, dan seratusan digabung menjadi satu bilangan. Satu bilangan juga bisa diuraikan menjadi jumlah nilai tempat. Banyak cara boleh, asalkan jumlahnya sama. Kita memakai cara dari luar buku: Bentuk Uraian (Expanded Form); Susun Ulang Nilai Tempat (Flexible Composition); Kembali ke Bentuk Lazim (Standard Form). Tulis bilangan sebagai jumlah nilai tempat: 3000+200+40+5. Satu puluhan bisa jadi sepuluh satuan; fleksibel saat operasi. Setelah mengurai, rapikan lagi ke bentuk bilangan biasa. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa melakukan komposisi dan dekomposisi bilangan cacah sampai 100.000.",
    "referensi": "Buku Siswa Matematika Kelas V Kemendikbudristek (Bab 1: Bilangan Cacah sampai 100.000, Sub-Bab C)."
  },
  "videos": [
    {
      "id": "K5B1C-V1",
      "judul": "Susun dari Pecahan",
      "subjudul": "Expanded Form",
      "adegan": [
        {
          "id": "K5B1C-V1-1",
          "judul": "Uang Asep",
          "ketukan": [
            "Bayangkan situasi nyata di kelas atau di rumah. Tiga lembar sepuluh ribuan. Mari kita pahami bersama.",
            "Delapan lembar seribuan. Mari kita pahami bersama.",
            "Enam keping seratusan. Mari kita pahami bersama.",
            "Ingat cara Bentuk Uraian: Tulis bilangan sebagai jumlah nilai tempat: 3000+200+40+5."
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
            "Tiga puluh ribu. Mari kita pahami bersama.",
            "Tambah delapan ribu. Mari kita pahami bersama.",
            "Tambah enam ratus. Mari kita pahami bersama.",
            "Di sini kita memakai ide Expanded Form — Tulis bilangan sebagai jumlah nilai tempat: 3000+200+40+5."
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
            "Enam lembar sepuluh ribuan. Mari kita pahami bersama.",
            "Tiga lembar seribuan. Mari kita pahami bersama.",
            "Lima keping seratusan. Mari kita pahami bersama.",
            "METODE LUAR · Bentuk Uraian: Tulis bilangan sebagai jumlah nilai tempat: 3000+200+40+5."
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
      "judul": "Latihan: Susun Ulang Nilai Tempat",
      "subjudul": "Flexible Composition",
      "adegan": [
        {
          "id": "K5B1C-V2-1",
          "judul": "Buka nilai tempat",
          "ketukan": [
            "Ambil bilangan utuh. Mari kita pahami bersama.",
            "Pisahkan tiap tempat. Mari kita pahami bersama.",
            "Tulis jumlah nilai. Mari kita pahami bersama.",
            "Ingat cara Susun Ulang Nilai Tempat: Satu puluhan bisa jadi sepuluh satuan; fleksibel saat operasi."
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
            "Empat puluh lima ribu enam ratus. Mari kita pahami bersama.",
            "Empat puluh ribu. Mari kita pahami bersama.",
            "Lima ribu. Mari kita pahami bersama.",
            "Di sini kita memakai ide Flexible Composition — Satu puluhan bisa jadi sepuluh satuan; fleksibel saat operasi."
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
            "Komposisi menyusun. Mari kita pahami bersama.",
            "Dekomposisi menguraikan. Mari kita pahami bersama.",
            "Keduanya saling cek. Mari kita pahami bersama.",
            "METODE LUAR · Susun Ulang Nilai Tempat: Satu puluhan bisa jadi sepuluh satuan; fleksibel saat operasi."
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
      "judul": "Siap pakai Standard Form",
      "subjudul": "Standard Form",
      "adegan": [
        {
          "id": "K5B1C-V3-1",
          "judul": "Komang 45.600",
          "ketukan": [
            "Komang butuh empat lima titik enam nol nol. Mari kita pahami bersama.",
            "Boleh empat kali sepuluh ribu. Mari kita pahami bersama.",
            "Atau empat puluh lima kali seribu. Mari kita pahami bersama.",
            "Ingat cara Kembali ke Bentuk Lazim: Setelah mengurai, rapikan lagi ke bentuk bilangan biasa."
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
            "Lima belas lembar seribu. Mari kita pahami bersama.",
            "Enam belas keping seratus. Mari kita pahami bersama.",
            "Digit sementara boleh besar. Mari kita pahami bersama.",
            "Di sini kita memakai ide Standard Form — Setelah mengurai, rapikan lagi ke bentuk bilangan biasa."
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
            "Komposisi sudah jelas. Mari kita pahami bersama.",
            "Dekomposisi sudah jelas. Mari kita pahami bersama.",
            "Ayo ke permainan. Mari kita pahami bersama.",
            "METODE LUAR · Kembali ke Bentuk Lazim: Setelah mengurai, rapikan lagi ke bentuk bilangan biasa."
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
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Komposisi dan Dekomposisi Bilangan Cacah Sampai 100.000. Apa yang ditanyakan?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Expanded Form",
      "stepDesc": "Tulis bilangan sebagai jumlah nilai tempat: 3000+200+40+5.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Flexible Composition",
      "stepDesc": "Satu puluhan bisa jadi sepuluh satuan; fleksibel saat operasi.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Standard Form",
      "stepDesc": "Setelah mengurai, rapikan lagi ke bentuk bilangan biasa.",
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
    },
    {
      "judul": "Bentuk Uraian",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "ingat",
      "suara": "Tulis bilangan sebagai jumlah nilai tempat: 3000+200+40+5."
    },
    {
      "judul": "Susun Ulang Nilai Tempat",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "ingat",
      "suara": "Satu puluhan bisa jadi sepuluh satuan; fleksibel saat operasi."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "komposisi-pecahan",
      "title": "Susun dari Pecahan",
      "bookReference": "hlm. 15–16",
      "objective": "Pakai Bentuk Uraian: Tulis bilangan sebagai jumlah nilai tempat: 3000+200+40+5. Latihan: Menyusun total dari pecahan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Expanded Form: Tulis bilangan sebagai jumlah nilai tempat: 3000+200+40+5.",
      "voiceGuide": "Bentuk Uraian. Tulis bilangan sebagai jumlah nilai tempat: 3000+200+40+5.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "dekomposisi-panjang",
      "title": "Uraikan Bentuk Panjang",
      "bookReference": "hlm. 16–17",
      "objective": "Pakai Bentuk Uraian: Tulis bilangan sebagai jumlah nilai tempat: 3000+200+40+5. Latihan: Menulis jumlah nilai tempat..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Expanded Form: Tulis bilangan sebagai jumlah nilai tempat: 3000+200+40+5.",
      "voiceGuide": "Bentuk Uraian. Tulis bilangan sebagai jumlah nilai tempat: 3000+200+40+5.",
      "emoji": "📜",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "banyak-cara",
      "title": "Banyak Cara Komposisi",
      "bookReference": "hlm. 16–17",
      "objective": "Pakai Bentuk Uraian: Tulis bilangan sebagai jumlah nilai tempat: 3000+200+40+5. Latihan: Mengenali cara setara..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Expanded Form: Tulis bilangan sebagai jumlah nilai tempat: 3000+200+40+5.",
      "voiceGuide": "Bentuk Uraian. Tulis bilangan sebagai jumlah nilai tempat: 3000+200+40+5.",
      "emoji": "🔄",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-komposisi",
      "title": "Pilah Sama/Beda Total",
      "bookReference": "hlm. 15–17",
      "objective": "Pakai Bentuk Uraian: Tulis bilangan sebagai jumlah nilai tempat: 3000+200+40+5. Latihan: Memilah komposisi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Expanded Form: Tulis bilangan sebagai jumlah nilai tempat: 3000+200+40+5.",
      "voiceGuide": "Bentuk Uraian. Tulis bilangan sebagai jumlah nilai tempat: 3000+200+40+5.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-komposisi",
      "title": "Jodohkan Pecahan–Total",
      "bookReference": "hlm. 15–17",
      "objective": "Menjodohkan.. Ingat Bentuk Uraian.",
      "mechanicDescription": "Tiga ronde. Gunakan Bentuk Uraian.",
      "voiceGuide": "Bentuk Uraian. Jodohkan.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-komposisi",
      "title": "Memori Komposisi",
      "bookReference": "hlm. 15–17",
      "objective": "Memori.. Ingat Bentuk Uraian.",
      "mechanicDescription": "Tiga ronde. Gunakan Bentuk Uraian.",
      "voiceGuide": "Bentuk Uraian. Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-komposisi",
      "title": "Ketuk Hasil Komposisi",
      "bookReference": "hlm. 15–17",
      "objective": "Mengetuk.. Ingat Bentuk Uraian.",
      "mechanicDescription": "Tiga ronde. Gunakan Bentuk Uraian.",
      "voiceGuide": "Bentuk Uraian. Ketuk.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-komposisi",
      "title": "Ketuk Semua Setara",
      "bookReference": "hlm. 16–17",
      "objective": "Ketuk semua.. Ingat Bentuk Uraian.",
      "mechanicDescription": "Tiga ronde. Gunakan Bentuk Uraian.",
      "voiceGuide": "Bentuk Uraian. Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-komposisi",
      "title": "Cerita Asep Lukas Komang",
      "bookReference": "hlm. 15–17",
      "objective": "Soal cerita.. Ingat Bentuk Uraian.",
      "mechanicDescription": "Tiga ronde. Gunakan Bentuk Uraian.",
      "voiceGuide": "Bentuk Uraian. Pilih.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-komposisi",
      "title": "Urutkan Hasil Susunan",
      "bookReference": "hlm. 15–17",
      "objective": "Mengurutkan.. Ingat Bentuk Uraian.",
      "mechanicDescription": "Tiga ronde. Gunakan Bentuk Uraian.",
      "voiceGuide": "Bentuk Uraian. Urutkan.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "papan-komposisi",
      "title": "Papan Susun Pecahan",
      "bookReference": "hlm. 16",
      "objective": "Pakai Susun Ulang Nilai Tempat: Satu puluhan bisa jadi sepuluh satuan; fleksibel saat operasi. Latihan: Baca papan tempat..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Flexible Composition: Satu puluhan bisa jadi sepuluh satuan; fleksibel saat operasi.",
      "voiceGuide": "Susun Ulang Nilai Tempat. Satu puluhan bisa jadi sepuluh satuan; fleksibel saat operasi.",
      "diagramType": "board",
      "numberA": 1,
      "numberB": 5
    },
    {
      "stage": "Picture",
      "gameType": "diagram-dekom",
      "title": "Diagram Bentuk Panjang",
      "bookReference": "hlm. 16–17",
      "objective": "Pakai Susun Ulang Nilai Tempat: Satu puluhan bisa jadi sepuluh satuan; fleksibel saat operasi. Latihan: Baca uraian..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Flexible Composition: Satu puluhan bisa jadi sepuluh satuan; fleksibel saat operasi.",
      "voiceGuide": "Susun Ulang Nilai Tempat. Satu puluhan bisa jadi sepuluh satuan; fleksibel saat operasi.",
      "diagramType": "expand",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-c",
      "title": "Jodohkan Diagram Komposisi",
      "bookReference": "hlm. 15–17",
      "objective": "Pakai Susun Ulang Nilai Tempat: Satu puluhan bisa jadi sepuluh satuan; fleksibel saat operasi. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Flexible Composition: Satu puluhan bisa jadi sepuluh satuan; fleksibel saat operasi.",
      "voiceGuide": "Susun Ulang Nilai Tempat. Satu puluhan bisa jadi sepuluh satuan; fleksibel saat operasi.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-c",
      "title": "Memori Diagram Komposisi",
      "bookReference": "hlm. 15–17",
      "objective": "Pakai Susun Ulang Nilai Tempat: Satu puluhan bisa jadi sepuluh satuan; fleksibel saat operasi. Latihan: Memori..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Flexible Composition: Satu puluhan bisa jadi sepuluh satuan; fleksibel saat operasi.",
      "voiceGuide": "Susun Ulang Nilai Tempat. Satu puluhan bisa jadi sepuluh satuan; fleksibel saat operasi.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-c",
      "title": "Tabel Komposisi",
      "bookReference": "hlm. 16–17",
      "objective": "Isi tabel.. Ingat Susun Ulang Nilai Tempat.",
      "mechanicDescription": "Tiga tabel. Gunakan Susun Ulang Nilai Tempat.",
      "voiceGuide": "Susun Ulang Nilai Tempat. Pilih.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-pc",
      "title": "Ketuk Semua Diagram C",
      "bookReference": "hlm. 15–17",
      "objective": "Ketuk semua.. Ingat Susun Ulang Nilai Tempat.",
      "mechanicDescription": "Tiga ronde. Gunakan Susun Ulang Nilai Tempat.",
      "voiceGuide": "Susun Ulang Nilai Tempat. Ketuk semua.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-c",
      "title": "Pilah Diagram Setara",
      "bookReference": "hlm. 15–17",
      "objective": "Pilah.. Ingat Susun Ulang Nilai Tempat.",
      "mechanicDescription": "Tiga ronde. Gunakan Susun Ulang Nilai Tempat.",
      "voiceGuide": "Susun Ulang Nilai Tempat. Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "cara-fleksibel",
      "title": "Model Cara Fleksibel",
      "bookReference": "hlm. 16–17",
      "objective": "Cara setara.. Ingat Susun Ulang Nilai Tempat.",
      "mechanicDescription": "Tiga ronde. Gunakan Susun Ulang Nilai Tempat.",
      "voiceGuide": "Susun Ulang Nilai Tempat. Pilih.",
      "diagramType": "flex",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "choose-c",
      "title": "Pilih Pernyataan Komposisi",
      "bookReference": "hlm. 15–17",
      "objective": "Pilih pernyataan.. Ingat Susun Ulang Nilai Tempat.",
      "mechanicDescription": "Tiga ronde. Gunakan Susun Ulang Nilai Tempat.",
      "voiceGuide": "Susun Ulang Nilai Tempat. Pilih.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-c",
      "title": "Cerita Diagram Komposisi",
      "bookReference": "hlm. 15–17",
      "objective": "Cerita + diagram.. Ingat Susun Ulang Nilai Tempat.",
      "mechanicDescription": "Tiga ronde. Gunakan Susun Ulang Nilai Tempat.",
      "voiceGuide": "Susun Ulang Nilai Tempat. Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-total",
      "title": "Tulis Total Komposisi",
      "bookReference": "hlm. 15–16",
      "objective": "Pakai Kembali ke Bentuk Lazim: Setelah mengurai, rapikan lagi ke bentuk bilangan biasa. Latihan: Menulis total..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Standard Form: Setelah mengurai, rapikan lagi ke bentuk bilangan biasa.",
      "voiceGuide": "Kembali ke Bentuk Lazim. Setelah mengurai, rapikan lagi ke bentuk bilangan biasa.",
      "symbolLarge": "38.600",
      "wordLarge": "TOTAL",
      "mathNotation": "jumlah"
    },
    {
      "stage": "Abstract",
      "gameType": "write-uraian",
      "title": "Tulis Bentuk Panjang",
      "bookReference": "hlm. 16–17",
      "objective": "Pakai Kembali ke Bentuk Lazim: Setelah mengurai, rapikan lagi ke bentuk bilangan biasa. Latihan: Menulis uraian..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Standard Form: Setelah mengurai, rapikan lagi ke bentuk bilangan biasa.",
      "voiceGuide": "Kembali ke Bentuk Lazim. Setelah mengurai, rapikan lagi ke bentuk bilangan biasa.",
      "symbolLarge": "30k+8k+600",
      "wordLarge": "URAIAN",
      "mathNotation": "panjang"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-cara",
      "title": "Pilih Cara Setara",
      "bookReference": "hlm. 16–17",
      "objective": "Pakai Kembali ke Bentuk Lazim: Setelah mengurai, rapikan lagi ke bentuk bilangan biasa. Latihan: Cara fleksibel..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Standard Form: Setelah mengurai, rapikan lagi ke bentuk bilangan biasa.",
      "voiceGuide": "Kembali ke Bentuk Lazim. Setelah mengurai, rapikan lagi ke bentuk bilangan biasa.",
      "symbolLarge": "cara2",
      "wordLarge": "CARA",
      "mathNotation": "setara"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-c",
      "title": "Urutkan Hasil Abstrak",
      "bookReference": "hlm. 15–17",
      "objective": "Pakai Kembali ke Bentuk Lazim: Setelah mengurai, rapikan lagi ke bentuk bilangan biasa. Latihan: Mengurutkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Standard Form: Setelah mengurai, rapikan lagi ke bentuk bilangan biasa.",
      "voiceGuide": "Kembali ke Bentuk Lazim. Setelah mengurai, rapikan lagi ke bentuk bilangan biasa.",
      "symbolLarge": "naik",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-c",
      "title": "Jodohkan Notasi Komposisi",
      "bookReference": "hlm. 15–17",
      "objective": "Jodohkan.. Ingat Kembali ke Bentuk Lazim.",
      "mechanicDescription": "Tiga ronde. Gunakan Kembali ke Bentuk Lazim.",
      "voiceGuide": "Kembali ke Bentuk Lazim. Jodohkan.",
      "symbolLarge": "pecahan",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-c",
      "title": "Memori Notasi Komposisi",
      "bookReference": "hlm. 15–17",
      "objective": "Memori.. Ingat Kembali ke Bentuk Lazim.",
      "mechanicDescription": "Tiga ronde. Gunakan Kembali ke Bentuk Lazim.",
      "voiceGuide": "Kembali ke Bentuk Lazim. Balik kartu.",
      "symbolLarge": "setara",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-c",
      "title": "Benar atau Salah: Komposisi",
      "bookReference": "hlm. 15–17",
      "objective": "Menilai.. Ingat Kembali ke Bentuk Lazim.",
      "mechanicDescription": "Dua ronde. Gunakan Kembali ke Bentuk Lazim.",
      "voiceGuide": "Kembali ke Bentuk Lazim. Benar/salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-c",
      "title": "Detektif Komposisi",
      "bookReference": "hlm. 15–17",
      "objective": "Petunjuk → bilangan.. Ingat Kembali ke Bentuk Lazim.",
      "mechanicDescription": "Tiga soal. Gunakan Kembali ke Bentuk Lazim.",
      "voiceGuide": "Kembali ke Bentuk Lazim. Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-c",
      "title": "Peta Konsep Komposisi",
      "bookReference": "hlm. 15–17",
      "objective": "Mengisi kotak.. Ingat Kembali ke Bentuk Lazim.",
      "mechanicDescription": "Satu peta. Gunakan Kembali ke Bentuk Lazim.",
      "voiceGuide": "Kembali ke Bentuk Lazim. Pilih opsi.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-c",
      "title": "Cerita Angka Komposisi",
      "bookReference": "hlm. 15–17",
      "objective": "Soal cerita.. Ingat Kembali ke Bentuk Lazim.",
      "mechanicDescription": "Tiga ronde. Gunakan Kembali ke Bentuk Lazim.",
      "voiceGuide": "Kembali ke Bentuk Lazim. Pilih.",
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
      "ikon": "🌍",
      "nama": "Bentuk Uraian",
      "isi": "Tulis bilangan sebagai jumlah nilai tempat: 3000+200+40+5.",
      "suara": "Bentuk Uraian. Tulis bilangan sebagai jumlah nilai tempat: 3000+200+40+5."
    },
    {
      "ikon": "🌍",
      "nama": "Susun Ulang Nilai Tempat",
      "isi": "Satu puluhan bisa jadi sepuluh satuan; fleksibel saat operasi.",
      "suara": "Susun Ulang Nilai Tempat. Satu puluhan bisa jadi sepuluh satuan; fleksibel saat operasi."
    },
    {
      "ikon": "🌍",
      "nama": "Kembali ke Bentuk Lazim",
      "isi": "Setelah mengurai, rapikan lagi ke bentuk bilangan biasa.",
      "suara": "Kembali ke Bentuk Lazim. Setelah mengurai, rapikan lagi ke bentuk bilangan biasa."
    }
  ],
  "poinSuara": "Ingat: Bentuk Uraian, Susun Ulang Nilai Tempat, Kembali ke Bentuk Lazim.",
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
  "rumah": "Ayo Mencoba di rumah: terapkan Bentuk Uraian pada satu benda atau soal nyata, lalu ceritakan langkahmu.",
  "refleksi": [
    "Bagaimana Bentuk Uraian membantumu memahami soal?",
    "Kapan kamu memakai Susun Ulang Nilai Tempat?",
    "Apa bedanya dengan hanya menghafal rumus atau langkah tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Expanded Form",
      "namaId": "Bentuk Uraian",
      "asal": "Van de Walle",
      "ringkas": "Tulis bilangan sebagai jumlah nilai tempat: 3000+200+40+5.",
      "tahap": [
        "Story",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Flexible Composition",
      "namaId": "Susun Ulang Nilai Tempat",
      "asal": "Van de Walle",
      "ringkas": "Satu puluhan bisa jadi sepuluh satuan; fleksibel saat operasi.",
      "tahap": [
        "Mind",
        "Picture",
        "Concrete"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Standard Form",
      "namaId": "Kembali ke Bentuk Lazim",
      "asal": "Place-value fluency",
      "ringkas": "Setelah mengurai, rapikan lagi ke bentuk bilangan biasa.",
      "tahap": [
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
  "targetDescription": "Siswa menjumlahkan, mengurangi, mengalikan, dan membagi bilangan cacah sampai 100.000 dengan strategi nilai tempat, susun pendek/panjang, serta soal cerita konteks bakti sosial, angpau, dan toko buah sesuai Buku Siswa Kelas V Bab 1. Siswa memakai cara Algoritma Bersusun, Menyimpan dan Meminjam, Perkiraan Dulu.",
  "secondaryBg": "#FEF3C7",
  "secondaryBorder": "#D97706",
  "secondaryText": "#78350F",
  "silabus": {
    "teksSuara": "Kita belajar empat operasi pada bilangan sampai seratus ribu. Penjumlahan dan pengurangan disusun menurut nilai tempat. Perkalian bisa dipecah faktor. Pembagian membagi rata. Kita pakai cerita bakti sosial, angpau, dan toko buah. Kita memakai cara dari luar buku: Algoritma Bersusun (Standard Algorithm); Menyimpan dan Meminjam (Regrouping); Perkiraan Dulu (Estimate First). Jumlah/kurang dari kanan, simpan atau pinjam antar nilai tempat. Sepuluh satuan jadi satu puluhan; sebaliknya saat kurang. Perkirakan hasil sebelum hitung tepat untuk mengecek. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa melakukan operasi hitung bilangan cacah sampai 100.000.",
    "referensi": "Buku Siswa Matematika Kelas V Kemendikbudristek (Bab 1: Bilangan Cacah sampai 100.000, Sub-Bab D)."
  },
  "videos": [
    {
      "id": "K5B1D-V1",
      "judul": "Jumlah dan Kurang",
      "subjudul": "Standard Algorithm",
      "adegan": [
        {
          "id": "K5B1D-V1-1",
          "judul": "Bakti sosial Nisa",
          "ketukan": [
            "Bayangkan situasi nyata di kelas atau di rumah. Ibu memberi lima tujuh titik lima nol nol. Mari kita pahami bersama.",
            "Ayah memberi dua dua titik nol nol nol. Mari kita pahami bersama.",
            "Jumlahkan menurut tempat. Mari kita pahami bersama.",
            "Ingat cara Algoritma Bersusun: Jumlah/kurang dari kanan, simpan atau pinjam antar nilai tempat."
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
            "Tulis sejajar kolom. Mari kita pahami bersama.",
            "Puluh ribuan dengan puluh ribuan. Mari kita pahami bersama.",
            "Jumlahkan tiap kolom. Mari kita pahami bersama.",
            "Di sini kita memakai ide Standard Algorithm — Jumlah/kurang dari kanan, simpan atau pinjam antar nilai tempat."
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
            "Uang empat tujuh titik sembilan nol nol. Mari kita pahami bersama.",
            "Bayar empat lima titik tujuh lima nol. Mari kita pahami bersama.",
            "Kurangkan. Mari kita pahami bersama.",
            "METODE LUAR · Algoritma Bersusun: Jumlah/kurang dari kanan, simpan atau pinjam antar nilai tempat."
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
      "judul": "Latihan: Menyimpan dan Meminjam",
      "subjudul": "Regrouping",
      "adegan": [
        {
          "id": "K5B1D-V2-1",
          "judul": "Dua belas angpau",
          "ketukan": [
            "Dua belas amplop. Mari kita pahami bersama.",
            "Tiap amplop lima ribu. Mari kita pahami bersama.",
            "Sepuluh kali lima ribu lima puluh ribu. Mari kita pahami bersama.",
            "Ingat cara Menyimpan dan Meminjam: Sepuluh satuan jadi satu puluhan; sebaliknya saat kurang."
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
            "Enam empat ribu. Mari kita pahami bersama.",
            "Bagi empat anak. Mari kita pahami bersama.",
            "Sama rata. Mari kita pahami bersama.",
            "Di sini kita memakai ide Regrouping — Sepuluh satuan jadi satu puluhan; sebaliknya saat kurang."
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
            "Kali dan bagi berkebalikan. Mari kita pahami bersama.",
            "Empat kali enam belas ribu. Mari kita pahami bersama.",
            "Kembali enam empat ribu. Mari kita pahami bersama.",
            "METODE LUAR · Menyimpan dan Meminjam: Sepuluh satuan jadi satu puluhan; sebaliknya saat kurang."
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
      "judul": "Siap pakai Estimate First",
      "subjudul": "Estimate First",
      "adegan": [
        {
          "id": "K5B1D-V3-1",
          "judul": "Harga buah",
          "ketukan": [
            "Mangga dua tiga titik lima nol nol. Mari kita pahami bersama.",
            "Jeruk tujuh belas ribu. Mari kita pahami bersama.",
            "Naga lima belas ribu. Mari kita pahami bersama.",
            "Ingat cara Perkiraan Dulu: Perkirakan hasil sebelum hitung tepat untuk mengecek."
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
            "Dua mangga dan satu jeruk. Mari kita pahami bersama.",
            "Dua kali dua tiga titik lima. Mari kita pahami bersama.",
            "Tambah tujuh belas ribu. Mari kita pahami bersama.",
            "Di sini kita memakai ide Estimate First — Perkirakan hasil sebelum hitung tepat untuk mengecek."
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
            "Empat operasi sudah siap. Mari kita pahami bersama.",
            "Strategi tempat sudah jelas. Mari kita pahami bersama.",
            "Ayo ke permainan. Mari kita pahami bersama.",
            "METODE LUAR · Perkiraan Dulu: Perkirakan hasil sebelum hitung tepat untuk mengecek."
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
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Operasi Hitung pada Bilangan Cacah Sampai 100.000. Apa yang ditanyakan?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Standard Algorithm",
      "stepDesc": "Jumlah/kurang dari kanan, simpan atau pinjam antar nilai tempat.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Regrouping",
      "stepDesc": "Sepuluh satuan jadi satu puluhan; sebaliknya saat kurang.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Estimate First",
      "stepDesc": "Perkirakan hasil sebelum hitung tepat untuk mengecek.",
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
    },
    {
      "judul": "Algoritma Bersusun",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "ingat",
      "suara": "Jumlah/kurang dari kanan, simpan atau pinjam antar nilai tempat."
    },
    {
      "judul": "Menyimpan dan Meminjam",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "ingat",
      "suara": "Sepuluh satuan jadi satu puluhan; sebaliknya saat kurang."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "penjumlahan-5digit",
      "title": "Penjumlahan Lima Angka",
      "bookReference": "hlm. 17–19",
      "objective": "Pakai Algoritma Bersusun: Jumlah/kurang dari kanan, simpan atau pinjam antar nilai tempat. Latihan: Menjumlahkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Standard Algorithm: Jumlah/kurang dari kanan, simpan atau pinjam antar nilai tempat.",
      "voiceGuide": "Algoritma Bersusun. Jumlah/kurang dari kanan, simpan atau pinjam antar nilai tempat.",
      "emoji": "➕",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "pengurangan-5digit",
      "title": "Pengurangan Lima Angka",
      "bookReference": "hlm. 19–20",
      "objective": "Pakai Algoritma Bersusun: Jumlah/kurang dari kanan, simpan atau pinjam antar nilai tempat. Latihan: Mengurangi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Standard Algorithm: Jumlah/kurang dari kanan, simpan atau pinjam antar nilai tempat.",
      "voiceGuide": "Algoritma Bersusun. Jumlah/kurang dari kanan, simpan atau pinjam antar nilai tempat.",
      "emoji": "➖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "perkalian-besar",
      "title": "Perkalian sampai 100.000",
      "bookReference": "hlm. 21–23",
      "objective": "Pakai Algoritma Bersusun: Jumlah/kurang dari kanan, simpan atau pinjam antar nilai tempat. Latihan: Mengalikan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Standard Algorithm: Jumlah/kurang dari kanan, simpan atau pinjam antar nilai tempat.",
      "voiceGuide": "Algoritma Bersusun. Jumlah/kurang dari kanan, simpan atau pinjam antar nilai tempat.",
      "emoji": "✖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "pembagian-besar",
      "title": "Pembagian sampai 100.000",
      "bookReference": "hlm. 22–23",
      "objective": "Pakai Algoritma Bersusun: Jumlah/kurang dari kanan, simpan atau pinjam antar nilai tempat. Latihan: Membagi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Standard Algorithm: Jumlah/kurang dari kanan, simpan atau pinjam antar nilai tempat.",
      "voiceGuide": "Algoritma Bersusun. Jumlah/kurang dari kanan, simpan atau pinjam antar nilai tempat.",
      "emoji": "➗",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "match-operasi",
      "title": "Jodohkan Operasi–Hasil",
      "bookReference": "hlm. 17–24",
      "objective": "Menjodohkan.. Ingat Algoritma Bersusun.",
      "mechanicDescription": "Tiga ronde. Gunakan Algoritma Bersusun.",
      "voiceGuide": "Algoritma Bersusun. Jodohkan.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-operasi",
      "title": "Memori Operasi",
      "bookReference": "hlm. 17–24",
      "objective": "Memori.. Ingat Algoritma Bersusun.",
      "mechanicDescription": "Tiga ronde. Gunakan Algoritma Bersusun.",
      "voiceGuide": "Algoritma Bersusun. Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-hasil",
      "title": "Ketuk Hasil Operasi",
      "bookReference": "hlm. 17–24",
      "objective": "Mengetuk.. Ingat Algoritma Bersusun.",
      "mechanicDescription": "Tiga ronde. Gunakan Algoritma Bersusun.",
      "voiceGuide": "Algoritma Bersusun. Ketuk.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-operasi",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 17–24",
      "objective": "Ketuk semua.. Ingat Algoritma Bersusun.",
      "mechanicDescription": "Tiga ronde. Gunakan Algoritma Bersusun.",
      "voiceGuide": "Algoritma Bersusun. Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-operasi",
      "title": "Cerita Bakti dan Toko Buah",
      "bookReference": "hlm. 17–25",
      "objective": "Soal cerita.. Ingat Algoritma Bersusun.",
      "mechanicDescription": "Tiga ronde. Gunakan Algoritma Bersusun.",
      "voiceGuide": "Algoritma Bersusun. Pilih.",
      "emoji": "🛒",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-hasil",
      "title": "Urutkan Hasil Hitung",
      "bookReference": "hlm. 17–25",
      "objective": "Mengurutkan.. Ingat Algoritma Bersusun.",
      "mechanicDescription": "Tiga ronde. Gunakan Algoritma Bersusun.",
      "voiceGuide": "Algoritma Bersusun. Urutkan.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "diagram-tambah",
      "title": "Diagram Penjumlahan",
      "bookReference": "hlm. 18–19",
      "objective": "Pakai Menyimpan dan Meminjam: Sepuluh satuan jadi satu puluhan; sebaliknya saat kurang. Latihan: Baca jumlah..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Regrouping: Sepuluh satuan jadi satu puluhan; sebaliknya saat kurang.",
      "voiceGuide": "Menyimpan dan Meminjam. Sepuluh satuan jadi satu puluhan; sebaliknya saat kurang.",
      "diagramType": "add",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "diagram-kurang",
      "title": "Diagram Pengurangan",
      "bookReference": "hlm. 19–20",
      "objective": "Pakai Menyimpan dan Meminjam: Sepuluh satuan jadi satu puluhan; sebaliknya saat kurang. Latihan: Baca selisih..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Regrouping: Sepuluh satuan jadi satu puluhan; sebaliknya saat kurang.",
      "voiceGuide": "Menyimpan dan Meminjam. Sepuluh satuan jadi satu puluhan; sebaliknya saat kurang.",
      "diagramType": "sub",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "diagram-kali",
      "title": "Diagram Perkalian",
      "bookReference": "hlm. 21–23",
      "objective": "Pakai Menyimpan dan Meminjam: Sepuluh satuan jadi satu puluhan; sebaliknya saat kurang. Latihan: Baca hasil kali..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Regrouping: Sepuluh satuan jadi satu puluhan; sebaliknya saat kurang.",
      "voiceGuide": "Menyimpan dan Meminjam. Sepuluh satuan jadi satu puluhan; sebaliknya saat kurang.",
      "diagramType": "mul",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "diagram-bagi",
      "title": "Diagram Pembagian",
      "bookReference": "hlm. 22–23",
      "objective": "Pakai Menyimpan dan Meminjam: Sepuluh satuan jadi satu puluhan; sebaliknya saat kurang. Latihan: Baca hasil bagi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Regrouping: Sepuluh satuan jadi satu puluhan; sebaliknya saat kurang.",
      "voiceGuide": "Menyimpan dan Meminjam. Sepuluh satuan jadi satu puluhan; sebaliknya saat kurang.",
      "diagramType": "div",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-d",
      "title": "Jodohkan Diagram Operasi",
      "bookReference": "hlm. 17–24",
      "objective": "Jodohkan.. Ingat Menyimpan dan Meminjam.",
      "mechanicDescription": "Tiga ronde. Gunakan Menyimpan dan Meminjam.",
      "voiceGuide": "Menyimpan dan Meminjam. Jodohkan.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-d",
      "title": "Memori Diagram Operasi",
      "bookReference": "hlm. 17–24",
      "objective": "Memori.. Ingat Menyimpan dan Meminjam.",
      "mechanicDescription": "Tiga ronde. Gunakan Menyimpan dan Meminjam.",
      "voiceGuide": "Menyimpan dan Meminjam. Balik kartu.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-d",
      "title": "Tabel Operasi",
      "bookReference": "hlm. 17–25",
      "objective": "Isi tabel.. Ingat Menyimpan dan Meminjam.",
      "mechanicDescription": "Tiga tabel. Gunakan Menyimpan dan Meminjam.",
      "voiceGuide": "Menyimpan dan Meminjam. Pilih.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-pd",
      "title": "Ketuk Semua Diagram D",
      "bookReference": "hlm. 17–24",
      "objective": "Ketuk semua.. Ingat Menyimpan dan Meminjam.",
      "mechanicDescription": "Tiga ronde. Gunakan Menyimpan dan Meminjam.",
      "voiceGuide": "Menyimpan dan Meminjam. Ketuk semua.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "choose-d",
      "title": "Pilih Kalimat Operasi",
      "bookReference": "hlm. 17–25",
      "objective": "Pilih pernyataan.. Ingat Menyimpan dan Meminjam.",
      "mechanicDescription": "Tiga ronde. Gunakan Menyimpan dan Meminjam.",
      "voiceGuide": "Menyimpan dan Meminjam. Pilih.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-d",
      "title": "Cerita Diagram Operasi",
      "bookReference": "hlm. 17–25",
      "objective": "Cerita + diagram.. Ingat Menyimpan dan Meminjam.",
      "mechanicDescription": "Tiga ronde. Gunakan Menyimpan dan Meminjam.",
      "voiceGuide": "Menyimpan dan Meminjam. Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-jumlah",
      "title": "Tulis Hasil Penjumlahan",
      "bookReference": "hlm. 17–19",
      "objective": "Pakai Perkiraan Dulu: Perkirakan hasil sebelum hitung tepat untuk mengecek. Latihan: Menulis jumlah..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Estimate First: Perkirakan hasil sebelum hitung tepat untuk mengecek.",
      "voiceGuide": "Perkiraan Dulu. Perkirakan hasil sebelum hitung tepat untuk mengecek.",
      "symbolLarge": "79.500",
      "wordLarge": "JUMLAH",
      "mathNotation": "+"
    },
    {
      "stage": "Abstract",
      "gameType": "write-sisa",
      "title": "Tulis Hasil Pengurangan",
      "bookReference": "hlm. 19–20",
      "objective": "Pakai Perkiraan Dulu: Perkirakan hasil sebelum hitung tepat untuk mengecek. Latihan: Menulis sisa..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Estimate First: Perkirakan hasil sebelum hitung tepat untuk mengecek.",
      "voiceGuide": "Perkiraan Dulu. Perkirakan hasil sebelum hitung tepat untuk mengecek.",
      "symbolLarge": "2.150",
      "wordLarge": "SISA",
      "mathNotation": "-"
    },
    {
      "stage": "Abstract",
      "gameType": "write-kali",
      "title": "Tulis Hasil Perkalian",
      "bookReference": "hlm. 21–23",
      "objective": "Pakai Perkiraan Dulu: Perkirakan hasil sebelum hitung tepat untuk mengecek. Latihan: Menulis hasil kali..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Estimate First: Perkirakan hasil sebelum hitung tepat untuk mengecek.",
      "voiceGuide": "Perkiraan Dulu. Perkirakan hasil sebelum hitung tepat untuk mengecek.",
      "symbolLarge": "60.000",
      "wordLarge": "KALI",
      "mathNotation": "x"
    },
    {
      "stage": "Abstract",
      "gameType": "write-bagi",
      "title": "Tulis Hasil Pembagian",
      "bookReference": "hlm. 22–23",
      "objective": "Pakai Perkiraan Dulu: Perkirakan hasil sebelum hitung tepat untuk mengecek. Latihan: Menulis hasil bagi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Estimate First: Perkirakan hasil sebelum hitung tepat untuk mengecek.",
      "voiceGuide": "Perkiraan Dulu. Perkirakan hasil sebelum hitung tepat untuk mengecek.",
      "symbolLarge": "16.000",
      "wordLarge": "BAGI",
      "mathNotation": ":"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-d",
      "title": "Jodohkan Notasi Operasi",
      "bookReference": "hlm. 17–24",
      "objective": "Jodohkan.. Ingat Perkiraan Dulu.",
      "mechanicDescription": "Tiga ronde. Gunakan Perkiraan Dulu.",
      "voiceGuide": "Perkiraan Dulu. Jodohkan.",
      "symbolLarge": "a+b",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-d",
      "title": "Memori Notasi Operasi",
      "bookReference": "hlm. 17–24",
      "objective": "Memori.. Ingat Perkiraan Dulu.",
      "mechanicDescription": "Tiga ronde. Gunakan Perkiraan Dulu.",
      "voiceGuide": "Perkiraan Dulu. Balik kartu.",
      "symbolLarge": "hasil",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-d",
      "title": "Benar atau Salah: Operasi",
      "bookReference": "hlm. 17–25",
      "objective": "Menilai.. Ingat Perkiraan Dulu.",
      "mechanicDescription": "Dua ronde. Gunakan Perkiraan Dulu.",
      "voiceGuide": "Perkiraan Dulu. Benar/salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-d",
      "title": "Detektif Operasi",
      "bookReference": "hlm. 17–25",
      "objective": "Petunjuk → hasil.. Ingat Perkiraan Dulu.",
      "mechanicDescription": "Tiga soal. Gunakan Perkiraan Dulu.",
      "voiceGuide": "Perkiraan Dulu. Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-d",
      "title": "Peta Konsep Operasi",
      "bookReference": "hlm. 17–25",
      "objective": "Mengisi kotak.. Ingat Perkiraan Dulu.",
      "mechanicDescription": "Satu peta. Gunakan Perkiraan Dulu.",
      "voiceGuide": "Perkiraan Dulu. Pilih opsi.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-d",
      "title": "Cerita Angka Operasi",
      "bookReference": "hlm. 17–25",
      "objective": "Soal cerita.. Ingat Perkiraan Dulu.",
      "mechanicDescription": "Tiga ronde. Gunakan Perkiraan Dulu.",
      "voiceGuide": "Perkiraan Dulu. Pilih.",
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
      "ikon": "🌍",
      "nama": "Algoritma Bersusun",
      "isi": "Jumlah/kurang dari kanan, simpan atau pinjam antar nilai tempat.",
      "suara": "Algoritma Bersusun. Jumlah/kurang dari kanan, simpan atau pinjam antar nilai tempat."
    },
    {
      "ikon": "🌍",
      "nama": "Menyimpan dan Meminjam",
      "isi": "Sepuluh satuan jadi satu puluhan; sebaliknya saat kurang.",
      "suara": "Menyimpan dan Meminjam. Sepuluh satuan jadi satu puluhan; sebaliknya saat kurang."
    },
    {
      "ikon": "🌍",
      "nama": "Perkiraan Dulu",
      "isi": "Perkirakan hasil sebelum hitung tepat untuk mengecek.",
      "suara": "Perkiraan Dulu. Perkirakan hasil sebelum hitung tepat untuk mengecek."
    }
  ],
  "poinSuara": "Ingat: Algoritma Bersusun, Menyimpan dan Meminjam, Perkiraan Dulu.",
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
  "rumah": "Ayo Mencoba di rumah: terapkan Algoritma Bersusun pada satu benda atau soal nyata, lalu ceritakan langkahmu.",
  "refleksi": [
    "Bagaimana Algoritma Bersusun membantumu memahami soal?",
    "Kapan kamu memakai Menyimpan dan Meminjam?",
    "Apa bedanya dengan hanya menghafal rumus atau langkah tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Standard Algorithm",
      "namaId": "Algoritma Bersusun",
      "asal": "Elementary algorithms",
      "ringkas": "Jumlah/kurang dari kanan, simpan atau pinjam antar nilai tempat.",
      "tahap": [
        "Story",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Regrouping",
      "namaId": "Menyimpan dan Meminjam",
      "asal": "Base-ten regrouping",
      "ringkas": "Sepuluh satuan jadi satu puluhan; sebaliknya saat kurang.",
      "tahap": [
        "Mind",
        "Picture",
        "Concrete"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Estimate First",
      "namaId": "Perkiraan Dulu",
      "asal": "Number sense",
      "ringkas": "Perkirakan hasil sebelum hitung tepat untuk mengecek.",
      "tahap": [
        "Infografis",
        "Abstract"
      ]
    }
  ]
};

export const SUB_BAB_K5B1: SubBabNaskah[] = [SUB_A51, SUB_B51, SUB_C51, SUB_D51];
export const semuaAdeganK5B1 = SUB_BAB_K5B1.flatMap((s) => s.videos.flatMap((v) => v.adegan));
