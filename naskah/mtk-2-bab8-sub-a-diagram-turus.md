# Naskah Matematika Kelas 2 SD, Bab 8: Berbagai Diagram, Sub-Bab A: Diagram Turus

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k2b8.ts` dan `src/components/modul/data-k2b8.ts`, oleh `scripts/buat-naskah-md-k2b8.mjs`. Isi mengikuti Buku Siswa Matematika Kelas II (Kemendikbudristek, Kurikulum Merdeka, Bab 8 hlm. 225–250) dan Buku Panduan Guru Bab 8 (kunci jawaban dan langkah pembelajaran), serta diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.

## 1. Identitas modul

| Butir | Isi |
|---|---|
| Modul | `mtk-2-bab8`, sub-bab A |
| Berkas data | `src/data/kelas2-bab8.json` (dibangkitkan `src/content-master/buat-k2-bab8.mjs`, lalu `npm run sync:keys`) |
| Kode bab di server | `k2-mat-bab8` (belum ada seed server karena soal belum ada) |
| Fase dan kelas | `FASE_A`, kelas 2 SD |
| Elemen | 🌈 Fase A • Elemen Analisis Data dan Peluang: Diagram Turus dan Diagram Gambar (Kelas 2 SD/MI) |
| Poin Kualifikasi per bab | Latihan 30 dan Ujian 70 (terbit setelah soalnya ada). Praktikum 50 terbit sekali per blok empat bab. |
| Suara Guru | Murni Web Speech API bawaan perangkat (`id-ID`), **laju 0,70 dan nada 1**. Tanpa berkas audio statis, tanpa ElevenLabs. |
| Panggilan API saat siswa belajar | Nol. Seluruh tahap Materi berjalan di klien. |
| Tab Simulasi, Latihan, Ujian | Belum diisi. Latihan dan Ujian menampilkan kartu "sedang disiapkan". Tab Simulasi tidak tampil. |
| Jumlah sub-bab | Dua (A dan B), sesuai daftar isi buku Bab 8. |
| Jumlah permainan | 30 per sub-bab: 10 Concrete, 10 Picture, 10 Abstract. Penomoran di layar 1 sampai 30. |

## 2. Capaian dan tujuan pembelajaran

**Capaian Pembelajaran (CP).** Siswa membaca, menginterpretasikan, dan menyajikan data dalam bentuk diagram turus dengan maksimal empat kategori, serta menyampaikan hasilnya dengan percaya diri.

**Rujukan.** Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 8: Berbagai Diagram, Sub-Bab A hlm. 228–237) dan Buku Panduan Guru Bab 8 Subbab A.

**Sasaran.** Siswa membaca data dalam bentuk turus maksimal empat kategori, menginterpretasikan data itu (paling banyak, paling sedikit, sama banyak, lebihnya, kurangnya, dan jumlah), serta menyajikan data dengan membuat diagram turus: mengelompokkan benda menurut jenisnya, menghitung, menulis satu garis untuk satu benda, dan mengelompokkan setiap lima turus dengan coretan miring.

**Suara Silabus.** Kita belajar berbagai diagram, dimulai dari diagram turus. Di kelas satu kita sudah mengenal tabel dan diagram gambar, dan kali ini kita belajar membuat dan membaca diagram turus. Kita menghitung buah yang dibawa Lili dan teman-temannya pada hari buah, hewan ternak Paman Halim, mainan Kira, sayur Malosi, dan bunga Tika. Kita belajar menulis satu garis untuk satu benda, mengelompokkan setiap lima turus, lalu membaca diagramnya untuk mencari yang paling banyak, yang lebihnya, dan yang kurangnya. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.

## 3. Peta enam tahap SMICPA dan bobotnya

| Tahap | Isi | Banyak butir |
|---|---|---|
| S. Story | Video animasi HTML/SVG, tiga video. Tiap video diputar satu per satu saat diketuk (tidak ada putar otomatis) | 3 video, 9 adegan, 36 ketukan |
| M. Mind-Map | Peta pikiran berurutan, tiap cabang bisa diketuk dan uraiannya tampil di layar | 8 langkah |
| I. Infografis | Poster rangkuman, suara di tiap panel | 10 panel |
| C. Concrete | Benda nyata: kelompokkan, hitung, catat turus, buat turus, jodohkan, urutkan | 10 permainan |
| P. Picture | Diagram polos: turus, tabel turus, kelompok lima, garis bilangan | 10 permainan |
| A. Abstract | Kata dan angka: kalimat data, benar-salah, tabel, detektif, peta konsep, urutkan | 10 permainan |

Bobot mengikuti isi buku. Aturan Concrete dan Picture berlaku: gambar benda hanya di Concrete, Picture hanya diagram tanpa gambar benda (turus, lambang polos, tabel, garis bilangan).

## 4. Tahap 1: Story (video animasi, menggantikan slide)

Tidak ada video yang berjalan sendiri. Siswa mengetuk **▶ Putar** pada satu video. Video itu berjalan, dan video lain berhenti. Setiap kalimat adalah satu ketukan: dibacakan Suara Guru perangkat, dan gambar berubah mengikuti kalimat yang sedang dibacakan. Ada tombol Jeda, Ulang, dan Suara hidup atau mati.

### Video 1: Hari Buah (Apa itu diagram turus?)

**Adegan 1. Hari buah di kantin** (`K2B8A-V1-1`)

1. Hari ini adalah hari buah di sekolah Lili.  
   _Papan layar:_ Hari buah
2. Semua siswa membawa buah kesukaan masing-masing dan memakannya di kantin sehat.  
   _Papan layar:_ Kantin sehat
3. Buah mengandung vitamin yang baik untuk tubuh, dan makan buah menjaga tubuh tetap sehat.  
   _Papan layar:_ Buah itu sehat
4. Buah apa yang paling disukai? Berapa banyak anak yang menyukainya?  
   _Papan layar:_ Buah apa paling disukai?

**Adegan 2. Data buah Lili dan teman** (`K2B8A-V1-2`)

1. Ini buah yang dibawa Lili dan teman-temannya. Ada buah anggur, jeruk, apel, dan pisang.  
   _Papan layar:_ Data buah
2. Pertama, buah dikelompokkan menurut jenisnya agar tidak tercampur.  
   _Papan layar:_ Kelompokkan dulu
3. Kedua, kita menghitung setiap kelompok satu per satu supaya tidak ada yang terlewat.  
   _Papan layar:_ Hitung satu per satu
4. Data buah ini bisa kita tulis dalam diagram turus.  
   _Papan layar:_ Tulis dalam turus

**Adegan 3. Mengenal turus** (`K2B8A-V1-3`)

1. Pada diagram turus terdapat susunan garis seperti lidi.  
   _Papan layar:_ Turus seperti lidi
2. Satu garis tegak menunjukkan satu benda. Satu buah jeruk ditulis satu garis, dan dua buah jeruk ditulis dua garis.  
   _Papan layar:_ Satu garis, satu benda
3. Lima buah jeruk ditulis empat garis tegak, lalu garis kelima mencoret miring.  
   _Papan layar:_ Lima: empat garis dicoret
4. Setiap lima turus dikelompokkan supaya mudah dihitung.  
   _Papan layar:_ Kelompok lima

### Video 2: Turus Hewan Paman Halim (Membuat dan membaca diagram turus)

**Adegan 1. Peternakan Paman Halim** (`K2B8A-V2-1`)

1. Paman Halim adalah seorang peternak yang memelihara berbagai jenis hewan.  
   _Papan layar:_ Peternakan Paman Halim
2. Di peternakannya ada ayam, kambing, sapi, dan bebek.  
   _Papan layar:_ Ayam, kambing, sapi, bebek
3. Kita hitung banyak hewan satu per satu, lalu mencatatnya dengan turus.  
   _Papan layar:_ Hitung lalu catat
4. Setiap hewan yang sudah dihitung ditandai dengan satu garis.  
   _Papan layar:_ Satu hewan, satu garis

**Adegan 2. Membuat diagram turus** (`K2B8A-V2-2`)

1. Ayam ada sepuluh. Turusnya dua kelompok lima.  
   _Papan layar:_ Ayam: dua kelompok lima
2. Kambing ada delapan. Turusnya satu kelompok lima dan tiga garis.  
   _Papan layar:_ Kambing: lima dan tiga
3. Sapi ada enam. Turusnya satu kelompok lima dan satu garis.  
   _Papan layar:_ Sapi: lima dan satu
4. Bebek ada sebelas. Turusnya dua kelompok lima dan satu garis.  
   _Papan layar:_ Bebek: dua lima dan satu

**Adegan 3. Membaca diagram turus** (`K2B8A-V2-3`)

1. Hewan yang paling banyak di peternakan adalah bebek.  
   _Papan layar:_ Paling banyak: bebek
2. Ada sepuluh ayam dan sebelas bebek. Banyak bebek satu lebihnya dari banyak ayam.  
   _Papan layar:_ Bebek 1 lebihnya dari ayam
3. Sebaliknya, banyak ayam satu kurangnya dari banyak bebek.  
   _Papan layar:_ Ayam 1 kurangnya dari bebek
4. Ada delapan kambing dan enam sapi. Banyak kambing dua lebihnya dari banyak sapi.  
   _Papan layar:_ Kambing 2 lebihnya

### Video 3: Mengumpulkan Data Sendiri (Bertanya, mencatat, dan membaca)

**Adegan 1. Bertanya kepada teman** (`K2B8A-V3-1`)

1. Kita bisa mengumpulkan data sendiri dengan bertanya kepada teman.  
   _Papan layar:_ Bertanya kepada teman
2. Contohnya, bertanya kepada lima belas teman tentang buah kesukaan.  
   _Papan layar:_ Lima belas teman
3. Setiap teman menjawab satu kali, dan kita langsung menulis satu garis untuk jawabannya.  
   _Papan layar:_ Satu jawaban, satu garis
4. Catatlah dengan tertib supaya datanya tidak tertukar.  
   _Papan layar:_ Catat dengan tertib

**Adegan 2. Data mainan Kira** (`K2B8A-V3-2`)

1. Kira mendata mainan kesukaan teman-temannya.  
   _Papan layar:_ Mainan kesukaan
2. Mobil-mobilan dua anak, boneka empat anak, kelereng enam anak, dan mainan balok tujuh anak.  
   _Papan layar:_ Dua, empat, enam, tujuh
3. Garis turus diubah menjadi bilangan pada kolom paling kanan.  
   _Papan layar:_ Turus menjadi bilangan
4. Mainan yang paling banyak disukai adalah mainan balok.  
   _Papan layar:_ Paling banyak: mainan balok

**Adegan 3. Data sayur dan bunga** (`K2B8A-V3-3`)

1. Malosi mendata sayur kesukaan: brokoli tujuh, bayam empat, wortel enam, dan jagung tiga.  
   _Papan layar:_ Sayur Malosi
2. Tika dan ibu merangkai bunga: mawar tujuh, lili empat, tulip lima, dan aster empat.  
   _Papan layar:_ Bunga Tika
3. Lili dan aster sama banyak, yaitu empat.  
   _Papan layar:_ Lili dan aster sama banyak
4. Banyak mawar tiga lebihnya dari banyak aster.  
   _Papan layar:_ Mawar 3 lebihnya dari aster

## 5. Tahap 2: Mind-Map (peta pikiran)

**1. Data di Sekitar Kita** 🗂️  
Data adalah keterangan tentang banyak benda atau banyak orang, misalnya buah yang dibawa ke sekolah, hewan di peternakan, atau mainan kesukaan teman. Anggur, jeruk, apel, dan pisang adalah contoh data. Data yang berserakan sulit dibaca, jadi kita perlu menyajikannya dengan rapi. Pada bab ini kita belajar dua cara menyajikan data: diagram turus dan diagram gambar.

_Alur:_ Data di sekitar kita → Mengelompokkan data

**2. Mengelompokkan Data** 🧺  
Langkah pertama menyajikan data adalah mengelompokkan benda menurut jenisnya. Semua anggur dikumpulkan dengan anggur, semua jeruk dengan jeruk, dan seterusnya. Setelah dikelompokkan, kita menghitung setiap kelompok satu per satu. Mengelompokkan lebih dulu membuat hitungan tidak terlewat dan tidak dihitung dua kali, karena setiap benda hanya masuk satu kelompok.

_Alur:_ Mengelompokkan data → Mengenal turus

**3. Mengenal Turus** ✏️  
Turus adalah tanda garis tegak seperti susunan lidi. Satu garis menunjukkan satu benda. Satu buah jeruk ditulis satu garis, dua buah jeruk ditulis dua garis, dan tiga buah jeruk ditulis tiga garis. Kita menulis garisnya satu per satu mengikuti data, sehingga banyak garis sama dengan banyak benda. Turus mudah ditulis karena tidak perlu menulis angka.

_Alur:_ Mengenal turus → Kelompok lima

**4. Kelompok Lima** 🖐️  
Bila garis ditulis panjang-panjang, kita mudah keliru menghitung. Karena itu setiap lima data dikelompokkan: empat garis tegak, lalu garis kelima mencoret miring melintasi keempat garis itu. Sepuluh data berarti dua kelompok lima. Delapan data berarti satu kelompok lima dan tiga garis. Kita menghitung kelompok lima dengan cara melompat lima-lima, lalu menambahkan garis yang tersisa.

_Alur:_ Kelompok lima → Membuat diagram turus

**5. Membuat Diagram Turus** 📊  
Diagram turus berupa tabel dengan tiga kolom: nama, turus, dan banyaknya. Kolom nama berisi jenis data, kolom turus berisi garis yang kita tulis, dan kolom banyaknya berisi hasil menghitung garis. Pada data buah kesukaan, anggur dua, jeruk enam, apel empat, dan pisang tiga. Diagram turus diberi judul supaya pembaca tahu data apa yang disajikan.

_Alur:_ Membuat diagram turus → Membaca diagram turus

**6. Membaca Diagram Turus** 🔍  
Untuk membaca diagram turus, hitung garis pada setiap baris. Baris dengan turus paling panjang menunjukkan data paling banyak, dan baris dengan turus paling pendek menunjukkan data paling sedikit. Pada hewan ternak Paman Halim, bebek paling banyak, yaitu sebelas. Dua baris yang sama panjang berarti datanya sama banyak, seperti lili dan aster yang sama-sama empat.

_Alur:_ Membaca diagram turus → Lebihnya dan kurangnya

**7. Lebihnya dan Kurangnya** ⚖️  
Dari diagram turus kita bisa membandingkan dua data. Ayam sepuluh dan bebek sebelas, jadi banyak bebek satu lebihnya dari banyak ayam, dan banyak ayam satu kurangnya dari banyak bebek. Kambing delapan dan sapi enam, jadi kambing dua lebihnya dari sapi, dan sapi dua kurangnya dari kambing. Selisihnya dicari dengan menghitung garis yang berbeda atau dengan mengurangkan bilangan.

_Alur:_ Lebihnya dan kurangnya → Mengumpulkan data sendiri

**8. Mengumpulkan Data Sendiri** 🧑‍🤝‍🧑  
Kita bisa membuat data sendiri dengan bertanya kepada teman, misalnya kepada lima belas teman tentang buah kesukaan. Setiap jawaban langsung ditulis satu garis pada baris yang tepat. Setelah selesai, hitung setiap baris, lalu jawab pertanyaan: buah apa yang paling disukai dan berapa banyak anak yang menyukainya. Mencatat dengan tertib membuat data tidak tertukar dan hasilnya dapat dipercaya.

_Alur:_ Mengumpulkan data sendiri → Siap membuat diagram turus

## 6. Tahap 3: Infografis

**Panel 1. Apa Itu Data?** 🗂️ (2, Dua)

> Data adalah keterangan tentang banyak benda. Buah yang dibawa ke sekolah adalah contoh data. Data bisa disajikan dengan diagram turus dan diagram gambar.

**Panel 2. Mengelompokkan Data** 🧺 (4, Empat)

> Kelompokkan benda menurut jenisnya, yaitu anggur, jeruk, apel, dan pisang. Lalu hitung setiap kelompok satu per satu.

**Panel 3. Tanda Turus** ✏️ (3, Tiga)

> Satu garis tegak menunjukkan satu benda. Dua garis menunjukkan dua benda, dan tiga garis menunjukkan tiga benda.

**Panel 4. Kelompok Lima** 🖐️ (2, Dua)

> Lima benda ditulis empat garis tegak dan satu coretan miring. Setiap lima turus dikelompokkan supaya mudah dihitung.

**Panel 5. Turus Buah Kesukaan** 🍊 (4, Empat)

> Anggur dua, jeruk enam, apel empat, dan pisang tiga. Jeruk adalah buah yang paling disukai.

**Panel 6. Turus Hewan Ternak** 🐔 (4, Empat)

> Ayam sepuluh, kambing delapan, sapi enam, dan bebek sebelas. Bebek adalah hewan yang paling banyak.

**Panel 7. Membaca Diagram Turus** 🔍 (3, Tiga)

> Hitung garis pada setiap baris. Turus paling panjang berarti paling banyak, dan turus paling pendek berarti paling sedikit.

**Panel 8. Lebihnya dan Kurangnya** ⚖️ (2, Dua)

> Bebek sebelas dan ayam sepuluh. Banyak bebek satu lebihnya dari banyak ayam, dan banyak ayam satu kurangnya dari banyak bebek.

**Panel 9. Cara Membuat Diagram Turus** 📝 (4, Empat)

> Empat langkah membuat diagram turus. Satu, kelompokkan data. Dua, tulis satu garis untuk satu benda. Tiga, kelompokkan setiap lima turus. Empat, tulis banyaknya.

**Panel 10. Pentingnya Makan Buah** 🥗 (4, Empat)

> Buah adalah sumber vitamin, sumber air, obat luar, dan membantu mencegah penyakit. Ayo, kita makan buah setiap hari.

## 7. Tahap 4, 5, dan 6: tiga puluh permainan

| No | Tahap | Permainan | Jenis | Ronde |
|---|---|---|---|---|
| 1 | Concrete | Kelompokkan Benda | `sort-objects-by-kind` | ronde 1: buah: anggur 2, apel 3, pisang 3; ronde 2: hewan: ayam 3, kambing 3, sapi 2; ronde 3: sayur: wortel 3, jagung 2, brokoli 3 |
| 2 | Concrete | Hitung Tiap Jenis | `count-each-kind` | ronde 1: ayam 10, bebek 11; ronde 2: mainan balok 7, boneka 4; ronde 3: wortel 6, bayam 4 |
| 3 | Concrete | Catat Turus | `record-tally-stream` | ronde 1: buah: anggur 2, jeruk 4, apel 3; 9 data; ronde 2: hewan: ayam 3, kambing 2, bebek 4; 9 data; ronde 3: kue: kue cucur 4, lemper 2, kue talam 3; 9 data |
| 4 | Concrete | Buat Turus dari Benda | `make-tally-from-objects` | ronde 1: apel 4, pisang 3; ronde 2: kambing 8, sapi 6; ronde 3: kelereng 6, jagung 3 |
| 5 | Concrete | Jodohkan Benda dan Turus | `match-objects-tally` | ronde 1: buah: anggur 2, pisang 3, apel 4; ronde 2: mainan: mobil-mobilan 2, boneka 4, kelereng 6; ronde 3: sayur: jagung 3, wortel 6, brokoli 7 |
| 6 | Concrete | Memori Benda dan Turus | `memory-objects-tally` | ronde 1: buah: anggur 2, jeruk 6, apel 4, pisang 3; ronde 2: hewan: ayam 10, kambing 8, sapi 6, bebek 11; ronde 3: sayur: brokoli 7, bayam 4, wortel 6, jagung 3 |
| 7 | Concrete | Paling Banyak, Paling Sedikit | `most-least-objects` | ronde 1: buah: paling banyak jeruk, paling sedikit anggur; ronde 2: hewan: paling banyak bebek, paling sedikit sapi; ronde 3: sayur: paling banyak brokoli, paling sedikit jagung |
| 8 | Concrete | Urutkan Kelompok Benda | `order-object-groups` | ronde 1: mobil-mobilan 2, boneka 4, kelereng 6, mainan balok 7 (dari paling sedikit); ronde 2: jeruk 6, apel 4, anggur 2 (dari paling banyak); ronde 3: lemper 3, onde-onde 5, kue cucur 6, kue talam 7 (dari paling sedikit) |
| 9 | Concrete | Lebihnya dan Kurangnya | `more-less-objects` | ronde 1: bebek 11 dan ayam 10: selisih 1; kambing 8 dan sapi 6: selisih 2; ronde 2: mainan balok 7 dan mobil-mobilan 2: selisih 5; kelereng 6 dan boneka 4: selisih 2; ronde 3: brokoli 7 dan jagung 3: selisih 4; wortel 6 dan jagung 3: selisih 3 |
| 10 | Concrete | Kartu Turus ke Kotak Benda | `tally-card-to-box` | ronde 1: buah: anggur 2, apel 4, pisang 3; ronde 2: mainan: mobil-mobilan 2, boneka 4, kelereng 6; ronde 3: bunga: mawar 7, tulip 5, lili 4 |
| 11 | Picture | Baca Turus | `read-tally` | ronde 1: anggur 2, jeruk 6; ronde 2: ayam 10, kambing 8; ronde 3: bebek 11, sapi 6 |
| 12 | Picture | Lengkapi Kolom Banyak | `fill-count-column` | ronde 1: buah: anggur 2, jeruk 6, apel 4, pisang 3; ronde 2: mainan: mobil-mobilan 2, boneka 4, kelereng 6, mainan balok 7; ronde 3: kue: kue cucur 6, onde-onde 5, lemper 3, kue talam 7 |
| 13 | Picture | Gambar Turus | `draw-tally` | ronde 1: 3 = 3 garis, belum ada kelompok lima, 8 = 1 kelompok lima dan 3 garis; ronde 2: 5 = 1 kelompok lima, tanpa sisa, 9 = 1 kelompok lima dan 4 garis; ronde 3: 12 = 2 kelompok lima dan 2 garis, 6 = 1 kelompok lima dan 1 garis |
| 14 | Picture | Turus yang Tepat | `pick-right-tally` | ronde 1: 6, 4; ronde 2: 9, 7; ronde 3: 12, 5 |
| 15 | Picture | Jodohkan Turus dan Bilangan | `match-tally-numeral` | ronde 1: 3, 6, 9; ronde 2: 4, 7, 10; ronde 3: 5, 8, 12 |
| 16 | Picture | Memori Turus dan Bilangan | `memory-tally-numeral` | ronde 1: 3, 6, 8, 11; ronde 2: 4, 7, 9, 12; ronde 3: 2, 5, 10, 13 |
| 17 | Picture | Kelompok Lima dan Sisa | `groups-of-five` | ronde 1: 7 = 1 kelompok lima dan 2 garis, 12 = 2 kelompok lima dan 2 garis; ronde 2: 8 = 1 kelompok lima dan 3 garis, 13 = 2 kelompok lima dan 3 garis; ronde 3: 6 = 1 kelompok lima dan 1 garis, 9 = 1 kelompok lima dan 4 garis |
| 18 | Picture | Urutkan Turus | `order-tally` | ronde 1: 3, 5, 8, 11 (dari paling sedikit; tampil 3, 8, 5, 11); ronde 2: 9, 6, 4, 2 (dari paling banyak; tampil 6, 2, 9, 4); ronde 3: 4, 7, 10, 12 (dari paling sedikit; tampil 12, 7, 4, 10) |
| 19 | Picture | Pilah Turus | `sort-tally-five` | ronde 1: kurang dari 5: 3, 4, 2; 5 atau lebih: 7, 9, 6; ronde 2: kurang dari 5: 1, 3, 4; 5 atau lebih: 8, 5, 10; ronde 3: kurang dari 5: 2, 3, 4; 5 atau lebih: 11, 6, 9 |
| 20 | Picture | Garis Bilangan: Lebihnya dan Kurangnya | `number-line-more-less` | ronde 1: Banyak ayam ada 10. Banyak bebek 1 lebihnya dari banyak ayam. Ketuk banyak bebek. jawaban 11; Banyak kambing ada 8. Banyak sapi 2 kurangnya dari banyak kambing. Ketuk banyak sapi. jawaban 6; ronde 2: Banyak boneka ada 4. Banyak kelereng 2 lebihnya dari banyak boneka. Ketuk banyak kelereng. jawaban 6; Banyak mainan balok ada 7. Banyak boneka 3 kurangnya dari banyak mainan balok. Ketuk banyak boneka. jawaban 4; ronde 3: Banyak wortel ada 6. Banyak brokoli 1 lebihnya dari banyak wortel. Ketuk banyak brokoli. jawaban 7; Banyak brokoli ada 7. Banyak bayam 3 kurangnya dari banyak brokoli. Ketuk banyak bayam. jawaban 4 |
| 21 | Abstract | Jodohkan Nama dan Banyaknya | `match-name-quantity` | ronde 1: kue: lemper 3, onde-onde 5, kue cucur 6; ronde 2: bunga: tulip 5, mawar 7, lili 4; ronde 3: pasar: semangka 1, apel 3, jeruk 7 |
| 22 | Abstract | Lengkapi Kalimat Data | `complete-data-sentences` | ronde 1: Ada 4 anak yang suka bermain karet. Ada 6 anak yang suka bermain lompat tali. Ada 7 anak yang suka bermain benteng.; ronde 2: Ada 7 siswa yang suka warna merah. Ada 5 siswa yang suka warna biru. Ada 2 siswa yang suka warna hitam. |
| 23 | Abstract | Susun Kalimat Data | `build-data-sentence` | ronde 1: Banyak bebek 1 lebihnya dari banyak ayam; ronde 2: Tanda I pada diagram turus menunjukkan satu benda; ronde 3: Setiap lima turus dikelompokkan dengan coretan miring; ronde 4: Hewan yang paling banyak di peternakan adalah bebek |
| 24 | Abstract | Isi Tabel Turus | `fill-tally-table` | ronde 1: Hewan Ternak Paman Halim: Ayam=10, Kambing=8, Sapi=6, Bebek=11; ronde 2: Sayur Kesukaan: Brokoli=7, Bayam=4, Wortel=6, Jagung=3; ronde 3: Warna Kesukaan Siswa Kelas II: Merah=7, Kuning=3, Biru=5, Hitam=2 |
| 25 | Abstract | Benar atau Salah: Data | `true-false-data` | ronde 1: 5 pernyataan, 3 benar; ronde 2: 5 pernyataan, 3 benar |
| 26 | Abstract | Detektif Data | `riddle-data-clues` | soal 1 (hewan): Banyakku lebih dari 8. Banyakku kurang dari 11. jawaban ayam; soal 2 (mainan): Aku yang paling banyak. Banyakku lebih dari 6. jawaban mainan balok; soal 3 (sayur): Banyakku 3 lebihnya dari banyak jagung. Banyakku kurang dari 7. jawaban wortel; soal 4 (bunga): Banyakku 3 lebihnya dari banyak lili. jawaban mawar |
| 27 | Abstract | Peta Konsep Turus | `concept-map-fill` | Diagram turus; Membaca dan membuat data |
| 28 | Abstract | Urutkan Data | `order-data` | ronde 1: kue talam 7, kue cucur 6, onde-onde 5, lemper 3 (dari paling banyak); ronde 2: jagung 3, bayam 4, wortel 6, brokoli 7 (dari paling sedikit); ronde 3: bebek 11, ayam 10, kambing 8, sapi 6 (dari paling banyak) |
| 29 | Abstract | Ketuk Semua yang Cocok | `select-all-data` | ronde 1: lebih dari 8 (hewan): ayam, bebek; ronde 2: kurang dari 6 (kue): onde-onde, lemper; ronde 3: lebih dari 3 (warna): merah, biru |
| 30 | Abstract | Hitung Jumlah Data | `add-data-total` | ronde 1: Berapa jumlah mangga dan pisang pada buah dalam parsel? 8; Berapa jumlah apel dan jeruk pada buah dalam parsel? 7; ronde 2: Berapa jumlah semua data pada buah dalam parsel? 15; Berapa jumlah semua data pada mainan kesukaan? 19; ronde 3: Berapa jumlah brokoli dan jagung pada sayur kesukaan? 10; Berapa jumlah kue cucur dan kue talam pada kue kesukaan? 13 |

### Permainan 1. Kelompokkan Benda (Concrete)

- **Rujukan buku.** hlm. 228 (buah yang dibawa Lili dikelompokkan menurut jenisnya)
- **Tujuan.** Mengelompokkan benda campuran menurut jenisnya sebelum dihitung.
- **Cara main.** Tiga ronde, tiap ronde delapan benda campur (buah, hewan, sayur) dan tiga kotak jenis. Siswa menyeret atau mengetuk benda ke kotak jenisnya. Benda yang salah kotak memberi petunjuk dan kembali.
- **Ronde.** ronde 1: buah: anggur 2, apel 3, pisang 3; ronde 2: hewan: ayam 3, kambing 3, sapi 2; ronde 3: sayur: wortel 3, jagung 2, brokoli 3
- **Panduan suara.** Pilah benda ke kotak jenisnya.

### Permainan 2. Hitung Tiap Jenis (Concrete)

- **Rujukan buku.** hlm. 228 dan 231 (menghitung buah dan hewan satu per satu)
- **Tujuan.** Menghitung banyak benda dari satu jenis lalu memilih bilangannya.
- **Cara main.** Tiga ronde, tiap ronde dua soal. Gambar menampilkan satu jenis benda dalam baris lima-lima, misalnya sepuluh ayam atau sebelas bebek. Siswa memilih banyaknya dari tiga angka.
- **Ronde.** ronde 1: ayam 10, bebek 11; ronde 2: mainan balok 7, boneka 4; ronde 3: wortel 6, bayam 4
- **Panduan suara.** Hitung bendanya lima-lima.

### Permainan 3. Catat Turus (Concrete)

- **Rujukan buku.** hlm. 228–229 (setiap data ditulis satu garis turus)
- **Tujuan.** Mencatat data yang datang satu per satu dengan turus.
- **Cara main.** Tiga ronde. Data muncul satu per satu sebagai gambar benda. Siswa mengetuk baris jenis yang sesuai, dan satu garis turus ditulis. Garis kelima otomatis mencoret miring. Salah baris memberi petunjuk.
- **Ronde.** ronde 1: buah: anggur 2, jeruk 4, apel 3; 9 data; ronde 2: hewan: ayam 3, kambing 2, bebek 4; 9 data; ronde 3: kue: kue cucur 4, lemper 2, kue talam 3; 9 data
- **Panduan suara.** Ketuk baris yang cocok, satu garis untuk satu benda.

### Permainan 4. Buat Turus dari Benda (Concrete)

- **Rujukan buku.** hlm. 229 dan 234 (turus dibuat dari banyak benda)
- **Tujuan.** Membuat turus yang banyaknya sama dengan banyak benda nyata.
- **Cara main.** Tiga ronde, tiap ronde dua soal. Siswa menghitung benda pada gambar, lalu menekan tombol tambah goresan sampai turusnya sama banyak, dan menekan Periksa.
- **Ronde.** ronde 1: apel 4, pisang 3; ronde 2: kambing 8, sapi 6; ronde 3: kelereng 6, jagung 3
- **Panduan suara.** Hitung bendanya, lalu tulis turusnya.

### Permainan 5. Jodohkan Benda dan Turus (Concrete)

- **Rujukan buku.** hlm. 229 (turus menunjukkan banyak benda)
- **Tujuan.** Menjodohkan kelompok benda dengan turus yang banyaknya sama.
- **Cara main.** Tiga ronde, tiap ronde tiga kelompok benda dan tiga gambar turus. Siswa mengetuk kelompok benda, lalu mengetuk turus yang cocok. Pasangan benar terkunci.
- **Ronde.** ronde 1: buah: anggur 2, pisang 3, apel 4; ronde 2: mainan: mobil-mobilan 2, boneka 4, kelereng 6; ronde 3: sayur: jagung 3, wortel 6, brokoli 7
- **Panduan suara.** Ketuk benda, lalu ketuk turusnya.

### Permainan 6. Memori Benda dan Turus (Concrete)

- **Rujukan buku.** hlm. 229 dan 232 (benda dan turus yang sama banyak)
- **Tujuan.** Mencocokkan kelompok benda dengan turusnya lewat permainan memori.
- **Cara main.** Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): kelompok benda dan turus yang sama banyak. Siswa membalik dua kartu dan mencari pasangannya.
- **Ronde.** ronde 1: buah: anggur 2, jeruk 6, apel 4, pisang 3; ronde 2: hewan: ayam 10, kambing 8, sapi 6, bebek 11; ronde 3: sayur: brokoli 7, bayam 4, wortel 6, jagung 3
- **Panduan suara.** Balik dua kartu, cari benda dan turusnya.

### Permainan 7. Paling Banyak, Paling Sedikit (Concrete)

- **Rujukan buku.** hlm. 227 dan 232 (buah apa yang paling disukai; hewan yang paling banyak)
- **Tujuan.** Menemukan kelompok benda yang paling banyak dan paling sedikit.
- **Cara main.** Tiga ronde, tiap ronde empat kelompok benda dan dua pertanyaan: paling banyak, lalu paling sedikit. Siswa mengetuk kelompoknya. Letak kunci berpindah.
- **Ronde.** ronde 1: buah: paling banyak jeruk, paling sedikit anggur; ronde 2: hewan: paling banyak bebek, paling sedikit sapi; ronde 3: sayur: paling banyak brokoli, paling sedikit jagung
- **Panduan suara.** Ketuk kelompok yang paling banyak atau sedikit.

### Permainan 8. Urutkan Kelompok Benda (Concrete)

- **Rujukan buku.** hlm. 232 dan 234 (membandingkan banyak data)
- **Tujuan.** Mengurutkan kelompok benda dari yang paling sedikit atau paling banyak.
- **Cara main.** Tiga ronde, tiap ronde tiga atau empat kelompok benda bertanda huruf. Siswa mengetuk kelompok satu per satu menurut urutan banyaknya. Letak jawaban berpindah.
- **Ronde.** ronde 1: mobil-mobilan 2, boneka 4, kelereng 6, mainan balok 7 (dari paling sedikit); ronde 2: jeruk 6, apel 4, anggur 2 (dari paling banyak); ronde 3: lemper 3, onde-onde 5, kue cucur 6, kue talam 7 (dari paling sedikit)
- **Panduan suara.** Ketuk kelompok menurut banyaknya.

### Permainan 9. Lebihnya dan Kurangnya (Concrete)

- **Rujukan buku.** hlm. 232 (banyak bebek 1 lebihnya dari banyak ayam)
- **Tujuan.** Menentukan selisih banyak dua kelompok benda.
- **Cara main.** Tiga ronde, tiap ronde dua soal. Dua kelompok benda ditampilkan berdampingan, misalnya bebek dan ayam. Siswa mengatur penghitung sampai sama dengan selisihnya, lalu menekan Periksa.
- **Ronde.** ronde 1: bebek 11 dan ayam 10: selisih 1; kambing 8 dan sapi 6: selisih 2; ronde 2: mainan balok 7 dan mobil-mobilan 2: selisih 5; kelereng 6 dan boneka 4: selisih 2; ronde 3: brokoli 7 dan jagung 3: selisih 4; wortel 6 dan jagung 3: selisih 3
- **Panduan suara.** Cari berapa lebihnya.

### Permainan 10. Kartu Turus ke Kotak Benda (Concrete)

- **Rujukan buku.** hlm. 229 (turus dan banyak benda)
- **Tujuan.** Menaruh kartu turus ke kotak benda yang banyaknya sama.
- **Cara main.** Tiga ronde, tiap ronde tiga kartu turus dan tiga kotak berisi gambar benda. Siswa mengetuk kartu turus, lalu mengetuk kotak yang banyak bendanya sama. Letak kartu berpindah.
- **Ronde.** ronde 1: buah: anggur 2, apel 4, pisang 3; ronde 2: mainan: mobil-mobilan 2, boneka 4, kelereng 6; ronde 3: bunga: mawar 7, tulip 5, lili 4
- **Panduan suara.** Ketuk kartu, lalu ketuk kotaknya.

### Permainan 11. Baca Turus (Picture)

- **Rujukan buku.** hlm. 229 dan 232 (membaca banyak data dari turus)
- **Tujuan.** Membaca banyak data dari turus lalu menuliskan banyaknya.
- **Cara main.** Tiga ronde, tiap ronde dua soal. Gambar menampilkan turus. Siswa mengatur penghitung sampai sama dengan banyak garis, lalu menekan Periksa.
- **Ronde.** ronde 1: anggur 2, jeruk 6; ronde 2: ayam 10, kambing 8; ronde 3: bebek 11, sapi 6
- **Panduan suara.** Hitung turusnya, lalu tulis banyaknya.

### Permainan 12. Lengkapi Kolom Banyak (Picture)

- **Rujukan buku.** hlm. 234 (lengkapi diagram turus dengan mengisi kolom paling kanan)
- **Tujuan.** Melengkapi kolom banyaknya pada diagram turus.
- **Cara main.** Tiga tabel dengan empat baris. Tiap baris menampilkan nama dan turus. Baris yang menyala menunggu bilangan. Siswa memilih satu dari kartu bilangan yang tepat.
- **Ronde.** ronde 1: buah: anggur 2, jeruk 6, apel 4, pisang 3; ronde 2: mainan: mobil-mobilan 2, boneka 4, kelereng 6, mainan balok 7; ronde 3: kue: kue cucur 6, onde-onde 5, lemper 3, kue talam 7
- **Panduan suara.** Isi kolom banyaknya.

### Permainan 13. Gambar Turus (Picture)

- **Rujukan buku.** hlm. 229 dan 235 (menulis turus dari data)
- **Tujuan.** Menggambar turus dengan banyak garis yang diminta.
- **Cara main.** Tiga ronde, tiap ronde dua soal. Siswa menambah goresan satu per satu sampai sama dengan bilangan yang diminta. Goresan kelima otomatis mencoret miring.
- **Ronde.** ronde 1: 3 = 3 garis, belum ada kelompok lima, 8 = 1 kelompok lima dan 3 garis; ronde 2: 5 = 1 kelompok lima, tanpa sisa, 9 = 1 kelompok lima dan 4 garis; ronde 3: 12 = 2 kelompok lima dan 2 garis, 6 = 1 kelompok lima dan 1 garis
- **Panduan suara.** Tulis garis turus sebanyak bilangannya.

### Permainan 14. Turus yang Tepat (Picture)

- **Rujukan buku.** hlm. 229 (turus yang menunjukkan banyak data)
- **Tujuan.** Memilih turus yang banyaknya sama dengan bilangan yang disebut.
- **Cara main.** Tiga ronde, tiap ronde dua soal. Siswa membaca bilangan, lalu mengetuk satu dari empat gambar turus. Pengecoh berbeda satu atau dua garis.
- **Ronde.** ronde 1: 6, 4; ronde 2: 9, 7; ronde 3: 12, 5
- **Panduan suara.** Ketuk turus yang sama dengan bilangannya.

### Permainan 15. Jodohkan Turus dan Bilangan (Picture)

- **Rujukan buku.** hlm. 229 dan 232 (turus menjadi bilangan)
- **Tujuan.** Menjodohkan turus dengan lambang bilangannya.
- **Cara main.** Tiga ronde, tiap ronde tiga turus dan tiga bilangan. Siswa mengetuk turus, lalu mengetuk bilangan yang cocok. Pasangan benar terkunci hijau.
- **Ronde.** ronde 1: 3, 6, 9; ronde 2: 4, 7, 10; ronde 3: 5, 8, 12
- **Panduan suara.** Ketuk turus, lalu ketuk bilangannya.

### Permainan 16. Memori Turus dan Bilangan (Picture)

- **Rujukan buku.** hlm. 229 (turus dan banyaknya)
- **Tujuan.** Mencocokkan turus dengan bilangannya lewat permainan memori.
- **Cara main.** Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): gambar turus dan lambang bilangan. Siswa membalik dua kartu dan mencari pasangannya.
- **Ronde.** ronde 1: 3, 6, 8, 11; ronde 2: 4, 7, 9, 12; ronde 3: 2, 5, 10, 13
- **Panduan suara.** Balik dua kartu, cari turus dan bilangannya.

### Permainan 17. Kelompok Lima dan Sisa (Picture)

- **Rujukan buku.** hlm. 229 (kita mengelompokkan setiap 5 data)
- **Tujuan.** Menyebut banyak kelompok lima dan sisa garis pada sebuah turus.
- **Cara main.** Tiga ronde, tiap ronde dua soal. Gambar menampilkan turus. Siswa memilih satu dari tiga kalimat, misalnya satu kelompok lima dan dua garis. Pengecoh menukar atau menambah satu.
- **Ronde.** ronde 1: 7 = 1 kelompok lima dan 2 garis, 12 = 2 kelompok lima dan 2 garis; ronde 2: 8 = 1 kelompok lima dan 3 garis, 13 = 2 kelompok lima dan 3 garis; ronde 3: 6 = 1 kelompok lima dan 1 garis, 9 = 1 kelompok lima dan 4 garis
- **Panduan suara.** Hitung kelompok lima, lalu sisa garisnya.

### Permainan 18. Urutkan Turus (Picture)

- **Rujukan buku.** hlm. 232 (membandingkan banyak data)
- **Tujuan.** Mengurutkan turus dari yang paling sedikit atau paling banyak.
- **Cara main.** Tiga ronde, tiap ronde empat gambar turus. Siswa mengetuk turus satu per satu menurut urutan banyaknya. Letak jawaban berpindah.
- **Ronde.** ronde 1: 3, 5, 8, 11 (dari paling sedikit; tampil 3, 8, 5, 11); ronde 2: 9, 6, 4, 2 (dari paling banyak; tampil 6, 2, 9, 4); ronde 3: 4, 7, 10, 12 (dari paling sedikit; tampil 12, 7, 4, 10)
- **Panduan suara.** Ketuk turus menurut urutannya.

### Permainan 19. Pilah Turus (Picture)

- **Rujukan buku.** hlm. 229 (kelompok lima ditandai coretan miring)
- **Tujuan.** Memilah turus menjadi kurang dari lima dan lima atau lebih.
- **Cara main.** Tiga ronde, tiap ronde enam gambar turus dan dua kotak: kurang dari lima, serta lima atau lebih. Siswa menyeret atau mengetuk turus ke kotak yang tepat.
- **Ronde.** ronde 1: kurang dari 5: 3, 4, 2; 5 atau lebih: 7, 9, 6; ronde 2: kurang dari 5: 1, 3, 4; 5 atau lebih: 8, 5, 10; ronde 3: kurang dari 5: 2, 3, 4; 5 atau lebih: 11, 6, 9
- **Panduan suara.** Pilah turus ke kotak yang tepat.

### Permainan 20. Garis Bilangan: Lebihnya dan Kurangnya (Picture)

- **Rujukan buku.** hlm. 232 (1 lebihnya dan 2 kurangnya)
- **Tujuan.** Menemukan banyak data yang sekian lebihnya atau kurangnya pada garis bilangan.
- **Cara main.** Tiga ronde, tiap ronde dua soal. Siswa membaca banyak data awal, misalnya ayam sepuluh, lalu mengetuk banyak bebek yang satu lebihnya pada garis bilangan.
- **Ronde.** ronde 1: Banyak ayam ada 10. Banyak bebek 1 lebihnya dari banyak ayam. Ketuk banyak bebek. jawaban 11; Banyak kambing ada 8. Banyak sapi 2 kurangnya dari banyak kambing. Ketuk banyak sapi. jawaban 6; ronde 2: Banyak boneka ada 4. Banyak kelereng 2 lebihnya dari banyak boneka. Ketuk banyak kelereng. jawaban 6; Banyak mainan balok ada 7. Banyak boneka 3 kurangnya dari banyak mainan balok. Ketuk banyak boneka. jawaban 4; ronde 3: Banyak wortel ada 6. Banyak brokoli 1 lebihnya dari banyak wortel. Ketuk banyak brokoli. jawaban 7; Banyak brokoli ada 7. Banyak bayam 3 kurangnya dari banyak brokoli. Ketuk banyak bayam. jawaban 4
- **Panduan suara.** Ketuk bilangan yang diminta pada garis.

### Permainan 21. Jodohkan Nama dan Banyaknya (Abstract)

- **Rujukan buku.** hlm. 229 dan 236 (nama data dan banyaknya)
- **Tujuan.** Menjodohkan nama data dengan banyaknya.
- **Cara main.** Tiga ronde, tiap ronde tiga pasang, misalnya lemper dan 3. Siswa mengetuk nama di kiri, lalu mengetuk bilangan yang cocok di kanan.
- **Ronde.** ronde 1: kue: lemper 3, onde-onde 5, kue cucur 6; ronde 2: bunga: tulip 5, mawar 7, lili 4; ronde 3: pasar: semangka 1, apel 3, jeruk 7
- **Panduan suara.** Ketuk nama, lalu ketuk bilangannya.

### Permainan 22. Lengkapi Kalimat Data (Abstract)

- **Rujukan buku.** hlm. 236–237 (lengkapi setiap kalimat berikut sesuai dengan diagram)
- **Tujuan.** Melengkapi kalimat tentang data dengan bilangan yang tepat.
- **Cara main.** Dua ronde, tiap ronde tiga kalimat, misalnya ada ... anak yang suka karet. Siswa memilih satu dari tiga bilangan. Kalimat lengkap dibacakan.
- **Ronde.** ronde 1: Ada 4 anak yang suka bermain karet. Ada 6 anak yang suka bermain lompat tali. Ada 7 anak yang suka bermain benteng.; ronde 2: Ada 7 siswa yang suka warna merah. Ada 5 siswa yang suka warna biru. Ada 2 siswa yang suka warna hitam.
- **Panduan suara.** Pilih bilangan untuk bagian kosong.

### Permainan 23. Susun Kalimat Data (Abstract)

- **Rujukan buku.** hlm. 232 (informasi dari diagram turus)
- **Tujuan.** Menyusun kata menjadi kalimat tentang diagram turus.
- **Cara main.** Empat kalimat, misalnya banyak bebek satu lebihnya dari banyak ayam. Kartu kata diketuk berurutan. Satu kartu pengecoh tidak dipakai.
- **Ronde.** ronde 1: Banyak bebek 1 lebihnya dari banyak ayam; ronde 2: Tanda I pada diagram turus menunjukkan satu benda; ronde 3: Setiap lima turus dikelompokkan dengan coretan miring; ronde 4: Hewan yang paling banyak di peternakan adalah bebek
- **Panduan suara.** Ketuk kata menjadi kalimat yang benar.

### Permainan 24. Isi Tabel Turus (Abstract)

- **Rujukan buku.** hlm. 229 dan 234 (nama dan banyaknya)
- **Tujuan.** Mengisi kolom banyaknya pada tabel data.
- **Cara main.** Tiga tabel dengan empat baris, misalnya hewan ternak. Siswa mengetuk baris, lalu mengetuk kartu bilangan yang tepat.
- **Ronde.** ronde 1: Hewan Ternak Paman Halim: Ayam=10, Kambing=8, Sapi=6, Bebek=11; ronde 2: Sayur Kesukaan: Brokoli=7, Bayam=4, Wortel=6, Jagung=3; ronde 3: Warna Kesukaan Siswa Kelas II: Merah=7, Kuning=3, Biru=5, Hitam=2
- **Panduan suara.** Isi tabel dengan kartu bilangan.

### Permainan 25. Benar atau Salah: Data (Abstract)

- **Rujukan buku.** hlm. 228–237 (turus, kelompok lima, dan membaca data)
- **Tujuan.** Menilai pernyataan tentang diagram turus.
- **Cara main.** Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan dihitung dari data, dan tiap jawaban diberi penjelasan singkat.
- **Ronde.** ronde 1: 5 pernyataan, 3 benar; ronde 2: 5 pernyataan, 3 benar
- **Panduan suara.** Baca pernyataan, lalu pilih benar atau salah.

### Permainan 26. Detektif Data (Abstract)

- **Rujukan buku.** hlm. 232 (hewan yang paling banyak; lebihnya dan kurangnya)
- **Tujuan.** Menemukan kategori data dari dua petunjuk.
- **Cara main.** Empat soal. Siswa membaca petunjuk seperti banyakku lebih dari delapan dan kurang dari sebelas, lalu memilih satu dari tiga nama. Hanya satu yang cocok dengan semua petunjuk.
- **Ronde.** soal 1 (hewan): Banyakku lebih dari 8. Banyakku kurang dari 11. jawaban ayam; soal 2 (mainan): Aku yang paling banyak. Banyakku lebih dari 6. jawaban mainan balok; soal 3 (sayur): Banyakku 3 lebihnya dari banyak jagung. Banyakku kurang dari 7. jawaban wortel; soal 4 (bunga): Banyakku 3 lebihnya dari banyak lili. jawaban mawar
- **Panduan suara.** Baca semua petunjuk, lalu pilih namanya.

### Permainan 27. Peta Konsep Turus (Abstract)

- **Rujukan buku.** hlm. 226 (peta konsep: diagram turus dan diagram gambar)
- **Tujuan.** Melengkapi peta konsep diagram turus dan cara membacanya.
- **Cara main.** Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala.
- **Ronde.** Diagram turus; Membaca dan membuat data
- **Panduan suara.** Pilih kartu yang tepat untuk kotak yang menyala.

### Permainan 28. Urutkan Data (Abstract)

- **Rujukan buku.** hlm. 232 (membandingkan banyak data)
- **Tujuan.** Mengurutkan nama data menurut banyaknya.
- **Cara main.** Tiga ronde, tiap ronde empat nama beserta banyaknya, misalnya jeruk 6. Siswa mengetuk satu per satu dari yang paling banyak atau paling sedikit. Letak jawaban berpindah.
- **Ronde.** ronde 1: kue talam 7, kue cucur 6, onde-onde 5, lemper 3 (dari paling banyak); ronde 2: jagung 3, bayam 4, wortel 6, brokoli 7 (dari paling sedikit); ronde 3: bebek 11, ayam 10, kambing 8, sapi 6 (dari paling banyak)
- **Panduan suara.** Ketuk menurut banyaknya.

### Permainan 29. Ketuk Semua yang Cocok (Abstract)

- **Rujukan buku.** hlm. 232 dan 236 (membandingkan dengan sebuah bilangan)
- **Tujuan.** Memilih semua data yang memenuhi sebuah syarat.
- **Cara main.** Tiga ronde, tiap ronde empat nama dan satu perintah, misalnya banyaknya lebih dari delapan. Siswa mengetuk semua yang cocok, lalu menekan Periksa.
- **Ronde.** ronde 1: lebih dari 8 (hewan): ayam, bebek; ronde 2: kurang dari 6 (kue): onde-onde, lemper; ronde 3: lebih dari 3 (warna): merah, biru
- **Panduan suara.** Ketuk semua yang cocok, lalu periksa.

### Permainan 30. Hitung Jumlah Data (Abstract)

- **Rujukan buku.** hlm. 244 (jumlah buah dan jumlah semua buah dalam parsel)
- **Tujuan.** Menjumlahkan banyak dua atau lebih data.
- **Cara main.** Tiga ronde, tiap ronde dua soal, misalnya jumlah apel dan jeruk, atau jumlah semua buah. Siswa mengatur penghitung sampai sama dengan jumlahnya, lalu menekan Periksa.
- **Ronde.** ronde 1: Berapa jumlah mangga dan pisang pada buah dalam parsel? 8; Berapa jumlah apel dan jeruk pada buah dalam parsel? 7; ronde 2: Berapa jumlah semua data pada buah dalam parsel? 15; Berapa jumlah semua data pada mainan kesukaan? 19; ronde 3: Berapa jumlah brokoli dan jagung pada sayur kesukaan? 10; Berapa jumlah kue cucur dan kue talam pada kue kesukaan? 13
- **Panduan suara.** Jumlahkan datanya, lalu tulis hasilnya.

## 8. Poin Penting dan Catatanku

- 🧺 **Kelompokkan dulu**: benda sejenis dikumpulkan, lalu dihitung. _Suara:_ Kelompokkan benda menurut jenisnya, lalu hitung setiap kelompok satu per satu.
- ✏️ **Satu garis, satu benda**: turus seperti lidi. _Suara:_ Pada diagram turus, satu garis tegak menunjukkan satu benda.
- 🖐️ **Kelompok lima**: empat garis dan satu coretan miring. _Suara:_ Lima benda ditulis empat garis tegak dan satu coretan miring, supaya mudah dihitung.
- 🔍 **Membaca diagram**: turus terpanjang paling banyak. _Suara:_ Turus yang paling panjang menunjukkan data yang paling banyak, dan turus yang paling pendek menunjukkan data yang paling sedikit.
- ⚖️ **Lebihnya dan kurangnya**: bebek 11, ayam 10: bebek 1 lebihnya. _Suara:_ Kita membandingkan dua data dengan kata lebihnya dan kurangnya, misalnya banyak bebek satu lebihnya dari banyak ayam.

**Suara Poin Penting.** Ingat selalu! Kelompokkan benda menurut jenisnya sebelum menghitung. Pada diagram turus, satu garis tegak menunjukkan satu benda, dan setiap lima turus dikelompokkan dengan coretan miring. Turus yang paling panjang menunjukkan data yang paling banyak. Kita membandingkan dua data dengan kata lebihnya dan kurangnya.

**Cara menyebutkan.** data bandingkan lebihnya kurangnya. _Suara:_ Cara menyebutkan. Ada sepuluh ayam dan sebelas bebek. Banyak bebek satu lebihnya dari banyak ayam. Sebut datanya, lalu bandingkan, lalu katakan lebihnya atau kurangnya.

**Ayo Mencoba di rumah.** Ayo Mencoba di rumah: tanyakan kepada lima belas orang di sekitarmu tentang buah kesukaan mereka, misalnya keluarga dan tetangga. Tulis satu garis turus untuk setiap jawaban, kelompokkan setiap lima turus, lalu hitung. Ceritakan buah apa yang paling disukai dan berapa banyak yang menyukainya.

**Refleksi (Catatanku).**

- Aku dapat membaca diagram turus.
- Aku dapat membuat diagram turus dari data.
- Aku belajar dengan tertib.
- Aku menyampaikan pendapat dengan percaya diri.

## 9. Metode dari luar buku yang diadopsi

- **Gerbang lima (five-bar gate)**: turus dikelompokkan lima-lima dengan empat garis tegak dan satu coretan miring. Cara ini dipakai di banyak negara untuk menghitung cepat tanpa kehilangan hitungan. Dasar permainan Catat Turus, Baca Turus, dan Kelompok Lima dan Sisa.
- **Survei kelas (data dari diri sendiri)**: siswa bertanya kepada lima belas teman lalu mencatat jawaban satu per satu. Alur data datang satu per satu pada permainan Catat Turus meniru pengalaman ini.
- **Kelompokkan dulu, hitung kemudian**: benda dipilah menurut jenisnya sebelum dihitung supaya tidak ada yang terlewat atau terhitung dua kali. Dasar permainan Kelompokkan Benda.
- **Tabel frekuensi sederhana**: kolom nama, turus, dan banyaknya. Siswa melihat bahwa turus dan bilangan menyatakan hal yang sama. Dasar permainan Lengkapi Kolom Banyak dan Isi Tabel Turus.
- **Pertanyaan bertingkat membaca data**: dari membaca satu baris, membandingkan dua baris (lebihnya dan kurangnya), sampai menjumlahkan beberapa baris. Dasar permainan Hitung Jumlah Data dan Lebihnya dan Kurangnya.
- **Detektif data (deduksi dari petunjuk)**: petunjuk seperti paling banyak, lebih dari, dan kurang dari menyisakan satu kategori. Setiap soal diperiksa uji otomatis agar hanya satu yang cocok.

## 10. Batas yang diketahui

- Soal Latihan (30 poin), soal Ujian (70 poin), dan Simulasi belum dibuat. Pemilik akan menugaskannya terpisah. Sampai saat itu tab Latihan dan Ujian menampilkan kartu "sedang disiapkan".
- Suara dan ketukan video diuji dengan suara perangkat di Chrome desktop berukuran ponsel. Pada sebagian Android, tombol Jeda tidak menghentikan suara di tengah kalimat (Web Speech `pause()` tidak didukung merata).
- Laju 0,70 dan nada 1 sama untuk Bu Sari dan Pak Budi. Beda guru hanya pada suara yang dipilih perangkat (wanita atau pria). Perangkat yang hanya punya satu suara Indonesia akan membuat kedua guru terdengar serupa.
- Ucapan memakai kata, bukan lambang, supaya suara perangkat tidak salah membaca.
- Tiga puluh permainan per sub-bab memakai sepuluh jenis per tahap. Mesin yang sama (urut ketuk, pilih bertahap, jodohkan, ketuk semua, memori) dipakai lintas tahap dengan isi yang berbeda: benda nyata di Concrete, diagram di Picture, kata dan angka di Abstract.
- Angka kumpulan data buah, hewan ternak, mainan, sayur, bunga, parsel, kue, permainan tradisional, warna, pelari, dan kaleng mengikuti buku siswa dan dicek dengan kunci jawaban Buku Panduan Guru. Data olahraga, cara berangkat ke sekolah, dan sebagian pilihan permainan adalah contoh tambahan yang dibuat untuk pengayaan.
- Turus digambar dengan garis kelima mencoret miring (gerbang lima). Pada layar kecil, turus dengan lebih dari tiga belas goresan tidak dipakai.

