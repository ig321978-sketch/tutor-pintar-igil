/**
 * Naskah murni Matematika Kelas 4 Bab 1 (Bilangan Cacah sampai 10.000): Sub-Bab A (membaca & menulis),
 * B (nilai tempat), dan C (membandingkan & mengurutkan). Sumber: Buku Siswa Matematika Kelas IV
 * Kemendikbudristek Bab 1 hlm. 4–24, diperkaya Dienes empat tingkat, expanded form, dan place-value comparison.
 * Satu sumber: buat-k4-bab1.mjs → kelas4-bab1.json. Tanpa React/jaringan. Uji: scripts/uji-data-k4b1.mjs.
 */
import type { GameNaskah, SubBabNaskah } from "./naskah-k2b2";

export const K4B1_META = {
  "chapterId": "k4-mat-bab1",
  "phaseCode": "FASE_B",
  "grade": 4,
  "subjectLabel": "MATEMATIKA - KELAS 4 SD",
  "title": "BAB 1: BILANGAN CACAH SAMPAI 10.000",
  "silabusElemen": "🌈 Fase B • Elemen Bilangan: Membaca, Menulis, Nilai Tempat, Membandingkan, dan Mengurutkan Bilangan Cacah sampai 10.000 (Kelas 4 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A41: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Membaca dan Menulis Bilangan)",
  "fullTitle": "Sub-Bab A: Membaca dan Menulis Bilangan Cacah sampai 10.000",
  "targetDescription": "Siswa membaca dan menulis bilangan cacah empat angka sampai 10.000, termasuk bilangan dengan nol (7.003, 1.025, 6.570), memakai papan ribuan–satuan, serta memahami 10 dus = 1 peti (1.000).",
  "secondaryBg": "#DCFCE7",
  "secondaryBorder": "#16A34A",
  "secondaryText": "#14532D",
  "silabus": {
    "teksSuara": "Kita belajar membaca dan menulis bilangan cacah sampai sepuluh ribu. Helen melihat harga minuman enam ribu tujuh ratus lima puluh rupiah di minimarket, jarak rumah tiga ribu dua ratus delapan puluh enam meter, dan tinggi Gunung Semeru tiga ribu enam ratus tujuh puluh enam meter. Kita memakai kartu angka dan papan ribuan, ratusan, puluhan, satuan. Nol tidak dibaca, tetapi menjaga tempat saat menulis. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa membaca, menulis, membandingkan, dan mengurutkan bilangan cacah sampai 10.000. Pada sub-bab ini fokus membaca dan menulis.",
    "referensi": "Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 1 Sub-Bab A hlm. 4–11) dan metode Dienes empat tingkat (peti–dus–bungkus–benda)."
  },
  "videos": [
    {
      "id": "K4B1A-V1",
      "judul": "Helen di Minimarket",
      "subjudul": "Harga empat angka",
      "adegan": [
        {
          "id": "K4B1A-V1-1",
          "judul": "Belanja bersama Ibu",
          "ketukan": [
            "Helen mengantar Ibu ke minimarket untuk membeli bahan kue.",
            "Helen meminta minuman seharga enam ribu tujuh ratus lima puluh rupiah.",
            "Di rak makanan banyak label harga empat angka.",
            "Kita akan belajar membaca bilangan empat angka."
          ],
          "papan": [
            "Minimarket",
            "Rp6.750,00",
            "Banyak label harga",
            "Bilangan empat angka"
          ]
        },
        {
          "id": "K4B1A-V1-2",
          "judul": "Jarak 3.286 meter",
          "ketukan": [
            "Dari minimarket ke rumah Helen berjarak tiga ribu dua ratus delapan puluh enam meter.",
            "Ambil kartu angka 3, 2, 8, dan 6.",
            "Taruh di papan: ribuan 3, ratusan 2, puluhan 8, satuan 6.",
            "Dibaca: tiga ribu dua ratus delapan puluh enam."
          ],
          "papan": [
            "3.286 meter",
            "Kartu 3 2 8 6",
            "Papan empat tempat",
            "Tiga ribu dua ratus delapan puluh enam"
          ]
        },
        {
          "id": "K4B1A-V1-3",
          "judul": "Aturan membaca",
          "ketukan": [
            "Satuan dibaca angkanya saja.",
            "Puluhan ditambah kata puluh, ratusan ditambah ratus, ribuan ditambah ribu.",
            "Baca dari kiri ke kanan.",
            "Jika ada nol, tempat itu tidak dibaca."
          ],
          "papan": [
            "Satuan: angka",
            "Puluh, ratus, ribu",
            "Dari kiri",
            "Nol tidak dibaca"
          ]
        }
      ]
    },
    {
      "id": "K4B1A-V2",
      "judul": "Gunung Semeru",
      "subjudul": "Menulis dari kata",
      "adegan": [
        {
          "id": "K4B1A-V2-1",
          "judul": "Tinggi Mahameru",
          "ketukan": [
            "Gunung Semeru adalah gunung tertinggi di Pulau Jawa.",
            "Puncak Mahameru tingginya tiga ribu enam ratus tujuh puluh enam meter.",
            "Bagaimana menulis lambang bilangan itu?",
            "Dengar katanya, lalu tulis angkanya."
          ],
          "papan": [
            "Gunung Semeru",
            "Tiga ribu enam ratus tujuh puluh enam",
            "Menulis lambang",
            "Dengar lalu tulis"
          ]
        },
        {
          "id": "K4B1A-V2-2",
          "judul": "Menulis 3.254",
          "ketukan": [
            "Tiga ribu dua ratus lima puluh empat.",
            "Ribuan tiga, tulis 3. Ratusan dua, tulis 2.",
            "Puluhan lima, tulis 5. Satuan empat, tulis 4.",
            "Hasilnya 3.254."
          ],
          "papan": [
            "Tiga ribu…",
            "Ribuan 3, ratusan 2",
            "Puluhan 5, satuan 4",
            "3.254"
          ]
        },
        {
          "id": "K4B1A-V2-3",
          "judul": "Seribu, bukan satu ribu",
          "ketukan": [
            "Bilangan 1.025: ribuannya 1 dibaca seribu.",
            "Ratusannya 0, tidak ditulis dalam bacaan.",
            "Puluhan 2 dan satuan 5: dua puluh lima.",
            "Jadi dibaca seribu dua puluh lima."
          ],
          "papan": [
            "1.025",
            "Seribu",
            "Nol ratusan dilewati",
            "Seribu dua puluh lima"
          ]
        }
      ]
    },
    {
      "id": "K4B1A-V3",
      "judul": "Harga di Warung",
      "subjudul": "Latihan membaca",
      "adegan": [
        {
          "id": "K4B1A-V3-1",
          "judul": "Slamet belanja",
          "ketukan": [
            "Slamet membeli makanan ringan seharga tujuh ribu tiga ratus lima puluh rupiah.",
            "Uangnya sembilan ribu lima ratus rupiah.",
            "Kembalian dua ribu seratus lima puluh rupiah.",
            "Ayo baca ketiga bilangan itu."
          ],
          "papan": [
            "Rp7.350",
            "Rp9.500",
            "Rp2.150",
            "Baca ketiga"
          ]
        },
        {
          "id": "K4B1A-V3-2",
          "judul": "Jodohkan bacaan",
          "ketukan": [
            "2.903 dibaca dua ribu sembilan ratus tiga.",
            "6.002 dibaca enam ribu dua.",
            "9.045 dibaca sembilan ribu empat puluh lima.",
            "2.145 dibaca dua ribu seratus empat puluh lima."
          ],
          "papan": [
            "2.903",
            "6.002",
            "9.045",
            "2.145"
          ]
        },
        {
          "id": "K4B1A-V3-3",
          "judul": "Siap ke nilai tempat",
          "ketukan": [
            "Kita sudah bisa membaca dan menulis bilangan empat angka.",
            "Berikutnya kita pelajari nilai tiap tempat angka.",
            "Angka 2 pada 2.150 bernilai dua ribu, bukan dua.",
            "Siap lanjut ke Sub-Bab B."
          ],
          "papan": [
            "Membaca-menulis siap",
            "Nilai tempat",
            "2 bernilai 2.000",
            "Lanjut Sub-Bab B"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Empat angka",
      "stepDesc": "Empat angka pada bilangan sampai 10.000.",
      "icon": "4️⃣",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Ribuan",
      "stepDesc": "Ribuan pada bilangan sampai 10.000.",
      "icon": "🟣",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Cara membaca",
      "stepDesc": "Cara membaca pada bilangan sampai 10.000.",
      "icon": "🗣️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Angka nol",
      "stepDesc": "Angka nol pada bilangan sampai 10.000.",
      "icon": "⭕",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Menulis lambang",
      "stepDesc": "Menulis lambang pada bilangan sampai 10.000.",
      "icon": "✍️",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Kartu angka",
      "stepDesc": "Kartu angka pada bilangan sampai 10.000.",
      "icon": "🃏",
      "flowFrom": "5",
      "flowTo": "7"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Harga di minimarket",
      "stepDesc": "Harga di minimarket pada bilangan sampai 10.000.",
      "icon": "🏪",
      "flowFrom": "6",
      "flowTo": "8"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Siap membaca menulis",
      "stepDesc": "Siap membaca menulis pada bilangan sampai 10.000.",
      "icon": "✅",
      "flowFrom": "7",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "RIBUAN",
      "emoji": "🟣",
      "countNum": 1000,
      "countWord": "satu peti / seribu",
      "suara": "Tempat paling kiri pada bilangan empat angka adalah ribuan. Satu peti sama dengan seribu."
    },
    {
      "judul": "RATUSAN",
      "emoji": "🟢",
      "countNum": 100,
      "countWord": "satu dus / seratus",
      "suara": "Di kanan ribuan ada ratusan. Satu dus sama dengan seratus."
    },
    {
      "judul": "PULUHAN",
      "emoji": "🔵",
      "countNum": 10,
      "countWord": "satu bungkus / sepuluh",
      "suara": "Puluhan memakai kata puluh. Sepuluh satuan sama dengan satu puluhan."
    },
    {
      "judul": "SATUAN",
      "emoji": "🔴",
      "countNum": 1,
      "countWord": "benda lepas",
      "suara": "Satuan dibaca angkanya saja."
    },
    {
      "judul": "BACA DARI KIRI",
      "emoji": "⬅️",
      "countNum": 3286,
      "countWord": "tiga ribu dua ratus delapan puluh enam",
      "suara": "Baca dari ribuan ke satuan. Contoh 3.286."
    },
    {
      "judul": "NOL TIDAK DIBACA",
      "emoji": "⭕",
      "countNum": 7003,
      "countWord": "tujuh ribu tiga",
      "suara": "7.003 dibaca tujuh ribu tiga. Nol tidak dibaca."
    },
    {
      "judul": "SERIBU",
      "emoji": "1️⃣",
      "countNum": 1025,
      "countWord": "seribu dua puluh lima",
      "suara": "Ribuan 1 dibaca seribu, bukan satu ribu."
    },
    {
      "judul": "NOL MENJAGA TEMPAT",
      "emoji": "✍️",
      "countNum": 405,
      "countWord": "saat menulis tetap ditulis",
      "suara": "Saat menulis, nol menjaga tempat yang kosong."
    },
    {
      "judul": "SEPULUH DUS = SATU PETI",
      "emoji": "🔄",
      "countNum": 10,
      "countWord": "penukaran",
      "suara": "Sepuluh dus ditukar menjadi satu peti."
    },
    {
      "judul": "SAMPAI 10.000",
      "emoji": "🔟",
      "countNum": 10000,
      "countWord": "sepuluh ribu",
      "suara": "Batas bab ini adalah sepuluh ribu."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "build-with-exchange",
      "title": "Rakit Peti dan Dus",
      "bookReference": "hlm. 4–6 (kartu bilangan; 10 dus = 1 peti)",
      "objective": "Merakit bilangan empat angka dengan peti, dus, bungkus, dan benda lepas.",
      "mechanicDescription": "Tiga ronde, tiap ronde dua bilangan. Penukaran sepuluh otomatis. Tekan Periksa.",
      "voiceGuide": "Rakit bilangannya, lalu periksa.",
      "emoji": "📦",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "count-packages",
      "title": "Hitung Kemasan Empat Tingkat",
      "bookReference": "hlm. 5–6 (membaca 3.286)",
      "objective": "Menghitung peti, dus, bungkus, dan benda lalu memilih lambangnya.",
      "mechanicDescription": "Tiga ronde, dua soal. Pilih satu dari tiga bilangan.",
      "voiceGuide": "Hitung kemasannya.",
      "emoji": "🔢",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-packages",
      "title": "Pilah Peti, Dus, Bungkus, Satuan",
      "bookReference": "hlm. 5–6 (ribuan sampai satuan)",
      "objective": "Memilah kemasan menurut nilainya.",
      "mechanicDescription": "Tiga ronde, enam kelompok ke empat kotak.",
      "voiceGuide": "Pilah ke kotak nilainya.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-package-number",
      "title": "Jodohkan Kemasan dan Bilangan",
      "bookReference": "hlm. 6 (nama bilangan 3.286)",
      "objective": "Menjodohkan kumpulan dengan lambang.",
      "mechanicDescription": "Tiga ronde, tiga pasangan.",
      "voiceGuide": "Ketuk kumpulan, lalu bilangannya.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "memory-package-number",
      "title": "Memori Kemasan dan Bilangan",
      "bookReference": "hlm. 6–11",
      "objective": "Mencocokkan kumpulan dan lambang lewat memori.",
      "mechanicDescription": "Tiga ronde, empat pasang.",
      "voiceGuide": "Balik dua kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-read-package",
      "title": "Ketuk Kumpulan yang Dibaca",
      "bookReference": "hlm. 6 (cara membaca)",
      "objective": "Mendengar kata bilangan lalu mengetuk kumpulan.",
      "mechanicDescription": "Tiga ronde, tiga kumpulan mirip.",
      "voiceGuide": "Ketuk yang sesuai bacaan.",
      "emoji": "👆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-packages",
      "title": "Ketuk Semua yang Cocok",
      "bookReference": "hlm. 9–11 (nol pada tempat)",
      "objective": "Menemukan semua kumpulan dengan syarat digit.",
      "mechanicDescription": "Tiga ronde, empat kumpulan.",
      "voiceGuide": "Ketuk semua yang cocok.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "read-package-words",
      "title": "Baca Kumpulan",
      "bookReference": "hlm. 6–9 (3.286, 7.003, 1.025)",
      "objective": "Memilih cara membaca yang benar.",
      "mechanicDescription": "Tiga ronde, dua soal.",
      "voiceGuide": "Pilih cara membaca.",
      "emoji": "🗣️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "board-from-package",
      "title": "Papan dari Kumpulan",
      "bookReference": "hlm. 6 (tabel Ribuan–Satuan)",
      "objective": "Mengisi papan empat kolom dari kumpulan.",
      "mechanicDescription": "Tiga ronde, dua soal.",
      "voiceGuide": "Isi papan dari kumpulan.",
      "emoji": "🗂️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "exchange-packages",
      "title": "Tukar Kemasan sampai Peti",
      "bookReference": "hlm. 5–6 (10→1)",
      "objective": "Memahami penukaran sampai peti 1.000.",
      "mechanicDescription": "Tiga ronde, dua soal.",
      "voiceGuide": "Pilih hasil penukaran.",
      "emoji": "🔄",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "count-blocks",
      "title": "Hitung Blok Empat Tempat",
      "bookReference": "hlm. 6",
      "objective": "Membaca model blok menjadi lambang.",
      "mechanicDescription": "Tiga ronde, dua soal.",
      "voiceGuide": "Hitung blok.",
      "diagramType": "blocks-count",
      "numberA": 4,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "board-from-blocks",
      "title": "Papan dari Blok",
      "bookReference": "hlm. 6 dan 14",
      "objective": "Mengisi papan dari model blok.",
      "mechanicDescription": "Tiga ronde, dua soal.",
      "voiceGuide": "Isi papan dari blok.",
      "diagramType": "blocks-board",
      "numberA": 4,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "fill-block-table",
      "title": "Isi Tabel Blok",
      "bookReference": "hlm. 16 (tabel nilai tempat)",
      "objective": "Mengisi digit pada tabel dari model.",
      "mechanicDescription": "Tiga tabel, tiga baris.",
      "voiceGuide": "Ketuk sel tabel.",
      "diagramType": "blocks-table",
      "numberA": 4,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "match-block-number",
      "title": "Jodohkan Blok dan Bilangan",
      "bookReference": "hlm. 6",
      "objective": "Menjodohkan model dengan lambang.",
      "mechanicDescription": "Tiga ronde, tiga pasangan.",
      "voiceGuide": "Ketuk model, lalu bilangan.",
      "diagramType": "blocks-match",
      "numberA": 4,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memory-block-word",
      "title": "Memori Blok dan Kata",
      "bookReference": "hlm. 6–9",
      "objective": "Mencocokkan model dengan kata.",
      "mechanicDescription": "Tiga ronde, empat pasang.",
      "voiceGuide": "Balik dua kartu.",
      "diagramType": "blocks-memory",
      "numberA": 4,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "tap-block-read",
      "title": "Ketuk Blok yang Dibaca",
      "bookReference": "hlm. 6–9",
      "objective": "Mengetuk model sesuai bacaan.",
      "mechanicDescription": "Tiga ronde, dua pertanyaan.",
      "voiceGuide": "Ketuk blok yang dibaca.",
      "diagramType": "blocks-tap",
      "numberA": 4,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "number-line-read",
      "title": "Garis Bilangan Ribuan",
      "bookReference": "hlm. 4–11",
      "objective": "Menemukan bilangan pada garis.",
      "mechanicDescription": "Tiga ronde, dua soal.",
      "voiceGuide": "Ketuk bilangan pada garis.",
      "diagramType": "number-line",
      "numberA": 4,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-blocks",
      "title": "Ketuk Semua Blok",
      "bookReference": "hlm. 9–11",
      "objective": "Memilih model sesuai syarat digit.",
      "mechanicDescription": "Tiga ronde, empat model.",
      "voiceGuide": "Ketuk semua yang cocok.",
      "diagramType": "blocks-select",
      "numberA": 4,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-zero-blocks",
      "title": "Pilah Blok: Ada Nol atau Tidak",
      "bookReference": "hlm. 6–9 (nol tidak dibaca)",
      "objective": "Memilah model ada nol / tanpa nol.",
      "mechanicDescription": "Tiga ronde, enam model.",
      "voiceGuide": "Pilah ke kotak.",
      "diagramType": "blocks-sort",
      "numberA": 4,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "complete-block-sentence",
      "title": "Lengkapi Kalimat Blok",
      "bookReference": "hlm. 6–14",
      "objective": "Melengkapi kalimat tentang digit tempat.",
      "mechanicDescription": "Tiga model, tiga kalimat.",
      "voiceGuide": "Pilih angka untuk kosong.",
      "diagramType": "blocks-sentence",
      "numberA": 4,
      "numberB": 3
    },
    {
      "stage": "Abstract",
      "gameType": "compose-four-cards",
      "title": "Susun Empat Kartu",
      "bookReference": "hlm. 5–8 (kartu bilangan)",
      "objective": "Menulis lambang dari kata dengan empat kartu.",
      "mechanicDescription": "Tiga ronde, dua soal.",
      "voiceGuide": "Susun kartu menjadi bilangan.",
      "symbolLarge": "3.286",
      "wordLarge": "SUSUN KARTU",
      "mathNotation": "kata → angka"
    },
    {
      "stage": "Abstract",
      "gameType": "read-number-choice",
      "title": "Baca Bilangan Empat Angka",
      "bookReference": "hlm. 6–9",
      "objective": "Memilih cara membaca yang benar.",
      "mechanicDescription": "Tiga ronde, dua soal.",
      "voiceGuide": "Pilih cara membaca.",
      "symbolLarge": "3.286",
      "wordLarge": "BACA",
      "mathNotation": "angka → kata"
    },
    {
      "stage": "Abstract",
      "gameType": "write-on-board",
      "title": "Tulis Lambang di Papan",
      "bookReference": "hlm. 7–9 (menulis 3.254)",
      "objective": "Menulis dari kata ke papan empat kolom.",
      "mechanicDescription": "Tiga ronde, dua soal.",
      "voiceGuide": "Tulis di papan.",
      "symbolLarge": "3.254",
      "wordLarge": "TULIS",
      "mathNotation": "kata → angka"
    },
    {
      "stage": "Abstract",
      "gameType": "match-number-word",
      "title": "Jodohkan Angka dan Kata",
      "bookReference": "hlm. 11 (hubungkan)",
      "objective": "Menjodohkan lambang dan bacaan.",
      "mechanicDescription": "Tiga ronde, tiga pasang.",
      "voiceGuide": "Ketuk angka, lalu kata.",
      "symbolLarge": "2.903",
      "wordLarge": "JODOHKAN",
      "mathNotation": "angka • kata"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-number-word",
      "title": "Memori Angka dan Kata",
      "bookReference": "hlm. 11",
      "objective": "Memori lambang dan kata.",
      "mechanicDescription": "Tiga ronde, empat pasang.",
      "voiceGuide": "Balik dua kartu.",
      "symbolLarge": "3.050",
      "wordLarge": "MEMORI",
      "mathNotation": "angka • kata"
    },
    {
      "stage": "Abstract",
      "gameType": "fill-reading-table",
      "title": "Isi Tabel Cara Membaca",
      "bookReference": "hlm. 11",
      "objective": "Melengkapi tabel bacaan.",
      "mechanicDescription": "Tiga tabel, empat baris.",
      "voiceGuide": "Isi dengan kartu bacaan.",
      "symbolLarge": "7.350",
      "wordLarge": "TABEL",
      "mathNotation": "bilangan • dibaca"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-reading",
      "title": "Benar atau Salah: Membaca",
      "bookReference": "hlm. 4–11",
      "objective": "Menilai pernyataan membaca/menulis.",
      "mechanicDescription": "Dua ronde, lima pernyataan.",
      "voiceGuide": "Benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-number",
      "title": "Detektif Bilangan Empat Angka",
      "bookReference": "hlm. 8–11",
      "objective": "Menemukan bilangan dari dua petunjuk.",
      "mechanicDescription": "Empat soal.",
      "voiceGuide": "Baca petunjuk, pilih bilangan.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "dua petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "select-all-numbers",
      "title": "Ketuk Semua yang Cocok: Angka",
      "bookReference": "hlm. 9–11",
      "objective": "Memilih bilangan sesuai syarat digit.",
      "mechanicDescription": "Tiga ronde, empat bilangan.",
      "voiceGuide": "Ketuk semua yang cocok.",
      "symbolLarge": "✔✔",
      "wordLarge": "SEMUA COCOK",
      "mathNotation": "syarat digit"
    },
    {
      "stage": "Abstract",
      "gameType": "build-number-sentence",
      "title": "Susun Kata Bilangan",
      "bookReference": "hlm. 6–9",
      "objective": "Menyusun kalimat tentang bilangan.",
      "mechanicDescription": "Empat kalimat.",
      "voiceGuide": "Susun kartu kata.",
      "symbolLarge": "Aa",
      "wordLarge": "SUSUN KATA",
      "mathNotation": "kalimat"
    }
  ],
  "poin": [
    {
      "ikon": "🟣",
      "nama": "Empat tempat",
      "isi": "ribuan, ratusan, puluhan, satuan",
      "suara": "Bilangan empat angka punya empat tempat dari kiri: ribuan, ratusan, puluhan, dan satuan."
    },
    {
      "ikon": "🗣️",
      "nama": "Baca dari kiri",
      "isi": "3.286 = tiga ribu dua ratus delapan puluh enam",
      "suara": "Baca dari ribuan. 3.286 dibaca tiga ribu dua ratus delapan puluh enam."
    },
    {
      "ikon": "⭕",
      "nama": "Nol tidak dibaca",
      "isi": "7.003 = tujuh ribu tiga",
      "suara": "Nol tidak dibaca. 7.003 dibaca tujuh ribu tiga."
    },
    {
      "ikon": "1️⃣",
      "nama": "Seribu",
      "isi": "1.025 = seribu dua puluh lima",
      "suara": "Ribuan 1 dibaca seribu."
    },
    {
      "ikon": "🔄",
      "nama": "10 dus = 1 peti",
      "isi": "1.000 satuan",
      "suara": "Sepuluh dus sama dengan satu peti atau seribu."
    }
  ],
  "poinSuara": "Ingat! Empat tempat: ribuan, ratusan, puluhan, satuan. Baca dari kiri. Nol tidak dibaca. Ribuan 1 dibaca seribu. Sepuluh dus sama dengan satu peti.",
  "cara": {
    "suara": "Cara membaca. Lihat ribuan, ratusan, puluhan, satuan. Baca berurutan, lewati nol.",
    "potongan": [
      {
        "teks": "ribuan",
        "warna": "#DDD6FE"
      },
      {
        "teks": "ratusan",
        "warna": "#BBF7D0"
      },
      {
        "teks": "puluhan",
        "warna": "#BFDBFE"
      },
      {
        "teks": "lewati nol",
        "warna": "#FDE68A"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: catat lima harga empat angka di warung atau struk belanja. Tulis lambangnya, tandai ribuan–satuan dengan empat warna, lalu bacakan.",
  "refleksi": [
    "Aku dapat membaca bilangan empat angka.",
    "Aku dapat menulis lambangnya dari kata.",
    "Aku teliti saat ada nol.",
    "Aku berani menjelaskan kepada teman."
  ]
};

export const SUB_B41: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Nilai Tempat)",
  "fullTitle": "Sub-Bab B: Menentukan dan Menggunakan Nilai Tempat Bilangan Cacah sampai 10.000",
  "targetDescription": "Siswa menentukan tempat dan nilai setiap angka pada bilangan empat angka (pada 2.150, angka 2 bernilai 2.000), menyusun dan mengurai bilangan, serta mengisi tabel digit ribuan–satuan.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Kita belajar nilai tempat. Empat kardus: ribuan, ratusan, puluhan, satuan. Pada 2.150, angka 2 bernilai dua ribu, angka 1 bernilai seratus, angka 5 bernilai lima puluh, angka 0 bernilai nol di satuan. Kita mengurai bilangan dan mengisi tabel digit. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menentukan nilai tempat bilangan cacah sampai 10.000.",
    "referensi": "Buku Siswa Matematika Kelas IV (Bab 1 Sub-Bab B hlm. 12–16), aktivitas empat kardus, dan expanded form."
  },
  "videos": [
    {
      "id": "K4B1B-V1",
      "judul": "Empat Kardus",
      "subjudul": "Aktivitas nilai tempat",
      "adegan": [
        {
          "id": "K4B1B-V1-1",
          "judul": "Siapkan kardus",
          "ketukan": [
            "Siapkan empat kardus berlabel ribuan, ratusan, puluhan, dan satuan.",
            "Warnai biru, oranye, hijau, dan merah.",
            "Susun dari kiri ke kanan.",
            "Masukkan kartu angka 0 sampai 9 ke tiap kardus."
          ],
          "papan": [
            "Empat kardus",
            "Empat warna",
            "Kiri ke kanan",
            "Kartu 0–9"
          ]
        },
        {
          "id": "K4B1B-V1-2",
          "judul": "Ambil satu dari tiap kardus",
          "ketukan": [
            "Ambil satu kartu dari tiap kardus.",
            "Susun menjadi bilangan empat angka.",
            "Sebut tempat tiap angka.",
            "Lalu sebut bilangan utuhnya."
          ],
          "papan": [
            "Satu kartu per kardus",
            "Susun empat angka",
            "Sebut tempatnya",
            "Sebut bilangannya"
          ]
        },
        {
          "id": "K4B1B-V1-3",
          "judul": "Contoh 2.150",
          "ketukan": [
            "2.150 dibaca dua ribu seratus lima puluh.",
            "Angka 2 di ribuan, 1 di ratusan, 5 di puluhan, 0 di satuan.",
            "Nilainya: 2.000, 100, 50, dan 0.",
            "Itulah nilai tempat."
          ],
          "papan": [
            "2.150",
            "Tempat digit",
            "Nilai 2000+100+50+0",
            "Nilai tempat"
          ]
        }
      ]
    },
    {
      "id": "K4B1B-V2",
      "judul": "Uraian dan Tabel",
      "subjudul": "Dari digit ke nilai",
      "adegan": [
        {
          "id": "K4B1B-V2-1",
          "judul": "Uraikan",
          "ketukan": [
            "Mengurai berarti menulis nilai tiap tempat.",
            "2.150 = 2.000 + 100 + 50 + 0.",
            "7.350 = 7.000 + 300 + 50 + 0.",
            "Angka nol tetap ditulis pada uraian agar tempatnya jelas."
          ],
          "papan": [
            "Uraian",
            "2.150",
            "7.350",
            "Nol tetap ada"
          ]
        },
        {
          "id": "K4B1B-V2-2",
          "judul": "Tabel digit",
          "ketukan": [
            "Pada tabel, kita menulis digitnya, bukan nilai penuh.",
            "Untuk 7.812 tulis 7 | 8 | 1 | 2.",
            "Jangan menulis 7000 di kolom ribuan.",
            "Digit dan nilai jangan tertukar."
          ],
          "papan": [
            "Tabel digit",
            "7 8 1 2",
            "Bukan 7000",
            "Digit ≠ nilai"
          ]
        },
        {
          "id": "K4B1B-V2-3",
          "judul": "Angka 6 di mana",
          "ketukan": [
            "Pada 8.463, angka 6 ada di puluhan, nilainya 60.",
            "Pada 4.675, angka 6 di ratusan, nilainya 600.",
            "Tempat mengubah nilai angka yang sama.",
            "Latih dengan teliti."
          ],
          "papan": [
            "8.463 → 60",
            "4.675 → 600",
            "Tempat mengubah nilai",
            "Latihan"
          ]
        }
      ]
    },
    {
      "id": "K4B1B-V3",
      "judul": "Struk Belanja",
      "subjudul": "Nilai tempat pada harga",
      "adegan": [
        {
          "id": "K4B1B-V3-1",
          "judul": "Harga kue",
          "ketukan": [
            "Azizah menjual kue. Slamet membeli seharga 7.350.",
            "Uangnya 9.500. Kembalian 2.150.",
            "Tentukan nilai tempat tiap harga.",
            "Ribuan menentukan besar uang paling kuat."
          ],
          "papan": [
            "7.350",
            "9.500",
            "2.150",
            "Nilai tempat"
          ]
        },
        {
          "id": "K4B1B-V3-2",
          "judul": "Lengkapi tabel",
          "ketukan": [
            "Salin tabel: 6.192, 2.910, 4.128, 9.217.",
            "Isi digit ribuan, ratusan, puluhan, satuan.",
            "Contoh 6.192: 6, 1, 9, 2.",
            "Periksa lagi sebelum selesai."
          ],
          "papan": [
            "Tabel buku",
            "Isi digit",
            "6.192 → 6 1 9 2",
            "Periksa"
          ]
        },
        {
          "id": "K4B1B-V3-3",
          "judul": "Siap membandingkan",
          "ketukan": [
            "Nilai tempat siap dipakai untuk membandingkan.",
            "Kita bandingkan ribuan dulu.",
            "Bila sama, lanjut ratusan, puluhan, satuan.",
            "Lanjut ke Sub-Bab C."
          ],
          "papan": [
            "Nilai tempat siap",
            "Ribuan dulu",
            "Lanjut tempat kanan",
            "Sub-Bab C"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Nilai tempat",
      "stepDesc": "Nilai tempat pada bilangan sampai 10.000.",
      "icon": "📍",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Empat kardus",
      "stepDesc": "Empat kardus pada bilangan sampai 10.000.",
      "icon": "📦",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Digit dan nilai",
      "stepDesc": "Digit dan nilai pada bilangan sampai 10.000.",
      "icon": "🔢",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Uraian",
      "stepDesc": "Uraian pada bilangan sampai 10.000.",
      "icon": "🔓",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Tabel digit",
      "stepDesc": "Tabel digit pada bilangan sampai 10.000.",
      "icon": "📋",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Angka nol",
      "stepDesc": "Angka nol pada bilangan sampai 10.000.",
      "icon": "⭕",
      "flowFrom": "5",
      "flowTo": "7"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Harga struk",
      "stepDesc": "Harga struk pada bilangan sampai 10.000.",
      "icon": "🧾",
      "flowFrom": "6",
      "flowTo": "8"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Siap nilai tempat",
      "stepDesc": "Siap nilai tempat pada bilangan sampai 10.000.",
      "icon": "✅",
      "flowFrom": "7",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "DIGIT ≠ NILAI",
      "emoji": "⚖️",
      "countNum": 2,
      "countWord": "digit 2 bisa bernilai 2.000",
      "suara": "Digit adalah angka yang tertulis. Nilainya bergantung pada tempat."
    },
    {
      "judul": "RIBUAN ×1000",
      "emoji": "🟣",
      "countNum": 2000,
      "countWord": "2 di ribuan = 2.000",
      "suara": "Angka di ribuan dikali seribu."
    },
    {
      "judul": "RATUSAN ×100",
      "emoji": "🟢",
      "countNum": 100,
      "countWord": "1 di ratusan = 100",
      "suara": "Angka di ratusan dikali seratus."
    },
    {
      "judul": "PULUHAN ×10",
      "emoji": "🔵",
      "countNum": 50,
      "countWord": "5 di puluhan = 50",
      "suara": "Angka di puluhan dikali sepuluh."
    },
    {
      "judul": "SATUAN ×1",
      "emoji": "🔴",
      "countNum": 0,
      "countWord": "0 di satuan = 0",
      "suara": "Angka di satuan dikali satu."
    },
    {
      "judul": "URAIAN",
      "emoji": "🔓",
      "countNum": 2150,
      "countWord": "2000+100+50+0",
      "suara": "Uraian menulis nilai tiap tempat."
    },
    {
      "judul": "TABEL DIGIT",
      "emoji": "📋",
      "countNum": 7812,
      "countWord": "7|8|1|2",
      "suara": "Tabel diisi digit, bukan nilai penuh."
    },
    {
      "judul": "EMPAT KARDUS",
      "emoji": "📦",
      "countNum": 4,
      "countWord": "aktivitas buku",
      "suara": "Empat kardus membantu menyusun bilangan."
    },
    {
      "judul": "TEMPAT MENGUBAH NILAI",
      "emoji": "6️⃣",
      "countNum": 60,
      "countWord": "6 di puluhan = 60",
      "suara": "Angka sama, tempat beda, nilai beda."
    },
    {
      "judul": "SIAP BANDING",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "lanjut Sub-Bab C",
      "suara": "Nilai tempat dipakai untuk membandingkan."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "value-from-package",
      "title": "Nilai Tempat dari Kumpulan",
      "bookReference": "hlm. 12–14 (2.150)",
      "objective": "Menentukan nilai tempat angka pada kumpulan.",
      "mechanicDescription": "Tiga ronde, dua soal.",
      "voiceGuide": "Pilih nilai tempatnya.",
      "emoji": "📍",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "compose-from-parts",
      "title": "Susun dari Peti sampai Satuan",
      "bookReference": "hlm. 13–14",
      "objective": "Menyusun bilangan dari digit tempat.",
      "mechanicDescription": "Tiga ronde, dua soal di papan.",
      "voiceGuide": "Susun di papan.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "expand-package",
      "title": "Uraikan Kumpulan",
      "bookReference": "hlm. 14",
      "objective": "Mengurai menjadi 2000+100+50+0.",
      "mechanicDescription": "Tiga ronde, dua soal.",
      "voiceGuide": "Pilih uraian.",
      "emoji": "🔓",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "fill-place-table-c",
      "title": "Isi Tabel dari Kumpulan",
      "bookReference": "hlm. 14–16",
      "objective": "Mengisi digit tabel dari kumpulan.",
      "mechanicDescription": "Tiga tabel.",
      "voiceGuide": "Ketuk sel.",
      "emoji": "📋",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "match-digit-value-c",
      "title": "Jodohkan Digit dan Nilainya",
      "bookReference": "hlm. 14 (angka 2 bernilai 2.000)",
      "objective": "Menjodohkan digit tempat dengan nilainya.",
      "mechanicDescription": "Tiga ronde, tiga pasangan.",
      "voiceGuide": "Ketuk digit, lalu nilai.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "memory-value-c",
      "title": "Memori Nilai Tempat",
      "bookReference": "hlm. 14",
      "objective": "Memori nilai tempat.",
      "mechanicDescription": "Tiga ronde, empat pasang.",
      "voiceGuide": "Balik dua kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-place-c",
      "title": "Ketuk Tempat Angka",
      "bookReference": "hlm. 14",
      "objective": "Mengetuk tempat digit tertentu.",
      "mechanicDescription": "Tiga ronde, dua pertanyaan.",
      "voiceGuide": "Ketuk tempatnya.",
      "emoji": "👆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-value-c",
      "title": "Ketuk Semua Syarat Nilai",
      "bookReference": "hlm. 15",
      "objective": "Memilih kumpulan sesuai syarat.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua yang cocok.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "board-value-c",
      "title": "Papan Nilai dari Cerita Harga",
      "bookReference": "hlm. 15 (struk 7.350)",
      "objective": "Mengisi papan dari harga.",
      "mechanicDescription": "Tiga ronde, dua soal.",
      "voiceGuide": "Isi papan.",
      "emoji": "🗂️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "digit-six-c",
      "title": "Di Mana Angka Enam",
      "bookReference": "hlm. 15 (nilai tempat angka 6)",
      "objective": "Menemukan nilai tempat angka 6.",
      "mechanicDescription": "Tiga ronde, dua soal.",
      "voiceGuide": "Pilih nilai tempat 6.",
      "emoji": "6️⃣",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "value-from-blocks",
      "title": "Nilai Tempat dari Blok",
      "bookReference": "hlm. 14",
      "objective": "Nilai digit dari model.",
      "mechanicDescription": "Tiga ronde, dua soal.",
      "voiceGuide": "Pilih nilai.",
      "diagramType": "blocks-value",
      "numberA": 4,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "board-from-blocks-b",
      "title": "Papan dari Blok B",
      "bookReference": "hlm. 14–16",
      "objective": "Isi papan dari blok.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Isi papan.",
      "diagramType": "blocks-board",
      "numberA": 4,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "fill-table-b",
      "title": "Isi Tabel Nilai Tempat",
      "bookReference": "hlm. 16",
      "objective": "Lengkapi tabel 6.192 dst.",
      "mechanicDescription": "Tiga tabel.",
      "voiceGuide": "Ketuk sel.",
      "diagramType": "place-table",
      "numberA": 4,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "match-blocks-value",
      "title": "Jodohkan Blok dan Uraian",
      "bookReference": "hlm. 14",
      "objective": "Model dengan uraian.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk model, lalu uraian.",
      "diagramType": "blocks-expand",
      "numberA": 4,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memory-expand",
      "title": "Memori Uraian",
      "bookReference": "hlm. 14",
      "objective": "Memori bilangan dan uraian.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik dua kartu.",
      "diagramType": "expand-memory",
      "numberA": 4,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "expand-choice",
      "title": "Pilih Uraian",
      "bookReference": "hlm. 14",
      "objective": "Memilih uraian benar.",
      "mechanicDescription": "Tiga ronde, dua soal.",
      "voiceGuide": "Pilih uraian.",
      "diagramType": "expand-choice",
      "numberA": 4,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-blocks-b",
      "title": "Ketuk Semua Blok B",
      "bookReference": "hlm. 15",
      "objective": "Syarat digit pada model.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "diagramType": "blocks-select",
      "numberA": 4,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-thousands",
      "title": "Pilah menurut Ribuan",
      "bookReference": "hlm. 14",
      "objective": "Memilah menurut digit ribuan.",
      "mechanicDescription": "Tiga ronde, enam model.",
      "voiceGuide": "Pilah ke kotak.",
      "diagramType": "blocks-sort",
      "numberA": 4,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "sentence-place",
      "title": "Lengkapi Kalimat Nilai Tempat",
      "bookReference": "hlm. 14–15",
      "objective": "Kalimat tentang nilai digit.",
      "mechanicDescription": "Tiga bilangan, tiga kalimat.",
      "voiceGuide": "Pilih isian.",
      "diagramType": "place-sentence",
      "numberA": 4,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-value-chips",
      "title": "Ketuk Chip Nilai",
      "bookReference": "hlm. 14",
      "objective": "Mengetuk chip 2000/100/50/0.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk nilai yang diminta.",
      "diagramType": "value-chips",
      "numberA": 4,
      "numberB": 4
    },
    {
      "stage": "Abstract",
      "gameType": "compose-board-b",
      "title": "Susun di Papan Nilai Tempat",
      "bookReference": "hlm. 14",
      "objective": "Menyusun dari instruksi digit.",
      "mechanicDescription": "Tiga ronde, dua soal.",
      "voiceGuide": "Isi papan.",
      "symbolLarge": "2.150",
      "wordLarge": "PAPAN",
      "mathNotation": "digit → bilangan"
    },
    {
      "stage": "Abstract",
      "gameType": "value-of-digit",
      "title": "Nilai Angka pada Tempat",
      "bookReference": "hlm. 14–15",
      "objective": "Memilih nilai tempat sebuah digit.",
      "mechanicDescription": "Tiga ronde, dua soal.",
      "voiceGuide": "Pilih nilai.",
      "symbolLarge": "2→2000",
      "wordLarge": "NILAI",
      "mathNotation": "digit × bobot"
    },
    {
      "stage": "Abstract",
      "gameType": "write-place-board",
      "title": "Tulis dari Kata ke Papan",
      "bookReference": "hlm. 14",
      "objective": "Kata bilangan ke papan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Tulis di papan.",
      "symbolLarge": "7.350",
      "wordLarge": "TULIS",
      "mathNotation": "kata → digit"
    },
    {
      "stage": "Abstract",
      "gameType": "match-digit-value",
      "title": "Jodohkan Digit dan Nilai",
      "bookReference": "hlm. 14",
      "objective": "Digit tempat dengan nilai.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk digit, lalu nilai.",
      "symbolLarge": "7→7000",
      "wordLarge": "JODOHKAN",
      "mathNotation": "digit • nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-digit-value",
      "title": "Memori Digit dan Nilai",
      "bookReference": "hlm. 14",
      "objective": "Memori nilai tempat.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik dua kartu.",
      "symbolLarge": "9000",
      "wordLarge": "MEMORI",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "fill-place-table-q",
      "title": "Isi Tabel Digit",
      "bookReference": "hlm. 16",
      "objective": "Lengkapi tabel lambang→digit.",
      "mechanicDescription": "Tiga tabel.",
      "voiceGuide": "Isi digit.",
      "symbolLarge": "6.192",
      "wordLarge": "TABEL",
      "mathNotation": "R P S"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-place",
      "title": "Benar atau Salah: Nilai Tempat",
      "bookReference": "hlm. 12–16",
      "objective": "Menilai pernyataan nilai tempat.",
      "mechanicDescription": "Dua ronde, lima.",
      "voiceGuide": "Benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-place",
      "title": "Detektif Nilai Tempat",
      "bookReference": "hlm. 14–16",
      "objective": "Petunjuk nilai tempat.",
      "mechanicDescription": "Empat soal.",
      "voiceGuide": "Pilih bilangan.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "select-all-place",
      "title": "Ketuk Semua Syarat Tempat",
      "bookReference": "hlm. 15",
      "objective": "Syarat digit.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "symbolLarge": "✔✔",
      "wordLarge": "SEMUA",
      "mathNotation": "syarat"
    },
    {
      "stage": "Abstract",
      "gameType": "build-place-sentence",
      "title": "Susun Kata Nilai Tempat",
      "bookReference": "hlm. 14",
      "objective": "Kalimat nilai tempat.",
      "mechanicDescription": "Empat kalimat.",
      "voiceGuide": "Susun kata.",
      "symbolLarge": "Aa",
      "wordLarge": "SUSUN KATA",
      "mathNotation": "kalimat"
    }
  ],
  "poin": [
    {
      "ikon": "📍",
      "nama": "Tempat menentukan nilai",
      "isi": "2 pada 2.150 = 2.000",
      "suara": "Tempat menentukan nilai. Angka 2 pada 2.150 bernilai dua ribu."
    },
    {
      "ikon": "🔓",
      "nama": "Uraian",
      "isi": "2000 + 100 + 50 + 0",
      "suara": "Uraian menulis nilai tiap tempat."
    },
    {
      "ikon": "📋",
      "nama": "Tabel digit",
      "isi": "tulis angkanya, bukan 7000",
      "suara": "Tabel nilai tempat diisi digit."
    },
    {
      "ikon": "6️⃣",
      "nama": "Angka sama, nilai bisa beda",
      "isi": "6 bisa 60 atau 600",
      "suara": "Angka sama di tempat beda nilainya beda."
    },
    {
      "ikon": "⭕",
      "nama": "Nol menjaga tempat",
      "isi": "satuan 0 tetap ada",
      "suara": "Nol menjaga tempat yang kosong."
    }
  ],
  "poinSuara": "Tempat menentukan nilai. Uraikan bilangan. Tabel diisi digit. Angka sama bisa bernilai beda. Nol menjaga tempat.",
  "cara": {
    "suara": "Cara nilai tempat. Tulis digit di empat kolom. Kalikan dengan 1000, 100, 10, 1. Jumlahkan.",
    "potongan": [
      {
        "teks": "tulis digit",
        "warna": "#DDD6FE"
      },
      {
        "teks": "× bobot",
        "warna": "#BBF7D0"
      },
      {
        "teks": "jumlahkan",
        "warna": "#BFDBFE"
      },
      {
        "teks": "cek ulang",
        "warna": "#FDE68A"
      }
    ]
  },
  "rumah": "Ayo Mencoba: ambil empat digit dari nomor rumah atau plat. Susun bilangan, tulis tabel digit, dan uraikannya.",
  "refleksi": [
    "Aku tahu bedanya digit dan nilai.",
    "Aku bisa mengurai bilangan empat angka.",
    "Aku teliti mengisi tabel digit.",
    "Aku siap membandingkan dengan nilai tempat."
  ]
};

export const SUB_C41: SubBabNaskah = {
  "id": "C",
  "codeTitle": "Sub-Bab C (Membandingkan dan Mengurutkan)",
  "fullTitle": "Sub-Bab C: Membandingkan dan Mengurutkan Bilangan Cacah sampai 10.000",
  "targetDescription": "Siswa membandingkan dua bilangan empat angka mulai dari ribuan, menulis < > =, dan mengurutkan bilangan (contoh tinggi gunung 2.460, 3.676, 3.726).",
  "secondaryBg": "#FEF3C7",
  "secondaryBorder": "#D97706",
  "secondaryText": "#78350F",
  "silabus": {
    "teksSuara": "Kita membandingkan harga manggis tujuh ribu lima ratus dan bengkoang delapan ribu tujuh ratus lima puluh. Bandingkan ribuan dulu. Bila sama, lanjut ratusan, puluhan, satuan. Kita mengurutkan tinggi gunung dari terkecil. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa membandingkan dan mengurutkan bilangan cacah sampai 10.000.",
    "referensi": "Buku Siswa Matematika Kelas IV (Bab 1 Sub-Bab C hlm. 16–24) dan strategi place-value comparison."
  },
  "videos": [
    {
      "id": "K4B1C-V1",
      "judul": "Harga di Pasar",
      "subjudul": "Membandingkan dua bilangan",
      "adegan": [
        {
          "id": "K4B1C-V1-1",
          "judul": "Manggis dan apel",
          "ketukan": [
            "Ibu Slamet membeli manggis seharga tujuh ribu lima ratus rupiah.",
            "Apel seperempat kilogram enam ribu tujuh ratus lima puluh rupiah.",
            "Di kios lain bengkoang delapan ribu tujuh ratus lima puluh.",
            "Kios mana lebih mahal?"
          ],
          "papan": [
            "Rp7.500 manggis",
            "Rp6.750 apel",
            "Rp8.750 bengkoang",
            "Mana lebih mahal?"
          ]
        },
        {
          "id": "K4B1C-V1-2",
          "judul": "Bandingkan ribuan",
          "ketukan": [
            "8.750 dan 7.500. Ribuan: 8 dan 7.",
            "Delapan lebih dari tujuh.",
            "Jadi 8.750 lebih dari 7.500.",
            "Ditulis 8.750 > 7.500."
          ],
          "papan": [
            "Ribuan 8 dan 7",
            "8 > 7",
            "8.750 > 7.500",
            "Tanda lebih dari"
          ]
        },
        {
          "id": "K4B1C-V1-3",
          "judul": "Ribuan sama",
          "ketukan": [
            "4.352 dan 4.365. Ribuan sama, ratusan sama.",
            "Lihat puluhan: 5 dan 6.",
            "Lima kurang dari enam, jadi 4.352 < 4.365.",
            "Bila puluhan sama, lihat satuan."
          ],
          "papan": [
            "Ribuan & ratusan sama",
            "Puluhan 5 < 6",
            "4.352 < 4.365",
            "Lanjut satuan bila perlu"
          ]
        }
      ]
    },
    {
      "id": "K4B1C-V2",
      "judul": "Tiga Tanda",
      "subjudul": "Lebih, kurang, sama",
      "adegan": [
        {
          "id": "K4B1C-V2-1",
          "judul": "Tanda lebih dari",
          "ketukan": [
            "Mulut tanda terbuka ke bilangan yang lebih besar.",
            "8.750 > 7.500 dibaca delapan ribu tujuh ratus lima puluh lebih dari tujuh ribu lima ratus.",
            "Latihan: 5.734 dan 4.312.",
            "Ribuan 5 > 4, jadi 5.734 > 4.312."
          ],
          "papan": [
            "> lebih dari",
            "Contoh harga",
            "5.734 dan 4.312",
            "5.734 > 4.312"
          ]
        },
        {
          "id": "K4B1C-V2-2",
          "judul": "Tanda kurang dari",
          "ketukan": [
            "4.352 < 4.355 karena satuan 2 < 5.",
            "Semua tempat kiri sama, satuan yang menentukan.",
            "1.001 < 1.002.",
            "7.654 < 7.777."
          ],
          "papan": [
            "< kurang dari",
            "Satuan menentukan",
            "1.001 < 1.002",
            "7.654 < 7.777"
          ]
        },
        {
          "id": "K4B1C-V2-3",
          "judul": "Sama dengan",
          "ketukan": [
            "4.352 dan 4.352. Semua tempat sama.",
            "Ditulis 4.352 = 4.352.",
            "8.765 = 8.765.",
            "Sama dengan berarti tidak ada yang lebih besar."
          ],
          "papan": [
            "Semua tempat sama",
            "= sama dengan",
            "8.765 = 8.765",
            "Tidak ada yang unggul"
          ]
        }
      ]
    },
    {
      "id": "K4B1C-V3",
      "judul": "Tinggi Gunung",
      "subjudul": "Mengurutkan",
      "adegan": [
        {
          "id": "K4B1C-V3-1",
          "judul": "Tiga gunung",
          "ketukan": [
            "Sinabung, Semeru, dan Rinjani tingginya berbeda.",
            "Angkanya 2.460, 3.676, dan 3.726.",
            "Mana yang tertinggi? Mana terendah?",
            "Kita urutkan dengan nilai tempat."
          ],
          "papan": [
            "Tiga gunung",
            "2.460, 3.676, 3.726",
            "Tertinggi?",
            "Pakai nilai tempat"
          ]
        },
        {
          "id": "K4B1C-V3-2",
          "judul": "Urutan naik",
          "ketukan": [
            "Ribuan: 2 kurang dari 3, jadi 2.460 paling kecil.",
            "Antara 3.676 dan 3.726, ratusan 6 < 7.",
            "Urutan naik: 2.460, 3.676, 3.726.",
            "Semeru 3.676 di tengah."
          ],
          "papan": [
            "2.460 terkecil",
            "3.676 < 3.726",
            "Urutan naik",
            "Siap"
          ]
        },
        {
          "id": "K4B1C-V3-3",
          "judul": "Latihan dan kartu",
          "ketukan": [
            "Urutkan 7.570, 5.240, 3.041, 9.941.",
            "Dari digit 1,5,9,2 susun bilangan terbesar 9.521.",
            "Membandingkan dan mengurutkan memakai langkah yang sama.",
            "Sub-Bab A sampai C siap!"
          ],
          "papan": [
            "Urutkan empat bilangan",
            "Digit 1 5 9 2",
            "9.521 terbesar",
            "Bab 1 A–C siap"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Bandingkan ribuan",
      "stepDesc": "Bandingkan ribuan pada bilangan sampai 10.000.",
      "icon": "🟣",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Lanjut ratusan",
      "stepDesc": "Lanjut ratusan pada bilangan sampai 10.000.",
      "icon": "🟢",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Tanda < > =",
      "stepDesc": "Tanda < > = pada bilangan sampai 10.000.",
      "icon": "🐊",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Urutkan naik",
      "stepDesc": "Urutkan naik pada bilangan sampai 10.000.",
      "icon": "📶",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Gunung Semeru",
      "stepDesc": "Gunung Semeru pada bilangan sampai 10.000.",
      "icon": "🌋",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Kartu digit",
      "stepDesc": "Kartu digit pada bilangan sampai 10.000.",
      "icon": "🃏",
      "flowFrom": "5",
      "flowTo": "7"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Bilangan terbesar",
      "stepDesc": "Bilangan terbesar pada bilangan sampai 10.000.",
      "icon": "9️⃣",
      "flowFrom": "6",
      "flowTo": "8"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Siap banding urut",
      "stepDesc": "Siap banding urut pada bilangan sampai 10.000.",
      "icon": "✅",
      "flowFrom": "7",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "RIBUAN DULU",
      "emoji": "🟣",
      "countNum": 1,
      "countWord": "langkah pertama",
      "suara": "Membandingkan dimulai dari ribuan."
    },
    {
      "judul": "LANJUT KE KANAN",
      "emoji": "➡️",
      "countNum": 2,
      "countWord": "ratusan → puluhan → satuan",
      "suara": "Bila sama, lanjut ke tempat di kanan."
    },
    {
      "judul": "LEBIH DARI",
      "emoji": ">",
      "countNum": 8750,
      "countWord": "8.750 > 7.500",
      "suara": "Tanda lebih dari terbuka ke bilangan besar."
    },
    {
      "judul": "KURANG DARI",
      "emoji": "<",
      "countNum": 4352,
      "countWord": "4.352 < 4.365",
      "suara": "Tanda kurang dari."
    },
    {
      "judul": "SAMA DENGAN",
      "emoji": "=",
      "countNum": 4352,
      "countWord": "4.352 = 4.352",
      "suara": "Semua tempat sama."
    },
    {
      "judul": "URUTAN NAIK",
      "emoji": "📶",
      "countNum": 2460,
      "countWord": "2.460 → 3.676 → 3.726",
      "suara": "Dari terkecil ke terbesar."
    },
    {
      "judul": "URUTAN TURUN",
      "emoji": "📉",
      "countNum": 3726,
      "countWord": "dari terbesar",
      "suara": "Dari terbesar ke terkecil."
    },
    {
      "judul": "TEMPAT PENENTU",
      "emoji": "🔍",
      "countNum": 1,
      "countWord": "tempat pertama yang berbeda",
      "suara": "Tempat pertama yang berbeda menentukan hasil."
    },
    {
      "judul": "KARTU DIGIT",
      "emoji": "🃏",
      "countNum": 9521,
      "countWord": "1,5,9,2 → terbesar 9.521",
      "suara": "Susun digit dari besar untuk bilangan terbesar."
    },
    {
      "judul": "TELITI TANDA",
      "emoji": "⚠️",
      "countNum": 1,
      "countWord": "tanda dibalik arti berubah",
      "suara": "Baca tanda dengan teliti."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "compare-collections",
      "title": "Bandingkan Kumpulan Harga",
      "bookReference": "hlm. 16–18 (7.500 dan 8.750)",
      "objective": "Menentukan kumpulan mana lebih banyak.",
      "mechanicDescription": "Tiga ronde, dua soal.",
      "voiceGuide": "Bandingkan dua kumpulan.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sign-collections",
      "title": "Tanda untuk Kumpulan",
      "bookReference": "hlm. 18–20 (< > =)",
      "objective": "Memilih tanda untuk dua kumpulan.",
      "mechanicDescription": "Tiga ronde, dua soal.",
      "voiceGuide": "Pilih tanda.",
      "emoji": "🐊",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-collections",
      "title": "Urutkan Kumpulan Gunung",
      "bookReference": "hlm. 21–23 (2.460, 3.676, 3.726)",
      "objective": "Mengurutkan empat kumpulan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk menurut urutan.",
      "emoji": "📶",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "most-least-collection",
      "title": "Paling Banyak, Paling Sedikit",
      "bookReference": "hlm. 21–23",
      "objective": "Menemukan paling banyak/sedikit.",
      "mechanicDescription": "Tiga ronde, dua tanya.",
      "voiceGuide": "Ketuk yang diminta.",
      "emoji": "🏆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "match-collection-sign",
      "title": "Jodohkan Pasangan dan Tanda",
      "bookReference": "hlm. 18–20",
      "objective": "Pasangan kumpulan dengan tanda.",
      "mechanicDescription": "Tiga ronde, tiga pasangan.",
      "voiceGuide": "Ketuk pasangan, lalu tanda.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "slot-collection-order",
      "title": "Taruh di Urutan",
      "bookReference": "hlm. 22–23",
      "objective": "Taruh ke terkecil–tengah–terbesar.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk kumpulan, lalu tempat.",
      "emoji": "📥",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-more-collection",
      "title": "Ketuk Semua yang Lebih/Kurang",
      "bookReference": "hlm. 17–20",
      "objective": "Semua yang lebih/kurang dari acuan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "same-thousands-collection",
      "title": "Ribuan Sama, Lihat Berikutnya",
      "bookReference": "hlm. 19 (4.352 dan 4.365)",
      "objective": "Membandingkan saat ribuan sama.",
      "mechanicDescription": "Tiga ronde, dua soal.",
      "voiceGuide": "Lihat ratusan lalu puluhan.",
      "emoji": "🔍",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "between-collection",
      "title": "Di Antara Dua Kumpulan",
      "bookReference": "hlm. 22–23",
      "objective": "Kumpulan di antara dua batas.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk yang di antara.",
      "emoji": "↔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-prices",
      "title": "Cerita Harga dan Gunung",
      "bookReference": "hlm. 16–23",
      "objective": "Cerita tiga objek, paling banyak/sedikit.",
      "mechanicDescription": "Tiga ronde, dua soal.",
      "voiceGuide": "Pilih nama.",
      "emoji": "🧒",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "compare-blocks",
      "title": "Bandingkan Blok",
      "bookReference": "hlm. 18–20",
      "objective": "Model mana lebih besar.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Bandingkan model.",
      "diagramType": "blocks-compare",
      "numberA": 4,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sign-blocks",
      "title": "Tanda untuk Blok",
      "bookReference": "hlm. 18–20",
      "objective": "Pilih tanda dua model.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih tanda.",
      "diagramType": "blocks-sign",
      "numberA": 4,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sign-table",
      "title": "Isi Tabel Tanda",
      "bookReference": "hlm. 20–21",
      "objective": "Isi tanda pada tabel.",
      "mechanicDescription": "Tiga tabel, empat baris.",
      "voiceGuide": "Isi kartu tanda.",
      "diagramType": "sign-table",
      "numberA": 4,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "order-blocks",
      "title": "Urutkan Blok",
      "bookReference": "hlm. 22–23",
      "objective": "Urutkan model.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk menurut urutan.",
      "diagramType": "blocks-order",
      "numberA": 4,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "match-blocks-sign",
      "title": "Jodohkan Pasangan Blok dan Tanda",
      "bookReference": "hlm. 18–20",
      "objective": "Pasangan model + tanda.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk pasangan, lalu tanda.",
      "diagramType": "blocks-sign-match",
      "numberA": 4,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "most-least-blocks",
      "title": "Paling pada Blok",
      "bookReference": "hlm. 21–23",
      "objective": "Paling banyak/sedikit model.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk model.",
      "diagramType": "blocks-most-least",
      "numberA": 4,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-more-blocks",
      "title": "Ketuk Semua Blok Lebih/Kurang",
      "bookReference": "hlm. 17–20",
      "objective": "Semua model vs acuan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "diagramType": "blocks-select",
      "numberA": 4,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-thousands-blocks",
      "title": "Pilah Blok: Ribuan Kecil/Besar",
      "bookReference": "hlm. 18",
      "objective": "Pilah menurut ribuan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah ke kotak.",
      "diagramType": "blocks-sort",
      "numberA": 4,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "complete-compare-sentence",
      "title": "Lengkapi Kalimat Perbandingan",
      "bookReference": "hlm. 18–20",
      "objective": "Kalimat ribuan/ratusan.",
      "mechanicDescription": "Tiga pasangan.",
      "voiceGuide": "Pilih isian.",
      "diagramType": "compare-sentence",
      "numberA": 4,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "slot-blocks-order",
      "title": "Taruh Blok di Urutan",
      "bookReference": "hlm. 22–23",
      "objective": "Terkecil–tengah–terbesar.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk model, lalu tempat.",
      "diagramType": "blocks-slot",
      "numberA": 4,
      "numberB": 3
    },
    {
      "stage": "Abstract",
      "gameType": "compare-numerals",
      "title": "Bandingkan Lambang",
      "bookReference": "hlm. 20–21",
      "objective": "Pilih tanda dua lambang.",
      "mechanicDescription": "Tiga ronde, dua soal.",
      "voiceGuide": "Pilih tanda.",
      "symbolLarge": "8.750 ○ 7.500",
      "wordLarge": "BANDINGKAN",
      "mathNotation": "> < ="
    },
    {
      "stage": "Abstract",
      "gameType": "fill-sign-table-abstract",
      "title": "Isi Tabel Perbandingan",
      "bookReference": "hlm. 20–21",
      "objective": "Tabel tanda.",
      "mechanicDescription": "Tiga tabel.",
      "voiceGuide": "Isi kartu tanda.",
      "symbolLarge": "4.435 ○ 3.345",
      "wordLarge": "TABEL",
      "mathNotation": "tanda"
    },
    {
      "stage": "Abstract",
      "gameType": "deciding-place",
      "title": "Tempat yang Menentukan",
      "bookReference": "hlm. 18–20",
      "objective": "Tempat pertama yang berbeda.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih tempat.",
      "symbolLarge": "4.352 • 4.365",
      "wordLarge": "TEMPAT",
      "mathNotation": "ribuan…"
    },
    {
      "stage": "Abstract",
      "gameType": "order-numerals",
      "title": "Urutkan Lambang",
      "bookReference": "hlm. 22–24",
      "objective": "Urutkan empat bilangan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk menurut urutan.",
      "symbolLarge": "↑",
      "wordLarge": "URUTKAN",
      "mathNotation": "naik/turun"
    },
    {
      "stage": "Abstract",
      "gameType": "match-pair-word",
      "title": "Jodohkan Pasangan dan Kata",
      "bookReference": "hlm. 18–20",
      "objective": "Pasangan dengan lebih/kurang/sama.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk pasangan, lalu kata.",
      "symbolLarge": "8.750 ? 7.500",
      "wordLarge": "JODOHKAN",
      "mathNotation": "kata"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-compare",
      "title": "Benar atau Salah: Perbandingan",
      "bookReference": "hlm. 16–24",
      "objective": "Pernyataan banding/urut.",
      "mechanicDescription": "Dua ronde, lima.",
      "voiceGuide": "Benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-compare",
      "title": "Detektif Perbandingan",
      "bookReference": "hlm. 22–24",
      "objective": "Petunjuk lebih/kurang.",
      "mechanicDescription": "Empat soal.",
      "voiceGuide": "Pilih bilangan.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "select-all-compare",
      "title": "Ketuk Semua Lebih/Kurang: Angka",
      "bookReference": "hlm. 17–20",
      "objective": "Semua vs acuan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "symbolLarge": "✔✔",
      "wordLarge": "SEMUA",
      "mathNotation": "lebih/kurang"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-map-compare",
      "title": "Peta Konsep Membandingkan",
      "bookReference": "hlm. 3 dan 16–23",
      "objective": "Lengkapi peta konsep.",
      "mechanicDescription": "Dua peta, empat kotak.",
      "voiceGuide": "Pilih kartu kotak.",
      "symbolLarge": "⇄",
      "wordLarge": "PETA KONSEP",
      "mathNotation": "langkah"
    },
    {
      "stage": "Abstract",
      "gameType": "build-compare-sentence",
      "title": "Susun Kata Perbandingan",
      "bookReference": "hlm. 18–20",
      "objective": "Kalimat perbandingan.",
      "mechanicDescription": "Empat kalimat.",
      "voiceGuide": "Susun kata.",
      "symbolLarge": "Aa",
      "wordLarge": "SUSUN KATA",
      "mathNotation": "kalimat"
    }
  ],
  "poin": [
    {
      "ikon": "🟣",
      "nama": "Mulai dari ribuan",
      "isi": "lalu ratusan, puluhan, satuan",
      "suara": "Bandingkan dari ribuan, lalu ke kanan."
    },
    {
      "ikon": "🐊",
      "nama": "Tiga tanda",
      "isi": "< > =",
      "suara": "Kurang dari, lebih dari, sama dengan."
    },
    {
      "ikon": "📶",
      "nama": "Mengurutkan",
      "isi": "2.460, 3.676, 3.726",
      "suara": "Urutan naik tinggi gunung."
    },
    {
      "ikon": "🔍",
      "nama": "Tempat penentu",
      "isi": "tempat pertama yang berbeda",
      "suara": "Tempat pertama yang berbeda menentukan."
    },
    {
      "ikon": "🃏",
      "nama": "Susun digit",
      "isi": "terbesar 9.521 dari 1,5,9,2",
      "suara": "Digit besar di kiri untuk bilangan terbesar."
    }
  ],
  "poinSuara": "Bandingkan dari ribuan. Pakai tanda kurang dari, lebih dari, atau sama dengan. Urutkan naik atau turun. Tempat pertama yang berbeda menentukan.",
  "cara": {
    "suara": "Cara membandingkan. Ribuan dulu. Bila sama, ratusan. Bila sama, puluhan. Bila sama, satuan. Tulis tanda.",
    "potongan": [
      {
        "teks": "ribuan dulu",
        "warna": "#DDD6FE"
      },
      {
        "teks": "lalu ratusan",
        "warna": "#BBF7D0"
      },
      {
        "teks": "lalu puluhan",
        "warna": "#BFDBFE"
      },
      {
        "teks": "tulis tanda",
        "warna": "#FDE68A"
      }
    ]
  },
  "rumah": "Ayo Mencoba: catat empat harga di warung, bandingkan berpasangan dengan tanda, lalu urutkan dari termurah.",
  "refleksi": [
    "Aku membandingkan dari ribuan.",
    "Aku memakai tanda dengan benar.",
    "Aku bisa mengurutkan empat bilangan.",
    "Aku menjelaskan langkahku."
  ]
};

export const SUB_BAB_K4B1: SubBabNaskah[] = [SUB_A41, SUB_B41, SUB_C41];
export const semuaAdeganK4B1 = SUB_BAB_K4B1.flatMap((s) => s.videos.flatMap((v) => v.adegan));
