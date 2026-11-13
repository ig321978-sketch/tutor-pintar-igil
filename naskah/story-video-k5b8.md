# Video Story Kelas 5 Bab 8 Data (Sub-Bab A, B, C): mesin Story baru

Tiap sub-bab memuat **dua video terpisah**: **Video Materi Kurikulum** (isi Buku Siswa, dilengkapi Buku Panduan Guru) dan **Video Metode Luar**. Mesin sama dengan Kelas 5 Bab 9 dan Kelas 6 Bab 1 sampai 4 (`story/logika-story.ts` dan `story/mesin-story.tsx`, lihat `naskah/story-video-k6b4a.md` dan `naskah/story-video-k5b9.md`). Gambar dirancang khusus tiap sub-bab dan tidak dipakai bab lain: `story/k5b8a-*`, `k5b8b-*`, `k5b8c-*`. Pembungkus: `video-k5b8a.tsx`, `video-k5b8b.tsx`, `video-k5b8c.tsx` (ekspor `VideoK5B8A/B/C({ speakGuru })` tidak berubah).

Uji (pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan gambar akhir adegan, batas kanvas, pemisahan materi dan metode luar, kutipan buku terhadap teks PDF, hitungan mandiri, emoji paling tinggi Emoji 12, kemurnian berkas):
- `node --no-warnings scripts/uji-story-k5b8a.mjs`
- `node --no-warnings scripts/uji-story-k5b8b.mjs`
- `node --no-warnings scripts/uji-story-k5b8c.mjs`

Halaman Buku Siswa = halaman PDF dikurangi 16; Buku Panduan Guru = PDF dikurangi 12. Bab 8 ada di hlm. 235-272 (PDF 251-288): pembuka bab hlm. 235-239 (masuk Video Materi Sub-Bab A), Sub-Bab A hlm. 240-247, Sub-Bab B hlm. 248-252, Sub-Bab C hlm. 252-268, Refleksi hlm. 268, Uji Kompetensi hlm. 269-272 (masuk Sub-Bab C).

## Ukuran (perkiraan suara 0,5 detik per kata)
| Video | Adegan | Ketukan | Kata | Durasi |
|---|---|---|---|---|
| A materi | 11 | 62 | 1243 | 10,4 menit |
| A metode luar | 10 | 40 | 793 | 6,6 menit |
| B materi | 12 | 61 | 1222 | 10,2 menit |
| B metode luar | 10 | 41 | 766 | 6,4 menit |
| C materi | 11 | 62 | 1326 | 11,1 menit |
| C metode luar | 10 | 47 | 738 | 6,2 menit |

Video materi di atas target 9 menit karena isi buku tiap sub-bab panjang (A memuat pembuka bab, B memuat dua teka-teki dan empat kue, C memuat Uji Kompetensi dan pengayaan).

## Isi
- **Sub-Bab A (mengumpulkan data):** Materi: pembuka donat Anggi dan Tabel 8.1, tujuan, peta konsep, Ayo Mengingat Kembali, Eksplorasi 8.1A sayuran favorit (turus, tabel frekuensi, Ayo Berdiskusi), 8.1B Ayo Bekerja Sama, Ayo Berlatih nilai ulangan, refleksi. Metode luar: Data Collection Cycle, Tally Mark Protocol, Frequency Table Construction, Data-to-Decision Reading, ringkasan.
- **Sub-Bab B (piktogram):** Materi: teka-teki 8.2A, kue tradisional dan penjualan kue apem Anggi 8.2B, Ayo Berdiskusi, piktogram tomat Pak Chandra, kesalahan umum, refleksi. Metode luar: Pictograph Scale Legend, Unit Symbol Consistency, Pictograph Error Hunt, Frequency-to-Pictograph Conversion, ringkasan.
- **Sub-Bab C (diagram batang, penutup bab):** Materi: Eksplorasi 8.3A sampai 8.3E (skala, diagram vertikal medali Sea Games, horizontal panen lele, membandingkan dua diagram, diagram batang ganda), Ayo Berlatih (kalori, nilai ulangan), Refleksi, Uji Kompetensi 1-3, pengayaan Panduan Guru. Metode luar: Bar Chart Reading Protocol, Axis Scale Consistency, Comparative Bar Analysis, Double Bar Merge Table, ringkasan.

