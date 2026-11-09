# Naskah Matematika Kelas 3 SD, Bab 5: Penyajian Data dalam Tabel, Sub-Bab A: Mengurutkan dan Membandingkan Data

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k3b5.ts` dan `src/components/modul/data-k3b5.ts`, oleh `scripts/buat-naskah-md.mjs`. Isi mengikuti Buku Siswa Matematika Kelas III (Kemendikbudristek, Kurikulum Merdeka, Bab 5 hlm. 195–212) dan Buku Panduan Guru Bab 5, serta diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.

## 1. Identitas modul

- Kode bab: `k3-mat-bab5`, FASE_B, kelas 3.
- Judul: BAB 5: PENYAJIAN DATA DALAM TABEL. Sub-Bab A: Mengurutkan dan Membandingkan Data.
- Suara Guru: Web Speech API perangkat saja, laju 0.7 dan nada 1. Tanpa ElevenLabs.
- Isi: 3 video cerita (9 adegan), 8 langkah peta pikiran, 10 panel infografis, 30 permainan (10 Concrete, 10 Picture, 10 Abstract), 5 poin penting.

## 2. Tujuan belajar

Siswa mengurutkan data dari terkecil ke terbesar atau sebaliknya, menentukan data terkecil dan data terbesar, menghitung jangkauan (selisih data terbesar dan terkecil), serta mencacah banyak kemunculan sebuah nilai pada data ulangan dengan bantuan turus.

- Capaian Pembelajaran: Siswa mengurutkan data, menentukan data terkecil dan terbesar, serta menghitung jangkauan data. Pada sub-bab ini siswa juga mencacah banyak kemunculan nilai dengan turus.
- Acuan: Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 5: Penyajian Data dalam Tabel, Sub-Bab A hlm. 198–200) dan Buku Panduan Guru Bab 5 Topik A.

## 3. Metode dari luar buku

- **Jangkauan (range)**: data terbesar dikurangi data terkecil, diperkaya dari istilah statistik dasar sebelum rata-rata diajarkan.
- **Turus/tally marks**: mengingat turus Kelas 2, lalu dipakai untuk mencacah frekuensi nilai ulangan.
- **Frekuensi nilai**: berapa kali sebuah nilai muncul (misalnya nilai 9 muncul lima kali) sebelum masuk tabel lengkap.
- **Mengurutkan data**: dari terkecil ke terbesar memudahkan mencari data terkecil, terbesar, dan jangkauan.
- **Perbandingan tumpukan benda**: anak dengan banyak benda berbeda dipakai sebagai model konkret sebelum turus dan angka.
- **Pilah menurut ambang**: sedikit (<5), sedang (5–7), banyak (>7) melatih membandingkan tanpa menghitung jangkauan dulu.

## 4. Tahap 1: Story (video cerita animasi SVG)

Tiap video diputar satu per satu saat siswa mengetuk Putar. Tidak ada yang berjalan sendiri. Kalimat dibacakan Suara Guru satu per satu (ketukan), dan gambar berubah mengikuti ketukan.

### K3B5A-V1. Pemilihan Ketua Kelas (Data suara calon ketua kelas)

**K3B5A-V1-1. Hari pemilihan**

1. Hari ini diadakan pemilihan ketua kelas. *(papan: Hari pemilihan ketua kelas)*
2. Beberapa siswa diajukan menjadi calon ketua kelas. *(papan: Beberapa calon diajukan)*
3. Setiap siswa berhak memilih salah satu calon. *(papan: Setiap siswa memilih satu)*
4. Calon dengan suara terbanyak terpilih menjadi ketua kelas. *(papan: Suara terbanyak yang menang)*

**K3B5A-V1-2. Berapa calon**

1. Ada berapa calon ketua kelas? *(papan: Ada berapa calon?)*
2. Kita perlu mencatat suara tiap calon. *(papan: Catat suara tiap calon)*
3. Data suara itu akan kita urutkan dan bandingkan. *(papan: Urutkan dan bandingkan)*
4. Siapa yang mendapatkan suara paling banyak? *(papan: Siapa suara paling banyak?)*

**K3B5A-V1-3. Data perlu diurutkan**

1. Untuk menjawabnya, data perlu disusun rapi. *(papan: Data disusun rapi)*
2. Kita mengurutkan data dari yang terkecil. *(papan: Urutkan dari terkecil)*
3. Lalu kita bandingkan data terbesar dan terkecil. *(papan: Bandingkan terbesar dan terkecil)*
4. Itulah awal belajar penyajian data. *(papan: Awal belajar data)*

### K3B5A-V2. Anggota Keluarga (Mengurutkan dan membandingkan data)

**K3B5A-V2-1. Lembar isian**

1. Setiap anggota kelompok mengisi lembar isian. *(papan: Isi lembar isian)*
2. Mereka menulis nama dan banyak anggota keluarga. *(papan: Nama dan banyak anggota)*
3. Semua lembar dikumpulkan menjadi ringkasan data. *(papan: Kumpulkan jadi ringkasan)*
4. Nama dan banyak anggota keluarga tercatat rapi. *(papan: Data tercatat rapi)*

**K3B5A-V2-2. Urutkan dari terkecil**

1. Urutkan nama dari yang jumlah anggota keluarganya terkecil. *(papan: Urutkan dari terkecil)*
2. Berapa banyak anggota keluarga paling sedikit? *(papan: Paling sedikit berapa?)*
3. Berapa banyak anggota keluarga paling banyak? *(papan: Paling banyak berapa?)*
4. Adakah anak yang jumlah anggota keluarganya sama? *(papan: Adakah yang sama?)*

**K3B5A-V2-3. Jangkauan**

1. Selisih nilai data terbesar dan terkecil disebut jangkauan. *(papan: Selisih disebut jangkauan)*
2. Jangkauan sama dengan data terbesar dikurangi data terkecil. *(papan: Terbesar dikurangi terkecil)*
3. Jangkauan membantu kita melihat seberapa jauh data menyebar. *(papan: Melihat seberapa jauh data)*
4. Mari hitung jangkauan dari data kelompok. *(papan: Hitung jangkauan kelompok)*

### K3B5A-V3. Nilai Ulangan Harian (Mengurutkan nilai dan menghitung banyaknya)

**K3B5A-V3-1. Hasil penilaian**

1. Ibu guru membagikan hasil ulangan harian Matematika. *(papan: Hasil ulangan dibagikan)*
2. Nilai siswa tertulis: sembilan, tujuh, delapan, enam, sepuluh, dan lima. *(papan: Nilai 5 sampai 10)*
3. Ada dua puluh data nilai yang perlu disusun. *(papan: Dua puluh data nilai)*
4. Kita urutkan dulu dari nilai terkecil ke terbesar. *(papan: Urutkan dari terkecil)*

**K3B5A-V3-2. Enam macam nilai**

1. Setelah diurutkan, tampak enam macam nilai: lima sampai sepuluh. *(papan: Enam macam nilai)*
2. Nilai terkecil adalah lima, nilai terbesar adalah sepuluh. *(papan: Terkecil 5, terbesar 10)*
3. Jangkauannya sepuluh dikurangi lima sama dengan lima. *(papan: Jangkauan 10 − 5 = 5)*
4. Sekarang kita hitung berapa siswa mendapat tiap nilai. *(papan: Hitung banyak tiap nilai)*

**K3B5A-V3-3. Berapa siswa bernilai sembilan**

1. Berapa siswa yang memiliki nilai sembilan? *(papan: Berapa siswa bernilai 9?)*
2. Ada lima siswa, Pak. *(papan: Ada 5 siswa)*
3. Berapa banyak siswa yang mendapatkan nilai sepuluh? *(papan: Berapa siswa bernilai 10?)*
4. Ada dua siswa. Data sudah siap disajikan dalam tabel. *(papan: Ada 2 siswa, siap ke tabel)*

## 5. Tahap 2: Mind map (peta pikiran)

**1. Mengurutkan Data** 📶 (Mengurutkan data → Data terkecil)

Data disusun dari terkecil ke terbesar atau sebaliknya supaya mudah dicari data terkecil, terbesar, dan jangkauannya.

**2. Data Terkecil** ⬇️ (Data terkecil → Data terbesar)

Data terkecil adalah nilai paling kecil pada data. Pada data ulangan, nilai terkecil adalah lima.

**3. Data Terbesar** ⬆️ (Data terbesar → Jangkauan)

Data terbesar adalah nilai paling besar pada data. Pada data ulangan, nilai terbesar adalah sepuluh.

**4. Jangkauan** 📏 (Jangkauan → Turus)

Jangkauan sama dengan data terbesar dikurangi data terkecil. Contoh: sepuluh dikurangi lima sama dengan lima.

**5. Turus** |||| (Turus → Banyak nilai)

Turus adalah garis tegak yang menyatakan banyaknya data. Satu garis untuk satu data. Garis kelima mencoret miring.

**6. Banyak Nilai** 5️⃣ (Banyak nilai → Frekuensi)

Kita mencacah berapa kali sebuah nilai muncul. Banyak kemunculan disebut frekuensi nilai.

**7. Frekuensi pada Ulangan** 9️⃣ (Frekuensi → Siap ke tabel)

Pada data ulangan, nilai sembilan muncul lima kali dan nilai sepuluh muncul dua kali.

**8. Siap ke Tabel** 📋 (Siap ke tabel → Tabel)

Setelah diurutkan dan dicacah, data siap disajikan dalam tabel bertiga kolom: nilai, turus, dan banyak.

## 6. Tahap 3: Infografis

1. **Mengurutkan Data** 📶: Data diurutkan dari terkecil ke terbesar supaya mudah dibaca.
2. **Data Terkecil** ⬇️: Data terkecil adalah nilai paling kecil, misalnya lima.
3. **Data Terbesar** ⬆️: Data terbesar adalah nilai paling besar, misalnya sepuluh.
4. **Jangkauan** 📏: Jangkauan sama dengan sepuluh dikurangi lima, hasilnya lima.
5. **Turus** ||||: Turus adalah garis tegak. Satu garis untuk satu data.
6. **Kelompok Lima** 卌: Empat garis tegak dicoret garis miring menjadi kelompok lima.
7. **Banyak Nilai 9** 5️⃣: Pada data ulangan, nilai sembilan diperoleh lima siswa.
8. **Banyak Nilai 10** 2️⃣: Nilai sepuluh diperoleh dua siswa.
9. **Enam Macam Nilai** 6️⃣: Ada enam macam nilai: lima, enam, tujuh, delapan, sembilan, dan sepuluh.
10. **Siap ke Tabel** 📋: Tabel nilai memiliki kolom nilai, turus, dan banyak.

## 7. Tahap 4: Concrete (benda nyata)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 1 | Urutkan Anak menurut Banyak Benda | `order-children-objects` | hlm. 198–199 (Aktivitas 1: mengurutkan data) | Mengurutkan anak dari yang banyak bendanya paling kecil atau paling besar. | Tiga ronde, tiap ronde tiga anak dengan tumpukan benda. Siswa mengetuk anak satu per satu menurut urutan yang diminta. |
| 2 | Ketuk yang Paling Banyak atau Paling Sedikit | `tap-most-least-objects` | hlm. 199 (paling sedikit dan paling banyak) | Menemukan anak dengan tumpukan benda paling banyak atau paling sedikit. | Tiga ronde, tiap ronde tiga anak dan dua pertanyaan. Siswa mengetuk anak yang cocok. |
| 3 | Selisih Terbanyak dan Tersedikit | `range-objects` | hlm. 199 (jangkauan = terbesar − terkecil) | Menghitung selisih banyak benda terbanyak dan tersedikit (jangkauan). | Tiga ronde, tiap ronde dua soal. Siswa melihat tumpukan beberapa anak lalu memilih selisihnya. |
| 4 | Jodohkan Tumpukan dan Banyaknya | `match-pile-count` | hlm. 198 (mencacah banyak data) | Menjodohkan tumpukan benda dengan bilangan banyaknya. | Tiga ronde, tiap ronde tiga tumpukan dan tiga bilangan. Siswa mengetuk tumpukan, lalu mengetuk bilangannya. |
| 5 | Memori Tumpukan dan Banyaknya | `memory-pile-count` | hlm. 198 (mencacah banyak data) | Mencocokkan tumpukan benda dengan banyaknya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. |
| 6 | Ketuk Semua Tumpukan dengan Syarat | `tap-all-condition-objects` | hlm. 199 (membandingkan data) | Menemukan semua tumpukan yang lebih, kurang, atau sama dengan bilangan acuan. | Tiga ronde, tiap ronde empat tumpukan dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. |
| 7 | Papan: Berapa Banyak Benda | `board-count-objects` | hlm. 198 (mencacah data) | Menghitung tumpukan benda lalu menulis banyaknya pada papan puluhan dan satuan. | Tiga ronde, tiap ronde dua soal. Siswa mengatur angka pada papan lalu menekan Periksa. |
| 8 | Jumlah Benda Semua Anak | `total-objects-children` | hlm. 198 (ringkasan data kelompok) | Menjumlahkan banyak benda semua anak pada satu gambar. | Tiga ronde, tiap ronde dua soal. Siswa menjumlahkan lalu memilih hasilnya. |
| 9 | Pilah Tumpukan: Sedikit, Sedang, atau Banyak | `sort-pile-bins` | hlm. 199 (membandingkan data) | Memilah tumpukan menjadi sedikit (kurang dari 5), sedang (5 sampai 7), atau banyak (lebih dari 7). | Tiga ronde, tiap ronde enam tumpukan dan tiga kotak. Siswa menyeret atau mengetuk tumpukan ke kotak yang tepat. |
| 10 | Berapa Lebih Banyak | `difference-two-children` | hlm. 199 (selisih data) | Menghitung berapa lebih banyak benda satu anak dibanding anak lain. | Tiga ronde, tiap ronde dua soal. Siswa melihat dua tumpukan lalu memilih selisihnya. |

## 8. Tahap 5: Picture (diagram)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 11 | Baca Turus | `read-tally` | hlm. 198 (mengingat turus Kelas 2) | Membaca banyak data dari gambar turus kelompok lima. | Tiga ronde, tiap ronde dua soal. Siswa menghitung garis turus lalu memilih bilangannya. |
| 12 | Urutkan Turus | `order-tally` | hlm. 198–199 (mengurutkan data) | Mengurutkan kartu turus dari yang paling kecil atau paling besar. | Tiga ronde, tiap ronde tiga kartu turus. Siswa mengetuk kartu satu per satu menurut urutan yang diminta. |
| 13 | Ketuk Turus Paling Banyak atau Paling Sedikit | `tap-most-least-tally` | hlm. 199 (membandingkan data) | Menemukan kartu turus paling banyak atau paling sedikit. | Tiga ronde, tiap ronde tiga turus dan dua pertanyaan. Siswa mengetuk turus yang cocok. |
| 14 | Jangkauan dari Tabel Turus | `range-from-tally-table` | hlm. 199 (jangkauan) | Menghitung jangkauan dari tabel nama dan turus. | Tiga ronde, tiap ronde dua soal. Siswa membaca tabel turus lalu memilih jangkauannya. |
| 15 | Jodohkan Turus dan Banyaknya | `match-tally-count` | hlm. 198 (turus dan banyak) | Menjodohkan gambar turus dengan bilangan banyaknya. | Tiga ronde, tiap ronde tiga turus dan tiga bilangan. Siswa mengetuk turus, lalu mengetuk bilangannya. |
| 16 | Memori Turus dan Banyaknya | `memory-tally-count` | hlm. 198 (turus dan banyak) | Mencocokkan turus dengan banyaknya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. |
| 17 | Ketuk Semua Turus dengan Syarat | `tap-all-tally-condition` | hlm. 199 (membandingkan data) | Menemukan semua turus yang lebih, kurang, atau sama dengan bilangan acuan. | Tiga ronde, tiap ronde empat turus dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. |
| 18 | Pilah Turus menurut Banyaknya | `sort-tally-bins` | hlm. 199 (membandingkan data) | Memilah turus menjadi kurang dari 5, 5 sampai 9, atau 10 atau lebih. | Tiga ronde, tiap ronde enam turus dan tiga kotak. Siswa menyeret atau mengetuk turus ke kotak yang tepat. |
| 19 | Nilai yang Terbanyak | `most-frequent-value` | hlm. 200 (berapa siswa bernilai 9) | Menemukan nilai yang paling banyak muncul pada tabel nilai dan turus. | Tiga ronde, tiap ronde dua soal. Siswa membaca tabel lalu memilih nilai yang terbanyak. |
| 20 | Lebih atau Kurang dari Nilai | `more-or-less-than-value` | hlm. 200–201 (membandingkan nilai) | Menghitung banyak siswa yang mendapat nilai lebih atau kurang dari acuan. | Tiga ronde, tiap ronde dua soal. Siswa menjumlahkan baris tabel yang cocok lalu memilih hasilnya. |

## 9. Tahap 6: Abstract (kata dan angka)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 21 | Urutkan Nilai Data | `order-values` | hlm. 200 (mengurutkan dari terkecil) | Mengurutkan bilangan data dari terkecil ke terbesar atau sebaliknya. | Tiga ronde, tiap ronde empat atau lima bilangan. Siswa mengetuk bilangan satu per satu menurut urutan. |
| 22 | Nilai Terkecil dan Terbesar | `min-max-value` | hlm. 199–200 (data terkecil dan terbesar) | Menemukan data terkecil atau data terbesar pada daftar nilai. | Tiga ronde, tiap ronde dua soal. Siswa membaca daftar lalu memilih nilai terkecil atau terbesar. |
| 23 | Jangkauan Data | `compute-range` | hlm. 199 (jangkauan = terbesar − terkecil) | Menghitung jangkauan data: nilai terbesar dikurangi nilai terkecil. | Tiga ronde, tiap ronde dua soal. Siswa menghitung lalu memilih jangkauannya. |
| 24 | Banyak Nilai pada Data | `count-value-frequency` | hlm. 200 (berapa siswa bernilai 9) | Menghitung berapa kali sebuah nilai muncul pada data ulangan. | Tiga ronde, tiap ronde dua soal. Siswa mencacah nilai lalu memilih banyaknya. |
| 25 | Lengkapi Kalimat Tentang Data | `fill-data-sentence` | hlm. 199–200 (istilah data) | Melengkapi kalimat tentang data terkecil, terbesar, jangkauan, dan turus. | Tiga ronde, tiap ronde tiga kalimat. Siswa memilih satu dari tiga kata untuk bagian kosong. |
| 26 | Jodohkan Istilah dan Artinya | `match-term-meaning` | hlm. 196 (peta konsep dan kata kunci) | Menjodohkan istilah data dengan artinya. | Tiga ronde, tiap ronde tiga pasangan. Siswa mengetuk istilah, lalu mengetuk artinya. |
| 27 | Benar atau Salah: Data | `true-false-data` | hlm. 199–200 (mengamati data) | Menilai pernyataan tentang mengurutkan data, jangkauan, dan turus. | Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Tiap jawaban diberi penjelasan. |
| 28 | Detektif Data | `detective-data` | hlm. 199–200 (jangkauan dan nilai) | Menemukan bilangan dari dua petunjuk tentang data. | Empat soal. Siswa membaca petunjuk lalu memilih satu dari tiga bilangan. Hanya satu yang cocok. |
| 29 | Peta Konsep Data | `concept-map-data` | hlm. 196 (peta konsep) | Melengkapi peta konsep membandingkan data dan mencacah data. | Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. |
| 30 | Susun Kata Data | `sentence-words-data` | hlm. 199–200 (kalimat kunci) | Menyusun kalimat tentang jangkauan, mengurutkan data, dan turus dari kartu kata. | Empat kalimat. Siswa mengetuk kartu kata satu per satu menurut urutan yang benar. Ada satu kartu pengecoh. |

## 10. Poin penting, cara, kegiatan di rumah, dan refleksi

- 📶 **Mengurutkan**: Data diurutkan dari terkecil ke terbesar atau dari terbesar ke terkecil. *Suara:* Mengurutkan data memudahkan kita mencari data terkecil dan terbesar.
- ⬇️ **Data terkecil dan terbesar**: Data terkecil adalah nilai paling kecil. Data terbesar adalah nilai paling besar. *Suara:* Cari bilangan paling kecil dan paling besar pada data.
- 📏 **Jangkauan**: Jangkauan = data terbesar − data terkecil. *Suara:* Jangkauan adalah selisih data terbesar dan data terkecil.
- |||| **Turus**: Turus adalah garis tegak penanda banyak data. Lima turus dikelompokkan dengan garis miring. *Suara:* Satu garis untuk satu data. Garis kelima mencoret miring.
- 5️⃣ **Banyak nilai**: Banyak kemunculan sebuah nilai dihitung dengan turus lalu ditulis angkanya. *Suara:* Hitung berapa kali nilai itu muncul, lalu tulis banyaknya.

Ringkasan suara: Ingat lima poin penting: mengurutkan data, data terkecil dan terbesar, jangkauan, turus, dan banyak nilai.

Cara menyebutkan: Urutkan data dari terkecil, cari data terkecil dan terbesar, hitung jangkauan, lalu cacah banyak tiap nilai dengan turus. (Urutkan data dari terkecil., Cari data terkecil dan terbesar., Hitung jangkauan., Cacah banyak tiap nilai dengan turus.)

Ayo Mencoba di rumah: catat tinggi badan empat anggota keluarga dalam sentimeter. Urutkan dari terkecil, tulis data terkecil, data terbesar, dan jangkauannya.

Refleksi:
- Aku dapat mengurutkan data dari terkecil ke terbesar.
- Aku dapat menentukan data terkecil dan data terbesar.
- Aku dapat menghitung jangkauan data.
- Aku dapat mencacah banyak kemunculan sebuah nilai dengan turus.
