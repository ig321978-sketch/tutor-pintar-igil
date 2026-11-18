# Bank soal Latihan dan Ujian · Matematika Kelas 1 · Bab 6 (Penjumlahan dan Pengurangan sampai dengan 20)

Berkas ini sengaja tidak memuat teks soal maupun kunci jawaban. Repo ini publik. Soal dan kunci hanya ada di `src/content-master/` (tidak di-commit), di `supabase/seed/` (di-ignore git), dan di Supabase.

Kode bab server: `k1-mat-bab6` · kode bab aplikasi: `mtk-1-bab6` · Fase A. Caranya sama dengan Kelas 1 Bab 2, 3, 5, dan 8 (lihat `naskah/bank-soal-latihan-ujian-kelas1-bab3.md`).

## Komposisi

| Komponen | Bank | Yang diundi per siswa | Level |
|---|---|---|---|
| Latihan | 100 butir | 10 (3 LOTS + 3 MOTS + 4 HOTS) | bank 30 LOTS, 30 MOTS, 40 HOTS |
| Ujian | 100 butir | 10 | semua HOTS, wajib 100% |

Pilihan ganda 4 pilihan. Pilihan angka diurutkan naik dan paling besar 20 (tidak ada bilangan lebih dari 20 di soal mana pun, termasuk pengecoh). Letak kunci disebar merata (Latihan 26/25/24/25, Ujian 25/25/25/25; per level selisih paling banyak 1). Soal asli IGIL, bukan salinan soal resmi. Teks soal Latihan dan Ujian tidak ada yang sama, dan data cerita tidak dipakai dua kali di seluruh bank. Kata "nilai" tidak dipakai di teks soal (istilahnya "tabel puluhan dan satuan").

## Cakupan materi

Ketiga Sub-Bab tercakup, bilangan paling besar 20. Penjumlahan hasilnya kurang dari 20 dan pengurangan tanpa meminjam (hasil tidak kurang dari 10 untuk belasan dikurangi satuan), sesuai batas simulasi.

- A Lebih dari, Kurang dari, Selisih: membandingkan dua baris gambar, lebihnya dan kurangnya, beda atau selisih, selisih pada garis bilangan, menyamakan dua kelompok, mencari bilangan dari cerita lebihnya atau kurangnya, besar dikurangi kecil.
- B Penjumlahan kurang dari 20: satuan dengan satuan (menghitung maju, genapkan sepuluh), belasan dengan satuan (pasangan bilangan, tabel puluhan dan satuan), soal cerita.
- C Pengurangan kurang dari 20: belasan dikurangi satuan (menghitung mundur, pasangan bilangan, tabel puluhan dan satuan), soal cerita, memeriksa dengan penjumlahan, keluarga kalimat.

- LOTS (mengingat dan memahami, 10 jenis): lebih banyak dari dua baris gambar, selisih dari gambar, selisih dari cerita, lebihnya atau kurangnya, kata konsep (selisih, beda, pasangan satu-satu), penjumlahan dasar, pengurangan dasar, menghitung maju, memisah belasan menjadi 10 dan satuan, cerita menambah dan mengurang.
- MOTS (menerapkan, 10 jenis): selisih di garis bilangan, menyamakan dua kelompok, mencari bilangan dari lebihnya, dari kurangnya, cerita penjumlahan, tabel puluhan dan satuan (tambah dan kurang), cerita pengurangan, pasangan bilangan, genapkan sepuluh.
- HOTS (menganalisis, mengevaluasi, mencari kesalahan, 20 jenis): selisih yang dijumlah, bilangan kecil di depan, kata lebihnya yang tertukar, salah tambah, salah kurang, salah genapkan sepuluh, langkah yang keliru pada pengurangan dan penjumlahan, dua langkah (lebihnya atau kurangnya lalu jumlah), informasi pengganggu, pernyataan benar atau salah, membandingkan dua selisih, mencari yang diberikan atau yang rusak, memeriksa dengan penjumlahan, urutan langkah menghitung mundur, keluarga kalimat, kalimat yang hasilnya sama, tabel puluhan dan satuan yang keliru, tambah lalu kurang. Latihan memakai 2 butir tiap jenis, Ujian 5 butir tiap jenis, dengan tokoh, benda, dan bilangan berbeda.

Visual: 6 soal Latihan LOTS (jenis lebih banyak dan selisih dari gambar) membawa dua baris gambar emoji sederhana (paling banyak 12 per baris). Soal Ujian hanya teks, karena server tidak mengirim gambar pada lembar Ujian.

## Alur yang menjaga kunci tetap di server

1. Penulisan: `node src/content-master/bank-k1-bab6.mjs` menghitung kunci tiap soal dari datanya, memeriksa bentuk bank lewat `scripts/lib-seed-bank.mjs`, dan menulis `supabase/seed/02_kelas1_bab6_bank_keys.sql` (lokal, di-ignore git). Berkas bantu `src/content-master/bank-k1-bab6.hasil.json` juga lokal. Pengundi bilangan acaknya tetap (seed tetap), sehingga hasilnya sama bila dijalankan ulang.
2. Berkas publik `src/data/kelas1-bab6.json` tidak diubah dan tidak memuat `correct_index`, `correctAnswer`, `explanation`, `examQuestions`, maupun `examPackages`. Ia hanya dipakai sebagai cadangan 10 soal Latihan tanpa kunci bila server belum memuat bank.
3. Bab didaftarkan ke bank acak di `src/lib/bank-acak.ts` (`BAB_BANK_ACAK`) dan di `scripts/sync-question-keys.mjs`, sehingga `npm run sync:keys` tidak lagi bisa menimpa bank dengan seed 10 soal lama (`02_kelas1_bab6_keys.sql`) bila bank sudah aktif.

## Menerapkan ke Supabase (urutan)

Mekanisme server (migrasi `05_bank_acak_k1_bab1.sql`) umum per bab, tanpa migrasi baru.

1. Pastikan migrasi 01 sampai 08 sudah diterapkan.
2. Buka SQL Editor Supabase, tempel isi `supabase/seed/02_kelas1_bab6_bank_keys.sql`, jalankan. Seed memeriksa migrasi 05 ada, memasang 100 soal Latihan dan 100 soal Ujian, menandai bab sebagai acak, dan membuang kunci lama Bab 6. Jangan menjalankan `02_kelas1_bab6_keys.sql` lagi sesudahnya.
3. Sebelum seed diterapkan, Latihan jatuh kembali ke 10 soal lama di berkas bab; sesudahnya Latihan dan Ujian memakai bank acak.

## Pengujian

- `node --no-warnings scripts/uji-bank-k1b6.mjs`: memeriksa bentuk bank (100 + 100, 30/30/40, pilihan 4 unik, angka naik dan paling besar 20, sebaran kunci, emoji dalam batas, tanpa teks ganda, tanpa kata "nilai") dan menghitung ulang jawaban 200 dari 200 soal dari bilangan dalam kalimatnya tanpa memakai pembuat soal.
- `node --no-warnings scripts/uji-undian-bank.mjs k1-mat-bab6 kelas1-bab6`: meniru undian 3+3+4 dan 10 sebanyak 10 ribu kali dan memastikan berkas publik serta pembangun JSON soal tidak memuat kunci.
