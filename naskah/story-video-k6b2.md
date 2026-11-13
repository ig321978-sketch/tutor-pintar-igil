# Video Story Kelas 6 Bab 2 Rasio (Sub-Bab A, B, C): mesin Story baru

Tiap sub-bab memuat **dua video terpisah**: **Video Materi Kurikulum** (isi Buku Siswa, dilengkapi Buku Panduan Guru) dan **Video Metode Luar**. Mesin sama dengan Bab 3 dan Bab 4 (`story/logika-story.ts` dan `story/mesin-story.tsx`, lihat `naskah/story-video-k6b4a.md`). Gambar dirancang khusus tiap sub-bab dan tidak dipakai bab lain: `story/k6b2a-*`, `k6b2b-*`, `k6b2c-*`. Pembungkus: `video-k6b2a.tsx`, `video-k6b2b.tsx`, `video-k6b2c.tsx` (ekspor `VideoK6B2A/B/C({ speakGuru })` tidak berubah).

Uji (pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan gambar akhir adegan, batas kanvas, pemisahan materi dan metode luar, kutipan buku terhadap teks PDF, hitungan mandiri, emoji paling tinggi Emoji 12, kemurnian berkas):
- `node --no-warnings scripts/uji-story-k6b2a.mjs`
- `node --no-warnings scripts/uji-story-k6b2b.mjs`
- `node --no-warnings scripts/uji-story-k6b2c.mjs`

Halaman buku = halaman PDF dikurangi 14. Bab 2 ada di hlm. 46–74 (PDF 60–88): Sub-Bab A (termasuk pembuka bab) hlm. 46–55, Sub-Bab B hlm. 56–65, Sub-Bab C hlm. 66–74 (termasuk Refleksi, Uji Kompetensi, Pengayaan).

## Ukuran (perkiraan suara 0,5 detik per kata)
| Video | Adegan | Ketukan | Kata | Durasi |
|---|---|---|---|---|
| A materi | 7 | 51 | 1003 | 8,4 menit |
| A metode luar | 10 | 59 | 1077 | 9,0 menit |
| B materi | 7 | 45 | 851 | 7,1 menit |
| B metode luar | 9 | 40 | 732 | 6,1 menit |
| C materi | 8 | 58 | 1131 | 9,4 menit |
| C metode luar | 10 | 54 | 1037 | 8,6 menit |

## Sub-Bab A (Konsep Rasio dan pembuka bab)
- Video Materi: poster Gerakan Satu Juta Pohon dan Pak Wayan; tujuan, pemantik, kata kunci, peta konsep; mengingat kembali (faktor, kelipatan, pecahan); Eksplorasi 2.1 paket bibit A (4 bibit, Rp50.000) dan B (3 bibit, Rp40.000), Rp12.500 lawan Rp13.333 per bibit; Eksplorasi 2.2 pucuk merah dan cemara (4:6 = 2:3, 6:4 = 3:2, 14 pucuk jadi 21 cemara); Latihan 2.1 nomor 2 dan 3; refleksi.
- Video Metode Luar: Part-to-Part Ratio Language, Ordered-Ratio Protocol, GCF Simplify Ratio, Additive vs Multiplicative Comparison (tiap metode dengan konsep dan penerapan), ringkasan.

## Sub-Bab B (Konsep Kesamaan Rasio)
- Video Materi: rak polybag dan Eksplorasi 2.3 (10 m² memuat 12 bibit: 5:6, 25 m² jadi 30 bibit, 24 bibit perlu 20 m²); tabel rasio dan pecahan senilai, pupuk 27,5 gram; Eksplorasi 2.4 bibit TOGA (Rp12.500 lawan Rp11.600 per bibit, pilih paket 5 bibit) dan rasio satuan; 4 bibit per jam dan 50 km per jam; Latihan 2.2 nomor 1 sampai 4; refleksi 12:28.
- Video Metode Luar: Equivalent Ratio Table, Fraction-Equivalence Bridge, Unit Rate Method, Recipe Scaling Factor, ringkasan.

