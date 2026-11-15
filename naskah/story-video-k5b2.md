# Video Story Kelas 5 Bab 2 KPK dan FPB (Sub-Bab A, B, C, D, E): mesin Story baru

Tiap sub-bab memuat **dua video terpisah**: **Video Materi Kurikulum** (isi Buku Siswa, dilengkapi Buku Panduan Guru) dan **Video Metode Luar**. Mesin sama dengan Kelas 5 Bab 3 sampai 9 serta Kelas 6 Bab 1 sampai 4 (`story/logika-story.ts` dan `story/mesin-story.tsx`, lihat `naskah/story-video-k5b5.md`). Gambar dirancang khusus tiap sub-bab: `story/k5b2a-*` sampai `k5b2e-*`. Pembungkus: `video-k5b2a.tsx` sampai `video-k5b2e.tsx` (ekspor `VideoK5B2A/B/C/D/E({ speakGuru })` tidak berubah).

Uji (pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan gambar akhir adegan, batas kanvas, pemisahan materi dan metode luar, kutipan buku terhadap teks PDF, hitungan mandiri dan geometri gambar, emoji paling tinggi Emoji 12, kemurnian berkas):
- `node --no-warnings scripts/uji-story-k5b2a.mjs` (103.666 pemeriksaan, 0 gagal)
- `scripts/uji-story-k5b2b.mjs` (14.422, 0 gagal)
- `scripts/uji-story-k5b2c.mjs` (8.855, 0 gagal)
- `scripts/uji-story-k5b2d.mjs` (15.942, 0 gagal)
- `scripts/uji-story-k5b2e.mjs` (48.222, 0 gagal)
- `uji-statis-k5b2` (81) dan `uji-lab-k5b2` (2.570) disesuaikan dan lulus.

Halaman Buku Siswa = halaman PDF dikurangi 16; Buku Panduan Guru = PDF dikurangi 12. Bab 2 ada di Buku Siswa hlm. 29-62 dan Panduan Guru hlm. 43-96. Pembagian: pembuka bab dan Sub-Bab A (Buku Siswa hlm. 29-37, Panduan Guru hlm. 43-51), B (hlm. 38-42; Panduan Guru hlm. 52-60), C (hlm. 43-46; Panduan Guru hlm. 61-66), D (hlm. 46-53; Panduan Guru hlm. 66-76), E (hlm. 53-62; Panduan Guru hlm. 76-96: Refleksi, Uji Kompetensi, kunci, rubrik, remedial, pengayaan). Butir Refleksi dibagi menurut Panduan Guru (A nomor 1, B nomor 2, 3, 7, C nomor 4, D nomor 5-7, E nomor 8-9).

## Ukuran (perkiraan suara 0,5 detik per kata)
| Video | Adegan | Ketukan | Kata | Durasi |
|---|---|---|---|---|
| A materi | 12 | 59 | 1234 | 10,3 menit |
| A metode luar | 10 | 45 | 885 | 7,4 menit |
| B materi | 11 | 65 | 1530 | 12,8 menit |
| B metode luar | 10 | 41 | 898 | 7,5 menit |
| C materi | 11 | 65 | 1375 | 11,5 menit |
| C metode luar | 10 | 41 | 988 | 8,2 menit |
| D materi | 12 | 60 | 1464 | 12,2 menit |
| D metode luar | 10 | 42 | 1080 | 9,0 menit |
| E materi | 12 | 59 | 1515 | 12,6 menit |
| E metode luar | 10 | 40 | 964 | 8,0 menit |

Total 10 video, 108 adegan, 517 ketukan, 11.933 kata, sekitar 99,4 menit suara. Video materi B, C, D, E di atas target 9-11 menit karena padat: B memuat Eksplorasi 2.2A-B, Ayo Berdiskusi, tiga miskonsepsi, soal tambahan Warung Kelontong; C memuat lima Ayo Berlatih dengan pemeriksaan kunci; D memuat papan congklak, Eksplorasi 2.4A-B, soal tambahan, miskonsepsi, diferensiasi; E adalah penutup bab (bilangan prima, saringan Eratosthenes, pohon faktor, pembagian berulang, Uji Kompetensi, rubrik, remedial, pengayaan).

## Isi
- **A (kelipatan, termasuk pembuka bab):** Materi: pembuka, peta konsep, Latihan Renang, tepuk bilangan kelipatan, tabel 1-50, kelipatan 7 dan 9, panduan guru permainan. Metode luar: Skip Counting, Hundred Chart, Divisibility Check, dan metode baru Last Digit Pattern.
- **B (kelipatan persekutuan dan KPK):** Materi: Eksplorasi 2.2A-B, Ayo Berdiskusi (cara Nisa dan Yohana), Ayo Berlatih, miskonsepsi, soal tambahan. Metode luar: Common Multiples List, LCM Concept, Prime Factor Preview, dan metode baru Meeting Cycle.
- **C (faktor):** Materi: Eksplorasi 2.3A-B (memotong kertas, pasangan faktor), Ayo Berlatih. Metode luar: Factor Pairs, Factor Rainbow, Array Model, dan metode baru Trial Division Ladder.
- **D (faktor persekutuan dan FPB):** Materi: congklak faktor, Eksplorasi 2.4A-B, Ayo Berlatih, soal tambahan, miskonsepsi, diferensiasi, Refleksi 5-7. Metode luar: Common Factors List, GCF Concept, Euclid Preview, dan metode baru Equal Packing.
- **E (KPK dan FPB dengan faktor prima, penutup bab):** Materi: bilangan prima, saringan Eratosthenes, pohon faktor, KPK dan FPB dengan faktor prima dan pembagian berulang, soal tambahan, miskonsepsi, Uji Kompetensi 1-4, rubrik, remedial, pengayaan, Refleksi 8-9. Metode luar: Factor Tree, Prime Exponent Rules, LCM-GCF Bridge, dan metode baru Prime Venn Diagram.

