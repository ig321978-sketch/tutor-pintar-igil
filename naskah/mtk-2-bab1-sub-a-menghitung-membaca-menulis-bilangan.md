# Naskah Matematika Kelas 2 SD, Bab 1: Ayo Membilang sampai dengan 50, Sub-Bab A: Menghitung, Membaca, dan Menulis Bilangan sampai dengan 50

Berkas ini dihasilkan dari `src/data/kelas2-bab1.json` dan `src/components/modul/data-k2.ts` oleh skrip penulisan, lalu dirapikan. Isi naskah mengikuti Buku Siswa Matematika Kelas II (Kemendikbudristek, Kurikulum Merdeka). Kunci Latihan dan Ujian tidak ditulis di sini.

## 1. Identitas modul

| Butir | Isi |
|---|---|
| Modul | `mtk-2-bab1`, sub-bab A |
| Berkas data | `src/data/kelas2-bab1.json` |
| Kode bab di server | `k2-mat-bab1` |
| Fase dan kelas | `FASE_A`, kelas 2 SD |
| Elemen | 🌈 Fase A • Elemen Bilangan (Kelas 2 SD/MI) |
| Poin Kualifikasi per bab | Latihan 30 dan Ujian 70. Praktikum 50 terbit sekali per blok empat bab. |
| Suara Guru | Web Speech API perangkat (`id-ID`), tanpa berkas audio statis, tanpa ElevenLabs. |
| Panggilan API saat siswa belajar | Nol. Seluruh tahap Materi berjalan di klien. |

## 2. Capaian dan tujuan pembelajaran

**Capaian Pembelajaran (CP).** Siswa menghitung banyak benda sampai 50 dengan menghitung satu per satu dan mengelompokkan setiap sepuluh, membaca dan menulis lambang serta nama bilangan sampai 50, menghitung maju dan mundur, melengkapi urutan bilangan, serta memperkirakan banyak benda lalu membuktikannya.

**Rujukan.** Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 1: Ayo Membilang sampai dengan 50, Sub-Bab A hlm. 3–16).

**Tujuan Pembelajaran (TP).**

1. Siswa menghitung banyak benda sampai 50 satu per satu dan dengan mengelompokkan setiap sepuluh.
2. Siswa membaca dan menulis lambang.
3. Siswa nama bilangan 21 sampai 50.
4. Siswa menyatakan bilangan sebagai puluhan ditambah satuan.
5. Siswa menghitung maju dan mundur.
6. Siswa melengkapi urutan bilangan.
7. Siswa menebak banyak benda lalu membuktikannya dengan menghitung.

**Suara Silabus.** Kita belajar menghitung, membaca, dan menulis bilangan sampai lima puluh. Bukunya bernama Ayo Membilang sampai dengan Lima Puluh. Kita menghitung tas di loker satu per satu, mengelompokkan setiap sepuluh benda, membaca dan menulis nama bilangan dua puluh satu sampai lima puluh, menghitung maju dan mundur, serta menebak lalu membuktikan. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.

## 3. Peta enam tahap SMICPA dan bobotnya

| Tahap | Isi | Banyak butir |
|---|---|---|
| S. Story | Cerita bergambar SVG bergaya buku, tiap adegan disuarakan | 6 adegan |
| M. Mind-Map | Peta pikiran berurutan, tiap cabang bisa diketuk | 6 langkah |
| I. Infografis | Poster rangkuman dengan suara di tiap panel | 9 panel dan 2 kartu ingat |
| C. Concrete | Benda nyata yang dipegang, diseret, dan dihitung | 4 permainan |
| P. Picture | Diagram saja: bingkai sepuluh, batang, garis bilangan, bagan pasangan | 3 permainan |
| A. Abstract | Kata dan angka, kartu, kanvas guratan | 3 permainan |

Bobot mengikuti isi buku. Sub-Bab A paling berat di Concrete karena dasar membilang adalah korespondensi satu-satu dan mengelompokkan sepuluh; di Picture bobotnya pada bingkai sepuluh dan jalur bilangan; di Abstract pada nama dan lambang 21 sampai 50. Aturan batas Concrete dan Picture berlaku: Concrete memakai benda berwarna yang dipindahkan; Picture hanya diagram dan titik polos tanpa gambar benda.

## 4. Tahap 1: Story (cerita)

**Adegan 1. Loker Baru di Kelas Malosi** (`K2A-S1`, loker-baru)

