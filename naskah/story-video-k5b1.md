# Video Story Kelas 5 Bab 1 Bilangan Cacah Sampai 100.000 (Sub-Bab A, B, C, D): mesin Story baru

Tiap sub-bab memuat **dua video terpisah**: **Video Materi Kurikulum** (isi Buku Siswa, dilengkapi Buku Panduan Guru) dan **Video Metode Luar**. Mesin sama dengan Kelas 5 Bab 2 sampai 9 serta Kelas 6 Bab 1 sampai 4 (`story/logika-story.ts` dan `story/mesin-story.tsx`, lihat `naskah/story-video-k5b5.md`). Gambar dirancang khusus tiap sub-bab: `story/k5b1a-*` sampai `k5b1d-*`. Pembungkus: `video-k5b1a.tsx` sampai `video-k5b1d.tsx` (ekspor `VideoK5B1A/B/C/D({ speakGuru })` tidak berubah). Ini bab terakhir Kelas 5; seluruh Kelas 5 Bab 1 sampai 9 kini memakai mesin Story baru.

Uji (pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan gambar akhir adegan, batas kanvas, pemisahan materi dan metode luar, kutipan buku terhadap teks PDF, hitungan mandiri dan geometri gambar, emoji paling tinggi Emoji 12, kemurnian berkas):
- `node --no-warnings scripts/uji-story-k5b1a.mjs` (9.610 pemeriksaan, 0 gagal)
- `scripts/uji-story-k5b1b.mjs` (10.754, 0 gagal)
- `scripts/uji-story-k5b1c.mjs` (13.029, 0 gagal)
- `scripts/uji-story-k5b1d.mjs` (10.169, 0 gagal)
- `uji-statis-k5b1` (75) dan `uji-lab-k5b1` (5.547) disesuaikan dan lulus; `uji-skenario-umum` (8.433) tetap lulus.

Halaman Buku Siswa = halaman PDF dikurangi 16; Buku Panduan Guru = PDF dikurangi 12. Bab 1 ada di Buku Siswa hlm. 1-28 dan Panduan Guru hlm. 15-42. Pembagian: pembuka bab dan Sub-Bab A (Buku Siswa hlm. 1-9; Panduan Guru hlm. 15-25), B (hlm. 10-15; Panduan Guru hlm. 25-29), C (hlm. 15-17; Panduan Guru hlm. 29-32), D (hlm. 17-28; Panduan Guru hlm. 32-42). Buku Siswa hanya punya satu tabel Refleksi untuk seluruh bab (hlm. 26), dibagi per butir: A nomor 1-3, B nomor 4-5, C nomor 6-7, D nomor 8. Karena C pendek, ia diperkaya dari Panduan Guru (sarana, apersepsi, pemanasan, persiapan guru, Tabel 1.4, miskonsepsi, diferensiasi). Uji Kompetensi 1-6 beserta kunci, rubrik, remedial, pengayaan, dan interaksi orang tua masuk D sebagai penutup bab.

## Ukuran (perkiraan suara 0,5 detik per kata)
| Video | Adegan | Ketukan | Kata | Durasi |
|---|---|---|---|---|
| A materi | 11 | 52 | 1254 | 10,4 menit |
| A metode luar | 10 | 40 | 886 | 7,4 menit |
| B materi | 12 | 58 | 1422 | 11,8 menit |
| B metode luar | 10 | 41 | 1069 | 8,9 menit |
| C materi | 13 | 66 | 1188 | 9,9 menit |
| C metode luar | 10 | 47 | 906 | 7,5 menit |
| D materi | 12 | 54 | 1560 | 13,0 menit |
| D metode luar | 10 | 40 | 1065 | 8,9 menit |

Total 8 video, 88 adegan, 398 ketukan, 9.350 kata, sekitar 77,9 menit suara. Video B materi sedikit di atas target karena memuat Eksplorasi 1.2 beserta Ayo Bermain, dua tabel urutan, Ayo Berlatih, miskonsepsi, diferensiasi; D materi di batas 13 menit karena penutup bab (Eksplorasi 1.4-1.6, Ayo Berlatih, Uji Kompetensi 1-6, rubrik, remedial, pengayaan).

