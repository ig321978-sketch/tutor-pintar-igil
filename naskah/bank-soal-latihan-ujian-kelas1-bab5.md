# Bank soal Latihan dan Ujian · Matematika Kelas 1 · Bab 5 (Membilang sampai dengan 20)

Berkas ini sengaja tidak memuat teks soal maupun kunci jawaban. Repo ini publik. Soal dan kunci hanya ada di `src/content-master/` (tidak di-commit), di `supabase/seed/` (di-ignore git), dan di Supabase.

Kode bab server: `k1-mat-bab5` · kode bab aplikasi: `mtk-1-bab5` · Fase A. Caranya sama dengan Kelas 1 Bab 2, 3, dan 8 (lihat `naskah/bank-soal-latihan-ujian-kelas1-bab3.md`).

## Komposisi

| Komponen | Bank | Yang diundi per siswa | Level |
|---|---|---|---|
| Latihan | 100 butir | 10 (3 LOTS + 3 MOTS + 4 HOTS) | bank 30 LOTS, 30 MOTS, 40 HOTS |
| Ujian | 100 butir | 10 | semua HOTS, wajib 100% |

Pilihan ganda 4 pilihan. Pilihan angka diurutkan naik dan paling besar 20 (tidak ada bilangan lebih dari 20 di soal mana pun, termasuk pengecoh). Letak kunci disebar merata (Latihan 26/24/25/25, Ujian 25/25/24/26; per level selisih paling banyak 1). Soal asli IGIL, bukan salinan soal resmi. Teks soal Latihan dan Ujian tidak ada yang sama, dan data cerita tidak dipakai dua kali di seluruh bank. Kata "nilai" tidak dipakai di teks soal (aturan modul: istilahnya "tabel puluhan dan satuan").

## Cakupan materi

Keempat Sub-Bab tercakup, bilangan paling besar 20.

- A Menghitung, Membaca, Menulis: menghitung benda sampai 20, membaca dan menulis lambang serta nama bilangan 11 sampai 20, sepuluh ditambah satuannya, dua bingkai sepuluh.
- B Menghitung Maju dan Mundur: maju dan mundur pada garis bilangan, deret dengan bilangan hilang, bilangan sebelum, sesudah, dan di antara, maju dua-dua.
- C Nilai Tempat (puluhan dan satuan): 1 puluhan dan sekian satuan, tabel puluhan dan satuan, angka yang sama di tempat berbeda.
- D Membandingkan Bilangan: lebih banyak, lebih sedikit, sama banyak, paling banyak dan paling sedikit dari tiga kelompok, mengurutkan bilangan, membandingkan lewat puluhan dan satuan.

- LOTS (mengingat dan memahami, 10 jenis): nama bilangan, lambang dari nama, sepuluh dan satuan, hitung gambar, sebelum/sesudah/di antara, puluhan dan satuan dasar, maju/mundur dasar, membandingkan dua bilangan, dua bingkai sepuluh, lebih banyak atau lebih sedikit.
- MOTS (menerapkan, 10 jenis): memecah sepuluh dan sisa, garis bilangan maju, garis bilangan mundur, deret dengan bilangan hilang, deret lompat dua atau tiga, mengisi 10 + satuan, tabel puluhan dan satuan, bilangan terkecil atau terbesar, nomor rak sebelum atau sesudah, kotak kosong pada dua bingkai.
- HOTS (menganalisis, mengevaluasi, mencari kesalahan, 20 jenis): salah baca, salah tulis, salah hitung dua bingkai, maju yang meleset, mundur yang meleset, angka yang salah pada deret, tanggapan tentang arti angka, membandingkan dua anak lewat satuan, memilih urutan, paling banyak atau sedikit dari tiga akuarium, tebak bilangan, kotak 10 + [ ] yang salah, puluhan dan satuan yang tertukar, pernyataan benar atau salah, pasangan kartu bilangan sama, urutan langkah "sepuluh dulu", informasi pengganggu, maju lalu mundur, membandingkan dua tabel, maju dua-dua. Latihan memakai 2 butir tiap jenis, Ujian 5 butir tiap jenis, dengan tokoh dan bilangan berbeda.

Visual: sebagian soal Latihan LOTS membawa gambar emoji sederhana (satu baris, sampai 20). Soal Ujian hanya teks, karena server tidak mengirim gambar pada lembar Ujian.

## Alur yang menjaga kunci tetap di server

1. Penulisan: `node src/content-master/bank-k1-bab5.mjs` menghitung kunci tiap soal dari datanya, memeriksa bentuk bank lewat `scripts/lib-seed-bank.mjs`, dan menulis `supabase/seed/02_kelas1_bab5_bank_keys.sql` (lokal, di-ignore git). Berkas bantu `src/content-master/bank-k1-bab5.hasil.json` juga lokal.
2. Berkas publik `src/data/kelas1-bab5.json` tidak diubah dan tidak memuat `correct_index`, `correctAnswer`, `explanation`, `examQuestions`, maupun `examPackages`. Ia hanya dipakai sebagai cadangan 10 soal Latihan tanpa kunci bila server belum memuat bank.
3. Bab didaftarkan ke bank acak di `src/lib/bank-acak.ts` (`BAB_BANK_ACAK`) dan di `scripts/sync-question-keys.mjs`, sehingga `npm run sync:keys` tidak lagi bisa menimpa bank dengan seed 10 soal lama (`02_kelas1_bab5_keys.sql`) bila bank sudah aktif.

## Menerapkan ke Supabase (urutan)

Mekanisme server (migrasi `05_bank_acak_k1_bab1.sql`) umum per bab, tanpa migrasi baru.

1. Pastikan migrasi 01 sampai 08 sudah diterapkan.
2. Buka SQL Editor Supabase, tempel isi `supabase/seed/02_kelas1_bab5_bank_keys.sql`, jalankan. Seed memeriksa migrasi 05 ada, memasang 100 soal Latihan dan 100 soal Ujian, menandai bab sebagai acak, dan membuang kunci lama Bab 5. Jangan menjalankan `02_kelas1_bab5_keys.sql` lagi sesudahnya.
3. Sebelum seed diterapkan, Latihan jatuh kembali ke 10 soal lama di berkas bab; sesudahnya Latihan dan Ujian memakai bank acak.

## Pengujian

- `node --no-warnings scripts/uji-bank-k1b5.mjs`: memeriksa bentuk bank (100 + 100, 30/30/40, pilihan 4 unik, angka naik dan paling besar 20, sebaran kunci, emoji dalam batas, tanpa teks ganda, tanpa kata "nilai") dan menghitung ulang jawaban 200 dari 200 soal dari bilangan dalam kalimatnya tanpa memakai pembuat soal.
- `node --no-warnings scripts/uji-undian-bank.mjs k1-mat-bab5 kelas1-bab5`: meniru undian 3+3+4 dan 10 sebanyak 10 ribu kali dan memastikan berkas publik serta pembangun JSON soal tidak memuat kunci.
