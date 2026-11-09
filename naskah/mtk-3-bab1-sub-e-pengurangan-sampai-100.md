# Naskah Matematika Kelas 3 SD, Bab 1: Bilangan Cacah sampai 1.000, Sub-Bab E: Pengurangan Bilangan Cacah sampai 100

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k3b1.ts` dan `src/components/modul/data-k3b1.ts`, oleh `scripts/buat-naskah-md.mjs`. Isi mengikuti Buku Siswa Matematika Kelas III (Kemendikbudristek, Kurikulum Merdeka, Bab 1 hlm. 3–45) dan Buku Panduan Guru Bab 1, serta diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.

## 1. Identitas modul

- Kode bab: `k3-mat-bab1`, FASE_B, kelas 3.
- Judul: BAB 1: BILANGAN CACAH SAMPAI 1.000. Sub-Bab E: Pengurangan Bilangan Cacah sampai 100.
- Suara Guru: Web Speech API perangkat saja, laju 0.7 dan nada 1. Tanpa ElevenLabs.
- Isi: 3 video cerita (9 adegan), 8 langkah peta pikiran, 10 panel infografis, 30 permainan (10 Concrete, 10 Picture, 10 Abstract), 5 poin penting.

## 2. Tujuan belajar

Siswa mengurangkan dua bilangan cacah sampai 100 dengan cara susun pendek (tanpa dan dengan mengambil satu puluhan) dan cara susun panjang (menguraikan puluhan dan satuan), memahami bahwa satu puluhan dapat ditukar menjadi sepuluh satuan, memeriksa hasil dengan penjumlahan, serta menyelesaikan soal cerita pengurangan.

- Capaian Pembelajaran: Siswa melakukan operasi penjumlahan dan pengurangan bilangan cacah sampai 100. Pada sub-bab ini siswa mengurangkan dua bilangan cacah sampai 100 dengan susun pendek dan susun panjang, tanpa dan dengan mengambil satu puluhan.
- Acuan: Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 1: Bilangan Cacah sampai 1.000, Sub-Bab E hlm. 46–57) dan Buku Panduan Guru Bab 1 Topik E.

## 3. Metode dari luar buku

- **Menukar satu puluhan menjadi sepuluh satuan**: bila benda lepas tidak cukup, satu bungkus dibuka menjadi sepuluh benda. Permainan Rakit Sisa dan Hitung Sisa memakai penukaran ini agar aturan mengambil terlihat langsung.
- **Susun pendek dan susun panjang pengurangan**: dua cara yang sama-sama dipakai di buku. Susun panjang menguraikan bilangan (45 = 30 + 15), susun pendek menuliskannya ke bawah dengan angka pinjaman merah.
- **Pilah soal mengambil dan tanpa mengambil**: siswa memeriksa satuan dulu. Bila satuan atas lebih kecil dari satuan bawah, soal itu perlu mengambil satu puluhan.
- **Memeriksa dengan penjumlahan (operasi kebalikan)**: hasil pengurangan ditambah bilangan pengurang harus sama dengan bilangan awal (26 + 19 = 45). Metode ini dipakai di video, poin penting, dan Peta Konsep.
- **Pengecoh dari kesalahan umum**: pilihan jawaban sengaja memuat hasil lupa mengambil (lebih sepuluh) dan salah mengambil (kurang sepuluh).
- **Soal cerita sisa dan selisih**: Ayo Berlatih 4 dipakai langsung. Selisih dua banyak benda juga dicari dengan pengurangan.

## 4. Tahap 1: Story (video cerita animasi SVG)

Tiap video diputar satu per satu saat siswa mengetuk Putar. Tidak ada yang berjalan sendiri. Kalimat dibacakan Suara Guru satu per satu (ketukan), dan gambar berubah mengikuti ketukan.

### K3B1E-V1. Permen Galih (Susun pendek tanpa mengambil)

**K3B1E-V1-1. Berapa sisa permen**

1. Galih memiliki 25 permen di dalam satu kaleng plastik. *(papan: Galih punya 25 permen)*
2. Alfa diminta mengambil 12 permen. *(papan: Alfa mengambil 12)*
3. Berapa sisa permen Galih sekarang? *(papan: Sisa permen?)*
4. Kita memakai operasi pengurangan, yaitu 25 dikurangi 12. *(papan: 25 − 12)*

**K3B1E-V1-2. Tabel nilai tempat**

1. Uraikan 25 dan 12 pada tabel nilai tempat. *(papan: Tabel puluhan dan satuan)*
2. Bilangan 25 punya 2 puluhan dan 5 satuan. Bilangan 12 punya 1 puluhan dan 2 satuan. *(papan: 5 − 2 = 3 satuan)*
3. Kurangkan satuan: 5 dikurangi 2 sama dengan 3 satuan. *(papan: 2 − 1 = 1 puluhan)*
4. Kurangkan puluhan: 2 dikurangi 1 sama dengan 1 puluhan. Hasilnya 13. *(papan: Sisa 13)*

**K3B1E-V1-3. Susun pendek**

1. Cara susun pendek: susun bilangan, puluhan lurus dengan puluhan dan satuan lurus dengan satuan. *(papan: Susun pendek)*
2. Langkah satu, susun. Langkah dua, kurangkan satuan, 5 − 2 = 3. *(papan: Satuan: 5 − 2 = 3)*
3. Langkah tiga, kurangkan puluhan, 2 − 1 = 1. *(papan: Puluhan: 2 − 1 = 1)*
4. Jadi, 25 − 12 = 13. Sisa permen Galih ada 13. *(papan: 25 − 12 = 13)*

### K3B1E-V2. Buku Tulis Pak Bandi (Susun pendek dengan mengambil)

**K3B1E-V2-1. Berapa sisa buku**

1. Pak Bandi memiliki toko yang menjual alat tulis. *(papan: Toko Pak Bandi)*
2. Di tokonya ada 45 buku tulis. Siswa SD Pelita membeli 19 buku tulis. *(papan: 45 buku, dibeli 19)*
3. Berapa sisa buku tulis di toko Pak Bandi sekarang? *(papan: Sisa buku?)*
4. Kita hitung 45 dikurangi 19. *(papan: 45 − 19)*

**K3B1E-V2-2. Mengambil satu puluhan**

1. Satuan 5 kurang dari 9, jadi 5 tidak dapat dikurangi 9. *(papan: 5 kurang dari 9)*
2. Kita mengambil 1 puluhan dari 4 puluhan. Puluhan tinggal 3. *(papan: Ambil 1 puluhan)*
3. Satu puluhan menjadi 10 satuan. 10 ditambah 5 sama dengan 15 satuan. *(papan: 4 puluhan jadi 3 puluhan)*
4. Sekarang 15 dikurangi 9 sama dengan 6. *(papan: 15 − 9 = 6)*

**K3B1E-V2-3. Puluhan dan hasil**

1. Sekarang kurangkan puluhan. Karena 1 puluhan sudah diambil, puluhan tinggal 3. *(papan: Puluhan: 3 − 1 = 2)*
2. Tiga dikurangi satu sama dengan 2. *(papan: 2 puluhan, 6 satuan)*
3. Jadi, 45 dikurangi 19 sama dengan 26. *(papan: 45 − 19 = 26)*
4. Ada 26 buku tulis yang tersisa di toko Pak Bandi. *(papan: 26 buku tulis)*

### K3B1E-V3. Cara Susun Panjang (Menguraikan lalu mengurangkan)

**K3B1E-V3-1. Uraikan bilangan**

1. Cara susun panjang menguraikan bilangan menjadi puluhan dan satuan. *(papan: Susun panjang)*
2. Bilangan 45 diurai menjadi 40 ditambah 5. Bilangan 19 diurai menjadi 10 ditambah 9. *(papan: 45 = 40 + 5 dan 19 = 10 + 9)*
3. Satuan 5 kurang dari 9, jadi 40 diuraikan menjadi 30 ditambah 10. *(papan: 40 = 30 + 10)*
4. Sekarang 45 menjadi 30 ditambah 10 ditambah 5. *(papan: 45 = 30 + (10 + 5))*

**K3B1E-V3-2. Kurangkan kelompok**

1. Satuan: 10 ditambah 5 sama dengan 15. Lalu 15 dikurangi 9 sama dengan 6. *(papan: 15 − 9 = 6)*
2. Puluhan: 30 dikurangi 10 sama dengan 20. *(papan: 30 − 10 = 20)*
3. Jumlahkan hasil puluhan dan satuan: 20 ditambah 6. *(papan: 20 + 6)*
4. Jadi, 45 dikurangi 19 sama dengan 26. *(papan: 45 − 19 = 26)*

**K3B1E-V3-3. Periksa dengan penjumlahan**

1. Pengurangan dan penjumlahan saling berkaitan. *(papan: Saling berkaitan)*
2. Bila 45 dikurangi 19 sama dengan 26, maka 26 ditambah 19 harus sama dengan 45. *(papan: 26 + 19 = 45)*
3. Kita hitung, 26 ditambah 19 sama dengan 45. Jadi, hasilnya benar. *(papan: Hasil benar)*
4. Gunakan cara ini untuk memeriksa pekerjaanmu. *(papan: Periksa pekerjaanmu)*

## 5. Tahap 2: Mind map (peta pikiran)

**1. Mengingat Pengurangan** 🔙 (Mengingat pengurangan → Susun pendek tanpa mengambil)

Pengurangan berarti mengambil sebagian dari satu kelompok benda, lalu menghitung sisanya. Galih punya 25 permen dan Alfa mengambil 12 permen, jadi sisanya dihitung dengan 25 dikurangi 12. Pada bilangan dua angka kita memakai nilai tempat: puluhan dengan puluhan dan satuan dengan satuan. Pengurangan juga dipakai untuk mencari selisih dua banyak benda.

**2. Susun Pendek tanpa Mengambil** ➖ (Susun pendek tanpa mengambil → Susun panjang tanpa mengambil)

Susun 25 dan 12 ke bawah. Puluhan lurus dengan puluhan dan satuan lurus dengan satuan. Kurangkan satuan lebih dulu: 5 dikurangi 2 sama dengan 3. Lalu kurangkan puluhan: 2 dikurangi 1 sama dengan 1. Hasilnya 13. Disebut tanpa mengambil karena satuan di atas cukup untuk dikurangi.

**3. Susun Panjang tanpa Mengambil** 🧩 (Susun panjang tanpa mengambil → Mengambil satu puluhan)

Cara susun panjang menguraikan bilangan. 25 sama dengan 20 ditambah 5 dan 12 sama dengan 10 ditambah 2. Kelompokkan puluhan dengan puluhan dan satuan dengan satuan: (20 − 10) + (5 − 2). Hasilnya 10 ditambah 3, yaitu 13. Cara ini membuat nilai tiap tempat terlihat jelas.

**4. Mengambil Satu Puluhan** 🔁 (Mengambil satu puluhan → Susun panjang dengan mengambil)

Kadang satuan di atas lebih kecil dari satuan di bawah. Pada 45 dikurangi 19, satuan 5 kurang dari 9, jadi 5 tidak dapat dikurangi 9. Kita mengambil 1 puluhan dari 4 puluhan, sehingga puluhan tinggal 3. Satu puluhan menjadi 10 satuan, jadi satuan menjadi 15. Lalu 15 dikurangi 9 sama dengan 6.

**5. Susun Panjang dengan Mengambil** 🧱 (Susun panjang dengan mengambil → Memeriksa dengan penjumlahan)

Uraikan 45 menjadi 40 ditambah 5 dan 19 menjadi 10 ditambah 9. Karena 5 kurang dari 9, uraikan 40 menjadi 30 ditambah 10, sehingga 45 sama dengan 30 ditambah 15. Kurangkan satuan: 15 dikurangi 9 sama dengan 6. Kurangkan puluhan: 30 dikurangi 10 sama dengan 20. Hasilnya 20 ditambah 6, yaitu 26, sama dengan cara susun pendek.

**6. Memeriksa dengan Penjumlahan** ✅ (Memeriksa dengan penjumlahan → Memilih cara yang mudah)

Pengurangan dan penjumlahan saling berkaitan. Bila 45 dikurangi 19 sama dengan 26, maka 26 ditambah 19 harus sama dengan 45. Bila hasil penjumlahan sama dengan bilangan awal, jawabanmu benar. Bila berbeda, hitung lagi dan perhatikan bagian mengambil satu puluhan.

**7. Memilih Cara yang Mudah** 👍 (Memilih cara yang mudah → Soal cerita pengurangan)

Kita boleh memilih cara yang menurut kita mudah. Susun pendek cepat dan rapi. Susun panjang membantu kita melihat nilai puluhan dan satuan. Dua cara memberi hasil yang sama. Misalnya 60 dikurangi 35: satuan 0 kurang dari 5, ambil 1 puluhan menjadi 10, lalu 10 dikurangi 5 sama dengan 5, dan puluhan 5 dikurangi 3 sama dengan 2. Hasilnya 25.

**8. Soal Cerita Pengurangan** 📖 (Soal cerita pengurangan → Siap mengurangkan sampai 100)

Soal cerita memakai kata seperti sisa, selisih, diambil, dan dibeli. Bia punya 19 stiker mobil dan Aldo punya 8 stiker robot, jadi selisihnya 19 dikurangi 8 sama dengan 11. Pak Doni punya 23 ikan gurami dan 42 ikan nila, jadi selisihnya 42 dikurangi 23 sama dengan 19. Tulis kalimat matematikanya, hitung, lalu jawab dengan satuan yang tepat.

## 6. Tahap 3: Infografis

1. **Susun Lurus** 📏: Pada pengurangan bersusun, puluhan lurus dengan puluhan dan satuan lurus dengan satuan. Bilangan yang dikurangi ditulis di atas.
2. **Satuan Lebih Dulu** 1️⃣: Kita mengurangkan satuan lebih dulu, baru puluhan. Lima dikurangi dua sama dengan tiga.
3. **Puluhan Berikutnya** 🔟: Setelah satuan, kurangkan puluhan. Dua dikurangi satu sama dengan satu, jadi dua puluh lima dikurangi dua belas sama dengan tiga belas.
4. **Mengambil** 🔁: Bila satuan di atas lebih kecil dari satuan di bawah, ambil satu puluhan. Satu puluhan menjadi sepuluh satuan, dan puluhan berkurang satu.
5. **25 − 12** 🍬: Dua puluh lima dikurangi dua belas. Satuan lima dikurangi dua sama dengan tiga, puluhan dua dikurangi satu sama dengan satu. Hasilnya tiga belas.
6. **45 − 19** 📒: Empat puluh lima dikurangi sembilan belas. Lima kurang dari sembilan, jadi ambil satu puluhan. Lima belas dikurangi sembilan sama dengan enam. Tiga dikurangi satu sama dengan dua. Hasilnya dua puluh enam.
7. **Susun Panjang 45 − 19** 🧩: Empat puluh lima sama dengan tiga puluh tambah lima belas. Sembilan belas sama dengan sepuluh tambah sembilan. Lima belas kurang sembilan sama dengan enam, tiga puluh kurang sepuluh sama dengan dua puluh. Hasilnya dua puluh enam.
8. **Memeriksa** ✅: Periksa pengurangan dengan penjumlahan. Dua puluh enam tambah sembilan belas sama dengan empat puluh lima, jadi hasilnya benar.
9. **Soal Cerita** 📖: Soal cerita menanyakan sisa atau selisih. Tulis kalimat pengurangannya, hitung, lalu tulis jawabannya dengan satuan.
10. **Cara Mengurangkan** 📝: Empat langkah. Satu, susun lurus. Dua, kurangkan satuan, ambil satu puluhan bila perlu. Tiga, kurangkan puluhan. Empat, periksa dengan penjumlahan.

## 7. Tahap 4: Concrete (benda nyata)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 1 | Rakit Sisa | `build-remaining` | hlm. 46–48 (25 permen diambil 12) | Merakit sisa benda setelah sebuah kumpulan diambil sebanyak tertentu, termasuk menukar satu bungkus menjadi sepuluh benda. | Tiga ronde, tiap ronde dua soal. Siswa membaca ada berapa benda dan berapa yang diambil, lalu merakit sisanya dengan tombol tambah dan kurang. Sepuluh benda otomatis ditukar satu bungkus. |
| 2 | Hitung Sisa | `count-remaining` | hlm. 46 dan 49 (sisa permen; sisa buku tulis) | Menghitung sisa benda dari gambar kumpulan yang diambil sebagian dan memilih hasilnya. | Tiga ronde, tiap ronde dua soal. Dua kumpulan ditampilkan dengan tanda kurang. Siswa memilih satu dari tiga sisa. Pengecoh lupa mengambil atau salah mengambil. |
| 3 | Pilah Soal: Mengambil atau Tidak | `sort-subtraction` | hlm. 49–55 (satuan cukup atau tidak cukup) | Memilah soal pengurangan menjadi yang perlu mengambil satu puluhan dan yang tanpa mengambil. | Tiga ronde, tiap ronde enam soal bergambar kumpulan dan dua kotak. Siswa menyeret atau mengetuk soal ke kotak yang tepat. |
| 4 | Jodohkan Pasangan dan Sisa | `match-pair-diff` | hlm. 46–55 (mengurangkan dua bilangan) | Menjodohkan pasangan kumpulan dengan sisanya. | Tiga ronde, tiap ronde tiga pasangan kumpulan dan tiga sisa. Siswa mengetuk pasangan, lalu mengetuk sisa yang cocok. |
| 5 | Memori Pasangan dan Sisa | `memory-pair-diff` | hlm. 46–55 (mengurangkan dua bilangan) | Mencocokkan pasangan kumpulan dengan sisanya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): pasangan kumpulan dan sisanya. Siswa membalik dua kartu dan mencari pasangannya. |
| 6 | Ketuk Pasangan dengan Sisa | `tap-diff-pair` | hlm. 46–55 (sisa benda) | Menemukan pasangan kumpulan yang sisanya sama dengan bilangan yang diminta. | Tiga ronde, tiap ronde tiga pasangan dan dua pertanyaan. Siswa mengetuk pasangan yang sisanya sama dengan bilangan yang disebut. |
| 7 | Ketuk Semua yang Perlu Mengambil | `tap-all-borrow` | hlm. 49–50 (5 < 9, pindahkan 1 puluhan ke satuan) | Menemukan semua pasangan yang satuannya perlu mengambil satu puluhan (atau yang tidak). | Tiga ronde, tiap ronde empat pasangan dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. |
| 8 | Cerita Pengurangan | `story-subtract` | hlm. 46 dan 49 (permen Galih; buku tulis Pak Bandi) | Menyelesaikan soal cerita pengurangan dengan gambar kumpulan. | Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita, melihat gambar kumpulan yang diambil, lalu memilih sisanya. |
| 9 | Papan Sisa Kumpulan | `board-diff-collection` | hlm. 47–48 (tabel puluhan dan satuan hasil pengurangan) | Menulis sisa sebuah kumpulan pada papan puluhan dan satuan. | Tiga ronde, tiap ronde dua soal. Siswa menghitung sisa kumpulan, lalu mengatur angka puluhan dan satuan pada papan dan menekan Periksa. |
| 10 | Urutkan Pasangan menurut Sisa | `order-diffs` | hlm. 46–55 (membandingkan hasil) | Mengurutkan tiga pasangan kumpulan menurut sisanya. | Tiga ronde, tiap ronde tiga pasangan bertanda huruf. Siswa mengetuk pasangan satu per satu dari sisa paling kecil atau paling besar. |

## 8. Tahap 5: Picture (diagram)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 11 | Susun Kurang ke Bawah | `subtract-vertical` | hlm. 47–48 dan 50–51 (langkah 1, 2, dan 3 cara susun pendek) | Mengurangkan dua bilangan dengan cara susun pendek langkah demi langkah, termasuk mengambil satu puluhan. | Tiga ronde, tiap ronde satu soal (25 − 12, 45 − 19, 60 − 35). Siswa menaruh bilangan pada kolom satuan, mengurangkan satuan, mengambil satu puluhan bila perlu, lalu mengurangkan puluhan. |
| 12 | Papan Hasil Pengurangan | `board-diff-numbers` | hlm. 57 (Ayo Berlatih 2: gunakan cara susun pendek) | Menulis hasil pengurangan pada papan puluhan dan satuan. | Tiga ronde, tiap ronde dua soal (33 − 28, 42 − 36, 22 − 12, 98 − 21, dan seterusnya). Siswa mengatur angka puluhan dan satuan, lalu menekan Periksa. |
| 13 | Hitung Model Pengurangan | `count-models-diff` | hlm. 47 dan 49 (tabel puluhan dan satuan) | Menghitung sisa dari model puluhan dan satuan yang dikurangi model lain. | Tiga ronde, tiap ronde dua soal. Dua model blok puluhan dan satuan ditampilkan dengan tanda kurang. Siswa memilih satu dari tiga sisa. |
| 14 | Jodohkan Model dan Sisa | `match-models-diff` | hlm. 46–55 (mengurangkan dua bilangan) | Menjodohkan pasangan model dengan sisanya. | Tiga ronde, tiap ronde tiga pasangan model dan tiga sisa. Siswa mengetuk pasangan, lalu mengetuk sisa yang cocok. |
| 15 | Memori Model dan Sisa | `memory-models-diff` | hlm. 46–55 (mengurangkan dua bilangan) | Mencocokkan pasangan model dengan sisanya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. |
| 16 | Isi Tabel Hasil Pengurangan | `fill-diff-table` | hlm. 57 (Ayo Berlatih 2) | Melengkapi tabel soal pengurangan dan hasilnya. | Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu hasil yang tepat. Ada satu kartu pengecoh. |
| 17 | Ketuk Semua yang Perlu Mengambil: Model | `tap-all-borrow-models` | hlm. 49–55 (mengambil satu puluhan) | Menemukan semua soal yang satuannya perlu mengambil satu puluhan. | Tiga ronde, tiap ronde empat soal bergambar model dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. |
| 18 | Pilah Soal Susun Pengurangan | `sort-subtraction-models` | hlm. 49–55 (dengan mengambil dan tanpa mengambil) | Memilah soal bergambar model menjadi yang perlu mengambil dan yang tanpa mengambil. | Tiga ronde, tiap ronde enam soal dan dua kotak. Siswa menyeret atau mengetuk soal ke kotak yang tepat. |
| 19 | Lengkapi Cara Panjang Pengurangan | `long-form-subtract` | hlm. 48, 51–52, dan 56 (45 = 30 + 15; Ayo Berlatih 1) | Melengkapi uraian puluhan dan satuan pada cara susun panjang pengurangan. | Tiga soal, tiap soal tiga kalimat, misalnya 45 = 30 + ... Siswa memilih satu dari tiga angka untuk bagian kosong. |
| 20 | Urutkan Langkah Mengurangkan | `order-subtract-steps` | hlm. 47–55 (langkah 1, 2, dan 3) | Mengurutkan langkah pengurangan bersusun dan susun panjang. | Tiga ronde, tiap ronde empat langkah. Siswa mengetuk langkah satu per satu menurut urutan yang benar. Letak jawaban berpindah. |

## 9. Tahap 6: Abstract (kata dan angka)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 21 | Susun Kurang ke Bawah: Lambang | `subtract-vertical-abstract` | hlm. 57 (Ayo Berlatih 2: cara susun pendek) | Mengurangkan dua bilangan dengan susun pendek, termasuk mengambil satu puluhan. | Tiga ronde, tiap ronde satu soal (57 − 23, 84 − 39, 72 − 46). Siswa menyusun, mengurangkan satuan, mengambil satu puluhan bila perlu, lalu mengurangkan puluhan. |
| 22 | Pilih Selisihnya | `choose-difference` | hlm. 57 (Ayo Berlatih 2 dan 3) | Memilih hasil pengurangan dua bilangan dari tiga pilihan. | Tiga ronde, tiap ronde dua soal (33 − 28, 42 − 36, 61 − 21, 80 − 12, dan seterusnya). Pengecoh lupa mengambil atau salah mengambil. |
| 23 | Papan Selisih | `board-diff-abstract` | hlm. 57 (mengurangkan dua bilangan) | Menulis hasil pengurangan pada papan puluhan dan satuan. | Tiga ronde, tiap ronde dua soal. Siswa mengatur angka puluhan dan satuan lalu menekan Periksa. |
| 24 | Satuan, Puluhan, Selisih | `steps-difference` | hlm. 50–51 (kurangkan satuan, ambil 1 puluhan; kurangkan puluhan) | Melengkapi langkah mengurangkan satuan, puluhan, dan hasil akhir. | Tiga soal, tiap soal tiga kalimat, misalnya satuan: 15 − 9 = ... Siswa memilih satu dari tiga angka. |
| 25 | Jodohkan Soal dan Sisa | `match-problem-diff` | hlm. 57 (soal dan hasil) | Menjodohkan soal pengurangan dengan hasilnya. | Tiga ronde, tiap ronde tiga soal dan tiga hasil. Siswa mengetuk soal, lalu mengetuk hasil yang cocok. |
| 26 | Memori Soal dan Sisa | `memory-problem-diff` | hlm. 57 (soal dan jawaban) | Mencocokkan soal pengurangan dengan hasilnya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): soal dan hasil. Siswa membalik dua kartu dan mencari pasangannya. |
| 27 | Benar atau Salah: Pengurangan | `true-false-subtraction` | hlm. 57 (Ayo Berlatih 3: berilah tanda centang) | Menilai pernyataan tentang cara mengurangkan dan hasilnya. | Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan dihitung dari bilangan, dan tiap jawaban diberi penjelasan. |
| 28 | Detektif Pengurangan | `detective-subtraction` | hlm. 46–55 (hasil dua bilangan) | Menemukan bilangan hasil pengurangan dari dua petunjuk. | Empat soal. Siswa membaca petunjuk seperti hasil 45 − 19 dan kurang dari 30, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok. |
| 29 | Peta Konsep Pengurangan | `concept-map-subtraction` | hlm. 2 (peta konsep: pengurangan bilangan cacah) | Melengkapi peta konsep pengurangan bersusun dan susun panjang. | Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. |
| 30 | Soal Cerita Pengurangan | `story-subtract-numbers` | hlm. 57 (Ayo Berlatih 4: kerjakan soal cerita) | Menyelesaikan soal cerita pengurangan sisa dan selisih. | Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita lalu memilih satu dari tiga hasil. Pengecoh lupa mengambil atau salah mengambil. |

## 10. Poin penting, cara, kegiatan di rumah, dan refleksi

- 📏 **Susun lurus**: puluhan dengan puluhan, satuan dengan satuan. *Suara:* Pada pengurangan bersusun, puluhan lurus dengan puluhan dan satuan lurus dengan satuan.
- 1️⃣ **Satuan lebih dulu**: 25 − 12: 5 − 2 = 3, 2 − 1 = 1. *Suara:* Kurangkan satuan lebih dulu, lalu puluhan. Dua puluh lima dikurangi dua belas sama dengan tiga belas.
- 🔁 **Mengambil**: 1 puluhan = 10 satuan. *Suara:* Bila satuan di atas lebih kecil, ambil satu puluhan dan ubah menjadi sepuluh satuan. Puluhan berkurang satu.
- 🧩 **Susun panjang**: 45 − 19 = 20 + 6 = 26. *Suara:* Pada susun panjang, bilangan diuraikan menjadi puluhan dan satuan, lalu dikelompokkan.
- ✅ **Periksa**: 26 + 19 = 45. *Suara:* Periksa pengurangan dengan penjumlahan. Hasil ditambah bilangan pengurang harus sama dengan bilangan awal.

Ringkasan suara: Ingat selalu! Pada pengurangan bersusun, puluhan lurus dengan puluhan dan satuan lurus dengan satuan. Kurangkan satuan lebih dulu, lalu puluhan. Bila satuan di atas lebih kecil, ambil satu puluhan. Periksa hasilnya dengan penjumlahan.

Cara menyebutkan: Cara mengurangkan. Susun lurus. Kurangkan satuan, ambil satu puluhan bila perlu. Kurangkan puluhan. Lalu periksa dengan penjumlahan. (susun lurus, satuan dulu, lalu puluhan, periksa)

Ayo Mencoba di rumah: ambil satu kelompok benda di rumah, misalnya 45 kancing atau biji. Ambil sebagian, lalu hitung sisanya dengan cara susun pendek di buku. Periksa dengan penjumlahan. Ceritakan apakah kamu perlu mengambil satu puluhan.

Refleksi:
- Aku dapat mengurangkan dua bilangan sampai 100 dengan susun pendek.
- Aku dapat menjelaskan saat harus mengambil satu puluhan.
- Aku dapat memakai cara susun panjang.
- Aku memeriksa jawabanku dengan penjumlahan.
