/**
 * Naskah — poles kerapatan setara K5B4.
 * Metode luar dianyam ketukan per ketukan.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K4B1_META = {
  "chapterId": "k4-mat-bab1",
  "phaseCode": "FASE_B",
  "grade": 4,
  "subjectLabel": "MATEMATIKA - KELAS 4 SD",
  "title": "BAB 1: BILANGAN CACAH SAMPAI 10.000",
  "silabusElemen": "🌈 Fase B • Elemen Bilangan: Membaca–Menulis, Nilai Tempat, Banding–Urut, Komposisi–Dekomposisi sampai 10.000, serta Penjumlahan–Pengurangan sampai 1.000, Perkalian–Pembagian sampai 100, serta Faktor dan Kelipatan (Kelas 4 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A41: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Membaca dan Menulis Bilangan)",
  "fullTitle": "Sub-Bab A: Membaca dan Menulis Bilangan Cacah sampai 10.000",
  "targetDescription": "Siswa membaca dan menulis bilangan cacah empat angka sampai 10.000, termasuk bilangan dengan nol (7.003, 1.025, 6.570), memakai papan ribuan–satuan, serta memahami 10 dus = 1 peti (1.000). Siswa memakai cara Balok Dienes Empat Tingkat, Papan Nilai Tempat, Nol Penjaga Tempat. Siswa memakai cara Balok Dienes Empat Tingkat, Papan Nilai Tempat, Nol Penjaga Tempat.",
  "secondaryBg": "#DCFCE7",
  "secondaryBorder": "#16A34A",
  "secondaryText": "#14532D",
  "silabus": {
    "teksSuara": "Kita belajar membaca dan menulis bilangan cacah sampai sepuluh ribu. Helen melihat harga minuman enam ribu tujuh ratus lima puluh rupiah di minimarket, jarak rumah tiga ribu dua ratus delapan puluh enam meter, dan tinggi Gunung Semeru tiga ribu enam ratus tujuh puluh enam meter. Kita memakai kartu angka dan papan ribuan, ratusan, puluhan, satuan. Nol tidak dibaca, tetapi menjaga tempat saat menulis. Kita memakai cara: Balok Dienes Empat Tingkat, Papan Nilai Tempat, Nol Penjaga Tempat. Peti–dus–bungkus–benda membantu membaca ribuan sampai satuan. Setiap digit punya nilai menurut tempatnya. Nol tidak dibaca keras, tetapi menjaga tempat digit. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa membaca, menulis, membandingkan, dan mengurutkan bilangan cacah sampai 10.000. Pada sub-bab ini fokus membaca dan menulis.",
    "referensi": "Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 1 Sub-Bab A hlm. 4–11)."
  },
  "videos": [],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Membaca dan Menulis Bilangan Cacah sampai 10.000 dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa membaca dan menulis bilangan cacah empat angka sampai 10.000, termasuk bilangan dengan nol (7.003, 1.025, 6.570), ….",
      "icon": "❓",
      "flowFrom": "Pahami soal",
      "flowTo": "Dienes Blocks"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Dienes Blocks",
      "stepDesc": "Peti–dus–bungkus–benda membantu membaca ribuan sampai satuan. Pada Membaca dan Menulis Bilangan Cacah sampai 10.000, langkah “Dienes Blocks” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Balok Dienes Empat Tingkat: Peti–dus–bungkus–benda membantu membaca ribuan sampai satuan. Papan Nilai Tempat: Setiap digit punya nilai menurut tempatnya. Nol Pe…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🧭",
      "flowFrom": "Dienes Blocks",
      "flowTo": "Place-Value Chart"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Place-Value Chart",
      "stepDesc": "Setiap digit punya nilai menurut tempatnya. Pada Membaca dan Menulis Bilangan Cacah sampai 10.000, langkah “Place-Value Chart” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Balok Dienes Empat Tingkat: Peti–dus–bungkus–benda membantu membaca ribuan sampai satuan. Papan Nilai Tempat: Setiap digit punya nilai menurut tempatnya. Nol Pe…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🛠️",
      "flowFrom": "Place-Value Chart",
      "flowTo": "Zero as Placeholder"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Zero as Placeholder",
      "stepDesc": "Nol tidak dibaca keras, tetapi menjaga tempat digit. Pada Membaca dan Menulis Bilangan Cacah sampai 10.000, langkah “Zero as Placeholder” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Balok Dienes Empat Tingkat: Peti–dus–bungkus–benda membantu membaca ribuan sampai satuan. Papan Nilai Tempat: Setiap digit punya nilai menurut tempatnya. Nol Pe…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "✨",
      "flowFrom": "Zero as Placeholder",
      "flowTo": "Kerjakan"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Kerjakan",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Membaca dan Menulis Bilangan Cacah sampai 10.000. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "✏️",
      "flowFrom": "Kerjakan",
      "flowTo": "Cek masuk akal"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek masuk akal",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Membaca dan Menulis Bilangan Cacah sampai 10.000. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Cek masuk akal",
      "flowTo": "Simpulkan"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Simpulkan",
      "stepDesc": "Simpulkan ide utama Membaca dan Menulis Bilangan Cacah sampai 10.000 dengan kalimatmu sendiri. Sebutkan cara yang kamu pakai dan mengapa cara itu membantu. Jelaskan kepada teman seolah-olah kamu guru kecil. Simpulan yang jelas menandakan konsepnya sudah dipahami.",
      "icon": "💬",
      "flowFrom": "Simpulkan",
      "flowTo": "Main"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Main",
      "stepDesc": "Latih lagi di tahap Concrete, Picture, lalu Abstract untuk Membaca dan Menulis Bilangan Cacah sampai 10.000. Mulai dari benda nyata, lanjut ke diagram, baru ke lambang angka. Ulangi sampai kamu bisa menjelaskan tanpa melihat contoh. Bermain sambil berlatih membuat konsepnya melekat lebih lama.",
      "icon": "🎮",
      "flowFrom": "Main",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "RIBUAN",
      "emoji": "🟣",
      "countNum": 1000,
      "countWord": "satu peti / seribu",
      "suara": "Tempat paling kiri pada bilangan empat angka adalah ribuan. Satu peti sama dengan seribu. Pada Membaca dan Menulis Bilangan Cacah sampai 10.000, cocokkan gambar “RIBUAN” dengan artinya (satu peti / seribu), lalu sebut satu contoh dari…",
      "teksVisual": "🟣 Tempat paling kiri pada bilangan empat angka adalah…"
    },
    {
      "judul": "RATUSAN",
      "emoji": "🟢",
      "countNum": 100,
      "countWord": "satu dus / seratus",
      "suara": "Di kanan ribuan ada ratusan. Satu dus sama dengan seratus. Pada Membaca dan Menulis Bilangan Cacah sampai 10.000, cocokkan gambar “RATUSAN” dengan artinya (satu dus / seratus), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🟢 Di kanan ribuan ada ratusan. Satu dus sama dengan…"
    },
    {
      "judul": "PULUHAN",
      "emoji": "🔵",
      "countNum": 10,
      "countWord": "satu bungkus / sepuluh",
      "suara": "Puluhan memakai kata puluh. Sepuluh satuan sama dengan satu puluhan. Pada Membaca dan Menulis Bilangan Cacah sampai 10.000, cocokkan gambar “PULUHAN” dengan artinya (satu bungkus / sepuluh), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🔵 Puluhan memakai kata puluh. Sepuluh satuan sama…"
    },
    {
      "judul": "SATUAN",
      "emoji": "🔴",
      "countNum": 1,
      "countWord": "benda lepas",
      "suara": "Satuan dibaca angkanya saja. Pada Membaca dan Menulis Bilangan Cacah sampai 10.000, cocokkan gambar “SATUAN” dengan artinya (benda lepas), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🔴 SATUAN: benda lepas"
    },
    {
      "judul": "BACA DARI KIRI",
      "emoji": "⬅️",
      "countNum": 3286,
      "countWord": "tiga ribu dua ratus delapan puluh enam",
      "suara": "Baca dari ribuan ke satuan. Contoh 3.286. Pada Membaca dan Menulis Bilangan Cacah sampai 10.000, cocokkan gambar “BACA DARI KIRI” dengan artinya (tiga ribu dua ratus delapan puluh enam), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "⬅️ BACA DARI KIRI: tiga ribu dua ratus delapan puluh enam"
    },
    {
      "judul": "NOL TIDAK DIBACA",
      "emoji": "⭕",
      "countNum": 7003,
      "countWord": "tujuh ribu tiga",
      "suara": "7.003 dibaca tujuh ribu tiga. Nol tidak dibaca. Pada Membaca dan Menulis Bilangan Cacah sampai 10.000, cocokkan gambar “NOL TIDAK DIBACA” dengan artinya (tujuh ribu tiga), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "⭕ 7.003 dibaca tujuh ribu tiga. Nol tidak dibaca."
    },
    {
      "judul": "SERIBU",
      "emoji": "1️⃣",
      "countNum": 1025,
      "countWord": "seribu dua puluh lima",
      "suara": "Ribuan 1 dibaca seribu, bukan satu ribu. Bilangan 1.025: ribuannya 1 dibaca seribu. Ratusannya 0, tidak ditulis dalam bacaan. Ingat: 1.025; Seribu; Nol ratusan dilewati.",
      "teksVisual": "1️⃣ SERIBU: seribu dua puluh lima"
    },
    {
      "judul": "NOL MENJAGA TEMPAT",
      "emoji": "✍️",
      "countNum": 405,
      "countWord": "saat menulis tetap ditulis",
      "suara": "Saat menulis, nol menjaga tempat yang kosong. Pada Membaca dan Menulis Bilangan Cacah sampai 10.000, cocokkan gambar “NOL MENJAGA TEMPAT” dengan artinya (saat menulis tetap ditulis), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "✍️ Saat menulis, nol menjaga tempat yang kosong."
    },
    {
      "judul": "SEPULUH DUS = SATU PETI",
      "emoji": "🔄",
      "countNum": 10,
      "countWord": "penukaran",
      "suara": "Sepuluh dus ditukar menjadi satu peti. Pada Membaca dan Menulis Bilangan Cacah sampai 10.000, cocokkan gambar “SEPULUH DUS = SATU PETI” dengan artinya (penukaran), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🔄 SEPULUH DUS = SATU PETI: penukaran"
    },
    {
      "judul": "SAMPAI 10.000",
      "emoji": "🔟",
      "countNum": 10000,
      "countWord": "sepuluh ribu",
      "suara": "Batas bab ini adalah sepuluh ribu. Pada Membaca dan Menulis Bilangan Cacah sampai 10.000, cocokkan gambar “SAMPAI 10.000” dengan artinya (sepuluh ribu), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🔟 SAMPAI 10.000: sepuluh ribu"
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "build-with-exchange",
      "title": "Rakit Peti dan Dus",
      "bookReference": "hlm. 4–6 (kartu bilangan; 10 dus = 1 peti)",
      "objective": "Pakai Balok Dienes Empat Tingkat: Peti–dus–bungkus–benda membantu membaca ribuan sampai satuan. Latihan: Merakit bilangan empat angka dengan peti, dus, bungkus, dan benda lepas..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua bilangan. Penukaran sepuluh otomatis. Tekan Periksa. Saat bermain, ingat Balok Dienes Empat Tingkat: Peti–dus–bungkus–benda membantu membaca ribuan sampai satuan.",
      "voiceGuide": "Balok Dienes Empat Tingkat. Peti–dus–bungkus–benda membantu membaca ribuan sampai satuan.",
      "emoji": "📦",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "count-packages",
      "title": "Hitung Kemasan Empat Tingkat",
      "bookReference": "hlm. 5–6 (membaca 3.286)",
      "objective": "Pakai Balok Dienes Empat Tingkat: Peti–dus–bungkus–benda membantu membaca ribuan sampai satuan. Latihan: Menghitung peti, dus, bungkus, dan benda lalu memilih lambangnya..",
      "mechanicDescription": "Tiga ronde, dua soal. Pilih satu dari tiga bilangan. Saat bermain, ingat Balok Dienes Empat Tingkat: Peti–dus–bungkus–benda membantu membaca ribuan sampai satuan.",
      "voiceGuide": "Balok Dienes Empat Tingkat. Peti–dus–bungkus–benda membantu membaca ribuan sampai satuan.",
      "emoji": "🔢",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-packages",
      "title": "Pilah Peti, Dus, Bungkus, Satuan",
      "bookReference": "hlm. 5–6 (ribuan sampai satuan)",
      "objective": "Pakai Balok Dienes Empat Tingkat: Peti–dus–bungkus–benda membantu membaca ribuan sampai satuan. Latihan: Memilah kemasan menurut nilainya..",
      "mechanicDescription": "Tiga ronde, enam kelompok ke empat kotak. Saat bermain, ingat Balok Dienes Empat Tingkat: Peti–dus–bungkus–benda membantu membaca ribuan sampai satuan.",
      "voiceGuide": "Balok Dienes Empat Tingkat. Peti–dus–bungkus–benda membantu membaca ribuan sampai satuan.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-package-number",
      "title": "Jodohkan Kemasan dan Bilangan",
      "bookReference": "hlm. 6 (nama bilangan 3.286)",
      "objective": "Pakai Balok Dienes Empat Tingkat: Peti–dus–bungkus–benda membantu membaca ribuan sampai satuan. Latihan: Menjodohkan kumpulan dengan lambang..",
      "mechanicDescription": "Tiga ronde, tiga pasangan. Saat bermain, ingat Balok Dienes Empat Tingkat: Peti–dus–bungkus–benda membantu membaca ribuan sampai satuan.",
      "voiceGuide": "Balok Dienes Empat Tingkat. Peti–dus–bungkus–benda membantu membaca ribuan sampai satuan.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "memory-package-number",
      "title": "Memori Kemasan dan Bilangan",
      "bookReference": "hlm. 6–11",
      "objective": "Mencocokkan kumpulan dan lambang lewat memori.. Ingat Balok Dienes Empat Tingkat. (Balok Dienes Empat Tingkat)",
      "mechanicDescription": "Tiga ronde, empat pasang. Gunakan Balok Dienes Empat Tingkat.",
      "voiceGuide": "Balok Dienes Empat Tingkat. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-read-package",
      "title": "Ketuk Kumpulan yang Dibaca",
      "bookReference": "hlm. 6 (cara membaca)",
      "objective": "Mendengar kata bilangan lalu mengetuk kumpulan.. Ingat Balok Dienes Empat Tingkat. (Balok Dienes Empat Tingkat)",
      "mechanicDescription": "Tiga ronde, tiga kumpulan mirip. Gunakan Balok Dienes Empat Tingkat.",
      "voiceGuide": "Balok Dienes Empat Tingkat. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-packages",
      "title": "Ketuk Semua yang Cocok",
      "bookReference": "hlm. 9–11 (nol pada tempat)",
      "objective": "Menemukan semua kumpulan dengan syarat digit.. Ingat Balok Dienes Empat Tingkat. (Balok Dienes Empat Tingkat)",
      "mechanicDescription": "Tiga ronde, empat kumpulan. Gunakan Balok Dienes Empat Tingkat.",
      "voiceGuide": "Balok Dienes Empat Tingkat. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "read-package-words",
      "title": "Baca Kumpulan",
      "bookReference": "hlm. 6–9 (3.286, 7.003, 1.025)",
      "objective": "Memilih cara membaca yang benar.. Ingat Balok Dienes Empat Tingkat. (Balok Dienes Empat Tingkat)",
      "mechanicDescription": "Tiga ronde, dua soal. Gunakan Balok Dienes Empat Tingkat.",
      "voiceGuide": "Balok Dienes Empat Tingkat. Mainkan dengan teliti.",
      "emoji": "🗣️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "board-from-package",
      "title": "Papan dari Kumpulan",
      "bookReference": "hlm. 6 (tabel Ribuan–Satuan)",
      "objective": "Mengisi papan empat kolom dari kumpulan.. Ingat Balok Dienes Empat Tingkat. (Balok Dienes Empat Tingkat)",
      "mechanicDescription": "Tiga ronde, dua soal. Gunakan Balok Dienes Empat Tingkat.",
      "voiceGuide": "Balok Dienes Empat Tingkat. Mainkan dengan teliti.",
      "emoji": "🗂️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "exchange-packages",
      "title": "Tukar Kemasan sampai Peti",
      "bookReference": "hlm. 5–6 (10→1)",
      "objective": "Memahami penukaran sampai peti 1.000.. Ingat Balok Dienes Empat Tingkat. (Balok Dienes Empat Tingkat)",
      "mechanicDescription": "Tiga ronde, dua soal. Gunakan Balok Dienes Empat Tingkat.",
      "voiceGuide": "Balok Dienes Empat Tingkat. Mainkan dengan teliti.",
      "emoji": "🔄",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "count-blocks",
      "title": "Hitung Blok Empat Tempat",
      "bookReference": "hlm. 6",
      "objective": "Pakai Papan Nilai Tempat: Setiap digit punya nilai menurut tempatnya. Latihan: Membaca model blok menjadi lambang..",
      "mechanicDescription": "Tiga ronde, dua soal. Saat bermain, ingat Papan Nilai Tempat: Setiap digit punya nilai menurut tempatnya.",
      "voiceGuide": "Papan Nilai Tempat. Setiap digit punya nilai menurut tempatnya.",
      "diagramType": "blocks-count",
      "numberA": 4,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "board-from-blocks",
      "title": "Papan dari Blok",
      "bookReference": "hlm. 6 dan 14",
      "objective": "Pakai Papan Nilai Tempat: Setiap digit punya nilai menurut tempatnya. Latihan: Mengisi papan dari model blok..",
      "mechanicDescription": "Tiga ronde, dua soal. Saat bermain, ingat Papan Nilai Tempat: Setiap digit punya nilai menurut tempatnya.",
      "voiceGuide": "Papan Nilai Tempat. Setiap digit punya nilai menurut tempatnya.",
      "diagramType": "blocks-board",
      "numberA": 4,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "fill-block-table",
      "title": "Isi Tabel Blok",
      "bookReference": "hlm. 16 (tabel nilai tempat)",
      "objective": "Pakai Papan Nilai Tempat: Setiap digit punya nilai menurut tempatnya. Latihan: Mengisi digit pada tabel dari model..",
      "mechanicDescription": "Tiga tabel, tiga baris. Saat bermain, ingat Papan Nilai Tempat: Setiap digit punya nilai menurut tempatnya.",
      "voiceGuide": "Papan Nilai Tempat. Setiap digit punya nilai menurut tempatnya.",
      "diagramType": "blocks-table",
      "numberA": 4,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "match-block-number",
      "title": "Jodohkan Blok dan Bilangan",
      "bookReference": "hlm. 6",
      "objective": "Pakai Papan Nilai Tempat: Setiap digit punya nilai menurut tempatnya. Latihan: Menjodohkan model dengan lambang..",
      "mechanicDescription": "Tiga ronde, tiga pasangan. Saat bermain, ingat Papan Nilai Tempat: Setiap digit punya nilai menurut tempatnya.",
      "voiceGuide": "Papan Nilai Tempat. Setiap digit punya nilai menurut tempatnya.",
      "diagramType": "blocks-match",
      "numberA": 4,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memory-block-word",
      "title": "Memori Blok dan Kata",
      "bookReference": "hlm. 6–9",
      "objective": "Mencocokkan model dengan kata.. Ingat Papan Nilai Tempat. (Papan Nilai Tempat)",
      "mechanicDescription": "Tiga ronde, empat pasang. Gunakan Papan Nilai Tempat.",
      "voiceGuide": "Papan Nilai Tempat. Mainkan dengan teliti.",
      "diagramType": "blocks-memory",
      "numberA": 4,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "tap-block-read",
      "title": "Ketuk Blok yang Dibaca",
      "bookReference": "hlm. 6–9",
      "objective": "Mengetuk model sesuai bacaan.. Ingat Papan Nilai Tempat. (Papan Nilai Tempat)",
      "mechanicDescription": "Tiga ronde, dua pertanyaan. Gunakan Papan Nilai Tempat.",
      "voiceGuide": "Papan Nilai Tempat. Mainkan dengan teliti.",
      "diagramType": "blocks-tap",
      "numberA": 4,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "number-line-read",
      "title": "Garis Bilangan Ribuan",
      "bookReference": "hlm. 4–11",
      "objective": "Menemukan bilangan pada garis.. Ingat Papan Nilai Tempat. (Papan Nilai Tempat)",
      "mechanicDescription": "Tiga ronde, dua soal. Gunakan Papan Nilai Tempat.",
      "voiceGuide": "Papan Nilai Tempat. Mainkan dengan teliti.",
      "diagramType": "number-line",
      "numberA": 4,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-blocks",
      "title": "Ketuk Semua Blok",
      "bookReference": "hlm. 9–11",
      "objective": "Memilih model sesuai syarat digit.. Ingat Papan Nilai Tempat. (Papan Nilai Tempat)",
      "mechanicDescription": "Tiga ronde, empat model. Gunakan Papan Nilai Tempat.",
      "voiceGuide": "Papan Nilai Tempat. Mainkan dengan teliti.",
      "diagramType": "blocks-select",
      "numberA": 4,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-zero-blocks",
      "title": "Pilah Blok: Ada Nol atau Tidak",
      "bookReference": "hlm. 6–9 (nol tidak dibaca)",
      "objective": "Memilah model ada nol / tanpa nol.. Ingat Papan Nilai Tempat. (Papan Nilai Tempat)",
      "mechanicDescription": "Tiga ronde, enam model. Gunakan Papan Nilai Tempat.",
      "voiceGuide": "Papan Nilai Tempat. Mainkan dengan teliti.",
      "diagramType": "blocks-sort",
      "numberA": 4,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "complete-block-sentence",
      "title": "Lengkapi Kalimat Blok",
      "bookReference": "hlm. 6–14",
      "objective": "Melengkapi kalimat tentang digit tempat.. Ingat Papan Nilai Tempat. (Papan Nilai Tempat)",
      "mechanicDescription": "Tiga model, tiga kalimat. Gunakan Papan Nilai Tempat.",
      "voiceGuide": "Papan Nilai Tempat. Mainkan dengan teliti.",
      "diagramType": "blocks-sentence",
      "numberA": 4,
      "numberB": 3
    },
    {
      "stage": "Abstract",
      "gameType": "compose-four-cards",
      "title": "Susun Empat Kartu",
      "bookReference": "hlm. 5–8 (kartu bilangan)",
      "objective": "Pakai Nol Penjaga Tempat: Nol tidak dibaca keras, tetapi menjaga tempat digit. Latihan: Menulis lambang dari kata dengan empat kartu..",
      "mechanicDescription": "Tiga ronde, dua soal. Saat bermain, ingat Nol Penjaga Tempat: Nol tidak dibaca keras, tetapi menjaga tempat digit.",
      "voiceGuide": "Nol Penjaga Tempat. Nol tidak dibaca keras, tetapi menjaga tempat digit.",
      "symbolLarge": "3.286",
      "wordLarge": "SUSUN KARTU",
      "mathNotation": "kata → angka"
    },
    {
      "stage": "Abstract",
      "gameType": "read-number-choice",
      "title": "Baca Bilangan Empat Angka",
      "bookReference": "hlm. 6–9",
      "objective": "Pakai Nol Penjaga Tempat: Nol tidak dibaca keras, tetapi menjaga tempat digit. Latihan: Memilih cara membaca yang benar..",
      "mechanicDescription": "Tiga ronde, dua soal. Saat bermain, ingat Nol Penjaga Tempat: Nol tidak dibaca keras, tetapi menjaga tempat digit.",
      "voiceGuide": "Nol Penjaga Tempat. Nol tidak dibaca keras, tetapi menjaga tempat digit.",
      "symbolLarge": "3.286",
      "wordLarge": "BACA",
      "mathNotation": "angka → kata"
    },
    {
      "stage": "Abstract",
      "gameType": "write-on-board",
      "title": "Tulis Lambang di Papan",
      "bookReference": "hlm. 7–9 (menulis 3.254)",
      "objective": "Pakai Nol Penjaga Tempat: Nol tidak dibaca keras, tetapi menjaga tempat digit. Latihan: Menulis dari kata ke papan empat kolom..",
      "mechanicDescription": "Tiga ronde, dua soal. Saat bermain, ingat Nol Penjaga Tempat: Nol tidak dibaca keras, tetapi menjaga tempat digit.",
      "voiceGuide": "Nol Penjaga Tempat. Nol tidak dibaca keras, tetapi menjaga tempat digit.",
      "symbolLarge": "3.254",
      "wordLarge": "TULIS",
      "mathNotation": "kata → angka"
    },
    {
      "stage": "Abstract",
      "gameType": "match-number-word",
      "title": "Jodohkan Angka dan Kata",
      "bookReference": "hlm. 11 (hubungkan)",
      "objective": "Pakai Nol Penjaga Tempat: Nol tidak dibaca keras, tetapi menjaga tempat digit. Latihan: Menjodohkan lambang dan bacaan..",
      "mechanicDescription": "Tiga ronde, tiga pasang. Saat bermain, ingat Nol Penjaga Tempat: Nol tidak dibaca keras, tetapi menjaga tempat digit.",
      "voiceGuide": "Nol Penjaga Tempat. Nol tidak dibaca keras, tetapi menjaga tempat digit.",
      "symbolLarge": "2.903",
      "wordLarge": "JODOHKAN",
      "mathNotation": "angka • kata"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-number-word",
      "title": "Memori Angka dan Kata",
      "bookReference": "hlm. 11",
      "objective": "Memori lambang dan kata.. Ingat Nol Penjaga Tempat. (Nol Penjaga Tempat)",
      "mechanicDescription": "Tiga ronde, empat pasang. Gunakan Nol Penjaga Tempat.",
      "voiceGuide": "Nol Penjaga Tempat. Mainkan dengan teliti.",
      "symbolLarge": "3.050",
      "wordLarge": "MEMORI",
      "mathNotation": "angka • kata"
    },
    {
      "stage": "Abstract",
      "gameType": "fill-reading-table",
      "title": "Isi Tabel Cara Membaca",
      "bookReference": "hlm. 11",
      "objective": "Melengkapi tabel bacaan.. Ingat Nol Penjaga Tempat. (Nol Penjaga Tempat)",
      "mechanicDescription": "Tiga tabel, empat baris. Gunakan Nol Penjaga Tempat.",
      "voiceGuide": "Nol Penjaga Tempat. Mainkan dengan teliti.",
      "symbolLarge": "7.350",
      "wordLarge": "TABEL",
      "mathNotation": "bilangan • dibaca"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-reading",
      "title": "Benar atau Salah: Membaca",
      "bookReference": "hlm. 4–11",
      "objective": "Menilai pernyataan membaca/menulis.. Ingat Nol Penjaga Tempat. (Nol Penjaga Tempat)",
      "mechanicDescription": "Dua ronde, lima pernyataan. Gunakan Nol Penjaga Tempat.",
      "voiceGuide": "Nol Penjaga Tempat. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-number",
      "title": "Detektif Bilangan Empat Angka",
      "bookReference": "hlm. 8–11",
      "objective": "Menemukan bilangan dari dua petunjuk.. Ingat Nol Penjaga Tempat. (Nol Penjaga Tempat)",
      "mechanicDescription": "Empat soal. Gunakan Nol Penjaga Tempat.",
      "voiceGuide": "Nol Penjaga Tempat. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "dua petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "select-all-numbers",
      "title": "Ketuk Semua yang Cocok: Angka",
      "bookReference": "hlm. 9–11",
      "objective": "Memilih bilangan sesuai syarat digit.. Ingat Nol Penjaga Tempat. (Nol Penjaga Tempat)",
      "mechanicDescription": "Tiga ronde, empat bilangan. Gunakan Nol Penjaga Tempat.",
      "voiceGuide": "Nol Penjaga Tempat. Mainkan dengan teliti.",
      "symbolLarge": "✔✔",
      "wordLarge": "SEMUA COCOK",
      "mathNotation": "syarat digit"
    },
    {
      "stage": "Abstract",
      "gameType": "build-number-sentence",
      "title": "Susun Kata Bilangan",
      "bookReference": "hlm. 6–9",
      "objective": "Menyusun kalimat tentang bilangan.. Ingat Nol Penjaga Tempat. (Nol Penjaga Tempat)",
      "mechanicDescription": "Empat kalimat. Gunakan Nol Penjaga Tempat.",
      "voiceGuide": "Nol Penjaga Tempat. Mainkan dengan teliti.",
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
      "ikon": "🌍",
      "nama": "Balok Dienes Empat Tingkat",
      "isi": "Peti–dus–bungkus–benda membantu membaca ribuan sampai satuan.",
      "suara": "Balok Dienes Empat Tingkat. Peti–dus–bungkus–benda membantu membaca ribuan sampai satuan."
    },
    {
      "ikon": "🌍",
      "nama": "Papan Nilai Tempat",
      "isi": "Setiap digit punya nilai menurut tempatnya.",
      "suara": "Papan Nilai Tempat. Setiap digit punya nilai menurut tempatnya."
    },
    {
      "ikon": "🌍",
      "nama": "Nol Penjaga Tempat",
      "isi": "Nol tidak dibaca keras, tetapi menjaga tempat digit.",
      "suara": "Nol Penjaga Tempat. Nol tidak dibaca keras, tetapi menjaga tempat digit."
    }
  ],
  "poinSuara": "Ingat: Balok Dienes Empat Tingkat, Papan Nilai Tempat, Nol Penjaga Tempat.",
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
  "rumah": "Ayo Mencoba: terapkan Balok Dienes Empat Tingkat pada satu soal nyata di rumah.",
  "refleksi": [
    "Bagaimana Balok Dienes Empat Tingkat membantumu?",
    "Kapan memakai Papan Nilai Tempat?",
    "Apa bedanya dengan hanya menghafal tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Dienes Blocks",
      "namaId": "Balok Dienes Empat Tingkat",
      "asal": "Zoltan Dienes",
      "ringkas": "Peti–dus–bungkus–benda membantu membaca ribuan sampai satuan.",
      "tahap": [
        "Story",
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Place-Value Chart",
      "namaId": "Papan Nilai Tempat",
      "asal": "Van de Walle",
      "ringkas": "Setiap digit punya nilai menurut tempatnya.",
      "tahap": [
        "Mind",
        "Abstract",
        "Infografis"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Zero as Placeholder",
      "namaId": "Nol Penjaga Tempat",
      "asal": "Place-value pedagogy",
      "ringkas": "Nol tidak dibaca keras, tetapi menjaga tempat digit.",
      "tahap": [
        "Story",
        "Abstract"
      ]
    }
  ]
};

export const SUB_B41: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Nilai Tempat)",
  "fullTitle": "Sub-Bab B: Menentukan dan Menggunakan Nilai Tempat Bilangan Cacah sampai 10.000",
  "targetDescription": "Siswa menentukan tempat dan nilai setiap angka pada bilangan empat angka (pada 2.150, angka 2 bernilai 2.000), menyusun dan mengurai bilangan, serta mengisi tabel digit ribuan–satuan. Siswa memakai cara Nilai Tempat, Tukar Sepuluh, Bentuk Uraian. Siswa memakai cara Nilai Tempat, Tukar Sepuluh, Bentuk Uraian.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Kita belajar nilai tempat. Empat kardus: ribuan, ratusan, puluhan, satuan. Pada 2.150, angka 2 bernilai dua ribu, angka 1 bernilai seratus, angka 5 bernilai lima puluh, angka 0 bernilai nol di satuan. Kita mengurai bilangan dan mengisi tabel digit. Kita memakai cara: Nilai Tempat, Tukar Sepuluh, Bentuk Uraian. Nilai digit = digit × nilai tempatnya. Sepuluh benda sama dengan satu bungkus; begitu seterusnya ke atas. Tulis bilangan sebagai jumlah nilai tempat. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menentukan nilai tempat bilangan cacah sampai 10.000.",
    "referensi": "Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 1 Sub-Bab B)."
  },
  "videos": [],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Menentukan dan Menggunakan Nilai Tempat Bilangan Cacah sampai 10.000 dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa menentukan tempat dan nilai setiap angka pada bilangan empat angka (pada 2.150, angka 2 bernilai 2.000), menyusun ….",
      "icon": "❓",
      "flowFrom": "Pahami soal",
      "flowTo": "Place Value"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Place Value",
      "stepDesc": "Nilai digit = digit × nilai tempatnya. Pada Menentukan dan Menggunakan Nilai Tempat Bilangan Cacah sampai 10.000, langkah “Place Value” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Nilai Tempat: Nilai digit = digit × nilai tempatnya. Tukar Sepuluh: Sepuluh benda sama dengan satu bungkus; begitu seterusnya ke atas. Bentuk Uraian: Tulis bila…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🧭",
      "flowFrom": "Place Value",
      "flowTo": "Dienes Trade"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Dienes Trade",
      "stepDesc": "Sepuluh benda sama dengan satu bungkus; begitu seterusnya ke atas. Pada Menentukan dan Menggunakan Nilai Tempat Bilangan Cacah sampai 10.000, langkah “Dienes Trade” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Nilai Tempat: Nilai digit = digit × nilai tempatnya. Tukar Sepuluh: Sepuluh benda sama dengan satu bungkus; begitu seterusnya ke atas. Bentuk Uraian: Tulis bila…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🛠️",
      "flowFrom": "Dienes Trade",
      "flowTo": "Expanded Form"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Expanded Form",
      "stepDesc": "Tulis bilangan sebagai jumlah nilai tempat. Pada Menentukan dan Menggunakan Nilai Tempat Bilangan Cacah sampai 10.000, langkah “Expanded Form” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Nilai Tempat: Nilai digit = digit × nilai tempatnya. Tukar Sepuluh: Sepuluh benda sama dengan satu bungkus; begitu seterusnya ke atas. Bentuk Uraian: Tulis bila…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "✨",
      "flowFrom": "Expanded Form",
      "flowTo": "Kerjakan"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Kerjakan",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Menentukan dan Menggunakan Nilai Tempat Bilangan Cacah sampai 10.000. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "✏️",
      "flowFrom": "Kerjakan",
      "flowTo": "Cek masuk akal"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek masuk akal",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Menentukan dan Menggunakan Nilai Tempat Bilangan Cacah sampai 10.000. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Cek masuk akal",
      "flowTo": "Simpulkan"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Simpulkan",
      "stepDesc": "Simpulkan ide utama Menentukan dan Menggunakan Nilai Tempat Bilangan Cacah sampai 10.000 dengan kalimatmu sendiri. Sebutkan cara yang kamu pakai dan mengapa cara itu membantu. Jelaskan kepada teman seolah-olah kamu guru kecil. Simpulan yang jelas menandakan konsepnya sudah dipahami.",
      "icon": "💬",
      "flowFrom": "Simpulkan",
      "flowTo": "Main"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Main",
      "stepDesc": "Latih lagi di tahap Concrete, Picture, lalu Abstract untuk Menentukan dan Menggunakan Nilai Tempat Bilangan Cacah sampai 10.000. Mulai dari benda nyata, lanjut ke diagram, baru ke lambang angka. Ulangi sampai kamu bisa menjelaskan tanpa melihat contoh. Bermain sambil berlatih membuat konsepnya melekat lebih lama.",
      "icon": "🎮",
      "flowFrom": "Main",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "DIGIT ≠ NILAI",
      "emoji": "⚖️",
      "countNum": 2,
      "countWord": "digit 2 bisa bernilai 2.000",
      "suara": "Digit adalah angka yang tertulis. Nilainya bergantung pada tempat. Pada Menentukan dan Menggunakan Nilai Tempat Bilangan Cacah sampai 10.000, cocokkan gambar “DIGIT ≠ NILAI” dengan artinya (digit 2 bisa bernilai 2.000), lalu sebut satu…",
      "teksVisual": "⚖️ Digit adalah angka yang tertulis. Nilainya bergantung…"
    },
    {
      "judul": "RIBUAN ×1000",
      "emoji": "🟣",
      "countNum": 2000,
      "countWord": "2 di ribuan = 2.000",
      "suara": "Angka di ribuan dikali seribu. Pada Menentukan dan Menggunakan Nilai Tempat Bilangan Cacah sampai 10.000, cocokkan gambar “RIBUAN ×1000” dengan artinya (2 di ribuan = 2.000), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🟣 RIBUAN ×1000: 2 di ribuan = 2.000"
    },
    {
      "judul": "RATUSAN ×100",
      "emoji": "🟢",
      "countNum": 100,
      "countWord": "1 di ratusan = 100",
      "suara": "Angka di ratusan dikali seratus. Pada Menentukan dan Menggunakan Nilai Tempat Bilangan Cacah sampai 10.000, cocokkan gambar “RATUSAN ×100” dengan artinya (1 di ratusan = 100), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🟢 RATUSAN ×100: 1 di ratusan = 100"
    },
    {
      "judul": "PULUHAN ×10",
      "emoji": "🔵",
      "countNum": 50,
      "countWord": "5 di puluhan = 50",
      "suara": "Angka di puluhan dikali sepuluh. Pada Menentukan dan Menggunakan Nilai Tempat Bilangan Cacah sampai 10.000, cocokkan gambar “PULUHAN ×10” dengan artinya (5 di puluhan = 50), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🔵 PULUHAN ×10: 5 di puluhan = 50"
    },
    {
      "judul": "SATUAN ×1",
      "emoji": "🔴",
      "countNum": 0,
      "countWord": "0 di satuan = 0",
      "suara": "Angka di satuan dikali satu. Pada Menentukan dan Menggunakan Nilai Tempat Bilangan Cacah sampai 10.000, cocokkan gambar “SATUAN ×1” dengan artinya (0 di satuan = 0), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🔴 SATUAN ×1: 0 di satuan = 0"
    },
    {
      "judul": "URAIAN",
      "emoji": "🔓",
      "countNum": 2150,
      "countWord": "2000+100+50+0",
      "suara": "Uraian menulis nilai tiap tempat. Pada Menentukan dan Menggunakan Nilai Tempat Bilangan Cacah sampai 10.000, cocokkan gambar “URAIAN” dengan artinya (2000+100+50+0), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🔓 URAIAN: 2000+100+50+0"
    },
    {
      "judul": "TABEL DIGIT",
      "emoji": "📋",
      "countNum": 7812,
      "countWord": "7|8|1|2",
      "suara": "Tabel diisi digit, bukan nilai penuh. Pada tabel, kita menulis digitnya, bukan nilai penuh. Untuk 7.812 tulis 7 | 8 | 1 | 2. Ingat: Tabel digit; 7 8 1 2; Bukan 7000.",
      "teksVisual": "📋 TABEL DIGIT: 7|8|1|2"
    },
    {
      "judul": "EMPAT KARDUS",
      "emoji": "📦",
      "countNum": 4,
      "countWord": "aktivitas buku",
      "suara": "Empat kardus membantu menyusun bilangan. Pada Menentukan dan Menggunakan Nilai Tempat Bilangan Cacah sampai 10.000, cocokkan gambar “EMPAT KARDUS” dengan artinya (aktivitas buku), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "📦 EMPAT KARDUS: aktivitas buku"
    },
    {
      "judul": "TEMPAT MENGUBAH NILAI",
      "emoji": "6️⃣",
      "countNum": 60,
      "countWord": "6 di puluhan = 60",
      "suara": "Angka sama, tempat beda, nilai beda. Pada Menentukan dan Menggunakan Nilai Tempat Bilangan Cacah sampai 10.000, cocokkan gambar “TEMPAT MENGUBAH NILAI” dengan artinya (6 di puluhan = 60), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "6️⃣ TEMPAT MENGUBAH NILAI: 6 di puluhan = 60"
    },
    {
      "judul": "SIAP BANDING",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "lanjut Sub-Bab C",
      "suara": "SIAP BANDING (lanjut Sub-Bab C). Skala kualitatif sudah siap. Berikutnya bandingkan dua peluang dengan rasio untung/total, lalu putuskan adil atau kurang adil. Nilai tempat siap dipakai untuk membandingkan.",
      "teksVisual": "➡️ SIAP BANDING: lanjut Sub-Bab C"
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "value-from-package",
      "title": "Nilai Tempat dari Kumpulan",
      "bookReference": "hlm. 12–14 (2.150)",
      "objective": "Pakai Nilai Tempat: Nilai digit = digit × nilai tempatnya. Latihan: Menentukan nilai tempat angka pada kumpulan..",
      "mechanicDescription": "Tiga ronde, dua soal. Saat bermain, ingat Nilai Tempat: Nilai digit = digit × nilai tempatnya.",
      "voiceGuide": "Nilai Tempat. Nilai digit = digit × nilai tempatnya.",
      "emoji": "📍",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "compose-from-parts",
      "title": "Susun dari Peti sampai Satuan",
      "bookReference": "hlm. 13–14",
      "objective": "Pakai Nilai Tempat: Nilai digit = digit × nilai tempatnya. Latihan: Menyusun bilangan dari digit tempat..",
      "mechanicDescription": "Tiga ronde, dua soal di papan. Saat bermain, ingat Nilai Tempat: Nilai digit = digit × nilai tempatnya.",
      "voiceGuide": "Nilai Tempat. Nilai digit = digit × nilai tempatnya.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "expand-package",
      "title": "Uraikan Kumpulan",
      "bookReference": "hlm. 14",
      "objective": "Pakai Nilai Tempat: Nilai digit = digit × nilai tempatnya. Latihan: Mengurai menjadi 2000+100+50+0..",
      "mechanicDescription": "Tiga ronde, dua soal. Saat bermain, ingat Nilai Tempat: Nilai digit = digit × nilai tempatnya.",
      "voiceGuide": "Nilai Tempat. Nilai digit = digit × nilai tempatnya.",
      "emoji": "🔓",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "fill-place-table-c",
      "title": "Isi Tabel dari Kumpulan",
      "bookReference": "hlm. 14–16",
      "objective": "Pakai Nilai Tempat: Nilai digit = digit × nilai tempatnya. Latihan: Mengisi digit tabel dari kumpulan..",
      "mechanicDescription": "Tiga tabel. Saat bermain, ingat Nilai Tempat: Nilai digit = digit × nilai tempatnya.",
      "voiceGuide": "Nilai Tempat. Nilai digit = digit × nilai tempatnya.",
      "emoji": "📋",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "match-digit-value-c",
      "title": "Jodohkan Digit dan Nilainya",
      "bookReference": "hlm. 14 (angka 2 bernilai 2.000)",
      "objective": "Menjodohkan digit tempat dengan nilainya.. Ingat Nilai Tempat. (Nilai Tempat)",
      "mechanicDescription": "Tiga ronde, tiga pasangan. Gunakan Nilai Tempat.",
      "voiceGuide": "Nilai Tempat. Mainkan dengan teliti.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "memory-value-c",
      "title": "Memori Nilai Tempat",
      "bookReference": "hlm. 14",
      "objective": "Memori nilai tempat.. Ingat Nilai Tempat. (Nilai Tempat)",
      "mechanicDescription": "Tiga ronde, empat pasang. Gunakan Nilai Tempat.",
      "voiceGuide": "Nilai Tempat. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-place-c",
      "title": "Ketuk Tempat Angka",
      "bookReference": "hlm. 14",
      "objective": "Mengetuk tempat digit tertentu.. Ingat Nilai Tempat. (Nilai Tempat)",
      "mechanicDescription": "Tiga ronde, dua pertanyaan. Gunakan Nilai Tempat.",
      "voiceGuide": "Nilai Tempat. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-value-c",
      "title": "Ketuk Semua Syarat Nilai",
      "bookReference": "hlm. 15",
      "objective": "Memilih kumpulan sesuai syarat.. Ingat Nilai Tempat. (Nilai Tempat)",
      "mechanicDescription": "Tiga ronde. Gunakan Nilai Tempat.",
      "voiceGuide": "Nilai Tempat. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "board-value-c",
      "title": "Papan Nilai dari Cerita Harga",
      "bookReference": "hlm. 15 (struk 7.350)",
      "objective": "Mengisi papan dari harga.. Ingat Nilai Tempat. (Nilai Tempat)",
      "mechanicDescription": "Tiga ronde, dua soal. Gunakan Nilai Tempat.",
      "voiceGuide": "Nilai Tempat. Mainkan dengan teliti.",
      "emoji": "🗂️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "digit-six-c",
      "title": "Di Mana Angka Enam",
      "bookReference": "hlm. 15 (nilai tempat angka 6)",
      "objective": "Menemukan nilai tempat angka 6.. Ingat Nilai Tempat. (Nilai Tempat)",
      "mechanicDescription": "Tiga ronde, dua soal. Gunakan Nilai Tempat.",
      "voiceGuide": "Nilai Tempat. Mainkan dengan teliti.",
      "emoji": "6️⃣",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "value-from-blocks",
      "title": "Nilai Tempat dari Blok",
      "bookReference": "hlm. 14",
      "objective": "Pakai Tukar Sepuluh: Sepuluh benda sama dengan satu bungkus; begitu seterusnya ke atas. Latihan: Nilai digit dari model..",
      "mechanicDescription": "Tiga ronde, dua soal. Saat bermain, ingat Tukar Sepuluh: Sepuluh benda sama dengan satu bungkus; begitu seterusnya ke atas.",
      "voiceGuide": "Tukar Sepuluh. Sepuluh benda sama dengan satu bungkus; begitu seterusnya ke atas.",
      "diagramType": "blocks-value",
      "numberA": 4,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "board-from-blocks-b",
      "title": "Papan dari Blok B",
      "bookReference": "hlm. 14–16",
      "objective": "Pakai Tukar Sepuluh: Sepuluh benda sama dengan satu bungkus; begitu seterusnya ke atas. Latihan: Isi papan dari blok..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Tukar Sepuluh: Sepuluh benda sama dengan satu bungkus; begitu seterusnya ke atas.",
      "voiceGuide": "Tukar Sepuluh. Sepuluh benda sama dengan satu bungkus; begitu seterusnya ke atas.",
      "diagramType": "blocks-board",
      "numberA": 4,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "fill-table-b",
      "title": "Isi Tabel Nilai Tempat",
      "bookReference": "hlm. 16",
      "objective": "Pakai Tukar Sepuluh: Sepuluh benda sama dengan satu bungkus; begitu seterusnya ke atas. Latihan: Lengkapi tabel 6.192 dst..",
      "mechanicDescription": "Tiga tabel. Saat bermain, ingat Tukar Sepuluh: Sepuluh benda sama dengan satu bungkus; begitu seterusnya ke atas.",
      "voiceGuide": "Tukar Sepuluh. Sepuluh benda sama dengan satu bungkus; begitu seterusnya ke atas.",
      "diagramType": "place-table",
      "numberA": 4,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "match-blocks-value",
      "title": "Jodohkan Blok dan Uraian",
      "bookReference": "hlm. 14",
      "objective": "Pakai Tukar Sepuluh: Sepuluh benda sama dengan satu bungkus; begitu seterusnya ke atas. Latihan: Model dengan uraian..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Tukar Sepuluh: Sepuluh benda sama dengan satu bungkus; begitu seterusnya ke atas.",
      "voiceGuide": "Tukar Sepuluh. Sepuluh benda sama dengan satu bungkus; begitu seterusnya ke atas.",
      "diagramType": "blocks-expand",
      "numberA": 4,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memory-expand",
      "title": "Memori Uraian",
      "bookReference": "hlm. 14",
      "objective": "Memori bilangan dan uraian.. Ingat Tukar Sepuluh. (Tukar Sepuluh)",
      "mechanicDescription": "Tiga ronde. Gunakan Tukar Sepuluh.",
      "voiceGuide": "Tukar Sepuluh. Mainkan dengan teliti.",
      "diagramType": "expand-memory",
      "numberA": 4,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "expand-choice",
      "title": "Pilih Uraian",
      "bookReference": "hlm. 14",
      "objective": "Memilih uraian benar.. Ingat Tukar Sepuluh. (Tukar Sepuluh)",
      "mechanicDescription": "Tiga ronde, dua soal. Gunakan Tukar Sepuluh.",
      "voiceGuide": "Tukar Sepuluh. Mainkan dengan teliti.",
      "diagramType": "expand-choice",
      "numberA": 4,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-blocks-b",
      "title": "Ketuk Semua Blok B",
      "bookReference": "hlm. 15",
      "objective": "Syarat digit pada model.. Ingat Tukar Sepuluh. (Tukar Sepuluh)",
      "mechanicDescription": "Tiga ronde. Gunakan Tukar Sepuluh.",
      "voiceGuide": "Tukar Sepuluh. Mainkan dengan teliti.",
      "diagramType": "blocks-select",
      "numberA": 4,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-thousands",
      "title": "Pilah menurut Ribuan",
      "bookReference": "hlm. 14",
      "objective": "Memilah menurut digit ribuan.. Ingat Tukar Sepuluh. (Tukar Sepuluh)",
      "mechanicDescription": "Tiga ronde, enam model. Gunakan Tukar Sepuluh.",
      "voiceGuide": "Tukar Sepuluh. Mainkan dengan teliti.",
      "diagramType": "blocks-sort",
      "numberA": 4,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "sentence-place",
      "title": "Lengkapi Kalimat Nilai Tempat",
      "bookReference": "hlm. 14–15",
      "objective": "Kalimat tentang nilai digit.. Ingat Tukar Sepuluh. (Tukar Sepuluh)",
      "mechanicDescription": "Tiga bilangan, tiga kalimat. Gunakan Tukar Sepuluh.",
      "voiceGuide": "Tukar Sepuluh. Mainkan dengan teliti.",
      "diagramType": "place-sentence",
      "numberA": 4,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-value-chips",
      "title": "Ketuk Chip Nilai",
      "bookReference": "hlm. 14",
      "objective": "Mengetuk chip 2000/100/50/0.. Ingat Tukar Sepuluh. (Tukar Sepuluh)",
      "mechanicDescription": "Tiga ronde. Gunakan Tukar Sepuluh.",
      "voiceGuide": "Tukar Sepuluh. Mainkan dengan teliti.",
      "diagramType": "value-chips",
      "numberA": 4,
      "numberB": 4
    },
    {
      "stage": "Abstract",
      "gameType": "compose-board-b",
      "title": "Susun di Papan Nilai Tempat",
      "bookReference": "hlm. 14",
      "objective": "Pakai Bentuk Uraian: Tulis bilangan sebagai jumlah nilai tempat. Latihan: Menyusun dari instruksi digit..",
      "mechanicDescription": "Tiga ronde, dua soal. Saat bermain, ingat Bentuk Uraian: Tulis bilangan sebagai jumlah nilai tempat.",
      "voiceGuide": "Bentuk Uraian. Tulis bilangan sebagai jumlah nilai tempat.",
      "symbolLarge": "2.150",
      "wordLarge": "PAPAN",
      "mathNotation": "digit → bilangan"
    },
    {
      "stage": "Abstract",
      "gameType": "value-of-digit",
      "title": "Nilai Angka pada Tempat",
      "bookReference": "hlm. 14–15",
      "objective": "Pakai Bentuk Uraian: Tulis bilangan sebagai jumlah nilai tempat. Latihan: Memilih nilai tempat sebuah digit..",
      "mechanicDescription": "Tiga ronde, dua soal. Saat bermain, ingat Bentuk Uraian: Tulis bilangan sebagai jumlah nilai tempat.",
      "voiceGuide": "Bentuk Uraian. Tulis bilangan sebagai jumlah nilai tempat.",
      "symbolLarge": "2→2000",
      "wordLarge": "NILAI",
      "mathNotation": "digit × bobot"
    },
    {
      "stage": "Abstract",
      "gameType": "write-place-board",
      "title": "Tulis dari Kata ke Papan",
      "bookReference": "hlm. 14",
      "objective": "Pakai Bentuk Uraian: Tulis bilangan sebagai jumlah nilai tempat. Latihan: Kata bilangan ke papan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Bentuk Uraian: Tulis bilangan sebagai jumlah nilai tempat.",
      "voiceGuide": "Bentuk Uraian. Tulis bilangan sebagai jumlah nilai tempat.",
      "symbolLarge": "7.350",
      "wordLarge": "TULIS",
      "mathNotation": "kata → digit"
    },
    {
      "stage": "Abstract",
      "gameType": "match-digit-value",
      "title": "Jodohkan Digit dan Nilai",
      "bookReference": "hlm. 14",
      "objective": "Pakai Bentuk Uraian: Tulis bilangan sebagai jumlah nilai tempat. Latihan: Digit tempat dengan nilai..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Bentuk Uraian: Tulis bilangan sebagai jumlah nilai tempat.",
      "voiceGuide": "Bentuk Uraian. Tulis bilangan sebagai jumlah nilai tempat.",
      "symbolLarge": "7→7000",
      "wordLarge": "JODOHKAN",
      "mathNotation": "digit • nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-digit-value",
      "title": "Memori Digit dan Nilai",
      "bookReference": "hlm. 14",
      "objective": "Memori nilai tempat.. Ingat Bentuk Uraian. (Bentuk Uraian)",
      "mechanicDescription": "Tiga ronde. Gunakan Bentuk Uraian.",
      "voiceGuide": "Bentuk Uraian. Mainkan dengan teliti.",
      "symbolLarge": "9000",
      "wordLarge": "MEMORI",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "fill-place-table-q",
      "title": "Isi Tabel Digit",
      "bookReference": "hlm. 16",
      "objective": "Lengkapi tabel lambang→digit.. Ingat Bentuk Uraian. (Bentuk Uraian)",
      "mechanicDescription": "Tiga tabel. Gunakan Bentuk Uraian.",
      "voiceGuide": "Bentuk Uraian. Mainkan dengan teliti.",
      "symbolLarge": "6.192",
      "wordLarge": "TABEL",
      "mathNotation": "R P S"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-place",
      "title": "Benar atau Salah: Nilai Tempat",
      "bookReference": "hlm. 12–16",
      "objective": "Menilai pernyataan nilai tempat.. Ingat Bentuk Uraian. (Bentuk Uraian)",
      "mechanicDescription": "Dua ronde, lima. Gunakan Bentuk Uraian.",
      "voiceGuide": "Bentuk Uraian. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-place",
      "title": "Detektif Nilai Tempat",
      "bookReference": "hlm. 14–16",
      "objective": "Petunjuk nilai tempat.. Ingat Bentuk Uraian. (Bentuk Uraian)",
      "mechanicDescription": "Empat soal. Gunakan Bentuk Uraian.",
      "voiceGuide": "Bentuk Uraian. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "select-all-place",
      "title": "Ketuk Semua Syarat Tempat",
      "bookReference": "hlm. 15",
      "objective": "Syarat digit.. Ingat Bentuk Uraian. (Bentuk Uraian)",
      "mechanicDescription": "Tiga ronde. Gunakan Bentuk Uraian.",
      "voiceGuide": "Bentuk Uraian. Mainkan dengan teliti.",
      "symbolLarge": "✔✔",
      "wordLarge": "SEMUA",
      "mathNotation": "syarat"
    },
    {
      "stage": "Abstract",
      "gameType": "build-place-sentence",
      "title": "Susun Kata Nilai Tempat",
      "bookReference": "hlm. 14",
      "objective": "Kalimat nilai tempat.. Ingat Bentuk Uraian. (Bentuk Uraian)",
      "mechanicDescription": "Empat kalimat. Gunakan Bentuk Uraian.",
      "voiceGuide": "Bentuk Uraian. Mainkan dengan teliti.",
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
      "ikon": "🌍",
      "nama": "Nilai Tempat",
      "isi": "Nilai digit = digit × nilai tempatnya.",
      "suara": "Nilai Tempat. Nilai digit = digit × nilai tempatnya."
    },
    {
      "ikon": "🌍",
      "nama": "Tukar Sepuluh",
      "isi": "Sepuluh benda sama dengan satu bungkus; begitu seterusnya ke atas.",
      "suara": "Tukar Sepuluh. Sepuluh benda sama dengan satu bungkus; begitu seterusnya ke atas."
    },
    {
      "ikon": "🌍",
      "nama": "Bentuk Uraian",
      "isi": "Tulis bilangan sebagai jumlah nilai tempat.",
      "suara": "Bentuk Uraian. Tulis bilangan sebagai jumlah nilai tempat."
    }
  ],
  "poinSuara": "Ingat: Nilai Tempat, Tukar Sepuluh, Bentuk Uraian.",
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
  "rumah": "Ayo Mencoba: terapkan Nilai Tempat pada satu soal nyata di rumah.",
  "refleksi": [
    "Bagaimana Nilai Tempat membantumu?",
    "Kapan memakai Tukar Sepuluh?",
    "Apa bedanya dengan hanya menghafal tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Place Value",
      "namaId": "Nilai Tempat",
      "asal": "Van de Walle",
      "ringkas": "Nilai digit = digit × nilai tempatnya.",
      "tahap": [
        "Story",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Dienes Trade",
      "namaId": "Tukar Sepuluh",
      "asal": "Dienes",
      "ringkas": "Sepuluh benda sama dengan satu bungkus; begitu seterusnya ke atas.",
      "tahap": [
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Expanded Form",
      "namaId": "Bentuk Uraian",
      "asal": "Van de Walle",
      "ringkas": "Tulis bilangan sebagai jumlah nilai tempat.",
      "tahap": [
        "Mind",
        "Abstract"
      ]
    }
  ]
};

export const SUB_C41: SubBabNaskah = {
  "id": "C",
  "codeTitle": "Sub-Bab C (Membandingkan dan Mengurutkan)",
  "fullTitle": "Sub-Bab C: Membandingkan dan Mengurutkan Bilangan Cacah sampai 10.000",
  "targetDescription": "Siswa membandingkan dua bilangan empat angka mulai dari ribuan, menulis < > =, dan mengurutkan bilangan (contoh tinggi gunung 2.460, 3.676, 3.726). Siswa memakai cara Banding dari Kiri, Urutan Garis Bilangan, Mengurutkan Himpunan. Siswa memakai cara Banding dari Kiri, Urutan Garis Bilangan, Mengurutkan Himpunan.",
  "secondaryBg": "#FEF3C7",
  "secondaryBorder": "#D97706",
  "secondaryText": "#78350F",
  "silabus": {
    "teksSuara": "Kita membandingkan harga manggis tujuh ribu lima ratus dan bengkoang delapan ribu tujuh ratus lima puluh. Bandingkan ribuan dulu. Bila sama, lanjut ratusan, puluhan, satuan. Kita mengurutkan tinggi gunung dari terkecil. Kita memakai cara: Banding dari Kiri, Urutan Garis Bilangan, Mengurutkan Himpunan. Bandingkan dari nilai tempat terbesar. Lebih kanan berarti lebih besar. Urut naik atau turun dengan membandingkan berpasangan. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa membandingkan dan mengurutkan bilangan cacah sampai 10.000.",
    "referensi": "Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 1 Sub-Bab C)."
  },
  "videos": [],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Membandingkan dan Mengurutkan Bilangan Cacah sampai 10.000 dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa membandingkan dua bilangan empat angka mulai dari ribuan, menulis < > =, dan mengurutkan bilangan (contoh tinggi g….",
      "icon": "❓",
      "flowFrom": "Pahami soal",
      "flowTo": "Compare Leftmost"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Compare Leftmost",
      "stepDesc": "Bandingkan dari nilai tempat terbesar. Pada Membandingkan dan Mengurutkan Bilangan Cacah sampai 10.000, langkah “Compare Leftmost” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Banding dari Kiri: Bandingkan dari nilai tempat terbesar. Urutan Garis Bilangan: Lebih kanan berarti lebih besar. Mengurutkan Himpunan: Urut naik atau turun den…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🧭",
      "flowFrom": "Compare Leftmost",
      "flowTo": "Number Line Order"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Number Line Order",
      "stepDesc": "Lebih kanan berarti lebih besar. Pada Membandingkan dan Mengurutkan Bilangan Cacah sampai 10.000, langkah “Number Line Order” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Banding dari Kiri: Bandingkan dari nilai tempat terbesar. Urutan Garis Bilangan: Lebih kanan berarti lebih besar. Mengurutkan Himpunan: Urut naik atau turun den…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🛠️",
      "flowFrom": "Number Line Order",
      "flowTo": "Ordering Sets"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Ordering Sets",
      "stepDesc": "Urut naik atau turun dengan membandingkan berpasangan. Pada Membandingkan dan Mengurutkan Bilangan Cacah sampai 10.000, langkah “Ordering Sets” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Banding dari Kiri: Bandingkan dari nilai tempat terbesar. Urutan Garis Bilangan: Lebih kanan berarti lebih besar. Mengurutkan Himpunan: Urut naik atau turun den…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "✨",
      "flowFrom": "Ordering Sets",
      "flowTo": "Kerjakan"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Kerjakan",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Membandingkan dan Mengurutkan Bilangan Cacah sampai 10.000. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "✏️",
      "flowFrom": "Kerjakan",
      "flowTo": "Cek masuk akal"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek masuk akal",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Membandingkan dan Mengurutkan Bilangan Cacah sampai 10.000. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Cek masuk akal",
      "flowTo": "Simpulkan"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Simpulkan",
      "stepDesc": "Simpulkan ide utama Membandingkan dan Mengurutkan Bilangan Cacah sampai 10.000 dengan kalimatmu sendiri. Sebutkan cara yang kamu pakai dan mengapa cara itu membantu. Jelaskan kepada teman seolah-olah kamu guru kecil. Simpulan yang jelas menandakan konsepnya sudah dipahami.",
      "icon": "💬",
      "flowFrom": "Simpulkan",
      "flowTo": "Main"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Main",
      "stepDesc": "Latih lagi di tahap Concrete, Picture, lalu Abstract untuk Membandingkan dan Mengurutkan Bilangan Cacah sampai 10.000. Mulai dari benda nyata, lanjut ke diagram, baru ke lambang angka. Ulangi sampai kamu bisa menjelaskan tanpa melihat contoh. Bermain sambil berlatih membuat konsepnya melekat lebih lama.",
      "icon": "🎮",
      "flowFrom": "Main",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "RIBUAN DULU",
      "emoji": "🟣",
      "countNum": 1,
      "countWord": "langkah pertama",
      "suara": "Membandingkan dimulai dari ribuan. Pada Membandingkan dan Mengurutkan Bilangan Cacah sampai 10.000, cocokkan gambar “RIBUAN DULU” dengan artinya (langkah pertama), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🟣 RIBUAN DULU: langkah pertama"
    },
    {
      "judul": "LANJUT KE KANAN",
      "emoji": "➡️",
      "countNum": 2,
      "countWord": "ratusan → puluhan → satuan",
      "suara": "Bila sama, lanjut ke tempat di kanan. Pada Membandingkan dan Mengurutkan Bilangan Cacah sampai 10.000, cocokkan gambar “LANJUT KE KANAN” dengan artinya (ratusan → puluhan → satuan), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "➡️ LANJUT KE KANAN: ratusan → puluhan → satuan"
    },
    {
      "judul": "LEBIH DARI",
      "emoji": ">",
      "countNum": 8750,
      "countWord": "8.750 > 7.500",
      "suara": "Tanda lebih dari terbuka ke bilangan besar. Mulut tanda terbuka ke bilangan yang lebih besar. 8.750 > 7.500 dibaca delapan ribu tujuh ratus lima puluh lebih dari tujuh ribu lima ratus. Ingat: > lebih dari; Contoh harga; 5.734 dan 4.312.",
      "teksVisual": "> Tanda lebih dari terbuka ke bilangan besar."
    },
    {
      "judul": "KURANG DARI",
      "emoji": "<",
      "countNum": 4352,
      "countWord": "4.352 < 4.365",
      "suara": "KURANG DARI — 4.352 < 4.365. 4.352 < 4.355 karena satuan 2 < 5. Semua tempat kiri sama, satuan yang menentukan. Ingat: < kurang dari; Satuan menentukan; 1.001 < 1.002.",
      "teksVisual": "< KURANG DARI: 4.352 < 4.365"
    },
    {
      "judul": "SAMA DENGAN",
      "emoji": "=",
      "countNum": 4352,
      "countWord": "4.352 = 4.352",
      "suara": "SAMA DENGAN — 4.352 = 4.352. 4.352 dan 4.352. Semua tempat sama. Ditulis 4.352 = 4.352. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Membandingkan dan Mengurutkan Bilangan Cacah sampai 10.000.",
      "teksVisual": "= SAMA DENGAN: 4.352 = 4.352"
    },
    {
      "judul": "URUTAN NAIK",
      "emoji": "📶",
      "countNum": 2460,
      "countWord": "2.460 → 3.676 → 3.726",
      "suara": "Dari terkecil ke terbesar. Ribuan: 2 kurang dari 3, jadi 2.460 paling kecil. Antara 3.676 dan 3.726, ratusan 6 < 7. Ingat: 2.460 terkecil; 3.676 < 3.726; Urutan naik.",
      "teksVisual": "📶 URUTAN NAIK: 2.460 → 3.676 → 3.726"
    },
    {
      "judul": "URUTAN TURUN",
      "emoji": "📉",
      "countNum": 3726,
      "countWord": "dari terbesar",
      "suara": "Dari terbesar ke terkecil. Pada Membandingkan dan Mengurutkan Bilangan Cacah sampai 10.000, cocokkan gambar “URUTAN TURUN” dengan artinya (dari terbesar), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "📉 URUTAN TURUN: dari terbesar"
    },
    {
      "judul": "TEMPAT PENENTU",
      "emoji": "🔍",
      "countNum": 1,
      "countWord": "tempat pertama yang berbeda",
      "suara": "Tempat pertama yang berbeda menentukan hasil. Pada Membandingkan dan Mengurutkan Bilangan Cacah sampai 10.000, cocokkan gambar “TEMPAT PENENTU” dengan artinya (tempat pertama yang berbeda), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🔍 Tempat pertama yang berbeda menentukan hasil."
    },
    {
      "judul": "KARTU DIGIT",
      "emoji": "🃏",
      "countNum": 9521,
      "countWord": "1,5,9,2 → terbesar 9.521",
      "suara": "Susun digit dari besar untuk bilangan terbesar. Pada Membandingkan dan Mengurutkan Bilangan Cacah sampai 10.000, cocokkan gambar “KARTU DIGIT” dengan artinya (1,5,9,2 → terbesar 9.521), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🃏 Susun digit dari besar untuk bilangan terbesar."
    },
    {
      "judul": "TELITI TANDA",
      "emoji": "⚠️",
      "countNum": 1,
      "countWord": "tanda dibalik arti berubah",
      "suara": "Baca tanda dengan teliti. Pada Membandingkan dan Mengurutkan Bilangan Cacah sampai 10.000, cocokkan gambar “TELITI TANDA” dengan artinya (tanda dibalik arti berubah), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "⚠️ TELITI TANDA: tanda dibalik arti berubah"
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "compare-collections",
      "title": "Bandingkan Kumpulan Harga",
      "bookReference": "hlm. 16–18 (7.500 dan 8.750)",
      "objective": "Pakai Banding dari Kiri: Bandingkan dari nilai tempat terbesar. Latihan: Menentukan kumpulan mana lebih banyak..",
      "mechanicDescription": "Tiga ronde, dua soal. Saat bermain, ingat Banding dari Kiri: Bandingkan dari nilai tempat terbesar.",
      "voiceGuide": "Banding dari Kiri. Bandingkan dari nilai tempat terbesar.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sign-collections",
      "title": "Tanda untuk Kumpulan",
      "bookReference": "hlm. 18–20 (< > =)",
      "objective": "Pakai Banding dari Kiri: Bandingkan dari nilai tempat terbesar. Latihan: Memilih tanda untuk dua kumpulan..",
      "mechanicDescription": "Tiga ronde, dua soal. Saat bermain, ingat Banding dari Kiri: Bandingkan dari nilai tempat terbesar.",
      "voiceGuide": "Banding dari Kiri. Bandingkan dari nilai tempat terbesar.",
      "emoji": "🐊",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-collections",
      "title": "Urutkan Kumpulan Gunung",
      "bookReference": "hlm. 21–23 (2.460, 3.676, 3.726)",
      "objective": "Pakai Banding dari Kiri: Bandingkan dari nilai tempat terbesar. Latihan: Mengurutkan empat kumpulan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Banding dari Kiri: Bandingkan dari nilai tempat terbesar.",
      "voiceGuide": "Banding dari Kiri. Bandingkan dari nilai tempat terbesar.",
      "emoji": "📶",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "most-least-collection",
      "title": "Paling Banyak, Paling Sedikit",
      "bookReference": "hlm. 21–23",
      "objective": "Pakai Banding dari Kiri: Bandingkan dari nilai tempat terbesar. Latihan: Menemukan paling banyak/sedikit..",
      "mechanicDescription": "Tiga ronde, dua tanya. Saat bermain, ingat Banding dari Kiri: Bandingkan dari nilai tempat terbesar.",
      "voiceGuide": "Banding dari Kiri. Bandingkan dari nilai tempat terbesar.",
      "emoji": "🏆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "match-collection-sign",
      "title": "Jodohkan Pasangan dan Tanda",
      "bookReference": "hlm. 18–20",
      "objective": "Pasangan kumpulan dengan tanda.. Ingat Banding dari Kiri. (Banding dari Kiri)",
      "mechanicDescription": "Tiga ronde, tiga pasangan. Gunakan Banding dari Kiri.",
      "voiceGuide": "Banding dari Kiri. Mainkan dengan teliti.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "slot-collection-order",
      "title": "Taruh di Urutan",
      "bookReference": "hlm. 22–23",
      "objective": "Taruh ke terkecil–tengah–terbesar.. Ingat Banding dari Kiri. (Banding dari Kiri)",
      "mechanicDescription": "Tiga ronde. Gunakan Banding dari Kiri.",
      "voiceGuide": "Banding dari Kiri. Mainkan dengan teliti.",
      "emoji": "📥",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-more-collection",
      "title": "Ketuk Semua yang Lebih/Kurang",
      "bookReference": "hlm. 17–20",
      "objective": "Semua yang lebih/kurang dari acuan.. Ingat Banding dari Kiri. (Banding dari Kiri)",
      "mechanicDescription": "Tiga ronde. Gunakan Banding dari Kiri.",
      "voiceGuide": "Banding dari Kiri. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "same-thousands-collection",
      "title": "Ribuan Sama, Lihat Berikutnya",
      "bookReference": "hlm. 19 (4.352 dan 4.365)",
      "objective": "Membandingkan saat ribuan sama.. Ingat Banding dari Kiri. (Banding dari Kiri)",
      "mechanicDescription": "Tiga ronde, dua soal. Gunakan Banding dari Kiri.",
      "voiceGuide": "Banding dari Kiri. Mainkan dengan teliti.",
      "emoji": "🔍",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "between-collection",
      "title": "Di Antara Dua Kumpulan",
      "bookReference": "hlm. 22–23",
      "objective": "Kumpulan di antara dua batas.. Ingat Banding dari Kiri. (Banding dari Kiri)",
      "mechanicDescription": "Tiga ronde. Gunakan Banding dari Kiri.",
      "voiceGuide": "Banding dari Kiri. Mainkan dengan teliti.",
      "emoji": "↔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-prices",
      "title": "Cerita Harga dan Gunung",
      "bookReference": "hlm. 16–23",
      "objective": "Cerita tiga objek, paling banyak/sedikit.. Ingat Banding dari Kiri. (Banding dari Kiri)",
      "mechanicDescription": "Tiga ronde, dua soal. Gunakan Banding dari Kiri.",
      "voiceGuide": "Banding dari Kiri. Mainkan dengan teliti.",
      "emoji": "🧒",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "compare-blocks",
      "title": "Bandingkan Blok",
      "bookReference": "hlm. 18–20",
      "objective": "Pakai Urutan Garis Bilangan: Lebih kanan berarti lebih besar. Latihan: Model mana lebih besar..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Urutan Garis Bilangan: Lebih kanan berarti lebih besar.",
      "voiceGuide": "Urutan Garis Bilangan. Lebih kanan berarti lebih besar.",
      "diagramType": "blocks-compare",
      "numberA": 4,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sign-blocks",
      "title": "Tanda untuk Blok",
      "bookReference": "hlm. 18–20",
      "objective": "Pakai Urutan Garis Bilangan: Lebih kanan berarti lebih besar. Latihan: Pilih tanda dua model..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Urutan Garis Bilangan: Lebih kanan berarti lebih besar.",
      "voiceGuide": "Urutan Garis Bilangan. Lebih kanan berarti lebih besar.",
      "diagramType": "blocks-sign",
      "numberA": 4,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sign-table",
      "title": "Isi Tabel Tanda",
      "bookReference": "hlm. 20–21",
      "objective": "Pakai Urutan Garis Bilangan: Lebih kanan berarti lebih besar. Latihan: Isi tanda pada tabel..",
      "mechanicDescription": "Tiga tabel, empat baris. Saat bermain, ingat Urutan Garis Bilangan: Lebih kanan berarti lebih besar.",
      "voiceGuide": "Urutan Garis Bilangan. Lebih kanan berarti lebih besar.",
      "diagramType": "sign-table",
      "numberA": 4,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "order-blocks",
      "title": "Urutkan Blok",
      "bookReference": "hlm. 22–23",
      "objective": "Pakai Urutan Garis Bilangan: Lebih kanan berarti lebih besar. Latihan: Urutkan model..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Urutan Garis Bilangan: Lebih kanan berarti lebih besar.",
      "voiceGuide": "Urutan Garis Bilangan. Lebih kanan berarti lebih besar.",
      "diagramType": "blocks-order",
      "numberA": 4,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "match-blocks-sign",
      "title": "Jodohkan Pasangan Blok dan Tanda",
      "bookReference": "hlm. 18–20",
      "objective": "Pasangan model + tanda.. Ingat Urutan Garis Bilangan. (Urutan Garis Bilangan)",
      "mechanicDescription": "Tiga ronde. Gunakan Urutan Garis Bilangan.",
      "voiceGuide": "Urutan Garis Bilangan. Mainkan dengan teliti.",
      "diagramType": "blocks-sign-match",
      "numberA": 4,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "most-least-blocks",
      "title": "Paling pada Blok",
      "bookReference": "hlm. 21–23",
      "objective": "Paling banyak/sedikit model.. Ingat Urutan Garis Bilangan. (Urutan Garis Bilangan)",
      "mechanicDescription": "Tiga ronde. Gunakan Urutan Garis Bilangan.",
      "voiceGuide": "Urutan Garis Bilangan. Mainkan dengan teliti.",
      "diagramType": "blocks-most-least",
      "numberA": 4,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-more-blocks",
      "title": "Ketuk Semua Blok Lebih/Kurang",
      "bookReference": "hlm. 17–20",
      "objective": "Semua model vs acuan.. Ingat Urutan Garis Bilangan. (Urutan Garis Bilangan)",
      "mechanicDescription": "Tiga ronde. Gunakan Urutan Garis Bilangan.",
      "voiceGuide": "Urutan Garis Bilangan. Mainkan dengan teliti.",
      "diagramType": "blocks-select",
      "numberA": 4,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-thousands-blocks",
      "title": "Pilah Blok: Ribuan Kecil/Besar",
      "bookReference": "hlm. 18",
      "objective": "Pilah menurut ribuan.. Ingat Urutan Garis Bilangan. (Urutan Garis Bilangan)",
      "mechanicDescription": "Tiga ronde. Gunakan Urutan Garis Bilangan.",
      "voiceGuide": "Urutan Garis Bilangan. Mainkan dengan teliti.",
      "diagramType": "blocks-sort",
      "numberA": 4,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "complete-compare-sentence",
      "title": "Lengkapi Kalimat Perbandingan",
      "bookReference": "hlm. 18–20",
      "objective": "Kalimat ribuan/ratusan.. Ingat Urutan Garis Bilangan. (Urutan Garis Bilangan)",
      "mechanicDescription": "Tiga pasangan. Gunakan Urutan Garis Bilangan.",
      "voiceGuide": "Urutan Garis Bilangan. Mainkan dengan teliti.",
      "diagramType": "compare-sentence",
      "numberA": 4,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "slot-blocks-order",
      "title": "Taruh Blok di Urutan",
      "bookReference": "hlm. 22–23",
      "objective": "Terkecil–tengah–terbesar.. Ingat Urutan Garis Bilangan. (Urutan Garis Bilangan)",
      "mechanicDescription": "Tiga ronde. Gunakan Urutan Garis Bilangan.",
      "voiceGuide": "Urutan Garis Bilangan. Mainkan dengan teliti.",
      "diagramType": "blocks-slot",
      "numberA": 4,
      "numberB": 3
    },
    {
      "stage": "Abstract",
      "gameType": "compare-numerals",
      "title": "Bandingkan Lambang",
      "bookReference": "hlm. 20–21",
      "objective": "Pakai Mengurutkan Himpunan: Urut naik atau turun dengan membandingkan berpasangan. Latihan: Pilih tanda dua lambang..",
      "mechanicDescription": "Tiga ronde, dua soal. Saat bermain, ingat Mengurutkan Himpunan: Urut naik atau turun dengan membandingkan berpasangan.",
      "voiceGuide": "Mengurutkan Himpunan. Urut naik atau turun dengan membandingkan berpasangan.",
      "symbolLarge": "8.750 ○ 7.500",
      "wordLarge": "BANDINGKAN",
      "mathNotation": "> < ="
    },
    {
      "stage": "Abstract",
      "gameType": "fill-sign-table-abstract",
      "title": "Isi Tabel Perbandingan",
      "bookReference": "hlm. 20–21",
      "objective": "Pakai Mengurutkan Himpunan: Urut naik atau turun dengan membandingkan berpasangan. Latihan: Tabel tanda..",
      "mechanicDescription": "Tiga tabel. Saat bermain, ingat Mengurutkan Himpunan: Urut naik atau turun dengan membandingkan berpasangan.",
      "voiceGuide": "Mengurutkan Himpunan. Urut naik atau turun dengan membandingkan berpasangan.",
      "symbolLarge": "4.435 ○ 3.345",
      "wordLarge": "TABEL",
      "mathNotation": "tanda"
    },
    {
      "stage": "Abstract",
      "gameType": "deciding-place",
      "title": "Tempat yang Menentukan",
      "bookReference": "hlm. 18–20",
      "objective": "Pakai Mengurutkan Himpunan: Urut naik atau turun dengan membandingkan berpasangan. Latihan: Tempat pertama yang berbeda..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Mengurutkan Himpunan: Urut naik atau turun dengan membandingkan berpasangan.",
      "voiceGuide": "Mengurutkan Himpunan. Urut naik atau turun dengan membandingkan berpasangan.",
      "symbolLarge": "4.352 • 4.365",
      "wordLarge": "TEMPAT",
      "mathNotation": "ribuan…"
    },
    {
      "stage": "Abstract",
      "gameType": "order-numerals",
      "title": "Urutkan Lambang",
      "bookReference": "hlm. 22–24",
      "objective": "Pakai Mengurutkan Himpunan: Urut naik atau turun dengan membandingkan berpasangan. Latihan: Urutkan empat bilangan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Mengurutkan Himpunan: Urut naik atau turun dengan membandingkan berpasangan.",
      "voiceGuide": "Mengurutkan Himpunan. Urut naik atau turun dengan membandingkan berpasangan.",
      "symbolLarge": "↑",
      "wordLarge": "URUTKAN",
      "mathNotation": "naik/turun"
    },
    {
      "stage": "Abstract",
      "gameType": "match-pair-word",
      "title": "Jodohkan Pasangan dan Kata",
      "bookReference": "hlm. 18–20",
      "objective": "Pasangan dengan lebih/kurang/sama.. Ingat Mengurutkan Himpunan. (Mengurutkan Himpunan)",
      "mechanicDescription": "Tiga ronde. Gunakan Mengurutkan Himpunan.",
      "voiceGuide": "Mengurutkan Himpunan. Mainkan dengan teliti.",
      "symbolLarge": "8.750 ? 7.500",
      "wordLarge": "JODOHKAN",
      "mathNotation": "kata"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-compare",
      "title": "Benar atau Salah: Perbandingan",
      "bookReference": "hlm. 16–24",
      "objective": "Pernyataan banding/urut.. Ingat Mengurutkan Himpunan. (Mengurutkan Himpunan)",
      "mechanicDescription": "Dua ronde, lima. Gunakan Mengurutkan Himpunan.",
      "voiceGuide": "Mengurutkan Himpunan. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-compare",
      "title": "Detektif Perbandingan",
      "bookReference": "hlm. 22–24",
      "objective": "Petunjuk lebih/kurang.. Ingat Mengurutkan Himpunan. (Mengurutkan Himpunan)",
      "mechanicDescription": "Empat soal. Gunakan Mengurutkan Himpunan.",
      "voiceGuide": "Mengurutkan Himpunan. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "select-all-compare",
      "title": "Ketuk Semua Lebih/Kurang: Angka",
      "bookReference": "hlm. 17–20",
      "objective": "Semua vs acuan.. Ingat Mengurutkan Himpunan. (Mengurutkan Himpunan)",
      "mechanicDescription": "Tiga ronde. Gunakan Mengurutkan Himpunan.",
      "voiceGuide": "Mengurutkan Himpunan. Mainkan dengan teliti.",
      "symbolLarge": "✔✔",
      "wordLarge": "SEMUA",
      "mathNotation": "lebih/kurang"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-map-compare",
      "title": "Peta Konsep Membandingkan",
      "bookReference": "hlm. 3 dan 16–23",
      "objective": "Lengkapi peta konsep.. Ingat Mengurutkan Himpunan. (Mengurutkan Himpunan)",
      "mechanicDescription": "Dua peta, empat kotak. Gunakan Mengurutkan Himpunan.",
      "voiceGuide": "Mengurutkan Himpunan. Mainkan dengan teliti.",
      "symbolLarge": "⇄",
      "wordLarge": "PETA KONSEP",
      "mathNotation": "langkah"
    },
    {
      "stage": "Abstract",
      "gameType": "build-compare-sentence",
      "title": "Susun Kata Perbandingan",
      "bookReference": "hlm. 18–20",
      "objective": "Kalimat perbandingan.. Ingat Mengurutkan Himpunan. (Mengurutkan Himpunan)",
      "mechanicDescription": "Empat kalimat. Gunakan Mengurutkan Himpunan.",
      "voiceGuide": "Mengurutkan Himpunan. Mainkan dengan teliti.",
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
      "ikon": "🌍",
      "nama": "Banding dari Kiri",
      "isi": "Bandingkan dari nilai tempat terbesar.",
      "suara": "Banding dari Kiri. Bandingkan dari nilai tempat terbesar."
    },
    {
      "ikon": "🌍",
      "nama": "Urutan Garis Bilangan",
      "isi": "Lebih kanan berarti lebih besar.",
      "suara": "Urutan Garis Bilangan. Lebih kanan berarti lebih besar."
    },
    {
      "ikon": "🌍",
      "nama": "Mengurutkan Himpunan",
      "isi": "Urut naik atau turun dengan membandingkan berpasangan.",
      "suara": "Mengurutkan Himpunan. Urut naik atau turun dengan membandingkan berpasangan."
    }
  ],
  "poinSuara": "Ingat: Banding dari Kiri, Urutan Garis Bilangan, Mengurutkan Himpunan.",
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
  "rumah": "Ayo Mencoba: terapkan Banding dari Kiri pada satu soal nyata di rumah.",
  "refleksi": [
    "Bagaimana Banding dari Kiri membantumu?",
    "Kapan memakai Urutan Garis Bilangan?",
    "Apa bedanya dengan hanya menghafal tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Compare Leftmost",
      "namaId": "Banding dari Kiri",
      "asal": "Van de Walle",
      "ringkas": "Bandingkan dari nilai tempat terbesar.",
      "tahap": [
        "Story",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Number Line Order",
      "namaId": "Urutan Garis Bilangan",
      "asal": "Number line",
      "ringkas": "Lebih kanan berarti lebih besar.",
      "tahap": [
        "Picture",
        "Mind"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Ordering Sets",
      "namaId": "Mengurutkan Himpunan",
      "asal": "Number sense",
      "ringkas": "Urut naik atau turun dengan membandingkan berpasangan.",
      "tahap": [
        "Infografis",
        "Abstract"
      ]
    }
  ]
};

export const SUB_D41: SubBabNaskah = {
  "id": "D",
  "codeTitle": "Sub-Bab D (Komposisi dan Dekomposisi)",
  "fullTitle": "Sub-Bab D: Komposisi dan Dekomposisi Bilangan Cacah sampai 10.000",
  "targetDescription": "Siswa menyusun bilangan empat angka dari nilai tempat (komposisi) dan mengurai bilangan menjadi nilai tempat (dekomposisi), termasuk contoh uang Helen Rp7.300 dan Rp10.000. Siswa memakai cara Komposisi Bilangan, Dekomposisi Bilangan, Pengelompokan Fleksibel. Siswa memakai cara Komposisi Bilangan, Dekomposisi Bilangan, Pengelompokan Fleksibel.",
  "secondaryBg": "#FCE7F3",
  "secondaryBorder": "#DB2777",
  "secondaryText": "#9D174D",
  "silabus": {
    "teksSuara": "Kita belajar komposisi dan dekomposisi bilangan sampai sepuluh ribu. Menyusun 6 ribuan + 3 ratusan + 4 puluhan + 8 satuan menjadi 6.348, lalu mengurai 6.849 menjadi 6.000 + 800 + 40 + 9. Nol tetap menjaga tempat seperti pada 6.035. Kita memakai cara: Komposisi Bilangan, Dekomposisi Bilangan, Pengelompokan Fleksibel. Susun bilangan dari bagian nilai tempat. Urai bilangan menjadi bagian yang lebih kecil. Satu ratusan bisa jadi sepuluh puluhan. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menyusun dan mengurai bilangan cacah sampai 10.000 menurut nilai tempat.",
    "referensi": "Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 1 Sub-Bab D)."
  },
  "videos": [],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Komposisi dan Dekomposisi Bilangan Cacah sampai 10.000 dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa menyusun bilangan empat angka dari nilai tempat (komposisi) dan mengurai bilangan menjadi nilai tempat (dekomposis….",
      "icon": "❓",
      "flowFrom": "Pahami soal",
      "flowTo": "Composition"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Composition",
      "stepDesc": "Susun bilangan dari bagian nilai tempat. Pada Komposisi dan Dekomposisi Bilangan Cacah sampai 10.000, langkah “Composition” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Komposisi Bilangan: Susun bilangan dari bagian nilai tempat. Dekomposisi Bilangan: Urai bilangan menjadi bagian yang lebih kecil. Pengelompokan Fleksibel: Satu …. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🧭",
      "flowFrom": "Composition",
      "flowTo": "Decomposition"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Decomposition",
      "stepDesc": "Urai bilangan menjadi bagian yang lebih kecil. Pada Komposisi dan Dekomposisi Bilangan Cacah sampai 10.000, langkah “Decomposition” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Komposisi Bilangan: Susun bilangan dari bagian nilai tempat. Dekomposisi Bilangan: Urai bilangan menjadi bagian yang lebih kecil. Pengelompokan Fleksibel: Satu …. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🛠️",
      "flowFrom": "Decomposition",
      "flowTo": "Flexible Grouping"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Flexible Grouping",
      "stepDesc": "Satu ratusan bisa jadi sepuluh puluhan. Pada Komposisi dan Dekomposisi Bilangan Cacah sampai 10.000, langkah “Flexible Grouping” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Komposisi Bilangan: Susun bilangan dari bagian nilai tempat. Dekomposisi Bilangan: Urai bilangan menjadi bagian yang lebih kecil. Pengelompokan Fleksibel: Satu …. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "✨",
      "flowFrom": "Flexible Grouping",
      "flowTo": "Kerjakan"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Kerjakan",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Komposisi dan Dekomposisi Bilangan Cacah sampai 10.000. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "✏️",
      "flowFrom": "Kerjakan",
      "flowTo": "Cek masuk akal"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek masuk akal",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Komposisi dan Dekomposisi Bilangan Cacah sampai 10.000. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Cek masuk akal",
      "flowTo": "Simpulkan"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Simpulkan",
      "stepDesc": "Simpulkan ide utama Komposisi dan Dekomposisi Bilangan Cacah sampai 10.000 dengan kalimatmu sendiri. Sebutkan cara yang kamu pakai dan mengapa cara itu membantu. Jelaskan kepada teman seolah-olah kamu guru kecil. Simpulan yang jelas menandakan konsepnya sudah dipahami.",
      "icon": "💬",
      "flowFrom": "Simpulkan",
      "flowTo": "Main"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Main",
      "stepDesc": "Latih lagi di tahap Concrete, Picture, lalu Abstract untuk Komposisi dan Dekomposisi Bilangan Cacah sampai 10.000. Mulai dari benda nyata, lanjut ke diagram, baru ke lambang angka. Ulangi sampai kamu bisa menjelaskan tanpa melihat contoh. Bermain sambil berlatih membuat konsepnya melekat lebih lama.",
      "icon": "🎮",
      "flowFrom": "Main",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "KOMPOSISI",
      "emoji": "🧩",
      "countNum": 1,
      "countWord": "susun",
      "suara": "Komposisi artinya menyusun bilangan dari nilai tempat. Pada Komposisi dan Dekomposisi Bilangan Cacah sampai 10.000, cocokkan gambar “KOMPOSISI” dengan artinya (susun), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🧩 Komposisi artinya menyusun bilangan dari nilai tempat."
    },
    {
      "judul": "6.348",
      "emoji": "6️⃣",
      "countNum": 6348,
      "countWord": "enam ribu",
      "suara": "Enam ribuan ditambah tiga ratusan, empat puluhan, delapan satuan. Pada Komposisi dan Dekomposisi Bilangan Cacah sampai 10.000, cocokkan gambar “6.348” dengan artinya (enam ribu), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "6️⃣ Enam ribuan ditambah tiga ratusan, empat puluhan,…"
    },
    {
      "judul": "DEKOMPOSISI",
      "emoji": "🔓",
      "countNum": 2,
      "countWord": "urai",
      "suara": "Dekomposisi artinya mengurai bilangan ke nilai tempat. Pada Komposisi dan Dekomposisi Bilangan Cacah sampai 10.000, cocokkan gambar “DEKOMPOSISI” dengan artinya (urai), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🔓 Dekomposisi artinya mengurai bilangan ke nilai tempat."
    },
    {
      "judul": "6.849",
      "emoji": "8️⃣",
      "countNum": 6849,
      "countWord": "urai",
      "suara": "Enam ribu delapan ratus empat puluh sembilan diurai 6.000 + 800 + 40 + 9. Lihat bilangan 6.849. Tulis di papan empat kolom. Ingat: 6.849; papan; nilai tempat.",
      "teksVisual": "8️⃣ Enam ribu delapan ratus empat puluh sembilan diurai…"
    },
    {
      "judul": "NOL",
      "emoji": "0️⃣",
      "countNum": 0,
      "countWord": "jaga",
      "suara": "Pada 6.035, nol ratusan tetap ditulis. Bilangan 6.035 punya ratusan nol. Uraian: 6.000 + 0 + 30 + 5. Ingat: 6.035; 0 ratusan; 6.000+0+30+5. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Komposisi dan…",
      "teksVisual": "0️⃣ NOL: jaga"
    },
    {
      "judul": "7.020",
      "emoji": "7️⃣",
      "countNum": 7020,
      "countWord": "tujuh ribu",
      "suara": "Tujuh ribuan dan dua puluhan, ratusan serta satuan nol. 7.020 = 7 ribuan + 0 + 2 puluhan + 0. Ditulis 7.000 + 0 + 20 + 0. Ingat: 7.020; 7 ribuan; 20. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Komposisi…",
      "teksVisual": "7️⃣ Tujuh ribuan dan dua puluhan, ratusan serta satuan…"
    },
    {
      "judul": "9.999",
      "emoji": "9️⃣",
      "countNum": 9999,
      "countWord": "penuh",
      "suara": "Semua tempat terisi sembilan. Pada Komposisi dan Dekomposisi Bilangan Cacah sampai 10.000, cocokkan gambar “9.999” dengan artinya (penuh), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "9️⃣ 9.999: penuh"
    },
    {
      "judul": "UANG",
      "emoji": "💰",
      "countNum": 7300,
      "countWord": "tujuh ribu",
      "suara": "Uraikan tujuh ribu tiga ratus rupiah dari pecahan Helen. Helen punya pecahan uang di warung. Slamet beli seharga 7.300. Ingat: warung; Rp7.300; pecahan.",
      "teksVisual": "💰 Uraikan tujuh ribu tiga ratus rupiah dari pecahan…"
    },
    {
      "judul": "SALING BALIK",
      "emoji": "🔄",
      "countNum": 3,
      "countWord": "periksa",
      "suara": "Jumlahkan uraian untuk memeriksa dekomposisi. Pada Komposisi dan Dekomposisi Bilangan Cacah sampai 10.000, cocokkan gambar “SALING BALIK” dengan artinya (periksa), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🔄 Jumlahkan uraian untuk memeriksa dekomposisi."
    },
    {
      "judul": "SIAP E",
      "emoji": "✅",
      "countNum": 4,
      "countWord": "lanjut",
      "suara": "Siap lanjut ke penjumlahan sampai seribu. Pada Komposisi dan Dekomposisi Bilangan Cacah sampai 10.000, cocokkan gambar “SIAP E” dengan artinya (lanjut), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "✅ SIAP E: lanjut"
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "compose-place",
      "title": "Susun dari Nilai Tempat",
      "bookReference": "hlm. 24–25 (6.348)",
      "objective": "Pakai Komposisi Bilangan: Susun bilangan dari bagian nilai tempat. Latihan: Menyusun bilangan dari ribuan–satuan..",
      "mechanicDescription": "Tiga ronde, dua bilangan. Rakit peti sampai satuan. Saat bermain, ingat Komposisi Bilangan: Susun bilangan dari bagian nilai tempat.",
      "voiceGuide": "Komposisi Bilangan. Susun bilangan dari bagian nilai tempat.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "decompose-package",
      "title": "Uraikan Kumpulan Empat Tempat",
      "bookReference": "hlm. 26–27 (6.849)",
      "objective": "Pakai Komposisi Bilangan: Susun bilangan dari bagian nilai tempat. Latihan: Mengurai kumpulan menjadi nilai tempat..",
      "mechanicDescription": "Tiga ronde, dua soal. Pilih uraian. Saat bermain, ingat Komposisi Bilangan: Susun bilangan dari bagian nilai tempat.",
      "voiceGuide": "Komposisi Bilangan. Susun bilangan dari bagian nilai tempat.",
      "emoji": "🔓",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "board-compose",
      "title": "Papan Komposisi",
      "bookReference": "hlm. 25",
      "objective": "Pakai Komposisi Bilangan: Susun bilangan dari bagian nilai tempat. Latihan: Mengisi papan dari uraian kata..",
      "mechanicDescription": "Tiga ronde, dua soal. Saat bermain, ingat Komposisi Bilangan: Susun bilangan dari bagian nilai tempat.",
      "voiceGuide": "Komposisi Bilangan. Susun bilangan dari bagian nilai tempat.",
      "emoji": "🗂️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "match-compose",
      "title": "Jodohkan Uraian dan Bilangan",
      "bookReference": "hlm. 25–27",
      "objective": "Pakai Komposisi Bilangan: Susun bilangan dari bagian nilai tempat. Latihan: Menjodohkan uraian dengan lambang..",
      "mechanicDescription": "Tiga ronde, tiga pasangan. Saat bermain, ingat Komposisi Bilangan: Susun bilangan dari bagian nilai tempat.",
      "voiceGuide": "Komposisi Bilangan. Susun bilangan dari bagian nilai tempat.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "memory-compose",
      "title": "Memori Nilai Tempat",
      "bookReference": "hlm. 25",
      "objective": "Memori nilai 6.000, 300, 40, 8.. Ingat Komposisi Bilangan. (Komposisi Bilangan)",
      "mechanicDescription": "Tiga ronde, empat pasang. Gunakan Komposisi Bilangan.",
      "voiceGuide": "Komposisi Bilangan. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-compose",
      "title": "Ketuk Bilangan dari Uraian",
      "bookReference": "hlm. 25–27",
      "objective": "Mendengar uraian lalu mengetuk bilangan.. Ingat Komposisi Bilangan. (Komposisi Bilangan)",
      "mechanicDescription": "Tiga ronde. Gunakan Komposisi Bilangan.",
      "voiceGuide": "Komposisi Bilangan. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-compose",
      "title": "Ketuk Semua Syarat Komposisi",
      "bookReference": "hlm. 27",
      "objective": "Memilih bilangan sesuai syarat digit.. Ingat Komposisi Bilangan. (Komposisi Bilangan)",
      "mechanicDescription": "Tiga ronde. Gunakan Komposisi Bilangan.",
      "voiceGuide": "Komposisi Bilangan. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "money-compose",
      "title": "Uraikan Uang Helen",
      "bookReference": "hlm. 28 (Rp7.300 dan Rp10.000)",
      "objective": "Mengurai uang dari pecahan.. Ingat Komposisi Bilangan. (Komposisi Bilangan)",
      "mechanicDescription": "Tiga soal uang. Gunakan Komposisi Bilangan.",
      "voiceGuide": "Komposisi Bilangan. Mainkan dengan teliti.",
      "emoji": "💰",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "fill-table-compose",
      "title": "Isi Tabel Komposisi",
      "bookReference": "hlm. 25",
      "objective": "Mengisi digit tabel dari bilangan.. Ingat Komposisi Bilangan. (Komposisi Bilangan)",
      "mechanicDescription": "Tiga tabel. Gunakan Komposisi Bilangan.",
      "voiceGuide": "Komposisi Bilangan. Mainkan dengan teliti.",
      "emoji": "📋",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "sort-compose",
      "title": "Pilah: Ada Nol atau Penuh",
      "bookReference": "hlm. 27 (6.035)",
      "objective": "Memilah bilangan ada nol / penuh.. Ingat Komposisi Bilangan. (Komposisi Bilangan)",
      "mechanicDescription": "Tiga ronde, enam bilangan. Gunakan Komposisi Bilangan.",
      "voiceGuide": "Komposisi Bilangan. Mainkan dengan teliti.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Picture",
      "gameType": "compose-blocks",
      "title": "Susun dari Blok",
      "bookReference": "hlm. 25–26",
      "objective": "Pakai Dekomposisi Bilangan: Urai bilangan menjadi bagian yang lebih kecil. Latihan: Membaca model menjadi bilangan..",
      "mechanicDescription": "Tiga ronde, dua soal. Saat bermain, ingat Dekomposisi Bilangan: Urai bilangan menjadi bagian yang lebih kecil.",
      "voiceGuide": "Dekomposisi Bilangan. Urai bilangan menjadi bagian yang lebih kecil.",
      "diagramType": "blocks-compose",
      "numberA": 4,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "decompose-blocks",
      "title": "Uraikan Model Blok",
      "bookReference": "hlm. 26–27",
      "objective": "Pakai Dekomposisi Bilangan: Urai bilangan menjadi bagian yang lebih kecil. Latihan: Memilih uraian dari model..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Dekomposisi Bilangan: Urai bilangan menjadi bagian yang lebih kecil.",
      "voiceGuide": "Dekomposisi Bilangan. Urai bilangan menjadi bagian yang lebih kecil.",
      "diagramType": "blocks-expand",
      "numberA": 4,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "board-blocks-d",
      "title": "Papan dari Blok D",
      "bookReference": "hlm. 25",
      "objective": "Pakai Dekomposisi Bilangan: Urai bilangan menjadi bagian yang lebih kecil. Latihan: Isi papan dari blok..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Dekomposisi Bilangan: Urai bilangan menjadi bagian yang lebih kecil.",
      "voiceGuide": "Dekomposisi Bilangan. Urai bilangan menjadi bagian yang lebih kecil.",
      "diagramType": "blocks-board",
      "numberA": 4,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "table-blocks-d",
      "title": "Tabel dari Blok D",
      "bookReference": "hlm. 25",
      "objective": "Pakai Dekomposisi Bilangan: Urai bilangan menjadi bagian yang lebih kecil. Latihan: Isi tabel digit..",
      "mechanicDescription": "Tiga tabel. Saat bermain, ingat Dekomposisi Bilangan: Urai bilangan menjadi bagian yang lebih kecil.",
      "voiceGuide": "Dekomposisi Bilangan. Urai bilangan menjadi bagian yang lebih kecil.",
      "diagramType": "blocks-table",
      "numberA": 4,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "match-blocks-d",
      "title": "Jodohkan Blok dan Uraian",
      "bookReference": "hlm. 26",
      "objective": "Model dengan uraian.. Ingat Dekomposisi Bilangan. (Dekomposisi Bilangan)",
      "mechanicDescription": "Tiga ronde. Gunakan Dekomposisi Bilangan.",
      "voiceGuide": "Dekomposisi Bilangan. Mainkan dengan teliti.",
      "diagramType": "blocks-match",
      "numberA": 4,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memory-blocks-d",
      "title": "Memori Blok dan Bilangan",
      "bookReference": "hlm. 25–27",
      "objective": "Memori model dan lambang.. Ingat Dekomposisi Bilangan. (Dekomposisi Bilangan)",
      "mechanicDescription": "Tiga ronde. Gunakan Dekomposisi Bilangan.",
      "voiceGuide": "Dekomposisi Bilangan. Mainkan dengan teliti.",
      "diagramType": "blocks-memory",
      "numberA": 4,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "tap-blocks-d",
      "title": "Ketuk Blok dari Uraian",
      "bookReference": "hlm. 26",
      "objective": "Ketuk model sesuai uraian.. Ingat Dekomposisi Bilangan. (Dekomposisi Bilangan)",
      "mechanicDescription": "Tiga ronde. Gunakan Dekomposisi Bilangan.",
      "voiceGuide": "Dekomposisi Bilangan. Mainkan dengan teliti.",
      "diagramType": "blocks-tap",
      "numberA": 4,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-blocks-d",
      "title": "Ketuk Semua Blok D",
      "bookReference": "hlm. 27",
      "objective": "Syarit digit pada model.. Ingat Dekomposisi Bilangan. (Dekomposisi Bilangan)",
      "mechanicDescription": "Tiga ronde. Gunakan Dekomposisi Bilangan.",
      "voiceGuide": "Dekomposisi Bilangan. Mainkan dengan teliti.",
      "diagramType": "blocks-select",
      "numberA": 4,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-blocks-d",
      "title": "Pilah Blok menurut Nol",
      "bookReference": "hlm. 27",
      "objective": "Ada nol / tanpa nol.. Ingat Dekomposisi Bilangan. (Dekomposisi Bilangan)",
      "mechanicDescription": "Tiga ronde. Gunakan Dekomposisi Bilangan.",
      "voiceGuide": "Dekomposisi Bilangan. Mainkan dengan teliti.",
      "diagramType": "blocks-sort",
      "numberA": 4,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "sentence-blocks-d",
      "title": "Lengkapi Kalimat Uraian",
      "bookReference": "hlm. 25–27",
      "objective": "Melengkapi kalimat uraian.. Ingat Dekomposisi Bilangan. (Dekomposisi Bilangan)",
      "mechanicDescription": "Tiga model. Gunakan Dekomposisi Bilangan.",
      "voiceGuide": "Dekomposisi Bilangan. Mainkan dengan teliti.",
      "diagramType": "blocks-sentence",
      "numberA": 4,
      "numberB": 3
    },
    {
      "stage": "Abstract",
      "gameType": "compose-cards",
      "title": "Susun Empat Kartu dari Uraian",
      "bookReference": "hlm. 25",
      "objective": "Pakai Pengelompokan Fleksibel: Satu ratusan bisa jadi sepuluh puluhan. Latihan: Menulis lambang dari uraian..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pengelompokan Fleksibel: Satu ratusan bisa jadi sepuluh puluhan.",
      "voiceGuide": "Pengelompokan Fleksibel. Satu ratusan bisa jadi sepuluh puluhan.",
      "symbolLarge": "6.348",
      "wordLarge": "SUSUN",
      "mathNotation": "urai → angka"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-expand",
      "title": "Pilih Uraian Angka",
      "bookReference": "hlm. 26–27",
      "objective": "Pakai Pengelompokan Fleksibel: Satu ratusan bisa jadi sepuluh puluhan. Latihan: Memilih uraian benar..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pengelompokan Fleksibel: Satu ratusan bisa jadi sepuluh puluhan.",
      "voiceGuide": "Pengelompokan Fleksibel. Satu ratusan bisa jadi sepuluh puluhan.",
      "symbolLarge": "6.849",
      "wordLarge": "URAI",
      "mathNotation": "angka → uraian"
    },
    {
      "stage": "Abstract",
      "gameType": "board-abstract-d",
      "title": "Tulis di Papan dari Uraian",
      "bookReference": "hlm. 25–27",
      "objective": "Pakai Pengelompokan Fleksibel: Satu ratusan bisa jadi sepuluh puluhan. Latihan: Menulis dari uraian ke papan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pengelompokan Fleksibel: Satu ratusan bisa jadi sepuluh puluhan.",
      "voiceGuide": "Pengelompokan Fleksibel. Satu ratusan bisa jadi sepuluh puluhan.",
      "symbolLarge": "6.035",
      "wordLarge": "PAPAN",
      "mathNotation": "urai → digit"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-d",
      "title": "Jodohkan Angka dan Uraian",
      "bookReference": "hlm. 25–27",
      "objective": "Pakai Pengelompokan Fleksibel: Satu ratusan bisa jadi sepuluh puluhan. Latihan: Menjodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pengelompokan Fleksibel: Satu ratusan bisa jadi sepuluh puluhan.",
      "voiceGuide": "Pengelompokan Fleksibel. Satu ratusan bisa jadi sepuluh puluhan.",
      "symbolLarge": "7.020",
      "wordLarge": "JODOH",
      "mathNotation": "angka • uraian"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-d",
      "title": "Memori Angka dan Uraian",
      "bookReference": "hlm. 26",
      "objective": "Memori.. Ingat Pengelompokan Fleksibel. (Pengelompokan Fleksibel)",
      "mechanicDescription": "Tiga ronde. Gunakan Pengelompokan Fleksibel.",
      "voiceGuide": "Pengelompokan Fleksibel. Mainkan dengan teliti.",
      "symbolLarge": "2.001",
      "wordLarge": "MEMORI",
      "mathNotation": "angka • uraian"
    },
    {
      "stage": "Abstract",
      "gameType": "table-abstract-d",
      "title": "Isi Tabel Uraian",
      "bookReference": "hlm. 27",
      "objective": "Melengkapi tabel.. Ingat Pengelompokan Fleksibel. (Pengelompokan Fleksibel)",
      "mechanicDescription": "Tiga tabel. Gunakan Pengelompokan Fleksibel.",
      "voiceGuide": "Pengelompokan Fleksibel. Mainkan dengan teliti.",
      "symbolLarge": "9.999",
      "wordLarge": "TABEL",
      "mathNotation": "bilangan • uraian"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-d",
      "title": "Benar atau Salah: Komposisi",
      "bookReference": "hlm. 24–28",
      "objective": "Menilai pernyataan.. Ingat Pengelompokan Fleksibel. (Pengelompokan Fleksibel)",
      "mechanicDescription": "Dua ronde. Gunakan Pengelompokan Fleksibel.",
      "voiceGuide": "Pengelompokan Fleksibel. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-d",
      "title": "Detektif Komposisi",
      "bookReference": "hlm. 25–28",
      "objective": "Dua petunjuk → satu bilangan.. Ingat Pengelompokan Fleksibel. (Pengelompokan Fleksibel)",
      "mechanicDescription": "Empat soal. Gunakan Pengelompokan Fleksibel.",
      "voiceGuide": "Pengelompokan Fleksibel. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "dua petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "select-all-d",
      "title": "Ketuk Semua: Komposisi",
      "bookReference": "hlm. 27",
      "objective": "Syarat digit.. Ingat Pengelompokan Fleksibel. (Pengelompokan Fleksibel)",
      "mechanicDescription": "Tiga ronde. Gunakan Pengelompokan Fleksibel.",
      "voiceGuide": "Pengelompokan Fleksibel. Mainkan dengan teliti.",
      "symbolLarge": "✔✔",
      "wordLarge": "SEMUA",
      "mathNotation": "syarat"
    },
    {
      "stage": "Abstract",
      "gameType": "build-sentence-d",
      "title": "Susun Kata Komposisi",
      "bookReference": "hlm. 25–27",
      "objective": "Menyusun kalimat.. Ingat Pengelompokan Fleksibel. (Pengelompokan Fleksibel)",
      "mechanicDescription": "Empat kalimat. Gunakan Pengelompokan Fleksibel.",
      "voiceGuide": "Pengelompokan Fleksibel. Mainkan dengan teliti.",
      "symbolLarge": "Aa",
      "wordLarge": "KATA",
      "mathNotation": "kalimat"
    }
  ],
  "poin": [
    {
      "ikon": "🧩",
      "nama": "Komposisi",
      "isi": "Susun nilai tempat menjadi satu bilangan.",
      "suara": "Komposisi menyusun bilangan dari nilai tempat."
    },
    {
      "ikon": "🌍",
      "nama": "Komposisi Bilangan",
      "isi": "Susun bilangan dari bagian nilai tempat.",
      "suara": "Komposisi Bilangan. Susun bilangan dari bagian nilai tempat."
    },
    {
      "ikon": "🌍",
      "nama": "Dekomposisi Bilangan",
      "isi": "Urai bilangan menjadi bagian yang lebih kecil.",
      "suara": "Dekomposisi Bilangan. Urai bilangan menjadi bagian yang lebih kecil."
    },
    {
      "ikon": "🌍",
      "nama": "Pengelompokan Fleksibel",
      "isi": "Satu ratusan bisa jadi sepuluh puluhan.",
      "suara": "Pengelompokan Fleksibel. Satu ratusan bisa jadi sepuluh puluhan."
    }
  ],
  "poinSuara": "Ingat: Komposisi Bilangan, Dekomposisi Bilangan, Pengelompokan Fleksibel.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "baca digit",
        "warna": "#FCE7F3"
      },
      {
        "teks": "tulis nilai",
        "warna": "#BBF7D0"
      },
      {
        "teks": "jumlah/urai",
        "warna": "#BFDBFE"
      },
      {
        "teks": "periksa",
        "warna": "#FDE68A"
      }
    ]
  },
  "rumah": "Ayo Mencoba: terapkan Komposisi Bilangan pada satu soal nyata di rumah.",
  "refleksi": [
    "Bagaimana Komposisi Bilangan membantumu?",
    "Kapan memakai Dekomposisi Bilangan?",
    "Apa bedanya dengan hanya menghafal tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Composition",
      "namaId": "Komposisi Bilangan",
      "asal": "Van de Walle",
      "ringkas": "Susun bilangan dari bagian nilai tempat.",
      "tahap": [
        "Story",
        "Concrete"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Decomposition",
      "namaId": "Dekomposisi Bilangan",
      "asal": "Van de Walle",
      "ringkas": "Urai bilangan menjadi bagian yang lebih kecil.",
      "tahap": [
        "Mind",
        "Picture",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Flexible Grouping",
      "namaId": "Pengelompokan Fleksibel",
      "asal": "Base-ten flexibility",
      "ringkas": "Satu ratusan bisa jadi sepuluh puluhan.",
      "tahap": [
        "Infografis",
        "Concrete"
      ]
    }
  ]
};

export const SUB_E41: SubBabNaskah = {
  "id": "E",
  "codeTitle": "Sub-Bab E (Penjumlahan sampai 1.000)",
  "fullTitle": "Sub-Bab E: Penjumlahan Bilangan Cacah sampai 1.000",
  "targetDescription": "Siswa menjumlahkan bilangan sampai 1.000 dengan cara susun panjang dan pendek, tanpa dan dengan menyimpan, termasuk tiga bilangan dan soal cerita buku. Siswa memakai cara Penjumlahan Bersusun, Menyimpan, Menghitung Maju. Siswa memakai cara Penjumlahan Bersusun, Menyimpan, Menghitung Maju.",
  "secondaryBg": "#DCFCE7",
  "secondaryBorder": "#16A34A",
  "secondaryText": "#14532D",
  "silabus": {
    "teksSuara": "Kita belajar penjumlahan sampai seribu. Pohon jeruk Pak Toni 131 ditambah 321 sama dengan 452. Jeruk pedagang 189 ditambah 245 perlu menyimpan menjadi 434. Kita juga menjumlahkan tiga bilangan seperti 124 + 411 + 363 = 898. Kita memakai cara: Penjumlahan Bersusun, Menyimpan, Menghitung Maju. Jumlahkan dari satuan, simpan jika perlu. Sepuluh satuan menjadi satu puluhan. Mulai dari bilangan lebih besar lalu maju. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menjumlahkan bilangan cacah sampai 1.000 dengan dan tanpa menyimpan.",
    "referensi": "Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 1 Sub-Bab E)."
  },
  "videos": [],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Penjumlahan Bilangan Cacah sampai 1.000 dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa menjumlahkan bilangan sampai 1.000 dengan cara susun panjang dan pendek, tanpa dan dengan menyimpan, termasuk tiga….",
      "icon": "❓",
      "flowFrom": "Pahami soal",
      "flowTo": "Standard Addition"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Standard Addition",
      "stepDesc": "Jumlahkan dari satuan, simpan jika perlu. Pada Penjumlahan Bilangan Cacah sampai 1.000, langkah “Standard Addition” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Penjumlahan Bersusun: Jumlahkan dari satuan, simpan jika perlu. Menyimpan: Sepuluh satuan menjadi satu puluhan. Menghitung Maju: Mulai dari bilangan lebih besar…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🧭",
      "flowFrom": "Standard Addition",
      "flowTo": "Regrouping"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Regrouping",
      "stepDesc": "Sepuluh satuan menjadi satu puluhan. Pada Penjumlahan Bilangan Cacah sampai 1.000, langkah “Regrouping” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Penjumlahan Bersusun: Jumlahkan dari satuan, simpan jika perlu. Menyimpan: Sepuluh satuan menjadi satu puluhan. Menghitung Maju: Mulai dari bilangan lebih besar…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🛠️",
      "flowFrom": "Regrouping",
      "flowTo": "Counting On"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Counting On",
      "stepDesc": "Mulai dari bilangan lebih besar lalu maju. Pada Penjumlahan Bilangan Cacah sampai 1.000, langkah “Counting On” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Penjumlahan Bersusun: Jumlahkan dari satuan, simpan jika perlu. Menyimpan: Sepuluh satuan menjadi satu puluhan. Menghitung Maju: Mulai dari bilangan lebih besar…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "✨",
      "flowFrom": "Counting On",
      "flowTo": "Kerjakan"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Kerjakan",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Penjumlahan Bilangan Cacah sampai 1.000. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "✏️",
      "flowFrom": "Kerjakan",
      "flowTo": "Cek masuk akal"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek masuk akal",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Penjumlahan Bilangan Cacah sampai 1.000. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Cek masuk akal",
      "flowTo": "Simpulkan"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Simpulkan",
      "stepDesc": "Simpulkan ide utama Penjumlahan Bilangan Cacah sampai 1.000 dengan kalimatmu sendiri. Sebutkan cara yang kamu pakai dan mengapa cara itu membantu. Jelaskan kepada teman seolah-olah kamu guru kecil. Simpulan yang jelas menandakan konsepnya sudah dipahami.",
      "icon": "💬",
      "flowFrom": "Simpulkan",
      "flowTo": "Main"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Main",
      "stepDesc": "Latih lagi di tahap Concrete, Picture, lalu Abstract untuk Penjumlahan Bilangan Cacah sampai 1.000. Mulai dari benda nyata, lanjut ke diagram, baru ke lambang angka. Ulangi sampai kamu bisa menjelaskan tanpa melihat contoh. Bermain sambil berlatih membuat konsepnya melekat lebih lama.",
      "icon": "🎮",
      "flowFrom": "Main",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "DARI SATUAN",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "kanan",
      "suara": "Penjumlahan dikerjakan dari kanan. Pada Penjumlahan Bilangan Cacah sampai 1.000, cocokkan gambar “DARI SATUAN” dengan artinya (kanan), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "➡️ DARI SATUAN: kanan"
    },
    {
      "judul": "452",
      "emoji": "🌳",
      "countNum": 452,
      "countWord": "tanpa simpan",
      "suara": "Seratus tiga puluh satu ditambah tiga ratus dua puluh satu. Pada Penjumlahan Bilangan Cacah sampai 1.000, cocokkan gambar “452” dengan artinya (tanpa simpan), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🌳 Seratus tiga puluh satu ditambah tiga ratus dua puluh…"
    },
    {
      "judul": "MENYIMPAN",
      "emoji": "1️⃣",
      "countNum": 10,
      "countWord": "simpan",
      "suara": "Bila jumlah tempat sepuluh atau lebih, simpan satu. Pada Penjumlahan Bilangan Cacah sampai 1.000, cocokkan gambar “MENYIMPAN” dengan artinya (simpan), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "1️⃣ Bila jumlah tempat sepuluh atau lebih, simpan satu."
    },
    {
      "judul": "434",
      "emoji": "🍊",
      "countNum": 434,
      "countWord": "dengan simpan",
      "suara": "Seratus delapan puluh sembilan ditambah dua ratus empat puluh lima. Pada Penjumlahan Bilangan Cacah sampai 1.000, cocokkan gambar “434” dengan artinya (dengan simpan), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🍊 Seratus delapan puluh sembilan ditambah dua ratus…"
    },
    {
      "judul": "SUSUN PENDEK",
      "emoji": "⬇️",
      "countNum": 2,
      "countWord": "bersusun",
      "suara": "Tulis bersusun menurut nilai tempat. Tulis bersusun ratusan puluhan satuan. 1+1=2, 3+2=5, 1+3=4. Ingat: bersusun; dari kanan; tanpa simpan. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Penjumlahan Bilangan…",
      "teksVisual": "⬇️ SUSUN PENDEK: bersusun"
    },
    {
      "judul": "SUSUN PANJANG",
      "emoji": "📜",
      "countNum": 3,
      "countWord": "urai",
      "suara": "Urai dulu, lalu jumlahkan tiap tempat. Urai 131 = 100 + 30 + 1. Urai 321 = 300 + 20 + 1. Ingat: urai; kelompokkan; jumlahkan. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Penjumlahan Bilangan Cacah sampai…",
      "teksVisual": "📜 SUSUN PANJANG: urai"
    },
    {
      "judul": "898",
      "emoji": "📚",
      "countNum": 898,
      "countWord": "tiga suku",
      "suara": "Seratus dua puluh empat ditambah empat ratus sebelas ditambah tiga ratus enam puluh tiga. Pada Penjumlahan Bilangan Cacah sampai 1.000, cocokkan gambar “898” dengan artinya (tiga suku), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "📚 Seratus dua puluh empat ditambah empat ratus sebelas…"
    },
    {
      "judul": "PERIKSA",
      "emoji": "🔍",
      "countNum": 4,
      "countWord": "ulang",
      "suara": "Hitung lagi dari satuan untuk memeriksa. Pada Penjumlahan Bilangan Cacah sampai 1.000, cocokkan gambar “PERIKSA” dengan artinya (ulang), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🔍 PERIKSA: ulang"
    },
    {
      "judul": "CERITA",
      "emoji": "📖",
      "countNum": 5,
      "countWord": "soal",
      "suara": "Baca cerita, tulis model penjumlahan. Pada Penjumlahan Bilangan Cacah sampai 1.000, cocokkan gambar “CERITA” dengan artinya (soal), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "📖 CERITA: soal"
    },
    {
      "judul": "SIAP F",
      "emoji": "✅",
      "countNum": 6,
      "countWord": "lanjut",
      "suara": "Siap lanjut ke pengurangan. Pada Penjumlahan Bilangan Cacah sampai 1.000, cocokkan gambar “SIAP F” dengan artinya (lanjut), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "✅ SIAP F: lanjut"
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "join-packages",
      "title": "Gabungkan Kumpulan",
      "bookReference": "hlm. 28–29 (131+321)",
      "objective": "Pakai Penjumlahan Bersusun: Jumlahkan dari satuan, simpan jika perlu. Latihan: Merakit jumlah dua kumpulan..",
      "mechanicDescription": "Tiga ronde. Penukaran otomatis. Saat bermain, ingat Penjumlahan Bersusun: Jumlahkan dari satuan, simpan jika perlu.",
      "voiceGuide": "Penjumlahan Bersusun. Jumlahkan dari satuan, simpan jika perlu.",
      "emoji": "➕",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "count-sum",
      "title": "Hitung Jumlah Kumpulan",
      "bookReference": "hlm. 29–31",
      "objective": "Pakai Penjumlahan Bersusun: Jumlahkan dari satuan, simpan jika perlu. Latihan: Memilih hasil penjumlahan..",
      "mechanicDescription": "Tiga ronde, dua soal. Saat bermain, ingat Penjumlahan Bersusun: Jumlahkan dari satuan, simpan jika perlu.",
      "voiceGuide": "Penjumlahan Bersusun. Jumlahkan dari satuan, simpan jika perlu.",
      "emoji": "🔢",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-carry",
      "title": "Pilah: Menyimpan atau Tidak",
      "bookReference": "hlm. 31 (189+245)",
      "objective": "Pakai Penjumlahan Bersusun: Jumlahkan dari satuan, simpan jika perlu. Latihan: Memilah pasangan perlu simpan / tanpa..",
      "mechanicDescription": "Tiga ronde, enam pasangan. Saat bermain, ingat Penjumlahan Bersusun: Jumlahkan dari satuan, simpan jika perlu.",
      "voiceGuide": "Penjumlahan Bersusun. Jumlahkan dari satuan, simpan jika perlu.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-sum",
      "title": "Jodohkan Pasangan dan Jumlah",
      "bookReference": "hlm. 29–32",
      "objective": "Pakai Penjumlahan Bersusun: Jumlahkan dari satuan, simpan jika perlu. Latihan: Menjodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Penjumlahan Bersusun: Jumlahkan dari satuan, simpan jika perlu.",
      "voiceGuide": "Penjumlahan Bersusun. Jumlahkan dari satuan, simpan jika perlu.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "memory-sum",
      "title": "Memori Penjumlahan",
      "bookReference": "hlm. 29–33",
      "objective": "Memori soal dan hasil.. Ingat Penjumlahan Bersusun. (Penjumlahan Bersusun)",
      "mechanicDescription": "Tiga ronde. Gunakan Penjumlahan Bersusun.",
      "voiceGuide": "Penjumlahan Bersusun. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-sum",
      "title": "Ketuk Jumlah yang Diminta",
      "bookReference": "hlm. 29–33",
      "objective": "Mengetuk pasangan berjumlah tertentu.. Ingat Penjumlahan Bersusun. (Penjumlahan Bersusun)",
      "mechanicDescription": "Tiga ronde. Gunakan Penjumlahan Bersusun.",
      "voiceGuide": "Penjumlahan Bersusun. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-carry",
      "title": "Ketuk Semua yang Menyimpan",
      "bookReference": "hlm. 31",
      "objective": "Memilih semua yang perlu simpan.. Ingat Penjumlahan Bersusun. (Penjumlahan Bersusun)",
      "mechanicDescription": "Tiga ronde. Gunakan Penjumlahan Bersusun.",
      "voiceGuide": "Penjumlahan Bersusun. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-add",
      "title": "Cerita Penjumlahan",
      "bookReference": "hlm. 33 (kelapa, lele, lomba, stiker)",
      "objective": "Menyelesaikan soal cerita.. Ingat Penjumlahan Bersusun. (Penjumlahan Bersusun)",
      "mechanicDescription": "Tiga ronde, dua cerita. Gunakan Penjumlahan Bersusun.",
      "voiceGuide": "Penjumlahan Bersusun. Mainkan dengan teliti.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "board-sum",
      "title": "Papan Hasil Jumlah",
      "bookReference": "hlm. 29–32",
      "objective": "Menulis hasil di papan.. Ingat Penjumlahan Bersusun. (Penjumlahan Bersusun)",
      "mechanicDescription": "Tiga ronde. Gunakan Penjumlahan Bersusun.",
      "voiceGuide": "Penjumlahan Bersusun. Mainkan dengan teliti.",
      "emoji": "🗂️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-sum",
      "title": "Urutkan menurut Jumlah",
      "bookReference": "hlm. 32–33",
      "objective": "Mengurutkan hasil.. Ingat Penjumlahan Bersusun. (Penjumlahan Bersusun)",
      "mechanicDescription": "Tiga ronde. Gunakan Penjumlahan Bersusun.",
      "voiceGuide": "Penjumlahan Bersusun. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "column-add",
      "title": "Susun Pendek di Layar",
      "bookReference": "hlm. 29–32",
      "objective": "Pakai Menyimpan: Sepuluh satuan menjadi satu puluhan. Latihan: Memilih hasil cara susun..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Menyimpan: Sepuluh satuan menjadi satu puluhan.",
      "voiceGuide": "Menyimpan. Sepuluh satuan menjadi satu puluhan.",
      "diagramType": "column-add",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "board-add-p",
      "title": "Papan dari Model Jumlah",
      "bookReference": "hlm. 29",
      "objective": "Pakai Menyimpan: Sepuluh satuan menjadi satu puluhan. Latihan: Isi papan dari dua model..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Menyimpan: Sepuluh satuan menjadi satu puluhan.",
      "voiceGuide": "Menyimpan. Sepuluh satuan menjadi satu puluhan.",
      "diagramType": "blocks-board",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "count-models-add",
      "title": "Hitung Dua Model",
      "bookReference": "hlm. 31",
      "objective": "Pakai Menyimpan: Sepuluh satuan menjadi satu puluhan. Latihan: Jumlahkan dua model blok..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Menyimpan: Sepuluh satuan menjadi satu puluhan.",
      "voiceGuide": "Menyimpan. Sepuluh satuan menjadi satu puluhan.",
      "diagramType": "blocks-sum",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-models-add",
      "title": "Jodohkan Model dan Jumlah",
      "bookReference": "hlm. 31–32",
      "objective": "Pakai Menyimpan: Sepuluh satuan menjadi satu puluhan. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Menyimpan: Sepuluh satuan menjadi satu puluhan.",
      "voiceGuide": "Menyimpan. Sepuluh satuan menjadi satu puluhan.",
      "diagramType": "blocks-match",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memory-models-add",
      "title": "Memori Model Jumlah",
      "bookReference": "hlm. 31",
      "objective": "Memori.. Ingat Menyimpan. (Menyimpan)",
      "mechanicDescription": "Tiga ronde. Gunakan Menyimpan.",
      "voiceGuide": "Menyimpan. Mainkan dengan teliti.",
      "diagramType": "blocks-memory",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-add",
      "title": "Tabel Hasil Penjumlahan",
      "bookReference": "hlm. 32",
      "objective": "Isi hasil pada tabel.. Ingat Menyimpan. (Menyimpan)",
      "mechanicDescription": "Tiga tabel. Gunakan Menyimpan.",
      "voiceGuide": "Menyimpan. Mainkan dengan teliti.",
      "diagramType": "sum-table",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-carry-p",
      "title": "Ketuk Semua Simpan (Blok)",
      "bookReference": "hlm. 31",
      "objective": "Syarat menyimpan pada model.. Ingat Menyimpan. (Menyimpan)",
      "mechanicDescription": "Tiga ronde. Gunakan Menyimpan.",
      "voiceGuide": "Menyimpan. Mainkan dengan teliti.",
      "diagramType": "blocks-select",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-carry-p",
      "title": "Pilah Model: Simpan/Tidak",
      "bookReference": "hlm. 31",
      "objective": "Pilah pasangan model.. Ingat Menyimpan. (Menyimpan)",
      "mechanicDescription": "Tiga ronde. Gunakan Menyimpan.",
      "voiceGuide": "Menyimpan. Mainkan dengan teliti.",
      "diagramType": "blocks-sort",
      "numberA": 3,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "long-form-add",
      "title": "Cara Susun Panjang",
      "bookReference": "hlm. 29–31",
      "objective": "Memilih langkah uraian benar.. Ingat Menyimpan. (Menyimpan)",
      "mechanicDescription": "Tiga ronde. Gunakan Menyimpan.",
      "voiceGuide": "Menyimpan. Mainkan dengan teliti.",
      "diagramType": "long-add",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "steps-add",
      "title": "Urutan Langkah Menjumlahkan",
      "bookReference": "hlm. 29–31",
      "objective": "Mengurutkan langkah.. Ingat Menyimpan. (Menyimpan)",
      "mechanicDescription": "Tiga ronde. Gunakan Menyimpan.",
      "voiceGuide": "Menyimpan. Mainkan dengan teliti.",
      "diagramType": "steps-add",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Abstract",
      "gameType": "column-add-q",
      "title": "Susun Pendek Angka",
      "bookReference": "hlm. 32",
      "objective": "Pakai Menghitung Maju: Mulai dari bilangan lebih besar lalu maju. Latihan: Hasil susun pendek..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Menghitung Maju: Mulai dari bilangan lebih besar lalu maju.",
      "voiceGuide": "Menghitung Maju. Mulai dari bilangan lebih besar lalu maju.",
      "symbolLarge": "434",
      "wordLarge": "SUSUN",
      "mathNotation": "a + b"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-sum",
      "title": "Pilih Jumlah",
      "bookReference": "hlm. 32–33",
      "objective": "Pakai Menghitung Maju: Mulai dari bilangan lebih besar lalu maju. Latihan: Memilih hasil..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Menghitung Maju: Mulai dari bilangan lebih besar lalu maju.",
      "voiceGuide": "Menghitung Maju. Mulai dari bilangan lebih besar lalu maju.",
      "symbolLarge": "452",
      "wordLarge": "JUMLAH",
      "mathNotation": "a + b = ?"
    },
    {
      "stage": "Abstract",
      "gameType": "board-add-q",
      "title": "Tulis Jumlah di Papan",
      "bookReference": "hlm. 32",
      "objective": "Pakai Menghitung Maju: Mulai dari bilangan lebih besar lalu maju. Latihan: Menulis hasil..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Menghitung Maju: Mulai dari bilangan lebih besar lalu maju.",
      "voiceGuide": "Menghitung Maju. Mulai dari bilangan lebih besar lalu maju.",
      "symbolLarge": "581",
      "wordLarge": "PAPAN",
      "mathNotation": "hasil"
    },
    {
      "stage": "Abstract",
      "gameType": "steps-add-q",
      "title": "Langkah Menyimpan",
      "bookReference": "hlm. 31",
      "objective": "Pakai Menghitung Maju: Mulai dari bilangan lebih besar lalu maju. Latihan: Memilih langkah benar..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Menghitung Maju: Mulai dari bilangan lebih besar lalu maju.",
      "voiceGuide": "Menghitung Maju. Mulai dari bilangan lebih besar lalu maju.",
      "symbolLarge": "1+",
      "wordLarge": "LANGKAH",
      "mathNotation": "simpan"
    },
    {
      "stage": "Abstract",
      "gameType": "match-add-q",
      "title": "Jodohkan Soal dan Hasil",
      "bookReference": "hlm. 32",
      "objective": "Jodohkan.. Ingat Menghitung Maju. (Menghitung Maju)",
      "mechanicDescription": "Tiga ronde. Gunakan Menghitung Maju.",
      "voiceGuide": "Menghitung Maju. Mainkan dengan teliti.",
      "symbolLarge": "719",
      "wordLarge": "JODOH",
      "mathNotation": "soal • hasil"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-add-q",
      "title": "Memori Soal Jumlah",
      "bookReference": "hlm. 32–33",
      "objective": "Memori.. Ingat Menghitung Maju. (Menghitung Maju)",
      "mechanicDescription": "Tiga ronde. Gunakan Menghitung Maju.",
      "voiceGuide": "Menghitung Maju. Mainkan dengan teliti.",
      "symbolLarge": "898",
      "wordLarge": "MEMORI",
      "mathNotation": "soal • hasil"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-e",
      "title": "Benar atau Salah: Jumlah",
      "bookReference": "hlm. 28–33",
      "objective": "Menilai pernyataan.. Ingat Menghitung Maju. (Menghitung Maju)",
      "mechanicDescription": "Dua ronde. Gunakan Menghitung Maju.",
      "voiceGuide": "Menghitung Maju. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-e",
      "title": "Detektif Penjumlahan",
      "bookReference": "hlm. 33",
      "objective": "Dua petunjuk → hasil.. Ingat Menghitung Maju. (Menghitung Maju)",
      "mechanicDescription": "Empat soal. Gunakan Menghitung Maju.",
      "voiceGuide": "Menghitung Maju. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-e",
      "title": "Peta Konsep Penjumlahan",
      "bookReference": "hlm. 29–31",
      "objective": "Mengisi kotak konsep.. Ingat Menghitung Maju. (Menghitung Maju)",
      "mechanicDescription": "Satu peta. Gunakan Menghitung Maju.",
      "voiceGuide": "Menghitung Maju. Mainkan dengan teliti.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-add-q",
      "title": "Cerita Angka Penjumlahan",
      "bookReference": "hlm. 33",
      "objective": "Soal cerita tanpa gambar.. Ingat Menghitung Maju. (Menghitung Maju)",
      "mechanicDescription": "Tiga ronde. Gunakan Menghitung Maju.",
      "voiceGuide": "Menghitung Maju. Mainkan dengan teliti.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "➡️",
      "nama": "Dari satuan",
      "isi": "Jumlahkan dari kanan ke kiri.",
      "suara": "Mulai dari satuan, lalu puluhan, lalu ratusan."
    },
    {
      "ikon": "🌍",
      "nama": "Penjumlahan Bersusun",
      "isi": "Jumlahkan dari satuan, simpan jika perlu.",
      "suara": "Penjumlahan Bersusun. Jumlahkan dari satuan, simpan jika perlu."
    },
    {
      "ikon": "🌍",
      "nama": "Menyimpan",
      "isi": "Sepuluh satuan menjadi satu puluhan.",
      "suara": "Menyimpan. Sepuluh satuan menjadi satu puluhan."
    },
    {
      "ikon": "🌍",
      "nama": "Menghitung Maju",
      "isi": "Mulai dari bilangan lebih besar lalu maju.",
      "suara": "Menghitung Maju. Mulai dari bilangan lebih besar lalu maju."
    }
  ],
  "poinSuara": "Ingat: Penjumlahan Bersusun, Menyimpan, Menghitung Maju.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "susun",
        "warna": "#DCFCE7"
      },
      {
        "teks": "satuan",
        "warna": "#BBF7D0"
      },
      {
        "teks": "simpan",
        "warna": "#FDE68A"
      },
      {
        "teks": "ratusan",
        "warna": "#BFDBFE"
      }
    ]
  },
  "rumah": "Ayo Mencoba: terapkan Penjumlahan Bersusun pada satu soal nyata di rumah.",
  "refleksi": [
    "Bagaimana Penjumlahan Bersusun membantumu?",
    "Kapan memakai Menyimpan?",
    "Apa bedanya dengan hanya menghafal tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Standard Addition",
      "namaId": "Penjumlahan Bersusun",
      "asal": "Elementary algorithms",
      "ringkas": "Jumlahkan dari satuan, simpan jika perlu.",
      "tahap": [
        "Story",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Regrouping",
      "namaId": "Menyimpan",
      "asal": "Base-ten regrouping",
      "ringkas": "Sepuluh satuan menjadi satu puluhan.",
      "tahap": [
        "Picture",
        "Mind"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Counting On",
      "namaId": "Menghitung Maju",
      "asal": "Singapore / counting on",
      "ringkas": "Mulai dari bilangan lebih besar lalu maju.",
      "tahap": [
        "Concrete",
        "Infografis"
      ]
    }
  ]
};

export const SUB_F41: SubBabNaskah = {
  "id": "F",
  "codeTitle": "Sub-Bab F (Pengurangan sampai 1.000)",
  "fullTitle": "Sub-Bab F: Pengurangan Bilangan Cacah sampai 1.000",
  "targetDescription": "Siswa mengurangi bilangan sampai 1.000 dengan cara susun panjang dan pendek, tanpa dan dengan mengambil (satu atau dua kali), serta memeriksa dengan penjumlahan. Siswa memakai cara Pengurangan Bersusun, Meminjam, Menghitung Naik. Siswa memakai cara Pengurangan Bersusun, Meminjam, Menghitung Naik.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Kita belajar pengurangan sampai seribu. Buku 265 dikurangi 132 sisa 133 tanpa mengambil. Lalu 241 dikurangi 129 perlu mengambil menjadi 112. Ada juga dua kali mengambil seperti 253 dikurangi 176 sisa 77. Periksa: hasil ditambah pengurang kembali ke bilangan awal. Kita memakai cara: Pengurangan Bersusun, Meminjam, Menghitung Naik. Kurangi dari satuan, pinjam jika perlu. Satu puluhan dibuka menjadi sepuluh satuan. Hitung naik dari yang dikurangi sampai bilangan awal. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa mengurangi bilangan cacah sampai 1.000 dengan dan tanpa mengambil.",
    "referensi": "Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 1 Sub-Bab F)."
  },
  "videos": [],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Pengurangan Bilangan Cacah sampai 1.000 dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa mengurangi bilangan sampai 1.000 dengan cara susun panjang dan pendek, tanpa dan dengan mengambil (satu atau dua k….",
      "icon": "❓",
      "flowFrom": "Pahami soal",
      "flowTo": "Standard Subtraction"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Standard Subtraction",
      "stepDesc": "Kurangi dari satuan, pinjam jika perlu. Pada Pengurangan Bilangan Cacah sampai 1.000, langkah “Standard Subtraction” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Pengurangan Bersusun: Kurangi dari satuan, pinjam jika perlu. Meminjam: Satu puluhan dibuka menjadi sepuluh satuan. Menghitung Naik: Hitung naik dari yang dikur…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🧭",
      "flowFrom": "Standard Subtraction",
      "flowTo": "Borrowing"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Borrowing",
      "stepDesc": "Satu puluhan dibuka menjadi sepuluh satuan. Pada Pengurangan Bilangan Cacah sampai 1.000, langkah “Borrowing” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Pengurangan Bersusun: Kurangi dari satuan, pinjam jika perlu. Meminjam: Satu puluhan dibuka menjadi sepuluh satuan. Menghitung Naik: Hitung naik dari yang dikur…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🛠️",
      "flowFrom": "Borrowing",
      "flowTo": "Counting Up"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Counting Up",
      "stepDesc": "Hitung naik dari yang dikurangi sampai bilangan awal. Pada Pengurangan Bilangan Cacah sampai 1.000, langkah “Counting Up” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Pengurangan Bersusun: Kurangi dari satuan, pinjam jika perlu. Meminjam: Satu puluhan dibuka menjadi sepuluh satuan. Menghitung Naik: Hitung naik dari yang dikur…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "✨",
      "flowFrom": "Counting Up",
      "flowTo": "Kerjakan"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Kerjakan",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Pengurangan Bilangan Cacah sampai 1.000. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "✏️",
      "flowFrom": "Kerjakan",
      "flowTo": "Cek masuk akal"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek masuk akal",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Pengurangan Bilangan Cacah sampai 1.000. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Cek masuk akal",
      "flowTo": "Simpulkan"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Simpulkan",
      "stepDesc": "Simpulkan ide utama Pengurangan Bilangan Cacah sampai 1.000 dengan kalimatmu sendiri. Sebutkan cara yang kamu pakai dan mengapa cara itu membantu. Jelaskan kepada teman seolah-olah kamu guru kecil. Simpulan yang jelas menandakan konsepnya sudah dipahami.",
      "icon": "💬",
      "flowFrom": "Simpulkan",
      "flowTo": "Main"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Main",
      "stepDesc": "Latih lagi di tahap Concrete, Picture, lalu Abstract untuk Pengurangan Bilangan Cacah sampai 1.000. Mulai dari benda nyata, lanjut ke diagram, baru ke lambang angka. Ulangi sampai kamu bisa menjelaskan tanpa melihat contoh. Bermain sambil berlatih membuat konsepnya melekat lebih lama.",
      "icon": "🎮",
      "flowFrom": "Main",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "DARI SATUAN",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "kanan",
      "suara": "Pengurangan dikerjakan dari kanan. Pada Pengurangan Bilangan Cacah sampai 1.000, cocokkan gambar “DARI SATUAN” dengan artinya (kanan), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "➡️ DARI SATUAN: kanan"
    },
    {
      "judul": "133",
      "emoji": "📚",
      "countNum": 133,
      "countWord": "tanpa ambil",
      "suara": "Dua ratus enam puluh lima dikurangi seratus tiga puluh dua. Pada Pengurangan Bilangan Cacah sampai 1.000, cocokkan gambar “133” dengan artinya (tanpa ambil), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "📚 Dua ratus enam puluh lima dikurangi seratus tiga…"
    },
    {
      "judul": "MENGAMBIL",
      "emoji": "↩️",
      "countNum": 10,
      "countWord": "ambil",
      "suara": "Bila satuan tidak cukup, ambil satu puluhan. Pada Pengurangan Bilangan Cacah sampai 1.000, cocokkan gambar “MENGAMBIL” dengan artinya (ambil), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "↩️ Bila satuan tidak cukup, ambil satu puluhan."
    },
    {
      "judul": "112",
      "emoji": "1️⃣",
      "countNum": 112,
      "countWord": "satu ambil",
      "suara": "Dua ratus empat puluh satu dikurangi seratus dua puluh sembilan. Pada Pengurangan Bilangan Cacah sampai 1.000, cocokkan gambar “112” dengan artinya (satu ambil), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "1️⃣ Dua ratus empat puluh satu dikurangi seratus dua…"
    },
    {
      "judul": "77",
      "emoji": "2️⃣",
      "countNum": 77,
      "countWord": "dua ambil",
      "suara": "Dua ratus lima puluh tiga dikurangi seratus tujuh puluh enam. Pada Pengurangan Bilangan Cacah sampai 1.000, cocokkan gambar “77” dengan artinya (dua ambil), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "2️⃣ Dua ratus lima puluh tiga dikurangi seratus tujuh…"
    },
    {
      "judul": "SUSUN PENDEK",
      "emoji": "⬇️",
      "countNum": 2,
      "countWord": "bersusun",
      "suara": "Tulis bersusun menurut nilai tempat. Tulis bersusun. 5−2=3, 6−3=3, 2−1=1. Ingat: bersusun; dari kanan; tanpa ambil. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Pengurangan Bilangan Cacah sampai 1.000.",
      "teksVisual": "⬇️ SUSUN PENDEK: bersusun"
    },
    {
      "judul": "SUSUN PANJANG",
      "emoji": "📜",
      "countNum": 3,
      "countWord": "urai",
      "suara": "Urai dulu, lalu kurangkan. Urai 265 = 200 + 60 + 5. Urai 132 = 100 + 30 + 2. Ingat: urai; kurangkan; tempat. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Pengurangan Bilangan Cacah sampai 1.000.",
      "teksVisual": "📜 SUSUN PANJANG: urai"
    },
    {
      "judul": "PERIKSA",
      "emoji": "🔍",
      "countNum": 4,
      "countWord": "kebalikan",
      "suara": "Hasil ditambah pengurang harus sama dengan bilangan awal. Hasil ditambah pengurang. Harus kembali ke bilangan awal. Ingat: hasil + pengurang; bilangan awal; 112+129.",
      "teksVisual": "🔍 Hasil ditambah pengurang harus sama dengan bilangan…"
    },
    {
      "judul": "66",
      "emoji": "✅",
      "countNum": 66,
      "countWord": "contoh",
      "suara": "Dua ratus empat puluh satu dikurangi seratus tujuh puluh lima. Pada Pengurangan Bilangan Cacah sampai 1.000, cocokkan gambar “66” dengan artinya (contoh), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "✅ Dua ratus empat puluh satu dikurangi seratus tujuh…"
    },
    {
      "judul": "SIAP",
      "emoji": "🎯",
      "countNum": 5,
      "countWord": "selesai",
      "suara": "SIAP (selesai). Skala kualitatif sudah siap. Berikutnya bandingkan dua peluang dengan rasio untung/total, lalu putuskan adil atau kurang adil. Kita sudah mengurangi dengan dan tanpa mengambil.",
      "teksVisual": "🎯 SIAP: selesai"
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "leave-packages",
      "title": "Rakit Sisa Kumpulan",
      "bookReference": "hlm. 34–35 (265−132)",
      "objective": "Pakai Pengurangan Bersusun: Kurangi dari satuan, pinjam jika perlu. Latihan: Merakit sisa setelah dikurangi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pengurangan Bersusun: Kurangi dari satuan, pinjam jika perlu.",
      "voiceGuide": "Pengurangan Bersusun. Kurangi dari satuan, pinjam jika perlu.",
      "emoji": "➖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "count-diff",
      "title": "Hitung Sisa Kumpulan",
      "bookReference": "hlm. 34–36",
      "objective": "Pakai Pengurangan Bersusun: Kurangi dari satuan, pinjam jika perlu. Latihan: Memilih hasil pengurangan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pengurangan Bersusun: Kurangi dari satuan, pinjam jika perlu.",
      "voiceGuide": "Pengurangan Bersusun. Kurangi dari satuan, pinjam jika perlu.",
      "emoji": "🔢",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-borrow",
      "title": "Pilah: Mengambil atau Tidak",
      "bookReference": "hlm. 35–36",
      "objective": "Pakai Pengurangan Bersusun: Kurangi dari satuan, pinjam jika perlu. Latihan: Memilah perlu ambil / tanpa..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pengurangan Bersusun: Kurangi dari satuan, pinjam jika perlu.",
      "voiceGuide": "Pengurangan Bersusun. Kurangi dari satuan, pinjam jika perlu.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-diff",
      "title": "Jodohkan Pasangan dan Sisa",
      "bookReference": "hlm. 34–37",
      "objective": "Pakai Pengurangan Bersusun: Kurangi dari satuan, pinjam jika perlu. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pengurangan Bersusun: Kurangi dari satuan, pinjam jika perlu.",
      "voiceGuide": "Pengurangan Bersusun. Kurangi dari satuan, pinjam jika perlu.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "memory-diff",
      "title": "Memori Pengurangan",
      "bookReference": "hlm. 34–37",
      "objective": "Memori.. Ingat Pengurangan Bersusun. (Pengurangan Bersusun)",
      "mechanicDescription": "Tiga ronde. Gunakan Pengurangan Bersusun.",
      "voiceGuide": "Pengurangan Bersusun. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-diff",
      "title": "Ketuk Sisa yang Diminta",
      "bookReference": "hlm. 34–37",
      "objective": "Ketuk pasangan bersisa tertentu.. Ingat Pengurangan Bersusun. (Pengurangan Bersusun)",
      "mechanicDescription": "Tiga ronde. Gunakan Pengurangan Bersusun.",
      "voiceGuide": "Pengurangan Bersusun. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-borrow",
      "title": "Ketuk Semua yang Mengambil",
      "bookReference": "hlm. 35–36",
      "objective": "Memilih semua yang perlu ambil.. Ingat Pengurangan Bersusun. (Pengurangan Bersusun)",
      "mechanicDescription": "Tiga ronde. Gunakan Pengurangan Bersusun.",
      "voiceGuide": "Pengurangan Bersusun. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-sub",
      "title": "Cerita Pengurangan",
      "bookReference": "hlm. 34 (buku dipinjam)",
      "objective": "Soal cerita.. Ingat Pengurangan Bersusun. (Pengurangan Bersusun)",
      "mechanicDescription": "Tiga ronde. Gunakan Pengurangan Bersusun.",
      "voiceGuide": "Pengurangan Bersusun. Mainkan dengan teliti.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "board-diff",
      "title": "Papan Hasil Sisa",
      "bookReference": "hlm. 35–37",
      "objective": "Menulis sisa di papan.. Ingat Pengurangan Bersusun. (Pengurangan Bersusun)",
      "mechanicDescription": "Tiga ronde. Gunakan Pengurangan Bersusun.",
      "voiceGuide": "Pengurangan Bersusun. Mainkan dengan teliti.",
      "emoji": "🗂️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-diff",
      "title": "Urutkan menurut Sisa",
      "bookReference": "hlm. 37",
      "objective": "Mengurutkan sisa.. Ingat Pengurangan Bersusun. (Pengurangan Bersusun)",
      "mechanicDescription": "Tiga ronde. Gunakan Pengurangan Bersusun.",
      "voiceGuide": "Pengurangan Bersusun. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "column-sub",
      "title": "Susun Pendek Pengurangan",
      "bookReference": "hlm. 35–36",
      "objective": "Pakai Meminjam: Satu puluhan dibuka menjadi sepuluh satuan. Latihan: Memilih hasil susun..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Meminjam: Satu puluhan dibuka menjadi sepuluh satuan.",
      "voiceGuide": "Meminjam. Satu puluhan dibuka menjadi sepuluh satuan.",
      "diagramType": "column-sub",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "board-sub-p",
      "title": "Papan dari Model Sisa",
      "bookReference": "hlm. 35",
      "objective": "Pakai Meminjam: Satu puluhan dibuka menjadi sepuluh satuan. Latihan: Isi papan dari dua model..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Meminjam: Satu puluhan dibuka menjadi sepuluh satuan.",
      "voiceGuide": "Meminjam. Satu puluhan dibuka menjadi sepuluh satuan.",
      "diagramType": "blocks-board",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "count-models-sub",
      "title": "Hitung Sisa Model",
      "bookReference": "hlm. 35–36",
      "objective": "Pakai Meminjam: Satu puluhan dibuka menjadi sepuluh satuan. Latihan: Kurangkan dua model..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Meminjam: Satu puluhan dibuka menjadi sepuluh satuan.",
      "voiceGuide": "Meminjam. Satu puluhan dibuka menjadi sepuluh satuan.",
      "diagramType": "blocks-diff",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-models-sub",
      "title": "Jodohkan Model dan Sisa",
      "bookReference": "hlm. 36",
      "objective": "Pakai Meminjam: Satu puluhan dibuka menjadi sepuluh satuan. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Meminjam: Satu puluhan dibuka menjadi sepuluh satuan.",
      "voiceGuide": "Meminjam. Satu puluhan dibuka menjadi sepuluh satuan.",
      "diagramType": "blocks-match",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memory-models-sub",
      "title": "Memori Model Sisa",
      "bookReference": "hlm. 36",
      "objective": "Memori.. Ingat Meminjam. (Meminjam)",
      "mechanicDescription": "Tiga ronde. Gunakan Meminjam.",
      "voiceGuide": "Meminjam. Mainkan dengan teliti.",
      "diagramType": "blocks-memory",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-sub",
      "title": "Tabel Hasil Pengurangan",
      "bookReference": "hlm. 37",
      "objective": "Isi sisa pada tabel.. Ingat Meminjam. (Meminjam)",
      "mechanicDescription": "Tiga tabel. Gunakan Meminjam.",
      "voiceGuide": "Meminjam. Mainkan dengan teliti.",
      "diagramType": "diff-table",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-borrow-p",
      "title": "Ketuk Semua Ambil (Blok)",
      "bookReference": "hlm. 35–36",
      "objective": "Syarat mengambil.. Ingat Meminjam. (Meminjam)",
      "mechanicDescription": "Tiga ronde. Gunakan Meminjam.",
      "voiceGuide": "Meminjam. Mainkan dengan teliti.",
      "diagramType": "blocks-select",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-borrow-p",
      "title": "Pilah Model: Ambil/Tidak",
      "bookReference": "hlm. 35–36",
      "objective": "Pilah.. Ingat Meminjam. (Meminjam)",
      "mechanicDescription": "Tiga ronde. Gunakan Meminjam.",
      "voiceGuide": "Meminjam. Mainkan dengan teliti.",
      "diagramType": "blocks-sort",
      "numberA": 3,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "long-form-sub",
      "title": "Cara Susun Panjang Kurang",
      "bookReference": "hlm. 35–36",
      "objective": "Memilih uraian kurang benar.. Ingat Meminjam. (Meminjam)",
      "mechanicDescription": "Tiga ronde. Gunakan Meminjam.",
      "voiceGuide": "Meminjam. Mainkan dengan teliti.",
      "diagramType": "long-sub",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "steps-sub",
      "title": "Urutan Langkah Mengurangi",
      "bookReference": "hlm. 35–36",
      "objective": "Mengurutkan langkah.. Ingat Meminjam. (Meminjam)",
      "mechanicDescription": "Tiga ronde. Gunakan Meminjam.",
      "voiceGuide": "Meminjam. Mainkan dengan teliti.",
      "diagramType": "steps-sub",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Abstract",
      "gameType": "column-sub-q",
      "title": "Susun Pendek Angka Kurang",
      "bookReference": "hlm. 36–37",
      "objective": "Pakai Menghitung Naik: Hitung naik dari yang dikurangi sampai bilangan awal. Latihan: Hasil susun pendek..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Menghitung Naik: Hitung naik dari yang dikurangi sampai bilangan awal.",
      "voiceGuide": "Menghitung Naik. Hitung naik dari yang dikurangi sampai bilangan awal.",
      "symbolLarge": "112",
      "wordLarge": "SUSUN",
      "mathNotation": "a − b"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-diff",
      "title": "Pilih Selisih",
      "bookReference": "hlm. 37",
      "objective": "Pakai Menghitung Naik: Hitung naik dari yang dikurangi sampai bilangan awal. Latihan: Memilih hasil..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Menghitung Naik: Hitung naik dari yang dikurangi sampai bilangan awal.",
      "voiceGuide": "Menghitung Naik. Hitung naik dari yang dikurangi sampai bilangan awal.",
      "symbolLarge": "133",
      "wordLarge": "SELISIH",
      "mathNotation": "a − b = ?"
    },
    {
      "stage": "Abstract",
      "gameType": "board-sub-q",
      "title": "Tulis Sisa di Papan",
      "bookReference": "hlm. 37",
      "objective": "Pakai Menghitung Naik: Hitung naik dari yang dikurangi sampai bilangan awal. Latihan: Menulis hasil..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Menghitung Naik: Hitung naik dari yang dikurangi sampai bilangan awal.",
      "voiceGuide": "Menghitung Naik. Hitung naik dari yang dikurangi sampai bilangan awal.",
      "symbolLarge": "77",
      "wordLarge": "PAPAN",
      "mathNotation": "hasil"
    },
    {
      "stage": "Abstract",
      "gameType": "steps-sub-q",
      "title": "Langkah Mengambil",
      "bookReference": "hlm. 35–36",
      "objective": "Pakai Menghitung Naik: Hitung naik dari yang dikurangi sampai bilangan awal. Latihan: Memilih langkah benar..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Menghitung Naik: Hitung naik dari yang dikurangi sampai bilangan awal.",
      "voiceGuide": "Menghitung Naik. Hitung naik dari yang dikurangi sampai bilangan awal.",
      "symbolLarge": "−1",
      "wordLarge": "LANGKAH",
      "mathNotation": "ambil"
    },
    {
      "stage": "Abstract",
      "gameType": "match-sub-q",
      "title": "Jodohkan Soal dan Sisa",
      "bookReference": "hlm. 37",
      "objective": "Jodohkan.. Ingat Menghitung Naik. (Menghitung Naik)",
      "mechanicDescription": "Tiga ronde. Gunakan Menghitung Naik.",
      "voiceGuide": "Menghitung Naik. Mainkan dengan teliti.",
      "symbolLarge": "66",
      "wordLarge": "JODOH",
      "mathNotation": "soal • sisa"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-sub-q",
      "title": "Memori Soal Kurang",
      "bookReference": "hlm. 37",
      "objective": "Memori.. Ingat Menghitung Naik. (Menghitung Naik)",
      "mechanicDescription": "Tiga ronde. Gunakan Menghitung Naik.",
      "voiceGuide": "Menghitung Naik. Mainkan dengan teliti.",
      "symbolLarge": "422",
      "wordLarge": "MEMORI",
      "mathNotation": "soal • sisa"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-f",
      "title": "Benar atau Salah: Kurang",
      "bookReference": "hlm. 34–37",
      "objective": "Menilai pernyataan.. Ingat Menghitung Naik. (Menghitung Naik)",
      "mechanicDescription": "Dua ronde. Gunakan Menghitung Naik.",
      "voiceGuide": "Menghitung Naik. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-f",
      "title": "Detektif Pengurangan",
      "bookReference": "hlm. 34–37",
      "objective": "Dua petunjuk → sisa.. Ingat Menghitung Naik. (Menghitung Naik)",
      "mechanicDescription": "Empat soal. Gunakan Menghitung Naik.",
      "voiceGuide": "Menghitung Naik. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-f",
      "title": "Peta Konsep Pengurangan",
      "bookReference": "hlm. 35–36",
      "objective": "Mengisi kotak konsep.. Ingat Menghitung Naik. (Menghitung Naik)",
      "mechanicDescription": "Satu peta. Gunakan Menghitung Naik.",
      "voiceGuide": "Menghitung Naik. Mainkan dengan teliti.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-sub-q",
      "title": "Cerita Angka Pengurangan",
      "bookReference": "hlm. 34",
      "objective": "Soal cerita tanpa gambar.. Ingat Menghitung Naik. (Menghitung Naik)",
      "mechanicDescription": "Tiga ronde. Gunakan Menghitung Naik.",
      "voiceGuide": "Menghitung Naik. Mainkan dengan teliti.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "➡️",
      "nama": "Dari satuan",
      "isi": "Kurangkan dari kanan ke kiri.",
      "suara": "Mulai dari satuan."
    },
    {
      "ikon": "🌍",
      "nama": "Pengurangan Bersusun",
      "isi": "Kurangi dari satuan, pinjam jika perlu.",
      "suara": "Pengurangan Bersusun. Kurangi dari satuan, pinjam jika perlu."
    },
    {
      "ikon": "🌍",
      "nama": "Meminjam",
      "isi": "Satu puluhan dibuka menjadi sepuluh satuan.",
      "suara": "Meminjam. Satu puluhan dibuka menjadi sepuluh satuan."
    },
    {
      "ikon": "🌍",
      "nama": "Menghitung Naik",
      "isi": "Hitung naik dari yang dikurangi sampai bilangan awal.",
      "suara": "Menghitung Naik. Hitung naik dari yang dikurangi sampai bilangan awal."
    }
  ],
  "poinSuara": "Ingat: Pengurangan Bersusun, Meminjam, Menghitung Naik.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "susun",
        "warna": "#DBEAFE"
      },
      {
        "teks": "satuan",
        "warna": "#BBF7D0"
      },
      {
        "teks": "ambil",
        "warna": "#FECACA"
      },
      {
        "teks": "periksa",
        "warna": "#FDE68A"
      }
    ]
  },
  "rumah": "Ayo Mencoba: terapkan Pengurangan Bersusun pada satu soal nyata di rumah.",
  "refleksi": [
    "Bagaimana Pengurangan Bersusun membantumu?",
    "Kapan memakai Meminjam?",
    "Apa bedanya dengan hanya menghafal tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Standard Subtraction",
      "namaId": "Pengurangan Bersusun",
      "asal": "Elementary algorithms",
      "ringkas": "Kurangi dari satuan, pinjam jika perlu.",
      "tahap": [
        "Story",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Borrowing",
      "namaId": "Meminjam",
      "asal": "Base-ten regrouping",
      "ringkas": "Satu puluhan dibuka menjadi sepuluh satuan.",
      "tahap": [
        "Picture",
        "Mind"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Counting Up",
      "namaId": "Menghitung Naik",
      "asal": "Counting up",
      "ringkas": "Hitung naik dari yang dikurangi sampai bilangan awal.",
      "tahap": [
        "Concrete",
        "Infografis"
      ]
    }
  ]
};

export const SUB_G41: SubBabNaskah = {
  "id": "G",
  "codeTitle": "Sub-Bab G (Perkalian sampai 100)",
  "fullTitle": "Sub-Bab G: Perkalian Bilangan Cacah Sampai 100",
  "targetDescription": "Siswa memahami perkalian sampai 100 sebagai penjumlahan berulang, memakai cara panjang (urai puluhan+satuan) dan cara bersusun pendek dengan atau tanpa menyimpan, serta menyelesaikan soal cerita (donat 12×4, kelereng 14×5, pensil 12×8). Siswa memakai cara Kelompok Sama Banyak, Model Susunan, Kefasihan Tabel Kali. Siswa memakai cara Kelompok Sama Banyak, Model Susunan, Kefasihan Tabel Kali.",
  "secondaryBg": "#FEF3C7",
  "secondaryBorder": "#D97706",
  "secondaryText": "#78350F",
  "silabus": {
    "teksSuara": "Kita belajar perkalian sampai seratus. Dua belas kotak donat berisi empat donat sama dengan empat puluh delapan. Kita memakai cara: Kelompok Sama Banyak, Model Susunan, Kefasihan Tabel Kali. Perkalian adalah penjumlahan berulang kelompok sama. Baris × kolom menunjukkan hasil kali. Latihan fakta kali sampai 100. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa melakukan operasi hitung bilangan cacah. Pada sub-bab ini fokus perkalian sampai 100.",
    "referensi": "Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 1 Sub-Bab G)."
  },
  "videos": [],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Perkalian Bilangan Cacah Sampai 100 dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa memahami perkalian sampai 100 sebagai penjumlahan berulang, memakai cara panjang (urai puluhan+satuan) dan cara be….",
      "icon": "❓",
      "flowFrom": "Pahami soal",
      "flowTo": "Equal Groups"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Equal Groups",
      "stepDesc": "Perkalian adalah penjumlahan berulang kelompok sama. Pada Perkalian Bilangan Cacah Sampai 100, langkah “Equal Groups” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Kelompok Sama Banyak: Perkalian adalah penjumlahan berulang kelompok sama. Model Susunan: Baris × kolom menunjukkan hasil kali. Kefasihan Tabel Kali: Latihan fa…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🧭",
      "flowFrom": "Equal Groups",
      "flowTo": "Array Model"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Array Model",
      "stepDesc": "Baris × kolom menunjukkan hasil kali. Pada Perkalian Bilangan Cacah Sampai 100, langkah “Array Model” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Kelompok Sama Banyak: Perkalian adalah penjumlahan berulang kelompok sama. Model Susunan: Baris × kolom menunjukkan hasil kali. Kefasihan Tabel Kali: Latihan fa…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🛠️",
      "flowFrom": "Array Model",
      "flowTo": "Times Table Fluency"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Times Table Fluency",
      "stepDesc": "Latihan fakta kali sampai 100. Pada Perkalian Bilangan Cacah Sampai 100, langkah “Times Table Fluency” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Kelompok Sama Banyak: Perkalian adalah penjumlahan berulang kelompok sama. Model Susunan: Baris × kolom menunjukkan hasil kali. Kefasihan Tabel Kali: Latihan fa…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "✨",
      "flowFrom": "Times Table Fluency",
      "flowTo": "Kerjakan"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Kerjakan",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Perkalian Bilangan Cacah Sampai 100. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "✏️",
      "flowFrom": "Kerjakan",
      "flowTo": "Cek masuk akal"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek masuk akal",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Perkalian Bilangan Cacah Sampai 100. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Cek masuk akal",
      "flowTo": "Simpulkan"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Simpulkan",
      "stepDesc": "Simpulkan ide utama Perkalian Bilangan Cacah Sampai 100 dengan kalimatmu sendiri. Sebutkan cara yang kamu pakai dan mengapa cara itu membantu. Jelaskan kepada teman seolah-olah kamu guru kecil. Simpulan yang jelas menandakan konsepnya sudah dipahami.",
      "icon": "💬",
      "flowFrom": "Simpulkan",
      "flowTo": "Main"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Main",
      "stepDesc": "Latih lagi di tahap Concrete, Picture, lalu Abstract untuk Perkalian Bilangan Cacah Sampai 100. Mulai dari benda nyata, lanjut ke diagram, baru ke lambang angka. Ulangi sampai kamu bisa menjelaskan tanpa melihat contoh. Bermain sambil berlatih membuat konsepnya melekat lebih lama.",
      "icon": "🎮",
      "flowFrom": "Main",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "ARRAY",
      "emoji": "🍩",
      "countNum": 12,
      "countWord": "12×4",
      "suara": "Array 12 kotak berisi 4 donat. Pada Perkalian Bilangan Cacah Sampai 100, cocokkan gambar “ARRAY” dengan artinya (12×4), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🍩 ARRAY: 12×4"
    },
    {
      "judul": "48",
      "emoji": "🔢",
      "countNum": 48,
      "countWord": "hasil",
      "suara": "Pada Perkalian Bilangan Cacah Sampai 100, cocokkan gambar “48” dengan artinya (hasil), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Perkalian Bilangan Cacah Sampai 100.",
      "teksVisual": "🔢 48: hasil"
    },
    {
      "judul": "PANJANG",
      "emoji": "📜",
      "countNum": 10,
      "countWord": "10+2",
      "suara": "PANJANG — 10+2. Kita uraikan 12 menjadi 10 tambah 2. Lalu kalikan masing-masing dengan 4. Ingat: 10+2; ×4; 40+8. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Perkalian Bilangan Cacah Sampai 100.",
      "teksVisual": "📜 PANJANG: 10+2"
    },
    {
      "judul": "40+8",
      "emoji": "➕",
      "countNum": 48,
      "countWord": "jumlah",
      "suara": "40+8 — jumlah. Pada Perkalian Bilangan Cacah Sampai 100, cocokkan gambar “40+8” dengan artinya (jumlah), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Perkalian Bilangan…",
      "teksVisual": "➕ 40+8: jumlah"
    },
    {
      "judul": "BERSUSUN",
      "emoji": "⬇️",
      "countNum": 14,
      "countWord": "dari satuan",
      "suara": "Kalikan satuan dulu. Pada Perkalian Bilangan Cacah Sampai 100, cocokkan gambar “BERSUSUN” dengan artinya (dari satuan), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "⬇️ BERSUSUN: dari satuan"
    },
    {
      "judul": "MENYIMPAN",
      "emoji": "1️⃣",
      "countNum": 20,
      "countWord": "4×5",
      "suara": "4 × 5 = 20, simpan 2. 4 kali 5 sama dengan 20. Tulis 0, simpan 2 ke puluhan. Ingat: 4×5=20; simpan 2; 5+2=7. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Perkalian Bilangan Cacah Sampai 100.",
      "teksVisual": "1️⃣ MENYIMPAN: 4×5"
    },
    {
      "judul": "70",
      "emoji": "🎯",
      "countNum": 70,
      "countWord": "14×5",
      "suara": "Pada Perkalian Bilangan Cacah Sampai 100, cocokkan gambar “70” dengan artinya (14×5), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Perkalian Bilangan Cacah Sampai 100.",
      "teksVisual": "🎯 70: 14×5"
    },
    {
      "judul": "96",
      "emoji": "✏️",
      "countNum": 96,
      "countWord": "12×8",
      "suara": "Pada Perkalian Bilangan Cacah Sampai 100, cocokkan gambar “96” dengan artinya (12×8), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Perkalian Bilangan Cacah Sampai 100.",
      "teksVisual": "✏️ 96: 12×8"
    },
    {
      "judul": "CERITA",
      "emoji": "📖",
      "countNum": 36,
      "countWord": "12×3",
      "suara": "Ayam Asep 36 mangkok. Pada Perkalian Bilangan Cacah Sampai 100, cocokkan gambar “CERITA” dengan artinya (12×3), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Perkalian…",
      "teksVisual": "📖 CERITA: 12×3"
    },
    {
      "judul": "SIAP H",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "lanjut",
      "suara": "Siap belajar pembagian. Pada Perkalian Bilangan Cacah Sampai 100, cocokkan gambar “SIAP H” dengan artinya (lanjut), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "✅ SIAP H: lanjut"
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "array-rakit",
      "title": "Rakit Hasil Array",
      "bookReference": "hlm. 39–40 (12×4 donat)",
      "objective": "Pakai Kelompok Sama Banyak: Perkalian adalah penjumlahan berulang kelompok sama. Latihan: Merakit hasil perkalian dari array..",
      "mechanicDescription": "Tiga ronde, dua soal. Saat bermain, ingat Kelompok Sama Banyak: Perkalian adalah penjumlahan berulang kelompok sama.",
      "voiceGuide": "Kelompok Sama Banyak. Perkalian adalah penjumlahan berulang kelompok sama.",
      "emoji": "🍩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "array-hitung",
      "title": "Hitung Array Donat",
      "bookReference": "hlm. 39–40",
      "objective": "Pakai Kelompok Sama Banyak: Perkalian adalah penjumlahan berulang kelompok sama. Latihan: Menghitung hasil dari array benda..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Kelompok Sama Banyak: Perkalian adalah penjumlahan berulang kelompok sama.",
      "voiceGuide": "Kelompok Sama Banyak. Perkalian adalah penjumlahan berulang kelompok sama.",
      "emoji": "🔢",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-kali",
      "title": "Pilah: Menyimpan atau Tidak",
      "bookReference": "hlm. 42 (14×5)",
      "objective": "Pakai Kelompok Sama Banyak: Perkalian adalah penjumlahan berulang kelompok sama. Latihan: Memilah perkalian perlu simpan / tanpa..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Kelompok Sama Banyak: Perkalian adalah penjumlahan berulang kelompok sama.",
      "voiceGuide": "Kelompok Sama Banyak. Perkalian adalah penjumlahan berulang kelompok sama.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-kali",
      "title": "Jodohkan Soal dan Hasil Kali",
      "bookReference": "hlm. 40–42",
      "objective": "Pakai Kelompok Sama Banyak: Perkalian adalah penjumlahan berulang kelompok sama. Latihan: Menjodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Kelompok Sama Banyak: Perkalian adalah penjumlahan berulang kelompok sama.",
      "voiceGuide": "Kelompok Sama Banyak. Perkalian adalah penjumlahan berulang kelompok sama.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "memory-kali",
      "title": "Memori Perkalian",
      "bookReference": "hlm. 40–43",
      "objective": "Memori soal dan hasil.. Ingat Kelompok Sama Banyak. (Kelompok Sama Banyak)",
      "mechanicDescription": "Tiga ronde. Gunakan Kelompok Sama Banyak.",
      "voiceGuide": "Kelompok Sama Banyak. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-kali",
      "title": "Ketuk Hasil Kali",
      "bookReference": "hlm. 40–43",
      "objective": "Mengetuk pasangan berhasil tertentu.. Ingat Kelompok Sama Banyak. (Kelompok Sama Banyak)",
      "mechanicDescription": "Tiga ronde. Gunakan Kelompok Sama Banyak.",
      "voiceGuide": "Kelompok Sama Banyak. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-kali",
      "title": "Ketuk Semua yang Menyimpan",
      "bookReference": "hlm. 42",
      "objective": "Memilih semua yang perlu simpan.. Ingat Kelompok Sama Banyak. (Kelompok Sama Banyak)",
      "mechanicDescription": "Tiga ronde. Gunakan Kelompok Sama Banyak.",
      "voiceGuide": "Kelompok Sama Banyak. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-kali",
      "title": "Cerita Perkalian",
      "bookReference": "hlm. 43 (ayam, buku, kancing, kucing)",
      "objective": "Menyelesaikan soal cerita.. Ingat Kelompok Sama Banyak. (Kelompok Sama Banyak)",
      "mechanicDescription": "Tiga ronde. Gunakan Kelompok Sama Banyak.",
      "voiceGuide": "Kelompok Sama Banyak. Mainkan dengan teliti.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "board-kali",
      "title": "Papan Hasil Kali",
      "bookReference": "hlm. 40–42",
      "objective": "Menulis hasil di papan.. Ingat Kelompok Sama Banyak. (Kelompok Sama Banyak)",
      "mechanicDescription": "Tiga ronde. Gunakan Kelompok Sama Banyak.",
      "voiceGuide": "Kelompok Sama Banyak. Mainkan dengan teliti.",
      "emoji": "🗂️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-kali",
      "title": "Urutkan Hasil Kali",
      "bookReference": "hlm. 43",
      "objective": "Mengurutkan hasil.. Ingat Kelompok Sama Banyak. (Kelompok Sama Banyak)",
      "mechanicDescription": "Tiga ronde. Gunakan Kelompok Sama Banyak.",
      "voiceGuide": "Kelompok Sama Banyak. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "array-model",
      "title": "Array Titik",
      "bookReference": "hlm. 39–40",
      "objective": "Pakai Model Susunan: Baris × kolom menunjukkan hasil kali. Latihan: Membaca array titik menjadi hasil..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Model Susunan: Baris × kolom menunjukkan hasil kali.",
      "voiceGuide": "Model Susunan. Baris × kolom menunjukkan hasil kali.",
      "diagramType": "dot-array",
      "numberA": 4,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "long-kali",
      "title": "Cara Panjang",
      "bookReference": "hlm. 40–41",
      "objective": "Pakai Model Susunan: Baris × kolom menunjukkan hasil kali. Latihan: Memilih uraian (10+2)×4..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Model Susunan: Baris × kolom menunjukkan hasil kali.",
      "voiceGuide": "Model Susunan. Baris × kolom menunjukkan hasil kali.",
      "diagramType": "long-mul",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "column-kali",
      "title": "Bersusun Pendek",
      "bookReference": "hlm. 41–42",
      "objective": "Pakai Model Susunan: Baris × kolom menunjukkan hasil kali. Latihan: Memilih hasil bersusun..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Model Susunan: Baris × kolom menunjukkan hasil kali.",
      "voiceGuide": "Model Susunan. Baris × kolom menunjukkan hasil kali.",
      "diagramType": "col-mul",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-model-kali",
      "title": "Jodohkan Array dan Hasil",
      "bookReference": "hlm. 40",
      "objective": "Pakai Model Susunan: Baris × kolom menunjukkan hasil kali. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Model Susunan: Baris × kolom menunjukkan hasil kali.",
      "voiceGuide": "Model Susunan. Baris × kolom menunjukkan hasil kali.",
      "diagramType": "array-match",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memory-model-kali",
      "title": "Memori Array",
      "bookReference": "hlm. 40–42",
      "objective": "Memori.. Ingat Model Susunan. (Model Susunan)",
      "mechanicDescription": "Tiga ronde. Gunakan Model Susunan.",
      "voiceGuide": "Model Susunan. Mainkan dengan teliti.",
      "diagramType": "array-mem",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-kali",
      "title": "Tabel Hasil Kali",
      "bookReference": "hlm. 42–43",
      "objective": "Isi hasil tabel.. Ingat Model Susunan. (Model Susunan)",
      "mechanicDescription": "Tiga tabel. Gunakan Model Susunan.",
      "voiceGuide": "Model Susunan. Mainkan dengan teliti.",
      "diagramType": "mul-table",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-kali-p",
      "title": "Ketuk Semua Simpan (Model)",
      "bookReference": "hlm. 42",
      "objective": "Syarat menyimpan.. Ingat Model Susunan. (Model Susunan)",
      "mechanicDescription": "Tiga ronde. Gunakan Model Susunan.",
      "voiceGuide": "Model Susunan. Mainkan dengan teliti.",
      "diagramType": "mul-select",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-kali-p",
      "title": "Pilah Array Simpan/Tidak",
      "bookReference": "hlm. 42",
      "objective": "Pilah.. Ingat Model Susunan. (Model Susunan)",
      "mechanicDescription": "Tiga ronde. Gunakan Model Susunan.",
      "voiceGuide": "Model Susunan. Mainkan dengan teliti.",
      "diagramType": "mul-sort",
      "numberA": 3,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "steps-kali",
      "title": "Langkah Menyimpan Kali",
      "bookReference": "hlm. 42",
      "objective": "Pilih langkah benar.. Ingat Model Susunan. (Model Susunan)",
      "mechanicDescription": "Tiga ronde. Gunakan Model Susunan.",
      "voiceGuide": "Model Susunan. Mainkan dengan teliti.",
      "diagramType": "mul-steps",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "repeat-add",
      "title": "Penjumlahan Berulang",
      "bookReference": "hlm. 39",
      "objective": "Mengenali penjumlahan berulang.. Ingat Model Susunan. (Model Susunan)",
      "mechanicDescription": "Tiga ronde. Gunakan Model Susunan.",
      "voiceGuide": "Model Susunan. Mainkan dengan teliti.",
      "diagramType": "repeat-add",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "column-kali-q",
      "title": "Bersusun Angka",
      "bookReference": "hlm. 41–42",
      "objective": "Pakai Kefasihan Tabel Kali: Latihan fakta kali sampai 100. Latihan: Hasil bersusun..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Kefasihan Tabel Kali: Latihan fakta kali sampai 100.",
      "voiceGuide": "Kefasihan Tabel Kali. Latihan fakta kali sampai 100.",
      "symbolLarge": "48",
      "wordLarge": "KALI",
      "mathNotation": "a × b"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-kali",
      "title": "Pilih Hasil Kali",
      "bookReference": "hlm. 43",
      "objective": "Pakai Kefasihan Tabel Kali: Latihan fakta kali sampai 100. Latihan: Memilih hasil..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Kefasihan Tabel Kali: Latihan fakta kali sampai 100.",
      "voiceGuide": "Kefasihan Tabel Kali. Latihan fakta kali sampai 100.",
      "symbolLarge": "70",
      "wordLarge": "HASIL",
      "mathNotation": "a × b = ?"
    },
    {
      "stage": "Abstract",
      "gameType": "board-kali-q",
      "title": "Tulis Kali di Papan",
      "bookReference": "hlm. 42",
      "objective": "Pakai Kefasihan Tabel Kali: Latihan fakta kali sampai 100. Latihan: Menulis hasil..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Kefasihan Tabel Kali: Latihan fakta kali sampai 100.",
      "voiceGuide": "Kefasihan Tabel Kali. Latihan fakta kali sampai 100.",
      "symbolLarge": "96",
      "wordLarge": "PAPAN",
      "mathNotation": "hasil"
    },
    {
      "stage": "Abstract",
      "gameType": "long-kali-q",
      "title": "Uraian Panjang Angka",
      "bookReference": "hlm. 40",
      "objective": "Pakai Kefasihan Tabel Kali: Latihan fakta kali sampai 100. Latihan: Memilih uraian benar..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Kefasihan Tabel Kali: Latihan fakta kali sampai 100.",
      "voiceGuide": "Kefasihan Tabel Kali. Latihan fakta kali sampai 100.",
      "symbolLarge": "(10+2)×4",
      "wordLarge": "PANJANG",
      "mathNotation": "urai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-kali-q",
      "title": "Jodohkan Soal Kali",
      "bookReference": "hlm. 42–43",
      "objective": "Jodohkan.. Ingat Kefasihan Tabel Kali. (Kefasihan Tabel Kali)",
      "mechanicDescription": "Tiga ronde. Gunakan Kefasihan Tabel Kali.",
      "voiceGuide": "Kefasihan Tabel Kali. Mainkan dengan teliti.",
      "symbolLarge": "84",
      "wordLarge": "JODOH",
      "mathNotation": "soal • hasil"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-kali-q",
      "title": "Memori Soal Kali",
      "bookReference": "hlm. 43",
      "objective": "Memori.. Ingat Kefasihan Tabel Kali. (Kefasihan Tabel Kali)",
      "mechanicDescription": "Tiga ronde. Gunakan Kefasihan Tabel Kali.",
      "voiceGuide": "Kefasihan Tabel Kali. Mainkan dengan teliti.",
      "symbolLarge": "90",
      "wordLarge": "MEMORI",
      "mathNotation": "soal • hasil"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-g",
      "title": "Benar atau Salah: Kali",
      "bookReference": "hlm. 39–43",
      "objective": "Menilai pernyataan.. Ingat Kefasihan Tabel Kali. (Kefasihan Tabel Kali)",
      "mechanicDescription": "Dua ronde. Gunakan Kefasihan Tabel Kali.",
      "voiceGuide": "Kefasihan Tabel Kali. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-g",
      "title": "Detektif Perkalian",
      "bookReference": "hlm. 43",
      "objective": "Petunjuk → hasil.. Ingat Kefasihan Tabel Kali. (Kefasihan Tabel Kali)",
      "mechanicDescription": "Empat soal. Gunakan Kefasihan Tabel Kali.",
      "voiceGuide": "Kefasihan Tabel Kali. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-g",
      "title": "Peta Konsep Perkalian",
      "bookReference": "hlm. 40–42",
      "objective": "Mengisi kotak konsep.. Ingat Kefasihan Tabel Kali. (Kefasihan Tabel Kali)",
      "mechanicDescription": "Satu peta. Gunakan Kefasihan Tabel Kali.",
      "voiceGuide": "Kefasihan Tabel Kali. Mainkan dengan teliti.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-kali-q",
      "title": "Cerita Angka Kali",
      "bookReference": "hlm. 43",
      "objective": "Soal cerita tanpa gambar.. Ingat Kefasihan Tabel Kali. (Kefasihan Tabel Kali)",
      "mechanicDescription": "Tiga ronde. Gunakan Kefasihan Tabel Kali.",
      "voiceGuide": "Kefasihan Tabel Kali. Mainkan dengan teliti.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "🧩",
      "nama": "Berulang",
      "isi": "Perkalian adalah penjumlahan berulang.",
      "suara": "Perkalian mempercepat penjumlahan berulang."
    },
    {
      "ikon": "🌍",
      "nama": "Kelompok Sama Banyak",
      "isi": "Perkalian adalah penjumlahan berulang kelompok sama.",
      "suara": "Kelompok Sama Banyak. Perkalian adalah penjumlahan berulang kelompok sama."
    },
    {
      "ikon": "🌍",
      "nama": "Model Susunan",
      "isi": "Baris × kolom menunjukkan hasil kali.",
      "suara": "Model Susunan. Baris × kolom menunjukkan hasil kali."
    },
    {
      "ikon": "🌍",
      "nama": "Kefasihan Tabel Kali",
      "isi": "Latihan fakta kali sampai 100.",
      "suara": "Kefasihan Tabel Kali. Latihan fakta kali sampai 100."
    }
  ],
  "poinSuara": "Ingat: Kelompok Sama Banyak, Model Susunan, Kefasihan Tabel Kali.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Berulang",
        "warna": "#DDD6FE"
      },
      {
        "teks": "Panjang",
        "warna": "#BBF7D0"
      },
      {
        "teks": "Menyimpan",
        "warna": "#BFDBFE"
      },
      {
        "teks": "Periksa",
        "warna": "#FDE68A"
      }
    ]
  },
  "rumah": "Ayo Mencoba: terapkan Kelompok Sama Banyak pada satu soal nyata di rumah.",
  "refleksi": [
    "Bagaimana Kelompok Sama Banyak membantumu?",
    "Kapan memakai Model Susunan?",
    "Apa bedanya dengan hanya menghafal tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Equal Groups",
      "namaId": "Kelompok Sama Banyak",
      "asal": "Multiplication pedagogy",
      "ringkas": "Perkalian adalah penjumlahan berulang kelompok sama.",
      "tahap": [
        "Story",
        "Concrete"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Array Model",
      "namaId": "Model Susunan",
      "asal": "Van de Walle",
      "ringkas": "Baris × kolom menunjukkan hasil kali.",
      "tahap": [
        "Picture",
        "Mind"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Times Table Fluency",
      "namaId": "Kefasihan Tabel Kali",
      "asal": "Basic facts",
      "ringkas": "Latihan fakta kali sampai 100.",
      "tahap": [
        "Abstract",
        "Infografis"
      ]
    }
  ]
};

export const SUB_H41: SubBabNaskah = {
  "id": "H",
  "codeTitle": "Sub-Bab H (Pembagian sampai 100)",
  "fullTitle": "Sub-Bab H: Pembagian Bilangan Cacah Sampai 100",
  "targetDescription": "Siswa membagi bilangan cacah sampai 100 secara sama banyak (permen 48 : 4), memakai pembagian bersusun dari puluhan ke satuan, mengenali sisa 0, dan menyelesaikan soal cerita. Siswa memakai cara Bagi Rata, Bagi Ukur, Kebalikan Kali. Siswa memakai cara Bagi Rata, Bagi Ukur, Kebalikan Kali.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Kita belajar pembagian sampai seratus. Empat puluh delapan permen dibagi empat anak. Kita memakai pembagian bersusun dari puluhan. Kita memakai cara: Bagi Rata, Bagi Ukur, Kebalikan Kali. Pembagian membagi benda ke kelompok sama banyak. Berapa kelompok terbentuk jika tiap kelompok berisi n. Pembagian dan perkalian saling berkebalikan. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa melakukan operasi hitung bilangan cacah. Pada sub-bab ini fokus pembagian sampai 100.",
    "referensi": "Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 1 Sub-Bab H)."
  },
  "videos": [],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Pembagian Bilangan Cacah Sampai 100 dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa membagi bilangan cacah sampai 100 secara sama banyak (permen 48 : 4), memakai pembagian bersusun dari puluhan ke s….",
      "icon": "❓",
      "flowFrom": "Pahami soal",
      "flowTo": "Fair Share"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Fair Share",
      "stepDesc": "Pembagian membagi benda ke kelompok sama banyak. Pada Pembagian Bilangan Cacah Sampai 100, langkah “Fair Share” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Bagi Rata: Pembagian membagi benda ke kelompok sama banyak. Bagi Ukur: Berapa kelompok terbentuk jika tiap kelompok berisi n. Kebalikan Kali: Pembagian dan perk…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🧭",
      "flowFrom": "Fair Share",
      "flowTo": "Measurement Division"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Measurement Division",
      "stepDesc": "Berapa kelompok terbentuk jika tiap kelompok berisi n. Pada Pembagian Bilangan Cacah Sampai 100, langkah “Measurement Division” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Bagi Rata: Pembagian membagi benda ke kelompok sama banyak. Bagi Ukur: Berapa kelompok terbentuk jika tiap kelompok berisi n. Kebalikan Kali: Pembagian dan perk…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🛠️",
      "flowFrom": "Measurement Division",
      "flowTo": "Inverse of Multiply"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Inverse of Multiply",
      "stepDesc": "Pembagian dan perkalian saling berkebalikan. Pada Pembagian Bilangan Cacah Sampai 100, langkah “Inverse of Multiply” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Bagi Rata: Pembagian membagi benda ke kelompok sama banyak. Bagi Ukur: Berapa kelompok terbentuk jika tiap kelompok berisi n. Kebalikan Kali: Pembagian dan perk…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "✨",
      "flowFrom": "Inverse of Multiply",
      "flowTo": "Kerjakan"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Kerjakan",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Pembagian Bilangan Cacah Sampai 100. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "✏️",
      "flowFrom": "Kerjakan",
      "flowTo": "Cek masuk akal"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek masuk akal",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Pembagian Bilangan Cacah Sampai 100. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Cek masuk akal",
      "flowTo": "Simpulkan"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Simpulkan",
      "stepDesc": "Simpulkan ide utama Pembagian Bilangan Cacah Sampai 100 dengan kalimatmu sendiri. Sebutkan cara yang kamu pakai dan mengapa cara itu membantu. Jelaskan kepada teman seolah-olah kamu guru kecil. Simpulan yang jelas menandakan konsepnya sudah dipahami.",
      "icon": "💬",
      "flowFrom": "Simpulkan",
      "flowTo": "Main"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Main",
      "stepDesc": "Latih lagi di tahap Concrete, Picture, lalu Abstract untuk Pembagian Bilangan Cacah Sampai 100. Mulai dari benda nyata, lanjut ke diagram, baru ke lambang angka. Ulangi sampai kamu bisa menjelaskan tanpa melihat contoh. Bermain sambil berlatih membuat konsepnya melekat lebih lama.",
      "icon": "🎮",
      "flowFrom": "Main",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "SAMA BANYAK",
      "emoji": "🍬",
      "countNum": 48,
      "countWord": "bagi 4",
      "suara": "48 permen untuk 4 anak. Pada Pembagian Bilangan Cacah Sampai 100, cocokkan gambar “SAMA BANYAK” dengan artinya (bagi 4), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🍬 SAMA BANYAK: bagi 4"
    },
    {
      "judul": "12",
      "emoji": "🎯",
      "countNum": 12,
      "countWord": "hasil",
      "suara": "Pada Pembagian Bilangan Cacah Sampai 100, cocokkan gambar “12” dengan artinya (hasil), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Pembagian Bilangan Cacah Sampai 100.",
      "teksVisual": "🎯 12: hasil"
    },
    {
      "judul": "PULUHAN DULU",
      "emoji": "⬇️",
      "countNum": 4,
      "countWord": "4:4=1",
      "suara": "Mulai dari nilai terbesar. Pada Pembagian Bilangan Cacah Sampai 100, cocokkan gambar “PULUHAN DULU” dengan artinya (4:4=1), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "⬇️ PULUHAN DULU: 4:4=1"
    },
    {
      "judul": "SATUAN",
      "emoji": "2️⃣",
      "countNum": 8,
      "countWord": "8:4=2",
      "suara": "SATUAN — 8:4=2. 8 dibagi 4 sama dengan 2. Letakkan 2 di satuan hasil bagi. Ingat: 8:4=2; hasil 12; 2×4=8. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Pembagian Bilangan Cacah Sampai 100.",
      "teksVisual": "2️⃣ SATUAN: 8:4=2"
    },
    {
      "judul": "SISA 0",
      "emoji": "0️⃣",
      "countNum": 0,
      "countWord": "habis",
      "suara": "Sisa nol berarti habis. Pada Pembagian Bilangan Cacah Sampai 100, cocokkan gambar “SISA 0” dengan artinya (habis), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "0️⃣ SISA 0: habis"
    },
    {
      "judul": "PERIKSA",
      "emoji": "🔍",
      "countNum": 48,
      "countWord": "12×4",
      "suara": "PERIKSA — 12×4. Pada Pembagian Bilangan Cacah Sampai 100, cocokkan gambar “PERIKSA” dengan artinya (12×4), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Pembagian…",
      "teksVisual": "🔍 PERIKSA: 12×4"
    },
    {
      "judul": "36:2",
      "emoji": "👫",
      "countNum": 18,
      "countWord": "Tini",
      "suara": "Cerita Tono dan Tini. Pada Pembagian Bilangan Cacah Sampai 100, cocokkan gambar “36:2” dengan artinya (Tini), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Pembagian…",
      "teksVisual": "👫 36:2: Tini"
    },
    {
      "judul": "81:3",
      "emoji": "🧁",
      "countNum": 27,
      "countWord": "kotak",
      "suara": "81 kue jadi 27 kotak. Pada Pembagian Bilangan Cacah Sampai 100, cocokkan gambar “81:3” dengan artinya (kotak), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Pembagian…",
      "teksVisual": "🧁 81:3: kotak"
    },
    {
      "judul": "55:5",
      "emoji": "🔑",
      "countNum": 11,
      "countWord": "Asep",
      "suara": "55:5 — Asep. Pada Pembagian Bilangan Cacah Sampai 100, cocokkan gambar “55:5” dengan artinya (Asep), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Pembagian Bilangan…",
      "teksVisual": "🔑 55:5: Asep"
    },
    {
      "judul": "SIAP I",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "lanjut",
      "suara": "Siap faktor dan kelipatan. Pada Pembagian Bilangan Cacah Sampai 100, cocokkan gambar “SIAP I” dengan artinya (lanjut), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "✅ SIAP I: lanjut"
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "bagi-koleksi",
      "title": "Bagi ke Wadah",
      "bookReference": "hlm. 44–45 (48 permen)",
      "objective": "Pakai Bagi Rata: Pembagian membagi benda ke kelompok sama banyak. Latihan: Membagi benda ke kelompok sama..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Bagi Rata: Pembagian membagi benda ke kelompok sama banyak.",
      "voiceGuide": "Bagi Rata. Pembagian membagi benda ke kelompok sama banyak.",
      "emoji": "🍬",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "hitung-bagi",
      "title": "Hitung Hasil Bagi",
      "bookReference": "hlm. 45–46",
      "objective": "Pakai Bagi Rata: Pembagian membagi benda ke kelompok sama banyak. Latihan: Memilih hasil pembagian..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Bagi Rata: Pembagian membagi benda ke kelompok sama banyak.",
      "voiceGuide": "Bagi Rata. Pembagian membagi benda ke kelompok sama banyak.",
      "emoji": "🔢",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-bagi",
      "title": "Pilah: Habis atau Bersisa",
      "bookReference": "hlm. 45",
      "objective": "Pakai Bagi Rata: Pembagian membagi benda ke kelompok sama banyak. Latihan: Memilah habis dibagi / bersisa..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Bagi Rata: Pembagian membagi benda ke kelompok sama banyak.",
      "voiceGuide": "Bagi Rata. Pembagian membagi benda ke kelompok sama banyak.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-bagi",
      "title": "Jodohkan Soal dan Hasil Bagi",
      "bookReference": "hlm. 46–47",
      "objective": "Pakai Bagi Rata: Pembagian membagi benda ke kelompok sama banyak. Latihan: Menjodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Bagi Rata: Pembagian membagi benda ke kelompok sama banyak.",
      "voiceGuide": "Bagi Rata. Pembagian membagi benda ke kelompok sama banyak.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "memory-bagi",
      "title": "Memori Pembagian",
      "bookReference": "hlm. 46–47",
      "objective": "Memori.. Ingat Bagi Rata. (Bagi Rata)",
      "mechanicDescription": "Tiga ronde. Gunakan Bagi Rata.",
      "voiceGuide": "Bagi Rata. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-bagi",
      "title": "Ketuk Hasil Bagi",
      "bookReference": "hlm. 46–47",
      "objective": "Mengetuk pasangan.. Ingat Bagi Rata. (Bagi Rata)",
      "mechanicDescription": "Tiga ronde. Gunakan Bagi Rata.",
      "voiceGuide": "Bagi Rata. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-bagi",
      "title": "Ketuk Semua yang Habis",
      "bookReference": "hlm. 45",
      "objective": "Memilih semua habis dibagi.. Ingat Bagi Rata. (Bagi Rata)",
      "mechanicDescription": "Tiga ronde. Gunakan Bagi Rata.",
      "voiceGuide": "Bagi Rata. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-bagi",
      "title": "Cerita Pembagian",
      "bookReference": "hlm. 47",
      "objective": "Soal cerita.. Ingat Bagi Rata. (Bagi Rata)",
      "mechanicDescription": "Tiga ronde. Gunakan Bagi Rata.",
      "voiceGuide": "Bagi Rata. Mainkan dengan teliti.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "board-bagi",
      "title": "Papan Hasil Bagi",
      "bookReference": "hlm. 46",
      "objective": "Menulis hasil.. Ingat Bagi Rata. (Bagi Rata)",
      "mechanicDescription": "Tiga ronde. Gunakan Bagi Rata.",
      "voiceGuide": "Bagi Rata. Mainkan dengan teliti.",
      "emoji": "🗂️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-bagi",
      "title": "Urutkan Hasil Bagi",
      "bookReference": "hlm. 47",
      "objective": "Mengurutkan.. Ingat Bagi Rata. (Bagi Rata)",
      "mechanicDescription": "Tiga ronde. Gunakan Bagi Rata.",
      "voiceGuide": "Bagi Rata. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "group-model",
      "title": "Model Kelompok Sama",
      "bookReference": "hlm. 45",
      "objective": "Pakai Bagi Ukur: Berapa kelompok terbentuk jika tiap kelompok berisi n. Latihan: Membaca model bagi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Bagi Ukur: Berapa kelompok terbentuk jika tiap kelompok berisi n.",
      "voiceGuide": "Bagi Ukur. Berapa kelompok terbentuk jika tiap kelompok berisi n.",
      "diagramType": "group-div",
      "numberA": 4,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "long-bagi",
      "title": "Langkah Bersusun",
      "bookReference": "hlm. 46",
      "objective": "Pakai Bagi Ukur: Berapa kelompok terbentuk jika tiap kelompok berisi n. Latihan: Memilih langkah benar..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Bagi Ukur: Berapa kelompok terbentuk jika tiap kelompok berisi n.",
      "voiceGuide": "Bagi Ukur. Berapa kelompok terbentuk jika tiap kelompok berisi n.",
      "diagramType": "long-div",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "column-bagi",
      "title": "Bersusun di Layar",
      "bookReference": "hlm. 46",
      "objective": "Pakai Bagi Ukur: Berapa kelompok terbentuk jika tiap kelompok berisi n. Latihan: Memilih hasil bersusun..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Bagi Ukur: Berapa kelompok terbentuk jika tiap kelompok berisi n.",
      "voiceGuide": "Bagi Ukur. Berapa kelompok terbentuk jika tiap kelompok berisi n.",
      "diagramType": "col-div",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-model-bagi",
      "title": "Jodohkan Model dan Hasil",
      "bookReference": "hlm. 46",
      "objective": "Pakai Bagi Ukur: Berapa kelompok terbentuk jika tiap kelompok berisi n. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Bagi Ukur: Berapa kelompok terbentuk jika tiap kelompok berisi n.",
      "voiceGuide": "Bagi Ukur. Berapa kelompok terbentuk jika tiap kelompok berisi n.",
      "diagramType": "div-match",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memory-model-bagi",
      "title": "Memori Model Bagi",
      "bookReference": "hlm. 46",
      "objective": "Memori.. Ingat Bagi Ukur. (Bagi Ukur)",
      "mechanicDescription": "Tiga ronde. Gunakan Bagi Ukur.",
      "voiceGuide": "Bagi Ukur. Mainkan dengan teliti.",
      "diagramType": "div-mem",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-bagi",
      "title": "Tabel Hasil Bagi",
      "bookReference": "hlm. 45–47",
      "objective": "Isi tabel.. Ingat Bagi Ukur. (Bagi Ukur)",
      "mechanicDescription": "Tiga tabel. Gunakan Bagi Ukur.",
      "voiceGuide": "Bagi Ukur. Mainkan dengan teliti.",
      "diagramType": "div-table",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-bagi-p",
      "title": "Ketuk Semua Habis (Model)",
      "bookReference": "hlm. 45",
      "objective": "Syarat habis.. Ingat Bagi Ukur. (Bagi Ukur)",
      "mechanicDescription": "Tiga ronde. Gunakan Bagi Ukur.",
      "voiceGuide": "Bagi Ukur. Mainkan dengan teliti.",
      "diagramType": "div-select",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-bagi-p",
      "title": "Pilah Model Habis/Sisa",
      "bookReference": "hlm. 45",
      "objective": "Pilah.. Ingat Bagi Ukur. (Bagi Ukur)",
      "mechanicDescription": "Tiga ronde. Gunakan Bagi Ukur.",
      "voiceGuide": "Bagi Ukur. Mainkan dengan teliti.",
      "diagramType": "div-sort",
      "numberA": 3,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "check-bagi",
      "title": "Periksa dengan Kali",
      "bookReference": "hlm. 46",
      "objective": "Hasil × pembagi = yang dibagi.. Ingat Bagi Ukur. (Bagi Ukur)",
      "mechanicDescription": "Tiga ronde. Gunakan Bagi Ukur.",
      "voiceGuide": "Bagi Ukur. Mainkan dengan teliti.",
      "diagramType": "div-check",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sisa-model",
      "title": "Ada Sisa atau Tidak",
      "bookReference": "hlm. 45",
      "objective": "Mengenali sisa.. Ingat Bagi Ukur. (Bagi Ukur)",
      "mechanicDescription": "Tiga ronde. Gunakan Bagi Ukur.",
      "voiceGuide": "Bagi Ukur. Mainkan dengan teliti.",
      "diagramType": "div-rem",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "column-bagi-q",
      "title": "Bersusun Angka Bagi",
      "bookReference": "hlm. 46–47",
      "objective": "Pakai Kebalikan Kali: Pembagian dan perkalian saling berkebalikan. Latihan: Hasil bersusun..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Kebalikan Kali: Pembagian dan perkalian saling berkebalikan.",
      "voiceGuide": "Kebalikan Kali. Pembagian dan perkalian saling berkebalikan.",
      "symbolLarge": "12",
      "wordLarge": "BAGI",
      "mathNotation": "a : b"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-bagi",
      "title": "Pilih Hasil Bagi",
      "bookReference": "hlm. 47",
      "objective": "Pakai Kebalikan Kali: Pembagian dan perkalian saling berkebalikan. Latihan: Memilih hasil..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Kebalikan Kali: Pembagian dan perkalian saling berkebalikan.",
      "voiceGuide": "Kebalikan Kali. Pembagian dan perkalian saling berkebalikan.",
      "symbolLarge": "32",
      "wordLarge": "HASIL",
      "mathNotation": "a : b = ?"
    },
    {
      "stage": "Abstract",
      "gameType": "board-bagi-q",
      "title": "Tulis Bagi di Papan",
      "bookReference": "hlm. 46",
      "objective": "Pakai Kebalikan Kali: Pembagian dan perkalian saling berkebalikan. Latihan: Menulis hasil..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Kebalikan Kali: Pembagian dan perkalian saling berkebalikan.",
      "voiceGuide": "Kebalikan Kali. Pembagian dan perkalian saling berkebalikan.",
      "symbolLarge": "27",
      "wordLarge": "PAPAN",
      "mathNotation": "hasil"
    },
    {
      "stage": "Abstract",
      "gameType": "steps-bagi-q",
      "title": "Langkah Puluhan ke Satuan",
      "bookReference": "hlm. 46",
      "objective": "Pakai Kebalikan Kali: Pembagian dan perkalian saling berkebalikan. Latihan: Pilih langkah..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Kebalikan Kali: Pembagian dan perkalian saling berkebalikan.",
      "voiceGuide": "Kebalikan Kali. Pembagian dan perkalian saling berkebalikan.",
      "symbolLarge": "4:4=1",
      "wordLarge": "LANGKAH",
      "mathNotation": "bersusun"
    },
    {
      "stage": "Abstract",
      "gameType": "match-bagi-q",
      "title": "Jodohkan Soal Bagi",
      "bookReference": "hlm. 47",
      "objective": "Jodohkan.. Ingat Kebalikan Kali. (Kebalikan Kali)",
      "mechanicDescription": "Tiga ronde. Gunakan Kebalikan Kali.",
      "voiceGuide": "Kebalikan Kali. Mainkan dengan teliti.",
      "symbolLarge": "16",
      "wordLarge": "JODOH",
      "mathNotation": "soal • hasil"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-bagi-q",
      "title": "Memori Soal Bagi",
      "bookReference": "hlm. 47",
      "objective": "Memori.. Ingat Kebalikan Kali. (Kebalikan Kali)",
      "mechanicDescription": "Tiga ronde. Gunakan Kebalikan Kali.",
      "voiceGuide": "Kebalikan Kali. Mainkan dengan teliti.",
      "symbolLarge": "11",
      "wordLarge": "MEMORI",
      "mathNotation": "soal • hasil"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-h",
      "title": "Benar atau Salah: Bagi",
      "bookReference": "hlm. 44–47",
      "objective": "Menilai pernyataan.. Ingat Kebalikan Kali. (Kebalikan Kali)",
      "mechanicDescription": "Dua ronde. Gunakan Kebalikan Kali.",
      "voiceGuide": "Kebalikan Kali. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-h",
      "title": "Detektif Pembagian",
      "bookReference": "hlm. 47",
      "objective": "Petunjuk → hasil.. Ingat Kebalikan Kali. (Kebalikan Kali)",
      "mechanicDescription": "Empat soal. Gunakan Kebalikan Kali.",
      "voiceGuide": "Kebalikan Kali. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-h",
      "title": "Peta Konsep Pembagian",
      "bookReference": "hlm. 45–46",
      "objective": "Mengisi kotak.. Ingat Kebalikan Kali. (Kebalikan Kali)",
      "mechanicDescription": "Satu peta. Gunakan Kebalikan Kali.",
      "voiceGuide": "Kebalikan Kali. Mainkan dengan teliti.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-bagi-q",
      "title": "Cerita Angka Bagi",
      "bookReference": "hlm. 47",
      "objective": "Soal cerita.. Ingat Kebalikan Kali. (Kebalikan Kali)",
      "mechanicDescription": "Tiga ronde. Gunakan Kebalikan Kali.",
      "voiceGuide": "Kebalikan Kali. Mainkan dengan teliti.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "🧩",
      "nama": "Sama banyak",
      "isi": "Pembagian membagi koleksi rata.",
      "suara": "Bagagian adalah bagi sama banyak."
    },
    {
      "ikon": "🌍",
      "nama": "Bagi Rata",
      "isi": "Pembagian membagi benda ke kelompok sama banyak.",
      "suara": "Bagi Rata. Pembagian membagi benda ke kelompok sama banyak."
    },
    {
      "ikon": "🌍",
      "nama": "Bagi Ukur",
      "isi": "Berapa kelompok terbentuk jika tiap kelompok berisi n.",
      "suara": "Bagi Ukur. Berapa kelompok terbentuk jika tiap kelompok berisi n."
    },
    {
      "ikon": "🌍",
      "nama": "Kebalikan Kali",
      "isi": "Pembagian dan perkalian saling berkebalikan.",
      "suara": "Kebalikan Kali. Pembagian dan perkalian saling berkebalikan."
    }
  ],
  "poinSuara": "Ingat: Bagi Rata, Bagi Ukur, Kebalikan Kali.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Sama banyak",
        "warna": "#DDD6FE"
      },
      {
        "teks": "Dari puluhan",
        "warna": "#BBF7D0"
      },
      {
        "teks": "Sisa",
        "warna": "#BFDBFE"
      },
      {
        "teks": "Periksa",
        "warna": "#FDE68A"
      }
    ]
  },
  "rumah": "Ayo Mencoba: terapkan Bagi Rata pada satu soal nyata di rumah.",
  "refleksi": [
    "Bagaimana Bagi Rata membantumu?",
    "Kapan memakai Bagi Ukur?",
    "Apa bedanya dengan hanya menghafal tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Fair Share",
      "namaId": "Bagi Rata",
      "asal": "Division pedagogy",
      "ringkas": "Pembagian membagi benda ke kelompok sama banyak.",
      "tahap": [
        "Story",
        "Concrete"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Measurement Division",
      "namaId": "Bagi Ukur",
      "asal": "Van de Walle",
      "ringkas": "Berapa kelompok terbentuk jika tiap kelompok berisi n.",
      "tahap": [
        "Picture",
        "Mind"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Inverse of Multiply",
      "namaId": "Kebalikan Kali",
      "asal": "Fact family",
      "ringkas": "Pembagian dan perkalian saling berkebalikan.",
      "tahap": [
        "Abstract",
        "Infografis"
      ]
    }
  ]
};

export const SUB_I41: SubBabNaskah = {
  "id": "I",
  "codeTitle": "Sub-Bab I (Faktor dan Kelipatan)",
  "fullTitle": "Sub-Bab I: Faktor dan Kelipatan",
  "targetDescription": "Siswa menentukan faktor (pembagi habis) bilangan seperti 12, 20, 24, 48, memahami mengapa bilangan tertentu bukan faktor, serta menentukan kelipatan (hasil kali berulang) seperti kelipatan 2, 3, 5, dan 6. Siswa memakai cara Pasangan Faktor, Kelipatan Lompat Hitung, Keterbagian. Siswa memakai cara Pasangan Faktor, Kelipatan Lompat Hitung, Keterbagian.",
  "secondaryBg": "#FCE7F3",
  "secondaryBorder": "#DB2777",
  "secondaryText": "#9D174D",
  "silabus": {
    "teksSuara": "Kita belajar faktor dan kelipatan. Faktor dua belas adalah satu, dua, tiga, empat, enam, dan dua belas. Kelipatan dua adalah dua, empat, enam, delapan, dan seterusnya. Kita memakai cara: Pasangan Faktor, Kelipatan Lompat Hitung, Keterbagian. Faktor datang berpasangan hasil kali bilangan itu. Kelipatan = hasil lompat tetap. Faktor membagi habis bilangan. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa memahami faktor dan kelipatan bilangan cacah.",
    "referensi": "Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 1 Sub-Bab I)."
  },
  "videos": [],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Faktor dan Kelipatan dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa menentukan faktor (pembagi habis) bilangan seperti 12, 20, 24, 48, memahami mengapa bilangan tertentu bukan faktor….",
      "icon": "❓",
      "flowFrom": "Pahami soal",
      "flowTo": "Factor Pairs"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Factor Pairs",
      "stepDesc": "Faktor datang berpasangan hasil kali bilangan itu. Pada Faktor dan Kelipatan, langkah “Factor Pairs” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Pasangan Faktor: Faktor datang berpasangan hasil kali bilangan itu. Kelipatan Lompat Hitung: Kelipatan = hasil lompat tetap. Keterbagian: Faktor membagi habis b…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🧭",
      "flowFrom": "Factor Pairs",
      "flowTo": "Skip Counting Multiples"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Skip Counting Multiples",
      "stepDesc": "Kelipatan = hasil lompat tetap. Pada Faktor dan Kelipatan, langkah “Skip Counting Multiples” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Pasangan Faktor: Faktor datang berpasangan hasil kali bilangan itu. Kelipatan Lompat Hitung: Kelipatan = hasil lompat tetap. Keterbagian: Faktor membagi habis b…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🛠️",
      "flowFrom": "Skip Counting Multiples",
      "flowTo": "Divisibility"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Divisibility",
      "stepDesc": "Faktor membagi habis bilangan. Pada Faktor dan Kelipatan, langkah “Divisibility” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Pasangan Faktor: Faktor datang berpasangan hasil kali bilangan itu. Kelipatan Lompat Hitung: Kelipatan = hasil lompat tetap. Keterbagian: Faktor membagi habis b…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "✨",
      "flowFrom": "Divisibility",
      "flowTo": "Kerjakan"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Kerjakan",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Faktor dan Kelipatan. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "✏️",
      "flowFrom": "Kerjakan",
      "flowTo": "Cek masuk akal"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek masuk akal",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Faktor dan Kelipatan. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Cek masuk akal",
      "flowTo": "Simpulkan"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Simpulkan",
      "stepDesc": "Simpulkan ide utama Faktor dan Kelipatan dengan kalimatmu sendiri. Sebutkan cara yang kamu pakai dan mengapa cara itu membantu. Jelaskan kepada teman seolah-olah kamu guru kecil. Simpulan yang jelas menandakan konsepnya sudah dipahami.",
      "icon": "💬",
      "flowFrom": "Simpulkan",
      "flowTo": "Main"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Main",
      "stepDesc": "Latih lagi di tahap Concrete, Picture, lalu Abstract untuk Faktor dan Kelipatan. Mulai dari benda nyata, lanjut ke diagram, baru ke lambang angka. Ulangi sampai kamu bisa menjelaskan tanpa melihat contoh. Bermain sambil berlatih membuat konsepnya melekat lebih lama.",
      "icon": "🎮",
      "flowFrom": "Main",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "FAKTOR",
      "emoji": "➗",
      "countNum": 12,
      "countWord": "pembagi",
      "suara": "Faktor = pembagi habis. 1 kali 12, 2 kali 6, 3 kali 4. Juga 4 kali 3, 6 kali 2, 12 kali 1. Ingat: 1×12; 2×6; daftar. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Faktor dan Kelipatan.",
      "teksVisual": "➗ FAKTOR: pembagi"
    },
    {
      "judul": "1–12",
      "emoji": "📋",
      "countNum": 6,
      "countWord": "banyak",
      "suara": "Faktor 12 ada 6 bilangan. Pada Faktor dan Kelipatan, cocokkan gambar “1–12” dengan artinya (banyak), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Faktor dan Kelipatan.",
      "teksVisual": "📋 1–12: banyak"
    },
    {
      "judul": "BUKAN 5",
      "emoji": "🚫",
      "countNum": 5,
      "countWord": "sisa 2",
      "suara": "BUKAN 5 — sisa 2. Pada Faktor dan Kelipatan, cocokkan gambar “BUKAN 5” dengan artinya (sisa 2), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Faktor dan Kelipatan.",
      "teksVisual": "🚫 BUKAN 5: sisa 2"
    },
    {
      "judul": "FAKTOR 20",
      "emoji": "2️⃣",
      "countNum": 20,
      "countWord": "1…20",
      "suara": "FAKTOR 20 — 1…20. Faktor 20: 1, 2, 4, 5, 10, 20. 4 kali 5 sama dengan 20. Ingat: faktor 20; 4×5; habis. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Faktor dan Kelipatan.",
      "teksVisual": "2️⃣ FAKTOR 20: 1…20"
    },
    {
      "judul": "KELIPATAN",
      "emoji": "📶",
      "countNum": 2,
      "countWord": "×1,×2,…",
      "suara": "Hasil kali berulang. Kelipatan 5 lebih dari 17 dan kurang dari 35. Yaitu 20, 25, dan 30. Ingat: >17 <35; 20,25,30; rentang. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Faktor dan Kelipatan.",
      "teksVisual": "📶 KELIPATAN: ×1,×2,…"
    },
    {
      "judul": "2,4,6,8",
      "emoji": "🔵",
      "countNum": 8,
      "countWord": "hari-4",
      "suara": "2,4,6,8 — hari-4. Pada Faktor dan Kelipatan, cocokkan gambar “2,4,6,8” dengan artinya (hari-4), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Faktor dan Kelipatan.",
      "teksVisual": "🔵 2,4,6,8: hari-4"
    },
    {
      "judul": "3,6,9,…",
      "emoji": "🟢",
      "countNum": 3,
      "countWord": "Slamet",
      "suara": "3,6,9,… — Slamet. Pada Faktor dan Kelipatan, cocokkan gambar “3,6,9,…” dengan artinya (Slamet), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Faktor dan Kelipatan.",
      "teksVisual": "🟢 3,6,9,…: Slamet"
    },
    {
      "judul": "RENTANG",
      "emoji": "📏",
      "countNum": 5,
      "countWord": "17–35",
      "suara": "RENTANG — 17–35. Pada Faktor dan Kelipatan, cocokkan gambar “RENTANG” dengan artinya (17–35), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Faktor dan Kelipatan.",
      "teksVisual": "📏 RENTANG: 17–35"
    },
    {
      "judul": "CERITA",
      "emoji": "📖",
      "countNum": 10,
      "countWord": "beras",
      "suara": "Faktor 10 = cara bagi beras. Pada Faktor dan Kelipatan, cocokkan gambar “CERITA” dengan artinya (beras), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Faktor dan Kelipatan.",
      "teksVisual": "📖 CERITA: beras"
    },
    {
      "judul": "SELESAI",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "bab 1",
      "suara": "SELESAI — bab 1. Pada Faktor dan Kelipatan, cocokkan gambar “SELESAI” dengan artinya (bab 1), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Faktor dan Kelipatan.",
      "teksVisual": "✅ SELESAI: bab 1"
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "faktor-koleksi",
      "title": "Bagi Pensil Jadi Faktor",
      "bookReference": "hlm. 48 (12 pensil)",
      "objective": "Pakai Pasangan Faktor: Faktor datang berpasangan hasil kali bilangan itu. Latihan: Mengenali pasangan faktor dari benda..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pasangan Faktor: Faktor datang berpasangan hasil kali bilangan itu.",
      "voiceGuide": "Pasangan Faktor. Faktor datang berpasangan hasil kali bilangan itu.",
      "emoji": "✏️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "daftar-faktor",
      "title": "Pilih Daftar Faktor",
      "bookReference": "hlm. 48–49",
      "objective": "Pakai Pasangan Faktor: Faktor datang berpasangan hasil kali bilangan itu. Latihan: Memilih daftar faktor benar..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pasangan Faktor: Faktor datang berpasangan hasil kali bilangan itu.",
      "voiceGuide": "Pasangan Faktor. Faktor datang berpasangan hasil kali bilangan itu.",
      "emoji": "📋",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-faktor",
      "title": "Pilah: Faktor atau Bukan",
      "bookReference": "hlm. 49 (mengapa 5 bukan faktor 12)",
      "objective": "Pakai Pasangan Faktor: Faktor datang berpasangan hasil kali bilangan itu. Latihan: Memilah kandidat..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pasangan Faktor: Faktor datang berpasangan hasil kali bilangan itu.",
      "voiceGuide": "Pasangan Faktor. Faktor datang berpasangan hasil kali bilangan itu.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-faktor",
      "title": "Jodohkan Bilangan dan Faktor",
      "bookReference": "hlm. 49–50",
      "objective": "Pakai Pasangan Faktor: Faktor datang berpasangan hasil kali bilangan itu. Latihan: Menjodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pasangan Faktor: Faktor datang berpasangan hasil kali bilangan itu.",
      "voiceGuide": "Pasangan Faktor. Faktor datang berpasangan hasil kali bilangan itu.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "memory-faktor",
      "title": "Memori Faktor",
      "bookReference": "hlm. 49",
      "objective": "Memori.. Ingat Pasangan Faktor. (Pasangan Faktor)",
      "mechanicDescription": "Tiga ronde. Gunakan Pasangan Faktor.",
      "voiceGuide": "Pasangan Faktor. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-faktor",
      "title": "Ketuk Faktor yang Diminta",
      "bookReference": "hlm. 48–49",
      "objective": "Mengetuk faktor.. Ingat Pasangan Faktor. (Pasangan Faktor)",
      "mechanicDescription": "Tiga ronde. Gunakan Pasangan Faktor.",
      "voiceGuide": "Pasangan Faktor. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-faktor",
      "title": "Ketuk Semua Faktor",
      "bookReference": "hlm. 49",
      "objective": "Memilih semua faktor.. Ingat Pasangan Faktor. (Pasangan Faktor)",
      "mechanicDescription": "Tiga ronde. Gunakan Pasangan Faktor.",
      "voiceGuide": "Pasangan Faktor. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "kelipatan-cerita",
      "title": "Cerita Kelipatan",
      "bookReference": "hlm. 50–52 (Karel, Andi)",
      "objective": "Soal cerita kelipatan.. Ingat Pasangan Faktor. (Pasangan Faktor)",
      "mechanicDescription": "Tiga ronde. Gunakan Pasangan Faktor.",
      "voiceGuide": "Pasangan Faktor. Mainkan dengan teliti.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "isi-kelipatan",
      "title": "Lengkapi Deret Kelipatan",
      "bookReference": "hlm. 50–51",
      "objective": "Mengisi bilangan hilang.. Ingat Pasangan Faktor. (Pasangan Faktor)",
      "mechanicDescription": "Tiga ronde. Gunakan Pasangan Faktor.",
      "voiceGuide": "Pasangan Faktor. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-kelipatan",
      "title": "Urutkan Kelipatan",
      "bookReference": "hlm. 51–52",
      "objective": "Mengurutkan.. Ingat Pasangan Faktor. (Pasangan Faktor)",
      "mechanicDescription": "Tiga ronde. Gunakan Pasangan Faktor.",
      "voiceGuide": "Pasangan Faktor. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "faktor-pasangan",
      "title": "Pasangan Faktor Diagram",
      "bookReference": "hlm. 48–49",
      "objective": "Pakai Kelipatan Lompat Hitung: Kelipatan = hasil lompat tetap. Latihan: Melengkapi f × ? = n..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Kelipatan Lompat Hitung: Kelipatan = hasil lompat tetap.",
      "voiceGuide": "Kelipatan Lompat Hitung. Kelipatan = hasil lompat tetap.",
      "diagramType": "factor-pair",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "faktor-model",
      "title": "Model Array Faktor",
      "bookReference": "hlm. 48",
      "objective": "Pakai Kelipatan Lompat Hitung: Kelipatan = hasil lompat tetap. Latihan: Array baris×kolom = n..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Kelipatan Lompat Hitung: Kelipatan = hasil lompat tetap.",
      "voiceGuide": "Kelipatan Lompat Hitung. Kelipatan = hasil lompat tetap.",
      "diagramType": "factor-array",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-faktor-p",
      "title": "Jodohkan Model Faktor",
      "bookReference": "hlm. 49",
      "objective": "Pakai Kelipatan Lompat Hitung: Kelipatan = hasil lompat tetap. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Kelipatan Lompat Hitung: Kelipatan = hasil lompat tetap.",
      "voiceGuide": "Kelipatan Lompat Hitung. Kelipatan = hasil lompat tetap.",
      "diagramType": "factor-match",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memory-faktor-p",
      "title": "Memori Model Faktor",
      "bookReference": "hlm. 49",
      "objective": "Pakai Kelipatan Lompat Hitung: Kelipatan = hasil lompat tetap. Latihan: Memori..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Kelipatan Lompat Hitung: Kelipatan = hasil lompat tetap.",
      "voiceGuide": "Kelipatan Lompat Hitung. Kelipatan = hasil lompat tetap.",
      "diagramType": "factor-mem",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-faktor",
      "title": "Tabel Faktor",
      "bookReference": "hlm. 49",
      "objective": "Isi pasangan.. Ingat Kelipatan Lompat Hitung. (Kelipatan Lompat Hitung)",
      "mechanicDescription": "Tiga tabel. Gunakan Kelipatan Lompat Hitung.",
      "voiceGuide": "Kelipatan Lompat Hitung. Mainkan dengan teliti.",
      "diagramType": "factor-table",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-faktor-p",
      "title": "Ketuk Semua Faktor (Label)",
      "bookReference": "hlm. 49",
      "objective": "Ketuk semua.. Ingat Kelipatan Lompat Hitung. (Kelipatan Lompat Hitung)",
      "mechanicDescription": "Tiga ronde. Gunakan Kelipatan Lompat Hitung.",
      "voiceGuide": "Kelipatan Lompat Hitung. Mainkan dengan teliti.",
      "diagramType": "factor-select",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-faktor-p",
      "title": "Pilah Label Faktor",
      "bookReference": "hlm. 49",
      "objective": "Pilah.. Ingat Kelipatan Lompat Hitung. (Kelipatan Lompat Hitung)",
      "mechanicDescription": "Tiga ronde. Gunakan Kelipatan Lompat Hitung.",
      "voiceGuide": "Kelipatan Lompat Hitung. Mainkan dengan teliti.",
      "diagramType": "factor-sort",
      "numberA": 3,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "deret-kelipatan",
      "title": "Deret Kelipatan Gambar",
      "bookReference": "hlm. 50–51",
      "objective": "Lengkapi deret.. Ingat Kelipatan Lompat Hitung. (Kelipatan Lompat Hitung)",
      "mechanicDescription": "Tiga ronde. Gunakan Kelipatan Lompat Hitung.",
      "voiceGuide": "Kelipatan Lompat Hitung. Mainkan dengan teliti.",
      "diagramType": "mult-seq",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "hari-kelipatan",
      "title": "Hari ke-n Karel",
      "bookReference": "hlm. 50–51",
      "objective": "Menghitung kelipatan hari.. Ingat Kelipatan Lompat Hitung. (Kelipatan Lompat Hitung)",
      "mechanicDescription": "Tiga ronde. Gunakan Kelipatan Lompat Hitung.",
      "voiceGuide": "Kelipatan Lompat Hitung. Mainkan dengan teliti.",
      "diagramType": "day-mult",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "bukan-faktor",
      "title": "Mengapa Bukan Faktor",
      "bookReference": "hlm. 49",
      "objective": "Memilih alasan sisa ≠ 0.. Ingat Kelipatan Lompat Hitung. (Kelipatan Lompat Hitung)",
      "mechanicDescription": "Tiga ronde. Gunakan Kelipatan Lompat Hitung.",
      "voiceGuide": "Kelipatan Lompat Hitung. Mainkan dengan teliti.",
      "diagramType": "why-not",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "pilih-faktor",
      "title": "Pilih Daftar Faktor Angka",
      "bookReference": "hlm. 49–50",
      "objective": "Pakai Keterbagian: Faktor membagi habis bilangan. Latihan: Memilih daftar..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Keterbagian: Faktor membagi habis bilangan.",
      "voiceGuide": "Keterbagian. Faktor membagi habis bilangan.",
      "symbolLarge": "1,2,3,4,6,12",
      "wordLarge": "FAKTOR",
      "mathNotation": "daftar"
    },
    {
      "stage": "Abstract",
      "gameType": "pilih-kelipatan",
      "title": "Pilih Kelipatan",
      "bookReference": "hlm. 51–52",
      "objective": "Pakai Keterbagian: Faktor membagi habis bilangan. Latihan: Memilih bilangan kelipatan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Keterbagian: Faktor membagi habis bilangan.",
      "voiceGuide": "Keterbagian. Faktor membagi habis bilangan.",
      "symbolLarge": "2,4,6,8",
      "wordLarge": "KELIPATAN",
      "mathNotation": "deret"
    },
    {
      "stage": "Abstract",
      "gameType": "board-faktor",
      "title": "Banyak Faktor di Papan",
      "bookReference": "hlm. 49",
      "objective": "Pakai Keterbagian: Faktor membagi habis bilangan. Latihan: Menulis banyak faktor..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Keterbagian: Faktor membagi habis bilangan.",
      "voiceGuide": "Keterbagian. Faktor membagi habis bilangan.",
      "symbolLarge": "6",
      "wordLarge": "PAPAN",
      "mathNotation": "banyak"
    },
    {
      "stage": "Abstract",
      "gameType": "isi-hilang",
      "title": "Angka Hilang Kelipatan",
      "bookReference": "hlm. 51",
      "objective": "Pakai Keterbagian: Faktor membagi habis bilangan. Latihan: Melengkapi deret angka..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Keterbagian: Faktor membagi habis bilangan.",
      "voiceGuide": "Keterbagian. Faktor membagi habis bilangan.",
      "symbolLarge": "…",
      "wordLarge": "HILANG",
      "mathNotation": "deret"
    },
    {
      "stage": "Abstract",
      "gameType": "match-faktor-q",
      "title": "Jodohkan n dan Faktor",
      "bookReference": "hlm. 49–50",
      "objective": "Jodohkan.. Ingat Keterbagian. (Keterbagian)",
      "mechanicDescription": "Tiga ronde. Gunakan Keterbagian.",
      "voiceGuide": "Keterbagian. Mainkan dengan teliti.",
      "symbolLarge": "20",
      "wordLarge": "JODOH",
      "mathNotation": "n • faktor"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-faktor-q",
      "title": "Memori n dan Faktor",
      "bookReference": "hlm. 49",
      "objective": "Memori.. Ingat Keterbagian. (Keterbagian)",
      "mechanicDescription": "Tiga ronde. Gunakan Keterbagian.",
      "voiceGuide": "Keterbagian. Mainkan dengan teliti.",
      "symbolLarge": "24",
      "wordLarge": "MEMORI",
      "mathNotation": "n • faktor"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-i",
      "title": "Benar atau Salah: Faktor",
      "bookReference": "hlm. 48–52",
      "objective": "Menilai pernyataan.. Ingat Keterbagian. (Keterbagian)",
      "mechanicDescription": "Dua ronde. Gunakan Keterbagian.",
      "voiceGuide": "Keterbagian. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-i",
      "title": "Detektif Faktor Kelipatan",
      "bookReference": "hlm. 50–52",
      "objective": "Petunjuk → bilangan.. Ingat Keterbagian. (Keterbagian)",
      "mechanicDescription": "Empat soal. Gunakan Keterbagian.",
      "voiceGuide": "Keterbagian. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-i",
      "title": "Peta Konsep Faktor Kelipatan",
      "bookReference": "hlm. 48–51",
      "objective": "Mengisi kotak.. Ingat Keterbagian. (Keterbagian)",
      "mechanicDescription": "Satu peta. Gunakan Keterbagian.",
      "voiceGuide": "Keterbagian. Mainkan dengan teliti.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-faktor-q",
      "title": "Cerita Angka Faktor",
      "bookReference": "hlm. 50–52",
      "objective": "Soal cerita.. Ingat Keterbagian. (Keterbagian)",
      "mechanicDescription": "Tiga ronde. Gunakan Keterbagian.",
      "voiceGuide": "Keterbagian. Mainkan dengan teliti.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "🧩",
      "nama": "Faktor",
      "isi": "Pembagi dengan sisa 0.",
      "suara": "Faktor membagi habis."
    },
    {
      "ikon": "🌍",
      "nama": "Pasangan Faktor",
      "isi": "Faktor datang berpasangan hasil kali bilangan itu.",
      "suara": "Pasangan Faktor. Faktor datang berpasangan hasil kali bilangan itu."
    },
    {
      "ikon": "🌍",
      "nama": "Kelipatan Lompat Hitung",
      "isi": "Kelipatan = hasil lompat tetap.",
      "suara": "Kelipatan Lompat Hitung. Kelipatan = hasil lompat tetap."
    },
    {
      "ikon": "🌍",
      "nama": "Keterbagian",
      "isi": "Faktor membagi habis bilangan.",
      "suara": "Keterbagian. Faktor membagi habis bilangan."
    }
  ],
  "poinSuara": "Ingat: Pasangan Faktor, Kelipatan Lompat Hitung, Keterbagian.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Faktor",
        "warna": "#DDD6FE"
      },
      {
        "teks": "Pasangan",
        "warna": "#BBF7D0"
      },
      {
        "teks": "Kelipatan",
        "warna": "#BFDBFE"
      },
      {
        "teks": "Cek sisa",
        "warna": "#FDE68A"
      }
    ]
  },
  "rumah": "Ayo Mencoba: terapkan Pasangan Faktor pada satu soal nyata di rumah.",
  "refleksi": [
    "Bagaimana Pasangan Faktor membantumu?",
    "Kapan memakai Kelipatan Lompat Hitung?",
    "Apa bedanya dengan hanya menghafal tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Factor Pairs",
      "namaId": "Pasangan Faktor",
      "asal": "Array model",
      "ringkas": "Faktor datang berpasangan hasil kali bilangan itu.",
      "tahap": [
        "Story",
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Skip Counting Multiples",
      "namaId": "Kelipatan Lompat Hitung",
      "asal": "Van de Walle",
      "ringkas": "Kelipatan = hasil lompat tetap.",
      "tahap": [
        "Mind",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Divisibility",
      "namaId": "Keterbagian",
      "asal": "Number sense",
      "ringkas": "Faktor membagi habis bilangan.",
      "tahap": [
        "Infografis",
        "Abstract"
      ]
    }
  ]
};

export const SUB_BAB_K4B1: SubBabNaskah[] = [SUB_A41, SUB_B41, SUB_C41, SUB_D41, SUB_E41, SUB_F41, SUB_G41, SUB_H41, SUB_I41];
export const semuaAdeganK4B1 = SUB_BAB_K4B1.flatMap((s) => s.videos.flatMap((v) => v.adegan));
