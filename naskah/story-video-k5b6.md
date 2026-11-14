# Video Story Kelas 5 Bab 6 Sudut (Sub-Bab A, B, C, D): mesin Story baru

Tiap sub-bab memuat **dua video terpisah**: **Video Materi Kurikulum** (isi Buku Siswa, dilengkapi Buku Panduan Guru) dan **Video Metode Luar**. Mesin sama dengan Kelas 5 Bab 7 sampai 9 serta Kelas 6 Bab 1 sampai 4 (`story/logika-story.ts` dan `story/mesin-story.tsx`, lihat `naskah/story-video-k5b7.md`). Gambar dirancang khusus tiap sub-bab: `story/k5b6a-*` sampai `k5b6d-*`. Pembungkus: `video-k5b6a.tsx` sampai `video-k5b6d.tsx` (ekspor `VideoK5B6A/B/C/D({ speakGuru })` tidak berubah).

Uji (pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan gambar akhir adegan, batas kanvas, pemisahan materi dan metode luar, kutipan buku terhadap teks PDF, hitungan mandiri dan geometri gambar, emoji paling tinggi Emoji 12, kemurnian berkas):
- `node --no-warnings scripts/uji-story-k5b6a.mjs` (6.998 pemeriksaan, 0 gagal)
- `scripts/uji-story-k5b6b.mjs` (3.338, 0 gagal)
- `scripts/uji-story-k5b6c.mjs` (26.997, 0 gagal)
- `scripts/uji-story-k5b6d.mjs` (4.052, 0 gagal)

Halaman Buku Siswa = halaman PDF dikurangi 16; Buku Panduan Guru = PDF dikurangi 12. Bab 6 ada di Buku Siswa hlm. 163-190 dan Panduan Guru hlm. 250-285. Pembagian: pembuka bab (hlm. 163-165) dan Sub-Bab A hlm. 166-169, B hlm. 170-174, C hlm. 175-182, D hlm. 183-187 dengan proyek tata kota, Uji Kompetensi hlm. 188-190 ikut D. Refleksi dibagi menurut butir: 1 di A, 2-3 di B, 4-5 di C, 6 di D. Pengayaan rasi bintang, penilaian, rubrik, dan remedial (Panduan Guru hlm. 276-283) ikut D.

## Ukuran (perkiraan suara 0,5 detik per kata)
| Video | Adegan | Ketukan | Kata | Durasi |
|---|---|---|---|---|
| A materi | 11 | 59 | 1160 | 9,7 menit |
| A metode luar | 10 | 40 | 851 | 7,1 menit |
| B materi | 11 | 55 | 1099 | 9,2 menit |
| B metode luar | 10 | 41 | 778 | 6,5 menit |
| C materi | 13 | 60 | 1325 | 11,0 menit |
| C metode luar | 10 | 43 | 1004 | 8,4 menit |
| D materi | 15 | 81 | 1662 | 13,8 menit |
| D metode luar | 10 | 39 | 829 | 6,9 menit |

Total 8 video, 90 adegan, 418 ketukan, 8708 kata, sekitar 72,6 menit suara. Video D materi di atas target 9-11 menit karena isinya padat (Proyek Tata Kota, Refleksi 6, Uji Kompetensi 1-3, rubrik, remedial, pengayaan rasi bintang).

## Isi
- **A (sudut siku-siku, termasuk pembuka bab):** Materi: tujuan, peta konsep, kata kunci, sudut di sekitar kita, Tabel 6.1, bingkai foto dan penggaris siku, Eksplorasi 6.1 (lipat kertas), Ayo Berlatih 1-6, miskonsepsi, Refleksi 1. Metode luar: Right Angle Benchmark, Paper Fold Benchmark, Angle Detective, dan metode baru Quarter-Turn Test.
- **B (pengertian sudut):** Materi: definisi, titik sudut dan kaki sudut, kotak pensil, Eksplorasi 6.2, lancip, siku-siku, tumpul, jam analog, Refleksi 2-3. Metode luar: Vertex-Ray Model, Acute-Right-Obtuse Classification, dan metode baru Angle as Rotation serta Orientation Invariance Test.
- **C (mengukur dan membandingkan):** Materi: busur derajat, Eksplorasi 6.3, membandingkan besar sudut, jam, kipas, Refleksi 4-5. Metode luar: Protractor Reading Protocol, Benchmark Angles, Degree Measure, dan metode baru Clock Face Division.
- **D (melukis sudut, penutup bab):** Materi: kipas 150 derajat langkah demi langkah, Ayo Berlatih 1-2, kesalahan umum membaca skala, Proyek Tata Kota, Refleksi 6, Uji Kompetensi 1-3 (jam, persimpangan, keramik), rubrik, remedial, pengayaan rasi bintang. Metode luar: Constructing Angles Protocol, Protractor Construction, dan metode baru Angle Addition Construction serta Estimate-Then-Verify.

