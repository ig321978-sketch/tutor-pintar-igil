# Naskah Matematika Kelas 4 SD, Bab 1: Bilangan Cacah sampai 10.000, Sub-Bab A: Membaca dan Menulis Bilangan Cacah sampai 10.000

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k4b1.ts` dan `src/components/modul/data-k4b1.ts`, oleh `scripts/buat-naskah-md.mjs`. Isi mengikuti Buku Siswa Matematika Kelas IV (Kemendikbudristek, Kurikulum Merdeka, Bab 1 hlm. 4–52) Sub-Bab A–I, serta diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.

## 1. Identitas modul

- Kode bab: `k4-mat-bab1`, FASE_B, kelas 4.
- Judul: BAB 1: BILANGAN CACAH SAMPAI 10.000. Sub-Bab A: Membaca dan Menulis Bilangan Cacah sampai 10.000.
- Suara Guru: Web Speech API perangkat saja, laju 0.7 dan nada 1. Tanpa ElevenLabs.
- Isi: 3 video cerita (9 adegan), 8 langkah peta pikiran, 10 panel infografis, 30 permainan (10 Concrete, 10 Picture, 10 Abstract), 5 poin penting.

## 2. Tujuan belajar

Siswa membaca dan menulis bilangan cacah empat angka sampai 10.000, termasuk bilangan dengan nol (7.003, 1.025, 6.570), memakai papan ribuan–satuan, serta memahami 10 dus = 1 peti (1.000).

- Capaian Pembelajaran: Siswa membaca, menulis, membandingkan, dan mengurutkan bilangan cacah sampai 10.000. Pada sub-bab ini fokus membaca dan menulis.
- Acuan: Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 1 Sub-Bab A hlm. 4–11) dan metode Dienes empat tingkat (peti–dus–bungkus–benda).

## 3. Metode dari luar buku

- **Balok Dienes empat tingkat**: peti (1.000), dus (100), bungkus (10), benda (1) memperluas model Kelas 3 ke ribuan.
- **Papan nilai tempat empat kolom berwarna**: ribuan ungu, ratusan hijau, puluhan biru, satuan merah.
- **Kartu angka empat digit**: menyusun lambang bilangan dengan empat kartu pada empat tempat.
- **Miskonsepsi nol di tengah**: 7.003, 1.025, 6.570 dilatih agar nol menjaga tempat tanpa dibaca.
- **Penukaran sepuluh dus = satu peti**: aturan ribuan tampak langsung saat merakit.
- **Contoh kontekstual buku**: harga minimarket 6.750, jarak 3.286 m, tinggi Gunung Semeru 3.676 m.

## 4. Tahap 1: Story (video cerita animasi SVG)

Tiap video diputar satu per satu saat siswa mengetuk Putar. Tidak ada yang berjalan sendiri. Kalimat dibacakan Suara Guru satu per satu (ketukan), dan gambar berubah mengikuti ketukan.

### K4B1A-V1. Helen di Minimarket (Harga empat angka)

**K4B1A-V1-1. Belanja bersama Ibu**

1. Helen mengantar Ibu ke minimarket untuk membeli bahan kue. *(papan: Minimarket)*
2. Helen meminta minuman seharga enam ribu tujuh ratus lima puluh rupiah. *(papan: Rp6.750,00)*
3. Di rak makanan banyak label harga empat angka. *(papan: Banyak label harga)*
4. Kita akan belajar membaca bilangan empat angka. *(papan: Bilangan empat angka)*

**K4B1A-V1-2. Jarak 3.286 meter**

1. Dari minimarket ke rumah Helen berjarak tiga ribu dua ratus delapan puluh enam meter. *(papan: 3.286 meter)*
2. Ambil kartu angka 3, 2, 8, dan 6. *(papan: Kartu 3 2 8 6)*
3. Taruh di papan: ribuan 3, ratusan 2, puluhan 8, satuan 6. *(papan: Papan empat tempat)*
4. Dibaca: tiga ribu dua ratus delapan puluh enam. *(papan: Tiga ribu dua ratus delapan puluh enam)*

**K4B1A-V1-3. Aturan membaca**

1. Satuan dibaca angkanya saja. *(papan: Satuan: angka)*
2. Puluhan ditambah kata puluh, ratusan ditambah ratus, ribuan ditambah ribu. *(papan: Puluh, ratus, ribu)*
3. Baca dari kiri ke kanan. *(papan: Dari kiri)*
4. Jika ada nol, tempat itu tidak dibaca. *(papan: Nol tidak dibaca)*

### K4B1A-V2. Gunung Semeru (Menulis dari kata)

**K4B1A-V2-1. Tinggi Mahameru**

1. Gunung Semeru adalah gunung tertinggi di Pulau Jawa. *(papan: Gunung Semeru)*
2. Puncak Mahameru tingginya tiga ribu enam ratus tujuh puluh enam meter. *(papan: Tiga ribu enam ratus tujuh puluh enam)*
3. Bagaimana menulis lambang bilangan itu? *(papan: Menulis lambang)*
4. Dengar katanya, lalu tulis angkanya. *(papan: Dengar lalu tulis)*

**K4B1A-V2-2. Menulis 3.254**

1. Tiga ribu dua ratus lima puluh empat. *(papan: Tiga ribu…)*
2. Ribuan tiga, tulis 3. Ratusan dua, tulis 2. *(papan: Ribuan 3, ratusan 2)*
3. Puluhan lima, tulis 5. Satuan empat, tulis 4. *(papan: Puluhan 5, satuan 4)*
4. Hasilnya 3.254. *(papan: 3.254)*

**K4B1A-V2-3. Seribu, bukan satu ribu**

1. Bilangan 1.025: ribuannya 1 dibaca seribu. *(papan: 1.025)*
2. Ratusannya 0, tidak ditulis dalam bacaan. *(papan: Seribu)*
3. Puluhan 2 dan satuan 5: dua puluh lima. *(papan: Nol ratusan dilewati)*
4. Jadi dibaca seribu dua puluh lima. *(papan: Seribu dua puluh lima)*

### K4B1A-V3. Harga di Warung (Latihan membaca)

**K4B1A-V3-1. Slamet belanja**

1. Slamet membeli makanan ringan seharga tujuh ribu tiga ratus lima puluh rupiah. *(papan: Rp7.350)*
2. Uangnya sembilan ribu lima ratus rupiah. *(papan: Rp9.500)*
3. Kembalian dua ribu seratus lima puluh rupiah. *(papan: Rp2.150)*
4. Ayo baca ketiga bilangan itu. *(papan: Baca ketiga)*

**K4B1A-V3-2. Jodohkan bacaan**

1. 2.903 dibaca dua ribu sembilan ratus tiga. *(papan: 2.903)*
2. 6.002 dibaca enam ribu dua. *(papan: 6.002)*
3. 9.045 dibaca sembilan ribu empat puluh lima. *(papan: 9.045)*
4. 2.145 dibaca dua ribu seratus empat puluh lima. *(papan: 2.145)*

**K4B1A-V3-3. Siap ke nilai tempat**

1. Kita sudah bisa membaca dan menulis bilangan empat angka. *(papan: Membaca-menulis siap)*
2. Berikutnya kita pelajari nilai tiap tempat angka. *(papan: Nilai tempat)*
3. Angka 2 pada 2.150 bernilai dua ribu, bukan dua. *(papan: 2 bernilai 2.000)*
4. Siap lanjut ke Sub-Bab B. *(papan: Lanjut Sub-Bab B)*

## 5. Tahap 2: Mind map (peta pikiran)

**1. Empat angka** 4️⃣ (START → 2)

Empat angka pada bilangan sampai 10.000.

**2. Ribuan** 🟣 (1 → 3)

Ribuan pada bilangan sampai 10.000.

**3. Cara membaca** 🗣️ (2 → 4)

Cara membaca pada bilangan sampai 10.000.

**4. Angka nol** ⭕ (3 → 5)

Angka nol pada bilangan sampai 10.000.

**5. Menulis lambang** ✍️ (4 → 6)

Menulis lambang pada bilangan sampai 10.000.

**6. Kartu angka** 🃏 (5 → 7)

Kartu angka pada bilangan sampai 10.000.

**7. Harga di minimarket** 🏪 (6 → 8)

Harga di minimarket pada bilangan sampai 10.000.

**8. Siap membaca menulis** ✅ (7 → END)

Siap membaca menulis pada bilangan sampai 10.000.

## 6. Tahap 3: Infografis

1. **RIBUAN** 🟣: Tempat paling kiri pada bilangan empat angka adalah ribuan. Satu peti sama dengan seribu.
2. **RATUSAN** 🟢: Di kanan ribuan ada ratusan. Satu dus sama dengan seratus.
3. **PULUHAN** 🔵: Puluhan memakai kata puluh. Sepuluh satuan sama dengan satu puluhan.
4. **SATUAN** 🔴: Satuan dibaca angkanya saja.
5. **BACA DARI KIRI** ⬅️: Baca dari ribuan ke satuan. Contoh 3.286.
6. **NOL TIDAK DIBACA** ⭕: 7.003 dibaca tujuh ribu tiga. Nol tidak dibaca.
7. **SERIBU** 1️⃣: Ribuan 1 dibaca seribu, bukan satu ribu.
8. **NOL MENJAGA TEMPAT** ✍️: Saat menulis, nol menjaga tempat yang kosong.
9. **SEPULUH DUS = SATU PETI** 🔄: Sepuluh dus ditukar menjadi satu peti.
10. **SAMPAI 10.000** 🔟: Batas bab ini adalah sepuluh ribu.

## 7. Tahap 4: Concrete (benda nyata)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 1 | Rakit Peti dan Dus | `build-with-exchange` | hlm. 4–6 (kartu bilangan; 10 dus = 1 peti) | Merakit bilangan empat angka dengan peti, dus, bungkus, dan benda lepas. | Tiga ronde, tiap ronde dua bilangan. Penukaran sepuluh otomatis. Tekan Periksa. |
| 2 | Hitung Kemasan Empat Tingkat | `count-packages` | hlm. 5–6 (membaca 3.286) | Menghitung peti, dus, bungkus, dan benda lalu memilih lambangnya. | Tiga ronde, dua soal. Pilih satu dari tiga bilangan. |
| 3 | Pilah Peti, Dus, Bungkus, Satuan | `sort-packages` | hlm. 5–6 (ribuan sampai satuan) | Memilah kemasan menurut nilainya. | Tiga ronde, enam kelompok ke empat kotak. |
| 4 | Jodohkan Kemasan dan Bilangan | `match-package-number` | hlm. 6 (nama bilangan 3.286) | Menjodohkan kumpulan dengan lambang. | Tiga ronde, tiga pasangan. |
| 5 | Memori Kemasan dan Bilangan | `memory-package-number` | hlm. 6–11 | Mencocokkan kumpulan dan lambang lewat memori. | Tiga ronde, empat pasang. |
| 6 | Ketuk Kumpulan yang Dibaca | `tap-read-package` | hlm. 6 (cara membaca) | Mendengar kata bilangan lalu mengetuk kumpulan. | Tiga ronde, tiga kumpulan mirip. |
| 7 | Ketuk Semua yang Cocok | `tap-all-packages` | hlm. 9–11 (nol pada tempat) | Menemukan semua kumpulan dengan syarat digit. | Tiga ronde, empat kumpulan. |
| 8 | Baca Kumpulan | `read-package-words` | hlm. 6–9 (3.286, 7.003, 1.025) | Memilih cara membaca yang benar. | Tiga ronde, dua soal. |
| 9 | Papan dari Kumpulan | `board-from-package` | hlm. 6 (tabel Ribuan–Satuan) | Mengisi papan empat kolom dari kumpulan. | Tiga ronde, dua soal. |
| 10 | Tukar Kemasan sampai Peti | `exchange-packages` | hlm. 5–6 (10→1) | Memahami penukaran sampai peti 1.000. | Tiga ronde, dua soal. |

## 8. Tahap 5: Picture (diagram)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 11 | Hitung Blok Empat Tempat | `count-blocks` | hlm. 6 | Membaca model blok menjadi lambang. | Tiga ronde, dua soal. |
| 12 | Papan dari Blok | `board-from-blocks` | hlm. 6 dan 14 | Mengisi papan dari model blok. | Tiga ronde, dua soal. |
| 13 | Isi Tabel Blok | `fill-block-table` | hlm. 16 (tabel nilai tempat) | Mengisi digit pada tabel dari model. | Tiga tabel, tiga baris. |
| 14 | Jodohkan Blok dan Bilangan | `match-block-number` | hlm. 6 | Menjodohkan model dengan lambang. | Tiga ronde, tiga pasangan. |
| 15 | Memori Blok dan Kata | `memory-block-word` | hlm. 6–9 | Mencocokkan model dengan kata. | Tiga ronde, empat pasang. |
| 16 | Ketuk Blok yang Dibaca | `tap-block-read` | hlm. 6–9 | Mengetuk model sesuai bacaan. | Tiga ronde, dua pertanyaan. |
| 17 | Garis Bilangan Ribuan | `number-line-read` | hlm. 4–11 | Menemukan bilangan pada garis. | Tiga ronde, dua soal. |
| 18 | Ketuk Semua Blok | `tap-all-blocks` | hlm. 9–11 | Memilih model sesuai syarat digit. | Tiga ronde, empat model. |
| 19 | Pilah Blok: Ada Nol atau Tidak | `sort-zero-blocks` | hlm. 6–9 (nol tidak dibaca) | Memilah model ada nol / tanpa nol. | Tiga ronde, enam model. |
| 20 | Lengkapi Kalimat Blok | `complete-block-sentence` | hlm. 6–14 | Melengkapi kalimat tentang digit tempat. | Tiga model, tiga kalimat. |

## 9. Tahap 6: Abstract (kata dan angka)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 21 | Susun Empat Kartu | `compose-four-cards` | hlm. 5–8 (kartu bilangan) | Menulis lambang dari kata dengan empat kartu. | Tiga ronde, dua soal. |
| 22 | Baca Bilangan Empat Angka | `read-number-choice` | hlm. 6–9 | Memilih cara membaca yang benar. | Tiga ronde, dua soal. |
| 23 | Tulis Lambang di Papan | `write-on-board` | hlm. 7–9 (menulis 3.254) | Menulis dari kata ke papan empat kolom. | Tiga ronde, dua soal. |
| 24 | Jodohkan Angka dan Kata | `match-number-word` | hlm. 11 (hubungkan) | Menjodohkan lambang dan bacaan. | Tiga ronde, tiga pasang. |
| 25 | Memori Angka dan Kata | `memory-number-word` | hlm. 11 | Memori lambang dan kata. | Tiga ronde, empat pasang. |
| 26 | Isi Tabel Cara Membaca | `fill-reading-table` | hlm. 11 | Melengkapi tabel bacaan. | Tiga tabel, empat baris. |
| 27 | Benar atau Salah: Membaca | `true-false-reading` | hlm. 4–11 | Menilai pernyataan membaca/menulis. | Dua ronde, lima pernyataan. |
| 28 | Detektif Bilangan Empat Angka | `detective-number` | hlm. 8–11 | Menemukan bilangan dari dua petunjuk. | Empat soal. |
| 29 | Ketuk Semua yang Cocok: Angka | `select-all-numbers` | hlm. 9–11 | Memilih bilangan sesuai syarat digit. | Tiga ronde, empat bilangan. |
| 30 | Susun Kata Bilangan | `build-number-sentence` | hlm. 6–9 | Menyusun kalimat tentang bilangan. | Empat kalimat. |

## 10. Poin penting, cara, kegiatan di rumah, dan refleksi

- 🟣 **Empat tempat**: ribuan, ratusan, puluhan, satuan. *Suara:* Bilangan empat angka punya empat tempat dari kiri: ribuan, ratusan, puluhan, dan satuan.
- 🗣️ **Baca dari kiri**: 3.286 = tiga ribu dua ratus delapan puluh enam. *Suara:* Baca dari ribuan. 3.286 dibaca tiga ribu dua ratus delapan puluh enam.
- ⭕ **Nol tidak dibaca**: 7.003 = tujuh ribu tiga. *Suara:* Nol tidak dibaca. 7.003 dibaca tujuh ribu tiga.
- 1️⃣ **Seribu**: 1.025 = seribu dua puluh lima. *Suara:* Ribuan 1 dibaca seribu.
- 🔄 **10 dus = 1 peti**: 1.000 satuan. *Suara:* Sepuluh dus sama dengan satu peti atau seribu.

Ringkasan suara: Ingat! Empat tempat: ribuan, ratusan, puluhan, satuan. Baca dari kiri. Nol tidak dibaca. Ribuan 1 dibaca seribu. Sepuluh dus sama dengan satu peti.

Cara menyebutkan: Cara membaca. Lihat ribuan, ratusan, puluhan, satuan. Baca berurutan, lewati nol. (ribuan, ratusan, puluhan, lewati nol)

Ayo Mencoba di rumah: catat lima harga empat angka di warung atau struk belanja. Tulis lambangnya, tandai ribuan–satuan dengan empat warna, lalu bacakan.

Refleksi:
- Aku dapat membaca bilangan empat angka.
- Aku dapat menulis lambangnya dari kata.
- Aku teliti saat ada nol.
- Aku berani menjelaskan kepada teman.