## Sub-Bab C (Penerapan Rasio, Refleksi, Uji Kompetensi, Pengayaan)
- Video Materi: Toko Herbal Tani (3:2 dan 3:5); Eksplorasi 2.5 (72 bibit, 4:5, hias 32 dan obat 40, bagian terhadap bagian dan terhadap keseluruhan); Eksplorasi 2.6 masa panen; satuan waktu harus sama (3:18 = 1:6, 1:3, 12:12 = 1:1, 6 kali dan 2 kali, Ayah lawan Tigor 1:4); Latihan 2.3 nomor 1 (270 anak dan 120 dewasa), nomor 3 (jam ke minggu), nomor 2 (Banyu); Uji Kompetensi nomor 1 sampai 5; Pengayaan; penutup bab.
- Video Metode Luar: Additive Parts Sum, Part-to-Whole Ratio, Common Time Unit Conversion, Time-Rate Scaling, ringkasan.

## Catatan temuan buku
- Naskah lama menulis Bab 2 di hlm. 59–88 (Sub-Bab A "hlm. 64–69"). Halaman yang benar hlm. 46–74 (PDF 60–88). Video baru memakai nomor yang benar.
- Latihan 2.3 nomor 1 (pasar malam): kunci Buku Panduan Guru memakai total 72 dan jawaban 32 anak, 24 dewasa, padahal soal bertotal 390 dengan rasio 9:4. Yang benar 270 anak dan 120 dewasa (390 dibagi 13 = 30). Video memakai hitungan ini.
- Eksplorasi 2.5 butir b dan c: kunci menukar rasio (hias:seluruh 5:9 dan obat:seluruh 4:9). Dari soal hias 4 dan obat 5, yang benar hias:seluruh 4:9 dan obat:seluruh 5:9, sesuai butir d (hias 32, obat 40). Video memakai yang benar.
- Uji Kompetensi nomor 3: kunci menulis susu segar Rp35.000; gambar buku Rp34.500. Hasil kunci (Rp2.300 per kotak, isi 15) cocok dengan Rp34.500. Isi kemasan 12 dan 15 hanya terbaca dari gambar buku dan kunci.
- Eksplorasi 2.1: jumlah bibit paket (4 dan 3) hanya ada di gambar. Kunci memakai Rp12.500 lawan Rp13.333 (pembulatan 40.000 dibagi 3).
- Eksplorasi 2.6: butir d dan e kunci bergeser hurufnya; hasil benar. Kunci memakai 1 bulan = 4 minggu (sesuai tabel buku, hanya pendekatan).
- Latihan 2.1 nomor 1 bergantung data kelas; kunci hanya contoh, tidak dipakai di video.
- Mengingat Kembali (hlm. 49): Buku Siswa meminta pecahan dari Gambar 2.2 (gambar), kunci meminta menggambar 1/3 dan 2/6. Video memakai 1/3 dan 2/6.
- Pembuka bab menyebut rasio sebagai perbandingan dua besaran "yang sama", padahal rasio satuan (bibit per jam, km per jam) membandingkan satuan berbeda; buku sendiri menulis satuannya pada rasio satuan.
- Naskah video lama dihapus: `videos` pada `SUB_A62`, `SUB_B62`, `SUB_C62` (kini `[]`), `videos` dan `stories` pada `kelas6-bab2.json`, cabang `k6b2` di `video-visual-k6.tsx`. Bila generator `src/content-master/buat-k6-bab2.mjs` dijalankan lagi, isinya akan kembali dan harus dibuang lagi.

## Audit visual
Gambar akhir tiap adegan dan seluruh ketukan diperiksa lewat kisi bingkai (rute pratinjau sementara, sudah dihapus). Tumpang tindih teks ditemukan dan diperbaiki di Eksplorasi 2.1 (harga paket), Eksplorasi 2.2 (label kiri-kanan dan judul rasio), Latihan 2.2 nomor 3, Latihan 2.3 nomor 3, dan ringkasan Recipe Scaling Factor.
