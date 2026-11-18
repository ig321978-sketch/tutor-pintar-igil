# Bank soal Latihan dan Ujian · Matematika Kelas 1 · Bab 8 (Mengenal Diagram)

Berkas ini sengaja tidak memuat teks soal maupun kunci jawaban. Repo ini publik. Soal dan kunci hanya ada di `src/content-master/` (tidak di-commit), di `supabase/seed/` (di-ignore git), dan di Supabase.

Kode bab server: `k1-mat-bab8` · kode bab aplikasi: `mtk-1-bab8` · Fase A.

## Komposisi

| Komponen | Bank | Yang diundi per siswa | Level |
|---|---|---|---|
| Latihan | 100 butir | 10 (3 LOTS + 3 MOTS + 4 HOTS) | bank 30 LOTS, 30 MOTS, 40 HOTS |
| Ujian | 100 butir | 10 | semua HOTS, wajib 100% |

Pilihan ganda 4 pilihan. Pilihan angka diurutkan naik. Letak kunci disebar merata (pembuat soal memilih letak dengan penghitung per kelompok; sebaran Latihan 26/25/24/25, Ujian 25/25/25/25). Soal asli IGIL, bukan salinan soal resmi. Teks soal Latihan dan Ujian tidak ada yang sama, dan data (tema + angka) tidak dipakai dua kali di seluruh bank.

## Cakupan materi

Kedua Sub-Bab tercakup: A Mengelompokkan Data (mengelompokkan benda, daftar, turus, tabel menurun dan mendatar, baris dan kolom) dan B Diagram Gambar (diagram tegak dan mendatar, satu gambar satu data, mulai dari kotak pertama, survei satu jawaban per anak). Hitungan memakai bilangan kecil: tiap data 1 sampai 8, jumlah semua paling besar 18 sampai 20.

- LOTS (mengingat dan memahami): arti mengelompokkan, aturan turus, arah baris dan kolom, arti satu gambar, membaca satu angka, menghitung kelompok benda pada gambar, sama banyak, menyebut jenis tabel dan diagram.
- MOTS (menerapkan): paling banyak, paling sedikit, selisih, jumlah dua data, jumlah semua, lebihnya dan kurangnya, pasangan sama banyak, mengelompokkan gambar campuran lalu menghitung, data yang hilang dari jumlah semua, memindah bentuk tabel.
- HOTS (menganalisis, mengevaluasi, mencari kesalahan): diagram yang tidak cocok dengan tabel, memilih pernyataan benar atau salah, tabel mendatar yang sama dengan tabel menurun, mencari kesalahan jumlah, dua data sama banyak, lebihnya dan kurangnya, memilih urutan cara membuat diagram, cek jumlah survei satu jawaban per anak, turus yang benar, kesalahan mewarnai diagram, membandingkan dua kelas, data yang berpindah, selisih terkecil atau terbesar, menambah agar sama, jumlah gabungan, kotak pertemuan baris dan kolom, menanggapi alasan yang keliru, anak yang tidak memilih, mengurutkan data. Tiap soal Ujian memakai salah satu dari 20 jenis HOTS ini, dengan tokoh, tema, dan angka berbeda.

Visual: soal Latihan boleh membawa gambar emoji sederhana (satu atau dua kelompok). Soal Ujian hanya teks, karena server tidak mengirim gambar pada lembar Ujian.

## Alur yang menjaga kunci tetap di server

1. Penulisan: `node src/content-master/bank-k1-bab8.mjs` menghitung kunci tiap soal dari datanya, memeriksa bentuk bank lewat `scripts/lib-seed-bank.mjs`, dan menulis `supabase/seed/02_kelas1_bab8_bank_keys.sql` (lokal, di-ignore git, berisi kunci dan pembahasan). Berkas bantu `src/content-master/bank-k1-bab8.hasil.json` juga lokal.
2. Berkas publik `src/data/kelas1-bab8.json` tidak diubah dan tidak memuat `correct_index`, `correctAnswer`, `explanation`, `examQuestions`, maupun `examPackages`. Ia hanya dipakai sebagai cadangan 10 soal Latihan tanpa kunci bila server belum memuat bank.
3. Seed diterapkan ke Supabase dari komputer pemilik (lihat di bawah).

