# Naskah Matematika Kelas 1 · Bab 2 · Sub-Bab A: Cerita Penjumlahan (Beserta Rangka Utuh Bab 2)

Sumber rujukan resmi:
- **Buku Siswa Matematika untuk SD/MI Kelas I** (Penulis: Dara Retno Wulan & Rasfaniwaty, Kemendikbudristek 2022), **Bab 2: Penjumlahan sampai dengan 10**, halaman 41–74 (khusus **Sub-Bab A: Cerita Penjumlahan** pada **halaman 43–50**).
- **Buku Panduan Guru Matematika untuk SD/MI Kelas I** (Kemendikbudristek 2022), Bab 2 Sub-Bab A, **halaman 53–60**.

Seluruh naskah ini berjalan **100% di sisi klien** (*Zero Runtime LLM Calls* / biaya API = Rp 0), memakai **Suara Guru** dari `Web Speech API` (`id-ID`), menggunakan tema **Biru Ungu Royal (`#1C01A5`)**, **Kuning Emas (`#F0AB00`)**, dan **Putih Bersih (`#FFFFFF`)**, serta mematuhi pemisahan kunci jawaban ke server (`src/content-master/kelas1-bab2.master.json` → `src/data/kelas1-bab2.json` + `supabase/seed/03_kelas1_bab2_keys.sql`).

---

## 1. Struktur Dinamis Bab 2 Berdasarkan Buku Siswa (`Matematika-BS-KLS-I.pdf`)

Di Buku Siswa Kelas 1 (hlm. 42), Bab 2 terbagi menjadi **3 Sub-Bab Resmi**:
1. **Sub-Bab A: Cerita Penjumlahan (Hlm. 43–50 — Fokus Utama Naskah Ini):**
   - Makna penjumlahan melalui **bertambah / datang lagi** (*"Ada 4 anak bermain lompat tali. Datang lagi 2 anak. Sekarang ada 6 anak"*, hlm. 43–44).
   - Makna penjumlahan melalui **menggabungkan bersama** dua kelompok benda (*"Ada 3 pensil merah. Ada 4 pensil biru. Semuanya ada 7 pensil"*, hlm. 45).
   - Pengenalan simbol **`+` (ditambah)** dan **`=` (hasilnya adalah)**: `4 + 2 = 6` dibaca *"empat ditambah dua hasilnya adalah enam"* (hlm. 44).
   - Latihan melengkapi kalimat cerita penjumlahan, menulis operasi penjumlahan dari gambar, dan membuat cerita penjumlahan dari kalimat matematika (`5 + 2 = 7`, `3 + 3 = 6`, `5 + 3 = 8`, hlm. 46–50).
2. **Sub-Bab B: Berbagai Cara Melakukan Penjumlahan (Hlm. 51–64):**
   - Strategi 1: **Pasangan Bilangan (*Number Bond*)** & sifat pertukaran (`3 + 2 = 5` dan `2 + 3 = 5`, `4 + 1 = 5` dan `1 + 4 = 5`, hlm. 51–55).
   - Strategi 2: **Menghitung Maju (*Counting On*)** pada petak/garis bilangan `1–10` (`5 + 3 = 8`, `1 + 2 = 3`, serta tabel tambah `1, 2, 3`, hlm. 55–58).
   - Strategi 3: **Penjumlahan Berulang / Ganda (*Doubles*)** (`1+1=2`, `2+2=4`, `3+3=6`, `4+4=8`, `5+5=10`, termasuk sayap kepik `0+0=0`, hlm. 59–60).
   - Strategi 4: **Penjumlahan yang Hasilnya 10 (*Make-10*)** dengan jari tangan dan Bingkai 10 dua warna (`9+1=10`, `8+2=10`, `7+3=10`, `6+4=10`, `5+5=10`, hlm. 61–64).
3. **Sub-Bab C: Soal Cerita Penjumlahan (Hlm. 65–73):**
   - Menyelesaikan soal cerita satu langkah (`4 burung + 2 burung = 6 burung`, `3 pensil + 4 pensil = 7 pensil`, `5 siswa + 3 siswa = 8 siswa`, hlm. 65–68).
   - Soal HOTS multi-atribut kendaraan & roda (`3 sepeda + 1 becak = 4 kendaraan`, rodanya `6 + 3 = 9 roda`; `3 motor + 2 mobil = 5 kendaraan`, rodanya `6 + 8` di pengayaan / `2 + 4 = 6 roda` untuk 1 motor + 1 mobil, hlm. 69 & 72).

