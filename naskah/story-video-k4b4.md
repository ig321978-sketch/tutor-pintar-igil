# Video Story Kelas 4 Bab 4 Pengukuran Luas dan Volume (Sub-Bab A, B): mesin Story baru

Tiap sub-bab memuat **dua video terpisah**: **Video Materi Kurikulum** (Buku Siswa dilengkapi Buku Panduan Guru) dan **Video Metode Luar**. Mesin sama dengan Kelas 4 Bab 5 dan 6, Kelas 5 dan Kelas 6 (`story/logika-story.ts`, `story/mesin-story.tsx`; lihat `naskah/story-video-k4b5.md`). Gambar dirancang khusus tiap sub-bab: `story/k4b4a-*` dan `story/k4b4b-*`. Pembungkus: `video-k4b4a.tsx` dan `video-k4b4b.tsx` (ekspor `VideoK4B4A/B({ speakGuru })` tidak berubah).

Offset halaman kelas IV: Buku Siswa = PDF dikurangi 12, Panduan Guru = PDF dikurangi 12. A (pembuka bab dan Pengukuran Luas): Buku Siswa PDF 115-133, Panduan Guru PDF 156-166. B (Pengukuran Volume, penutup bab): Buku Siswa PDF 134-150 (Uji Kompetensi, Refleksi), Panduan Guru PDF 167 sampai akhir bab (kunci, rubrik, remedial, pengayaan, interaksi orang tua). Refleksi hanya satu untuk seluruh bab: A ambil butir luas, B butir volume dan penutup.

## Ukuran (perkiraan suara 0,5 detik per kata)
| Video | Adegan | Ketukan | Kata | Durasi |
|---|---|---|---|---|
| A materi | 15 | 71 | 1551 | 12,9 menit |
| A metode luar | 10 | 39 | 807 | 6,7 menit |
| B materi | 16 | 63 | 1614 | 13,4 menit |
| B metode luar | 10 | 33 | 706 | 5,9 menit |

Total 4 video, 51 adegan, 206 ketukan, 4.678 kata, sekitar 38,9 menit suara. A materi hampir 13 menit karena memuat pembuka bab, peta konsep, Aktivitas 1-2, Kegiatan A.1-A.2, tiga latihan, konversi satuan, miskonsepsi dan diferensiasi. B materi 13,4 menit karena memuat penutup bab (Aktivitas 3-4, Ayo Berlatih, Uji Kompetensi beserta kunci, rubrik, lima soal pengayaan, Refleksi, interaksi orang tua).

## Isi
- **A (Pengukuran Luas):** Materi mengikuti buku. Metode luar: Area as Covering, Array Area, Nonstandard then Standard, dan metode baru **Grid Count (Hitung Petak)**: tiap petak diberi nomor, dua setengah petak digabung jadi satu (dipilih karena buku memuat segitiga pada kisi, Ayo Berlatih 3).
- **B (Pengukuran Volume, penutup bab):** Metode luar: Volume as Filling, Layer Model, Displacement Idea, dan metode baru **Benchmark Referents (Patokan Benda Sehari-hari)** (Buku Siswa hlm. 130 memuat patokan sendok 5 ml, cangkir 240 ml, botol 1 l, ember 10 l, tong 150 l).

