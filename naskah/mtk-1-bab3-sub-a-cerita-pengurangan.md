# Matematika Kelas 1 · Bab 3 · Pengurangan sampai dengan 10

Sumber: Buku Siswa Matematika SD/MI Kelas I (Kemendikbudristek 2022), Bab 3. Naskah ini ditulis ulang dari buku tersebut dan memperkaya isinya dengan metode dari luar buku. Naskah modul lama buatan Gemini dipindah ke `/ruang-belajar/mtk-1-bab3-lama` dan tidak dipakai lagi.

Semua tahap berjalan di peramban siswa. Tidak ada panggilan API saat belajar. Suara Guru memakai Web Speech `id-ID`. Kunci jawaban hanya ada di `src/content-master/kelas1-bab3.master.json` (tidak di-commit) dan `supabase/seed/02_kelas1_bab3_keys.sql`. Berkas publik `src/data/kelas1-bab3.json` tidak memuat `correct_index`, `correctAnswer`, maupun `explanation`.

## 1. Struktur bab

| Sub-bab | Judul | Isi |
|---|---|---|
| A | Cerita Pengurangan | Berkurang dan tersisa. Tanda `−` dan `=`. Menulis dan membaca kalimat pengurangan. Sisa nol. |
| B | Berbagai Cara | Segera hadir. |
| C | Hubungan Penjumlahan dan Pengurangan | Segera hadir. |
| D | Soal Cerita Pengurangan | Segera hadir. |

Sub-Bab A sudah dibuat. Sub-Bab B, C, dan D tampil sebagai "segera hadir" dan dikerjakan satu per satu atas perintah Kapten. Selama itu, Latihan dan Ujian bab ini mencakup Sub-Bab A.

## 2. Sub-Bab A: Cerita Pengurangan

Tokoh: Igil si burung hantu dan teman-teman dari buku (Malosi, Tika, Halim, Wei, Upe).

Metode yang diadopsi dari luar buku:

- Concrete, Pictorial, Abstract dari Jerome Bruner.
- Model batang dari Matematika Singapura.
- Soal cerita "hasil tidak diketahui" dan "bagian hilang" dari Cognitively Guided Instruction.
- Memeriksa jawaban dengan menggabungkan kembali. Ini mengantar ke Sub-Bab C.

### Tahap 1. Story
Enam adegan bergambar: anak bermain tutup mata lalu dua pulang (`6 − 2 = 4`), papan tulis Igil, kue Ibu dimakan satu (`6 − 1 = 5`), mobil dan tiga penumpang turun (`3 − 3 = 0`), kupu-kupu terbang dari bunga (`6 − 2 = 4`), kelereng diambil Halim (`5 − 1 = ?`).

### Tahap 2. Mind-Map
Enam langkah: hitung mula-mula, cari yang berkurang, pakai tanda kurang, hitung sisanya, tulis dan baca, periksa dengan menggabung.

### Tahap 3. Infografis
Delapan poster untuk dibaca dan didengar. Tidak ada soal. Isinya: berkurang, tiga bagian cerita, tanda kurang dan sama dengan, cara membaca, kata kunci, sisa nol dan tidak ada yang berkurang, tambah dan kurang berlawanan, tiga cara melihat sisa.

### Tahap 4. Concrete (4 permainan, benda nyata)
1. Teman Pulang, Sisa Berapa?: ketuk anak yang pulang, hitung yang tinggal. Ronde `6 − 2 = 4` dan `7 − 3 = 4` (jawab dengan suara).
2. Kue Ibu untuk Upe: seret kue ke mulut Upe. Ronde `6 − 1 = 5` dan `8 − 3 = 5` (jawab dengan suara).
3. Lengkapi Cerita Pengurangan: hitung benda, benda pudar yang berkurang, isi tiga kotak. Ronde kelereng `7 − 2`, mobil `3 − 3 = 0`, kupu-kupu `6 − 2 = 4` (jawab dengan suara).
4. Tebak Sisa Kelereng: tebak dulu, ambil kelereng ke kantong Halim, hitung yang tinggal satu per satu. Ronde `7 − 2` dan `9 − 4 = 5` (jawab dengan suara).

### Tahap 5. Picture (3 permainan, diagram saja)
Batas ketat: tanpa gambar benda dan tanpa memindahkan benda. Aturan lengkap ada di `.cursor/rules/batas-concrete-pictorial.mdc`.

5. Bingkai Sepuluh Dicoret: titik merah, coret yang berkurang. Ronde `6 − 2` dan `8 − 3 = 5`.
6. Goresan Tally Dicoret: coret goresan yang berkurang. Ronde `5 − 2`, `7 − 4`, `9 − 3 = 6`.
7. Jodohkan Diagram dan Kalimat: bingkai `8 − 3 = 5`, goresan `6 − 2 = 4`, batang `7 − 5 = 2`.

### Tahap 6. Abstract (3 permainan)
8. Susun Kalimat: pilih tanda `−` lalu `=`. Ronde `3 − 3 = 0`, `5 − 1 = 4`, `6 − 2 = 4`.
9. Detektif Angka Hilang: `5 − 2 = ?`, `7 − ? = 4`, `9 − 4 = ?`, `8 − 5 = ?`.
10. Kanvas Guratan dan Suara: ucapkan sisa lalu guratkan angkanya. Ronde 1 `5 − 1 = 4`, ronde 2 Ayo Mencoba (anak memilih bilangan sendiri, selalu ada sisa).

Penutup: Poin Penting (lima kartu bersuara) dan Catatanku.

## 3. Latihan dan Ujian

Latihan 10 soal (3 LOTS, 3 MOTS, 4 HOTS) dengan pembahasan, 30 Poin Kualifikasi. Ujian 10 soal, 70 Poin Kualifikasi, wajib 100%. Soal dan pilihan ada di berkas publik. Kunci dan pembahasan hanya di server.