---

## 2. Bedah Mendalam Sub-Bab A: Cerita Penjumlahan (SMICPA Dinamis)

### A. Tahap 1 · `[S]` Story (5 Adegan Kontekstual dari Buku Siswa Hlm. 43–50)
Tokoh tetap: **Kira, Upe, Malosi, Tora, dan Igil (burung hantu)**.

1. **`A-S1` · Bermain Lompat Tali di Taman (Buku Hlm. 43 — Konsep "Datang Lagi / Bertambah"):**
   - **Visual:** Empat sekawan (Kira, Upe, Malosi, dan Tora) sedang bermain lompat tali karet di halaman. Dari arah kanan, datang lagi 2 teman untuk ikut bermain bersama, sementara Igil mengamati dari dahan pohon.
   - **Narasi Suara Guru:**
     > "Mula-mula ada empat anak bermain lompat tali di taman. Lalu datang lagi dua anak untuk ikut bermain bersama. Sekarang ada enam anak yang bermain lompat tali dengan gembira. Saat ada teman yang datang lagi, jumlah anak menjadi bertambah banyak."
2. **`A-S2` · Mengenal Simbol Tambah (`+`) dan Sama Dengan (`=`) (Buku Hlm. 44):**
   - **Visual:** Igil menunjukkan papan kartu besar bertuliskan `4`, `+`, `2`, `=`, `6` di atas gambar 4 anak dan 2 anak yang bergabung.
   - **Narasi Suara Guru:**
     > "Igil memperkenalkan tanda tambah dan tanda sama dengan. Menjumlahkan artinya menggabungkan bersama. Empat anak ditambah dua anak ditulis empat tambah dua sama dengan enam, dan dibaca empat ditambah dua hasilnya adalah enam."
3. **`A-S3` · Menggabungkan Pensil Merah dan Biru (Buku Hlm. 45 — Konsep "Digabungkan Bersama"):**
   - **Visual:** Kira memegang 3 pensil merah di tangan kiri dan Upe memegang 4 pensil biru di tangan kanan. Keduanya memasukkan pensil tersebut ke dalam satu kotak tempat pensil hingga terkumpul 7 pensil.
   - **Narasi Suara Guru:**
     > "Kira membawa tiga pensil merah dan Upe membawa empat pensil biru. Mereka menggabungkan semua pensil itu ke dalam satu tempat pensil. Semuanya ada tujuh pensil. Tiga ditambah empat hasilnya adalah tujuh."
4. **`A-S4` · Mobil Mainan dan Kue Tradisional di Meja (Buku Hlm. 46 *Ayo Berlatih* No. 1a & 1b):**
   - **Visual:** Di meja kiri ada 4 mobil kuning dan 4 mobil merah milik Malosi (total 8 mobil). Di meja kanan ada 6 kue lapis dan 2 kue bolu kukus milik Tora (total 8 kue).
   - **Narasi Suara Guru:**
     > "Malosi menata empat mobil kuning dan empat mobil merah di atas meja, sehingga semuanya ada delapan mobil. Di sebelahnya, Tora menghidangkan enam kue lapis dan dua kue bolu kukus, sehingga semuanya ada delapan kue."
5. **`A-S5` · Membuat Cerita dari Kalimat Penjumlahan (Buku Hlm. 49–50 *Ayo Berlatih* No. 5 & *Ayo Bermain*):**
   - **Visual:** Kira, Upe, Malosi, dan Tora duduk melingkar dengan dua piring rotan berisi 5 kelereng hijau dan 3 kelereng kuning serta papan bertuliskan `5 + 3 = 8`.
   - **Narasi Suara Guru:**
     > "Kita juga bisa membuat cerita dari angka penjumlahan. Piring kiri berisi lima kelereng dan piring kanan berisi tiga kelereng. Lima ditambah tiga hasilnya adalah delapan. Ayo kita berkreasi membuat cerita penjumlahan sendiri."

