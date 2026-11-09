# Naskah Matematika Kelas 2 SD, Bab 2: Penjumlahan dan Pengurangan, Sub-Bab C: Soal Cerita Penjumlahan dan Pengurangan

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k2b2.ts` dan `src/components/modul/data-k2b2.ts`, oleh `scripts/buat-naskah-md-k2b2.mjs`. Isi mengikuti Buku Siswa Matematika Kelas II (Kemendikbudristek, Kurikulum Merdeka, Bab 2 hlm. 37–64) dan diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban tidak ada di berkas ini.

## 1. Identitas modul

| Butir | Isi |
|---|---|
| Modul | `mtk-2-bab2`, sub-bab C |
| Berkas data | `src/data/kelas2-bab2.json` (dibangkitkan `src/content-master/buat-k2-bab2.mjs`, lalu `npm run sync:keys`) |
| Kode bab di server | `k2-mat-bab2` (belum ada seed server karena soal belum ada) |
| Fase dan kelas | `FASE_A`, kelas 2 SD |
| Elemen | 🌈 Fase A • Elemen Bilangan (Kelas 2 SD/MI) |
| Poin Kualifikasi per bab | Latihan 30 dan Ujian 70 (terbit setelah soalnya ada). Praktikum 50 terbit sekali per blok empat bab. |
| Suara Guru | Murni Web Speech API bawaan perangkat (`id-ID`), **laju 0,70 dan nada 1**. Tanpa berkas audio statis, tanpa ElevenLabs. |
| Panggilan API saat siswa belajar | Nol. Seluruh tahap Materi berjalan di klien. |
| Tab Simulasi, Latihan, Ujian | Belum diisi. Latihan dan Ujian menampilkan kartu "sedang disiapkan". Tab Simulasi tidak tampil. |

## 2. Capaian dan tujuan pembelajaran

**Capaian Pembelajaran (CP).** Siswa menyelesaikan soal cerita penjumlahan dan pengurangan bilangan sampai 20 dengan langkah berurutan (diketahui, ditanya, solusi, kesimpulan), memahami kata lebihnya, kurangnya, selisih, dan jumlah, menjumlahkan tiga bilangan, mencari bilangan awal, serta membuat soal cerita sendiri.

**Rujukan.** Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 2: Penjumlahan dan Pengurangan, Sub-Bab C hlm. 54–58 dan Ayo Berkarya hlm. 63).

**Sasaran.** Siswa memahami kata lebihnya, kurangnya, selisih, dan jumlah pada soal cerita, menuliskan yang diketahui dan yang ditanya, memilih operasi penjumlahan atau pengurangan, menyelesaikan soal cerita dengan langkah berurutan, menuliskan kesimpulan, mencari bilangan awal, menjumlahkan tiga bilangan, serta membuat soal cerita sendiri.

**Suara Silabus.** Kita belajar soal cerita penjumlahan dan pengurangan. Bukunya bernama Penjumlahan dan Pengurangan, bagian soal cerita. Kita mengenal empat kata kunci: lebihnya, kurangnya, selisih, dan jumlah. Kita menyelesaikan soal cerita dengan empat langkah berurutan: diketahui, ditanya, solusi, dan kesimpulan. Kita juga membuat soal cerita sendiri. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.

## 3. Peta enam tahap SMICPA dan bobotnya

| Tahap | Isi | Banyak butir |
|---|---|---|
| S. Story | Video animasi HTML/SVG, tiga video. Tiap video diputar satu per satu saat diketuk (tidak ada putar otomatis) | 3 video, 8 adegan, 39 ketukan |
| M. Mind-Map | Peta pikiran berurutan, tiap cabang bisa diketuk dan uraiannya tampil di layar | 8 langkah |
| I. Infografis | Poster rangkuman, suara di tiap panel | 10 panel |
| C. Concrete | Benda nyata yang diketuk, diseret, dan dihitung | 4 permainan |
| P. Picture | Diagram polos: jalur bilangan, tabel nilai tempat, bagan pasangan, model batang | 3 permainan |
| A. Abstract | Kata dan angka: kartu, isian, kanvas guratan | 3 permainan |

Bobot mengikuti isi buku. Aturan Concrete dan Picture berlaku: benda berwarna hanya di Concrete, Picture hanya diagram tanpa gambar benda. Aturan susun ke bawah: angka soal biru besar, angka jawaban hijau besar, catatan pindah dan urai merah kecil yang menempel pada angka.

## 4. Tahap 1: Story (video animasi, menggantikan slide)

Tidak ada video yang berjalan sendiri. Siswa mengetuk **▶ Putar** pada satu video. Video itu berjalan, dan video lain berhenti. Setiap kalimat adalah satu ketukan: dibacakan Suara Guru perangkat, dan gambar berubah mengikuti kalimat yang sedang dibacakan. Ada tombol Jeda, Ulang, dan Suara hidup atau mati.

### Video 1: Kata Kunci Soal Cerita (Burung hijau dan burung merah)

**Adegan 1. Burung hijau dan burung merah** (`K2B2C-V1-1`)

1. Ada burung hijau dan burung merah di dahan.  
   _Papan layar:_ Burung di dahan
2. Burung hijau ada 4 ekor. Burung merah ada 5 ekor.  
   _Papan layar:_ Hijau 4 • Merah 5
3. Pasangkan burungnya satu-satu. Burung merah ada satu yang tidak berpasangan.  
   _Papan layar:_ Pasangkan satu-satu
4. Banyak burung hijau 1 kurangnya dari banyak burung merah.  
   _Papan layar:_ Hijau 1 kurangnya
5. Banyak burung merah 1 lebihnya dari banyak burung hijau.  
   _Papan layar:_ Merah 1 lebihnya
6. Selisih burung hijau dan burung merah adalah 1.  
   _Papan layar:_ Selisih: 1
7. Jumlah burung hijau dan burung merah adalah 9.  
   _Papan layar:_ Jumlah: 9

**Adegan 2. Empat kata kunci** (`K2B2C-V1-2`)

1. Ingat empat kata kunci ini: lebihnya, kurangnya, selisih, dan jumlah.  
   _Papan layar:_ Empat kata kunci
2. Jumlah berarti semua digabung, jadi kita menambah.  
   _Papan layar:_ Jumlah: tambah
3. Selisih berarti beda banyaknya, jadi bilangan besar dikurangi bilangan kecil.  
   _Papan layar:_ Selisih: kurang
4. Lebihnya dan kurangnya membandingkan dua orang. Baca dulu siapa yang punya lebih banyak.  
   _Papan layar:_ Siapa yang lebih banyak?

### Video 2: Donat Tika dan Malosi (Diketahui, ditanya, solusi, kesimpulan)

**Adegan 1. Donat di meja** (`K2B2C-V2-1`)

1. Tika mempunyai 12 donat.  
   _Papan layar:_ Tika: 12 donat
2. Malosi mempunyai 5 kurangnya dari banyak donat milik Tika.  
   _Papan layar:_ Malosi: 5 kurangnya
3. Pertanyaan a, berapa donat milik Malosi?  
   _Papan layar:_ a. Donat Malosi?
4. Pertanyaan b, berapa jumlah donat milik Tika dan Malosi?  
   _Papan layar:_ b. Jumlah donat?

**Adegan 2. Diketahui dan ditanya** (`K2B2C-V2-2`)

1. Langkah pertama, tulis apa yang diketahui.  
   _Papan layar:_ Langkah 1: Diketahui
2. Diketahui, Tika punya 12 donat. Malosi punya 5 kurangnya dari Tika.  
   _Papan layar:_ Tika 12 • Malosi −5
3. Langkah kedua, tulis apa yang ditanya.  
   _Papan layar:_ Langkah 2: Ditanya
4. Ditanya, banyak donat Malosi, dan jumlah donat Tika dan Malosi.  
   _Papan layar:_ Donat Malosi? Jumlah?

**Adegan 3. Solusi dan kesimpulan** (`K2B2C-V2-3`)

1. Langkah ketiga, solusi. Malosi punya 5 kurangnya, jadi kita kurangkan: 12 dikurangi 5 sama dengan 7.  
   _Papan layar:_ Solusi: 12 − 5 = 7
2. Jadi, Malosi memiliki 7 donat.  
   _Papan layar:_ Malosi: 7 donat
3. Untuk jumlah, kita tambahkan: 7 ditambah 12 sama dengan 19.  
   _Papan layar:_ Jumlah: 7 + 12 = 19
4. Langkah keempat, kesimpulan. Jumlah donat milik Tika dan Malosi adalah 19 donat.  
   _Papan layar:_ Jadi, 19 donat

### Video 3: Jeruk Halim dan Boneka Tiga Sahabat (Bilangan awal dan tiga bilangan)

**Adegan 1. Keranjang jeruk Halim** (`K2B2C-V3-1`)

1. Halim mempunyai satu keranjang buah jeruk.  
   _Papan layar:_ Keranjang jeruk Halim
2. Halim memberikan 4 jeruk kepada Lili. Sekarang jeruk Halim tersisa 12 buah.  
   _Papan layar:_ Diberi 4 • Sisa 12
3. Berapa banyak jeruk Halim sebelum diberikan kepada Lili?  
   _Papan layar:_ Jeruk semula = ?
4. Kita tulis: titik-titik dikurangi 4 sama dengan 12.  
   _Papan layar:_ … − 4 = 12
5. Untuk mencarinya, kita balik: 12 ditambah 4 sama dengan 16.  
   _Papan layar:_ 12 + 4 = 16
6. Jadi banyak jeruk Halim sebelumnya adalah 16 buah.  
   _Papan layar:_ Semula: 16 jeruk

**Adegan 2. Boneka tiga sahabat** (`K2B2C-V3-2`)

1. Tika, Kira, dan Lili sedang bermain boneka.  
   _Papan layar:_ Tiga sahabat
2. Tika membawa 5 boneka. Kira membawa 7 boneka. Lili membawa 8 boneka.  
   _Papan layar:_ Tika 5 • Kira 7 • Lili 8
3. Berapa jumlah semua boneka?  
   _Papan layar:_ Jumlah semuanya?
4. Jumlahkan dua dulu, boneka Tika dan Kira: 5 ditambah 7 sama dengan 12.  
   _Papan layar:_ 5 + 7 = 12
5. Lalu tambahkan boneka Lili: 12 ditambah 8 sama dengan 20.  
   _Papan layar:_ 12 + 8 = 20
6. Jadi jumlah semua boneka adalah 20 buah.  
   _Papan layar:_ Jumlah: 20 boneka

**Adegan 3. Soal cerita buatan sendiri** (`K2B2C-V3-3`)

1. Sekarang giliranmu membuat soal cerita!  
   _Papan layar:_ Giliranmu!
2. Pilih tokoh, benda, dan kata kunci. Lalu tulis bilangannya.  
   _Papan layar:_ Tokoh • Benda • Kata kunci
3. Mintalah temanmu menyelesaikannya dengan diketahui, ditanya, solusi, dan kesimpulan.  
   _Papan layar:_ Tukar dengan teman
4. Soal cerita yang baik punya pertanyaan yang jelas dan bisa dijawab.  
   _Papan layar:_ Pertanyaan jelas

## 5. Tahap 2: Mind-Map (peta pikiran)

**1. Baca dan Bayangkan** 📖  
Bacalah soal cerita dua kali. Pertama untuk tahu ceritanya, kedua untuk mencari bilangannya. Lalu ceritakan ulang dengan kata-katamu sendiri dan bayangkan kejadiannya. Siapa tokohnya, bendanya apa, dan apa yang terjadi? Anak yang membayangkan cerita lebih jarang salah memilih tanda.

_Alur:_ Soal cerita → Kata kunci

**2. Empat Kata Kunci** 🔑  
Ingat empat kata: lebihnya, kurangnya, selisih, dan jumlah. Jumlah berarti digabung, jadi menambah. Selisih berarti beda banyaknya, jadi bilangan besar dikurangi bilangan kecil. Lebihnya dan kurangnya membandingkan dua orang. Tanyakan: siapa yang punya lebih banyak, dan bilangan siapa yang sudah diketahui?

_Alur:_ Kata kunci → Diketahui

**3. Diketahui** 📝  
Tuliskan semua yang sudah kita ketahui dari cerita beserta bendanya. Contohnya, Tika mempunyai 12 donat, dan Malosi mempunyai 5 kurangnya dari donat Tika. Jangan menulis yang ditanyakan di bagian ini. Menulis diketahui membantu kita memilah bilangan yang penting.

_Alur:_ Diketahui → Ditanya

**4. Ditanya** ❓  
Tuliskan pertanyaan yang harus dijawab, dalam kalimat yang jelas. Contohnya, berapa banyak donat milik Malosi, dan berapa jumlah donat Tika dan Malosi? Satu soal bisa punya lebih dari satu pertanyaan. Kerjakan pertanyaan satu per satu, sesuai urutannya.

_Alur:_ Ditanya → Solusi

**5. Solusi: Pilih Operasi** 🧮  
Pilih tanda yang cocok dengan ceritanya. Malosi punya 5 kurangnya dari Tika, jadi donat Malosi adalah 12 dikurangi 5 sama dengan 7. Untuk jumlah, kita tambahkan 7 ditambah 12 sama dengan 19. Pakai cara berhitung yang paling mudah: menghitung maju atau mundur, bersusun, atau pasangan bilangan.

_Alur:_ Solusi → Kesimpulan

**6. Kesimpulan** 🏁  
Tutup jawabanmu dengan kalimat kesimpulan yang diawali kata jadi, lalu sebutkan hasilnya beserta bendanya. Contohnya, jadi jumlah donat milik Tika dan Malosi adalah 19 donat. Jangan lupa satuan bendanya. Kesimpulan menjawab pertanyaan dalam bentuk kalimat utuh.

_Alur:_ Kesimpulan → Bilangan awal

**7. Mencari Bilangan Awal** 🔙  
Kadang yang ditanyakan adalah banyak benda sebelum sesuatu terjadi. Halim memberikan 4 jeruk, sisanya 12. Kita tulis titik-titik dikurangi 4 sama dengan 12. Untuk mencari bilangan awalnya, balik operasinya: 12 ditambah 4 sama dengan 16. Periksa dengan mengurangkan lagi: 16 dikurangi 4 sama dengan 12.

_Alur:_ Bilangan awal → Tiga bilangan

**8. Model Batang dan Tiga Bilangan** 📏  
Gambarlah masalahnya dengan model batang, cara yang dipakai di Singapura. Batang panjang untuk bilangan yang lebih banyak, batang pendek untuk yang lebih sedikit, dan bagian yang tersisa adalah selisihnya. Untuk menjumlahkan tiga bilangan, jumlahkan dua dulu, lalu tambahkan yang ketiga. Cari dulu dua bilangan yang berjumlah sepuluh supaya lebih mudah.

_Alur:_ Tiga bilangan → Soal cerita siap dipakai

## 6. Tahap 3: Infografis

**Panel 1. Burung Hijau dan Burung Merah** 🐦 (9, Sembilan)

> Burung hijau ada empat ekor dan burung merah ada lima ekor. Banyak burung hijau satu kurangnya dari burung merah. Banyak burung merah satu lebihnya dari burung hijau. Selisihnya satu. Jumlah burung hijau dan merah adalah sembilan.

**Panel 2. Empat Kata Kunci** 🔑 (4, Empat)

> Empat kata kunci soal cerita. Lebihnya berarti ada yang punya lebih banyak. Kurangnya berarti ada yang punya lebih sedikit. Kedua kata ini membandingkan dua orang, jadi lihat dulu siapa yang dicari. Kalau yang dicari punya lebih banyak, kita menambah. Kalau yang dicari punya lebih sedikit, kita mengurangi. Selisih adalah beda banyaknya, bilangan besar dikurangi bilangan kecil. Jumlah berarti semua digabung, kita menambah.

**Panel 3. Empat Langkah Menyelesaikan** 🪜 (4, Empat)

> Selesaikan soal cerita dengan empat langkah berurutan. Satu, diketahui, apa yang sudah kita tahu. Dua, ditanya, apa yang harus dicari. Tiga, solusi, hitungan dengan tanda yang cocok. Empat, kesimpulan, kalimat jawaban yang diawali kata jadi.

**Panel 4. Contoh 1: Donat Tika dan Malosi** 🍩 (19, Sembilan belas)

> Tika punya dua belas donat. Malosi punya lima kurangnya dari donat Tika. Donat Malosi adalah dua belas dikurangi lima sama dengan tujuh. Jumlah donat Tika dan Malosi adalah tujuh ditambah dua belas sama dengan sembilan belas. Jadi jumlah donat Tika dan Malosi adalah sembilan belas donat.

**Panel 5. Contoh 2: Jeruk Halim** 🍊 (16, Enam belas)

> Halim memberikan empat jeruk kepada Lili. Sisa jeruk Halim dua belas. Titik-titik dikurangi empat sama dengan dua belas. Untuk mencari bilangan awal, kita balik menjadi dua belas ditambah empat sama dengan enam belas. Jadi jeruk Halim sebelumnya adalah enam belas buah.

**Panel 6. Contoh 3: Boneka Tiga Sahabat** 🧸 (20, Dua puluh)

> Tika membawa lima boneka, Kira tujuh, dan Lili delapan. Jumlahkan dua dulu: lima ditambah tujuh sama dengan dua belas. Lalu dua belas ditambah delapan sama dengan dua puluh. Jadi jumlah semua boneka adalah dua puluh buah.

**Panel 7. Model Batang** 📏 (19, Sembilan belas)

> Model batang membantu kita melihat soal. Batang Tika panjang, dua belas. Batang Malosi lebih pendek, tujuh, karena lima kurangnya. Bagian yang tersisa, lima, adalah selisihnya. Kalau kedua batang digabung, jumlahnya sembilan belas.

**Panel 8. Tambah atau Kurang?** ➕ (2, Dua)

> Kapan menambah? Saat kata jumlah, semua, digabung, memetik lagi, atau mendapat lagi. Kapan mengurangi? Saat kata selisih, sisa, diberikan, dimakan, atau hilang. Untuk lebihnya dan kurangnya, baca dulu siapa yang punya lebih banyak. Kalau bilangan yang dicari lebih banyak, kita menambah. Kalau lebih sedikit, kita mengurangi.

**Panel 9. Mencari Bilangan Awal** 🔙 (16, Enam belas)

> Untuk mencari bilangan awal, balikkan kejadiannya. Kalau ada yang diberikan, kita kembalikan dengan menambah. Kalau ada yang bertambah, kita kembalikan dengan mengurangi. Sisa dua belas, diberikan empat, maka awalnya dua belas ditambah empat sama dengan enam belas.

**Panel 10. Tips Detektif Soal Cerita** 🕵️ (5, Lima)

> Tips detektif soal cerita, ada lima. Baca pelan-pelan. Tandai bilangan dan kata kuncinya. Gambar model batang atau jalur bilangan. Hitung dengan cara yang paling mudah. Periksa hasilnya, apakah masuk akal. Cara serupa dipakai anak di Amerika Serikat dengan nama CUBES.

## 7. Tahap 4, 5, dan 6: sepuluh permainan

| No | Tahap | Permainan | Jenis | Ronde |
|---|---|---|---|---|
| 1 | Concrete | Burung Kata Kunci | `keyword-on-objects` | hijau 4, merah 5; hijau 3, merah 7; hijau 6, merah 9 |
| 2 | Concrete | Meja Donat | `drag-to-make-fewer-or-more` | Tika 12, Malosi 5 kurangnya (7; jumlah 19); Kira 8, Upe 4 lebihnya (12; jumlah 20); Lili 11, Dodi 6 kurangnya (5; jumlah 16) |
| 3 | Concrete | Keranjang Jeruk Halim | `undo-to-find-start` | diberi 4, sisa 12 (semula 16); diberi 3, sisa 9 (semula 12); diberi 5, sisa 10 (semula 15) |
| 4 | Concrete | Boneka Tiga Sahabat | `merge-three-groups` | 5, 7, 8; 4, 9, 6; 3, 8, 7 |
| 5 | Picture | Model Batang Cerita | `bar-model-story` | Upe 8, Halim 3 lebihnya (11; jumlah 19); Lili 13, Tika 6 kurangnya (7; jumlah 20); Dodi 7, Nia 5 lebihnya (12; jumlah 19) |
| 6 | Picture | Susun Alur Penyelesaian | `order-solution-flow` | donat Tika dan Malosi; jeruk Halim; boneka tiga sahabat |
| 7 | Picture | Panah di Jalur Bilangan | `choose-direction-and-hop` | 14 maju 5 = 19; 18 mundur 6 = 12; 9 maju 7 = 16 |
| 8 | Abstract | Kata Kunci Jadi Tanda | `sort-keyword-to-sign` | ronde 1: lebih banyak (+), kurangnya (−), selisih (−), jumlah (+); ronde 2: lagi (+), memakan (−), digabung (+), sisa (−) |
| 9 | Abstract | Laporan Detektif Cerita | `report-four-steps` | hasil 7; hasil 18; hasil 8 |
| 10 | Abstract | Pencipta Soal Cerita | `story-builder` | ronde 1: tambah; ronde 2: kurang |

### Permainan 1. Burung Kata Kunci (Concrete)

- **Rujukan buku.** hlm. 54 (gambar burung hijau dan burung merah: lebihnya, kurangnya, selisih, jumlah)
- **Tujuan.** Menghubungkan kata lebihnya, kurangnya, selisih, dan jumlah dengan benda yang dipasangkan.
- **Cara main.** Tiga ronde (4 dan 5, 3 dan 7, 6 dan 9 burung). Burung hijau dan merah dipasangkan satu-satu. Tiap ronde ada empat pertanyaan: lebihnya, kurangnya, selisih, dan jumlah. Burung yang tidak berpasangan atau semua burung menyala sesuai kata kunci. Siswa memilih bilangannya.
- **Ronde.** hijau 4, merah 5; hijau 3, merah 7; hijau 6, merah 9
- **Panduan suara.** Lihat burung yang menyala, lalu pilih bilangannya.

### Permainan 2. Meja Donat (Concrete)

- **Rujukan buku.** hlm. 54–55 (Contoh 1: Tika 12 donat, Malosi 5 kurangnya)
- **Tujuan.** Membuat banyak benda yang lebih atau kurang dari benda lain, lalu mencari jumlah keduanya.
- **Cara main.** Tiga ronde (12 dan 5 kurangnya, 8 dan 4 lebihnya, serta 11 dan 6 kurangnya). Siswa menyeret donat ke piring tokoh kedua sampai banyaknya tepat lebih atau kurang dari piring pertama, lalu menekan periksa. Setelah itu siswa memilih jumlah donat kedua tokoh. Terakhir ucapkan jumlahnya.
- **Ronde.** Tika 12, Malosi 5 kurangnya (7; jumlah 19); Kira 8, Upe 4 lebihnya (12; jumlah 20); Lili 11, Dodi 6 kurangnya (5; jumlah 16)
- **Panduan suara.** Seret donat sampai banyaknya tepat, lalu cari jumlahnya.

### Permainan 3. Keranjang Jeruk Halim (Concrete)

- **Rujukan buku.** hlm. 55–56 (Contoh 2: Halim memberikan 4 jeruk, sisa 12; berapa jeruk semula?)
- **Tujuan.** Mencari bilangan awal dengan mengembalikan benda yang diberikan.
- **Cara main.** Tiga ronde (diberi 4 sisa 12, diberi 3 sisa 9, dan diberi 5 sisa 10). Siswa menyeret jeruk dari piring Lili kembali ke keranjang Halim satu per satu, lalu memilih banyak jeruk semula. Layar menunjukkan kalimat titik-titik dikurangi sebanyak yang diberikan sama dengan sisa. Terakhir ucapkan banyak jeruk semula.
- **Ronde.** diberi 4, sisa 12 (semula 16); diberi 3, sisa 9 (semula 12); diberi 5, sisa 10 (semula 15)
- **Panduan suara.** Kembalikan jeruk ke keranjang, lalu hitung jeruk semula.

### Permainan 4. Boneka Tiga Sahabat (Concrete)

- **Rujukan buku.** hlm. 56 (Contoh 3: Tika 5, Kira 7, Lili 8 boneka; jumlah semua?) dan hlm. 57 (Ayo Berlatih nomor 2)
- **Tujuan.** Menjumlahkan tiga kelompok benda dengan menggabungkan dua kelompok dulu, lalu kelompok ketiga.
- **Cara main.** Tiga ronde (5, 7, 8; 4, 9, 6; serta 3, 8, 7 boneka). Siswa mengetuk dua kelompok untuk digabung, memilih jumlah keduanya, lalu menggabungkan dengan kelompok ketiga dan memilih jumlah semuanya. Ada petunjuk bila dua kelompok berjumlah sepuluh. Terakhir ucapkan jumlah semuanya.
- **Ronde.** 5, 7, 8; 4, 9, 6; 3, 8, 7
- **Panduan suara.** Gabungkan dua kelompok dulu, lalu kelompok ketiga.

### Permainan 5. Model Batang Cerita (Picture)

- **Rujukan buku.** hlm. 54–55 (gambar burung dan Contoh 1), diperkaya model batang dari Singapura
- **Tujuan.** Menggambarkan cerita dengan model batang untuk menemukan bilangan yang dicari dan jumlahnya.
- **Cara main.** Tiga ronde (8 dan 3 lebihnya, 13 dan 6 kurangnya, serta 7 dan 5 lebihnya). Model batang dua tokoh digambar dengan bagian lebihnya atau kurangnya. Siswa memilih bilangan batang yang bertanda tanya, lalu memilih jumlah kedua batang.
- **Ronde.** Upe 8, Halim 3 lebihnya (11; jumlah 19); Lili 13, Tika 6 kurangnya (7; jumlah 20); Dodi 7, Nia 5 lebihnya (12; jumlah 19)
- **Panduan suara.** Lihat batangnya, lalu pilih bilangan yang bertanda tanya.

### Permainan 6. Susun Alur Penyelesaian (Picture)

- **Rujukan buku.** hlm. 55–56 (Penyelesaian: diketahui, ditanya, solusi, kesimpulan)
- **Tujuan.** Menyusun empat langkah penyelesaian soal cerita dengan urutan yang benar.
- **Cara main.** Tiga ronde (donat Tika dan Malosi, jeruk Halim, dan boneka tiga sahabat). Empat kartu langkah teracak. Siswa mengetuk kartu berurutan: diketahui, ditanya, solusi, kesimpulan. Kartu masuk ke diagram alur dengan panah.
- **Ronde.** donat Tika dan Malosi; jeruk Halim; boneka tiga sahabat
- **Panduan suara.** Ketuk kartu sesuai urutan: diketahui, ditanya, solusi, kesimpulan.

### Permainan 7. Panah di Jalur Bilangan (Picture)

- **Rujukan buku.** hlm. 54–58 (soal cerita lebihnya, kurangnya, dan sisa), diperkaya jalur bilangan kosong
- **Tujuan.** Menentukan arah lompatan (maju atau mundur) dari kalimat cerita, lalu melompat dan membaca hasilnya.
- **Cara main.** Tiga ronde (14 mendapat 5 lagi, 18 dimakan 6, dan 9 dengan 7 lebihnya). Siswa membaca cerita, memilih arah maju atau mundur, lalu mengetuk kotak jalur bilangan sebanyak lompatan dan menekan Berhenti. Terakhir ucapkan hasilnya.
- **Ronde.** 14 maju 5 = 19; 18 mundur 6 = 12; 9 maju 7 = 16
- **Panduan suara.** Pilih arah, lalu lompat di jalur bilangan.

### Permainan 8. Kata Kunci Jadi Tanda (Abstract)

- **Rujukan buku.** hlm. 54 (lebihnya, kurangnya, selisih, jumlah) dan hlm. 55–56 (memilih operasi pada solusi)
- **Tujuan.** Menentukan tanda tambah atau kurang dari kalimat cerita pendek.
- **Cara main.** Dua ronde, masing-masing empat kartu kalimat. Siswa mengetuk kartu lalu kotak tambah atau kotak kurang. Kata kunci pada kartu diberi warna. Kartu yang salah meluncur kembali disertai petunjuk.
- **Ronde.** ronde 1: lebih banyak (+), kurangnya (−), selisih (−), jumlah (+); ronde 2: lagi (+), memakan (−), digabung (+), sisa (−)
- **Panduan suara.** Ketuk kartu, lalu pilih tambah atau kurang.

### Permainan 9. Laporan Detektif Cerita (Abstract)

- **Rujukan buku.** hlm. 57–58 (Ayo Berlatih nomor 1, 2, dan 3: diketahui, ditanya, solusi, jadi)
- **Tujuan.** Mengisi laporan diketahui, ditanya, solusi, dan kesimpulan untuk satu soal cerita.
- **Cara main.** Tiga ronde (selisih mainan, kupu-kupu di tiga tempat, dan kelereng Upe dan Halim). Tiap ronde ada empat langkah. Siswa memilih satu dari tiga jawaban untuk diketahui, ditanya, solusi, dan kesimpulan. Jawaban yang salah memuat jebakan kata lebihnya.
- **Ronde.** hasil 7; hasil 18; hasil 8
- **Panduan suara.** Pilih jawaban untuk tiap langkah laporan.

### Permainan 10. Pencipta Soal Cerita (Abstract)

- **Rujukan buku.** hlm. 56 (Ayo Mencoba: buat soal cerita) dan hlm. 63 (Ayo Berkarya: buat satu soal cerita)
- **Tujuan.** Menyusun soal cerita sendiri dengan tokoh, benda, kata kunci, dan bilangan, lalu menyelesaikannya.
- **Cara main.** Dua ronde. Ronde 1 soal penjumlahan dengan kata lebihnya. Ronde 2 soal pengurangan dengan kata kurangnya. Siswa memilih tokoh, benda, dan bilangan. Soal tersusun otomatis, lalu siswa memilih jawabannya. Batas: hasil tidak lebih dari 20 dan tidak kurang dari 0.
- **Ronde.** ronde 1: tambah; ronde 2: kurang
- **Panduan suara.** Pilih tokoh, benda, dan bilangan, lalu selesaikan soalmu.

## 8. Poin Penting dan Catatanku

- 🔑 **Empat kata kunci**: lebihnya • kurangnya • selisih • jumlah. _Suara:_ Empat kata kunci soal cerita adalah lebihnya, kurangnya, selisih, dan jumlah. Jumlah berarti menambah. Selisih berarti bilangan besar dikurangi bilangan kecil. Untuk lebihnya dan kurangnya, baca dulu siapa yang punya lebih banyak.
- 🪜 **Empat langkah**: diketahui, ditanya, solusi, kesimpulan. _Suara:_ Selesaikan soal cerita dengan empat langkah berurutan. Diketahui, ditanya, solusi, dan kesimpulan.
- 🔙 **Bilangan awal**: … − 4 = 12, maka 12 + 4 = 16. _Suara:_ Untuk mencari bilangan awal, balikkan kejadiannya. Titik-titik dikurangi empat sama dengan dua belas, jadi dua belas ditambah empat sama dengan enam belas.
- ➕ **Tiga bilangan**: 5 + 7 = 12, lalu 12 + 8 = 20. _Suara:_ Menjumlahkan tiga bilangan. Jumlahkan dua dulu, lalu tambahkan bilangan ketiga. Lima ditambah tujuh sama dengan dua belas. Dua belas ditambah delapan sama dengan dua puluh.
- 📏 **Model batang**: gambar soalnya supaya jelas. _Suara:_ Gambarlah soal dengan model batang. Batang panjang untuk yang lebih banyak, batang pendek untuk yang lebih sedikit. Bagian yang tersisa adalah selisihnya.

**Suara Poin Penting.** Ingat selalu! Baca soal cerita pelan-pelan. Cari kata kunci: lebihnya, kurangnya, selisih, dan jumlah. Tulis diketahui, ditanya, solusi, dan kesimpulan secara berurutan. Untuk mencari bilangan awal, balikkan kejadiannya. Periksa apakah jawabanmu masuk akal.

**Cara menyebutkan.** Jadi, jumlah donat Tika dan Malosi adalah 19 donat. _Suara:_ Cara menulis kesimpulan. Jadi, jumlah donat milik Tika dan Malosi adalah sembilan belas donat.

**Ayo Mencoba di rumah.** Ayo Mencoba di rumah: buatlah satu soal cerita penjumlahan atau pengurangan tentang benda di rumahmu. Mintalah anggota keluarga menyelesaikannya dengan menulis diketahui, ditanya, solusi, dan kesimpulan. Lalu tukar peran.

**Refleksi (Catatanku).**

- Aku bisa melakukan penjumlahan.
- Aku bisa melakukan pengurangan.
- Aku bisa mengerjakan soal cerita dengan langkah yang berurutan.
- Aku menyampaikan pendapat dengan percaya diri.

## 9. Metode dari luar buku yang diadopsi

- **Model batang (bar model)** dari Singapore Math untuk menggambar soal cerita sebelum menghitung.
- **CUBES** (Circle, Underline, Box, Evaluate, Solve) dari Amerika Serikat, disederhanakan menjadi Baca, Tandai, Gambar, Hitung, Periksa.
- **Operasi balik** untuk mencari bilangan awal (… − 4 = 12 menjadi 12 + 4).
- **Mencari sahabat sepuluh saat menjumlahkan tiga bilangan** (strategi make ten) dan **menggabungkan dua kelompok dulu**.
- **Posing problems**: siswa membuat soal sendiri (Ayo Mencoba dan Ayo Berkarya), dipakai di Finlandia dan Jepang sebagai penguat penalaran.

## 10. Batas yang diketahui

- Soal Latihan (30 poin), soal Ujian (70 poin), dan Simulasi belum dibuat. Pemilik akan menugaskannya terpisah. Sampai saat itu tab Latihan dan Ujian menampilkan kartu "sedang disiapkan".
- Suara dan ketukan video diuji dengan suara perangkat di Chrome desktop berukuran ponsel. Pada sebagian Android, tombol Jeda tidak menghentikan suara di tengah kalimat (Web Speech `pause()` tidak didukung merata).
- Laju 0,70 dan nada 1 sama untuk Bu Sari dan Pak Budi. Beda guru hanya pada suara yang dipilih perangkat (wanita atau pria). Perangkat yang hanya punya satu suara Indonesia akan membuat kedua guru terdengar serupa.

