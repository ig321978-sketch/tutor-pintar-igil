# Naskah Matematika Kelas 2 SD, Bab 1: Ayo Membilang sampai dengan 50, Sub-Bab B: Nilai Tempat

Berkas ini dihasilkan dari `src/data/kelas2-bab1.json` dan `src/components/modul/data-k2.ts` oleh skrip penulisan, lalu dirapikan. Isi naskah mengikuti Buku Siswa Matematika Kelas II (Kemendikbudristek, Kurikulum Merdeka). Kunci Latihan dan Ujian tidak ditulis di sini.

## 1. Identitas modul

| Butir | Isi |
|---|---|
| Modul | `mtk-2-bab1`, sub-bab B |
| Berkas data | `src/data/kelas2-bab1.json` |
| Kode bab di server | `k2-mat-bab1` |
| Fase dan kelas | `FASE_A`, kelas 2 SD |
| Elemen | 🌈 Fase A • Elemen Bilangan (Kelas 2 SD/MI) |
| Poin Kualifikasi per bab | Latihan 30 dan Ujian 70. Praktikum 50 terbit sekali per blok empat bab. |
| Suara Guru | Web Speech API perangkat (`id-ID`), tanpa berkas audio statis, tanpa ElevenLabs. |
| Panggilan API saat siswa belajar | Nol. Seluruh tahap Materi berjalan di klien. |

## 2. Capaian dan tujuan pembelajaran

**Capaian Pembelajaran (CP).** Siswa menyatakan sepuluh benda yang dikelompokkan sebagai satu puluhan dan benda sisanya sebagai satuan, mengisi tabel nilai tempat, membaca angka kiri sebagai puluhan dan angka kanan sebagai satuan, menukar sepuluh satuan dengan satu puluhan, serta menuliskan satu bilangan sampai 50 dengan beberapa cara.

**Rujukan.** Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 1: Ayo Membilang sampai dengan 50, Sub-Bab B hlm. 17–22).

**Tujuan Pembelajaran (TP).**

1. Siswa menyatakan sepuluh benda yang dikelompokkan sebagai satu puluhan dan benda sisanya sebagai satuan.
2. Siswa menuliskan banyak benda dalam tabel nilai tempat.
3. Siswa membaca angka kiri sebagai puluhan dan angka kanan sebagai satuan.
4. Siswa menjelaskan nilai angka menurut letaknya.
5. Siswa menukar sepuluh satuan dengan satu puluhan.
6. Siswa menuliskan satu bilangan dengan beberapa cara dan memilih cara yang paling ringkas.

**Suara Silabus.** Kita belajar nilai tempat. Bukunya bernama Ayo Membilang sampai dengan Lima Puluh, bagian nilai tempat. Sepuluh benda yang dikelompokkan disebut satu puluhan. Benda yang tersisa disebut satuan. Kita mengisi tabel nilai tempat, membaca angka kiri sebagai puluhan dan angka kanan sebagai satuan, menukar sepuluh satuan dengan satu puluhan, dan menulis satu bilangan dengan beberapa cara. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.

## 3. Peta enam tahap SMICPA dan bobotnya

| Tahap | Isi | Banyak butir |
|---|---|---|
| S. Story | Cerita bergambar SVG bergaya buku, tiap adegan disuarakan | 6 adegan |
| M. Mind-Map | Peta pikiran berurutan, tiap cabang bisa diketuk | 6 langkah |
| I. Infografis | Poster rangkuman dengan suara di tiap panel | 9 panel dan 2 kartu ingat |
| C. Concrete | Benda nyata yang dipegang, diseret, dan dihitung | 4 permainan |
| P. Picture | Diagram saja: bingkai sepuluh, batang, garis bilangan, bagan pasangan | 3 permainan |
| A. Abstract | Kata dan angka, kartu, kanvas guratan | 3 permainan |

Bobot mengikuti isi buku. Sub-Bab B paling berat di Concrete dan Picture karena nilai tempat harus dilihat dan dipertukarkan sebelum menjadi simbol; Abstract berfokus pada pembacaan angka menurut letaknya, mengurutkan, dan menulis. Aturan batas Concrete dan Picture berlaku: Concrete memakai benda berwarna yang dipindahkan; Picture hanya diagram dan titik polos tanpa gambar benda.

