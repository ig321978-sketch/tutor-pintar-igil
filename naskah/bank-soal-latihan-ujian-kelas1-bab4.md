# Bank soal Latihan dan Ujian · Matematika Kelas 1 · Bab 4 (Mengenal Bentuk)

Berkas ini sengaja tidak memuat teks soal maupun kunci jawaban. Repo ini publik. Soal dan kunci hanya ada di `src/content-master/` (tidak di-commit), di `supabase/seed/` (di-ignore git), dan di Supabase.

Kode bab server: `k1-mat-bab4` · kode bab aplikasi: `mtk-1-bab4` · Fase A. Caranya sama dengan Kelas 1 Bab 2, Bab 3, dan Bab 8 (lihat `naskah/bank-soal-latihan-ujian-kelas1-bab3.md`).

## Komposisi

| Komponen | Bank | Yang diundi per siswa | Level |
|---|---|---|---|
| Latihan | 100 butir | 10 (3 LOTS + 3 MOTS + 4 HOTS) | bank 30 LOTS, 30 MOTS, 40 HOTS |
| Ujian | 100 butir | 10 | semua HOTS, wajib 100% |

Pilihan ganda 4 pilihan. Pilihan angka diurutkan naik dan paling besar 10 (tidak ada bilangan lebih dari 10 di soal mana pun, termasuk pengecoh). Letak kunci disebar merata (Latihan 26/25/25/24, Ujian 25/25/25/25; per level selisih paling banyak 3). Soal asli IGIL, bukan salinan soal resmi. Teks soal Latihan dan Ujian tidak ada yang sama, dan data soal (benda, bilangan, daftar bentuk) tidak dipakai dua kali di seluruh bank.

## Cakupan materi

Ketiga Sub-Bab tercakup. Soal bentuk memakai kata dan angka saja (tidak butuh gambar rumit): bentuk dipilah menjadi lengkung, segitiga, dan segi empat; benda sehari-hari dipakai lewat namanya; kelompok benda ditulis sebagai "bentuk warna ukuran".

- A Mendeskripsikan Bentuk: mengenal bentuk benda, banyak sisi lurus dan sudut (lengkung 0 dan 0, segitiga 3 dan 3, segi empat 4 dan 4), bentuk tidak berubah bila diputar, dibalik, atau diubah ukurannya, mencocokkan ciri dengan benda, mendeskripsikan benda.
- B Mengelompokkan Benda: aturan kelompok menurut bentuk, warna, dan ukuran, menebak aturan, mencari benda yang salah masuk, dua ciri sekaligus, menghitung anggota dan banyak kelompok, langkah mengelompokkan.
- C Menyusun dan Mengurai Bentuk: menyusun dan mengurai (kata dan lawannya), dua segitiga atau dua segi empat digabung, banyak bagian bangun (rumah, kereta, robot), menyusun lalu melepas bagian, banyak lidi untuk segitiga dan segi empat, memotong lalu menggabung.

- LOTS (mengingat dan memahami, 10 jenis): menyebut bentuk benda dan mencari benda berbentuk tertentu, banyak sisi dan sudut, ciri ke bentuk, hitung gambar, bentuk tetap saat diputar atau dibesarkan, arti aturan kelompok, benda yang cocok masuk kelompok, istilah menyusun dan mengurai, menggabung keping, sisi dan sudut pada benda.
- MOTS (menerapkan, 10 jenis): menghitung benda berbentuk tertentu, jumlah sudut tiga benda, menebak aturan kelompok, tabel tally (jumlah, selisih, yang bukan), menyusun lalu melepas, banyak lidi, ciri ke benda, dua ciri sekaligus, aturan dan anggota kelompok, memotong lalu menggabung.
- HOTS (menganalisis, mengevaluasi, mencari kesalahan, 20 jenis): menanggapi salah nama bentuk, menanggapi salah banyak sisi atau sudut, bentuk misteri dari perbandingan, bentuk setelah diputar atau dimiringkan, benda yang beda bentuk, benda yang salah masuk kelompok, dua anak menebak aturan, menanggapi salah hitung jumlah bentuk, mencari banyak benda yang tersisa, memeriksa jumlah sudut susunan, menyusun lalu menambah dan melepas bagian, cukup atau tidaknya lidi, menghitung dengan dua ciri dan kata "bukan" atau "atau", membandingkan sudut dua benda, bentuk terbanyak, banyak kelompok bila aturan diganti, memperbaiki deskripsi benda, urutan langkah mengelompokkan, bagian bangun yang punya sudut, ukuran dan warna tidak mengubah sisi dan sudut. Latihan memakai 2 butir tiap jenis, Ujian 5 butir tiap jenis, dengan benda, bilangan, dan daftar berbeda.

