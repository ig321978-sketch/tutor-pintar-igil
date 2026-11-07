# Naskah Matematika Kelas 1 · Bab 1 · Sub-Bab D: Pasangan Bilangan

Sumber rujukan resmi:
- **Buku Siswa Matematika untuk SD/MI Kelas I** (Penulis: Dara Retno Wulan & Rasfaniwaty, Kemendikbudristek 2022), Bab 1 Sub-Bab D: **Pasangan Bilangan**, **halaman 29–35**, serta **Evaluasi & Ayo Berkarya halaman 36–40**.
- **Buku Panduan Guru Matematika untuk SD/MI Kelas I** (Kemendikbudristek 2022), Bab 1 Sub-Bab D, **halaman 39–44**.

Seluruh naskah ini berjalan **100% di sisi klien** (*Zero Runtime LLM Calls* / biaya API = Rp 0), memakai **Suara Guru** dari `Web Speech API` (`id-ID`), mematuhi arsitektur **4 Tab Modul Bab IGIL** (`Silabus`, `Materi + Simulasi Interaktif`, `Latihan`, `Ujian` — sedangkan Praktikum tampil di akun siswa setelah 4 bab lulus Ujian), serta mengikuti metode **SMICPA**.

---

## Catatan Arsitektur & Kedalaman Pedagogi (Wajib Dipatuhi Saat Implementasi)

1. **Cakupan Utuh Buku Siswa (Hlm. 29–39) & Buku Panduan Guru (Hlm. 39–44):**
   Naskah ini merangkum seluruh 6 lapisan konsep yang ada di buku resmi tanpa ada satu pun yang terlewat:
   - **Lapisan 1 — Struktur Diagram Pasangan Bilangan (*Number Bond*, Buku Guru hlm. 39):**
     - Terdiri atas 1 lingkaran induk yang disebut **Gabungan (Semua)** dan 2 lingkaran cabang yang masing-masing disebut **Sebagian** dan **Sebagian**.
   - **Lapisan 2 — Dua Arah Berpikir: Memisahkan & Menggabungkan (Buku Siswa hlm. 29–30, Buku Guru hlm. 40):**
     - **Arah 1 (Memisahkan / Menguraikan):** *"Satu bilangan bisa dipisahkan."* Contoh buku hlm. 29: **5 kue** dipisahkan menjadi **2 donat** dan **3 kue bolu**.
     - **Arah 2 (Menggabungkan):** *"Dua bilangan bisa digabungkan."* Contoh buku hlm. 30: **3 bola hijau** dan **4 bola merah** digabungkan menjadi **7 bola** (dan sebaliknya, `7` bola dipisahkan menjadi `3` dan `4`).
   - **Lapisan 3 — Mencari Sebagian atau Gabungan yang Hilang (Buku Siswa hlm. 31 & Evaluasi hlm. 37):**
     - Melengkapi cabang yang kosong pada bilangan `6, 7, 8, 9` (`8` → `5` dan `3`; `9` → `3` dan `6`; `6` → `3` dan `3`; `7` → `3` dan `4`; `7` → `2` dan `5`; `9` → `5` dan `4`).
   - **Lapisan 4 — Satu Bilangan Memiliki Banyak Pasangan Berbeda (Buku Siswa hlm. 32 No. 2 & hlm. 35 No. 5 HOTS Bunga Matahari; Buku Guru hlm. 40):**
     - Satu bilangan utuh dapat diuraikan dengan berbagai cara (misalnya `5` dapat diurai menjadi `1 dan 4`, `2 dan 3`, `3 dan 2`, `4 dan 1`; sedangkan pada soal HOTS hlm. 35, **8 mobil-mobilan Upe** dapat dipisahkan menjadi `3 dan 5`, `1 dan 7`, `2 dan 6`, serta `4 dan 4`).
   - **Lapisan 5 — Memasangkan Dua Bilangan yang Menghasilkan Jumlah Tertentu (Buku Siswa hlm. 33–34 No. 3 & No. 4):**
     - Memasangkan dua bilangan yang jumlahnya **5** (hlm. 33) dan yang jumlahnya **6** (hlm. 34).
   - **Lapisan 6 — Pohon Pasangan Bilangan Dua Tingkat & Bingkai 10 (Buku Siswa hlm. 38 No. 6 HOTS Bunga Matahari & *Ayo Berkarya* hlm. 38–39):**
     - **Soal HOTS Kelereng Malosi (hlm. 38 No. 6):** Malosi mempunyai **8 kelereng**, dipisahkan menjadi 2 kelompok (`5` dan `3`), lalu masing-masing kelompok dipisahkan lagi (`5` menjadi `2` dan `3`; `3` menjadi `2` dan `1`).
     - **Proyek *Ayo Berkarya* (hlm. 38–39):** Menyajikan bilangan pada **Bingkai 10** dan menuliskan pasangan bilangannya.

2. **LARANGAN Simbol `+`, `-`, dan `=` Formal di Bab 1:**
   - Di Buku Siswa Kelas 1 Bab 1 (hlm. 1–40), siswa **belum** diajarkan simbol operasi hitung `+` (tambah), `-` (kurang), maupun persamaan `4 + 3 = 7` (materi penjumlahan baru masuk di Bab 2).
   - Oleh karena itu, di seluruh kartu Sub-Bab D **DILARANG** menulis `4 + 3 = 7` atau `7 - 3 = 4`.
   - Gunakan **garis cabang penghubung (*number bond*)** dan kalimat resmi buku:
     - **"5 dipisahkan menjadi 2 dan 3"** / **"5 terdiri dari 2 dan 3"**
     - **"3 dan 4 digabungkan menjadi 7"**
     - **"Gabungan"** dan **"Sebagian — Sebagian"**

3. **Tokoh Buku & Maskot Pendamping Sub-Bab D:**
   - **Tokoh Resmi Buku Siswa (hlm. xii):** **Upe, Kira, Malosi, Wei, Halim, dan Tika** (jangan gunakan nama di luar buku seperti "Tora").
   - **Maskot Pendamping Sub-Bab D (`TupaiBicara`):** Seekor **Tupai Ceria** yang gemar mengumpulkan benda ke wadah induk (**Gabungan**) dan membaginya ke dua keranjang kecil (**Sebagian** dan **Sebagian**). Melengkapi seri maskot Bab 1 (Sub-Bab A: Kelinci, Sub-Bab B: Buaya, Sub-Bab C: Katak, Sub-Bab D: Tupai).