## 4. Tahap 1: Story (cerita)

**Adegan 1. Malosi Bermain Balok** (`K2B-S1`, main-balok)

> Malosi sedang bermain balok. Balok-balok berserakan di lantai. Malosi ingin tahu berapa banyak balok yang ia punya. Kalau dihitung satu per satu, bisa lama dan mudah salah. Ada cara yang lebih rapi, yaitu memakai nilai tempat. Kita menghitung banyak benda dengan memakai puluhan dan satuan. Ayo kita lihat caranya bersama Malosi.

**Adegan 2. Satu Puluhan dan Empat Satuan** (`K2B-S2`, satu-puluhan)

> Sepuluh balok disusun menjadi satu batang. Satu batang berisi sepuluh balok disebut satu puluhan. Balok yang tersisa, tidak sampai sepuluh, disebut satuan. Di sini ada satu puluhan dan empat satuan. Kita tulis di tabel nilai tempat. Satu di kolom puluhan dan empat di kolom satuan. Satu puluhan dan empat satuan sama dengan empat belas.

**Adegan 3. Tabel Nilai Tempat** (`K2B-S3`, tabel-nilai-tempat)

> Ini adalah tabel nilai tempat. Kolom kiri untuk puluhan, kolom kanan untuk satuan. Dua batang berarti dua puluhan, dan delapan balok lepas berarti delapan satuan. Tulis dua di kolom puluhan dan delapan di kolom satuan. Dua puluhan dan delapan satuan sama dengan dua puluh delapan. Angka di sebelah kiri menunjukkan banyak puluhan, dan angka di sebelah kanan menunjukkan banyak satuan.

**Adegan 4. Cara 1: Dua Puluh Enam Satuan** (`K2B-S4`, cara-satu)

> Malosi punya dua puluh enam balok. Ia menuliskannya dengan tiga cara. Cara pertama, semua balok dibiarkan lepas. Nol puluhan dan dua puluh enam satuan. Dua puluh enam adalah dua puluh enam satuan. Cara ini benar, tetapi kita harus menghitung dua puluh enam balok satu per satu.

**Adegan 5. Cara 2: Satu Puluhan Enam Belas Satuan** (`K2B-S5`, cara-dua)

> Cara kedua. Malosi menyusun sepuluh balok menjadi satu batang. Sisanya masih lepas, ada enam belas balok. Satu puluhan dan enam belas satuan. Dua puluh enam adalah satu puluhan dan enam belas satuan. Periksa: sepuluh ditambah enam belas sama dengan dua puluh enam. Cara ini juga benar, tetapi masih ada sepuluh balok lepas yang bisa disusun lagi.

**Adegan 6. Cara 3: Dua Puluhan Enam Satuan** (`K2B-S6`, cara-tiga)

> Cara ketiga. Malosi menyusun semua sepuluh balok yang bisa disusun. Ada dua batang dan enam balok lepas. Dua puluhan dan enam satuan. Dua puluh enam adalah dua puluhan dan enam satuan. Ini cara yang paling ringkas, karena satuannya kurang dari sepuluh. Jadi bilangan dua puluh enam bisa ditulis dengan tiga cara. Kita menuliskan dua puluh enam dengan dua puluhan dan enam satuan. Setiap cara menghasilkan jumlah yang sama.

## 5. Tahap 2: Mind-Map (peta pikiran)

🧱 **1. Kelompokkan Sepuluh** (Kelompokkan sepuluh → Puluhan dan satuan)

Susun setiap sepuluh benda menjadi satu kelompok, misalnya satu batang balok. Balok Dienes adalah alat peraga yang dipakai di banyak sekolah: satu kubus kecil untuk satu satuan, satu batang sepuluh ruas untuk satu puluhan. Dengan alat ini, sepuluh terlihat sekaligus sebagai satu benda.

🔟 **2. Puluhan dan Satuan** (Puluhan dan satuan → Tabel nilai tempat)

Satu kelompok sepuluh disebut satu puluhan. Benda yang tersisa, kurang dari sepuluh, disebut satuan. Empat belas adalah satu puluhan dan empat satuan. Dua puluh delapan adalah dua puluhan dan delapan satuan.