Visual: sebagian soal Latihan LOTS (hitung gambar) membawa gambar emoji sederhana. Soal Ujian hanya teks, karena server tidak mengirim gambar pada lembar Ujian.

## Alur yang menjaga kunci tetap di server

1. Penulisan: `node src/content-master/bank-k1-bab4.mjs` menghitung kunci tiap soal dari datanya, memeriksa bentuk bank lewat `scripts/lib-seed-bank.mjs`, dan menulis `supabase/seed/02_kelas1_bab4_bank_keys.sql` (lokal, di-ignore git). Berkas bantu `src/content-master/bank-k1-bab4.hasil.json` juga lokal.
2. Berkas publik `src/data/kelas1-bab4.json` tidak diubah dan tidak memuat `correct_index`, `correctAnswer`, `explanation`, `examQuestions`, maupun `examPackages`. Ia hanya dipakai sebagai cadangan 10 soal Latihan tanpa kunci bila server belum memuat bank.
3. Bab didaftarkan ke bank acak di `src/lib/bank-acak.ts` (`BAB_BANK_ACAK`) dan di `scripts/sync-question-keys.mjs`, sehingga `npm run sync:keys` tidak lagi bisa menimpa bank dengan seed 10 soal lama (`02_kelas1_bab4_keys.sql`) bila bank sudah aktif.

## Menerapkan ke Supabase (urutan)

Mekanisme server (migrasi `05_bank_acak_k1_bab1.sql`) umum per bab, tanpa migrasi baru. Penerapan ke basis data produksi dilakukan pemilik, bukan oleh sesi penulisan soal.

1. Pastikan migrasi 01 sampai 08 sudah diterapkan.
2. Buka SQL Editor Supabase, tempel isi `supabase/seed/02_kelas1_bab4_bank_keys.sql`, jalankan. Seed memeriksa migrasi 05 ada, memasang 100 soal Latihan dan 100 soal Ujian, menandai bab sebagai acak, dan membuang kunci lama Bab 4 (10 soal Latihan dan paket Ujian lama). Jangan menjalankan `02_kelas1_bab4_keys.sql` lagi sesudahnya.
3. Sebelum seed diterapkan, Latihan jatuh kembali ke 10 soal lama di berkas bab; sesudahnya Latihan dan Ujian memakai bank acak.

## Pengujian

- `node --no-warnings scripts/uji-bank-k1b4.mjs`: memeriksa bentuk bank (100 + 100, 30/30/40, pilihan 4 unik, angka naik dan paling besar 10, sebaran kunci, emoji dalam batas, tidak ada teks ganda, tidak ada bilangan lebih dari 10) dan menghitung ulang jawaban 200 dari 200 soal dari data dalam kalimatnya, memakai tabel fakta bentuk milik skrip uji sendiri (bukan pembuat soal).
- `node --no-warnings scripts/uji-undian-bank.mjs k1-mat-bab4 kelas1-bab4`: meniru undian 3+3+4 dan 10 sebanyak 10 ribu kali dan memastikan berkas publik serta pembangun JSON soal tidak memuat kunci.