## Catatan temuan buku
Lengkap di catatan sesi `temuan-k4b4a.md` dan `temuan-k4b4b.md`. Angka kunci disajikan lebih dulu, lalu catatan guru dengan hitungan mandiri.
- **A:** Kegiatan A.1/A.2 meja guru 21 uang = 12 origami (rasio 1,75), semestinya 24 uang kertas. Kunci Panduan Guru hlm. 151 bagian d menulis "bangun A adalah 15"; yang 15 adalah bangun D. Miskonsepsi nomor 3 menulis ukuran persegi satuan "berbeda-beda", bertentangan dengan seluruh sub-bab. Ayo Mencoba 2 (hlm. 119) "sisi persegi adalah 1 cm²" (seharusnya 1 cm). Tujuan pembelajaran hlm. 104 butir keempat mengulang "menduga luas" (mestinya volume). Ayo Berlatih 1 dan tabel Aktivitas 1 tanpa kunci (hitungan mandiri). Angka kunci lain benar (8, 21, 4, 12; 13, 13, 11, 15; 9; segitiga 6 petak penuh + 6 setengah; 1 m² = 10.000 cm²).
- **B:** Pengayaan 2 kunci 0,623 m²; hitungan benar 6.350 cm² = 0,635 m². Pengayaan 5 (12 l 156 ml) kunci memakai 12 l 136 ml dan menulis 12 × 900 = 11.700; yang benar 10.800 ml, sisa 1.356 ml, bukan 436 ml. Uji Kompetensi 3D kunci 95 persegi satuan, padahal gambar D berkerangka 10 × 15 = 150 (A 15, B 84, C 12 benar). Rubrik hlm. 166-167: bobot butir 5 kosong (harus 10 agar jumlah 100), urutan butir 6-7 tertukar, butir 3 memberi skor 5 untuk "tidak menjawab". Beberapa salah ketik ("km3" untuk luas, "pengukuran luas" di miskonsepsi volume). Uji Kompetensi 1-3 sebenarnya soal panjang dan luas. Jumlah kubus, tangki 1.249 l 675 ml dan 156 l 880 ml benar.
- Naskah video lama dihapus: `videos` pada `SUB_A44` dan `SUB_B44` (kini `[]`), `videos` dan `stories` pada `kelas4-bab4.json`, cabang `k4b4` dan impor tak terpakai (`BangunLuas`, `VolumePetakSvg`) di `video-visual-k4.tsx`. Bila generator bab dijalankan lagi, isinya kembali dan harus dibuang lagi. `uji-statis-k4b4` dan `uji-data-k4b4` disesuaikan.

## Uji
`uji-story-k4b4a.mjs` (7.207 pemeriksaan, 0 gagal), `uji-story-k4b4b.mjs` (6.010, 191 kutipan terhadap teks PDF, 0 gagal), `uji-statis-k4b4` (57), `uji-data-k4b4` (48), `uji-lab-k4b4` (496), `uji-skenario-umum` (8.433) lulus; `tsc --noEmit` dan eslint bersih.

## Audit visual
Seluruh 206 ketukan (4 video) dirender lewat rute pratinjau sementara (sudah dihapus; server dev port 3100 mode webpack, sudah dihentikan) dengan `Panggung` pada t=999; kotak batas semua teks terlihat diukur terhadap kanvas 300x208. Dua temuan diperbaiki: teks sumber adegan metode luar B terlalu panjang (keluar kanvas, dipersingkat) dan label "A" tumpang tindih emoji botol di B materi adegan 3 (digeser turun). Ukuran ulang: bersih.

## Verifikasi live
Deploy Vercel (commit 7210376) Ready. HTML `igiligil.xyz/ruang-belajar/mtk-4-bab4` diunduh, rantai chunk `_next/static` diikuti tuntas (tiga putaran, 81 chunk); satu chunk memuat keempat nama metode baru (Grid Count, Benchmark Referents, Patokan Benda Sehari-hari, dan Hitung Petak; "Hitung Petak" juga muncul di satu chunk lain sebagai teks lab/game bab ini). Id video lama (K4B4A-V1, K4B4B-V1) dan judul lama "Meja dan Uang Kertas", "Latihan: Luas Susunan", "Siap pakai Nonstandard then Standard", "Botol Sabun A, B, C" tidak ada di chunk mana pun.

