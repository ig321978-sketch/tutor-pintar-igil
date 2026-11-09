# Naskah Matematika Kelas 3 SD, Bab 1: Bilangan Cacah sampai 1.000, Sub-Bab C: Membandingkan dan Mengurutkan Bilangan Cacah sampai 1.000

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k3b1.ts` dan `src/components/modul/data-k3b1.ts`, oleh `scripts/buat-naskah-md.mjs`. Isi mengikuti Buku Siswa Matematika Kelas III (Kemendikbudristek, Kurikulum Merdeka, Bab 1 hlm. 3–45) dan Buku Panduan Guru Bab 1, serta diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.

## 1. Identitas modul

- Kode bab: `k3-mat-bab1`, FASE_B, kelas 3.
- Judul: BAB 1: BILANGAN CACAH SAMPAI 1.000. Sub-Bab C: Membandingkan dan Mengurutkan Bilangan Cacah sampai 1.000.
- Suara Guru: Web Speech API perangkat saja, laju 0.7 dan nada 1. Tanpa ElevenLabs.
- Isi: 3 video cerita (9 adegan), 8 langkah peta pikiran, 10 panel infografis, 30 permainan (10 Concrete, 10 Picture, 10 Abstract), 5 poin penting.

## 2. Tujuan belajar

Siswa membandingkan dua bilangan cacah tiga angka dengan nilai tempat (mulai dari ratusan, lalu puluhan, lalu satuan), menulis hasilnya dengan tanda <, >, atau =, membandingkan tiga bilangan, serta mengurutkan beberapa bilangan dari terkecil ke terbesar dan dari terbesar ke terkecil.

- Capaian Pembelajaran: Siswa membaca, menulis, dan membandingkan bilangan cacah sampai 1.000. Pada sub-bab ini siswa membandingkan dua bilangan dengan nilai tempat serta mengurutkan beberapa bilangan.
- Acuan: Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 1: Bilangan Cacah sampai 1.000, Sub-Bab C hlm. 24–34) dan Buku Panduan Guru Bab 1 Topik C.

## 3. Metode dari luar buku

- **Nilai tempat sebagai aturan membandingkan**: bilangan dibandingkan dari tempat paling kiri (ratusan), lalu puluhan, lalu satuan. Dasar permainan Tempat yang Menentukan dan Ratusan Sama, Lihat Berikutnya.
- **Tanda mulut buaya**: tanda lebih dari dan kurang dari seperti mulut yang terbuka ke arah bilangan yang lebih besar. Cara ini membantu siswa tidak menukar tanda.
- **Kumpulan benda dan model blok untuk perbandingan**: dus, bungkus, dan benda lepas (Concrete) serta lempeng, batang, dan kotak (Picture) membuat selisih terlihat sebelum ditulis dengan tanda.
- **Mengurutkan dengan memilih yang terkecil berulang**: cari yang paling kecil, lalu yang paling kecil dari sisanya. Dasar permainan Urutkan Kumpulan, Urutkan Blok, dan Urutkan Lambang.
- **Bilangan di antara dua bilangan**: siswa menemukan bilangan yang lebih dari batas bawah dan kurang dari batas atas (639 < 709 < 720).
- **Detektif perbandingan**: petunjuk lebih dari, kurang dari, dan angka tertentu menyisakan satu bilangan. Setiap soal diperiksa uji otomatis.

## 4. Tahap 1: Story (video cerita animasi SVG)

Tiap video diputar satu per satu saat siswa mengetuk Putar. Tidak ada yang berjalan sendiri. Kalimat dibacakan Suara Guru satu per satu (ketukan), dan gambar berubah mengikuti ketukan.

### K3B1C-V1. Jarak ke Sekolah (Membandingkan dua bilangan)

**K3B1C-V1-1. Rumah siapa lebih jauh**

1. Jarak rumah Alen ke sekolah adalah 339 meter. *(papan: Alen: 339 meter)*
2. Jarak rumah Galih ke sekolah adalah 421 meter. *(papan: Galih: 421 meter)*
3. Kita ingin tahu, rumah siapa yang lebih jauh dari sekolah. *(papan: Siapa lebih jauh?)*
4. Untuk menjawabnya, kita membandingkan dua bilangan itu. *(papan: Bandingkan bilangan)*

**K3B1C-V1-2. Bandingkan ratusan**

1. Kita taruh 339 dan 421 pada papan nilai tempat. *(papan: Dua papan nilai tempat)*
2. Mulai dari tempat ratusan. Bilangan 339 punya 3 ratusan, bilangan 421 punya 4 ratusan. *(papan: 3 ratusan, 4 ratusan)*
3. Tiga ratus kurang dari empat ratus, jadi 339 kurang dari 421. *(papan: 300 kurang dari 400)*
4. Ditulis 339 < 421. Rumah Alen lebih dekat dengan sekolah. *(papan: 339 < 421)*

**K3B1C-V1-3. Lebih dari**

1. Sekarang bandingkan 583 dan 529. Ratusannya sama, yaitu 5. *(papan: 583 dan 529)*
2. Karena ratusan sama, kita lihat tempat puluhan. *(papan: Ratusan sama)*
3. Bilangan 583 punya 8 puluhan, bilangan 529 punya 2 puluhan. *(papan: 8 puluhan, 2 puluhan)*
4. Delapan puluh lebih dari dua puluh, jadi 583 > 529. *(papan: 583 > 529)*

### K3B1C-V2. Sama dan Hampir Sama (Sampai tempat satuan)

**K3B1C-V2-1. Satuan yang menentukan**

1. Bandingkan 769 dan 761. *(papan: 769 dan 761)*
2. Ratusan sama, yaitu 7. Puluhan juga sama, yaitu 6. *(papan: Ratusan dan puluhan sama)*
3. Jadi kita lihat satuannya. Sembilan lebih dari satu. *(papan: Lihat satuan)*
4. Maka 769 lebih dari 761, ditulis 769 > 761. *(papan: 769 > 761)*

**K3B1C-V2-2. Bilangan yang sama**

1. Perhatikan 804 dan 804. *(papan: 804 dan 804)*
2. Ratusan sama, yaitu 8. Puluhan sama, yaitu 0. *(papan: Ratusan 8, puluhan 0)*
3. Satuan juga sama, yaitu 4. *(papan: Satuan 4)*
4. Semua tempat sama, jadi 804 sama dengan 804, ditulis 804 = 804. *(papan: 804 = 804)*

**K3B1C-V2-3. Tiga langkah membandingkan**

1. Ada tiga langkah membandingkan dua bilangan tiga angka. *(papan: Tiga langkah)*
2. Langkah pertama, bandingkan ratusan. Bila berbeda, selesai. *(papan: 1. Ratusan)*
3. Langkah kedua, bila ratusan sama, bandingkan puluhan. *(papan: 2. Puluhan)*
4. Langkah ketiga, bila puluhan juga sama, bandingkan satuan. *(papan: 3. Satuan)*

### K3B1C-V3. Mengurutkan Bilangan (Dari terkecil sampai terbesar)

**K3B1C-V3-1. Kelereng tiga sahabat**

1. Alfa memiliki 138 kelereng, Galih memiliki 103 kelereng, dan Andi memiliki 183 kelereng. *(papan: 138, 103, 183)*
2. Ketiganya punya satu ratusan. Kita lihat puluhannya: 3, 0, dan 8. *(papan: Ratusan sama)*
3. Galih paling sedikit, lalu Alfa, lalu Andi. *(papan: Galih, Alfa, Andi)*
4. Urutan dari yang paling sedikit adalah 103, 138, 183. *(papan: 103, 138, 183)*

**K3B1C-V3-2. Tiga bilangan**

1. Bagaimana mengurutkan 720, 639, dan 709 dari yang terkecil? *(papan: 720, 639, 709)*
2. Bilangan 639 punya 6 ratusan, paling sedikit. Jadi 639 paling kecil. *(papan: 639 paling kecil)*
3. Bilangan 709 dan 720 sama-sama 7 ratusan. Puluhan 0 kurang dari 2. *(papan: 709 < 720)*
4. Jadi 709 kurang dari 720. Urutannya 639, 709, 720. *(papan: 639, 709, 720)*

**K3B1C-V3-3. Dua arah urutan**

1. Urutan dari terkecil ke terbesar kita sebut urutan naik. *(papan: Dua arah urutan)*
2. Contohnya 639, 709, 720. *(papan: Naik: 639, 709, 720)*
3. Urutan dari terbesar ke terkecil kita sebut urutan turun. *(papan: Turun: dari terbesar)*
4. Contohnya 720, 709, 639. Urutan turun adalah kebalikan urutan naik. *(papan: 720, 709, 639)*

## 5. Tahap 2: Mind map (peta pikiran)

**1. Membandingkan Dua Bilangan** ⚖️ (Membandingkan dua bilangan → Mulai dari ratusan)

Membandingkan berarti mencari tahu bilangan mana yang lebih besar, lebih kecil, atau apakah keduanya sama. Jarak rumah Alen ke sekolah 339 meter dan jarak rumah Galih 421 meter. Kita ingin tahu rumah siapa yang lebih jauh. Untuk bilangan tiga angka, kita tidak menghitung satu per satu, tetapi memakai nilai tempat.

**2. Mulai dari Ratusan** 💯 (Mulai dari ratusan → Ratusan sama, lihat puluhan)

Tempat yang paling besar nilainya adalah ratusan, jadi kita mulai dari sana. Bilangan 339 punya 3 ratusan dan bilangan 421 punya 4 ratusan. Tiga ratus kurang dari empat ratus, jadi 339 kurang dari 421. Bila ratusannya berbeda, perbandingan sudah selesai dan kita tidak perlu melihat tempat lain.

**3. Ratusan Sama, Lihat Puluhan** 🔟 (Ratusan sama, lihat puluhan → Puluhan sama, lihat satuan)

Bila ratusannya sama, kita pindah ke tempat puluhan. Bilangan 583 dan 529 sama-sama punya 5 ratusan. Puluhan 583 adalah 8 dan puluhan 529 adalah 2. Delapan puluh lebih dari dua puluh, jadi 583 lebih dari 529, ditulis 583 > 529.

**4. Puluhan Sama, Lihat Satuan** 1️⃣ (Puluhan sama, lihat satuan → Tanda lebih, kurang, sama)

Bila ratusan dan puluhan sama, satuanlah yang menentukan. Bilangan 769 dan 761 sama pada ratusan dan puluhan, lalu satuannya 9 dan 1. Sembilan lebih dari satu, jadi 769 lebih dari 761. Bila semua tempat sama, misalnya 804 dan 804, kedua bilangan itu sama besar, ditulis 804 = 804.

**5. Tanda Lebih, Kurang, dan Sama** 🐊 (Tanda lebih, kurang, sama → Membandingkan tiga bilangan)

Hasil membandingkan ditulis dengan tiga tanda. Tanda < dibaca kurang dari, tanda > dibaca lebih dari, dan tanda = dibaca sama dengan. Tanda < dan > seperti mulut buaya yang terbuka ke arah bilangan yang lebih besar. Jadi 339 < 421 dan 583 > 529. Tanda yang dibalik akan mengubah artinya, jadi baca pelan-pelan.

**6. Membandingkan Tiga Bilangan** 🔺 (Membandingkan tiga bilangan → Mengurutkan bilangan)

Membandingkan tiga bilangan memakai cara yang sama seperti dua bilangan. Bilangan 720, 639, dan 709: bandingkan ratusan dulu. Bilangan 639 punya 6 ratusan, kurang dari 720 dan 709 yang punya 7 ratusan. Lalu 709 dan 720 dibandingkan pada puluhan: 0 puluhan kurang dari 2 puluhan, jadi 709 < 720.

**7. Mengurutkan Bilangan** 📶 (Mengurutkan bilangan → Perbandingan di sekitar kita)

Mengurutkan bilangan berarti menyusunnya dari yang terkecil ke terbesar, atau dari yang terbesar ke terkecil. Urutan 639, 709, 720 adalah dari terkecil ke terbesar, dan kebalikannya 720, 709, 639 adalah dari terbesar ke terkecil. Cara mudahnya: cari yang paling kecil dulu, lalu cari yang paling kecil dari sisanya, sampai semua bilangan terpakai.

**8. Perbandingan di Sekitar Kita** 🏫 (Perbandingan di sekitar kita → Siap membandingkan dan mengurutkan)

Kita membandingkan bilangan setiap hari: jarak rumah ke sekolah, banyak kelereng, tinggi badan, atau nomor antrean. Alfa 138 kelereng, Galih 103, dan Andi 183, sehingga Andi paling banyak dan Galih paling sedikit. Meutia 498 meter, Alfa 490 meter, dan Galih 508 meter, sehingga rumah Alfa paling dekat dan rumah Galih paling jauh.

## 6. Tahap 3: Infografis

1. **Lebih, Kurang, Sama** ⚖️: Dua bilangan bisa saling dibandingkan. Yang satu bisa lebih dari, kurang dari, atau sama dengan yang lain.
2. **Ratusan Dulu** 💯: Kita mulai membandingkan dari tempat ratusan. Bila ratusannya berbeda, bilangan dengan ratusan lebih besar adalah yang lebih besar.
3. **Lalu Puluhan** 🔟: Bila ratusannya sama, kita bandingkan puluhan. Lima ratus delapan puluh tiga lebih dari lima ratus dua puluh sembilan.
4. **Terakhir Satuan** 1️⃣: Bila ratusan dan puluhan sama, kita bandingkan satuan. Tujuh ratus enam puluh sembilan lebih dari tujuh ratus enam puluh satu.
5. **Tiga Tanda** 🐊: Tanda kurang dari, lebih dari, dan sama dengan. Mulut tanda terbuka ke arah bilangan yang lebih besar.
6. **Bilangan yang Sama** 🤝: Delapan ratus empat dan delapan ratus empat sama pada semua tempat, jadi keduanya sama dengan.
7. **Tiga Bilangan** 🔺: Tiga bilangan dibandingkan dengan cara yang sama. Enam ratus tiga puluh sembilan paling kecil, lalu tujuh ratus sembilan, lalu tujuh ratus dua puluh.
8. **Urutan Naik** 📈: Urutan naik dari yang terkecil ke terbesar, misalnya 639, 709, 720.
9. **Urutan Turun** 📉: Urutan turun dari yang terbesar ke terkecil, misalnya 720, 709, 639.
10. **Cara Membandingkan** 📝: Empat langkah. Satu, tulis bilangan pada papan nilai tempat. Dua, bandingkan ratusan. Tiga, bila sama, bandingkan puluhan lalu satuan. Empat, tulis hasilnya dengan tanda.

## 7. Tahap 4: Concrete (benda nyata)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 1 | Bandingkan Kumpulan | `compare-collections` | hlm. 24–25 (jarak rumah Alen dan Galih ke sekolah) | Menentukan kumpulan benda mana yang lebih banyak, atau apakah sama banyak. | Tiga ronde, tiap ronde dua soal. Dua kumpulan dus, bungkus, dan benda lepas ditampilkan berdampingan. Siswa memilih satu dari tiga jawaban: A lebih banyak, B lebih banyak, atau sama banyak. |
| 2 | Tanda untuk Kumpulan | `sign-collections` | hlm. 26–28 (simbol <, >, dan =) | Memilih kata dan tanda yang tepat untuk dua kumpulan benda. | Tiga ronde, tiap ronde dua soal. Dua kumpulan ditampilkan, lalu siswa memilih lebih dari (>), kurang dari (<), atau sama dengan (=) untuk Kumpulan A terhadap Kumpulan B. |
| 3 | Urutkan Kumpulan | `order-collections` | hlm. 29–31 (mengurutkan dari terkecil ke terbesar dan sebaliknya) | Mengurutkan empat kumpulan benda dari paling sedikit atau paling banyak. | Tiga ronde, tiap ronde empat kumpulan. Siswa mengetuk kumpulan satu per satu menurut urutan banyaknya. Letak jawaban berpindah. |
| 4 | Paling Banyak, Paling Sedikit | `most-least-collection` | hlm. 33 (kelereng Alfa, Galih, dan Andi) | Menemukan kumpulan yang paling banyak dan paling sedikit. | Tiga ronde, tiap ronde empat kumpulan dan dua pertanyaan: paling banyak, lalu paling sedikit. Siswa mengetuk kumpulannya. |
| 5 | Jodohkan Pasangan dan Tanda | `match-collection-sign` | hlm. 26–28 (339 < 421, 583 > 529, 804 = 804) | Menjodohkan pasangan dua kumpulan dengan tanda yang menghubungkannya. | Tiga ronde, tiap ronde tiga pasangan kumpulan dan tiga tanda (>, <, =). Siswa mengetuk pasangan, lalu mengetuk tanda yang cocok. |
| 6 | Taruh di Urutan | `slot-collection-order` | hlm. 30–31 (urutan 639, 709, 720) | Menaruh tiga kumpulan pada tempat terkecil, tengah, dan terbesar. | Tiga ronde, tiap ronde tiga kumpulan dan tiga tempat: terkecil, tengah, terbesar. Siswa mengetuk kumpulan, lalu mengetuk tempatnya. |
| 7 | Ketuk Semua yang Lebih atau Kurang | `tap-all-more-collection` | hlm. 25–28 (membandingkan dengan sebuah bilangan) | Menemukan semua kumpulan yang lebih banyak atau kurang dari kumpulan acuan. | Tiga ronde, tiap ronde satu kumpulan acuan, empat kumpulan lain, dan satu perintah lebih atau kurang. Siswa mengetuk semua yang cocok, lalu menekan Periksa. |
| 8 | Ratusan Sama, Lihat Berikutnya | `same-hundreds-collection` | hlm. 27–28 (583 dan 529; 769 dan 761) | Membandingkan dua kumpulan yang jumlah dusnya sama dengan melihat bungkus lalu benda lepas. | Tiga ronde, tiap ronde dua soal. Kedua kumpulan punya dus yang sama banyak, jadi siswa memilih mana yang lebih banyak dengan melihat bungkus atau benda lepas. |
| 9 | Di Antara Dua Kumpulan | `between-collection` | hlm. 30–31 (639 kurang dari 709 kurang dari 720) | Menemukan kumpulan yang jumlahnya di antara dua kumpulan batas. | Tiga ronde. Dua kumpulan batas ditampilkan, lalu siswa mengetuk satu dari tiga kumpulan yang jumlahnya di antara keduanya. |
| 10 | Cerita Kelereng dan Kue | `story-marbles` | hlm. 33–34 (kelereng Alfa, Galih, Andi; jarak rumah ke sekolah) | Menentukan siapa yang punya paling banyak dan paling sedikit dari cerita tiga anak. | Tiga ronde, tiap ronde dua soal. Tiga anak dengan banyak benda masing-masing. Siswa memilih nama anak yang paling banyak atau paling sedikit. |

## 8. Tahap 5: Picture (diagram)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 11 | Bandingkan Blok | `compare-blocks` | hlm. 25–26 (membandingkan dengan nilai tempat) | Menentukan model blok mana yang lebih banyak atau apakah sama. | Tiga ronde, tiap ronde dua soal. Dua model blok ditampilkan, lalu siswa memilih A lebih banyak, B lebih banyak, atau sama banyak. |
| 12 | Tanda untuk Blok | `sign-blocks` | hlm. 26–28 (simbol <, >, dan =) | Memilih tanda yang tepat untuk dua model blok. | Tiga ronde, tiap ronde dua soal. Siswa memilih lebih dari (>), kurang dari (<), atau sama dengan (=) untuk Model A terhadap Model B. |
| 13 | Isi Tabel Tanda | `sign-table` | hlm. 32 (isilah titik-titik dengan tanda >, <, atau =) | Mengisi tanda perbandingan pada tabel pasangan bilangan. | Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu tanda yang tepat. |
| 14 | Urutkan Blok | `order-blocks` | hlm. 30–31 (urutan 639, 709, 720) | Mengurutkan model blok dari terkecil atau terbesar. | Tiga ronde, tiap ronde tiga atau empat model. Siswa mengetuk model satu per satu menurut urutan banyaknya. Letak jawaban berpindah. |
| 15 | Jodohkan Pasangan Blok dan Tanda | `match-blocks-sign` | hlm. 26–28 (339 < 421, 583 > 529, 804 = 804) | Menjodohkan pasangan model dengan tanda yang menghubungkannya. | Tiga ronde, tiap ronde tiga pasangan model dan tiga tanda. Siswa mengetuk pasangan, lalu mengetuk tanda yang cocok. |
| 16 | Paling Banyak, Paling Sedikit pada Blok | `most-least-blocks` | hlm. 33–34 (paling sedikit dan paling banyak) | Menemukan model blok yang paling banyak dan paling sedikit. | Tiga ronde, tiap ronde empat model dan dua pertanyaan. Siswa mengetuk modelnya. |
| 17 | Ketuk Semua Blok yang Lebih atau Kurang | `tap-all-more-blocks` | hlm. 25–28 (membandingkan dengan sebuah bilangan) | Menemukan semua model yang lebih besar atau kurang dari sebuah bilangan acuan. | Tiga ronde, tiap ronde satu perintah dengan bilangan acuan dan empat model. Siswa mengetuk semua yang cocok, lalu menekan Periksa. |
| 18 | Pilah Blok: Ratusan Kecil atau Besar | `sort-hundreds-blocks` | hlm. 25–26 (bandingkan ratusan lebih dulu) | Memilah model menurut angka ratusannya, kurang dari 5 atau 5 atau lebih. | Tiga ronde, tiap ronde enam model dan dua kotak. Siswa menyeret atau mengetuk model ke kotak yang tepat. |
| 19 | Lengkapi Kalimat Perbandingan | `complete-compare-sentence` | hlm. 25–26 (Bilangan 339 memiliki ratusan kurang dari 421) | Melengkapi kalimat tentang ratusan dua bilangan dan hasil perbandingannya. | Tiga pasang model, tiap pasang tiga kalimat. Siswa memilih satu dari tiga pilihan untuk bagian kosong, termasuk kata lebih dari, kurang dari, atau sama dengan. |
| 20 | Taruh Blok di Urutan | `slot-blocks-order` | hlm. 30–31 (urutan naik) | Menaruh tiga model pada tempat terkecil, tengah, dan terbesar. | Tiga ronde, tiap ronde tiga model dan tiga tempat. Siswa mengetuk model, lalu mengetuk tempatnya. |

## 9. Tahap 6: Abstract (kata dan angka)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 21 | Bandingkan Lambang | `compare-numerals` | hlm. 32 (isilah titik-titik dengan tanda >, <, atau =) | Memilih tanda yang tepat untuk dua lambang bilangan. | Tiga ronde, tiap ronde dua soal (378 dan 345, 189 dan 206, dan seterusnya). Siswa memilih lebih dari, kurang dari, atau sama dengan. |
| 22 | Isi Tabel Perbandingan | `fill-sign-table-abstract` | hlm. 33 (urutkan 537, 590, 518, dan 601) | Melengkapi tabel perbandingan dua bilangan dengan tanda yang tepat. | Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu tanda yang tepat. |
| 23 | Tempat yang Menentukan | `deciding-place` | hlm. 25–28 (bandingkan ratusan; lalu puluhan; lalu satuan) | Menentukan tempat pertama yang berbeda pada dua bilangan. | Tiga ronde, tiap ronde dua soal. Siswa memilih tempat yang menentukan hasil perbandingan: ratusan, puluhan, satuan, atau tidak ada karena sama. |
| 24 | Urutkan Lambang | `order-numerals` | hlm. 33 (urutkan 537, 590, 518, dan 601; 325, 235, 532, 352) | Mengurutkan empat bilangan dari terkecil atau terbesar. | Tiga ronde, tiap ronde empat bilangan. Siswa mengetuk bilangan satu per satu menurut urutan. Letak jawaban berpindah. |
| 25 | Jodohkan Pasangan dan Kata | `match-pair-word` | hlm. 26–28 (dibaca kurang dari, lebih dari, sama dengan) | Menjodohkan pasangan bilangan dengan kata yang menghubungkannya. | Tiga ronde, tiap ronde tiga pasangan bilangan dan tiga kata (lebih dari, kurang dari, sama dengan). Siswa mengetuk pasangan, lalu mengetuk kata yang cocok. |
| 26 | Benar atau Salah: Perbandingan | `true-false-compare` | hlm. 24–34 (membandingkan dan mengurutkan) | Menilai pernyataan tentang membandingkan, tanda, dan urutan bilangan. | Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan dihitung dari bilangan, dan tiap jawaban diberi penjelasan. |
| 27 | Detektif Perbandingan | `detective-compare` | hlm. 30–31 (bilangan di antara dua bilangan) | Menemukan bilangan dari petunjuk lebih dari, kurang dari, dan angka tertentu. | Empat soal. Siswa membaca petunjuk seperti lebih dari 500 dan kurang dari 510, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok. |
| 28 | Ketuk Semua yang Lebih atau Kurang: Angka | `select-all-compare` | hlm. 25–28 (membandingkan dengan sebuah bilangan) | Memilih semua bilangan yang lebih besar atau lebih kecil dari bilangan acuan. | Tiga ronde, tiap ronde empat bilangan dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. |
| 29 | Peta Konsep Membandingkan | `concept-map-compare` | hlm. 2 (peta konsep: membandingkan dan mengurutkan bilangan) | Melengkapi peta konsep membandingkan dan mengurutkan bilangan. | Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. |
| 30 | Susun Kata Perbandingan | `build-compare-sentence` | hlm. 26–28 (339 < 421 dibaca kurang dari) | Menyusun kata menjadi kalimat tentang membandingkan bilangan. | Empat kalimat, misalnya 339 kurang dari 421 ditulis 339 < 421. Kartu kata diketuk berurutan. Satu kartu pengecoh tidak dipakai. |

## 10. Poin penting, cara, kegiatan di rumah, dan refleksi

- 💯 **Mulai dari ratusan**: bandingkan ratusan, lalu puluhan, lalu satuan. *Suara:* Kita membandingkan bilangan tiga angka mulai dari ratusan. Bila sama, lanjut ke puluhan, lalu satuan.
- 🐊 **Tiga tanda**: < kurang dari, > lebih dari, = sama dengan. *Suara:* Tanda kurang dari, lebih dari, dan sama dengan. Mulut tanda terbuka ke arah bilangan yang lebih besar.
- 🤝 **Sama besar**: 804 = 804. *Suara:* Bila ratusan, puluhan, dan satuan sama semua, kedua bilangan sama dengan.
- 📶 **Mengurutkan**: 639, 709, 720 dari terkecil. *Suara:* Mengurutkan bilangan berarti menyusunnya dari terkecil ke terbesar atau dari terbesar ke terkecil.
- 🔍 **Teliti membaca tanda**: tanda dibalik, arti berubah. *Suara:* Bila tanda dibalik, artinya berubah. Baca tanda dengan teliti.

Ringkasan suara: Ingat selalu! Membandingkan bilangan tiga angka dimulai dari ratusan, lalu puluhan, lalu satuan. Hasilnya ditulis dengan tanda kurang dari, lebih dari, atau sama dengan. Mengurutkan berarti menyusun bilangan dari terkecil ke terbesar atau sebaliknya.

Cara menyebutkan: Cara membandingkan. Lihat ratusan dulu. Bila sama, lihat puluhan. Bila sama lagi, lihat satuan. Lalu tulis tandanya. (ratusan dulu, lalu puluhan, lalu satuan, tulis tanda)

Ayo Mencoba di rumah: bersama keluargamu, tulis jarak atau tinggi badan tiga orang dalam sentimeter atau meter, atau banyak buku di tiga rak. Bandingkan dua demi dua dengan tanda lebih dari, kurang dari, atau sama dengan, lalu urutkan dari yang terkecil.

Refleksi:
- Aku dapat membandingkan dua bilangan tiga angka.
- Aku dapat menulis tanda lebih dari, kurang dari, dan sama dengan.
- Aku dapat mengurutkan beberapa bilangan.
- Aku berani menjelaskan caraku kepada teman.