> Loker baru di kelas Malosi! Hari pertama masuk sekolah telah tiba. Malosi dan teman-temannya sangat senang. Sekarang ada loker baru di kelas Malosi. Loker baru ini dipakai untuk menyimpan tas supaya kelas rapi. Ibu guru meminta setiap anak memasukkan tasnya ke loker. Rak loker ini masih kosong. Menurut kamu, berapa banyak anak di kelas Malosi? Bagaimana cara kamu mendapatkan jawabannya?

**Adegan 2. Tas Masuk Loker Bergantian** (`K2A-S2`, tas-bergantian)

> Anak-anak menyimpan tas secara bergantian. Satu anak, satu tas, satu loker. Tidak ada yang berebut. Malosi mendapat giliran yang terakhir. Karena setiap anak membawa satu tas, banyak tas sama dengan banyak anak. Jadi kalau kita tahu banyak tas di loker, kita tahu banyak anak di kelas. Nah, bagaimana cara menghitung banyak tas dengan benar? Kita hitung satu per satu.

**Adegan 3. Dua Puluh Enam Tas** (`K2A-S3`, dua-puluh-enam)

> Semua anak sudah meletakkan tas di dalam loker. Sekarang kita hitung tas satu per satu, dan setiap tas hanya dihitung satu kali. Baris bawah dari satu sampai sepuluh. Baris tengah dari sebelas sampai dua puluh. Baris atas dari dua puluh satu sampai dua puluh enam. Ada dua puluh enam tas di dalam loker. Dua puluh enam ditulis 26. Karena banyak tas sama dengan banyak anak, ada dua puluh enam anak di kelas Malosi. Apakah jawabanmu sama?

**Adegan 4. Kelompok Sepuluh** (`K2A-S4`, kelompok-sepuluh)

> Untuk menghitung benda yang banyak, kita boleh mengelompokkan setiap sepuluh benda. Satu ikat berisi sepuluh pensil. Satu wadah berisi sepuluh telur. Satu ikat berisi sepuluh lidi. Satu susun berisi sepuluh balok. Satu bingkai berisi sepuluh kancing. Satu kantong berisi sepuluh kacang. Mengelompokkan setiap sepuluh benda membuat kita lebih mudah dan lebih cepat menghitung. Satu kelompok sepuluh disebut satu puluhan. Dua kelompok, dua puluh. Tiga kelompok, tiga puluh. Empat kelompok, empat puluh. Lima kelompok, lima puluh.

**Adegan 5. Sepuluh, Sepuluh, Enam** (`K2A-S5`, sepuluh-sepuluh-enam)

> Sekarang kita hitung tas dengan cara mengelompokkan setiap sepuluh tas. Ada sepuluh tas pada baris pertama. Ada sepuluh tas pada baris kedua. Sepuluh ditambah sepuluh sama dengan dua puluh. Ada enam tas pada baris ketiga. Dua puluh ditambah enam sama dengan dua puluh enam. Hasilnya sama dengan hitungan satu per satu, yaitu dua puluh enam tas. Menghitung dengan kelompok sepuluh lebih cepat dan tidak mudah salah.

**Adegan 6. Maju dan Mundur di Jalur Bilangan** (`K2A-S6`, jalur-bilangan)

> Kita juga bisa menghitung maju dan menghitung mundur. Menghitung maju dari dua puluh sampai tiga puluh: dua puluh, dua puluh satu, dua puluh dua, dan seterusnya sampai tiga puluh. Menghitung mundur dari tiga puluh sampai dua puluh: tiga puluh, dua puluh sembilan, dua puluh delapan, dan seterusnya sampai dua puluh. Perhatikan nama bilangannya: dua puluh dan satuannya. Ayo bacalah dengan suara nyaring, lalu hitung maju dan mundur bersama Igil.

## 5. Tahap 2: Mind-Map (peta pikiran)

🔢 **1. Hitung Satu per Satu** (Hitung benda → Kelompokkan sepuluh)

Sentuh setiap benda satu kali sambil menyebut bilangannya. Tandai benda yang sudah dihitung supaya tidak terhitung dua kali dan tidak ada yang terlewat. Bilangan terakhir yang disebut adalah banyak benda seluruhnya. Itulah korespondensi satu-satu, dasar dari semua berhitung.

📦 **2. Kelompokkan Sepuluh** (Kelompokkan sepuluh → Puluhan dan sisanya)

