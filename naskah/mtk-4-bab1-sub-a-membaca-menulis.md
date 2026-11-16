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
- Acuan: Buku Siswa Matematika Kelas IV Kemendikbudristek (Bab 1 Sub-Bab A hlm. 4–11) dan kemasan bertingkat rancangan IGIL (peti, dus, bungkus, benda lepas).

## 3. Cara belajar (rancangan IGIL)

- **Kemasan bertingkat**: peti (1.000), dus (100), bungkus (10), dan benda lepas (1) untuk merakit bilangan empat angka.
- **Papan empat tempat**: ribuan ungu, ratusan hijau, puluhan biru, satuan merah. Letak angka menentukan nilainya.
- **Kartu angka**: menata empat kartu pada empat tempat.
- **Nol penjaga tempat**: nol dilewati saat disebut, tetapi tetap ditulis.
- **Sepuluh dus = satu peti**: aturan penggabungan tampak langsung saat merakit.
- Status: draf naskah orisinal IGIL. Topik dan rentang angka mengacu pada Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 4–11. Angka dan kalimat soal tidak diambil dari buku.

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

**1. Pahami soal** ❓ (Pahami soal → Kemasan bertingkat)

Baca soal pelan-pelan. Tandai bilangan yang harus disebut atau ditulis. Ucapkan ulang pertanyaannya dengan kata-katamu sendiri sebelum mulai bekerja.

**2. Kemasan bertingkat** 🧭 (Kemasan bertingkat → Papan empat tempat)

Peti bernilai seribu, dus seratus, bungkus sepuluh, dan benda lepas satu. Dengan kemasan ini, bilangan empat angka bisa dirakit dan isinya terlihat jelas.

**3. Papan empat tempat** 🛠️ (Papan empat tempat → Nol penjaga tempat)

Papan punya empat kolom berurutan. Dari kiri: ribuan, ratusan, puluhan, lalu satuan. Letak sebuah angka menentukan nilainya.

**4. Nol penjaga tempat** ✨ (Nol penjaga tempat → Kerjakan)

Tempat yang kosong diisi angka nol. Saat disebut, nol dilewati. Saat ditulis, nol harus hadir supaya angka lain tidak bergeser.

**5. Kerjakan** ✏️ (Kerjakan → Cek masuk akal)

Kerjakan satu langkah demi satu langkah. Rakit atau isi papan lebih dulu, baru sebut atau tulis bilangannya. Bila ragu, kembali ke papan.

**6. Cek masuk akal** ✅ (Cek masuk akal → Simpulkan)

Periksa hasilnya. Apakah angkanya ada empat? Apakah kata ribu sesuai dengan angka di tempat ribuan? Bila tidak, cari langkah yang meleset.

**7. Simpulkan** 💬 (Simpulkan → Main)

Rangkum dengan kata-katamu: bagaimana cara menyebut dan menulis bilangan empat angka, dan apa tugas angka nol.

**8. Main** 🎮 (Main → Latihan Concrete–Abstract)

Lanjutkan ke permainan benda berwarna, diagram, dan simbol. Ulangi sampai lancar tanpa melihat petunjuk.

## 6. Tahap 3: Infografis

1. **RIBUAN** 🟣: Angka di ujung kiri berada di tempat ribuan. Satu peti bernilai seribu.
2. **RATUSAN** 🟢: Tempat kedua dari kiri adalah ratusan. Satu dus bernilai seratus.
3. **PULUHAN** 🔵: Tempat ketiga adalah puluhan. Satu bungkus bernilai sepuluh.
4. **SATUAN** 🔴: Tempat terakhir adalah satuan. Satu benda lepas bernilai satu.
5. **BACA DARI KIRI** ⬅️: Mulai dari ribuan, lalu ratusan, puluhan, dan satuan. Contohnya lima ribu dua ratus tujuh puluh empat.
6. **NOL TIDAK DISEBUT** ⭕: Delapan ribu empat. Ratusan dan puluhannya nol, jadi tidak disebut.
7. **SERIBU** 1️⃣: Angka satu di tempat ribuan disebut seribu, bukan satu ribu.
8. **NOL MENJAGA TEMPAT** ✍️: Saat menulis, tempat yang kosong tetap diisi angka nol supaya angka lain tidak bergeser.
9. **SEPULUH DUS = SATU PETI** 🔄: Sepuluh dus digabung menjadi satu peti.
10. **SAMPAI 10.000** 🔟: Bilangan terbesar pada bab ini adalah sepuluh ribu.

## 7. Tahap 4: Concrete (benda berwarna)

