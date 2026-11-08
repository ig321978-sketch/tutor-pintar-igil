# Naskah Matematika Kelas 2 SD, Bab 1: Ayo Membilang sampai dengan 50, Sub-Bab C: Membandingkan Dua Bilangan atau Lebih

Berkas ini disusun dari Buku Siswa Matematika Kelas II (Kemendikbudristek, Kurikulum Merdeka) hlm. 23–30, `src/data/kelas2-bab1.json`, dan `src/components/modul/data-k2.ts`. Kunci Latihan dan Ujian tidak ditulis di sini.

## 1. Identitas modul

| Butir | Isi |
|---|---|
| Modul | `mtk-2-bab1`, sub-bab C |
| Berkas data | `src/data/kelas2-bab1.json` |
| Kode bab di server | `k2-mat-bab1` |
| Fase dan kelas | `FASE_A`, kelas 2 SD |
| Elemen | 🌈 Fase A • Elemen Bilangan (Kelas 2 SD/MI) |
| Poin Kualifikasi per bab | Latihan 30 dan Ujian 70. Praktikum 50 terbit sekali per blok empat bab. |
| Suara Guru | Web Speech API perangkat (`id-ID`), tanpa berkas audio statis, tanpa ElevenLabs. |
| Panggilan API saat siswa belajar | Nol. Seluruh tahap Materi berjalan di klien. |

## 2. Capaian dan tujuan pembelajaran

**Capaian Pembelajaran (CP).** Siswa membandingkan dua bilangan atau lebih sampai 50 memakai nilai tempat, menentukan bilangan yang lebih besar dan lebih kecil, menjelaskan alasan perbandingan, membandingkan tebakan dengan hasil hitungan, serta mengurutkan bilangan dari yang paling kecil atau paling besar.

**Rujukan.** Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 1: Ayo Membilang sampai dengan 50, Sub-Bab C hlm. 23–30).

**Tujuan Pembelajaran (TP).**

1. Siswa menebak banyak benda, menghitungnya, lalu membandingkan tebakan dengan hasil hitungan.
2. Siswa membandingkan dua bilangan sampai 50 memakai tabel nilai tempat: puluhan lebih dulu, lalu satuan.
3. Siswa menentukan bilangan yang lebih besar, lebih kecil, atau sama, memakai kata dan tandanya, serta menjelaskan alasannya.
4. Siswa menukar sepuluh satuan menjadi satu puluhan sebelum membandingkan.
5. Siswa mengurutkan tiga bilangan atau lebih dari yang paling kecil atau paling besar.

**Suara Silabus.** Kita belajar membandingkan dua bilangan atau lebih. Bukunya bernama Ayo Membilang sampai dengan Lima Puluh, bagian membandingkan. Kita menebak banyak permen di stoples Kira, lalu menghitung dan membandingkan tebakan dengan hitungan. Kita membandingkan dua bilangan memakai tabel nilai tempat, menentukan bilangan yang lebih besar dan lebih kecil, memakai tandanya, dan mengurutkan bilangan. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.

## 3. Isi buku yang diekstrak (hlm. 23–30) dan pembagiannya

| Halaman | Isi di buku | Dipakai di |
|---|---|---|
| 23 | Kira berulang tahun dan membawa stoples permen. Malosi menebak 20 permen, Halim menebak 30 permen. | Cerita 1, Concrete 1 |
| 24 | Permen dihitung dengan kelompok sepuluh: ternyata ada 26. Jalur bilangan 20 sampai 30 memuat tebakan Malosi, tebakan Halim, dan permen Kira. Menebak melatih kita berhitung. | Cerita 2 dan 3, Infografis 1 dan 2, Picture 6 |
| 25 | Ayo Mencoba: kelereng di wadah transparan, tebak lalu hitung. Membandingkan dua bilangan: Kira 26 permen, Tika 32 permen. Tabel nilai tempat, kolom puluhan dibandingkan; bilangan yang menunjukkan benda lebih banyak disebut lebih besar. | Cerita 4 dan 5, Infografis 3, Concrete 2, Picture 5 |
| 26 | Ayo Bermain: kartu bilangan 1 sampai 5, dua kartu disusun menjadi satu bilangan, bandingkan dengan teman. Ayo Berlatih 1a: tebak dan hitung. | Abstract 9 |
| 27 | Ayo Berlatih 1b sampai 1d: tebak banyak benda, buktikan dengan menghitung. | Concrete 1 |
| 28 | Ayo Berlatih 2: lingkari bilangan yang lebih besar (tabel nilai tempat). 3: lingkari bilangan yang lebih kecil. 4: urutkan dari yang paling kecil. | Picture 5, Abstract 8, Concrete 4 |
| 29 | Ayo Berlatih 5: urutkan dari yang paling besar. 6: kartu 25, 12, 35, 21 (paling kecil, paling besar, urutan, dan mengapa). Coba Pikirkan 1: bolehkah membandingkan satuan dahulu? 2: kartu Malosi, Kira, Lili. | Cerita 6, Infografis 8 dan 9, Concrete 4, Abstract 10 |
| 30 | Coba Pikirkan 3: 2 puluhan 3 satuan atau 1 puluhan 14 satuan. 4: kartu 1, 2, 3, 4, bilangan paling besar dan paling kecil. | Infografis 7, Neraca, Picture 7, Abstract 10 |