Benda yang banyak lebih mudah dihitung kalau dikelompokkan setiap sepuluh: satu ikat pensil, satu wadah telur, satu susun balok, satu bingkai sepuluh. Satu kelompok sepuluh disebut satu puluhan. Metode kotak sepuluh seperti ini dipakai di banyak negara, misalnya di Singapura, supaya anak melihat sepuluh sekaligus tanpa menghitung satu-satu.

➕ **3. Puluhan dan Sisanya** (Puluhan dan sisanya → Baca dan tulis)

Hitung dulu kelompok sepuluh: sepuluh, dua puluh, tiga puluh, empat puluh, lima puluh. Lalu tambahkan benda yang tersisa. Dua kelompok sepuluh dan enam benda lagi adalah 20 + 6 = 26. Menghitung loncat sepuluh lalu menambah satu-satu disebut hitung meloncat, dan sangat membantu saat bilangannya sudah besar.

🗣️ **4. Baca dan Tulis** (Baca dan tulis → Maju dan mundur)

Bilangan 21 sampai 50 ditulis dengan dua angka. Angka di kiri menunjukkan banyak puluhan, angka di kanan menunjukkan banyak satuan. Cara membacanya: nama puluhan lalu nama satuan, misalnya 26 dibaca dua puluh enam, 31 dibaca tiga puluh satu, 47 dibaca empat puluh tujuh. Kelipatan sepuluh dibaca tanpa satuan: dua puluh, tiga puluh, empat puluh, lima puluh.

🛤️ **5. Maju dan Mundur** (Maju dan mundur → Tebak dan buktikan)

Menghitung maju berarti bilangan makin besar, satu demi satu. Menghitung mundur berarti bilangan makin kecil. Di jalur bilangan, bilangan setelah dan sebelum sebuah bilangan selalu berbeda satu. Setelah 29 datang 30, dan sebelum 30 ada 29. Melengkapi urutan bilangan yang hilang melatih kita mengingat bilangan dengan tepat.

🔍 **6. Tebak dan Buktikan** (Tebak dan buktikan → Bilangan sampai 50)

Sebelum menghitung, kira-kira dulu banyak bendanya. Pakai patokan sepuluh: apakah benda ini sebanyak satu, dua, atau tiga kelompok sepuluh? Lalu hitung untuk membuktikan, dan bandingkan tebakan dengan hasil hitungan. Memperkirakan melatih perasaan bilangan, dan menghitung memastikan jawaban yang tepat.

## 6. Tahap 3: Infografis

1. 🎒 **Hitung Tas Satu per Satu** (contoh bilangan 26, dua puluh enam). Suara: Tas di loker dihitung satu per satu, tiap tas hanya sekali. Baris pertama sepuluh, baris kedua sepuluh, baris ketiga enam. Ada dua puluh enam tas, jadi ada dua puluh enam anak.
2. 📦 **Kelompok Sepuluh** (contoh bilangan 10, sepuluh). Suara: Satu ikat pensil, satu wadah telur, satu ikat lidi, satu susun balok, satu bingkai kancing, dan satu kantong kacang masing-masing berisi sepuluh. Mengelompokkan sepuluh memudahkan menghitung.
3. 🔟 **Puluhan sampai Lima Puluh** (contoh bilangan 50, lima puluh). Suara: Sepuluh, dua puluh, tiga puluh, empat puluh, lima puluh. Satu kelompok sepuluh disebut satu puluhan.
4. 📋 **Bilangan 21 sampai 25** (contoh bilangan 25, dua puluh lima). Suara: Dua puluh ditambah satu sampai lima. Nama bilangannya nama puluhan lalu nama satuan: dua puluh satu sampai dua puluh lima.
5. 📈 **Bilangan 26 sampai 30** (contoh bilangan 30, tiga puluh). Suara: Dua puluh ditambah enam sampai sembilan menjadi dua puluh enam sampai dua puluh sembilan. Dua puluh ditambah sepuluh menjadi tiga puluh.
6. 🗣️ **Sampai Lima Puluh: Pola Namanya** (contoh bilangan 47, empat puluh tujuh). Suara: Sebut nama puluhan dulu, lalu nama satuan. Tiga puluh satu, empat puluh empat, empat puluh tujuh. Kalau satuannya nol, hanya nama puluhan.
7. ↔️ **Maju dan Mundur** (contoh bilangan 30, tiga puluh). Suara: Maju berarti bilangan makin besar, mundur berarti makin kecil. Di jalur bilangan, sesudah dua puluh sembilan datang tiga puluh dan sebelum tiga puluh ada dua puluh sembilan.
8. 🧩 **Papan 1 sampai 50** (contoh bilangan 50, lima puluh). Suara: Setiap baris berisi sepuluh bilangan. Turun satu baris berarti lebih sepuluh, geser satu kotak ke kanan berarti lebih satu. Bilangan puluhan diberi warna merah.
9. 🔍 **Tebak dan Buktikan** (contoh bilangan 3, tiga). Suara: Tebak dulu dengan patokan sepuluh, hitung sepuluh-sepuluh, lalu bandingkan tebakan dengan hasil hitungan.

