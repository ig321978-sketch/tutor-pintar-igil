# Video Story Kelas 4 Bab 1 Bilangan Cacah sampai 10.000 (Sub-Bab A sampai I): mesin Story baru

Tiap sub-bab memuat **dua video terpisah**: **Video Materi Kurikulum** (Buku Siswa dilengkapi Buku Panduan Guru) dan **Video Metode Luar**. Mesin sama dengan Kelas 4 Bab 2 sampai 6, Kelas 5 dan Kelas 6 (`story/logika-story.ts`, `story/mesin-story.tsx`; lihat `naskah/story-video-k4b2.md`). Gambar dirancang khusus tiap sub-bab: `story/k4b1a-*` sampai `story/k4b1i-*`. Pembungkus: `video-k4b1a.tsx` sampai `video-k4b1i.tsx` (ekspor `VideoK4B1A..I({ speakGuru })` tidak berubah; tidak lagi memakai `video-k4b1-umum.tsx` maupun `video-k4b2-umum.tsx`, yang dibiarkan di tempatnya).

Offset halaman kelas IV: Buku Siswa = PDF dikurangi 12, Panduan Guru = PDF dikurangi 12. Pembagian (PDF): pembuka bab, Tujuan Pembelajaran, Peta Konsep ikut A. Buku Siswa: A 16-23, B 24-27, C 28-35, D 36-39, E 40-45, F 46-50, G 51-55, H 56-59, I 60-63 ditambah Uji Kompetensi 64-65 dan Refleksi 66. Panduan Guru: A 43-46, B 47-51, C 52-56, D 57-60, E 61-65, F 66-71, G 72-76, H 77-81, I 82-86 ditambah kunci 87-89, rubrik 90-94, remedial, pengayaan 95-99, interaksi orang tua 100. Batas sub-bab sering di tengah halaman, sehingga jatah tiap agen sedikit melebar (Ayo Berlatih/diferensiasi di awal halaman berikutnya ikut sub-bab pemiliknya).

## Ukuran (perkiraan suara 0,5 detik per kata)
| Video | Adegan | Ketukan | Kata | Durasi |
|---|---|---|---|---|
| A materi | 12 | 68 | 1566 | 13,1 menit |
| A metode luar | 10 | 40 | 800 | 6,7 menit |
| B materi | 12 | 50 | 1250 | 10,4 menit |
| B metode luar | 10 | 41 | 943 | 7,9 menit |
| C materi | 13 | 61 | 1604 | 13,4 menit |
| C metode luar | 10 | 39 | 882 | 7,3 menit |
| D materi | 10 | 52 | 1093 | 9,1 menit |
| D metode luar | 10 | 42 | 852 | 7,1 menit |
| E materi | 13 | 61 | 1639 | 13,7 menit |
| E metode luar | 10 | 34 | 852 | 7,1 menit |
| F materi | 11 | 54 | 1472 | 12,3 menit |
| F metode luar | 10 | 39 | 1168 | 9,7 menit |
| G materi | 12 | 51 | 1132 | 9,4 menit |
| G metode luar | 10 | 35 | 745 | 6,2 menit |
| H materi | 10 | 47 | 1138 | 9,5 menit |
| H metode luar | 10 | 39 | 827 | 6,9 menit |
| I materi | 19 | 74 | 1749 | 14,6 menit |
| I metode luar | 10 | 35 | 834 | 7,0 menit |

Total 18 video, 202 adegan, 862 ketukan, 20.546 kata, sekitar 171 menit suara. Materi di atas 13 menit (A, C, E, I) padat: A memuat pembuka bab, peta konsep, dan panduan awal; C 11 langkah Aktivitas 3 dan enam soal Ayo Berpikir; E 23 soal dengan kunci; I penutup bab (dua topik penuh, Uji Kompetensi 15 soal, rubrik 15 butir, Refleksi dibagi enam butir, remedial, lima soal pengayaan, interaksi orang tua). Bila perlu dipangkas, kandidat pertama ialah ketukan Uji Kompetensi 3-6 atau Pengayaan di I.

