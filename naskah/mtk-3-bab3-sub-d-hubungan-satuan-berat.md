# Naskah Matematika Kelas 3 SD, Bab 3: Pengukuran Panjang dan Berat, Sub-Bab D: Hubungan Antarsatuan Baku Berat

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k3b3.ts` dan `src/components/modul/data-k3b3.ts`, oleh `scripts/buat-naskah-md.mjs`. Isi mengikuti Buku Siswa Matematika Kelas III (Kemendikbudristek, Kurikulum Merdeka, Bab 3 hlm. 105–140) dan Buku Panduan Guru Bab 3, serta diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.

## 1. Identitas modul

- Kode bab: `k3-mat-bab3`, FASE_B, kelas 3.
- Judul: BAB 3: PENGUKURAN PANJANG DAN BERAT. Sub-Bab D: Hubungan Antarsatuan Baku Berat.
- Suara Guru: Web Speech API perangkat saja, laju 0.7 dan nada 1. Tanpa ElevenLabs.
- Isi: 3 video cerita (9 adegan), 8 langkah peta pikiran, 10 panel infografis, 30 permainan (10 Concrete, 10 Picture, 10 Abstract), 5 poin penting.

## 2. Tujuan belajar

Siswa mengenal timbangan kodok dan bandul (1/2 ons, 1 ons, 2 ons, 1/2 kg, 1 kg), memahami 1 kg = 1.000 g = 10 ons dan 1 ons = 100 g, mengubah kilogram ke gram dengan mengalikan 1.000 dan gram ke kilogram dengan membagi 1.000 (misalnya 1.753 g = 1 kg 753 g), serta menjumlahkan dan mengurangkan berat pada soal cerita.

- Capaian Pembelajaran: Siswa menyelesaikan masalah yang berkaitan dengan panjang dan berat benda dengan satuan baku. Pada sub-bab ini siswa menghubungkan kilogram, ons, dan gram serta menghitung berat gabungan.
- Acuan: Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 3: Pengukuran Panjang dan Berat, Sub-Bab D hlm. 135–140) dan Buku Panduan Guru Bab 3 Topik D.

## 3. Metode dari luar buku

- **Bandul timbangan kodok**: lima jenis bandul (1/2 ons, 1 ons, 2 ons, 1/2 kg, 1 kg) digambar sebagai logam kuning bertulisan. Mesin Rakit Bandul menjumlahkan beratnya pada layar, banyak jalan benar.
- **Kilogram, ons, dan gram**: 1 kg = 1.000 g = 10 ons dan 1 ons = 100 g (kotak ringkasan buku). Permainan Ubah Ons ke Gram memakai papan ratusan, puluhan, dan satuan.
- **Mengalikan dan membagi dengan 1.000**: kilogram ke gram dikalikan 1.000, gram ke kilogram dengan mengambil tiap 1.000 g. Pengecoh sengaja memuat lupa mengalikan (× 100) dan salah kali (× 10.000).
- **Memecah gram (Pengamatan 2)**: 1.753 g = 1.000 g + 753 g = 1 kg 753 g. Soal 1.200 g = 1 kg 200 g, 3.000 g = 3 kg, dan 4 kg 150 g = 4.150 g (Ayo Berlatih 1) dipakai langsung.
- **Garis berat**: batang berwarna pada garis 0 sampai 4 kg dengan penanda tiap 500 g, mirip garis meteran pada Sub-Bab B. Dipakai untuk menghitung, menyelisihkan, dan menyambung berat.
- **Soal cerita Ayo Berlatih 2 dan 3**: mangga 8.000 g dijual 4 kg dan dua kantong jeruk 500 g dipakai langsung, ditambah soal beras dan tepung yang menjumlahkan serta mengurangkan kilogram dan gram.

## 4. Tahap 1: Story (video cerita animasi SVG)

Tiap video diputar satu per satu saat siswa mengetuk Putar. Tidak ada yang berjalan sendiri. Kalimat dibacakan Suara Guru satu per satu (ketukan), dan gambar berubah mengikuti ketukan.

### K3B3D-V1. Timbangan Kodok (Pedagang dan bandul)

**K3B3D-V1-1. Di pasar**

1. Pedagang di pasar menimbang dagangannya dengan timbangan kodok. *(papan: Pedagang di pasar)*
2. Timbangan kodok dilengkapi bandul sebagai ukuran berat. *(papan: Timbangan kodok)*
3. Bandul diletakkan di sisi yang lain dari timbangan. *(papan: Bandul = ukuran berat)*
4. Ada berapa jenis bandul yang dipakai? *(papan: Berapa jenis bandul?)*

**K3B3D-V1-2. Jenis bandul**

1. Jenis bandul pada timbangan kodok ada lima. *(papan: Ada lima jenis bandul)*
2. Yaitu setengah ons, satu ons, dan dua ons. *(papan: 1/2 ons, 1 ons, 2 ons)*
3. Lalu ada bandul setengah kilogram dan satu kilogram. *(papan: 1/2 kg dan 1 kg)*
4. Berat benda sama dengan jumlah bandul yang seimbang. *(papan: Jumlahkan bandulnya)*

**K3B3D-V1-3. Telur dua timbangan**

1. Berat telur pada timbangan kodok adalah 1 kilogram. *(papan: Kodok: 1 kg)*
2. Berat telur yang sama pada timbangan digital 1.000 gram. *(papan: Digital: 1.000 g)*
3. Jumlah telurnya sama, jadi beratnya sama. *(papan: Berat telur sama)*
4. Berarti 1 kilogram sama dengan 1.000 gram. *(papan: 1 kg = 1.000 g)*

### K3B3D-V2. Kilogram, Ons, dan Gram (Hubungan antarsatuan berat)

**K3B3D-V2-1. Kilogram dan ons**

1. Satu kilogram sama dengan sepuluh ons. *(papan: 1 kg = 10 ons)*
2. Karena itu bandul satu kilogram sama dengan sepuluh bandul satu ons. *(papan: 1 kg = 10 bandul 1 ons)*
3. Setengah kilogram sama dengan lima ons. *(papan: 1/2 kg = 5 ons)*
4. Ons dipakai pada timbangan kodok di pasar. *(papan: Ons di timbangan kodok)*

**K3B3D-V2-2. Ons dan gram**

1. Satu ons sama dengan seratus gram. *(papan: 1 ons = 100 g)*
2. Dua ons sama dengan dua ratus gram. *(papan: 2 ons = 200 g)*
3. Setengah ons sama dengan lima puluh gram. *(papan: 1/2 ons = 50 g)*
4. Sepuluh ons sama dengan seribu gram, yaitu satu kilogram. *(papan: 10 ons = 1.000 g)*

**K3B3D-V2-3. Kilogram ke gram**

1. Untuk mengubah kilogram ke gram, kalikan dengan 1.000. *(papan: kg ke g: kali 1.000)*
2. Misalnya 3 kg sama dengan 3 × 1.000 gram. *(papan: 3 kg = 3 × 1.000 g)*
3. Hasilnya adalah 3.000 gram. *(papan: = 3.000 g)*
4. Dan 20 kg sama dengan 20.000 gram. *(papan: 20 kg = 20.000 g)*

### K3B3D-V3. Mengubah Gram ke Kilogram (Tepung Meutia dan buah mangga)

**K3B3D-V3-1. Tepung Meutia**

1. Meutia membantu ibu menimbang tepung untuk membuat kue. *(papan: Meutia menimbang tepung)*
2. Timbangan digital menunjukkan 1.753 gram. *(papan: Layar: 1.753 g)*
3. Kita ubah menjadi kilogram dan gram. *(papan: Ubah ke kg dan g)*
4. Seribu gram adalah satu kilogram. *(papan: 1.000 g = 1 kg)*

**K3B3D-V3-2. Pecah gramnya**

1. 1.753 gram sama dengan 1.000 gram ditambah 753 gram. *(papan: 1.753 = 1.000 + 753)*
2. 1.000 gram sama dengan 1 kilogram. *(papan: 1.000 g = 1 kg)*
3. Jadi 1.753 gram sama dengan 1 kg 753 gram. *(papan: 1.753 g = 1 kg 753 g)*
4. Berat tepung Meutia adalah 1 kg 753 gram. *(papan: Tepung: 1 kg 753 g)*

**K3B3D-V3-3. Mangga dan jeruk**

1. Meutia memanen mangga 8.000 gram dan menjual 4 kilogram. *(papan: Mangga 8.000 g)*
2. 8.000 gram sama dengan 8 kilogram. *(papan: 8.000 g = 8 kg)*
3. Sisa mangga adalah 8 dikurangi 4, yaitu 4 kilogram. *(papan: 8 − 4 = 4 kg)*
4. Dua kantong jeruk 500 gram jadi 1.000 gram, yaitu 1 kg. *(papan: 500 g + 500 g = 1 kg)*

## 5. Tahap 2: Mind map (peta pikiran)

**1. Mengingat Satuan Baku Berat** 🔙 (Mengingat satuan baku berat → Timbangan kodok dan bandul)

Setelah mengukur berat benda dengan timbangan, kita mendapat ukuran berat dengan satuan baku. Satuan baku berat adalah gram dan kilogram. Satuan-satuan ini saling berhubungan. Pertanyaannya, apakah ada hubungan antara kilogram, ons, dan gram, dan bagaimana hubungannya?

**2. Timbangan Kodok dan Bandul** 🛒 (Timbangan kodok dan bandul → Jenis bandul)

Pedagang di pasar menimbang barang dagangannya dengan timbangan kodok. Timbangan ini dilengkapi bandul sebagai ukuran berat benda yang ditimbang. Benda diletakkan pada satu sisi, lalu bandul diletakkan pada sisi lain sampai timbangan seimbang. Jumlah berat bandul adalah berat benda.

**3. Jenis Bandul** 🏋️ (Jenis bandul → Kilogram dan gram)

Jenis bandul yang digunakan timbangan kodok ada lima, yaitu setengah ons, satu ons, dua ons, setengah kilogram, dan satu kilogram. Setengah ons sama dengan 50 gram, satu ons 100 gram, dua ons 200 gram, setengah kilogram 500 gram, dan satu kilogram 1.000 gram.

**4. Kilogram dan Gram** ⚖️ (Kilogram dan gram → Kilogram dan ons)

Berat telur pada timbangan kodok adalah 1 kilogram, dan pada timbangan digital 1.000 gram. Jumlah telur sama sehingga beratnya sama. Maka 1 kilogram sama dengan 1.000 gram. Ditulis 1 kg = 1.000 g. Bilangan 1.000 dibaca seribu.

**5. Kilogram dan Ons** 🔟 (Kilogram dan ons → Ons dan gram)

Satu kilogram sama dengan sepuluh ons. Karena itu satu bandul satu kilogram sama beratnya dengan sepuluh bandul satu ons. Setengah kilogram sama dengan lima ons. Ons banyak dipakai pada timbangan kodok di pasar, sedangkan timbangan digital memakai gram.

**6. Ons dan Gram** 💯 (Ons dan gram → Kilogram ke gram)

Satu ons sama dengan seratus gram. Maka dua ons sama dengan 200 gram dan tiga ons sama dengan 300 gram. Sepuluh ons sama dengan 1.000 gram, yaitu satu kilogram. Untuk mengubah ons ke gram, kalikan banyak ons dengan 100.

**7. Kilogram ke Gram** ✖️ (Kilogram ke gram → Gram ke kilogram)

Untuk mengubah kilogram ke gram, kalikan dengan 1.000. Misalnya 3 kg = 3 × 1.000 g = 3.000 g, dan 20 kg = 20.000 g. Bila ada sisa gram, tambahkan: 4 kg 150 g = 4.000 g + 150 g = 4.150 g. Bilangan di belakang kilogram makin besar karena gram satuan yang lebih kecil.

**8. Gram ke Kilogram** ➗ (Gram ke kilogram → Siap mengubah satuan berat)

Untuk mengubah gram ke kilogram, ambil tiap 1.000 gram sebagai 1 kilogram. Tepung Meutia 1.753 gram = 1.000 gram + 753 gram = 1 kg 753 gram. Begitu pula 1.200 gram = 1 kg 200 gram dan 3.000 gram = 3 kg. Berat juga dapat dijumlahkan dan dikurangkan setelah satuannya sama.

## 6. Tahap 3: Infografis

1. **Timbangan Kodok** 🛒: Timbangan kodok dipakai pedagang di pasar. Ukuran beratnya memakai bandul.
2. **Jenis Bandul** 🏋️: Ada lima jenis bandul: setengah ons, satu ons, dua ons, setengah kilogram, dan satu kilogram.
3. **1 kg = 1.000 g** ⚖️: Satu kilogram sama dengan seribu gram. Dua kilogram sama dengan dua ribu gram.
4. **1 kg = 10 ons** 🔟: Satu kilogram sama dengan sepuluh ons. Setengah kilogram sama dengan lima ons.
5. **1 ons = 100 g** 💯: Satu ons sama dengan seratus gram. Tiga ons sama dengan tiga ratus gram.
6. **Kilogram ke Gram** ✖️: Untuk mengubah kilogram ke gram, kalikan dengan seribu. Tiga kilogram sama dengan tiga ribu gram.
7. **Gram ke Kilogram** ➗: Untuk mengubah gram ke kilogram, bagi dengan seribu. Tiga ribu gram sama dengan tiga kilogram.
8. **1.753 gram** 🔍: Seribu tujuh ratus lima puluh tiga gram sama dengan seribu gram ditambah tujuh ratus lima puluh tiga gram, yaitu satu kilogram tujuh ratus lima puluh tiga gram.
9. **Garis Berat** 📈: Pada garis berat, tiap seribu gram ditandai satu kilogram. Batang yang sampai angka dua kilogram beratnya dua ribu gram.
10. **Cara Mengubah** 📝: Empat langkah. Satu, ingat satu kilogram sama dengan seribu gram. Dua, kilogram ke gram kalikan seribu. Tiga, gram ke kilogram bagi seribu. Empat, periksa dengan cara sebaliknya.

## 7. Tahap 4: Concrete (benda nyata)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 1 | Rakit Berat dengan Bandul | `build-bandul` | hlm. 135–136 (jenis bandul timbangan kodok) | Merakit berat yang diminta dari bandul 1/2 ons, 1 ons, 2 ons, 1/2 kg, dan 1 kg. | Tiga ronde, tiap ronde dua soal. Siswa membaca berat yang diminta, lalu menambah atau mengurangi bandul sampai layar menunjukkan berat itu. Banyak jalan yang benar. |
| 2 | Hitung Berat Bandul | `count-bandul` | hlm. 135 (bandul timbangan kodok) | Menghitung berat sekumpulan bandul dalam gram. | Tiga ronde, tiap ronde dua soal. Kumpulan bandul ditampilkan. Siswa memilih satu dari tiga berat. Pengecoh lebih atau kurang lima puluh gram. |
| 3 | Ubah Kilogram ke Gram | `kg-to-g-bandul` | hlm. 136 dan 139 (1 kg = 1.000 g, Ayo Berlatih 1) | Mengubah kilogram ke gram dengan gambar bandul satu kilogram. | Tiga ronde, tiap ronde dua soal. Bandul satu kilogram ditampilkan. Siswa memilih satu dari tiga hasil dalam gram. Pengecoh lupa mengalikan 1.000. |
| 4 | Ubah Gram ke Kilogram | `g-to-kg-bandul` | hlm. 137 dan 139 (mengubah gram ke kilogram) | Mengubah gram ke kilogram dengan gambar bandul satu kilogram. | Tiga ronde, tiap ronde dua soal. Bandul satu kilogram ditampilkan. Siswa memilih satu dari tiga hasil dalam kilogram. |
| 5 | Jodohkan Bandul dan Berat | `match-bandul` | hlm. 135–136 (jumlah bandul yang digunakan) | Menjodohkan kumpulan bandul dengan beratnya dalam gram. | Tiga ronde, tiap ronde tiga kumpulan bandul dan tiga berat. Siswa mengetuk kumpulan bandul, lalu mengetuk berat yang cocok. |
| 6 | Memori Bandul dan Berat | `memory-bandul` | hlm. 135–136 (jumlah bandul yang digunakan) | Mencocokkan kumpulan bandul dengan beratnya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. |
| 7 | Ketuk Bandul dengan Berat | `tap-bandul` | hlm. 135–136 (jumlah bandul yang digunakan) | Menemukan kumpulan bandul yang beratnya sama dengan bilangan yang diminta. | Tiga ronde, tiap ronde tiga kumpulan bandul dan dua pertanyaan. Siswa mengetuk kumpulan yang beratnya sama dengan bilangan yang disebut. |
| 8 | Ketuk Semua yang Sama Berat | `tap-all-same-weight` | hlm. 136 (1 kg = 10 ons = 1.000 g) | Menemukan semua kumpulan bandul yang beratnya sama dengan berat acuan. | Tiga ronde, tiap ronde empat kumpulan bandul dan satu perintah. Siswa mengetuk semua yang sama beratnya dengan acuan, lalu menekan Periksa. |
| 9 | Ubah Ons ke Gram | `ons-to-gram` | hlm. 136 (1 ons = 100 g) | Mengubah ons ke gram pada papan ratusan, puluhan, dan satuan. | Tiga ronde, tiap ronde dua soal. Bandul satu ons ditampilkan. Siswa mengatur angka ratusan, puluhan, dan satuan pada papan dan menekan Periksa. |
| 10 | Urutkan Bandul menurut Berat | `order-bandul` | hlm. 135–136 (jenis bandul) | Mengurutkan tiga kumpulan bandul menurut beratnya. | Tiga ronde, tiap ronde tiga kumpulan bandul bertanda huruf. Siswa mengetuk kumpulan satu per satu dari yang teringan atau terberat. |

## 8. Tahap 5: Picture (diagram)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 11 | Hitung Garis Berat | `count-weight-line` | hlm. 136–139 (kilogram dan gram) | Menghitung berat batang pada garis berat dalam gram. | Tiga ronde, tiap ronde dua soal. Garis berat bertanda tiap 500 g dan batang berwarna ditampilkan. Siswa memilih satu dari tiga berat. |
| 12 | Lengkapi Kalimat Ubah Berat | `complete-convert-weight` | hlm. 137 (1.753 gram dan mengubah gram ke kilogram) | Melengkapi kalimat yang mengubah gram menjadi kilogram dan gram. | Tiga soal, tiap soal tiga kalimat, misalnya 1.250 g = 1.000 g + ... g. Siswa memilih satu dari tiga angka untuk bagian kosong. |
| 13 | Jodohkan Garis dan Berat | `match-weight-line` | hlm. 136–139 (kilogram dan gram) | Menjodohkan garis berat dengan beratnya dalam kilogram dan gram. | Tiga ronde, tiap ronde tiga garis dan tiga berat. Siswa mengetuk garis, lalu mengetuk berat yang cocok. |
| 14 | Memori Garis dan Berat | `memory-weight-line` | hlm. 136–139 (kilogram dan gram) | Mencocokkan garis berat dengan beratnya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. |
| 15 | Isi Tabel Ubah Berat | `fill-weight-table` | hlm. 139 (Ayo Berlatih 1: lengkapi ukuran berat) | Melengkapi tabel berat dalam kilogram, gram, dan ons. | Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu berat yang tepat. Ada satu kartu pengecoh. |
| 16 | Ketuk Semua Berat yang Sama | `tap-all-same-weight-line` | hlm. 136–139 (satu berat ditulis dengan beberapa cara) | Menemukan semua garis berat yang sama dengan berat acuan, walau ditulis berbeda. | Tiga ronde, tiap ronde empat garis dan satu perintah. Siswa mengetuk semua yang sama dengan acuan, lalu menekan Periksa. |
| 17 | Pilah Berat: Pas Kilogram atau Bersisa | `sort-whole-kg` | hlm. 137 dan 139 (gram dan kilogram) | Memilah berat dalam gram menjadi yang pas dalam kilogram dan yang masih bersisa gram. | Tiga ronde, tiap ronde enam berat dan dua kotak. Berat yang habis dibagi 1.000 pas dalam kilogram. Siswa menyeret atau mengetuk berat ke kotak yang tepat. |
| 18 | Urutkan Langkah Mengubah Berat | `order-convert-weight-steps` | hlm. 137 dan 139 (mengubah satuan berat) | Mengurutkan langkah mengubah satuan berat. | Tiga ronde, tiap ronde empat langkah. Siswa mengetuk langkah satu per satu menurut urutan yang benar. Letak jawaban berpindah. |
| 19 | Selisih Dua Garis Berat | `difference-weight-line` | hlm. 139 (Ayo Berlatih 2: sisa mangga) | Menghitung selisih berat dari dua batang pada garis berat. | Tiga ronde, tiap ronde dua soal. Dua batang pada satu garis ditampilkan. Siswa memilih satu dari tiga selisih berat. |
| 20 | Sambung Dua Garis Berat | `join-weight-lines` | hlm. 140 (Ayo Berlatih 3: dua kantong jeruk) | Menghitung berat dua batang yang disambung pada garis berat. | Tiga ronde, tiap ronde dua soal. Dua batang yang disambung ditampilkan. Siswa memilih satu dari tiga berat gabungan. |

## 9. Tahap 6: Abstract (kata dan angka)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 21 | Ubah Kilogram ke Gram: Lambang | `kg-to-g-abstract` | hlm. 139 (20 kg = ... gram) | Mengubah kilogram ke gram dan memilih hasilnya dari tiga pilihan. | Tiga ronde, tiap ronde dua soal, misalnya 4 kg = ... g. Pengecoh lupa mengalikan 1.000 atau mengalikan 10.000. |
| 22 | Ubah Gram ke Kilogram dan Gram | `g-to-kg-g` | hlm. 137 dan 139 (1.753 gram dan 1.200 gram) | Menulis berat gram sebagai kilogram dan gram. | Tiga ronde, tiap ronde dua soal, misalnya 1.200 g = ... kg ... g. Pengecoh salah tambah atau kurang seratus gram. |
| 23 | Ubah Kilogram, Ons, dan Gram | `ons-convert` | hlm. 136 (1 kg = 10 ons, 1 ons = 100 g) | Mengubah antara kilogram, ons, dan gram. | Tiga ronde, tiap ronde dua soal, misalnya 3 ons = ... g. Siswa memilih satu dari tiga hasil. |
| 24 | Jodohkan Berat | `match-weight` | hlm. 139 (Ayo Berlatih 1: lengkapi ukuran berat) | Menjodohkan dua cara menulis berat yang sama. | Tiga ronde, tiap ronde tiga ukuran dan tiga pasangannya. Siswa mengetuk ukuran, lalu mengetuk pasangannya. |
| 25 | Memori Berat | `memory-weight` | hlm. 136 dan 139 (ukuran berat yang sama) | Mencocokkan dua cara menulis berat yang sama lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. |
| 26 | Benar atau Salah: Kilogram dan Gram | `true-false-unit-weight` | hlm. 136–140 (hubungan satuan berat) | Menilai pernyataan tentang hubungan kilogram, ons, dan gram. | Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Tiap jawaban diberi penjelasan. |
| 27 | Detektif Satuan Berat | `detective-unit-weight` | hlm. 136–139 (ubah satuan berat) | Menemukan bilangan hasil perubahan satuan berat dari dua petunjuk. | Empat soal. Siswa membaca petunjuk tentang perubahan satuan dan satu ciri bilangan, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok. |
| 28 | Peta Konsep Satuan Berat | `concept-map-unit-weight` | hlm. 104 (peta konsep Bab 3) | Melengkapi peta konsep hubungan kilogram, ons, dan gram. | Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. |
| 29 | Soal Cerita Satuan Berat | `story-unit-weight` | hlm. 139–140 (Ayo Berlatih 2 dan 3: mangga dan jeruk) | Menyelesaikan soal cerita yang menjumlahkan, mengurangkan, atau mengubah berat. | Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita lalu memilih satu dari tiga hasil dalam kilogram dan gram. Pengecoh salah seratus gram. |
| 30 | Susun Kata Satuan Berat | `sentence-unit-weight` | hlm. 136–139 (hubungan satuan berat) | Menyusun kalimat tentang hubungan satuan berat dari kartu kata. | Empat kalimat. Siswa mengetuk kartu kata satu per satu menurut urutan kalimat yang benar. Ada satu kartu pengecoh. |

## 10. Poin penting, cara, kegiatan di rumah, dan refleksi

- ⚖️ **Kilogram dan gram**: 1 kg = 1.000 g. *Suara:* Satu kilogram sama dengan seribu gram. Dua kilogram sama dengan dua ribu gram.
- 🔟 **Kilogram dan ons**: 1 kg = 10 ons. *Suara:* Satu kilogram sama dengan sepuluh ons. Setengah kilogram sama dengan lima ons.
- 💯 **Ons dan gram**: 1 ons = 100 g. *Suara:* Satu ons sama dengan seratus gram. Tiga ons sama dengan tiga ratus gram.
- ✖️ **Kilogram ke gram**: 3 kg = 3 × 1.000 g = 3.000 g. *Suara:* Untuk mengubah kilogram ke gram, kalikan dengan seribu.
- ➗ **Gram ke kilogram**: 1.753 g = 1 kg 753 g. *Suara:* Untuk mengubah gram ke kilogram, ambil tiap seribu gram sebagai satu kilogram. Seribu tujuh ratus lima puluh tiga gram sama dengan satu kilogram tujuh ratus lima puluh tiga gram.

Ringkasan suara: Ingat selalu! Satu kilogram sama dengan seribu gram dan sama dengan sepuluh ons. Satu ons sama dengan seratus gram. Untuk mengubah kilogram ke gram, kalikan dengan seribu. Untuk mengubah gram ke kilogram, ambil tiap seribu gram sebagai satu kilogram.

Cara menyebutkan: Cara mengubah satuan berat. Ingat satu kilogram sama dengan seribu gram. Kilogram ke gram, kalikan seribu. Gram ke kilogram, ambil tiap seribu gram. Lalu periksa dengan cara sebaliknya. (1 kg = 1.000 g, kg ke g: kali, g ke kg: ambil 1.000, periksa)

Ayo Mencoba di rumah: bersama orang tuamu, timbanglah beberapa bahan makanan dengan timbangan digital dan tulis hasilnya dalam gram. Lalu ubah menjadi kilogram dan gram, misalnya 1.250 gram menjadi 1 kg 250 gram. Jelaskan pada orang tuamu bahwa 1 kilogram sama dengan 1.000 gram.

Refleksi:
- Aku tahu bahwa 1 kilogram sama dengan 1.000 gram dan 10 ons.
- Aku dapat mengubah kilogram ke gram dan sebaliknya.
- Aku dapat menulis berat dengan kilogram dan gram bersama.
- Aku dapat menjumlahkan dan mengurangkan berat.
