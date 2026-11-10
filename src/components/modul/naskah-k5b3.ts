/**
 * Naskah Matematika Kelas 5 Bab 3 — rewrite mendalam.
 * Metode luar dianyam ke Story, peta, infografis, poin, dan meta permainan.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K5B3_META = {
  "chapterId": "k5-mat-bab3",
  "phaseCode": "FASE_C",
  "grade": 5,
  "subjectLabel": "MATEMATIKA - KELAS 5 SD",
  "title": "BAB 3: BILANGAN PECAHAN",
  "silabusElemen": "🌈 Fase C • Elemen Bilangan: Membandingkan, Mengurutkan, Penjumlahan, dan Pengurangan Pecahan (Kelas 5 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A53: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Banding Pecahan)",
  "fullTitle": "Sub-Bab A: Membandingkan dan Mengurutkan Pecahan",
  "targetDescription": "Siswa membandingkan dan mengurutkan pecahan biasa serta campuran dengan garis bilangan, pecahan senilai, dan mengubah campuran ke biasa sesuai Buku Siswa Kelas V Bab 3 Sub-Bab A.",
  "secondaryBg": "#FFEDD5",
  "secondaryBorder": "#EA580C",
  "secondaryText": "#7C2D12",
  "silabus": {
    "teksSuara": "Kita belajar membandingkan pecahan. Letakkan pecahan di garis bilangan: yang lebih kanan lebih besar. Samakan bentuk dengan pecahan senilai, dan ubah campuran menjadi biasa dulu. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa membandingkan dan mengurutkan bilangan pecahan dengan garis bilangan dan penyebut/pembilang yang tepat.",
    "referensi": "Buku Siswa Matematika Kelas V Kemendikbudristek (Bab 3: Bilangan Pecahan, Sub-Bab A hlm. 68–75)."
  },
  "videos": [
    {
      "id": "K5B3A-V1",
      "judul": "Apa Arti Pecahan",
      "subjudul": "Pecahan di Garis Bilangan",
      "adegan": [
        {
          "id": "K5B3A-V1-1",
          "judul": "Bagian keseluruhan",
          "ketukan": [
            "Bayangkan satu kue utuh. Kalau kue itu dipotong sama besar, tiap potong adalah bagian dari keseluruhan.",
            "Angka atas disebut pembilang: berapa bagian yang diambil.",
            "Angka bawah disebut penyebut: menjadi berapa bagian sama besar kue itu dipotong.",
            "Contoh satu per dua berarti satu dari dua bagian sama besar."
          ],
          "papan": [
            "kue utuh",
            "pembilang",
            "penyebut",
            "1/2"
          ]
        },
        {
          "id": "K5B3A-V1-2",
          "judul": "Biasa dan campuran",
          "ketukan": [
            "Pecahan biasa hanya punya pembilang dan penyebut, misalnya tiga per empat.",
            "Pecahan campuran punya bilangan bulat ditambah pecahan, misalnya dua tiga per empat.",
            "Campuran artinya ada beberapa utuh ditambah sisa bagian.",
            "Sebelum membandingkan, sering lebih mudah mengubah campuran menjadi pecahan biasa."
          ],
          "papan": [
            "biasa",
            "campuran",
            "utuh + sisa",
            "siap ubah"
          ]
        },
        {
          "id": "K5B3A-V1-3",
          "judul": "Jajanan dan garis",
          "ketukan": [
            "Empat potong makanan sama besar. Kamu makan dua. Itu dua per empat.",
            "Dua per empat senilai dengan satu per dua. Bagiannya sama, tulisannya beda.",
            "Bayangkan garis bilangan dari nol ke satu. Letakkan satu per dua di tengah.",
            "METODE LUAR · Pecahan di Garis Bilangan: yang lebih kanan lebih besar."
          ],
          "papan": [
            "2/4",
            "2/4 = 1/2",
            "garis",
            "kanan >"
          ]
        }
      ]
    },
    {
      "id": "K5B3A-V2",
      "judul": "Lompat Jauh Yohana",
      "subjudul": "Campuran ke Biasa",
      "adegan": [
        {
          "id": "K5B3A-V2-1",
          "judul": "Tiga lompatan",
          "ketukan": [
            "Yohana mencatat tiga lompatan: dua tiga per empat meter, tiga satu per dua meter, dan tujuh per delapan meter.",
            "Mana yang terjauh? Jangan menebak dari bentuk campuran saja.",
            "Kita samakan bentuk dulu agar adil dibandingkannya.",
            "Ubah campuran menjadi pecahan biasa."
          ],
          "papan": [
            "3 data",
            "jangan tebak",
            "samakan",
            "ke biasa"
          ]
        },
        {
          "id": "K5B3A-V2-2",
          "judul": "Ubah ke biasa",
          "ketukan": [
            "Dua tiga per empat: dua kali empat sama dengan delapan, tambah tiga, jadi sebelas per empat.",
            "Tiga satu per dua: tiga kali dua sama dengan enam, tambah satu, jadi tujuh per dua.",
            "Tujuh per delapan sudah biasa, biarkan.",
            "METODE LUAR · Campuran ke Biasa: (bulat × penyebut) + pembilang."
          ],
          "papan": [
            "11/4",
            "7/2",
            "7/8",
            "rumus ubah"
          ]
        },
        {
          "id": "K5B3A-V2-3",
          "judul": "Urut di garis",
          "ketukan": [
            "Letakkan sebelas per empat, tujuh per dua, dan tujuh per delapan di garis bilangan.",
            "Tujuh per dua sama dengan tiga setengah, paling kanan.",
            "Jadi lompatan terjauh adalah tiga satu per dua meter.",
            "METODE LUAR · Pecahan Senilai: boleh ubah bentuk tanpa mengubah nilai saat menyamakan."
          ],
          "papan": [
            "letak",
            "7/2 kanan",
            "terjauh",
            "senilai"
          ]
        }
      ]
    },
    {
      "id": "K5B3A-V3",
      "judul": "Strategi Banding",
      "subjudul": "Pecahan Senilai",
      "adegan": [
        {
          "id": "K5B3A-V3-1",
          "judul": "Pembilang sama",
          "ketukan": [
            "Satu per dua dan satu per lima. Pembilangnya sama: satu.",
            "Penyebut lebih kecil berarti tiap bagian lebih besar.",
            "Jadi satu per dua lebih besar dari satu per lima.",
            "Ingat: potongan kue jadi dua lebih besar daripada jadi lima."
          ],
          "papan": [
            "1/? ",
            "penyebut kecil",
            "1/2 > 1/5",
            "analogi kue"
          ]
        },
        {
          "id": "K5B3A-V3-2",
          "judul": "Penyebut sama",
          "ketukan": [
            "Tiga per delapan dan lima per delapan. Penyebut sama.",
            "Lihat pembilang: lima lebih besar dari tiga.",
            "Maka lima per delapan lebih besar.",
            "Kalau penyebut sama, cukup bandingkan pembilang."
          ],
          "papan": [
            " /8",
            "pembilang",
            "5/8 >",
            "aturan"
          ]
        },
        {
          "id": "K5B3A-V3-3",
          "judul": "Siap bermain",
          "ketukan": [
            "Kalau beda pembilang dan penyebut, samakan dulu dengan pecahan senilai atau garis bilangan.",
            "Campuran? Ubah ke biasa dulu.",
            "Lalu urutkan dari kecil ke besar atau sebaliknya.",
            "Ayo latih membandingkan pecahan di permainan!"
          ],
          "papan": [
            "strategi",
            "campuran dulu",
            "urut",
            "main"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Baca pecahan",
      "stepDesc": "Kenali pembilang dan penyebut.",
      "icon": "📖",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Campuran?",
      "stepDesc": "Ubah ke biasa bila perlu.",
      "icon": "🔄",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Senilai",
      "stepDesc": "Samakan penyebut dengan pecahan senilai.",
      "icon": "⚖️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Garis bilangan",
      "stepDesc": "Letakkan; kanan lebih besar.",
      "icon": "📏",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Bandingkan",
      "stepDesc": "Tulis tanda > < atau =.",
      "icon": "⇔",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Urutkan",
      "stepDesc": "Dari kecil ke besar atau sebaliknya.",
      "icon": "📶",
      "flowFrom": "5",
      "flowTo": "7"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Cek",
      "stepDesc": "Apakah posisi di garis masuk akal?",
      "icon": "✅",
      "flowFrom": "6",
      "flowTo": "8"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Main",
      "stepDesc": "Latihan Concrete sampai Abstract.",
      "icon": "🎮",
      "flowFrom": "7",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "Pembilang",
      "emoji": "⬆️",
      "countNum": 1,
      "countWord": "atas",
      "suara": "Angka atas."
    },
    {
      "judul": "Penyebut",
      "emoji": "⬇️",
      "countNum": 1,
      "countWord": "bawah",
      "suara": "Angka bawah."
    },
    {
      "judul": "Garis",
      "emoji": "📏",
      "countNum": 1,
      "countWord": "kanan>",
      "suara": "Lebih kanan lebih besar."
    },
    {
      "judul": "Senilai",
      "emoji": "⚖️",
      "countNum": 1,
      "countWord": "sama nilai",
      "suara": "Bentuk beda nilai sama."
    },
    {
      "judul": "Campuran",
      "emoji": "🔄",
      "countNum": 1,
      "countWord": "ke biasa",
      "suara": "(bulat×q)+p."
    },
    {
      "judul": "1/2 vs 1/5",
      "emoji": "🍰",
      "countNum": 1,
      "countWord": "1/2>",
      "suara": "Pembilang sama."
    },
    {
      "judul": "3/8 vs 5/8",
      "emoji": "📊",
      "countNum": 1,
      "countWord": "5/8>",
      "suara": "Penyebut sama."
    },
    {
      "judul": "Yohana",
      "emoji": "🏃",
      "countNum": 1,
      "countWord": "3 1/2",
      "suara": "Terjauh."
    },
    {
      "judul": "2/4",
      "emoji": "✂️",
      "countNum": 1,
      "countWord": "=1/2",
      "suara": "Senilai."
    },
    {
      "judul": "Siap B",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "jumlah",
      "suara": "Lanjut penjumlahan."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "banding-pecahan",
      "title": "Bandingkan Pecahan",
      "bookReference": "hlm. 68–75",
      "objective": "Bandingkan posisi di garis. Membandingkan dua pecahan.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pecahan di Garis Bilangan: Yang kanan lebih besar.",
      "voiceGuide": "Pecahan di Garis Bilangan. Yang kanan lebih besar.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "campuran-biasa",
      "title": "Campuran ke Biasa",
      "bookReference": "hlm. 71–72",
      "objective": "Bandingkan posisi di garis. Mengubah bentuk.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pecahan di Garis Bilangan: Yang kanan lebih besar.",
      "voiceGuide": "Pecahan di Garis Bilangan. Yang kanan lebih besar.",
      "emoji": "🔄",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-pecahan",
      "title": "Arti Pecahan",
      "bookReference": "hlm. 66–68",
      "objective": "Bandingkan posisi di garis. Definisi.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pecahan di Garis Bilangan: Yang kanan lebih besar.",
      "voiceGuide": "Pecahan di Garis Bilangan. Yang kanan lebih besar.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-banding",
      "title": "Pilah Besar/Kecil",
      "bookReference": "hlm. 68–70",
      "objective": "Bandingkan posisi di garis. Memilah.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pecahan di Garis Bilangan: Yang kanan lebih besar.",
      "voiceGuide": "Pecahan di Garis Bilangan. Yang kanan lebih besar.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-banding",
      "title": "Jodohkan Pecahan",
      "bookReference": "hlm. 68–75",
      "objective": "Menjodohkan. (Pecahan di Garis Bilangan)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pecahan di Garis Bilangan. Mainkan dengan teliti.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-banding",
      "title": "Memori Pecahan",
      "bookReference": "hlm. 68–75",
      "objective": "Memori. (Pecahan di Garis Bilangan)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pecahan di Garis Bilangan. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-pecahan",
      "title": "Ketuk Pecahan",
      "bookReference": "hlm. 68–75",
      "objective": "Mengetuk. (Pecahan di Garis Bilangan)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pecahan di Garis Bilangan. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-banding",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 68–75",
      "objective": "Ketuk semua. (Pecahan di Garis Bilangan)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pecahan di Garis Bilangan. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-banding",
      "title": "Cerita Lompat & Wingko",
      "bookReference": "hlm. 68–75",
      "objective": "Soal cerita. (Pecahan di Garis Bilangan)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pecahan di Garis Bilangan. Mainkan dengan teliti.",
      "emoji": "🏃",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-pecahan",
      "title": "Urutkan Pecahan",
      "bookReference": "hlm. 71–75",
      "objective": "Mengurutkan. (Pecahan di Garis Bilangan)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pecahan di Garis Bilangan. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "diagram-banding",
      "title": "Diagram Banding",
      "bookReference": "hlm. 68–70",
      "objective": "Ubah campuran dulu. Baca tanda.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Campuran ke Biasa: (bulat kali penyebut) plus pembilang.",
      "voiceGuide": "Campuran ke Biasa. (bulat kali penyebut) plus pembilang.",
      "diagramType": "compare",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "diagram-campuran",
      "title": "Diagram Campuran",
      "bookReference": "hlm. 71–72",
      "objective": "Ubah campuran dulu. Ubah bentuk.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Campuran ke Biasa: (bulat kali penyebut) plus pembilang.",
      "voiceGuide": "Campuran ke Biasa. (bulat kali penyebut) plus pembilang.",
      "diagramType": "mixed",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-a",
      "title": "Jodohkan Diagram A",
      "bookReference": "hlm. 68–75",
      "objective": "Ubah campuran dulu. Jodohkan.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Campuran ke Biasa: (bulat kali penyebut) plus pembilang.",
      "voiceGuide": "Campuran ke Biasa. (bulat kali penyebut) plus pembilang.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-a",
      "title": "Memori Diagram A",
      "bookReference": "hlm. 68–75",
      "objective": "Ubah campuran dulu. Memori.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Campuran ke Biasa: (bulat kali penyebut) plus pembilang.",
      "voiceGuide": "Campuran ke Biasa. (bulat kali penyebut) plus pembilang.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-a",
      "title": "Tabel Banding",
      "bookReference": "hlm. 68–75",
      "objective": "Isi tabel. (Campuran ke Biasa)",
      "mechanicDescription": "Tiga tabel.",
      "voiceGuide": "Campuran ke Biasa. Mainkan dengan teliti.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-pa",
      "title": "Ketuk Semua Diagram A",
      "bookReference": "hlm. 68–75",
      "objective": "Ketuk semua. (Campuran ke Biasa)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Campuran ke Biasa. Mainkan dengan teliti.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-a",
      "title": "Pilah Diagram A",
      "bookReference": "hlm. 68–70",
      "objective": "Pilah. (Campuran ke Biasa)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Campuran ke Biasa. Mainkan dengan teliti.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "choose-a",
      "title": "Pilih Pernyataan A",
      "bookReference": "hlm. 66–75",
      "objective": "Pilih. (Campuran ke Biasa)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Campuran ke Biasa. Mainkan dengan teliti.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jenis-pa",
      "title": "Pilih Arti Diagram A",
      "bookReference": "hlm. 66–68",
      "objective": "Definisi. (Campuran ke Biasa)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Campuran ke Biasa. Mainkan dengan teliti.",
      "diagramType": "def",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-a",
      "title": "Cerita Diagram A",
      "bookReference": "hlm. 68–75",
      "objective": "Cerita. (Campuran ke Biasa)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Campuran ke Biasa. Mainkan dengan teliti.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-banding",
      "title": "Tulis Tanda Banding",
      "bookReference": "hlm. 68–75",
      "objective": "Samakan penyebut. Menulis tanda.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pecahan Senilai: Nilai tetap sama.",
      "voiceGuide": "Pecahan Senilai. Nilai tetap sama.",
      "symbolLarge": "≷",
      "wordLarge": "TANDA",
      "mathNotation": "banding"
    },
    {
      "stage": "Abstract",
      "gameType": "write-campuran",
      "title": "Tulis Bentuk Biasa",
      "bookReference": "hlm. 71–72",
      "objective": "Samakan penyebut. Menulis.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pecahan Senilai: Nilai tetap sama.",
      "voiceGuide": "Pecahan Senilai. Nilai tetap sama.",
      "symbolLarge": "a b/c",
      "wordLarge": "BIASA",
      "mathNotation": "campuran"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-def-a",
      "title": "Pilih Definisi A",
      "bookReference": "hlm. 66–68",
      "objective": "Samakan penyebut. Definisi.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pecahan Senilai: Nilai tetap sama.",
      "voiceGuide": "Pecahan Senilai. Nilai tetap sama.",
      "symbolLarge": "p/q",
      "wordLarge": "DEFINISI",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-a",
      "title": "Urutkan Abstrak A",
      "bookReference": "hlm. 71–75",
      "objective": "Samakan penyebut. Urut.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pecahan Senilai: Nilai tetap sama.",
      "voiceGuide": "Pecahan Senilai. Nilai tetap sama.",
      "symbolLarge": "naik",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-a",
      "title": "Jodohkan Notasi A",
      "bookReference": "hlm. 68–75",
      "objective": "Jodohkan. (Pecahan Senilai)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pecahan Senilai. Mainkan dengan teliti.",
      "symbolLarge": "p/q",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-a",
      "title": "Memori Notasi A",
      "bookReference": "hlm. 68–75",
      "objective": "Memori. (Pecahan Senilai)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pecahan Senilai. Mainkan dengan teliti.",
      "symbolLarge": "p/q",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-a",
      "title": "Benar atau Salah: Banding",
      "bookReference": "hlm. 68–75",
      "objective": "Menilai. (Pecahan Senilai)",
      "mechanicDescription": "Dua ronde.",
      "voiceGuide": "Pecahan Senilai. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-a",
      "title": "Detektif Pecahan",
      "bookReference": "hlm. 68–75",
      "objective": "Petunjuk. (Pecahan Senilai)",
      "mechanicDescription": "Tiga soal.",
      "voiceGuide": "Pecahan Senilai. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-a",
      "title": "Peta Konsep Banding",
      "bookReference": "hlm. 68–75",
      "objective": "Peta. (Pecahan Senilai)",
      "mechanicDescription": "Satu peta.",
      "voiceGuide": "Pecahan Senilai. Mainkan dengan teliti.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-a",
      "title": "Cerita Angka Banding",
      "bookReference": "hlm. 68–75",
      "objective": "Cerita. (Pecahan Senilai)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Pecahan Senilai. Mainkan dengan teliti.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "📏",
      "nama": "Garis bilangan",
      "isi": "Posisi di garis menentukan mana yang lebih besar.",
      "suara": "Kanan lebih besar."
    },
    {
      "ikon": "🔄",
      "nama": "Campuran ke biasa",
      "isi": "Ubah campuran sebelum membandingkan.",
      "suara": "(bulat×q)+p."
    },
    {
      "ikon": "⚖️",
      "nama": "Senilai",
      "isi": "Samakan penyebut tanpa mengubah nilai.",
      "suara": "Pecahan senilai."
    },
    {
      "ikon": "👀",
      "nama": "Aturan cepat",
      "isi": "Pembilang sama: lihat penyebut. Penyebut sama: lihat pembilang.",
      "suara": "Aturan cepat."
    }
  ],
  "poinSuara": "Ingat garis bilangan, campuran ke biasa, dan pecahan senilai.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Kenali bentuk",
        "warna": "#FDE68A"
      },
      {
        "teks": "ubah campuran",
        "warna": "#BBF7D0"
      },
      {
        "teks": "pilih strategi",
        "warna": "#BFDBFE"
      },
      {
        "teks": "beri tanda/urut",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba: terapkan Pecahan di Garis Bilangan pada satu soal di rumah.",
  "refleksi": [
    "Bagaimana Pecahan di Garis Bilangan membantumu?",
    "Kapan memakai Pecahan Senilai?",
    "Apa bedanya dengan hanya menghafal rumus?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Number Line Fractions",
      "namaId": "Pecahan di Garis Bilangan",
      "asal": "NCTM / pengukuran relatif",
      "ringkas": "Bandingkan pecahan dengan melihat posisi di garis; yang lebih kanan lebih besar.",
      "tahap": [
        "Story",
        "Mind",
        "Picture",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Equivalent Fractions",
      "namaId": "Pecahan Senilai",
      "asal": "Singapore Math",
      "ringkas": "Pecahan senilai menunjuk bagian sama meski tulisannya beda; dipakai untuk menyamakan penyebut.",
      "tahap": [
        "Story",
        "Infografis",
        "Concrete"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Mixed to Improper",
      "namaId": "Campuran ke Biasa",
      "asal": "Common core fraction progression",
      "ringkas": "Ubah campuran ke biasa: (bulat × penyebut) + pembilang, lalu bandingkan.",
      "tahap": [
        "Story",
        "Mind",
        "Abstract"
      ]
    }
  ]
};

export const SUB_B53: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Jumlah Pecahan)",
  "fullTitle": "Sub-Bab B: Penjumlahan Bilangan Pecahan",
  "targetDescription": "Siswa menjumlahkan pecahan dengan penyebut sama maupun berbeda dengan menyamakan penyebut memakai KPK, serta memakai model arsir daerah sesuai Buku Siswa Kelas V Bab 3 Sub-Bab B.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Kita belajar menjumlahkan pecahan. Jika penyebut sama, jumlahkan pembilang. Jika beda, samakan penyebut dengan KPK dulu. Boleh juga mengarsir daerah untuk melihat hasilnya. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menjumlahkan bilangan pecahan dengan penyebut sama atau berbeda.",
    "referensi": "Buku Siswa Matematika Kelas V Kemendikbudristek (Bab 3 Sub-Bab B)."
  },
  "videos": [
    {
      "id": "K5B3B-V1",
      "judul": "Penyebut Sama",
      "subjudul": "Jumlah Penyebut Sama",
      "adegan": [
        {
          "id": "K5B3B-V1-1",
          "judul": "Aturan dasar",
          "ketukan": [
            "Kalau penyebut sama, kita menjumlahkan bagian yang seukuran.",
            "Jumlahkan hanya pembilangnya. Penyebut tetap.",
            "Contoh: dua per tujuh tambah tiga per tujuh sama dengan lima per tujuh.",
            "METODE LUAR · Jumlah Penyebut Sama: pembilang dijumlah, penyebut tetap."
          ],
          "papan": [
            "seukuran",
            "p+p / q",
            "2/7+3/7",
            "aturan"
          ]
        },
        {
          "id": "K5B3B-V1-2",
          "judul": "Gambar batang",
          "ketukan": [
            "Gambar batang dibagi tujuh. Arsir dua, lalu arsir tiga lagi.",
            "Total arsir menjadi lima dari tujuh.",
            "Itulah model arsir daerah untuk penjumlahan.",
            "Visual membantu sebelum menulis rumus."
          ],
          "papan": [
            "arsir",
            "5/7",
            "model",
            "lihat dulu"
          ]
        },
        {
          "id": "K5B3B-V1-3",
          "judul": "Cek hasil",
          "ketukan": [
            "Hasil tidak boleh melebihi masuk akal: dua per tujuh tambah tiga per tujuh kurang dari satu.",
            "Sederhanakan jika bisa.",
            "Lalu siap untuk penyebut berbeda.",
            "Ayo lanjut."
          ],
          "papan": [
            "<1",
            "sederhana",
            "lanjut",
            "ayo"
          ]
        }
      ]
    },
    {
      "id": "K5B3B-V2",
      "judul": "Penyebut Beda",
      "subjudul": "Samakan dengan KPK",
      "adegan": [
        {
          "id": "K5B3B-V2-1",
          "judul": "Masalah",
          "ketukan": [
            "Satu per dua tambah satu per tiga. Penyebut beda: tidak bisa langsung jumlahkan pembilang.",
            "Kita butuh penyebut sama dulu.",
            "Cari KPK dari dua dan tiga.",
            "KPK dua dan tiga adalah enam."
          ],
          "papan": [
            "1/2+1/3",
            "samakan",
            "KPK",
            "KPK=6"
          ]
        },
        {
          "id": "K5B3B-V2-2",
          "judul": "Senilai lalu jumlah",
          "ketukan": [
            "Satu per dua senilai tiga per enam.",
            "Satu per tiga senilai dua per enam.",
            "Jumlah: lima per enam.",
            "METODE LUAR · Samakan Penyebut dengan KPK: senilai dulu, baru jumlah."
          ],
          "papan": [
            "3/6",
            "2/6",
            "5/6",
            "KPK way"
          ]
        },
        {
          "id": "K5B3B-V2-3",
          "judul": "Campuran",
          "ketukan": [
            "Jika ada campuran, ubah ke biasa dulu, lalu samakan penyebut.",
            "Jangan jumlahkan bilangan bulat saja lalu mengabaikan pecahannya.",
            "Kerjakan urut: ubah, samakan, jumlahkan, sederhanakan.",
            "Siap bermain menjumlah pecahan."
          ],
          "papan": [
            "campuran",
            "jangan",
            "urut",
            "main"
          ]
        }
      ]
    },
    {
      "id": "K5B3B-V3",
      "judul": "Arsir dan Cek",
      "subjudul": "Model Arsir Daerah",
      "adegan": [
        {
          "id": "K5B3B-V3-1",
          "judul": "Arsir",
          "ketukan": [
            "Gambar dua bangun sama. Arsir bagian pertama dan kedua.",
            "Gabungkan arsir secara mental atau pada satu bangun berpenyebut sama.",
            "Hitung berapa bagian terarsir dari keseluruhan.",
            "METODE LUAR · Model Arsir Daerah: lihat dulu, tulis kemudian."
          ],
          "papan": [
            "dua bangun",
            "gabung",
            "hitung",
            "visual"
          ]
        },
        {
          "id": "K5B3B-V3-2",
          "judul": "Kesalahan umum",
          "ketukan": [
            "Kesalahan: menjumlahkan penyebut juga. Itu salah.",
            "Kesalahan: menjumlah tanpa menyamakan penyebut.",
            "Cek dengan perkiraan: setengah tambah sepertiga agak kurang dari satu.",
            "Lima per enam masuk akal."
          ],
          "papan": [
            "jangan q+q",
            "jangan buru",
            "perkiraan",
            "5/6 ok"
          ]
        },
        {
          "id": "K5B3B-V3-3",
          "judul": "Siap C",
          "ketukan": [
            "Penjumlahan pecahan siap. Berikutnya pengurangan.",
            "Ide dasarnya sama: samakan penyebut.",
            "Bedanya: kurangkan pembilang, bukan jumlahkan.",
            "Ayo main dulu!"
          ],
          "papan": [
            "lanjut C",
            "sama ide",
            "beda",
            "main"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Lihat penyebut",
      "stepDesc": "Sama atau beda?",
      "icon": "👀",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Sama?",
      "stepDesc": "Jumlahkan pembilang.",
      "icon": "➕",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Beda?",
      "stepDesc": "Cari KPK penyebut.",
      "icon": "🔢",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Senilai",
      "stepDesc": "Ubah ke penyebut KPK.",
      "icon": "⚖️",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Jumlahkan",
      "stepDesc": "Pembilang + pembilang.",
      "icon": "➕",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Sederhanakan",
      "stepDesc": "Jika bisa.",
      "icon": "✨",
      "flowFrom": "5",
      "flowTo": "7"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Arsir cek",
      "stepDesc": "Cek dengan model daerah.",
      "icon": "🎨",
      "flowFrom": "6",
      "flowTo": "8"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Main",
      "stepDesc": "Latihan jumlah pecahan.",
      "icon": "🎮",
      "flowFrom": "7",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "Penyebut sama",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "p+p",
      "suara": "Pembilang dijumlah."
    },
    {
      "judul": "2/7+3/7",
      "emoji": "🔢",
      "countNum": 5,
      "countWord": "5/7",
      "suara": "Contoh."
    },
    {
      "judul": "KPK",
      "emoji": "🎯",
      "countNum": 1,
      "countWord": "samakan",
      "suara": "Penyebut beda."
    },
    {
      "judul": "1/2+1/3",
      "emoji": "➕",
      "countNum": 5,
      "countWord": "5/6",
      "suara": "Lewat 6."
    },
    {
      "judul": "Arsir",
      "emoji": "🎨",
      "countNum": 1,
      "countWord": "lihat",
      "suara": "Model daerah."
    },
    {
      "judul": "Jangan",
      "emoji": "🚫",
      "countNum": 1,
      "countWord": "q+q",
      "suara": "Jangan jumlah penyebut."
    },
    {
      "judul": "Campuran",
      "emoji": "🔄",
      "countNum": 1,
      "countWord": "ke biasa",
      "suara": "Ubah dulu."
    },
    {
      "judul": "Sederhana",
      "emoji": "✨",
      "countNum": 1,
      "countWord": "ringkas",
      "suara": "Jika bisa."
    },
    {
      "judul": "Perkiraan",
      "emoji": "📏",
      "countNum": 1,
      "countWord": "cek",
      "suara": "Masuk akal?"
    },
    {
      "judul": "Siap C",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "kurang",
      "suara": "Pengurangan."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "jumlah-sama",
      "title": "Jumlah Penyebut Sama",
      "bookReference": "hlm. 76–80",
      "objective": "Jumlahkan pembilang. Menjumlahkan.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Jumlah Penyebut Sama: Penyebut tetap.",
      "voiceGuide": "Jumlah Penyebut Sama. Penyebut tetap.",
      "emoji": "➕",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jumlah-beda",
      "title": "Jumlah Penyebut Beda",
      "bookReference": "hlm. 85–90",
      "objective": "Jumlahkan pembilang. Pakai KPK.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Jumlah Penyebut Sama: Penyebut tetap.",
      "voiceGuide": "Jumlah Penyebut Sama. Penyebut tetap.",
      "emoji": "🧮",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-jumlah",
      "title": "Arti Penjumlahan",
      "bookReference": "hlm. 76–90",
      "objective": "Jumlahkan pembilang. Definisi & cara.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Jumlah Penyebut Sama: Penyebut tetap.",
      "voiceGuide": "Jumlah Penyebut Sama. Penyebut tetap.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-jumlah",
      "title": "Pilah Sama/Beda",
      "bookReference": "hlm. 76–90",
      "objective": "Jumlahkan pembilang. Memilah.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Jumlah Penyebut Sama: Penyebut tetap.",
      "voiceGuide": "Jumlah Penyebut Sama. Penyebut tetap.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-jumlah",
      "title": "Jodohkan Jumlah",
      "bookReference": "hlm. 76–90",
      "objective": "Menjodohkan. (Jumlah Penyebut Sama)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jumlah Penyebut Sama. Mainkan dengan teliti.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-jumlah",
      "title": "Memori Jumlah",
      "bookReference": "hlm. 76–90",
      "objective": "Memori. (Jumlah Penyebut Sama)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jumlah Penyebut Sama. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-jumlah",
      "title": "Ketuk Hasil Jumlah",
      "bookReference": "hlm. 76–90",
      "objective": "Mengetuk. (Jumlah Penyebut Sama)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jumlah Penyebut Sama. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-jumlah",
      "title": "Ketuk Semua Benar Jumlah",
      "bookReference": "hlm. 76–90",
      "objective": "Ketuk semua. (Jumlah Penyebut Sama)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jumlah Penyebut Sama. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-jumlah",
      "title": "Cerita Martabak & Wingko",
      "bookReference": "hlm. 76–90",
      "objective": "Soal cerita. (Jumlah Penyebut Sama)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jumlah Penyebut Sama. Mainkan dengan teliti.",
      "emoji": "🥞",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-jumlah",
      "title": "Urutkan Hasil Jumlah",
      "bookReference": "hlm. 76–90",
      "objective": "Mengurutkan. (Jumlah Penyebut Sama)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Jumlah Penyebut Sama. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "diagram-sama-b",
      "title": "Diagram Penyebut Sama",
      "bookReference": "hlm. 76–80",
      "objective": "Cari KPK dulu. Baca jumlah.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Samakan Penyebut dengan KPK: Lalu pecahan senilai.",
      "voiceGuide": "Samakan Penyebut dengan KPK. Lalu pecahan senilai.",
      "diagramType": "same",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "diagram-beda-b",
      "title": "Diagram Penyebut Beda",
      "bookReference": "hlm. 85–90",
      "objective": "Cari KPK dulu. Baca KPK.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Samakan Penyebut dengan KPK: Lalu pecahan senilai.",
      "voiceGuide": "Samakan Penyebut dengan KPK. Lalu pecahan senilai.",
      "diagramType": "diff",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-b",
      "title": "Jodohkan Diagram B",
      "bookReference": "hlm. 76–90",
      "objective": "Cari KPK dulu. Jodohkan.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Samakan Penyebut dengan KPK: Lalu pecahan senilai.",
      "voiceGuide": "Samakan Penyebut dengan KPK. Lalu pecahan senilai.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-b",
      "title": "Memori Diagram B",
      "bookReference": "hlm. 76–90",
      "objective": "Cari KPK dulu. Memori.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Samakan Penyebut dengan KPK: Lalu pecahan senilai.",
      "voiceGuide": "Samakan Penyebut dengan KPK. Lalu pecahan senilai.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-b",
      "title": "Tabel Jumlah",
      "bookReference": "hlm. 76–90",
      "objective": "Isi tabel. (Samakan Penyebut dengan KPK)",
      "mechanicDescription": "Tiga tabel.",
      "voiceGuide": "Samakan Penyebut dengan KPK. Mainkan dengan teliti.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-pb",
      "title": "Ketuk Semua Diagram B",
      "bookReference": "hlm. 76–90",
      "objective": "Ketuk semua. (Samakan Penyebut dengan KPK)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Samakan Penyebut dengan KPK. Mainkan dengan teliti.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-b",
      "title": "Pilah Diagram B",
      "bookReference": "hlm. 76–90",
      "objective": "Pilah. (Samakan Penyebut dengan KPK)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Samakan Penyebut dengan KPK. Mainkan dengan teliti.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "choose-b",
      "title": "Pilih Pernyataan B",
      "bookReference": "hlm. 76–90",
      "objective": "Pilih. (Samakan Penyebut dengan KPK)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Samakan Penyebut dengan KPK. Mainkan dengan teliti.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jenis-pb",
      "title": "Pilih Arti Diagram B",
      "bookReference": "hlm. 76–90",
      "objective": "Definisi. (Samakan Penyebut dengan KPK)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Samakan Penyebut dengan KPK. Mainkan dengan teliti.",
      "diagramType": "def",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-b",
      "title": "Cerita Diagram B",
      "bookReference": "hlm. 76–90",
      "objective": "Cerita. (Samakan Penyebut dengan KPK)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Samakan Penyebut dengan KPK. Mainkan dengan teliti.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-sama-b",
      "title": "Tulis Jumlah Sama",
      "bookReference": "hlm. 76–80",
      "objective": "Lihat arsir. Menulis.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Model Arsir Daerah: Baru tulis hasil.",
      "voiceGuide": "Model Arsir Daerah. Baru tulis hasil.",
      "symbolLarge": "+",
      "wordLarge": "SAMA",
      "mathNotation": "p/q"
    },
    {
      "stage": "Abstract",
      "gameType": "write-beda-b",
      "title": "Tulis Jumlah Beda",
      "bookReference": "hlm. 85–90",
      "objective": "Lihat arsir. Menulis.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Model Arsir Daerah: Baru tulis hasil.",
      "voiceGuide": "Model Arsir Daerah. Baru tulis hasil.",
      "symbolLarge": "KPK+",
      "wordLarge": "BEDA",
      "mathNotation": "p/q"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-def-b",
      "title": "Pilih Definisi B",
      "bookReference": "hlm. 76–90",
      "objective": "Lihat arsir. Definisi.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Model Arsir Daerah: Baru tulis hasil.",
      "voiceGuide": "Model Arsir Daerah. Baru tulis hasil.",
      "symbolLarge": "Σ",
      "wordLarge": "DEFINISI",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-b",
      "title": "Urutkan Abstrak B",
      "bookReference": "hlm. 76–90",
      "objective": "Lihat arsir. Urut.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Model Arsir Daerah: Baru tulis hasil.",
      "voiceGuide": "Model Arsir Daerah. Baru tulis hasil.",
      "symbolLarge": "naik",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-b",
      "title": "Jodohkan Notasi B",
      "bookReference": "hlm. 76–90",
      "objective": "Jodohkan. (Model Arsir Daerah)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Model Arsir Daerah. Mainkan dengan teliti.",
      "symbolLarge": "+",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-b",
      "title": "Memori Notasi B",
      "bookReference": "hlm. 76–90",
      "objective": "Memori. (Model Arsir Daerah)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Model Arsir Daerah. Mainkan dengan teliti.",
      "symbolLarge": "+",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-b",
      "title": "Benar atau Salah: Jumlah",
      "bookReference": "hlm. 76–90",
      "objective": "Menilai. (Model Arsir Daerah)",
      "mechanicDescription": "Dua ronde.",
      "voiceGuide": "Model Arsir Daerah. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-b",
      "title": "Detektif Jumlah",
      "bookReference": "hlm. 76–90",
      "objective": "Petunjuk. (Model Arsir Daerah)",
      "mechanicDescription": "Tiga soal.",
      "voiceGuide": "Model Arsir Daerah. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-b",
      "title": "Peta Konsep Jumlah",
      "bookReference": "hlm. 76–90",
      "objective": "Peta. (Model Arsir Daerah)",
      "mechanicDescription": "Satu peta.",
      "voiceGuide": "Model Arsir Daerah. Mainkan dengan teliti.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-b",
      "title": "Cerita Angka Jumlah",
      "bookReference": "hlm. 76–90",
      "objective": "Cerita. (Model Arsir Daerah)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Model Arsir Daerah. Mainkan dengan teliti.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "➕",
      "nama": "Penyebut sama",
      "isi": "Jumlahkan pembilang; penyebut tetap.",
      "suara": "p+p atas q."
    },
    {
      "ikon": "🔢",
      "nama": "KPK",
      "isi": "Penyebut beda: samakan dengan KPK dulu.",
      "suara": "KPK dulu."
    },
    {
      "ikon": "🎨",
      "nama": "Arsir",
      "isi": "Model daerah membantu melihat hasil.",
      "suara": "Lihat dulu."
    },
    {
      "ikon": "🚫",
      "nama": "Jangan",
      "isi": "Jangan menjumlahkan penyebut.",
      "suara": "Bukan q+q."
    }
  ],
  "poinSuara": "Penyebut sama langsung jumlah; beda pakai KPK; cek dengan arsir.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Cek penyebut",
        "warna": "#FDE68A"
      },
      {
        "teks": "KPK jika beda",
        "warna": "#BBF7D0"
      },
      {
        "teks": "jumlahkan pembilang",
        "warna": "#BFDBFE"
      },
      {
        "teks": "sederhanakan",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba: terapkan Jumlah Penyebut Sama pada satu soal di rumah.",
  "refleksi": [
    "Bagaimana Jumlah Penyebut Sama membantumu?",
    "Kapan memakai Samakan Penyebut dengan KPK?",
    "Apa bedanya dengan hanya menghafal rumus?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Like Denominators",
      "namaId": "Jumlah Penyebut Sama",
      "asal": "Fraction operations",
      "ringkas": "Penyebut sama: jumlahkan pembilang, penyebut tetap.",
      "tahap": [
        "Story",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Common Denominator via LCM",
      "namaId": "Samakan Penyebut dengan KPK",
      "asal": "Singapore / US textbooks",
      "ringkas": "Penyebut beda: cari KPK, buat pecahan senilai, baru jumlahkan.",
      "tahap": [
        "Story",
        "Mind",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Area Model",
      "namaId": "Model Arsir Daerah",
      "asal": "Visual fraction models",
      "ringkas": "Arsir bagian pada bangun untuk melihat penjumlahan pecahan.",
      "tahap": [
        "Story",
        "Infografis",
        "Concrete"
      ]
    }
  ]
};

export const SUB_C53: SubBabNaskah = {
  "id": "C",
  "codeTitle": "Sub-Bab C (Kurang Pecahan)",
  "fullTitle": "Sub-Bab C: Pengurangan Bilangan Pecahan",
  "targetDescription": "Siswa mengurangkan pecahan dengan penyebut sama maupun berbeda memakai KPK dan model sisa daerah sesuai Buku Siswa Kelas V Bab 3 Sub-Bab C.",
  "secondaryBg": "#FCE7F3",
  "secondaryBorder": "#DB2777",
  "secondaryText": "#9D174D",
  "silabus": {
    "teksSuara": "Kita belajar mengurangkan pecahan. Ide sama dengan penjumlahan: samakan penyebut dulu. Lalu kurangkan pembilang. Model sisa daerah membantu melihat berapa yang tersisa. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa mengurangkan bilangan pecahan dengan penyebut sama atau berbeda.",
    "referensi": "Buku Siswa Matematika Kelas V Kemendikbudristek (Bab 3 Sub-Bab C)."
  },
  "videos": [
    {
      "id": "K5B3C-V1",
      "judul": "Kurang Penyebut Sama",
      "subjudul": "Kurang Penyebut Sama",
      "adegan": [
        {
          "id": "K5B3C-V1-1",
          "judul": "Aturan",
          "ketukan": [
            "Lima per delapan kurang dua per delapan. Penyebut sama.",
            "Kurangkan pembilang: lima kurang dua sama dengan tiga. Penyebut tetap delapan.",
            "METODE LUAR · Kurang Penyebut Sama: hanya pembilang yang dikurangi.",
            "Hasil tiga per delapan."
          ],
          "papan": [
            "5/8-2/8",
            "3/8",
            "aturan",
            "hasil"
          ]
        },
        {
          "id": "K5B3C-V1-2",
          "judul": "Sisa daerah",
          "ketukan": [
            "Arsir lima kotak dari delapan. Hapus dua kotak.",
            "Sisa tiga kotak. Itulah model sisa daerah.",
            "Visual menegaskan hasil pengurangan.",
            "Pakai cara ini bila ragu."
          ],
          "papan": [
            "arsir-hapus",
            "sisa",
            "lihat",
            "bila ragu"
          ]
        },
        {
          "id": "K5B3C-V1-3",
          "judul": "Cek",
          "ketukan": [
            "Hasil harus lebih kecil dari pecahan awal.",
            "Sederhanakan jika bisa.",
            "Siap untuk penyebut berbeda.",
            "Ayo."
          ],
          "papan": [
            "lebih kecil",
            "sederhana",
            "lanjut",
            "ayo"
          ]
        }
      ]
    },
    {
      "id": "K5B3C-V2",
      "judul": "Kurang Penyebut Beda",
      "subjudul": "Kurang dengan KPK",
      "adegan": [
        {
          "id": "K5B3C-V2-1",
          "judul": "Masalah",
          "ketukan": [
            "Tiga per empat kurang satu per enam. Penyebut beda.",
            "Cari KPK empat dan enam: dua belas.",
            "Tiga per empat senilai sembilan per dua belas.",
            "Satu per enam senilai dua per dua belas."
          ],
          "papan": [
            "3/4-1/6",
            "KPK=12",
            "9/12",
            "2/12"
          ]
        },
        {
          "id": "K5B3C-V2-2",
          "judul": "Kurangkan",
          "ketukan": [
            "Sembilan per dua belas kurang dua per dua belas sama dengan tujuh per dua belas.",
            "METODE LUAR · Kurang dengan KPK: samakan dulu, baru kurangi pembilang.",
            "Jangan kurangkan penyebut.",
            "Sederhanakan bila mungkin."
          ],
          "papan": [
            "7/12",
            "KPK",
            "jangan",
            "cek"
          ]
        },
        {
          "id": "K5B3C-V2-3",
          "judul": "Campuran",
          "ketukan": [
            "Campuran? Ubah ke biasa atau kurangkan bilangan bulat dan pecahan dengan hati-hati.",
            "Urutan aman: ubah, samakan, kurangkan, sederhanakan.",
            "Perkiraan: tiga per empat kurang sedikit masih lebih dari setengah.",
            "Tujuh per dua belas perlu dicek — tunggu, tiga per empat adalah sembilan per dua belas, hasil tujuh per dua belas masuk akal."
          ],
          "papan": [
            "campuran",
            "urut",
            "perkiraan",
            "ok"
          ]
        }
      ]
    },
    {
      "id": "K5B3C-V3",
      "judul": "Sisa dan Rangkum",
      "subjudul": "Model Sisa Daerah",
      "adegan": [
        {
          "id": "K5B3C-V3-1",
          "judul": "Model sisa",
          "ketukan": [
            "Arsir pecahan pertama pada bangun berpenyebut sama.",
            "Hapus atau coret bagian yang dikurangi.",
            "Sisa arsir adalah hasil.",
            "METODE LUAR · Model Sisa Daerah: lihat sisa, jangan hanya hafal rumus."
          ],
          "papan": [
            "arsir awal",
            "hapus",
            "sisa=hasil",
            "visual"
          ]
        },
        {
          "id": "K5B3C-V3-2",
          "judul": "Rangkum Bab 3",
          "ketukan": [
            "Bab 3: bandingkan, jumlahkan, kurangkan pecahan.",
            "Senjata utama: garis bilangan, senilai, KPK, model daerah.",
            "Selalu cek masuk akal.",
            "Siap permainan terakhir Sub-Bab C."
          ],
          "papan": [
            "rangkum",
            "senjata",
            "cek",
            "main"
          ]
        },
        {
          "id": "K5B3C-V3-3",
          "judul": "Tutup",
          "ketukan": [
            "Kamu sudah memakai metode luar di cerita, bukan hanya di label silabus.",
            "Ulangi peta pikiran bila perlu.",
            "Selesaikan permainan Concrete sampai Abstract.",
            "Hebat: pecahan Bab 3 siap dikuasai lewat bermain."
          ],
          "papan": [
            "metode hidup",
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
      "stepTitle": "1. Lihat penyebut",
      "stepDesc": "Sama atau beda?",
      "icon": "👀",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Sama?",
      "stepDesc": "Kurangi pembilang.",
      "icon": "➖",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Beda?",
      "stepDesc": "KPK lalu senilai.",
      "icon": "🔢",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Kurangkan",
      "stepDesc": "Pembilang − pembilang.",
      "icon": "➖",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Sisa daerah",
      "stepDesc": "Arsir lalu hapus.",
      "icon": "🎨",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Sederhanakan",
      "stepDesc": "Jika bisa.",
      "icon": "✨",
      "flowFrom": "5",
      "flowTo": "7"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Cek",
      "stepDesc": "Hasil < pecahan awal?",
      "icon": "✅",
      "flowFrom": "6",
      "flowTo": "8"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Bab 3 utuh",
      "stepDesc": "Banding, jumlah, kurang.",
      "icon": "🎉",
      "flowFrom": "7",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "Penyebut sama",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "p-p",
      "suara": "Kurangi pembilang."
    },
    {
      "judul": "5/8-2/8",
      "emoji": "🔢",
      "countNum": 3,
      "countWord": "3/8",
      "suara": "Contoh."
    },
    {
      "judul": "KPK",
      "emoji": "🎯",
      "countNum": 1,
      "countWord": "samakan",
      "suara": "Bila beda."
    },
    {
      "judul": "3/4-1/6",
      "emoji": "➖",
      "countNum": 7,
      "countWord": "7/12",
      "suara": "Lewat 12."
    },
    {
      "judul": "Sisa",
      "emoji": "🎨",
      "countNum": 1,
      "countWord": "hapus",
      "suara": "Model sisa."
    },
    {
      "judul": "Jangan",
      "emoji": "🚫",
      "countNum": 1,
      "countWord": "q-q",
      "suara": "Jangan kurang penyebut."
    },
    {
      "judul": "Campuran",
      "emoji": "🔄",
      "countNum": 1,
      "countWord": "ubah",
      "suara": "Ke biasa dulu."
    },
    {
      "judul": "Perkiraan",
      "emoji": "📏",
      "countNum": 1,
      "countWord": "cek",
      "suara": "Masuk akal?"
    },
    {
      "judul": "Senilai",
      "emoji": "⚖️",
      "countNum": 1,
      "countWord": "sama nilai",
      "suara": "Sebelum kurang."
    },
    {
      "judul": "Bab 3",
      "emoji": "🎉",
      "countNum": 1,
      "countWord": "siap",
      "suara": "Utuh."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "kurang-sama",
      "title": "Kurang Penyebut Sama",
      "bookReference": "hlm. 91–95",
      "objective": "Kurangi pembilang. Mengurangkan.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Kurang Penyebut Sama: Penyebut tetap.",
      "voiceGuide": "Kurang Penyebut Sama. Penyebut tetap.",
      "emoji": "➖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "kurang-beda",
      "title": "Kurang Penyebut Beda",
      "bookReference": "hlm. 98–102",
      "objective": "Kurangi pembilang. Pakai KPK.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Kurang Penyebut Sama: Penyebut tetap.",
      "voiceGuide": "Kurang Penyebut Sama. Penyebut tetap.",
      "emoji": "🧮",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-kurang",
      "title": "Arti Pengurangan",
      "bookReference": "hlm. 91–102",
      "objective": "Kurangi pembilang. Definisi & cara.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Kurang Penyebut Sama: Penyebut tetap.",
      "voiceGuide": "Kurang Penyebut Sama. Penyebut tetap.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-kurang",
      "title": "Pilah Sama/Beda Kurang",
      "bookReference": "hlm. 91–102",
      "objective": "Kurangi pembilang. Memilah.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Kurang Penyebut Sama: Penyebut tetap.",
      "voiceGuide": "Kurang Penyebut Sama. Penyebut tetap.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-kurang",
      "title": "Jodohkan Kurang",
      "bookReference": "hlm. 91–102",
      "objective": "Menjodohkan. (Kurang Penyebut Sama)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Kurang Penyebut Sama. Mainkan dengan teliti.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-kurang",
      "title": "Memori Kurang",
      "bookReference": "hlm. 91–102",
      "objective": "Memori. (Kurang Penyebut Sama)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Kurang Penyebut Sama. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-kurang",
      "title": "Ketuk Hasil Kurang",
      "bookReference": "hlm. 91–102",
      "objective": "Mengetuk. (Kurang Penyebut Sama)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Kurang Penyebut Sama. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-kurang",
      "title": "Ketuk Semua Benar Kurang",
      "bookReference": "hlm. 91–102",
      "objective": "Ketuk semua. (Kurang Penyebut Sama)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Kurang Penyebut Sama. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-kurang",
      "title": "Cerita Lukis & Apel",
      "bookReference": "hlm. 91–102",
      "objective": "Soal cerita. (Kurang Penyebut Sama)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Kurang Penyebut Sama. Mainkan dengan teliti.",
      "emoji": "🎨",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-kurang",
      "title": "Urutkan Hasil Kurang",
      "bookReference": "hlm. 91–102",
      "objective": "Mengurutkan. (Kurang Penyebut Sama)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Kurang Penyebut Sama. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "diagram-sama-c",
      "title": "Diagram Kurang Sama",
      "bookReference": "hlm. 91–95",
      "objective": "Samakan penyebut. Baca sisa.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Kurang dengan KPK: Lalu kurangi.",
      "voiceGuide": "Kurang dengan KPK. Lalu kurangi.",
      "diagramType": "same",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "diagram-beda-c",
      "title": "Diagram Kurang Beda",
      "bookReference": "hlm. 98–102",
      "objective": "Samakan penyebut. Baca KPK.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Kurang dengan KPK: Lalu kurangi.",
      "voiceGuide": "Kurang dengan KPK. Lalu kurangi.",
      "diagramType": "diff",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-c",
      "title": "Jodohkan Diagram C",
      "bookReference": "hlm. 91–102",
      "objective": "Samakan penyebut. Jodohkan.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Kurang dengan KPK: Lalu kurangi.",
      "voiceGuide": "Kurang dengan KPK. Lalu kurangi.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-c",
      "title": "Memori Diagram C",
      "bookReference": "hlm. 91–102",
      "objective": "Samakan penyebut. Memori.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Kurang dengan KPK: Lalu kurangi.",
      "voiceGuide": "Kurang dengan KPK. Lalu kurangi.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-c",
      "title": "Tabel Kurang",
      "bookReference": "hlm. 91–102",
      "objective": "Isi tabel. (Kurang dengan KPK)",
      "mechanicDescription": "Tiga tabel.",
      "voiceGuide": "Kurang dengan KPK. Mainkan dengan teliti.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-pc",
      "title": "Ketuk Semua Diagram C",
      "bookReference": "hlm. 91–102",
      "objective": "Ketuk semua. (Kurang dengan KPK)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Kurang dengan KPK. Mainkan dengan teliti.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-c",
      "title": "Pilah Diagram C",
      "bookReference": "hlm. 91–102",
      "objective": "Pilah. (Kurang dengan KPK)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Kurang dengan KPK. Mainkan dengan teliti.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "choose-c",
      "title": "Pilih Pernyataan C",
      "bookReference": "hlm. 91–102",
      "objective": "Pilih. (Kurang dengan KPK)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Kurang dengan KPK. Mainkan dengan teliti.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jenis-pc",
      "title": "Pilih Arti Diagram C",
      "bookReference": "hlm. 91–102",
      "objective": "Definisi. (Kurang dengan KPK)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Kurang dengan KPK. Mainkan dengan teliti.",
      "diagramType": "def",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-c",
      "title": "Cerita Diagram C",
      "bookReference": "hlm. 91–102",
      "objective": "Cerita. (Kurang dengan KPK)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Kurang dengan KPK. Mainkan dengan teliti.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-sama-c",
      "title": "Tulis Kurang Sama",
      "bookReference": "hlm. 91–95",
      "objective": "Arsir lalu hapus. Menulis.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Model Sisa Daerah: Sisa adalah hasil.",
      "voiceGuide": "Model Sisa Daerah. Sisa adalah hasil.",
      "symbolLarge": "−",
      "wordLarge": "SAMA",
      "mathNotation": "p/q"
    },
    {
      "stage": "Abstract",
      "gameType": "write-beda-c",
      "title": "Tulis Kurang Beda",
      "bookReference": "hlm. 98–102",
      "objective": "Arsir lalu hapus. Menulis.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Model Sisa Daerah: Sisa adalah hasil.",
      "voiceGuide": "Model Sisa Daerah. Sisa adalah hasil.",
      "symbolLarge": "KPK−",
      "wordLarge": "BEDA",
      "mathNotation": "p/q"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-def-c",
      "title": "Pilih Definisi C",
      "bookReference": "hlm. 91–102",
      "objective": "Arsir lalu hapus. Definisi.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Model Sisa Daerah: Sisa adalah hasil.",
      "voiceGuide": "Model Sisa Daerah. Sisa adalah hasil.",
      "symbolLarge": "Δ",
      "wordLarge": "DEFINISI",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-c",
      "title": "Urutkan Abstrak C",
      "bookReference": "hlm. 91–102",
      "objective": "Arsir lalu hapus. Urut.",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Model Sisa Daerah: Sisa adalah hasil.",
      "voiceGuide": "Model Sisa Daerah. Sisa adalah hasil.",
      "symbolLarge": "naik",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-c",
      "title": "Jodohkan Notasi C",
      "bookReference": "hlm. 91–102",
      "objective": "Jodohkan. (Model Sisa Daerah)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Model Sisa Daerah. Mainkan dengan teliti.",
      "symbolLarge": "−",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-c",
      "title": "Memori Notasi C",
      "bookReference": "hlm. 91–102",
      "objective": "Memori. (Model Sisa Daerah)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Model Sisa Daerah. Mainkan dengan teliti.",
      "symbolLarge": "−",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-c",
      "title": "Benar atau Salah: Kurang",
      "bookReference": "hlm. 91–102",
      "objective": "Menilai. (Model Sisa Daerah)",
      "mechanicDescription": "Dua ronde.",
      "voiceGuide": "Model Sisa Daerah. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-c",
      "title": "Detektif Kurang",
      "bookReference": "hlm. 91–102",
      "objective": "Petunjuk. (Model Sisa Daerah)",
      "mechanicDescription": "Tiga soal.",
      "voiceGuide": "Model Sisa Daerah. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-c",
      "title": "Peta Konsep Kurang",
      "bookReference": "hlm. 91–102",
      "objective": "Peta. (Model Sisa Daerah)",
      "mechanicDescription": "Satu peta.",
      "voiceGuide": "Model Sisa Daerah. Mainkan dengan teliti.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-c",
      "title": "Cerita Angka Kurang",
      "bookReference": "hlm. 91–102",
      "objective": "Cerita. (Model Sisa Daerah)",
      "mechanicDescription": "Tiga ronde.",
      "voiceGuide": "Model Sisa Daerah. Mainkan dengan teliti.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "➖",
      "nama": "Penyebut sama",
      "isi": "Kurangkan pembilang; penyebut tetap.",
      "suara": "p−p atas q."
    },
    {
      "ikon": "🔢",
      "nama": "KPK",
      "isi": "Beda penyebut: samakan dulu.",
      "suara": "KPK dulu."
    },
    {
      "ikon": "🎨",
      "nama": "Sisa daerah",
      "isi": "Arsir lalu hapus bagian yang dikurangi.",
      "suara": "Lihat sisa."
    },
    {
      "ikon": "🚫",
      "nama": "Jangan",
      "isi": "Jangan mengurangkan penyebut.",
      "suara": "Bukan q−q."
    }
  ],
  "poinSuara": "Kurangi pembilang setelah penyebut sama; cek dengan model sisa.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Cek penyebut",
        "warna": "#FDE68A"
      },
      {
        "teks": "KPK jika beda",
        "warna": "#BBF7D0"
      },
      {
        "teks": "kurangi pembilang",
        "warna": "#BFDBFE"
      },
      {
        "teks": "sederhanakan",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba: terapkan Kurang Penyebut Sama pada satu soal di rumah.",
  "refleksi": [
    "Bagaimana Kurang Penyebut Sama membantumu?",
    "Kapan memakai Kurang dengan KPK?",
    "Apa bedanya dengan hanya menghafal rumus?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Like Denominator Subtract",
      "namaId": "Kurang Penyebut Sama",
      "asal": "Fraction operations",
      "ringkas": "Penyebut sama: kurangkan pembilang, penyebut tetap.",
      "tahap": [
        "Story",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Common Denominator Subtract",
      "namaId": "Kurang dengan KPK",
      "asal": "Singapore / US textbooks",
      "ringkas": "Penyebut beda: samakan dengan KPK, lalu kurangkan pembilang.",
      "tahap": [
        "Story",
        "Mind",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Residual Area Model",
      "namaId": "Model Sisa Daerah",
      "asal": "Visual fraction models",
      "ringkas": "Arsir semua lalu hapus bagian yang dikurangi; sisanya hasil.",
      "tahap": [
        "Story",
        "Infografis",
        "Concrete"
      ]
    }
  ]
};

export const SUB_BAB_K5B3: SubBabNaskah[] = [SUB_A53, SUB_B53, SUB_C53];
export const semuaAdeganK5B3 = SUB_BAB_K5B3.flatMap((s) => s.videos.flatMap((v) => v.adegan));