## Catatan temuan buku
Lengkap di catatan sesi `temuan-k5b2a.md` sampai `e.md`. Di semua video, angka kunci disajikan lebih dulu, lalu catatan guru dengan hitungan mandiri.
- **A:** kunci kelipatan 9 (Panduan Guru hlm. 51) hanya mewarnai 9 sampai 81, padahal 90 dan 99 juga kelipatan 9 (seharusnya 11 bilangan). Aturan tepuk berbeda antara langkah 5-6 (sebut bilangan) dan cerita Asep (tepuk dan diam). Typo "kelipatan kelipatan 3", "Erasthotenes", dan Panduan Guru hlm. 44 menulis "kelipatan persekutuan terbesar (KPK)". Mengingat Kembali dan tabel 1-50 tanpa kunci.
- **B:** kunci 1b menulis kelipatan 6 "24, 32, 36" (seharusnya 30; KPK 24 benar); kunci 1c melewatkan 9 pada kelipatan 3 (KPK 60 benar); kalender Asep dan Lukas (Panduan Guru hlm. 57) melewatkan 1 September (jawaban 4 September benar); soal tambahan Warung Kelontong tanpa kunci (hitungan mandiri KPK 3, 5, 7 = 105, jadi 3 Januari 2023).
- **C:** kunci faktor 36 (Panduan Guru hlm. 65) kehilangan angka 6 (sembilan faktor, 6 x 6 = 36); kunci faktor 54 memuat 4 yang bukan faktor dan kehilangan 6 (benar 1, 2, 3, 6, 9, 18, 27, 54). Panduan Guru menyuruh Refleksi 4-7 padahal hanya 4 milik C.
- **D:** faktor 18 tanpa 9 di Buku Siswa hlm. 48 dan Panduan Guru hlm. 69 (FPB 6 tetap benar); faktor persekutuan 24 dan 18 ditulis tanpa 1 (hlm. 52 dan 73); tujuan menulis "faktor persekutuan terkecil" (seharusnya terbesar); kunci Ayo Berlatih 2 memakai satuan "kotak" untuk permen dan biskuit; kunci Eksplorasi 2.4A benar semua.
- **E:** kunci Uji Kompetensi 3 menulis pukul 15.41 (benar 15.36); pohon kunci soal tambahan 260 menulis 130 = 3 x 65 (seharusnya 2 x 65); soal tambahan 24, 30, 54: KPK 1.080 benar tetapi perkalian yang tertulis bernilai 480; miskonsepsi 2: hasil 3.888 benar tetapi perkalian hanya memuat tiga faktor tiga; tabel pembagian berulang di Buku Siswa hlm. 58 melewatkan baris "5 | 1 | 5"; salah ketik "FPB dari 75 dan 150" (maksudnya 72 dan 150).
- Naskah video lama dihapus: `videos` pada `SUB_A52` sampai `SUB_E52` (kini `[]`), `videos` dan `stories` pada `kelas5-bab2.json`, serta cabang `k5b2` dan impor `DeretSvg` yang tak terpakai di `video-visual-k5.tsx` (tidak ada berkas `video-visual-k5b2.tsx`). Bila generator bab dijalankan lagi, isinya akan kembali dan harus dibuang lagi. `uji-statis-k5b2.mjs` disesuaikan; `uji-lab-k5b2.mjs` kehilangan tiga pemeriksaan kalimat naskah video lama (jarak 4, tabel 5, cek 12 dan 3), datanya tetap diperiksa.

## Audit visual
Seluruh 517 ketukan (10 video) dirender lewat rute pratinjau sementara (sudah dihapus; server dev port 3100 mode webpack, sudah dihentikan) dengan `Panggung` pada t=999, kotak batas semua teks yang terlihat diukur terhadap kanvas 300x208 (pembilang dan penyebut bertumpuk diabaikan). Tiga temuan (lima ketukan), semua diperbaiki: emoji tanda tanya menimpa judul "Catatan guru" di A tepuk-lanjut (digeser), emoji bumi menimpa judul di A luar-pembuka (digeser), emoji lampu menimpa rumus pasangan faktor di C pasangan-faktor ketukan 2-4 (dihapus pada ketukan itu). Tidak ada teks keluar kanvas atau bertumpuk setelah perbaikan.