---

### B. Tahap 2 · `[M]` Mind-Mapping (4 Langkah Peta Pikiran Cerita Penjumlahan)
1. **`1. Amati Kelompok Pertama (Mula-mula)` (`👀`):** Hitung berapa banyak benda atau anak yang ada pada kelompok pertama.
2. **`2. Lihat yang Datang atau Digabungkan (+)` (`➕`):** Kata *"datang lagi"*, *"bertambah"*, *"membeli lagi"*, atau *"digabungkan"* berarti kita memakai tanda **`+` (ditambah)**.
3. **`3. Hitung Semuanya Bersama (=)` (`🧮`):** Satukan kedua kelompok benda lalu hitung jumlah keseluruhannya setelah tanda **`=` (hasilnya adalah)**.
4. **`4. Tulis dan Bacakan Kalimat Penjumlahan` (`🗣️`):** Tulis `4 + 2 = 6` dan bacakan dengan lantang: *"Empat ditambah dua hasilnya adalah enam."*

---

### C. Tahap 3 · `[I]` Infografis (4 Panel Rangkuman Visual Buku Hlm. 43–49)
1. **Panel 1 — Bermain Lompat Tali (`4 + 2 = 6`):** Mula-mula 4 anak, datang lagi 2 anak, semuanya 6 anak.
2. **Panel 2 — Pensil Merah & Biru (`3 + 4 = 7`):** 3 pensil merah digabungkan dengan 4 pensil biru menjadi 7 pensil.
3. **Panel 3 — Mobil Kuning & Merah (`4 + 4 = 8`):** 4 mobil kuning dan 4 mobil merah semuanya ada 8 mobil.
4. **Panel 4 — Kue Lapis & Bolu Kukus (`6 + 2 = 8`):** 6 kue lapis dan 2 kue bolu kukus semuanya ada 8 kue.

---

## 3. Sepuluh (10) Permainan Interaktif Berbeda Jenis untuk Sub-Bab A (Terintegrasi di Tahap Concrete, Pictorial, dan Abstract)

Sesuai permintaan Kapten, berikut **10 permainan interaktif yang berbeda mekanisme/jenisnya** dan dirancang khusus untuk topik **Sub-Bab A: Cerita Penjumlahan (Buku Hlm. 43–50)**, dibagi secara proporsional ke dalam tahap **Concrete (4 permainan)**, **Pictorial (3 permainan)**, dan **Abstract (3 permainan)**:

| No | Tahap | Nama & Jenis Permainan Interaktif | Rujukan Buku Siswa | Mekanisme Interaksi (Apa yang Disentuh, Apa yang Berubah, Kapan Benar) | Kunci & Contoh Angka |
|---|---|---|---|---|---|
| **1** | **Concrete 1** | **Permainan 1: Panggung Lompat Tali "Datang Lagi" (*Tap-to-Join Action Scene*)** | Hlm. 43–44 (*Bermain Lompat Tali*) | **Disentuh:** Tombol `🏃 Panggil 2 Teman Datang` lalu ketuk satu per satu anak di halaman.<br>**Berubah:** 2 anak berlari masuk bergabung dengan 4 anak yang sedang bermain lompat tali; lencana angka di atas kepala menyala `1..6`.<br>**Benar:** Saat 6 anak sudah berkumpul dan siswa memilih/mengucapkan jumlah akhir **`6`**. | `4` anak + datang `2` anak = **`6`** anak |
| **2** | **Concrete 2** | **Permainan 2: Kotak Pensil Gabungan Kira & Upe (*Two-Tray Drag-to-Merge*)** | Hlm. 45 (*Pensil Merah & Biru*) | **Disentuh:** 3 pensil merah di nampan kiri dan 4 pensil biru di nampan kanan.<br>**Berubah:** Siswa menyeret/mengetuk pensil dari kedua nampan masuk ke satu kotak pensil besar di tengah; kalimat di bawahnya terisi bertahap `3` → `+ 4` → `= 7`.<br>**Benar:** Saat semua 7 pensil masuk ke kotak tengah dan siswa mengucapkan/memilih **`7`**. | `3` pensil merah + `4` pensil biru = **`7`** pensil |
| **3** | **Concrete 3** | **Permainan 3: Garasi Mobil & Nampan Kue (*Dual-Attribute Story Builder*)** | Hlm. 46 (*Ayo Berlatih* No. 1a & 1b) | **Disentuh:** Tiga kotak kosong pada kalimat cerita: `"Ada [ ? ] mobil kuning. Ada [ ? ] mobil merah. Semuanya ada [ ? ] mobil."`<br>**Berubah:** Siswa mengetuk kelompok mobil kuning (`4`), mobil merah (`4`), lalu menghitung gabungannya (`8`). Putaran kedua untuk `6` kue lapis dan `2` bolu kukus.<br>**Benar:** Saat ketiga kotak terisi **`4`**, **`4`**, **`8`** (Putaran 1) dan **`6`**, **`2`**, **`8`** (Putaran 2). | P1: `4 + 4 = 8`<br>P2: `6 + 2 = 8` |
| **4** | **Concrete 4** | **Permainan 4: Tebak Isi Stoples Rahasia (*Two-Player Mystery Jar Game*)** | Hlm. 50 (*Ayo Bermain: Dua Wadah & Benda Kecil*) | **Disentuh:** Kartu angka acak milik Kira (`5` kelereng masuk ke wadah pertama) dan milik Malosi (`3` kelereng masuk ke wadah kedua), lalu kedua wadah ditutup kain.<br>**Berubah:** Siswa menebak jumlah keseluruhannya lebih dulu dengan memilih tombol angka, lalu kain dibuka untuk membuktikan hitungan satu per satu.<br>**Benar:** Saat tebakan siswa tepat **`8`** dan tervalidasi saat wadah dibuka. | `5` kelereng + `3` kelereng = **`8`** kelereng |
| **5** | **Pictorial 1** | **Permainan 5: Bingkai 10 Dua Warna (*Two-Color Ten-Frame Painter*)** | Hlm. 47 (*Ayo Berlatih* No. 2a & 2b — Bola & Apel) | **Disentuh:** Petak kosong pada Bingkai 10. Putaran 1: `3` bola basket sudah ada di petak kuning, ketuk `5` petak biru untuk bola sepak. Putaran 2: `4` apel merah + `5` apel hijau.<br>**Berubah:** Petak yang diketuk terisi bulatan warna kedua hingga menggambarkan gabungan pada Bingkai 10.<br>**Benar:** Saat Bingkai 10 menampilkan `3 + 5 = 8` (P1) dan `4 + 5 = 9` (P2). | P1: `3 + 5 = 8`<br>P2: `4 + 5 = 9` |
| **6** | **Pictorial 2** | **Permainan 6: Jembatan Pasangan ke Kalimat Tambah (*Number-Bond to Addition Bridge*)** | Hlm. 47–48 & 51 (*Sebagian + Sebagian = Gabungan*) | **Disentuh:** Diagram *Number Bond* dengan cabang Sebagian `4` dan Sebagian `3` yang terhubung ke kotak persamaan `[ ? ] + [ ? ] = [ ? ]`.<br>**Berubah:** Mengetuk lingkaran cabang kiri memindahkan angka `4` ke suku pertama, cabang kanan memindahkan `3` ke suku kedua, dan lingkaran Gabungan memunculkan `7`.<br>**Benar:** Saat diagram dan kalimat `4 + 3 = 7` serta `5 + 4 = 9` tersambung lengkap. | P1: `4 + 3 = 7`<br>P2: `5 + 4 = 9` |
| **7** | **Pictorial 3** | **Permainan 7: Sutradara Cerita Gambar (*Picture-to-Story Matchmaker*)** | Hlm. 49 (*Ayo Berlatih* No. 5a, 5b, 5c) | **Disentuh:** Tiga kartu adegan bergambar: (a) 5 anak di taman datang 2 anak, (b) 3 anak kiri dan 3 anak kanan memegang balon, (c) 5 burung di dahan datang 3 burung.<br>**Berubah:** Siswa memasangkan tiap kartu gambar ke pita kalimat matematika yang cocok (`5 + 2 = 7`, `3 + 3 = 6`, `5 + 3 = 8`).<br>**Benar:** Saat ketiga gambar terhubung ke persamaan yang tepat dan Suara Guru membacakan ceritanya. | `5+2=7`, `3+3=6`, `5+3=8` |
| **8** | **Abstract 1** | **Permainan 8: Bengkel Simbol `+` dan `=` (*Symbol & Equation Assembler*)** | Hlm. 44 & 48 (*Menulis Operasi Penjumlahan*) | **Disentuh:** Lima slot kartu berderet `[ 4 ] [ ? ] [ 2 ] [ ? ] [ 6 ]` dan keping kartu `+`, `=`, `>`, `<`.<br>**Berubah:** Siswa menyeret/mengetuk tanda `+` ke slot kedua dan tanda `=` ke slot keempat.<br>**Benar:** Saat kalimat matematika `4 + 2 = 6` dan `6 + 3 = 9` terbentuk dengan simbol yang tepat. | `4 + 2 = 6` dan `6 + 3 = 9` |
| **9** | **Abstract 2** | **Permainan 9: Detektif Angka yang Hilang (*Missing Addend & Sum Detective*)** | Hlm. 47–48 (*Ayo Berlatih* No. 3 & 4) | **Disentuh:** Persamaan dengan satu kotak kosong: Putaran 1 `5 + 2 = [ ? ]`, Putaran 2 `3 + [ ? ] = 7`, Putaran 3 `[ ? ] + 4 = 9`.<br>**Berubah:** Siswa memilih angka yang tepat dari 3 tombol pilihan lalu mengucapkan kalimat lengkapnya lewat mikrofon/tombol suara.<br>**Benar:** Saat siswa memilih **`7`**, **`4`**, dan **`5`**. | `5+2=7`, `3+[4]=7`, `[5]+4=9` |
| **10** | **Abstract 3** | **Permainan 10: Kanvas Guratan & Suara Kalimat Tambah (*Voice & Trace Finale*)** | Hlm. 44–45 (*Membaca & Menulis Operasi Penjumlahan*) | **Disentuh:** Kartu persamaan `5 + 3 = [ ? ]` beserta kanvas titik-titik `DottedNumberTracingCanvas` dan tombol rekam suara.<br>**Berubah:** Siswa menebalkan angka **`8`** dan kata **`Delapan`** di kanvas, lalu menekan tombol suara untuk mengucapkan *"delapan"*.<br>**Benar:** Saat guratan kanvas tervalidasi mirip dan ucapan suara diterima. | `5 + 3 = 8` (`8 Delapan`) |