Catatan: sub-bab C di buku berakhir di hlm. 30 (Coba Pikirkan nomor 3 dan 4), bukan di hlm. 29. Evaluasi bab (hlm. 31–35) tidak dimasukkan ke modul ini; tema soal tebak banyak benda dan mengurutkan bilangan di sana menjadi acuan bank soal Latihan dan Ujian.

## 4. Peta enam tahap SMICPA dan bobotnya

| Tahap | Isi | Banyak butir |
|---|---|---|
| S. Story | Cerita bergambar SVG bergaya buku, tiap adegan disuarakan | 6 adegan |
| M. Mind-Map | Peta pikiran berurutan, tiap cabang bisa diketuk | 6 langkah |
| I. Infografis | Poster rangkuman dengan suara di tiap panel | 9 panel dan 2 kartu ingat |
| C. Concrete | Benda nyata yang dipegang, dipasangkan, ditimbang, dan diseret | 4 permainan |
| P. Picture | Diagram saja: tabel nilai tempat, model batang, jalur kotak bilangan | 3 permainan |
| A. Abstract | Tanda, kartu angka, dan penalaran | 3 permainan |

Bobot mengikuti buku. Sub-Bab C berfokus pada satu keterampilan inti: membandingkan puluhan lebih dulu, lalu satuan. Concrete memberi pengalaman fisik (memasangkan satu-satu, menimbang, mengurutkan kotak); Picture memindahkan pengalaman itu ke tabel dan jalur bilangan; Abstract memakai tanda lebih besar, lebih kecil, dan sama dengan serta penalaran lebih dan kurang. Aturan batas Concrete dan Picture berlaku: Concrete memakai benda berwarna yang dipindahkan dan tidak memakai garis bilangan; Picture hanya diagram dan titik polos tanpa gambar benda.

## 5. Tahap 1: Story (cerita)

**Adegan 1. Ulang Tahun Kira** (`K2C-S1`, ulang-tahun-kira)

> Hari ini Kira berulang tahun. Kira membawa satu stoples berisi permen. Ia ingin membagikan permen kepada teman-temannya. Dapatkah kalian menebak banyak permen yang dibawa Kira? Malosi menebak, menurutku ada dua puluh permen. Halim menebak, menurutku ada tiga puluh permen. Menebak boleh saja, tetapi kita harus membuktikannya dengan menghitung.

**Adegan 2. Menghitung Permen Kira** (`K2C-S2`, hitung-permen)

> Ayo, kita hitung banyak permen di dalam stoples. Kita kelompokkan setiap sepuluh permen, seperti lingkaran putus-putus di buku. Sepuluh, dua puluh. Lalu sisanya kita hitung satu per satu: dua puluh satu, dua puluh dua, dua puluh tiga, dua puluh empat, dua puluh lima, dua puluh enam. Ternyata ada dua puluh enam permen.

**Adegan 3. Tebakan Siapa Lebih Dekat?** (`K2C-S3`, tebakan-dekat)

> Sekarang kita bandingkan tebakan dengan hitungan. Tebakan Malosi dua puluh, tebakan Halim tiga puluh, dan banyak permen Kira dua puluh enam. Dari dua puluh maju ke dua puluh enam ada enam langkah. Dari tiga puluh mundur ke dua puluh enam ada empat langkah. Empat lebih sedikit daripada enam, jadi tebakan Halim lebih dekat. Kita dapat menebak banyak benda. Itu akan melatih kita dalam berhitung.

**Adegan 4. Permen Kira dan Tika** (`K2C-S4`, permen-kira-tika)

> Kira membawa dua puluh enam permen. Tika membawa tiga puluh dua permen. Permen siapa yang lebih banyak? Mengapa? Kita bisa menggunakan tabel nilai tempat untuk membandingkan bilangan. Dua puluh enam adalah dua puluhan dan enam satuan. Tiga puluh dua adalah tiga puluhan dan dua satuan.

**Adegan 5. Puluhan Dulu** (`K2C-S5`, puluhan-dulu)

> Amatilah kolom puluhan pada tabel nilai tempat. Mana yang lebih banyak? Bilangan dua puluh enam mempunyai dua puluhan. Bilangan tiga puluh dua mempunyai tiga puluhan. Bilangan tiga puluh dua mempunyai lebih banyak puluhan daripada bilangan dua puluh enam. Bilangan yang menunjukkan benda lebih banyak disebut bilangan lebih besar. Jadi, tiga puluh dua lebih besar dari dua puluh enam. Sebaliknya, dua puluh enam lebih kecil dari tiga puluh dua.

**Adegan 6. Urutkan Kartu Bilangan** (`K2C-S6`, urutkan-kartu)

> Malosi memegang empat kartu bilangan: dua puluh lima, dua belas, tiga puluh lima, dan dua puluh satu. Mana yang paling kecil? Dua belas, karena hanya satu puluhan. Mana yang paling besar? Tiga puluh lima, karena tiga puluhan. Dua puluh satu dan dua puluh lima sama-sama dua puluhan, jadi kita lihat satuannya. Satu lebih kecil dari lima. Urutan dari yang paling kecil adalah dua belas, dua puluh satu, dua puluh lima, lalu tiga puluh lima.

