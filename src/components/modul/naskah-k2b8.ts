/**
 * Naskah — rewrite mendalam.
 * Metode luar dianyam ke Story, peta, infografis, poin, dan meta permainan.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K2B8_META = {
  "chapterId": "k2-mat-bab8",
  "phaseCode": "FASE_A",
  "grade": 2,
  "subjectLabel": "MATEMATIKA - KELAS 2 SD",
  "title": "BAB 8: BERBAGAI DIAGRAM",
  "silabusElemen": "🌈 Fase A • Elemen Analisis Data dan Peluang: Diagram Turus dan Diagram Gambar (Kelas 2 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A8: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Diagram Turus)",
  "fullTitle": "Sub-Bab A: Diagram Turus",
  "targetDescription": "Siswa membaca data dalam bentuk turus maksimal empat kategori, menginterpretasikan data itu (paling banyak, paling sedikit, sama banyak, lebihnya, kurangnya, dan jumlah), serta menyajikan data dengan membuat diagram turus: mengelompokkan benda menurut jenisnya, menghitung, menulis satu garis untuk satu benda, dan mengelompokkan setiap lima turus dengan coretan miring. Siswa memakai cara Turus, Hitung Frekuensi, Pilah Kategori.",
  "secondaryBg": "#FEF9C3",
  "secondaryBorder": "#CA8A04",
  "secondaryText": "#713F12",
  "silabus": {
    "teksSuara": "Kita belajar berbagai diagram, dimulai dari diagram turus. Di kelas satu kita sudah mengenal tabel dan diagram gambar, dan kali ini kita belajar membuat dan membaca diagram turus. Kita menghitung buah yang dibawa Lili dan teman-temannya pada hari buah, hewan ternak Paman Halim, mainan Kira, sayur Malosi, dan bunga Tika. Kita belajar menulis satu garis untuk satu benda, mengelompokkan setiap lima turus, lalu membaca diagramnya untuk mencari yang paling banyak, yang lebihnya, dan yang kurangnya. Kita memakai cara dari luar buku: Turus (Tally Marks); Hitung Frekuensi (Frequency Count); Pilah Kategori (Category Sort). Setiap lima coretan diikat. Ubah turus jadi banyaknya. Kelompokkan data sebelum menurus. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa membaca, menginterpretasikan, dan menyajikan data dalam bentuk diagram turus dengan maksimal empat kategori, serta menyampaikan hasilnya dengan percaya diri.",
    "referensi": "Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 8 Sub-Bab A)."
  },
  "videos": [
    {
      "id": "K2B8A-V1",
      "judul": "Hari Buah",
      "subjudul": "Tally Marks",
      "adegan": [
        {
          "id": "K2B8A-V1-1",
          "judul": "Hari buah di kantin",
          "ketukan": [
            "Bayangkan situasi nyata di kelas atau di rumah. Hari ini adalah hari buah di sekolah Lili. Mari kita pahami bersama.",
            "Semua siswa membawa buah kesukaan masing-masing dan memakannya di kantin sehat.",
            "Buah mengandung vitamin yang baik untuk tubuh, dan makan buah menjaga tubuh tetap sehat.",
            "Ingat cara Turus: Setiap lima coretan diikat."
          ],
          "papan": [
            "Hari buah",
            "Kantin sehat",
            "Buah itu sehat",
            "Buah apa paling disukai?"
          ]
        },
        {
          "id": "K2B8A-V1-2",
          "judul": "Data buah Lili dan teman",
          "ketukan": [
            "Ini buah yang dibawa Lili dan teman-temannya. Ada buah anggur, jeruk, apel, dan pisang.",
            "Pertama, buah dikelompokkan menurut jenisnya agar tidak tercampur. Mari kita pahami bersama.",
            "Kedua, kita menghitung setiap kelompok satu per satu supaya tidak ada yang terlewat.",
            "Di sini kita memakai ide Tally Marks — Setiap lima coretan diikat."
          ],
          "papan": [
            "Data buah",
            "Kelompokkan dulu",
            "Hitung satu per satu",
            "Tulis dalam turus"
          ]
        },
        {
          "id": "K2B8A-V1-3",
          "judul": "Mengenal turus",
          "ketukan": [
            "Pada diagram turus terdapat susunan garis seperti lidi. Mari kita pahami bersama.",
            "Satu garis tegak menunjukkan satu benda. Satu buah jeruk ditulis satu garis, dan dua buah jeruk ditulis dua garis.",
            "Lima buah jeruk ditulis empat garis tegak, lalu garis kelima mencoret miring.",
            "METODE LUAR · Turus: Setiap lima coretan diikat."
          ],
          "papan": [
            "Turus seperti lidi",
            "Satu garis, satu benda",
            "Lima: empat garis dicoret",
            "Kelompok lima"
          ]
        }
      ]
    },
    {
      "id": "K2B8A-V2",
      "judul": "Latihan: Hitung Frekuensi",
      "subjudul": "Frequency Count",
      "adegan": [
        {
          "id": "K2B8A-V2-1",
          "judul": "Peternakan Paman Halim",
          "ketukan": [
            "Paman Halim adalah seorang peternak yang memelihara berbagai jenis hewan.",
            "Di peternakannya ada ayam, kambing, sapi, dan bebek. Mari kita pahami bersama.",
            "Kita hitung banyak hewan satu per satu, lalu mencatatnya dengan turus.",
            "Ingat cara Hitung Frekuensi: Ubah turus jadi banyaknya."
          ],
          "papan": [
            "Peternakan Paman Halim",
            "Ayam, kambing, sapi, bebek",
            "Hitung lalu catat",
            "Satu hewan, satu garis"
          ]
        },
        {
          "id": "K2B8A-V2-2",
          "judul": "Membuat diagram turus",
          "ketukan": [
            "Ayam ada sepuluh. Turusnya dua kelompok lima. Mari kita pahami bersama.",
            "Kambing ada delapan. Turusnya satu kelompok lima dan tiga garis. Mari kita pahami bersama.",
            "Sapi ada enam. Turusnya satu kelompok lima dan satu garis. Mari kita pahami bersama.",
            "Di sini kita memakai ide Frequency Count — Ubah turus jadi banyaknya."
          ],
          "papan": [
            "Ayam: dua kelompok lima",
            "Kambing: lima dan tiga",
            "Sapi: lima dan satu",
            "Bebek: dua lima dan satu"
          ]
        },
        {
          "id": "K2B8A-V2-3",
          "judul": "Membaca diagram turus",
          "ketukan": [
            "Hewan yang paling banyak di peternakan adalah bebek. Mari kita pahami bersama.",
            "Ada sepuluh ayam dan sebelas bebek. Banyak bebek satu lebihnya dari banyak ayam.",
            "Sebaliknya, banyak ayam satu kurangnya dari banyak bebek. Mari kita pahami bersama.",
            "METODE LUAR · Hitung Frekuensi: Ubah turus jadi banyaknya."
          ],
          "papan": [
            "Paling banyak: bebek",
            "Bebek 1 lebihnya dari ayam",
            "Ayam 1 kurangnya dari bebek",
            "Kambing 2 lebihnya"
          ]
        }
      ]
    },
    {
      "id": "K2B8A-V3",
      "judul": "Siap pakai Category Sort",
      "subjudul": "Category Sort",
      "adegan": [
        {
          "id": "K2B8A-V3-1",
          "judul": "Bertanya kepada teman",
          "ketukan": [
            "Kita bisa mengumpulkan data sendiri dengan bertanya kepada teman. Mari kita pahami bersama.",
            "Contohnya, bertanya kepada lima belas teman tentang buah kesukaan. Mari kita pahami bersama.",
            "Setiap teman menjawab satu kali, dan kita langsung menulis satu garis untuk jawabannya.",
            "Ingat cara Pilah Kategori: Kelompokkan data sebelum menurus."
          ],
          "papan": [
            "Bertanya kepada teman",
            "Lima belas teman",
            "Satu jawaban, satu garis",
            "Catat dengan tertib"
          ]
        },
        {
          "id": "K2B8A-V3-2",
          "judul": "Data mainan Kira",
          "ketukan": [
            "Kira mendata mainan kesukaan teman-temannya. Mari kita pahami bersama.",
            "Mobil-mobilan dua anak, boneka empat anak, kelereng enam anak, dan mainan balok tujuh anak.",
            "Garis turus diubah menjadi bilangan pada kolom paling kanan. Mari kita pahami bersama.",
            "Di sini kita memakai ide Category Sort — Kelompokkan data sebelum menurus."
          ],
          "papan": [
            "Mainan kesukaan",
            "Dua, empat, enam, tujuh",
            "Turus menjadi bilangan",
            "Paling banyak: mainan balok"
          ]
        },
        {
          "id": "K2B8A-V3-3",
          "judul": "Data sayur dan bunga",
          "ketukan": [
            "Malosi mendata sayur kesukaan: brokoli tujuh, bayam empat, wortel enam, dan jagung tiga.",
            "Tika dan ibu merangkai bunga: mawar tujuh, lili empat, tulip lima, dan aster empat.",
            "Lili dan aster sama banyak, yaitu empat. Mari kita pahami bersama.",
            "METODE LUAR · Pilah Kategori: Kelompokkan data sebelum menurus."
          ],
          "papan": [
            "Sayur Malosi",
            "Bunga Tika",
            "Lili dan aster sama banyak",
            "Mawar 3 lebihnya dari aster"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Diagram Turus. Apa yang ditanyakan?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Tally Marks",
      "stepDesc": "Setiap lima coretan diikat.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Frequency Count",
      "stepDesc": "Ubah turus jadi banyaknya.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Category Sort",
      "stepDesc": "Kelompokkan data sebelum menurus.",
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
      "judul": "Apa Itu Data?",
      "emoji": "🗂️",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Data adalah keterangan tentang banyak benda. Buah yang dibawa ke sekolah adalah contoh data. Data bisa disajikan dengan diagram turus dan diagram gambar."
    },
    {
      "judul": "Mengelompokkan Data",
      "emoji": "🧺",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Kelompokkan benda menurut jenisnya, yaitu anggur, jeruk, apel, dan pisang. Lalu hitung setiap kelompok satu per satu."
    },
    {
      "judul": "Tanda Turus",
      "emoji": "✏️",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Satu garis tegak menunjukkan satu benda. Dua garis menunjukkan dua benda, dan tiga garis menunjukkan tiga benda."
    },
    {
      "judul": "Kelompok Lima",
      "emoji": "🖐️",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Lima benda ditulis empat garis tegak dan satu coretan miring. Setiap lima turus dikelompokkan supaya mudah dihitung."
    },
    {
      "judul": "Turus Buah Kesukaan",
      "emoji": "🍊",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Anggur dua, jeruk enam, apel empat, dan pisang tiga. Jeruk adalah buah yang paling disukai."
    },
    {
      "judul": "Turus Hewan Ternak",
      "emoji": "🐔",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Ayam sepuluh, kambing delapan, sapi enam, dan bebek sebelas. Bebek adalah hewan yang paling banyak."
    },
    {
      "judul": "Membaca Diagram Turus",
      "emoji": "🔍",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Hitung garis pada setiap baris. Turus paling panjang berarti paling banyak, dan turus paling pendek berarti paling sedikit."
    },
    {
      "judul": "Lebihnya dan Kurangnya",
      "emoji": "⚖️",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Bebek sebelas dan ayam sepuluh. Banyak bebek satu lebihnya dari banyak ayam, dan banyak ayam satu kurangnya dari banyak bebek."
    },
    {
      "judul": "Cara Membuat Diagram Turus",
      "emoji": "📝",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Empat langkah membuat diagram turus. Satu, kelompokkan data. Dua, tulis satu garis untuk satu benda. Tiga, kelompokkan setiap lima turus. Empat, tulis banyaknya."
    },
    {
      "judul": "Pentingnya Makan Buah",
      "emoji": "🥗",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Buah adalah sumber vitamin, sumber air, obat luar, dan membantu mencegah penyakit. Ayo, kita makan buah setiap hari."
    },
    {
      "judul": "Turus",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "ingat",
      "suara": "Setiap lima coretan diikat."
    },
    {
      "judul": "Hitung Frekuensi",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "ingat",
      "suara": "Ubah turus jadi banyaknya."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "sort-objects-by-kind",
      "title": "Kelompokkan Benda",
      "bookReference": "hlm. 228 (buah yang dibawa Lili dikelompokkan menurut jenisnya)",
      "objective": "Pakai Turus: Setiap lima coretan diikat. Latihan: Mengelompokkan benda campuran menurut jenisnya sebelum dihitung..",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan benda campur (buah, hewan, sayur) dan tiga kotak jenis. Siswa menyeret atau mengetuk benda ke kotak jenisnya. Benda yang salah kotak memberi petunjuk dan kembali. Saat bermain, terapkan Tally Marks: Setiap lima coretan diikat.",
      "voiceGuide": "Turus. Setiap lima coretan diikat.",
      "emoji": "🧺",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "count-each-kind",
      "title": "Hitung Tiap Jenis",
      "bookReference": "hlm. 228 dan 231 (menghitung buah dan hewan satu per satu)",
      "objective": "Pakai Turus: Setiap lima coretan diikat. Latihan: Menghitung banyak benda dari satu jenis lalu memilih bilangannya..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Gambar menampilkan satu jenis benda dalam baris lima-lima, misalnya sepuluh ayam atau sebelas bebek. Siswa memilih banyaknya dari tiga angka. Saat bermain, terapkan Tally Marks: Setiap lima coretan diikat.",
      "voiceGuide": "Turus. Setiap lima coretan diikat.",
      "emoji": "🐔",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "record-tally-stream",
      "title": "Catat Turus",
      "bookReference": "hlm. 228–229 (setiap data ditulis satu garis turus)",
      "objective": "Pakai Turus: Setiap lima coretan diikat. Latihan: Mencatat data yang datang satu per satu dengan turus..",
      "mechanicDescription": "Tiga ronde. Data muncul satu per satu sebagai gambar benda. Siswa mengetuk baris jenis yang sesuai, dan satu garis turus ditulis. Garis kelima otomatis mencoret miring. Salah baris memberi petunjuk. Saat bermain, terapkan Tally Marks: Setiap lima coretan diikat.",
      "voiceGuide": "Turus. Setiap lima coretan diikat.",
      "emoji": "✏️",
      "targetCount": 27
    },
    {
      "stage": "Concrete",
      "gameType": "make-tally-from-objects",
      "title": "Buat Turus dari Benda",
      "bookReference": "hlm. 229 dan 234 (turus dibuat dari banyak benda)",
      "objective": "Pakai Turus: Setiap lima coretan diikat. Latihan: Membuat turus yang banyaknya sama dengan banyak benda nyata..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa menghitung benda pada gambar, lalu menekan tombol tambah goresan sampai turusnya sama banyak, dan menekan Periksa. Saat bermain, terapkan Tally Marks: Setiap lima coretan diikat.",
      "voiceGuide": "Turus. Setiap lima coretan diikat.",
      "emoji": "🔢",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "match-objects-tally",
      "title": "Jodohkan Benda dan Turus",
      "bookReference": "hlm. 229 (turus menunjukkan banyak benda)",
      "objective": "Menjodohkan kelompok benda dengan turus yang banyaknya sama.. Ingat Turus.",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga kelompok benda dan tiga gambar turus. Siswa mengetuk kelompok benda, lalu mengetuk turus yang cocok. Pasangan benar terkunci. Gunakan Turus.",
      "voiceGuide": "Turus. Ketuk benda, lalu ketuk turusnya.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "memory-objects-tally",
      "title": "Memori Benda dan Turus",
      "bookReference": "hlm. 229 dan 232 (benda dan turus yang sama banyak)",
      "objective": "Mencocokkan kelompok benda dengan turusnya lewat permainan memori.. Ingat Turus.",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): kelompok benda dan turus yang sama banyak. Siswa membalik dua kartu dan mencari pasangannya. Gunakan Turus.",
      "voiceGuide": "Turus. Balik dua kartu, cari benda dan turusnya.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "most-least-objects",
      "title": "Paling Banyak, Paling Sedikit",
      "bookReference": "hlm. 227 dan 232 (buah apa yang paling disukai; hewan yang paling banyak)",
      "objective": "Menemukan kelompok benda yang paling banyak dan paling sedikit.. Ingat Turus.",
      "mechanicDescription": "Tiga ronde, tiap ronde empat kelompok benda dan dua pertanyaan: paling banyak, lalu paling sedikit. Siswa mengetuk kelompoknya. Letak kunci berpindah. Gunakan Turus.",
      "voiceGuide": "Turus. Ketuk kelompok yang paling banyak atau sedikit.",
      "emoji": "🏆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-object-groups",
      "title": "Urutkan Kelompok Benda",
      "bookReference": "hlm. 232 dan 234 (membandingkan banyak data)",
      "objective": "Mengurutkan kelompok benda dari yang paling sedikit atau paling banyak.. Ingat Turus.",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga atau empat kelompok benda bertanda huruf. Siswa mengetuk kelompok satu per satu menurut urutan banyaknya. Letak jawaban berpindah. Gunakan Turus.",
      "voiceGuide": "Turus. Ketuk kelompok menurut banyaknya.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "more-less-objects",
      "title": "Lebihnya dan Kurangnya",
      "bookReference": "hlm. 232 (banyak bebek 1 lebihnya dari banyak ayam)",
      "objective": "Menentukan selisih banyak dua kelompok benda.. Ingat Turus.",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Dua kelompok benda ditampilkan berdampingan, misalnya bebek dan ayam. Siswa mengatur penghitung sampai sama dengan selisihnya, lalu menekan Periksa. Gunakan Turus.",
      "voiceGuide": "Turus. Cari berapa lebihnya.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tally-card-to-box",
      "title": "Kartu Turus ke Kotak Benda",
      "bookReference": "hlm. 229 (turus dan banyak benda)",
      "objective": "Menaruh kartu turus ke kotak benda yang banyaknya sama.. Ingat Turus.",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga kartu turus dan tiga kotak berisi gambar benda. Siswa mengetuk kartu turus, lalu mengetuk kotak yang banyak bendanya sama. Letak kartu berpindah. Gunakan Turus.",
      "voiceGuide": "Turus. Ketuk kartu, lalu ketuk kotaknya.",
      "emoji": "📥",
      "targetCount": 9
    },
    {
      "stage": "Picture",
      "gameType": "read-tally",
      "title": "Baca Turus",
      "bookReference": "hlm. 229 dan 232 (membaca banyak data dari turus)",
      "objective": "Pakai Hitung Frekuensi: Ubah turus jadi banyaknya. Latihan: Membaca banyak data dari turus lalu menuliskan banyaknya..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Gambar menampilkan turus. Siswa mengatur penghitung sampai sama dengan banyak garis, lalu menekan Periksa. Saat bermain, terapkan Frequency Count: Ubah turus jadi banyaknya.",
      "voiceGuide": "Hitung Frekuensi. Ubah turus jadi banyaknya.",
      "diagramType": "tally-read",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "fill-count-column",
      "title": "Lengkapi Kolom Banyak",
      "bookReference": "hlm. 234 (lengkapi diagram turus dengan mengisi kolom paling kanan)",
      "objective": "Pakai Hitung Frekuensi: Ubah turus jadi banyaknya. Latihan: Melengkapi kolom banyaknya pada diagram turus..",
      "mechanicDescription": "Tiga tabel dengan empat baris. Tiap baris menampilkan nama dan turus. Baris yang menyala menunggu bilangan. Siswa memilih satu dari kartu bilangan yang tepat. Saat bermain, terapkan Frequency Count: Ubah turus jadi banyaknya.",
      "voiceGuide": "Hitung Frekuensi. Ubah turus jadi banyaknya.",
      "diagramType": "tally-table",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "draw-tally",
      "title": "Gambar Turus",
      "bookReference": "hlm. 229 dan 235 (menulis turus dari data)",
      "objective": "Pakai Hitung Frekuensi: Ubah turus jadi banyaknya. Latihan: Menggambar turus dengan banyak garis yang diminta..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa menambah goresan satu per satu sampai sama dengan bilangan yang diminta. Goresan kelima otomatis mencoret miring. Saat bermain, terapkan Frequency Count: Ubah turus jadi banyaknya.",
      "voiceGuide": "Hitung Frekuensi. Ubah turus jadi banyaknya.",
      "diagramType": "tally-draw",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "pick-right-tally",
      "title": "Turus yang Tepat",
      "bookReference": "hlm. 229 (turus yang menunjukkan banyak data)",
      "objective": "Pakai Hitung Frekuensi: Ubah turus jadi banyaknya. Latihan: Memilih turus yang banyaknya sama dengan bilangan yang disebut..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca bilangan, lalu mengetuk satu dari empat gambar turus. Pengecoh berbeda satu atau dua garis. Saat bermain, terapkan Frequency Count: Ubah turus jadi banyaknya.",
      "voiceGuide": "Hitung Frekuensi. Ubah turus jadi banyaknya.",
      "diagramType": "tally-pick",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-tally-numeral",
      "title": "Jodohkan Turus dan Bilangan",
      "bookReference": "hlm. 229 dan 232 (turus menjadi bilangan)",
      "objective": "Menjodohkan turus dengan lambang bilangannya.. Ingat Hitung Frekuensi.",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga turus dan tiga bilangan. Siswa mengetuk turus, lalu mengetuk bilangan yang cocok. Pasangan benar terkunci hijau. Gunakan Hitung Frekuensi.",
      "voiceGuide": "Hitung Frekuensi. Ketuk turus, lalu ketuk bilangannya.",
      "diagramType": "tally-match",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memory-tally-numeral",
      "title": "Memori Turus dan Bilangan",
      "bookReference": "hlm. 229 (turus dan banyaknya)",
      "objective": "Mencocokkan turus dengan bilangannya lewat permainan memori.. Ingat Hitung Frekuensi.",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): gambar turus dan lambang bilangan. Siswa membalik dua kartu dan mencari pasangannya. Gunakan Hitung Frekuensi.",
      "voiceGuide": "Hitung Frekuensi. Balik dua kartu, cari turus dan bilangannya.",
      "diagramType": "tally-memory",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "groups-of-five",
      "title": "Kelompok Lima dan Sisa",
      "bookReference": "hlm. 229 (kita mengelompokkan setiap 5 data)",
      "objective": "Menyebut banyak kelompok lima dan sisa garis pada sebuah turus.. Ingat Hitung Frekuensi.",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Gambar menampilkan turus. Siswa memilih satu dari tiga kalimat, misalnya satu kelompok lima dan dua garis. Pengecoh menukar atau menambah satu. Gunakan Hitung Frekuensi.",
      "voiceGuide": "Hitung Frekuensi. Hitung kelompok lima, lalu sisa garisnya.",
      "diagramType": "tally-groups",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "order-tally",
      "title": "Urutkan Turus",
      "bookReference": "hlm. 232 (membandingkan banyak data)",
      "objective": "Mengurutkan turus dari yang paling sedikit atau paling banyak.. Ingat Hitung Frekuensi.",
      "mechanicDescription": "Tiga ronde, tiap ronde empat gambar turus. Siswa mengetuk turus satu per satu menurut urutan banyaknya. Letak jawaban berpindah. Gunakan Hitung Frekuensi.",
      "voiceGuide": "Hitung Frekuensi. Ketuk turus menurut urutannya.",
      "diagramType": "tally-order",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-tally-five",
      "title": "Pilah Turus",
      "bookReference": "hlm. 229 (kelompok lima ditandai coretan miring)",
      "objective": "Memilah turus menjadi kurang dari lima dan lima atau lebih.. Ingat Hitung Frekuensi.",
      "mechanicDescription": "Tiga ronde, tiap ronde enam gambar turus dan dua kotak: kurang dari lima, serta lima atau lebih. Siswa menyeret atau mengetuk turus ke kotak yang tepat. Gunakan Hitung Frekuensi.",
      "voiceGuide": "Hitung Frekuensi. Pilah turus ke kotak yang tepat.",
      "diagramType": "tally-sort",
      "numberA": 3,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "number-line-more-less",
      "title": "Garis Bilangan: Lebihnya dan Kurangnya",
      "bookReference": "hlm. 232 (1 lebihnya dan 2 kurangnya)",
      "objective": "Menemukan banyak data yang sekian lebihnya atau kurangnya pada garis bilangan.. Ingat Hitung Frekuensi.",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca banyak data awal, misalnya ayam sepuluh, lalu mengetuk banyak bebek yang satu lebihnya pada garis bilangan. Gunakan Hitung Frekuensi.",
      "voiceGuide": "Hitung Frekuensi. Ketuk bilangan yang diminta pada garis.",
      "diagramType": "number-line",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "match-name-quantity",
      "title": "Jodohkan Nama dan Banyaknya",
      "bookReference": "hlm. 229 dan 236 (nama data dan banyaknya)",
      "objective": "Pakai Pilah Kategori: Kelompokkan data sebelum menurus. Latihan: Menjodohkan nama data dengan banyaknya..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga pasang, misalnya lemper dan 3. Siswa mengetuk nama di kiri, lalu mengetuk bilangan yang cocok di kanan. Saat bermain, terapkan Category Sort: Kelompokkan data sebelum menurus.",
      "voiceGuide": "Pilah Kategori. Kelompokkan data sebelum menurus.",
      "symbolLarge": "3",
      "wordLarge": "LEMPER",
      "mathNotation": "nama • banyaknya"
    },
    {
      "stage": "Abstract",
      "gameType": "complete-data-sentences",
      "title": "Lengkapi Kalimat Data",
      "bookReference": "hlm. 236–237 (lengkapi setiap kalimat berikut sesuai dengan diagram)",
      "objective": "Pakai Pilah Kategori: Kelompokkan data sebelum menurus. Latihan: Melengkapi kalimat tentang data dengan bilangan yang tepat..",
      "mechanicDescription": "Dua ronde, tiap ronde tiga kalimat, misalnya ada ... anak yang suka karet. Siswa memilih satu dari tiga bilangan. Kalimat lengkap dibacakan. Saat bermain, terapkan Category Sort: Kelompokkan data sebelum menurus.",
      "voiceGuide": "Pilah Kategori. Kelompokkan data sebelum menurus.",
      "symbolLarge": "…",
      "wordLarge": "LENGKAPI",
      "mathNotation": "ada ... anak"
    },
    {
      "stage": "Abstract",
      "gameType": "build-data-sentence",
      "title": "Susun Kalimat Data",
      "bookReference": "hlm. 232 (informasi dari diagram turus)",
      "objective": "Pakai Pilah Kategori: Kelompokkan data sebelum menurus. Latihan: Menyusun kata menjadi kalimat tentang diagram turus..",
      "mechanicDescription": "Empat kalimat, misalnya banyak bebek satu lebihnya dari banyak ayam. Kartu kata diketuk berurutan. Satu kartu pengecoh tidak dipakai. Saat bermain, terapkan Category Sort: Kelompokkan data sebelum menurus.",
      "voiceGuide": "Pilah Kategori. Kelompokkan data sebelum menurus.",
      "symbolLarge": "Aa",
      "wordLarge": "SUSUN KATA",
      "mathNotation": "kata • kalimat • data"
    },
    {
      "stage": "Abstract",
      "gameType": "fill-tally-table",
      "title": "Isi Tabel Turus",
      "bookReference": "hlm. 229 dan 234 (nama dan banyaknya)",
      "objective": "Pakai Pilah Kategori: Kelompokkan data sebelum menurus. Latihan: Mengisi kolom banyaknya pada tabel data..",
      "mechanicDescription": "Tiga tabel dengan empat baris, misalnya hewan ternak. Siswa mengetuk baris, lalu mengetuk kartu bilangan yang tepat. Saat bermain, terapkan Category Sort: Kelompokkan data sebelum menurus.",
      "voiceGuide": "Pilah Kategori. Kelompokkan data sebelum menurus.",
      "symbolLarge": "10",
      "wordLarge": "TABEL",
      "mathNotation": "nama • banyaknya"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-data",
      "title": "Benar atau Salah: Data",
      "bookReference": "hlm. 228–237 (turus, kelompok lima, dan membaca data)",
      "objective": "Menilai pernyataan tentang diagram turus.. Ingat Pilah Kategori.",
      "mechanicDescription": "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan dihitung dari data, dan tiap jawaban diberi penjelasan singkat. Gunakan Pilah Kategori.",
      "voiceGuide": "Pilah Kategori. Baca pernyataan, lalu pilih benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "periksa dengan alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "riddle-data-clues",
      "title": "Detektif Data",
      "bookReference": "hlm. 232 (hewan yang paling banyak; lebihnya dan kurangnya)",
      "objective": "Menemukan kategori data dari dua petunjuk.. Ingat Pilah Kategori.",
      "mechanicDescription": "Empat soal. Siswa membaca petunjuk seperti banyakku lebih dari delapan dan kurang dari sebelas, lalu memilih satu dari tiga nama. Hanya satu yang cocok dengan semua petunjuk. Gunakan Pilah Kategori.",
      "voiceGuide": "Pilah Kategori. Baca semua petunjuk, lalu pilih namanya.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "dua petunjuk, satu jawaban"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-map-fill",
      "title": "Peta Konsep Turus",
      "bookReference": "hlm. 226 (peta konsep: diagram turus dan diagram gambar)",
      "objective": "Melengkapi peta konsep diagram turus dan cara membacanya.. Ingat Pilah Kategori.",
      "mechanicDescription": "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. Gunakan Pilah Kategori.",
      "voiceGuide": "Pilah Kategori. Pilih kartu yang tepat untuk kotak yang menyala.",
      "symbolLarge": "⇄",
      "wordLarge": "PETA KONSEP",
      "mathNotation": "turus • kelompok lima • data"
    },
    {
      "stage": "Abstract",
      "gameType": "order-data",
      "title": "Urutkan Data",
      "bookReference": "hlm. 232 (membandingkan banyak data)",
      "objective": "Mengurutkan nama data menurut banyaknya.. Ingat Pilah Kategori.",
      "mechanicDescription": "Tiga ronde, tiap ronde empat nama beserta banyaknya, misalnya jeruk 6. Siswa mengetuk satu per satu dari yang paling banyak atau paling sedikit. Letak jawaban berpindah. Gunakan Pilah Kategori.",
      "voiceGuide": "Pilah Kategori. Ketuk menurut banyaknya.",
      "symbolLarge": "7 > 3",
      "wordLarge": "URUTKAN",
      "mathNotation": "bandingkan banyaknya"
    },
    {
      "stage": "Abstract",
      "gameType": "select-all-data",
      "title": "Ketuk Semua yang Cocok",
      "bookReference": "hlm. 232 dan 236 (membandingkan dengan sebuah bilangan)",
      "objective": "Memilih semua data yang memenuhi sebuah syarat.. Ingat Pilah Kategori.",
      "mechanicDescription": "Tiga ronde, tiap ronde empat nama dan satu perintah, misalnya banyaknya lebih dari delapan. Siswa mengetuk semua yang cocok, lalu menekan Periksa. Gunakan Pilah Kategori.",
      "voiceGuide": "Pilah Kategori. Ketuk semua yang cocok, lalu periksa.",
      "symbolLarge": "✔✔",
      "wordLarge": "SEMUA COCOK",
      "mathNotation": "lebih dari • kurang dari"
    },
    {
      "stage": "Abstract",
      "gameType": "add-data-total",
      "title": "Hitung Jumlah Data",
      "bookReference": "hlm. 244 (jumlah buah dan jumlah semua buah dalam parsel)",
      "objective": "Menjumlahkan banyak dua atau lebih data.. Ingat Pilah Kategori.",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal, misalnya jumlah apel dan jeruk, atau jumlah semua buah. Siswa mengatur penghitung sampai sama dengan jumlahnya, lalu menekan Periksa. Gunakan Pilah Kategori.",
      "voiceGuide": "Pilah Kategori. Jumlahkan datanya, lalu tulis hasilnya.",
      "symbolLarge": "4+3",
      "wordLarge": "JUMLAH",
      "mathNotation": "jumlah data"
    }
  ],
  "poin": [
    {
      "ikon": "🧺",
      "nama": "Kelompokkan dulu",
      "isi": "benda sejenis dikumpulkan, lalu dihitung",
      "suara": "Kelompokkan benda menurut jenisnya, lalu hitung setiap kelompok satu per satu."
    },
    {
      "ikon": "✏️",
      "nama": "Satu garis, satu benda",
      "isi": "turus seperti lidi",
      "suara": "Pada diagram turus, satu garis tegak menunjukkan satu benda."
    },
    {
      "ikon": "🌍",
      "nama": "Turus",
      "isi": "Setiap lima coretan diikat.",
      "suara": "Turus. Setiap lima coretan diikat."
    },
    {
      "ikon": "🌍",
      "nama": "Hitung Frekuensi",
      "isi": "Ubah turus jadi banyaknya.",
      "suara": "Hitung Frekuensi. Ubah turus jadi banyaknya."
    },
    {
      "ikon": "🌍",
      "nama": "Pilah Kategori",
      "isi": "Kelompokkan data sebelum menurus.",
      "suara": "Pilah Kategori. Kelompokkan data sebelum menurus."
    }
  ],
  "poinSuara": "Ingat: Turus, Hitung Frekuensi, Pilah Kategori.",
  "cara": {
    "suara": "Cara menyebutkan. Ada sepuluh ayam dan sebelas bebek. Banyak bebek satu lebihnya dari banyak ayam. Sebut datanya, lalu bandingkan, lalu katakan lebihnya atau kurangnya.",
    "potongan": [
      {
        "teks": "data",
        "warna": "#BAE6FD"
      },
      {
        "teks": "bandingkan",
        "warna": "#FDE68A"
      },
      {
        "teks": "lebihnya",
        "warna": "#7FCB96"
      },
      {
        "teks": "kurangnya",
        "warna": "#FECACA"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: terapkan Turus pada satu benda atau soal nyata, lalu ceritakan langkahmu.",
  "refleksi": [
    "Bagaimana Turus membantumu memahami soal?",
    "Kapan kamu memakai Hitung Frekuensi?",
    "Apa bedanya dengan hanya menghafal rumus atau langkah tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Tally Marks",
      "namaId": "Turus",
      "asal": "Data collection",
      "ringkas": "Setiap lima coretan diikat.",
      "tahap": [
        "Story",
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Frequency Count",
      "namaId": "Hitung Frekuensi",
      "asal": "Data literacy",
      "ringkas": "Ubah turus jadi banyaknya.",
      "tahap": [
        "Mind",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Category Sort",
      "namaId": "Pilah Kategori",
      "asal": "Sorting",
      "ringkas": "Kelompokkan data sebelum menurus.",
      "tahap": [
        "Infografis",
        "Concrete"
      ]
    }
  ]
};

export const SUB_B8: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Diagram Gambar)",
  "fullTitle": "Sub-Bab B: Diagram Gambar",
  "targetDescription": "Siswa membaca data dalam bentuk diagram gambar maksimal empat kategori, menginterpretasikan data itu (paling banyak, sama banyak, lebihnya, kurangnya, dan jumlah), serta menyajikan data dengan membuat diagram gambar: satu gambar mewakili satu benda, gambar dalam satu diagram sama bentuk dan ukurannya, baris dibaca dari kiri ke kanan, dan keterangan ditulis di bawah diagram. Siswa memakai cara Diagram Gambar, Kunci Gambar, Banding Kategori.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Kita belajar diagram gambar. Kita kembali ke data buah kesukaan Lili dan teman-temannya, lalu menandai setiap buah dengan bintang berwarna. Setiap gambar mewakili satu benda. Kita membuat diagram gambar rangkaian bunga Tika, kue kesukaan teman-teman Kira, permainan tradisional yang disukai Upe, dan warna kesukaan siswa kelas dua. Kita juga belajar membaca diagram untuk mencari yang paling banyak, yang lebihnya, yang kurangnya, dan jumlahnya. Kita memakai cara dari luar buku: Diagram Gambar (Pictograph); Kunci Gambar (Key / Legend); Banding Kategori (Compare Categories). Satu gambar mewakili data. Baca berapa nilai per gambar. Mana lebih banyak dari gambar. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa membaca, menginterpretasikan, dan menyajikan data dalam bentuk diagram gambar dengan maksimal empat kategori, serta mempresentasikan hasilnya dengan percaya diri.",
    "referensi": "Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 8 Sub-Bab B)."
  },
  "videos": [
    {
      "id": "K2B8B-V1",
      "judul": "Bintang untuk Buah",
      "subjudul": "Pictograph",
      "adegan": [
        {
          "id": "K2B8B-V1-1",
          "judul": "Mengingat data buah",
          "ketukan": [
            "Ingatkah kalian dengan buah kesukaan Lili dan teman-temannya?.",
            "Data itu juga dapat disajikan dengan diagram gambar. Mari kita pahami bersama.",
            "Kita beri tanda bintang biru untuk anggur, jingga untuk jeruk, merah untuk apel, dan hijau untuk pisang.",
            "Ingat cara Diagram Gambar: Satu gambar mewakili data."
          ],
          "papan": [
            "Ingat buah kesukaan?",
            "Bisa dengan diagram gambar",
            "Setiap buah diberi bintang",
            "Hitung tiap buah"
          ]
        },
        {
          "id": "K2B8B-V1-2",
          "judul": "Satu bintang, satu buah",
          "ketukan": [
            "Setiap bintang mewakili satu buah. Dua buah anggur digambar dengan dua bintang biru.",
            "Enam buah jeruk digambar dengan enam bintang jingga. Mari kita pahami bersama.",
            "Empat buah apel digambar dengan empat bintang merah, dan tiga buah pisang digambar dengan tiga bintang hijau.",
            "Di sini kita memakai ide Pictograph — Satu gambar mewakili data."
          ],
          "papan": [
            "Satu bintang, satu buah",
            "Jeruk: enam bintang",
            "Apel empat, pisang tiga",
            "Ukuran dan jarak sama"
          ]
        },
        {
          "id": "K2B8B-V1-3",
          "judul": "Gambar lain pun boleh",
          "ketukan": [
            "Selain bintang, kita boleh memakai gambar lain seperti lingkaran, hati, atau wajah tersenyum.",
            "Yang penting, satu gambar mewakili satu benda. Mari kita pahami bersama.",
            "Gambar yang dipakai harus sama di seluruh diagram. Mari kita pahami bersama.",
            "METODE LUAR · Diagram Gambar: Satu gambar mewakili data."
          ],
          "papan": [
            "Lingkaran, hati, wajah",
            "Satu gambar, satu benda",
            "Gambar harus sama",
            "Tulis keterangan"
          ]
        }
      ]
    },
    {
      "id": "K2B8B-V2",
      "judul": "Latihan: Kunci Gambar",
      "subjudul": "Key / Legend",
      "adegan": [
        {
          "id": "K2B8B-V2-1",
          "judul": "Tika merangkai bunga",
          "ketukan": [
            "Tika sedang membuat rangkaian bunga bersama ibunya. Mari kita pahami bersama.",
            "Ada bunga mawar, lili, tulip, dan aster di dalam rangkaian itu. Mari kita pahami bersama.",
            "Kita hitung banyak setiap jenis bunga dengan teliti. Mari kita pahami bersama.",
            "Ingat cara Kunci Gambar: Baca berapa nilai per gambar."
          ],
          "papan": [
            "Tika merangkai bunga",
            "Mawar, lili, tulip, aster",
            "Hitung dengan teliti",
            "Sajikan dalam diagram"
          ]
        },
        {
          "id": "K2B8B-V2-2",
          "judul": "Membuat diagram bunga",
          "ketukan": [
            "Mawar ada tujuh, jadi digambar tujuh bunga. Mari kita pahami bersama.",
            "Lili ada empat, jadi digambar empat bunga. Mari kita pahami bersama.",
            "Tulip ada lima dan aster ada empat. Mari kita pahami bersama.",
            "Di sini kita memakai ide Key / Legend — Baca berapa nilai per gambar."
          ],
          "papan": [
            "Mawar: tujuh gambar",
            "Lili: empat gambar",
            "Tulip lima, aster empat",
            "Mudah melihat paling banyak"
          ]
        },
        {
          "id": "K2B8B-V2-3",
          "judul": "Membaca diagram bunga",
          "ketukan": [
            "Bunga yang paling banyak adalah mawar. Mari kita pahami bersama.",
            "Lili dan aster sama banyak, yaitu empat. Mari kita pahami bersama.",
            "Banyak tulip satu lebihnya dari banyak lili. Mari kita pahami bersama.",
            "METODE LUAR · Kunci Gambar: Baca berapa nilai per gambar."
          ],
          "papan": [
            "Paling banyak: mawar",
            "Lili dan aster sama banyak",
            "Tulip 1 lebihnya dari lili",
            "Aster 3 kurangnya"
          ]
        }
      ]
    },
    {
      "id": "K2B8B-V3",
      "judul": "Siap pakai Compare Categories",
      "subjudul": "Compare Categories",
      "adegan": [
        {
          "id": "K2B8B-V3-1",
          "judul": "Kue kesukaan",
          "ketukan": [
            "Kira mendata kue kesukaan teman-teman sekelasnya. Mari kita pahami bersama.",
            "Kue cucur enam anak, onde-onde lima anak, lemper tiga anak, dan kue talam tujuh anak.",
            "Setiap bintang mewakili satu anak. Mari kita pahami bersama.",
            "Ingat cara Banding Kategori: Mana lebih banyak dari gambar."
          ],
          "papan": [
            "Kue kesukaan Kira",
            "Cucur 6, onde 5",
            "Satu bintang, satu anak",
            "Paling banyak: kue talam"
          ]
        },
        {
          "id": "K2B8B-V3-2",
          "judul": "Permainan tradisional",
          "ketukan": [
            "Upe mendata permainan tradisional yang disukai teman-temannya. Mari kita pahami bersama.",
            "Empat anak suka karet dan enam anak suka lompat tali. Mari kita pahami bersama.",
            "Lima anak suka petak umpet dan tujuh anak suka benteng. Mari kita pahami bersama.",
            "Di sini kita memakai ide Compare Categories — Mana lebih banyak dari gambar."
          ],
          "papan": [
            "Permainan tradisional",
            "Karet 4, lompat tali 6",
            "Petak umpet 5, benteng 7",
            "Buat diagram gambar"
          ]
        },
        {
          "id": "K2B8B-V3-3",
          "judul": "Para pelari",
          "ketukan": [
            "Para siswa kelas dua berlari mengelilingi lapangan. Ada empat belas siswa.",
            "Lima siswa berlari satu putaran, tiga siswa dua putaran, empat siswa tiga putaran, dan dua siswa empat putaran.",
            "Siswa yang berlari lebih dari dua putaran adalah empat ditambah dua, yaitu enam siswa.",
            "METODE LUAR · Banding Kategori: Mana lebih banyak dari gambar."
          ],
          "papan": [
            "Empat belas siswa berlari",
            "Satu sampai empat putaran",
            "Lebih dari dua putaran: enam",
            "Baca dengan teliti"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Diagram Gambar. Apa yang ditanyakan?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Pictograph",
      "stepDesc": "Satu gambar mewakili data.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Key / Legend",
      "stepDesc": "Baca berapa nilai per gambar.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Compare Categories",
      "stepDesc": "Mana lebih banyak dari gambar.",
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
      "judul": "Dari Turus ke Gambar",
      "emoji": "🔁",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Data yang sama bisa disajikan dengan turus dan dengan gambar. Isinya tetap sama, hanya bentuk penyajiannya yang berbeda."
    },
    {
      "judul": "Bintang Mewakili Satu",
      "emoji": "⭐",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Satu bintang mewakili satu buah. Dua anggur digambar dengan dua bintang, dan enam jeruk digambar dengan enam bintang."
    },
    {
      "judul": "Diagram Gambar Buah",
      "emoji": "🍎",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Anggur dua bintang biru, jeruk enam bintang jingga, apel empat bintang merah, dan pisang tiga bintang hijau."
    },
    {
      "judul": "Gambar Lain Boleh",
      "emoji": "🎨",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Selain bintang, kita boleh memakai lingkaran, hati, atau wajah tersenyum. Yang penting satu gambar mewakili satu benda."
    },
    {
      "judul": "Diagram Gambar Bunga",
      "emoji": "💐",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Mawar tujuh, lili empat, tulip lima, dan aster empat. Bunga yang paling banyak adalah mawar."
    },
    {
      "judul": "Cara Membuat Diagram Gambar",
      "emoji": "🖍️",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Empat langkah membuat diagram gambar. Satu, hitung data setiap jenis. Dua, tulis nama jenis. Tiga, gambar lambang sebanyak datanya. Empat, tulis judul dan keterangan."
    },
    {
      "judul": "Membaca Diagram Gambar",
      "emoji": "📖",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Baca judul dan keterangan lebih dulu. Lalu hitung gambar pada setiap baris dari kiri ke kanan. Baris terpanjang berarti paling banyak."
    },
    {
      "judul": "Turus dan Gambar Berdampingan",
      "emoji": "🪜",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Jeruk enam ditulis satu kelompok lima dan satu garis pada turus, dan enam bintang pada diagram gambar. Banyaknya sama."
    },
    {
      "judul": "Menjumlahkan Data",
      "emoji": "➕",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Jumlah apel dan jeruk pada parsel Ibu adalah tujuh, jumlah mangga dan pisang adalah delapan, dan jumlah semua buah adalah lima belas."
    },
    {
      "judul": "Mempresentasikan Data",
      "emoji": "🎤",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Tiga langkah mempresentasikan data. Satu, sebutkan judul diagram. Dua, ceritakan yang paling banyak dan paling sedikit. Tiga, ceritakan lebihnya dan kurangnya."
    },
    {
      "judul": "Diagram Gambar",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "ingat",
      "suara": "Satu gambar mewakili data."
    },
    {
      "judul": "Kunci Gambar",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "ingat",
      "suara": "Baca berapa nilai per gambar."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "stick-pictures",
      "title": "Tempel Gambar",
      "bookReference": "hlm. 238 dan 241 (tandai buah dengan bintang; tempelkan gambar sebanyak data)",
      "objective": "Pakai Diagram Gambar: Satu gambar mewakili data. Latihan: Menempel satu gambar untuk setiap data yang datang..",
      "mechanicDescription": "Tiga ronde. Data muncul satu per satu sebagai gambar benda. Siswa mengetuk baris jenis yang sesuai, dan satu gambar benda ditempel pada diagram baris itu. Salah baris memberi petunjuk. Saat bermain, terapkan Pictograph: Satu gambar mewakili data.",
      "voiceGuide": "Diagram Gambar. Satu gambar mewakili data.",
      "emoji": "🖼️",
      "targetCount": 27
    },
    {
      "stage": "Concrete",
      "gameType": "sort-to-rows",
      "title": "Kelompokkan ke Baris",
      "bookReference": "hlm. 238 (buah dikelompokkan menurut jenis)",
      "objective": "Pakai Diagram Gambar: Satu gambar mewakili data. Latihan: Memilah benda campuran ke baris jenisnya sebelum digambar..",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan benda campur dan tiga kotak jenis. Siswa menyeret atau mengetuk benda ke kotak jenisnya. Benda yang salah kotak memberi petunjuk. Saat bermain, terapkan Pictograph: Satu gambar mewakili data.",
      "voiceGuide": "Diagram Gambar. Satu gambar mewakili data.",
      "emoji": "🧺",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "build-picture-diagram",
      "title": "Susun Diagram Gambar",
      "bookReference": "hlm. 239–240 (diagram gambar buah dan bunga)",
      "objective": "Pakai Diagram Gambar: Satu gambar mewakili data. Latihan: Menyusun diagram gambar dari kelompok benda nyata..",
      "mechanicDescription": "Tiga ronde. Tiap baris menampilkan kelompok benda di kiri dan sel kosong di kanan. Siswa mengetuk sel untuk mengisi gambar sampai sama dengan banyak benda, lalu menekan Periksa. Saat bermain, terapkan Pictograph: Satu gambar mewakili data.",
      "voiceGuide": "Diagram Gambar. Satu gambar mewakili data.",
      "emoji": "🧩",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "match-objects-row",
      "title": "Jodohkan Benda dan Baris",
      "bookReference": "hlm. 239 (diagram gambar menunjukkan banyak benda)",
      "objective": "Pakai Diagram Gambar: Satu gambar mewakili data. Latihan: Menjodohkan kelompok benda dengan baris gambar yang banyaknya sama..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga kelompok benda dan tiga baris gambar. Siswa mengetuk benda, lalu mengetuk baris yang cocok. Pasangan benar terkunci. Saat bermain, terapkan Pictograph: Satu gambar mewakili data.",
      "voiceGuide": "Diagram Gambar. Satu gambar mewakili data.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "memory-objects-row",
      "title": "Memori Benda dan Baris Gambar",
      "bookReference": "hlm. 239 dan 242 (benda dan diagram gambar)",
      "objective": "Mencocokkan kelompok benda dengan baris gambar lewat permainan memori.. Ingat Diagram Gambar.",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): kelompok benda dan baris gambar yang sama banyak. Siswa membalik dua kartu. Gunakan Diagram Gambar.",
      "voiceGuide": "Diagram Gambar. Balik dua kartu, cari benda dan barisnya.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "read-picture-diagram",
      "title": "Baca Diagram Gambar",
      "bookReference": "hlm. 239 dan 242 (membaca diagram gambar)",
      "objective": "Membaca banyak data dari diagram gambar yang memakai gambar benda.. Ingat Diagram Gambar.",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Diagram gambar empat baris ditampilkan dengan gambar benda sebagai lambang. Siswa memilih banyaknya dari tiga angka. Gunakan Diagram Gambar.",
      "voiceGuide": "Diagram Gambar. Hitung gambar pada baris yang ditanya.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "most-least-row",
      "title": "Baris Terbanyak dan Tersedikit",
      "bookReference": "hlm. 242 dan 247 (kue yang paling banyak disukai)",
      "objective": "Menemukan baris gambar yang paling banyak dan paling sedikit.. Ingat Diagram Gambar.",
      "mechanicDescription": "Tiga ronde, tiap ronde dua pertanyaan: paling banyak, lalu paling sedikit. Siswa mengetuk barisnya pada diagram bergambar benda. Letak kunci berpindah. Gunakan Diagram Gambar.",
      "voiceGuide": "Diagram Gambar. Ketuk baris yang paling panjang atau pendek.",
      "emoji": "🏆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "more-less-diagram",
      "title": "Lebihnya dan Kurangnya pada Diagram",
      "bookReference": "hlm. 242–244 (selisih banyak data)",
      "objective": "Menghitung selisih banyak dua baris pada diagram bergambar benda.. Ingat Diagram Gambar.",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Dua baris dari diagram ditampilkan, misalnya kue talam dan lemper. Siswa mengatur penghitung sampai sama dengan selisihnya. Gunakan Diagram Gambar.",
      "voiceGuide": "Diagram Gambar. Cari berapa lebihnya.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-rows",
      "title": "Urutkan Baris Gambar",
      "bookReference": "hlm. 242 (membandingkan baris gambar)",
      "objective": "Mengurutkan baris gambar benda dari yang paling sedikit atau paling banyak.. Ingat Diagram Gambar.",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga atau empat baris bergambar benda. Siswa mengetuk baris satu per satu menurut urutan banyaknya. Letak jawaban berpindah. Gunakan Diagram Gambar.",
      "voiceGuide": "Diagram Gambar. Ketuk baris menurut banyaknya.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "object-card-to-row",
      "title": "Kartu Benda ke Baris Gambar",
      "bookReference": "hlm. 239 (banyak benda dan banyak gambar sama)",
      "objective": "Menaruh kartu kelompok benda ke baris bintang yang banyaknya sama.. Ingat Diagram Gambar.",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga kartu kelompok benda dan tiga baris bintang. Siswa mengetuk kartu, lalu mengetuk baris yang banyak bintangnya sama. Letak kartu berpindah. Gunakan Diagram Gambar.",
      "voiceGuide": "Diagram Gambar. Ketuk kartu, lalu ketuk barisnya.",
      "emoji": "📥",
      "targetCount": 9
    },
    {
      "stage": "Picture",
      "gameType": "read-symbol-row",
      "title": "Baca Baris Lambang",
      "bookReference": "hlm. 239 dan 245 (membaca diagram gambar)",
      "objective": "Pakai Kunci Gambar: Baca berapa nilai per gambar. Latihan: Membaca banyak data dari satu baris lambang..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Gambar menampilkan satu baris lambang (bintang, lingkaran, atau hati). Siswa mengatur penghitung sampai sama dengan banyak lambang. Saat bermain, terapkan Key / Legend: Baca berapa nilai per gambar.",
      "voiceGuide": "Kunci Gambar. Baca berapa nilai per gambar.",
      "diagramType": "symbol-read",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "color-diagram-from-table",
      "title": "Warnai Diagram dari Tabel",
      "bookReference": "hlm. 241 dan 243 (buat diagram gambar dari data)",
      "objective": "Pakai Kunci Gambar: Baca berapa nilai per gambar. Latihan: Menyusun diagram gambar dari tabel bilangan..",
      "mechanicDescription": "Tiga ronde. Tiap baris menampilkan nama dan banyaknya. Siswa mengetuk sel untuk mengisi lambang sampai sama dengan banyaknya, lalu menekan Periksa. Saat bermain, terapkan Key / Legend: Baca berapa nilai per gambar.",
      "voiceGuide": "Kunci Gambar. Baca berapa nilai per gambar.",
      "diagramType": "symbol-draw",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "pick-right-diagram",
      "title": "Diagram yang Tepat",
      "bookReference": "hlm. 239–240 (diagram gambar yang menunjukkan banyak data)",
      "objective": "Pakai Kunci Gambar: Baca berapa nilai per gambar. Latihan: Memilih baris lambang yang banyaknya sama dengan bilangan yang disebut..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca bilangan, lalu mengetuk satu dari empat baris lambang. Pengecoh berbeda satu atau dua lambang. Saat bermain, terapkan Key / Legend: Baca berapa nilai per gambar.",
      "voiceGuide": "Kunci Gambar. Baca berapa nilai per gambar.",
      "diagramType": "symbol-pick",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-numeral",
      "title": "Jodohkan Diagram dan Bilangan",
      "bookReference": "hlm. 239 dan 245 (diagram menjadi bilangan)",
      "objective": "Pakai Kunci Gambar: Baca berapa nilai per gambar. Latihan: Menjodohkan baris lambang dengan lambang bilangannya..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga baris lambang dan tiga bilangan. Siswa mengetuk baris, lalu mengetuk bilangan yang cocok. Pasangan benar terkunci hijau. Saat bermain, terapkan Key / Legend: Baca berapa nilai per gambar.",
      "voiceGuide": "Kunci Gambar. Baca berapa nilai per gambar.",
      "diagramType": "symbol-match",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-numeral",
      "title": "Memori Diagram dan Bilangan",
      "bookReference": "hlm. 239 (banyak gambar dan bilangannya)",
      "objective": "Mencocokkan baris lambang dengan bilangannya lewat permainan memori.. Ingat Kunci Gambar.",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): baris lambang dan lambang bilangan. Siswa membalik dua kartu dan mencari pasangannya. Gunakan Kunci Gambar.",
      "voiceGuide": "Kunci Gambar. Balik dua kartu, cari baris dan bilangannya.",
      "diagramType": "symbol-memory",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "order-symbol-rows",
      "title": "Urutkan Baris Lambang",
      "bookReference": "hlm. 242 (membandingkan baris)",
      "objective": "Mengurutkan baris lambang dari yang paling pendek atau paling panjang.. Ingat Kunci Gambar.",
      "mechanicDescription": "Tiga ronde, tiap ronde empat baris lambang. Siswa mengetuk baris satu per satu menurut panjangnya. Letak jawaban berpindah. Gunakan Kunci Gambar.",
      "voiceGuide": "Kunci Gambar. Ketuk baris menurut panjangnya.",
      "diagramType": "symbol-order",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "read-full-diagram",
      "title": "Baca Diagram Lengkap",
      "bookReference": "hlm. 247 dan 245 (warna kesukaan; siswa yang berlari)",
      "objective": "Menjawab pertanyaan dari sebuah diagram gambar lengkap empat baris.. Ingat Kunci Gambar.",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Diagram lengkap (warna kesukaan, kaleng, atau siswa berlari) ditampilkan dengan lambang polos. Siswa memilih jawaban dari tiga pilihan. Gunakan Kunci Gambar.",
      "voiceGuide": "Kunci Gambar. Baca diagram, lalu jawab pertanyaannya.",
      "diagramType": "symbol-full",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "fill-count-pictogram",
      "title": "Lengkapi Banyak pada Diagram",
      "bookReference": "hlm. 247 (berapa siswa yang menyukai warna merah)",
      "objective": "Melengkapi kolom banyaknya pada diagram gambar.. Ingat Kunci Gambar.",
      "mechanicDescription": "Tiga diagram dengan empat baris lambang. Baris yang menyala menunggu bilangan. Siswa memilih satu dari kartu bilangan yang tepat. Gunakan Kunci Gambar.",
      "voiceGuide": "Kunci Gambar. Isi banyaknya untuk baris yang menyala.",
      "diagramType": "symbol-table",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "number-line-diagram",
      "title": "Garis Bilangan pada Diagram",
      "bookReference": "hlm. 242–247 (lebihnya dan kurangnya)",
      "objective": "Menemukan banyak data yang sekian lebihnya atau kurangnya pada garis bilangan.. Ingat Kunci Gambar.",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca banyak data awal dari diagram, lalu mengetuk banyak data lain yang sekian lebihnya atau kurangnya pada garis bilangan. Gunakan Kunci Gambar.",
      "voiceGuide": "Kunci Gambar. Ketuk bilangan yang diminta pada garis.",
      "diagramType": "number-line",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sort-rows",
      "title": "Pilah Baris",
      "bookReference": "hlm. 239 (banyak gambar tiap baris)",
      "objective": "Memilah baris lambang menjadi kurang dari lima dan lima atau lebih.. Ingat Kunci Gambar.",
      "mechanicDescription": "Tiga ronde, tiap ronde enam baris lambang dan dua kotak: kurang dari lima, serta lima atau lebih. Siswa menyeret atau mengetuk baris ke kotak yang tepat. Gunakan Kunci Gambar.",
      "voiceGuide": "Kunci Gambar. Pilah baris ke kotak yang tepat.",
      "diagramType": "symbol-sort",
      "numberA": 3,
      "numberB": 6
    },
    {
      "stage": "Abstract",
      "gameType": "match-pair-difference",
      "title": "Jodohkan Pasangan dan Selisih",
      "bookReference": "hlm. 241 dan 247 (lebihnya dan kurangnya)",
      "objective": "Pakai Banding Kategori: Mana lebih banyak dari gambar. Latihan: Menjodohkan dua data dengan selisih banyaknya..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga pasang. Siswa membaca dua data, misalnya mawar tujuh dan tulip lima, lalu mengetuk selisih yang cocok, yaitu 2. Saat bermain, terapkan Compare Categories: Mana lebih banyak dari gambar.",
      "voiceGuide": "Banding Kategori. Mana lebih banyak dari gambar.",
      "symbolLarge": "2",
      "wordLarge": "SELISIH",
      "mathNotation": "lebihnya • kurangnya"
    },
    {
      "stage": "Abstract",
      "gameType": "complete-more-less-sentences",
      "title": "Lengkapi Kalimat Lebihnya",
      "bookReference": "hlm. 236–237 dan 247 (lengkapi kalimat sesuai diagram)",
      "objective": "Pakai Banding Kategori: Mana lebih banyak dari gambar. Latihan: Melengkapi kalimat lebihnya dan kurangnya dengan bilangan yang tepat..",
      "mechanicDescription": "Dua ronde, tiap ronde tiga kalimat, misalnya banyak bunga tulip ... lebihnya dari banyak bunga lili. Siswa memilih satu dari tiga bilangan. Saat bermain, terapkan Compare Categories: Mana lebih banyak dari gambar.",
      "voiceGuide": "Banding Kategori. Mana lebih banyak dari gambar.",
      "symbolLarge": "…",
      "wordLarge": "LENGKAPI",
      "mathNotation": "lebihnya • kurangnya"
    },
    {
      "stage": "Abstract",
      "gameType": "build-diagram-sentence",
      "title": "Susun Kalimat Diagram Gambar",
      "bookReference": "hlm. 239 dan 247 (diagram gambar dan keterangan)",
      "objective": "Pakai Banding Kategori: Mana lebih banyak dari gambar. Latihan: Menyusun kata menjadi kalimat tentang diagram gambar..",
      "mechanicDescription": "Empat kalimat, misalnya setiap gambar mewakili satu benda. Kartu kata diketuk berurutan. Satu kartu pengecoh tidak dipakai. Saat bermain, terapkan Compare Categories: Mana lebih banyak dari gambar.",
      "voiceGuide": "Banding Kategori. Mana lebih banyak dari gambar.",
      "symbolLarge": "Aa",
      "wordLarge": "SUSUN KATA",
      "mathNotation": "kata • kalimat • diagram"
    },
    {
      "stage": "Abstract",
      "gameType": "build-diagram-from-words",
      "title": "Buat Diagram dari Kalimat Data",
      "bookReference": "hlm. 243 (ada 4 anak yang suka bermain karet)",
      "objective": "Pakai Banding Kategori: Mana lebih banyak dari gambar. Latihan: Menyusun diagram gambar dari kalimat data..",
      "mechanicDescription": "Tiga ronde. Tiap baris menampilkan kalimat, misalnya ada empat anak yang suka bermain karet. Siswa mengisi lambang sebanyak datanya, lalu menekan Periksa. Saat bermain, terapkan Compare Categories: Mana lebih banyak dari gambar.",
      "voiceGuide": "Banding Kategori. Mana lebih banyak dari gambar.",
      "symbolLarge": "★★★",
      "wordLarge": "BUAT DIAGRAM",
      "mathNotation": "kalimat • gambar"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-diagram",
      "title": "Benar atau Salah: Diagram",
      "bookReference": "hlm. 238–247 (membaca diagram gambar)",
      "objective": "Menilai pernyataan tentang diagram gambar.. Ingat Banding Kategori.",
      "mechanicDescription": "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan dihitung dari data, dan tiap jawaban diberi penjelasan singkat. Gunakan Banding Kategori.",
      "voiceGuide": "Banding Kategori. Baca pernyataan, lalu pilih benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "periksa dengan alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "riddle-diagram-clues",
      "title": "Detektif Diagram",
      "bookReference": "hlm. 245 dan 247 (membaca dan menafsirkan diagram)",
      "objective": "Menemukan kategori diagram dari dua petunjuk.. Ingat Banding Kategori.",
      "mechanicDescription": "Empat soal. Siswa membaca petunjuk seperti banyakku dua kurangnya dari merah, lalu memilih satu dari tiga nama. Hanya satu yang cocok dengan semua petunjuk. Gunakan Banding Kategori.",
      "voiceGuide": "Banding Kategori. Baca semua petunjuk, lalu pilih namanya.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "dua petunjuk, satu jawaban"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-map-fill-b",
      "title": "Peta Konsep Diagram Gambar",
      "bookReference": "hlm. 226 (peta konsep: diagram turus dan diagram gambar)",
      "objective": "Melengkapi peta konsep diagram gambar dan cara membacanya.. Ingat Banding Kategori.",
      "mechanicDescription": "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. Gunakan Banding Kategori.",
      "voiceGuide": "Banding Kategori. Pilih kartu yang tepat untuk kotak yang menyala.",
      "symbolLarge": "⇄",
      "wordLarge": "PETA KONSEP",
      "mathNotation": "gambar • keterangan • baris"
    },
    {
      "stage": "Abstract",
      "gameType": "order-diagram-data",
      "title": "Urutkan Data Diagram",
      "bookReference": "hlm. 242 dan 247 (membandingkan data)",
      "objective": "Mengurutkan nama data menurut banyaknya.. Ingat Banding Kategori.",
      "mechanicDescription": "Tiga ronde, tiap ronde empat nama beserta banyaknya, misalnya merah 7. Siswa mengetuk satu per satu dari yang paling banyak atau paling sedikit. Gunakan Banding Kategori.",
      "voiceGuide": "Banding Kategori. Ketuk menurut banyaknya.",
      "symbolLarge": "7 > 2",
      "wordLarge": "URUTKAN",
      "mathNotation": "bandingkan banyaknya"
    },
    {
      "stage": "Abstract",
      "gameType": "select-all-diagram",
      "title": "Ketuk Semua pada Diagram",
      "bookReference": "hlm. 245 dan 247 (data yang memenuhi syarat)",
      "objective": "Memilih semua data yang memenuhi sebuah syarat.. Ingat Banding Kategori.",
      "mechanicDescription": "Tiga ronde, tiap ronde empat nama dan satu perintah, misalnya banyaknya kurang dari enam. Siswa mengetuk semua yang cocok, lalu menekan Periksa. Gunakan Banding Kategori.",
      "voiceGuide": "Banding Kategori. Ketuk semua yang cocok, lalu periksa.",
      "symbolLarge": "✔✔",
      "wordLarge": "SEMUA COCOK",
      "mathNotation": "lebih dari • kurang dari"
    },
    {
      "stage": "Abstract",
      "gameType": "add-diagram-total",
      "title": "Hitung Jumlah pada Diagram",
      "bookReference": "hlm. 244 dan 245 (jumlah semua; lebih dari dua putaran)",
      "objective": "Menjumlahkan banyak dua atau lebih data pada diagram.. Ingat Banding Kategori.",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal, misalnya jumlah siswa yang berlari tiga dan empat putaran. Siswa mengatur penghitung sampai sama dengan jumlahnya. Gunakan Banding Kategori.",
      "voiceGuide": "Banding Kategori. Jumlahkan datanya, lalu tulis hasilnya.",
      "symbolLarge": "4+2",
      "wordLarge": "JUMLAH",
      "mathNotation": "jumlah data"
    }
  ],
  "poin": [
    {
      "ikon": "⭐",
      "nama": "Satu gambar, satu benda",
      "isi": "hitung gambar untuk mengetahui banyaknya",
      "suara": "Pada diagram gambar, satu gambar mewakili satu benda. Kita menghitung gambar untuk mengetahui banyak data."
    },
    {
      "ikon": "🎨",
      "nama": "Gambar harus sama",
      "isi": "bentuk dan ukuran sama, jarak rapi",
      "suara": "Semua gambar dalam satu diagram harus sama bentuk dan ukurannya, dan tersusun rapi dengan jarak yang sama."
    },
    {
      "ikon": "🌍",
      "nama": "Diagram Gambar",
      "isi": "Satu gambar mewakili data.",
      "suara": "Diagram Gambar. Satu gambar mewakili data."
    },
    {
      "ikon": "🌍",
      "nama": "Kunci Gambar",
      "isi": "Baca berapa nilai per gambar.",
      "suara": "Kunci Gambar. Baca berapa nilai per gambar."
    },
    {
      "ikon": "🌍",
      "nama": "Banding Kategori",
      "isi": "Mana lebih banyak dari gambar.",
      "suara": "Banding Kategori. Mana lebih banyak dari gambar."
    }
  ],
  "poinSuara": "Ingat: Diagram Gambar, Kunci Gambar, Banding Kategori.",
  "cara": {
    "suara": "Cara menyebutkan. Ada tujuh bunga mawar dan lima bunga tulip. Mawar dua lebihnya dari tulip, dan tulip dua kurangnya dari mawar. Sebut datanya, lalu bandingkan, lalu katakan lebihnya atau kurangnya.",
    "potongan": [
      {
        "teks": "data",
        "warna": "#BAE6FD"
      },
      {
        "teks": "bandingkan",
        "warna": "#FDE68A"
      },
      {
        "teks": "lebihnya",
        "warna": "#7FCB96"
      },
      {
        "teks": "kurangnya",
        "warna": "#FECACA"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: terapkan Diagram Gambar pada satu benda atau soal nyata, lalu ceritakan langkahmu.",
  "refleksi": [
    "Bagaimana Diagram Gambar membantumu memahami soal?",
    "Kapan kamu memakai Kunci Gambar?",
    "Apa bedanya dengan hanya menghafal rumus atau langkah tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Pictograph",
      "namaId": "Diagram Gambar",
      "asal": "Data display",
      "ringkas": "Satu gambar mewakili data.",
      "tahap": [
        "Story",
        "Picture",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Key / Legend",
      "namaId": "Kunci Gambar",
      "asal": "Graph literacy",
      "ringkas": "Baca berapa nilai per gambar.",
      "tahap": [
        "Mind",
        "Infografis"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Compare Categories",
      "namaId": "Banding Kategori",
      "asal": "Data compare",
      "ringkas": "Mana lebih banyak dari gambar.",
      "tahap": [
        "Concrete",
        "Abstract"
      ]
    }
  ]
};

export const SUB_BAB_K2B8: SubBabNaskah[] = [SUB_A8, SUB_B8];
export const semuaAdeganK2B8 = SUB_BAB_K2B8.flatMap((s) => s.videos.flatMap((v) => v.adegan));
