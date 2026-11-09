# Naskah Matematika Kelas 3 SD, Bab 1: Bilangan Cacah sampai 1.000, Sub-Bab G: Pembagian Bilangan Cacah sampai 100

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k3b1.ts` dan `src/components/modul/data-k3b1.ts`, oleh `scripts/buat-naskah-md.mjs`. Isi mengikuti Buku Siswa Matematika Kelas III (Kemendikbudristek, Kurikulum Merdeka, Bab 1 hlm. 3–45) dan Buku Panduan Guru Bab 1, serta diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.

## 1. Identitas modul

- Kode bab: `k3-mat-bab1`, FASE_B, kelas 3.
- Judul: BAB 1: BILANGAN CACAH SAMPAI 1.000. Sub-Bab G: Pembagian Bilangan Cacah sampai 100.
- Suara Guru: Web Speech API perangkat saja, laju 0.7 dan nada 1. Tanpa ElevenLabs.
- Isi: 3 video cerita (9 adegan), 8 langkah peta pikiran, 10 panel infografis, 30 permainan (10 Concrete, 10 Picture, 10 Abstract), 5 poin penting.

## 2. Tujuan belajar

Siswa memahami pembagian sebagai pengurangan berulang sampai habis dan sebagai membagi sama banyak, menulis dan membaca pembagian (bilangan yang dibagi, pembagi, hasil bagi), memahami hubungan perkalian dan pembagian, menghitung pembagian sampai 100, serta menyelesaikan soal cerita pembagian.

- Capaian Pembelajaran: Siswa melakukan operasi perkalian dan pembagian bilangan cacah sampai 100. Pada sub-bab ini siswa memahami pembagian sebagai pengurangan berulang, menulis pembagian, menghitung hasilnya, menghubungkannya dengan perkalian, dan menyelesaikan soal cerita pembagian.
- Acuan: Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 1: Bilangan Cacah sampai 1.000, Sub-Bab G hlm. 64–71) dan Buku Panduan Guru Bab 1 Topik G.

## 3. Metode dari luar buku

- **Bagikan bergiliran (Aktivitas 5)**: ketua membagikan satu benda ke tiap piring, lagi dan lagi, sampai tumpukan habis. Mesin Bagikan Bergiliran menampilkan kalimat pengurangan berulang yang bertambah panjang tiap putaran.
- **Pembagian sebagai pengurangan berulang**: 15 : 3 = 5 karena 15 − 3 − 3 − 3 − 3 − 3 = 0. Permainan Tulis Pengurangan Berulang dan Loncat Mundur pada Garis Bilangan melatih dua cara menulisnya.
- **Hubungan perkalian dan pembagian**: Catatan Penting buku (hasil bagi × pembagi = bilangan yang dibagi). Permainan Periksa dengan Perkalian dan Jodohkan Pembagian dan Perkalian memakai ini.
- **Rakit kotak sebagai pembagian terukur**: diketahui total titik dan isi tiap kotak, siswa mencari banyak kotak. Mesin yang sama dengan perkalian dipakai dengan arah berlawanan.
- **Pembagian khusus**: bilangan dibagi 1 tetap bilangan itu, dan bilangan dibagi bilangan yang sama hasilnya 1. Soal Ayo Berlatih 1 (4 : 1, 9 : 1, 10 : 10) dipakai langsung.
- **Pengecoh dari kesalahan umum**: pilihan jawaban memuat satu kali pengurangan lebih banyak atau lebih sedikit, serta hasil bagi satu lebih atau satu kurang.

## 4. Tahap 1: Story (video cerita animasi SVG)

Tiap video diputar satu per satu saat siswa mengetuk Putar. Tidak ada yang berjalan sendiri. Kalimat dibacakan Suara Guru satu per satu (ketukan), dan gambar berubah mengikuti ketukan.

### K3B1G-V1. Biskuit Ibu (Pembagian sebagai pengurangan berulang)

**K3B1G-V1-1. Bagi biskuit**

1. Ibu mempunyai 12 biskuit di dalam toples. *(papan: Ibu punya 12 biskuit)*
2. Ibu akan membagikannya sama banyak kepada anak-anaknya. *(papan: Dibagi sama banyak)*
3. Berapa biskuit yang didapat oleh setiap anak? *(papan: Tiap anak dapat berapa?)*
4. Kita kurangi 12 dengan 2 berulang kali sampai biskuitnya habis. *(papan: 12 − 2 − 2 − ...)*

**K3B1G-V1-2. Kurangi berulang**

1. 12 dikurangi 2 sama dengan 10, tersisa 10 biskuit. Lalu 10 dikurangi 2 sama dengan 8. *(papan: 12 − 2 = 10, 10 − 2 = 8)*
2. 8 dikurangi 2 sama dengan 6, lalu 6 dikurangi 2 sama dengan 4. *(papan: 8 − 2 = 6, 6 − 2 = 4)*
3. 4 dikurangi 2 sama dengan 2, lalu 2 dikurangi 2 sama dengan 0. *(papan: 4 − 2 = 2, 2 − 2 = 0)*
4. Biskuitnya habis setelah bilangan 2 dikurangkan sebanyak 6 kali. *(papan: Dikurangi 6 kali)*

**K3B1G-V1-3. Tulis pembagian**

1. Dapat ditulis 12 − 2 − 2 − 2 − 2 − 2 − 2 = 0. *(papan: 12 − 2 − 2 − 2 − 2 − 2 − 2 = 0)*
2. Pengurangan berulang sampai tidak ada sisa disebut pembagian. *(papan: Pembagian)*
3. Bentuk pembagiannya ditulis 12 : 2 = 6. *(papan: 12 : 2 = 6)*
4. Tanda titik dua dibaca dibagi. Jadi, 12 dibagi 2 sama dengan 6. *(papan: Dibaca: 12 dibagi 2)*

### K3B1G-V2. Manik-Manik Kelompok (Aktivitas 5: Pembagian)

**K3B1G-V2-1. Siapkan manik-manik**

1. Buatlah kelompok beranggotakan 4 orang, yaitu 1 ketua dan 3 anggota. *(papan: Kelompok 4 orang)*
2. Ketua memegang satu wadah berisi 15 manik-manik. *(papan: Wadah berisi 15 manik-manik)*
3. Ketua membagikan satu manik-manik kepada setiap anggota. *(papan: Satu untuk tiap anggota)*
4. Ketua terus membagikan sampai wadahnya kosong. *(papan: Terus sampai kosong)*

**K3B1G-V2-2. Hitung yang diperoleh**

1. Tiap putaran, 3 manik-manik dibagikan. 15 dikurangi 3 sama dengan 12. *(papan: 15 − 3 = 12)*
2. 12 dikurangi 3 sama dengan 9, lalu 9 dikurangi 3 sama dengan 6. *(papan: 12 − 3 = 9, 9 − 3 = 6)*
3. 6 dikurangi 3 sama dengan 3, lalu 3 dikurangi 3 sama dengan 0. *(papan: 6 − 3 = 3, 3 − 3 = 0)*
4. Wadah kosong setelah 5 putaran. Tiap anggota mendapat 5 manik-manik. *(papan: Tiap anggota dapat 5)*

**K3B1G-V2-3. Tulis pembagian**

1. Dapat ditulis 15 − 3 − 3 − 3 − 3 − 3 = 0. *(papan: 15 − 3 − 3 − 3 − 3 − 3 = 0)*
2. Bentuk pembagiannya ditulis 15 : 3 = 5. *(papan: 15 : 3 = 5)*
3. Ada bilangan 3 sebanyak 5. *(papan: Ada bilangan 3 sebanyak 5)*
4. Aktivitas 5 yang kita lakukan adalah proses pembagian. *(papan: Proses pembagian)*

### K3B1G-V3. Perkalian dan Pembagian (Dua operasi yang berkaitan)

**K3B1G-V3-1. Dari pembagian ke perkalian**

1. 15 : 3 berarti mengurangkan 15 dengan 3 secara berulang sampai habis. *(papan: 15 : 3 = ?)*
2. Perkalian 5 × 3 berarti ada bilangan 3 sebanyak 5. *(papan: 5 × 3 artinya 3 sebanyak 5)*
3. 5 × 3 = 3 + 3 + 3 + 3 + 3, yaitu 15. *(papan: 3 + 3 + 3 + 3 + 3)*
4. Jadi, 5 × 3 sama dengan 15. *(papan: 5 × 3 = 15)*

**K3B1G-V3-2. Saling berkaitan**

1. Pembagian 15 : 3 = 5 berkaitan dengan perkalian 5 × 3 = 15. *(papan: 15 : 3 = 5 dan 5 × 3 = 15)*
2. Hasil bagi dikali pembagi sama dengan bilangan yang dibagi. *(papan: hasil bagi × pembagi = dibagi)*
3. Pada 15 : 3 = 5, bilangan yang dibagi 15, pembagi 3, dan hasil bagi 5. *(papan: Dibagi 15, pembagi 3, hasil 5)*
4. Kita bisa memeriksa pembagian dengan perkalian. *(papan: Periksa dengan kali)*

**K3B1G-V3-3. Contoh lain**

1. 28 : 7 = 4, karena 28 − 7 − 7 − 7 − 7 = 0. *(papan: 28 : 7 = 4)*
2. Periksa dengan perkalian: 4 × 7 = 28. *(papan: 4 × 7 = 28)*
3. Pembagian dengan 1: 5 : 1 = 5. Dibagi bilangan yang sama: 6 : 6 = 1. *(papan: 5 : 1 = 5 dan 6 : 6 = 1)*
4. Pembagian dan perkalian saling menguatkan hasilnya. *(papan: Saling menguatkan)*

## 5. Tahap 2: Mind map (peta pikiran)

**1. Mengingat Membagi** 🔙 (Mengingat membagi → Pengurangan berulang)

Membagi berarti memberikan benda sama banyak kepada beberapa orang atau tempat. Ibu mempunyai 12 biskuit dan akan membagikannya sama banyak. Pembagian dipakai bila kita ingin tahu berapa yang didapat tiap orang, atau berapa kali bilangan itu muat dalam bilangan lain. Pembagian adalah kebalikan dari perkalian.

**2. Pengurangan Berulang** ➖ (Pengurangan berulang → Menulis pembagian)

Untuk membagi 12 dengan 2, kurangi 12 dengan 2 berulang kali sampai habis: 12 − 2 = 10, 10 − 2 = 8, 8 − 2 = 6, 6 − 2 = 4, 4 − 2 = 2, dan 2 − 2 = 0. Bilangan 2 dikurangkan sebanyak 6 kali. Jadi, 12 : 2 = 6. Pengurangan berulang sampai tidak ada sisa disebut pembagian.

**3. Menulis Pembagian** ✍️ (Menulis pembagian → Nama bilangan pada pembagian)

Pembagian ditulis dengan tanda titik dua. 12 − 2 − 2 − 2 − 2 − 2 − 2 = 0 ditulis 12 : 2 = 6 dan dibaca dua belas dibagi dua sama dengan enam. Contoh lain: 28 : 7 = 4 karena 28 − 7 − 7 − 7 − 7 = 0, dan 36 : 4 = 9 karena bilangan 4 dikurangkan sembilan kali.

**4. Nama Bilangan pada Pembagian** 🏷️ (Nama bilangan pada pembagian → Membagi sama banyak)

Pada 15 : 3 = 5, bilangan 15 disebut bilangan yang dibagi, bilangan 3 disebut pembagi, dan bilangan 5 disebut hasil bagi. Pembagi menunjukkan bilangan yang dikurangkan berulang kali atau banyak kelompok. Hasil bagi menunjukkan berapa kali pengurangan, atau berapa yang didapat tiap kelompok.

**5. Membagi Sama Banyak** 🍽️ (Membagi sama banyak → Perkalian dan pembagian)

Pada Aktivitas 5, ketua kelompok membagikan satu manik-manik kepada setiap anggota, lagi dan lagi, sampai wadah kosong. Dengan 15 manik-manik dan 3 anggota, tiap putaran membagikan 3 manik-manik, jadi ada 5 putaran dan tiap anggota mendapat 5. Jadi, 15 : 3 = 5. Hasil pembagian adalah banyak benda yang didapat tiap bagian.

**6. Perkalian dan Pembagian** 🔄 (Perkalian dan pembagian → Membagi dengan satu dan bilangan sama)

Pembagian dan perkalian saling berkaitan. 15 : 3 = 5 berkaitan dengan 5 × 3 = 15. Hasil bagi dikali pembagi sama dengan bilangan yang dibagi. Karena itu kita bisa memeriksa pembagian dengan perkalian: bila 24 : 4 = 6, maka 6 × 4 harus 24. Bila lupa hasil bagi, tanyakan: bilangan berapa dikali 4 menjadi 24?

**7. Membagi dengan Satu dan Bilangan Sama** 1️⃣ (Membagi dengan satu dan bilangan sama → Soal cerita pembagian)

Ada dua pembagian khusus. Bilangan dibagi 1 hasilnya bilangan itu sendiri: 5 : 1 = 5 karena 5 − 1 − 1 − 1 − 1 − 1 = 0. Bilangan dibagi bilangan yang sama hasilnya 1: 6 : 6 = 1 karena 6 − 6 = 0. Contoh dari buku: 4 : 1 = 4, 9 : 1 = 9, dan 10 : 10 = 1.

**8. Soal Cerita Pembagian** 📖 (Soal cerita pembagian → Siap membagi sampai 100)

Soal cerita pembagian memakai kata seperti dibagi sama banyak, setiap, dan masing-masing. Ayah memasukkan 24 telur ke dalam 3 kotak sama banyak, jadi 24 : 3 = 8 telur tiap kotak. Kakak membagikan 36 apel kepada 6 teman, jadi 36 : 6 = 6 apel tiap teman. Tulis kalimat pembagiannya, hitung, lalu jawab dengan satuan yang tepat.

## 6. Tahap 3: Infografis

1. **Membagi Sama Banyak** 🍪: Membagi berarti memberikan benda sama banyak kepada beberapa orang atau tempat. Semua bagian harus sama banyak.
2. **12 : 2 = 6** 🥣: Dua belas dikurangi dua berulang kali sampai nol. Bilangan dua dikurangkan enam kali. Jadi, dua belas dibagi dua sama dengan enam.
3. **Pengurangan Berulang** ➖: Pengurangan berulang sampai tidak ada sisa disebut pembagian. Lima belas dikurangi tiga lima kali sama dengan nol.
4. **15 : 3 = 5** 🎁: Lima belas manik-manik dibagikan kepada tiga anggota. Tiap putaran tiga manik-manik. Setelah lima putaran, wadah kosong. Tiap anggota dapat lima.
5. **Nama Bilangan** 🏷️: Pada lima belas dibagi tiga sama dengan lima, lima belas adalah bilangan yang dibagi, tiga adalah pembagi, dan lima adalah hasil bagi.
6. **Garis Bilangan Mundur** 📏: Mulai dari lima belas, loncat mundur sebesar tiga. Setelah lima loncatan, kita sampai di nol. Jadi, lima belas dibagi tiga sama dengan lima.
7. **Perkalian Pemeriksa** ✖️: Hasil bagi dikali pembagi sama dengan bilangan yang dibagi. Lima kali tiga sama dengan lima belas, jadi pembagiannya benar.
8. **Dibagi 1 dan Bilangan Sama** 1️⃣: Bilangan dibagi satu hasilnya bilangan itu sendiri. Bilangan dibagi bilangan yang sama hasilnya satu. Lima dibagi satu sama dengan lima, enam dibagi enam sama dengan satu.
9. **Soal Cerita** 📖: Soal cerita pembagian menyebut jumlah seluruhnya dan banyak bagian. Tulis kalimat pembagiannya, hitung, lalu tulis jawabannya dengan satuan.
10. **Cara Membagi** 📝: Empat langkah. Satu, cari bilangan yang dibagi. Dua, cari pembagi. Tiga, kurangkan berulang atau ingat perkalian. Empat, periksa dengan perkalian.

## 7. Tahap 4: Concrete (benda nyata)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 1 | Bagikan Bergiliran | `share-in-turns` | hlm. 66–68 (Aktivitas 5: ketua membagikan satu manik-manik) | Membagikan benda satu putaran demi satu putaran kepada piring sampai tumpukan habis, lalu melihat berapa tiap piring. | Tiga ronde, tiap ronde dua soal. Siswa menekan Bagikan satu putaran, tiap piring mendapat satu benda. Kalimat pengurangan berulang bertambah panjang sampai tumpukan habis. |
| 2 | Hitung Bagian | `count-share` | hlm. 64 (12 biskuit untuk 2 anak) | Menghitung banyak benda yang didapat tiap piring bila tumpukan dibagi sama banyak. | Tiga ronde, tiap ronde dua soal. Gambar tumpukan dan piring kosong ditampilkan. Siswa memilih satu dari tiga hasil bagi. |
| 3 | Tulis Pengurangan Berulang | `write-repeated-subtraction` | hlm. 64–65 (12 − 2 − 2 − 2 − 2 − 2 − 2 = 0) | Memilih kalimat pengurangan berulang yang sesuai dengan tumpukan dan piring. | Tiga ronde, tiap ronde dua soal. Siswa melihat tumpukan dan piring, lalu memilih satu dari tiga kalimat pengurangan berulang. Pengecoh salah banyak pengurangan. |
| 4 | Jodohkan Gambar dan Pembagian | `match-share-division` | hlm. 64–69 (menulis pembagian) | Menjodohkan gambar benda yang sudah dibagi dengan kalimat pembagiannya. | Tiga ronde, tiap ronde tiga gambar piring dan tiga pembagian. Siswa mengetuk gambar, lalu mengetuk pembagian yang cocok. |
| 5 | Memori Gambar dan Hasil Bagi | `memory-share-quotient` | hlm. 64–69 (hasil bagi) | Mencocokkan gambar benda yang sudah dibagi dengan hasil baginya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): gambar piring dan hasil bagi. Siswa membalik dua kartu dan mencari pasangannya. |
| 6 | Ketuk Gambar dengan Hasil Bagi | `tap-share-quotient` | hlm. 64–69 (hasil bagi) | Menemukan gambar yang hasil baginya sama dengan bilangan yang diminta. | Tiga ronde, tiap ronde tiga gambar dan dua pertanyaan. Siswa mengetuk gambar yang hasil baginya sama dengan bilangan yang disebut. |
| 7 | Ketuk Semua Bagian Lebih atau Kurang | `tap-all-share-compare` | hlm. 64–69 (membandingkan hasil bagi) | Menemukan semua gambar yang hasil baginya lebih atau kurang dari bilangan acuan. | Tiga ronde, tiap ronde empat gambar dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. |
| 8 | Cerita Pembagian | `story-divide` | hlm. 64, 66, dan 71 (biskuit, manik-manik, kotak telur) | Menyelesaikan soal cerita pembagian dengan gambar tumpukan dan piring. | Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita, melihat gambar tumpukan dan piring, lalu memilih hasil baginya. |
| 9 | Papan Hasil Bagi Kumpulan | `board-share-quotient` | hlm. 64–69 (hasil bagi) | Menulis hasil bagi pada papan puluhan dan satuan. | Tiga ronde, tiap ronde dua soal. Siswa menghitung hasil bagi tumpukan, lalu mengatur angka puluhan dan satuan pada papan dan menekan Periksa. |
| 10 | Urutkan Gambar menurut Hasil Bagi | `order-share` | hlm. 64–69 (membandingkan hasil bagi) | Mengurutkan tiga gambar menurut hasil baginya. | Tiga ronde, tiap ronde tiga gambar bertanda huruf. Siswa mengetuk gambar satu per satu dari hasil bagi paling kecil atau paling besar. |

## 8. Tahap 5: Picture (diagram)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 11 | Bagi Titik | `share-dots` | hlm. 64–65 (membagi sama banyak) | Membagi sejumlah titik sama banyak ke beberapa kotak dan menentukan isi tiap kotak. | Tiga ronde, tiap ronde dua soal. Sebuah kotak berisi banyak titik dan beberapa kotak kosong ditampilkan. Siswa memilih satu dari tiga hasil bagi. |
| 12 | Lengkapi Kalimat Pembagian | `complete-division-sentence` | hlm. 65 dan 69 (15 : 3 = 5 dan 5 × 3 = 15) | Melengkapi kalimat pengurangan berulang, pembagian, dan perkalian pemeriksa. | Tiga soal, tiap soal tiga kalimat, misalnya 15 : 3 = ... Siswa memilih satu dari tiga angka untuk bagian kosong. |
| 13 | Jodohkan Titik dan Pembagian | `match-dots-division` | hlm. 64–69 (menulis pembagian) | Menjodohkan gambar kotak titik dengan kalimat pembagiannya. | Tiga ronde, tiap ronde tiga gambar dan tiga pembagian. Siswa mengetuk gambar, lalu mengetuk pembagian yang cocok. |
| 14 | Memori Titik dan Hasil Bagi | `memory-dots-quotient` | hlm. 64–69 (hasil bagi) | Mencocokkan gambar kotak titik dengan hasil baginya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. |
| 15 | Loncat Mundur pada Garis Bilangan | `number-line-back` | hlm. 65 dan 68 (pengurangan berulang 15 − 3 − 3 − 3 − 3 − 3) | Menentukan titik pendaratan setelah beberapa loncatan mundur sama besar. | Tiga ronde, tiap ronde dua soal. Garis bilangan enam titik ditampilkan. Siswa mengetuk titik tempat loncatan mundur terakhir mendarat. |
| 16 | Isi Tabel Pembagian | `fill-division-table` | hlm. 71 (Ayo Berlatih 2: hitunglah hasil dari pembagian) | Melengkapi tabel soal pembagian dan hasil baginya. | Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu hasil yang tepat. Ada satu kartu pengecoh. |
| 17 | Ketuk Semua Titik Lebih atau Kurang | `tap-all-dots-quotient` | hlm. 64–69 (membandingkan hasil bagi) | Menemukan semua gambar yang hasil baginya lebih atau kurang dari bilangan acuan. | Tiga ronde, tiap ronde empat gambar dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. |
| 18 | Pilah Gambar: Kurang dari 5 atau Lebih | `sort-dot-quotient` | hlm. 64–69 (membandingkan hasil bagi) | Memilah gambar kotak titik menjadi yang hasil baginya kurang dari 5 dan yang 5 atau lebih. | Tiga ronde, tiap ronde enam gambar dan dua kotak. Siswa menyeret atau mengetuk gambar ke kotak yang tepat. |
| 19 | Periksa dengan Perkalian | `check-with-multiplication` | hlm. 69 (Catatan Penting: hasil bagi dikali pembagi) | Memeriksa hasil pembagian dengan perkalian dan menentukan bilangan yang dibagi. | Tiga ronde, tiap ronde dua soal, misalnya 15 : 3 = 5 maka 5 × 3 = ... Siswa memilih satu dari tiga bilangan. |
| 20 | Rakit Kotak Pembagi | `build-boxes-divide` | hlm. 66–68 (membagikan sampai wadah kosong) | Menambah kotak berisi titik yang sama sampai jumlahnya sama dengan bilangan yang dibagi. | Tiga ronde, tiap ronde dua soal. Siswa membaca isi tiap kotak dan jumlah titik yang diminta, lalu menambah atau mengurangi kotak. Banyak kotak adalah hasil baginya. |

## 9. Tahap 6: Abstract (kata dan angka)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 21 | Tulis Pengurangan Berulang: Lambang | `repeated-subtraction-abstract` | hlm. 70 (Ayo Berlatih 1: tulislah pembagian sebagai pengurangan berulang) | Menyatakan pembagian sebagai pengurangan berulang sampai nol. | Tiga ronde, tiap ronde dua soal (4 : 1, 10 : 10, 16 : 4, 35 : 5, 9 : 1, dan seterusnya). Siswa memilih satu dari tiga kalimat pengurangan berulang. |
| 22 | Hitung Hasil Bagi | `compute-quotient` | hlm. 71 (Ayo Berlatih 2: hitunglah hasil dari pembagian) | Menghitung hasil pembagian dua bilangan dan memilihnya dari tiga pilihan. | Tiga ronde, tiap ronde dua soal (6 : 1, 10 : 1, 21 : 3, 24 : 4, 5 : 5, 48 : 6, dan seterusnya). Pengecoh satu lebih dan satu kurang. |
| 23 | Papan Hasil Bagi | `board-quotient` | hlm. 71 (hasil pembagian 64 : 8 dan 45 : 9) | Menulis hasil pembagian pada papan puluhan dan satuan. | Tiga ronde, tiap ronde dua soal. Siswa mengatur angka puluhan dan satuan lalu menekan Periksa. |
| 24 | Jodohkan Pembagian dan Perkalian | `match-division-multiplication` | hlm. 69 (Catatan Penting: hubungan perkalian dan pembagian) | Menjodohkan soal pembagian dengan perkalian pemeriksanya. | Tiga ronde, tiap ronde tiga pembagian dan tiga perkalian. Siswa mengetuk pembagian, lalu mengetuk perkalian yang cocok. |
| 25 | Memori Pembagian dan Hasil | `memory-division` | hlm. 71 (soal dan jawaban) | Mencocokkan soal pembagian dengan hasilnya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): soal dan hasil. Siswa membalik dua kartu dan mencari pasangannya. |
| 26 | Benar atau Salah: Pembagian | `true-false-division` | hlm. 64–69 (pengurangan berulang dan hubungan dengan perkalian) | Menilai pernyataan tentang pembagian dan hasilnya. | Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan dihitung dari bilangan, dan tiap jawaban diberi penjelasan. |
| 27 | Detektif Pembagian | `detective-division` | hlm. 64–71 (hasil bagi) | Menemukan bilangan hasil pembagian dari dua petunjuk. | Empat soal. Siswa membaca petunjuk seperti hasil 48 : 6 dan kurang dari 10, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok. |
| 28 | Peta Konsep Pembagian | `concept-map-division` | hlm. 2 (peta konsep: pembagian bilangan cacah) | Melengkapi peta konsep pembagian serta hubungan perkalian dan pembagian. | Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. |
| 29 | Soal Cerita Pembagian | `story-division` | hlm. 71 dan 73 (Ayo Berlatih 3 dan 4; Asesmen 5) | Menyelesaikan soal cerita pembagian banyak benda yang dibagi sama banyak. | Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita lalu memilih satu dari tiga hasil bagi. Pengecoh satu lebih dan satu kurang. |
| 30 | Susun Kata Pembagian | `sentence-division` | hlm. 64–69 (pengertian pembagian) | Menyusun kalimat tentang pembagian dari kartu kata. | Empat kalimat. Siswa mengetuk kartu kata satu per satu menurut urutan kalimat yang benar. Ada satu kartu pengecoh. |

## 10. Poin penting, cara, kegiatan di rumah, dan refleksi

- 🍽️ **Membagi sama banyak**: tiap bagian sama banyak. *Suara:* Membagi berarti memberikan benda sama banyak kepada beberapa bagian.
- ➖ **Pengurangan berulang**: 15 − 3 − 3 − 3 − 3 − 3 = 0. *Suara:* Pembagian adalah pengurangan berulang sampai habis. Lima belas dikurangi tiga lima kali sama dengan nol.
- 🏷️ **Nama bilangan**: dibagi : pembagi = hasil bagi. *Suara:* Pada lima belas dibagi tiga sama dengan lima, ada bilangan yang dibagi, pembagi, dan hasil bagi.
- 🔄 **Dengan perkalian**: 5 × 3 = 15. *Suara:* Hasil bagi dikali pembagi sama dengan bilangan yang dibagi. Gunakan perkalian untuk memeriksa pembagian.
- 1️⃣ **Dibagi 1 dan sama**: 5 : 1 = 5 dan 6 : 6 = 1. *Suara:* Bilangan dibagi satu hasilnya bilangan itu sendiri. Bilangan dibagi bilangan yang sama hasilnya satu.

Ringkasan suara: Ingat selalu! Pembagian adalah pengurangan berulang sampai habis, atau membagi sama banyak. Hasil bagi dikali pembagi sama dengan bilangan yang dibagi. Bilangan dibagi satu hasilnya bilangan itu sendiri, dan bilangan dibagi bilangan yang sama hasilnya satu.

Cara menyebutkan: Cara membagi. Cari bilangan yang dibagi. Cari pembagi. Kurangkan berulang atau ingat perkalian. Lalu periksa dengan perkalian. (bilangan dibagi, pembagi, kurang berulang, periksa kali)

Ayo Mencoba di rumah: siapkan 12 kancing atau biji dan beberapa wadah kecil. Bagikan satu per satu ke wadah sampai habis. Tulis pengurangan berulangnya, tulis pembagiannya, lalu periksa dengan perkalian. Coba juga dengan 15 kancing dan 3 wadah, lalu ceritakan hasilnya.

Refleksi:
- Aku dapat menjelaskan pembagian sebagai pengurangan berulang.
- Aku dapat menulis pembagian dari gambar atau cerita.
- Aku dapat menghitung pembagian sampai 100.
- Aku dapat memeriksa pembagian dengan perkalian.