## 6. Tahap 2: Mind-Map (peta pikiran)

🤔 **1. Tebak dan Hitung** (Tebak dan hitung → Siapa lebih dekat)

Sebelum menghitung, kita boleh menebak banyak benda. Setelah menghitung, bandingkan tebakan dengan hasil hitungan: tebakan bisa lebih kecil, lebih besar, atau tepat sama. Menebak melatih perasaan bilangan, dan hitungan memastikan jawaban yang tepat.

🎯 **2. Siapa Lebih Dekat?** (Siapa lebih dekat → Banding puluhan dulu)

Untuk tahu tebakan siapa yang lebih dekat, hitung loncatannya di jalur bilangan. Dari dua puluh ke dua puluh enam ada enam langkah, dari tiga puluh ke dua puluh enam ada empat langkah. Loncatan yang lebih sedikit berarti tebakan lebih dekat. Bila loncatannya sama banyak, kedua tebakan sama dekat.

📋 **3. Banding Puluhan Dulu** (Banding puluhan dulu → Puluhan sama lihat satuan)

Untuk membandingkan dua bilangan, tulis keduanya di tabel nilai tempat dan lihat kolom puluhan lebih dulu. Dua puluh enam punya dua puluhan, tiga puluh dua punya tiga puluhan. Yang puluhannya lebih banyak adalah bilangan lebih besar. Memasangkan batang puluhan satu-satu juga menunjukkannya: batang yang tersisa milik bilangan yang lebih besar.

🔍 **4. Puluhan Sama? Lihat Satuan** (Puluhan sama lihat satuan → Lebih besar kecil sama)

Kalau puluhannya sama, lihat kolom satuan. Dua puluh empat dan dua puluh sembilan sama-sama dua puluhan, tetapi sembilan satuan lebih banyak daripada empat satuan, jadi dua puluh sembilan lebih besar. Kalau satuan sebuah bilangan sudah sepuluh atau lebih, tukar dulu sepuluh satuan menjadi satu puluhan, baru bandingkan. Jangan membandingkan satuan lebih dulu, karena satu puluhan nilainya sepuluh.

🐊 **5. Lebih Besar, Lebih Kecil, Sama** (Lebih besar kecil sama → Urutkan bilangan)

Bilangan yang menunjukkan benda lebih banyak disebut lebih besar, dan yang lebih sedikit disebut lebih kecil. Tiga puluh dua lebih besar dari dua puluh enam, dan dua puluh enam lebih kecil dari tiga puluh dua. Kalau nilainya persis sama, kita sebut sama dengan. Tanda lebih besar dan lebih kecil mirip mulut buaya yang selalu terbuka ke bilangan yang lebih besar.

📶 **6. Urutkan Bilangan** (Urutkan bilangan → Membandingkan bilangan siap dipakai)

Mengurutkan berarti menyusun bilangan dari yang paling kecil ke yang paling besar, atau sebaliknya. Bandingkan dua-dua: cari yang paling kecil dulu, lalu yang berikutnya. Dua belas, dua puluh satu, dua puluh lima, dan tiga puluh lima urut dari yang paling kecil. Untuk mengurutkan dari yang paling besar, balik urutannya.

## 7. Tahap 3: Infografis

1. 🤔 **Tebak, Hitung, Bandingkan** (contoh bilangan 26, dua puluh enam). Suara: Malosi menebak dua puluh, Halim menebak tiga puluh, hitungannya dua puluh enam. Tebakan Malosi lebih kecil dari hitungan, tebakan Halim lebih besar dari hitungan.
2. 🎯 **Siapa Lebih Dekat?** (contoh bilangan 26, dua puluh enam). Suara: Hitung loncatan di jalur bilangan. Dari dua puluh ke dua puluh enam enam langkah, dari tiga puluh ke dua puluh enam empat langkah. Loncatan lebih sedikit berarti lebih dekat.
3. 📋 **Banding Dua Bilangan** (contoh bilangan 32, tiga puluh dua). Suara: Dua puluh enam punya dua puluhan, tiga puluh dua punya tiga puluhan. Puluhan yang lebih banyak berarti bilangan lebih besar.
4. 🔢 **Puluhan Dulu, Lalu Satuan** (contoh bilangan 29, dua puluh sembilan). Suara: Dua puluh empat dan dua puluh sembilan sama-sama dua puluhan, jadi lihat satuannya. Sembilan lebih banyak daripada empat, jadi dua puluh sembilan lebih besar.
5. ⚖️ **Lebih Besar, Lebih Kecil, Sama** (contoh bilangan 26, dua puluh enam). Suara: Tiga puluh dua lebih besar dari dua puluh enam. Dua puluh enam lebih kecil dari tiga puluh dua. Dua puluh enam sama dengan dua puluh enam.
6. 🐊 **Buaya Lapar** (contoh bilangan 32, tiga puluh dua). Suara: Mulut buaya selalu terbuka ke bilangan yang lebih besar. Kalau kedua bilangan sama, mulut buaya tertutup.
7. 🔁 **Tukar Dulu, Baru Banding** (contoh bilangan 24, dua puluh empat). Suara: Satu puluhan empat belas satuan ditukar menjadi dua puluhan empat satuan, yaitu dua puluh empat. Dua puluh empat lebih besar dari dua puluh tiga.
8. 📶 **Urutkan Bilangan** (contoh bilangan 35, tiga puluh lima). Suara: Dari yang paling kecil: dua belas, dua puluh satu, dua puluh lima, tiga puluh lima. Bandingkan puluhan dulu, lalu satuan.
9. 🚫 **Jangan Banding Satuan Dulu** (contoh bilangan 21, dua puluh satu). Suara: Sembilan belas dan dua puluh satu: satuan sembilan lebih banyak, tetapi dua puluh satu tetap lebih besar karena puluhannya lebih banyak. Puluhan lebih berharga daripada satuan.

