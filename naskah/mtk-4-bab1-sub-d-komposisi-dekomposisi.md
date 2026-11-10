# Naskah Matematika Kelas 4 SD, Bab 1: Bilangan Cacah sampai 10.000, Sub-Bab D: Komposisi dan Dekomposisi Bilangan Cacah sampai 10.000

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k4b1.ts` dan `src/components/modul/data-k4b1.ts`, oleh `scripts/buat-naskah-md.mjs`. Isi mengikuti Buku Siswa Matematika Kelas IV (Kemendikbudristek, Kurikulum Merdeka, Bab 1 hlm. 4–37) Sub-Bab A–F, serta diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.

## 1. Identitas modul

- Kode bab: `k4-mat-bab1`, FASE_B, kelas 4.
- Judul: BAB 1: BILANGAN CACAH SAMPAI 10.000. Sub-Bab D: Komposisi dan Dekomposisi Bilangan Cacah sampai 10.000.
- Suara Guru: Web Speech API perangkat saja, laju 0.7 dan nada 1. Tanpa ElevenLabs.
- Isi: 3 video cerita (9 adegan), 8 langkah peta pikiran, 10 panel infografis, 30 permainan (10 Concrete, 10 Picture, 10 Abstract), 4 poin penting.

## 2. Tujuan belajar

Siswa menyusun bilangan empat angka dari nilai tempat (komposisi) dan mengurai bilangan menjadi nilai tempat (dekomposisi), termasuk contoh uang Helen Rp7.300 dan Rp10.000.

- Capaian Pembelajaran: Siswa menyusun dan mengurai bilangan cacah sampai 10.000 menurut nilai tempat.
- Acuan: Buku Siswa Matematika Kelas IV Bab 1 Sub-Bab D hlm. 24–28; expanded form / place-value composition.

## 3. Metode dari luar buku

- **Komposisi / expanded form**: 6.348 = 6.000 + 300 + 40 + 8 disusun dari nilai tempat.
- **Dekomposisi fleksibel**: satu bilangan bisa diurai lebih dari satu cara (mis. 3.000 + 35 vs 2.000 + 1.035).
- **Cek balik komposisi**: jumlahkan semua suku uraian untuk memastikan sama dengan bilangan semula.
- **Uang Helen (buku)**: komposisi nilai uang empat digit sebagai konteks nyata.
- **Nol dalam uraian**: suku bernilai 0 tetap menjaga tempat saat disusun kembali.
- **Kartu nilai tempat**: menjodohkan lambang dengan uraian dan sebaliknya.

## 4. Tahap 1: Story (video cerita animasi SVG)

Tiap video diputar satu per satu saat siswa mengetuk Putar. Tidak ada yang berjalan sendiri. Kalimat dibacakan Suara Guru satu per satu (ketukan), dan gambar berubah mengikuti ketukan.

### K4B1D-V1. Menyusun 6.348 (Komposisi)

**K4B1D-V1-1. Empat angka tempat**

1. Angka 6 di ribuan, 3 di ratusan, 4 di puluhan, 8 di satuan. *(papan: 6 rb 3 rt 4 pl 8 st)*
2. Nilainya 6.000, 300, 40, dan 8. *(papan: 6.000+300+40+8)*
3. Jumlahkan nilai tempatnya. *(papan: jumlahkan)*
4. Terbentuk bilangan 6.348. *(papan: 6.348)*

**K4B1D-V1-2. Latihan mengisi**

1. Isi titik-titik pada tabel ribuan sampai satuan. *(papan: tabel digit)*
2. 6 4 8 2 menjadi enam ribu empat ratus delapan puluh dua. *(papan: 6.482)*
3. 6 0 4 0: ratusan dan satuan nol. *(papan: 6.040)*
4. Nol tetap ditulis agar tempatnya benar. *(papan: nol menjaga)*

**K4B1D-V1-3. Siap mengurai**

1. Komposisi menyusun dari bagian. *(papan: komposisi)*
2. Dekomposisi mengurai ke bagian. *(papan: dekomposisi)*
3. Keduanya saling membalik. *(papan: saling balik)*
4. Ayo lanjut mengurai bilangan. *(papan: lanjut)*

### K4B1D-V2. Mengurai 6.849 (Dekomposisi)

**K4B1D-V2-1. Buka 6.849**

1. Lihat bilangan 6.849. *(papan: 6.849)*
2. Tulis di papan empat kolom. *(papan: papan)*
3. Baca nilai tiap tempat. *(papan: nilai tempat)*
4. 6.000 + 800 + 40 + 9. *(papan: uraian)*

**K4B1D-V2-2. 6.035 dengan nol**

1. Bilangan 6.035 punya ratusan nol. *(papan: 6.035)*
2. Uraian: 6.000 + 0 + 30 + 5. *(papan: 0 ratusan)*
3. Nol tidak dibuang. *(papan: 6.000+0+30+5)*
4. Nol menjaga tempat ratusan. *(papan: nol tetap)*

**K4B1D-V2-3. Uang Helen**

1. Helen punya pecahan uang di warung. *(papan: warung)*
2. Slamet beli seharga 7.300. *(papan: Rp7.300)*
3. Uraikan 7.300 dari pecahan Helen. *(papan: pecahan)*
4. Uraikan juga 10.000. *(papan: Rp10.000)*

### K4B1D-V3. Komposisi ↔ Dekomposisi (Dua arah)

**K4B1D-V3-1. Dua arah sama**

1. Dari bagian ke bilangan: komposisi. *(papan: bagian→bilangan)*
2. Dari bilangan ke bagian: dekomposisi. *(papan: bilangan→bagian)*
3. Hasilnya harus saling cocok. *(papan: cocok)*
4. Periksa dengan menjumlahkan uraian. *(papan: periksa)*

**K4B1D-V3-2. Contoh 7.020**

1. 7.020 = 7 ribuan + 0 + 2 puluhan + 0. *(papan: 7.020)*
2. Ditulis 7.000 + 0 + 20 + 0. *(papan: 7 ribuan)*
3. Puluhan dua puluh. *(papan: 20)*
4. Satuan nol tidak dibaca. *(papan: satuan 0)*

**K4B1D-V3-3. Siap bermain**

1. Kita sudah menyusun dan mengurai. *(papan: siap)*
2. Saatnya bermain di tahap benda, gambar, dan angka. *(papan: Concrete)*
3. Ingat: nol menjaga tempat. *(papan: Picture)*
4. Ayo mulai. *(papan: Abstract)*

## 5. Tahap 2: Mind map (peta pikiran)

**1. Komposisi** 🧩 (START → 2)

Menyusun bilangan dari nilai tempat.

**2. Nilai tempat** 📍 (1 → 3)

Ribuan, ratusan, puluhan, satuan.

**3. Jumlahkan nilai** ➕ (2 → 4)

6.000+300+40+8=6.348.

**4. Dekomposisi** 🔓 (3 → 5)

Mengurai bilangan ke nilai tempat.

**5. Nol menjaga** 0️⃣ (4 → 6)

0 tetap ditulis di uraian.

**6. Saling balik** 🔄 (5 → 7)

Susun dan urai saling memeriksa.

**7. Uang Helen** 💰 (6 → 8)

Uraikan 7.300 dan 10.000.

**8. Siap lanjut** ✅ (7 → END)

Lanjut penjumlahan Sub-Bab E.

## 6. Tahap 3: Infografis

1. **KOMPOSISI** 🧩: Komposisi artinya menyusun bilangan dari nilai tempat.
2. **6.348** 6️⃣: Enam ribuan ditambah tiga ratusan, empat puluhan, delapan satuan.
3. **DEKOMPOSISI** 🔓: Dekomposisi artinya mengurai bilangan ke nilai tempat.
4. **6.849** 8️⃣: Enam ribu delapan ratus empat puluh sembilan diurai 6.000 + 800 + 40 + 9.
5. **NOL** 0️⃣: Pada 6.035, nol ratusan tetap ditulis.
6. **7.020** 7️⃣: Tujuh ribuan dan dua puluhan, ratusan serta satuan nol.
7. **9.999** 9️⃣: Semua tempat terisi sembilan.
8. **UANG** 💰: Uraikan tujuh ribu tiga ratus rupiah dari pecahan Helen.
9. **SALING BALIK** 🔄: Jumlahkan uraian untuk memeriksa dekomposisi.
10. **SIAP E** ✅: Siap lanjut ke penjumlahan sampai seribu.

## 7. Tahap 4: Concrete (benda nyata)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 1 | Susun dari Nilai Tempat | `compose-place` | hlm. 24–25 (6.348) | Menyusun bilangan dari ribuan–satuan. | Tiga ronde, dua bilangan. Rakit peti sampai satuan. |
| 2 | Uraikan Kumpulan Empat Tempat | `decompose-package` | hlm. 26–27 (6.849) | Mengurai kumpulan menjadi nilai tempat. | Tiga ronde, dua soal. Pilih uraian. |
| 3 | Papan Komposisi | `board-compose` | hlm. 25 | Mengisi papan dari uraian kata. | Tiga ronde, dua soal. |
| 4 | Jodohkan Uraian dan Bilangan | `match-compose` | hlm. 25–27 | Menjodohkan uraian dengan lambang. | Tiga ronde, tiga pasangan. |
| 5 | Memori Nilai Tempat | `memory-compose` | hlm. 25 | Memori nilai 6.000, 300, 40, 8. | Tiga ronde, empat pasang. |
| 6 | Ketuk Bilangan dari Uraian | `tap-compose` | hlm. 25–27 | Mendengar uraian lalu mengetuk bilangan. | Tiga ronde. |
| 7 | Ketuk Semua Syarat Komposisi | `tap-all-compose` | hlm. 27 | Memilih bilangan sesuai syarat digit. | Tiga ronde. |
| 8 | Uraikan Uang Helen | `money-compose` | hlm. 28 (Rp7.300 dan Rp10.000) | Mengurai uang dari pecahan. | Tiga soal uang. |
| 9 | Isi Tabel Komposisi | `fill-table-compose` | hlm. 25 | Mengisi digit tabel dari bilangan. | Tiga tabel. |
| 10 | Pilah: Ada Nol atau Penuh | `sort-compose` | hlm. 27 (6.035) | Memilah bilangan ada nol / penuh. | Tiga ronde, enam bilangan. |

## 8. Tahap 5: Picture (diagram)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 11 | Susun dari Blok | `compose-blocks` | hlm. 25–26 | Membaca model menjadi bilangan. | Tiga ronde, dua soal. |
| 12 | Uraikan Model Blok | `decompose-blocks` | hlm. 26–27 | Memilih uraian dari model. | Tiga ronde. |
| 13 | Papan dari Blok D | `board-blocks-d` | hlm. 25 | Isi papan dari blok. | Tiga ronde. |
| 14 | Tabel dari Blok D | `table-blocks-d` | hlm. 25 | Isi tabel digit. | Tiga tabel. |
| 15 | Jodohkan Blok dan Uraian | `match-blocks-d` | hlm. 26 | Model dengan uraian. | Tiga ronde. |
| 16 | Memori Blok dan Bilangan | `memory-blocks-d` | hlm. 25–27 | Memori model dan lambang. | Tiga ronde. |
| 17 | Ketuk Blok dari Uraian | `tap-blocks-d` | hlm. 26 | Ketuk model sesuai uraian. | Tiga ronde. |
| 18 | Ketuk Semua Blok D | `tap-all-blocks-d` | hlm. 27 | Syarit digit pada model. | Tiga ronde. |
| 19 | Pilah Blok menurut Nol | `sort-blocks-d` | hlm. 27 | Ada nol / tanpa nol. | Tiga ronde. |
| 20 | Lengkapi Kalimat Uraian | `sentence-blocks-d` | hlm. 25–27 | Melengkapi kalimat uraian. | Tiga model. |

## 9. Tahap 6: Abstract (kata dan angka)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 21 | Susun Empat Kartu dari Uraian | `compose-cards` | hlm. 25 | Menulis lambang dari uraian. | Tiga ronde. |
| 22 | Pilih Uraian Angka | `choose-expand` | hlm. 26–27 | Memilih uraian benar. | Tiga ronde. |
| 23 | Tulis di Papan dari Uraian | `board-abstract-d` | hlm. 25–27 | Menulis dari uraian ke papan. | Tiga ronde. |
| 24 | Jodohkan Angka dan Uraian | `match-abstract-d` | hlm. 25–27 | Menjodohkan. | Tiga ronde. |
| 25 | Memori Angka dan Uraian | `memory-abstract-d` | hlm. 26 | Memori. | Tiga ronde. |
| 26 | Isi Tabel Uraian | `table-abstract-d` | hlm. 27 | Melengkapi tabel. | Tiga tabel. |
| 27 | Benar atau Salah: Komposisi | `true-false-d` | hlm. 24–28 | Menilai pernyataan. | Dua ronde. |
| 28 | Detektif Komposisi | `detective-d` | hlm. 25–28 | Dua petunjuk → satu bilangan. | Empat soal. |
| 29 | Ketuk Semua: Komposisi | `select-all-d` | hlm. 27 | Syarat digit. | Tiga ronde. |
| 30 | Susun Kata Komposisi | `build-sentence-d` | hlm. 25–27 | Menyusun kalimat. | Empat kalimat. |

## 10. Poin penting, cara, kegiatan di rumah, dan refleksi

- 🧩 **Komposisi**: Susun nilai tempat menjadi satu bilangan.. *Suara:* Komposisi menyusun bilangan dari nilai tempat.
- 🔓 **Dekomposisi**: Urai bilangan menjadi nilai tempat.. *Suara:* Dekomposisi mengurai bilangan ke nilai tempat.
- 0️⃣ **Nol**: Nol tetap ditulis agar tempat benar.. *Suara:* Nol menjaga tempat yang kosong.
- 🔍 **Periksa**: Jumlahkan uraian untuk memeriksa.. *Suara:* Jumlahkan semua nilai tempat untuk memeriksa.

Ringkasan suara: Empat poin penting komposisi dan dekomposisi.

Cara menyebutkan: Ikuti langkah-langkahnya. (baca digit, tulis nilai, jumlah/urai, periksa)

Ayo Mencoba di rumah: Ayo Mencoba: uraikan empat harga di warung, lalu susun kembali.

Refleksi:
- Aku menyusun dari nilai tempat.
- Aku mengurai bilangan.
- Aku menjaga nol.
- Aku memeriksa dengan menjumlahkan.
