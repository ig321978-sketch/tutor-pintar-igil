/**
 * Naskah — poles kerapatan setara K5B4.
 * Metode luar dianyam ketukan per ketukan.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K4B3_META = {
  "chapterId": "k4-mat-bab3",
  "phaseCode": "FASE_B",
  "grade": 4,
  "subjectLabel": "MATEMATIKA - KELAS 4 SD",
  "title": "BAB 3: POLA GAMBAR DAN POLA BILANGAN",
  "silabusElemen": "🌈 Fase B • Elemen Aljabar: Pola Gambar (membesar–mengecil) dan Pola Bilangan (membesar–mengecil) (Kelas 4 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A43: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Pola Gambar)",
  "fullTitle": "Sub-Bab A: Pola Gambar",
  "targetDescription": "Siswa menemukan dan membuat pola gambar membesar (mis. jeruk 2,4,6,… beda +2 hingga kumpulan ke-7 = 14) dan mengecil (mis. permen 9,7,5,… beda −2 hingga kumpulan ke-5 = 1) memakai tabel selisih. Siswa memakai cara Pola Berulang, Pola Bertambah, Struktur Visual. Siswa memakai cara Pola Berulang, Pola Bertambah, Struktur Visual.",
  "secondaryBg": "#FFEDD5",
  "secondaryBorder": "#EA580C",
  "secondaryText": "#7C2D12",
  "silabus": {
    "teksSuara": "Kita belajar pola gambar. Jeruk disusun 2, 4, 6, lalu ditambah 2 terus sampai kumpulan ketujuh berisi 14. Permen disusun 9, 7, 5, dikurangi 2 sampai tersisa 1. Pola bisa membesar atau mengecil. Kita memakai cara: Pola Berulang, Pola Bertambah, Struktur Visual. Unit pola berulang menentukan suku berikutnya. Tiap langkah menambah dengan aturan tetap. Lihat kelompok bentuk, bukan hanya warna. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menemukan dan membuat pola gambar membesar dan mengecil.",
    "referensi": "Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 3 Sub-Bab A)."
  },
  "videos": [
    {
      "id": "K4B3A-V1",
      "judul": "Jeruk Membesar",
      "subjudul": "Repeating Pattern",
      "adegan": [
        {
          "id": "K4B3A-V1-1",
          "judul": "Tiga kumpulan",
          "ketukan": [
            "Bayangkan kamu sedang mempelajari Pola Gambar. Ada tiga kumpulan jeruk.",
            "Dua, empat, lalu enam.",
            "Apakah kamu melihat polanya.",
            "Ingat cara Pola Berulang: Unit pola berulang menentukan suku berikutnya. Ingat cara Pola Berulang: Unit pola berulang menentukan suku berikutnya."
          ],
          "papan": [
            "3 kumpulan",
            "2-4-6",
            "pola?",
            "+2"
          ]
        },
        {
          "id": "K4B3A-V1-2",
          "judul": "Tabel +2",
          "ketukan": [
            "Buat tabel seperti di buku.",
            "Kumpulan empat jadi delapan.",
            "Terus tambah dua.",
            "Di sini kita memakai ide Repeating Pattern — Unit pola berulang menentukan suku berikutnya. Di sini kita memakai Repeating Pattern. Unit pola berulang menentukan suku berikutnya."
          ],
          "papan": [
            "tabel",
            "+2",
            "ke-7",
            "pola"
          ]
        },
        {
          "id": "K4B3A-V1-3",
          "judul": "Hasil 14",
          "ketukan": [
            "Kumpulan ketujuh berisi empat belas jeruk.",
            "Pola membesar berarti semakin banyak.",
            "Beda tetap positif.",
            "METODE LUAR · Pola Berulang: Unit pola berulang menentukan suku berikutnya."
          ],
          "papan": [
            "14 jeruk",
            "membesar",
            "beda +",
            "siap"
          ]
        }
      ]
    },
    {
      "id": "K4B3A-V2",
      "judul": "Latihan: Pola Bertambah",
      "subjudul": "Growing Pattern",
      "adegan": [
        {
          "id": "K4B3A-V2-1",
          "judul": "Semakin sedikit",
          "ketukan": [
            "Ada juga pola yang mengecil.",
            "Sembilan, tujuh, lima permen.",
            "Setiap langkah berkurang dua.",
            "Ingat cara Pola Bertambah: Tiap langkah menambah dengan aturan tetap. Ingat cara Pola Bertambah: Tiap langkah menambah dengan aturan tetap."
          ],
          "papan": [
            "mengecil",
            "9-7-5",
            "−2",
            "sedikit"
          ]
        },
        {
          "id": "K4B3A-V2-2",
          "judul": "Tabel −2",
          "ketukan": [
            "Isi tabel selisih.",
            "Kumpulan empat berisi tiga.",
            "Kumpulan lima berisi satu.",
            "Di sini kita memakai ide Growing Pattern — Tiap langkah menambah dengan aturan tetap. Di sini kita memakai Growing Pattern. Tiap langkah menambah dengan aturan tetap."
          ],
          "papan": [
            "tabel",
            "beda −2",
            "pola",
            "pola"
          ]
        },
        {
          "id": "K4B3A-V2-3",
          "judul": "Kesimpulan",
          "ketukan": [
            "Pola mengecil memakai beda negatif.",
            "Pola membesar memakai beda positif.",
            "Selisih antar langkah sama.",
            "METODE LUAR · Pola Bertambah: Tiap langkah menambah dengan aturan tetap."
          ],
          "papan": [
            "beda −",
            "beda +",
            "selisih sama",
            "kunci"
          ]
        }
      ]
    },
    {
      "id": "K4B3A-V3",
      "judul": "Siap pakai Visual Structure",
      "subjudul": "Visual Structure",
      "adegan": [
        {
          "id": "K4B3A-V3-1",
          "judul": "Amati",
          "ketukan": [
            "Hitung benda tiap kumpulan.",
            "Bandingkan dengan sebelumnya.",
            "Catat selisihnya.",
            "Ingat cara Struktur Visual: Lihat kelompok bentuk, bukan hanya warna. Ingat cara Struktur Visual: Lihat kelompok bentuk, bukan hanya warna."
          ],
          "papan": [
            "hitung",
            "banding",
            "selisih",
            "sama?"
          ]
        },
        {
          "id": "K4B3A-V3-2",
          "judul": "Tentukan beda",
          "ketukan": [
            "Jika selisih sama, itu beda pola.",
            "Beda positif berarti membesar.",
            "Beda negatif berarti mengecil.",
            "Di sini kita memakai ide Visual Structure — Lihat kelompok bentuk, bukan hanya warna. Di sini kita memakai Visual Structure. Lihat kelompok bentuk, bukan hanya warna."
          ],
          "papan": [
            "beda",
            "lanjut",
            "struktur",
            "struktur"
          ]
        },
        {
          "id": "K4B3A-V3-3",
          "judul": "Prediksi",
          "ketukan": [
            "Prediksi kumpulan berikutnya.",
            "Cek lagi dengan tabel.",
            "Presentasikan pola.",
            "METODE LUAR · Struktur Visual: Lihat kelompok bentuk, bukan hanya warna."
          ],
          "papan": [
            "prediksi",
            "tabel",
            "presentasi",
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
      "stepDesc": "Apa yang ditanyakan pada Pola Gambar?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Repeating Pattern",
      "stepDesc": "Unit pola berulang menentukan suku berikutnya.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Growing Pattern",
      "stepDesc": "Tiap langkah menambah dengan aturan tetap.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Visual Structure",
      "stepDesc": "Lihat kelompok bentuk, bukan hanya warna.",
      "icon": "✨",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Kerjakan",
      "stepDesc": "Terapkan cara itu pada angka atau gambar.",
      "icon": "✏️",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek masuk akal",
      "stepDesc": "Apakah hasilnya masuk akal?",
      "icon": "✅",
      "flowFrom": "5",
      "flowTo": "7"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Simpulkan",
      "stepDesc": "Jelaskan ide utamanya dengan kalimatmu.",
      "icon": "💬",
      "flowFrom": "6",
      "flowTo": "8"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Main",
      "stepDesc": "Latih di Concrete sampai Abstract.",
      "icon": "🎮",
      "flowFrom": "7",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "AMATI",
      "emoji": "👀",
      "countNum": 1,
      "countWord": "lihat",
      "suara": "Hitung benda."
    },
    {
      "judul": "BEDA",
      "emoji": "➖",
      "countNum": 2,
      "countWord": "selisih",
      "suara": "Selisih tetap."
    },
    {
      "judul": "+2",
      "emoji": "📈",
      "countNum": 2,
      "countWord": "jeruk",
      "suara": "Membesar."
    },
    {
      "judul": "−2",
      "emoji": "📉",
      "countNum": 2,
      "countWord": "permen",
      "suara": "Mengecil."
    },
    {
      "judul": "2,4,6",
      "emoji": "🟠",
      "countNum": 6,
      "countWord": "pola",
      "suara": "Contoh buku."
    },
    {
      "judul": "14",
      "emoji": "✅",
      "countNum": 7,
      "countWord": "ke-7",
      "suara": "Hasil jeruk."
    },
    {
      "judul": "9,7,5",
      "emoji": "🍬",
      "countNum": 5,
      "countWord": "pola",
      "suara": "Permen."
    },
    {
      "judul": "1",
      "emoji": "🍬",
      "countNum": 5,
      "countWord": "ke-5",
      "suara": "Sisa satu."
    },
    {
      "judul": "TABEL",
      "emoji": "📋",
      "countNum": 1,
      "countWord": "alat",
      "suara": "Uraian selisih."
    },
    {
      "judul": "SIAP B",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "lanjut",
      "suara": "Pola bilangan."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "baca-pola",
      "title": "Baca Pola Gambar",
      "bookReference": "hlm. 89–90 (jeruk)",
      "objective": "Pakai Pola Berulang: Unit pola berulang menentukan suku berikutnya. Latihan: Membaca kumpulan membesar..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pola Berulang: Unit pola berulang menentukan suku berikutnya.",
      "voiceGuide": "Pola Berulang. Unit pola berulang menentukan suku berikutnya.",
      "emoji": "🟠",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "lanjut-besar",
      "title": "Lanjutkan Pola Membesar",
      "bookReference": "hlm. 90 (kumpulan ke-7)",
      "objective": "Pakai Pola Berulang: Unit pola berulang menentukan suku berikutnya. Latihan: Menemukan suku berikutnya..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pola Berulang: Unit pola berulang menentukan suku berikutnya.",
      "voiceGuide": "Pola Berulang. Unit pola berulang menentukan suku berikutnya.",
      "emoji": "📈",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "lanjut-kecil",
      "title": "Lanjutkan Pola Mengecil",
      "bookReference": "hlm. 91–93 (permen)",
      "objective": "Pakai Pola Berulang: Unit pola berulang menentukan suku berikutnya. Latihan: Menemukan suku mengecil..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pola Berulang: Unit pola berulang menentukan suku berikutnya.",
      "voiceGuide": "Pola Berulang. Unit pola berulang menentukan suku berikutnya.",
      "emoji": "📉",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-pola",
      "title": "Pilah Membesar/Mengecil",
      "bookReference": "hlm. 87–93",
      "objective": "Pakai Pola Berulang: Unit pola berulang menentukan suku berikutnya. Latihan: Memilah jenis pola..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pola Berulang: Unit pola berulang menentukan suku berikutnya.",
      "voiceGuide": "Pola Berulang. Unit pola berulang menentukan suku berikutnya.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-beda",
      "title": "Jodohkan Pola dan Beda",
      "bookReference": "hlm. 90–93",
      "objective": "Menjodohkan.. Ingat Pola Berulang. (Pola Berulang)",
      "mechanicDescription": "Tiga ronde. Gunakan Pola Berulang.",
      "voiceGuide": "Pola Berulang. Mainkan dengan teliti.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-pola",
      "title": "Memori Pola Gambar",
      "bookReference": "hlm. 90–93",
      "objective": "Memori.. Ingat Pola Berulang. (Pola Berulang)",
      "mechanicDescription": "Tiga ronde. Gunakan Pola Berulang.",
      "voiceGuide": "Pola Berulang. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-pola",
      "title": "Ketuk Pola Diminta",
      "bookReference": "hlm. 89–93",
      "objective": "Mengetuk.. Ingat Pola Berulang. (Pola Berulang)",
      "mechanicDescription": "Tiga ronde. Gunakan Pola Berulang.",
      "voiceGuide": "Pola Berulang. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-pola",
      "title": "Ketuk Semua Jenis Pola",
      "bookReference": "hlm. 87–93",
      "objective": "Ketuk semua.. Ingat Pola Berulang. (Pola Berulang)",
      "mechanicDescription": "Tiga ronde. Gunakan Pola Berulang.",
      "voiceGuide": "Pola Berulang. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-pola",
      "title": "Cerita Jeruk dan Permen",
      "bookReference": "hlm. 89–93",
      "objective": "Soal cerita.. Ingat Pola Berulang. (Pola Berulang)",
      "mechanicDescription": "Tiga ronde. Gunakan Pola Berulang.",
      "voiceGuide": "Pola Berulang. Mainkan dengan teliti.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-pola",
      "title": "Urutkan Banyak Benda",
      "bookReference": "hlm. 90–93",
      "objective": "Mengurutkan.. Ingat Pola Berulang. (Pola Berulang)",
      "mechanicDescription": "Tiga ronde. Gunakan Pola Berulang.",
      "voiceGuide": "Pola Berulang. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "gambar-besar",
      "title": "Diagram Pola Membesar",
      "bookReference": "hlm. 89–90",
      "objective": "Pakai Pola Bertambah: Tiap langkah menambah dengan aturan tetap. Latihan: Baca diagram..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pola Bertambah: Tiap langkah menambah dengan aturan tetap.",
      "voiceGuide": "Pola Bertambah. Tiap langkah menambah dengan aturan tetap.",
      "diagramType": "grow",
      "numberA": 2,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "gambar-kecil",
      "title": "Diagram Pola Mengecil",
      "bookReference": "hlm. 91–93",
      "objective": "Pakai Pola Bertambah: Tiap langkah menambah dengan aturan tetap. Latihan: Baca diagram..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pola Bertambah: Tiap langkah menambah dengan aturan tetap.",
      "voiceGuide": "Pola Bertambah. Tiap langkah menambah dengan aturan tetap.",
      "diagramType": "shrink",
      "numberA": 9,
      "numberB": 5
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-a",
      "title": "Jodohkan Diagram Pola",
      "bookReference": "hlm. 90–93",
      "objective": "Pakai Pola Bertambah: Tiap langkah menambah dengan aturan tetap. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pola Bertambah: Tiap langkah menambah dengan aturan tetap.",
      "voiceGuide": "Pola Bertambah. Tiap langkah menambah dengan aturan tetap.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-a",
      "title": "Memori Diagram Pola",
      "bookReference": "hlm. 90",
      "objective": "Pakai Pola Bertambah: Tiap langkah menambah dengan aturan tetap. Latihan: Memori..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pola Bertambah: Tiap langkah menambah dengan aturan tetap.",
      "voiceGuide": "Pola Bertambah. Tiap langkah menambah dengan aturan tetap.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-a",
      "title": "Tabel Selisih Pola",
      "bookReference": "hlm. 90 & 93",
      "objective": "Isi lanjut.. Ingat Pola Bertambah. (Pola Bertambah)",
      "mechanicDescription": "Tiga tabel. Gunakan Pola Bertambah.",
      "voiceGuide": "Pola Bertambah. Mainkan dengan teliti.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-a",
      "title": "Ketuk Semua Diagram",
      "bookReference": "hlm. 87–93",
      "objective": "Ketuk semua.. Ingat Pola Bertambah. (Pola Bertambah)",
      "mechanicDescription": "Tiga ronde. Gunakan Pola Bertambah.",
      "voiceGuide": "Pola Bertambah. Mainkan dengan teliti.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-a",
      "title": "Pilah Diagram Pola",
      "bookReference": "hlm. 87–93",
      "objective": "Pilah.. Ingat Pola Bertambah. (Pola Bertambah)",
      "mechanicDescription": "Tiga ronde. Gunakan Pola Bertambah.",
      "voiceGuide": "Pola Bertambah. Mainkan dengan teliti.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "beda-visual",
      "title": "Temukan Beda Visual",
      "bookReference": "hlm. 90–93",
      "objective": "Pilih beda.. Ingat Pola Bertambah. (Pola Bertambah)",
      "mechanicDescription": "Tiga ronde. Gunakan Pola Bertambah.",
      "voiceGuide": "Pola Bertambah. Mainkan dengan teliti.",
      "diagramType": "diff",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "choose-next",
      "title": "Pilih Gambar Berikutnya",
      "bookReference": "hlm. 93–94",
      "objective": "Pilih lanjut.. Ingat Pola Bertambah. (Pola Bertambah)",
      "mechanicDescription": "Tiga ronde. Gunakan Pola Bertambah.",
      "voiceGuide": "Pola Bertambah. Mainkan dengan teliti.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-a",
      "title": "Cerita Diagram Pola",
      "bookReference": "hlm. 89–93",
      "objective": "Cerita + gambar.. Ingat Pola Bertambah. (Pola Bertambah)",
      "mechanicDescription": "Tiga ronde. Gunakan Pola Bertambah.",
      "voiceGuide": "Pola Bertambah. Mainkan dengan teliti.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-next",
      "title": "Tulis Suku Berikutnya",
      "bookReference": "hlm. 90–93",
      "objective": "Pakai Struktur Visual: Lihat kelompok bentuk, bukan hanya warna. Latihan: Menulis angka lanjut..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Struktur Visual: Lihat kelompok bentuk, bukan hanya warna.",
      "voiceGuide": "Struktur Visual. Lihat kelompok bentuk, bukan hanya warna.",
      "symbolLarge": "8",
      "wordLarge": "LANJUT",
      "mathNotation": "suku+beda"
    },
    {
      "stage": "Abstract",
      "gameType": "write-beda",
      "title": "Tulis Beda Pola",
      "bookReference": "hlm. 90–93",
      "objective": "Pakai Struktur Visual: Lihat kelompok bentuk, bukan hanya warna. Latihan: Menulis beda..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Struktur Visual: Lihat kelompok bentuk, bukan hanya warna.",
      "voiceGuide": "Struktur Visual. Lihat kelompok bentuk, bukan hanya warna.",
      "symbolLarge": "+2",
      "wordLarge": "BEDA",
      "mathNotation": "selisih"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-jenis",
      "title": "Pilih Jenis Pola",
      "bookReference": "hlm. 87–93",
      "objective": "Pakai Struktur Visual: Lihat kelompok bentuk, bukan hanya warna. Latihan: Membesar/mengecil..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Struktur Visual: Lihat kelompok bentuk, bukan hanya warna.",
      "voiceGuide": "Struktur Visual. Lihat kelompok bentuk, bukan hanya warna.",
      "symbolLarge": "📈",
      "wordLarge": "JENIS",
      "mathNotation": "jenis"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-a",
      "title": "Urutkan Suku",
      "bookReference": "hlm. 90–93",
      "objective": "Pakai Struktur Visual: Lihat kelompok bentuk, bukan hanya warna. Latihan: Mengurutkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Struktur Visual: Lihat kelompok bentuk, bukan hanya warna.",
      "voiceGuide": "Struktur Visual. Lihat kelompok bentuk, bukan hanya warna.",
      "symbolLarge": "2<4<6",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-a",
      "title": "Jodohkan Notasi Pola",
      "bookReference": "hlm. 90–93",
      "objective": "Jodohkan.. Ingat Struktur Visual. (Struktur Visual)",
      "mechanicDescription": "Tiga ronde. Gunakan Struktur Visual.",
      "voiceGuide": "Struktur Visual. Mainkan dengan teliti.",
      "symbolLarge": "2,4,6",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-a",
      "title": "Memori Notasi Pola",
      "bookReference": "hlm. 90",
      "objective": "Memori.. Ingat Struktur Visual. (Struktur Visual)",
      "mechanicDescription": "Tiga ronde. Gunakan Struktur Visual.",
      "voiceGuide": "Struktur Visual. Mainkan dengan teliti.",
      "symbolLarge": "+2",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-a",
      "title": "Benar atau Salah: Pola Gambar",
      "bookReference": "hlm. 87–93",
      "objective": "Menilai.. Ingat Struktur Visual. (Struktur Visual)",
      "mechanicDescription": "Dua ronde. Gunakan Struktur Visual.",
      "voiceGuide": "Struktur Visual. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-a",
      "title": "Detektif Pola Gambar",
      "bookReference": "hlm. 89–93",
      "objective": "Petunjuk → suku.. Ingat Struktur Visual. (Struktur Visual)",
      "mechanicDescription": "Empat soal. Gunakan Struktur Visual.",
      "voiceGuide": "Struktur Visual. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-a",
      "title": "Peta Konsep Pola Gambar",
      "bookReference": "hlm. 87–93",
      "objective": "Mengisi kotak.. Ingat Struktur Visual. (Struktur Visual)",
      "mechanicDescription": "Satu peta. Gunakan Struktur Visual.",
      "voiceGuide": "Struktur Visual. Mainkan dengan teliti.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-a",
      "title": "Cerita Angka Pola Gambar",
      "bookReference": "hlm. 89–93",
      "objective": "Soal cerita.. Ingat Struktur Visual. (Struktur Visual)",
      "mechanicDescription": "Tiga ronde. Gunakan Struktur Visual.",
      "voiceGuide": "Struktur Visual. Mainkan dengan teliti.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "📈",
      "nama": "Amati",
      "isi": "Hitung banyak benda tiap kumpulan dan bandingkan.",
      "suara": "Hitung dulu, lalu bandingkan."
    },
    {
      "ikon": "🌍",
      "nama": "Pola Berulang",
      "isi": "Unit pola berulang menentukan suku berikutnya.",
      "suara": "Pola Berulang. Unit pola berulang menentukan suku berikutnya."
    },
    {
      "ikon": "🌍",
      "nama": "Pola Bertambah",
      "isi": "Tiap langkah menambah dengan aturan tetap.",
      "suara": "Pola Bertambah. Tiap langkah menambah dengan aturan tetap."
    },
    {
      "ikon": "🌍",
      "nama": "Struktur Visual",
      "isi": "Lihat kelompok bentuk, bukan hanya warna.",
      "suara": "Struktur Visual. Lihat kelompok bentuk, bukan hanya warna."
    }
  ],
  "poinSuara": "Ingat: Pola Berulang, Pola Bertambah, Struktur Visual.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Amati",
        "warna": "#FDE68A"
      },
      {
        "teks": "Beda tetap",
        "warna": "#BBF7D0"
      },
      {
        "teks": "Membesar/mengecil",
        "warna": "#BFDBFE"
      },
      {
        "teks": "Tabel",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba: terapkan Pola Berulang pada satu soal nyata di rumah.",
  "refleksi": [
    "Bagaimana Pola Berulang membantumu?",
    "Kapan memakai Pola Bertambah?",
    "Apa bedanya dengan hanya menghafal tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Repeating Pattern",
      "namaId": "Pola Berulang",
      "asal": "Pattern pedagogy",
      "ringkas": "Unit pola berulang menentukan suku berikutnya.",
      "tahap": [
        "Story",
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Growing Pattern",
      "namaId": "Pola Bertambah",
      "asal": "Van de Walle",
      "ringkas": "Tiap langkah menambah dengan aturan tetap.",
      "tahap": [
        "Mind",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Visual Structure",
      "namaId": "Struktur Visual",
      "asal": "Gestalt patterning",
      "ringkas": "Lihat kelompok bentuk, bukan hanya warna.",
      "tahap": [
        "Infografis",
        "Picture"
      ]
    }
  ]
};

export const SUB_B43: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Pola Bilangan)",
  "fullTitle": "Sub-Bab B: Pola Bilangan",
  "targetDescription": "Siswa menemukan dan membuat pola bilangan membesar (3,5,7…; 1,4,7…; telur +8) dan mengecil (23,18,13…; 32,28…; produksi TV −6) dengan mengamati selisih tetap, serta menyelesaikan cerita rak buku, kursi, dan panen. Siswa memakai cara Barisan Aritmetika Sederhana, Mesin Fungsi, Tabel Nilai. Siswa memakai cara Barisan Aritmetika Sederhana, Mesin Fungsi, Tabel Nilai.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Kita belajar pola bilangan. Tiga, lima, tujuh, sembilan, sebelas, bedanya plus dua. Satu, empat, tujuh, sepuluh, bedanya plus tiga. Dua puluh tiga, delapan belas, tiga belas, delapan, bedanya minus lima. Pola bilangan bisa membesar atau mengecil. Kita memakai cara: Barisan Aritmetika Sederhana, Mesin Fungsi, Tabel Nilai. Beda tetap antar suku. Aturan mengubah masukan jadi keluaran. Catat suku ke-n dan nilainya. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menemukan dan membuat pola bilangan membesar dan mengecil.",
    "referensi": "Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 3 Sub-Bab B)."
  },
  "videos": [
    {
      "id": "K4B3B-V1",
      "judul": "Beda Tetap",
      "subjudul": "Arithmetic Sequence",
      "adegan": [
        {
          "id": "K4B3B-V1-1",
          "judul": "Deret buku",
          "ketukan": [
            "Bayangkan kamu sedang mempelajari Pola Bilangan. Lihat deret tiga, lima, tujuh, sembilan, sebelas.",
            "Apa hubungan antar bilangan.",
            "Tiap langkah ditambah dua.",
            "Ingat cara Barisan Aritmetika Sederhana: Beda tetap antar suku. Ingat cara Barisan Aritmetika Sederhana: Beda tetap antar suku."
          ],
          "papan": [
            "3 5 7 9 11",
            "hubungan?",
            "+2",
            "beda"
          ]
        },
        {
          "id": "K4B3B-V1-2",
          "judul": "Suku ke-6",
          "ketukan": [
            "Suku berikutnya sebelas plus dua.",
            "Hasilnya tiga belas.",
            "Pola membesar.",
            "Di sini kita memakai ide Arithmetic Sequence — Beda tetap antar suku. Di sini kita memakai Arithmetic Sequence. Beda tetap antar suku."
          ],
          "papan": [
            "11+2",
            "13",
            "membesar",
            "besar"
          ]
        },
        {
          "id": "K4B3B-V1-3",
          "judul": "Kasus +3",
          "ketukan": [
            "Kasus satu: satu, empat, tujuh, sepuluh.",
            "Bedanya plus tiga.",
            "Lanjutannya tiga belas.",
            "METODE LUAR · Barisan Aritmetika Sederhana: Beda tetap antar suku."
          ],
          "papan": [
            "1 4 7 10",
            "+3",
            "13",
            "amati"
          ]
        }
      ]
    },
    {
      "id": "K4B3B-V2",
      "judul": "Latihan: Mesin Fungsi",
      "subjudul": "Function Machine",
      "adegan": [
        {
          "id": "K4B3B-V2-1",
          "judul": "Kasus dua",
          "ketukan": [
            "Dua puluh tiga, delapan belas, tiga belas, delapan.",
            "Selisihnya minus lima.",
            "Lanjutannya tiga.",
            "Ingat cara Mesin Fungsi: Aturan mengubah masukan jadi keluaran. Ingat cara Mesin Fungsi: Aturan mengubah masukan jadi keluaran."
          ],
          "papan": [
            "23 18 13 8",
            "−5",
            "mengecil",
            "mesin"
          ]
        },
        {
          "id": "K4B3B-V2-2",
          "judul": "Ingat definisi",
          "ketukan": [
            "Pola bilangan punya aturan penyusunan.",
            "Bisa membesar atau mengecil.",
            "Kuncinya beda antar suku.",
            "Di sini kita memakai ide Function Machine — Aturan mengubah masukan jadi keluaran. Di sini kita memakai Function Machine. Aturan mengubah masukan jadi keluaran."
          ],
          "papan": [
            "aturan",
            "beda",
            "tabel",
            "mesin"
          ]
        },
        {
          "id": "K4B3B-V2-3",
          "judul": "Contoh 32…",
          "ketukan": [
            "Tiga puluh dua, dua puluh delapan, dua puluh empat.",
            "Bedanya minus empat.",
            "Ini pola mengecil.",
            "METODE LUAR · Mesin Fungsi: Aturan mengubah masukan jadi keluaran."
          ],
          "papan": [
            "32 28 24",
            "−4",
            "mengecil",
            "cerita"
          ]
        }
      ]
    },
    {
      "id": "K4B3B-V3",
      "judul": "Siap pakai Table of Values",
      "subjudul": "Table of Values",
      "adegan": [
        {
          "id": "K4B3B-V3-1",
          "judul": "Panen telur",
          "ketukan": [
            "Hari satu dua puluh telur.",
            "Hari dua dua puluh delapan.",
            "Hari tiga tiga puluh enam.",
            "Ingat cara Tabel Nilai: Catat suku ke-n dan nilainya. Ingat cara Tabel Nilai: Catat suku ke-n dan nilainya."
          ],
          "papan": [
            "20",
            "28",
            "36",
            "+8"
          ]
        },
        {
          "id": "K4B3B-V3-2",
          "judul": "Hari ke-5",
          "ketukan": [
            "Lanjutkan pola sampai hari lima.",
            "Hasilnya lima puluh dua.",
            "Cerita memakai pola bilangan.",
            "Di sini kita memakai ide Table of Values — Catat suku ke-n dan nilainya. Di sini kita memakai Table of Values. Catat suku ke-n dan nilainya."
          ],
          "papan": [
            "hari 5",
            "52",
            "cerita",
            "deret"
          ]
        },
        {
          "id": "K4B3B-V3-3",
          "judul": "Siap berlatih",
          "ketukan": [
            "Rak buku, kursi, dan televisi juga berpola.",
            "Cari bedanya dulu.",
            "Lalu hitung suku yang diminta.",
            "METODE LUAR · Tabel Nilai: Catat suku ke-n dan nilainya."
          ],
          "papan": [
            "rak/kursi",
            "cari beda",
            "hitung",
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
      "stepDesc": "Apa yang ditanyakan pada Pola Bilangan?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Arithmetic Sequence",
      "stepDesc": "Beda tetap antar suku.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Function Machine",
      "stepDesc": "Aturan mengubah masukan jadi keluaran.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Table of Values",
      "stepDesc": "Catat suku ke-n dan nilainya.",
      "icon": "✨",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Kerjakan",
      "stepDesc": "Terapkan cara itu pada angka atau gambar.",
      "icon": "✏️",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek masuk akal",
      "stepDesc": "Apakah hasilnya masuk akal?",
      "icon": "✅",
      "flowFrom": "5",
      "flowTo": "7"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Simpulkan",
      "stepDesc": "Jelaskan ide utamanya dengan kalimatmu.",
      "icon": "💬",
      "flowFrom": "6",
      "flowTo": "8"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Main",
      "stepDesc": "Latih di Concrete sampai Abstract.",
      "icon": "🎮",
      "flowFrom": "7",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "BEDA",
      "emoji": "➖",
      "countNum": 1,
      "countWord": "kunci",
      "suara": "Selisih tetap."
    },
    {
      "judul": "+2",
      "emoji": "📈",
      "countNum": 2,
      "countWord": "contoh",
      "suara": "3,5,7…"
    },
    {
      "judul": "+3",
      "emoji": "3️⃣",
      "countNum": 3,
      "countWord": "kasus",
      "suara": "1,4,7,10…"
    },
    {
      "judul": "−5",
      "emoji": "📉",
      "countNum": 5,
      "countWord": "kasus",
      "suara": "23,18,13…"
    },
    {
      "judul": "−4",
      "emoji": "📉",
      "countNum": 4,
      "countWord": "contoh",
      "suara": "32,28,24…"
    },
    {
      "judul": "+8",
      "emoji": "🥚",
      "countNum": 8,
      "countWord": "telur",
      "suara": "20→52."
    },
    {
      "judul": "13",
      "emoji": "✅",
      "countNum": 6,
      "countWord": "lanjut",
      "suara": "Setelah 11."
    },
    {
      "judul": "3",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "lanjut",
      "suara": "Setelah 8."
    },
    {
      "judul": "TABEL",
      "emoji": "📋",
      "countNum": 1,
      "countWord": "alat",
      "suara": "Uraian hari."
    },
    {
      "judul": "INGAT",
      "emoji": "📜",
      "countNum": 1,
      "countWord": "definisi",
      "suara": "Ada aturan."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "baca-bil",
      "title": "Baca Pola Bilangan",
      "bookReference": "hlm. 96–97 (3,5,7…)",
      "objective": "Pakai Barisan Aritmetika Sederhana: Beda tetap antar suku. Latihan: Membaca beda bilangan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Barisan Aritmetika Sederhana: Beda tetap antar suku.",
      "voiceGuide": "Barisan Aritmetika Sederhana. Beda tetap antar suku.",
      "emoji": "🔢",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "lanjut-besar-b",
      "title": "Lanjutkan Pola Membesar",
      "bookReference": "hlm. 97 (kasus +3)",
      "objective": "Pakai Barisan Aritmetika Sederhana: Beda tetap antar suku. Latihan: Suku berikutnya..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Barisan Aritmetika Sederhana: Beda tetap antar suku.",
      "voiceGuide": "Barisan Aritmetika Sederhana. Beda tetap antar suku.",
      "emoji": "📈",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "lanjut-kecil-b",
      "title": "Lanjutkan Pola Mengecil",
      "bookReference": "hlm. 98 (kasus −5)",
      "objective": "Pakai Barisan Aritmetika Sederhana: Beda tetap antar suku. Latihan: Suku mengecil..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Barisan Aritmetika Sederhana: Beda tetap antar suku.",
      "voiceGuide": "Barisan Aritmetika Sederhana. Beda tetap antar suku.",
      "emoji": "📉",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-bil",
      "title": "Pilah Membesar/Mengecil",
      "bookReference": "hlm. 97–98",
      "objective": "Pakai Barisan Aritmetika Sederhana: Beda tetap antar suku. Latihan: Memilah..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Barisan Aritmetika Sederhana: Beda tetap antar suku.",
      "voiceGuide": "Barisan Aritmetika Sederhana. Beda tetap antar suku.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-bil",
      "title": "Jodohkan Deret dan Beda",
      "bookReference": "hlm. 97–100",
      "objective": "Menjodohkan.. Ingat Barisan Aritmetika Sederhana. (Barisan Aritmetika Sederhana)",
      "mechanicDescription": "Tiga ronde. Gunakan Barisan Aritmetika Sederhana.",
      "voiceGuide": "Barisan Aritmetika Sederhana. Mainkan dengan teliti.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-bil",
      "title": "Memori Pola Bilangan",
      "bookReference": "hlm. 97–99",
      "objective": "Memori.. Ingat Barisan Aritmetika Sederhana. (Barisan Aritmetika Sederhana)",
      "mechanicDescription": "Tiga ronde. Gunakan Barisan Aritmetika Sederhana.",
      "voiceGuide": "Barisan Aritmetika Sederhana. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-bil",
      "title": "Ketuk Deret Diminta",
      "bookReference": "hlm. 97–100",
      "objective": "Mengetuk.. Ingat Barisan Aritmetika Sederhana. (Barisan Aritmetika Sederhana)",
      "mechanicDescription": "Tiga ronde. Gunakan Barisan Aritmetika Sederhana.",
      "voiceGuide": "Barisan Aritmetika Sederhana. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-bil",
      "title": "Ketuk Semua Jenis Bilangan",
      "bookReference": "hlm. 97–98",
      "objective": "Ketuk semua.. Ingat Barisan Aritmetika Sederhana. (Barisan Aritmetika Sederhana)",
      "mechanicDescription": "Tiga ronde. Gunakan Barisan Aritmetika Sederhana.",
      "voiceGuide": "Barisan Aritmetika Sederhana. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-bil",
      "title": "Cerita Telur, Rak, Kursi, TV",
      "bookReference": "hlm. 98–100",
      "objective": "Soal cerita.. Ingat Barisan Aritmetika Sederhana. (Barisan Aritmetika Sederhana)",
      "mechanicDescription": "Tiga ronde. Gunakan Barisan Aritmetika Sederhana.",
      "voiceGuide": "Barisan Aritmetika Sederhana. Mainkan dengan teliti.",
      "emoji": "🥚",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-bil",
      "title": "Urutkan Bilangan Pola",
      "bookReference": "hlm. 96–99",
      "objective": "Mengurutkan.. Ingat Barisan Aritmetika Sederhana. (Barisan Aritmetika Sederhana)",
      "mechanicDescription": "Tiga ronde. Gunakan Barisan Aritmetika Sederhana.",
      "voiceGuide": "Barisan Aritmetika Sederhana. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "rantai-besar",
      "title": "Rantai Membesar",
      "bookReference": "hlm. 97",
      "objective": "Pakai Mesin Fungsi: Aturan mengubah masukan jadi keluaran. Latihan: Baca rantai..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Mesin Fungsi: Aturan mengubah masukan jadi keluaran.",
      "voiceGuide": "Mesin Fungsi. Aturan mengubah masukan jadi keluaran.",
      "diagramType": "chain",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "rantai-kecil",
      "title": "Rantai Mengecil",
      "bookReference": "hlm. 98",
      "objective": "Pakai Mesin Fungsi: Aturan mengubah masukan jadi keluaran. Latihan: Baca rantai..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Mesin Fungsi: Aturan mengubah masukan jadi keluaran.",
      "voiceGuide": "Mesin Fungsi. Aturan mengubah masukan jadi keluaran.",
      "diagramType": "chain",
      "numberA": 23,
      "numberB": 8
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-b",
      "title": "Jodohkan Rantai Bilangan",
      "bookReference": "hlm. 97–100",
      "objective": "Pakai Mesin Fungsi: Aturan mengubah masukan jadi keluaran. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Mesin Fungsi: Aturan mengubah masukan jadi keluaran.",
      "voiceGuide": "Mesin Fungsi. Aturan mengubah masukan jadi keluaran.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-b",
      "title": "Memori Rantai",
      "bookReference": "hlm. 97",
      "objective": "Pakai Mesin Fungsi: Aturan mengubah masukan jadi keluaran. Latihan: Memori..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Mesin Fungsi: Aturan mengubah masukan jadi keluaran.",
      "voiceGuide": "Mesin Fungsi. Aturan mengubah masukan jadi keluaran.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-b",
      "title": "Tabel Uraian Bilangan",
      "bookReference": "hlm. 96 & 99",
      "objective": "Isi lanjut.. Ingat Mesin Fungsi. (Mesin Fungsi)",
      "mechanicDescription": "Tiga tabel. Gunakan Mesin Fungsi.",
      "voiceGuide": "Mesin Fungsi. Mainkan dengan teliti.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-b",
      "title": "Ketuk Semua Rantai",
      "bookReference": "hlm. 97–98",
      "objective": "Ketuk semua.. Ingat Mesin Fungsi. (Mesin Fungsi)",
      "mechanicDescription": "Tiga ronde. Gunakan Mesin Fungsi.",
      "voiceGuide": "Mesin Fungsi. Mainkan dengan teliti.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-b",
      "title": "Pilah Rantai Pola",
      "bookReference": "hlm. 97–98",
      "objective": "Pilah.. Ingat Mesin Fungsi. (Mesin Fungsi)",
      "mechanicDescription": "Tiga ronde. Gunakan Mesin Fungsi.",
      "voiceGuide": "Mesin Fungsi. Mainkan dengan teliti.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "beda-bil",
      "title": "Temukan Beda Bilangan",
      "bookReference": "hlm. 97–98",
      "objective": "Pilih beda.. Ingat Mesin Fungsi. (Mesin Fungsi)",
      "mechanicDescription": "Tiga ronde. Gunakan Mesin Fungsi.",
      "voiceGuide": "Mesin Fungsi. Mainkan dengan teliti.",
      "diagramType": "diff",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "choose-next-b",
      "title": "Pilih Bilangan Berikutnya",
      "bookReference": "hlm. 99–100",
      "objective": "Pilih lanjut.. Ingat Mesin Fungsi. (Mesin Fungsi)",
      "mechanicDescription": "Tiga ronde. Gunakan Mesin Fungsi.",
      "voiceGuide": "Mesin Fungsi. Mainkan dengan teliti.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-b",
      "title": "Cerita Diagram Bilangan",
      "bookReference": "hlm. 98–100",
      "objective": "Cerita + rantai.. Ingat Mesin Fungsi. (Mesin Fungsi)",
      "mechanicDescription": "Tiga ronde. Gunakan Mesin Fungsi.",
      "voiceGuide": "Mesin Fungsi. Mainkan dengan teliti.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-next-b",
      "title": "Tulis Suku Berikutnya",
      "bookReference": "hlm. 97–100",
      "objective": "Pakai Tabel Nilai: Catat suku ke-n dan nilainya. Latihan: Menulis lanjut..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Tabel Nilai: Catat suku ke-n dan nilainya.",
      "voiceGuide": "Tabel Nilai. Catat suku ke-n dan nilainya.",
      "symbolLarge": "13",
      "wordLarge": "LANJUT",
      "mathNotation": "a_n"
    },
    {
      "stage": "Abstract",
      "gameType": "write-beda-b",
      "title": "Tulis Beda Bilangan",
      "bookReference": "hlm. 97–98",
      "objective": "Pakai Tabel Nilai: Catat suku ke-n dan nilainya. Latihan: Menulis beda..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Tabel Nilai: Catat suku ke-n dan nilainya.",
      "voiceGuide": "Tabel Nilai. Catat suku ke-n dan nilainya.",
      "symbolLarge": "+3",
      "wordLarge": "BEDA",
      "mathNotation": "d"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-jenis-b",
      "title": "Pilih Jenis Bilangan",
      "bookReference": "hlm. 98",
      "objective": "Pakai Tabel Nilai: Catat suku ke-n dan nilainya. Latihan: Membesar/mengecil..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Tabel Nilai: Catat suku ke-n dan nilainya.",
      "voiceGuide": "Tabel Nilai. Catat suku ke-n dan nilainya.",
      "symbolLarge": "📈",
      "wordLarge": "JENIS",
      "mathNotation": "jenis"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-b",
      "title": "Urutkan Suku Bilangan",
      "bookReference": "hlm. 96–99",
      "objective": "Pakai Tabel Nilai: Catat suku ke-n dan nilainya. Latihan: Mengurutkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Tabel Nilai: Catat suku ke-n dan nilainya.",
      "voiceGuide": "Tabel Nilai. Catat suku ke-n dan nilainya.",
      "symbolLarge": "3<5<7",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-b",
      "title": "Jodohkan Notasi Bilangan",
      "bookReference": "hlm. 97–100",
      "objective": "Jodohkan.. Ingat Tabel Nilai. (Tabel Nilai)",
      "mechanicDescription": "Tiga ronde. Gunakan Tabel Nilai.",
      "voiceGuide": "Tabel Nilai. Mainkan dengan teliti.",
      "symbolLarge": "1,4,7",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-b",
      "title": "Memori Notasi Bilangan",
      "bookReference": "hlm. 97",
      "objective": "Memori.. Ingat Tabel Nilai. (Tabel Nilai)",
      "mechanicDescription": "Tiga ronde. Gunakan Tabel Nilai.",
      "voiceGuide": "Tabel Nilai. Mainkan dengan teliti.",
      "symbolLarge": "-5",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-b",
      "title": "Benar atau Salah: Pola Bilangan",
      "bookReference": "hlm. 96–99",
      "objective": "Menilai.. Ingat Tabel Nilai. (Tabel Nilai)",
      "mechanicDescription": "Dua ronde. Gunakan Tabel Nilai.",
      "voiceGuide": "Tabel Nilai. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-b",
      "title": "Detektif Pola Bilangan",
      "bookReference": "hlm. 96–100",
      "objective": "Petunjuk → suku.. Ingat Tabel Nilai. (Tabel Nilai)",
      "mechanicDescription": "Empat soal. Gunakan Tabel Nilai.",
      "voiceGuide": "Tabel Nilai. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-b",
      "title": "Peta Konsep Pola Bilangan",
      "bookReference": "hlm. 96–98",
      "objective": "Mengisi kotak.. Ingat Tabel Nilai. (Tabel Nilai)",
      "mechanicDescription": "Satu peta. Gunakan Tabel Nilai.",
      "voiceGuide": "Tabel Nilai. Mainkan dengan teliti.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-b",
      "title": "Cerita Angka Pola Bilangan",
      "bookReference": "hlm. 98–100",
      "objective": "Soal cerita.. Ingat Tabel Nilai. (Tabel Nilai)",
      "mechanicDescription": "Tiga ronde. Gunakan Tabel Nilai.",
      "voiceGuide": "Tabel Nilai. Mainkan dengan teliti.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "🔢",
      "nama": "Definisi",
      "isi": "Pola bilangan adalah susunan bilangan beraturan.",
      "suara": "Ada aturan penyusunan."
    },
    {
      "ikon": "🌍",
      "nama": "Barisan Aritmetika Sederhana",
      "isi": "Beda tetap antar suku.",
      "suara": "Barisan Aritmetika Sederhana. Beda tetap antar suku."
    },
    {
      "ikon": "🌍",
      "nama": "Mesin Fungsi",
      "isi": "Aturan mengubah masukan jadi keluaran.",
      "suara": "Mesin Fungsi. Aturan mengubah masukan jadi keluaran."
    },
    {
      "ikon": "🌍",
      "nama": "Tabel Nilai",
      "isi": "Catat suku ke-n dan nilainya.",
      "suara": "Tabel Nilai. Catat suku ke-n dan nilainya."
    }
  ],
  "poinSuara": "Ingat: Barisan Aritmetika Sederhana, Mesin Fungsi, Tabel Nilai.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Definisi",
        "warna": "#FDE68A"
      },
      {
        "teks": "Beda",
        "warna": "#BBF7D0"
      },
      {
        "teks": "Jenis",
        "warna": "#BFDBFE"
      },
      {
        "teks": "Cerita",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba: terapkan Barisan Aritmetika Sederhana pada satu soal nyata di rumah.",
  "refleksi": [
    "Bagaimana Barisan Aritmetika Sederhana membantumu?",
    "Kapan memakai Mesin Fungsi?",
    "Apa bedanya dengan hanya menghafal tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Arithmetic Sequence",
      "namaId": "Barisan Aritmetika Sederhana",
      "asal": "Number patterns",
      "ringkas": "Beda tetap antar suku.",
      "tahap": [
        "Story",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Function Machine",
      "namaId": "Mesin Fungsi",
      "asal": "Input-output pedagogy",
      "ringkas": "Aturan mengubah masukan jadi keluaran.",
      "tahap": [
        "Picture",
        "Mind"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Table of Values",
      "namaId": "Tabel Nilai",
      "asal": "Pattern tables",
      "ringkas": "Catat suku ke-n dan nilainya.",
      "tahap": [
        "Infografis",
        "Abstract"
      ]
    }
  ]
};

export const SUB_BAB_K4B3: SubBabNaskah[] = [SUB_A43, SUB_B43];
export const semuaAdeganK4B3 = SUB_BAB_K4B3.flatMap((s) => s.videos.flatMap((v) => v.adegan));