## Isi
Metode luar tiap sub-bab: tiga metode lama (nama lama) ditambah satu metode baru.
- **A (Membaca dan Menulis):** Dienes Blocks, Place-Value Chart, Zero as Placeholder, baru **Say-Write-Show (Ucap, Tulis, Tunjuk)**.
- **B (Nilai Tempat):** Place Value, Dienes Trade, Expanded Form, baru **Place Value Disks (Cakram Nilai Tempat)**.
- **C (Membandingkan dan Mengurutkan):** Compare Leftmost, Number Line Order, Ordering Sets, baru **Bar Model Compare (Banding Batang)**.
- **D (Komposisi dan Dekomposisi):** Composition, Decomposition, Flexible Grouping, baru **Number Bonds (Ikatan Bilangan)**.
- **E (Penjumlahan):** Standard Addition, Regrouping, Counting On, baru **Partial Sums (Jumlah Sebagian)**.
- **F (Pengurangan):** Standard Subtraction, Borrowing, Counting Up, baru **Compensation (Kompensasi)**.
- **G (Perkalian):** Equal Groups, Array Model, Times Table Fluency, baru **Doubling (Penggandaan)**.
- **H (Pembagian):** Fair Share, Measurement Division, Inverse of Multiply, baru **Repeated Subtraction (Pengurangan Berulang)**; kalimat apersepsi buku "pengurangan berulang" dikutip di video materi tanpa nama metode.
- **I (Faktor dan Kelipatan, penutup bab):** Factor Pairs, Skip Counting Multiples, Divisibility, baru **Sieve of Eratosthenes (Saringan Eratosthenes)**.

## Catatan temuan buku
Lengkap di catatan sesi `temuan-k4b1a.md` sampai `temuan-k4b1i.md`. Angka kunci disajikan lebih dulu, lalu catatan guru dengan hitungan mandiri.
- **A:** gambar jarak hlm. 5 bertuliskan 3.268 pada panah tetapi kotak hasil dan kalimat 3.286 (video memakai 3.286); tabel huruf A-D terbalik terhadap aturannya; kalimat Semeru berakhir "rupiah" padahal meter; "yaitu , ditulis" (angka hilang); soal 4 hlm. 34 contoh jawaban 8.888, 7.030, 0036 mengulang angka padahal diminta berbeda. Kunci 1-3 cocok.
- **B:** Panduan Guru hlm. 35 menyebut "membandingkan dan mengurut" (milik C); kunci nomor 4 (6.192, 2.910, 4.128, 9.217) tanpa soal di Buku Siswa; seluruh kunci benar.
- **C:** Ayo Berpikir kunci b (9.215 dan 1.592) hanya benar untuk contoh a; terbesar sebenarnya 9.521 dan terkecil 1.259 (24 susunan). Kunci e (9.925 dan 1.155) hanya contoh d; bila angka boleh berulang 9.999 dan 1.111. Aktivitas 3: buku 10 kartu "2 paket" padahal 20. Tinggi gunung ada di gambar peta, bukan teks.
- **D:** Panduan Guru hlm. 48 menulis 10.000 sebagai "1.0000"; 6.035 = 6.000 + 000 + 30 + 5 (nol ditulis berbilang); papan ketiga komposisi dikosongkan. Semua kunci cocok.
- **E:** kunci 1b Panduan Guru hlm. 50: 812 + 116 tertulis 922, seharusnya 928; keranjang memikul tetapi jawaban "buah yang dijual"; langkah susun ditulis dari ratusan padahal pengerjaan dari satuan. Kunci lain cocok.
- **F:** kunci 2b menulis pengurang 145 padahal soal 422 − 146 (276 benar untuk 146); petunjuk nomor 2 berbunyi "untuk penjumlahan"; dua "miskonsepsi" di Panduan Guru hlm. 59 sebenarnya prosedur benar; apersepsi 27 − 19 = 12 keliru (yang benar 8).
- **G:** soal 2e tanpa banyak kelas (kunci 78 hanya benar untuk 6 kelas); "sampai 100" tetapi hasil 260 dan 336; stimulus telur 12 x 10 tanpa jawaban; urutan faktor di buku tidak sejalan dengan miskonsepsi Panduan Guru. Semua kunci cocok.
- **H:** Aktivitas 5 tabel kosong tanpa kunci; Panduan Guru menyebut 48 habis dibagi 2, 3, 4, 6, 8 (hanya lima dari sepuluh pembagi); semua soal habis dibagi (tidak ada sisa); soal cerita b pembaginya 4 bukan 3; tidak ada soal bernol padahal miskonsepsi 2 membahasnya.
- **I:** Uji Kompetensi 1: tabel 8, 0, 3, 2 (8.032) tetapi kunci dan rubrik 8.002; bobot rubrik berjumlah 104, bukan 100; Pengayaan 5a soal 8 siswa per kelompok, kunci 4 siswa; Uji Kompetensi 15 tanpa satu jawaban (hitungan mandiri 18.12); hanya 4 dari 15 soal Uji Kompetensi tentang faktor dan kelipatan; interaksi orang tua membahas bilangan empat angka.
- Naskah video lama dihapus: `videos` pada `SUB_A41` sampai `SUB_I41` (kini `[]`), `videos` dan `stories` pada `kelas4-bab1.json`, cabang `k4b1` dan impor tak terpakai di `video-visual-k4.tsx` (kini hanya cadangan bertuliskan kode). Bila generator bab dijalankan lagi, isinya kembali dan harus dibuang lagi. `uji-statis-k4b1` dan `uji-data-k4b1` disesuaikan.

