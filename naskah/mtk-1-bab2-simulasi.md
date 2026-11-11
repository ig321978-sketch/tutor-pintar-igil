# Matematika Kelas 1 Bab 2 (Penjumlahan sampai 10): SMISCPA

Bab ketiga yang memakai alur SMISCPA, setelah Bab 8 (pilot) dan Bab 1. Simulasi ada di dalam Materi (tahap 4), tab Simulasi tidak ada lagi untuk bab ini. Mind-Map dan Infografis dibaca dari `src/data/kelas1-bab2-ringkas.json`. Komponen: `src/components/modul/SimulasiBab2.tsx` (`SimulasiBab2Materi`, `misiAwalBab2`) memakai `SimulasiTambah.tsx` (Laboratorium Penjumlahan), `SimulasiMesinTambah.tsx`, dan `SimulasiSkenario.tsx` (`SKENARIO_BAB2`, Kantin Sekolah) yang sudah ada.

Tiga sub-bab mengikuti `src/data/kelas1-bab2.json`.

| Sub-bab | Isi | Simulasi (urut) |
| --- | --- | --- |
| A. Cerita Penjumlahan | menggabungkan, bertambah (datang lagi), menulis dan membaca kalimat + dan = | 1. Laboratorium Penjumlahan (benda, bingkai, kalimat); 2. Mesin Tambah |
| B. Berbagai Cara | pasangan bilangan dan tukar tempat, hitung maju, kembar (penjumlahan berulang), pasangan sepuluh | 1. Laboratorium Penjumlahan (benda, kalimat, bagan, tukar tempat); 2. Hitung Maju dan Sepuluh (kalimat, garis bilangan, bingkai) |
| C. Soal Cerita | tiga bagian soal, kata petunjuk tambah, kalimat penyelesaian, jawaban lengkap, memeriksa | 1. Periksa Jawabanmu (benda, kalimat, garis bilangan, tukar tempat); 2. Kantin Sekolah |

Semua langkah `mode: "sentuh"`: tombol lanjut aktif setelah simulasinya disentuh sekali.

## Laboratorium Penjumlahan: alat dibuka bertahap

`SimulasiTambah` kini menerima `tampil`: `benda`, `kalimat`, `bingkai`, `garis`, `bagan`, dan `tukar` (tombol Tukar tempat beserta kalimat tukarnya). Alat yang tidak ada di `tampil` tidak pernah muncul, dan kartu "Coba ini!" serta ucapan guru dibuat dari alat yang tampil. Tab lama memakai semua alat (bawaan). Pembagian:

- Sub-Bab A: tanpa Tukar tempat, garis bilangan, dan bagan. Ketiganya baru diajarkan di Sub-Bab B.
- Sub-Bab B, simulasi 1: tanpa garis bilangan dan bingkai; simulasi 2 tanpa benda dan tukar tempat, supaya fokus pada hitung maju dan pasangan sepuluh.
- Sub-Bab C: memakai alat yang sudah dikenal untuk memeriksa jawaban (tukar tempat dan hitung maju), sesuai langkah terakhir soal cerita.

## Misi tiap simulasi

| Simulasi | Misi |
| --- | --- |
| A, Laboratorium Penjumlahan | Tekan plus pada kelompok biru. Lihat kalimat penjumlahannya ikut berubah. |
| A, Mesin Tambah | Tekan Terima pesanan. Lalu isi Kotak A sesuai pesanan. |
| B, Laboratorium Penjumlahan | Tekan Tukar tempat. Lihat jumlahnya, apakah berubah? |
| B, Hitung Maju dan Sepuluh | Tekan plus pada kelompok biru. Lihat lompatan di garis bilangan. |
| C, Periksa Jawabanmu | Hitung maju dari bilangan merah di garis bilangan. Cocokkah dengan jumlahnya? |
| C, Kantin Sekolah | Tekan Ayo ke kantin! Lalu bantu Rani menghitung kuenya. |

## Mind-Map dan Infografis

Tiap sub-bab: satu peta (pusat, 4 cabang, 8 kartu) dan satu infografis (3 panel). Isinya hanya merangkum yang diajarkan sub-bab itu.

