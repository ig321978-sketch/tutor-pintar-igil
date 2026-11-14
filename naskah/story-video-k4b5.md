# Video Story Kelas 4 Bab 5 Bangun Datar (Sub-Bab A, B): mesin Story baru

Tiap sub-bab memuat **dua video terpisah**: **Video Materi Kurikulum** (Buku Siswa dilengkapi Buku Panduan Guru) dan **Video Metode Luar**. Mesin sama dengan Kelas 4 Bab 6, Kelas 5 Bab 1 sampai 9, dan Kelas 6 Bab 1 sampai 4 (`story/logika-story.ts` dan `story/mesin-story.tsx`, lihat `naskah/story-video-k5b1.md` dan `story-video-k4b6.md`). Gambar dirancang khusus tiap sub-bab: `story/k4b5a-*` dan `story/k4b5b-*` (B juga punya `k4b5b-data.ts`: koordinat bangun yang diukur dari vektor PDF). Pembungkus: `video-k4b5a.tsx` dan `video-k4b5b.tsx` (ekspor `VideoK4B5A/B({ speakGuru })` tidak berubah).

Uji (pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan gambar akhir adegan, batas kanvas, pemisahan materi dan metode luar, kutipan buku terhadap teks PDF, hitungan mandiri dan geometri gambar, emoji paling tinggi Emoji 12, kemurnian berkas LF):
- `node --no-warnings scripts/uji-story-k4b5a.mjs` (8.534 pemeriksaan, 0 gagal; geometri 157 bangun dihitung ulang dari titik sudutnya)
- `scripts/uji-story-k4b5b.mjs` (7.391, 0 gagal; 142 kutipan terhadap teks PDF, 17.344 titik contoh geometri)
- `uji-statis-k4b5` (57), `uji-data-k4b5` (45), `uji-lab-k4b5` (530) disesuaikan dan lulus; `uji-skenario-umum` (8.433) tetap lulus. `tsc --noEmit` dan eslint bersih.

Offset halaman kelas IV: Buku Siswa = PDF dikurangi 12, Buku Panduan Guru = PDF dikurangi 12. Bab 5 ada di Buku Siswa hlm. 139-176 (PDF 151-188) dan Panduan Guru hlm. 175-214 (PDF 187-226). Pembagian: A (pembuka bab dan Ciri-Ciri Bangun Datar): Buku Siswa hlm. 139-165, Panduan Guru hlm. 175-194 (Aktivitas 1-5). B (Komposisi dan Dekomposisi, penutup bab): Buku Siswa hlm. 166-176, Panduan Guru hlm. 195-214 (Aktivitas 6-7, Uji Kompetensi 1-15, kunci, rubrik, Refleksi, remedial, pengayaan, interaksi orang tua). Refleksi Buku Siswa hanya satu untuk seluruh bab: A ambil butir ciri bangun, B butir komposisi/dekomposisi dan penutup.

## Ukuran (perkiraan suara 0,5 detik per kata)
| Video | Adegan | Ketukan | Kata | Durasi |
|---|---|---|---|---|
| A materi | 14 | 62 | 1539 | 12,8 menit |
| A metode luar | 10 | 40 | 802 | 6,7 menit |
| B materi | 14 | 64 | 1456 | 12,1 menit |
| B metode luar | 10 | 38 | 755 | 6,3 menit |

Total 4 video, 48 adegan, 204 ketukan, 4.552 kata, sekitar 37,9 menit suara. A materi di atas target karena jatahnya besar (pembuka bab, peta konsep, Aktivitas 1-5, segitiga menurut sisi dan sudut, tujuh segiempat, tabel hubungan, dua Ayo Berlatih); semula 14,0 menit lalu gambaran umum bab dan pengamatan benda sekitar dipangkas. B materi di atas 11 menit karena memuat penutup bab (Aktivitas 6-7, Uji Kompetensi 1-15 beserta kunci, rubrik, lima soal pengayaan); satu adegan Uji Kompetensi 5-13 saja memakai 8 ketukan.