4. **Identitas 3 Warna Dominan Wajib (`.cursorrules`):**
   - **Biru Ungu Royal** (`#1C01A5` / `indigo-950`) untuk garis cabang *number bond*, kerangka kartu, header, dan teks utama.
   - **Kuning Emas** (`#F0AB00` / `#FFE566` / `amber-400`) untuk lingkaran induk **Gabungan**, tombol aksi utama (CTA), dan sorotan jawaban benar.
   - **Putih Bersih** (`#FFFFFF` / `indigo-50/40`) untuk latar ruang baca dan kartu diagram agar ramah di mata anak SD.

5. **Empat Dunia Visual Tahap 3–6 (Konsisten dengan Sub-Bab A, B, dan C):**

| Aspek | Infografis `[I]` | Concrete + Simulasi `[C]` | Pictorial `[P]` | Abstract `[A]` |
|---|---|---|---|---|
| **Dunia Visual** | Poster rangkuman berpanel nomor | Meja kayu beralas kain & nampan cabang | Buku gambar bergaris dengan spiral di atas | Buku tulis kotak-kotak matematika |
| **Isi Utama** | Peta *Gabungan–Sebagian*, contoh kue, bola, mobil Upe, kelereng Malosi | Kue, bola, buku, balon, mobil-mobilan, dan kelereng nyata di meja | Diagram lingkaran titik, diagram batang dua warna, Bingkai 10 | Hanya lingkaran angka murni, garis cabang, dan kotak `[ ? ]` |
| **Aksi Anak** | Membaca ringkas & mendengar Suara Guru | Memindahkan benda ke cabang/induk & memasangkan kartu | Mewarnai/mengetuk petak bagian yang hilang pada diagram | Memilih angka cabang/induk, mengucap dengan suara, menulis di kanvas |
| **Pendamping** | Judul panel & tombol `🔊 Suara Guru` | Maskot Tupai (`TupaiBicara`) | Catatan tempel kuning (`CatatanTempel`) | Satu baris tulisan pensil (`CatatanPensil`) |

---

## Tahap 1 · `[S]` Story (4 Adegan Cerita Kontekstual, Geser Manual + Suara Guru)

### D-S1 · Lima Kue di Piring Kira (Satu Bilangan Bisa Dipisahkan)
- **Rujukan Buku:** Buku Siswa hlm. 29 (*Eksplorasi Awal: Ada 5 kue. Dua donat. Tiga kue bolu*).
- **Visual Adegan (`pasangan-kue-kira`):** Kira berdiri di dekat meja taman. Di piring besar atas (**Gabungan**) tampak **5 kue** (2 donat cokelat dan 3 kue bolu kuning). Dua jalur garis cabang menghubungkan piring besar ke dua piring kecil di bawahnya (**Sebagian**): piring kiri berisi **2 donat** (angka `2`) dan piring kanan berisi **3 kue bolu** (angka `3`).
- **Narasi Suara Guru:**
  > "Lihat piring Kira! Ada lima kue semuanya: dua donat dan tiga kue bolu. Kira memisahkan lima kue itu ke dua piring kecil. Piring kiri berisi dua donat, dan piring kanan berisi tiga kue bolu. Satu bilangan utuh bisa dipisahkan menjadi dua bagian: lima dipisahkan menjadi dua dan tiga!"
- **Konsep Kunci:** Menguraikan (*decompose*) bilangan utuh `5` menjadi bagian `2` dan `3`.

### D-S2 · Tujuh Bola Halim dan Wei (Dua Bilangan Bisa Digabungkan)
- **Rujukan Buku:** Buku Siswa hlm. 30 (*Ada 7 bola. Tiga bola hijau. Empat bola merah*).
- **Visual Adegan (`pasangan-bola-halim`):** Halim memegang keranjang kiri berisi **3 bola hijau** (angka `3`) dan Wei memegang keranjang kanan berisi **4 bola merah** (angka `4`). Panah cabang mengarah masuk ke satu keranjang besar di tengah yang memuat **7 bola** (angka `7`). Di sebelahnya tampil diagram pasangan bilangan dua arah: `7` bercabang ke `3` dan `4`, serta `3` dan `4` menyatu ke `7`.
- **Narasi Suara Guru:**
  > "Halim membawa tiga bola hijau. Wei membawa empat bola merah. Saat bola mereka dimasukkan bersama ke satu keranjang besar, jumlah semuanya menjadi tujuh bola! Ingat dua rahasia pasangan bilangan: satu bilangan bisa dipisahkan, dan dua bilangan bisa digabungkan!"
- **Konsep Kunci:** Hubungan timbal balik antara memisahkan (`7 → 3 dan 4`) dan menggabungkan (`3 dan 4 → 7`).

### D-S3 · Delapan Mobil-mobilan Upe (Satu Bilangan Punya Banyak Pasangan)
- **Rujukan Buku:** Buku Siswa hlm. 35 Soal No. 5 HOTS Bunga Matahari (*Upe mempunyai 8 mobil-mobilan. Upe ingin memisahkannya menjadi 2 kelompok*).
- **Visual Adegan (`pasangan-mobil-upe`):** Upe bermain **8 mobil-mobilan** di atas karpet dan mencoba membaginya ke dua kotak garasi dengan tiga cara berbeda yang tampil berdampingan:
  1. Garasi `3` dan `5` → induk `8`
  2. Garasi `2` dan `6` → induk `8`
  3. Garasi `4` dan `4` → induk `8`
- **Narasi Suara Guru:**
  > "Upe mempunyai delapan mobil-mobilan dan ingin memisahkannya menjadi dua kelompok. Mula-mula Upe menaruh tiga di kiri dan lima di kanan. Lalu Upe mencoba cara lain: dua di kiri dan enam di kanan, atau empat di kiri dan empat di kanan! Ternyata satu bilangan yang sama mempunyai banyak pasangan berbeda!"
- **Konsep Kunci:** Eksplorasi berbagai kombinasi pasangan untuk satu bilangan yang sama (`8`).

