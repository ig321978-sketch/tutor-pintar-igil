# Naskah Matematika Kelas 3 SD, Bab 3: Pengukuran Panjang dan Berat, Sub-Bab A: Pengukuran Panjang dengan Satuan Baku

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k3b3.ts` dan `src/components/modul/data-k3b3.ts`, oleh `scripts/buat-naskah-md.mjs`. Isi mengikuti Buku Siswa Matematika Kelas III (Kemendikbudristek, Kurikulum Merdeka, Bab 3 hlm. 105–140) dan Buku Panduan Guru Bab 3, serta diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.

## 1. Identitas modul

- Kode bab: `k3-mat-bab3`, FASE_B, kelas 3.
- Judul: BAB 3: PENGUKURAN PANJANG DAN BERAT. Sub-Bab A: Pengukuran Panjang dengan Satuan Baku.
- Suara Guru: Web Speech API perangkat saja, laju 0.7 dan nada 1. Tanpa ElevenLabs.
- Isi: 3 video cerita (9 adegan), 8 langkah peta pikiran, 10 panel infografis, 30 permainan (10 Concrete, 10 Picture, 10 Abstract), 5 poin penting.

## 2. Tujuan belajar

Siswa mengenal alat ukur panjang (penggaris, meteran gulung, pengukur tinggi badan) dan satuan baku panjang (sentimeter dan meter), mengukur panjang benda dengan menempatkan ujung benda di angka nol, membaca panjang dari angka di ujung yang lain, serta memilih alat ukur yang tepat untuk benda pendek dan benda panjang.

- Capaian Pembelajaran: Siswa menyelesaikan masalah yang berkaitan dengan panjang dan berat benda dengan satuan baku. Pada sub-bab ini siswa mengukur panjang benda dengan penggaris dan meteran serta memilih alat ukur yang tepat.
- Acuan: Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 3: Pengukuran Panjang dan Berat, Sub-Bab A hlm. 105–119) dan Buku Panduan Guru Bab 3 Topik A.

## 3. Metode dari luar buku

- **Penggaris dengan benda nyata di atasnya**: pensil, krayon, penghapus, sendok, dan sikat gigi digambar di atas penggaris 0 sampai 15 cm. Dasar permainan Baca Panjang Benda dan Papan Panjang Benda.
- **Geser ke angka nol (Aktivitas 1, langkah 4 dan 5)**: siswa menggeser benda sampai ujung kirinya tepat di angka 0, baru membaca angka di ujung yang lain. Mesin Geser Ukur menolak jawaban sebelum benda sejajar, supaya kesalahan umum (mulai dari angka selain nol) terlihat langsung.
- **Batang polos di tahap Picture**: benda diganti batang berwarna tanpa gambar benda. Aturan membaca panjangnya tetap sama sehingga siswa memindahkan keterampilan dari benda ke diagram.
- **Memilih alat ukur**: benda sehari-hari (pensil, pintu, jalan, televisi) dipilah ke penggaris atau meteran. Batas 30 cm dipakai pada permainan Pilah Panjang. Timbangan sengaja dipakai sebagai pengecoh agar siswa membedakan panjang dari berat.
- **Selisih dua batang**: dua batang pada satu penggaris dibandingkan dan dikurangkan, seperti soal tinggi tanaman (Ayo Berlatih 3).
- **Pengecoh dari kesalahan umum**: pilihan jawaban memuat angka di ujung kanan sebelum digeser, satu lebih, dan satu kurang.

## 4. Tahap 1: Story (video cerita animasi SVG)

Tiap video diputar satu per satu saat siswa mengetuk Putar. Tidak ada yang berjalan sendiri. Kalimat dibacakan Suara Guru satu per satu (ketukan), dan gambar berubah mengikuti ketukan.

### K3B3A-V1. Posyandu dan Alat Ukur (Mengenal alat ukur panjang)

**K3B3A-V1-1. Ke posyandu**

1. Posyandu memberikan layanan kesehatan bagi masyarakat. *(papan: Posyandu)*
2. Di posyandu, tinggi badan dan berat badan bayi diukur. *(papan: Mengukur tinggi badan)*
3. Alat apa yang dipakai untuk mengukur tinggi badan? *(papan: Alat ukur apa?)*
4. Satuan baku apa yang digunakan? *(papan: Satuan baku apa?)*

**K3B3A-V1-2. Satuan tidak baku**

1. Panjang meja dapat diukur dengan jengkal tangan atau pensil. *(papan: Jengkal dan pensil)*
2. Jengkal tangan setiap orang berbeda-beda. *(papan: Jengkal berbeda-beda)*
3. Hasil ukur dengan benda tidak baku bisa berbeda. *(papan: Hasil bisa berbeda)*
4. Karena itu kita memerlukan satuan baku yang sama untuk semua. *(papan: Perlu satuan baku)*

**K3B3A-V1-3. Satuan baku panjang**

1. Satuan baku panjang adalah sentimeter dan meter. *(papan: Sentimeter dan meter)*
2. Sentimeter ditulis cm dan meter ditulis m. *(papan: cm dan m)*
3. Penggaris memakai satuan sentimeter. *(papan: Penggaris: cm)*
4. Meteran memakai satuan meter dan sentimeter. *(papan: Meteran: m dan cm)*

### K3B3A-V2. Mengukur dengan Penggaris (Aktivitas 1: pengukuran panjang)

**K3B3A-V2-1. Siapkan alat**

1. Siapkan pensil, buku, kotak pensil, dan penggaris. *(papan: Pensil, buku, kotak pensil)*
2. Letakkan benda-benda itu di atas meja. *(papan: Di atas meja)*
3. Penggaris adalah alat ukur dan alat bantu menggambar garis lurus. *(papan: Penggaris)*
4. Kita akan mengukur panjang tiap benda. *(papan: Mengukur panjang benda)*

**K3B3A-V2-2. Mulai dari nol**

1. Letakkan ujung penggaris pada salah satu ujung benda. *(papan: Ujung penggaris di ujung benda)*
2. Pastikan ujung benda tepat di angka 0 sentimeter. *(papan: Ujung benda di angka 0)*
3. Perhatikan ujung benda yang lain berada di angka berapa. *(papan: Lihat ujung yang lain)*
4. Angka itu adalah panjang benda. *(papan: Angka itu panjangnya)*

**K3B3A-V2-3. Tulis hasilnya**

1. Misalnya ujung pensil yang lain berada di angka 15. *(papan: Ujung lain di angka 15)*
2. Panjang pensil adalah 15 sentimeter. *(papan: Panjang pensil 15 cm)*
3. Tulis hasilnya dengan satuan baku, yaitu 15 cm. *(papan: Tulis: 15 cm)*
4. Satuan panjang pada penggaris adalah sentimeter. *(papan: Satuan: sentimeter)*

### K3B3A-V3. Penggaris atau Meteran (Memilih alat ukur yang tepat)

**K3B3A-V3-1. Benda panjang**

1. Meteran dipakai untuk benda yang lebih panjang dari penggaris. *(papan: Meteran untuk benda panjang)*
2. Contohnya televisi, meja, pintu, dan papan tulis. *(papan: Televisi, meja, pintu)*
3. Alat ukur apa yang tepat untuk mengukur pintu? *(papan: Alat ukur pintu?)*
4. Karena pintu lebih panjang dari penggaris, kita pakai meteran. *(papan: Pintu: meteran)*

**K3B3A-V3-2. Cara memakai meteran**

1. Cara memakai meteran sama dengan cara memakai penggaris. *(papan: Sama dengan penggaris)*
2. Mulailah dari angka 0. *(papan: Mulai dari angka 0)*
3. Meteran memakai satuan meter dan sentimeter. *(papan: Meter dan sentimeter)*
4. Meteran juga dapat dipakai untuk mengukur jarak antara dua benda. *(papan: Mengukur jarak)*

**K3B3A-V3-3. Memilih alat**

1. Benda pendek seperti pensil diukur dengan penggaris. *(papan: Pensil: penggaris)*
2. Benda panjang seperti lemari diukur dengan meteran. *(papan: Lemari: meteran)*
3. Tinggi badan diukur dengan pengukur tinggi badan atau meteran. *(papan: Tinggi badan: meteran)*
4. Pilih alat ukur yang tepat supaya hasilnya mudah dibaca. *(papan: Pilih alat yang tepat)*

## 5. Tahap 2: Mind map (peta pikiran)

**1. Mengingat Satuan Tidak Baku** 🔙 (Mengingat satuan tidak baku → Mengenal penggaris)

Panjang benda dapat diukur dengan benda lain yang lebih pendek, misalnya jengkal tangan atau pensil. Satu jengkal tangan dan satu pensil dapat dipakai mengukur panjang meja tulis. Tetapi jengkal tangan setiap orang berbeda, sehingga hasil ukur bisa berbeda. Karena itu diperlukan satuan baku yang sama untuk semua orang.

**2. Mengenal Penggaris** 📏 (Mengenal penggaris → Mengukur dari angka nol)

Penggaris atau mistar adalah alat ukur dan alat bantu untuk menggambar garis lurus. Pada penggaris ada angka 0, 1, 2, dan seterusnya. Jarak dari satu angka ke angka berikutnya adalah satu sentimeter. Penggaris dipakai untuk mengukur benda yang pendek, misalnya pensil, penghapus, dan buku tulis.

**3. Mengukur dari Angka Nol** 0️⃣ (Mengukur dari angka nol → Membaca panjang benda)

Pada Aktivitas 1, letakkan ujung penggaris pada salah satu ujung benda. Langkah kedua, pastikan ujung benda tepat di angka 0 sentimeter. Setelah itu perhatikan ujung benda yang lain berada di angka berapa. Bila benda tidak mulai dari angka 0, hasil bacaan akan keliru karena panjang yang terbaca terlalu besar.

**4. Membaca Panjang Benda** 🔍 (Membaca panjang benda → Satuan baku panjang)

Setelah ujung benda tepat di angka 0, angka di ujung benda yang lain menunjukkan panjang benda. Bila ujung pensil berada di angka 15, panjang pensil adalah 15 sentimeter. Tuliskan hasil pengukuran bersama satuannya, yaitu 15 cm. Panjang benda dapat dibandingkan dan diurutkan dari yang terpendek sampai yang terpanjang.

**5. Satuan Baku Panjang** 📐 (Satuan baku panjang → Penggaris atau meteran)

Ukuran panjang benda memiliki satuan baku. Satuan baku yang dapat digunakan adalah sentimeter (cm) dan meter (m). Penggaris memakai sentimeter. Meteran memakai meter dan sentimeter. Karena satuan baku sama untuk semua orang, hasil pengukuran sama siapa pun yang mengukur.

**6. Penggaris atau Meteran** 🧰 (Penggaris atau meteran → Memilih alat ukur yang tepat)

Alat ukur panjang bermacam-macam, di antaranya penggaris, meteran gulung, dan pengukur tinggi badan. Meteran digunakan untuk mengukur benda yang panjangnya melebihi penggaris, misalnya televisi, meja, pintu, atau papan tulis. Cara memakai meteran sama dengan penggaris, yaitu mulai dari angka 0.

**7. Memilih Alat Ukur yang Tepat** ✅ (Memilih alat ukur yang tepat → Ukuran yang wajar)

Memilih alat ukur harus sesuai dengan benda. Meutia bertanya alat apa yang tepat mengukur televisi, dan jawabannya meteran karena televisi lebih panjang dari penggaris. Alfa bertanya tentang meja, dan jawabannya juga meteran. Pensil, penghapus, dan buku tulis cukup diukur dengan penggaris. Tinggi badan diukur dengan pengukur tinggi badan atau meteran.

**8. Ukuran yang Wajar** 🧭 (Ukuran yang wajar → Siap mengukur panjang dengan satuan baku)

Memperkirakan ukuran membantu kita memilih satuan. Panjang pensil sekitar 15 cm, buku tulis sekitar 30 cm, dan tinggi pintu sekitar 2 m. Panjang lapangan dan jalan lebih tepat ditulis dengan meter. Bila hasil terlalu aneh, misalnya pensil 15 m, periksa lagi satuannya. Dua panjang dapat dibandingkan dengan melihat selisihnya.

## 6. Tahap 3: Infografis

1. **Satuan Tidak Baku** 🖐️: Jengkal tangan dan pensil dapat mengukur panjang meja. Tetapi jengkal setiap orang berbeda, jadi hasil ukur bisa berbeda.
2. **Satuan Baku** 📐: Satuan baku panjang adalah sentimeter dan meter. Satuan baku sama untuk semua orang.
3. **Penggaris** 📏: Penggaris adalah alat ukur panjang. Jarak dari satu angka ke angka berikutnya adalah satu sentimeter.
4. **Mulai dari Nol** 0️⃣: Letakkan ujung benda tepat di angka nol. Lalu lihat ujung benda yang lain berada di angka berapa.
5. **Membaca Panjang** 🔍: Angka di ujung benda yang lain adalah panjang benda. Ujung pensil di angka lima belas berarti panjang pensil lima belas sentimeter.
6. **Meteran** 🧰: Meteran dipakai untuk benda yang lebih panjang dari penggaris, seperti televisi, meja, dan pintu.
7. **Memilih Alat** ✅: Benda pendek diukur dengan penggaris. Benda panjang diukur dengan meteran. Pilih alat yang tepat.
8. **Ukuran Wajar** 🧭: Panjang pensil sekitar lima belas sentimeter. Tinggi pintu sekitar dua meter. Perkirakan dulu supaya satuannya tepat.
9. **Selisih Panjang** ↔️: Untuk membandingkan dua panjang, kurangkan panjang yang besar dengan yang kecil. Itulah selisihnya.
10. **Cara Mengukur** 📝: Empat langkah. Satu, pilih alat ukur yang tepat. Dua, letakkan ujung benda di angka nol. Tiga, baca angka di ujung yang lain. Empat, tulis hasilnya dengan satuan.

## 7. Tahap 4: Concrete (benda nyata)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 1 | Geser ke Angka Nol | `shift-to-zero` | hlm. 107 (Aktivitas 1, langkah 4 dan 5) | Menggeser benda sampai ujung kirinya tepat di angka 0 pada penggaris, lalu membaca panjangnya. | Tiga ronde, tiap ronde dua soal. Benda nyata di atas penggaris mulai dari angka selain nol. Siswa menekan geser kiri atau kanan sampai ujung benda di angka 0, lalu memilih panjang benda dari tiga pilihan. |
| 2 | Baca Panjang Benda | `read-length` | hlm. 107–108 (Aktivitas 1: tabel panjang benda) | Membaca panjang benda yang sudah dimulai dari angka 0 pada penggaris. | Tiga ronde, tiap ronde dua soal. Benda nyata di atas penggaris ditampilkan. Siswa memilih satu dari tiga panjang. Pengecoh salah satu sentimeter. |
| 3 | Ketuk Ujung Benda | `tap-end` | hlm. 107 (angka di ujung benda yang lain) | Mengetuk angka pada garis penggaris tempat ujung benda yang lain berhenti. | Tiga ronde, tiap ronde dua soal. Benda nyata di atas penggaris dimulai dari 0 dan panjangnya paling banyak 10 cm. Siswa mengetuk angka di ujung benda. |
| 4 | Pilih Alat Ukur | `choose-tool` | hlm. 115–117 (penggaris atau meteran) | Memilih alat ukur yang tepat untuk benda sehari-hari. | Tiga ronde, tiap ronde dua benda sehari-hari. Siswa memilih satu dari tiga alat ukur: penggaris, meteran, atau timbangan. |
| 5 | Jodohkan Benda dan Panjang | `match-object-length` | hlm. 111 (Ayo Berlatih 1: panjang benda dengan satuan baku) | Menjodohkan benda di atas penggaris dengan panjangnya. | Tiga ronde, tiap ronde tiga benda dan tiga panjang. Siswa mengetuk benda, lalu mengetuk panjang yang cocok. |
| 6 | Memori Benda dan Panjang | `memory-object-length` | hlm. 111 (Ayo Berlatih 1) | Mencocokkan benda di atas penggaris dengan panjangnya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. |
| 7 | Ketuk Benda dengan Panjang | `tap-object-length` | hlm. 111 (Ayo Berlatih 1) | Menemukan benda yang panjangnya sama dengan bilangan yang diminta. | Tiga ronde, tiap ronde tiga benda dan dua pertanyaan. Siswa mengetuk benda yang panjangnya sama dengan bilangan yang disebut. |
| 8 | Ketuk Semua yang Tepat dengan Alat | `tap-all-tool` | hlm. 113–114 dan 117 (centang benda yang tepat diukur) | Menemukan semua benda yang tepat diukur dengan penggaris atau meteran. | Tiga ronde, tiap ronde empat benda dan satu perintah. Siswa mengetuk semua benda yang cocok dengan alat yang disebut, lalu menekan Periksa. |
| 9 | Papan Panjang Benda | `board-length` | hlm. 111 (Ayo Berlatih 1) | Menulis panjang benda pada papan puluhan dan satuan. | Tiga ronde, tiap ronde dua soal. Siswa membaca panjang benda pada penggaris, lalu mengatur angka puluhan dan satuan pada papan dan menekan Periksa. |
| 10 | Urutkan Benda menurut Panjang | `order-length` | hlm. 118 (Ayo Berlatih 3: urutkan tinggi tanaman) | Mengurutkan tiga benda menurut panjangnya. | Tiga ronde, tiap ronde tiga benda di atas penggaris bertanda huruf. Siswa mengetuk benda satu per satu dari yang terpendek atau terpanjang. |

## 8. Tahap 5: Picture (diagram)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 11 | Geser Batang ke Nol | `shift-bar-zero` | hlm. 107 (Aktivitas 1, langkah 4 dan 5) | Menggeser batang polos sampai ujung kirinya tepat di angka 0, lalu membaca panjangnya. | Tiga ronde, tiap ronde dua soal. Batang polos di atas penggaris mulai dari angka selain nol. Siswa menekan geser kiri atau kanan sampai ujung batang di angka 0, lalu memilih panjang batang. |
| 12 | Baca Panjang Batang | `read-bar` | hlm. 107–108 (membaca panjang pada penggaris) | Membaca panjang batang yang dimulai dari angka 0 pada penggaris. | Tiga ronde, tiap ronde dua soal. Siswa memilih satu dari tiga panjang. Pengecoh salah satu sentimeter. |
| 13 | Ketuk Ujung Batang | `tap-bar-end` | hlm. 107 (angka di ujung yang lain) | Mengetuk angka pada garis penggaris tempat ujung batang berhenti. | Tiga ronde, tiap ronde dua soal. Batang polos dimulai dari 0 dan panjangnya paling banyak 10 cm. Siswa mengetuk angka di ujung batang. |
| 14 | Jodohkan Batang dan Panjang | `match-bar-length` | hlm. 111 (Ayo Berlatih 1) | Menjodohkan batang pada penggaris dengan panjangnya. | Tiga ronde, tiap ronde tiga batang dan tiga panjang. Siswa mengetuk batang, lalu mengetuk panjang yang cocok. |
| 15 | Memori Batang dan Panjang | `memory-bar-length` | hlm. 111 (Ayo Berlatih 1) | Mencocokkan batang pada penggaris dengan panjangnya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. |
| 16 | Pilah Panjang: Penggaris atau Meteran | `sort-length-tool` | hlm. 115–117 (penggaris atau meteran) | Memilah ukuran panjang menjadi yang cocok diukur dengan penggaris dan yang cocok dengan meteran. | Tiga ronde, tiap ronde enam ukuran (cm atau m) dan dua kotak. Panjang sampai 30 cm cocok dengan penggaris, selebihnya meteran. Siswa menyeret atau mengetuk ukuran ke kotak yang tepat. |
| 17 | Ketuk Semua Batang Lebih atau Kurang | `tap-all-bar-compare` | hlm. 118 (Ayo Berlatih 3: paling pendek dan paling tinggi) | Menemukan semua batang yang lebih atau kurang panjang dari bilangan acuan. | Tiga ronde, tiap ronde empat batang dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. |
| 18 | Urutkan Langkah Mengukur | `order-measure-steps` | hlm. 107 (Aktivitas 1: langkah mengukur) | Mengurutkan langkah mengukur panjang benda dengan penggaris atau meteran. | Tiga ronde, tiap ronde empat langkah. Siswa mengetuk langkah satu per satu menurut urutan yang benar. Letak jawaban berpindah. |
| 19 | Papan Panjang Batang | `board-bar-length` | hlm. 111 (Ayo Berlatih 1) | Menulis panjang batang pada papan puluhan dan satuan. | Tiga ronde, tiap ronde dua soal. Siswa membaca panjang batang pada penggaris, lalu mengatur angka puluhan dan satuan pada papan dan menekan Periksa. |
| 20 | Selisih Dua Batang | `bar-difference` | hlm. 118 (Ayo Berlatih 3: urutkan dan bandingkan) | Menghitung selisih panjang dua batang yang sama-sama dimulai dari angka 0. | Tiga ronde, tiap ronde dua soal. Dua batang pada satu penggaris ditampilkan. Siswa memilih satu dari tiga selisih panjang. |

## 9. Tahap 6: Abstract (kata dan angka)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 21 | Pilih Satuan Baku | `choose-unit` | hlm. 108 dan 115 (satuan baku sentimeter dan meter) | Memilih satuan baku yang tepat untuk mengukur panjang suatu benda. | Tiga ronde, tiap ronde dua soal. Siswa membaca benda yang diukur, lalu memilih satu dari tiga satuan. |
| 22 | Alat Ukur yang Tepat | `choose-tool-text` | hlm. 109–110 dan 121–122 (nama alat ukur dan satuan) | Memilih alat ukur yang tepat untuk mengukur suatu bagian atau benda. | Tiga ronde, tiap ronde dua soal. Siswa membaca benda yang diukur, lalu memilih satu dari tiga alat ukur. |
| 23 | Lengkapi Kalimat Pengukuran | `complete-measure-sentence` | hlm. 107–110 (cara mengukur dan satuan baku) | Melengkapi kalimat tentang cara mengukur dan alat ukur panjang. | Tiga soal, tiap soal tiga kalimat, misalnya satuan baku pada penggaris adalah ... Siswa memilih satu dari tiga kata. |
| 24 | Jodohkan Benda dan Alat Ukur | `match-tool-text` | hlm. 109–111 dan 121–122 (bagian yang diukur dan nama alat ukur) | Menjodohkan benda atau bagian yang diukur dengan alat ukurnya. | Tiga ronde, tiap ronde tiga benda dan tiga alat ukur. Siswa mengetuk benda, lalu mengetuk alat ukur yang cocok. |
| 25 | Memori Benda dan Ukuran Wajar | `memory-size` | hlm. 111–122 (memperkirakan panjang) | Mencocokkan benda dengan ukuran panjang yang wajar lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): benda dan ukurannya. Siswa membalik dua kartu dan mencari pasangannya. |
| 26 | Benar atau Salah: Pengukuran Panjang | `true-false-length` | hlm. 105–119 (penggaris, meteran, dan satuan baku) | Menilai pernyataan tentang pengukuran panjang dengan penggaris dan meteran. | Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Tiap jawaban diberi penjelasan. |
| 27 | Detektif Pengukuran | `detective-length` | hlm. 107–118 (membaca dan menghitung panjang) | Menemukan bilangan panjang dari dua petunjuk. | Empat soal. Siswa membaca petunjuk tentang angka pada penggaris dan satu ciri bilangan, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok. |
| 28 | Peta Konsep Pengukuran Panjang | `concept-map-length` | hlm. 104 (peta konsep Bab 3) | Melengkapi peta konsep alat ukur panjang dan cara mengukur. | Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. |
| 29 | Soal Cerita Pengukuran | `story-length` | hlm. 118 (Ayo Berlatih 3: tinggi tanaman dan perbandingan panjang) | Menyelesaikan soal cerita tentang selisih dan jumlah panjang dalam sentimeter. | Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita lalu memilih satu dari tiga hasil dalam sentimeter. |
| 30 | Susun Kata Pengukuran | `sentence-length` | hlm. 105–119 (pengertian pengukuran panjang) | Menyusun kalimat tentang pengukuran panjang dari kartu kata. | Empat kalimat. Siswa mengetuk kartu kata satu per satu menurut urutan kalimat yang benar. Ada satu kartu pengecoh. |

## 10. Poin penting, cara, kegiatan di rumah, dan refleksi

- 📐 **Satuan baku panjang**: sentimeter (cm) dan meter (m). *Suara:* Satuan baku panjang adalah sentimeter dan meter. Satuan baku sama untuk semua orang.
- 0️⃣ **Mulai dari nol**: ujung benda di angka 0. *Suara:* Letakkan ujung benda tepat di angka nol pada penggaris atau meteran.
- 🔍 **Baca panjang**: angka di ujung yang lain. *Suara:* Panjang benda adalah angka di ujung benda yang lain, ditulis dengan satuan.
- 📏 **Penggaris**: untuk benda pendek. *Suara:* Penggaris dipakai untuk mengukur benda yang pendek dan memakai satuan sentimeter.
- 🧰 **Meteran**: untuk benda panjang. *Suara:* Meteran dipakai untuk benda yang lebih panjang dari penggaris dan memakai satuan meter dan sentimeter.

Ringkasan suara: Ingat selalu! Satuan baku panjang adalah sentimeter dan meter. Letakkan ujung benda tepat di angka nol, lalu baca angka di ujung yang lain. Penggaris dipakai untuk benda pendek. Meteran dipakai untuk benda yang lebih panjang dari penggaris.

Cara menyebutkan: Cara mengukur. Pilih alat ukur yang tepat. Letakkan ujung benda di angka nol. Baca angka di ujung yang lain. Lalu tulis hasilnya dengan satuan. (pilih alat ukur, mulai dari nol, baca ujung lain, tulis satuan)

Ayo Mencoba di rumah: ukurlah panjang pensil, penghapus, dan buku tulismu dengan penggaris. Letakkan ujung benda di angka nol, baca angka di ujung yang lain, lalu tulis hasilnya dengan cm. Ukur juga tinggi pintu rumah dengan meteran bersama orang tuamu dan tulis hasilnya dengan satuan meter dan sentimeter.

Refleksi:
- Aku dapat memilih alat ukur yang tepat untuk benda pendek dan benda panjang.
- Aku dapat meletakkan ujung benda di angka nol.
- Aku dapat membaca panjang benda dan menulisnya dengan satuan.
- Aku dapat membandingkan dan mengurutkan panjang benda.
