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