Dua kartu ingat menutup poster: "Puluhan dulu" dan "Mulut buaya". Keduanya bisa didengarkan.

## 8. Tahap 4–6: sepuluh permainan Concrete, Picture, dan Abstract

| No | Tahap | Permainan | Jenis | Rujukan buku |
|---|---|---|---|---|
| 1 | Concrete | Hitung Stoples Kira | count-groups-compare-guesses | Buku Siswa hlm. 23–24 |
| 2 | Concrete | Pasangkan Satu-Satu | pair-one-to-one | Buku Siswa hlm. 25 |
| 3 | Concrete | Neraca Dua Piring | balance-scale-build | Buku Siswa hlm. 25 dan 30 |
| 4 | Concrete | Susun di Rak Kelereng | drag-order-on-shelf | Buku Siswa hlm. 28–29 |
| 5 | Picture | Banding di Tabel | compare-in-place-value-table | Buku Siswa hlm. 25 dan 28 |
| 6 | Picture | Jarak di Jalur Bilangan | count-jumps-on-strip | Buku Siswa hlm. 24 |
| 7 | Picture | Tukar Dulu, Baru Banding | regroup-then-compare | Buku Siswa hlm. 30 |
| 8 | Abstract | Buaya Lapar | alligator-symbol-and-reason | Buku Siswa hlm. 25 dan 28 |
| 9 | Abstract | Duel Kartu Angka | card-duel | Buku Siswa hlm. 26 |
| 10 | Abstract | Teka-teki Kartu | logic-puzzle-order | Buku Siswa hlm. 29–30 |

Semua permainan memenuhi aturan berikut.

- **Tanpa skor dan tanpa waktu.** Jawaban salah dijawab dengan petunjuk pendek yang juga disuarakan, bukan hukuman.
- **Tiga ronde atau lebih.** Tombol "Soal berikutnya" muncul setelah ronde benar; tombol lanjut hanya muncul sesudah ronde terakhir.
- **Tiga jalur input.** Seret, ketuk lalu ketuk tujuan, dan papan ketik (Enter atau Spasi) untuk benda yang bisa diseret. Tiap elemen interaktif punya `aria-label`.
- **Satu permainan per layar** dengan penanda kemajuan di atasnya.
- **Jawaban suara akhir** memakai pengenalan ucapan perangkat dengan cadangan tombol "Pilih angka". Tiga pilihan cadangan berurutan dan posisi kunci diputar menurut nilai kunci.
- **Penalaran dilatih lewat alasan.** Permainan Buaya Lapar meminta anak memilih alasan (puluhan, satuan, atau sama), sesuai pertanyaan "Mengapa?" di buku.

### Permainan 1. Hitung Stoples Kira (Concrete)

- **Rujukan buku:** Buku Siswa hlm. 23–24 (Kira membawa stoples permen; Malosi menebak 20, Halim menebak 30; ternyata 26); hlm. 25 (Ayo Mencoba: menebak lalu menghitung)
- **Tujuan:** Menghitung permen dengan kelompok sepuluh dan membandingkan tebakan dengan hitungan: lebih kecil, sama, atau lebih besar.
- **Cara main:** Tiga ronde (26, 38, dan 43 permen). Siswa mengetuk kelompok sepuluh dari kiri lalu permen lepas satu per satu, kemudian menentukan apakah tebakan dua teman lebih kecil, sama, atau lebih besar dari hitungan. Terakhir ucapkan banyak permen.
- **Suara Guru (pembuka):** Hitung sepuluh-sepuluh, lalu bandingkan tebakannya.
- **Penutup:** Ronde terakhir ditutup dengan jawaban suara (Web Speech `id-ID`, pengenalan ucapan perangkat); bila mikrofon tidak tersedia, anak memakai tombol "Pilih angka".
- **Rincian ronde dan kunci permainan:**
  - Ronde 1: 26 permen = 2 kelompok sepuluh + 6 lepas. Tebakan Malosi 20 lebih kecil dari hitungan; tebakan Halim 30 lebih besar dari hitungan.
  - Ronde 2: 38 permen = 3 kelompok sepuluh + 8 lepas. Tebakan Tika 38 sama dengan hitungan; tebakan Lili 45 lebih besar dari hitungan.
  - Ronde 3: 43 permen = 4 kelompok sepuluh + 3 lepas. Tebakan Kira 30 lebih kecil dari hitungan; tebakan Upe 40 lebih kecil dari hitungan.

