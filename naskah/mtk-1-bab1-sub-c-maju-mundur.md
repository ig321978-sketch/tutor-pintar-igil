# Naskah Matematika Kelas 1 · Bab 1 · Sub-Bab C: Menghitung Maju dan Mundur

Sumber rujukan utama:
- **Buku Siswa Matematika untuk SD/MI Kelas I** (Penulis: Dara Retno Wulan & Rasfaniwaty, Kemendikbudristek 2022), Bab 1 Sub-Bab C, **halaman 25–28** (serta Evaluasi halaman 36).
- **Buku Panduan Guru Matematika untuk SD/MI Kelas I** (Kemendikbudristek 2022), Bab 1 Sub-Bab C, **halaman 35–38**.

Seluruh naskah ini 100% berjalan di sisi klien (*Zero Runtime LLM Calls* / biaya API = Rp 0), menggunakan **Suara Guru** berbasis `Web Speech API` (`id-ID`), mengikuti struktur **4 Tab Modul Bab IGIL** (`Silabus`, `Materi + Simulasi Interaktif`, `Latihan`, `Ujian` — sedangkan Praktikum tampil di akun siswa setelah 4 bab lulus Ujian), dan menerapkan metode **SMICPA**.

---

## Catatan Arsitektur & Pedagogi (Untuk Penyelarasan UI & Data)

1. **Cakupan Resmi Buku Siswa & Buku Guru:**
   - **Menghitung Maju (Buku Siswa hlm. 25, Buku Guru hlm. 35–36):**
     - Diperkenalkan melalui ilustrasi **Upe menaiki anak tangga** dari 1 sampai 10 (kiri ke kanan) dengan tinggi tumpukan balok yang naik satu petak setiap langkah.
     - Dua aturan inti di buku: **(a) mulai dari bilangan kecil ke besar**, dan **(b) langkahnya sama** (setiap langkah bertambah 1).
     - Urutan maju penuh: `1, 2, 3, 4, 5, 6, 7, 8, 9, 10`.
   - **Menghitung Mundur (Buku Siswa hlm. 26, Buku Guru hlm. 36):**
     - Diperkenalkan melalui ilustrasi **Upe menuruni anak tangga** mulai dari 10 sampai 1 dengan tinggi tumpukan balok yang turun satu petak setiap langkah.
     - Dua aturan inti di buku: **(a) mulai dari bilangan besar ke kecil**, dan **(b) langkahnya sama** (setiap langkah berkurang 1).
     - Urutan mundur penuh: `10, 9, 8, 7, 6, 5, 4, 3, 2, 1`.
   - **Berhitung Berantai dari Bilangan Mana Saja (Buku Siswa hlm. 27 — *Ayo Bermain* & *Ayo Berlatih* No. 1):**
     - Enam anak berbaris. Anak paling ujung menyebutkan satu bilangan, lalu anak di sampingnya melanjutkan secara berantai (maju atau mundur).
     - Siswa tidak hanya menghafal dari `1` atau dari `10`, tetapi mampu melanjutkan urutan dari tengah (misalnya `4, 5, 6, 7, 8` atau `8, 7, 6, 5, 4`) serta menemukan bilangan yang hilang di tengah urutan (`1, 2, [3], 4, 5` dan `6, [7], 8`).
   - **Menghubungkan Titik Bilangan 1 sampai 10 Secara Berurutan (Buku Siswa hlm. 28 No. 4):**
     - Siswa menghubungkan titik bernomor `1` sampai `10` secara berurutan untuk menemukan bentuk gambar tersembunyi. Kegiatan ini diangkat ke dalam **Simulasi Interaktif** dan **Tahap 5 (Pictorial P4)**.

2. **Batasan Simbol Matematika Kelas 1 Bab 1:**
   - Pada Bab 1, siswa **belum** mempelajari simbol operasi hitung formal `+` (tambah) dan `-` (kurang) — materi tersebut baru diajarkan di Bab 2 dan Bab 3.
   - Oleh sebab itu, di layar dan di Suara Guru **dilarang** menampilkan persamaan seperti `4 + 1 = 5` atau `10 - 1 = 9`.
   - Gunakan tanda panah urutan (`→`) dan istilah resmi buku: **"maju satu langkah"**, **"mundur satu langkah"**, **"bertambah satu"**, **"berkurang satu"**, **"sebelum"**, **"sesudah"**, dan **"di antara"**.

3. **Identitas 3 Warna Dominan Wajib (`.cursorrules`):**
   - **Biru Ungu Royal** (`indigo-900` / `violet-900` / `indigo-950` / `#1C01A5`) untuk kerangka utama, header kartu, kanvas interaktif, dan teks utama.
   - **Kuning Emas** (`amber-400` / `amber-300` / `#F0AB00` / `#FFE566`) untuk tombol aksi utama (CTA), lencana langkah aktif, sorotan bilangan kunci, dan panah lompatan.
   - **Putih Bersih** (`white` / `indigo-50/40`) untuk latar ruang baca dan kartu materi agar nyaman bagi mata anak SD.

4. **Empat Dunia Visual Tahap 3–6 (Konsisten dengan Sub-Bab B):**

