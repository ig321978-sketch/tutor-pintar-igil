# Bank soal Latihan dan Ujian · Matematika Kelas 2 · Bab 1 (Ayo Membilang sampai dengan 50)

Berkas ini sengaja tidak memuat teks soal maupun kunci jawaban. Repo ini publik. Soal dan kunci hanya ada di `src/content-master/` (tidak di-commit), di `supabase/seed/` (di-ignore git), dan di Supabase.

Kode bab server: `k2-mat-bab1` · kode bab aplikasi: `mtk-2-bab1` · Fase A.

## Komposisi

| Komponen | Bank | Yang diundi per siswa | Level |
|---|---|---|---|
| Latihan | 100 butir | 10 (3 LOTS + 3 MOTS + 4 HOTS) | bank 30 LOTS, 30 MOTS, 40 HOTS |
| Ujian | 100 butir | 10 | semua HOTS, wajib 100% |

Pilihan ganda 4 pilihan. Pilihan angka diurutkan naik. Letak kunci disebar merata (pembuat soal memilih letak dengan penghitung per kelompok; sebaran Latihan 27/25/24/24, Ujian 23/25/26/26). Soal asli IGIL, bukan salinan soal resmi. Teks soal tidak ada yang sama (Latihan maupun Ujian), dan data soal (angka dan tokoh) tidak dipakai dua kali di seluruh bank. Bilangan dalam soal sampai 50 (pilihan jawaban paling besar 99, untuk pengecoh seperti bilangan yang dibalik).

## Cakupan materi (ketiga Sub-Bab)

- **Sub-Bab A, Menghitung, Membaca, dan Menulis Bilangan.** Menghitung benda, mengelompokkan setiap sepuluh, puluhan ditambah sisa, membaca dan menulis nama dan lambang 21 sampai 50, sebelum dan sesudah, maju dan mundur, hitung loncat sepuluh, melengkapi urutan, bilangan misterius dari petunjuk, menebak lalu membuktikan.
- **Sub-Bab B, Nilai Tempat.** Puluhan dan satuan, tabel nilai tempat, nilai angka menurut letaknya (26 dan 62 berbeda), menukar sepuluh satuan dengan satu puluhan dan sebaliknya, menulis satu bilangan dengan beberapa cara dan memilih yang paling ringkas, menyusun bilangan dari kartu angka.
- **Sub-Bab C, Membandingkan Dua Bilangan atau Lebih.** Lebih besar, lebih kecil, sama dengan dan tandanya, puluhan dibandingkan lebih dulu lalu satuan, menukar sepuluh satuan sebelum membandingkan, mengurutkan tiga sampai lima bilangan, tebakan terdekat dengan hasil hitungan, menanggapi alasan keliru yang membandingkan satuan dulu.

Latihan: LOTS (mengingat dan memahami) 11 butir Sub-Bab A, 10 butir B, 9 butir C. MOTS (menerapkan) 10, 10, dan 10 butir. HOTS (menganalisis dan mengevaluasi) 20 jenis soal: 7 jenis A, 7 jenis B, 6 jenis C. Tiap jenis HOTS muncul 2 kali di Latihan dan 5 kali di Ujian dengan tokoh, benda, dan angka berbeda (jenis: mencari kesalahan hitung ikat, tebakan tiga anak, jumlah bilangan yang hilang, bilangan misterius, dua langkah maju dan mundur, hitung loncat sepuluh, kurang hingga lima puluh, nilai angka kembar dan dibalik, cara yang tidak sama nilainya, bentuk paling ringkas, kartu angka, kesalahan menulis, membuka satu puluhan, pernyataan nilai angka, membandingkan setelah menukar, urutan ke-k, membandingkan dari satuan dulu, empat pasang pernyataan, membandingkan tiga bentuk bilangan, tebakan dan hitungan).

Visual: soal Latihan boleh membawa gambar emoji sederhana (menghitung gambar). Soal Ujian hanya teks, karena server tidak mengirim gambar pada lembar Ujian.

## Alur yang menjaga kunci tetap di server

1. Penulisan: `node src/content-master/bank-k2-bab1.mjs` menghitung kunci tiap soal dari datanya, memeriksa bentuk bank lewat `scripts/lib-seed-bank.mjs`, dan menulis `supabase/seed/02_kelas2_bab1_bank_keys.sql` (lokal, di-ignore git, berisi kunci dan pembahasan). Berkas bantu `src/content-master/bank-k2-bab1.hasil.json` juga lokal.
2. Berkas publik `src/data/kelas2-bab1.json` tidak diubah dan tidak memuat `correct_index`, `correctAnswer`, `explanation`, `examQuestions`, maupun `examPackages`. Ia hanya dipakai sebagai cadangan 10 soal Latihan tanpa kunci bila server belum memuat bank.
3. Seed diterapkan ke Supabase dari komputer pemilik (lihat di bawah).

