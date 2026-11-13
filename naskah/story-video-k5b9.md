# Video Story Kelas 5 Bab 9 Bilangan Cacah sampai 1.000.000 (Sub-Bab A, B, C): mesin Story baru

Tiap sub-bab memuat **dua video terpisah**: **Video Materi Kurikulum** (isi Buku Siswa, dilengkapi Buku Panduan Guru) dan **Video Metode Luar**. Mesin sama dengan Kelas 6 Bab 1 sampai 4 (`story/logika-story.ts` dan `story/mesin-story.tsx`, lihat `naskah/story-video-k6b4a.md`). Gambar dirancang khusus tiap sub-bab dan tidak dipakai bab lain: `story/k5b9a-*`, `k5b9b-*`, `k5b9c-*`. Pembungkus: `video-k5b9a.tsx`, `video-k5b9b.tsx`, `video-k5b9c.tsx` (ekspor `VideoK5B9A/B/C({ speakGuru })` tidak berubah).

Uji (pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan gambar akhir adegan, batas kanvas, pemisahan materi dan metode luar, kutipan buku terhadap teks PDF, hitungan mandiri, emoji paling tinggi Emoji 12, kemurnian berkas):
- `node --no-warnings scripts/uji-story-k5b9a.mjs`
- `node --no-warnings scripts/uji-story-k5b9b.mjs`
- `node --no-warnings scripts/uji-story-k5b9c.mjs`

Halaman Buku Siswa = halaman PDF dikurangi 16; Buku Panduan Guru = PDF dikurangi 12. Bab 9 ada di hlm. 273-292 (PDF 289-308): pembuka bab hlm. 273-275 (masuk Video Materi Sub-Bab A), Sub-Bab A hlm. 276-284, Sub-Bab B hlm. 284-288, Sub-Bab C hlm. 288-290, Refleksi hlm. 290, Uji Kompetensi hlm. 291-292 (masuk Sub-Bab C).

## Ukuran (perkiraan suara 0,5 detik per kata)
| Video | Adegan | Ketukan | Kata | Durasi |
|---|---|---|---|---|
| A materi | 11 | 63 | 1187 | 9,9 menit |
| A metode luar | 10 | 45 | 843 | 7,0 menit |
| B materi | 10 | 52 | 1012 | 8,4 menit |
| B metode luar | 10 | 41 | 740 | 6,2 menit |
| C materi | 10 | 56 | 1157 | 9,6 menit |
| C metode luar | 10 | 54 | 771 | 6,4 menit |

Video materi A dan C sedikit di atas target 9 menit (A memuat lima harga komputer yang masing-masing dibaca dan diisi ke tabel; C memuat Uji Kompetensi).

## Isi
- **Sub-Bab A (baca, tulis, nilai tempat):** Materi: pembuka sensus, tujuan, Ayo Mengingat Kembali, Eksplorasi 9.1A lemari Jepara 979.875, 9.1B Gianyar 963.000 dan aturan titik pemisah, Ayo Bermain kartu bilangan, 9.1C nota 324.569, 9.1D uang Ibu Lukas, Ayo Berlatih 1-3, refleksi. Metode luar: Place Value Chart Protocol, Indonesian Number-Name Mapping, Digit-Place Value Link, Three-Digit Group Chunking, ringkasan.
- **Sub-Bab B (banding dan urut):** Materi: Eksplorasi 9.2A harga sepatu (tabel nilai tempat, nomor 2-12), 9.2B wisatawan Yogyakarta, Ayo Berlatih 1 (tanda) dan 2 (barisan), kesalahan umum, pendampingan guru, refleksi. Metode luar: Leftmost Place Priority, Digit-by-Digit Comparison, Ordering Protocol, Number Line Placement, ringkasan.
- **Sub-Bab C (komposisi, dekomposisi, penutup bab):** Materi: Eksplorasi 9.3A uang Yosep 623.000 dan Komang 493.000, 9.3B jam tangan 345.600 (tepat empat cara membayar), Refleksi, Uji Kompetensi 1-5, pengayaan. Metode luar: Part-Whole Place Model, Expanded Form Composition, Flexible Decomposition, Money Denomination Composition, ringkasan.