| Aspek | Infografis `[I]` | Concrete + Simulasi `[C]` | Pictorial `[P]` | Abstract `[A]` |
|---|---|---|---|---|
| **Dunia Visual** | Poster rangkuman berpanel nomor | Meja kayu beralas kain & laboratorium tangga/batu | Buku gambar bergaris dengan spiral di atas | Buku tulis kotak-kotak matematika |
| **Isi Utama** | Tangga naik, tangga turun, barisan berantai (tanpa soal) | Balok tangga nyata, papan nomor anak, batu loncatan | Diagram balok bertingkat, garis bilangan, titik 1–10 | Hanya lambang angka `1–10`, panah `→`, dan kotak kosong `[ ]` |
| **Aksi Anak** | Membaca ringkas & mendengar Suara Guru | Memegang, menyeret, mengetuk langkah maju/mundur | Mengetuk petak diagram & menghubungkan titik urut | Memilih angka yang hilang, mengucap dengan suara, menulis di kanvas |
| **Pendamping** | Judul panel & tombol `🔊 Suara Guru` | Maskot Katak / Upe pemandu langkah | Catatan tempel kuning (`CatatanTempel`) | Satu baris tulisan pensil (`CatatanPensil`) |

5. **Aturan Suara Guru & Kanvas:**
   - Pada kartu yang menuntut jawaban anak (Tahap Concrete, Pictorial, Abstract), **Suara Guru tidak boleh membocorkan angka kunci**.
   - Pemeriksa suara (`Web Speech API`) menerima 1 kali ucapan angka atau kata bilangannya (`"satu"` s.d. `"sepuluh"`), disertai jalur tombol pilih angka sebagai cadangan aksesibilitas bila mikrofon tidak tersedia.

---

## Tahap 1 · `[S]` Story (4 Adegan Kontekstual, Geser Manual + Suara Guru)

Tokoh buku: **Upe, Kira, Malosi, Wei, Halim, dan Tika**.

### C-S1 · Upe Naik Tangga (Menghitung Maju 1 sampai 10)
- **Rujukan Buku:** Buku Siswa hlm. 25 (*1. Menghitung Maju*).
- **Visual Adegan (`maju-tangga-upe`):** Upe melangkah naik di tangga taman yang memiliki 10 anak tangga dari kiri (rendah) ke kanan (tinggi). Setiap anak tangga ditopang tumpukan balok bernomor `1, 2, 3, 4, 5, 6, 7, 8, 9, 10`. Anak tangga 1, 2, 3 menyala emas, dan panah lengkung menunjuk ke anak tangga berikutnya.
- **Narasi Suara Guru:**
  > "Upe naik tangga satu per satu. Upe menghitung maju mulai dari satu: satu, dua, tiga, empat, sampai sepuluh! Saat menghitung maju, kita mulai dari bilangan kecil ke besar. Setiap naik satu tangga, bilangannya bertambah satu."
- **Konsep Kunci:** Urutan maju `1 → 10` (kecil ke besar, langkah sama, bertambah 1).

### C-S2 · Upe Turun Tangga (Menghitung Mundur 10 sampai 1)
- **Rujukan Buku:** Buku Siswa hlm. 26 (*2. Menghitung Mundur*).
- **Visual Adegan (`mundur-tangga-upe`):** Dari puncak anak tangga ke-10, Upe berbalik dan melangkah turun satu per satu menuju anak tangga ke-1. Tumpukan balok makin pendek satu petak di tiap langkah turun: `10, 9, 8, 7, 6, 5, 4, 3, 2, 1`.
- **Narasi Suara Guru:**
  > "Sesudah sampai di puncak tangga sepuluh, Upe turun tangga dengan hati-hati. Upe menghitung mundur mulai dari sepuluh: sepuluh, sembilan, delapan, terus turun sampai satu! Saat menghitung mundur, kita mulai dari bilangan besar ke kecil. Setiap turun satu tangga, bilangannya berkurang satu."
- **Konsep Kunci:** Urutan mundur `10 → 1` (besar ke kecil, langkah sama, berkurang 1).

### C-S3 · Barisan Berhitung Berantai (Mulai dari Bilangan Mana Saja)
- **Rujukan Buku:** Buku Siswa hlm. 27 (*Ayo Bermain*).
- **Visual Adegan (`berantai-barisan-anak`):** Enam sahabat (Upe, Kira, Malosi, Wei, Halim, dan Tika) berdiri berbaris rapi di taman. Upe di ujung kiri mengangkat papan angka `3`, Kira mengangkat `4`, Malosi `5`, Wei `6`, Halim `7`, dan Tika `8`.
- **Narasi Suara Guru:**
  > "Upe dan lima temannya bermain hitung berantai di taman. Upe di ujung barisan menyebut bilangan tiga. Kira di sampingnya langsung melanjutkan: empat! Lalu Malosi menyebut lima, Wei enam, Halim tujuh, dan Tika delapan. Menghitung maju atau mundur bisa dimulai dari bilangan mana saja!"
- **Konsep Kunci:** Melanjutkan urutan bilangan dari tengah (tidak harus mulai dari 1 atau 10).

