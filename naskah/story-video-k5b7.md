# Video Story Kelas 5 Bab 7 Membandingkan Ciri-Ciri Bangun Datar (Sub-Bab A, B): mesin Story baru

Tiap sub-bab memuat **dua video terpisah**: **Video Materi Kurikulum** (isi Buku Siswa, dilengkapi Buku Panduan Guru) dan **Video Metode Luar**. Mesin sama dengan Kelas 5 Bab 8 dan 9 serta Kelas 6 Bab 1 sampai 4 (`story/logika-story.ts` dan `story/mesin-story.tsx`, lihat `naskah/story-video-k5b8.md` dan `naskah/story-video-k6b4a.md`). Gambar dirancang khusus tiap sub-bab dan tidak dipakai bab lain: `story/k5b7a-*`, `k5b7b-*`. Pembungkus: `video-k5b7a.tsx`, `video-k5b7b.tsx` (ekspor `VideoK5B7A/B({ speakGuru })` tidak berubah).

Uji (pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan gambar akhir adegan, batas kanvas, pemisahan materi dan metode luar, kutipan buku terhadap teks PDF, hitungan mandiri dan geometri gambar, emoji paling tinggi Emoji 12, kemurnian berkas):
- `node --no-warnings scripts/uji-story-k5b7a.mjs` (10.315 pemeriksaan, 0 gagal)
- `node --no-warnings scripts/uji-story-k5b7b.mjs` (4.326 pemeriksaan, 0 gagal)

Halaman Buku Siswa = halaman PDF dikurangi 16; Buku Panduan Guru = PDF dikurangi 12. Bab 7 ada di hlm. 191-234 (PDF 207-250) dan Panduan Guru hlm. 287-343. Pembuka bab hlm. 191-195 masuk Video Materi Sub-Bab A, Sub-Bab A hlm. 196-208, Sub-Bab B hlm. 209-233, Refleksi hlm. 233, Uji Kompetensi hlm. 234.

## Ukuran (perkiraan suara 0,5 detik per kata)
| Video | Adegan | Ketukan | Kata | Durasi |
|---|---|---|---|---|
| A materi | 11 | 61 | 1351 | 11,3 menit |
| A metode luar | 10 | 41 | 879 | 7,3 menit |
| B materi | 12 | 67 | 1465 | 12,2 menit |
| B metode luar | 10 | 40 | 779 | 6,5 menit |

Total 4 video, 43 adegan, 209 ketukan, 4474 kata, sekitar 37,3 menit suara. Video materi di atas target 9-11 menit karena isi padat (A memuat pembuka bab, Uji Kompetensi 1-4, pengayaan 1, Refleksi 1-5; B memuat tujuh eksplorasi 7.2A-7.2G, Uji Kompetensi, pengayaan, Refleksi 6-10). Uji Kompetensi butir 1-4 (segitiga) muncul di A, dan B membahas seluruh kunci Uji Kompetensi 1-10 untuk penutup bab, sehingga butir 1-4 disebut di kedua video.

## Isi
- **Sub-Bab A (segitiga):** Materi: pembuka Candi Sewu, tujuan, peta konsep, Eksplorasi 7.1A (syarat panjang sisi, sedotan), 7.1B-7.1D (jenis menurut sudut dan sisi, jumlah sudut 180 derajat, sama sisi juga sama kaki), Uji Kompetensi 1-4, pengayaan 1, Refleksi 1-5. Metode luar: Triangle Inequality Theorem, Angle Sum Property, Side-Angle Classification, Inclusive Triangle Hierarchy, ringkasan.
- **Sub-Bab B (segi empat):** Materi: Eksplorasi 7.2A-7.2G (segi empat, trapesium, jajargenjang, persegi panjang, belah ketupat, persegi, layang-layang), Ayo Berlatih, miskonsepsi, Refleksi 6-10, Uji Kompetensi, pengayaan. Metode luar: Inclusive Trapezoid Definition, Inclusive Quadrilateral Hierarchy (Van Hiele), Property Comparison Matrix, dan metode baru Diagonal Property Test, ringkasan.

## Catatan temuan buku
Sub-Bab A (lengkap di catatan sesi `temuan-k5b7a.md`):
- Pembuka bab hlm. 191-195 ikut A; A berakhir hlm. 208 (naskah lama menulis 196-209, padahal hlm. 209 sudah memuat Eksplorasi 7.2A).
- Panduan Guru hlm. 311 menulis "sama sisi belum tentu sama kaki", terbalik; yang benar sama kaki belum tentu sama sisi. Video memakai yang benar.
- Buku Siswa hlm. 206 menyalin pertanyaan ciri "sama kaki" ke bagian sama sisi. Typo: "Seempat" (peta konsep), "dimiliiki" berulang, "besat" (BG hlm. 307).
- Buku menulis Candi Sewu di Yogyakarta, padahal umumnya disebut di Klaten dekat perbatasan; video hanya mengutip buku. Kata kunci "keliling" tidak dipakai di materi bab.
- Dialog Komang dan Nisa tidak menyebut siapa berkata apa; video menyebutnya netral. Tabel sedotan, Uji Kompetensi 1 (5, 7, 1 cm tidak bisa) dan pengayaan 1 cocok dengan hitungan mandiri.

Sub-Bab B (`temuan-k5b7b.md`):
- Buku Siswa hlm. 209 memuat ujung A dan awal B. Uji Kompetensi hlm. 234 butir 1-4 tentang segitiga dan 5-10 tentang segi empat.
- Panduan Guru hlm. 329 menulis sudut belah ketupat "A = C, D = B", sedangkan Buku Siswa "A = B, C = D" dan hitungan gambar membenarkan Buku Siswa. Video memakai Buku Siswa.
- Judul 7.2F dan 7.2G berbeda (BS "Ayo Mengingat Kembali", BG "Ayo Bereksplorasi"). Kotak "ciri-ciri jajargenjang" di bawah judul belah ketupat (BS hlm. 225, BG hlm. 331). Daftar pasangan sisi acak di BG hlm. 337. Diferensiasi B tertulis "Subbab A". Typo "demkian", "persegi panjangi".
- Bangun H pada 7.2A adalah segi empat cekung (BG hlm. 315; BS tanpa kunci). Trapesium: buku menerima dua pengertian dan memilih "setidaknya sepasang sisi sejajar". Angka di video B dihitung dari titik sudut gambar sendiri, bukan dari buku.
- Naskah lama (`naskah-k5b7.ts`, `kelas5-bab7.json`) tidak memuat emoji di atas Emoji 12. Naskah video lama dihapus: `videos` pada `SUB_A57` dan `SUB_B57` (kini `[]`), `videos` dan `stories` pada `kelas5-bab7.json`, cabang `k5b7` di `video-visual-k5.tsx` (impor `BangunKeliling` dan `SegitigaKeliling` ikut dibuang). Bila generator bab dijalankan lagi, isinya akan kembali dan harus dibuang lagi.

## Audit visual
Seluruh 209 ketukan (4 video) dirender lewat rute pratinjau sementara (sudah dihapus) dengan `Panggung` pada t=999, dan kotak batas semua teks (2.180 teks) diukur untuk mencari teks bertumpuk atau keluar kanvas 300x208: 0 temuan. Satu tangkapan layar dilihat langsung (pembuka, Candi Sewu, tiga pertanyaan, denah): tata letak wajar. Uji tiap sub-bab juga memeriksa tumpang tindih lewat kotak teks perkiraan (6.761 pasangan di A, 0 temuan) dan geometri gambar (26 busur sudut, 8 tanda siku-siku, 3 kelompok baji 180 derajat).