## Mekanisme server (umum untuk semua bab dan kelas)

Migrasi `05_bank_acak_k1_bab1.sql` umum per bab: `server_chapters.mode_undian`, tabel `lembar_acak`, fungsi `undi_latihan`, `undi_ujian`, `buka_latihan`, `mulai_ujian`, `kirim_jawaban_latihan`, `serahkan_ujian`. Semuanya menerima kode bab sebagai parameter dan tidak bergantung pada kelas. Tidak ada migrasi baru; Kelas 2 Bab 1 cukup memuat seed dan menandai `mode_undian = 'acak'` (dilakukan oleh seed itu sendiri).

Sisi aplikasi: daftar bab bank acak ada di satu tempat, `src/lib/bank-acak.ts` (`BAB_BANK_ACAK`), dipakai `IgilModulePlayer.tsx`. Kode yang sama ditiru di `scripts/sync-question-keys.mjs` supaya seed 10 soal lama tidak menimpa bank. Nama berkas seed diturunkan dari kode bab (`k2-mat-bab1` menjadi `02_kelas2_bab1_bank_keys.sql`) sehingga berlaku untuk semua kelas.

## Menerapkan ke Supabase (urutan)

1. Pastikan migrasi 01 sampai 05 (dan 06 sampai 08 yang sudah ada) sudah diterapkan.
2. Buka SQL Editor Supabase, tempel isi `supabase/seed/02_kelas2_bab1_bank_keys.sql`, jalankan. Seed memeriksa migrasi 05, memasang 100 soal Latihan dan 100 soal Ujian, menandai bab sebagai acak, dan membuang kunci lama Bab 1 Kelas 2 (10 soal Latihan dan tiga paket Ujian lama).
3. Aplikasi sudah memuat Kelas 2 Bab 1 sebagai bab bank (lihat `bank-acak.ts`). Bila seed belum diterapkan, Latihan jatuh kembali ke 10 soal lama di berkas bab.

## Bab berikutnya (cara menambah, juga untuk Bab 2 sampai 8 Kelas 2 dan kelas lain)

1. Salin `src/content-master/bank-k2-bab1.mjs` menjadi `bank-<kelas>-<bab>.mjs` (lokal). Ganti `chapterId`, `phaseCode`, `grade`, dan daftar keluarga soalnya. Pustaka umum `scripts/lib-bank-pembuat.mjs` (acak berbiji tetap, penyeimbang letak kunci, pilihan angka naik, pencegah data kembar, penulis seed) tidak perlu diubah.
2. Salin `scripts/uji-bank-k2b1.mjs` menjadi uji bab itu: ganti `BAB`, `BERKAS`, dan penghitung ulang per jenis soal.
3. Tambahkan kode bab ke `BAB_BANK_ACAK` di `src/lib/bank-acak.ts` dan `scripts/sync-question-keys.mjs`.
4. Terapkan seed bab itu ke Supabase, lalu jalankan `node --no-warnings scripts/uji-undian-bank.mjs <kode-bab> <berkas-data>`.

Catatan: teks soal tidak boleh sama dengan kalimat di berkas publik bab (uji undian memeriksanya), jadi kalimat definisi pada soal LOTS perlu diparafrasekan dari teks Materi.

## Pengujian

- `node --no-warnings scripts/uji-bank-k2b1.mjs`: memeriksa bentuk bank (100 + 100, 30/30/40, pilihan 4 unik, angka naik dan paling besar 99, sebaran kunci, emoji dalam batas, tanpa ZWJ, tidak ada teks ganda, Ujian tanpa visual) dan menghitung ulang jawaban semua 200 soal dari data dalam kalimatnya tanpa memakai pembuat soal.
- `node --no-warnings scripts/uji-undian-bank.mjs k2-mat-bab1 kelas2-bab1`: meniru undian 3+3+4 dan 10 sebanyak 10 ribu kali (tidak ada duplikat, level benar, seluruh bank terjangkau, lembar latihan unik) dan memastikan pembangun JSON soal di migrasi serta berkas publik tidak memuat kunci atau teks soal bank.
- Uji Kelas 1 (`uji-bank-k1b1` sampai `k1b8`) tetap lulus.