### C-S4 · Katak Melompat di Batu Nomor (Sebelum, Sesudah, dan Di Antara)
- **Rujukan Buku:** Penguatan visual Buku Siswa hlm. 27–28 (*Ayo Berlatih*).
- **Visual Adegan (`lompat-katak-batu`):** Deretan 10 batu datar bernomor `1` sampai `10` di tepi kolam taman. Seekor katak berada di batu nomor `6`. Panah kuning ke kanan menunjuk batu `7` (*maju 1 langkah = sesudah*), dan panah biru ke kiri menunjuk batu `5` (*mundur 1 langkah = sebelum*).
- **Narasi Suara Guru:**
  > "Lihat katak di atas batu nomor enam! Jika katak melompat maju satu batu ke kanan, ia mendarat di batu tujuh. Jika katak melompat mundur satu batu ke kiri, ia mendarat di batu lima. Jadi batu enam berada tepat di antara batu lima dan batu tujuh!"
- **Konsep Kunci:** Hubungan posisi bilangan berurutan (*sebelum*, *di antara*, dan *sesudah*).

---

## Tahap 2 · `[M]` Mind-Mapping (4 Langkah Peta Pikiran Vertikal)

Judul Peta Pikiran: **Cara Menghitung Maju dan Mundur**
Suara Guru Pembuka: *"Empat langkah mudah menghitung maju dan mundur. Satu, lihat bilangan awal. Dua, hitung maju dari kecil ke besar. Tiga, hitung mundur dari besar ke kecil. Empat, kenali bilangan sebelum dan sesudah."*

1. **1. Lihat Bilangan Awal**
   - **Ikon:** `🏁`
   - **Deskripsi:** *"Perhatikan bilangan tempat kita mulai. Kita bisa mulai dari 1, dari 10, atau dari bilangan mana saja di tengah."*
   - **Alur:** `Titik Awal Berdiri` → `Siap Melangkah Urut`
2. **2. Hitung Maju (Kecil ke Besar)**
   - **Ikon:** `⬆️`
   - **Deskripsi:** *"Melangkah naik atau ke kanan. Mulai dari bilangan kecil ke besar. Langkahnya selalu sama, yaitu bertambah satu: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10."*
   - **Alur:** `Langkah Maju (Ke Kanan / Naik)` → `Bilangan Makin Besar`
3. **3. Hitung Mundur (Besar ke Kecil)**
   - **Ikon:** `⬇️`
   - **Deskripsi:** *"Melangkah turun atau ke kiri. Mulai dari bilangan besar ke kecil. Langkahnya selalu sama, yaitu berkurang satu: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1."*
   - **Alur:** `Langkah Mundur (Ke Kiri / Turun)` → `Bilangan Makin Kecil`
4. **4. Temukan Sebelum, Di Antara, dan Sesudah**
   - **Ikon:** `🧭`
   - **Deskripsi:** *"Maju satu langkah untuk mencari bilangan sesudah. Mundur satu langkah untuk mencari bilangan sebelum."*
   - **Alur:** `Cek Tetangga Kiri & Kanan` → `Lengkapi Urutan yang Kosong`

---

## Tahap 3 · `[I]` Infografis (Poster Rangkuman Visual — Baca & Dengar, Tanpa Soal)

- **Judul Poster:** **Peta Tangga Menghitung Maju dan Mundur**
- **Pita Tahap:** `📰 INFOGRAFIS · "Baca dan dengarkan. Belum ada yang dijawab."`
- **Suara Guru Utama:** *"Ini poster rangkuman menghitung maju dan mundur. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya."*

| Panel | Judul Panel | Visual Panel | Kalimat Tampilan & Suara Guru |
|---|---|---|---|
| **1** | **MENGHITUNG MAJU (1 SAMPAI 10)** | Tangga balok naik dari 1 sampai 10 (kiri ke kanan) dengan panah emas naik di atas tiap anak tangga. | *"Menghitung maju dimulai dari bilangan kecil ke besar: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Setiap langkah bertambah satu."* |
| **2** | **MENGHITUNG MUNDUR (10 SAMPAI 1)** | Tangga balok turun dari 10 sampai 1 (kiri ke kanan menurun) dengan panah biru turun di tiap anak tangga. | *"Menghitung mundur dimulai dari bilangan besar ke kecil: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1. Setiap langkah berkurang satu."* |
| **3** | **LANJUTKAN DARI TENGAH** | Dua pita berantai: Pita Maju `4 → 5 → 6 → 7 → 8` dan Pita Mundur `8 → 7 → 6 → 5 → 4`. | *"Kita boleh mulai menghitung dari bilangan mana saja. Maju dari empat: 4, 5, 6, 7, 8. Mundur dari delapan: 8, 7, 6, 5, 4."* |
| **4** | **SEBELUM, DI ANTARA, SESUDAH** | Tiga batu berdampingan `5`, `6` (disorot emas), dan `7`. Label kiri: *Sebelum (5)*, Tengah: *Di Antara (6)*, Kanan: *Sesudah (7)*. | *"Di sekitar angka enam: satu langkah mundur adalah lima, satu langkah maju adalah tujuh. Enam ada di antara lima dan tujuh."* |
| **5** | **GARIS BILANGAN 1 SAMPAI 10** | Garis bilangan `1–10` dengan katak melompat ke kanan (Maju) dan melompat ke kiri (Mundur). | *"Pada garis bilangan, melompat ke kanan berarti menghitung maju. Melompat ke kiri berarti menghitung mundur."* |