### Permainan 2. Pasangkan Satu-Satu (Concrete)

- **Rujukan buku:** Buku Siswa hlm. 25 (Kira 26 permen, Tika 32 permen: permen siapa lebih banyak? Mengapa?)
- **Tujuan:** Membandingkan dua bilangan dengan memasangkan batang puluhan dan kubus satuan satu-satu.
- **Cara main:** Tiga ronde (26 dan 32; 24 dan 29; 41 dan 38). Siswa mengetuk satu batang kiri lalu satu batang kanan agar berpasangan. Batang sisa menunjukkan bilangan yang lebih besar. Bila puluhannya sama, kubus satuan dipasangkan. Lalu memilih kiri lebih besar, sama besar, atau kanan lebih besar.
- **Suara Guru (pembuka):** Pasangkan batang satu-satu, lihat mana yang bersisa.
- **Penutup:** Tidak ada jawaban suara akhir; permainan selesai setelah semua ronde benar.
- **Rincian ronde dan kunci permainan:**
  - Ronde 1: 26 (2 puluhan 6 satuan) dan 32 (3 puluhan 2 satuan). 26 lebih kecil dari 32; puluhan yang menentukan.
  - Ronde 2: 24 (2 puluhan 4 satuan) dan 29 (2 puluhan 9 satuan). 24 lebih kecil dari 29; puluhan sama, satuan yang menentukan.
  - Ronde 3: 41 (4 puluhan 1 satuan) dan 38 (3 puluhan 8 satuan). 41 lebih besar dari 38; puluhan yang menentukan.

### Permainan 3. Neraca Dua Piring (Concrete)

- **Rujukan buku:** Buku Siswa hlm. 25 dan 30 (membandingkan dengan nilai tempat; Coba Pikirkan nomor 3: 2 puluhan 3 satuan dan 1 puluhan 14 satuan)
- **Tujuan:** Membuat bilangan yang lebih besar, lebih kecil, atau sama dengan cara tulis berbeda, dan melihat neraca memperlihatkannya.
- **Cara main:** Tiga ronde. Piring tetap berisi 28, 35, dan 34. Siswa menyeret batang puluhan dan kubus satuan ke piring yang kosong sampai nilainya lebih besar, lebih kecil, atau sama (dengan cara tulis berbeda), lalu menekan periksa. Neraca miring ke sisi yang lebih besar.
- **Suara Guru (pembuka):** Seret batang dan kubus, lihat neraca miring.
- **Penutup:** Tidak ada jawaban suara akhir; permainan selesai setelah semua ronde benar.
- **Rincian ronde dan kunci permainan:**
  - Ronde 1: piring kanan tetap 28 (2 puluhan 8 satuan). Isi piring kiri lebih besar dari 28. Batas piring: 5 batang dan 19 kubus.
  - Ronde 2: piring kiri tetap 35 (3 puluhan 5 satuan). Isi piring kanan lebih kecil dari 35. Batas piring: 5 batang dan 19 kubus.
  - Ronde 3: piring kiri tetap 34 (3 puluhan 4 satuan). Isi piring kanan sama dengan 34, dengan cara tulis berbeda (mis. 2 puluhan 14 satuan). Batas piring: 5 batang dan 24 kubus.

### Permainan 4. Susun di Rak Kelereng (Concrete)

- **Rujukan buku:** Buku Siswa hlm. 28–29 (Ayo Berlatih nomor 4 dan 5: urutkan bilangan dari yang paling kecil dan dari yang paling besar)
- **Tujuan:** Mengurutkan empat bilangan dari yang paling kecil atau paling besar dengan membandingkan puluhan lebih dulu.
- **Cara main:** Tiga ronde (23, 20, 34, 45 dari yang paling sedikit; 34, 45, 32, 37 dari yang paling banyak; 24, 45, 44, 32 dari yang paling sedikit). Siswa menyeret empat kotak kelereng ke rak, satu kantong bernilai sepuluh. Terakhir ucapkan bilangan yang paling besar.
- **Suara Guru (pembuka):** Seret kotak ke rak, kantong dulu, lalu kelereng lepas.
- **Penutup:** Ronde terakhir ditutup dengan jawaban suara (Web Speech `id-ID`, pengenalan ucapan perangkat); bila mikrofon tidak tersedia, anak memakai tombol "Pilih angka".
- **Rincian ronde dan kunci permainan:**
  - Ronde 1: kotak 23, 20, 34, 45; susun dari paling sedikit: 20 < 23 < 34 < 45.
  - Ronde 2: kotak 34, 45, 32, 37; susun dari paling banyak: 45 > 37 > 34 > 32.
  - Ronde 3: kotak 24, 45, 44, 32; susun dari paling sedikit: 24 < 32 < 44 < 45.

### Permainan 5. Banding di Tabel (Picture)