## Revisi sesuai pola Kelas 4 Bab 1 sampai 3 (gaya guru, pemadatan, Mind-Map dan Infografis susun tab)
- **Video bergaya guru.** Video yang diputar (materi dan metode luar, A dan B) tidak lagi menyebut buku, halaman, soal nomor, kunci, rubrik, temuan, maupun Panduan Guru (suara, teks gambar, judul adegan, subjudul, label `sumber`). Label `sumber` "Materi: ..." atau "Metode luar: ..." (maks 46 huruf); subjudul "Materi kurikulum" dan "Empat metode luar"; judul video "Pengukuran Luas" dan "Pengukuran Volume". Soal jadi Latihan n, Uji n, Tantangan n; Aktivitas 3 dan 4 di B jadi "Percobaan". "Buku tulis" diganti benda lain (kartu pos, layar HP). Kesalahan atau angka ganjil dari buku disajikan benar tanpa disinggung. Id dan urutan adegan tetap. Tiap `uji-story-k4b4X` memeriksa kata terlarang pada adegan yang diputar. Temuan buku tetap di catatan sesi `temuan-k4b4a.md` dan `temuan-k4b4b.md`.
- **Pemadatan.** Tidak diputar lagi (tetap di berkas materi): A `pembuka-bab`, `peta-konsep`, `panduan-awal`; B `pembuka-b`, `penutup-b`. Uji Kompetensi dan Pengayaan B tetap diputar sebagai latihan guru. Uji memakai `M_VIDEO` dan `M` penuh; ambang total ketukan diturunkan menjadi 70.
- **Ukuran baru yang diputar** (0,5 detik per kata): A materi 12 adegan, 1.226 kata (10,2 menit), luar 801 (6,7); B materi 14 adegan, 1.366 kata (11,4), luar 704 (5,9).
- **Mind-Map susun** (11 simpul): A "Menentukan Luas Daerah" (satuan tidak baku, satuan baku, ubah satuan luas); B "Pengukuran Volume" (satuan tidak baku, satuan baku, kubus satuan). A bebas istilah volume, kubus, liter, dan sejenisnya (dijaga uji-lab-k4b4).
- **Infografis susun:** A "Luas empat bangun berpetak" (4x3: petak tiap baris, luas, keterangan), B "Mengubah mililiter ke liter" (4x4: Dalam ml, Liter, Sisa ml, Ditulis).
- **Uji:** uji-story-k4b4a (6.597) dan b (5.382), uji-statis (57), uji-data (48), uji-lab (496), uji-susun-k4b4 (36), uji-susun-logika (4.621), uji-skenario-umum (8.433), uji-peta-konsep, uji-infografis-ringkas: 0 gagal; `tsc` dan eslint bersih.
- **Audit peramban** (server dev 3100, 405 px, profil uji Kelas 4): peta dan Infografis A dan B diselesaikan lewat skrip; semua tab menempel, tidak ada teks terpotong atau halaman melebar. "23 l 456 ml" di kolom ke-4 B terbungkus dua baris tetapi muat. Server dihentikan, `.next/dev` dihapus, `.claude/launch.json` dipulihkan. Pemutaran visual video belum diperiksa.
- Catatan: ketidakcocokan buku antara meja guru 21 uang kertas dan 12 origami dibiarkan (uji geometri mengunci angka itu); catatan koreksinya tidak lagi diputar.

## Sapaan di awal video dan warna per cabang Mind-Map (berlaku Kelas 4 Bab 1 sampai 4)
- **Sapaan siswa.** Tiap video (materi dan metode luar, 18 sub-bab, 36 video) kini dibuka adegan `sapaan` (berkas bersama `story/sapaan.ts`, dipasang di `k4bXX-video.ts`): guru menyapa ("Halo anak-anak, selamat datang di pelajaran matematika"), menyebut topik hari ini, lalu memberitahu apa yang akan dipelajari (video materi: tiga hal yang sama dengan tiga metode di Mind-Map; video metode luar: beberapa cara lain), dan menutup dengan "Siap? Ayo kita mulai belajar bersama." Tiga ketukan, suara tanpa angka. Adegannya tidak ada di berkas materi, jadi uji-story-k4bXX menghitung satu adegan tambahan (materi dan luar) dan mengizinkan impor `./sapaan`.
- **Warna per cabang di Mind-Map** (`PetaKonsepSusun.tsx`): tiap cabang dari pusat punya satu warna (biru, oranye, ungu, merah muda). Simpul dan tab-nya sewarna, jadi tab di baki langsung menunjukkan cabang tempatnya. Simpul terisi tetap berwarna cabang dengan tanda centang. Berlaku untuk semua bab yang memakai `petaSusun`.
- Diperiksa di peramban (405 px, Bab 2 A): sapaan tampil dengan kartu yang muncul bertahap; warna cabang dan baki tab sewarna. Semua uji story (18), susun (4), statis, data, lab, skenario, peta, infografis lulus; `tsc` dan eslint bersih.
