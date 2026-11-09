# Naskah Matematika Kelas 3 SD, Bab 3: Pengukuran Panjang dan Berat, Sub-Bab C: Pengukuran Berat dengan Satuan Baku

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k3b3.ts` dan `src/components/modul/data-k3b3.ts`, oleh `scripts/buat-naskah-md.mjs`. Isi mengikuti Buku Siswa Matematika Kelas III (Kemendikbudristek, Kurikulum Merdeka, Bab 3 hlm. 105–140) dan Buku Panduan Guru Bab 3, serta diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.

## 1. Identitas modul

- Kode bab: `k3-mat-bab3`, FASE_B, kelas 3.
- Judul: BAB 3: PENGUKURAN PANJANG DAN BERAT. Sub-Bab C: Pengukuran Berat dengan Satuan Baku.
- Suara Guru: Web Speech API perangkat saja, laju 0.7 dan nada 1. Tanpa ElevenLabs.
- Isi: 3 video cerita (9 adegan), 8 langkah peta pikiran, 10 panel infografis, 30 permainan (10 Concrete, 10 Picture, 10 Abstract), 5 poin penting.

## 2. Tujuan belajar

Siswa mengenal timbangan sebagai alat ukur berat (timbangan digital, timbangan duduk, timbangan kodok, dan timbangan badan), mengenal satuan baku berat gram dan kilogram, menimbang dengan memulai dari angka nol, membaca berat pada layar dan jarum, serta memilih timbangan dan satuan yang tepat untuk benda ringan dan benda berat.

- Capaian Pembelajaran: Siswa menyelesaikan masalah yang berkaitan dengan panjang dan berat benda dengan satuan baku. Pada sub-bab ini siswa menimbang benda dengan berbagai timbangan dan memilih satuan gram atau kilogram.
- Acuan: Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 3: Pengukuran Panjang dan Berat, Sub-Bab C hlm. 124–134) dan Buku Panduan Guru Bab 3 Topik C.

## 3. Metode dari luar buku

- **Timbangan digital dengan benda di atasnya**: telur, stroberi, pensil, buku, permen, dan kunci digambar di atas timbangan dengan layar bertulis gram. Dasar permainan Baca Timbangan Digital dan Papan Berat dalam Gram.
- **Timbangan duduk berjarum**: jarum polos dengan satu putaran 5 kg, garis besar tiap kilogram dan garis sedang tiap 500 g. Dasar permainan Baca Timbangan Jarum dan Baca Jarum dalam Kilogram.
- **Mulai dari angka nol (miskonsepsi Buku Panduan Guru)**: permainan Timbangan yang Siap dan Ketuk Semua Jarum yang Siap melatih memeriksa jarum di angka 0 sebelum menimbang.
- **Gram untuk benda ringan, kilogram untuk benda berat**: benda sehari-hari dipilah ke satuan yang tepat. Pengecoh memakai satuan panjang (sentimeter dan meter) agar siswa membedakan berat dari panjang.
- **Memilih timbangan**: timbangan digital, timbangan duduk, dan timbangan badan dihubungkan dengan benda yang ditimbang (sayuran dan buah, berat badan, bahan kue).
- **Layar polos di tahap Picture**: benda diganti layar timbangan dan jarum polos tanpa gambar benda. Selisih dua layar memakai soal stroberi 100 g dan 500 g (Ayo Berlatih 2).

## 4. Tahap 1: Story (video cerita animasi SVG)

Tiap video diputar satu per satu saat siswa mengetuk Putar. Tidak ada yang berjalan sendiri. Kalimat dibacakan Suara Guru satu per satu (ketukan), dan gambar berubah mengikuti ketukan.

### K3B3C-V1. Menimbang Isi Tas (Aktivitas 2: pengukuran berat)

**K3B3C-V1-1. Keluarkan isi tas**

1. Satu kelompok beranggotakan tiga sampai lima orang. *(papan: Kelompok 3 sampai 5 orang)*
2. Keluarkan barang-barang dari tas dan letakkan di atas meja. *(papan: Barang dari tas di atas meja)*
3. Siapkan timbangan digital sebagai alat ukur. *(papan: Timbangan digital)*
4. Kita akan mengukur berat setiap barang. *(papan: Ukur berat tiap barang)*

**K3B3C-V1-2. Timbang barangnya**

1. Letakkan satu barang di atas timbangan digital. *(papan: Barang di atas timbangan)*
2. Lihat angka yang muncul pada layar timbangan. *(papan: Lihat angka pada layar)*
3. Angka itu adalah berat barang. *(papan: Angka = berat barang)*
4. Tulis nama barang dan beratnya pada tabel. *(papan: Tulis di tabel)*

**K3B3C-V1-3. Satuan berat**

1. Setelah semua barang ditimbang, presentasikan hasilnya. *(papan: Presentasikan hasilnya)*
2. Satuan apa yang dipakai pada timbangan? *(papan: Satuan pada timbangan?)*
3. Satuan baku berat adalah gram dan kilogram. *(papan: Gram dan kilogram)*
4. Gram ditulis g dan kilogram ditulis kg. *(papan: g dan kg)*

### K3B3C-V2. Alat Ukur Berat (Timbangan di pasar dan di dapur)

**K3B3C-V2-1. Ke pasar**

1. Meutia pergi ke pasar untuk berbelanja. *(papan: Meutia ke pasar)*
2. Penjual menimbang barang dagangannya dengan timbangan. *(papan: Penjual menimbang dagangan)*
3. Timbangan apa yang dipakai penjual di pasar? *(papan: Timbangan apa?)*
4. Ada timbangan kodok, timbangan duduk, dan timbangan digital. *(papan: Kodok, duduk, digital)*

**K3B3C-V2-2. Nama dan satuan**

1. Timbangan kodok memakai bandul sebagai ukuran berat. *(papan: Kodok: bandul)*
2. Timbangan duduk memakai jarum yang menunjuk angka. *(papan: Duduk: jarum)*
3. Timbangan digital menampilkan angka pada layar. *(papan: Digital: layar)*
4. Semua timbangan itu memakai satuan gram atau kilogram. *(papan: Satuan: g atau kg)*

**K3B3C-V2-3. Gram atau kilogram**

1. Gram dipakai untuk benda yang ringan. *(papan: Gram: benda ringan)*
2. Contohnya tepung, gula pasir, pensil, dan buku. *(papan: Tepung, gula, pensil, buku)*
3. Kilogram dipakai untuk benda yang lebih berat. *(papan: Kilogram: benda berat)*
4. Contohnya berat badan, karung beras, dan buah. *(papan: Berat badan, beras, buah)*

### K3B3C-V3. Bahan Kue Meutia (Membaca dan membandingkan berat)

**K3B3C-V3-1. Menimbang bahan**

1. Meutia membantu ibunya membuat kue. *(papan: Meutia membuat kue)*
2. Bahan kue yang ditimbang adalah gula, tepung, dan telur. *(papan: Gula, tepung, telur)*
3. Gula menunjukkan 1.000 gram dan tepung 1.250 gram. *(papan: Gula 1.000 g, tepung 1.250 g)*
4. Telur menunjukkan 250 gram. *(papan: Telur 250 g)*

**K3B3C-V3-2. Mulai dari nol**

1. Sebelum menimbang, lihat angka awal pada timbangan. *(papan: Lihat angka awal)*
2. Jarum atau layar harus menunjukkan angka 0. *(papan: Harus di angka 0)*
3. Bila tidak dimulai dari nol, hasilnya keliru. *(papan: Bukan dari 0, hasil keliru)*
4. Barulah letakkan benda di atas timbangan. *(papan: Baru letakkan benda)*

**K3B3C-V3-3. Stroberi tambahan**

1. Timbangan pertama menunjukkan stroberi 100 gram. *(papan: Pertama: 100 g)*
2. Timbangan kedua menunjukkan stroberi 500 gram. *(papan: Kedua: 500 g)*
3. Berat stroberi tambahan adalah 500 dikurangi 100. *(papan: 500 − 100)*
4. Jadi stroberi tambahan beratnya 400 gram. *(papan: Tambahan: 400 g)*

## 5. Tahap 2: Mind map (peta pikiran)

**1. Mengingat Berat Benda** 🔙 (Mengingat berat benda → Timbangan alat ukur berat)

Berat menunjukkan seberapa berat atau ringan sebuah benda. Kita sudah pernah membandingkan berat benda dengan satuan tidak baku, misalnya dengan batu atau kelereng. Hasilnya bisa berbeda karena ukuran benda pembanding tidak sama. Karena itu kita memerlukan alat ukur dan satuan baku yang sama untuk semua orang.

**2. Timbangan Alat Ukur Berat** ⚖️ (Timbangan alat ukur berat → Satuan baku berat)

Timbangan adalah alat untuk mengukur berat benda. Pada Aktivitas 2, setiap kelompok mengeluarkan barang dari tas, meletakkannya di atas timbangan digital, lalu membaca angka pada layar. Hasilnya ditulis pada tabel yang memuat nomor, nama barang, berat barang, dan satuan berat.

**3. Satuan Baku Berat** 📐 (Satuan baku berat → Gram untuk benda ringan)

Ukuran berat benda memiliki satuan baku. Satuan baku yang digunakan adalah gram atau kilogram. Gram dapat ditulis dengan g atau gr, dan kilogram ditulis dengan kg. Karena satuan baku sama untuk semua orang, hasil menimbang sama siapa pun yang menimbang.

**4. Gram untuk Benda Ringan** 🥚 (Gram untuk benda ringan → Kilogram untuk benda berat)

Satuan gram digunakan untuk mengukur berat benda yang lebih ringan. Contohnya tepung, gula pasir, pensil, dan buku. Pada timbangan digital kita membaca angka gram pada layar, misalnya telur 250 gram atau stroberi 100 gram. Angka kecil lebih tepat ditulis dengan gram.

**5. Kilogram untuk Benda Berat** 🍉 (Kilogram untuk benda berat → Berbagai jenis timbangan)

Satuan kilogram digunakan untuk mengukur berat benda yang lebih berat. Contohnya berat badan, karung berisi beras, dan buah. Pada timbangan duduk, jarum menunjuk angka kilogram. Bila jarum menunjuk angka 3, berat benda adalah 3 kilogram, ditulis 3 kg.

**6. Berbagai Jenis Timbangan** 🛒 (Berbagai jenis timbangan → Memilih timbangan yang tepat)

Penjual di pasar memakai timbangan kodok dengan bandul, timbangan duduk dengan jarum, atau timbangan digital dengan layar. Untuk berat badan dipakai timbangan badan. Ada juga timbangan besar bertuas untuk barang yang jauh lebih berat. Semua timbangan itu memakai satuan gram atau kilogram.

**7. Memilih Timbangan yang Tepat** ✅ (Memilih timbangan yang tepat → Menimbang dari angka nol)

Pilih timbangan sesuai bendanya. Meutia dan ibu memetik apel, jagung, tomat, kacang-kacangan, wortel, dan stroberi di kebun, lalu memilih timbangan yang cocok untuk sayuran dan buah. Benda ringan seperti tepung dan telur memakai timbangan digital. Berat badan memakai timbangan badan.

**8. Menimbang dari Angka Nol** 0️⃣ (Menimbang dari angka nol → Siap menimbang dengan satuan baku)

Kesalahan yang sering terjadi adalah menimbang tanpa mulai dari angka 0. Sebelum menimbang, pastikan jarum atau layar tepat di angka 0. Lalu letakkan benda, tunggu angka diam, baca beratnya, dan tulis dengan satuan. Pada Ayo Berlatih, gula 1.000 gram, tepung 1.250 gram, dan telur 250 gram.

## 6. Tahap 3: Infografis

1. **Berat Benda** 🏋️: Berat menunjukkan seberapa berat atau ringan sebuah benda. Benda ditimbang dengan timbangan.
2. **Timbangan** ⚖️: Timbangan adalah alat ukur berat. Ada timbangan digital, timbangan duduk, dan timbangan kodok.
3. **Satuan Baku Berat** 📐: Satuan baku berat adalah gram dan kilogram. Gram ditulis g dan kilogram ditulis kg.
4. **Gram** 🥚: Gram dipakai untuk benda yang ringan, seperti tepung, gula pasir, pensil, dan buku.
5. **Kilogram** 🍉: Kilogram dipakai untuk benda yang lebih berat, seperti berat badan, karung beras, dan buah.
6. **Timbangan Digital** 🔢: Timbangan digital menampilkan berat benda sebagai angka pada layar. Baca angka itu dan tulis satuannya.
7. **Timbangan Duduk** 🕐: Timbangan duduk memakai jarum. Angka yang ditunjuk jarum adalah berat benda dalam kilogram.
8. **Mulai dari Nol** 0️⃣: Sebelum menimbang, jarum atau layar harus tepat di angka nol. Baru letakkan benda di atas timbangan.
9. **Memilih Timbangan** ✅: Benda ringan memakai timbangan digital. Berat badan memakai timbangan badan. Buah yang berat memakai timbangan duduk.
10. **Cara Menimbang** 📝: Empat langkah. Satu, pastikan angka awal nol. Dua, letakkan benda. Tiga, baca angkanya. Empat, tulis hasilnya dengan satuan.

## 7. Tahap 4: Concrete (benda nyata)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 1 | Baca Timbangan Digital | `read-digital` | hlm. 124–125 dan 133 (Aktivitas 2 dan Ayo Berlatih 1) | Membaca berat benda pada layar timbangan digital dalam gram. | Tiga ronde, tiap ronde dua soal. Benda ditampilkan di atas timbangan digital. Siswa membaca angka pada layar lalu memilih satu dari tiga berat. |
| 2 | Timbangan yang Siap | `ready-scale` | hlm. 133 (Buku Panduan Guru: menimbang harus dimulai dari angka 0) | Menemukan timbangan yang jarumnya tepat di angka 0 sebelum menimbang. | Tiga ronde, tiap ronde tiga timbangan duduk dan satu perintah. Siswa mengetuk timbangan yang jarumnya tepat di angka 0. |
| 3 | Baca Timbangan Jarum | `read-dial` | hlm. 125–126 (timbangan duduk untuk buah) | Membaca berat buah pada timbangan duduk dari angka yang ditunjuk jarum. | Tiga ronde, tiap ronde dua soal. Buah ditampilkan di atas timbangan duduk. Siswa membaca angka yang ditunjuk jarum, lalu memilih satu dari tiga berat. |
| 4 | Pilih Timbangan | `choose-scale` | hlm. 130–131 (timbangan yang tepat untuk sayuran dan buah) | Memilih timbangan yang tepat untuk menimbang suatu benda. | Tiga ronde, tiap ronde dua benda. Siswa memilih satu dari tiga timbangan: digital, duduk, atau badan. |
| 5 | Jodohkan Benda dan Timbangan | `match-object-scale` | hlm. 126–127 (menghubungkan penjual dan alat ukur) | Menjodohkan benda dengan timbangan yang tepat untuk menimbangnya. | Tiga ronde, tiap ronde tiga benda dan tiga timbangan. Siswa mengetuk benda, lalu mengetuk timbangan yang cocok. |
| 6 | Memori Timbangan dan Berat | `memory-scale-weight` | hlm. 133 (berat bahan kue pada timbangan digital) | Mencocokkan timbangan digital dengan berat yang ditunjukkan layarnya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. |
| 7 | Ketuk Timbangan dengan Berat | `tap-scale-weight` | hlm. 133 (gula, tepung, dan telur) | Menemukan timbangan yang menunjukkan berat yang diminta. | Tiga ronde, tiap ronde tiga timbangan dan dua pertanyaan. Siswa mengetuk timbangan yang beratnya sama dengan bilangan yang disebut. |
| 8 | Ketuk Semua yang Memakai Satuan Tertentu | `tap-all-unit` | hlm. 125 (gram untuk benda ringan, kilogram untuk benda berat) | Menemukan semua benda yang ditimbang dengan satuan gram atau kilogram. | Tiga ronde, tiap ronde empat benda dan satu perintah. Siswa mengetuk semua benda yang cocok dengan satuan yang disebut, lalu menekan Periksa. |
| 9 | Papan Berat dalam Gram | `board-grams` | hlm. 133 (Ayo Berlatih 1) | Menulis berat pada timbangan digital dengan angka ratusan, puluhan, dan satuan. | Tiga ronde, tiap ronde dua soal. Siswa membaca layar timbangan, lalu mengatur angka ratusan, puluhan, dan satuan pada papan dan menekan Periksa. |
| 10 | Urutkan Benda menurut Berat | `order-weight` | hlm. 134 (Ayo Berlatih 2: berat teringan dan terberat) | Mengurutkan tiga benda menurut berat pada timbangan digital. | Tiga ronde, tiap ronde tiga timbangan bertanda huruf. Siswa mengetuk timbangan satu per satu dari yang teringan atau terberat. |

## 8. Tahap 5: Picture (diagram)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 11 | Baca Jarum dalam Kilogram | `read-dial-kg` | hlm. 125–126 (timbangan duduk) | Membaca berat dalam kilogram dari jarum yang tepat di satu angka. | Tiga ronde, tiap ronde dua soal. Jarum timbangan polos ditampilkan. Siswa memilih satu dari tiga berat dalam kilogram. |
| 12 | Baca Layar Timbangan | `read-lcd` | hlm. 133 (angka pada layar timbangan digital) | Membaca berat dalam gram dari layar timbangan polos. | Tiga ronde, tiap ronde dua soal. Layar timbangan ditampilkan. Siswa memilih satu dari tiga berat dalam gram. |
| 13 | Jodohkan Jarum dan Berat | `match-dial-weight` | hlm. 125–126 (membaca timbangan duduk) | Menjodohkan jarum timbangan dengan berat dalam kilogram. | Tiga ronde, tiap ronde tiga jarum dan tiga berat. Siswa mengetuk jarum, lalu mengetuk berat yang cocok. |
| 14 | Memori Layar dan Berat | `memory-lcd-weight` | hlm. 133 (angka pada layar timbangan digital) | Mencocokkan layar timbangan dengan beratnya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. |
| 15 | Ketuk Semua Jarum yang Siap | `tap-all-ready` | hlm. 133 (Buku Panduan Guru: mulai dari angka 0) | Menemukan semua timbangan yang jarumnya sudah tepat di angka 0. | Tiga ronde, tiap ronde empat jarum dan satu perintah. Siswa mengetuk semua jarum di angka 0, lalu menekan Periksa. |
| 16 | Pilah Berat: Gram atau Kilogram | `sort-unit-weight` | hlm. 125 (gram untuk benda ringan, kilogram untuk benda berat) | Memilah nama benda menjadi yang ditimbang dengan gram dan yang ditimbang dengan kilogram. | Tiga ronde, tiap ronde enam nama benda dan dua kotak. Siswa menyeret atau mengetuk nama benda ke kotak yang tepat. |
| 17 | Ketuk Semua Layar Lebih atau Kurang | `tap-all-lcd-compare` | hlm. 129 (membandingkan berat dua timbangan) | Menemukan semua layar yang menunjukkan berat lebih atau kurang dari bilangan acuan. | Tiga ronde, tiap ronde empat layar dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. |
| 18 | Urutkan Langkah Menimbang | `order-weigh-steps` | hlm. 124 (Aktivitas 2: cara menimbang) | Mengurutkan langkah menimbang dengan timbangan digital, timbangan duduk, dan timbangan badan. | Tiga ronde, tiap ronde empat langkah. Siswa mengetuk langkah satu per satu menurut urutan yang benar. Letak jawaban berpindah. |
| 19 | Papan dari Layar | `board-lcd` | hlm. 133 (Ayo Berlatih 1) | Menulis berat pada layar timbangan dengan angka ratusan, puluhan, dan satuan. | Tiga ronde, tiap ronde dua soal. Siswa membaca layar, lalu mengatur angka ratusan, puluhan, dan satuan pada papan dan menekan Periksa. |
| 20 | Selisih Dua Layar | `difference-lcd` | hlm. 129 (Ayo Berlatih 2: berat stroberi tambahan) | Menghitung selisih berat dari dua layar timbangan. | Tiga ronde, tiap ronde dua soal. Dua layar ditampilkan. Siswa memilih satu dari tiga selisih berat dalam gram. |

## 9. Tahap 6: Abstract (kata dan angka)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 21 | Pilih Satuan Berat | `choose-unit-weight` | hlm. 125 dan 128–129 (satuan baku berat) | Memilih satuan baku yang tepat untuk berat suatu benda. | Tiga ronde, tiap ronde dua soal. Siswa membaca benda yang ditimbang, lalu memilih satu dari tiga satuan. |
| 22 | Timbangan yang Tepat | `scale-text` | hlm. 126–131 (memilih timbangan) | Memilih timbangan yang tepat untuk menimbang suatu benda. | Tiga ronde, tiap ronde dua soal. Siswa membaca benda yang ditimbang, lalu memilih satu dari tiga alat ukur. |
| 23 | Lengkapi Kalimat Pengukuran Berat | `complete-weight-sentence` | hlm. 124–129 (alat ukur, satuan baku, dan cara menimbang) | Melengkapi kalimat tentang alat ukur berat, satuan baku, dan cara menimbang. | Tiga soal, tiap soal tiga kalimat, misalnya satuan baku berat adalah gram dan ... Siswa memilih satu dari tiga kata. |
| 24 | Jodohkan Berat dan Timbangan | `match-scale-text` | hlm. 126–127 dan 131–132 (benda dan timbangannya) | Menjodohkan benda yang ditimbang dengan timbangan yang tepat. | Tiga ronde, tiap ronde tiga benda dan tiga timbangan. Siswa mengetuk benda, lalu mengetuk timbangan yang cocok. |
| 25 | Memori Benda dan Berat Wajar | `memory-weight-size` | hlm. 125 dan 128 (perkiraan berat benda) | Mencocokkan benda dengan berat yang wajar lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): benda dan beratnya. Siswa membalik dua kartu dan mencari pasangannya. |
| 26 | Benar atau Salah: Pengukuran Berat | `true-false-weight` | hlm. 124–129 (timbangan dan satuan baku berat) | Menilai pernyataan tentang timbangan, satuan baku, dan cara menimbang. | Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Tiap jawaban diberi penjelasan. |
| 27 | Detektif Pengukuran Berat | `detective-weight` | hlm. 129 dan 133 (membaca dan menghitung berat) | Menemukan bilangan berat dari dua petunjuk. | Empat soal. Siswa membaca petunjuk tentang berat dan satu ciri bilangan, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok. |
| 28 | Peta Konsep Pengukuran Berat | `concept-map-weight` | hlm. 104 (peta konsep Bab 3) | Melengkapi peta konsep alat ukur berat dan cara menimbang. | Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. |
| 29 | Soal Cerita Berat | `story-weight` | hlm. 129 dan 133 (bahan kue dan stroberi) | Menyelesaikan soal cerita yang menjumlahkan atau mengurangkan berat dalam gram. | Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita lalu memilih satu dari tiga hasil dalam gram. |
| 30 | Susun Kata Pengukuran Berat | `sentence-weight` | hlm. 124–129 (pengukuran berat) | Menyusun kalimat tentang pengukuran berat dari kartu kata. | Empat kalimat. Siswa mengetuk kartu kata satu per satu menurut urutan kalimat yang benar. Ada satu kartu pengecoh. |

## 10. Poin penting, cara, kegiatan di rumah, dan refleksi

- ⚖️ **Timbangan**: alat ukur berat. *Suara:* Timbangan adalah alat untuk mengukur berat benda.
- 📐 **Satuan baku berat**: gram (g) dan kilogram (kg). *Suara:* Satuan baku berat adalah gram dan kilogram. Satuan baku sama untuk semua orang.
- 🥚 **Gram**: untuk benda ringan. *Suara:* Gram dipakai untuk benda yang ringan, seperti tepung, gula pasir, pensil, dan buku.
- 🍉 **Kilogram**: untuk benda berat. *Suara:* Kilogram dipakai untuk benda yang lebih berat, seperti berat badan, karung beras, dan buah.
- 0️⃣ **Mulai dari nol**: jarum atau layar di angka 0. *Suara:* Sebelum menimbang, jarum atau layar harus tepat di angka nol.

Ringkasan suara: Ingat selalu! Timbangan adalah alat ukur berat. Satuan baku berat adalah gram dan kilogram. Gram untuk benda yang ringan, kilogram untuk benda yang lebih berat. Sebelum menimbang, pastikan jarum atau layar tepat di angka nol.

Cara menyebutkan: Cara menimbang. Pastikan angka awal nol. Letakkan benda di atas timbangan. Baca angka pada jarum atau layar. Lalu tulis hasilnya dengan satuan. (angka awal nol, letakkan benda, baca angkanya, tulis satuan)

Ayo Mencoba di rumah: bersama orang tuamu, timbanglah bahan makanan di dapur, misalnya gula, tepung, telur, dan beras. Pastikan timbangan mulai dari angka nol. Tulis hasilnya dengan satuan gram atau kilogram, lalu tentukan bahan yang paling ringan dan yang paling berat.

Refleksi:
- Aku dapat menyebutkan alat ukur berat dan satuan bakunya.
- Aku dapat memilih timbangan yang tepat untuk benda ringan dan benda berat.
- Aku dapat membaca berat pada layar dan jarum timbangan.
- Aku ingat memulai menimbang dari angka nol.
