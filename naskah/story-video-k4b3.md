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
Deploy Vercel (commit 72e6254) Ready. HTML `igiligil.xyz/ruang-belajar/mtk-4-bab3` diunduh, rantai chunk `_next/static` diikuti tuntas (tiga putaran, 81 chunk); satu chunk memuat keempat nama metode baru (Draw the Next Term, Gambar Suku Berikutnya, Number Line Jumps, Loncatan di Garis Bilangan; "Number Line Jumps" juga muncul di satu chunk lain sebagai metode bab lain). Id video lama (K4B3A-V1, K4B3B-V1) dan judul lama "Jeruk Membesar", "Latihan: Pola Bertambah", "Siap pakai Visual Structure", "Beda Tetap", "Latihan: Mesin Fungsi" tidak ada di chunk mana pun.

## Revisi sesuai pola Kelas 4 Bab 1 dan 2 (gaya guru, pemadatan, Mind-Map dan Infografis susun tab)
- **Video bergaya guru.** Video yang diputar (materi dan metode luar, A dan B) tidak lagi menyebut buku, halaman, soal nomor, kunci, rubrik, temuan, maupun Panduan Guru (suara, teks gambar, judul adegan, subjudul, label `sumber`). Label `sumber` "Materi: ..." atau "Metode luar: ..." (maks 46 huruf), subjudul "Materi kurikulum" dan "Empat metode luar", judul video "Pola Gambar" dan "Pola Bilangan". Di B, "Ayo Berlatih" jadi Latihan 1-8, Uji Kompetensi jadi Uji 1-10, Pengayaan jadi Tantangan 1-5. Kata "buku" sebagai benda diganti (rak buku jadi rak pensil atau rak) dan "gedung pertemuan" jadi "aula" karena regex kata terlarang. Id dan urutan adegan tetap. Tiap `uji-story-k4b3X` memeriksa kata terlarang pada adegan yang diputar. Catatan sesi `temuan-k4b3a.md` dan `temuan-k4b3b.md` memuat temuan buku dan bagian "Revisi gaya guru".
- **Pemadatan.** Tidak diputar lagi (tetap di berkas materi): A `pembuka-bab`, `peta-konsep`, `panduan-awal`; B `pembuka-b`, `rubrik`, `penutup-b`. Uji memakai `M_VIDEO` dan `M` penuh; ambang total ketukan B diturunkan menjadi 70.
- **Ukuran baru yang diputar** (0,5 detik per kata): A materi 9 adegan, 1.024 kata (8,5 menit), luar 814 (6,8); B materi 13 adegan, 1.247 kata (10,4), luar 804 (6,7).
- **Mind-Map susun** (11 simpul): A "Menentukan Benda Berikutnya" (metode: susun dan hitung benda, bandingkan kumpulan, catat dalam tabel); B "Pola Bilangan" (cari beda, tabel analisis, cara cepat loncatan). A bebas istilah pola bilangan/aturan/suku (dijaga uji-lab-k4b3).
- **Infografis susun:** A "Jeruk dan permen" (4x4: Jeruk, Beda jeruk, Permen, Beda permen), B "Empat pola bilangan" (4x4: Tiga suku awal, Beda, Jenis, Suku ke-5).
- **Uji:** uji-story-k4b3a (8.903) dan b (11.086), uji-statis (57), uji-data (49), uji-lab (636), uji-susun-k4b3 (36), uji-susun-logika (4.621), uji-skenario-umum (8.433), uji-peta-konsep, uji-infografis-ringkas: 0 gagal; `tsc` dan eslint bersih.
- **Audit peramban** (server dev 3100, 405 px, profil uji Kelas 4): peta dan Infografis A dan B diselesaikan lewat skrip; semua tab menempel, tidak ada teks terpotong atau halaman melebar. Kata "Membesar" di kolom ke-4 B pas di sel. Server dihentikan, `.next/dev` dihapus, `.claude/launch.json` dipulihkan. Pemutaran visual video belum diperiksa.
