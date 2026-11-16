/**
 * Naskah — poles kerapatan setara K5B4.
 * Metode luar dianyam ketukan per ketukan.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K4B1KA_META = {
  "chapterId": "k4-mat-bab1-kedua",
  "phaseCode": "FASE_B",
  "grade": 4,
  "subjectLabel": "MATEMATIKA - KELAS 4 SD",
  "title": "BAB 1 (MODUL KEDUA): BILANGAN CACAH HINGGA 10.000",
  "silabusElemen": "🌈 Fase B • Elemen Bilangan: Membaca–Menulis, Nilai Tempat, Banding–Urut, Komposisi–Dekomposisi sampai 10.000, serta Penjumlahan–Pengurangan sampai 1.000, Perkalian–Pembagian sampai 100, serta Faktor dan Kelipatan (Kelas 4 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_KA41: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Membaca dan Menulis Bilangan)",
  "fullTitle": "Sub-Bab A: Menyebut dan Menuliskan Bilangan sampai 10.000",
  "targetDescription": "Siswa menyebut dan menuliskan bilangan empat angka sampai sepuluh ribu, termasuk bilangan yang punya angka nol di tengah atau di ujung. Siswa merakit bilangan dari kemasan bertingkat, mengisi papan ribuan sampai satuan, dan memahami bahwa sepuluh dus bernilai satu peti. Cara yang dipakai: Kemasan Bertingkat, Papan Empat Tempat, dan Nol Penjaga Tempat.",
  "secondaryBg": "#DCFCE7",
  "secondaryBorder": "#16A34A",
  "secondaryText": "#14532D",
  "silabus": {
    "teksSuara": "Hari ini kita berlatih menyebut dan menuliskan bilangan empat angka, sampai sepuluh ribu. Kita merakit bilangan dari peti, dus, bungkus, dan benda lepas. Lalu kita mengisi papan ribuan, ratusan, puluhan, dan satuan. Angka nol tidak disebut saat membaca, tetapi tetap ditulis supaya tempatnya terjaga. Ada tiga cara yang kita pakai: kemasan bertingkat, papan empat tempat, dan nol penjaga tempat. Perjalanan kita lewat enam tahap: cerita, peta pikiran, infografis, benda berwarna, diagram, dan simbol.",
    "cp": "Siswa menyebut, menulis, membandingkan, dan menyusun urutan bilangan sampai sepuluh ribu. Sub-bab ini memusatkan perhatian pada cara menyebut dan menulis bilangan.",
    "referensi": "Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 1 Sub-Bab A hlm. 4–11)."
  },
  "videos": [],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal pelan-pelan. Tandai bilangan yang harus disebut atau ditulis. Ucapkan ulang pertanyaannya dengan kata-katamu sendiri sebelum mulai bekerja.",
      "icon": "❓",
      "flowFrom": "Pahami soal",
      "flowTo": "Kemasan bertingkat"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Kemasan bertingkat",
      "stepDesc": "Peti bernilai seribu, dus seratus, bungkus sepuluh, dan benda lepas satu. Dengan kemasan ini, bilangan empat angka bisa dirakit dan isinya terlihat jelas.",
      "icon": "🧭",
      "flowFrom": "Kemasan bertingkat",
      "flowTo": "Papan empat tempat"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Papan empat tempat",
      "stepDesc": "Papan punya empat kolom berurutan. Dari kiri: ribuan, ratusan, puluhan, lalu satuan. Letak sebuah angka menentukan nilainya.",
      "icon": "🛠️",
      "flowFrom": "Papan empat tempat",
      "flowTo": "Nol penjaga tempat"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Nol penjaga tempat",
      "stepDesc": "Tempat yang kosong diisi angka nol. Saat disebut, nol dilewati. Saat ditulis, nol harus hadir supaya angka lain tidak bergeser.",
      "icon": "✨",
      "flowFrom": "Nol penjaga tempat",
      "flowTo": "Kerjakan"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Kerjakan",
      "stepDesc": "Kerjakan satu langkah demi satu langkah. Rakit atau isi papan lebih dulu, baru sebut atau tulis bilangannya. Bila ragu, kembali ke papan.",
      "icon": "✏️",
      "flowFrom": "Kerjakan",
      "flowTo": "Cek masuk akal"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek masuk akal",
      "stepDesc": "Periksa hasilnya. Apakah angkanya ada empat? Apakah kata ribu sesuai dengan angka di tempat ribuan? Bila tidak, cari langkah yang meleset.",
      "icon": "✅",
      "flowFrom": "Cek masuk akal",
      "flowTo": "Simpulkan"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Simpulkan",
      "stepDesc": "Rangkum dengan kata-katamu: bagaimana cara menyebut dan menulis bilangan empat angka, dan apa tugas angka nol.",
      "icon": "💬",
      "flowFrom": "Simpulkan",
      "flowTo": "Main"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Main",
      "stepDesc": "Lanjutkan ke permainan benda berwarna, diagram, dan simbol. Ulangi sampai lancar tanpa melihat petunjuk.",
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
      "suara": "Angka di ujung kiri berada di tempat ribuan. Satu peti bernilai seribu.",
      "teksVisual": "🟣 Ujung kiri adalah ribuan. Satu peti bernilai seribu."
    },
    {
      "judul": "RATUSAN",
      "emoji": "🟢",
      "countNum": 100,
      "countWord": "satu dus / seratus",
      "suara": "Tempat kedua dari kiri adalah ratusan. Satu dus bernilai seratus.",
      "teksVisual": "🟢 Tempat kedua adalah ratusan. Satu dus bernilai seratus."
    },
    {
      "judul": "PULUHAN",
      "emoji": "🔵",
      "countNum": 10,
      "countWord": "satu bungkus / sepuluh",
      "suara": "Tempat ketiga adalah puluhan. Satu bungkus bernilai sepuluh.",
      "teksVisual": "🔵 Tempat ketiga adalah puluhan. Satu bungkus bernilai sepuluh."
    },
    {
      "judul": "SATUAN",
      "emoji": "🔴",
      "countNum": 1,
      "countWord": "benda lepas",
      "suara": "Tempat terakhir adalah satuan. Satu benda lepas bernilai satu.",
      "teksVisual": "🔴 SATUAN: benda lepas"
    },
    {
      "judul": "BACA DARI KIRI",
      "emoji": "⬅️",
      "countNum": 5274,
      "countWord": "lima ribu dua ratus tujuh puluh empat",
      "suara": "Mulai dari ribuan, lalu ratusan, puluhan, dan satuan. Contohnya lima ribu dua ratus tujuh puluh empat.",
      "teksVisual": "⬅️ BACA DARI KIRI: lima ribu dua ratus tujuh puluh empat"
    },
    {
      "judul": "NOL TIDAK DISEBUT",
      "emoji": "⭕",
      "countNum": 8004,
      "countWord": "delapan ribu empat",
      "suara": "Delapan ribu empat. Ratusan dan puluhannya nol, jadi tidak disebut.",
      "teksVisual": "⭕ Delapan ribu empat. Nol dilewati saat disebut."
    },
    {
      "judul": "SERIBU",
      "emoji": "1️⃣",
      "countNum": 1830,
      "countWord": "seribu delapan ratus tiga puluh",
      "suara": "Angka satu di tempat ribuan disebut seribu, bukan satu ribu.",
      "teksVisual": "1️⃣ SERIBU: seribu delapan ratus tiga puluh"
    },
    {
      "judul": "NOL MENJAGA TEMPAT",
      "emoji": "✍️",
      "countNum": 6038,
      "countWord": "nol tetap ditulis",
      "suara": "Saat menulis, tempat yang kosong tetap diisi angka nol supaya angka lain tidak bergeser.",
      "teksVisual": "✍️ Saat ditulis, nol menjaga tempat yang kosong."
    },
    {
      "judul": "SEPULUH DUS = SATU PETI",
      "emoji": "🔄",
      "countNum": 10,
      "countWord": "penukaran",
      "suara": "Sepuluh dus digabung menjadi satu peti.",
      "teksVisual": "🔄 SEPULUH DUS = SATU PETI: penukaran"
    },
    {
      "judul": "SAMPAI 10.000",
      "emoji": "🔟",
      "countNum": 10000,
      "countWord": "sepuluh ribu",
      "suara": "Bilangan terbesar pada bab ini adalah sepuluh ribu.",
      "teksVisual": "🔟 SAMPAI 10.000: sepuluh ribu"
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "build-with-exchange",
      "title": "Rakit Bilangan dari Kemasan",
      "bookReference": "Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 4–6 (acuan topik)",
      "objective": "Merakit bilangan empat angka dari peti, dus, bungkus, dan benda lepas.",
      "mechanicDescription": "Tiga ronde, tiap ronde dua bilangan. Sepuluh kemasan kecil otomatis menyatu menjadi satu kemasan yang lebih besar. Tekan Periksa untuk mengecek.",
      "voiceGuide": "Rakit sesuai bilangan yang kamu dengar, lalu periksa.",
      "emoji": "📦",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "count-packages",
      "title": "Hitung Isi Semua Kemasan",
      "bookReference": "Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 5–6 (acuan topik)",
      "objective": "Menghitung isi tiap tingkat kemasan, lalu memilih angka yang sesuai.",
      "mechanicDescription": "Tiga ronde, dua soal. Pilih satu dari tiga angka.",
      "voiceGuide": "Hitung peti dulu, lalu dus, bungkus, dan benda lepas.",
      "emoji": "🔢",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-packages",
      "title": "Masukkan Kemasan ke Kotak Nilai",
      "bookReference": "Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 5–6 (acuan topik)",
      "objective": "Memilah kelompok kemasan ke kotak ribuan, ratusan, puluhan, atau satuan.",
      "mechanicDescription": "Tiga ronde, enam kelompok, empat kotak.",
      "voiceGuide": "Tiap jenis kemasan punya kotak nilainya sendiri.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-package-number",
      "title": "Pasangkan Kumpulan dengan Angka",
      "bookReference": "Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 6 (acuan topik)",
      "objective": "Memasangkan kumpulan kemasan dengan angka yang sesuai.",
      "mechanicDescription": "Tiga ronde, tiga pasangan.",
      "voiceGuide": "Hitung tiap tingkat sebelum memasangkan.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "memory-package-number",
      "title": "Balik Kartu: Kumpulan dan Angka",
      "bookReference": "Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 6–11 (acuan topik)",
      "objective": "Mengingat letak kartu kumpulan dan kartu angka yang sama.",
      "mechanicDescription": "Tiga ronde, empat pasang kartu.",
      "voiceGuide": "Balik dua kartu, cari yang sama.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-read-package",
      "title": "Ketuk Kumpulan yang Disebut",
      "bookReference": "Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 6 (acuan topik)",
      "objective": "Mendengar sebuah bilangan, lalu mengetuk kumpulan yang sesuai.",
      "mechanicDescription": "Tiga ronde, tiga kumpulan yang mirip.",
      "voiceGuide": "Perhatikan tempat nol dan urutan kemasannya.",
      "emoji": "👆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-packages",
      "title": "Ketuk Semua yang Sesuai Perintah",
      "bookReference": "Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 9–11 (acuan topik)",
      "objective": "Menemukan semua kumpulan yang memenuhi perintah tentang angka nol.",
      "mechanicDescription": "Tiga ronde, empat kumpulan.",
      "voiceGuide": "Yang sesuai bisa lebih dari satu.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "read-package-words",
      "title": "Pilih Bacaan Kumpulan",
      "bookReference": "Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 6–9 (acuan topik)",
      "objective": "Memilih cara menyebut bilangan dari kumpulan kemasan.",
      "mechanicDescription": "Tiga ronde, dua soal.",
      "voiceGuide": "Hitung dulu, lalu pilih bacaannya. Nol tidak disebut.",
      "emoji": "🗣️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "board-from-package",
      "title": "Isi Papan dari Kumpulan",
      "bookReference": "Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 6 (acuan topik)",
      "objective": "Mengisi papan empat tempat berdasarkan kumpulan kemasan.",
      "mechanicDescription": "Tiga ronde, dua soal.",
      "voiceGuide": "Peti untuk ribuan, dus untuk ratusan.",
      "emoji": "🗂️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "exchange-packages",
      "title": "Gabungkan Sepuluh Jadi Satu",
      "bookReference": "Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 5–6 (acuan topik)",
      "objective": "Memahami bahwa sepuluh kemasan kecil dapat digabung menjadi satu kemasan besar.",
      "mechanicDescription": "Tiga ronde, dua soal pilihan.",
      "voiceGuide": "Sepuluh yang kecil sama dengan satu yang lebih besar.",
      "emoji": "🔄",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "count-blocks",
      "title": "Baca Bilangan dari Blok",
      "bookReference": "Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 6 (acuan topik)",
      "objective": "Membaca gambar blok menjadi angka empat tempat.",
      "mechanicDescription": "Tiga ronde, dua soal.",
      "voiceGuide": "Kubus ungu untuk ribuan, lempeng hijau untuk ratusan.",
      "diagramType": "blocks-count",
      "numberA": 4,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "board-from-blocks",
      "title": "Isi Papan dari Gambar Blok",
      "bookReference": "Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 6 dan 14 (acuan topik)",
      "objective": "Mengisi papan empat tempat dari gambar blok.",
      "mechanicDescription": "Tiga ronde, dua soal.",
      "voiceGuide": "Hitung tiap jenis blok, lalu isi papan.",
      "diagramType": "blocks-board",
      "numberA": 4,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "fill-block-table",
      "title": "Lengkapi Tabel dari Blok",
      "bookReference": "Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 16 (acuan topik)",
      "objective": "Mengisi tabel empat kolom dari gambar blok.",
      "mechanicDescription": "Tiga tabel, tiga baris.",
      "voiceGuide": "Satu baris, satu gambar blok.",
      "diagramType": "blocks-table",
      "numberA": 4,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "match-block-number",
      "title": "Pasangkan Blok dengan Angka",
      "bookReference": "Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 6 (acuan topik)",
      "objective": "Memasangkan gambar blok dengan angka yang sesuai.",
      "mechanicDescription": "Tiga ronde, tiga pasangan.",
      "voiceGuide": "Hitung dulu sebelum memasangkan.",
      "diagramType": "blocks-match",
      "numberA": 4,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memory-block-word",
      "title": "Balik Kartu: Blok dan Kata",
      "bookReference": "Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 6–9 (acuan topik)",
      "objective": "Mengingat pasangan gambar blok dan kata bilangan.",
      "mechanicDescription": "Tiga ronde, empat pasang kartu.",
      "voiceGuide": "Bacalah blok menjadi kata, lalu cari kartunya.",
      "diagramType": "blocks-memory",
      "numberA": 4,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "tap-block-read",
      "title": "Ketuk Blok yang Disebut",
      "bookReference": "Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 6–9 (acuan topik)",
      "objective": "Mengetuk gambar blok yang sesuai dengan bilangan yang disebut.",
      "mechanicDescription": "Tiga ronde, dua pertanyaan.",
      "voiceGuide": "Cari gambar yang kosong di tempat yang tepat.",
      "diagramType": "blocks-tap",
      "numberA": 4,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "number-line-read",
      "title": "Cari Bilangan pada Garis",
      "bookReference": "Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 4–11 (acuan topik)",
      "objective": "Menemukan bilangan yang disebutkan pada garis bilangan.",
      "mechanicDescription": "Tiga ronde, dua soal.",
      "voiceGuide": "Lihat dulu loncatan tiap titik.",
      "diagramType": "number-line",
      "numberA": 4,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-blocks",
      "title": "Ketuk Semua Blok yang Sesuai",
      "bookReference": "Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 9–11 (acuan topik)",
      "objective": "Memilih semua gambar blok yang memenuhi syarat angka.",
      "mechanicDescription": "Tiga ronde, empat gambar.",
      "voiceGuide": "Periksa tiap gambar satu per satu.",
      "diagramType": "blocks-select",
      "numberA": 4,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-zero-blocks",
      "title": "Kelompokkan: Ada Nol atau Tidak",
      "bookReference": "Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 6–9 (acuan topik)",
      "objective": "Mengelompokkan gambar blok menurut ada atau tidaknya angka nol.",
      "mechanicDescription": "Tiga ronde, enam gambar.",
      "voiceGuide": "Tempat yang kosong berarti angka nol.",
      "diagramType": "blocks-sort",
      "numberA": 4,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "complete-block-sentence",
      "title": "Lengkapi Kalimat tentang Blok",
      "bookReference": "Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 6–14 (acuan topik)",
      "objective": "Melengkapi kalimat tentang tempat dan nilai angka dari gambar blok.",
      "mechanicDescription": "Tiga gambar, tiga kalimat.",
      "voiceGuide": "Tiap bagian kosong punya satu jawaban yang tepat.",
      "diagramType": "blocks-sentence",
      "numberA": 4,
      "numberB": 3
    },
    {
      "stage": "Abstract",
      "gameType": "compose-four-cards",
      "title": "Tata Kartu Angka",
      "bookReference": "Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 5–8 (acuan topik)",
      "objective": "Menuliskan bilangan dari kata dengan menata empat kartu angka.",
      "mechanicDescription": "Tiga ronde, dua soal.",
      "voiceGuide": "Dengar kata bilangannya, lalu tata kartunya dari ribuan.",
      "symbolLarge": "5.127",
      "wordLarge": "TATA KARTU",
      "mathNotation": "kata → angka"
    },
    {
      "stage": "Abstract",
      "gameType": "read-number-choice",
      "title": "Pilih Bacaan yang Tepat",
      "bookReference": "Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 6–9 (acuan topik)",
      "objective": "Memilih cara menyebut sebuah bilangan empat angka.",
      "mechanicDescription": "Tiga ronde, dua soal.",
      "voiceGuide": "Mulai dari ribuan, dan lewati nol.",
      "symbolLarge": "6.184",
      "wordLarge": "BACA",
      "mathNotation": "angka → kata"
    },
    {
      "stage": "Abstract",
      "gameType": "write-on-board",
      "title": "Tulis Angka pada Papan",
      "bookReference": "Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 7–9 (acuan topik)",
      "objective": "Menuliskan bilangan dari kata ke papan empat tempat.",
      "mechanicDescription": "Tiga ronde, dua soal.",
      "voiceGuide": "Tempat yang tidak disebut diisi nol.",
      "symbolLarge": "7.415",
      "wordLarge": "TULIS",
      "mathNotation": "kata → angka"
    },
    {
      "stage": "Abstract",
      "gameType": "match-number-word",
      "title": "Pasangkan Angka dengan Bacaan",
      "bookReference": "Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 11 (acuan topik)",
      "objective": "Memasangkan angka dengan bacaannya.",
      "mechanicDescription": "Tiga ronde, tiga pasang.",
      "voiceGuide": "Baca tiap angka dari kiri ke kanan.",
      "symbolLarge": "5.604",
      "wordLarge": "PASANGKAN",
      "mathNotation": "angka • kata"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-number-word",
      "title": "Balik Kartu: Angka dan Kata",
      "bookReference": "Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 11 (acuan topik)",
      "objective": "Mengingat letak kartu angka dan kartu kata yang sama.",
      "mechanicDescription": "Tiga ronde, empat pasang kartu.",
      "voiceGuide": "Ingat letak kartu, lalu cocokkan.",
      "symbolLarge": "2.760",
      "wordLarge": "MEMORI",
      "mathNotation": "angka • kata"
    },
    {
      "stage": "Abstract",
      "gameType": "fill-reading-table",
      "title": "Lengkapi Tabel Bacaan",
      "bookReference": "Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 11 (acuan topik)",
      "objective": "Melengkapi tabel yang memasangkan bilangan dengan bacaannya.",
      "mechanicDescription": "Tiga tabel, empat baris.",
      "voiceGuide": "Satu kartu bacaan tidak dipakai.",
      "symbolLarge": "4.761",
      "wordLarge": "TABEL",
      "mathNotation": "bilangan • bacaan"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-reading",
      "title": "Benar atau Salah",
      "bookReference": "Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 4–11 (acuan topik)",
      "objective": "Menilai pernyataan tentang cara menyebut dan menulis bilangan.",
      "mechanicDescription": "Dua ronde, lima pernyataan.",
      "voiceGuide": "Baca pernyataan dengan teliti, lalu putuskan.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-number",
      "title": "Tebak Bilangan Rahasia",
      "bookReference": "Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 8–11 (acuan topik)",
      "objective": "Menemukan bilangan rahasia dari dua petunjuk.",
      "mechanicDescription": "Empat soal.",
      "voiceGuide": "Pakai kedua petunjuk sekaligus.",
      "symbolLarge": "?",
      "wordLarge": "TEBAK",
      "mathNotation": "dua petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "select-all-numbers",
      "title": "Ketuk Semua Angka yang Sesuai",
      "bookReference": "Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 9–11 (acuan topik)",
      "objective": "Memilih bilangan yang memenuhi syarat tentang angka pada tempat tertentu.",
      "mechanicDescription": "Tiga ronde, empat bilangan.",
      "voiceGuide": "Lihat angka pada tempat yang ditanyakan.",
      "symbolLarge": "✔✔",
      "wordLarge": "SEMUA SESUAI",
      "mathNotation": "syarat angka"
    },
    {
      "stage": "Abstract",
      "gameType": "build-number-sentence",
      "title": "Rangkai Kalimat Bilangan",
      "bookReference": "Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 6–9 (acuan topik)",
      "objective": "Merangkai kata menjadi kalimat yang benar tentang bilangan.",
      "mechanicDescription": "Empat kalimat.",
      "voiceGuide": "Satu kata tidak dipakai.",
      "symbolLarge": "Aa",
      "wordLarge": "RANGKAI",
      "mathNotation": "kalimat"
    }
  ],
  "poin": [
    {
      "ikon": "🟣",
      "nama": "Empat tempat",
      "isi": "ribuan, ratusan, puluhan, satuan",
      "suara": "Bilangan empat angka punya empat tempat, dari kiri ke kanan: ribuan, ratusan, puluhan, dan satuan."
    },
    {
      "ikon": "📦",
      "nama": "Kemasan bertingkat",
      "isi": "Peti seribu, dus seratus, bungkus sepuluh, benda lepas satu.",
      "suara": "Kemasan bertingkat. Peti seribu, dus seratus, bungkus sepuluh, dan benda lepas satu."
    },
    {
      "ikon": "🗂️",
      "nama": "Papan empat tempat",
      "isi": "Letak sebuah angka menentukan nilainya.",
      "suara": "Papan empat tempat. Letak sebuah angka menentukan nilainya."
    },
    {
      "ikon": "⭕",
      "nama": "Nol penjaga tempat",
      "isi": "Nol dilewati saat disebut, tetapi tetap ditulis.",
      "suara": "Nol penjaga tempat. Nol dilewati saat disebut, tetapi tetap ditulis."
    }
  ],
  "poinSuara": "Ingat: kemasan bertingkat, papan empat tempat, dan nol penjaga tempat.",
  "cara": {
    "suara": "Cara menyebutnya: mulai dari ribuan, turun ke ratusan, puluhan, lalu satuan. Tempat yang bernilai nol dilewati.",
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
  "rumah": "Ayo Mencoba: susun lima bilangan empat angka sesukamu pada papan di layar, lalu sebutkan satu per satu.",
  "refleksi": [
    "Tempat mana yang paling sering membuatmu ragu?",
    "Mengapa nol tetap ditulis walau tidak disebut?",
    "Apa yang kamu lakukan saat sebuah bilangan punya nol di tengah?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Kemasan Bertingkat",
      "namaId": "Peti, dus, bungkus, benda",
      "asal": "Rancangan IGIL",
      "ringkas": "Peti seribu, dus seratus, bungkus sepuluh, dan benda lepas satu membantu merakit bilangan empat angka.",
      "tahap": [
        "Story",
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Papan Empat Tempat",
      "namaId": "Ribuan sampai satuan",
      "asal": "Rancangan IGIL",
      "ringkas": "Letak sebuah angka menentukan nilainya.",
      "tahap": [
        "Mind",
        "Abstract",
        "Infografis"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Nol Penjaga Tempat",
      "namaId": "Nol dilewati, nol ditulis",
      "asal": "Rancangan IGIL",
      "ringkas": "Nol dilewati saat disebut, tetapi tetap ditulis agar angka lain tidak bergeser.",
      "tahap": [
        "Story",
        "Abstract"
      ]
    }
  ]
};
