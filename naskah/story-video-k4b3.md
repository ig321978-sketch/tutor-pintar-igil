# Video Story Kelas 4 Bab 3 Pola Gambar dan Pola Bilangan (Sub-Bab A, B): mesin Story baru

Tiap sub-bab memuat **dua video terpisah**: **Video Materi Kurikulum** (Buku Siswa dilengkapi Buku Panduan Guru) dan **Video Metode Luar**. Mesin sama dengan Kelas 4 Bab 4 sampai 6, Kelas 5 dan Kelas 6 (`story/logika-story.ts`, `story/mesin-story.tsx`; lihat `naskah/story-video-k4b4.md`). Gambar dirancang khusus tiap sub-bab: `story/k4b3a-*` dan `story/k4b3b-*`. Pembungkus: `video-k4b3a.tsx` dan `video-k4b3b.tsx` (ekspor `VideoK4B3A/B({ speakGuru })` tidak berubah).

Offset halaman kelas IV: Buku Siswa = PDF dikurangi 12, Panduan Guru = PDF dikurangi 12. A (pembuka bab dan Pola Gambar): Buku Siswa PDF 97-106, Panduan Guru PDF 133-140. B (Pola Bilangan, penutup bab): Buku Siswa PDF 107-114 (Uji Kompetensi, Refleksi), Panduan Guru PDF 141-156 (kunci, rubrik, remedial, pengayaan, interaksi orang tua).

## Ukuran (perkiraan suara 0,5 detik per kata)
| Video | Adegan | Ketukan | Kata | Durasi |
|---|---|---|---|---|
| A materi | 12 | 54 | 1425 | 11,9 menit |
| A metode luar | 10 | 39 | 828 | 6,9 menit |
| B materi | 16 | 62 | 1613 | 13,4 menit |
| B metode luar | 10 | 34 | 804 | 6,7 menit |

Total 4 video, 48 adegan, 189 ketukan, 4.670 kata, sekitar 38,9 menit suara. B materi sedikit di atas 13 menit karena penutup bab padat (Uji Kompetensi 10 soal, rubrik, lima soal pengayaan, remedial, Refleksi, interaksi orang tua).

## Isi
- **A (Pola Gambar):** Metode luar: Repeating Pattern, Growing Pattern, Visual Structure, dan metode baru **Draw the Next Term (Gambar Suku Berikutnya)**: tebak kumpulan berikutnya dari selisih, gambar, hitung, periksa (Ayo Berlatih 1-4 meminta menentukan banyak benda selanjutnya).
- **B (Pola Bilangan, penutup bab):** Metode luar: Arithmetic Sequence, Function Machine, Table of Values, dan metode baru **Number Line Jumps (Loncatan di Garis Bilangan)** (buku menggambar beda sebagai panah loncatan, Buku Siswa hlm. 97-98 dan kunci Pengayaan 4-5). Nama yang sama dipakai di bab lain, tidak di K4 Bab 3.

## Catatan temuan buku
Lengkap di catatan sesi `temuan-k4b3a.md` dan `temuan-k4b3b.md`. Berbeda dengan Bab 4, semua kunci cocok dengan hitungan mandiri.
- **A:** tabel Aktivitas 1 dan 2 tanpa kunci (hitungan mandiri: Aktivitas 1 selisih 1, 2, 2, 3 dan kumpulan ke-4 4, 8, 7, 11; Aktivitas 2 selisih -1, -2, -2, -2 dan kumpulan ke-4 1, 0, 1, 2). Tujuan menyebut "membuat pola gambar" tetapi soal hanya meminta menentukan. Panduan Guru hlm. 127 blok pola mengecil membuka dengan kalimat "pola gambar membesar" (salinan); hlm. 124 kalimat ilmuwan memakai "pola bilangan" disalin dari B; hlm. 128 salah ketik "Pilhan". Tantangan pembuka tidak dibahas lagi.
- **B:** Buku Siswa hlm. 96 murid menjawab 12 untuk bilangan ke-6 deret 3, 5, 7, 9, 11 (benar 13; sengaja salah, ditandai di video). Uji Kompetensi 6 (6, 12, kosong, 24, kosong): "dikali dua" tidak cocok, hanya +6. Pengayaan 3-5 memakai beda yang berubah satu demi satu padahal tujuan dan Latihan hanya beda tetap. Rubrik 10 butir x 10 = 100 benar; butir 1-4 "Lengkapilah" padahal soal "Tentukan"; butir 9 "hasil panen" padahal soal "penjualan"; rubrik keterampilan menilai tugas proyek yang tak ada di buku. Salah ketik "pesera didik" (hlm. 131), "guru didik" (hlm. 144).
- Naskah video lama dihapus: `videos` pada `SUB_A43` dan `SUB_B43` (kini `[]`), `videos` dan `stories` pada `kelas4-bab3.json`, cabang `k4b3` dan impor tak terpakai (`DeretSvg`, `PolaBentukSvg`) di `video-visual-k4.tsx`. Bila generator bab dijalankan lagi, isinya kembali dan harus dibuang lagi. `uji-statis-k4b3` dan `uji-data-k4b3` disesuaikan.

## Uji
`uji-story-k4b3a.mjs` (9.471 pemeriksaan, 145 kutipan PDF), `uji-story-k4b3b.mjs` (12.112, 141 kutipan), `uji-statis-k4b3` (57), `uji-data-k4b3` (49), `uji-lab-k4b3` (636), `uji-skenario-umum` lulus, 0 gagal; `tsc --noEmit` dan eslint bersih.

## Audit visual
Seluruh 189 ketukan dirender lewat rute pratinjau sementara (sudah dihapus; server dev port 3100 mode webpack, sudah dihentikan) dengan `Panggung` pada t=999; kotak batas semua teks terlihat diukur terhadap kanvas 300x208. Satu temuan diperbaiki: tanda "+" dan "−" menimpa teks kartu di A materi adegan 1 (digeser ke bawah kartu). Subagen B sebelumnya juga memperbaiki tiga tumpang tindih lewat render sendiri. Ukuran ulang: bersih. Tumpang tindih emoji dan bangun tidak diukur.

## Verifikasi live
(diisi setelah deploy)