## Catatan temuan buku
Sub-Bab A (lengkap di catatan sesi `temuan-k5b8a.md`):
- Pembuka bab hlm. 235-239 ikut A; naskah lama menulis A hlm. 240-247.
- Hlm. 244 dan Panduan Guru hlm. 354 menulis bayam disukai 8 anak, padahal Tabel 8.2-8.4, kunci hlm. 353, dan hitungan dari 16 kartu siswa memberi bayam 7 (wortel 8). Video memakai 7.
- Narasi donat hlm. 238: "kacang paling sedikit setiap hari" salah pada Senin; "cokelat naik setiap hari" kurang tepat (Rabu dan Kamis sama-sama 5).
- Ayo Mengingat Kembali (Gambar 8.2) tidak punya kunci; label gambar tertulis "Beralan Kaki".
- Tabel sayuran: total 39 pilihan dari 16 siswa (tiap siswa boleh memilih sampai tiga sayuran), buku tidak menjelaskan. Ayo Berdiskusi nomor 3: hanya "wortel paling banyak" yang tepat.
- Eksplorasi 8.1B tidak memuat data; video memakai contoh sepuluh anak buatan sendiri dan menyebutnya bukan data buku.
- Penomoran tabel Panduan Guru berbeda dari Buku Siswa; butir refleksi 2 tertulis "sederdana".

Sub-Bab B (`temuan-k5b8b.md`):
- Sub-Bab B hlm. 248-252, bukan 248-253 (naskah lama).
- Gambar 8.3: Panduan Guru menyebut kesalahan sengaja di hari Kamis (37 digambar 9 utuh, hanya 36); gambar di Buku Siswa tidak jelas mendukung. Video mengikuti Panduan Guru dan menggambar potongan dari hitungan sendiri.
- Jawaban teka-teki 2b dan 2c serta contoh piktogram tomat hanya berupa gambar; tiga kemungkinan untuk 100 dihitung sendiri (5 tomat; 3 tomat + 5 wortel; 1 tomat + 10 wortel).
- Penomoran gambar berbeda (Gambar 8.3 di BS, 8.1 dan 8.2 di BG). Panduan Guru: typo "apel" (maksudnya apem) dan "Piktogam", alat gunting dan kertas berpetak yang tidak ada di BS, dan istilah "sumbu" untuk piktogram.

Sub-Bab C (`temuan-k5b8c.md`):
- C hlm. 252-268 (naskah lama 253-267), Refleksi hlm. 268, Uji Kompetensi hlm. 269-272.
- Panen lele: kunci Panduan Guru menjumlahkan 32 dan 16 (48) padahal soal meminta selisih (16); pernyataan itu salah, bukan benar. Video memakai selisih.
- Sea Games, pernyataan Asep: soal membandingkan penurunan 2015 dengan 2021, kunci memakai 2017.
- Panduan Guru memuat salinan dari bab lain ("memotong kertas", "faktor bilangan", KPK dan FPB pada pengayaan).
- Pengayaan: kunci menu memakai nasi goreng 300 kkal (total 1.493), tabel 330 kkal (total 1.523); rujukan "Tabel 8.9" seharusnya Tabel 8.11.
- Uji Kompetensi 2f: kunci hanya menyebut minggu 2 yang salah, pada gambar minggu 3 juga tampak berbeda. Diagram kalori: nasi jagung, daging sapi, dan tahu goreng tanpa angka di kunci. Uji Kompetensi 3 pernyataan iii ambigu. Penomoran gambar dan tabel BS dan BG berbeda.
- Naskah lama (`naskah-k5b8.ts`, `kelas5-bab8.json`) tidak memuat emoji di atas Emoji 12.
- Naskah video lama dihapus: `videos` pada `SUB_A58`, `SUB_B58`, `SUB_C58` (kini `[]`), `videos` dan `stories` pada `kelas5-bab8.json`, cabang `k5b8` di `video-visual-k5.tsx`. Bila generator bab dijalankan lagi, isinya akan kembali dan harus dibuang lagi.

## Audit visual
Seluruh 313 ketukan (6 video) dirender lewat rute pratinjau sementara (sudah dihapus) dan kotak batas semua teks diukur untuk mencari teks bertumpuk atau keluar kanvas. Perbaikan: label "miring kiri" (A), kunci 2 kg yang menempel pada sumber (B), label nilai batang ganda yang berimpit, judul sumbu "jenis makanan", ikon centang, dan label "nilai terbesar" (C). Hasil akhir 0 tumpang tindih; satu diagram batang ganda dilihat langsung lewat tangkapan layar.
