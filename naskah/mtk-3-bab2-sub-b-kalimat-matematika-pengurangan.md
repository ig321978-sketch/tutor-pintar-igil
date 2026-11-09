# Naskah Matematika Kelas 3 SD, Bab 2: Kalimat Matematika, Sub-Bab B: Kalimat Matematika Berkaitan dengan Pengurangan Bilangan Cacah

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k3b2.ts` dan `src/components/modul/data-k3b2.ts`, oleh `scripts/buat-naskah-md.mjs`. Isi mengikuti Buku Siswa Matematika Kelas III (Kemendikbudristek, Kurikulum Merdeka, Bab 2 hlm. 75–98) dan Buku Panduan Guru Bab 2, serta diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.

## 1. Identitas modul

- Kode bab: `k3-mat-bab2`, FASE_B, kelas 3.
- Judul: BAB 2: KALIMAT MATEMATIKA. Sub-Bab B: Kalimat Matematika Berkaitan dengan Pengurangan Bilangan Cacah.
- Suara Guru: Web Speech API perangkat saja, laju 0.7 dan nada 1. Tanpa ElevenLabs.
- Isi: 3 video cerita (9 adegan), 8 langkah peta pikiran, 10 panel infografis, 30 permainan (10 Concrete, 10 Picture, 10 Abstract), 5 poin penting.

## 2. Tujuan belajar

Siswa menulis kalimat Matematika dari cerita pengurangan yang bilangan awal atau bilangan yang dikurangkan belum diketahui, mencari bilangan yang dikurangkan dengan mengurangkan bilangan awal dengan sisa, mencari bilangan awal dengan menambahkan, memeriksa hasilnya, dan menyebutkan beberapa kemungkinan.

- Capaian Pembelajaran: Siswa menyelesaikan masalah yang berkaitan dengan kalimat Matematika berbentuk penjumlahan dan pengurangan bilangan cacah sampai 100. Pada sub-bab ini siswa mengisi nilai yang belum diketahui pada kalimat pengurangan.
- Acuan: Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 2: Kalimat Matematika, Sub-Bab B hlm. 87–98) dan Buku Panduan Guru Bab 2 Topik B.

## 3. Metode dari luar buku

- **Bagan bilangan awal dan bagian**: pada pengurangan, batang atas adalah bilangan awal, dan dua batang di bawahnya adalah bagian yang dikurangkan serta sisa. Dasar permainan Hitung Bagan dan Papan Nilai dari Bagan.
- **Dua arah operasi kebalikan**: mencari bilangan yang dikurangkan dengan mengurangkan bilangan awal dengan sisa (80 − 45 = 35), dan mencari bilangan awal dengan menambahkan (45 + 27 = 72).
- **Kumpulan benda berbungkus sepuluh**: kumpulan awal, bagian yang diambil, dan sisa digambar sebagai kumpulan benda dengan kotak bertanda tanya.
- **Titik-titik di depan atau di tengah**: 32 − … = 15 (titik-titik di tengah) dan … − 12 = 26 (titik-titik di depan) memakai cara berbeda. Permainan Pilah Bagan dan Langkah Menyelesaikan melatihnya.
- **Banyak kemungkinan (Ayo Berpikir)**: telur di pasar (100) dan televisi di toko (40). Bila hanya bilangan awal yang diketahui, ada banyak pasangan terjual dan sisa yang mungkin.
- **Pengecoh dari kesalahan umum**: pilihan jawaban memuat salah sepuluh dan salah satu, serta kalimat yang menukar hasil dengan bilangan yang diketahui atau membalik tanda.

## 4. Tahap 1: Story (video cerita animasi SVG)

Tiap video diputar satu per satu saat siswa mengetuk Putar. Tidak ada yang berjalan sendiri. Kalimat dibacakan Suara Guru satu per satu (ketukan), dan gambar berubah mengikuti ketukan.

### K3B2B-V1. Permen Dua Anak (Kalimat Matematika dari tabel)

**K3B2B-V1-1. Dua anak membawa permen**

1. Dua anak membawa sejumlah permen masing-masing. *(papan: Dua anak, permen)*
2. Banyak permen anak pertama diketahui, anak kedua belum. *(papan: Anak pertama diketahui)*
3. Selisih banyak permen kedua anak juga diketahui. *(papan: Selisih diketahui)*
4. Dapatkah kalian mencari banyak permen yang belum diketahui? *(papan: Cari yang belum diketahui)*

**K3B2B-V1-2. Tabel permen**

1. Kita buat tabel: permen anak pertama, anak kedua, dan selisihnya. *(papan: Tabel permen)*
2. Nomor satu: 3 permen dan selisih 1, jadi 3 − … = 1. *(papan: 3 − … = 1)*
3. Nomor empat: anak kedua 6, selisih 3, jadi … − 6 = 3. *(papan: … − 6 = 3)*
4. Bentuk pengurangan seperti ini disebut kalimat Matematika. *(papan: Kalimat Matematika)*

**K3B2B-V1-3. Cara mencari**

1. Pada 3 − … = 1, kita kurangi 3 dengan 1 sama dengan 2. *(papan: 3 − 1 = 2)*
2. Jadi, 3 − 2 sama dengan 1. *(papan: 3 − 2 = 1)*
3. Pada … − 6 = 3, kita tambahkan 3 dan 6 sama dengan 9. *(papan: 3 + 6 = 9)*
4. Jadi, 9 − 6 sama dengan 3. *(papan: 9 − 6 = 3)*

### K3B2B-V2. Ayam Pak Slamet (Mencari bilangan yang dikurangkan)

**K3B2B-V2-1. Ayam dijual**

1. Pak Slamet adalah seorang peternak ayam. *(papan: Pak Slamet punya 80 ayam)*
2. Ia mempunyai 80 ekor ayam potong di kandang. *(papan: Sebagian dijual)*
3. Sebagian ayam dijual ke pasar dan tersisa 45 ekor. *(papan: Sisa 45 ekor)*
4. Dapatkah kalian menentukan banyak ayam yang dijual? *(papan: Berapa yang dijual?)*

**K3B2B-V2-2. Kalimatnya**

1. Tabel: ayam mula-mula 80 ekor, dijual belum diketahui, sisa 45 ekor. *(papan: 80 ekor, …, 45 ekor)*
2. Kalimat Matematikanya adalah 80 − … = 45. *(papan: 80 − … = 45)*
3. Kita ingat bahwa 80 − 35 = 45. *(papan: 80 − 35 = 45)*
4. Bagaimana cara mendapatkan angka 35 itu? *(papan: Bagaimana mencari 35?)*

**K3B2B-V2-3. Bagan**

1. Bagan: seluruh ayam 80, sisa 45, dan yang dijual belum diketahui. *(papan: Bagan: 80 = ? + 45)*
2. Untuk mencari ayam yang dijual, kurangi ayam mula-mula dengan sisa ayam. *(papan: Mula-mula dikurangi sisa)*
3. Kita hitung 80 − 45 = 35. *(papan: 80 − 45 = 35)*
4. Jadi, ayam yang dijual ada 35 ekor. *(papan: Dijual 35 ekor)*

### K3B2B-V3. Ayam Mula-Mula (Mencari bilangan awal)

**K3B2B-V3-1. Dijual 45 ekor**

1. Hari ini Pak Slamet menjual 45 ekor ayam di pasar. *(papan: Dijual 45 ekor)*
2. Ayam yang tersisa di kandang ada 27 ekor. *(papan: Sisa 27 ekor)*
3. Banyak ayam mula-mula belum diketahui. *(papan: Mula-mula belum diketahui)*
4. Dapatkah kalian menentukannya? *(papan: Berapa ayam mula-mula?)*

**K3B2B-V3-2. Kalimatnya**

1. Tabel: ayam mula-mula belum diketahui, dijual 45, sisa 27. *(papan: …, 45 ekor, 27 ekor)*
2. Kalimat Matematikanya adalah … − 45 = 27. *(papan: … − 45 = 27)*
3. Kita ingat bahwa 72 − 45 = 27. *(papan: 72 − 45 = 27)*
4. Bagaimana cara memperoleh angka 72 itu? *(papan: Bagaimana mencari 72?)*

**K3B2B-V3-3. Bagan**

1. Bagan: ayam yang dijual 45 dan sisa 27 membentuk ayam mula-mula. *(papan: Bagan: ? = 45 + 27)*
2. Untuk mencari ayam mula-mula, tambahkan ayam yang dijual dan sisa ayam. *(papan: Dijual ditambah sisa)*
3. Kita hitung 45 + 27 = 72. *(papan: 45 + 27 = 72)*
4. Jadi, ayam mula-mula ada 72 ekor. *(papan: Mula-mula 72 ekor)*

## 5. Tahap 2: Mind map (peta pikiran)

**1. Mengingat Pengurangan** 🔙 (Mengingat pengurangan → Dua anak dan permen)

Pengurangan berarti mengambil sebagian dari satu kelompok benda dan menghitung sisanya. Bilangan awal dikurangi bilangan yang dikurangkan sama dengan sisa. Misalnya 80 ayam dikurangi 35 ayam yang dijual sama dengan 45 ayam. Sebelum belajar kalimat Matematika, ingatlah cara mengurangkan dua bilangan cacah sampai 100.

**2. Dua Anak dan Permen** 🍬 (Dua anak dan permen → Tabel permen)

Dua anak membawa permen. Banyak permen anak pertama diketahui, banyak permen anak kedua tidak diketahui, tetapi selisih keduanya diketahui. Kita diminta mencari banyak permen yang tidak diketahui. Sebaliknya, anak pertama bisa yang tidak diketahui dan anak kedua yang diketahui. Situasi seperti ini dapat ditulis sebagai kalimat Matematika.

**3. Tabel Permen** 📋 (Tabel permen → Mencari bilangan yang dikurangkan)

Pada Aktivitas 2, kelompok membuat tabel empat kolom: nomor, permen anak pertama, permen anak kedua, dan selisih permen. Kolom yang belum terisi diisi permen agar selisihnya sama dengan kolom terakhir. Lalu tiap baris ditulis sebagai bentuk pengurangan, misalnya 3 − … = 1 dan … − 6 = 3. Bentuk itu disebut kalimat Matematika.

**4. Mencari Bilangan yang Dikurangkan** 🔎 (Mencari bilangan yang dikurangkan → Bagan bilangan awal dan bagian)

Pak Slamet punya 80 ekor ayam dan sebagian dijual hingga tersisa 45 ekor. Kalimat Matematikanya 80 − … = 45. Kita ingat 80 − 35 = 45. Cara mencarinya: kurangi bilangan awal dengan sisanya, yaitu 80 − 45 = 35. Jadi ayam yang dijual ada 35 ekor, dan 80 − 35 memang sama dengan 45.

**5. Bagan Bilangan Awal dan Bagian** 📊 (Bagan bilangan awal dan bagian → Mencari bilangan awal)

Bagan membantu kita melihat bilangan awal dan bagian-bagiannya. Batang atas menunjukkan bilangan awal, yaitu 80. Dua batang di bawahnya menunjukkan bagian yang dijual (belum diketahui) dan bagian yang tersisa, yaitu 45. Karena bilangan awal dikurangi sisa sama dengan bagian yang dijual, kita hitung 80 − 45 = 35.

**6. Mencari Bilangan Awal** ➕ (Mencari bilangan awal → Contoh dan latihan)

Hari ini Pak Slamet menjual 45 ekor ayam dan di kandang tersisa 27 ekor. Kalimat Matematikanya … − 45 = 27. Kita ingat 72 − 45 = 27. Cara mencarinya: tambahkan bilangan yang dikurangkan dengan sisanya, yaitu 45 + 27 = 72. Jadi ayam mula-mula ada 72 ekor, dan 72 − 45 memang sama dengan 27.

**7. Contoh dan Latihan** 📝 (Contoh dan latihan → Banyak kemungkinan)

Contoh dari buku: 32 − … = 15 dicari dengan 32 − 15 = 17, 56 − … = 24 dengan 56 − 24 = 32, dan 53 − … = 32 dengan 53 − 32 = 21. Untuk bilangan awal: … − 12 = 26 dicari dengan 26 + 12 = 38, … − 23 = 42 dengan 42 + 23 = 65, dan … − 41 = 38 dengan 38 + 41 = 79. Periksa jawaban dengan mengurangkan lagi.

**8. Banyak Kemungkinan** 🔀 (Banyak kemungkinan → Siap menyelesaikan kalimat pengurangan)

Pada Ayo Berpikir, pedagang menjual telur di pasar. Banyak telur mula-mula adalah 100. Banyak telur yang terjual dan banyak sisa telur bisa bermacam-macam asal jumlahnya 100, misalnya 45 dan 55. Pada Latihan 2 nomor 6, toko elektronik punya 40 televisi dan siswa menuliskan lima kemungkinan banyak televisi yang terjual dan sisanya.

## 6. Tahap 3: Infografis

1. **Kalimat Matematika** 📘: Bentuk pengurangan yang memuat titik-titik disebut kalimat Matematika. Titik-titik menunjukkan bilangan yang belum diketahui.
2. **Mencari yang Dikurangkan** ❓: Bila bilangan yang dikurangkan belum diketahui, kurangi bilangan awal dengan sisanya.
3. **80 − … = 45** 🐔: Pak Slamet punya delapan puluh ayam. Sisanya empat puluh lima. Kalimat Matematikanya delapan puluh kurang titik-titik sama dengan empat puluh lima.
4. **Bagan Pengurangan** 📊: Batang atas menunjukkan bilangan awal. Dua batang di bawahnya menunjukkan bagian yang dikurangkan dan sisanya. Satu bagian bertanda tanya.
5. **Awal Dikurangi Sisa** ➖: Untuk mencari bilangan yang dikurangkan, kurangi bilangan awal dengan sisanya. Delapan puluh dikurangi empat puluh lima sama dengan tiga puluh lima.
6. **… − 45 = 27** 🔎: Titik-titik kurang empat puluh lima sama dengan dua puluh tujuh. Bilangan awalnya belum diketahui. Kita tambahkan empat puluh lima dan dua puluh tujuh, hasilnya tujuh puluh dua.
7. **Awal = Dikurangkan + Sisa** ➕: Untuk mencari bilangan awal, tambahkan bilangan yang dikurangkan dengan sisanya. Empat puluh lima tambah dua puluh tujuh sama dengan tujuh puluh dua.
8. **Memeriksa** ✅: Periksa hasilmu dengan mengurangkan lagi. Delapan puluh dikurangi tiga puluh lima sama dengan empat puluh lima, jadi jawabannya benar.
9. **Banyak Kemungkinan** 🔀: Bila hanya bilangan awalnya yang diketahui, ada banyak kemungkinan. Terjual empat puluh lima dan sisa lima puluh lima, atau terjual enam puluh dan sisa empat puluh, sama-sama seratus.
10. **Cara Mengisi** 📝: Empat langkah. Satu, baca kalimat Matematikanya. Dua, lihat bilangan yang diketahui. Tiga, kurangkan atau tambahkan sesuai letak titik-titik. Empat, periksa dengan mengurangkan lagi.

## 7. Tahap 4: Concrete (benda nyata)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 1 | Rakit yang Belum Diketahui | `build-unknown` | hlm. 88–90 (Aktivitas 2: permen dua anak dan ayam Pak Slamet) | Merakit kumpulan benda yang belum diketahui pada kalimat Matematika pengurangan, termasuk menukar sepuluh benda menjadi satu bungkus. | Tiga ronde, tiap ronde dua soal. Siswa membaca cerita dan melihat gambar kumpulan yang diketahui, lalu merakit kumpulan yang belum diketahui dengan tombol tambah dan kurang. Sepuluh benda otomatis ditukar satu bungkus. |
| 2 | Hitung yang Belum Diketahui | `count-unknown` | hlm. 88–90 (Aktivitas 2: permen dua anak dan ayam Pak Slamet) | Menghitung banyak benda yang belum diketahui dari gambar kumpulan dan memilih hasilnya. | Tiga ronde, tiap ronde dua soal. Gambar kumpulan ditampilkan dengan kotak tanda tanya pada bagian yang belum diketahui. Siswa memilih satu dari tiga nilai. Pengecoh salah sepuluh atau salah satu. |
| 3 | Tulis Kalimat Matematika | `write-sentence` | hlm. 88–90 (Aktivitas 2: permen dua anak dan ayam Pak Slamet) | Memilih kalimat Matematika pengurangan yang sesuai dengan gambar kumpulan benda. | Tiga ronde, tiap ronde dua soal. Siswa melihat gambar kumpulan, lalu memilih satu dari tiga kalimat Matematika. Pengecoh menukar hasil dengan bilangan yang diketahui atau membalik tanda. |
| 4 | Jodohkan Gambar dan Kalimat | `match-picture-sentence` | hlm. 88–90 (Aktivitas 2: permen dua anak dan ayam Pak Slamet) | Menjodohkan gambar kumpulan benda dengan kalimat Matematikanya. | Tiga ronde, tiap ronde tiga gambar dan tiga kalimat Matematika. Siswa mengetuk gambar, lalu mengetuk kalimat yang cocok. |
| 5 | Memori Gambar dan Nilai | `memory-picture-value` | hlm. 88–90 (Aktivitas 2: permen dua anak dan ayam Pak Slamet) | Mencocokkan gambar kumpulan benda dengan nilai yang belum diketahui lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): gambar kumpulan dan nilainya. Siswa membalik dua kartu dan mencari pasangannya. |
| 6 | Ketuk Gambar dengan Nilai | `tap-picture-value` | hlm. 88–90 (Aktivitas 2: permen dua anak dan ayam Pak Slamet) | Menemukan gambar yang nilai belum diketahuinya sama dengan bilangan yang diminta. | Tiga ronde, tiap ronde tiga gambar dan dua pertanyaan. Siswa mengetuk gambar yang nilai belum diketahuinya sama dengan bilangan yang disebut. |
| 7 | Ketuk Semua Nilai Lebih atau Kurang | `tap-all-value-compare` | hlm. 88–90 (Aktivitas 2: permen dua anak dan ayam Pak Slamet) | Menemukan semua gambar yang nilai belum diketahuinya lebih atau kurang dari bilangan acuan. | Tiga ronde, tiap ronde empat gambar dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. |
| 8 | Cerita Kalimat Matematika | `story-sentence` | hlm. 90–95 (Pengamatan 1 dan 2: ayam Pak Slamet) | Menyelesaikan cerita pengurangan dengan bilangan yang belum diketahui dan gambar kumpulan benda. | Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita, melihat gambar kumpulan, lalu memilih nilai yang belum diketahui. |
| 9 | Papan Nilai Kumpulan | `board-value-collection` | hlm. 88–90 (Aktivitas 2: permen dua anak dan ayam Pak Slamet) | Menulis nilai yang belum diketahui pada papan puluhan dan satuan. | Tiga ronde, tiap ronde dua soal. Siswa menghitung nilai yang belum diketahui dari gambar kumpulan, lalu mengatur angka puluhan dan satuan pada papan dan menekan Periksa. |
| 10 | Urutkan Gambar menurut Nilai | `order-picture-value` | hlm. 88–90 (Aktivitas 2: permen dua anak dan ayam Pak Slamet) | Mengurutkan tiga gambar menurut nilai yang belum diketahuinya. | Tiga ronde, tiap ronde tiga gambar bertanda huruf. Siswa mengetuk gambar satu per satu dari nilai paling kecil atau paling besar. |

## 8. Tahap 5: Picture (diagram)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 11 | Hitung Bagan | `count-bar` | hlm. 88–90 (Aktivitas 2: permen dua anak dan ayam Pak Slamet) | Menghitung nilai yang belum diketahui dari bagan bagian dan keseluruhan. | Tiga ronde, tiap ronde dua soal. Bagan batang menampilkan keseluruhan dan dua bagian, salah satunya bertanda tanya. Siswa memilih satu dari tiga nilai. |
| 12 | Lengkapi Kalimat dari Bagan | `complete-sentence-bar` | hlm. 92 dan 95 (Contoh: 32 − … = 15 dan … − 12 = 26) | Melengkapi langkah mencari nilai yang belum diketahui: kurangi atau tambahkan sesuai letak bilangan yang belum diketahui, mengisi kalimat, lalu memeriksa. | Tiga soal, tiap soal tiga kalimat, misalnya cari dengan operasi kebalikan, isi kalimat Matematika, lalu periksa. Siswa memilih satu dari tiga angka untuk bagian kosong. |
| 13 | Jodohkan Bagan dan Kalimat | `match-bar-sentence` | hlm. 88–90 (Aktivitas 2: permen dua anak dan ayam Pak Slamet) | Menjodohkan bagan dengan kalimat Matematikanya. | Tiga ronde, tiap ronde tiga bagan dan tiga kalimat Matematika. Siswa mengetuk bagan, lalu mengetuk kalimat yang cocok. |
| 14 | Memori Bagan dan Nilai | `memory-bar-value` | hlm. 88–90 (Aktivitas 2: permen dua anak dan ayam Pak Slamet) | Mencocokkan bagan dengan nilai yang belum diketahui lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. |
| 15 | Isi Tabel Kalimat Matematika | `fill-sentence-table` | hlm. 92 dan 95 (Contoh: 32 − … = 15 dan … − 12 = 26) | Melengkapi tabel kalimat Matematika dan nilai yang belum diketahui. | Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu nilai yang tepat. Ada satu kartu pengecoh. |
| 16 | Ketuk Semua Bagan Lebih atau Kurang | `tap-all-bar-compare` | hlm. 97–98 (Latihan 2) | Menemukan semua bagan yang nilai belum diketahuinya lebih atau kurang dari bilangan acuan. | Tiga ronde, tiap ronde empat bagan dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. |
| 17 | Pilah Bagan: Depan atau Tengah | `sort-bar-position` | hlm. 92 dan 95 (Contoh: 32 − … = 15 dan … − 12 = 26) | Memilah bagan menjadi yang bilangan belum diketahuinya di depan dan yang di tengah kalimat. | Tiga ronde, tiap ronde enam bagan dan dua kotak. Siswa menyeret atau mengetuk bagan ke kotak yang tepat. |
| 18 | Urutkan Langkah Mencari Nilai | `order-find-steps` | hlm. 92 dan 95 (Contoh: 32 − … = 15 dan … − 12 = 26) | Mengurutkan langkah mencari nilai yang belum diketahui pada kalimat Matematika. | Tiga ronde, tiap ronde empat langkah. Siswa mengetuk langkah satu per satu menurut urutan yang benar. Letak jawaban berpindah. |
| 19 | Papan Nilai dari Bagan | `board-value-bar` | hlm. 97–98 (Latihan 2) | Menulis nilai yang belum diketahui dari bagan pada papan puluhan dan satuan. | Tiga ronde, tiap ronde dua soal. Siswa membaca bagan, lalu mengatur angka puluhan dan satuan pada papan dan menekan Periksa. |
| 20 | Kemungkinan Pasangan Bilangan | `possible-pairs` | hlm. 96 (Ayo Berpikir: telur di pasar) | Menemukan semua pasangan bilangan yang mungkin untuk keseluruhan yang sama. | Tiga ronde, tiap ronde empat pasangan dan satu perintah. Siswa mengetuk semua pasangan yang jumlahnya sama dengan keseluruhan, lalu menekan Periksa. |

## 9. Tahap 6: Abstract (kata dan angka)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 21 | Isi Nilai yang Belum Diketahui | `fill-unknown` | hlm. 92 dan 95 (Contoh: 32 − … = 15 dan … − 12 = 26) | Mencari nilai yang belum diketahui pada kalimat Matematika pengurangan dan memilihnya dari tiga pilihan. | Tiga ronde, tiap ronde dua soal, misalnya 80 − … = 45 dan … − 45 = 27. Pengecoh salah sepuluh atau salah satu. |
| 22 | Papan Nilai | `board-value` | hlm. 97–98 (Latihan 2) | Menulis nilai yang belum diketahui pada papan puluhan dan satuan. | Tiga ronde, tiap ronde dua soal. Siswa mengatur angka puluhan dan satuan lalu menekan Periksa. |
| 23 | Langkah Menyelesaikan | `solve-steps` | hlm. 92 dan 95 (Contoh: 32 − … = 15 dan … − 12 = 26) | Melengkapi langkah mencari nilai, mengisi kalimat, dan memeriksa hasilnya. | Tiga soal, tiap soal tiga kalimat, misalnya cari dengan operasi kebalikan. Siswa memilih satu dari tiga angka. |
| 24 | Jodohkan Kalimat dan Nilai | `match-sentence-value` | hlm. 97–98 (Latihan 2) | Menjodohkan kalimat Matematika dengan nilai yang belum diketahuinya. | Tiga ronde, tiap ronde tiga kalimat dan tiga nilai. Siswa mengetuk kalimat, lalu mengetuk nilai yang cocok. |
| 25 | Memori Kalimat dan Nilai | `memory-sentence-value` | hlm. 97–98 (Latihan 2) | Mencocokkan kalimat Matematika dengan nilainya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): kalimat dan nilai. Siswa membalik dua kartu dan mencari pasangannya. |
| 26 | Benar atau Salah: Kalimat Matematika | `true-false-sentence` | hlm. 92 dan 95 (Contoh: 32 − … = 15 dan … − 12 = 26) | Menilai pernyataan tentang kalimat Matematika dan cara mencari nilainya. | Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Tiap jawaban diberi penjelasan. |
| 27 | Detektif Kalimat Matematika | `detective-sentence` | hlm. 92 dan 95 (Contoh: 32 − … = 15 dan … − 12 = 26) | Menemukan bilangan yang belum diketahui dari dua petunjuk. | Empat soal. Siswa membaca petunjuk seperti nilai pada sebuah kalimat Matematika dan satu ciri bilangan, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok. |
| 28 | Peta Konsep Kalimat Matematika | `concept-map-sentence` | hlm. 76 (peta konsep: kalimat Matematika) | Melengkapi peta konsep kalimat Matematika pengurangan dan cara mencari nilainya. | Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. |
| 29 | Soal Cerita Kalimat Matematika | `story-sentence-abstract` | hlm. 97–98 (Latihan 2) | Menyelesaikan soal cerita pengurangan dengan bilangan yang belum diketahui. | Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita lalu memilih satu dari tiga nilai. Pengecoh salah sepuluh atau salah satu. |
| 30 | Susun Kata Kalimat Matematika | `sentence-words` | hlm. 90–95 (Pengamatan 1 dan 2: ayam Pak Slamet) | Menyusun kalimat tentang kalimat Matematika dari kartu kata. | Empat kalimat. Siswa mengetuk kartu kata satu per satu menurut urutan kalimat yang benar. Ada satu kartu pengecoh. |

## 10. Poin penting, cara, kegiatan di rumah, dan refleksi

- 📘 **Kalimat Matematika**: 80 − … = 45. *Suara:* Bentuk pengurangan yang memuat titik-titik disebut kalimat Matematika.
- ➖ **Mencari yang dikurangkan**: 80 − 45 = 35. *Suara:* Bila bilangan yang dikurangkan belum diketahui, kurangi bilangan awal dengan sisanya.
- ➕ **Mencari bilangan awal**: 45 + 27 = 72. *Suara:* Bila bilangan awal belum diketahui, tambahkan bilangan yang dikurangkan dengan sisanya.
- ✅ **Periksa**: 72 − 45 = 27. *Suara:* Periksa jawabanmu dengan mengurangkan lagi. Hasilnya harus sama dengan sisa semula.
- 🔀 **Banyak kemungkinan**: 45 + 55, 60 + 40. *Suara:* Bila hanya bilangan awal yang diketahui, ada banyak pasangan terjual dan sisa yang mungkin.

Ringkasan suara: Ingat selalu! Pada kalimat Matematika pengurangan, bilangan awal dikurangi bilangan yang dikurangkan sama dengan sisa. Bila bilangan yang dikurangkan belum diketahui, kurangi bilangan awal dengan sisa. Bila bilangan awal belum diketahui, tambahkan bilangan yang dikurangkan dengan sisa. Lalu periksa.

Cara menyebutkan: Cara mengisi. Baca kalimat Matematikanya. Lihat letak titik-titik. Kurangkan atau tambahkan. Lalu periksa dengan mengurangkan lagi. (baca kalimat, lihat titik-titik, kurang atau tambah, periksa)

Ayo Mencoba di rumah: siapkan 20 kancing atau biji. Ambil sebagian dan sembunyikan di tangan, lalu tunjukkan sisanya kepada temanmu. Tulis kalimat Matematika pengurangannya dengan titik-titik, cari banyak kancing yang diambil dengan mengurangkan, lalu buka tanganmu untuk memeriksa.

Refleksi:
- Aku dapat menulis kalimat Matematika dari cerita pengurangan.
- Aku dapat mencari bilangan yang dikurangkan dan bilangan awal.
- Aku memeriksa jawabanku dengan mengurangkan lagi.
- Aku dapat menyebutkan beberapa kemungkinan pasangan bilangan.