- **Rujukan buku:** Buku Siswa hlm. 25 dan 28 (Ayo Berlatih nomor 2: lingkari bilangan yang lebih besar dari tabel nilai tempat)
- **Tujuan:** Membandingkan dua bilangan lewat tabel nilai tempat: puluhan dulu, lalu satuan.
- **Cara main:** Empat ronde (26 dan 32; 24 dan 29; 44 dan 34; 38 dan 35). Siswa memilih kolom Puluhan yang lebih banyak di kiri, sama, atau di kanan. Bila puluhannya sama, siswa membandingkan kolom Satuan. Terakhir ucapkan bilangan yang lebih besar.
- **Suara Guru (pembuka):** Banding puluhan dulu, lalu satuan.
- **Penutup:** Ronde terakhir ditutup dengan jawaban suara (Web Speech `id-ID`, pengenalan ucapan perangkat); bila mikrofon tidak tersedia, anak memakai tombol "Pilih angka".
- **Rincian ronde dan kunci permainan:**
  - Ronde 1: 26 dan 32; 26 lebih kecil dari 32 (puluhan yang menentukan).
  - Ronde 2: 24 dan 29; 24 lebih kecil dari 29 (puluhan sama, satuan yang menentukan).
  - Ronde 3: 44 dan 34; 44 lebih besar dari 34 (puluhan yang menentukan).
  - Ronde 4: 38 dan 35; 38 lebih besar dari 35 (puluhan sama, satuan yang menentukan).

### Permainan 6. Jarak di Jalur Bilangan (Picture)

- **Rujukan buku:** Buku Siswa hlm. 24 (tebakan Malosi 20, tebakan Halim 30, permen Kira 26 pada jalur bilangan)
- **Tujuan:** Menentukan tebakan yang lebih dekat dengan menghitung loncatan di jalur bilangan.
- **Cara main:** Tiga ronde (jalur 20 sampai 30 dengan hitungan 26; 30 sampai 40 dengan 34; 40 sampai 50 dengan 45). Siswa mengetuk bilangan berikutnya satu per satu dari tebakan pertama, lalu dari tebakan kedua, kemudian memilih yang lebih dekat atau sama dekat.
- **Suara Guru (pembuka):** Hitung loncatan, yang lebih sedikit lebih dekat.
- **Penutup:** Tidak ada jawaban suara akhir; permainan selesai setelah semua ronde benar.
- **Rincian ronde dan kunci permainan:**
  - Ronde 1: jalur 20 sampai 30, hitungan 26. Malosi: 6 langkah; Halim: 4 langkah; tebakan Halim lebih dekat.
  - Ronde 2: jalur 30 sampai 40, hitungan 34. Tika: 4 langkah; Lili: 6 langkah; tebakan Tika lebih dekat.
  - Ronde 3: jalur 40 sampai 50, hitungan 45. Kira: 5 langkah; Upe: 5 langkah; sama dekat.

### Permainan 7. Tukar Dulu, Baru Banding (Picture)

- **Rujukan buku:** Buku Siswa hlm. 30 (Coba Pikirkan nomor 3: 2 puluhan 3 satuan atau 1 puluhan 14 satuan; jelaskan alasan)
- **Tujuan:** Menukar sepuluh satuan menjadi satu puluhan di tabel sebelum membandingkan dua bilangan.
- **Cara main:** Empat ronde (2 puluhan 3 satuan dan 1 puluhan 14 satuan; 3 puluhan 5 satuan dan 2 puluhan 12 satuan; 1 puluhan 15 satuan dan 2 puluhan 8 satuan; 3 puluhan 3 satuan dan 2 puluhan 13 satuan). Siswa mengisi puluhan baru dan satuan baru pada tabel yang satuannya sepuluh atau lebih, lalu memilih bilangan yang lebih besar.
- **Suara Guru (pembuka):** Tukar dulu satuannya, lalu bandingkan.
- **Penutup:** Tidak ada jawaban suara akhir; permainan selesai setelah semua ronde benar.
- **Rincian ronde dan kunci permainan:**
  - Ronde 1: kiri 2 puluhan 3 satuan, kanan 1 puluhan 14 satuan. Tukar tabel kanan menjadi 2 puluhan 4 satuan. Hasil: 23 lebih kecil dari 24.
  - Ronde 2: kiri 3 puluhan 5 satuan, kanan 2 puluhan 12 satuan. Tukar tabel kanan menjadi 3 puluhan 2 satuan. Hasil: 35 lebih besar dari 32.
  - Ronde 3: kiri 1 puluhan 15 satuan, kanan 2 puluhan 8 satuan. Tukar tabel kiri menjadi 2 puluhan 5 satuan. Hasil: 25 lebih kecil dari 28.
  - Ronde 4: kiri 3 puluhan 3 satuan, kanan 2 puluhan 13 satuan. Tukar tabel kanan menjadi 3 puluhan 3 satuan. Hasil: 33 sama dengan 33.

### Permainan 8. Buaya Lapar (Abstract)

