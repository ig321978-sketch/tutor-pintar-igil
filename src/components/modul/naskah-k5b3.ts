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
  "videos": [],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Baca pecahan",
      "stepDesc": "Baca soal Membandingkan dan Mengurutkan Pecahan dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Kenali pembilang dan penyebut. Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa membandingkan dan mengurutkan pecahan biasa serta campuran dengan garis bilangan, pecahan senilai, dan mengubah ca….",
      "icon": "📖",
      "flowFrom": "Baca pecahan",
      "flowTo": "Campuran?"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Campuran?",
      "stepDesc": "Ubah ke biasa bila perlu. Pada Membandingkan dan Mengurutkan Pecahan, langkah “Campuran?” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Pecahan di Garis Bilangan: Bandingkan pecahan dengan melihat posisi di garis; yang lebih kanan lebih besar. Pecahan Senilai: Pecahan senilai menunjuk bagian sam…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🔄",
      "flowFrom": "Campuran?",
      "flowTo": "Senilai"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Senilai",
      "stepDesc": "Samakan penyebut dengan pecahan senilai. Pada Membandingkan dan Mengurutkan Pecahan, langkah “Senilai” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Pecahan di Garis Bilangan: Bandingkan pecahan dengan melihat posisi di garis; yang lebih kanan lebih besar. Pecahan Senilai: Pecahan senilai menunjuk bagian sam…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "⚖️",
      "flowFrom": "Senilai",
      "flowTo": "Garis bilangan"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Garis bilangan",
      "stepDesc": "Letakkan; kanan lebih besar. Pada Membandingkan dan Mengurutkan Pecahan, langkah “Garis bilangan” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Pecahan di Garis Bilangan: Bandingkan pecahan dengan melihat posisi di garis; yang lebih kanan lebih besar. Pecahan Senilai: Pecahan senilai menunjuk bagian sam…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "📏",
      "flowFrom": "Garis bilangan",
      "flowTo": "Bandingkan"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Bandingkan",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Membandingkan dan Mengurutkan Pecahan. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "⇔",
      "flowFrom": "Bandingkan",
      "flowTo": "Urutkan"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Urutkan",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Membandingkan dan Mengurutkan Pecahan. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "📶",
      "flowFrom": "Urutkan",
      "flowTo": "Cek"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Cek",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Membandingkan dan Mengurutkan Pecahan. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Cek",
      "flowTo": "Main"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Main",
      "stepDesc": "Latih lagi di tahap Concrete, Picture, lalu Abstract untuk Membandingkan dan Mengurutkan Pecahan. Mulai dari benda nyata, lanjut ke diagram, baru ke lambang angka. Ulangi sampai kamu bisa menjelaskan tanpa melihat contoh. Bermain sambil berlatih membuat konsepnya melekat lebih lama.",
      "icon": "🎮",
      "flowFrom": "Main",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Pembilang",
      "emoji": "⬆️",
      "countNum": 1,
      "countWord": "atas",
      "suara": "Pembilang — atas. Satu per dua dan satu per lima. Pembilangnya sama: satu. Penyebut lebih kecil berarti tiap bagian lebih besar. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Membandingkan dan Mengurutkan…",
      "teksVisual": "⬆️ Pembilang: atas"
    },
    {
      "judul": "Penyebut",
      "emoji": "⬇️",
      "countNum": 1,
      "countWord": "bawah",
      "suara": "Penyebut — bawah. Tiga per delapan dan lima per delapan. Penyebut sama. Lihat pembilang: lima lebih besar dari tiga. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Membandingkan dan Mengurutkan Pecahan.",
      "teksVisual": "⬇️ Penyebut: bawah"
    },
    {
      "judul": "Garis",
      "emoji": "📏",
      "countNum": 1,
      "countWord": "kanan>",
      "suara": "Lebih kanan lebih besar. Empat potong makanan sama besar. Kamu makan dua. Itu dua per empat. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Membandingkan dan Mengurutkan Pecahan.",
      "teksVisual": "📏 Garis: kanan>"
    },
    {
      "judul": "Senilai",
      "emoji": "⚖️",
      "countNum": 1,
      "countWord": "sama nilai",
      "suara": "Bentuk beda nilai sama. Pada Membandingkan dan Mengurutkan Pecahan, cocokkan gambar “Senilai” dengan artinya (sama nilai), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "⚖️ Senilai: sama nilai"
    },
    {
      "judul": "Campuran",
      "emoji": "🔄",
      "countNum": 1,
      "countWord": "ke biasa",
      "suara": "Campuran — ke biasa. Pecahan biasa hanya punya pembilang dan penyebut, misalnya tiga per empat. Pecahan campuran punya bilangan bulat ditambah pecahan, misalnya dua tiga per empat. Ingat: biasa; campuran; utuh + sisa.",
      "teksVisual": "🔄 Campuran: ke biasa"
    },
    {
      "judul": "1/2 vs 1/5",
      "emoji": "🍰",
      "countNum": 1,
      "countWord": "1/2>",
      "suara": "1/2 vs 1/5 — 1/2>. Pada Membandingkan dan Mengurutkan Pecahan, cocokkan gambar “1/2 vs 1/5” dengan artinya (1/2>), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🍰 1/2 vs 1/5: 1/2>"
    },
    {
      "judul": "3/8 vs 5/8",
      "emoji": "📊",
      "countNum": 1,
      "countWord": "5/8>",
      "suara": "3/8 vs 5/8 — 5/8>. Pada Membandingkan dan Mengurutkan Pecahan, cocokkan gambar “3/8 vs 5/8” dengan artinya (5/8>), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "📊 3/8 vs 5/8: 5/8>"
    },
    {
      "judul": "Yohana",
      "emoji": "🏃",
      "countNum": 1,
      "countWord": "3 1/2",
      "suara": "Yohana — 3 1/2. Pada Membandingkan dan Mengurutkan Pecahan, cocokkan gambar “Yohana” dengan artinya (3 1/2), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Membandingkan…",
      "teksVisual": "🏃 Yohana: 3 1/2"
    },
    {
      "judul": "2/4",
      "emoji": "✂️",
      "countNum": 1,
      "countWord": "=1/2",
      "suara": "Pada Membandingkan dan Mengurutkan Pecahan, cocokkan gambar “2/4” dengan artinya (=1/2), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Membandingkan dan Mengurutkan…",
      "teksVisual": "✂️ 2/4: =1/2"
    },
    {
      "judul": "Siap B",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "jumlah",
      "suara": "Siap B (jumlah). Skala kualitatif sudah siap. Berikutnya bandingkan dua peluang dengan rasio untung/total, lalu putuskan adil atau kurang adil. Kalau beda pembilang dan penyebut, samakan dulu dengan pecahan senilai atau garis bilangan.",
      "teksVisual": "➡️ Siap B: jumlah"
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
  "videos": [],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Lihat penyebut",
      "stepDesc": "Baca soal Penjumlahan Bilangan Pecahan dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Sama atau beda? Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa menjumlahkan pecahan dengan penyebut sama maupun berbeda dengan menyamakan penyebut memakai KPK, serta memakai mod….",
      "icon": "👀",
      "flowFrom": "Lihat penyebut",
      "flowTo": "Sama?"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Sama?",
      "stepDesc": "Jumlahkan pembilang. Pada Penjumlahan Bilangan Pecahan, langkah “Sama?” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Jumlah Penyebut Sama: Penyebut sama: jumlahkan pembilang, penyebut tetap. Samakan Penyebut dengan KPK: Penyebut beda: cari KPK, buat pecahan senilai, baru jumla…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "➕",
      "flowFrom": "Sama?",
      "flowTo": "Beda?"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Beda?",
      "stepDesc": "Cari KPK penyebut. Pada Penjumlahan Bilangan Pecahan, langkah “Beda?” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Jumlah Penyebut Sama: Penyebut sama: jumlahkan pembilang, penyebut tetap. Samakan Penyebut dengan KPK: Penyebut beda: cari KPK, buat pecahan senilai, baru jumla…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🔢",
      "flowFrom": "Beda?",
      "flowTo": "Senilai"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Senilai",
      "stepDesc": "Ubah ke penyebut KPK. Pada Penjumlahan Bilangan Pecahan, langkah “Senilai” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Jumlah Penyebut Sama: Penyebut sama: jumlahkan pembilang, penyebut tetap. Samakan Penyebut dengan KPK: Penyebut beda: cari KPK, buat pecahan senilai, baru jumla…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "⚖️",
      "flowFrom": "Senilai",
      "flowTo": "Jumlahkan"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Jumlahkan",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Penjumlahan Bilangan Pecahan. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "➕",
      "flowFrom": "Jumlahkan",
      "flowTo": "Sederhanakan"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Sederhanakan",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Penjumlahan Bilangan Pecahan. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✨",
      "flowFrom": "Sederhanakan",
      "flowTo": "Arsir cek"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Arsir cek",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Penjumlahan Bilangan Pecahan. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "🎨",
      "flowFrom": "Arsir cek",
      "flowTo": "Main"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Main",
      "stepDesc": "Latih lagi di tahap Concrete, Picture, lalu Abstract untuk Penjumlahan Bilangan Pecahan. Mulai dari benda nyata, lanjut ke diagram, baru ke lambang angka. Ulangi sampai kamu bisa menjelaskan tanpa melihat contoh. Bermain sambil berlatih membuat konsepnya melekat lebih lama.",
      "icon": "🎮",
      "flowFrom": "Main",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Penyebut sama",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "p+p",
      "suara": "Penyebut sama — p+p. Pada Penjumlahan Bilangan Pecahan, cocokkan gambar “Penyebut sama” dengan artinya (p+p), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Penjumlahan…",
      "teksVisual": "✅ Penyebut sama: p+p"
    },
    {
      "judul": "2/7+3/7",
      "emoji": "🔢",
      "countNum": 5,
      "countWord": "5/7",
      "suara": "2/7+3/7 — 5/7. Pada Penjumlahan Bilangan Pecahan, cocokkan gambar “2/7+3/7” dengan artinya (5/7), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Penjumlahan Bilangan…",
      "teksVisual": "🔢 2/7+3/7: 5/7"
    },
    {
      "judul": "KPK",
      "emoji": "🎯",
      "countNum": 1,
      "countWord": "samakan",
      "suara": "KPK — samakan. Pada Penjumlahan Bilangan Pecahan, cocokkan gambar “KPK” dengan artinya (samakan), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Penjumlahan Bilangan…",
      "teksVisual": "🎯 KPK: samakan"
    },
    {
      "judul": "1/2+1/3",
      "emoji": "➕",
      "countNum": 5,
      "countWord": "5/6",
      "suara": "1/2+1/3 — 5/6. Pada Penjumlahan Bilangan Pecahan, cocokkan gambar “1/2+1/3” dengan artinya (5/6), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Penjumlahan Bilangan…",
      "teksVisual": "➕ 1/2+1/3: 5/6"
    },
    {
      "judul": "Arsir",
      "emoji": "🎨",
      "countNum": 1,
      "countWord": "lihat",
      "suara": "Arsir — lihat. Gambar dua bangun sama. Arsir bagian pertama dan kedua. Gabungkan arsir secara mental atau pada satu bangun berpenyebut sama. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Penjumlahan Bilangan…",
      "teksVisual": "🎨 Arsir: lihat"
    },
    {
      "judul": "Jangan",
      "emoji": "🚫",
      "countNum": 1,
      "countWord": "q+q",
      "suara": "Jangan jumlah penyebut. Pada Penjumlahan Bilangan Pecahan, cocokkan gambar “Jangan” dengan artinya (q+q), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Penjumlahan…",
      "teksVisual": "🚫 Jangan: q+q"
    },
    {
      "judul": "Campuran",
      "emoji": "🔄",
      "countNum": 1,
      "countWord": "ke biasa",
      "suara": "Campuran — ke biasa. Jika ada campuran, ubah ke biasa dulu, lalu samakan penyebut. Jangan jumlahkan bilangan bulat saja lalu mengabaikan pecahannya. Ingat: campuran; jangan; urut.",
      "teksVisual": "🔄 Campuran: ke biasa"
    },
    {
      "judul": "Sederhana",
      "emoji": "✨",
      "countNum": 1,
      "countWord": "ringkas",
      "suara": "Sederhana — ringkas. Pada Penjumlahan Bilangan Pecahan, cocokkan gambar “Sederhana” dengan artinya (ringkas), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Penjumlahan…",
      "teksVisual": "✨ Sederhana: ringkas"
    },
    {
      "judul": "Perkiraan",
      "emoji": "📏",
      "countNum": 1,
      "countWord": "cek",
      "suara": "Perkiraan — cek. Pada Penjumlahan Bilangan Pecahan, cocokkan gambar “Perkiraan” dengan artinya (cek), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Penjumlahan Bilangan…",
      "teksVisual": "📏 Perkiraan: cek"
    },
    {
      "judul": "Siap C",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "kurang",
      "suara": "Siap C — kurang. Penjumlahan pecahan siap. Berikutnya pengurangan. Ide dasarnya sama: samakan penyebut. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Penjumlahan Bilangan Pecahan.",
      "teksVisual": "➡️ Siap C: kurang"
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
  "videos": [],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Lihat penyebut",
      "stepDesc": "Baca soal Pengurangan Bilangan Pecahan dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Sama atau beda? Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa mengurangkan pecahan dengan penyebut sama maupun berbeda memakai KPK dan model sisa daerah sesuai Buku Siswa Kelas….",
      "icon": "👀",
      "flowFrom": "Lihat penyebut",
      "flowTo": "Sama?"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Sama?",
      "stepDesc": "Kurangi pembilang. Pada Pengurangan Bilangan Pecahan, langkah “Sama?” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Kurang Penyebut Sama: Penyebut sama: kurangkan pembilang, penyebut tetap. Kurang dengan KPK: Penyebut beda: samakan dengan KPK, lalu kurangkan pembilang. Model …. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "➖",
      "flowFrom": "Sama?",
      "flowTo": "Beda?"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Beda?",
      "stepDesc": "KPK lalu senilai. Pada Pengurangan Bilangan Pecahan, langkah “Beda?” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Kurang Penyebut Sama: Penyebut sama: kurangkan pembilang, penyebut tetap. Kurang dengan KPK: Penyebut beda: samakan dengan KPK, lalu kurangkan pembilang. Model …. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🔢",
      "flowFrom": "Beda?",
      "flowTo": "Kurangkan"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Kurangkan",
      "stepDesc": "Pembilang − pembilang. Pada Pengurangan Bilangan Pecahan, langkah “Kurangkan” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Kurang Penyebut Sama: Penyebut sama: kurangkan pembilang, penyebut tetap. Kurang dengan KPK: Penyebut beda: samakan dengan KPK, lalu kurangkan pembilang. Model …. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "➖",
      "flowFrom": "Kurangkan",
      "flowTo": "Sisa daerah"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Sisa daerah",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Pengurangan Bilangan Pecahan. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "🎨",
      "flowFrom": "Sisa daerah",
      "flowTo": "Sederhanakan"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Sederhanakan",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Pengurangan Bilangan Pecahan. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✨",
      "flowFrom": "Sederhanakan",
      "flowTo": "Cek"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Cek",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Pengurangan Bilangan Pecahan. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Cek",
      "flowTo": "Bab 3 utuh"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Bab 3 utuh",
      "stepDesc": "Latih lagi di tahap Concrete, Picture, lalu Abstract untuk Pengurangan Bilangan Pecahan. Mulai dari benda nyata, lanjut ke diagram, baru ke lambang angka. Ulangi sampai kamu bisa menjelaskan tanpa melihat contoh. Bermain sambil berlatih membuat konsepnya melekat lebih lama.",
      "icon": "🎉",
      "flowFrom": "Bab 3 utuh",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Penyebut sama",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "p-p",
      "suara": "Penyebut sama — p-p. Pada Pengurangan Bilangan Pecahan, cocokkan gambar “Penyebut sama” dengan artinya (p-p), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Pengurangan…",
      "teksVisual": "✅ Penyebut sama: p-p"
    },
    {
      "judul": "5/8-2/8",
      "emoji": "🔢",
      "countNum": 3,
      "countWord": "3/8",
      "suara": "5/8-2/8 — 3/8. Pada Pengurangan Bilangan Pecahan, cocokkan gambar “5/8-2/8” dengan artinya (3/8), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Pengurangan Bilangan…",
      "teksVisual": "🔢 5/8-2/8: 3/8"
    },
    {
      "judul": "KPK",
      "emoji": "🎯",
      "countNum": 1,
      "countWord": "samakan",
      "suara": "KPK — samakan. Pada Pengurangan Bilangan Pecahan, cocokkan gambar “KPK” dengan artinya (samakan), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Pengurangan Bilangan…",
      "teksVisual": "🎯 KPK: samakan"
    },
    {
      "judul": "3/4-1/6",
      "emoji": "➖",
      "countNum": 7,
      "countWord": "7/12",
      "suara": "3/4-1/6 — 7/12. Pada Pengurangan Bilangan Pecahan, cocokkan gambar “3/4-1/6” dengan artinya (7/12), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Pengurangan Bilangan…",
      "teksVisual": "➖ 3/4-1/6: 7/12"
    },
    {
      "judul": "Sisa",
      "emoji": "🎨",
      "countNum": 1,
      "countWord": "hapus",
      "suara": "Sisa — hapus. Arsir lima kotak dari delapan. Hapus dua kotak. Sisa tiga kotak. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Pengurangan Bilangan Pecahan.",
      "teksVisual": "🎨 Sisa: hapus"
    },
    {
      "judul": "Jangan",
      "emoji": "🚫",
      "countNum": 1,
      "countWord": "q-q",
      "suara": "Jangan kurang penyebut. Pada Pengurangan Bilangan Pecahan, cocokkan gambar “Jangan” dengan artinya (q-q), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Pengurangan…",
      "teksVisual": "🚫 Jangan: q-q"
    },
    {
      "judul": "Campuran",
      "emoji": "🔄",
      "countNum": 1,
      "countWord": "ubah",
      "suara": "Campuran — ubah. Ubah ke biasa atau kurangkan bilangan bulat dan pecahan dengan hati-hati. Urutan aman: ubah, samakan, kurangkan, sederhanakan. Ingat: campuran; urut; perkiraan.",
      "teksVisual": "🔄 Campuran: ubah"
    },
    {
      "judul": "Perkiraan",
      "emoji": "📏",
      "countNum": 1,
      "countWord": "cek",
      "suara": "Perkiraan — cek. Pada Pengurangan Bilangan Pecahan, cocokkan gambar “Perkiraan” dengan artinya (cek), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Pengurangan Bilangan…",
      "teksVisual": "📏 Perkiraan: cek"
    },
    {
      "judul": "Senilai",
      "emoji": "⚖️",
      "countNum": 1,
      "countWord": "sama nilai",
      "suara": "Senilai — sama nilai. Pada Pengurangan Bilangan Pecahan, cocokkan gambar “Senilai” dengan artinya (sama nilai), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Pengurangan…",
      "teksVisual": "⚖️ Senilai: sama nilai"
    },
    {
      "judul": "Bab 3",
      "emoji": "🎉",
      "countNum": 1,
      "countWord": "siap",
      "suara": "Bab 3 — siap. Bab 3: bandingkan, jumlahkan, kurangkan pecahan. Senjata utama: garis bilangan, senilai, KPK, model daerah. Ingat: rangkum; senjata; cek.",
      "teksVisual": "🎉 Bab 3: siap"
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