## Uji
`uji-story-k4b1a` (7.616), `b` (10.414), `c` (16.175), `d` (9.155), `e` (11.201), `f` (7.607), `g` (7.223), `h` (9.459), `i` (25.790) lulus, 0 gagal; `uji-statis-k4b1` (129), `uji-data-k4b1` (260), `uji-lab-k4b1` (6.431), `uji-skenario-umum` (8.433) lulus; `tsc --noEmit` bersih; eslint pada berkas video tanpa galat (lima peringatan variabel tak terpakai di skrip uji a, b, c, i).

## Audit visual
Seluruh 862 ketukan (18 video) dirender lewat rute pratinjau sementara (sudah dihapus; server dev port 3100 mode webpack, sudah dihentikan) dengan `Panggung` pada t=999; teks yang terlihat diukur terhadap kanvas 300x208 dan tumpang tindih lebih dari 3 piksel. Dua temuan diperbaiki: label "mdpl" menimpa emoji gunung di A materi adegan 10, dan persamaan 2.150 menimpa label sumber di B metode luar adegan 9. Setelah perbaikan hasil kosong (tanpa teks keluar kanvas atau bertumpuk). Subagen juga memperbaiki beberapa tumpang tindih lewat render SVG sendiri.

## Verifikasi live
Deploy Vercel (commit 512ce5b) Ready. HTML `igiligil.xyz/ruang-belajar/mtk-4-bab1` diunduh, rantai chunk `_next/static` diikuti tuntas (tiga putaran, 80 chunk); chunk yang sama memuat kesembilan metode baru beserta nama Indonesianya (Say-Write-Show, Place Value Disks, Bar Model Compare, Number Bonds, Partial Sums, Compensation, Doubling, Repeated Subtraction, Sieve of Eratosthenes). Dari 27 id video lama (K4B1A-V1 sampai K4B1I-V3) tidak satu pun ada. Dari 27 judul video lama, sebagian masih muncul tetapi bukan sebagai video Kelas 4 Bab 1: "Helen di Minimarket", "Harga di Pasar", "Jeruk Pak Toni", "Permen Pak Wicak" sebagai nama skenario Mesin Baca/Banding/Jumlah/Bagi; "Donat 12 × 4" dan "Faktor 12" sebagai judul panel info; "Buku Dipinjam" sebagai judul permainan atau bagan; "Siap pakai Expanded Form" dan "Siap pakai Counting On" hanya milik video Kelas 3 Bab 1 (id K3B1B-V3 dan K3B1D-V3).

