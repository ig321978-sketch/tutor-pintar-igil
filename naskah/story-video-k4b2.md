# Video Story Kelas 4 Bab 2 Pecahan (Sub-Bab A sampai E): mesin Story baru

Tiap sub-bab memuat **dua video terpisah**: **Video Materi Kurikulum** (Buku Siswa dilengkapi Buku Panduan Guru) dan **Video Metode Luar**. Mesin sama dengan Kelas 4 Bab 3 sampai 6, Kelas 5 dan Kelas 6 (`story/logika-story.ts`, `story/mesin-story.tsx`; lihat `naskah/story-video-k4b3.md`). Gambar dirancang khusus tiap sub-bab: `story/k4b2a-*` sampai `story/k4b2e-*`. Pembungkus: `video-k4b2a.tsx` sampai `video-k4b2e.tsx` (ekspor `VideoK4B2A..E({ speakGuru })` tidak berubah; tidak lagi memakai `video-k4b2-umum.tsx`, yang masih dipakai Kelas 4 Bab 1).

Offset halaman kelas IV: Buku Siswa = PDF dikurangi 12, Panduan Guru = PDF dikurangi 12. Pembagian (PDF): pembuka bab dan Tujuan Pembelajaran ikut A. Buku Siswa: A 67-74, B 75-77, C 78-82, D 83-86, E 87-94 ditambah Uji Kompetensi 95 dan Refleksi 96. Panduan Guru: A 101-108, B 109-111, C 112-115, D 116-118, E 119-122 ditambah kunci 123-124, rubrik 125-128, remedial 129, pengayaan 130-131, interaksi orang tua 132. Penutup bab ikut E.

## Ukuran (perkiraan suara 0,5 detik per kata)
| Video | Adegan | Ketukan | Kata | Durasi |
|---|---|---|---|---|
| A materi | 12 | 52 | 1433 | 11,9 menit |
| A metode luar | 10 | 37 | 986 | 8,2 menit |
| B materi | 9 | 37 | 878 | 7,3 menit |
| B metode luar | 10 | 39 | 817 | 6,8 menit |
| C materi | 12 | 52 | 1383 | 11,5 menit |
| C metode luar | 10 | 40 | 956 | 8,0 menit |
| D materi | 11 | 47 | 1142 | 9,5 menit |
| D metode luar | 10 | 39 | 913 | 7,6 menit |
| E materi | 16 | 63 | 1671 | 13,9 menit |
| E metode luar | 10 | 34 | 845 | 7,0 menit |

Total 10 video, 110 adegan, 440 ketukan, 11.024 kata, sekitar 91,7 menit suara. E materi mendekati 14 menit karena memuat penutup bab (Uji Kompetensi 10 soal, rubrik, Refleksi, remedial, lima soal pengayaan, interaksi orang tua). B materi pendek (7,3 menit) karena bagian bukunya hanya tiga halaman.

## Isi
Metode luar tiap sub-bab: tiga metode lama (nama lama) ditambah satu metode baru.
- **A (Pecahan dengan Pembilang Satu):** Unit Fraction, Area Model, Number Line Unit, baru **Fair Sharing (Bagi Adil)**.
- **B (Penyebut Sama):** Same Denominator, Compare Numerators, Fraction Bars, baru **Fraction Card Sort (Susun Kartu Pecahan)**.
- **C (Pecahan Senilai):** Equivalent Fractions, Multiply Identity, Simplify, baru **Fraction Wall (Dinding Pecahan)**.
- **D (Desimal Persepuluhan dan Perseratusan):** Decimal Tenths Hundredths, Decimal Grid, Fraction–Decimal Link, baru **Place Value Chart (Tabel Nilai Tempat)**.
- **E (Desimal ke Persen, penutup bab):** Percent as Hundredths, Hundred Grid Percent, Decimal–Percent Link, baru **Scale to One Hundred (Skala ke Seratus)**.