Dua kartu ingat menutup poster, berisi aturan inti sub-bab dan bisa didengarkan.

## 7. Tahap 4–6: sepuluh permainan Concrete, Picture, dan Abstract

| No | Tahap | Permainan | Jenis | Rujukan buku |
|---|---|---|---|---|
| 1 | Concrete | Ikat Sepuluh Pensil | select-and-bundle-tens | Buku Siswa hlm. 5–6 |
| 2 | Concrete | Hitung Tas di Loker | tap-count-in-order | Buku Siswa hlm. 3–4 dan 9 |
| 3 | Concrete | Susun Balok Jadi Puluhan | drag-to-ten-stacks | Buku Siswa hlm. 6 |
| 4 | Concrete | Tebak Isi Kantong Kelereng | estimate-then-count | Buku Siswa hlm. 11 dan 23–25 |
| 5 | Picture | Warnai Lima Bingkai | color-five-ten-frames | Buku Siswa hlm. 5–9 |
| 6 | Picture | Tarik Garis Berurutan | connect-numbered-dots | Buku Siswa hlm. 16 |
| 7 | Picture | Jalur Bilangan | complete-number-path | Buku Siswa hlm. 10 |
| 8 | Abstract | Jodohkan Lambang dan Nama | match-numeral-to-name | Buku Siswa hlm. 7–8 |
| 9 | Abstract | Detektif Bilangan Misterius | clue-detective | Buku Siswa hlm. 10 dan 15 |
| 10 | Abstract | Kanvas Guratan dan Suara | say-and-trace | Buku Siswa hlm. 11 |

Semua permainan memenuhi aturan berikut.

- **Tanpa skor dan tanpa waktu.** Jawaban salah dijawab dengan petunjuk pendek yang juga disuarakan, bukan hukuman.
- **Tiga ronde atau lebih.** Tombol "Soal berikutnya" muncul setelah ronde benar; tombol lanjut hanya muncul sesudah ronde terakhir.
- **Tiga jalur input.** Seret, ketuk lalu ketuk tujuan, dan papan ketik (Enter atau Spasi) untuk benda yang bisa diseret. Tiap elemen interaktif punya `aria-label`.
- **Satu permainan per layar** dengan penanda kemajuan di atasnya.
- **Jawaban suara akhir** memakai pengenalan ucapan perangkat dengan cadangan tombol "Pilih angka".
- **Pilihan jawaban hitungan memutar posisi kunci** menurut nilai kunci, supaya jawaban benar tidak selalu di tempat yang sama. Cadangan "Pilih angka" pada jawaban suara memakai tiga bilangan berurutan.

### Permainan 1. Ikat Sepuluh Pensil (Concrete)

- **Rujukan buku:** Buku Siswa hlm. 5–6 (mengelompokkan setiap 10 benda: ikat pensil, wadah telur, ikat lidi)
- **Tujuan:** Mengelompokkan benda sepuluh-sepuluh dan menghitung dengan puluhan ditambah sisa.
- **Cara main:** Tiga ronde (23, 32, dan 41 pensil). Siswa memilih tepat sepuluh pensil lalu mengikatnya, berkali-kali sampai sisa kurang dari sepuluh, lalu memilih banyak pensil seluruhnya. Terakhir ucapkan banyak pensil.
- **Suara Guru (pembuka):** Pilih sepuluh pensil, ikat, ulangi, lalu hitung semuanya.
- **Penutup:** Ronde terakhir ditutup dengan jawaban suara (Web Speech `id-ID`, pengenalan ucapan perangkat); bila mikrofon tidak tersedia, anak memakai tombol "Pilih angka".
- **Rincian ronde dan kunci permainan:**
  - Ronde 1: 23 pensil, 2 ikat penuh dan 3 lepas (10 + 10 + 3 = 23).
  - Ronde 2: 32 pensil, 3 ikat penuh dan 2 lepas (10 + 10 + 10 + 2 = 32).
  - Ronde 3: 41 pensil, 4 ikat penuh dan 1 lepas (10 + 10 + 10 + 10 + 1 = 41).

