# Video Story Kelas 4 Bab 6 Piktogram dan Diagram Batang (Sub-Bab A, B): mesin Story baru

Tiap sub-bab memuat **dua video terpisah**: **Video Materi Kurikulum** (Buku Siswa dilengkapi Buku Panduan Guru) dan **Video Metode Luar**. Mesin sama dengan Kelas 5 Bab 1 sampai 9 dan Kelas 6 Bab 1 sampai 4 (`story/logika-story.ts` dan `story/mesin-story.tsx`, lihat `naskah/story-video-k5b1.md`). Gambar dirancang khusus tiap sub-bab: `story/k4b6a-*` dan `story/k4b6b-*`. Pembungkus: `video-k4b6a.tsx` dan `video-k4b6b.tsx` (ekspor `VideoK4B6A/B({ speakGuru })` tidak berubah). Ini Kelas 4 pertama yang memakai mesin Story baru.

Uji (pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan gambar akhir adegan, batas kanvas, pemisahan materi dan metode luar, kutipan buku terhadap teks PDF, hitungan mandiri dan geometri gambar, emoji paling tinggi Emoji 12, kemurnian berkas LF):
- `node --no-warnings scripts/uji-story-k4b6a.mjs` (8.091 pemeriksaan, 0 gagal)
- `scripts/uji-story-k4b6b.mjs` (19.896, 0 gagal)
- `uji-statis-k4b6` (57), `uji-data-k4b6` (20), `uji-lab-k4b6` (1.386) disesuaikan dan lulus; `uji-skenario-umum` (8.433) tetap lulus. `tsc --noEmit` dan eslint bersih.

Offset halaman kelas IV: Buku Siswa = PDF dikurangi 12, Buku Panduan Guru = PDF dikurangi 12 (berbeda dari kelas V). Bab 6 ada di Buku Siswa hlm. 177-194 (PDF 189-206) dan Panduan Guru hlm. 215-238 (PDF 227-250). Pembagian: A (pembuka bab dan Piktogram): Buku Siswa hlm. 177-186, Panduan Guru hlm. 215-223. B (Diagram Batang, penutup bab): Buku Siswa hlm. 187-194, Panduan Guru hlm. 223-238 (Aktivitas 3-4, Uji Kompetensi, kunci, rubrik, Refleksi, remedial, pengayaan, interaksi orang tua).

## Ukuran (perkiraan suara 0,5 detik per kata)
| Video | Adegan | Ketukan | Kata | Durasi |
|---|---|---|---|---|
| A materi | 12 | 57 | 1427 | 11,9 menit |
| A metode luar | 10 | 41 | 798 | 6,7 menit |
| B materi | 13 | 56 | 1548 | 12,9 menit |
| B metode luar | 10 | 39 | 836 | 7,0 menit |

Total 4 video, 45 adegan, 193 ketukan, 4.609 kata, sekitar 38,5 menit suara. A materi di atas target 11 menit karena padat (pembuka bab, peta konsep dan skema, pemanasan, Aktivitas 1-2, enam contoh bertabel, tiga latihan, penutup). B materi di batas 13 menit karena memuat penutup bab (Uji Kompetensi, rubrik, lima soal pengayaan beserta kunci). Metode luar lebih pendek dari K5 karena angka piktogram dan batang di buku sederhana.

## Isi
- **A (Piktogram, termasuk pembuka bab):** Materi: pembuka, peta konsep, pemanasan, Aktivitas 1, benda kelas, mainan Karel, Aktivitas 2, warna bunga, Ayo Berlatih 1-2, Ayo Berpikir, penutup. Metode luar: Pictograph Key, Categorical Tally, Read then Compare, dan metode baru Scale Multiply (Kali Skala).
- **B (Diagram Batang, penutup bab):** Materi: Aktivitas 3-4 (batang tegak dan mendatar), Ayo Berlatih 1-2, Uji Kompetensi, rubrik, pengayaan, Refleksi, remedial, interaksi orang tua. Metode luar: Bar Scale, Axis Labels, Compare Bars, dan metode baru Table to Bar (Tabel ke Batang).