📋 **3. Tabel Nilai Tempat** (Tabel nilai tempat → Nilai angka)

Tabel nilai tempat punya dua kolom. Kolom kiri untuk puluhan dan kolom kanan untuk satuan. Tuliskan banyak puluhan dan banyak satuan. Bilangan yang terbentuk dibaca dari kiri: puluhan dulu, lalu satuan. Papan manik emas Montessori memakai ide yang sama.

🔍 **4. Nilai Angka** (Nilai angka → Tukar sepuluh satuan)

Letak angka menentukan nilainya. Pada 26, angka 2 ada di tempat puluhan jadi nilainya 20, dan angka 6 ada di tempat satuan jadi nilainya 6. Karena itu 26 dan 62 berbeda, dan 24 tidak sama dengan 42. Itulah mengapa dinamakan nilai tempat.

🔁 **5. Tukar Sepuluh Satuan** (Tukar sepuluh satuan → Cara paling ringkas)

Sepuluh satuan bisa ditukar menjadi satu puluhan, dan satu puluhan bisa dibuka lagi menjadi sepuluh satuan. Nilainya tidak berubah. Karena itu 26 bisa ditulis 26 satuan, 1 puluhan 16 satuan, atau 2 puluhan 6 satuan. Pertukaran ini juga dipakai nanti saat menjumlah dan mengurang dengan meminjam atau menyimpan.

⭐ **6. Cara Paling Ringkas** (Cara paling ringkas → Nilai tempat siap dipakai)

Tukarkan semua sepuluh satuan sampai satuannya kurang dari sepuluh. Itulah cara menulis yang paling ringkas dan paling umum: dua puluhan dan enam satuan. Periksa selalu dengan menghitung nilainya: 20 ditambah 6 sama dengan 26.

## 6. Tahap 3: Infografis

1. 📋 **Tabel Nilai Tempat** (contoh bilangan 14, empat belas). Suara: Kolom kiri untuk puluhan, kolom kanan untuk satuan. Satu puluhan dan empat satuan sama dengan empat belas. Dua puluhan dan delapan satuan sama dengan dua puluh delapan.
2. 🔢 **Berapa Puluhan, Berapa Satuan?** (contoh bilangan 25, dua puluh lima). Suara: Angka di kiri adalah banyak puluhan, angka di kanan adalah banyak satuan. Dua puluh lima adalah dua puluhan dan lima satuan.
3. 🧱 **Balok Dienes** (contoh bilangan 10, sepuluh). Suara: Satu kubus kecil satu satuan. Satu batang sepuluh kubus satu puluhan. Alat ini dibuat oleh Zoltan Dienes dan dipakai guru di banyak negara.
4. 🧮 **Tiga Cara Menulis 26** (contoh bilangan 26, dua puluh enam). Suara: Dua puluh enam adalah dua puluh enam satuan, satu puluhan enam belas satuan, atau dua puluhan enam satuan. Ketiganya sama nilainya.
5. 🔁 **Tukar Sepuluh Satuan** (contoh bilangan 10, sepuluh). Suara: Sepuluh satuan bisa ditukar menjadi satu puluhan, dan satu puluhan bisa dibuka menjadi sepuluh satuan. Nilainya tetap sama.
6. 🔍 **Nilai Angka** (contoh bilangan 20, dua puluh). Suara: Letak angka menentukan nilainya. Pada dua puluh enam, angka dua bernilai dua puluh dan angka enam bernilai enam. Dua puluh empat berbeda dengan empat puluh dua.
7. 🟡 **Manik Emas Montessori** (contoh bilangan 10, sepuluh). Suara: Maria Montessori membuat manik emas. Satu manik satu satuan, sepuluh manik dalam satu batang satu puluhan.
8. 📏 **Garis Bilangan Puluhan** (contoh bilangan 34, tiga puluh empat). Suara: Melompat sepuluh-sepuluh di garis bilangan. Tiga puluh empat dicari dari tiga puluh, lalu maju empat langkah.
9. ⭐ **Cara Paling Ringkas** (contoh bilangan 46, empat puluh enam). Suara: Tukar semua sepuluh satuan sampai satuannya kurang dari sepuluh. Empat puluh enam paling ringkas ditulis empat puluhan dan enam satuan.