### Permainan 2. Hitung Tas di Loker (Concrete)

- **Rujukan buku:** Buku Siswa hlm. 3–4 dan 9 (Loker Baru di Kelas Malosi: 26 tas)
- **Tujuan:** Menghitung satu per satu dengan korespondensi satu-satu dan melihat kelompok sepuluh pada baris loker.
- **Cara main:** Tiga ronde (18, 26, dan 37 tas). Siswa mengetuk setiap tas satu kali sehingga bernomor, sepuluh pertama bertepi hijau, sepuluh berikutnya biru, lalu kuning. Terakhir ucapkan banyak tas.
- **Suara Guru (pembuka):** Ketuk setiap tas satu kali sambil menyebut bilangannya.
- **Penutup:** Ronde terakhir ditutup dengan jawaban suara (Web Speech `id-ID`, pengenalan ucapan perangkat); bila mikrofon tidak tersedia, anak memakai tombol "Pilih angka".
- **Rincian ronde dan kunci permainan:**
  - Ronde 1: 18 tas, 2 baris loker (10 + 8 = 18). Sepuluh pertama bertepi hijau, sepuluh kedua biru, sepuluh ketiga kuning.
  - Ronde 2: 26 tas, 3 baris loker (10 + 10 + 6 = 26). Sepuluh pertama bertepi hijau, sepuluh kedua biru, sepuluh ketiga kuning.
  - Ronde 3: 37 tas, 4 baris loker (10 + 10 + 10 + 7 = 37). Sepuluh pertama bertepi hijau, sepuluh kedua biru, sepuluh ketiga kuning.

### Permainan 3. Susun Balok Jadi Puluhan (Concrete)

- **Rujukan buku:** Buku Siswa hlm. 6 (satu susun berisi 10 balok; 10, 20, 30, 40, 50)
- **Tujuan:** Menyusun balok menjadi susun sepuluh, lalu menjumlah susun dan balok lepas.
- **Cara main:** Tiga ronde (14, 22, dan 31 balok). Siswa menyeret balok ke susun sampai penuh sepuluh, susun pertama dulu, lalu sisanya ke kotak sisa, kemudian memilih banyak balok seluruhnya. Terakhir ucapkan banyak balok.
- **Suara Guru (pembuka):** Seret balok ke susun sepuluh, sisanya ke kotak sisa.
- **Penutup:** Ronde terakhir ditutup dengan jawaban suara (Web Speech `id-ID`, pengenalan ucapan perangkat); bila mikrofon tidak tersedia, anak memakai tombol "Pilih angka".
- **Rincian ronde dan kunci permainan:**
  - Ronde 1: 14 balok, 1 susun penuh dan 4 balok sisa (10 + 4 = 14).
  - Ronde 2: 22 balok, 2 susun penuh dan 2 balok sisa (10 + 10 + 2 = 22).
  - Ronde 3: 31 balok, 3 susun penuh dan 1 balok sisa (10 + 10 + 10 + 1 = 31).

### Permainan 4. Tebak Isi Kantong Kelereng (Concrete)

- **Rujukan buku:** Buku Siswa hlm. 11 dan 23–25 (Ayo Mencoba: menebak lalu membuktikan); Ayo Berlatih nomor 1
- **Tujuan:** Memperkirakan banyak benda dengan patokan sepuluh lalu membuktikannya dengan menghitung.
- **Cara main:** Tiga ronde (18, 27, dan 35 kelereng). Siswa mengatur tebakan, menghitung kelereng satu per satu dengan warna tepi tiap sepuluh, lalu membandingkan tebakan dengan hitungan. Terakhir ucapkan banyak kelereng.
- **Suara Guru (pembuka):** Tebak dulu, lalu hitung untuk membuktikan.
- **Penutup:** Ronde terakhir ditutup dengan jawaban suara (Web Speech `id-ID`, pengenalan ucapan perangkat); bila mikrofon tidak tersedia, anak memakai tombol "Pilih angka".
- **Rincian ronde dan kunci permainan:**
  - Ronde 1: 18 kelereng (10 + 8 = 18). Tebakan awal 20, anak bebas mengubahnya antara 10 dan 50; umpan balik membandingkan selisih tebakan dan hitungan.
  - Ronde 2: 27 kelereng (10 + 10 + 7 = 27). Tebakan awal 20, anak bebas mengubahnya antara 10 dan 50; umpan balik membandingkan selisih tebakan dan hitungan.
  - Ronde 3: 35 kelereng (10 + 10 + 10 + 5 = 35). Tebakan awal 20, anak bebas mengubahnya antara 10 dan 50; umpan balik membandingkan selisih tebakan dan hitungan.