**Kotak INGAT di Bawah Poster:**
1. **Hitung Maju:** Mulai dari kecil ke besar, langkahnya sama (bertambah 1).
2. **Hitung Mundur:** Mulai dari besar ke kecil, langkahnya sama (berkurang 1).
3. **Cek Tetangga:** Mundur 1 langkah = *sebelum*, maju 1 langkah = *sesudah*.

---

## Tahap 4 · `[C]` Concrete & Simulasi Alat Peraga Interaktif (Meja Benda Nyata)

- **Dunia Visual:** Meja kayu dengan alas kain krem dan rak tangga balok warna-warni.
- **Pita Tahap:** `🧸 CONCRETE & SIMULASI · "Susun balok tangga, gerakkan langkah, dan lengkapi urutan."`
- Terdiri atas **6 Kegiatan Concrete Terbimbing** ditambah **Simulasi Alat Peraga Mandiri** di dalam Materi.

### Kegiatan 1 · Membilang Anak Tangga Maju (Dengan Suara)
Dua kartu berurutan (mengikuti ilustrasi tangga Upe di Buku Siswa hlm. 25):

| Putaran | Titik Awal → Target | Benda Konkret | Kunci Suara |
|---|---|---|---|
| **1** | Anak tangga `1` s.d. `5` | 5 tumpukan balok tangga (`1, 2, 3, 4, 5`) | **5 (Lima)** |
| **2** | Anak tangga `6` s.d. `9` | 4 tumpukan balok tangga lanjutan (`6, 7, 8, 9`) | **9 (Sembilan)** |

- **Cara Kerja:** Anak mengetuk atau menyeret balok ke anak tangga satu per satu secara berurutan. Setiap anak tangga yang terisi menampilkan angkanya (`1, 2, 3, 4, 5` pada putaran 1; `6, 7, 8, 9` pada putaran 2). Setelah tangga terakhir terisi, anak menekan tombol **"Jawab dengan suara"** (atau tombol pilih angka cadangan) untuk menyebutkan nomor anak tangga puncak.
- **`bantuan`:** *"Pasang balok tangga satu per satu dari kiri ke kanan, lalu ucapkan nomor anak tangga paling ujung!"*
- **Suara Guru:** *"Ayo bantu Upe menaiki tangga balok satu per satu. Ketuk anak tangganya secara berurutan, lalu ucapkan bilangan pada tangga terakhir."*

### Kegiatan 2 · Melengkapi Anak Tangga yang Kosong (Tanpa Suara, Tanpa Kanvas)
Diadaptasi langsung dari **Buku Siswa hlm. 27 (*Ayo Berlatih* No. 1)**. Dua putaran seret-lepas:

| Putaran | Barisan Anak Tangga di Meja | Pilihan Balok di Bawah | Kunci Seret |
|---|---|---|---|
| **1** | `1`, `2`, `[ ? ]`, `4`, `5` | Tumpukan `2`, `3`, `5` balok | **`3`** |
| **2** | `4`, `[ ? ]`, `6`, `[ ? ]`, `8` | Tumpukan `3`, `5`, `7`, `9` balok | **`5` lalu `7`** |

- **Cara Kerja:** Anak menyeret tumpukan balok yang tingginya pas ke celah tangga yang masih kosong (atau mengetuk pilihan balok).
- **`bantuan`:** *"Lihat tinggi tangga di kiri dan kanannya. Seret tumpukan balok yang pas untuk mengisi tangga yang kosong!"*
- **Pesan Benar:** *"Pas sekali! Tangga baloknya sekarang naik berurutan tanpa celah."*
- **Pesan Salah:** *"Belum pas. Ingat, setiap naik satu tangga, baloknya bertambah satu."*
- **Suara Guru:** *"Ada anak tangga yang belum terisi. Perhatikan urutan bilangannya, lalu seret tumpukan balok yang tepat ke tempat yang kosong."*

### Kegiatan 3 · Bermain Hitung Berantai di Taman (Tanpa Suara, Tanpa Kanvas)
Diadaptasi langsung dari **Buku Siswa hlm. 27 (*Ayo Bermain*)**. Tiga putaran cepat:

| Putaran | Arah Hitung | Barisan Papan Anak di Layar | Pilihan Papan Jawaban | Kunci |
|---|---|---|---|---|
| **1** | **Maju** | Upe `3` → Kira `4` → Malosi `5` → Wei `[ ? ]` | `2`, `6`, `8` | **`6`** |
| **2** | **Mundur** | Tika `10` → Halim `9` → Wei `8` → Malosi `[ ? ]` | `7`, `9`, `10` | **`7`** |
| **3** | **Mundur** | Kira `6` → Upe `5` → Halim `4` → Tika `[ ? ]` | `1`, `3`, `5` | **`3`** |

- **`bantuan`:** *"Perhatikan apakah barisan temanmu sedang menghitung maju atau mundur, lalu ketuk papan bilangan berikutnya!"*
- **Pesan Benar:** *"Betul! Barisan hitung berantainya tersambung dengan kompak."*
- **Pesan Salah:** *"Coba cek lagi arah hitungannya: makin besar (maju) atau makin kecil (mundur)?"*
- **Suara Guru:** *"Enam sekawan sedang bermain hitung berantai. Lihat papan angka yang mereka pegang, lalu pilih bilangan untuk anak di ujung!"*