### D-S4 · Delapan Kelereng Malosi (Memisahkan Dua Kali / Pohon Pasangan Bertingkat)
- **Rujukan Buku:** Buku Siswa hlm. 38 Evaluasi Soal No. 6 HOTS Bunga Matahari (*Malosi mempunyai 8 kelereng. Malosi memisahkan kelerengnya menjadi 2 kelompok. Malosi memisahkan lagi kelompok tersebut*).
- **Visual Adegan (`pasangan-kelereng-malosi`):** Malosi duduk di samping diagram pohon kelereng 2 tingkat:
  - Puncak (**Gabungan**): **8 kelereng**.
  - Cabang tingkat pertama: kiri **5 kelereng**, kanan **3 kelereng**.
  - Cabang tingkat kedua: dari `5` terpecah lagi menjadi **2** dan **3**; dari `3` terpecah lagi menjadi **2** dan **1**.
- **Narasi Suara Guru:**
  > "Malosi mempunyai delapan kelereng. Pertama, Malosi memisahkan delapan kelerengnya menjadi dua kelompok, yaitu lima dan tiga. Belum berhenti di situ, Malosi memisahkan lagi kelompok lima menjadi dua dan tiga, serta kelompok tiga menjadi dua dan satu! Jika semua cabang kecil digabungkan kembali, jumlahnya tetap delapan!"
- **Konsep Kunci:** Penguraian bertingkat (*multi-step number bond*) untuk melatih penalaran HOTS.

---

## Tahap 2 · `[M]` Mind-Mapping (4 Langkah Peta Pikiran Vertikal)

Judul Peta Pikiran: **Cara Menemukan Pasangan Bilangan**
Suara Guru Pembuka: *"Empat langkah mudah menguasai pasangan bilangan. Satu, kenali wadah Gabungan dan Sebagian. Dua, pisahkan satu bilangan menjadi dua kelompok. Tiga, gabungkan dua kelompok menjadi satu bilangan. Empat, temukan berbagai pasangan berbeda."*

1. **1. Kenali Gabungan dan Sebagian**
   - **Ikon:** `🟡`
   - **Deskripsi:** *"Lingkaran induk tempat semua benda berkumpul disebut Gabungan. Dua lingkaran cabangnya disebut Sebagian dan Sebagian."*
   - **Alur:** `Semua Benda Utuh` → `1 Gabungan & 2 Sebagian`
2. **2. Pisahkan Satu Bilangan (Uraikan)**
   - **Ikon:** `↙️`
   - **Deskripsi:** *"Satu bilangan bisa dipisahkan. Bagi benda dari wadah Gabungan ke dua wadah Sebagian, lalu hitung isi tiap wadah."*
   - **Alur:** `1 Wadah Gabungan (Misal 5)` → `2 Wadah Sebagian (2 dan 3)`
3. **3. Gabungkan Dua Bilangan**
   - **Ikon:** `↘️`
   - **Deskripsi:** *"Dua bilangan bisa digabungkan. Kumpulkan benda dari dua wadah Sebagian ke wadah Gabungan, lalu hitung semuanya."*
   - **Alur:** `2 Wadah Sebagian (3 dan 4)` → `1 Wadah Gabungan (7)`
4. **4. Temukan Banyak Pasangan**
   - **Ikon:** `🔄`
   - **Deskripsi:** *"Pindahkan satu per satu benda dari cabang kiri ke cabang kanan untuk menemukan semua pasangan bilangan yang mungkin."*
   - **Alur:** `Geser Benda Antar-Cabang` → `Semua Pasangan Terbuka`

---

## Tahap 3 · `[I]` Infografis (Poster Rangkuman 5 Panel + Kotak INGAT — Baca & Dengar, Tanpa Soal)

- **Judul Poster:** **Peta Pasangan Bilangan (Number Bond)**
- **Pita Tahap:** `📰 INFOGRAFIS · "Lihat dan dengar"`
- **Suara Guru Utama:** *"Ini poster rangkuman pasangan bilangan. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab."*

| Panel | Judul Panel | Visual Panel | Kalimat Tampilan & Suara Guru |
|---|---|---|---|
| **1** | **GABUNGAN DAN SEBAGIAN** | Diagram *Number Bond* besar (Buku Guru hlm. 39 & Buku Siswa hlm. 29): Lingkaran emas `5 (Gabungan)` bercabang ke `2 (Sebagian)` berisi 2 donat dan `3 (Sebagian)` berisi 3 kue bolu. | *"Pasangan bilangan punya satu lingkaran Gabungan dan dua lingkaran Sebagian. Lima kue dipisahkan menjadi dua donat dan tiga kue bolu."* |
| **2** | **PISAHKAN ATAU GABUNGKAN** | Dua diagram berdampingan (Buku Siswa hlm. 30): Kiri (`7` bola → `3 hijau` dan `4 merah`, panah memisah). Kanan (`3 hijau` dan `4 merah` → `7` bola, panah menggabung). | *"Satu bilangan bisa dipisahkan: tujuh dipisahkan menjadi tiga dan empat. Dua bilangan bisa digabungkan: tiga dan empat digabungkan menjadi tujuh."* |
| **3** | **BANYAK PASANGAN UNTUK 8** | Empat diagram pasangan bilangan untuk **8 mobil-mobilan Upe** (Buku Siswa hlm. 35 No. 5): `(1 dan 7)`, `(2 dan 6)`, `(3 dan 5)`, `(4 dan 4)`. | *"Satu bilangan punya banyak pasangan! Delapan mobil-mobilan Upe bisa dipisahkan menjadi satu dan tujuh, dua dan enam, tiga dan lima, atau empat dan empat."* |
| **4** | **PASANGAN PADA BINGKAI 10** | Bingkai 10 (*Ayo Berkarya* hlm. 38) dengan 6 keping kuning emas dan 4 keping biru ungu, disambungkan ke diagram `10` → `6` dan `4`. | *"Pada Bingkai Sepuluh, enam petak kuning dan empat petak biru membentuk pasangan bilangan enam dan empat untuk sepuluh."* |
| **5** | **POHON PASANGAN DUA TINGKAT** | Diagram kelereng Malosi (Buku Siswa hlm. 38 No. 6): `8` → `5` dan `3`; `5` → `2` dan `3`; `3` → `2` dan `1`. | *"Kelompok yang sudah dipisahkan bisa dipisahkan lagi! Delapan menjadi lima dan tiga, lalu lima menjadi dua dan tiga, sedangkan tiga menjadi dua dan satu."* |