### Permainan 5. Warnai Lima Bingkai (Picture)

- **Rujukan buku:** Buku Siswa hlm. 5–9 (bingkai sepuluh dan kelompok sepuluh); hlm. 12–13 (Ayo Berlatih nomor 1 dan 2)
- **Tujuan:** Menyatakan bilangan dengan bingkai sepuluh: bingkai penuh dulu, lalu sisanya.
- **Cara main:** Tiga ronde (26, 38, dan 47 bulatan). Siswa mewarnai kotak pada lima bingkai sepuluh, bingkai pertama sampai penuh dulu, lalu menekan periksa. Terakhir ucapkan banyak bulatan.
- **Suara Guru (pembuka):** Warnai bulatan, isi bingkai penuh dulu.
- **Penutup:** Ronde terakhir ditutup dengan jawaban suara (Web Speech `id-ID`, pengenalan ucapan perangkat); bila mikrofon tidak tersedia, anak memakai tombol "Pilih angka".
- **Rincian ronde dan kunci permainan:**
  - Ronde 1: warnai 26 bulatan = 2 bingkai penuh + 6 bulatan di bingkai berikutnya.
  - Ronde 2: warnai 38 bulatan = 3 bingkai penuh + 8 bulatan di bingkai berikutnya.
  - Ronde 3: warnai 47 bulatan = 4 bingkai penuh + 7 bulatan di bingkai berikutnya.

### Permainan 6. Tarik Garis Berurutan (Picture)

- **Rujukan buku:** Buku Siswa hlm. 16 (Ayo Berlatih nomor 6: tarik garis dari bilangan 20–35 secara berurutan)
- **Tujuan:** Mengurutkan bilangan dengan menghubungkan titik bernomor secara berurutan.
- **Cara main:** Tiga ronde (20 sampai 35, 31 sampai 42, dan 38 sampai 50). Siswa mengetuk bilangan terkecil dulu lalu bilangan berikutnya sehingga garis tersambung. Titik tersebar, jadi harus dicari.
- **Suara Guru (pembuka):** Ketuk bilangan berikutnya, satu demi satu.
- **Penutup:** Tidak ada jawaban suara akhir; permainan selesai setelah semua ronde benar.
- **Rincian ronde dan kunci permainan:**
  - Ronde 1: 20 sampai 35 (16 titik). Letak titik tetap dan tersebar, tidak berpotongan.
  - Ronde 2: 31 sampai 42 (12 titik). Letak titik tetap dan tersebar, tidak berpotongan.
  - Ronde 3: 38 sampai 50 (13 titik). Letak titik tetap dan tersebar, tidak berpotongan.

### Permainan 7. Jalur Bilangan (Picture)

- **Rujukan buku:** Buku Siswa hlm. 10 (menghitung maju 20–30 dan mundur 30–20); hlm. 15 (Ayo Berlatih nomor 5)
- **Tujuan:** Melengkapi bilangan yang hilang pada jalur menghitung maju dan mundur.
- **Cara main:** Tiga ronde (maju 20 sampai 30, mundur 30 sampai 20, maju 41 sampai 50). Siswa mengetuk kotak kosong lalu memilih bilangan yang tepat.
- **Suara Guru (pembuka):** Ketuk kotak kosong, lalu pilih bilangannya.
- **Penutup:** Tidak ada jawaban suara akhir; permainan selesai setelah semua ronde benar.
- **Rincian ronde dan kunci permainan:**
  - Ronde 1: hitung maju 20 ke 30; kotak kosong untuk 22, 25, 28.
  - Ronde 2: hitung mundur 30 ke 20; kotak kosong untuk 29, 26, 23, 21.
  - Ronde 3: hitung maju 41 ke 50; kotak kosong untuk 43, 47, 49.

### Permainan 8. Jodohkan Lambang dan Nama (Abstract)