### Kegiatan 4 · Menyusun Gerbong Kereta Berurutan (Seret-Lepas, Tanpa Suara, Tanpa Kanvas)
Diadaptasi dari **Buku Siswa hlm. 28 (*Ayo Berlatih* No. 2 & No. 3)**. Dua putaran:
- **Putaran 1 (Susun Maju dari 6 sampai 10):**
  - Lima gerbong kayu tampil acak di meja: `[8]`, `[10]`, `[6]`, `[9]`, `[7]`.
  - Anak menyeret/mengetuk gerbong ke rel kereta bernomor urut **Maju (Kecil ke Besar)**.
  - **Kunci Putaran 1:** `6 → 7 → 8 → 9 → 10`.
- **Putaran 2 (Susun Mundur dari 5 sampai 1):**
  - Lima gerbong kayu tampil acak di meja: `[2]`, `[5]`, `[1]`, `[4]`, `[3]`.
  - Anak menyeret/mengetuk gerbong ke rel kereta bernomor urut **Mundur (Besar ke Kecil)**.
  - **Kunci Putaran 2:** `5 → 4 → 3 → 2 → 1`.
- **`bantuan`:** *"Perhatikan aba-aba di kepala kereta: susun maju dari kecil ke besar, atau susun mundur dari besar ke kecil!"*
- **Suara Guru:** *"Susun gerbong kereta di atas rel sesuai aba-aba. Putaran pertama menghitung maju, putaran kedua menghitung mundur."*

### Kegiatan 5 · Cerita Langkah Upe di Tangga Taman (Dengan Suara)
- **Cerita Kontekstual:** *"Upe berdiri di anak tangga nomor 4. Lalu Upe melangkah naik 3 anak tangga lagi satu per satu."*
- **Visual Adegan Interaktif:** Tangga bernomor `1` sampai `10`. Pion Upe berdiri di anak tangga `4`.
- **Tombol Aksi Pertama:** **`⬆️ Upe Naik 3 Tangga`**. Saat ditekan, pion Upe melompat naik satu per satu (`4 → 5 → 6 → 7`) dengan efek sorotan emas di tiap pijakan.
- **Tugas Anak (Berurutan):**
  1. **Tugas Suara:** *"Jawab dengan suara: di anak tangga nomor berapa Upe berdiri sekarang?"* → **Kunci: 7 (Tujuh)**.
  2. **Tugas Pilihan Kontekstual:** *"Jika dari situ Upe turun 1 anak tangga (mundur 1 langkah), Upe berada di anak tangga nomor berapa?"* Tombol pilihan: **`6`** atau **`8`** → **Kunci: `6`**.
- **`bantuan`:** *"Tekan tombol supaya Upe melangkah naik, hitung pijakannya, lalu ucapkan nomor anak tangganya!"*
- **Suara Guru:** *"Upe mulai dari anak tangga empat, lalu naik tiga anak tangga lagi. Lihat di mana Upe berhenti, lalu ucapkan bilangannya."*

### Kegiatan 6 · Menulis Bilangan yang Hilang pada Urutan Mundur (Kanvas, Tanpa Suara)
- **Visual di Meja:** Lima batu pijakan sungai berjejer dari kiri ke kanan dengan arah panah mundur:
  `[ 10 ]  →  [ 9 ]  →  [ ? ]  →  [ 7 ]  →  [ 6 ]`
- **Perintah:** *"Tulis bilangan yang hilang pada urutan hitung mundur di atas."*
- **Kanvas Titik-Titik (`DottedNumberTracingCanvas`):** Angka di atas, kata di bawah.
- **Kunci Kanvas:** **`8` (`Delapan`)**.
- **`bantuan`:** *"Hitung mundur dari 10: sepuluh, sembilan, lalu berapa sebelum tujuh? Tebalkan di kanvas!"*
- **Pesan Lulus:** *"Tulisanmu rapi dan tepat! Mundur satu langkah dari 9 adalah 8."*
- **Suara Guru:** *"Lihat batu pijakan yang dihitung mundur dari sepuluh. Ada satu batu yang angkanya hilang di antara sembilan dan tujuh. Tulis angka dan katanya di kanvas."*

### Simulasi Interaktif Terpadu di Dalam Materi Sub-Bab C (Pengganti Tab Simulasi)
Sesuai aturan `.cursorrules` bahwa **Simulasi** berada langsung di dalam **Materi**, di akhir atau pendamping tahap Concrete/Pictorial tersedia **Laboratorium Eksplorasi Mandiri Maju-Mundur** dengan 2 mode:
1. **Mode A — Eksplorasi Tangga Balok & Katak Loncat (1–10):**
   - Siswa bebas memilih titik awal (`1` sampai `10`), menekan tombol **`⬆️ Maju 1 Langkah`** atau **`⬇️ Mundur 1 Langkah`**, serta tombol **`▶️ Putar Otomatis Maju (1→10)`** dan **`◀️ Putar Otomatis Mundur (10→1)`**.
   - Layar menampilkan tinggi balok secara *real-time*, posisi pada garis bilangan, serta informasi tetangga bilangan (*Sebelum*, *Posisi Sekarang*, *Sesudah*).
