/**
 * Naskah — rewrite mendalam.
 * Metode luar dianyam ke Story, peta, infografis, poin, dan meta permainan.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K3B5_META = {
  "chapterId": "k3-mat-bab5",
  "phaseCode": "FASE_B",
  "grade": 3,
  "subjectLabel": "MATEMATIKA - KELAS 3 SD",
  "title": "BAB 5: PENYAJIAN DATA DALAM TABEL",
  "silabusElemen": "🌈 Fase B • Elemen Analisis Data dan Peluang: Mengurutkan Data, Membandingkan Data, dan Menyajikan Data dalam Tabel (Kelas 3 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A35: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Mengurutkan dan Membandingkan Data)",
  "fullTitle": "Sub-Bab A: Mengurutkan dan Membandingkan Data",
  "targetDescription": "Siswa mengurutkan data dari terkecil ke terbesar atau sebaliknya, menentukan data terkecil dan data terbesar, menghitung jangkauan (selisih data terbesar dan terkecil), serta mencacah banyak kemunculan sebuah nilai pada data ulangan dengan bantuan turus. Siswa memakai cara Banding Data, Urut Data, Turus Dulu.",
  "secondaryBg": "#E0E7FF",
  "secondaryBorder": "#4F46E5",
  "secondaryText": "#312E81",
  "silabus": {
    "teksSuara": "Kita belajar mengurutkan dan membandingkan data. Ibu guru membagikan nilai ulangan Matematika. Kita mengurutkan nilai dari yang terkecil, mencari nilai terbesar, menghitung jangkauan, dan menghitung berapa siswa mendapat nilai sembilan. Kita memakai cara dari luar buku: Banding Data (Compare Data); Urut Data (Order Data); Turus Dulu (Tally First). Bandingkan banyaknya antar kategori. Urutkan dari terbanyak/tersedikit. Kumpulkan dengan turus sebelum banding. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa mengurutkan data, menentukan data terkecil dan terbesar, serta menghitung jangkauan data. Pada sub-bab ini siswa juga mencacah banyak kemunculan nilai dengan turus.",
    "referensi": "Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 5 Sub-Bab A)."
  },
  "videos": [
    {
      "id": "K3B5A-V1",
      "judul": "Pemilihan Ketua Kelas",
      "subjudul": "Compare Data",
      "adegan": [
        {
          "id": "K3B5A-V1-1",
          "judul": "Hari pemilihan",
          "ketukan": [
            "Bayangkan situasi nyata di kelas atau di rumah. Hari ini diadakan pemilihan ketua kelas. Mari kita pahami bersama.",
            "Beberapa siswa diajukan menjadi calon ketua kelas. Mari kita pahami bersama.",
            "Setiap siswa berhak memilih salah satu calon. Mari kita pahami bersama.",
            "Ingat cara Banding Data: Bandingkan banyaknya antar kategori."
          ],
          "papan": [
            "Hari pemilihan ketua kelas",
            "Beberapa calon diajukan",
            "Setiap siswa memilih satu",
            "Suara terbanyak yang menang"
          ]
        },
        {
          "id": "K3B5A-V1-2",
          "judul": "Berapa calon",
          "ketukan": [
            "Ada berapa calon ketua kelas. Mari kita pahami bersama.",
            "Kita perlu mencatat suara tiap calon. Mari kita pahami bersama.",
            "Data suara itu akan kita urutkan dan bandingkan. Mari kita pahami bersama.",
            "Di sini kita memakai ide Compare Data — Bandingkan banyaknya antar kategori."
          ],
          "papan": [
            "Ada berapa calon?",
            "Catat suara tiap calon",
            "Urutkan dan bandingkan",
            "Siapa suara paling banyak?"
          ]
        },
        {
          "id": "K3B5A-V1-3",
          "judul": "Data perlu diurutkan",
          "ketukan": [
            "Untuk menjawabnya, data perlu disusun rapi. Mari kita pahami bersama.",
            "Kita mengurutkan data dari yang terkecil. Mari kita pahami bersama.",
            "Lalu kita bandingkan data terbesar dan terkecil. Mari kita pahami bersama.",
            "METODE LUAR · Banding Data: Bandingkan banyaknya antar kategori."
          ],
          "papan": [
            "Data disusun rapi",
            "Urutkan dari terkecil",
            "Bandingkan terbesar dan terkecil",
            "Awal belajar data"
          ]
        }
      ]
    },
    {
      "id": "K3B5A-V2",
      "judul": "Latihan: Urut Data",
      "subjudul": "Order Data",
      "adegan": [
        {
          "id": "K3B5A-V2-1",
          "judul": "Lembar isian",
          "ketukan": [
            "Setiap anggota kelompok mengisi lembar isian. Mari kita pahami bersama.",
            "Mereka menulis nama dan banyak anggota keluarga. Mari kita pahami bersama.",
            "Semua lembar dikumpulkan menjadi ringkasan data. Mari kita pahami bersama.",
            "Ingat cara Urut Data: Urutkan dari terbanyak/tersedikit."
          ],
          "papan": [
            "Isi lembar isian",
            "Nama dan banyak anggota",
            "Kumpulkan jadi ringkasan",
            "Data tercatat rapi"
          ]
        },
        {
          "id": "K3B5A-V2-2",
          "judul": "Urutkan dari terkecil",
          "ketukan": [
            "Urutkan nama dari yang jumlah anggota keluarganya terkecil. Mari kita pahami bersama.",
            "Berapa banyak anggota keluarga paling sedikit. Mari kita pahami bersama.",
            "Berapa banyak anggota keluarga paling banyak. Mari kita pahami bersama.",
            "Di sini kita memakai ide Order Data — Urutkan dari terbanyak/tersedikit."
          ],
          "papan": [
            "Urutkan dari terkecil",
            "Paling sedikit berapa?",
            "Paling banyak berapa?",
            "Adakah yang sama?"
          ]
        },
        {
          "id": "K3B5A-V2-3",
          "judul": "Jangkauan",
          "ketukan": [
            "Selisih nilai data terbesar dan terkecil disebut jangkauan. Mari kita pahami bersama.",
            "Jangkauan sama dengan data terbesar dikurangi data terkecil. Mari kita pahami bersama.",
            "Jangkauan membantu kita melihat seberapa jauh data menyebar. Mari kita pahami bersama.",
            "METODE LUAR · Urut Data: Urutkan dari terbanyak/tersedikit."
          ],
          "papan": [
            "Selisih disebut jangkauan",
            "Terbesar dikurangi terkecil",
            "Melihat seberapa jauh data",
            "Hitung jangkauan kelompok"
          ]
        }
      ]
    },
    {
      "id": "K3B5A-V3",
      "judul": "Siap pakai Tally First",
      "subjudul": "Tally First",
      "adegan": [
        {
          "id": "K3B5A-V3-1",
          "judul": "Hasil penilaian",
          "ketukan": [
            "Ibu guru membagikan hasil ulangan harian Matematika. Mari kita pahami bersama.",
            "Nilai siswa tertulis: sembilan, tujuh, delapan, enam, sepuluh, dan lima.",
            "Ada dua puluh data nilai yang perlu disusun. Mari kita pahami bersama.",
            "Ingat cara Turus Dulu: Kumpulkan dengan turus sebelum banding."
          ],
          "papan": [
            "Hasil ulangan dibagikan",
            "Nilai 5 sampai 10",
            "Dua puluh data nilai",
            "Urutkan dari terkecil"
          ]
        },
        {
          "id": "K3B5A-V3-2",
          "judul": "Enam macam nilai",
          "ketukan": [
            "Setelah diurutkan, tampak enam macam nilai: lima sampai sepuluh. Mari kita pahami bersama.",
            "Nilai terkecil adalah lima, nilai terbesar adalah sepuluh. Mari kita pahami bersama.",
            "Jangkauannya sepuluh dikurangi lima sama dengan lima. Mari kita pahami bersama.",
            "Di sini kita memakai ide Tally First — Kumpulkan dengan turus sebelum banding."
          ],
          "papan": [
            "Enam macam nilai",
            "Terkecil 5, terbesar 10",
            "Jangkauan 10 − 5 = 5",
            "Hitung banyak tiap nilai"
          ]
        },
        {
          "id": "K3B5A-V3-3",
          "judul": "Berapa siswa bernilai sembilan",
          "ketukan": [
            "Berapa siswa yang memiliki nilai sembilan. Mari kita pahami bersama.",
            "Ada lima siswa, Pak. Mari kita pahami bersama.",
            "Berapa banyak siswa yang mendapatkan nilai sepuluh. Mari kita pahami bersama.",
            "METODE LUAR · Turus Dulu: Kumpulkan dengan turus sebelum banding."
          ],
          "papan": [
            "Berapa siswa bernilai 9?",
            "Ada 5 siswa",
            "Berapa siswa bernilai 10?",
            "Ada 2 siswa, siap ke tabel"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Mengurutkan dan Membandingkan Data. Apa yang ditanyakan?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Compare Data",
      "stepDesc": "Bandingkan banyaknya antar kategori.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Order Data",
      "stepDesc": "Urutkan dari terbanyak/tersedikit.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Tally First",
      "stepDesc": "Kumpulkan dengan turus sebelum banding.",
      "icon": "✨",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Kerjakan",
      "stepDesc": "Terapkan cara itu pada angka atau gambar soal.",
      "icon": "✏️",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek masuk akal",
      "stepDesc": "Apakah hasilnya masuk akal? Bandingkan dengan perkiraan.",
      "icon": "✅",
      "flowFrom": "5",
      "flowTo": "7"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Simpulkan",
      "stepDesc": "Ulangi ide utamanya dengan kalimatmu sendiri.",
      "icon": "💬",
      "flowFrom": "6",
      "flowTo": "8"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Lanjut main",
      "stepDesc": "Siap melatih di permainan Concrete sampai Abstract.",
      "icon": "🎮",
      "flowFrom": "7",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "Mengurutkan Data",
      "emoji": "📶",
      "countNum": 1,
      "countWord": "urut",
      "suara": "Data diurutkan dari terkecil ke terbesar supaya mudah dibaca."
    },
    {
      "judul": "Data Terkecil",
      "emoji": "⬇️",
      "countNum": 5,
      "countWord": "terkecil",
      "suara": "Data terkecil adalah nilai paling kecil, misalnya lima."
    },
    {
      "judul": "Data Terbesar",
      "emoji": "⬆️",
      "countNum": 10,
      "countWord": "terbesar",
      "suara": "Data terbesar adalah nilai paling besar, misalnya sepuluh."
    },
    {
      "judul": "Jangkauan",
      "emoji": "📏",
      "countNum": 5,
      "countWord": "jangkauan",
      "suara": "Jangkauan sama dengan sepuluh dikurangi lima, hasilnya lima."
    },
    {
      "judul": "Turus",
      "emoji": "||||",
      "countNum": 4,
      "countWord": "garis",
      "suara": "Turus adalah garis tegak. Satu garis untuk satu data."
    },
    {
      "judul": "Kelompok Lima",
      "emoji": "卌",
      "countNum": 5,
      "countWord": "lima",
      "suara": "Empat garis tegak dicoret garis miring menjadi kelompok lima."
    },
    {
      "judul": "Banyak Nilai 9",
      "emoji": "5️⃣",
      "countNum": 5,
      "countWord": "siswa",
      "suara": "Pada data ulangan, nilai sembilan diperoleh lima siswa."
    },
    {
      "judul": "Banyak Nilai 10",
      "emoji": "2️⃣",
      "countNum": 2,
      "countWord": "siswa",
      "suara": "Nilai sepuluh diperoleh dua siswa."
    },
    {
      "judul": "Enam Macam Nilai",
      "emoji": "6️⃣",
      "countNum": 6,
      "countWord": "macam",
      "suara": "Ada enam macam nilai: lima, enam, tujuh, delapan, sembilan, dan sepuluh."
    },
    {
      "judul": "Siap ke Tabel",
      "emoji": "📋",
      "countNum": 3,
      "countWord": "kolom",
      "suara": "Tabel nilai memiliki kolom nilai, turus, dan banyak."
    },
    {
      "judul": "Banding Data",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "ingat",
      "suara": "Bandingkan banyaknya antar kategori."
    },
    {
      "judul": "Urut Data",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "ingat",
      "suara": "Urutkan dari terbanyak/tersedikit."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "order-children-objects",
      "title": "Urutkan Anak menurut Banyak Benda",
      "bookReference": "hlm. 198–199 (Aktivitas 1: mengurutkan data)",
      "objective": "Pakai Banding Data: Bandingkan banyaknya antar kategori. Latihan: Mengurutkan anak dari yang banyak bendanya paling kecil atau paling besar..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga anak dengan tumpukan benda. Siswa mengetuk anak satu per satu menurut urutan yang diminta. Saat bermain, terapkan Compare Data: Bandingkan banyaknya antar kategori.",
      "voiceGuide": "Banding Data. Bandingkan banyaknya antar kategori.",
      "emoji": "🍎",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-most-least-objects",
      "title": "Ketuk yang Paling Banyak atau Paling Sedikit",
      "bookReference": "hlm. 199 (paling sedikit dan paling banyak)",
      "objective": "Pakai Banding Data: Bandingkan banyaknya antar kategori. Latihan: Menemukan anak dengan tumpukan benda paling banyak atau paling sedikit..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga anak dan dua pertanyaan. Siswa mengetuk anak yang cocok. Saat bermain, terapkan Compare Data: Bandingkan banyaknya antar kategori.",
      "voiceGuide": "Banding Data. Bandingkan banyaknya antar kategori.",
      "emoji": "👆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "range-objects",
      "title": "Selisih Terbanyak dan Tersedikit",
      "bookReference": "hlm. 199 (jangkauan = terbesar − terkecil)",
      "objective": "Pakai Banding Data: Bandingkan banyaknya antar kategori. Latihan: Menghitung selisih banyak benda terbanyak dan tersedikit (jangkauan)..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa melihat tumpukan beberapa anak lalu memilih selisihnya. Saat bermain, terapkan Compare Data: Bandingkan banyaknya antar kategori.",
      "voiceGuide": "Banding Data. Bandingkan banyaknya antar kategori.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "match-pile-count",
      "title": "Jodohkan Tumpukan dan Banyaknya",
      "bookReference": "hlm. 198 (mencacah banyak data)",
      "objective": "Pakai Banding Data: Bandingkan banyaknya antar kategori. Latihan: Menjodohkan tumpukan benda dengan bilangan banyaknya..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga tumpukan dan tiga bilangan. Siswa mengetuk tumpukan, lalu mengetuk bilangannya. Saat bermain, terapkan Compare Data: Bandingkan banyaknya antar kategori.",
      "voiceGuide": "Banding Data. Bandingkan banyaknya antar kategori.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "memory-pile-count",
      "title": "Memori Tumpukan dan Banyaknya",
      "bookReference": "hlm. 198 (mencacah banyak data)",
      "objective": "Mencocokkan tumpukan benda dengan banyaknya lewat permainan memori.. Ingat Banding Data.",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. Gunakan Banding Data.",
      "voiceGuide": "Banding Data. Balik dua kartu, cari tumpukan dan banyaknya.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-condition-objects",
      "title": "Ketuk Semua Tumpukan dengan Syarat",
      "bookReference": "hlm. 199 (membandingkan data)",
      "objective": "Menemukan semua tumpukan yang lebih, kurang, atau sama dengan bilangan acuan.. Ingat Banding Data.",
      "mechanicDescription": "Tiga ronde, tiap ronde empat tumpukan dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. Gunakan Banding Data.",
      "voiceGuide": "Banding Data. Ketuk semua yang cocok, lalu periksa.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "board-count-objects",
      "title": "Papan: Berapa Banyak Benda",
      "bookReference": "hlm. 198 (mencacah data)",
      "objective": "Menghitung tumpukan benda lalu menulis banyaknya pada papan puluhan dan satuan.. Ingat Banding Data.",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa mengatur angka pada papan lalu menekan Periksa. Gunakan Banding Data.",
      "voiceGuide": "Banding Data. Isi papan dengan banyak bendanya.",
      "emoji": "🗂️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "total-objects-children",
      "title": "Jumlah Benda Semua Anak",
      "bookReference": "hlm. 198 (ringkasan data kelompok)",
      "objective": "Menjumlahkan banyak benda semua anak pada satu gambar.. Ingat Banding Data.",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa menjumlahkan lalu memilih hasilnya. Gunakan Banding Data.",
      "voiceGuide": "Banding Data. Jumlahkan semua benda, lalu pilih hasilnya.",
      "emoji": "➕",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-pile-bins",
      "title": "Pilah Tumpukan: Sedikit, Sedang, atau Banyak",
      "bookReference": "hlm. 199 (membandingkan data)",
      "objective": "Memilah tumpukan menjadi sedikit (kurang dari 5), sedang (5 sampai 7), atau banyak (lebih dari 7).. Ingat Banding Data.",
      "mechanicDescription": "Tiga ronde, tiap ronde enam tumpukan dan tiga kotak. Siswa menyeret atau mengetuk tumpukan ke kotak yang tepat. Gunakan Banding Data.",
      "voiceGuide": "Banding Data. Pilah tumpukan ke kotak yang tepat.",
      "emoji": "📦",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "difference-two-children",
      "title": "Berapa Lebih Banyak",
      "bookReference": "hlm. 199 (selisih data)",
      "objective": "Menghitung berapa lebih banyak benda satu anak dibanding anak lain.. Ingat Banding Data.",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa melihat dua tumpukan lalu memilih selisihnya. Gunakan Banding Data.",
      "voiceGuide": "Banding Data. Hitung selisih dua tumpukan.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "read-tally",
      "title": "Baca Turus",
      "bookReference": "hlm. 198 (mengingat turus Kelas 2)",
      "objective": "Pakai Urut Data: Urutkan dari terbanyak/tersedikit. Latihan: Membaca banyak data dari gambar turus kelompok lima..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa menghitung garis turus lalu memilih bilangannya. Saat bermain, terapkan Order Data: Urutkan dari terbanyak/tersedikit.",
      "voiceGuide": "Urut Data. Urutkan dari terbanyak/tersedikit.",
      "diagramType": "tally-read",
      "numberA": 2,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "order-tally",
      "title": "Urutkan Turus",
      "bookReference": "hlm. 198–199 (mengurutkan data)",
      "objective": "Pakai Urut Data: Urutkan dari terbanyak/tersedikit. Latihan: Mengurutkan kartu turus dari yang paling kecil atau paling besar..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga kartu turus. Siswa mengetuk kartu satu per satu menurut urutan yang diminta. Saat bermain, terapkan Order Data: Urutkan dari terbanyak/tersedikit.",
      "voiceGuide": "Urut Data. Urutkan dari terbanyak/tersedikit.",
      "diagramType": "tally-order",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-most-least-tally",
      "title": "Ketuk Turus Paling Banyak atau Paling Sedikit",
      "bookReference": "hlm. 199 (membandingkan data)",
      "objective": "Pakai Urut Data: Urutkan dari terbanyak/tersedikit. Latihan: Menemukan kartu turus paling banyak atau paling sedikit..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga turus dan dua pertanyaan. Siswa mengetuk turus yang cocok. Saat bermain, terapkan Order Data: Urutkan dari terbanyak/tersedikit.",
      "voiceGuide": "Urut Data. Urutkan dari terbanyak/tersedikit.",
      "diagramType": "tally-tap",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "range-from-tally-table",
      "title": "Jangkauan dari Tabel Turus",
      "bookReference": "hlm. 199 (jangkauan)",
      "objective": "Pakai Urut Data: Urutkan dari terbanyak/tersedikit. Latihan: Menghitung jangkauan dari tabel nama dan turus..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca tabel turus lalu memilih jangkauannya. Saat bermain, terapkan Order Data: Urutkan dari terbanyak/tersedikit.",
      "voiceGuide": "Urut Data. Urutkan dari terbanyak/tersedikit.",
      "diagramType": "tally-range",
      "numberA": 2,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-tally-count",
      "title": "Jodohkan Turus dan Banyaknya",
      "bookReference": "hlm. 198 (turus dan banyak)",
      "objective": "Menjodohkan gambar turus dengan bilangan banyaknya.. Ingat Urut Data.",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga turus dan tiga bilangan. Siswa mengetuk turus, lalu mengetuk bilangannya. Gunakan Urut Data.",
      "voiceGuide": "Urut Data. Ketuk turus, lalu ketuk banyaknya.",
      "diagramType": "tally-match",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memory-tally-count",
      "title": "Memori Turus dan Banyaknya",
      "bookReference": "hlm. 198 (turus dan banyak)",
      "objective": "Mencocokkan turus dengan banyaknya lewat permainan memori.. Ingat Urut Data.",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. Gunakan Urut Data.",
      "voiceGuide": "Urut Data. Balik dua kartu, cari turus dan banyaknya.",
      "diagramType": "tally-memory",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-tally-condition",
      "title": "Ketuk Semua Turus dengan Syarat",
      "bookReference": "hlm. 199 (membandingkan data)",
      "objective": "Menemukan semua turus yang lebih, kurang, atau sama dengan bilangan acuan.. Ingat Urut Data.",
      "mechanicDescription": "Tiga ronde, tiap ronde empat turus dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. Gunakan Urut Data.",
      "voiceGuide": "Urut Data. Ketuk semua yang cocok, lalu periksa.",
      "diagramType": "tally-select",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-tally-bins",
      "title": "Pilah Turus menurut Banyaknya",
      "bookReference": "hlm. 199 (membandingkan data)",
      "objective": "Memilah turus menjadi kurang dari 5, 5 sampai 9, atau 10 atau lebih.. Ingat Urut Data.",
      "mechanicDescription": "Tiga ronde, tiap ronde enam turus dan tiga kotak. Siswa menyeret atau mengetuk turus ke kotak yang tepat. Gunakan Urut Data.",
      "voiceGuide": "Urut Data. Pilah turus ke kotak yang tepat.",
      "diagramType": "tally-sort",
      "numberA": 3,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "most-frequent-value",
      "title": "Nilai yang Terbanyak",
      "bookReference": "hlm. 200 (berapa siswa bernilai 9)",
      "objective": "Menemukan nilai yang paling banyak muncul pada tabel nilai dan turus.. Ingat Urut Data.",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca tabel lalu memilih nilai yang terbanyak. Gunakan Urut Data.",
      "voiceGuide": "Urut Data. Pilih nilai yang paling banyak muncul.",
      "diagramType": "freq-mode",
      "numberA": 2,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "more-or-less-than-value",
      "title": "Lebih atau Kurang dari Nilai",
      "bookReference": "hlm. 200–201 (membandingkan nilai)",
      "objective": "Menghitung banyak siswa yang mendapat nilai lebih atau kurang dari acuan.. Ingat Urut Data.",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa menjumlahkan baris tabel yang cocok lalu memilih hasilnya. Gunakan Urut Data.",
      "voiceGuide": "Urut Data. Hitung siswa yang lebih atau kurang dari nilai itu.",
      "diagramType": "freq-compare",
      "numberA": 2,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "order-values",
      "title": "Urutkan Nilai Data",
      "bookReference": "hlm. 200 (mengurutkan dari terkecil)",
      "objective": "Pakai Turus Dulu: Kumpulkan dengan turus sebelum banding. Latihan: Mengurutkan bilangan data dari terkecil ke terbesar atau sebaliknya..",
      "mechanicDescription": "Tiga ronde, tiap ronde empat atau lima bilangan. Siswa mengetuk bilangan satu per satu menurut urutan. Saat bermain, terapkan Tally First: Kumpulkan dengan turus sebelum banding.",
      "voiceGuide": "Turus Dulu. Kumpulkan dengan turus sebelum banding.",
      "symbolLarge": "1 2 3",
      "wordLarge": "URUTKAN",
      "mathNotation": "dari terkecil atau terbesar"
    },
    {
      "stage": "Abstract",
      "gameType": "min-max-value",
      "title": "Nilai Terkecil dan Terbesar",
      "bookReference": "hlm. 199–200 (data terkecil dan terbesar)",
      "objective": "Pakai Turus Dulu: Kumpulkan dengan turus sebelum banding. Latihan: Menemukan data terkecil atau data terbesar pada daftar nilai..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca daftar lalu memilih nilai terkecil atau terbesar. Saat bermain, terapkan Tally First: Kumpulkan dengan turus sebelum banding.",
      "voiceGuide": "Turus Dulu. Kumpulkan dengan turus sebelum banding.",
      "symbolLarge": "min max",
      "wordLarge": "TERKECIL • TERBESAR",
      "mathNotation": "nilai paling kecil atau besar"
    },
    {
      "stage": "Abstract",
      "gameType": "compute-range",
      "title": "Jangkauan Data",
      "bookReference": "hlm. 199 (jangkauan = terbesar − terkecil)",
      "objective": "Pakai Turus Dulu: Kumpulkan dengan turus sebelum banding. Latihan: Menghitung jangkauan data: nilai terbesar dikurangi nilai terkecil..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa menghitung lalu memilih jangkauannya. Saat bermain, terapkan Tally First: Kumpulkan dengan turus sebelum banding.",
      "voiceGuide": "Turus Dulu. Kumpulkan dengan turus sebelum banding.",
      "symbolLarge": "max−min",
      "wordLarge": "JANGKAUAN",
      "mathNotation": "terbesar − terkecil"
    },
    {
      "stage": "Abstract",
      "gameType": "count-value-frequency",
      "title": "Banyak Nilai pada Data",
      "bookReference": "hlm. 200 (berapa siswa bernilai 9)",
      "objective": "Pakai Turus Dulu: Kumpulkan dengan turus sebelum banding. Latihan: Menghitung berapa kali sebuah nilai muncul pada data ulangan..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa mencacah nilai lalu memilih banyaknya. Saat bermain, terapkan Tally First: Kumpulkan dengan turus sebelum banding.",
      "voiceGuide": "Turus Dulu. Kumpulkan dengan turus sebelum banding.",
      "symbolLarge": "f",
      "wordLarge": "BANYAK NILAI",
      "mathNotation": "frekuensi nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "fill-data-sentence",
      "title": "Lengkapi Kalimat Tentang Data",
      "bookReference": "hlm. 199–200 (istilah data)",
      "objective": "Melengkapi kalimat tentang data terkecil, terbesar, jangkauan, dan turus.. Ingat Turus Dulu.",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga kalimat. Siswa memilih satu dari tiga kata untuk bagian kosong. Gunakan Turus Dulu.",
      "voiceGuide": "Turus Dulu. Pilih kata untuk bagian kosong.",
      "symbolLarge": "…",
      "wordLarge": "KALIMAT",
      "mathNotation": "istilah data"
    },
    {
      "stage": "Abstract",
      "gameType": "match-term-meaning",
      "title": "Jodohkan Istilah dan Artinya",
      "bookReference": "hlm. 196 (peta konsep dan kata kunci)",
      "objective": "Menjodohkan istilah data dengan artinya.. Ingat Turus Dulu.",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga pasangan. Siswa mengetuk istilah, lalu mengetuk artinya. Gunakan Turus Dulu.",
      "voiceGuide": "Turus Dulu. Ketuk istilah, lalu ketuk artinya.",
      "symbolLarge": "↔",
      "wordLarge": "JODOHKAN",
      "mathNotation": "istilah • arti"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-data",
      "title": "Benar atau Salah: Data",
      "bookReference": "hlm. 199–200 (mengamati data)",
      "objective": "Menilai pernyataan tentang mengurutkan data, jangkauan, dan turus.. Ingat Turus Dulu.",
      "mechanicDescription": "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Tiap jawaban diberi penjelasan. Gunakan Turus Dulu.",
      "voiceGuide": "Turus Dulu. Baca pernyataan, lalu pilih benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "periksa dengan alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-data",
      "title": "Detektif Data",
      "bookReference": "hlm. 199–200 (jangkauan dan nilai)",
      "objective": "Menemukan bilangan dari dua petunjuk tentang data.. Ingat Turus Dulu.",
      "mechanicDescription": "Empat soal. Siswa membaca petunjuk lalu memilih satu dari tiga bilangan. Hanya satu yang cocok. Gunakan Turus Dulu.",
      "voiceGuide": "Turus Dulu. Baca petunjuk, lalu pilih bilangannya.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "dua petunjuk, satu jawaban"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-map-data",
      "title": "Peta Konsep Data",
      "bookReference": "hlm. 196 (peta konsep)",
      "objective": "Melengkapi peta konsep membandingkan data dan mencacah data.. Ingat Turus Dulu.",
      "mechanicDescription": "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. Gunakan Turus Dulu.",
      "voiceGuide": "Turus Dulu. Pilih kartu yang tepat untuk kotak yang menyala.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA KONSEP",
      "mathNotation": "data • jangkauan • turus"
    },
    {
      "stage": "Abstract",
      "gameType": "sentence-words-data",
      "title": "Susun Kata Data",
      "bookReference": "hlm. 199–200 (kalimat kunci)",
      "objective": "Menyusun kalimat tentang jangkauan, mengurutkan data, dan turus dari kartu kata.. Ingat Turus Dulu.",
      "mechanicDescription": "Empat kalimat. Siswa mengetuk kartu kata satu per satu menurut urutan yang benar. Ada satu kartu pengecoh. Gunakan Turus Dulu.",
      "voiceGuide": "Turus Dulu. Susun kartu kata menjadi kalimat.",
      "symbolLarge": "…",
      "wordLarge": "SUSUN KATA",
      "mathNotation": "kalimat data"
    }
  ],
  "poin": [
    {
      "ikon": "📶",
      "nama": "Mengurutkan",
      "isi": "Data diurutkan dari terkecil ke terbesar atau dari terbesar ke terkecil",
      "suara": "Mengurutkan data memudahkan kita mencari data terkecil dan terbesar."
    },
    {
      "ikon": "⬇️",
      "nama": "Data terkecil dan terbesar",
      "isi": "Data terkecil adalah nilai paling kecil. Data terbesar adalah nilai paling besar",
      "suara": "Cari bilangan paling kecil dan paling besar pada data."
    },
    {
      "ikon": "🌍",
      "nama": "Banding Data",
      "isi": "Bandingkan banyaknya antar kategori.",
      "suara": "Banding Data. Bandingkan banyaknya antar kategori."
    },
    {
      "ikon": "🌍",
      "nama": "Urut Data",
      "isi": "Urutkan dari terbanyak/tersedikit.",
      "suara": "Urut Data. Urutkan dari terbanyak/tersedikit."
    },
    {
      "ikon": "🌍",
      "nama": "Turus Dulu",
      "isi": "Kumpulkan dengan turus sebelum banding.",
      "suara": "Turus Dulu. Kumpulkan dengan turus sebelum banding."
    }
  ],
  "poinSuara": "Ingat: Banding Data, Urut Data, Turus Dulu.",
  "cara": {
    "suara": "Urutkan data dari terkecil, cari data terkecil dan terbesar, hitung jangkauan, lalu cacah banyak tiap nilai dengan turus.",
    "potongan": [
      {
        "teks": "Urutkan data dari terkecil.",
        "warna": "#FFFFFF"
      },
      {
        "teks": "Cari data terkecil dan terbesar.",
        "warna": "#FFE566"
      },
      {
        "teks": "Hitung jangkauan.",
        "warna": "#7FCB96"
      },
      {
        "teks": "Cacah banyak tiap nilai dengan turus.",
        "warna": "#BAE6FD"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: terapkan Banding Data pada satu benda atau soal nyata, lalu ceritakan langkahmu.",
  "refleksi": [
    "Bagaimana Banding Data membantumu memahami soal?",
    "Kapan kamu memakai Urut Data?",
    "Apa bedanya dengan hanya menghafal rumus atau langkah tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Compare Data",
      "namaId": "Banding Data",
      "asal": "Data literacy",
      "ringkas": "Bandingkan banyaknya antar kategori.",
      "tahap": [
        "Story",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Order Data",
      "namaId": "Urut Data",
      "asal": "Data literacy",
      "ringkas": "Urutkan dari terbanyak/tersedikit.",
      "tahap": [
        "Picture",
        "Mind"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Tally First",
      "namaId": "Turus Dulu",
      "asal": "Tally marks",
      "ringkas": "Kumpulkan dengan turus sebelum banding.",
      "tahap": [
        "Infografis",
        "Concrete"
      ]
    }
  ]
};

export const SUB_B35: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Menyajikan Data dalam Bentuk Tabel)",
  "fullTitle": "Sub-Bab B: Menyajikan Data dalam Bentuk Tabel",
  "targetDescription": "Siswa menulis turus kelompok lima (empat tegak dan satu miring), menyajikan data nilai, huruf, dan manik dalam tabel bertiga kolom (nilai atau kategori, turus, dan banyak), serta membaca tabel untuk menjawab pertanyaan lebih dari, kurang dari, terbanyak, dan tersedikit. Siswa memakai cara Sajian Tabel, Judul Kolom Jelas, Baca Sel Tabel.",
  "secondaryBg": "#FEF3C7",
  "secondaryBorder": "#D97706",
  "secondaryText": "#78350F",
  "silabus": {
    "teksSuara": "Kita belajar menyajikan data dalam bentuk tabel. Lidi disusun menjadi turus kelompok lima. Manik dan huruf pada kata STATISTIKA dicacah dengan turus, lalu ditulis pada tabel nilai, turus, dan banyak. Kita memakai cara dari luar buku: Sajian Tabel (Table Display); Judul Kolom Jelas (Header Clarity); Baca Sel Tabel (Read Cells). Tabel memuat kategori dan frekuensi. Setiap kolom harus berlabel. Temukan nilai di perpotongan baris-kolom. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menyajikan data dalam bentuk tabel dengan turus kelompok lima dan kolom banyak. Pada sub-bab ini siswa membaca tabel untuk membandingkan data.",
    "referensi": "Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 5 Sub-Bab B)."
  },
  "videos": [
    {
      "id": "K3B5B-V1",
      "judul": "Lidi Menjadi Turus",
      "subjudul": "Table Display",
      "adegan": [
        {
          "id": "K3B5B-V1-1",
          "judul": "Satu sampai empat lidi",
          "ketukan": [
            "Bayangkan situasi nyata di kelas atau di rumah. Ambil satu lidi untuk menunjukkan data berjumlah satu. Mari kita pahami bersama.",
            "Tambahkan lidi tegak hingga berjumlah empat. Mari kita pahami bersama.",
            "Lidi disusun sejajar agar mudah dihitung. Mari kita pahami bersama.",
            "Ingat cara Sajian Tabel: Tabel memuat kategori dan frekuensi."
          ],
          "papan": [
            "Satu lidi = satu data",
            "Tambah sampai empat",
            "Lidi disusun sejajar",
            "Empat lidi = empat data"
          ]
        },
        {
          "id": "K3B5B-V1-2",
          "judul": "Garis miring kelima",
          "ketukan": [
            "Ambil empat lidi tegak seperti sebelumnya. Mari kita pahami bersama.",
            "Tambahkan satu lidi dan letakkan secara miring di atasnya. Mari kita pahami bersama.",
            "Sekarang lidi berjumlah lima. Mari kita pahami bersama.",
            "Di sini kita memakai ide Table Display — Tabel memuat kategori dan frekuensi."
          ],
          "papan": [
            "Empat lidi tegak",
            "Satu lidi miring di atasnya",
            "Jumlah menjadi lima",
            "Turus kelompok lima"
          ]
        },
        {
          "id": "K3B5B-V1-3",
          "judul": "Lebih dari lima",
          "ketukan": [
            "Ulangi kelompok lima, lalu tambahkan lidi di sebelahnya. Mari kita pahami bersama.",
            "Dua kelompok lima sama dengan sepuluh data. Mari kita pahami bersama.",
            "Dua kelompok lima ditambah tiga sama dengan tiga belas. Mari kita pahami bersama.",
            "METODE LUAR · Sajian Tabel: Tabel memuat kategori dan frekuensi."
          ],
          "papan": [
            "Ulangi kelompok lima",
            "Dua kelompok = 10",
            "10 + 3 = 13",
            "Pencacahan lebih cepat"
          ]
        }
      ]
    },
    {
      "id": "K3B5B-V2",
      "judul": "Latihan: Judul Kolom Jelas",
      "subjudul": "Header Clarity",
      "adegan": [
        {
          "id": "K3B5B-V2-1",
          "judul": "Tiga warna manik",
          "ketukan": [
            "Anggota kelompok mendapat manik merah, biru, dan hitam. Mari kita pahami bersama.",
            "Mereka menghitung manik tiap warna satu per satu. Mari kita pahami bersama.",
            "Hasil hitungan dicatat dengan turus. Mari kita pahami bersama.",
            "Ingat cara Judul Kolom Jelas: Setiap kolom harus berlabel."
          ],
          "papan": [
            "Manik merah, biru, hitam",
            "Hitung tiap warna",
            "Catat dengan turus",
            "Turus jadi angka"
          ]
        },
        {
          "id": "K3B5B-V2-2",
          "judul": "Tabel manik",
          "ketukan": [
            "Tabel manik memiliki tiga kolom. Mari kita pahami bersama.",
            "Kolom pertama: warna manik. Mari kita pahami bersama.",
            "Kolom kedua: turus. Mari kita pahami bersama.",
            "Di sini kita memakai ide Header Clarity — Setiap kolom harus berlabel."
          ],
          "papan": [
            "Tabel tiga kolom",
            "Kolom warna",
            "Kolom turus",
            "Kolom banyak"
          ]
        },
        {
          "id": "K3B5B-V2-3",
          "judul": "Siapa paling banyak",
          "ketukan": [
            "Siapa anggota dengan manik merah paling banyak. Mari kita pahami bersama.",
            "Siapa yang paling sedikit. Mari kita pahami bersama.",
            "Tabel membantu kita menjawab dengan cepat. Mari kita pahami bersama.",
            "METODE LUAR · Judul Kolom Jelas: Setiap kolom harus berlabel."
          ],
          "papan": [
            "Manik merah paling banyak?",
            "Paling sedikit?",
            "Tabel menjawab cepat",
            "Tanpa hitung ulang"
          ]
        }
      ]
    },
    {
      "id": "K3B5B-V3",
      "judul": "Siap pakai Read Cells",
      "subjudul": "Read Cells",
      "adegan": [
        {
          "id": "K3B5B-V3-1",
          "judul": "Kata STATISTIKA",
          "ketukan": [
            "Perhatikan kata STATISTIKA. Mari kita pahami bersama.",
            "Huruf-hurufnya dicacah satu per satu. Mari kita pahami bersama.",
            "Huruf T muncul tiga kali. Mari kita pahami bersama.",
            "Ingat cara Baca Sel Tabel: Temukan nilai di perpotongan baris-kolom."
          ],
          "papan": [
            "Kata STATISTIKA",
            "Cacah huruf satu per satu",
            "Huruf T ada 3",
            "S ada 2, K ada 1"
          ]
        },
        {
          "id": "K3B5B-V3-2",
          "judul": "Isi tabel huruf",
          "ketukan": [
            "Buat tabel: huruf, turus, dan banyak. Mari kita pahami bersama.",
            "Tulis turus sesuai banyak kemunculan tiap huruf. Mari kita pahami bersama.",
            "Salin banyaknya ke kolom angka. Mari kita pahami bersama.",
            "Di sini kita memakai ide Read Cells — Temukan nilai di perpotongan baris-kolom."
          ],
          "papan": [
            "Kolom huruf, turus, banyak",
            "Tulis turus tiap huruf",
            "Salin ke kolom angka",
            "Tabel huruf siap"
          ]
        },
        {
          "id": "K3B5B-V3-3",
          "judul": "Baca tabel nilai",
          "ketukan": [
            "Cara yang sama dipakai pada tabel nilai ulangan. Mari kita pahami bersama.",
            "Nilai diurutkan, lalu ditulis turus dan banyaknya. Mari kita pahami bersama.",
            "Kita bisa menjawab: berapa siswa bernilai lebih dari tujuh. Mari kita pahami bersama.",
            "METODE LUAR · Baca Sel Tabel: Temukan nilai di perpotongan baris-kolom."
          ],
          "papan": [
            "Sama pada tabel nilai",
            "Urutkan, turus, banyak",
            "Lebih dari tujuh berapa?",
            "Data rapi dan mudah"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Menyajikan Data dalam Bentuk Tabel. Apa yang ditanyakan?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Table Display",
      "stepDesc": "Tabel memuat kategori dan frekuensi.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Header Clarity",
      "stepDesc": "Setiap kolom harus berlabel.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Read Cells",
      "stepDesc": "Temukan nilai di perpotongan baris-kolom.",
      "icon": "✨",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Kerjakan",
      "stepDesc": "Terapkan cara itu pada angka atau gambar soal.",
      "icon": "✏️",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek masuk akal",
      "stepDesc": "Apakah hasilnya masuk akal? Bandingkan dengan perkiraan.",
      "icon": "✅",
      "flowFrom": "5",
      "flowTo": "7"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Simpulkan",
      "stepDesc": "Ulangi ide utamanya dengan kalimatmu sendiri.",
      "icon": "💬",
      "flowFrom": "6",
      "flowTo": "8"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Lanjut main",
      "stepDesc": "Siap melatih di permainan Concrete sampai Abstract.",
      "icon": "🎮",
      "flowFrom": "7",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "Empat Lidi Tegak",
      "emoji": "||||",
      "countNum": 4,
      "countWord": "lidi",
      "suara": "Empat lidi tegak menyatakan empat data."
    },
    {
      "judul": "Kelompok Lima",
      "emoji": "卌",
      "countNum": 5,
      "countWord": "lima",
      "suara": "Empat tegak ditambah satu miring menjadi kelompok lima."
    },
    {
      "judul": "Dua Kelompok",
      "emoji": "🔟",
      "countNum": 10,
      "countWord": "sepuluh",
      "suara": "Dua kelompok lima menyatakan sepuluh data."
    },
    {
      "judul": "Tiga Belas",
      "emoji": "1️⃣3️⃣",
      "countNum": 13,
      "countWord": "tiga belas",
      "suara": "Dua kelompok lima ditambah tiga turus sama dengan tiga belas."
    },
    {
      "judul": "Tabel Tiga Kolom",
      "emoji": "📋",
      "countNum": 3,
      "countWord": "kolom",
      "suara": "Tabel memuat kategori, turus, dan banyak."
    },
    {
      "judul": "Manik Merah",
      "emoji": "🔴",
      "countNum": 1,
      "countWord": "merah",
      "suara": "Manik merah, biru, dan hitam dicatat per warna."
    },
    {
      "judul": "Huruf T",
      "emoji": "🇹",
      "countNum": 3,
      "countWord": "tiga",
      "suara": "Pada STATISTIKA, huruf T muncul tiga kali."
    },
    {
      "judul": "Huruf K",
      "emoji": "🇰",
      "countNum": 1,
      "countWord": "satu",
      "suara": "Huruf K pada STATISTIKA muncul satu kali."
    },
    {
      "judul": "Lebih dari Tujuh",
      "emoji": ">",
      "countNum": 12,
      "countWord": "siswa",
      "suara": "Jumlahkan siswa bernilai delapan, sembilan, dan sepuluh."
    },
    {
      "judul": "Data Rapi",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "rapi",
      "suara": "Tabel membuat data rapi dan mudah dibandingkan."
    },
    {
      "judul": "Sajian Tabel",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "ingat",
      "suara": "Tabel memuat kategori dan frekuensi."
    },
    {
      "judul": "Judul Kolom Jelas",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "ingat",
      "suara": "Setiap kolom harus berlabel."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "count-groups-of-five",
      "title": "Hitung Kelompok Lima",
      "bookReference": "hlm. 201–202 (Aktivitas 2: turus kelompok lima)",
      "objective": "Pakai Sajian Tabel: Tabel memuat kategori dan frekuensi. Latihan: Menghitung banyak benda yang dikelompokkan lima-lima..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa menghitung kelompok lima dan sisanya lalu memilih hasilnya. Saat bermain, terapkan Table Display: Tabel memuat kategori dan frekuensi.",
      "voiceGuide": "Sajian Tabel. Tabel memuat kategori dan frekuensi.",
      "emoji": "🍎",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "count-sticks",
      "title": "Hitung Lidi",
      "bookReference": "hlm. 201 (lidi sebagai turus)",
      "objective": "Pakai Sajian Tabel: Tabel memuat kategori dan frekuensi. Latihan: Menghitung banyak lidi pada gambar turus lidi..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa menghitung lidi lalu memilih bilangannya. Saat bermain, terapkan Table Display: Tabel memuat kategori dan frekuensi.",
      "voiceGuide": "Sajian Tabel. Tabel memuat kategori dan frekuensi.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-sticks",
      "title": "Urutkan Lidi",
      "bookReference": "hlm. 201–202 (membandingkan turus lidi)",
      "objective": "Pakai Sajian Tabel: Tabel memuat kategori dan frekuensi. Latihan: Mengurutkan tumpukan lidi dari yang paling kecil atau paling besar..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga tumpukan lidi. Siswa mengetuk satu per satu menurut urutan. Saat bermain, terapkan Table Display: Tabel memuat kategori dan frekuensi.",
      "voiceGuide": "Sajian Tabel. Tabel memuat kategori dan frekuensi.",
      "emoji": "📶",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "count-red-beads",
      "title": "Hitung Manik Merah",
      "bookReference": "hlm. 203–204 (Aktivitas 3: manik)",
      "objective": "Pakai Sajian Tabel: Tabel memuat kategori dan frekuensi. Latihan: Menghitung banyak manik merah pada deretan sepuluh manik..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa menghitung manik merah lalu memilih bilangannya. Saat bermain, terapkan Table Display: Tabel memuat kategori dan frekuensi.",
      "voiceGuide": "Sajian Tabel. Tabel memuat kategori dan frekuensi.",
      "emoji": "🔴",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-beads-color",
      "title": "Pilah Manik menurut Warna",
      "bookReference": "hlm. 203–204 (manik merah, biru, hitam)",
      "objective": "Memilah manik ke kotak merah, biru, atau hitam.. Ingat Sajian Tabel.",
      "mechanicDescription": "Tiga ronde, tiap ronde sembilan manik dan tiga kotak. Siswa menyeret atau mengetuk manik ke kotak warnanya. Gunakan Sajian Tabel.",
      "voiceGuide": "Sajian Tabel. Pilah manik ke kotak warnanya.",
      "emoji": "🎨",
      "targetCount": 27
    },
    {
      "stage": "Concrete",
      "gameType": "tap-most-least-beads",
      "title": "Ketuk Anggota dengan Manik Merah",
      "bookReference": "hlm. 204 (paling banyak dan paling sedikit)",
      "objective": "Menemukan anggota dengan manik merah paling banyak atau paling sedikit.. Ingat Sajian Tabel.",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga anggota dan dua pertanyaan. Siswa mengetuk anggota yang cocok. Gunakan Sajian Tabel.",
      "voiceGuide": "Sajian Tabel. Ketuk anggota yang paling banyak atau paling sedikit.",
      "emoji": "👆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "board-count-sticks",
      "title": "Papan: Berapa Banyak Lidi",
      "bookReference": "hlm. 201–202 (mencacah lidi)",
      "objective": "Menghitung lidi lalu menulis banyaknya pada papan.. Ingat Sajian Tabel.",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa mengatur angka pada papan lalu menekan Periksa. Gunakan Sajian Tabel.",
      "voiceGuide": "Sajian Tabel. Isi papan dengan banyak lidi.",
      "emoji": "🗂️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "match-sticks-count",
      "title": "Jodohkan Lidi dan Banyaknya",
      "bookReference": "hlm. 201 (lidi dan bilangan)",
      "objective": "Menjodohkan tumpukan lidi dengan bilangan banyaknya.. Ingat Sajian Tabel.",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga tumpukan dan tiga bilangan. Siswa mengetuk lidi, lalu mengetuk bilangannya. Gunakan Sajian Tabel.",
      "voiceGuide": "Sajian Tabel. Ketuk lidi, lalu ketuk banyaknya.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "total-red-beads",
      "title": "Jumlah Manik Merah Semua Anggota",
      "bookReference": "hlm. 204 (menjumlahkan data manik)",
      "objective": "Menjumlahkan manik merah semua anggota.. Ingat Sajian Tabel.",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa menjumlahkan lalu memilih hasilnya. Gunakan Sajian Tabel.",
      "voiceGuide": "Sajian Tabel. Jumlahkan manik merah semua anggota.",
      "emoji": "➕",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memory-sticks-count",
      "title": "Memori Lidi dan Banyaknya",
      "bookReference": "hlm. 201 (lidi dan bilangan)",
      "objective": "Mencocokkan tumpukan lidi dengan banyaknya lewat permainan memori.. Ingat Sajian Tabel.",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. Gunakan Sajian Tabel.",
      "voiceGuide": "Sajian Tabel. Balik dua kartu, cari lidi dan banyaknya.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Picture",
      "gameType": "tally-to-number",
      "title": "Turus ke Angka",
      "bookReference": "hlm. 201–202 (turus kelompok lima)",
      "objective": "Pakai Judul Kolom Jelas: Setiap kolom harus berlabel. Latihan: Membaca banyak data dari gambar turus kelompok lima..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa menghitung turus lalu memilih bilangannya. Saat bermain, terapkan Header Clarity: Setiap kolom harus berlabel.",
      "voiceGuide": "Judul Kolom Jelas. Setiap kolom harus berlabel.",
      "diagramType": "tally-number",
      "numberA": 2,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "tap-correct-tally",
      "title": "Ketuk Turus yang Tepat",
      "bookReference": "hlm. 202 (membaca turus)",
      "objective": "Pakai Judul Kolom Jelas: Setiap kolom harus berlabel. Latihan: Menemukan kartu turus yang banyaknya sama dengan bilangan yang diminta..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga turus dan dua pertanyaan. Siswa mengetuk turus yang cocok. Saat bermain, terapkan Header Clarity: Setiap kolom harus berlabel.",
      "voiceGuide": "Judul Kolom Jelas. Setiap kolom harus berlabel.",
      "diagramType": "tally-pick",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "read-letter-table",
      "title": "Baca Tabel Huruf",
      "bookReference": "hlm. 205–206 (tabel huruf STATISTIKA)",
      "objective": "Pakai Judul Kolom Jelas: Setiap kolom harus berlabel. Latihan: Menemukan huruf terbanyak atau tersedikit pada kata dari tabel turus..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca tabel huruf lalu memilih hurufnya. Saat bermain, terapkan Header Clarity: Setiap kolom harus berlabel.",
      "voiceGuide": "Judul Kolom Jelas. Setiap kolom harus berlabel.",
      "diagramType": "letter-table",
      "numberA": 2,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "fill-letter-tally-table",
      "title": "Isi Tabel Huruf dan Turus",
      "bookReference": "hlm. 205–206 (mengisi kolom banyak)",
      "objective": "Pakai Judul Kolom Jelas: Setiap kolom harus berlabel. Latihan: Melengkapi kolom banyak pada tabel huruf dan turus..",
      "mechanicDescription": "Tiga tabel. Siswa mengetuk baris, lalu mengetuk kartu banyak yang tepat. Ada satu kartu pengecoh. Saat bermain, terapkan Header Clarity: Setiap kolom harus berlabel.",
      "voiceGuide": "Judul Kolom Jelas. Setiap kolom harus berlabel.",
      "diagramType": "letter-fill",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "order-letters-by-count",
      "title": "Urutkan Huruf menurut Banyaknya",
      "bookReference": "hlm. 206 (membandingkan huruf)",
      "objective": "Mengurutkan huruf menurut banyak kemunculannya pada kata.. Ingat Judul Kolom Jelas.",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga huruf dengan turus. Siswa mengetuk huruf satu per satu menurut urutan. Gunakan Judul Kolom Jelas.",
      "voiceGuide": "Judul Kolom Jelas. Ketuk huruf menurut banyaknya.",
      "diagramType": "letter-order",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "letter-count-difference",
      "title": "Selisih Banyak Huruf",
      "bookReference": "hlm. 206 (membandingkan huruf)",
      "objective": "Menghitung selisih banyak dua huruf pada sebuah kata.. Ingat Judul Kolom Jelas.",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa menghitung lalu memilih selisihnya. Gunakan Judul Kolom Jelas.",
      "voiceGuide": "Judul Kolom Jelas. Hitung selisih banyak dua huruf.",
      "diagramType": "letter-diff",
      "numberA": 2,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "total-letters",
      "title": "Jumlah Semua Huruf",
      "bookReference": "hlm. 205 (panjang kata)",
      "objective": "Menghitung jumlah semua huruf pada kata.. Ingat Judul Kolom Jelas.",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa menghitung huruf lalu memilih hasilnya. Gunakan Judul Kolom Jelas.",
      "voiceGuide": "Judul Kolom Jelas. Hitung jumlah semua huruf pada kata.",
      "diagramType": "letter-total",
      "numberA": 2,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "count-dot-groups-five",
      "title": "Hitung Titik Kelompok Lima",
      "bookReference": "hlm. 202 (kelompok lima)",
      "objective": "Menghitung banyak titik yang disusun kelompok lima.. Ingat Judul Kolom Jelas.",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa menghitung lalu memilih bilangannya. Gunakan Judul Kolom Jelas.",
      "voiceGuide": "Judul Kolom Jelas. Hitung titik kelompok lima.",
      "diagramType": "dot-five",
      "numberA": 2,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-letters-condition",
      "title": "Ketuk Semua Huruf dengan Syarat",
      "bookReference": "hlm. 206 (membandingkan huruf)",
      "objective": "Menemukan semua huruf yang banyaknya lebih, kurang, atau sama dengan acuan.. Ingat Judul Kolom Jelas.",
      "mechanicDescription": "Tiga ronde, tiap ronde empat huruf dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. Gunakan Judul Kolom Jelas.",
      "voiceGuide": "Judul Kolom Jelas. Ketuk semua yang cocok, lalu periksa.",
      "diagramType": "letter-select",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "read-score-table",
      "title": "Baca Tabel Nilai",
      "bookReference": "hlm. 207–208 (tabel nilai ulangan)",
      "objective": "Menghitung banyak siswa dengan nilai sama, lebih, atau kurang dari acuan pada tabel.. Ingat Judul Kolom Jelas.",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca tabel nilai lalu memilih hasilnya. Gunakan Judul Kolom Jelas.",
      "voiceGuide": "Judul Kolom Jelas. Baca tabel nilai, lalu pilih jawabannya.",
      "diagramType": "score-table",
      "numberA": 2,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "read-value-table",
      "title": "Baca Tabel Nilai (Angka)",
      "bookReference": "hlm. 207–208 (tabel nilai)",
      "objective": "Pakai Baca Sel Tabel: Temukan nilai di perpotongan baris-kolom. Latihan: Menemukan nilai yang paling banyak muncul atau banyak siswa pada nilai tertentu..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca data lalu memilih jawabannya. Saat bermain, terapkan Read Cells: Temukan nilai di perpotongan baris-kolom.",
      "voiceGuide": "Baca Sel Tabel. Temukan nilai di perpotongan baris-kolom.",
      "symbolLarge": "f",
      "wordLarge": "TABEL NILAI",
      "mathNotation": "frekuensi nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "more-than-on-data",
      "title": "Lebih dari pada Data",
      "bookReference": "hlm. 208 (lebih dari nilai acuan)",
      "objective": "Pakai Baca Sel Tabel: Temukan nilai di perpotongan baris-kolom. Latihan: Menghitung banyak data yang lebih dari bilangan acuan..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa mencacah lalu memilih hasilnya. Saat bermain, terapkan Read Cells: Temukan nilai di perpotongan baris-kolom.",
      "voiceGuide": "Baca Sel Tabel. Temukan nilai di perpotongan baris-kolom.",
      "symbolLarge": ">",
      "wordLarge": "LEBIH DARI",
      "mathNotation": "banyak data > acuan"
    },
    {
      "stage": "Abstract",
      "gameType": "less-than-on-data",
      "title": "Kurang dari pada Data",
      "bookReference": "hlm. 208 (kurang dari nilai acuan)",
      "objective": "Pakai Baca Sel Tabel: Temukan nilai di perpotongan baris-kolom. Latihan: Menghitung banyak data yang kurang dari bilangan acuan..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa mencacah lalu memilih hasilnya. Saat bermain, terapkan Read Cells: Temukan nilai di perpotongan baris-kolom.",
      "voiceGuide": "Baca Sel Tabel. Temukan nilai di perpotongan baris-kolom.",
      "symbolLarge": "<",
      "wordLarge": "KURANG DARI",
      "mathNotation": "banyak data < acuan"
    },
    {
      "stage": "Abstract",
      "gameType": "count-letter-in-word",
      "title": "Banyak Huruf pada Kata",
      "bookReference": "hlm. 205–206 (STATISTIKA dan MATEMATIKA)",
      "objective": "Pakai Baca Sel Tabel: Temukan nilai di perpotongan baris-kolom. Latihan: Menghitung banyak sebuah huruf pada kata..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa mencacah huruf lalu memilih banyaknya. Saat bermain, terapkan Read Cells: Temukan nilai di perpotongan baris-kolom.",
      "voiceGuide": "Baca Sel Tabel. Temukan nilai di perpotongan baris-kolom.",
      "symbolLarge": "A",
      "wordLarge": "BANYAK HURUF",
      "mathNotation": "frekuensi huruf"
    },
    {
      "stage": "Abstract",
      "gameType": "order-letters-abstract",
      "title": "Urutkan Huruf menurut Banyaknya",
      "bookReference": "hlm. 206 (membandingkan huruf)",
      "objective": "Mengurutkan huruf menurut banyak kemunculannya tanpa gambar turus.. Ingat Baca Sel Tabel.",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga huruf. Siswa mengetuk huruf satu per satu menurut urutan. Gunakan Baca Sel Tabel.",
      "voiceGuide": "Baca Sel Tabel. Ketuk huruf menurut banyaknya.",
      "symbolLarge": "A T K",
      "wordLarge": "URUTKAN HURUF",
      "mathNotation": "dari kecil atau besar"
    },
    {
      "stage": "Abstract",
      "gameType": "fill-table-sentence",
      "title": "Lengkapi Kalimat Tabel dan Turus",
      "bookReference": "hlm. 201–208 (istilah tabel)",
      "objective": "Melengkapi kalimat tentang turus kelompok lima dan kolom tabel.. Ingat Baca Sel Tabel.",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga kalimat. Siswa memilih satu dari tiga kata untuk bagian kosong. Gunakan Baca Sel Tabel.",
      "voiceGuide": "Baca Sel Tabel. Pilih kata untuk bagian kosong.",
      "symbolLarge": "…",
      "wordLarge": "KALIMAT",
      "mathNotation": "tabel • turus"
    },
    {
      "stage": "Abstract",
      "gameType": "match-table-terms",
      "title": "Jodohkan Istilah Tabel dan Artinya",
      "bookReference": "hlm. 196 dan 201–208 (kata kunci)",
      "objective": "Menjodohkan istilah tabel dan turus dengan artinya.. Ingat Baca Sel Tabel.",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga pasangan. Siswa mengetuk istilah, lalu mengetuk artinya. Gunakan Baca Sel Tabel.",
      "voiceGuide": "Baca Sel Tabel. Ketuk istilah, lalu ketuk artinya.",
      "symbolLarge": "↔",
      "wordLarge": "JODOHKAN",
      "mathNotation": "istilah • arti"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-table",
      "title": "Benar atau Salah: Tabel",
      "bookReference": "hlm. 201–208 (mengamati tabel)",
      "objective": "Menilai pernyataan tentang turus kelompok lima, tabel, dan huruf.. Ingat Baca Sel Tabel.",
      "mechanicDescription": "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Tiap jawaban diberi penjelasan. Gunakan Baca Sel Tabel.",
      "voiceGuide": "Baca Sel Tabel. Baca pernyataan, lalu pilih benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "periksa dengan alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-table",
      "title": "Detektif Tabel",
      "bookReference": "hlm. 205–208 (huruf dan nilai)",
      "objective": "Menemukan bilangan dari dua petunjuk tentang huruf atau nilai.. Ingat Baca Sel Tabel.",
      "mechanicDescription": "Empat soal. Siswa membaca petunjuk lalu memilih satu dari tiga bilangan. Hanya satu yang cocok. Gunakan Baca Sel Tabel.",
      "voiceGuide": "Baca Sel Tabel. Baca petunjuk, lalu pilih bilangannya.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "dua petunjuk, satu jawaban"
    },
    {
      "stage": "Abstract",
      "gameType": "sentence-words-table",
      "title": "Susun Kata Tabel",
      "bookReference": "hlm. 201–208 (kalimat kunci)",
      "objective": "Menyusun kalimat tentang turus kelompok lima dan tabel dari kartu kata.. Ingat Baca Sel Tabel.",
      "mechanicDescription": "Empat kalimat. Siswa mengetuk kartu kata satu per satu menurut urutan yang benar. Ada satu kartu pengecoh. Gunakan Baca Sel Tabel.",
      "voiceGuide": "Baca Sel Tabel. Susun kartu kata menjadi kalimat.",
      "symbolLarge": "…",
      "wordLarge": "SUSUN KATA",
      "mathNotation": "kalimat tabel"
    }
  ],
  "poin": [
    {
      "ikon": "卌",
      "nama": "Turus kelompok lima",
      "isi": "Lima turus ditulis empat garis tegak dan satu garis miring",
      "suara": "Empat tegak dicoret satu miring menjadi kelompok lima."
    },
    {
      "ikon": "📋",
      "nama": "Tabel tiga kolom",
      "isi": "Tabel data memuat kategori atau nilai, turus, dan banyak",
      "suara": "Tiga kolom: nilai, turus, dan banyak."
    },
    {
      "ikon": "🌍",
      "nama": "Sajian Tabel",
      "isi": "Tabel memuat kategori dan frekuensi.",
      "suara": "Sajian Tabel. Tabel memuat kategori dan frekuensi."
    },
    {
      "ikon": "🌍",
      "nama": "Judul Kolom Jelas",
      "isi": "Setiap kolom harus berlabel.",
      "suara": "Judul Kolom Jelas. Setiap kolom harus berlabel."
    },
    {
      "ikon": "🌍",
      "nama": "Baca Sel Tabel",
      "isi": "Temukan nilai di perpotongan baris-kolom.",
      "suara": "Baca Sel Tabel. Temukan nilai di perpotongan baris-kolom."
    }
  ],
  "poinSuara": "Ingat: Sajian Tabel, Judul Kolom Jelas, Baca Sel Tabel.",
  "cara": {
    "suara": "Urutkan data dari terkecil, gambar turus kelompok lima, tulis banyaknya pada kolom angka, lalu baca tabel untuk menjawab pertanyaan.",
    "potongan": [
      {
        "teks": "Urutkan data dari terkecil.",
        "warna": "#FFFFFF"
      },
      {
        "teks": "Gambar turus kelompok lima.",
        "warna": "#FFE566"
      },
      {
        "teks": "Tulis banyaknya pada kolom angka.",
        "warna": "#7FCB96"
      },
      {
        "teks": "Baca tabel untuk menjawab pertanyaan.",
        "warna": "#BAE6FD"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: terapkan Sajian Tabel pada satu benda atau soal nyata, lalu ceritakan langkahmu.",
  "refleksi": [
    "Bagaimana Sajian Tabel membantumu memahami soal?",
    "Kapan kamu memakai Judul Kolom Jelas?",
    "Apa bedanya dengan hanya menghafal rumus atau langkah tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Table Display",
      "namaId": "Sajian Tabel",
      "asal": "Data representation",
      "ringkas": "Tabel memuat kategori dan frekuensi.",
      "tahap": [
        "Story",
        "Picture",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Header Clarity",
      "namaId": "Judul Kolom Jelas",
      "asal": "Table literacy",
      "ringkas": "Setiap kolom harus berlabel.",
      "tahap": [
        "Mind",
        "Infografis"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Read Cells",
      "namaId": "Baca Sel Tabel",
      "asal": "Data reading",
      "ringkas": "Temukan nilai di perpotongan baris-kolom.",
      "tahap": [
        "Concrete",
        "Abstract"
      ]
    }
  ]
};

export const SUB_BAB_K3B5: SubBabNaskah[] = [SUB_A35, SUB_B35];