Dua kartu ingat menutup poster, berisi aturan inti sub-bab dan bisa didengarkan.

## 7. Tahap 4–6: sepuluh permainan Concrete, Picture, dan Abstract

| No | Tahap | Permainan | Jenis | Rujukan buku |
|---|---|---|---|---|
| 1 | Concrete | Papan Nilai Tempat | drag-rods-and-cubes | Buku Siswa hlm. 17 |
| 2 | Concrete | Mesin Tukar | regroup-ten-ones | Buku Siswa hlm. 18–19 |
| 3 | Concrete | Pesanan Toko Kelereng | drag-to-basket-order | Buku Siswa hlm. 5 dan 17 |
| 4 | Concrete | Hitung Loncat Sepuluh | skip-count-by-tens | Buku Siswa hlm. 6 dan 9 |
| 5 | Picture | Isi Tabel dari Batang | rods-to-place-value-table | Buku Siswa hlm. 17 dan 21 |
| 6 | Picture | Tempatkan di Garis Bilangan | place-on-number-line | Buku Siswa hlm. 17–19 |
| 7 | Picture | Pilih Semua Cara | multi-select-number-bonds | Buku Siswa hlm. 22 |
| 8 | Abstract | Isi Titik-Titik | fill-the-blanks | Buku Siswa hlm. 21 |
| 9 | Abstract | Urutkan Kartu Nilai Tempat | order-place-value-cards | Buku Siswa hlm. 22 |
| 10 | Abstract | Kanvas Guratan dan Suara | say-and-trace | Buku Siswa hlm. 17 dan 19 |

Semua permainan memenuhi aturan berikut.

- **Tanpa skor dan tanpa waktu.** Jawaban salah dijawab dengan petunjuk pendek yang juga disuarakan, bukan hukuman.
- **Tiga ronde atau lebih.** Tombol "Soal berikutnya" muncul setelah ronde benar; tombol lanjut hanya muncul sesudah ronde terakhir.
- **Tiga jalur input.** Seret, ketuk lalu ketuk tujuan, dan papan ketik (Enter atau Spasi) untuk benda yang bisa diseret. Tiap elemen interaktif punya `aria-label`.
- **Satu permainan per layar** dengan penanda kemajuan di atasnya.
- **Jawaban suara akhir** memakai pengenalan ucapan perangkat dengan cadangan tombol "Pilih angka".
- **Pilihan jawaban hitungan memutar posisi kunci** menurut nilai kunci, supaya jawaban benar tidak selalu di tempat yang sama. Cadangan "Pilih angka" pada jawaban suara memakai tiga bilangan berurutan.

### Permainan 1. Papan Nilai Tempat (Concrete)

- **Rujukan buku:** Buku Siswa hlm. 17 (tabel nilai tempat, 10 balok disusun jadi 1 puluhan); hlm. 20 (Ayo Mencoba)
- **Tujuan:** Membangun bilangan dengan batang puluhan dan kubus satuan di papan nilai tempat.
- **Cara main:** Empat ronde (14, 27, 35, dan 48). Siswa menyeret batang puluhan ke kolom Puluhan dan kubus satuan ke kolom Satuan, boleh mengeluarkannya lagi, lalu menekan periksa. Terakhir ucapkan bilangan.
- **Suara Guru (pembuka):** Seret batang ke Puluhan dan kubus ke Satuan.
- **Penutup:** Ronde terakhir ditutup dengan jawaban suara (Web Speech `id-ID`, pengenalan ucapan perangkat); bila mikrofon tidak tersedia, anak memakai tombol "Pilih angka".
- **Rincian ronde dan kunci permainan:**
  - Ronde 1: bentuk 14 = 1 batang puluhan + 4 kubus satuan. Papan memuat paling banyak 5 puluhan dan 9 satuan.
  - Ronde 2: bentuk 27 = 2 batang puluhan + 7 kubus satuan. Papan memuat paling banyak 5 puluhan dan 9 satuan.
  - Ronde 3: bentuk 35 = 3 batang puluhan + 5 kubus satuan. Papan memuat paling banyak 5 puluhan dan 9 satuan.
  - Ronde 4: bentuk 48 = 4 batang puluhan + 8 kubus satuan. Papan memuat paling banyak 5 puluhan dan 9 satuan.

