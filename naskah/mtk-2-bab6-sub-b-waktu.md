# Naskah Matematika Kelas 2 SD, Bab 6: Pengukuran, Sub-Bab B: Waktu

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k2b6.ts` dan `src/components/modul/data-k2b6.ts`, oleh `scripts/buat-naskah-md-k2b6.mjs`. Isi mengikuti Buku Siswa Matematika Kelas II (Kemendikbudristek, Kurikulum Merdeka, Bab 6 hlm. 155–190) dan diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.

## 1. Identitas modul

| Butir | Isi |
|---|---|
| Modul | `mtk-2-bab6`, sub-bab B |
| Berkas data | `src/data/kelas2-bab6.json` (dibangkitkan `src/content-master/buat-k2-bab6.mjs`, lalu `npm run sync:keys`) |
| Kode bab di server | `k2-mat-bab6` (belum ada seed server karena soal belum ada) |
| Fase dan kelas | `FASE_A`, kelas 2 SD |
| Elemen | 🌈 Fase A • Elemen Pengukuran: Berat dan Waktu (Kelas 2 SD/MI) |
| Poin Kualifikasi per bab | Latihan 30 dan Ujian 70 (terbit setelah soalnya ada). Praktikum 50 terbit sekali per blok empat bab. |
| Suara Guru | Murni Web Speech API bawaan perangkat (`id-ID`), **laju 0,70 dan nada 1**. Tanpa berkas audio statis, tanpa ElevenLabs. |
| Panggilan API saat siswa belajar | Nol. Seluruh tahap Materi berjalan di klien. |
| Tab Simulasi, Latihan, Ujian | Belum diisi. Latihan dan Ujian menampilkan kartu "sedang disiapkan". Tab Simulasi tidak tampil. |
| Jumlah sub-bab | Dua (A dan B), sesuai daftar isi buku Bab 6. |
| Jumlah permainan | 30 per sub-bab: 10 Concrete, 10 Picture, 10 Abstract. Penomoran di layar 1 sampai 30. |

## 2. Capaian dan tujuan pembelajaran

**Capaian Pembelajaran (CP).** Siswa membaca jam tepat pada jam analog, mengenal jam digital, menunjukkan kegiatan menurut pagi, siang, sore, dan malam, mengurutkan kegiatan, serta membandingkan lama kegiatan dengan kata lebih lama dan lebih sebentar.

**Rujukan.** Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 6: Pengukuran, Sub-Bab B hlm. 178–190).

**Sasaran.** Siswa membaca dan menunjukkan pukul tepat pada jam analog dengan jarum pendek (jam) dan jarum panjang (menit), mengenal jam digital, mengelompokkan kegiatan sehari-hari menurut pagi, siang, sore, dan malam, mengurutkan kegiatan menurut waktunya, serta membandingkan dua kegiatan dengan kata lebih lama dan lebih sebentar.

**Suara Silabus.** Kita belajar waktu. Jam membantu kita mengetahui waktu sehari-hari. Kita belajar membaca jam analog, yaitu jarum pendek menunjukkan jam dan jarum panjang menunjukkan menit. Kita juga mengenal jam digital. Kita mengikuti kegiatan Tika dari pagi sampai malam, lalu membandingkan kegiatan yang lebih lama dan yang lebih sebentar, seperti berolahraga dan mandi. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.

## 3. Peta enam tahap SMICPA dan bobotnya

| Tahap | Isi | Banyak butir |
|---|---|---|
| S. Story | Video animasi HTML/SVG, tiga video. Tiap video diputar satu per satu saat diketuk (tidak ada putar otomatis) | 3 video, 9 adegan, 34 ketukan |
| M. Mind-Map | Peta pikiran berurutan, tiap cabang bisa diketuk dan uraiannya tampil di layar | 8 langkah |
| I. Infografis | Poster rangkuman, suara di tiap panel | 10 panel |
| C. Concrete | Benda nyata: angkat, timbang, jodohkan, urutkan, putar jam, susun hari | 10 permainan |
| P. Picture | Diagram polos: muka jam, jam digital, jalur jam, batang lama, tabel, garis angka jam | 10 permainan |
| A. Abstract | Kata dan angka: kalimat, benar-salah, hitung, tabel, detektif, peta konsep | 10 permainan |

Bobot mengikuti isi buku. Aturan Concrete dan Picture berlaku: benda berwarna hanya di Concrete, Picture hanya diagram tanpa gambar benda (balok berhuruf, titik, goresan, batang, muka jam, jalur jam).

## 4. Tahap 1: Story (video animasi, menggantikan slide)

Tidak ada video yang berjalan sendiri. Siswa mengetuk **▶ Putar** pada satu video. Video itu berjalan, dan video lain berhenti. Setiap kalimat adalah satu ketukan: dibacakan Suara Guru perangkat, dan gambar berubah mengikuti kalimat yang sedang dibacakan. Ada tombol Jeda, Ulang, dan Suara hidup atau mati.

### Video 1: Jam dan Jarumnya (Halim bangun tidur pukul lima)

**Adegan 1. Bagian-bagian jam** (`K2B6B-V1-1`)

1. Jam membantu kita mengetahui waktu sehari-hari.  
   _Papan layar:_ Jam membantu kita
2. Jam analog mempunyai jarum pendek, jarum panjang, dan angka satu sampai dua belas.  
   _Papan layar:_ Jam analog
3. Jam digital menunjukkan waktu dengan angka, misalnya nol lima titik nol nol.  
   _Papan layar:_ Jam digital 05.00

**Adegan 2. Pukul lima tepat** (`K2B6B-V1-2`)

1. Jarum pendek menunjukkan jam.  
   _Papan layar:_ Pendek: jam
2. Jarum panjang menunjukkan menit.  
   _Papan layar:_ Panjang: menit
3. Jarum pendek di angka lima dan jarum panjang di angka dua belas menunjukkan pukul lima tepat.  
   _Papan layar:_ Pukul 5 tepat
4. Halim bangun tidur pukul lima pagi. Kita mengetahuinya dengan melihat kedua jarum.  
   _Papan layar:_ Halim bangun pukul 5

**Adegan 3. Membaca pukul tepat** (`K2B6B-V1-3`)

1. Kalau jarum panjang di angka dua belas, kita membaca jam dari jarum pendek.  
   _Papan layar:_ Panjang di angka 12
2. Jarum pendek di angka enam, berarti pukul enam.  
   _Papan layar:_ Pukul 6
3. Jarum pendek di angka tujuh, berarti pukul tujuh.  
   _Papan layar:_ Pukul 7
4. Jarum pendek dan jarum panjang sama-sama di angka dua belas, berarti pukul dua belas tepat.  
   _Papan layar:_ Pukul 12 tepat

### Video 2: Kegiatan Tika Sehari-hari (Pagi, siang, sore, dan malam)

**Adegan 1. Pagi hari** (`K2B6B-V2-1`)

1. Tika sarapan pukul enam pagi.  
   _Papan layar:_ Sarapan pukul 6
2. Tika dan teman-teman belajar di sekolah mulai pukul tujuh pagi.  
   _Papan layar:_ Sekolah pukul 7
3. Pagi hari adalah waktu saat matahari baru terbit, dan kita bersiap berangkat sekolah.  
   _Papan layar:_ Matahari terbit

**Adegan 2. Siang dan sore** (`K2B6B-V2-2`)

1. Tika dan teman-teman makan di kantin pukul dua belas siang.  
   _Papan layar:_ Kantin pukul 12
2. Siang hari matahari berada paling tinggi di langit.  
   _Papan layar:_ Siang: matahari tinggi
3. Tika bermain bersama adik pukul empat sore.  
   _Papan layar:_ Bermain pukul 4
4. Sore hari matahari mulai turun.  
   _Papan layar:_ Sore: matahari turun

**Adegan 3. Malam hari** (`K2B6B-V2-3`)

1. Tika tidur sejak pukul sembilan malam.  
   _Papan layar:_ Tidur pukul 9
2. Malam hari langit gelap, dan kita beristirahat.  
   _Papan layar:_ Langit gelap
3. Satu hari terdiri dari pagi, siang, sore, dan malam.  
   _Papan layar:_ Pagi, siang, sore, malam
4. Setiap kegiatan punya waktu yang tepat.  
   _Papan layar:_ Waktu yang tepat

### Video 3: Olahraga Hari Minggu (Lebih lama atau lebih sebentar)

**Adegan 1. Kira berolahraga** (`K2B6B-V3-1`)

1. Sekarang hari Minggu. Setiap hari Minggu, Kira selalu berolahraga.  
   _Papan layar:_ Hari Minggu
2. Ia berlari mengelilingi taman dekat rumahnya.  
   _Papan layar:_ Lari di taman
3. Kira berolahraga mulai pukul enam sampai pukul tujuh pagi.  
   _Papan layar:_ Pukul 6 sampai 7
4. Setelah berolahraga, Kira mandi agar badannya segar kembali.  
   _Papan layar:_ Mandi agar segar

**Adegan 2. Lebih lama atau lebih sebentar?** (`K2B6B-V3-2`)

1. Manakah kegiatan yang lebih lama? Berolahraga atau mandi?  
   _Papan layar:_ Olahraga atau mandi?
2. Kira berolahraga satu jam, sedangkan mandinya hanya lima belas menit.  
   _Papan layar:_ 1 jam dan 15 menit
3. Berolahraga lebih lama dari mandi.  
   _Papan layar:_ Olahraga lebih lama
4. Mandi lebih sebentar dari berolahraga.  
   _Papan layar:_ Mandi lebih sebentar

**Adegan 3. Membandingkan waktu** (`K2B6B-V3-3`)

1. Kita dapat membandingkan waktu dua kegiatan.  
   _Papan layar:_ Bandingkan waktu
2. Kita memakai kata lebih lama dan lebih sebentar.  
   _Papan layar:_ Lebih lama, lebih sebentar
3. Tidur malam lebih lama dari menyikat gigi.  
   _Papan layar:_ Tidur lebih lama
4. Mencuci tangan lebih sebentar dari bermain bola.  
   _Papan layar:_ Cuci tangan sebentar

## 5. Tahap 2: Mind-Map (peta pikiran)

**1. Jam Membantu Kita** ⏰  
Jam membantu kita mengetahui waktu sehari-hari. Dengan jam kita tahu kapan harus bangun, sarapan, berangkat sekolah, bermain, dan tidur. Halim bangun tidur tepat pada waktunya karena ia melihat jam. Kebiasaan melihat jam membuat kita disiplin dan tidak terlambat.

_Alur:_ Jam membantu kita → Jarum pendek dan panjang

**2. Jarum Pendek dan Jarum Panjang** 🕐  
Jam analog mempunyai dua jarum. Jarum pendek menunjukkan jam, dan jarum panjang menunjukkan menit. Kita selalu melihat jarum pendek dulu untuk mengetahui jam berapa, lalu melihat jarum panjang untuk mengetahui menitnya. Jarum pendek bergerak pelan, dan jarum panjang bergerak lebih cepat.

_Alur:_ Jarum pendek dan panjang → Pukul tepat

**3. Pukul Tepat** 🕔  
Bila jarum panjang menunjuk angka dua belas, waktunya adalah pukul tepat. Jam ditentukan oleh jarum pendek. Jarum pendek di angka lima dan jarum panjang di angka dua belas berarti pukul lima tepat. Jarum pendek di angka enam dan jarum panjang di angka dua belas berarti pukul enam tepat. Kita menyebutnya dengan pukul dan angkanya.

_Alur:_ Pukul tepat → Jam analog dan digital

**4. Jam Analog dan Jam Digital** 🔢  
Jam analog menunjukkan waktu dengan jarum, dan jam digital menunjukkan waktu dengan angka. Pada jam digital, dua angka pertama adalah jam dan dua angka sesudah titik adalah menit. Pukul lima tepat ditulis nol lima titik nol nol. Pukul enam pagi ditulis nol enam titik nol nol. Jam digital sering memakai dua puluh empat jam, jadi pukul empat sore ditulis enam belas titik nol nol, dan pukul sembilan malam ditulis dua puluh satu titik nol nol. Keduanya menunjukkan waktu yang sama dengan jam analog.

_Alur:_ Jam analog dan digital → Bagian hari

**5. Pagi, Siang, Sore, Malam** 🌅  
Satu hari dibagi menjadi pagi, siang, sore, dan malam. Pagi hari matahari baru terbit, siang hari matahari paling tinggi, sore hari matahari mulai turun, dan malam hari langit gelap. Jarum pendek berputar dua kali dalam satu hari, jadi pukul enam bisa pukul enam pagi atau pukul enam sore. Karena itu kita menambahkan kata pagi, siang, sore, atau malam.

_Alur:_ Bagian hari → Urutan kegiatan

**6. Mengurutkan Kegiatan** 📅  
Kegiatan sehari-hari terjadi satu per satu menurut waktunya. Tika sarapan pukul enam pagi, belajar pukul tujuh pagi, makan di kantin pukul dua belas siang, bermain pukul empat sore, dan tidur pukul sembilan malam. Untuk mengurutkan kegiatan, lihat jam dan bagian harinya. Waktu yang lebih awal berada lebih dulu.

_Alur:_ Urutan kegiatan → Lebih lama, lebih sebentar

**7. Lebih Lama dan Lebih Sebentar** ⏳  
Kegiatan ada yang memerlukan waktu lama dan ada yang sebentar. Kira berolahraga satu jam, sedangkan mandi hanya lima belas menit. Jadi berolahraga lebih lama dari mandi, dan mandi lebih sebentar dari berolahraga. Mencuci tangan sangat sebentar, dan tidur malam sangat lama. Kita memakai kata lebih lama dan lebih sebentar untuk membandingkan dua kegiatan.

_Alur:_ Lebih lama, lebih sebentar → Menyusun hariku

**8. Menyusun Hariku** 🗓️  
Kita dapat menyusun satu hari dengan jadwal yang rapi. Tuliskan satu kegiatan untuk pagi, siang, sore, dan malam, lengkap dengan jamnya. Untuk menghitung lama sebuah kegiatan, hitung berapa jam jarum pendek bergerak dari mulai sampai selesai. Dari pukul enam sampai pukul tujuh, jarum pendek bergerak satu jam. Jadwal yang rapi membantu kita belajar, bermain, dan beristirahat dengan seimbang.

_Alur:_ Menyusun hariku → Siap membaca waktu

## 6. Tahap 3: Infografis

**Panel 1. Bagian Jam Analog** ⏰ (3, Tiga)

> Jam analog punya tiga bagian penting: jarum pendek, jarum panjang, dan angka satu sampai dua belas.

**Panel 2. Jarum Pendek dan Panjang** 🕐 (2, Dua)

> Jarum pendek menunjukkan jam. Jarum panjang menunjukkan menit.

**Panel 3. Pukul Tepat** 🕔 (2, Dua)

> Pukul tepat artinya jarum panjang di angka dua belas, dan jarum pendek menunjukkan jamnya. Jarum pendek di angka lima berarti pukul lima tepat.

**Panel 4. Jam Analog dan Digital** 🔢 (2, Dua)

> Jam analog memakai jarum, dan jam digital memakai angka. Pukul lima tepat ditulis nol lima titik nol nol.

**Panel 5. Empat Bagian Hari** 🌅 (4, Empat)

> Satu hari terdiri dari empat bagian: pagi, siang, sore, dan malam.

**Panel 6. Kegiatan Tika** 📅 (5, Lima)

> Tika sarapan pukul enam pagi, belajar pukul tujuh pagi, makan di kantin pukul dua belas siang, bermain pukul empat sore, dan tidur pukul sembilan malam.

**Panel 7. Waktu dan Bagian Hari** 🌤️ (4, Empat)

> Pada jam digital dua puluh empat jam, nol enam titik nol nol dan nol tujuh titik nol nol termasuk pagi. Dua belas titik nol nol termasuk siang. Enam belas titik nol nol, yaitu pukul empat sore, termasuk sore. Dua puluh satu titik nol nol, yaitu pukul sembilan malam, termasuk malam.

**Panel 8. Lebih Lama, Lebih Sebentar** ⏳ (2, Dua)

> Berolahraga lebih lama dari mandi. Mandi lebih sebentar dari berolahraga. Dua kata ini membandingkan lamanya kegiatan.

**Panel 9. Lama Beberapa Kegiatan** ⌛ (3, Tiga)

> Mencuci tangan hanya sekitar satu menit. Mandi sekitar lima belas menit. Berolahraga satu jam. Tidur malam sekitar delapan jam.

**Panel 10. Jarum Bergerak Satu Jam** 🗓️ (2, Dua)

> Dari pukul enam sampai pukul tujuh, jarum pendek bergerak satu jam. Kira berolahraga selama satu jam.

## 7. Tahap 4, 5, dan 6: tiga puluh permainan

| No | Tahap | Permainan | Jenis | Ronde |
|---|---|---|---|---|
| 1 | Concrete | Pukul Berapa? | `read-clock-concrete` | ronde 1: pukul 6, pukul 7, pukul 12; ronde 2: pukul 5, pukul 9, pukul 4; ronde 3: pukul 1, pukul 8, pukul 11; ronde 4: pukul 2, pukul 10, pukul 3 |
| 2 | Concrete | Putar Jarum Jam | `set-clock-hands` | ronde 1: sarapan, belajar di sekolah, makan di kantin; ronde 2: berolahraga, bermain bersama adik, tidur malam; ronde 3: bangun tidur, makan malam, menyikat gigi; ronde 4: mandi sore, belajar di rumah, pulang sekolah |
| 3 | Concrete | Pilah Kegiatan Menurut Bagian Hari | `sort-activities-day-parts` | ronde 1: sarapan, makan di kantin, bermain bersama adik, tidur malam, belajar di sekolah, makan malam; ronde 2: bangun tidur, pulang sekolah, mandi sore, belajar di rumah, berolahraga, menyikat gigi; ronde 3: menyisir rambut, mencuci tangan, bermain bola, tidur malam, mandi pagi, makan malam |
| 4 | Concrete | Jodohkan Kegiatan dan Jam | `match-activity-clock` | ronde 1: sarapan, belajar di sekolah, makan di kantin, bermain bersama adik; ronde 2: bangun tidur, belajar di rumah, tidur malam, makan di kantin; ronde 3: berolahraga, bermain bola, makan malam, menyikat gigi |
| 5 | Concrete | Mana Lebih Lama? | `which-takes-longer` | ronde 1: menyisir rambut atau mandi pagi (lebih lama); tidur malam atau menyikat gigi (lebih sebentar); ronde 2: belajar di sekolah atau sarapan (lebih lama); mencuci tangan atau bermain bola (lebih sebentar); ronde 3: berolahraga atau mandi pagi (lebih lama); makan malam atau belajar di rumah (lebih sebentar); ronde 4: bermain bersama adik atau bermain bola (lebih lama); bangun tidur atau makan di kantin (lebih sebentar) |
| 6 | Concrete | Urutkan Hariku | `order-my-day` | ronde 1: bangun tidur, sarapan, belajar di sekolah, makan di kantin; ronde 2: belajar di sekolah, makan di kantin, bermain bersama adik, tidur malam; ronde 3: berolahraga, mandi sore, makan malam, tidur malam |
| 7 | Concrete | Garis Waktu Hariku | `day-timeline-place` | ronde 1: sarapan, makan di kantin, bermain bersama adik, tidur malam; ronde 2: berolahraga, makan di kantin, mandi sore, belajar di rumah; ronde 3: belajar di sekolah, pulang sekolah, bermain bola, menyikat gigi |
| 8 | Concrete | Memori Kegiatan dan Jam | `memory-activity-clock` | ronde 1: sarapan, belajar di sekolah, makan di kantin, tidur malam; ronde 2: bangun tidur, bermain bersama adik, makan malam, menyikat gigi; ronde 3: berolahraga, bermain bola, tidur malam, makan di kantin |
| 9 | Concrete | Majukan Jam | `clock-forward-hours` | ronde 1: pukul 6 sampai 7, pukul 7 sampai 12; ronde 2: pukul 12 sampai 4, pukul 4 sampai 7; ronde 3: pukul 5 sampai 9, pukul 7 sampai 9 |
| 10 | Concrete | Temukan Jam di Dinding | `find-clock-on-wall` | ronde 1: pukul 3, pukul 6, pukul 9, pukul 12; ronde 2: pukul 2, pukul 5, pukul 8, pukul 11; ronde 3: pukul 1, pukul 4, pukul 7, pukul 10 |
| 11 | Picture | Baca Jam Digital dari Gambar | `read-digital-from-diagram` | ronde 1: 06.00, 09.00, 12.00; ronde 2: 04.00, 07.00, 10.00; ronde 3: 01.00, 03.00, 08.00 |
| 12 | Picture | Gambar Jarum Jam | `draw-clock-hands-digital` | ronde 1: 09.00, 03.00, 06.00; ronde 2: 04.00, 11.00, 02.00; ronde 3: 08.00, 01.00, 12.00 |
| 13 | Picture | Batang Lama Kegiatan | `bar-model-duration` | ronde 1: A=2 jam, B=5 jam, C=1 jam; ronde 2: D=3 jam, E=6 jam, F=4 jam, G=2 jam; ronde 3: H=1 jam, I=7 jam, J=3 jam |
| 14 | Picture | Jodohkan Jam dan Angka Digital | `match-clock-digital` | ronde 1: 02.00, 06.00, 09.00, 12.00; ronde 2: 01.00, 04.00, 07.00, 11.00; ronde 3: 03.00, 05.00, 08.00, 10.00 |
| 15 | Picture | Urutkan Gambar Jam | `order-clock-diagrams` | ronde 1: 17.00 sore, 06.00 pagi, 12.00 siang, 21.00 malam; ronde 2: 07.00 pagi, 15.00 sore, 05.00 pagi, 20.00 malam; ronde 3: 11.00 siang, 04.00 pagi, 16.00 sore, 19.00 malam |
| 16 | Picture | Pilah Jam ke Bagian Hari | `sort-clock-day-parts` | ronde 1: 05.00, 12.00, 16.00, 21.00, 08.00, 14.00; ronde 2: 06.00, 13.00, 17.00, 19.00, 09.00, 11.00; ronde 3: 07.00, 12.00, 15.00, 20.00, 04.00, 18.00 |
| 17 | Picture | Hitung Kotak Jam | `count-hour-blocks` | ronde 1: 6 sampai 8, 9 sampai 1; ronde 2: 7 sampai 11, 2 sampai 3; ronde 3: 5 sampai 11, 4 sampai 7 |
| 18 | Picture | Tabel Jam dan Bagian Hari | `fill-clock-table` | ronde 1: Bagian hari menurut jam; ronde 2: Bagian hari menurut jam, ronde dua |
| 19 | Picture | Goresan Jam | `tally-hours` | ronde 1: 6 sampai 9, 12 sampai 2; ronde 2: 7 sampai 10, 2 sampai 9; ronde 3: 5 sampai 8, 1 sampai 6 |
| 20 | Picture | Garis Angka Jam | `number-line-hours` | ronde 1: 2, 6, 11; ronde 2: 3, 8, 12; ronde 3: 1, 5, 9 |
| 21 | Abstract | Lengkapi Kalimat Waktu | `complete-time-sentences` | ronde 1: 3 kalimat; ronde 2: 3 kalimat |
| 22 | Abstract | Benar atau Salah: Waktu | `true-false-time` | ronde 1: 5 pernyataan, 3 benar; ronde 2: 5 pernyataan, 3 benar |
| 23 | Abstract | Susun Kalimat Waktu | `build-time-sentence` | ronde 1: Jarum pendek menunjukkan jam; ronde 2: Tika sarapan pukul 6 pagi; ronde 3: Berolahraga lebih lama dari mandi; ronde 4: Tika tidur sejak pukul 9 malam |
| 24 | Abstract | Hitung Berapa Jam | `hours-between` | ronde 1: 1 jam, 5 jam; ronde 2: 2 jam, 8 jam; ronde 3: 3 jam, 3 jam |
| 25 | Abstract | Tabel Kegiatan dan Bagian Hari | `fill-activity-table` | ronde 1: Kegiatan dan bagian hari; ronde 2: Kegiatan dan bagian hari, ronde dua |
| 26 | Abstract | Pilih Bagian Hari | `choose-day-part` | ronde 1: 07.00 pagi, 12.00 siang, 16.00 sore; ronde 2: 05.00 pagi, 13.00 siang, 19.00 malam; ronde 3: 09.00 pagi, 14.00 siang, 21.00 malam |
| 27 | Abstract | Detektif Waktu | `riddle-time-clues` | soal 1: jawaban sarapan; soal 2: jawaban bermain bersama adik; soal 3: jawaban tidur malam; soal 4: jawaban menyisir rambut |
| 28 | Abstract | Peta Konsep Waktu | `concept-map-fill` | Membaca jam; Waktu kegiatan |
| 29 | Abstract | Urutkan Jam Digital | `order-digital-times` | ronde 1: 17.00, 06.00, 12.00, 21.00; ronde 2: 20.00, 05.00, 15.00, 09.00; ronde 3: 14.00, 04.00, 18.00, 08.00 |
| 30 | Abstract | Ketuk Semua Jam yang Cocok | `select-all-day-part` | ronde 1: pagi: 05.00, 12.00, 07.00, 16.00, 09.00, 21.00; ronde 2: malam: 19.00, 06.00, 13.00, 21.00, 15.00, 08.00; ronde 3: sore: 16.00, 07.00, 17.00, 12.00, 20.00, 15.00 |

### Permainan 1. Pukul Berapa? (Concrete)

- **Rujukan buku.** hlm. 178 dan 183 (Halim bangun tidur; tulis waktu yang sesuai dengan kegiatan)
- **Tujuan.** Membaca pukul tepat pada model jam dinding.
- **Cara main.** Empat ronde, tiap ronde tiga jam dinding berbeda, misalnya pukul enam, tujuh, dan dua belas. Siswa memilih pukul yang tepat dari tiga pilihan. Pilihan lain berupa jam sebelum dan sesudahnya, sehingga siswa harus melihat jarum pendek dengan teliti.
- **Ronde.** ronde 1: pukul 6, pukul 7, pukul 12; ronde 2: pukul 5, pukul 9, pukul 4; ronde 3: pukul 1, pukul 8, pukul 11; ronde 4: pukul 2, pukul 10, pukul 3
- **Panduan suara.** Lihat jarum pendek, lalu pilih pukulnya.

### Permainan 2. Putar Jarum Jam (Concrete)

- **Rujukan buku.** hlm. 181 dan 183 (gambarkan jarum jam yang sesuai dengan cerita)
- **Tujuan.** Mengarahkan jarum pendek jam dinding ke pukul yang diminta.
- **Cara main.** Empat ronde, tiap ronde tiga tugas, misalnya Tika sarapan pukul enam pagi. Siswa mengetuk angka di muka jam atau menekan tombol jam, lalu menekan Periksa. Jarum panjang tetap di angka dua belas.
- **Ronde.** ronde 1: sarapan, belajar di sekolah, makan di kantin; ronde 2: berolahraga, bermain bersama adik, tidur malam; ronde 3: bangun tidur, makan malam, menyikat gigi; ronde 4: mandi sore, belajar di rumah, pulang sekolah
- **Panduan suara.** Putar jarum pendek ke pukul yang diminta.

### Permainan 3. Pilah Kegiatan Menurut Bagian Hari (Concrete)

- **Rujukan buku.** hlm. 179–181 dan 184 (kegiatan pagi, siang, sore, malam)
- **Tujuan.** Memilah kegiatan sehari-hari ke pagi, siang, sore, dan malam.
- **Cara main.** Tiga ronde, tiap ronde enam kartu kegiatan dengan waktunya, misalnya sarapan pukul enam. Siswa menyeret atau mengetuk kartu ke kotak Pagi, Siang, Sore, atau Malam. Kunci dihitung dari jam kegiatan.
- **Ronde.** ronde 1: sarapan, makan di kantin, bermain bersama adik, tidur malam, belajar di sekolah, makan malam; ronde 2: bangun tidur, pulang sekolah, mandi sore, belajar di rumah, berolahraga, menyikat gigi; ronde 3: menyisir rambut, mencuci tangan, bermain bola, tidur malam, mandi pagi, makan malam
- **Panduan suara.** Pilah kegiatan ke bagian hari yang tepat.

### Permainan 4. Jodohkan Kegiatan dan Jam (Concrete)

- **Rujukan buku.** hlm. 183–184 (tulis waktu yang sesuai dengan kegiatan; tarik garis waktu kegiatan)
- **Tujuan.** Menjodohkan kegiatan dengan jam yang menunjukkan waktunya.
- **Cara main.** Tiga ronde, tiap ronde empat kegiatan dan empat jam dinding. Siswa mengetuk kegiatan, lalu mengetuk jam yang cocok. Muka jam tiap ronde berbeda sehingga hanya satu pasangan yang cocok.
- **Ronde.** ronde 1: sarapan, belajar di sekolah, makan di kantin, bermain bersama adik; ronde 2: bangun tidur, belajar di rumah, tidur malam, makan di kantin; ronde 3: berolahraga, bermain bola, makan malam, menyikat gigi
- **Panduan suara.** Ketuk kegiatan, lalu ketuk jamnya.

### Permainan 5. Mana Lebih Lama? (Concrete)

- **Rujukan buku.** hlm. 182 dan 185–186 (beri tanda centang pada kegiatan yang lebih lama)
- **Tujuan.** Menentukan kegiatan yang lebih lama atau lebih sebentar dari dua kegiatan.
- **Cara main.** Empat ronde, tiap ronde dua pasang kegiatan, misalnya menyisir rambut dan mandi, tidur malam dan menyikat gigi. Siswa mengetuk kegiatan yang lebih lama atau yang lebih sebentar. Petunjuk salah memberi lama kegiatan secara singkat.
- **Ronde.** ronde 1: menyisir rambut atau mandi pagi (lebih lama); tidur malam atau menyikat gigi (lebih sebentar); ronde 2: belajar di sekolah atau sarapan (lebih lama); mencuci tangan atau bermain bola (lebih sebentar); ronde 3: berolahraga atau mandi pagi (lebih lama); makan malam atau belajar di rumah (lebih sebentar); ronde 4: bermain bersama adik atau bermain bola (lebih lama); bangun tidur atau makan di kantin (lebih sebentar)
- **Panduan suara.** Ketuk kegiatan yang lebih lama atau lebih sebentar.

### Permainan 6. Urutkan Hariku (Concrete)

- **Rujukan buku.** hlm. 186 (urutkan gambar sesuai dengan waktu kegiatan)
- **Tujuan.** Mengurutkan kegiatan menurut waktunya, dari yang paling awal.
- **Cara main.** Tiga ronde, tiap ronde empat kegiatan dari pagi sampai malam. Siswa mengetuk kegiatan satu per satu dari yang paling awal. Kegiatan yang salah memberi petunjuk jamnya.
- **Ronde.** ronde 1: bangun tidur, sarapan, belajar di sekolah, makan di kantin; ronde 2: belajar di sekolah, makan di kantin, bermain bersama adik, tidur malam; ronde 3: berolahraga, mandi sore, makan malam, tidur malam
- **Panduan suara.** Ketuk kegiatan dari yang paling awal.

### Permainan 7. Garis Waktu Hariku (Concrete)

- **Rujukan buku.** hlm. 181 dan 189 (kegiatan pagi, siang, sore, dan malam; Ayo Berkarya)
- **Tujuan.** Menaruh satu kegiatan pada tiap bagian hari di garis waktu.
- **Cara main.** Tiga ronde, tiap ronde empat kegiatan dan empat tempat: pagi, siang, sore, malam. Siswa mengetuk kegiatan lalu mengetuk tempatnya. Setiap tempat menerima satu kegiatan.
- **Ronde.** ronde 1: sarapan, makan di kantin, bermain bersama adik, tidur malam; ronde 2: berolahraga, makan di kantin, mandi sore, belajar di rumah; ronde 3: belajar di sekolah, pulang sekolah, bermain bola, menyikat gigi
- **Panduan suara.** Ketuk kegiatan, lalu ketuk bagian harinya.

### Permainan 8. Memori Kegiatan dan Jam (Concrete)

- **Rujukan buku.** hlm. 179–181 (kegiatan Tika dan jamnya)
- **Tujuan.** Mencocokkan kartu kegiatan dengan kartu jam yang menunjukkan waktunya.
- **Cara main.** Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu. Pasangan yang cocok tetap terbuka, yang tidak cocok kembali tertutup. Pasangan berupa kegiatan dan jam dinding.
- **Ronde.** ronde 1: sarapan, belajar di sekolah, makan di kantin, tidur malam; ronde 2: bangun tidur, bermain bersama adik, makan malam, menyikat gigi; ronde 3: berolahraga, bermain bola, tidur malam, makan di kantin
- **Panduan suara.** Balik dua kartu, cari kegiatan dan jamnya.

### Permainan 9. Majukan Jam (Concrete)

- **Rujukan buku.** hlm. 182 (Kira berolahraga mulai pukul 6 sampai pukul 7)
- **Tujuan.** Memajukan jam satu jam setiap ketukan dan menghitung lamanya kegiatan.
- **Cara main.** Tiga ronde, tiap ronde dua cerita, misalnya Kira berolahraga pukul enam sampai pukul tujuh. Siswa menekan Maju 1 jam sampai jam selesai, lalu memilih berapa jam yang sudah berlalu. Siswa boleh mengulang dari awal.
- **Ronde.** ronde 1: pukul 6 sampai 7, pukul 7 sampai 12; ronde 2: pukul 12 sampai 4, pukul 4 sampai 7; ronde 3: pukul 5 sampai 9, pukul 7 sampai 9
- **Panduan suara.** Majukan jam, lalu hitung berapa jamnya.

### Permainan 10. Temukan Jam di Dinding (Concrete)

- **Rujukan buku.** hlm. 178–181 (membaca pukul tepat pada beberapa jam)
- **Tujuan.** Menemukan jam yang menunjukkan pukul tertentu di antara empat jam.
- **Cara main.** Tiga ronde, tiap ronde empat jam dinding dan dua pertanyaan, misalnya ketuk jam yang menunjukkan pukul enam. Siswa mengetuk jam yang tepat.
- **Ronde.** ronde 1: pukul 3, pukul 6, pukul 9, pukul 12; ronde 2: pukul 2, pukul 5, pukul 8, pukul 11; ronde 3: pukul 1, pukul 4, pukul 7, pukul 10
- **Panduan suara.** Ketuk jam yang menunjukkan pukul yang diminta.

### Permainan 11. Baca Jam Digital dari Gambar (Picture)

- **Rujukan buku.** hlm. 178 (jam analog dan jam digital)
- **Tujuan.** Menuliskan pukul tepat pada diagram jam dalam bentuk jam digital.
- **Cara main.** Tiga ronde, tiap ronde tiga diagram jam. Siswa memilih jam digital yang sama, misalnya nol enam titik nol nol. Dua pilihan lain berupa jam sebelum dan sesudahnya.
- **Ronde.** ronde 1: 06.00, 09.00, 12.00; ronde 2: 04.00, 07.00, 10.00; ronde 3: 01.00, 03.00, 08.00
- **Panduan suara.** Lihat jarum, lalu pilih jam digitalnya.

### Permainan 12. Gambar Jarum Jam (Picture)

- **Rujukan buku.** hlm. 181 dan 183 (gambarkan jarum jam sesuai cerita)
- **Tujuan.** Mengarahkan jarum pendek diagram jam ke pukul yang ditulis sebagai jam digital.
- **Cara main.** Tiga ronde, tiap ronde tiga jam digital, misalnya 09.00. Siswa mengetuk angka di muka jam atau memakai tombol jam, lalu menekan Periksa.
- **Ronde.** ronde 1: 09.00, 03.00, 06.00; ronde 2: 04.00, 11.00, 02.00; ronde 3: 08.00, 01.00, 12.00
- **Panduan suara.** Arahkan jarum pendek sesuai jam digitalnya.

### Permainan 13. Batang Lama Kegiatan (Picture)

- **Rujukan buku.** hlm. 182 dan 185–186 (lebih lama dan lebih sebentar) dalam model batang
- **Tujuan.** Membaca batang lama kegiatan dan menemukan yang paling lama dan paling sebentar.
- **Cara main.** Tiga ronde, tiap ronde tiga sampai empat batang berhuruf, satu kotak sama dengan satu jam. Siswa mengetuk batang yang paling lama dan batang yang paling sebentar.
- **Ronde.** ronde 1: A=2 jam, B=5 jam, C=1 jam; ronde 2: D=3 jam, E=6 jam, F=4 jam, G=2 jam; ronde 3: H=1 jam, I=7 jam, J=3 jam
- **Panduan suara.** Ketuk batang yang paling panjang atau paling pendek.

### Permainan 14. Jodohkan Jam dan Angka Digital (Picture)

- **Rujukan buku.** hlm. 178 (jam analog dan jam digital)
- **Tujuan.** Menjodohkan diagram jam dengan jam digitalnya.
- **Cara main.** Tiga ronde, tiap ronde empat diagram jam dan empat jam digital. Siswa mengetuk diagram jam, lalu mengetuk jam digital yang cocok.
- **Ronde.** ronde 1: 02.00, 06.00, 09.00, 12.00; ronde 2: 01.00, 04.00, 07.00, 11.00; ronde 3: 03.00, 05.00, 08.00, 10.00
- **Panduan suara.** Ketuk jam, lalu ketuk jam digitalnya.

### Permainan 15. Urutkan Gambar Jam (Picture)

- **Rujukan buku.** hlm. 186 (urutkan gambar sesuai dengan waktu kegiatan)
- **Tujuan.** Mengurutkan diagram jam menurut waktunya dalam satu hari.
- **Cara main.** Tiga ronde, tiap ronde empat diagram jam dengan keterangan pagi, siang, sore, atau malam. Siswa mengetuk diagram dari waktu yang paling awal dalam satu hari.
- **Ronde.** ronde 1: 17.00 sore, 06.00 pagi, 12.00 siang, 21.00 malam; ronde 2: 07.00 pagi, 15.00 sore, 05.00 pagi, 20.00 malam; ronde 3: 11.00 siang, 04.00 pagi, 16.00 sore, 19.00 malam
- **Panduan suara.** Ketuk jam dari waktu yang paling awal.

### Permainan 16. Pilah Jam ke Bagian Hari (Picture)

- **Rujukan buku.** hlm. 188–189 (kelompokkan waktu kegiatan: pagi, sore, malam)
- **Tujuan.** Memilah diagram jam menurut pagi, siang, sore, dan malam.
- **Cara main.** Tiga ronde, tiap ronde enam diagram jam dengan jam digital 24 jam. Siswa menyeret atau mengetuk diagram ke kotak Pagi, Siang, Sore, atau Malam.
- **Ronde.** ronde 1: 05.00, 12.00, 16.00, 21.00, 08.00, 14.00; ronde 2: 06.00, 13.00, 17.00, 19.00, 09.00, 11.00; ronde 3: 07.00, 12.00, 15.00, 20.00, 04.00, 18.00
- **Panduan suara.** Pilah jam ke bagian hari yang tepat.

### Permainan 17. Hitung Kotak Jam (Picture)

- **Rujukan buku.** hlm. 182 (mulai pukul 6 sampai pukul 7) pada jalur jam
- **Tujuan.** Menghitung banyak jam dari kotak pada jalur jam.
- **Cara main.** Tiga ronde, tiap ronde dua jalur jam. Tiap kotak satu jam. Siswa menghitung kotak dari pukul mulai sampai pukul selesai, lalu memilih banyaknya jam.
- **Ronde.** ronde 1: 6 sampai 8, 9 sampai 1; ronde 2: 7 sampai 11, 2 sampai 3; ronde 3: 5 sampai 11, 4 sampai 7
- **Panduan suara.** Hitung kotak jam dari mulai sampai selesai.

### Permainan 18. Tabel Jam dan Bagian Hari (Picture)

- **Rujukan buku.** hlm. 184 dan 188–189 (tarik garis waktu kegiatan; kelompokkan waktu)
- **Tujuan.** Mengisi tabel jam digital dan bagian harinya.
- **Cara main.** Dua ronde dengan tabel berisi empat baris. Siswa mengetuk baris, lalu mengetuk kartu pagi, siang, sore, atau malam yang tepat.
- **Ronde.** ronde 1: Bagian hari menurut jam; ronde 2: Bagian hari menurut jam, ronde dua
- **Panduan suara.** Isi tabel dengan kartu bagian hari.

### Permainan 19. Goresan Jam (Picture)

- **Rujukan buku.** hlm. 182 (lama kegiatan dalam jam) dalam goresan tally
- **Tujuan.** Menuliskan lama kegiatan dalam jam sebagai goresan tally.
- **Cara main.** Tiga ronde, tiap ronde dua soal, misalnya dari pukul 6 sampai pukul 9. Siswa menekan Goresan sebanyak jam yang berlalu, lalu menekan Periksa. Setiap lima goresan dikelompokkan.
- **Ronde.** ronde 1: 6 sampai 9, 12 sampai 2; ronde 2: 7 sampai 10, 2 sampai 9; ronde 3: 5 sampai 8, 1 sampai 6
- **Panduan suara.** Tambah goresan sebanyak jamnya.

### Permainan 20. Garis Angka Jam (Picture)

- **Rujukan buku.** hlm. 178 (angka satu sampai dua belas pada jam)
- **Tujuan.** Menandai angka jam pada garis angka satu sampai dua belas.
- **Cara main.** Tiga ronde, tiap ronde tiga soal, misalnya tandai angka yang ditunjuk jarum pendek pada pukul enam. Siswa mengetuk bulatan angka yang tepat.
- **Ronde.** ronde 1: 2, 6, 11; ronde 2: 3, 8, 12; ronde 3: 1, 5, 9
- **Panduan suara.** Ketuk angka jam pada garis.

### Permainan 21. Lengkapi Kalimat Waktu (Abstract)

- **Rujukan buku.** hlm. 179–183 (kegiatan Tika; Olahraga Minggu)
- **Tujuan.** Melengkapi kalimat waktu dengan bagian hari atau kata lebih lama dan lebih sebentar.
- **Cara main.** Dua ronde, tiap ronde tiga kalimat, misalnya Tika sarapan pukul 6 ... Siswa memilih satu dari tiga kata. Kalimat yang lengkap dibacakan Suara Guru.
- **Ronde.** ronde 1: 3 kalimat; ronde 2: 3 kalimat
- **Panduan suara.** Pilih kata yang tepat untuk bagian kosong.

### Permainan 22. Benar atau Salah: Waktu (Abstract)

- **Rujukan buku.** hlm. 178–186 (jam, bagian hari, lama kegiatan)
- **Tujuan.** Menilai pernyataan tentang jam, bagian hari, dan lama kegiatan.
- **Cara main.** Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan tentang lama dan bagian hari dihitung dari data kegiatan. Setiap jawaban diberi penjelasan singkat.
- **Ronde.** ronde 1: 5 pernyataan, 3 benar; ronde 2: 5 pernyataan, 3 benar
- **Panduan suara.** Baca pernyataan, lalu pilih benar atau salah.

### Permainan 23. Susun Kalimat Waktu (Abstract)

- **Rujukan buku.** hlm. 178–182 (kalimat tentang jam dan kegiatan)
- **Tujuan.** Menyusun kata menjadi kalimat tentang waktu.
- **Cara main.** Empat kalimat. Kartu kata diketuk berurutan. Satu kartu pengecoh tidak dipakai. Kalimat yang benar dibacakan.
- **Ronde.** ronde 1: Jarum pendek menunjukkan jam; ronde 2: Tika sarapan pukul 6 pagi; ronde 3: Berolahraga lebih lama dari mandi; ronde 4: Tika tidur sejak pukul 9 malam
- **Panduan suara.** Ketuk kata menjadi kalimat yang benar.

### Permainan 24. Hitung Berapa Jam (Abstract)

- **Rujukan buku.** hlm. 182 (mulai pukul 6 sampai pukul 7)
- **Tujuan.** Menghitung lama kegiatan dari pukul mulai sampai pukul selesai.
- **Cara main.** Tiga ronde, tiap ronde dua soal cerita, misalnya Tika belajar mulai pukul 7 sampai pukul 12. Siswa memilih satu dari tiga angka. Kunci dihitung dari jam mulai dan jam selesai.
- **Ronde.** ronde 1: 1 jam, 5 jam; ronde 2: 2 jam, 8 jam; ronde 3: 3 jam, 3 jam
- **Panduan suara.** Baca cerita, lalu pilih berapa jamnya.

### Permainan 25. Tabel Kegiatan dan Bagian Hari (Abstract)

- **Rujukan buku.** hlm. 179–181 dan 184 (kegiatan Tika dan bagian harinya)
- **Tujuan.** Mengisi tabel kegiatan dan bagian harinya.
- **Cara main.** Dua ronde dengan tabel berisi empat baris, misalnya sarapan dengan pagi. Siswa mengetuk baris, lalu mengetuk kartu bagian hari. Kunci dihitung dari jam kegiatan.
- **Ronde.** ronde 1: Kegiatan dan bagian hari; ronde 2: Kegiatan dan bagian hari, ronde dua
- **Panduan suara.** Isi tabel dengan kartu bagian hari.

### Permainan 26. Pilih Bagian Hari (Abstract)

- **Rujukan buku.** hlm. 188–189 (kelompokkan waktu kegiatan)
- **Tujuan.** Menentukan bagian hari dari jam digital 24 jam.
- **Cara main.** Tiga ronde, tiap ronde tiga soal, misalnya pukul 07.00 termasuk pagi. Siswa memilih satu dari tiga bagian hari. Kunci dihitung dari jam digital.
- **Ronde.** ronde 1: 07.00 pagi, 12.00 siang, 16.00 sore; ronde 2: 05.00 pagi, 13.00 siang, 19.00 malam; ronde 3: 09.00 pagi, 14.00 siang, 21.00 malam
- **Panduan suara.** Baca jam digitalnya, lalu pilih bagian harinya.

### Permainan 27. Detektif Waktu (Abstract)

- **Rujukan buku.** hlm. 179–183 (kegiatan dan waktunya)
- **Tujuan.** Menemukan kegiatan dari dua petunjuk waktu.
- **Cara main.** Empat soal. Siswa membaca dua petunjuk, misalnya aku terjadi di pagi hari dan jarum pendek ada di angka enam, lalu memilih satu dari tiga kegiatan. Hanya satu yang cocok dengan kedua petunjuk.
- **Ronde.** soal 1: jawaban sarapan; soal 2: jawaban bermain bersama adik; soal 3: jawaban tidur malam; soal 4: jawaban menyisir rambut
- **Panduan suara.** Baca semua petunjuk, lalu pilih kegiatannya.

### Permainan 28. Peta Konsep Waktu (Abstract)

- **Rujukan buku.** hlm. 156 (peta konsep pengukuran: waktu)
- **Tujuan.** Melengkapi peta konsep membaca jam dan waktu kegiatan.
- **Cara main.** Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala.
- **Ronde.** Membaca jam; Waktu kegiatan
- **Panduan suara.** Pilih kartu yang tepat untuk kotak yang menyala.

### Permainan 29. Urutkan Jam Digital (Abstract)

- **Rujukan buku.** hlm. 186 (urutkan menurut waktu kegiatan)
- **Tujuan.** Mengurutkan jam digital 24 jam dari yang paling awal.
- **Cara main.** Tiga ronde, tiap ronde empat jam digital. Siswa mengetuk jam dari yang paling awal sampai yang paling akhir dalam satu hari.
- **Ronde.** ronde 1: 17.00, 06.00, 12.00, 21.00; ronde 2: 20.00, 05.00, 15.00, 09.00; ronde 3: 14.00, 04.00, 18.00, 08.00
- **Panduan suara.** Ketuk jam dari yang paling awal.

### Permainan 30. Ketuk Semua Jam yang Cocok (Abstract)

- **Rujukan buku.** hlm. 188–189 (kelompokkan waktu: pagi, sore, malam)
- **Tujuan.** Memilih semua jam digital yang termasuk satu bagian hari.
- **Cara main.** Tiga ronde, tiap ronde enam jam digital dan satu bagian hari (pagi, malam, lalu sore). Siswa mengetuk semua jam yang termasuk bagian hari itu, lalu menekan Periksa.
- **Ronde.** ronde 1: pagi: 05.00, 12.00, 07.00, 16.00, 09.00, 21.00; ronde 2: malam: 19.00, 06.00, 13.00, 21.00, 15.00, 08.00; ronde 3: sore: 16.00, 07.00, 17.00, 12.00, 20.00, 15.00
- **Panduan suara.** Ketuk semua jam yang cocok, lalu periksa.

## 8. Poin Penting dan Catatanku

- 🕐 **Dua jarum**: pendek: jam, panjang: menit. _Suara:_ Jarum pendek menunjukkan jam, dan jarum panjang menunjukkan menit.
- 🕔 **Pukul tepat**: panjang di angka 12. _Suara:_ Pukul tepat artinya jarum panjang di angka dua belas, dan jarum pendek menunjukkan jamnya.
- 🔢 **Jam digital**: 05.00 = pukul 5 tepat. _Suara:_ Jam digital menulis waktu dengan angka. Nol lima titik nol nol sama dengan pukul lima tepat.
- 🌅 **Empat bagian hari**: pagi, siang, sore, malam. _Suara:_ Satu hari dibagi menjadi pagi, siang, sore, dan malam. Setiap kegiatan punya bagian harinya.
- ⏳ **Lebih lama, lebih sebentar**: bandingkan lama dua kegiatan. _Suara:_ Kita membandingkan lama dua kegiatan dengan kata lebih lama dan lebih sebentar. Berolahraga lebih lama dari mandi.

**Suara Poin Penting.** Ingat selalu! Jarum pendek menunjukkan jam dan jarum panjang menunjukkan menit. Pukul tepat bila jarum panjang di angka dua belas. Jam digital menulis waktu dengan angka. Satu hari terdiri dari pagi, siang, sore, dan malam, dan kita membandingkan kegiatan dengan kata lebih lama dan lebih sebentar.

**Cara menyebutkan.** Kegiatan pukul jam bagian hari. _Suara:_ Cara menyebutkan. Tika sarapan pukul enam pagi. Sebut kegiatan, kata pukul, jam, lalu bagian harinya.

**Ayo Mencoba di rumah.** Ayo Mencoba di rumah: ceritakan empat kegiatanmu hari ini, satu untuk pagi, siang, sore, dan malam. Gambar jarum jam yang sesuai untuk tiap kegiatan, lalu tuliskan jam digitalnya. Ceritakan juga kegiatan yang lebih lama dan yang lebih sebentar.

**Refleksi (Catatanku).**

- Aku dapat membaca jam tepat.
- Aku dapat menunjukkan kegiatan sesuai waktu.
- Aku dapat membandingkan lebih lama dan lebih sebentar pada kegiatan.
- Aku belajar dengan tertib.

## 9. Metode dari luar buku yang diadopsi

- **Jam analog dan jam digital berdampingan**: pukul 5 tepat sama dengan 05.00. Jam digital 24 jam (16.00 adalah pukul 4 sore) diperkenalkan eksplisit di peta pikiran dan poster sebelum dipakai di permainan.
- **Garis waktu satu hari**: pagi, siang, sore, malam sebagai urutan matahari. Dasar permainan Garis Waktu Hariku dan adegan video dengan matahari yang bergeser.
- **Jalur jam dan hitung selisih**: selisih waktu dihitung dengan menghitung kotak satu jam dari pukul mulai sampai pukul selesai. Dasar permainan Majukan Jam, Hitung Kotak Jam, dan Goresan Jam.
- **Model batang lama kegiatan**: lama kegiatan dibaca dari panjang batang (satu kotak sama dengan satu jam). Dasar permainan Batang Lama Kegiatan.
- **Lama kegiatan dari pengalaman sehari-hari**: mencuci tangan sekitar satu menit, mandi lima belas menit, berolahraga satu jam, tidur delapan jam. Data lama kegiatan satu sumber dengan kuncinya.
- **Memori pasangan (concentration)**: mencocokkan kartu kegiatan dengan kartu jam melatih ingatan dan membaca jam sekaligus.

## 10. Batas yang diketahui

- Soal Latihan (30 poin), soal Ujian (70 poin), dan Simulasi belum dibuat. Pemilik akan menugaskannya terpisah. Sampai saat itu tab Latihan dan Ujian menampilkan kartu "sedang disiapkan".
- Suara dan ketukan video diuji dengan suara perangkat di Chrome desktop berukuran ponsel. Pada sebagian Android, tombol Jeda tidak menghentikan suara di tengah kalimat (Web Speech `pause()` tidak didukung merata).
- Laju 0,70 dan nada 1 sama untuk Bu Sari dan Pak Budi. Beda guru hanya pada suara yang dipilih perangkat (wanita atau pria). Perangkat yang hanya punya satu suara Indonesia akan membuat kedua guru terdengar serupa.
- Ucapan memakai kata, bukan lambang, supaya suara perangkat tidak salah membaca.
- Tiga puluh permainan per sub-bab memakai sepuluh jenis per tahap. Mesin yang sama (urut ketuk, pilih bertahap, jodohkan, ketuk semua) dipakai lintas tahap dengan isi yang berbeda: benda nyata di Concrete, diagram di Picture, kata dan angka di Abstract.
- Jam digital 24 jam (misalnya 16.00 untuk pukul 4 sore) diperkenalkan sebagai pengayaan di peta pikiran dan poster. Jam di muka jam analog hanya menampilkan pukul tepat (jarum panjang di angka 12); menit belum diajarkan di bab ini.

