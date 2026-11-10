/**
 * Naskah — rewrite mendalam.
 * Metode luar dianyam ke Story, peta, infografis, poin, dan meta permainan.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K4B2_META = {
  "chapterId": "k4-mat-bab2",
  "phaseCode": "FASE_B",
  "grade": 4,
  "subjectLabel": "MATEMATIKA - KELAS 4 SD",
  "title": "BAB 2: PECAHAN",
  "silabusElemen": "🌈 Fase B • Elemen Bilangan: Pecahan (Pembilang Satu, Penyebut Sama, Senilai, Desimal Persepuluhan–Perseratusan, dan Persen) (Kelas 4 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A42: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Pecahan Pembilang Satu)",
  "fullTitle": "Sub-Bab A: Pecahan dengan Pembilang Satu",
  "targetDescription": "Siswa menyatakan pecahan dengan pembilang satu (1/n) dari daerah arsir, membandingkan dan mengurutkan pecahan unit (1/2 > 1/4, 1/10 < 1/5), serta menyelesaikan cerita pizza dan perbandingan berat Tiara. Siswa memakai cara Pecahan Satuan, Model Daerah, Pecahan di Garis.",
  "secondaryBg": "#FEF3C7",
  "secondaryBorder": "#D97706",
  "secondaryText": "#78350F",
  "silabus": {
    "teksSuara": "Kita belajar pecahan dengan pembilang satu. Pizza dipotong empat sama besar, tiap anak mendapat seperempat. Makin besar penyebut, makin kecil pecahan unit. Kita memakai cara dari luar buku: Pecahan Satuan (Unit Fraction); Model Daerah (Area Model); Pecahan di Garis (Number Line Unit). Pembilang 1 berarti satu bagian dari penyebut bagian sama. Arsir satu bagian dari keseluruhan. 1/n terletak antara 0 dan 1. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa membandingkan dan mengurutkan pecahan dengan pembilang satu.",
    "referensi": "Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 2 Sub-Bab A)."
  },
  "videos": [
    {
      "id": "K4B2A-V1",
      "judul": "Pizza Ibu Guru",
      "subjudul": "Unit Fraction",
      "adegan": [
        {
          "id": "K4B2A-V1-1",
          "judul": "Potong pizza",
          "ketukan": [
            "Bayangkan situasi nyata di kelas atau di rumah. Ibu Guru membawa sebuah pizza. Mari kita pahami bersama.",
            "Pizza dipotong menjadi 4 bagian sama besar. Mari kita pahami bersama.",
            "Empat siswa mendapat nilai tertinggi. Mari kita pahami bersama.",
            "Ingat cara Pecahan Satuan: Pembilang 1 berarti satu bagian dari penyebut bagian sama."
          ],
          "papan": [
            "pizza",
            "4 potong",
            "4 siswa",
            "berapa?"
          ]
        },
        {
          "id": "K4B2A-V1-2",
          "judul": "Seperempat",
          "ketukan": [
            "Tiap anak mendapat 1 dari 4 bagian. Mari kita pahami bersama.",
            "Ditulis pecahan satu per empat. Mari kita pahami bersama.",
            "Pembilang 1, penyebut 4. Mari kita pahami bersama.",
            "Di sini kita memakai ide Unit Fraction — Pembilang 1 berarti satu bagian dari penyebut bagian sama."
          ],
          "papan": [
            "1 dari 4",
            "1/4",
            "pembilang 1",
            "penyebut 4"
          ]
        },
        {
          "id": "K4B2A-V1-3",
          "judul": "Baca gambar",
          "ketukan": [
            "Lihat daerah yang diarsir. Mari kita pahami bersama.",
            "Hitung seluruh bagian sama besar. Mari kita pahami bersama.",
            "Hitung bagian yang diarsir. Mari kita pahami bersama.",
            "METODE LUAR · Pecahan Satuan: Pembilang 1 berarti satu bagian dari penyebut bagian sama."
          ],
          "papan": [
            "arsir",
            "seluruh",
            "diarsir",
            "pecahan"
          ]
        }
      ]
    },
    {
      "id": "K4B2A-V2",
      "judul": "Latihan: Model Daerah",
      "subjudul": "Area Model",
      "adegan": [
        {
          "id": "K4B2A-V2-1",
          "judul": "Dua gambar",
          "ketukan": [
            "Lihat dua daerah arsir. Mari kita pahami bersama.",
            "Satu menunjukkan setengah. Mari kita pahami bersama.",
            "Satu menunjukkan seperempat. Mari kita pahami bersama.",
            "Ingat cara Model Daerah: Arsir satu bagian dari keseluruhan."
          ],
          "papan": [
            "dua gambar",
            "1/2",
            "1/4",
            "mana?"
          ]
        },
        {
          "id": "K4B2A-V2-2",
          "judul": "Kesimpulan",
          "ketukan": [
            "Daerah arsir 1/2 lebih besar. Mari kita pahami bersama.",
            "Jadi 1/2 lebih dari 1/4. Mari kita pahami bersama.",
            "Ditulis 1/2 > 1/4. Mari kita pahami bersama.",
            "Di sini kita memakai ide Area Model — Arsir satu bagian dari keseluruhan."
          ],
          "papan": [
            "1/2 besar",
            "1/2 > 1/4",
            "aturan",
            "model"
          ]
        },
        {
          "id": "K4B2A-V2-3",
          "judul": "1/10 dan 1/5",
          "ketukan": [
            "Sekarang 1/10 dan 1/5. Mari kita pahami bersama.",
            "Daerah 1/10 lebih kecil. Mari kita pahami bersama.",
            "Jadi 1/10 kurang dari 1/5. Mari kita pahami bersama.",
            "METODE LUAR · Model Daerah: Arsir satu bagian dari keseluruhan."
          ],
          "papan": [
            "1/10",
            "1/5",
            "1/10 < 1/5",
            "model"
          ]
        }
      ]
    },
    {
      "id": "K4B2A-V3",
      "judul": "Siap pakai Number Line Unit",
      "subjudul": "Number Line Unit",
      "adegan": [
        {
          "id": "K4B2A-V3-1",
          "judul": "Dua bahan",
          "ketukan": [
            "Tiara punya bawang putih 1/2 kg. Mari kita pahami bersama.",
            "Gula pasirnya 1/4 kg. Mari kita pahami bersama.",
            "Mana yang lebih berat. Mari kita pahami bersama.",
            "Ingat cara Pecahan di Garis: 1/n terletak antara 0 dan 1."
          ],
          "papan": [
            "bawang 1/2",
            "gula 1/4",
            "mana?",
            "banding"
          ]
        },
        {
          "id": "K4B2A-V3-2",
          "judul": "Jawaban",
          "ketukan": [
            "1/2 lebih dari 1/4. Mari kita pahami bersama.",
            "Bawang lebih berat. Mari kita pahami bersama.",
            "Pecahan unit membantu cerita. Mari kita pahami bersama.",
            "Di sini kita memakai ide Number Line Unit — 1/n terletak antara 0 dan 1."
          ],
          "papan": [
            "1/2 > 1/4",
            "bawang",
            "cerita",
            "latihan"
          ]
        },
        {
          "id": "K4B2A-V3-3",
          "judul": "Ingat aturan",
          "ketukan": [
            "Pembilang tetap satu. Mari kita pahami bersama.",
            "Penyebut menyatakan banyak bagian. Mari kita pahami bersama.",
            "Semakin banyak bagian, tiap bagian semakin kecil. Mari kita pahami bersama.",
            "METODE LUAR · Pecahan di Garis: 1/n terletak antara 0 dan 1."
          ],
          "papan": [
            "pembilang 1",
            "penyebut",
            "bagian kecil",
            "siap B"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Pecahan dengan Pembilang Satu. Apa yang ditanyakan?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Unit Fraction",
      "stepDesc": "Pembilang 1 berarti satu bagian dari penyebut bagian sama.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Area Model",
      "stepDesc": "Arsir satu bagian dari keseluruhan.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Number Line Unit",
      "stepDesc": "1/n terletak antara 0 dan 1.",
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
      "judul": "1/n",
      "emoji": "🍕",
      "countNum": 1,
      "countWord": "unit",
      "suara": "Pecahan pembilang satu."
    },
    {
      "judul": "1/4",
      "emoji": "🍕",
      "countNum": 4,
      "countWord": "pizza",
      "suara": "Pizza 4 potong."
    },
    {
      "judul": "PEMBILANG",
      "emoji": "⬆️",
      "countNum": 1,
      "countWord": "atas",
      "suara": "Bagian diambil."
    },
    {
      "judul": "PENYEBUT",
      "emoji": "⬇️",
      "countNum": 4,
      "countWord": "bawah",
      "suara": "Bagian seluruh."
    },
    {
      "judul": "1/2 > 1/4",
      "emoji": "⚖️",
      "countNum": 2,
      "countWord": "banding",
      "suara": "Setengah lebih besar."
    },
    {
      "judul": "1/10 < 1/5",
      "emoji": "📉",
      "countNum": 10,
      "countWord": "kecil",
      "suara": "Penyebut besar."
    },
    {
      "judul": "ARSIR",
      "emoji": "🖍️",
      "countNum": 1,
      "countWord": "gambar",
      "suara": "Baca daerah arsir."
    },
    {
      "judul": "ATURAN",
      "emoji": "📜",
      "countNum": 1,
      "countWord": "unit",
      "suara": "n besar → 1/n kecil."
    },
    {
      "judul": "CERITA",
      "emoji": "📖",
      "countNum": 2,
      "countWord": "Tiara",
      "suara": "Bawang 1/2 kg."
    },
    {
      "judul": "SIAP B",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "lanjut",
      "suara": "Penyebut sama."
    },
    {
      "judul": "Pecahan Satuan",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "ingat",
      "suara": "Pembilang 1 berarti satu bagian dari penyebut bagian sama."
    },
    {
      "judul": "Model Daerah",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "ingat",
      "suara": "Arsir satu bagian dari keseluruhan."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "pizza-bagi",
      "title": "Potong Pizza Sama Besar",
      "bookReference": "hlm. 58–59 (pizza 1/4)",
      "objective": "Pakai Pecahan Satuan: Pembilang 1 berarti satu bagian dari penyebut bagian sama. Latihan: Mengenal 1 dari n bagian..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Unit Fraction: Pembilang 1 berarti satu bagian dari penyebut bagian sama.",
      "voiceGuide": "Pecahan Satuan. Pembilang 1 berarti satu bagian dari penyebut bagian sama.",
      "emoji": "🍕",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "baca-arsir",
      "title": "Baca Daerah Arsir",
      "bookReference": "hlm. 59–60",
      "objective": "Pakai Pecahan Satuan: Pembilang 1 berarti satu bagian dari penyebut bagian sama. Latihan: Menulis pecahan dari gambar..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Unit Fraction: Pembilang 1 berarti satu bagian dari penyebut bagian sama.",
      "voiceGuide": "Pecahan Satuan. Pembilang 1 berarti satu bagian dari penyebut bagian sama.",
      "emoji": "🖍️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "banding-unit",
      "title": "Bandingkan Unit Fraction",
      "bookReference": "hlm. 60–61 (1/2 vs 1/4)",
      "objective": "Pakai Pecahan Satuan: Pembilang 1 berarti satu bagian dari penyebut bagian sama. Latihan: Membandingkan pecahan pembilang satu..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Unit Fraction: Pembilang 1 berarti satu bagian dari penyebut bagian sama.",
      "voiceGuide": "Pecahan Satuan. Pembilang 1 berarti satu bagian dari penyebut bagian sama.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-unit",
      "title": "Pilah: Lebih Besar/Kecil dari Acuan",
      "bookReference": "hlm. 61–62",
      "objective": "Pakai Pecahan Satuan: Pembilang 1 berarti satu bagian dari penyebut bagian sama. Latihan: Memilah menurut nilai..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Unit Fraction: Pembilang 1 berarti satu bagian dari penyebut bagian sama.",
      "voiceGuide": "Pecahan Satuan. Pembilang 1 berarti satu bagian dari penyebut bagian sama.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-unit",
      "title": "Jodohkan Gambar dan 1/n",
      "bookReference": "hlm. 59–60",
      "objective": "Menjodohkan.. Ingat Pecahan Satuan.",
      "mechanicDescription": "Tiga ronde. Gunakan Pecahan Satuan.",
      "voiceGuide": "Pecahan Satuan. Jodohkan.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "memory-unit",
      "title": "Memori Pecahan Unit",
      "bookReference": "hlm. 59–61",
      "objective": "Memori.. Ingat Pecahan Satuan.",
      "mechanicDescription": "Tiga ronde. Gunakan Pecahan Satuan.",
      "voiceGuide": "Pecahan Satuan. Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-unit",
      "title": "Ketuk Pecahan yang Diminta",
      "bookReference": "hlm. 60–62",
      "objective": "Mengetuk.. Ingat Pecahan Satuan.",
      "mechanicDescription": "Tiga ronde. Gunakan Pecahan Satuan.",
      "voiceGuide": "Pecahan Satuan. Ketuk.",
      "emoji": "👆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-unit",
      "title": "Ketuk Semua Lebih Besar/Kecil",
      "bookReference": "hlm. 61",
      "objective": "Ketuk semua sesuai syarat.. Ingat Pecahan Satuan.",
      "mechanicDescription": "Tiga ronde. Gunakan Pecahan Satuan.",
      "voiceGuide": "Pecahan Satuan. Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-unit",
      "title": "Cerita Pizza dan Tiara",
      "bookReference": "hlm. 58 & 63",
      "objective": "Soal cerita.. Ingat Pecahan Satuan.",
      "mechanicDescription": "Tiga ronde. Gunakan Pecahan Satuan.",
      "voiceGuide": "Pecahan Satuan. Pilih jawaban.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-unit",
      "title": "Urutkan Pecahan Unit",
      "bookReference": "hlm. 61–62",
      "objective": "Mengurutkan.. Ingat Pecahan Satuan.",
      "mechanicDescription": "Tiga ronde. Gunakan Pecahan Satuan.",
      "voiceGuide": "Pecahan Satuan. Urutkan.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "circle-read",
      "title": "Baca Lingkaran Arsir",
      "bookReference": "hlm. 59–60",
      "objective": "Pakai Model Daerah: Arsir satu bagian dari keseluruhan. Latihan: Membaca diagram lingkaran..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Area Model: Arsir satu bagian dari keseluruhan.",
      "voiceGuide": "Model Daerah. Arsir satu bagian dari keseluruhan.",
      "diagramType": "circle",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "bar-compare",
      "title": "Banding Batang Unit",
      "bookReference": "hlm. 60–61",
      "objective": "Pakai Model Daerah: Arsir satu bagian dari keseluruhan. Latihan: Membandingkan batang..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Area Model: Arsir satu bagian dari keseluruhan.",
      "voiceGuide": "Model Daerah. Arsir satu bagian dari keseluruhan.",
      "diagramType": "bar",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram",
      "title": "Jodohkan Diagram Unit",
      "bookReference": "hlm. 59–61",
      "objective": "Pakai Model Daerah: Arsir satu bagian dari keseluruhan. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Area Model: Arsir satu bagian dari keseluruhan.",
      "voiceGuide": "Model Daerah. Arsir satu bagian dari keseluruhan.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram",
      "title": "Memori Diagram Unit",
      "bookReference": "hlm. 60",
      "objective": "Pakai Model Daerah: Arsir satu bagian dari keseluruhan. Latihan: Memori..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Area Model: Arsir satu bagian dari keseluruhan.",
      "voiceGuide": "Model Daerah. Arsir satu bagian dari keseluruhan.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-unit",
      "title": "Tabel Gambar → Pecahan",
      "bookReference": "hlm. 59–60",
      "objective": "Isi tabel.. Ingat Model Daerah.",
      "mechanicDescription": "Tiga tabel. Gunakan Model Daerah.",
      "voiceGuide": "Model Daerah. Pilih teks.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-diagram",
      "title": "Ketuk Semua Syarat Diagram",
      "bookReference": "hlm. 61",
      "objective": "Ketuk semua.. Ingat Model Daerah.",
      "mechanicDescription": "Tiga ronde. Gunakan Model Daerah.",
      "voiceGuide": "Model Daerah. Ketuk semua.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram",
      "title": "Pilah Diagram Unit",
      "bookReference": "hlm. 61–62",
      "objective": "Pilah.. Ingat Model Daerah.",
      "mechanicDescription": "Tiga ronde. Gunakan Model Daerah.",
      "voiceGuide": "Model Daerah. Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "denom-effect",
      "title": "Pengaruh Penyebut",
      "bookReference": "hlm. 61",
      "objective": "Penyebut besar → nilai kecil.. Ingat Model Daerah.",
      "mechanicDescription": "Tiga ronde. Gunakan Model Daerah.",
      "voiceGuide": "Model Daerah. Pilih.",
      "diagramType": "denom",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "shade-choose",
      "title": "Pilih Gambar yang Cocok",
      "bookReference": "hlm. 59–60",
      "objective": "Pilih diagram benar.. Ingat Model Daerah.",
      "mechanicDescription": "Tiga ronde. Gunakan Model Daerah.",
      "voiceGuide": "Model Daerah. Pilih.",
      "diagramType": "shade",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture",
      "title": "Cerita dengan Diagram",
      "bookReference": "hlm. 58–63",
      "objective": "Cerita + gambar.. Ingat Model Daerah.",
      "mechanicDescription": "Tiga ronde. Gunakan Model Daerah.",
      "voiceGuide": "Model Daerah. Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-unit",
      "title": "Tulis 1/n",
      "bookReference": "hlm. 59",
      "objective": "Pakai Pecahan di Garis: 1/n terletak antara 0 dan 1. Latihan: Menulis notasi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Number Line Unit: 1/n terletak antara 0 dan 1.",
      "voiceGuide": "Pecahan di Garis. 1/n terletak antara 0 dan 1.",
      "symbolLarge": "1/4",
      "wordLarge": "UNIT",
      "mathNotation": "1/n"
    },
    {
      "stage": "Abstract",
      "gameType": "compare-sign",
      "title": "Isi > atau <",
      "bookReference": "hlm. 62",
      "objective": "Pakai Pecahan di Garis: 1/n terletak antara 0 dan 1. Latihan: Mengisi tanda..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Number Line Unit: 1/n terletak antara 0 dan 1.",
      "voiceGuide": "Pecahan di Garis. 1/n terletak antara 0 dan 1.",
      "symbolLarge": ">",
      "wordLarge": "BANDING",
      "mathNotation": "1/a ? 1/b"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-unit",
      "title": "Pilih Pecahan Unit",
      "bookReference": "hlm. 59–62",
      "objective": "Pakai Pecahan di Garis: 1/n terletak antara 0 dan 1. Latihan: Memilih..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Number Line Unit: 1/n terletak antara 0 dan 1.",
      "voiceGuide": "Pecahan di Garis. 1/n terletak antara 0 dan 1.",
      "symbolLarge": "1/2",
      "wordLarge": "PILIH",
      "mathNotation": "1/n"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract",
      "title": "Urutkan Notasi Unit",
      "bookReference": "hlm. 61–62",
      "objective": "Pakai Pecahan di Garis: 1/n terletak antara 0 dan 1. Latihan: Mengurutkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Number Line Unit: 1/n terletak antara 0 dan 1.",
      "voiceGuide": "Pecahan di Garis. 1/n terletak antara 0 dan 1.",
      "symbolLarge": "1/2>1/4",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract",
      "title": "Jodohkan Teks Unit",
      "bookReference": "hlm. 59–61",
      "objective": "Jodohkan.. Ingat Pecahan di Garis.",
      "mechanicDescription": "Tiga ronde. Gunakan Pecahan di Garis.",
      "voiceGuide": "Pecahan di Garis. Jodohkan.",
      "symbolLarge": "1/5",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract",
      "title": "Memori Notasi Unit",
      "bookReference": "hlm. 60",
      "objective": "Memori.. Ingat Pecahan di Garis.",
      "mechanicDescription": "Tiga ronde. Gunakan Pecahan di Garis.",
      "voiceGuide": "Pecahan di Garis. Balik kartu.",
      "symbolLarge": "1/8",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-a",
      "title": "Benar atau Salah: Unit",
      "bookReference": "hlm. 57–62",
      "objective": "Menilai.. Ingat Pecahan di Garis.",
      "mechanicDescription": "Dua ronde. Gunakan Pecahan di Garis.",
      "voiceGuide": "Pecahan di Garis. Benar/salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-a",
      "title": "Detektif Pembilang Satu",
      "bookReference": "hlm. 58–63",
      "objective": "Petunjuk → pecahan.. Ingat Pecahan di Garis.",
      "mechanicDescription": "Empat soal. Gunakan Pecahan di Garis.",
      "voiceGuide": "Pecahan di Garis. Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-a",
      "title": "Peta Konsep Unit",
      "bookReference": "hlm. 57–61",
      "objective": "Mengisi kotak.. Ingat Pecahan di Garis.",
      "mechanicDescription": "Satu peta. Gunakan Pecahan di Garis.",
      "voiceGuide": "Pecahan di Garis. Pilih opsi.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract",
      "title": "Cerita Angka Unit",
      "bookReference": "hlm. 58–63",
      "objective": "Soal cerita.. Ingat Pecahan di Garis.",
      "mechanicDescription": "Tiga ronde. Gunakan Pecahan di Garis.",
      "voiceGuide": "Pecahan di Garis. Pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "🍕",
      "nama": "Unit",
      "isi": "Pecahan pembilang satu berbentuk 1/n.",
      "suara": "Pembilang satu berarti satu bagian."
    },
    {
      "ikon": "➗",
      "nama": "Arsir",
      "isi": "Baca pecahan dari daerah yang diarsir.",
      "suara": "Hitung bagian diarsir per seluruh."
    },
    {
      "ikon": "🌍",
      "nama": "Pecahan Satuan",
      "isi": "Pembilang 1 berarti satu bagian dari penyebut bagian sama.",
      "suara": "Pecahan Satuan. Pembilang 1 berarti satu bagian dari penyebut bagian sama."
    },
    {
      "ikon": "🌍",
      "nama": "Model Daerah",
      "isi": "Arsir satu bagian dari keseluruhan.",
      "suara": "Model Daerah. Arsir satu bagian dari keseluruhan."
    },
    {
      "ikon": "🌍",
      "nama": "Pecahan di Garis",
      "isi": "1/n terletak antara 0 dan 1.",
      "suara": "Pecahan di Garis. 1/n terletak antara 0 dan 1."
    }
  ],
  "poinSuara": "Ingat: Pecahan Satuan, Model Daerah, Pecahan di Garis.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Unit",
        "warna": "#FDE68A"
      },
      {
        "teks": "Arsir",
        "warna": "#BBF7D0"
      },
      {
        "teks": "Banding",
        "warna": "#BFDBFE"
      },
      {
        "teks": "Cerita",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: terapkan Pecahan Satuan pada satu benda atau soal nyata, lalu ceritakan langkahmu.",
  "refleksi": [
    "Bagaimana Pecahan Satuan membantumu memahami soal?",
    "Kapan kamu memakai Model Daerah?",
    "Apa bedanya dengan hanya menghafal rumus atau langkah tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Unit Fraction",
      "namaId": "Pecahan Satuan",
      "asal": "Van de Walle",
      "ringkas": "Pembilang 1 berarti satu bagian dari penyebut bagian sama.",
      "tahap": [
        "Story",
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Area Model",
      "namaId": "Model Daerah",
      "asal": "Fraction area model",
      "ringkas": "Arsir satu bagian dari keseluruhan.",
      "tahap": [
        "Infografis",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Number Line Unit",
      "namaId": "Pecahan di Garis",
      "asal": "Number line fractions",
      "ringkas": "1/n terletak antara 0 dan 1.",
      "tahap": [
        "Mind",
        "Abstract"
      ]
    }
  ]
};

export const SUB_B42: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Penyebut Sama)",
  "fullTitle": "Sub-Bab B: Pecahan dengan Penyebut Sama",
  "targetDescription": "Siswa membandingkan dan mengurutkan pecahan berpenyebut sama dengan melihat pembilang (1/3 < 2/3, 2/10 > 1/10), serta menyelesaikan cerita tongkat Asep 3/6 dan Azizah 2/6. Siswa memakai cara Penyebut Sama, Banding Pembilang, Batang Pecahan.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Kita belajar pecahan dengan penyebut sama. Jika penyebut sama, bandingkan pembilangnya. Satu per tiga kurang dari dua per tiga. Kita memakai cara dari luar buku: Penyebut Sama (Same Denominator); Banding Pembilang (Compare Numerators); Batang Pecahan (Fraction Bars). Banding/jumlah lebih mudah jika penyebut sama. Penyebut sama: pembilang lebih besar = pecahan lebih besar. Batang sama panjang memudahkan banding. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa membandingkan dan mengurutkan pecahan dengan penyebut sama.",
    "referensi": "Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 2 Sub-Bab B)."
  },
  "videos": [
    {
      "id": "K4B2B-V1",
      "judul": "1/3 dan 2/3",
      "subjudul": "Same Denominator",
      "adegan": [
        {
          "id": "K4B2B-V1-1",
          "judul": "Dua arsir",
          "ketukan": [
            "Bayangkan situasi nyata di kelas atau di rumah. Lihat dua daerah arsir. Mari kita pahami bersama.",
            "Keduanya dibagi tiga sama besar. Mari kita pahami bersama.",
            "Satu mengarsir 1 bagian. Mari kita pahami bersama.",
            "Ingat cara Penyebut Sama: Banding/jumlah lebih mudah jika penyebut sama."
          ],
          "papan": [
            "bagi 3",
            "1 bagian",
            "2 bagian",
            "banding"
          ]
        },
        {
          "id": "K4B2B-V1-2",
          "judul": "Kesimpulan",
          "ketukan": [
            "Daerah 1/3 lebih kecil. Mari kita pahami bersama.",
            "Jadi 1/3 kurang dari 2/3. Mari kita pahami bersama.",
            "Ditulis 1/3 < 2/3. Mari kita pahami bersama.",
            "Di sini kita memakai ide Same Denominator — Banding/jumlah lebih mudah jika penyebut sama."
          ],
          "papan": [
            "1/3 kecil",
            "1/3 < 2/3",
            "pembilang",
            "penyebut"
          ]
        },
        {
          "id": "K4B2B-V1-3",
          "judul": "2/10 dan 1/10",
          "ketukan": [
            "Sekarang penyebut 10. Mari kita pahami bersama.",
            "2 bagian dibanding 1 bagian. Mari kita pahami bersama.",
            "2/10 lebih dari 1/10. Mari kita pahami bersama.",
            "METODE LUAR · Penyebut Sama: Banding/jumlah lebih mudah jika penyebut sama."
          ],
          "papan": [
            "penyebut 10",
            "2 vs 1",
            "aturan",
            "penyebut"
          ]
        }
      ]
    },
    {
      "id": "K4B2B-V2",
      "judul": "Latihan: Banding Pembilang",
      "subjudul": "Compare Numerators",
      "adegan": [
        {
          "id": "K4B2B-V2-1",
          "judul": "Dua tongkat",
          "ketukan": [
            "Asep punya tongkat 3/6 meter. Mari kita pahami bersama.",
            "Azizah punya 2/6 meter. Mari kita pahami bersama.",
            "Penyebut sama: per enam. Mari kita pahami bersama.",
            "Ingat cara Banding Pembilang: Penyebut sama: pembilang lebih besar = pecahan lebih besar."
          ],
          "papan": [
            "3/6",
            "2/6",
            "sama penyebut",
            "siapa?"
          ]
        },
        {
          "id": "K4B2B-V2-2",
          "judul": "Jawaban",
          "ketukan": [
            "3 lebih besar dari 2. Mari kita pahami bersama.",
            "Tongkat Asep lebih panjang. Mari kita pahami bersama.",
            "3/6 > 2/6. Mari kita pahami bersama.",
            "Di sini kita memakai ide Compare Numerators — Penyebut sama: pembilang lebih besar = pecahan lebih besar."
          ],
          "papan": [
            "3 > 2",
            "Asep",
            "cerita",
            "banding"
          ]
        },
        {
          "id": "K4B2B-V2-3",
          "judul": "Latihan tanda",
          "ketukan": [
            "Isi titik-titik dengan > atau <. Mari kita pahami bersama.",
            "Pastikan penyebut sama dulu. Mari kita pahami bersama.",
            "Lalu bandingkan pembilang. Mari kita pahami bersama.",
            "METODE LUAR · Banding Pembilang: Penyebut sama: pembilang lebih besar = pecahan lebih besar."
          ],
          "papan": [
            "> atau <",
            "cek penyebut",
            "cek pembilang",
            "teliti"
          ]
        }
      ]
    },
    {
      "id": "K4B2B-V3",
      "judul": "Siap pakai Fraction Bars",
      "subjudul": "Fraction Bars",
      "adegan": [
        {
          "id": "K4B2B-V3-1",
          "judul": "Satu keluarga",
          "ketukan": [
            "Kumpulkan pecahan berpenyebut sama. Mari kita pahami bersama.",
            "Misal penyebut 5. Mari kita pahami bersama.",
            "1/5, 2/5, 3/5, 4/5. Mari kita pahami bersama.",
            "Ingat cara Batang Pecahan: Batang sama panjang memudahkan banding."
          ],
          "papan": [
            "penyebut 5",
            "1/5…4/5",
            "urut",
            "kecil→besar"
          ]
        },
        {
          "id": "K4B2B-V3-2",
          "judul": "Cara cepat",
          "ketukan": [
            "Cukup urutkan pembilangnya. Mari kita pahami bersama.",
            "1, lalu 2, lalu 3, lalu 4. Mari kita pahami bersama.",
            "Nilai pecahan ikut membesar. Mari kita pahami bersama.",
            "Di sini kita memakai ide Fraction Bars — Batang sama panjang memudahkan banding."
          ],
          "papan": [
            "urut pembilang",
            "1-2-3-4",
            "nilai naik",
            "cepat"
          ]
        },
        {
          "id": "K4B2B-V3-3",
          "judul": "Siap C",
          "ketukan": [
            "Kadang bentuk berbeda tapi nilai sama. Mari kita pahami bersama.",
            "Itu namanya pecahan senilai. Mari kita pahami bersama.",
            "Contoh 2/6 dan 1/3. Mari kita pahami bersama.",
            "METODE LUAR · Batang Pecahan: Batang sama panjang memudahkan banding."
          ],
          "papan": [
            "bentuk beda",
            "nilai sama",
            "2/6=1/3",
            "siap C"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Pecahan dengan Penyebut Sama. Apa yang ditanyakan?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Same Denominator",
      "stepDesc": "Banding/jumlah lebih mudah jika penyebut sama.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Compare Numerators",
      "stepDesc": "Penyebut sama: pembilang lebih besar = pecahan lebih besar.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Fraction Bars",
      "stepDesc": "Batang sama panjang memudahkan banding.",
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
      "judul": "q SAMA",
      "emoji": "🧱",
      "countNum": 3,
      "countWord": "potongan",
      "suara": "Ukuran bagian sama."
    },
    {
      "judul": "LIHAT p",
      "emoji": "⬆️",
      "countNum": 2,
      "countWord": "pembilang",
      "suara": "Banding pembilang."
    },
    {
      "judul": "1/3 < 2/3",
      "emoji": "⚖️",
      "countNum": 3,
      "countWord": "contoh",
      "suara": "Contoh buku."
    },
    {
      "judul": "2/10 > 1/10",
      "emoji": "✅",
      "countNum": 10,
      "countWord": "contoh",
      "suara": "Pembilang 2 > 1."
    },
    {
      "judul": "TANDA",
      "emoji": "✏️",
      "countNum": 1,
      "countWord": "> <",
      "suara": "Isi titik-titik."
    },
    {
      "judul": "ASEP",
      "emoji": "📏",
      "countNum": 6,
      "countWord": "3/6",
      "suara": "Tongkat lebih panjang."
    },
    {
      "judul": "URUT",
      "emoji": "📶",
      "countNum": 5,
      "countWord": "1→4",
      "suara": "Urut pembilang."
    },
    {
      "judul": "ATURAN",
      "emoji": "📜",
      "countNum": 1,
      "countWord": "sama q",
      "suara": "Jangan bandingkan q."
    },
    {
      "judul": "ARSIR",
      "emoji": "🖍️",
      "countNum": 2,
      "countWord": "gambar",
      "suara": "Banyak bagian diarsir."
    },
    {
      "judul": "SIAP C",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "lanjut",
      "suara": "Pecahan senilai."
    },
    {
      "judul": "Penyebut Sama",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "ingat",
      "suara": "Banding/jumlah lebih mudah jika penyebut sama."
    },
    {
      "judul": "Banding Pembilang",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "ingat",
      "suara": "Penyebut sama: pembilang lebih besar = pecahan lebih besar."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "baca-sama",
      "title": "Baca Pecahan Penyebut Sama",
      "bookReference": "hlm. 63–64",
      "objective": "Pakai Penyebut Sama: Banding/jumlah lebih mudah jika penyebut sama. Latihan: Membaca p/q..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Same Denominator: Banding/jumlah lebih mudah jika penyebut sama.",
      "voiceGuide": "Penyebut Sama. Banding/jumlah lebih mudah jika penyebut sama.",
      "emoji": "🧱",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "banding-sama",
      "title": "Bandingkan Penyebut Sama",
      "bookReference": "hlm. 63–64 (1/3 vs 2/3)",
      "objective": "Pakai Penyebut Sama: Banding/jumlah lebih mudah jika penyebut sama. Latihan: Membandingkan pembilang..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Same Denominator: Banding/jumlah lebih mudah jika penyebut sama.",
      "voiceGuide": "Penyebut Sama. Banding/jumlah lebih mudah jika penyebut sama.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-sama",
      "title": "Pilah menurut Pembilang",
      "bookReference": "hlm. 64–65",
      "objective": "Pakai Penyebut Sama: Banding/jumlah lebih mudah jika penyebut sama. Latihan: Memilah..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Same Denominator: Banding/jumlah lebih mudah jika penyebut sama.",
      "voiceGuide": "Penyebut Sama. Banding/jumlah lebih mudah jika penyebut sama.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-sama",
      "title": "Jodohkan Gambar dan p/q",
      "bookReference": "hlm. 63–65",
      "objective": "Pakai Penyebut Sama: Banding/jumlah lebih mudah jika penyebut sama. Latihan: Menjodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Same Denominator: Banding/jumlah lebih mudah jika penyebut sama.",
      "voiceGuide": "Penyebut Sama. Banding/jumlah lebih mudah jika penyebut sama.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "memory-sama",
      "title": "Memori Penyebut Sama",
      "bookReference": "hlm. 64",
      "objective": "Memori.. Ingat Penyebut Sama.",
      "mechanicDescription": "Tiga ronde. Gunakan Penyebut Sama.",
      "voiceGuide": "Penyebut Sama. Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-sama",
      "title": "Ketuk Pecahan Diminta",
      "bookReference": "hlm. 64–65",
      "objective": "Mengetuk.. Ingat Penyebut Sama.",
      "mechanicDescription": "Tiga ronde. Gunakan Penyebut Sama.",
      "voiceGuide": "Penyebut Sama. Ketuk.",
      "emoji": "👆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-sama",
      "title": "Ketuk Semua Pembilang ≥",
      "bookReference": "hlm. 65",
      "objective": "Ketuk semua.. Ingat Penyebut Sama.",
      "mechanicDescription": "Tiga ronde. Gunakan Penyebut Sama.",
      "voiceGuide": "Penyebut Sama. Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-sama",
      "title": "Cerita Tongkat Asep",
      "bookReference": "hlm. 65",
      "objective": "Soal cerita.. Ingat Penyebut Sama.",
      "mechanicDescription": "Tiga ronde. Gunakan Penyebut Sama.",
      "voiceGuide": "Penyebut Sama. Pilih.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sign-sama",
      "title": "Isi Tanda > <",
      "bookReference": "hlm. 64–65",
      "objective": "Mengisi tanda.. Ingat Penyebut Sama.",
      "mechanicDescription": "Tiga ronde. Gunakan Penyebut Sama.",
      "voiceGuide": "Penyebut Sama. Pilih tanda.",
      "emoji": "✏️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-sama",
      "title": "Urutkan Penyebut Sama",
      "bookReference": "hlm. 65",
      "objective": "Mengurutkan.. Ingat Penyebut Sama.",
      "mechanicDescription": "Tiga ronde. Gunakan Penyebut Sama.",
      "voiceGuide": "Penyebut Sama. Urutkan.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "bar-sama",
      "title": "Batang Penyebut Sama",
      "bookReference": "hlm. 63–64",
      "objective": "Pakai Banding Pembilang: Penyebut sama: pembilang lebih besar = pecahan lebih besar. Latihan: Membaca batang..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Compare Numerators: Penyebut sama: pembilang lebih besar = pecahan lebih besar.",
      "voiceGuide": "Banding Pembilang. Penyebut sama: pembilang lebih besar = pecahan lebih besar.",
      "diagramType": "bar",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "circle-sama",
      "title": "Lingkaran Penyebut Sama",
      "bookReference": "hlm. 63",
      "objective": "Pakai Banding Pembilang: Penyebut sama: pembilang lebih besar = pecahan lebih besar. Latihan: Membaca lingkaran..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Compare Numerators: Penyebut sama: pembilang lebih besar = pecahan lebih besar.",
      "voiceGuide": "Banding Pembilang. Penyebut sama: pembilang lebih besar = pecahan lebih besar.",
      "diagramType": "circle",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-b",
      "title": "Jodohkan Diagram B",
      "bookReference": "hlm. 64",
      "objective": "Pakai Banding Pembilang: Penyebut sama: pembilang lebih besar = pecahan lebih besar. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Compare Numerators: Penyebut sama: pembilang lebih besar = pecahan lebih besar.",
      "voiceGuide": "Banding Pembilang. Penyebut sama: pembilang lebih besar = pecahan lebih besar.",
      "diagramType": "match",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-b",
      "title": "Memori Diagram B",
      "bookReference": "hlm. 64",
      "objective": "Pakai Banding Pembilang: Penyebut sama: pembilang lebih besar = pecahan lebih besar. Latihan: Memori..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Compare Numerators: Penyebut sama: pembilang lebih besar = pecahan lebih besar.",
      "voiceGuide": "Banding Pembilang. Penyebut sama: pembilang lebih besar = pecahan lebih besar.",
      "diagramType": "mem",
      "numberA": 2,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-b",
      "title": "Tabel Gambar → Pecahan B",
      "bookReference": "hlm. 64",
      "objective": "Isi tabel.. Ingat Banding Pembilang.",
      "mechanicDescription": "Tiga tabel. Gunakan Banding Pembilang.",
      "voiceGuide": "Banding Pembilang. Pilih.",
      "diagramType": "table",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-b",
      "title": "Ketuk Semua Syarat B",
      "bookReference": "hlm. 65",
      "objective": "Ketuk semua.. Ingat Banding Pembilang.",
      "mechanicDescription": "Tiga ronde. Gunakan Banding Pembilang.",
      "voiceGuide": "Banding Pembilang. Ketuk semua.",
      "diagramType": "select",
      "numberA": 2,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-b",
      "title": "Pilah Diagram B",
      "bookReference": "hlm. 65",
      "objective": "Pilah.. Ingat Banding Pembilang.",
      "mechanicDescription": "Tiga ronde. Gunakan Banding Pembilang.",
      "voiceGuide": "Banding Pembilang. Pilah.",
      "diagramType": "sort",
      "numberA": 2,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "rule-b",
      "title": "Aturan Pembilang",
      "bookReference": "hlm. 63",
      "objective": "Pilih aturan benar.. Ingat Banding Pembilang.",
      "mechanicDescription": "Tiga ronde. Gunakan Banding Pembilang.",
      "voiceGuide": "Banding Pembilang. Pilih.",
      "diagramType": "rule",
      "numberA": 2,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "compare-picture-b",
      "title": "Banding Gambar B",
      "bookReference": "hlm. 63–64",
      "objective": "Pilih relasi.. Ingat Banding Pembilang.",
      "mechanicDescription": "Tiga ronde. Gunakan Banding Pembilang.",
      "voiceGuide": "Banding Pembilang. Pilih.",
      "diagramType": "cmp",
      "numberA": 2,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-b",
      "title": "Cerita Diagram B",
      "bookReference": "hlm. 65",
      "objective": "Cerita.. Ingat Banding Pembilang.",
      "mechanicDescription": "Tiga ronde. Gunakan Banding Pembilang.",
      "voiceGuide": "Banding Pembilang. Pilih.",
      "diagramType": "story",
      "numberA": 2,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-b",
      "title": "Tulis p/q",
      "bookReference": "hlm. 63–65",
      "objective": "Pakai Batang Pecahan: Batang sama panjang memudahkan banding. Latihan: Menulis notasi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Fraction Bars: Batang sama panjang memudahkan banding.",
      "voiceGuide": "Batang Pecahan. Batang sama panjang memudahkan banding.",
      "symbolLarge": "2/3",
      "wordLarge": "SAMA",
      "mathNotation": "p/q"
    },
    {
      "stage": "Abstract",
      "gameType": "sign-abstract-b",
      "title": "Tanda > < Angka",
      "bookReference": "hlm. 65",
      "objective": "Pakai Batang Pecahan: Batang sama panjang memudahkan banding. Latihan: Mengisi tanda..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Fraction Bars: Batang sama panjang memudahkan banding.",
      "voiceGuide": "Batang Pecahan. Batang sama panjang memudahkan banding.",
      "symbolLarge": "<",
      "wordLarge": "TANDA",
      "mathNotation": "p/q ? r/q"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-b",
      "title": "Pilih Hasil Banding",
      "bookReference": "hlm. 65",
      "objective": "Pakai Batang Pecahan: Batang sama panjang memudahkan banding. Latihan: Memilih..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Fraction Bars: Batang sama panjang memudahkan banding.",
      "voiceGuide": "Batang Pecahan. Batang sama panjang memudahkan banding.",
      "symbolLarge": "2/3",
      "wordLarge": "PILIH",
      "mathNotation": "banding"
    },
    {
      "stage": "Abstract",
      "gameType": "order-b",
      "title": "Urutkan Notasi B",
      "bookReference": "hlm. 65",
      "objective": "Pakai Batang Pecahan: Batang sama panjang memudahkan banding. Latihan: Mengurutkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Fraction Bars: Batang sama panjang memudahkan banding.",
      "voiceGuide": "Batang Pecahan. Batang sama panjang memudahkan banding.",
      "symbolLarge": "1/5<2/5",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-b",
      "title": "Jodohkan Teks B",
      "bookReference": "hlm. 64–65",
      "objective": "Jodohkan.. Ingat Batang Pecahan.",
      "mechanicDescription": "Tiga ronde. Gunakan Batang Pecahan.",
      "voiceGuide": "Batang Pecahan. Jodohkan.",
      "symbolLarge": "3/6",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-b",
      "title": "Memori Notasi B",
      "bookReference": "hlm. 65",
      "objective": "Memori.. Ingat Batang Pecahan.",
      "mechanicDescription": "Tiga ronde. Gunakan Batang Pecahan.",
      "voiceGuide": "Batang Pecahan. Balik kartu.",
      "symbolLarge": "2/10",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-b",
      "title": "Benar atau Salah: B",
      "bookReference": "hlm. 63–65",
      "objective": "Menilai.. Ingat Batang Pecahan.",
      "mechanicDescription": "Dua ronde. Gunakan Batang Pecahan.",
      "voiceGuide": "Batang Pecahan. Benar/salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-b",
      "title": "Detektif Penyebut Sama",
      "bookReference": "hlm. 63–65",
      "objective": "Petunjuk.. Ingat Batang Pecahan.",
      "mechanicDescription": "Empat soal. Gunakan Batang Pecahan.",
      "voiceGuide": "Batang Pecahan. Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-b",
      "title": "Peta Konsep B",
      "bookReference": "hlm. 63–64",
      "objective": "Mengisi kotak.. Ingat Batang Pecahan.",
      "mechanicDescription": "Satu peta. Gunakan Batang Pecahan.",
      "voiceGuide": "Batang Pecahan. Pilih.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-b",
      "title": "Cerita Angka B",
      "bookReference": "hlm. 65",
      "objective": "Soal cerita.. Ingat Batang Pecahan.",
      "mechanicDescription": "Tiga ronde. Gunakan Batang Pecahan.",
      "voiceGuide": "Batang Pecahan. Pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "🍕",
      "nama": "Sama q",
      "isi": "Penyebut sama artinya potongan sama besar.",
      "suara": "Bandingkan pembilangnya."
    },
    {
      "ikon": "➗",
      "nama": "Pembilang",
      "isi": "Pembilang lebih besar → pecahan lebih besar.",
      "suara": "2/3 lebih dari 1/3."
    },
    {
      "ikon": "🌍",
      "nama": "Penyebut Sama",
      "isi": "Banding/jumlah lebih mudah jika penyebut sama.",
      "suara": "Penyebut Sama. Banding/jumlah lebih mudah jika penyebut sama."
    },
    {
      "ikon": "🌍",
      "nama": "Banding Pembilang",
      "isi": "Penyebut sama: pembilang lebih besar = pecahan lebih besar.",
      "suara": "Banding Pembilang. Penyebut sama: pembilang lebih besar = pecahan lebih besar."
    },
    {
      "ikon": "🌍",
      "nama": "Batang Pecahan",
      "isi": "Batang sama panjang memudahkan banding.",
      "suara": "Batang Pecahan. Batang sama panjang memudahkan banding."
    }
  ],
  "poinSuara": "Ingat: Penyebut Sama, Banding Pembilang, Batang Pecahan.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Sama q",
        "warna": "#FDE68A"
      },
      {
        "teks": "Pembilang",
        "warna": "#BBF7D0"
      },
      {
        "teks": "Tanda",
        "warna": "#BFDBFE"
      },
      {
        "teks": "Cerita",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: terapkan Penyebut Sama pada satu benda atau soal nyata, lalu ceritakan langkahmu.",
  "refleksi": [
    "Bagaimana Penyebut Sama membantumu memahami soal?",
    "Kapan kamu memakai Banding Pembilang?",
    "Apa bedanya dengan hanya menghafal rumus atau langkah tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Same Denominator",
      "namaId": "Penyebut Sama",
      "asal": "Singapore Math",
      "ringkas": "Banding/jumlah lebih mudah jika penyebut sama.",
      "tahap": [
        "Story",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Compare Numerators",
      "namaId": "Banding Pembilang",
      "asal": "Fraction comparison",
      "ringkas": "Penyebut sama: pembilang lebih besar = pecahan lebih besar.",
      "tahap": [
        "Picture",
        "Mind"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Fraction Bars",
      "namaId": "Batang Pecahan",
      "asal": "Manipulative pedagogy",
      "ringkas": "Batang sama panjang memudahkan banding.",
      "tahap": [
        "Infografis",
        "Concrete"
      ]
    }
  ]
};

export const SUB_C42: SubBabNaskah = {
  "id": "C",
  "codeTitle": "Sub-Bab C (Pecahan Senilai)",
  "fullTitle": "Sub-Bab C: Pecahan Senilai",
  "targetDescription": "Siswa mengenali pecahan senilai (2/6 = 1/3) melalui model coklat dan lipat kertas, serta menghasilkan senilai dengan mengalikan atau membagi pembilang dan penyebut dengan bilangan sama. Siswa memakai cara Pecahan Senilai, Kali dengan Bentuk Satu, Sederhanakan.",
  "secondaryBg": "#FCE7F3",
  "secondaryBorder": "#DB2777",
  "secondaryText": "#9D174D",
  "silabus": {
    "teksSuara": "Kita belajar pecahan senilai. Dua per enam sama dengan satu per tiga. Kalikan atau bagi pembilang dan penyebut dengan bilangan yang sama. Kita memakai cara dari luar buku: Pecahan Senilai (Equivalent Fractions); Kali dengan Bentuk Satu (Multiply Identity); Sederhanakan (Simplify). Senilai menunjuk bagian sama dengan tulisan beda. Kali pembilang dan penyebut dengan bilangan sama. Bagi pembilang dan penyebut dengan FPB. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa mengenali pecahan senilai setelah mengamati gambar dan simbol.",
    "referensi": "Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 2 Sub-Bab C)."
  },
  "videos": [
    {
      "id": "K4B2C-V1",
      "judul": "Coklat Putu",
      "subjudul": "Equivalent Fractions",
      "adegan": [
        {
          "id": "K4B2C-V1-1",
          "judul": "Dua batang",
          "ketukan": [
            "Bayangkan situasi nyata di kelas atau di rumah. Ibu Guru punya 2 batang coklat. Mari kita pahami bersama.",
            "Coklat pertama dibagi 6, Putu mendapat 2/6. Mari kita pahami bersama.",
            "Coklat kedua dibagi 3, Putu mendapat 1/3. Mari kita pahami bersama.",
            "Ingat cara Pecahan Senilai: Senilai menunjuk bagian sama dengan tulisan beda."
          ],
          "papan": [
            "2 coklat",
            "2/6",
            "1/3",
            "sama?"
          ]
        },
        {
          "id": "K4B2C-V1-2",
          "judul": "Gambar membuktikan",
          "ketukan": [
            "Lihat daerah coklat Putu. Mari kita pahami bersama.",
            "2 dari 6 sama luas dengan 1 dari 3. Mari kita pahami bersama.",
            "Jadi 2/6 = 1/3. Mari kita pahami bersama.",
            "Di sini kita memakai ide Equivalent Fractions — Senilai menunjuk bagian sama dengan tulisan beda."
          ],
          "papan": [
            "luas sama",
            "2/6",
            "1/3",
            "pecahan"
          ]
        },
        {
          "id": "K4B2C-V1-3",
          "judul": "Lipat kertas",
          "ketukan": [
            "Lipat kertas jadi 4, warnai 1 → 1/4. Mari kita pahami bersama.",
            "Lipat kertas lain jadi 16, warnai 4 → 4/16. Mari kita pahami bersama.",
            "Daerah warnanya sama besar. Mari kita pahami bersama.",
            "METODE LUAR · Pecahan Senilai: Senilai menunjuk bagian sama dengan tulisan beda."
          ],
          "papan": [
            "1/4",
            "4/16",
            "sama besar",
            "senilai"
          ]
        }
      ]
    },
    {
      "id": "K4B2C-V2",
      "judul": "Latihan: Kali dengan Bentuk Satu",
      "subjudul": "Multiply Identity",
      "adegan": [
        {
          "id": "K4B2C-V2-1",
          "judul": "Kalikan",
          "ketukan": [
            "Ambil 1/3. Mari kita pahami bersama.",
            "Kalikan pembilang dan penyebut dengan 2. Mari kita pahami bersama.",
            "Dapat 2/6. Mari kita pahami bersama.",
            "Ingat cara Kali dengan Bentuk Satu: Kali pembilang dan penyebut dengan bilangan sama."
          ],
          "papan": [
            "1/3",
            "×2 / ×2",
            "2/6",
            "sama"
          ]
        },
        {
          "id": "K4B2C-V2-2",
          "judul": "Bagi",
          "ketukan": [
            "Ambil 2/6. Mari kita pahami bersama.",
            "Bagi pembilang dan penyebut dengan 2. Mari kita pahami bersama.",
            "Dapat 1/3. Mari kita pahami bersama.",
            "Di sini kita memakai ide Multiply Identity — Kali pembilang dan penyebut dengan bilangan sama."
          ],
          "papan": [
            "2/6",
            "÷2 / ÷2",
            "1/3",
            "sederhana"
          ]
        },
        {
          "id": "K4B2C-V2-3",
          "judul": "Ingat",
          "ketukan": [
            "Jangan hanya ubah pembilang. Mari kita pahami bersama.",
            "Jangan hanya ubah penyebut. Mari kita pahami bersama.",
            "Ubah keduanya dengan bilangan sama. Mari kita pahami bersama.",
            "METODE LUAR · Kali dengan Bentuk Satu: Kali pembilang dan penyebut dengan bilangan sama."
          ],
          "papan": [
            "bukan salah satu",
            "keduanya",
            "bilangan sama",
            "kunci"
          ]
        }
      ]
    },
    {
      "id": "K4B2C-V3",
      "judul": "Siap pakai Simplify",
      "subjudul": "Simplify",
      "adegan": [
        {
          "id": "K4B2C-V3-1",
          "judul": "Baca arsir",
          "ketukan": [
            "Lihat dua gambar diarsir. Mari kita pahami bersama.",
            "Tulis pecahan masing-masing. Mari kita pahami bersama.",
            "Apakah nilainya sama. Mari kita pahami bersama.",
            "Ingat cara Sederhanakan: Bagi pembilang dan penyebut dengan FPB."
          ],
          "papan": [
            "dua gambar",
            "tulis",
            "nilai?",
            "senilai?"
          ]
        },
        {
          "id": "K4B2C-V3-2",
          "judul": "Buat tiga gambar",
          "ketukan": [
            "Buat tiga gambar pecahan senilai. Mari kita pahami bersama.",
            "Misal 1/2, 2/4, dan 3/6. Mari kita pahami bersama.",
            "Semua bernilai setengah. Mari kita pahami bersama.",
            "Di sini kita memakai ide Simplify — Bagi pembilang dan penyebut dengan FPB."
          ],
          "papan": [
            "tiga gambar",
            "1/2",
            "2/4",
            "3/6"
          ]
        },
        {
          "id": "K4B2C-V3-3",
          "judul": "Siap desimal",
          "ketukan": [
            "Pecahan biasa sudah dikuasai. Mari kita pahami bersama.",
            "Berikutnya pecahan desimal. Mari kita pahami bersama.",
            "Persepuluhan dan perseratusan. Mari kita pahami bersama.",
            "METODE LUAR · Sederhanakan: Bagi pembilang dan penyebut dengan FPB."
          ],
          "papan": [
            "biasa ok",
            "desimal",
            "1/10",
            "nanti D"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Pecahan Senilai. Apa yang ditanyakan?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Equivalent Fractions",
      "stepDesc": "Senilai menunjuk bagian sama dengan tulisan beda.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Multiply Identity",
      "stepDesc": "Kali pembilang dan penyebut dengan bilangan sama.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Simplify",
      "stepDesc": "Bagi pembilang dan penyebut dengan FPB.",
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
      "judul": "SENILAI",
      "emoji": "⚖️",
      "countNum": 1,
      "countWord": "nilai",
      "suara": "Nilai sama."
    },
    {
      "judul": "2/6=1/3",
      "emoji": "🍫",
      "countNum": 6,
      "countWord": "coklat",
      "suara": "Contoh Putu."
    },
    {
      "judul": "×k",
      "emoji": "✖️",
      "countNum": 2,
      "countWord": "kali",
      "suara": "Kalikan p dan q."
    },
    {
      "judul": ":k",
      "emoji": "➗",
      "countNum": 2,
      "countWord": "bagi",
      "suara": "Bagi p dan q."
    },
    {
      "judul": "1/4=4/16",
      "emoji": "📄",
      "countNum": 16,
      "countWord": "lipat",
      "suara": "Aktivitas kertas."
    },
    {
      "judul": "1/2=2/4",
      "emoji": "✅",
      "countNum": 2,
      "countWord": "setengah",
      "suara": "Banyak bentuk."
    },
    {
      "judul": "JANGAN",
      "emoji": "🚫",
      "countNum": 1,
      "countWord": "salah",
      "suara": "Jangan ubah satu saja."
    },
    {
      "judul": "SEDERHANA",
      "emoji": "✨",
      "countNum": 1,
      "countWord": "bagi",
      "suara": "Bagi sampai tidak bisa."
    },
    {
      "judul": "ARSIR",
      "emoji": "🖍️",
      "countNum": 1,
      "countWord": "bukti",
      "suara": "Luas arsir sama."
    },
    {
      "judul": "SIAP D",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "desimal",
      "suara": "Sub-Bab berikutnya."
    },
    {
      "judul": "Pecahan Senilai",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "ingat",
      "suara": "Senilai menunjuk bagian sama dengan tulisan beda."
    },
    {
      "judul": "Kali dengan Bentuk Satu",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "ingat",
      "suara": "Kali pembilang dan penyebut dengan bilangan sama."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "coklat-senilai",
      "title": "Coklat Putu 2/6 = 1/3",
      "bookReference": "hlm. 67–68",
      "objective": "Pakai Pecahan Senilai: Senilai menunjuk bagian sama dengan tulisan beda. Latihan: Mengenal senilai dari benda..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Equivalent Fractions: Senilai menunjuk bagian sama dengan tulisan beda.",
      "voiceGuide": "Pecahan Senilai. Senilai menunjuk bagian sama dengan tulisan beda.",
      "emoji": "🍫",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "kali-senilai",
      "title": "Kalikan Jadi Senilai",
      "bookReference": "hlm. 69",
      "objective": "Pakai Pecahan Senilai: Senilai menunjuk bagian sama dengan tulisan beda. Latihan: ×k pada pembilang & penyebut..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Equivalent Fractions: Senilai menunjuk bagian sama dengan tulisan beda.",
      "voiceGuide": "Pecahan Senilai. Senilai menunjuk bagian sama dengan tulisan beda.",
      "emoji": "✖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "bagi-senilai",
      "title": "Bagi Jadi Senilai",
      "bookReference": "hlm. 69",
      "objective": "Pakai Pecahan Senilai: Senilai menunjuk bagian sama dengan tulisan beda. Latihan: :k pada pembilang & penyebut..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Equivalent Fractions: Senilai menunjuk bagian sama dengan tulisan beda.",
      "voiceGuide": "Pecahan Senilai. Senilai menunjuk bagian sama dengan tulisan beda.",
      "emoji": "➗",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-senilai",
      "title": "Pilah: Senilai atau Tidak",
      "bookReference": "hlm. 67–69",
      "objective": "Pakai Pecahan Senilai: Senilai menunjuk bagian sama dengan tulisan beda. Latihan: Memilah pasangan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Equivalent Fractions: Senilai menunjuk bagian sama dengan tulisan beda.",
      "voiceGuide": "Pecahan Senilai. Senilai menunjuk bagian sama dengan tulisan beda.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-senilai",
      "title": "Jodohkan Pasangan Senilai",
      "bookReference": "hlm. 68–70",
      "objective": "Menjodohkan.. Ingat Pecahan Senilai.",
      "mechanicDescription": "Tiga ronde. Gunakan Pecahan Senilai.",
      "voiceGuide": "Pecahan Senilai. Jodohkan.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "memory-senilai",
      "title": "Memori Senilai",
      "bookReference": "hlm. 68–69",
      "objective": "Memori.. Ingat Pecahan Senilai.",
      "mechanicDescription": "Tiga ronde. Gunakan Pecahan Senilai.",
      "voiceGuide": "Pecahan Senilai. Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-senilai",
      "title": "Ketuk yang Senilai Acuan",
      "bookReference": "hlm. 69–70",
      "objective": "Mengetuk.. Ingat Pecahan Senilai.",
      "mechanicDescription": "Tiga ronde. Gunakan Pecahan Senilai.",
      "voiceGuide": "Pecahan Senilai. Ketuk.",
      "emoji": "👆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-senilai",
      "title": "Ketuk Semua Senilai",
      "bookReference": "hlm. 69",
      "objective": "Ketuk semua.. Ingat Pecahan Senilai.",
      "mechanicDescription": "Tiga ronde. Gunakan Pecahan Senilai.",
      "voiceGuide": "Pecahan Senilai. Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-senilai",
      "title": "Cerita Lipat Kertas & Coklat",
      "bookReference": "hlm. 66–68",
      "objective": "Soal cerita.. Ingat Pecahan Senilai.",
      "mechanicDescription": "Tiga ronde. Gunakan Pecahan Senilai.",
      "voiceGuide": "Pecahan Senilai. Pilih.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-nilai",
      "title": "Urutkan menurut Nilai",
      "bookReference": "hlm. 70",
      "objective": "Mengurutkan.. Ingat Pecahan Senilai.",
      "mechanicDescription": "Tiga ronde. Gunakan Pecahan Senilai.",
      "voiceGuide": "Pecahan Senilai. Urutkan.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "grid-senilai",
      "title": "Kotak Senilai",
      "bookReference": "hlm. 66–67",
      "objective": "Pakai Kali dengan Bentuk Satu: Kali pembilang dan penyebut dengan bilangan sama. Latihan: Membaca grid arsir..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Multiply Identity: Kali pembilang dan penyebut dengan bilangan sama.",
      "voiceGuide": "Kali dengan Bentuk Satu. Kali pembilang dan penyebut dengan bilangan sama.",
      "diagramType": "grid",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "bar-senilai",
      "title": "Batang Senilai",
      "bookReference": "hlm. 68",
      "objective": "Pakai Kali dengan Bentuk Satu: Kali pembilang dan penyebut dengan bilangan sama. Latihan: Membandingkan batang..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Multiply Identity: Kali pembilang dan penyebut dengan bilangan sama.",
      "voiceGuide": "Kali dengan Bentuk Satu. Kali pembilang dan penyebut dengan bilangan sama.",
      "diagramType": "bar",
      "numberA": 2,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "kali-picture",
      "title": "×k pada Diagram",
      "bookReference": "hlm. 69",
      "objective": "Pakai Kali dengan Bentuk Satu: Kali pembilang dan penyebut dengan bilangan sama. Latihan: Pilih hasil kali..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Multiply Identity: Kali pembilang dan penyebut dengan bilangan sama.",
      "voiceGuide": "Kali dengan Bentuk Satu. Kali pembilang dan penyebut dengan bilangan sama.",
      "diagramType": "mul",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "bagi-picture",
      "title": ":k pada Diagram",
      "bookReference": "hlm. 69",
      "objective": "Pakai Kali dengan Bentuk Satu: Kali pembilang dan penyebut dengan bilangan sama. Latihan: Pilih hasil bagi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Multiply Identity: Kali pembilang dan penyebut dengan bilangan sama.",
      "voiceGuide": "Kali dengan Bentuk Satu. Kali pembilang dan penyebut dengan bilangan sama.",
      "diagramType": "div",
      "numberA": 2,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "match-picture-c",
      "title": "Jodohkan Diagram Senilai",
      "bookReference": "hlm. 68–70",
      "objective": "Jodohkan.. Ingat Kali dengan Bentuk Satu.",
      "mechanicDescription": "Tiga ronde. Gunakan Kali dengan Bentuk Satu.",
      "voiceGuide": "Kali dengan Bentuk Satu. Jodohkan.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memory-picture-c",
      "title": "Memori Diagram Senilai",
      "bookReference": "hlm. 68",
      "objective": "Memori.. Ingat Kali dengan Bentuk Satu.",
      "mechanicDescription": "Tiga ronde. Gunakan Kali dengan Bentuk Satu.",
      "voiceGuide": "Kali dengan Bentuk Satu. Balik kartu.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-c",
      "title": "Tabel ×k Senilai",
      "bookReference": "hlm. 69",
      "objective": "Isi hasil.. Ingat Kali dengan Bentuk Satu.",
      "mechanicDescription": "Tiga tabel. Gunakan Kali dengan Bentuk Satu.",
      "voiceGuide": "Kali dengan Bentuk Satu. Pilih.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-c",
      "title": "Ketuk Semua Senilai Diagram",
      "bookReference": "hlm. 69",
      "objective": "Ketuk semua.. Ingat Kali dengan Bentuk Satu.",
      "mechanicDescription": "Tiga ronde. Gunakan Kali dengan Bentuk Satu.",
      "voiceGuide": "Kali dengan Bentuk Satu. Ketuk semua.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-picture-c",
      "title": "Pilah Diagram Senilai",
      "bookReference": "hlm. 67–69",
      "objective": "Pilah.. Ingat Kali dengan Bentuk Satu.",
      "mechanicDescription": "Tiga ronde. Gunakan Kali dengan Bentuk Satu.",
      "voiceGuide": "Kali dengan Bentuk Satu. Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "rule-c",
      "title": "Dua Cara Senilai",
      "bookReference": "hlm. 69",
      "objective": "Pilih cara benar.. Ingat Kali dengan Bentuk Satu.",
      "mechanicDescription": "Tiga ronde. Gunakan Kali dengan Bentuk Satu.",
      "voiceGuide": "Kali dengan Bentuk Satu. Pilih.",
      "diagramType": "rule",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "check-equal",
      "title": "Apakah Senilai?",
      "bookReference": "hlm. 68–70",
      "objective": "Pakai Sederhanakan: Bagi pembilang dan penyebut dengan FPB. Latihan: Menilai kesamaan nilai..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Simplify: Bagi pembilang dan penyebut dengan FPB.",
      "voiceGuide": "Sederhanakan. Bagi pembilang dan penyebut dengan FPB.",
      "symbolLarge": "=",
      "wordLarge": "SENILAI",
      "mathNotation": "a/b = c/d"
    },
    {
      "stage": "Abstract",
      "gameType": "kali-abstract",
      "title": "Hitung ×k",
      "bookReference": "hlm. 69",
      "objective": "Pakai Sederhanakan: Bagi pembilang dan penyebut dengan FPB. Latihan: Mengalikan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Simplify: Bagi pembilang dan penyebut dengan FPB.",
      "voiceGuide": "Sederhanakan. Bagi pembilang dan penyebut dengan FPB.",
      "symbolLarge": "×2",
      "wordLarge": "KALI",
      "mathNotation": "p/q ×k"
    },
    {
      "stage": "Abstract",
      "gameType": "bagi-abstract",
      "title": "Hitung :k",
      "bookReference": "hlm. 69",
      "objective": "Pakai Sederhanakan: Bagi pembilang dan penyebut dengan FPB. Latihan: Membagi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Simplify: Bagi pembilang dan penyebut dengan FPB.",
      "voiceGuide": "Sederhanakan. Bagi pembilang dan penyebut dengan FPB.",
      "symbolLarge": "÷2",
      "wordLarge": "BAGI",
      "mathNotation": "p/q :k"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-c",
      "title": "Pilih Bentuk Senilai",
      "bookReference": "hlm. 69–70",
      "objective": "Pakai Sederhanakan: Bagi pembilang dan penyebut dengan FPB. Latihan: Memilih..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Simplify: Bagi pembilang dan penyebut dengan FPB.",
      "voiceGuide": "Sederhanakan. Bagi pembilang dan penyebut dengan FPB.",
      "symbolLarge": "2/6",
      "wordLarge": "PILIH",
      "mathNotation": "senilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-c",
      "title": "Jodohkan Bentuk Senilai",
      "bookReference": "hlm. 68–70",
      "objective": "Jodohkan.. Ingat Sederhanakan.",
      "mechanicDescription": "Tiga ronde. Gunakan Sederhanakan.",
      "voiceGuide": "Sederhanakan. Jodohkan.",
      "symbolLarge": "1/3",
      "wordLarge": "JODOH",
      "mathNotation": "pasangan"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-c",
      "title": "Memori Bentuk Senilai",
      "bookReference": "hlm. 69",
      "objective": "Memori.. Ingat Sederhanakan.",
      "mechanicDescription": "Tiga ronde. Gunakan Sederhanakan.",
      "voiceGuide": "Sederhanakan. Balik kartu.",
      "symbolLarge": "1/2",
      "wordLarge": "MEMORI",
      "mathNotation": "pasangan"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-c",
      "title": "Benar atau Salah: Senilai",
      "bookReference": "hlm. 66–70",
      "objective": "Menilai.. Ingat Sederhanakan.",
      "mechanicDescription": "Dua ronde. Gunakan Sederhanakan.",
      "voiceGuide": "Sederhanakan. Benar/salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-c",
      "title": "Detektif Senilai",
      "bookReference": "hlm. 67–70",
      "objective": "Petunjuk.. Ingat Sederhanakan.",
      "mechanicDescription": "Empat soal. Gunakan Sederhanakan.",
      "voiceGuide": "Sederhanakan. Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-c",
      "title": "Peta Konsep Senilai",
      "bookReference": "hlm. 69",
      "objective": "Mengisi kotak.. Ingat Sederhanakan.",
      "mechanicDescription": "Satu peta. Gunakan Sederhanakan.",
      "voiceGuide": "Sederhanakan. Pilih.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-c",
      "title": "Cerita Angka Senilai",
      "bookReference": "hlm. 66–68",
      "objective": "Soal cerita.. Ingat Sederhanakan.",
      "mechanicDescription": "Tiga ronde. Gunakan Sederhanakan.",
      "voiceGuide": "Sederhanakan. Pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "🍕",
      "nama": "Senilai",
      "isi": "Bentuk berbeda boleh, nilai harus sama.",
      "suara": "2/6 sama dengan 1/3."
    },
    {
      "ikon": "➗",
      "nama": "×k",
      "isi": "Kalikan pembilang dan penyebut dengan bilangan sama.",
      "suara": "1/3 ×2 menjadi 2/6."
    },
    {
      "ikon": "🌍",
      "nama": "Pecahan Senilai",
      "isi": "Senilai menunjuk bagian sama dengan tulisan beda.",
      "suara": "Pecahan Senilai. Senilai menunjuk bagian sama dengan tulisan beda."
    },
    {
      "ikon": "🌍",
      "nama": "Kali dengan Bentuk Satu",
      "isi": "Kali pembilang dan penyebut dengan bilangan sama.",
      "suara": "Kali dengan Bentuk Satu. Kali pembilang dan penyebut dengan bilangan sama."
    },
    {
      "ikon": "🌍",
      "nama": "Sederhanakan",
      "isi": "Bagi pembilang dan penyebut dengan FPB.",
      "suara": "Sederhanakan. Bagi pembilang dan penyebut dengan FPB."
    }
  ],
  "poinSuara": "Ingat: Pecahan Senilai, Kali dengan Bentuk Satu, Sederhanakan.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Senilai",
        "warna": "#FDE68A"
      },
      {
        "teks": "×k",
        "warna": "#BBF7D0"
      },
      {
        "teks": ":k",
        "warna": "#BFDBFE"
      },
      {
        "teks": "Bukti",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: terapkan Pecahan Senilai pada satu benda atau soal nyata, lalu ceritakan langkahmu.",
  "refleksi": [
    "Bagaimana Pecahan Senilai membantumu memahami soal?",
    "Kapan kamu memakai Kali dengan Bentuk Satu?",
    "Apa bedanya dengan hanya menghafal rumus atau langkah tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Equivalent Fractions",
      "namaId": "Pecahan Senilai",
      "asal": "Van de Walle",
      "ringkas": "Senilai menunjuk bagian sama dengan tulisan beda.",
      "tahap": [
        "Story",
        "Mind",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Multiply Identity",
      "namaId": "Kali dengan Bentuk Satu",
      "asal": "Fraction equivalence",
      "ringkas": "Kali pembilang dan penyebut dengan bilangan sama.",
      "tahap": [
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Simplify",
      "namaId": "Sederhanakan",
      "asal": "GCF simplification",
      "ringkas": "Bagi pembilang dan penyebut dengan FPB.",
      "tahap": [
        "Infografis",
        "Abstract"
      ]
    }
  ]
};

export const SUB_D42: SubBabNaskah = {
  "id": "D",
  "codeTitle": "Sub-Bab D (Desimal Persepuluhan & Perseratusan)",
  "fullTitle": "Sub-Bab D: Pecahan Desimal Persepuluhan dan Perseratusan",
  "targetDescription": "Siswa mengubah pecahan biasa persepuluhan (penyebut 10) dan perseratusan (penyebut 100) menjadi pecahan desimal (0,1; 0,01; 0,25), serta membaca aturan satu/dua angka di belakang koma. Siswa memakai cara Desimal Persepuluhan Perseratusan, Kisi Desimal, Jembatan Pecahan–Desimal.",
  "secondaryBg": "#ECFDF5",
  "secondaryBorder": "#059669",
  "secondaryText": "#064E3B",
  "silabus": {
    "teksSuara": "Kita belajar pecahan desimal. Satu dari sepuluh roti sama dengan nol koma satu. Satu dari seratus biskuit sama dengan nol koma nol satu. Satu angka di belakang koma berarti penyebut sepuluh. Dua angka berarti penyebut seratus. Kita memakai cara dari luar buku: Desimal Persepuluhan Perseratusan (Decimal Tenths Hundredths); Kisi Desimal (Decimal Grid); Jembatan Pecahan–Desimal (Fraction–Decimal Link). Digit setelah koma = persepuluhan dan perseratusan. Kisi 10×10 menunjukkan perseratusan. 0,3 = 3/10; 0,25 = 25/100. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menyatakan pecahan desimal persepuluhan dan perseratusan serta mengubah pecahan biasa menjadi desimal.",
    "referensi": "Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 2 Sub-Bab D)."
  },
  "videos": [
    {
      "id": "K4B2D-V1",
      "judul": "Roti Sepuluh",
      "subjudul": "Decimal Tenths Hundredths",
      "adegan": [
        {
          "id": "K4B2D-V1-1",
          "judul": "Sepuluh roti",
          "ketukan": [
            "Bayangkan situasi nyata di kelas atau di rumah. Ibu menyiapkan sepuluh roti. Mari kita pahami bersama.",
            "Satu roti dilapisi selai coklat. Mari kita pahami bersama.",
            "Berapa bagian yang berlapis. Mari kita pahami bersama.",
            "Ingat cara Desimal Persepuluhan Perseratusan: Digit setelah koma = persepuluhan dan perseratusan."
          ],
          "papan": [
            "10 roti",
            "1 berlapis",
            "bagian?",
            "1/10"
          ]
        },
        {
          "id": "K4B2D-V1-2",
          "judul": "Jadi desimal",
          "ketukan": [
            "Satu per sepuluh ditulis desimal. Mari kita pahami bersama.",
            "Hasilnya nol koma satu. Mari kita pahami bersama.",
            "Satu angka di belakang koma. Mari kita pahami bersama.",
            "Di sini kita memakai ide Decimal Tenths Hundredths — Digit setelah koma = persepuluhan dan perseratusan."
          ],
          "papan": [
            "1/10",
            "0,1",
            "1 digit",
            "persepuluhan"
          ]
        },
        {
          "id": "K4B2D-V1-3",
          "judul": "Tiga per sepuluh",
          "ketukan": [
            "Tiga roti berlapis. Mari kita pahami bersama.",
            "Tiga per sepuluh. Mari kita pahami bersama.",
            "Ditulis nol koma tiga. Mari kita pahami bersama.",
            "METODE LUAR · Desimal Persepuluhan Perseratusan: Digit setelah koma = persepuluhan dan perseratusan."
          ],
          "papan": [
            "3/10",
            "0,3",
            "desimal",
            "OK"
          ]
        }
      ]
    },
    {
      "id": "K4B2D-V2",
      "judul": "Latihan: Kisi Desimal",
      "subjudul": "Decimal Grid",
      "adegan": [
        {
          "id": "K4B2D-V2-1",
          "judul": "Seratus biskuit",
          "ketukan": [
            "Ada seratus biskuit. Mari kita pahami bersama.",
            "Satu biskuit berlapis selai. Mari kita pahami bersama.",
            "Bentuk pecahannya. Mari kita pahami bersama.",
            "Ingat cara Kisi Desimal: Kisi 10×10 menunjukkan perseratusan."
          ],
          "papan": [
            "100 biskuit",
            "1 berlapis",
            "pecahan?",
            "1/100"
          ]
        },
        {
          "id": "K4B2D-V2-2",
          "judul": "Nol koma nol satu",
          "ketukan": [
            "Satu per seratus jadi desimal. Mari kita pahami bersama.",
            "Nol koma nol satu. Mari kita pahami bersama.",
            "Dua angka di belakang koma. Mari kita pahami bersama.",
            "Di sini kita memakai ide Decimal Grid — Kisi 10×10 menunjukkan perseratusan."
          ],
          "papan": [
            "1/100",
            "0,01",
            "2 digit",
            "perseratusan"
          ]
        },
        {
          "id": "K4B2D-V2-3",
          "judul": "Tujuh per seratus",
          "ketukan": [
            "Tujuh per seratus. Mari kita pahami bersama.",
            "Ditulis nol koma nol tujuh. Mari kita pahami bersama.",
            "Dua puluh lima per seratus jadi nol koma dua lima. Mari kita pahami bersama.",
            "METODE LUAR · Kisi Desimal: Kisi 10×10 menunjukkan perseratusan."
          ],
          "papan": [
            "7/100",
            "0,07",
            "25/100",
            "0,25"
          ]
        }
      ]
    },
    {
      "id": "K4B2D-V3",
      "judul": "Siap pakai Fraction–Decimal Link",
      "subjudul": "Fraction–Decimal Link",
      "adegan": [
        {
          "id": "K4B2D-V3-1",
          "judul": "Satu digit",
          "ketukan": [
            "Lihat di belakang koma. Mari kita pahami bersama.",
            "Ada satu angka. Mari kita pahami bersama.",
            "Penyebutnya sepuluh. Mari kita pahami bersama.",
            "Ingat cara Jembatan Pecahan–Desimal: 0,3 = 3/10; 0,25 = 25/100."
          ],
          "papan": [
            "1 digit",
            "penyebut 10",
            "contoh",
            "0,1"
          ]
        },
        {
          "id": "K4B2D-V3-2",
          "judul": "Dua digit",
          "ketukan": [
            "Ada dua angka di belakang koma. Mari kita pahami bersama.",
            "Penyebutnya seratus. Mari kita pahami bersama.",
            "Contoh: nol koma nol tujuh. Mari kita pahami bersama.",
            "Di sini kita memakai ide Fraction–Decimal Link — 0,3 = 3/10; 0,25 = 25/100."
          ],
          "papan": [
            "2 digit",
            "penyebut 100",
            "0,07",
            "0,25"
          ]
        },
        {
          "id": "K4B2D-V3-3",
          "judul": "Latihan ubah",
          "ketukan": [
            "Ubah pecahan biasa ke desimal. Mari kita pahami bersama.",
            "Lima per sepuluh jadi nol koma lima. Mari kita pahami bersama.",
            "Sembilan per sepuluh jadi nol koma sembilan. Mari kita pahami bersama.",
            "METODE LUAR · Jembatan Pecahan–Desimal: 0,3 = 3/10; 0,25 = 25/100."
          ],
          "papan": [
            "5/10",
            "0,5",
            "9/10",
            "0,9"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Pecahan Desimal Persepuluhan dan Perseratusan. Apa yang ditanyakan?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Decimal Tenths Hundredths",
      "stepDesc": "Digit setelah koma = persepuluhan dan perseratusan.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Decimal Grid",
      "stepDesc": "Kisi 10×10 menunjukkan perseratusan.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Fraction–Decimal Link",
      "stepDesc": "0,3 = 3/10; 0,25 = 25/100.",
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
      "judul": "1/10",
      "emoji": "🍞",
      "countNum": 10,
      "countWord": "roti",
      "suara": "Satu per sepuluh."
    },
    {
      "judul": "0,1",
      "emoji": "🔟",
      "countNum": 1,
      "countWord": "digit",
      "suara": "Persepuluhan."
    },
    {
      "judul": "1/100",
      "emoji": "🍪",
      "countNum": 100,
      "countWord": "biskuit",
      "suara": "Satu per seratus."
    },
    {
      "judul": "0,01",
      "emoji": "💯",
      "countNum": 2,
      "countWord": "digit",
      "suara": "Perseratusan."
    },
    {
      "judul": "0,3",
      "emoji": "✏️",
      "countNum": 3,
      "countWord": "contoh",
      "suara": "Tiga per sepuluh."
    },
    {
      "judul": "0,07",
      "emoji": "📗",
      "countNum": 7,
      "countWord": "contoh",
      "suara": "Tujuh per seratus."
    },
    {
      "judul": "0,25",
      "emoji": "🟧",
      "countNum": 25,
      "countWord": "seperempat",
      "suara": "Dua puluh lima per seratus."
    },
    {
      "judul": "ATURAN",
      "emoji": "📜",
      "countNum": 1,
      "countWord": "koma",
      "suara": "Digit = petunjuk penyebut."
    },
    {
      "judul": "UBAH",
      "emoji": "🔁",
      "countNum": 1,
      "countWord": "bentuk",
      "suara": "Biasa ke desimal."
    },
    {
      "judul": "SIAP E",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "lanjut",
      "suara": "Menuju persen."
    },
    {
      "judul": "Desimal Persepuluhan Perseratusan",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "ingat",
      "suara": "Digit setelah koma = persepuluhan dan perseratusan."
    },
    {
      "judul": "Kisi Desimal",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "ingat",
      "suara": "Kisi 10×10 menunjukkan perseratusan."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "roti-10",
      "title": "Roti Sepuluh Bagian",
      "bookReference": "hlm. 71–72 (roti 1/10)",
      "objective": "Pakai Desimal Persepuluhan Perseratusan: Digit setelah koma = persepuluhan dan perseratusan. Latihan: Mengenal 1/10 = 0,1..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Decimal Tenths Hundredths: Digit setelah koma = persepuluhan dan perseratusan.",
      "voiceGuide": "Desimal Persepuluhan Perseratusan. Digit setelah koma = persepuluhan dan perseratusan.",
      "emoji": "🍞",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "biskuit-100",
      "title": "Biskuit Seratus",
      "bookReference": "hlm. 72 (1/100)",
      "objective": "Pakai Desimal Persepuluhan Perseratusan: Digit setelah koma = persepuluhan dan perseratusan. Latihan: Mengenal 1/100 = 0,01..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Decimal Tenths Hundredths: Digit setelah koma = persepuluhan dan perseratusan.",
      "voiceGuide": "Desimal Persepuluhan Perseratusan. Digit setelah koma = persepuluhan dan perseratusan.",
      "emoji": "🍪",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ubah-10",
      "title": "Ubah Persepuluhan",
      "bookReference": "hlm. 72–74",
      "objective": "Pakai Desimal Persepuluhan Perseratusan: Digit setelah koma = persepuluhan dan perseratusan. Latihan: p/10 → 0,p..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Decimal Tenths Hundredths: Digit setelah koma = persepuluhan dan perseratusan.",
      "voiceGuide": "Desimal Persepuluhan Perseratusan. Digit setelah koma = persepuluhan dan perseratusan.",
      "emoji": "🔟",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ubah-100",
      "title": "Ubah Perseratusan",
      "bookReference": "hlm. 72–75",
      "objective": "Pakai Desimal Persepuluhan Perseratusan: Digit setelah koma = persepuluhan dan perseratusan. Latihan: p/100 → 0,pp..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Decimal Tenths Hundredths: Digit setelah koma = persepuluhan dan perseratusan.",
      "voiceGuide": "Desimal Persepuluhan Perseratusan. Digit setelah koma = persepuluhan dan perseratusan.",
      "emoji": "💯",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-jenis",
      "title": "Pilah Persepuluhan/Perseratusan",
      "bookReference": "hlm. 73",
      "objective": "Memilah jenis.. Ingat Desimal Persepuluhan Perseratusan.",
      "mechanicDescription": "Tiga ronde. Gunakan Desimal Persepuluhan Perseratusan.",
      "voiceGuide": "Desimal Persepuluhan Perseratusan. Pilah.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-des",
      "title": "Jodohkan Pecahan–Desimal",
      "bookReference": "hlm. 72–74",
      "objective": "Menjodohkan.. Ingat Desimal Persepuluhan Perseratusan.",
      "mechanicDescription": "Tiga ronde. Gunakan Desimal Persepuluhan Perseratusan.",
      "voiceGuide": "Desimal Persepuluhan Perseratusan. Jodohkan.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-des",
      "title": "Memori Desimal",
      "bookReference": "hlm. 72–74",
      "objective": "Memori.. Ingat Desimal Persepuluhan Perseratusan.",
      "mechanicDescription": "Tiga ronde. Gunakan Desimal Persepuluhan Perseratusan.",
      "voiceGuide": "Desimal Persepuluhan Perseratusan. Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-des",
      "title": "Ketuk Desimal Diminta",
      "bookReference": "hlm. 73–74",
      "objective": "Mengetuk.. Ingat Desimal Persepuluhan Perseratusan.",
      "mechanicDescription": "Tiga ronde. Gunakan Desimal Persepuluhan Perseratusan.",
      "voiceGuide": "Desimal Persepuluhan Perseratusan. Ketuk.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-des",
      "title": "Ketuk Semua Jenis",
      "bookReference": "hlm. 73",
      "objective": "Ketuk semua.. Ingat Desimal Persepuluhan Perseratusan.",
      "mechanicDescription": "Tiga ronde. Gunakan Desimal Persepuluhan Perseratusan.",
      "voiceGuide": "Desimal Persepuluhan Perseratusan. Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-des",
      "title": "Cerita Roti dan Biskuit",
      "bookReference": "hlm. 71–73",
      "objective": "Soal cerita.. Ingat Desimal Persepuluhan Perseratusan.",
      "mechanicDescription": "Tiga ronde. Gunakan Desimal Persepuluhan Perseratusan.",
      "voiceGuide": "Desimal Persepuluhan Perseratusan. Pilih.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "bar-10",
      "title": "Batang Sepuluh",
      "bookReference": "hlm. 71–72",
      "objective": "Pakai Kisi Desimal: Kisi 10×10 menunjukkan perseratusan. Latihan: Baca batang /10..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Decimal Grid: Kisi 10×10 menunjukkan perseratusan.",
      "voiceGuide": "Kisi Desimal. Kisi 10×10 menunjukkan perseratusan.",
      "diagramType": "bar10",
      "numberA": 1,
      "numberB": 10
    },
    {
      "stage": "Picture",
      "gameType": "grid-100",
      "title": "Kotak Seratus",
      "bookReference": "hlm. 72–73",
      "objective": "Pakai Kisi Desimal: Kisi 10×10 menunjukkan perseratusan. Latihan: Baca grid /100..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Decimal Grid: Kisi 10×10 menunjukkan perseratusan.",
      "voiceGuide": "Kisi Desimal. Kisi 10×10 menunjukkan perseratusan.",
      "diagramType": "grid",
      "numberA": 1,
      "numberB": 100
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-d",
      "title": "Jodohkan Diagram Desimal",
      "bookReference": "hlm. 72–74",
      "objective": "Pakai Kisi Desimal: Kisi 10×10 menunjukkan perseratusan. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Decimal Grid: Kisi 10×10 menunjukkan perseratusan.",
      "voiceGuide": "Kisi Desimal. Kisi 10×10 menunjukkan perseratusan.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-d",
      "title": "Memori Diagram Desimal",
      "bookReference": "hlm. 73",
      "objective": "Pakai Kisi Desimal: Kisi 10×10 menunjukkan perseratusan. Latihan: Memori..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Decimal Grid: Kisi 10×10 menunjukkan perseratusan.",
      "voiceGuide": "Kisi Desimal. Kisi 10×10 menunjukkan perseratusan.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-d",
      "title": "Tabel Pecahan → Desimal",
      "bookReference": "hlm. 74–75",
      "objective": "Isi tabel.. Ingat Kisi Desimal.",
      "mechanicDescription": "Tiga tabel. Gunakan Kisi Desimal.",
      "voiceGuide": "Kisi Desimal. Pilih.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-d",
      "title": "Ketuk Semua Jenis Diagram",
      "bookReference": "hlm. 73",
      "objective": "Ketuk semua.. Ingat Kisi Desimal.",
      "mechanicDescription": "Tiga ronde. Gunakan Kisi Desimal.",
      "voiceGuide": "Kisi Desimal. Ketuk semua.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-d",
      "title": "Pilah Diagram Desimal",
      "bookReference": "hlm. 73",
      "objective": "Pilah.. Ingat Kisi Desimal.",
      "mechanicDescription": "Tiga ronde. Gunakan Kisi Desimal.",
      "voiceGuide": "Kisi Desimal. Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "digit-rule",
      "title": "Aturan Digit Koma",
      "bookReference": "hlm. 73",
      "objective": "1 digit→10, 2 digit→100.. Ingat Kisi Desimal.",
      "mechanicDescription": "Tiga ronde. Gunakan Kisi Desimal.",
      "voiceGuide": "Kisi Desimal. Pilih.",
      "diagramType": "rule",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "choose-des",
      "title": "Pilih Desimal Cocok",
      "bookReference": "hlm. 72–74",
      "objective": "Pilih desimal.. Ingat Kisi Desimal.",
      "mechanicDescription": "Tiga ronde. Gunakan Kisi Desimal.",
      "voiceGuide": "Kisi Desimal. Pilih.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-d",
      "title": "Cerita Diagram Desimal",
      "bookReference": "hlm. 71–74",
      "objective": "Cerita + gambar.. Ingat Kisi Desimal.",
      "mechanicDescription": "Tiga ronde. Gunakan Kisi Desimal.",
      "voiceGuide": "Kisi Desimal. Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-des10",
      "title": "Tulis 0,p",
      "bookReference": "hlm. 72–74",
      "objective": "Pakai Jembatan Pecahan–Desimal: 0,3 = 3/10; 0,25 = 25/100. Latihan: Menulis persepuluhan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Fraction–Decimal Link: 0,3 = 3/10; 0,25 = 25/100.",
      "voiceGuide": "Jembatan Pecahan–Desimal. 0,3 = 3/10; 0,25 = 25/100.",
      "symbolLarge": "0,1",
      "wordLarge": "PERSEPULUHAN",
      "mathNotation": "p/10"
    },
    {
      "stage": "Abstract",
      "gameType": "write-des100",
      "title": "Tulis 0,pp",
      "bookReference": "hlm. 72–75",
      "objective": "Pakai Jembatan Pecahan–Desimal: 0,3 = 3/10; 0,25 = 25/100. Latihan: Menulis perseratusan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Fraction–Decimal Link: 0,3 = 3/10; 0,25 = 25/100.",
      "voiceGuide": "Jembatan Pecahan–Desimal. 0,3 = 3/10; 0,25 = 25/100.",
      "symbolLarge": "0,01",
      "wordLarge": "PERSERATUSAN",
      "mathNotation": "p/100"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-des-a",
      "title": "Pilih Bentuk Desimal",
      "bookReference": "hlm. 73–74",
      "objective": "Pakai Jembatan Pecahan–Desimal: 0,3 = 3/10; 0,25 = 25/100. Latihan: Memilih..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Fraction–Decimal Link: 0,3 = 3/10; 0,25 = 25/100.",
      "voiceGuide": "Jembatan Pecahan–Desimal. 0,3 = 3/10; 0,25 = 25/100.",
      "symbolLarge": "0,25",
      "wordLarge": "PILIH",
      "mathNotation": "desimal"
    },
    {
      "stage": "Abstract",
      "gameType": "order-des",
      "title": "Urutkan Desimal",
      "bookReference": "hlm. 74",
      "objective": "Pakai Jembatan Pecahan–Desimal: 0,3 = 3/10; 0,25 = 25/100. Latihan: Mengurutkan nilai..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Fraction–Decimal Link: 0,3 = 3/10; 0,25 = 25/100.",
      "voiceGuide": "Jembatan Pecahan–Desimal. 0,3 = 3/10; 0,25 = 25/100.",
      "symbolLarge": "0,01<0,1",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-d",
      "title": "Jodohkan Notasi Desimal",
      "bookReference": "hlm. 72–74",
      "objective": "Jodohkan.. Ingat Jembatan Pecahan–Desimal.",
      "mechanicDescription": "Tiga ronde. Gunakan Jembatan Pecahan–Desimal.",
      "voiceGuide": "Jembatan Pecahan–Desimal. Jodohkan.",
      "symbolLarge": "1/10",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-d",
      "title": "Memori Notasi Desimal",
      "bookReference": "hlm. 73",
      "objective": "Memori.. Ingat Jembatan Pecahan–Desimal.",
      "mechanicDescription": "Tiga ronde. Gunakan Jembatan Pecahan–Desimal.",
      "voiceGuide": "Jembatan Pecahan–Desimal. Balik kartu.",
      "symbolLarge": "0,07",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-d",
      "title": "Benar atau Salah: Desimal",
      "bookReference": "hlm. 71–74",
      "objective": "Menilai.. Ingat Jembatan Pecahan–Desimal.",
      "mechanicDescription": "Dua ronde. Gunakan Jembatan Pecahan–Desimal.",
      "voiceGuide": "Jembatan Pecahan–Desimal. Benar/salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-d",
      "title": "Detektif Desimal",
      "bookReference": "hlm. 71–74",
      "objective": "Petunjuk → desimal.. Ingat Jembatan Pecahan–Desimal.",
      "mechanicDescription": "Empat soal. Gunakan Jembatan Pecahan–Desimal.",
      "voiceGuide": "Jembatan Pecahan–Desimal. Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-d",
      "title": "Peta Konsep Desimal",
      "bookReference": "hlm. 71–73",
      "objective": "Mengisi kotak.. Ingat Jembatan Pecahan–Desimal.",
      "mechanicDescription": "Satu peta. Gunakan Jembatan Pecahan–Desimal.",
      "voiceGuide": "Jembatan Pecahan–Desimal. Pilih opsi.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-d",
      "title": "Cerita Angka Desimal",
      "bookReference": "hlm. 71–74",
      "objective": "Soal cerita.. Ingat Jembatan Pecahan–Desimal.",
      "mechanicDescription": "Tiga ronde. Gunakan Jembatan Pecahan–Desimal.",
      "voiceGuide": "Jembatan Pecahan–Desimal. Pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "🔟",
      "nama": "Persepuluhan",
      "isi": "Satu digit di belakang koma → penyebut 10 (contoh 1/10 = 0,1).",
      "suara": "Satu digit berarti persepuluhan."
    },
    {
      "ikon": "💯",
      "nama": "Perseratusan",
      "isi": "Dua digit di belakang koma → penyebut 100 (contoh 1/100 = 0,01).",
      "suara": "Dua digit berarti perseratusan."
    },
    {
      "ikon": "🌍",
      "nama": "Desimal Persepuluhan Perseratusan",
      "isi": "Digit setelah koma = persepuluhan dan perseratusan.",
      "suara": "Desimal Persepuluhan Perseratusan. Digit setelah koma = persepuluhan dan perseratusan."
    },
    {
      "ikon": "🌍",
      "nama": "Kisi Desimal",
      "isi": "Kisi 10×10 menunjukkan perseratusan.",
      "suara": "Kisi Desimal. Kisi 10×10 menunjukkan perseratusan."
    },
    {
      "ikon": "🌍",
      "nama": "Jembatan Pecahan–Desimal",
      "isi": "0,3 = 3/10; 0,25 = 25/100.",
      "suara": "Jembatan Pecahan–Desimal. 0,3 = 3/10; 0,25 = 25/100."
    }
  ],
  "poinSuara": "Ingat: Desimal Persepuluhan Perseratusan, Kisi Desimal, Jembatan Pecahan–Desimal.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Persepuluhan",
        "warna": "#FDE68A"
      },
      {
        "teks": "Perseratusan",
        "warna": "#BBF7D0"
      },
      {
        "teks": "Ubah",
        "warna": "#BFDBFE"
      },
      {
        "teks": "Cerita",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: terapkan Desimal Persepuluhan Perseratusan pada satu benda atau soal nyata, lalu ceritakan langkahmu.",
  "refleksi": [
    "Bagaimana Desimal Persepuluhan Perseratusan membantumu memahami soal?",
    "Kapan kamu memakai Kisi Desimal?",
    "Apa bedanya dengan hanya menghafal rumus atau langkah tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Decimal Tenths Hundredths",
      "namaId": "Desimal Persepuluhan Perseratusan",
      "asal": "Place-value decimals",
      "ringkas": "Digit setelah koma = persepuluhan dan perseratusan.",
      "tahap": [
        "Story",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Decimal Grid",
      "namaId": "Kisi Desimal",
      "asal": "Base-ten grid",
      "ringkas": "Kisi 10×10 menunjukkan perseratusan.",
      "tahap": [
        "Picture",
        "Infografis"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Fraction–Decimal Link",
      "namaId": "Jembatan Pecahan–Desimal",
      "asal": "Van de Walle",
      "ringkas": "0,3 = 3/10; 0,25 = 25/100.",
      "tahap": [
        "Mind",
        "Abstract"
      ]
    }
  ]
};

export const SUB_E42: SubBabNaskah = {
  "id": "E",
  "codeTitle": "Sub-Bab E (Desimal Perseratusan & Persen)",
  "fullTitle": "Sub-Bab E: Menghubungkan Pecahan Desimal Perseratusan dengan Konsep Persen",
  "targetDescription": "Siswa mengubah desimal perseratusan menjadi persen (0,75 = 75%) dengan cara biasa (via pecahan /100) maupun cara langsung (×100% / geser koma dua kali), serta mengubah balik persen ke desimal dan menyelesaikan cerita persen. Siswa memakai cara Persen sebagai Perseratusan, Kisi Seratus Persen, Jembatan Desimal–Persen.",
  "secondaryBg": "#FEF3C7",
  "secondaryBorder": "#D97706",
  "secondaryText": "#78350F",
  "silabus": {
    "teksSuara": "Kita menghubungkan desimal perseratusan dengan persen. Nol koma tujuh lima sama dengan tujuh puluh lima per seratus sama dengan tujuh puluh lima persen. Boleh pakai cara biasa atau langsung kali seratus persen. Geser koma dua kali ke kanan. Kita memakai cara dari luar buku: Persen sebagai Perseratusan (Percent as Hundredths); Kisi Seratus Persen (Hundred Grid Percent); Jembatan Desimal–Persen (Decimal–Percent Link). Persen artinya per seratus. Satu kotak dari 100 = 1%. 0,25 = 25%. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa mengubah pecahan desimal perseratusan menjadi persen dan sebaliknya, serta memakai persen dalam cerita.",
    "referensi": "Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 2 Sub-Bab E)."
  },
  "videos": [
    {
      "id": "K4B2E-V1",
      "judul": "Apa Itu Persen?",
      "subjudul": "Percent as Hundredths",
      "adegan": [
        {
          "id": "K4B2E-V1-1",
          "judul": "Diskon di toko",
          "ketukan": [
            "Bayangkan situasi nyata di kelas atau di rumah. Saat belanja sering ada diskon persen. Mari kita pahami bersama.",
            "Persen ditulis dengan tanda persen. Mari kita pahami bersama.",
            "Artinya per seratus. Mari kita pahami bersama.",
            "Ingat cara Persen sebagai Perseratusan: Persen artinya per seratus."
          ],
          "papan": [
            "diskon",
            "per 100",
            "5%=5/100",
            "persen"
          ]
        },
        {
          "id": "K4B2E-V1-2",
          "judul": "Dari desimal",
          "ketukan": [
            "Contoh: nol koma tujuh lima. Mari kita pahami bersama.",
            "Ubah jadi tujuh puluh lima per seratus. Mari kita pahami bersama.",
            "Lalu tulis tujuh puluh lima persen. Mari kita pahami bersama.",
            "Di sini kita memakai ide Percent as Hundredths — Persen artinya per seratus."
          ],
          "papan": [
            "0,75",
            "75/100",
            "75%",
            "hubungan"
          ]
        },
        {
          "id": "K4B2E-V1-3",
          "judul": "Dua cara",
          "ketukan": [
            "Cara biasa: lewat pecahan dulu. Mari kita pahami bersama.",
            "Cara langsung: kali seratus persen. Mari kita pahami bersama.",
            "Hasilnya sama. Mari kita pahami bersama.",
            "METODE LUAR · Persen sebagai Perseratusan: Persen artinya per seratus."
          ],
          "papan": [
            "cara biasa",
            "cara langsung",
            "sama",
            "pilih"
          ]
        }
      ]
    },
    {
      "id": "K4B2E-V2",
      "judul": "Latihan: Kisi Seratus Persen",
      "subjudul": "Hundred Grid Percent",
      "adegan": [
        {
          "id": "K4B2E-V2-1",
          "judul": "Kali seratus",
          "ketukan": [
            "Ambil nol koma tiga enam. Mari kita pahami bersama.",
            "Kalikan seratus persen. Mari kita pahami bersama.",
            "Hasil tiga puluh enam persen. Mari kita pahami bersama.",
            "Ingat cara Kisi Seratus Persen: Satu kotak dari 100 = 1%."
          ],
          "papan": [
            "0,36",
            "×100%",
            "36%",
            "cepat"
          ]
        },
        {
          "id": "K4B2E-V2-2",
          "judul": "Geser koma",
          "ketukan": [
            "Tips buku: geser koma dua kali ke kanan. Mari kita pahami bersama.",
            "Nol koma dua lima jadi dua puluh lima. Mari kita pahami bersama.",
            "Tambahkan tanda persen. Mari kita pahami bersama.",
            "Di sini kita memakai ide Hundred Grid Percent — Satu kotak dari 100 = 1%."
          ],
          "papan": [
            "geser 2×",
            "0,25",
            "25",
            "25%"
          ]
        },
        {
          "id": "K4B2E-V2-3",
          "judul": "Lebih dari 100%",
          "ketukan": [
            "Dua koma empat enam. Mari kita pahami bersama.",
            "Kali seratus persen. Mari kita pahami bersama.",
            "Hasil dua ratus empat puluh enam persen. Mari kita pahami bersama.",
            "METODE LUAR · Kisi Seratus Persen: Satu kotak dari 100 = 1%."
          ],
          "papan": [
            "2,46",
            "×100%",
            "246%",
            ">100%"
          ]
        }
      ]
    },
    {
      "id": "K4B2E-V3",
      "judul": "Siap pakai Decimal–Percent Link",
      "subjudul": "Decimal–Percent Link",
      "adegan": [
        {
          "id": "K4B2E-V3-1",
          "judul": "Olahraga",
          "ketukan": [
            "Lima puluh siswa di kelas. Mari kita pahami bersama.",
            "Dua puluh ikut olahraga. Mari kita pahami bersama.",
            "Ubah ke penyebut seratus. Mari kita pahami bersama.",
            "Ingat cara Jembatan Desimal–Persen: 0,25 = 25%."
          ],
          "papan": [
            "50 siswa",
            "20 olahraga",
            "×2",
            "40%"
          ]
        },
        {
          "id": "K4B2E-V3-2",
          "judul": "Balik ke desimal",
          "ketukan": [
            "Delapan belas persen. Mari kita pahami bersama.",
            "Bagi seratus. Mari kita pahami bersama.",
            "Hasil nol koma satu delapan. Mari kita pahami bersama.",
            "Di sini kita memakai ide Decimal–Percent Link — 0,25 = 25%."
          ],
          "papan": [
            "18%",
            "÷100",
            "0,18",
            "balik"
          ]
        },
        {
          "id": "K4B2E-V3-3",
          "judul": "Latihan siap",
          "ketukan": [
            "Ubah desimal ke persen. Mari kita pahami bersama.",
            "Ubah persen ke desimal. Mari kita pahami bersama.",
            "Selesaikan cerita persen. Mari kita pahami bersama.",
            "METODE LUAR · Jembatan Desimal–Persen: 0,25 = 25%."
          ],
          "papan": [
            "des→%",
            "%→des",
            "cerita",
            "siap"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Menghubungkan Pecahan Desimal Perseratusan dengan Konsep Persen. Apa yang ditanyakan?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Percent as Hundredths",
      "stepDesc": "Persen artinya per seratus.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Hundred Grid Percent",
      "stepDesc": "Satu kotak dari 100 = 1%.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Decimal–Percent Link",
      "stepDesc": "0,25 = 25%.",
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
      "judul": "%",
      "emoji": "％",
      "countNum": 100,
      "countWord": "per",
      "suara": "Per seratus."
    },
    {
      "judul": "0,75",
      "emoji": "🧮",
      "countNum": 75,
      "countWord": "desimal",
      "suara": "Contoh buku."
    },
    {
      "judul": "75/100",
      "emoji": "💯",
      "countNum": 75,
      "countWord": "pecahan",
      "suara": "Langkah biasa."
    },
    {
      "judul": "75%",
      "emoji": "✅",
      "countNum": 75,
      "countWord": "persen",
      "suara": "Hasil akhir."
    },
    {
      "judul": "×100%",
      "emoji": "⚡",
      "countNum": 100,
      "countWord": "langsung",
      "suara": "Cara cepat."
    },
    {
      "judul": "GESER",
      "emoji": "➡️",
      "countNum": 2,
      "countWord": "kanan",
      "suara": "Dua kali ke kanan."
    },
    {
      "judul": "246%",
      "emoji": "📈",
      "countNum": 246,
      "countWord": "besar",
      "suara": "Boleh >100%."
    },
    {
      "judul": "40%",
      "emoji": "🏫",
      "countNum": 40,
      "countWord": "cerita",
      "suara": "20/50 siswa."
    },
    {
      "judul": "0,18",
      "emoji": "↩️",
      "countNum": 18,
      "countWord": "balik",
      "suara": "18% → desimal."
    },
    {
      "judul": "INGAT",
      "emoji": "📜",
      "countNum": 1,
      "countWord": "tips",
      "suara": "Desimal ×100%."
    },
    {
      "judul": "Persen sebagai Perseratusan",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "ingat",
      "suara": "Persen artinya per seratus."
    },
    {
      "judul": "Kisi Seratus Persen",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "ingat",
      "suara": "Satu kotak dari 100 = 1%."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "des-ke-persen",
      "title": "Desimal Jadi Persen",
      "bookReference": "hlm. 76–78 (0,75→75%)",
      "objective": "Pakai Persen sebagai Perseratusan: Persen artinya per seratus. Latihan: 0,pp → persen..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Percent as Hundredths: Persen artinya per seratus.",
      "voiceGuide": "Persen sebagai Perseratusan. Persen artinya per seratus.",
      "emoji": "％",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "besar-persen",
      "title": "Persen Lebih dari 100",
      "bookReference": "hlm. 78–79 (2,46→246%)",
      "objective": "Pakai Persen sebagai Perseratusan: Persen artinya per seratus. Latihan: Desimal >1 jadi persen..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Percent as Hundredths: Persen artinya per seratus.",
      "voiceGuide": "Persen sebagai Perseratusan. Persen artinya per seratus.",
      "emoji": "📈",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "balik-persen",
      "title": "Persen Jadi Desimal",
      "bookReference": "hlm. 82",
      "objective": "Pakai Persen sebagai Perseratusan: Persen artinya per seratus. Latihan: % → 0,pp..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Percent as Hundredths: Persen artinya per seratus.",
      "voiceGuide": "Persen sebagai Perseratusan. Persen artinya per seratus.",
      "emoji": "↩️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cara-langsung",
      "title": "Cara Langsung ×100%",
      "bookReference": "hlm. 80–81",
      "objective": "Pakai Persen sebagai Perseratusan: Persen artinya per seratus. Latihan: Kalikan 100%..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Percent as Hundredths: Persen artinya per seratus.",
      "voiceGuide": "Persen sebagai Perseratusan. Persen artinya per seratus.",
      "emoji": "⚡",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-persen",
      "title": "Pilah Persen/Desimal",
      "bookReference": "hlm. 76–80",
      "objective": "Memilah bentuk.. Ingat Persen sebagai Perseratusan.",
      "mechanicDescription": "Tiga ronde. Gunakan Persen sebagai Perseratusan.",
      "voiceGuide": "Persen sebagai Perseratusan. Pilah.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-persen",
      "title": "Jodohkan Desimal–Persen",
      "bookReference": "hlm. 78–82",
      "objective": "Menjodohkan.. Ingat Persen sebagai Perseratusan.",
      "mechanicDescription": "Tiga ronde. Gunakan Persen sebagai Perseratusan.",
      "voiceGuide": "Persen sebagai Perseratusan. Jodohkan.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-persen",
      "title": "Memori Persen",
      "bookReference": "hlm. 78–81",
      "objective": "Memori.. Ingat Persen sebagai Perseratusan.",
      "mechanicDescription": "Tiga ronde. Gunakan Persen sebagai Perseratusan.",
      "voiceGuide": "Persen sebagai Perseratusan. Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-persen",
      "title": "Ketuk Persen Diminta",
      "bookReference": "hlm. 78–82",
      "objective": "Mengetuk.. Ingat Persen sebagai Perseratusan.",
      "mechanicDescription": "Tiga ronde. Gunakan Persen sebagai Perseratusan.",
      "voiceGuide": "Persen sebagai Perseratusan. Ketuk.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-persen",
      "title": "Ketuk Semua Syarat Persen",
      "bookReference": "hlm. 79–82",
      "objective": "Ketuk semua.. Ingat Persen sebagai Perseratusan.",
      "mechanicDescription": "Tiga ronde. Gunakan Persen sebagai Perseratusan.",
      "voiceGuide": "Persen sebagai Perseratusan. Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-persen",
      "title": "Cerita Diskon dan Kelas",
      "bookReference": "hlm. 75 & 79",
      "objective": "Soal cerita.. Ingat Persen sebagai Perseratusan.",
      "mechanicDescription": "Tiga ronde. Gunakan Persen sebagai Perseratusan.",
      "voiceGuide": "Persen sebagai Perseratusan. Pilih.",
      "emoji": "🛒",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "bar-persen",
      "title": "Batang ke Persen",
      "bookReference": "hlm. 76–78",
      "objective": "Pakai Kisi Seratus Persen: Satu kotak dari 100 = 1%. Latihan: Baca lalu ubah..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Hundred Grid Percent: Satu kotak dari 100 = 1%.",
      "voiceGuide": "Kisi Seratus Persen. Satu kotak dari 100 = 1%.",
      "diagramType": "bar",
      "numberA": 75,
      "numberB": 100
    },
    {
      "stage": "Picture",
      "gameType": "grid-persen",
      "title": "Kotak Seratus ke Persen",
      "bookReference": "hlm. 76–78",
      "objective": "Pakai Kisi Seratus Persen: Satu kotak dari 100 = 1%. Latihan: Grid → %..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Hundred Grid Percent: Satu kotak dari 100 = 1%.",
      "voiceGuide": "Kisi Seratus Persen. Satu kotak dari 100 = 1%.",
      "diagramType": "grid",
      "numberA": 35,
      "numberB": 100
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-e",
      "title": "Jodohkan Diagram Persen",
      "bookReference": "hlm. 78–82",
      "objective": "Pakai Kisi Seratus Persen: Satu kotak dari 100 = 1%. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Hundred Grid Percent: Satu kotak dari 100 = 1%.",
      "voiceGuide": "Kisi Seratus Persen. Satu kotak dari 100 = 1%.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-e",
      "title": "Memori Diagram Persen",
      "bookReference": "hlm. 80",
      "objective": "Pakai Kisi Seratus Persen: Satu kotak dari 100 = 1%. Latihan: Memori..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Hundred Grid Percent: Satu kotak dari 100 = 1%.",
      "voiceGuide": "Kisi Seratus Persen. Satu kotak dari 100 = 1%.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-e",
      "title": "Tabel Desimal → Persen",
      "bookReference": "hlm. 78–82",
      "objective": "Isi tabel.. Ingat Kisi Seratus Persen.",
      "mechanicDescription": "Tiga tabel. Gunakan Kisi Seratus Persen.",
      "voiceGuide": "Kisi Seratus Persen. Pilih.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-e",
      "title": "Ketuk Semua Diagram Persen",
      "bookReference": "hlm. 79",
      "objective": "Ketuk semua.. Ingat Kisi Seratus Persen.",
      "mechanicDescription": "Tiga ronde. Gunakan Kisi Seratus Persen.",
      "voiceGuide": "Kisi Seratus Persen. Ketuk semua.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-e",
      "title": "Pilah Bentuk Persen",
      "bookReference": "hlm. 80",
      "objective": "Pilah.. Ingat Kisi Seratus Persen.",
      "mechanicDescription": "Tiga ronde. Gunakan Kisi Seratus Persen.",
      "voiceGuide": "Kisi Seratus Persen. Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "geser-koma",
      "title": "Geser Koma Dua Kali",
      "bookReference": "hlm. 82",
      "objective": "Tips geser koma.. Ingat Kisi Seratus Persen.",
      "mechanicDescription": "Tiga ronde. Gunakan Kisi Seratus Persen.",
      "voiceGuide": "Kisi Seratus Persen. Pilih.",
      "diagramType": "shift",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "choose-persen",
      "title": "Pilih Persen Cocok",
      "bookReference": "hlm. 78–81",
      "objective": "Pilih persen.. Ingat Kisi Seratus Persen.",
      "mechanicDescription": "Tiga ronde. Gunakan Kisi Seratus Persen.",
      "voiceGuide": "Kisi Seratus Persen. Pilih.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-e",
      "title": "Cerita Diagram Persen",
      "bookReference": "hlm. 75–79",
      "objective": "Cerita + gambar.. Ingat Kisi Seratus Persen.",
      "mechanicDescription": "Tiga ronde. Gunakan Kisi Seratus Persen.",
      "voiceGuide": "Kisi Seratus Persen. Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-persen",
      "title": "Tulis …%",
      "bookReference": "hlm. 78–81",
      "objective": "Pakai Jembatan Desimal–Persen: 0,25 = 25%. Latihan: Menulis persen..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Decimal–Percent Link: 0,25 = 25%.",
      "voiceGuide": "Jembatan Desimal–Persen. 0,25 = 25%.",
      "symbolLarge": "75%",
      "wordLarge": "PERSEN",
      "mathNotation": "0,pp→%"
    },
    {
      "stage": "Abstract",
      "gameType": "write-balik",
      "title": "Tulis Desimal dari %",
      "bookReference": "hlm. 82",
      "objective": "Pakai Jembatan Desimal–Persen: 0,25 = 25%. Latihan: Menulis desimal..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Decimal–Percent Link: 0,25 = 25%.",
      "voiceGuide": "Jembatan Desimal–Persen. 0,25 = 25%.",
      "symbolLarge": "0,18",
      "wordLarge": "BALIK",
      "mathNotation": "%→0,pp"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-persen-a",
      "title": "Pilih Hasil Persen",
      "bookReference": "hlm. 78–82",
      "objective": "Pakai Jembatan Desimal–Persen: 0,25 = 25%. Latihan: Memilih..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Decimal–Percent Link: 0,25 = 25%.",
      "voiceGuide": "Jembatan Desimal–Persen. 0,25 = 25%.",
      "symbolLarge": "36%",
      "wordLarge": "PILIH",
      "mathNotation": "hasil"
    },
    {
      "stage": "Abstract",
      "gameType": "order-persen",
      "title": "Urutkan Persen/Desimal",
      "bookReference": "hlm. 79–82",
      "objective": "Pakai Jembatan Desimal–Persen: 0,25 = 25%. Latihan: Mengurutkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Decimal–Percent Link: 0,25 = 25%.",
      "voiceGuide": "Jembatan Desimal–Persen. 0,25 = 25%.",
      "symbolLarge": "5%<75%",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-e",
      "title": "Jodohkan Notasi Persen",
      "bookReference": "hlm. 78–82",
      "objective": "Jodohkan.. Ingat Jembatan Desimal–Persen.",
      "mechanicDescription": "Tiga ronde. Gunakan Jembatan Desimal–Persen.",
      "voiceGuide": "Jembatan Desimal–Persen. Jodohkan.",
      "symbolLarge": "0,35↔35%",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-e",
      "title": "Memori Notasi Persen",
      "bookReference": "hlm. 80",
      "objective": "Memori.. Ingat Jembatan Desimal–Persen.",
      "mechanicDescription": "Tiga ronde. Gunakan Jembatan Desimal–Persen.",
      "voiceGuide": "Jembatan Desimal–Persen. Balik kartu.",
      "symbolLarge": "25%",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-e",
      "title": "Benar atau Salah: Persen",
      "bookReference": "hlm. 75–82",
      "objective": "Menilai.. Ingat Jembatan Desimal–Persen.",
      "mechanicDescription": "Dua ronde. Gunakan Jembatan Desimal–Persen.",
      "voiceGuide": "Jembatan Desimal–Persen. Benar/salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-e",
      "title": "Detektif Persen",
      "bookReference": "hlm. 75–82",
      "objective": "Petunjuk → persen.. Ingat Jembatan Desimal–Persen.",
      "mechanicDescription": "Empat soal. Gunakan Jembatan Desimal–Persen.",
      "voiceGuide": "Jembatan Desimal–Persen. Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-e",
      "title": "Peta Konsep Persen",
      "bookReference": "hlm. 76–81",
      "objective": "Mengisi kotak.. Ingat Jembatan Desimal–Persen.",
      "mechanicDescription": "Satu peta. Gunakan Jembatan Desimal–Persen.",
      "voiceGuide": "Jembatan Desimal–Persen. Pilih opsi.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-e",
      "title": "Cerita Angka Persen",
      "bookReference": "hlm. 75–82",
      "objective": "Soal cerita.. Ingat Jembatan Desimal–Persen.",
      "mechanicDescription": "Tiga ronde. Gunakan Jembatan Desimal–Persen.",
      "voiceGuide": "Jembatan Desimal–Persen. Pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "％",
      "nama": "Arti %",
      "isi": "Persen adalah bentuk lain pecahan berpenyebut 100.",
      "suara": "Persen artinya per seratus."
    },
    {
      "ikon": "🧮",
      "nama": "Cara biasa",
      "isi": "Desimal → pecahan /100 → tulis %.",
      "suara": "Lewat pecahan dulu."
    },
    {
      "ikon": "🌍",
      "nama": "Persen sebagai Perseratusan",
      "isi": "Persen artinya per seratus.",
      "suara": "Persen sebagai Perseratusan. Persen artinya per seratus."
    },
    {
      "ikon": "🌍",
      "nama": "Kisi Seratus Persen",
      "isi": "Satu kotak dari 100 = 1%.",
      "suara": "Kisi Seratus Persen. Satu kotak dari 100 = 1%."
    },
    {
      "ikon": "🌍",
      "nama": "Jembatan Desimal–Persen",
      "isi": "0,25 = 25%.",
      "suara": "Jembatan Desimal–Persen. 0,25 = 25%."
    }
  ],
  "poinSuara": "Ingat: Persen sebagai Perseratusan, Kisi Seratus Persen, Jembatan Desimal–Persen.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Arti %",
        "warna": "#FDE68A"
      },
      {
        "teks": "Cara biasa",
        "warna": "#BBF7D0"
      },
      {
        "teks": "Cara langsung",
        "warna": "#BFDBFE"
      },
      {
        "teks": "Cerita",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: terapkan Persen sebagai Perseratusan pada satu benda atau soal nyata, lalu ceritakan langkahmu.",
  "refleksi": [
    "Bagaimana Persen sebagai Perseratusan membantumu memahami soal?",
    "Kapan kamu memakai Kisi Seratus Persen?",
    "Apa bedanya dengan hanya menghafal rumus atau langkah tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Percent as Hundredths",
      "namaId": "Persen sebagai Perseratusan",
      "asal": "Percent pedagogy",
      "ringkas": "Persen artinya per seratus.",
      "tahap": [
        "Story",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Hundred Grid Percent",
      "namaId": "Kisi Seratus Persen",
      "asal": "Visual percent",
      "ringkas": "Satu kotak dari 100 = 1%.",
      "tahap": [
        "Picture",
        "Infografis"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Decimal–Percent Link",
      "namaId": "Jembatan Desimal–Persen",
      "asal": "Number relationships",
      "ringkas": "0,25 = 25%.",
      "tahap": [
        "Mind",
        "Abstract"
      ]
    }
  ]
};

export const SUB_BAB_K4B2: SubBabNaskah[] = [SUB_A42, SUB_B42, SUB_C42, SUB_D42, SUB_E42];
export const semuaAdeganK4B2 = SUB_BAB_K4B2.flatMap((s) => s.videos.flatMap((v) => v.adegan));
