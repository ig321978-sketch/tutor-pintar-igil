# Video Story Kelas 5 Bab 5 Luas Daerah Bangun Datar (Sub-Bab A, B, C, D): mesin Story baru

Tiap sub-bab memuat **dua video terpisah**: **Video Materi Kurikulum** (isi Buku Siswa, dilengkapi Buku Panduan Guru) dan **Video Metode Luar**. Mesin sama dengan Kelas 5 Bab 6 sampai 9 serta Kelas 6 Bab 1 sampai 4 (`story/logika-story.ts` dan `story/mesin-story.tsx`, lihat `naskah/story-video-k5b6.md`). Gambar dirancang khusus tiap sub-bab: `story/k5b5a-*` sampai `k5b5d-*`. Pembungkus: `video-k5b5a.tsx` sampai `video-k5b5d.tsx` (ekspor `VideoK5B5A/B/C/D({ speakGuru })` tidak berubah).

Uji (pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan gambar akhir adegan, batas kanvas, pemisahan materi dan metode luar, kutipan buku terhadap teks PDF, hitungan mandiri dan geometri gambar, emoji paling tinggi Emoji 12, kemurnian berkas):
- `node --no-warnings scripts/uji-story-k5b5a.mjs` (7.067 pemeriksaan, 0 gagal)
- `scripts/uji-story-k5b5b.mjs` (4.837, 0 gagal)
- `scripts/uji-story-k5b5c.mjs` (7.793, 0 gagal)
- `scripts/uji-story-k5b5d.mjs` (3.358, 0 gagal)
- `uji-statis-k5b5` (69) dan `uji-lab-k5b5` (1.874) disesuaikan dan lulus.

Halaman Buku Siswa = halaman PDF dikurangi 16; Buku Panduan Guru = PDF dikurangi 12. Bab 5 ada di Buku Siswa hlm. 131-162 dan Panduan Guru hlm. 177-246. Pembagian: pembuka bab (hlm. 131-132) dan Sub-Bab A hlm. 133-143, B hlm. 144-157, C hlm. 158-159, D hlm. 159-161. Refleksi menurut butir: 1-5 di A, 6-12 di B, 13-14 di C, 15-18 di D. Karena C pendek, Uji Kompetensi 1-4 (hlm. 162) beserta kunci dan rubrik (Panduan Guru hlm. 236-241) masuk C. Pengayaan kolam renang, remedial, dan interaksi dengan orang tua (Panduan Guru hlm. 242-245) ikut D.

## Ukuran (perkiraan suara 0,5 detik per kata)
| Video | Adegan | Ketukan | Kata | Durasi |
|---|---|---|---|---|
| A materi | 11 | 57 | 1422 | 11,8 menit |
| A metode luar | 10 | 42 | 893 | 7,4 menit |
| B materi | 11 | 59 | 1377 | 11,5 menit |
| B metode luar | 10 | 40 | 914 | 7,6 menit |
| C materi | 12 | 60 | 1115 | 9,3 menit |
| C metode luar | 10 | 40 | 759 | 6,3 menit |
| D materi | 11 | 55 | 1247 | 10,4 menit |
| D metode luar | 10 | 43 | 922 | 7,7 menit |

Total 8 video, 85 adegan, 396 ketukan, 8649 kata, sekitar 72 menit suara. Video A dan B materi sedikit di atas target 9-11 menit karena isi padat (A memuat pembuka bab dan lima eksplorasi, B memuat tujuh eksplorasi 5.2A-5.2G).

## Isi
- **A (konsep luas, termasuk pembuka bab):** Materi: tujuan, peta konsep, Alun-Alun Utara, Eksplorasi 5.1A-5.1E (pengubinan, petak satuan, denah rumah, cm2 dan m2, potong-tempel), Ayo Berlatih A-G, miskonsepsi, Refleksi 1-5. Metode luar: Unit Square Covering, Array Model, Area Conservation (Cara Yohana), dan metode baru Grid Estimation of Partial Squares.
- **B (luas bangun datar):** Materi: Eksplorasi 5.2A-5.2G (persegi panjang, persegi, segitiga, jajargenjang, trapesium, belah ketupat, layang-layang), miskonsepsi dan diferensiasi, Refleksi 6-12. Metode luar: Dissection Method, Shear Principle, Base x Height Unification, dan metode baru Rectangle Enclosure Halving.
- **C (bangun gabungan):** Materi: Eksplorasi 5.3 (Cara Yohana dan Cara Komang), miskonsepsi, Refleksi 13-14, Uji Kompetensi 1-4 beserta kunci dan rubrik. Metode luar: Additive Decomposition, Composite Area Strategy, dan metode baru Subtractive Decomposition (Outer Rectangle Minus Cutout) serta Rearrangement Invariance Check.
- **D (hubungan keliling dan luas, penutup bab):** Materi: Eksplorasi 5.4 (kawat 60 cm, enam bentuk), miskonsepsi dan diferensiasi, Refleksi 15-18, pengayaan kolam renang, remedial, interaksi orang tua. Metode luar: Isoperimetric Relationship, Fixed Perimeter Maximize Area, dan metode baru Fixed Area Minimize Perimeter serta Squareness Ratio.