**Kotak INGAT di Bawah Poster (3 Tombol Suara Ringkas):**
1. `↙️` **Pisahkan:** Satu bilangan utuh bisa diuraikan menjadi dua bagian.
2. `↘️` **Gabungkan:** Dua bagian bilangan bisa disatukan menjadi satu jumlah utuh.
3. `🔄` **Banyak Cara:** Satu bilangan yang sama bisa memiliki beberapa pasangan berbeda.

---

## Tahap 4 · `[C]` Concrete & Laboratorium Simulasi Interaktif (Meja Benda Nyata)

- **Dunia Visual:** Meja kayu dengan alas kain krem (`ALAS`), wadah rotan/piring **Gabungan** (berbingkai emas `#F0AB00`), dan dua wadah **Sebagian** (berbingkai biru `#1C01A5`) yang dihubungkan oleh garis cabang tebal.
- **Pita Tahap:** `🧸 CONCRETE · "Pegang, pisahkan, dan gabungkan!"`
- **Maskot Pendamping:** **Tupai Ceria (`TupaiBicara`)** dengan gelembung petunjuk pendek yang dapat diketuk untuk bersuara.
- Terdiri atas **6 Kegiatan Concrete Terbimbing** ditambah **Kegiatan 7: Laboratorium Simulasi 3 Mode** langsung di dalam Materi.

### Kegiatan 1 · Memisahkan Benda ke Dua Wadah (Dengan Suara — Buku Siswa Hlm. 29–30)
Dua putaran berurutan untuk melatih konsep *"Satu bilangan bisa dipisahkan"*:

| Putaran | Wadah Gabungan (Awal) | Cabang Kiri (Sudah Terisi) | Tugas Anak di Cabang Kanan | Kunci Suara |
|---|---|---|---|---|
| **1** | **5 Kue** (2 donat & 3 bolu) | **2 donat** sudah di piring kiri | Ketuk/seret sisa kue dari piring Gabungan ke piring kanan satu per satu, lalu ucapkan jumlahnya | **`3` (Tiga)** |
| **2** | **7 Bola** (3 hijau & 4 merah) | **3 bola hijau** sudah di keranjang kiri | Ketuk/seret sisa bola merah ke keranjang kanan satu per satu, lalu ucapkan jumlahnya | **`4` (Empat)** |

- **Teks Pendek Tupai (`pendek`):** `"Pisahkan sisanya ke wadah kanan!"`
- **`bantuan`:** *"Sebagian benda sudah ada di wadah kiri. Pindahkan semua sisa benda ke wadah kanan, lalu ucapkan jumlah di wadah kanan!"*
- **Suara Guru:** *"Ayo kita pisahkan bendanya! Sebagian sudah masuk ke wadah kiri. Pindahkan sisanya ke wadah kanan satu per satu, lalu ucapkan berapa isinya."*

### Kegiatan 2 · Menggabungkan Dua Kelompok Benda (Dengan Suara — Buku Siswa Hlm. 30 & 31)
Dua putaran berurutan untuk melatih konsep *"Dua bilangan bisa digabungkan"*:

| Putaran | Cabang Kiri | Cabang Kanan | Tugas Anak di Wadah Gabungan | Kunci Suara |
|---|---|---|---|---|
| **1** | **4 Buku** | **2 Buku** | Ketuk/seret semua buku dari wadah kiri dan kanan masuk ke wadah Gabungan, lalu ucapkan jumlah semuanya | **`6` (Enam)** |
| **2** | **5 Balon** | **3 Balon** | Ketuk/seret semua balon dari wadah kiri dan kanan masuk ke wadah Gabungan, lalu ucapkan jumlah semuanya | **`8` (Delapan)** |

- **Teks Pendek Tupai (`pendek`):** `"Kumpulkan ke wadah Gabungan!"`
- **`bantuan`:** *"Pindahkan benda dari wadah kiri dan wadah kanan ke wadah Gabungan di atas. Hitung semuanya, lalu ucapkan sekali!"*
- **Suara Guru:** *"Sekarang kita gabungkan dua kelompok benda! Masukkan benda dari kedua wadah kecil ke wadah Gabungan, lalu ucapkan jumlah semuanya."*

### Kegiatan 3 · Melengkapi Sebagian yang Hilang (Seret-Lepas, Tanpa Suara — Buku Siswa Hlm. 31 No. 1)
Diadaptasi langsung dari soal **Ayo Berlatih No. 1 (Buku Siswa hlm. 31, Kunci Buku Guru hlm. 42)**. Tiga putaran seret-lepas:

| Putaran | Wadah Gabungan | Cabang yang Diketahui | Cabang yang Kosong | Pilihan Kartu Benda di Bawah | Kunci Seret |
|---|---|---|---|---|---|
| **1** | **8 Kelereng** | Kiri: **5 Kelereng** | Kanan: `[ ? ]` | Kelompok `2`, `3`, `4` kelereng | **`3`** |
| **2** | **9 Layang-layang** | Kanan: **6 Layang-layang** | Kiri: `[ ? ]` | Kelompok `2`, `3`, `5` layang-layang | **`3`** |
| **3** | **7 Kursi** | Kiri: **2 Kursi** | Kanan: `[ ? ]` | Kelompok `3`, `4`, `5` kursi | **`5`** |

- **Teks Pendek Tupai (`pendek`):** `"Seret kelompok yang pas!"`
- **`bantuan`:** *"Lihat jumlah di wadah Gabungan dan salah satu cabangnya. Seret kelompok benda yang tepat untuk melengkapi cabang yang kosong!"*
- **Pesan Benar:** *"Pas sekali! Kedua cabang sekarang tepat membentuk jumlah di wadah Gabungan."*
- **Pesan Salah:** *"Belum pas. Coba hitung lagi berapa benda yang kurang supaya jumlahnya sesuai dengan wadah Gabungan."*
- **Suara Guru:** *"Satu cabang pasangan bilangan masih kosong. Pilih dan seret kelompok benda di bawah yang tepat untuk melengkapinya!"*

