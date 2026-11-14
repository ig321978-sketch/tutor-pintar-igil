/**
 * Naskah — rewrite mendalam setara K5B4.
 * Kelas 5 Bab 2 KPK–FPB — ketukan per ketukan.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K5B2_META = {
  "chapterId": "k5-mat-bab2",
  "phaseCode": "FASE_C",
  "grade": 5,
  "subjectLabel": "MATEMATIKA - KELAS 5 SD",
  "title": "BAB 2: KPK DAN FPB",
  "silabusElemen": "🌈 Fase C • Elemen Bilangan: Kelipatan, KPK, Faktor, FPB, serta Faktorisasi Prima (Kelas 5 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A52: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Kelipatan)",
  "fullTitle": "Sub-Bab A: Kelipatan",
  "targetDescription": "Siswa memahami kelipatan sebagai hasil lompat hitung bilangan sama besar, memeriksa habis dibagi, dan memakai tabel seratus sesuai Buku Siswa Kelas V Bab 2 Sub-Bab A.",
  "secondaryBg": "#FFEDD5",
  "secondaryBorder": "#EA580C",
  "secondaryText": "#7C2D12",
  "silabus": {
    "teksSuara": "Kita belajar kelipatan. Bayangkan melompat di garis bilangan dengan jarak sama: 3, 6, 9, 12. Itu kelipatan tiga. Kita cek juga apakah suatu bilangan habis dibagi, dan menandai di tabel seratus. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menentukan kelipatan suatu bilangan dan memeriksa keterbagian.",
    "referensi": "Buku Siswa Matematika Kelas V Kemendikbudristek (Bab 2 Sub-Bab A)."
  },
  "videos": [],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pilih bilangan",
      "stepDesc": "Baca soal Kelipatan dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Kelipatan bilangan berapa? Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa memahami kelipatan sebagai hasil lompat hitung bilangan sama besar, memeriksa habis dibagi, dan memakai tabel sera….",
      "icon": "❓",
      "flowFrom": "Pilih bilangan",
      "flowTo": "Lompat hitung"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Lompat hitung",
      "stepDesc": "Lompat jarak sama dari 0. Pada Kelipatan, langkah “Lompat hitung” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Lompat Hitung: Kelipatan didapat dengan melompat jarak sama di garis bilangan atau hitungan. Tabel Seratus: Tandai kelipatan pada tabel 1–100 untuk melihat pola…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🦘",
      "flowFrom": "Lompat hitung",
      "flowTo": "Buat daftar"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Buat daftar",
      "stepDesc": "Tulis kelipatan berurutan. Pada Kelipatan, langkah “Buat daftar” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Lompat Hitung: Kelipatan didapat dengan melompat jarak sama di garis bilangan atau hitungan. Tabel Seratus: Tandai kelipatan pada tabel 1–100 untuk melihat pola…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "📝",
      "flowFrom": "Buat daftar",
      "flowTo": "Cek sisa"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Cek sisa",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Kelipatan. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "➗",
      "flowFrom": "Cek sisa",
      "flowTo": "Tabel seratus"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Tabel seratus",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Kelipatan. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "▦",
      "flowFrom": "Tabel seratus",
      "flowTo": "Putuskan"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Putuskan",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Kelipatan. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Putuskan",
      "flowTo": "Cek masuk akal"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Cek masuk akal",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Kelipatan. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "🔍",
      "flowFrom": "Cek masuk akal",
      "flowTo": "Main"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Main",
      "stepDesc": "Latih lagi di tahap Concrete, Picture, lalu Abstract untuk Kelipatan. Mulai dari benda nyata, lanjut ke diagram, baru ke lambang angka. Ulangi sampai kamu bisa menjelaskan tanpa melihat contoh. Bermain sambil berlatih membuat konsepnya melekat lebih lama.",
      "icon": "🎮",
      "flowFrom": "Main",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Lompat 3",
      "emoji": "🦘",
      "countNum": 3,
      "countWord": "3,6,9",
      "suara": "Lompat 3 — 3,6,9. Pada Kelipatan, cocokkan gambar “Lompat 3” dengan artinya (3,6,9), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Kelipatan.",
      "teksVisual": "🦘 Lompat 3: 3,6,9"
    },
    {
      "judul": "Lompat 4",
      "emoji": "🦘",
      "countNum": 4,
      "countWord": "4,8,12",
      "suara": "Lompat 4 — 4,8,12. Pada Kelipatan, cocokkan gambar “Lompat 4” dengan artinya (4,8,12), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Kelipatan.",
      "teksVisual": "🦘 Lompat 4: 4,8,12"
    },
    {
      "judul": "Sisa 0",
      "emoji": "✅",
      "countNum": 0,
      "countWord": "ya",
      "suara": "Sisa 0 — ya. Pada Kelipatan, cocokkan gambar “Sisa 0” dengan artinya (ya), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Kelipatan.",
      "teksVisual": "✅ Sisa 0: ya"
    },
    {
      "judul": "Ada sisa",
      "emoji": "🚫",
      "countNum": 1,
      "countWord": "tidak",
      "suara": "Ada sisa — tidak. Pada Kelipatan, cocokkan gambar “Ada sisa” dengan artinya (tidak), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Kelipatan.",
      "teksVisual": "🚫 Ada sisa: tidak"
    },
    {
      "judul": "Tabel 100",
      "emoji": "▦",
      "countNum": 100,
      "countWord": "pola",
      "suara": "Tabel 100 — pola. Pada Kelipatan, cocokkan gambar “Tabel 100” dengan artinya (pola), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Kelipatan.",
      "teksVisual": "▦ Tabel 100: pola"
    },
    {
      "judul": "12÷3",
      "emoji": "➗",
      "countNum": 4,
      "countWord": "ya",
      "suara": "Pada Kelipatan, cocokkan gambar “12÷3” dengan artinya (ya), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Kelipatan.",
      "teksVisual": "➗ 12÷3: ya"
    },
    {
      "judul": "10÷3",
      "emoji": "➗",
      "countNum": 1,
      "countWord": "sisa",
      "suara": "10÷3 — sisa. Pada Kelipatan, cocokkan gambar “10÷3” dengan artinya (sisa), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Kelipatan.",
      "teksVisual": "➗ 10÷3: sisa"
    },
    {
      "judul": "Daftar <40",
      "emoji": "📋",
      "countNum": 6,
      "countWord": "kel.6",
      "suara": "Daftar <40 — kel.6. Pada Kelipatan, cocokkan gambar “Daftar <40” dengan artinya (kel.6), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Kelipatan.",
      "teksVisual": "📋 Daftar <40: kel.6"
    },
    {
      "judul": "Pola",
      "emoji": "👀",
      "countNum": 1,
      "countWord": "lihat",
      "suara": "Pola — lihat. Pada Kelipatan, cocokkan gambar “Pola” dengan artinya (lihat), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Kelipatan.",
      "teksVisual": "👀 Pola: lihat"
    },
    {
      "judul": "Siap B",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "KPK",
      "suara": "Siap B (KPK). Skala kualitatif sudah siap. Berikutnya bandingkan dua peluang dengan rasio untung/total, lalu putuskan adil atau kurang adil. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Kelipatan.",
      "teksVisual": "➡️ Siap B: KPK"
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "cek-kelipatan",
      "title": "Cek Kelipatan",
      "bookReference": "hlm. 33–37",
      "objective": "Pilih hasil lompat berjarak sama. .",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Lompat Hitung: Jarak lompat tetap.",
      "voiceGuide": "Lompat Hitung. Jarak lompat tetap.",
      "emoji": "👏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "lanjut-barisan",
      "title": "Lanjutkan Barisan",
      "bookReference": "hlm. 33–37",
      "objective": "Pilih hasil lompat berjarak sama. .",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Lompat Hitung: Jarak lompat tetap.",
      "voiceGuide": "Lompat Hitung. Jarak lompat tetap.",
      "emoji": "📶",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-kelipatan",
      "title": "Arti Kelipatan",
      "bookReference": "hlm. 35",
      "objective": "Pilih hasil lompat berjarak sama. .",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Lompat Hitung: Jarak lompat tetap.",
      "voiceGuide": "Lompat Hitung. Jarak lompat tetap.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-kelipatan",
      "title": "Pilah Kelipatan",
      "bookReference": "hlm. 35–37",
      "objective": "Pilih hasil lompat berjarak sama. .",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Lompat Hitung: Jarak lompat tetap.",
      "voiceGuide": "Lompat Hitung. Jarak lompat tetap.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-kelipatan",
      "title": "Jodohkan Kelipatan",
      "bookReference": "hlm. 33–37",
      "objective": "Menjodohkan.. Ingat Lompat Hitung. (Lompat Hitung)",
      "mechanicDescription": "Tiga ronde. Gunakan Lompat Hitung.",
      "voiceGuide": "Lompat Hitung. Mainkan dengan teliti.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-kelipatan",
      "title": "Memori Kelipatan",
      "bookReference": "hlm. 33–37",
      "objective": "Memori.. Ingat Lompat Hitung. (Lompat Hitung)",
      "mechanicDescription": "Tiga ronde. Gunakan Lompat Hitung.",
      "voiceGuide": "Lompat Hitung. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-kelipatan",
      "title": "Ketuk Kelipatan",
      "bookReference": "hlm. 33–37",
      "objective": "Mengetuk.. Ingat Lompat Hitung. (Lompat Hitung)",
      "mechanicDescription": "Tiga ronde. Gunakan Lompat Hitung.",
      "voiceGuide": "Lompat Hitung. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-kelipatan",
      "title": "Ketuk Semua Kelipatan",
      "bookReference": "hlm. 35–37",
      "objective": "Ketuk semua.. Ingat Lompat Hitung. (Lompat Hitung)",
      "mechanicDescription": "Tiga ronde. Gunakan Lompat Hitung.",
      "voiceGuide": "Lompat Hitung. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-tepuk",
      "title": "Cerita Tepuk Bilangan",
      "bookReference": "hlm. 33–37",
      "objective": "Soal cerita.. Ingat Lompat Hitung. (Lompat Hitung)",
      "mechanicDescription": "Tiga ronde. Gunakan Lompat Hitung.",
      "voiceGuide": "Lompat Hitung. Mainkan dengan teliti.",
      "emoji": "👏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-kelipatan",
      "title": "Urutkan Kelipatan",
      "bookReference": "hlm. 35–37",
      "objective": "Mengurutkan.. Ingat Lompat Hitung. (Lompat Hitung)",
      "mechanicDescription": "Tiga ronde. Gunakan Lompat Hitung.",
      "voiceGuide": "Lompat Hitung. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "tabel-kelipatan",
      "title": "Tabel Kelipatan",
      "bookReference": "hlm. 35–37",
      "objective": "Pakai pola tabel. Latihan: Baca tabel..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Tabel Seratus: Tandai kelipatan.",
      "voiceGuide": "Tabel Seratus. Tandai kelipatan.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "diagram-lanjut",
      "title": "Diagram Barisan",
      "bookReference": "hlm. 33–37",
      "objective": "Pakai pola tabel. Latihan: Lanjut barisan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Tabel Seratus: Tandai kelipatan.",
      "voiceGuide": "Tabel Seratus. Tandai kelipatan.",
      "diagramType": "seq",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-a",
      "title": "Jodohkan Diagram A",
      "bookReference": "hlm. 33–37",
      "objective": "Pakai pola tabel. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Tabel Seratus: Tandai kelipatan.",
      "voiceGuide": "Tabel Seratus. Tandai kelipatan.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-a",
      "title": "Memori Diagram A",
      "bookReference": "hlm. 33–37",
      "objective": "Pakai pola tabel. Latihan: Memori..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Tabel Seratus: Tandai kelipatan.",
      "voiceGuide": "Tabel Seratus. Tandai kelipatan.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-a",
      "title": "Tabel Cek Kelipatan",
      "bookReference": "hlm. 35–37",
      "objective": "Isi tabel.. Ingat Tabel Seratus. (Tabel Seratus)",
      "mechanicDescription": "Tiga tabel. Gunakan Tabel Seratus.",
      "voiceGuide": "Tabel Seratus. Mainkan dengan teliti.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-pa",
      "title": "Ketuk Semua Diagram A",
      "bookReference": "hlm. 35–37",
      "objective": "Ketuk semua.. Ingat Tabel Seratus. (Tabel Seratus)",
      "mechanicDescription": "Tiga ronde. Gunakan Tabel Seratus.",
      "voiceGuide": "Tabel Seratus. Mainkan dengan teliti.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-a",
      "title": "Pilah Diagram A",
      "bookReference": "hlm. 35–37",
      "objective": "Pilah.. Ingat Tabel Seratus. (Tabel Seratus)",
      "mechanicDescription": "Tiga ronde. Gunakan Tabel Seratus.",
      "voiceGuide": "Tabel Seratus. Mainkan dengan teliti.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "choose-a",
      "title": "Pilih Pernyataan A",
      "bookReference": "hlm. 33–37",
      "objective": "Pilih.. Ingat Tabel Seratus. (Tabel Seratus)",
      "mechanicDescription": "Tiga ronde. Gunakan Tabel Seratus.",
      "voiceGuide": "Tabel Seratus. Mainkan dengan teliti.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jenis-pa",
      "title": "Pilih Arti Diagram",
      "bookReference": "hlm. 35",
      "objective": "Definisi.. Ingat Tabel Seratus. (Tabel Seratus)",
      "mechanicDescription": "Tiga ronde. Gunakan Tabel Seratus.",
      "voiceGuide": "Tabel Seratus. Mainkan dengan teliti.",
      "diagramType": "def",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-a",
      "title": "Cerita Diagram A",
      "bookReference": "hlm. 33–37",
      "objective": "Cerita.. Ingat Tabel Seratus. (Tabel Seratus)",
      "mechanicDescription": "Tiga ronde. Gunakan Tabel Seratus.",
      "voiceGuide": "Tabel Seratus. Mainkan dengan teliti.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-cek",
      "title": "Tulis Cek Kelipatan",
      "bookReference": "hlm. 35–37",
      "objective": "Bagi dan lihat sisa. Latihan: Menulis..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Cek Habis Dibagi: Sisa nol = ya.",
      "voiceGuide": "Cek Habis Dibagi. Sisa nol = ya.",
      "symbolLarge": "3×n",
      "wordLarge": "CEK",
      "mathNotation": "kelipatan"
    },
    {
      "stage": "Abstract",
      "gameType": "write-lanjut",
      "title": "Tulis Lanjutan",
      "bookReference": "hlm. 33–37",
      "objective": "Bagi dan lihat sisa. Latihan: Menulis lanjut..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Cek Habis Dibagi: Sisa nol = ya.",
      "voiceGuide": "Cek Habis Dibagi. Sisa nol = ya.",
      "symbolLarge": "+n",
      "wordLarge": "LANJUT",
      "mathNotation": "barisan"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-def-a",
      "title": "Pilih Definisi",
      "bookReference": "hlm. 35",
      "objective": "Bagi dan lihat sisa. Latihan: Definisi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Cek Habis Dibagi: Sisa nol = ya.",
      "voiceGuide": "Cek Habis Dibagi. Sisa nol = ya.",
      "symbolLarge": "arti",
      "wordLarge": "DEFINISI",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-a",
      "title": "Urutkan Abstrak A",
      "bookReference": "hlm. 35–37",
      "objective": "Bagi dan lihat sisa. Latihan: Urut..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Cek Habis Dibagi: Sisa nol = ya.",
      "voiceGuide": "Cek Habis Dibagi. Sisa nol = ya.",
      "symbolLarge": "naik",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-a",
      "title": "Jodohkan Notasi A",
      "bookReference": "hlm. 33–37",
      "objective": "Jodohkan.. Ingat Cek Habis Dibagi. (Cek Habis Dibagi)",
      "mechanicDescription": "Tiga ronde. Gunakan Cek Habis Dibagi.",
      "voiceGuide": "Cek Habis Dibagi. Mainkan dengan teliti.",
      "symbolLarge": "×",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-a",
      "title": "Memori Notasi A",
      "bookReference": "hlm. 33–37",
      "objective": "Memori.. Ingat Cek Habis Dibagi. (Cek Habis Dibagi)",
      "mechanicDescription": "Tiga ronde. Gunakan Cek Habis Dibagi.",
      "voiceGuide": "Cek Habis Dibagi. Mainkan dengan teliti.",
      "symbolLarge": "kel",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-a",
      "title": "Benar atau Salah: Kelipatan",
      "bookReference": "hlm. 33–37",
      "objective": "Menilai.. Ingat Cek Habis Dibagi. (Cek Habis Dibagi)",
      "mechanicDescription": "Dua ronde. Gunakan Cek Habis Dibagi.",
      "voiceGuide": "Cek Habis Dibagi. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-a",
      "title": "Detektif Kelipatan",
      "bookReference": "hlm. 33–37",
      "objective": "Petunjuk.. Ingat Cek Habis Dibagi. (Cek Habis Dibagi)",
      "mechanicDescription": "Tiga soal. Gunakan Cek Habis Dibagi.",
      "voiceGuide": "Cek Habis Dibagi. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-a",
      "title": "Peta Konsep Kelipatan",
      "bookReference": "hlm. 33–37",
      "objective": "Peta.. Ingat Cek Habis Dibagi. (Cek Habis Dibagi)",
      "mechanicDescription": "Satu peta. Gunakan Cek Habis Dibagi.",
      "voiceGuide": "Cek Habis Dibagi. Mainkan dengan teliti.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-a",
      "title": "Cerita Angka Kelipatan",
      "bookReference": "hlm. 33–37",
      "objective": "Cerita.. Ingat Cek Habis Dibagi. (Cek Habis Dibagi)",
      "mechanicDescription": "Tiga ronde. Gunakan Cek Habis Dibagi.",
      "voiceGuide": "Cek Habis Dibagi. Mainkan dengan teliti.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "🦘",
      "nama": "Lompat hitung",
      "isi": "Kelipatan = pendaratan lompat berjarak sama.",
      "suara": "Skip counting."
    },
    {
      "ikon": "➗",
      "nama": "Sisa nol",
      "isi": "Habis dibagi berarti termasuk kelipatan.",
      "suara": "Cek sisa."
    },
    {
      "ikon": "▦",
      "nama": "Tabel seratus",
      "isi": "Pola visual membantu mengingat daftar.",
      "suara": "Hundred chart."
    },
    {
      "ikon": "📝",
      "nama": "Daftar rapi",
      "isi": "Tulis berurutan, hormati batas soal.",
      "suara": "Daftar."
    }
  ],
  "poinSuara": "Lompat hitung, cek sisa nol, dan pola tabel seratus.",
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
  "rumah": "Ayo Mencoba: terapkan Lompat Hitung pada satu soal di rumah.",
  "refleksi": [
    "Bagaimana Lompat Hitung membantumu?",
    "Kapan memakai Tabel Seratus?",
    "Apa bedanya dengan hanya menghafal rumus?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Skip Counting",
      "namaId": "Lompat Hitung",
      "asal": "Number sense / Singapore",
      "ringkas": "Kelipatan didapat dengan melompat jarak sama di garis bilangan atau hitungan.",
      "tahap": [
        "Story",
        "Mind",
        "Concrete"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Hundred Chart",
      "namaId": "Tabel Seratus",
      "asal": "Elementary number sense",
      "ringkas": "Tandai kelipatan pada tabel 1–100 untuk melihat pola.",
      "tahap": [
        "Story",
        "Picture",
        "Infografis"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Divisibility Check",
      "namaId": "Cek Habis Dibagi",
      "asal": "Number theory intro",
      "ringkas": "Bilangan A kelipatan B jika A habis dibagi B (sisa 0).",
      "tahap": [
        "Story",
        "Abstract",
        "Concrete"
      ]
    }
  ]
};

export const SUB_B52: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Kelipatan Persekutuan)",
  "fullTitle": "Sub-Bab B: Kelipatan Persekutuan dan KPK",
  "targetDescription": "Siswa menentukan kelipatan persekutuan dan KPK dari dua bilangan dengan daftar bersama dan pengantar faktor prima sesuai Buku Siswa Kelas V Bab 2 Sub-Bab B.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Kita mencari bilangan yang menjadi kelipatan dua bilangan sekaligus. Itu kelipatan persekutuan. Yang terkecil disebut KPK. Buat dua daftar, cari irisan, ambil yang terkecil. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menentukan kelipatan persekutuan dan KPK dua bilangan.",
    "referensi": "Buku Siswa Matematika Kelas V Kemendikbudristek (Bab 2 Sub-Bab B)."
  },
  "videos": [],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Dua bilangan",
      "stepDesc": "Baca soal Kelipatan Persekutuan dan KPK dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. KPK dari a dan b? Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa menentukan kelipatan persekutuan dan KPK dari dua bilangan dengan daftar bersama dan pengantar faktor prima sesuai….",
      "icon": "❓",
      "flowFrom": "Dua bilangan",
      "flowTo": "Daftar a"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Daftar a",
      "stepDesc": "Kelipatan a berurutan. Pada Kelipatan Persekutuan dan KPK, langkah “Daftar a” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Daftar Kelipatan Bersama: Buat dua daftar kelipatan, cari bilangan yang muncul di keduanya. KPK dari Irisan: KPK adalah kelipatan persekutuan yang terkecil posi…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "📋",
      "flowFrom": "Daftar a",
      "flowTo": "Daftar b"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Daftar b",
      "stepDesc": "Kelipatan b berurutan. Pada Kelipatan Persekutuan dan KPK, langkah “Daftar b” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Daftar Kelipatan Bersama: Buat dua daftar kelipatan, cari bilangan yang muncul di keduanya. KPK dari Irisan: KPK adalah kelipatan persekutuan yang terkecil posi…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "📋",
      "flowFrom": "Daftar b",
      "flowTo": "Irisan"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Irisan",
      "stepDesc": "Angka yang muncul di keduanya. Pada Kelipatan Persekutuan dan KPK, langkah “Irisan” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Daftar Kelipatan Bersama: Buat dua daftar kelipatan, cari bilangan yang muncul di keduanya. KPK dari Irisan: KPK adalah kelipatan persekutuan yang terkecil posi…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "⋂",
      "flowFrom": "Irisan",
      "flowTo": "Terkecil"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Terkecil",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Kelipatan Persekutuan dan KPK. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "⭐",
      "flowFrom": "Terkecil",
      "flowTo": "Cek bagi"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek bagi",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Kelipatan Persekutuan dan KPK. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "➗",
      "flowFrom": "Cek bagi",
      "flowTo": "Bukan FPB"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Bukan FPB",
      "stepDesc": "Simpulkan ide utama Kelipatan Persekutuan dan KPK dengan kalimatmu sendiri. Sebutkan cara yang kamu pakai dan mengapa cara itu membantu. Jelaskan kepada teman seolah-olah kamu guru kecil. Simpulan yang jelas menandakan konsepnya sudah dipahami.",
      "icon": "🚫",
      "flowFrom": "Bukan FPB",
      "flowTo": "Main"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Main",
      "stepDesc": "Latih lagi di tahap Concrete, Picture, lalu Abstract untuk Kelipatan Persekutuan dan KPK. Mulai dari benda nyata, lanjut ke diagram, baru ke lambang angka. Ulangi sampai kamu bisa menjelaskan tanpa melihat contoh. Bermain sambil berlatih membuat konsepnya melekat lebih lama.",
      "icon": "🎮",
      "flowFrom": "Main",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Daftar 4",
      "emoji": "📋",
      "countNum": 4,
      "countWord": "4,8,12",
      "suara": "Daftar 4 — 4,8,12. Pada Kelipatan Persekutuan dan KPK, cocokkan gambar “Daftar 4” dengan artinya (4,8,12), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Kelipatan…",
      "teksVisual": "📋 Daftar 4: 4,8,12"
    },
    {
      "judul": "Daftar 6",
      "emoji": "📋",
      "countNum": 6,
      "countWord": "6,12,24",
      "suara": "Daftar 6 — 6,12,24. Pada Kelipatan Persekutuan dan KPK, cocokkan gambar “Daftar 6” dengan artinya (6,12,24), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Kelipatan…",
      "teksVisual": "📋 Daftar 6: 6,12,24"
    },
    {
      "judul": "Irisan",
      "emoji": "⋂",
      "countNum": 12,
      "countWord": "12,24",
      "suara": "Irisan — 12,24. Pada Kelipatan Persekutuan dan KPK, cocokkan gambar “Irisan” dengan artinya (12,24), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Kelipatan Persekutuan…",
      "teksVisual": "⋂ Irisan: 12,24"
    },
    {
      "judul": "KPK",
      "emoji": "⭐",
      "countNum": 12,
      "countWord": "terkecil",
      "suara": "KPK — terkecil. Pada Kelipatan Persekutuan dan KPK, cocokkan gambar “KPK” dengan artinya (terkecil), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Kelipatan Persekutuan…",
      "teksVisual": "⭐ KPK: terkecil"
    },
    {
      "judul": "Cerita",
      "emoji": "💡",
      "countNum": 12,
      "countWord": "hari",
      "suara": "Cerita — hari. Lampu A menyala tiap 4 hari, lampu B tiap 6 hari. Kapan menyala bersama pertama kali? Itu soal KPK: pertemuan pertama kelipatan keduanya.",
      "teksVisual": "💡 Cerita: hari"
    },
    {
      "judul": "Bukan 24",
      "emoji": "🚫",
      "countNum": 24,
      "countWord": "bukan min",
      "suara": "Bukan 24 — bukan min. Pada Kelipatan Persekutuan dan KPK, cocokkan gambar “Bukan 24” dengan artinya (bukan min), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🚫 Bukan 24: bukan min"
    },
    {
      "judul": "3&5",
      "emoji": "⭐",
      "countNum": 15,
      "countWord": "KPK",
      "suara": "Pada Kelipatan Persekutuan dan KPK, cocokkan gambar “3&5” dengan artinya (KPK), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Kelipatan Persekutuan dan KPK.",
      "teksVisual": "⭐ 3&5: KPK"
    },
    {
      "judul": "Cek",
      "emoji": "➗",
      "countNum": 0,
      "countWord": "sisa",
      "suara": "Kesalahan: mengalikan selalu. Untuk 4 dan 6, 4×6=24, padahal KPK=12. Selalu cek irisan, jangan otomatis kali. Ingat: salah kali; cek irisan; tertukar.",
      "teksVisual": "➗ Cek: sisa"
    },
    {
      "judul": "Tabel",
      "emoji": "▦",
      "countNum": 1,
      "countWord": "dua warna",
      "suara": "Tabel — dua warna. Di tabel seratus, kotak yang ditandai dua warna adalah calon KPK. Yang paling kecil di antara itu adalah KPK. Ingat: dua warna; terkecil; padu.",
      "teksVisual": "▦ Tabel: dua warna"
    },
    {
      "judul": "Siap C",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "faktor",
      "suara": "Siap C — faktor. Berikutnya kita bahas faktor. Faktor adalah kebalikan arah dari kelipatan. Ingat: lanjut C; kebalikan; senjata. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Kelipatan Persekutuan dan KPK.",
      "teksVisual": "➡️ Siap C: faktor"
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "cek-persekutuan",
      "title": "Cek Kelipatan Persekutuan",
      "bookReference": "hlm. 38–40",
      "objective": "Cari irisan dua daftar. Latihan: Mengenali irisan kelipatan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Daftar Kelipatan Bersama: Yang muncul di keduanya.",
      "voiceGuide": "Daftar Kelipatan Bersama. Yang muncul di keduanya.",
      "emoji": "🤝",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "hitung-kpk",
      "title": "Hitung KPK",
      "bookReference": "hlm. 40–42",
      "objective": "Cari irisan dua daftar. Latihan: Menemukan KPK..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Daftar Kelipatan Bersama: Yang muncul di keduanya.",
      "voiceGuide": "Daftar Kelipatan Bersama. Yang muncul di keduanya.",
      "emoji": "🎯",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jadwal-kpk",
      "title": "Jadwal dengan KPK",
      "bookReference": "hlm. 41–42",
      "objective": "Cari irisan dua daftar. Latihan: Soal jadwal..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Daftar Kelipatan Bersama: Yang muncul di keduanya.",
      "voiceGuide": "Daftar Kelipatan Bersama. Yang muncul di keduanya.",
      "emoji": "📅",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-persekutuan",
      "title": "Pilah Persekutuan",
      "bookReference": "hlm. 38–40",
      "objective": "Cari irisan dua daftar. Latihan: Memilah..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Daftar Kelipatan Bersama: Yang muncul di keduanya.",
      "voiceGuide": "Daftar Kelipatan Bersama. Yang muncul di keduanya.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-kpk",
      "title": "Jodohkan KPK",
      "bookReference": "hlm. 40–42",
      "objective": "Menjodohkan.. Ingat Daftar Kelipatan Bersama. (Daftar Kelipatan Bersama)",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Kelipatan Bersama.",
      "voiceGuide": "Daftar Kelipatan Bersama. Mainkan dengan teliti.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-kpk",
      "title": "Memori KPK",
      "bookReference": "hlm. 40–42",
      "objective": "Memori.. Ingat Daftar Kelipatan Bersama. (Daftar Kelipatan Bersama)",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Kelipatan Bersama.",
      "voiceGuide": "Daftar Kelipatan Bersama. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-persekutuan",
      "title": "Ketuk Persekutuan",
      "bookReference": "hlm. 38–40",
      "objective": "Mengetuk.. Ingat Daftar Kelipatan Bersama. (Daftar Kelipatan Bersama)",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Kelipatan Bersama.",
      "voiceGuide": "Daftar Kelipatan Bersama. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-kpk",
      "title": "Ketuk Semua Benar KPK",
      "bookReference": "hlm. 38–42",
      "objective": "Ketuk semua.. Ingat Daftar Kelipatan Bersama. (Daftar Kelipatan Bersama)",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Kelipatan Bersama.",
      "voiceGuide": "Daftar Kelipatan Bersama. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-renang",
      "title": "Cerita Latihan Renang",
      "bookReference": "hlm. 31–42",
      "objective": "Soal cerita.. Ingat Daftar Kelipatan Bersama. (Daftar Kelipatan Bersama)",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Kelipatan Bersama.",
      "voiceGuide": "Daftar Kelipatan Bersama. Mainkan dengan teliti.",
      "emoji": "🏊",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-kpk",
      "title": "Urutkan Hasil KPK",
      "bookReference": "hlm. 40–42",
      "objective": "Mengurutkan.. Ingat Daftar Kelipatan Bersama. (Daftar Kelipatan Bersama)",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Kelipatan Bersama.",
      "voiceGuide": "Daftar Kelipatan Bersama. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "diagram-persekutuan",
      "title": "Diagram Persekutuan",
      "bookReference": "hlm. 38–40",
      "objective": "Ambil irisan terkecil. Latihan: Baca irisan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat KPK dari Irisan: Itu KPK.",
      "voiceGuide": "KPK dari Irisan. Itu KPK.",
      "diagramType": "venn",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "diagram-kpk",
      "title": "Diagram KPK",
      "bookReference": "hlm. 40–42",
      "objective": "Ambil irisan terkecil. Latihan: Baca KPK..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat KPK dari Irisan: Itu KPK.",
      "voiceGuide": "KPK dari Irisan. Itu KPK.",
      "diagramType": "lcm",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-b",
      "title": "Jodohkan Diagram B",
      "bookReference": "hlm. 38–42",
      "objective": "Ambil irisan terkecil. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat KPK dari Irisan: Itu KPK.",
      "voiceGuide": "KPK dari Irisan. Itu KPK.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-b",
      "title": "Memori Diagram B",
      "bookReference": "hlm. 38–42",
      "objective": "Ambil irisan terkecil. Latihan: Memori..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat KPK dari Irisan: Itu KPK.",
      "voiceGuide": "KPK dari Irisan. Itu KPK.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-b",
      "title": "Tabel KPK",
      "bookReference": "hlm. 40–42",
      "objective": "Isi tabel.. Ingat KPK dari Faktor Prima. (KPK dari Irisan)",
      "mechanicDescription": "Tiga tabel. Gunakan KPK dari Faktor Prima.",
      "voiceGuide": "KPK dari Irisan. Mainkan dengan teliti.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-pb",
      "title": "Ketuk Semua Diagram B",
      "bookReference": "hlm. 38–42",
      "objective": "Ketuk semua.. Ingat KPK dari Faktor Prima. (KPK dari Irisan)",
      "mechanicDescription": "Tiga ronde. Gunakan KPK dari Faktor Prima.",
      "voiceGuide": "KPK dari Irisan. Mainkan dengan teliti.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-b",
      "title": "Pilah Diagram B",
      "bookReference": "hlm. 38–40",
      "objective": "Pilah.. Ingat KPK dari Faktor Prima. (KPK dari Irisan)",
      "mechanicDescription": "Tiga ronde. Gunakan KPK dari Faktor Prima.",
      "voiceGuide": "KPK dari Irisan. Mainkan dengan teliti.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "jadwal-pb",
      "title": "Diagram Jadwal",
      "bookReference": "hlm. 41–42",
      "objective": "Jadwal.. Ingat KPK dari Faktor Prima. (KPK dari Irisan)",
      "mechanicDescription": "Tiga ronde. Gunakan KPK dari Faktor Prima.",
      "voiceGuide": "KPK dari Irisan. Mainkan dengan teliti.",
      "diagramType": "cal",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "choose-b",
      "title": "Pilih Pernyataan B",
      "bookReference": "hlm. 38–42",
      "objective": "Pilih.. Ingat KPK dari Faktor Prima. (KPK dari Irisan)",
      "mechanicDescription": "Tiga ronde. Gunakan KPK dari Faktor Prima.",
      "voiceGuide": "KPK dari Irisan. Mainkan dengan teliti.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-b",
      "title": "Cerita Diagram B",
      "bookReference": "hlm. 31–42",
      "objective": "Cerita.. Ingat KPK dari Faktor Prima. (KPK dari Irisan)",
      "mechanicDescription": "Tiga ronde. Gunakan KPK dari Faktor Prima.",
      "voiceGuide": "KPK dari Irisan. Mainkan dengan teliti.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-persekutuan",
      "title": "Tulis Cek Persekutuan",
      "bookReference": "hlm. 38–40",
      "objective": "Ingat pratinjau prima. Latihan: Menulis..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat KPK dari Faktor Prima: Dasarnya tetap irisan.",
      "voiceGuide": "KPK dari Faktor Prima. Dasarnya tetap irisan.",
      "symbolLarge": "6∈",
      "wordLarge": "IRISAN",
      "mathNotation": "cek"
    },
    {
      "stage": "Abstract",
      "gameType": "write-kpk",
      "title": "Tulis Hasil KPK",
      "bookReference": "hlm. 40–42",
      "objective": "Ingat pratinjau prima. Latihan: Menulis KPK..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat KPK dari Faktor Prima: Dasarnya tetap irisan.",
      "voiceGuide": "KPK dari Faktor Prima. Dasarnya tetap irisan.",
      "symbolLarge": "KPK",
      "wordLarge": "HASIL",
      "mathNotation": "lcm"
    },
    {
      "stage": "Abstract",
      "gameType": "write-jadwal",
      "title": "Tulis Jadwal KPK",
      "bookReference": "hlm. 41–42",
      "objective": "Ingat pratinjau prima. Latihan: Menulis jadwal..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat KPK dari Faktor Prima: Dasarnya tetap irisan.",
      "voiceGuide": "KPK dari Faktor Prima. Dasarnya tetap irisan.",
      "symbolLarge": "tgl",
      "wordLarge": "JADWAL",
      "mathNotation": "hari"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-b",
      "title": "Urutkan Abstrak B",
      "bookReference": "hlm. 40–42",
      "objective": "Ingat pratinjau prima. Latihan: Urut..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat KPK dari Faktor Prima: Dasarnya tetap irisan.",
      "voiceGuide": "KPK dari Faktor Prima. Dasarnya tetap irisan.",
      "symbolLarge": "naik",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-b",
      "title": "Jodohkan Notasi B",
      "bookReference": "hlm. 38–42",
      "objective": "Jodohkan.. Ingat Diagram Faktor. (KPK dari Faktor Prima)",
      "mechanicDescription": "Tiga ronde. Gunakan Diagram Faktor.",
      "voiceGuide": "KPK dari Faktor Prima. Mainkan dengan teliti.",
      "symbolLarge": "KPK",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-b",
      "title": "Memori Notasi B",
      "bookReference": "hlm. 38–42",
      "objective": "Memori.. Ingat Diagram Faktor. (KPK dari Faktor Prima)",
      "mechanicDescription": "Tiga ronde. Gunakan Diagram Faktor.",
      "voiceGuide": "KPK dari Faktor Prima. Mainkan dengan teliti.",
      "symbolLarge": "kpk",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-b",
      "title": "Benar atau Salah: KPK",
      "bookReference": "hlm. 38–42",
      "objective": "Menilai.. Ingat Diagram Faktor. (KPK dari Faktor Prima)",
      "mechanicDescription": "Dua ronde. Gunakan Diagram Faktor.",
      "voiceGuide": "KPK dari Faktor Prima. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-b",
      "title": "Detektif KPK",
      "bookReference": "hlm. 31–42",
      "objective": "Petunjuk.. Ingat Diagram Faktor. (KPK dari Faktor Prima)",
      "mechanicDescription": "Tiga soal. Gunakan Diagram Faktor.",
      "voiceGuide": "KPK dari Faktor Prima. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-b",
      "title": "Peta Konsep KPK",
      "bookReference": "hlm. 38–42",
      "objective": "Peta.. Ingat Diagram Faktor. (KPK dari Faktor Prima)",
      "mechanicDescription": "Satu peta. Gunakan Diagram Faktor.",
      "voiceGuide": "KPK dari Faktor Prima. Mainkan dengan teliti.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-b",
      "title": "Cerita Angka KPK",
      "bookReference": "hlm. 31–42",
      "objective": "Cerita.. Ingat Diagram Faktor. (KPK dari Faktor Prima)",
      "mechanicDescription": "Tiga ronde. Gunakan Diagram Faktor.",
      "voiceGuide": "KPK dari Faktor Prima. Mainkan dengan teliti.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "⋂",
      "nama": "Irisan daftar",
      "isi": "Kelipatan persekutuan = irisan dua daftar.",
      "suara": "Irisan."
    },
    {
      "ikon": "⭐",
      "nama": "KPK",
      "isi": "KPK = kelipatan persekutuan terkecil.",
      "suara": "Terkecil."
    },
    {
      "ikon": "🚫",
      "nama": "Jangan auto-kali",
      "isi": "Perkalian tidak selalu KPK.",
      "suara": "Bukan selalu a×b."
    },
    {
      "ikon": "➗",
      "nama": "Cek",
      "isi": "KPK harus habis dibagi kedua bilangan.",
      "suara": "Cek bagi."
    }
  ],
  "poinSuara": "Irisan dua daftar kelipatan, ambil yang terkecil, lalu cek.",
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
  "rumah": "Ayo Mencoba: terapkan Daftar Kelipatan Bersama pada satu soal di rumah.",
  "refleksi": [
    "Bagaimana Daftar Kelipatan Bersama membantumu?",
    "Kapan memakai KPK dari Irisan?",
    "Apa bedanya dengan hanya menghafal rumus?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Common Multiples List",
      "namaId": "Daftar Kelipatan Bersama",
      "asal": "Singapore / US textbooks",
      "ringkas": "Buat dua daftar kelipatan, cari bilangan yang muncul di keduanya.",
      "tahap": [
        "Story",
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "LCM Concept",
      "namaId": "KPK dari Irisan",
      "asal": "Number sense",
      "ringkas": "KPK adalah kelipatan persekutuan yang terkecil positif.",
      "tahap": [
        "Story",
        "Mind",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Prime Factor Preview",
      "namaId": "KPK dari Faktor Prima",
      "asal": "Prime factorization intro",
      "ringkas": "Nanti KPK juga bisa dari faktor prima; hari ini kuasai daftar dulu.",
      "tahap": [
        "Story",
        "Infografis"
      ]
    }
  ]
};

export const SUB_C52: SubBabNaskah = {
  "id": "C",
  "codeTitle": "Sub-Bab C (Faktor)",
  "fullTitle": "Sub-Bab C: Faktor",
  "targetDescription": "Siswa menentukan faktor suatu bilangan dengan pasangan faktor, diagram faktor, dan model susunan persegi panjang sesuai Buku Siswa Kelas V Bab 2 Sub-Bab C.",
  "secondaryBg": "#DCFCE7",
  "secondaryBorder": "#16A34A",
  "secondaryText": "#14532D",
  "silabus": {
    "teksSuara": "Kita belajar faktor. Faktor adalah bilangan yang membagi habis. Cari berpasangan: 1 dengan n, 2 dengan hasil baginya, sampai pasangan bertemu. Susunan persegi panjang juga menunjukkan faktor. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menentukan faktor suatu bilangan.",
    "referensi": "Buku Siswa Matematika Kelas V Kemendikbudristek (Bab 2 Sub-Bab C)."
  },
  "videos": [],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Bilangan n",
      "stepDesc": "Baca soal Faktor dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Faktor dari berapa? Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa menentukan faktor suatu bilangan dengan pasangan faktor, diagram faktor, dan model susunan persegi panjang sesuai ….",
      "icon": "❓",
      "flowFrom": "Bilangan n",
      "flowTo": "Mulai 1"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Mulai 1",
      "stepDesc": "Uji pembagi dari kecil. Pada Faktor, langkah “Mulai 1” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Pasangan Faktor: Faktor datang berpasangan yang hasil kalinya bilangan itu. Diagram Faktor: Gambar pelangi pasangan faktor dari kecil ke besar. Model Susunan Pe…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "1️⃣",
      "flowFrom": "Mulai 1",
      "flowTo": "Pasangan"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Pasangan",
      "stepDesc": "Tulis hasil baginya. Pada Faktor, langkah “Pasangan” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Pasangan Faktor: Faktor datang berpasangan yang hasil kalinya bilangan itu. Diagram Faktor: Gambar pelangi pasangan faktor dari kecil ke besar. Model Susunan Pe…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🔗",
      "flowFrom": "Pasangan",
      "flowTo": "Pelangi"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Pelangi",
      "stepDesc": "Gambar pasangan. Pada Faktor, langkah “Pelangi” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Pasangan Faktor: Faktor datang berpasangan yang hasil kalinya bilangan itu. Diagram Faktor: Gambar pelangi pasangan faktor dari kecil ke besar. Model Susunan Pe…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🌈",
      "flowFrom": "Pelangi",
      "flowTo": "Susunan"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Susunan",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Faktor. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "▦",
      "flowFrom": "Susunan",
      "flowTo": "Daftar urut"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Daftar urut",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Faktor. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "📋",
      "flowFrom": "Daftar urut",
      "flowTo": "Cek bagi"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Cek bagi",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Faktor. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Cek bagi",
      "flowTo": "Main"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Main",
      "stepDesc": "Latih lagi di tahap Concrete, Picture, lalu Abstract untuk Faktor. Mulai dari benda nyata, lanjut ke diagram, baru ke lambang angka. Ulangi sampai kamu bisa menjelaskan tanpa melihat contoh. Bermain sambil berlatih membuat konsepnya melekat lebih lama.",
      "icon": "🎮",
      "flowFrom": "Main",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Faktor",
      "emoji": "➗",
      "countNum": 1,
      "countWord": "bagi habis",
      "suara": "Faktor — bagi habis. Faktor 12 adalah bilangan yang membagi 12 habis: 1, 2, 3, 4, 6, 12. 1 berpasangan dengan 12 karena 1×12=12. Ingat: faktor 12; 1↔12; 2↔6,3↔4.",
      "teksVisual": "➗ Faktor: bagi habis"
    },
    {
      "judul": "1↔n",
      "emoji": "🔗",
      "countNum": 1,
      "countWord": "pasangan",
      "suara": "1↔n — pasangan. Pada Faktor, cocokkan gambar “1↔n” dengan artinya (pasangan), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Faktor.",
      "teksVisual": "🔗 1↔n: pasangan"
    },
    {
      "judul": "12",
      "emoji": "🌈",
      "countNum": 6,
      "countWord": "1..12",
      "suara": "Pada Faktor, cocokkan gambar “12” dengan artinya (1..12), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Faktor.",
      "teksVisual": "🌈 12: 1..12"
    },
    {
      "judul": "3×4",
      "emoji": "▦",
      "countNum": 12,
      "countWord": "susunan",
      "suara": "3×4 — susunan. Pada Faktor, cocokkan gambar “3×4” dengan artinya (susunan), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Faktor.",
      "teksVisual": "▦ 3×4: susunan"
    },
    {
      "judul": "16",
      "emoji": "📋",
      "countNum": 5,
      "countWord": "1,2,4,8,16",
      "suara": "16 — 1,2,4,8,16. Pasangan 16: 1×16, 2×8, 4×4. Faktor: 1, 2, 4, 8, 16. 4×4 adalah persegi — tetap dihitung. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Faktor.",
      "teksVisual": "📋 16: 1,2,4,8,16"
    },
    {
      "judul": "Bukan kel.",
      "emoji": "🚫",
      "countNum": 1,
      "countWord": "beda",
      "suara": "Faktor membagi habis ke dalam. Kelipatan melompat keluar. 12 adalah kelipatan 3, dan 3 adalah faktor 12. Hubungan kebalikan. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Faktor.",
      "teksVisual": "🚫 Bukan kel.: beda"
    },
    {
      "judul": "Lupa 1",
      "emoji": "⚠️",
      "countNum": 1,
      "countWord": "jangan",
      "suara": "Lupa 1 — jangan. Pada Faktor, cocokkan gambar “Lupa 1” dengan artinya (jangan), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Faktor.",
      "teksVisual": "⚠️ Lupa 1: jangan"
    },
    {
      "judul": "Urut",
      "emoji": "📶",
      "countNum": 1,
      "countWord": "kecil→",
      "suara": "Urut — kecil→. Pada Faktor, cocokkan gambar “Urut” dengan artinya (kecil→), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Faktor.",
      "teksVisual": "📶 Urut: kecil→"
    },
    {
      "judul": "Cek",
      "emoji": "✅",
      "countNum": 0,
      "countWord": "sisa",
      "suara": "Pada Faktor, cocokkan gambar “Cek” dengan artinya (sisa), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Faktor.",
      "teksVisual": "✅ Cek: sisa"
    },
    {
      "judul": "Siap D",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "FPB",
      "suara": "Siap D — FPB. Faktor satu bilangan siap. Berikutnya faktor persekutuan dan FPB. Kamu akan membandingkan dua daftar faktor. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Faktor.",
      "teksVisual": "➡️ Siap D: FPB"
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "cek-faktor",
      "title": "Cek Faktor",
      "bookReference": "hlm. 43–46",
      "objective": "Cari pasangan kali. Latihan: Mengenali faktor..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pasangan Faktor: Hasil kali = n.",
      "voiceGuide": "Pasangan Faktor. Hasil kali = n.",
      "emoji": "➗",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "pasangan-faktor",
      "title": "Pasangan Faktor",
      "bookReference": "hlm. 45",
      "objective": "Cari pasangan kali. Latihan: Pasangan hasil kali..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pasangan Faktor: Hasil kali = n.",
      "voiceGuide": "Pasangan Faktor. Hasil kali = n.",
      "emoji": "🔗",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-faktor",
      "title": "Arti Faktor",
      "bookReference": "hlm. 44–45",
      "objective": "Cari pasangan kali. Latihan: Definisi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pasangan Faktor: Hasil kali = n.",
      "voiceGuide": "Pasangan Faktor. Hasil kali = n.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-faktor",
      "title": "Pilah Faktor",
      "bookReference": "hlm. 43–46",
      "objective": "Cari pasangan kali. Latihan: Memilah..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pasangan Faktor: Hasil kali = n.",
      "voiceGuide": "Pasangan Faktor. Hasil kali = n.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-faktor",
      "title": "Jodohkan Faktor",
      "bookReference": "hlm. 43–46",
      "objective": "Menjodohkan.. Ingat Pasangan Faktor. (Pasangan Faktor)",
      "mechanicDescription": "Tiga ronde. Gunakan Pasangan Faktor.",
      "voiceGuide": "Pasangan Faktor. Mainkan dengan teliti.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-faktor",
      "title": "Memori Faktor",
      "bookReference": "hlm. 43–46",
      "objective": "Memori.. Ingat Pasangan Faktor. (Pasangan Faktor)",
      "mechanicDescription": "Tiga ronde. Gunakan Pasangan Faktor.",
      "voiceGuide": "Pasangan Faktor. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-faktor",
      "title": "Ketuk Faktor",
      "bookReference": "hlm. 43–46",
      "objective": "Mengetuk.. Ingat Pasangan Faktor. (Pasangan Faktor)",
      "mechanicDescription": "Tiga ronde. Gunakan Pasangan Faktor.",
      "voiceGuide": "Pasangan Faktor. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-faktor",
      "title": "Ketuk Semua Faktor",
      "bookReference": "hlm. 43–46",
      "objective": "Ketuk semua.. Ingat Pasangan Faktor. (Pasangan Faktor)",
      "mechanicDescription": "Tiga ronde. Gunakan Pasangan Faktor.",
      "voiceGuide": "Pasangan Faktor. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-petak",
      "title": "Cerita Kertas Berpetak",
      "bookReference": "hlm. 43–46",
      "objective": "Soal cerita.. Ingat Pasangan Faktor. (Pasangan Faktor)",
      "mechanicDescription": "Tiga ronde. Gunakan Pasangan Faktor.",
      "voiceGuide": "Pasangan Faktor. Mainkan dengan teliti.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-faktor",
      "title": "Urutkan Faktor",
      "bookReference": "hlm. 45–46",
      "objective": "Mengurutkan.. Ingat Pasangan Faktor. (Pasangan Faktor)",
      "mechanicDescription": "Tiga ronde. Gunakan Pasangan Faktor.",
      "voiceGuide": "Pasangan Faktor. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "diagram-bagi",
      "title": "Diagram Bagi Petak",
      "bookReference": "hlm. 43–44",
      "objective": "Lengkapkan pelangi. Latihan: Baca potongan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Diagram Faktor: Jangan ada yang terlewat.",
      "voiceGuide": "Diagram Faktor. Jangan ada yang terlewat.",
      "diagramType": "grid",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "diagram-pasangan",
      "title": "Diagram Pasangan",
      "bookReference": "hlm. 45",
      "objective": "Lengkapkan pelangi. Latihan: Pasangan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Diagram Faktor: Jangan ada yang terlewat.",
      "voiceGuide": "Diagram Faktor. Jangan ada yang terlewat.",
      "diagramType": "pair",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-c",
      "title": "Jodohkan Diagram C",
      "bookReference": "hlm. 43–46",
      "objective": "Lengkapkan pelangi. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Diagram Faktor: Jangan ada yang terlewat.",
      "voiceGuide": "Diagram Faktor. Jangan ada yang terlewat.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-c",
      "title": "Memori Diagram C",
      "bookReference": "hlm. 43–46",
      "objective": "Lengkapkan pelangi. Latihan: Memori..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Diagram Faktor: Jangan ada yang terlewat.",
      "voiceGuide": "Diagram Faktor. Jangan ada yang terlewat.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-c",
      "title": "Tabel Faktor",
      "bookReference": "hlm. 44–46",
      "objective": "Isi tabel.. Ingat Daftar Pembagi. (Diagram Faktor)",
      "mechanicDescription": "Tiga tabel. Gunakan Daftar Pembagi.",
      "voiceGuide": "Diagram Faktor. Mainkan dengan teliti.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-pc",
      "title": "Ketuk Semua Diagram C",
      "bookReference": "hlm. 43–46",
      "objective": "Ketuk semua.. Ingat Daftar Pembagi. (Diagram Faktor)",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Pembagi.",
      "voiceGuide": "Diagram Faktor. Mainkan dengan teliti.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-c",
      "title": "Pilah Diagram C",
      "bookReference": "hlm. 43–46",
      "objective": "Pilah.. Ingat Daftar Pembagi. (Diagram Faktor)",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Pembagi.",
      "voiceGuide": "Diagram Faktor. Mainkan dengan teliti.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "choose-c",
      "title": "Pilih Pernyataan C",
      "bookReference": "hlm. 43–46",
      "objective": "Pilih.. Ingat Daftar Pembagi. (Diagram Faktor)",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Pembagi.",
      "voiceGuide": "Diagram Faktor. Mainkan dengan teliti.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jenis-pc",
      "title": "Pilih Arti Diagram C",
      "bookReference": "hlm. 44–45",
      "objective": "Definisi.. Ingat Daftar Pembagi. (Diagram Faktor)",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Pembagi.",
      "voiceGuide": "Diagram Faktor. Mainkan dengan teliti.",
      "diagramType": "def",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-c",
      "title": "Cerita Diagram C",
      "bookReference": "hlm. 43–46",
      "objective": "Cerita.. Ingat Daftar Pembagi. (Diagram Faktor)",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Pembagi.",
      "voiceGuide": "Diagram Faktor. Mainkan dengan teliti.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-cek-f",
      "title": "Tulis Cek Faktor",
      "bookReference": "hlm. 43–46",
      "objective": "Lihat baris×kolom. Latihan: Menulis..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Model Susunan Persegi Panjang: Itu faktor.",
      "voiceGuide": "Model Susunan Persegi Panjang. Itu faktor.",
      "symbolLarge": "n|d",
      "wordLarge": "CEK",
      "mathNotation": "faktor"
    },
    {
      "stage": "Abstract",
      "gameType": "write-pasangan",
      "title": "Tulis Pasangan",
      "bookReference": "hlm. 45",
      "objective": "Lihat baris×kolom. Latihan: Menulis pasangan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Model Susunan Persegi Panjang: Itu faktor.",
      "voiceGuide": "Model Susunan Persegi Panjang. Itu faktor.",
      "symbolLarge": "a×b",
      "wordLarge": "PASANGAN",
      "mathNotation": "kali"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-def-c",
      "title": "Pilih Definisi Faktor",
      "bookReference": "hlm. 44–45",
      "objective": "Lihat baris×kolom. Latihan: Definisi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Model Susunan Persegi Panjang: Itu faktor.",
      "voiceGuide": "Model Susunan Persegi Panjang. Itu faktor.",
      "symbolLarge": "arti",
      "wordLarge": "DEFINISI",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-c",
      "title": "Urutkan Abstrak C",
      "bookReference": "hlm. 45–46",
      "objective": "Lihat baris×kolom. Latihan: Urut..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Model Susunan Persegi Panjang: Itu faktor.",
      "voiceGuide": "Model Susunan Persegi Panjang. Itu faktor.",
      "symbolLarge": "naik",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-c",
      "title": "Jodohkan Notasi C",
      "bookReference": "hlm. 43–46",
      "objective": "Jodohkan.. Ingat Model Susunan Persegi Panjang. (Model Susunan Persegi Panjang)",
      "mechanicDescription": "Tiga ronde. Gunakan Model Susunan Persegi Panjang.",
      "voiceGuide": "Model Susunan Persegi Panjang. Mainkan dengan teliti.",
      "symbolLarge": "f",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-c",
      "title": "Memori Notasi C",
      "bookReference": "hlm. 43–46",
      "objective": "Memori.. Ingat Model Susunan Persegi Panjang. (Model Susunan Persegi Panjang)",
      "mechanicDescription": "Tiga ronde. Gunakan Model Susunan Persegi Panjang.",
      "voiceGuide": "Model Susunan Persegi Panjang. Mainkan dengan teliti.",
      "symbolLarge": "fak",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-c",
      "title": "Benar atau Salah: Faktor",
      "bookReference": "hlm. 43–46",
      "objective": "Menilai.. Ingat Model Susunan Persegi Panjang. (Model Susunan Persegi Panjang)",
      "mechanicDescription": "Dua ronde. Gunakan Model Susunan Persegi Panjang.",
      "voiceGuide": "Model Susunan Persegi Panjang. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-c",
      "title": "Detektif Faktor",
      "bookReference": "hlm. 43–46",
      "objective": "Petunjuk.. Ingat Model Susunan Persegi Panjang. (Model Susunan Persegi Panjang)",
      "mechanicDescription": "Tiga soal. Gunakan Model Susunan Persegi Panjang.",
      "voiceGuide": "Model Susunan Persegi Panjang. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-c",
      "title": "Peta Konsep Faktor",
      "bookReference": "hlm. 43–46",
      "objective": "Peta.. Ingat Model Susunan Persegi Panjang. (Model Susunan Persegi Panjang)",
      "mechanicDescription": "Satu peta. Gunakan Model Susunan Persegi Panjang.",
      "voiceGuide": "Model Susunan Persegi Panjang. Mainkan dengan teliti.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-c",
      "title": "Cerita Angka Faktor",
      "bookReference": "hlm. 43–46",
      "objective": "Cerita.. Ingat Model Susunan Persegi Panjang. (Model Susunan Persegi Panjang)",
      "mechanicDescription": "Tiga ronde. Gunakan Model Susunan Persegi Panjang.",
      "voiceGuide": "Model Susunan Persegi Panjang. Mainkan dengan teliti.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "🔗",
      "nama": "Pasangan",
      "isi": "Faktor datang berpasangan hasil kali n.",
      "suara": "Pasangan."
    },
    {
      "ikon": "🌈",
      "nama": "Diagram",
      "isi": "Pelangi pasangan mencegah ada yang terlewat.",
      "suara": "Diagram."
    },
    {
      "ikon": "▦",
      "nama": "Susunan",
      "isi": "Baris dan kolom array = faktor.",
      "suara": "Array."
    },
    {
      "ikon": "🚫",
      "nama": "Bukan kelipatan",
      "isi": "Faktor membagi ke dalam, bukan lompat keluar.",
      "suara": "Beda arah."
    }
  ],
  "poinSuara": "Cari pasangan faktor, gambar pelangi, cek dengan susunan.",
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
  "rumah": "Ayo Mencoba: terapkan Pasangan Faktor pada satu soal di rumah.",
  "refleksi": [
    "Bagaimana Pasangan Faktor membantumu?",
    "Kapan memakai Diagram Faktor?",
    "Apa bedanya dengan hanya menghafal rumus?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Factor Pairs",
      "namaId": "Pasangan Faktor",
      "asal": "Array / area model",
      "ringkas": "Faktor datang berpasangan yang hasil kalinya bilangan itu.",
      "tahap": [
        "Story",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Factor Rainbow",
      "namaId": "Diagram Faktor",
      "asal": "Visual organizers",
      "ringkas": "Gambar pelangi pasangan faktor dari kecil ke besar.",
      "tahap": [
        "Story",
        "Picture",
        "Infografis"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Array Model",
      "namaId": "Model Susunan Persegi Panjang",
      "asal": "Area model",
      "ringkas": "Baris×kolom yang membentuk n menunjukkan faktor.",
      "tahap": [
        "Story",
        "Mind",
        "Concrete"
      ]
    }
  ]
};

export const SUB_D52: SubBabNaskah = {
  "id": "D",
  "codeTitle": "Sub-Bab D (Faktor Persekutuan)",
  "fullTitle": "Sub-Bab D: Faktor Persekutuan dan FPB",
  "targetDescription": "Siswa menentukan faktor persekutuan dan FPB dua bilangan dengan daftar faktor bersama serta pengantar ide selisih sesuai Buku Siswa Kelas V Bab 2 Sub-Bab D.",
  "secondaryBg": "#FCE7F3",
  "secondaryBorder": "#DB2777",
  "secondaryText": "#9D174D",
  "silabus": {
    "teksSuara": "Kita mencari faktor yang sama dari dua bilangan. Irisannya disebut faktor persekutuan. Yang terbesar adalah FPB. Buat dua daftar faktor, cari irisan, ambil yang terbesar. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menentukan faktor persekutuan dan FPB dua bilangan.",
    "referensi": "Buku Siswa Matematika Kelas V Kemendikbudristek (Bab 2 Sub-Bab D)."
  },
  "videos": [],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Dua bilangan",
      "stepDesc": "Baca soal Faktor Persekutuan dan FPB dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. FPB a dan b? Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa menentukan faktor persekutuan dan FPB dua bilangan dengan daftar faktor bersama serta pengantar ide selisih sesuai….",
      "icon": "❓",
      "flowFrom": "Dua bilangan",
      "flowTo": "Faktor a"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Faktor a",
      "stepDesc": "Daftar faktor a. Pada Faktor Persekutuan dan FPB, langkah “Faktor a” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Daftar Faktor Persekutuan: Irisan dua daftar faktor = faktor persekutuan. FPB dari Irisan: FPB adalah faktor persekutuan terbesar. Ide Selisih / Sisa: FPB terka…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "📋",
      "flowFrom": "Faktor a",
      "flowTo": "Faktor b"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Faktor b",
      "stepDesc": "Daftar faktor b. Pada Faktor Persekutuan dan FPB, langkah “Faktor b” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Daftar Faktor Persekutuan: Irisan dua daftar faktor = faktor persekutuan. FPB dari Irisan: FPB adalah faktor persekutuan terbesar. Ide Selisih / Sisa: FPB terka…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "📋",
      "flowFrom": "Faktor b",
      "flowTo": "Irisan"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Irisan",
      "stepDesc": "Faktor yang sama. Pada Faktor Persekutuan dan FPB, langkah “Irisan” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Daftar Faktor Persekutuan: Irisan dua daftar faktor = faktor persekutuan. FPB dari Irisan: FPB adalah faktor persekutuan terbesar. Ide Selisih / Sisa: FPB terka…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "⋂",
      "flowFrom": "Irisan",
      "flowTo": "Terbesar"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Terbesar",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Faktor Persekutuan dan FPB. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "⭐",
      "flowFrom": "Terbesar",
      "flowTo": "Cek bagi"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek bagi",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Faktor Persekutuan dan FPB. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "➗",
      "flowFrom": "Cek bagi",
      "flowTo": "Bukan KPK"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Bukan KPK",
      "stepDesc": "Simpulkan ide utama Faktor Persekutuan dan FPB dengan kalimatmu sendiri. Sebutkan cara yang kamu pakai dan mengapa cara itu membantu. Jelaskan kepada teman seolah-olah kamu guru kecil. Simpulan yang jelas menandakan konsepnya sudah dipahami.",
      "icon": "🚫",
      "flowFrom": "Bukan KPK",
      "flowTo": "Main"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Main",
      "stepDesc": "Latih lagi di tahap Concrete, Picture, lalu Abstract untuk Faktor Persekutuan dan FPB. Mulai dari benda nyata, lanjut ke diagram, baru ke lambang angka. Ulangi sampai kamu bisa menjelaskan tanpa melihat contoh. Bermain sambil berlatih membuat konsepnya melekat lebih lama.",
      "icon": "🎮",
      "flowFrom": "Main",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "f12",
      "emoji": "📋",
      "countNum": 6,
      "countWord": "1..12",
      "suara": "f12 — 1..12. Pada Faktor Persekutuan dan FPB, cocokkan gambar “f12” dengan artinya (1..12), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Faktor Persekutuan dan FPB.",
      "teksVisual": "📋 f12: 1..12"
    },
    {
      "judul": "f18",
      "emoji": "📋",
      "countNum": 6,
      "countWord": "1..18",
      "suara": "f18 — 1..18. Pada Faktor Persekutuan dan FPB, cocokkan gambar “f18” dengan artinya (1..18), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Faktor Persekutuan dan FPB.",
      "teksVisual": "📋 f18: 1..18"
    },
    {
      "judul": "Irisan",
      "emoji": "⋂",
      "countNum": 4,
      "countWord": "1,2,3,6",
      "suara": "Irisan — 1,2,3,6. Pada Faktor Persekutuan dan FPB, cocokkan gambar “Irisan” dengan artinya (1,2,3,6), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Faktor Persekutuan dan…",
      "teksVisual": "⋂ Irisan: 1,2,3,6"
    },
    {
      "judul": "FPB",
      "emoji": "⭐",
      "countNum": 6,
      "countWord": "terbesar",
      "suara": "FPB — terbesar. Pada Faktor Persekutuan dan FPB, cocokkan gambar “FPB” dengan artinya (terbesar), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Faktor Persekutuan dan FPB.",
      "teksVisual": "⭐ FPB: terbesar"
    },
    {
      "judul": "Cerita kue",
      "emoji": "🍰",
      "countNum": 6,
      "countWord": "kotak",
      "suara": "Cerita kue — kotak. Mau membagi 12 kue dan 18 kue ke kotak sama besar tanpa sisa. Ukuran kotak terbesar? Itu FPB: pembagi terbesar bersama. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Faktor Persekutuan dan…",
      "teksVisual": "🍰 Cerita kue: kotak"
    },
    {
      "judul": "≠ KPK",
      "emoji": "🚫",
      "countNum": 1,
      "countWord": "beda",
      "suara": "≠ KPK — beda. Pada Faktor Persekutuan dan FPB, cocokkan gambar “≠ KPK” dengan artinya (beda), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Faktor Persekutuan dan FPB.",
      "teksVisual": "🚫 ≠ KPK: beda"
    },
    {
      "judul": "8&12",
      "emoji": "⭐",
      "countNum": 4,
      "countWord": "FPB",
      "suara": "Pada Faktor Persekutuan dan FPB, cocokkan gambar “8&12” dengan artinya (FPB), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Faktor Persekutuan dan FPB.",
      "teksVisual": "⭐ 8&12: FPB"
    },
    {
      "judul": "Selisih",
      "emoji": "➖",
      "countNum": 6,
      "countWord": "ide",
      "suara": "Selisih — ide. Pada Faktor Persekutuan dan FPB, cocokkan gambar “Selisih” dengan artinya (ide), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Faktor Persekutuan dan FPB.",
      "teksVisual": "➖ Selisih: ide"
    },
    {
      "judul": "Cek",
      "emoji": "➗",
      "countNum": 0,
      "countWord": "sisa",
      "suara": "Pada Faktor Persekutuan dan FPB, cocokkan gambar “Cek” dengan artinya (sisa), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Faktor Persekutuan dan FPB.",
      "teksVisual": "➗ Cek: sisa"
    },
    {
      "judul": "Siap E",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "prima",
      "suara": "Siap E — prima. FPB dan KPK siap di tingkat daftar. Sub-Bab E: faktor prima sebagai jalan pintas. Ingat: siap; E; tetap. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Faktor Persekutuan dan FPB.",
      "teksVisual": "➡️ Siap E: prima"
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "cek-persekutuan-f",
      "title": "Cek Faktor Persekutuan",
      "bookReference": "hlm. 46–49",
      "objective": "Cari irisan faktor. Latihan: Mengenali irisan faktor..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Daftar Faktor Persekutuan: Yang sama di kedua daftar.",
      "voiceGuide": "Daftar Faktor Persekutuan. Yang sama di kedua daftar.",
      "emoji": "🤝",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "hitung-fpb",
      "title": "Hitung FPB",
      "bookReference": "hlm. 48–52",
      "objective": "Cari irisan faktor. Latihan: Menemukan FPB..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Daftar Faktor Persekutuan: Yang sama di kedua daftar.",
      "voiceGuide": "Daftar Faktor Persekutuan. Yang sama di kedua daftar.",
      "emoji": "🏆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-fpb",
      "title": "Arti FPB",
      "bookReference": "hlm. 48–52",
      "objective": "Cari irisan faktor. Latihan: Definisi & pemakaian..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Daftar Faktor Persekutuan: Yang sama di kedua daftar.",
      "voiceGuide": "Daftar Faktor Persekutuan. Yang sama di kedua daftar.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-fpb",
      "title": "Pilah Faktor Persekutuan",
      "bookReference": "hlm. 46–49",
      "objective": "Cari irisan faktor. Latihan: Memilah..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Daftar Faktor Persekutuan: Yang sama di kedua daftar.",
      "voiceGuide": "Daftar Faktor Persekutuan. Yang sama di kedua daftar.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-fpb",
      "title": "Jodohkan FPB",
      "bookReference": "hlm. 48–52",
      "objective": "Menjodohkan.. Ingat Daftar Faktor Persekutuan. (Daftar Faktor Persekutuan)",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Faktor Persekutuan.",
      "voiceGuide": "Daftar Faktor Persekutuan. Mainkan dengan teliti.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-fpb",
      "title": "Memori FPB",
      "bookReference": "hlm. 48–52",
      "objective": "Memori.. Ingat Daftar Faktor Persekutuan. (Daftar Faktor Persekutuan)",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Faktor Persekutuan.",
      "voiceGuide": "Daftar Faktor Persekutuan. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-fpb",
      "title": "Ketuk Faktor Sama",
      "bookReference": "hlm. 46–49",
      "objective": "Mengetuk.. Ingat Daftar Faktor Persekutuan. (Daftar Faktor Persekutuan)",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Faktor Persekutuan.",
      "voiceGuide": "Daftar Faktor Persekutuan. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-fpb",
      "title": "Ketuk Semua Benar FPB",
      "bookReference": "hlm. 46–52",
      "objective": "Ketuk semua.. Ingat Daftar Faktor Persekutuan. (Daftar Faktor Persekutuan)",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Faktor Persekutuan.",
      "voiceGuide": "Daftar Faktor Persekutuan. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-fpb",
      "title": "Cerita Congklak dan Vas",
      "bookReference": "hlm. 46–52",
      "objective": "Soal cerita.. Ingat Daftar Faktor Persekutuan. (Daftar Faktor Persekutuan)",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Faktor Persekutuan.",
      "voiceGuide": "Daftar Faktor Persekutuan. Mainkan dengan teliti.",
      "emoji": "🌸",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-fpb",
      "title": "Urutkan Faktor Persekutuan",
      "bookReference": "hlm. 48–49",
      "objective": "Mengurutkan.. Ingat Daftar Faktor Persekutuan. (Daftar Faktor Persekutuan)",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Faktor Persekutuan.",
      "voiceGuide": "Daftar Faktor Persekutuan. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "diagram-irisan-f",
      "title": "Diagram Irisan Faktor",
      "bookReference": "hlm. 48–49",
      "objective": "Ambil irisan terbesar. Latihan: Baca irisan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat FPB dari Irisan: Itu FPB.",
      "voiceGuide": "FPB dari Irisan. Itu FPB.",
      "diagramType": "venn",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "diagram-fpb",
      "title": "Diagram FPB",
      "bookReference": "hlm. 48–52",
      "objective": "Ambil irisan terbesar. Latihan: Baca FPB..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat FPB dari Irisan: Itu FPB.",
      "voiceGuide": "FPB dari Irisan. Itu FPB.",
      "diagramType": "gcd",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-d",
      "title": "Jodohkan Diagram D",
      "bookReference": "hlm. 46–52",
      "objective": "Ambil irisan terbesar. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat FPB dari Irisan: Itu FPB.",
      "voiceGuide": "FPB dari Irisan. Itu FPB.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-d",
      "title": "Memori Diagram D",
      "bookReference": "hlm. 46–52",
      "objective": "Ambil irisan terbesar. Latihan: Memori..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat FPB dari Irisan: Itu FPB.",
      "voiceGuide": "FPB dari Irisan. Itu FPB.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-d",
      "title": "Tabel FPB",
      "bookReference": "hlm. 48–52",
      "objective": "Isi tabel.. Ingat FPB dari Faktor Prima. (FPB dari Irisan)",
      "mechanicDescription": "Tiga tabel. Gunakan FPB dari Faktor Prima.",
      "voiceGuide": "FPB dari Irisan. Mainkan dengan teliti.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-pd",
      "title": "Ketuk Semua Diagram D",
      "bookReference": "hlm. 46–52",
      "objective": "Ketuk semua.. Ingat FPB dari Faktor Prima. (FPB dari Irisan)",
      "mechanicDescription": "Tiga ronde. Gunakan FPB dari Faktor Prima.",
      "voiceGuide": "FPB dari Irisan. Mainkan dengan teliti.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-d",
      "title": "Pilah Diagram D",
      "bookReference": "hlm. 46–49",
      "objective": "Pilah.. Ingat FPB dari Faktor Prima. (FPB dari Irisan)",
      "mechanicDescription": "Tiga ronde. Gunakan FPB dari Faktor Prima.",
      "voiceGuide": "FPB dari Irisan. Mainkan dengan teliti.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "choose-d",
      "title": "Pilih Pernyataan D",
      "bookReference": "hlm. 46–52",
      "objective": "Pilih.. Ingat FPB dari Faktor Prima. (FPB dari Irisan)",
      "mechanicDescription": "Tiga ronde. Gunakan FPB dari Faktor Prima.",
      "voiceGuide": "FPB dari Irisan. Mainkan dengan teliti.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jenis-pd",
      "title": "Pilih Arti Diagram D",
      "bookReference": "hlm. 48–52",
      "objective": "Definisi.. Ingat FPB dari Faktor Prima. (FPB dari Irisan)",
      "mechanicDescription": "Tiga ronde. Gunakan FPB dari Faktor Prima.",
      "voiceGuide": "FPB dari Irisan. Mainkan dengan teliti.",
      "diagramType": "def",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-d",
      "title": "Cerita Diagram D",
      "bookReference": "hlm. 46–52",
      "objective": "Cerita.. Ingat FPB dari Faktor Prima. (FPB dari Irisan)",
      "mechanicDescription": "Tiga ronde. Gunakan FPB dari Faktor Prima.",
      "voiceGuide": "FPB dari Irisan. Mainkan dengan teliti.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-cek-fp",
      "title": "Tulis Cek Persekutuan",
      "bookReference": "hlm. 46–49",
      "objective": "Kenali pratinjau Euclid. Latihan: Menulis..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Ide Selisih / Sisa: Daftar tetap utama.",
      "voiceGuide": "Ide Selisih / Sisa. Daftar tetap utama.",
      "symbolLarge": "∈",
      "wordLarge": "CEK",
      "mathNotation": "irisan"
    },
    {
      "stage": "Abstract",
      "gameType": "write-fpb",
      "title": "Tulis Hasil FPB",
      "bookReference": "hlm. 48–52",
      "objective": "Kenali pratinjau Euclid. Latihan: Menulis FPB..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Ide Selisih / Sisa: Daftar tetap utama.",
      "voiceGuide": "Ide Selisih / Sisa. Daftar tetap utama.",
      "symbolLarge": "FPB",
      "wordLarge": "HASIL",
      "mathNotation": "gcd"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-def-d",
      "title": "Pilih Definisi FPB",
      "bookReference": "hlm. 48–52",
      "objective": "Kenali pratinjau Euclid. Latihan: Definisi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Ide Selisih / Sisa: Daftar tetap utama.",
      "voiceGuide": "Ide Selisih / Sisa. Daftar tetap utama.",
      "symbolLarge": "arti",
      "wordLarge": "DEFINISI",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-d",
      "title": "Urutkan Abstrak D",
      "bookReference": "hlm. 48–49",
      "objective": "Kenali pratinjau Euclid. Latihan: Urut..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Ide Selisih / Sisa: Daftar tetap utama.",
      "voiceGuide": "Ide Selisih / Sisa. Daftar tetap utama.",
      "symbolLarge": "naik",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-d",
      "title": "Jodohkan Notasi D",
      "bookReference": "hlm. 46–52",
      "objective": "Jodohkan.. Ingat Ide Selisih / Sisa. (Ide Selisih / Sisa)",
      "mechanicDescription": "Tiga ronde. Gunakan Ide Selisih / Sisa.",
      "voiceGuide": "Ide Selisih / Sisa. Mainkan dengan teliti.",
      "symbolLarge": "fpb",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-d",
      "title": "Memori Notasi D",
      "bookReference": "hlm. 46–52",
      "objective": "Memori.. Ingat Ide Selisih / Sisa. (Ide Selisih / Sisa)",
      "mechanicDescription": "Tiga ronde. Gunakan Ide Selisih / Sisa.",
      "voiceGuide": "Ide Selisih / Sisa. Mainkan dengan teliti.",
      "symbolLarge": "fpb",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-d",
      "title": "Benar atau Salah: FPB",
      "bookReference": "hlm. 46–52",
      "objective": "Menilai.. Ingat Ide Selisih / Sisa. (Ide Selisih / Sisa)",
      "mechanicDescription": "Dua ronde. Gunakan Ide Selisih / Sisa.",
      "voiceGuide": "Ide Selisih / Sisa. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-d",
      "title": "Detektif FPB",
      "bookReference": "hlm. 46–52",
      "objective": "Petunjuk.. Ingat Ide Selisih / Sisa. (Ide Selisih / Sisa)",
      "mechanicDescription": "Tiga soal. Gunakan Ide Selisih / Sisa.",
      "voiceGuide": "Ide Selisih / Sisa. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-d",
      "title": "Peta Konsep FPB",
      "bookReference": "hlm. 46–52",
      "objective": "Peta.. Ingat Ide Selisih / Sisa. (Ide Selisih / Sisa)",
      "mechanicDescription": "Satu peta. Gunakan Ide Selisih / Sisa.",
      "voiceGuide": "Ide Selisih / Sisa. Mainkan dengan teliti.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-d",
      "title": "Cerita Angka FPB",
      "bookReference": "hlm. 46–52",
      "objective": "Cerita.. Ingat Ide Selisih / Sisa. (Ide Selisih / Sisa)",
      "mechanicDescription": "Tiga ronde. Gunakan Ide Selisih / Sisa.",
      "voiceGuide": "Ide Selisih / Sisa. Mainkan dengan teliti.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "⋂",
      "nama": "Irisan faktor",
      "isi": "Faktor persekutuan = irisan daftar faktor.",
      "suara": "Irisan."
    },
    {
      "ikon": "⭐",
      "nama": "FPB",
      "isi": "FPB = faktor persekutuan terbesar.",
      "suara": "Terbesar."
    },
    {
      "ikon": "🚫",
      "nama": "Bukan KPK",
      "isi": "KPK dari kelipatan; FPB dari faktor.",
      "suara": "Jangan tertukar."
    },
    {
      "ikon": "➗",
      "nama": "Cek",
      "isi": "FPB harus membagi habis keduanya.",
      "suara": "Cek bagi."
    }
  ],
  "poinSuara": "Irisan faktor, ambil terbesar, cek pembagian, jangan tertukar KPK.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Daftar faktor",
        "warna": "#FDE68A"
      },
      {
        "teks": "tandai yang sama",
        "warna": "#BBF7D0"
      },
      {
        "teks": "ambil terbesar",
        "warna": "#BFDBFE"
      },
      {
        "teks": "bagi rata",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba: terapkan Daftar Faktor Persekutuan pada satu soal di rumah.",
  "refleksi": [
    "Bagaimana Daftar Faktor Persekutuan membantumu?",
    "Kapan memakai FPB dari Irisan?",
    "Apa bedanya dengan hanya menghafal rumus?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Common Factors List",
      "namaId": "Daftar Faktor Persekutuan",
      "asal": "Singapore / US",
      "ringkas": "Irisan dua daftar faktor = faktor persekutuan.",
      "tahap": [
        "Story",
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "GCF Concept",
      "namaId": "FPB dari Irisan",
      "asal": "Number sense",
      "ringkas": "FPB adalah faktor persekutuan terbesar.",
      "tahap": [
        "Story",
        "Mind",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Euclid Preview",
      "namaId": "Ide Selisih / Sisa",
      "asal": "Euclidean algorithm intro",
      "ringkas": "FPB terkait sisa pembagian; hari ini kuasai daftar dulu.",
      "tahap": [
        "Story",
        "Infografis"
      ]
    }
  ]
};

export const SUB_E52: SubBabNaskah = {
  "id": "E",
  "codeTitle": "Sub-Bab E (Faktor Prima)",
  "fullTitle": "Sub-Bab E: Menentukan KPK dan FPB dengan Faktor Prima",
  "targetDescription": "Siswa menentukan KPK dan FPB dengan faktorisasi prima, pohon faktor, dan jembatan hubungan KPK–FPB sesuai Buku Siswa Kelas V Bab 2 Sub-Bab E.",
  "secondaryBg": "#EDE9FE",
  "secondaryBorder": "#7C3AED",
  "secondaryText": "#5B21B6",
  "silabus": {
    "teksSuara": "Kita memecah bilangan jadi faktor prima dengan pohon faktor. FPB memakai pangkat terkecil yang sama. KPK memakai pangkat terbesar tiap prima. Ini jalan pintas dari daftar panjang. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menentukan KPK dan FPB dengan faktor prima.",
    "referensi": "Buku Siswa Matematika Kelas V Kemendikbudristek (Bab 2 Sub-Bab E)."
  },
  "videos": [],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Urai pohon",
      "stepDesc": "Baca soal Menentukan KPK dan FPB dengan Faktor Prima dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Pecah sampai prima. Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa menentukan KPK dan FPB dengan faktorisasi prima, pohon faktor, dan jembatan hubungan KPK–FPB sesuai Buku Siswa Kel….",
      "icon": "🌳",
      "flowFrom": "Urai pohon",
      "flowTo": "Tulis pangkat"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Tulis pangkat",
      "stepDesc": "n = p^a × q^b …. Pada Menentukan KPK dan FPB dengan Faktor Prima, langkah “Tulis pangkat” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Pohon Faktor: Urai bilangan sampai semua daunnya bilangan prima. Ide Ayakan Prima: FPB: pangkat min. KPK: pangkat max tiap prima. Jembatan KPK dan FPB: Untuk du…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "✍️",
      "flowFrom": "Tulis pangkat",
      "flowTo": "FPB = min"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. FPB = min",
      "stepDesc": "Pangkat terkecil yang sama. Pada Menentukan KPK dan FPB dengan Faktor Prima, langkah “FPB = min” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Pohon Faktor: Urai bilangan sampai semua daunnya bilangan prima. Ide Ayakan Prima: FPB: pangkat min. KPK: pangkat max tiap prima. Jembatan KPK dan FPB: Untuk du…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "⬇️",
      "flowFrom": "FPB = min",
      "flowTo": "KPK = max"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. KPK = max",
      "stepDesc": "Pangkat terbesar tiap prima. Pada Menentukan KPK dan FPB dengan Faktor Prima, langkah “KPK = max” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Pohon Faktor: Urai bilangan sampai semua daunnya bilangan prima. Ide Ayakan Prima: FPB: pangkat min. KPK: pangkat max tiap prima. Jembatan KPK dan FPB: Untuk du…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "⬆️",
      "flowFrom": "KPK = max",
      "flowTo": "Hitung"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Hitung",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Menentukan KPK dan FPB dengan Faktor Prima. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "🔢",
      "flowFrom": "Hitung",
      "flowTo": "Jembatan"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Jembatan",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Menentukan KPK dan FPB dengan Faktor Prima. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "🌉",
      "flowFrom": "Jembatan",
      "flowTo": "Cek masuk akal"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Cek masuk akal",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Menentukan KPK dan FPB dengan Faktor Prima. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Cek masuk akal",
      "flowTo": "Bab 2 utuh"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Bab 2 utuh",
      "stepDesc": "Latih lagi di tahap Concrete, Picture, lalu Abstract untuk Menentukan KPK dan FPB dengan Faktor Prima. Mulai dari benda nyata, lanjut ke diagram, baru ke lambang angka. Ulangi sampai kamu bisa menjelaskan tanpa melihat contoh. Bermain sambil berlatih membuat konsepnya melekat lebih lama.",
      "icon": "🎉",
      "flowFrom": "Bab 2 utuh",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Pohon",
      "emoji": "🌳",
      "countNum": 1,
      "countWord": "ke prima",
      "suara": "Pohon — ke prima. Pada Menentukan KPK dan FPB dengan Faktor Prima, cocokkan gambar “Pohon” dengan artinya (ke prima), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🌳 Pohon: ke prima"
    },
    {
      "judul": "12",
      "emoji": "🔢",
      "countNum": 1,
      "countWord": "2²×3",
      "suara": "12 = 2×6, lalu 6 = 2×3. Daun: 2, 2, 3. Semua prima. Tulis 12 = 2² × 3. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Menentukan KPK dan FPB dengan Faktor Prima.",
      "teksVisual": "🔢 12: 2²×3"
    },
    {
      "judul": "18",
      "emoji": "🔢",
      "countNum": 1,
      "countWord": "2×3²",
      "suara": "Pada Menentukan KPK dan FPB dengan Faktor Prima, cocokkan gambar “18” dengan artinya (2×3²), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Menentukan KPK dan FPB dengan…",
      "teksVisual": "🔢 18: 2×3²"
    },
    {
      "judul": "FPB min",
      "emoji": "⬇️",
      "countNum": 6,
      "countWord": "2×3",
      "suara": "FPB min — 2×3. Pada Menentukan KPK dan FPB dengan Faktor Prima, cocokkan gambar “FPB min” dengan artinya (2×3), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Menentukan…",
      "teksVisual": "⬇️ FPB min: 2×3"
    },
    {
      "judul": "KPK max",
      "emoji": "⬆️",
      "countNum": 36,
      "countWord": "2²×3²",
      "suara": "KPK max — 2²×3². Pada Menentukan KPK dan FPB dengan Faktor Prima, cocokkan gambar “KPK max” dengan artinya (2²×3²), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "⬆️ KPK max: 2²×3²"
    },
    {
      "judul": "Jembatan",
      "emoji": "🌉",
      "countNum": 216,
      "countWord": "6×36",
      "suara": "Jembatan — 6×36. Untuk dua bilangan a dan b: FPB×KPK = a×b. Contoh: 6×36=216 dan 12×18=216. Ingat: jembatan; cek 216; cek. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Menentukan KPK dan FPB dengan Faktor…",
      "teksVisual": "🌉 Jembatan: 6×36"
    },
    {
      "judul": "Min≠Max",
      "emoji": "🚫",
      "countNum": 1,
      "countWord": "jangan",
      "suara": "Min≠Max — jangan. Pada Menentukan KPK dan FPB dengan Faktor Prima, cocokkan gambar “Min≠Max” dengan artinya (jangan), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🚫 Min≠Max: jangan"
    },
    {
      "judul": "Prima",
      "emoji": "⭐",
      "countNum": 1,
      "countWord": "daun",
      "suara": "Prima — daun. 12=2²×3 dan 18=2×3². Prima yang sama: 2 dan 3. Ambil pangkat terkecil: 2¹ dan 3¹. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Menentukan KPK dan FPB dengan Faktor Prima.",
      "teksVisual": "⭐ Prima: daun"
    },
    {
      "judul": "Daftar=Prima",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "sama",
      "suara": "Daftar=Prima — sama. Pada Menentukan KPK dan FPB dengan Faktor Prima, cocokkan gambar “Daftar=Prima” dengan artinya (sama), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "✅ Daftar=Prima: sama"
    },
    {
      "judul": "Bab 2",
      "emoji": "🎉",
      "countNum": 1,
      "countWord": "siap",
      "suara": "Bab 2 — siap. Pada Menentukan KPK dan FPB dengan Faktor Prima, cocokkan gambar “Bab 2” dengan artinya (siap), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Menentukan KPK…",
      "teksVisual": "🎉 Bab 2: siap"
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "cek-prima",
      "title": "Cek Bilangan Prima",
      "bookReference": "hlm. 53–54",
      "objective": "Urai sampai prima. Latihan: Mengenali prima..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pohon Faktor: Daun harus prima.",
      "voiceGuide": "Pohon Faktor. Daun harus prima.",
      "emoji": "✨",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "faktorisasi",
      "title": "Faktorisasi Prima",
      "bookReference": "hlm. 55–56",
      "objective": "Urai sampai prima. Latihan: Menulis hasil kali prima..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pohon Faktor: Daun harus prima.",
      "voiceGuide": "Pohon Faktor. Daun harus prima.",
      "emoji": "🌳",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "kpk-fpb-prima",
      "title": "KPK & FPB via Prima",
      "bookReference": "hlm. 56–59",
      "objective": "Urai sampai prima. Latihan: Hitung lewat faktorisasi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pohon Faktor: Daun harus prima.",
      "voiceGuide": "Pohon Faktor. Daun harus prima.",
      "emoji": "🧮",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-prima",
      "title": "Arti Prima & Cara",
      "bookReference": "hlm. 53–59",
      "objective": "Urai sampai prima. Latihan: Definisi & metode..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Pohon Faktor: Daun harus prima.",
      "voiceGuide": "Pohon Faktor. Daun harus prima.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-prima",
      "title": "Pilah Prima",
      "bookReference": "hlm. 53–54",
      "objective": "Memilah.. Ingat Pohon Faktor. (Pohon Faktor)",
      "mechanicDescription": "Tiga ronde. Gunakan Pohon Faktor.",
      "voiceGuide": "Pohon Faktor. Mainkan dengan teliti.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-prima",
      "title": "Jodohkan Prima/Faktorisasi",
      "bookReference": "hlm. 53–59",
      "objective": "Menjodohkan.. Ingat Pohon Faktor. (Pohon Faktor)",
      "mechanicDescription": "Tiga ronde. Gunakan Pohon Faktor.",
      "voiceGuide": "Pohon Faktor. Mainkan dengan teliti.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-prima",
      "title": "Memori Prima",
      "bookReference": "hlm. 53–59",
      "objective": "Memori.. Ingat Pohon Faktor. (Pohon Faktor)",
      "mechanicDescription": "Tiga ronde. Gunakan Pohon Faktor.",
      "voiceGuide": "Pohon Faktor. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-prima",
      "title": "Ketuk Prima/Hasil",
      "bookReference": "hlm. 53–59",
      "objective": "Mengetuk.. Ingat Pohon Faktor. (Pohon Faktor)",
      "mechanicDescription": "Tiga ronde. Gunakan Pohon Faktor.",
      "voiceGuide": "Pohon Faktor. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-prima",
      "title": "Ketuk Semua Benar Prima",
      "bookReference": "hlm. 53–59",
      "objective": "Ketuk semua.. Ingat Pohon Faktor. (Pohon Faktor)",
      "mechanicDescription": "Tiga ronde. Gunakan Pohon Faktor.",
      "voiceGuide": "Pohon Faktor. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-prima",
      "title": "Cerita Saringan & Pohon",
      "bookReference": "hlm. 53–59",
      "objective": "Soal cerita.. Ingat Pohon Faktor. (Pohon Faktor)",
      "mechanicDescription": "Tiga ronde. Gunakan Pohon Faktor.",
      "voiceGuide": "Pohon Faktor. Mainkan dengan teliti.",
      "emoji": "🔍",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "diagram-saringan",
      "title": "Diagram Saringan",
      "bookReference": "hlm. 53–54",
      "objective": "FPB min, KPK max. Latihan: Baca saringan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Ide Ayakan Prima: Jangan tertukar.",
      "voiceGuide": "Ide Ayakan Prima. Jangan tertukar.",
      "diagramType": "sieve",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "diagram-pohon",
      "title": "Diagram Pohon Faktor",
      "bookReference": "hlm. 55–56",
      "objective": "FPB min, KPK max. Latihan: Baca pohon..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Ide Ayakan Prima: Jangan tertukar.",
      "voiceGuide": "Ide Ayakan Prima. Jangan tertukar.",
      "diagramType": "tree",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "diagram-kpkfpb",
      "title": "Diagram KPK/FPB Prima",
      "bookReference": "hlm. 56–59",
      "objective": "FPB min, KPK max. Latihan: Baca hasil..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Ide Ayakan Prima: Jangan tertukar.",
      "voiceGuide": "Ide Ayakan Prima. Jangan tertukar.",
      "diagramType": "lcmgcd",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-e",
      "title": "Jodohkan Diagram E",
      "bookReference": "hlm. 53–59",
      "objective": "FPB min, KPK max. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Ide Ayakan Prima: Jangan tertukar.",
      "voiceGuide": "Ide Ayakan Prima. Jangan tertukar.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-e",
      "title": "Memori Diagram E",
      "bookReference": "hlm. 53–59",
      "objective": "Memori.. Ingat Ide Ayakan Prima. (Ide Ayakan Prima)",
      "mechanicDescription": "Tiga ronde. Gunakan Ide Ayakan Prima.",
      "voiceGuide": "Ide Ayakan Prima. Mainkan dengan teliti.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-e",
      "title": "Tabel Prima & KPK/FPB",
      "bookReference": "hlm. 53–59",
      "objective": "Isi tabel.. Ingat Ide Ayakan Prima. (Ide Ayakan Prima)",
      "mechanicDescription": "Tiga tabel. Gunakan Ide Ayakan Prima.",
      "voiceGuide": "Ide Ayakan Prima. Mainkan dengan teliti.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-pe",
      "title": "Ketuk Semua Diagram E",
      "bookReference": "hlm. 53–59",
      "objective": "Ketuk semua.. Ingat Ide Ayakan Prima. (Ide Ayakan Prima)",
      "mechanicDescription": "Tiga ronde. Gunakan Ide Ayakan Prima.",
      "voiceGuide": "Ide Ayakan Prima. Mainkan dengan teliti.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-e",
      "title": "Pilah Diagram E",
      "bookReference": "hlm. 53–54",
      "objective": "Pilah.. Ingat Ide Ayakan Prima. (Ide Ayakan Prima)",
      "mechanicDescription": "Tiga ronde. Gunakan Ide Ayakan Prima.",
      "voiceGuide": "Ide Ayakan Prima. Mainkan dengan teliti.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "choose-e",
      "title": "Pilih Pernyataan E",
      "bookReference": "hlm. 53–59",
      "objective": "Pilih.. Ingat Ide Ayakan Prima. (Ide Ayakan Prima)",
      "mechanicDescription": "Tiga ronde. Gunakan Ide Ayakan Prima.",
      "voiceGuide": "Ide Ayakan Prima. Mainkan dengan teliti.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-e",
      "title": "Cerita Diagram E",
      "bookReference": "hlm. 53–59",
      "objective": "Cerita.. Ingat Ide Ayakan Prima. (Ide Ayakan Prima)",
      "mechanicDescription": "Tiga ronde. Gunakan Ide Ayakan Prima.",
      "voiceGuide": "Ide Ayakan Prima. Mainkan dengan teliti.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-prima",
      "title": "Tulis Cek Prima",
      "bookReference": "hlm. 53–54",
      "objective": "Cek FPB×KPK = a×b. Latihan: Menulis..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Jembatan KPK dan FPB: Cocokkan hasil.",
      "voiceGuide": "Jembatan KPK dan FPB. Cocokkan hasil.",
      "symbolLarge": "p?",
      "wordLarge": "PRIMA",
      "mathNotation": "cek"
    },
    {
      "stage": "Abstract",
      "gameType": "write-fakt",
      "title": "Tulis Faktorisasi",
      "bookReference": "hlm. 55–56",
      "objective": "Cek FPB×KPK = a×b. Latihan: Menulis uraian..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Jembatan KPK dan FPB: Cocokkan hasil.",
      "voiceGuide": "Jembatan KPK dan FPB. Cocokkan hasil.",
      "symbolLarge": "2×3",
      "wordLarge": "FAKTORISASI",
      "mathNotation": "pohon"
    },
    {
      "stage": "Abstract",
      "gameType": "write-kpkfpb",
      "title": "Tulis KPK/FPB Prima",
      "bookReference": "hlm. 56–59",
      "objective": "Cek FPB×KPK = a×b. Latihan: Menulis hasil..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Jembatan KPK dan FPB: Cocokkan hasil.",
      "voiceGuide": "Jembatan KPK dan FPB. Cocokkan hasil.",
      "symbolLarge": "KPK/FPB",
      "wordLarge": "HASIL",
      "mathNotation": "prima"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-e",
      "title": "Urutkan Abstrak E",
      "bookReference": "hlm. 53–59",
      "objective": "Cek FPB×KPK = a×b. Latihan: Urut..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Jembatan KPK dan FPB: Cocokkan hasil.",
      "voiceGuide": "Jembatan KPK dan FPB. Cocokkan hasil.",
      "symbolLarge": "naik",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-e",
      "title": "Jodohkan Notasi E",
      "bookReference": "hlm. 53–59",
      "objective": "Jodohkan.. Ingat Jembatan KPK dan FPB. (Jembatan KPK dan FPB)",
      "mechanicDescription": "Tiga ronde. Gunakan Jembatan KPK dan FPB.",
      "voiceGuide": "Jembatan KPK dan FPB. Mainkan dengan teliti.",
      "symbolLarge": "p",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-e",
      "title": "Memori Notasi E",
      "bookReference": "hlm. 53–59",
      "objective": "Memori.. Ingat Jembatan KPK dan FPB. (Jembatan KPK dan FPB)",
      "mechanicDescription": "Tiga ronde. Gunakan Jembatan KPK dan FPB.",
      "voiceGuide": "Jembatan KPK dan FPB. Mainkan dengan teliti.",
      "symbolLarge": "prima",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-e",
      "title": "Benar atau Salah: Prima",
      "bookReference": "hlm. 53–59",
      "objective": "Menilai.. Ingat Jembatan KPK dan FPB. (Jembatan KPK dan FPB)",
      "mechanicDescription": "Dua ronde. Gunakan Jembatan KPK dan FPB.",
      "voiceGuide": "Jembatan KPK dan FPB. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-e",
      "title": "Detektif Prima",
      "bookReference": "hlm. 53–59",
      "objective": "Petunjuk.. Ingat Jembatan KPK dan FPB. (Jembatan KPK dan FPB)",
      "mechanicDescription": "Tiga soal. Gunakan Jembatan KPK dan FPB.",
      "voiceGuide": "Jembatan KPK dan FPB. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-e",
      "title": "Peta Konsep Prima",
      "bookReference": "hlm. 53–59",
      "objective": "Peta.. Ingat Jembatan KPK dan FPB. (Jembatan KPK dan FPB)",
      "mechanicDescription": "Satu peta. Gunakan Jembatan KPK dan FPB.",
      "voiceGuide": "Jembatan KPK dan FPB. Mainkan dengan teliti.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-e",
      "title": "Cerita Angka Prima",
      "bookReference": "hlm. 53–59",
      "objective": "Cerita.. Ingat Jembatan KPK dan FPB. (Jembatan KPK dan FPB)",
      "mechanicDescription": "Tiga ronde. Gunakan Jembatan KPK dan FPB.",
      "voiceGuide": "Jembatan KPK dan FPB. Mainkan dengan teliti.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "🌳",
      "nama": "Pohon faktor",
      "isi": "Urai sampai semua daun prima.",
      "suara": "Pohon."
    },
    {
      "ikon": "⬇️",
      "nama": "FPB = min",
      "isi": "Pangkat terkecil prima bersama.",
      "suara": "Min."
    },
    {
      "ikon": "⬆️",
      "nama": "KPK = max",
      "isi": "Pangkat terbesar tiap prima.",
      "suara": "Max."
    },
    {
      "ikon": "🌉",
      "nama": "Jembatan",
      "isi": "FPB×KPK = a×b untuk dua bilangan.",
      "suara": "Cek."
    }
  ],
  "poinSuara": "Pohon ke prima, FPB pangkat min, KPK pangkat max, cek jembatan.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Saring prima",
        "warna": "#FDE68A"
      },
      {
        "teks": "buat pohon",
        "warna": "#BBF7D0"
      },
      {
        "teks": "tulis faktorisasi",
        "warna": "#BFDBFE"
      },
      {
        "teks": "ambil min/max",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba: terapkan Pohon Faktor pada satu soal di rumah.",
  "refleksi": [
    "Bagaimana Pohon Faktor membantumu?",
    "Kapan memakai Ide Ayakan Prima?",
    "Apa bedanya dengan hanya menghafal rumus?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Factor Tree",
      "namaId": "Pohon Faktor",
      "asal": "Prime factorization",
      "ringkas": "Urai bilangan sampai semua daunnya bilangan prima.",
      "tahap": [
        "Story",
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Prime Exponent Rules",
      "namaId": "Ide Ayakan Prima",
      "asal": "LCM/GCF algorithms",
      "ringkas": "FPB: pangkat min. KPK: pangkat max tiap prima.",
      "tahap": [
        "Story",
        "Mind",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "LCM-GCF Bridge",
      "namaId": "Jembatan KPK dan FPB",
      "asal": "Number relations",
      "ringkas": "Untuk dua bilangan, FPB×KPK = hasil kali keduanya (cek berguna).",
      "tahap": [
        "Story",
        "Infografis",
        "Abstract"
      ]
    }
  ]
};

export const SUB_BAB_K5B2: SubBabNaskah[] = [SUB_A52, SUB_B52, SUB_C52, SUB_D52, SUB_E52];
export const semuaAdeganK5B2 = SUB_BAB_K5B2.flatMap((s) => s.videos.flatMap((v) => v.adegan));
