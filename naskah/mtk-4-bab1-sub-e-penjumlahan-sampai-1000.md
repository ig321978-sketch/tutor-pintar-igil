# Naskah Matematika Kelas 4 SD, Bab 1: Bilangan Cacah sampai 10.000, Sub-Bab E: Penjumlahan Bilangan Cacah sampai 1.000

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k4b1.ts` dan `src/components/modul/data-k4b1.ts`, oleh `scripts/buat-naskah-md.mjs`. Isi mengikuti Buku Siswa Matematika Kelas IV (Kemendikbudristek, Kurikulum Merdeka, Bab 1 hlm. 4–52) Sub-Bab A–I, serta diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.

## 1. Identitas modul

- Kode bab: `k4-mat-bab1`, FASE_B, kelas 4.
- Judul: BAB 1: BILANGAN CACAH SAMPAI 10.000. Sub-Bab E: Penjumlahan Bilangan Cacah sampai 1.000.
- Suara Guru: Web Speech API perangkat saja, laju 0.7 dan nada 1. Tanpa ElevenLabs.
- Isi: 3 video cerita (9 adegan), 8 langkah peta pikiran, 10 panel infografis, 30 permainan (10 Concrete, 10 Picture, 10 Abstract), 4 poin penting.

## 2. Tujuan belajar

Siswa menjumlahkan bilangan sampai 1.000 dengan cara susun panjang dan pendek, tanpa dan dengan menyimpan, termasuk tiga bilangan dan soal cerita buku.

- Capaian Pembelajaran: Siswa menjumlahkan bilangan cacah sampai 1.000 dengan dan tanpa menyimpan.
- Acuan: Buku Siswa Matematika Kelas IV Bab 1 Sub-Bab E hlm. 28–33; partial-sums dan standard algorithm.

## 3. Metode dari luar buku

- **Algoritma bersusun dari satuan**: 131 + 321 dan 189 + 245 dari buku, kanan ke kiri.
- **Menyimpan (regrouping)**: 10 satuan = 1 puluhan; 10 puluhan = 1 ratusan.
- **Cara panjang (expanded addition)**: jumlahkan tiap nilai tempat lalu gabung.
- **Tiga suku**: latihan 898 + … dari buku untuk memperkuat menyimpan ratusan.
- **Model koleksi + papan empat kolom**: visual CPA sebelum simbol murni.
- **Pilah perlu/tidak menyimpan**: kesadaran strategi sebelum menghitung.

## 4. Tahap 1: Story (video cerita animasi SVG)

Tiap video diputar satu per satu saat siswa mengetuk Putar. Tidak ada yang berjalan sendiri. Kalimat dibacakan Suara Guru satu per satu (ketukan), dan gambar berubah mengikuti ketukan.

### K4B1E-V1. Jeruk Pak Toni (Tanpa menyimpan)

**K4B1E-V1-1. 131 + 321**

1. Pak Toni punya 131 pohon di Jember. *(papan: 131)*
2. Dan 321 pohon di Banyuwangi. *(papan: 321)*
3. Jumlahkan dari satuan. *(papan: satuan dulu)*
4. Hasilnya 452 pohon. *(papan: 452)*

**K4B1E-V1-2. Susun panjang**

1. Urai 131 = 100 + 30 + 1. *(papan: urai)*
2. Urai 321 = 300 + 20 + 1. *(papan: kelompokkan)*
3. Jumlahkan tiap tempat. *(papan: jumlahkan)*
4. 400 + 50 + 2 = 452. *(papan: 452)*

**K4B1E-V1-3. Susun pendek**

1. Tulis bersusun ratusan puluhan satuan. *(papan: bersusun)*
2. 1+1=2, 3+2=5, 1+3=4. *(papan: dari kanan)*
3. Tanpa menyimpan. *(papan: tanpa simpan)*
4. Sama hasilnya 452. *(papan: 452)*

### K4B1E-V2. Jeruk Pedagang (Dengan menyimpan)

**K4B1E-V2-1. 189 + 245**

1. Keranjang 189 dan 245 jeruk. *(papan: 189+245)*
2. 9 + 5 = 14, simpan 1 puluhan. *(papan: simpan satuan)*
3. 8 + 4 + 1 = 13, simpan 1 ratusan. *(papan: simpan puluhan)*
4. 1 + 1 + 2 = 4. Hasil 434. *(papan: 434)*

**K4B1E-V2-2. Susun panjang simpan**

1. Urai lalu jumlahkan. *(papan: urai)*
2. 14 = 10 + 4, 120 = 100 + 20. *(papan: 14 dan 120)*
3. Kelompokkan lagi. *(papan: kelompok)*
4. 400 + 30 + 4 = 434. *(papan: 434)*

**K4B1E-V2-3. Tiga bilangan**

1. Buku tiga SD: 124, 411, dan 363. *(papan: 124+411+363)*
2. Jumlahkan bertahap. *(papan: bertahap)*
3. Hasil 898 buku. *(papan: 898)*
4. Boleh dua-dua dulu. *(papan: dua-dua)*

### K4B1E-V3. Cerita Jumlah (Ayo berlatih)

**K4B1E-V3-1. Kelapa dan lele**

1. Kebun 328 + 579 kelapa. *(papan: 328+579)*
2. Ikan lele 117 + 105 + 242. *(papan: 117+105+242)*
3. Hitung dengan teliti. *(papan: teliti)*
4. Periksa menyimpan. *(papan: periksa)*

**K4B1E-V3-2. Lomba dan stiker**

1. Siswa lomba 121 + 29 + 98. *(papan: lomba)*
2. Stiker Helen 111 + 77 + 89. *(papan: stiker)*
3. Jumlahkan dari satuan. *(papan: dari satuan)*
4. Simpan bila perlu. *(papan: simpan)*

**K4B1E-V3-3. Siap bermain**

1. Kita sudah menjumlahkan dengan dan tanpa menyimpan. *(papan: siap)*
2. Saatnya bermain. *(papan: Concrete)*
3. Ingat: mulai dari satuan. *(papan: dari satuan)*
4. Ayo mulai. *(papan: mulai)*

## 5. Tahap 2: Mind map (peta pikiran)

**1. Gabungkan** ➕ (START → 2)

Dua banyak digabung menjadi satu.

**2. Dari kanan** ➡️ (1 → 3)

Satuan dulu, lalu puluhan, ratusan.

**3. Tanpa simpan** ✅ (2 → 4)

131+321=452.

**4. Menyimpan** 1️⃣ (3 → 5)

Bila ≥10, tulis sisa, simpan 1.

**5. 189+245** 🍊 (4 → 6)

Hasil 434 dengan dua simpan.

**6. Susun panjang** 📜 (5 → 7)

Urai dulu, lalu jumlahkan.

**7. Tiga bilangan** 3️⃣ (6 → 8)

124+411+363=898.

**8. Siap F** ✅ (7 → END)

Lanjut pengurangan.

## 6. Tahap 3: Infografis

1. **DARI SATUAN** ➡️: Penjumlahan dikerjakan dari kanan.
2. **452** 🌳: Seratus tiga puluh satu ditambah tiga ratus dua puluh satu.
3. **MENYIMPAN** 1️⃣: Bila jumlah tempat sepuluh atau lebih, simpan satu.
4. **434** 🍊: Seratus delapan puluh sembilan ditambah dua ratus empat puluh lima.
5. **SUSUN PENDEK** ⬇️: Tulis bersusun menurut nilai tempat.
6. **SUSUN PANJANG** 📜: Urai dulu, lalu jumlahkan tiap tempat.
7. **898** 📚: Seratus dua puluh empat ditambah empat ratus sebelas ditambah tiga ratus enam puluh tiga.
8. **PERIKSA** 🔍: Hitung lagi dari satuan untuk memeriksa.
9. **CERITA** 📖: Baca cerita, tulis model penjumlahan.
10. **SIAP F** ✅: Siap lanjut ke pengurangan.

## 7. Tahap 4: Concrete (benda nyata)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 1 | Gabungkan Kumpulan | `join-packages` | hlm. 28–29 (131+321) | Merakit jumlah dua kumpulan. | Tiga ronde. Penukaran otomatis. |
| 2 | Hitung Jumlah Kumpulan | `count-sum` | hlm. 29–31 | Memilih hasil penjumlahan. | Tiga ronde, dua soal. |
| 3 | Pilah: Menyimpan atau Tidak | `sort-carry` | hlm. 31 (189+245) | Memilah pasangan perlu simpan / tanpa. | Tiga ronde, enam pasangan. |
| 4 | Jodohkan Pasangan dan Jumlah | `match-sum` | hlm. 29–32 | Menjodohkan. | Tiga ronde. |
| 5 | Memori Penjumlahan | `memory-sum` | hlm. 29–33 | Memori soal dan hasil. | Tiga ronde. |
| 6 | Ketuk Jumlah yang Diminta | `tap-sum` | hlm. 29–33 | Mengetuk pasangan berjumlah tertentu. | Tiga ronde. |
| 7 | Ketuk Semua yang Menyimpan | `tap-all-carry` | hlm. 31 | Memilih semua yang perlu simpan. | Tiga ronde. |
| 8 | Cerita Penjumlahan | `story-add` | hlm. 33 (kelapa, lele, lomba, stiker) | Menyelesaikan soal cerita. | Tiga ronde, dua cerita. |
| 9 | Papan Hasil Jumlah | `board-sum` | hlm. 29–32 | Menulis hasil di papan. | Tiga ronde. |
| 10 | Urutkan menurut Jumlah | `order-sum` | hlm. 32–33 | Mengurutkan hasil. | Tiga ronde. |

## 8. Tahap 5: Picture (diagram)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 11 | Susun Pendek di Layar | `column-add` | hlm. 29–32 | Memilih hasil cara susun. | Tiga ronde. |
| 12 | Papan dari Model Jumlah | `board-add-p` | hlm. 29 | Isi papan dari dua model. | Tiga ronde. |
| 13 | Hitung Dua Model | `count-models-add` | hlm. 31 | Jumlahkan dua model blok. | Tiga ronde. |
| 14 | Jodohkan Model dan Jumlah | `match-models-add` | hlm. 31–32 | Jodohkan. | Tiga ronde. |
| 15 | Memori Model Jumlah | `memory-models-add` | hlm. 31 | Memori. | Tiga ronde. |
| 16 | Tabel Hasil Penjumlahan | `table-add` | hlm. 32 | Isi hasil pada tabel. | Tiga tabel. |
| 17 | Ketuk Semua Simpan (Blok) | `tap-all-carry-p` | hlm. 31 | Syarat menyimpan pada model. | Tiga ronde. |
| 18 | Pilah Model: Simpan/Tidak | `sort-carry-p` | hlm. 31 | Pilah pasangan model. | Tiga ronde. |
| 19 | Cara Susun Panjang | `long-form-add` | hlm. 29–31 | Memilih langkah uraian benar. | Tiga ronde. |
| 20 | Urutan Langkah Menjumlahkan | `steps-add` | hlm. 29–31 | Mengurutkan langkah. | Tiga ronde. |

## 9. Tahap 6: Abstract (kata dan angka)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 21 | Susun Pendek Angka | `column-add-q` | hlm. 32 | Hasil susun pendek. | Tiga ronde. |
| 22 | Pilih Jumlah | `choose-sum` | hlm. 32–33 | Memilih hasil. | Tiga ronde. |
| 23 | Tulis Jumlah di Papan | `board-add-q` | hlm. 32 | Menulis hasil. | Tiga ronde. |
| 24 | Langkah Menyimpan | `steps-add-q` | hlm. 31 | Memilih langkah benar. | Tiga ronde. |
| 25 | Jodohkan Soal dan Hasil | `match-add-q` | hlm. 32 | Jodohkan. | Tiga ronde. |
| 26 | Memori Soal Jumlah | `memory-add-q` | hlm. 32–33 | Memori. | Tiga ronde. |
| 27 | Benar atau Salah: Jumlah | `true-false-e` | hlm. 28–33 | Menilai pernyataan. | Dua ronde. |
| 28 | Detektif Penjumlahan | `detective-e` | hlm. 33 | Dua petunjuk → hasil. | Empat soal. |
| 29 | Peta Konsep Penjumlahan | `concept-e` | hlm. 29–31 | Mengisi kotak konsep. | Satu peta. |
| 30 | Cerita Angka Penjumlahan | `story-add-q` | hlm. 33 | Soal cerita tanpa gambar. | Tiga ronde. |

## 10. Poin penting, cara, kegiatan di rumah, dan refleksi

- ➡️ **Dari satuan**: Jumlahkan dari kanan ke kiri.. *Suara:* Mulai dari satuan, lalu puluhan, lalu ratusan.
- 1️⃣ **Menyimpan**: Bila ≥10, simpan 1 ke kiri.. *Suara:* Simpan satu ke tempat di sebelah kiri.
- 📜 **Dua cara**: Susun panjang dan pendek hasilnya sama.. *Suara:* Dua cara, satu hasil.
- 3️⃣ **Tiga suku**: Jumlahkan bertahap dua-dua.. *Suara:* Tiga bilangan boleh dijumlahkan dua-dua.

Ringkasan suara: Empat poin penting penjumlahan sampai seribu.

Cara menyebutkan: Ikuti langkah-langkahnya. (susun, satuan, simpan, ratusan)

Ayo Mencoba di rumah: Ayo Mencoba: jumlahkan tiga harga di warung dengan cara susun pendek.

Refleksi:
- Aku mulai dari satuan.
- Aku menyimpan dengan benar.
- Aku memakai dua cara.
- Aku memeriksa hasil.