| No | Permainan | Jenis | Rujukan | Tujuan | Cara main |
|---|---|---|---|---|---|
| 1 | Rakit Bilangan dari Kemasan | `build-with-exchange` | Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 4–6 (acuan topik) | Merakit bilangan empat angka dari peti, dus, bungkus, dan benda lepas. | Tiga ronde, tiap ronde dua bilangan. Sepuluh kemasan kecil otomatis menyatu menjadi satu kemasan yang lebih besar. Tekan Periksa untuk mengecek. |
| 2 | Hitung Isi Semua Kemasan | `count-packages` | Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 5–6 (acuan topik) | Menghitung isi tiap tingkat kemasan, lalu memilih angka yang sesuai. | Tiga ronde, dua soal. Pilih satu dari tiga angka. |
| 3 | Masukkan Kemasan ke Kotak Nilai | `sort-packages` | Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 5–6 (acuan topik) | Memilah kelompok kemasan ke kotak ribuan, ratusan, puluhan, atau satuan. | Tiga ronde, enam kelompok, empat kotak. |
| 4 | Pasangkan Kumpulan dengan Angka | `match-package-number` | Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 6 (acuan topik) | Memasangkan kumpulan kemasan dengan angka yang sesuai. | Tiga ronde, tiga pasangan. |
| 5 | Balik Kartu: Kumpulan dan Angka | `memory-package-number` | Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 6–11 (acuan topik) | Mengingat letak kartu kumpulan dan kartu angka yang sama. | Tiga ronde, empat pasang kartu. |
| 6 | Ketuk Kumpulan yang Disebut | `tap-read-package` | Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 6 (acuan topik) | Mendengar sebuah bilangan, lalu mengetuk kumpulan yang sesuai. | Tiga ronde, tiga kumpulan yang mirip. |
| 7 | Ketuk Semua yang Sesuai Perintah | `tap-all-packages` | Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 9–11 (acuan topik) | Menemukan semua kumpulan yang memenuhi perintah tentang angka nol. | Tiga ronde, empat kumpulan. |
| 8 | Pilih Bacaan Kumpulan | `read-package-words` | Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 6–9 (acuan topik) | Memilih cara menyebut bilangan dari kumpulan kemasan. | Tiga ronde, dua soal. |
| 9 | Isi Papan dari Kumpulan | `board-from-package` | Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 6 (acuan topik) | Mengisi papan empat tempat berdasarkan kumpulan kemasan. | Tiga ronde, dua soal. |
| 10 | Gabungkan Sepuluh Jadi Satu | `exchange-packages` | Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 5–6 (acuan topik) | Memahami bahwa sepuluh kemasan kecil dapat digabung menjadi satu kemasan besar. | Tiga ronde, dua soal pilihan. |

## 8. Tahap 5: Picture (diagram)

| No | Permainan | Jenis | Rujukan | Tujuan | Cara main |
|---|---|---|---|---|---|
| 11 | Baca Bilangan dari Blok | `count-blocks` | Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 6 (acuan topik) | Membaca gambar blok menjadi angka empat tempat. | Tiga ronde, dua soal. |
| 12 | Isi Papan dari Gambar Blok | `board-from-blocks` | Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 6 dan 14 (acuan topik) | Mengisi papan empat tempat dari gambar blok. | Tiga ronde, dua soal. |
| 13 | Lengkapi Tabel dari Blok | `fill-block-table` | Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 16 (acuan topik) | Mengisi tabel empat kolom dari gambar blok. | Tiga tabel, tiga baris. |
| 14 | Pasangkan Blok dengan Angka | `match-block-number` | Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 6 (acuan topik) | Memasangkan gambar blok dengan angka yang sesuai. | Tiga ronde, tiga pasangan. |
| 15 | Balik Kartu: Blok dan Kata | `memory-block-word` | Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 6–9 (acuan topik) | Mengingat pasangan gambar blok dan kata bilangan. | Tiga ronde, empat pasang kartu. |
| 16 | Ketuk Blok yang Disebut | `tap-block-read` | Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 6–9 (acuan topik) | Mengetuk gambar blok yang sesuai dengan bilangan yang disebut. | Tiga ronde, dua pertanyaan. |
| 17 | Cari Bilangan pada Garis | `number-line-read` | Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 4–11 (acuan topik) | Menemukan bilangan yang disebutkan pada garis bilangan. | Tiga ronde, dua soal. |
| 18 | Ketuk Semua Blok yang Sesuai | `tap-all-blocks` | Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 9–11 (acuan topik) | Memilih semua gambar blok yang memenuhi syarat angka. | Tiga ronde, empat gambar. |
| 19 | Kelompokkan: Ada Nol atau Tidak | `sort-zero-blocks` | Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 6–9 (acuan topik) | Mengelompokkan gambar blok menurut ada atau tidaknya angka nol. | Tiga ronde, enam gambar. |
| 20 | Lengkapi Kalimat tentang Blok | `complete-block-sentence` | Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 6–14 (acuan topik) | Melengkapi kalimat tentang tempat dan nilai angka dari gambar blok. | Tiga gambar, tiga kalimat. |