- **Rujukan buku:** Buku Siswa hlm. 25 dan 28 (bilangan lebih besar; Ayo Berlatih nomor 2 dan 3: lingkari bilangan yang lebih besar dan yang lebih kecil)
- **Tujuan:** Memilih tanda lebih besar, lebih kecil, atau sama dengan, lalu menjelaskan alasan memakai puluhan dan satuan.
- **Cara main:** Lima ronde (26 dan 32; 45 dan 38; 19 dan 21; 24 dan 29; 41 dan 41). Siswa memilih mulut buaya yang tepat, lalu memilih alasan: puluhan yang menentukan, satuan yang menentukan, atau kedua bilangan sama.
- **Suara Guru (pembuka):** Mulut buaya terbuka ke bilangan yang lebih besar.
- **Penutup:** Tidak ada jawaban suara akhir; permainan selesai setelah semua ronde benar.
- **Rincian ronde dan kunci permainan:**
  - Ronde 1: 26 < 32; alasan: puluhan yang menentukan.
  - Ronde 2: 45 > 38; alasan: puluhan yang menentukan.
  - Ronde 3: 19 < 21; alasan: puluhan yang menentukan.
  - Ronde 4: 24 < 29; alasan: puluhan sama, satuan yang menentukan.
  - Ronde 5: 41 = 41; alasan: kedua bilangan sama persis.

### Permainan 9. Duel Kartu Angka (Abstract)

- **Rujukan buku:** Buku Siswa hlm. 26 (Ayo Bermain: kartu bilangan 1 sampai 5, dua kartu disusun menjadi satu bilangan, bandingkan dengan teman)
- **Tujuan:** Menyusun dua kartu angka menjadi bilangan yang lebih besar, lebih kecil, atau sama dengan bilangan lawan.
- **Cara main:** Empat ronde. Kartu 3 dan 4 melawan 35; kartu 1 dan 5 melawan 31; kartu 2 dan 4 melawan 42 (buat sama); kartu 2 dan 5 melawan 30 (buat lebih kecil). Siswa menaruh kartu di tempat puluhan dan satuan lalu menekan periksa. Terakhir ucapkan bilangan yang disusun.
- **Suara Guru (pembuka):** Susun dua kartu menjadi satu bilangan.
- **Penutup:** Ronde terakhir ditutup dengan jawaban suara (Web Speech `id-ID`, pengenalan ucapan perangkat); bila mikrofon tidak tersedia, anak memakai tombol "Pilih angka".
- **Rincian ronde dan kunci permainan:**
  - Ronde 1: kartu 3 dan 4 melawan bilangan Igil 35; buat lebih besar. Susunan yang benar: 43.
  - Ronde 2: kartu 1 dan 5 melawan bilangan Igil 31; buat lebih besar. Susunan yang benar: 51.
  - Ronde 3: kartu 2 dan 4 melawan bilangan Igil 42; buat sama. Susunan yang benar: 42.
  - Ronde 4: kartu 2 dan 5 melawan bilangan Igil 30; buat lebih kecil. Susunan yang benar: 25.

### Permainan 10. Teka-teki Kartu (Abstract)

- **Rujukan buku:** Buku Siswa hlm. 29–30 (Coba Pikirkan nomor 2 dan nomor 4: kartu Malosi, Kira, Lili, dan kartu 1, 2, 3, 4)
- **Tujuan:** Menalar lebihnya dan kurangnya untuk menemukan bilangan tiap teman, lalu mengurutkan dan menyusun bilangan terbesar dan terkecil dari kartu.
- **Cara main:** Tiga ronde. Ronde 1 Kira 34, Lili 2 kurangnya dari Kira, Malosi 3 lebihnya dari Lili. Ronde 2 Tika 41, Dodi 5 kurangnya dari Tika, Nia 7 lebihnya dari Dodi. Siswa mencari bilangan lalu mengurutkan dari terkecil. Ronde 3 memilih dua dari kartu 1, 2, 3, 4 untuk bilangan paling besar dan paling kecil.
- **Suara Guru (pembuka):** Cari bilangan tiap teman, lalu urutkan.
- **Penutup:** Tidak ada jawaban suara akhir; permainan selesai setelah semua ronde benar.
- **Rincian ronde dan kunci permainan:**
  - Ronde 1: Kira 34; Lili 2 kurangnya = 32; Malosi 3 lebihnya dari Lili = 35. Urutan: Lili 32 < Kira 34 < Malosi 35.
  - Ronde 2: Tika 41; Dodi 5 kurangnya = 36; Nia 7 lebihnya dari Dodi = 43. Urutan: Dodi 36 < Tika 41 < Nia 43.
  - Ronde 3: kartu 1, 2, 3, 4; pilih dua kartu. Paling besar 43 (kartu terbesar di puluhan), paling kecil 12 (kartu terkecil di puluhan).

## 9. Poin Penting dan Catatanku

Halaman Poin Penting menutup tahap Abstract: lima kartu rangkuman yang bisa didengarkan (puluhan dulu; lebih besar, lebih kecil, sama; tukar dulu; tebakan lebih dekat; urutkan), kartu "Cara menyebutkan" (tiga puluh dua lebih besar dari dua puluh enam), kegiatan di rumah (*Ayo Mencoba di rumah*: kartu angka 1 sampai 5 bersama keluarga), dan "Catatanku" berisi pernyataan refleksi dari buku ("Aku bisa membandingkan dua bilangan", "Aku bisa mengurutkan bilangan dari yang paling besar atau paling kecil"). Setelah itu anak menekan tombol penutup sub-bab.

