# Bank soal Latihan dan Ujian · Matematika Kelas 1 · Bab 2 (Penjumlahan sampai dengan 10)

Berkas ini sengaja tidak memuat teks soal maupun kunci jawaban. Repo ini publik. Soal dan kunci hanya ada di `src/content-master/` (tidak di-commit), di `supabase/seed/` (di-ignore git), dan di Supabase.

Kode bab server: `k1-mat-bab2` · kode bab aplikasi: `mtk-1-bab2` · Fase A. Caranya sama dengan Kelas 1 Bab 8 (lihat `naskah/bank-soal-latihan-ujian-kelas1-bab8.md`).

## Komposisi

| Komponen | Bank | Yang diundi per siswa | Level |
|---|---|---|---|
| Latihan | 100 butir | 10 (3 LOTS + 3 MOTS + 4 HOTS) | bank 30 LOTS, 30 MOTS, 40 HOTS |
| Ujian | 100 butir | 10 | semua HOTS, wajib 100% |

Pilihan ganda 4 pilihan. Pilihan angka diurutkan naik dan paling besar 10. Letak kunci disebar merata (Latihan 25/25/25/25, Ujian 25/25/25/25; per level selisih paling banyak 1 sampai 2). Soal asli IGIL, bukan salinan soal resmi. Teks soal Latihan dan Ujian tidak ada yang sama, dan data cerita (benda + bilangan) tidak dipakai dua kali di seluruh bank. Teks soal tidak memakai kata "kelompok" dan "kurang" (aturan Bab 2).

## Cakupan materi

Ketiga Sub-Bab tercakup, jumlah paling besar 10.

- A Cerita Penjumlahan: cerita bertambah dan menggabungkan, tanda + dan =, menulis dan membaca kalimat, kata petunjuk, hitung gambar.
- B Berbagai Cara: menghitung maju pada garis bilangan, tukar tempat, penjumlahan berulang (dua bilangan sama), bingkai sepuluh dan pasangan 10, bagian-bagian-utuh.
- C Soal Cerita: cerita satu langkah, bagian yang hilang, banyak kendaraan dan roda, informasi pengganggu, urutan langkah menyelesaikan soal cerita, mencocokkan cerita dengan kalimat.

- LOTS (mengingat dan memahami, 11 jenis): kalimat dari cerita, cara membaca kalimat, arti tanda, hasil langsung, hitung gambar, tukar tempat dasar, fakta bingkai sepuluh, mulai menghitung maju, penjumlahan berulang, kata petunjuk, jumlah semua dari cerita.
- MOTS (menerapkan, 10 jenis): cerita dan jumlah, garis bilangan, memilih kalimat yang sama lewat tukar tempat, dua bilangan sama, pasangan sepuluh, bagian hilang pada cerita, jumlah kendaraan, angka hilang, membandingkan dua hasil, mencari kalimat dengan hasil tertentu.
- HOTS (menganalisis, mengevaluasi, mencari kesalahan, 20 jenis): salah hitung, salah tanda, hitung maju yang meleset, menanggapi anggapan tukar tempat, pasangan sepuluh, kartu terbesar atau terkecil, pernyataan benar atau salah, pasangan sama hasil, kotak yang salah isi, membandingkan dua anak, jumlah roda, urutan langkah, informasi pengganggu, kotak kosong pada bingkai, tebak bilangan, dua kantong sama banyak, kalimat benar atau salah, dua anak menukar rak, cerita yang cocok dengan kalimat, cerita yang tidak memakai tanda tambah. Latihan memakai 2 butir tiap jenis, Ujian 5 butir tiap jenis, dengan tokoh, benda, dan bilangan berbeda.

Visual: sebagian soal Latihan LOTS membawa gambar emoji sederhana. Soal Ujian hanya teks, karena server tidak mengirim gambar pada lembar Ujian.

## Alur yang menjaga kunci tetap di server

1. Penulisan: `node src/content-master/bank-k1-bab2.mjs` menghitung kunci tiap soal dari datanya, memeriksa bentuk bank lewat `scripts/lib-seed-bank.mjs`, dan menulis `supabase/seed/02_kelas1_bab2_bank_keys.sql` (lokal, di-ignore git). Berkas bantu `src/content-master/bank-k1-bab2.hasil.json` juga lokal.
2. Berkas publik `src/data/kelas1-bab2.json` tidak diubah dan tidak memuat `correct_index`, `correctAnswer`, `explanation`, `examQuestions`, maupun `examPackages`. Ia hanya dipakai sebagai cadangan 10 soal Latihan tanpa kunci bila server belum memuat bank.
3. Bab didaftarkan ke bank acak di `src/lib/bank-acak.ts` (`BAB_BANK_ACAK`) dan di `scripts/sync-question-keys.mjs`, sehingga `npm run sync:keys` tidak lagi bisa menimpa bank dengan seed 10 soal lama bila bank sudah aktif.

## Menerapkan ke Supabase (urutan)

Mekanisme server (migrasi `05_bank_acak_k1_bab1.sql`) umum per bab, tanpa migrasi baru.

1. Pastikan migrasi 01 sampai 08 sudah diterapkan.
2. Buka SQL Editor Supabase, tempel isi `supabase/seed/02_kelas1_bab2_bank_keys.sql`, jalankan. Seed memeriksa migrasi 05 ada, memasang 100 soal Latihan dan 100 soal Ujian, menandai bab sebagai acak, dan membuang kunci lama Bab 2 (10 soal Latihan dan paket Ujian lama). Jangan menjalankan `02_kelas1_bab2_keys.sql` lagi sesudahnya.
3. Sebelum seed diterapkan, Latihan jatuh kembali ke 10 soal lama di berkas bab; sesudahnya Latihan dan Ujian memakai bank acak.

## Pengujian

- `node --no-warnings scripts/uji-bank-k1b2.mjs`: memeriksa bentuk bank (100 + 100, 30/30/40, pilihan 4 unik, angka naik dan paling besar 10, sebaran kunci, emoji dalam batas, tanpa kata terlarang, tidak ada teks ganda, jumlah pada kalimat paling besar 10) dan menghitung ulang jawaban 192 dari 200 soal dari bilangan dalam kalimatnya tanpa memakai pembuat soal. Delapan soal sisanya adalah definisi tetap.
- `node --no-warnings scripts/uji-undian-bank.mjs k1-mat-bab2 kelas1-bab2`: meniru undian 3+3+4 dan 10 sebanyak 10 ribu kali dan memastikan berkas publik serta pembangun JSON soal tidak memuat kunci.