## Isi
- **A (membaca dan menulis, termasuk pembuka bab):** Materi: pembuka, peta konsep, Ayo Menyimak, Mengingat Kembali, Eksplorasi 1.1, membaca bilangan, Ayo Berlatih 1-2, Refleksi 1-3. Metode luar: Place-Value Chart, Extended Dienes, Number Reading, dan metode baru Period Grouping.
- **B (membandingkan dan mengurutkan):** Materi: Eksplorasi 1.2 dan Ayo Bermain, tabel nilai tempat, percakapan, dua tabel urutan, Ayo Berlatih 1-3, miskonsepsi, diferensiasi, Refleksi 4-5. Metode luar: Leftmost Compare, Number Line Order, Benchmark Numbers, dan metode baru Rounding Estimate Compare.
- **C (komposisi dan dekomposisi):** Materi: komposisi uang Asep dan Lukas, Eksplorasi 1.3, cara membayar, miskonsepsi, diferensiasi, Refleksi 6-7. Metode luar: Expanded Form, Flexible Grouping, Standard Form Return, dan metode baru Money Composition.
- **D (operasi hitung, penutup bab):** Materi: Eksplorasi 1.4-1.6 (penjumlahan, pengurangan, perkalian, pembagian bersusun), Ayo Berlatih, Uji Kompetensi 1-6, rubrik, remedial, pengayaan, interaksi orang tua. Metode luar: Standard Algorithm, Regrouping, Estimate First, dan metode baru Inverse Check.

## Catatan temuan buku
Lengkap di catatan sesi `temuan-k5b1a.md` sampai `d.md`. Di semua video, angka kunci disajikan lebih dulu, lalu catatan guru dengan hitungan mandiri.
- **A:** kunci Ayo Berlatih 1a (Panduan Guru hlm. 24) menulis Rp15.590,00 padahal gambar Buku Siswa hlm. 8 Rp15.950,00 (angka tertukar urutannya). Kunci 1b (16.667), 1c (44.567), nomor 2, dan Kayu Tanam benar. Mengingat Kembali dan baris ketiga soal 3 tanpa kunci (hitungan mandiri). Typo "depalan", "Jiwa" berhuruf kapital, judul "Ayo Mengingat Kembali" muncul dua kali di hlm. 3.
- **B:** kunci Ayo Berlatih benar semua. Ayo Bermain, dua pertanyaan Ayo Menyimak Percakapan, dan dua tabel urutan tanpa kunci (hitungan mandiri: papan a paling murah 56.560, d paling mahal 75.360, urutan a, c, b, d). Typo "peserta didik didik" dan "depalan".
- **C:** tabel "Komposisi Uang Lukas" (hlm. 16) sudah terisi 3 di kolom puluh ribuan padahal Lukas punya 6 lembar (dengan 3 hasilnya 33.500, bukan 63.500). Tabel Cara 1-4 (hlm. 17) kosong dan tanpa kunci; hitungan mandiri menemukan tepat empat cara membayar Rp45.600. Seratusan disebut "lembar" di hlm. 15 tetapi "keping" di hlm. 16; Panduan Guru menyuruh "mengerjakan latihan" padahal C tidak punya latihan.
- **D:** kunci pengayaan nota Rp56.900 (Panduan Guru hlm. 41-42) memberi 2 cara padahal ada 3 (cara ketiga: satu koin Rp200 dan dua koin Rp100). Rubrik Uji Kompetensi 4d (hlm. 38) menulis 567 x 107 sedangkan soal dan kunci 55.566 memakai 567 x 98. Refleksi D di Panduan Guru menyebut nomor 5, 6, 7 padahal pernyataan operasi hitung adalah nomor 8. Kunci Ayo Berlatih 1-2 dan Uji Kompetensi 1-6 benar semua.
- Naskah video lama dihapus: `videos` pada `SUB_A51` sampai `SUB_D51` (kini `[]`), `videos` dan `stories` pada `kelas5-bab1.json`, serta seluruh cabang `k5b1` dan impor yang tak terpakai di `video-visual-k5.tsx` (kini hanya tersisa pengganti bawaan; tidak ada berkas `video-visual-k5b1.tsx`). Bila generator bab dijalankan lagi, isinya akan kembali dan harus dibuang lagi. `uji-statis-k5b1.mjs` disesuaikan; `uji-lab-k5b1.mjs` kehilangan enam pemeriksaan yang mencari angka atau kalimat di naskah video lama (20.040, pasangan banding buatan sendiri, garis 38.500/40.200/39.999, contoh 52.307 dan 70.080, 1.400 = 14 ratusan); datanya tetap diperiksa.

## Audit visual
Seluruh 398 ketukan (8 video) dirender lewat rute pratinjau sementara (sudah dihapus; server dev port 3100 mode webpack, sudah dihentikan) dengan `Panggung` pada t=999, kotak batas semua teks yang terlihat diukur terhadap kanvas 300x208 (pembilang dan penyebut bertumpuk diabaikan). Satu temuan: tanda "+" menyentuh angka 50.000 pada hitung bersusun angpau di D angpau-1 ketukan 5 (digeser ke kiri). Tidak ada teks keluar kanvas atau bertumpuk setelah perbaikan.

## Verifikasi live
(diisi setelah deploy)