## Catatan temuan buku
Lengkap di catatan sesi `temuan-k5b5a.md` sampai `d.md`.
- **A:** Panduan Guru hlm. 186 menulis ruang tamu 3 x 4 (12), kunci menyebut 13 (dari gambar: 3 x 5 dikurangi kamar mandi 2 x 1; video memakai 13); label ukuran Gambar 5.2 tidak sebanding dengan proporsi gambar; daftar bangun hlm. 133 tidak memuat segitiga, belah ketupat, layang-layang; bentuk G setelah dipotong-tempel hanya ada sebagai gambar (video memakai susunan sendiri, luas 9).
- **B:** Eksplorasi 5.2D dan 5.2E masih menyebut "segitiga" (salinan 5.2C); hlm. 153 "luas trapesium = luas trapesium" (seharusnya jajargenjang); kalimat belah ketupat dipakai pada layang-layang (hlm. 157, Tabel 5.12); kata hilang pada hlm. 156; layang-layang harus dibalik, bukan sekadar dipindah; koordinat gambar tidak dicetak sehingga gambar dirancang sendiri dengan ukuran kunci.
- **C:** rubrik Uji Kompetensi 4 (Panduan Guru hlm. 241) memakai trapesium (3+1) hingga 22, padahal kunci Cara 1 dan gambar memberi 20 (dihitung tiga cara; video memakai 20 dan menyebut selisihnya); Refleksi 13-14 di Panduan Guru hlm. 232 tertulis "Subbab B"; Uji Kompetensi 1 hanya satu layang-layang, bukan bangun gabungan; isian Eksplorasi 5.3 hanya terjawab di Panduan Guru.
- **D:** kunci pengayaan kolam (Panduan Guru hlm. 243) memakai persegi panjang luar 16 x 7, padahal tepian 1 m di semua sisi memberi 17 x 8 (kunci: 22 m2, 137,5 keramik, 28 dus; hitungan mandiri: 46 m2, 287,5 keramik, 58 dus; video menyajikan angka kunci lalu catatan guru dengan hitungan mandiri); skala satu petak (5 cm) hanya terbaca dari gambar; rujukan "Tabel 5.4" di hlm. 235 keliru; pengayaan disebut soal keliling padahal soal luas; soal pengayaan kehilangan kata "panjang".
- Panduan Guru Bab 5 sebenarnya hlm. 177-246 (PDF 189-258).
- Naskah video lama dihapus: `videos` pada `SUB_A55` sampai `SUB_D55` (kini `[]`), `videos` dan `stories` pada `kelas5-bab5.json`, cabang `k5b5` di `video-visual-k5.tsx` (impor `BangunLuas` ikut dibuang). Bila generator bab (`buat-k5-bab5.mjs`) dijalankan lagi, isinya akan kembali dan harus dibuang lagi.

## Audit visual
Seluruh 396 ketukan (8 video) dirender lewat rute pratinjau sementara (sudah dihapus) dengan `Panggung` pada t=999, dan kotak batas semua teks (3.085 teks) diukur. Tidak ada teks keluar kanvas 300x208. Ada 5 pasangan teks yang kotaknya bersentuhan 1-6 piksel (label "R. Tamu" dengan angka petak di A, judul dengan keterangan di C luar, emoji dengan nama di A); satu tangkapan layar (denah ruang tamu A) dilihat langsung dan tata letaknya wajar, sisanya dibiarkan. Sebelum audit, subagen sub-bab C sudah memperbaiki dua teks yang tertutup bangun lewat render SVG. Pemutar asli dan animasi tidak diuji ulang.