## Isi
- **A (Ciri-Ciri Bangun Datar, termasuk pembuka bab):** Materi: pembuka, peta konsep, Aktivitas 1-5, segitiga menurut sisi dan sudut, segiempat, Ayo Berlatih. Metode luar: van Hiele Level 0-1, Attribute Sort, Geoboard, dan metode baru Property Matrix (Matriks Ciri).
- **B (Komposisi dan Dekomposisi, penutup bab):** Materi: Aktivitas 6-7, Ayo Berlatih 1-2, Uji Kompetensi 1-15 beserta kunci, rubrik, Refleksi, pengayaan, remedial, interaksi orang tua. Metode luar: Compose Shapes, Decompose Shapes, Tangram, dan metode baru Cut and Rearrange (Potong dan Susun Ulang). Kata "Tangram" juga istilah buku, jadi wajar muncul di video materi; nama metode lain hanya di video luar.

## Catatan temuan buku
Lengkap di catatan sesi `temuan-k4b5a.md` dan `temuan-k4b5b.md`. Angka kunci disajikan lebih dulu, lalu catatan guru dengan hitungan atau penalaran mandiri.
- **A:** kunci Ayo Berlatih 3 (a: 1 dan 3) tidak tunggal; belah ketupat sisinya sama tetapi sudutnya tidak, jadi pilihan c (2 dan 3) juga benar. Apersepsi Panduan Guru hlm. 180 menulis persegi adalah trapesium, padahal definisi buku "tepat sepasang sisi sejajar" (persegi punya dua pasang). Kunci Ayo Berlatih 2 nomor 3 (hlm. 193) menulis "tepat sepasang sisi sama panjang", seharusnya sejajar. Kunci Ayo Berpikir 3 bilang diagonal trapesium tidak tegak lurus, padahal trapesium sama kaki (alas 4, atas 2, tinggi 3) punya diagonal tegak lurus. Langkah 2 Aktivitas 5 menulis "gambar jajargenjang" untuk layang-layang; butir tak beraturan hlm. 146 tertulis "beraturan"; penomoran subjudul loncat; beberapa salah ketik.
- **B:** Uji Kompetensi 5a meminta 10 sisi tetapi gambar kunci segi delapan. Kunci 5c berupa bintang bersudut 63 dan 225 derajat bergantian, jadi tidak beraturan menurut ciri kunci nomor 3 sendiri. Kunci Uji Kompetensi 9 menulis "1800" (maksudnya 180 derajat). Kunci pengayaan 1 menjawab "Dapat" untuk segitiga siku-siku sama sisi dari segitiga sama kaki; yang benar "tidak dapat" (segitiga sama sisi bersudut 60 derajat semua). Langkah 4-6 Aktivitas 6 merujuk nomor langkah yang keliru. Ayo Berlatih 2 (paving) tanpa kunci; hitungan mandiri dari gambar 10 keping (4 segitiga siku-siku, 3 trapesium, 1 jajargenjang, 1 persegi, 1 persegi panjang). Tabel Aktivitas 7 tanpa kunci. Kunci Ayo Berlatih 1 (perahu 5, 1, 1) dan Uji Kompetensi 4 benar.
- Naskah video lama dihapus: `videos` pada `SUB_A45` dan `SUB_B45` (kini `[]`), `videos` dan `stories` pada `kelas4-bab5.json`, serta cabang `k4b5` dan impor tak terpakai (`BangunKeliling`, `SegitigaKeliling`) di `video-visual-k4.tsx` (tidak ada berkas `video-visual-k4b5.tsx`). Bila generator bab dijalankan lagi, isinya akan kembali dan harus dibuang lagi. `uji-statis-k4b5.mjs` dan `uji-data-k4b5.mjs` disesuaikan; `uji-lab-k4b5.mjs` tidak perlu diubah.

## Audit visual
Seluruh 204 ketukan (4 video) dirender lewat rute pratinjau sementara (sudah dihapus; server dev port 3100 mode webpack, sudah dihentikan) dengan `Panggung` pada t=999, kotak batas semua teks yang terlihat diukur terhadap kanvas 300x208. Tidak ada teks keluar kanvas. Satu tumpang tindih 2 piksel antara huruf titik "O" dan label "90°" pada A materi adegan 10 ketukan 1 (kotak huruf, tidak mengganggu terbaca) dibiarkan.

## Verifikasi live
(diisi setelah deploy)