## Pemadatan video materi (setelah rilis awal)
Atas masukan pemilik, bagian yang bukan inti materi dibuang dari video materi karena sudah ada di Silabus, Mind-Map, dan Infografis: pembuka bab, Tujuan Pembelajaran, Peta Konsep dan Kata Kunci (A: `pembuka-bab`, `peta-konsep`, `panduan-awal`), pengalaman belajar/sarana/apersepsi (B `panduan-awal`, C `pembuka`, D `pembuka-d`, E `panduan-awal`, G `panduan-awal`), serta rubrik, Refleksi, dan interaksi orang tua (I). Adegan tetap ada di berkas `k4b1X-materi-N.ts` agar bahan Mind-Map dan Infografis tidak hilang, tetapi tidak lagi masuk daftar `VIDEO_MATERI_K4B1X`. F dan H tidak diubah (pembuka H bercampur dengan cerita permen; pembuka I bercampur dengan istilah faktor dan kelipatan). Uji `uji-story-k4b1a/b/c/d/e/g/i` memeriksa isi terhadap daftar penuh, dan jumlah serta urutan adegan terhadap video yang diputar.

## Mind-Map dan Infografis susun tab (percobaan di Kelas 4 Bab 1)
Atas permintaan pemilik, Mind-Map (tahap 2) dan Infografis (tahap 3) Kelas 4 Bab 1 diganti permainan susun tab dengan isi lebih luas, disaring dari materi kurikulum yang sama (termasuk bagian yang dibuang dari video):
- **Mind-Map** (`PetaKonsepSusun.tsx`): struktur peta konsep bersimpul putih bernomor (11-13 simpul, 3-4 cabang, kedalaman paling banyak tiga). Tab jawaban acak di baki; siswa menyeret atau mengetuk tab lalu menaruhnya di nomor yang cocok. Tab yang belum cocok kembali ke baki dengan petunjuk pendek (tanpa skor); tab yang cocok menempel dan bisa dikembalikan dengan mengetuknya.
- **Infografis** (`InfografisTabelSusun.tsx`): tabel 3-4 kolom x 4-6 baris dengan sel kosong; tab isi sel acak ditaruh di baris dan kolom yang benar. Tab berteks sama setara.
- Logika murni `susun-logika.ts` (pengacakan tetap tanpa titik tetap, aksi letak/kembali, pemeriksaan data). Data di `src/data/kelas4-bab1-ringkas.json` (`petaSusun` dan `tabelSusun` per sub-bab A-I); bila ada, pemutar memakainya menggantikan `peta` dan `infografis` lama (yang tetap disimpan sebagai cadangan). Tipe `RingkasSub` di `registri-simulasi.ts` diperluas; pemasangan di `IgilModulePlayer.tsx`.
- Ukuran: A 12 simpul dan tabel 4x3, B 13 dan 4x3, C 12 dan 6x3, D 11 dan 4x3, E 11 dan 4x3, F 12 dan 4x3, G 12 dan 5x3, H 12 dan 5x4, I 12 dan 5x3.
- Uji: `uji-susun-logika` (4.621), `uji-susun-k4b1` (162) lulus 0 gagal; `uji-peta-konsep` dan `uji-infografis-ringkas` lama tetap lulus; `tsc` bersih. Dicoba langsung di peramban (server dev port 3100, sudah dihentikan): tab dipegang dengan ketukan, tab salah kembali ke baki dengan petunjuk, semua tab menempel dan tombol lanjut membuka Infografis; tabel A (4x3) dan H (5x4) tampil rapi di layar sempit.