- **Rujukan buku:** Buku Siswa hlm. 7–8 (Tabel 1.1: lambang dan cara membaca bilangan 21–30); hlm. 14 (Ayo Berlatih nomor 3)
- **Tujuan:** Menjodohkan lambang bilangan dengan cara membacanya.
- **Cara main:** Tiga ronde, masing-masing empat pasang (21, 25, 29, 30; 31, 36, 40, 44; 27, 38, 45, 50). Siswa mengetuk lambang lalu namanya.
- **Suara Guru (pembuka):** Ketuk lambang, lalu nama yang cocok.
- **Penutup:** Tidak ada jawaban suara akhir; permainan selesai setelah semua ronde benar.
- **Rincian ronde dan kunci permainan:**
  - Ronde 1: 21 = dua puluh satu; 25 = dua puluh lima; 29 = dua puluh sembilan; 30 = tiga puluh. Urutan nama diacak tetap.
  - Ronde 2: 31 = tiga puluh satu; 36 = tiga puluh enam; 40 = empat puluh; 44 = empat puluh empat. Urutan nama diacak tetap.
  - Ronde 3: 27 = dua puluh tujuh; 38 = tiga puluh delapan; 45 = empat puluh lima; 50 = lima puluh. Urutan nama diacak tetap.

### Permainan 9. Detektif Bilangan Misterius (Abstract)

- **Rujukan buku:** Buku Siswa hlm. 10 dan 15 (urutan bilangan; sebelum dan sesudah); hlm. 7–8 (puluhan ditambah satuan)
- **Tujuan:** Menemukan bilangan dari petunjuk: setelah, sebelum, di antara, puluhan ditambah satuan, dan nama bilangan.
- **Cara main:** Empat ronde, tiap ronde dua petunjuk. Siswa memilih bilangan yang cocok dengan semua petunjuk. Terakhir ucapkan bilangan itu.
- **Suara Guru (pembuka):** Baca petunjuk, lalu pilih bilangannya.
- **Penutup:** Ronde terakhir ditutup dengan jawaban suara (Web Speech `id-ID`, pengenalan ucapan perangkat); bila mikrofon tidak tersedia, anak memakai tombol "Pilih angka".
- **Rincian ronde dan kunci permainan:**
  - Ronde 1: Aku datang tepat setelah 24. Aku lebih kecil dari 26. Pilihan 24, 25, 26; jawaban 25. Pembahasan salah: Hitung maju satu dari dua puluh empat. Bilangan itu juga lebih kecil dari dua puluh enam.
  - Ronde 2: Aku sama dengan 20 + 8. Namaku dua puluh delapan. Pilihan 18, 28, 82; jawaban 28. Pembahasan salah: Dua puluh ditambah delapan. Dua puluh itu dua puluhan, jadi angka puluhannya 2 dan angka satuannya 8.
  - Ronde 3: Aku berada di antara 38 dan 40. Aku sama dengan 30 + 9. Pilihan 37, 39, 41; jawaban 39. Pembahasan salah: Di antara tiga puluh delapan dan empat puluh hanya ada satu bilangan. Itu juga tiga puluh ditambah sembilan.
  - Ronde 4: Namaku empat puluh tujuh. Tulislah lambangku: puluhan dulu, lalu satuan. Pilihan 37, 47, 74; jawaban 47. Pembahasan salah: Empat puluh tujuh ditulis 4 untuk empat puluhan, lalu 7 untuk tujuh satuan. Hati-hati, 74 dibaca tujuh puluh empat.

### Permainan 10. Kanvas Guratan dan Suara (Abstract)

- **Rujukan buku:** Buku Siswa hlm. 11 (Ayo Mencoba: 24 dibaca dua puluh empat); hlm. 14 (menulis lambang dan cara membaca)
- **Tujuan:** Membaca nama bilangan, mengucapkannya, dan menulis lambangnya.
- **Cara main:** Dua ronde. Ronde 1 dua puluh enam. Ronde 2 siswa memilih satu dari tiga bilangan (31, 38, 45). Siswa mengucapkan namanya lalu menggurat lambangnya.
- **Suara Guru (pembuka):** Ucapkan bilangannya, lalu guratkan lambangnya.
- **Penutup:** Jawaban suara dipakai di setiap ronde (pengenal ucapan perangkat dengan cadangan tombol "Pilih angka"). Tombol lanjut muncul setelah ronde 2 diucapkan. Goresan angka di kanvas tidak dinilai mesin.
- **Rincian ronde dan kunci permainan:**
  - Ronde 1: bilangan tetap 26 (dua puluh enam).
  - Ronde 2 (Ayo Mencoba): anak memilih satu dari 31 (tiga puluh satu), 38 (tiga puluh delapan), 45 (empat puluh lima).
  - Tiap ronde: ucapkan nama bilangan (atau pilih angka), lalu guratkan angkanya di kanvas bertitik.

## 8. Poin Penting dan Catatanku