---

## 4. Ringkasan Sub-Bab B, C, dan D pada JSON Bab 2 (Agar Seluruh Bab 2 Utuh)

Agar struktur 4 sub-bab (`A, B, C, D`) pada komponen pemutar modul tetap seragam dan mencakup seluruh isi Bab 2 Buku Siswa (hlm. 41–74):
- **Sub-Bab A (`Cerita Penjumlahan`, Hlm. 43–50):** Fokus pada arti penjumlahan (*datang lagi / bertambah* dan *digabungkan bersama*), simbol `+` dan `=`, serta membuat cerita penjumlahan.
- **Sub-Bab B (`Pasangan Bilangan & Hitung Maju`, Hlm. 51–58):** Menggunakan *Number Bond* (`Sebagian + Sebagian = Gabungan`, termasuk sifat pertukaran `3 + 2 = 5` dan `2 + 3 = 5`) serta strategi **Menghitung Maju** di garis/petak bilangan `1–10`.
- **Sub-Bab C (`Penjumlahan Berulang & Hasil 10`, Hlm. 59–64):** Menguasai **Penjumlahan Berulang / Ganda** (`1+1=2`, `2+2=4`, `3+3=6`, `4+4=8`, `5+5=10`, serta `0+0=0` pada sayap kepik) dan **Pasangan Penjumlahan yang Hasilnya 10** pada Bingkai 10 (`9+1`, `8+2`, `7+3`, `6+4`, `5+5`).
- **Sub-Bab D (`Soal Cerita Penjumlahan`, Hlm. 65–73):** Menyelesaikan soal cerita kontekstual satu langkah dan soal HOTS kendaraan & jumlah roda (sepeda roda 2, becak roda 3, mobil roda 4).