## Mekanisme server (umum untuk semua bab)

Migrasi `05_bank_acak_k1_bab1.sql` sudah umum per bab walaupun namanya menyebut Bab 1: kolom `server_chapters.mode_undian`, tabel `lembar_acak`, fungsi `undi_latihan` (3 LOTS + 3 MOTS + 4 HOTS dari `private.practice_keys`), `undi_ujian` (10 HOTS dari `private.exam_keys` paket `acak`), `buka_latihan`, `mulai_ujian`, `kirim_jawaban_latihan`, dan `serahkan_ujian`. Semuanya menerima kode bab sebagai parameter. Maka tidak ada migrasi baru; Bab 8 cukup memuat seed dan menandai `mode_undian = 'acak'` (dilakukan oleh seed itu sendiri).

- Tanda lembar aktif tidak boleh sama dengan lembar aktif siswa lain pada bab yang sama (indeks unik di `lembar_acak`).
- Server hanya mengirim teks soal, pilihan, level, dan gambar. Kunci dan pembahasan hanya dikembalikan setelah jawaban dikirim (`kirim_jawaban_latihan`), dan Ujian hanya mengembalikan nilai akhir.
- Sisi aplikasi: daftar bab bank acak ada di satu tempat, `src/lib/bank-acak.ts` (`BAB_BANK_ACAK`), dipakai `IgilModulePlayer.tsx`. Kode yang sama ditiru pada `scripts/sync-question-keys.mjs` supaya seed 10 soal lama tidak menimpa bank.

## Menerapkan ke Supabase (urutan)

1. Pastikan migrasi 01 sampai 05 (dan 06 sampai 08 yang sudah ada) sudah diterapkan.
2. Buka SQL Editor Supabase, tempel isi `supabase/seed/02_kelas1_bab8_bank_keys.sql`, jalankan. Seed memeriksa bahwa migrasi 05 ada, memasang 100 soal Latihan dan 100 soal Ujian, menandai bab sebagai acak, dan membuang kunci lama Bab 8 (10 soal Latihan dan paket Ujian lama).
3. Aplikasi sudah memuat Bab 8 sebagai bab bank (lihat `bank-acak.ts`). Bila seed belum diterapkan, Latihan jatuh kembali ke 10 soal lama di berkas bab.

## Bab berikutnya (cara menambah)

1. Tulis pembuat bank lokal `src/content-master/bank-<bab>.mjs` yang memanggil `tulisSeedBank` dari `scripts/lib-seed-bank.mjs` (menghasilkan `supabase/seed/02_<kelas>_<bab>_bank_keys.sql`).
2. Tambahkan kode bab ke `BAB_BANK_ACAK` di `src/lib/bank-acak.ts` dan `scripts/sync-question-keys.mjs`.
3. Terapkan seed bab itu ke Supabase, lalu jalankan `node --no-warnings scripts/uji-undian-bank.mjs <kode-bab> <berkas-data>`.

## Pengujian

- `node --no-warnings scripts/uji-bank-k1b8.mjs`: memeriksa bentuk bank (100 + 100, 30/30/40, pilihan 4 unik, angka naik, sebaran kunci, emoji dalam batas, tanpa ZWJ, tidak ada teks ganda) dan menghitung ulang jawaban 172 soal dari data dalam kalimatnya tanpa memakai pembuat soal. Sisanya (definisi, hitung gambar, sama banyak, gambar campuran) diperiksa dari struktur.
- `node --no-warnings scripts/uji-undian-bank.mjs k1-mat-bab8 kelas1-bab8`: meniru undian 3+3+4 dan 10 sebanyak 10 ribu kali (tidak ada duplikat, level benar, seluruh bank terjangkau, lembar latihan hampir selalu unik) dan memastikan pembangun JSON soal di migrasi serta berkas publik tidak memuat kunci.