## 9. Tahap 6: Abstract (kata dan angka)

| No | Permainan | Jenis | Rujukan | Tujuan | Cara main |
|---|---|---|---|---|---|
| 21 | Tata Kartu Angka | `compose-four-cards` | Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 5–8 (acuan topik) | Menuliskan bilangan dari kata dengan menata empat kartu angka. | Tiga ronde, dua soal. |
| 22 | Pilih Bacaan yang Tepat | `read-number-choice` | Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 6–9 (acuan topik) | Memilih cara menyebut sebuah bilangan empat angka. | Tiga ronde, dua soal. |
| 23 | Tulis Angka pada Papan | `write-on-board` | Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 7–9 (acuan topik) | Menuliskan bilangan dari kata ke papan empat tempat. | Tiga ronde, dua soal. |
| 24 | Pasangkan Angka dengan Bacaan | `match-number-word` | Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 11 (acuan topik) | Memasangkan angka dengan bacaannya. | Tiga ronde, tiga pasang. |
| 25 | Balik Kartu: Angka dan Kata | `memory-number-word` | Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 11 (acuan topik) | Mengingat letak kartu angka dan kartu kata yang sama. | Tiga ronde, empat pasang kartu. |
| 26 | Lengkapi Tabel Bacaan | `fill-reading-table` | Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 11 (acuan topik) | Melengkapi tabel yang memasangkan bilangan dengan bacaannya. | Tiga tabel, empat baris. |
| 27 | Benar atau Salah | `true-false-reading` | Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 4–11 (acuan topik) | Menilai pernyataan tentang cara menyebut dan menulis bilangan. | Dua ronde, lima pernyataan. |
| 28 | Tebak Bilangan Rahasia | `detective-number` | Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 8–11 (acuan topik) | Menemukan bilangan rahasia dari dua petunjuk. | Empat soal. |
| 29 | Ketuk Semua Angka yang Sesuai | `select-all-numbers` | Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 9–11 (acuan topik) | Memilih bilangan yang memenuhi syarat tentang angka pada tempat tertentu. | Tiga ronde, empat bilangan. |
| 30 | Rangkai Kalimat Bilangan | `build-number-sentence` | Buku Siswa Matematika Kelas IV, Bab 1 Sub-Bab A, hlm. 6–9 (acuan topik) | Merangkai kata menjadi kalimat yang benar tentang bilangan. | Empat kalimat. |

## 10. Poin penting, cara, kegiatan di rumah, dan refleksi

- 🟣 **Empat tempat**: ribuan, ratusan, puluhan, satuan *Suara:* Bilangan empat angka punya empat tempat, dari kiri ke kanan: ribuan, ratusan, puluhan, dan satuan.
- 📦 **Kemasan bertingkat**: Peti seribu, dus seratus, bungkus sepuluh, benda lepas satu. *Suara:* Kemasan bertingkat. Peti seribu, dus seratus, bungkus sepuluh, dan benda lepas satu.
- 🗂️ **Papan empat tempat**: Letak sebuah angka menentukan nilainya. *Suara:* Papan empat tempat. Letak sebuah angka menentukan nilainya.
- ⭕ **Nol penjaga tempat**: Nol dilewati saat disebut, tetapi tetap ditulis. *Suara:* Nol penjaga tempat. Nol dilewati saat disebut, tetapi tetap ditulis.

Ringkasan suara: Ingat: kemasan bertingkat, papan empat tempat, dan nol penjaga tempat.

Cara menyebutkan: Cara menyebutnya: mulai dari ribuan, turun ke ratusan, puluhan, lalu satuan. Tempat yang bernilai nol dilewati. (ribuan, ratusan, puluhan, lewati nol)

Ayo Mencoba: susun lima bilangan empat angka sesukamu pada papan di layar, lalu sebutkan satu per satu.

Refleksi:
- Tempat mana yang paling sering membuatmu ragu?
- Mengapa nol tetap ditulis walau tidak disebut?
- Apa yang kamu lakukan saat sebuah bilangan punya nol di tengah?