### Permainan 2. Mesin Tukar (Concrete)

- **Rujukan buku:** Buku Siswa hlm. 18–19 (Malosi menulis 26 dengan tiga cara: 26 satuan, 1 puluhan 16 satuan, 2 puluhan 6 satuan)
- **Tujuan:** Menukar sepuluh satuan dengan satu puluhan dan sebaliknya, dan menyadari nilainya tetap.
- **Cara main:** Tiga ronde (0 puluhan 26 satuan jadi 2 puluhan 6 satuan; lalu jadi 1 puluhan 16 satuan; 1 puluhan 24 satuan jadi 3 puluhan 4 satuan). Siswa menekan tombol tukar atau buka sampai tujuan tercapai.
- **Suara Guru (pembuka):** Tukar sepuluh satuan atau buka satu puluhan.
- **Penutup:** Tidak ada jawaban suara akhir; permainan selesai setelah semua ronde benar.
- **Rincian ronde dan kunci permainan:**
  - Ronde 1: 0 puluhan 26 satuan menjadi 2 puluhan 6 satuan. Nilai tetap 26.
  - Ronde 2: 2 puluhan 6 satuan menjadi 1 puluhan 16 satuan. Nilai tetap 26.
  - Ronde 3: 1 puluhan 24 satuan menjadi 3 puluhan 4 satuan. Nilai tetap 34.

### Permainan 3. Pesanan Toko Kelereng (Concrete)

- **Rujukan buku:** Buku Siswa hlm. 5 dan 17 (satu kantong berisi 10; puluhan dan satuan)
- **Tujuan:** Memenuhi pesanan dengan kantong penuh lebih dulu lalu kelereng lepas.
- **Cara main:** Tiga ronde (23, 38, dan 41 kelereng). Siswa menyeret kantong penuh dan kelereng lepas ke keranjang, boleh mengeluarkannya lagi, lalu menekan periksa. Terakhir ucapkan banyak kelereng.
- **Suara Guru (pembuka):** Seret kantong dan kelereng ke keranjang.
- **Penutup:** Ronde terakhir ditutup dengan jawaban suara (Web Speech `id-ID`, pengenalan ucapan perangkat); bila mikrofon tidak tersedia, anak memakai tombol "Pilih angka".
- **Rincian ronde dan kunci permainan:**
  - Ronde 1: pesanan 23 kelereng = 2 kantong + 3 lepas. Keranjang paling banyak 50 kelereng; sepuluh kelereng lepas harus ditukar kantong.
  - Ronde 2: pesanan 38 kelereng = 3 kantong + 8 lepas. Keranjang paling banyak 50 kelereng; sepuluh kelereng lepas harus ditukar kantong.
  - Ronde 3: pesanan 41 kelereng = 4 kantong + 1 lepas. Keranjang paling banyak 50 kelereng; sepuluh kelereng lepas harus ditukar kantong.

### Permainan 4. Hitung Loncat Sepuluh (Concrete)

- **Rujukan buku:** Buku Siswa hlm. 6 dan 9 (menghitung setiap 10: 10, 20, 30; lalu menambah sisanya)
- **Tujuan:** Menghitung loncat sepuluh lalu melanjutkan satu per satu.
- **Cara main:** Tiga ronde (3 rak dan 4 telur; 4 rak dan 2 telur; 2 rak dan 7 telur). Siswa mengetuk rak dari kiri sambil menyebut kelipatan sepuluh, lalu telur lepas satu per satu, kemudian memilih banyak telur. Terakhir ucapkan banyak telur.
- **Suara Guru (pembuka):** Ketuk rak sepuluh-sepuluh, lalu telur lepas.
- **Penutup:** Ronde terakhir ditutup dengan jawaban suara (Web Speech `id-ID`, pengenalan ucapan perangkat); bila mikrofon tidak tersedia, anak memakai tombol "Pilih angka".
- **Rincian ronde dan kunci permainan:**
  - Ronde 1: 3 rak dan 4 telur lepas = 34 telur. Hitung 10, 20, 30, lanjut 31, 32, 33, 34.
  - Ronde 2: 4 rak dan 2 telur lepas = 42 telur. Hitung 10, 20, 30, 40, lanjut 41, 42.
  - Ronde 3: 2 rak dan 7 telur lepas = 27 telur. Hitung 10, 20, lanjut 21, 22, 23, 24, 25, 26, 27.