### Kegiatan 4 · Pasangkan Dua Kartu yang Jumlahnya 5 dan 6 (Tanpa Suara — Buku Siswa Hlm. 33–34 No. 3 & No. 4)
Diadaptasi persis dari **Buku Siswa halaman 33 (No. 3: Pasangkan dua bilangan yang jumlahnya 5)** dan **halaman 34 (No. 4: Pasangkan dua bilangan yang jumlahnya 6)**:
- **Putaran 1 — Pasangan yang Jumlahnya `5` (Buku Siswa hlm. 33):**
  - Baris/kolom pertama menampilkan 4 kartu bilangan beserta titik bendanya: **`[ 1 ]`**, **`[ 2 ]`**, **`[ 3 ]`**, **`[ 4 ]`**.
  - Baris/kolom kedua menampilkan 4 kartu pasangan secara acak: **`[ 3 ]`**, **`[ 4 ]`**, **`[ 1 ]`**, **`[ 2 ]`**.
  - Anak mengetuk satu kartu di kelompok pertama lalu mengetuk pasangannya di kelompok kedua sehingga jumlah keduanya adalah **`5`**:
    - `1` berpasangan dengan `4`
    - `2` berpasangan dengan `3`
    - `3` berpasangan dengan `2`
    - `4` berpasangan dengan `1`
- **Putaran 2 — Pasangan yang Jumlahnya `6` (Buku Siswa hlm. 34):**
  - Empat kartu pilihan di kiri: **`[ 5 ]`**, **`[ 2 ]`**, **`[ 3 ]`**, **`[ 1 ]`**.
  - Empat kartu pasangan di kanan: **`[ 4 ]`**, **`[ 1 ]`**, **`[ 5 ]`**, **`[ 3 ]`**.
  - Anak memasangkan dua kartu yang jika digabungkan berjumlah **`6`**:
    - `5` berpasangan dengan `1`
    - `2` berpasangan dengan `4`
    - `3` berpasangan dengan `3`
    - `1` berpasangan dengan `5`
- **Teks Pendek Tupai (`pendek`):** `"Cari teman pasangan angkanya!"`
- **`bantuan`:** *"Ketuk satu kartu, lalu ketuk kartu pasangannya supaya jika digabungkan jumlahnya tepat sesuai target di atas!"*
- **Pesan Benar:** *"Cocok! Dua bilangan itu adalah pasangan yang tepat."*
- **Pesan Salah:** *"Belum cocok. Coba hitung gabungan kedua kartunya."*
- **Suara Guru:** *"Ayo pasangkan dua bilangan! Di putaran pertama cari dua bilangan yang jumlahnya lima. Di putaran kedua cari dua bilangan yang jumlahnya enam."*

### Kegiatan 5 · Cerita HOTS: Mobil-mobilan Upe & Kelereng Malosi (Dengan Suara — Buku Siswa Hlm. 35 No. 5 & Hlm. 38 No. 6)
Mengangkat langsung **dua soal HOTS bertanda Bunga Matahari** dari Buku Siswa:
- **Adegan & Cerita:**
  - *"Upe mempunyai 8 sepeda mainan. Upe sudah mencoba memisahkannya menjadi 3 dan 5, lalu 2 dan 6. Sekarang Upe ingin memisahkan 8 sepeda itu ke dua garasi dengan jumlah yang SAMA BANYAK (kembar)!"*
- **Langkah Interaktif 1 (Tombol Aksi):**
  - Anak menekan tombol **`🚲 Bagi 8 Sama Banyak ke Dua Garasi`**. Benda bergerak terbagi rata ke garasi kiri (`4`) dan garasi kanan (`4`).
- **Langkah Interaktif 2 (Tugas Suara):**
  - *"Jawab dengan suara: berapa isi masing-masing garasi supaya 8 terbagi sama banyak?"* → **Kunci Suara: `4` (Empat)**.
- **Langkah Interaktif 3 (Tantangan HOTS Pohon Kelereng Malosi — Buku Siswa hlm. 38 No. 6):**
  - Setelah suara diterima, muncul tantangan lanjutan:
    *"Sekarang bantu Malosi! Malosi memisahkan 8 kelereng menjadi 5 dan 3. Kelompok 3 kelereng dipisahkan lagi menjadi 2 dan berapa?"*
  - Tombol pilihan: **`1`**, **`2`**, atau **`3`** → **Kunci Pilihan: `1`**.
- **Teks Pendek Tupai (`pendek`):** `"Bantu Upe dan Malosi!"`
- **Suara Guru:** *"Upe ingin membagi delapan mainannya menjadi dua kelompok yang sama banyak. Tekan tombolnya, ucapkan jumlahnya, lalu bantu Malosi menyelesaikan pohon kelerengnya!"*

### Kegiatan 6 · Menulis Pasangan Bilangan di Kanvas (Kanvas Titik-Titik, Tanpa Suara — Buku Siswa Hlm. 37 No. 4)
- **Visual di Meja:** Diagram pasangan bilangan dari Evaluasi Buku Siswa hlm. 37 No. 4:
  - Wadah **Gabungan** berisi **9 balon** (`9`).
  - Wadah **Sebagian kiri** berisi **4 balon** (`4`).
  - Wadah **Sebagian kanan** berisi **5 balon** dengan lambang angka masih bertanda **`[ ? ]`**.
- **Perintah:** *"Sembilan balon dipisahkan menjadi 4 dan berapa? Tulis angka dan katanya di kanvas!"*
- **Kanvas (`DottedNumberTracingCanvas`):** Angka di atas, kata di bawah.
- **Kunci Kanvas:** **`5` (`Lima`)**.
- **`bantuan`:** *"Hitung balon di wadah kanan yang melengkapi 4 menjadi 9, lalu tebalkan angka 5 dan kata Lima di kanvas!"*
- **Pesan Lulus:** *"Tulisanmu rapi dan tepat! Sembilan terdiri dari empat dan lima."*
- **Suara Guru:** *"Lihat sembilan balon yang dipisahkan menjadi empat dan satu kelompok lagi. Hitung kelompok kedua, lalu tulis angka dan katanya di kanvas."*

