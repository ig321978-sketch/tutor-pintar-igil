/**
 * Naskah murni Matematika Kelas 4 Bab 4 (Pengukuran Luas dan Volume): Sub-Bab A–B.
 * Sumber: Buku Siswa Matematika Kelas IV Kemendikbudristek Bab 4 hlm. 103–138.
 * Satu sumber: buat-k4-bab4.mjs → kelas4-bab4.json. Tanpa React/jaringan.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K4B4_META = {
  "chapterId": "k4-mat-bab4",
  "phaseCode": "FASE_B",
  "grade": 4,
  "subjectLabel": "MATEMATIKA - KELAS 4 SD",
  "title": "BAB 4: PENGUKURAN LUAS DAN VOLUME",
  "silabusElemen": "🌈 Fase B • Elemen Pengukuran: Luas (satuan baku & tidak baku, cm², m²) dan Volume (ml, liter, cm³, m³) (Kelas 4 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A44: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Pengukuran Luas)",
  "fullTitle": "Sub-Bab A: Pengukuran Luas",
  "targetDescription": "Siswa mengukur dan menduga luas dengan satuan tidak baku (uang kertas, origami, buku) dan satuan baku (cm², m²), menghitung persegi satuan, serta mengonversi 1 m² = 10.000 cm² sesuai Buku Siswa Kelas IV Bab 4.",
  "secondaryBg": "#FFEDD5",
  "secondaryBorder": "#EA580C",
  "secondaryText": "#7C2D12",
  "silabus": {
    "teksSuara": "Kita belajar pengukuran luas. Helen menutup meja dengan uang kertas tanpa celah. Itu satuan tidak baku. Lalu kita pakai persegi satu sentimeter dan satu meter sebagai satuan baku. Satu meter persegi sama dengan sepuluh ribu sentimeter persegi. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa mengukur dan menduga luas dengan satuan baku dan tidak baku.",
    "referensi": "Buku Siswa Matematika Kelas IV Bab 4 Sub-Bab A hlm. 105–121; area with non-standard & standard units; van Hiele informal measurement."
  },
  "videos": [
    {
      "id": "K4B4A-V1",
      "judul": "Meja dan Uang Kertas",
      "subjudul": "Satuan tidak baku",
      "adegan": [
        {
          "id": "K4B4A-V1-1",
          "judul": "Meja beda ukuran",
          "ketukan": [
            "Helen melihat meja lipat kecil.",
            "Meja guru lebih luas.",
            "Bagaimana mengukur luasnya?",
            "Pakai benda sama ukuran."
          ],
          "papan": [
            "meja kecil",
            "meja guru",
            "ukur?",
            "benda sama"
          ]
        },
        {
          "id": "K4B4A-V1-2",
          "judul": "Tutup tanpa celah",
          "ketukan": [
            "Uang kertas disusun rapat.",
            "Tanpa celah dan tanpa tumpang tindih.",
            "Satu uang kertas = satu satuan luas.",
            "Hitung banyaknya satuan."
          ],
          "papan": [
            "rapat",
            "tanpa celah",
            "1 satuan",
            "hitung"
          ]
        },
        {
          "id": "K4B4A-V1-3",
          "judul": "Kesimpulan",
          "ketukan": [
            "Origami, buku, atau kartu juga boleh.",
            "Banyaknya bisa berbeda.",
            "Karena ukuran bendanya beda.",
            "Itulah satuan tidak baku."
          ],
          "papan": [
            "origami",
            "beda banyak",
            "beda ukuran",
            "tidak baku"
          ]
        }
      ]
    },
    {
      "id": "K4B4A-V2",
      "judul": "cm² dan m²",
      "subjudul": "Satuan baku luas",
      "adegan": [
        {
          "id": "K4B4A-V2-1",
          "judul": "Persegi 1 cm",
          "ketukan": [
            "Ambil persegi sisi satu sentimeter.",
            "Luasnya satu sentimeter persegi.",
            "Ditulis satu cm persegi.",
            "Ini satuan baku."
          ],
          "papan": [
            "1 cm",
            "1 cm²",
            "baku",
            "kecil"
          ]
        },
        {
          "id": "K4B4A-V2-2",
          "judul": "Persegi 1 m",
          "ketukan": [
            "Untuk lapangan yang besar,",
            "pakai persegi sisi satu meter.",
            "Luasnya satu meter persegi.",
            "Ditulis satu m persegi."
          ],
          "papan": [
            "1 m",
            "1 m²",
            "lapangan",
            "besar"
          ]
        },
        {
          "id": "K4B4A-V2-3",
          "judul": "Hitung kisi",
          "ketukan": [
            "Gambar diarsir dihitung selnya.",
            "Tiap sel satu cm persegi.",
            "Contoh buku: tiga belas cm persegi.",
            "Bentuk boleh berbeda."
          ],
          "papan": [
            "hitung sel",
            "1 cm²",
            "13 cm²",
            "bentuk beda"
          ]
        }
      ]
    },
    {
      "id": "K4B4A-V3",
      "judul": "Konversi 10.000",
      "subjudul": "1 m² = 10.000 cm²",
      "adegan": [
        {
          "id": "K4B4A-V3-1",
          "judul": "1 m = 100 cm",
          "ketukan": [
            "Satu meter sama dengan seratus cm.",
            "Untuk luas, kalikan panjang dan lebar.",
            "Seratus kali seratus.",
            "Hasilnya sepuluh ribu."
          ],
          "papan": [
            "100 cm",
            "×",
            "100",
            "10.000"
          ]
        },
        {
          "id": "K4B4A-V3-2",
          "judul": "Rumus baku",
          "ketukan": [
            "Jadi satu meter persegi",
            "sama dengan sepuluh ribu cm persegi.",
            "Ingat angka ini.",
            "Sering dipakai soal."
          ],
          "papan": [
            "1 m²",
            "=",
            "10.000 cm²",
            "ingat"
          ]
        },
        {
          "id": "K4B4A-V3-3",
          "judul": "Siap berlatih",
          "ketukan": [
            "Kamu sudah siap mengukur luas.",
            "Pilih satuan yang cocok.",
            "Hitung persegi satuan.",
            "Ayo ke permainan."
          ],
          "papan": [
            "siap",
            "pilih satuan",
            "hitung",
            "main"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Apa itu luas?",
      "stepDesc": "Menutup permukaan tanpa celah",
      "icon": "🟧",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Tidak baku",
      "stepDesc": "Uang, origami, buku, kartu",
      "icon": "💵",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Baku",
      "stepDesc": "cm² dan m²",
      "icon": "📏",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Hitung sel",
      "stepDesc": "Persegi satuan pada kisi",
      "icon": "🔢",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Konversi",
      "stepDesc": "1 m² = 10.000 cm²",
      "icon": "🔄",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Bentuk vs luas",
      "stepDesc": "Bentuk beda, luas bisa sama",
      "icon": "🧩",
      "flowFrom": "5",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "Tutup permukaan",
      "emoji": "🟧",
      "countNum": 1,
      "countWord": "tanpa celah",
      "suara": "Luas menutup permukaan tanpa celah."
    },
    {
      "judul": "Tidak baku",
      "emoji": "💵",
      "countNum": 1,
      "countWord": "uang kertas",
      "suara": "Uang kertas contoh satuan tidak baku."
    },
    {
      "judul": "1 cm²",
      "emoji": "📏",
      "countNum": 1,
      "countWord": "baku kecil",
      "suara": "Satu cm kali satu cm sama dengan satu cm persegi."
    },
    {
      "judul": "1 m²",
      "emoji": "🏟️",
      "countNum": 1,
      "countWord": "baku besar",
      "suara": "Satu m kali satu m sama dengan satu m persegi."
    },
    {
      "judul": "10.000",
      "emoji": "🔄",
      "countNum": 10000,
      "countWord": "cm²",
      "suara": "Satu m persegi sama dengan sepuluh ribu cm persegi."
    },
    {
      "judul": "13 cm²",
      "emoji": "🧩",
      "countNum": 13,
      "countWord": "contoh buku",
      "suara": "Dua bangun berbeda bisa sama-sama tiga belas cm persegi."
    },
    {
      "judul": "4 satuan",
      "emoji": "📄",
      "countNum": 4,
      "countWord": "lipat",
      "suara": "Aktivitas lipat nomor lima menghasilkan empat persegi satuan."
    },
    {
      "judul": "16 satuan",
      "emoji": "📄",
      "countNum": 16,
      "countWord": "lipat",
      "suara": "Aktivitas lipat nomor enam menghasilkan enam belas persegi satuan."
    },
    {
      "judul": "Pilih satuan",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "cocok",
      "suara": "Pilih cm persegi atau m persegi sesuai ukuran benda."
    },
    {
      "judul": "Siap Sub-Bab B",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "volume",
      "suara": "Berikutnya kita belajar volume."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-kisi",
      "title": "Hitung Persegi Satuan",
      "bookReference": "hlm. 114–115",
      "objective": "Menghitung luas kisi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih luas.",
      "emoji": "🟧",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "satuan-luas",
      "title": "Pilih Satuan Luas",
      "bookReference": "hlm. 116–117",
      "objective": "Membedakan baku/tidak baku.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih satuan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "konversi-luas",
      "title": "Konversi cm² dan m²",
      "bookReference": "hlm. 117",
      "objective": "1 m² = 10.000 cm².",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih hasil.",
      "emoji": "🔄",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-luas",
      "title": "Pilah Baku/Tidak Baku",
      "bookReference": "hlm. 105–116",
      "objective": "Memilah satuan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-luas",
      "title": "Jodohkan Konsep Luas",
      "bookReference": "hlm. 116–120",
      "objective": "Menjodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-luas",
      "title": "Memori Luas",
      "bookReference": "hlm. 116–118",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-luas",
      "title": "Ketuk Bangun Luas",
      "bookReference": "hlm. 115–119",
      "objective": "Mengetuk.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-luas",
      "title": "Ketuk Semua Jenis Satuan",
      "bookReference": "hlm. 116",
      "objective": "Ketuk semua.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-luas",
      "title": "Cerita Meja Helen",
      "bookReference": "hlm. 107–114",
      "objective": "Soal cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "🪑",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-luas",
      "title": "Urutkan Nilai Luas",
      "bookReference": "hlm. 115–119",
      "objective": "Mengurutkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "kisi-besar",
      "title": "Diagram Kisi Membesar",
      "bookReference": "hlm. 115",
      "objective": "Baca kisi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "grid",
      "numberA": 4,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "kisi-sama",
      "title": "Luas Sama Bentuk Beda",
      "bookReference": "hlm. 118",
      "objective": "13 cm² dua bentuk.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "same",
      "numberA": 13,
      "numberB": 13
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-a",
      "title": "Jodohkan Diagram Luas",
      "bookReference": "hlm. 116–120",
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
      "title": "Memori Diagram Luas",
      "bookReference": "hlm. 117",
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
      "title": "Tabel Satuan Luas",
      "bookReference": "hlm. 117–120",
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
      "title": "Ketuk Semua Diagram Luas",
      "bookReference": "hlm. 116",
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
      "title": "Pilah Diagram Satuan",
      "bookReference": "hlm. 116",
      "objective": "Pilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "konversi-visual",
      "title": "Konversi Visual m²↔cm²",
      "bookReference": "hlm. 117",
      "objective": "Pilih konversi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "conv",
      "numberA": 1,
      "numberB": 10000
    },
    {
      "stage": "Picture",
      "gameType": "choose-luas",
      "title": "Pilih Luas Cocok",
      "bookReference": "hlm. 118–119",
      "objective": "Pilih luas.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "choose",
      "numberA": 9,
      "numberB": 13
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-a",
      "title": "Cerita Diagram Luas",
      "bookReference": "hlm. 107–119",
      "objective": "Cerita + gambar.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-luas",
      "title": "Tulis … cm² / m²",
      "bookReference": "hlm. 116–118",
      "objective": "Menulis satuan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "cm²",
      "wordLarge": "LUAS",
      "mathNotation": "satuan"
    },
    {
      "stage": "Abstract",
      "gameType": "write-konversi",
      "title": "Tulis Hasil Konversi",
      "bookReference": "hlm. 117",
      "objective": "Menulis 10.000.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "10000",
      "wordLarge": "KONVERSI",
      "mathNotation": "m²↔cm²"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-jenis",
      "title": "Pilih Jenis Satuan",
      "bookReference": "hlm. 105–116",
      "objective": "Baku/tidak baku.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "baku",
      "wordLarge": "JENIS",
      "mathNotation": "klasifikasi"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-a",
      "title": "Urutkan Notasi Luas",
      "bookReference": "hlm. 118–119",
      "objective": "Mengurutkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "symbolLarge": "4<13",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-a",
      "title": "Jodohkan Notasi Luas",
      "bookReference": "hlm. 116–120",
      "objective": "Jodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "symbolLarge": "1cm²",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-a",
      "title": "Memori Notasi Luas",
      "bookReference": "hlm. 117",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "symbolLarge": "m²",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-a",
      "title": "Benar atau Salah: Luas",
      "bookReference": "hlm. 105–118",
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
      "title": "Detektif Luas",
      "bookReference": "hlm. 107–118",
      "objective": "Petunjuk → jawaban.",
      "mechanicDescription": "Empat soal.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-a",
      "title": "Peta Konsep Luas",
      "bookReference": "hlm. 105–117",
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
      "title": "Cerita Angka Luas",
      "bookReference": "hlm. 107–119",
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
      "ikon": "🟧",
      "nama": "Tutup tanpa celah",
      "isi": "Luas = menutup permukaan tanpa celah dengan satuan yang sama.",
      "suara": "Luas berarti menutup permukaan tanpa celah."
    },
    {
      "ikon": "📏",
      "nama": "Baku cm² dan m²",
      "isi": "Persegi 1 cm × 1 cm = 1 cm². Persegi 1 m × 1 m = 1 m².",
      "suara": "Sentimeter persegi dan meter persegi adalah satuan baku."
    },
    {
      "ikon": "🔄",
      "nama": "Konversi 10.000",
      "isi": "1 m² = 10.000 cm² karena 100 × 100.",
      "suara": "Satu meter persegi sama dengan sepuluh ribu sentimeter persegi."
    },
    {
      "ikon": "🧩",
      "nama": "Bentuk boleh beda",
      "isi": "Dua bangun berbeda bentuk bisa punya luas sama, misalnya 13 cm².",
      "suara": "Bentuk berbeda boleh luasnya sama."
    }
  ],
  "poinSuara": "Ingat empat kunci luas.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Tutup tanpa celah",
        "warna": "#FDE68A"
      },
      {
        "teks": "Baku cm² dan m²",
        "warna": "#BBF7D0"
      },
      {
        "teks": "Konversi 10.000",
        "warna": "#BFDBFE"
      },
      {
        "teks": "Bentuk boleh beda",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: ukurlah luas sampul buku dengan uang mainan atau stiker sama ukuran tanpa celah. Catat berapa satuan, lalu bandingkan dengan persegi 1 cm jika ada penggaris.",
  "refleksi": [
    "Kapan memakai cm² dan kapan m²?",
    "Mengapa bentuk berbeda bisa punya luas sama?",
    "Apa bedanya satuan baku dan tidak baku?"
  ]
};

export const SUB_B44: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Pengukuran Volume)",
  "fullTitle": "Sub-Bab B: Pengukuran Volume",
  "targetDescription": "Siswa mengukur dan menduga volume dengan satuan tidak baku (gelas, botol sabun) dan satuan baku (ml, liter, cm³, m³), mengonversi 1 l = 1.000 ml dan 1 cm³ = 1 ml, serta menghitung kubus satuan sesuai Buku Siswa Kelas IV Bab 4.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Kita belajar pengukuran volume. Botol sabun A sama dengan empat botol B, atau sepuluh botol C. Lalu satuan baku: mililiter, liter, sentimeter kubik, dan meter kubik. Satu liter sama dengan seribu mililiter. Satu cm kubik sama dengan satu mililiter. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa mengukur dan menduga volume dengan satuan baku dan tidak baku.",
    "referensi": "Buku Siswa Matematika Kelas IV Bab 4 Sub-Bab B hlm. 122–138; capacity & cubic units; conservation of volume."
  },
  "videos": [
    {
      "id": "K4B4B-V1",
      "judul": "Botol Sabun A, B, C",
      "subjudul": "Satuan tidak baku",
      "adegan": [
        {
          "id": "K4B4B-V1-1",
          "judul": "Tiga botol",
          "ketukan": [
            "Ibu Helen punya tiga botol sabun.",
            "Botol A, B, dan C.",
            "Ukurannya berbeda.",
            "Mari bandingkan isinya."
          ],
          "papan": [
            "A B C",
            "beda",
            "isi?",
            "banding"
          ]
        },
        {
          "id": "K4B4B-V1-2",
          "judul": "A = 4B",
          "ketukan": [
            "Isi A dari botol B.",
            "Butuh empat botol B.",
            "Jadi A sama dengan empat B.",
            "B adalah satuan tidak baku."
          ],
          "papan": [
            "A",
            "= 4B",
            "tidak baku",
            "B"
          ]
        },
        {
          "id": "K4B4B-V1-3",
          "judul": "A = 10C",
          "ketukan": [
            "Isi A dari botol C.",
            "Butuh sepuluh botol C.",
            "A sama dengan sepuluh C.",
            "Karena C lebih kecil dari B."
          ],
          "papan": [
            "A",
            "= 10C",
            "C kecil",
            "beda satuan"
          ]
        }
      ]
    },
    {
      "id": "K4B4B-V2",
      "judul": "ml dan liter",
      "subjudul": "Satuan baku cairan",
      "adegan": [
        {
          "id": "K4B4B-V2-1",
          "judul": "Contoh kecil",
          "ketukan": [
            "Sendok berisi lima mililiter.",
            "Cangkir dua ratus empat puluh ml.",
            "Botol minuman tiga ratus tiga puluh ml.",
            "Mililiter untuk cairan kecil."
          ],
          "papan": [
            "5 ml",
            "240 ml",
            "330 ml",
            "kecil"
          ]
        },
        {
          "id": "K4B4B-V2-2",
          "judul": "1.000 ml = 1 l",
          "ketukan": [
            "Susu UHT satu ribu ml.",
            "Itu sama dengan satu liter.",
            "Satu liter sama seribu ml.",
            "Hafalkan konversi ini."
          ],
          "papan": [
            "1000 ml",
            "=",
            "1 l",
            "ingat"
          ]
        },
        {
          "id": "K4B4B-V2-3",
          "judul": "Sanitizer",
          "ketukan": [
            "Botol besar diisi ke botol kecil.",
            "Habis menjadi delapan botol kecil.",
            "Volume besar = delapan satuan kecil.",
            "Latihan satuan tidak baku."
          ],
          "papan": [
            "botol besar",
            "8 kecil",
            "8 satuan",
            "latihan"
          ]
        }
      ]
    },
    {
      "id": "K4B4B-V3",
      "judul": "cm³ dan kubus",
      "subjudul": "Volume pejal",
      "adegan": [
        {
          "id": "K4B4B-V3-1",
          "judul": "Dadu pejal",
          "ketukan": [
            "Dadu bukan cairan.",
            "Pakai sentimeter kubik.",
            "Kubus sisi satu cm = satu cm kubik.",
            "Satu cm kubik = satu ml."
          ],
          "papan": [
            "dadu",
            "cm³",
            "1×1×1",
            "= 1 ml"
          ]
        },
        {
          "id": "K4B4B-V3-2",
          "judul": "Hitung kubus",
          "ketukan": [
            "Susun kubus satuan.",
            "Hitung banyaknya kubus.",
            "Contoh buku: dua puluh empat cm kubik.",
            "Dan sembilan cm kubik."
          ],
          "papan": [
            "susun",
            "hitung",
            "24 cm³",
            "9 cm³"
          ]
        },
        {
          "id": "K4B4B-V3-3",
          "judul": "m³ besar",
          "ketukan": [
            "Untuk bak mandi yang besar,",
            "pakai meter kubik.",
            "Satu m kubik = seribu liter.",
            "Siap berlatih volume."
          ],
          "papan": [
            "m³",
            "besar",
            "1000 l",
            "siap"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Apa itu volume?",
      "stepDesc": "Isi ruang / kapasitas",
      "icon": "📦",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Tidak baku",
      "stepDesc": "Gelas, botol, sabun",
      "icon": "🧴",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Cairan baku",
      "stepDesc": "ml dan liter",
      "icon": "🥛",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Pejal baku",
      "stepDesc": "cm³ dan m³",
      "icon": "🧊",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Konversi",
      "stepDesc": "1 l = 1.000 ml; 1 cm³ = 1 ml",
      "icon": "🔄",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Hitung kubus",
      "stepDesc": "Jumlah kubus satuan",
      "icon": "🔢",
      "flowFrom": "5",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "Isi ruang",
      "emoji": "📦",
      "countNum": 1,
      "countWord": "volume",
      "suara": "Volume mengukur isi ruang atau kapasitas."
    },
    {
      "judul": "A = 4B",
      "emoji": "🧴",
      "countNum": 4,
      "countWord": "Kegiatan B.1",
      "suara": "Volume A sama dengan empat volume B."
    },
    {
      "judul": "A = 10C",
      "emoji": "🧴",
      "countNum": 10,
      "countWord": "Kegiatan B.2",
      "suara": "Volume A sama dengan sepuluh volume C."
    },
    {
      "judul": "5 ml",
      "emoji": "🥄",
      "countNum": 5,
      "countWord": "sendok",
      "suara": "Satu sendok sekitar lima mililiter."
    },
    {
      "judul": "1 liter",
      "emoji": "🥛",
      "countNum": 1000,
      "countWord": "ml",
      "suara": "Satu liter sama dengan seribu mililiter."
    },
    {
      "judul": "1 cm³",
      "emoji": "🧊",
      "countNum": 1,
      "countWord": "ml",
      "suara": "Satu cm kubik sama dengan satu mililiter."
    },
    {
      "judul": "1 m³",
      "emoji": "🛁",
      "countNum": 1000,
      "countWord": "liter",
      "suara": "Satu m kubik sama dengan seribu liter."
    },
    {
      "judul": "8 botol kecil",
      "emoji": "🧴",
      "countNum": 8,
      "countWord": "sanitizer",
      "suara": "Satu botol besar sama delapan botol kecil."
    },
    {
      "judul": "24 cm³",
      "emoji": "🔢",
      "countNum": 24,
      "countWord": "contoh buku",
      "suara": "Volume bangun contoh buku dua puluh empat cm kubik."
    },
    {
      "judul": "Selesai Bab 4 A–B",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "luas+volume",
      "suara": "Luas dan volume sudah lengkap untuk Materi."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-kubus",
      "title": "Hitung Kubus Satuan",
      "bookReference": "hlm. 135–136",
      "objective": "Menghitung volume.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih volume.",
      "emoji": "🧊",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "satuan-vol",
      "title": "Pilih Satuan Volume",
      "bookReference": "hlm. 124–134",
      "objective": "Baku/tidak baku.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih satuan.",
      "emoji": "🧴",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "konversi-vol",
      "title": "Konversi ml, l, cm³",
      "bookReference": "hlm. 129–135",
      "objective": "1 l = 1.000 ml.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih hasil.",
      "emoji": "🔄",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-vol",
      "title": "Pilah Baku/Tidak Baku Volume",
      "bookReference": "hlm. 122–134",
      "objective": "Memilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-vol",
      "title": "Jodohkan Konsep Volume",
      "bookReference": "hlm. 124–135",
      "objective": "Menjodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-vol",
      "title": "Memori Volume",
      "bookReference": "hlm. 124–131",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-vol",
      "title": "Ketuk Bangun Volume",
      "bookReference": "hlm. 135–136",
      "objective": "Mengetuk.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-vol",
      "title": "Ketuk Semua Jenis Volume",
      "bookReference": "hlm. 125–134",
      "objective": "Ketuk semua.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-vol",
      "title": "Cerita Botol Sabun Helen",
      "bookReference": "hlm. 123–126",
      "objective": "Soal cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "🧴",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-vol",
      "title": "Urutkan Nilai Volume",
      "bookReference": "hlm. 130–136",
      "objective": "Mengurutkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "kubus-besar",
      "title": "Diagram Kubus Membesar",
      "bookReference": "hlm. 135",
      "objective": "Baca kubus.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "cube",
      "numberA": 4,
      "numberB": 8
    },
    {
      "stage": "Picture",
      "gameType": "cairan",
      "title": "Diagram Cairan ml/l",
      "bookReference": "hlm. 129–131",
      "objective": "Baca cairan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "liquid",
      "numberA": 5,
      "numberB": 1000
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-b",
      "title": "Jodohkan Diagram Volume",
      "bookReference": "hlm. 124–135",
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
      "title": "Memori Diagram Volume",
      "bookReference": "hlm. 130",
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
      "title": "Tabel Satuan Volume",
      "bookReference": "hlm. 131–135",
      "objective": "Isi tabel.",
      "mechanicDescription": "Tiga tabel.",
      "voiceGuide": "Pilih.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-b",
      "title": "Ketuk Semua Diagram Volume",
      "bookReference": "hlm. 125",
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
      "title": "Pilah Diagram Volume",
      "bookReference": "hlm. 125–134",
      "objective": "Pilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "konversi-visual-b",
      "title": "Konversi Visual ml↔l",
      "bookReference": "hlm. 131",
      "objective": "Pilih konversi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "conv",
      "numberA": 1000,
      "numberB": 1
    },
    {
      "stage": "Picture",
      "gameType": "choose-vol",
      "title": "Pilih Volume Cocok",
      "bookReference": "hlm. 135–136",
      "objective": "Pilih volume.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "choose",
      "numberA": 9,
      "numberB": 24
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-b",
      "title": "Cerita Diagram Volume",
      "bookReference": "hlm. 123–136",
      "objective": "Cerita + gambar.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-vol",
      "title": "Tulis … ml / l / cm³",
      "bookReference": "hlm. 129–134",
      "objective": "Menulis satuan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "ml",
      "wordLarge": "VOLUME",
      "mathNotation": "satuan"
    },
    {
      "stage": "Abstract",
      "gameType": "write-konversi-b",
      "title": "Tulis Hasil Konversi Volume",
      "bookReference": "hlm. 131–135",
      "objective": "Menulis 1.000.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "1000",
      "wordLarge": "KONVERSI",
      "mathNotation": "ml↔l"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-jenis-b",
      "title": "Pilih Jenis Satuan Volume",
      "bookReference": "hlm. 122–134",
      "objective": "Baku/tidak baku.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "baku",
      "wordLarge": "JENIS",
      "mathNotation": "klasifikasi"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-b",
      "title": "Urutkan Notasi Volume",
      "bookReference": "hlm. 130–136",
      "objective": "Mengurutkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "symbolLarge": "5<330",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-b",
      "title": "Jodohkan Notasi Volume",
      "bookReference": "hlm. 124–135",
      "objective": "Jodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "symbolLarge": "1l",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-b",
      "title": "Memori Notasi Volume",
      "bookReference": "hlm. 131",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "symbolLarge": "cm³",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-b",
      "title": "Benar atau Salah: Volume",
      "bookReference": "hlm. 122–135",
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
      "title": "Detektif Volume",
      "bookReference": "hlm. 123–136",
      "objective": "Petunjuk → jawaban.",
      "mechanicDescription": "Empat soal.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-b",
      "title": "Peta Konsep Volume",
      "bookReference": "hlm. 122–135",
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
      "title": "Cerita Angka Volume",
      "bookReference": "hlm. 123–136",
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
      "ikon": "🧴",
      "nama": "Isi ruang",
      "isi": "Volume = isi ruang atau kapasitas wadah.",
      "suara": "Volume mengukur isi."
    },
    {
      "ikon": "🧊",
      "nama": "Tidak baku vs baku",
      "isi": "Botol/gelas = tidak baku. ml, l, cm³, m³ = baku.",
      "suara": "Pilih satuan yang tepat."
    },
    {
      "ikon": "🔄",
      "nama": "1 l = 1.000 ml",
      "isi": "1 cm³ = 1 ml. 1 m³ = 1.000 liter.",
      "suara": "Hafalkan konversi baku."
    },
    {
      "ikon": "📦",
      "nama": "Hitung kubus",
      "isi": "Volume pejal dihitung dari banyak kubus satuan.",
      "suara": "Hitung kubus satu-satu."
    }
  ],
  "poinSuara": "Ingat empat kunci volume.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Isi ruang",
        "warna": "#FDE68A"
      },
      {
        "teks": "Tidak baku vs baku",
        "warna": "#BBF7D0"
      },
      {
        "teks": "1 l = 1.000 ml",
        "warna": "#BFDBFE"
      },
      {
        "teks": "Hitung kubus",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: isi botol kecil ke botol besar sampai habis. Catat berapa botol kecil penuh. Bandingkan dengan label ml pada kemasan jika ada.",
  "refleksi": [
    "Kapan memakai ml dan kapan cm³?",
    "Mengapa A = 4B dan A = 10C bisa benar bersamaan?",
    "Apa bedanya volume cairan dan volume pejal?"
  ]
};

export const SUB_BAB_K4B4: SubBabNaskah[] = [SUB_A44, SUB_B44];
export const semuaAdeganK4B4 = SUB_BAB_K4B4.flatMap((s) => s.videos.flatMap((v) => v.adegan));
