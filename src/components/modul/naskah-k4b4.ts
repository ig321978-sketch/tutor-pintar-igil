/**
 * Naskah — poles kerapatan setara K5B4.
 * Metode luar dianyam ketukan per ketukan.
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
  "targetDescription": "Siswa mengukur dan menduga luas dengan satuan tidak baku (uang kertas, origami, buku) dan satuan baku (cm², m²), menghitung persegi satuan, serta mengonversi 1 m² = 10.000 cm² sesuai Buku Siswa Kelas IV Bab 4. Siswa memakai cara Luas sebagai Menutupi, Luas Susunan, Tak Baku ke Baku. Siswa memakai cara Luas sebagai Menutupi, Luas Susunan, Tak Baku ke Baku.",
  "secondaryBg": "#FFEDD5",
  "secondaryBorder": "#EA580C",
  "secondaryText": "#7C2D12",
  "silabus": {
    "teksSuara": "Kita belajar pengukuran luas. Helen menutup meja dengan uang kertas tanpa celah. Itu satuan tidak baku. Lalu kita pakai persegi satu sentimeter dan satu meter sebagai satuan baku. Satu meter persegi sama dengan sepuluh ribu sentimeter persegi. Kita memakai cara: Luas sebagai Menutupi, Luas Susunan, Tak Baku ke Baku. Luas = banyak satuan persegi yang menutupi daerah. Panjang × lebar untuk persegi panjang. Mulai satuan tak baku, lalu cm²/m². Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa mengukur dan menduga luas dengan satuan baku dan tidak baku.",
    "referensi": "Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 4 Sub-Bab A)."
  },
  "videos": [
    {
      "id": "K4B4A-V1",
      "judul": "Meja dan Uang Kertas",
      "subjudul": "Area as Covering",
      "adegan": [
        {
          "id": "K4B4A-V1-1",
          "judul": "Meja beda ukuran",
          "ketukan": [
            "Bayangkan kamu sedang mempelajari Pengukuran Luas. Helen melihat meja lipat kecil.",
            "Meja guru lebih luas.",
            "Bagaimana mengukur luasnya.",
            "Ingat cara Luas sebagai Menutupi: Luas = banyak satuan persegi yang menutupi daerah. Ingat cara Luas sebagai Menutupi: Luas = banyak satuan persegi yang menutupi daerah."
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
            "Di sini kita memakai ide Area as Covering — Luas = banyak satuan persegi yang menutupi daerah. Di sini kita memakai Area as Covering. Luas = banyak satuan persegi yang menutupi daerah."
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
            "METODE LUAR · Luas sebagai Menutupi: Luas = banyak satuan persegi yang menutupi daerah."
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
      "judul": "Latihan: Luas Susunan",
      "subjudul": "Array Area",
      "adegan": [
        {
          "id": "K4B4A-V2-1",
          "judul": "Persegi 1 cm",
          "ketukan": [
            "Ambil persegi sisi satu sentimeter.",
            "Luasnya satu sentimeter persegi.",
            "Ditulis satu cm persegi.",
            "Ingat cara Luas Susunan: Panjang × lebar untuk persegi panjang. Ingat cara Luas Susunan: Panjang × lebar untuk persegi panjang."
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
            "Untuk lapangan yang besar,.",
            "pakai persegi sisi satu meter.",
            "Luasnya satu meter persegi.",
            "Di sini kita memakai ide Array Area — Panjang × lebar untuk persegi panjang. Di sini kita memakai Array Area. Panjang × lebar untuk persegi panjang."
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
            "METODE LUAR · Luas Susunan: Panjang × lebar untuk persegi panjang."
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
      "judul": "Siap pakai Nonstandard then Standard",
      "subjudul": "Nonstandard then Standard",
      "adegan": [
        {
          "id": "K4B4A-V3-1",
          "judul": "1 m = 100 cm",
          "ketukan": [
            "Satu meter sama dengan seratus cm.",
            "Untuk luas, kalikan panjang dan lebar.",
            "Seratus kali seratus.",
            "Ingat cara Tak Baku ke Baku: Mulai satuan tak baku, lalu cm²/m². Ingat cara Tak Baku ke Baku: Mulai satuan tak baku, lalu cm²/m²."
          ],
          "papan": [
            "100 cm",
            "100",
            "10.000",
            "tak"
          ]
        },
        {
          "id": "K4B4A-V3-2",
          "judul": "Rumus baku",
          "ketukan": [
            "Perhatikan ini: Jadi satu meter persegi. Itu bagian penting dari Pengukuran Luas.",
            "sama dengan sepuluh ribu cm persegi.",
            "Ingat angka ini.",
            "Di sini kita memakai ide Nonstandard then Standard — Mulai satuan tak baku, lalu cm²/m². Di sini kita memakai Nonstandard then Standard. Mulai satuan tak baku, lalu cm²/m²."
          ],
          "papan": [
            "1 m²",
            "10.000 cm²",
            "ingat",
            "tak"
          ]
        },
        {
          "id": "K4B4A-V3-3",
          "judul": "Siap berlatih",
          "ketukan": [
            "Kamu sudah siap mengukur luas.",
            "Pilih satuan yang cocok.",
            "Hitung persegi satuan.",
            "METODE LUAR · Tak Baku ke Baku: Mulai satuan tak baku, lalu cm²/m²."
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
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Pengukuran Luas dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa mengukur dan menduga luas dengan satuan tidak baku (uang kertas, origami, buku) dan satuan baku (cm², m²), menghit….",
      "icon": "❓",
      "flowFrom": "Pahami soal",
      "flowTo": "Area as Covering"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Area as Covering",
      "stepDesc": "Luas = banyak satuan persegi yang menutupi daerah. Pada Pengukuran Luas, langkah “Area as Covering” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Luas sebagai Menutupi: Luas = banyak satuan persegi yang menutupi daerah. Luas Susunan: Panjang × lebar untuk persegi panjang. Tak Baku ke Baku: Mulai satuan ta…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🧭",
      "flowFrom": "Area as Covering",
      "flowTo": "Array Area"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Array Area",
      "stepDesc": "Panjang × lebar untuk persegi panjang. Pada Pengukuran Luas, langkah “Array Area” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Luas sebagai Menutupi: Luas = banyak satuan persegi yang menutupi daerah. Luas Susunan: Panjang × lebar untuk persegi panjang. Tak Baku ke Baku: Mulai satuan ta…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🛠️",
      "flowFrom": "Array Area",
      "flowTo": "Nonstandard then Standard"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Nonstandard then Standard",
      "stepDesc": "Mulai satuan tak baku, lalu cm²/m². Pada Pengukuran Luas, langkah “Nonstandard then Standard” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Luas sebagai Menutupi: Luas = banyak satuan persegi yang menutupi daerah. Luas Susunan: Panjang × lebar untuk persegi panjang. Tak Baku ke Baku: Mulai satuan ta…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "✨",
      "flowFrom": "Nonstandard then Standard",
      "flowTo": "Kerjakan"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Kerjakan",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Pengukuran Luas. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "✏️",
      "flowFrom": "Kerjakan",
      "flowTo": "Cek masuk akal"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek masuk akal",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Pengukuran Luas. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Cek masuk akal",
      "flowTo": "Simpulkan"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Simpulkan",
      "stepDesc": "Simpulkan ide utama Pengukuran Luas dengan kalimatmu sendiri. Sebutkan cara yang kamu pakai dan mengapa cara itu membantu. Jelaskan kepada teman seolah-olah kamu guru kecil. Simpulan yang jelas menandakan konsepnya sudah dipahami.",
      "icon": "💬",
      "flowFrom": "Simpulkan",
      "flowTo": "Main"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Main",
      "stepDesc": "Latih lagi di tahap Concrete, Picture, lalu Abstract untuk Pengukuran Luas. Mulai dari benda nyata, lanjut ke diagram, baru ke lambang angka. Ulangi sampai kamu bisa menjelaskan tanpa melihat contoh. Bermain sambil berlatih membuat konsepnya melekat lebih lama.",
      "icon": "🎮",
      "flowFrom": "Main",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Tutup permukaan",
      "emoji": "🟧",
      "countNum": 1,
      "countWord": "tanpa celah",
      "suara": "Luas menutup permukaan tanpa celah. Pada Pengukuran Luas, cocokkan gambar “Tutup permukaan” dengan artinya (tanpa celah), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🟧 Tutup permukaan: tanpa celah"
    },
    {
      "judul": "Tidak baku",
      "emoji": "💵",
      "countNum": 1,
      "countWord": "uang kertas",
      "suara": "Uang kertas contoh satuan tidak baku. Pada Pengukuran Luas, cocokkan gambar “Tidak baku” dengan artinya (uang kertas), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "💵 Tidak baku: uang kertas"
    },
    {
      "judul": "1 cm²",
      "emoji": "📏",
      "countNum": 1,
      "countWord": "baku kecil",
      "suara": "Satu cm kali satu cm sama dengan satu cm persegi. Ambil persegi sisi satu sentimeter. Luasnya satu sentimeter persegi. Ingat: 1 cm; 1 cm²; baku. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Pengukuran Luas.",
      "teksVisual": "📏 Satu cm kali satu cm sama dengan satu cm persegi."
    },
    {
      "judul": "1 m²",
      "emoji": "🏟️",
      "countNum": 1,
      "countWord": "baku besar",
      "suara": "Satu m kali satu m sama dengan satu m persegi. Untuk lapangan yang besar,. pakai persegi sisi satu meter. Ingat: 1 m; 1 m²; lapangan. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Pengukuran Luas.",
      "teksVisual": "🏟️ Satu m kali satu m sama dengan satu m persegi."
    },
    {
      "judul": "10.000",
      "emoji": "🔄",
      "countNum": 10000,
      "countWord": "cm²",
      "suara": "Satu m persegi sama dengan sepuluh ribu cm persegi. Pada Pengukuran Luas, cocokkan gambar “10.000” dengan artinya (cm²), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🔄 Satu m persegi sama dengan sepuluh ribu cm persegi."
    },
    {
      "judul": "13 cm²",
      "emoji": "🧩",
      "countNum": 13,
      "countWord": "contoh buku",
      "suara": "Dua bangun berbeda bisa sama-sama tiga belas cm persegi. Pada Pengukuran Luas, cocokkan gambar “13 cm²” dengan artinya (contoh buku), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🧩 Dua bangun berbeda bisa sama-sama tiga belas cm…"
    },
    {
      "judul": "4 satuan",
      "emoji": "📄",
      "countNum": 4,
      "countWord": "lipat",
      "suara": "Aktivitas lipat nomor lima menghasilkan empat persegi satuan. Pada Pengukuran Luas, cocokkan gambar “4 satuan” dengan artinya (lipat), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "📄 Aktivitas lipat nomor lima menghasilkan empat persegi…"
    },
    {
      "judul": "16 satuan",
      "emoji": "📄",
      "countNum": 16,
      "countWord": "lipat",
      "suara": "Aktivitas lipat nomor enam menghasilkan enam belas persegi satuan. Pada Pengukuran Luas, cocokkan gambar “16 satuan” dengan artinya (lipat), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "📄 Aktivitas lipat nomor enam menghasilkan enam belas…"
    },
    {
      "judul": "Pilih satuan",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "cocok",
      "suara": "Pilih cm persegi atau m persegi sesuai ukuran benda. Pada Pengukuran Luas, cocokkan gambar “Pilih satuan” dengan artinya (cocok), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "✅ Pilih cm persegi atau m persegi sesuai ukuran benda."
    },
    {
      "judul": "Siap Sub-Bab B",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "volume",
      "suara": "Berikutnya kita belajar volume. Pada Pengukuran Luas, cocokkan gambar “Siap Sub-Bab B” dengan artinya (volume), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Pengukuran…",
      "teksVisual": "➡️ Siap Sub-Bab B: volume"
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-kisi",
      "title": "Hitung Persegi Satuan",
      "bookReference": "hlm. 114–115",
      "objective": "Pakai Luas sebagai Menutupi: Luas = banyak satuan persegi yang menutupi daerah. Latihan: Menghitung luas kisi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Luas sebagai Menutupi: Luas = banyak satuan persegi yang menutupi daerah.",
      "voiceGuide": "Luas sebagai Menutupi. Luas = banyak satuan persegi yang menutupi daerah.",
      "emoji": "🟧",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "satuan-luas",
      "title": "Pilih Satuan Luas",
      "bookReference": "hlm. 116–117",
      "objective": "Pakai Luas sebagai Menutupi: Luas = banyak satuan persegi yang menutupi daerah. Latihan: Membedakan baku/tidak baku..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Luas sebagai Menutupi: Luas = banyak satuan persegi yang menutupi daerah.",
      "voiceGuide": "Luas sebagai Menutupi. Luas = banyak satuan persegi yang menutupi daerah.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "konversi-luas",
      "title": "Konversi cm² dan m²",
      "bookReference": "hlm. 117",
      "objective": "Pakai Luas sebagai Menutupi: Luas = banyak satuan persegi yang menutupi daerah. Latihan: 1 m² = 10.000 cm²..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Luas sebagai Menutupi: Luas = banyak satuan persegi yang menutupi daerah.",
      "voiceGuide": "Luas sebagai Menutupi. Luas = banyak satuan persegi yang menutupi daerah.",
      "emoji": "🔄",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-luas",
      "title": "Pilah Baku/Tidak Baku",
      "bookReference": "hlm. 105–116",
      "objective": "Pakai Luas sebagai Menutupi: Luas = banyak satuan persegi yang menutupi daerah. Latihan: Memilah satuan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Luas sebagai Menutupi: Luas = banyak satuan persegi yang menutupi daerah.",
      "voiceGuide": "Luas sebagai Menutupi. Luas = banyak satuan persegi yang menutupi daerah.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-luas",
      "title": "Jodohkan Konsep Luas",
      "bookReference": "hlm. 116–120",
      "objective": "Menjodohkan.. Ingat Luas sebagai Menutupi. (Luas sebagai Menutupi)",
      "mechanicDescription": "Tiga ronde. Gunakan Luas sebagai Menutupi.",
      "voiceGuide": "Luas sebagai Menutupi. Mainkan dengan teliti.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-luas",
      "title": "Memori Luas",
      "bookReference": "hlm. 116–118",
      "objective": "Memori.. Ingat Luas sebagai Menutupi. (Luas sebagai Menutupi)",
      "mechanicDescription": "Tiga ronde. Gunakan Luas sebagai Menutupi.",
      "voiceGuide": "Luas sebagai Menutupi. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-luas",
      "title": "Ketuk Bangun Luas",
      "bookReference": "hlm. 115–119",
      "objective": "Mengetuk.. Ingat Luas sebagai Menutupi. (Luas sebagai Menutupi)",
      "mechanicDescription": "Tiga ronde. Gunakan Luas sebagai Menutupi.",
      "voiceGuide": "Luas sebagai Menutupi. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-luas",
      "title": "Ketuk Semua Jenis Satuan",
      "bookReference": "hlm. 116",
      "objective": "Ketuk semua.. Ingat Luas sebagai Menutupi. (Luas sebagai Menutupi)",
      "mechanicDescription": "Tiga ronde. Gunakan Luas sebagai Menutupi.",
      "voiceGuide": "Luas sebagai Menutupi. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-luas",
      "title": "Cerita Meja Helen",
      "bookReference": "hlm. 107–114",
      "objective": "Soal cerita.. Ingat Luas sebagai Menutupi. (Luas sebagai Menutupi)",
      "mechanicDescription": "Tiga ronde. Gunakan Luas sebagai Menutupi.",
      "voiceGuide": "Luas sebagai Menutupi. Mainkan dengan teliti.",
      "emoji": "🪑",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-luas",
      "title": "Urutkan Nilai Luas",
      "bookReference": "hlm. 115–119",
      "objective": "Mengurutkan.. Ingat Luas sebagai Menutupi. (Luas sebagai Menutupi)",
      "mechanicDescription": "Tiga ronde. Gunakan Luas sebagai Menutupi.",
      "voiceGuide": "Luas sebagai Menutupi. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "kisi-besar",
      "title": "Diagram Kisi Membesar",
      "bookReference": "hlm. 115",
      "objective": "Pakai Luas Susunan: Panjang × lebar untuk persegi panjang. Latihan: Baca kisi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Luas Susunan: Panjang × lebar untuk persegi panjang.",
      "voiceGuide": "Luas Susunan. Panjang × lebar untuk persegi panjang.",
      "diagramType": "grid",
      "numberA": 4,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "kisi-sama",
      "title": "Luas Sama Bentuk Beda",
      "bookReference": "hlm. 118",
      "objective": "Pakai Luas Susunan: Panjang × lebar untuk persegi panjang. Latihan: 13 cm² dua bentuk..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Luas Susunan: Panjang × lebar untuk persegi panjang.",
      "voiceGuide": "Luas Susunan. Panjang × lebar untuk persegi panjang.",
      "diagramType": "same",
      "numberA": 13,
      "numberB": 13
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-a",
      "title": "Jodohkan Diagram Luas",
      "bookReference": "hlm. 116–120",
      "objective": "Pakai Luas Susunan: Panjang × lebar untuk persegi panjang. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Luas Susunan: Panjang × lebar untuk persegi panjang.",
      "voiceGuide": "Luas Susunan. Panjang × lebar untuk persegi panjang.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-a",
      "title": "Memori Diagram Luas",
      "bookReference": "hlm. 117",
      "objective": "Pakai Luas Susunan: Panjang × lebar untuk persegi panjang. Latihan: Memori..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Luas Susunan: Panjang × lebar untuk persegi panjang.",
      "voiceGuide": "Luas Susunan. Panjang × lebar untuk persegi panjang.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-a",
      "title": "Tabel Satuan Luas",
      "bookReference": "hlm. 117–120",
      "objective": "Isi tabel.. Ingat Luas Susunan. (Luas Susunan)",
      "mechanicDescription": "Tiga tabel. Gunakan Luas Susunan.",
      "voiceGuide": "Luas Susunan. Mainkan dengan teliti.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-a",
      "title": "Ketuk Semua Diagram Luas",
      "bookReference": "hlm. 116",
      "objective": "Ketuk semua.. Ingat Luas Susunan. (Luas Susunan)",
      "mechanicDescription": "Tiga ronde. Gunakan Luas Susunan.",
      "voiceGuide": "Luas Susunan. Mainkan dengan teliti.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-a",
      "title": "Pilah Diagram Satuan",
      "bookReference": "hlm. 116",
      "objective": "Pilah.. Ingat Luas Susunan. (Luas Susunan)",
      "mechanicDescription": "Tiga ronde. Gunakan Luas Susunan.",
      "voiceGuide": "Luas Susunan. Mainkan dengan teliti.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "konversi-visual",
      "title": "Konversi Visual m²↔cm²",
      "bookReference": "hlm. 117",
      "objective": "Pilih konversi.. Ingat Luas Susunan. (Luas Susunan)",
      "mechanicDescription": "Tiga ronde. Gunakan Luas Susunan.",
      "voiceGuide": "Luas Susunan. Mainkan dengan teliti.",
      "diagramType": "conv",
      "numberA": 1,
      "numberB": 10000
    },
    {
      "stage": "Picture",
      "gameType": "choose-luas",
      "title": "Pilih Luas Cocok",
      "bookReference": "hlm. 118–119",
      "objective": "Pilih luas.. Ingat Luas Susunan. (Luas Susunan)",
      "mechanicDescription": "Tiga ronde. Gunakan Luas Susunan.",
      "voiceGuide": "Luas Susunan. Mainkan dengan teliti.",
      "diagramType": "choose",
      "numberA": 9,
      "numberB": 13
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-a",
      "title": "Cerita Diagram Luas",
      "bookReference": "hlm. 107–119",
      "objective": "Cerita + gambar.. Ingat Luas Susunan. (Luas Susunan)",
      "mechanicDescription": "Tiga ronde. Gunakan Luas Susunan.",
      "voiceGuide": "Luas Susunan. Mainkan dengan teliti.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-luas",
      "title": "Tulis … cm² / m²",
      "bookReference": "hlm. 116–118",
      "objective": "Pakai Tak Baku ke Baku: Mulai satuan tak baku, lalu cm²/m². Latihan: Menulis satuan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Tak Baku ke Baku: Mulai satuan tak baku, lalu cm²/m².",
      "voiceGuide": "Tak Baku ke Baku. Mulai satuan tak baku, lalu cm²/m².",
      "symbolLarge": "cm²",
      "wordLarge": "LUAS",
      "mathNotation": "satuan"
    },
    {
      "stage": "Abstract",
      "gameType": "write-konversi",
      "title": "Tulis Hasil Konversi",
      "bookReference": "hlm. 117",
      "objective": "Pakai Tak Baku ke Baku: Mulai satuan tak baku, lalu cm²/m². Latihan: Menulis 10.000..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Tak Baku ke Baku: Mulai satuan tak baku, lalu cm²/m².",
      "voiceGuide": "Tak Baku ke Baku. Mulai satuan tak baku, lalu cm²/m².",
      "symbolLarge": "10000",
      "wordLarge": "KONVERSI",
      "mathNotation": "m²↔cm²"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-jenis",
      "title": "Pilih Jenis Satuan",
      "bookReference": "hlm. 105–116",
      "objective": "Pakai Tak Baku ke Baku: Mulai satuan tak baku, lalu cm²/m². Latihan: Baku/tidak baku..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Tak Baku ke Baku: Mulai satuan tak baku, lalu cm²/m².",
      "voiceGuide": "Tak Baku ke Baku. Mulai satuan tak baku, lalu cm²/m².",
      "symbolLarge": "baku",
      "wordLarge": "JENIS",
      "mathNotation": "klasifikasi"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-a",
      "title": "Urutkan Notasi Luas",
      "bookReference": "hlm. 118–119",
      "objective": "Pakai Tak Baku ke Baku: Mulai satuan tak baku, lalu cm²/m². Latihan: Mengurutkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Tak Baku ke Baku: Mulai satuan tak baku, lalu cm²/m².",
      "voiceGuide": "Tak Baku ke Baku. Mulai satuan tak baku, lalu cm²/m².",
      "symbolLarge": "4<13",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-a",
      "title": "Jodohkan Notasi Luas",
      "bookReference": "hlm. 116–120",
      "objective": "Jodohkan.. Ingat Tak Baku ke Baku. (Tak Baku ke Baku)",
      "mechanicDescription": "Tiga ronde. Gunakan Tak Baku ke Baku.",
      "voiceGuide": "Tak Baku ke Baku. Mainkan dengan teliti.",
      "symbolLarge": "1cm²",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-a",
      "title": "Memori Notasi Luas",
      "bookReference": "hlm. 117",
      "objective": "Memori.. Ingat Tak Baku ke Baku. (Tak Baku ke Baku)",
      "mechanicDescription": "Tiga ronde. Gunakan Tak Baku ke Baku.",
      "voiceGuide": "Tak Baku ke Baku. Mainkan dengan teliti.",
      "symbolLarge": "m²",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-a",
      "title": "Benar atau Salah: Luas",
      "bookReference": "hlm. 105–118",
      "objective": "Menilai.. Ingat Tak Baku ke Baku. (Tak Baku ke Baku)",
      "mechanicDescription": "Dua ronde. Gunakan Tak Baku ke Baku.",
      "voiceGuide": "Tak Baku ke Baku. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-a",
      "title": "Detektif Luas",
      "bookReference": "hlm. 107–118",
      "objective": "Petunjuk → jawaban.. Ingat Tak Baku ke Baku. (Tak Baku ke Baku)",
      "mechanicDescription": "Empat soal. Gunakan Tak Baku ke Baku.",
      "voiceGuide": "Tak Baku ke Baku. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-a",
      "title": "Peta Konsep Luas",
      "bookReference": "hlm. 105–117",
      "objective": "Mengisi kotak.. Ingat Tak Baku ke Baku. (Tak Baku ke Baku)",
      "mechanicDescription": "Satu peta. Gunakan Tak Baku ke Baku.",
      "voiceGuide": "Tak Baku ke Baku. Mainkan dengan teliti.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-a",
      "title": "Cerita Angka Luas",
      "bookReference": "hlm. 107–119",
      "objective": "Soal cerita.. Ingat Tak Baku ke Baku. (Tak Baku ke Baku)",
      "mechanicDescription": "Tiga ronde. Gunakan Tak Baku ke Baku.",
      "voiceGuide": "Tak Baku ke Baku. Mainkan dengan teliti.",
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
      "ikon": "🌍",
      "nama": "Luas sebagai Menutupi",
      "isi": "Luas = banyak satuan persegi yang menutupi daerah.",
      "suara": "Luas sebagai Menutupi. Luas = banyak satuan persegi yang menutupi daerah."
    },
    {
      "ikon": "🌍",
      "nama": "Luas Susunan",
      "isi": "Panjang × lebar untuk persegi panjang.",
      "suara": "Luas Susunan. Panjang × lebar untuk persegi panjang."
    },
    {
      "ikon": "🌍",
      "nama": "Tak Baku ke Baku",
      "isi": "Mulai satuan tak baku, lalu cm²/m².",
      "suara": "Tak Baku ke Baku. Mulai satuan tak baku, lalu cm²/m²."
    }
  ],
  "poinSuara": "Ingat: Luas sebagai Menutupi, Luas Susunan, Tak Baku ke Baku.",
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
  "rumah": "Ayo Mencoba: terapkan Luas sebagai Menutupi pada satu soal nyata di rumah.",
  "refleksi": [
    "Bagaimana Luas sebagai Menutupi membantumu?",
    "Kapan memakai Luas Susunan?",
    "Apa bedanya dengan hanya menghafal tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Area as Covering",
      "namaId": "Luas sebagai Menutupi",
      "asal": "Van de Walle",
      "ringkas": "Luas = banyak satuan persegi yang menutupi daerah.",
      "tahap": [
        "Story",
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Array Area",
      "namaId": "Luas Susunan",
      "asal": "Array model",
      "ringkas": "Panjang × lebar untuk persegi panjang.",
      "tahap": [
        "Mind",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Nonstandard then Standard",
      "namaId": "Tak Baku ke Baku",
      "asal": "Measurement progression",
      "ringkas": "Mulai satuan tak baku, lalu cm²/m².",
      "tahap": [
        "Infografis",
        "Concrete"
      ]
    }
  ]
};

export const SUB_B44: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Pengukuran Volume)",
  "fullTitle": "Sub-Bab B: Pengukuran Volume",
  "targetDescription": "Siswa mengukur dan menduga volume dengan satuan tidak baku (gelas, botol sabun) dan satuan baku (ml, liter, cm³, m³), mengonversi 1 l = 1.000 ml dan 1 cm³ = 1 ml, serta menghitung kubus satuan sesuai Buku Siswa Kelas IV Bab 4. Siswa memakai cara Volume sebagai Mengisi, Model Lapisan, Ide Pemindahan Air. Siswa memakai cara Volume sebagai Mengisi, Model Lapisan, Ide Pemindahan Air.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Kita belajar pengukuran volume. Botol sabun A sama dengan empat botol B, atau sepuluh botol C. Lalu satuan baku: mililiter, liter, sentimeter kubik, dan meter kubik. Satu liter sama dengan seribu mililiter. Satu cm kubik sama dengan satu mililiter. Kita memakai cara: Volume sebagai Mengisi, Model Lapisan, Ide Pemindahan Air. Volume = banyak satuan kubus yang mengisi ruang. Volume = luas alas × tinggi. Benda yang dicelup menaikkan muka air. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa mengukur dan menduga volume dengan satuan baku dan tidak baku.",
    "referensi": "Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 4 Sub-Bab B)."
  },
  "videos": [
    {
      "id": "K4B4B-V1",
      "judul": "Botol Sabun A, B, C",
      "subjudul": "Volume as Filling",
      "adegan": [
        {
          "id": "K4B4B-V1-1",
          "judul": "Tiga botol",
          "ketukan": [
            "Bayangkan kamu sedang mempelajari Pengukuran Volume. Ibu Helen punya tiga botol sabun.",
            "Botol A, B, dan C.",
            "Ukurannya berbeda.",
            "Ingat cara Volume sebagai Mengisi: Volume = banyak satuan kubus yang mengisi ruang. Ingat cara Volume sebagai Mengisi: Volume = banyak satuan kubus yang mengisi ruang."
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
            "Di sini kita memakai ide Volume as Filling — Volume = banyak satuan kubus yang mengisi ruang. Di sini kita memakai Volume as Filling. Volume = banyak satuan kubus yang mengisi ruang."
          ],
          "papan": [
            "= 4B",
            "tidak baku",
            "volume",
            "volume"
          ]
        },
        {
          "id": "K4B4B-V1-3",
          "judul": "A = 10C",
          "ketukan": [
            "Isi A dari botol C.",
            "Butuh sepuluh botol C.",
            "A sama dengan sepuluh C.",
            "METODE LUAR · Volume sebagai Mengisi: Volume = banyak satuan kubus yang mengisi ruang."
          ],
          "papan": [
            "= 10C",
            "C kecil",
            "beda satuan",
            "volume"
          ]
        }
      ]
    },
    {
      "id": "K4B4B-V2",
      "judul": "Latihan: Model Lapisan",
      "subjudul": "Layer Model",
      "adegan": [
        {
          "id": "K4B4B-V2-1",
          "judul": "Contoh kecil",
          "ketukan": [
            "Sendok berisi lima mililiter.",
            "Cangkir dua ratus empat puluh ml.",
            "Botol minuman tiga ratus tiga puluh ml.",
            "Ingat cara Model Lapisan: Volume = luas alas × tinggi. Ingat cara Model Lapisan: Volume = luas alas × tinggi."
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
            "Di sini kita memakai ide Layer Model — Volume = luas alas × tinggi. Di sini kita memakai Layer Model. Volume = luas alas × tinggi."
          ],
          "papan": [
            "1000 ml",
            "1 l",
            "ingat",
            "model"
          ]
        },
        {
          "id": "K4B4B-V2-3",
          "judul": "Sanitizer",
          "ketukan": [
            "Botol besar diisi ke botol kecil.",
            "Habis menjadi delapan botol kecil.",
            "Volume besar = delapan satuan kecil.",
            "METODE LUAR · Model Lapisan: Volume = luas alas × tinggi."
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
      "judul": "Siap pakai Displacement Idea",
      "subjudul": "Displacement Idea",
      "adegan": [
        {
          "id": "K4B4B-V3-1",
          "judul": "Dadu pejal",
          "ketukan": [
            "Dadu bukan cairan.",
            "Pakai sentimeter kubik.",
            "Kubus sisi satu cm = satu cm kubik.",
            "Ingat cara Ide Pemindahan Air: Benda yang dicelup menaikkan muka air. Ingat cara Ide Pemindahan Air: Benda yang dicelup menaikkan muka air."
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
            "Di sini kita memakai ide Displacement Idea — Benda yang dicelup menaikkan muka air. Di sini kita memakai Displacement Idea. Benda yang dicelup menaikkan muka air."
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
            "Untuk bak mandi yang besar,.",
            "pakai meter kubik.",
            "Satu m kubik = seribu liter.",
            "METODE LUAR · Ide Pemindahan Air: Benda yang dicelup menaikkan muka air."
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
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Pengukuran Volume dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa mengukur dan menduga volume dengan satuan tidak baku (gelas, botol sabun) dan satuan baku (ml, liter, cm³, m³), me….",
      "icon": "❓",
      "flowFrom": "Pahami soal",
      "flowTo": "Volume as Filling"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Volume as Filling",
      "stepDesc": "Volume = banyak satuan kubus yang mengisi ruang. Pada Pengukuran Volume, langkah “Volume as Filling” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Volume sebagai Mengisi: Volume = banyak satuan kubus yang mengisi ruang. Model Lapisan: Volume = luas alas × tinggi. Ide Pemindahan Air: Benda yang dicelup mena…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🧭",
      "flowFrom": "Volume as Filling",
      "flowTo": "Layer Model"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Layer Model",
      "stepDesc": "Volume = luas alas × tinggi. Pada Pengukuran Volume, langkah “Layer Model” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Volume sebagai Mengisi: Volume = banyak satuan kubus yang mengisi ruang. Model Lapisan: Volume = luas alas × tinggi. Ide Pemindahan Air: Benda yang dicelup mena…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🛠️",
      "flowFrom": "Layer Model",
      "flowTo": "Displacement Idea"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Displacement Idea",
      "stepDesc": "Benda yang dicelup menaikkan muka air. Pada Pengukuran Volume, langkah “Displacement Idea” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Volume sebagai Mengisi: Volume = banyak satuan kubus yang mengisi ruang. Model Lapisan: Volume = luas alas × tinggi. Ide Pemindahan Air: Benda yang dicelup mena…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "✨",
      "flowFrom": "Displacement Idea",
      "flowTo": "Kerjakan"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Kerjakan",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Pengukuran Volume. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "✏️",
      "flowFrom": "Kerjakan",
      "flowTo": "Cek masuk akal"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek masuk akal",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Pengukuran Volume. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Cek masuk akal",
      "flowTo": "Simpulkan"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Simpulkan",
      "stepDesc": "Simpulkan ide utama Pengukuran Volume dengan kalimatmu sendiri. Sebutkan cara yang kamu pakai dan mengapa cara itu membantu. Jelaskan kepada teman seolah-olah kamu guru kecil. Simpulan yang jelas menandakan konsepnya sudah dipahami.",
      "icon": "💬",
      "flowFrom": "Simpulkan",
      "flowTo": "Main"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Main",
      "stepDesc": "Latih lagi di tahap Concrete, Picture, lalu Abstract untuk Pengukuran Volume. Mulai dari benda nyata, lanjut ke diagram, baru ke lambang angka. Ulangi sampai kamu bisa menjelaskan tanpa melihat contoh. Bermain sambil berlatih membuat konsepnya melekat lebih lama.",
      "icon": "🎮",
      "flowFrom": "Main",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Isi ruang",
      "emoji": "📦",
      "countNum": 1,
      "countWord": "volume",
      "suara": "Volume mengukur isi ruang atau kapasitas. Pada Pengukuran Volume, cocokkan gambar “Isi ruang” dengan artinya (volume), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "📦 Isi ruang: volume"
    },
    {
      "judul": "A = 4B",
      "emoji": "🧴",
      "countNum": 4,
      "countWord": "Kegiatan B.1",
      "suara": "Volume A sama dengan empat volume B. Isi A dari botol B. Butuh empat botol B. Ingat: = 4B; tidak baku; volume. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Pengukuran Volume.",
      "teksVisual": "🧴 A = 4B: Kegiatan B.1"
    },
    {
      "judul": "A = 10C",
      "emoji": "🧴",
      "countNum": 10,
      "countWord": "Kegiatan B.2",
      "suara": "Volume A sama dengan sepuluh volume C. Isi A dari botol C. Butuh sepuluh botol C. Ingat: = 10C; C kecil; beda satuan. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Pengukuran Volume.",
      "teksVisual": "🧴 A = 10C: Kegiatan B.2"
    },
    {
      "judul": "5 ml",
      "emoji": "🥄",
      "countNum": 5,
      "countWord": "sendok",
      "suara": "Satu sendok sekitar lima mililiter. Pada Pengukuran Volume, cocokkan gambar “5 ml” dengan artinya (sendok), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Pengukuran Volume.",
      "teksVisual": "🥄 5 ml: sendok"
    },
    {
      "judul": "1 liter",
      "emoji": "🥛",
      "countNum": 1000,
      "countWord": "ml",
      "suara": "Satu liter sama dengan seribu mililiter. Pada Pengukuran Volume, cocokkan gambar “1 liter” dengan artinya (ml), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Pengukuran…",
      "teksVisual": "🥛 1 liter: ml"
    },
    {
      "judul": "1 cm³",
      "emoji": "🧊",
      "countNum": 1,
      "countWord": "ml",
      "suara": "Satu cm kubik sama dengan satu mililiter. Pada Pengukuran Volume, cocokkan gambar “1 cm³” dengan artinya (ml), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Pengukuran…",
      "teksVisual": "🧊 1 cm³: ml"
    },
    {
      "judul": "1 m³",
      "emoji": "🛁",
      "countNum": 1000,
      "countWord": "liter",
      "suara": "Satu m kubik sama dengan seribu liter. Pada Pengukuran Volume, cocokkan gambar “1 m³” dengan artinya (liter), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Pengukuran…",
      "teksVisual": "🛁 1 m³: liter"
    },
    {
      "judul": "8 botol kecil",
      "emoji": "🧴",
      "countNum": 8,
      "countWord": "sanitizer",
      "suara": "Satu botol besar sama delapan botol kecil. Pada Pengukuran Volume, cocokkan gambar “8 botol kecil” dengan artinya (sanitizer), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🧴 8 botol kecil: sanitizer"
    },
    {
      "judul": "24 cm³",
      "emoji": "🔢",
      "countNum": 24,
      "countWord": "contoh buku",
      "suara": "Volume bangun contoh buku dua puluh empat cm kubik. Pada Pengukuran Volume, cocokkan gambar “24 cm³” dengan artinya (contoh buku), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🔢 Volume bangun contoh buku dua puluh empat cm kubik."
    },
    {
      "judul": "Selesai Bab 4 A–B",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "luas+volume",
      "suara": "Luas dan volume sudah lengkap untuk Materi. Pada Pengukuran Volume, cocokkan gambar “Selesai Bab 4 A–B” dengan artinya (luas+volume), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "✅ Luas dan volume sudah lengkap untuk Materi."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-kubus",
      "title": "Hitung Kubus Satuan",
      "bookReference": "hlm. 135–136",
      "objective": "Pakai Volume sebagai Mengisi: Volume = banyak satuan kubus yang mengisi ruang. Latihan: Menghitung volume..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Volume sebagai Mengisi: Volume = banyak satuan kubus yang mengisi ruang.",
      "voiceGuide": "Volume sebagai Mengisi. Volume = banyak satuan kubus yang mengisi ruang.",
      "emoji": "🧊",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "satuan-vol",
      "title": "Pilih Satuan Volume",
      "bookReference": "hlm. 124–134",
      "objective": "Pakai Volume sebagai Mengisi: Volume = banyak satuan kubus yang mengisi ruang. Latihan: Baku/tidak baku..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Volume sebagai Mengisi: Volume = banyak satuan kubus yang mengisi ruang.",
      "voiceGuide": "Volume sebagai Mengisi. Volume = banyak satuan kubus yang mengisi ruang.",
      "emoji": "🧴",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "konversi-vol",
      "title": "Konversi ml, l, cm³",
      "bookReference": "hlm. 129–135",
      "objective": "Pakai Volume sebagai Mengisi: Volume = banyak satuan kubus yang mengisi ruang. Latihan: 1 l = 1.000 ml..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Volume sebagai Mengisi: Volume = banyak satuan kubus yang mengisi ruang.",
      "voiceGuide": "Volume sebagai Mengisi. Volume = banyak satuan kubus yang mengisi ruang.",
      "emoji": "🔄",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-vol",
      "title": "Pilah Baku/Tidak Baku Volume",
      "bookReference": "hlm. 122–134",
      "objective": "Pakai Volume sebagai Mengisi: Volume = banyak satuan kubus yang mengisi ruang. Latihan: Memilah..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Volume sebagai Mengisi: Volume = banyak satuan kubus yang mengisi ruang.",
      "voiceGuide": "Volume sebagai Mengisi. Volume = banyak satuan kubus yang mengisi ruang.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-vol",
      "title": "Jodohkan Konsep Volume",
      "bookReference": "hlm. 124–135",
      "objective": "Menjodohkan.. Ingat Volume sebagai Mengisi. (Volume sebagai Mengisi)",
      "mechanicDescription": "Tiga ronde. Gunakan Volume sebagai Mengisi.",
      "voiceGuide": "Volume sebagai Mengisi. Mainkan dengan teliti.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-vol",
      "title": "Memori Volume",
      "bookReference": "hlm. 124–131",
      "objective": "Memori.. Ingat Volume sebagai Mengisi. (Volume sebagai Mengisi)",
      "mechanicDescription": "Tiga ronde. Gunakan Volume sebagai Mengisi.",
      "voiceGuide": "Volume sebagai Mengisi. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-vol",
      "title": "Ketuk Bangun Volume",
      "bookReference": "hlm. 135–136",
      "objective": "Mengetuk.. Ingat Volume sebagai Mengisi. (Volume sebagai Mengisi)",
      "mechanicDescription": "Tiga ronde. Gunakan Volume sebagai Mengisi.",
      "voiceGuide": "Volume sebagai Mengisi. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-vol",
      "title": "Ketuk Semua Jenis Volume",
      "bookReference": "hlm. 125–134",
      "objective": "Ketuk semua.. Ingat Volume sebagai Mengisi. (Volume sebagai Mengisi)",
      "mechanicDescription": "Tiga ronde. Gunakan Volume sebagai Mengisi.",
      "voiceGuide": "Volume sebagai Mengisi. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-vol",
      "title": "Cerita Botol Sabun Helen",
      "bookReference": "hlm. 123–126",
      "objective": "Soal cerita.. Ingat Volume sebagai Mengisi. (Volume sebagai Mengisi)",
      "mechanicDescription": "Tiga ronde. Gunakan Volume sebagai Mengisi.",
      "voiceGuide": "Volume sebagai Mengisi. Mainkan dengan teliti.",
      "emoji": "🧴",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-vol",
      "title": "Urutkan Nilai Volume",
      "bookReference": "hlm. 130–136",
      "objective": "Mengurutkan.. Ingat Volume sebagai Mengisi. (Volume sebagai Mengisi)",
      "mechanicDescription": "Tiga ronde. Gunakan Volume sebagai Mengisi.",
      "voiceGuide": "Volume sebagai Mengisi. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "kubus-besar",
      "title": "Diagram Kubus Membesar",
      "bookReference": "hlm. 135",
      "objective": "Pakai Model Lapisan: Volume = luas alas × tinggi. Latihan: Baca kubus..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Model Lapisan: Volume = luas alas × tinggi.",
      "voiceGuide": "Model Lapisan. Volume = luas alas × tinggi.",
      "diagramType": "cube",
      "numberA": 4,
      "numberB": 8
    },
    {
      "stage": "Picture",
      "gameType": "cairan",
      "title": "Diagram Cairan ml/l",
      "bookReference": "hlm. 129–131",
      "objective": "Pakai Model Lapisan: Volume = luas alas × tinggi. Latihan: Baca cairan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Model Lapisan: Volume = luas alas × tinggi.",
      "voiceGuide": "Model Lapisan. Volume = luas alas × tinggi.",
      "diagramType": "liquid",
      "numberA": 5,
      "numberB": 1000
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-b",
      "title": "Jodohkan Diagram Volume",
      "bookReference": "hlm. 124–135",
      "objective": "Pakai Model Lapisan: Volume = luas alas × tinggi. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Model Lapisan: Volume = luas alas × tinggi.",
      "voiceGuide": "Model Lapisan. Volume = luas alas × tinggi.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-b",
      "title": "Memori Diagram Volume",
      "bookReference": "hlm. 130",
      "objective": "Pakai Model Lapisan: Volume = luas alas × tinggi. Latihan: Memori..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Model Lapisan: Volume = luas alas × tinggi.",
      "voiceGuide": "Model Lapisan. Volume = luas alas × tinggi.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-b",
      "title": "Tabel Satuan Volume",
      "bookReference": "hlm. 131–135",
      "objective": "Isi tabel.. Ingat Model Lapisan. (Model Lapisan)",
      "mechanicDescription": "Tiga tabel. Gunakan Model Lapisan.",
      "voiceGuide": "Model Lapisan. Mainkan dengan teliti.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-b",
      "title": "Ketuk Semua Diagram Volume",
      "bookReference": "hlm. 125",
      "objective": "Ketuk semua.. Ingat Model Lapisan. (Model Lapisan)",
      "mechanicDescription": "Tiga ronde. Gunakan Model Lapisan.",
      "voiceGuide": "Model Lapisan. Mainkan dengan teliti.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-b",
      "title": "Pilah Diagram Volume",
      "bookReference": "hlm. 125–134",
      "objective": "Pilah.. Ingat Model Lapisan. (Model Lapisan)",
      "mechanicDescription": "Tiga ronde. Gunakan Model Lapisan.",
      "voiceGuide": "Model Lapisan. Mainkan dengan teliti.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "konversi-visual-b",
      "title": "Konversi Visual ml↔l",
      "bookReference": "hlm. 131",
      "objective": "Pilih konversi.. Ingat Model Lapisan. (Model Lapisan)",
      "mechanicDescription": "Tiga ronde. Gunakan Model Lapisan.",
      "voiceGuide": "Model Lapisan. Mainkan dengan teliti.",
      "diagramType": "conv",
      "numberA": 1000,
      "numberB": 1
    },
    {
      "stage": "Picture",
      "gameType": "choose-vol",
      "title": "Pilih Volume Cocok",
      "bookReference": "hlm. 135–136",
      "objective": "Pilih volume.. Ingat Model Lapisan. (Model Lapisan)",
      "mechanicDescription": "Tiga ronde. Gunakan Model Lapisan.",
      "voiceGuide": "Model Lapisan. Mainkan dengan teliti.",
      "diagramType": "choose",
      "numberA": 9,
      "numberB": 24
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-b",
      "title": "Cerita Diagram Volume",
      "bookReference": "hlm. 123–136",
      "objective": "Cerita + gambar.. Ingat Model Lapisan. (Model Lapisan)",
      "mechanicDescription": "Tiga ronde. Gunakan Model Lapisan.",
      "voiceGuide": "Model Lapisan. Mainkan dengan teliti.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-vol",
      "title": "Tulis … ml / l / cm³",
      "bookReference": "hlm. 129–134",
      "objective": "Pakai Ide Pemindahan Air: Benda yang dicelup menaikkan muka air. Latihan: Menulis satuan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Ide Pemindahan Air: Benda yang dicelup menaikkan muka air.",
      "voiceGuide": "Ide Pemindahan Air. Benda yang dicelup menaikkan muka air.",
      "symbolLarge": "ml",
      "wordLarge": "VOLUME",
      "mathNotation": "satuan"
    },
    {
      "stage": "Abstract",
      "gameType": "write-konversi-b",
      "title": "Tulis Hasil Konversi Volume",
      "bookReference": "hlm. 131–135",
      "objective": "Pakai Ide Pemindahan Air: Benda yang dicelup menaikkan muka air. Latihan: Menulis 1.000..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Ide Pemindahan Air: Benda yang dicelup menaikkan muka air.",
      "voiceGuide": "Ide Pemindahan Air. Benda yang dicelup menaikkan muka air.",
      "symbolLarge": "1000",
      "wordLarge": "KONVERSI",
      "mathNotation": "ml↔l"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-jenis-b",
      "title": "Pilih Jenis Satuan Volume",
      "bookReference": "hlm. 122–134",
      "objective": "Pakai Ide Pemindahan Air: Benda yang dicelup menaikkan muka air. Latihan: Baku/tidak baku..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Ide Pemindahan Air: Benda yang dicelup menaikkan muka air.",
      "voiceGuide": "Ide Pemindahan Air. Benda yang dicelup menaikkan muka air.",
      "symbolLarge": "baku",
      "wordLarge": "JENIS",
      "mathNotation": "klasifikasi"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-b",
      "title": "Urutkan Notasi Volume",
      "bookReference": "hlm. 130–136",
      "objective": "Pakai Ide Pemindahan Air: Benda yang dicelup menaikkan muka air. Latihan: Mengurutkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, ingat Ide Pemindahan Air: Benda yang dicelup menaikkan muka air.",
      "voiceGuide": "Ide Pemindahan Air. Benda yang dicelup menaikkan muka air.",
      "symbolLarge": "5<330",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-b",
      "title": "Jodohkan Notasi Volume",
      "bookReference": "hlm. 124–135",
      "objective": "Jodohkan.. Ingat Ide Pemindahan Air. (Ide Pemindahan Air)",
      "mechanicDescription": "Tiga ronde. Gunakan Ide Pemindahan Air.",
      "voiceGuide": "Ide Pemindahan Air. Mainkan dengan teliti.",
      "symbolLarge": "1l",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-b",
      "title": "Memori Notasi Volume",
      "bookReference": "hlm. 131",
      "objective": "Memori.. Ingat Ide Pemindahan Air. (Ide Pemindahan Air)",
      "mechanicDescription": "Tiga ronde. Gunakan Ide Pemindahan Air.",
      "voiceGuide": "Ide Pemindahan Air. Mainkan dengan teliti.",
      "symbolLarge": "cm³",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-b",
      "title": "Benar atau Salah: Volume",
      "bookReference": "hlm. 122–135",
      "objective": "Menilai.. Ingat Ide Pemindahan Air. (Ide Pemindahan Air)",
      "mechanicDescription": "Dua ronde. Gunakan Ide Pemindahan Air.",
      "voiceGuide": "Ide Pemindahan Air. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-b",
      "title": "Detektif Volume",
      "bookReference": "hlm. 123–136",
      "objective": "Petunjuk → jawaban.. Ingat Ide Pemindahan Air. (Ide Pemindahan Air)",
      "mechanicDescription": "Empat soal. Gunakan Ide Pemindahan Air.",
      "voiceGuide": "Ide Pemindahan Air. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-b",
      "title": "Peta Konsep Volume",
      "bookReference": "hlm. 122–135",
      "objective": "Mengisi kotak.. Ingat Ide Pemindahan Air. (Ide Pemindahan Air)",
      "mechanicDescription": "Satu peta. Gunakan Ide Pemindahan Air.",
      "voiceGuide": "Ide Pemindahan Air. Mainkan dengan teliti.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-b",
      "title": "Cerita Angka Volume",
      "bookReference": "hlm. 123–136",
      "objective": "Soal cerita.. Ingat Ide Pemindahan Air. (Ide Pemindahan Air)",
      "mechanicDescription": "Tiga ronde. Gunakan Ide Pemindahan Air.",
      "voiceGuide": "Ide Pemindahan Air. Mainkan dengan teliti.",
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
      "ikon": "🌍",
      "nama": "Volume sebagai Mengisi",
      "isi": "Volume = banyak satuan kubus yang mengisi ruang.",
      "suara": "Volume sebagai Mengisi. Volume = banyak satuan kubus yang mengisi ruang."
    },
    {
      "ikon": "🌍",
      "nama": "Model Lapisan",
      "isi": "Volume = luas alas × tinggi.",
      "suara": "Model Lapisan. Volume = luas alas × tinggi."
    },
    {
      "ikon": "🌍",
      "nama": "Ide Pemindahan Air",
      "isi": "Benda yang dicelup menaikkan muka air.",
      "suara": "Ide Pemindahan Air. Benda yang dicelup menaikkan muka air."
    }
  ],
  "poinSuara": "Ingat: Volume sebagai Mengisi, Model Lapisan, Ide Pemindahan Air.",
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
  "rumah": "Ayo Mencoba: terapkan Volume sebagai Mengisi pada satu soal nyata di rumah.",
  "refleksi": [
    "Bagaimana Volume sebagai Mengisi membantumu?",
    "Kapan memakai Model Lapisan?",
    "Apa bedanya dengan hanya menghafal tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Volume as Filling",
      "namaId": "Volume sebagai Mengisi",
      "asal": "Van de Walle",
      "ringkas": "Volume = banyak satuan kubus yang mengisi ruang.",
      "tahap": [
        "Story",
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Layer Model",
      "namaId": "Model Lapisan",
      "asal": "3D arrays",
      "ringkas": "Volume = luas alas × tinggi.",
      "tahap": [
        "Mind",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Displacement Idea",
      "namaId": "Ide Pemindahan Air",
      "asal": "Informal volume",
      "ringkas": "Benda yang dicelup menaikkan muka air.",
      "tahap": [
        "Infografis",
        "Concrete"
      ]
    }
  ]
};

export const SUB_BAB_K4B4: SubBabNaskah[] = [SUB_A44, SUB_B44];
export const semuaAdeganK4B4 = SUB_BAB_K4B4.flatMap((s) => s.videos.flatMap((v) => v.adegan));
