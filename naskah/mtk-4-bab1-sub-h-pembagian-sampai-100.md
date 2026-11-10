# Naskah Matematika Kelas 4 SD, Bab 1: Bilangan Cacah sampai 10.000, Sub-Bab H: Pembagian Bilangan Cacah Sampai 100

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k4b1.ts` dan `src/components/modul/data-k4b1.ts`, oleh `scripts/buat-naskah-md.mjs`. Isi mengikuti Buku Siswa Matematika Kelas IV (Kemendikbudristek, Kurikulum Merdeka, Bab 1 hlm. 4–52) Sub-Bab A–I, serta diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.

## 1. Identitas modul

- Kode bab: `k4-mat-bab1`, FASE_B, kelas 4.
- Judul: BAB 1: BILANGAN CACAH SAMPAI 10.000. Sub-Bab H: Pembagian Bilangan Cacah Sampai 100.
- Suara Guru: Web Speech API perangkat saja, laju 0.7 dan nada 1. Tanpa ElevenLabs.
- Isi: 3 video cerita (9 adegan), 8 langkah peta pikiran, 10 panel infografis, 30 permainan (10 Concrete, 10 Picture, 10 Abstract), 4 poin penting.

## 2. Tujuan belajar

Siswa membagi bilangan cacah sampai 100 secara sama banyak (permen 48 : 4), memakai pembagian bersusun dari puluhan ke satuan, mengenali sisa 0, dan menyelesaikan soal cerita.

- Capaian Pembelajaran: Siswa melakukan operasi hitung bilangan cacah. Pada sub-bab ini fokus pembagian sampai 100.
- Acuan: Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 1 Sub-Bab H hlm. 44–47); fair sharing & long division.

## 3. Metode dari luar buku

- **Fair sharing**: 48 permen ke 4 wadah sama banyak.
- **Pembagian bersusun dari puluhan**: 48:4 → 4:4=1, lalu 8:4=2.
- **Sisa 0 = habis dibagi**: kriteria penting sebelum faktor.
- **Cek balik perkalian**: hasil × pembagi = yang dibagi.
- **Tabel percobaan wadah**: 2, 3, 4, 6, 8 wadah untuk 48 permen.
- **Cerita buku**: Tono-Tini, alpukat, kotak kue, telur, gantungan kunci.

## 4. Tahap 1: Story (video cerita animasi SVG)

Tiap video diputar satu per satu saat siswa mengetuk Putar. Tidak ada yang berjalan sendiri. Kalimat dibacakan Suara Guru satu per satu (ketukan), dan gambar berubah mengikuti ketukan.

### K4B1H-V1. Permen Pak Wicak (Bagi sama banyak)

**K4B1H-V1-1. 48 permen**

1. Pak Wicak punya 48 permen. *(papan: 48)*
2. Dibagi ke Andi, Azizah, Drio, dan Candra. *(papan: 4 anak)*
3. Empat anak mendapat bagian sama. *(papan: sama banyak)*
4. Berapa masing-masing? *(papan: berapa?)*

**K4B1H-V1-2. Aktivitas wadah**

1. Siapkan 4 wadah. *(papan: 4 wadah)*
2. Masukkan permen bergiliran. *(papan: bergilir)*
3. Tiap wadah mendapat 12. *(papan: 12)*
4. Sisa nol, habis dibagi. *(papan: sisa 0)*

**K4B1H-V1-3. Tabel percobaan**

1. Coba juga 2, 3, 6, atau 8 wadah. *(papan: tabel)*
2. Catat isi tiap wadah dan sisanya. *(papan: isi)*
3. Beberapa pembagi habis, ada yang bersisa. *(papan: sisa)*
4. Pengamatan membantu memahami. *(papan: paham)*

### K4B1H-V2. Bersusun 48 : 4 (Dari puluhan ke satuan)

**K4B1H-V2-1. Mulai puluhan**

1. Tulis 48 dibagi 4. *(papan: 48:4)*
2. 4 dibagi 4 sama dengan 1. *(papan: 4:4=1)*
3. Letakkan 1 di hasil bagi puluhan. *(papan: hasil 1…)*
4. Kurangkan, turunukan 8. *(papan: turun 8)*

**K4B1H-V2-2. Satuan**

1. 8 dibagi 4 sama dengan 2. *(papan: 8:4=2)*
2. Letakkan 2 di satuan hasil bagi. *(papan: hasil 12)*
3. 2 kali 4 sama dengan 8. *(papan: 2×4=8)*
4. Sisa 0. *(papan: sisa 0)*

**K4B1H-V2-3. Arti hasil**

1. Hasil bagi 12. *(papan: 12)*
2. Tiap anak 12 permen. *(papan: tiap anak)*
3. Periksa: 12 kali 4 sama dengan 48. *(papan: 12×4)*
4. Pembagian kebalikan perkalian. *(papan: kebalikan)*

### K4B1H-V3. Cerita Bagi (Permen, alpukat, kue)

**K4B1H-V3-1. Tono dan Tini**

1. 36 permen dibagi 2 anak. *(papan: 36:2)*
2. 36 dibagi 2 sama dengan 18. *(papan: 18)*
3. Tini mendapat 18. *(papan: Tini)*
4. Sama banyak. *(papan: sama)*

**K4B1H-V3-2. Kotak kue**

1. 81 kue, tiap kotak 3 kue. *(papan: 81:3)*
2. 81 dibagi 3 sama dengan 27. *(papan: 27)*
3. Ibu menyiapkan 27 kotak. *(papan: kotak)*
4. Habis dibagi. *(papan: habis)*

**K4B1H-V3-3. Gantungan kunci**

1. 55 gantungan dibagi 5 teman. *(papan: 55:5)*
2. 55 dibagi 5 sama dengan 11. *(papan: 11)*
3. Asep mendapat 11. *(papan: Asep)*
4. Periksa dengan perkalian. *(papan: periksa)*

## 5. Tahap 2: Mind map (peta pikiran)

**1. Sama banyak** 🍬 (START → 2)

Membagi koleksi ke kelompok sama.

**2. Wadah** 🥣 (1 → 3)

Aktivitas memasukkan bergiliran.

**3. Bersusun** ⬇️ (2 → 4)

Mulai dari puluhan ke satuan.

**4. Hasil bagi** 1️⃣ (3 → 5)

Angka di atas garis pembagian.

**5. Sisa 0** 0️⃣ (4 → 6)

Habis dibagi bila sisa nol.

**6. Periksa** 🔍 (5 → 7)

Hasil × pembagi = yang dibagi.

**7. Cerita** 📖 (6 → 8)

Permen, kue, telur, gantungan.

**8. Siap I** ✅ (7 → END)

Lanjut faktor dan kelipatan.

## 6. Tahap 3: Infografis

1. **SAMA BANYAK** 🍬: 48 permen untuk 4 anak.
2. **12** 🎯: 48 : 4 = 12.
3. **PULUHAN DULU** ⬇️: Mulai dari nilai terbesar.
4. **SATUAN** 2️⃣: Lanjut ke satuan.
5. **SISA 0** 0️⃣: Sisa nol berarti habis.
6. **PERIKSA** 🔍: 12 × 4 = 48.
7. **36:2** 👫: Cerita Tono dan Tini.
8. **81:3** 🧁: 81 kue jadi 27 kotak.
9. **55:5** 🔑: 55 gantungan : 5.
10. **SIAP I** ✅: Siap faktor dan kelipatan.

## 7. Tahap 4: Concrete (benda nyata)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 1 | Bagi ke Wadah | `bagi-koleksi` | hlm. 44–45 (48 permen) | Membagi benda ke kelompok sama. | Tiga ronde. |
| 2 | Hitung Hasil Bagi | `hitung-bagi` | hlm. 45–46 | Memilih hasil pembagian. | Tiga ronde. |
| 3 | Pilah: Habis atau Bersisa | `sort-bagi` | hlm. 45 | Memilah habis dibagi / bersisa. | Tiga ronde. |
| 4 | Jodohkan Soal dan Hasil Bagi | `match-bagi` | hlm. 46–47 | Menjodohkan. | Tiga ronde. |
| 5 | Memori Pembagian | `memory-bagi` | hlm. 46–47 | Memori. | Tiga ronde. |
| 6 | Ketuk Hasil Bagi | `tap-bagi` | hlm. 46–47 | Mengetuk pasangan. | Tiga ronde. |
| 7 | Ketuk Semua yang Habis | `tap-all-bagi` | hlm. 45 | Memilih semua habis dibagi. | Tiga ronde. |
| 8 | Cerita Pembagian | `story-bagi` | hlm. 47 | Soal cerita. | Tiga ronde. |
| 9 | Papan Hasil Bagi | `board-bagi` | hlm. 46 | Menulis hasil. | Tiga ronde. |
| 10 | Urutkan Hasil Bagi | `order-bagi` | hlm. 47 | Mengurutkan. | Tiga ronde. |

## 8. Tahap 5: Picture (diagram)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 11 | Model Kelompok Sama | `group-model` | hlm. 45 | Membaca model bagi. | Tiga ronde. |
| 12 | Langkah Bersusun | `long-bagi` | hlm. 46 | Memilih langkah benar. | Tiga ronde. |
| 13 | Bersusun di Layar | `column-bagi` | hlm. 46 | Memilih hasil bersusun. | Tiga ronde. |
| 14 | Jodohkan Model dan Hasil | `match-model-bagi` | hlm. 46 | Jodohkan. | Tiga ronde. |
| 15 | Memori Model Bagi | `memory-model-bagi` | hlm. 46 | Memori. | Tiga ronde. |
| 16 | Tabel Hasil Bagi | `table-bagi` | hlm. 45–47 | Isi tabel. | Tiga tabel. |
| 17 | Ketuk Semua Habis (Model) | `tap-all-bagi-p` | hlm. 45 | Syarat habis. | Tiga ronde. |
| 18 | Pilah Model Habis/Sisa | `sort-bagi-p` | hlm. 45 | Pilah. | Tiga ronde. |
| 19 | Periksa dengan Kali | `check-bagi` | hlm. 46 | Hasil × pembagi = yang dibagi. | Tiga ronde. |
| 20 | Ada Sisa atau Tidak | `sisa-model` | hlm. 45 | Mengenali sisa. | Tiga ronde. |

## 9. Tahap 6: Abstract (kata dan angka)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 21 | Bersusun Angka Bagi | `column-bagi-q` | hlm. 46–47 | Hasil bersusun. | Tiga ronde. |
| 22 | Pilih Hasil Bagi | `choose-bagi` | hlm. 47 | Memilih hasil. | Tiga ronde. |
| 23 | Tulis Bagi di Papan | `board-bagi-q` | hlm. 46 | Menulis hasil. | Tiga ronde. |
| 24 | Langkah Puluhan ke Satuan | `steps-bagi-q` | hlm. 46 | Pilih langkah. | Tiga ronde. |
| 25 | Jodohkan Soal Bagi | `match-bagi-q` | hlm. 47 | Jodohkan. | Tiga ronde. |
| 26 | Memori Soal Bagi | `memory-bagi-q` | hlm. 47 | Memori. | Tiga ronde. |
| 27 | Benar atau Salah: Bagi | `true-false-h` | hlm. 44–47 | Menilai pernyataan. | Dua ronde. |
| 28 | Detektif Pembagian | `detective-h` | hlm. 47 | Petunjuk → hasil. | Empat soal. |
| 29 | Peta Konsep Pembagian | `concept-h` | hlm. 45–46 | Mengisi kotak. | Satu peta. |
| 30 | Cerita Angka Bagi | `story-bagi-q` | hlm. 47 | Soal cerita. | Tiga ronde. |

## 10. Poin penting, cara, kegiatan di rumah, dan refleksi

- 🧩 **Sama banyak**: Pembagian membagi koleksi rata.. *Suara:* Bagagian adalah bagi sama banyak.
- 🔢 **Dari puluhan**: Bersusun mulai nilai tempat terbesar.. *Suara:* Mulai dari puluhan, lalu satuan.
- ➡️ **Sisa**: Sisa 0 berarti habis dibagi.. *Suara:* Sisa nol penting.
- 🔍 **Periksa**: Hasil kali pembagi harus kembali.. *Suara:* Periksa dengan perkalian.

Ringkasan suara: Empat poin penting pembagian sampai 100.

Cara menyebutkan: Ikuti langkah-langkahnya. (Sama banyak, Dari puluhan, Sisa, Periksa)

Ayo Mencoba di rumah: Ayo Berlatih: kerjakan 96 : 3 cara bersusun.

Refleksi:
- Aku membagi sama banyak.
- Aku bersusun dari puluhan.
- Aku cek sisa nol.
- Aku memeriksa dengan kali.
