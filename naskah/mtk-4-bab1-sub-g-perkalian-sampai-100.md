# Naskah Matematika Kelas 4 SD, Bab 1: Bilangan Cacah sampai 10.000, Sub-Bab G: Perkalian Bilangan Cacah Sampai 100

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k4b1.ts` dan `src/components/modul/data-k4b1.ts`, oleh `scripts/buat-naskah-md.mjs`. Isi mengikuti Buku Siswa Matematika Kelas IV (Kemendikbudristek, Kurikulum Merdeka, Bab 1 hlm. 4–52) Sub-Bab A–I, serta diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.

## 1. Identitas modul

- Kode bab: `k4-mat-bab1`, FASE_B, kelas 4.
- Judul: BAB 1: BILANGAN CACAH SAMPAI 10.000. Sub-Bab G: Perkalian Bilangan Cacah Sampai 100.
- Suara Guru: Web Speech API perangkat saja, laju 0.7 dan nada 1. Tanpa ElevenLabs.
- Isi: 3 video cerita (9 adegan), 8 langkah peta pikiran, 10 panel infografis, 30 permainan (10 Concrete, 10 Picture, 10 Abstract), 4 poin penting.

## 2. Tujuan belajar

Siswa memahami perkalian sampai 100 sebagai penjumlahan berulang, memakai cara panjang (urai puluhan+satuan) dan cara bersusun pendek dengan atau tanpa menyimpan, serta menyelesaikan soal cerita (donat 12×4, kelereng 14×5, pensil 12×8).

- Capaian Pembelajaran: Siswa melakukan operasi hitung bilangan cacah. Pada sub-bab ini fokus perkalian sampai 100.
- Acuan: Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 1 Sub-Bab G hlm. 39–43); array model & algoritma bersusun.

## 3. Metode dari luar buku

- **Array model**: 12×4 donat sebagai penjumlahan berulang tampak.
- **Cara panjang (distributive)**: (10+2)×4 = 40+8 = 48.
- **Bersusun dengan menyimpan**: 14×5 → satuan 20, simpan 2.
- **Cerita kontekstual buku**: ayam, rak buku, kancing, kaki kucing, pensil 12×8.
- **Pilah perlu/tidak menyimpan**: kesadaran strategi sebelum menghitung.
- **Periksa silang**: bandingkan hasil cara panjang dan bersusun.

## 4. Tahap 1: Story (video cerita animasi SVG)

Tiap video diputar satu per satu saat siswa mengetuk Putar. Tidak ada yang berjalan sendiri. Kalimat dibacakan Suara Guru satu per satu (ketukan), dan gambar berubah mengikuti ketukan.

### K4B1G-V1. Donat 12 × 4 (Array & penjumlahan berulang)

**K4B1G-V1-1. Kotak donat**

1. Helen melihat 12 kotak donat. *(papan: 12 kotak)*
2. Tiap kotak berisi 4 donat. *(papan: isi 4)*
3. Jika dijumlahkan satu-satu lama sekali. *(papan: lama)*
4. Ayo pakai perkalian. *(papan: ×)*

**K4B1G-V1-2. Jumlah berulang**

1. 4 ditambah 4 sebanyak 12 kali. *(papan: 4+4+…)*
2. Hasilnya 48 donat. *(papan: 48)*
3. Ditulis 12 kali 4 sama dengan 48. *(papan: 12×4)*
4. Perkalian mempercepat hitungan. *(papan: cepat)*

**K4B1G-V1-3. Siap cara panjang**

1. Kita uraikan 12 menjadi 10 tambah 2. *(papan: 10+2)*
2. Lalu kalikan masing-masing dengan 4. *(papan: ×4)*
3. 40 tambah 8 sama dengan 48. *(papan: 40+8)*
4. Itu namanya cara panjang. *(papan: panjang)*

### K4B1G-V2. Kelereng 14 × 5 (Bersusun dengan menyimpan)

**K4B1G-V2-1. 14 tumpuk**

1. Ada 14 tumpuk kelereng. *(papan: 14 tumpuk)*
2. Tiap tumpuk berisi 5 butir. *(papan: isi 5)*
3. Berapa seluruhnya? *(papan: berapa?)*
4. Ayo bersusun. *(papan: bersusun)*

**K4B1G-V2-2. Menyimpan**

1. 4 kali 5 sama dengan 20. *(papan: 4×5=20)*
2. Tulis 0, simpan 2 ke puluhan. *(papan: simpan 2)*
3. 1 kali 5 sama dengan 5, tambah 2 jadi 7. *(papan: 5+2=7)*
4. Hasilnya 70. *(papan: 70)*

**K4B1G-V2-3. Cara panjang sama**

1. 14 sama dengan 10 tambah 4. *(papan: 10+4)*
2. 10 kali 5 sama dengan 50. *(papan: 50)*
3. 4 kali 5 sama dengan 20. *(papan: 20)*
4. 50 tambah 20 sama dengan 70. *(papan: 70)*

### K4B1G-V3. Cerita Kali (Ayam, buku, kancing)

**K4B1G-V3-1. Ayam Asep**

1. Asep punya 12 ayam. *(papan: 12 ayam)*
2. Tiap ayam makan 3 mangkok sehari. *(papan: ×3)*
3. 12 kali 3 sama dengan 36. *(papan: 36)*
4. Itulah mangkok yang disiapkan. *(papan: mangkok)*

**K4B1G-V3-2. Rak buku**

1. Dua rak berisi 45 buku. *(papan: 2 rak)*
2. 2 kali 45 sama dengan 90. *(papan: ×45)*
3. Perpustakaan punya 90 buku. *(papan: 90)*
4. Perkalian menjawab cerita. *(papan: buku)*

**K4B1G-V3-3. Pensil koperasi**

1. 8 pak pensil, tiap pak 12 batang. *(papan: 8 pak)*
2. 12 kali 8 sama dengan 96. *(papan: ×12)*
3. Ada yang perlu menyimpan. *(papan: 96)*
4. Periksa lagi hasilmu. *(papan: periksa)*

## 5. Tahap 2: Mind map (peta pikiran)

**1. Array** 🍩 (START → 2)

Baris dan kolom benda menunjukkan perkalian.

**2. Berulang** ➕ (1 → 3)

Perkalian = penjumlahan berulang.

**3. Cara panjang** 📜 (2 → 4)

Urai puluhan + satuan, kalikan, jumlahkan.

**4. Bersusun** ⬇️ (3 → 5)

Kalikan dari satuan ke puluhan.

**5. Menyimpan** 1️⃣ (4 → 6)

Jika satuan × faktor ≥ 10, simpan ke puluhan.

**6. Contoh 14×5** 7️⃣ (5 → 7)

Hasil 70 dengan menyimpan.

**7. Cerita** 📖 (6 → 8)

Ayam, buku, kancing, kucing.

**8. Siap H** ✅ (7 → END)

Lanjut ke pembagian.

## 6. Tahap 3: Infografis

1. **ARRAY** 🍩: Array 12 kotak berisi 4 donat.
2. **48** 🔢: 12 × 4 = 48.
3. **PANJANG** 📜: Urai 12 = 10 + 2.
4. **40+8** ➕: 40 + 8 = 48.
5. **BERSUSUN** ⬇️: Kalikan satuan dulu.
6. **MENYIMPAN** 1️⃣: 4 × 5 = 20, simpan 2.
7. **70** 🎯: Hasil kelereng 70.
8. **96** ✏️: Pensil koperasi 96.
9. **CERITA** 📖: Ayam Asep 36 mangkok.
10. **SIAP H** ✅: Siap belajar pembagian.

## 7. Tahap 4: Concrete (benda nyata)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 1 | Rakit Hasil Array | `array-rakit` | hlm. 39–40 (12×4 donat) | Merakit hasil perkalian dari array. | Tiga ronde, dua soal. |
| 2 | Hitung Array Donat | `array-hitung` | hlm. 39–40 | Menghitung hasil dari array benda. | Tiga ronde. |
| 3 | Pilah: Menyimpan atau Tidak | `sort-kali` | hlm. 42 (14×5) | Memilah perkalian perlu simpan / tanpa. | Tiga ronde. |
| 4 | Jodohkan Soal dan Hasil Kali | `match-kali` | hlm. 40–42 | Menjodohkan. | Tiga ronde. |
| 5 | Memori Perkalian | `memory-kali` | hlm. 40–43 | Memori soal dan hasil. | Tiga ronde. |
| 6 | Ketuk Hasil Kali | `tap-kali` | hlm. 40–43 | Mengetuk pasangan berhasil tertentu. | Tiga ronde. |
| 7 | Ketuk Semua yang Menyimpan | `tap-all-kali` | hlm. 42 | Memilih semua yang perlu simpan. | Tiga ronde. |
| 8 | Cerita Perkalian | `story-kali` | hlm. 43 (ayam, buku, kancing, kucing) | Menyelesaikan soal cerita. | Tiga ronde. |
| 9 | Papan Hasil Kali | `board-kali` | hlm. 40–42 | Menulis hasil di papan. | Tiga ronde. |
| 10 | Urutkan Hasil Kali | `order-kali` | hlm. 43 | Mengurutkan hasil. | Tiga ronde. |

## 8. Tahap 5: Picture (diagram)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 11 | Array Titik | `array-model` | hlm. 39–40 | Membaca array titik menjadi hasil. | Tiga ronde. |
| 12 | Cara Panjang | `long-kali` | hlm. 40–41 | Memilih uraian (10+2)×4. | Tiga ronde. |
| 13 | Bersusun Pendek | `column-kali` | hlm. 41–42 | Memilih hasil bersusun. | Tiga ronde. |
| 14 | Jodohkan Array dan Hasil | `match-model-kali` | hlm. 40 | Jodohkan. | Tiga ronde. |
| 15 | Memori Array | `memory-model-kali` | hlm. 40–42 | Memori. | Tiga ronde. |
| 16 | Tabel Hasil Kali | `table-kali` | hlm. 42–43 | Isi hasil tabel. | Tiga tabel. |
| 17 | Ketuk Semua Simpan (Model) | `tap-all-kali-p` | hlm. 42 | Syarat menyimpan. | Tiga ronde. |
| 18 | Pilah Array Simpan/Tidak | `sort-kali-p` | hlm. 42 | Pilah. | Tiga ronde. |
| 19 | Langkah Menyimpan Kali | `steps-kali` | hlm. 42 | Pilih langkah benar. | Tiga ronde. |
| 20 | Penjumlahan Berulang | `repeat-add` | hlm. 39 | Mengenali penjumlahan berulang. | Tiga ronde. |

## 9. Tahap 6: Abstract (kata dan angka)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 21 | Bersusun Angka | `column-kali-q` | hlm. 41–42 | Hasil bersusun. | Tiga ronde. |
| 22 | Pilih Hasil Kali | `choose-kali` | hlm. 43 | Memilih hasil. | Tiga ronde. |
| 23 | Tulis Kali di Papan | `board-kali-q` | hlm. 42 | Menulis hasil. | Tiga ronde. |
| 24 | Uraian Panjang Angka | `long-kali-q` | hlm. 40 | Memilih uraian benar. | Tiga ronde. |
| 25 | Jodohkan Soal Kali | `match-kali-q` | hlm. 42–43 | Jodohkan. | Tiga ronde. |
| 26 | Memori Soal Kali | `memory-kali-q` | hlm. 43 | Memori. | Tiga ronde. |
| 27 | Benar atau Salah: Kali | `true-false-g` | hlm. 39–43 | Menilai pernyataan. | Dua ronde. |
| 28 | Detektif Perkalian | `detective-g` | hlm. 43 | Petunjuk → hasil. | Empat soal. |
| 29 | Peta Konsep Perkalian | `concept-g` | hlm. 40–42 | Mengisi kotak konsep. | Satu peta. |
| 30 | Cerita Angka Kali | `story-kali-q` | hlm. 43 | Soal cerita tanpa gambar. | Tiga ronde. |

## 10. Poin penting, cara, kegiatan di rumah, dan refleksi

- 🧩 **Berulang**: Perkalian adalah penjumlahan berulang.. *Suara:* Perkalian mempercepat penjumlahan berulang.
- 🔢 **Panjang**: Urai puluhan dan satuan, lalu kalikan.. *Suara:* Cara panjang mengurai dulu.
- ➡️ **Menyimpan**: Jika hasil satuan ≥ 10, simpan ke puluhan.. *Suara:* Menyimpan menjaga nilai tempat.
- 🔍 **Periksa**: Bandingkan dengan cara panjang atau penjumlahan.. *Suara:* Periksa hasil dengan cara lain.

Ringkasan suara: Empat poin penting perkalian sampai 100.

Cara menyebutkan: Ikuti langkah-langkahnya. (Berulang, Panjang, Menyimpan, Periksa)

Ayo Mencoba di rumah: Ayo Mencoba: kerjakan 12 × 8 cara bersusun di buku.

Refleksi:
- Aku memakai array.
- Aku bisa cara panjang.
- Aku menyimpan dengan benar.
- Aku menyelesaikan cerita.