## Catatan temuan buku
Sub-Bab A:
- Naskah lama menulis Sub-Bab A hlm. 276-284 tanpa pembuka bab hlm. 273-275; video baru memasukkannya.
- Kunci Buku Panduan Guru Ayo Berlatih nomor 2: bacaan speaker 296.575 tertulis "dua ratus ribu sembilan puluh enam ribu ..." (kata ribu dua kali); benar "dua ratus sembilan puluh enam ribu lima ratus tujuh puluh lima". Video menyebutnya.
- Eksplorasi 9.1A-9.1D, Ayo Bermain, dan Ayo Mengingat Kembali tidak punya kunci; jawaban dihitung sendiri (uang Ibu Lukas 155.000; enam kartu dapat disusun 720 cara).
- Ayo Mengingat Kembali menulis kepala kolom "Sepuluh Ribuan" (tabel lain "Puluh Ribuan").
- Eksplorasi 9.1C menyebut "dipotong diskon", padahal empat barang di nota berjumlah tepat 324.569.
- Gambar lemari: Gambar 9.2 di Buku Siswa, tetapi Gambar 9.1 di Panduan Guru. Panduan Guru juga menyuruh permainan kartu "soal Ayo Berlatih" (maksudnya Ayo Bermain).
- Panduan Guru menyebut "Subbab D" (operasi hitung) yang tidak ada di buku. Gambar 9.1 (grafik penduduk) tidak punya angka terbaca; video tidak mengarang angka.

Sub-Bab B:
- Sub-Bab B hlm. 284-288, bukan 284-287 (naskah lama).
- Kunci Ayo Berlatih 2b memuat 1.100.000, melewati batas bab; video mengikuti kunci dan menyebut catatannya.
- Eksplorasi 9.2A nomor 4 (ribuan): ketiga sepatu sama-sama 2.000, jadi tidak ada satu jawaban. Kunci Eksplorasi 9.2A dan 9.2B tidak ada; dihitung sendiri.
- Gambar 9.6 adalah grafik garis (bukan batang); penyebab turun tajam 2020 (69.968) tidak dijelaskan buku, video tidak mengarang.
- Soal 9.2B memakai kata "Susunlah" (istilah Sub-Bab C); video memakai "urutkan".
- Panduan Guru menyebut "dua komposisi uang" dan "Ayo Bermain" untuk Sub-Bab B, padahal buku memakai sepatu dan data wisatawan.

Sub-Bab C:
- Naskah lama menulis C hlm. 287-290; C sebenarnya hlm. 288-290, Refleksi hlm. 290, Uji Kompetensi hlm. 291-292.
- Tabel Eksplorasi 9.3A memasang satu angka per kolom, padahal 80.000 + 30.000 = 110.000 melebihi satu kolom (perlu penukaran ke ratus ribuan); video menjelaskannya.
- Eksplorasi 9.3B: uang Ibu 461.800 cukup; tepat empat cara membayar (dihitung dengan pencacahan); Panduan Guru tidak memberi kunci.
- Uji Kompetensi 4c: Buku Siswa "lebih kecil" (benar), Panduan Guru "lebih besar" dengan kunci Salah. 4d: Buku Siswa "delapan ratusan" (salah), Panduan Guru "sembilan ratusan" tetapi kunci tetap Salah. 4e: jumlahnya 203.035, bukan 203.305. Video mengikuti Buku Siswa.
- Uji Kompetensi 5: soal "dana yang lebih banyak" ambigu; pilihan hanya memuat 354.500 (bukan selisih 8.900).
- Rubrik Panduan Guru nomor 3 memuat soal berbeda dari Buku Siswa; waktu Sub-Bab C tercetak "100.000 JP"; sumber bacaan menyebut buku Kelas III dan IV; pengayaan menulis "Rp 1.000,000".
- Naskah lama (`naskah-k5b9.ts`, `kelas5-bab9.json`) memuat emoji U+1FAB5 (Emoji 13); tidak dipakai video baru dan tidak diubah di sini.
- Naskah video lama dihapus: `videos` pada `SUB_A59`, `SUB_B59`, `SUB_C59` (kini `[]`), `videos` dan `stories` pada `kelas5-bab9.json`, cabang `k5b9` di `video-visual-k5.tsx`. Bila generator `buat-k5-bab9.mjs` dijalankan lagi, isinya akan kembali dan harus dibuang lagi.

## Audit visual
Seluruh 311 ketukan (6 video) dirender lewat rute pratinjau sementara (sudah dihapus) dan kotak batas semua teks diukur untuk mencari teks bertumpuk atau keluar kanvas. Perbaikan: catatan kunci keliru (A), pertanyaan yang menutup label "6 angka" dan kartu "5 angka" (B), ikon silang dan centang (B), ikon centang dan ulang yang menutup sumber (C). Hasil akhir 0 tumpang tindih.
