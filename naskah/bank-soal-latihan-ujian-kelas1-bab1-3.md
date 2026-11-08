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
- Ujian: browser tidak punya naskah Ujian. `POST /api/belajar/ujian/mulai` memanggil `mulai_ujian` (paket dipilih server) atau `ujian_berjalan` (melanjutkan lembar yang sama bila halaman ditutup). Lembar diserahkan sekaligus lewat `POST /api/belajar/ujian/serahkan` ke `serahkan_ujian`. Server hanya mengembalikan nilai akhir, tidak memberi tahu nomor soal yang salah, dan menerapkan jeda ulang.
- Nilai 100% pada Ujian mencatat poin 70 lewat RPC. Klien hanya SELECT.

## Paket ujian tambahan

Saat ini setiap bab punya satu paket (`paket-1`). `mulai_ujian` sudah memilih paket acak bila ada lebih dari satu. Untuk menambah paket, isi `examPackages` pada master (`packageCode`, `questions`) dan jalankan `npm run sync:keys`.