2. **Mode B — Permainan Hubungkan Titik 1 sampai 10 (Buku Siswa hlm. 28 No. 4):**
   - Siswa mengetuk titik bernomor `1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10` secara berurutan (tersedia juga tombol ubah ke **Mode Mundur `10 → 1`**).
   - Setiap ketukan yang benar menarik garis kuning emas hingga seluruh 10 titik terhubung dan memunculkan ilustrasi kejutan berwarna (**Perahu Layar Taman IGIL**).

Tombol akhir Tahap 4: **`LANJUTKAN KE PICTORIAL ⬇️`**.

---

## Tahap 5 · `[P]` Pictorial (4 Kartu Diagram di Buku Gambar Bergaris)

- **Dunia Visual:** Kertas buku gambar bergaris dengan spiral di bagian atas dan catatan tempel kuning (`CatatanTempel`).
- **Aturan Pedagogis:** Kalimat kesimpulan dan rangkaian panah lengkap baru terbuka **setelah jawaban suara/pilihan anak diterima**.

| Kartu | Jenis Diagram | Tampilan Diagram | Tugas Suara Anak | Kanvas | Rangkaian yang Terbuka Setelah Benar |
|---|---|---|---|---|---|
| **P1** | **Diagram Tangga Balok Naik (Maju)** | 6 kolom balok: `1, 2, 3, 4, [?], 6` | Ketuk kolom ke-5 sampai tingginya pas, lalu ucapkan bilangannya (**Kunci: 5**) | Tidak | `1 → 2 → 3 → 4 → 5 → 6` (*"Maju satu langkah dari 4 adalah 5."*) |
| **P2** | **Diagram Tangga Balok Turun (Mundur)** | 5 kolom balok menurun: `9, 8, [?], 6, 5` | Ketuk kolom ke-3 sampai tingginya pas, lalu ucapkan bilangannya (**Kunci: 7**) | Tidak | `9 → 8 → 7 → 6 → 5` (*"Mundur satu langkah dari 8 adalah 7."*) |
| **P3** | **Garis Bilangan Lompatan Maju** | Garis bilangan `1–10`; katak mulai di `6`, melompat maju 3 langkah ke kanan (`6 → 7 → 8 → 9`) | Ketuk katak sampai berhenti, ucapkan titik berhentinya (**Kunci: 9**) | Ya: **`9 Sembilan`** | `6 → 7 → 8 → 9` (*"Dari 6 maju 3 langkah berhenti di 9."*) |
| **P4** | **Hubungkan Titik 1–10 (Buku Siswa hlm. 28)** | Diagram titik bernomor `1` s.d. `10` (titik `1–7` sudah terhubung, lanjutkan ketuk `8 → 9 → 10`) | Ketuk titik `8, 9, 10` secara berurutan, lalu ucapkan bilangan terakhir (**Kunci: 10**) | Tidak | `1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10` (*"Garis 1 sampai 10 membentuk gambar utuh!"*) |

### Detail Kartu Pictorial:
- **P1 · Tangga Balok Naik:**
  - `bantuan`: *"Ketuk kolom yang kosong sampai tingginya pas seperti anak tangga, lalu ucapkan jumlah petaknya."*
  - Suara Guru: *"Lihat diagram tangga yang naik dari kiri ke kanan. Isi kolom yang kosong di antara empat dan enam, lalu ucapkan bilangannya."*
- **P2 · Tangga Balok Turun:**
  - `bantuan`: *"Tangga ini turun satu petak setiap langkah. Isi kolom yang kosong di antara delapan dan enam, lalu ucapkan."*
  - Suara Guru: *"Diagram tangga ini menurun dari sembilan ke lima. Bangun kolom yang kosong, lalu ucapkan bilangannya."*
- **P3 · Garis Bilangan Lompatan Katak:**
  - `bantuan`: *"Ketuk katak supaya melompat maju tiga kali dari titik 6. Ucapkan dan tulis bilangan tempat katak berhenti."*
  - Suara Guru: *"Katak berada di titik enam dan ingin melompat maju tiga langkah ke kanan. Ketuk kataknya, lalu ucapkan dan tulis bilangan tempat ia mendarat."*
- **P4 · Hubungkan Titik 1 sampai 10:**
  - `bantuan`: *"Ketuk titik 8, lalu 9, lalu 10 secara berurutan sampai gambarnya selesai. Sesudah itu ucapkan bilangan terakhir."*
  - Suara Guru: *"Hubungkan titik-titik bilangan secara berurutan sampai sepuluh. Gambar apa yang muncul? Ucapkan bilangan paling akhir."*

Tombol akhir Tahap 5: **`LANJUTKAN KE ABSTRACT ⬇️`**.

---

## Tahap 6 · `[A]` Abstract (3 Kartu Lambang Murni di Buku Tulis Kotak-Kotak)

