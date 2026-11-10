/**
 * Naskah murni Matematika Kelas 5 Bab 2 (KPK dan FPB): Sub-Bab A–C.
 * Sumber: Buku Siswa Matematika Kelas V Kemendikbudristek Bab 2 hlm. 29–46.
 * Satu sumber: buat-k5-bab2.mjs → kelas5-bab2.json. Tanpa React/jaringan.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K5B2_META = {
  "chapterId": "k5-mat-bab2",
  "phaseCode": "FASE_C",
  "grade": 5,
  "subjectLabel": "MATEMATIKA - KELAS 5 SD",
  "title": "BAB 2: KPK DAN FPB",
  "silabusElemen": "🌈 Fase C • Elemen Bilangan: Kelipatan, Kelipatan Persekutuan (KPK), dan Faktor Bilangan (Kelas 5 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A52: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Kelipatan)",
  "fullTitle": "Sub-Bab A: Kelipatan",
  "targetDescription": "Siswa memahami arti kelipatan, mengenal barisan kelipatan melalui permainan tepuk bilangan, serta menandai kelipatan pada tabel sesuai Buku Siswa Kelas V Bab 2.",
  "secondaryBg": "#FFEDD5",
  "secondaryBorder": "#EA580C",
  "secondaryText": "#7C2D12",
  "silabus": {
    "teksSuara": "Kita belajar kelipatan. Kelipatan adalah hasil kali suatu bilangan dengan bilangan bulat positif. Kita bermain tepuk bilangan dan mewarnai tabel. Nol kali bilangan tidak dihitung sebagai kelipatan di buku ini. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menentukan bilangan kelipatan suatu bilangan.",
    "referensi": "Buku Siswa Matematika Kelas V Bab 2 Sub-Bab A hlm. 33–37; skip-counting; hundred chart multiples (Van de Walle)."
  },
  "videos": [
    {
      "id": "K5B2A-V1",
      "judul": "Apa Itu Kelipatan",
      "subjudul": "Definisi",
      "adegan": [
        {
          "id": "K5B2A-V1-1",
          "judul": "Hasil kali",
          "ketukan": [
            "Ambil bilangan tiga.",
            "Kalikan satu, dua, tiga, dan seterusnya.",
            "Hasilnya tiga, enam, sembilan.",
            "Itu kelipatan tiga."
          ],
          "papan": [
            "×1",
            "×2",
            "×3",
            "kelipatan"
          ]
        },
        {
          "id": "K5B2A-V1-2",
          "judul": "Bukan nol",
          "ketukan": [
            "Nol dikali tiga hasilnya nol.",
            "Di buku ini nol tidak dihitung.",
            "Kita mulai dari satu kali.",
            "Ingat aturan buku."
          ],
          "papan": [
            "0×3",
            "tidak",
            "mulai 1×",
            "aturan"
          ]
        },
        {
          "id": "K5B2A-V1-3",
          "judul": "Cek cepat",
          "ketukan": [
            "Bagaimana mengecek?",
            "Bagi bilangan itu.",
            "Jika habis tanpa sisa, ya.",
            "Jika ada sisa, bukan."
          ],
          "papan": [
            "bagi",
            "habis?",
            "ya",
            "bukan"
          ]
        }
      ]
    },
    {
      "id": "K5B2A-V2",
      "judul": "Tepuk Bilangan",
      "subjudul": "Permainan",
      "adegan": [
        {
          "id": "K5B2A-V2-1",
          "judul": "Aturan tepuk",
          "ketukan": [
            "Duduk melingkar.",
            "Sebut bilangan berurutan.",
            "Pada kelipatan tiga, bertepuk.",
            "Jangan salah sebut."
          ],
          "papan": [
            "lingkaran",
            "sebut",
            "tepuk",
            "fokus"
          ]
        },
        {
          "id": "K5B2A-V2-2",
          "judul": "Contoh tiga",
          "ketukan": [
            "Tiga, enam, sembilan.",
            "Itu saatnya tepuk.",
            "Empat dan lima biasa disebut.",
            "Latihan konsentrasi."
          ],
          "papan": [
            "3",
            "6",
            "9",
            "tepuk"
          ]
        },
        {
          "id": "K5B2A-V2-3",
          "judul": "Ganti bilangan",
          "ketukan": [
            "Bisa kelipatan tujuh.",
            "Bisa kelipatan sembilan.",
            "Aturannya sama.",
            "Seru dan fokus."
          ],
          "papan": [
            "7",
            "9",
            "sama",
            "seru"
          ]
        }
      ]
    },
    {
      "id": "K5B2A-V3",
      "judul": "Tabel Kelipatan",
      "subjudul": "Warnai",
      "adegan": [
        {
          "id": "K5B2A-V3-1",
          "judul": "Tabel satu sampai lima puluh",
          "ketukan": [
            "Salin tabel.",
            "Cari kelipatan tiga.",
            "Warnai bilangannya.",
            "Lihat polanya."
          ],
          "papan": [
            "tabel",
            "cari",
            "warnai",
            "pola"
          ]
        },
        {
          "id": "K5B2A-V3-2",
          "judul": "Latihan tujuh dan sembilan",
          "ketukan": [
            "Ulang untuk tujuh.",
            "Ulang untuk sembilan.",
            "Tulis lima kelipatan enam.",
            "Tulis lima kelipatan delapan."
          ],
          "papan": [
            "7",
            "9",
            "6",
            "8"
          ]
        },
        {
          "id": "K5B2A-V3-3",
          "judul": "Siap bermain",
          "ketukan": [
            "Definisi sudah jelas.",
            "Tepuk dan tabel sudah siap.",
            "Ayo ke permainan.",
            "Semangat!"
          ],
          "papan": [
            "arti",
            "latihan",
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
      "stepTitle": "1. Pilih bilangan",
      "stepDesc": "Misalnya 3",
      "icon": "🔢",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Kalikan",
      "stepDesc": "1×, 2×, 3×, …",
      "icon": "✖️",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Daftar",
      "stepDesc": "3, 6, 9, …",
      "icon": "📋",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Cek bagi",
      "stepDesc": "Habis tanpa sisa?",
      "icon": "✅",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Tabel",
      "stepDesc": "Warnai kelipatan",
      "icon": "🎨",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Tepuk",
      "stepDesc": "Latihan fokus",
      "icon": "👏",
      "flowFrom": "5",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "Arti",
      "emoji": "📖",
      "countNum": 1,
      "countWord": "hasil kali",
      "suara": "Kelipatan = hasil kali bilangan."
    },
    {
      "judul": "Contoh 3",
      "emoji": "3️⃣",
      "countNum": 3,
      "countWord": "3,6,9,…",
      "suara": "Kelipatan tiga."
    },
    {
      "judul": "Cek",
      "emoji": "➗",
      "countNum": 1,
      "countWord": "bagi habis",
      "suara": "Tanpa sisa berarti ya."
    },
    {
      "judul": "Bukan 0",
      "emoji": "0️⃣",
      "countNum": 0,
      "countWord": "kecuali",
      "suara": "0×n tidak dihitung."
    },
    {
      "judul": "Tepuk",
      "emoji": "👏",
      "countNum": 1,
      "countWord": "permainan",
      "suara": "Tepuk pada kelipatan."
    },
    {
      "judul": "Tabel",
      "emoji": "▦",
      "countNum": 50,
      "countWord": "1–50",
      "suara": "Warnai kelipatan."
    },
    {
      "judul": "7",
      "emoji": "7️⃣",
      "countNum": 7,
      "countWord": "7,14,21,…",
      "suara": "Contoh kelipatan tujuh."
    },
    {
      "judul": "9",
      "emoji": "9️⃣",
      "countNum": 9,
      "countWord": "9,18,27,…",
      "suara": "Contoh kelipatan sembilan."
    },
    {
      "judul": "Pola",
      "emoji": "📶",
      "countNum": 1,
      "countWord": "tambah n",
      "suara": "Barisan naik tetap."
    },
    {
      "judul": "Siap B",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "persekutuan",
      "suara": "Lanjut kelipatan persekutuan."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "cek-kelipatan",
      "title": "Cek Kelipatan",
      "bookReference": "hlm. 33–37",
      "objective": "Mengenali kelipatan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih ya/tidak.",
      "emoji": "👏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "lanjut-barisan",
      "title": "Lanjutkan Barisan",
      "bookReference": "hlm. 33–37",
      "objective": "Melanjutkan kelipatan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih lanjut.",
      "emoji": "📶",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-kelipatan",
      "title": "Arti Kelipatan",
      "bookReference": "hlm. 35",
      "objective": "Memahami definisi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-kelipatan",
      "title": "Pilah Kelipatan",
      "bookReference": "hlm. 35–37",
      "objective": "Memilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-kelipatan",
      "title": "Jodohkan Kelipatan",
      "bookReference": "hlm. 33–37",
      "objective": "Menjodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-kelipatan",
      "title": "Memori Kelipatan",
      "bookReference": "hlm. 33–37",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-kelipatan",
      "title": "Ketuk Kelipatan",
      "bookReference": "hlm. 33–37",
      "objective": "Mengetuk.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-kelipatan",
      "title": "Ketuk Semua Kelipatan",
      "bookReference": "hlm. 35–37",
      "objective": "Ketuk semua.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-tepuk",
      "title": "Cerita Tepuk Bilangan",
      "bookReference": "hlm. 33–37",
      "objective": "Soal cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "👏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-kelipatan",
      "title": "Urutkan Kelipatan",
      "bookReference": "hlm. 35–37",
      "objective": "Mengurutkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "tabel-kelipatan",
      "title": "Tabel Kelipatan",
      "bookReference": "hlm. 35–37",
      "objective": "Baca tabel.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "diagram-lanjut",
      "title": "Diagram Barisan",
      "bookReference": "hlm. 33–37",
      "objective": "Lanjut barisan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "seq",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-a",
      "title": "Jodohkan Diagram A",
      "bookReference": "hlm. 33–37",
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
      "title": "Memori Diagram A",
      "bookReference": "hlm. 33–37",
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
      "title": "Tabel Cek Kelipatan",
      "bookReference": "hlm. 35–37",
      "objective": "Isi tabel.",
      "mechanicDescription": "Tiga tabel.",
      "voiceGuide": "Pilih.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-pa",
      "title": "Ketuk Semua Diagram A",
      "bookReference": "hlm. 35–37",
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
      "title": "Pilah Diagram A",
      "bookReference": "hlm. 35–37",
      "objective": "Pilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "choose-a",
      "title": "Pilih Pernyataan A",
      "bookReference": "hlm. 33–37",
      "objective": "Pilih.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jenis-pa",
      "title": "Pilih Arti Diagram",
      "bookReference": "hlm. 35",
      "objective": "Definisi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "def",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-a",
      "title": "Cerita Diagram A",
      "bookReference": "hlm. 33–37",
      "objective": "Cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-cek",
      "title": "Tulis Cek Kelipatan",
      "bookReference": "hlm. 35–37",
      "objective": "Menulis.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "3×n",
      "wordLarge": "CEK",
      "mathNotation": "kelipatan"
    },
    {
      "stage": "Abstract",
      "gameType": "write-lanjut",
      "title": "Tulis Lanjutan",
      "bookReference": "hlm. 33–37",
      "objective": "Menulis lanjut.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "+n",
      "wordLarge": "LANJUT",
      "mathNotation": "barisan"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-def-a",
      "title": "Pilih Definisi",
      "bookReference": "hlm. 35",
      "objective": "Definisi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "arti",
      "wordLarge": "DEFINISI",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-a",
      "title": "Urutkan Abstrak A",
      "bookReference": "hlm. 35–37",
      "objective": "Urut.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "symbolLarge": "naik",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-a",
      "title": "Jodohkan Notasi A",
      "bookReference": "hlm. 33–37",
      "objective": "Jodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "symbolLarge": "×",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-a",
      "title": "Memori Notasi A",
      "bookReference": "hlm. 33–37",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "symbolLarge": "kel",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-a",
      "title": "Benar atau Salah: Kelipatan",
      "bookReference": "hlm. 33–37",
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
      "title": "Detektif Kelipatan",
      "bookReference": "hlm. 33–37",
      "objective": "Petunjuk.",
      "mechanicDescription": "Tiga soal.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-a",
      "title": "Peta Konsep Kelipatan",
      "bookReference": "hlm. 33–37",
      "objective": "Peta.",
      "mechanicDescription": "Satu peta.",
      "voiceGuide": "Pilih opsi.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-a",
      "title": "Cerita Angka Kelipatan",
      "bookReference": "hlm. 33–37",
      "objective": "Cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "✖️",
      "nama": "Kelipatan",
      "isi": "Hasil kali bilangan dengan bilangan bulat positif.",
      "suara": "Kelipatan adalah hasil kali."
    },
    {
      "ikon": "👏",
      "nama": "Tepuk",
      "isi": "Bertepuk saat bilangan kelipatan yang dipilih.",
      "suara": "Tepuk pada kelipatan."
    },
    {
      "ikon": "➗",
      "nama": "Cek",
      "isi": "Bagi habis tanpa sisa berarti kelipatan.",
      "suara": "Cek dengan pembagian."
    },
    {
      "ikon": "0️⃣",
      "nama": "Bukan nol",
      "isi": "0×n tidak dihitung kelipatan di buku ini.",
      "suara": "Nol dikecualikan."
    }
  ],
  "poinSuara": "Ingat: kelipatan, tepuk, cek bagi, dan bukan nol.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Pilih bilangan",
        "warna": "#FDE68A"
      },
      {
        "teks": "buat daftar ×",
        "warna": "#BBF7D0"
      },
      {
        "teks": "cek bagi habis",
        "warna": "#BFDBFE"
      },
      {
        "teks": "latih di tabel",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: buat tabel 1–50 dan warnai kelipatan 4 serta kelipatan 6, lalu bandingkan yang sama.",
  "refleksi": [
    "Apa arti kelipatan?",
    "Bagaimana mengecek suatu bilangan kelipatan 7?",
    "Mengapa 0×3 tidak dihitung di buku ini?"
  ]
};

export const SUB_B52: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Kelipatan Persekutuan)",
  "fullTitle": "Sub-Bab B: Kelipatan Persekutuan dan KPK",
  "targetDescription": "Siswa menemukan kelipatan persekutuan dua bilangan atau lebih, menentukan KPK dengan daftar kelipatan, serta menerapkan KPK pada jadwal latihan bersama sesuai Buku Siswa Kelas V Bab 2.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Kita belajar kelipatan persekutuan. Irisan daftar kelipatan dua bilangan disebut kelipatan persekutuan. Yang terkecil disebut KPK. KPK membantu mencari jadwal bertemu berikutnya, seperti latihan renang Nisa dan Yohana. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menentukan kelipatan persekutuan dan KPK dua atau lebih bilangan.",
    "referensi": "Buku Siswa Matematika Kelas V Bab 2 Sub-Bab B hlm. 38–42; listing method for LCM; calendar scheduling problems."
  },
  "videos": [
    {
      "id": "K5B2B-V1",
      "judul": "Kelipatan Persekutuan",
      "subjudul": "Irisan",
      "adegan": [
        {
          "id": "K5B2B-V1-1",
          "judul": "Tepuk 2 dan 3",
          "ketukan": [
            "Kelipatan dua: tepuk tangan.",
            "Kelipatan tiga: ucap hore.",
            "Jika keduanya, tepuk dan hore.",
            "Itu bilangan persekutuan."
          ],
          "papan": [
            "tepuk",
            "hore",
            "keduanya",
            "irisan"
          ]
        },
        {
          "id": "K5B2B-V1-2",
          "judul": "Contoh enam",
          "ketukan": [
            "Enam, dua belas, delapan belas.",
            "Semua kelipatan dua dan tiga.",
            "Itu kelipatan persekutuan.",
            "Catat daftarnya."
          ],
          "papan": [
            "6",
            "12",
            "18",
            "sama"
          ]
        },
        {
          "id": "K5B2B-V1-3",
          "judul": "Yang terkecil",
          "ketukan": [
            "Dari daftar yang sama.",
            "Ambil yang paling kecil.",
            "Itu KPK.",
            "Kelipatan persekutuan terkecil."
          ],
          "papan": [
            "daftar",
            "terkecil",
            "KPK",
            "nama"
          ]
        }
      ]
    },
    {
      "id": "K5B2B-V2",
      "judul": "Cara Menentukan KPK",
      "subjudul": "Daftar",
      "adegan": [
        {
          "id": "K5B2B-V2-1",
          "judul": "Contoh 4 dan 5",
          "ketukan": [
            "Tulis kelipatan empat.",
            "Tulis kelipatan lima.",
            "Tandai yang sama.",
            "Yang terkecil dua puluh."
          ],
          "papan": [
            "4,…",
            "5,…",
            "sama",
            "20"
          ]
        },
        {
          "id": "K5B2B-V2-2",
          "judul": "Langkah umum",
          "ketukan": [
            "Buat dua daftar.",
            "Cari irisan.",
            "Pilih terkecil.",
            "Itu KPK."
          ],
          "papan": [
            "daftar",
            "irisan",
            "min",
            "KPK"
          ]
        },
        {
          "id": "K5B2B-V2-3",
          "judul": "Tiga bilangan",
          "ketukan": [
            "Bisa tiga bilangan.",
            "Misal tiga, empat, lima.",
            "KPK-nya enam puluh.",
            "Cara daftar tetap jalan."
          ],
          "papan": [
            "3",
            "4",
            "5",
            "60"
          ]
        }
      ]
    },
    {
      "id": "K5B2B-V3",
      "judul": "Jadwal Renang",
      "subjudul": "Aplikasi",
      "adegan": [
        {
          "id": "K5B2B-V3-1",
          "judul": "Nisa dan Yohana",
          "ketukan": [
            "Nisa tiap tiga hari.",
            "Yohana tiap empat hari.",
            "KPK dua belas hari.",
            "Bertemu lagi setelah dua belas hari."
          ],
          "papan": [
            "3 hari",
            "4 hari",
            "KPK 12",
            "bertemu"
          ]
        },
        {
          "id": "K5B2B-V3-2",
          "judul": "Tanggal",
          "ketukan": [
            "Mulai tiga Agustus.",
            "Tambah dua belas hari.",
            "Hasilnya lima belas Agustus.",
            "Jadwal terdekat."
          ],
          "papan": [
            "3 Agu",
            "+12",
            "15 Agu",
            "terdekat"
          ]
        },
        {
          "id": "K5B2B-V3-3",
          "judul": "Siap bermain",
          "ketukan": [
            "Irisan sudah jelas.",
            "KPK dan jadwal siap.",
            "Ayo ke permainan.",
            "Semangat!"
          ],
          "papan": [
            "irisan",
            "KPK",
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
      "stepTitle": "1. Daftar A",
      "stepDesc": "Kelipatan bilangan pertama",
      "icon": "📋",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Daftar B",
      "stepDesc": "Kelipatan bilangan kedua",
      "icon": "📋",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Irisan",
      "stepDesc": "Yang sama",
      "icon": "🤝",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. KPK",
      "stepDesc": "Yang terkecil",
      "icon": "🎯",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Jadwal",
      "stepDesc": "Tambah ke tanggal awal",
      "icon": "📅",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek",
      "stepDesc": "Kelipatan keduanya?",
      "icon": "✅",
      "flowFrom": "5",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "Persekutuan",
      "emoji": "🤝",
      "countNum": 1,
      "countWord": "irisan",
      "suara": "Kelipatan yang sama."
    },
    {
      "judul": "KPK",
      "emoji": "🎯",
      "countNum": 1,
      "countWord": "terkecil",
      "suara": "Yang paling kecil."
    },
    {
      "judul": "4 & 5",
      "emoji": "🔢",
      "countNum": 20,
      "countWord": "KPK=20",
      "suara": "Contoh buku."
    },
    {
      "judul": "2 & 3",
      "emoji": "👏",
      "countNum": 6,
      "countWord": "KPK=6",
      "suara": "Tepuk dan hore."
    },
    {
      "judul": "3 & 4",
      "emoji": "🏊",
      "countNum": 12,
      "countWord": "renang",
      "suara": "Nisa dan Yohana."
    },
    {
      "judul": "Tanggal",
      "emoji": "📅",
      "countNum": 15,
      "countWord": "15 Agustus",
      "suara": "3 + 12 hari."
    },
    {
      "judul": "Cara",
      "emoji": "📋",
      "countNum": 1,
      "countWord": "daftar",
      "suara": "Tulis lalu tandai."
    },
    {
      "judul": "3 bilangan",
      "emoji": "3️⃣",
      "countNum": 60,
      "countWord": "3,4,5",
      "suara": "KPK=60."
    },
    {
      "judul": "Pakai",
      "emoji": "🕒",
      "countNum": 1,
      "countWord": "jadwal",
      "suara": "Waktu bertemu lagi."
    },
    {
      "judul": "Siap C",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "faktor",
      "suara": "Lanjut faktor."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "cek-persekutuan",
      "title": "Cek Kelipatan Persekutuan",
      "bookReference": "hlm. 38–40",
      "objective": "Mengenali irisan kelipatan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "🤝",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "hitung-kpk",
      "title": "Hitung KPK",
      "bookReference": "hlm. 40–42",
      "objective": "Menemukan KPK.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih hasil.",
      "emoji": "🎯",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jadwal-kpk",
      "title": "Jadwal dengan KPK",
      "bookReference": "hlm. 41–42",
      "objective": "Soal jadwal.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "📅",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-persekutuan",
      "title": "Pilah Persekutuan",
      "bookReference": "hlm. 38–40",
      "objective": "Memilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-kpk",
      "title": "Jodohkan KPK",
      "bookReference": "hlm. 40–42",
      "objective": "Menjodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-kpk",
      "title": "Memori KPK",
      "bookReference": "hlm. 40–42",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-persekutuan",
      "title": "Ketuk Persekutuan",
      "bookReference": "hlm. 38–40",
      "objective": "Mengetuk.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-kpk",
      "title": "Ketuk Semua Benar KPK",
      "bookReference": "hlm. 38–42",
      "objective": "Ketuk semua.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-renang",
      "title": "Cerita Latihan Renang",
      "bookReference": "hlm. 31–42",
      "objective": "Soal cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "🏊",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-kpk",
      "title": "Urutkan Hasil KPK",
      "bookReference": "hlm. 40–42",
      "objective": "Mengurutkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "diagram-persekutuan",
      "title": "Diagram Persekutuan",
      "bookReference": "hlm. 38–40",
      "objective": "Baca irisan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "venn",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "diagram-kpk",
      "title": "Diagram KPK",
      "bookReference": "hlm. 40–42",
      "objective": "Baca KPK.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "lcm",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-b",
      "title": "Jodohkan Diagram B",
      "bookReference": "hlm. 38–42",
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
      "title": "Memori Diagram B",
      "bookReference": "hlm. 38–42",
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
      "title": "Tabel KPK",
      "bookReference": "hlm. 40–42",
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
      "title": "Ketuk Semua Diagram B",
      "bookReference": "hlm. 38–42",
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
      "title": "Pilah Diagram B",
      "bookReference": "hlm. 38–40",
      "objective": "Pilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "jadwal-pb",
      "title": "Diagram Jadwal",
      "bookReference": "hlm. 41–42",
      "objective": "Jadwal.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "cal",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "choose-b",
      "title": "Pilih Pernyataan B",
      "bookReference": "hlm. 38–42",
      "objective": "Pilih.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-b",
      "title": "Cerita Diagram B",
      "bookReference": "hlm. 31–42",
      "objective": "Cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-persekutuan",
      "title": "Tulis Cek Persekutuan",
      "bookReference": "hlm. 38–40",
      "objective": "Menulis.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "6∈",
      "wordLarge": "IRISAN",
      "mathNotation": "cek"
    },
    {
      "stage": "Abstract",
      "gameType": "write-kpk",
      "title": "Tulis Hasil KPK",
      "bookReference": "hlm. 40–42",
      "objective": "Menulis KPK.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "KPK",
      "wordLarge": "HASIL",
      "mathNotation": "lcm"
    },
    {
      "stage": "Abstract",
      "gameType": "write-jadwal",
      "title": "Tulis Jadwal KPK",
      "bookReference": "hlm. 41–42",
      "objective": "Menulis jadwal.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "tgl",
      "wordLarge": "JADWAL",
      "mathNotation": "hari"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-b",
      "title": "Urutkan Abstrak B",
      "bookReference": "hlm. 40–42",
      "objective": "Urut.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "symbolLarge": "naik",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-b",
      "title": "Jodohkan Notasi B",
      "bookReference": "hlm. 38–42",
      "objective": "Jodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "symbolLarge": "KPK",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-b",
      "title": "Memori Notasi B",
      "bookReference": "hlm. 38–42",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "symbolLarge": "kpk",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-b",
      "title": "Benar atau Salah: KPK",
      "bookReference": "hlm. 38–42",
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
      "title": "Detektif KPK",
      "bookReference": "hlm. 31–42",
      "objective": "Petunjuk.",
      "mechanicDescription": "Tiga soal.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-b",
      "title": "Peta Konsep KPK",
      "bookReference": "hlm. 38–42",
      "objective": "Peta.",
      "mechanicDescription": "Satu peta.",
      "voiceGuide": "Pilih opsi.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-b",
      "title": "Cerita Angka KPK",
      "bookReference": "hlm. 31–42",
      "objective": "Cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "🤝",
      "nama": "Persekutuan",
      "isi": "Kelipatan yang sama dari dua bilangan atau lebih.",
      "suara": "Itu kelipatan persekutuan."
    },
    {
      "ikon": "🎯",
      "nama": "KPK",
      "isi": "Kelipatan persekutuan yang terkecil.",
      "suara": "KPK adalah yang terkecil."
    },
    {
      "ikon": "📋",
      "nama": "Cara daftar",
      "isi": "Tulis kelipatan, tandai irisan, ambil terkecil.",
      "suara": "Pakai daftar kelipatan."
    },
    {
      "ikon": "📅",
      "nama": "Jadwal",
      "isi": "KPK menentukan jarak hari bertemu lagi.",
      "suara": "Pakai KPK untuk jadwal."
    }
  ],
  "poinSuara": "Ingat: persekutuan, KPK, cara daftar, dan jadwal.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Daftar kelipatan",
        "warna": "#FDE68A"
      },
      {
        "teks": "tandai yang sama",
        "warna": "#BBF7D0"
      },
      {
        "teks": "ambil terkecil",
        "warna": "#BFDBFE"
      },
      {
        "teks": "terapkan ke jadwal",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: cari KPK 4 dan 6, lalu buat cerita jadwal sederhana dengan jarak hari itu.",
  "refleksi": [
    "Apa beda kelipatan dan kelipatan persekutuan?",
    "Bagaimana mencari KPK 5 dan 7?",
    "Mengapa jadwal renang memakai KPK?"
  ]
};

export const SUB_C52: SubBabNaskah = {
  "id": "C",
  "codeTitle": "Sub-Bab C (Faktor)",
  "fullTitle": "Sub-Bab C: Faktor",
  "targetDescription": "Siswa menemukan faktor bilangan melalui pembagian habis dan model kertas berpetak, serta memahami pasangan faktor sesuai Buku Siswa Kelas V Bab 2.",
  "secondaryBg": "#DCFCE7",
  "secondaryBorder": "#16A34A",
  "secondaryText": "#14532D",
  "silabus": {
    "teksSuara": "Kita belajar faktor. Faktor adalah bilangan yang membagi habis tanpa sisa. Kita memotong kertas berpetak tanpa sisa dan menemukan pasangan faktor. Satu dan bilangan itu sendiri selalu menjadi faktor. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menentukan faktor-faktor suatu bilangan.",
    "referensi": "Buku Siswa Matematika Kelas V Bab 2 Sub-Bab C hlm. 43–46; array/area model for factors; factor pairs."
  },
  "videos": [
    {
      "id": "K5B2C-V1",
      "judul": "Apa Itu Faktor",
      "subjudul": "Pembagi habis",
      "adegan": [
        {
          "id": "K5B2C-V1-1",
          "judul": "Bagi tanpa sisa",
          "ketukan": [
            "Ambil dua belas.",
            "Bagi dengan empat.",
            "Hasil tiga tanpa sisa.",
            "Empat faktor dari dua belas."
          ],
          "papan": [
            "12",
            "÷4",
            "habis",
            "faktor"
          ]
        },
        {
          "id": "K5B2C-V1-2",
          "judul": "Daftar faktor 12",
          "ketukan": [
            "Satu, dua, tiga, empat.",
            "Enam dan dua belas.",
            "Itu semua faktor dua belas.",
            "Lima bukan faktor."
          ],
          "papan": [
            "1–4",
            "6,12",
            "lengkap",
            "bukan 5"
          ]
        },
        {
          "id": "K5B2C-V1-3",
          "judul": "Selalu ada",
          "ketukan": [
            "Satu selalu faktor.",
            "Bilangan itu sendiri juga.",
            "Cari yang di tengah.",
            "Lengkapkan daftar."
          ],
          "papan": [
            "1",
            "n",
            "tengah",
            "daftar"
          ]
        }
      ]
    },
    {
      "id": "K5B2C-V2",
      "judul": "Kertas Berpetak",
      "subjudul": "Tanpa sisa",
      "adegan": [
        {
          "id": "K5B2C-V2-1",
          "judul": "Potong 12 petak",
          "ketukan": [
            "Panjang dua belas petak.",
            "Potong sama panjang.",
            "Tidak boleh ada sisa.",
            "Panjang tiap bagian adalah faktor."
          ],
          "papan": [
            "12 petak",
            "sama",
            "tanpa sisa",
            "faktor"
          ]
        },
        {
          "id": "K5B2C-V2-2",
          "judul": "Contoh panjang 3",
          "ketukan": [
            "Panjang tiap bagian tiga.",
            "Dapat empat potong.",
            "Tiga dan empat saling terkait.",
            "Keduanya faktor."
          ],
          "papan": [
            "panjang 3",
            "4 potong",
            "3 & 4",
            "faktor"
          ]
        },
        {
          "id": "K5B2C-V2-3",
          "judul": "Faktor 18",
          "ketukan": [
            "Ulang untuk delapan belas.",
            "Temukan semua pembagi.",
            "Isi lingkaran faktor.",
            "Urut dari kecil."
          ],
          "papan": [
            "18",
            "pembagi",
            "lingkaran",
            "urut"
          ]
        }
      ]
    },
    {
      "id": "K5B2C-V3",
      "judul": "Pasangan Faktor",
      "subjudul": "Hasil kali",
      "adegan": [
        {
          "id": "K5B2C-V3-1",
          "judul": "Saling berpasangan",
          "ketukan": [
            "Satu dengan delapan belas.",
            "Dua dengan sembilan.",
            "Tiga dengan enam.",
            "Hasil kalinya delapan belas."
          ],
          "papan": [
            "1↔18",
            "2↔9",
            "3↔6",
            "× = 18"
          ]
        },
        {
          "id": "K5B2C-V3-2",
          "judul": "Cara ingat",
          "ketukan": [
            "Jika tahu satu faktor.",
            "Bagi bilangan utamanya.",
            "Dapat pasangannya.",
            "Cepat dan tepat."
          ],
          "papan": [
            "tahu satu",
            "bagi",
            "pasangan",
            "cepat"
          ]
        },
        {
          "id": "K5B2C-V3-3",
          "judul": "Siap bermain",
          "ketukan": [
            "Definisi sudah jelas.",
            "Petak dan pasangan siap.",
            "Ayo ke permainan.",
            "Semangat!"
          ],
          "papan": [
            "arti",
            "model",
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
      "stepTitle": "1. Pilih bilangan",
      "stepDesc": "Misalnya 12",
      "icon": "🔢",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Coba bagi",
      "stepDesc": "1,2,3,… sampai n",
      "icon": "➗",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Habis?",
      "stepDesc": "Tanpa sisa = faktor",
      "icon": "✅",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Daftar",
      "stepDesc": "Urutkan naik",
      "icon": "📋",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Pasangan",
      "stepDesc": "a × b = n",
      "icon": "🔗",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Model petak",
      "stepDesc": "Potong tanpa sisa",
      "icon": "📏",
      "flowFrom": "5",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "Arti",
      "emoji": "➗",
      "countNum": 1,
      "countWord": "pembagi habis",
      "suara": "Faktor membagi tanpa sisa."
    },
    {
      "judul": "12",
      "emoji": "📐",
      "countNum": 12,
      "countWord": "1,2,3,4,6,12",
      "suara": "Faktor dua belas."
    },
    {
      "judul": "18",
      "emoji": "🟢",
      "countNum": 18,
      "countWord": "1,2,3,6,9,18",
      "suara": "Faktor delapan belas."
    },
    {
      "judul": "Pasangan",
      "emoji": "🔗",
      "countNum": 1,
      "countWord": "a×b=n",
      "suara": "Saling berpasangan."
    },
    {
      "judul": "Petak",
      "emoji": "📏",
      "countNum": 1,
      "countWord": "tanpa sisa",
      "suara": "Model konkret."
    },
    {
      "judul": "1 dan n",
      "emoji": "1️⃣",
      "countNum": 1,
      "countWord": "selalu",
      "suara": "Selalu menjadi faktor."
    },
    {
      "judul": "Bukan",
      "emoji": "🚫",
      "countNum": 5,
      "countWord": "sisa",
      "suara": "Ada sisa = bukan faktor."
    },
    {
      "judul": "24",
      "emoji": "📘",
      "countNum": 24,
      "countWord": "memuat 8",
      "suara": "Contoh latihan."
    },
    {
      "judul": "Urut",
      "emoji": "📶",
      "countNum": 1,
      "countWord": "kecil→besar",
      "suara": "Tulis terurut."
    },
    {
      "judul": "Bab 2 A–C",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "siap",
      "suara": "Kelipatan, KPK, faktor."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "cek-faktor",
      "title": "Cek Faktor",
      "bookReference": "hlm. 43–46",
      "objective": "Mengenali faktor.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "➗",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "pasangan-faktor",
      "title": "Pasangan Faktor",
      "bookReference": "hlm. 45",
      "objective": "Pasangan hasil kali.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "🔗",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-faktor",
      "title": "Arti Faktor",
      "bookReference": "hlm. 44–45",
      "objective": "Definisi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-faktor",
      "title": "Pilah Faktor",
      "bookReference": "hlm. 43–46",
      "objective": "Memilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-faktor",
      "title": "Jodohkan Faktor",
      "bookReference": "hlm. 43–46",
      "objective": "Menjodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-faktor",
      "title": "Memori Faktor",
      "bookReference": "hlm. 43–46",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-faktor",
      "title": "Ketuk Faktor",
      "bookReference": "hlm. 43–46",
      "objective": "Mengetuk.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-faktor",
      "title": "Ketuk Semua Faktor",
      "bookReference": "hlm. 43–46",
      "objective": "Ketuk semua.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-petak",
      "title": "Cerita Kertas Berpetak",
      "bookReference": "hlm. 43–46",
      "objective": "Soal cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-faktor",
      "title": "Urutkan Faktor",
      "bookReference": "hlm. 45–46",
      "objective": "Mengurutkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "diagram-bagi",
      "title": "Diagram Bagi Petak",
      "bookReference": "hlm. 43–44",
      "objective": "Baca potongan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "grid",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "diagram-pasangan",
      "title": "Diagram Pasangan",
      "bookReference": "hlm. 45",
      "objective": "Pasangan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "pair",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-c",
      "title": "Jodohkan Diagram C",
      "bookReference": "hlm. 43–46",
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
      "title": "Memori Diagram C",
      "bookReference": "hlm. 43–46",
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
      "title": "Tabel Faktor",
      "bookReference": "hlm. 44–46",
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
      "bookReference": "hlm. 43–46",
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
      "title": "Pilah Diagram C",
      "bookReference": "hlm. 43–46",
      "objective": "Pilah.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "choose-c",
      "title": "Pilih Pernyataan C",
      "bookReference": "hlm. 43–46",
      "objective": "Pilih.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jenis-pc",
      "title": "Pilih Arti Diagram C",
      "bookReference": "hlm. 44–45",
      "objective": "Definisi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "def",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-c",
      "title": "Cerita Diagram C",
      "bookReference": "hlm. 43–46",
      "objective": "Cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-cek-f",
      "title": "Tulis Cek Faktor",
      "bookReference": "hlm. 43–46",
      "objective": "Menulis.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "n|d",
      "wordLarge": "CEK",
      "mathNotation": "faktor"
    },
    {
      "stage": "Abstract",
      "gameType": "write-pasangan",
      "title": "Tulis Pasangan",
      "bookReference": "hlm. 45",
      "objective": "Menulis pasangan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "a×b",
      "wordLarge": "PASANGAN",
      "mathNotation": "kali"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-def-c",
      "title": "Pilih Definisi Faktor",
      "bookReference": "hlm. 44–45",
      "objective": "Definisi.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "arti",
      "wordLarge": "DEFINISI",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-c",
      "title": "Urutkan Abstrak C",
      "bookReference": "hlm. 45–46",
      "objective": "Urut.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Urutkan.",
      "symbolLarge": "naik",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-c",
      "title": "Jodohkan Notasi C",
      "bookReference": "hlm. 43–46",
      "objective": "Jodohkan.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jodohkan.",
      "symbolLarge": "f",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-c",
      "title": "Memori Notasi C",
      "bookReference": "hlm. 43–46",
      "objective": "Memori.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Balik kartu.",
      "symbolLarge": "fak",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-c",
      "title": "Benar atau Salah: Faktor",
      "bookReference": "hlm. 43–46",
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
      "title": "Detektif Faktor",
      "bookReference": "hlm. 43–46",
      "objective": "Petunjuk.",
      "mechanicDescription": "Tiga soal.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-c",
      "title": "Peta Konsep Faktor",
      "bookReference": "hlm. 43–46",
      "objective": "Peta.",
      "mechanicDescription": "Satu peta.",
      "voiceGuide": "Pilih opsi.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-c",
      "title": "Cerita Angka Faktor",
      "bookReference": "hlm. 43–46",
      "objective": "Cerita.",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "➗",
      "nama": "Faktor",
      "isi": "Bilangan yang membagi habis tanpa sisa.",
      "suara": "Faktor adalah pembagi habis."
    },
    {
      "ikon": "📏",
      "nama": "Model petak",
      "isi": "Potong sama panjang tanpa sisa.",
      "suara": "Panjang bagian = faktor."
    },
    {
      "ikon": "🔗",
      "nama": "Pasangan",
      "isi": "Dua faktor yang hasil kalinya bilangan itu.",
      "suara": "Faktor saling berpasangan."
    },
    {
      "ikon": "1️⃣",
      "nama": "1 dan n",
      "isi": "Satu dan bilangan itu sendiri selalu faktor.",
      "suara": "Selalu ada di daftar."
    }
  ],
  "poinSuara": "Ingat: faktor, model petak, pasangan, dan satu serta n.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Pilih bilangan",
        "warna": "#FDE68A"
      },
      {
        "teks": "uji pembagi",
        "warna": "#BBF7D0"
      },
      {
        "teks": "catat yang habis",
        "warna": "#BFDBFE"
      },
      {
        "teks": "pasangkan hasil kali",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: temukan semua faktor 36 dan tuliskan pasangan faktornya.",
  "refleksi": [
    "Apa beda faktor dan kelipatan?",
    "Bagaimana menemukan pasangan dari faktor 3 pada 18?",
    "Mengapa potongan bersisa tidak boleh?"
  ]
};

export const SUB_BAB_K5B2: SubBabNaskah[] = [SUB_A52, SUB_B52, SUB_C52];
export const semuaAdeganK5B2 = SUB_BAB_K5B2.flatMap((s) => s.videos.flatMap((v) => v.adegan));
