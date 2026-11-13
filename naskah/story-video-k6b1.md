# Video Story Kelas 6 Bab 1 Pecahan dan Desimal (Sub-Bab A, B, C): mesin Story baru

Tiap sub-bab memuat **dua video terpisah**: **Video Materi Kurikulum** (isi Buku Siswa, dilengkapi Buku Panduan Guru) dan **Video Metode Luar**. Mesin sama dengan Bab 2, 3, dan 4 (`story/logika-story.ts` dan `story/mesin-story.tsx`, lihat `naskah/story-video-k6b4a.md`). Gambar dirancang khusus tiap sub-bab dan tidak dipakai bab lain: `story/k6b1a-*`, `k6b1b-*`, `k6b1c-*`. Pembungkus: `video-k6b1a.tsx`, `video-k6b1b.tsx`, `video-k6b1c.tsx` (ekspor `VideoK6B1A/B/C({ speakGuru })` tidak berubah).

Uji (pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan gambar akhir adegan, batas kanvas, pemisahan materi dan metode luar, kutipan buku terhadap teks PDF, hitungan mandiri, emoji paling tinggi Emoji 12, kemurnian berkas):
- `node --no-warnings scripts/uji-story-k6b1a.mjs`
- `node --no-warnings scripts/uji-story-k6b1b.mjs`
- `node --no-warnings scripts/uji-story-k6b1c.mjs`

Halaman buku = halaman PDF dikurangi 14. Bab 1 ada di hlm. 1-44 (PDF 15-58): pembuka bab hlm. 1-6 (masuk Video Materi Sub-Bab A), Sub-Bab A hlm. 7-16, Sub-Bab B hlm. 16-29, Sub-Bab C hlm. 29-44 (termasuk Refleksi, Uji Kompetensi, dan Pengayaan).

## Ukuran (perkiraan suara 0,5 detik per kata)
| Video | Adegan | Ketukan | Kata | Durasi |
|---|---|---|---|---|
| A materi | 9 | 64 | 1173 | 9,8 menit |
| A metode luar | 10 | 49 | 787 | 6,6 menit |
| B materi | 10 | 60 | 1133 | 9,4 menit |
| B metode luar | 10 | 49 | 785 | 6,5 menit |
| C materi | 10 | 56 | 1195 | 10,0 menit |
| C metode luar | 10 | 46 | 892 | 7,4 menit |

Video materi sedikit di atas target 9 menit karena isi buku tiap sub-bab panjang (Sub-Bab C memuat seluruh penutup bab).

## Sub-Bab A (Perkalian Pecahan dan pembuka bab)
- Video Materi: pembuka Agam dan Ayah di penampungan air, tujuan, pemantik, kata kunci, peta konsep; Mengingat Kembali; permasalahan dan Eksplorasi 1.1 (ember besar dan kecil, 2 x 3/5 = 6/5, miskonsepsi 6/10, aturan a x b/c); Eksplorasi 1.2 (2/3 dari 15 = 10) dan Ayo Berkomunikasi; Latihan 1.1 nomor 1 sampai 4; refleksi.
- Video Metode Luar: Area Model Multiplication, Whole-as-Fraction, Straight-Arrow Multiply, Commutative Multiply Check (konsep dan penerapan), ringkasan.

## Sub-Bab B (Pembagian Pecahan)
- Video Materi: Eksplorasi 1.3 (1/2 : 3 = 1/6, 1/3 : 3 = 1/9), kesimpulan, cara Rini dan Berpikir Kreatif (pita), Eksplorasi 1.4 (3 : 1/4 = 12, 3 : 1/2 = 6, 3 : 1/5 = 15, 3 : 2/5 = 15/2) dan aturan kali kebalikan, Latihan 1.2 nomor 1 sampai 4, refleksi.
- Video Metode Luar: Partition Division, Reciprocal Flip, Cross-Arrow Divide, Repeated-Subtraction Measurement, ringkasan.

## Sub-Bab C (Bilangan Desimal, penutup bab)
- Video Materi: Mengingat Kembali, Eksplorasi 1.5 (1/2 = 0,5 = 0,50; 1/5 = 0,2), Eksplorasi 1.6 (nilai tempat, urutan jarak), Latihan 1.3 nomor 1 sampai 4, Refleksi, Uji Kompetensi 1 sampai 5, Pengayaan.
- Video Metode Luar: Equivalent Fraction to Tenths and Hundredths, Grid Tenths-Hundredths Link, Decimal Place-Value Chart, Decimal Compare-and-Order, ringkasan.