## Catatan temuan buku
Lengkap di catatan sesi `temuan-k4b2a.md` sampai `temuan-k4b2e.md`. Angka kunci disajikan lebih dulu, lalu catatan guru dengan hitungan mandiri.
- **A:** semua kunci cocok. Tabel Hasil Aktivitas tanpa kunci (video memberi contoh berlabel). Tujuan menyebut "mengurutkan" tetapi hanya nomor 3 yang mengurutkan. Gambar nomor 3 hlm. 62 tidak mendukung pembandingan luas (arsiran 1/3 dan 1/4 sama lebar 24,3 pt pada batang 74,9 dan 99,3 pt); kunci tetap benar menurut penyebut.
- **B:** kunci Ayo Berlatih 1 (Panduan Guru hlm. 98) tertulis "2/4 > 1/3", gambarnya 2 bagian lawan 1 bagian dari 4, jadi seharusnya "2/4 > 1/4" (penyebut kedua salah ketik; tanda tetap benar). Tujuan "mengurutkan" hanya terwakili nomor 3. Tanpa bagian miskonsepsi.
- **C:** Buku Siswa hlm. 69 (Tahukah Kalian), cara b: 2/6 dibagi 2 tertulis 2/6, seharusnya 1/3 (salah cetak). Apersepsi Panduan Guru hlm. 100 menyebut "menyamakan penyebut" padahal kegiatan memakai gambar, kali, dan bagi. Aktivitas 2 dan Ayo Berpikir tanpa kunci. Kunci lain cocok.
- **D:** sembilan kunci cocok. Nomor 3 tanpa gambar; buku tidak membahas nol di depan (0,07 lawan 0,7); video menandai adegan itu sebagai tambahan.
- **E:** kunci Pengayaan 4 (hlm. 119) menulis 1/2 < 4/10, padahal 1/2 = 5/10 lebih besar. Kunci Pengayaan 5 menulis 5% = 5/10, seharusnya 5/100. Rubrik butir 6 hanya memuat a-d, tanpa e (99/100 = 0,99). Kunci Pengayaan 2 menyebut "stanley" padahal soal tentang Karel. Kalimat tersasar di Kunci Jawaban hlm. 111. Panduan Remedial bernomor 1-5 padahal bentuknya empat. Pengayaan 1 ambigu. Kunci Uji Kompetensi 1-10 dan bobot rubrik 10 x 10 = 100 benar.
- Naskah video lama dihapus: `videos` pada `SUB_A42` sampai `SUB_E42` (kini `[]`), `videos` dan `stories` pada `kelas4-bab2.json`, cabang `k4b2` dan impor tak terpakai (`BatangPecahanSvg`, `PizzaSvg`) di `video-visual-k4.tsx`. Bila generator bab dijalankan lagi, isinya kembali dan harus dibuang lagi. `uji-statis-k4b2` dan `uji-data-k4b2` disesuaikan.

## Uji
`uji-story-k4b2a` (5.574), `b` (6.206), `c` (6.903), `d` (6.970), `e` (6.414) lulus, 0 gagal; `uji-statis-k4b2` (87), `uji-data-k4b2` (110), `uji-lab-k4b2` (1.266), `uji-skenario-umum` (8.433) lulus; `tsc --noEmit` dan eslint bersih.

## Audit visual
Seluruh 440 ketukan (10 video) dirender lewat rute pratinjau sementara (sudah dihapus; server dev port 3100 mode webpack, sudah dihentikan) dengan `Panggung` pada t=999; kotak batas semua teks terlihat diukur terhadap kanvas 300x208 (pasangan pembilang-penyebut diabaikan). Tiga temuan diperbaiki: "=" dan "0,01" saling menimpa di D materi, "9 dari 9 benar" dan emoji centang di D materi, emoji centang menimpa judul di C materi. Satu tumpang tindih 3 piksel antara emoji anak dan nomor 1-4 di A materi adegan 5 dibiarkan (nomor sengaja di badan anak). Subagen juga memperbaiki beberapa tumpang tindih lewat render sendiri.

## Verifikasi live
(diisi setelah deploy)
