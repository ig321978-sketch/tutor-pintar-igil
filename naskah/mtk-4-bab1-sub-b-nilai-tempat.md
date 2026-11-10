# Naskah Matematika Kelas 4 SD, Bab 1: Bilangan Cacah sampai 10.000, Sub-Bab B: Menentukan dan Menggunakan Nilai Tempat Bilangan Cacah sampai 10.000

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k4b1.ts` dan `src/components/modul/data-k4b1.ts`, oleh `scripts/buat-naskah-md.mjs`. Isi mengikuti Buku Siswa Matematika Kelas IV (Kemendikbudristek, Kurikulum Merdeka, Bab 1 hlm. 4–52) Sub-Bab A–I, serta diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.

## 1. Identitas modul

- Kode bab: `k4-mat-bab1`, FASE_B, kelas 4.
- Judul: BAB 1: BILANGAN CACAH SAMPAI 10.000. Sub-Bab B: Menentukan dan Menggunakan Nilai Tempat Bilangan Cacah sampai 10.000.
- Suara Guru: Web Speech API perangkat saja, laju 0.7 dan nada 1. Tanpa ElevenLabs.
- Isi: 3 video cerita (9 adegan), 8 langkah peta pikiran, 10 panel infografis, 30 permainan (10 Concrete, 10 Picture, 10 Abstract), 5 poin penting.

## 2. Tujuan belajar

Siswa menentukan tempat dan nilai setiap angka pada bilangan empat angka (pada 2.150, angka 2 bernilai 2.000), menyusun dan mengurai bilangan, serta mengisi tabel digit ribuan–satuan.

- Capaian Pembelajaran: Siswa menentukan nilai tempat bilangan cacah sampai 10.000.
- Acuan: Buku Siswa Matematika Kelas IV (Bab 1 Sub-Bab B hlm. 12–16), aktivitas empat kardus, dan expanded form.

## 3. Metode dari luar buku

- **Expanded form empat suku**: 2.150 = 2.000 + 100 + 50 + 0.
- **Angka vs nilai tempat**: 2 di ribuan bernilai 2.000, bukan 2.
- **Tabel nilai tempat**: mengisi nilai tiap kolom dari model blok.
- **Detektif nilai tempat**: petunjuk nilai menyisakan satu bilangan.
- **Garis bilangan nilai**: mengetuk nilai angka pada garis skala ribuan.
- **Uraian kata**: dari uraian ke lambang dan sebaliknya.

## 4. Tahap 1: Story (video cerita animasi SVG)

Tiap video diputar satu per satu saat siswa mengetuk Putar. Tidak ada yang berjalan sendiri. Kalimat dibacakan Suara Guru satu per satu (ketukan), dan gambar berubah mengikuti ketukan.

### K4B1B-V1. Empat Kardus (Aktivitas nilai tempat)

**K4B1B-V1-1. Siapkan kardus**

1. Siapkan empat kardus berlabel ribuan, ratusan, puluhan, dan satuan. *(papan: Empat kardus)*
2. Warnai biru, oranye, hijau, dan merah. *(papan: Empat warna)*
3. Susun dari kiri ke kanan. *(papan: Kiri ke kanan)*
4. Masukkan kartu angka 0 sampai 9 ke tiap kardus. *(papan: Kartu 0–9)*

**K4B1B-V1-2. Ambil satu dari tiap kardus**

1. Ambil satu kartu dari tiap kardus. *(papan: Satu kartu per kardus)*
2. Susun menjadi bilangan empat angka. *(papan: Susun empat angka)*
3. Sebut tempat tiap angka. *(papan: Sebut tempatnya)*
4. Lalu sebut bilangan utuhnya. *(papan: Sebut bilangannya)*

**K4B1B-V1-3. Contoh 2.150**

1. 2.150 dibaca dua ribu seratus lima puluh. *(papan: 2.150)*
2. Angka 2 di ribuan, 1 di ratusan, 5 di puluhan, 0 di satuan. *(papan: Tempat digit)*
3. Nilainya: 2.000, 100, 50, dan 0. *(papan: Nilai 2000+100+50+0)*
4. Itulah nilai tempat. *(papan: Nilai tempat)*

### K4B1B-V2. Uraian dan Tabel (Dari digit ke nilai)

**K4B1B-V2-1. Uraikan**

1. Mengurai berarti menulis nilai tiap tempat. *(papan: Uraian)*
2. 2.150 = 2.000 + 100 + 50 + 0. *(papan: 2.150)*
3. 7.350 = 7.000 + 300 + 50 + 0. *(papan: 7.350)*
4. Angka nol tetap ditulis pada uraian agar tempatnya jelas. *(papan: Nol tetap ada)*

**K4B1B-V2-2. Tabel digit**

1. Pada tabel, kita menulis digitnya, bukan nilai penuh. *(papan: Tabel digit)*
2. Untuk 7.812 tulis 7 | 8 | 1 | 2. *(papan: 7 8 1 2)*
3. Jangan menulis 7000 di kolom ribuan. *(papan: Bukan 7000)*
4. Digit dan nilai jangan tertukar. *(papan: Digit ≠ nilai)*

**K4B1B-V2-3. Angka 6 di mana**

1. Pada 8.463, angka 6 ada di puluhan, nilainya 60. *(papan: 8.463 → 60)*
2. Pada 4.675, angka 6 di ratusan, nilainya 600. *(papan: 4.675 → 600)*
3. Tempat mengubah nilai angka yang sama. *(papan: Tempat mengubah nilai)*
4. Latih dengan teliti. *(papan: Latihan)*

### K4B1B-V3. Struk Belanja (Nilai tempat pada harga)

**K4B1B-V3-1. Harga kue**

1. Azizah menjual kue. Slamet membeli seharga 7.350. *(papan: 7.350)*
2. Uangnya 9.500. Kembalian 2.150. *(papan: 9.500)*
3. Tentukan nilai tempat tiap harga. *(papan: 2.150)*
4. Ribuan menentukan besar uang paling kuat. *(papan: Nilai tempat)*

**K4B1B-V3-2. Lengkapi tabel**

1. Salin tabel: 6.192, 2.910, 4.128, 9.217. *(papan: Tabel buku)*
2. Isi digit ribuan, ratusan, puluhan, satuan. *(papan: Isi digit)*
3. Contoh 6.192: 6, 1, 9, 2. *(papan: 6.192 → 6 1 9 2)*
4. Periksa lagi sebelum selesai. *(papan: Periksa)*

**K4B1B-V3-3. Siap membandingkan**

1. Nilai tempat siap dipakai untuk membandingkan. *(papan: Nilai tempat siap)*
2. Kita bandingkan ribuan dulu. *(papan: Ribuan dulu)*
3. Bila sama, lanjut ratusan, puluhan, satuan. *(papan: Lanjut tempat kanan)*
4. Lanjut ke Sub-Bab C. *(papan: Sub-Bab C)*

## 5. Tahap 2: Mind map (peta pikiran)

**1. Nilai tempat** 📍 (START → 2)

Nilai tempat pada bilangan sampai 10.000.

**2. Empat kardus** 📦 (1 → 3)

Empat kardus pada bilangan sampai 10.000.

**3. Digit dan nilai** 🔢 (2 → 4)

Digit dan nilai pada bilangan sampai 10.000.

**4. Uraian** 🔓 (3 → 5)

Uraian pada bilangan sampai 10.000.

**5. Tabel digit** 📋 (4 → 6)

Tabel digit pada bilangan sampai 10.000.

**6. Angka nol** ⭕ (5 → 7)

Angka nol pada bilangan sampai 10.000.

**7. Harga struk** 🧾 (6 → 8)

Harga struk pada bilangan sampai 10.000.

**8. Siap nilai tempat** ✅ (7 → END)

Siap nilai tempat pada bilangan sampai 10.000.

## 6. Tahap 3: Infografis

1. **DIGIT ≠ NILAI** ⚖️: Digit adalah angka yang tertulis. Nilainya bergantung pada tempat.
2. **RIBUAN ×1000** 🟣: Angka di ribuan dikali seribu.
3. **RATUSAN ×100** 🟢: Angka di ratusan dikali seratus.
4. **PULUHAN ×10** 🔵: Angka di puluhan dikali sepuluh.
5. **SATUAN ×1** 🔴: Angka di satuan dikali satu.
6. **URAIAN** 🔓: Uraian menulis nilai tiap tempat.
7. **TABEL DIGIT** 📋: Tabel diisi digit, bukan nilai penuh.
8. **EMPAT KARDUS** 📦: Empat kardus membantu menyusun bilangan.
9. **TEMPAT MENGUBAH NILAI** 6️⃣: Angka sama, tempat beda, nilai beda.
10. **SIAP BANDING** ➡️: Nilai tempat dipakai untuk membandingkan.

## 7. Tahap 4: Concrete (benda nyata)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 1 | Nilai Tempat dari Kumpulan | `value-from-package` | hlm. 12–14 (2.150) | Menentukan nilai tempat angka pada kumpulan. | Tiga ronde, dua soal. |
| 2 | Susun dari Peti sampai Satuan | `compose-from-parts` | hlm. 13–14 | Menyusun bilangan dari digit tempat. | Tiga ronde, dua soal di papan. |
| 3 | Uraikan Kumpulan | `expand-package` | hlm. 14 | Mengurai menjadi 2000+100+50+0. | Tiga ronde, dua soal. |
| 4 | Isi Tabel dari Kumpulan | `fill-place-table-c` | hlm. 14–16 | Mengisi digit tabel dari kumpulan. | Tiga tabel. |
| 5 | Jodohkan Digit dan Nilainya | `match-digit-value-c` | hlm. 14 (angka 2 bernilai 2.000) | Menjodohkan digit tempat dengan nilainya. | Tiga ronde, tiga pasangan. |
| 6 | Memori Nilai Tempat | `memory-value-c` | hlm. 14 | Memori nilai tempat. | Tiga ronde, empat pasang. |
| 7 | Ketuk Tempat Angka | `tap-place-c` | hlm. 14 | Mengetuk tempat digit tertentu. | Tiga ronde, dua pertanyaan. |
| 8 | Ketuk Semua Syarat Nilai | `tap-all-value-c` | hlm. 15 | Memilih kumpulan sesuai syarat. | Tiga ronde. |
| 9 | Papan Nilai dari Cerita Harga | `board-value-c` | hlm. 15 (struk 7.350) | Mengisi papan dari harga. | Tiga ronde, dua soal. |
| 10 | Di Mana Angka Enam | `digit-six-c` | hlm. 15 (nilai tempat angka 6) | Menemukan nilai tempat angka 6. | Tiga ronde, dua soal. |

## 8. Tahap 5: Picture (diagram)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 11 | Nilai Tempat dari Blok | `value-from-blocks` | hlm. 14 | Nilai digit dari model. | Tiga ronde, dua soal. |
| 12 | Papan dari Blok B | `board-from-blocks-b` | hlm. 14–16 | Isi papan dari blok. | Tiga ronde. |
| 13 | Isi Tabel Nilai Tempat | `fill-table-b` | hlm. 16 | Lengkapi tabel 6.192 dst. | Tiga tabel. |
| 14 | Jodohkan Blok dan Uraian | `match-blocks-value` | hlm. 14 | Model dengan uraian. | Tiga ronde. |
| 15 | Memori Uraian | `memory-expand` | hlm. 14 | Memori bilangan dan uraian. | Tiga ronde. |
| 16 | Pilih Uraian | `expand-choice` | hlm. 14 | Memilih uraian benar. | Tiga ronde, dua soal. |
| 17 | Ketuk Semua Blok B | `tap-all-blocks-b` | hlm. 15 | Syarat digit pada model. | Tiga ronde. |
| 18 | Pilah menurut Ribuan | `sort-thousands` | hlm. 14 | Memilah menurut digit ribuan. | Tiga ronde, enam model. |
| 19 | Lengkapi Kalimat Nilai Tempat | `sentence-place` | hlm. 14–15 | Kalimat tentang nilai digit. | Tiga bilangan, tiga kalimat. |
| 20 | Ketuk Chip Nilai | `tap-value-chips` | hlm. 14 | Mengetuk chip 2000/100/50/0. | Tiga ronde. |

## 9. Tahap 6: Abstract (kata dan angka)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 21 | Susun di Papan Nilai Tempat | `compose-board-b` | hlm. 14 | Menyusun dari instruksi digit. | Tiga ronde, dua soal. |
| 22 | Nilai Angka pada Tempat | `value-of-digit` | hlm. 14–15 | Memilih nilai tempat sebuah digit. | Tiga ronde, dua soal. |
| 23 | Tulis dari Kata ke Papan | `write-place-board` | hlm. 14 | Kata bilangan ke papan. | Tiga ronde. |
| 24 | Jodohkan Digit dan Nilai | `match-digit-value` | hlm. 14 | Digit tempat dengan nilai. | Tiga ronde. |
| 25 | Memori Digit dan Nilai | `memory-digit-value` | hlm. 14 | Memori nilai tempat. | Tiga ronde. |
| 26 | Isi Tabel Digit | `fill-place-table-q` | hlm. 16 | Lengkapi tabel lambang→digit. | Tiga tabel. |
| 27 | Benar atau Salah: Nilai Tempat | `true-false-place` | hlm. 12–16 | Menilai pernyataan nilai tempat. | Dua ronde, lima. |
| 28 | Detektif Nilai Tempat | `detective-place` | hlm. 14–16 | Petunjuk nilai tempat. | Empat soal. |
| 29 | Ketuk Semua Syarat Tempat | `select-all-place` | hlm. 15 | Syarat digit. | Tiga ronde. |
| 30 | Susun Kata Nilai Tempat | `build-place-sentence` | hlm. 14 | Kalimat nilai tempat. | Empat kalimat. |

## 10. Poin penting, cara, kegiatan di rumah, dan refleksi

- 📍 **Tempat menentukan nilai**: 2 pada 2.150 = 2.000. *Suara:* Tempat menentukan nilai. Angka 2 pada 2.150 bernilai dua ribu.
- 🔓 **Uraian**: 2000 + 100 + 50 + 0. *Suara:* Uraian menulis nilai tiap tempat.
- 📋 **Tabel digit**: tulis angkanya, bukan 7000. *Suara:* Tabel nilai tempat diisi digit.
- 6️⃣ **Angka sama, nilai bisa beda**: 6 bisa 60 atau 600. *Suara:* Angka sama di tempat beda nilainya beda.
- ⭕ **Nol menjaga tempat**: satuan 0 tetap ada. *Suara:* Nol menjaga tempat yang kosong.

Ringkasan suara: Tempat menentukan nilai. Uraikan bilangan. Tabel diisi digit. Angka sama bisa bernilai beda. Nol menjaga tempat.

Cara menyebutkan: Cara nilai tempat. Tulis digit di empat kolom. Kalikan dengan 1000, 100, 10, 1. Jumlahkan. (tulis digit, × bobot, jumlahkan, cek ulang)

Ayo Mencoba di rumah: Ayo Mencoba: ambil empat digit dari nomor rumah atau plat. Susun bilangan, tulis tabel digit, dan uraikannya.

Refleksi:
- Aku tahu bedanya digit dan nilai.
- Aku bisa mengurai bilangan empat angka.
- Aku teliti mengisi tabel digit.
- Aku siap membandingkan dengan nilai tempat.