## Verifikasi live
Deploy Vercel (commit 990d239) Ready. HTML `igiligil.xyz/ruang-belajar/mtk-5-bab2` diunduh, rantai chunk `_next/static` diikuti sampai tuntas (tiga putaran, 80 chunk); satu chunk memuat kelima nama metode baru (Last Digit Pattern, Meeting Cycle, Trial Division Ladder, Equal Packing, Prime Venn Diagram), dan tidak satu pun dari 15 judul video lama maupun id video lama (K5B2A-V1) ada di chunk mana pun. Nama metode lama (misalnya Skip Counting) tetap ada karena dipakai bagian lain bab (metodeLuar, lab), bukan video.

## Revisi sesuai pola Kelas 4 Bab 1 sampai 6 dan Kelas 5 Bab 1 (gaya guru, pemadatan, sapaan, Mind-Map dan Infografis susun tab)
- **Video bergaya guru.** Video yang diputar (materi dan metode luar, A sampai E) tidak lagi menyebut buku, halaman, soal nomor, kunci, rubrik, temuan, maupun Panduan Guru (suara, teks gambar, judul adegan, sumber, subjudul). Judul tanpa "menurut Buku"; subjudul tepat "Materi kurikulum" dan "Empat metode luar"; sumber "Materi: ..." dan "Metode luar: ..." paling panjang 46 huruf. Ayo Berlatih, Uji Kompetensi, dan Pengayaan disajikan sebagai Latihan, Uji, dan Tantangan; miskonsepsi, diferensiasi, dan refleksi menjadi Hati-hati, Tantangan, dan Renungan. Field `kutipan` dan komentar kode tidak diubah.
- **Pemadatan.** Tidak diputar lagi (tetap di berkas materi): A `pembuka-bab`, `peta-konsep`, `mengingat-kembali`, `panduan-permainan`; B `pembuka-b`, `persiapan-b`; C `pembuka-c`, `sarana-apersepsi`, `pemanasan-permen`, `persiapan-guru`; D `pembuka-d`, `persiapan-d`; E `pembuka-e`, `penutup-e`.
- **Sapaan.** Tiap video dibuka adegan `sapaan` (luar-pembuka menjadi adegan kedua video luar). Daftar hal yang dipelajari sama persis dengan tiga anak cabang pertama Mind-Map.
- **Ukuran yang diputar** (0,5 detik per kata): A materi 851 kata (7,1 menit), luar 920 (7,7); B materi 1.332 (11,1), luar 929 (7,7); C materi 1.036 (8,6), luar 1.027 (8,6); D materi 1.292 (10,8), luar 1.103 (9,2); E materi 1.267 (10,6), luar 1.000 (8,3).
- **Mind-Map susun** (11 simpul, tiga cabang): A "Kelipatan", B "Jadwal Latihan Renang", C "Mencari Faktor", D "Membagi Mawar ke Vas", E "Faktor Prima". **Infografis susun:** A "Kelipatan tiga bilangan" (4x3), B "Jadwal latihan renang" (3x4), C "Faktor dan pasangannya" (4x3), D "FPB dan hasil baginya" (4x3), E "KPK dan FPB dari faktor prima" (4x3).
- **Uji:** uji-story-k5b2a (102.321), b (14.261), c (9.132), d (15.721), e (47.691), uji-statis (81), uji-lab (2.570), uji-susun-k5b2 (90), uji-susun-logika (4.621), uji-skenario-umum (8.433), uji-peta-konsep, uji-infografis-ringkas: 0 gagal; `tsc` bersih. Tidak ada `uji-data-k5b2.mjs`.
- **Audit peramban** (server dev 3100, 405 px, profil uji Kelas 5): Mind-Map A sampai E diselesaikan lewat skrip, warna cabang biru, oranye, ungu, tanpa label terpotong; Infografis A sampai E terisi penuh, tanpa halaman melebar. Satu perbaikan: sel "4 September" di tabel B menyentuh tepi kolom, diganti tanggal Mulai 1 Agustus dan Bertemu 16 Agustus (selang 15 hari, tetap benar).
- **Temuan buku yang disajikan benar tanpa menyinggung buku** (lengkap di catatan sesi `temuan-k5b2A.md` sampai `E.md`): A kunci kelipatan 9 dan kunci 6 dan 8; B kelipatan 6 tertulis 32 (seharusnya 30), kelipatan 3 melewatkan 9, jadwal Asep melewatkan 1 September, soal Warung tanpa kunci; C kunci 36 tanpa faktor 6 dan kunci 54 memuat 4 tanpa 6; D faktor 18 di kunci tidak lengkap (tanpa 9), faktor persekutuan 24 dan 18 harus 1, 2, 3, 6, diferensiasi "23 dan 27 tidak mempunyai FPB" salah (FPB-nya 1), salah ketik "faktor persekutuan terkecil" di pembuka-d; E pohon faktor 260 di kunci, baris 5 | 1 | 5 pembagian berulang, Tantangan 3, jam Uji 3, dan miskonsepsi 2.
