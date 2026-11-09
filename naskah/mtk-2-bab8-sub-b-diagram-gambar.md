# Naskah Matematika Kelas 2 SD, Bab 8: Berbagai Diagram, Sub-Bab B: Diagram Gambar

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k2b8.ts` dan `src/components/modul/data-k2b8.ts`, oleh `scripts/buat-naskah-md-k2b8.mjs`. Isi mengikuti Buku Siswa Matematika Kelas II (Kemendikbudristek, Kurikulum Merdeka, Bab 8 hlm. 225–250) dan Buku Panduan Guru Bab 8 (kunci jawaban dan langkah pembelajaran), serta diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.

## 1. Identitas modul

| Butir | Isi |
|---|---|
| Modul | `mtk-2-bab8`, sub-bab B |
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

**Capaian Pembelajaran (CP).** Siswa membaca, menginterpretasikan, dan menyajikan data dalam bentuk diagram gambar dengan maksimal empat kategori, serta mempresentasikan hasilnya dengan percaya diri.

**Rujukan.** Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 8: Berbagai Diagram, Sub-Bab B hlm. 238–250) dan Buku Panduan Guru Bab 8 Subbab B.

**Sasaran.** Siswa membaca data dalam bentuk diagram gambar maksimal empat kategori, menginterpretasikan data itu (paling banyak, sama banyak, lebihnya, kurangnya, dan jumlah), serta menyajikan data dengan membuat diagram gambar: satu gambar mewakili satu benda, gambar dalam satu diagram sama bentuk dan ukurannya, baris dibaca dari kiri ke kanan, dan keterangan ditulis di bawah diagram.

**Suara Silabus.** Kita belajar diagram gambar. Kita kembali ke data buah kesukaan Lili dan teman-temannya, lalu menandai setiap buah dengan bintang berwarna. Setiap gambar mewakili satu benda. Kita membuat diagram gambar rangkaian bunga Tika, kue kesukaan teman-teman Kira, permainan tradisional yang disukai Upe, dan warna kesukaan siswa kelas dua. Kita juga belajar membaca diagram untuk mencari yang paling banyak, yang lebihnya, yang kurangnya, dan jumlahnya. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.

## 3. Peta enam tahap SMICPA dan bobotnya

| Tahap | Isi | Banyak butir |
|---|---|---|
| S. Story | Video animasi HTML/SVG, tiga video. Tiap video diputar satu per satu saat diketuk (tidak ada putar otomatis) | 3 video, 9 adegan, 36 ketukan |
| M. Mind-Map | Peta pikiran berurutan, tiap cabang bisa diketuk dan uraiannya tampil di layar | 8 langkah |
| I. Infografis | Poster rangkuman, suara di tiap panel | 10 panel |
| C. Concrete | Benda nyata: tempel gambar benda, susun diagram gambar, baca baris, bandingkan baris | 10 permainan |
| P. Picture | Diagram polos: baris bintang, lingkaran, hati, atau wajah tersenyum, tabel diagram, garis bilangan | 10 permainan |
| A. Abstract | Kata dan angka: kalimat data, benar-salah, tabel, detektif, peta konsep, urutkan | 10 permainan |

Bobot mengikuti isi buku. Aturan Concrete dan Picture berlaku: gambar benda hanya di Concrete, Picture hanya diagram tanpa gambar benda (turus, lambang polos, tabel, garis bilangan).

## 4. Tahap 1: Story (video animasi, menggantikan slide)

Tidak ada video yang berjalan sendiri. Siswa mengetuk **▶ Putar** pada satu video. Video itu berjalan, dan video lain berhenti. Setiap kalimat adalah satu ketukan: dibacakan Suara Guru perangkat, dan gambar berubah mengikuti kalimat yang sedang dibacakan. Ada tombol Jeda, Ulang, dan Suara hidup atau mati.

### Video 1: Bintang untuk Buah (Dari turus ke diagram gambar)

**Adegan 1. Mengingat data buah** (`K2B8B-V1-1`)

1. Ingatkah kalian dengan buah kesukaan Lili dan teman-temannya?  
   _Papan layar:_ Ingat buah kesukaan?
2. Data itu juga dapat disajikan dengan diagram gambar.  
   _Papan layar:_ Bisa dengan diagram gambar
3. Kita beri tanda bintang biru untuk anggur, jingga untuk jeruk, merah untuk apel, dan hijau untuk pisang.  
   _Papan layar:_ Setiap buah diberi bintang
4. Lalu kita hitung banyak setiap buah.  
   _Papan layar:_ Hitung tiap buah

**Adegan 2. Satu bintang, satu buah** (`K2B8B-V1-2`)

1. Setiap bintang mewakili satu buah. Dua buah anggur digambar dengan dua bintang biru.  
   _Papan layar:_ Satu bintang, satu buah
2. Enam buah jeruk digambar dengan enam bintang jingga.  
   _Papan layar:_ Jeruk: enam bintang
3. Empat buah apel digambar dengan empat bintang merah, dan tiga buah pisang digambar dengan tiga bintang hijau.  
   _Papan layar:_ Apel empat, pisang tiga
4. Semua bintang diberi ukuran dan jarak yang sama supaya adil.  
   _Papan layar:_ Ukuran dan jarak sama

**Adegan 3. Gambar lain pun boleh** (`K2B8B-V1-3`)

1. Selain bintang, kita boleh memakai gambar lain seperti lingkaran, hati, atau wajah tersenyum.  
   _Papan layar:_ Lingkaran, hati, wajah
2. Yang penting, satu gambar mewakili satu benda.  
   _Papan layar:_ Satu gambar, satu benda
3. Gambar yang dipakai harus sama di seluruh diagram.  
   _Papan layar:_ Gambar harus sama
4. Tulis keterangannya, misalnya setiap gambar mewakili satu anak.  
   _Papan layar:_ Tulis keterangan

### Video 2: Rangkaian Bunga Tika (Membuat dan membaca diagram gambar)

**Adegan 1. Tika merangkai bunga** (`K2B8B-V2-1`)

1. Tika sedang membuat rangkaian bunga bersama ibunya.  
   _Papan layar:_ Tika merangkai bunga
2. Ada bunga mawar, lili, tulip, dan aster di dalam rangkaian itu.  
   _Papan layar:_ Mawar, lili, tulip, aster
3. Kita hitung banyak setiap jenis bunga dengan teliti.  
   _Papan layar:_ Hitung dengan teliti
4. Lalu kita sajikan dalam diagram gambar.  
   _Papan layar:_ Sajikan dalam diagram

**Adegan 2. Membuat diagram bunga** (`K2B8B-V2-2`)

1. Mawar ada tujuh, jadi digambar tujuh bunga.  
   _Papan layar:_ Mawar: tujuh gambar
2. Lili ada empat, jadi digambar empat bunga.  
   _Papan layar:_ Lili: empat gambar
3. Tulip ada lima dan aster ada empat.  
   _Papan layar:_ Tulip lima, aster empat
4. Diagram gambar membuat kita mudah melihat jenis bunga yang paling banyak.  
   _Papan layar:_ Mudah melihat paling banyak

**Adegan 3. Membaca diagram bunga** (`K2B8B-V2-3`)

1. Bunga yang paling banyak adalah mawar.  
   _Papan layar:_ Paling banyak: mawar
2. Lili dan aster sama banyak, yaitu empat.  
   _Papan layar:_ Lili dan aster sama banyak
3. Banyak tulip satu lebihnya dari banyak lili.  
   _Papan layar:_ Tulip 1 lebihnya dari lili
4. Banyak aster tiga kurangnya dari banyak mawar.  
   _Papan layar:_ Aster 3 kurangnya

### Video 3: Kue, Permainan, dan Pelari (Membaca berbagai diagram gambar)

**Adegan 1. Kue kesukaan** (`K2B8B-V3-1`)

1. Kira mendata kue kesukaan teman-teman sekelasnya.  
   _Papan layar:_ Kue kesukaan Kira
2. Kue cucur enam anak, onde-onde lima anak, lemper tiga anak, dan kue talam tujuh anak.  
   _Papan layar:_ Cucur 6, onde 5
3. Setiap bintang mewakili satu anak.  
   _Papan layar:_ Satu bintang, satu anak
4. Kue talam paling banyak disukai.  
   _Papan layar:_ Paling banyak: kue talam

**Adegan 2. Permainan tradisional** (`K2B8B-V3-2`)

1. Upe mendata permainan tradisional yang disukai teman-temannya.  
   _Papan layar:_ Permainan tradisional
2. Empat anak suka karet dan enam anak suka lompat tali.  
   _Papan layar:_ Karet 4, lompat tali 6
3. Lima anak suka petak umpet dan tujuh anak suka benteng.  
   _Papan layar:_ Petak umpet 5, benteng 7
4. Kita buat diagram gambar. Setiap gambar mewakili satu anak.  
   _Papan layar:_ Buat diagram gambar

**Adegan 3. Para pelari** (`K2B8B-V3-3`)

1. Para siswa kelas dua berlari mengelilingi lapangan. Ada empat belas siswa.  
   _Papan layar:_ Empat belas siswa berlari
2. Lima siswa berlari satu putaran, tiga siswa dua putaran, empat siswa tiga putaran, dan dua siswa empat putaran.  
   _Papan layar:_ Satu sampai empat putaran
3. Siswa yang berlari lebih dari dua putaran adalah empat ditambah dua, yaitu enam siswa.  
   _Papan layar:_ Lebih dari dua putaran: enam
4. Membaca diagram dengan teliti membantu kita menjawab banyak pertanyaan.  
   _Papan layar:_ Baca dengan teliti

## 5. Tahap 2: Mind-Map (peta pikiran)

**1. Dari Turus ke Gambar** 🔁  
Data yang sama dapat disajikan dengan cara berbeda. Pada sub-bab sebelumnya buah kesukaan Lili dan teman-temannya disajikan dengan turus. Sekarang data itu kita sajikan dengan diagram gambar. Isinya tetap sama: anggur dua, jeruk enam, apel empat, dan pisang tiga. Yang berubah hanya bentuk penyajiannya, dari garis menjadi gambar.

_Alur:_ Dari turus ke gambar → Satu gambar satu benda

**2. Satu Gambar, Satu Benda** ⭐  
Pada diagram gambar, satu gambar mewakili satu benda. Dua buah anggur digambar dengan dua bintang, dan enam buah jeruk digambar dengan enam bintang. Karena itu kita menghitung banyak data dengan menghitung banyak gambar pada baris itu. Keterangan di bawah diagram, misalnya setiap gambar mewakili satu anak, wajib ditulis supaya pembaca tidak keliru.

_Alur:_ Satu gambar satu benda → Memilih lambang

**3. Memilih Lambang** 🎨  
Kita boleh memakai gambar apa saja sebagai lambang: bintang, lingkaran, hati, atau wajah tersenyum. Syaratnya, semua gambar dalam satu diagram harus sama bentuk dan ukurannya, serta tersusun rapi dengan jarak yang sama. Bila warna dipakai, warna menandai jenis data. Misalnya bintang biru untuk anggur dan bintang jingga untuk jeruk. Lambang yang rapi membuat diagram mudah dibaca.

_Alur:_ Memilih lambang → Membuat diagram gambar

**4. Membuat Diagram Gambar** 🖍️  
Untuk membuat diagram gambar, mulailah dengan menghitung data setiap jenis. Tulis nama jenis pada kolom kiri. Lalu gambar lambang pada kolom kanan sebanyak datanya, mulai dari paling kiri dan tanpa celah. Terakhir tulis judul diagram dan keterangan satu gambar mewakili berapa. Rangkaian bunga Tika menghasilkan mawar tujuh gambar, lili empat, tulip lima, dan aster empat.

_Alur:_ Membuat diagram gambar → Membaca diagram gambar

**5. Membaca Diagram Gambar** 📖  
Membaca diagram gambar dimulai dari judul, lalu keterangan, lalu nama pada kolom kiri, dan terakhir menghitung gambar pada setiap baris. Pada diagram kue kesukaan, kue cucur enam, onde-onde lima, lemper tiga, dan kue talam tujuh. Hitunglah gambar satu per satu dari kiri ke kanan supaya tidak ada yang terlewat, lalu jawab pertanyaan berdasarkan hasil hitungan.

_Alur:_ Membaca diagram gambar → Membandingkan baris

**6. Membandingkan Baris** 📏  
Baris yang paling panjang menunjukkan data paling banyak, dan baris yang paling pendek menunjukkan data paling sedikit. Dua baris yang sama panjang menunjukkan data sama banyak, seperti lili dan aster yang sama-sama empat. Untuk mencari lebihnya dan kurangnya, bandingkan dua baris: banyak tulip satu lebihnya dari banyak lili, dan banyak aster tiga kurangnya dari banyak mawar.

_Alur:_ Membandingkan baris → Menjumlahkan data

**7. Menjumlahkan Data** ➕  
Diagram juga dapat dipakai untuk mencari jumlah. Pada parsel buah Ibu, jeruk empat, apel tiga, pisang enam, dan mangga dua. Jumlah apel dan jeruk adalah tujuh, jumlah mangga dan pisang adalah delapan, dan jumlah semua buah adalah lima belas. Pada diagram para pelari, siswa yang berlari lebih dari dua putaran adalah empat ditambah dua, yaitu enam siswa.

_Alur:_ Menjumlahkan data → Menyajikan data

**8. Menyajikan Data** 🎤  
Pada kegiatan Ayo Berkarya kita mewawancarai dua puluh teman tentang kue tradisional kesukaan. Hasilnya ditulis lebih dulu dalam diagram turus, lalu disajikan dalam diagram gambar. Setelah itu kita menyimpulkan kue apa yang disukai teman-teman dan kue apa yang paling banyak disukai, kemudian mempresentasikan hasilnya di depan kelas dengan percaya diri dan suara yang jelas.

_Alur:_ Menyajikan data → Siap membuat diagram gambar

## 6. Tahap 3: Infografis

**Panel 1. Dari Turus ke Gambar** 🔁 (2, Dua)

> Data yang sama bisa disajikan dengan turus dan dengan gambar. Isinya tetap sama, hanya bentuk penyajiannya yang berbeda.

**Panel 2. Bintang Mewakili Satu** ⭐ (2, Dua)

> Satu bintang mewakili satu buah. Dua anggur digambar dengan dua bintang, dan enam jeruk digambar dengan enam bintang.

**Panel 3. Diagram Gambar Buah** 🍎 (4, Empat)

> Anggur dua bintang biru, jeruk enam bintang jingga, apel empat bintang merah, dan pisang tiga bintang hijau.

**Panel 4. Gambar Lain Boleh** 🎨 (4, Empat)

> Selain bintang, kita boleh memakai lingkaran, hati, atau wajah tersenyum. Yang penting satu gambar mewakili satu benda.

**Panel 5. Diagram Gambar Bunga** 💐 (4, Empat)

> Mawar tujuh, lili empat, tulip lima, dan aster empat. Bunga yang paling banyak adalah mawar.

**Panel 6. Cara Membuat Diagram Gambar** 🖍️ (4, Empat)

> Empat langkah membuat diagram gambar. Satu, hitung data setiap jenis. Dua, tulis nama jenis. Tiga, gambar lambang sebanyak datanya. Empat, tulis judul dan keterangan.

**Panel 7. Membaca Diagram Gambar** 📖 (3, Tiga)

> Baca judul dan keterangan lebih dulu. Lalu hitung gambar pada setiap baris dari kiri ke kanan. Baris terpanjang berarti paling banyak.

**Panel 8. Turus dan Gambar Berdampingan** 🪜 (2, Dua)

> Jeruk enam ditulis satu kelompok lima dan satu garis pada turus, dan enam bintang pada diagram gambar. Banyaknya sama.

**Panel 9. Menjumlahkan Data** ➕ (3, Tiga)

> Jumlah apel dan jeruk pada parsel Ibu adalah tujuh, jumlah mangga dan pisang adalah delapan, dan jumlah semua buah adalah lima belas.

**Panel 10. Mempresentasikan Data** 🎤 (3, Tiga)

> Tiga langkah mempresentasikan data. Satu, sebutkan judul diagram. Dua, ceritakan yang paling banyak dan paling sedikit. Tiga, ceritakan lebihnya dan kurangnya.

## 7. Tahap 4, 5, dan 6: tiga puluh permainan

| No | Tahap | Permainan | Jenis | Ronde |
|---|---|---|---|---|
| 1 | Concrete | Tempel Gambar | `stick-pictures` | ronde 1: bunga: mawar 4, lili 2, tulip 3; ronde 2: pasar: apel 3, jeruk 4, alpukat 2; ronde 3: parsel: jeruk 4, apel 3, pisang 2 |
| 2 | Concrete | Kelompokkan ke Baris | `sort-to-rows` | ronde 1: kue: kue cucur 2, lemper 3, kue talam 3; ronde 2: bunga: mawar 3, tulip 3, aster 2; ronde 3: olahraga: sepak bola 3, renang 2, basket 3 |
| 3 | Concrete | Susun Diagram Gambar | `build-picture-diagram` | ronde 1: buah: anggur 2, jeruk 6, apel 4, pisang 3; ronde 2: kue: kue cucur 6, onde-onde 5, lemper 3, kue talam 7; ronde 3: bunga: mawar 7, lili 4, tulip 5, aster 4 |
| 4 | Concrete | Jodohkan Benda dan Baris | `match-objects-row` | ronde 1: buah: anggur 2, pisang 3, apel 4; ronde 2: mainan: mobil-mobilan 2, boneka 4, kelereng 6; ronde 3: sayur: jagung 3, wortel 6, brokoli 7 |
| 5 | Concrete | Memori Benda dan Baris Gambar | `memory-objects-row` | ronde 1: buah: anggur 2, jeruk 6, apel 4, pisang 3; ronde 2: kue: kue cucur 6, onde-onde 5, lemper 3, kue talam 7; ronde 3: sayur: brokoli 7, bayam 4, wortel 6, jagung 3 |
| 6 | Concrete | Baca Diagram Gambar | `read-picture-diagram` | ronde 1: jeruk 6, pisang 3; ronde 2: kue talam 7, lemper 3; ronde 3: brokoli 7, jagung 3 |
| 7 | Concrete | Baris Terbanyak dan Tersedikit | `most-least-row` | ronde 1: kue: paling banyak kue talam, paling sedikit lemper; ronde 2: hewan: paling banyak bebek, paling sedikit sapi; ronde 3: sayur: paling banyak brokoli, paling sedikit jagung |
| 8 | Concrete | Lebihnya dan Kurangnya pada Diagram | `more-less-diagram` | ronde 1: kue talam 7 dan lemper 3: selisih 4; kue cucur 6 dan onde-onde 5: selisih 1; ronde 2: pisang 6 dan mangga 2: selisih 4; jeruk 4 dan apel 3: selisih 1; ronde 3: jeruk 7 dan apel 3: selisih 4; alpukat 3 dan semangka 1: selisih 2 |
| 9 | Concrete | Urutkan Baris Gambar | `order-rows` | ronde 1: kue talam 7, kue cucur 6, onde-onde 5, lemper 3 (dari paling banyak); ronde 2: mobil-mobilan 2, boneka 4, kelereng 6, mainan balok 7 (dari paling sedikit); ronde 3: jeruk 6, apel 4, pisang 3, anggur 2 (dari paling banyak) |
| 10 | Concrete | Kartu Benda ke Baris Gambar | `object-card-to-row` | ronde 1: buah: anggur 2, apel 4, pisang 3; ronde 2: kue: lemper 3, onde-onde 5, kue cucur 6; ronde 3: sayur: jagung 3, bayam 4, wortel 6 |
| 11 | Picture | Baca Baris Lambang | `read-symbol-row` | ronde 1: 6, 4; ronde 2: 7, 5; ronde 3: 9, 3 |
| 12 | Picture | Warnai Diagram dari Tabel | `color-diagram-from-table` | ronde 1: warna: merah 7, kuning 3, biru 5, hitam 2; ronde 2: permainan: karet 4, lompat tali 6, petak umpet 5, benteng 7; ronde 3: berangkat: naik sepeda 4, diantar motor 6, jalan kaki 7, diantar mobil 3 |
| 13 | Picture | Diagram yang Tepat | `pick-right-diagram` | ronde 1: 5, 7; ronde 2: 4, 8; ronde 3: 6, 3 |
| 14 | Picture | Jodohkan Diagram dan Bilangan | `match-diagram-numeral` | ronde 1: 2, 5, 7; ronde 2: 3, 6, 8; ronde 3: 4, 7, 9 |
| 15 | Picture | Memori Diagram dan Bilangan | `memory-diagram-numeral` | ronde 1: 2, 5, 7, 9; ronde 2: 3, 4, 6, 8; ronde 3: 1, 5, 6, 8 |
| 16 | Picture | Urutkan Baris Lambang | `order-symbol-rows` | ronde 1: 2, 4, 6, 8 (dari paling sedikit; tampil 4, 8, 2, 6); ronde 2: 9, 7, 5, 3 (dari paling banyak; tampil 7, 3, 9, 5); ronde 3: 1, 3, 5, 8 (dari paling sedikit; tampil 5, 1, 8, 3) |
| 17 | Picture | Baca Diagram Lengkap | `read-full-diagram` | ronde 1: warna banyak biru, warna paling; ronde 2: kaleng paling, kaleng jumlah; ronde 3: lari jumlah, lari banyak p1 |
| 18 | Picture | Lengkapi Banyak pada Diagram | `fill-count-pictogram` | ronde 1: warna: merah 7, kuning 3, biru 5, hitam 2; ronde 2: permainan: karet 4, lompat tali 6, petak umpet 5, benteng 7; ronde 3: kaleng: cokelat 6, hijau 4, oranye 5, biru 3 |
| 19 | Picture | Garis Bilangan pada Diagram | `number-line-diagram` | ronde 1: Banyak lili ada 4. Banyak tulip 1 lebihnya dari banyak lili. Ketuk banyak tulip. jawaban 5; Banyak mawar ada 7. Banyak aster 3 kurangnya dari banyak mawar. Ketuk banyak aster. jawaban 4; ronde 2: Banyak lemper ada 3. Banyak onde-onde 2 lebihnya dari banyak lemper. Ketuk banyak onde-onde. jawaban 5; Banyak kue talam ada 7. Banyak kue cucur 1 kurangnya dari banyak kue talam. Ketuk banyak kue cucur. jawaban 6; ronde 3: Banyak hitam ada 2. Banyak kuning 1 lebihnya dari banyak hitam. Ketuk banyak kuning. jawaban 3; Banyak merah ada 7. Banyak biru 2 kurangnya dari banyak merah. Ketuk banyak biru. jawaban 5 |
| 20 | Picture | Pilah Baris | `sort-rows` | ronde 1: kurang dari 5: 3, 4, 2; 5 atau lebih: 7, 9, 6; ronde 2: kurang dari 5: 1, 3, 4; 5 atau lebih: 8, 5, 7; ronde 3: kurang dari 5: 2, 3; 5 atau lebih: 6, 9, 5, 8 |
| 21 | Abstract | Jodohkan Pasangan dan Selisih | `match-pair-difference` | ronde 1: mawar 7 dan tulip 5: selisih 2; tulip 5 dan lili 4: selisih 1; mawar 7 dan lili 4: selisih 3; ronde 2: kue talam 7 dan onde-onde 5: selisih 2; kue cucur 6 dan lemper 3: selisih 3; kue talam 7 dan lemper 3: selisih 4; ronde 3: merah 7 dan kuning 3: selisih 4; biru 5 dan hitam 2: selisih 3; merah 7 dan biru 5: selisih 2 |
| 22 | Abstract | Lengkapi Kalimat Lebihnya | `complete-more-less-sentences` | ronde 1: bunga tulip lebihnya 1 dari bunga lili; bunga aster kurangnya 3 dari bunga mawar; buah pisang lebihnya 4 dari buah mangga; ronde 2: buah apel kurangnya 3 dari buah pisang; penyuka warna merah lebihnya 5 dari penyuka warna hitam; kaleng hijau kurangnya 2 dari kaleng cokelat |
| 23 | Abstract | Susun Kalimat Diagram Gambar | `build-diagram-sentence` | ronde 1: Setiap gambar mewakili satu benda; ronde 2: Diagram gambar menyajikan data dengan gambar yang sama; ronde 3: Penyuka warna biru dua lebihnya dari penyuka warna hitam; ronde 4: Warna merah paling banyak disukai siswa kelas dua |
| 24 | Abstract | Buat Diagram dari Kalimat Data | `build-diagram-from-words` | ronde 1: permainan: karet 4, lompat tali 6, petak umpet 5, benteng 7; ronde 2: olahraga: sepak bola 5, bulu tangkis 7, renang 3, basket 4; ronde 3: berangkat: naik sepeda 4, diantar motor 6, jalan kaki 7, diantar mobil 3 |
| 25 | Abstract | Benar atau Salah: Diagram | `true-false-diagram` | ronde 1: 5 pernyataan, 3 benar; ronde 2: 5 pernyataan, 4 benar |
| 26 | Abstract | Detektif Diagram | `riddle-diagram-clues` | soal 1 (kue): Aku yang paling banyak. Banyakku lebih dari 6. jawaban kue talam; soal 2 (warna): Banyakku 2 kurangnya dari banyak merah. Banyakku lebih dari 4. jawaban biru; soal 3 (permainan): Banyakku 1 lebihnya dari banyak karet. Banyakku kurang dari 6. jawaban petak umpet; soal 4 (kaleng): Aku yang paling sedikit. Banyakku kurang dari 4. jawaban biru |
| 27 | Abstract | Peta Konsep Diagram Gambar | `concept-map-fill-b` | Diagram gambar; Membaca diagram |
| 28 | Abstract | Urutkan Data Diagram | `order-diagram-data` | ronde 1: merah 7, biru 5, kuning 3, hitam 2 (dari paling banyak); ronde 2: karet 4, petak umpet 5, lompat tali 6, benteng 7 (dari paling sedikit); ronde 3: cokelat 6, oranye 5, hijau 4, biru 3 (dari paling banyak) |
| 29 | Abstract | Ketuk Semua pada Diagram | `select-all-diagram` | ronde 1: kurang dari 6 (warna): kuning, biru, hitam; ronde 2: lebih dari 5 (permainan): lompat tali, benteng; ronde 3: lebih dari 4 (buahgambar): pisang, jeruk |
| 30 | Abstract | Hitung Jumlah pada Diagram | `add-diagram-total` | ronde 1: Berapa jumlah merah dan kuning pada warna kesukaan siswa kelas ii? 10; Berapa jumlah biru dan hitam pada warna kesukaan siswa kelas ii? 7; ronde 2: Berapa jumlah 3 putaran dan 4 putaran pada siswa yang berlari? 6; Berapa jumlah semua data pada siswa yang berlari? 14; ronde 3: Berapa jumlah kue cucur dan onde-onde pada kue kesukaan? 11; Berapa jumlah semua data pada kue kesukaan? 21 |

### Permainan 1. Tempel Gambar (Concrete)

- **Rujukan buku.** hlm. 238 dan 241 (tandai buah dengan bintang; tempelkan gambar sebanyak data)
- **Tujuan.** Menempel satu gambar untuk setiap data yang datang.
- **Cara main.** Tiga ronde. Data muncul satu per satu sebagai gambar benda. Siswa mengetuk baris jenis yang sesuai, dan satu gambar benda ditempel pada diagram baris itu. Salah baris memberi petunjuk.
- **Ronde.** ronde 1: bunga: mawar 4, lili 2, tulip 3; ronde 2: pasar: apel 3, jeruk 4, alpukat 2; ronde 3: parsel: jeruk 4, apel 3, pisang 2
- **Panduan suara.** Ketuk baris yang cocok, tempel satu gambar.

### Permainan 2. Kelompokkan ke Baris (Concrete)

- **Rujukan buku.** hlm. 238 (buah dikelompokkan menurut jenis)
- **Tujuan.** Memilah benda campuran ke baris jenisnya sebelum digambar.
- **Cara main.** Tiga ronde, tiap ronde delapan benda campur dan tiga kotak jenis. Siswa menyeret atau mengetuk benda ke kotak jenisnya. Benda yang salah kotak memberi petunjuk.
- **Ronde.** ronde 1: kue: kue cucur 2, lemper 3, kue talam 3; ronde 2: bunga: mawar 3, tulip 3, aster 2; ronde 3: olahraga: sepak bola 3, renang 2, basket 3
- **Panduan suara.** Pilah benda ke baris jenisnya.

### Permainan 3. Susun Diagram Gambar (Concrete)

- **Rujukan buku.** hlm. 239–240 (diagram gambar buah dan bunga)
- **Tujuan.** Menyusun diagram gambar dari kelompok benda nyata.
- **Cara main.** Tiga ronde. Tiap baris menampilkan kelompok benda di kiri dan sel kosong di kanan. Siswa mengetuk sel untuk mengisi gambar sampai sama dengan banyak benda, lalu menekan Periksa.
- **Ronde.** ronde 1: buah: anggur 2, jeruk 6, apel 4, pisang 3; ronde 2: kue: kue cucur 6, onde-onde 5, lemper 3, kue talam 7; ronde 3: bunga: mawar 7, lili 4, tulip 5, aster 4
- **Panduan suara.** Isi gambar sebanyak bendanya.

### Permainan 4. Jodohkan Benda dan Baris (Concrete)

- **Rujukan buku.** hlm. 239 (diagram gambar menunjukkan banyak benda)
- **Tujuan.** Menjodohkan kelompok benda dengan baris gambar yang banyaknya sama.
- **Cara main.** Tiga ronde, tiap ronde tiga kelompok benda dan tiga baris gambar. Siswa mengetuk benda, lalu mengetuk baris yang cocok. Pasangan benar terkunci.
- **Ronde.** ronde 1: buah: anggur 2, pisang 3, apel 4; ronde 2: mainan: mobil-mobilan 2, boneka 4, kelereng 6; ronde 3: sayur: jagung 3, wortel 6, brokoli 7
- **Panduan suara.** Ketuk benda, lalu ketuk barisnya.

### Permainan 5. Memori Benda dan Baris Gambar (Concrete)

- **Rujukan buku.** hlm. 239 dan 242 (benda dan diagram gambar)
- **Tujuan.** Mencocokkan kelompok benda dengan baris gambar lewat permainan memori.
- **Cara main.** Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): kelompok benda dan baris gambar yang sama banyak. Siswa membalik dua kartu.
- **Ronde.** ronde 1: buah: anggur 2, jeruk 6, apel 4, pisang 3; ronde 2: kue: kue cucur 6, onde-onde 5, lemper 3, kue talam 7; ronde 3: sayur: brokoli 7, bayam 4, wortel 6, jagung 3
- **Panduan suara.** Balik dua kartu, cari benda dan barisnya.

### Permainan 6. Baca Diagram Gambar (Concrete)

- **Rujukan buku.** hlm. 239 dan 242 (membaca diagram gambar)
- **Tujuan.** Membaca banyak data dari diagram gambar yang memakai gambar benda.
- **Cara main.** Tiga ronde, tiap ronde dua soal. Diagram gambar empat baris ditampilkan dengan gambar benda sebagai lambang. Siswa memilih banyaknya dari tiga angka.
- **Ronde.** ronde 1: jeruk 6, pisang 3; ronde 2: kue talam 7, lemper 3; ronde 3: brokoli 7, jagung 3
- **Panduan suara.** Hitung gambar pada baris yang ditanya.

### Permainan 7. Baris Terbanyak dan Tersedikit (Concrete)

- **Rujukan buku.** hlm. 242 dan 247 (kue yang paling banyak disukai)
- **Tujuan.** Menemukan baris gambar yang paling banyak dan paling sedikit.
- **Cara main.** Tiga ronde, tiap ronde dua pertanyaan: paling banyak, lalu paling sedikit. Siswa mengetuk barisnya pada diagram bergambar benda. Letak kunci berpindah.
- **Ronde.** ronde 1: kue: paling banyak kue talam, paling sedikit lemper; ronde 2: hewan: paling banyak bebek, paling sedikit sapi; ronde 3: sayur: paling banyak brokoli, paling sedikit jagung
- **Panduan suara.** Ketuk baris yang paling panjang atau pendek.

### Permainan 8. Lebihnya dan Kurangnya pada Diagram (Concrete)

- **Rujukan buku.** hlm. 242–244 (selisih banyak data)
- **Tujuan.** Menghitung selisih banyak dua baris pada diagram bergambar benda.
- **Cara main.** Tiga ronde, tiap ronde dua soal. Dua baris dari diagram ditampilkan, misalnya kue talam dan lemper. Siswa mengatur penghitung sampai sama dengan selisihnya.
- **Ronde.** ronde 1: kue talam 7 dan lemper 3: selisih 4; kue cucur 6 dan onde-onde 5: selisih 1; ronde 2: pisang 6 dan mangga 2: selisih 4; jeruk 4 dan apel 3: selisih 1; ronde 3: jeruk 7 dan apel 3: selisih 4; alpukat 3 dan semangka 1: selisih 2
- **Panduan suara.** Cari berapa lebihnya.

### Permainan 9. Urutkan Baris Gambar (Concrete)

- **Rujukan buku.** hlm. 242 (membandingkan baris gambar)
- **Tujuan.** Mengurutkan baris gambar benda dari yang paling sedikit atau paling banyak.
- **Cara main.** Tiga ronde, tiap ronde tiga atau empat baris bergambar benda. Siswa mengetuk baris satu per satu menurut urutan banyaknya. Letak jawaban berpindah.
- **Ronde.** ronde 1: kue talam 7, kue cucur 6, onde-onde 5, lemper 3 (dari paling banyak); ronde 2: mobil-mobilan 2, boneka 4, kelereng 6, mainan balok 7 (dari paling sedikit); ronde 3: jeruk 6, apel 4, pisang 3, anggur 2 (dari paling banyak)
- **Panduan suara.** Ketuk baris menurut banyaknya.

### Permainan 10. Kartu Benda ke Baris Gambar (Concrete)

- **Rujukan buku.** hlm. 239 (banyak benda dan banyak gambar sama)
- **Tujuan.** Menaruh kartu kelompok benda ke baris bintang yang banyaknya sama.
- **Cara main.** Tiga ronde, tiap ronde tiga kartu kelompok benda dan tiga baris bintang. Siswa mengetuk kartu, lalu mengetuk baris yang banyak bintangnya sama. Letak kartu berpindah.
- **Ronde.** ronde 1: buah: anggur 2, apel 4, pisang 3; ronde 2: kue: lemper 3, onde-onde 5, kue cucur 6; ronde 3: sayur: jagung 3, bayam 4, wortel 6
- **Panduan suara.** Ketuk kartu, lalu ketuk barisnya.

### Permainan 11. Baca Baris Lambang (Picture)

- **Rujukan buku.** hlm. 239 dan 245 (membaca diagram gambar)
- **Tujuan.** Membaca banyak data dari satu baris lambang.
- **Cara main.** Tiga ronde, tiap ronde dua soal. Gambar menampilkan satu baris lambang (bintang, lingkaran, atau hati). Siswa mengatur penghitung sampai sama dengan banyak lambang.
- **Ronde.** ronde 1: 6, 4; ronde 2: 7, 5; ronde 3: 9, 3
- **Panduan suara.** Hitung lambangnya, lalu tulis banyaknya.

### Permainan 12. Warnai Diagram dari Tabel (Picture)

- **Rujukan buku.** hlm. 241 dan 243 (buat diagram gambar dari data)
- **Tujuan.** Menyusun diagram gambar dari tabel bilangan.
- **Cara main.** Tiga ronde. Tiap baris menampilkan nama dan banyaknya. Siswa mengetuk sel untuk mengisi lambang sampai sama dengan banyaknya, lalu menekan Periksa.
- **Ronde.** ronde 1: warna: merah 7, kuning 3, biru 5, hitam 2; ronde 2: permainan: karet 4, lompat tali 6, petak umpet 5, benteng 7; ronde 3: berangkat: naik sepeda 4, diantar motor 6, jalan kaki 7, diantar mobil 3
- **Panduan suara.** Isi lambang sebanyak datanya.

### Permainan 13. Diagram yang Tepat (Picture)

- **Rujukan buku.** hlm. 239–240 (diagram gambar yang menunjukkan banyak data)
- **Tujuan.** Memilih baris lambang yang banyaknya sama dengan bilangan yang disebut.
- **Cara main.** Tiga ronde, tiap ronde dua soal. Siswa membaca bilangan, lalu mengetuk satu dari empat baris lambang. Pengecoh berbeda satu atau dua lambang.
- **Ronde.** ronde 1: 5, 7; ronde 2: 4, 8; ronde 3: 6, 3
- **Panduan suara.** Ketuk baris yang sama dengan bilangannya.

### Permainan 14. Jodohkan Diagram dan Bilangan (Picture)

- **Rujukan buku.** hlm. 239 dan 245 (diagram menjadi bilangan)
- **Tujuan.** Menjodohkan baris lambang dengan lambang bilangannya.
- **Cara main.** Tiga ronde, tiap ronde tiga baris lambang dan tiga bilangan. Siswa mengetuk baris, lalu mengetuk bilangan yang cocok. Pasangan benar terkunci hijau.
- **Ronde.** ronde 1: 2, 5, 7; ronde 2: 3, 6, 8; ronde 3: 4, 7, 9
- **Panduan suara.** Ketuk baris, lalu ketuk bilangannya.

### Permainan 15. Memori Diagram dan Bilangan (Picture)

- **Rujukan buku.** hlm. 239 (banyak gambar dan bilangannya)
- **Tujuan.** Mencocokkan baris lambang dengan bilangannya lewat permainan memori.
- **Cara main.** Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): baris lambang dan lambang bilangan. Siswa membalik dua kartu dan mencari pasangannya.
- **Ronde.** ronde 1: 2, 5, 7, 9; ronde 2: 3, 4, 6, 8; ronde 3: 1, 5, 6, 8
- **Panduan suara.** Balik dua kartu, cari baris dan bilangannya.

### Permainan 16. Urutkan Baris Lambang (Picture)

- **Rujukan buku.** hlm. 242 (membandingkan baris)
- **Tujuan.** Mengurutkan baris lambang dari yang paling pendek atau paling panjang.
- **Cara main.** Tiga ronde, tiap ronde empat baris lambang. Siswa mengetuk baris satu per satu menurut panjangnya. Letak jawaban berpindah.
- **Ronde.** ronde 1: 2, 4, 6, 8 (dari paling sedikit; tampil 4, 8, 2, 6); ronde 2: 9, 7, 5, 3 (dari paling banyak; tampil 7, 3, 9, 5); ronde 3: 1, 3, 5, 8 (dari paling sedikit; tampil 5, 1, 8, 3)
- **Panduan suara.** Ketuk baris menurut panjangnya.

### Permainan 17. Baca Diagram Lengkap (Picture)

- **Rujukan buku.** hlm. 247 dan 245 (warna kesukaan; siswa yang berlari)
- **Tujuan.** Menjawab pertanyaan dari sebuah diagram gambar lengkap empat baris.
- **Cara main.** Tiga ronde, tiap ronde dua soal. Diagram lengkap (warna kesukaan, kaleng, atau siswa berlari) ditampilkan dengan lambang polos. Siswa memilih jawaban dari tiga pilihan.
- **Ronde.** ronde 1: warna banyak biru, warna paling; ronde 2: kaleng paling, kaleng jumlah; ronde 3: lari jumlah, lari banyak p1
- **Panduan suara.** Baca diagram, lalu jawab pertanyaannya.

### Permainan 18. Lengkapi Banyak pada Diagram (Picture)

- **Rujukan buku.** hlm. 247 (berapa siswa yang menyukai warna merah)
- **Tujuan.** Melengkapi kolom banyaknya pada diagram gambar.
- **Cara main.** Tiga diagram dengan empat baris lambang. Baris yang menyala menunggu bilangan. Siswa memilih satu dari kartu bilangan yang tepat.
- **Ronde.** ronde 1: warna: merah 7, kuning 3, biru 5, hitam 2; ronde 2: permainan: karet 4, lompat tali 6, petak umpet 5, benteng 7; ronde 3: kaleng: cokelat 6, hijau 4, oranye 5, biru 3
- **Panduan suara.** Isi banyaknya untuk baris yang menyala.

### Permainan 19. Garis Bilangan pada Diagram (Picture)

- **Rujukan buku.** hlm. 242–247 (lebihnya dan kurangnya)
- **Tujuan.** Menemukan banyak data yang sekian lebihnya atau kurangnya pada garis bilangan.
- **Cara main.** Tiga ronde, tiap ronde dua soal. Siswa membaca banyak data awal dari diagram, lalu mengetuk banyak data lain yang sekian lebihnya atau kurangnya pada garis bilangan.
- **Ronde.** ronde 1: Banyak lili ada 4. Banyak tulip 1 lebihnya dari banyak lili. Ketuk banyak tulip. jawaban 5; Banyak mawar ada 7. Banyak aster 3 kurangnya dari banyak mawar. Ketuk banyak aster. jawaban 4; ronde 2: Banyak lemper ada 3. Banyak onde-onde 2 lebihnya dari banyak lemper. Ketuk banyak onde-onde. jawaban 5; Banyak kue talam ada 7. Banyak kue cucur 1 kurangnya dari banyak kue talam. Ketuk banyak kue cucur. jawaban 6; ronde 3: Banyak hitam ada 2. Banyak kuning 1 lebihnya dari banyak hitam. Ketuk banyak kuning. jawaban 3; Banyak merah ada 7. Banyak biru 2 kurangnya dari banyak merah. Ketuk banyak biru. jawaban 5
- **Panduan suara.** Ketuk bilangan yang diminta pada garis.

### Permainan 20. Pilah Baris (Picture)

- **Rujukan buku.** hlm. 239 (banyak gambar tiap baris)
- **Tujuan.** Memilah baris lambang menjadi kurang dari lima dan lima atau lebih.
- **Cara main.** Tiga ronde, tiap ronde enam baris lambang dan dua kotak: kurang dari lima, serta lima atau lebih. Siswa menyeret atau mengetuk baris ke kotak yang tepat.
- **Ronde.** ronde 1: kurang dari 5: 3, 4, 2; 5 atau lebih: 7, 9, 6; ronde 2: kurang dari 5: 1, 3, 4; 5 atau lebih: 8, 5, 7; ronde 3: kurang dari 5: 2, 3; 5 atau lebih: 6, 9, 5, 8
- **Panduan suara.** Pilah baris ke kotak yang tepat.

### Permainan 21. Jodohkan Pasangan dan Selisih (Abstract)

- **Rujukan buku.** hlm. 241 dan 247 (lebihnya dan kurangnya)
- **Tujuan.** Menjodohkan dua data dengan selisih banyaknya.
- **Cara main.** Tiga ronde, tiap ronde tiga pasang. Siswa membaca dua data, misalnya mawar tujuh dan tulip lima, lalu mengetuk selisih yang cocok, yaitu 2.
- **Ronde.** ronde 1: mawar 7 dan tulip 5: selisih 2; tulip 5 dan lili 4: selisih 1; mawar 7 dan lili 4: selisih 3; ronde 2: kue talam 7 dan onde-onde 5: selisih 2; kue cucur 6 dan lemper 3: selisih 3; kue talam 7 dan lemper 3: selisih 4; ronde 3: merah 7 dan kuning 3: selisih 4; biru 5 dan hitam 2: selisih 3; merah 7 dan biru 5: selisih 2
- **Panduan suara.** Ketuk pasangan data, lalu ketuk selisihnya.

### Permainan 22. Lengkapi Kalimat Lebihnya (Abstract)

- **Rujukan buku.** hlm. 236–237 dan 247 (lengkapi kalimat sesuai diagram)
- **Tujuan.** Melengkapi kalimat lebihnya dan kurangnya dengan bilangan yang tepat.
- **Cara main.** Dua ronde, tiap ronde tiga kalimat, misalnya banyak bunga tulip ... lebihnya dari banyak bunga lili. Siswa memilih satu dari tiga bilangan.
- **Ronde.** ronde 1: bunga tulip lebihnya 1 dari bunga lili; bunga aster kurangnya 3 dari bunga mawar; buah pisang lebihnya 4 dari buah mangga; ronde 2: buah apel kurangnya 3 dari buah pisang; penyuka warna merah lebihnya 5 dari penyuka warna hitam; kaleng hijau kurangnya 2 dari kaleng cokelat
- **Panduan suara.** Pilih bilangan untuk bagian kosong.

### Permainan 23. Susun Kalimat Diagram Gambar (Abstract)

- **Rujukan buku.** hlm. 239 dan 247 (diagram gambar dan keterangan)
- **Tujuan.** Menyusun kata menjadi kalimat tentang diagram gambar.
- **Cara main.** Empat kalimat, misalnya setiap gambar mewakili satu benda. Kartu kata diketuk berurutan. Satu kartu pengecoh tidak dipakai.
- **Ronde.** ronde 1: Setiap gambar mewakili satu benda; ronde 2: Diagram gambar menyajikan data dengan gambar yang sama; ronde 3: Penyuka warna biru dua lebihnya dari penyuka warna hitam; ronde 4: Warna merah paling banyak disukai siswa kelas dua
- **Panduan suara.** Ketuk kata menjadi kalimat yang benar.

### Permainan 24. Buat Diagram dari Kalimat Data (Abstract)

- **Rujukan buku.** hlm. 243 (ada 4 anak yang suka bermain karet)
- **Tujuan.** Menyusun diagram gambar dari kalimat data.
- **Cara main.** Tiga ronde. Tiap baris menampilkan kalimat, misalnya ada empat anak yang suka bermain karet. Siswa mengisi lambang sebanyak datanya, lalu menekan Periksa.
- **Ronde.** ronde 1: permainan: karet 4, lompat tali 6, petak umpet 5, benteng 7; ronde 2: olahraga: sepak bola 5, bulu tangkis 7, renang 3, basket 4; ronde 3: berangkat: naik sepeda 4, diantar motor 6, jalan kaki 7, diantar mobil 3
- **Panduan suara.** Baca datanya, lalu isi lambangnya.

### Permainan 25. Benar atau Salah: Diagram (Abstract)

- **Rujukan buku.** hlm. 238–247 (membaca diagram gambar)
- **Tujuan.** Menilai pernyataan tentang diagram gambar.
- **Cara main.** Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan dihitung dari data, dan tiap jawaban diberi penjelasan singkat.
- **Ronde.** ronde 1: 5 pernyataan, 3 benar; ronde 2: 5 pernyataan, 4 benar
- **Panduan suara.** Baca pernyataan, lalu pilih benar atau salah.

### Permainan 26. Detektif Diagram (Abstract)

- **Rujukan buku.** hlm. 245 dan 247 (membaca dan menafsirkan diagram)
- **Tujuan.** Menemukan kategori diagram dari dua petunjuk.
- **Cara main.** Empat soal. Siswa membaca petunjuk seperti banyakku dua kurangnya dari merah, lalu memilih satu dari tiga nama. Hanya satu yang cocok dengan semua petunjuk.
- **Ronde.** soal 1 (kue): Aku yang paling banyak. Banyakku lebih dari 6. jawaban kue talam; soal 2 (warna): Banyakku 2 kurangnya dari banyak merah. Banyakku lebih dari 4. jawaban biru; soal 3 (permainan): Banyakku 1 lebihnya dari banyak karet. Banyakku kurang dari 6. jawaban petak umpet; soal 4 (kaleng): Aku yang paling sedikit. Banyakku kurang dari 4. jawaban biru
- **Panduan suara.** Baca semua petunjuk, lalu pilih namanya.

### Permainan 27. Peta Konsep Diagram Gambar (Abstract)

- **Rujukan buku.** hlm. 226 (peta konsep: diagram turus dan diagram gambar)
- **Tujuan.** Melengkapi peta konsep diagram gambar dan cara membacanya.
- **Cara main.** Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala.
- **Ronde.** Diagram gambar; Membaca diagram
- **Panduan suara.** Pilih kartu yang tepat untuk kotak yang menyala.

### Permainan 28. Urutkan Data Diagram (Abstract)

- **Rujukan buku.** hlm. 242 dan 247 (membandingkan data)
- **Tujuan.** Mengurutkan nama data menurut banyaknya.
- **Cara main.** Tiga ronde, tiap ronde empat nama beserta banyaknya, misalnya merah 7. Siswa mengetuk satu per satu dari yang paling banyak atau paling sedikit.
- **Ronde.** ronde 1: merah 7, biru 5, kuning 3, hitam 2 (dari paling banyak); ronde 2: karet 4, petak umpet 5, lompat tali 6, benteng 7 (dari paling sedikit); ronde 3: cokelat 6, oranye 5, hijau 4, biru 3 (dari paling banyak)
- **Panduan suara.** Ketuk menurut banyaknya.

### Permainan 29. Ketuk Semua pada Diagram (Abstract)

- **Rujukan buku.** hlm. 245 dan 247 (data yang memenuhi syarat)
- **Tujuan.** Memilih semua data yang memenuhi sebuah syarat.
- **Cara main.** Tiga ronde, tiap ronde empat nama dan satu perintah, misalnya banyaknya kurang dari enam. Siswa mengetuk semua yang cocok, lalu menekan Periksa.
- **Ronde.** ronde 1: kurang dari 6 (warna): kuning, biru, hitam; ronde 2: lebih dari 5 (permainan): lompat tali, benteng; ronde 3: lebih dari 4 (buahgambar): pisang, jeruk
- **Panduan suara.** Ketuk semua yang cocok, lalu periksa.

### Permainan 30. Hitung Jumlah pada Diagram (Abstract)

- **Rujukan buku.** hlm. 244 dan 245 (jumlah semua; lebih dari dua putaran)
- **Tujuan.** Menjumlahkan banyak dua atau lebih data pada diagram.
- **Cara main.** Tiga ronde, tiap ronde dua soal, misalnya jumlah siswa yang berlari tiga dan empat putaran. Siswa mengatur penghitung sampai sama dengan jumlahnya.
- **Ronde.** ronde 1: Berapa jumlah merah dan kuning pada warna kesukaan siswa kelas ii? 10; Berapa jumlah biru dan hitam pada warna kesukaan siswa kelas ii? 7; ronde 2: Berapa jumlah 3 putaran dan 4 putaran pada siswa yang berlari? 6; Berapa jumlah semua data pada siswa yang berlari? 14; ronde 3: Berapa jumlah kue cucur dan onde-onde pada kue kesukaan? 11; Berapa jumlah semua data pada kue kesukaan? 21
- **Panduan suara.** Jumlahkan datanya, lalu tulis hasilnya.

## 8. Poin Penting dan Catatanku

- ⭐ **Satu gambar, satu benda**: hitung gambar untuk mengetahui banyaknya. _Suara:_ Pada diagram gambar, satu gambar mewakili satu benda. Kita menghitung gambar untuk mengetahui banyak data.
- 🎨 **Gambar harus sama**: bentuk dan ukuran sama, jarak rapi. _Suara:_ Semua gambar dalam satu diagram harus sama bentuk dan ukurannya, dan tersusun rapi dengan jarak yang sama.
- 📖 **Baca keterangan**: judul, keterangan, nama, baris. _Suara:_ Sebelum membaca diagram, baca judul dan keterangannya. Lalu hitung gambar pada setiap baris dari kiri ke kanan.
- 📏 **Baris terpanjang**: paling banyak. _Suara:_ Baris yang paling panjang menunjukkan data paling banyak, dan baris yang paling pendek menunjukkan data paling sedikit.
- ➕ **Jumlah dan selisih**: gabungkan baris atau bandingkan baris. _Suara:_ Untuk mencari jumlah, gabungkan banyak gambar dua baris atau lebih. Untuk mencari lebihnya atau kurangnya, bandingkan dua baris.

**Suara Poin Penting.** Ingat selalu! Pada diagram gambar, satu gambar mewakili satu benda. Semua gambar dalam satu diagram harus sama bentuk dan ukurannya. Baca judul dan keterangan, lalu hitung gambar pada setiap baris. Baris yang paling panjang menunjukkan data paling banyak. Kita mencari jumlah dengan menggabungkan baris, dan mencari lebihnya atau kurangnya dengan membandingkan dua baris.

**Cara menyebutkan.** data bandingkan lebihnya kurangnya. _Suara:_ Cara menyebutkan. Ada tujuh bunga mawar dan lima bunga tulip. Mawar dua lebihnya dari tulip, dan tulip dua kurangnya dari mawar. Sebut datanya, lalu bandingkan, lalu katakan lebihnya atau kurangnya.

**Ayo Mencoba di rumah.** Ayo Berkarya di rumah: wawancarai dua puluh orang tentang kue tradisional kesukaan mereka. Tulis hasilnya dalam diagram turus, lalu sajikan dalam diagram gambar dengan lambang yang kamu pilih. Tulis kue apa yang disukai teman-temanmu dan kue apa yang paling banyak disukai, lalu presentasikan di depan keluargamu.

**Refleksi (Catatanku).**

- Aku dapat membaca diagram gambar.
- Aku dapat membuat diagram gambar dari data.
- Aku belajar dengan tertib.
- Aku menyampaikan pendapat dengan percaya diri.

## 9. Metode dari luar buku yang diadopsi

- **Piktogram satu lawan satu**: satu gambar mewakili satu benda. Perwakilan ini membuat banyak data terlihat langsung dari panjang baris, tanpa perlu angka.
- **Dari benda nyata ke gambar polos (konkret, piktorial, abstrak)**: tahap Concrete memakai gambar benda sebagai lambang, tahap Picture memakai bintang, lingkaran, hati, atau wajah tersenyum, dan tahap Abstract memakai kalimat dan angka.
- **Keterangan dan judul diagram**: siswa dilatih membaca judul dan keterangan sebelum menjawab, kebiasaan utama membaca data dengan benar.
- **Menghitung dari kiri ke kanan tanpa celah**: gambar disusun rapat dengan jarak sama supaya baris yang lebih panjang benar-benar berarti lebih banyak.
- **Membandingkan baris dengan garis bilangan**: lebihnya dan kurangnya dicari dengan menghitung maju dan mundur pada garis bilangan.
- **Presentasi data**: sebutkan judul, ceritakan yang paling banyak dan paling sedikit, lalu lebihnya dan kurangnya. Dasar kegiatan Ayo Berkarya.

## 10. Batas yang diketahui

- Soal Latihan (30 poin), soal Ujian (70 poin), dan Simulasi belum dibuat. Pemilik akan menugaskannya terpisah. Sampai saat itu tab Latihan dan Ujian menampilkan kartu "sedang disiapkan".
- Suara dan ketukan video diuji dengan suara perangkat di Chrome desktop berukuran ponsel. Pada sebagian Android, tombol Jeda tidak menghentikan suara di tengah kalimat (Web Speech `pause()` tidak didukung merata).
- Laju 0,70 dan nada 1 sama untuk Bu Sari dan Pak Budi. Beda guru hanya pada suara yang dipilih perangkat (wanita atau pria). Perangkat yang hanya punya satu suara Indonesia akan membuat kedua guru terdengar serupa.
- Ucapan memakai kata, bukan lambang, supaya suara perangkat tidak salah membaca.
- Tiga puluh permainan per sub-bab memakai sepuluh jenis per tahap. Mesin yang sama (urut ketuk, pilih bertahap, jodohkan, ketuk semua, memori) dipakai lintas tahap dengan isi yang berbeda: benda nyata di Concrete, diagram di Picture, kata dan angka di Abstract.
- Angka kumpulan data buah, hewan ternak, mainan, sayur, bunga, parsel, kue, permainan tradisional, warna, pelari, dan kaleng mengikuti buku siswa dan dicek dengan kunci jawaban Buku Panduan Guru. Data olahraga, cara berangkat ke sekolah, dan sebagian pilihan permainan adalah contoh tambahan yang dibuat untuk pengayaan.
- Lambang polos (bintang, lingkaran, hati, wajah tersenyum) digambar dengan SVG. Gambar benda hanya muncul di tahap Concrete dan infografis.

