/**
 * Naskah — poles kerapatan setara K5B4.
 * Metode luar dianyam ketukan per ketukan.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K4B5_META = {
  "chapterId": "k4-mat-bab5",
  "phaseCode": "FASE_B",
  "grade": 4,
  "subjectLabel": "MATEMATIKA - KELAS 4 SD",
  "title": "BAB 5: BANGUN DATAR",
  "silabusElemen": "🌈 Fase B • Elemen Geometri: Ciri-Ciri Bangun Datar serta Komposisi dan Dekomposisi (Kelas 4 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A45: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Ciri-Ciri Bangun Datar)",
  "fullTitle": "Sub-Bab A: Ciri-Ciri Bangun Datar",
  "targetDescription": "Siswa mengenal segi banyak, membedakan beraturan/tak beraturan, mengelompokkan segitiga (sisi & sudut), serta menyebutkan ciri segiempat (persegi, persegi panjang, jajargenjang, belah ketupat, layang-layang, trapesium) sesuai Buku Siswa Kelas IV Bab 5. Siswa memakai cara van Hiele Visual–Analisis, Pilah Ciri, Papan Paku. Siswa memakai cara van Hiele Visual–Analisis, Pilah Ciri, Papan Paku.",
  "secondaryBg": "#FFEDD5",
  "secondaryBorder": "#EA580C",
  "secondaryText": "#7C2D12",
  "silabus": {
    "teksSuara": "Kita belajar ciri-ciri bangun datar. Segi banyak adalah kurva tertutup paling sedikit tiga ruas garis. Ada yang beraturan dan tak beraturan. Segitiga dikelompokkan menurut sisi dan sudut. Segiempat punya banyak keluarga: persegi, persegi panjang, dan lainnya. Kita memakai cara: van Hiele Visual–Analisis, Pilah Ciri, Papan Paku. Mulai kenali bentuk, lalu sebut ciri sisi dan sudut. Kelompokkan menurut sisi, sudut, atau sejajar. Bentuk karet di paku untuk menguji ciri. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menjelaskan ciri-ciri bangun datar segi banyak, segitiga, dan segiempat.",
    "referensi": "Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 5 Sub-Bab A)."
  },
  "videos": [
    {
      "id": "K4B5A-V1",
      "judul": "Apa itu Segi Banyak?",
      "subjudul": "van Hiele Level 0-1",
      "adegan": [
        {
          "id": "K4B5A-V1-1",
          "judul": "Bukan sembarang gambar",
          "ketukan": [
            "Bayangkan kamu sedang mempelajari Ciri-Ciri Bangun Datar. Lihat garis yang tertutup.",
            "Paling sedikit tiga ruas lurus.",
            "Itulah segi banyak.",
            "Ingat cara van Hiele Visual–Analisis: Mulai kenali bentuk, lalu sebut ciri sisi dan sudut. Ingat cara van Hiele Visual–Analisis: Mulai kenali bentuk, lalu sebut ciri sisi dan sudut."
          ],
          "papan": [
            "tertutup",
            "≥3 sisi",
            "segi banyak",
            "bukan lingkaran"
          ]
        },
        {
          "id": "K4B5A-V1-2",
          "judul": "Nama mengikuti sisi",
          "ketukan": [
            "Tiga sisi: segitiga.",
            "Empat sisi: segiempat.",
            "Lima sisi: segilima.",
            "Di sini kita memakai ide van Hiele Level 0-1 — Mulai kenali bentuk, lalu sebut ciri sisi dan sudut. Di sini kita memakai van Hiele Level 0-1. Mulai kenali bentuk, lalu sebut ciri sisi dan sudut."
          ],
          "papan": [
            "langkah 1",
            "langkah 2",
            "langkah 3",
            "langkah 4"
          ]
        },
        {
          "id": "K4B5A-V1-3",
          "judul": "Beraturan",
          "ketukan": [
            "Semua sisi sama panjang.",
            "Semua sudut sama besar.",
            "Itu segi banyak beraturan.",
            "METODE LUAR · van Hiele Visual–Analisis: Mulai kenali bentuk, lalu sebut ciri sisi dan sudut."
          ],
          "papan": [
            "sisi sama",
            "sudut sama",
            "beraturan",
            "tak"
          ]
        }
      ]
    },
    {
      "id": "K4B5A-V2",
      "judul": "Latihan: Pilah Ciri",
      "subjudul": "Attribute Sort",
      "adegan": [
        {
          "id": "K4B5A-V2-1",
          "judul": "Menurut sisi",
          "ketukan": [
            "Sama sisi: ketiga sisi sama.",
            "Sama kaki: dua sisi sama.",
            "Sembarang: semua sisi beda.",
            "Ingat cara Pilah Ciri: Kelompokkan menurut sisi, sudut, atau sejajar. Ingat cara Pilah Ciri: Kelompokkan menurut sisi, sudut, atau sejajar."
          ],
          "papan": [
            "sama sisi",
            "sama kaki",
            "sembarang",
            "amati"
          ]
        },
        {
          "id": "K4B5A-V2-2",
          "judul": "Menurut sudut",
          "ketukan": [
            "Lancip: semua sudut lancip.",
            "Siku-siku: ada sudut sembilan puluh.",
            "Tumpul: ada sudut lebih dari sembilan puluh.",
            "Di sini kita memakai ide Attribute Sort — Kelompokkan menurut sisi, sudut, atau sejajar. Di sini kita memakai Attribute Sort. Kelompokkan menurut sisi, sudut, atau sejajar."
          ],
          "papan": [
            "lancip",
            "siku-siku",
            "tumpul",
            "satu jenis"
          ]
        },
        {
          "id": "K4B5A-V2-3",
          "judul": "Contoh buku",
          "ketukan": [
            "Segitiga KLM siku di K.",
            "Segitiga PQR tumpul di P.",
            "Ciri membantu memberi nama.",
            "METODE LUAR · Pilah Ciri: Kelompokkan menurut sisi, sudut, atau sejajar."
          ],
          "papan": [
            "KLM",
            "PQR",
            "ciri",
            "lanjut"
          ]
        }
      ]
    },
    {
      "id": "K4B5A-V3",
      "judul": "Siap pakai Geoboard",
      "subjudul": "Geoboard",
      "adegan": [
        {
          "id": "K4B5A-V3-1",
          "judul": "Persegi & persegi panjang",
          "ketukan": [
            "Persegi: semua sisi sama, semua siku.",
            "Persegi panjang: siku semua,.",
            "sisi berhadapan sama.",
            "Ingat cara Papan Paku: Bentuk karet di paku untuk menguji ciri. Ingat cara Papan Paku: Bentuk karet di paku untuk menguji ciri."
          ],
          "papan": [
            "persegi",
            "persegi panjang",
            "siku",
            "sejajar"
          ]
        },
        {
          "id": "K4B5A-V3-2",
          "judul": "Jajargenjang & belah ketupat",
          "ketukan": [
            "Jajargenjang: dua pasang sejajar.",
            "Belah ketupat: semua sisi sama.",
            "Layang-layang: sisi berdekatan sama.",
            "Di sini kita memakai ide Geoboard — Bentuk karet di paku untuk menguji ciri. Di sini kita memakai Geoboard. Bentuk karet di paku untuk menguji ciri."
          ],
          "papan": [
            "jajargenjang",
            "belah ketupat",
            "layang",
            "trapesium"
          ]
        },
        {
          "id": "K4B5A-V3-3",
          "judul": "Siap berlatih",
          "ketukan": [
            "Ciri membedakan bangun.",
            "Hitung sisi dan sudut.",
            "Pilah beraturan.",
            "METODE LUAR · Papan Paku: Bentuk karet di paku untuk menguji ciri."
          ],
          "papan": [
            "ciri",
            "hitung",
            "pilah",
            "main"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Ciri-Ciri Bangun Datar dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa mengenal segi banyak, membedakan beraturan/tak beraturan, mengelompokkan segitiga (sisi & sudut), serta menyebutka….",
      "icon": "❓",
      "flowFrom": "Pahami soal",
      "flowTo": "van Hiele Level 0-1"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. van Hiele Level 0-1",
      "stepDesc": "Mulai kenali bentuk, lalu sebut ciri sisi dan sudut. Pada Ciri-Ciri Bangun Datar, langkah “van Hiele Level 0-1” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: van Hiele Visual–Analisis: Mulai kenali bentuk, lalu sebut ciri sisi dan sudut. Pilah Ciri: Kelompokkan menurut sisi, sudut, atau sejajar. Papan Paku: Bentuk ka…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🧭",
      "flowFrom": "van Hiele Level 0-1",
      "flowTo": "Attribute Sort"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Attribute Sort",
      "stepDesc": "Kelompokkan menurut sisi, sudut, atau sejajar. Pada Ciri-Ciri Bangun Datar, langkah “Attribute Sort” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: van Hiele Visual–Analisis: Mulai kenali bentuk, lalu sebut ciri sisi dan sudut. Pilah Ciri: Kelompokkan menurut sisi, sudut, atau sejajar. Papan Paku: Bentuk ka…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🛠️",
      "flowFrom": "Attribute Sort",
      "flowTo": "Geoboard"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Geoboard",
      "stepDesc": "Bentuk karet di paku untuk menguji ciri. Pada Ciri-Ciri Bangun Datar, langkah “Geoboard” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: van Hiele Visual–Analisis: Mulai kenali bentuk, lalu sebut ciri sisi dan sudut. Pilah Ciri: Kelompokkan menurut sisi, sudut, atau sejajar. Papan Paku: Bentuk ka…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "✨",
      "flowFrom": "Geoboard",
      "flowTo": "Kerjakan"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Kerjakan",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Ciri-Ciri Bangun Datar. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "✏️",
      "flowFrom": "Kerjakan",
      "flowTo": "Cek masuk akal"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek masuk akal",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Ciri-Ciri Bangun Datar. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Cek masuk akal",
      "flowTo": "Simpulkan"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Simpulkan",
      "stepDesc": "Simpulkan ide utama Ciri-Ciri Bangun Datar dengan kalimatmu sendiri. Sebutkan cara yang kamu pakai dan mengapa cara itu membantu. Jelaskan kepada teman seolah-olah kamu guru kecil. Simpulan yang jelas menandakan konsepnya sudah dipahami.",
      "icon": "💬",
      "flowFrom": "Simpulkan",
      "flowTo": "Main"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Main",
      "stepDesc": "Latih lagi di tahap Concrete, Picture, lalu Abstract untuk Ciri-Ciri Bangun Datar. Mulai dari benda nyata, lanjut ke diagram, baru ke lambang angka. Ulangi sampai kamu bisa menjelaskan tanpa melihat contoh. Bermain sambil berlatih membuat konsepnya melekat lebih lama.",
      "icon": "🎮",
      "flowFrom": "Main",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Segi banyak",
      "emoji": "🔷",
      "countNum": 3,
      "countWord": "min sisi",
      "suara": "Segi banyak paling sedikit tiga sisi lurus. Pada Ciri-Ciri Bangun Datar, cocokkan gambar “Segi banyak” dengan artinya (min sisi), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🔷 Segi banyak paling sedikit tiga sisi lurus."
    },
    {
      "judul": "Beraturan",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "sama",
      "suara": "Sisi sama dan sudut sama. Semua sisi sama panjang. Semua sudut sama besar. Ingat: sisi sama; sudut sama; beraturan. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Ciri-Ciri Bangun Datar.",
      "teksVisual": "✅ Beraturan: sama"
    },
    {
      "judul": "Segitiga",
      "emoji": "🔺",
      "countNum": 3,
      "countWord": "sisi",
      "suara": "Tiga sisi dan tiga sudut. Pada Ciri-Ciri Bangun Datar, cocokkan gambar “Segitiga” dengan artinya (sisi), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Ciri-Ciri Bangun…",
      "teksVisual": "🔺 Segitiga: sisi"
    },
    {
      "judul": "Siku-siku",
      "emoji": "📐",
      "countNum": 90,
      "countWord": "derajat",
      "suara": "Ada satu sudut sembilan puluh derajat. Pada Ciri-Ciri Bangun Datar, cocokkan gambar “Siku-siku” dengan artinya (derajat), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "📐 Siku-siku: derajat"
    },
    {
      "judul": "Persegi",
      "emoji": "⬛",
      "countNum": 4,
      "countWord": "siku",
      "suara": "Semua sisi sama, semua sudut siku. Persegi: semua sisi sama, semua siku. Persegi panjang: siku semua,. Ingat: persegi; persegi panjang; siku. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Ciri-Ciri Bangun…",
      "teksVisual": "⬛ Persegi: siku"
    },
    {
      "judul": "Persegi panjang",
      "emoji": "▭",
      "countNum": 4,
      "countWord": "siku",
      "suara": "Semua sudut siku, sisi berhadapan sama. Persegi: semua sisi sama, semua siku. Persegi panjang: siku semua,. Ingat: persegi; persegi panjang; siku. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Ciri-Ciri…",
      "teksVisual": "▭ Persegi panjang: siku"
    },
    {
      "judul": "Jajargenjang",
      "emoji": "▱",
      "countNum": 2,
      "countWord": "sejajar",
      "suara": "Dua pasang sisi sejajar. Jajargenjang: dua pasang sejajar. Belah ketupat: semua sisi sama. Ingat: jajargenjang; belah ketupat; layang. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Ciri-Ciri Bangun Datar.",
      "teksVisual": "▱ Jajargenjang: sejajar"
    },
    {
      "judul": "Trapesium",
      "emoji": "⏢",
      "countNum": 1,
      "countWord": "sejajar",
      "suara": "Satu pasang sisi sejajar. Pada Ciri-Ciri Bangun Datar, cocokkan gambar “Trapesium” dengan artinya (sejajar), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Ciri-Ciri…",
      "teksVisual": "⏢ Trapesium: sejajar"
    },
    {
      "judul": "Segilima",
      "emoji": "⬠",
      "countNum": 5,
      "countWord": "sisi",
      "suara": "Lima sisi, lima sudut. Pada Ciri-Ciri Bangun Datar, cocokkan gambar “Segilima” dengan artinya (sisi), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Ciri-Ciri Bangun Datar.",
      "teksVisual": "⬠ Segilima: sisi"
    },
    {
      "judul": "Siap Sub-Bab B",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "susun",
      "suara": "Berikutnya komposisi dan dekomposisi. Pada Ciri-Ciri Bangun Datar, cocokkan gambar “Siap Sub-Bab B” dengan artinya (susun), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "➡️ Siap Sub-Bab B: susun"
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-sisi",
      "title": "Hitung Sisi dan Sudut",
      "bookReference": "hlm. 144–145",
      "objective": "Pakai van Hiele Visual–Analisis: Mulai kenali bentuk, lalu sebut ciri sisi dan sudut. Latihan: Menghitung sisi/sudut..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat van Hiele Visual–Analisis: Mulai kenali bentuk, lalu sebut ciri sisi dan sudut.",
      "voiceGuide": "van Hiele Visual–Analisis. Mulai kenali bentuk, lalu sebut ciri sisi dan sudut.",
      "emoji": "🔺",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jenis-bangun",
      "title": "Pilih Jenis Bangun",
      "bookReference": "hlm. 145–160",
      "objective": "Pakai van Hiele Visual–Analisis: Mulai kenali bentuk, lalu sebut ciri sisi dan sudut. Latihan: Mengenali jenis..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat van Hiele Visual–Analisis: Mulai kenali bentuk, lalu sebut ciri sisi dan sudut.",
      "voiceGuide": "van Hiele Visual–Analisis. Mulai kenali bentuk, lalu sebut ciri sisi dan sudut.",
      "emoji": "📐",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "beraturan",
      "title": "Beraturan atau Tidak",
      "bookReference": "hlm. 145–147",
      "objective": "Pakai van Hiele Visual–Analisis: Mulai kenali bentuk, lalu sebut ciri sisi dan sudut. Latihan: Membedakan beraturan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat van Hiele Visual–Analisis: Mulai kenali bentuk, lalu sebut ciri sisi dan sudut.",
      "voiceGuide": "van Hiele Visual–Analisis. Mulai kenali bentuk, lalu sebut ciri sisi dan sudut.",
      "emoji": "✅",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-aturan",
      "title": "Pilah Beraturan/Tak",
      "bookReference": "hlm. 145–147",
      "objective": "Pakai van Hiele Visual–Analisis: Mulai kenali bentuk, lalu sebut ciri sisi dan sudut. Latihan: Memilah..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat van Hiele Visual–Analisis: Mulai kenali bentuk, lalu sebut ciri sisi dan sudut.",
      "voiceGuide": "van Hiele Visual–Analisis. Mulai kenali bentuk, lalu sebut ciri sisi dan sudut.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-ciri",
      "title": "Jodohkan Ciri Bangun",
      "bookReference": "hlm. 148–162",
      "objective": "Menjodohkan.. Ingat van Hiele Visual–Analisis. (van Hiele Visual–Analisis)",
      "mechanicDescription": "Tiga ronde. Gunakan van Hiele Visual–Analisis.",
      "voiceGuide": "van Hiele Visual–Analisis. Mainkan dengan teliti.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-ciri",
      "title": "Memori Ciri Bangun",
      "bookReference": "hlm. 148–160",
      "objective": "Memori.. Ingat van Hiele Visual–Analisis. (van Hiele Visual–Analisis)",
      "mechanicDescription": "Tiga ronde. Gunakan van Hiele Visual–Analisis.",
      "voiceGuide": "van Hiele Visual–Analisis. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-bangun",
      "title": "Ketuk Bangun Diminta",
      "bookReference": "hlm. 146–161",
      "objective": "Mengetuk.. Ingat van Hiele Visual–Analisis. (van Hiele Visual–Analisis)",
      "mechanicDescription": "Tiga ronde. Gunakan van Hiele Visual–Analisis.",
      "voiceGuide": "van Hiele Visual–Analisis. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-ciri",
      "title": "Ketuk Semua Sesuai Ciri",
      "bookReference": "hlm. 145–160",
      "objective": "Ketuk semua.. Ingat van Hiele Visual–Analisis. (van Hiele Visual–Analisis)",
      "mechanicDescription": "Tiga ronde. Gunakan van Hiele Visual–Analisis.",
      "voiceGuide": "van Hiele Visual–Analisis. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-ciri",
      "title": "Cerita Rambu dan Meja",
      "bookReference": "hlm. 147–160",
      "objective": "Soal cerita.. Ingat van Hiele Visual–Analisis. (van Hiele Visual–Analisis)",
      "mechanicDescription": "Tiga ronde. Gunakan van Hiele Visual–Analisis.",
      "voiceGuide": "van Hiele Visual–Analisis. Mainkan dengan teliti.",
      "emoji": "🚦",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-sisi",
      "title": "Urutkan Banyak Sisi",
      "bookReference": "hlm. 144–145",
      "objective": "Mengurutkan.. Ingat van Hiele Visual–Analisis. (van Hiele Visual–Analisis)",
      "mechanicDescription": "Tiga ronde. Gunakan van Hiele Visual–Analisis.",
      "voiceGuide": "van Hiele Visual–Analisis. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "gambar-sisi",
      "title": "Diagram Hitung Sisi",
      "bookReference": "hlm. 145",
      "objective": "Pakai Pilah Ciri: Kelompokkan menurut sisi, sudut, atau sejajar. Latihan: Baca diagram..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pilah Ciri: Kelompokkan menurut sisi, sudut, atau sejajar.",
      "voiceGuide": "Pilah Ciri. Kelompokkan menurut sisi, sudut, atau sejajar.",
      "diagramType": "sides",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "gambar-sudut",
      "title": "Diagram Jenis Sudut",
      "bookReference": "hlm. 155–157",
      "objective": "Pakai Pilah Ciri: Kelompokkan menurut sisi, sudut, atau sejajar. Latihan: Lancip/siku/tumpul..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pilah Ciri: Kelompokkan menurut sisi, sudut, atau sejajar.",
      "voiceGuide": "Pilah Ciri. Kelompokkan menurut sisi, sudut, atau sejajar.",
      "diagramType": "angle",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-a",
      "title": "Jodohkan Diagram Bangun",
      "bookReference": "hlm. 148–162",
      "objective": "Pakai Pilah Ciri: Kelompokkan menurut sisi, sudut, atau sejajar. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pilah Ciri: Kelompokkan menurut sisi, sudut, atau sejajar.",
      "voiceGuide": "Pilah Ciri. Kelompokkan menurut sisi, sudut, atau sejajar.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-a",
      "title": "Memori Diagram Bangun",
      "bookReference": "hlm. 145–160",
      "objective": "Pakai Pilah Ciri: Kelompokkan menurut sisi, sudut, atau sejajar. Latihan: Memori..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pilah Ciri: Kelompokkan menurut sisi, sudut, atau sejajar.",
      "voiceGuide": "Pilah Ciri. Kelompokkan menurut sisi, sudut, atau sejajar.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-a",
      "title": "Tabel Sisi–Sudut",
      "bookReference": "hlm. 144–145",
      "objective": "Isi tabel.. Ingat Pilah Ciri. (Pilah Ciri)",
      "mechanicDescription": "Tiga tabel. Gunakan Pilah Ciri.",
      "voiceGuide": "Pilah Ciri. Mainkan dengan teliti.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-a",
      "title": "Ketuk Semua Diagram",
      "bookReference": "hlm. 145–160",
      "objective": "Ketuk semua.. Ingat Pilah Ciri. (Pilah Ciri)",
      "mechanicDescription": "Tiga ronde. Gunakan Pilah Ciri.",
      "voiceGuide": "Pilah Ciri. Mainkan dengan teliti.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-a",
      "title": "Pilah Diagram Beraturan",
      "bookReference": "hlm. 145–147",
      "objective": "Pilah.. Ingat Pilah Ciri. (Pilah Ciri)",
      "mechanicDescription": "Tiga ronde. Gunakan Pilah Ciri.",
      "voiceGuide": "Pilah Ciri. Mainkan dengan teliti.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "segiempat",
      "title": "Ciri Segiempat",
      "bookReference": "hlm. 158–162",
      "objective": "Pilih ciri.. Ingat Pilah Ciri. (Pilah Ciri)",
      "mechanicDescription": "Tiga ronde. Gunakan Pilah Ciri.",
      "voiceGuide": "Pilah Ciri. Mainkan dengan teliti.",
      "diagramType": "quad",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "choose-bangun",
      "title": "Pilih Bangun Cocok",
      "bookReference": "hlm. 146–161",
      "objective": "Pilih bangun.. Ingat Pilah Ciri. (Pilah Ciri)",
      "mechanicDescription": "Tiga ronde. Gunakan Pilah Ciri.",
      "voiceGuide": "Pilah Ciri. Mainkan dengan teliti.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-a",
      "title": "Cerita Diagram Bangun",
      "bookReference": "hlm. 147–162",
      "objective": "Cerita + gambar.. Ingat Pilah Ciri. (Pilah Ciri)",
      "mechanicDescription": "Tiga ronde. Gunakan Pilah Ciri.",
      "voiceGuide": "Pilah Ciri. Mainkan dengan teliti.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-nama",
      "title": "Tulis Nama Bangun",
      "bookReference": "hlm. 145–160",
      "objective": "Pakai Papan Paku: Bentuk karet di paku untuk menguji ciri. Latihan: Menulis nama..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Papan Paku: Bentuk karet di paku untuk menguji ciri.",
      "voiceGuide": "Papan Paku. Bentuk karet di paku untuk menguji ciri.",
      "symbolLarge": "△",
      "wordLarge": "NAMA",
      "mathNotation": "jenis"
    },
    {
      "stage": "Abstract",
      "gameType": "write-jumlah",
      "title": "Tulis Jumlah Sisi/Sudut",
      "bookReference": "hlm. 144–145",
      "objective": "Pakai Papan Paku: Bentuk karet di paku untuk menguji ciri. Latihan: Menulis angka..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Papan Paku: Bentuk karet di paku untuk menguji ciri.",
      "voiceGuide": "Papan Paku. Bentuk karet di paku untuk menguji ciri.",
      "symbolLarge": "3/4/5",
      "wordLarge": "JUMLAH",
      "mathNotation": "sisi=sudut"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-jenis",
      "title": "Pilih Klasifikasi",
      "bookReference": "hlm. 145–157",
      "objective": "Pakai Papan Paku: Bentuk karet di paku untuk menguji ciri. Latihan: Beraturan/sudut..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Papan Paku: Bentuk karet di paku untuk menguji ciri.",
      "voiceGuide": "Papan Paku. Bentuk karet di paku untuk menguji ciri.",
      "symbolLarge": "beraturan",
      "wordLarge": "JENIS",
      "mathNotation": "klasifikasi"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-a",
      "title": "Urutkan Banyak Sisi",
      "bookReference": "hlm. 144–145",
      "objective": "Pakai Papan Paku: Bentuk karet di paku untuk menguji ciri. Latihan: Mengurutkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Papan Paku: Bentuk karet di paku untuk menguji ciri.",
      "voiceGuide": "Papan Paku. Bentuk karet di paku untuk menguji ciri.",
      "symbolLarge": "3<4<5",
      "wordLarge": "URUT",
      "mathNotation": "sisi"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-a",
      "title": "Jodohkan Notasi Ciri",
      "bookReference": "hlm. 148–162",
      "objective": "Jodohkan.. Ingat Papan Paku. (Papan Paku)",
      "mechanicDescription": "Tiga ronde. Gunakan Papan Paku.",
      "voiceGuide": "Papan Paku. Mainkan dengan teliti.",
      "symbolLarge": "3 sisi",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-a",
      "title": "Memori Notasi Ciri",
      "bookReference": "hlm. 145–160",
      "objective": "Memori.. Ingat Papan Paku. (Papan Paku)",
      "mechanicDescription": "Tiga ronde. Gunakan Papan Paku.",
      "voiceGuide": "Papan Paku. Mainkan dengan teliti.",
      "symbolLarge": "persegi",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-a",
      "title": "Benar atau Salah: Ciri",
      "bookReference": "hlm. 142–162",
      "objective": "Menilai.. Ingat Papan Paku. (Papan Paku)",
      "mechanicDescription": "Dua ronde. Gunakan Papan Paku.",
      "voiceGuide": "Papan Paku. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-a",
      "title": "Detektif Bangun Datar",
      "bookReference": "hlm. 145–162",
      "objective": "Petunjuk → bangun.. Ingat Papan Paku. (Papan Paku)",
      "mechanicDescription": "Empat soal. Gunakan Papan Paku.",
      "voiceGuide": "Papan Paku. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-a",
      "title": "Peta Konsep Bangun",
      "bookReference": "hlm. 141–160",
      "objective": "Mengisi kotak.. Ingat Papan Paku. (Papan Paku)",
      "mechanicDescription": "Satu peta. Gunakan Papan Paku.",
      "voiceGuide": "Papan Paku. Mainkan dengan teliti.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-a",
      "title": "Cerita Angka Ciri",
      "bookReference": "hlm. 147–162",
      "objective": "Soal cerita.. Ingat Papan Paku. (Papan Paku)",
      "mechanicDescription": "Tiga ronde. Gunakan Papan Paku.",
      "voiceGuide": "Papan Paku. Mainkan dengan teliti.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "🔷",
      "nama": "Segi banyak",
      "isi": "Kurva tertutup dibatasi ≥3 ruas garis. Nama mengikuti banyak sisi.",
      "suara": "Segi banyak paling sedikit tiga sisi."
    },
    {
      "ikon": "🌍",
      "nama": "van Hiele Visual–Analisis",
      "isi": "Mulai kenali bentuk, lalu sebut ciri sisi dan sudut.",
      "suara": "van Hiele Visual–Analisis. Mulai kenali bentuk, lalu sebut ciri sisi dan sudut."
    },
    {
      "ikon": "🌍",
      "nama": "Pilah Ciri",
      "isi": "Kelompokkan menurut sisi, sudut, atau sejajar.",
      "suara": "Pilah Ciri. Kelompokkan menurut sisi, sudut, atau sejajar."
    },
    {
      "ikon": "🌍",
      "nama": "Papan Paku",
      "isi": "Bentuk karet di paku untuk menguji ciri.",
      "suara": "Papan Paku. Bentuk karet di paku untuk menguji ciri."
    }
  ],
  "poinSuara": "Ingat: van Hiele Visual–Analisis, Pilah Ciri, Papan Paku.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Segi banyak",
        "warna": "#FDE68A"
      },
      {
        "teks": "Beraturan",
        "warna": "#BBF7D0"
      },
      {
        "teks": "Segitiga",
        "warna": "#BFDBFE"
      },
      {
        "teks": "Segiempat",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba: terapkan van Hiele Visual–Analisis pada satu soal nyata di rumah.",
  "refleksi": [
    "Bagaimana van Hiele Visual–Analisis membantumu?",
    "Kapan memakai Pilah Ciri?",
    "Apa bedanya dengan hanya menghafal tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "van Hiele Level 0-1",
      "namaId": "van Hiele Visual–Analisis",
      "asal": "van Hiele",
      "ringkas": "Mulai kenali bentuk, lalu sebut ciri sisi dan sudut.",
      "tahap": [
        "Story",
        "Mind",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Attribute Sort",
      "namaId": "Pilah Ciri",
      "asal": "Attribute blocks",
      "ringkas": "Kelompokkan menurut sisi, sudut, atau sejajar.",
      "tahap": [
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Geoboard",
      "namaId": "Papan Paku",
      "asal": "Gattegno geoboard",
      "ringkas": "Bentuk karet di paku untuk menguji ciri.",
      "tahap": [
        "Infografis",
        "Concrete"
      ]
    }
  ]
};

export const SUB_B45: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Komposisi dan Dekomposisi)",
  "fullTitle": "Sub-Bab B: Komposisi dan Dekomposisi Bangun Datar",
  "targetDescription": "Siswa menyusun (komposisi) dan menguraikan (dekomposisi) bangun datar dengan banyak cara, misalnya persegi ↔ 2 segitiga, segienam → 6 segitiga, serta konteks peta/tangram sesuai Buku Siswa Kelas IV Bab 5. Siswa memakai cara Susun Bangun, Urai Bangun, Tangram. Siswa memakai cara Susun Bangun, Urai Bangun, Tangram.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Kita belajar komposisi dan dekomposisi bangun datar. Menyusun bagian menjadi utuh disebut komposisi. Mengurai utuh menjadi bagian disebut dekomposisi. Satu bangun bisa disusun atau diurai dengan banyak cara. Kita memakai cara: Susun Bangun, Urai Bangun, Tangram. Gabungkan bangun sederhana jadi bangun baru. Pecah bangun kompleks jadi bagian dikenal. Tujuh keping menyusun banyak siluet. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa melakukan komposisi dan dekomposisi bangun datar.",
    "referensi": "Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 5 Sub-Bab B)."
  },
  "videos": [
    {
      "id": "K4B5B-V1",
      "judul": "Apa itu Komposisi?",
      "subjudul": "Compose Shapes",
      "adegan": [
        {
          "id": "K4B5B-V1-1",
          "judul": "Susun",
          "ketukan": [
            "Bayangkan kamu sedang mempelajari Komposisi dan Dekomposisi Bangun Datar. Ambil beberapa bangun kecil.",
            "Susun tanpa celah.",
            "Jadi satu bangun baru.",
            "Ingat cara Susun Bangun: Gabungkan bangun sederhana jadi bangun baru. Ingat cara Susun Bangun: Gabungkan bangun sederhana jadi bangun baru."
          ],
          "papan": [
            "bagian",
            "susun",
            "utuh",
            "komposisi"
          ]
        },
        {
          "id": "K4B5B-V1-2",
          "judul": "Contoh",
          "ketukan": [
            "Dua segitiga jadi persegi.",
            "Atau jadi persegi panjang.",
            "Tiga segitiga jadi trapesium.",
            "Di sini kita memakai ide Compose Shapes — Gabungkan bangun sederhana jadi bangun baru. Di sini kita memakai Compose Shapes. Gabungkan bangun sederhana jadi bangun baru."
          ],
          "papan": [
            "2△→□",
            "2△→▭",
            "3△→⏢",
            "banyak cara"
          ]
        },
        {
          "id": "K4B5B-V1-3",
          "judul": "Rumah",
          "ketukan": [
            "Persegi sebagai badan.",
            "Dua segitiga sebagai atap.",
            "Itu menyusun rumah.",
            "METODE LUAR · Susun Bangun: Gabungkan bangun sederhana jadi bangun baru."
          ],
          "papan": [
            "persegi",
            "atap",
            "rumah",
            "kreatif"
          ]
        }
      ]
    },
    {
      "id": "K4B5B-V2",
      "judul": "Latihan: Urai Bangun",
      "subjudul": "Decompose Shapes",
      "adegan": [
        {
          "id": "K4B5B-V2-1",
          "judul": "Urai",
          "ketukan": [
            "Ambil satu bangun utuh.",
            "Iris atau uraikan.",
            "Jadi beberapa bangun.",
            "Ingat cara Urai Bangun: Pecah bangun kompleks jadi bagian dikenal. Ingat cara Urai Bangun: Pecah bangun kompleks jadi bagian dikenal."
          ],
          "papan": [
            "utuh",
            "iris",
            "bagian",
            "dekomposisi"
          ]
        },
        {
          "id": "K4B5B-V2-2",
          "judul": "Contoh buku",
          "ketukan": [
            "Persegi diiris diagonal.",
            "Hasil dua segitiga.",
            "Segienam jadi enam segitiga.",
            "Di sini kita memakai ide Decompose Shapes — Pecah bangun kompleks jadi bagian dikenal. Di sini kita memakai Decompose Shapes. Pecah bangun kompleks jadi bagian dikenal."
          ],
          "papan": [
            "diagonal",
            "2△",
            "6△",
            "luas tetap"
          ]
        },
        {
          "id": "K4B5B-V2-3",
          "judul": "Peta",
          "ketukan": [
            "Peta bisa diurai jadi bangun.",
            "Latihan mengamati bentuk.",
            "Lalu disusun kembali.",
            "METODE LUAR · Urai Bangun: Pecah bangun kompleks jadi bagian dikenal."
          ],
          "papan": [
            "peta",
            "urai",
            "susun lagi",
            "spasial"
          ]
        }
      ]
    },
    {
      "id": "K4B5B-V3",
      "judul": "Siap pakai Tangram",
      "subjudul": "Tangram",
      "adegan": [
        {
          "id": "K4B5B-V3-1",
          "judul": "Tidak hanya satu",
          "ketukan": [
            "Satu bangun bisa diurai beda cara.",
            "Satu target bisa disusun beda cara.",
            "Buku menekankan kreativitas.",
            "Ingat cara Tangram: Tujuh keping menyusun banyak siluet. Ingat cara Tangram: Tujuh keping menyusun banyak siluet."
          ],
          "papan": [
            "banyak cara",
            "urai",
            "susun",
            "kreatif"
          ]
        },
        {
          "id": "K4B5B-V3-2",
          "judul": "Cek hasil",
          "ketukan": [
            "Pastikan tanpa celah.",
            "Tanpa tumpang tindih.",
            "Bagian menutup utuh.",
            "Di sini kita memakai ide Tangram — Tujuh keping menyusun banyak siluet. Di sini kita memakai Tangram. Tujuh keping menyusun banyak siluet."
          ],
          "papan": [
            "tanpa celah",
            "rapat",
            "menutup",
            "syarat"
          ]
        },
        {
          "id": "K4B5B-V3-3",
          "judul": "Siap main",
          "ketukan": [
            "Kamu siap menyusun.",
            "Dan mengurai.",
            "Pilih komposisi atau dekomposisi.",
            "METODE LUAR · Tangram: Tujuh keping menyusun banyak siluet."
          ],
          "papan": [
            "susun",
            "urai",
            "pilih",
            "main"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Komposisi dan Dekomposisi Bangun Datar dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa menyusun (komposisi) dan menguraikan (dekomposisi) bangun datar dengan banyak cara, misalnya persegi ↔ 2 segitiga,….",
      "icon": "❓",
      "flowFrom": "Pahami soal",
      "flowTo": "Compose Shapes"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Compose Shapes",
      "stepDesc": "Gabungkan bangun sederhana jadi bangun baru. Pada Komposisi dan Dekomposisi Bangun Datar, langkah “Compose Shapes” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Susun Bangun: Gabungkan bangun sederhana jadi bangun baru. Urai Bangun: Pecah bangun kompleks jadi bagian dikenal. Tangram: Tujuh keping menyusun banyak siluet.. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🧭",
      "flowFrom": "Compose Shapes",
      "flowTo": "Decompose Shapes"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Decompose Shapes",
      "stepDesc": "Pecah bangun kompleks jadi bagian dikenal. Pada Komposisi dan Dekomposisi Bangun Datar, langkah “Decompose Shapes” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Susun Bangun: Gabungkan bangun sederhana jadi bangun baru. Urai Bangun: Pecah bangun kompleks jadi bagian dikenal. Tangram: Tujuh keping menyusun banyak siluet.. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🛠️",
      "flowFrom": "Decompose Shapes",
      "flowTo": "Tangram"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Tangram",
      "stepDesc": "Tujuh keping menyusun banyak siluet. Pada Komposisi dan Dekomposisi Bangun Datar, langkah “Tangram” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Susun Bangun: Gabungkan bangun sederhana jadi bangun baru. Urai Bangun: Pecah bangun kompleks jadi bagian dikenal. Tangram: Tujuh keping menyusun banyak siluet.. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "✨",
      "flowFrom": "Tangram",
      "flowTo": "Kerjakan"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Kerjakan",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Komposisi dan Dekomposisi Bangun Datar. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "✏️",
      "flowFrom": "Kerjakan",
      "flowTo": "Cek masuk akal"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek masuk akal",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Komposisi dan Dekomposisi Bangun Datar. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Cek masuk akal",
      "flowTo": "Simpulkan"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Simpulkan",
      "stepDesc": "Simpulkan ide utama Komposisi dan Dekomposisi Bangun Datar dengan kalimatmu sendiri. Sebutkan cara yang kamu pakai dan mengapa cara itu membantu. Jelaskan kepada teman seolah-olah kamu guru kecil. Simpulan yang jelas menandakan konsepnya sudah dipahami.",
      "icon": "💬",
      "flowFrom": "Simpulkan",
      "flowTo": "Main"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Main",
      "stepDesc": "Latih lagi di tahap Concrete, Picture, lalu Abstract untuk Komposisi dan Dekomposisi Bangun Datar. Mulai dari benda nyata, lanjut ke diagram, baru ke lambang angka. Ulangi sampai kamu bisa menjelaskan tanpa melihat contoh. Bermain sambil berlatih membuat konsepnya melekat lebih lama.",
      "icon": "🎮",
      "flowFrom": "Main",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Komposisi",
      "emoji": "🧩",
      "countNum": 1,
      "countWord": "susun",
      "suara": "Menyusun bagian menjadi bangun utuh. Pada Komposisi dan Dekomposisi Bangun Datar, cocokkan gambar “Komposisi” dengan artinya (susun), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🧩 Komposisi: susun"
    },
    {
      "judul": "Dekomposisi",
      "emoji": "✂️",
      "countNum": 1,
      "countWord": "urai",
      "suara": "Mengurai bangun utuh menjadi bagian. Pada Komposisi dan Dekomposisi Bangun Datar, cocokkan gambar “Dekomposisi” dengan artinya (urai), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "✂️ Dekomposisi: urai"
    },
    {
      "judul": "□ → 2△",
      "emoji": "⬛",
      "countNum": 2,
      "countWord": "segitiga",
      "suara": "Persegi diiris jadi dua segitiga. Pada Komposisi dan Dekomposisi Bangun Datar, cocokkan gambar “□ → 2△” dengan artinya (segitiga), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "⬛ □ → 2△: segitiga"
    },
    {
      "judul": "2△ → □",
      "emoji": "🔺",
      "countNum": 2,
      "countWord": "susun",
      "suara": "Dua segitiga disusun jadi persegi. Pada Komposisi dan Dekomposisi Bangun Datar, cocokkan gambar “2△ → □” dengan artinya (susun), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🔺 2△ → □: susun"
    },
    {
      "judul": "⬡ → 6△",
      "emoji": "⬡",
      "countNum": 6,
      "countWord": "urai",
      "suara": "⬡ → 6△ (urai). Dadu biasa punya enam sisi. Satu angka tertentu = 1 dari 6 — lebih jarang daripada koin. Bandingkan area peluangnya. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Komposisi dan Dekomposisi…",
      "teksVisual": "⬡ ⬡ → 6△: urai"
    },
    {
      "judul": "3△ → ⏢",
      "emoji": "🔺",
      "countNum": 3,
      "countWord": "trapesium",
      "suara": "Tiga segitiga jadi trapesium. Pada Komposisi dan Dekomposisi Bangun Datar, cocokkan gambar “3△ → ⏢” dengan artinya (trapesium), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🔺 3△ → ⏢: trapesium"
    },
    {
      "judul": "Rumah",
      "emoji": "🏠",
      "countNum": 1,
      "countWord": "susun",
      "suara": "Persegi plus segitiga jadi rumah. Persegi sebagai badan. Dua segitiga sebagai atap. Ingat: persegi; atap; rumah. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Komposisi dan Dekomposisi Bangun Datar.",
      "teksVisual": "🏠 Rumah: susun"
    },
    {
      "judul": "Tanpa celah",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "rapat",
      "suara": "Susunan rapat tanpa tumpang tindih. Pada Komposisi dan Dekomposisi Bangun Datar, cocokkan gambar “Tanpa celah” dengan artinya (rapat), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "✅ Tanpa celah: rapat"
    },
    {
      "judul": "Banyak cara",
      "emoji": "💡",
      "countNum": 1,
      "countWord": "kreatif",
      "suara": "Satu bangun bisa banyak cara urai/susun. Pada Komposisi dan Dekomposisi Bangun Datar, cocokkan gambar “Banyak cara” dengan artinya (kreatif), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "💡 Banyak cara: kreatif"
    },
    {
      "judul": "Bab 5 siap",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "Materi",
      "suara": "Ciri dan komposisi lengkap untuk Materi. Pada Komposisi dan Dekomposisi Bangun Datar, cocokkan gambar “Bab 5 siap” dengan artinya (Materi), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "✅ Bab 5 siap: Materi"
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "baca-resep",
      "title": "Baca Resep Susun/Urai",
      "bookReference": "hlm. 167–173",
      "objective": "Pakai Susun Bangun: Gabungkan bangun sederhana jadi bangun baru. Latihan: Membaca komposisi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Susun Bangun: Gabungkan bangun sederhana jadi bangun baru.",
      "voiceGuide": "Susun Bangun. Gabungkan bangun sederhana jadi bangun baru.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jenis-aksi",
      "title": "Komposisi atau Dekomposisi",
      "bookReference": "hlm. 167–170",
      "objective": "Pakai Susun Bangun: Gabungkan bangun sederhana jadi bangun baru. Latihan: Membedakan aksi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Susun Bangun: Gabungkan bangun sederhana jadi bangun baru.",
      "voiceGuide": "Susun Bangun. Gabungkan bangun sederhana jadi bangun baru.",
      "emoji": "🔀",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "hasil-susun",
      "title": "Hasil Penyusunan",
      "bookReference": "hlm. 167–169",
      "objective": "Pakai Susun Bangun: Gabungkan bangun sederhana jadi bangun baru. Latihan: Menebak hasil..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Susun Bangun: Gabungkan bangun sederhana jadi bangun baru.",
      "voiceGuide": "Susun Bangun. Gabungkan bangun sederhana jadi bangun baru.",
      "emoji": "🏠",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-aksi",
      "title": "Pilah Susun/Urai",
      "bookReference": "hlm. 167–173",
      "objective": "Pakai Susun Bangun: Gabungkan bangun sederhana jadi bangun baru. Latihan: Memilah..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Susun Bangun: Gabungkan bangun sederhana jadi bangun baru.",
      "voiceGuide": "Susun Bangun. Gabungkan bangun sederhana jadi bangun baru.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-resep",
      "title": "Jodohkan Resep Bangun",
      "bookReference": "hlm. 167–173",
      "objective": "Menjodohkan.. Ingat Susun Bangun. (Susun Bangun)",
      "mechanicDescription": "Tiga ronde. Gunakan Susun Bangun.",
      "voiceGuide": "Susun Bangun. Mainkan dengan teliti.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-resep",
      "title": "Memori Komposisi",
      "bookReference": "hlm. 167–171",
      "objective": "Memori.. Ingat Susun Bangun. (Susun Bangun)",
      "mechanicDescription": "Tiga ronde. Gunakan Susun Bangun.",
      "voiceGuide": "Susun Bangun. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-resep",
      "title": "Ketuk Resep Diminta",
      "bookReference": "hlm. 168–173",
      "objective": "Mengetuk.. Ingat Susun Bangun. (Susun Bangun)",
      "mechanicDescription": "Tiga ronde. Gunakan Susun Bangun.",
      "voiceGuide": "Susun Bangun. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-aksi",
      "title": "Ketuk Semua Jenis Aksi",
      "bookReference": "hlm. 167–170",
      "objective": "Ketuk semua.. Ingat Susun Bangun. (Susun Bangun)",
      "mechanicDescription": "Tiga ronde. Gunakan Susun Bangun.",
      "voiceGuide": "Susun Bangun. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-komp",
      "title": "Cerita Potong dan Susun",
      "bookReference": "hlm. 167–173",
      "objective": "Soal cerita.. Ingat Susun Bangun. (Susun Bangun)",
      "mechanicDescription": "Tiga ronde. Gunakan Susun Bangun.",
      "voiceGuide": "Susun Bangun. Mainkan dengan teliti.",
      "emoji": "✂️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-bagian",
      "title": "Urutkan Banyak Bagian",
      "bookReference": "hlm. 168–173",
      "objective": "Mengurutkan.. Ingat Susun Bangun. (Susun Bangun)",
      "mechanicDescription": "Tiga ronde. Gunakan Susun Bangun.",
      "voiceGuide": "Susun Bangun. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "diagram-susun",
      "title": "Diagram Menyusun",
      "bookReference": "hlm. 167–169",
      "objective": "Pakai Urai Bangun: Pecah bangun kompleks jadi bagian dikenal. Latihan: Baca susunan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Urai Bangun: Pecah bangun kompleks jadi bagian dikenal.",
      "voiceGuide": "Urai Bangun. Pecah bangun kompleks jadi bagian dikenal.",
      "diagramType": "compose",
      "numberA": 2,
      "numberB": 1
    },
    {
      "stage": "Picture",
      "gameType": "diagram-urai",
      "title": "Diagram Mengurai",
      "bookReference": "hlm. 170–173",
      "objective": "Pakai Urai Bangun: Pecah bangun kompleks jadi bagian dikenal. Latihan: Baca uraian..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Urai Bangun: Pecah bangun kompleks jadi bagian dikenal.",
      "voiceGuide": "Urai Bangun. Pecah bangun kompleks jadi bagian dikenal.",
      "diagramType": "decompose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-b",
      "title": "Jodohkan Diagram Resep",
      "bookReference": "hlm. 167–173",
      "objective": "Pakai Urai Bangun: Pecah bangun kompleks jadi bagian dikenal. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Urai Bangun: Pecah bangun kompleks jadi bagian dikenal.",
      "voiceGuide": "Urai Bangun. Pecah bangun kompleks jadi bagian dikenal.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-b",
      "title": "Memori Diagram Resep",
      "bookReference": "hlm. 168–171",
      "objective": "Pakai Urai Bangun: Pecah bangun kompleks jadi bagian dikenal. Latihan: Memori..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Urai Bangun: Pecah bangun kompleks jadi bagian dikenal.",
      "voiceGuide": "Urai Bangun. Pecah bangun kompleks jadi bagian dikenal.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-b",
      "title": "Tabel Bagian → Hasil",
      "bookReference": "hlm. 167–173",
      "objective": "Isi tabel.. Ingat Urai Bangun. (Urai Bangun)",
      "mechanicDescription": "Tiga tabel. Gunakan Urai Bangun.",
      "voiceGuide": "Urai Bangun. Mainkan dengan teliti.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-b",
      "title": "Ketuk Semua Diagram Aksi",
      "bookReference": "hlm. 167–170",
      "objective": "Ketuk semua.. Ingat Urai Bangun. (Urai Bangun)",
      "mechanicDescription": "Tiga ronde. Gunakan Urai Bangun.",
      "voiceGuide": "Urai Bangun. Mainkan dengan teliti.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-b",
      "title": "Pilah Diagram Aksi",
      "bookReference": "hlm. 167–173",
      "objective": "Pilah.. Ingat Urai Bangun. (Urai Bangun)",
      "mechanicDescription": "Tiga ronde. Gunakan Urai Bangun.",
      "voiceGuide": "Urai Bangun. Mainkan dengan teliti.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "banyak-cara",
      "title": "Banyak Cara Urai/Susun",
      "bookReference": "hlm. 173–175",
      "objective": "Pilih pernyataan.. Ingat Urai Bangun. (Urai Bangun)",
      "mechanicDescription": "Tiga ronde. Gunakan Urai Bangun.",
      "voiceGuide": "Urai Bangun. Mainkan dengan teliti.",
      "diagramType": "ways",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "choose-hasil",
      "title": "Pilih Hasil Cocok",
      "bookReference": "hlm. 168–173",
      "objective": "Pilih hasil.. Ingat Urai Bangun. (Urai Bangun)",
      "mechanicDescription": "Tiga ronde. Gunakan Urai Bangun.",
      "voiceGuide": "Urai Bangun. Mainkan dengan teliti.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-b",
      "title": "Cerita Diagram Resep",
      "bookReference": "hlm. 167–175",
      "objective": "Cerita + gambar.. Ingat Urai Bangun. (Urai Bangun)",
      "mechanicDescription": "Tiga ronde. Gunakan Urai Bangun.",
      "voiceGuide": "Urai Bangun. Mainkan dengan teliti.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-aksi",
      "title": "Tulis Komposisi/Dekomposisi",
      "bookReference": "hlm. 167–170",
      "objective": "Pakai Tangram: Tujuh keping menyusun banyak siluet. Latihan: Menulis istilah..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Tangram: Tujuh keping menyusun banyak siluet.",
      "voiceGuide": "Tangram. Tujuh keping menyusun banyak siluet.",
      "symbolLarge": "↔",
      "wordLarge": "AKSI",
      "mathNotation": "istilah"
    },
    {
      "stage": "Abstract",
      "gameType": "write-hasil",
      "title": "Tulis Hasil Urai/Susun",
      "bookReference": "hlm. 168–173",
      "objective": "Pakai Tangram: Tujuh keping menyusun banyak siluet. Latihan: Menulis hasil..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Tangram: Tujuh keping menyusun banyak siluet.",
      "voiceGuide": "Tangram. Tujuh keping menyusun banyak siluet.",
      "symbolLarge": "2△",
      "wordLarge": "HASIL",
      "mathNotation": "resep"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-jenis-b",
      "title": "Pilih Jenis Aksi",
      "bookReference": "hlm. 167–170",
      "objective": "Pakai Tangram: Tujuh keping menyusun banyak siluet. Latihan: Klasifikasi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Tangram: Tujuh keping menyusun banyak siluet.",
      "voiceGuide": "Tangram. Tujuh keping menyusun banyak siluet.",
      "symbolLarge": "komposisi",
      "wordLarge": "JENIS",
      "mathNotation": "klasifikasi"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-b",
      "title": "Urutkan Banyak Bagian",
      "bookReference": "hlm. 168–173",
      "objective": "Pakai Tangram: Tujuh keping menyusun banyak siluet. Latihan: Mengurutkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Tangram: Tujuh keping menyusun banyak siluet.",
      "voiceGuide": "Tangram. Tujuh keping menyusun banyak siluet.",
      "symbolLarge": "2<3<6",
      "wordLarge": "URUT",
      "mathNotation": "bagian"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-b",
      "title": "Jodohkan Notasi Resep",
      "bookReference": "hlm. 167–173",
      "objective": "Jodohkan.. Ingat Tangram. (Tangram)",
      "mechanicDescription": "Tiga ronde. Gunakan Tangram.",
      "voiceGuide": "Tangram. Mainkan dengan teliti.",
      "symbolLarge": "□→2△",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-b",
      "title": "Memori Notasi Resep",
      "bookReference": "hlm. 168–171",
      "objective": "Memori.. Ingat Tangram. (Tangram)",
      "mechanicDescription": "Tiga ronde. Gunakan Tangram.",
      "voiceGuide": "Tangram. Mainkan dengan teliti.",
      "symbolLarge": "urai",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-b",
      "title": "Benar atau Salah: Resep",
      "bookReference": "hlm. 167–175",
      "objective": "Menilai.. Ingat Tangram. (Tangram)",
      "mechanicDescription": "Dua ronde. Gunakan Tangram.",
      "voiceGuide": "Tangram. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-b",
      "title": "Detektif Komposisi",
      "bookReference": "hlm. 167–175",
      "objective": "Petunjuk → jawaban.. Ingat Tangram. (Tangram)",
      "mechanicDescription": "Empat soal. Gunakan Tangram.",
      "voiceGuide": "Tangram. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-b",
      "title": "Peta Konsep Komposisi",
      "bookReference": "hlm. 167–173",
      "objective": "Mengisi kotak.. Ingat Tangram. (Tangram)",
      "mechanicDescription": "Satu peta. Gunakan Tangram.",
      "voiceGuide": "Tangram. Mainkan dengan teliti.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-b",
      "title": "Cerita Angka Resep",
      "bookReference": "hlm. 167–175",
      "objective": "Soal cerita.. Ingat Tangram. (Tangram)",
      "mechanicDescription": "Tiga ronde. Gunakan Tangram.",
      "voiceGuide": "Tangram. Mainkan dengan teliti.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "🧩",
      "nama": "Komposisi",
      "isi": "Menyusun beberapa bangun menjadi satu bangun baru.",
      "suara": "Komposisi artinya menyusun."
    },
    {
      "ikon": "🌍",
      "nama": "Susun Bangun",
      "isi": "Gabungkan bangun sederhana jadi bangun baru.",
      "suara": "Susun Bangun. Gabungkan bangun sederhana jadi bangun baru."
    },
    {
      "ikon": "🌍",
      "nama": "Urai Bangun",
      "isi": "Pecah bangun kompleks jadi bagian dikenal.",
      "suara": "Urai Bangun. Pecah bangun kompleks jadi bagian dikenal."
    },
    {
      "ikon": "🌍",
      "nama": "Tangram",
      "isi": "Tujuh keping menyusun banyak siluet.",
      "suara": "Tangram. Tujuh keping menyusun banyak siluet."
    }
  ],
  "poinSuara": "Ingat: Susun Bangun, Urai Bangun, Tangram.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Komposisi",
        "warna": "#FDE68A"
      },
      {
        "teks": "Dekomposisi",
        "warna": "#BBF7D0"
      },
      {
        "teks": "Resep dasar",
        "warna": "#BFDBFE"
      },
      {
        "teks": "Banyak cara",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba: terapkan Susun Bangun pada satu soal nyata di rumah.",
  "refleksi": [
    "Bagaimana Susun Bangun membantumu?",
    "Kapan memakai Urai Bangun?",
    "Apa bedanya dengan hanya menghafal tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Compose Shapes",
      "namaId": "Susun Bangun",
      "asal": "Tangram / composition",
      "ringkas": "Gabungkan bangun sederhana jadi bangun baru.",
      "tahap": [
        "Story",
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Decompose Shapes",
      "namaId": "Urai Bangun",
      "asal": "Spatial reasoning",
      "ringkas": "Pecah bangun kompleks jadi bagian dikenal.",
      "tahap": [
        "Mind",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Tangram",
      "namaId": "Tangram",
      "asal": "Chinese puzzle pedagogy",
      "ringkas": "Tujuh keping menyusun banyak siluet.",
      "tahap": [
        "Infografis",
        "Concrete"
      ]
    }
  ]
};

export const SUB_BAB_K4B5: SubBabNaskah[] = [SUB_A45, SUB_B45];
export const semuaAdeganK4B5 = SUB_BAB_K4B5.flatMap((s) => s.videos.flatMap((v) => v.adegan));
