/**
 * Naskah — poles kerapatan setara K5B4.
 * Metode luar dianyam ketukan per ketukan.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K3B2_META = {
  "chapterId": "k3-mat-bab2",
  "phaseCode": "FASE_B",
  "grade": 3,
  "subjectLabel": "MATEMATIKA - KELAS 3 SD",
  "title": "BAB 2: KALIMAT MATEMATIKA",
  "silabusElemen": "🌈 Fase B • Elemen Aljabar: Kalimat Matematika yang Berkaitan dengan Penjumlahan dan Pengurangan Bilangan Cacah sampai 100 (Kelas 3 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A32: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Kalimat Matematika Penjumlahan)",
  "fullTitle": "Sub-Bab A: Kalimat Matematika Berkaitan dengan Penjumlahan Bilangan Cacah",
  "targetDescription": "Siswa menulis kalimat Matematika dari cerita penjumlahan yang salah satu bilangannya belum diketahui, mencari bilangan itu dengan mengurangkan jumlah dengan bilangan yang diketahui, memeriksa hasilnya dengan penjumlahan, dan menyebutkan beberapa kemungkinan pasangan bilangan untuk jumlah yang sama. Siswa memakai cara Bagian–Bagian–Utuh, Model Batang, Cerita ke Kalimat. Siswa memakai cara Bagian–Bagian–Utuh, Model Batang, Cerita ke Kalimat.",
  "secondaryBg": "#E0E7FF",
  "secondaryBorder": "#4F46E5",
  "secondaryText": "#312E81",
  "silabus": {
    "teksSuara": "Kita belajar kalimat Matematika yang berkaitan dengan penjumlahan. Galih punya sejumlah kelereng di rumah. Ia membeli lima kelereng lagi, dan jumlahnya menjadi tujuh belas. Berapa kelereng yang disimpan di rumah? Kita menulis kalimat Matematikanya dan mencari bilangan yang belum diketahui dengan mengurangkan. Kita memakai cara: Bagian–Bagian–Utuh, Model Batang, Cerita ke Kalimat. Dua bagian membentuk keseluruhan pada penjumlahan. Gambar batang untuk kalimat matematika. Ubah cerita jadi + dan =. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menyelesaikan masalah yang berkaitan dengan kalimat Matematika berbentuk penjumlahan dan pengurangan bilangan cacah sampai 100. Pada sub-bab ini siswa mengisi nilai yang belum diketahui pada kalimat penjumlahan.",
    "referensi": "Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 2 Sub-Bab A)."
  },
  "videos": [
    {
      "id": "K3B2A-V1",
      "judul": "Bermain Kelereng",
      "subjudul": "Part–Part–Whole",
      "adegan": [
        {
          "id": "K3B2A-V1-1",
          "judul": "Kelereng Galih",
          "ketukan": [
            "Bayangkan kamu sedang mempelajari Kalimat Matematika Berkaitan dengan Penjumlahan Bilangan Cacah. Galih senang sekali mengumpulkan kelereng dengan berbagai warna.",
            "Ia memiliki sejumlah kelereng yang disimpan di rumah.",
            "Pada hari Minggu, Galih membeli 5 kelereng lagi.",
            "Ingat cara Bagian–Bagian–Utuh: Dua bagian membentuk keseluruhan pada penjumlahan. Ingat cara Bagian–Bagian–Utuh: Dua bagian membentuk keseluruhan pada penjumlahan."
          ],
          "papan": [
            "Galih punya kelereng",
            "Disimpan di rumah",
            "Membeli 5 kelereng lagi",
            "Jumlahnya kini 17"
          ]
        },
        {
          "id": "K3B2A-V1-2",
          "judul": "Berapa di rumah",
          "ketukan": [
            "Banyak kelereng di rumah belum kita ketahui.",
            "Kita tulis tanda titik-titik untuk bilangan yang belum diketahui.",
            "Kalimat Matematikanya adalah … + 5 = 17.",
            "Di sini kita memakai ide Part–Part–Whole — Dua bagian membentuk keseluruhan pada penjumlahan. Di sini kita memakai Part–Part–Whole. Dua bagian membentuk keseluruhan pada penjumlahan."
          ],
          "papan": [
            "Belum diketahui",
            "Tulis titik-titik …",
            "… + 5 = 17",
            "Berapa kelereng di rumah?"
          ]
        },
        {
          "id": "K3B2A-V1-3",
          "judul": "Kalimat Matematika",
          "ketukan": [
            "Bentuk penjumlahan seperti … + 5 = 17 disebut kalimat Matematika.",
            "Bilangan yang belum diketahui itulah yang akan kita cari.",
            "Kita akan belajar caranya selangkah demi selangkah.",
            "METODE LUAR · Bagian–Bagian–Utuh: Dua bagian membentuk keseluruhan pada penjumlahan."
          ],
          "papan": [
            "… + 5 = 17",
            "Cari bilangan yang belum diketahui",
            "Belajar selangkah demi selangkah",
            "Mulai dari tabel kelereng"
          ]
        }
      ]
    },
    {
      "id": "K3B2A-V2",
      "judul": "Latihan: Model Batang",
      "subjudul": "Bar Model",
      "adegan": [
        {
          "id": "K3B2A-V2-1",
          "judul": "Jumlah 50 butir",
          "ketukan": [
            "Galih dan Andi membawa sejumlah kelereng masing-masing.",
            "Jika kelereng mereka digabungkan terkumpul 50 butir.",
            "Banyak kelereng Galih adalah 30 butir.",
            "Ingat cara Model Batang: Gambar batang untuk kalimat matematika. Ingat cara Model Batang: Gambar batang untuk kalimat matematika."
          ],
          "papan": [
            "Galih dan Andi",
            "Digabung 50 butir",
            "Galih 30 butir",
            "Andi berapa butir?"
          ]
        },
        {
          "id": "K3B2A-V2-2",
          "judul": "Tulis kalimatnya",
          "ketukan": [
            "Kita tulis dalam tabel: Galih 30 butir, Andi belum diketahui, jumlah semua 50 butir.",
            "Kalimat Matematikanya adalah 30 + … = 50.",
            "Kita ingat bahwa 30 + 20 = 50.",
            "Di sini kita memakai ide Bar Model — Gambar batang untuk kalimat matematika. Di sini kita memakai Bar Model. Gambar batang untuk kalimat matematika."
          ],
          "papan": [
            "30 butir, …, 50 butir",
            "30 + … = 50",
            "30 + 20 = 50",
            "Bagaimana mencari 20?"
          ]
        },
        {
          "id": "K3B2A-V2-3",
          "judul": "Bagan jumlah",
          "ketukan": [
            "Gambar bagan: seluruh kelereng 50, bagian Galih 30, bagian Andi belum diketahui.",
            "Untuk mencari bagian Andi, kurangi jumlah semua dengan bagian Galih.",
            "Kita hitung 50 − 30 = 20.",
            "METODE LUAR · Model Batang: Gambar batang untuk kalimat matematika."
          ],
          "papan": [
            "Bagan: 50 = 30 + ?",
            "Jumlah dikurangi bagian",
            "50 − 30 = 20",
            "Andi 20 butir"
          ]
        }
      ]
    },
    {
      "id": "K3B2A-V3",
      "judul": "Siap pakai Story to Equation",
      "subjudul": "Story to Equation",
      "adegan": [
        {
          "id": "K3B2A-V3-1",
          "judul": "Contoh pertama",
          "ketukan": [
            "Contoh pertama: 8 + … = 19.",
            "Bilangan yang diketahui adalah 8 dan 19.",
            "Kurangkan jumlahnya: 19 − 8 = 11.",
            "Ingat cara Cerita ke Kalimat: Ubah cerita jadi + dan =. Ingat cara Cerita ke Kalimat: Ubah cerita jadi + dan =."
          ],
          "papan": [
            "8 + … = 19",
            "Diketahui 8 dan 19",
            "19 − 8 = 11",
            "8 + 11 = 19"
          ]
        },
        {
          "id": "K3B2A-V3-2",
          "judul": "Contoh kedua",
          "ketukan": [
            "Contoh kedua: 23 + … = 45.",
            "Kurangkan jumlahnya dengan bilangan yang diketahui.",
            "Hitung 45 − 23 sama dengan 22.",
            "Di sini kita memakai ide Story to Equation — Ubah cerita jadi + dan =. Di sini kita memakai Story to Equation. Ubah cerita jadi + dan =."
          ],
          "papan": [
            "23 + … = 45",
            "Jumlah dikurangi bilangan",
            "45 − 23 = 22",
            "23 + 22 = 45"
          ]
        },
        {
          "id": "K3B2A-V3-3",
          "judul": "Contoh ketiga",
          "ketukan": [
            "Contoh ketiga: … + 16 = 54.",
            "Bilangan yang belum diketahui ada di depan.",
            "Kurangkan: 54 − 16 = 38.",
            "METODE LUAR · Cerita ke Kalimat: Ubah cerita jadi + dan =."
          ],
          "papan": [
            "… + 16 = 54",
            "Belum diketahui di depan",
            "54 − 16 = 38",
            "38 + 16 = 54"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Apa yang ditanyakan pada Kalimat Matematika Berkaitan dengan Penjumlahan Bilangan Cacah?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Part–Part–Whole",
      "stepDesc": "Dua bagian membentuk keseluruhan pada penjumlahan.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Bar Model",
      "stepDesc": "Gambar batang untuk kalimat matematika.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Story to Equation",
      "stepDesc": "Ubah cerita jadi + dan =.",
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
      "judul": "Kalimat Matematika",
      "emoji": "📘",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Bentuk penjumlahan yang memuat titik-titik disebut kalimat Matematika. Titik-titik menunjukkan bilangan yang belum diketahui."
    },
    {
      "judul": "Bilangan Belum Diketahui",
      "emoji": "❓",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Bilangan yang belum diketahui ditulis dengan titik-titik. Bilangan itu boleh ada di depan atau di tengah kalimat."
    },
    {
      "judul": "30 + … = 50",
      "emoji": "🎱",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Galih punya tiga puluh kelereng. Jumlah kelereng Galih dan Andi lima puluh. Kalimat Matematikanya tiga puluh tambah titik-titik sama dengan lima puluh."
    },
    {
      "judul": "Bagan Jumlah",
      "emoji": "📊",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Batang atas menunjukkan jumlah semua. Dua batang di bawahnya menunjukkan dua bagian. Satu bagian bertanda tanya."
    },
    {
      "judul": "Jumlah Dikurangi Bagian",
      "emoji": "➖",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Untuk mencari bagian yang belum diketahui, kurangi jumlah semua dengan bagian yang diketahui. Lima puluh dikurangi tiga puluh sama dengan dua puluh."
    },
    {
      "judul": "8 + … = 19",
      "emoji": "🔢",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Delapan tambah titik-titik sama dengan sembilan belas. Sembilan belas dikurangi delapan sama dengan sebelas. Jadi delapan tambah sebelas sama dengan sembilan belas."
    },
    {
      "judul": "… + 16 = 54",
      "emoji": "🔎",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Titik-titik tambah enam belas sama dengan lima puluh empat. Lima puluh empat dikurangi enam belas sama dengan tiga puluh delapan. Jadi tiga puluh delapan tambah enam belas sama dengan lima puluh empat."
    },
    {
      "judul": "Memeriksa",
      "emoji": "✅",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Periksa hasilmu dengan menjumlahkan. Tiga puluh tambah dua puluh sama dengan lima puluh, jadi jawabannya benar."
    },
    {
      "judul": "Banyak Kemungkinan",
      "emoji": "🔀",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Bila hanya jumlahnya yang diketahui, ada banyak kemungkinan. Enam puluh tambah empat puluh, atau tujuh puluh lima tambah dua puluh lima, sama-sama seratus."
    },
    {
      "judul": "Cara Mengisi",
      "emoji": "📝",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Empat langkah. Satu, baca kalimat Matematikanya. Dua, lihat bilangan yang diketahui. Tiga, kurangkan jumlah dengan bilangan itu. Empat, periksa dengan menjumlahkan."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "build-unknown",
      "title": "Rakit yang Belum Diketahui",
      "bookReference": "hlm. 79–82 (Aktivitas 1: kelereng Galih dan Andi)",
      "objective": "Pakai Bagian–Bagian–Utuh: Dua bagian membentuk keseluruhan pada penjumlahan. Latihan: Merakit kumpulan benda yang belum diketahui pada kalimat Matematika penjumlahan, termasuk menukar sepuluh benda menjadi satu bungkus..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca cerita dan melihat gambar kumpulan yang diketahui, lalu merakit kumpulan yang belum diketahui dengan tombol tambah dan kurang. Sepuluh benda otomatis ditukar satu bungkus. Saat bermain, ingat Bagian–Bagian–Utuh: Dua bagian membentuk keseluruhan pada penjumlahan.",
      "voiceGuide": "Bagian–Bagian–Utuh. Dua bagian membentuk keseluruhan pada penjumlahan.",
      "emoji": "🧺",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "count-unknown",
      "title": "Hitung yang Belum Diketahui",
      "bookReference": "hlm. 79–82 (Aktivitas 1: kelereng Galih dan Andi)",
      "objective": "Pakai Bagian–Bagian–Utuh: Dua bagian membentuk keseluruhan pada penjumlahan. Latihan: Menghitung banyak benda yang belum diketahui dari gambar kumpulan dan memilih hasilnya..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Gambar kumpulan ditampilkan dengan kotak tanda tanya pada bagian yang belum diketahui. Siswa memilih satu dari tiga nilai. Pengecoh salah sepuluh atau salah satu. Saat bermain, ingat Bagian–Bagian–Utuh: Dua bagian membentuk keseluruhan pada penjumlahan.",
      "voiceGuide": "Bagian–Bagian–Utuh. Dua bagian membentuk keseluruhan pada penjumlahan.",
      "emoji": "❓",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "write-sentence",
      "title": "Tulis Kalimat Matematika",
      "bookReference": "hlm. 79–82 (Aktivitas 1: kelereng Galih dan Andi)",
      "objective": "Pakai Bagian–Bagian–Utuh: Dua bagian membentuk keseluruhan pada penjumlahan. Latihan: Memilih kalimat Matematika penjumlahan yang sesuai dengan gambar kumpulan benda..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa melihat gambar kumpulan, lalu memilih satu dari tiga kalimat Matematika. Pengecoh menukar hasil dengan bilangan yang diketahui atau membalik tanda. Saat bermain, ingat Bagian–Bagian–Utuh: Dua bagian membentuk keseluruhan pada penjumlahan.",
      "voiceGuide": "Bagian–Bagian–Utuh. Dua bagian membentuk keseluruhan pada penjumlahan.",
      "emoji": "✍️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "match-picture-sentence",
      "title": "Jodohkan Gambar dan Kalimat",
      "bookReference": "hlm. 79–82 (Aktivitas 1: kelereng Galih dan Andi)",
      "objective": "Pakai Bagian–Bagian–Utuh: Dua bagian membentuk keseluruhan pada penjumlahan. Latihan: Menjodohkan gambar kumpulan benda dengan kalimat Matematikanya..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga gambar dan tiga kalimat Matematika. Siswa mengetuk gambar, lalu mengetuk kalimat yang cocok. Saat bermain, ingat Bagian–Bagian–Utuh: Dua bagian membentuk keseluruhan pada penjumlahan.",
      "voiceGuide": "Bagian–Bagian–Utuh. Dua bagian membentuk keseluruhan pada penjumlahan.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "memory-picture-value",
      "title": "Memori Gambar dan Nilai",
      "bookReference": "hlm. 79–82 (Aktivitas 1: kelereng Galih dan Andi)",
      "objective": "Mencocokkan gambar kumpulan benda dengan nilai yang belum diketahui lewat permainan memori.. Ingat Bagian–Bagian–Utuh. (Bagian–Bagian–Utuh)",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): gambar kumpulan dan nilainya. Siswa membalik dua kartu dan mencari pasangannya. Gunakan Bagian–Bagian–Utuh.",
      "voiceGuide": "Bagian–Bagian–Utuh. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-picture-value",
      "title": "Ketuk Gambar dengan Nilai",
      "bookReference": "hlm. 79–82 (Aktivitas 1: kelereng Galih dan Andi)",
      "objective": "Menemukan gambar yang nilai belum diketahuinya sama dengan bilangan yang diminta.. Ingat Bagian–Bagian–Utuh. (Bagian–Bagian–Utuh)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga gambar dan dua pertanyaan. Siswa mengetuk gambar yang nilai belum diketahuinya sama dengan bilangan yang disebut. Gunakan Bagian–Bagian–Utuh.",
      "voiceGuide": "Bagian–Bagian–Utuh. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-value-compare",
      "title": "Ketuk Semua Nilai Lebih atau Kurang",
      "bookReference": "hlm. 79–82 (Aktivitas 1: kelereng Galih dan Andi)",
      "objective": "Menemukan semua gambar yang nilai belum diketahuinya lebih atau kurang dari bilangan acuan.. Ingat Bagian–Bagian–Utuh. (Bagian–Bagian–Utuh)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat gambar dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. Gunakan Bagian–Bagian–Utuh.",
      "voiceGuide": "Bagian–Bagian–Utuh. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-sentence",
      "title": "Cerita Kalimat Matematika",
      "bookReference": "hlm. 77 dan 81 (Bermain Kelereng; Galih dan Andi)",
      "objective": "Menyelesaikan cerita penjumlahan dengan bilangan yang belum diketahui dan gambar kumpulan benda.. Ingat Bagian–Bagian–Utuh. (Bagian–Bagian–Utuh)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita, melihat gambar kumpulan, lalu memilih nilai yang belum diketahui. Gunakan Bagian–Bagian–Utuh.",
      "voiceGuide": "Bagian–Bagian–Utuh. Mainkan dengan teliti.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "board-value-collection",
      "title": "Papan Nilai Kumpulan",
      "bookReference": "hlm. 79–82 (Aktivitas 1: kelereng Galih dan Andi)",
      "objective": "Menulis nilai yang belum diketahui pada papan puluhan dan satuan.. Ingat Bagian–Bagian–Utuh. (Bagian–Bagian–Utuh)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa menghitung nilai yang belum diketahui dari gambar kumpulan, lalu mengatur angka puluhan dan satuan pada papan dan menekan Periksa. Gunakan Bagian–Bagian–Utuh.",
      "voiceGuide": "Bagian–Bagian–Utuh. Mainkan dengan teliti.",
      "emoji": "🗂️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-picture-value",
      "title": "Urutkan Gambar menurut Nilai",
      "bookReference": "hlm. 79–82 (Aktivitas 1: kelereng Galih dan Andi)",
      "objective": "Mengurutkan tiga gambar menurut nilai yang belum diketahuinya.. Ingat Bagian–Bagian–Utuh. (Bagian–Bagian–Utuh)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga gambar bertanda huruf. Siswa mengetuk gambar satu per satu dari nilai paling kecil atau paling besar. Gunakan Bagian–Bagian–Utuh.",
      "voiceGuide": "Bagian–Bagian–Utuh. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 9
    },
    {
      "stage": "Picture",
      "gameType": "count-bar",
      "title": "Hitung Bagan",
      "bookReference": "hlm. 79–82 (Aktivitas 1: kelereng Galih dan Andi)",
      "objective": "Pakai Model Batang: Gambar batang untuk kalimat matematika. Latihan: Menghitung nilai yang belum diketahui dari bagan bagian dan keseluruhan..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Bagan batang menampilkan keseluruhan dan dua bagian, salah satunya bertanda tanya. Siswa memilih satu dari tiga nilai. Saat bermain, ingat Model Batang: Gambar batang untuk kalimat matematika.",
      "voiceGuide": "Model Batang. Gambar batang untuk kalimat matematika.",
      "diagramType": "bar-count",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "complete-sentence-bar",
      "title": "Lengkapi Kalimat dari Bagan",
      "bookReference": "hlm. 83 (Contoh: 8 + … = 19, 23 + … = 45, … + 16 = 54)",
      "objective": "Pakai Model Batang: Gambar batang untuk kalimat matematika. Latihan: Melengkapi langkah mencari nilai yang belum diketahui: kurangi jumlah dengan bilangan yang diketahui, mengisi kalimat, lalu memeriksa..",
      "mechanicDescription": "Tiga soal, tiap soal tiga kalimat, misalnya cari dengan operasi kebalikan, isi kalimat Matematika, lalu periksa. Siswa memilih satu dari tiga angka untuk bagian kosong. Saat bermain, ingat Model Batang: Gambar batang untuk kalimat matematika.",
      "voiceGuide": "Model Batang. Gambar batang untuk kalimat matematika.",
      "diagramType": "bar-sentence",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "match-bar-sentence",
      "title": "Jodohkan Bagan dan Kalimat",
      "bookReference": "hlm. 79–82 (Aktivitas 1: kelereng Galih dan Andi)",
      "objective": "Pakai Model Batang: Gambar batang untuk kalimat matematika. Latihan: Menjodohkan bagan dengan kalimat Matematikanya..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga bagan dan tiga kalimat Matematika. Siswa mengetuk bagan, lalu mengetuk kalimat yang cocok. Saat bermain, ingat Model Batang: Gambar batang untuk kalimat matematika.",
      "voiceGuide": "Model Batang. Gambar batang untuk kalimat matematika.",
      "diagramType": "bar-match",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memory-bar-value",
      "title": "Memori Bagan dan Nilai",
      "bookReference": "hlm. 79–82 (Aktivitas 1: kelereng Galih dan Andi)",
      "objective": "Pakai Model Batang: Gambar batang untuk kalimat matematika. Latihan: Mencocokkan bagan dengan nilai yang belum diketahui lewat permainan memori..",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. Saat bermain, ingat Model Batang: Gambar batang untuk kalimat matematika.",
      "voiceGuide": "Model Batang. Gambar batang untuk kalimat matematika.",
      "diagramType": "bar-memory",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "fill-sentence-table",
      "title": "Isi Tabel Kalimat Matematika",
      "bookReference": "hlm. 83 (Contoh: 8 + … = 19, 23 + … = 45, … + 16 = 54)",
      "objective": "Melengkapi tabel kalimat Matematika dan nilai yang belum diketahui.. Ingat Model Batang. (Model Batang)",
      "mechanicDescription": "Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu nilai yang tepat. Ada satu kartu pengecoh. Gunakan Model Batang.",
      "voiceGuide": "Model Batang. Mainkan dengan teliti.",
      "diagramType": "sentence-table",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-bar-compare",
      "title": "Ketuk Semua Bagan Lebih atau Kurang",
      "bookReference": "hlm. 85–86 (Latihan 1)",
      "objective": "Menemukan semua bagan yang nilai belum diketahuinya lebih atau kurang dari bilangan acuan.. Ingat Model Batang. (Model Batang)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat bagan dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. Gunakan Model Batang.",
      "voiceGuide": "Model Batang. Mainkan dengan teliti.",
      "diagramType": "bar-select",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-bar-position",
      "title": "Pilah Bagan: Depan atau Tengah",
      "bookReference": "hlm. 83 (Contoh: 8 + … = 19, 23 + … = 45, … + 16 = 54)",
      "objective": "Memilah bagan menjadi yang bilangan belum diketahuinya di depan dan yang di tengah kalimat.. Ingat Model Batang. (Model Batang)",
      "mechanicDescription": "Tiga ronde, tiap ronde enam bagan dan dua kotak. Siswa menyeret atau mengetuk bagan ke kotak yang tepat. Gunakan Model Batang.",
      "voiceGuide": "Model Batang. Mainkan dengan teliti.",
      "diagramType": "bar-sort",
      "numberA": 3,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "order-find-steps",
      "title": "Urutkan Langkah Mencari Nilai",
      "bookReference": "hlm. 83 (Contoh: 8 + … = 19, 23 + … = 45, … + 16 = 54)",
      "objective": "Mengurutkan langkah mencari nilai yang belum diketahui pada kalimat Matematika.. Ingat Model Batang. (Model Batang)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat langkah. Siswa mengetuk langkah satu per satu menurut urutan yang benar. Letak jawaban berpindah. Gunakan Model Batang.",
      "voiceGuide": "Model Batang. Mainkan dengan teliti.",
      "diagramType": "steps-order",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "board-value-bar",
      "title": "Papan Nilai dari Bagan",
      "bookReference": "hlm. 85–86 (Latihan 1)",
      "objective": "Menulis nilai yang belum diketahui dari bagan pada papan puluhan dan satuan.. Ingat Model Batang. (Model Batang)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca bagan, lalu mengatur angka puluhan dan satuan pada papan dan menekan Periksa. Gunakan Model Batang.",
      "voiceGuide": "Model Batang. Mainkan dengan teliti.",
      "diagramType": "bar-board",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "possible-pairs",
      "title": "Kemungkinan Pasangan Bilangan",
      "bookReference": "hlm. 84 (Ayo Berpikir: buku di perpustakaan)",
      "objective": "Menemukan semua pasangan bilangan yang mungkin untuk keseluruhan yang sama.. Ingat Model Batang. (Model Batang)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat pasangan dan satu perintah. Siswa mengetuk semua pasangan yang jumlahnya sama dengan keseluruhan, lalu menekan Periksa. Gunakan Model Batang.",
      "voiceGuide": "Model Batang. Mainkan dengan teliti.",
      "diagramType": "pairs-select",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Abstract",
      "gameType": "fill-unknown",
      "title": "Isi Nilai yang Belum Diketahui",
      "bookReference": "hlm. 83 (Contoh: 8 + … = 19, 23 + … = 45, … + 16 = 54)",
      "objective": "Pakai Cerita ke Kalimat: Ubah cerita jadi + dan =. Latihan: Mencari nilai yang belum diketahui pada kalimat Matematika penjumlahan dan memilihnya dari tiga pilihan..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal, misalnya 8 + … = 19 dan … + 16 = 54. Pengecoh salah sepuluh atau salah satu. Saat bermain, ingat Cerita ke Kalimat: Ubah cerita jadi + dan =.",
      "voiceGuide": "Cerita ke Kalimat. Ubah cerita jadi + dan =.",
      "symbolLarge": "?",
      "wordLarge": "ISI NILAI",
      "mathNotation": "nilai yang belum diketahui"
    },
    {
      "stage": "Abstract",
      "gameType": "board-value",
      "title": "Papan Nilai",
      "bookReference": "hlm. 85–86 (Latihan 1)",
      "objective": "Pakai Cerita ke Kalimat: Ubah cerita jadi + dan =. Latihan: Menulis nilai yang belum diketahui pada papan puluhan dan satuan..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa mengatur angka puluhan dan satuan lalu menekan Periksa. Saat bermain, ingat Cerita ke Kalimat: Ubah cerita jadi + dan =.",
      "voiceGuide": "Cerita ke Kalimat. Ubah cerita jadi + dan =.",
      "symbolLarge": "…",
      "wordLarge": "PAPAN",
      "mathNotation": "puluhan • satuan"
    },
    {
      "stage": "Abstract",
      "gameType": "solve-steps",
      "title": "Langkah Menyelesaikan",
      "bookReference": "hlm. 83 (Contoh: 8 + … = 19, 23 + … = 45, … + 16 = 54)",
      "objective": "Pakai Cerita ke Kalimat: Ubah cerita jadi + dan =. Latihan: Melengkapi langkah mencari nilai, mengisi kalimat, dan memeriksa hasilnya..",
      "mechanicDescription": "Tiga soal, tiap soal tiga kalimat, misalnya cari dengan operasi kebalikan. Siswa memilih satu dari tiga angka. Saat bermain, ingat Cerita ke Kalimat: Ubah cerita jadi + dan =.",
      "voiceGuide": "Cerita ke Kalimat. Ubah cerita jadi + dan =.",
      "symbolLarge": "→",
      "wordLarge": "LANGKAH",
      "mathNotation": "cari • isi • periksa"
    },
    {
      "stage": "Abstract",
      "gameType": "match-sentence-value",
      "title": "Jodohkan Kalimat dan Nilai",
      "bookReference": "hlm. 85–86 (Latihan 1)",
      "objective": "Pakai Cerita ke Kalimat: Ubah cerita jadi + dan =. Latihan: Menjodohkan kalimat Matematika dengan nilai yang belum diketahuinya..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga kalimat dan tiga nilai. Siswa mengetuk kalimat, lalu mengetuk nilai yang cocok. Saat bermain, ingat Cerita ke Kalimat: Ubah cerita jadi + dan =.",
      "voiceGuide": "Cerita ke Kalimat. Ubah cerita jadi + dan =.",
      "symbolLarge": "= …",
      "wordLarge": "JODOHKAN",
      "mathNotation": "kalimat • nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-sentence-value",
      "title": "Memori Kalimat dan Nilai",
      "bookReference": "hlm. 85–86 (Latihan 1)",
      "objective": "Mencocokkan kalimat Matematika dengan nilainya lewat permainan memori.. Ingat Cerita ke Kalimat. (Cerita ke Kalimat)",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): kalimat dan nilai. Siswa membalik dua kartu dan mencari pasangannya. Gunakan Cerita ke Kalimat.",
      "voiceGuide": "Cerita ke Kalimat. Mainkan dengan teliti.",
      "symbolLarge": "= ?",
      "wordLarge": "MEMORI",
      "mathNotation": "kalimat • nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-sentence",
      "title": "Benar atau Salah: Kalimat Matematika",
      "bookReference": "hlm. 83 (Contoh: 8 + … = 19, 23 + … = 45, … + 16 = 54)",
      "objective": "Menilai pernyataan tentang kalimat Matematika dan cara mencari nilainya.. Ingat Cerita ke Kalimat. (Cerita ke Kalimat)",
      "mechanicDescription": "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Tiap jawaban diberi penjelasan. Gunakan Cerita ke Kalimat.",
      "voiceGuide": "Cerita ke Kalimat. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "periksa dengan alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-sentence",
      "title": "Detektif Kalimat Matematika",
      "bookReference": "hlm. 83 (Contoh: 8 + … = 19, 23 + … = 45, … + 16 = 54)",
      "objective": "Menemukan bilangan yang belum diketahui dari dua petunjuk.. Ingat Cerita ke Kalimat. (Cerita ke Kalimat)",
      "mechanicDescription": "Empat soal. Siswa membaca petunjuk seperti nilai pada sebuah kalimat Matematika dan satu ciri bilangan, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok. Gunakan Cerita ke Kalimat.",
      "voiceGuide": "Cerita ke Kalimat. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "dua petunjuk, satu jawaban"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-map-sentence",
      "title": "Peta Konsep Kalimat Matematika",
      "bookReference": "hlm. 76 (peta konsep: kalimat Matematika)",
      "objective": "Melengkapi peta konsep kalimat Matematika penjumlahan dan cara mencari nilainya.. Ingat Cerita ke Kalimat. (Cerita ke Kalimat)",
      "mechanicDescription": "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. Gunakan Cerita ke Kalimat.",
      "voiceGuide": "Cerita ke Kalimat. Mainkan dengan teliti.",
      "symbolLarge": "⇄",
      "wordLarge": "PETA KONSEP",
      "mathNotation": "kalimat • nilai • cari"
    },
    {
      "stage": "Abstract",
      "gameType": "story-sentence-abstract",
      "title": "Soal Cerita Kalimat Matematika",
      "bookReference": "hlm. 85–86 (Latihan 1)",
      "objective": "Menyelesaikan soal cerita penjumlahan dengan bilangan yang belum diketahui.. Ingat Cerita ke Kalimat. (Cerita ke Kalimat)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita lalu memilih satu dari tiga nilai. Pengecoh salah sepuluh atau salah satu. Gunakan Cerita ke Kalimat.",
      "voiceGuide": "Cerita ke Kalimat. Mainkan dengan teliti.",
      "symbolLarge": "…",
      "wordLarge": "CERITA",
      "mathNotation": "nilai yang belum diketahui"
    },
    {
      "stage": "Abstract",
      "gameType": "sentence-words",
      "title": "Susun Kata Kalimat Matematika",
      "bookReference": "hlm. 77 dan 81 (Bermain Kelereng; Galih dan Andi)",
      "objective": "Menyusun kalimat tentang kalimat Matematika dari kartu kata.. Ingat Cerita ke Kalimat. (Cerita ke Kalimat)",
      "mechanicDescription": "Empat kalimat. Siswa mengetuk kartu kata satu per satu menurut urutan kalimat yang benar. Ada satu kartu pengecoh. Gunakan Cerita ke Kalimat.",
      "voiceGuide": "Cerita ke Kalimat. Mainkan dengan teliti.",
      "symbolLarge": "…",
      "wordLarge": "SUSUN KATA",
      "mathNotation": "kalimat Matematika"
    }
  ],
  "poin": [
    {
      "ikon": "📘",
      "nama": "Kalimat Matematika",
      "isi": "30 + … = 50",
      "suara": "Bentuk penjumlahan yang memuat titik-titik disebut kalimat Matematika."
    },
    {
      "ikon": "🌍",
      "nama": "Bagian–Bagian–Utuh",
      "isi": "Dua bagian membentuk keseluruhan pada penjumlahan.",
      "suara": "Bagian–Bagian–Utuh. Dua bagian membentuk keseluruhan pada penjumlahan."
    },
    {
      "ikon": "🌍",
      "nama": "Model Batang",
      "isi": "Gambar batang untuk kalimat matematika.",
      "suara": "Model Batang. Gambar batang untuk kalimat matematika."
    },
    {
      "ikon": "🌍",
      "nama": "Cerita ke Kalimat",
      "isi": "Ubah cerita jadi + dan =.",
      "suara": "Cerita ke Kalimat. Ubah cerita jadi + dan =."
    }
  ],
  "poinSuara": "Ingat: Bagian–Bagian–Utuh, Model Batang, Cerita ke Kalimat.",
  "cara": {
    "suara": "Cara mengisi. Baca kalimat Matematikanya. Lihat bilangan yang diketahui. Kurangkan jumlah dengan bilangan itu. Lalu periksa dengan menjumlahkan.",
    "potongan": [
      {
        "teks": "baca kalimat",
        "warna": "#BAE6FD"
      },
      {
        "teks": "lihat yang diketahui",
        "warna": "#FECACA"
      },
      {
        "teks": "kurangkan jumlah",
        "warna": "#BFDBFE"
      },
      {
        "teks": "periksa jumlah",
        "warna": "#FDE68A"
      }
    ]
  },
  "rumah": "Ayo Mencoba: terapkan Bagian–Bagian–Utuh pada satu soal nyata di rumah.",
  "refleksi": [
    "Bagaimana Bagian–Bagian–Utuh membantumu?",
    "Kapan memakai Model Batang?",
    "Apa bedanya dengan hanya menghafal tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Part–Part–Whole",
      "namaId": "Bagian–Bagian–Utuh",
      "asal": "Singapore Math",
      "ringkas": "Dua bagian membentuk keseluruhan pada penjumlahan.",
      "tahap": [
        "Story",
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Bar Model",
      "namaId": "Model Batang",
      "asal": "Singapore bar model",
      "ringkas": "Gambar batang untuk kalimat matematika.",
      "tahap": [
        "Mind",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Story to Equation",
      "namaId": "Cerita ke Kalimat",
      "asal": "Word-problem pedagogy",
      "ringkas": "Ubah cerita jadi + dan =.",
      "tahap": [
        "Infografis",
        "Abstract"
      ]
    }
  ]
};

export const SUB_B32: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Kalimat Matematika Pengurangan)",
  "fullTitle": "Sub-Bab B: Kalimat Matematika Berkaitan dengan Pengurangan Bilangan Cacah",
  "targetDescription": "Siswa menulis kalimat Matematika dari cerita pengurangan yang bilangan awal atau bilangan yang dikurangkan belum diketahui, mencari bilangan yang dikurangkan dengan mengurangkan bilangan awal dengan sisa, mencari bilangan awal dengan menambahkan, memeriksa hasilnya, dan menyebutkan beberapa kemungkinan. Siswa memakai cara Mengambil, Selisih Banding, Model Batang Kurang. Siswa memakai cara Mengambil, Selisih Banding, Model Batang Kurang.",
  "secondaryBg": "#FCE7F3",
  "secondaryBorder": "#DB2777",
  "secondaryText": "#831843",
  "silabus": {
    "teksSuara": "Kita belajar kalimat Matematika yang berkaitan dengan pengurangan. Pak Slamet punya delapan puluh ekor ayam. Sebagian ayam dijual dan tersisa empat puluh lima ekor. Berapa ayam yang dijual? Kita juga mencari banyak ayam mula-mula bila ayam yang dijual dan sisanya diketahui. Kita memakai mengurangkan dan menjumlahkan. Kita memakai cara: Mengambil, Selisih Banding, Model Batang Kurang. Kurangi berarti mengambil sebagian. Berapa lebih banyak/sedikit. Batang utuh dikurangi bagian. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menyelesaikan masalah yang berkaitan dengan kalimat Matematika berbentuk penjumlahan dan pengurangan bilangan cacah sampai 100. Pada sub-bab ini siswa mengisi nilai yang belum diketahui pada kalimat pengurangan.",
    "referensi": "Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 2 Sub-Bab B)."
  },
  "videos": [
    {
      "id": "K3B2B-V1",
      "judul": "Permen Dua Anak",
      "subjudul": "Take Away",
      "adegan": [
        {
          "id": "K3B2B-V1-1",
          "judul": "Dua anak membawa permen",
          "ketukan": [
            "Bayangkan kamu sedang mempelajari Kalimat Matematika Berkaitan dengan Pengurangan Bilangan Cacah. Dua anak membawa sejumlah permen masing-masing.",
            "Banyak permen anak pertama diketahui, anak kedua belum.",
            "Selisih banyak permen kedua anak juga diketahui.",
            "Ingat cara Mengambil: Kurangi berarti mengambil sebagian. Ingat cara Mengambil: Kurangi berarti mengambil sebagian."
          ],
          "papan": [
            "Dua anak, permen",
            "Anak pertama diketahui",
            "Selisih diketahui",
            "Cari yang belum diketahui"
          ]
        },
        {
          "id": "K3B2B-V1-2",
          "judul": "Tabel permen",
          "ketukan": [
            "Kita buat tabel: permen anak pertama, anak kedua, dan selisihnya.",
            "Nomor satu: 3 permen dan selisih 1, jadi 3 − … = 1.",
            "Nomor empat: anak kedua 6, selisih 3, jadi … − 6 = 3.",
            "Di sini kita memakai ide Take Away — Kurangi berarti mengambil sebagian. Di sini kita memakai Take Away. Kurangi berarti mengambil sebagian."
          ],
          "papan": [
            "Tabel permen",
            "3 − … = 1",
            "… − 6 = 3",
            "Kalimat Matematika"
          ]
        },
        {
          "id": "K3B2B-V1-3",
          "judul": "Cara mencari",
          "ketukan": [
            "Pada 3 − … = 1, kita kurangi 3 dengan 1 sama dengan 2.",
            "Jadi, 3 − 2 sama dengan 1.",
            "Pada … − 6 = 3, kita tambahkan 3 dan 6 sama dengan 9.",
            "METODE LUAR · Mengambil: Kurangi berarti mengambil sebagian."
          ],
          "papan": [
            "3 − 1 = 2",
            "3 − 2 = 1",
            "3 + 6 = 9",
            "9 − 6 = 3"
          ]
        }
      ]
    },
    {
      "id": "K3B2B-V2",
      "judul": "Latihan: Selisih Banding",
      "subjudul": "Comparison Difference",
      "adegan": [
        {
          "id": "K3B2B-V2-1",
          "judul": "Ayam dijual",
          "ketukan": [
            "Pak Slamet adalah seorang peternak ayam.",
            "Ia mempunyai 80 ekor ayam potong di kandang.",
            "Sebagian ayam dijual ke pasar dan tersisa 45 ekor.",
            "Ingat cara Selisih Banding: Berapa lebih banyak/sedikit. Ingat cara Selisih Banding: Berapa lebih banyak/sedikit."
          ],
          "papan": [
            "Pak Slamet punya 80 ayam",
            "Sebagian dijual",
            "Sisa 45 ekor",
            "Berapa yang dijual?"
          ]
        },
        {
          "id": "K3B2B-V2-2",
          "judul": "Kalimatnya",
          "ketukan": [
            "Tabel: ayam mula-mula 80 ekor, dijual belum diketahui, sisa 45 ekor.",
            "Kalimat Matematikanya adalah 80 − … = 45.",
            "Kita ingat bahwa 80 − 35 = 45.",
            "Di sini kita memakai ide Comparison Difference — Berapa lebih banyak/sedikit. Di sini kita memakai Comparison Difference. Berapa lebih banyak/sedikit."
          ],
          "papan": [
            "80 ekor, …, 45 ekor",
            "80 − … = 45",
            "80 − 35 = 45",
            "Bagaimana mencari 35?"
          ]
        },
        {
          "id": "K3B2B-V2-3",
          "judul": "Bagan",
          "ketukan": [
            "Bagan: seluruh ayam 80, sisa 45, dan yang dijual belum diketahui.",
            "Untuk mencari ayam yang dijual, kurangi ayam mula-mula dengan sisa ayam.",
            "Kita hitung 80 − 45 = 35.",
            "METODE LUAR · Selisih Banding: Berapa lebih banyak/sedikit."
          ],
          "papan": [
            "Bagan: 80 = ? + 45",
            "Mula-mula dikurangi sisa",
            "80 − 45 = 35",
            "Dijual 35 ekor"
          ]
        }
      ]
    },
    {
      "id": "K3B2B-V3",
      "judul": "Siap pakai Bar Model Subtract",
      "subjudul": "Bar Model Subtract",
      "adegan": [
        {
          "id": "K3B2B-V3-1",
          "judul": "Dijual 45 ekor",
          "ketukan": [
            "Hari ini Pak Slamet menjual 45 ekor ayam di pasar.",
            "Ayam yang tersisa di kandang ada 27 ekor.",
            "Banyak ayam mula-mula belum diketahui.",
            "Ingat cara Model Batang Kurang: Batang utuh dikurangi bagian. Ingat cara Model Batang Kurang: Batang utuh dikurangi bagian."
          ],
          "papan": [
            "Dijual 45 ekor",
            "Sisa 27 ekor",
            "Mula-mula belum diketahui",
            "Berapa ayam mula-mula?"
          ]
        },
        {
          "id": "K3B2B-V3-2",
          "judul": "Kalimatnya",
          "ketukan": [
            "Tabel: ayam mula-mula belum diketahui, dijual 45, sisa 27.",
            "Kalimat Matematikanya adalah … − 45 = 27.",
            "Kita ingat bahwa 72 − 45 = 27.",
            "Di sini kita memakai ide Bar Model Subtract — Batang utuh dikurangi bagian. Di sini kita memakai Bar Model Subtract. Batang utuh dikurangi bagian."
          ],
          "papan": [
            "…, 45 ekor, 27 ekor",
            "… − 45 = 27",
            "72 − 45 = 27",
            "Bagaimana mencari 72?"
          ]
        },
        {
          "id": "K3B2B-V3-3",
          "judul": "Bagan",
          "ketukan": [
            "Bagan: ayam yang dijual 45 dan sisa 27 membentuk ayam mula-mula.",
            "Untuk mencari ayam mula-mula, tambahkan ayam yang dijual dan sisa ayam.",
            "Kita hitung 45 + 27 = 72.",
            "METODE LUAR · Model Batang Kurang: Batang utuh dikurangi bagian."
          ],
          "papan": [
            "Bagan: ? = 45 + 27",
            "Dijual ditambah sisa",
            "45 + 27 = 72",
            "Mula-mula 72 ekor"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Apa yang ditanyakan pada Kalimat Matematika Berkaitan dengan Pengurangan Bilangan Cacah?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Take Away",
      "stepDesc": "Kurangi berarti mengambil sebagian.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Comparison Difference",
      "stepDesc": "Berapa lebih banyak/sedikit.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Bar Model Subtract",
      "stepDesc": "Batang utuh dikurangi bagian.",
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
      "judul": "Kalimat Matematika",
      "emoji": "📘",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Bentuk pengurangan yang memuat titik-titik disebut kalimat Matematika. Titik-titik menunjukkan bilangan yang belum diketahui."
    },
    {
      "judul": "Mencari yang Dikurangkan",
      "emoji": "❓",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Bila bilangan yang dikurangkan belum diketahui, kurangi bilangan awal dengan sisanya."
    },
    {
      "judul": "80 − … = 45",
      "emoji": "🐔",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Pak Slamet punya delapan puluh ayam. Sisanya empat puluh lima. Kalimat Matematikanya delapan puluh kurang titik-titik sama dengan empat puluh lima."
    },
    {
      "judul": "Bagan Pengurangan",
      "emoji": "📊",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Batang atas menunjukkan bilangan awal. Dua batang di bawahnya menunjukkan bagian yang dikurangkan dan sisanya. Satu bagian bertanda tanya."
    },
    {
      "judul": "Awal Dikurangi Sisa",
      "emoji": "➖",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Untuk mencari bilangan yang dikurangkan, kurangi bilangan awal dengan sisanya. Delapan puluh dikurangi empat puluh lima sama dengan tiga puluh lima."
    },
    {
      "judul": "… − 45 = 27",
      "emoji": "🔎",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Titik-titik kurang empat puluh lima sama dengan dua puluh tujuh. Bilangan awalnya belum diketahui. Kita tambahkan empat puluh lima dan dua puluh tujuh, hasilnya tujuh puluh dua."
    },
    {
      "judul": "Awal = Dikurangkan + Sisa",
      "emoji": "➕",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Untuk mencari bilangan awal, tambahkan bilangan yang dikurangkan dengan sisanya. Empat puluh lima tambah dua puluh tujuh sama dengan tujuh puluh dua."
    },
    {
      "judul": "Memeriksa",
      "emoji": "✅",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Periksa hasilmu dengan mengurangkan lagi. Delapan puluh dikurangi tiga puluh lima sama dengan empat puluh lima, jadi jawabannya benar."
    },
    {
      "judul": "Banyak Kemungkinan",
      "emoji": "🔀",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Bila hanya bilangan awalnya yang diketahui, ada banyak kemungkinan. Terjual empat puluh lima dan sisa lima puluh lima, atau terjual enam puluh dan sisa empat puluh, sama-sama seratus."
    },
    {
      "judul": "Cara Mengisi",
      "emoji": "📝",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Empat langkah. Satu, baca kalimat Matematikanya. Dua, lihat bilangan yang diketahui. Tiga, kurangkan atau tambahkan sesuai letak titik-titik. Empat, periksa dengan mengurangkan lagi."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "build-unknown",
      "title": "Rakit yang Belum Diketahui",
      "bookReference": "hlm. 88–90 (Aktivitas 2: permen dua anak dan ayam Pak Slamet)",
      "objective": "Pakai Mengambil: Kurangi berarti mengambil sebagian. Latihan: Merakit kumpulan benda yang belum diketahui pada kalimat Matematika pengurangan, termasuk menukar sepuluh benda menjadi satu bungkus..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca cerita dan melihat gambar kumpulan yang diketahui, lalu merakit kumpulan yang belum diketahui dengan tombol tambah dan kurang. Sepuluh benda otomatis ditukar satu bungkus. Saat bermain, ingat Mengambil: Kurangi berarti mengambil sebagian.",
      "voiceGuide": "Mengambil. Kurangi berarti mengambil sebagian.",
      "emoji": "🧺",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "count-unknown",
      "title": "Hitung yang Belum Diketahui",
      "bookReference": "hlm. 88–90 (Aktivitas 2: permen dua anak dan ayam Pak Slamet)",
      "objective": "Pakai Mengambil: Kurangi berarti mengambil sebagian. Latihan: Menghitung banyak benda yang belum diketahui dari gambar kumpulan dan memilih hasilnya..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Gambar kumpulan ditampilkan dengan kotak tanda tanya pada bagian yang belum diketahui. Siswa memilih satu dari tiga nilai. Pengecoh salah sepuluh atau salah satu. Saat bermain, ingat Mengambil: Kurangi berarti mengambil sebagian.",
      "voiceGuide": "Mengambil. Kurangi berarti mengambil sebagian.",
      "emoji": "❓",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "write-sentence",
      "title": "Tulis Kalimat Matematika",
      "bookReference": "hlm. 88–90 (Aktivitas 2: permen dua anak dan ayam Pak Slamet)",
      "objective": "Pakai Mengambil: Kurangi berarti mengambil sebagian. Latihan: Memilih kalimat Matematika pengurangan yang sesuai dengan gambar kumpulan benda..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa melihat gambar kumpulan, lalu memilih satu dari tiga kalimat Matematika. Pengecoh menukar hasil dengan bilangan yang diketahui atau membalik tanda. Saat bermain, ingat Mengambil: Kurangi berarti mengambil sebagian.",
      "voiceGuide": "Mengambil. Kurangi berarti mengambil sebagian.",
      "emoji": "✍️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "match-picture-sentence",
      "title": "Jodohkan Gambar dan Kalimat",
      "bookReference": "hlm. 88–90 (Aktivitas 2: permen dua anak dan ayam Pak Slamet)",
      "objective": "Pakai Mengambil: Kurangi berarti mengambil sebagian. Latihan: Menjodohkan gambar kumpulan benda dengan kalimat Matematikanya..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga gambar dan tiga kalimat Matematika. Siswa mengetuk gambar, lalu mengetuk kalimat yang cocok. Saat bermain, ingat Mengambil: Kurangi berarti mengambil sebagian.",
      "voiceGuide": "Mengambil. Kurangi berarti mengambil sebagian.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "memory-picture-value",
      "title": "Memori Gambar dan Nilai",
      "bookReference": "hlm. 88–90 (Aktivitas 2: permen dua anak dan ayam Pak Slamet)",
      "objective": "Mencocokkan gambar kumpulan benda dengan nilai yang belum diketahui lewat permainan memori.. Ingat Mengambil. (Mengambil)",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): gambar kumpulan dan nilainya. Siswa membalik dua kartu dan mencari pasangannya. Gunakan Mengambil.",
      "voiceGuide": "Mengambil. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-picture-value",
      "title": "Ketuk Gambar dengan Nilai",
      "bookReference": "hlm. 88–90 (Aktivitas 2: permen dua anak dan ayam Pak Slamet)",
      "objective": "Menemukan gambar yang nilai belum diketahuinya sama dengan bilangan yang diminta.. Ingat Mengambil. (Mengambil)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga gambar dan dua pertanyaan. Siswa mengetuk gambar yang nilai belum diketahuinya sama dengan bilangan yang disebut. Gunakan Mengambil.",
      "voiceGuide": "Mengambil. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-value-compare",
      "title": "Ketuk Semua Nilai Lebih atau Kurang",
      "bookReference": "hlm. 88–90 (Aktivitas 2: permen dua anak dan ayam Pak Slamet)",
      "objective": "Menemukan semua gambar yang nilai belum diketahuinya lebih atau kurang dari bilangan acuan.. Ingat Mengambil. (Mengambil)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat gambar dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. Gunakan Mengambil.",
      "voiceGuide": "Mengambil. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-sentence",
      "title": "Cerita Kalimat Matematika",
      "bookReference": "hlm. 90–95 (Pengamatan 1 dan 2: ayam Pak Slamet)",
      "objective": "Menyelesaikan cerita pengurangan dengan bilangan yang belum diketahui dan gambar kumpulan benda.. Ingat Mengambil. (Mengambil)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita, melihat gambar kumpulan, lalu memilih nilai yang belum diketahui. Gunakan Mengambil.",
      "voiceGuide": "Mengambil. Mainkan dengan teliti.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "board-value-collection",
      "title": "Papan Nilai Kumpulan",
      "bookReference": "hlm. 88–90 (Aktivitas 2: permen dua anak dan ayam Pak Slamet)",
      "objective": "Menulis nilai yang belum diketahui pada papan puluhan dan satuan.. Ingat Mengambil. (Mengambil)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa menghitung nilai yang belum diketahui dari gambar kumpulan, lalu mengatur angka puluhan dan satuan pada papan dan menekan Periksa. Gunakan Mengambil.",
      "voiceGuide": "Mengambil. Mainkan dengan teliti.",
      "emoji": "🗂️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-picture-value",
      "title": "Urutkan Gambar menurut Nilai",
      "bookReference": "hlm. 88–90 (Aktivitas 2: permen dua anak dan ayam Pak Slamet)",
      "objective": "Mengurutkan tiga gambar menurut nilai yang belum diketahuinya.. Ingat Mengambil. (Mengambil)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga gambar bertanda huruf. Siswa mengetuk gambar satu per satu dari nilai paling kecil atau paling besar. Gunakan Mengambil.",
      "voiceGuide": "Mengambil. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 9
    },
    {
      "stage": "Picture",
      "gameType": "count-bar",
      "title": "Hitung Bagan",
      "bookReference": "hlm. 88–90 (Aktivitas 2: permen dua anak dan ayam Pak Slamet)",
      "objective": "Pakai Selisih Banding: Berapa lebih banyak/sedikit. Latihan: Menghitung nilai yang belum diketahui dari bagan bagian dan keseluruhan..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Bagan batang menampilkan keseluruhan dan dua bagian, salah satunya bertanda tanya. Siswa memilih satu dari tiga nilai. Saat bermain, ingat Selisih Banding: Berapa lebih banyak/sedikit.",
      "voiceGuide": "Selisih Banding. Berapa lebih banyak/sedikit.",
      "diagramType": "bar-count",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "complete-sentence-bar",
      "title": "Lengkapi Kalimat dari Bagan",
      "bookReference": "hlm. 92 dan 95 (Contoh: 32 − … = 15 dan … − 12 = 26)",
      "objective": "Pakai Selisih Banding: Berapa lebih banyak/sedikit. Latihan: Melengkapi langkah mencari nilai yang belum diketahui: kurangi atau tambahkan sesuai letak bilangan yang belum diketahui, mengisi kalimat, lalu memeriksa..",
      "mechanicDescription": "Tiga soal, tiap soal tiga kalimat, misalnya cari dengan operasi kebalikan, isi kalimat Matematika, lalu periksa. Siswa memilih satu dari tiga angka untuk bagian kosong. Saat bermain, ingat Selisih Banding: Berapa lebih banyak/sedikit.",
      "voiceGuide": "Selisih Banding. Berapa lebih banyak/sedikit.",
      "diagramType": "bar-sentence",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "match-bar-sentence",
      "title": "Jodohkan Bagan dan Kalimat",
      "bookReference": "hlm. 88–90 (Aktivitas 2: permen dua anak dan ayam Pak Slamet)",
      "objective": "Pakai Selisih Banding: Berapa lebih banyak/sedikit. Latihan: Menjodohkan bagan dengan kalimat Matematikanya..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga bagan dan tiga kalimat Matematika. Siswa mengetuk bagan, lalu mengetuk kalimat yang cocok. Saat bermain, ingat Selisih Banding: Berapa lebih banyak/sedikit.",
      "voiceGuide": "Selisih Banding. Berapa lebih banyak/sedikit.",
      "diagramType": "bar-match",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memory-bar-value",
      "title": "Memori Bagan dan Nilai",
      "bookReference": "hlm. 88–90 (Aktivitas 2: permen dua anak dan ayam Pak Slamet)",
      "objective": "Pakai Selisih Banding: Berapa lebih banyak/sedikit. Latihan: Mencocokkan bagan dengan nilai yang belum diketahui lewat permainan memori..",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. Saat bermain, ingat Selisih Banding: Berapa lebih banyak/sedikit.",
      "voiceGuide": "Selisih Banding. Berapa lebih banyak/sedikit.",
      "diagramType": "bar-memory",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "fill-sentence-table",
      "title": "Isi Tabel Kalimat Matematika",
      "bookReference": "hlm. 92 dan 95 (Contoh: 32 − … = 15 dan … − 12 = 26)",
      "objective": "Melengkapi tabel kalimat Matematika dan nilai yang belum diketahui.. Ingat Selisih Banding. (Selisih Banding)",
      "mechanicDescription": "Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu nilai yang tepat. Ada satu kartu pengecoh. Gunakan Selisih Banding.",
      "voiceGuide": "Selisih Banding. Mainkan dengan teliti.",
      "diagramType": "sentence-table",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-bar-compare",
      "title": "Ketuk Semua Bagan Lebih atau Kurang",
      "bookReference": "hlm. 97–98 (Latihan 2)",
      "objective": "Menemukan semua bagan yang nilai belum diketahuinya lebih atau kurang dari bilangan acuan.. Ingat Selisih Banding. (Selisih Banding)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat bagan dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. Gunakan Selisih Banding.",
      "voiceGuide": "Selisih Banding. Mainkan dengan teliti.",
      "diagramType": "bar-select",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-bar-position",
      "title": "Pilah Bagan: Depan atau Tengah",
      "bookReference": "hlm. 92 dan 95 (Contoh: 32 − … = 15 dan … − 12 = 26)",
      "objective": "Memilah bagan menjadi yang bilangan belum diketahuinya di depan dan yang di tengah kalimat.. Ingat Selisih Banding. (Selisih Banding)",
      "mechanicDescription": "Tiga ronde, tiap ronde enam bagan dan dua kotak. Siswa menyeret atau mengetuk bagan ke kotak yang tepat. Gunakan Selisih Banding.",
      "voiceGuide": "Selisih Banding. Mainkan dengan teliti.",
      "diagramType": "bar-sort",
      "numberA": 3,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "order-find-steps",
      "title": "Urutkan Langkah Mencari Nilai",
      "bookReference": "hlm. 92 dan 95 (Contoh: 32 − … = 15 dan … − 12 = 26)",
      "objective": "Mengurutkan langkah mencari nilai yang belum diketahui pada kalimat Matematika.. Ingat Selisih Banding. (Selisih Banding)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat langkah. Siswa mengetuk langkah satu per satu menurut urutan yang benar. Letak jawaban berpindah. Gunakan Selisih Banding.",
      "voiceGuide": "Selisih Banding. Mainkan dengan teliti.",
      "diagramType": "steps-order",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "board-value-bar",
      "title": "Papan Nilai dari Bagan",
      "bookReference": "hlm. 97–98 (Latihan 2)",
      "objective": "Menulis nilai yang belum diketahui dari bagan pada papan puluhan dan satuan.. Ingat Selisih Banding. (Selisih Banding)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca bagan, lalu mengatur angka puluhan dan satuan pada papan dan menekan Periksa. Gunakan Selisih Banding.",
      "voiceGuide": "Selisih Banding. Mainkan dengan teliti.",
      "diagramType": "bar-board",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "possible-pairs",
      "title": "Kemungkinan Pasangan Bilangan",
      "bookReference": "hlm. 96 (Ayo Berpikir: telur di pasar)",
      "objective": "Menemukan semua pasangan bilangan yang mungkin untuk keseluruhan yang sama.. Ingat Selisih Banding. (Selisih Banding)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat pasangan dan satu perintah. Siswa mengetuk semua pasangan yang jumlahnya sama dengan keseluruhan, lalu menekan Periksa. Gunakan Selisih Banding.",
      "voiceGuide": "Selisih Banding. Mainkan dengan teliti.",
      "diagramType": "pairs-select",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Abstract",
      "gameType": "fill-unknown",
      "title": "Isi Nilai yang Belum Diketahui",
      "bookReference": "hlm. 92 dan 95 (Contoh: 32 − … = 15 dan … − 12 = 26)",
      "objective": "Pakai Model Batang Kurang: Batang utuh dikurangi bagian. Latihan: Mencari nilai yang belum diketahui pada kalimat Matematika pengurangan dan memilihnya dari tiga pilihan..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal, misalnya 80 − … = 45 dan … − 45 = 27. Pengecoh salah sepuluh atau salah satu. Saat bermain, ingat Model Batang Kurang: Batang utuh dikurangi bagian.",
      "voiceGuide": "Model Batang Kurang. Batang utuh dikurangi bagian.",
      "symbolLarge": "?",
      "wordLarge": "ISI NILAI",
      "mathNotation": "nilai yang belum diketahui"
    },
    {
      "stage": "Abstract",
      "gameType": "board-value",
      "title": "Papan Nilai",
      "bookReference": "hlm. 97–98 (Latihan 2)",
      "objective": "Pakai Model Batang Kurang: Batang utuh dikurangi bagian. Latihan: Menulis nilai yang belum diketahui pada papan puluhan dan satuan..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa mengatur angka puluhan dan satuan lalu menekan Periksa. Saat bermain, ingat Model Batang Kurang: Batang utuh dikurangi bagian.",
      "voiceGuide": "Model Batang Kurang. Batang utuh dikurangi bagian.",
      "symbolLarge": "…",
      "wordLarge": "PAPAN",
      "mathNotation": "puluhan • satuan"
    },
    {
      "stage": "Abstract",
      "gameType": "solve-steps",
      "title": "Langkah Menyelesaikan",
      "bookReference": "hlm. 92 dan 95 (Contoh: 32 − … = 15 dan … − 12 = 26)",
      "objective": "Pakai Model Batang Kurang: Batang utuh dikurangi bagian. Latihan: Melengkapi langkah mencari nilai, mengisi kalimat, dan memeriksa hasilnya..",
      "mechanicDescription": "Tiga soal, tiap soal tiga kalimat, misalnya cari dengan operasi kebalikan. Siswa memilih satu dari tiga angka. Saat bermain, ingat Model Batang Kurang: Batang utuh dikurangi bagian.",
      "voiceGuide": "Model Batang Kurang. Batang utuh dikurangi bagian.",
      "symbolLarge": "→",
      "wordLarge": "LANGKAH",
      "mathNotation": "cari • isi • periksa"
    },
    {
      "stage": "Abstract",
      "gameType": "match-sentence-value",
      "title": "Jodohkan Kalimat dan Nilai",
      "bookReference": "hlm. 97–98 (Latihan 2)",
      "objective": "Pakai Model Batang Kurang: Batang utuh dikurangi bagian. Latihan: Menjodohkan kalimat Matematika dengan nilai yang belum diketahuinya..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga kalimat dan tiga nilai. Siswa mengetuk kalimat, lalu mengetuk nilai yang cocok. Saat bermain, ingat Model Batang Kurang: Batang utuh dikurangi bagian.",
      "voiceGuide": "Model Batang Kurang. Batang utuh dikurangi bagian.",
      "symbolLarge": "= …",
      "wordLarge": "JODOHKAN",
      "mathNotation": "kalimat • nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-sentence-value",
      "title": "Memori Kalimat dan Nilai",
      "bookReference": "hlm. 97–98 (Latihan 2)",
      "objective": "Mencocokkan kalimat Matematika dengan nilainya lewat permainan memori.. Ingat Model Batang Kurang. (Model Batang Kurang)",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): kalimat dan nilai. Siswa membalik dua kartu dan mencari pasangannya. Gunakan Model Batang Kurang.",
      "voiceGuide": "Model Batang Kurang. Mainkan dengan teliti.",
      "symbolLarge": "= ?",
      "wordLarge": "MEMORI",
      "mathNotation": "kalimat • nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-sentence",
      "title": "Benar atau Salah: Kalimat Matematika",
      "bookReference": "hlm. 92 dan 95 (Contoh: 32 − … = 15 dan … − 12 = 26)",
      "objective": "Menilai pernyataan tentang kalimat Matematika dan cara mencari nilainya.. Ingat Model Batang Kurang. (Model Batang Kurang)",
      "mechanicDescription": "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Tiap jawaban diberi penjelasan. Gunakan Model Batang Kurang.",
      "voiceGuide": "Model Batang Kurang. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "periksa dengan alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-sentence",
      "title": "Detektif Kalimat Matematika",
      "bookReference": "hlm. 92 dan 95 (Contoh: 32 − … = 15 dan … − 12 = 26)",
      "objective": "Menemukan bilangan yang belum diketahui dari dua petunjuk.. Ingat Model Batang Kurang. (Model Batang Kurang)",
      "mechanicDescription": "Empat soal. Siswa membaca petunjuk seperti nilai pada sebuah kalimat Matematika dan satu ciri bilangan, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok. Gunakan Model Batang Kurang.",
      "voiceGuide": "Model Batang Kurang. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "dua petunjuk, satu jawaban"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-map-sentence",
      "title": "Peta Konsep Kalimat Matematika",
      "bookReference": "hlm. 76 (peta konsep: kalimat Matematika)",
      "objective": "Melengkapi peta konsep kalimat Matematika pengurangan dan cara mencari nilainya.. Ingat Model Batang Kurang. (Model Batang Kurang)",
      "mechanicDescription": "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. Gunakan Model Batang Kurang.",
      "voiceGuide": "Model Batang Kurang. Mainkan dengan teliti.",
      "symbolLarge": "⇄",
      "wordLarge": "PETA KONSEP",
      "mathNotation": "kalimat • nilai • cari"
    },
    {
      "stage": "Abstract",
      "gameType": "story-sentence-abstract",
      "title": "Soal Cerita Kalimat Matematika",
      "bookReference": "hlm. 97–98 (Latihan 2)",
      "objective": "Menyelesaikan soal cerita pengurangan dengan bilangan yang belum diketahui.. Ingat Model Batang Kurang. (Model Batang Kurang)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita lalu memilih satu dari tiga nilai. Pengecoh salah sepuluh atau salah satu. Gunakan Model Batang Kurang.",
      "voiceGuide": "Model Batang Kurang. Mainkan dengan teliti.",
      "symbolLarge": "…",
      "wordLarge": "CERITA",
      "mathNotation": "nilai yang belum diketahui"
    },
    {
      "stage": "Abstract",
      "gameType": "sentence-words",
      "title": "Susun Kata Kalimat Matematika",
      "bookReference": "hlm. 90–95 (Pengamatan 1 dan 2: ayam Pak Slamet)",
      "objective": "Menyusun kalimat tentang kalimat Matematika dari kartu kata.. Ingat Model Batang Kurang. (Model Batang Kurang)",
      "mechanicDescription": "Empat kalimat. Siswa mengetuk kartu kata satu per satu menurut urutan kalimat yang benar. Ada satu kartu pengecoh. Gunakan Model Batang Kurang.",
      "voiceGuide": "Model Batang Kurang. Mainkan dengan teliti.",
      "symbolLarge": "…",
      "wordLarge": "SUSUN KATA",
      "mathNotation": "kalimat Matematika"
    }
  ],
  "poin": [
    {
      "ikon": "📘",
      "nama": "Kalimat Matematika",
      "isi": "80 − … = 45",
      "suara": "Bentuk pengurangan yang memuat titik-titik disebut kalimat Matematika."
    },
    {
      "ikon": "🌍",
      "nama": "Mengambil",
      "isi": "Kurangi berarti mengambil sebagian.",
      "suara": "Mengambil. Kurangi berarti mengambil sebagian."
    },
    {
      "ikon": "🌍",
      "nama": "Selisih Banding",
      "isi": "Berapa lebih banyak/sedikit.",
      "suara": "Selisih Banding. Berapa lebih banyak/sedikit."
    },
    {
      "ikon": "🌍",
      "nama": "Model Batang Kurang",
      "isi": "Batang utuh dikurangi bagian.",
      "suara": "Model Batang Kurang. Batang utuh dikurangi bagian."
    }
  ],
  "poinSuara": "Ingat: Mengambil, Selisih Banding, Model Batang Kurang.",
  "cara": {
    "suara": "Cara mengisi. Baca kalimat Matematikanya. Lihat letak titik-titik. Kurangkan atau tambahkan. Lalu periksa dengan mengurangkan lagi.",
    "potongan": [
      {
        "teks": "baca kalimat",
        "warna": "#BAE6FD"
      },
      {
        "teks": "lihat titik-titik",
        "warna": "#FECACA"
      },
      {
        "teks": "kurang atau tambah",
        "warna": "#BFDBFE"
      },
      {
        "teks": "periksa",
        "warna": "#FDE68A"
      }
    ]
  },
  "rumah": "Ayo Mencoba: terapkan Mengambil pada satu soal nyata di rumah.",
  "refleksi": [
    "Bagaimana Mengambil membantumu?",
    "Kapan memakai Selisih Banding?",
    "Apa bedanya dengan hanya menghafal tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Take Away",
      "namaId": "Mengambil",
      "asal": "Subtraction meanings",
      "ringkas": "Kurangi berarti mengambil sebagian.",
      "tahap": [
        "Story",
        "Concrete"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Comparison Difference",
      "namaId": "Selisih Banding",
      "asal": "Van de Walle",
      "ringkas": "Berapa lebih banyak/sedikit.",
      "tahap": [
        "Picture",
        "Mind"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Bar Model Subtract",
      "namaId": "Model Batang Kurang",
      "asal": "Singapore bar model",
      "ringkas": "Batang utuh dikurangi bagian.",
      "tahap": [
        "Infografis",
        "Abstract"
      ]
    }
  ]
};

export const SUB_BAB_K3B2: SubBabNaskah[] = [SUB_A32, SUB_B32];
export const semuaAdeganK3B2 = SUB_BAB_K3B2.flatMap((s) => s.videos.flatMap((v) => v.adegan));