### Permainan 5. Isi Tabel dari Batang (Picture)

- **Rujukan buku:** Buku Siswa hlm. 17 dan 21 (Ayo Berlatih nomor 1: lengkapi tabel nilai tempat)
- **Tujuan:** Mengisi tabel nilai tempat dari diagram batang dan kotak.
- **Cara main:** Tiga ronde (26, 38, dan 45). Siswa menghitung batang dan kotak kecil, memilih angka untuk kolom puluhan dan satuan, lalu menekan periksa. Terakhir ucapkan bilangan.
- **Suara Guru (pembuka):** Isi kolom puluhan dan satuan.
- **Penutup:** Ronde terakhir ditutup dengan jawaban suara (Web Speech `id-ID`, pengenalan ucapan perangkat); bila mikrofon tidak tersedia, anak memakai tombol "Pilih angka".
- **Rincian ronde dan kunci permainan:**
  - Ronde 1: diagram 2 batang dan 6 kotak; tabel diisi 2 dan 6 (bilangan 26).
  - Ronde 2: diagram 3 batang dan 8 kotak; tabel diisi 3 dan 8 (bilangan 38).
  - Ronde 3: diagram 4 batang dan 5 kotak; tabel diisi 4 dan 5 (bilangan 45).

### Permainan 6. Tempatkan di Garis Bilangan (Picture)

- **Rujukan buku:** Buku Siswa hlm. 17–19 (puluhan dan satuan); garis bilangan puluhan sebagai pengayaan
- **Tujuan:** Menempatkan bilangan di garis bilangan lewat puluhan dulu lalu satuan.
- **Cara main:** Tiga ronde (34, 27, dan 48). Siswa mengetuk bilangan puluhannya di garis bilangan 0 sampai 50, lalu memperbesar dan mengetuk bilangannya.
- **Suara Guru (pembuka):** Ketuk puluhannya, lalu maju sebanyak satuannya.
- **Penutup:** Tidak ada jawaban suara akhir; permainan selesai setelah semua ronde benar.
- **Rincian ronde dan kunci permainan:**
  - Ronde 1: letakkan 34; langkah 1 ketuk 30, langkah 2 garis diperbesar 30 sampai 40 lalu ketuk 34.
  - Ronde 2: letakkan 27; langkah 1 ketuk 20, langkah 2 garis diperbesar 20 sampai 30 lalu ketuk 27.
  - Ronde 3: letakkan 48; langkah 1 ketuk 40, langkah 2 garis diperbesar 40 sampai 50 lalu ketuk 48.

### Permainan 7. Pilih Semua Cara (Picture)

- **Rujukan buku:** Buku Siswa hlm. 22 (Ayo Berlatih nomor 4: 46 sebagai 4 puluhan 6 satuan, 3 puluhan 16 satuan, atau 2 puluhan 16 satuan)
- **Tujuan:** Memilih semua cara menulis satu bilangan dengan puluhan dan satuan yang nilainya sama.
- **Cara main:** Tiga ronde (46, 35, dan 28), tiap ronde empat kartu bagan pasangan dan tiga di antaranya benar. Siswa memilih semua yang benar lalu menekan periksa.
- **Suara Guru (pembuka):** Pilih semua bagan yang nilainya sama.
- **Penutup:** Tidak ada jawaban suara akhir; permainan selesai setelah semua ronde benar.
- **Rincian ronde dan kunci permainan:**
  - Ronde 1: bilangan 46. Kartu: 4 puluhan 6 satuan (benar); 3 puluhan 16 satuan (benar); 2 puluhan 16 satuan (bernilai 36); 0 puluhan 46 satuan (benar). Tepat tiga kartu benar.
  - Ronde 2: bilangan 35. Kartu: 2 puluhan 15 satuan (benar); 3 puluhan 5 satuan (benar); 2 puluhan 5 satuan (bernilai 25); 1 puluhan 25 satuan (benar). Tepat tiga kartu benar.
  - Ronde 3: bilangan 28. Kartu: 1 puluhan 8 satuan (bernilai 18); 2 puluhan 8 satuan (benar); 1 puluhan 18 satuan (benar); 0 puluhan 28 satuan (benar). Tepat tiga kartu benar.