## Catatan temuan buku
Lengkap di catatan sesi `temuan-k4b6a.md` dan `temuan-k4b6b.md`. Angka kunci disajikan lebih dulu, lalu catatan guru dengan hitungan mandiri.
- **A:** kunci Ayo Berlatih 1-2 dan Ayo Berpikir benar semua (56 buku, 156 siswa, kelas IV 32, dihitung ulang dari gambar). Panduan Guru menyebut capaian kelas IV hanya skala satu satuan, padahal Ayo Berpikir memakai 1 gambar = 4 siswa dan Aktivitas 2 berjudul "dengan skala" tetapi skalanya 1. Di benda kelas, jam dinding dan lemari sama-sama paling sedikit (1), jadi jawabannya dua benda. Miskonsepsi Panduan Guru ("piktogram bukan diagram gambar") rancu; pertanyaan hlm. 181 dan 184 tanpa kunci karena bergantung data siswa.
- **B:** kunci pengayaan 1a menulis 365 - (57 + 58 + 56 + 62 + 59), padahal total soal 346; hitungan benar 346 - 292 = 54 (jawaban akhir 54 benar). Rubrik Tabel 6.2 nomor 1 tidak punya baris skor untuk 1b (diagram batang mendatar). Kunci Uji Kompetensi 1c memakai skala 0,5 untuk data bulat (video memakai skala 1). Salah ketik: "furnitune", "Pengetahun", penunjukan "langkah 4 aktivitas 3 ... mendatar" yang seharusnya Aktivitas 4, kata hilang di Refleksi. Kunci lain benar (Ayo Berlatih 1-2, Uji Kompetensi 2-3, pengayaan 2-5, termasuk 870 kg panen apel dan 24 siswa).
- Naskah video lama dihapus: `videos` pada `SUB_A46` dan `SUB_B46` (kini `[]`), `videos` dan `stories` pada `kelas4-bab6.json`, serta seluruh cabang `k4b6` dan impor tak terpakai (`PiktogramSvg`, `BatangDataSvg`) di `video-visual-k4.tsx` (tidak ada berkas `video-visual-k4b6.tsx`; `video-visual-adegan.tsx` tidak memuat cabang K4B6). Bila generator bab (`content-master/buat-k4-bab6.mjs`) dijalankan lagi, isinya akan kembali dan harus dibuang lagi. `uji-statis-k4b6.mjs` dan `uji-data-k4b6.mjs` disesuaikan (pemeriksaan "3 video x 3 adegan" dan jumlah stories diganti); `uji-lab-k4b6.mjs` tidak perlu diubah.

## Audit visual
Seluruh 193 ketukan (4 video) dirender lewat rute pratinjau sementara (sudah dihapus; server dev port 3100 mode webpack, sudah dihentikan) dengan `Panggung` pada t=999, kotak batas semua teks yang terlihat diukur terhadap kanvas 300x208. Tiga temuan diperbaiki: kartu catatan di B pengayaan 1 menimpa label sumber (kartu digeser naik dan catatan merah dipindah), baris hitungan Kunci piktogram kelereng di A menyentuh label sumber (digeser naik 3), dan tiga lingkaran biru di pembuka metode luar A saling menempel (jarak dilebarkan). Tumpang tindih 3 piksel antar emoji bersebelahan (kotak glyph, bukan gambar) diabaikan. Tidak ada teks keluar kanvas setelah perbaikan.

## Verifikasi live
Deploy Vercel (commit 291fc17) Ready. HTML `igiligil.xyz/ruang-belajar/mtk-4-bab6` diunduh, rantai chunk `_next/static` diikuti tuntas (tiga putaran, 81 chunk); satu chunk memuat keempat nama metode baru (Scale Multiply, Kali Skala, Table to Bar, Tabel ke Batang), dan keenam judul video lama (Apa itu Piktogram?, Latihan: Turus Kategori, Siap pakai Read then Compare, Apa itu Diagram Batang?, Latihan: Label Sumbu, Siap pakai Compare Bars) serta id video lama (K4B6A-V1, K4B6B-V1) tidak ada di chunk mana pun.

