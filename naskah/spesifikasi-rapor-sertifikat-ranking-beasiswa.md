# Cetak Biru & Naskah Spesifikasi Halaman `/rapor` dan `/ranking` (3 Menu Utama IGIL)

Dokumen ini disusun oleh **Meja Naskah & Kurikulum (`Gemini 4 Argon`)** sebagai kontrak spesifikasi dan sumber data statis (`src/data/rapor-dan-ranking.json`) untuk dieksekusi oleh:
- **Meja Visual, SVG & Animasi (`Claude Sonnet`)** pada `src/components/Navbar.tsx`, `src/app/rapor/page.tsx`, dan `src/app/ranking/page.tsx`.
- **Meja Mesin Backend & Keamanan (`Grok 4.7`)** pada fungsi RPC PostgreSQL (`SECURITY DEFINER`), kebijakan RLS `SELECT`-only, dan jadwal `pg_cron` akhir bulan.

---

## 1. Struktur Navigasi Utama (`src/components/Navbar.tsx`)

Navbar menggunakan **3 Menu Utama** yang ringkas dan jelas:
1. **`📚 Ruang Belajar`** (`/ruang-belajar`) — Gerbang Aktivasi Otak (1x setiap 6 jam) + Modul Belajar 5 Tab Komponen berbasis SMICPA.
2. **`📊 Rapor & Sertifikat`** (`/rapor`) — Portofolio akademik pribadi anak, rincian token (30/70/50), status *Hidden Grading* Praktikum, dan pencetakan **Sertifikat Kelulusan Digital** (biaya server Rp 0).
3. **`🏆 Ranking & Beasiswa`** (`/ranking`) — Papan Peringkat Nasional (Kelas 1–6 SD), transparansi dana **Kolam Beasiswa 90:10**, dan **Laporan Penyaluran Beasiswa Bulanan**.

### Aturan Warna Wajib (`.cursorrules` Bagian 3)
- **Biru Ungu Royal** (`from-indigo-900 via-violet-900 to-indigo-950`, `#1C01A5`, `text-indigo-950`) untuk kerangka header, pita status, dan bingkai utama sertifikat.
- **Kuning Emas** (`bg-amber-400`, `text-amber-300`, `#F0AB00`, `#FFE566`) untuk tombol aksi utama (CTA), lencana token emas, medali peringkat, dan segel keaslian sertifikat.
- **Putih Bersih** (`bg-white`, `bg-indigo-50/40`) untuk latar ruang baca, tabel rapor, dan kartu laporan beasiswa.

---

## 2. Spesifikasi Halaman 1: `📊 Rapor & Sertifikat` (`src/app/rapor/page.tsx`)

Halaman `/rapor` memiliki **2 Sub-Tab Internal**:
- **Sub-Tab 1: `📋 Rapor Ketuntasan & Token`**
- **Sub-Tab 2: `🎓 Sertifikat Kelulusan Digital`**

### A. Sub-Tab 1: `📋 Rapor Ketuntasan & Token`
1. **Kartu Ringkasan Dompet Token & Status Kualifikasi Bulanan:**
   - Menampilkan nama siswa, kelas, kota/daerah (dibaca dari profil lokal `localStorage` / sesi Supabase).
   - Menampilkan akumulasi **Token Kualifikasi Bulan Berjalan**:
     - Latihan Terbimbing: `30 Token` per bab.
     - Ujian Mandiri (Lulus 100%): `70 Token` per bab.
     - Praktikum Sintesis Lintas-4-Bab: `50 Token` per blok 4 bab.
     - Konversi nilai edukatif: `1 Token = Rp 500` (`150 Token = Rp 75.000` per bab).
   - Menampilkan informasi jelas: *"Token kualifikasi di-reset ke 0 setiap akhir bulan saat pengumuman beasiswa, tetapi status ketuntasan bab dan Sertifikat Kelulusanmu tersimpan selamanya!"*

