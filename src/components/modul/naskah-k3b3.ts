/**
 * Naskah — poles kerapatan setara K5B4.
 * Metode luar dianyam ketukan per ketukan.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K3B3_META = {
  "chapterId": "k3-mat-bab3",
  "phaseCode": "FASE_B",
  "grade": 3,
  "subjectLabel": "MATEMATIKA - KELAS 3 SD",
  "title": "BAB 3: PENGUKURAN PANJANG DAN BERAT",
  "silabusElemen": "🌈 Fase B • Elemen Pengukuran: Panjang (Sentimeter dan Meter) dan Berat (Gram dan Kilogram) dengan Satuan Baku (Kelas 3 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A33: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Pengukuran Panjang dengan Satuan Baku)",
  "fullTitle": "Sub-Bab A: Pengukuran Panjang dengan Satuan Baku",
  "targetDescription": "Siswa mengenal alat ukur panjang (penggaris, meteran gulung, pengukur tinggi badan) dan satuan baku panjang (sentimeter dan meter), mengukur panjang benda dengan menempatkan ujung benda di angka nol, membaca panjang dari angka di ujung yang lain, serta memilih alat ukur yang tepat untuk benda pendek dan benda panjang. Siswa memakai cara Ulangi Satuan, Titik Nol Penggaris, Perkiraan Lalu Ukur. Siswa memakai cara Ulangi Satuan, Titik Nol Penggaris, Perkiraan Lalu Ukur.",
  "secondaryBg": "#E0E7FF",
  "secondaryBorder": "#4F46E5",
  "secondaryText": "#312E81",
  "silabus": {
    "teksSuara": "Kita belajar mengukur panjang dengan satuan baku. Di posyandu, tinggi badan bayi diukur dengan alat ukur. Kita mengenal penggaris, meteran, dan satuan baku sentimeter dan meter. Kita belajar meletakkan ujung benda di angka nol, lalu membaca angka di ujung yang lain. Kita juga memilih alat ukur yang tepat untuk benda pendek dan benda panjang. Kita memakai cara: Ulangi Satuan, Titik Nol Penggaris, Perkiraan Lalu Ukur. Panjang diukur dengan mengulang satuan baku. Mulai dari 0, bukan ujung penggaris yang rusak. Perkirakan dulu, baru ukur tepat. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menyelesaikan masalah yang berkaitan dengan panjang dan berat benda dengan satuan baku. Pada sub-bab ini siswa mengukur panjang benda dengan penggaris dan meteran serta memilih alat ukur yang tepat.",
    "referensi": "Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 3 Sub-Bab A)."
  },
  "videos": [
    {
      "id": "K3B3A-V1",
      "judul": "Posyandu dan Alat Ukur",
      "subjudul": "Iterate Unit",
      "adegan": [
        {
          "id": "K3B3A-V1-1",
          "judul": "Ke posyandu",
          "ketukan": [
            "Bayangkan kamu sedang mempelajari Pengukuran Panjang dengan Satuan Baku. Posyandu memberikan layanan kesehatan bagi masyarakat.",
            "Di posyandu, tinggi badan dan berat badan bayi diukur.",
            "Alat apa yang dipakai untuk mengukur tinggi badan.",
            "Ingat cara Ulangi Satuan: Panjang diukur dengan mengulang satuan baku. Ingat cara Ulangi Satuan: Panjang diukur dengan mengulang satuan baku."
          ],
          "papan": [
            "Posyandu",
            "Mengukur tinggi badan",
            "Alat ukur apa?",
            "Satuan baku apa?"
          ]
        },
        {
          "id": "K3B3A-V1-2",
          "judul": "Satuan tidak baku",
          "ketukan": [
            "Panjang meja dapat diukur dengan jengkal tangan atau pensil.",
            "Jengkal tangan setiap orang berbeda-beda.",
            "Hasil ukur dengan benda tidak baku bisa berbeda.",
            "Di sini kita memakai ide Iterate Unit — Panjang diukur dengan mengulang satuan baku. Di sini kita memakai Iterate Unit. Panjang diukur dengan mengulang satuan baku."
          ],
          "papan": [
            "Jengkal dan pensil",
            "Jengkal berbeda-beda",
            "Hasil bisa berbeda",
            "Perlu satuan baku"
          ]
        },
        {
          "id": "K3B3A-V1-3",
          "judul": "Satuan baku panjang",
          "ketukan": [
            "Satuan baku panjang adalah sentimeter dan meter.",
            "Sentimeter ditulis cm dan meter ditulis m.",
            "Penggaris memakai satuan sentimeter.",
            "METODE LUAR · Ulangi Satuan: Panjang diukur dengan mengulang satuan baku."
          ],
          "papan": [
            "Sentimeter dan meter",
            "cm dan m",
            "Penggaris: cm",
            "Meteran: m dan cm"
          ]
        }
      ]
    },
    {
      "id": "K3B3A-V2",
      "judul": "Latihan: Titik Nol Penggaris",
      "subjudul": "Zero Point",
      "adegan": [
        {
          "id": "K3B3A-V2-1",
          "judul": "Siapkan alat",
          "ketukan": [
            "Siapkan pensil, buku, kotak pensil, dan penggaris.",
            "Letakkan benda-benda itu di atas meja.",
            "Penggaris adalah alat ukur dan alat bantu menggambar garis lurus.",
            "Ingat cara Titik Nol Penggaris: Mulai dari 0, bukan ujung penggaris yang rusak. Ingat cara Titik Nol Penggaris: Mulai dari 0, bukan ujung penggaris yang rusak."
          ],
          "papan": [
            "Pensil, buku, kotak pensil",
            "Di atas meja",
            "Penggaris",
            "Mengukur panjang benda"
          ]
        },
        {
          "id": "K3B3A-V2-2",
          "judul": "Mulai dari nol",
          "ketukan": [
            "Letakkan ujung penggaris pada salah satu ujung benda.",
            "Pastikan ujung benda tepat di angka 0 sentimeter.",
            "Perhatikan ujung benda yang lain berada di angka berapa.",
            "Di sini kita memakai ide Zero Point — Mulai dari 0, bukan ujung penggaris yang rusak. Di sini kita memakai Zero Point. Mulai dari 0, bukan ujung penggaris yang rusak."
          ],
          "papan": [
            "Ujung penggaris di ujung benda",
            "Ujung benda di angka 0",
            "Lihat ujung yang lain",
            "Angka itu panjangnya"
          ]
        },
        {
          "id": "K3B3A-V2-3",
          "judul": "Tulis hasilnya",
          "ketukan": [
            "Misalnya ujung pensil yang lain berada di angka 15.",
            "Panjang pensil adalah 15 sentimeter.",
            "Tulis hasilnya dengan satuan baku, yaitu 15 cm.",
            "METODE LUAR · Titik Nol Penggaris: Mulai dari 0, bukan ujung penggaris yang rusak."
          ],
          "papan": [
            "Ujung lain di angka 15",
            "Panjang pensil 15 cm",
            "Tulis: 15 cm",
            "Satuan: sentimeter"
          ]
        }
      ]
    },
    {
      "id": "K3B3A-V3",
      "judul": "Siap pakai Estimate then Measure",
      "subjudul": "Estimate then Measure",
      "adegan": [
        {
          "id": "K3B3A-V3-1",
          "judul": "Benda panjang",
          "ketukan": [
            "Meteran dipakai untuk benda yang lebih panjang dari penggaris.",
            "Contohnya televisi, meja, pintu, dan papan tulis.",
            "Alat ukur apa yang tepat untuk mengukur pintu.",
            "Ingat cara Perkiraan Lalu Ukur: Perkirakan dulu, baru ukur tepat. Ingat cara Perkiraan Lalu Ukur: Perkirakan dulu, baru ukur tepat."
          ],
          "papan": [
            "Meteran untuk benda panjang",
            "Televisi, meja, pintu",
            "Alat ukur pintu?",
            "Pintu: meteran"
          ]
        },
        {
          "id": "K3B3A-V3-2",
          "judul": "Cara memakai meteran",
          "ketukan": [
            "Cara memakai meteran sama dengan cara memakai penggaris.",
            "Mulailah dari angka 0.",
            "Meteran memakai satuan meter dan sentimeter.",
            "Di sini kita memakai ide Estimate then Measure — Perkirakan dulu, baru ukur tepat. Di sini kita memakai Estimate then Measure. Perkirakan dulu, baru ukur tepat."
          ],
          "papan": [
            "Sama dengan penggaris",
            "Mulai dari angka 0",
            "Meter dan sentimeter",
            "Mengukur jarak"
          ]
        },
        {
          "id": "K3B3A-V3-3",
          "judul": "Memilih alat",
          "ketukan": [
            "Benda pendek seperti pensil diukur dengan penggaris.",
            "Benda panjang seperti lemari diukur dengan meteran.",
            "Tinggi badan diukur dengan pengukur tinggi badan atau meteran.",
            "METODE LUAR · Perkiraan Lalu Ukur: Perkirakan dulu, baru ukur tepat."
          ],
          "papan": [
            "Pensil: penggaris",
            "Lemari: meteran",
            "Tinggi badan: meteran",
            "Pilih alat yang tepat"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Pengukuran Panjang dengan Satuan Baku dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa mengenal alat ukur panjang (penggaris, meteran gulung, pengukur tinggi badan) dan satuan baku panjang (sentimeter ….",
      "icon": "❓",
      "flowFrom": "Pahami soal",
      "flowTo": "Iterate Unit"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Iterate Unit",
      "stepDesc": "Panjang diukur dengan mengulang satuan baku. Pada Pengukuran Panjang dengan Satuan Baku, langkah “Iterate Unit” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Ulangi Satuan: Panjang diukur dengan mengulang satuan baku. Titik Nol Penggaris: Mulai dari 0, bukan ujung penggaris yang rusak. Perkiraan Lalu Ukur: Perkirakan…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🧭",
      "flowFrom": "Iterate Unit",
      "flowTo": "Zero Point"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Zero Point",
      "stepDesc": "Mulai dari 0, bukan ujung penggaris yang rusak. Pada Pengukuran Panjang dengan Satuan Baku, langkah “Zero Point” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Ulangi Satuan: Panjang diukur dengan mengulang satuan baku. Titik Nol Penggaris: Mulai dari 0, bukan ujung penggaris yang rusak. Perkiraan Lalu Ukur: Perkirakan…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🛠️",
      "flowFrom": "Zero Point",
      "flowTo": "Estimate then Measure"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Estimate then Measure",
      "stepDesc": "Perkirakan dulu, baru ukur tepat. Pada Pengukuran Panjang dengan Satuan Baku, langkah “Estimate then Measure” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Ulangi Satuan: Panjang diukur dengan mengulang satuan baku. Titik Nol Penggaris: Mulai dari 0, bukan ujung penggaris yang rusak. Perkiraan Lalu Ukur: Perkirakan…. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "✨",
      "flowFrom": "Estimate then Measure",
      "flowTo": "Kerjakan"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Kerjakan",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Pengukuran Panjang dengan Satuan Baku. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "✏️",
      "flowFrom": "Kerjakan",
      "flowTo": "Cek masuk akal"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek masuk akal",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Pengukuran Panjang dengan Satuan Baku. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Cek masuk akal",
      "flowTo": "Simpulkan"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Simpulkan",
      "stepDesc": "Simpulkan ide utama Pengukuran Panjang dengan Satuan Baku dengan kalimatmu sendiri. Sebutkan cara yang kamu pakai dan mengapa cara itu membantu. Jelaskan kepada teman seolah-olah kamu guru kecil. Simpulan yang jelas menandakan konsepnya sudah dipahami.",
      "icon": "💬",
      "flowFrom": "Simpulkan",
      "flowTo": "Main"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Main",
      "stepDesc": "Latih lagi di tahap Concrete, Picture, lalu Abstract untuk Pengukuran Panjang dengan Satuan Baku. Mulai dari benda nyata, lanjut ke diagram, baru ke lambang angka. Ulangi sampai kamu bisa menjelaskan tanpa melihat contoh. Bermain sambil berlatih membuat konsepnya melekat lebih lama.",
      "icon": "🎮",
      "flowFrom": "Main",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Satuan Tidak Baku",
      "emoji": "🖐️",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Jengkal tangan dan pensil dapat mengukur panjang meja. Tetapi jengkal setiap orang berbeda, jadi hasil ukur bisa berbeda."
    },
    {
      "judul": "Satuan Baku",
      "emoji": "📐",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Satuan baku panjang adalah sentimeter dan meter. Satuan baku sama untuk semua orang."
    },
    {
      "judul": "Penggaris",
      "emoji": "📏",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Penggaris adalah alat ukur panjang. Jarak dari satu angka ke angka berikutnya adalah satu sentimeter."
    },
    {
      "judul": "Mulai dari Nol",
      "emoji": "0️⃣",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Letakkan ujung benda tepat di angka nol. Lalu lihat ujung benda yang lain berada di angka berapa."
    },
    {
      "judul": "Membaca Panjang",
      "emoji": "🔍",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Angka di ujung benda yang lain adalah panjang benda. Ujung pensil di angka lima belas berarti panjang pensil lima belas sentimeter."
    },
    {
      "judul": "Meteran",
      "emoji": "🧰",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Meteran dipakai untuk benda yang lebih panjang dari penggaris, seperti televisi, meja, dan pintu."
    },
    {
      "judul": "Memilih Alat",
      "emoji": "✅",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Benda pendek diukur dengan penggaris. Benda panjang diukur dengan meteran. Pilih alat yang tepat."
    },
    {
      "judul": "Ukuran Wajar",
      "emoji": "🧭",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Panjang pensil sekitar lima belas sentimeter. Tinggi pintu sekitar dua meter. Perkirakan dulu supaya satuannya tepat."
    },
    {
      "judul": "Selisih Panjang",
      "emoji": "↔️",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Untuk membandingkan dua panjang, kurangkan panjang yang besar dengan yang kecil. Itulah selisihnya."
    },
    {
      "judul": "Cara Mengukur",
      "emoji": "📝",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Empat langkah. Satu, pilih alat ukur yang tepat. Dua, letakkan ujung benda di angka nol. Tiga, baca angka di ujung yang lain. Empat, tulis hasilnya dengan satuan."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "shift-to-zero",
      "title": "Geser ke Angka Nol",
      "bookReference": "hlm. 107 (Aktivitas 1, langkah 4 dan 5)",
      "objective": "Pakai Ulangi Satuan: Panjang diukur dengan mengulang satuan baku. Latihan: Menggeser benda sampai ujung kirinya tepat di angka 0 pada penggaris, lalu membaca panjangnya..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Benda nyata di atas penggaris mulai dari angka selain nol. Siswa menekan geser kiri atau kanan sampai ujung benda di angka 0, lalu memilih panjang benda dari tiga pilihan. Saat bermain, ingat Ulangi Satuan: Panjang diukur dengan mengulang satuan baku.",
      "voiceGuide": "Ulangi Satuan. Panjang diukur dengan mengulang satuan baku.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "read-length",
      "title": "Baca Panjang Benda",
      "bookReference": "hlm. 107–108 (Aktivitas 1: tabel panjang benda)",
      "objective": "Pakai Ulangi Satuan: Panjang diukur dengan mengulang satuan baku. Latihan: Membaca panjang benda yang sudah dimulai dari angka 0 pada penggaris..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Benda nyata di atas penggaris ditampilkan. Siswa memilih satu dari tiga panjang. Pengecoh salah satu sentimeter. Saat bermain, ingat Ulangi Satuan: Panjang diukur dengan mengulang satuan baku.",
      "voiceGuide": "Ulangi Satuan. Panjang diukur dengan mengulang satuan baku.",
      "emoji": "🔍",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tap-end",
      "title": "Ketuk Ujung Benda",
      "bookReference": "hlm. 107 (angka di ujung benda yang lain)",
      "objective": "Pakai Ulangi Satuan: Panjang diukur dengan mengulang satuan baku. Latihan: Mengetuk angka pada garis penggaris tempat ujung benda yang lain berhenti..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Benda nyata di atas penggaris dimulai dari 0 dan panjangnya paling banyak 10 cm. Siswa mengetuk angka di ujung benda. Saat bermain, ingat Ulangi Satuan: Panjang diukur dengan mengulang satuan baku.",
      "voiceGuide": "Ulangi Satuan. Panjang diukur dengan mengulang satuan baku.",
      "emoji": "👆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "choose-tool",
      "title": "Pilih Alat Ukur",
      "bookReference": "hlm. 115–117 (penggaris atau meteran)",
      "objective": "Pakai Ulangi Satuan: Panjang diukur dengan mengulang satuan baku. Latihan: Memilih alat ukur yang tepat untuk benda sehari-hari..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua benda sehari-hari. Siswa memilih satu dari tiga alat ukur: penggaris, meteran, atau timbangan. Saat bermain, ingat Ulangi Satuan: Panjang diukur dengan mengulang satuan baku.",
      "voiceGuide": "Ulangi Satuan. Panjang diukur dengan mengulang satuan baku.",
      "emoji": "📐",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "match-object-length",
      "title": "Jodohkan Benda dan Panjang",
      "bookReference": "hlm. 111 (Ayo Berlatih 1: panjang benda dengan satuan baku)",
      "objective": "Menjodohkan benda di atas penggaris dengan panjangnya.. Ingat Ulangi Satuan. (Ulangi Satuan)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga benda dan tiga panjang. Siswa mengetuk benda, lalu mengetuk panjang yang cocok. Gunakan Ulangi Satuan.",
      "voiceGuide": "Ulangi Satuan. Mainkan dengan teliti.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "memory-object-length",
      "title": "Memori Benda dan Panjang",
      "bookReference": "hlm. 111 (Ayo Berlatih 1)",
      "objective": "Mencocokkan benda di atas penggaris dengan panjangnya lewat permainan memori.. Ingat Ulangi Satuan. (Ulangi Satuan)",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. Gunakan Ulangi Satuan.",
      "voiceGuide": "Ulangi Satuan. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-object-length",
      "title": "Ketuk Benda dengan Panjang",
      "bookReference": "hlm. 111 (Ayo Berlatih 1)",
      "objective": "Menemukan benda yang panjangnya sama dengan bilangan yang diminta.. Ingat Ulangi Satuan. (Ulangi Satuan)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga benda dan dua pertanyaan. Siswa mengetuk benda yang panjangnya sama dengan bilangan yang disebut. Gunakan Ulangi Satuan.",
      "voiceGuide": "Ulangi Satuan. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-tool",
      "title": "Ketuk Semua yang Tepat dengan Alat",
      "bookReference": "hlm. 113–114 dan 117 (centang benda yang tepat diukur)",
      "objective": "Menemukan semua benda yang tepat diukur dengan penggaris atau meteran.. Ingat Ulangi Satuan. (Ulangi Satuan)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat benda dan satu perintah. Siswa mengetuk semua benda yang cocok dengan alat yang disebut, lalu menekan Periksa. Gunakan Ulangi Satuan.",
      "voiceGuide": "Ulangi Satuan. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "board-length",
      "title": "Papan Panjang Benda",
      "bookReference": "hlm. 111 (Ayo Berlatih 1)",
      "objective": "Menulis panjang benda pada papan puluhan dan satuan.. Ingat Ulangi Satuan. (Ulangi Satuan)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca panjang benda pada penggaris, lalu mengatur angka puluhan dan satuan pada papan dan menekan Periksa. Gunakan Ulangi Satuan.",
      "voiceGuide": "Ulangi Satuan. Mainkan dengan teliti.",
      "emoji": "🗂️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-length",
      "title": "Urutkan Benda menurut Panjang",
      "bookReference": "hlm. 118 (Ayo Berlatih 3: urutkan tinggi tanaman)",
      "objective": "Mengurutkan tiga benda menurut panjangnya.. Ingat Ulangi Satuan. (Ulangi Satuan)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga benda di atas penggaris bertanda huruf. Siswa mengetuk benda satu per satu dari yang terpendek atau terpanjang. Gunakan Ulangi Satuan.",
      "voiceGuide": "Ulangi Satuan. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 9
    },
    {
      "stage": "Picture",
      "gameType": "shift-bar-zero",
      "title": "Geser Batang ke Nol",
      "bookReference": "hlm. 107 (Aktivitas 1, langkah 4 dan 5)",
      "objective": "Pakai Titik Nol Penggaris: Mulai dari 0, bukan ujung penggaris yang rusak. Latihan: Menggeser batang polos sampai ujung kirinya tepat di angka 0, lalu membaca panjangnya..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Batang polos di atas penggaris mulai dari angka selain nol. Siswa menekan geser kiri atau kanan sampai ujung batang di angka 0, lalu memilih panjang batang. Saat bermain, ingat Titik Nol Penggaris: Mulai dari 0, bukan ujung penggaris yang rusak.",
      "voiceGuide": "Titik Nol Penggaris. Mulai dari 0, bukan ujung penggaris yang rusak.",
      "diagramType": "bar-shift",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "read-bar",
      "title": "Baca Panjang Batang",
      "bookReference": "hlm. 107–108 (membaca panjang pada penggaris)",
      "objective": "Pakai Titik Nol Penggaris: Mulai dari 0, bukan ujung penggaris yang rusak. Latihan: Membaca panjang batang yang dimulai dari angka 0 pada penggaris..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa memilih satu dari tiga panjang. Pengecoh salah satu sentimeter. Saat bermain, ingat Titik Nol Penggaris: Mulai dari 0, bukan ujung penggaris yang rusak.",
      "voiceGuide": "Titik Nol Penggaris. Mulai dari 0, bukan ujung penggaris yang rusak.",
      "diagramType": "bar-read",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "tap-bar-end",
      "title": "Ketuk Ujung Batang",
      "bookReference": "hlm. 107 (angka di ujung yang lain)",
      "objective": "Pakai Titik Nol Penggaris: Mulai dari 0, bukan ujung penggaris yang rusak. Latihan: Mengetuk angka pada garis penggaris tempat ujung batang berhenti..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Batang polos dimulai dari 0 dan panjangnya paling banyak 10 cm. Siswa mengetuk angka di ujung batang. Saat bermain, ingat Titik Nol Penggaris: Mulai dari 0, bukan ujung penggaris yang rusak.",
      "voiceGuide": "Titik Nol Penggaris. Mulai dari 0, bukan ujung penggaris yang rusak.",
      "diagramType": "bar-tap",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-bar-length",
      "title": "Jodohkan Batang dan Panjang",
      "bookReference": "hlm. 111 (Ayo Berlatih 1)",
      "objective": "Pakai Titik Nol Penggaris: Mulai dari 0, bukan ujung penggaris yang rusak. Latihan: Menjodohkan batang pada penggaris dengan panjangnya..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga batang dan tiga panjang. Siswa mengetuk batang, lalu mengetuk panjang yang cocok. Saat bermain, ingat Titik Nol Penggaris: Mulai dari 0, bukan ujung penggaris yang rusak.",
      "voiceGuide": "Titik Nol Penggaris. Mulai dari 0, bukan ujung penggaris yang rusak.",
      "diagramType": "bar-match",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memory-bar-length",
      "title": "Memori Batang dan Panjang",
      "bookReference": "hlm. 111 (Ayo Berlatih 1)",
      "objective": "Mencocokkan batang pada penggaris dengan panjangnya lewat permainan memori.. Ingat Titik Nol Penggaris. (Titik Nol Penggaris)",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. Gunakan Titik Nol Penggaris.",
      "voiceGuide": "Titik Nol Penggaris. Mainkan dengan teliti.",
      "diagramType": "bar-memory",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-length-tool",
      "title": "Pilah Panjang: Penggaris atau Meteran",
      "bookReference": "hlm. 115–117 (penggaris atau meteran)",
      "objective": "Memilah ukuran panjang menjadi yang cocok diukur dengan penggaris dan yang cocok dengan meteran.. Ingat Titik Nol Penggaris. (Titik Nol Penggaris)",
      "mechanicDescription": "Tiga ronde, tiap ronde enam ukuran (cm atau m) dan dua kotak. Panjang sampai 30 cm cocok dengan penggaris, selebihnya meteran. Siswa menyeret atau mengetuk ukuran ke kotak yang tepat. Gunakan Titik Nol Penggaris.",
      "voiceGuide": "Titik Nol Penggaris. Mainkan dengan teliti.",
      "diagramType": "length-sort",
      "numberA": 3,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-bar-compare",
      "title": "Ketuk Semua Batang Lebih atau Kurang",
      "bookReference": "hlm. 118 (Ayo Berlatih 3: paling pendek dan paling tinggi)",
      "objective": "Menemukan semua batang yang lebih atau kurang panjang dari bilangan acuan.. Ingat Titik Nol Penggaris. (Titik Nol Penggaris)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat batang dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. Gunakan Titik Nol Penggaris.",
      "voiceGuide": "Titik Nol Penggaris. Mainkan dengan teliti.",
      "diagramType": "bar-select",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "order-measure-steps",
      "title": "Urutkan Langkah Mengukur",
      "bookReference": "hlm. 107 (Aktivitas 1: langkah mengukur)",
      "objective": "Mengurutkan langkah mengukur panjang benda dengan penggaris atau meteran.. Ingat Titik Nol Penggaris. (Titik Nol Penggaris)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat langkah. Siswa mengetuk langkah satu per satu menurut urutan yang benar. Letak jawaban berpindah. Gunakan Titik Nol Penggaris.",
      "voiceGuide": "Titik Nol Penggaris. Mainkan dengan teliti.",
      "diagramType": "steps-order",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "board-bar-length",
      "title": "Papan Panjang Batang",
      "bookReference": "hlm. 111 (Ayo Berlatih 1)",
      "objective": "Menulis panjang batang pada papan puluhan dan satuan.. Ingat Titik Nol Penggaris. (Titik Nol Penggaris)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca panjang batang pada penggaris, lalu mengatur angka puluhan dan satuan pada papan dan menekan Periksa. Gunakan Titik Nol Penggaris.",
      "voiceGuide": "Titik Nol Penggaris. Mainkan dengan teliti.",
      "diagramType": "bar-board",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "bar-difference",
      "title": "Selisih Dua Batang",
      "bookReference": "hlm. 118 (Ayo Berlatih 3: urutkan dan bandingkan)",
      "objective": "Menghitung selisih panjang dua batang yang sama-sama dimulai dari angka 0.. Ingat Titik Nol Penggaris. (Titik Nol Penggaris)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Dua batang pada satu penggaris ditampilkan. Siswa memilih satu dari tiga selisih panjang. Gunakan Titik Nol Penggaris.",
      "voiceGuide": "Titik Nol Penggaris. Mainkan dengan teliti.",
      "diagramType": "bar-compare",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "choose-unit",
      "title": "Pilih Satuan Baku",
      "bookReference": "hlm. 108 dan 115 (satuan baku sentimeter dan meter)",
      "objective": "Pakai Perkiraan Lalu Ukur: Perkirakan dulu, baru ukur tepat. Latihan: Memilih satuan baku yang tepat untuk mengukur panjang suatu benda..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca benda yang diukur, lalu memilih satu dari tiga satuan. Saat bermain, ingat Perkiraan Lalu Ukur: Perkirakan dulu, baru ukur tepat.",
      "voiceGuide": "Perkiraan Lalu Ukur. Perkirakan dulu, baru ukur tepat.",
      "symbolLarge": "cm m",
      "wordLarge": "SATUAN",
      "mathNotation": "sentimeter • meter"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-tool-text",
      "title": "Alat Ukur yang Tepat",
      "bookReference": "hlm. 109–110 dan 121–122 (nama alat ukur dan satuan)",
      "objective": "Pakai Perkiraan Lalu Ukur: Perkirakan dulu, baru ukur tepat. Latihan: Memilih alat ukur yang tepat untuk mengukur suatu bagian atau benda..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca benda yang diukur, lalu memilih satu dari tiga alat ukur. Saat bermain, ingat Perkiraan Lalu Ukur: Perkirakan dulu, baru ukur tepat.",
      "voiceGuide": "Perkiraan Lalu Ukur. Perkirakan dulu, baru ukur tepat.",
      "symbolLarge": "📏",
      "wordLarge": "ALAT UKUR",
      "mathNotation": "penggaris • meteran"
    },
    {
      "stage": "Abstract",
      "gameType": "complete-measure-sentence",
      "title": "Lengkapi Kalimat Pengukuran",
      "bookReference": "hlm. 107–110 (cara mengukur dan satuan baku)",
      "objective": "Pakai Perkiraan Lalu Ukur: Perkirakan dulu, baru ukur tepat. Latihan: Melengkapi kalimat tentang cara mengukur dan alat ukur panjang..",
      "mechanicDescription": "Tiga soal, tiap soal tiga kalimat, misalnya satuan baku pada penggaris adalah ... Siswa memilih satu dari tiga kata. Saat bermain, ingat Perkiraan Lalu Ukur: Perkirakan dulu, baru ukur tepat.",
      "voiceGuide": "Perkiraan Lalu Ukur. Perkirakan dulu, baru ukur tepat.",
      "symbolLarge": "…",
      "wordLarge": "LENGKAPI",
      "mathNotation": "cara • alat • satuan"
    },
    {
      "stage": "Abstract",
      "gameType": "match-tool-text",
      "title": "Jodohkan Benda dan Alat Ukur",
      "bookReference": "hlm. 109–111 dan 121–122 (bagian yang diukur dan nama alat ukur)",
      "objective": "Pakai Perkiraan Lalu Ukur: Perkirakan dulu, baru ukur tepat. Latihan: Menjodohkan benda atau bagian yang diukur dengan alat ukurnya..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga benda dan tiga alat ukur. Siswa mengetuk benda, lalu mengetuk alat ukur yang cocok. Saat bermain, ingat Perkiraan Lalu Ukur: Perkirakan dulu, baru ukur tepat.",
      "voiceGuide": "Perkiraan Lalu Ukur. Perkirakan dulu, baru ukur tepat.",
      "symbolLarge": "= ?",
      "wordLarge": "JODOHKAN",
      "mathNotation": "benda • alat ukur"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-size",
      "title": "Memori Benda dan Ukuran Wajar",
      "bookReference": "hlm. 111–122 (memperkirakan panjang)",
      "objective": "Mencocokkan benda dengan ukuran panjang yang wajar lewat permainan memori.. Ingat Perkiraan Lalu Ukur. (Perkiraan Lalu Ukur)",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): benda dan ukurannya. Siswa membalik dua kartu dan mencari pasangannya. Gunakan Perkiraan Lalu Ukur.",
      "voiceGuide": "Perkiraan Lalu Ukur. Mainkan dengan teliti.",
      "symbolLarge": "cm",
      "wordLarge": "MEMORI",
      "mathNotation": "benda • ukuran"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-length",
      "title": "Benar atau Salah: Pengukuran Panjang",
      "bookReference": "hlm. 105–119 (penggaris, meteran, dan satuan baku)",
      "objective": "Menilai pernyataan tentang pengukuran panjang dengan penggaris dan meteran.. Ingat Perkiraan Lalu Ukur. (Perkiraan Lalu Ukur)",
      "mechanicDescription": "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Tiap jawaban diberi penjelasan. Gunakan Perkiraan Lalu Ukur.",
      "voiceGuide": "Perkiraan Lalu Ukur. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "periksa dengan alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-length",
      "title": "Detektif Pengukuran",
      "bookReference": "hlm. 107–118 (membaca dan menghitung panjang)",
      "objective": "Menemukan bilangan panjang dari dua petunjuk.. Ingat Perkiraan Lalu Ukur. (Perkiraan Lalu Ukur)",
      "mechanicDescription": "Empat soal. Siswa membaca petunjuk tentang angka pada penggaris dan satu ciri bilangan, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok. Gunakan Perkiraan Lalu Ukur.",
      "voiceGuide": "Perkiraan Lalu Ukur. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "dua petunjuk, satu jawaban"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-map-length",
      "title": "Peta Konsep Pengukuran Panjang",
      "bookReference": "hlm. 104 (peta konsep Bab 3)",
      "objective": "Melengkapi peta konsep alat ukur panjang dan cara mengukur.. Ingat Perkiraan Lalu Ukur. (Perkiraan Lalu Ukur)",
      "mechanicDescription": "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. Gunakan Perkiraan Lalu Ukur.",
      "voiceGuide": "Perkiraan Lalu Ukur. Mainkan dengan teliti.",
      "symbolLarge": "⇄",
      "wordLarge": "PETA KONSEP",
      "mathNotation": "alat • satuan • cara"
    },
    {
      "stage": "Abstract",
      "gameType": "story-length",
      "title": "Soal Cerita Pengukuran",
      "bookReference": "hlm. 118 (Ayo Berlatih 3: tinggi tanaman dan perbandingan panjang)",
      "objective": "Menyelesaikan soal cerita tentang selisih dan jumlah panjang dalam sentimeter.. Ingat Perkiraan Lalu Ukur. (Perkiraan Lalu Ukur)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita lalu memilih satu dari tiga hasil dalam sentimeter. Gunakan Perkiraan Lalu Ukur.",
      "voiceGuide": "Perkiraan Lalu Ukur. Mainkan dengan teliti.",
      "symbolLarge": "cm",
      "wordLarge": "CERITA",
      "mathNotation": "selisih • jumlah"
    },
    {
      "stage": "Abstract",
      "gameType": "sentence-length",
      "title": "Susun Kata Pengukuran",
      "bookReference": "hlm. 105–119 (pengertian pengukuran panjang)",
      "objective": "Menyusun kalimat tentang pengukuran panjang dari kartu kata.. Ingat Perkiraan Lalu Ukur. (Perkiraan Lalu Ukur)",
      "mechanicDescription": "Empat kalimat. Siswa mengetuk kartu kata satu per satu menurut urutan kalimat yang benar. Ada satu kartu pengecoh. Gunakan Perkiraan Lalu Ukur.",
      "voiceGuide": "Perkiraan Lalu Ukur. Mainkan dengan teliti.",
      "symbolLarge": "…",
      "wordLarge": "SUSUN KATA",
      "mathNotation": "kalimat pengukuran"
    }
  ],
  "poin": [
    {
      "ikon": "📐",
      "nama": "Satuan baku panjang",
      "isi": "sentimeter (cm) dan meter (m)",
      "suara": "Satuan baku panjang adalah sentimeter dan meter. Satuan baku sama untuk semua orang."
    },
    {
      "ikon": "🌍",
      "nama": "Ulangi Satuan",
      "isi": "Panjang diukur dengan mengulang satuan baku.",
      "suara": "Ulangi Satuan. Panjang diukur dengan mengulang satuan baku."
    },
    {
      "ikon": "🌍",
      "nama": "Titik Nol Penggaris",
      "isi": "Mulai dari 0, bukan ujung penggaris yang rusak.",
      "suara": "Titik Nol Penggaris. Mulai dari 0, bukan ujung penggaris yang rusak."
    },
    {
      "ikon": "🌍",
      "nama": "Perkiraan Lalu Ukur",
      "isi": "Perkirakan dulu, baru ukur tepat.",
      "suara": "Perkiraan Lalu Ukur. Perkirakan dulu, baru ukur tepat."
    }
  ],
  "poinSuara": "Ingat: Ulangi Satuan, Titik Nol Penggaris, Perkiraan Lalu Ukur.",
  "cara": {
    "suara": "Cara mengukur. Pilih alat ukur yang tepat. Letakkan ujung benda di angka nol. Baca angka di ujung yang lain. Lalu tulis hasilnya dengan satuan.",
    "potongan": [
      {
        "teks": "pilih alat ukur",
        "warna": "#BAE6FD"
      },
      {
        "teks": "mulai dari nol",
        "warna": "#FECACA"
      },
      {
        "teks": "baca ujung lain",
        "warna": "#BFDBFE"
      },
      {
        "teks": "tulis satuan",
        "warna": "#FDE68A"
      }
    ]
  },
  "rumah": "Ayo Mencoba: terapkan Ulangi Satuan pada satu soal nyata di rumah.",
  "refleksi": [
    "Bagaimana Ulangi Satuan membantumu?",
    "Kapan memakai Titik Nol Penggaris?",
    "Apa bedanya dengan hanya menghafal tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Iterate Unit",
      "namaId": "Ulangi Satuan",
      "asal": "Measurement",
      "ringkas": "Panjang diukur dengan mengulang satuan baku.",
      "tahap": [
        "Story",
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Zero Point",
      "namaId": "Titik Nol Penggaris",
      "asal": "Ruler skills",
      "ringkas": "Mulai dari 0, bukan ujung penggaris yang rusak.",
      "tahap": [
        "Mind",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Estimate then Measure",
      "namaId": "Perkiraan Lalu Ukur",
      "asal": "Measurement sense",
      "ringkas": "Perkirakan dulu, baru ukur tepat.",
      "tahap": [
        "Infografis",
        "Concrete"
      ]
    }
  ]
};

export const SUB_B33: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Hubungan Antarsatuan Baku Panjang)",
  "fullTitle": "Sub-Bab B: Hubungan Antarsatuan Baku Panjang",
  "targetDescription": "Siswa memahami bahwa 100 sentimeter sama dengan 1 meter, mengubah meter ke sentimeter dengan mengalikan 100 dan sentimeter ke meter dengan membagi 100, menulis ukuran dengan meter dan sentimeter bersama, serta menjumlahkan dan mengurangkan ukuran panjang pada soal cerita. Siswa memakai cara Konversi Satuan Panjang, Kuantitas Sama Satuan Beda, Tabel Konversi. Siswa memakai cara Konversi Satuan Panjang, Kuantitas Sama Satuan Beda, Tabel Konversi.",
  "secondaryBg": "#FCE7F3",
  "secondaryBorder": "#DB2777",
  "secondaryText": "#831843",
  "silabus": {
    "teksSuara": "Kita belajar hubungan antarsatuan baku panjang. Meteran memakai satuan meter dan sentimeter. Seratus sentimeter sama dengan satu meter. Kita belajar mengubah meter ke sentimeter dan sebaliknya, menulis ukuran dengan meter dan sentimeter bersama, serta menjumlahkan dan mengurangkan ukuran panjang. Kita memakai cara: Konversi Satuan Panjang, Kuantitas Sama Satuan Beda, Tabel Konversi. 1 m = 100 cm; 1 km = 1000 m. 120 cm = 1 m 20 cm. Pakai tabel untuk pindah satuan. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menyelesaikan masalah yang berkaitan dengan panjang dan berat benda dengan satuan baku. Pada sub-bab ini siswa menghubungkan sentimeter dan meter serta menghitung ukuran panjang gabungan.",
    "referensi": "Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 3 Sub-Bab B)."
  },
  "videos": [
    {
      "id": "K3B3B-V1",
      "judul": "Meteran dan Penggaris",
      "subjudul": "Unit Conversion",
      "adegan": [
        {
          "id": "K3B3B-V1-1",
          "judul": "Memakai meteran",
          "ketukan": [
            "Bayangkan kamu sedang mempelajari Hubungan Antarsatuan Baku Panjang. Pak Guru menjelaskan cara menggunakan meteran.",
            "Cara menggunakan meteran sama dengan cara menggunakan penggaris.",
            "Mulailah dari angka 0.",
            "Ingat cara Konversi Satuan Panjang: 1 m = 100 cm; 1 km = 1000 m. Ingat cara Konversi Satuan Panjang: 1 m = 100 cm; 1 km = 1000 m."
          ],
          "papan": [
            "Cara memakai meteran",
            "Sama dengan penggaris",
            "Mulai dari 0",
            "Satuan meteran?"
          ]
        },
        {
          "id": "K3B3B-V1-2",
          "judul": "Seratus sentimeter",
          "ketukan": [
            "Perhatikan meteran dari angka 0 sampai angka 100.",
            "Pada gambar, 100 sentimeter sama dengan 1 meter.",
            "Ditulis 100 cm = 1 m atau 1 m = 100 cm.",
            "Di sini kita memakai ide Unit Conversion — 1 m = 100 cm; 1 km = 1000 m. Di sini kita memakai Unit Conversion. 1 m = 100 cm; 1 km = 1000 m."
          ],
          "papan": [
            "Meteran 0 sampai 100",
            "100 cm = 1 m",
            "1 m = 100 cm",
            "2 m = 200 cm"
          ]
        },
        {
          "id": "K3B3B-V1-3",
          "judul": "Panjang pintu",
          "ketukan": [
            "Bapak Meutia mengukur pintu dengan meteran.",
            "Ujung pintu menunjukkan bilangan 200 sentimeter.",
            "Seratus sentimeter sama dengan satu meter.",
            "METODE LUAR · Konversi Satuan Panjang: 1 m = 100 cm; 1 km = 1000 m."
          ],
          "papan": [
            "Pintu diukur meteran",
            "Menunjukkan 200 cm",
            "100 cm = 1 m",
            "200 cm = 2 m"
          ]
        }
      ]
    },
    {
      "id": "K3B3B-V2",
      "judul": "Latihan: Kuantitas Sama Satuan Beda",
      "subjudul": "Same Quantity Different Unit",
      "adegan": [
        {
          "id": "K3B3B-V2-1",
          "judul": "Dari meter ke sentimeter",
          "ketukan": [
            "Satu meter sama dengan seratus sentimeter.",
            "Untuk mengubah meter ke sentimeter, kalikan dengan 100.",
            "Misalnya 3 m = 3 × 100 cm = 300 cm.",
            "Ingat cara Kuantitas Sama Satuan Beda: 120 cm = 1 m 20 cm. Ingat cara Kuantitas Sama Satuan Beda: 120 cm = 1 m 20 cm."
          ],
          "papan": [
            "1 m = 100 cm",
            "Meter ke cm: kali 100",
            "3 m = 300 cm",
            "4 m = 400 cm"
          ]
        },
        {
          "id": "K3B3B-V2-2",
          "judul": "Dari sentimeter ke meter",
          "ketukan": [
            "Untuk mengubah sentimeter ke meter, bagilah dengan 100.",
            "Misalnya 700 cm dibagi 100 sama dengan 7 m.",
            "Dan 900 cm sama dengan 9 m.",
            "Di sini kita memakai ide Same Quantity Different Unit — 120 cm = 1 m 20 cm. Di sini kita memakai Same Quantity Different Unit. 120 cm = 1 m 20 cm."
          ],
          "papan": [
            "Cm ke meter: bagi 100",
            "700 cm = 7 m",
            "900 cm = 9 m",
            "Jarak juga bisa diubah"
          ]
        },
        {
          "id": "K3B3B-V2-3",
          "judul": "Meter dan sentimeter",
          "ketukan": [
            "Tinggi badan Azizah adalah 1 m 17 cm.",
            "1 m sama dengan 100 cm, jadi 100 + 17 = 117 cm.",
            "Tinggi badan Eri 115 cm, jadi ditulis 1 m 15 cm.",
            "METODE LUAR · Kuantitas Sama Satuan Beda: 120 cm = 1 m 20 cm."
          ],
          "papan": [
            "Azizah 1 m 17 cm",
            "100 + 17 = 117 cm",
            "Eri 115 cm = 1 m 15 cm",
            "Meter dan sentimeter"
          ]
        }
      ]
    },
    {
      "id": "K3B3B-V3",
      "judul": "Siap pakai Conversion Table",
      "subjudul": "Conversion Table",
      "adegan": [
        {
          "id": "K3B3B-V3-1",
          "judul": "Menyambung pita",
          "ketukan": [
            "Meutia menyambung dua utas pita.",
            "Pita pertama panjangnya 4 m 37 cm.",
            "Pita kedua panjangnya 7 m 43 cm.",
            "Ingat cara Tabel Konversi: Pakai tabel untuk pindah satuan. Ingat cara Tabel Konversi: Pakai tabel untuk pindah satuan."
          ],
          "papan": [
            "Meutia menyambung pita",
            "Pita 1: 4 m 37 cm",
            "Pita 2: 7 m 43 cm",
            "Panjang gabungan?"
          ]
        },
        {
          "id": "K3B3B-V3-2",
          "judul": "Jumlahkan",
          "ketukan": [
            "Jumlahkan meter dengan meter: 4 + 7 = 11 m.",
            "Jumlahkan sentimeter dengan sentimeter: 37 + 43 = 80 cm.",
            "Panjang pita setelah disambung adalah 11 m 80 cm.",
            "Di sini kita memakai ide Conversion Table — Pakai tabel untuk pindah satuan. Di sini kita memakai Conversion Table. Pakai tabel untuk pindah satuan."
          ],
          "papan": [
            "4 m + 7 m = 11 m",
            "37 cm + 43 cm = 80 cm",
            "Hasil 11 m 80 cm",
            "Satuan yang sama"
          ]
        },
        {
          "id": "K3B3B-V3-3",
          "judul": "Kain katun",
          "ketukan": [
            "Penjaga toko punya kain katun 75 m 80 cm.",
            "Ia menjual 38 m 45 cm kain itu.",
            "Kurangkan: 75 m 80 cm dikurangi 38 m 45 cm.",
            "METODE LUAR · Tabel Konversi: Pakai tabel untuk pindah satuan."
          ],
          "papan": [
            "Kain 75 m 80 cm",
            "Terjual 38 m 45 cm",
            "Dikurangkan",
            "Sisa 37 m 35 cm"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Hubungan Antarsatuan Baku Panjang dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa memahami bahwa 100 sentimeter sama dengan 1 meter, mengubah meter ke sentimeter dengan mengalikan 100 dan sentimet….",
      "icon": "❓",
      "flowFrom": "Pahami soal",
      "flowTo": "Unit Conversion"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Unit Conversion",
      "stepDesc": "1 m = 100 cm; 1 km = 1000 m. Pada Hubungan Antarsatuan Baku Panjang, langkah “Unit Conversion” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Konversi Satuan Panjang: 1 m = 100 cm; 1 km = 1000 m. Kuantitas Sama Satuan Beda: 120 cm = 1 m 20 cm. Tabel Konversi: Pakai tabel untuk pindah satuan.. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🧭",
      "flowFrom": "Unit Conversion",
      "flowTo": "Same Quantity Different Unit"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Same Quantity Different Unit",
      "stepDesc": "120 cm = 1 m 20 cm. Pada Hubungan Antarsatuan Baku Panjang, langkah “Same Quantity Different Unit” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Konversi Satuan Panjang: 1 m = 100 cm; 1 km = 1000 m. Kuantitas Sama Satuan Beda: 120 cm = 1 m 20 cm. Tabel Konversi: Pakai tabel untuk pindah satuan.. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🛠️",
      "flowFrom": "Same Quantity Different Unit",
      "flowTo": "Conversion Table"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Conversion Table",
      "stepDesc": "Pakai tabel untuk pindah satuan. Pada Hubungan Antarsatuan Baku Panjang, langkah “Conversion Table” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Konversi Satuan Panjang: 1 m = 100 cm; 1 km = 1000 m. Kuantitas Sama Satuan Beda: 120 cm = 1 m 20 cm. Tabel Konversi: Pakai tabel untuk pindah satuan.. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "✨",
      "flowFrom": "Conversion Table",
      "flowTo": "Kerjakan"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Kerjakan",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Hubungan Antarsatuan Baku Panjang. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "✏️",
      "flowFrom": "Kerjakan",
      "flowTo": "Cek masuk akal"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek masuk akal",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Hubungan Antarsatuan Baku Panjang. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Cek masuk akal",
      "flowTo": "Simpulkan"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Simpulkan",
      "stepDesc": "Simpulkan ide utama Hubungan Antarsatuan Baku Panjang dengan kalimatmu sendiri. Sebutkan cara yang kamu pakai dan mengapa cara itu membantu. Jelaskan kepada teman seolah-olah kamu guru kecil. Simpulan yang jelas menandakan konsepnya sudah dipahami.",
      "icon": "💬",
      "flowFrom": "Simpulkan",
      "flowTo": "Main"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Main",
      "stepDesc": "Latih lagi di tahap Concrete, Picture, lalu Abstract untuk Hubungan Antarsatuan Baku Panjang. Mulai dari benda nyata, lanjut ke diagram, baru ke lambang angka. Ulangi sampai kamu bisa menjelaskan tanpa melihat contoh. Bermain sambil berlatih membuat konsepnya melekat lebih lama.",
      "icon": "🎮",
      "flowFrom": "Main",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Meteran",
      "emoji": "📏",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Meteran dipakai seperti penggaris, mulai dari angka nol. Satuannya meter dan sentimeter."
    },
    {
      "judul": "100 cm = 1 m",
      "emoji": "💯",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Seratus sentimeter sama dengan satu meter. Dua meter sama dengan dua ratus sentimeter."
    },
    {
      "judul": "Meter ke Sentimeter",
      "emoji": "✖️",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Untuk mengubah meter ke sentimeter, kalikan dengan seratus. Tiga meter sama dengan tiga ratus sentimeter."
    },
    {
      "judul": "Sentimeter ke Meter",
      "emoji": "➗",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Untuk mengubah sentimeter ke meter, bagilah dengan seratus. Tujuh ratus sentimeter sama dengan tujuh meter."
    },
    {
      "judul": "1 m 17 cm",
      "emoji": "🧍",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Satu meter tujuh belas sentimeter sama dengan seratus ditambah tujuh belas, yaitu seratus tujuh belas sentimeter."
    },
    {
      "judul": "Garis Meteran",
      "emoji": "📈",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Pada garis meteran, tiap seratus sentimeter ditandai satu meter. Batang yang sampai angka dua meter panjangnya dua ratus sentimeter."
    },
    {
      "judul": "Menjumlahkan",
      "emoji": "➕",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Jumlahkan meter dengan meter dan sentimeter dengan sentimeter. Empat meter tiga puluh tujuh senti ditambah tujuh meter empat puluh tiga senti sama dengan sebelas meter delapan puluh senti."
    },
    {
      "judul": "Mengurangkan",
      "emoji": "➖",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Kurangkan meter dengan meter dan sentimeter dengan sentimeter. Tujuh puluh lima meter delapan puluh senti dikurangi tiga puluh delapan meter empat puluh lima senti sama dengan tiga puluh tujuh meter tiga puluh lima senti."
    },
    {
      "judul": "Membandingkan",
      "emoji": "⚖️",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Untuk membandingkan, ubah dua ukuran ke satuan yang sama, misalnya sentimeter, lalu bandingkan bilangannya."
    },
    {
      "judul": "Cara Mengubah",
      "emoji": "📝",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Empat langkah. Satu, ingat satu meter sama dengan seratus sentimeter. Dua, meter ke sentimeter kalikan seratus. Tiga, sentimeter ke meter bagi seratus. Empat, periksa dengan cara sebaliknya."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "build-ribbon",
      "title": "Rakit Panjang Pita",
      "bookReference": "hlm. 120–121 (100 cm = 1 m)",
      "objective": "Pakai Konversi Satuan Panjang: 1 m = 100 cm; 1 km = 1000 m. Latihan: Merakit pita dari potongan 1 meter, 10 sentimeter, dan 1 sentimeter sampai sepanjang yang diminta..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca panjang pita dalam sentimeter, lalu merakitnya dengan tombol tambah dan kurang. Sepuluh potongan kecil otomatis ditukar potongan yang lebih besar. Saat bermain, ingat Konversi Satuan Panjang: 1 m = 100 cm; 1 km = 1000 m.",
      "voiceGuide": "Konversi Satuan Panjang. 1 m = 100 cm; 1 km = 1000 m.",
      "emoji": "🎀",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "count-ribbon-cm",
      "title": "Hitung Panjang dalam Sentimeter",
      "bookReference": "hlm. 120–121 (meter dan sentimeter)",
      "objective": "Pakai Konversi Satuan Panjang: 1 m = 100 cm; 1 km = 1000 m. Latihan: Menghitung panjang pita dalam sentimeter dari potongan meter, sepuluh sentimeter, dan sentimeter..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Gambar pita ditampilkan. Siswa memilih satu dari tiga panjang. Pengecoh lebih atau kurang sepuluh. Saat bermain, ingat Konversi Satuan Panjang: 1 m = 100 cm; 1 km = 1000 m.",
      "voiceGuide": "Konversi Satuan Panjang. 1 m = 100 cm; 1 km = 1000 m.",
      "emoji": "🔢",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "meter-to-cm",
      "title": "Ubah Meter ke Sentimeter",
      "bookReference": "hlm. 121 (3 m = ... cm)",
      "objective": "Pakai Konversi Satuan Panjang: 1 m = 100 cm; 1 km = 1000 m. Latihan: Mengubah ukuran meter ke sentimeter dengan gambar pita..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Gambar pita berpotongan satu meter ditampilkan. Siswa memilih satu dari tiga hasil. Pengecoh lupa mengalikan 100. Saat bermain, ingat Konversi Satuan Panjang: 1 m = 100 cm; 1 km = 1000 m.",
      "voiceGuide": "Konversi Satuan Panjang. 1 m = 100 cm; 1 km = 1000 m.",
      "emoji": "✖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cm-to-meter",
      "title": "Ubah Sentimeter ke Meter",
      "bookReference": "hlm. 121 (900 cm = ... m)",
      "objective": "Pakai Konversi Satuan Panjang: 1 m = 100 cm; 1 km = 1000 m. Latihan: Mengubah ukuran sentimeter ke meter dengan gambar pita..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Gambar pita ditampilkan. Siswa memilih satu dari tiga hasil. Pengecoh salah membagi. Saat bermain, ingat Konversi Satuan Panjang: 1 m = 100 cm; 1 km = 1000 m.",
      "voiceGuide": "Konversi Satuan Panjang. 1 m = 100 cm; 1 km = 1000 m.",
      "emoji": "➗",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "match-ribbon-length",
      "title": "Jodohkan Pita dan Panjang",
      "bookReference": "hlm. 120–122 (ukuran panjang)",
      "objective": "Menjodohkan gambar pita dengan panjangnya dalam sentimeter.. Ingat Konversi Satuan Panjang. (Konversi Satuan Panjang)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga pita dan tiga panjang. Siswa mengetuk pita, lalu mengetuk panjang yang cocok. Gunakan Konversi Satuan Panjang.",
      "voiceGuide": "Konversi Satuan Panjang. Mainkan dengan teliti.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "memory-ribbon-length",
      "title": "Memori Pita dan Panjang",
      "bookReference": "hlm. 120–122 (ukuran panjang)",
      "objective": "Mencocokkan gambar pita dengan panjangnya lewat permainan memori.. Ingat Konversi Satuan Panjang. (Konversi Satuan Panjang)",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. Gunakan Konversi Satuan Panjang.",
      "voiceGuide": "Konversi Satuan Panjang. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-ribbon-length",
      "title": "Ketuk Pita dengan Panjang",
      "bookReference": "hlm. 122 (tinggi badan dalam meter dan sentimeter)",
      "objective": "Menemukan pita yang panjangnya sama dengan ukuran yang diminta, ditulis dengan meter dan sentimeter.. Ingat Konversi Satuan Panjang. (Konversi Satuan Panjang)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga pita dan dua pertanyaan. Siswa mengetuk pita yang panjangnya sama dengan ukuran yang disebut. Gunakan Konversi Satuan Panjang.",
      "voiceGuide": "Konversi Satuan Panjang. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-equal",
      "title": "Ketuk Semua yang Sama Panjang",
      "bookReference": "hlm. 120–122 (satu ukuran ditulis dengan beberapa cara)",
      "objective": "Menemukan semua ukuran yang sama panjang dengan ukuran acuan, walau ditulis berbeda.. Ingat Konversi Satuan Panjang. (Konversi Satuan Panjang)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat pita dan satu perintah. Siswa mengetuk semua yang sama panjang dengan acuan, lalu menekan Periksa. Gunakan Konversi Satuan Panjang.",
      "voiceGuide": "Konversi Satuan Panjang. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "board-cm",
      "title": "Papan Sentimeter",
      "bookReference": "hlm. 122 (tabel tinggi badan dalam sentimeter)",
      "objective": "Mengubah meter dan sentimeter menjadi sentimeter pada papan ratusan, puluhan, dan satuan.. Ingat Konversi Satuan Panjang. (Konversi Satuan Panjang)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Gambar pita ditampilkan. Siswa mengatur angka ratusan, puluhan, dan satuan pada papan dan menekan Periksa. Gunakan Konversi Satuan Panjang.",
      "voiceGuide": "Konversi Satuan Panjang. Mainkan dengan teliti.",
      "emoji": "🗂️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-ribbon",
      "title": "Urutkan Pita menurut Panjang",
      "bookReference": "hlm. 122 (urutkan tinggi badan)",
      "objective": "Mengurutkan tiga pita menurut panjangnya.. Ingat Konversi Satuan Panjang. (Konversi Satuan Panjang)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga pita bertanda huruf. Siswa mengetuk pita satu per satu dari yang terpendek atau terpanjang. Gunakan Konversi Satuan Panjang.",
      "voiceGuide": "Konversi Satuan Panjang. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 9
    },
    {
      "stage": "Picture",
      "gameType": "count-meter-line",
      "title": "Hitung Garis Meteran",
      "bookReference": "hlm. 120 (meteran 100 cm = 1 m)",
      "objective": "Pakai Kuantitas Sama Satuan Beda: 120 cm = 1 m 20 cm. Latihan: Menghitung panjang batang pada garis meteran dalam sentimeter..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Garis meteran bertanda tiap 50 cm dan batang berwarna ditampilkan. Siswa memilih satu dari tiga panjang. Saat bermain, ingat Kuantitas Sama Satuan Beda: 120 cm = 1 m 20 cm.",
      "voiceGuide": "Kuantitas Sama Satuan Beda. 120 cm = 1 m 20 cm.",
      "diagramType": "meter-count",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "complete-convert-sentence",
      "title": "Lengkapi Kalimat Ubah Satuan",
      "bookReference": "hlm. 121 (ubahlah satuan sentimeter ke dalam satuan meter)",
      "objective": "Pakai Kuantitas Sama Satuan Beda: 120 cm = 1 m 20 cm. Latihan: Melengkapi kalimat yang mengubah sentimeter menjadi meter dan sentimeter..",
      "mechanicDescription": "Tiga soal, tiap soal tiga kalimat, misalnya 117 cm = 100 cm + ... cm. Siswa memilih satu dari tiga angka untuk bagian kosong. Saat bermain, ingat Kuantitas Sama Satuan Beda: 120 cm = 1 m 20 cm.",
      "voiceGuide": "Kuantitas Sama Satuan Beda. 120 cm = 1 m 20 cm.",
      "diagramType": "convert-sentence",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "match-line-size",
      "title": "Jodohkan Garis dan Ukuran",
      "bookReference": "hlm. 120–122 (ukuran panjang)",
      "objective": "Pakai Kuantitas Sama Satuan Beda: 120 cm = 1 m 20 cm. Latihan: Menjodohkan garis meteran dengan ukuran yang ditulis dengan meter dan sentimeter..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga garis dan tiga ukuran. Siswa mengetuk garis, lalu mengetuk ukuran yang cocok. Saat bermain, ingat Kuantitas Sama Satuan Beda: 120 cm = 1 m 20 cm.",
      "voiceGuide": "Kuantitas Sama Satuan Beda. 120 cm = 1 m 20 cm.",
      "diagramType": "meter-match",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memory-line-size",
      "title": "Memori Garis dan Ukuran",
      "bookReference": "hlm. 120–122 (ukuran panjang)",
      "objective": "Pakai Kuantitas Sama Satuan Beda: 120 cm = 1 m 20 cm. Latihan: Mencocokkan garis meteran dengan ukurannya lewat permainan memori..",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. Saat bermain, ingat Kuantitas Sama Satuan Beda: 120 cm = 1 m 20 cm.",
      "voiceGuide": "Kuantitas Sama Satuan Beda. 120 cm = 1 m 20 cm.",
      "diagramType": "meter-memory",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "fill-height-table",
      "title": "Isi Tabel Ubah Ukuran",
      "bookReference": "hlm. 122 (tabel tinggi badan Azizah dan teman-temannya)",
      "objective": "Melengkapi tabel ukuran panjang dalam meter dan sentimeter.. Ingat Kuantitas Sama Satuan Beda. (Kuantitas Sama Satuan Beda)",
      "mechanicDescription": "Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu ukuran yang tepat. Ada satu kartu pengecoh. Gunakan Kuantitas Sama Satuan Beda.",
      "voiceGuide": "Kuantitas Sama Satuan Beda. Mainkan dengan teliti.",
      "diagramType": "size-table",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-equal-size",
      "title": "Ketuk Semua Ukuran yang Sama",
      "bookReference": "hlm. 120–122 (satu ukuran ditulis dengan beberapa cara)",
      "objective": "Menemukan semua ukuran yang sama dengan ukuran acuan, walau ditulis berbeda.. Ingat Kuantitas Sama Satuan Beda. (Kuantitas Sama Satuan Beda)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat ukuran dan satu perintah. Siswa mengetuk semua yang sama dengan acuan, lalu menekan Periksa. Gunakan Kuantitas Sama Satuan Beda.",
      "voiceGuide": "Kuantitas Sama Satuan Beda. Mainkan dengan teliti.",
      "diagramType": "size-select",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-whole-meter",
      "title": "Pilah Ukuran: Pas Meter atau Bersisa",
      "bookReference": "hlm. 121–122 (meter dan sentimeter)",
      "objective": "Memilah ukuran sentimeter menjadi yang pas dalam meter dan yang masih bersisa sentimeter.. Ingat Kuantitas Sama Satuan Beda. (Kuantitas Sama Satuan Beda)",
      "mechanicDescription": "Tiga ronde, tiap ronde enam ukuran dan dua kotak. Ukuran yang habis dibagi 100 pas dalam meter. Siswa menyeret atau mengetuk ukuran ke kotak yang tepat. Gunakan Kuantitas Sama Satuan Beda.",
      "voiceGuide": "Kuantitas Sama Satuan Beda. Mainkan dengan teliti.",
      "diagramType": "size-sort",
      "numberA": 3,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "order-convert-steps",
      "title": "Urutkan Langkah Mengubah Satuan",
      "bookReference": "hlm. 121 (mengubah satuan dan menjumlahkan ukuran)",
      "objective": "Mengurutkan langkah mengubah satuan panjang dan menjumlahkan ukuran.. Ingat Kuantitas Sama Satuan Beda. (Kuantitas Sama Satuan Beda)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat langkah. Siswa mengetuk langkah satu per satu menurut urutan yang benar. Letak jawaban berpindah. Gunakan Kuantitas Sama Satuan Beda.",
      "voiceGuide": "Kuantitas Sama Satuan Beda. Mainkan dengan teliti.",
      "diagramType": "steps-order",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "board-line-cm",
      "title": "Papan Sentimeter dari Garis",
      "bookReference": "hlm. 120 (meteran 0 sampai 200 cm)",
      "objective": "Menulis panjang batang pada garis meteran dalam sentimeter pada papan.. Ingat Kuantitas Sama Satuan Beda. (Kuantitas Sama Satuan Beda)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca garis meteran, lalu mengatur angka ratusan, puluhan, dan satuan pada papan dan menekan Periksa. Gunakan Kuantitas Sama Satuan Beda.",
      "voiceGuide": "Kuantitas Sama Satuan Beda. Mainkan dengan teliti.",
      "diagramType": "meter-board",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "join-two-ribbons",
      "title": "Sambung Dua Garis",
      "bookReference": "hlm. 123 (menyambung dua utas pita)",
      "objective": "Menghitung panjang dua batang yang disambung pada garis meteran.. Ingat Kuantitas Sama Satuan Beda. (Kuantitas Sama Satuan Beda)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Dua batang yang disambung pada garis meteran ditampilkan. Siswa memilih satu dari tiga panjang gabungan. Gunakan Kuantitas Sama Satuan Beda.",
      "voiceGuide": "Kuantitas Sama Satuan Beda. Mainkan dengan teliti.",
      "diagramType": "meter-join",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "meter-to-cm-abstract",
      "title": "Ubah Meter ke Sentimeter: Lambang",
      "bookReference": "hlm. 121 (4 m = ... cm)",
      "objective": "Pakai Tabel Konversi: Pakai tabel untuk pindah satuan. Latihan: Mengubah meter ke sentimeter dan memilih hasilnya dari tiga pilihan..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal, misalnya 4 m = ... cm. Pengecoh lupa mengalikan 100 atau mengalikan 1.000. Saat bermain, ingat Tabel Konversi: Pakai tabel untuk pindah satuan.",
      "voiceGuide": "Tabel Konversi. Pakai tabel untuk pindah satuan.",
      "symbolLarge": "4 m",
      "wordLarge": "METER KE CM",
      "mathNotation": "kali 100"
    },
    {
      "stage": "Abstract",
      "gameType": "cm-to-m-cm",
      "title": "Ubah Sentimeter ke Meter dan Sentimeter",
      "bookReference": "hlm. 122 (tabel tinggi badan: Eri 115 cm = 1 m 15 cm)",
      "objective": "Pakai Tabel Konversi: Pakai tabel untuk pindah satuan. Latihan: Menulis ukuran sentimeter sebagai meter dan sentimeter..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal, misalnya 135 cm = ... m ... cm. Pengecoh salah menaruh angka. Saat bermain, ingat Tabel Konversi: Pakai tabel untuk pindah satuan.",
      "voiceGuide": "Tabel Konversi. Pakai tabel untuk pindah satuan.",
      "symbolLarge": "135 cm",
      "wordLarge": "M DAN CM",
      "mathNotation": "ratusan • sisa"
    },
    {
      "stage": "Abstract",
      "gameType": "board-convert",
      "title": "Papan Ubah Satuan",
      "bookReference": "hlm. 122 (tinggi badan dalam sentimeter)",
      "objective": "Pakai Tabel Konversi: Pakai tabel untuk pindah satuan. Latihan: Mengubah meter dan sentimeter menjadi sentimeter pada papan..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal, misalnya 2 m 40 cm = ... cm. Siswa mengatur angka ratusan, puluhan, dan satuan lalu menekan Periksa. Saat bermain, ingat Tabel Konversi: Pakai tabel untuk pindah satuan.",
      "voiceGuide": "Tabel Konversi. Pakai tabel untuk pindah satuan.",
      "symbolLarge": "…",
      "wordLarge": "PAPAN",
      "mathNotation": "ratusan • puluhan • satuan"
    },
    {
      "stage": "Abstract",
      "gameType": "match-size",
      "title": "Jodohkan Ukuran",
      "bookReference": "hlm. 121–122 (ubah meter dan sentimeter)",
      "objective": "Pakai Tabel Konversi: Pakai tabel untuk pindah satuan. Latihan: Menjodohkan ukuran meter dengan ukuran sentimeter yang sama..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga ukuran dan tiga pasangannya. Siswa mengetuk ukuran, lalu mengetuk pasangannya. Saat bermain, ingat Tabel Konversi: Pakai tabel untuk pindah satuan.",
      "voiceGuide": "Tabel Konversi. Pakai tabel untuk pindah satuan.",
      "symbolLarge": "= ?",
      "wordLarge": "JODOHKAN",
      "mathNotation": "m • cm"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-size-b",
      "title": "Memori Ukuran",
      "bookReference": "hlm. 121–122 (ukuran yang sama)",
      "objective": "Mencocokkan dua cara menulis ukuran yang sama lewat permainan memori.. Ingat Tabel Konversi. (Tabel Konversi)",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. Gunakan Tabel Konversi.",
      "voiceGuide": "Tabel Konversi. Mainkan dengan teliti.",
      "symbolLarge": "m cm",
      "wordLarge": "MEMORI",
      "mathNotation": "ukuran yang sama"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-meter",
      "title": "Benar atau Salah: Meter dan Sentimeter",
      "bookReference": "hlm. 120–123 (hubungan meter dan sentimeter)",
      "objective": "Menilai pernyataan tentang hubungan meter dan sentimeter serta ukuran gabungan.. Ingat Tabel Konversi. (Tabel Konversi)",
      "mechanicDescription": "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Tiap jawaban diberi penjelasan. Gunakan Tabel Konversi.",
      "voiceGuide": "Tabel Konversi. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "periksa dengan alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-meter",
      "title": "Detektif Satuan Panjang",
      "bookReference": "hlm. 120–122 (ubah satuan panjang)",
      "objective": "Menemukan bilangan hasil perubahan satuan dari dua petunjuk.. Ingat Tabel Konversi. (Tabel Konversi)",
      "mechanicDescription": "Empat soal. Siswa membaca petunjuk tentang perubahan satuan dan satu ciri bilangan, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok. Gunakan Tabel Konversi.",
      "voiceGuide": "Tabel Konversi. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "dua petunjuk, satu jawaban"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-map-meter",
      "title": "Peta Konsep Satuan Panjang",
      "bookReference": "hlm. 104 (peta konsep Bab 3)",
      "objective": "Melengkapi peta konsep hubungan meter dan sentimeter serta ukuran gabungan.. Ingat Tabel Konversi. (Tabel Konversi)",
      "mechanicDescription": "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. Gunakan Tabel Konversi.",
      "voiceGuide": "Tabel Konversi. Mainkan dengan teliti.",
      "symbolLarge": "⇄",
      "wordLarge": "PETA KONSEP",
      "mathNotation": "m • cm • gabungan"
    },
    {
      "stage": "Abstract",
      "gameType": "story-meter",
      "title": "Soal Cerita Satuan Panjang",
      "bookReference": "hlm. 123 (menyambung pita, kain katun, dan kebun jagung)",
      "objective": "Menyelesaikan soal cerita yang menjumlahkan, mengurangkan, atau mengubah ukuran panjang.. Ingat Tabel Konversi. (Tabel Konversi)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita lalu memilih satu dari tiga hasil. Pengecoh lupa menyimpan atau salah mengubah. Gunakan Tabel Konversi.",
      "voiceGuide": "Tabel Konversi. Mainkan dengan teliti.",
      "symbolLarge": "m cm",
      "wordLarge": "CERITA",
      "mathNotation": "jumlah • selisih • ubah"
    },
    {
      "stage": "Abstract",
      "gameType": "sentence-meter",
      "title": "Susun Kata Satuan Panjang",
      "bookReference": "hlm. 120–122 (hubungan meter dan sentimeter)",
      "objective": "Menyusun kalimat tentang hubungan meter dan sentimeter dari kartu kata.. Ingat Tabel Konversi. (Tabel Konversi)",
      "mechanicDescription": "Empat kalimat. Siswa mengetuk kartu kata satu per satu menurut urutan kalimat yang benar. Ada satu kartu pengecoh. Gunakan Tabel Konversi.",
      "voiceGuide": "Tabel Konversi. Mainkan dengan teliti.",
      "symbolLarge": "…",
      "wordLarge": "SUSUN KATA",
      "mathNotation": "kalimat satuan panjang"
    }
  ],
  "poin": [
    {
      "ikon": "💯",
      "nama": "Meter dan sentimeter",
      "isi": "1 m = 100 cm",
      "suara": "Satu meter sama dengan seratus sentimeter. Dua meter sama dengan dua ratus sentimeter."
    },
    {
      "ikon": "🌍",
      "nama": "Konversi Satuan Panjang",
      "isi": "1 m = 100 cm; 1 km = 1000 m.",
      "suara": "Konversi Satuan Panjang. 1 m = 100 cm; 1 km = 1000 m."
    },
    {
      "ikon": "🌍",
      "nama": "Kuantitas Sama Satuan Beda",
      "isi": "120 cm = 1 m 20 cm.",
      "suara": "Kuantitas Sama Satuan Beda. 120 cm = 1 m 20 cm."
    },
    {
      "ikon": "🌍",
      "nama": "Tabel Konversi",
      "isi": "Pakai tabel untuk pindah satuan.",
      "suara": "Tabel Konversi. Pakai tabel untuk pindah satuan."
    }
  ],
  "poinSuara": "Ingat: Konversi Satuan Panjang, Kuantitas Sama Satuan Beda, Tabel Konversi.",
  "cara": {
    "suara": "Cara mengubah satuan. Ingat satu meter sama dengan seratus sentimeter. Meter ke sentimeter, kalikan seratus. Sentimeter ke meter, bagi seratus. Lalu periksa dengan cara sebaliknya.",
    "potongan": [
      {
        "teks": "1 m = 100 cm",
        "warna": "#BAE6FD"
      },
      {
        "teks": "meter ke cm: kali",
        "warna": "#FECACA"
      },
      {
        "teks": "cm ke meter: bagi",
        "warna": "#BFDBFE"
      },
      {
        "teks": "periksa",
        "warna": "#FDE68A"
      }
    ]
  },
  "rumah": "Ayo Mencoba: terapkan Konversi Satuan Panjang pada satu soal nyata di rumah.",
  "refleksi": [
    "Bagaimana Konversi Satuan Panjang membantumu?",
    "Kapan memakai Kuantitas Sama Satuan Beda?",
    "Apa bedanya dengan hanya menghafal tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Unit Conversion",
      "namaId": "Konversi Satuan Panjang",
      "asal": "SI relationships",
      "ringkas": "1 m = 100 cm; 1 km = 1000 m.",
      "tahap": [
        "Story",
        "Abstract",
        "Mind"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Same Quantity Different Unit",
      "namaId": "Kuantitas Sama Satuan Beda",
      "asal": "Measurement",
      "ringkas": "120 cm = 1 m 20 cm.",
      "tahap": [
        "Picture",
        "Concrete"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Conversion Table",
      "namaId": "Tabel Konversi",
      "asal": "Reference table",
      "ringkas": "Pakai tabel untuk pindah satuan.",
      "tahap": [
        "Infografis",
        "Abstract"
      ]
    }
  ]
};

export const SUB_C33: SubBabNaskah = {
  "id": "C",
  "codeTitle": "Sub-Bab C (Pengukuran Berat dengan Satuan Baku)",
  "fullTitle": "Sub-Bab C: Pengukuran Berat dengan Satuan Baku",
  "targetDescription": "Siswa mengenal timbangan sebagai alat ukur berat (timbangan digital, timbangan duduk, timbangan kodok, dan timbangan badan), mengenal satuan baku berat gram dan kilogram, menimbang dengan memulai dari angka nol, membaca berat pada layar dan jarum, serta memilih timbangan dan satuan yang tepat untuk benda ringan dan benda berat. Siswa memakai cara Neraca, Satuan Berat Baku, Perkiraan Berat. Siswa memakai cara Neraca, Satuan Berat Baku, Perkiraan Berat.",
  "secondaryBg": "#DCFCE7",
  "secondaryBorder": "#16A34A",
  "secondaryText": "#14532D",
  "silabus": {
    "teksSuara": "Kita belajar mengukur berat dengan satuan baku. Kita mengenal timbangan sebagai alat ukur berat, dan satuan baku gram dan kilogram. Kita belajar menimbang dari angka nol, membaca berat pada layar dan jarum, serta memilih timbangan yang tepat. Kita memakai cara: Neraca, Satuan Berat Baku, Perkiraan Berat. Bandingkan berat dengan anak timbangan. Gram dan kilogram. Bandingkan dengan benda acuan. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menyelesaikan masalah yang berkaitan dengan panjang dan berat benda dengan satuan baku. Pada sub-bab ini siswa menimbang benda dengan berbagai timbangan dan memilih satuan gram atau kilogram.",
    "referensi": "Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 3 Sub-Bab C)."
  },
  "videos": [
    {
      "id": "K3B3C-V1",
      "judul": "Menimbang Isi Tas",
      "subjudul": "Balance Scale",
      "adegan": [
        {
          "id": "K3B3C-V1-1",
          "judul": "Keluarkan isi tas",
          "ketukan": [
            "Bayangkan kamu sedang mempelajari Pengukuran Berat dengan Satuan Baku. Satu kelompok beranggotakan tiga sampai lima orang.",
            "Keluarkan barang-barang dari tas dan letakkan di atas meja.",
            "Siapkan timbangan digital sebagai alat ukur.",
            "Ingat cara Neraca: Bandingkan berat dengan anak timbangan. Ingat cara Neraca: Bandingkan berat dengan anak timbangan."
          ],
          "papan": [
            "Kelompok 3 sampai 5 orang",
            "Barang dari tas di atas meja",
            "Timbangan digital",
            "Ukur berat tiap barang"
          ]
        },
        {
          "id": "K3B3C-V1-2",
          "judul": "Timbang barangnya",
          "ketukan": [
            "Letakkan satu barang di atas timbangan digital.",
            "Lihat angka yang muncul pada layar timbangan.",
            "Angka itu adalah berat barang.",
            "Di sini kita memakai ide Balance Scale — Bandingkan berat dengan anak timbangan. Di sini kita memakai Balance Scale. Bandingkan berat dengan anak timbangan."
          ],
          "papan": [
            "Barang di atas timbangan",
            "Lihat angka pada layar",
            "Angka = berat barang",
            "Tulis di tabel"
          ]
        },
        {
          "id": "K3B3C-V1-3",
          "judul": "Satuan berat",
          "ketukan": [
            "Setelah semua barang ditimbang, presentasikan hasilnya.",
            "Satuan apa yang dipakai pada timbangan.",
            "Satuan baku berat adalah gram dan kilogram.",
            "METODE LUAR · Neraca: Bandingkan berat dengan anak timbangan."
          ],
          "papan": [
            "Presentasikan hasilnya",
            "Satuan pada timbangan?",
            "Gram dan kilogram",
            "g dan kg"
          ]
        }
      ]
    },
    {
      "id": "K3B3C-V2",
      "judul": "Latihan: Satuan Berat Baku",
      "subjudul": "Standard Mass Units",
      "adegan": [
        {
          "id": "K3B3C-V2-1",
          "judul": "Ke pasar",
          "ketukan": [
            "Meutia pergi ke pasar untuk berbelanja.",
            "Penjual menimbang barang dagangannya dengan timbangan.",
            "Timbangan apa yang dipakai penjual di pasar.",
            "Ingat cara Satuan Berat Baku: Gram dan kilogram. Ingat cara Satuan Berat Baku: Gram dan kilogram."
          ],
          "papan": [
            "Meutia ke pasar",
            "Penjual menimbang dagangan",
            "Timbangan apa?",
            "Kodok, duduk, digital"
          ]
        },
        {
          "id": "K3B3C-V2-2",
          "judul": "Nama dan satuan",
          "ketukan": [
            "Timbangan kodok memakai bandul sebagai ukuran berat.",
            "Timbangan duduk memakai jarum yang menunjuk angka.",
            "Timbangan digital menampilkan angka pada layar.",
            "Di sini kita memakai ide Standard Mass Units — Gram dan kilogram. Di sini kita memakai Standard Mass Units. Gram dan kilogram."
          ],
          "papan": [
            "Kodok: bandul",
            "Duduk: jarum",
            "Digital: layar",
            "Satuan: g atau kg"
          ]
        },
        {
          "id": "K3B3C-V2-3",
          "judul": "Gram atau kilogram",
          "ketukan": [
            "Gram dipakai untuk benda yang ringan.",
            "Contohnya tepung, gula pasir, pensil, dan buku.",
            "Kilogram dipakai untuk benda yang lebih berat.",
            "METODE LUAR · Satuan Berat Baku: Gram dan kilogram."
          ],
          "papan": [
            "Gram: benda ringan",
            "Tepung, gula, pensil, buku",
            "Kilogram: benda berat",
            "Berat badan, beras, buah"
          ]
        }
      ]
    },
    {
      "id": "K3B3C-V3",
      "judul": "Siap pakai Estimate Mass",
      "subjudul": "Estimate Mass",
      "adegan": [
        {
          "id": "K3B3C-V3-1",
          "judul": "Menimbang bahan",
          "ketukan": [
            "Meutia membantu ibunya membuat kue.",
            "Bahan kue yang ditimbang adalah gula, tepung, dan telur.",
            "Gula menunjukkan 1.000 gram dan tepung 1.250 gram.",
            "Ingat cara Perkiraan Berat: Bandingkan dengan benda acuan. Ingat cara Perkiraan Berat: Bandingkan dengan benda acuan."
          ],
          "papan": [
            "Meutia membuat kue",
            "Gula, tepung, telur",
            "Gula 1.000 g, tepung 1.250 g",
            "Telur 250 g"
          ]
        },
        {
          "id": "K3B3C-V3-2",
          "judul": "Mulai dari nol",
          "ketukan": [
            "Sebelum menimbang, lihat angka awal pada timbangan.",
            "Jarum atau layar harus menunjukkan angka 0.",
            "Bila tidak dimulai dari nol, hasilnya keliru.",
            "Di sini kita memakai ide Estimate Mass — Bandingkan dengan benda acuan. Di sini kita memakai Estimate Mass. Bandingkan dengan benda acuan."
          ],
          "papan": [
            "Lihat angka awal",
            "Harus di angka 0",
            "Bukan dari 0, hasil keliru",
            "Baru letakkan benda"
          ]
        },
        {
          "id": "K3B3C-V3-3",
          "judul": "Stroberi tambahan",
          "ketukan": [
            "Timbangan pertama menunjukkan stroberi 100 gram.",
            "Timbangan kedua menunjukkan stroberi 500 gram.",
            "Berat stroberi tambahan adalah 500 dikurangi 100.",
            "METODE LUAR · Perkiraan Berat: Bandingkan dengan benda acuan."
          ],
          "papan": [
            "Pertama: 100 g",
            "Kedua: 500 g",
            "500 − 100",
            "Tambahan: 400 g"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Pengukuran Berat dengan Satuan Baku dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa mengenal timbangan sebagai alat ukur berat (timbangan digital, timbangan duduk, timbangan kodok, dan timbangan bad….",
      "icon": "❓",
      "flowFrom": "Pahami soal",
      "flowTo": "Balance Scale"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Balance Scale",
      "stepDesc": "Bandingkan berat dengan anak timbangan. Pada Pengukuran Berat dengan Satuan Baku, langkah “Balance Scale” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Neraca: Bandingkan berat dengan anak timbangan. Satuan Berat Baku: Gram dan kilogram. Perkiraan Berat: Bandingkan dengan benda acuan.. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🧭",
      "flowFrom": "Balance Scale",
      "flowTo": "Standard Mass Units"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Standard Mass Units",
      "stepDesc": "Gram dan kilogram. Pada Pengukuran Berat dengan Satuan Baku, langkah “Standard Mass Units” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Neraca: Bandingkan berat dengan anak timbangan. Satuan Berat Baku: Gram dan kilogram. Perkiraan Berat: Bandingkan dengan benda acuan.. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🛠️",
      "flowFrom": "Standard Mass Units",
      "flowTo": "Estimate Mass"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Estimate Mass",
      "stepDesc": "Bandingkan dengan benda acuan. Pada Pengukuran Berat dengan Satuan Baku, langkah “Estimate Mass” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Neraca: Bandingkan berat dengan anak timbangan. Satuan Berat Baku: Gram dan kilogram. Perkiraan Berat: Bandingkan dengan benda acuan.. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "✨",
      "flowFrom": "Estimate Mass",
      "flowTo": "Kerjakan"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Kerjakan",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Pengukuran Berat dengan Satuan Baku. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "✏️",
      "flowFrom": "Kerjakan",
      "flowTo": "Cek masuk akal"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek masuk akal",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Pengukuran Berat dengan Satuan Baku. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Cek masuk akal",
      "flowTo": "Simpulkan"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Simpulkan",
      "stepDesc": "Simpulkan ide utama Pengukuran Berat dengan Satuan Baku dengan kalimatmu sendiri. Sebutkan cara yang kamu pakai dan mengapa cara itu membantu. Jelaskan kepada teman seolah-olah kamu guru kecil. Simpulan yang jelas menandakan konsepnya sudah dipahami.",
      "icon": "💬",
      "flowFrom": "Simpulkan",
      "flowTo": "Main"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Main",
      "stepDesc": "Latih lagi di tahap Concrete, Picture, lalu Abstract untuk Pengukuran Berat dengan Satuan Baku. Mulai dari benda nyata, lanjut ke diagram, baru ke lambang angka. Ulangi sampai kamu bisa menjelaskan tanpa melihat contoh. Bermain sambil berlatih membuat konsepnya melekat lebih lama.",
      "icon": "🎮",
      "flowFrom": "Main",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Berat Benda",
      "emoji": "🏋️",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Berat menunjukkan seberapa berat atau ringan sebuah benda. Benda ditimbang dengan timbangan."
    },
    {
      "judul": "Timbangan",
      "emoji": "⚖️",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Timbangan adalah alat ukur berat. Ada timbangan digital, timbangan duduk, dan timbangan kodok."
    },
    {
      "judul": "Satuan Baku Berat",
      "emoji": "📐",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Satuan baku berat adalah gram dan kilogram. Gram ditulis g dan kilogram ditulis kg."
    },
    {
      "judul": "Gram",
      "emoji": "🥚",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Gram dipakai untuk benda yang ringan, seperti tepung, gula pasir, pensil, dan buku."
    },
    {
      "judul": "Kilogram",
      "emoji": "🍉",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Kilogram dipakai untuk benda yang lebih berat, seperti berat badan, karung beras, dan buah."
    },
    {
      "judul": "Timbangan Digital",
      "emoji": "🔢",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Timbangan digital menampilkan berat benda sebagai angka pada layar. Baca angka itu dan tulis satuannya."
    },
    {
      "judul": "Timbangan Duduk",
      "emoji": "🕐",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Timbangan duduk memakai jarum. Angka yang ditunjuk jarum adalah berat benda dalam kilogram."
    },
    {
      "judul": "Mulai dari Nol",
      "emoji": "0️⃣",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Sebelum menimbang, jarum atau layar harus tepat di angka nol. Baru letakkan benda di atas timbangan."
    },
    {
      "judul": "Memilih Timbangan",
      "emoji": "✅",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Benda ringan memakai timbangan digital. Berat badan memakai timbangan badan. Buah yang berat memakai timbangan duduk."
    },
    {
      "judul": "Cara Menimbang",
      "emoji": "📝",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Empat langkah. Satu, pastikan angka awal nol. Dua, letakkan benda. Tiga, baca angkanya. Empat, tulis hasilnya dengan satuan."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "read-digital",
      "title": "Baca Timbangan Digital",
      "bookReference": "hlm. 124–125 dan 133 (Aktivitas 2 dan Ayo Berlatih 1)",
      "objective": "Pakai Neraca: Bandingkan berat dengan anak timbangan. Latihan: Membaca berat benda pada layar timbangan digital dalam gram..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Benda ditampilkan di atas timbangan digital. Siswa membaca angka pada layar lalu memilih satu dari tiga berat. Saat bermain, ingat Neraca: Bandingkan berat dengan anak timbangan.",
      "voiceGuide": "Neraca. Bandingkan berat dengan anak timbangan.",
      "emoji": "⚖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ready-scale",
      "title": "Timbangan yang Siap",
      "bookReference": "hlm. 133 (Buku Panduan Guru: menimbang harus dimulai dari angka 0)",
      "objective": "Pakai Neraca: Bandingkan berat dengan anak timbangan. Latihan: Menemukan timbangan yang jarumnya tepat di angka 0 sebelum menimbang..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga timbangan duduk dan satu perintah. Siswa mengetuk timbangan yang jarumnya tepat di angka 0. Saat bermain, ingat Neraca: Bandingkan berat dengan anak timbangan.",
      "voiceGuide": "Neraca. Bandingkan berat dengan anak timbangan.",
      "emoji": "0️⃣",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "read-dial",
      "title": "Baca Timbangan Jarum",
      "bookReference": "hlm. 125–126 (timbangan duduk untuk buah)",
      "objective": "Pakai Neraca: Bandingkan berat dengan anak timbangan. Latihan: Membaca berat buah pada timbangan duduk dari angka yang ditunjuk jarum..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Buah ditampilkan di atas timbangan duduk. Siswa membaca angka yang ditunjuk jarum, lalu memilih satu dari tiga berat. Saat bermain, ingat Neraca: Bandingkan berat dengan anak timbangan.",
      "voiceGuide": "Neraca. Bandingkan berat dengan anak timbangan.",
      "emoji": "🍉",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "choose-scale",
      "title": "Pilih Timbangan",
      "bookReference": "hlm. 130–131 (timbangan yang tepat untuk sayuran dan buah)",
      "objective": "Pakai Neraca: Bandingkan berat dengan anak timbangan. Latihan: Memilih timbangan yang tepat untuk menimbang suatu benda..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua benda. Siswa memilih satu dari tiga timbangan: digital, duduk, atau badan. Saat bermain, ingat Neraca: Bandingkan berat dengan anak timbangan.",
      "voiceGuide": "Neraca. Bandingkan berat dengan anak timbangan.",
      "emoji": "🛒",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "match-object-scale",
      "title": "Jodohkan Benda dan Timbangan",
      "bookReference": "hlm. 126–127 (menghubungkan penjual dan alat ukur)",
      "objective": "Menjodohkan benda dengan timbangan yang tepat untuk menimbangnya.. Ingat Neraca. (Neraca)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga benda dan tiga timbangan. Siswa mengetuk benda, lalu mengetuk timbangan yang cocok. Gunakan Neraca.",
      "voiceGuide": "Neraca. Mainkan dengan teliti.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "memory-scale-weight",
      "title": "Memori Timbangan dan Berat",
      "bookReference": "hlm. 133 (berat bahan kue pada timbangan digital)",
      "objective": "Mencocokkan timbangan digital dengan berat yang ditunjukkan layarnya lewat permainan memori.. Ingat Neraca. (Neraca)",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. Gunakan Neraca.",
      "voiceGuide": "Neraca. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-scale-weight",
      "title": "Ketuk Timbangan dengan Berat",
      "bookReference": "hlm. 133 (gula, tepung, dan telur)",
      "objective": "Menemukan timbangan yang menunjukkan berat yang diminta.. Ingat Neraca. (Neraca)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga timbangan dan dua pertanyaan. Siswa mengetuk timbangan yang beratnya sama dengan bilangan yang disebut. Gunakan Neraca.",
      "voiceGuide": "Neraca. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-unit",
      "title": "Ketuk Semua yang Memakai Satuan Tertentu",
      "bookReference": "hlm. 125 (gram untuk benda ringan, kilogram untuk benda berat)",
      "objective": "Menemukan semua benda yang ditimbang dengan satuan gram atau kilogram.. Ingat Neraca. (Neraca)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat benda dan satu perintah. Siswa mengetuk semua benda yang cocok dengan satuan yang disebut, lalu menekan Periksa. Gunakan Neraca.",
      "voiceGuide": "Neraca. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "board-grams",
      "title": "Papan Berat dalam Gram",
      "bookReference": "hlm. 133 (Ayo Berlatih 1)",
      "objective": "Menulis berat pada timbangan digital dengan angka ratusan, puluhan, dan satuan.. Ingat Neraca. (Neraca)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca layar timbangan, lalu mengatur angka ratusan, puluhan, dan satuan pada papan dan menekan Periksa. Gunakan Neraca.",
      "voiceGuide": "Neraca. Mainkan dengan teliti.",
      "emoji": "🗂️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-weight",
      "title": "Urutkan Benda menurut Berat",
      "bookReference": "hlm. 134 (Ayo Berlatih 2: berat teringan dan terberat)",
      "objective": "Mengurutkan tiga benda menurut berat pada timbangan digital.. Ingat Neraca. (Neraca)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga timbangan bertanda huruf. Siswa mengetuk timbangan satu per satu dari yang teringan atau terberat. Gunakan Neraca.",
      "voiceGuide": "Neraca. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 9
    },
    {
      "stage": "Picture",
      "gameType": "read-dial-kg",
      "title": "Baca Jarum dalam Kilogram",
      "bookReference": "hlm. 125–126 (timbangan duduk)",
      "objective": "Pakai Satuan Berat Baku: Gram dan kilogram. Latihan: Membaca berat dalam kilogram dari jarum yang tepat di satu angka..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Jarum timbangan polos ditampilkan. Siswa memilih satu dari tiga berat dalam kilogram. Saat bermain, ingat Satuan Berat Baku: Gram dan kilogram.",
      "voiceGuide": "Satuan Berat Baku. Gram dan kilogram.",
      "diagramType": "dial-read",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "read-lcd",
      "title": "Baca Layar Timbangan",
      "bookReference": "hlm. 133 (angka pada layar timbangan digital)",
      "objective": "Pakai Satuan Berat Baku: Gram dan kilogram. Latihan: Membaca berat dalam gram dari layar timbangan polos..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Layar timbangan ditampilkan. Siswa memilih satu dari tiga berat dalam gram. Saat bermain, ingat Satuan Berat Baku: Gram dan kilogram.",
      "voiceGuide": "Satuan Berat Baku. Gram dan kilogram.",
      "diagramType": "lcd-read",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-dial-weight",
      "title": "Jodohkan Jarum dan Berat",
      "bookReference": "hlm. 125–126 (membaca timbangan duduk)",
      "objective": "Pakai Satuan Berat Baku: Gram dan kilogram. Latihan: Menjodohkan jarum timbangan dengan berat dalam kilogram..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga jarum dan tiga berat. Siswa mengetuk jarum, lalu mengetuk berat yang cocok. Saat bermain, ingat Satuan Berat Baku: Gram dan kilogram.",
      "voiceGuide": "Satuan Berat Baku. Gram dan kilogram.",
      "diagramType": "dial-match",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memory-lcd-weight",
      "title": "Memori Layar dan Berat",
      "bookReference": "hlm. 133 (angka pada layar timbangan digital)",
      "objective": "Pakai Satuan Berat Baku: Gram dan kilogram. Latihan: Mencocokkan layar timbangan dengan beratnya lewat permainan memori..",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. Saat bermain, ingat Satuan Berat Baku: Gram dan kilogram.",
      "voiceGuide": "Satuan Berat Baku. Gram dan kilogram.",
      "diagramType": "lcd-memory",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-ready",
      "title": "Ketuk Semua Jarum yang Siap",
      "bookReference": "hlm. 133 (Buku Panduan Guru: mulai dari angka 0)",
      "objective": "Menemukan semua timbangan yang jarumnya sudah tepat di angka 0.. Ingat Satuan Berat Baku. (Satuan Berat Baku)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat jarum dan satu perintah. Siswa mengetuk semua jarum di angka 0, lalu menekan Periksa. Gunakan Satuan Berat Baku.",
      "voiceGuide": "Satuan Berat Baku. Mainkan dengan teliti.",
      "diagramType": "dial-select",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-unit-weight",
      "title": "Pilah Berat: Gram atau Kilogram",
      "bookReference": "hlm. 125 (gram untuk benda ringan, kilogram untuk benda berat)",
      "objective": "Memilah nama benda menjadi yang ditimbang dengan gram dan yang ditimbang dengan kilogram.. Ingat Satuan Berat Baku. (Satuan Berat Baku)",
      "mechanicDescription": "Tiga ronde, tiap ronde enam nama benda dan dua kotak. Siswa menyeret atau mengetuk nama benda ke kotak yang tepat. Gunakan Satuan Berat Baku.",
      "voiceGuide": "Satuan Berat Baku. Mainkan dengan teliti.",
      "diagramType": "unit-sort",
      "numberA": 3,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-lcd-compare",
      "title": "Ketuk Semua Layar Lebih atau Kurang",
      "bookReference": "hlm. 129 (membandingkan berat dua timbangan)",
      "objective": "Menemukan semua layar yang menunjukkan berat lebih atau kurang dari bilangan acuan.. Ingat Satuan Berat Baku. (Satuan Berat Baku)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat layar dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. Gunakan Satuan Berat Baku.",
      "voiceGuide": "Satuan Berat Baku. Mainkan dengan teliti.",
      "diagramType": "lcd-select",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "order-weigh-steps",
      "title": "Urutkan Langkah Menimbang",
      "bookReference": "hlm. 124 (Aktivitas 2: cara menimbang)",
      "objective": "Mengurutkan langkah menimbang dengan timbangan digital, timbangan duduk, dan timbangan badan.. Ingat Satuan Berat Baku. (Satuan Berat Baku)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat langkah. Siswa mengetuk langkah satu per satu menurut urutan yang benar. Letak jawaban berpindah. Gunakan Satuan Berat Baku.",
      "voiceGuide": "Satuan Berat Baku. Mainkan dengan teliti.",
      "diagramType": "steps-order",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "board-lcd",
      "title": "Papan dari Layar",
      "bookReference": "hlm. 133 (Ayo Berlatih 1)",
      "objective": "Menulis berat pada layar timbangan dengan angka ratusan, puluhan, dan satuan.. Ingat Satuan Berat Baku. (Satuan Berat Baku)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca layar, lalu mengatur angka ratusan, puluhan, dan satuan pada papan dan menekan Periksa. Gunakan Satuan Berat Baku.",
      "voiceGuide": "Satuan Berat Baku. Mainkan dengan teliti.",
      "diagramType": "lcd-board",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "difference-lcd",
      "title": "Selisih Dua Layar",
      "bookReference": "hlm. 129 (Ayo Berlatih 2: berat stroberi tambahan)",
      "objective": "Menghitung selisih berat dari dua layar timbangan.. Ingat Satuan Berat Baku. (Satuan Berat Baku)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Dua layar ditampilkan. Siswa memilih satu dari tiga selisih berat dalam gram. Gunakan Satuan Berat Baku.",
      "voiceGuide": "Satuan Berat Baku. Mainkan dengan teliti.",
      "diagramType": "lcd-compare",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "choose-unit-weight",
      "title": "Pilih Satuan Berat",
      "bookReference": "hlm. 125 dan 128–129 (satuan baku berat)",
      "objective": "Pakai Perkiraan Berat: Bandingkan dengan benda acuan. Latihan: Memilih satuan baku yang tepat untuk berat suatu benda..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca benda yang ditimbang, lalu memilih satu dari tiga satuan. Saat bermain, ingat Perkiraan Berat: Bandingkan dengan benda acuan.",
      "voiceGuide": "Perkiraan Berat. Bandingkan dengan benda acuan.",
      "symbolLarge": "g kg",
      "wordLarge": "SATUAN",
      "mathNotation": "gram • kilogram"
    },
    {
      "stage": "Abstract",
      "gameType": "scale-text",
      "title": "Timbangan yang Tepat",
      "bookReference": "hlm. 126–131 (memilih timbangan)",
      "objective": "Pakai Perkiraan Berat: Bandingkan dengan benda acuan. Latihan: Memilih timbangan yang tepat untuk menimbang suatu benda..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca benda yang ditimbang, lalu memilih satu dari tiga alat ukur. Saat bermain, ingat Perkiraan Berat: Bandingkan dengan benda acuan.",
      "voiceGuide": "Perkiraan Berat. Bandingkan dengan benda acuan.",
      "symbolLarge": "⚖️",
      "wordLarge": "TIMBANGAN",
      "mathNotation": "digital • duduk • badan"
    },
    {
      "stage": "Abstract",
      "gameType": "complete-weight-sentence",
      "title": "Lengkapi Kalimat Pengukuran Berat",
      "bookReference": "hlm. 124–129 (alat ukur, satuan baku, dan cara menimbang)",
      "objective": "Pakai Perkiraan Berat: Bandingkan dengan benda acuan. Latihan: Melengkapi kalimat tentang alat ukur berat, satuan baku, dan cara menimbang..",
      "mechanicDescription": "Tiga soal, tiap soal tiga kalimat, misalnya satuan baku berat adalah gram dan ... Siswa memilih satu dari tiga kata. Saat bermain, ingat Perkiraan Berat: Bandingkan dengan benda acuan.",
      "voiceGuide": "Perkiraan Berat. Bandingkan dengan benda acuan.",
      "symbolLarge": "…",
      "wordLarge": "LENGKAPI",
      "mathNotation": "alat • satuan • cara"
    },
    {
      "stage": "Abstract",
      "gameType": "match-scale-text",
      "title": "Jodohkan Berat dan Timbangan",
      "bookReference": "hlm. 126–127 dan 131–132 (benda dan timbangannya)",
      "objective": "Pakai Perkiraan Berat: Bandingkan dengan benda acuan. Latihan: Menjodohkan benda yang ditimbang dengan timbangan yang tepat..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga benda dan tiga timbangan. Siswa mengetuk benda, lalu mengetuk timbangan yang cocok. Saat bermain, ingat Perkiraan Berat: Bandingkan dengan benda acuan.",
      "voiceGuide": "Perkiraan Berat. Bandingkan dengan benda acuan.",
      "symbolLarge": "= ?",
      "wordLarge": "JODOHKAN",
      "mathNotation": "benda • timbangan"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-weight-size",
      "title": "Memori Benda dan Berat Wajar",
      "bookReference": "hlm. 125 dan 128 (perkiraan berat benda)",
      "objective": "Mencocokkan benda dengan berat yang wajar lewat permainan memori.. Ingat Perkiraan Berat. (Perkiraan Berat)",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): benda dan beratnya. Siswa membalik dua kartu dan mencari pasangannya. Gunakan Perkiraan Berat.",
      "voiceGuide": "Perkiraan Berat. Mainkan dengan teliti.",
      "symbolLarge": "kg",
      "wordLarge": "MEMORI",
      "mathNotation": "benda • berat"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-weight",
      "title": "Benar atau Salah: Pengukuran Berat",
      "bookReference": "hlm. 124–129 (timbangan dan satuan baku berat)",
      "objective": "Menilai pernyataan tentang timbangan, satuan baku, dan cara menimbang.. Ingat Perkiraan Berat. (Perkiraan Berat)",
      "mechanicDescription": "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Tiap jawaban diberi penjelasan. Gunakan Perkiraan Berat.",
      "voiceGuide": "Perkiraan Berat. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "periksa dengan alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-weight",
      "title": "Detektif Pengukuran Berat",
      "bookReference": "hlm. 129 dan 133 (membaca dan menghitung berat)",
      "objective": "Menemukan bilangan berat dari dua petunjuk.. Ingat Perkiraan Berat. (Perkiraan Berat)",
      "mechanicDescription": "Empat soal. Siswa membaca petunjuk tentang berat dan satu ciri bilangan, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok. Gunakan Perkiraan Berat.",
      "voiceGuide": "Perkiraan Berat. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "dua petunjuk, satu jawaban"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-map-weight",
      "title": "Peta Konsep Pengukuran Berat",
      "bookReference": "hlm. 104 (peta konsep Bab 3)",
      "objective": "Melengkapi peta konsep alat ukur berat dan cara menimbang.. Ingat Perkiraan Berat. (Perkiraan Berat)",
      "mechanicDescription": "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. Gunakan Perkiraan Berat.",
      "voiceGuide": "Perkiraan Berat. Mainkan dengan teliti.",
      "symbolLarge": "⇄",
      "wordLarge": "PETA KONSEP",
      "mathNotation": "alat • satuan • cara"
    },
    {
      "stage": "Abstract",
      "gameType": "story-weight",
      "title": "Soal Cerita Berat",
      "bookReference": "hlm. 129 dan 133 (bahan kue dan stroberi)",
      "objective": "Menyelesaikan soal cerita yang menjumlahkan atau mengurangkan berat dalam gram.. Ingat Perkiraan Berat. (Perkiraan Berat)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita lalu memilih satu dari tiga hasil dalam gram. Gunakan Perkiraan Berat.",
      "voiceGuide": "Perkiraan Berat. Mainkan dengan teliti.",
      "symbolLarge": "g",
      "wordLarge": "CERITA",
      "mathNotation": "jumlah • selisih"
    },
    {
      "stage": "Abstract",
      "gameType": "sentence-weight",
      "title": "Susun Kata Pengukuran Berat",
      "bookReference": "hlm. 124–129 (pengukuran berat)",
      "objective": "Menyusun kalimat tentang pengukuran berat dari kartu kata.. Ingat Perkiraan Berat. (Perkiraan Berat)",
      "mechanicDescription": "Empat kalimat. Siswa mengetuk kartu kata satu per satu menurut urutan kalimat yang benar. Ada satu kartu pengecoh. Gunakan Perkiraan Berat.",
      "voiceGuide": "Perkiraan Berat. Mainkan dengan teliti.",
      "symbolLarge": "…",
      "wordLarge": "SUSUN KATA",
      "mathNotation": "kalimat pengukuran berat"
    }
  ],
  "poin": [
    {
      "ikon": "⚖️",
      "nama": "Timbangan",
      "isi": "alat ukur berat",
      "suara": "Timbangan adalah alat untuk mengukur berat benda."
    },
    {
      "ikon": "🌍",
      "nama": "Neraca",
      "isi": "Bandingkan berat dengan anak timbangan.",
      "suara": "Neraca. Bandingkan berat dengan anak timbangan."
    },
    {
      "ikon": "🌍",
      "nama": "Satuan Berat Baku",
      "isi": "Gram dan kilogram.",
      "suara": "Satuan Berat Baku. Gram dan kilogram."
    },
    {
      "ikon": "🌍",
      "nama": "Perkiraan Berat",
      "isi": "Bandingkan dengan benda acuan.",
      "suara": "Perkiraan Berat. Bandingkan dengan benda acuan."
    }
  ],
  "poinSuara": "Ingat: Neraca, Satuan Berat Baku, Perkiraan Berat.",
  "cara": {
    "suara": "Cara menimbang. Pastikan angka awal nol. Letakkan benda di atas timbangan. Baca angka pada jarum atau layar. Lalu tulis hasilnya dengan satuan.",
    "potongan": [
      {
        "teks": "angka awal nol",
        "warna": "#BAE6FD"
      },
      {
        "teks": "letakkan benda",
        "warna": "#FECACA"
      },
      {
        "teks": "baca angkanya",
        "warna": "#BFDBFE"
      },
      {
        "teks": "tulis satuan",
        "warna": "#FDE68A"
      }
    ]
  },
  "rumah": "Ayo Mencoba: terapkan Neraca pada satu soal nyata di rumah.",
  "refleksi": [
    "Bagaimana Neraca membantumu?",
    "Kapan memakai Satuan Berat Baku?",
    "Apa bedanya dengan hanya menghafal tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Balance Scale",
      "namaId": "Neraca",
      "asal": "Mass measurement",
      "ringkas": "Bandingkan berat dengan anak timbangan.",
      "tahap": [
        "Story",
        "Concrete"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Standard Mass Units",
      "namaId": "Satuan Berat Baku",
      "asal": "SI mass",
      "ringkas": "Gram dan kilogram.",
      "tahap": [
        "Picture",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Estimate Mass",
      "namaId": "Perkiraan Berat",
      "asal": "Measurement sense",
      "ringkas": "Bandingkan dengan benda acuan.",
      "tahap": [
        "Mind",
        "Infografis"
      ]
    }
  ]
};

export const SUB_D33: SubBabNaskah = {
  "id": "D",
  "codeTitle": "Sub-Bab D (Hubungan Antarsatuan Baku Berat)",
  "fullTitle": "Sub-Bab D: Hubungan Antarsatuan Baku Berat",
  "targetDescription": "Siswa mengenal timbangan kodok dan bandul (1/2 ons, 1 ons, 2 ons, 1/2 kg, 1 kg), memahami 1 kg = 1.000 g = 10 ons dan 1 ons = 100 g, mengubah kilogram ke gram dengan mengalikan 1.000 dan gram ke kilogram dengan membagi 1.000 (misalnya 1.753 g = 1 kg 753 g), serta menjumlahkan dan mengurangkan berat pada soal cerita. Siswa memakai cara Konversi Berat, Satuan Campuran, Tabel Konversi Berat. Siswa memakai cara Konversi Berat, Satuan Campuran, Tabel Konversi Berat.",
  "secondaryBg": "#FEF3C7",
  "secondaryBorder": "#D97706",
  "secondaryText": "#78350F",
  "silabus": {
    "teksSuara": "Kita belajar hubungan antarsatuan baku berat. Pedagang di pasar memakai timbangan kodok dengan bandul. Satu kilogram sama dengan seribu gram dan sama dengan sepuluh ons. Satu ons sama dengan seratus gram. Kita belajar mengubah kilogram ke gram dan gram ke kilogram, serta menjumlahkan dan mengurangkan berat. Kita memakai cara: Konversi Berat, Satuan Campuran, Tabel Konversi Berat. 1 kg = 1000 g. 1 kg 200 g = 1200 g. Pakai tabel g–kg. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menyelesaikan masalah yang berkaitan dengan panjang dan berat benda dengan satuan baku. Pada sub-bab ini siswa menghubungkan kilogram, ons, dan gram serta menghitung berat gabungan.",
    "referensi": "Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 3 Sub-Bab D)."
  },
  "videos": [
    {
      "id": "K3B3D-V1",
      "judul": "Timbangan Kodok",
      "subjudul": "Mass Conversion",
      "adegan": [
        {
          "id": "K3B3D-V1-1",
          "judul": "Di pasar",
          "ketukan": [
            "Bayangkan kamu sedang mempelajari Hubungan Antarsatuan Baku Berat. Pedagang di pasar menimbang dagangannya dengan timbangan kodok.",
            "Timbangan kodok dilengkapi bandul sebagai ukuran berat.",
            "Bandul diletakkan di sisi yang lain dari timbangan.",
            "Ingat cara Konversi Berat: 1 kg = 1000 g. Ingat cara Konversi Berat: 1 kg = 1000 g."
          ],
          "papan": [
            "Pedagang di pasar",
            "Timbangan kodok",
            "Bandul = ukuran berat",
            "Berapa jenis bandul?"
          ]
        },
        {
          "id": "K3B3D-V1-2",
          "judul": "Jenis bandul",
          "ketukan": [
            "Jenis bandul pada timbangan kodok ada lima.",
            "Yaitu setengah ons, satu ons, dan dua ons.",
            "Lalu ada bandul setengah kilogram dan satu kilogram.",
            "Di sini kita memakai ide Mass Conversion — 1 kg = 1000 g. Di sini kita memakai Mass Conversion. 1 kg = 1000 g."
          ],
          "papan": [
            "Ada lima jenis bandul",
            "1/2 ons, 1 ons, 2 ons",
            "1/2 kg dan 1 kg",
            "Jumlahkan bandulnya"
          ]
        },
        {
          "id": "K3B3D-V1-3",
          "judul": "Telur dua timbangan",
          "ketukan": [
            "Berat telur pada timbangan kodok adalah 1 kilogram.",
            "Berat telur yang sama pada timbangan digital 1.000 gram.",
            "Jumlah telurnya sama, jadi beratnya sama.",
            "METODE LUAR · Konversi Berat: 1 kg = 1000 g."
          ],
          "papan": [
            "Kodok: 1 kg",
            "Digital: 1.000 g",
            "Berat telur sama",
            "1 kg = 1.000 g"
          ]
        }
      ]
    },
    {
      "id": "K3B3D-V2",
      "judul": "Latihan: Satuan Campuran",
      "subjudul": "Mixed Units",
      "adegan": [
        {
          "id": "K3B3D-V2-1",
          "judul": "Kilogram dan ons",
          "ketukan": [
            "Satu kilogram sama dengan sepuluh ons.",
            "Karena itu bandul satu kilogram sama dengan sepuluh bandul satu ons.",
            "Setengah kilogram sama dengan lima ons.",
            "Ingat cara Satuan Campuran: 1 kg 200 g = 1200 g. Ingat cara Satuan Campuran: 1 kg 200 g = 1200 g."
          ],
          "papan": [
            "1 kg = 10 ons",
            "1 kg = 10 bandul 1 ons",
            "1/2 kg = 5 ons",
            "Ons di timbangan kodok"
          ]
        },
        {
          "id": "K3B3D-V2-2",
          "judul": "Ons dan gram",
          "ketukan": [
            "Satu ons sama dengan seratus gram.",
            "Dua ons sama dengan dua ratus gram.",
            "Setengah ons sama dengan lima puluh gram.",
            "Di sini kita memakai ide Mixed Units — 1 kg 200 g = 1200 g. Di sini kita memakai Mixed Units. 1 kg 200 g = 1200 g."
          ],
          "papan": [
            "1 ons = 100 g",
            "2 ons = 200 g",
            "1/2 ons = 50 g",
            "10 ons = 1.000 g"
          ]
        },
        {
          "id": "K3B3D-V2-3",
          "judul": "Kilogram ke gram",
          "ketukan": [
            "Untuk mengubah kilogram ke gram, kalikan dengan 1.000.",
            "Misalnya 3 kg sama dengan 3 × 1.000 gram.",
            "Hasilnya adalah 3.000 gram.",
            "METODE LUAR · Satuan Campuran: 1 kg 200 g = 1200 g."
          ],
          "papan": [
            "kg ke g: kali 1.000",
            "3 kg = 3 × 1.000 g",
            "= 3.000 g",
            "20 kg = 20.000 g"
          ]
        }
      ]
    },
    {
      "id": "K3B3D-V3",
      "judul": "Siap pakai Conversion Table Mass",
      "subjudul": "Conversion Table Mass",
      "adegan": [
        {
          "id": "K3B3D-V3-1",
          "judul": "Tepung Meutia",
          "ketukan": [
            "Meutia membantu ibu menimbang tepung untuk membuat kue.",
            "Timbangan digital menunjukkan 1.753 gram.",
            "Kita ubah menjadi kilogram dan gram.",
            "Ingat cara Tabel Konversi Berat: Pakai tabel g–kg. Ingat cara Tabel Konversi Berat: Pakai tabel g–kg."
          ],
          "papan": [
            "Meutia menimbang tepung",
            "Layar: 1.753 g",
            "Ubah ke kg dan g",
            "1.000 g = 1 kg"
          ]
        },
        {
          "id": "K3B3D-V3-2",
          "judul": "Pecah gramnya",
          "ketukan": [
            "1.753 gram sama dengan 1.000 gram ditambah 753 gram.",
            "1.000 gram sama dengan 1 kilogram.",
            "Jadi 1.753 gram sama dengan 1 kg 753 gram.",
            "Di sini kita memakai ide Conversion Table Mass — Pakai tabel g–kg. Di sini kita memakai Conversion Table Mass. Pakai tabel g–kg."
          ],
          "papan": [
            "1.753 = 1.000 + 753",
            "1.000 g = 1 kg",
            "1.753 g = 1 kg 753 g",
            "Tepung: 1 kg 753 g"
          ]
        },
        {
          "id": "K3B3D-V3-3",
          "judul": "Mangga dan jeruk",
          "ketukan": [
            "Meutia memanen mangga 8.000 gram dan menjual 4 kilogram.",
            "8.000 gram sama dengan 8 kilogram.",
            "Sisa mangga adalah 8 dikurangi 4, yaitu 4 kilogram.",
            "METODE LUAR · Tabel Konversi Berat: Pakai tabel g–kg."
          ],
          "papan": [
            "Mangga 8.000 g",
            "8.000 g = 8 kg",
            "8 − 4 = 4 kg",
            "500 g + 500 g = 1 kg"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Hubungan Antarsatuan Baku Berat dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa mengenal timbangan kodok dan bandul (1/2 ons, 1 ons, 2 ons, 1/2 kg, 1 kg), memahami 1 kg = 1.000 g = 10 ons dan 1 ….",
      "icon": "❓",
      "flowFrom": "Pahami soal",
      "flowTo": "Mass Conversion"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Mass Conversion",
      "stepDesc": "1 kg = 1000 g. Pada Hubungan Antarsatuan Baku Berat, langkah “Mass Conversion” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Konversi Berat: 1 kg = 1000 g. Satuan Campuran: 1 kg 200 g = 1200 g. Tabel Konversi Berat: Pakai tabel g–kg.. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🧭",
      "flowFrom": "Mass Conversion",
      "flowTo": "Mixed Units"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Mixed Units",
      "stepDesc": "1 kg 200 g = 1200 g. Pada Hubungan Antarsatuan Baku Berat, langkah “Mixed Units” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Konversi Berat: 1 kg = 1000 g. Satuan Campuran: 1 kg 200 g = 1200 g. Tabel Konversi Berat: Pakai tabel g–kg.. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🛠️",
      "flowFrom": "Mixed Units",
      "flowTo": "Conversion Table Mass"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Conversion Table Mass",
      "stepDesc": "Pakai tabel g–kg. Pada Hubungan Antarsatuan Baku Berat, langkah “Conversion Table Mass” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Ingat metode yang dianyam di sini: Konversi Berat: 1 kg = 1000 g. Satuan Campuran: 1 kg 200 g = 1200 g. Tabel Konversi Berat: Pakai tabel g–kg.. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "✨",
      "flowFrom": "Conversion Table Mass",
      "flowTo": "Kerjakan"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Kerjakan",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Hubungan Antarsatuan Baku Berat. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "✏️",
      "flowFrom": "Kerjakan",
      "flowTo": "Cek masuk akal"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek masuk akal",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Hubungan Antarsatuan Baku Berat. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Cek masuk akal",
      "flowTo": "Simpulkan"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Simpulkan",
      "stepDesc": "Simpulkan ide utama Hubungan Antarsatuan Baku Berat dengan kalimatmu sendiri. Sebutkan cara yang kamu pakai dan mengapa cara itu membantu. Jelaskan kepada teman seolah-olah kamu guru kecil. Simpulan yang jelas menandakan konsepnya sudah dipahami.",
      "icon": "💬",
      "flowFrom": "Simpulkan",
      "flowTo": "Main"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Main",
      "stepDesc": "Latih lagi di tahap Concrete, Picture, lalu Abstract untuk Hubungan Antarsatuan Baku Berat. Mulai dari benda nyata, lanjut ke diagram, baru ke lambang angka. Ulangi sampai kamu bisa menjelaskan tanpa melihat contoh. Bermain sambil berlatih membuat konsepnya melekat lebih lama.",
      "icon": "🎮",
      "flowFrom": "Main",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Timbangan Kodok",
      "emoji": "🛒",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Timbangan kodok dipakai pedagang di pasar. Ukuran beratnya memakai bandul."
    },
    {
      "judul": "Jenis Bandul",
      "emoji": "🏋️",
      "countNum": 5,
      "countWord": "Lima",
      "suara": "Ada lima jenis bandul: setengah ons, satu ons, dua ons, setengah kilogram, dan satu kilogram."
    },
    {
      "judul": "1 kg = 1.000 g",
      "emoji": "⚖️",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Satu kilogram sama dengan seribu gram. Dua kilogram sama dengan dua ribu gram."
    },
    {
      "judul": "1 kg = 10 ons",
      "emoji": "🔟",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Satu kilogram sama dengan sepuluh ons. Setengah kilogram sama dengan lima ons."
    },
    {
      "judul": "1 ons = 100 g",
      "emoji": "💯",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Satu ons sama dengan seratus gram. Tiga ons sama dengan tiga ratus gram."
    },
    {
      "judul": "Kilogram ke Gram",
      "emoji": "✖️",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Untuk mengubah kilogram ke gram, kalikan dengan seribu. Tiga kilogram sama dengan tiga ribu gram."
    },
    {
      "judul": "Gram ke Kilogram",
      "emoji": "➗",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Untuk mengubah gram ke kilogram, bagi dengan seribu. Tiga ribu gram sama dengan tiga kilogram."
    },
    {
      "judul": "1.753 gram",
      "emoji": "🔍",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Seribu tujuh ratus lima puluh tiga gram sama dengan seribu gram ditambah tujuh ratus lima puluh tiga gram, yaitu satu kilogram tujuh ratus lima puluh tiga gram."
    },
    {
      "judul": "Garis Berat",
      "emoji": "📈",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Pada garis berat, tiap seribu gram ditandai satu kilogram. Batang yang sampai angka dua kilogram beratnya dua ribu gram."
    },
    {
      "judul": "Cara Mengubah",
      "emoji": "📝",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Empat langkah. Satu, ingat satu kilogram sama dengan seribu gram. Dua, kilogram ke gram kalikan seribu. Tiga, gram ke kilogram bagi seribu. Empat, periksa dengan cara sebaliknya."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "build-bandul",
      "title": "Rakit Berat dengan Bandul",
      "bookReference": "hlm. 135–136 (jenis bandul timbangan kodok)",
      "objective": "Pakai Konversi Berat: 1 kg = 1000 g. Latihan: Merakit berat yang diminta dari bandul 1/2 ons, 1 ons, 2 ons, 1/2 kg, dan 1 kg..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa membaca berat yang diminta, lalu menambah atau mengurangi bandul sampai layar menunjukkan berat itu. Banyak jalan yang benar. Saat bermain, ingat Konversi Berat: 1 kg = 1000 g.",
      "voiceGuide": "Konversi Berat. 1 kg = 1000 g.",
      "emoji": "🏋️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "count-bandul",
      "title": "Hitung Berat Bandul",
      "bookReference": "hlm. 135 (bandul timbangan kodok)",
      "objective": "Pakai Konversi Berat: 1 kg = 1000 g. Latihan: Menghitung berat sekumpulan bandul dalam gram..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Kumpulan bandul ditampilkan. Siswa memilih satu dari tiga berat. Pengecoh lebih atau kurang lima puluh gram. Saat bermain, ingat Konversi Berat: 1 kg = 1000 g.",
      "voiceGuide": "Konversi Berat. 1 kg = 1000 g.",
      "emoji": "🔢",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "kg-to-g-bandul",
      "title": "Ubah Kilogram ke Gram",
      "bookReference": "hlm. 136 dan 139 (1 kg = 1.000 g, Ayo Berlatih 1)",
      "objective": "Pakai Konversi Berat: 1 kg = 1000 g. Latihan: Mengubah kilogram ke gram dengan gambar bandul satu kilogram..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Bandul satu kilogram ditampilkan. Siswa memilih satu dari tiga hasil dalam gram. Pengecoh lupa mengalikan 1.000. Saat bermain, ingat Konversi Berat: 1 kg = 1000 g.",
      "voiceGuide": "Konversi Berat. 1 kg = 1000 g.",
      "emoji": "✖️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "g-to-kg-bandul",
      "title": "Ubah Gram ke Kilogram",
      "bookReference": "hlm. 137 dan 139 (mengubah gram ke kilogram)",
      "objective": "Pakai Konversi Berat: 1 kg = 1000 g. Latihan: Mengubah gram ke kilogram dengan gambar bandul satu kilogram..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Bandul satu kilogram ditampilkan. Siswa memilih satu dari tiga hasil dalam kilogram. Saat bermain, ingat Konversi Berat: 1 kg = 1000 g.",
      "voiceGuide": "Konversi Berat. 1 kg = 1000 g.",
      "emoji": "➗",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "match-bandul",
      "title": "Jodohkan Bandul dan Berat",
      "bookReference": "hlm. 135–136 (jumlah bandul yang digunakan)",
      "objective": "Menjodohkan kumpulan bandul dengan beratnya dalam gram.. Ingat Konversi Berat. (Konversi Berat)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga kumpulan bandul dan tiga berat. Siswa mengetuk kumpulan bandul, lalu mengetuk berat yang cocok. Gunakan Konversi Berat.",
      "voiceGuide": "Konversi Berat. Mainkan dengan teliti.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "memory-bandul",
      "title": "Memori Bandul dan Berat",
      "bookReference": "hlm. 135–136 (jumlah bandul yang digunakan)",
      "objective": "Mencocokkan kumpulan bandul dengan beratnya lewat permainan memori.. Ingat Konversi Berat. (Konversi Berat)",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. Gunakan Konversi Berat.",
      "voiceGuide": "Konversi Berat. Mainkan dengan teliti.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-bandul",
      "title": "Ketuk Bandul dengan Berat",
      "bookReference": "hlm. 135–136 (jumlah bandul yang digunakan)",
      "objective": "Menemukan kumpulan bandul yang beratnya sama dengan bilangan yang diminta.. Ingat Konversi Berat. (Konversi Berat)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga kumpulan bandul dan dua pertanyaan. Siswa mengetuk kumpulan yang beratnya sama dengan bilangan yang disebut. Gunakan Konversi Berat.",
      "voiceGuide": "Konversi Berat. Mainkan dengan teliti.",
      "emoji": "👆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-same-weight",
      "title": "Ketuk Semua yang Sama Berat",
      "bookReference": "hlm. 136 (1 kg = 10 ons = 1.000 g)",
      "objective": "Menemukan semua kumpulan bandul yang beratnya sama dengan berat acuan.. Ingat Konversi Berat. (Konversi Berat)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat kumpulan bandul dan satu perintah. Siswa mengetuk semua yang sama beratnya dengan acuan, lalu menekan Periksa. Gunakan Konversi Berat.",
      "voiceGuide": "Konversi Berat. Mainkan dengan teliti.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "ons-to-gram",
      "title": "Ubah Ons ke Gram",
      "bookReference": "hlm. 136 (1 ons = 100 g)",
      "objective": "Mengubah ons ke gram pada papan ratusan, puluhan, dan satuan.. Ingat Konversi Berat. (Konversi Berat)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Bandul satu ons ditampilkan. Siswa mengatur angka ratusan, puluhan, dan satuan pada papan dan menekan Periksa. Gunakan Konversi Berat.",
      "voiceGuide": "Konversi Berat. Mainkan dengan teliti.",
      "emoji": "🗂️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-bandul",
      "title": "Urutkan Bandul menurut Berat",
      "bookReference": "hlm. 135–136 (jenis bandul)",
      "objective": "Mengurutkan tiga kumpulan bandul menurut beratnya.. Ingat Konversi Berat. (Konversi Berat)",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga kumpulan bandul bertanda huruf. Siswa mengetuk kumpulan satu per satu dari yang teringan atau terberat. Gunakan Konversi Berat.",
      "voiceGuide": "Konversi Berat. Mainkan dengan teliti.",
      "emoji": "📶",
      "targetCount": 9
    },
    {
      "stage": "Picture",
      "gameType": "count-weight-line",
      "title": "Hitung Garis Berat",
      "bookReference": "hlm. 136–139 (kilogram dan gram)",
      "objective": "Pakai Satuan Campuran: 1 kg 200 g = 1200 g. Latihan: Menghitung berat batang pada garis berat dalam gram..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Garis berat bertanda tiap 500 g dan batang berwarna ditampilkan. Siswa memilih satu dari tiga berat. Saat bermain, ingat Satuan Campuran: 1 kg 200 g = 1200 g.",
      "voiceGuide": "Satuan Campuran. 1 kg 200 g = 1200 g.",
      "diagramType": "weight-count",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "complete-convert-weight",
      "title": "Lengkapi Kalimat Ubah Berat",
      "bookReference": "hlm. 137 (1.753 gram dan mengubah gram ke kilogram)",
      "objective": "Pakai Satuan Campuran: 1 kg 200 g = 1200 g. Latihan: Melengkapi kalimat yang mengubah gram menjadi kilogram dan gram..",
      "mechanicDescription": "Tiga soal, tiap soal tiga kalimat, misalnya 1.250 g = 1.000 g + ... g. Siswa memilih satu dari tiga angka untuk bagian kosong. Saat bermain, ingat Satuan Campuran: 1 kg 200 g = 1200 g.",
      "voiceGuide": "Satuan Campuran. 1 kg 200 g = 1200 g.",
      "diagramType": "weight-sentence",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "match-weight-line",
      "title": "Jodohkan Garis dan Berat",
      "bookReference": "hlm. 136–139 (kilogram dan gram)",
      "objective": "Pakai Satuan Campuran: 1 kg 200 g = 1200 g. Latihan: Menjodohkan garis berat dengan beratnya dalam kilogram dan gram..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga garis dan tiga berat. Siswa mengetuk garis, lalu mengetuk berat yang cocok. Saat bermain, ingat Satuan Campuran: 1 kg 200 g = 1200 g.",
      "voiceGuide": "Satuan Campuran. 1 kg 200 g = 1200 g.",
      "diagramType": "weight-match",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memory-weight-line",
      "title": "Memori Garis dan Berat",
      "bookReference": "hlm. 136–139 (kilogram dan gram)",
      "objective": "Pakai Satuan Campuran: 1 kg 200 g = 1200 g. Latihan: Mencocokkan garis berat dengan beratnya lewat permainan memori..",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. Saat bermain, ingat Satuan Campuran: 1 kg 200 g = 1200 g.",
      "voiceGuide": "Satuan Campuran. 1 kg 200 g = 1200 g.",
      "diagramType": "weight-memory",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "fill-weight-table",
      "title": "Isi Tabel Ubah Berat",
      "bookReference": "hlm. 139 (Ayo Berlatih 1: lengkapi ukuran berat)",
      "objective": "Melengkapi tabel berat dalam kilogram, gram, dan ons.. Ingat Satuan Campuran. (Satuan Campuran)",
      "mechanicDescription": "Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu berat yang tepat. Ada satu kartu pengecoh. Gunakan Satuan Campuran.",
      "voiceGuide": "Satuan Campuran. Mainkan dengan teliti.",
      "diagramType": "weight-table",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-same-weight-line",
      "title": "Ketuk Semua Berat yang Sama",
      "bookReference": "hlm. 136–139 (satu berat ditulis dengan beberapa cara)",
      "objective": "Menemukan semua garis berat yang sama dengan berat acuan, walau ditulis berbeda.. Ingat Satuan Campuran. (Satuan Campuran)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat garis dan satu perintah. Siswa mengetuk semua yang sama dengan acuan, lalu menekan Periksa. Gunakan Satuan Campuran.",
      "voiceGuide": "Satuan Campuran. Mainkan dengan teliti.",
      "diagramType": "weight-select",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-whole-kg",
      "title": "Pilah Berat: Pas Kilogram atau Bersisa",
      "bookReference": "hlm. 137 dan 139 (gram dan kilogram)",
      "objective": "Memilah berat dalam gram menjadi yang pas dalam kilogram dan yang masih bersisa gram.. Ingat Satuan Campuran. (Satuan Campuran)",
      "mechanicDescription": "Tiga ronde, tiap ronde enam berat dan dua kotak. Berat yang habis dibagi 1.000 pas dalam kilogram. Siswa menyeret atau mengetuk berat ke kotak yang tepat. Gunakan Satuan Campuran.",
      "voiceGuide": "Satuan Campuran. Mainkan dengan teliti.",
      "diagramType": "weight-sort",
      "numberA": 3,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "order-convert-weight-steps",
      "title": "Urutkan Langkah Mengubah Berat",
      "bookReference": "hlm. 137 dan 139 (mengubah satuan berat)",
      "objective": "Mengurutkan langkah mengubah satuan berat.. Ingat Satuan Campuran. (Satuan Campuran)",
      "mechanicDescription": "Tiga ronde, tiap ronde empat langkah. Siswa mengetuk langkah satu per satu menurut urutan yang benar. Letak jawaban berpindah. Gunakan Satuan Campuran.",
      "voiceGuide": "Satuan Campuran. Mainkan dengan teliti.",
      "diagramType": "steps-order",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "difference-weight-line",
      "title": "Selisih Dua Garis Berat",
      "bookReference": "hlm. 139 (Ayo Berlatih 2: sisa mangga)",
      "objective": "Menghitung selisih berat dari dua batang pada garis berat.. Ingat Satuan Campuran. (Satuan Campuran)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Dua batang pada satu garis ditampilkan. Siswa memilih satu dari tiga selisih berat. Gunakan Satuan Campuran.",
      "voiceGuide": "Satuan Campuran. Mainkan dengan teliti.",
      "diagramType": "weight-compare",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "join-weight-lines",
      "title": "Sambung Dua Garis Berat",
      "bookReference": "hlm. 140 (Ayo Berlatih 3: dua kantong jeruk)",
      "objective": "Menghitung berat dua batang yang disambung pada garis berat.. Ingat Satuan Campuran. (Satuan Campuran)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Dua batang yang disambung ditampilkan. Siswa memilih satu dari tiga berat gabungan. Gunakan Satuan Campuran.",
      "voiceGuide": "Satuan Campuran. Mainkan dengan teliti.",
      "diagramType": "weight-join",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "kg-to-g-abstract",
      "title": "Ubah Kilogram ke Gram: Lambang",
      "bookReference": "hlm. 139 (20 kg = ... gram)",
      "objective": "Pakai Tabel Konversi Berat: Pakai tabel g–kg. Latihan: Mengubah kilogram ke gram dan memilih hasilnya dari tiga pilihan..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal, misalnya 4 kg = ... g. Pengecoh lupa mengalikan 1.000 atau mengalikan 10.000. Saat bermain, ingat Tabel Konversi Berat: Pakai tabel g–kg.",
      "voiceGuide": "Tabel Konversi Berat. Pakai tabel g–kg.",
      "symbolLarge": "4 kg",
      "wordLarge": "KG KE G",
      "mathNotation": "kali 1.000"
    },
    {
      "stage": "Abstract",
      "gameType": "g-to-kg-g",
      "title": "Ubah Gram ke Kilogram dan Gram",
      "bookReference": "hlm. 137 dan 139 (1.753 gram dan 1.200 gram)",
      "objective": "Pakai Tabel Konversi Berat: Pakai tabel g–kg. Latihan: Menulis berat gram sebagai kilogram dan gram..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal, misalnya 1.200 g = ... kg ... g. Pengecoh salah tambah atau kurang seratus gram. Saat bermain, ingat Tabel Konversi Berat: Pakai tabel g–kg.",
      "voiceGuide": "Tabel Konversi Berat. Pakai tabel g–kg.",
      "symbolLarge": "1.200 g",
      "wordLarge": "KG DAN G",
      "mathNotation": "ribuan • sisa"
    },
    {
      "stage": "Abstract",
      "gameType": "ons-convert",
      "title": "Ubah Kilogram, Ons, dan Gram",
      "bookReference": "hlm. 136 (1 kg = 10 ons, 1 ons = 100 g)",
      "objective": "Pakai Tabel Konversi Berat: Pakai tabel g–kg. Latihan: Mengubah antara kilogram, ons, dan gram..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal, misalnya 3 ons = ... g. Siswa memilih satu dari tiga hasil. Saat bermain, ingat Tabel Konversi Berat: Pakai tabel g–kg.",
      "voiceGuide": "Tabel Konversi Berat. Pakai tabel g–kg.",
      "symbolLarge": "ons",
      "wordLarge": "KG ONS G",
      "mathNotation": "10 ons • 100 g"
    },
    {
      "stage": "Abstract",
      "gameType": "match-weight",
      "title": "Jodohkan Berat",
      "bookReference": "hlm. 139 (Ayo Berlatih 1: lengkapi ukuran berat)",
      "objective": "Pakai Tabel Konversi Berat: Pakai tabel g–kg. Latihan: Menjodohkan dua cara menulis berat yang sama..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga ukuran dan tiga pasangannya. Siswa mengetuk ukuran, lalu mengetuk pasangannya. Saat bermain, ingat Tabel Konversi Berat: Pakai tabel g–kg.",
      "voiceGuide": "Tabel Konversi Berat. Pakai tabel g–kg.",
      "symbolLarge": "= ?",
      "wordLarge": "JODOHKAN",
      "mathNotation": "kg • ons • g"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-weight",
      "title": "Memori Berat",
      "bookReference": "hlm. 136 dan 139 (ukuran berat yang sama)",
      "objective": "Mencocokkan dua cara menulis berat yang sama lewat permainan memori.. Ingat Tabel Konversi Berat. (Tabel Konversi Berat)",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. Gunakan Tabel Konversi Berat.",
      "voiceGuide": "Tabel Konversi Berat. Mainkan dengan teliti.",
      "symbolLarge": "kg g",
      "wordLarge": "MEMORI",
      "mathNotation": "berat yang sama"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-unit-weight",
      "title": "Benar atau Salah: Kilogram dan Gram",
      "bookReference": "hlm. 136–140 (hubungan satuan berat)",
      "objective": "Menilai pernyataan tentang hubungan kilogram, ons, dan gram.. Ingat Tabel Konversi Berat. (Tabel Konversi Berat)",
      "mechanicDescription": "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Tiap jawaban diberi penjelasan. Gunakan Tabel Konversi Berat.",
      "voiceGuide": "Tabel Konversi Berat. Mainkan dengan teliti.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "periksa dengan alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-unit-weight",
      "title": "Detektif Satuan Berat",
      "bookReference": "hlm. 136–139 (ubah satuan berat)",
      "objective": "Menemukan bilangan hasil perubahan satuan berat dari dua petunjuk.. Ingat Tabel Konversi Berat. (Tabel Konversi Berat)",
      "mechanicDescription": "Empat soal. Siswa membaca petunjuk tentang perubahan satuan dan satu ciri bilangan, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok. Gunakan Tabel Konversi Berat.",
      "voiceGuide": "Tabel Konversi Berat. Mainkan dengan teliti.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "dua petunjuk, satu jawaban"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-map-unit-weight",
      "title": "Peta Konsep Satuan Berat",
      "bookReference": "hlm. 104 (peta konsep Bab 3)",
      "objective": "Melengkapi peta konsep hubungan kilogram, ons, dan gram.. Ingat Tabel Konversi Berat. (Tabel Konversi Berat)",
      "mechanicDescription": "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. Gunakan Tabel Konversi Berat.",
      "voiceGuide": "Tabel Konversi Berat. Mainkan dengan teliti.",
      "symbolLarge": "⇄",
      "wordLarge": "PETA KONSEP",
      "mathNotation": "kg • ons • g"
    },
    {
      "stage": "Abstract",
      "gameType": "story-unit-weight",
      "title": "Soal Cerita Satuan Berat",
      "bookReference": "hlm. 139–140 (Ayo Berlatih 2 dan 3: mangga dan jeruk)",
      "objective": "Menyelesaikan soal cerita yang menjumlahkan, mengurangkan, atau mengubah berat.. Ingat Tabel Konversi Berat. (Tabel Konversi Berat)",
      "mechanicDescription": "Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita lalu memilih satu dari tiga hasil dalam kilogram dan gram. Pengecoh salah seratus gram. Gunakan Tabel Konversi Berat.",
      "voiceGuide": "Tabel Konversi Berat. Mainkan dengan teliti.",
      "symbolLarge": "kg g",
      "wordLarge": "CERITA",
      "mathNotation": "jumlah • selisih • ubah"
    },
    {
      "stage": "Abstract",
      "gameType": "sentence-unit-weight",
      "title": "Susun Kata Satuan Berat",
      "bookReference": "hlm. 136–139 (hubungan satuan berat)",
      "objective": "Menyusun kalimat tentang hubungan satuan berat dari kartu kata.. Ingat Tabel Konversi Berat. (Tabel Konversi Berat)",
      "mechanicDescription": "Empat kalimat. Siswa mengetuk kartu kata satu per satu menurut urutan kalimat yang benar. Ada satu kartu pengecoh. Gunakan Tabel Konversi Berat.",
      "voiceGuide": "Tabel Konversi Berat. Mainkan dengan teliti.",
      "symbolLarge": "…",
      "wordLarge": "SUSUN KATA",
      "mathNotation": "kalimat satuan berat"
    }
  ],
  "poin": [
    {
      "ikon": "⚖️",
      "nama": "Kilogram dan gram",
      "isi": "1 kg = 1.000 g",
      "suara": "Satu kilogram sama dengan seribu gram. Dua kilogram sama dengan dua ribu gram."
    },
    {
      "ikon": "🌍",
      "nama": "Konversi Berat",
      "isi": "1 kg = 1000 g.",
      "suara": "Konversi Berat. 1 kg = 1000 g."
    },
    {
      "ikon": "🌍",
      "nama": "Satuan Campuran",
      "isi": "1 kg 200 g = 1200 g.",
      "suara": "Satuan Campuran. 1 kg 200 g = 1200 g."
    },
    {
      "ikon": "🌍",
      "nama": "Tabel Konversi Berat",
      "isi": "Pakai tabel g–kg.",
      "suara": "Tabel Konversi Berat. Pakai tabel g–kg."
    }
  ],
  "poinSuara": "Ingat: Konversi Berat, Satuan Campuran, Tabel Konversi Berat.",
  "cara": {
    "suara": "Cara mengubah satuan berat. Ingat satu kilogram sama dengan seribu gram. Kilogram ke gram, kalikan seribu. Gram ke kilogram, ambil tiap seribu gram. Lalu periksa dengan cara sebaliknya.",
    "potongan": [
      {
        "teks": "1 kg = 1.000 g",
        "warna": "#BAE6FD"
      },
      {
        "teks": "kg ke g: kali",
        "warna": "#FECACA"
      },
      {
        "teks": "g ke kg: ambil 1.000",
        "warna": "#BFDBFE"
      },
      {
        "teks": "periksa",
        "warna": "#FDE68A"
      }
    ]
  },
  "rumah": "Ayo Mencoba: terapkan Konversi Berat pada satu soal nyata di rumah.",
  "refleksi": [
    "Bagaimana Konversi Berat membantumu?",
    "Kapan memakai Satuan Campuran?",
    "Apa bedanya dengan hanya menghafal tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Mass Conversion",
      "namaId": "Konversi Berat",
      "asal": "SI relationships",
      "ringkas": "1 kg = 1000 g.",
      "tahap": [
        "Story",
        "Abstract",
        "Mind"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Mixed Units",
      "namaId": "Satuan Campuran",
      "asal": "Measurement",
      "ringkas": "1 kg 200 g = 1200 g.",
      "tahap": [
        "Picture",
        "Concrete"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Conversion Table Mass",
      "namaId": "Tabel Konversi Berat",
      "asal": "Reference table",
      "ringkas": "Pakai tabel g–kg.",
      "tahap": [
        "Infografis",
        "Abstract"
      ]
    }
  ]
};

export const SUB_BAB_K3B3: SubBabNaskah[] = [SUB_A33, SUB_B33, SUB_C33, SUB_D33];
export const semuaAdeganK3B3 = SUB_BAB_K3B3.flatMap((s) => s.videos.flatMap((v) => v.adegan));