### Permainan 8. Isi Titik-Titik (Abstract)

- **Rujukan buku:** Buku Siswa hlm. 21 (Ayo Berlatih nomor 2: 24 = ... puluhan + ... satuan, dan seterusnya)
- **Tujuan:** Menuliskan bilangan sebagai puluhan ditambah satuan.
- **Cara main:** Empat ronde (24, 26, 32, dan 35). Siswa mengetuk titik lalu memilih angkanya untuk puluhan dan satuan, kemudian menekan periksa. Terakhir ucapkan bilangan.
- **Suara Guru (pembuka):** Isi puluhan dan satuan.
- **Penutup:** Ronde terakhir ditutup dengan jawaban suara (Web Speech `id-ID`, pengenalan ucapan perangkat); bila mikrofon tidak tersedia, anak memakai tombol "Pilih angka".
- **Rincian ronde dan kunci permainan:**
  - Ronde 1: 24 = ... puluhan + ... satuan (jawab 2 dan 4).
  - Ronde 2: 26 = ... puluhan + ... satuan (jawab 2 dan 6).
  - Ronde 3: 32 = ... puluhan + ... satuan (jawab 3 dan 2).
  - Ronde 4: 35 = ... puluhan + ... satuan (jawab 3 dan 5).

### Permainan 9. Urutkan Kartu Nilai Tempat (Abstract)

- **Rujukan buku:** Buku Siswa hlm. 22 (Ayo Berlatih nomor 3: 2 puluhan dan 15 satuan, 2 puluhan dan 23 satuan)
- **Tujuan:** Mengubah kartu puluhan dan satuan menjadi satu bilangan lalu mengurutkannya dari yang terkecil.
- **Cara main:** Tiga ronde (tiga kartu, tiga kartu, empat kartu). Siswa mengetuk kartu yang bernilai paling kecil dulu, lalu berikutnya.
- **Suara Guru (pembuka):** Ubah jadi satu bilangan, lalu urutkan.
- **Penutup:** Tidak ada jawaban suara akhir; permainan selesai setelah semua ronde benar.
- **Rincian ronde dan kunci permainan:**
  - Ronde 1: kartu 3p2s, 2p15s, 1p9s bernilai 32, 35, 19; urutan benar dari terkecil 19 < 32 < 35.
  - Ronde 2: kartu 4p1s, 2p23s, 3p9s bernilai 41, 43, 39; urutan benar dari terkecil 39 < 41 < 43.
  - Ronde 3: kartu 1p28s, 3p4s, 2p7s, 4p0s bernilai 38, 34, 27, 40; urutan benar dari terkecil 27 < 34 < 38 < 40.

### Permainan 10. Kanvas Guratan dan Suara (Abstract)

- **Rujukan buku:** Buku Siswa hlm. 17 dan 19 (puluhan dan satuan menjadi bilangan); hlm. 22
- **Tujuan:** Menyebut puluhan dan satuan, mengucapkan bilangan, dan menulis lambangnya.
- **Cara main:** Dua ronde. Ronde 1 dua puluhan dan enam satuan. Ronde 2 siswa memilih satu dari tiga bilangan (35, 43, 48). Siswa mengucapkan bilangannya lalu menggurat lambangnya.
- **Suara Guru (pembuka):** Ucapkan bilangannya, lalu guratkan lambangnya.
- **Penutup:** Jawaban suara dipakai di setiap ronde (pengenal ucapan perangkat dengan cadangan tombol "Pilih angka"). Tombol lanjut muncul setelah ronde 2 diucapkan. Goresan angka di kanvas tidak dinilai mesin.
- **Rincian ronde dan kunci permainan:**
  - Ronde 1: 2 puluhan dan 6 satuan = 26.
  - Ronde 2 (Ayo Mencoba): anak memilih satu dari 35 (tiga puluh lima), 43 (empat puluh tiga), 48 (empat puluh delapan).
  - Tiap ronde: ucapkan bilangan (atau pilih angka), lalu guratkan angkanya di kanvas bertitik.

## 8. Poin Penting dan Catatanku