2. **Tabel / Kartu Ketuntasan Per Bab (5 Komponen Modul):**
   - Menampilkan daftar bab pada kelas siswa beserta status:
     - **Silabus & Materi SMICPA:** Persentase / checklist Sub-Bab `A, B, C, D`.
     - **Latihan (30 Token):** Skor latihan & status klaim token.
     - **Ujian Mandiri (70 Token):** Skor terbaik, jumlah percobaan, dan syarat mutlak **100/100** untuk membuka Praktikum.
     - **Lencana "Si Paling Pintar":** Menyala emas apabila siswa lulus Ujian **100% pada percobaan pertama** dengan validasi sensor wajah lokal (`MediaPipe` — tepat 1 wajah valid di browser tanpa unggah video ke server).

3. **Panel Status Penilaian Praktikum (*On-Submit Hidden Grading*):**
   - Menjelaskan 4 parameter penilaian AI satu kali saat tombol *"Serahkan Praktikum"* ditekan:
     1. **Akurasi Jawaban & Perhitungan (30%)**
     2. **Sintesis Lintas-4-Bab (25%)**
     3. **Kemandirian Belajar (20%)**
     4. **Penalaran & Alasan Logis (25%)**
   - Selama bulan berjalan (`is_hidden = true`), skor ditampilkan dengan lencana **`🔒 Rahasia hingga Pengumuman Akhir Bulan`** agar tidak memicu kecurangan atau percobaan berulang yang membebani biaya API. Saat akhir bulan tiba (`is_hidden = false`), rincian keempat skor terbuka otomatis.

---

### B. Sub-Tab 2: `🎓 Sertifikat Kelulusan Digital` (100% Client-Side = Biaya Server Rp 0)
1. **Syarat Pembukaan Kunci Sertifikat:**
   - **Sertifikat Blok (Per 4 Bab):** Terbuka otomatis setelah siswa lulus Ujian 100% pada 4 bab berurutan dan menyerahkan 1 Praktikum Sintesis.
   - **Sertifikat Kelulusan Tingkat Kelas (Fase Kurikulum Merdeka):** Terbuka setelah seluruh bab pada kelas tersebut tuntas 100%.
   - Tersedia **Mode Pratinjau Sertifikat** bagi siswa yang sedang mengejar target agar termotivasi menyelesaikan bab.

2. **Komponen Visual Sertifikat Digital (Dirender via HTML5 Canvas / Print CSS):**
   - **Header Resmi:** Logo Burung Hantu IGIL + tajuk *"SERTIFIKAT KELULUSAN & KETUNTASAN KOMPETENSI KURIKULUM MERDEKA"*.
   - **Identitas Penerima:** Nama Lengkap Siswa, Kelas, Kota/Daerah, dan Tanggal Ketuntasan.
   - **Daftar Kompetensi Terverifikasi (`skillsVerified`):** Poin-poin Capaian Pembelajaran (CP) yang telah dikuasai dengan predikat **LULUS SEMPURNA (100%)**.
   - **Segel Emas & Kode Verifikasi Unik (`IGIL-CERT-[TAHUN][BULAN]-[HASH]`):** Dihasilkan secara deterministik dari ID siswa + ID blok bab sehingga bebas biaya database tambahan namun tetap dapat diverifikasi.
   - **Dua Tombol Aksi Instan (Biaya Server Rp 0):**
     - `🖨️ Cetak / Simpan PDF` (memanggil `window.print()` dengan `@media print` khusus sertifikat A4 *landscape* atau generator gambar Canvas).
     - `🖼️ Unduh Gambar Sertifikat (.PNG)` (merender sertifikat ke elemen `<canvas>` resolusi tinggi di browser lalu mengunduhnya langsung ke perangkat siswa/orang tua).

---

## 3. Spesifikasi Halaman 2: `🏆 Ranking & Beasiswa` (`src/app/ranking/page.tsx`)

Halaman `/ranking` menggabungkan **Papan Peringkat Nasional** dan **Laporan Penyaluran Beasiswa** dalam **2 Sub-Tab Internal**:
- **Sub-Tab 1: `🥇 Peringkat Nasional Bulanan`**
- **Sub-Tab 2: `🤝 Laporan Penyaluran Beasiswa (90:10)`**

