/**
 * Naskah — poles kerapatan setara K5B4.
 * Metode luar dianyam ketukan per ketukan.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K3B1_META = {
  "chapterId": "k3-mat-bab1",
  "phaseCode": "FASE_B",
  "grade": 3,
  "subjectLabel": "MATEMATIKA - KELAS 3 SD",
  "title": "BAB 1: BILANGAN CACAH SAMPAI 1.000",
  "silabusElemen": "🌈 Fase B • Elemen Bilangan: Membaca, Menulis, dan Nilai Tempat Bilangan Cacah sampai 1.000 (Kelas 3 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A31: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Bilangan dan Lambang Bilangan)",
  "fullTitle": "Sub-Bab A: Bilangan dan Lambang Bilangan Cacah sampai 1.000",
  "targetDescription": "Siswa membaca bilangan cacah tiga angka sampai 1.000 dengan benar, termasuk bilangan yang memuat angka nol (703, 900, 405), serta menulis lambang bilangan dari kata bilangan. Siswa mengenal satuan, puluhan, dan ratusan lewat benda nyata dan model blok, memahami bahwa sepuluh satuan sama dengan satu puluhan dan sepuluh puluhan sama dengan satu ratusan, lalu memakai papan ratusan, puluhan, dan satuan. Siswa memakai cara Balok Dienes, Tabel Nilai Tempat, Nama Bilangan. Siswa memakai cara Balok Dienes, Tabel Nilai Tempat, Nama Bilangan.",
  "secondaryBg": "#DCFCE7",
  "secondaryBorder": "#16A34A",
  "secondaryText": "#14532D",
  "silabus": {
    "teksSuara": "Kita belajar bilangan dan lambang bilangan cacah sampai seribu. Alfa membawa tongkat Pramuka sepanjang seratus enam puluh sentimeter, Meutia berjalan enam ratus tujuh puluh satu meter ke sekolah, dan Alen berjalan lima ratus tujuh puluh dua meter ke taman kota. Kita belajar bahwa sepuluh satuan adalah satu puluhan dan sepuluh puluhan adalah satu ratusan, lalu membaca dan menulis bilangan tiga angka dengan papan ratusan, puluhan, dan satuan. Kita juga berhati-hati dengan angka nol. Kita memakai cara: Balok Dienes, Tabel Nilai Tempat, Nama Bilangan. Satuan–puluhan–ratusan untuk bilangan sampai 1.000. Baca dan tulis menurut ratusan, puluhan, satuan. Ucapkan bilangan sesuai aturan bahasa Indonesia. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa membaca, menulis, dan membandingkan bilangan cacah sampai 1.000. Pada sub-bab ini siswa membaca dan menulis bilangan cacah sampai 1.000 serta memahami satuan, puluhan, dan ratusan.",
    "referensi": "Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 1 Sub-Bab A)."
  },
  "videos": [
    {
      "id": "K3B1A-V1",
      "judul": "Tongkat Pramuka Alfa",
      "subjudul": "Dienes Blocks",
      "adegan": [
        {
          "id": "K3B1A-V1-1",
          "judul": "Kegiatan Pramuka",
          "ketukan": [
            "Bayangkan kamu sedang mempelajari Bilangan dan Lambang Bilangan Cacah sampai 1.000. Galih, Alen, dan Alfa mengikuti kegiatan Pramuka. Alfa terpilih menjadi ketua barung.",
            "Alfa membawa tongkat yang di atasnya terikat bendera sebagai tanda barung.",
            "Tongkat itu selalu dibawanya saat kegiatan Pramuka.",
            "Ingat cara Balok Dienes: Satuan–puluhan–ratusan untuk bilangan sampai 1.000. Ingat cara Balok Dienes: Satuan–puluhan–ratusan untuk bilangan sampai 1.000."
          ],
          "papan": [
            "Kegiatan Pramuka",
            "Tongkat barung",
            "Selalu dibawa",
            "Berapa panjangnya?"
          ]
        },
        {
          "id": "K3B1A-V1-2",
          "judul": "Satuan, puluhan, ratusan",
          "ketukan": [
            "Kita ingat dulu. Satu kotak kecil adalah satu satuan.",
            "Sepuluh satuan dapat disebut satu puluhan, seperti satu batang.",
            "Sepuluh batang puluhan ditumpuk menjadi seratus satuan.",
            "Di sini kita memakai ide Dienes Blocks — Satuan–puluhan–ratusan untuk bilangan sampai 1.000. Di sini kita memakai Dienes Blocks. Satuan–puluhan–ratusan untuk bilangan sampai 1.000."
          ],
          "papan": [
            "1 satuan",
            "10 satuan = 1 puluhan",
            "10 puluhan = 100 satuan",
            "100 satuan = 1 ratusan"
          ]
        },
        {
          "id": "K3B1A-V1-3",
          "judul": "Tongkat 160 sentimeter",
          "ketukan": [
            "Panjang tongkat Alfa adalah seratus enam puluh sentimeter, ditulis 160.",
            "Kita taruh di papan nilai tempat. Ratusan satu, puluhan enam, satuan nol.",
            "Kita baca ratusan lebih dulu, yaitu seratus. Lalu puluhan, yaitu enam puluh.",
            "Satuannya nol, jadi tidak dibaca. Bilangan 160 dibaca seratus enam puluh. METODE LUAR · Balok Dienes: Satuan–puluhan–ratusan untuk bilangan sampai 1.000."
          ],
          "papan": [
            "Tongkat 160 cm",
            "1 ratusan, 6 puluhan, 0 satuan",
            "Seratus + enam puluh",
            "Nol tidak dibaca"
          ]
        }
      ]
    },
    {
      "id": "K3B1A-V2",
      "judul": "Latihan: Tabel Nilai Tempat",
      "subjudul": "Place-Value Chart",
      "adegan": [
        {
          "id": "K3B1A-V2-1",
          "judul": "Berjalan ke sekolah",
          "ketukan": [
            "Meutia berangkat ke sekolah dengan berjalan kaki bersama teman-teman.",
            "Jarak rumah Meutia ke sekolah adalah enam ratus tujuh puluh satu meter.",
            "Berjalan kaki menyehatkan badan, dan Meutia sangat senang berjalan kaki.",
            "Ingat cara Tabel Nilai Tempat: Baca dan tulis menurut ratusan, puluhan, satuan. Ingat cara Tabel Nilai Tempat: Baca dan tulis menurut ratusan, puluhan, satuan."
          ],
          "papan": [
            "Berjalan ke sekolah",
            "671 meter",
            "Jalan kaki itu sehat",
            "Bilangan tiga angka"
          ]
        },
        {
          "id": "K3B1A-V2-2",
          "judul": "Minimarket 759 meter",
          "ketukan": [
            "Di jalan lain ada papan bertuliskan 759 meter menuju minimarket.",
            "Ambil kartu bilangan 7, kartu 5, dan kartu 9, lalu susun dari kiri ke kanan.",
            "Bacalah, tujuh ratus lima puluh sembilan.",
            "Di sini kita memakai ide Place-Value Chart — Baca dan tulis menurut ratusan, puluhan, satuan. Di sini kita memakai Place-Value Chart. Baca dan tulis menurut ratusan, puluhan, satuan."
          ],
          "papan": [
            "Minimarket 759 m",
            "Kartu 7, 5, dan 9",
            "Tujuh ratus lima puluh sembilan",
            "Ratus, puluh, satuan"
          ]
        },
        {
          "id": "K3B1A-V2-3",
          "judul": "Bilangan dengan angka nol",
          "ketukan": [
            "Perhatikan bilangan 703. Puluhannya nol, jadi tidak ada puluhan yang dibaca.",
            "703 dibaca tujuh ratus tiga. Tidak dibaca tujuh ratus nol tiga.",
            "Bilangan 900 dibaca sembilan ratus, sebab puluhan dan satuannya nol.",
            "METODE LUAR · Tabel Nilai Tempat: Baca dan tulis menurut ratusan, puluhan, satuan."
          ],
          "papan": [
            "703",
            "Tujuh ratus tiga",
            "900 = sembilan ratus",
            "634"
          ]
        }
      ]
    },
    {
      "id": "K3B1A-V3",
      "judul": "Siap pakai Number Names",
      "subjudul": "Number Names",
      "adegan": [
        {
          "id": "K3B1A-V3-1",
          "judul": "Ke taman kota",
          "ketukan": [
            "Setiap hari Minggu Alen bermain di taman kota dan berjalan kaki dari rumah.",
            "Jarak rumah Alen ke taman kota adalah lima ratus tujuh puluh dua meter.",
            "Bagaimana cara menulis lambang bilangan itu.",
            "Ingat cara Nama Bilangan: Ucapkan bilangan sesuai aturan bahasa Indonesia. Ingat cara Nama Bilangan: Ucapkan bilangan sesuai aturan bahasa Indonesia."
          ],
          "papan": [
            "Taman kota",
            "Lima ratus tujuh puluh dua",
            "Menulis lambangnya",
            "Dengar, lalu tulis"
          ]
        },
        {
          "id": "K3B1A-V3-2",
          "judul": "Menulis 354",
          "ketukan": [
            "Kita akan menulis tiga ratus lima puluh empat.",
            "Tentukan angka ratusan, yaitu tiga, tulis 3.",
            "Tentukan angka puluhan, yaitu lima, tulis 5. Lalu angka satuan, yaitu empat, tulis 4.",
            "Di sini kita memakai ide Number Names — Ucapkan bilangan sesuai aturan bahasa Indonesia. Di sini kita memakai Number Names. Ucapkan bilangan sesuai aturan bahasa Indonesia."
          ],
          "papan": [
            "Tiga ratus lima puluh empat",
            "Ratusan: 3",
            "Puluhan: 5, satuan: 4",
            "354"
          ]
        },
        {
          "id": "K3B1A-V3-3",
          "judul": "Nol penjaga tempat",
          "ketukan": [
            "Bagaimana menulis empat ratus lima? Tidak ada puluhan, jadi puluhannya nol.",
            "Kita tulis 4 di ratusan, 0 di puluhan, dan 5 di satuan, yaitu 405.",
            "Kalau nolnya dihilangkan menjadi 45, dan nilainya berubah jauh.",
            "METODE LUAR · Nama Bilangan: Ucapkan bilangan sesuai aturan bahasa Indonesia."
          ],
          "papan": [
            "Empat ratus lima",
            "4, nol, dan 5",
            "Tanpa nol: 45",
            "Nol penjaga tempat"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Apa yang ditanyakan pada Bilangan dan Lambang Bilangan Cacah sampai 1.000?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Dienes Blocks",
      "stepDesc": "Satuan–puluhan–ratusan untuk bilangan sampai 1.000.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Place-Value Chart",
      "stepDesc": "Baca dan tulis menurut ratusan, puluhan, satuan.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Number Names",
      "stepDesc": "Ucapkan bilangan sesuai aturan bahasa Indonesia.",
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
      "judul": "Satuan, Puluhan, Ratusan",
      "emoji": "🧊",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Satu kotak kecil adalah satu satuan. Sepuluh satuan adalah satu puluhan. Sepuluh puluhan adalah satu ratusan, yaitu seratus satuan."
    },
    {
      "judul": "Seratus Satuan",
      "emoji": "💯",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Sepuluh tumpukan dari sepuluh satuan adalah seratus satuan. Seratus satuan disebut satu ratusan."
    },
    {
      "judul": "Papan Tiga Tempat",
      "emoji": "🗂️",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Bilangan tiga angka punya tiga tempat. Dari kiri ke kanan: ratusan berwarna hijau, puluhan berwarna biru, dan satuan berwarna merah."
    },
    {
      "judul": "Kata Ratusan",
      "emoji": "🔢",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Satu ratusan dibaca seratus. Dua ratusan dibaca dua ratus, tiga ratusan dibaca tiga ratus, dan seterusnya sampai sembilan ratus."
    },
    {
      "judul": "Kata Puluhan",
      "emoji": "🔟",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Puluhan dibaca dua puluh, tiga puluh, sampai sembilan puluh. Sepuluh, sebelas, dan dua belas sampai sembilan belas punya nama sendiri."
    },
    {
      "judul": "Membaca 160",
      "emoji": "🚩",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Ratusan satu dibaca seratus, puluhan enam dibaca enam puluh, dan satuan nol tidak dibaca. Jadi 160 dibaca seratus enam puluh."
    },
    {
      "judul": "Angka Nol",
      "emoji": "⭕",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Nol berarti tidak ada. Tujuh ratus tiga ditulis 703, sembilan ratus ditulis 900, dan nol tidak dibaca sebagai kata nol."
    },
    {
      "judul": "Menulis 572",
      "emoji": "✍️",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Dengarkan lima ratus tujuh puluh dua. Ratusan lima, puluhan tujuh, satuan dua. Jadi ditulis 572."
    },
    {
      "judul": "Bilangan di Sekitar Kita",
      "emoji": "📏",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Jarak 671 meter, panjang tongkat 160 sentimeter, tinggi badan 127 sentimeter, dan kecepatan 220 kilometer per jam adalah bilangan tiga angka."
    },
    {
      "judul": "Cara Membaca dan Menulis",
      "emoji": "📝",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Empat langkah. Satu, cari tempat tiap angka. Dua, baca ratusan, puluhan, lalu satuan. Tiga, lewati angka nol. Empat, saat menulis, isi tempat yang kosong dengan nol."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "build-with-exchange",
      "title": "Rakit Kemasan",
      "bookReference": "hlm. 5–7 (10 satuan menjadi 1 puluhan, 10 puluhan menjadi 1 ratusan)",
      "objective": "Pakai Balok Dienes: Satuan–puluhan–ratusan untuk bilangan sampai 1.000. 000. Latihan: Merakit bilangan tiga angka dengan dus, bungkus, dan benda lepas, serta menukar sepuluh kemasan menjadi satu kemasan lebih besar..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua bilangan yang dibacakan dengan kata. Siswa menekan tambah atau kurang pada dus, bungkus, dan benda lepas. Sepuluh benda otomatis ditukar menjadi satu bungkus, dan sepuluh bungkus menjadi satu dus. Siswa menekan Periksa. Saat bermain, ingat Balok Dienes: Satuan–puluhan–ratusan untuk bilangan sampai 1.000.",
      "voiceGuide": "Balok Dienes. Satuan–puluhan–ratusan untuk bilangan sampai 1.000.",
      "emoji": "📦",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "count-packages",
      "title": "Hitung Kemasan",
      "bookReference": "hlm. 6–7 (berapa banyak kotak di bawah ini)",
      "objective": "Pakai Balok Dienes: Satuan–puluhan–ratusan untuk bilangan sampai 1.000. 000. Latihan: Menghitung dus, bungkus, dan benda lepas lalu memilih lambang bilangannya..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Gambar menampilkan dus, bungkus, dan benda lepas. Siswa memilih satu dari tiga bilangan. Pengecoh menukar tempat angka. Saat bermain, ingat Balok Dienes: Satuan–puluhan–ratusan untuk bilangan sampai 1.000.",
      "voiceGuide": "Balok Dienes. Satuan–puluhan–ratusan untuk bilangan sampai 1.000.",
      "emoji": "🔢",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-packages",
      "title": "Pilah Kemasan",
      "bookReference": "hlm. 5–6 (satuan, puluhan, ratusan)",
      "objective": "Pakai Balok Dienes: Satuan–puluhan–ratusan untuk bilangan sampai 1.000. 000. Latihan: Memilah kemasan menurut nilainya: benda lepas satuan, bungkus puluhan, dus ratusan..",
      "mechanicDescription": "Tiga ronde, tiap ronde enam kelompok kemasan dan tiga kotak: ratusan, puluhan, satuan. Siswa menyeret atau mengetuk kelompok ke kotak yang tepat. Saat bermain, ingat Balok Dienes: Satuan–puluhan–ratusan untuk bilangan sampai 1.000.",
      "voiceGuide": "Balok Dienes. Satuan–puluhan–ratusan untuk bilangan sampai 1.000.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-package-number",
      "title": "Jodohkan Kemasan dan Bilangan",
      "bookReference": "hlm. 6–7 (banyak ratusan, puluhan, dan satuan pada papan)",
      "objective": "Pakai Balok Dienes: Satuan–puluhan–ratusan untuk bilangan sampai 1.000. 000. Latihan: Menjodohkan kumpulan kemasan dengan lambang bilangannya..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga kumpulan dan tiga bilangan. Siswa mengetuk kumpulan, lalu mengetuk bilangan yang cocok. Pasangan benar terkunci. Saat bermain, ingat Balok Dienes: Satuan–puluhan–ratusan untuk bilangan sampai 1.000.",
      "voiceGuide": "Balok Dienes. Satuan–puluhan–ratusan untuk bilangan sampai 1.000.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "memory-package-number",
      "title": "Memori Kemasan dan Bilangan",
      "bookReference": "hlm. 6–7 (benda dan lambang bilangan yang sama)",
      "objective": "Mencocokkan kumpulan kemasan dengan lambang bilangannya lewat permainan memori.. Ingat Balok Dienes. (Balok Dienes)",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): kumpulan kemasan dan lambang bilangan. Siswa membalik dua kartu dan mencari pasangannya. Gunakan Balok Dienes.",
      "voiceGuide": "Balok Dienes. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-read-package",
      "title": "Ketuk Kumpulan yang Dibaca",
      "bookReference": "hlm. 9–11 (membaca bilangan tiga angka)",
      "objective": "Mendengar kata bilangan lalu menemukan kumpulan benda yang bilangannya sama.. Ingat Balok Dienes. (Balok Dienes)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga kumpulan yang mirip (misalnya 160, 106, 610) dan dua pertanyaan membaca. Siswa mengetuk kumpulan yang tepat. Gunakan Balok Dienes.",
      "voiceGuide": "Balok Dienes. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-packages",
      "title": "Ketuk Semua yang Cocok",
      "bookReference": "hlm. 17 (angka puluhan kurang dari 3, angka satuan lebih dari 7)",
      "objective": "Menemukan semua kumpulan yang memenuhi syarat angka tertentu, termasuk angka nol.. Ingat Balok Dienes. (Balok Dienes)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat kumpulan dan satu perintah, misalnya tanpa bungkus atau tanpa benda lepas. Siswa mengetuk semua yang cocok, lalu menekan Periksa. Gunakan Balok Dienes.",
      "voiceGuide": "Balok Dienes. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "read-package-words",
      "title": "Baca Kumpulan",
      "bookReference": "hlm. 9–11 (cara membaca bilangan tiga angka)",
      "objective": "Membaca kumpulan benda dengan kata bilangan yang benar, termasuk bilangan dengan angka nol.. Ingat Balok Dienes. (Balok Dienes)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Gambar menampilkan kumpulan, misalnya 703 atau 405. Siswa memilih satu dari tiga cara membaca. Pengecoh membaca nol atau menukar tempat. Gunakan Balok Dienes.",
      "voiceGuide": "Balok Dienes. Mainkan dengan teliti.",
      "emoji": "🗣️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "board-from-package",
      "title": "Papan dari Kumpulan",
      "bookReference": "hlm. 6–7 (papan ratusan, puluhan, satuan)",
      "objective": "Mengisi papan ratusan, puluhan, dan satuan dari kumpulan benda.. Ingat Balok Dienes. (Balok Dienes)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa menghitung dus, bungkus, dan benda lepas, lalu mengatur tiga angka pada papan dan menekan Periksa. Gunakan Balok Dienes.",
      "voiceGuide": "Balok Dienes. Mainkan dengan teliti.",
      "emoji": "🗂️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "exchange-packages",
      "title": "Tukar Kemasan",
      "bookReference": "hlm. 5–6 (10 satuan = 1 puluhan, 100 satuan = 1 ratusan)",
      "objective": "Memahami penukaran sepuluh benda menjadi satu bungkus dan sepuluh bungkus menjadi satu dus.. Ingat Balok Dienes. (Balok Dienes)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa memilih hasil penukaran atau isi satu kemasan dari tiga pilihan, dengan gambar kemasan sebagai petunjuk. Gunakan Balok Dienes.",
      "voiceGuide": "Balok Dienes. Mainkan dengan teliti.",
      "emoji": "🔄",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "count-blocks",
      "title": "Hitung Blok",
      "bookReference": "hlm. 6–7 (banyak ratusan, puluhan, satuan pada model)",
      "objective": "Pakai Tabel Nilai Tempat: Baca dan tulis menurut ratusan, puluhan, satuan. Latihan: Membaca model blok menjadi lambang bilangan..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Gambar menampilkan blok ratusan, batang puluhan, dan kotak satuan. Siswa memilih satu dari tiga bilangan. Saat bermain, ingat Tabel Nilai Tempat: Baca dan tulis menurut ratusan, puluhan, satuan.",
      "voiceGuide": "Tabel Nilai Tempat. Baca dan tulis menurut ratusan, puluhan, satuan.",
      "diagramType": "blocks-count",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "board-from-blocks",
      "title": "Papan dari Blok",
      "bookReference": "hlm. 15 (isilah titik-titik berdasarkan gambar)",
      "objective": "Pakai Tabel Nilai Tempat: Baca dan tulis menurut ratusan, puluhan, satuan. Latihan: Mengisi papan ratusan, puluhan, dan satuan dari model blok..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa mengatur tiga angka pada papan sesuai blok, lalu menekan Periksa. Saat bermain, ingat Tabel Nilai Tempat: Baca dan tulis menurut ratusan, puluhan, satuan.",
      "voiceGuide": "Tabel Nilai Tempat. Baca dan tulis menurut ratusan, puluhan, satuan.",
      "diagramType": "blocks-board",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "fill-block-table",
      "title": "Isi Tabel Blok",
      "bookReference": "hlm. 23 (lengkapi tabel dengan bilangan yang sesuai nilai tempatnya)",
      "objective": "Pakai Tabel Nilai Tempat: Baca dan tulis menurut ratusan, puluhan, satuan. Latihan: Mengisi angka ratusan, puluhan, dan satuan pada tabel dari model blok..",
      "mechanicDescription": "Tiga tabel dengan tiga baris. Tiap baris menampilkan model blok. Siswa mengetuk sel untuk memutar angkanya, lalu menekan Periksa. Saat bermain, ingat Tabel Nilai Tempat: Baca dan tulis menurut ratusan, puluhan, satuan.",
      "voiceGuide": "Tabel Nilai Tempat. Baca dan tulis menurut ratusan, puluhan, satuan.",
      "diagramType": "blocks-table",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "match-block-number",
      "title": "Jodohkan Blok dan Bilangan",
      "bookReference": "hlm. 6–7 dan 15 (blok dan lambang bilangan)",
      "objective": "Pakai Tabel Nilai Tempat: Baca dan tulis menurut ratusan, puluhan, satuan. Latihan: Menjodohkan model blok dengan lambang bilangannya..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga model dan tiga bilangan. Siswa mengetuk model, lalu mengetuk bilangan yang cocok. Saat bermain, ingat Tabel Nilai Tempat: Baca dan tulis menurut ratusan, puluhan, satuan.",
      "voiceGuide": "Tabel Nilai Tempat. Baca dan tulis menurut ratusan, puluhan, satuan.",
      "diagramType": "blocks-match",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memory-block-word",
      "title": "Memori Blok dan Kata",
      "bookReference": "hlm. 10–11 (cara membaca bilangan)",
      "objective": "Mencocokkan model blok dengan kata bilangannya lewat permainan memori.. Ingat Tabel Nilai Tempat. (Tabel Nilai Tempat)",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): model blok dan kata bilangan. Siswa membalik dua kartu dan mencari pasangannya. Gunakan Tabel Nilai Tempat.",
      "voiceGuide": "Tabel Nilai Tempat. Mainkan dengan teliti.",
      "diagramType": "blocks-memory",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "tap-block-read",
      "title": "Ketuk Blok yang Dibaca",
      "bookReference": "hlm. 9–11 (membaca bilangan tiga angka)",
      "objective": "Mendengar kata bilangan lalu mengetuk model blok yang sesuai.. Ingat Tabel Nilai Tempat. (Tabel Nilai Tempat)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga model yang mirip dan dua pertanyaan. Siswa mengetuk model yang bilangannya sama dengan kata yang dibacakan. Gunakan Tabel Nilai Tempat.",
      "voiceGuide": "Tabel Nilai Tempat. Mainkan dengan teliti.",
      "diagramType": "blocks-tap",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "number-line-read",
      "title": "Garis Bilangan: Ketuk Bilangan",
      "bookReference": "hlm. 10–14 (membaca dan menulis bilangan)",
      "objective": "Menemukan letak sebuah bilangan pada garis bilangan ratusan atau puluhan.. Ingat Tabel Nilai Tempat. (Tabel Nilai Tempat)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa mendengar kata bilangan, lalu mengetuk bilangan itu pada garis bilangan yang langkahnya seratus atau sepuluh. Gunakan Tabel Nilai Tempat.",
      "voiceGuide": "Tabel Nilai Tempat. Mainkan dengan teliti.",
      "diagramType": "number-line",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-blocks",
      "title": "Ketuk Semua Blok",
      "bookReference": "hlm. 17 (bilangan dengan syarat angka tertentu)",
      "objective": "Menemukan semua model blok yang memenuhi syarat angka tertentu.. Ingat Tabel Nilai Tempat. (Tabel Nilai Tempat)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat model dan satu perintah, misalnya angka puluhannya 0. Siswa mengetuk semua yang cocok, lalu menekan Periksa. Gunakan Tabel Nilai Tempat.",
      "voiceGuide": "Tabel Nilai Tempat. Mainkan dengan teliti.",
      "diagramType": "blocks-select",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-zero-blocks",
      "title": "Pilah Blok: Ada Nol atau Tidak",
      "bookReference": "hlm. 13–14 (angka nol pada nilai tempat)",
      "objective": "Memilah model blok menjadi yang memuat angka nol dan yang tidak.. Ingat Tabel Nilai Tempat. (Tabel Nilai Tempat)",
      "mechanicDescription": "Tiga ronde, tiap ronde enam model dan dua kotak: ada angka nol dan tanpa angka nol. Siswa menyeret atau mengetuk model ke kotak yang tepat. Gunakan Tabel Nilai Tempat.",
      "voiceGuide": "Tabel Nilai Tempat. Mainkan dengan teliti.",
      "diagramType": "blocks-sort",
      "numberA": 3,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "complete-block-sentence",
      "title": "Lengkapi Kalimat Blok",
      "bookReference": "hlm. 6–7 (berapa banyak ratusan, puluhan, satuan)",
      "objective": "Melengkapi kalimat tentang banyak ratusan, puluhan, dan satuan pada sebuah model.. Ingat Tabel Nilai Tempat. (Tabel Nilai Tempat)",
      "mechanicDescription": "Tiga model, tiap model tiga kalimat. Siswa memilih satu dari tiga angka untuk bagian kosong. Kalimat lengkap dibacakan. Gunakan Tabel Nilai Tempat.",
      "voiceGuide": "Tabel Nilai Tempat. Mainkan dengan teliti.",
      "diagramType": "blocks-sentence",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Abstract",
      "gameType": "compose-three-cards",
      "title": "Susun Tiga Kartu",
      "bookReference": "hlm. 7–8 dan 12 (kartu bilangan; Ayo Berpikir)",
      "objective": "Pakai Nama Bilangan: Ucapkan bilangan sesuai aturan bahasa Indonesia. Latihan: Menulis lambang bilangan dari kata bilangan dengan menyusun tiga kartu angka..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca kata bilangan, lalu mengetuk kartu angka dan mengetuk tempat ratusan, puluhan, atau satuan. Diperiksa otomatis. Saat bermain, ingat Nama Bilangan: Ucapkan bilangan sesuai aturan bahasa Indonesia.",
      "voiceGuide": "Nama Bilangan. Ucapkan bilangan sesuai aturan bahasa Indonesia.",
      "symbolLarge": "759",
      "wordLarge": "SUSUN KARTU",
      "mathNotation": "kata → angka"
    },
    {
      "stage": "Abstract",
      "gameType": "read-number-choice",
      "title": "Baca Bilangan",
      "bookReference": "hlm. 9–11 (cara membaca bilangan tiga angka)",
      "objective": "Pakai Nama Bilangan: Ucapkan bilangan sesuai aturan bahasa Indonesia. Latihan: Memilih cara membaca yang benar untuk sebuah lambang bilangan..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa melihat lambang bilangan dan memilih satu dari tiga cara membaca. Pengecoh menukar angka atau membaca nol. Saat bermain, ingat Nama Bilangan: Ucapkan bilangan sesuai aturan bahasa Indonesia.",
      "voiceGuide": "Nama Bilangan. Ucapkan bilangan sesuai aturan bahasa Indonesia.",
      "symbolLarge": "671",
      "wordLarge": "BACA",
      "mathNotation": "angka → kata"
    },
    {
      "stage": "Abstract",
      "gameType": "write-on-board",
      "title": "Tulis Lambang di Papan",
      "bookReference": "hlm. 13–14 (menulis lambang bilangan)",
      "objective": "Pakai Nama Bilangan: Ucapkan bilangan sesuai aturan bahasa Indonesia. Latihan: Menulis lambang bilangan dari kata bilangan pada papan ratusan, puluhan, dan satuan..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca kata bilangan lalu mengatur tiga angka pada papan dan menekan Periksa. Saat bermain, ingat Nama Bilangan: Ucapkan bilangan sesuai aturan bahasa Indonesia.",
      "voiceGuide": "Nama Bilangan. Ucapkan bilangan sesuai aturan bahasa Indonesia.",
      "symbolLarge": "572",
      "wordLarge": "TULIS",
      "mathNotation": "kata → angka"
    },
    {
      "stage": "Abstract",
      "gameType": "match-number-word",
      "title": "Jodohkan Angka dan Kata",
      "bookReference": "hlm. 17 (pasangkan lambang bilangan dan cara membacanya)",
      "objective": "Pakai Nama Bilangan: Ucapkan bilangan sesuai aturan bahasa Indonesia. Latihan: Menjodohkan lambang bilangan dengan cara membacanya..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga pasang. Siswa mengetuk lambang bilangan di kiri, lalu mengetuk kata bilangan di kanan. Saat bermain, ingat Nama Bilangan: Ucapkan bilangan sesuai aturan bahasa Indonesia.",
      "voiceGuide": "Nama Bilangan. Ucapkan bilangan sesuai aturan bahasa Indonesia.",
      "symbolLarge": "903",
      "wordLarge": "JODOHKAN",
      "mathNotation": "angka • kata"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-number-word",
      "title": "Memori Angka dan Kata",
      "bookReference": "hlm. 17 (lambang bilangan dan cara membacanya)",
      "objective": "Mencocokkan lambang bilangan dengan kata bilangannya lewat permainan memori.. Ingat Nama Bilangan. (Nama Bilangan)",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): lambang bilangan dan kata bilangan. Siswa membalik dua kartu dan mencari pasangannya. Gunakan Nama Bilangan.",
      "voiceGuide": "Nama Bilangan. Mainkan dengan teliti.",
      "symbolLarge": "305",
      "wordLarge": "MEMORI",
      "mathNotation": "angka • kata"
    },
    {
      "stage": "Abstract",
      "gameType": "fill-reading-table",
      "title": "Isi Tabel Cara Membaca",
      "bookReference": "hlm. 18 (tabel bilangan, ditulis, cara membaca)",
      "objective": "Melengkapi tabel bilangan dan cara membacanya.. Ingat Nama Bilangan. (Nama Bilangan)",
      "mechanicDescription": "Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu cara membaca yang tepat. Ada satu kartu pengecoh. Gunakan Nama Bilangan.",
      "voiceGuide": "Nama Bilangan. Mainkan dengan teliti.",
      "symbolLarge": "405",
      "wordLarge": "TABEL",
      "mathNotation": "bilangan • dibaca"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-reading",
      "title": "Benar atau Salah: Membaca dan Menulis",
      "bookReference": "hlm. 5–14 (satuan, ratusan, angka nol)",
      "objective": "Menilai pernyataan tentang satuan, ratusan, membaca, dan menulis bilangan tiga angka.. Ingat Nama Bilangan. (Nama Bilangan)",
      "mechanicDescription": "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan dihitung dari bilangan, dan tiap jawaban diberi penjelasan singkat. Gunakan Nama Bilangan.",
      "voiceGuide": "Nama Bilangan. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "periksa dengan alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-number",
      "title": "Detektif Bilangan",
      "bookReference": "hlm. 12–14 (menyusun bilangan tiga angka dari kartu)",
      "objective": "Menemukan bilangan dari dua petunjuk tentang angka-angkanya.. Ingat Nama Bilangan. (Nama Bilangan)",
      "mechanicDescription": "Empat soal. Siswa membaca petunjuk seperti ratusanku 6 dan satuanku 1, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok dengan semua petunjuk. Gunakan Nama Bilangan.",
      "voiceGuide": "Nama Bilangan. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "dua petunjuk, satu jawaban"
    },
    {
      "stage": "Abstract",
      "gameType": "select-all-numbers",
      "title": "Ketuk Semua yang Cocok: Angka",
      "bookReference": "hlm. 17 (angka puluhan kurang dari 3; angka satuan lebih dari 7; angka ratusan kurang dari 5)",
      "objective": "Memilih semua bilangan yang memenuhi syarat tentang angka tertentu.. Ingat Nama Bilangan. (Nama Bilangan)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat bilangan dan satu perintah. Siswa mengetuk semua bilangan yang cocok, lalu menekan Periksa. Gunakan Nama Bilangan.",
      "voiceGuide": "Nama Bilangan. Mainkan dengan teliti.",
      "symbolLarge": "✔✔",
      "wordLarge": "SEMUA COCOK",
      "mathNotation": "kurang dari • lebih dari"
    },
    {
      "stage": "Abstract",
      "gameType": "build-number-sentence",
      "title": "Susun Kata Bilangan",
      "bookReference": "hlm. 13–14 dan 10–11 (membaca dan menulis bilangan)",
      "objective": "Menyusun kata menjadi kalimat tentang membaca dan menulis bilangan.. Ingat Nama Bilangan. (Nama Bilangan)",
      "mechanicDescription": "Empat kalimat, misalnya seratus enam puluh ditulis 160. Kartu kata diketuk berurutan. Satu kartu pengecoh tidak dipakai. Gunakan Nama Bilangan.",
      "voiceGuide": "Nama Bilangan. Mainkan dengan teliti.",
      "symbolLarge": "Aa",
      "wordLarge": "SUSUN KATA",
      "mathNotation": "kata • kalimat • bilangan"
    }
  ],
  "poin": [
    {
      "ikon": "🧊",
      "nama": "Sepuluh jadi satu",
      "isi": "10 satuan = 1 puluhan, 10 puluhan = 1 ratusan",
      "suara": "Sepuluh satuan sama dengan satu puluhan, dan sepuluh puluhan sama dengan satu ratusan."
    },
    {
      "ikon": "🌍",
      "nama": "Balok Dienes",
      "isi": "Satuan–puluhan–ratusan untuk bilangan sampai 1.000.",
      "suara": "Balok Dienes. Satuan–puluhan–ratusan untuk bilangan sampai 1.000."
    },
    {
      "ikon": "🌍",
      "nama": "Tabel Nilai Tempat",
      "isi": "Baca dan tulis menurut ratusan, puluhan, satuan.",
      "suara": "Tabel Nilai Tempat. Baca dan tulis menurut ratusan, puluhan, satuan."
    },
    {
      "ikon": "🌍",
      "nama": "Nama Bilangan",
      "isi": "Ucapkan bilangan sesuai aturan bahasa Indonesia.",
      "suara": "Nama Bilangan. Ucapkan bilangan sesuai aturan bahasa Indonesia."
    }
  ],
  "poinSuara": "Ingat: Balok Dienes, Tabel Nilai Tempat, Nama Bilangan.",
  "cara": {
    "suara": "Cara membaca. Lihat angka ratusan, lalu puluhan, lalu satuan. Baca ratusan, baca puluhan, baca satuan, dan lewati angka nol.",
    "potongan": [
      {
        "teks": "ratusan",
        "warna": "#BBF7D0"
      },
      {
        "teks": "puluhan",
        "warna": "#BFDBFE"
      },
      {
        "teks": "satuan",
        "warna": "#FECACA"
      },
      {
        "teks": "lewati nol",
        "warna": "#FDE68A"
      }
    ]
  },
  "rumah": "Ayo Mencoba: terapkan Balok Dienes pada satu soal nyata di rumah.",
  "refleksi": [
    "Bagaimana Balok Dienes membantumu?",
    "Kapan memakai Tabel Nilai Tempat?",
    "Apa bedanya dengan hanya menghafal tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Dienes Blocks",
      "namaId": "Balok Dienes",
      "asal": "Zoltan Dienes",
      "ringkas": "Satuan–puluhan–ratusan untuk bilangan sampai 1.000.",
      "tahap": [
        "Story",
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Place-Value Chart",
      "namaId": "Tabel Nilai Tempat",
      "asal": "Van de Walle",
      "ringkas": "Baca dan tulis menurut ratusan, puluhan, satuan.",
      "tahap": [
        "Mind",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Number Names",
      "namaId": "Nama Bilangan",
      "asal": "Naming pedagogy",
      "ringkas": "Ucapkan bilangan sesuai aturan bahasa Indonesia.",
      "tahap": [
        "Infografis",
        "Story"
      ]
    }
  ]
};

export const SUB_B31: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Nilai Tempat)",
  "fullTitle": "Sub-Bab B: Nilai Tempat Bilangan Cacah sampai 1.000",
  "targetDescription": "Siswa menentukan tempat dan nilai setiap angka pada bilangan tiga angka (pada 251, angka 2 bernilai 200, angka 5 bernilai 50, angka 1 bernilai 1), menyusun bilangan dari ratusan, puluhan, dan satuan, mengurai bilangan menjadi 200 + 50 + 1, mengisi tabel nilai tempat dengan angka (bukan nilai), serta menjelaskan peran angka nol pada nilai tempat. Siswa memakai cara Nilai Tempat, Kartu Angka Montessori, Bentuk Uraian. Siswa memakai cara Nilai Tempat, Kartu Angka Montessori, Bentuk Uraian.",
  "secondaryBg": "#E0E7FF",
  "secondaryBorder": "#4338CA",
  "secondaryText": "#312E81",
  "silabus": {
    "teksSuara": "Kita belajar nilai tempat bilangan cacah sampai seribu. Guru mengukur tinggi badan seorang siswa, seratus dua puluh tujuh sentimeter, lalu kita mencari tempat dan nilai tiap angka. Kita memakai tiga kaleng ratusan, puluhan, dan satuan serta kartu angka untuk menyusun bilangan. Kita belajar menyusun bilangan dan mengurai bilangan, misalnya dua ratus lima puluh satu sama dengan dua ratus tambah lima puluh tambah satu. Kita memakai cara: Nilai Tempat, Kartu Angka Montessori, Bentuk Uraian. Nilai digit bergantung tempatnya. Kartu 1000/100/10/1 menyusun bilangan. 300+40+5 = 345. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa membaca, menulis, dan membandingkan bilangan cacah sampai 1.000. Pada sub-bab ini siswa menentukan dan menggunakan nilai tempat bilangan cacah sampai 1.000.",
    "referensi": "Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 1 Sub-Bab B)."
  },
  "videos": [
    {
      "id": "K3B1B-V1",
      "judul": "Tinggi Badan 127",
      "subjudul": "Place Value",
      "adegan": [
        {
          "id": "K3B1B-V1-1",
          "judul": "Mengukur tinggi badan",
          "ketukan": [
            "Bayangkan kamu sedang mempelajari Nilai Tempat Bilangan Cacah sampai 1.000. Di kelas, guru mengukur tinggi badan seorang siswa dengan alat ukur.",
            "Hasil ukurnya seratus dua puluh tujuh sentimeter, ditulis 127 sentimeter.",
            "Bilangan itu terdiri atas tiga angka, yaitu satu, dua, dan tujuh.",
            "Ingat cara Nilai Tempat: Nilai digit bergantung tempatnya. Ingat cara Nilai Tempat: Nilai digit bergantung tempatnya."
          ],
          "papan": [
            "Mengukur tinggi badan",
            "127 sentimeter",
            "Tiga angka",
            "Tempat dan nilai"
          ]
        },
        {
          "id": "K3B1B-V1-2",
          "judul": "Nilai tempat 251",
          "ketukan": [
            "Kita baca 251, yaitu dua ratus lima puluh satu.",
            "Angka 2 menempati tempat ratusan, jadi nilainya 200.",
            "Angka 5 menempati tempat puluhan, jadi nilainya 50.",
            "Di sini kita memakai ide Place Value — Nilai digit bergantung tempatnya. Di sini kita memakai Place Value. Nilai digit bergantung tempatnya."
          ],
          "papan": [
            "251",
            "2 di ratusan = 200",
            "5 di puluhan = 50",
            "1 di satuan = 1"
          ]
        },
        {
          "id": "K3B1B-V1-3",
          "judul": "Angka sama, nilai beda",
          "ketukan": [
            "Perhatikan angka 6 pada tiga bilangan, yaitu 600, 60, dan 6.",
            "Pada 600, angka 6 ada di tempat ratusan dan bernilai 600.",
            "Pada 60, angka 6 ada di tempat puluhan dan bernilai 60.",
            "METODE LUAR · Nilai Tempat: Nilai digit bergantung tempatnya."
          ],
          "papan": [
            "Angka 6 di tiga tempat",
            "Ratusan: 600",
            "Puluhan: 60",
            "Satuan: 6"
          ]
        }
      ]
    },
    {
      "id": "K3B1B-V2",
      "judul": "Latihan: Kartu Angka Montessori",
      "subjudul": "Montessori Cards",
      "adegan": [
        {
          "id": "K3B1B-V2-1",
          "judul": "Menyiapkan tiga kaleng",
          "ketukan": [
            "Kita menyiapkan tiga kaleng bekas dan memberi label ratusan, puluhan, dan satuan.",
            "Letakkan kaleng ratusan, puluhan, dan satuan berurutan dari kiri ke kanan.",
            "Kita juga membuat sepuluh kartu angka dari nol sampai sembilan.",
            "Ingat cara Kartu Angka Montessori: Kartu 1000/100/10/1 menyusun bilangan. Ingat cara Kartu Angka Montessori: Kartu 1000/100/10/1 menyusun bilangan."
          ],
          "papan": [
            "Tiga kaleng",
            "Kiri ke kanan",
            "Kartu 0 sampai 9",
            "Warna berbeda"
          ]
        },
        {
          "id": "K3B1B-V2-2",
          "judul": "Mengambil kartu",
          "ketukan": [
            "Masukkan kartu secara acak ke dalam tiga kaleng, lalu ambil satu kartu dari tiap kaleng.",
            "Misalnya dari kaleng ratusan terambil kartu 2.",
            "Dari kaleng puluhan terambil kartu 1, dan dari kaleng satuan terambil kartu 9.",
            "Di sini kita memakai ide Montessori Cards — Kartu 1000/100/10/1 menyusun bilangan. Di sini kita memakai Montessori Cards. Kartu 1000/100/10/1 menyusun bilangan."
          ],
          "papan": [
            "Ambil satu kartu",
            "Ratusan: 2",
            "Puluhan: 1, satuan: 9",
            "Bilangan 219"
          ]
        },
        {
          "id": "K3B1B-V2-3",
          "judul": "Nilai tiap kartu",
          "ketukan": [
            "Kartu 2 di kaleng ratusan bernilai dua ratus.",
            "Kartu 1 di kaleng puluhan bernilai sepuluh.",
            "Kartu 9 di kaleng satuan bernilai sembilan.",
            "METODE LUAR · Kartu Angka Montessori: Kartu 1000/100/10/1 menyusun bilangan."
          ],
          "papan": [
            "2 ratusan = 200",
            "1 puluhan = 10",
            "9 satuan = 9",
            "200 + 10 + 9 = 219"
          ]
        }
      ]
    },
    {
      "id": "K3B1B-V3",
      "judul": "Siap pakai Expanded Form",
      "subjudul": "Expanded Form",
      "adegan": [
        {
          "id": "K3B1B-V3-1",
          "judul": "Menyusun bilangan",
          "ketukan": [
            "Menyusun bilangan berarti menjumlahkan ratusan, puluhan, dan satuan.",
            "Dua ratusan, lima puluhan, dan satu satuan menjadi dua ratus lima puluh satu.",
            "Ditulis 2 ratusan tambah 5 puluhan tambah 1 satuan sama dengan 251.",
            "Ingat cara Bentuk Uraian: 300+40+5 = 345. Ingat cara Bentuk Uraian: 300+40+5 = 345."
          ],
          "papan": [
            "Menyusun bilangan",
            "2, 5, dan 1",
            "2 ratusan + 5 puluhan + 1 satuan",
            "200 + 50 + 1 = 251"
          ]
        },
        {
          "id": "K3B1B-V3-2",
          "judul": "Mengurai bilangan",
          "ketukan": [
            "Mengurai bilangan adalah menguraikan bilangan menjadi ratusan, puluhan, dan satuan.",
            "Bilangan 602 diurai menjadi 6 ratusan, 0 puluhan, dan 2 satuan.",
            "Dalam bentuk nilai, 602 sama dengan 600 tambah 0 tambah 2.",
            "Di sini kita memakai ide Expanded Form — 300+40+5 = 345. Di sini kita memakai Expanded Form. 300+40+5 = 345."
          ],
          "papan": [
            "Mengurai bilangan",
            "602",
            "600 + 0 + 2",
            "Dua arah"
          ]
        },
        {
          "id": "K3B1B-V3-3",
          "judul": "Isi tabel dengan teliti",
          "ketukan": [
            "Hati-hati saat mengisi tabel nilai tempat.",
            "Untuk 987, tabel diisi angka: 9 di ratusan, 8 di puluhan, dan 7 di satuan.",
            "Jangan menulis 900, 80, dan 7 di dalam tabel. Itu adalah nilainya, bukan angkanya.",
            "METODE LUAR · Bentuk Uraian: 300+40+5 = 345."
          ],
          "papan": [
            "Isi tabel dengan teliti",
            "987: 9, 8, 7",
            "Angka bukan nilai",
            "900 + 80 + 7"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Apa yang ditanyakan pada Nilai Tempat Bilangan Cacah sampai 1.000?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Place Value",
      "stepDesc": "Nilai digit bergantung tempatnya.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Montessori Cards",
      "stepDesc": "Kartu 1000/100/10/1 menyusun bilangan.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Expanded Form",
      "stepDesc": "300+40+5 = 345.",
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
      "judul": "Angka dan Tempatnya",
      "emoji": "📍",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Setiap angka pada bilangan tiga angka menempati satu tempat: ratusan, puluhan, atau satuan."
    },
    {
      "judul": "Tempat Menentukan Nilai",
      "emoji": "⚖️",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Angka enam pada enam ratus bernilai enam ratus, pada enam puluh bernilai enam puluh, dan pada enam bernilai enam."
    },
    {
      "judul": "Nilai Dua Ratus Lima Puluh Satu",
      "emoji": "🔢",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Pada 251, angka dua di ratusan bernilai dua ratus, angka lima di puluhan bernilai lima puluh, dan angka satu di satuan bernilai satu."
    },
    {
      "judul": "Tiga Kaleng",
      "emoji": "🥫",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Kaleng ratusan, puluhan, dan satuan diletakkan dari kiri ke kanan. Satu kartu angka diambil dari tiap kaleng."
    },
    {
      "judul": "Menyusun Bilangan",
      "emoji": "🧩",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Menyusun bilangan adalah menjumlahkan ratusan, puluhan, dan satuan. Dua ratusan, lima puluhan, dan satu satuan menjadi 251."
    },
    {
      "judul": "Mengurai Bilangan",
      "emoji": "🔬",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Mengurai bilangan adalah menguraikan menjadi ratusan, puluhan, dan satuan. 602 sama dengan 600 tambah 0 tambah 2."
    },
    {
      "judul": "Angka Nol",
      "emoji": "⭕",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Nol berarti tidak ada. Pada 805, puluhannya nol dan bernilai nol. Nol menjaga angka lain tetap di tempatnya."
    },
    {
      "judul": "Tabel Nilai Tempat",
      "emoji": "📊",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Tabel nilai tempat diisi dengan angka, bukan nilai. Untuk 987, isilah sembilan, delapan, dan tujuh."
    },
    {
      "judul": "Angka 8 di Mana?",
      "emoji": "🔍",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Pada 981 angka delapan menempati puluhan. Pada 845 ratusan. Pada 108 satuan. Pada 800 ratusan."
    },
    {
      "judul": "Cara Menentukan Nilai Tempat",
      "emoji": "📝",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Empat langkah. Satu, tulis bilangan pada papan tiga tempat. Dua, lihat tempat tiap angka. Tiga, kalikan angka dengan seratus, sepuluh, atau satu. Empat, jumlahkan bila ingin mengecek."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "three-cans-cards",
      "title": "Tiga Kaleng",
      "bookReference": "hlm. 19–20 (Aktivitas 2: Menentukan Nilai Tempat)",
      "objective": "Pakai Nilai Tempat: Nilai digit bergantung tempatnya. Latihan: Menyusun tiga kartu angka pada kaleng ratusan, puluhan, dan satuan menjadi bilangan yang diminta..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa mengetuk kartu angka, lalu mengetuk kaleng ratusan, puluhan, atau satuan. Diperiksa otomatis saat tiga kaleng terisi. Saat bermain, ingat Nilai Tempat: Nilai digit bergantung tempatnya.",
      "voiceGuide": "Nilai Tempat. Nilai digit bergantung tempatnya.",
      "emoji": "🥫",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "value-of-package",
      "title": "Nilai Satu Kemasan",
      "bookReference": "hlm. 21 (angka 2 menempati ratusan yang bernilai 200)",
      "objective": "Pakai Nilai Tempat: Nilai digit bergantung tempatnya. Latihan: Menentukan nilai sebuah angka dari banyak benda pada kemasan tempat angka itu berada..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Gambar menampilkan kumpulan dus, bungkus, dan benda lepas. Siswa memilih berapa banyak benda yang ada pada satu jenis kemasan. Saat bermain, ingat Nilai Tempat: Nilai digit bergantung tempatnya.",
      "voiceGuide": "Nilai Tempat. Nilai digit bergantung tempatnya.",
      "emoji": "💰",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "match-package-value",
      "title": "Jodohkan Kemasan dan Nilai",
      "bookReference": "hlm. 21 (nilai ratusan, puluhan, satuan)",
      "objective": "Pakai Nilai Tempat: Nilai digit bergantung tempatnya. Latihan: Menjodohkan kelompok kemasan dengan nilainya dalam benda..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga kelompok kemasan dan tiga nilai, misalnya 3 dus dengan 300. Siswa mengetuk kelompok, lalu mengetuk nilai yang cocok. Saat bermain, ingat Nilai Tempat: Nilai digit bergantung tempatnya.",
      "voiceGuide": "Nilai Tempat. Nilai digit bergantung tempatnya.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "package-into-can",
      "title": "Masukkan Kemasan ke Kaleng",
      "bookReference": "hlm. 19 (kaleng ratusan, puluhan, dan satuan)",
      "objective": "Pakai Nilai Tempat: Nilai digit bergantung tempatnya. Latihan: Memasukkan kelompok kemasan ke kaleng ratusan, puluhan, atau satuan yang sesuai..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga kelompok kemasan dan tiga kaleng. Siswa mengetuk kelompok, lalu mengetuk kaleng yang tepat. Saat bermain, ingat Nilai Tempat: Nilai digit bergantung tempatnya.",
      "voiceGuide": "Nilai Tempat. Nilai digit bergantung tempatnya.",
      "emoji": "🥫",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "memory-package-value",
      "title": "Memori Kemasan dan Nilai",
      "bookReference": "hlm. 21 (nilai ratusan, puluhan, satuan)",
      "objective": "Mencocokkan kelompok kemasan dengan nilainya lewat permainan memori.. Ingat Nilai Tempat. (Nilai Tempat)",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): kelompok kemasan dan nilainya. Siswa membalik dua kartu dan mencari pasangannya. Gunakan Nilai Tempat.",
      "voiceGuide": "Nilai Tempat. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "build-from-value",
      "title": "Rakit Nilai",
      "bookReference": "hlm. 21 (menyusun bilangan: 2 ratusan + 5 puluhan + 1 satuan)",
      "objective": "Merakit bilangan dengan kemasan dari kalimat penyusunan.. Ingat Nilai Tempat. (Nilai Tempat)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal yang dibacakan sebagai penyusunan, misalnya 3 ratusan ditambah 4 puluhan ditambah 7 satuan. Siswa merakit dengan dus, bungkus, dan benda lepas. Gunakan Nilai Tempat.",
      "voiceGuide": "Nilai Tempat. Mainkan dengan teliti.",
      "emoji": "🧩",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tap-digit-package",
      "title": "Ketuk Kumpulan dengan Angka Tertentu",
      "bookReference": "hlm. 21–23 (tempat dan nilai angka)",
      "objective": "Menemukan kumpulan yang punya angka tertentu pada ratusan atau puluhan.. Ingat Nilai Tempat. (Nilai Tempat)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga kumpulan dan dua pertanyaan, misalnya angka puluhannya 6. Siswa mengetuk kumpulan yang tepat. Gunakan Nilai Tempat.",
      "voiceGuide": "Nilai Tempat. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "place-of-digit",
      "title": "Tempat Angka dalam Kumpulan",
      "bookReference": "hlm. 22 (nilai tempat angka 8 pada 981, 845, 108, 800, 618)",
      "objective": "Menentukan tempat angka 8 pada sebuah kumpulan benda.. Ingat Nilai Tempat. (Nilai Tempat)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Gambar menampilkan kumpulan, dan siswa memilih apakah angka 8 ada di ratusan, puluhan, atau satuan. Gunakan Nilai Tempat.",
      "voiceGuide": "Nilai Tempat. Mainkan dengan teliti.",
      "emoji": "🔍",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-value",
      "title": "Ketuk Semua Kumpulan yang Cocok",
      "bookReference": "hlm. 21–23 (nilai tempat tiap angka)",
      "objective": "Menemukan semua kumpulan yang punya angka tertentu atau angka nol.. Ingat Nilai Tempat. (Nilai Tempat)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat kumpulan dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. Gunakan Nilai Tempat.",
      "voiceGuide": "Nilai Tempat. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "order-package-value",
      "title": "Urutkan Nilai Kemasan",
      "bookReference": "hlm. 21 (nilai tiap tempat berbeda)",
      "objective": "Mengurutkan kelompok kemasan menurut nilainya.. Ingat Nilai Tempat. (Nilai Tempat)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga kelompok kemasan bertanda huruf. Siswa mengetuk kelompok satu per satu dari yang paling kecil atau paling besar nilainya. Letak jawaban berpindah. Gunakan Nilai Tempat.",
      "voiceGuide": "Nilai Tempat. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 9
    },
    {
      "stage": "Picture",
      "gameType": "block-value-table",
      "title": "Isi Tabel Nilai",
      "bookReference": "hlm. 21–23 (nilai tempat tiap angka)",
      "objective": "Pakai Kartu Angka Montessori: Kartu 1000/100/10/1 menyusun bilangan. Latihan: Mengisi nilai ratusan, puluhan, dan satuan pada tabel dari bilangan..",
      "mechanicDescription": "Tiga tabel dengan tiga baris. Siswa mengetuk sel untuk memutar nilainya (200, 50, 1), lalu menekan Periksa. Saat bermain, ingat Kartu Angka Montessori: Kartu 1000/100/10/1 menyusun bilangan.",
      "voiceGuide": "Kartu Angka Montessori. Kartu 1000/100/10/1 menyusun bilangan.",
      "diagramType": "value-table",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "block-value-choice",
      "title": "Nilai Angka pada Blok",
      "bookReference": "hlm. 21 (angka 2 bernilai 200, angka 5 bernilai 50)",
      "objective": "Pakai Kartu Angka Montessori: Kartu 1000/100/10/1 menyusun bilangan. Latihan: Menentukan nilai sebuah angka dari model blok..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Gambar menampilkan blok, dan siswa memilih nilai angka pada tempat yang ditanya. Saat bermain, ingat Kartu Angka Montessori: Kartu 1000/100/10/1 menyusun bilangan.",
      "voiceGuide": "Kartu Angka Montessori. Kartu 1000/100/10/1 menyusun bilangan.",
      "diagramType": "value-choice",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "compose-sentence",
      "title": "Susun Bilangan",
      "bookReference": "hlm. 21 (2 ratusan + 5 puluhan + 1 satuan = 251)",
      "objective": "Pakai Kartu Angka Montessori: Kartu 1000/100/10/1 menyusun bilangan. Latihan: Menyusun bilangan dari kalimat ratusan, puluhan, dan satuan..",
      "mechanicDescription": "Tiga model, tiap model tiga kalimat penyusunan. Siswa memilih satu dari tiga angka untuk bagian kosong. Saat bermain, ingat Kartu Angka Montessori: Kartu 1000/100/10/1 menyusun bilangan.",
      "voiceGuide": "Kartu Angka Montessori. Kartu 1000/100/10/1 menyusun bilangan.",
      "diagramType": "compose-sentence",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "decompose-sentence",
      "title": "Urai Bilangan",
      "bookReference": "hlm. 21 (602 = 600 + 00 + 2)",
      "objective": "Pakai Kartu Angka Montessori: Kartu 1000/100/10/1 menyusun bilangan. Latihan: Mengurai bilangan menjadi bagian-bagian nilai..",
      "mechanicDescription": "Tiga bilangan, tiap bilangan tiga kalimat uraian, misalnya 372 = 300 + ... + 2. Siswa memilih satu dari tiga angka. Saat bermain, ingat Kartu Angka Montessori: Kartu 1000/100/10/1 menyusun bilangan.",
      "voiceGuide": "Kartu Angka Montessori. Kartu 1000/100/10/1 menyusun bilangan.",
      "diagramType": "decompose-sentence",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "match-block-decomposition",
      "title": "Jodohkan Blok dan Uraian",
      "bookReference": "hlm. 21 (menyusun dan mengurai)",
      "objective": "Menjodohkan model blok dengan uraiannya.. Ingat Kartu Angka Montessori. (Kartu Angka Montessori)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga model dan tiga uraian, misalnya 300 + 40 + 7. Siswa mengetuk model, lalu mengetuk uraian yang cocok. Gunakan Kartu Angka Montessori.",
      "voiceGuide": "Kartu Angka Montessori. Mainkan dengan teliti.",
      "diagramType": "decompose-match",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memory-block-decomposition",
      "title": "Memori Blok dan Uraian",
      "bookReference": "hlm. 21 (menyusun dan mengurai)",
      "objective": "Mencocokkan model blok dengan uraiannya lewat permainan memori.. Ingat Kartu Angka Montessori. (Kartu Angka Montessori)",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): model blok dan uraian. Siswa membalik dua kartu dan mencari pasangannya. Gunakan Kartu Angka Montessori.",
      "voiceGuide": "Kartu Angka Montessori. Mainkan dengan teliti.",
      "diagramType": "decompose-memory",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "board-from-decomposition",
      "title": "Papan dari Uraian",
      "bookReference": "hlm. 21 (menyusun bilangan)",
      "objective": "Menulis bilangan pada papan dari uraiannya.. Ingat Kartu Angka Montessori. (Kartu Angka Montessori)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca uraian seperti 600 + 20 + 1 lalu mengatur tiga angka pada papan dan menekan Periksa. Gunakan Kartu Angka Montessori.",
      "voiceGuide": "Kartu Angka Montessori. Mainkan dengan teliti.",
      "diagramType": "decompose-board",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "number-line-value",
      "title": "Garis Bilangan: Nilai Angka",
      "bookReference": "hlm. 21–23 (nilai tempat)",
      "objective": "Menemukan nilai sebuah angka pada garis bilangan.. Ingat Kartu Angka Montessori. (Kartu Angka Montessori)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca bilangan seperti 463 dan angka yang ditanya, lalu mengetuk nilainya pada garis bilangan puluhan atau ratusan. Gunakan Kartu Angka Montessori.",
      "voiceGuide": "Kartu Angka Montessori. Mainkan dengan teliti.",
      "diagramType": "number-line",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sort-value-cards",
      "title": "Pilah Nilai",
      "bookReference": "hlm. 21 (nilai ratusan, puluhan, satuan)",
      "objective": "Memilah kartu nilai menjadi nilai ratusan, puluhan, dan satuan.. Ingat Kartu Angka Montessori. (Kartu Angka Montessori)",
      "mechanicDescription": "Tiga ronde, tiap ronde enam kartu nilai (misalnya 300, 60, 5) dan tiga kotak: ratusan, puluhan, satuan. Siswa menyeret atau mengetuk kartu ke kotak yang tepat. Gunakan Kartu Angka Montessori.",
      "voiceGuide": "Kartu Angka Montessori. Mainkan dengan teliti.",
      "diagramType": "value-sort",
      "numberA": 3,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-value-blocks",
      "title": "Ketuk Semua Blok dengan Nilai",
      "bookReference": "hlm. 21–23 (nilai tempat)",
      "objective": "Menemukan semua model blok yang punya nilai tertentu pada sebuah tempat.. Ingat Kartu Angka Montessori. (Kartu Angka Montessori)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat model dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. Gunakan Kartu Angka Montessori.",
      "voiceGuide": "Kartu Angka Montessori. Mainkan dengan teliti.",
      "diagramType": "value-select",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Abstract",
      "gameType": "compose-from-decomposition",
      "title": "Susun Tiga Kartu dari Uraian",
      "bookReference": "hlm. 19–21 (menyusun bilangan dari angka tiap tempat)",
      "objective": "Pakai Bentuk Uraian: 300+40+5 = 345. Latihan: Menyusun tiga kartu angka menjadi bilangan dari ratusan, puluhan, dan satuan..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca bilangan yang diminta lalu mengetuk kartu angka dan tempat. Diperiksa otomatis. Saat bermain, ingat Bentuk Uraian: 300+40+5 = 345.",
      "voiceGuide": "Bentuk Uraian. 300+40+5 = 345.",
      "symbolLarge": "723",
      "wordLarge": "SUSUN KARTU",
      "mathNotation": "ratusan • puluhan • satuan"
    },
    {
      "stage": "Abstract",
      "gameType": "place-of-digit-choice",
      "title": "Tempat Angka 8",
      "bookReference": "hlm. 22 (tentukan nilai tempat dari angka 8)",
      "objective": "Pakai Bentuk Uraian: 300+40+5 = 345. Latihan: Menentukan tempat angka 8 pada bilangan 981, 845, 108, 800, dan 618..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa memilih apakah angka 8 menempati ratusan, puluhan, atau satuan. Saat bermain, ingat Bentuk Uraian: 300+40+5 = 345.",
      "voiceGuide": "Bentuk Uraian. 300+40+5 = 345.",
      "symbolLarge": "981",
      "wordLarge": "TEMPAT ANGKA",
      "mathNotation": "ratusan • puluhan • satuan"
    },
    {
      "stage": "Abstract",
      "gameType": "digit-value-choice",
      "title": "Nilai Angka",
      "bookReference": "hlm. 21 (angka 5 menempati puluhan yang bernilai 50)",
      "objective": "Pakai Bentuk Uraian: 300+40+5 = 345. Latihan: Menentukan nilai sebuah angka pada bilangan tiga angka..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa memilih satu dari tiga nilai, misalnya nilai angka 5 pada 251. Saat bermain, ingat Bentuk Uraian: 300+40+5 = 345.",
      "voiceGuide": "Bentuk Uraian. 300+40+5 = 345.",
      "symbolLarge": "50",
      "wordLarge": "NILAI ANGKA",
      "mathNotation": "angka × nilai tempat"
    },
    {
      "stage": "Abstract",
      "gameType": "decompose-words",
      "title": "Urai dengan Kata",
      "bookReference": "hlm. 23–24 (isilah titik-titik: ratusan + puluhan + satuan)",
      "objective": "Pakai Bentuk Uraian: 300+40+5 = 345. Latihan: Melengkapi uraian bilangan dalam bentuk ratusan, puluhan, dan satuan..",
      "mechanicDescription": "Tiga bilangan, tiap bilangan tiga kalimat, misalnya 634 = 6 ratusan + ... puluhan + 4 satuan. Siswa memilih satu dari tiga angka. Saat bermain, ingat Bentuk Uraian: 300+40+5 = 345.",
      "voiceGuide": "Bentuk Uraian. 300+40+5 = 345.",
      "symbolLarge": "6+3+4",
      "wordLarge": "URAI",
      "mathNotation": "ratusan + puluhan + satuan"
    },
    {
      "stage": "Abstract",
      "gameType": "board-from-sum",
      "title": "Tulis Bilangan dari Uraian",
      "bookReference": "hlm. 23–24 (menyusun bilangan)",
      "objective": "Menulis bilangan dari uraian 600 + 80 + 4 pada papan.. Ingat Bentuk Uraian. (Bentuk Uraian)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca uraian lalu mengatur tiga angka pada papan dan menekan Periksa. Gunakan Bentuk Uraian.",
      "voiceGuide": "Bentuk Uraian. Mainkan dengan teliti.",
      "symbolLarge": "684",
      "wordLarge": "SUSUN",
      "mathNotation": "600 + 80 + 4"
    },
    {
      "stage": "Abstract",
      "gameType": "fill-decomposition-table",
      "title": "Isi Tabel Uraian",
      "bookReference": "hlm. 23–24 (lengkapi tabel; 555 = ... ratusan + ... puluhan + ... satuan)",
      "objective": "Melengkapi tabel bilangan dan uraiannya.. Ingat Bentuk Uraian. (Bentuk Uraian)",
      "mechanicDescription": "Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu uraian yang tepat. Ada satu kartu pengecoh. Gunakan Bentuk Uraian.",
      "voiceGuide": "Bentuk Uraian. Mainkan dengan teliti.",
      "symbolLarge": "251",
      "wordLarge": "TABEL",
      "mathNotation": "bilangan • uraian"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-value",
      "title": "Benar atau Salah: Nilai Tempat",
      "bookReference": "hlm. 21–24 (angka dan nilai; kesalahan mengisi tabel)",
      "objective": "Menilai pernyataan tentang nilai tempat, menyusun, dan mengurai bilangan.. Ingat Bentuk Uraian. (Bentuk Uraian)",
      "mechanicDescription": "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan dihitung dari bilangan, dan tiap jawaban diberi penjelasan. Gunakan Bentuk Uraian.",
      "voiceGuide": "Bentuk Uraian. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "periksa dengan alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-place-value",
      "title": "Detektif Nilai Tempat",
      "bookReference": "hlm. 21 (nilai tiap angka)",
      "objective": "Menemukan bilangan dari dua petunjuk tentang nilai angkanya.. Ingat Bentuk Uraian. (Bentuk Uraian)",
      "mechanicDescription": "Empat soal. Siswa membaca petunjuk seperti angka 5 bernilai 50 dan ratusanku 3, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok. Gunakan Bentuk Uraian.",
      "voiceGuide": "Bentuk Uraian. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "dua petunjuk, satu jawaban"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-map-value",
      "title": "Peta Konsep Nilai Tempat",
      "bookReference": "hlm. 2 (peta konsep: nilai tempat bilangan)",
      "objective": "Melengkapi peta konsep nilai tempat dan cara mengurai bilangan.. Ingat Bentuk Uraian. (Bentuk Uraian)",
      "mechanicDescription": "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. Gunakan Bentuk Uraian.",
      "voiceGuide": "Bentuk Uraian. Mainkan dengan teliti.",
      "symbolLarge": "⇄",
      "wordLarge": "PETA KONSEP",
      "mathNotation": "tempat • nilai • uraian"
    },
    {
      "stage": "Abstract",
      "gameType": "build-value-sentence",
      "title": "Susun Kata Nilai Tempat",
      "bookReference": "hlm. 21 (angka 2 menempati nilai tempat ratusan yang bernilai 200)",
      "objective": "Menyusun kata menjadi kalimat tentang nilai tempat.. Ingat Bentuk Uraian. (Bentuk Uraian)",
      "mechanicDescription": "Empat kalimat, misalnya angka 2 menempati ratusan bernilai 200. Kartu kata diketuk berurutan. Satu kartu pengecoh tidak dipakai. Gunakan Bentuk Uraian.",
      "voiceGuide": "Bentuk Uraian. Mainkan dengan teliti.",
      "symbolLarge": "Aa",
      "wordLarge": "SUSUN KATA",
      "mathNotation": "kata • kalimat • nilai"
    }
  ],
  "poin": [
    {
      "ikon": "📍",
      "nama": "Angka punya tempat",
      "isi": "ratusan, puluhan, satuan",
      "suara": "Setiap angka pada bilangan tiga angka menempati satu tempat, yaitu ratusan, puluhan, atau satuan."
    },
    {
      "ikon": "🌍",
      "nama": "Nilai Tempat",
      "isi": "Nilai digit bergantung tempatnya.",
      "suara": "Nilai Tempat. Nilai digit bergantung tempatnya."
    },
    {
      "ikon": "🌍",
      "nama": "Kartu Angka Montessori",
      "isi": "Kartu 1000/100/10/1 menyusun bilangan.",
      "suara": "Kartu Angka Montessori. Kartu 1000/100/10/1 menyusun bilangan."
    },
    {
      "ikon": "🌍",
      "nama": "Bentuk Uraian",
      "isi": "300+40+5 = 345.",
      "suara": "Bentuk Uraian. 300+40+5 = 345."
    }
  ],
  "poinSuara": "Ingat: Nilai Tempat, Kartu Angka Montessori, Bentuk Uraian.",
  "cara": {
    "suara": "Cara menyebutkan nilai. Lihat tempat angkanya. Kalikan angka dengan seratus, sepuluh, atau satu. Lalu sebutkan nilainya.",
    "potongan": [
      {
        "teks": "lihat tempat",
        "warna": "#BAE6FD"
      },
      {
        "teks": "kalikan",
        "warna": "#FDE68A"
      },
      {
        "teks": "sebut nilai",
        "warna": "#7FCB96"
      },
      {
        "teks": "cek jumlah",
        "warna": "#FECACA"
      }
    ]
  },
  "rumah": "Ayo Mencoba: terapkan Nilai Tempat pada satu soal nyata di rumah.",
  "refleksi": [
    "Bagaimana Nilai Tempat membantumu?",
    "Kapan memakai Kartu Angka Montessori?",
    "Apa bedanya dengan hanya menghafal tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Place Value",
      "namaId": "Nilai Tempat",
      "asal": "Van de Walle",
      "ringkas": "Nilai digit bergantung tempatnya.",
      "tahap": [
        "Story",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Montessori Cards",
      "namaId": "Kartu Angka Montessori",
      "asal": "Montessori",
      "ringkas": "Kartu 1000/100/10/1 menyusun bilangan.",
      "tahap": [
        "Picture",
        "Concrete"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Expanded Form",
      "namaId": "Bentuk Uraian",
      "asal": "Van de Walle",
      "ringkas": "300+40+5 = 345.",
      "tahap": [
        "Mind",
        "Abstract"
      ]
    }
  ]
};

export const SUB_C31: SubBabNaskah = {
  "id": "C",
  "codeTitle": "Sub-Bab C (Membandingkan dan Mengurutkan)",
  "fullTitle": "Sub-Bab C: Membandingkan dan Mengurutkan Bilangan Cacah sampai 1.000",
  "targetDescription": "Siswa membandingkan dua bilangan cacah tiga angka dengan nilai tempat (mulai dari ratusan, lalu puluhan, lalu satuan), menulis hasilnya dengan tanda <, >, atau =, membandingkan tiga bilangan, serta mengurutkan beberapa bilangan dari terkecil ke terbesar dan dari terbesar ke terkecil. Siswa memakai cara Banding per Tempat, Garis Bilangan Ratusan, Mengurutkan. Siswa memakai cara Banding per Tempat, Garis Bilangan Ratusan, Mengurutkan.",
  "secondaryBg": "#FEF3C7",
  "secondaryBorder": "#D97706",
  "secondaryText": "#78350F",
  "silabus": {
    "teksSuara": "Kita belajar membandingkan dan mengurutkan bilangan cacah sampai seribu. Alen dan Galih berjalan ke sekolah dengan jarak yang berbeda, Alfa, Galih, dan Andi menghitung kelereng mereka, dan kita menyusun bilangan dari yang terkecil sampai yang terbesar. Kita memakai nilai tempat: mulai dari ratusan, lalu puluhan, lalu satuan. Kita menulis hasilnya dengan tanda kurang dari, lebih dari, dan sama dengan. Kita memakai cara: Banding per Tempat, Garis Bilangan Ratusan, Mengurutkan. Mulai dari ratusan. Posisi menentukan besar-kecil. Urut naik/turun dengan banding berulang. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa membaca, menulis, dan membandingkan bilangan cacah sampai 1.000. Pada sub-bab ini siswa membandingkan dua bilangan dengan nilai tempat serta mengurutkan beberapa bilangan.",
    "referensi": "Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 1 Sub-Bab C)."
  },
  "videos": [
    {
      "id": "K3B1C-V1",
      "judul": "Jarak ke Sekolah",
      "subjudul": "Compare Placewise",
      "adegan": [
        {
          "id": "K3B1C-V1-1",
          "judul": "Rumah siapa lebih jauh",
          "ketukan": [
            "Bayangkan kamu sedang mempelajari Membandingkan dan Mengurutkan Bilangan Cacah sampai 1.000. Jarak rumah Alen ke sekolah adalah 339 meter.",
            "Jarak rumah Galih ke sekolah adalah 421 meter.",
            "Kita ingin tahu, rumah siapa yang lebih jauh dari sekolah.",
            "Ingat cara Banding per Tempat: Mulai dari ratusan. Ingat cara Banding per Tempat: Mulai dari ratusan."
          ],
          "papan": [
            "Alen: 339 meter",
            "Galih: 421 meter",
            "Siapa lebih jauh?",
            "Bandingkan bilangan"
          ]
        },
        {
          "id": "K3B1C-V1-2",
          "judul": "Bandingkan ratusan",
          "ketukan": [
            "Kita taruh 339 dan 421 pada papan nilai tempat.",
            "Mulai dari tempat ratusan. Bilangan 339 punya 3 ratusan, bilangan 421 punya 4 ratusan.",
            "Tiga ratus kurang dari empat ratus, jadi 339 kurang dari 421.",
            "Di sini kita memakai ide Compare Placewise — Mulai dari ratusan. Di sini kita memakai Compare Placewise. Mulai dari ratusan."
          ],
          "papan": [
            "Dua papan nilai tempat",
            "3 ratusan, 4 ratusan",
            "300 kurang dari 400",
            "339 < 421"
          ]
        },
        {
          "id": "K3B1C-V1-3",
          "judul": "Lebih dari",
          "ketukan": [
            "Sekarang bandingkan 583 dan 529. Ratusannya sama, yaitu 5.",
            "Karena ratusan sama, kita lihat tempat puluhan.",
            "Bilangan 583 punya 8 puluhan, bilangan 529 punya 2 puluhan.",
            "METODE LUAR · Banding per Tempat: Mulai dari ratusan."
          ],
          "papan": [
            "583 dan 529",
            "Ratusan sama",
            "8 puluhan, 2 puluhan",
            "583 > 529"
          ]
        }
      ]
    },
    {
      "id": "K3B1C-V2",
      "judul": "Latihan: Garis Bilangan Ratusan",
      "subjudul": "Number Line",
      "adegan": [
        {
          "id": "K3B1C-V2-1",
          "judul": "Satuan yang menentukan",
          "ketukan": [
            "Bandingkan 769 dan 761.",
            "Ratusan sama, yaitu 7. Puluhan juga sama, yaitu 6.",
            "Jadi kita lihat satuannya. Sembilan lebih dari satu.",
            "Ingat cara Garis Bilangan Ratusan: Posisi menentukan besar-kecil. Ingat cara Garis Bilangan Ratusan: Posisi menentukan besar-kecil."
          ],
          "papan": [
            "769 dan 761",
            "Ratusan dan puluhan sama",
            "Lihat satuan",
            "769 > 761"
          ]
        },
        {
          "id": "K3B1C-V2-2",
          "judul": "Bilangan yang sama",
          "ketukan": [
            "Perhatikan 804 dan 804.",
            "Ratusan sama, yaitu 8. Puluhan sama, yaitu 0.",
            "Satuan juga sama, yaitu 4.",
            "Di sini kita memakai ide Number Line — Posisi menentukan besar-kecil. Di sini kita memakai Number Line. Posisi menentukan besar-kecil."
          ],
          "papan": [
            "804 dan 804",
            "Ratusan 8, puluhan 0",
            "Satuan 4",
            "804 = 804"
          ]
        },
        {
          "id": "K3B1C-V2-3",
          "judul": "Tiga langkah membandingkan",
          "ketukan": [
            "Ada tiga langkah membandingkan dua bilangan tiga angka.",
            "Langkah pertama, bandingkan ratusan. Bila berbeda, selesai.",
            "Langkah kedua, bila ratusan sama, bandingkan puluhan.",
            "METODE LUAR · Garis Bilangan Ratusan: Posisi menentukan besar-kecil."
          ],
          "papan": [
            "Tiga langkah",
            "1. Ratusan",
            "2. Puluhan",
            "3. Satuan"
          ]
        }
      ]
    },
    {
      "id": "K3B1C-V3",
      "judul": "Siap pakai Ordering",
      "subjudul": "Ordering",
      "adegan": [
        {
          "id": "K3B1C-V3-1",
          "judul": "Kelereng tiga sahabat",
          "ketukan": [
            "Alfa memiliki 138 kelereng, Galih memiliki 103 kelereng, dan Andi memiliki 183 kelereng.",
            "Ketiganya punya satu ratusan. Kita lihat puluhannya: 3, 0, dan 8.",
            "Galih paling sedikit, lalu Alfa, lalu Andi.",
            "Ingat cara Mengurutkan: Urut naik/turun dengan banding berulang. Ingat cara Mengurutkan: Urut naik/turun dengan banding berulang."
          ],
          "papan": [
            "138, 103, 183",
            "Ratusan sama",
            "Galih, Alfa, Andi",
            "103, 138, 183"
          ]
        },
        {
          "id": "K3B1C-V3-2",
          "judul": "Tiga bilangan",
          "ketukan": [
            "Bagaimana mengurutkan 720, 639, dan 709 dari yang terkecil.",
            "Bilangan 639 punya 6 ratusan, paling sedikit. Jadi 639 paling kecil.",
            "Bilangan 709 dan 720 sama-sama 7 ratusan. Puluhan 0 kurang dari 2.",
            "Di sini kita memakai ide Ordering — Urut naik/turun dengan banding berulang. Di sini kita memakai Ordering. Urut naik/turun dengan banding berulang."
          ],
          "papan": [
            "720, 639, 709",
            "639 paling kecil",
            "709 < 720",
            "639, 709, 720"
          ]
        },
        {
          "id": "K3B1C-V3-3",
          "judul": "Dua arah urutan",
          "ketukan": [
            "Urutan dari terkecil ke terbesar kita sebut urutan naik.",
            "Contohnya 639, 709, 720.",
            "Urutan dari terbesar ke terkecil kita sebut urutan turun.",
            "METODE LUAR · Mengurutkan: Urut naik/turun dengan banding berulang."
          ],
          "papan": [
            "Dua arah urutan",
            "Naik: 639, 709, 720",
            "Turun: dari terbesar",
            "720, 709, 639"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Apa yang ditanyakan pada Membandingkan dan Mengurutkan Bilangan Cacah sampai 1.000?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Compare Placewise",
      "stepDesc": "Mulai dari ratusan.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Number Line",
      "stepDesc": "Posisi menentukan besar-kecil.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Ordering",
      "stepDesc": "Urut naik/turun dengan banding berulang.",
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
      "judul": "Lebih, Kurang, Sama",
      "emoji": "⚖️",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Dua bilangan bisa saling dibandingkan. Yang satu bisa lebih dari, kurang dari, atau sama dengan yang lain."
    },
    {
      "judul": "Ratusan Dulu",
      "emoji": "💯",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Kita mulai membandingkan dari tempat ratusan. Bila ratusannya berbeda, bilangan dengan ratusan lebih besar adalah yang lebih besar."
    },
    {
      "judul": "Lalu Puluhan",
      "emoji": "🔟",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Bila ratusannya sama, kita bandingkan puluhan. Lima ratus delapan puluh tiga lebih dari lima ratus dua puluh sembilan."
    },
    {
      "judul": "Terakhir Satuan",
      "emoji": "1️⃣",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Bila ratusan dan puluhan sama, kita bandingkan satuan. Tujuh ratus enam puluh sembilan lebih dari tujuh ratus enam puluh satu."
    },
    {
      "judul": "Tiga Tanda",
      "emoji": "🐊",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Tanda kurang dari, lebih dari, dan sama dengan. Mulut tanda terbuka ke arah bilangan yang lebih besar."
    },
    {
      "judul": "Bilangan yang Sama",
      "emoji": "🤝",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Delapan ratus empat dan delapan ratus empat sama pada semua tempat, jadi keduanya sama dengan."
    },
    {
      "judul": "Tiga Bilangan",
      "emoji": "🔺",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Tiga bilangan dibandingkan dengan cara yang sama. Enam ratus tiga puluh sembilan paling kecil, lalu tujuh ratus sembilan, lalu tujuh ratus dua puluh."
    },
    {
      "judul": "Urutan Naik",
      "emoji": "📈",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Urutan naik dari yang terkecil ke terbesar, misalnya 639, 709, 720."
    },
    {
      "judul": "Urutan Turun",
      "emoji": "📉",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Urutan turun dari yang terbesar ke terkecil, misalnya 720, 709, 639."
    },
    {
      "judul": "Cara Membandingkan",
      "emoji": "📝",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Empat langkah. Satu, tulis bilangan pada papan nilai tempat. Dua, bandingkan ratusan. Tiga, bila sama, bandingkan puluhan lalu satuan. Empat, tulis hasilnya dengan tanda."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "compare-collections",
      "title": "Bandingkan Kumpulan",
      "bookReference": "hlm. 24–25 (jarak rumah Alen dan Galih ke sekolah)",
      "objective": "Pakai Banding per Tempat: Mulai dari ratusan. Latihan: Menentukan kumpulan benda mana yang lebih banyak, atau apakah sama banyak..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Dua kumpulan dus, bungkus, dan benda lepas ditampilkan berdampingan. Siswa memilih satu dari tiga jawaban: A lebih banyak, B lebih banyak, atau sama banyak. Saat bermain, ingat Banding per Tempat: Mulai dari ratusan.",
      "voiceGuide": "Banding per Tempat. Mulai dari ratusan.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sign-collections",
      "title": "Tanda untuk Kumpulan",
      "bookReference": "hlm. 26–28 (simbol <, >, dan =)",
      "objective": "Pakai Banding per Tempat: Mulai dari ratusan. Latihan: Memilih kata dan tanda yang tepat untuk dua kumpulan benda..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Dua kumpulan ditampilkan, lalu siswa memilih lebih dari (>), kurang dari (<), atau sama dengan (=) untuk Kumpulan A terhadap Kumpulan B. Saat bermain, ingat Banding per Tempat: Mulai dari ratusan.",
      "voiceGuide": "Banding per Tempat. Mulai dari ratusan.",
      "emoji": "🐊",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-collections",
      "title": "Urutkan Kumpulan",
      "bookReference": "hlm. 29–31 (mengurutkan dari terkecil ke terbesar dan sebaliknya)",
      "objective": "Pakai Banding per Tempat: Mulai dari ratusan. Latihan: Mengurutkan empat kumpulan benda dari paling sedikit atau paling banyak..",
      "mechanicDescription": "Tiga ronde, tiap ronde empat kumpulan. Siswa mengetuk kumpulan satu per satu menurut urutan banyaknya. Letak jawaban berpindah. Saat bermain, ingat Banding per Tempat: Mulai dari ratusan.",
      "voiceGuide": "Banding per Tempat. Mulai dari ratusan.",
      "emoji": "📶",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "most-least-collection",
      "title": "Paling Banyak, Paling Sedikit",
      "bookReference": "hlm. 33 (kelereng Alfa, Galih, dan Andi)",
      "objective": "Pakai Banding per Tempat: Mulai dari ratusan. Latihan: Menemukan kumpulan yang paling banyak dan paling sedikit..",
      "mechanicDescription": "Tiga ronde, tiap ronde empat kumpulan dan dua pertanyaan: paling banyak, lalu paling sedikit. Siswa mengetuk kumpulannya. Saat bermain, ingat Banding per Tempat: Mulai dari ratusan.",
      "voiceGuide": "Banding per Tempat. Mulai dari ratusan.",
      "emoji": "🏆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "match-collection-sign",
      "title": "Jodohkan Pasangan dan Tanda",
      "bookReference": "hlm. 26–28 (339 < 421, 583 > 529, 804 = 804)",
      "objective": "Menjodohkan pasangan dua kumpulan dengan tanda yang menghubungkannya.. Ingat Banding per Tempat. (Banding per Tempat)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga pasangan kumpulan dan tiga tanda (>, <, =). Siswa mengetuk pasangan, lalu mengetuk tanda yang cocok. Gunakan Banding per Tempat.",
      "voiceGuide": "Banding per Tempat. Mainkan dengan teliti.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "slot-collection-order",
      "title": "Taruh di Urutan",
      "bookReference": "hlm. 30–31 (urutan 639, 709, 720)",
      "objective": "Menaruh tiga kumpulan pada tempat terkecil, tengah, dan terbesar.. Ingat Banding per Tempat. (Banding per Tempat)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga kumpulan dan tiga tempat: terkecil, tengah, terbesar. Siswa mengetuk kumpulan, lalu mengetuk tempatnya. Gunakan Banding per Tempat.",
      "voiceGuide": "Banding per Tempat. Mainkan dengan teliti.",
      "emoji": "📥",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-more-collection",
      "title": "Ketuk Semua yang Lebih atau Kurang",
      "bookReference": "hlm. 25–28 (membandingkan dengan sebuah bilangan)",
      "objective": "Menemukan semua kumpulan yang lebih banyak atau kurang dari kumpulan acuan.. Ingat Banding per Tempat. (Banding per Tempat)",
      "mechanicDescription": "Tiga ronde, tiap ronde satu kumpulan acuan, empat kumpulan lain, dan satu perintah lebih atau kurang. Siswa mengetuk semua yang cocok, lalu menekan Periksa. Gunakan Banding per Tempat.",
      "voiceGuide": "Banding per Tempat. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "same-hundreds-collection",
      "title": "Ratusan Sama, Lihat Berikutnya",
      "bookReference": "hlm. 27–28 (583 dan 529; 769 dan 761)",
      "objective": "Membandingkan dua kumpulan yang jumlah dusnya sama dengan melihat bungkus lalu benda lepas.. Ingat Banding per Tempat. (Banding per Tempat)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Kedua kumpulan punya dus yang sama banyak, jadi siswa memilih mana yang lebih banyak dengan melihat bungkus atau benda lepas. Gunakan Banding per Tempat.",
      "voiceGuide": "Banding per Tempat. Mainkan dengan teliti.",
      "emoji": "🔍",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "between-collection",
      "title": "Di Antara Dua Kumpulan",
      "bookReference": "hlm. 30–31 (639 kurang dari 709 kurang dari 720)",
      "objective": "Menemukan kumpulan yang jumlahnya di antara dua kumpulan batas.. Ingat Banding per Tempat. (Banding per Tempat)",
      "mechanicDescription": "Tiga ronde. Dua kumpulan batas ditampilkan, lalu siswa mengetuk satu dari tiga kumpulan yang jumlahnya di antara keduanya. Gunakan Banding per Tempat.",
      "voiceGuide": "Banding per Tempat. Mainkan dengan teliti.",
      "emoji": "↔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-marbles",
      "title": "Cerita Kelereng dan Kue",
      "bookReference": "hlm. 33–34 (kelereng Alfa, Galih, Andi; jarak rumah ke sekolah)",
      "objective": "Menentukan siapa yang punya paling banyak dan paling sedikit dari cerita tiga anak.. Ingat Banding per Tempat. (Banding per Tempat)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Tiga anak dengan banyak benda masing-masing. Siswa memilih nama anak yang paling banyak atau paling sedikit. Gunakan Banding per Tempat.",
      "voiceGuide": "Banding per Tempat. Mainkan dengan teliti.",
      "emoji": "🧒",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "compare-blocks",
      "title": "Bandingkan Blok",
      "bookReference": "hlm. 25–26 (membandingkan dengan nilai tempat)",
      "objective": "Pakai Garis Bilangan Ratusan: Posisi menentukan besar-kecil. Latihan: Menentukan model blok mana yang lebih banyak atau apakah sama..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Dua model blok ditampilkan, lalu siswa memilih A lebih banyak, B lebih banyak, atau sama banyak. Saat bermain, ingat Garis Bilangan Ratusan: Posisi menentukan besar-kecil.",
      "voiceGuide": "Garis Bilangan Ratusan. Posisi menentukan besar-kecil.",
      "diagramType": "blocks-compare",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sign-blocks",
      "title": "Tanda untuk Blok",
      "bookReference": "hlm. 26–28 (simbol <, >, dan =)",
      "objective": "Pakai Garis Bilangan Ratusan: Posisi menentukan besar-kecil. Latihan: Memilih tanda yang tepat untuk dua model blok..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa memilih lebih dari (>), kurang dari (<), atau sama dengan (=) untuk Model A terhadap Model B. Saat bermain, ingat Garis Bilangan Ratusan: Posisi menentukan besar-kecil.",
      "voiceGuide": "Garis Bilangan Ratusan. Posisi menentukan besar-kecil.",
      "diagramType": "blocks-sign",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sign-table",
      "title": "Isi Tabel Tanda",
      "bookReference": "hlm. 32 (isilah titik-titik dengan tanda >, <, atau =)",
      "objective": "Pakai Garis Bilangan Ratusan: Posisi menentukan besar-kecil. Latihan: Mengisi tanda perbandingan pada tabel pasangan bilangan..",
      "mechanicDescription": "Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu tanda yang tepat. Saat bermain, ingat Garis Bilangan Ratusan: Posisi menentukan besar-kecil.",
      "voiceGuide": "Garis Bilangan Ratusan. Posisi menentukan besar-kecil.",
      "diagramType": "sign-table",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "order-blocks",
      "title": "Urutkan Blok",
      "bookReference": "hlm. 30–31 (urutan 639, 709, 720)",
      "objective": "Pakai Garis Bilangan Ratusan: Posisi menentukan besar-kecil. Latihan: Mengurutkan model blok dari terkecil atau terbesar..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga atau empat model. Siswa mengetuk model satu per satu menurut urutan banyaknya. Letak jawaban berpindah. Saat bermain, ingat Garis Bilangan Ratusan: Posisi menentukan besar-kecil.",
      "voiceGuide": "Garis Bilangan Ratusan. Posisi menentukan besar-kecil.",
      "diagramType": "blocks-order",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "match-blocks-sign",
      "title": "Jodohkan Pasangan Blok dan Tanda",
      "bookReference": "hlm. 26–28 (339 < 421, 583 > 529, 804 = 804)",
      "objective": "Menjodohkan pasangan model dengan tanda yang menghubungkannya.. Ingat Garis Bilangan Ratusan. (Garis Bilangan Ratusan)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga pasangan model dan tiga tanda. Siswa mengetuk pasangan, lalu mengetuk tanda yang cocok. Gunakan Garis Bilangan Ratusan.",
      "voiceGuide": "Garis Bilangan Ratusan. Mainkan dengan teliti.",
      "diagramType": "blocks-sign-match",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "most-least-blocks",
      "title": "Paling Banyak, Paling Sedikit pada Blok",
      "bookReference": "hlm. 33–34 (paling sedikit dan paling banyak)",
      "objective": "Menemukan model blok yang paling banyak dan paling sedikit.. Ingat Garis Bilangan Ratusan. (Garis Bilangan Ratusan)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat model dan dua pertanyaan. Siswa mengetuk modelnya. Gunakan Garis Bilangan Ratusan.",
      "voiceGuide": "Garis Bilangan Ratusan. Mainkan dengan teliti.",
      "diagramType": "blocks-most-least",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-more-blocks",
      "title": "Ketuk Semua Blok yang Lebih atau Kurang",
      "bookReference": "hlm. 25–28 (membandingkan dengan sebuah bilangan)",
      "objective": "Menemukan semua model yang lebih besar atau kurang dari sebuah bilangan acuan.. Ingat Garis Bilangan Ratusan. (Garis Bilangan Ratusan)",
      "mechanicDescription": "Tiga ronde, tiap ronde satu perintah dengan bilangan acuan dan empat model. Siswa mengetuk semua yang cocok, lalu menekan Periksa. Gunakan Garis Bilangan Ratusan.",
      "voiceGuide": "Garis Bilangan Ratusan. Mainkan dengan teliti.",
      "diagramType": "blocks-select",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-hundreds-blocks",
      "title": "Pilah Blok: Ratusan Kecil atau Besar",
      "bookReference": "hlm. 25–26 (bandingkan ratusan lebih dulu)",
      "objective": "Memilah model menurut angka ratusannya, kurang dari 5 atau 5 atau lebih.. Ingat Garis Bilangan Ratusan. (Garis Bilangan Ratusan)",
      "mechanicDescription": "Tiga ronde, tiap ronde enam model dan dua kotak. Siswa menyeret atau mengetuk model ke kotak yang tepat. Gunakan Garis Bilangan Ratusan.",
      "voiceGuide": "Garis Bilangan Ratusan. Mainkan dengan teliti.",
      "diagramType": "blocks-sort",
      "numberA": 3,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "complete-compare-sentence",
      "title": "Lengkapi Kalimat Perbandingan",
      "bookReference": "hlm. 25–26 (Bilangan 339 memiliki ratusan kurang dari 421)",
      "objective": "Melengkapi kalimat tentang ratusan dua bilangan dan hasil perbandingannya.. Ingat Garis Bilangan Ratusan. (Garis Bilangan Ratusan)",
      "mechanicDescription": "Tiga pasang model, tiap pasang tiga kalimat. Siswa memilih satu dari tiga pilihan untuk bagian kosong, termasuk kata lebih dari, kurang dari, atau sama dengan. Gunakan Garis Bilangan Ratusan.",
      "voiceGuide": "Garis Bilangan Ratusan. Mainkan dengan teliti.",
      "diagramType": "compare-sentence",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "slot-blocks-order",
      "title": "Taruh Blok di Urutan",
      "bookReference": "hlm. 30–31 (urutan naik)",
      "objective": "Menaruh tiga model pada tempat terkecil, tengah, dan terbesar.. Ingat Garis Bilangan Ratusan. (Garis Bilangan Ratusan)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga model dan tiga tempat. Siswa mengetuk model, lalu mengetuk tempatnya. Gunakan Garis Bilangan Ratusan.",
      "voiceGuide": "Garis Bilangan Ratusan. Mainkan dengan teliti.",
      "diagramType": "blocks-slot",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Abstract",
      "gameType": "compare-numerals",
      "title": "Bandingkan Lambang",
      "bookReference": "hlm. 32 (isilah titik-titik dengan tanda >, <, atau =)",
      "objective": "Pakai Mengurutkan: Urut naik/turun dengan banding berulang. Latihan: Memilih tanda yang tepat untuk dua lambang bilangan..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal (378 dan 345, 189 dan 206, dan seterusnya). Siswa memilih lebih dari, kurang dari, atau sama dengan. Saat bermain, ingat Mengurutkan: Urut naik/turun dengan banding berulang.",
      "voiceGuide": "Mengurutkan. Urut naik/turun dengan banding berulang.",
      "symbolLarge": "378 ○ 345",
      "wordLarge": "BANDINGKAN",
      "mathNotation": "> • < • ="
    },
    {
      "stage": "Abstract",
      "gameType": "fill-sign-table-abstract",
      "title": "Isi Tabel Perbandingan",
      "bookReference": "hlm. 33 (urutkan 537, 590, 518, dan 601)",
      "objective": "Pakai Mengurutkan: Urut naik/turun dengan banding berulang. Latihan: Melengkapi tabel perbandingan dua bilangan dengan tanda yang tepat..",
      "mechanicDescription": "Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu tanda yang tepat. Saat bermain, ingat Mengurutkan: Urut naik/turun dengan banding berulang.",
      "voiceGuide": "Mengurutkan. Urut naik/turun dengan banding berulang.",
      "symbolLarge": "537 ○ 590",
      "wordLarge": "TABEL",
      "mathNotation": "bilangan • tanda"
    },
    {
      "stage": "Abstract",
      "gameType": "deciding-place",
      "title": "Tempat yang Menentukan",
      "bookReference": "hlm. 25–28 (bandingkan ratusan; lalu puluhan; lalu satuan)",
      "objective": "Pakai Mengurutkan: Urut naik/turun dengan banding berulang. Latihan: Menentukan tempat pertama yang berbeda pada dua bilangan..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa memilih tempat yang menentukan hasil perbandingan: ratusan, puluhan, satuan, atau tidak ada karena sama. Saat bermain, ingat Mengurutkan: Urut naik/turun dengan banding berulang.",
      "voiceGuide": "Mengurutkan. Urut naik/turun dengan banding berulang.",
      "symbolLarge": "583 • 529",
      "wordLarge": "TEMPAT",
      "mathNotation": "ratusan • puluhan • satuan"
    },
    {
      "stage": "Abstract",
      "gameType": "order-numerals",
      "title": "Urutkan Lambang",
      "bookReference": "hlm. 33 (urutkan 537, 590, 518, dan 601; 325, 235, 532, 352)",
      "objective": "Pakai Mengurutkan: Urut naik/turun dengan banding berulang. Latihan: Mengurutkan empat bilangan dari terkecil atau terbesar..",
      "mechanicDescription": "Tiga ronde, tiap ronde empat bilangan. Siswa mengetuk bilangan satu per satu menurut urutan. Letak jawaban berpindah. Saat bermain, ingat Mengurutkan: Urut naik/turun dengan banding berulang.",
      "voiceGuide": "Mengurutkan. Urut naik/turun dengan banding berulang.",
      "symbolLarge": "↑",
      "wordLarge": "URUTKAN",
      "mathNotation": "terkecil • terbesar"
    },
    {
      "stage": "Abstract",
      "gameType": "match-pair-word",
      "title": "Jodohkan Pasangan dan Kata",
      "bookReference": "hlm. 26–28 (dibaca kurang dari, lebih dari, sama dengan)",
      "objective": "Menjodohkan pasangan bilangan dengan kata yang menghubungkannya.. Ingat Mengurutkan. (Mengurutkan)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga pasangan bilangan dan tiga kata (lebih dari, kurang dari, sama dengan). Siswa mengetuk pasangan, lalu mengetuk kata yang cocok. Gunakan Mengurutkan.",
      "voiceGuide": "Mengurutkan. Mainkan dengan teliti.",
      "symbolLarge": "769 ? 761",
      "wordLarge": "JODOHKAN",
      "mathNotation": "pasangan • kata"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-compare",
      "title": "Benar atau Salah: Perbandingan",
      "bookReference": "hlm. 24–34 (membandingkan dan mengurutkan)",
      "objective": "Menilai pernyataan tentang membandingkan, tanda, dan urutan bilangan.. Ingat Mengurutkan. (Mengurutkan)",
      "mechanicDescription": "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan dihitung dari bilangan, dan tiap jawaban diberi penjelasan. Gunakan Mengurutkan.",
      "voiceGuide": "Mengurutkan. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "periksa dengan alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-compare",
      "title": "Detektif Perbandingan",
      "bookReference": "hlm. 30–31 (bilangan di antara dua bilangan)",
      "objective": "Menemukan bilangan dari petunjuk lebih dari, kurang dari, dan angka tertentu.. Ingat Mengurutkan. (Mengurutkan)",
      "mechanicDescription": "Empat soal. Siswa membaca petunjuk seperti lebih dari 500 dan kurang dari 510, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok. Gunakan Mengurutkan.",
      "voiceGuide": "Mengurutkan. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "dua petunjuk, satu jawaban"
    },
    {
      "stage": "Abstract",
      "gameType": "select-all-compare",
      "title": "Ketuk Semua yang Lebih atau Kurang: Angka",
      "bookReference": "hlm. 25–28 (membandingkan dengan sebuah bilangan)",
      "objective": "Memilih semua bilangan yang lebih besar atau lebih kecil dari bilangan acuan.. Ingat Mengurutkan. (Mengurutkan)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat bilangan dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. Gunakan Mengurutkan.",
      "voiceGuide": "Mengurutkan. Mainkan dengan teliti.",
      "symbolLarge": "✔✔",
      "wordLarge": "SEMUA COCOK",
      "mathNotation": "lebih dari • kurang dari"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-map-compare",
      "title": "Peta Konsep Membandingkan",
      "bookReference": "hlm. 2 (peta konsep: membandingkan dan mengurutkan bilangan)",
      "objective": "Melengkapi peta konsep membandingkan dan mengurutkan bilangan.. Ingat Mengurutkan. (Mengurutkan)",
      "mechanicDescription": "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. Gunakan Mengurutkan.",
      "voiceGuide": "Mengurutkan. Mainkan dengan teliti.",
      "symbolLarge": "⇄",
      "wordLarge": "PETA KONSEP",
      "mathNotation": "bandingkan • urutkan"
    },
    {
      "stage": "Abstract",
      "gameType": "build-compare-sentence",
      "title": "Susun Kata Perbandingan",
      "bookReference": "hlm. 26–28 (339 < 421 dibaca kurang dari)",
      "objective": "Menyusun kata menjadi kalimat tentang membandingkan bilangan.. Ingat Mengurutkan. (Mengurutkan)",
      "mechanicDescription": "Empat kalimat, misalnya 339 kurang dari 421 ditulis 339 < 421. Kartu kata diketuk berurutan. Satu kartu pengecoh tidak dipakai. Gunakan Mengurutkan.",
      "voiceGuide": "Mengurutkan. Mainkan dengan teliti.",
      "symbolLarge": "Aa",
      "wordLarge": "SUSUN KATA",
      "mathNotation": "kata • kalimat • tanda"
    }
  ],
  "poin": [
    {
      "ikon": "💯",
      "nama": "Mulai dari ratusan",
      "isi": "bandingkan ratusan, lalu puluhan, lalu satuan",
      "suara": "Kita membandingkan bilangan tiga angka mulai dari ratusan. Bila sama, lanjut ke puluhan, lalu satuan."
    },
    {
      "ikon": "🌍",
      "nama": "Banding per Tempat",
      "isi": "Mulai dari ratusan.",
      "suara": "Banding per Tempat. Mulai dari ratusan."
    },
    {
      "ikon": "🌍",
      "nama": "Garis Bilangan Ratusan",
      "isi": "Posisi menentukan besar-kecil.",
      "suara": "Garis Bilangan Ratusan. Posisi menentukan besar-kecil."
    },
    {
      "ikon": "🌍",
      "nama": "Mengurutkan",
      "isi": "Urut naik/turun dengan banding berulang.",
      "suara": "Mengurutkan. Urut naik/turun dengan banding berulang."
    }
  ],
  "poinSuara": "Ingat: Banding per Tempat, Garis Bilangan Ratusan, Mengurutkan.",
  "cara": {
    "suara": "Cara membandingkan. Lihat ratusan dulu. Bila sama, lihat puluhan. Bila sama lagi, lihat satuan. Lalu tulis tandanya.",
    "potongan": [
      {
        "teks": "ratusan dulu",
        "warna": "#BBF7D0"
      },
      {
        "teks": "lalu puluhan",
        "warna": "#BFDBFE"
      },
      {
        "teks": "lalu satuan",
        "warna": "#FECACA"
      },
      {
        "teks": "tulis tanda",
        "warna": "#FDE68A"
      }
    ]
  },
  "rumah": "Ayo Mencoba: terapkan Banding per Tempat pada satu soal nyata di rumah.",
  "refleksi": [
    "Bagaimana Banding per Tempat membantumu?",
    "Kapan memakai Garis Bilangan Ratusan?",
    "Apa bedanya dengan hanya menghafal tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Compare Placewise",
      "namaId": "Banding per Tempat",
      "asal": "Van de Walle",
      "ringkas": "Mulai dari ratusan.",
      "tahap": [
        "Story",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Number Line",
      "namaId": "Garis Bilangan Ratusan",
      "asal": "Number line",
      "ringkas": "Posisi menentukan besar-kecil.",
      "tahap": [
        "Picture",
        "Mind"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Ordering",
      "namaId": "Mengurutkan",
      "asal": "Number sense",
      "ringkas": "Urut naik/turun dengan banding berulang.",
      "tahap": [
        "Infografis",
        "Abstract"
      ]
    }
  ]
};

export const SUB_D31: SubBabNaskah = {
  "id": "D",
  "codeTitle": "Sub-Bab D (Penjumlahan sampai 100)",
  "fullTitle": "Sub-Bab D: Penjumlahan Bilangan Cacah sampai 100",
  "targetDescription": "Siswa menjumlahkan dua bilangan cacah sampai 100 dengan cara susun pendek (tanpa dan dengan menyimpan) dan cara susun panjang (menguraikan puluhan dan satuan), memahami bahwa sepuluh satuan ditukar menjadi satu puluhan, menjumlahkan tiga bilangan, serta menyelesaikan soal cerita penjumlahan. Siswa memakai cara Penjumlahan Bersusun, Pasangan Bilangan, Menghitung Maju. Siswa memakai cara Penjumlahan Bersusun, Pasangan Bilangan, Menghitung Maju.",
  "secondaryBg": "#FCE7F3",
  "secondaryBorder": "#DB2777",
  "secondaryText": "#831843",
  "silabus": {
    "teksSuara": "Kita belajar penjumlahan bilangan cacah sampai seratus. Di perpustakaan ada dua puluh tiga buku Matematika dan enam belas buku Bahasa Indonesia, lalu ada empat puluh delapan siswa laki-laki dan enam belas siswa perempuan yang mengikuti upacara. Kita belajar cara susun pendek dan cara susun panjang, tanpa menyimpan dan dengan menyimpan. Kita juga menyelesaikan soal cerita. Kita memakai cara: Penjumlahan Bersusun, Pasangan Bilangan, Menghitung Maju. Dari satuan, simpan jika perlu. Pecah bilangan untuk mudah dijumlah. Mulai dari yang lebih besar. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa melakukan operasi penjumlahan dan pengurangan bilangan cacah sampai 100. Pada sub-bab ini siswa menjumlahkan dua bilangan cacah sampai 100 dengan susun pendek dan susun panjang, tanpa dan dengan menyimpan.",
    "referensi": "Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 1 Sub-Bab D)."
  },
  "videos": [
    {
      "id": "K3B1D-V1",
      "judul": "Buku di Perpustakaan",
      "subjudul": "Standard Addition",
      "adegan": [
        {
          "id": "K3B1D-V1-1",
          "judul": "Berapa semua buku",
          "ketukan": [
            "Bayangkan kamu sedang mempelajari Penjumlahan Bilangan Cacah sampai 100. Di perpustakaan sekolah ada 23 buah buku Matematika dan 16 buah buku Bahasa Indonesia.",
            "Berapa jumlah keseluruhan buku di rak perpustakaan.",
            "Kita bisa memakai operasi penjumlahan, yaitu 23 ditambah 16.",
            "Ingat cara Penjumlahan Bersusun: Dari satuan, simpan jika perlu. Ingat cara Penjumlahan Bersusun: Dari satuan, simpan jika perlu."
          ],
          "papan": [
            "23 buku Matematika",
            "16 buku Bahasa",
            "23 + 16",
            "Berbagai cara"
          ]
        },
        {
          "id": "K3B1D-V1-2",
          "judul": "Tabel nilai tempat",
          "ketukan": [
            "Uraikan 23 dan 16 pada tabel nilai tempat.",
            "Bilangan 23 punya 2 puluhan dan 3 satuan. Bilangan 16 punya 1 puluhan dan 6 satuan.",
            "Gabungkan satuan: 3 satuan dan 6 satuan menjadi 9 satuan.",
            "Di sini kita memakai ide Standard Addition — Dari satuan, simpan jika perlu. Di sini kita memakai Standard Addition. Dari satuan, simpan jika perlu."
          ],
          "papan": [
            "Tabel puluhan dan satuan",
            "23 dan 16",
            "3 + 6 = 9 satuan",
            "2 + 1 = 3 puluhan"
          ]
        },
        {
          "id": "K3B1D-V1-3",
          "judul": "Susun pendek",
          "ketukan": [
            "Cara susun pendek: susun bilangan, puluhan lurus dengan puluhan dan satuan lurus dengan satuan.",
            "Langkah satu, susun. Langkah dua, jumlahkan satuan, 3 + 6 = 9.",
            "Langkah tiga, jumlahkan puluhan, 2 + 1 = 3.",
            "METODE LUAR · Penjumlahan Bersusun: Dari satuan, simpan jika perlu."
          ],
          "papan": [
            "Susun pendek",
            "Satuan: 3 + 6 = 9",
            "Puluhan: 2 + 1 = 3",
            "23 + 16 = 39"
          ]
        }
      ]
    },
    {
      "id": "K3B1D-V2",
      "judul": "Latihan: Pasangan Bilangan",
      "subjudul": "Number Bond",
      "adegan": [
        {
          "id": "K3B1D-V2-1",
          "judul": "Berapa jumlah siswa",
          "ketukan": [
            "Sekolah mengikutsertakan siswa untuk upacara di alun-alun kota.",
            "Ada 48 siswa laki-laki dan 16 siswa perempuan.",
            "Berapa jumlah seluruh siswa yang mengikuti upacara.",
            "Ingat cara Pasangan Bilangan: Pecah bilangan untuk mudah dijumlah. Ingat cara Pasangan Bilangan: Pecah bilangan untuk mudah dijumlah."
          ],
          "papan": [
            "Upacara di alun-alun",
            "48 laki-laki, 16 perempuan",
            "Jumlah seluruh siswa?",
            "48 + 16"
          ]
        },
        {
          "id": "K3B1D-V2-2",
          "judul": "Menyimpan satu puluhan",
          "ketukan": [
            "Jumlahkan satuan: 8 ditambah 6 sama dengan 14.",
            "Empat belas satuan sama dengan 1 puluhan dan 4 satuan.",
            "Tulis 4 di satuan, lalu simpan 1 puluhan di atas kolom puluhan.",
            "Di sini kita memakai ide Number Bond — Pecah bilangan untuk mudah dijumlah. Di sini kita memakai Number Bond. Pecah bilangan untuk mudah dijumlah."
          ],
          "papan": [
            "8 + 6 = 14",
            "14 = 1 puluhan + 4 satuan",
            "Tulis 4, simpan 1",
            "10 satuan jadi 1 puluhan"
          ]
        },
        {
          "id": "K3B1D-V2-3",
          "judul": "Puluhan dan hasil",
          "ketukan": [
            "Sekarang jumlahkan puluhan: 1 simpanan, ditambah 4, ditambah 1.",
            "Satu ditambah empat ditambah satu sama dengan 6.",
            "Jadi, 48 ditambah 16 sama dengan 64.",
            "METODE LUAR · Pasangan Bilangan: Pecah bilangan untuk mudah dijumlah."
          ],
          "papan": [
            "Puluhan: 1 + 4 + 1",
            "= 6 puluhan",
            "48 + 16 = 64",
            "64 siswa"
          ]
        }
      ]
    },
    {
      "id": "K3B1D-V3",
      "judul": "Siap pakai Counting On",
      "subjudul": "Counting On",
      "adegan": [
        {
          "id": "K3B1D-V3-1",
          "judul": "Uraikan bilangan",
          "ketukan": [
            "Cara susun panjang menguraikan bilangan menjadi puluhan dan satuan.",
            "Bilangan 54 diurai menjadi 50 ditambah 4.",
            "Bilangan 29 diurai menjadi 20 ditambah 9.",
            "Ingat cara Menghitung Maju: Mulai dari yang lebih besar. Ingat cara Menghitung Maju: Mulai dari yang lebih besar."
          ],
          "papan": [
            "Susun panjang",
            "54 = 50 + 4",
            "29 = 20 + 9",
            "Kelompokkan"
          ]
        },
        {
          "id": "K3B1D-V3-2",
          "judul": "Jumlahkan kelompok",
          "ketukan": [
            "Puluhan: 50 ditambah 20 sama dengan 70.",
            "Satuan: 4 ditambah 9 sama dengan 13.",
            "Bilangan 13 diurai menjadi 10 ditambah 3.",
            "Di sini kita memakai ide Counting On — Mulai dari yang lebih besar. Di sini kita memakai Counting On. Mulai dari yang lebih besar."
          ],
          "papan": [
            "50 + 20 = 70",
            "4 + 9 = 13",
            "13 = 10 + 3",
            "70 + 10 + 3 = 83"
          ]
        },
        {
          "id": "K3B1D-V3-3",
          "judul": "Pilih cara yang mudah",
          "ketukan": [
            "Kita boleh memilih cara yang menurut kita paling mudah.",
            "Cara susun pendek cepat untuk bilangan yang dijumlahkan satu per satu.",
            "Cara susun panjang membantu kita melihat nilai puluhan dan satuan.",
            "METODE LUAR · Menghitung Maju: Mulai dari yang lebih besar."
          ],
          "papan": [
            "Pilih cara yang mudah",
            "Susun pendek: cepat",
            "Susun panjang: jelas",
            "Hasil sama: 83"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Apa yang ditanyakan pada Penjumlahan Bilangan Cacah sampai 100?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Standard Addition",
      "stepDesc": "Dari satuan, simpan jika perlu.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Number Bond",
      "stepDesc": "Pecah bilangan untuk mudah dijumlah.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Counting On",
      "stepDesc": "Mulai dari yang lebih besar.",
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
      "judul": "Susun Lurus",
      "emoji": "📏",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Pada penjumlahan bersusun, puluhan lurus dengan puluhan dan satuan lurus dengan satuan."
    },
    {
      "judul": "Satuan Lebih Dulu",
      "emoji": "1️⃣",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Kita menjumlahkan satuan lebih dulu, baru puluhan. Tiga ditambah enam sama dengan sembilan."
    },
    {
      "judul": "Puluhan Berikutnya",
      "emoji": "🔟",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Setelah satuan, jumlahkan puluhan. Dua ditambah satu sama dengan tiga, jadi dua puluh tiga ditambah enam belas sama dengan tiga puluh sembilan."
    },
    {
      "judul": "Menyimpan",
      "emoji": "🔁",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Bila satuan berjumlah sepuluh atau lebih, tukar sepuluh satuan dengan satu puluhan. Tulis sisa satuan dan simpan satu puluhan."
    },
    {
      "judul": "23 + 16",
      "emoji": "📚",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Dua puluh tiga ditambah enam belas. Satuan tiga ditambah enam sama dengan sembilan, puluhan dua ditambah satu sama dengan tiga. Hasilnya tiga puluh sembilan."
    },
    {
      "judul": "48 + 16",
      "emoji": "🏟️",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Empat puluh delapan ditambah enam belas. Delapan ditambah enam sama dengan empat belas, simpan satu. Satu ditambah empat ditambah satu sama dengan enam. Hasilnya enam puluh empat."
    },
    {
      "judul": "Susun Panjang 54 + 29",
      "emoji": "🧩",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Lima puluh empat sama dengan lima puluh tambah empat. Dua puluh sembilan sama dengan dua puluh tambah sembilan. Tujuh puluh tambah tiga belas sama dengan delapan puluh tiga."
    },
    {
      "judul": "Tiga Bilangan",
      "emoji": "➕",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Menjumlahkan tiga bilangan dilakukan dua-dua. Dua puluh tiga tambah tiga puluh sama dengan lima puluh tiga, tambah dua belas sama dengan enam puluh lima."
    },
    {
      "judul": "Soal Cerita",
      "emoji": "📖",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Soal cerita meminta jumlah seluruhnya. Tulis kalimat penjumlahannya, hitung, lalu tulis jawabannya dengan satuan."
    },
    {
      "judul": "Cara Memeriksa",
      "emoji": "📝",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Empat langkah. Satu, susun lurus. Dua, jumlahkan satuan dan simpan bila perlu. Tiga, jumlahkan puluhan. Empat, periksa dengan cara yang lain."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "combine-collections",
      "title": "Gabungkan Kumpulan",
      "bookReference": "hlm. 35–37 (penjumlahan dengan tabel nilai tempat)",
      "objective": "Pakai Penjumlahan Bersusun: Dari satuan, simpan jika perlu. Latihan: Menggabungkan dua kumpulan dengan bungkus dan benda lepas, termasuk menukar sepuluh benda menjadi satu bungkus..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca dua banyak yang digabung lalu merakit jumlahnya dengan tombol tambah dan kurang. Sepuluh benda otomatis ditukar menjadi satu bungkus. Saat bermain, ingat Penjumlahan Bersusun: Dari satuan, simpan jika perlu.",
      "voiceGuide": "Penjumlahan Bersusun. Dari satuan, simpan jika perlu.",
      "emoji": "🧺",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "count-combined",
      "title": "Hitung Gabungan",
      "bookReference": "hlm. 35 dan 38 (23 + 16 dan 48 + 16)",
      "objective": "Pakai Penjumlahan Bersusun: Dari satuan, simpan jika perlu. Latihan: Menghitung jumlah dua kumpulan benda dan memilih hasilnya..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Dua kumpulan ditampilkan dengan tanda tambah. Siswa memilih satu dari tiga jumlah. Pengecoh lupa menyimpan atau salah menyimpan. Saat bermain, ingat Penjumlahan Bersusun: Dari satuan, simpan jika perlu.",
      "voiceGuide": "Penjumlahan Bersusun. Dari satuan, simpan jika perlu.",
      "emoji": "➕",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-addition",
      "title": "Pilah Soal: Menyimpan atau Tidak",
      "bookReference": "hlm. 38–42 (dengan menyimpan dan tanpa menyimpan)",
      "objective": "Pakai Penjumlahan Bersusun: Dari satuan, simpan jika perlu. Latihan: Memilah soal penjumlahan menjadi yang perlu menyimpan dan yang tanpa menyimpan..",
      "mechanicDescription": "Tiga ronde, tiap ronde enam soal bergambar kumpulan dan dua kotak. Siswa menyeret atau mengetuk soal ke kotak yang tepat. Saat bermain, ingat Penjumlahan Bersusun: Dari satuan, simpan jika perlu.",
      "voiceGuide": "Penjumlahan Bersusun. Dari satuan, simpan jika perlu.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-pair-sum",
      "title": "Jodohkan Pasangan dan Jumlah",
      "bookReference": "hlm. 35–42 (menjumlahkan dua bilangan)",
      "objective": "Pakai Penjumlahan Bersusun: Dari satuan, simpan jika perlu. Latihan: Menjodohkan pasangan kumpulan dengan jumlahnya..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga pasangan kumpulan dan tiga jumlah. Siswa mengetuk pasangan, lalu mengetuk jumlah yang cocok. Saat bermain, ingat Penjumlahan Bersusun: Dari satuan, simpan jika perlu.",
      "voiceGuide": "Penjumlahan Bersusun. Dari satuan, simpan jika perlu.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "memory-pair-sum",
      "title": "Memori Pasangan dan Jumlah",
      "bookReference": "hlm. 35–42 (menjumlahkan dua bilangan)",
      "objective": "Mencocokkan pasangan kumpulan dengan jumlahnya lewat permainan memori.. Ingat Penjumlahan Bersusun. (Penjumlahan Bersusun)",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): pasangan kumpulan dan jumlahnya. Siswa membalik dua kartu dan mencari pasangannya. Gunakan Penjumlahan Bersusun.",
      "voiceGuide": "Penjumlahan Bersusun. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-sum-pair",
      "title": "Ketuk Pasangan dengan Jumlah",
      "bookReference": "hlm. 35–42 (jumlah keseluruhan)",
      "objective": "Menemukan pasangan kumpulan yang jumlahnya sama dengan bilangan yang diminta.. Ingat Penjumlahan Bersusun. (Penjumlahan Bersusun)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga pasangan dan dua pertanyaan. Siswa mengetuk pasangan yang jumlahnya sama dengan bilangan yang disebut. Gunakan Penjumlahan Bersusun.",
      "voiceGuide": "Penjumlahan Bersusun. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-save",
      "title": "Ketuk Semua yang Perlu Menyimpan",
      "bookReference": "hlm. 38–40 (8 satuan + 6 satuan = 14 satuan)",
      "objective": "Menemukan semua pasangan yang satuannya berjumlah sepuluh atau lebih (atau yang tidak).. Ingat Penjumlahan Bersusun. (Penjumlahan Bersusun)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat pasangan dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. Gunakan Penjumlahan Bersusun.",
      "voiceGuide": "Penjumlahan Bersusun. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-add",
      "title": "Cerita Penjumlahan",
      "bookReference": "hlm. 35 dan 38 (buku di perpustakaan; siswa di upacara)",
      "objective": "Menyelesaikan soal cerita penjumlahan dua bilangan dengan gambar kumpulan.. Ingat Penjumlahan Bersusun. (Penjumlahan Bersusun)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita, melihat gambar dua kumpulan, lalu memilih jumlahnya. Gunakan Penjumlahan Bersusun.",
      "voiceGuide": "Penjumlahan Bersusun. Mainkan dengan teliti.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "board-sum-collection",
      "title": "Papan Jumlah Kumpulan",
      "bookReference": "hlm. 36 dan 39 (tabel nilai tempat hasil penjumlahan)",
      "objective": "Menulis jumlah dua kumpulan pada papan puluhan dan satuan.. Ingat Penjumlahan Bersusun. (Penjumlahan Bersusun)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa menghitung dua kumpulan, lalu mengatur angka puluhan dan satuan pada papan dan menekan Periksa. Gunakan Penjumlahan Bersusun.",
      "voiceGuide": "Penjumlahan Bersusun. Mainkan dengan teliti.",
      "emoji": "🗂️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-sums",
      "title": "Urutkan Pasangan menurut Jumlah",
      "bookReference": "hlm. 35–42 (membandingkan hasil)",
      "objective": "Mengurutkan tiga pasangan kumpulan menurut jumlahnya.. Ingat Penjumlahan Bersusun. (Penjumlahan Bersusun)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga pasangan bertanda huruf. Siswa mengetuk pasangan satu per satu dari jumlah paling kecil atau paling besar. Gunakan Penjumlahan Bersusun.",
      "voiceGuide": "Penjumlahan Bersusun. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 9
    },
    {
      "stage": "Picture",
      "gameType": "add-vertical",
      "title": "Susun ke Bawah",
      "bookReference": "hlm. 36 dan 39 (langkah 1, 2, dan 3 cara susun pendek)",
      "objective": "Pakai Pasangan Bilangan: Pecah bilangan untuk mudah dijumlah. Latihan: Menjumlahkan dua bilangan dengan cara susun pendek langkah demi langkah..",
      "mechanicDescription": "Tiga ronde, tiap ronde satu soal (23 + 16, 48 + 16, 54 + 29). Siswa menaruh bilangan pada kolom satuan, menjumlahkan satuan, menyimpan bila perlu, lalu menjumlahkan puluhan. Saat bermain, ingat Pasangan Bilangan: Pecah bilangan untuk mudah dijumlah.",
      "voiceGuide": "Pasangan Bilangan. Pecah bilangan untuk mudah dijumlah.",
      "diagramType": "add-vertical",
      "numberA": 3,
      "numberB": 1
    },
    {
      "stage": "Picture",
      "gameType": "board-sum-numbers",
      "title": "Papan Hasil Susun",
      "bookReference": "hlm. 43 (Ayo Berlatih 2: gunakan cara susun pendek)",
      "objective": "Pakai Pasangan Bilangan: Pecah bilangan untuk mudah dijumlah. Latihan: Menulis hasil penjumlahan pada papan puluhan dan satuan..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal (33 + 28, 27 + 46, dan seterusnya). Siswa mengatur angka puluhan dan satuan, lalu menekan Periksa. Saat bermain, ingat Pasangan Bilangan: Pecah bilangan untuk mudah dijumlah.",
      "voiceGuide": "Pasangan Bilangan. Pecah bilangan untuk mudah dijumlah.",
      "diagramType": "sum-board",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "count-models-sum",
      "title": "Hitung Model Puluhan dan Satuan",
      "bookReference": "hlm. 35–36 (tabel puluhan dan satuan)",
      "objective": "Pakai Pasangan Bilangan: Pecah bilangan untuk mudah dijumlah. Latihan: Menghitung jumlah dari dua model puluhan dan satuan..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Dua model blok puluhan dan satuan ditampilkan. Siswa memilih satu dari tiga jumlah. Saat bermain, ingat Pasangan Bilangan: Pecah bilangan untuk mudah dijumlah.",
      "voiceGuide": "Pasangan Bilangan. Pecah bilangan untuk mudah dijumlah.",
      "diagramType": "models-sum",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-models-sum",
      "title": "Jodohkan Model dan Jumlah",
      "bookReference": "hlm. 35–42 (menjumlahkan dua bilangan)",
      "objective": "Pakai Pasangan Bilangan: Pecah bilangan untuk mudah dijumlah. Latihan: Menjodohkan pasangan model dengan jumlahnya..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga pasangan model dan tiga jumlah. Siswa mengetuk pasangan, lalu mengetuk jumlah yang cocok. Saat bermain, ingat Pasangan Bilangan: Pecah bilangan untuk mudah dijumlah.",
      "voiceGuide": "Pasangan Bilangan. Pecah bilangan untuk mudah dijumlah.",
      "diagramType": "models-match",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memory-models-sum",
      "title": "Memori Model dan Jumlah",
      "bookReference": "hlm. 35–42 (menjumlahkan dua bilangan)",
      "objective": "Mencocokkan pasangan model dengan jumlahnya lewat permainan memori.. Ingat Pasangan Bilangan. (Pasangan Bilangan)",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. Gunakan Pasangan Bilangan.",
      "voiceGuide": "Pasangan Bilangan. Mainkan dengan teliti.",
      "diagramType": "models-memory",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "fill-sum-table",
      "title": "Isi Tabel Hasil",
      "bookReference": "hlm. 43 (Ayo Berlatih 2 dan 3)",
      "objective": "Melengkapi tabel soal penjumlahan dan hasilnya.. Ingat Pasangan Bilangan. (Pasangan Bilangan)",
      "mechanicDescription": "Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu hasil yang tepat. Ada satu kartu pengecoh. Gunakan Pasangan Bilangan.",
      "voiceGuide": "Pasangan Bilangan. Mainkan dengan teliti.",
      "diagramType": "sum-table",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-save-models",
      "title": "Ketuk Semua yang Perlu Menyimpan: Model",
      "bookReference": "hlm. 38–40 (menyimpan satu puluhan)",
      "objective": "Menemukan semua soal yang satuannya melewati sepuluh.. Ingat Pasangan Bilangan. (Pasangan Bilangan)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat soal bergambar model dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. Gunakan Pasangan Bilangan.",
      "voiceGuide": "Pasangan Bilangan. Mainkan dengan teliti.",
      "diagramType": "sum-select",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-addition-models",
      "title": "Pilah Soal Susun",
      "bookReference": "hlm. 38–40 (dengan menyimpan dan tanpa menyimpan)",
      "objective": "Memilah soal bergambar model menjadi yang perlu menyimpan dan yang tanpa menyimpan.. Ingat Pasangan Bilangan. (Pasangan Bilangan)",
      "mechanicDescription": "Tiga ronde, tiap ronde enam soal dan dua kotak. Siswa menyeret atau mengetuk soal ke kotak yang tepat. Gunakan Pasangan Bilangan.",
      "voiceGuide": "Pasangan Bilangan. Mainkan dengan teliti.",
      "diagramType": "sum-sort",
      "numberA": 3,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "long-form-sentence",
      "title": "Lengkapi Cara Panjang",
      "bookReference": "hlm. 37 dan 40 (23 = 20 + 3; 16 = 10 + 6)",
      "objective": "Melengkapi uraian puluhan dan satuan pada cara susun panjang.. Ingat Pasangan Bilangan. (Pasangan Bilangan)",
      "mechanicDescription": "Tiga soal, tiap soal tiga kalimat, misalnya 23 = 20 + ... Siswa memilih satu dari tiga angka untuk bagian kosong. Gunakan Pasangan Bilangan.",
      "voiceGuide": "Pasangan Bilangan. Mainkan dengan teliti.",
      "diagramType": "long-form",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "order-addition-steps",
      "title": "Urutkan Langkah Menjumlahkan",
      "bookReference": "hlm. 36–42 (langkah 1, 2, dan 3)",
      "objective": "Mengurutkan langkah penjumlahan bersusun dan susun panjang.. Ingat Pasangan Bilangan. (Pasangan Bilangan)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat langkah. Siswa mengetuk langkah satu per satu menurut urutan yang benar. Letak jawaban berpindah. Gunakan Pasangan Bilangan.",
      "voiceGuide": "Pasangan Bilangan. Mainkan dengan teliti.",
      "diagramType": "steps-order",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Abstract",
      "gameType": "add-vertical-abstract",
      "title": "Susun ke Bawah: Lambang",
      "bookReference": "hlm. 43 (Ayo Berlatih 2: cara susun pendek)",
      "objective": "Pakai Menghitung Maju: Mulai dari yang lebih besar. Latihan: Menjumlahkan dua bilangan dengan susun pendek, termasuk menyimpan..",
      "mechanicDescription": "Tiga ronde, tiap ronde satu soal (34 + 25, 46 + 38, 57 + 26). Siswa menyusun, menjumlahkan satuan, menyimpan bila perlu, lalu menjumlahkan puluhan. Saat bermain, ingat Menghitung Maju: Mulai dari yang lebih besar.",
      "voiceGuide": "Menghitung Maju. Mulai dari yang lebih besar.",
      "symbolLarge": "34+25",
      "wordLarge": "SUSUN KE BAWAH",
      "mathNotation": "satuan • puluhan"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-sum",
      "title": "Pilih Jumlahnya",
      "bookReference": "hlm. 44 (gunakan cara yang menurut kalian mudah)",
      "objective": "Pakai Menghitung Maju: Mulai dari yang lebih besar. Latihan: Memilih hasil penjumlahan dua bilangan dari tiga pilihan..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal (31 + 51, 49 + 19, dan seterusnya). Pengecoh lupa menyimpan atau salah menyimpan. Saat bermain, ingat Menghitung Maju: Mulai dari yang lebih besar.",
      "voiceGuide": "Menghitung Maju. Mulai dari yang lebih besar.",
      "symbolLarge": "31+51",
      "wordLarge": "PILIH HASIL",
      "mathNotation": "jumlah"
    },
    {
      "stage": "Abstract",
      "gameType": "board-sum-abstract",
      "title": "Papan Jumlah",
      "bookReference": "hlm. 43–44 (menjumlahkan dua bilangan)",
      "objective": "Pakai Menghitung Maju: Mulai dari yang lebih besar. Latihan: Menulis hasil penjumlahan pada papan puluhan dan satuan..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa mengatur angka puluhan dan satuan lalu menekan Periksa. Saat bermain, ingat Menghitung Maju: Mulai dari yang lebih besar.",
      "voiceGuide": "Menghitung Maju. Mulai dari yang lebih besar.",
      "symbolLarge": "64+17",
      "wordLarge": "PAPAN",
      "mathNotation": "puluhan • satuan"
    },
    {
      "stage": "Abstract",
      "gameType": "steps-sentence",
      "title": "Satuan, Puluhan, Jumlah",
      "bookReference": "hlm. 39 (jumlahkan satuan, simpan 1; jumlahkan puluhan)",
      "objective": "Pakai Menghitung Maju: Mulai dari yang lebih besar. Latihan: Melengkapi langkah menjumlahkan satuan, puluhan, dan jumlah akhir..",
      "mechanicDescription": "Tiga soal, tiap soal tiga kalimat, misalnya satuan: 8 + 6 = ... Siswa memilih satu dari tiga angka. Saat bermain, ingat Menghitung Maju: Mulai dari yang lebih besar.",
      "voiceGuide": "Menghitung Maju. Mulai dari yang lebih besar.",
      "symbolLarge": "8+6",
      "wordLarge": "LANGKAH",
      "mathNotation": "satuan • puluhan • jumlah"
    },
    {
      "stage": "Abstract",
      "gameType": "match-problem-result",
      "title": "Jodohkan Soal dan Hasil",
      "bookReference": "hlm. 44 (tarik garis pada jawaban yang sesuai)",
      "objective": "Menjodohkan soal penjumlahan dengan hasilnya.. Ingat Menghitung Maju. (Menghitung Maju)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga soal dan tiga hasil. Siswa mengetuk soal, lalu mengetuk hasil yang cocok. Gunakan Menghitung Maju.",
      "voiceGuide": "Menghitung Maju. Mainkan dengan teliti.",
      "symbolLarge": "23+16",
      "wordLarge": "JODOHKAN",
      "mathNotation": "soal • hasil"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-problem-result",
      "title": "Memori Soal dan Hasil",
      "bookReference": "hlm. 44 (soal dan jawaban)",
      "objective": "Mencocokkan soal penjumlahan dengan hasilnya lewat permainan memori.. Ingat Menghitung Maju. (Menghitung Maju)",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): soal dan hasil. Siswa membalik dua kartu dan mencari pasangannya. Gunakan Menghitung Maju.",
      "voiceGuide": "Menghitung Maju. Mainkan dengan teliti.",
      "symbolLarge": "12+13",
      "wordLarge": "MEMORI",
      "mathNotation": "soal • hasil"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-addition",
      "title": "Benar atau Salah: Penjumlahan",
      "bookReference": "hlm. 35–45 (susun pendek, susun panjang, menyimpan)",
      "objective": "Menilai pernyataan tentang cara menjumlahkan dan hasilnya.. Ingat Menghitung Maju. (Menghitung Maju)",
      "mechanicDescription": "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan dihitung dari bilangan, dan tiap jawaban diberi penjelasan. Gunakan Menghitung Maju.",
      "voiceGuide": "Menghitung Maju. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "periksa dengan alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-addition",
      "title": "Detektif Penjumlahan",
      "bookReference": "hlm. 35–42 (jumlah dua bilangan)",
      "objective": "Menemukan bilangan hasil penjumlahan dari dua petunjuk.. Ingat Menghitung Maju. (Menghitung Maju)",
      "mechanicDescription": "Empat soal. Siswa membaca petunjuk seperti hasil 48 + 16 dan puluhanku 6, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok. Gunakan Menghitung Maju.",
      "voiceGuide": "Menghitung Maju. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "dua petunjuk, satu jawaban"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-map-addition",
      "title": "Peta Konsep Penjumlahan",
      "bookReference": "hlm. 2 (peta konsep: penjumlahan bilangan cacah)",
      "objective": "Melengkapi peta konsep penjumlahan bersusun dan susun panjang.. Ingat Menghitung Maju. (Menghitung Maju)",
      "mechanicDescription": "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. Gunakan Menghitung Maju.",
      "voiceGuide": "Menghitung Maju. Mainkan dengan teliti.",
      "symbolLarge": "⇄",
      "wordLarge": "PETA KONSEP",
      "mathNotation": "susun • simpan • jumlah"
    },
    {
      "stage": "Abstract",
      "gameType": "story-add-numbers",
      "title": "Soal Cerita Penjumlahan",
      "bookReference": "hlm. 45 (Ayo Berlatih 5: kerjakan soal cerita)",
      "objective": "Menyelesaikan soal cerita penjumlahan dua atau tiga bilangan.. Ingat Menghitung Maju. (Menghitung Maju)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita lalu memilih satu dari tiga jumlah. Pengecoh lupa menyimpan atau salah menyimpan. Gunakan Menghitung Maju.",
      "voiceGuide": "Menghitung Maju. Mainkan dengan teliti.",
      "symbolLarge": "25+36",
      "wordLarge": "CERITA",
      "mathNotation": "jumlah seluruhnya"
    }
  ],
  "poin": [
    {
      "ikon": "📏",
      "nama": "Susun lurus",
      "isi": "puluhan dengan puluhan, satuan dengan satuan",
      "suara": "Pada penjumlahan bersusun, puluhan lurus dengan puluhan dan satuan lurus dengan satuan."
    },
    {
      "ikon": "🌍",
      "nama": "Penjumlahan Bersusun",
      "isi": "Dari satuan, simpan jika perlu.",
      "suara": "Penjumlahan Bersusun. Dari satuan, simpan jika perlu."
    },
    {
      "ikon": "🌍",
      "nama": "Pasangan Bilangan",
      "isi": "Pecah bilangan untuk mudah dijumlah.",
      "suara": "Pasangan Bilangan. Pecah bilangan untuk mudah dijumlah."
    },
    {
      "ikon": "🌍",
      "nama": "Menghitung Maju",
      "isi": "Mulai dari yang lebih besar.",
      "suara": "Menghitung Maju. Mulai dari yang lebih besar."
    }
  ],
  "poinSuara": "Ingat: Penjumlahan Bersusun, Pasangan Bilangan, Menghitung Maju.",
  "cara": {
    "suara": "Cara menjumlahkan. Susun lurus. Jumlahkan satuan, simpan bila perlu. Jumlahkan puluhan. Lalu periksa dengan cara lain.",
    "potongan": [
      {
        "teks": "susun lurus",
        "warna": "#BAE6FD"
      },
      {
        "teks": "satuan dulu",
        "warna": "#FECACA"
      },
      {
        "teks": "lalu puluhan",
        "warna": "#BFDBFE"
      },
      {
        "teks": "periksa",
        "warna": "#FDE68A"
      }
    ]
  },
  "rumah": "Ayo Mencoba: terapkan Penjumlahan Bersusun pada satu soal nyata di rumah.",
  "refleksi": [
    "Bagaimana Penjumlahan Bersusun membantumu?",
    "Kapan memakai Pasangan Bilangan?",
    "Apa bedanya dengan hanya menghafal tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Standard Addition",
      "namaId": "Penjumlahan Bersusun",
      "asal": "Algorithms",
      "ringkas": "Dari satuan, simpan jika perlu.",
      "tahap": [
        "Story",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Number Bond",
      "namaId": "Pasangan Bilangan",
      "asal": "Singapore Math",
      "ringkas": "Pecah bilangan untuk mudah dijumlah.",
      "tahap": [
        "Picture",
        "Mind"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Counting On",
      "namaId": "Menghitung Maju",
      "asal": "Counting on",
      "ringkas": "Mulai dari yang lebih besar.",
      "tahap": [
        "Infografis",
        "Concrete"
      ]
    }
  ]
};

export const SUB_E31: SubBabNaskah = {
  "id": "E",
  "codeTitle": "Sub-Bab E (Pengurangan sampai 100)",
  "fullTitle": "Sub-Bab E: Pengurangan Bilangan Cacah sampai 100",
  "targetDescription": "Siswa mengurangkan dua bilangan cacah sampai 100 dengan cara susun pendek (tanpa dan dengan mengambil satu puluhan) dan cara susun panjang (menguraikan puluhan dan satuan), memahami bahwa satu puluhan dapat ditukar menjadi sepuluh satuan, memeriksa hasil dengan penjumlahan, serta menyelesaikan soal cerita pengurangan. Siswa memakai cara Pengurangan Bersusun, Menghitung Naik, Meminjam. Siswa memakai cara Pengurangan Bersusun, Menghitung Naik, Meminjam.",
  "secondaryBg": "#E0F2FE",
  "secondaryBorder": "#0284C7",
  "secondaryText": "#0C4A6E",
  "silabus": {
    "teksSuara": "Kita belajar pengurangan bilangan cacah sampai seratus. Galih punya dua puluh lima permen dan Alfa mengambil dua belas permen. Pak Bandi punya empat puluh lima buku tulis dan siswa membeli sembilan belas buku tulis. Kita belajar cara susun pendek dan cara susun panjang, tanpa mengambil dan dengan mengambil satu puluhan. Kita juga memeriksa hasil dengan penjumlahan dan menyelesaikan soal cerita. Kita memakai cara: Pengurangan Bersusun, Menghitung Naik, Meminjam. Dari satuan, pinjam jika perlu. Naik dari yang dikurangi. Buka puluhan jadi sepuluh satuan. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa melakukan operasi penjumlahan dan pengurangan bilangan cacah sampai 100. Pada sub-bab ini siswa mengurangkan dua bilangan cacah sampai 100 dengan susun pendek dan susun panjang, tanpa dan dengan mengambil satu puluhan.",
    "referensi": "Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 1 Sub-Bab E)."
  },
  "videos": [
    {
      "id": "K3B1E-V1",
      "judul": "Permen Galih",
      "subjudul": "Standard Subtraction",
      "adegan": [
        {
          "id": "K3B1E-V1-1",
          "judul": "Berapa sisa permen",
          "ketukan": [
            "Bayangkan kamu sedang mempelajari Pengurangan Bilangan Cacah sampai 100. Galih memiliki 25 permen di dalam satu kaleng plastik.",
            "Alfa diminta mengambil 12 permen.",
            "Berapa sisa permen Galih sekarang.",
            "Ingat cara Pengurangan Bersusun: Dari satuan, pinjam jika perlu. Ingat cara Pengurangan Bersusun: Dari satuan, pinjam jika perlu."
          ],
          "papan": [
            "Galih punya 25 permen",
            "Alfa mengambil 12",
            "Sisa permen?",
            "25 − 12"
          ]
        },
        {
          "id": "K3B1E-V1-2",
          "judul": "Tabel nilai tempat",
          "ketukan": [
            "Uraikan 25 dan 12 pada tabel nilai tempat.",
            "Bilangan 25 punya 2 puluhan dan 5 satuan. Bilangan 12 punya 1 puluhan dan 2 satuan.",
            "Kurangkan satuan: 5 dikurangi 2 sama dengan 3 satuan.",
            "Di sini kita memakai ide Standard Subtraction — Dari satuan, pinjam jika perlu. Di sini kita memakai Standard Subtraction. Dari satuan, pinjam jika perlu."
          ],
          "papan": [
            "Tabel puluhan dan satuan",
            "5 − 2 = 3 satuan",
            "2 − 1 = 1 puluhan",
            "Sisa 13"
          ]
        },
        {
          "id": "K3B1E-V1-3",
          "judul": "Susun pendek",
          "ketukan": [
            "Cara susun pendek: susun bilangan, puluhan lurus dengan puluhan dan satuan lurus dengan satuan.",
            "Langkah satu, susun. Langkah dua, kurangkan satuan, 5 − 2 = 3.",
            "Langkah tiga, kurangkan puluhan, 2 − 1 = 1.",
            "METODE LUAR · Pengurangan Bersusun: Dari satuan, pinjam jika perlu."
          ],
          "papan": [
            "Susun pendek",
            "Satuan: 5 − 2 = 3",
            "Puluhan: 2 − 1 = 1",
            "25 − 12 = 13"
          ]
        }
      ]
    },
    {
      "id": "K3B1E-V2",
      "judul": "Latihan: Menghitung Naik",
      "subjudul": "Counting Up",
      "adegan": [
        {
          "id": "K3B1E-V2-1",
          "judul": "Berapa sisa buku",
          "ketukan": [
            "Pak Bandi memiliki toko yang menjual alat tulis.",
            "Di tokonya ada 45 buku tulis. Siswa SD Pelita membeli 19 buku tulis.",
            "Berapa sisa buku tulis di toko Pak Bandi sekarang.",
            "Ingat cara Menghitung Naik: Naik dari yang dikurangi. Ingat cara Menghitung Naik: Naik dari yang dikurangi."
          ],
          "papan": [
            "Toko Pak Bandi",
            "45 buku, dibeli 19",
            "Sisa buku?",
            "45 − 19"
          ]
        },
        {
          "id": "K3B1E-V2-2",
          "judul": "Mengambil satu puluhan",
          "ketukan": [
            "Satuan 5 kurang dari 9, jadi 5 tidak dapat dikurangi 9.",
            "Kita mengambil 1 puluhan dari 4 puluhan. Puluhan tinggal 3.",
            "Satu puluhan menjadi 10 satuan. 10 ditambah 5 sama dengan 15 satuan.",
            "Di sini kita memakai ide Counting Up — Naik dari yang dikurangi. Di sini kita memakai Counting Up. Naik dari yang dikurangi."
          ],
          "papan": [
            "5 kurang dari 9",
            "Ambil 1 puluhan",
            "4 puluhan jadi 3 puluhan",
            "15 − 9 = 6"
          ]
        },
        {
          "id": "K3B1E-V2-3",
          "judul": "Puluhan dan hasil",
          "ketukan": [
            "Sekarang kurangkan puluhan. Karena 1 puluhan sudah diambil, puluhan tinggal 3.",
            "Tiga dikurangi satu sama dengan 2.",
            "Jadi, 45 dikurangi 19 sama dengan 26.",
            "METODE LUAR · Menghitung Naik: Naik dari yang dikurangi."
          ],
          "papan": [
            "Puluhan: 3 − 1 = 2",
            "2 puluhan, 6 satuan",
            "45 − 19 = 26",
            "26 buku tulis"
          ]
        }
      ]
    },
    {
      "id": "K3B1E-V3",
      "judul": "Siap pakai Regrouping",
      "subjudul": "Regrouping",
      "adegan": [
        {
          "id": "K3B1E-V3-1",
          "judul": "Uraikan bilangan",
          "ketukan": [
            "Cara susun panjang menguraikan bilangan menjadi puluhan dan satuan.",
            "Bilangan 45 diurai menjadi 40 ditambah 5. Bilangan 19 diurai menjadi 10 ditambah 9.",
            "Satuan 5 kurang dari 9, jadi 40 diuraikan menjadi 30 ditambah 10.",
            "Ingat cara Meminjam: Buka puluhan jadi sepuluh satuan. Ingat cara Meminjam: Buka puluhan jadi sepuluh satuan."
          ],
          "papan": [
            "Susun panjang",
            "45 = 40 + 5 dan 19 = 10 + 9",
            "40 = 30 + 10",
            "45 = 30 + (10 + 5)"
          ]
        },
        {
          "id": "K3B1E-V3-2",
          "judul": "Kurangkan kelompok",
          "ketukan": [
            "Satuan: 10 ditambah 5 sama dengan 15. Lalu 15 dikurangi 9 sama dengan 6.",
            "Puluhan: 30 dikurangi 10 sama dengan 20.",
            "Jumlahkan hasil puluhan dan satuan: 20 ditambah 6.",
            "Di sini kita memakai ide Regrouping — Buka puluhan jadi sepuluh satuan. Di sini kita memakai Regrouping. Buka puluhan jadi sepuluh satuan."
          ],
          "papan": [
            "15 − 9 = 6",
            "30 − 10 = 20",
            "20 + 6",
            "45 − 19 = 26"
          ]
        },
        {
          "id": "K3B1E-V3-3",
          "judul": "Periksa dengan penjumlahan",
          "ketukan": [
            "Pengurangan dan penjumlahan saling berkaitan.",
            "Bila 45 dikurangi 19 sama dengan 26, maka 26 ditambah 19 harus sama dengan 45.",
            "Kita hitung, 26 ditambah 19 sama dengan 45. Jadi, hasilnya benar.",
            "METODE LUAR · Meminjam: Buka puluhan jadi sepuluh satuan."
          ],
          "papan": [
            "Saling berkaitan",
            "26 + 19 = 45",
            "Hasil benar",
            "Periksa pekerjaanmu"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Apa yang ditanyakan pada Pengurangan Bilangan Cacah sampai 100?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Standard Subtraction",
      "stepDesc": "Dari satuan, pinjam jika perlu.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Counting Up",
      "stepDesc": "Naik dari yang dikurangi.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Regrouping",
      "stepDesc": "Buka puluhan jadi sepuluh satuan.",
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
      "judul": "Susun Lurus",
      "emoji": "📏",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Pada pengurangan bersusun, puluhan lurus dengan puluhan dan satuan lurus dengan satuan. Bilangan yang dikurangi ditulis di atas."
    },
    {
      "judul": "Satuan Lebih Dulu",
      "emoji": "1️⃣",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Kita mengurangkan satuan lebih dulu, baru puluhan. Lima dikurangi dua sama dengan tiga."
    },
    {
      "judul": "Puluhan Berikutnya",
      "emoji": "🔟",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Setelah satuan, kurangkan puluhan. Dua dikurangi satu sama dengan satu, jadi dua puluh lima dikurangi dua belas sama dengan tiga belas."
    },
    {
      "judul": "Mengambil",
      "emoji": "🔁",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Bila satuan di atas lebih kecil dari satuan di bawah, ambil satu puluhan. Satu puluhan menjadi sepuluh satuan, dan puluhan berkurang satu."
    },
    {
      "judul": "25 − 12",
      "emoji": "🍬",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Dua puluh lima dikurangi dua belas. Satuan lima dikurangi dua sama dengan tiga, puluhan dua dikurangi satu sama dengan satu. Hasilnya tiga belas."
    },
    {
      "judul": "45 − 19",
      "emoji": "📒",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Empat puluh lima dikurangi sembilan belas. Lima kurang dari sembilan, jadi ambil satu puluhan. Lima belas dikurangi sembilan sama dengan enam. Tiga dikurangi satu sama dengan dua. Hasilnya dua puluh enam."
    },
    {
      "judul": "Susun Panjang 45 − 19",
      "emoji": "🧩",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Empat puluh lima sama dengan tiga puluh tambah lima belas. Sembilan belas sama dengan sepuluh tambah sembilan. Lima belas kurang sembilan sama dengan enam, tiga puluh kurang sepuluh sama dengan dua puluh. Hasilnya dua puluh enam."
    },
    {
      "judul": "Memeriksa",
      "emoji": "✅",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Periksa pengurangan dengan penjumlahan. Dua puluh enam tambah sembilan belas sama dengan empat puluh lima, jadi hasilnya benar."
    },
    {
      "judul": "Soal Cerita",
      "emoji": "📖",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Soal cerita menanyakan sisa atau selisih. Tulis kalimat pengurangannya, hitung, lalu tulis jawabannya dengan satuan."
    },
    {
      "judul": "Cara Mengurangkan",
      "emoji": "📝",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Empat langkah. Satu, susun lurus. Dua, kurangkan satuan, ambil satu puluhan bila perlu. Tiga, kurangkan puluhan. Empat, periksa dengan penjumlahan."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "build-remaining",
      "title": "Rakit Sisa",
      "bookReference": "hlm. 46–48 (25 permen diambil 12)",
      "objective": "Pakai Pengurangan Bersusun: Dari satuan, pinjam jika perlu. Latihan: Merakit sisa benda setelah sebuah kumpulan diambil sebanyak tertentu, termasuk menukar satu bungkus menjadi sepuluh benda..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca ada berapa benda dan berapa yang diambil, lalu merakit sisanya dengan tombol tambah dan kurang. Sepuluh benda otomatis ditukar satu bungkus. Saat bermain, ingat Pengurangan Bersusun: Dari satuan, pinjam jika perlu.",
      "voiceGuide": "Pengurangan Bersusun. Dari satuan, pinjam jika perlu.",
      "emoji": "🧺",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "count-remaining",
      "title": "Hitung Sisa",
      "bookReference": "hlm. 46 dan 49 (sisa permen; sisa buku tulis)",
      "objective": "Pakai Pengurangan Bersusun: Dari satuan, pinjam jika perlu. Latihan: Menghitung sisa benda dari gambar kumpulan yang diambil sebagian dan memilih hasilnya..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Dua kumpulan ditampilkan dengan tanda kurang. Siswa memilih satu dari tiga sisa. Pengecoh lupa mengambil atau salah mengambil. Saat bermain, ingat Pengurangan Bersusun: Dari satuan, pinjam jika perlu.",
      "voiceGuide": "Pengurangan Bersusun. Dari satuan, pinjam jika perlu.",
      "emoji": "➖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-subtraction",
      "title": "Pilah Soal: Mengambil atau Tidak",
      "bookReference": "hlm. 49–55 (satuan cukup atau tidak cukup)",
      "objective": "Pakai Pengurangan Bersusun: Dari satuan, pinjam jika perlu. Latihan: Memilah soal pengurangan menjadi yang perlu mengambil satu puluhan dan yang tanpa mengambil..",
      "mechanicDescription": "Tiga ronde, tiap ronde enam soal bergambar kumpulan dan dua kotak. Siswa menyeret atau mengetuk soal ke kotak yang tepat. Saat bermain, ingat Pengurangan Bersusun: Dari satuan, pinjam jika perlu.",
      "voiceGuide": "Pengurangan Bersusun. Dari satuan, pinjam jika perlu.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-pair-diff",
      "title": "Jodohkan Pasangan dan Sisa",
      "bookReference": "hlm. 46–55 (mengurangkan dua bilangan)",
      "objective": "Pakai Pengurangan Bersusun: Dari satuan, pinjam jika perlu. Latihan: Menjodohkan pasangan kumpulan dengan sisanya..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga pasangan kumpulan dan tiga sisa. Siswa mengetuk pasangan, lalu mengetuk sisa yang cocok. Saat bermain, ingat Pengurangan Bersusun: Dari satuan, pinjam jika perlu.",
      "voiceGuide": "Pengurangan Bersusun. Dari satuan, pinjam jika perlu.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "memory-pair-diff",
      "title": "Memori Pasangan dan Sisa",
      "bookReference": "hlm. 46–55 (mengurangkan dua bilangan)",
      "objective": "Mencocokkan pasangan kumpulan dengan sisanya lewat permainan memori.. Ingat Pengurangan Bersusun. (Pengurangan Bersusun)",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): pasangan kumpulan dan sisanya. Siswa membalik dua kartu dan mencari pasangannya. Gunakan Pengurangan Bersusun.",
      "voiceGuide": "Pengurangan Bersusun. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-diff-pair",
      "title": "Ketuk Pasangan dengan Sisa",
      "bookReference": "hlm. 46–55 (sisa benda)",
      "objective": "Menemukan pasangan kumpulan yang sisanya sama dengan bilangan yang diminta.. Ingat Pengurangan Bersusun. (Pengurangan Bersusun)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga pasangan dan dua pertanyaan. Siswa mengetuk pasangan yang sisanya sama dengan bilangan yang disebut. Gunakan Pengurangan Bersusun.",
      "voiceGuide": "Pengurangan Bersusun. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-borrow",
      "title": "Ketuk Semua yang Perlu Mengambil",
      "bookReference": "hlm. 49–50 (5 < 9, pindahkan 1 puluhan ke satuan)",
      "objective": "Menemukan semua pasangan yang satuannya perlu mengambil satu puluhan (atau yang tidak).. Ingat Pengurangan Bersusun. (Pengurangan Bersusun)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat pasangan dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. Gunakan Pengurangan Bersusun.",
      "voiceGuide": "Pengurangan Bersusun. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-subtract",
      "title": "Cerita Pengurangan",
      "bookReference": "hlm. 46 dan 49 (permen Galih; buku tulis Pak Bandi)",
      "objective": "Menyelesaikan soal cerita pengurangan dengan gambar kumpulan.. Ingat Pengurangan Bersusun. (Pengurangan Bersusun)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita, melihat gambar kumpulan yang diambil, lalu memilih sisanya. Gunakan Pengurangan Bersusun.",
      "voiceGuide": "Pengurangan Bersusun. Mainkan dengan teliti.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "board-diff-collection",
      "title": "Papan Sisa Kumpulan",
      "bookReference": "hlm. 47–48 (tabel puluhan dan satuan hasil pengurangan)",
      "objective": "Menulis sisa sebuah kumpulan pada papan puluhan dan satuan.. Ingat Pengurangan Bersusun. (Pengurangan Bersusun)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa menghitung sisa kumpulan, lalu mengatur angka puluhan dan satuan pada papan dan menekan Periksa. Gunakan Pengurangan Bersusun.",
      "voiceGuide": "Pengurangan Bersusun. Mainkan dengan teliti.",
      "emoji": "🗂️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-diffs",
      "title": "Urutkan Pasangan menurut Sisa",
      "bookReference": "hlm. 46–55 (membandingkan hasil)",
      "objective": "Mengurutkan tiga pasangan kumpulan menurut sisanya.. Ingat Pengurangan Bersusun. (Pengurangan Bersusun)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga pasangan bertanda huruf. Siswa mengetuk pasangan satu per satu dari sisa paling kecil atau paling besar. Gunakan Pengurangan Bersusun.",
      "voiceGuide": "Pengurangan Bersusun. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 9
    },
    {
      "stage": "Picture",
      "gameType": "subtract-vertical",
      "title": "Susun Kurang ke Bawah",
      "bookReference": "hlm. 47–48 dan 50–51 (langkah 1, 2, dan 3 cara susun pendek)",
      "objective": "Pakai Menghitung Naik: Naik dari yang dikurangi. Latihan: Mengurangkan dua bilangan dengan cara susun pendek langkah demi langkah, termasuk mengambil satu puluhan..",
      "mechanicDescription": "Tiga ronde, tiap ronde satu soal (25 − 12, 45 − 19, 60 − 35). Siswa menaruh bilangan pada kolom satuan, mengurangkan satuan, mengambil satu puluhan bila perlu, lalu mengurangkan puluhan. Saat bermain, ingat Menghitung Naik: Naik dari yang dikurangi.",
      "voiceGuide": "Menghitung Naik. Naik dari yang dikurangi.",
      "diagramType": "subtract-vertical",
      "numberA": 3,
      "numberB": 1
    },
    {
      "stage": "Picture",
      "gameType": "board-diff-numbers",
      "title": "Papan Hasil Pengurangan",
      "bookReference": "hlm. 57 (Ayo Berlatih 2: gunakan cara susun pendek)",
      "objective": "Pakai Menghitung Naik: Naik dari yang dikurangi. Latihan: Menulis hasil pengurangan pada papan puluhan dan satuan..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal (33 − 28, 42 − 36, 22 − 12, 98 − 21, dan seterusnya). Siswa mengatur angka puluhan dan satuan, lalu menekan Periksa. Saat bermain, ingat Menghitung Naik: Naik dari yang dikurangi.",
      "voiceGuide": "Menghitung Naik. Naik dari yang dikurangi.",
      "diagramType": "diff-board",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "count-models-diff",
      "title": "Hitung Model Pengurangan",
      "bookReference": "hlm. 47 dan 49 (tabel puluhan dan satuan)",
      "objective": "Pakai Menghitung Naik: Naik dari yang dikurangi. Latihan: Menghitung sisa dari model puluhan dan satuan yang dikurangi model lain..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Dua model blok puluhan dan satuan ditampilkan dengan tanda kurang. Siswa memilih satu dari tiga sisa. Saat bermain, ingat Menghitung Naik: Naik dari yang dikurangi.",
      "voiceGuide": "Menghitung Naik. Naik dari yang dikurangi.",
      "diagramType": "models-diff",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-models-diff",
      "title": "Jodohkan Model dan Sisa",
      "bookReference": "hlm. 46–55 (mengurangkan dua bilangan)",
      "objective": "Pakai Menghitung Naik: Naik dari yang dikurangi. Latihan: Menjodohkan pasangan model dengan sisanya..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga pasangan model dan tiga sisa. Siswa mengetuk pasangan, lalu mengetuk sisa yang cocok. Saat bermain, ingat Menghitung Naik: Naik dari yang dikurangi.",
      "voiceGuide": "Menghitung Naik. Naik dari yang dikurangi.",
      "diagramType": "models-match",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memory-models-diff",
      "title": "Memori Model dan Sisa",
      "bookReference": "hlm. 46–55 (mengurangkan dua bilangan)",
      "objective": "Mencocokkan pasangan model dengan sisanya lewat permainan memori.. Ingat Menghitung Naik. (Menghitung Naik)",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. Gunakan Menghitung Naik.",
      "voiceGuide": "Menghitung Naik. Mainkan dengan teliti.",
      "diagramType": "models-memory",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "fill-diff-table",
      "title": "Isi Tabel Hasil Pengurangan",
      "bookReference": "hlm. 57 (Ayo Berlatih 2)",
      "objective": "Melengkapi tabel soal pengurangan dan hasilnya.. Ingat Menghitung Naik. (Menghitung Naik)",
      "mechanicDescription": "Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu hasil yang tepat. Ada satu kartu pengecoh. Gunakan Menghitung Naik.",
      "voiceGuide": "Menghitung Naik. Mainkan dengan teliti.",
      "diagramType": "diff-table",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-borrow-models",
      "title": "Ketuk Semua yang Perlu Mengambil: Model",
      "bookReference": "hlm. 49–55 (mengambil satu puluhan)",
      "objective": "Menemukan semua soal yang satuannya perlu mengambil satu puluhan.. Ingat Menghitung Naik. (Menghitung Naik)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat soal bergambar model dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. Gunakan Menghitung Naik.",
      "voiceGuide": "Menghitung Naik. Mainkan dengan teliti.",
      "diagramType": "diff-select",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-subtraction-models",
      "title": "Pilah Soal Susun Pengurangan",
      "bookReference": "hlm. 49–55 (dengan mengambil dan tanpa mengambil)",
      "objective": "Memilah soal bergambar model menjadi yang perlu mengambil dan yang tanpa mengambil.. Ingat Menghitung Naik. (Menghitung Naik)",
      "mechanicDescription": "Tiga ronde, tiap ronde enam soal dan dua kotak. Siswa menyeret atau mengetuk soal ke kotak yang tepat. Gunakan Menghitung Naik.",
      "voiceGuide": "Menghitung Naik. Mainkan dengan teliti.",
      "diagramType": "diff-sort",
      "numberA": 3,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "long-form-subtract",
      "title": "Lengkapi Cara Panjang Pengurangan",
      "bookReference": "hlm. 48, 51–52, dan 56 (45 = 30 + 15; Ayo Berlatih 1)",
      "objective": "Melengkapi uraian puluhan dan satuan pada cara susun panjang pengurangan.. Ingat Menghitung Naik. (Menghitung Naik)",
      "mechanicDescription": "Tiga soal, tiap soal tiga kalimat, misalnya 45 = 30 + ... Siswa memilih satu dari tiga angka untuk bagian kosong. Gunakan Menghitung Naik.",
      "voiceGuide": "Menghitung Naik. Mainkan dengan teliti.",
      "diagramType": "long-form",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "order-subtract-steps",
      "title": "Urutkan Langkah Mengurangkan",
      "bookReference": "hlm. 47–55 (langkah 1, 2, dan 3)",
      "objective": "Mengurutkan langkah pengurangan bersusun dan susun panjang.. Ingat Menghitung Naik. (Menghitung Naik)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat langkah. Siswa mengetuk langkah satu per satu menurut urutan yang benar. Letak jawaban berpindah. Gunakan Menghitung Naik.",
      "voiceGuide": "Menghitung Naik. Mainkan dengan teliti.",
      "diagramType": "steps-order",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Abstract",
      "gameType": "subtract-vertical-abstract",
      "title": "Susun Kurang ke Bawah: Lambang",
      "bookReference": "hlm. 57 (Ayo Berlatih 2: cara susun pendek)",
      "objective": "Pakai Meminjam: Buka puluhan jadi sepuluh satuan. Latihan: Mengurangkan dua bilangan dengan susun pendek, termasuk mengambil satu puluhan..",
      "mechanicDescription": "Tiga ronde, tiap ronde satu soal (57 − 23, 84 − 39, 72 − 46). Siswa menyusun, mengurangkan satuan, mengambil satu puluhan bila perlu, lalu mengurangkan puluhan. Saat bermain, ingat Meminjam: Buka puluhan jadi sepuluh satuan.",
      "voiceGuide": "Meminjam. Buka puluhan jadi sepuluh satuan.",
      "symbolLarge": "57−23",
      "wordLarge": "SUSUN KE BAWAH",
      "mathNotation": "satuan • puluhan"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-difference",
      "title": "Pilih Selisihnya",
      "bookReference": "hlm. 57 (Ayo Berlatih 2 dan 3)",
      "objective": "Pakai Meminjam: Buka puluhan jadi sepuluh satuan. Latihan: Memilih hasil pengurangan dua bilangan dari tiga pilihan..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal (33 − 28, 42 − 36, 61 − 21, 80 − 12, dan seterusnya). Pengecoh lupa mengambil atau salah mengambil. Saat bermain, ingat Meminjam: Buka puluhan jadi sepuluh satuan.",
      "voiceGuide": "Meminjam. Buka puluhan jadi sepuluh satuan.",
      "symbolLarge": "42−36",
      "wordLarge": "PILIH HASIL",
      "mathNotation": "selisih"
    },
    {
      "stage": "Abstract",
      "gameType": "board-diff-abstract",
      "title": "Papan Selisih",
      "bookReference": "hlm. 57 (mengurangkan dua bilangan)",
      "objective": "Pakai Meminjam: Buka puluhan jadi sepuluh satuan. Latihan: Menulis hasil pengurangan pada papan puluhan dan satuan..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa mengatur angka puluhan dan satuan lalu menekan Periksa. Saat bermain, ingat Meminjam: Buka puluhan jadi sepuluh satuan.",
      "voiceGuide": "Meminjam. Buka puluhan jadi sepuluh satuan.",
      "symbolLarge": "64−17",
      "wordLarge": "PAPAN",
      "mathNotation": "puluhan • satuan"
    },
    {
      "stage": "Abstract",
      "gameType": "steps-difference",
      "title": "Satuan, Puluhan, Selisih",
      "bookReference": "hlm. 50–51 (kurangkan satuan, ambil 1 puluhan; kurangkan puluhan)",
      "objective": "Pakai Meminjam: Buka puluhan jadi sepuluh satuan. Latihan: Melengkapi langkah mengurangkan satuan, puluhan, dan hasil akhir..",
      "mechanicDescription": "Tiga soal, tiap soal tiga kalimat, misalnya satuan: 15 − 9 = ... Siswa memilih satu dari tiga angka. Saat bermain, ingat Meminjam: Buka puluhan jadi sepuluh satuan.",
      "voiceGuide": "Meminjam. Buka puluhan jadi sepuluh satuan.",
      "symbolLarge": "15−9",
      "wordLarge": "LANGKAH",
      "mathNotation": "satuan • puluhan • selisih"
    },
    {
      "stage": "Abstract",
      "gameType": "match-problem-diff",
      "title": "Jodohkan Soal dan Sisa",
      "bookReference": "hlm. 57 (soal dan hasil)",
      "objective": "Menjodohkan soal pengurangan dengan hasilnya.. Ingat Meminjam. (Meminjam)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga soal dan tiga hasil. Siswa mengetuk soal, lalu mengetuk hasil yang cocok. Gunakan Meminjam.",
      "voiceGuide": "Meminjam. Mainkan dengan teliti.",
      "symbolLarge": "45−19",
      "wordLarge": "JODOHKAN",
      "mathNotation": "soal • hasil"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-problem-diff",
      "title": "Memori Soal dan Sisa",
      "bookReference": "hlm. 57 (soal dan jawaban)",
      "objective": "Mencocokkan soal pengurangan dengan hasilnya lewat permainan memori.. Ingat Meminjam. (Meminjam)",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): soal dan hasil. Siswa membalik dua kartu dan mencari pasangannya. Gunakan Meminjam.",
      "voiceGuide": "Meminjam. Mainkan dengan teliti.",
      "symbolLarge": "37−12",
      "wordLarge": "MEMORI",
      "mathNotation": "soal • hasil"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-subtraction",
      "title": "Benar atau Salah: Pengurangan",
      "bookReference": "hlm. 57 (Ayo Berlatih 3: berilah tanda centang)",
      "objective": "Menilai pernyataan tentang cara mengurangkan dan hasilnya.. Ingat Meminjam. (Meminjam)",
      "mechanicDescription": "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan dihitung dari bilangan, dan tiap jawaban diberi penjelasan. Gunakan Meminjam.",
      "voiceGuide": "Meminjam. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "periksa dengan alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-subtraction",
      "title": "Detektif Pengurangan",
      "bookReference": "hlm. 46–55 (hasil dua bilangan)",
      "objective": "Menemukan bilangan hasil pengurangan dari dua petunjuk.. Ingat Meminjam. (Meminjam)",
      "mechanicDescription": "Empat soal. Siswa membaca petunjuk seperti hasil 45 − 19 dan kurang dari 30, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok. Gunakan Meminjam.",
      "voiceGuide": "Meminjam. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "dua petunjuk, satu jawaban"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-map-subtraction",
      "title": "Peta Konsep Pengurangan",
      "bookReference": "hlm. 2 (peta konsep: pengurangan bilangan cacah)",
      "objective": "Melengkapi peta konsep pengurangan bersusun dan susun panjang.. Ingat Meminjam. (Meminjam)",
      "mechanicDescription": "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. Gunakan Meminjam.",
      "voiceGuide": "Meminjam. Mainkan dengan teliti.",
      "symbolLarge": "⇄",
      "wordLarge": "PETA KONSEP",
      "mathNotation": "susun • ambil • selisih"
    },
    {
      "stage": "Abstract",
      "gameType": "story-subtract-numbers",
      "title": "Soal Cerita Pengurangan",
      "bookReference": "hlm. 57 (Ayo Berlatih 4: kerjakan soal cerita)",
      "objective": "Menyelesaikan soal cerita pengurangan sisa dan selisih.. Ingat Meminjam. (Meminjam)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita lalu memilih satu dari tiga hasil. Pengecoh lupa mengambil atau salah mengambil. Gunakan Meminjam.",
      "voiceGuide": "Meminjam. Mainkan dengan teliti.",
      "symbolLarge": "19−8",
      "wordLarge": "CERITA",
      "mathNotation": "sisa dan selisih"
    }
  ],
  "poin": [
    {
      "ikon": "📏",
      "nama": "Susun lurus",
      "isi": "puluhan dengan puluhan, satuan dengan satuan",
      "suara": "Pada pengurangan bersusun, puluhan lurus dengan puluhan dan satuan lurus dengan satuan."
    },
    {
      "ikon": "🌍",
      "nama": "Pengurangan Bersusun",
      "isi": "Dari satuan, pinjam jika perlu.",
      "suara": "Pengurangan Bersusun. Dari satuan, pinjam jika perlu."
    },
    {
      "ikon": "🌍",
      "nama": "Menghitung Naik",
      "isi": "Naik dari yang dikurangi.",
      "suara": "Menghitung Naik. Naik dari yang dikurangi."
    },
    {
      "ikon": "🌍",
      "nama": "Meminjam",
      "isi": "Buka puluhan jadi sepuluh satuan.",
      "suara": "Meminjam. Buka puluhan jadi sepuluh satuan."
    }
  ],
  "poinSuara": "Ingat: Pengurangan Bersusun, Menghitung Naik, Meminjam.",
  "cara": {
    "suara": "Cara mengurangkan. Susun lurus. Kurangkan satuan, ambil satu puluhan bila perlu. Kurangkan puluhan. Lalu periksa dengan penjumlahan.",
    "potongan": [
      {
        "teks": "susun lurus",
        "warna": "#BAE6FD"
      },
      {
        "teks": "satuan dulu",
        "warna": "#FECACA"
      },
      {
        "teks": "lalu puluhan",
        "warna": "#BFDBFE"
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
    "Kapan memakai Menghitung Naik?",
    "Apa bedanya dengan hanya menghafal tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Standard Subtraction",
      "namaId": "Pengurangan Bersusun",
      "asal": "Algorithms",
      "ringkas": "Dari satuan, pinjam jika perlu.",
      "tahap": [
        "Story",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Counting Up",
      "namaId": "Menghitung Naik",
      "asal": "Counting up",
      "ringkas": "Naik dari yang dikurangi.",
      "tahap": [
        "Picture",
        "Mind"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Regrouping",
      "namaId": "Meminjam",
      "asal": "Base-ten",
      "ringkas": "Buka puluhan jadi sepuluh satuan.",
      "tahap": [
        "Infografis",
        "Concrete"
      ]
    }
  ]
};

export const SUB_F31: SubBabNaskah = {
  "id": "F",
  "codeTitle": "Sub-Bab F (Perkalian sampai 100)",
  "fullTitle": "Sub-Bab F: Perkalian Bilangan Cacah sampai 100",
  "targetDescription": "Siswa memahami perkalian sebagai penjumlahan berulang dari kelompok yang sama banyak, menulis dan membaca perkalian (banyak kelompok dikali isi tiap kelompok), menghitung hasil perkalian sampai 100, memahami bahwa bilangan pada perkalian boleh ditukar tempatnya, serta menyelesaikan soal cerita perkalian. Siswa memakai cara Kelompok Sama, Susunan Baris Kolom, Lompat Hitung. Siswa memakai cara Kelompok Sama, Susunan Baris Kolom, Lompat Hitung.",
  "secondaryBg": "#FEF3C7",
  "secondaryBorder": "#D97706",
  "secondaryText": "#78350F",
  "silabus": {
    "teksSuara": "Kita belajar perkalian bilangan cacah sampai seratus. Ada lima kelompok pensil, tiap kelompok berisi dua pensil. Ada empat kelompok bunga melati, tiap kelompok berisi lima bunga. Perkalian adalah penjumlahan berulang dari kelompok yang sama banyak. Kita juga belajar bahwa lima kali enam sama dengan enam kali lima, dan menyelesaikan soal cerita. Kita memakai cara: Kelompok Sama, Susunan Baris Kolom, Lompat Hitung. Penjumlahan berulang. Baris × kolom. 2, 4, 6, … untuk kali 2. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa melakukan operasi perkalian dan pembagian bilangan cacah sampai 100. Pada sub-bab ini siswa memahami perkalian sebagai penjumlahan berulang, menulis perkalian, menghitung hasilnya, dan menyelesaikan soal cerita perkalian.",
    "referensi": "Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 1 Sub-Bab F)."
  },
  "videos": [
    {
      "id": "K3B1F-V1",
      "judul": "Pensil dan Bunga Melati",
      "subjudul": "Equal Groups",
      "adegan": [
        {
          "id": "K3B1F-V1-1",
          "judul": "Lima kelompok pensil",
          "ketukan": [
            "Bayangkan kamu sedang mempelajari Perkalian Bilangan Cacah sampai 100. Ada 5 kelompok pensil. Setiap kelompok berisi 2 pensil.",
            "Jumlah seluruhnya: 2 ditambah 2 ditambah 2 ditambah 2 ditambah 2.",
            "Penjumlahan berulang ini ditulis 5 kali 2.",
            "Ingat cara Kelompok Sama: Penjumlahan berulang. Ingat cara Kelompok Sama: Penjumlahan berulang."
          ],
          "papan": [
            "5 kelompok pensil",
            "2 + 2 + 2 + 2 + 2",
            "5 × 2",
            "= 10 pensil"
          ]
        },
        {
          "id": "K3B1F-V1-2",
          "judul": "Empat kelompok melati",
          "ketukan": [
            "Ada 4 kelompok bunga melati. Setiap kelompok berisi 5 bunga.",
            "Jadi, jumlahnya 4 × 5 bunga melati.",
            "Lima ditambah lima ditambah lima ditambah lima sama dengan 20.",
            "Di sini kita memakai ide Equal Groups — Penjumlahan berulang. Di sini kita memakai Equal Groups. Penjumlahan berulang."
          ],
          "papan": [
            "4 kelompok melati",
            "4 × 5",
            "5 + 5 + 5 + 5",
            "= 20 bunga"
          ]
        },
        {
          "id": "K3B1F-V1-3",
          "judul": "Membaca perkalian",
          "ketukan": [
            "Pada 4 × 5, bilangan 4 adalah banyak kelompok.",
            "Bilangan 5 adalah isi tiap kelompok.",
            "Perkalian adalah penjumlahan berulang dari bilangan yang sama.",
            "METODE LUAR · Kelompok Sama: Penjumlahan berulang."
          ],
          "papan": [
            "Banyak kelompok",
            "Isi tiap kelompok",
            "Penjumlahan berulang",
            "kelompok × isi = jumlah"
          ]
        }
      ]
    },
    {
      "id": "K3B1F-V2",
      "judul": "Latihan: Susunan Baris Kolom",
      "subjudul": "Array",
      "adegan": [
        {
          "id": "K3B1F-V2-1",
          "judul": "Lima kelompok mobil",
          "ketukan": [
            "Mobil mainan disusun dalam 5 kelompok.",
            "Setiap kelompok berisi 6 mobil mainan.",
            "6 + 6 + 6 + 6 + 6 = 30, atau 5 × 6 = 30.",
            "Ingat cara Susunan Baris Kolom: Baris × kolom. Ingat cara Susunan Baris Kolom: Baris × kolom."
          ],
          "papan": [
            "5 kelompok mobil",
            "Tiap kelompok 6",
            "5 × 6",
            "= 30"
          ]
        },
        {
          "id": "K3B1F-V2-2",
          "judul": "Enam kelompok mobil",
          "ketukan": [
            "Sekarang mobil yang sama dijadikan 6 kelompok.",
            "Setiap kelompok berisi 5 mobil mainan.",
            "5 + 5 + 5 + 5 + 5 + 5 = 30, atau 6 × 5 = 30.",
            "Di sini kita memakai ide Array — Baris × kolom. Di sini kita memakai Array. Baris × kolom."
          ],
          "papan": [
            "6 kelompok mobil",
            "Tiap kelompok 5",
            "6 × 5",
            "= 30"
          ]
        },
        {
          "id": "K3B1F-V2-3",
          "judul": "Tukar tempat",
          "ketukan": [
            "5 × 6 sama dengan 30, dan 6 × 5 juga sama dengan 30.",
            "Jadi, 5 × 6 sama dengan 6 × 5.",
            "Bilangan pada perkalian boleh ditukar tempatnya.",
            "METODE LUAR · Susunan Baris Kolom: Baris × kolom."
          ],
          "papan": [
            "5 × 6 = 30",
            "6 × 5 = 30",
            "5 × 6 = 6 × 5",
            "Boleh ditukar"
          ]
        }
      ]
    },
    {
      "id": "K3B1F-V3",
      "judul": "Siap pakai Skip Counting",
      "subjudul": "Skip Counting",
      "adegan": [
        {
          "id": "K3B1F-V3-1",
          "judul": "Siapkan gelas dan kerikil",
          "ketukan": [
            "Siapkan 5 gelas plastik bekas dan 40 batu kerikil.",
            "Masukkan 4 batu kerikil ke dalam setiap gelas.",
            "Ada 5 gelas, dan tiap gelas berisi 4 kerikil.",
            "Ingat cara Lompat Hitung: 2, 4, 6, … untuk kali 2. Ingat cara Lompat Hitung: 2, 4, 6, … untuk kali 2."
          ],
          "papan": [
            "5 gelas",
            "Tiap gelas 4 kerikil",
            "40 kerikil disiapkan",
            "Berapa kerikil?"
          ]
        },
        {
          "id": "K3B1F-V3-2",
          "judul": "Jumlahkan kerikil",
          "ketukan": [
            "Jumlahkan: 4 + 4 + 4 + 4 + 4 = 20 kerikil.",
            "Kita bisa menulisnya sebagai banyak gelas dikali banyak kerikil tiap gelas.",
            "Jadi, 5 × 4 = 20 kerikil.",
            "Di sini kita memakai ide Skip Counting — 2, 4, 6, … untuk kali 2. Di sini kita memakai Skip Counting. 2, 4, 6, … untuk kali 2."
          ],
          "papan": [
            "4 + 4 + 4 + 4 + 4",
            "gelas × kerikil",
            "5 × 4 = 20",
            "20 kerikil"
          ]
        },
        {
          "id": "K3B1F-V3-3",
          "judul": "Ulangi dengan 4 gelas",
          "ketukan": [
            "Ulangi dengan 4 gelas, dan tiap gelas berisi 7 kerikil.",
            "Jumlahkan: 7 + 7 + 7 + 7 = 28.",
            "Ditulis dengan perkalian 4 × 7 = 28.",
            "METODE LUAR · Lompat Hitung: 2, 4, 6, … untuk kali 2."
          ],
          "papan": [
            "4 gelas, tiap gelas 7",
            "7 + 7 + 7 + 7",
            "4 × 7 = 28",
            "Penjumlahan berulang"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Apa yang ditanyakan pada Perkalian Bilangan Cacah sampai 100?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Equal Groups",
      "stepDesc": "Penjumlahan berulang.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Array",
      "stepDesc": "Baris × kolom.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Skip Counting",
      "stepDesc": "2, 4, 6, … untuk kali 2.",
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
      "judul": "Kelompok Sama Banyak",
      "emoji": "🍽️",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Perkalian dipakai bila ada beberapa kelompok yang isinya sama banyak. Tiap kelompok harus sama banyak."
    },
    {
      "judul": "5 × 2 = 10",
      "emoji": "✏️",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Lima kelompok pensil, tiap kelompok berisi dua pensil. Dua tambah dua tambah dua tambah dua tambah dua sama dengan sepuluh. Jadi, lima kali dua sama dengan sepuluh."
    },
    {
      "judul": "Penjumlahan Berulang",
      "emoji": "➕",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Perkalian adalah penjumlahan berulang dari bilangan yang sama. Empat kali lima sama dengan lima tambah lima tambah lima tambah lima."
    },
    {
      "judul": "4 × 5 = 20",
      "emoji": "🌼",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Empat kelompok bunga melati, tiap kelompok berisi lima bunga. Empat kali lima sama dengan dua puluh bunga melati."
    },
    {
      "judul": "Banyak Kelompok dan Isi",
      "emoji": "👥",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Pada perkalian, bilangan pertama menyatakan banyak kelompok dan bilangan kedua menyatakan isi tiap kelompok."
    },
    {
      "judul": "Garis Bilangan",
      "emoji": "📏",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Empat loncatan sebesar lima dari nol mendarat di dua puluh. Jadi, empat kali lima sama dengan dua puluh."
    },
    {
      "judul": "Tukar Tempat",
      "emoji": "🔄",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Lima kali enam sama dengan tiga puluh, dan enam kali lima juga sama dengan tiga puluh. Bilangan pada perkalian boleh ditukar tempatnya."
    },
    {
      "judul": "5 × 4 = 20",
      "emoji": "🥛",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Lima gelas, tiap gelas berisi empat batu kerikil. Lima kali empat sama dengan dua puluh kerikil."
    },
    {
      "judul": "Soal Cerita",
      "emoji": "📖",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Soal cerita menyebut banyak kelompok dan isi tiap kelompok. Tulis kalimat perkaliannya, hitung, lalu tulis jawabannya dengan satuan."
    },
    {
      "judul": "Cara Mengalikan",
      "emoji": "📝",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Empat langkah. Satu, cari banyak kelompok. Dua, cari isi tiap kelompok. Tiga, tulis perkalian atau penjumlahan berulang. Empat, hitung hasilnya."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "build-groups",
      "title": "Rakit Kelompok",
      "bookReference": "hlm. 58–60 (5 kelompok pensil; 4 kelompok melati)",
      "objective": "Pakai Kelompok Sama: Penjumlahan berulang. Latihan: Menambah kelompok yang isinya sama sampai jumlah seluruhnya sama dengan yang diminta..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca isi tiap piring dan jumlah yang diminta, lalu menambah atau mengurangi piring. Kalimat penjumlahan berulang ikut bertambah panjang. Saat bermain, ingat Kelompok Sama: Penjumlahan berulang.",
      "voiceGuide": "Kelompok Sama. Penjumlahan berulang.",
      "emoji": "🍽️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "count-groups",
      "title": "Hitung Kelompok",
      "bookReference": "hlm. 58–60 (kelompok pensil, melati, dan mobil mainan)",
      "objective": "Pakai Kelompok Sama: Penjumlahan berulang. Latihan: Menghitung jumlah seluruh benda pada beberapa kelompok yang sama banyak dan memilih hasilnya..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Gambar piring-piring berisi benda ditampilkan. Siswa memilih satu dari tiga jumlah seluruhnya. Saat bermain, ingat Kelompok Sama: Penjumlahan berulang.",
      "voiceGuide": "Kelompok Sama. Penjumlahan berulang.",
      "emoji": "🧺",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "write-repeated",
      "title": "Tulis Penjumlahan Berulang",
      "bookReference": "hlm. 58–59 (2 + 2 + 2 + 2 + 2 = 10)",
      "objective": "Pakai Kelompok Sama: Penjumlahan berulang. Latihan: Memilih kalimat penjumlahan berulang yang sesuai dengan gambar kelompok..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa melihat gambar kelompok, lalu memilih satu dari tiga kalimat penjumlahan berulang. Pengecoh salah banyak kelompok. Saat bermain, ingat Kelompok Sama: Penjumlahan berulang.",
      "voiceGuide": "Kelompok Sama. Penjumlahan berulang.",
      "emoji": "➕",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "match-group-product",
      "title": "Jodohkan Kelompok dan Perkalian",
      "bookReference": "hlm. 58–61 (menulis perkalian)",
      "objective": "Pakai Kelompok Sama: Penjumlahan berulang. Latihan: Menjodohkan gambar kelompok dengan kalimat perkaliannya..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga gambar kelompok dan tiga perkalian. Siswa mengetuk gambar, lalu mengetuk perkalian yang cocok. Saat bermain, ingat Kelompok Sama: Penjumlahan berulang.",
      "voiceGuide": "Kelompok Sama. Penjumlahan berulang.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "memory-group-product",
      "title": "Memori Kelompok dan Hasil",
      "bookReference": "hlm. 58–61 (jumlah seluruhnya)",
      "objective": "Mencocokkan gambar kelompok dengan jumlah seluruhnya lewat permainan memori.. Ingat Kelompok Sama. (Kelompok Sama)",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): gambar kelompok dan hasilnya. Siswa membalik dua kartu dan mencari pasangannya. Gunakan Kelompok Sama.",
      "voiceGuide": "Kelompok Sama. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-group-total",
      "title": "Ketuk Kelompok dengan Jumlah",
      "bookReference": "hlm. 58–61 (jumlah seluruh benda)",
      "objective": "Menemukan gambar kelompok yang jumlahnya sama dengan bilangan yang diminta.. Ingat Kelompok Sama. (Kelompok Sama)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga gambar kelompok dan dua pertanyaan. Siswa mengetuk gambar yang jumlahnya sama dengan bilangan yang disebut. Gunakan Kelompok Sama.",
      "voiceGuide": "Kelompok Sama. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-compare",
      "title": "Ketuk Semua yang Lebih atau Kurang",
      "bookReference": "hlm. 58–61 (membandingkan jumlah seluruhnya)",
      "objective": "Menemukan semua kelompok yang jumlah seluruhnya lebih atau kurang dari bilangan acuan.. Ingat Kelompok Sama. (Kelompok Sama)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat gambar kelompok dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. Gunakan Kelompok Sama.",
      "voiceGuide": "Kelompok Sama. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "swap-groups",
      "title": "Tukar Tempat Kelompok",
      "bookReference": "hlm. 59–60 (5 × 6 = 6 × 5)",
      "objective": "Membandingkan dua susunan kelompok dan menyadari bahwa menukar tempat bilangan tidak mengubah jumlah.. Ingat Kelompok Sama. (Kelompok Sama)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Dua susunan piring ditampilkan. Siswa memilih susunan yang lebih banyak atau menyatakan keduanya sama banyak. Gunakan Kelompok Sama.",
      "voiceGuide": "Kelompok Sama. Mainkan dengan teliti.",
      "emoji": "🔄",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "board-group-total",
      "title": "Papan Hasil Kelompok",
      "bookReference": "hlm. 60–61 (Aktivitas 4: 5 × 4 = 20)",
      "objective": "Menulis jumlah seluruh benda pada papan puluhan dan satuan.. Ingat Kelompok Sama. (Kelompok Sama)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa menghitung jumlah seluruhnya, lalu mengatur angka puluhan dan satuan pada papan dan menekan Periksa. Gunakan Kelompok Sama.",
      "voiceGuide": "Kelompok Sama. Mainkan dengan teliti.",
      "emoji": "🗂️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-groups",
      "title": "Urutkan Kelompok menurut Jumlah",
      "bookReference": "hlm. 58–61 (membandingkan hasil)",
      "objective": "Mengurutkan tiga gambar kelompok menurut jumlahnya.. Ingat Kelompok Sama. (Kelompok Sama)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga gambar kelompok bertanda huruf. Siswa mengetuk gambar satu per satu dari jumlah paling kecil atau paling besar. Gunakan Kelompok Sama.",
      "voiceGuide": "Kelompok Sama. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 9
    },
    {
      "stage": "Picture",
      "gameType": "count-dot-groups",
      "title": "Hitung Titik Berkelompok",
      "bookReference": "hlm. 58–59 (menghitung kelompok yang sama banyak)",
      "objective": "Pakai Susunan Baris Kolom: Baris × kolom. Latihan: Menghitung jumlah titik pada beberapa kotak yang sama banyak..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Kotak-kotak berisi titik polos ditampilkan. Siswa memilih satu dari tiga jumlah titik. Saat bermain, ingat Susunan Baris Kolom: Baris × kolom.",
      "voiceGuide": "Susunan Baris Kolom. Baris × kolom.",
      "diagramType": "dot-groups",
      "numberA": 5,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "complete-product-sentence",
      "title": "Lengkapi Kalimat Perkalian",
      "bookReference": "hlm. 61–62 (Ayo Berlatih 1: isilah titik-titik)",
      "objective": "Pakai Susunan Baris Kolom: Baris × kolom. Latihan: Melengkapi penjumlahan berulang, perkalian, dan perkalian yang ditukar tempat..",
      "mechanicDescription": "Tiga soal, tiap soal tiga kalimat, misalnya 5 × 2 = ... Siswa memilih satu dari tiga angka untuk bagian kosong. Saat bermain, ingat Susunan Baris Kolom: Baris × kolom.",
      "voiceGuide": "Susunan Baris Kolom. Baris × kolom.",
      "diagramType": "product-sentence",
      "numberA": 4,
      "numberB": 5
    },
    {
      "stage": "Picture",
      "gameType": "match-dots-product",
      "title": "Jodohkan Titik dan Perkalian",
      "bookReference": "hlm. 61–62 (Ayo Berlatih 1)",
      "objective": "Pakai Susunan Baris Kolom: Baris × kolom. Latihan: Menjodohkan gambar kotak titik dengan kalimat perkaliannya..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga gambar dan tiga perkalian. Siswa mengetuk gambar, lalu mengetuk perkalian yang cocok. Saat bermain, ingat Susunan Baris Kolom: Baris × kolom.",
      "voiceGuide": "Susunan Baris Kolom. Baris × kolom.",
      "diagramType": "dots-match",
      "numberA": 4,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memory-dots-product",
      "title": "Memori Titik dan Hasil",
      "bookReference": "hlm. 58–62 (jumlah seluruhnya)",
      "objective": "Pakai Susunan Baris Kolom: Baris × kolom. Latihan: Mencocokkan gambar kotak titik dengan hasilnya lewat permainan memori..",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. Saat bermain, ingat Susunan Baris Kolom: Baris × kolom.",
      "voiceGuide": "Susunan Baris Kolom. Baris × kolom.",
      "diagramType": "dots-memory",
      "numberA": 4,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "number-line-jumps",
      "title": "Loncatan pada Garis Bilangan",
      "bookReference": "hlm. 58–61 (penjumlahan berulang sebagai loncatan)",
      "objective": "Menentukan titik pendaratan setelah beberapa loncatan sama besar dari nol.. Ingat Susunan Baris Kolom. (Susunan Baris Kolom)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Garis bilangan enam titik ditampilkan. Siswa mengetuk titik tempat loncatan terakhir mendarat. Gunakan Susunan Baris Kolom.",
      "voiceGuide": "Susunan Baris Kolom. Mainkan dengan teliti.",
      "diagramType": "number-line",
      "numberA": 4,
      "numberB": 5
    },
    {
      "stage": "Picture",
      "gameType": "fill-product-table",
      "title": "Isi Tabel Perkalian",
      "bookReference": "hlm. 63 (Ayo Berlatih 3: hitunglah hasil perkalian)",
      "objective": "Melengkapi tabel soal perkalian dan hasilnya.. Ingat Susunan Baris Kolom. (Susunan Baris Kolom)",
      "mechanicDescription": "Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu hasil yang tepat. Ada satu kartu pengecoh. Gunakan Susunan Baris Kolom.",
      "voiceGuide": "Susunan Baris Kolom. Mainkan dengan teliti.",
      "diagramType": "product-table",
      "numberA": 4,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-dots-compare",
      "title": "Ketuk Semua yang Lebih atau Kurang: Titik",
      "bookReference": "hlm. 58–62 (membandingkan jumlah seluruhnya)",
      "objective": "Menemukan semua gambar kotak titik yang jumlahnya lebih atau kurang dari bilangan acuan.. Ingat Susunan Baris Kolom. (Susunan Baris Kolom)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat gambar dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. Gunakan Susunan Baris Kolom.",
      "voiceGuide": "Susunan Baris Kolom. Mainkan dengan teliti.",
      "diagramType": "dots-select",
      "numberA": 4,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-dot-groups",
      "title": "Pilah Gambar: Kurang dari 20 atau Lebih",
      "bookReference": "hlm. 58–62 (membandingkan jumlah seluruhnya)",
      "objective": "Memilah gambar kotak titik menjadi yang jumlahnya kurang dari 20 dan yang 20 atau lebih.. Ingat Susunan Baris Kolom. (Susunan Baris Kolom)",
      "mechanicDescription": "Tiga ronde, tiap ronde enam gambar dan dua kotak. Siswa menyeret atau mengetuk gambar ke kotak yang tepat. Gunakan Susunan Baris Kolom.",
      "voiceGuide": "Susunan Baris Kolom. Mainkan dengan teliti.",
      "diagramType": "dots-sort",
      "numberA": 4,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "swap-factor",
      "title": "Tukar Faktor",
      "bookReference": "hlm. 59–60 (5 × 6 = 6 × 5)",
      "objective": "Menentukan bilangan yang tepat bila dua bilangan pada perkalian ditukar tempatnya.. Ingat Susunan Baris Kolom. (Susunan Baris Kolom)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal, misalnya 4 × 6 = 6 × ... Siswa memilih satu dari tiga bilangan. Gunakan Susunan Baris Kolom.",
      "voiceGuide": "Susunan Baris Kolom. Mainkan dengan teliti.",
      "diagramType": "swap-factor",
      "numberA": 4,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "build-dot-boxes",
      "title": "Rakit Kotak Titik",
      "bookReference": "hlm. 58–61 (kelompok yang sama banyak)",
      "objective": "Menambah kotak berisi titik yang sama sampai jumlah seluruhnya sama dengan yang diminta.. Ingat Susunan Baris Kolom. (Susunan Baris Kolom)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca isi tiap kotak dan jumlah yang diminta, lalu menambah atau mengurangi kotak. Kalimat penjumlahan berulang ikut bertambah. Gunakan Susunan Baris Kolom.",
      "voiceGuide": "Susunan Baris Kolom. Mainkan dengan teliti.",
      "diagramType": "build-boxes",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Abstract",
      "gameType": "repeated-to-product",
      "title": "Dari Penjumlahan ke Perkalian",
      "bookReference": "hlm. 63 (Ayo Berlatih 2: isilah titik-titik dengan pilihan jawaban)",
      "objective": "Pakai Lompat Hitung: 2, 4, 6, … untuk kali 2. Latihan: Menyatakan penjumlahan berulang sebagai perkalian dan menghitung hasilnya..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal, misalnya 5 + 5 + 5 + 5 + 5 + 5 + 5 = ... Siswa memilih satu dari tiga hasil. Saat bermain, ingat Lompat Hitung: 2, 4, 6, … untuk kali 2.",
      "voiceGuide": "Lompat Hitung. 2, 4, 6, … untuk kali 2.",
      "symbolLarge": "7×5",
      "wordLarge": "KALI",
      "mathNotation": "penjumlahan berulang"
    },
    {
      "stage": "Abstract",
      "gameType": "compute-product",
      "title": "Hitung Hasil Kali",
      "bookReference": "hlm. 63 (Ayo Berlatih 3: hitunglah hasil perkalian)",
      "objective": "Pakai Lompat Hitung: 2, 4, 6, … untuk kali 2. Latihan: Menghitung hasil perkalian dua bilangan dan memilihnya dari tiga pilihan..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal (3 × 4, 5 × 7, 7 × 8, 9 × 7, dan seterusnya). Pengecoh salah satu kelompok. Saat bermain, ingat Lompat Hitung: 2, 4, 6, … untuk kali 2.",
      "voiceGuide": "Lompat Hitung. 2, 4, 6, … untuk kali 2.",
      "symbolLarge": "3×4",
      "wordLarge": "HASIL KALI",
      "mathNotation": "kelompok × isi"
    },
    {
      "stage": "Abstract",
      "gameType": "board-product",
      "title": "Papan Hasil Kali",
      "bookReference": "hlm. 63 (menghitung hasil perkalian)",
      "objective": "Pakai Lompat Hitung: 2, 4, 6, … untuk kali 2. Latihan: Menulis hasil perkalian pada papan puluhan dan satuan..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa mengatur angka puluhan dan satuan lalu menekan Periksa. Saat bermain, ingat Lompat Hitung: 2, 4, 6, … untuk kali 2.",
      "voiceGuide": "Lompat Hitung. 2, 4, 6, … untuk kali 2.",
      "symbolLarge": "6×7",
      "wordLarge": "PAPAN",
      "mathNotation": "puluhan • satuan"
    },
    {
      "stage": "Abstract",
      "gameType": "match-sum-product",
      "title": "Jodohkan Penjumlahan dan Perkalian",
      "bookReference": "hlm. 63 (Ayo Berlatih 2: 8 × 9 dan 9 × 8)",
      "objective": "Pakai Lompat Hitung: 2, 4, 6, … untuk kali 2. Latihan: Menjodohkan penjumlahan berulang dengan perkaliannya..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga penjumlahan berulang dan tiga perkalian. Siswa mengetuk penjumlahan, lalu mengetuk perkalian yang cocok. Saat bermain, ingat Lompat Hitung: 2, 4, 6, … untuk kali 2.",
      "voiceGuide": "Lompat Hitung. 2, 4, 6, … untuk kali 2.",
      "symbolLarge": "5+5+5",
      "wordLarge": "JODOHKAN",
      "mathNotation": "tambah • kali"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-product",
      "title": "Memori Perkalian dan Hasil",
      "bookReference": "hlm. 63 (soal dan jawaban)",
      "objective": "Mencocokkan perkalian dengan hasilnya lewat permainan memori.. Ingat Lompat Hitung. (Lompat Hitung)",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): perkalian dan hasil. Siswa membalik dua kartu dan mencari pasangannya. Gunakan Lompat Hitung.",
      "voiceGuide": "Lompat Hitung. Mainkan dengan teliti.",
      "symbolLarge": "5×7",
      "wordLarge": "MEMORI",
      "mathNotation": "soal • hasil"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-product",
      "title": "Benar atau Salah: Perkalian",
      "bookReference": "hlm. 58–63 (perkalian dan penjumlahan berulang)",
      "objective": "Menilai pernyataan tentang perkalian dan hasilnya.. Ingat Lompat Hitung. (Lompat Hitung)",
      "mechanicDescription": "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan dihitung dari bilangan, dan tiap jawaban diberi penjelasan. Gunakan Lompat Hitung.",
      "voiceGuide": "Lompat Hitung. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "periksa dengan alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-product",
      "title": "Detektif Perkalian",
      "bookReference": "hlm. 58–63 (hasil perkalian)",
      "objective": "Menemukan bilangan hasil perkalian dari dua petunjuk.. Ingat Lompat Hitung. (Lompat Hitung)",
      "mechanicDescription": "Empat soal. Siswa membaca petunjuk seperti hasil 7 × 8 dan lebih dari 50, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok. Gunakan Lompat Hitung.",
      "voiceGuide": "Lompat Hitung. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "dua petunjuk, satu jawaban"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-map-product",
      "title": "Peta Konsep Perkalian",
      "bookReference": "hlm. 2 (peta konsep: perkalian bilangan cacah)",
      "objective": "Melengkapi peta konsep perkalian dan tukar tempat.. Ingat Lompat Hitung. (Lompat Hitung)",
      "mechanicDescription": "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. Gunakan Lompat Hitung.",
      "voiceGuide": "Lompat Hitung. Mainkan dengan teliti.",
      "symbolLarge": "⇄",
      "wordLarge": "PETA KONSEP",
      "mathNotation": "kali • tukar tempat"
    },
    {
      "stage": "Abstract",
      "gameType": "story-product",
      "title": "Soal Cerita Perkalian",
      "bookReference": "hlm. 63 (Ayo Berlatih 4 dan 5: soal cerita)",
      "objective": "Menyelesaikan soal cerita perkalian banyak kelompok dan isi tiap kelompok.. Ingat Lompat Hitung. (Lompat Hitung)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita lalu memilih satu dari tiga hasil. Pengecoh salah satu kelompok. Gunakan Lompat Hitung.",
      "voiceGuide": "Lompat Hitung. Mainkan dengan teliti.",
      "symbolLarge": "6×2",
      "wordLarge": "CERITA",
      "mathNotation": "kelompok × isi"
    },
    {
      "stage": "Abstract",
      "gameType": "sentence-product",
      "title": "Susun Kata Perkalian",
      "bookReference": "hlm. 58–61 (pengertian perkalian)",
      "objective": "Menyusun kalimat tentang perkalian dari kartu kata.. Ingat Lompat Hitung. (Lompat Hitung)",
      "mechanicDescription": "Empat kalimat. Siswa mengetuk kartu kata satu per satu menurut urutan kalimat yang benar. Ada satu kartu pengecoh. Gunakan Lompat Hitung.",
      "voiceGuide": "Lompat Hitung. Mainkan dengan teliti.",
      "symbolLarge": "×",
      "wordLarge": "SUSUN KATA",
      "mathNotation": "kalimat perkalian"
    }
  ],
  "poin": [
    {
      "ikon": "🍽️",
      "nama": "Kelompok sama banyak",
      "isi": "tiap kelompok berisi sama banyak",
      "suara": "Perkalian dipakai bila ada beberapa kelompok yang isinya sama banyak."
    },
    {
      "ikon": "🌍",
      "nama": "Kelompok Sama",
      "isi": "Penjumlahan berulang.",
      "suara": "Kelompok Sama. Penjumlahan berulang."
    },
    {
      "ikon": "🌍",
      "nama": "Susunan Baris Kolom",
      "isi": "Baris × kolom.",
      "suara": "Susunan Baris Kolom. Baris × kolom."
    },
    {
      "ikon": "🌍",
      "nama": "Lompat Hitung",
      "isi": "2, 4, 6, … untuk kali 2.",
      "suara": "Lompat Hitung. 2, 4, 6, … untuk kali 2."
    }
  ],
  "poinSuara": "Ingat: Kelompok Sama, Susunan Baris Kolom, Lompat Hitung.",
  "cara": {
    "suara": "Cara mengalikan. Cari banyak kelompok. Cari isi tiap kelompok. Tulis perkalian atau penjumlahan berulang. Lalu hitung hasilnya.",
    "potongan": [
      {
        "teks": "banyak kelompok",
        "warna": "#BAE6FD"
      },
      {
        "teks": "isi tiap kelompok",
        "warna": "#FECACA"
      },
      {
        "teks": "tulis perkalian",
        "warna": "#BFDBFE"
      },
      {
        "teks": "hitung hasil",
        "warna": "#FDE68A"
      }
    ]
  },
  "rumah": "Ayo Mencoba: terapkan Kelompok Sama pada satu soal nyata di rumah.",
  "refleksi": [
    "Bagaimana Kelompok Sama membantumu?",
    "Kapan memakai Susunan Baris Kolom?",
    "Apa bedanya dengan hanya menghafal tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Equal Groups",
      "namaId": "Kelompok Sama",
      "asal": "Multiplication",
      "ringkas": "Penjumlahan berulang.",
      "tahap": [
        "Story",
        "Concrete"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Array",
      "namaId": "Susunan Baris Kolom",
      "asal": "Van de Walle",
      "ringkas": "Baris × kolom.",
      "tahap": [
        "Picture",
        "Mind"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Skip Counting",
      "namaId": "Lompat Hitung",
      "asal": "Basic facts",
      "ringkas": "2, 4, 6, … untuk kali 2.",
      "tahap": [
        "Abstract",
        "Infografis"
      ]
    }
  ]
};

export const SUB_G31: SubBabNaskah = {
  "id": "G",
  "codeTitle": "Sub-Bab G (Pembagian sampai 100)",
  "fullTitle": "Sub-Bab G: Pembagian Bilangan Cacah sampai 100",
  "targetDescription": "Siswa memahami pembagian sebagai pengurangan berulang sampai habis dan sebagai membagi sama banyak, menulis dan membaca pembagian (bilangan yang dibagi, pembagi, hasil bagi), memahami hubungan perkalian dan pembagian, menghitung pembagian sampai 100, serta menyelesaikan soal cerita pembagian. Siswa memakai cara Bagi Rata, Kurang Berulang, Keluarga Fakta. Siswa memakai cara Bagi Rata, Kurang Berulang, Keluarga Fakta.",
  "secondaryBg": "#DCFCE7",
  "secondaryBorder": "#16A34A",
  "secondaryText": "#14532D",
  "silabus": {
    "teksSuara": "Kita belajar pembagian bilangan cacah sampai seratus. Ibu punya dua belas biskuit dan membaginya sama banyak. Ketua kelompok punya lima belas manik-manik dan membagikannya kepada tiga anggota. Pembagian adalah pengurangan berulang sampai habis. Kita juga belajar bahwa pembagian dan perkalian saling berkaitan, lalu menyelesaikan soal cerita. Kita memakai cara: Bagi Rata, Kurang Berulang, Keluarga Fakta. Bagi ke kelompok sama. Kurangi berulang sampai habis. Kali dan bagi saling terkait. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa melakukan operasi perkalian dan pembagian bilangan cacah sampai 100. Pada sub-bab ini siswa memahami pembagian sebagai pengurangan berulang, menulis pembagian, menghitung hasilnya, menghubungkannya dengan perkalian, dan menyelesaikan soal cerita pembagian.",
    "referensi": "Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 1 Sub-Bab G)."
  },
  "videos": [
    {
      "id": "K3B1G-V1",
      "judul": "Biskuit Ibu",
      "subjudul": "Fair Share",
      "adegan": [
        {
          "id": "K3B1G-V1-1",
          "judul": "Bagi biskuit",
          "ketukan": [
            "Bayangkan kamu sedang mempelajari Pembagian Bilangan Cacah sampai 100. Ibu mempunyai 12 biskuit di dalam toples.",
            "Ibu akan membagikannya sama banyak kepada anak-anaknya.",
            "Berapa biskuit yang didapat oleh setiap anak.",
            "Ingat cara Bagi Rata: Bagi ke kelompok sama. Ingat cara Bagi Rata: Bagi ke kelompok sama."
          ],
          "papan": [
            "Ibu punya 12 biskuit",
            "Dibagi sama banyak",
            "Tiap anak dapat berapa?",
            "12 − 2 − 2 − ..."
          ]
        },
        {
          "id": "K3B1G-V1-2",
          "judul": "Kurangi berulang",
          "ketukan": [
            "12 dikurangi 2 sama dengan 10, tersisa 10 biskuit. Lalu 10 dikurangi 2 sama dengan 8.",
            "8 dikurangi 2 sama dengan 6, lalu 6 dikurangi 2 sama dengan 4.",
            "4 dikurangi 2 sama dengan 2, lalu 2 dikurangi 2 sama dengan 0.",
            "Di sini kita memakai ide Fair Share — Bagi ke kelompok sama. Di sini kita memakai Fair Share. Bagi ke kelompok sama."
          ],
          "papan": [
            "12 − 2 = 10, 10 − 2 = 8",
            "8 − 2 = 6, 6 − 2 = 4",
            "4 − 2 = 2, 2 − 2 = 0",
            "Dikurangi 6 kali"
          ]
        },
        {
          "id": "K3B1G-V1-3",
          "judul": "Tulis pembagian",
          "ketukan": [
            "Dapat ditulis 12 − 2 − 2 − 2 − 2 − 2 − 2 = 0.",
            "Pengurangan berulang sampai tidak ada sisa disebut pembagian.",
            "Bentuk pembagiannya ditulis 12 : 2 = 6.",
            "METODE LUAR · Bagi Rata: Bagi ke kelompok sama."
          ],
          "papan": [
            "12 − 2 − 2 − 2 − 2 − 2 − 2 = 0",
            "Pembagian",
            "12 : 2 = 6",
            "Dibaca: 12 dibagi 2"
          ]
        }
      ]
    },
    {
      "id": "K3B1G-V2",
      "judul": "Latihan: Kurang Berulang",
      "subjudul": "Repeated Subtraction",
      "adegan": [
        {
          "id": "K3B1G-V2-1",
          "judul": "Siapkan manik-manik",
          "ketukan": [
            "Buatlah kelompok beranggotakan 4 orang, yaitu 1 ketua dan 3 anggota.",
            "Ketua memegang satu wadah berisi 15 manik-manik.",
            "Ketua membagikan satu manik-manik kepada setiap anggota.",
            "Ingat cara Kurang Berulang: Kurangi berulang sampai habis. Ingat cara Kurang Berulang: Kurangi berulang sampai habis."
          ],
          "papan": [
            "Kelompok 4 orang",
            "Wadah berisi 15 manik-manik",
            "Satu untuk tiap anggota",
            "Terus sampai kosong"
          ]
        },
        {
          "id": "K3B1G-V2-2",
          "judul": "Hitung yang diperoleh",
          "ketukan": [
            "Tiap putaran, 3 manik-manik dibagikan. 15 dikurangi 3 sama dengan 12.",
            "12 dikurangi 3 sama dengan 9, lalu 9 dikurangi 3 sama dengan 6.",
            "6 dikurangi 3 sama dengan 3, lalu 3 dikurangi 3 sama dengan 0.",
            "Di sini kita memakai ide Repeated Subtraction — Kurangi berulang sampai habis. Di sini kita memakai Repeated Subtraction. Kurangi berulang sampai habis."
          ],
          "papan": [
            "15 − 3 = 12",
            "12 − 3 = 9, 9 − 3 = 6",
            "6 − 3 = 3, 3 − 3 = 0",
            "Tiap anggota dapat 5"
          ]
        },
        {
          "id": "K3B1G-V2-3",
          "judul": "Tulis pembagian",
          "ketukan": [
            "Dapat ditulis 15 − 3 − 3 − 3 − 3 − 3 = 0.",
            "Bentuk pembagiannya ditulis 15 : 3 = 5.",
            "Ada bilangan 3 sebanyak 5.",
            "METODE LUAR · Kurang Berulang: Kurangi berulang sampai habis."
          ],
          "papan": [
            "15 − 3 − 3 − 3 − 3 − 3 = 0",
            "15 : 3 = 5",
            "Ada bilangan 3 sebanyak 5",
            "Proses pembagian"
          ]
        }
      ]
    },
    {
      "id": "K3B1G-V3",
      "judul": "Siap pakai Fact Family",
      "subjudul": "Fact Family",
      "adegan": [
        {
          "id": "K3B1G-V3-1",
          "judul": "Dari pembagian ke perkalian",
          "ketukan": [
            "15 : 3 berarti mengurangkan 15 dengan 3 secara berulang sampai habis.",
            "Perkalian 5 × 3 berarti ada bilangan 3 sebanyak 5.",
            "5 × 3 = 3 + 3 + 3 + 3 + 3, yaitu 15.",
            "Ingat cara Keluarga Fakta: Kali dan bagi saling terkait. Ingat cara Keluarga Fakta: Kali dan bagi saling terkait."
          ],
          "papan": [
            "15 : 3 = ?",
            "5 × 3 artinya 3 sebanyak 5",
            "3 + 3 + 3 + 3 + 3",
            "5 × 3 = 15"
          ]
        },
        {
          "id": "K3B1G-V3-2",
          "judul": "Saling berkaitan",
          "ketukan": [
            "Pembagian 15 : 3 = 5 berkaitan dengan perkalian 5 × 3 = 15.",
            "Hasil bagi dikali pembagi sama dengan bilangan yang dibagi.",
            "Pada 15 : 3 = 5, bilangan yang dibagi 15, pembagi 3, dan hasil bagi 5.",
            "Di sini kita memakai ide Fact Family — Kali dan bagi saling terkait. Di sini kita memakai Fact Family. Kali dan bagi saling terkait."
          ],
          "papan": [
            "15 : 3 = 5 dan 5 × 3 = 15",
            "hasil bagi × pembagi = dibagi",
            "Dibagi 15, pembagi 3, hasil 5",
            "Periksa dengan kali"
          ]
        },
        {
          "id": "K3B1G-V3-3",
          "judul": "Contoh lain",
          "ketukan": [
            "28 : 7 = 4, karena 28 − 7 − 7 − 7 − 7 = 0.",
            "Periksa dengan perkalian: 4 × 7 = 28.",
            "Pembagian dengan 1: 5 : 1 = 5. Dibagi bilangan yang sama: 6 : 6 = 1.",
            "METODE LUAR · Keluarga Fakta: Kali dan bagi saling terkait."
          ],
          "papan": [
            "28 : 7 = 4",
            "4 × 7 = 28",
            "5 : 1 = 5 dan 6 : 6 = 1",
            "Saling menguatkan"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Apa yang ditanyakan pada Pembagian Bilangan Cacah sampai 100?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Fair Share",
      "stepDesc": "Bagi ke kelompok sama.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Repeated Subtraction",
      "stepDesc": "Kurangi berulang sampai habis.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Fact Family",
      "stepDesc": "Kali dan bagi saling terkait.",
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
      "judul": "Membagi Sama Banyak",
      "emoji": "🍪",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Membagi berarti memberikan benda sama banyak kepada beberapa orang atau tempat. Semua bagian harus sama banyak."
    },
    {
      "judul": "12 : 2 = 6",
      "emoji": "🥣",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Dua belas dikurangi dua berulang kali sampai nol. Bilangan dua dikurangkan enam kali. Jadi, dua belas dibagi dua sama dengan enam."
    },
    {
      "judul": "Pengurangan Berulang",
      "emoji": "➖",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Pengurangan berulang sampai tidak ada sisa disebut pembagian. Lima belas dikurangi tiga lima kali sama dengan nol."
    },
    {
      "judul": "15 : 3 = 5",
      "emoji": "🎁",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Lima belas manik-manik dibagikan kepada tiga anggota. Tiap putaran tiga manik-manik. Setelah lima putaran, wadah kosong. Tiap anggota dapat lima."
    },
    {
      "judul": "Nama Bilangan",
      "emoji": "🏷️",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Pada lima belas dibagi tiga sama dengan lima, lima belas adalah bilangan yang dibagi, tiga adalah pembagi, dan lima adalah hasil bagi."
    },
    {
      "judul": "Garis Bilangan Mundur",
      "emoji": "📏",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Mulai dari lima belas, loncat mundur sebesar tiga. Setelah lima loncatan, kita sampai di nol. Jadi, lima belas dibagi tiga sama dengan lima."
    },
    {
      "judul": "Perkalian Pemeriksa",
      "emoji": "✖️",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Hasil bagi dikali pembagi sama dengan bilangan yang dibagi. Lima kali tiga sama dengan lima belas, jadi pembagiannya benar."
    },
    {
      "judul": "Dibagi 1 dan Bilangan Sama",
      "emoji": "1️⃣",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Bilangan dibagi satu hasilnya bilangan itu sendiri. Bilangan dibagi bilangan yang sama hasilnya satu. Lima dibagi satu sama dengan lima, enam dibagi enam sama dengan satu."
    },
    {
      "judul": "Soal Cerita",
      "emoji": "📖",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Soal cerita pembagian menyebut jumlah seluruhnya dan banyak bagian. Tulis kalimat pembagiannya, hitung, lalu tulis jawabannya dengan satuan."
    },
    {
      "judul": "Cara Membagi",
      "emoji": "📝",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Empat langkah. Satu, cari bilangan yang dibagi. Dua, cari pembagi. Tiga, kurangkan berulang atau ingat perkalian. Empat, periksa dengan perkalian."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "share-in-turns",
      "title": "Bagikan Bergiliran",
      "bookReference": "hlm. 66–68 (Aktivitas 5: ketua membagikan satu manik-manik)",
      "objective": "Pakai Bagi Rata: Bagi ke kelompok sama. Latihan: Membagikan benda satu putaran demi satu putaran kepada piring sampai tumpukan habis, lalu melihat berapa tiap piring..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa menekan Bagikan satu putaran, tiap piring mendapat satu benda. Kalimat pengurangan berulang bertambah panjang sampai tumpukan habis. Saat bermain, ingat Bagi Rata: Bagi ke kelompok sama.",
      "voiceGuide": "Bagi Rata. Bagi ke kelompok sama.",
      "emoji": "🍽️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "count-share",
      "title": "Hitung Bagian",
      "bookReference": "hlm. 64 (12 biskuit untuk 2 anak)",
      "objective": "Pakai Bagi Rata: Bagi ke kelompok sama. Latihan: Menghitung banyak benda yang didapat tiap piring bila tumpukan dibagi sama banyak..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Gambar tumpukan dan piring kosong ditampilkan. Siswa memilih satu dari tiga hasil bagi. Saat bermain, ingat Bagi Rata: Bagi ke kelompok sama.",
      "voiceGuide": "Bagi Rata. Bagi ke kelompok sama.",
      "emoji": "🧺",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "write-repeated-subtraction",
      "title": "Tulis Pengurangan Berulang",
      "bookReference": "hlm. 64–65 (12 − 2 − 2 − 2 − 2 − 2 − 2 = 0)",
      "objective": "Pakai Bagi Rata: Bagi ke kelompok sama. Latihan: Memilih kalimat pengurangan berulang yang sesuai dengan tumpukan dan piring..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa melihat tumpukan dan piring, lalu memilih satu dari tiga kalimat pengurangan berulang. Pengecoh salah banyak pengurangan. Saat bermain, ingat Bagi Rata: Bagi ke kelompok sama.",
      "voiceGuide": "Bagi Rata. Bagi ke kelompok sama.",
      "emoji": "➖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "match-share-division",
      "title": "Jodohkan Gambar dan Pembagian",
      "bookReference": "hlm. 64–69 (menulis pembagian)",
      "objective": "Pakai Bagi Rata: Bagi ke kelompok sama. Latihan: Menjodohkan gambar benda yang sudah dibagi dengan kalimat pembagiannya..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga gambar piring dan tiga pembagian. Siswa mengetuk gambar, lalu mengetuk pembagian yang cocok. Saat bermain, ingat Bagi Rata: Bagi ke kelompok sama.",
      "voiceGuide": "Bagi Rata. Bagi ke kelompok sama.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "memory-share-quotient",
      "title": "Memori Gambar dan Hasil Bagi",
      "bookReference": "hlm. 64–69 (hasil bagi)",
      "objective": "Mencocokkan gambar benda yang sudah dibagi dengan hasil baginya lewat permainan memori.. Ingat Bagi Rata. (Bagi Rata)",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): gambar piring dan hasil bagi. Siswa membalik dua kartu dan mencari pasangannya. Gunakan Bagi Rata.",
      "voiceGuide": "Bagi Rata. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-share-quotient",
      "title": "Ketuk Gambar dengan Hasil Bagi",
      "bookReference": "hlm. 64–69 (hasil bagi)",
      "objective": "Menemukan gambar yang hasil baginya sama dengan bilangan yang diminta.. Ingat Bagi Rata. (Bagi Rata)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga gambar dan dua pertanyaan. Siswa mengetuk gambar yang hasil baginya sama dengan bilangan yang disebut. Gunakan Bagi Rata.",
      "voiceGuide": "Bagi Rata. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-share-compare",
      "title": "Ketuk Semua Bagian Lebih atau Kurang",
      "bookReference": "hlm. 64–69 (membandingkan hasil bagi)",
      "objective": "Menemukan semua gambar yang hasil baginya lebih atau kurang dari bilangan acuan.. Ingat Bagi Rata. (Bagi Rata)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat gambar dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. Gunakan Bagi Rata.",
      "voiceGuide": "Bagi Rata. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-divide",
      "title": "Cerita Pembagian",
      "bookReference": "hlm. 64, 66, dan 71 (biskuit, manik-manik, kotak telur)",
      "objective": "Menyelesaikan soal cerita pembagian dengan gambar tumpukan dan piring.. Ingat Bagi Rata. (Bagi Rata)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita, melihat gambar tumpukan dan piring, lalu memilih hasil baginya. Gunakan Bagi Rata.",
      "voiceGuide": "Bagi Rata. Mainkan dengan teliti.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "board-share-quotient",
      "title": "Papan Hasil Bagi Kumpulan",
      "bookReference": "hlm. 64–69 (hasil bagi)",
      "objective": "Menulis hasil bagi pada papan puluhan dan satuan.. Ingat Bagi Rata. (Bagi Rata)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa menghitung hasil bagi tumpukan, lalu mengatur angka puluhan dan satuan pada papan dan menekan Periksa. Gunakan Bagi Rata.",
      "voiceGuide": "Bagi Rata. Mainkan dengan teliti.",
      "emoji": "🗂️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-share",
      "title": "Urutkan Gambar menurut Hasil Bagi",
      "bookReference": "hlm. 64–69 (membandingkan hasil bagi)",
      "objective": "Mengurutkan tiga gambar menurut hasil baginya.. Ingat Bagi Rata. (Bagi Rata)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga gambar bertanda huruf. Siswa mengetuk gambar satu per satu dari hasil bagi paling kecil atau paling besar. Gunakan Bagi Rata.",
      "voiceGuide": "Bagi Rata. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 9
    },
    {
      "stage": "Picture",
      "gameType": "share-dots",
      "title": "Bagi Titik",
      "bookReference": "hlm. 64–65 (membagi sama banyak)",
      "objective": "Pakai Kurang Berulang: Kurangi berulang sampai habis. Latihan: Membagi sejumlah titik sama banyak ke beberapa kotak dan menentukan isi tiap kotak..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Sebuah kotak berisi banyak titik dan beberapa kotak kosong ditampilkan. Siswa memilih satu dari tiga hasil bagi. Saat bermain, ingat Kurang Berulang: Kurangi berulang sampai habis.",
      "voiceGuide": "Kurang Berulang. Kurangi berulang sampai habis.",
      "diagramType": "share-dots",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "complete-division-sentence",
      "title": "Lengkapi Kalimat Pembagian",
      "bookReference": "hlm. 65 dan 69 (15 : 3 = 5 dan 5 × 3 = 15)",
      "objective": "Pakai Kurang Berulang: Kurangi berulang sampai habis. Latihan: Melengkapi kalimat pengurangan berulang, pembagian, dan perkalian pemeriksa..",
      "mechanicDescription": "Tiga soal, tiap soal tiga kalimat, misalnya 15 : 3 = ... Siswa memilih satu dari tiga angka untuk bagian kosong. Saat bermain, ingat Kurang Berulang: Kurangi berulang sampai habis.",
      "voiceGuide": "Kurang Berulang. Kurangi berulang sampai habis.",
      "diagramType": "division-sentence",
      "numberA": 15,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "match-dots-division",
      "title": "Jodohkan Titik dan Pembagian",
      "bookReference": "hlm. 64–69 (menulis pembagian)",
      "objective": "Pakai Kurang Berulang: Kurangi berulang sampai habis. Latihan: Menjodohkan gambar kotak titik dengan kalimat pembagiannya..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga gambar dan tiga pembagian. Siswa mengetuk gambar, lalu mengetuk pembagian yang cocok. Saat bermain, ingat Kurang Berulang: Kurangi berulang sampai habis.",
      "voiceGuide": "Kurang Berulang. Kurangi berulang sampai habis.",
      "diagramType": "dots-division-match",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memory-dots-quotient",
      "title": "Memori Titik dan Hasil Bagi",
      "bookReference": "hlm. 64–69 (hasil bagi)",
      "objective": "Pakai Kurang Berulang: Kurangi berulang sampai habis. Latihan: Mencocokkan gambar kotak titik dengan hasil baginya lewat permainan memori..",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. Saat bermain, ingat Kurang Berulang: Kurangi berulang sampai habis.",
      "voiceGuide": "Kurang Berulang. Kurangi berulang sampai habis.",
      "diagramType": "dots-quotient-memory",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "number-line-back",
      "title": "Loncat Mundur pada Garis Bilangan",
      "bookReference": "hlm. 65 dan 68 (pengurangan berulang 15 − 3 − 3 − 3 − 3 − 3)",
      "objective": "Menentukan titik pendaratan setelah beberapa loncatan mundur sama besar.. Ingat Kurang Berulang. (Kurang Berulang)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Garis bilangan enam titik ditampilkan. Siswa mengetuk titik tempat loncatan mundur terakhir mendarat. Gunakan Kurang Berulang.",
      "voiceGuide": "Kurang Berulang. Mainkan dengan teliti.",
      "diagramType": "number-line",
      "numberA": 15,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "fill-division-table",
      "title": "Isi Tabel Pembagian",
      "bookReference": "hlm. 71 (Ayo Berlatih 2: hitunglah hasil dari pembagian)",
      "objective": "Melengkapi tabel soal pembagian dan hasil baginya.. Ingat Kurang Berulang. (Kurang Berulang)",
      "mechanicDescription": "Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu hasil yang tepat. Ada satu kartu pengecoh. Gunakan Kurang Berulang.",
      "voiceGuide": "Kurang Berulang. Mainkan dengan teliti.",
      "diagramType": "division-table",
      "numberA": 4,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-dots-quotient",
      "title": "Ketuk Semua Titik Lebih atau Kurang",
      "bookReference": "hlm. 64–69 (membandingkan hasil bagi)",
      "objective": "Menemukan semua gambar yang hasil baginya lebih atau kurang dari bilangan acuan.. Ingat Kurang Berulang. (Kurang Berulang)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat gambar dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. Gunakan Kurang Berulang.",
      "voiceGuide": "Kurang Berulang. Mainkan dengan teliti.",
      "diagramType": "dots-select",
      "numberA": 4,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-dot-quotient",
      "title": "Pilah Gambar: Kurang dari 5 atau Lebih",
      "bookReference": "hlm. 64–69 (membandingkan hasil bagi)",
      "objective": "Memilah gambar kotak titik menjadi yang hasil baginya kurang dari 5 dan yang 5 atau lebih.. Ingat Kurang Berulang. (Kurang Berulang)",
      "mechanicDescription": "Tiga ronde, tiap ronde enam gambar dan dua kotak. Siswa menyeret atau mengetuk gambar ke kotak yang tepat. Gunakan Kurang Berulang.",
      "voiceGuide": "Kurang Berulang. Mainkan dengan teliti.",
      "diagramType": "dots-sort",
      "numberA": 4,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "check-with-multiplication",
      "title": "Periksa dengan Perkalian",
      "bookReference": "hlm. 69 (Catatan Penting: hasil bagi dikali pembagi)",
      "objective": "Memeriksa hasil pembagian dengan perkalian dan menentukan bilangan yang dibagi.. Ingat Kurang Berulang. (Kurang Berulang)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal, misalnya 15 : 3 = 5 maka 5 × 3 = ... Siswa memilih satu dari tiga bilangan. Gunakan Kurang Berulang.",
      "voiceGuide": "Kurang Berulang. Mainkan dengan teliti.",
      "diagramType": "check-multiplication",
      "numberA": 5,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "build-boxes-divide",
      "title": "Rakit Kotak Pembagi",
      "bookReference": "hlm. 66–68 (membagikan sampai wadah kosong)",
      "objective": "Menambah kotak berisi titik yang sama sampai jumlahnya sama dengan bilangan yang dibagi.. Ingat Kurang Berulang. (Kurang Berulang)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca isi tiap kotak dan jumlah titik yang diminta, lalu menambah atau mengurangi kotak. Banyak kotak adalah hasil baginya. Gunakan Kurang Berulang.",
      "voiceGuide": "Kurang Berulang. Mainkan dengan teliti.",
      "diagramType": "build-boxes",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Abstract",
      "gameType": "repeated-subtraction-abstract",
      "title": "Tulis Pengurangan Berulang: Lambang",
      "bookReference": "hlm. 70 (Ayo Berlatih 1: tulislah pembagian sebagai pengurangan berulang)",
      "objective": "Pakai Keluarga Fakta: Kali dan bagi saling terkait. Latihan: Menyatakan pembagian sebagai pengurangan berulang sampai nol..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal (4 : 1, 10 : 10, 16 : 4, 35 : 5, 9 : 1, dan seterusnya). Siswa memilih satu dari tiga kalimat pengurangan berulang. Saat bermain, ingat Keluarga Fakta: Kali dan bagi saling terkait.",
      "voiceGuide": "Keluarga Fakta. Kali dan bagi saling terkait.",
      "symbolLarge": "16:4",
      "wordLarge": "KURANG BERULANG",
      "mathNotation": "bagi • kurang • nol"
    },
    {
      "stage": "Abstract",
      "gameType": "compute-quotient",
      "title": "Hitung Hasil Bagi",
      "bookReference": "hlm. 71 (Ayo Berlatih 2: hitunglah hasil dari pembagian)",
      "objective": "Pakai Keluarga Fakta: Kali dan bagi saling terkait. Latihan: Menghitung hasil pembagian dua bilangan dan memilihnya dari tiga pilihan..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal (6 : 1, 10 : 1, 21 : 3, 24 : 4, 5 : 5, 48 : 6, dan seterusnya). Pengecoh satu lebih dan satu kurang. Saat bermain, ingat Keluarga Fakta: Kali dan bagi saling terkait.",
      "voiceGuide": "Keluarga Fakta. Kali dan bagi saling terkait.",
      "symbolLarge": "21:3",
      "wordLarge": "HASIL BAGI",
      "mathNotation": "dibagi • sama dengan"
    },
    {
      "stage": "Abstract",
      "gameType": "board-quotient",
      "title": "Papan Hasil Bagi",
      "bookReference": "hlm. 71 (hasil pembagian 64 : 8 dan 45 : 9)",
      "objective": "Pakai Keluarga Fakta: Kali dan bagi saling terkait. Latihan: Menulis hasil pembagian pada papan puluhan dan satuan..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa mengatur angka puluhan dan satuan lalu menekan Periksa. Saat bermain, ingat Keluarga Fakta: Kali dan bagi saling terkait.",
      "voiceGuide": "Keluarga Fakta. Kali dan bagi saling terkait.",
      "symbolLarge": "64:8",
      "wordLarge": "PAPAN",
      "mathNotation": "puluhan • satuan"
    },
    {
      "stage": "Abstract",
      "gameType": "match-division-multiplication",
      "title": "Jodohkan Pembagian dan Perkalian",
      "bookReference": "hlm. 69 (Catatan Penting: hubungan perkalian dan pembagian)",
      "objective": "Pakai Keluarga Fakta: Kali dan bagi saling terkait. Latihan: Menjodohkan soal pembagian dengan perkalian pemeriksanya..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga pembagian dan tiga perkalian. Siswa mengetuk pembagian, lalu mengetuk perkalian yang cocok. Saat bermain, ingat Keluarga Fakta: Kali dan bagi saling terkait.",
      "voiceGuide": "Keluarga Fakta. Kali dan bagi saling terkait.",
      "symbolLarge": "15:3",
      "wordLarge": "JODOHKAN",
      "mathNotation": "bagi • kali"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-division",
      "title": "Memori Pembagian dan Hasil",
      "bookReference": "hlm. 71 (soal dan jawaban)",
      "objective": "Mencocokkan soal pembagian dengan hasilnya lewat permainan memori.. Ingat Keluarga Fakta. (Keluarga Fakta)",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): soal dan hasil. Siswa membalik dua kartu dan mencari pasangannya. Gunakan Keluarga Fakta.",
      "voiceGuide": "Keluarga Fakta. Mainkan dengan teliti.",
      "symbolLarge": "48:6",
      "wordLarge": "MEMORI",
      "mathNotation": "soal • hasil"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-division",
      "title": "Benar atau Salah: Pembagian",
      "bookReference": "hlm. 64–69 (pengurangan berulang dan hubungan dengan perkalian)",
      "objective": "Menilai pernyataan tentang pembagian dan hasilnya.. Ingat Keluarga Fakta. (Keluarga Fakta)",
      "mechanicDescription": "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan dihitung dari bilangan, dan tiap jawaban diberi penjelasan. Gunakan Keluarga Fakta.",
      "voiceGuide": "Keluarga Fakta. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "periksa dengan alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-division",
      "title": "Detektif Pembagian",
      "bookReference": "hlm. 64–71 (hasil bagi)",
      "objective": "Menemukan bilangan hasil pembagian dari dua petunjuk.. Ingat Keluarga Fakta. (Keluarga Fakta)",
      "mechanicDescription": "Empat soal. Siswa membaca petunjuk seperti hasil 48 : 6 dan kurang dari 10, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok. Gunakan Keluarga Fakta.",
      "voiceGuide": "Keluarga Fakta. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "dua petunjuk, satu jawaban"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-map-division",
      "title": "Peta Konsep Pembagian",
      "bookReference": "hlm. 2 (peta konsep: pembagian bilangan cacah)",
      "objective": "Melengkapi peta konsep pembagian serta hubungan perkalian dan pembagian.. Ingat Keluarga Fakta. (Keluarga Fakta)",
      "mechanicDescription": "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. Gunakan Keluarga Fakta.",
      "voiceGuide": "Keluarga Fakta. Mainkan dengan teliti.",
      "symbolLarge": "⇄",
      "wordLarge": "PETA KONSEP",
      "mathNotation": "bagi • kali • hasil"
    },
    {
      "stage": "Abstract",
      "gameType": "story-division",
      "title": "Soal Cerita Pembagian",
      "bookReference": "hlm. 71 dan 73 (Ayo Berlatih 3 dan 4; Asesmen 5)",
      "objective": "Menyelesaikan soal cerita pembagian banyak benda yang dibagi sama banyak.. Ingat Keluarga Fakta. (Keluarga Fakta)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita lalu memilih satu dari tiga hasil bagi. Pengecoh satu lebih dan satu kurang. Gunakan Keluarga Fakta.",
      "voiceGuide": "Keluarga Fakta. Mainkan dengan teliti.",
      "symbolLarge": "24:3",
      "wordLarge": "CERITA",
      "mathNotation": "dibagi sama banyak"
    },
    {
      "stage": "Abstract",
      "gameType": "sentence-division",
      "title": "Susun Kata Pembagian",
      "bookReference": "hlm. 64–69 (pengertian pembagian)",
      "objective": "Menyusun kalimat tentang pembagian dari kartu kata.. Ingat Keluarga Fakta. (Keluarga Fakta)",
      "mechanicDescription": "Empat kalimat. Siswa mengetuk kartu kata satu per satu menurut urutan kalimat yang benar. Ada satu kartu pengecoh. Gunakan Keluarga Fakta.",
      "voiceGuide": "Keluarga Fakta. Mainkan dengan teliti.",
      "symbolLarge": ":",
      "wordLarge": "SUSUN KATA",
      "mathNotation": "kalimat pembagian"
    }
  ],
  "poin": [
    {
      "ikon": "🍽️",
      "nama": "Membagi sama banyak",
      "isi": "tiap bagian sama banyak",
      "suara": "Membagi berarti memberikan benda sama banyak kepada beberapa bagian."
    },
    {
      "ikon": "🌍",
      "nama": "Bagi Rata",
      "isi": "Bagi ke kelompok sama.",
      "suara": "Bagi Rata. Bagi ke kelompok sama."
    },
    {
      "ikon": "🌍",
      "nama": "Kurang Berulang",
      "isi": "Kurangi berulang sampai habis.",
      "suara": "Kurang Berulang. Kurangi berulang sampai habis."
    },
    {
      "ikon": "🌍",
      "nama": "Keluarga Fakta",
      "isi": "Kali dan bagi saling terkait.",
      "suara": "Keluarga Fakta. Kali dan bagi saling terkait."
    }
  ],
  "poinSuara": "Ingat: Bagi Rata, Kurang Berulang, Keluarga Fakta.",
  "cara": {
    "suara": "Cara membagi. Cari bilangan yang dibagi. Cari pembagi. Kurangkan berulang atau ingat perkalian. Lalu periksa dengan perkalian.",
    "potongan": [
      {
        "teks": "bilangan dibagi",
        "warna": "#BAE6FD"
      },
      {
        "teks": "pembagi",
        "warna": "#FECACA"
      },
      {
        "teks": "kurang berulang",
        "warna": "#BFDBFE"
      },
      {
        "teks": "periksa kali",
        "warna": "#FDE68A"
      }
    ]
  },
  "rumah": "Ayo Mencoba: terapkan Bagi Rata pada satu soal nyata di rumah.",
  "refleksi": [
    "Bagaimana Bagi Rata membantumu?",
    "Kapan memakai Kurang Berulang?",
    "Apa bedanya dengan hanya menghafal tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Fair Share",
      "namaId": "Bagi Rata",
      "asal": "Division",
      "ringkas": "Bagi ke kelompok sama.",
      "tahap": [
        "Story",
        "Concrete"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Repeated Subtraction",
      "namaId": "Kurang Berulang",
      "asal": "Division strategies",
      "ringkas": "Kurangi berulang sampai habis.",
      "tahap": [
        "Picture",
        "Mind"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Fact Family",
      "namaId": "Keluarga Fakta",
      "asal": "Inverse operations",
      "ringkas": "Kali dan bagi saling terkait.",
      "tahap": [
        "Abstract",
        "Infografis"
      ]
    }
  ]
};

export const SUB_BAB_K3B1: SubBabNaskah[] = [SUB_A31, SUB_B31, SUB_C31, SUB_D31, SUB_E31, SUB_F31, SUB_G31];
export const semuaAdeganK3B1 = SUB_BAB_K3B1.flatMap((s) => s.videos.flatMap((v) => v.adegan));
