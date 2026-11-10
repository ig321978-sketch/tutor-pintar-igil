# Naskah Matematika Kelas 4 SD, Bab 1: Bilangan Cacah sampai 10.000, Sub-Bab I: Faktor dan Kelipatan

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k4b1.ts` dan `src/components/modul/data-k4b1.ts`, oleh `scripts/buat-naskah-md.mjs`. Isi mengikuti Buku Siswa Matematika Kelas IV (Kemendikbudristek, Kurikulum Merdeka, Bab 1 hlm. 4–52) Sub-Bab A–I, serta diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.

## 1. Identitas modul

- Kode bab: `k4-mat-bab1`, FASE_B, kelas 4.
- Judul: BAB 1: BILANGAN CACAH SAMPAI 10.000. Sub-Bab I: Faktor dan Kelipatan.
- Suara Guru: Web Speech API perangkat saja, laju 0.7 dan nada 1. Tanpa ElevenLabs.
- Isi: 3 video cerita (9 adegan), 8 langkah peta pikiran, 10 panel infografis, 30 permainan (10 Concrete, 10 Picture, 10 Abstract), 4 poin penting.

## 2. Tujuan belajar

Siswa menentukan faktor (pembagi habis) bilangan seperti 12, 20, 24, 48, memahami mengapa bilangan tertentu bukan faktor, serta menentukan kelipatan (hasil kali berulang) seperti kelipatan 2, 3, 5, dan 6.

- Capaian Pembelajaran: Siswa memahami faktor dan kelipatan bilangan cacah.
- Acuan: Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 1 Sub-Bab I hlm. 48–52); faktorisasi & skip counting.

## 3. Metode dari luar buku

- **Faktor = pembagi habis (sisa 0)**: daftar 12, 20, 24, 48 dari buku.
- **Pasangan faktor**: f × pasangan = n (1×12, 2×6, 3×4, …).
- **Bukan faktor**: 5 bukan faktor 12 karena sisa 2.
- **Kelipatan = skip counting / hasil kali berulang**: Karel +2, Slamet +3.
- **Rentang kelipatan**: lebih dari … dan kurang dari … (soal 5 dan 4).
- **Cerita aplikasi**: bagi beras 10 kg, kartu Andi tiap 2 hari, lampu 2 menit.

## 4. Tahap 1: Story (video cerita animasi SVG)

Tiap video diputar satu per satu saat siswa mengetuk Putar. Tidak ada yang berjalan sendiri. Kalimat dibacakan Suara Guru satu per satu (ketukan), dan gambar berubah mengikuti ketukan.

### K4B1I-V1. Faktor 12 (Pensil Pak Guru)

**K4B1I-V1-1. 12 pensil**

1. Pak Guru punya 12 pensil. *(papan: 12 pensil)*
2. Bisa dibagi ke 1, 2, 3, 4, atau 6 siswa. *(papan: bagi rata)*
3. Setiap kali habis tanpa sisa. *(papan: sisa 0)*
4. Pembagi itu disebut faktor. *(papan: faktor)*

**K4B1I-V1-2. Daftar faktor**

1. 1 kali 12, 2 kali 6, 3 kali 4. *(papan: 1×12)*
2. Juga 4 kali 3, 6 kali 2, 12 kali 1. *(papan: 2×6)*
3. Faktor 12: 1, 2, 3, 4, 6, 12. *(papan: daftar)*
4. Semua pasangan hasil kalinya 12. *(papan: pasangan)*

**K4B1I-V1-3. Bukan faktor**

1. Apakah 5 faktor 12? *(papan: 5?)*
2. 12 dibagi 5 sisanya 2. *(papan: sisa 2)*
3. Karena sisa bukan nol, 5 bukan faktor. *(papan: bukan)*
4. Ingat: faktor harus habis dibagi. *(papan: habis)*

### K4B1I-V2. Kelipatan 2 (Kelereng Karel)

**K4B1I-V2-1. Tiap hari +2**

1. Karel membeli 2 kelereng tiap hari. *(papan: +2)*
2. Hari ke-1: 2, hari ke-2: 4. *(papan: 2,4)*
3. Hari ke-3: 6, hari ke-4: 8. *(papan: 6,8)*
4. Itu kelipatan 2. *(papan: kelipatan)*

**K4B1I-V2-2. Penjumlahan berulang**

1. 8 sama dengan 2 tambah 2 tambah 2 tambah 2. *(papan: 2+2+…)*
2. Atau 4 kali 2. *(papan: 4×2)*
3. 8 adalah kelipatan 2. *(papan: 8)*
4. 2, 4, 6, 8, 10, 12, 14. *(papan: deret)*

**K4B1I-V2-3. Slamet +3**

1. Slamet menambah 3 tiap hari. *(papan: +3)*
2. 3, 6, 9, 12, 15, 18, 21. *(papan: 3,6,9)*
3. Itu kelipatan 3. *(papan: kelipatan 3)*
4. Lengkapi kotak kosongnya. *(papan: lengkapi)*

### K4B1I-V3. Latihan Faktor Kelipatan (24, 25, 5, 6)

**K4B1I-V3-1. Faktor 20**

1. Faktor 20: 1, 2, 4, 5, 10, 20. *(papan: faktor 20)*
2. 4 kali 5 sama dengan 20. *(papan: 4×5)*
3. Semua habis membagi 20. *(papan: habis)*
4. Tuliskan dengan teliti. *(papan: teliti)*

**K4B1I-V3-2. Kelipatan 5**

1. Kelipatan 5 lebih dari 17 dan kurang dari 35. *(papan: >17 <35)*
2. Yaitu 20, 25, dan 30. *(papan: 20,25,30)*
3. Lewati yang di luar rentang. *(papan: rentang)*
4. Baca soal dengan cermat. *(papan: cermat)*

**K4B1I-V3-3. Kartu Andi**

1. Andi beli 4 kartu tiap 2 hari. *(papan: 4 / 2 hari)*
2. Dalam 6 hari ada 3 kali beli. *(papan: 6 hari)*
3. 3 kali 4 sama dengan 12 kartu. *(papan: 12)*
4. Kelipatan membantu cerita. *(papan: cerita)*

## 5. Tahap 2: Mind map (peta pikiran)

**1. Faktor** ➗ (START → 2)

Pembagi yang habis (sisa 0).

**2. Pasangan** 🔗 (1 → 3)

f × pasangan = n.

**3. Bukan faktor** 🚫 (2 → 4)

Jika ada sisa, bukan faktor.

**4. Kelipatan** 📶 (3 → 5)

Hasil kali berulang / skip counting.

**5. Karel +2** 🔵 (4 → 6)

2, 4, 6, 8, … kelipatan 2.

**6. Rentang** 📏 (5 → 7)

Kelipatan dalam batas soal.

**7. Cerita** 📖 (6 → 8)

Beras 10 kg, kartu Andi, lampu.

**8. Bab selesai** ✅ (7 → END)

Siap uji kompetensi bab.

## 6. Tahap 3: Infografis

1. **FAKTOR** ➗: Faktor = pembagi habis.
2. **1–12** 📋: Faktor 12 ada 6 bilangan.
3. **BUKAN 5** 🚫: 5 bukan faktor 12.
4. **FAKTOR 20** 2️⃣: 1, 2, 4, 5, 10, 20.
5. **KELIPATAN** 📶: Hasil kali berulang.
6. **2,4,6,8** 🔵: Kelipatan 2 Karel.
7. **3,6,9,…** 🟢: Kelipatan 3.
8. **RENTANG** 📏: 20, 25, 30.
9. **CERITA** 📖: Faktor 10 = cara bagi beras.
10. **SELESAI** ✅: Siap refleksi bab.

## 7. Tahap 4: Concrete (benda nyata)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 1 | Bagi Pensil Jadi Faktor | `faktor-koleksi` | hlm. 48 (12 pensil) | Mengenali pasangan faktor dari benda. | Tiga ronde. |
| 2 | Pilih Daftar Faktor | `daftar-faktor` | hlm. 48–49 | Memilih daftar faktor benar. | Tiga ronde. |
| 3 | Pilah: Faktor atau Bukan | `sort-faktor` | hlm. 49 (mengapa 5 bukan faktor 12) | Memilah kandidat. | Tiga ronde. |
| 4 | Jodohkan Bilangan dan Faktor | `match-faktor` | hlm. 49–50 | Menjodohkan. | Tiga ronde. |
| 5 | Memori Faktor | `memory-faktor` | hlm. 49 | Memori. | Tiga ronde. |
| 6 | Ketuk Faktor yang Diminta | `tap-faktor` | hlm. 48–49 | Mengetuk faktor. | Tiga ronde. |
| 7 | Ketuk Semua Faktor | `tap-all-faktor` | hlm. 49 | Memilih semua faktor. | Tiga ronde. |
| 8 | Cerita Kelipatan | `kelipatan-cerita` | hlm. 50–52 (Karel, Andi) | Soal cerita kelipatan. | Tiga ronde. |
| 9 | Lengkapi Deret Kelipatan | `isi-kelipatan` | hlm. 50–51 | Mengisi bilangan hilang. | Tiga ronde. |
| 10 | Urutkan Kelipatan | `order-kelipatan` | hlm. 51–52 | Mengurutkan. | Tiga ronde. |

## 8. Tahap 5: Picture (diagram)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 11 | Pasangan Faktor Diagram | `faktor-pasangan` | hlm. 48–49 | Melengkapi f × ? = n. | Tiga ronde. |
| 12 | Model Array Faktor | `faktor-model` | hlm. 48 | Array baris×kolom = n. | Tiga ronde. |
| 13 | Jodohkan Model Faktor | `match-faktor-p` | hlm. 49 | Jodohkan. | Tiga ronde. |
| 14 | Memori Model Faktor | `memory-faktor-p` | hlm. 49 | Memori. | Tiga ronde. |
| 15 | Tabel Faktor | `table-faktor` | hlm. 49 | Isi pasangan. | Tiga tabel. |
| 16 | Ketuk Semua Faktor (Label) | `tap-all-faktor-p` | hlm. 49 | Ketuk semua. | Tiga ronde. |
| 17 | Pilah Label Faktor | `sort-faktor-p` | hlm. 49 | Pilah. | Tiga ronde. |
| 18 | Deret Kelipatan Gambar | `deret-kelipatan` | hlm. 50–51 | Lengkapi deret. | Tiga ronde. |
| 19 | Hari ke-n Karel | `hari-kelipatan` | hlm. 50–51 | Menghitung kelipatan hari. | Tiga ronde. |
| 20 | Mengapa Bukan Faktor | `bukan-faktor` | hlm. 49 | Memilih alasan sisa ≠ 0. | Tiga ronde. |

## 9. Tahap 6: Abstract (kata dan angka)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 21 | Pilih Daftar Faktor Angka | `pilih-faktor` | hlm. 49–50 | Memilih daftar. | Tiga ronde. |
| 22 | Pilih Kelipatan | `pilih-kelipatan` | hlm. 51–52 | Memilih bilangan kelipatan. | Tiga ronde. |
| 23 | Banyak Faktor di Papan | `board-faktor` | hlm. 49 | Menulis banyak faktor. | Tiga ronde. |
| 24 | Angka Hilang Kelipatan | `isi-hilang` | hlm. 51 | Melengkapi deret angka. | Tiga ronde. |
| 25 | Jodohkan n dan Faktor | `match-faktor-q` | hlm. 49–50 | Jodohkan. | Tiga ronde. |
| 26 | Memori n dan Faktor | `memory-faktor-q` | hlm. 49 | Memori. | Tiga ronde. |
| 27 | Benar atau Salah: Faktor | `true-false-i` | hlm. 48–52 | Menilai pernyataan. | Dua ronde. |
| 28 | Detektif Faktor Kelipatan | `detective-i` | hlm. 50–52 | Petunjuk → bilangan. | Empat soal. |
| 29 | Peta Konsep Faktor Kelipatan | `concept-i` | hlm. 48–51 | Mengisi kotak. | Satu peta. |
| 30 | Cerita Angka Faktor | `story-faktor-q` | hlm. 50–52 | Soal cerita. | Tiga ronde. |

## 10. Poin penting, cara, kegiatan di rumah, dan refleksi

- 🧩 **Faktor**: Pembagi dengan sisa 0.. *Suara:* Faktor membagi habis.
- 🔢 **Pasangan**: Dua faktor dikalikan kembali ke n.. *Suara:* Pasangan faktor berharga.
- ➡️ **Kelipatan**: Hasil kali berulang bilangan.. *Suara:* Kelipatan adalah skip counting.
- 🔍 **Cek sisa**: Sisa bukan 0 berarti bukan faktor.. *Suara:* Cek sisa sebelum memutuskan.

Ringkasan suara: Empat poin penting faktor dan kelipatan.

Cara menyebutkan: Ikuti langkah-langkahnya. (Faktor, Pasangan, Kelipatan, Cek sisa)

Ayo Mencoba di rumah: Ayo Berlatih: tulis semua faktor 24 dan kelipatan 6 kurang dari 40.

Refleksi:
- Aku daftar faktor lengkap.
- Aku tolak yang bersisa.
- Aku lanjutkan deret kelipatan.
- Aku baca batas soal.