### A. Sub-Tab 1: `🥇 Peringkat Nasional Bulanan`
1. **Banner Posisi Siswa & Hitung Mundur Akhir Bulan:**
   - Menampilkan peringkat pengguna saat ini, total Token Kualifikasi Bulan Ini (`Latihan + Ujian + Praktikum`), jumlah lencana **"Si Paling Pintar"**, serta waktu menuju penutupan siklus bulanan (`pg_cron` akhir bulan).
2. **Filter Jenjang Kelas:**
   - Tombol filter cepat: `Semua Kelas`, `Kelas 1 SD`, `Kelas 2 SD`, `Kelas 3 SD`, `Kelas 4 SD`, `Kelas 5 SD`, `Kelas 6 SD`.
3. **Tabel Papan Peringkat Nasional:**
   - Kolom: **Peringkat (Medali Emas/Perak/Perunggu untuk Top 3)**, **Nama Siswa & Kota/Provinsi**, **Kelas**, **Lencana Si Paling Pintar (🌟)**, **Status Praktikum**, dan **Total Token Bulanan**.
   - Catatan penentu kemenangan akhir bulan: *"Pada akhir bulan, peringkat pemenang beasiswa ditentukan dari gabungan Token Kualifikasi Bulanan (30/70/50), lencana Si Paling Pintar (lulus 100% percobaan pertama dengan kamera valid 1 wajah), dan pembukaan skor tersembunyi Praktikum (Hidden Grading)."*

---

### B. Sub-Tab 2: `🤝 Laporan Penyaluran Beasiswa (90:10)`
1. **Panel Transparansi Ekonomi Sosial IGIL (Skema 90:10 + Plafon Hidup Layak):**
   - Menampilkan diagram visual proporsi dana langganan secara jujur dan mudah dipahami orang tua:
     - **90% Kolam Beasiswa Utama:** Langsung masuk ke dana beasiswa siswa berprestasi.
     - **10% Kolam Operasional:** Dipakai hanya untuk biaya server riil (sangat rendah berkat sistem *Generate Once, Cache Forever*) dan plafon biaya hidup layak bulanan founder. **100% surplus sisanya otomatis dilimpahkan kembali ke Kolam Beasiswa.**
   - Menampilkan kartu metrik bulan berjalan:
     - *Dana Langsung 90%*
     - *Biaya Server Riil & Operasional*
     - *Surplus Operasional yang Dikembalikan ke Beasiswa*
     - *Total Kolam Beasiswa Aktif Bulan Ini (Rupiah & Ekuivalen Token)*

2. **Tabel Arsip & Laporan Penerima Beasiswa Bulanan:**
   - Menampilkan laporan per periode bulan (mis. `Oktober 2026 — Status: TELAH DISALURKAN 100%`).
   - Daftar penerima beasiswa lengkap dengan: **Nama Siswa**, **Kelas**, **Kota/Provinsi**, **Total Token**, **Skor Akhir Praktikum (yang telah dibuka di akhir bulan)**, **Nominal Beasiswa**, dan **Kode Bukti Penyaluran (`IGIL-BEA-...`)**.

---

## 4. Kontrak Keamanan Supabase untuk Meja Backend (`Grok 4.7`)

1. **Row Level Security (RLS) Mutlak `SELECT`-Only:**
   - Klien browser pada `/rapor` dan `/ranking` HANYA melakukan query `SELECT` (atau membaca cache lokal).
   - Penambahan token (`30`/`70`/`50`), pencatatan kelulusan Ujian `100%`, penyimpanan skor *Hidden Grading* (`is_hidden = true`), dan penerbitan kode sertifikat WAJIB melalui fungsi PostgreSQL RPC (`SECURITY DEFINER`).
2. **Siklus `pg_cron` Akhir Bulan:**
   - Membuka kunci `is_hidden = false` pada penilaian Praktikum bulan tersebut.
   - Mengurutkan dan mengunci pemenang ke tabel arsip laporan beasiswa (`laporan_beasiswa_bulanan`).
   - Me-reset kolom `monthly_tokens` kembali ke `0` untuk siklus bulan baru tanpa menyentuh tabel `progres_bab_siswa` dan `sertifikat_siswa`.
