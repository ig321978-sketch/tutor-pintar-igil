/**
 * Naskah — poles kerapatan setara K5B4.
 * Metode luar dianyam ketukan per ketukan.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K2B7_META = {
  "chapterId": "k2-mat-bab7",
  "phaseCode": "FASE_A",
  "grade": 2,
  "subjectLabel": "MATEMATIKA - KELAS 2 SD",
  "title": "BAB 7: AYO MEMBILANG SAMPAI DENGAN 100",
  "silabusElemen": "🌈 Fase A • Elemen Bilangan: Bilangan sampai dengan 100 (Kelas 2 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A7: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Menghitung, Membaca, Menulis Bilangan)",
  "fullTitle": "Sub-Bab A: Menghitung, Membaca, dan Menulis Bilangan sampai 100",
  "targetDescription": "Siswa menghitung puluhan sampai seratus (sepuluh satuan sama dengan satu puluhan), menghitung puluhan dan satuan dengan nilai tempat dan pasangan bilangan, membaca dan menulis bilangan sampai 100 dengan lambang dan nama bilangan, serta memperkirakan banyak benda lalu membuktikannya dengan mengelompokkan setiap sepuluh. Siswa memakai cara Hitung sampai 100, Puluhan dan Satuan, Tabel Seratus. Siswa memakai cara Hitung sampai 100, Puluhan dan Satuan, Tabel Seratus.",
  "secondaryBg": "#FEF9C3",
  "secondaryBorder": "#CA8A04",
  "secondaryText": "#713F12",
  "silabus": {
    "teksSuara": "Kita belajar membilang sampai seratus. Di semester satu kita sudah belajar bilangan sampai lima puluh, dan kali ini kita melanjutkan sampai seratus. Kita menghitung kue cubit Pak Ahmad dalam bungkus berisi sepuluh, yaitu puluhan. Kita menghitung puluhan dan satuan pada rambutan Halim dan kelereng ayah Malosi, lalu membaca dan menulis bilangannya. Kita juga belajar memperkirakan banyak benda, menebak dulu, lalu membuktikan dengan mengelompokkan setiap sepuluh. Kita memakai cara: Hitung sampai 100, Puluhan dan Satuan, Tabel Seratus. Lanjut hitung dengan pola puluhan. Baca 45 sebagai 4 puluhan 5 satuan. Lihat pola angka di tabel 1–100. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menghitung banyak benda sampai 100 dengan mengelompokkan puluhan dan satuan, membaca dan menulis bilangan sampai 100 dengan lambang dan nama bilangan, memperkirakan banyak benda, serta menyampaikan hasilnya dengan percaya diri.",
    "referensi": "Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 7 Sub-Bab A)."
  },
  "videos": [
    {
      "id": "K2B7A-V1",
      "judul": "Kue Cubit Pak Ahmad",
      "subjudul": "Count to 100",
      "adegan": [
        {
          "id": "K2B7A-V1-1",
          "judul": "Penjual kue cubit",
          "ketukan": [
            "Bayangkan kamu sedang mempelajari Menghitung, Membaca, dan Menulis Bilangan sampai 100. Pak Ahmad adalah seorang penjual kue cubit.",
            "Kue cubit adalah kue tradisional dari Betawi. Kue ini ditaburi cokelat sehingga rasanya manis.",
            "Kue cubit Pak Ahmad sudah dikemas dalam pembungkus yang ramah lingkungan. Setiap bungkus berisi sepuluh kue cubit.",
            "Ingat cara Hitung sampai 100: Lanjut hitung dengan pola puluhan. Ingat cara Hitung sampai 100: Lanjut hitung dengan pola puluhan."
          ],
          "papan": [
            "Penjual kue cubit",
            "Kue tradisional Betawi",
            "1 bungkus: 10 kue",
            "Berapa semuanya?"
          ]
        },
        {
          "id": "K2B7A-V1-2",
          "judul": "Satu bungkus, satu puluhan",
          "ketukan": [
            "Sepuluh kue cubit dimasukkan dalam satu pembungkus.",
            "Sepuluh satuan sama dengan satu puluhan. Satu bungkus adalah satu puluhan.",
            "Lima bungkus berarti lima puluhan, yaitu lima puluh.",
            "Di sini kita memakai ide Count to 100 — Lanjut hitung dengan pola puluhan. Di sini kita memakai Count to 100. Lanjut hitung dengan pola puluhan."
          ],
          "papan": [
            "10 kue: 1 bungkus",
            "10 satuan = 1 puluhan",
            "5 puluhan = 50",
            "6 puluhan = 60"
          ]
        },
        {
          "id": "K2B7A-V1-3",
          "judul": "Sampai seratus",
          "ketukan": [
            "Tujuh bungkus berarti tujuh puluhan, yaitu tujuh puluh.",
            "Delapan bungkus berarti delapan puluhan, yaitu delapan puluh.",
            "Sembilan bungkus berarti sembilan puluhan, yaitu sembilan puluh.",
            "METODE LUAR · Hitung sampai 100: Lanjut hitung dengan pola puluhan."
          ],
          "papan": [
            "7 puluhan = 70",
            "8 puluhan = 80",
            "9 puluhan = 90",
            "10 puluhan = 100"
          ]
        }
      ]
    },
    {
      "id": "K2B7A-V2",
      "judul": "Latihan: Puluhan dan Satuan",
      "subjudul": "Tens and Ones",
      "adegan": [
        {
          "id": "K2B7A-V2-1",
          "judul": "Rambutan Halim",
          "ketukan": [
            "Pohon rambutan di rumah Halim sedang berbuah. Hari ini Halim memanen buah rambutannya.",
            "Halim memasukkan rambutan ke dalam keranjang. Setiap keranjang berisi sepuluh rambutan, jadi satu keranjang adalah satu puluhan.",
            "Halim mempunyai lima keranjang penuh dan tiga rambutan lepas. Itu lima puluhan dan tiga satuan.",
            "Ingat cara Puluhan dan Satuan: Baca 45 sebagai 4 puluhan 5 satuan. Ingat cara Puluhan dan Satuan: Baca 45 sebagai 4 puluhan 5 satuan."
          ],
          "papan": [
            "Panen rambutan",
            "1 keranjang: 10 buah",
            "5 puluhan, 3 satuan",
            "50 + 3 = 53"
          ]
        },
        {
          "id": "K2B7A-V2-2",
          "judul": "Kelereng ayah Malosi",
          "ketukan": [
            "Malosi membantu ayahnya berjualan mainan. Ia memasukkan kelereng ke dalam kantong plastik.",
            "Setiap kantong berisi sepuluh kelereng. Satu kantong adalah satu puluhan.",
            "Ayah Malosi mempunyai enam kantong penuh dan tujuh kelereng lepas, jadi enam puluhan dan tujuh satuan.",
            "Di sini kita memakai ide Tens and Ones — Baca 45 sebagai 4 puluhan 5 satuan. Di sini kita memakai Tens and Ones. Baca 45 sebagai 4 puluhan 5 satuan."
          ],
          "papan": [
            "Membantu ayah",
            "1 kantong: 10 kelereng",
            "6 puluhan, 7 satuan",
            "60 + 7 = 67"
          ]
        },
        {
          "id": "K2B7A-V2-3",
          "judul": "Dua cara menulis",
          "ketukan": [
            "Ada dua cara menentukan banyak benda. Cara pertama memakai nilai tempat: puluhan di kiri dan satuan di kanan.",
            "Lima puluhan dan tiga satuan ditulis dengan angka lima di tempat puluhan dan angka tiga di tempat satuan.",
            "Cara kedua memakai pasangan bilangan: lima puluh tiga terdiri dari lima puluh dan tiga.",
            "METODE LUAR · Puluhan dan Satuan: Baca 45 sebagai 4 puluhan 5 satuan."
          ],
          "papan": [
            "Dua cara",
            "Nilai tempat: 5 | 3",
            "Pasangan: 50 dan 3",
            "Baca puluhan dulu"
          ]
        }
      ]
    },
    {
      "id": "K2B7A-V3",
      "judul": "Siap pakai Hundred Chart",
      "subjudul": "Hundred Chart",
      "adegan": [
        {
          "id": "K2B7A-V3-1",
          "judul": "Menebak banyak ikan",
          "ketukan": [
            "Kira dan Malosi melihat banyak ikan hias di kolam. Mereka diminta menebak banyaknya.",
            "Kira menebak ada lima puluh ikan. Malosi menebak ada enam puluh ikan.",
            "Menebak boleh keliru. Menebak melatih kita memperkirakan banyak benda sebelum menghitung.",
            "Ingat cara Tabel Seratus: Lihat pola angka di tabel 1–100. Ingat cara Tabel Seratus: Lihat pola angka di tabel 1–100."
          ],
          "papan": [
            "Ikan hias di kolam",
            "Tebakan: 50 dan 60",
            "Menebak boleh keliru",
            "tabel"
          ]
        },
        {
          "id": "K2B7A-V3-2",
          "judul": "Kelompok sepuluh",
          "ketukan": [
            "Ayo kita buktikan dengan menghitung. Kita mengelompokkan setiap sepuluh ikan.",
            "Satu kelompok berisi sepuluh ikan, jadi satu kelompok adalah satu puluhan.",
            "Ada enam kelompok dan dua ikan sisa. Itu enam puluhan dan dua satuan.",
            "Di sini kita memakai ide Hundred Chart — Lihat pola angka di tabel 1–100. Di sini kita memakai Hundred Chart. Lihat pola angka di tabel 1–100."
          ],
          "papan": [
            "Kelompokkan sepuluh",
            "1 kelompok: 10 ikan",
            "6 puluhan, 2 satuan",
            "60 + 2 = 62"
          ]
        },
        {
          "id": "K2B7A-V3-3",
          "judul": "Tebakan siapa yang dekat?",
          "ketukan": [
            "Tebakan Kira lima puluh. Tebakan Malosi enam puluh. Banyak ikan sebenarnya enam puluh dua.",
            "Lima puluh berbeda dua belas dari enam puluh dua. Enam puluh berbeda dua dari enam puluh dua.",
            "Tebakan Malosi lebih dekat dengan banyak ikan yang sebenarnya.",
            "METODE LUAR · Tabel Seratus: Lihat pola angka di tabel 1–100."
          ],
          "papan": [
            "Sebenarnya 62 ikan",
            "Selisih 12 dan 2",
            "Malosi lebih dekat",
            "Bayangkan kelompok 10"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Apa yang ditanyakan pada Menghitung, Membaca, dan Menulis Bilangan sampai 100?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Count to 100",
      "stepDesc": "Lanjut hitung dengan pola puluhan.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Tens and Ones",
      "stepDesc": "Baca 45 sebagai 4 puluhan 5 satuan.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Hundred Chart",
      "stepDesc": "Lihat pola angka di tabel 1–100.",
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
      "judul": "Sepuluh Satuan, Satu Puluhan",
      "emoji": "📦",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Sepuluh satuan sama dengan satu puluhan. Sepuluh kue cubit dalam satu bungkus adalah satu puluhan."
    },
    {
      "judul": "Menghitung Puluhan",
      "emoji": "🔟",
      "countNum": 10,
      "countWord": "Sepuluh",
      "suara": "Menghitung puluhan melompat sepuluh-sepuluh: sepuluh, dua puluh, tiga puluh, empat puluh, lima puluh, enam puluh, tujuh puluh, delapan puluh, sembilan puluh, dan seratus."
    },
    {
      "judul": "Seratus",
      "emoji": "💯",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Sepuluh puluhan sama dengan seratus. Bilangan seratus dibaca seratus."
    },
    {
      "judul": "Puluhan dan Satuan",
      "emoji": "🧺",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Lima keranjang penuh dan tiga rambutan lepas adalah lima puluhan dan tiga satuan, yaitu lima puluh tiga."
    },
    {
      "judul": "Dua Cara Menentukan Banyak",
      "emoji": "🧩",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Dua cara menentukan banyak benda: nilai tempat dan pasangan bilangan. Lima puluh tiga sama dengan lima puluh tambah tiga."
    },
    {
      "judul": "Nama Bilangan",
      "emoji": "🔤",
      "countNum": 8,
      "countWord": "Delapan",
      "suara": "Nama puluhan: dua puluh, tiga puluh, empat puluh, lima puluh, enam puluh, tujuh puluh, delapan puluh, dan sembilan puluh. Sesudah puluhan kita sebut satuannya, misalnya enam puluh dua."
    },
    {
      "judul": "Cara Memperkirakan",
      "emoji": "🔭",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Tiga langkah memperkirakan. Satu, bayangkan sepuluh benda dalam satu kelompok. Dua, tebak berapa kelompok. Tiga, buktikan dengan menghitung."
    },
    {
      "judul": "Kelompokkan Setiap Sepuluh",
      "emoji": "🐠",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Enam puluh dua ikan dikelompokkan sepuluh-sepuluh menjadi enam kelompok dan dua ikan sisa, yaitu enam puluhan dan dua satuan."
    },
    {
      "judul": "Tabel Seratus",
      "emoji": "🔢",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Pada tabel seratus, turun satu baris berarti tambah sepuluh, dan geser satu kotak ke kanan berarti tambah satu."
    },
    {
      "judul": "Tebakan yang Dekat",
      "emoji": "🎯",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Banyak ikan enam puluh dua. Tebakan enam puluh berbeda dua, tebakan lima puluh berbeda dua belas. Tebakan yang selisihnya lebih kecil lebih dekat."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "fill-pack-of-ten",
      "title": "Isi Bungkus Sepuluh",
      "bookReference": "hlm. 194–195 (10 kue cubit dimasukkan dalam 1 pembungkus; 10 satuan = 1 puluhan)",
      "objective": "Pakai Hitung sampai 100: Lanjut hitung dengan pola puluhan. Latihan: Mengisi satu wadah dengan sepuluh benda dan memahami bahwa sepuluh satuan sama dengan satu puluhan..",
      "mechanicDescription": "Tiga ronde: kue cubit dalam bungkus, kelereng dalam kantong, rambutan dalam keranjang. Siswa menekan tombol tambah satu per satu sampai wadah berisi sepuluh. Wadah yang penuh berubah hijau dan Suara Guru menyebut satu puluhan. Saat bermain, ingat Hitung sampai 100: Lanjut hitung dengan pola puluhan.",
      "voiceGuide": "Hitung sampai 100. Lanjut hitung dengan pola puluhan.",
      "emoji": "📦",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "count-packs-tens",
      "title": "Hitung Bungkus",
      "bookReference": "hlm. 195–197 (lima bungkus: 5 puluhan = 50, sampai 10 puluhan = 100)",
      "objective": "Pakai Hitung sampai 100: Lanjut hitung dengan pola puluhan. Latihan: Menghitung banyak benda dari banyak wadah penuh berisi sepuluh..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua gambar wadah penuh (5 sampai 10 wadah). Siswa memilih banyak benda seluruhnya dari tiga pilihan kelipatan sepuluh. Kunci dihitung dari banyak wadah kali sepuluh. Saat bermain, ingat Hitung sampai 100: Lanjut hitung dengan pola puluhan.",
      "voiceGuide": "Hitung sampai 100. Lanjut hitung dengan pola puluhan.",
      "emoji": "🛍️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "match-packs-numerals",
      "title": "Jodohkan Bungkus dan Bilangan",
      "bookReference": "hlm. 195–197 dan 206 (hubungkan dengan bilangan yang tepat)",
      "objective": "Pakai Hitung sampai 100: Lanjut hitung dengan pola puluhan. Latihan: Menjodohkan banyak wadah penuh dengan lambang bilangannya..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga gambar wadah (dua sampai sepuluh wadah) dan tiga lambang bilangan seperti 50 dan 70. Siswa mengetuk gambar lalu lambang yang cocok. Pasangan benar terkunci. Saat bermain, ingat Hitung sampai 100: Lanjut hitung dengan pola puluhan.",
      "voiceGuide": "Hitung sampai 100. Lanjut hitung dengan pola puluhan.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "build-number-tens-ones",
      "title": "Rakit Bilangan",
      "bookReference": "hlm. 198–199 (rambutan Halim dan kelereng ayah Malosi: puluhan dan satuan)",
      "objective": "Pakai Hitung sampai 100: Lanjut hitung dengan pola puluhan. Latihan: Merakit sebuah bilangan dari wadah penuh dan benda lepas..",
      "mechanicDescription": "Empat ronde: 53 rambutan, 67 kelereng, 74 kue cubit, 82 jeruk. Siswa menekan tambah wadah penuh (sepuluh) dan tambah benda lepas sampai banyaknya sama dengan bilangan. Sepuluh benda lepas otomatis masuk satu wadah. Saat bermain, ingat Hitung sampai 100: Lanjut hitung dengan pola puluhan.",
      "voiceGuide": "Hitung sampai 100. Lanjut hitung dengan pola puluhan.",
      "emoji": "🧺",
      "targetCount": 4
    },
    {
      "stage": "Concrete",
      "gameType": "tie-bundles-of-ten",
      "title": "Ikat Sepuluh",
      "bookReference": "hlm. 200–202 dan 214 (Ayo Mencoba: ikat setiap 10 lidi)",
      "objective": "Mengikat benda lepas sepuluh-sepuluh lalu menghitung seluruhnya.. Ingat Hitung sampai 100. (Hitung sampai 100)",
      "mechanicDescription": "Tiga ronde: 23 lidi, 37 kelereng, 46 pensil warna. Siswa menekan Ikat sepuluh sampai tidak bisa lagi, lalu memilih banyak benda seluruhnya dari tiga pilihan. Gunakan Hitung sampai 100.",
      "voiceGuide": "Hitung sampai 100. Mainkan dengan teliti.",
      "emoji": "🎀",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "guess-then-count",
      "title": "Tebak dan Hitung",
      "bookReference": "hlm. 200–201 dan 207 (tebak banyak ikan lalu hitung)",
      "objective": "Memperkirakan banyak benda lalu membuktikannya dengan mengelompokkan sepuluh-sepuluh.. Ingat Hitung sampai 100. (Hitung sampai 100)",
      "mechanicDescription": "Tiga ronde: 62 ikan, 38 jeruk, 85 anggur. Siswa menebak dulu dengan memilih satu dari tiga tebakan (tidak ada yang salah). Benda lalu dikelompokkan sepuluh-sepuluh, dan siswa memilih banyak sebenarnya. Suara Guru menyebut selisih tebakan. Gunakan Hitung sampai 100.",
      "voiceGuide": "Hitung sampai 100. Mainkan dengan teliti.",
      "emoji": "🐠",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "memory-collection-numeral",
      "title": "Memori Banyak Benda",
      "bookReference": "hlm. 198–199 (nilai tempat dan pasangan bilangan)",
      "objective": "Mencocokkan kumpulan benda dengan lambang bilangannya.. Ingat Hitung sampai 100. (Hitung sampai 100)",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): gambar kumpulan benda berisi wadah penuh dan benda lepas, dan lambang bilangannya. Siswa membalik dua kartu. Gunakan Hitung sampai 100.",
      "voiceGuide": "Hitung sampai 100. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "order-collections",
      "title": "Urutkan Banyak Benda",
      "bookReference": "hlm. 214 dan 222 (urutkan bilangan dari yang paling kecil)",
      "objective": "Mengurutkan kumpulan benda dari yang paling sedikit atau paling banyak.. Ingat Hitung sampai 100. (Hitung sampai 100)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga atau empat keranjang bertanda huruf. Siswa mengetuk keranjang satu per satu menurut urutan banyaknya (dua ronde dari paling sedikit, satu dari paling banyak). Letak jawaban berpindah. Gunakan Hitung sampai 100.",
      "voiceGuide": "Hitung sampai 100. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "sort-collections-fifty",
      "title": "Pilah: Kurang atau Lebih dari 50",
      "bookReference": "hlm. 192 (semester satu sampai 50, kali ini sampai 100)",
      "objective": "Memilah kumpulan benda menurut kurang dari 50 atau lebih dari 50.. Ingat Hitung sampai 100. (Hitung sampai 100)",
      "mechanicDescription": "Tiga ronde, tiap ronde enam kumpulan benda. Siswa menyeret atau mengetuk kumpulan ke kotak Kurang dari 50 atau Lebih dari 50. Kunci dihitung dari banyak puluhan. Gunakan Hitung sampai 100.",
      "voiceGuide": "Hitung sampai 100. Mainkan dengan teliti.",
      "emoji": "🗂️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "find-bag-by-number",
      "title": "Kantong Misterius",
      "bookReference": "hlm. 198–199 (banyak kelereng milik ayah Malosi)",
      "objective": "Menemukan kumpulan benda yang banyaknya sama dengan sebuah bilangan.. Ingat Hitung sampai 100. (Hitung sampai 100)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca bilangan, misalnya 67, lalu mengetuk satu dari empat kumpulan benda yang banyaknya 67. Pengecoh: bilangan dengan angka tertukar (76) dan selisih satu atau sepuluh. Gunakan Hitung sampai 100.",
      "voiceGuide": "Hitung sampai 100. Mainkan dengan teliti.",
      "emoji": "🎒",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "count-ten-bars",
      "title": "Hitung Batang Puluhan",
      "bookReference": "hlm. 195–197 (menghitung puluhan sampai 100)",
      "objective": "Pakai Puluhan dan Satuan: Baca 45 sebagai 4 puluhan 5 satuan. Latihan: Menghitung banyak puluhan dari model batang..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Gambar menampilkan beberapa batang sepuluh kotak. Siswa mengatur penghitung sampai sama dengan banyak batang, lalu menekan Periksa. Saat bermain, ingat Puluhan dan Satuan: Baca 45 sebagai 4 puluhan 5 satuan.",
      "voiceGuide": "Puluhan dan Satuan. Baca 45 sebagai 4 puluhan 5 satuan.",
      "diagramType": "tens-model",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "find-model-by-number",
      "title": "Cari Model Bilangan",
      "bookReference": "hlm. 198–199 (puluhan dan satuan pada nilai tempat)",
      "objective": "Pakai Puluhan dan Satuan: Baca 45 sebagai 4 puluhan 5 satuan. Latihan: Menemukan model batang dan kotak yang sama dengan sebuah bilangan..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca bilangan, lalu mengetuk satu dari empat model batang puluhan dan kotak satuan. Pengecoh memuat angka tertukar dan selisih satu. Saat bermain, ingat Puluhan dan Satuan: Baca 45 sebagai 4 puluhan 5 satuan.",
      "voiceGuide": "Puluhan dan Satuan. Baca 45 sebagai 4 puluhan 5 satuan.",
      "diagramType": "base-ten-model",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "fill-place-value-board",
      "title": "Isi Papan Nilai Tempat",
      "bookReference": "hlm. 198–199 dan 204–205 (puluhan dan satuan, lalu tulis bilangannya)",
      "objective": "Pakai Puluhan dan Satuan: Baca 45 sebagai 4 puluhan 5 satuan. Latihan: Menuliskan bilangan pada papan nilai tempat dari model batang dan kotak..",
      "mechanicDescription": "Empat soal. Gambar model menampilkan batang puluhan dan kotak satuan. Siswa mengatur angka puluhan dan angka satuan pada papan, lalu menekan Periksa. Saat bermain, ingat Puluhan dan Satuan: Baca 45 sebagai 4 puluhan 5 satuan.",
      "voiceGuide": "Puluhan dan Satuan. Baca 45 sebagai 4 puluhan 5 satuan.",
      "diagramType": "place-value-board",
      "numberA": 4,
      "numberB": 1
    },
    {
      "stage": "Picture",
      "gameType": "match-model-numeral",
      "title": "Jodohkan Model dan Bilangan",
      "bookReference": "hlm. 206 (hubungkan dengan bilangan yang tepat)",
      "objective": "Pakai Puluhan dan Satuan: Baca 45 sebagai 4 puluhan 5 satuan. Latihan: Menjodohkan model batang dan kotak dengan lambang bilangannya..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga model dan tiga lambang bilangan. Siswa mengetuk model lalu lambang yang cocok. Saat bermain, ingat Puluhan dan Satuan: Baca 45 sebagai 4 puluhan 5 satuan.",
      "voiceGuide": "Puluhan dan Satuan. Baca 45 sebagai 4 puluhan 5 satuan.",
      "diagramType": "base-ten-match",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "number-bond-fill",
      "title": "Pasangan Bilangan",
      "bookReference": "hlm. 198–199 (cara 2: pasangan bilangan, 53 = 50 + 3)",
      "objective": "Melengkapi bagan pasangan bilangan.. Ingat Puluhan dan Satuan. (Puluhan dan Satuan)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua bagan. Satu bagian tersembunyi: bila total 67 dan satu bagian 60, bagian lain 7. Siswa memilih satu dari tiga pilihan angka. Gunakan Puluhan dan Satuan.",
      "voiceGuide": "Puluhan dan Satuan. Mainkan dengan teliti.",
      "diagramType": "number-bond",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "tens-number-line",
      "title": "Garis Puluhan",
      "bookReference": "hlm. 195–197 (menghitung puluhan dengan melompat sepuluh-sepuluh)",
      "objective": "Melompat sepuluh-sepuluh pada garis puluhan.. Ingat Puluhan dan Satuan. (Puluhan dan Satuan)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga soal pada garis 0, 10, 20, sampai 100. Siswa membaca mulai dan banyak lompatan, misalnya mulai 30 lompat 4 puluhan, lalu mengetuk bilangan pendaratan. Gunakan Puluhan dan Satuan.",
      "voiceGuide": "Puluhan dan Satuan. Mainkan dengan teliti.",
      "diagramType": "tens-line",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "complete-hundred-chart",
      "title": "Lengkapi Tabel Seratus",
      "bookReference": "hlm. 209 (urutan bilangan 51 sampai 100 dengan kotak kosong)",
      "objective": "Melengkapi bilangan yang hilang pada tabel 51 sampai 100.. Ingat Puluhan dan Satuan. (Puluhan dan Satuan)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat atau lima kotak kosong pada tabel sepuluh kolom. Kotak yang menyala menunggu jawaban, dan siswa memilih satu dari tiga angka. Petunjuk menyebut bilangan tetangga. Gunakan Puluhan dan Satuan.",
      "voiceGuide": "Puluhan dan Satuan. Mainkan dengan teliti.",
      "diagramType": "hundred-chart",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "order-models",
      "title": "Urutkan Model",
      "bookReference": "hlm. 214 dan 222 (mengurutkan bilangan)",
      "objective": "Mengurutkan model batang dan kotak dari yang terkecil atau terbesar.. Ingat Puluhan dan Satuan. (Puluhan dan Satuan)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga atau empat model. Siswa mengetuk model satu per satu menurut urutan banyaknya. Letak jawaban berpindah. Gunakan Puluhan dan Satuan.",
      "voiceGuide": "Puluhan dan Satuan. Mainkan dengan teliti.",
      "diagramType": "base-ten-order",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-models-by-tens",
      "title": "Pilah Model menurut Puluhan",
      "bookReference": "hlm. 198–199 (banyak puluhan menentukan besar bilangan)",
      "objective": "Memilah model menurut banyak puluhannya.. Ingat Puluhan dan Satuan. (Puluhan dan Satuan)",
      "mechanicDescription": "Tiga ronde, tiap ronde enam model dan tiga kotak berlabel banyak puluhan (misalnya 3, 5, dan 7). Siswa menyeret atau mengetuk model ke kotak yang tepat. Tiap kotak menerima dua model. Gunakan Puluhan dan Satuan.",
      "voiceGuide": "Puluhan dan Satuan. Mainkan dengan teliti.",
      "diagramType": "base-ten-sort",
      "numberA": 3,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "guess-dots-then-count",
      "title": "Tebak Banyak Titik",
      "bookReference": "hlm. 200–201 (tebak lalu hitung)",
      "objective": "Memperkirakan banyak titik lalu menghitungnya dengan kelompok sepuluh.. Ingat Puluhan dan Satuan. (Puluhan dan Satuan)",
      "mechanicDescription": "Tiga ronde: 47, 33, dan 76 titik. Siswa menebak dulu satu dari tiga tebakan, lalu titik dikelompokkan sepuluh-sepuluh dan siswa memilih banyak sebenarnya. Gunakan Puluhan dan Satuan.",
      "voiceGuide": "Puluhan dan Satuan. Mainkan dengan teliti.",
      "diagramType": "dot-estimate",
      "numberA": 3,
      "numberB": 1
    },
    {
      "stage": "Abstract",
      "gameType": "match-words-numerals",
      "title": "Jodohkan Puluhan, Satuan, dan Bilangan",
      "bookReference": "hlm. 206 nomor 3 (hubungkan dengan bilangan yang tepat)",
      "objective": "Pakai Tabel Seratus: Lihat pola angka di tabel 1–100. Latihan: Menjodohkan kalimat puluhan dan satuan dengan lambang bilangan..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga pasangan, misalnya 9 puluhan dan 2 satuan dengan 92. Siswa mengetuk kalimat, lalu lambang bilangan yang cocok. Saat bermain, ingat Tabel Seratus: Lihat pola angka di tabel 1–100.",
      "voiceGuide": "Tabel Seratus. Lihat pola angka di tabel 1–100.",
      "symbolLarge": "92",
      "wordLarge": "9 PULUHAN 2 SATUAN",
      "mathNotation": "puluhan • satuan • bilangan"
    },
    {
      "stage": "Abstract",
      "gameType": "complete-place-value-sentences",
      "title": "Lengkapi Kalimat Puluhan dan Satuan",
      "bookReference": "hlm. 198–199 dan 204–205 (puluhan dan satuan sama dengan bilangan)",
      "objective": "Pakai Tabel Seratus: Lihat pola angka di tabel 1–100. Latihan: Melengkapi kalimat puluhan dan satuan dengan bilangan yang tepat..",
      "mechanicDescription": "Dua ronde, tiap ronde tiga kalimat, misalnya 6 puluhan dan 7 satuan sama dengan ... Siswa memilih satu dari tiga bilangan. Pengecoh memuat angka tertukar. Saat bermain, ingat Tabel Seratus: Lihat pola angka di tabel 1–100.",
      "voiceGuide": "Tabel Seratus. Lihat pola angka di tabel 1–100.",
      "symbolLarge": "6 7 = 67",
      "wordLarge": "PULUHAN SATUAN",
      "mathNotation": "puluhan dan satuan sama dengan bilangan"
    },
    {
      "stage": "Abstract",
      "gameType": "build-number-name-sentence",
      "title": "Susun Nama dan Kalimat Bilangan",
      "bookReference": "hlm. 195–197 dan 208 (nama bilangan; tulis lambang bilangan)",
      "objective": "Pakai Tabel Seratus: Lihat pola angka di tabel 1–100. Latihan: Menyusun kata menjadi kalimat tentang nama dan lambang bilangan..",
      "mechanicDescription": "Empat kalimat. Kartu kata diketuk berurutan. Satu kartu pengecoh tidak dipakai. Kalimat yang benar dibacakan. Saat bermain, ingat Tabel Seratus: Lihat pola angka di tabel 1–100.",
      "voiceGuide": "Tabel Seratus. Lihat pola angka di tabel 1–100.",
      "symbolLarge": "Aa",
      "wordLarge": "SUSUN KATA",
      "mathNotation": "nama bilangan • lambang bilangan"
    },
    {
      "stage": "Abstract",
      "gameType": "fill-place-value-table",
      "title": "Isi Tabel Puluhan dan Satuan",
      "bookReference": "hlm. 204–205 dan 219–220 (puluhan dan satuan sama dengan)",
      "objective": "Pakai Tabel Seratus: Lihat pola angka di tabel 1–100. Latihan: Mengisi tabel puluhan dan satuan dari lambang bilangan..",
      "mechanicDescription": "Dua ronde dengan tabel berisi empat baris, misalnya bilangan 53 dengan 5 puluhan dan 3 satuan. Siswa mengetuk baris, lalu mengetuk kartu yang tepat. Saat bermain, ingat Tabel Seratus: Lihat pola angka di tabel 1–100.",
      "voiceGuide": "Tabel Seratus. Lihat pola angka di tabel 1–100.",
      "symbolLarge": "53",
      "wordLarge": "TABEL",
      "mathNotation": "bilangan • puluhan • satuan"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-numbers",
      "title": "Benar atau Salah: Bilangan",
      "bookReference": "hlm. 194–209 (puluhan, satuan, nama bilangan)",
      "objective": "Menilai pernyataan tentang puluhan, satuan, dan nama bilangan.. Ingat Tabel Seratus. (Tabel Seratus)",
      "mechanicDescription": "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan dihitung dari bilangan, dan tiap jawaban diberi penjelasan singkat. Gunakan Tabel Seratus.",
      "voiceGuide": "Tabel Seratus. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "periksa dengan alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-numeral-from-name",
      "title": "Tulis Lambang dari Nama",
      "bookReference": "hlm. 208 nomor 5 dan 221 nomor 3 (tulis lambang bilangan sesuai dengan nama bilangannya)",
      "objective": "Memilih lambang bilangan yang sesuai dengan nama bilangan.. Ingat Tabel Seratus. (Tabel Seratus)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal, misalnya enam puluh dua. Siswa memilih satu dari tiga lambang. Pengecoh memuat angka tertukar (26) dan selisih satu. Gunakan Tabel Seratus.",
      "voiceGuide": "Tabel Seratus. Mainkan dengan teliti.",
      "symbolLarge": "62",
      "wordLarge": "ENAM PULUH DUA",
      "mathNotation": "nama bilangan • lambang bilangan"
    },
    {
      "stage": "Abstract",
      "gameType": "riddle-number-clues",
      "title": "Detektif Bilangan",
      "bookReference": "hlm. 217 (aku adalah bilangan) dan 223 (buatlah pertanyaan untuk menunjukkan satu bilangan)",
      "objective": "Menemukan sebuah bilangan dari dua atau tiga petunjuk.. Ingat Tabel Seratus. (Tabel Seratus)",
      "mechanicDescription": "Empat soal. Siswa membaca petunjuk seperti puluhanku 7 dan satuanku 3, lalu memilih satu dari tiga bilangan. Hanya satu bilangan yang cocok dengan semua petunjuk. Gunakan Tabel Seratus.",
      "voiceGuide": "Tabel Seratus. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "dua petunjuk, satu jawaban"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-map-fill",
      "title": "Peta Konsep Bilangan",
      "bookReference": "hlm. 192 (peta konsep: menghitung, membaca, dan menulis bilangan)",
      "objective": "Melengkapi peta konsep puluhan dan satuan serta membaca dan menulis bilangan.. Ingat Tabel Seratus. (Tabel Seratus)",
      "mechanicDescription": "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. Gunakan Tabel Seratus.",
      "voiceGuide": "Tabel Seratus. Mainkan dengan teliti.",
      "symbolLarge": "⇄",
      "wordLarge": "PETA KONSEP",
      "mathNotation": "puluhan • satuan • bilangan"
    },
    {
      "stage": "Abstract",
      "gameType": "order-numerals",
      "title": "Urutkan Bilangan",
      "bookReference": "hlm. 214 dan 222 (urutkan bilangan dari yang paling kecil)",
      "objective": "Mengurutkan lambang bilangan dari yang paling kecil atau paling besar.. Ingat Tabel Seratus. (Tabel Seratus)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat atau lima bilangan, misalnya 62, 26, 71, 17. Siswa mengetuk bilangan satu per satu menurut urutan. Letak jawaban berpindah. Gunakan Tabel Seratus.",
      "voiceGuide": "Tabel Seratus. Mainkan dengan teliti.",
      "symbolLarge": "17 < 26",
      "wordLarge": "URUTKAN",
      "mathNotation": "bandingkan puluhan dulu"
    },
    {
      "stage": "Abstract",
      "gameType": "select-all-number-trait",
      "title": "Ketuk Semua yang Cocok",
      "bookReference": "hlm. 198–199 dan 212–213 (puluhan dan satuan menentukan besar bilangan)",
      "objective": "Memilih semua bilangan yang memiliki ciri tertentu.. Ingat Tabel Seratus. (Tabel Seratus)",
      "mechanicDescription": "Tiga ronde, tiap ronde enam bilangan dan satu ciri: punya 6 puluhan, satuannya 5, atau lebih besar dari 70. Siswa mengetuk semua yang cocok, lalu menekan Periksa. Gunakan Tabel Seratus.",
      "voiceGuide": "Tabel Seratus. Mainkan dengan teliti.",
      "symbolLarge": "✔✔",
      "wordLarge": "SEMUA COCOK",
      "mathNotation": "boleh lebih dari satu"
    }
  ],
  "poin": [
    {
      "ikon": "📦",
      "nama": "Sepuluh satuan, satu puluhan",
      "isi": "10 satuan = 1 puluhan",
      "suara": "Sepuluh satuan sama dengan satu puluhan. Satu bungkus berisi sepuluh kue cubit adalah satu puluhan."
    },
    {
      "ikon": "🌍",
      "nama": "Hitung sampai 100",
      "isi": "Lanjut hitung dengan pola puluhan.",
      "suara": "Hitung sampai 100. Lanjut hitung dengan pola puluhan."
    },
    {
      "ikon": "🌍",
      "nama": "Puluhan dan Satuan",
      "isi": "Baca 45 sebagai 4 puluhan 5 satuan.",
      "suara": "Puluhan dan Satuan. Baca 45 sebagai 4 puluhan 5 satuan."
    },
    {
      "ikon": "🌍",
      "nama": "Tabel Seratus",
      "isi": "Lihat pola angka di tabel 1–100.",
      "suara": "Tabel Seratus. Lihat pola angka di tabel 1–100."
    }
  ],
  "poinSuara": "Ingat: Hitung sampai 100, Puluhan dan Satuan, Tabel Seratus.",
  "cara": {
    "suara": "Cara menyebutkan. Lima puluhan dan tiga satuan sama dengan lima puluh tiga. Sebut puluhan, lalu satuan, lalu bilangannya.",
    "potongan": [
      {
        "teks": "puluhan",
        "warna": "#BAE6FD"
      },
      {
        "teks": "dan",
        "warna": "#FFFFFF"
      },
      {
        "teks": "satuan",
        "warna": "#FDE68A"
      },
      {
        "teks": "bilangan",
        "warna": "#7FCB96"
      }
    ]
  },
  "rumah": "Ayo Mencoba: terapkan Hitung sampai 100 pada satu soal nyata di rumah.",
  "refleksi": [
    "Bagaimana Hitung sampai 100 membantumu?",
    "Kapan memakai Puluhan dan Satuan?",
    "Apa bedanya dengan hanya menghafal tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Count to 100",
      "namaId": "Hitung sampai 100",
      "asal": "Counting",
      "ringkas": "Lanjut hitung dengan pola puluhan.",
      "tahap": [
        "Story",
        "Concrete"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Tens and Ones",
      "namaId": "Puluhan dan Satuan",
      "asal": "Place value",
      "ringkas": "Baca 45 sebagai 4 puluhan 5 satuan.",
      "tahap": [
        "Picture",
        "Mind",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Hundred Chart",
      "namaId": "Tabel Seratus",
      "asal": "Van de Walle",
      "ringkas": "Lihat pola angka di tabel 1–100.",
      "tahap": [
        "Infografis",
        "Concrete"
      ]
    }
  ]
};

export const SUB_B7: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Membandingkan Bilangan)",
  "fullTitle": "Sub-Bab B: Membandingkan Bilangan",
  "targetDescription": "Siswa menentukan bilangan yang lebih dari atau kurang dari bilangan lain dengan menghitung maju dan mundur pada garis bilangan, membandingkan dua bilangan dengan melihat banyak puluhan lebih dulu lalu satuannya, memakai kata lebih besar dari, lebih kecil dari, dan sama dengan, serta mengurutkan tiga bilangan atau lebih dari yang paling kecil atau paling besar. Siswa memakai cara Banding Puluhan Dulu, Garis Bilangan 100, Tanda Banding. Siswa memakai cara Banding Puluhan Dulu, Garis Bilangan 100, Tanda Banding.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Kita belajar membandingkan bilangan. Kita menghitung maju dan mundur seperti kupu-kupu dan capung untuk mencari bilangan yang lebih dari dan kurang dari. Lalu kita membandingkan kelereng Halim dan Malosi dengan melihat banyak puluhan lebih dulu, dan satuannya bila puluhannya sama. Kita memakai kata lebih besar dari, lebih kecil dari, dan sama dengan, lalu mengurutkan bilangan dari yang paling kecil. Kita memakai cara: Banding Puluhan Dulu, Garis Bilangan 100, Tanda Banding. Puluhan menentukan siapa lebih besar. Posisi menunjukkan urutan. Pakai <, >, = dengan tepat. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa membandingkan dua bilangan sampai 100 dengan memperhatikan puluhan dan satuan, menentukan bilangan yang lebih dari dan kurang dari bilangan lain, mengurutkan bilangan, serta menyampaikan alasannya dengan percaya diri.",
    "referensi": "Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 7 Sub-Bab B)."
  },
  "videos": [
    {
      "id": "K2B7B-V1",
      "judul": "Kupu-kupu dan Capung",
      "subjudul": "Compare Tens First",
      "adegan": [
        {
          "id": "K2B7B-V1-1",
          "judul": "Kupu-kupu di bilangan 58",
          "ketukan": [
            "Bayangkan kamu sedang mempelajari Membandingkan Bilangan. Lihat garis angka ini. Kupu-kupu berada di antara bilangan lima puluh tujuh dan lima puluh sembilan.",
            "Jadi kupu-kupu berada di bilangan lima puluh delapan.",
            "Kupu-kupu maju dua langkah ke depan. Kita menghitung maju: lima puluh sembilan, enam puluh.",
            "Ingat cara Banding Puluhan Dulu: Puluhan menentukan siapa lebih besar. Ingat cara Banding Puluhan Dulu: Puluhan menentukan siapa lebih besar."
          ],
          "papan": [
            "Antara 57 dan 59",
            "Kupu-kupu di 58",
            "Maju dua langkah",
            "2 lebihnya dari 58: 60"
          ]
        },
        {
          "id": "K2B7B-V1-2",
          "judul": "Capung di bilangan 75",
          "ketukan": [
            "Sekarang amati capung. Capung berada di antara bilangan tujuh puluh empat dan tujuh puluh enam.",
            "Jadi capung berada di bilangan tujuh puluh lima.",
            "Capung mundur tiga langkah ke belakang. Kita menghitung mundur: tujuh puluh empat, tujuh puluh tiga, tujuh puluh dua.",
            "Di sini kita memakai ide Compare Tens First — Puluhan menentukan siapa lebih besar. Di sini kita memakai Compare Tens First. Puluhan menentukan siapa lebih besar."
          ],
          "papan": [
            "Antara 74 dan 76",
            "Capung di 75",
            "Mundur tiga langkah",
            "3 kurangnya dari 75: 72"
          ]
        },
        {
          "id": "K2B7B-V1-3",
          "judul": "Lebih dari dan kurang dari",
          "ketukan": [
            "Lebihnya berarti maju, dan kurangnya berarti mundur.",
            "Aku adalah bilangan. Aku dua lebihnya dari bilangan tujuh puluh enam. Aku adalah tujuh puluh delapan.",
            "Aku adalah bilangan. Aku satu kurangnya dari bilangan enam puluh tujuh. Aku adalah enam puluh enam.",
            "METODE LUAR · Banding Puluhan Dulu: Puluhan menentukan siapa lebih besar."
          ],
          "papan": [
            "Lebih: maju, kurang: mundur",
            "2 lebihnya dari 76: 78",
            "1 kurangnya dari 67: 66",
            "Garis bilangan membantu"
          ]
        }
      ]
    },
    {
      "id": "K2B7B-V2",
      "judul": "Latihan: Garis Bilangan 100",
      "subjudul": "Number Line to 100",
      "adegan": [
        {
          "id": "K2B7B-V2-1",
          "judul": "Lima puluh enam dan enam puluh lima",
          "ketukan": [
            "Halim mempunyai lima puluh enam butir kelereng. Malosi memiliki enam puluh lima butir kelereng.",
            "Kelereng siapa yang lebih banyak? Kita masukkan kelereng ke dalam kantong, setiap kantong berisi sepuluh kelereng.",
            "Bilangan lima puluh enam mempunyai lima puluhan dan enam satuan. Bilangan enam puluh lima mempunyai enam puluhan dan lima satuan.",
            "Ingat cara Garis Bilangan 100: Posisi menunjukkan urutan. Ingat cara Garis Bilangan 100: Posisi menunjukkan urutan."
          ],
          "papan": [
            "Halim 56, Malosi 65",
            "1 kantong: 10 kelereng",
            "56: 5 puluhan, 6 satuan",
            "65 lebih besar dari 56"
          ]
        },
        {
          "id": "K2B7B-V2-2",
          "judul": "Puluhan yang sama",
          "ketukan": [
            "Sekarang bandingkan bilangan lima puluh empat dan lima puluh delapan.",
            "Keduanya mempunyai lima puluhan. Karena puluhannya sama, kita lihat satuannya.",
            "Lima puluh empat mempunyai empat satuan, dan lima puluh delapan mempunyai delapan satuan.",
            "Di sini kita memakai ide Number Line to 100 — Posisi menunjukkan urutan. Di sini kita memakai Number Line to 100. Posisi menunjukkan urutan."
          ],
          "papan": [
            "Banding 54 dan 58",
            "Puluhan sama: lihat satuan",
            "4 satuan dan 8 satuan",
            "58 lebih besar dari 54"
          ]
        },
        {
          "id": "K2B7B-V2-3",
          "judul": "Kata perbandingan",
          "ketukan": [
            "Ada tiga kata untuk membandingkan dua bilangan: lebih besar dari, lebih kecil dari, dan sama dengan.",
            "Enam puluh lima lebih besar dari lima puluh enam. Lima puluh enam lebih kecil dari enam puluh lima.",
            "Dua bilangan yang puluhan dan satuannya sama, adalah bilangan yang sama dengan.",
            "METODE LUAR · Garis Bilangan 100: Posisi menunjukkan urutan."
          ],
          "papan": [
            "Tiga kata banding",
            "65 lebih besar dari 56",
            "Sama: sama dengan",
            "Tanda: > < ="
          ]
        }
      ]
    },
    {
      "id": "K2B7B-V3",
      "judul": "Siap pakai Symbols < > =",
      "subjudul": "Symbols < > =",
      "adegan": [
        {
          "id": "K2B7B-V3-1",
          "judul": "Tiga bilangan",
          "ketukan": [
            "Amati tiga bilangan ini: tujuh puluh enam, delapan puluh tiga, dan lima puluh tujuh.",
            "Bilangan tujuh puluh enam mempunyai tujuh puluhan dan enam satuan. Delapan puluh tiga mempunyai delapan puluhan dan tiga satuan. Lima puluh tujuh mempunyai lima puluhan dan tujuh satuan.",
            "Yang puluhannya paling banyak adalah delapan puluh tiga. Jadi delapan puluh tiga paling besar.",
            "Ingat cara Tanda Banding: Pakai <, >, = dengan tepat. Ingat cara Tanda Banding: Pakai <, >, = dengan tepat."
          ],
          "papan": [
            "76, 83, dan 57",
            "Lihat puluhannya",
            "83: puluhan terbanyak",
            "57: puluhan tersedikit"
          ]
        },
        {
          "id": "K2B7B-V3-2",
          "judul": "Dari yang paling kecil",
          "ketukan": [
            "Sekarang urutkan bilangan dari yang paling kecil.",
            "Pertama lima puluh tujuh, karena puluhannya paling sedikit.",
            "Kedua tujuh puluh enam, lalu ketiga delapan puluh tiga.",
            "Di sini kita memakai ide Symbols < > = — Pakai <, >, = dengan tepat. Di sini kita memakai Symbols < > =. Pakai <, >, = dengan tepat."
          ],
          "papan": [
            "Urutkan dari terkecil",
            "Pertama: 57",
            "Kedua: 76, ketiga: 83",
            "57, 76, 83"
          ]
        },
        {
          "id": "K2B7B-V3-3",
          "judul": "Teka-teki Kira",
          "ketukan": [
            "Kira menuliskan satu bilangan. Kira berkata, jika aku tambahkan empat pada puluhan dan tiga pada satuan, hasilnya adalah lima puluh lima.",
            "Kita mundur dulu. Lima puluh lima adalah lima puluhan dan lima satuan.",
            "Empat puluhan kita kurangi dari lima puluhan, tinggal satu puluhan. Tiga satuan kita kurangi dari lima satuan, tinggal dua satuan.",
            "METODE LUAR · Tanda Banding: Pakai <, >, = dengan tepat."
          ],
          "papan": [
            "Teka-teki Kira",
            "55: 5 puluhan, 5 satuan",
            "Kurangi 4 puluhan, 3 satuan",
            "Bilangan Kira: 12"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Apa yang ditanyakan pada Membandingkan Bilangan?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Compare Tens First",
      "stepDesc": "Puluhan menentukan siapa lebih besar.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Number Line to 100",
      "stepDesc": "Posisi menunjukkan urutan.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Symbols < > =",
      "stepDesc": "Pakai <, >, = dengan tepat.",
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
      "judul": "Garis Bilangan",
      "emoji": "📏",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Pada garis bilangan, bilangan di kanan lebih besar dan bilangan di kiri lebih kecil."
    },
    {
      "judul": "Lebihnya dan Kurangnya",
      "emoji": "↔️",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Dua lebihnya dari lima puluh delapan adalah enam puluh, karena maju dua langkah. Tiga kurangnya dari tujuh puluh lima adalah tujuh puluh dua, karena mundur tiga langkah."
    },
    {
      "judul": "Bandingkan Puluhan Dulu",
      "emoji": "🔟",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Lima puluh enam punya lima puluhan dan enam puluh lima punya enam puluhan. Puluhan yang lebih banyak berarti bilangan yang lebih besar."
    },
    {
      "judul": "Puluhan Sama, Lihat Satuan",
      "emoji": "🔍",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Lima puluh empat dan lima puluh delapan sama-sama punya lima puluhan. Kita lihat satuannya: delapan lebih banyak dari empat."
    },
    {
      "judul": "Tiga Kata Perbandingan",
      "emoji": "🔤",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Tiga kata perbandingan adalah lebih besar dari, lebih kecil dari, dan sama dengan."
    },
    {
      "judul": "Tiga Tanda Perbandingan",
      "emoji": "🐊",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Tanda lebih besar, tanda lebih kecil, dan tanda sama dengan. Tanda lebih besar dan lebih kecil terbuka ke arah bilangan yang lebih besar."
    },
    {
      "judul": "Mengurutkan Tiga Bilangan",
      "emoji": "📶",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Urutan dari yang paling kecil: lima puluh tujuh, tujuh puluh enam, dan delapan puluh tiga."
    },
    {
      "judul": "Paling Besar, Paling Kecil",
      "emoji": "🏆",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Bilangan yang puluhannya paling banyak adalah yang paling besar. Bilangan yang puluhannya paling sedikit adalah yang paling kecil."
    },
    {
      "judul": "Kartu Bilangan",
      "emoji": "🃏",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Dengan dua kartu tiga dan tujuh, bilangan terbesar adalah tujuh puluh tiga dan bilangan terkecil adalah tiga puluh tujuh. Kartu yang lebih besar ditaruh di tempat puluhan untuk bilangan terbesar."
    },
    {
      "judul": "Teka-Teki Kira",
      "emoji": "🧠",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Kira berkata, jika aku tambahkan empat pada puluhan dan tiga pada satuan, hasilnya lima puluh lima. Kita mundur, dan bilangan Kira adalah dua belas."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "step-forward-backward",
      "title": "Maju dan Mundur",
      "bookReference": "hlm. 209–210 (kupu-kupu maju dua langkah, capung mundur tiga langkah)",
      "objective": "Pakai Banding Puluhan Dulu: Puluhan menentukan siapa lebih besar. Latihan: Menentukan bilangan yang lebih dari atau kurang dari dengan menghitung maju dan mundur..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal, misalnya kupu-kupu di 58 maju dua langkah, capung di 75 mundur tiga langkah. Siswa menekan Maju atau Mundur satu langkah demi satu langkah pada garis angka. Bila melewati perintah, tekan Ulang. Saat bermain, ingat Banding Puluhan Dulu: Puluhan menentukan siapa lebih besar.",
      "voiceGuide": "Banding Puluhan Dulu. Puluhan menentukan siapa lebih besar.",
      "emoji": "🦋",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "find-between-number",
      "title": "Di Mana Aku?",
      "bookReference": "hlm. 209–210 (kupu-kupu berada di antara 57 dan 59)",
      "objective": "Pakai Banding Puluhan Dulu: Puluhan menentukan siapa lebih besar. Latihan: Menemukan bilangan yang berada di antara dua bilangan..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga soal, misalnya aku berada di antara 74 dan 76. Siswa mengetuk bilangan itu pada garis angka. Letak jawaban berpindah di garis. Saat bermain, ingat Banding Puluhan Dulu: Puluhan menentukan siapa lebih besar.",
      "voiceGuide": "Banding Puluhan Dulu. Puluhan menentukan siapa lebih besar.",
      "emoji": "📍",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "compare-collections-names",
      "title": "Siapa Lebih Banyak?",
      "bookReference": "hlm. 211–212 (kelereng Halim dan Malosi)",
      "objective": "Pakai Banding Puluhan Dulu: Puluhan menentukan siapa lebih besar. Latihan: Membandingkan banyak benda milik dua anak..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Dua anak punya kumpulan kelereng berisi kantong penuh dan kelereng lepas, misalnya Halim 56 dan Malosi 65. Siswa memilih siapa yang lebih banyak atau sama banyak. Saat bermain, ingat Banding Puluhan Dulu: Puluhan menentukan siapa lebih besar.",
      "voiceGuide": "Banding Puluhan Dulu. Puluhan menentukan siapa lebih besar.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tap-most-least",
      "title": "Ketuk yang Paling Banyak dan Paling Sedikit",
      "bookReference": "hlm. 214 (bilangan yang paling besar dan paling kecil)",
      "objective": "Pakai Banding Puluhan Dulu: Puluhan menentukan siapa lebih besar. Latihan: Menemukan kumpulan benda yang paling banyak dan paling sedikit..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga kumpulan benda dan dua pertanyaan: paling banyak, lalu paling sedikit. Siswa mengetuk kumpulannya. Letak kunci berpindah. Saat bermain, ingat Banding Puluhan Dulu: Puluhan menentukan siapa lebih besar.",
      "voiceGuide": "Banding Puluhan Dulu. Puluhan menentukan siapa lebih besar.",
      "emoji": "🏆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "two-cards-biggest-smallest",
      "title": "Susun Dua Kartu",
      "bookReference": "hlm. 215 (Ayo Mencoba: kartu bilangan 1–9 dan papan nilai tempat)",
      "objective": "Menyusun dua kartu angka menjadi bilangan terbesar atau terkecil.. Ingat Banding Puluhan Dulu. (Banding Puluhan Dulu)",
      "mechanicDescription": "Empat ronde: kartu 3 dan 7, 5 dan 2, 8 dan 6, 4 dan 9. Siswa mengetuk kartu lalu mengetuk tempat puluhan atau satuan. Susunan yang salah diberi petunjuk dan kartu kembali. Gunakan Banding Puluhan Dulu.",
      "voiceGuide": "Banding Puluhan Dulu. Mainkan dengan teliti.",
      "emoji": "🔢",
      "targetCount": 4
    },
    {
      "stage": "Concrete",
      "gameType": "order-three-collections",
      "title": "Urutkan Tiga Kantong",
      "bookReference": "hlm. 214 (urutkan tiga bilangan dari yang paling kecil)",
      "objective": "Mengurutkan tiga kumpulan benda dari yang paling sedikit atau paling banyak.. Ingat Banding Puluhan Dulu. (Banding Puluhan Dulu)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga kantong bertanda huruf, misalnya 76, 83, dan 57. Siswa mengetuk kantong satu per satu menurut urutan banyaknya. Gunakan Banding Puluhan Dulu.",
      "voiceGuide": "Banding Puluhan Dulu. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "match-pair-relation",
      "title": "Jodohkan Kiri dan Kanan",
      "bookReference": "hlm. 212–213 (membandingkan dua bilangan)",
      "objective": "Menjodohkan dua kumpulan benda dengan pernyataan perbandingannya.. Ingat Banding Puluhan Dulu. (Banding Puluhan Dulu)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga pasang kumpulan benda dan tiga pernyataan: kiri lebih banyak, sama banyak, dan kanan lebih banyak. Siswa mengetuk pasangan, lalu pernyataan yang cocok. Gunakan Banding Puluhan Dulu.",
      "voiceGuide": "Banding Puluhan Dulu. Mainkan dengan teliti.",
      "emoji": "↔️",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "memory-compare-numbers",
      "title": "Memori Banyak Benda",
      "bookReference": "hlm. 212–213 (bilangan dan puluhan satuannya)",
      "objective": "Mencocokkan kumpulan benda dengan lambang bilangannya.. Ingat Banding Puluhan Dulu. (Banding Puluhan Dulu)",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): kumpulan benda dan lambang bilangannya. Siswa membalik dua kartu. Gunakan Banding Puluhan Dulu.",
      "voiceGuide": "Banding Puluhan Dulu. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "sort-more-less-reference",
      "title": "Pilah: Lebih atau Kurang dari Acuan",
      "bookReference": "hlm. 216 (lingkari bilangan yang lebih besar)",
      "objective": "Memilah kumpulan benda yang lebih banyak dan yang lebih sedikit dari sebuah acuan.. Ingat Banding Puluhan Dulu. (Banding Puluhan Dulu)",
      "mechanicDescription": "Tiga ronde, tiap ronde satu bilangan acuan (60, 75, 40) dan enam kumpulan benda. Siswa menyeret atau mengetuk kumpulan ke kotak Lebih dari acuan atau Kurang dari acuan. Gunakan Banding Puluhan Dulu.",
      "voiceGuide": "Banding Puluhan Dulu. Mainkan dengan teliti.",
      "emoji": "🗂️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "select-all-more-than",
      "title": "Ketuk Semua yang Memenuhi",
      "bookReference": "hlm. 216–217 (bilangan yang lebih besar atau lebih kecil)",
      "objective": "Memilih semua kumpulan benda yang lebih banyak atau lebih sedikit dari sebuah acuan.. Ingat Banding Puluhan Dulu. (Banding Puluhan Dulu)",
      "mechanicDescription": "Tiga ronde, tiap ronde enam kumpulan benda dan satu perintah, misalnya lebih dari 65. Siswa mengetuk semua yang memenuhi, lalu menekan Periksa. Gunakan Banding Puluhan Dulu.",
      "voiceGuide": "Banding Puluhan Dulu. Mainkan dengan teliti.",
      "emoji": "✅",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "number-line-between-more-less",
      "title": "Garis Bilangan: Antara, Lebih, Kurang",
      "bookReference": "hlm. 209–210 (di antara, lebih dari, dan kurang dari pada garis bilangan)",
      "objective": "Pakai Garis Bilangan 100: Posisi menunjukkan urutan. Latihan: Menemukan bilangan di antara, yang lebihnya, dan yang kurangnya pada garis bilangan..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga soal: di antara dua bilangan, sekian lebihnya, dan sekian kurangnya. Siswa mengetuk bilangan yang tepat pada garis bilangan. Saat bermain, ingat Garis Bilangan 100: Posisi menunjukkan urutan.",
      "voiceGuide": "Garis Bilangan 100. Posisi menunjukkan urutan.",
      "diagramType": "number-line",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "compare-place-value-boards",
      "title": "Bandingkan Dua Papan",
      "bookReference": "hlm. 212–213 (bandingkan puluhan lalu satuan)",
      "objective": "Pakai Garis Bilangan 100: Posisi menunjukkan urutan. Latihan: Membandingkan dua bilangan pada dua papan nilai tempat..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Dua papan nilai tempat A dan B ditampilkan, dan siswa memilih papan yang lebih besar atau sama besar. Saat bermain, ingat Garis Bilangan 100: Posisi menunjukkan urutan.",
      "voiceGuide": "Garis Bilangan 100. Posisi menunjukkan urutan.",
      "diagramType": "place-value-compare",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "order-boards",
      "title": "Urutkan Papan",
      "bookReference": "hlm. 214 dan 222 (urutkan bilangan)",
      "objective": "Pakai Garis Bilangan 100: Posisi menunjukkan urutan. Latihan: Mengurutkan papan nilai tempat dari bilangan terkecil atau terbesar..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga atau empat papan. Siswa mengetuk papan satu per satu menurut urutan. Saat bermain, ingat Garis Bilangan 100: Posisi menunjukkan urutan.",
      "voiceGuide": "Garis Bilangan 100. Posisi menunjukkan urutan.",
      "diagramType": "board-order",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-bigger-model",
      "title": "Ketuk Model Terbesar dan Terkecil",
      "bookReference": "hlm. 214 (bilangan paling besar dan paling kecil)",
      "objective": "Pakai Garis Bilangan 100: Posisi menunjukkan urutan. Latihan: Menemukan model batang dan kotak yang paling besar dan paling kecil..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga model dan dua pertanyaan: terbesar, lalu terkecil. Siswa mengetuk modelnya. Saat bermain, ingat Garis Bilangan 100: Posisi menunjukkan urutan.",
      "voiceGuide": "Garis Bilangan 100. Posisi menunjukkan urutan.",
      "diagramType": "model-pick",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sort-models-reference",
      "title": "Pilah Model terhadap Acuan",
      "bookReference": "hlm. 216 (lebih besar dan lebih kecil dari sebuah bilangan)",
      "objective": "Memilah model menurut lebih besar atau lebih kecil dari bilangan acuan.. Ingat Garis Bilangan 100. (Garis Bilangan 100)",
      "mechanicDescription": "Tiga ronde, tiap ronde bilangan acuan (50, 30, 80) dan enam model. Siswa menyeret atau mengetuk model ke kotak yang tepat. Gunakan Garis Bilangan 100.",
      "voiceGuide": "Garis Bilangan 100. Mainkan dengan teliti.",
      "diagramType": "model-sort",
      "numberA": 3,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "match-boards-symbol",
      "title": "Jodohkan Papan dan Tanda",
      "bookReference": "hlm. 212–213 (lebih besar, lebih kecil, sama dengan)",
      "objective": "Menjodohkan dua papan dengan tanda perbandingan yang tepat.. Ingat Garis Bilangan 100. (Garis Bilangan 100)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga pasang papan dan tiga kartu tanda lebih besar, lebih kecil, dan sama dengan. Siswa mengetuk pasangan papan lalu kartu tandanya. Gunakan Garis Bilangan 100.",
      "voiceGuide": "Garis Bilangan 100. Mainkan dengan teliti.",
      "diagramType": "symbol-match",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "hundred-chart-neighbors",
      "title": "Tetangga di Tabel Seratus",
      "bookReference": "hlm. 209 (tabel bilangan 51 sampai 100)",
      "objective": "Menemukan bilangan yang hilang pada tabel seratus dari bilangan tetangganya.. Ingat Garis Bilangan 100. (Garis Bilangan 100)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat atau lima kotak kosong pada tabel sepuluh kolom. Siswa memilih satu dari tiga angka untuk kotak yang menyala. Gunakan Garis Bilangan 100.",
      "voiceGuide": "Garis Bilangan 100. Mainkan dengan teliti.",
      "diagramType": "hundred-chart",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "step-on-diagram-line",
      "title": "Langkah pada Garis Diagram",
      "bookReference": "hlm. 210 (maju dua langkah, mundur tiga langkah)",
      "objective": "Maju dan mundur satu langkah pada garis bilangan diagram.. Ingat Garis Bilangan 100. (Garis Bilangan 100)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Bulatan penanda berada di sebuah bilangan, dan siswa menekan Maju atau Mundur sesuai perintah. Gunakan Garis Bilangan 100.",
      "voiceGuide": "Garis Bilangan 100. Mainkan dengan teliti.",
      "diagramType": "step-line",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-boards-numerals",
      "title": "Memori Papan dan Bilangan",
      "bookReference": "hlm. 212–213 (bilangan dan puluhan satuannya)",
      "objective": "Mencocokkan papan nilai tempat dengan lambang bilangannya.. Ingat Garis Bilangan 100. (Garis Bilangan 100)",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): papan nilai tempat dan lambang bilangannya. Gunakan Garis Bilangan 100.",
      "voiceGuide": "Garis Bilangan 100. Mainkan dengan teliti.",
      "diagramType": "board-memory",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "select-all-models-reference",
      "title": "Ketuk Semua Model terhadap Acuan",
      "bookReference": "hlm. 216–217 (bilangan yang lebih besar atau lebih kecil)",
      "objective": "Memilih semua model yang lebih besar atau lebih kecil dari sebuah acuan.. Ingat Garis Bilangan 100. (Garis Bilangan 100)",
      "mechanicDescription": "Tiga ronde, tiap ronde enam model dan satu perintah, misalnya lebih besar dari 60. Siswa mengetuk semua yang memenuhi, lalu menekan Periksa. Gunakan Garis Bilangan 100.",
      "voiceGuide": "Garis Bilangan 100. Mainkan dengan teliti.",
      "diagramType": "model-select",
      "numberA": 3,
      "numberB": 6
    },
    {
      "stage": "Abstract",
      "gameType": "complete-compare-sentences",
      "title": "Lengkapi Kalimat Banding",
      "bookReference": "hlm. 212–213 (bilangan 65 lebih besar dari bilangan 56)",
      "objective": "Pakai Tanda Banding: Pakai <, >, = dengan tepat. Latihan: Melengkapi kalimat perbandingan dua bilangan dengan kata yang tepat..",
      "mechanicDescription": "Dua ronde, tiap ronde tiga kalimat, misalnya bilangan 58 ... bilangan 54. Siswa memilih lebih besar dari, lebih kecil dari, atau sama dengan. Kalimat lengkap dibacakan. Saat bermain, ingat Tanda Banding: Pakai <, >, = dengan tepat.",
      "voiceGuide": "Tanda Banding. Pakai <, >, = dengan tepat.",
      "symbolLarge": ">  <  =",
      "wordLarge": "LEBIH BESAR DARI",
      "mathNotation": "lebih besar • lebih kecil • sama dengan"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-compare",
      "title": "Benar atau Salah: Perbandingan",
      "bookReference": "hlm. 209–217 (membandingkan dan lebih dari, kurang dari)",
      "objective": "Pakai Tanda Banding: Pakai <, >, = dengan tepat. Latihan: Menilai pernyataan tentang perbandingan, lebihnya, dan kurangnya..",
      "mechanicDescription": "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan dihitung dari bilangan, dan tiap jawaban diberi penjelasan singkat. Saat bermain, ingat Tanda Banding: Pakai <, >, = dengan tepat.",
      "voiceGuide": "Tanda Banding. Pakai <, >, = dengan tepat.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "periksa dengan alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "build-compare-sentence",
      "title": "Susun Kalimat Banding",
      "bookReference": "hlm. 209–213 (kalimat perbandingan dan menghitung maju mundur)",
      "objective": "Pakai Tanda Banding: Pakai <, >, = dengan tepat. Latihan: Menyusun kata menjadi kalimat tentang perbandingan dan langkah maju atau mundur..",
      "mechanicDescription": "Empat kalimat. Kartu kata diketuk berurutan. Satu kartu pengecoh tidak dipakai. Kalimat yang benar dibacakan. Saat bermain, ingat Tanda Banding: Pakai <, >, = dengan tepat.",
      "voiceGuide": "Tanda Banding. Pakai <, >, = dengan tepat.",
      "symbolLarge": "Aa",
      "wordLarge": "SUSUN KATA",
      "mathNotation": "kata • kalimat • makna"
    },
    {
      "stage": "Abstract",
      "gameType": "riddle-i-am-a-number",
      "title": "Aku Adalah Bilangan",
      "bookReference": "hlm. 217 nomor 4 dan 5 (aku dua lebihnya dari 76; aku satu kurangnya dari 67)",
      "objective": "Pakai Tanda Banding: Pakai <, >, = dengan tepat. Latihan: Menemukan bilangan dari petunjuk lebihnya atau kurangnya..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal, misalnya aku dua lebihnya dari bilangan 76. Siswa memilih satu dari tiga bilangan. Saat bermain, ingat Tanda Banding: Pakai <, >, = dengan tepat.",
      "voiceGuide": "Tanda Banding. Pakai <, >, = dengan tepat.",
      "symbolLarge": "76 + 2",
      "wordLarge": "AKU BILANGAN APA?",
      "mathNotation": "lebihnya • kurangnya"
    },
    {
      "stage": "Abstract",
      "gameType": "fill-more-less-table",
      "title": "Tabel Lebihnya dan Kurangnya",
      "bookReference": "hlm. 209–210 (2 lebihnya dari 58; 3 kurangnya dari 75)",
      "objective": "Mengisi tabel bilangan yang sekian lebihnya atau kurangnya.. Ingat Tanda Banding. (Tanda Banding)",
      "mechanicDescription": "Dua ronde dengan tabel berisi empat baris: 2 lebihnya dari bilangan dan 3 kurangnya dari bilangan. Siswa mengetuk baris, lalu mengetuk kartu angka. Gunakan Tanda Banding.",
      "voiceGuide": "Tanda Banding. Mainkan dengan teliti.",
      "symbolLarge": "58 → 60",
      "wordLarge": "TABEL",
      "mathNotation": "lebihnya • kurangnya"
    },
    {
      "stage": "Abstract",
      "gameType": "write-two-digits",
      "title": "Tulis Dua Angka",
      "bookReference": "hlm. 208 dan 217 (tulis lambang bilangan)",
      "objective": "Menuliskan bilangan hasil lebihnya atau kurangnya pada papan dua angka.. Ingat Tanda Banding. (Tanda Banding)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal, misalnya satu kurangnya dari 80. Siswa mengatur angka puluhan dan angka satuan, lalu menekan Periksa. Gunakan Tanda Banding.",
      "voiceGuide": "Tanda Banding. Mainkan dengan teliti.",
      "symbolLarge": "7 9",
      "wordLarge": "TULIS BILANGAN",
      "mathNotation": "puluhan • satuan"
    },
    {
      "stage": "Abstract",
      "gameType": "riddle-number-clues-compare",
      "title": "Detektif Bilangan Besar Kecil",
      "bookReference": "hlm. 217 (aku adalah bilangan) dan 223 (buatlah pertanyaan untuk menunjukkan satu bilangan)",
      "objective": "Menemukan bilangan dari petunjuk lebih besar, lebih kecil, puluhan, dan satuan.. Ingat Tanda Banding. (Tanda Banding)",
      "mechanicDescription": "Empat soal. Siswa membaca tiga petunjuk, misalnya aku lebih besar dari 65, lebih kecil dari 70, dan satuanku 8, lalu memilih satu dari tiga bilangan. Gunakan Tanda Banding.",
      "voiceGuide": "Tanda Banding. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "tiga petunjuk, satu jawaban"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-map-fill",
      "title": "Peta Konsep Banding",
      "bookReference": "hlm. 192 (peta konsep: membandingkan bilangan; lebih dari dan kurang dari)",
      "objective": "Melengkapi peta konsep membandingkan dua bilangan serta lebih dari dan kurang dari.. Ingat Tanda Banding. (Tanda Banding)",
      "mechanicDescription": "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. Gunakan Tanda Banding.",
      "voiceGuide": "Tanda Banding. Mainkan dengan teliti.",
      "symbolLarge": "⇄",
      "wordLarge": "PETA KONSEP",
      "mathNotation": "banding • lebih • kurang"
    },
    {
      "stage": "Abstract",
      "gameType": "order-numerals",
      "title": "Urutkan Lima Bilangan",
      "bookReference": "hlm. 214 dan 222 nomor 5 (urutkan bilangan mulai dari yang paling kecil)",
      "objective": "Mengurutkan empat atau lima bilangan dari yang paling kecil atau paling besar.. Ingat Tanda Banding. (Tanda Banding)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat atau lima bilangan, misalnya 65, 71, 56, 79, 60. Siswa mengetuk bilangan satu per satu menurut urutan. Gunakan Tanda Banding.",
      "voiceGuide": "Tanda Banding. Mainkan dengan teliti.",
      "symbolLarge": "56 < 60",
      "wordLarge": "URUTKAN",
      "mathNotation": "bandingkan puluhan dulu"
    },
    {
      "stage": "Abstract",
      "gameType": "select-all-compare-reference",
      "title": "Ketuk Semua terhadap Acuan",
      "bookReference": "hlm. 216–217 (lingkari bilangan yang lebih besar)",
      "objective": "Memilih semua bilangan yang lebih besar atau lebih kecil dari sebuah acuan.. Ingat Tanda Banding. (Tanda Banding)",
      "mechanicDescription": "Tiga ronde, tiap ronde enam bilangan dan satu perintah, misalnya lebih besar dari 55. Siswa mengetuk semua yang memenuhi, lalu menekan Periksa. Gunakan Tanda Banding.",
      "voiceGuide": "Tanda Banding. Mainkan dengan teliti.",
      "symbolLarge": "✔✔",
      "wordLarge": "SEMUA BENAR",
      "mathNotation": "boleh lebih dari satu"
    }
  ],
  "poin": [
    {
      "ikon": "📏",
      "nama": "Garis bilangan",
      "isi": "kanan lebih besar, kiri lebih kecil",
      "suara": "Pada garis bilangan, bilangan di sebelah kanan lebih besar dan bilangan di sebelah kiri lebih kecil."
    },
    {
      "ikon": "🌍",
      "nama": "Banding Puluhan Dulu",
      "isi": "Puluhan menentukan siapa lebih besar.",
      "suara": "Banding Puluhan Dulu. Puluhan menentukan siapa lebih besar."
    },
    {
      "ikon": "🌍",
      "nama": "Garis Bilangan 100",
      "isi": "Posisi menunjukkan urutan.",
      "suara": "Garis Bilangan 100. Posisi menunjukkan urutan."
    },
    {
      "ikon": "🌍",
      "nama": "Tanda Banding",
      "isi": "Pakai <, >, = dengan tepat.",
      "suara": "Tanda Banding. Pakai <, >, = dengan tepat."
    }
  ],
  "poinSuara": "Ingat: Banding Puluhan Dulu, Garis Bilangan 100, Tanda Banding.",
  "cara": {
    "suara": "Cara menyebutkan. Enam puluh lima lebih besar dari lima puluh enam. Sebut bilangan pertama, kata perbandingan, lalu bilangan kedua.",
    "potongan": [
      {
        "teks": "Bilangan",
        "warna": "#FFFFFF"
      },
      {
        "teks": "kata perbandingan",
        "warna": "#FFE566"
      },
      {
        "teks": "dari",
        "warna": "#FFFFFF"
      },
      {
        "teks": "bilangan lain",
        "warna": "#7FCB96"
      }
    ]
  },
  "rumah": "Ayo Mencoba: terapkan Banding Puluhan Dulu pada satu soal nyata di rumah.",
  "refleksi": [
    "Bagaimana Banding Puluhan Dulu membantumu?",
    "Kapan memakai Garis Bilangan 100?",
    "Apa bedanya dengan hanya menghafal tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Compare Tens First",
      "namaId": "Banding Puluhan Dulu",
      "asal": "Place value compare",
      "ringkas": "Puluhan menentukan siapa lebih besar.",
      "tahap": [
        "Story",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Number Line to 100",
      "namaId": "Garis Bilangan 100",
      "asal": "Number line",
      "ringkas": "Posisi menunjukkan urutan.",
      "tahap": [
        "Picture",
        "Mind"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Symbols < > =",
      "namaId": "Tanda Banding",
      "asal": "Notation",
      "ringkas": "Pakai <, >, = dengan tepat.",
      "tahap": [
        "Infografis",
        "Abstract"
      ]
    }
  ]
};

export const SUB_BAB_K2B7: SubBabNaskah[] = [SUB_A7, SUB_B7];
export const semuaAdeganK2B7 = SUB_BAB_K2B7.flatMap((s) => s.videos.flatMap((v) => v.adegan));
