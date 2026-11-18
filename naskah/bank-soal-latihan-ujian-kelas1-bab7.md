# Bank soal Latihan dan Ujian · Matematika Kelas 1 · Bab 7 (Mengukur Panjang Benda)

Berkas ini sengaja tidak memuat teks soal maupun kunci jawaban. Repo ini publik. Soal dan kunci hanya ada di `src/content-master/` (tidak di-commit), di `supabase/seed/` (di-ignore git), dan di Supabase.

Kode bab server: `k1-mat-bab7` · kode bab aplikasi: `mtk-1-bab7` · Fase A. Caranya sama dengan Kelas 1 Bab 2, 3, 5, dan 8 (lihat `naskah/bank-soal-latihan-ujian-kelas1-bab3.md`).

## Komposisi

| Komponen | Bank | Yang diundi per siswa | Level |
|---|---|---|---|
| Latihan | 100 butir | 10 (3 LOTS + 3 MOTS + 4 HOTS) | bank 30 LOTS, 30 MOTS, 40 HOTS |
| Ujian | 100 butir | 10 | semua HOTS, wajib 100% |

Pilihan ganda 4 pilihan. Pilihan angka diurutkan naik dan paling besar 20. Letak kunci disebar merata (Latihan 26/24/26/24, Ujian 25/25/25/25; per level selisih paling banyak 1). Soal asli IGIL, bukan salinan soal resmi. Teks soal Latihan dan Ujian tidak ada yang sama, dan data cerita tidak dipakai dua kali di seluruh bank.

Aturan materi bab ini: HANYA satuan tidak baku (jengkal, depa, telapak kaki, sedotan, stik es krim, penjepit kertas, dan kotak pada kertas berpetak). Tidak ada meter, sentimeter, atau alat ukur baku. Kata "tebak" tidak dipakai (pakai "perkiraan" atau "kira-kira").

## Cakupan materi

Kedua Sub-Bab tercakup.

- A Membandingkan dan Mengurutkan Panjang: lebih panjang, lebih pendek, lebih tinggi, sama panjang; paling panjang dan paling pendek dari tiga benda; mengurutkan; posisi lebih tinggi dan lebih rendah; garis awal yang sama.
- B Mengukur Panjang Benda: mengulang satuan tanpa celah, tanpa tumpukan, tanpa miring, dari ujung benda, memakai satu jenis alat ukur; menulis hasil dengan angka dan nama alat ukur; alat ukur berbeda memberi hasil berbeda (alat lebih panjang, angka lebih sedikit); mengukur dengan kotak pada kertas berpetak; perkiraan lalu membuktikan.

- LOTS (mengingat dan memahami, 10 jenis): membandingkan dua benda, paling dari tiga benda, lawan kata, aturan garis awal, mengurutkan hasil ukur, arti angka hasil ukur, mulai dari ujung benda, menghitung satuan, alat ukur tidak baku, posisi dua anak.
- MOTS (menerapkan, 10 jenis): selisih dua panjang, ukuran yang di tengah, alat ukur berbeda memberi angka berbeda, dua pernyataan bandingan, garis awal yang sama, tabel hasil ukur, menyambung, memotong, selisih perkiraan dan hasil ukur, tiga anak di anak tangga.
- HOTS (menganalisis, mengevaluasi, mencari kesalahan, 20 jenis): menanggapi anggapan membandingkan, kesalahan cara mengukur, jengkal siapa yang lebih panjang, penyebab hasil berbeda, rantai "lebih panjang dari" (paling panjang atau paling pendek), memilih urutan hasil ukur, garis awal yang berbeda, mengukur dengan petak (petak awal dan akhir ikut dihitung), perkiraan siapa lebih dekat, pernyataan benar atau salah dari tabel, selisih dari cerita, urutan langkah mengukur, informasi pengganggu (panjang atau lebar), menyambung lalu membandingkan, memotong lalu membandingkan, salah tulis hasil, rantai posisi, mencampur alat ukur, selisih terbesar dan terkecil, melengkapi tulisan hasil ukur. Latihan memakai 2 butir tiap jenis, Ujian 5 butir tiap jenis, dengan tokoh, benda, dan bilangan berbeda.

Visual: soal bab ini hanya teks (tanpa gambar), jadi Latihan dan Ujian sama-sama bisa dipakai tanpa gambar dari server.

## Alur yang menjaga kunci tetap di server

1. Penulisan: `node src/content-master/bank-k1-bab7.mjs` menghitung kunci tiap soal dari datanya, memeriksa bentuk bank lewat `scripts/lib-seed-bank.mjs`, dan menulis `supabase/seed/02_kelas1_bab7_bank_keys.sql` (lokal, di-ignore git). Berkas bantu `src/content-master/bank-k1-bab7.hasil.json` juga lokal.
2. Berkas publik `src/data/kelas1-bab7.json` tidak diubah dan tidak memuat `correct_index`, `correctAnswer`, `explanation`, `examQuestions`, maupun `examPackages`. Ia hanya dipakai sebagai cadangan 10 soal Latihan tanpa kunci bila server belum memuat bank.
3. Bab didaftarkan ke bank acak di `src/lib/bank-acak.ts` (`BAB_BANK_ACAK`) dan di `scripts/sync-question-keys.mjs`, sehingga `npm run sync:keys` tidak lagi bisa menimpa bank dengan seed 10 soal lama (`02_kelas1_bab7_keys.sql`) bila bank sudah aktif.

## Menerapkan ke Supabase (urutan)

Mekanisme server (migrasi `05_bank_acak_k1_bab1.sql`) umum per bab, tanpa migrasi baru.

1. Pastikan migrasi 01 sampai 08 sudah diterapkan.
2. Buka SQL Editor Supabase, tempel isi `supabase/seed/02_kelas1_bab7_bank_keys.sql`, jalankan. Seed memeriksa migrasi 05 ada, memasang 100 soal Latihan dan 100 soal Ujian, menandai bab sebagai acak, dan membuang kunci lama Bab 7. Jangan menjalankan `02_kelas1_bab7_keys.sql` lagi sesudahnya.
3. Sebelum seed diterapkan, Latihan jatuh kembali ke 10 soal lama di berkas bab; sesudahnya Latihan dan Ujian memakai bank acak.

## Pengujian

- `node --no-warnings scripts/uji-bank-k1b7.mjs`: memeriksa bentuk bank (100 + 100, 30/30/40, pilihan 4 unik, angka naik dan paling besar 20, sebaran kunci, tanpa teks ganda, tanpa kata meter, sentimeter, atau tebak) dan menghitung ulang jawaban 191 dari 200 soal dari data dalam kalimatnya tanpa memakai pembuat soal. Sembilan soal sisanya adalah definisi tetap (lawan kata, aturan garis awal, mulai dari ujung benda).
- `node --no-warnings scripts/uji-undian-bank.mjs k1-mat-bab7 kelas1-bab7`: meniru undian 3+3+4 dan 10 sebanyak 10 ribu kali dan memastikan berkas publik serta pembangun JSON soal tidak memuat kunci.
