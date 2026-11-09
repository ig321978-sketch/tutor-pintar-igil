# Naskah Matematika Kelas 3 SD, Bab 1: Bilangan Cacah sampai 1.000, Sub-Bab F: Perkalian Bilangan Cacah sampai 100

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k3b1.ts` dan `src/components/modul/data-k3b1.ts`, oleh `scripts/buat-naskah-md.mjs`. Isi mengikuti Buku Siswa Matematika Kelas III (Kemendikbudristek, Kurikulum Merdeka, Bab 1 hlm. 3–45) dan Buku Panduan Guru Bab 1, serta diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.

## 1. Identitas modul

- Kode bab: `k3-mat-bab1`, FASE_B, kelas 3.
- Judul: BAB 1: BILANGAN CACAH SAMPAI 1.000. Sub-Bab F: Perkalian Bilangan Cacah sampai 100.
- Suara Guru: Web Speech API perangkat saja, laju 0.7 dan nada 1. Tanpa ElevenLabs.
- Isi: 3 video cerita (9 adegan), 8 langkah peta pikiran, 10 panel infografis, 30 permainan (10 Concrete, 10 Picture, 10 Abstract), 5 poin penting.

## 2. Tujuan belajar

Siswa memahami perkalian sebagai penjumlahan berulang dari kelompok yang sama banyak, menulis dan membaca perkalian (banyak kelompok dikali isi tiap kelompok), menghitung hasil perkalian sampai 100, memahami bahwa bilangan pada perkalian boleh ditukar tempatnya, serta menyelesaikan soal cerita perkalian.

- Capaian Pembelajaran: Siswa melakukan operasi perkalian dan pembagian bilangan cacah sampai 100. Pada sub-bab ini siswa memahami perkalian sebagai penjumlahan berulang, menulis perkalian, menghitung hasilnya, dan menyelesaikan soal cerita perkalian.
- Acuan: Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 1: Bilangan Cacah sampai 1.000, Sub-Bab F hlm. 58–63) dan Buku Panduan Guru Bab 1 Topik F.

## 3. Metode dari luar buku

- **Kelompok yang sama banyak (piring dan kotak titik)**: benda disusun pada piring dengan isi sama (Concrete), lalu diganti kotak berisi titik polos (Picture). Permainan Rakit Piring dan Rakit Kotak Titik memakai mesin yang sama dengan gambar berbeda.
- **Penjumlahan berulang sebagai dasar perkalian**: 5 × 2 ditulis 2 + 2 + 2 + 2 + 2. Permainan Tulis Penjumlahan Berulang dan Dari Penjumlahan ke Perkalian melatih perpindahan dua arah.
- **Loncatan pada garis bilangan**: k loncatan sama besar dari nol mendarat di k × n. Siswa mengetuk titik pendaratan pada garis enam titik.
- **Menukar tempat bilangan (sifat komutatif)**: 5 × 6 = 6 × 5. Dua susunan piring dibandingkan, lalu soal Tukar Faktor menguji hasilnya.
- **Banyak kelompok dan isi tiap kelompok**: bilangan pertama pada perkalian adalah banyak kelompok, bilangan kedua isi tiap kelompok. Pengecoh sengaja memuat satu kelompok lebih dan satu kelompok kurang.
- **Aktivitas 4 dengan gelas dan kerikil**: kegiatan buku diwujudkan dalam video (5 gelas × 4 kerikil dan 4 gelas × 7 kerikil) dan permainan Papan Hasil Kelompok.

## 4. Tahap 1: Story (video cerita animasi SVG)

Tiap video diputar satu per satu saat siswa mengetuk Putar. Tidak ada yang berjalan sendiri. Kalimat dibacakan Suara Guru satu per satu (ketukan), dan gambar berubah mengikuti ketukan.

### K3B1F-V1. Pensil dan Bunga Melati (Perkalian sebagai penjumlahan berulang)

**K3B1F-V1-1. Lima kelompok pensil**

1. Ada 5 kelompok pensil. Setiap kelompok berisi 2 pensil. *(papan: 5 kelompok pensil)*
2. Jumlah seluruhnya: 2 ditambah 2 ditambah 2 ditambah 2 ditambah 2. *(papan: 2 + 2 + 2 + 2 + 2)*
3. Penjumlahan berulang ini ditulis 5 kali 2. *(papan: 5 × 2)*
4. Jadi, 5 × 2 = 10. Ada 10 pensil seluruhnya. *(papan: = 10 pensil)*

**K3B1F-V1-2. Empat kelompok melati**

1. Ada 4 kelompok bunga melati. Setiap kelompok berisi 5 bunga. *(papan: 4 kelompok melati)*
2. Jadi, jumlahnya 4 × 5 bunga melati. *(papan: 4 × 5)*
3. Lima ditambah lima ditambah lima ditambah lima sama dengan 20. *(papan: 5 + 5 + 5 + 5)*
4. Jadi, 4 × 5 = 20. Ada 20 bunga melati. *(papan: = 20 bunga)*

**K3B1F-V1-3. Membaca perkalian**

1. Pada 4 × 5, bilangan 4 adalah banyak kelompok. *(papan: Banyak kelompok)*
2. Bilangan 5 adalah isi tiap kelompok. *(papan: Isi tiap kelompok)*
3. Perkalian adalah penjumlahan berulang dari bilangan yang sama. *(papan: Penjumlahan berulang)*
4. Banyak kelompok dikali isi tiap kelompok sama dengan jumlah seluruhnya. *(papan: kelompok × isi = jumlah)*

### K3B1F-V2. Mobil Mainan (Menukar tempat bilangan)

**K3B1F-V2-1. Lima kelompok mobil**

1. Mobil mainan disusun dalam 5 kelompok. *(papan: 5 kelompok mobil)*
2. Setiap kelompok berisi 6 mobil mainan. *(papan: Tiap kelompok 6)*
3. 6 + 6 + 6 + 6 + 6 = 30, atau 5 × 6 = 30. *(papan: 5 × 6)*
4. Jadi, ada 30 mobil mainan. *(papan: = 30)*

**K3B1F-V2-2. Enam kelompok mobil**

1. Sekarang mobil yang sama dijadikan 6 kelompok. *(papan: 6 kelompok mobil)*
2. Setiap kelompok berisi 5 mobil mainan. *(papan: Tiap kelompok 5)*
3. 5 + 5 + 5 + 5 + 5 + 5 = 30, atau 6 × 5 = 30. *(papan: 6 × 5)*
4. Jumlahnya tetap 30 mobil mainan. *(papan: = 30)*

**K3B1F-V2-3. Tukar tempat**

1. 5 × 6 sama dengan 30, dan 6 × 5 juga sama dengan 30. *(papan: 5 × 6 = 30)*
2. Jadi, 5 × 6 sama dengan 6 × 5. *(papan: 6 × 5 = 30)*
3. Bilangan pada perkalian boleh ditukar tempatnya. *(papan: 5 × 6 = 6 × 5)*
4. Hasilnya tetap sama besar. *(papan: Boleh ditukar)*

### K3B1F-V3. Gelas dan Kerikil (Aktivitas 4: Perkalian)

**K3B1F-V3-1. Siapkan gelas dan kerikil**

1. Siapkan 5 gelas plastik bekas dan 40 batu kerikil. *(papan: 5 gelas)*
2. Masukkan 4 batu kerikil ke dalam setiap gelas. *(papan: Tiap gelas 4 kerikil)*
3. Ada 5 gelas, dan tiap gelas berisi 4 kerikil. *(papan: 40 kerikil disiapkan)*
4. Berapa kerikil yang ada di kelima gelas itu? *(papan: Berapa kerikil?)*

**K3B1F-V3-2. Jumlahkan kerikil**

1. Jumlahkan: 4 + 4 + 4 + 4 + 4 = 20 kerikil. *(papan: 4 + 4 + 4 + 4 + 4)*
2. Kita bisa menulisnya sebagai banyak gelas dikali banyak kerikil tiap gelas. *(papan: gelas × kerikil)*
3. Jadi, 5 × 4 = 20 kerikil. *(papan: 5 × 4 = 20)*
4. Ada 20 kerikil di kelima gelas. *(papan: 20 kerikil)*

**K3B1F-V3-3. Ulangi dengan 4 gelas**

1. Ulangi dengan 4 gelas, dan tiap gelas berisi 7 kerikil. *(papan: 4 gelas, tiap gelas 7)*
2. Jumlahkan: 7 + 7 + 7 + 7 = 28. *(papan: 7 + 7 + 7 + 7)*
3. Ditulis dengan perkalian 4 × 7 = 28. *(papan: 4 × 7 = 28)*
4. Aktivitas ini menunjukkan bahwa perkalian adalah penjumlahan berulang. *(papan: Penjumlahan berulang)*

## 5. Tahap 2: Mind map (peta pikiran)

**1. Mengingat Penjumlahan Berulang** 🔙 (Mengingat penjumlahan berulang → Kelompok yang sama banyak)

Penjumlahan berulang berarti menjumlahkan bilangan yang sama berkali-kali. Ada 5 kelompok pensil dan tiap kelompok berisi 2 pensil, jadi jumlahnya 2 + 2 + 2 + 2 + 2 = 10. Menjumlahkan bilangan yang sama berkali-kali itu lama kalau kelompoknya banyak. Karena itu kita memakai perkalian sebagai cara yang lebih singkat.

**2. Kelompok yang Sama Banyak** 🍽️ (Kelompok yang sama banyak → Menulis perkalian)

Perkalian dipakai bila benda dibagi ke dalam beberapa kelompok yang isinya sama banyak. Pada gambar ada 4 kelompok bunga melati dan setiap kelompok berisi 5 bunga. Setiap kelompok harus sama banyak. Kalau ada kelompok yang isinya berbeda, kita tidak dapat memakai perkalian satu kali saja.

**3. Menulis Perkalian** ✖️ (Menulis perkalian → Banyak kelompok dan isi)

Empat kelompok yang berisi lima ditulis 4 × 5. Tanda kali dibaca kali atau dikali. Penjumlahan berulang 5 + 5 + 5 + 5 sama dengan 4 × 5. Hasilnya 20. Jadi, 4 × 5 = 20 bunga melati. Perkalian adalah cara singkat menulis penjumlahan berulang.

**4. Banyak Kelompok dan Isi** 👥 (Banyak kelompok dan isi → Loncatan pada garis bilangan)

Pada 5 × 2, bilangan 5 menyatakan banyak kelompok dan bilangan 2 menyatakan isi tiap kelompok. Banyak kelompok dikali isi tiap kelompok sama dengan jumlah seluruhnya. Pada Aktivitas 4, ada 5 gelas dan tiap gelas berisi 4 kerikil, jadi 5 × 4 = 20 kerikil. Bila gelasnya 4 dan tiap gelas berisi 7 kerikil, ditulis 4 × 7 = 28.

**5. Loncatan pada Garis Bilangan** 📏 (Loncatan pada garis bilangan → Menukar tempat bilangan)

Perkalian juga dapat dilihat sebagai loncatan sama besar pada garis bilangan. Mulai dari 0, lakukan 4 loncatan sebesar 5, yaitu 5, 10, 15, lalu 20. Titik pendaratan terakhir adalah hasilnya. Jadi, 4 × 5 = 20. Banyak loncatan sama dengan banyak kelompok dan besar loncatan sama dengan isi tiap kelompok.

**6. Menukar Tempat Bilangan** 🔄 (Menukar tempat bilangan → Menghitung hasil kali)

Mobil mainan disusun dalam 5 kelompok yang berisi 6 mobil, jadi 5 × 6 = 30. Bila dijadikan 6 kelompok yang berisi 5 mobil, hasilnya 6 × 5 = 30. Jumlah mobilnya sama. Jadi, 5 × 6 = 6 × 5. Pada perkalian, bilangan boleh ditukar tempatnya dan hasilnya tetap sama.

**7. Menghitung Hasil Kali** 🔢 (Menghitung hasil kali → Soal cerita perkalian)

Untuk menghitung hasil kali, ubah perkalian menjadi penjumlahan berulang. 3 × 4 sama dengan 4 + 4 + 4, yaitu 12. 5 × 7 sama dengan 7 + 7 + 7 + 7 + 7, yaitu 35. 7 × 8 sama dengan 56 dan 9 × 7 sama dengan 63. Bila lupa, pakailah penjumlahan berulang atau loncatan pada garis bilangan untuk memeriksa.

**8. Soal Cerita Perkalian** 📖 (Soal cerita perkalian → Siap mengalikan sampai 100)

Soal cerita perkalian menyebut banyak kelompok dan isi tiap kelompok. SD Pelangi punya 6 kelas dan tiap kelas punya 2 papan tulis, jadi 6 × 2 = 12 papan tulis. Guru membentuk 6 kelompok dan tiap kelompok beranggotakan 5 siswa, jadi 6 × 5 = 30 siswa. Tulis kalimat perkaliannya, hitung, lalu jawab dengan satuan yang tepat.

## 6. Tahap 3: Infografis

1. **Kelompok Sama Banyak** 🍽️: Perkalian dipakai bila ada beberapa kelompok yang isinya sama banyak. Tiap kelompok harus sama banyak.
2. **5 × 2 = 10** ✏️: Lima kelompok pensil, tiap kelompok berisi dua pensil. Dua tambah dua tambah dua tambah dua tambah dua sama dengan sepuluh. Jadi, lima kali dua sama dengan sepuluh.
3. **Penjumlahan Berulang** ➕: Perkalian adalah penjumlahan berulang dari bilangan yang sama. Empat kali lima sama dengan lima tambah lima tambah lima tambah lima.
4. **4 × 5 = 20** 🌼: Empat kelompok bunga melati, tiap kelompok berisi lima bunga. Empat kali lima sama dengan dua puluh bunga melati.
5. **Banyak Kelompok dan Isi** 👥: Pada perkalian, bilangan pertama menyatakan banyak kelompok dan bilangan kedua menyatakan isi tiap kelompok.
6. **Garis Bilangan** 📏: Empat loncatan sebesar lima dari nol mendarat di dua puluh. Jadi, empat kali lima sama dengan dua puluh.
7. **Tukar Tempat** 🔄: Lima kali enam sama dengan tiga puluh, dan enam kali lima juga sama dengan tiga puluh. Bilangan pada perkalian boleh ditukar tempatnya.
8. **5 × 4 = 20** 🥛: Lima gelas, tiap gelas berisi empat batu kerikil. Lima kali empat sama dengan dua puluh kerikil.
9. **Soal Cerita** 📖: Soal cerita menyebut banyak kelompok dan isi tiap kelompok. Tulis kalimat perkaliannya, hitung, lalu tulis jawabannya dengan satuan.
10. **Cara Mengalikan** 📝: Empat langkah. Satu, cari banyak kelompok. Dua, cari isi tiap kelompok. Tiga, tulis perkalian atau penjumlahan berulang. Empat, hitung hasilnya.

## 7. Tahap 4: Concrete (benda nyata)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 1 | Rakit Kelompok | `build-groups` | hlm. 58–60 (5 kelompok pensil; 4 kelompok melati) | Menambah kelompok yang isinya sama sampai jumlah seluruhnya sama dengan yang diminta. | Tiga ronde, tiap ronde dua soal. Siswa membaca isi tiap piring dan jumlah yang diminta, lalu menambah atau mengurangi piring. Kalimat penjumlahan berulang ikut bertambah panjang. |
| 2 | Hitung Kelompok | `count-groups` | hlm. 58–60 (kelompok pensil, melati, dan mobil mainan) | Menghitung jumlah seluruh benda pada beberapa kelompok yang sama banyak dan memilih hasilnya. | Tiga ronde, tiap ronde dua soal. Gambar piring-piring berisi benda ditampilkan. Siswa memilih satu dari tiga jumlah seluruhnya. |
| 3 | Tulis Penjumlahan Berulang | `write-repeated` | hlm. 58–59 (2 + 2 + 2 + 2 + 2 = 10) | Memilih kalimat penjumlahan berulang yang sesuai dengan gambar kelompok. | Tiga ronde, tiap ronde dua soal. Siswa melihat gambar kelompok, lalu memilih satu dari tiga kalimat penjumlahan berulang. Pengecoh salah banyak kelompok. |
| 4 | Jodohkan Kelompok dan Perkalian | `match-group-product` | hlm. 58–61 (menulis perkalian) | Menjodohkan gambar kelompok dengan kalimat perkaliannya. | Tiga ronde, tiap ronde tiga gambar kelompok dan tiga perkalian. Siswa mengetuk gambar, lalu mengetuk perkalian yang cocok. |
| 5 | Memori Kelompok dan Hasil | `memory-group-product` | hlm. 58–61 (jumlah seluruhnya) | Mencocokkan gambar kelompok dengan jumlah seluruhnya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): gambar kelompok dan hasilnya. Siswa membalik dua kartu dan mencari pasangannya. |
| 6 | Ketuk Kelompok dengan Jumlah | `tap-group-total` | hlm. 58–61 (jumlah seluruh benda) | Menemukan gambar kelompok yang jumlahnya sama dengan bilangan yang diminta. | Tiga ronde, tiap ronde tiga gambar kelompok dan dua pertanyaan. Siswa mengetuk gambar yang jumlahnya sama dengan bilangan yang disebut. |
| 7 | Ketuk Semua yang Lebih atau Kurang | `tap-all-compare` | hlm. 58–61 (membandingkan jumlah seluruhnya) | Menemukan semua kelompok yang jumlah seluruhnya lebih atau kurang dari bilangan acuan. | Tiga ronde, tiap ronde empat gambar kelompok dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. |
| 8 | Tukar Tempat Kelompok | `swap-groups` | hlm. 59–60 (5 × 6 = 6 × 5) | Membandingkan dua susunan kelompok dan menyadari bahwa menukar tempat bilangan tidak mengubah jumlah. | Tiga ronde, tiap ronde dua soal. Dua susunan piring ditampilkan. Siswa memilih susunan yang lebih banyak atau menyatakan keduanya sama banyak. |
| 9 | Papan Hasil Kelompok | `board-group-total` | hlm. 60–61 (Aktivitas 4: 5 × 4 = 20) | Menulis jumlah seluruh benda pada papan puluhan dan satuan. | Tiga ronde, tiap ronde dua soal. Siswa menghitung jumlah seluruhnya, lalu mengatur angka puluhan dan satuan pada papan dan menekan Periksa. |
| 10 | Urutkan Kelompok menurut Jumlah | `order-groups` | hlm. 58–61 (membandingkan hasil) | Mengurutkan tiga gambar kelompok menurut jumlahnya. | Tiga ronde, tiap ronde tiga gambar kelompok bertanda huruf. Siswa mengetuk gambar satu per satu dari jumlah paling kecil atau paling besar. |

## 8. Tahap 5: Picture (diagram)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 11 | Hitung Titik Berkelompok | `count-dot-groups` | hlm. 58–59 (menghitung kelompok yang sama banyak) | Menghitung jumlah titik pada beberapa kotak yang sama banyak. | Tiga ronde, tiap ronde dua soal. Kotak-kotak berisi titik polos ditampilkan. Siswa memilih satu dari tiga jumlah titik. |
| 12 | Lengkapi Kalimat Perkalian | `complete-product-sentence` | hlm. 61–62 (Ayo Berlatih 1: isilah titik-titik) | Melengkapi penjumlahan berulang, perkalian, dan perkalian yang ditukar tempat. | Tiga soal, tiap soal tiga kalimat, misalnya 5 × 2 = ... Siswa memilih satu dari tiga angka untuk bagian kosong. |
| 13 | Jodohkan Titik dan Perkalian | `match-dots-product` | hlm. 61–62 (Ayo Berlatih 1) | Menjodohkan gambar kotak titik dengan kalimat perkaliannya. | Tiga ronde, tiap ronde tiga gambar dan tiga perkalian. Siswa mengetuk gambar, lalu mengetuk perkalian yang cocok. |
| 14 | Memori Titik dan Hasil | `memory-dots-product` | hlm. 58–62 (jumlah seluruhnya) | Mencocokkan gambar kotak titik dengan hasilnya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. |
| 15 | Loncatan pada Garis Bilangan | `number-line-jumps` | hlm. 58–61 (penjumlahan berulang sebagai loncatan) | Menentukan titik pendaratan setelah beberapa loncatan sama besar dari nol. | Tiga ronde, tiap ronde dua soal. Garis bilangan enam titik ditampilkan. Siswa mengetuk titik tempat loncatan terakhir mendarat. |
| 16 | Isi Tabel Perkalian | `fill-product-table` | hlm. 63 (Ayo Berlatih 3: hitunglah hasil perkalian) | Melengkapi tabel soal perkalian dan hasilnya. | Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu hasil yang tepat. Ada satu kartu pengecoh. |
| 17 | Ketuk Semua yang Lebih atau Kurang: Titik | `tap-all-dots-compare` | hlm. 58–62 (membandingkan jumlah seluruhnya) | Menemukan semua gambar kotak titik yang jumlahnya lebih atau kurang dari bilangan acuan. | Tiga ronde, tiap ronde empat gambar dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. |
| 18 | Pilah Gambar: Kurang dari 20 atau Lebih | `sort-dot-groups` | hlm. 58–62 (membandingkan jumlah seluruhnya) | Memilah gambar kotak titik menjadi yang jumlahnya kurang dari 20 dan yang 20 atau lebih. | Tiga ronde, tiap ronde enam gambar dan dua kotak. Siswa menyeret atau mengetuk gambar ke kotak yang tepat. |
| 19 | Tukar Faktor | `swap-factor` | hlm. 59–60 (5 × 6 = 6 × 5) | Menentukan bilangan yang tepat bila dua bilangan pada perkalian ditukar tempatnya. | Tiga ronde, tiap ronde dua soal, misalnya 4 × 6 = 6 × ... Siswa memilih satu dari tiga bilangan. |
| 20 | Rakit Kotak Titik | `build-dot-boxes` | hlm. 58–61 (kelompok yang sama banyak) | Menambah kotak berisi titik yang sama sampai jumlah seluruhnya sama dengan yang diminta. | Tiga ronde, tiap ronde dua soal. Siswa membaca isi tiap kotak dan jumlah yang diminta, lalu menambah atau mengurangi kotak. Kalimat penjumlahan berulang ikut bertambah. |

## 9. Tahap 6: Abstract (kata dan angka)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 21 | Dari Penjumlahan ke Perkalian | `repeated-to-product` | hlm. 63 (Ayo Berlatih 2: isilah titik-titik dengan pilihan jawaban) | Menyatakan penjumlahan berulang sebagai perkalian dan menghitung hasilnya. | Tiga ronde, tiap ronde dua soal, misalnya 5 + 5 + 5 + 5 + 5 + 5 + 5 = ... Siswa memilih satu dari tiga hasil. |
| 22 | Hitung Hasil Kali | `compute-product` | hlm. 63 (Ayo Berlatih 3: hitunglah hasil perkalian) | Menghitung hasil perkalian dua bilangan dan memilihnya dari tiga pilihan. | Tiga ronde, tiap ronde dua soal (3 × 4, 5 × 7, 7 × 8, 9 × 7, dan seterusnya). Pengecoh salah satu kelompok. |
| 23 | Papan Hasil Kali | `board-product` | hlm. 63 (menghitung hasil perkalian) | Menulis hasil perkalian pada papan puluhan dan satuan. | Tiga ronde, tiap ronde dua soal. Siswa mengatur angka puluhan dan satuan lalu menekan Periksa. |
| 24 | Jodohkan Penjumlahan dan Perkalian | `match-sum-product` | hlm. 63 (Ayo Berlatih 2: 8 × 9 dan 9 × 8) | Menjodohkan penjumlahan berulang dengan perkaliannya. | Tiga ronde, tiap ronde tiga penjumlahan berulang dan tiga perkalian. Siswa mengetuk penjumlahan, lalu mengetuk perkalian yang cocok. |
| 25 | Memori Perkalian dan Hasil | `memory-product` | hlm. 63 (soal dan jawaban) | Mencocokkan perkalian dengan hasilnya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): perkalian dan hasil. Siswa membalik dua kartu dan mencari pasangannya. |
| 26 | Benar atau Salah: Perkalian | `true-false-product` | hlm. 58–63 (perkalian dan penjumlahan berulang) | Menilai pernyataan tentang perkalian dan hasilnya. | Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan dihitung dari bilangan, dan tiap jawaban diberi penjelasan. |
| 27 | Detektif Perkalian | `detective-product` | hlm. 58–63 (hasil perkalian) | Menemukan bilangan hasil perkalian dari dua petunjuk. | Empat soal. Siswa membaca petunjuk seperti hasil 7 × 8 dan lebih dari 50, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok. |
| 28 | Peta Konsep Perkalian | `concept-map-product` | hlm. 2 (peta konsep: perkalian bilangan cacah) | Melengkapi peta konsep perkalian dan tukar tempat. | Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. |
| 29 | Soal Cerita Perkalian | `story-product` | hlm. 63 (Ayo Berlatih 4 dan 5: soal cerita) | Menyelesaikan soal cerita perkalian banyak kelompok dan isi tiap kelompok. | Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita lalu memilih satu dari tiga hasil. Pengecoh salah satu kelompok. |
| 30 | Susun Kata Perkalian | `sentence-product` | hlm. 58–61 (pengertian perkalian) | Menyusun kalimat tentang perkalian dari kartu kata. | Empat kalimat. Siswa mengetuk kartu kata satu per satu menurut urutan kalimat yang benar. Ada satu kartu pengecoh. |

## 10. Poin penting, cara, kegiatan di rumah, dan refleksi

- 🍽️ **Kelompok sama banyak**: tiap kelompok berisi sama banyak. *Suara:* Perkalian dipakai bila ada beberapa kelompok yang isinya sama banyak.
- ➕ **Penjumlahan berulang**: 4 × 5 = 5 + 5 + 5 + 5. *Suara:* Perkalian adalah penjumlahan berulang dari bilangan yang sama. Empat kali lima sama dengan lima tambah lima tambah lima tambah lima.
- 👥 **Kelompok dan isi**: banyak kelompok × isi = jumlah. *Suara:* Bilangan pertama menyatakan banyak kelompok. Bilangan kedua menyatakan isi tiap kelompok.
- 🔄 **Tukar tempat**: 5 × 6 = 6 × 5. *Suara:* Pada perkalian, bilangan boleh ditukar tempatnya dan hasilnya tetap sama.
- ✅ **Periksa**: jumlahkan berulang atau loncat. *Suara:* Periksa hasil kali dengan penjumlahan berulang atau dengan loncatan pada garis bilangan.

Ringkasan suara: Ingat selalu! Perkalian adalah penjumlahan berulang dari kelompok yang sama banyak. Bilangan pertama adalah banyak kelompok dan bilangan kedua adalah isi tiap kelompok. Bilangan pada perkalian boleh ditukar tempatnya, misalnya lima kali enam sama dengan enam kali lima.

Cara menyebutkan: Cara mengalikan. Cari banyak kelompok. Cari isi tiap kelompok. Tulis perkalian atau penjumlahan berulang. Lalu hitung hasilnya. (banyak kelompok, isi tiap kelompok, tulis perkalian, hitung hasil)

Ayo Mencoba di rumah: siapkan beberapa gelas dan batu kerikil atau biji. Masukkan jumlah yang sama ke tiap gelas, misalnya 3 gelas yang masing-masing berisi 6. Tulis penjumlahan berulangnya, lalu tulis perkaliannya dan hitung hasilnya. Tukar tempat bilangannya dan ceritakan apakah hasilnya tetap sama.

Refleksi:
- Aku dapat menjelaskan perkalian sebagai penjumlahan berulang.
- Aku dapat menulis perkalian dari gambar kelompok.
- Aku dapat menghitung hasil perkalian sampai 100.
- Aku tahu bilangan pada perkalian boleh ditukar tempatnya.