### Kegiatan 7 · Laboratorium Simulasi Pasangan Bilangan (3 Mode Eksplorasi Mandiri di Dalam Materi)
Sesuai aturan `.cursorrules` bahwa **Simulasi berada langsung di dalam Materi**, sebelum berpindah ke tahap Pictorial siswa dapat bereksplorasi bebas di **Laboratorium Pasangan Bilangan** yang memiliki **3 Tab Permainan**:
1. **Tab 1 (`🌿 Pemecah Pasangan 2–10` — Eksplorasi Upe Buku hlm. 35):**
   - Siswa dapat memilih bilangan induk **Gabungan** (`5, 6, 7, 8, 9, 10`).
   - Siswa mengetuk tombol **`⬅️ Pindah ke Kiri`** atau **`➡️ Pindah ke Kanan`** untuk memindahkan benda nyata antar-cabang secara *real-time*.
   - Setiap kombinasi pasangan baru yang ditemukan (misalnya untuk `8`: `0 & 8`, `1 & 7`, `2 & 6`, `3 & 5`, `4 & 4`, dst.) langsung tercatat sebagai lencana bintang di bawah meja!
2. **Tab 2 (`🔟 Bingkai 10 & Pasangan` — Proyek *Ayo Berkarya* Buku Siswa hlm. 38–39):**
   - Siswa memilih jumlah keping kuning emas dan keping biru ungu di dalam **Bingkai 10**.
   - Layar langsung memperlihatkan bagaimana Bingkai 10 tersebut terhubung dengan diagram **Pasangan Bilangan**, lambang bilangan, dan pembacaan suaranya.
3. **Tab 3 (`🌳 Pohon 2 Tingkat Malosi` — HOTS Buku Siswa hlm. 38 No. 6):**
   - Siswa bebas menguji pemecahan 2 tingkat untuk bilangan `6, 8, 9, 10` (memecah lingkaran puncak menjadi 2 cabang tengah, lalu memecah cabang tengah menjadi 4 ranting bawah) dan mendengar Suara Guru membacakan hasilnya.

Tombol akhir Tahap 4: **`LANJUTKAN KE PICTORIAL ⬇️`**.

---

## Tahap 5 · `[P]` Pictorial (4 Kartu Diagram di Buku Gambar Bergaris)

- **Dunia Visual:** Kertas buku gambar bergaris (`GAYA_KERTAS`) dengan spiral di atas (`SpiralBuku`) dan catatan tempel kuning (`CatatanTempel`).
- **Aturan Pedagogis:** Rangkaian kesimpulan pasangan bilangan baru muncul **setelah jawaban suara anak diterima**, sehingga tidak membocorkan jawaban di awal.

| Kartu | Jenis Diagram | Tampilan Diagram di Layar | Tugas Interaksi & Suara Anak | Kanvas | Kesimpulan yang Terbuka Setelah Benar |
|---|---|---|---|---|---|
| **P1** | **Diagram Lingkaran Titik (Memisahkan 7)** | Lingkaran Gabungan berisi `7` titik; cabang kiri berisi `3` titik; cabang kanan kosong `[ ? ]` | Ketuk cabang kanan untuk mengisi titik satu per satu sampai pas (`4` titik), lalu ucapkan bilangannya (**Kunci: `4`**) | Tidak | `7` dipisahkan menjadi `3` dan `4` (*"Tujuh terdiri dari tiga dan empat."*) |
| **P2** | **Diagram Lingkaran Titik (Menggabungkan 3 dan 6)** | Cabang kiri berisi `3` titik; cabang kanan berisi `6` titik; lingkaran Gabungan kosong `[ ? ]` | Ketuk tombol gabungkan untuk mengisi lingkaran Gabungan sampai pas (`9` titik), lalu ucapkan bilangannya (**Kunci: `9`**) | Tidak | `3` dan `6` digabungkan menjadi `9` (*"Tiga dan enam digabungkan menjadi sembilan."*) |
| **P3** | **Diagram Batang Dua Warna (Pasangan 8)** | Batang utuh `8` petak di atas; di bawahnya batang kuning `5` petak disambung petak kosong `[ ? ]` | Ketuk petak kosong sampai panjang kedua batang sama persis (`3` petak biru), ucapkan lalu tulis di kanvas (**Kunci: `3 Tiga`**) | Ya: **`3 Tiga`** | `8` terdiri dari `5` dan `3` (*"Delapan dipisahkan menjadi lima dan tiga."*) |
| **P4** | **Bingkai 10 Pasangan Bilangan (Pasangan 10)** | Bingkai 10 berisi `6` bulatan kuning emas dan `4` petak kosong berbingkai putus-putus | Ketuk petak kosong pada Bingkai 10 sampai penuh (`4` bulatan biru), lalu ucapkan jumlah bulatan biru yang melengkapi `6` menjadi `10` (**Kunci: `4`**) | Tidak | `10` terdiri dari `6` dan `4` (*"Enam dan empat adalah pasangan bilangan sepuluh."*) |

### Detail Panduan Kartu Pictorial:
- **P1 · Memisahkan 7 menjadi 3 dan 4 (Buku Siswa hlm. 30 & 31):**
  - `pendekBantu`: `"Isi titik di cabang kanan!"`
  - `bantuan`: *"Tujuh titik dipisahkan menjadi 3 di kiri dan sisanya di kanan. Tambahkan titik di cabang kanan sampai pas, lalu ucapkan jumlahnya."*
  - `suara`: *"Lihat diagram pasangan bilangan tujuh. Cabang kiri sudah berisi tiga titik. Isi cabang kanan sampai jumlah keduanya tujuh, lalu ucapkan isi cabang kanan."*
- **P2 · Menggabungkan 3 dan 6 menjadi 9 (Buku Siswa hlm. 31 & 37):**
  - `pendekBantu`: `"Gabungkan ke lingkaran induk!"`
  - `bantuan`: *"Cabang kiri ada 3 titik dan cabang kanan ada 6 titik. Kumpulkan semuanya ke lingkaran Gabungan, lalu ucapkan jumlah semuanya."*
  - `suara`: *"Tiga titik dan enam titik akan digabungkan. Isi lingkaran Gabungan sampai sesuai dengan jumlah kedua cabangnya, lalu ucapkan bilangannya."*