## 10. Metode pengayaan dari sumber luar

| Metode | Asal | Dipakai di | Alasan |
|---|---|---|---|
| Korespondensi satu-satu (memasangkan) | Piaget dan pedoman prasekolah-kelas awal | Concrete 2 | Membandingkan banyak benda tanpa menghitung: yang bersisa lebih banyak. Menjadi jembatan ke aturan "puluhan dulu". |
| Neraca (model keseimbangan) | Praktik kelas matematika di banyak negara | Concrete 3 | Anak melihat "lebih besar" sebagai sisi yang turun dan "sama" sebagai neraca seimbang. Menulis bilangan dengan cara berbeda tetapi nilainya sama menyambung ke Sub-Bab B. |
| Perkiraan dengan patokan dan jarak | Van de Walle, *Elementary and Middle School Mathematics* | Concrete 1, Picture 6 | Membandingkan tebakan dengan hitungan, lalu mengukur kedekatan dengan banyak loncatan. |
| Tabel nilai tempat dan model batang | Matematika Singapura dan Dienes | Picture 5 dan 7, Infografis 3 | Perbandingan dilakukan kolom demi kolom: puluhan dulu, lalu satuan. |
| Menukar dulu sebelum membandingkan | Pertukaran (*regrouping*) Dienes | Picture 7, Infografis 7 | Bentuk 1 puluhan 14 satuan harus ditulis dengan satuan kurang dari sepuluh sebelum dibandingkan. |
| Metode buaya lapar (*alligator method*) | Dipakai luas di kelas awal di dunia berbahasa Inggris | Abstract 8, Infografis 5 dan 6 | Mulut buaya terbuka ke bilangan yang lebih besar. Anak menghubungkan tanda dengan gerak, bukan menghafal. |
| Permainan kartu angka (*digit cards*) | Pedoman NCTM dan permainan kartu Montessori | Abstract 9 | Dua kartu disusun menjadi satu bilangan; menukar letak kartu mengubah nilai, jadi nilai tempat dilatih lewat bermain. |
| Teka-teki lebihnya dan kurangnya | Pembelajaran berbasis masalah | Abstract 10 | Bilangan baru ditemukan dari petunjuk, lalu diurutkan. Melatih penalaran, bukan hafalan. |
| Pertanyaan "Mengapa?" dan "Yakinkan aku" | Mason dan Johnston-Wilder (menalar dan menjelaskan) | Abstract 8, Infografis 9 | Anak menjelaskan alasan sebelum diberi jawaban, sesuai tuntutan buku. |

Jebakan yang sengaja dimunculkan: 26 lawan 32 (satuan kiri lebih banyak tetapi bilangan kiri lebih kecil), 19 lawan 21, dan 2 puluhan 3 satuan lawan 1 puluhan 14 satuan. Ketiganya menunjukkan mengapa satuan tidak boleh dibandingkan lebih dulu.

## 11. Bank soal Latihan dan Ujian (ringkasan tanpa kunci)

- Latihan: 10 soal terbimbing (3 LOTS, 3 MOTS, 4 HOTS) untuk seluruh bab: 3 soal Sub-Bab A, 3 soal Sub-Bab B, dan 4 soal Sub-Bab C. Soal Sub-Bab C memuat istilah lebih besar, alasan membandingkan, pengurutan lewat teka-teki lebihnya dan kurangnya, dan menukar dulu sebelum membandingkan. Pembahasan dikembalikan server setelah jawaban masuk.
- Ujian: tiga paket, masing-masing 10 soal (3 dari A, 3 dari B, 4 dari C), dengan angka dan urutan pilihan berbeda. Soal C mencakup perbandingan di tabel nilai tempat, tebakan yang lebih dekat, pengurutan, dan penalaran kartu. Satu lembar dikirim utuh dan hanya nilai akhir yang kembali.
- Berkas JSON di perangkat tidak memuat `correct_index`, `explanation`, maupun soal Ujian. Kunci tersimpan di `private.practice_keys` dan `private.exam_keys` pada Supabase (berkas seed lokal `supabase/seed/02_kelas2_bab1_keys.sql`, tidak di-commit).

## 12. Aturan teknis ringkas

- Data-driven: `IgilModulePlayer` membaca `kelas2-bab1.json` dan memilih komponen tahap dari registri `MODUL_SUBBAB` dengan kunci `mtk-2-bab1-C`.
- Suara hanya Web Speech API perangkat (opsi `perangkatSaja`): tidak ada permintaan `/audio-guru/*.mp3` dan tidak ada `/api/tts`.
- Poin Kualifikasi tidak muncul di tahap Materi. Poin hanya terbit lewat RPC server pada Latihan dan Ujian.
- Sub-Bab C adalah sub-bab terakhir bab ini: tombol penutupnya berbunyi "Selesaikan materi dan lanjut ke Latihan". Latihan terbuka setelah Sub-Bab A, B, dan C selesai.