## Catatan temuan buku
Lengkap di catatan sesi `temuan-k5b6a.md` sampai `d.md`.
- **A:** penomoran gambar di Panduan Guru berbeda dari Buku Siswa; Panduan Guru memuat sisa bab lain ("pengumpulan data", "Tabel Frekuensi"); typo "perserta didik", "susut nol", "menemu kan"; Panduan Guru memakai "kaki sudut" di A padahal baru diajarkan di B; Tabel 6.1 tanpa kunci.
- **B:** Buku Siswa menyebut "Aktivitas 1" padahal kegiatan sebelumnya berjudul Eksplorasi 6.1; jawaban pertanyaan "setuju dengan Yohana?" tidak dicetak (video menyimpulkan setuju dari Panduan Guru hlm. 258 dan 260); Panduan Guru hlm. 262 menulis "piktogram" (salinan bab lain); kunci Soal 1 dibaca dari gambar halaman; besar sudut gambar dibuat sendiri dan dihitung ulang di uji.
- **C:** C berakhir hlm. 182, hlm. 183 sudah D; typo "tradisonal", "Mengidentiikasi", "dua acara"; Panduan Guru hlm. 266 berakhir dengan kalimat yang tampak bertentangan dengan inti paragraf (video memakai inti: panjang kaki tidak mengubah besar sudut); gambar kipas dan jam hanya ada sebagai gambar, nilai diambil dari kunci Panduan Guru dan dihitung ulang.
- **D:** kunci Uji Kompetensi 2 berjumlah 355 derajat (110, 90, 25, 130), bukan 360, padahal sudut keempat di gambar sekitar 135 (video memakai angka kunci dan menyebut selisih 5 sebagai catatan guru); Panduan Guru hlm. 277 menulis 56 derajat pada segitiga keramik, seharusnya 54; kunci keramik hanya gambar (hitungan mandiri: celah 54 dan 36 derajat); judul kolom Tabel 6.4 "Banyaknya Pengunjung" (salah salin); Panduan Guru hlm. 280 menulis "Jalan Kutilang", bukan Ketilang.
- Naskah video lama dihapus: `videos` pada `SUB_A56` sampai `SUB_D56` (kini `[]`), `videos` dan `stories` pada `kelas5-bab6.json`, cabang `k5b6` di `video-visual-k5.tsx` (impor `SudutSvg` ikut dibuang). Bila generator bab dijalankan lagi, isinya akan kembali dan harus dibuang lagi. `uji-statis-k5b6.mjs` dan `uji-lab-k5b6.mjs` disesuaikan.

## Audit visual
Seluruh 418 ketukan (8 video) dirender lewat rute pratinjau sementara (sudah dihapus) dengan `Panggung` pada t=999, dan kotak batas semua teks (4.205 teks) diukur. Temuan awal 12 (teks bertumpuk), 6 diperbaiki: kartu dan centang di D (`kipas-langkah2`), tanda silang dan teks di D luar (`luard-perkiraan`), label kipas dan derajat di C (`eks-siku-jodoh`). Sisa 6 sengaja dibiarkan setelah dilihat langsung: dua pasang emoji yang memang bersentuhan (orang memegang palu dan kaca pembesar) dan empat tanda silang kecil di dekat angka hasil pada Ayo Berlatih A, yang pada tangkapan layar terbaca jelas. Tidak ada teks keluar kanvas 300x208. Satu tangkapan layar dilihat langsung (Ayo Berlatih, kunci, miskonsepsi, Refleksi A): tata letak wajar. Catatan: pada pratinjau SSR muncul peringatan hidrasi karena digit terakhir desimal sinus/kosinus berbeda antara Node dan peramban; pemutar asli tidak diuji ulang untuk ini. Jarum jam B sudah dibulatkan dua desimal.