- **Dunia Visual:** Kertas buku tulis kotak-kotak matematika (`GAYA_KOTAK`) dengan satu baris catatan pensil (`CatatanPensil`).
- **Tanpa gambar benda.** Setiap kartu menampilkan deretan lambang bilangan dengan satu kotak kosong `[ ? ]` dan 3 tombol pilihan angka di bawahnya.
- **Alur Interaksi:** Anak memilih tombol angka yang tepat untuk mengisi `[ ? ]` → tombol suara aktif → anak mengucapkan bilangan tersebut (atau menekan konfirmasi angka) → kartu L3 membuka kanvas tulis **`5 Lima`**.

| Kartu | Deretan Lambang di Layar | Pilihan Tombol Angka | Kunci Pilih & Suara | Kanvas | Kalimat yang Terbuka Setelah Selesai |
|---|---|---|---|---|---|
| **L1** | `4  →  5  →  [ ? ]  →  7  →  8` | `3` · `6` · `9` | **`6` (Enam)** | Tidak | `4 → 5 → 6 → 7 → 8` — *"Menghitung maju: empat, lima, enam, tujuh, delapan. Sesudah lima adalah enam."* |
| **L2** | `10  →  9  →  8  →  [ ? ]  →  6` | `5` · `7` · `9` | **`7` (Tujuh)** | Tidak | `10 → 9 → 8 → 7 → 6` — *"Menghitung mundur: sepuluh, sembilan, delapan, tujuh, enam. Sebelum delapan adalah tujuh."* |
| **L3** | `8  →  7  →  6  →  [ ? ]  →  4` | `3` · `5` · `8` | **`5` (Lima)** | Ya: **`5 Lima`** | `8 → 7 → 6 → 5 → 4` — *"Menghitung mundur dari delapan: sebelum enam dan sesudah empat adalah lima."* |

### Detail Pesan & Panduan Tahap 6 (Abstract):
- **`bantuan`:**
  - **L1:** *"Lihat urutan maju dari 4 ke 8. Pilih angka yang hilang, lalu ucapkan sekali."*
  - **L2:** *"Lihat urutan mundur dari 10 ke 6. Pilih angka yang hilang, lalu ucapkan sekali."*
  - **L3:** *"Lihat urutan mundur dari 8 ke 4. Pilih angkanya, ucapkan, lalu tulis di kanvas."*
- **Suara Guru (Tanpa Menyebut Kunci):**
  - **L1:** *"Perhatikan barisan bilangan yang maju dari empat sampai delapan. Pilih bilangan yang tepat untuk mengisi kotak kosong, lalu ucapkan."*
  - **L2:** *"Perhatikan barisan bilangan yang mundur dari sepuluh sampai enam. Pilih bilangan yang hilang di kotak kosong, lalu ucapkan."*
  - **L3:** *"Barisan ini menghitung mundur dari delapan sampai empat. Pilih bilangan yang hilang, ucapkan dengan lantang, lalu tebalkan di kanvas."*
- **Pesan Umpan Balik:**
  - Pilihan angka salah di L1: *"Belum tepat. Ini hitung maju dari kecil ke besar: habis 4 lalu 5, sesudah 5 berapa?"*
  - Pilihan angka salah di L2/L3: *"Belum tepat. Ini hitung mundur dari besar ke kecil: setiap langkah berkurang satu."*
  - Pilihan angka benar, menunggu suara: *"Angkanya sudah pas! Sekarang ucapkan bilangannya."*

Tombol akhir Tahap 6: **`SELESAIKAN SUB-BAB C & LANJUTKAN ➡️`**.

---

## Kartu Poin Penting (Ringkasan Akhir Sub-Bab C dengan Suara Guru)

1. **Menghitung Maju:** Mulai dari bilangan **kecil ke besar** (`1, 2, 3, 4, 5, 6, 7, 8, 9, 10`). Langkahnya selalu sama, setiap langkah **bertambah 1**.
2. **Menghitung Mundur:** Mulai dari bilangan **besar ke kecil** (`10, 9, 8, 7, 6, 5, 4, 3, 2, 1`). Langkahnya selalu sama, setiap langkah **berkurang 1**.
3. **Mulai dari Mana Saja:** Kita bisa menghitung maju atau mundur mulai dari bilangan mana pun di tengah, tidak harus selalu dari `1` atau `10`.
4. **Tetangga Bilangan:**
   - Maju 1 langkah ke kanan = bilangan **sesudah**.
   - Mundur 1 langkah ke kiri = bilangan **sebelum**.

| Gerakan | Arah di Tangga / Garis Bilangan | Perubahan Nilai | Contoh Barisan |
|---|---|---|---|
| **Hitung Maju** | Naik tangga / melompat ke kanan (`→`) | Kecil ke besar (bertambah 1) | `3 → 4 → 5 → 6 → 7` |
| **Hitung Mundur** | Turun tangga / melompat ke kiri (`←`) | Besar ke kecil (berkurang 1) | `9 → 8 → 7 → 6 → 5` |

**Suara Guru Poin Penting:**
> *"Ingat selalu! Menghitung maju dimulai dari bilangan kecil ke besar, setiap langkah bertambah satu. Menghitung mundur dimulai dari bilangan besar ke kecil, setiap langkah berkurang satu. Satu langkah maju adalah bilangan sesudah, dan satu langkah mundur adalah bilangan sebelum."*

---

## Kegiatan Tanpa Gawai (Opsional — Sesuai *Ayo Bermain* Buku Siswa Hlm. 27)