## Catatan temuan buku
Sub-Bab A:
- Naskah lama menulis Sub-Bab A hlm. 7-15. Yang benar hlm. 7-16 (pembuka bab hlm. 1-6; Sub-Bab B baru mulai hlm. 16).
- Soal permasalahan (hlm. 7) menanyakan 5 ember besar dan 5 ember kecil, tetapi Eksplorasi 1.1 dan kuncinya hanya membahas 5 besar dan 2 kecil. Video menambah 5 ember kecil = 3 m2 dengan hitungan sendiri.
- Hlm. 11 tertulis "2 ember besar" padahal gambarnya 2 ember kecil (salah ketik); video memakai ember kecil.
- Ayo Berpikir Kritis hlm. 12 ambigu; kunci membandingkan dengan pecahannya (5 x 1/5 = 1 lebih besar dari 1/5) sehingga pernyataan salah. Video mengikuti kunci.
- Kunci Ayo Berefleksi menulis penyebut "d" yang tidak ada (seharusnya b).
- Pembuka bab memakai "1/5 dari 2/3" dan "2/3 dibagi 2" (materi yang belum diajarkan, jawaban tidak tertulis). Video tidak menghitungnya.
- Mengingat Kembali tidak punya kunci; jawaban dihitung dari gambar (4 x 6 = 24, 20 : 5 = 4, hanya jeruk 8 dari 12 yang 2/3).
- Latihan 1.1 nomor 3c: kunci memakai pecahan kali pecahan (belum diajarkan); nomor 4 hanya meminta membuat cerita, contoh kunci menambah pertanyaan jarak sisa.

Sub-Bab B:
- Sub-Bab B hlm. 16-29, bukan 15-29 (naskah lama).
- Latihan 1.2 nomor 3b: kunci menulis sisa cokelat 1/2 bagian. Hitungan benar 5 - 14/3 = 1/3 batang; 1/2 hanya benar sebagai setengah porsi. Video memakai 1/3 batang.
- Cara Rini (4/3 : 2 = 2/3): kunci menyebutnya salah, padahal "cara pertama" kunci sendiri sama dengan cara Rini. Video menyatakan cara Rini benar dan menunjukkan cara umum (kali 1/2).
- Pembahasan Eksplorasi 1.3 menyebut "Eksplorasi 1.4 bagian (b)" dan "(c)" padahal maksudnya Eksplorasi 1.3.
- Eksplorasi 1.4 d (kesimpulan) kosong di buku dan kunci; video mengisinya sendiri. Eksplorasi 1.3 c meminta satuan "bagian" padahal jawabannya liter; huruf butir e dan f Eksplorasi 1.4 tidak sesuai isinya.

Sub-Bab C:
- Latihan 1.3 nomor 4: kunci menyebut natrium 88,6 mg paling kecil; benar hanya setelah mg diubah ke gram (0,0886 g), tanpa perintah konversi di soal. Video menjelaskannya.
- Gambar 1.9: papan "2.1 m" memakai titik desimal; Mengingat Kembali a, b, c tidak punya kunci. Penomoran gambar Buku Siswa (1.9 dan 1.10) berbeda dengan Panduan Guru (1.5 dan 1.6).
- Ayo Berpikir Kritis hlm. 40 (2,49 lawan 2,9) tidak punya kunci; dihitung sendiri (2,49 lebih kecil).
- Tujuan Sub-Bab C di kunci menulis "sampai sepersepuluh" padahal buku memakai perseratusan.
- Uji Kompetensi nomor 4: kata-kata kunci tidak cocok dengan soal (hasil 5/32 benar). Nomor 5: "5 4/5" terpecah di teks PDF, cocok dengan kunci 5,8. Kunci Pengayaan perkalian pecahan hanya menyebut "kalikan penyebut".
- Naskah lama (`naskah-k6b1.ts`, `kelas6-bab1.json`) memuat emoji U+1FAB4 (Emoji 13) pada ikon; tidak dipakai video baru dan tidak diubah di sini.
- Naskah video lama dihapus: `videos` pada `SUB_A61`, `SUB_B61`, `SUB_C61` (kini `[]`), `videos` dan `stories` pada `kelas6-bab1.json`, cabang `k6b1` di `video-visual-k6.tsx` (fungsi kini mengembalikan null). Bila generator bab dijalankan lagi, isinya akan kembali dan harus dibuang lagi.

## Audit visual
Seluruh 59 adegan diperiksa lewat rute pratinjau sementara (sudah dihapus): tiap ketukan dirender, kotak batas semua teks diukur untuk mencari teks bertumpuk atau keluar kanvas, dan sejumlah adegan dilihat lewat tangkapan layar. Perbaikan: label jeruk (A), "= 1/3" pada pizza (A), ikon pita dan teks (B), "1 liter" yang menumpuk label gelas (B), "0,5 = 0,50" (C), "= 0,25" (C), pecahan lama yang tertinggal pada kisi persepuluhan (C), kalimat penutup urutan gizi (C).
