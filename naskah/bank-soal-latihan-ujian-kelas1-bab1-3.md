# Bank soal Latihan dan Ujian · Matematika Kelas 1 · Bab 1 sampai Bab 3

Berkas ini sengaja tidak memuat teks soal maupun kunci jawaban. Repo ini publik. Soal dan kunci hanya ada di `src/content-master/` (tidak di-commit) dan di Supabase.

## Komposisi

| Komponen | Jumlah | Level | Poin Kualifikasi |
|---|---|---|---|
| Latihan | 10 soal per bab | LOTS 3 (nomor 1–3), MOTS 3 (nomor 4–6), HOTS 4 (nomor 7–10) | 30 |
| Ujian | 10 soal per bab | HOTS 100% | 70, wajib 100% |

Pilihan ganda 4 pilihan. Pilihan angka diurutkan naik. Posisi kunci pada pilihan non-angka diatur agar tersebar (cek sebaran dicetak oleh skrip pembuat).

Level mengikuti taksonomi Bloom yang dipakai penilaian sumatif nasional:

- LOTS: mengingat dan memahami (membaca kalimat, menghitung langsung).
- MOTS: menerapkan (cerita satu langkah, garis bilangan, bagan pasangan).
- HOTS: menganalisis, mengevaluasi, mencipta (mencari kesalahan, pernyataan yang salah, cerita yang cocok dengan kalimat, dua langkah, bilangan yang hilang, memilih cara).

Soal ditulis mengikuti pola jenis soal yang lazim pada asesmen sumatif dan AKM kelas awal. Soal tidak disalin dari bank soal resmi mana pun.

## Cakupan per bab

| Bab | Sub-bab yang dicakup oleh Latihan dan Ujian |
|---|---|
| Bab 1 Membilang sampai 10 | A bilangan 0–10 (menghitung, nol, urutan, membaca), B membandingkan (sama banyak, lebih banyak, lebih sedikit, tanda), C hitung maju dan mundur, D pasangan bilangan |
| Bab 2 Penjumlahan sampai 10 | A cerita penjumlahan dan membaca kalimat, B berbagai cara (garis bilangan, penjumlahan berulang, tukar tempat, bingkai sepuluh), C soal cerita |
| Bab 3 Pengurangan sampai 10 | A cerita pengurangan dan nol, B berbagai cara (hitung mundur, sifat nol, pasangan bilangan), C hubungan penjumlahan dan pengurangan, D soal cerita |

## Alur yang menjaga kunci tetap di server

1. Penulisan: `node src/content-master/bank-soal-bab1-3.mjs` menulis Latihan dan Ujian ke `src/content-master/kelas1-babN.master.json` (kunci ikut tersimpan di master lokal).
2. `npm run sync:keys` menghasilkan:
   - `src/data/kelas1-babN.json` (publik). Latihan tanpa `correct_index`, `correctAnswer`, dan `explanation`. Ujian tidak ada sama sekali di berkas ini.
   - `supabase/seed/02_kelas1_babN_keys.sql` (lokal, di-ignore git). Memuat kunci Latihan, pembahasan, dan seluruh soal Ujian beserta kuncinya.
3. Seed diterapkan ke Supabase dari komputer Kapten (SQL Editor atau `supabase db query`), setelah migrasi 01, 02, dan 03.

## Saat siswa belajar

- Latihan: browser memuat soal dari berkas bab. Setiap jawaban dikirim ke `POST /api/belajar/latihan`, diteruskan ke RPC `kirim_jawaban_latihan`. Server mengembalikan `benar` dan `pembahasan`. Kunci tidak pernah dikirim.
- Poin Latihan (30) terbit penuh sekali setelah ke-10 jawaban masuk ke server, tanpa melihat berapa yang benar. Kartu Poin di layar mengikuti aturan yang sama (0 sampai semua soal terjawab, lalu 30).
- Ujian: browser tidak punya naskah Ujian. `POST /api/belajar/ujian/mulai` memanggil `mulai_ujian` (paket dipilih server) atau `ujian_berjalan` (melanjutkan lembar yang sama bila halaman ditutup). Lembar diserahkan sekaligus lewat `POST /api/belajar/ujian/serahkan` ke `serahkan_ujian`. Server hanya mengembalikan nilai akhir, tidak memberi tahu nomor soal yang salah, dan menerapkan jeda ulang.
- Nilai 100% pada Ujian mencatat poin 70 lewat RPC. Klien hanya SELECT.

## Paket ujian tambahan

Setiap bab aktif (Bab 1, 2, 3) kini punya tiga paket Ujian: `paket-1`, `paket-2`, `paket-3`, masing-masing 10 soal HOTS. `mulai_ujian` memilih satu paket secara acak saat sesi dimulai. Paket tambahan memakai sebaran sub-bab yang sama dengan `paket-1`, tetapi angka, tokoh, dan konteks cerita berbeda. Id soal tiap paket diberi awalan berbeda (`U`, `V`, `W`) dan letak kunci diseimbangkan per paket.

Naskah paket tambahan ada di `src/content-master/paket-ujian-bab1-3.mjs` (tidak di-commit, berisi kunci). Untuk menambah atau mengubah paket: ubah berkas itu, jalankan `node src/content-master/bank-soal-bab1-3.mjs` lalu `npm run sync:keys`. Master memakai `examPackages` (`packageCode`, `questions`). Setelah sinkron, tiap seed bab harus berisi 40 baris (10 Latihan + 30 Ujian) dan berkas `src/data` tidak boleh memuat `correct_index`, `explanation`, `examQuestions`, maupun `examPackages`.

## Pendaftaran anak

Layar `/daftar` kini tersambung ke server. Alur: akun orang tua (buat atau masuk), lalu rumah (buat dengan nama pemilik rekening dan PIN 6 angka, atau gabung dengan kode undangan), lalu profil anak (nama panggilan, kelas, NISN). Jalur server: `GET /api/daftar/status` dan `POST /api/daftar/anak` (RPC `buat_rumah` atau `gabung_rumah`, `pasang_pin_ortu`, `daftar_anak`), serta `POST /api/auth/buat-akun`. NISN hanya diteruskan ke RPC dan diubah menjadi HMAC-SHA256; layar mengosongkan NISN setelah dikirim. Migrasi `04_status_pin_ortu.sql` menambah fungsi `status_pin_ortu()`.

Syarat di server sebelum pendaftaran berhasil: migrasi 01 sampai 04 diterapkan, ekstensi `pgcrypto` aktif, pengaturan `igil.nisn_hmac_key` (minimal 32 karakter) terpasang, dan "Confirm email" di Supabase Auth dimatikan agar orang tua langsung masuk tanpa email.