- *"Ajak teman-temanmu atau keluargamu di rumah membuat barisan. Orang paling ujung menyebutkan satu bilangan antara 1 sampai 10, lalu orang di sebelahnya langsung menyebutkan bilangan berikutnya secara maju atau mundur dengan cepat!"*

---

## Tabel Verifikasi Kunci Jawaban Sub-Bab C (Telah Diperiksa)

| Tahap | Kode / Kegiatan | Konteks Soal / Interaksi | Kunci Jawaban | Verifikasi Matematika |
|---|---|---|---|---|
| **Story** | `C-S1` | Upe naik tangga dari 1 sampai 10 | `1, 2, 3, 4, 5, 6, 7, 8, 9, 10` | Urut maju +1 dari 1 s.d. 10 (Buku hlm. 25) |
| **Story** | `C-S2` | Upe turun tangga dari 10 sampai 1 | `10, 9, 8, 7, 6, 5, 4, 3, 2, 1` | Urut mundur -1 dari 10 s.d. 1 (Buku hlm. 26) |
| **Story** | `C-S3` | Barisan 6 anak hitung berantai dari 3 | `3, 4, 5, 6, 7, 8` | Enam bilangan berurutan maju mulai dari 3 (Buku hlm. 27) |
| **Story** | `C-S4` | Katak di batu 6: mundur 1 & maju 1 | Sebelum `6` = `5`; Sesudah `6` = `7` | `5, 6, 7` berurutan; `6` tepat di antara `5` dan `7` |
| **Concrete 1** | Membilang Tangga | Putaran 1 (`1..5`), Putaran 2 (`6..9`) | **`5`** dan **`9`** | Puncak tangga putaran 1 = 5; putaran 2 = 9 |
| **Concrete 2** | Tangga Kosong | Putaran 1: `1, 2, [?], 4, 5`; Putaran 2: `4, [?], 6, [?], 8` | **`3`**; lalu **`5` dan `7`** | Sesuai *Ayo Berlatih* No. 1 Buku Siswa hlm. 27 |
| **Concrete 3** | Hitung Berantai | Putaran 1 (`3,4,5,[?]`), Putaran 2 (`10,9,8,[?]`), Putaran 3 (`6,5,4,[?]`) | **`6`**; **`7`**; **`3`** | Putaran 1 maju (+1); Putaran 2 & 3 mundur (-1) |
| **Concrete 4** | Susun Gerbong | Putaran 1 Maju (`6..10`), Putaran 2 Mundur (`5..1`) | `6, 7, 8, 9, 10`; `5, 4, 3, 2, 1` | Kecil ke besar (`6→10`); besar ke kecil (`5→1`) |
| **Concrete 5** | Cerita Tangga Upe | Dari tangga `4` naik `3` tangga; lalu turun `1` tangga | Suara: **`7`**; Pilihan: **`6`** | `4 → 5 → 6 → 7` (naik 3 langkah); `7 → 6` (turun 1 langkah) |
| **Concrete 6** | Kanvas Menulis | Batu pijakan mundur `10, 9, [?], 7, 6` | **`8 Delapan`** | Di antara 9 dan 7 pada urutan mundur adalah 8 |
| **Pictorial** | `P1` | Tangga balok naik `1, 2, 3, 4, [?], 6` | **`5`** | Tinggi balok ke-5 = 5 petak |
| **Pictorial** | `P2` | Tangga balok turun `9, 8, [?], 6, 5` | **`7`** | Tinggi balok di antara 8 dan 6 = 7 petak |
| **Pictorial** | `P3` | Katak di `6` melompat maju `3` langkah + Kanvas | **`9`** (**`9 Sembilan`**) | `6 → 7 (1) → 8 (2) → 9 (3)` |
| **Pictorial** | `P4` | Hubungkan titik `1` s.d. `10` berurutan | **`10`** | Titik terakhir urutan `1..10` adalah `10` (Buku hlm. 28 No. 4) |
| **Abstract** | `L1` | `4 → 5 → [ ? ] → 7 → 8` | Pilih & Suara: **`6`** | Sesudah 5 dan sebelum 7 adalah 6 |
| **Abstract** | `L2` | `10 → 9 → 8 → [ ? ] → 6` | Pilih & Suara: **`7`** | Sebelum 8 dan sesudah 6 adalah 7 |
| **Abstract** | `L3` | `8 → 7 → 6 → [ ? ] → 4` + Kanvas | Pilih, Suara, & Kanvas: **`5 Lima`** | Sebelum 6 dan sesudah 4 adalah 5 |

---

## Catatan Implementasi Visual (Claude)

- Katak menjadi maskot Sub-Bab C (gelembung kata dan peta pikiran).
- Concrete menjadi 7 kegiatan: Kegiatan 7 adalah Laboratorium bebas (Tangga dan Katak, Hubungkan Titik Perahu Layar, Roket Hitung Mundur).
- Pictorial P4 memakai gambar bintang (10 titik, 1 sampai 7 sudah terhubung).
- Kartu Poin Penting tampil sebagai langkah terakhir Abstract, dengan suara per baris.
- Bantuan P4 tidak menyebut titik 8, 9, 10 agar Suara Guru tidak membocorkan jawaban.