## Revisi sesuai pola Kelas 4 Bab 1 sampai 5 (gaya guru, pemadatan, sapaan, Mind-Map dan Infografis susun tab)
- **Video bergaya guru.** Video yang diputar (materi dan metode luar, A dan B) tidak lagi menyebut buku, halaman, soal nomor, kunci, rubrik, temuan, maupun Panduan Guru (suara, teks gambar, judul adegan, subjudul, label `sumber`). Sumber "Materi: ..." dan "Metode luar: ..." paling panjang 46 huruf; subjudul "Materi kurikulum" dan "Empat metode luar". Latihan disajikan sebagai Latihan, Uji, Tantangan; Aktivitas jadi kegiatan tanpa nomor; Ayo Berpikir jadi Berpikir. Kata "buku" sebagai benda diganti (A: bacaan, pensil dan penghapus; B: komik, pensil, kebun sekolah, kata penting). Nama metode luar "Kunci Piktogram" menjadi "Keterangan Piktogram" karena kata "kunci" terlarang (uji disesuaikan).
- **Pemadatan.** Tidak diputar lagi (tetap di berkas materi): A `pembuka-bab`, `peta-konsep`, `pemanasan`; B `pembuka-b`, `panduan-guru-b`, `penutup-b`. A `penutup-subbab` tetap diputar (miskonsepsi, tantangan, renungan, tanpa catatan buku). Uji Kompetensi dan Pengayaan B tetap diputar sebagai Uji dan Tantangan. Uji memakai `M_VIDEO` dan `M` penuh; ambang total ketukan 70; pemeriksaan "tanpa adegan administratif" di A kini terhadap video yang diputar.
- **Sapaan.** Tiap video dibuka adegan `sapaan`. Materi A: "piktogram" (Menyajikan data jadi gambar, Piktogram dengan skala, Membandingkan data); B: "diagram batang" (Batang tegak, Batang mendatar, Membaca diagram). Daftar sama dengan anak cabang pertama Mind-Map.
- **Ukuran yang diputar** (0,5 detik per kata): A materi 10 adegan, 1.114 kata (9,3 menit), luar 11 adegan, 829 (6,9); B materi 11 adegan, 1.209 (10,1), luar 11 adegan, 866 (7,2).
- **Mind-Map susun** (11 simpul, tiga cabang): A pusat "Data Jadi Gambar"; B pusat "Diagram Batang". A bebas istilah batang, sumbu, tegak, mendatar, tinggi (dijaga uji-lab).
- **Infografis susun:** A "Gambar dikali skala" (4x3: gambar, skala, jumlah), B "Banding dengan sepak bola" (5x3: banyak, urutan, selisih). Angka berulang antarkolom di B lolos uji tetapi bisa membingungkan murid.
- **Uji:** uji-story-k4b6a (7.787) dan b (19.449), uji-statis (57), uji-data (20), uji-lab (1.386), uji-susun-k4b6 (36), uji-susun-logika (4.621), uji-skenario-umum (8.433), uji-peta-konsep, uji-infografis-ringkas: 0 gagal; `tsc` dan eslint bersih (8 peringatan lama `no-unused-expressions` di uji-story-k4b6b).
- **Audit peramban** (server dev 3100, 405 px, profil uji Kelas 4): sapaan tampil; peta A dan B diselesaikan lewat skrip, warna cabang biru, oranye, ungu; Infografis A dan B terisi penuh, label tidak terpotong, tanpa halaman melebar.
- **Temuan buku yang disajikan benar tanpa menyinggung buku** (lengkap di `temuan-k4b6a.md` dan `temuan-k4b6b.md` di catatan sesi): skala tidak selalu satu gambar satu benda (kunci Panduan Guru menyebut satu satuan saja); jumlah siswa 346 (kunci menulis 365); Uji 1c berskala satu-satu (kunci memakai skala 0,5).