Halaman Poin Penting menutup tahap Abstract: kartu rangkuman yang bisa didengarkan, kartu "Cara menyebutkan", kegiatan di rumah (*Ayo Mencoba di rumah*), dan "Catatanku" berisi pernyataan refleksi yang dicentang anak sendiri. Setelah itu anak menekan tombol penutup sub-bab.

## 9. Metode pengayaan dari sumber luar

Naskah tidak berhenti pada isi buku. Metode berikut dipakai karena sudah teruji di kelas awal dan cocok untuk bilangan sampai 50.

| Metode | Asal | Dipakai di | Alasan |
|---|---|---|---|
| Bingkai sepuluh (*ten frame*) dan kelompok sepuluh | Matematika Singapura (CPA, Bruner) | Cerita 4, Peta 2, Permainan 1, 3, 5 | Anak melihat sepuluh sekaligus tanpa menghitung satu-satu (*subitizing*), lalu menyambung dengan sisanya. |
| Hitung meloncat (*skip counting*) | Pedoman berhitung Van de Walle dan Kemendikbud | Cerita 5, Peta 3, Permainan 1, 3; Sub-Bab B Permainan 4 | Sepuluh, dua puluh, tiga puluh menjadi jembatan menuju nama puluhan dan perkalian kelak. |
| Perkiraan dengan patokan (*benchmark estimation*) | Van de Walle, *Elementary and Middle School Mathematics* | Permainan 4, Infografis 9, Peta 6 | Tebakan dengan patokan sepuluh melatih perasaan bilangan (*number sense*) sebelum menghitung tepat. |
| Papan seratus (*hundred chart*) | Tradisi kelas awal di banyak negara | Infografis 8 | Turun satu baris berarti lebih sepuluh; geser satu kotak berarti lebih satu. Pola namanya terlihat pada kolom. |
| Garis dan jalur bilangan | Bruner (representasi ikonik) | Cerita 6, Infografis 7, Permainan 6, 7 | Maju dan mundur menjadi gerakan nyata, bukan hafalan urutan. Menarik garis antar titik bernomor melatih urutan tanpa menghafal. |
| Detektif bilangan (petunjuk bertingkat) | Pembelajaran berbasis masalah | Permainan 9 | Anak memakai *setelah*, *sebelum*, *di antara*, dan puluhan + satuan sebagai alasan, bukan menebak. |
| Menulis dengan kanvas bertitik | Montessori (jejak taktil) dan pedoman menulis angka | Permainan 10 | Menggurat lambang sambil mengucap nama bilangan menyatukan suara, gerak, dan lambang. |

Prinsip variasi Dienes (*perceptual variability*) dipenuhi dengan mengganti benda penghitung antar permainan (pensil, tas, balok, kelereng) sambil mempertahankan struktur sepuluh yang sama.


## 10. Bank soal Latihan dan Ujian (ringkasan tanpa kunci)

- Latihan: 10 soal terbimbing (3 LOTS, 3 MOTS, 4 HOTS) untuk seluruh bab: 3 soal Sub-Bab A, 3 soal Sub-Bab B, dan 4 soal Sub-Bab C; pembahasan dikembalikan server setelah jawaban masuk.
- Ujian: tiga paket, masing-masing 10 soal (3 dari Sub-Bab A, 3 dari Sub-Bab B, 4 dari Sub-Bab C), dengan angka dan urutan pilihan berbeda; satu lembar dikirim utuh dan hanya nilai akhir yang kembali.
- Berkas JSON di perangkat tidak memuat `correct_index`, `explanation`, maupun soal Ujian. Kunci tersimpan di `private.practice_keys` dan `private.exam_keys` pada Supabase (berkas seed lokal `supabase/seed/02_kelas2_bab1_keys.sql`, tidak di-commit).

## 11. Aturan teknis ringkas

- Data-driven: `IgilModulePlayer` membaca `kelas2-bab1.json` dan memilih komponen tahap dari registri `MODUL_SUBBAB` dengan kunci `mtk-2-bab1-A`.
- Suara hanya Web Speech API perangkat (opsi `perangkatSaja`): tidak ada permintaan `/audio-guru/*.mp3` dan tidak ada `/api/tts`.
- Poin Kualifikasi tidak muncul di tahap Materi. Poin hanya terbit lewat RPC server pada Latihan dan Ujian.
- Sub-Bab C (Membandingkan, hlm. 23–30) sudah tersedia dengan naskah sendiri (`naskah/mtk-2-bab1-sub-c-membandingkan-bilangan.md`). Latihan terbuka setelah Sub-Bab A, B, dan C selesai.