- **P3 · Diagram Batang Pasangan 8 (5 dan 3 — Buku Siswa hlm. 31 & 35):**
  - `pendekBantu`: `"Lengkapi batang pasangan 8!"`
  - `bantuan`: *"Batang atas panjangnya 8 petak. Batang bawah baru terisi 5 petak. Tambahkan petak sisa sampai sejajar, ucapkan jumlah petak tambahannya, lalu tulis di kanvas."*
  - `suara`: *"Lihat diagram batang untuk bilangan delapan. Lima petak sudah diwarnai. Warnai sisa petaknya supaya sama panjang dengan delapan, lalu ucapkan dan tulis jumlah petak sisanya."*
- **P4 · Bingkai 10 Pasangan 6 dan 4 (*Ayo Berkarya* Buku Siswa hlm. 38):**
  - `pendekBantu`: `"Penuhkan Bingkai 10!"`
  - `bantuan`: *"Bingkai 10 sudah punya 6 bulatan kuning. Ketuk kotak yang masih kosong untuk mengisinya dengan bulatan biru, lalu ucapkan berapa bulatan biru yang kamu tambahkan."*
  - `suara`: *"Enam bulatan kuning sudah ada di Bingkai Sepuluh. Penuhkan kotak yang tersisa dengan bulatan biru, lalu ucapkan berapa pasangan dari enam supaya menjadi sepuluh."*

Tombol akhir Tahap 5: **`LANJUTKAN KE ABSTRACT ⬇️`**.

---

## Tahap 6 · `[A]` Abstract (3 Kartu Lambang Murni di Buku Tulis Kotak-Kotak + Poin Penting)

- **Dunia Visual:** Kertas buku tulis kotak-kotak (`GAYA_KOTAK`) dengan satu baris tulisan pensil (`CatatanPensil`).
- **Tanpa gambar benda dan tanpa simbol `+` / `-` / `=`.** Setiap kartu menampilkan **Diagram Pasangan Bilangan Angka Murni** (lingkaran induk dan dua lingkaran cabang yang dihubungkan garis) dengan satu lingkaran bertanda `?` dan 3 tombol pilihan angka di bawahnya.
- **Alur Interaksi:** Anak memilih tombol angka yang tepat untuk mengisi lingkaran `?` → tombol rekam suara aktif → anak mengucapkan bilangan tersebut → kartu L3 membuka kanvas tulis **`3 Tiga`**.

| Kartu | Jenis Soal Lambang | Struktur Diagram Angka di Layar | Pilihan Tombol Angka | Kunci Pilih & Suara | Kanvas | Kalimat yang Terbuka Setelah Selesai |
|---|---|---|---|---|---|---|
| **L1** | **Mencari Sebagian (Uraikan 7)** | Induk **`7`** bercabang ke **`2`** dan **`[ ? ]`** *(Buku Siswa hlm. 31)* | `4` · `5` · `6` | **`5` (Lima)** | Tidak | *"Tujuh dipisahkan menjadi dua dan lima. Dua dan lima adalah pasangan bilangan tujuh."* |
| **L2** | **Mencari Gabungan (Gabungkan 6 dan 4)** | Cabang **`6`** dan **`4`** bergabung ke induk **`[ ? ]`** | `8` · `9` · `10` | **`10` (Sepuluh)** | Tidak | *"Enam dan empat digabungkan menjadi sepuluh. Enam dan empat adalah pasangan bilangan sepuluh."* |
| **L3** | **Pohon Pasangan 2 Tingkat (HOTS Buku Siswa hlm. 38 No. 6)** | Puncak **`8`** bercabang ke **`5`** dan **`3`**; cabang **`5`** bercabang lagi ke **`2`** dan **`[ ? ]`** | `2` · `3` · `4` | **`3` (Tiga)** | Ya: **`3 Tiga`** | *"Delapan dipisahkan menjadi lima dan tiga. Lalu lima dipisahkan lagi menjadi dua dan tiga!"* |

### Detail Panduan & Umpan Balik Tahap 6 (Abstract):
- **`bantuan`:**
  - **L1:** *"Tujuh dipisahkan menjadi 2 dan berapa? Pilih angkanya, lalu ucapkan sekali."*
  - **L2:** *"Enam dan empat digabungkan menjadi berapa? Pilih angkanya, lalu ucapkan sekali."*
  - **L3:** *"Pada pohon pasangan Malosi, 8 dipisahkan menjadi 5 dan 3. Lalu 5 dipisahkan menjadi 2 dan berapa? Pilih angkanya, ucapkan, dan tulis di kanvas."*
- **Suara Guru (Tanpa Membocorkan Kunci):**
  - **L1:** *"Lihat pasangan bilangan tujuh. Satu cabangnya berisi angka dua. Pilih angka yang tepat untuk cabang pasangannya, lalu ucapkan."*
  - **L2:** *"Dua cabang berisi angka enam dan angka empat. Pilih hasil gabungannya untuk mengisi lingkaran induk, lalu ucapkan."*
  - **L3:** *"Ini pohon pasangan dua tingkat milik Malosi. Delapan diuraikan menjadi lima dan tiga. Sekarang uraikan angka lima menjadi dua dan satu bilangan lagi. Pilih angkanya, ucapkan, lalu tebalkan di kanvas."*
- **Pesan Umpan Balik Salah:**
  - **L1:** *"Belum tepat. Ingat, jika 2 digabungkan dengan bilangan itu, hasilnya harus 7."*
  - **L2:** *"Belum tepat. Gabungkan 6 dengan 4: hitung maju empat langkah dari enam."*
  - **L3:** *"Belum tepat. Perhatikan lingkaran 5 yang bercabang menjadi 2 dan kotak kosong. Pasangan 2 supaya jadi 5 adalah berapa?"*

---

## Kartu Poin Penting (Ringkasan Akhir Sub-Bab D & Penutup Materi Bab 1 dengan Suara Guru)

Ditampilkan setelah kartu `L3` selesai sebelum tombol penutup Sub-Bab D:

1. `🟡` **Gabungan dan Sebagian:** Lingkaran induk memuat jumlah **Gabungan (Semua)**, sedangkan dua lingkaran cabangnya memuat jumlah **Sebagian** dan **Sebagian**.
2. `↙️` **Satu Bilangan Bisa Dipisahkan:** Contohnya `5` dapat dipisahkan menjadi `2 dan 3`, atau `4 dan 1`.
3. `↘️` **Dua Bilangan Bisa Digabungkan:** Contohnya `3 dan 4` jika digabungkan menjadi `7`.
4. `🔟` **Pasangan Penggenap 10:** Pasangan dua bilangan yang menghasilkan `10` adalah `1 dan 9`, `2 dan 8`, `3 dan 7`, `4 dan 6`, serta `5 dan 5`.

