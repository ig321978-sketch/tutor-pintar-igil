/**
 * Naskah Matematika Kelas 5 Bab 8 — Data (mendalam + metode luar berlabel).
 * Sumber buku: Kemendikbudristek Bab 8 hlm. 237–271. Sub-Bab A–C (Materi).
 * Satu sumber: buat-k5-bab8.mjs → kelas5-bab8.json. Tanpa React/jaringan.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K5B8_META = {
  "chapterId": "k5-mat-bab8",
  "phaseCode": "FASE_C",
  "grade": 5,
  "subjectLabel": "MATEMATIKA - KELAS 5 SD",
  "title": "BAB 8: DATA (TABEL FREKUENSI, PIKTOGRAM, DAN DIAGRAM BATANG)",
  "silabusElemen": "🌈 Fase C • Elemen Analisis Data: Mengumpulkan Data, Piktogram, dan Diagram Batang (Kelas 5 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A58: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Mengumpulkan Data)",
  "fullTitle": "Sub-Bab A: Mengumpulkan Data",
  "targetDescription": "Siswa memahami data sebagai kumpulan fakta, mengumpulkan data mentah, mencatat dengan turus berkelompok lima, menyusun tabel frekuensi, dan memakai frekuensi untuk keputusan sesuai Buku Siswa Kelas V Bab 8 Sub-Bab A hlm. 240–247.",
  "secondaryBg": "#FFEDD5",
  "secondaryBorder": "#EA580C",
  "secondaryText": "#7C2D12",
  "silabus": {
    "teksSuara": "Anggi mencatat penjualan donat setiap hari agar tahu rasa mana yang laris. Data adalah sekumpulan fakta yang ditulis dengan kata, angka, atau simbol. Kita kumpulkan data sayuran favorit, buat turus, lalu tabel frekuensi. METODE LUAR Data Collection Cycle, Tally Mark Protocol, dan Frequency Table Construction. Turus dikelompokkan lima: empat tegak satu miring. Frekuensi menyatakan berapa kali suatu nilai muncul. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa mengumpulkan data, mencatat dengan turus, dan menyusun serta membaca tabel frekuensi untuk mendukung keputusan.",
    "referensi": "Buku Siswa Matematika Kelas V Bab 8 Sub-Bab A hlm. 240–247; METODE LUAR · Data Collection Cycle; Tally Mark Protocol; Frequency Table Construction."
  },
  "videos": [
    {
      "id": "K5B8A-V1",
      "judul": "Donat & Apa Itu Data",
      "subjudul": "Collection",
      "adegan": [
        {
          "id": "K5B8A-V1-1",
          "judul": "Anggi berjualan",
          "ketukan": [
            "Anggi mencatat penjualan donat cokelat, keju, stroberi, dan kacang selama seminggu.",
            "Dari Tabel 8.1 ia melihat kacang menurun, cokelat naik.",
            "Ia putuskan berhenti jual kacang dan menambah cokelat.",
            "Data menolong keputusan. METODE LUAR · Data-Informed Decision."
          ],
          "papan": [
            "catat harian",
            "kacang turun",
            "cokelat naik",
            "keputusan"
          ]
        },
        {
          "id": "K5B8A-V1-2",
          "judul": "Definisi data",
          "ketukan": [
            "Data adalah sekumpulan informasi atau fakta.",
            "Boleh ditulis kata, kalimat, angka, gambar, atau simbol.",
            "Contoh: tinggi badan, makanan favorit, cara berangkat sekolah.",
            "Tanpa data, kita hanya menebak."
          ],
          "papan": [
            "kumpulan fakta",
            "kata/angka/simbol",
            "contoh sekitar",
            "jangan tebak"
          ]
        },
        {
          "id": "K5B8A-V1-3",
          "judul": "Siklus kumpulkan",
          "ketukan": [
            "METODE LUAR · Data Collection Cycle: tanya atau amati, catat, ringkas, baca makna.",
            "Eksplorasi 8.1A: tiap siswa tulis maksimal tiga sayuran favorit.",
            "Catatan mentah masih berantakan; perlu dirapikan.",
            "Itulah tugas turus dan frekuensi."
          ],
          "papan": [
            "Collection Cycle",
            "max 3 sayur",
            "mentah → rapi",
            "turus & f"
          ]
        }
      ]
    },
    {
      "id": "K5B8A-V2",
      "judul": "Turus & Frekuensi",
      "subjudul": "Tally",
      "adegan": [
        {
          "id": "K5B8A-V2-1",
          "judul": "Apa itu turus",
          "ketukan": [
            "Turus adalah cara mencatat hasil pengamatan dengan simbol garis.",
            "Setiap satu hasil = satu garis: tegak atau miring.",
            "Supaya tidak ada yang terlewat atau terhitung dua kali.",
            "METODE LUAR · Tally Mark Protocol."
          ],
          "papan": [
            "1 hasil = 1 garis",
            "tidak terlewat",
            "tidak dobel",
            "Tally Protocol"
          ]
        },
        {
          "id": "K5B8A-V2-2",
          "judul": "Kelompok lima",
          "ketukan": [
            "Turus dikelompokkan lima: empat garis tegak dan satu garis miring.",
            "Mengapa tidak semua tegak? Agar mudah dihitung lima-lima.",
            "Bayam frekuensi 8 berarti delapan anak menyukai bayam.",
            "Frekuensi = bilangan yang menyatakan berapa kali peristiwa terjadi."
          ],
          "papan": [
            "4+1 miring",
            "mudah hitung",
            "f bayam = 8",
            "definisi f"
          ]
        },
        {
          "id": "K5B8A-V2-3",
          "judul": "Tabel frekuensi",
          "ketukan": [
            "Kolom: nama kategori, turus, frekuensi.",
            "METODE LUAR · Frequency Table Construction.",
            "Dari tabel: wortel paling banyak disukai di contoh buku.",
            "Bandingkan frekuensi antar kategori sebelum mengambil kesimpulan."
          ],
          "papan": [
            "kategori|turus|f",
            "Frequency Table",
            "baca banding",
            "kesimpulan"
          ]
        }
      ]
    },
    {
      "id": "K5B8A-V3",
      "judul": "Kumpul Sendiri & Latihan",
      "subjudul": "Ayo coba",
      "adegan": [
        {
          "id": "K5B8A-V3-1",
          "judul": "Ukuran sepatu",
          "ketukan": [
            "Eksplorasi 8.1B: tanya ukuran sepatu teman satu per satu.",
            "Catat nama dan ukuran, lalu buat tabel frekuensi.",
            "Saran untuk pedagang sepatu memakai frekuensi terbesar.",
            "Presentasikan dan bandingkan dengan kelompok lain."
          ],
          "papan": [
            "tanya satu-satu",
            "tabel f",
            "saran dagang",
            "banding kelompok"
          ]
        },
        {
          "id": "K5B8A-V3-2",
          "judul": "Nilai ulangan",
          "ketukan": [
            "Latihan: data nilai 40 sampai 100 disusun jadi turus dan frekuensi.",
            "Hitung hati-hati agar jumlah frekuensi = banyak data.",
            "Cari nilai yang paling sering muncul.",
            "Itu mode: frekuensi tertinggi."
          ],
          "papan": [
            "nilai → turus",
            "jumlah f = n",
            "mode",
            "teliti"
          ]
        },
        {
          "id": "K5B8A-V3-3",
          "judul": "Siap B",
          "ketukan": [
            "Kita sudah bisa kumpulkan data dan buat tabel frekuensi.",
            "Berikutnya: menyajikan data dengan gambar atau piktogram.",
            "Kunci: satu simbol mewakili nilai tertentu.",
            "Ayo Sub-Bab B!"
          ],
          "papan": [
            "tabel siap",
            "lanjut piktogram",
            "kunci simbol",
            "ke B"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Kumpulkan",
      "stepDesc": "Tanya / amati",
      "icon": "🎤",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Catat mentah",
      "stepDesc": "Daftar nama & pilihan",
      "icon": "📝",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Turus",
      "stepDesc": "1 hasil = 1 garis",
      "icon": "||||",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Kelompok 5",
      "stepDesc": "4 tegak + 1 miring",
      "icon": "卌",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Frekuensi",
      "stepDesc": "Hitung banyaknya",
      "icon": "ƒ",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Tabel f",
      "stepDesc": "Kategori | turus | f",
      "icon": "📋",
      "flowFrom": "5",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "Data",
      "emoji": "📊",
      "countNum": 1,
      "countWord": "kumpulan fakta",
      "suara": "Definisi."
    },
    {
      "judul": "Siklus",
      "emoji": "🔄",
      "countNum": 1,
      "countWord": "Collection Cycle",
      "suara": "Metode luar."
    },
    {
      "judul": "Turus",
      "emoji": "|",
      "countNum": 1,
      "countWord": "1 hasil=1 garis",
      "suara": "Tally."
    },
    {
      "judul": "Kelompok 5",
      "emoji": "卌",
      "countNum": 5,
      "countWord": "4+1 miring",
      "suara": "Protocol."
    },
    {
      "judul": "Frekuensi",
      "emoji": "ƒ",
      "countNum": 1,
      "countWord": "berapa kali",
      "suara": "Definisi."
    },
    {
      "judul": "Bayam",
      "emoji": "🥬",
      "countNum": 8,
      "countWord": "f=8 contoh",
      "suara": "Buku."
    },
    {
      "judul": "Wortel",
      "emoji": "🥕",
      "countNum": 1,
      "countWord": "sering terbanyak",
      "suara": "Baca tabel."
    },
    {
      "judul": "Tabel f",
      "emoji": "📋",
      "countNum": 3,
      "countWord": "kat|turus|f",
      "suara": "Construction."
    },
    {
      "judul": "Keputusan",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "berdasarkan f",
      "suara": "Donat Anggi."
    },
    {
      "judul": "Siap B",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "piktogram",
      "suara": "Lanjut."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-a-c",
      "title": "Hitung Frekuensi",
      "bookReference": "hlm. 240–247",
      "objective": "Kumpulkan data dengan Tally Mark Protocol dan Frequency Table Construction.",
      "mechanicDescription": "Tiga ronde: turus, frekuensi, baca tabel untuk keputusan.",
      "voiceGuide": "Pilih jawaban terkait data, turus, dan frekuensi.",
      "emoji": "📊",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-a-c",
      "title": "Arti Turus",
      "bookReference": "hlm. 240–247",
      "objective": "Kumpulkan data dengan Tally Mark Protocol dan Frequency Table Construction.",
      "mechanicDescription": "Tiga ronde: turus, frekuensi, baca tabel untuk keputusan.",
      "voiceGuide": "Pilih jawaban terkait data, turus, dan frekuensi.",
      "emoji": "📊",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-a-c",
      "title": "Pilih Definisi Data",
      "bookReference": "hlm. 240–247",
      "objective": "Kumpulkan data dengan Tally Mark Protocol dan Frequency Table Construction.",
      "mechanicDescription": "Tiga ronde: turus, frekuensi, baca tabel untuk keputusan.",
      "voiceGuide": "Pilih jawaban terkait data, turus, dan frekuensi.",
      "emoji": "📊",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-a-c",
      "title": "Pilah Turus Benar",
      "bookReference": "hlm. 240–247",
      "objective": "Kumpulkan data dengan Tally Mark Protocol dan Frequency Table Construction.",
      "mechanicDescription": "Tiga ronde: turus, frekuensi, baca tabel untuk keputusan.",
      "voiceGuide": "Pilih jawaban terkait data, turus, dan frekuensi.",
      "emoji": "📊",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-a-c",
      "title": "Jodohkan Istilah",
      "bookReference": "hlm. 240–247",
      "objective": "Kumpulkan data dengan Tally Mark Protocol dan Frequency Table Construction.",
      "mechanicDescription": "Tiga ronde: turus, frekuensi, baca tabel untuk keputusan.",
      "voiceGuide": "Pilih jawaban terkait data, turus, dan frekuensi.",
      "emoji": "📊",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-a-c",
      "title": "Memori Frekuensi",
      "bookReference": "hlm. 240–247",
      "objective": "Kumpulkan data dengan Tally Mark Protocol dan Frequency Table Construction.",
      "mechanicDescription": "Tiga ronde: turus, frekuensi, baca tabel untuk keputusan.",
      "voiceGuide": "Pilih jawaban terkait data, turus, dan frekuensi.",
      "emoji": "📊",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-a-c",
      "title": "Ketuk Frekuensi",
      "bookReference": "hlm. 240–247",
      "objective": "Kumpulkan data dengan Tally Mark Protocol dan Frequency Table Construction.",
      "mechanicDescription": "Tiga ronde: turus, frekuensi, baca tabel untuk keputusan.",
      "voiceGuide": "Pilih jawaban terkait data, turus, dan frekuensi.",
      "emoji": "📊",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-a-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 240–247",
      "objective": "Kumpulkan data dengan Tally Mark Protocol dan Frequency Table Construction.",
      "mechanicDescription": "Tiga ronde: turus, frekuensi, baca tabel untuk keputusan.",
      "voiceGuide": "Pilih jawaban terkait data, turus, dan frekuensi.",
      "emoji": "📊",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-a-c",
      "title": "Cerita Donat Anggi",
      "bookReference": "hlm. 240–247",
      "objective": "Kumpulkan data dengan Tally Mark Protocol dan Frequency Table Construction.",
      "mechanicDescription": "Tiga ronde: turus, frekuensi, baca tabel untuk keputusan.",
      "voiceGuide": "Pilih jawaban terkait data, turus, dan frekuensi.",
      "emoji": "📊",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-a-c",
      "title": "Urutkan Frekuensi",
      "bookReference": "hlm. 240–247",
      "objective": "Kumpulkan data dengan Tally Mark Protocol dan Frequency Table Construction.",
      "mechanicDescription": "Tiga ronde: turus, frekuensi, baca tabel untuk keputusan.",
      "voiceGuide": "Pilih jawaban terkait data, turus, dan frekuensi.",
      "emoji": "📊",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-a-p",
      "title": "Diagram Hitung Frekuensi",
      "bookReference": "hlm. 240–247",
      "objective": "Kumpulkan data dengan Tally Mark Protocol dan Frequency Table Construction.",
      "mechanicDescription": "Tiga ronde: turus, frekuensi, baca tabel untuk keputusan.",
      "voiceGuide": "Pilih jawaban terkait data, turus, dan frekuensi.",
      "diagramType": "hitung",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "rumus-a-p",
      "title": "Diagram Arti Turus",
      "bookReference": "hlm. 240–247",
      "objective": "Kumpulkan data dengan Tally Mark Protocol dan Frequency Table Construction.",
      "mechanicDescription": "Tiga ronde: turus, frekuensi, baca tabel untuk keputusan.",
      "voiceGuide": "Pilih jawaban terkait data, turus, dan frekuensi.",
      "diagramType": "rumus",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "arti-a-p",
      "title": "Diagram Pilih Definisi Data",
      "bookReference": "hlm. 240–247",
      "objective": "Kumpulkan data dengan Tally Mark Protocol dan Frequency Table Construction.",
      "mechanicDescription": "Tiga ronde: turus, frekuensi, baca tabel untuk keputusan.",
      "voiceGuide": "Pilih jawaban terkait data, turus, dan frekuensi.",
      "diagramType": "arti",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sortir-a-p",
      "title": "Diagram Pilah Turus Benar",
      "bookReference": "hlm. 240–247",
      "objective": "Kumpulkan data dengan Tally Mark Protocol dan Frequency Table Construction.",
      "mechanicDescription": "Tiga ronde: turus, frekuensi, baca tabel untuk keputusan.",
      "voiceGuide": "Pilih jawaban terkait data, turus, dan frekuensi.",
      "diagramType": "sortir",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-a-p",
      "title": "Diagram Jodohkan Istilah",
      "bookReference": "hlm. 240–247",
      "objective": "Kumpulkan data dengan Tally Mark Protocol dan Frequency Table Construction.",
      "mechanicDescription": "Tiga ronde: turus, frekuensi, baca tabel untuk keputusan.",
      "voiceGuide": "Pilih jawaban terkait data, turus, dan frekuensi.",
      "diagramType": "jodoh",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memori-a-p",
      "title": "Diagram Memori Frekuensi",
      "bookReference": "hlm. 240–247",
      "objective": "Kumpulkan data dengan Tally Mark Protocol dan Frequency Table Construction.",
      "mechanicDescription": "Tiga ronde: turus, frekuensi, baca tabel untuk keputusan.",
      "voiceGuide": "Pilih jawaban terkait data, turus, dan frekuensi.",
      "diagramType": "memori",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-a-p",
      "title": "Diagram Ketuk Frekuensi",
      "bookReference": "hlm. 240–247",
      "objective": "Kumpulkan data dengan Tally Mark Protocol dan Frequency Table Construction.",
      "mechanicDescription": "Tiga ronde: turus, frekuensi, baca tabel untuk keputusan.",
      "voiceGuide": "Pilih jawaban terkait data, turus, dan frekuensi.",
      "diagramType": "ketuk",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "semua-a-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 240–247",
      "objective": "Kumpulkan data dengan Tally Mark Protocol dan Frequency Table Construction.",
      "mechanicDescription": "Tiga ronde: turus, frekuensi, baca tabel untuk keputusan.",
      "voiceGuide": "Pilih jawaban terkait data, turus, dan frekuensi.",
      "diagramType": "semua",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "cerita-a-p",
      "title": "Diagram Cerita Donat Anggi",
      "bookReference": "hlm. 240–247",
      "objective": "Kumpulkan data dengan Tally Mark Protocol dan Frequency Table Construction.",
      "mechanicDescription": "Tiga ronde: turus, frekuensi, baca tabel untuk keputusan.",
      "voiceGuide": "Pilih jawaban terkait data, turus, dan frekuensi.",
      "diagramType": "cerita",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "urut-a-p",
      "title": "Diagram Urutkan Frekuensi",
      "bookReference": "hlm. 240–247",
      "objective": "Kumpulkan data dengan Tally Mark Protocol dan Frequency Table Construction.",
      "mechanicDescription": "Tiga ronde: turus, frekuensi, baca tabel untuk keputusan.",
      "voiceGuide": "Pilih jawaban terkait data, turus, dan frekuensi.",
      "diagramType": "urut",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-a-a",
      "title": "Tulis Hitung Frekuensi",
      "bookReference": "hlm. 240–247",
      "objective": "Kumpulkan data dengan Tally Mark Protocol dan Frequency Table Construction.",
      "mechanicDescription": "Tiga ronde: turus, frekuensi, baca tabel untuk keputusan.",
      "voiceGuide": "Pilih jawaban terkait data, turus, dan frekuensi.",
      "symbolLarge": "ƒ",
      "wordLarge": "FREKUENSI",
      "mathNotation": "turus · f"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-a-a",
      "title": "Tulis Arti Turus",
      "bookReference": "hlm. 240–247",
      "objective": "Kumpulkan data dengan Tally Mark Protocol dan Frequency Table Construction.",
      "mechanicDescription": "Tiga ronde: turus, frekuensi, baca tabel untuk keputusan.",
      "voiceGuide": "Pilih jawaban terkait data, turus, dan frekuensi.",
      "symbolLarge": "ƒ",
      "wordLarge": "FREKUENSI",
      "mathNotation": "turus · f"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-a-a",
      "title": "Tulis Pilih Definisi Data",
      "bookReference": "hlm. 240–247",
      "objective": "Kumpulkan data dengan Tally Mark Protocol dan Frequency Table Construction.",
      "mechanicDescription": "Tiga ronde: turus, frekuensi, baca tabel untuk keputusan.",
      "voiceGuide": "Pilih jawaban terkait data, turus, dan frekuensi.",
      "symbolLarge": "ƒ",
      "wordLarge": "FREKUENSI",
      "mathNotation": "turus · f"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-a-a",
      "title": "Tulis Pilah Turus Benar",
      "bookReference": "hlm. 240–247",
      "objective": "Kumpulkan data dengan Tally Mark Protocol dan Frequency Table Construction.",
      "mechanicDescription": "Tiga ronde: turus, frekuensi, baca tabel untuk keputusan.",
      "voiceGuide": "Pilih jawaban terkait data, turus, dan frekuensi.",
      "symbolLarge": "ƒ",
      "wordLarge": "FREKUENSI",
      "mathNotation": "turus · f"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-a-a",
      "title": "Tulis Jodohkan Istilah",
      "bookReference": "hlm. 240–247",
      "objective": "Kumpulkan data dengan Tally Mark Protocol dan Frequency Table Construction.",
      "mechanicDescription": "Tiga ronde: turus, frekuensi, baca tabel untuk keputusan.",
      "voiceGuide": "Pilih jawaban terkait data, turus, dan frekuensi.",
      "symbolLarge": "ƒ",
      "wordLarge": "FREKUENSI",
      "mathNotation": "turus · f"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-a-a",
      "title": "Tulis Memori Frekuensi",
      "bookReference": "hlm. 240–247",
      "objective": "Kumpulkan data dengan Tally Mark Protocol dan Frequency Table Construction.",
      "mechanicDescription": "Tiga ronde: turus, frekuensi, baca tabel untuk keputusan.",
      "voiceGuide": "Pilih jawaban terkait data, turus, dan frekuensi.",
      "symbolLarge": "ƒ",
      "wordLarge": "FREKUENSI",
      "mathNotation": "turus · f"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-a",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 240–247",
      "objective": "Kumpulkan data dengan Tally Mark Protocol dan Frequency Table Construction.",
      "mechanicDescription": "Dua ronde menilai pernyataan.",
      "voiceGuide": "Benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-a",
      "title": "Detektif Data",
      "bookReference": "hlm. 240–247",
      "objective": "Kumpulkan data dengan Tally Mark Protocol dan Frequency Table Construction.",
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
      "bookReference": "hlm. 240–247",
      "objective": "Kumpulkan data dengan Tally Mark Protocol dan Frequency Table Construction.",
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
      "bookReference": "hlm. 240–247",
      "objective": "Kumpulkan data dengan Tally Mark Protocol dan Frequency Table Construction.",
      "mechanicDescription": "Tiga ronde cerita.",
      "voiceGuide": "Baca lalu pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "📊",
      "nama": "Data",
      "isi": "Data = kumpulan fakta (kata, angka, simbol) untuk keputusan.",
      "suara": "Definisi buku."
    },
    {
      "ikon": "||||",
      "nama": "Turus",
      "isi": "Satu hasil = satu garis; kelompok lima = empat tegak + satu miring (Tally Mark Protocol).",
      "suara": "hlm. 244."
    },
    {
      "ikon": "ƒ",
      "nama": "Frekuensi",
      "isi": "Bilangan yang menyatakan berapa kali suatu nilai muncul.",
      "suara": "Frequency Table."
    },
    {
      "ikon": "🔄",
      "nama": "Siklus",
      "isi": "Kumpulkan → catat → turus → tabel f → baca makna (Data Collection Cycle).",
      "suara": "Metode luar."
    }
  ],
  "poinSuara": "Ingat: data menolong keputusan, catat dengan turus lima-lima, tulis frekuensi di tabel, lalu baca mana yang terbanyak.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Kumpulkan data",
        "warna": "#FDE68A"
      },
      {
        "teks": "buat turus",
        "warna": "#BBF7D0"
      },
      {
        "teks": "hitung frekuensi",
        "warna": "#BFDBFE"
      },
      {
        "teks": "susun tabel f",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: tanya favorit buah keluarga, buat turus dan tabel frekuensi, lalu sebut buah yang paling sering dipilih.",
  "refleksi": [
    "Apa bedanya data mentah dan tabel frekuensi?",
    "Mengapa turus dikelompokkan lima?",
    "Bagaimana Anggi memakai data untuk keputusan donat?"
  ]
};
export const SUB_B58: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Piktogram)",
  "fullTitle": "Sub-Bab B: Piktogram",
  "targetDescription": "Siswa membaca dan membuat piktogram dengan kunci/legenda (satu simbol mewakili nilai tertentu), menjaga konsistensi skala, serta menemukan kesalahan penyajian sesuai Buku Siswa Kelas V Bab 8 Sub-Bab B hlm. 248–253.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Piktogram menyajikan data dengan gambar atau simbol. Wajib ada kunci: misalnya satu gambar mewakili empat kue apem. METODE LUAR Pictograph Scale Legend dan Unit Symbol Consistency. Banyak data = banyak simbol dikali nilai kunci. Simbol harus seragam dan tidak menyesatkan ukuran. Jika kunci salah atau gambar tidak proporsional, pembaca salah hitung. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa membaca dan membuat piktogram dengan kunci yang benar serta mengecek konsistensi simbol.",
    "referensi": "Buku Siswa Matematika Kelas V Bab 8 Sub-Bab B hlm. 248–253; METODE LUAR · Pictograph Scale Legend; Unit Symbol Consistency; Pictograph Error Hunt."
  },
  "videos": [
    {
      "id": "K5B8B-V1",
      "judul": "Kunci Simbol",
      "subjudul": "Legend",
      "adegan": [
        {
          "id": "K5B8B-V1-1",
          "judul": "Teka-teki nilai",
          "ketukan": [
            "Eksplorasi 8.2A: jika satu simbol mewakili seratus, dua simbol mewakili dua ratus.",
            "Jika setengah simbol dipakai, nilainya setengah dari kunci.",
            "METODE LUAR · Pictograph Scale Legend.",
            "Tanpa kunci, gambar tidak punya arti angka."
          ],
          "papan": [
            "1 simbol = N",
            "2 simbol = 2N",
            "½ simbol = N/2",
            "wajib kunci"
          ]
        },
        {
          "id": "K5B8B-V1-2",
          "judul": "Kue tradisional",
          "ketukan": [
            "Anggi mencatat penjualan kue apem.",
            "Piktogram memakai kunci: satu gambar mewakili empat kue.",
            "Hitung: hitung gambar lalu kali empat.",
            "Bandingkan hari mana paling banyak terjual."
          ],
          "papan": [
            "kunci = 4",
            "hitung × kunci",
            "banding hari",
            "apem Anggi"
          ]
        },
        {
          "id": "K5B8B-V1-3",
          "judul": "Konsistensi",
          "ketukan": [
            "METODE LUAR · Unit Symbol Consistency: semua simbol sama bentuk dan ukuran.",
            "Jangan buat gambar lebih besar hanya supaya 'terlihat banyak'.",
            "Itu menyesatkan pembaca.",
            "Skala visual harus jujur."
          ],
          "papan": [
            "simbol seragam",
            "ukuran sama",
            "jangan tipu mata",
            "Consistency"
          ]
        }
      ]
    },
    {
      "id": "K5B8B-V2",
      "judul": "Baca & Perbaiki",
      "subjudul": "Error Hunt",
      "adegan": [
        {
          "id": "K5B8B-V2-1",
          "judul": "Cari kesalahan",
          "ketukan": [
            "Eksplorasi diskusi: temukan kesalahan pada piktogram penjualan apem.",
            "Salah kunci? Simbol beda ukuran? Jumlah tidak cocok tabel?",
            "METODE LUAR · Pictograph Error Hunt.",
            "Perbaiki agar cocok data asli."
          ],
          "papan": [
            "cari salah",
            "kunci/ukuran",
            "Error Hunt",
            "perbaiki"
          ]
        },
        {
          "id": "K5B8B-V2-2",
          "judul": "Dari tabel ke gambar",
          "ketukan": [
            "Ambil frekuensi dari tabel panen tomat atau penjualan.",
            "Bagi frekuensi dengan nilai kunci untuk tahu banyak simbol.",
            "Jika sisa, boleh gambar sebagian simbol sesuai pecahan kunci.",
            "Cantumkan judul dan kunci di bawah."
          ],
          "papan": [
            "f ÷ kunci",
            "banyak simbol",
            "simbol sebagian",
            "judul+kunci"
          ]
        },
        {
          "id": "K5B8B-V2-3",
          "judul": "Skala proporsi",
          "ketukan": [
            "Jika panjang batang gambar diminta proporsional, jaga perbandingan benar.",
            "Contoh buku: dari 200 satuan ke 120 satuan artinya skala 120/200.",
            "Piktogram dan diagram saling terkait lewat skala.",
            "Siap ke diagram batang di Sub-Bab C."
          ],
          "papan": [
            "proporsi",
            "120 dari 200",
            "skala jujur",
            "siap C"
          ]
        }
      ]
    },
    {
      "id": "K5B8B-V3",
      "judul": "Latihan Piktogram",
      "subjudul": "Ayo buat",
      "adegan": [
        {
          "id": "K5B8B-V3-1",
          "judul": "Langkah buat",
          "ketukan": [
            "1. Tulis judul. 2. Tulis kunci. 3. Gambar simbol seragam per kategori.",
            "4. Cek: jumlah simbol × kunci = frekuensi.",
            "5. Bandingkan kategori dengan cepat lewat banyaknya gambar.",
            "Itulah kekuatan piktogram."
          ],
          "papan": [
            "judul+kunci",
            "simbol seragam",
            "cek × kunci",
            "banding visual"
          ]
        },
        {
          "id": "K5B8B-V3-2",
          "judul": "Kelebihan & batas",
          "ketukan": [
            "Piktogram mudah dibaca anak kecil dan menarik.",
            "Tapi kurang tepat untuk angka pecahan rumit tanpa setengah simbol.",
            "Pilih kunci yang membagi frekuensi dengan rapi bila mungkin.",
            "Jika data sangat detail, tabel atau batang lebih tepat."
          ],
          "papan": [
            "mudah dibaca",
            "batas pecahan",
            "pilih kunci rapi",
            "pilih bentuk"
          ]
        },
        {
          "id": "K5B8B-V3-3",
          "judul": "Siap C",
          "ketukan": [
            "Piktogram = data bergambar + kunci.",
            "Berikutnya diagram batang: tinggi batang mewakili frekuensi.",
            "Sumbu dan skala jadi raja.",
            "Ayo Sub-Bab C!"
          ],
          "papan": [
            "gambar+kunci",
            "lanjut batang",
            "sumbu & skala",
            "ke C"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Judul",
      "stepDesc": "Apa datanya?",
      "icon": "📌",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Kunci",
      "stepDesc": "1 simbol = N",
      "icon": "🔑",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Simbol seragam",
      "stepDesc": "Ukuran sama",
      "icon": "🧁",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Hitung",
      "stepDesc": "simbol × N = f",
      "icon": "✖️",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Cek kesalahan",
      "stepDesc": "Error Hunt",
      "icon": "🔍",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Banding",
      "stepDesc": "Mana terbanyak?",
      "icon": "⚖️",
      "flowFrom": "5",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "Piktogram",
      "emoji": "🖼️",
      "countNum": 1,
      "countWord": "data bergambar",
      "suara": "Definisi."
    },
    {
      "judul": "Kunci",
      "emoji": "🔑",
      "countNum": 1,
      "countWord": "1 simbol=N",
      "suara": "Legend."
    },
    {
      "judul": "Contoh kunci",
      "emoji": "🧁",
      "countNum": 4,
      "countWord": "1=4 apem",
      "suara": "Buku."
    },
    {
      "judul": "Hitung",
      "emoji": "✖️",
      "countNum": 1,
      "countWord": "simbol×N",
      "suara": "Baca."
    },
    {
      "judul": "½ simbol",
      "emoji": "✂️",
      "countNum": 1,
      "countWord": "nilai N/2",
      "suara": "Skala."
    },
    {
      "judul": "Seragam",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "ukuran sama",
      "suara": "Consistency."
    },
    {
      "judul": "Error Hunt",
      "emoji": "🕵️",
      "countNum": 1,
      "countWord": "cari salah",
      "suara": "Metode luar."
    },
    {
      "judul": "Judul",
      "emoji": "📌",
      "countNum": 1,
      "countWord": "wajib ada",
      "suara": "Tata letak."
    },
    {
      "judul": "Cek",
      "emoji": "🧮",
      "countNum": 1,
      "countWord": "cocok tabel",
      "suara": "Validasi."
    },
    {
      "judul": "Siap C",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "diagram batang",
      "suara": "Lanjut."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-b-c",
      "title": "Hitung Nilai Simbol",
      "bookReference": "hlm. 248–253",
      "objective": "Baca dan buat piktogram dengan Pictograph Scale Legend dan Unit Symbol Consistency.",
      "mechanicDescription": "Tiga ronde: kunci, hitung simbol×N, Error Hunt.",
      "voiceGuide": "Pilih jawaban terkait piktogram dan kunci.",
      "emoji": "🖼️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-b-c",
      "title": "Arti Kunci Piktogram",
      "bookReference": "hlm. 248–253",
      "objective": "Baca dan buat piktogram dengan Pictograph Scale Legend dan Unit Symbol Consistency.",
      "mechanicDescription": "Tiga ronde: kunci, hitung simbol×N, Error Hunt.",
      "voiceGuide": "Pilih jawaban terkait piktogram dan kunci.",
      "emoji": "🖼️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-b-c",
      "title": "Pilih Legenda",
      "bookReference": "hlm. 248–253",
      "objective": "Baca dan buat piktogram dengan Pictograph Scale Legend dan Unit Symbol Consistency.",
      "mechanicDescription": "Tiga ronde: kunci, hitung simbol×N, Error Hunt.",
      "voiceGuide": "Pilih jawaban terkait piktogram dan kunci.",
      "emoji": "🖼️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-b-c",
      "title": "Pilah Benar/Salah Gambar",
      "bookReference": "hlm. 248–253",
      "objective": "Baca dan buat piktogram dengan Pictograph Scale Legend dan Unit Symbol Consistency.",
      "mechanicDescription": "Tiga ronde: kunci, hitung simbol×N, Error Hunt.",
      "voiceGuide": "Pilih jawaban terkait piktogram dan kunci.",
      "emoji": "🖼️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-b-c",
      "title": "Jodohkan Kunci",
      "bookReference": "hlm. 248–253",
      "objective": "Baca dan buat piktogram dengan Pictograph Scale Legend dan Unit Symbol Consistency.",
      "mechanicDescription": "Tiga ronde: kunci, hitung simbol×N, Error Hunt.",
      "voiceGuide": "Pilih jawaban terkait piktogram dan kunci.",
      "emoji": "🖼️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-b-c",
      "title": "Memori Piktogram",
      "bookReference": "hlm. 248–253",
      "objective": "Baca dan buat piktogram dengan Pictograph Scale Legend dan Unit Symbol Consistency.",
      "mechanicDescription": "Tiga ronde: kunci, hitung simbol×N, Error Hunt.",
      "voiceGuide": "Pilih jawaban terkait piktogram dan kunci.",
      "emoji": "🖼️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-b-c",
      "title": "Ketuk Nilai",
      "bookReference": "hlm. 248–253",
      "objective": "Baca dan buat piktogram dengan Pictograph Scale Legend dan Unit Symbol Consistency.",
      "mechanicDescription": "Tiga ronde: kunci, hitung simbol×N, Error Hunt.",
      "voiceGuide": "Pilih jawaban terkait piktogram dan kunci.",
      "emoji": "🖼️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-b-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 248–253",
      "objective": "Baca dan buat piktogram dengan Pictograph Scale Legend dan Unit Symbol Consistency.",
      "mechanicDescription": "Tiga ronde: kunci, hitung simbol×N, Error Hunt.",
      "voiceGuide": "Pilih jawaban terkait piktogram dan kunci.",
      "emoji": "🖼️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-b-c",
      "title": "Cerita Kue Apem",
      "bookReference": "hlm. 248–253",
      "objective": "Baca dan buat piktogram dengan Pictograph Scale Legend dan Unit Symbol Consistency.",
      "mechanicDescription": "Tiga ronde: kunci, hitung simbol×N, Error Hunt.",
      "voiceGuide": "Pilih jawaban terkait piktogram dan kunci.",
      "emoji": "🖼️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-b-c",
      "title": "Urutkan Banyak Simbol",
      "bookReference": "hlm. 248–253",
      "objective": "Baca dan buat piktogram dengan Pictograph Scale Legend dan Unit Symbol Consistency.",
      "mechanicDescription": "Tiga ronde: kunci, hitung simbol×N, Error Hunt.",
      "voiceGuide": "Pilih jawaban terkait piktogram dan kunci.",
      "emoji": "🖼️",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-b-p",
      "title": "Diagram Hitung Nilai Simbol",
      "bookReference": "hlm. 248–253",
      "objective": "Baca dan buat piktogram dengan Pictograph Scale Legend dan Unit Symbol Consistency.",
      "mechanicDescription": "Tiga ronde: kunci, hitung simbol×N, Error Hunt.",
      "voiceGuide": "Pilih jawaban terkait piktogram dan kunci.",
      "diagramType": "hitung",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "rumus-b-p",
      "title": "Diagram Arti Kunci Piktogram",
      "bookReference": "hlm. 248–253",
      "objective": "Baca dan buat piktogram dengan Pictograph Scale Legend dan Unit Symbol Consistency.",
      "mechanicDescription": "Tiga ronde: kunci, hitung simbol×N, Error Hunt.",
      "voiceGuide": "Pilih jawaban terkait piktogram dan kunci.",
      "diagramType": "rumus",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "arti-b-p",
      "title": "Diagram Pilih Legenda",
      "bookReference": "hlm. 248–253",
      "objective": "Baca dan buat piktogram dengan Pictograph Scale Legend dan Unit Symbol Consistency.",
      "mechanicDescription": "Tiga ronde: kunci, hitung simbol×N, Error Hunt.",
      "voiceGuide": "Pilih jawaban terkait piktogram dan kunci.",
      "diagramType": "arti",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sortir-b-p",
      "title": "Diagram Pilah Benar/Salah Gambar",
      "bookReference": "hlm. 248–253",
      "objective": "Baca dan buat piktogram dengan Pictograph Scale Legend dan Unit Symbol Consistency.",
      "mechanicDescription": "Tiga ronde: kunci, hitung simbol×N, Error Hunt.",
      "voiceGuide": "Pilih jawaban terkait piktogram dan kunci.",
      "diagramType": "sortir",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-b-p",
      "title": "Diagram Jodohkan Kunci",
      "bookReference": "hlm. 248–253",
      "objective": "Baca dan buat piktogram dengan Pictograph Scale Legend dan Unit Symbol Consistency.",
      "mechanicDescription": "Tiga ronde: kunci, hitung simbol×N, Error Hunt.",
      "voiceGuide": "Pilih jawaban terkait piktogram dan kunci.",
      "diagramType": "jodoh",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memori-b-p",
      "title": "Diagram Memori Piktogram",
      "bookReference": "hlm. 248–253",
      "objective": "Baca dan buat piktogram dengan Pictograph Scale Legend dan Unit Symbol Consistency.",
      "mechanicDescription": "Tiga ronde: kunci, hitung simbol×N, Error Hunt.",
      "voiceGuide": "Pilih jawaban terkait piktogram dan kunci.",
      "diagramType": "memori",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-b-p",
      "title": "Diagram Ketuk Nilai",
      "bookReference": "hlm. 248–253",
      "objective": "Baca dan buat piktogram dengan Pictograph Scale Legend dan Unit Symbol Consistency.",
      "mechanicDescription": "Tiga ronde: kunci, hitung simbol×N, Error Hunt.",
      "voiceGuide": "Pilih jawaban terkait piktogram dan kunci.",
      "diagramType": "ketuk",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "semua-b-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 248–253",
      "objective": "Baca dan buat piktogram dengan Pictograph Scale Legend dan Unit Symbol Consistency.",
      "mechanicDescription": "Tiga ronde: kunci, hitung simbol×N, Error Hunt.",
      "voiceGuide": "Pilih jawaban terkait piktogram dan kunci.",
      "diagramType": "semua",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "cerita-b-p",
      "title": "Diagram Cerita Kue Apem",
      "bookReference": "hlm. 248–253",
      "objective": "Baca dan buat piktogram dengan Pictograph Scale Legend dan Unit Symbol Consistency.",
      "mechanicDescription": "Tiga ronde: kunci, hitung simbol×N, Error Hunt.",
      "voiceGuide": "Pilih jawaban terkait piktogram dan kunci.",
      "diagramType": "cerita",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "urut-b-p",
      "title": "Diagram Urutkan Banyak Simbol",
      "bookReference": "hlm. 248–253",
      "objective": "Baca dan buat piktogram dengan Pictograph Scale Legend dan Unit Symbol Consistency.",
      "mechanicDescription": "Tiga ronde: kunci, hitung simbol×N, Error Hunt.",
      "voiceGuide": "Pilih jawaban terkait piktogram dan kunci.",
      "diagramType": "urut",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-b-a",
      "title": "Tulis Hitung Nilai Simbol",
      "bookReference": "hlm. 248–253",
      "objective": "Baca dan buat piktogram dengan Pictograph Scale Legend dan Unit Symbol Consistency.",
      "mechanicDescription": "Tiga ronde: kunci, hitung simbol×N, Error Hunt.",
      "voiceGuide": "Pilih jawaban terkait piktogram dan kunci.",
      "symbolLarge": "🔑",
      "wordLarge": "PIKTOGRAM",
      "mathNotation": "1 simbol = N"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-b-a",
      "title": "Tulis Arti Kunci Piktogram",
      "bookReference": "hlm. 248–253",
      "objective": "Baca dan buat piktogram dengan Pictograph Scale Legend dan Unit Symbol Consistency.",
      "mechanicDescription": "Tiga ronde: kunci, hitung simbol×N, Error Hunt.",
      "voiceGuide": "Pilih jawaban terkait piktogram dan kunci.",
      "symbolLarge": "🔑",
      "wordLarge": "PIKTOGRAM",
      "mathNotation": "1 simbol = N"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-b-a",
      "title": "Tulis Pilih Legenda",
      "bookReference": "hlm. 248–253",
      "objective": "Baca dan buat piktogram dengan Pictograph Scale Legend dan Unit Symbol Consistency.",
      "mechanicDescription": "Tiga ronde: kunci, hitung simbol×N, Error Hunt.",
      "voiceGuide": "Pilih jawaban terkait piktogram dan kunci.",
      "symbolLarge": "🔑",
      "wordLarge": "PIKTOGRAM",
      "mathNotation": "1 simbol = N"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-b-a",
      "title": "Tulis Pilah Benar/Salah Gambar",
      "bookReference": "hlm. 248–253",
      "objective": "Baca dan buat piktogram dengan Pictograph Scale Legend dan Unit Symbol Consistency.",
      "mechanicDescription": "Tiga ronde: kunci, hitung simbol×N, Error Hunt.",
      "voiceGuide": "Pilih jawaban terkait piktogram dan kunci.",
      "symbolLarge": "🔑",
      "wordLarge": "PIKTOGRAM",
      "mathNotation": "1 simbol = N"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-b-a",
      "title": "Tulis Jodohkan Kunci",
      "bookReference": "hlm. 248–253",
      "objective": "Baca dan buat piktogram dengan Pictograph Scale Legend dan Unit Symbol Consistency.",
      "mechanicDescription": "Tiga ronde: kunci, hitung simbol×N, Error Hunt.",
      "voiceGuide": "Pilih jawaban terkait piktogram dan kunci.",
      "symbolLarge": "🔑",
      "wordLarge": "PIKTOGRAM",
      "mathNotation": "1 simbol = N"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-b-a",
      "title": "Tulis Memori Piktogram",
      "bookReference": "hlm. 248–253",
      "objective": "Baca dan buat piktogram dengan Pictograph Scale Legend dan Unit Symbol Consistency.",
      "mechanicDescription": "Tiga ronde: kunci, hitung simbol×N, Error Hunt.",
      "voiceGuide": "Pilih jawaban terkait piktogram dan kunci.",
      "symbolLarge": "🔑",
      "wordLarge": "PIKTOGRAM",
      "mathNotation": "1 simbol = N"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-b",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 248–253",
      "objective": "Baca dan buat piktogram dengan Pictograph Scale Legend dan Unit Symbol Consistency.",
      "mechanicDescription": "Dua ronde menilai pernyataan.",
      "voiceGuide": "Benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-b",
      "title": "Detektif Data",
      "bookReference": "hlm. 248–253",
      "objective": "Baca dan buat piktogram dengan Pictograph Scale Legend dan Unit Symbol Consistency.",
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
      "bookReference": "hlm. 248–253",
      "objective": "Baca dan buat piktogram dengan Pictograph Scale Legend dan Unit Symbol Consistency.",
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
      "bookReference": "hlm. 248–253",
      "objective": "Baca dan buat piktogram dengan Pictograph Scale Legend dan Unit Symbol Consistency.",
      "mechanicDescription": "Tiga ronde cerita.",
      "voiceGuide": "Baca lalu pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "🔑",
      "nama": "Kunci",
      "isi": "Satu simbol mewakili nilai N; wajib ditulis (Pictograph Scale Legend).",
      "suara": "Eksplorasi 8.2."
    },
    {
      "ikon": "✖️",
      "nama": "Hitung",
      "isi": "Nilai data = banyak simbol × N (½ simbol = N/2).",
      "suara": "Baca piktogram."
    },
    {
      "ikon": "🧁",
      "nama": "Seragam",
      "isi": "Simbol sama bentuk dan ukuran (Unit Symbol Consistency).",
      "suara": "Anti menyesatkan."
    },
    {
      "ikon": "🕵️",
      "nama": "Cek",
      "isi": "Hunt kesalahan: kunci, ukuran, cocok tabel (Pictograph Error Hunt).",
      "suara": "Diskusi buku."
    }
  ],
  "poinSuara": "Ingat: tulis kunci, gambar simbol seragam, hitung simbol kali N, lalu periksa apakah cocok dengan tabel.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Tulis judul & kunci",
        "warna": "#FDE68A"
      },
      {
        "teks": "gambar simbol seragam",
        "warna": "#BBF7D0"
      },
      {
        "teks": "hitung simbol × N",
        "warna": "#BFDBFE"
      },
      {
        "teks": "cek cocok tabel",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: buat piktogram jadwal bantu rumah (satu stiker = 1 kali), tulis kuncinya, dan hitung total.",
  "refleksi": [
    "Mengapa piktogram tanpa kunci berbahaya?",
    "Bagaimana menghitung jika ada setengah simbol?",
    "Sebut satu kesalahan umum pada piktogram."
  ]
};
export const SUB_C58: SubBabNaskah = {
  "id": "C",
  "codeTitle": "Sub-Bab C (Diagram Batang)",
  "fullTitle": "Sub-Bab C: Diagram Batang",
  "targetDescription": "Siswa membaca dan membuat diagram batang dengan sumbu, skala, dan tinggi batang yang proporsional; membandingkan batang tunggal maupun ganda; serta menafsirkan data Sea Games dan konteks lain sesuai Buku Siswa Kelas V Bab 8 Sub-Bab C hlm. 253–267.",
  "secondaryBg": "#DCFCE7",
  "secondaryBorder": "#15803D",
  "secondaryText": "#14532D",
  "silabus": {
    "teksSuara": "Diagram batang memakai tinggi atau panjang batang untuk mewakili frekuensi. Sumbu mendatar untuk kategori, sumbu tegak untuk skala angka. METODE LUAR Bar Chart Reading Protocol dan Axis Scale Consistency. Bandingkan tinggi batang untuk tahu mana lebih banyak. Diagram batang ganda membandingkan dua kelompok, misalnya laki-laki dan perempuan. Skala harus mulai dari nol agar tidak menipu. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa membaca, membuat, dan membandingkan diagram batang dengan skala yang konsisten.",
    "referensi": "Buku Siswa Matematika Kelas V Bab 8 Sub-Bab C hlm. 253–267; METODE LUAR · Bar Chart Reading Protocol; Axis Scale Consistency; Comparative Bar Analysis."
  },
  "videos": [
    {
      "id": "K5B8C-V1",
      "judul": "Baca Batang",
      "subjudul": "Protocol",
      "adegan": [
        {
          "id": "K5B8C-V1-1",
          "judul": "Bagian diagram",
          "ketukan": [
            "Judul, sumbu kategori, sumbu skala, batang, dan satuan.",
            "METODE LUAR · Bar Chart Reading Protocol: baca judul dulu, lalu skala, lalu tinggi batang.",
            "Cara berangkat sekolah: bandingkan tinggi batang jalan kaki, sepeda, dan lainnya.",
            "Batang tertinggi = kategori terbanyak."
          ],
          "papan": [
            "judul+sumbu",
            "Protocol baca",
            "tinggi = f",
            "tertinggi"
          ]
        },
        {
          "id": "K5B8C-V1-2",
          "judul": "Skala jujur",
          "ketukan": [
            "METODE LUAR · Axis Scale Consistency: jarak angka pada sumbu harus teratur.",
            "Mulai dari nol agar perbedaan tidak dilebih-lebihkan.",
            "Pilih skala yang muat data terbesar.",
            "Jika skala meloncat-loncat, pembaca bingung."
          ],
          "papan": [
            "jarak teratur",
            "mulai 0",
            "muat data max",
            "Consistency"
          ]
        },
        {
          "id": "K5B8C-V1-3",
          "judul": "Sea Games emas",
          "ketukan": [
            "Tabel 8.8 medali emas Indonesia di Sea Games digambar jadi batang.",
            "Tiap tahun satu batang; tinggi sesuai banyak emas.",
            "Salin, lengkapi, lalu tafsir tren naik atau turun.",
            "Data membantu cerita prestasi olahraga."
          ],
          "papan": [
            "Tabel 8.8",
            "1 tahun=1 batang",
            "tren",
            "makna data"
          ]
        }
      ]
    },
    {
      "id": "K5B8C-V2",
      "judul": "Banding & Ganda",
      "subjudul": "Compare",
      "adegan": [
        {
          "id": "K5B8C-V2-1",
          "judul": "Selisih batang",
          "ketukan": [
            "Selisih = frekuensi besar dikurangi frekuensi kecil.",
            "Contoh: bandingkan siswa laki-laki dan perempuan per tahun.",
            "METODE LUAR · Comparative Bar Analysis.",
            "Perhatikan skala yang sama saat membandingkan dua diagram."
          ],
          "papan": [
            "selisih f",
            "L vs P",
            "Comparative",
            "skala sama"
          ]
        },
        {
          "id": "K5B8C-V2-2",
          "judul": "Batang ganda",
          "ketukan": [
            "Dua batang berdampingan per kategori untuk dua kelompok.",
            "Pastikan legenda warna jelas.",
            "Tanya: kapan L lebih banyak dari P? Kapan sebaliknya?",
            "Jangan campur skala berbeda dalam satu gambar."
          ],
          "papan": [
            "berdampingan",
            "legenda warna",
            "kapan L>P",
            "satu skala"
          ]
        },
        {
          "id": "K5B8C-V2-3",
          "judul": "Dari tabel ke batang",
          "ketukan": [
            "Ambil frekuensi tabel panen lele atau pengunjung perpustakaan.",
            "Gambar batang proporsional ke skala.",
            "Cek: batang tertinggi cocok frekuensi terbesar.",
            "Tambah label jika membantu."
          ],
          "papan": [
            "tabel → batang",
            "proporsional",
            "cek tertinggi",
            "label"
          ]
        }
      ]
    },
    {
      "id": "K5B8C-V3",
      "judul": "Tafsir & Rangkum",
      "subjudul": "A–C",
      "adegan": [
        {
          "id": "K5B8C-V3-1",
          "judul": "Keputusan dari batang",
          "ketukan": [
            "Seperti Anggi: baca mana tertinggi/terendah, tren, dan selisih.",
            "Pilih tindakan: tambah stok, ubah jadwal, atau bicara ke pedagang.",
            "Data bukan hanya gambar; data adalah alasan.",
            "Latihan buku memakai konteks kalori, internet, dan perpustakaan."
          ],
          "papan": [
            "tinggi/rendah",
            "tren & selisih",
            "alasan tindakan",
            "konteks buku"
          ]
        },
        {
          "id": "K5B8C-V3-2",
          "judul": "Pilih bentuk sajian",
          "ketukan": [
            "Tabel f: tepat dan rinci. Piktogram: menarik + kunci. Batang: mudah banding tinggi.",
            "Pilih sesuai tujuan pembaca.",
            "Ketiganya saling terhubung dari data yang sama.",
            "METODE LUAR · Representation Choice."
          ],
          "papan": [
            "tabel rinci",
            "piktogram menarik",
            "batang banding",
            "pilih tujuan"
          ]
        },
        {
          "id": "K5B8C-V3-3",
          "judul": "Materi A–C siap",
          "ketukan": [
            "A: kumpulkan, turus, frekuensi. B: piktogram + kunci. C: diagram batang + skala.",
            "Tab Materi Bab 8 Sub-Bab A sampai C siap dimainkan.",
            "Latihan dan ujian menyusul instruksi terpisah.",
            "Hebat, analis data muda!"
          ],
          "papan": [
            "A turus",
            "B piktogram",
            "C batang",
            "Materi siap"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Judul",
      "stepDesc": "Konteks data",
      "icon": "📌",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Sumbu X",
      "stepDesc": "Kategori",
      "icon": "➡️",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Sumbu Y",
      "stepDesc": "Skala dari 0",
      "icon": "⬆️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Batang",
      "stepDesc": "Tinggi = f",
      "icon": "▮",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Banding",
      "stepDesc": "Selisih / tren",
      "icon": "⚖️",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Keputusan",
      "stepDesc": "Tafsir makna",
      "icon": "✅",
      "flowFrom": "5",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "Diagram batang",
      "emoji": "▮",
      "countNum": 1,
      "countWord": "tinggi = f",
      "suara": "Definisi."
    },
    {
      "judul": "Protocol",
      "emoji": "👁️",
      "countNum": 1,
      "countWord": "judul→skala→batang",
      "suara": "Baca."
    },
    {
      "judul": "Skala",
      "emoji": "📏",
      "countNum": 0,
      "countWord": "mulai 0 teratur",
      "suara": "Consistency."
    },
    {
      "judul": "Sea Games",
      "emoji": "🥇",
      "countNum": 1,
      "countWord": "emas per tahun",
      "suara": "Tabel 8.8."
    },
    {
      "judul": "Selisih",
      "emoji": "➖",
      "countNum": 1,
      "countWord": "f besar − f kecil",
      "suara": "Banding."
    },
    {
      "judul": "Batang ganda",
      "emoji": "▌▌",
      "countNum": 2,
      "countWord": "dua kelompok",
      "suara": "Comparative."
    },
    {
      "judul": "Legenda",
      "emoji": "🎨",
      "countNum": 1,
      "countWord": "warna jelas",
      "suara": "Ganda."
    },
    {
      "judul": "Tabel→batang",
      "emoji": "🔄",
      "countNum": 1,
      "countWord": "f jadi tinggi",
      "suara": "Konstruksi."
    },
    {
      "judul": "Pilih sajian",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "tabel/pikto/batang",
      "suara": "Representation."
    },
    {
      "judul": "Bab 8 A–C",
      "emoji": "🎉",
      "countNum": 1,
      "countWord": "Materi siap",
      "suara": "Selesai."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-c-c",
      "title": "Hitung Tinggi Batang",
      "bookReference": "hlm. 253–267",
      "objective": "Baca dan buat diagram batang dengan Bar Chart Reading Protocol dan Axis Scale Consistency.",
      "mechanicDescription": "Tiga ronde: baca tinggi, selisih, banding batang ganda.",
      "voiceGuide": "Pilih jawaban terkait diagram batang dan skala.",
      "emoji": "▮",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-c-c",
      "title": "Arti Skala Sumbu",
      "bookReference": "hlm. 253–267",
      "objective": "Baca dan buat diagram batang dengan Bar Chart Reading Protocol dan Axis Scale Consistency.",
      "mechanicDescription": "Tiga ronde: baca tinggi, selisih, banding batang ganda.",
      "voiceGuide": "Pilih jawaban terkait diagram batang dan skala.",
      "emoji": "▮",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-c-c",
      "title": "Pilih Bacaan Batang",
      "bookReference": "hlm. 253–267",
      "objective": "Baca dan buat diagram batang dengan Bar Chart Reading Protocol dan Axis Scale Consistency.",
      "mechanicDescription": "Tiga ronde: baca tinggi, selisih, banding batang ganda.",
      "voiceGuide": "Pilih jawaban terkait diagram batang dan skala.",
      "emoji": "▮",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-c-c",
      "title": "Pilah Skala Benar",
      "bookReference": "hlm. 253–267",
      "objective": "Baca dan buat diagram batang dengan Bar Chart Reading Protocol dan Axis Scale Consistency.",
      "mechanicDescription": "Tiga ronde: baca tinggi, selisih, banding batang ganda.",
      "voiceGuide": "Pilih jawaban terkait diagram batang dan skala.",
      "emoji": "▮",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-c-c",
      "title": "Jodohkan Sumbu",
      "bookReference": "hlm. 253–267",
      "objective": "Baca dan buat diagram batang dengan Bar Chart Reading Protocol dan Axis Scale Consistency.",
      "mechanicDescription": "Tiga ronde: baca tinggi, selisih, banding batang ganda.",
      "voiceGuide": "Pilih jawaban terkait diagram batang dan skala.",
      "emoji": "▮",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-c-c",
      "title": "Memori Batang",
      "bookReference": "hlm. 253–267",
      "objective": "Baca dan buat diagram batang dengan Bar Chart Reading Protocol dan Axis Scale Consistency.",
      "mechanicDescription": "Tiga ronde: baca tinggi, selisih, banding batang ganda.",
      "voiceGuide": "Pilih jawaban terkait diagram batang dan skala.",
      "emoji": "▮",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-c-c",
      "title": "Ketuk Frekuensi Batang",
      "bookReference": "hlm. 253–267",
      "objective": "Baca dan buat diagram batang dengan Bar Chart Reading Protocol dan Axis Scale Consistency.",
      "mechanicDescription": "Tiga ronde: baca tinggi, selisih, banding batang ganda.",
      "voiceGuide": "Pilih jawaban terkait diagram batang dan skala.",
      "emoji": "▮",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-c-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 253–267",
      "objective": "Baca dan buat diagram batang dengan Bar Chart Reading Protocol dan Axis Scale Consistency.",
      "mechanicDescription": "Tiga ronde: baca tinggi, selisih, banding batang ganda.",
      "voiceGuide": "Pilih jawaban terkait diagram batang dan skala.",
      "emoji": "▮",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-c-c",
      "title": "Cerita Sea Games",
      "bookReference": "hlm. 253–267",
      "objective": "Baca dan buat diagram batang dengan Bar Chart Reading Protocol dan Axis Scale Consistency.",
      "mechanicDescription": "Tiga ronde: baca tinggi, selisih, banding batang ganda.",
      "voiceGuide": "Pilih jawaban terkait diagram batang dan skala.",
      "emoji": "▮",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-c-c",
      "title": "Urutkan Tinggi Batang",
      "bookReference": "hlm. 253–267",
      "objective": "Baca dan buat diagram batang dengan Bar Chart Reading Protocol dan Axis Scale Consistency.",
      "mechanicDescription": "Tiga ronde: baca tinggi, selisih, banding batang ganda.",
      "voiceGuide": "Pilih jawaban terkait diagram batang dan skala.",
      "emoji": "▮",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-c-p",
      "title": "Diagram Hitung Tinggi Batang",
      "bookReference": "hlm. 253–267",
      "objective": "Baca dan buat diagram batang dengan Bar Chart Reading Protocol dan Axis Scale Consistency.",
      "mechanicDescription": "Tiga ronde: baca tinggi, selisih, banding batang ganda.",
      "voiceGuide": "Pilih jawaban terkait diagram batang dan skala.",
      "diagramType": "hitung",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "rumus-c-p",
      "title": "Diagram Arti Skala Sumbu",
      "bookReference": "hlm. 253–267",
      "objective": "Baca dan buat diagram batang dengan Bar Chart Reading Protocol dan Axis Scale Consistency.",
      "mechanicDescription": "Tiga ronde: baca tinggi, selisih, banding batang ganda.",
      "voiceGuide": "Pilih jawaban terkait diagram batang dan skala.",
      "diagramType": "rumus",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "arti-c-p",
      "title": "Diagram Pilih Bacaan Batang",
      "bookReference": "hlm. 253–267",
      "objective": "Baca dan buat diagram batang dengan Bar Chart Reading Protocol dan Axis Scale Consistency.",
      "mechanicDescription": "Tiga ronde: baca tinggi, selisih, banding batang ganda.",
      "voiceGuide": "Pilih jawaban terkait diagram batang dan skala.",
      "diagramType": "arti",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sortir-c-p",
      "title": "Diagram Pilah Skala Benar",
      "bookReference": "hlm. 253–267",
      "objective": "Baca dan buat diagram batang dengan Bar Chart Reading Protocol dan Axis Scale Consistency.",
      "mechanicDescription": "Tiga ronde: baca tinggi, selisih, banding batang ganda.",
      "voiceGuide": "Pilih jawaban terkait diagram batang dan skala.",
      "diagramType": "sortir",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-c-p",
      "title": "Diagram Jodohkan Sumbu",
      "bookReference": "hlm. 253–267",
      "objective": "Baca dan buat diagram batang dengan Bar Chart Reading Protocol dan Axis Scale Consistency.",
      "mechanicDescription": "Tiga ronde: baca tinggi, selisih, banding batang ganda.",
      "voiceGuide": "Pilih jawaban terkait diagram batang dan skala.",
      "diagramType": "jodoh",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memori-c-p",
      "title": "Diagram Memori Batang",
      "bookReference": "hlm. 253–267",
      "objective": "Baca dan buat diagram batang dengan Bar Chart Reading Protocol dan Axis Scale Consistency.",
      "mechanicDescription": "Tiga ronde: baca tinggi, selisih, banding batang ganda.",
      "voiceGuide": "Pilih jawaban terkait diagram batang dan skala.",
      "diagramType": "memori",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-c-p",
      "title": "Diagram Ketuk Frekuensi Batang",
      "bookReference": "hlm. 253–267",
      "objective": "Baca dan buat diagram batang dengan Bar Chart Reading Protocol dan Axis Scale Consistency.",
      "mechanicDescription": "Tiga ronde: baca tinggi, selisih, banding batang ganda.",
      "voiceGuide": "Pilih jawaban terkait diagram batang dan skala.",
      "diagramType": "ketuk",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "semua-c-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 253–267",
      "objective": "Baca dan buat diagram batang dengan Bar Chart Reading Protocol dan Axis Scale Consistency.",
      "mechanicDescription": "Tiga ronde: baca tinggi, selisih, banding batang ganda.",
      "voiceGuide": "Pilih jawaban terkait diagram batang dan skala.",
      "diagramType": "semua",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "cerita-c-p",
      "title": "Diagram Cerita Sea Games",
      "bookReference": "hlm. 253–267",
      "objective": "Baca dan buat diagram batang dengan Bar Chart Reading Protocol dan Axis Scale Consistency.",
      "mechanicDescription": "Tiga ronde: baca tinggi, selisih, banding batang ganda.",
      "voiceGuide": "Pilih jawaban terkait diagram batang dan skala.",
      "diagramType": "cerita",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "urut-c-p",
      "title": "Diagram Urutkan Tinggi Batang",
      "bookReference": "hlm. 253–267",
      "objective": "Baca dan buat diagram batang dengan Bar Chart Reading Protocol dan Axis Scale Consistency.",
      "mechanicDescription": "Tiga ronde: baca tinggi, selisih, banding batang ganda.",
      "voiceGuide": "Pilih jawaban terkait diagram batang dan skala.",
      "diagramType": "urut",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-c-a",
      "title": "Tulis Hitung Tinggi Batang",
      "bookReference": "hlm. 253–267",
      "objective": "Baca dan buat diagram batang dengan Bar Chart Reading Protocol dan Axis Scale Consistency.",
      "mechanicDescription": "Tiga ronde: baca tinggi, selisih, banding batang ganda.",
      "voiceGuide": "Pilih jawaban terkait diagram batang dan skala.",
      "symbolLarge": "▮",
      "wordLarge": "DIAGRAM BATANG",
      "mathNotation": "tinggi = f"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-c-a",
      "title": "Tulis Arti Skala Sumbu",
      "bookReference": "hlm. 253–267",
      "objective": "Baca dan buat diagram batang dengan Bar Chart Reading Protocol dan Axis Scale Consistency.",
      "mechanicDescription": "Tiga ronde: baca tinggi, selisih, banding batang ganda.",
      "voiceGuide": "Pilih jawaban terkait diagram batang dan skala.",
      "symbolLarge": "▮",
      "wordLarge": "DIAGRAM BATANG",
      "mathNotation": "tinggi = f"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-c-a",
      "title": "Tulis Pilih Bacaan Batang",
      "bookReference": "hlm. 253–267",
      "objective": "Baca dan buat diagram batang dengan Bar Chart Reading Protocol dan Axis Scale Consistency.",
      "mechanicDescription": "Tiga ronde: baca tinggi, selisih, banding batang ganda.",
      "voiceGuide": "Pilih jawaban terkait diagram batang dan skala.",
      "symbolLarge": "▮",
      "wordLarge": "DIAGRAM BATANG",
      "mathNotation": "tinggi = f"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-c-a",
      "title": "Tulis Pilah Skala Benar",
      "bookReference": "hlm. 253–267",
      "objective": "Baca dan buat diagram batang dengan Bar Chart Reading Protocol dan Axis Scale Consistency.",
      "mechanicDescription": "Tiga ronde: baca tinggi, selisih, banding batang ganda.",
      "voiceGuide": "Pilih jawaban terkait diagram batang dan skala.",
      "symbolLarge": "▮",
      "wordLarge": "DIAGRAM BATANG",
      "mathNotation": "tinggi = f"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-c-a",
      "title": "Tulis Jodohkan Sumbu",
      "bookReference": "hlm. 253–267",
      "objective": "Baca dan buat diagram batang dengan Bar Chart Reading Protocol dan Axis Scale Consistency.",
      "mechanicDescription": "Tiga ronde: baca tinggi, selisih, banding batang ganda.",
      "voiceGuide": "Pilih jawaban terkait diagram batang dan skala.",
      "symbolLarge": "▮",
      "wordLarge": "DIAGRAM BATANG",
      "mathNotation": "tinggi = f"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-c-a",
      "title": "Tulis Memori Batang",
      "bookReference": "hlm. 253–267",
      "objective": "Baca dan buat diagram batang dengan Bar Chart Reading Protocol dan Axis Scale Consistency.",
      "mechanicDescription": "Tiga ronde: baca tinggi, selisih, banding batang ganda.",
      "voiceGuide": "Pilih jawaban terkait diagram batang dan skala.",
      "symbolLarge": "▮",
      "wordLarge": "DIAGRAM BATANG",
      "mathNotation": "tinggi = f"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-c",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 253–267",
      "objective": "Baca dan buat diagram batang dengan Bar Chart Reading Protocol dan Axis Scale Consistency.",
      "mechanicDescription": "Dua ronde menilai pernyataan.",
      "voiceGuide": "Benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-c",
      "title": "Detektif Data",
      "bookReference": "hlm. 253–267",
      "objective": "Baca dan buat diagram batang dengan Bar Chart Reading Protocol dan Axis Scale Consistency.",
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
      "bookReference": "hlm. 253–267",
      "objective": "Baca dan buat diagram batang dengan Bar Chart Reading Protocol dan Axis Scale Consistency.",
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
      "bookReference": "hlm. 253–267",
      "objective": "Baca dan buat diagram batang dengan Bar Chart Reading Protocol dan Axis Scale Consistency.",
      "mechanicDescription": "Tiga ronde cerita.",
      "voiceGuide": "Baca lalu pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "▮",
      "nama": "Batang",
      "isi": "Tinggi batang mewakili frekuensi kategori.",
      "suara": "Bar Chart Reading Protocol."
    },
    {
      "ikon": "📏",
      "nama": "Skala",
      "isi": "Sumbu angka teratur dan mulai dari nol (Axis Scale Consistency).",
      "suara": "Anti menipu."
    },
    {
      "ikon": "⚖️",
      "nama": "Banding",
      "isi": "Selisih dan tren dibaca dari tinggi batang; ganda pakai legenda (Comparative Bar Analysis).",
      "suara": "Sea Games & L/P."
    },
    {
      "ikon": "🔄",
      "nama": "Sajian",
      "isi": "Tabel, piktogram, dan batang menyajikan data yang sama untuk tujuan berbeda.",
      "suara": "Representation Choice."
    }
  ],
  "poinSuara": "Ingat: baca judul dan skala dulu, tinggi batang sama dengan frekuensi, bandingkan dengan selisih, jaga skala mulai dari nol.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Baca judul & skala",
        "warna": "#FDE68A"
      },
      {
        "teks": "baca tinggi batang",
        "warna": "#BBF7D0"
      },
      {
        "teks": "hitung selisih/tren",
        "warna": "#BFDBFE"
      },
      {
        "teks": "tafsir keputusan",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: buat diagram batang jumlah gelas air yang diminum keluarga selama 5 hari, tulis skala dari nol.",
  "refleksi": [
    "Mengapa sumbu skala sebaiknya mulai dari nol?",
    "Apa yang dibaca lebih dulu pada diagram batang?",
    "Kapan batang ganda lebih berguna daripada satu batang?"
  ]
};

export const SUB_BAB_K5B8: SubBabNaskah[] = [SUB_A58, SUB_B58, SUB_C58];
export const semuaAdeganK5B8 = SUB_BAB_K5B8.flatMap((s) => s.videos.flatMap((v) => v.adegan));