- **A:** cabang Digabung, Datang lagi, Tulis, Baca. Infografis: Digabung atau datang lagi (banding), Kalimat penjumlahan (tanda + dan =), Tiga cara menunjukkan 4 + 2 (benda, bingkai, goresan). Goresan boleh muncul di sini karena memang diajarkan di Picture Sub-Bab A.
- **B:** cabang Pasangan, Hitung maju, Kembar, Jadi sepuluh. Infografis: Ditukar, jumlahnya sama? (banding), Dua cara lain (hitung maju dan kembar), Pasangan sepuluh (8+2, 9+1, 7+3).
- **C:** cabang Baca, Tulis, Jawab, Periksa. Infografis: Tiga bagian soal cerita, Kata petunjuk tambah, Dari cerita ke jawaban.
- Diagram benda memakai merah untuk yang ada dan biru untuk yang datang lagi, sama dengan aturan Picture.
- Emoji hanya yang sampai Emoji 12. Tokoh Pak Rudi di Kantin Sekolah diganti dari 🧑‍🍳 (Emoji 12.1, pecah menjadi dua gambar di Windows 10) menjadi 👨‍🍳.

## Pengujian

- `node scripts/uji-peta-konsep.mjs` dan `node scripts/uji-infografis-ringkas.mjs` membaca semua `kelas*-bab*-ringkas.json`.
- `node --no-warnings scripts/uji-lab-kelas1.mjs` untuk logika Laboratorium Penjumlahan (`ucapanTambah` kini punya parameter `sebutTukar`, bawaan `true`).
- Diperiksa di browser: tidak ada tab Simulasi; Mind-Map, Infografis, dan Simulasi tiap sub-bab terkunci berurutan dan terbuka sesuai syarat; alat yang tampil dan teks Misi cocok dengan tampilan.

## Pola hibrida: simulasi bertahap, misi, tantangan bebas

Bab 2 memakai **satu laboratorium yang bertambah alatnya**, bukan satu alat per simulasi. Tab Penjumlahan (A), + Mesin Tambah (B), + Kantin Sekolah (C, pencapaian misi); alat penjumlahan menyala bertahap (benda, kalimat, bingkai, garis, bagan).

- Gerbang LANJUTKAN mengikuti **misi wajib** (`src/components/modul/misi-bab2.ts`). Anak boleh menekan **Lewati misi** setelah menyentuh simulasinya sekali. **Tantangan bebas** tidak menahan siapa pun. Misi yang sudah tercapai tidak dicabut.
- Alat melapor lewat `onKeadaan`; keadaan awal tidak boleh memenuhi misi apa pun. Logika murni dan diuji di `scripts/uji-lab-kelas1.mjs`.

| Sub-Bab | Misi wajib | Tantangan bebas |
| --- | --- | --- |
| A | Nyalakan Gabungkan kelompok. Hitung semua benda dari 1.; Atur dua kelompok sampai jumlahnya 5.; Kosongkan kelompok biru. Lihat jumlahnya.; Buat jumlah tepat 10. Lihat bingkai sepuluh penuh.; Selesaikan Mesin Tambah: gabungkan dulu, baru jawab. | Buat dua kelompok sama banyak.; Buat jumlah 9. |
| B | Tekan Tukar tempat. Lihat dua kalimat yang jumlahnya sama.; Buat merah 6 dan biru 3. Hitung maju 3 dari 6 di garis bilangan.; Buat penjumlahan kembar: dua kelompok sama banyak.; Buat 8 + 2. Lihat bagaimana bingkai sepuluh menjadi penuh.; Nyalakan Bagan pasangan, lalu buat 4 + 3. | Buat 9 + 1, lalu tukar tempatnya.; Ingat Sub-Bab A: selesaikan Mesin Tambah. |
| C | Ada 5 burung, datang lagi 3. Buat kalimat penjumlahannya.; Periksa dengan garis bilangan: buat merah 4 dan biru 2.; Periksa dengan tukar tempat: buat 2 + 6, lalu tekan Tukar tempat.; Selesaikan skenario Kantin Sekolah sampai adegan akhir. | Ingat Sub-Bab A: selesaikan Mesin Tambah.; Buat soal cerita yang jumlahnya tepat 10. |