Halaman Poin Penting menutup tahap Abstract: kartu rangkuman yang bisa didengarkan, kartu "Cara menyebutkan", kegiatan di rumah (*Ayo Mencoba di rumah*), dan "Catatanku" berisi pernyataan refleksi yang dicentang anak sendiri. Setelah itu anak menekan tombol penutup sub-bab.

## 9. Metode pengayaan dari sumber luar

| Metode | Asal | Dipakai di | Alasan |
|---|---|---|---|
| Balok Dienes (kubus satuan, batang puluhan) | Zoltan Dienes | Cerita 1–6, Infografis 3, Permainan 1, 2, 5 | Nilai sepuluh terlihat sebagai satu benda, jadi menukar sepuluh satuan dengan satu puluhan bisa dilihat dan dilakukan. |
| Manik emas Montessori | Maria Montessori | Infografis 7, Peta 3 | Satuan, puluhan, ratusan dan seribu berbeda wujud dengan nilai yang tetap sama; anak mengenal bahwa letak menentukan nilai. |
| Tabel nilai tempat dua kolom | Praktik kelas Singapura dan Kurikulum Merdeka | Cerita 3, Permainan 5, 8 | Angka kiri puluhan, angka kanan satuan dibaca dari tabel sebelum ditulis tanpa tabel. |
| Pertukaran (*regrouping*) bolak-balik | Van de Walle | Permainan 2, Infografis 5 | Menukar dan membuka dilakukan berulang sampai anak yakin nilainya tidak berubah. Ini dasar menyimpan dan meminjam di Bab 2. |
| Bagan pasangan bilangan (*number bond*) | Matematika Singapura | Permainan 7 | Anak memeriksa nilai tiap pasangan dengan "puluhan dikali sepuluh ditambah satuan". |
| Garis bilangan dua langkah | Representasi ikonik Bruner | Permainan 6 | Langkah pertama ke puluhan, langkah kedua maju sebanyak satuan; tampilan diperbesar agar sesuai ukuran jari. |
| Kartu nilai tempat untuk mengurutkan | Pembelajaran bilangan Singapura | Permainan 9 | Anak mengubah kartu menjadi satu bilangan sebelum membandingkan; menyiapkan Sub-Bab C. |

Pertukaran juga dijadikan jembatan ke Sub-Bab C (membandingkan): 26 satuan, 1 puluhan 16 satuan, dan 2 puluhan 6 satuan adalah satu bilangan dengan tiga wujud, sehingga membandingkan harus mengubah ke bentuk yang sama.


## 10. Bank soal Latihan dan Ujian (ringkasan tanpa kunci)

- Latihan: 10 soal terbimbing (3 LOTS, 3 MOTS, 4 HOTS) untuk seluruh bab: 3 soal Sub-Bab A, 3 soal Sub-Bab B, dan 4 soal Sub-Bab C; pembahasan dikembalikan server setelah jawaban masuk.
- Ujian: tiga paket, masing-masing 10 soal (3 dari Sub-Bab A, 3 dari Sub-Bab B, 4 dari Sub-Bab C), dengan angka dan urutan pilihan berbeda; satu lembar dikirim utuh dan hanya nilai akhir yang kembali.
- Berkas JSON di perangkat tidak memuat `correct_index`, `explanation`, maupun soal Ujian. Kunci tersimpan di `private.practice_keys` dan `private.exam_keys` pada Supabase (berkas seed lokal `supabase/seed/02_kelas2_bab1_keys.sql`, tidak di-commit).

## 11. Aturan teknis ringkas

- Data-driven: `IgilModulePlayer` membaca `kelas2-bab1.json` dan memilih komponen tahap dari registri `MODUL_SUBBAB` dengan kunci `mtk-2-bab1-B`.
- Suara hanya Web Speech API perangkat (opsi `perangkatSaja`): tidak ada permintaan `/audio-guru/*.mp3` dan tidak ada `/api/tts`.
- Poin Kualifikasi tidak muncul di tahap Materi. Poin hanya terbit lewat RPC server pada Latihan dan Ujian.
- Sub-Bab C (Membandingkan, hlm. 23–30) sudah tersedia dengan naskah sendiri (`naskah/mtk-2-bab1-sub-c-membandingkan-bilangan.md`). Latihan terbuka setelah Sub-Bab A, B, dan C selesai.
