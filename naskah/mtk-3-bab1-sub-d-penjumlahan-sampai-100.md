# Naskah Matematika Kelas 3 SD, Bab 1: Bilangan Cacah sampai 1.000, Sub-Bab D: Penjumlahan Bilangan Cacah sampai 100

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k3b1.ts` dan `src/components/modul/data-k3b1.ts`, oleh `scripts/buat-naskah-md.mjs`. Isi mengikuti Buku Siswa Matematika Kelas III (Kemendikbudristek, Kurikulum Merdeka, Bab 1 hlm. 3–45) dan Buku Panduan Guru Bab 1, serta diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.

## 1. Identitas modul

- Kode bab: `k3-mat-bab1`, FASE_B, kelas 3.
- Judul: BAB 1: BILANGAN CACAH SAMPAI 1.000. Sub-Bab D: Penjumlahan Bilangan Cacah sampai 100.
- Suara Guru: Web Speech API perangkat saja, laju 0.7 dan nada 1. Tanpa ElevenLabs.
- Isi: 3 video cerita (9 adegan), 8 langkah peta pikiran, 10 panel infografis, 30 permainan (10 Concrete, 10 Picture, 10 Abstract), 5 poin penting.

## 2. Tujuan belajar

Siswa menjumlahkan dua bilangan cacah sampai 100 dengan cara susun pendek (tanpa dan dengan menyimpan) dan cara susun panjang (menguraikan puluhan dan satuan), memahami bahwa sepuluh satuan ditukar menjadi satu puluhan, menjumlahkan tiga bilangan, serta menyelesaikan soal cerita penjumlahan.

- Capaian Pembelajaran: Siswa melakukan operasi penjumlahan dan pengurangan bilangan cacah sampai 100. Pada sub-bab ini siswa menjumlahkan dua bilangan cacah sampai 100 dengan susun pendek dan susun panjang, tanpa dan dengan menyimpan.
- Acuan: Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 1: Bilangan Cacah sampai 1.000, Sub-Bab D hlm. 34–45) dan Buku Panduan Guru Bab 1 Topik D.

## 3. Metode dari luar buku

- **Penukaran sepuluh ke satu saat menyimpan**: sepuluh benda lepas ditukar satu bungkus. Permainan Gabungkan Kumpulan memakai penukaran otomatis agar aturan menyimpan terlihat langsung.
- **Susun pendek dan susun panjang**: dua cara yang sama-sama dipakai di buku. Susun panjang menguraikan bilangan (54 = 50 + 4), susun pendek menuliskannya ke bawah.
- **Pilah soal menyimpan dan tanpa menyimpan**: siswa memeriksa satuan dulu. Bila berjumlah sepuluh atau lebih, soal itu perlu menyimpan.
- **Urutan langkah penjumlahan bersusun**: menyusun, menjumlahkan satuan, menyimpan, menjumlahkan puluhan, lalu memeriksa. Dasar permainan Urutkan Langkah Menjumlahkan.
- **Pengecoh dari kesalahan umum**: pilihan jawaban sengaja memuat hasil lupa menyimpan (kurang sepuluh) dan salah menyimpan (lebih sepuluh).
- **Soal cerita tiga bilangan**: Ayo Berlatih 5 dipakai langsung, termasuk menjumlahkan tiga bilangan dua-dua.

## 4. Tahap 1: Story (video cerita animasi SVG)

Tiap video diputar satu per satu saat siswa mengetuk Putar. Tidak ada yang berjalan sendiri. Kalimat dibacakan Suara Guru satu per satu (ketukan), dan gambar berubah mengikuti ketukan.

### K3B1D-V1. Buku di Perpustakaan (Susun pendek tanpa menyimpan)

**K3B1D-V1-1. Berapa semua buku**

1. Di perpustakaan sekolah ada 23 buah buku Matematika dan 16 buah buku Bahasa Indonesia. *(papan: 23 buku Matematika)*
2. Berapa jumlah keseluruhan buku di rak perpustakaan? *(papan: 16 buku Bahasa)*
3. Kita bisa memakai operasi penjumlahan, yaitu 23 ditambah 16. *(papan: 23 + 16)*
4. Ada berbagai cara melakukan penjumlahan. Kita pelajari satu per satu. *(papan: Berbagai cara)*

**K3B1D-V1-2. Tabel nilai tempat**

1. Uraikan 23 dan 16 pada tabel nilai tempat. *(papan: Tabel puluhan dan satuan)*
2. Bilangan 23 punya 2 puluhan dan 3 satuan. Bilangan 16 punya 1 puluhan dan 6 satuan. *(papan: 23 dan 16)*
3. Gabungkan satuan: 3 satuan dan 6 satuan menjadi 9 satuan. *(papan: 3 + 6 = 9 satuan)*
4. Gabungkan puluhan: 2 puluhan dan 1 puluhan menjadi 3 puluhan. Hasilnya 39. *(papan: 2 + 1 = 3 puluhan)*

**K3B1D-V1-3. Susun pendek**

1. Cara susun pendek: susun bilangan, puluhan lurus dengan puluhan dan satuan lurus dengan satuan. *(papan: Susun pendek)*
2. Langkah satu, susun. Langkah dua, jumlahkan satuan, 3 + 6 = 9. *(papan: Satuan: 3 + 6 = 9)*
3. Langkah tiga, jumlahkan puluhan, 2 + 1 = 3. *(papan: Puluhan: 2 + 1 = 3)*
4. Jadi, 23 + 16 = 39. Ada 39 buku di rak perpustakaan. *(papan: 23 + 16 = 39)*

### K3B1D-V2. Upacara di Alun-Alun (Susun pendek dengan menyimpan)

**K3B1D-V2-1. Berapa jumlah siswa**

1. Sekolah mengikutsertakan siswa untuk upacara di alun-alun kota. *(papan: Upacara di alun-alun)*
2. Ada 48 siswa laki-laki dan 16 siswa perempuan. *(papan: 48 laki-laki, 16 perempuan)*
3. Berapa jumlah seluruh siswa yang mengikuti upacara? *(papan: Jumlah seluruh siswa?)*
4. Kita jumlahkan 48 dan 16. *(papan: 48 + 16)*

**K3B1D-V2-2. Menyimpan satu puluhan**

1. Jumlahkan satuan: 8 ditambah 6 sama dengan 14. *(papan: 8 + 6 = 14)*
2. Empat belas satuan sama dengan 1 puluhan dan 4 satuan. *(papan: 14 = 1 puluhan + 4 satuan)*
3. Tulis 4 di satuan, lalu simpan 1 puluhan di atas kolom puluhan. *(papan: Tulis 4, simpan 1)*
4. Sepuluh satuan ditukar dengan satu puluhan, itulah alasan kita menyimpan. *(papan: 10 satuan jadi 1 puluhan)*

**K3B1D-V2-3. Puluhan dan hasil**

1. Sekarang jumlahkan puluhan: 1 simpanan, ditambah 4, ditambah 1. *(papan: Puluhan: 1 + 4 + 1)*
2. Satu ditambah empat ditambah satu sama dengan 6. *(papan: = 6 puluhan)*
3. Jadi, 48 ditambah 16 sama dengan 64. *(papan: 48 + 16 = 64)*
4. Ada 64 siswa yang mengikuti upacara di alun-alun kota. *(papan: 64 siswa)*

### K3B1D-V3. Cara Susun Panjang (Menguraikan lalu menjumlahkan)

**K3B1D-V3-1. Uraikan bilangan**

1. Cara susun panjang menguraikan bilangan menjadi puluhan dan satuan. *(papan: Susun panjang)*
2. Bilangan 54 diurai menjadi 50 ditambah 4. *(papan: 54 = 50 + 4)*
3. Bilangan 29 diurai menjadi 20 ditambah 9. *(papan: 29 = 20 + 9)*
4. Kelompokkan puluhan dengan puluhan dan satuan dengan satuan. *(papan: Kelompokkan)*

**K3B1D-V3-2. Jumlahkan kelompok**

1. Puluhan: 50 ditambah 20 sama dengan 70. *(papan: 50 + 20 = 70)*
2. Satuan: 4 ditambah 9 sama dengan 13. *(papan: 4 + 9 = 13)*
3. Bilangan 13 diurai menjadi 10 ditambah 3. *(papan: 13 = 10 + 3)*
4. Jadi 70 ditambah 10 ditambah 3 sama dengan 83. *(papan: 70 + 10 + 3 = 83)*

**K3B1D-V3-3. Pilih cara yang mudah**

1. Kita boleh memilih cara yang menurut kita paling mudah. *(papan: Pilih cara yang mudah)*
2. Cara susun pendek cepat untuk bilangan yang dijumlahkan satu per satu. *(papan: Susun pendek: cepat)*
3. Cara susun panjang membantu kita melihat nilai puluhan dan satuan. *(papan: Susun panjang: jelas)*
4. Apa pun caranya, hasilnya sama, yaitu 83. *(papan: Hasil sama: 83)*

## 5. Tahap 2: Mind map (peta pikiran)

**1. Mengingat Penjumlahan** 🔙 (Mengingat penjumlahan → Susun pendek tanpa menyimpan)

Di Kelas 2 kita menjumlahkan bilangan sampai 20, bahkan sampai 100 tanpa kesulitan besar. Penjumlahan berarti menggabungkan dua kelompok benda. Pada bilangan dua angka, kita memakai nilai tempat: puluhan dengan puluhan dan satuan dengan satuan. Di perpustakaan ada 23 buku Matematika dan 16 buku Bahasa Indonesia, jadi kita menjumlahkan 23 dan 16.

**2. Susun Pendek tanpa Menyimpan** 📚 (Susun pendek tanpa menyimpan → Susun panjang tanpa menyimpan)

Susun bilangan 23 dan 16 ke bawah. Puluhan lurus dengan puluhan dan satuan lurus dengan satuan. Jumlahkan satuan lebih dulu: 3 ditambah 6 sama dengan 9. Lalu jumlahkan puluhan: 2 ditambah 1 sama dengan 3. Hasilnya 39. Disebut tanpa menyimpan karena jumlah satuannya kurang dari sepuluh.

**3. Susun Panjang tanpa Menyimpan** 🧩 (Susun panjang tanpa menyimpan → Menyimpan satu puluhan)

Cara susun panjang menguraikan bilangan. 23 sama dengan 20 ditambah 3 dan 16 sama dengan 10 ditambah 6. Kelompokkan puluhan dengan puluhan dan satuan dengan satuan: (20 + 10) + (3 + 6). Hasilnya 30 ditambah 9, yaitu 39. Cara ini membuat nilai tiap tempat terlihat jelas.

**4. Menyimpan Satu Puluhan** 🔁 (Menyimpan satu puluhan → Susun panjang dengan menyimpan)

Kadang jumlah satuan sepuluh atau lebih. Pada 48 ditambah 16, satuan 8 ditambah 6 sama dengan 14. Empat belas satuan sama dengan 1 puluhan dan 4 satuan. Kita tulis 4 di satuan dan menyimpan 1 puluhan untuk dijumlahkan dengan puluhan. Sepuluh satuan memang boleh ditukar dengan satu puluhan.

**5. Susun Panjang dengan Menyimpan** 🧱 (Susun panjang dengan menyimpan → Memilih cara yang mudah)

Uraikan 48 menjadi 40 ditambah 8 dan 16 menjadi 10 ditambah 6. Kelompokkan: (40 + 10) + (8 + 6) sama dengan 50 ditambah 14. Uraikan 14 menjadi 10 ditambah 4, lalu 50 ditambah 10 sama dengan 60, ditambah 4 menjadi 64. Hasilnya sama dengan cara susun pendek, yaitu 64.

**6. Memilih Cara yang Mudah** ✅ (Memilih cara yang mudah → Menjumlahkan tiga bilangan)

Kita boleh memilih cara yang menurut kita mudah. Susun pendek cepat dan rapi. Susun panjang membantu kita melihat nilai puluhan dan satuan. Dua cara memberi hasil yang sama. Untuk memeriksa, hitunglah dengan cara yang lain dan lihat apakah hasilnya sama, misalnya 54 ditambah 29 sama dengan 83.

**7. Menjumlahkan Tiga Bilangan** ➕ (Menjumlahkan tiga bilangan → Soal cerita penjumlahan)

Tiga bilangan dijumlahkan dua-dua. Pada 23 ditambah 30 ditambah 12, jumlahkan 23 dan 30 menjadi 53, lalu tambahkan 12 menjadi 65. Boleh juga puluhan semua dulu: 20 + 30 + 10 sama dengan 60, lalu satuan 3 + 0 + 2 sama dengan 5, jadi 65. Urutan menjumlahkan tidak mengubah hasilnya.

**8. Soal Cerita Penjumlahan** 📖 (Soal cerita penjumlahan → Siap menjumlahkan sampai 100)

Soal cerita memakai kata seperti jumlah seluruhnya, semuanya, dan ditambah. Andi membeli 25 buku dan 36 pensil, jadi jumlah barang 25 ditambah 36 sama dengan 61. Pak Adi punya 15 kambing, 10 sapi, dan 12 domba, jadi 15 ditambah 10 ditambah 12 sama dengan 37. Tulis kalimat matematikanya, hitung, lalu jawab dengan satuan yang tepat.

## 6. Tahap 3: Infografis

1. **Susun Lurus** 📏: Pada penjumlahan bersusun, puluhan lurus dengan puluhan dan satuan lurus dengan satuan.
2. **Satuan Lebih Dulu** 1️⃣: Kita menjumlahkan satuan lebih dulu, baru puluhan. Tiga ditambah enam sama dengan sembilan.
3. **Puluhan Berikutnya** 🔟: Setelah satuan, jumlahkan puluhan. Dua ditambah satu sama dengan tiga, jadi dua puluh tiga ditambah enam belas sama dengan tiga puluh sembilan.
4. **Menyimpan** 🔁: Bila satuan berjumlah sepuluh atau lebih, tukar sepuluh satuan dengan satu puluhan. Tulis sisa satuan dan simpan satu puluhan.
5. **23 + 16** 📚: Dua puluh tiga ditambah enam belas. Satuan tiga ditambah enam sama dengan sembilan, puluhan dua ditambah satu sama dengan tiga. Hasilnya tiga puluh sembilan.
6. **48 + 16** 🏟️: Empat puluh delapan ditambah enam belas. Delapan ditambah enam sama dengan empat belas, simpan satu. Satu ditambah empat ditambah satu sama dengan enam. Hasilnya enam puluh empat.
7. **Susun Panjang 54 + 29** 🧩: Lima puluh empat sama dengan lima puluh tambah empat. Dua puluh sembilan sama dengan dua puluh tambah sembilan. Tujuh puluh tambah tiga belas sama dengan delapan puluh tiga.
8. **Tiga Bilangan** ➕: Menjumlahkan tiga bilangan dilakukan dua-dua. Dua puluh tiga tambah tiga puluh sama dengan lima puluh tiga, tambah dua belas sama dengan enam puluh lima.
9. **Soal Cerita** 📖: Soal cerita meminta jumlah seluruhnya. Tulis kalimat penjumlahannya, hitung, lalu tulis jawabannya dengan satuan.
10. **Cara Memeriksa** 📝: Empat langkah. Satu, susun lurus. Dua, jumlahkan satuan dan simpan bila perlu. Tiga, jumlahkan puluhan. Empat, periksa dengan cara yang lain.

## 7. Tahap 4: Concrete (benda nyata)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 1 | Gabungkan Kumpulan | `combine-collections` | hlm. 35–37 (penjumlahan dengan tabel nilai tempat) | Menggabungkan dua kumpulan dengan bungkus dan benda lepas, termasuk menukar sepuluh benda menjadi satu bungkus. | Tiga ronde, tiap ronde dua soal. Siswa membaca dua banyak yang digabung lalu merakit jumlahnya dengan tombol tambah dan kurang. Sepuluh benda otomatis ditukar menjadi satu bungkus. |
| 2 | Hitung Gabungan | `count-combined` | hlm. 35 dan 38 (23 + 16 dan 48 + 16) | Menghitung jumlah dua kumpulan benda dan memilih hasilnya. | Tiga ronde, tiap ronde dua soal. Dua kumpulan ditampilkan dengan tanda tambah. Siswa memilih satu dari tiga jumlah. Pengecoh lupa menyimpan atau salah menyimpan. |
| 3 | Pilah Soal: Menyimpan atau Tidak | `sort-addition` | hlm. 38–42 (dengan menyimpan dan tanpa menyimpan) | Memilah soal penjumlahan menjadi yang perlu menyimpan dan yang tanpa menyimpan. | Tiga ronde, tiap ronde enam soal bergambar kumpulan dan dua kotak. Siswa menyeret atau mengetuk soal ke kotak yang tepat. |
| 4 | Jodohkan Pasangan dan Jumlah | `match-pair-sum` | hlm. 35–42 (menjumlahkan dua bilangan) | Menjodohkan pasangan kumpulan dengan jumlahnya. | Tiga ronde, tiap ronde tiga pasangan kumpulan dan tiga jumlah. Siswa mengetuk pasangan, lalu mengetuk jumlah yang cocok. |
| 5 | Memori Pasangan dan Jumlah | `memory-pair-sum` | hlm. 35–42 (menjumlahkan dua bilangan) | Mencocokkan pasangan kumpulan dengan jumlahnya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): pasangan kumpulan dan jumlahnya. Siswa membalik dua kartu dan mencari pasangannya. |
| 6 | Ketuk Pasangan dengan Jumlah | `tap-sum-pair` | hlm. 35–42 (jumlah keseluruhan) | Menemukan pasangan kumpulan yang jumlahnya sama dengan bilangan yang diminta. | Tiga ronde, tiap ronde tiga pasangan dan dua pertanyaan. Siswa mengetuk pasangan yang jumlahnya sama dengan bilangan yang disebut. |
| 7 | Ketuk Semua yang Perlu Menyimpan | `tap-all-save` | hlm. 38–40 (8 satuan + 6 satuan = 14 satuan) | Menemukan semua pasangan yang satuannya berjumlah sepuluh atau lebih (atau yang tidak). | Tiga ronde, tiap ronde empat pasangan dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. |
| 8 | Cerita Penjumlahan | `story-add` | hlm. 35 dan 38 (buku di perpustakaan; siswa di upacara) | Menyelesaikan soal cerita penjumlahan dua bilangan dengan gambar kumpulan. | Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita, melihat gambar dua kumpulan, lalu memilih jumlahnya. |
| 9 | Papan Jumlah Kumpulan | `board-sum-collection` | hlm. 36 dan 39 (tabel nilai tempat hasil penjumlahan) | Menulis jumlah dua kumpulan pada papan puluhan dan satuan. | Tiga ronde, tiap ronde dua soal. Siswa menghitung dua kumpulan, lalu mengatur angka puluhan dan satuan pada papan dan menekan Periksa. |
| 10 | Urutkan Pasangan menurut Jumlah | `order-sums` | hlm. 35–42 (membandingkan hasil) | Mengurutkan tiga pasangan kumpulan menurut jumlahnya. | Tiga ronde, tiap ronde tiga pasangan bertanda huruf. Siswa mengetuk pasangan satu per satu dari jumlah paling kecil atau paling besar. |

## 8. Tahap 5: Picture (diagram)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 11 | Susun ke Bawah | `add-vertical` | hlm. 36 dan 39 (langkah 1, 2, dan 3 cara susun pendek) | Menjumlahkan dua bilangan dengan cara susun pendek langkah demi langkah. | Tiga ronde, tiap ronde satu soal (23 + 16, 48 + 16, 54 + 29). Siswa menaruh bilangan pada kolom satuan, menjumlahkan satuan, menyimpan bila perlu, lalu menjumlahkan puluhan. |
| 12 | Papan Hasil Susun | `board-sum-numbers` | hlm. 43 (Ayo Berlatih 2: gunakan cara susun pendek) | Menulis hasil penjumlahan pada papan puluhan dan satuan. | Tiga ronde, tiap ronde dua soal (33 + 28, 27 + 46, dan seterusnya). Siswa mengatur angka puluhan dan satuan, lalu menekan Periksa. |
| 13 | Hitung Model Puluhan dan Satuan | `count-models-sum` | hlm. 35–36 (tabel puluhan dan satuan) | Menghitung jumlah dari dua model puluhan dan satuan. | Tiga ronde, tiap ronde dua soal. Dua model blok puluhan dan satuan ditampilkan. Siswa memilih satu dari tiga jumlah. |
| 14 | Jodohkan Model dan Jumlah | `match-models-sum` | hlm. 35–42 (menjumlahkan dua bilangan) | Menjodohkan pasangan model dengan jumlahnya. | Tiga ronde, tiap ronde tiga pasangan model dan tiga jumlah. Siswa mengetuk pasangan, lalu mengetuk jumlah yang cocok. |
| 15 | Memori Model dan Jumlah | `memory-models-sum` | hlm. 35–42 (menjumlahkan dua bilangan) | Mencocokkan pasangan model dengan jumlahnya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. |
| 16 | Isi Tabel Hasil | `fill-sum-table` | hlm. 43 (Ayo Berlatih 2 dan 3) | Melengkapi tabel soal penjumlahan dan hasilnya. | Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu hasil yang tepat. Ada satu kartu pengecoh. |
| 17 | Ketuk Semua yang Perlu Menyimpan: Model | `tap-all-save-models` | hlm. 38–40 (menyimpan satu puluhan) | Menemukan semua soal yang satuannya melewati sepuluh. | Tiga ronde, tiap ronde empat soal bergambar model dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. |
| 18 | Pilah Soal Susun | `sort-addition-models` | hlm. 38–40 (dengan menyimpan dan tanpa menyimpan) | Memilah soal bergambar model menjadi yang perlu menyimpan dan yang tanpa menyimpan. | Tiga ronde, tiap ronde enam soal dan dua kotak. Siswa menyeret atau mengetuk soal ke kotak yang tepat. |
| 19 | Lengkapi Cara Panjang | `long-form-sentence` | hlm. 37 dan 40 (23 = 20 + 3; 16 = 10 + 6) | Melengkapi uraian puluhan dan satuan pada cara susun panjang. | Tiga soal, tiap soal tiga kalimat, misalnya 23 = 20 + ... Siswa memilih satu dari tiga angka untuk bagian kosong. |
| 20 | Urutkan Langkah Menjumlahkan | `order-addition-steps` | hlm. 36–42 (langkah 1, 2, dan 3) | Mengurutkan langkah penjumlahan bersusun dan susun panjang. | Tiga ronde, tiap ronde empat langkah. Siswa mengetuk langkah satu per satu menurut urutan yang benar. Letak jawaban berpindah. |

## 9. Tahap 6: Abstract (kata dan angka)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 21 | Susun ke Bawah: Lambang | `add-vertical-abstract` | hlm. 43 (Ayo Berlatih 2: cara susun pendek) | Menjumlahkan dua bilangan dengan susun pendek, termasuk menyimpan. | Tiga ronde, tiap ronde satu soal (34 + 25, 46 + 38, 57 + 26). Siswa menyusun, menjumlahkan satuan, menyimpan bila perlu, lalu menjumlahkan puluhan. |
| 22 | Pilih Jumlahnya | `choose-sum` | hlm. 44 (gunakan cara yang menurut kalian mudah) | Memilih hasil penjumlahan dua bilangan dari tiga pilihan. | Tiga ronde, tiap ronde dua soal (31 + 51, 49 + 19, dan seterusnya). Pengecoh lupa menyimpan atau salah menyimpan. |
| 23 | Papan Jumlah | `board-sum-abstract` | hlm. 43–44 (menjumlahkan dua bilangan) | Menulis hasil penjumlahan pada papan puluhan dan satuan. | Tiga ronde, tiap ronde dua soal. Siswa mengatur angka puluhan dan satuan lalu menekan Periksa. |
| 24 | Satuan, Puluhan, Jumlah | `steps-sentence` | hlm. 39 (jumlahkan satuan, simpan 1; jumlahkan puluhan) | Melengkapi langkah menjumlahkan satuan, puluhan, dan jumlah akhir. | Tiga soal, tiap soal tiga kalimat, misalnya satuan: 8 + 6 = ... Siswa memilih satu dari tiga angka. |
| 25 | Jodohkan Soal dan Hasil | `match-problem-result` | hlm. 44 (tarik garis pada jawaban yang sesuai) | Menjodohkan soal penjumlahan dengan hasilnya. | Tiga ronde, tiap ronde tiga soal dan tiga hasil. Siswa mengetuk soal, lalu mengetuk hasil yang cocok. |
| 26 | Memori Soal dan Hasil | `memory-problem-result` | hlm. 44 (soal dan jawaban) | Mencocokkan soal penjumlahan dengan hasilnya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): soal dan hasil. Siswa membalik dua kartu dan mencari pasangannya. |
| 27 | Benar atau Salah: Penjumlahan | `true-false-addition` | hlm. 35–45 (susun pendek, susun panjang, menyimpan) | Menilai pernyataan tentang cara menjumlahkan dan hasilnya. | Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan dihitung dari bilangan, dan tiap jawaban diberi penjelasan. |
| 28 | Detektif Penjumlahan | `detective-addition` | hlm. 35–42 (jumlah dua bilangan) | Menemukan bilangan hasil penjumlahan dari dua petunjuk. | Empat soal. Siswa membaca petunjuk seperti hasil 48 + 16 dan puluhanku 6, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok. |
| 29 | Peta Konsep Penjumlahan | `concept-map-addition` | hlm. 2 (peta konsep: penjumlahan bilangan cacah) | Melengkapi peta konsep penjumlahan bersusun dan susun panjang. | Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. |
| 30 | Soal Cerita Penjumlahan | `story-add-numbers` | hlm. 45 (Ayo Berlatih 5: kerjakan soal cerita) | Menyelesaikan soal cerita penjumlahan dua atau tiga bilangan. | Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita lalu memilih satu dari tiga jumlah. Pengecoh lupa menyimpan atau salah menyimpan. |

## 10. Poin penting, cara, kegiatan di rumah, dan refleksi

- 📏 **Susun lurus**: puluhan dengan puluhan, satuan dengan satuan. *Suara:* Pada penjumlahan bersusun, puluhan lurus dengan puluhan dan satuan lurus dengan satuan.
- 1️⃣ **Satuan lebih dulu**: 23 + 16: 3 + 6 = 9, 2 + 1 = 3. *Suara:* Jumlahkan satuan lebih dulu, lalu puluhan. Dua puluh tiga ditambah enam belas sama dengan tiga puluh sembilan.
- 🔁 **Menyimpan**: 10 satuan = 1 puluhan. *Suara:* Bila satuan berjumlah sepuluh atau lebih, tukar sepuluh satuan dengan satu puluhan dan simpan.
- 🧩 **Susun panjang**: 54 + 29 = 70 + 13 = 83. *Suara:* Pada susun panjang, bilangan diuraikan menjadi puluhan dan satuan, lalu dikelompokkan.
- ✅ **Periksa**: hitung dengan cara lain. *Suara:* Periksa jawabanmu dengan menghitung memakai cara yang lain. Hasilnya harus sama.

Ringkasan suara: Ingat selalu! Pada penjumlahan bersusun, puluhan lurus dengan puluhan dan satuan lurus dengan satuan. Jumlahkan satuan lebih dulu, lalu puluhan. Bila satuan berjumlah sepuluh atau lebih, simpan satu puluhan. Susun panjang dan susun pendek memberi hasil yang sama.

Cara menyebutkan: Cara menjumlahkan. Susun lurus. Jumlahkan satuan, simpan bila perlu. Jumlahkan puluhan. Lalu periksa dengan cara lain. (susun lurus, satuan dulu, lalu puluhan, periksa)

Ayo Mencoba di rumah: hitung dua kelompok benda di rumah, misalnya kancing dan koin mainan, dengan dua puluhan atau tiga puluhan di tiap kelompok. Jumlahkan dengan cara susun pendek di buku, lalu periksa dengan cara susun panjang. Ceritakan apakah ada satuan yang perlu disimpan.

Refleksi:
- Aku dapat menjumlahkan dua bilangan sampai 100 dengan susun pendek.
- Aku dapat menjelaskan saat harus menyimpan satu puluhan.
- Aku dapat memakai cara susun panjang.
- Aku memeriksa jawabanku dengan cara lain.
