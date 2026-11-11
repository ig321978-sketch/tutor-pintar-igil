/**
 * Naskah Matematika Kelas 5 Bab 4 — rewrite mendalam.
 * Metode luar dianyam ke Story, peta, infografis, poin, dan meta permainan.
 * Sumber buku: Kemendikbudristek Bab 4 hlm. 105–130.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K5B4_META = {
  "chapterId": "k5-mat-bab4",
  "phaseCode": "FASE_C",
  "grade": 5,
  "subjectLabel": "MATEMATIKA - KELAS 5 SD",
  "title": "BAB 4: KELILING BANGUN DATAR",
  "silabusElemen": "🌈 Fase C • Elemen Pengukuran: Keliling Bangun Datar — Segitiga, Segi Empat, Segi Banyak, dan Gabungan (Kelas 5 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A54: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Konsep Keliling)",
  "fullTitle": "Sub-Bab A: Apakah Keliling Bangun Datar Itu?",
  "targetDescription": "Siswa memahami keliling sebagai panjang jalur yang menelusuri seluruh batas luar bangun sampai kembali ke titik awal (path length), membedakannya dari luas, serta memakai konsep itu pada konteks pagar, bingkai, dan pemugaran Benteng Baluwarti sesuai Buku Siswa Kelas V Bab 4 Sub-Bab A.",
  "secondaryBg": "#FFEDD5",
  "secondaryBorder": "#EA580C",
  "secondaryText": "#7C2D12",
  "silabus": {
    "teksSuara": "Kita belajar arti keliling. Bayangkan kamu berjalan mengelilingi tepi sebuah bangun: jarak yang kamu tempuh sampai kembali ke titik awal itulah keliling. Guru di banyak negara menyebutnya panjang jalur, atau path length. Kita pakai ide itu pada benteng, pagar, dan bingkai foto. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menjelaskan keliling sebagai panjang jalur batas luar, membedakannya dari luas, dan menghitung keliling dari panjang sisi yang diketahui.",
    "referensi": "Buku Siswa Matematika Kelas V Kemendikbudristek (Bab 4: Keliling Bangun Datar, Sub-Bab A hlm. 107–114)."
  },
  "videos": [
    {
      "id": "K5B4A-V1",
      "judul": "Berjalan Mengelilingi Batas",
      "subjudul": "Path Length",
      "adegan": [
        {
          "id": "K5B4A-V1-1",
          "judul": "Titik awal",
          "ketukan": [
            "Bayangkan sebuah persegi di halaman sekolah. Kamu berdiri di satu sudut.",
            "Kamu berjalan menyusuri sisi pertama, lalu sisi kedua, ketiga, dan keempat.",
            "Kamu berhenti lagi di sudut yang sama. Jarak tempuh seluruh perjalanan itu disebut keliling.",
            "Jadi keliling bukan isi di dalam bangun, melainkan panjang jalur di tepi luarnya."
          ],
          "papan": [
            "sudut awal",
            "empat sisi",
            "kembali awal",
            "jalur tepi"
          ]
        },
        {
          "id": "K5B4A-V1-2",
          "judul": "Bukan luas",
          "ketukan": [
            "Temanmu mungkin bilang: keliling sama dengan luas. Itu keliru.",
            "Luas menjawab: berapa banyak daerah yang tertutup di dalam?",
            "Keliling menjawab: berapa panjang jalur jika kita mengelilingi luar?",
            "Satuannya juga beda cara dipikirkan: keliling memakai satuan panjang, luas memakai satuan daerah."
          ],
          "papan": [
            "jangan tertukar",
            "luas = isi",
            "keliling = jalur",
            "satuan beda"
          ]
        },
        {
          "id": "K5B4A-V1-3",
          "judul": "Contoh empat sisi 4",
          "ketukan": [
            "Persegi sisi empat centi meter. Jalurmu: empat, lalu empat, lalu empat, lalu empat.",
            "Jumlahkan: enam belas centi meter. Itulah panjang jalur keliling.",
            "Kalau kamu hanya mengalikan empat kali empat, kamu sedang menghitung luas, bukan keliling.",
            "METODE LUAR · Keliling sebagai Panjang Jalur: selalu bayangkan berjalan di tepi sampai kembali."
          ],
          "papan": [
            "4+4+4+4",
            "K = 16 cm",
            "bukan 4×4 luas",
            "path length"
          ]
        }
      ]
    },
    {
      "id": "K5B4A-V2",
      "judul": "Baluwarti, Pagar, Bingkai",
      "subjudul": "Fencing Context",
      "adegan": [
        {
          "id": "K5B4A-V2-1",
          "judul": "Benteng Baluwarti",
          "ketukan": [
            "Di buku ada Benteng Baluwarti yang mengelilingi Kraton Yogyakarta.",
            "Saat pemugaran, petugas perlu tahu panjang dinding terluar yang harus diperbaiki.",
            "Yang mereka hitung adalah keliling: jalur batas luar, bukan luas tanah di dalam benteng.",
            "Denah benteng tampak seperti gabungan bangun datar. Nanti di Sub-Bab E kita hitung gabungan."
          ],
          "papan": [
            "Baluwarti",
            "panjang dinding",
            "batas luar",
            "gabungan"
          ]
        },
        {
          "id": "K5B4A-V2-2",
          "judul": "Pagar rumah",
          "ketukan": [
            "Ayah ingin memasang pagar mengelilingi tanah. Yang dibeli adalah panjang kayu atau kawat.",
            "Panjang itu sama dengan keliling tanah: jumlah sisi luar tanah.",
            "Kalau Ayah menghitung panjang kali lebar, dia justru mendapat luas tanah untuk rumput, bukan pagar.",
            "Ingat konteks pagar: selalu jumlahkan jalur luar."
          ],
          "papan": [
            "beli panjang",
            "K = pagar",
            "bukan luas",
            "fencing"
          ]
        },
        {
          "id": "K5B4A-V2-3",
          "judul": "Bingkai foto",
          "ketukan": [
            "Ibu membuat bingkai foto. Kayu dibutuhkan untuk mengelilingi tepi foto.",
            "Ukurlah keempat tepi, jumlahkan, itu panjang kayu. Itu keliling.",
            "Daerah kertas foto di dalam bingkai adalah soal luas, bukan panjang kayu.",
            "METODE LUAR · Konteks Pagar dan Bingkai: tanyakan dulu, apa yang diukur—jalur luar atau isi dalam?"
          ],
          "papan": [
            "bingkai",
            "jumlah tepi",
            "kertas = luas",
            "fencing context"
          ]
        }
      ]
    },
    {
      "id": "K5B4A-V3",
      "judul": "Cara Hitung dari Sisi",
      "subjudul": "Langkah Path Length",
      "adegan": [
        {
          "id": "K5B4A-V3-1",
          "judul": "Tulis semua sisi",
          "ketukan": [
            "Tuliskan panjang setiap sisi yang membentuk jalur luar.",
            "Samakan satuan: jangan mencampur centi meter dengan meter tanpa mengubah.",
            "Jumlahkan semua sisi. Hasilnya panjang jalur keliling.",
            "Cek: hasil harus lebih besar dari sisi terpanjang, karena kamu menempuh sisi lain juga."
          ],
          "papan": [
            "tulis sisi",
            "satuan sama",
            "jumlahkan",
            "cek masuk akal"
          ]
        },
        {
          "id": "K5B4A-V3-2",
          "judul": "Latihan cepat",
          "ketukan": [
            "Persegi panjang sisi lima dan tiga: jalur lima, tiga, lima, tiga.",
            "Jumlah enam belas. Sama dengan dua kali lima ditambah tiga.",
            "Nanti di Sub-Bab C rumus itu dibahas. Dasarnya tetap path length.",
            "Jangan lupa: lima kali tiga adalah luas lima belas, bukan keliling."
          ],
          "papan": [
            "5+3+5+3",
            "16 = 2(5+3)",
            "dasar sama",
            "bukan luas 15"
          ]
        },
        {
          "id": "K5B4A-V3-3",
          "judul": "Siap tahap berikutnya",
          "ketukan": [
            "Kamu sudah punya tiga bekal: jalur keliling, konteks pagar-bingkai, dan beda dengan luas.",
            "Di peta pikiran dan permainan, kamu akan melatih memilah: ini keliling atau luas?",
            "Setiap kali ragu, bayangkan berjalan di tepi. Itu kunci Path Length.",
            "METODE LUAR · Bedakan Keliling dan Luas: luar dilalui, dalam diisi—dua pertanyaan berbeda."
          ],
          "papan": [
            "tiga bekal",
            "latihan pilah",
            "bayangkan jalan",
            "perimeter vs area"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pertanyaan keliling",
      "stepDesc": "Baca soal Apakah Keliling Bangun Datar Itu? dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Apa yang ditanya: panjang jalur luar atau isi dalam? Jika jalur luar, itu keliling. Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa memahami keliling sebagai panjang jalur yang menelusuri seluruh batas luar bangun sampai kembali ke titik awal (pa….",
      "icon": "❓",
      "flowFrom": "Pertanyaan keliling",
      "flowTo": "Path Length"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Path Length",
      "stepDesc": "Bayangkan berjalan mengelilingi tepi sampai kembali ke titik awal. Jarak tempuh = keliling. Pada Apakah Keliling Bangun Datar Itu?, langkah “Path Length” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Keliling sebagai Panjang Jalur: Keliling adalah panjang jalur yang menelusuri seluruh batas luar sampai kembali ke titik awal. Konteks Pagar dan Bingkai: Panjan…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🚶",
      "flowFrom": "Path Length",
      "flowTo": "Tulis sisi luar"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Tulis sisi luar",
      "stepDesc": "Catat panjang setiap sisi pada jalur. Satuan harus sama. Pada Apakah Keliling Bangun Datar Itu?, langkah “Tulis sisi luar” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Keliling sebagai Panjang Jalur: Keliling adalah panjang jalur yang menelusuri seluruh batas luar sampai kembali ke titik awal. Konteks Pagar dan Bingkai: Panjan…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "✍️",
      "flowFrom": "Tulis sisi luar",
      "flowTo": "Jumlahkan"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Jumlahkan",
      "stepDesc": "Keliling = jumlah semua sisi pada jalur luar. Pada Apakah Keliling Bangun Datar Itu?, langkah “Jumlahkan” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Keliling sebagai Panjang Jalur: Keliling adalah panjang jalur yang menelusuri seluruh batas luar sampai kembali ke titik awal. Konteks Pagar dan Bingkai: Panjan…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "➕",
      "flowFrom": "Jumlahkan",
      "flowTo": "Cek masuk akal"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Cek masuk akal",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Apakah Keliling Bangun Datar Itu?. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "✅",
      "flowFrom": "Cek masuk akal",
      "flowTo": "Bukan luas"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Bukan luas",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Apakah Keliling Bangun Datar Itu?. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "⚠️",
      "flowFrom": "Bukan luas",
      "flowTo": "Konteks nyata"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Konteks nyata",
      "stepDesc": "Simpulkan ide utama Apakah Keliling Bangun Datar Itu? dengan kalimatmu sendiri. Sebutkan cara yang kamu pakai dan mengapa cara itu membantu. Jelaskan kepada teman seolah-olah kamu guru kecil. Simpulan yang jelas menandakan konsepnya sudah dipahami.",
      "icon": "🏰",
      "flowFrom": "Konteks nyata",
      "flowTo": "Lanjut rumus"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Lanjut rumus",
      "stepDesc": "Latih lagi di tahap Concrete, Picture, lalu Abstract untuk Apakah Keliling Bangun Datar Itu?. Mulai dari benda nyata, lanjut ke diagram, baru ke lambang angka. Ulangi sampai kamu bisa menjelaskan tanpa melihat contoh. Bermain sambil berlatih membuat konsepnya melekat lebih lama.",
      "icon": "➡️",
      "flowFrom": "Lanjut rumus",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Path Length",
      "emoji": "🚶",
      "countNum": 1,
      "countWord": "jalur tepi",
      "suara": "Keliling = panjang jalur mengelilingi luar sampai kembali."
    },
    {
      "judul": "Contoh 4+4+4+4",
      "emoji": "4️⃣",
      "countNum": 16,
      "countWord": "16 cm",
      "suara": "Persegi sisi 4: keliling 16, bukan luas 16."
    },
    {
      "judul": "PP 5 dan 3",
      "emoji": "▭",
      "countNum": 16,
      "countWord": "5+3+5+3",
      "suara": "Jalur persegi panjang: dua panjang dan dua lebar."
    },
    {
      "judul": "Bukan luas",
      "emoji": "⚠️",
      "countNum": 1,
      "countWord": "p × l",
      "suara": "Panjang kali lebar mengisi dalam, bukan mengelilingi."
    },
    {
      "judul": "Pagar",
      "emoji": "🏡",
      "countNum": 1,
      "countWord": "fencing",
      "suara": "Panjang pagar = keliling tanah."
    },
    {
      "judul": "Bingkai",
      "emoji": "🖼️",
      "countNum": 1,
      "countWord": "kayu tepi",
      "suara": "Panjang kayu bingkai = keliling foto."
    },
    {
      "judul": "Baluwarti",
      "emoji": "🏰",
      "countNum": 1,
      "countWord": "batas benteng",
      "suara": "Pemugaran butuh panjang dinding luar."
    },
    {
      "judul": "Satuan",
      "emoji": "📐",
      "countNum": 1,
      "countWord": "cm atau m",
      "suara": "Semua sisi harus satu satuan sebelum dijumlah."
    },
    {
      "judul": "Cek",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "> sisi max",
      "suara": "Hasil keliling lebih besar dari sisi terpanjang."
    },
    {
      "judul": "Label metode",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "METODE LUAR",
      "suara": "Path Length, Fencing Context, Perimeter vs Area."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-a-c",
      "title": "Hitung Keliling",
      "bookReference": "hlm. 107–114",
      "objective": "Bayangkan berjalan di tepi bangun. Jumlahkan sisi jalur luar sampai kembali ke titik awal.",
      "mechanicDescription": "Tiga ronde hitung. Tiap soal adalah Path Length: jumlahkan sisi, bukan kalikan luas.",
      "voiceGuide": "Bayangkan berjalan di tepi. Pilih panjang jalur, bukan luas.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-a-c",
      "title": "Arti Keliling",
      "bookReference": "hlm. 107–114",
      "objective": "Bayangkan berjalan di tepi bangun. Jumlahkan sisi jalur luar sampai kembali ke titik awal.",
      "mechanicDescription": "Tiga ronde hitung. Tiap soal adalah Path Length: jumlahkan sisi, bukan kalikan luas.",
      "voiceGuide": "Bayangkan berjalan di tepi. Pilih panjang jalur, bukan luas.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-a-c",
      "title": "Pilih Definisi",
      "bookReference": "hlm. 107–114",
      "objective": "Bayangkan berjalan di tepi bangun. Jumlahkan sisi jalur luar sampai kembali ke titik awal.",
      "mechanicDescription": "Tiga ronde hitung. Tiap soal adalah Path Length: jumlahkan sisi, bukan kalikan luas.",
      "voiceGuide": "Bayangkan berjalan di tepi. Pilih panjang jalur, bukan luas.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-a-c",
      "title": "Pilah Ya/Tidak",
      "bookReference": "hlm. 107–114",
      "objective": "Bayangkan berjalan di tepi bangun. Jumlahkan sisi jalur luar sampai kembali ke titik awal.",
      "mechanicDescription": "Tiga ronde hitung. Tiap soal adalah Path Length: jumlahkan sisi, bukan kalikan luas.",
      "voiceGuide": "Bayangkan berjalan di tepi. Pilih panjang jalur, bukan luas.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-a-c",
      "title": "Jodohkan Keliling",
      "bookReference": "hlm. 107–114",
      "objective": "Bayangkan berjalan di tepi bangun. Jumlahkan sisi jalur luar sampai kembali ke titik awal. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde hitung. Tiap soal adalah Path Length: jumlahkan sisi, bukan kalikan luas.",
      "voiceGuide": "Bayangkan berjalan di tepi. Pilih panjang jalur, bukan luas. Mainkan dengan teliti.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-a-c",
      "title": "Memori Keliling",
      "bookReference": "hlm. 107–114",
      "objective": "Bayangkan berjalan di tepi bangun. Jumlahkan sisi jalur luar sampai kembali ke titik awal. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde hitung. Tiap soal adalah Path Length: jumlahkan sisi, bukan kalikan luas.",
      "voiceGuide": "Bayangkan berjalan di tepi. Pilih panjang jalur, bukan luas. Mainkan dengan teliti.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-a-c",
      "title": "Ketuk Hasil",
      "bookReference": "hlm. 107–114",
      "objective": "Bayangkan berjalan di tepi bangun. Jumlahkan sisi jalur luar sampai kembali ke titik awal. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde hitung. Tiap soal adalah Path Length: jumlahkan sisi, bukan kalikan luas.",
      "voiceGuide": "Bayangkan berjalan di tepi. Pilih panjang jalur, bukan luas. Mainkan dengan teliti.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-a-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 107–114",
      "objective": "Bayangkan berjalan di tepi bangun. Jumlahkan sisi jalur luar sampai kembali ke titik awal. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde hitung. Tiap soal adalah Path Length: jumlahkan sisi, bukan kalikan luas.",
      "voiceGuide": "Bayangkan berjalan di tepi. Pilih panjang jalur, bukan luas. Mainkan dengan teliti.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-a-c",
      "title": "Cerita Pagar & Bingkai",
      "bookReference": "hlm. 107–114",
      "objective": "Bayangkan berjalan di tepi bangun. Jumlahkan sisi jalur luar sampai kembali ke titik awal. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde hitung. Tiap soal adalah Path Length: jumlahkan sisi, bukan kalikan luas.",
      "voiceGuide": "Bayangkan berjalan di tepi. Pilih panjang jalur, bukan luas. Mainkan dengan teliti.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-a-c",
      "title": "Urutkan Hasil",
      "bookReference": "hlm. 107–114",
      "objective": "Bayangkan berjalan di tepi bangun. Jumlahkan sisi jalur luar sampai kembali ke titik awal. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde hitung. Tiap soal adalah Path Length: jumlahkan sisi, bukan kalikan luas.",
      "voiceGuide": "Bayangkan berjalan di tepi. Pilih panjang jalur, bukan luas. Mainkan dengan teliti.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-a-p",
      "title": "Diagram Hitung Keliling",
      "bookReference": "hlm. 107–114",
      "objective": "Pilah soal pagar dan bingkai: yang dibutuhkan adalah panjang jalur luar.",
      "mechanicDescription": "Tiga ronde arti. Fencing Context: tanya dulu—pagar/bingkai atau isi dalam?",
      "voiceGuide": "Pagar dan bingkai butuh keliling. Luas untuk isi dalam.",
      "diagramType": "hitung",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "rumus-a-p",
      "title": "Diagram Arti Keliling",
      "bookReference": "hlm. 107–114",
      "objective": "Pilah soal pagar dan bingkai: yang dibutuhkan adalah panjang jalur luar.",
      "mechanicDescription": "Tiga ronde arti. Fencing Context: tanya dulu—pagar/bingkai atau isi dalam?",
      "voiceGuide": "Pagar dan bingkai butuh keliling. Luas untuk isi dalam.",
      "diagramType": "rumus",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "arti-a-p",
      "title": "Diagram Pilih Definisi",
      "bookReference": "hlm. 107–114",
      "objective": "Pilah soal pagar dan bingkai: yang dibutuhkan adalah panjang jalur luar.",
      "mechanicDescription": "Tiga ronde arti. Fencing Context: tanya dulu—pagar/bingkai atau isi dalam?",
      "voiceGuide": "Pagar dan bingkai butuh keliling. Luas untuk isi dalam.",
      "diagramType": "arti",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sortir-a-p",
      "title": "Diagram Pilah Ya/Tidak",
      "bookReference": "hlm. 107–114",
      "objective": "Pilah soal pagar dan bingkai: yang dibutuhkan adalah panjang jalur luar.",
      "mechanicDescription": "Tiga ronde arti. Fencing Context: tanya dulu—pagar/bingkai atau isi dalam?",
      "voiceGuide": "Pagar dan bingkai butuh keliling. Luas untuk isi dalam.",
      "diagramType": "sortir",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-a-p",
      "title": "Diagram Jodohkan Keliling",
      "bookReference": "hlm. 107–114",
      "objective": "Pilah soal pagar dan bingkai: yang dibutuhkan adalah panjang jalur luar. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde arti. Fencing Context: tanya dulu—pagar/bingkai atau isi dalam?",
      "voiceGuide": "Pagar dan bingkai butuh keliling. Luas untuk isi dalam. Mainkan dengan teliti.",
      "diagramType": "jodoh",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memori-a-p",
      "title": "Diagram Memori Keliling",
      "bookReference": "hlm. 107–114",
      "objective": "Pilah soal pagar dan bingkai: yang dibutuhkan adalah panjang jalur luar. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde arti. Fencing Context: tanya dulu—pagar/bingkai atau isi dalam?",
      "voiceGuide": "Pagar dan bingkai butuh keliling. Luas untuk isi dalam. Mainkan dengan teliti.",
      "diagramType": "memori",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-a-p",
      "title": "Diagram Ketuk Hasil",
      "bookReference": "hlm. 107–114",
      "objective": "Pilah soal pagar dan bingkai: yang dibutuhkan adalah panjang jalur luar. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde arti. Fencing Context: tanya dulu—pagar/bingkai atau isi dalam?",
      "voiceGuide": "Pagar dan bingkai butuh keliling. Luas untuk isi dalam. Mainkan dengan teliti.",
      "diagramType": "ketuk",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "semua-a-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 107–114",
      "objective": "Pilah soal pagar dan bingkai: yang dibutuhkan adalah panjang jalur luar. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde arti. Fencing Context: tanya dulu—pagar/bingkai atau isi dalam?",
      "voiceGuide": "Pagar dan bingkai butuh keliling. Luas untuk isi dalam. Mainkan dengan teliti.",
      "diagramType": "semua",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "cerita-a-p",
      "title": "Diagram Cerita Pagar & Bingkai",
      "bookReference": "hlm. 107–114",
      "objective": "Pilah soal pagar dan bingkai: yang dibutuhkan adalah panjang jalur luar. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde arti. Fencing Context: tanya dulu—pagar/bingkai atau isi dalam?",
      "voiceGuide": "Pagar dan bingkai butuh keliling. Luas untuk isi dalam. Mainkan dengan teliti.",
      "diagramType": "cerita",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "urut-a-p",
      "title": "Diagram Urutkan Hasil",
      "bookReference": "hlm. 107–114",
      "objective": "Pilah soal pagar dan bingkai: yang dibutuhkan adalah panjang jalur luar. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde arti. Fencing Context: tanya dulu—pagar/bingkai atau isi dalam?",
      "voiceGuide": "Pagar dan bingkai butuh keliling. Luas untuk isi dalam. Mainkan dengan teliti.",
      "diagramType": "urut",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-a-a",
      "title": "Tulis Hitung Keliling",
      "bookReference": "hlm. 107–114",
      "objective": "Bedakan keliling dan luas pada setiap pilihan.",
      "mechanicDescription": "Tiga ronde pilah. Perimeter vs Area: luar dilalui, dalam diisi.",
      "voiceGuide": "Keliling = jalur luar. Luas = isi dalam. Jangan tertukar.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-a-a",
      "title": "Tulis Arti Keliling",
      "bookReference": "hlm. 107–114",
      "objective": "Bedakan keliling dan luas pada setiap pilihan.",
      "mechanicDescription": "Tiga ronde pilah. Perimeter vs Area: luar dilalui, dalam diisi.",
      "voiceGuide": "Keliling = jalur luar. Luas = isi dalam. Jangan tertukar.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-a-a",
      "title": "Tulis Pilih Definisi",
      "bookReference": "hlm. 107–114",
      "objective": "Bedakan keliling dan luas pada setiap pilihan.",
      "mechanicDescription": "Tiga ronde pilah. Perimeter vs Area: luar dilalui, dalam diisi.",
      "voiceGuide": "Keliling = jalur luar. Luas = isi dalam. Jangan tertukar.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-a-a",
      "title": "Tulis Pilah Ya/Tidak",
      "bookReference": "hlm. 107–114",
      "objective": "Bedakan keliling dan luas pada setiap pilihan.",
      "mechanicDescription": "Tiga ronde pilah. Perimeter vs Area: luar dilalui, dalam diisi.",
      "voiceGuide": "Keliling = jalur luar. Luas = isi dalam. Jangan tertukar.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-a-a",
      "title": "Tulis Jodohkan Keliling",
      "bookReference": "hlm. 107–114",
      "objective": "Bedakan keliling dan luas pada setiap pilihan. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde pilah. Perimeter vs Area: luar dilalui, dalam diisi.",
      "voiceGuide": "Keliling = jalur luar. Luas = isi dalam. Jangan tertukar. Mainkan dengan teliti.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-a-a",
      "title": "Tulis Memori Keliling",
      "bookReference": "hlm. 107–114",
      "objective": "Bedakan keliling dan luas pada setiap pilihan. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde pilah. Perimeter vs Area: luar dilalui, dalam diisi.",
      "voiceGuide": "Keliling = jalur luar. Luas = isi dalam. Jangan tertukar. Mainkan dengan teliti.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-a",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 107–114",
      "objective": "Bedakan keliling dan luas pada setiap pilihan. Latihan lanjutan.",
      "mechanicDescription": "Dua ronde. Tiga ronde pilah. Perimeter vs Area: luar dilalui, dalam diisi.",
      "voiceGuide": "Keliling = jalur luar. Luas = isi dalam. Jangan tertukar. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-a",
      "title": "Detektif Keliling",
      "bookReference": "hlm. 107–114",
      "objective": "Bedakan keliling dan luas pada setiap pilihan. Latihan lanjutan.",
      "mechanicDescription": "Tiga soal. Tiga ronde pilah. Perimeter vs Area: luar dilalui, dalam diisi.",
      "voiceGuide": "Keliling = jalur luar. Luas = isi dalam. Jangan tertukar. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "peta-a",
      "title": "Peta Konsep",
      "bookReference": "hlm. 107–114",
      "objective": "Bedakan keliling dan luas pada setiap pilihan. Latihan lanjutan.",
      "mechanicDescription": "Satu peta. Tiga ronde pilah. Perimeter vs Area: luar dilalui, dalam diisi.",
      "voiceGuide": "Keliling = jalur luar. Luas = isi dalam. Jangan tertukar. Mainkan dengan teliti.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "cerita-q-a",
      "title": "Cerita Angka",
      "bookReference": "hlm. 107–114",
      "objective": "Bedakan keliling dan luas pada setiap pilihan. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde pilah. Perimeter vs Area: luar dilalui, dalam diisi.",
      "voiceGuide": "Keliling = jalur luar. Luas = isi dalam. Jangan tertukar. Mainkan dengan teliti.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "🚶",
      "nama": "Path Length",
      "isi": "Keliling adalah panjang jalur di batas luar sampai kembali ke titik awal. Bayangkan berjalan mengelilingi bangun.",
      "suara": "Panjang jalur tepi."
    },
    {
      "ikon": "🏡",
      "nama": "Fencing Context",
      "isi": "Pagar, bingkai, dan dinding benteng membutuhkan panjang jalur luar, bukan luas daerah dalam.",
      "suara": "Konteks pagar dan bingkai."
    },
    {
      "ikon": "⚠️",
      "nama": "Bukan luas",
      "isi": "Luas mengisi dalam. Rumus panjang kali lebar atau sisi kali sisi bukan keliling.",
      "suara": "Jangan tertukar."
    },
    {
      "ikon": "➕",
      "nama": "Cara dasar",
      "isi": "Tulis semua sisi luar, samakan satuan, jumlahkan, lalu cek apakah hasilnya masuk akal.",
      "suara": "Jumlahkan sisi luar."
    }
  ],
  "poinSuara": "Ingat tiga kunci: keliling adalah panjang jalur, dipakai untuk pagar dan bingkai, dan berbeda dari luas.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Ukur sisi",
        "warna": "#FDE68A"
      },
      {
        "teks": "samakan satuan",
        "warna": "#BBF7D0"
      },
      {
        "teks": "jumlahkan",
        "warna": "#BFDBFE"
      },
      {
        "teks": "cek hasil",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: terapkan Keliling sebagai Panjang Jalur pada satu benda nyata, lalu ceritakan langkahmu.",
  "refleksi": [
    "Bagaimana Keliling sebagai Panjang Jalur membantumu memahami soal?",
    "Kapan kamu memakai Konteks Pagar dan Bingkai?",
    "Apa bedanya dengan hanya menghafal rumus?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Path Length",
      "namaId": "Keliling sebagai Panjang Jalur",
      "asal": "Van de Walle / pengukuran",
      "ringkas": "Keliling adalah panjang jalur yang menelusuri seluruh batas luar sampai kembali ke titik awal.",
      "tahap": [
        "Story",
        "Mind",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Fencing Context",
      "namaId": "Konteks Pagar dan Bingkai",
      "asal": "Real-world measurement pedagogy",
      "ringkas": "Panjang pagar, bingkai, atau batas benteng memakai keliling, bukan luas daerah di dalamnya.",
      "tahap": [
        "Story",
        "Infografis",
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Perimeter vs Area",
      "namaId": "Bedakan Keliling dan Luas",
      "asal": "Misconception research",
      "ringkas": "Keliling mengelilingi luar; luas mengisi dalam. Satuannya panjang, bukan daerah.",
      "tahap": [
        "Story",
        "Infografis",
        "Abstract"
      ]
    }
  ]
};

export const SUB_B54: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Keliling Segitiga)",
  "fullTitle": "Sub-Bab B: Keliling Segitiga",
  "targetDescription": "Siswa menghitung keliling segitiga dengan menjumlahkan tiga sisi (side sum), memakai pintasan 3 × sisi pada segitiga sama sisi, serta mengukur dengan satuan yang sama sesuai Buku Siswa Kelas V Bab 4 Sub-Bab B.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Kita belajar keliling segitiga. Tetap pakai Path Length: berjalan di tiga sisi sampai kembali. Untuk segitiga sembarang jumlahkan a plus b plus c. Jika sama sisi, tiga sisi sama sehingga boleh dikali tiga. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menentukan keliling segitiga sembarang dan segitiga sama sisi.",
    "referensi": "Buku Siswa Matematika Kelas V Kemendikbudristek (Bab 4: Keliling Bangun Datar, Sub-Bab B hlm. 115–117)."
  },
  "videos": [
    {
      "id": "K5B4B-V1",
      "judul": "Tiga Sisi, Satu Jalur",
      "subjudul": "Side Sum",
      "adegan": [
        {
          "id": "K5B4B-V1-1",
          "judul": "Segitiga punya tiga sisi",
          "ketukan": [
            "Segitiga adalah bangun dengan tiga sisi. Jalur kelilingnya melewati ketiga sisi itu.",
            "Tidak peduli siku-siku, sama kaki, atau sembarang: dasar hitungnya sama.",
            "Keliling = sisi a ditambah sisi b ditambah sisi c.",
            "Itu masih Path Length: kamu berjalan di a, lalu b, lalu c, lalu kembali."
          ],
          "papan": [
            "3 sisi",
            "semua jenis",
            "a+b+c",
            "path length"
          ]
        },
        {
          "id": "K5B4B-V1-2",
          "judul": "Contoh 5, 4, 7",
          "ketukan": [
            "Di buku ada segitiga sisi lima, empat, dan tujuh centi meter.",
            "Jalurmu: lima, lalu empat, lalu tujuh.",
            "Jumlahkan: lima plus empat empat belas, plus tujuh dua puluh satu? Tunggu: lima plus empat sama dengan sembilan, plus tujuh sama dengan enam belas.",
            "Keliling enam belas centi meter. Bukan lima kali empat."
          ],
          "papan": [
            "5, 4, 7",
            "jalan 3 sisi",
            "5+4+7=16",
            "K=16 cm"
          ]
        },
        {
          "id": "K5B4B-V1-3",
          "judul": "Ukur dulu",
          "ketukan": [
            "Jika sisi belum tertulis, ukur dengan penggaris. Jangan menebak.",
            "Pastikan ketiga ukuran memakai satuan yang sama.",
            "Baru jumlahkan. Ini metode Ukur Dulu Baru Jumlah.",
            "METODE LUAR · Jumlah Tiga Sisi: a + b + c adalah Path Length pada segitiga."
          ],
          "papan": [
            "ukur",
            "satuan sama",
            "ukur lalu jumlah",
            "side sum"
          ]
        }
      ]
    },
    {
      "id": "K5B4B-V2",
      "judul": "Sama Sisi: Kali Tiga",
      "subjudul": "Equilateral Shortcut",
      "adegan": [
        {
          "id": "K5B4B-V2-1",
          "judul": "Tiga sisi sama",
          "ketukan": [
            "Pada segitiga sama sisi, ketiga sisi sama panjang. Biasanya ada tanda sisi sama.",
            "Jika sisi lima, jalurmu: lima, lima, dan lima.",
            "Menjumlah tiga kali lima sama dengan mengalikan tiga kali lima.",
            "Hasil lima belas. Pintasan ini menghemat waktu, hasilnya sama dengan menjumlah."
          ],
          "papan": [
            "sama sisi",
            "5+5+5",
            "3×5",
            "15"
          ]
        },
        {
          "id": "K5B4B-V2-2",
          "judul": "Sisi enam",
          "ketukan": [
            "Jika sisi enam centi meter, keliling tiga kali enam = delapan belas.",
            "Jangan memakai rumus ini pada segitiga yang sisi-sisinya beda.",
            "Sama kaki punya dua sisi sama, tetap jumlahkan tiga sisi; jangan otomatis kali tiga.",
            "Pintasan hanya untuk ketiga sisi benar-benar sama."
          ],
          "papan": [
            "3×6=18",
            "cek dulu",
            "sama kaki ≠ ×3",
            "syarat ketat"
          ]
        },
        {
          "id": "K5B4B-V2-3",
          "judul": "Mengapa boleh dikali",
          "ketukan": [
            "Karena menjumlah s + s + s sama dengan 3 × s.",
            "Ini masih Path Length, hanya ditulis lebih singkat.",
            "Setelah hitung, cek: hasil harus tiga kali sisi, dan lebih besar dari satu sisi.",
            "METODE LUAR · Pintasan Segitiga Sama Sisi: 3 × sisi, hanya jika ketiga sisi sama."
          ],
          "papan": [
            "s+s+s",
            "tetap jalur",
            "cek",
            "equilateral"
          ]
        }
      ]
    },
    {
      "id": "K5B4B-V3",
      "judul": "Cek dan Siap",
      "subjudul": "Measure Then Sum",
      "adegan": [
        {
          "id": "K5B4B-V3-1",
          "judul": "Sama kaki hati-hati",
          "ketukan": [
            "Segitiga sama kaki: dua sisi sama, satu sisi berbeda.",
            "Tetap ukur atau baca ketiga sisi, lalu jumlahkan.",
            "Kesalahan umum: mengira sama kaki boleh langsung kali tiga.",
            "Ingat: kali tiga hanya sama sisi."
          ],
          "papan": [
            "2 sama",
            "tetap a+b+c",
            "salah kaprah",
            "ingat syarat"
          ]
        },
        {
          "id": "K5B4B-V3-2",
          "judul": "Cek hasil",
          "ketukan": [
            "Hasil keliling harus lebih besar dari sisi terpanjang.",
            "Jika satuan centi meter, jawabannya juga centi meter.",
            "Hitung ulang jika ragu: side sum tidak boleh melewatkan satu sisi.",
            "Siap bermain dengan rumus a+b+c dan 3×s."
          ],
          "papan": [
            "cek",
            "satuan",
            "ulang",
            "main"
          ]
        },
        {
          "id": "K5B4B-V3-3",
          "judul": "Jembatan ke segi empat",
          "ketukan": [
            "Segitiga selesai. Berikutnya segi empat: ada dua panjang dan dua lebar.",
            "Dasarnya sama: Path Length di seluruh sisi luar.",
            "Bekalmu: side sum, pintasan sama sisi, dan ukur dulu.",
            "METODE LUAR · Ukur Dulu Baru Jumlah: akurat sebelum menjumlah."
          ],
          "papan": [
            "segi 4",
            "dasar sama",
            "bekal",
            "measure then sum"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Kenali jenis",
      "stepDesc": "Baca soal Keliling Segitiga dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Sembarang, sama kaki, atau sama sisi? Syarat rumus bergantung jenis. Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa menghitung keliling segitiga dengan menjumlahkan tiga sisi (side sum), memakai pintasan 3 × sisi pada segitiga sam….",
      "icon": "👀",
      "flowFrom": "Kenali jenis",
      "flowTo": "Ukur / baca sisi"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Ukur / baca sisi",
      "stepDesc": "Catat a, b, c dengan satuan sama. Pada Keliling Segitiga, langkah “Ukur / baca sisi” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Jumlah Tiga Sisi: Keliling segitiga = sisi satu + sisi dua + sisi tiga; ini Path Length pada tiga sisi. Pintasan Segitiga Sama Sisi: Jika ketiga sisi sama, keli…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "📏",
      "flowFrom": "Ukur / baca sisi",
      "flowTo": "Side Sum"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Side Sum",
      "stepDesc": "Selalu aman: K = a + b + c. Pada Keliling Segitiga, langkah “Side Sum” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Jumlah Tiga Sisi: Keliling segitiga = sisi satu + sisi dua + sisi tiga; ini Path Length pada tiga sisi. Pintasan Segitiga Sama Sisi: Jika ketiga sisi sama, keli…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "➕",
      "flowFrom": "Side Sum",
      "flowTo": "Pintasan?"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Pintasan?",
      "stepDesc": "Hanya jika a = b = c, boleh K = 3 × s. Pada Keliling Segitiga, langkah “Pintasan?” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Jumlah Tiga Sisi: Keliling segitiga = sisi satu + sisi dua + sisi tiga; ini Path Length pada tiga sisi. Pintasan Segitiga Sama Sisi: Jika ketiga sisi sama, keli…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "✨",
      "flowFrom": "Pintasan?",
      "flowTo": "Hitung"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Hitung",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Keliling Segitiga. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "🧮",
      "flowFrom": "Hitung",
      "flowTo": "Cek"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Keliling Segitiga. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Cek",
      "flowTo": "Sama kaki"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Sama kaki",
      "stepDesc": "Simpulkan ide utama Keliling Segitiga dengan kalimatmu sendiri. Sebutkan cara yang kamu pakai dan mengapa cara itu membantu. Jelaskan kepada teman seolah-olah kamu guru kecil. Simpulan yang jelas menandakan konsepnya sudah dipahami.",
      "icon": "🦵",
      "flowFrom": "Sama kaki",
      "flowTo": "Lanjut C"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Lanjut C",
      "stepDesc": "Latih lagi di tahap Concrete, Picture, lalu Abstract untuk Keliling Segitiga. Mulai dari benda nyata, lanjut ke diagram, baru ke lambang angka. Ulangi sampai kamu bisa menjelaskan tanpa melihat contoh. Bermain sambil berlatih membuat konsepnya melekat lebih lama.",
      "icon": "➡️",
      "flowFrom": "Lanjut C",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "a+b+c",
      "emoji": "🔺",
      "countNum": 1,
      "countWord": "umum",
      "suara": "Semua segitiga: jumlah tiga sisi."
    },
    {
      "judul": "5+4+7",
      "emoji": "➕",
      "countNum": 16,
      "countWord": "16 cm",
      "suara": "Contoh buku: keliling 16."
    },
    {
      "judul": "3×sisi",
      "emoji": "✨",
      "countNum": 1,
      "countWord": "sama sisi",
      "suara": "Pintasan hanya jika ketiga sisi sama."
    },
    {
      "judul": "3×5",
      "emoji": "5️⃣",
      "countNum": 15,
      "countWord": "15 cm",
      "suara": "Sama sisi sisi 5."
    },
    {
      "judul": "3×6",
      "emoji": "6️⃣",
      "countNum": 18,
      "countWord": "18 cm",
      "suara": "Sama sisi sisi 6."
    },
    {
      "judul": "Ukur dulu",
      "emoji": "📏",
      "countNum": 1,
      "countWord": "penggaris",
      "suara": "Ukur tiap sisi sebelum jumlah."
    },
    {
      "judul": "3+4+5",
      "emoji": "📐",
      "countNum": 12,
      "countWord": "12 cm",
      "suara": "Contoh lain side sum."
    },
    {
      "judul": "Sama kaki",
      "emoji": "🦵",
      "countNum": 1,
      "countWord": "tetap a+b+c",
      "suara": "Jangan langsung kali tiga."
    },
    {
      "judul": "Cek",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "> sisi max",
      "suara": "Validasi hasil."
    },
    {
      "judul": "Path Length",
      "emoji": "🚶",
      "countNum": 1,
      "countWord": "3 sisi",
      "suara": "Berjalan di tiga sisi."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-b-c",
      "title": "Hitung Segitiga",
      "bookReference": "hlm. 115–117",
      "objective": "Jumlahkan ketiga sisi segitiga sebagai Path Length.",
      "mechanicDescription": "Tiga ronde. Side Sum: a+b+c. Jangan langsung kali tiga kecuali sama sisi.",
      "voiceGuide": "Segitiga: jumlahkan ketiga sisi jalur.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-b-c",
      "title": "Rumus Segitiga",
      "bookReference": "hlm. 115–117",
      "objective": "Jumlahkan ketiga sisi segitiga sebagai Path Length.",
      "mechanicDescription": "Tiga ronde. Side Sum: a+b+c. Jangan langsung kali tiga kecuali sama sisi.",
      "voiceGuide": "Segitiga: jumlahkan ketiga sisi jalur.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-b-c",
      "title": "Arti Rumus",
      "bookReference": "hlm. 115–117",
      "objective": "Jumlahkan ketiga sisi segitiga sebagai Path Length.",
      "mechanicDescription": "Tiga ronde. Side Sum: a+b+c. Jangan langsung kali tiga kecuali sama sisi.",
      "voiceGuide": "Segitiga: jumlahkan ketiga sisi jalur.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-b-c",
      "title": "Pilah Sama/Bebas",
      "bookReference": "hlm. 115–117",
      "objective": "Jumlahkan ketiga sisi segitiga sebagai Path Length.",
      "mechanicDescription": "Tiga ronde. Side Sum: a+b+c. Jangan langsung kali tiga kecuali sama sisi.",
      "voiceGuide": "Segitiga: jumlahkan ketiga sisi jalur.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-b-c",
      "title": "Jodohkan Segitiga",
      "bookReference": "hlm. 115–117",
      "objective": "Jumlahkan ketiga sisi segitiga sebagai Path Length. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Side Sum: a+b+c. Jangan langsung kali tiga kecuali sama sisi.",
      "voiceGuide": "Segitiga: jumlahkan ketiga sisi jalur. Mainkan dengan teliti.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-b-c",
      "title": "Memori Segitiga",
      "bookReference": "hlm. 115–117",
      "objective": "Jumlahkan ketiga sisi segitiga sebagai Path Length. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Side Sum: a+b+c. Jangan langsung kali tiga kecuali sama sisi.",
      "voiceGuide": "Segitiga: jumlahkan ketiga sisi jalur. Mainkan dengan teliti.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-b-c",
      "title": "Ketuk Hasil",
      "bookReference": "hlm. 115–117",
      "objective": "Jumlahkan ketiga sisi segitiga sebagai Path Length. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Side Sum: a+b+c. Jangan langsung kali tiga kecuali sama sisi.",
      "voiceGuide": "Segitiga: jumlahkan ketiga sisi jalur. Mainkan dengan teliti.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-b-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 115–117",
      "objective": "Jumlahkan ketiga sisi segitiga sebagai Path Length. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Side Sum: a+b+c. Jangan langsung kali tiga kecuali sama sisi.",
      "voiceGuide": "Segitiga: jumlahkan ketiga sisi jalur. Mainkan dengan teliti.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-b-c",
      "title": "Cerita Segitiga",
      "bookReference": "hlm. 115–117",
      "objective": "Jumlahkan ketiga sisi segitiga sebagai Path Length. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Side Sum: a+b+c. Jangan langsung kali tiga kecuali sama sisi.",
      "voiceGuide": "Segitiga: jumlahkan ketiga sisi jalur. Mainkan dengan teliti.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-b-c",
      "title": "Urutkan Hasil",
      "bookReference": "hlm. 115–117",
      "objective": "Jumlahkan ketiga sisi segitiga sebagai Path Length. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Side Sum: a+b+c. Jangan langsung kali tiga kecuali sama sisi.",
      "voiceGuide": "Segitiga: jumlahkan ketiga sisi jalur. Mainkan dengan teliti.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-b-p",
      "title": "Diagram Hitung Segitiga",
      "bookReference": "hlm. 115–117",
      "objective": "Pakai jalan pintas 3×sisi hanya jika ketiga sisi sama.",
      "mechanicDescription": "Tiga ronde rumus. Equilateral shortcut hanya bila sisi sama.",
      "voiceGuide": "Sama sisi? Boleh tiga kali sisi. Kalau tidak, jumlahkan.",
      "diagramType": "hitung",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "rumus-b-p",
      "title": "Diagram Rumus Segitiga",
      "bookReference": "hlm. 115–117",
      "objective": "Pakai jalan pintas 3×sisi hanya jika ketiga sisi sama.",
      "mechanicDescription": "Tiga ronde rumus. Equilateral shortcut hanya bila sisi sama.",
      "voiceGuide": "Sama sisi? Boleh tiga kali sisi. Kalau tidak, jumlahkan.",
      "diagramType": "rumus",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "arti-b-p",
      "title": "Diagram Arti Rumus",
      "bookReference": "hlm. 115–117",
      "objective": "Pakai jalan pintas 3×sisi hanya jika ketiga sisi sama.",
      "mechanicDescription": "Tiga ronde rumus. Equilateral shortcut hanya bila sisi sama.",
      "voiceGuide": "Sama sisi? Boleh tiga kali sisi. Kalau tidak, jumlahkan.",
      "diagramType": "arti",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sortir-b-p",
      "title": "Diagram Pilah Sama/Bebas",
      "bookReference": "hlm. 115–117",
      "objective": "Pakai jalan pintas 3×sisi hanya jika ketiga sisi sama.",
      "mechanicDescription": "Tiga ronde rumus. Equilateral shortcut hanya bila sisi sama.",
      "voiceGuide": "Sama sisi? Boleh tiga kali sisi. Kalau tidak, jumlahkan.",
      "diagramType": "sortir",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-b-p",
      "title": "Diagram Jodohkan Segitiga",
      "bookReference": "hlm. 115–117",
      "objective": "Pakai jalan pintas 3×sisi hanya jika ketiga sisi sama. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde rumus. Equilateral shortcut hanya bila sisi sama.",
      "voiceGuide": "Sama sisi? Boleh tiga kali sisi. Kalau tidak, jumlahkan. Mainkan dengan teliti.",
      "diagramType": "jodoh",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memori-b-p",
      "title": "Diagram Memori Segitiga",
      "bookReference": "hlm. 115–117",
      "objective": "Pakai jalan pintas 3×sisi hanya jika ketiga sisi sama. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde rumus. Equilateral shortcut hanya bila sisi sama.",
      "voiceGuide": "Sama sisi? Boleh tiga kali sisi. Kalau tidak, jumlahkan. Mainkan dengan teliti.",
      "diagramType": "memori",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-b-p",
      "title": "Diagram Ketuk Hasil",
      "bookReference": "hlm. 115–117",
      "objective": "Pakai jalan pintas 3×sisi hanya jika ketiga sisi sama. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde rumus. Equilateral shortcut hanya bila sisi sama.",
      "voiceGuide": "Sama sisi? Boleh tiga kali sisi. Kalau tidak, jumlahkan. Mainkan dengan teliti.",
      "diagramType": "ketuk",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "semua-b-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 115–117",
      "objective": "Pakai jalan pintas 3×sisi hanya jika ketiga sisi sama. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde rumus. Equilateral shortcut hanya bila sisi sama.",
      "voiceGuide": "Sama sisi? Boleh tiga kali sisi. Kalau tidak, jumlahkan. Mainkan dengan teliti.",
      "diagramType": "semua",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "cerita-b-p",
      "title": "Diagram Cerita Segitiga",
      "bookReference": "hlm. 115–117",
      "objective": "Pakai jalan pintas 3×sisi hanya jika ketiga sisi sama. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde rumus. Equilateral shortcut hanya bila sisi sama.",
      "voiceGuide": "Sama sisi? Boleh tiga kali sisi. Kalau tidak, jumlahkan. Mainkan dengan teliti.",
      "diagramType": "cerita",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "urut-b-p",
      "title": "Diagram Urutkan Hasil",
      "bookReference": "hlm. 115–117",
      "objective": "Pakai jalan pintas 3×sisi hanya jika ketiga sisi sama. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde rumus. Equilateral shortcut hanya bila sisi sama.",
      "voiceGuide": "Sama sisi? Boleh tiga kali sisi. Kalau tidak, jumlahkan. Mainkan dengan teliti.",
      "diagramType": "urut",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-b-a",
      "title": "Tulis Hitung Segitiga",
      "bookReference": "hlm. 115–117",
      "objective": "Baca tanda sisi sama, lalu pilih cara hitung yang tepat.",
      "mechanicDescription": "Tiga ronde. Tanda sisi sama = boleh 3×s; tanpa tanda = Side Sum.",
      "voiceGuide": "Lihat tanda sisi. Lalu pilih jumlah atau kali tiga.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-b-a",
      "title": "Tulis Rumus Segitiga",
      "bookReference": "hlm. 115–117",
      "objective": "Baca tanda sisi sama, lalu pilih cara hitung yang tepat.",
      "mechanicDescription": "Tiga ronde. Tanda sisi sama = boleh 3×s; tanpa tanda = Side Sum.",
      "voiceGuide": "Lihat tanda sisi. Lalu pilih jumlah atau kali tiga.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-b-a",
      "title": "Tulis Arti Rumus",
      "bookReference": "hlm. 115–117",
      "objective": "Baca tanda sisi sama, lalu pilih cara hitung yang tepat.",
      "mechanicDescription": "Tiga ronde. Tanda sisi sama = boleh 3×s; tanpa tanda = Side Sum.",
      "voiceGuide": "Lihat tanda sisi. Lalu pilih jumlah atau kali tiga.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-b-a",
      "title": "Tulis Pilah Sama/Bebas",
      "bookReference": "hlm. 115–117",
      "objective": "Baca tanda sisi sama, lalu pilih cara hitung yang tepat.",
      "mechanicDescription": "Tiga ronde. Tanda sisi sama = boleh 3×s; tanpa tanda = Side Sum.",
      "voiceGuide": "Lihat tanda sisi. Lalu pilih jumlah atau kali tiga.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-b-a",
      "title": "Tulis Jodohkan Segitiga",
      "bookReference": "hlm. 115–117",
      "objective": "Baca tanda sisi sama, lalu pilih cara hitung yang tepat. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Tanda sisi sama = boleh 3×s; tanpa tanda = Side Sum.",
      "voiceGuide": "Lihat tanda sisi. Lalu pilih jumlah atau kali tiga. Mainkan dengan teliti.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-b-a",
      "title": "Tulis Memori Segitiga",
      "bookReference": "hlm. 115–117",
      "objective": "Baca tanda sisi sama, lalu pilih cara hitung yang tepat. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Tanda sisi sama = boleh 3×s; tanpa tanda = Side Sum.",
      "voiceGuide": "Lihat tanda sisi. Lalu pilih jumlah atau kali tiga. Mainkan dengan teliti.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-b",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 115–117",
      "objective": "Baca tanda sisi sama, lalu pilih cara hitung yang tepat. Latihan lanjutan.",
      "mechanicDescription": "Dua ronde. Tiga ronde. Tanda sisi sama = boleh 3×s; tanpa tanda = Side Sum.",
      "voiceGuide": "Lihat tanda sisi. Lalu pilih jumlah atau kali tiga. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-b",
      "title": "Detektif Keliling",
      "bookReference": "hlm. 115–117",
      "objective": "Baca tanda sisi sama, lalu pilih cara hitung yang tepat. Latihan lanjutan.",
      "mechanicDescription": "Tiga soal. Tiga ronde. Tanda sisi sama = boleh 3×s; tanpa tanda = Side Sum.",
      "voiceGuide": "Lihat tanda sisi. Lalu pilih jumlah atau kali tiga. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "peta-b",
      "title": "Peta Konsep",
      "bookReference": "hlm. 115–117",
      "objective": "Baca tanda sisi sama, lalu pilih cara hitung yang tepat. Latihan lanjutan.",
      "mechanicDescription": "Satu peta. Tiga ronde. Tanda sisi sama = boleh 3×s; tanpa tanda = Side Sum.",
      "voiceGuide": "Lihat tanda sisi. Lalu pilih jumlah atau kali tiga. Mainkan dengan teliti.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "cerita-q-b",
      "title": "Cerita Angka",
      "bookReference": "hlm. 115–117",
      "objective": "Baca tanda sisi sama, lalu pilih cara hitung yang tepat. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Tanda sisi sama = boleh 3×s; tanpa tanda = Side Sum.",
      "voiceGuide": "Lihat tanda sisi. Lalu pilih jumlah atau kali tiga. Mainkan dengan teliti.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "➕",
      "nama": "Side Sum",
      "isi": "Keliling segitiga = a + b + c. Ini Path Length pada tiga sisi.",
      "suara": "Jumlah tiga sisi."
    },
    {
      "ikon": "✨",
      "nama": "Pintasan sama sisi",
      "isi": "Jika a = b = c, K = 3 × s. Hasil sama dengan menjumlah.",
      "suara": "Tiga kali sisi."
    },
    {
      "ikon": "📏",
      "nama": "Ukur dulu",
      "isi": "Ukur dengan penggaris dan satuan sama sebelum menjumlah.",
      "suara": "Akurat dulu."
    },
    {
      "ikon": "🦵",
      "nama": "Sama kaki",
      "isi": "Dua sisi sama belum tentu ketiga sama; tetap jumlahkan tiga sisi.",
      "suara": "Jangan salah rumus."
    }
  ],
  "poinSuara": "Ingat: a plus b plus c selalu aman; tiga kali sisi hanya untuk sama sisi.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Kenali jenis",
        "warna": "#FDE68A"
      },
      {
        "teks": "ukur sisi",
        "warna": "#BBF7D0"
      },
      {
        "teks": "pilih rumus",
        "warna": "#BFDBFE"
      },
      {
        "teks": "hitung & cek",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: terapkan Jumlah Tiga Sisi pada satu benda nyata, lalu ceritakan langkahmu.",
  "refleksi": [
    "Bagaimana Jumlah Tiga Sisi membantumu memahami soal?",
    "Kapan kamu memakai Pintasan Segitiga Sama Sisi?",
    "Apa bedanya dengan hanya menghafal rumus?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Side Sum",
      "namaId": "Jumlah Tiga Sisi",
      "asal": "Elementary geometry",
      "ringkas": "Keliling segitiga = sisi satu + sisi dua + sisi tiga; ini Path Length pada tiga sisi.",
      "tahap": [
        "Story",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Equilateral Shortcut",
      "namaId": "Pintasan Segitiga Sama Sisi",
      "asal": "Van de Walle",
      "ringkas": "Jika ketiga sisi sama, keliling = 3 × panjang sisi.",
      "tahap": [
        "Story",
        "Mind",
        "Picture",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Measure Then Sum",
      "namaId": "Ukur Dulu Baru Jumlah",
      "asal": "Hands-on measurement",
      "ringkas": "Ukur tiap sisi dengan satuan sama, baru jumlahkan agar akurat.",
      "tahap": [
        "Concrete",
        "Infografis"
      ]
    }
  ]
};

export const SUB_C54: SubBabNaskah = {
  "id": "C",
  "codeTitle": "Sub-Bab C (Keliling Segi Empat)",
  "fullTitle": "Sub-Bab C: Keliling Segi Empat",
  "targetDescription": "Siswa menghitung keliling persegi panjang dengan 2(p+l) dan persegi dengan 4×sisi, memahami sisi berhadapan sama, serta menolak miskonsepsi p×l sebagai keliling sesuai Buku Siswa Kelas V Bab 4 Sub-Bab C.",
  "secondaryBg": "#DCFCE7",
  "secondaryBorder": "#16A34A",
  "secondaryText": "#14532D",
  "silabus": {
    "teksSuara": "Kita belajar keliling segi empat. Path Length pada persegi panjang melewati dua panjang dan dua lebar, sehingga K sama dengan dua kali panjang plus lebar. Pada persegi, empat sisi sama, K sama dengan empat kali sisi. Jangan tertukar dengan luas. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menentukan keliling persegi panjang dan persegi, serta membedakannya dari luas.",
    "referensi": "Buku Siswa Matematika Kelas V Kemendikbudristek (Bab 4: Keliling Bangun Datar, Sub-Bab C hlm. 118–121)."
  },
  "videos": [
    {
      "id": "K5B4C-V1",
      "judul": "Persegi Panjang: 2(p+l)",
      "subjudul": "Rectangle Formula",
      "adegan": [
        {
          "id": "K5B4C-V1-1",
          "judul": "Sisi berhadapan",
          "ketukan": [
            "Persegi panjang: panjang berhadapan sama, lebar berhadapan sama.",
            "Jalur keliling: panjang, lebar, panjang, lebar.",
            "Itu dua panjang dan dua lebar. Boleh ditulis 2p + 2l.",
            "Atau dikelompokkan: dua kali jumlah panjang dan lebar, 2(p+l)."
          ],
          "papan": [
            "p=p, l=l",
            "p+l+p+l",
            "2p+2l",
            "2(p+l)"
          ]
        },
        {
          "id": "K5B4C-V1-2",
          "judul": "Contoh 5 dan 3",
          "ketukan": [
            "Panjang lima, lebar tiga. Jalur: 5 + 3 + 5 + 3.",
            "Dua kali lima plus tiga: dua kali delapan sama dengan enam belas.",
            "Cek dengan menjumlah sisi: hasil sama enam belas.",
            "Path Length dan rumus 2(p+l) saling cocok."
          ],
          "papan": [
            "5+3+5+3",
            "2(5+3)=16",
            "cek 16",
            "rumus = jalur"
          ]
        },
        {
          "id": "K5B4C-V1-3",
          "judul": "Mengapa dikali dua",
          "ketukan": [
            "Karena ada dua pasang sisi sama. Mengelompokkan membuat hitung lebih cepat.",
            "Tetap boleh menjumlah empat sisi satu-satu jika lebih nyaman.",
            "Yang penting: kamu menghitung jalur luar, bukan daerah dalam.",
            "METODE LUAR · Rumus 2(p+l): ringkasan Path Length pada persegi panjang."
          ],
          "papan": [
            "dua pasang",
            "boleh manual",
            "tetap jalur",
            "rectangle formula"
          ]
        }
      ]
    },
    {
      "id": "K5B4C-V2",
      "judul": "Persegi: 4×sisi",
      "subjudul": "Square Shortcut",
      "adegan": [
        {
          "id": "K5B4C-V2-1",
          "judul": "Empat sisi sama",
          "ketukan": [
            "Persegi: keempat sisi sama panjang.",
            "Jalur: s + s + s + s = 4 × s.",
            "Sisi tiga: empat kali tiga = dua belas.",
            "Sisi lima: empat kali lima = dua puluh."
          ],
          "papan": [
            "4 sama",
            "4×s",
            "4×3=12",
            "4×5=20"
          ]
        },
        {
          "id": "K5B4C-V2-2",
          "judul": "Hubungan dengan PP",
          "ketukan": [
            "Jika pada persegi panjang panjang sama dengan lebar, itu persegi.",
            "2(p+l) menjadi 2(s+s) = 2(2s) = 4s. Sama dengan pintasan persegi.",
            "Jadi rumus persegi adalah kasus khusus persegi panjang.",
            "Pilih rumus yang paling mudah, hasil harus sama."
          ],
          "papan": [
            "p=l",
            "2(p+l)=4s",
            "kasus khusus",
            "pilih mudah"
          ]
        },
        {
          "id": "K5B4C-V2-3",
          "judul": "Jangan tertukar luas",
          "ketukan": [
            "Sisi kali sisi adalah luas persegi, bukan keliling.",
            "Panjang kali lebar adalah luas persegi panjang.",
            "Keliling selalu tentang jalur mengelilingi.",
            "METODE LUAR · Pintasan Empat Kali Sisi: 4×s untuk persegi saja."
          ],
          "papan": [
            "s×s luas",
            "p×l luas",
            "keliling jalur",
            "square shortcut"
          ]
        }
      ]
    },
    {
      "id": "K5B4C-V3",
      "judul": "Latihan dan Peringatan",
      "subjudul": "Not Area Product",
      "adegan": [
        {
          "id": "K5B4C-V3-1",
          "judul": "PP 4 dan 2",
          "ketukan": [
            "Panjang empat, lebar dua. 2(4+2) = 2×6 = dua belas.",
            "Cek: 4+2+4+2 = dua belas. Cocok.",
            "Jika seseorang menjawab delapan, mungkin dia mengalikan 4×2. Itu luas.",
            "Tolak jawaban yang memakai kali panjang dan lebar untuk keliling."
          ],
          "papan": [
            "12",
            "cek",
            "salah 8",
            "tolak p×l"
          ]
        },
        {
          "id": "K5B4C-V3-2",
          "judul": "Peringatan miskonsepsi",
          "ketukan": [
            "Pertanyaan pagar atau bingkai: jawab dengan keliling.",
            "Pertanyaan cat lantai atau luas kebun: jawab dengan luas.",
            "Baca soal: apa yang diukur—jalur atau isi?",
            "METODE LUAR · Bukan Panjang Kali Lebar: p×l bukan keliling."
          ],
          "papan": [
            "pagar→K",
            "cat→luas",
            "baca soal",
            "not area"
          ]
        },
        {
          "id": "K5B4C-V3-3",
          "judul": "Siap segi banyak",
          "ketukan": [
            "Segi empat siap. Berikutnya segi lima dan segi enam beraturan.",
            "Polanya mirip: jika sisi sama, kali banyak sisi.",
            "Dasarnya tetap Path Length.",
            "Ayo lanjut dengan bekal 2(p+l) dan 4×s."
          ],
          "papan": [
            "segi banyak",
            "pola n×s",
            "dasar",
            "ayo"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Kenali bangun",
      "stepDesc": "Baca soal Keliling Segi Empat dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Persegi panjang atau persegi? Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa menghitung keliling persegi panjang dengan 2(p+l) dan persegi dengan 4×sisi, memahami sisi berhadapan sama, serta ….",
      "icon": "👀",
      "flowFrom": "Kenali bangun",
      "flowTo": "PP: berhadapan sama"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. PP: berhadapan sama",
      "stepDesc": "Dua p dan dua l pada jalur luar. Pada Keliling Segi Empat, langkah “PP: berhadapan sama” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Rumus 2 kali Panjang Plus Lebar: K = 2(p+l) karena jalur punya dua panjang dan dua lebar. Pintasan Empat Kali Sisi: K = 4 × sisi karena keempat sisi sama. Bukan…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "▭",
      "flowFrom": "PP: berhadapan sama",
      "flowTo": "Rumus 2(p+l)"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Rumus 2(p+l)",
      "stepDesc": "K = 2(p+l) = 2p+2l. Pada Keliling Segi Empat, langkah “Rumus 2(p+l)” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Rumus 2 kali Panjang Plus Lebar: K = 2(p+l) karena jalur punya dua panjang dan dua lebar. Pintasan Empat Kali Sisi: K = 4 × sisi karena keempat sisi sama. Bukan…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🧮",
      "flowFrom": "Rumus 2(p+l)",
      "flowTo": "Persegi: 4×s"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Persegi: 4×s",
      "stepDesc": "Keempat sisi sama: K = 4×s. Pada Keliling Segi Empat, langkah “Persegi: 4×s” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Rumus 2 kali Panjang Plus Lebar: K = 2(p+l) karena jalur punya dua panjang dan dua lebar. Pintasan Empat Kali Sisi: K = 4 × sisi karena keempat sisi sama. Bukan…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "⬜",
      "flowFrom": "Persegi: 4×s",
      "flowTo": "Hitung"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Hitung",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Keliling Segi Empat. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "➕",
      "flowFrom": "Hitung",
      "flowTo": "Cek manual"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek manual",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Keliling Segi Empat. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Cek manual",
      "flowTo": "Bukan p×l"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Bukan p×l",
      "stepDesc": "Simpulkan ide utama Keliling Segi Empat dengan kalimatmu sendiri. Sebutkan cara yang kamu pakai dan mengapa cara itu membantu. Jelaskan kepada teman seolah-olah kamu guru kecil. Simpulan yang jelas menandakan konsepnya sudah dipahami.",
      "icon": "⚠️",
      "flowFrom": "Bukan p×l",
      "flowTo": "Lanjut D"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Lanjut D",
      "stepDesc": "Latih lagi di tahap Concrete, Picture, lalu Abstract untuk Keliling Segi Empat. Mulai dari benda nyata, lanjut ke diagram, baru ke lambang angka. Ulangi sampai kamu bisa menjelaskan tanpa melihat contoh. Bermain sambil berlatih membuat konsepnya melekat lebih lama.",
      "icon": "➡️",
      "flowFrom": "Lanjut D",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "2(p+l)",
      "emoji": "▭",
      "countNum": 1,
      "countWord": "PP",
      "suara": "Rumus persegi panjang."
    },
    {
      "judul": "5 & 3",
      "emoji": "➕",
      "countNum": 16,
      "countWord": "16 cm",
      "suara": "2(5+3)=16."
    },
    {
      "judul": "2p+2l",
      "emoji": "=",
      "countNum": 1,
      "countWord": "setara",
      "suara": "Sama dengan 2(p+l)."
    },
    {
      "judul": "4×sisi",
      "emoji": "⬜",
      "countNum": 1,
      "countWord": "persegi",
      "suara": "Rumus persegi."
    },
    {
      "judul": "sisi 3",
      "emoji": "3️⃣",
      "countNum": 12,
      "countWord": "12 cm",
      "suara": "4×3=12."
    },
    {
      "judul": "sisi 5",
      "emoji": "5️⃣",
      "countNum": 20,
      "countWord": "20 cm",
      "suara": "4×5=20."
    },
    {
      "judul": "Berhadapan",
      "emoji": "⇄",
      "countNum": 1,
      "countWord": "sama",
      "suara": "Sifat PP."
    },
    {
      "judul": "Bukan p×l",
      "emoji": "⚠️",
      "countNum": 1,
      "countWord": "itu luas",
      "suara": "Miskonsepsi."
    },
    {
      "judul": "4 & 2",
      "emoji": "🔢",
      "countNum": 12,
      "countWord": "12 cm",
      "suara": "Latihan 2(4+2)."
    },
    {
      "judul": "Path Length",
      "emoji": "🚶",
      "countNum": 1,
      "countWord": "4 sisi",
      "suara": "Jalur empat sisi."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-c-c",
      "title": "Hitung Segi Empat",
      "bookReference": "hlm. 118–121",
      "objective": "Hitung keliling PP dan persegi sebagai jalur empat sisi.",
      "mechanicDescription": "Tiga ronde. Rectangle: 2(p+l). Square: 4×s. Bukan p×l atau s×s.",
      "voiceGuide": "Persegi panjang dua kali p plus l. Persegi empat kali sisi.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-c-c",
      "title": "Rumus PP/Persegi",
      "bookReference": "hlm. 118–121",
      "objective": "Hitung keliling PP dan persegi sebagai jalur empat sisi.",
      "mechanicDescription": "Tiga ronde. Rectangle: 2(p+l). Square: 4×s. Bukan p×l atau s×s.",
      "voiceGuide": "Persegi panjang dua kali p plus l. Persegi empat kali sisi.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-c-c",
      "title": "Arti Rumus",
      "bookReference": "hlm. 118–121",
      "objective": "Hitung keliling PP dan persegi sebagai jalur empat sisi.",
      "mechanicDescription": "Tiga ronde. Rectangle: 2(p+l). Square: 4×s. Bukan p×l atau s×s.",
      "voiceGuide": "Persegi panjang dua kali p plus l. Persegi empat kali sisi.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-c-c",
      "title": "Pilah PP/Persegi",
      "bookReference": "hlm. 118–121",
      "objective": "Hitung keliling PP dan persegi sebagai jalur empat sisi.",
      "mechanicDescription": "Tiga ronde. Rectangle: 2(p+l). Square: 4×s. Bukan p×l atau s×s.",
      "voiceGuide": "Persegi panjang dua kali p plus l. Persegi empat kali sisi.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-c-c",
      "title": "Jodohkan Segi Empat",
      "bookReference": "hlm. 118–121",
      "objective": "Hitung keliling PP dan persegi sebagai jalur empat sisi. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Rectangle: 2(p+l). Square: 4×s. Bukan p×l atau s×s.",
      "voiceGuide": "Persegi panjang dua kali p plus l. Persegi empat kali sisi. Mainkan dengan teliti.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-c-c",
      "title": "Memori Segi Empat",
      "bookReference": "hlm. 118–121",
      "objective": "Hitung keliling PP dan persegi sebagai jalur empat sisi. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Rectangle: 2(p+l). Square: 4×s. Bukan p×l atau s×s.",
      "voiceGuide": "Persegi panjang dua kali p plus l. Persegi empat kali sisi. Mainkan dengan teliti.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-c-c",
      "title": "Ketuk Hasil",
      "bookReference": "hlm. 118–121",
      "objective": "Hitung keliling PP dan persegi sebagai jalur empat sisi. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Rectangle: 2(p+l). Square: 4×s. Bukan p×l atau s×s.",
      "voiceGuide": "Persegi panjang dua kali p plus l. Persegi empat kali sisi. Mainkan dengan teliti.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-c-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 118–121",
      "objective": "Hitung keliling PP dan persegi sebagai jalur empat sisi. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Rectangle: 2(p+l). Square: 4×s. Bukan p×l atau s×s.",
      "voiceGuide": "Persegi panjang dua kali p plus l. Persegi empat kali sisi. Mainkan dengan teliti.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-c-c",
      "title": "Cerita Segi Empat",
      "bookReference": "hlm. 118–121",
      "objective": "Hitung keliling PP dan persegi sebagai jalur empat sisi. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Rectangle: 2(p+l). Square: 4×s. Bukan p×l atau s×s.",
      "voiceGuide": "Persegi panjang dua kali p plus l. Persegi empat kali sisi. Mainkan dengan teliti.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-c-c",
      "title": "Urutkan Hasil",
      "bookReference": "hlm. 118–121",
      "objective": "Hitung keliling PP dan persegi sebagai jalur empat sisi. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Rectangle: 2(p+l). Square: 4×s. Bukan p×l atau s×s.",
      "voiceGuide": "Persegi panjang dua kali p plus l. Persegi empat kali sisi. Mainkan dengan teliti.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-c-p",
      "title": "Diagram Hitung Segi Empat",
      "bookReference": "hlm. 118–121",
      "objective": "Tolak rumus luas yang menyamar sebagai keliling.",
      "mechanicDescription": "Tiga ronde. Not Area Product: p×l dan s×s adalah luas.",
      "voiceGuide": "Kalau pilihan berupa kali panjang lebar, itu luas. Tolak.",
      "diagramType": "hitung",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "rumus-c-p",
      "title": "Diagram Rumus PP/Persegi",
      "bookReference": "hlm. 118–121",
      "objective": "Tolak rumus luas yang menyamar sebagai keliling.",
      "mechanicDescription": "Tiga ronde. Not Area Product: p×l dan s×s adalah luas.",
      "voiceGuide": "Kalau pilihan berupa kali panjang lebar, itu luas. Tolak.",
      "diagramType": "rumus",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "arti-c-p",
      "title": "Diagram Arti Rumus",
      "bookReference": "hlm. 118–121",
      "objective": "Tolak rumus luas yang menyamar sebagai keliling.",
      "mechanicDescription": "Tiga ronde. Not Area Product: p×l dan s×s adalah luas.",
      "voiceGuide": "Kalau pilihan berupa kali panjang lebar, itu luas. Tolak.",
      "diagramType": "arti",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sortir-c-p",
      "title": "Diagram Pilah PP/Persegi",
      "bookReference": "hlm. 118–121",
      "objective": "Tolak rumus luas yang menyamar sebagai keliling.",
      "mechanicDescription": "Tiga ronde. Not Area Product: p×l dan s×s adalah luas.",
      "voiceGuide": "Kalau pilihan berupa kali panjang lebar, itu luas. Tolak.",
      "diagramType": "sortir",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-c-p",
      "title": "Diagram Jodohkan Segi Empat",
      "bookReference": "hlm. 118–121",
      "objective": "Tolak rumus luas yang menyamar sebagai keliling. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Not Area Product: p×l dan s×s adalah luas.",
      "voiceGuide": "Kalau pilihan berupa kali panjang lebar, itu luas. Tolak. Mainkan dengan teliti.",
      "diagramType": "jodoh",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memori-c-p",
      "title": "Diagram Memori Segi Empat",
      "bookReference": "hlm. 118–121",
      "objective": "Tolak rumus luas yang menyamar sebagai keliling. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Not Area Product: p×l dan s×s adalah luas.",
      "voiceGuide": "Kalau pilihan berupa kali panjang lebar, itu luas. Tolak. Mainkan dengan teliti.",
      "diagramType": "memori",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-c-p",
      "title": "Diagram Ketuk Hasil",
      "bookReference": "hlm. 118–121",
      "objective": "Tolak rumus luas yang menyamar sebagai keliling. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Not Area Product: p×l dan s×s adalah luas.",
      "voiceGuide": "Kalau pilihan berupa kali panjang lebar, itu luas. Tolak. Mainkan dengan teliti.",
      "diagramType": "ketuk",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "semua-c-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 118–121",
      "objective": "Tolak rumus luas yang menyamar sebagai keliling. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Not Area Product: p×l dan s×s adalah luas.",
      "voiceGuide": "Kalau pilihan berupa kali panjang lebar, itu luas. Tolak. Mainkan dengan teliti.",
      "diagramType": "semua",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "cerita-c-p",
      "title": "Diagram Cerita Segi Empat",
      "bookReference": "hlm. 118–121",
      "objective": "Tolak rumus luas yang menyamar sebagai keliling. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Not Area Product: p×l dan s×s adalah luas.",
      "voiceGuide": "Kalau pilihan berupa kali panjang lebar, itu luas. Tolak. Mainkan dengan teliti.",
      "diagramType": "cerita",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "urut-c-p",
      "title": "Diagram Urutkan Hasil",
      "bookReference": "hlm. 118–121",
      "objective": "Tolak rumus luas yang menyamar sebagai keliling. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Not Area Product: p×l dan s×s adalah luas.",
      "voiceGuide": "Kalau pilihan berupa kali panjang lebar, itu luas. Tolak. Mainkan dengan teliti.",
      "diagramType": "urut",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-c-a",
      "title": "Tulis Hitung Segi Empat",
      "bookReference": "hlm. 118–121",
      "objective": "Jelaskan mengapa 2(p+l) dan 4×s sama dengan Path Length.",
      "mechanicDescription": "Tiga ronde cerita. Rumus = jalan pintas jumlah sisi berpasangan.",
      "voiceGuide": "Rumus hanyalah jalan pintas Path Length.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-c-a",
      "title": "Tulis Rumus PP/Persegi",
      "bookReference": "hlm. 118–121",
      "objective": "Jelaskan mengapa 2(p+l) dan 4×s sama dengan Path Length.",
      "mechanicDescription": "Tiga ronde cerita. Rumus = jalan pintas jumlah sisi berpasangan.",
      "voiceGuide": "Rumus hanyalah jalan pintas Path Length.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-c-a",
      "title": "Tulis Arti Rumus",
      "bookReference": "hlm. 118–121",
      "objective": "Jelaskan mengapa 2(p+l) dan 4×s sama dengan Path Length.",
      "mechanicDescription": "Tiga ronde cerita. Rumus = jalan pintas jumlah sisi berpasangan.",
      "voiceGuide": "Rumus hanyalah jalan pintas Path Length.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-c-a",
      "title": "Tulis Pilah PP/Persegi",
      "bookReference": "hlm. 118–121",
      "objective": "Jelaskan mengapa 2(p+l) dan 4×s sama dengan Path Length.",
      "mechanicDescription": "Tiga ronde cerita. Rumus = jalan pintas jumlah sisi berpasangan.",
      "voiceGuide": "Rumus hanyalah jalan pintas Path Length.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-c-a",
      "title": "Tulis Jodohkan Segi Empat",
      "bookReference": "hlm. 118–121",
      "objective": "Jelaskan mengapa 2(p+l) dan 4×s sama dengan Path Length. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde cerita. Rumus = jalan pintas jumlah sisi berpasangan.",
      "voiceGuide": "Rumus hanyalah jalan pintas Path Length. Mainkan dengan teliti.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-c-a",
      "title": "Tulis Memori Segi Empat",
      "bookReference": "hlm. 118–121",
      "objective": "Jelaskan mengapa 2(p+l) dan 4×s sama dengan Path Length. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde cerita. Rumus = jalan pintas jumlah sisi berpasangan.",
      "voiceGuide": "Rumus hanyalah jalan pintas Path Length. Mainkan dengan teliti.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-c",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 118–121",
      "objective": "Jelaskan mengapa 2(p+l) dan 4×s sama dengan Path Length. Latihan lanjutan.",
      "mechanicDescription": "Dua ronde. Tiga ronde cerita. Rumus = jalan pintas jumlah sisi berpasangan.",
      "voiceGuide": "Rumus hanyalah jalan pintas Path Length. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-c",
      "title": "Detektif Keliling",
      "bookReference": "hlm. 118–121",
      "objective": "Jelaskan mengapa 2(p+l) dan 4×s sama dengan Path Length. Latihan lanjutan.",
      "mechanicDescription": "Tiga soal. Tiga ronde cerita. Rumus = jalan pintas jumlah sisi berpasangan.",
      "voiceGuide": "Rumus hanyalah jalan pintas Path Length. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "peta-c",
      "title": "Peta Konsep",
      "bookReference": "hlm. 118–121",
      "objective": "Jelaskan mengapa 2(p+l) dan 4×s sama dengan Path Length. Latihan lanjutan.",
      "mechanicDescription": "Satu peta. Tiga ronde cerita. Rumus = jalan pintas jumlah sisi berpasangan.",
      "voiceGuide": "Rumus hanyalah jalan pintas Path Length. Mainkan dengan teliti.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "cerita-q-c",
      "title": "Cerita Angka",
      "bookReference": "hlm. 118–121",
      "objective": "Jelaskan mengapa 2(p+l) dan 4×s sama dengan Path Length. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde cerita. Rumus = jalan pintas jumlah sisi berpasangan.",
      "voiceGuide": "Rumus hanyalah jalan pintas Path Length. Mainkan dengan teliti.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "▭",
      "nama": "2(p+l)",
      "isi": "Keliling persegi panjang = 2(p+l) karena dua panjang dan dua lebar pada jalur.",
      "suara": "Rumus PP."
    },
    {
      "ikon": "⬜",
      "nama": "4×sisi",
      "isi": "Keliling persegi = 4 × sisi. Sama dengan 2(s+s).",
      "suara": "Rumus persegi."
    },
    {
      "ikon": "⚠️",
      "nama": "Bukan luas",
      "isi": "p × l atau s × s adalah luas, bukan keliling.",
      "suara": "Jangan tertukar."
    },
    {
      "ikon": "🚶",
      "nama": "Path Length",
      "isi": "Rumus hanyalah cara cepat menulis perjalanan di empat sisi luar.",
      "suara": "Dasar jalur."
    }
  ],
  "poinSuara": "Ingat: dua kali panjang plus lebar untuk PP, empat kali sisi untuk persegi, dan bukan panjang kali lebar.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Kenali bangun",
        "warna": "#FDE68A"
      },
      {
        "teks": "tulis p/l atau s",
        "warna": "#BBF7D0"
      },
      {
        "teks": "pakai rumus",
        "warna": "#BFDBFE"
      },
      {
        "teks": "cek",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: terapkan Rumus 2 kali Panjang Plus Lebar pada satu benda nyata, lalu ceritakan langkahmu.",
  "refleksi": [
    "Bagaimana Rumus 2 kali Panjang Plus Lebar membantumu memahami soal?",
    "Kapan kamu memakai Pintasan Empat Kali Sisi?",
    "Apa bedanya dengan hanya menghafal rumus?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Rectangle Formula",
      "namaId": "Rumus 2 kali Panjang Plus Lebar",
      "asal": "Singapore Math / formula fluency",
      "ringkas": "K = 2(p+l) karena jalur punya dua panjang dan dua lebar.",
      "tahap": [
        "Story",
        "Mind",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Square Shortcut",
      "namaId": "Pintasan Empat Kali Sisi",
      "asal": "Elementary geometry",
      "ringkas": "K = 4 × sisi karena keempat sisi sama.",
      "tahap": [
        "Story",
        "Picture",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Not Area Product",
      "namaId": "Bukan Panjang Kali Lebar",
      "asal": "Misconception prevention",
      "ringkas": "p × l adalah luas daerah, bukan panjang jalur keliling.",
      "tahap": [
        "Infografis",
        "Abstract",
        "Story"
      ]
    }
  ]
};

export const SUB_D54: SubBabNaskah = {
  "id": "D",
  "codeTitle": "Sub-Bab D (Keliling Segi Banyak)",
  "fullTitle": "Sub-Bab D: Keliling Segi Banyak",
  "targetDescription": "Siswa menghitung keliling segi-n beraturan dengan n×sisi dan menjumlahkan sisi satu-satu jika panjang sisi berbeda, memakai pola tabel banyak sisi sesuai Buku Siswa Kelas V Bab 4 Sub-Bab D.",
  "secondaryBg": "#FCE7F3",
  "secondaryBorder": "#DB2777",
  "secondaryText": "#9D174D",
  "silabus": {
    "teksSuara": "Kita belajar keliling segi banyak. Jika beraturan, semua sisi sama: keliling n kali sisi. Segi lima lima kali sisi, segi enam enam kali sisi. Jika sisi berbeda, kembali ke Path Length: jumlahkan semua sisi satu-satu. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menentukan keliling segi banyak beraturan dan tidak beraturan.",
    "referensi": "Buku Siswa Matematika Kelas V Kemendikbudristek (Bab 4: Keliling Bangun Datar, Sub-Bab D hlm. 122–124)."
  },
  "videos": [
    {
      "id": "K5B4D-V1",
      "judul": "Segi Lima Beraturan",
      "subjudul": "5×sisi",
      "adegan": [
        {
          "id": "K5B4D-V1-1",
          "judul": "Lima sisi sama",
          "ketukan": [
            "Segi lima beraturan punya lima sisi sama panjang.",
            "Jalur keliling melewati lima sisi itu.",
            "Jika sisi tiga, K = 5 × 3 = lima belas.",
            "Ini Path Length yang diringkas jadi kali."
          ],
          "papan": [
            "5 sama",
            "path 5",
            "5×3=15",
            "ringkas"
          ]
        },
        {
          "id": "K5B4D-V1-2",
          "judul": "Tabel buku",
          "ketukan": [
            "Di tabel buku: banyak sisi dikali panjang sisi.",
            "Segi lima: lima kali sisi. Segi enam: enam kali sisi.",
            "Pola muncul: segi-n beraturan memakai n × sisi.",
            "METODE LUAR · Segi-n Beraturan: K = n × s."
          ],
          "papan": [
            "tabel",
            "5×s, 6×s",
            "n×s",
            "regular n-gon"
          ]
        },
        {
          "id": "K5B4D-V1-3",
          "judul": "Hitung sadar",
          "ketukan": [
            "Tulis dulu: berapa n? Berapa s? Lalu kali.",
            "Sebutkan satuan. Contoh lima belas centi meter.",
            "Cek: hasil harus n kali lebih besar dari satu sisi.",
            "Siap ke segi enam."
          ],
          "papan": [
            "n dan s",
            "satuan",
            "cek",
            "lanjut"
          ]
        }
      ]
    },
    {
      "id": "K5B4D-V2",
      "judul": "Segi Enam dan Sisi Beda",
      "subjudul": "6×sisi vs jumlah",
      "adegan": [
        {
          "id": "K5B4D-V2-1",
          "judul": "Segi enam",
          "ketukan": [
            "Segi enam beraturan: enam sisi sama.",
            "Sisi empat: K = 6 × 4 = dua puluh empat.",
            "Segi delapan sisi dua: K = 8 × 2 = enam belas.",
            "Pola tabel tetap jalan."
          ],
          "papan": [
            "6 sama",
            "6×4=24",
            "8×2=16",
            "pola"
          ]
        },
        {
          "id": "K5B4D-V2-2",
          "judul": "Sisi tidak sama",
          "ketukan": [
            "Jika satu sisi berbeda, bangun tidak beraturan untuk rumus n×s.",
            "Jangan memaksa kali n. Itu akan salah.",
            "Kembali ke Path Length: jumlahkan setiap sisi yang tertulis.",
            "METODE LUAR · Sisi Beda Jumlah Satu-satu: aman dan tepat."
          ],
          "papan": [
            "beda",
            "jangan ×n",
            "jumlah semua",
            "irregular"
          ]
        },
        {
          "id": "K5B4D-V2-3",
          "judul": "Cabang keputusan",
          "ketukan": [
            "Pertanyaan kunci: apakah semua sisi sama?",
            "Ya: pakai n × s. Tidak: jumlahkan semua.",
            "Keputusan ini mencegah kesalahan paling umum di segi banyak.",
            "Siap ke bangun gabungan."
          ],
          "papan": [
            "sama?",
            "cabang",
            "cegah salah",
            "siap E"
          ]
        }
      ]
    },
    {
      "id": "K5B4D-V3",
      "judul": "Rangkum Pola",
      "subjudul": "Table Pattern",
      "adegan": [
        {
          "id": "K5B4D-V3-1",
          "judul": "Pola n×s",
          "ketukan": [
            "3 sisi → sering a+b+c atau 3s. 4 sisi → 2(p+l) atau 4s. 5 sisi → 5s.",
            "Yang sama: Path Length di seluruh sisi luar.",
            "Yang berbeda: cara menyingkat jika sisi sama.",
            "METODE LUAR · Pola Tabel Banyak Sisi: generalisasi n×s."
          ],
          "papan": [
            "pola",
            "sama dasar",
            "singkat",
            "table pattern"
          ]
        },
        {
          "id": "K5B4D-V3-2",
          "judul": "Latihan mental",
          "ketukan": [
            "Segi lima sisi 2: sepuluh. Segi enam sisi 3: delapan belas.",
            "Ucapkan: banyak sisi kali panjang sisi.",
            "Jika ragu sisi sama atau tidak, lihat tanda di gambar atau ukur.",
            "Ayo mainkan permainan segi banyak."
          ],
          "papan": [
            "10 dan 18",
            "ucap rumus",
            "cek gambar",
            "main"
          ]
        },
        {
          "id": "K5B4D-V3-3",
          "judul": "Jembatan gabungan",
          "ketukan": [
            "Bangun gabungan punya sisi luar dan sekat dalam.",
            "Hanya sisi luar yang masuk keliling. Sekat dalam diabaikan.",
            "Itu Path Length pada batas terluar denah.",
            "Lanjut Sub-Bab E."
          ],
          "papan": [
            "gabungan",
            "hanya luar",
            "path luar",
            "lanjut E"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Hitung n",
      "stepDesc": "Baca soal Keliling Segi Banyak dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Berapa banyak sisi? Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa menghitung keliling segi-n beraturan dengan n×sisi dan menjumlahkan sisi satu-satu jika panjang sisi berbeda, mema….",
      "icon": "🔢",
      "flowFrom": "Hitung n",
      "flowTo": "Sisi sama?"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Sisi sama?",
      "stepDesc": "Beraturan atau tidak?. Pada Keliling Segi Banyak, langkah “Sisi sama?” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Segi-n Beraturan n Kali Sisi: Jika semua sisi sama, K = n × sisi. Sisi Beda Jumlah Satu-satu: Jika sisi tidak sama, jangan ×n; jumlahkan semua sisi. Pola Tabel …. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "👀",
      "flowFrom": "Sisi sama?",
      "flowTo": "Ya: n×s"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Ya: n×s",
      "stepDesc": "K = n × sisi. Pada Keliling Segi Banyak, langkah “Ya: n×s” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Segi-n Beraturan n Kali Sisi: Jika semua sisi sama, K = n × sisi. Sisi Beda Jumlah Satu-satu: Jika sisi tidak sama, jangan ×n; jumlahkan semua sisi. Pola Tabel …. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "✨",
      "flowFrom": "Ya: n×s",
      "flowTo": "Tidak: jumlah"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Tidak: jumlah",
      "stepDesc": "Jumlahkan semua sisi satu-satu. Pada Keliling Segi Banyak, langkah “Tidak: jumlah” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Segi-n Beraturan n Kali Sisi: Jika semua sisi sama, K = n × sisi. Sisi Beda Jumlah Satu-satu: Jika sisi tidak sama, jangan ×n; jumlahkan semua sisi. Pola Tabel …. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "➕",
      "flowFrom": "Tidak: jumlah",
      "flowTo": "Hitung"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Hitung",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Keliling Segi Banyak. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "🧮",
      "flowFrom": "Hitung",
      "flowTo": "Cek"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Keliling Segi Banyak. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Cek",
      "flowTo": "Pola tabel"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Pola tabel",
      "stepDesc": "Simpulkan ide utama Keliling Segi Banyak dengan kalimatmu sendiri. Sebutkan cara yang kamu pakai dan mengapa cara itu membantu. Jelaskan kepada teman seolah-olah kamu guru kecil. Simpulan yang jelas menandakan konsepnya sudah dipahami.",
      "icon": "📋",
      "flowFrom": "Pola tabel",
      "flowTo": "Lanjut E"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Lanjut E",
      "stepDesc": "Latih lagi di tahap Concrete, Picture, lalu Abstract untuk Keliling Segi Banyak. Mulai dari benda nyata, lanjut ke diagram, baru ke lambang angka. Ulangi sampai kamu bisa menjelaskan tanpa melihat contoh. Bermain sambil berlatih membuat konsepnya melekat lebih lama.",
      "icon": "➡️",
      "flowFrom": "Lanjut E",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Segi 5",
      "emoji": "⬠",
      "countNum": 5,
      "countWord": "5×sisi",
      "suara": "Beraturan."
    },
    {
      "judul": "5×3",
      "emoji": "3️⃣",
      "countNum": 15,
      "countWord": "15 cm",
      "suara": "Contoh."
    },
    {
      "judul": "Segi 6",
      "emoji": "⬡",
      "countNum": 6,
      "countWord": "6×sisi",
      "suara": "Beraturan."
    },
    {
      "judul": "6×4",
      "emoji": "4️⃣",
      "countNum": 24,
      "countWord": "24 cm",
      "suara": "Contoh."
    },
    {
      "judul": "n×sisi",
      "emoji": "n",
      "countNum": 1,
      "countWord": "pola",
      "suara": "General."
    },
    {
      "judul": "Sisi beda",
      "emoji": "⚠️",
      "countNum": 1,
      "countWord": "jumlah semua",
      "suara": "Jangan ×n."
    },
    {
      "judul": "8×2",
      "emoji": "8️⃣",
      "countNum": 16,
      "countWord": "16 cm",
      "suara": "Segi 8."
    },
    {
      "judul": "Tabel",
      "emoji": "📋",
      "countNum": 1,
      "countWord": "banyak sisi",
      "suara": "Rangkum."
    },
    {
      "judul": "Cabang",
      "emoji": "🔑",
      "countNum": 1,
      "countWord": "sama/beda?",
      "suara": "Keputusan."
    },
    {
      "judul": "Path Length",
      "emoji": "🚶",
      "countNum": 1,
      "countWord": "n sisi",
      "suara": "Jalur luar."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-d-c",
      "title": "Hitung Segi Banyak",
      "bookReference": "hlm. 122–124",
      "objective": "Untuk segi-n beraturan, kalikan banyak sisi dengan panjang satu sisi.",
      "mechanicDescription": "Tiga ronde. Regular n-gon: n×sisi bila semua sisi sama.",
      "voiceGuide": "Beraturan: banyak sisi kali panjang sisi.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-d-c",
      "title": "Rumus n×sisi",
      "bookReference": "hlm. 122–124",
      "objective": "Untuk segi-n beraturan, kalikan banyak sisi dengan panjang satu sisi.",
      "mechanicDescription": "Tiga ronde. Regular n-gon: n×sisi bila semua sisi sama.",
      "voiceGuide": "Beraturan: banyak sisi kali panjang sisi.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-d-c",
      "title": "Arti Rumus",
      "bookReference": "hlm. 122–124",
      "objective": "Untuk segi-n beraturan, kalikan banyak sisi dengan panjang satu sisi.",
      "mechanicDescription": "Tiga ronde. Regular n-gon: n×sisi bila semua sisi sama.",
      "voiceGuide": "Beraturan: banyak sisi kali panjang sisi.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-d-c",
      "title": "Pilah Beraturan/Bebas",
      "bookReference": "hlm. 122–124",
      "objective": "Untuk segi-n beraturan, kalikan banyak sisi dengan panjang satu sisi.",
      "mechanicDescription": "Tiga ronde. Regular n-gon: n×sisi bila semua sisi sama.",
      "voiceGuide": "Beraturan: banyak sisi kali panjang sisi.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-d-c",
      "title": "Jodohkan Segi Banyak",
      "bookReference": "hlm. 122–124",
      "objective": "Untuk segi-n beraturan, kalikan banyak sisi dengan panjang satu sisi. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Regular n-gon: n×sisi bila semua sisi sama.",
      "voiceGuide": "Beraturan: banyak sisi kali panjang sisi. Mainkan dengan teliti.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-d-c",
      "title": "Memori Segi Banyak",
      "bookReference": "hlm. 122–124",
      "objective": "Untuk segi-n beraturan, kalikan banyak sisi dengan panjang satu sisi. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Regular n-gon: n×sisi bila semua sisi sama.",
      "voiceGuide": "Beraturan: banyak sisi kali panjang sisi. Mainkan dengan teliti.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-d-c",
      "title": "Ketuk Hasil",
      "bookReference": "hlm. 122–124",
      "objective": "Untuk segi-n beraturan, kalikan banyak sisi dengan panjang satu sisi. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Regular n-gon: n×sisi bila semua sisi sama.",
      "voiceGuide": "Beraturan: banyak sisi kali panjang sisi. Mainkan dengan teliti.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-d-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 122–124",
      "objective": "Untuk segi-n beraturan, kalikan banyak sisi dengan panjang satu sisi. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Regular n-gon: n×sisi bila semua sisi sama.",
      "voiceGuide": "Beraturan: banyak sisi kali panjang sisi. Mainkan dengan teliti.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-d-c",
      "title": "Cerita Segi Banyak",
      "bookReference": "hlm. 122–124",
      "objective": "Untuk segi-n beraturan, kalikan banyak sisi dengan panjang satu sisi. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Regular n-gon: n×sisi bila semua sisi sama.",
      "voiceGuide": "Beraturan: banyak sisi kali panjang sisi. Mainkan dengan teliti.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-d-c",
      "title": "Urutkan Hasil",
      "bookReference": "hlm. 122–124",
      "objective": "Untuk segi-n beraturan, kalikan banyak sisi dengan panjang satu sisi. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Regular n-gon: n×sisi bila semua sisi sama.",
      "voiceGuide": "Beraturan: banyak sisi kali panjang sisi. Mainkan dengan teliti.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-d-p",
      "title": "Diagram Hitung Segi Banyak",
      "bookReference": "hlm. 122–124",
      "objective": "Jika sisi tidak sama, jumlahkan satu per satu—jangan kali n.",
      "mechanicDescription": "Tiga ronde. Irregular: Side Sum penuh, bukan n×sisi.",
      "voiceGuide": "Sisi beda? Jumlahkan semua. Jangan kali n.",
      "diagramType": "hitung",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "rumus-d-p",
      "title": "Diagram Rumus n×sisi",
      "bookReference": "hlm. 122–124",
      "objective": "Jika sisi tidak sama, jumlahkan satu per satu—jangan kali n.",
      "mechanicDescription": "Tiga ronde. Irregular: Side Sum penuh, bukan n×sisi.",
      "voiceGuide": "Sisi beda? Jumlahkan semua. Jangan kali n.",
      "diagramType": "rumus",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "arti-d-p",
      "title": "Diagram Arti Rumus",
      "bookReference": "hlm. 122–124",
      "objective": "Jika sisi tidak sama, jumlahkan satu per satu—jangan kali n.",
      "mechanicDescription": "Tiga ronde. Irregular: Side Sum penuh, bukan n×sisi.",
      "voiceGuide": "Sisi beda? Jumlahkan semua. Jangan kali n.",
      "diagramType": "arti",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sortir-d-p",
      "title": "Diagram Pilah Beraturan/Bebas",
      "bookReference": "hlm. 122–124",
      "objective": "Jika sisi tidak sama, jumlahkan satu per satu—jangan kali n.",
      "mechanicDescription": "Tiga ronde. Irregular: Side Sum penuh, bukan n×sisi.",
      "voiceGuide": "Sisi beda? Jumlahkan semua. Jangan kali n.",
      "diagramType": "sortir",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-d-p",
      "title": "Diagram Jodohkan Segi Banyak",
      "bookReference": "hlm. 122–124",
      "objective": "Jika sisi tidak sama, jumlahkan satu per satu—jangan kali n. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Irregular: Side Sum penuh, bukan n×sisi.",
      "voiceGuide": "Sisi beda? Jumlahkan semua. Jangan kali n. Mainkan dengan teliti.",
      "diagramType": "jodoh",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memori-d-p",
      "title": "Diagram Memori Segi Banyak",
      "bookReference": "hlm. 122–124",
      "objective": "Jika sisi tidak sama, jumlahkan satu per satu—jangan kali n. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Irregular: Side Sum penuh, bukan n×sisi.",
      "voiceGuide": "Sisi beda? Jumlahkan semua. Jangan kali n. Mainkan dengan teliti.",
      "diagramType": "memori",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-d-p",
      "title": "Diagram Ketuk Hasil",
      "bookReference": "hlm. 122–124",
      "objective": "Jika sisi tidak sama, jumlahkan satu per satu—jangan kali n. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Irregular: Side Sum penuh, bukan n×sisi.",
      "voiceGuide": "Sisi beda? Jumlahkan semua. Jangan kali n. Mainkan dengan teliti.",
      "diagramType": "ketuk",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "semua-d-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 122–124",
      "objective": "Jika sisi tidak sama, jumlahkan satu per satu—jangan kali n. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Irregular: Side Sum penuh, bukan n×sisi.",
      "voiceGuide": "Sisi beda? Jumlahkan semua. Jangan kali n. Mainkan dengan teliti.",
      "diagramType": "semua",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "cerita-d-p",
      "title": "Diagram Cerita Segi Banyak",
      "bookReference": "hlm. 122–124",
      "objective": "Jika sisi tidak sama, jumlahkan satu per satu—jangan kali n. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Irregular: Side Sum penuh, bukan n×sisi.",
      "voiceGuide": "Sisi beda? Jumlahkan semua. Jangan kali n. Mainkan dengan teliti.",
      "diagramType": "cerita",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "urut-d-p",
      "title": "Diagram Urutkan Hasil",
      "bookReference": "hlm. 122–124",
      "objective": "Jika sisi tidak sama, jumlahkan satu per satu—jangan kali n. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Irregular: Side Sum penuh, bukan n×sisi.",
      "voiceGuide": "Sisi beda? Jumlahkan semua. Jangan kali n. Mainkan dengan teliti.",
      "diagramType": "urut",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-d-a",
      "title": "Tulis Hitung Segi Banyak",
      "bookReference": "hlm. 122–124",
      "objective": "Baca tabel segi banyak: pilih n×sisi atau jumlah semua.",
      "mechanicDescription": "Tiga ronde. Cek dulu: beraturan atau tidak?",
      "voiceGuide": "Beraturan atau tidak? Itu menentukan cara hitung.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-d-a",
      "title": "Tulis Rumus n×sisi",
      "bookReference": "hlm. 122–124",
      "objective": "Baca tabel segi banyak: pilih n×sisi atau jumlah semua.",
      "mechanicDescription": "Tiga ronde. Cek dulu: beraturan atau tidak?",
      "voiceGuide": "Beraturan atau tidak? Itu menentukan cara hitung.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-d-a",
      "title": "Tulis Arti Rumus",
      "bookReference": "hlm. 122–124",
      "objective": "Baca tabel segi banyak: pilih n×sisi atau jumlah semua.",
      "mechanicDescription": "Tiga ronde. Cek dulu: beraturan atau tidak?",
      "voiceGuide": "Beraturan atau tidak? Itu menentukan cara hitung.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-d-a",
      "title": "Tulis Pilah Beraturan/Bebas",
      "bookReference": "hlm. 122–124",
      "objective": "Baca tabel segi banyak: pilih n×sisi atau jumlah semua.",
      "mechanicDescription": "Tiga ronde. Cek dulu: beraturan atau tidak?",
      "voiceGuide": "Beraturan atau tidak? Itu menentukan cara hitung.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-d-a",
      "title": "Tulis Jodohkan Segi Banyak",
      "bookReference": "hlm. 122–124",
      "objective": "Baca tabel segi banyak: pilih n×sisi atau jumlah semua. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Cek dulu: beraturan atau tidak?",
      "voiceGuide": "Beraturan atau tidak? Itu menentukan cara hitung. Mainkan dengan teliti.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-d-a",
      "title": "Tulis Memori Segi Banyak",
      "bookReference": "hlm. 122–124",
      "objective": "Baca tabel segi banyak: pilih n×sisi atau jumlah semua. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Cek dulu: beraturan atau tidak?",
      "voiceGuide": "Beraturan atau tidak? Itu menentukan cara hitung. Mainkan dengan teliti.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-d",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 122–124",
      "objective": "Baca tabel segi banyak: pilih n×sisi atau jumlah semua. Latihan lanjutan.",
      "mechanicDescription": "Dua ronde. Tiga ronde. Cek dulu: beraturan atau tidak?",
      "voiceGuide": "Beraturan atau tidak? Itu menentukan cara hitung. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-d",
      "title": "Detektif Keliling",
      "bookReference": "hlm. 122–124",
      "objective": "Baca tabel segi banyak: pilih n×sisi atau jumlah semua. Latihan lanjutan.",
      "mechanicDescription": "Tiga soal. Tiga ronde. Cek dulu: beraturan atau tidak?",
      "voiceGuide": "Beraturan atau tidak? Itu menentukan cara hitung. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "peta-d",
      "title": "Peta Konsep",
      "bookReference": "hlm. 122–124",
      "objective": "Baca tabel segi banyak: pilih n×sisi atau jumlah semua. Latihan lanjutan.",
      "mechanicDescription": "Satu peta. Tiga ronde. Cek dulu: beraturan atau tidak?",
      "voiceGuide": "Beraturan atau tidak? Itu menentukan cara hitung. Mainkan dengan teliti.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "cerita-q-d",
      "title": "Cerita Angka",
      "bookReference": "hlm. 122–124",
      "objective": "Baca tabel segi banyak: pilih n×sisi atau jumlah semua. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Cek dulu: beraturan atau tidak?",
      "voiceGuide": "Beraturan atau tidak? Itu menentukan cara hitung. Mainkan dengan teliti.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "✨",
      "nama": "n×sisi",
      "isi": "Segi-n beraturan: K = n × sisi. Contoh segi lima sisi 3 → 15.",
      "suara": "Beraturan."
    },
    {
      "ikon": "➕",
      "nama": "Sisi beda",
      "isi": "Jika sisi tidak sama, jumlahkan semua sisi. Jangan memaksa ×n.",
      "suara": "Jumlah satu-satu."
    },
    {
      "ikon": "📋",
      "nama": "Pola tabel",
      "isi": "5×s, 6×s, 8×s mengikuti pola n×s.",
      "suara": "Generalisasi."
    },
    {
      "ikon": "🔑",
      "nama": "Cabang keputusan",
      "isi": "Tanya dulu: semua sisi sama atau tidak?",
      "suara": "Pilih rumus."
    }
  ],
  "poinSuara": "Ingat: beraturan n kali sisi; sisi beda jumlahkan semua.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Hitung n",
        "warna": "#FDE68A"
      },
      {
        "teks": "cek sisi sama?",
        "warna": "#BBF7D0"
      },
      {
        "teks": "pilih rumus",
        "warna": "#BFDBFE"
      },
      {
        "teks": "hitung",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: terapkan Segi-n Beraturan n Kali Sisi pada satu benda nyata, lalu ceritakan langkahmu.",
  "refleksi": [
    "Bagaimana Segi-n Beraturan n Kali Sisi membantumu memahami soal?",
    "Kapan kamu memakai Sisi Beda Jumlah Satu-satu?",
    "Apa bedanya dengan hanya menghafal rumus?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Regular n-gon",
      "namaId": "Segi-n Beraturan n Kali Sisi",
      "asal": "Polygon perimeter",
      "ringkas": "Jika semua sisi sama, K = n × sisi.",
      "tahap": [
        "Story",
        "Mind",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Irregular Side Sum",
      "namaId": "Sisi Beda Jumlah Satu-satu",
      "asal": "Flexible strategy",
      "ringkas": "Jika sisi tidak sama, jangan ×n; jumlahkan semua sisi.",
      "tahap": [
        "Story",
        "Picture",
        "Concrete"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Table Pattern",
      "namaId": "Pola Tabel Banyak Sisi",
      "asal": "Pattern generalization",
      "ringkas": "Segi 5 → 5×s, segi 6 → 6×s: pola n×s.",
      "tahap": [
        "Infografis",
        "Abstract"
      ]
    }
  ]
};

export const SUB_E54: SubBabNaskah = {
  "id": "E",
  "codeTitle": "Sub-Bab E (Bangun Gabungan)",
  "fullTitle": "Sub-Bab E: Keliling Bangun Gabungan",
  "targetDescription": "Siswa menghitung keliling bangun gabungan dengan hanya menjumlahkan sisi batas luar (outer path), mengabaikan sekat dalam, serta memakai strategi bungkus persegi panjang dan melengkapi sisi hilang sesuai Buku Siswa Kelas V Bab 4 Sub-Bab E.",
  "secondaryBg": "#EDE9FE",
  "secondaryBorder": "#7C3AED",
  "secondaryText": "#5B21B6",
  "silabus": {
    "teksSuara": "Kita belajar keliling bangun gabungan pada denah. Path Length sekarang hanya di dinding terluar. Sekat dalam antar ruang tidak dihitung. Kadang kita membungkus denah dengan persegi panjang besar, atau mencari sisi hilang dulu. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menentukan keliling bangun gabungan dengan hanya menghitung batas luar.",
    "referensi": "Buku Siswa Matematika Kelas V Kemendikbudristek (Bab 4: Keliling Bangun Datar, Sub-Bab E hlm. 125–130)."
  },
  "videos": [
    {
      "id": "K5B4E-V1",
      "judul": "Denah: Hanya Luar",
      "subjudul": "Outer Path Only",
      "adegan": [
        {
          "id": "K5B4E-V1-1",
          "judul": "Denah rumah",
          "ketukan": [
            "Denah sering gabungan dapur, kamar, dan ruang tamu.",
            "Jika kita memasang pagar mengelilingi seluruh rumah, kita mengikuti dinding terluar.",
            "Dinding antar ruang di dalam rumah tidak dibeli sebagai pagar luar.",
            "Jadi keliling gabungan = Path Length hanya pada batas luar."
          ],
          "papan": [
            "denah",
            "pagar luar",
            "sekat dalam",
            "outer path"
          ]
        },
        {
          "id": "K5B4E-V1-2",
          "judul": "Abaikan sekat",
          "ketukan": [
            "Sekat dalam membagi luas, tetapi tidak menambah keliling luar.",
            "Jika kamu menjumlah semua sisi termasuk sekat, hasilnya terlalu besar.",
            "Tandai dulu sisi yang menghadap luar. Hanya itu yang dijumlah.",
            "METODE LUAR · Hanya Batas Luar: abaikan sekat dalam."
          ],
          "papan": [
            "bukan luar",
            "salah besar",
            "tandai luar",
            "outer only"
          ]
        },
        {
          "id": "K5B4E-V1-3",
          "judul": "Cara Asep",
          "ketukan": [
            "Satu cara: ukur atau baca setiap sisi luar satu-satu, lalu jumlahkan.",
            "Ini paling langsung mengikuti Path Length.",
            "Pastikan tidak ada sisi luar yang terlewat di sudut menonjol.",
            "Siap pelajari cara bungkus."
          ],
          "papan": [
            "cara Asep",
            "langsung",
            "jangan lewat",
            "lanjut"
          ]
        }
      ]
    },
    {
      "id": "K5B4E-V2",
      "judul": "Bungkus dan Sisi Hilang",
      "subjudul": "Bounding + Missing",
      "adegan": [
        {
          "id": "K5B4E-V2-1",
          "judul": "Strategi bungkus",
          "ketukan": [
            "Kadang denah bisa dibayangkan sebagai persegi panjang besar yang membungkusnya.",
            "Jika luarnya dua belas dan enam, K = 2(12+6) = tiga puluh enam.",
            "Cara ini cepat bila ukuran luar sudah jelas.",
            "METODE LUAR · Strategi Bungkus Persegi Panjang: hitung PP besar."
          ],
          "papan": [
            "bungkus",
            "2(12+6)=36",
            "cepat",
            "bounding"
          ]
        },
        {
          "id": "K5B4E-V2-2",
          "judul": "Sisi hilang",
          "ketukan": [
            "Sering ada sisi bertanda tanya. Lengkapi dulu sebelum menjumlah.",
            "Pakai selisih panjang: sisi besar dikurangi bagian yang sudah diketahui.",
            "Atau pakai kesamaan: sisi yang sejajar dan sama pada denah.",
            "METODE LUAR · Lengkapi Sisi Hilang: jangan menjumlah sebelum lengkap."
          ],
          "papan": [
            "sisi ?",
            "selisih",
            "kesamaan",
            "missing length"
          ]
        },
        {
          "id": "K5B4E-V2-3",
          "judul": "Latihan 8×4 dan sisi 4",
          "ketukan": [
            "PP luar delapan dan empat: K = 2(8+4) = dua puluh empat.",
            "Persegi sisi empat: K = enam belas. Itu latihan pembanding.",
            "Selalu tanya: apakah angka ini sisi luar atau sekat dalam?",
            "Bab 4 A sampai E kini utuh: dari arti keliling sampai gabungan."
          ],
          "papan": [
            "24",
            "16",
            "tanya dulu",
            "A–E"
          ]
        }
      ]
    },
    {
      "id": "K5B4E-V3",
      "judul": "Rangkum Bab 4",
      "subjudul": "Path Length Final",
      "adegan": [
        {
          "id": "K5B4E-V3-1",
          "judul": "Satu dasar",
          "ketukan": [
            "Dari segitiga sampai gabungan, dasarnya Path Length.",
            "Rumus 3s, 2(p+l), 4s, n×s hanyalah jalan pintas bila sisi sama atau berpasangan.",
            "Gabungan menambah aturan: abaikan sekat dalam.",
            "Jika ragu, gambar panah mengelilingi luar."
          ],
          "papan": [
            "satu dasar",
            "pintas",
            "aturan ekstra",
            "gambar panah"
          ]
        },
        {
          "id": "K5B4E-V3-2",
          "judul": "Cek akhir",
          "ketukan": [
            "Cek 1: hanya sisi luar. Cek 2: satuan sama. Cek 3: hasil masuk akal.",
            "Cek 4: bukan luas. Cek 5: sisi hilang sudah dilengkapi.",
            "Dengan lima cek ini, keliling gabungan lebih aman.",
            "Siap permainan denah."
          ],
          "papan": [
            "3 cek",
            "cek lagi",
            "aman",
            "main"
          ]
        },
        {
          "id": "K5B4E-V3-3",
          "judul": "Tutup materi",
          "ketukan": [
            "Kamu punya metode luar berlabel di Silabus, dan sudah memakainya di cerita.",
            "Path Length, fencing, rumus, n×s, outer path: semuanya saling terkait.",
            "Ulangi peta pikiran bila perlu, lalu selesaikan permainan Concrete sampai Abstract.",
            "Hebat: Materi keliling Bab 4 siap diperdalam lewat bermain."
          ],
          "papan": [
            "metode hidup",
            "terkait",
            "ulang",
            "hebat"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Lihat denah",
      "stepDesc": "Baca soal Keliling Bangun Gabungan dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Gabungan ruang apa saja? Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa menghitung keliling bangun gabungan dengan hanya menjumlahkan sisi batas luar (outer path), mengabaikan sekat dala….",
      "icon": "🏠",
      "flowFrom": "Lihat denah",
      "flowTo": "Tandai luar"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Tandai luar",
      "stepDesc": "Warnai atau garisbawahi hanya dinding terluar. Pada Keliling Bangun Gabungan, langkah “Tandai luar” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Hanya Batas Luar: Keliling gabungan = jalur terluar; sekat dalam diabaikan. Strategi Bungkus Persegi Panjang: Bungkus denah dengan PP besar lalu hitung keliling…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "⭕",
      "flowFrom": "Tandai luar",
      "flowTo": "Abaikan dalam"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Abaikan dalam",
      "stepDesc": "Sekat antar ruang tidak masuk keliling luar. Pada Keliling Bangun Gabungan, langkah “Abaikan dalam” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Hanya Batas Luar: Keliling gabungan = jalur terluar; sekat dalam diabaikan. Strategi Bungkus Persegi Panjang: Bungkus denah dengan PP besar lalu hitung keliling…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🚫",
      "flowFrom": "Abaikan dalam",
      "flowTo": "Lengkapi sisi ?"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Lengkapi sisi ?",
      "stepDesc": "Selisih atau kesamaan ukuran. Pada Keliling Bangun Gabungan, langkah “Lengkapi sisi ?” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Hanya Batas Luar: Keliling gabungan = jalur terluar; sekat dalam diabaikan. Strategi Bungkus Persegi Panjang: Bungkus denah dengan PP besar lalu hitung keliling…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🔍",
      "flowFrom": "Lengkapi sisi ?",
      "flowTo": "Jumlah luar / bungkus"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Jumlah luar / bungkus",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Keliling Bangun Gabungan. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "➕",
      "flowFrom": "Jumlah luar / bungkus",
      "flowTo": "Hasil K"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Hasil K",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Keliling Bangun Gabungan. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "📏",
      "flowFrom": "Hasil K",
      "flowTo": "Cek 5"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Cek 5",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Keliling Bangun Gabungan. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Cek 5",
      "flowTo": "Bab 4 utuh"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Bab 4 utuh",
      "stepDesc": "Latih lagi di tahap Concrete, Picture, lalu Abstract untuk Keliling Bangun Gabungan. Mulai dari benda nyata, lanjut ke diagram, baru ke lambang angka. Ulangi sampai kamu bisa menjelaskan tanpa melihat contoh. Bermain sambil berlatih membuat konsepnya melekat lebih lama.",
      "icon": "🎉",
      "flowFrom": "Bab 4 utuh",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Batas luar",
      "emoji": "⭕",
      "countNum": 1,
      "countWord": "dihitung",
      "suara": "Outer path."
    },
    {
      "judul": "Sekat dalam",
      "emoji": "🚫",
      "countNum": 1,
      "countWord": "abaikan",
      "suara": "Bukan keliling luar."
    },
    {
      "judul": "Cara Asep",
      "emoji": "📏",
      "countNum": 1,
      "countWord": "jumlah luar",
      "suara": "Side sum luar."
    },
    {
      "judul": "Cara Komang",
      "emoji": "📦",
      "countNum": 1,
      "countWord": "bungkus PP",
      "suara": "Bounding rectangle."
    },
    {
      "judul": "12×6",
      "emoji": "🔢",
      "countNum": 36,
      "countWord": "K=36",
      "suara": "2(12+6)."
    },
    {
      "judul": "8×4",
      "emoji": "▭",
      "countNum": 24,
      "countWord": "K=24",
      "suara": "Contoh."
    },
    {
      "judul": "Sisi 4",
      "emoji": "⬜",
      "countNum": 16,
      "countWord": "K=16",
      "suara": "Persegi."
    },
    {
      "judul": "Sisi ?",
      "emoji": "🔍",
      "countNum": 1,
      "countWord": "selisih/sama",
      "suara": "Missing length."
    },
    {
      "judul": "Denah",
      "emoji": "🏠",
      "countNum": 1,
      "countWord": "gabungan",
      "suara": "Konteks."
    },
    {
      "judul": "Bab 4 A–E",
      "emoji": "🎉",
      "countNum": 1,
      "countWord": "siap",
      "suara": "Materi utuh."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-e-c",
      "title": "Hitung Gabungan",
      "bookReference": "hlm. 125–130",
      "objective": "Hitung hanya dinding terluar denah; abaikan sekat dalam.",
      "mechanicDescription": "Tiga ronde. Outer Path Only: sekat antar ruang tidak masuk keliling luar.",
      "voiceGuide": "Hanya batas luar. Sekat dalam diabaikan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-e-c",
      "title": "Arti Batas Luar",
      "bookReference": "hlm. 125–130",
      "objective": "Hitung hanya dinding terluar denah; abaikan sekat dalam.",
      "mechanicDescription": "Tiga ronde. Outer Path Only: sekat antar ruang tidak masuk keliling luar.",
      "voiceGuide": "Hanya batas luar. Sekat dalam diabaikan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-e-c",
      "title": "Pilih Aturan",
      "bookReference": "hlm. 125–130",
      "objective": "Hitung hanya dinding terluar denah; abaikan sekat dalam.",
      "mechanicDescription": "Tiga ronde. Outer Path Only: sekat antar ruang tidak masuk keliling luar.",
      "voiceGuide": "Hanya batas luar. Sekat dalam diabaikan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-e-c",
      "title": "Pilah Luar/Dalam",
      "bookReference": "hlm. 125–130",
      "objective": "Hitung hanya dinding terluar denah; abaikan sekat dalam.",
      "mechanicDescription": "Tiga ronde. Outer Path Only: sekat antar ruang tidak masuk keliling luar.",
      "voiceGuide": "Hanya batas luar. Sekat dalam diabaikan.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-e-c",
      "title": "Jodohkan Gabungan",
      "bookReference": "hlm. 125–130",
      "objective": "Hitung hanya dinding terluar denah; abaikan sekat dalam. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Outer Path Only: sekat antar ruang tidak masuk keliling luar.",
      "voiceGuide": "Hanya batas luar. Sekat dalam diabaikan. Mainkan dengan teliti.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-e-c",
      "title": "Memori Gabungan",
      "bookReference": "hlm. 125–130",
      "objective": "Hitung hanya dinding terluar denah; abaikan sekat dalam. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Outer Path Only: sekat antar ruang tidak masuk keliling luar.",
      "voiceGuide": "Hanya batas luar. Sekat dalam diabaikan. Mainkan dengan teliti.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-e-c",
      "title": "Ketuk Hasil",
      "bookReference": "hlm. 125–130",
      "objective": "Hitung hanya dinding terluar denah; abaikan sekat dalam. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Outer Path Only: sekat antar ruang tidak masuk keliling luar.",
      "voiceGuide": "Hanya batas luar. Sekat dalam diabaikan. Mainkan dengan teliti.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-e-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 125–130",
      "objective": "Hitung hanya dinding terluar denah; abaikan sekat dalam. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Outer Path Only: sekat antar ruang tidak masuk keliling luar.",
      "voiceGuide": "Hanya batas luar. Sekat dalam diabaikan. Mainkan dengan teliti.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-e-c",
      "title": "Cerita Denah",
      "bookReference": "hlm. 125–130",
      "objective": "Hitung hanya dinding terluar denah; abaikan sekat dalam. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Outer Path Only: sekat antar ruang tidak masuk keliling luar.",
      "voiceGuide": "Hanya batas luar. Sekat dalam diabaikan. Mainkan dengan teliti.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-e-c",
      "title": "Urutkan Hasil",
      "bookReference": "hlm. 125–130",
      "objective": "Hitung hanya dinding terluar denah; abaikan sekat dalam. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Outer Path Only: sekat antar ruang tidak masuk keliling luar.",
      "voiceGuide": "Hanya batas luar. Sekat dalam diabaikan. Mainkan dengan teliti.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-e-p",
      "title": "Diagram Hitung Gabungan",
      "bookReference": "hlm. 125–130",
      "objective": "Bungkus denah sebagai persegi panjang besar, lalu 2(P+L).",
      "mechanicDescription": "Tiga ronde. Bounding Rectangle: strategi bungkus denah.",
      "voiceGuide": "Boleh bungkus denah jadi persegi panjang besar.",
      "diagramType": "hitung",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "rumus-e-p",
      "title": "Diagram Arti Batas Luar",
      "bookReference": "hlm. 125–130",
      "objective": "Bungkus denah sebagai persegi panjang besar, lalu 2(P+L).",
      "mechanicDescription": "Tiga ronde. Bounding Rectangle: strategi bungkus denah.",
      "voiceGuide": "Boleh bungkus denah jadi persegi panjang besar.",
      "diagramType": "rumus",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "arti-e-p",
      "title": "Diagram Pilih Aturan",
      "bookReference": "hlm. 125–130",
      "objective": "Bungkus denah sebagai persegi panjang besar, lalu 2(P+L).",
      "mechanicDescription": "Tiga ronde. Bounding Rectangle: strategi bungkus denah.",
      "voiceGuide": "Boleh bungkus denah jadi persegi panjang besar.",
      "diagramType": "arti",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sortir-e-p",
      "title": "Diagram Pilah Luar/Dalam",
      "bookReference": "hlm. 125–130",
      "objective": "Bungkus denah sebagai persegi panjang besar, lalu 2(P+L).",
      "mechanicDescription": "Tiga ronde. Bounding Rectangle: strategi bungkus denah.",
      "voiceGuide": "Boleh bungkus denah jadi persegi panjang besar.",
      "diagramType": "sortir",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-e-p",
      "title": "Diagram Jodohkan Gabungan",
      "bookReference": "hlm. 125–130",
      "objective": "Bungkus denah sebagai persegi panjang besar, lalu 2(P+L). Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Bounding Rectangle: strategi bungkus denah.",
      "voiceGuide": "Boleh bungkus denah jadi persegi panjang besar. Mainkan dengan teliti.",
      "diagramType": "jodoh",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memori-e-p",
      "title": "Diagram Memori Gabungan",
      "bookReference": "hlm. 125–130",
      "objective": "Bungkus denah sebagai persegi panjang besar, lalu 2(P+L). Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Bounding Rectangle: strategi bungkus denah.",
      "voiceGuide": "Boleh bungkus denah jadi persegi panjang besar. Mainkan dengan teliti.",
      "diagramType": "memori",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-e-p",
      "title": "Diagram Ketuk Hasil",
      "bookReference": "hlm. 125–130",
      "objective": "Bungkus denah sebagai persegi panjang besar, lalu 2(P+L). Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Bounding Rectangle: strategi bungkus denah.",
      "voiceGuide": "Boleh bungkus denah jadi persegi panjang besar. Mainkan dengan teliti.",
      "diagramType": "ketuk",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "semua-e-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 125–130",
      "objective": "Bungkus denah sebagai persegi panjang besar, lalu 2(P+L). Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Bounding Rectangle: strategi bungkus denah.",
      "voiceGuide": "Boleh bungkus denah jadi persegi panjang besar. Mainkan dengan teliti.",
      "diagramType": "semua",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "cerita-e-p",
      "title": "Diagram Cerita Denah",
      "bookReference": "hlm. 125–130",
      "objective": "Bungkus denah sebagai persegi panjang besar, lalu 2(P+L). Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Bounding Rectangle: strategi bungkus denah.",
      "voiceGuide": "Boleh bungkus denah jadi persegi panjang besar. Mainkan dengan teliti.",
      "diagramType": "cerita",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "urut-e-p",
      "title": "Diagram Urutkan Hasil",
      "bookReference": "hlm. 125–130",
      "objective": "Bungkus denah sebagai persegi panjang besar, lalu 2(P+L). Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Bounding Rectangle: strategi bungkus denah.",
      "voiceGuide": "Boleh bungkus denah jadi persegi panjang besar. Mainkan dengan teliti.",
      "diagramType": "urut",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-e-a",
      "title": "Tulis Hitung Gabungan",
      "bookReference": "hlm. 125–130",
      "objective": "Lengkapi sisi yang hilang sebelum menjumlah jalur luar.",
      "mechanicDescription": "Tiga ronde. Missing Length: selisih atau kesamaan dulu.",
      "voiceGuide": "Sisi tanda tanya? Lengkapi dulu, baru jumlahkan.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-e-a",
      "title": "Tulis Arti Batas Luar",
      "bookReference": "hlm. 125–130",
      "objective": "Lengkapi sisi yang hilang sebelum menjumlah jalur luar.",
      "mechanicDescription": "Tiga ronde. Missing Length: selisih atau kesamaan dulu.",
      "voiceGuide": "Sisi tanda tanya? Lengkapi dulu, baru jumlahkan.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-e-a",
      "title": "Tulis Pilih Aturan",
      "bookReference": "hlm. 125–130",
      "objective": "Lengkapi sisi yang hilang sebelum menjumlah jalur luar.",
      "mechanicDescription": "Tiga ronde. Missing Length: selisih atau kesamaan dulu.",
      "voiceGuide": "Sisi tanda tanya? Lengkapi dulu, baru jumlahkan.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-e-a",
      "title": "Tulis Pilah Luar/Dalam",
      "bookReference": "hlm. 125–130",
      "objective": "Lengkapi sisi yang hilang sebelum menjumlah jalur luar.",
      "mechanicDescription": "Tiga ronde. Missing Length: selisih atau kesamaan dulu.",
      "voiceGuide": "Sisi tanda tanya? Lengkapi dulu, baru jumlahkan.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-e-a",
      "title": "Tulis Jodohkan Gabungan",
      "bookReference": "hlm. 125–130",
      "objective": "Lengkapi sisi yang hilang sebelum menjumlah jalur luar. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Missing Length: selisih atau kesamaan dulu.",
      "voiceGuide": "Sisi tanda tanya? Lengkapi dulu, baru jumlahkan. Mainkan dengan teliti.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-e-a",
      "title": "Tulis Memori Gabungan",
      "bookReference": "hlm. 125–130",
      "objective": "Lengkapi sisi yang hilang sebelum menjumlah jalur luar. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Missing Length: selisih atau kesamaan dulu.",
      "voiceGuide": "Sisi tanda tanya? Lengkapi dulu, baru jumlahkan. Mainkan dengan teliti.",
      "symbolLarge": "K",
      "wordLarge": "KELILING",
      "mathNotation": "rumus"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-e",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 125–130",
      "objective": "Lengkapi sisi yang hilang sebelum menjumlah jalur luar. Latihan lanjutan.",
      "mechanicDescription": "Dua ronde. Tiga ronde. Missing Length: selisih atau kesamaan dulu.",
      "voiceGuide": "Sisi tanda tanya? Lengkapi dulu, baru jumlahkan. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-e",
      "title": "Detektif Keliling",
      "bookReference": "hlm. 125–130",
      "objective": "Lengkapi sisi yang hilang sebelum menjumlah jalur luar. Latihan lanjutan.",
      "mechanicDescription": "Tiga soal. Tiga ronde. Missing Length: selisih atau kesamaan dulu.",
      "voiceGuide": "Sisi tanda tanya? Lengkapi dulu, baru jumlahkan. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "peta-e",
      "title": "Peta Konsep",
      "bookReference": "hlm. 125–130",
      "objective": "Lengkapi sisi yang hilang sebelum menjumlah jalur luar. Latihan lanjutan.",
      "mechanicDescription": "Satu peta. Tiga ronde. Missing Length: selisih atau kesamaan dulu.",
      "voiceGuide": "Sisi tanda tanya? Lengkapi dulu, baru jumlahkan. Mainkan dengan teliti.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "cerita-q-e",
      "title": "Cerita Angka",
      "bookReference": "hlm. 125–130",
      "objective": "Lengkapi sisi yang hilang sebelum menjumlah jalur luar. Latihan lanjutan.",
      "mechanicDescription": "Tiga ronde. Tiga ronde. Missing Length: selisih atau kesamaan dulu.",
      "voiceGuide": "Sisi tanda tanya? Lengkapi dulu, baru jumlahkan. Mainkan dengan teliti.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "⭕",
      "nama": "Hanya luar",
      "isi": "Keliling gabungan = jalur terluar. Sekat dalam tidak dihitung.",
      "suara": "Outer path only."
    },
    {
      "ikon": "📦",
      "nama": "Bungkus",
      "isi": "Boleh bungkus denah sebagai PP besar lalu pakai 2(P+L).",
      "suara": "Bounding rectangle."
    },
    {
      "ikon": "🔍",
      "nama": "Sisi hilang",
      "isi": "Lengkapi sisi ? dengan selisih atau kesamaan sebelum menjumlah.",
      "suara": "Missing length."
    },
    {
      "ikon": "🚶",
      "nama": "Path Length akhir",
      "isi": "Semua rumus bab ini kembali ke panjang jalur di batas yang benar.",
      "suara": "Dasar utuh."
    }
  ],
  "poinSuara": "Ingat: hanya batas luar, boleh bungkus PP, lengkapi sisi hilang dulu.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Tandai luar",
        "warna": "#FDE68A"
      },
      {
        "teks": "lengkapi sisi",
        "warna": "#BBF7D0"
      },
      {
        "teks": "jumlahkan/bungkus",
        "warna": "#BFDBFE"
      },
      {
        "teks": "cek",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: terapkan Hanya Batas Luar pada satu benda nyata, lalu ceritakan langkahmu.",
  "refleksi": [
    "Bagaimana Hanya Batas Luar membantumu memahami soal?",
    "Kapan kamu memakai Strategi Bungkus Persegi Panjang?",
    "Apa bedanya dengan hanya menghafal rumus?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Outer Path Only",
      "namaId": "Hanya Batas Luar",
      "asal": "Composite figure pedagogy",
      "ringkas": "Keliling gabungan = jalur terluar; sekat dalam diabaikan.",
      "tahap": [
        "Story",
        "Mind",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Bounding Rectangle",
      "namaId": "Strategi Bungkus Persegi Panjang",
      "asal": "Problem-solving strategy",
      "ringkas": "Bungkus denah dengan PP besar lalu hitung kelilingnya bila cocok.",
      "tahap": [
        "Story",
        "Picture",
        "Concrete"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Missing Length",
      "namaId": "Lengkapi Sisi Hilang",
      "asal": "Van de Walle",
      "ringkas": "Cari sisi belum diketahui dengan selisih atau kesamaan ukuran sebelum menjumlah.",
      "tahap": [
        "Infografis",
        "Picture",
        "Abstract"
      ]
    }
  ]
};

export const SUB_BAB_K5B4: SubBabNaskah[] = [SUB_A54, SUB_B54, SUB_C54, SUB_D54, SUB_E54];
export const semuaAdeganK5B4 = SUB_BAB_K5B4.flatMap((s) => s.videos.flatMap((v) => v.adegan));