**Suara Guru Poin Penting:**
> *"Ingat selalu empat poin penting pasangan bilangan! Pertama, lingkaran induk adalah Gabungan dan dua cabangnya adalah Sebagian. Kedua, satu bilangan bisa dipisahkan menjadi dua bagian. Ketiga, dua bagian bisa digabungkan menjadi satu bilangan. Keempat, satu bilangan mempunyai banyak pasangan berbeda, seperti pasangan sepuluh yaitu satu dan sembilan, dua dan delapan, tiga dan tujuh, empat dan enam, serta lima dan lima!"*

Tombol akhir Sub-Bab D: **`SELESAIKAN MATERI & LANJUTKAN ➡️`**.

---

## Tabel Verifikasi Kunci Jawaban & Akurasi Kurikulum Sub-Bab D (Telah Diperiksa)

| Tahap | Kode / Kegiatan | Rujukan Buku Siswa / Guru | Konteks Soal / Interaksi | Kunci Jawaban | Verifikasi Matematika |
|---|---|---|---|---|---|
| **Story** | `D-S1` | Buku Siswa hlm. 29 | 5 kue Kira dipisahkan (donat & bolu) | `5` → `2` dan `3` | 2 donat dan 3 bolu berjumlah 5 kue |
| **Story** | `D-S2` | Buku Siswa hlm. 30 | Bola Halim (`3`) dan Wei (`4`) digabungkan | `3` dan `4` → `7` | 3 bola hijau dan 4 bola merah berjumlah 7 bola |
| **Story** | `D-S3` | Buku Siswa hlm. 35 No. 5 (HOTS) | 8 mobil-mobilan Upe dibagi ke 2 garasi | `(3,5)`, `(2,6)`, `(4,4)`, `(1,7)` | Semua pasangan berjumlah 8 |
| **Story** | `D-S4` | Buku Siswa hlm. 38 No. 6 (HOTS) | Pohon 2 tingkat 8 kelereng Malosi | `8` → `5 & 3` → `(2 & 3)` dan `(2 & 1)` | `2+3=5`, `2+1=3`, `5+3=8` (tanpa simbol `+` di layar) |
| **Concrete 1** | Memisahkan Benda | Buku Siswa hlm. 29–30 | Putaran 1: `5` (`2` dan `?`); Putaran 2: `7` (`3` dan `?`) | Suara: **`3`** lalu **`4`** | `5` terdiri dari `2 & 3`; `7` terdiri dari `3 & 4` |
| **Concrete 2** | Menggabungkan Benda | Buku Siswa hlm. 30–31 | Putaran 1: `4` dan `2`; Putaran 2: `5` dan `3` | Suara: **`6`** lalu **`8`** | `4 & 2` menjadi `6`; `5 & 3` menjadi `8` |
| **Concrete 3** | Lengkapi Cabang | Buku Siswa hlm. 31 No. 1 | P1: `8` (`5`,`?`); P2: `9` (`?`,`6`); P3: `7` (`2`,`?`) | Seret: **`3`**; **`3`**; **`5`** | Sesuai Kunci Buku Guru hlm. 42 |
| **Concrete 4** | Pasangkan Dua Angka | Buku Siswa hlm. 33 No. 3 & hlm. 34 No. 4 | Putaran 1: Jumlah `5`; Putaran 2: Jumlah `6` | P1: `(1,4),(2,3),(3,2),(4,1)`; P2: `(5,1),(2,4),(3,3),(1,5)` | Sesuai Kunci Buku Guru hlm. 42 |
| **Concrete 5** | Cerita HOTS Upe & Malosi | Buku Siswa hlm. 35 No. 5 & hlm. 38 No. 6 | Bagi `8` sama banyak; Pohon Malosi `3` → `2` dan `?` | Suara: **`4`**; Pilihan: **`1`** | `4` dan `4` sama banyak (`8`); `3` diurai jadi `2` dan `1` |
| **Concrete 6** | Kanvas Menulis | Buku Siswa hlm. 37 Evaluasi No. 4 | `9` balon dipisahkan menjadi `4` dan `?` | Kanvas: **`5 Lima`** | `9` terdiri dari `4` dan `5` |
| **Pictorial** | `P1` | Buku Siswa hlm. 30 & 31 | Diagram titik `7` → `3` dan `[ ? ]` | Ketuk 4 titik + Suara: **`4`** | `7` terdiri dari `3` dan `4` |
| **Pictorial** | `P2` | Buku Siswa hlm. 31 & 37 | Diagram titik `3` dan `6` → `[ ? ]` | Gabung 9 titik + Suara: **`9`** | `3` dan `6` digabung menjadi `9` |
| **Pictorial** | `P3` | Buku Siswa hlm. 31 & 35 | Diagram batang `8` → `5` dan `[ ? ]` + Kanvas | Suara & Kanvas: **`3 Tiga`** | `8` terdiri dari `5` dan `3` |
| **Pictorial** | `P4` | Buku Siswa hlm. 38 (*Ayo Berkarya*) | Bingkai 10: `6` kuning dan `[ ? ]` biru = `10` | Isi 4 biru + Suara: **`4`** | `10` terdiri dari `6` dan `4` |
| **Abstract** | `L1` | Buku Siswa hlm. 31 | `7` → `2` dan `[ ? ]` | Pilih & Suara: **`5`** | `7` terdiri dari `2` dan `5` |
| **Abstract** | `L2` | Buku Siswa hlm. 38 | `6` dan `4` → `[ ? ]` | Pilih & Suara: **`10`** | `6` dan `4` digabung menjadi `10` |
| **Abstract** | `L3` | Buku Siswa hlm. 38 No. 6 (HOTS) | `8` → (`5` dan `3`), `5` → (`2` dan `[ ? ]`) + Kanvas | Pilih, Suara, & Kanvas: **`3 Tiga`** | Pada pohon Malosi, `5` diurai menjadi `2` dan `3` |
