# Naskah Matematika Kelas 3 SD, Bab 1: Bilangan Cacah sampai 1.000, Sub-Bab A: Bilangan dan Lambang Bilangan Cacah sampai 1.000

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k3b1.ts` dan `src/components/modul/data-k3b1.ts`, oleh `scripts/buat-naskah-md.mjs`. Isi mengikuti Buku Siswa Matematika Kelas III (Kemendikbudristek, Kurikulum Merdeka, Bab 1 hlm. 3–45) dan Buku Panduan Guru Bab 1, serta diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.

## 1. Identitas modul

- Kode bab: `k3-mat-bab1`, FASE_B, kelas 3.
- Judul: BAB 1: BILANGAN CACAH SAMPAI 1.000. Sub-Bab A: Bilangan dan Lambang Bilangan Cacah sampai 1.000.
- Suara Guru: Web Speech API perangkat saja, laju 0.7 dan nada 1. Tanpa ElevenLabs.
- Isi: 3 video cerita (9 adegan), 8 langkah peta pikiran, 10 panel infografis, 30 permainan (10 Concrete, 10 Picture, 10 Abstract), 5 poin penting.

## 2. Tujuan belajar

Siswa membaca bilangan cacah tiga angka sampai 1.000 dengan benar, termasuk bilangan yang memuat angka nol (703, 900, 405), serta menulis lambang bilangan dari kata bilangan. Siswa mengenal satuan, puluhan, dan ratusan lewat benda nyata dan model blok, memahami bahwa sepuluh satuan sama dengan satu puluhan dan sepuluh puluhan sama dengan satu ratusan, lalu memakai papan ratusan, puluhan, dan satuan.

- Capaian Pembelajaran: Siswa membaca, menulis, dan membandingkan bilangan cacah sampai 1.000. Pada sub-bab ini siswa membaca dan menulis bilangan cacah sampai 1.000 serta memahami satuan, puluhan, dan ratusan.
- Acuan: Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 1: Bilangan Cacah sampai 1.000, Sub-Bab A hlm. 3–17) dan Buku Panduan Guru Bab 1 Topik A.

## 3. Metode dari luar buku

- **Balok Dienes (blok satuan, batang puluhan, lempeng ratusan)**: bilangan dilihat sebagai benda yang bisa dihitung dan ditukar sepuluh-ke-satu. Dasar permainan Rakit Kemasan, Hitung Blok, dan Isi Tabel Blok.
- **Kemasan nyata (benda, bungkus, dus)**: satu bungkus berisi sepuluh benda dan satu dus berisi sepuluh bungkus. Penukaran otomatis saat siswa menekan tambah membuat aturan sepuluh-ke-satu terasa langsung.
- **Papan nilai tempat tiga kolom berwarna**: ratusan hijau, puluhan biru, satuan merah seperti di buku. Dasar permainan Papan dari Kumpulan, Papan dari Blok, dan Tulis Lambang di Papan.
- **Kartu angka (Montessori)**: siswa menyusun bilangan dengan tiga kartu pada tiga tempat. Dasar permainan Susun Tiga Kartu dan tantangan Ayo Berpikir (900 bilangan bila angka boleh berulang, 648 bila tidak).
- **Garis bilangan ratusan**: bilangan ditemukan pada garis berloncatan seratus atau sepuluh sebagai persiapan membandingkan dan mengurutkan.
- **Miskonsepsi angka nol**: Buku Panduan Guru menyebut kesalahan membaca nol di tempat ratusan atau puluhan. Pengecoh sengaja memuat 160 dan 106, 405 dan 450, 703 dan 730.

## 4. Tahap 1: Story (video cerita animasi SVG)

Tiap video diputar satu per satu saat siswa mengetuk Putar. Tidak ada yang berjalan sendiri. Kalimat dibacakan Suara Guru satu per satu (ketukan), dan gambar berubah mengikuti ketukan.

### K3B1A-V1. Tongkat Pramuka Alfa (Dari satuan ke ratusan)

**K3B1A-V1-1. Kegiatan Pramuka**

1. Galih, Alen, dan Alfa mengikuti kegiatan Pramuka. Alfa terpilih menjadi ketua barung. *(papan: Kegiatan Pramuka)*
2. Alfa membawa tongkat yang di atasnya terikat bendera sebagai tanda barung. *(papan: Tongkat barung)*
3. Tongkat itu selalu dibawanya saat kegiatan Pramuka. *(papan: Selalu dibawa)*
4. Menurut kalian, berapa panjang tongkat yang dibawa Alfa? *(papan: Berapa panjangnya?)*

**K3B1A-V1-2. Satuan, puluhan, ratusan**

1. Kita ingat dulu. Satu kotak kecil adalah satu satuan. *(papan: 1 satuan)*
2. Sepuluh satuan dapat disebut satu puluhan, seperti satu batang. *(papan: 10 satuan = 1 puluhan)*
3. Sepuluh batang puluhan ditumpuk menjadi seratus satuan. *(papan: 10 puluhan = 100 satuan)*
4. Seratus satuan disebut satu ratusan, seperti satu lembar besar. *(papan: 100 satuan = 1 ratusan)*

**K3B1A-V1-3. Tongkat 160 sentimeter**

1. Panjang tongkat Alfa adalah seratus enam puluh sentimeter, ditulis 160. *(papan: Tongkat 160 cm)*
2. Kita taruh di papan nilai tempat. Ratusan satu, puluhan enam, satuan nol. *(papan: 1 ratusan, 6 puluhan, 0 satuan)*
3. Kita baca ratusan lebih dulu, yaitu seratus. Lalu puluhan, yaitu enam puluh. *(papan: Seratus + enam puluh)*
4. Satuannya nol, jadi tidak dibaca. Bilangan 160 dibaca seratus enam puluh. *(papan: Nol tidak dibaca)*

### K3B1A-V2. Perjalanan Meutia (Membaca bilangan tiga angka)

**K3B1A-V2-1. Berjalan ke sekolah**

1. Meutia berangkat ke sekolah dengan berjalan kaki bersama teman-teman. *(papan: Berjalan ke sekolah)*
2. Jarak rumah Meutia ke sekolah adalah enam ratus tujuh puluh satu meter. *(papan: 671 meter)*
3. Berjalan kaki menyehatkan badan, dan Meutia sangat senang berjalan kaki. *(papan: Jalan kaki itu sehat)*
4. Kita menemukan sebuah bilangan tiga angka, yaitu 671. *(papan: Bilangan tiga angka)*

**K3B1A-V2-2. Minimarket 759 meter**

1. Di jalan lain ada papan bertuliskan 759 meter menuju minimarket. *(papan: Minimarket 759 m)*
2. Ambil kartu bilangan 7, kartu 5, dan kartu 9, lalu susun dari kiri ke kanan. *(papan: Kartu 7, 5, dan 9)*
3. Bacalah, tujuh ratus lima puluh sembilan. *(papan: Tujuh ratus lima puluh sembilan)*
4. Ratusan dibaca dengan kata ratus, puluhan dengan kata puluh, dan satuan dibaca angkanya. *(papan: Ratus, puluh, satuan)*

**K3B1A-V2-3. Bilangan dengan angka nol**

1. Perhatikan bilangan 703. Puluhannya nol, jadi tidak ada puluhan yang dibaca. *(papan: 703)*
2. 703 dibaca tujuh ratus tiga. Tidak dibaca tujuh ratus nol tiga. *(papan: Tujuh ratus tiga)*
3. Bilangan 900 dibaca sembilan ratus, sebab puluhan dan satuannya nol. *(papan: 900 = sembilan ratus)*
4. Bilangan 634 dibaca enam ratus tiga puluh empat. *(papan: 634)*

### K3B1A-V3. Taman Kota Alen (Menulis lambang bilangan)

**K3B1A-V3-1. Ke taman kota**

1. Setiap hari Minggu Alen bermain di taman kota dan berjalan kaki dari rumah. *(papan: Taman kota)*
2. Jarak rumah Alen ke taman kota adalah lima ratus tujuh puluh dua meter. *(papan: Lima ratus tujuh puluh dua)*
3. Bagaimana cara menulis lambang bilangan itu? *(papan: Menulis lambangnya)*
4. Dengarkan kata bilangannya, lalu tulis angkanya. *(papan: Dengar, lalu tulis)*

**K3B1A-V3-2. Menulis 354**

1. Kita akan menulis tiga ratus lima puluh empat. *(papan: Tiga ratus lima puluh empat)*
2. Tentukan angka ratusan, yaitu tiga, tulis 3. *(papan: Ratusan: 3)*
3. Tentukan angka puluhan, yaitu lima, tulis 5. Lalu angka satuan, yaitu empat, tulis 4. *(papan: Puluhan: 5, satuan: 4)*
4. Jadi, bilangan tersebut adalah 354. *(papan: 354)*

**K3B1A-V3-3. Nol penjaga tempat**

1. Bagaimana menulis empat ratus lima? Tidak ada puluhan, jadi puluhannya nol. *(papan: Empat ratus lima)*
2. Kita tulis 4 di ratusan, 0 di puluhan, dan 5 di satuan, yaitu 405. *(papan: 4, nol, dan 5)*
3. Kalau nolnya dihilangkan menjadi 45, dan nilainya berubah jauh. *(papan: Tanpa nol: 45)*
4. Nol menjaga tempat puluhan supaya angka lain tetap berada di tempatnya. *(papan: Nol penjaga tempat)*

## 5. Tahap 2: Mind map (peta pikiran)

**1. Puluhan dan Satuan** 🧊 (Puluhan dan satuan → Seratus dan ratusan)

Kita mengingat bilangan dua angka dulu. Satu kotak kecil adalah satu satuan. Sepuluh satuan dapat disebut satu puluhan, seperti satu batang yang berisi sepuluh kotak kecil. Bilangan 22 terdiri atas 2 puluhan dan 2 satuan, yaitu sepuluh satuan ditambah sepuluh satuan ditambah dua satuan. Dasar ini dipakai terus pada bilangan tiga angka.

**2. Seratus dan Ratusan** 💯 (Seratus dan ratusan → Papan tiga tempat)

Sepuluh tumpukan dari sepuluh satuan adalah seratus satuan. Seratus satuan disebut satu ratusan. Sepuluh puluhan juga sama dengan satu ratusan, seperti sepuluh batang yang dirapatkan menjadi satu lembar besar berisi seratus kotak kecil. Dari seratus, kita mulai mengenal bilangan tiga angka.

**3. Papan Tiga Tempat** 🗂️ (Papan tiga tempat → Membaca bilangan)

Bilangan tiga angka menempati tiga tempat. Dari kiri ke kanan: ratusan, puluhan, dan satuan. Angka pada tiap tempat menunjukkan berapa banyak ratusan, puluhan, atau satuan. Satu ratusan, lima puluhan, dan dua satuan ditulis 152. Papan nilai tempat membantu kita tidak tertukar membaca angka.

**4. Membaca Bilangan Tiga Angka** 🗣️ (Membaca bilangan → Angka nol)

Bacalah dari kiri ke kanan, tempat demi tempat. Angka ratusan dibaca dengan kata ratus, angka puluhan dengan kata puluh, dan angka satuan dibaca angkanya saja. Bilangan 671 dibaca enam ratus tujuh puluh satu. Satu ratusan dibaca seratus, bukan satu ratus, jadi 160 dibaca seratus enam puluh. Angka puluhan yang berpasangan dengan satuan sepuluh sampai sembilan belas punya nama khusus, misalnya 112 dibaca seratus dua belas.

**5. Angka Nol Tidak Dibaca** ⭕ (Angka nol → Menulis lambang bilangan)

Angka nol berarti tidak ada ratusan, puluhan, atau satuan di tempat itu. Nol pada tempat puluhan tidak dibaca, sehingga 703 dibaca tujuh ratus tiga. Nol pada tempat satuan juga tidak dibaca, sehingga 160 dibaca seratus enam puluh. Bila puluhan dan satuan sama-sama nol, 900 dibaca sembilan ratus. Kesalahan yang sering terjadi adalah membaca nol dengan kata nol, seperti tujuh ratus nol tiga.

**6. Menulis Lambang Bilangan** ✍️ (Menulis lambang bilangan → Menyusun dari kartu angka)

Untuk menulis, dengarkan kata bilangannya lalu cari angka tiap tempat. Kata ratus menunjukkan angka ratusan, kata puluh menunjukkan angka puluhan, dan angka di belakangnya adalah satuan. Lima ratus tujuh puluh dua ditulis 572. Bila tidak ada kata puluh, tulis nol di tempat puluhan: empat ratus lima ditulis 405, bukan 45.

**7. Menyusun dari Kartu Angka** 🃏 (Menyusun dari kartu angka → Bilangan di sekitar kita)

Kartu angka 0 sampai 9 dapat disusun menjadi bilangan tiga angka. Angka pertama tidak boleh nol, karena bilangan tiga angka dimulai dari ratusan. Dari kartu 3, 5, dan 1 kita dapat menyusun 351, 315, 531, 513, 135, dan 153. Letak kartu menentukan nilai bilangan. Tantangan Ayo Berpikir: bila angka boleh berulang ada 900 bilangan tiga angka, dan bila tidak boleh berulang ada 648 bilangan.

**8. Bilangan di Sekitar Kita** 📏 (Bilangan di sekitar kita → Siap membaca dan menulis)

Bilangan tiga angka ada di mana-mana. Jarak rumah ke sekolah 671 meter, panjang tongkat 160 sentimeter, tinggi badan 127 sentimeter, kecepatan kereta 220 kilometer per jam, atau nomor antrean. Membaca dan menulisnya dengan benar membantu kita bercerita tentang ukuran dan banyak benda. Selalu mulai dari kiri: ratusan, puluhan, lalu satuan.

## 6. Tahap 3: Infografis

1. **Satuan, Puluhan, Ratusan** 🧊: Satu kotak kecil adalah satu satuan. Sepuluh satuan adalah satu puluhan. Sepuluh puluhan adalah satu ratusan, yaitu seratus satuan.
2. **Seratus Satuan** 💯: Sepuluh tumpukan dari sepuluh satuan adalah seratus satuan. Seratus satuan disebut satu ratusan.
3. **Papan Tiga Tempat** 🗂️: Bilangan tiga angka punya tiga tempat. Dari kiri ke kanan: ratusan berwarna hijau, puluhan berwarna biru, dan satuan berwarna merah.
4. **Kata Ratusan** 🔢: Satu ratusan dibaca seratus. Dua ratusan dibaca dua ratus, tiga ratusan dibaca tiga ratus, dan seterusnya sampai sembilan ratus.
5. **Kata Puluhan** 🔟: Puluhan dibaca dua puluh, tiga puluh, sampai sembilan puluh. Sepuluh, sebelas, dan dua belas sampai sembilan belas punya nama sendiri.
6. **Membaca 160** 🚩: Ratusan satu dibaca seratus, puluhan enam dibaca enam puluh, dan satuan nol tidak dibaca. Jadi 160 dibaca seratus enam puluh.
7. **Angka Nol** ⭕: Nol berarti tidak ada. Tujuh ratus tiga ditulis 703, sembilan ratus ditulis 900, dan nol tidak dibaca sebagai kata nol.
8. **Menulis 572** ✍️: Dengarkan lima ratus tujuh puluh dua. Ratusan lima, puluhan tujuh, satuan dua. Jadi ditulis 572.
9. **Bilangan di Sekitar Kita** 📏: Jarak 671 meter, panjang tongkat 160 sentimeter, tinggi badan 127 sentimeter, dan kecepatan 220 kilometer per jam adalah bilangan tiga angka.
10. **Cara Membaca dan Menulis** 📝: Empat langkah. Satu, cari tempat tiap angka. Dua, baca ratusan, puluhan, lalu satuan. Tiga, lewati angka nol. Empat, saat menulis, isi tempat yang kosong dengan nol.

## 7. Tahap 4: Concrete (benda nyata)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 1 | Rakit Kemasan | `build-with-exchange` | hlm. 5–7 (10 satuan menjadi 1 puluhan, 10 puluhan menjadi 1 ratusan) | Merakit bilangan tiga angka dengan dus, bungkus, dan benda lepas, serta menukar sepuluh kemasan menjadi satu kemasan lebih besar. | Tiga ronde, tiap ronde dua bilangan yang dibacakan dengan kata. Siswa menekan tambah atau kurang pada dus, bungkus, dan benda lepas. Sepuluh benda otomatis ditukar menjadi satu bungkus, dan sepuluh bungkus menjadi satu dus. Siswa menekan Periksa. |
| 2 | Hitung Kemasan | `count-packages` | hlm. 6–7 (berapa banyak kotak di bawah ini) | Menghitung dus, bungkus, dan benda lepas lalu memilih lambang bilangannya. | Tiga ronde, tiap ronde dua soal. Gambar menampilkan dus, bungkus, dan benda lepas. Siswa memilih satu dari tiga bilangan. Pengecoh menukar tempat angka. |
| 3 | Pilah Kemasan | `sort-packages` | hlm. 5–6 (satuan, puluhan, ratusan) | Memilah kemasan menurut nilainya: benda lepas satuan, bungkus puluhan, dus ratusan. | Tiga ronde, tiap ronde enam kelompok kemasan dan tiga kotak: ratusan, puluhan, satuan. Siswa menyeret atau mengetuk kelompok ke kotak yang tepat. |
| 4 | Jodohkan Kemasan dan Bilangan | `match-package-number` | hlm. 6–7 (banyak ratusan, puluhan, dan satuan pada papan) | Menjodohkan kumpulan kemasan dengan lambang bilangannya. | Tiga ronde, tiap ronde tiga kumpulan dan tiga bilangan. Siswa mengetuk kumpulan, lalu mengetuk bilangan yang cocok. Pasangan benar terkunci. |
| 5 | Memori Kemasan dan Bilangan | `memory-package-number` | hlm. 6–7 (benda dan lambang bilangan yang sama) | Mencocokkan kumpulan kemasan dengan lambang bilangannya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): kumpulan kemasan dan lambang bilangan. Siswa membalik dua kartu dan mencari pasangannya. |
| 6 | Ketuk Kumpulan yang Dibaca | `tap-read-package` | hlm. 9–11 (membaca bilangan tiga angka) | Mendengar kata bilangan lalu menemukan kumpulan benda yang bilangannya sama. | Tiga ronde, tiap ronde tiga kumpulan yang mirip (misalnya 160, 106, 610) dan dua pertanyaan membaca. Siswa mengetuk kumpulan yang tepat. |
| 7 | Ketuk Semua yang Cocok | `tap-all-packages` | hlm. 17 (angka puluhan kurang dari 3, angka satuan lebih dari 7) | Menemukan semua kumpulan yang memenuhi syarat angka tertentu, termasuk angka nol. | Tiga ronde, tiap ronde empat kumpulan dan satu perintah, misalnya tanpa bungkus atau tanpa benda lepas. Siswa mengetuk semua yang cocok, lalu menekan Periksa. |
| 8 | Baca Kumpulan | `read-package-words` | hlm. 9–11 (cara membaca bilangan tiga angka) | Membaca kumpulan benda dengan kata bilangan yang benar, termasuk bilangan dengan angka nol. | Tiga ronde, tiap ronde dua soal. Gambar menampilkan kumpulan, misalnya 703 atau 405. Siswa memilih satu dari tiga cara membaca. Pengecoh membaca nol atau menukar tempat. |
| 9 | Papan dari Kumpulan | `board-from-package` | hlm. 6–7 (papan ratusan, puluhan, satuan) | Mengisi papan ratusan, puluhan, dan satuan dari kumpulan benda. | Tiga ronde, tiap ronde dua soal. Siswa menghitung dus, bungkus, dan benda lepas, lalu mengatur tiga angka pada papan dan menekan Periksa. |
| 10 | Tukar Kemasan | `exchange-packages` | hlm. 5–6 (10 satuan = 1 puluhan, 100 satuan = 1 ratusan) | Memahami penukaran sepuluh benda menjadi satu bungkus dan sepuluh bungkus menjadi satu dus. | Tiga ronde, tiap ronde dua soal. Siswa memilih hasil penukaran atau isi satu kemasan dari tiga pilihan, dengan gambar kemasan sebagai petunjuk. |

## 8. Tahap 5: Picture (diagram)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 11 | Hitung Blok | `count-blocks` | hlm. 6–7 (banyak ratusan, puluhan, satuan pada model) | Membaca model blok menjadi lambang bilangan. | Tiga ronde, tiap ronde dua soal. Gambar menampilkan blok ratusan, batang puluhan, dan kotak satuan. Siswa memilih satu dari tiga bilangan. |
| 12 | Papan dari Blok | `board-from-blocks` | hlm. 15 (isilah titik-titik berdasarkan gambar) | Mengisi papan ratusan, puluhan, dan satuan dari model blok. | Tiga ronde, tiap ronde dua soal. Siswa mengatur tiga angka pada papan sesuai blok, lalu menekan Periksa. |
| 13 | Isi Tabel Blok | `fill-block-table` | hlm. 23 (lengkapi tabel dengan bilangan yang sesuai nilai tempatnya) | Mengisi angka ratusan, puluhan, dan satuan pada tabel dari model blok. | Tiga tabel dengan tiga baris. Tiap baris menampilkan model blok. Siswa mengetuk sel untuk memutar angkanya, lalu menekan Periksa. |
| 14 | Jodohkan Blok dan Bilangan | `match-block-number` | hlm. 6–7 dan 15 (blok dan lambang bilangan) | Menjodohkan model blok dengan lambang bilangannya. | Tiga ronde, tiap ronde tiga model dan tiga bilangan. Siswa mengetuk model, lalu mengetuk bilangan yang cocok. |
| 15 | Memori Blok dan Kata | `memory-block-word` | hlm. 10–11 (cara membaca bilangan) | Mencocokkan model blok dengan kata bilangannya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): model blok dan kata bilangan. Siswa membalik dua kartu dan mencari pasangannya. |
| 16 | Ketuk Blok yang Dibaca | `tap-block-read` | hlm. 9–11 (membaca bilangan tiga angka) | Mendengar kata bilangan lalu mengetuk model blok yang sesuai. | Tiga ronde, tiap ronde tiga model yang mirip dan dua pertanyaan. Siswa mengetuk model yang bilangannya sama dengan kata yang dibacakan. |
| 17 | Garis Bilangan: Ketuk Bilangan | `number-line-read` | hlm. 10–14 (membaca dan menulis bilangan) | Menemukan letak sebuah bilangan pada garis bilangan ratusan atau puluhan. | Tiga ronde, tiap ronde dua soal. Siswa mendengar kata bilangan, lalu mengetuk bilangan itu pada garis bilangan yang langkahnya seratus atau sepuluh. |
| 18 | Ketuk Semua Blok | `tap-all-blocks` | hlm. 17 (bilangan dengan syarat angka tertentu) | Menemukan semua model blok yang memenuhi syarat angka tertentu. | Tiga ronde, tiap ronde empat model dan satu perintah, misalnya angka puluhannya 0. Siswa mengetuk semua yang cocok, lalu menekan Periksa. |
| 19 | Pilah Blok: Ada Nol atau Tidak | `sort-zero-blocks` | hlm. 13–14 (angka nol pada nilai tempat) | Memilah model blok menjadi yang memuat angka nol dan yang tidak. | Tiga ronde, tiap ronde enam model dan dua kotak: ada angka nol dan tanpa angka nol. Siswa menyeret atau mengetuk model ke kotak yang tepat. |
| 20 | Lengkapi Kalimat Blok | `complete-block-sentence` | hlm. 6–7 (berapa banyak ratusan, puluhan, satuan) | Melengkapi kalimat tentang banyak ratusan, puluhan, dan satuan pada sebuah model. | Tiga model, tiap model tiga kalimat. Siswa memilih satu dari tiga angka untuk bagian kosong. Kalimat lengkap dibacakan. |

## 9. Tahap 6: Abstract (kata dan angka)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 21 | Susun Tiga Kartu | `compose-three-cards` | hlm. 7–8 dan 12 (kartu bilangan; Ayo Berpikir) | Menulis lambang bilangan dari kata bilangan dengan menyusun tiga kartu angka. | Tiga ronde, tiap ronde dua soal. Siswa membaca kata bilangan, lalu mengetuk kartu angka dan mengetuk tempat ratusan, puluhan, atau satuan. Diperiksa otomatis. |
| 22 | Baca Bilangan | `read-number-choice` | hlm. 9–11 (cara membaca bilangan tiga angka) | Memilih cara membaca yang benar untuk sebuah lambang bilangan. | Tiga ronde, tiap ronde dua soal. Siswa melihat lambang bilangan dan memilih satu dari tiga cara membaca. Pengecoh menukar angka atau membaca nol. |
| 23 | Tulis Lambang di Papan | `write-on-board` | hlm. 13–14 (menulis lambang bilangan) | Menulis lambang bilangan dari kata bilangan pada papan ratusan, puluhan, dan satuan. | Tiga ronde, tiap ronde dua soal. Siswa membaca kata bilangan lalu mengatur tiga angka pada papan dan menekan Periksa. |
| 24 | Jodohkan Angka dan Kata | `match-number-word` | hlm. 17 (pasangkan lambang bilangan dan cara membacanya) | Menjodohkan lambang bilangan dengan cara membacanya. | Tiga ronde, tiap ronde tiga pasang. Siswa mengetuk lambang bilangan di kiri, lalu mengetuk kata bilangan di kanan. |
| 25 | Memori Angka dan Kata | `memory-number-word` | hlm. 17 (lambang bilangan dan cara membacanya) | Mencocokkan lambang bilangan dengan kata bilangannya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): lambang bilangan dan kata bilangan. Siswa membalik dua kartu dan mencari pasangannya. |
| 26 | Isi Tabel Cara Membaca | `fill-reading-table` | hlm. 18 (tabel bilangan, ditulis, cara membaca) | Melengkapi tabel bilangan dan cara membacanya. | Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu cara membaca yang tepat. Ada satu kartu pengecoh. |
| 27 | Benar atau Salah: Membaca dan Menulis | `true-false-reading` | hlm. 5–14 (satuan, ratusan, angka nol) | Menilai pernyataan tentang satuan, ratusan, membaca, dan menulis bilangan tiga angka. | Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan dihitung dari bilangan, dan tiap jawaban diberi penjelasan singkat. |
| 28 | Detektif Bilangan | `detective-number` | hlm. 12–14 (menyusun bilangan tiga angka dari kartu) | Menemukan bilangan dari dua petunjuk tentang angka-angkanya. | Empat soal. Siswa membaca petunjuk seperti ratusanku 6 dan satuanku 1, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok dengan semua petunjuk. |
| 29 | Ketuk Semua yang Cocok: Angka | `select-all-numbers` | hlm. 17 (angka puluhan kurang dari 3; angka satuan lebih dari 7; angka ratusan kurang dari 5) | Memilih semua bilangan yang memenuhi syarat tentang angka tertentu. | Tiga ronde, tiap ronde empat bilangan dan satu perintah. Siswa mengetuk semua bilangan yang cocok, lalu menekan Periksa. |
| 30 | Susun Kata Bilangan | `build-number-sentence` | hlm. 13–14 dan 10–11 (membaca dan menulis bilangan) | Menyusun kata menjadi kalimat tentang membaca dan menulis bilangan. | Empat kalimat, misalnya seratus enam puluh ditulis 160. Kartu kata diketuk berurutan. Satu kartu pengecoh tidak dipakai. |

## 10. Poin penting, cara, kegiatan di rumah, dan refleksi

- 🧊 **Sepuluh jadi satu**: 10 satuan = 1 puluhan, 10 puluhan = 1 ratusan. *Suara:* Sepuluh satuan sama dengan satu puluhan, dan sepuluh puluhan sama dengan satu ratusan.
- 🗂️ **Tiga tempat**: ratusan, puluhan, satuan. *Suara:* Bilangan tiga angka punya tiga tempat, yaitu ratusan, puluhan, dan satuan, dari kiri ke kanan.
- 🗣️ **Satu ratusan dibaca seratus**: 160 dibaca seratus enam puluh. *Suara:* Satu ratusan dibaca seratus. Bilangan 160 dibaca seratus enam puluh.
- ⭕ **Nol tidak dibaca**: 703 dibaca tujuh ratus tiga. *Suara:* Angka nol berarti tidak ada, jadi nol tidak dibaca. Bilangan 703 dibaca tujuh ratus tiga.
- ✍️ **Nol menjaga tempat**: empat ratus lima ditulis 405. *Suara:* Saat menulis, nol menjaga tempat yang kosong. Empat ratus lima ditulis 405, bukan 45.

Ringkasan suara: Ingat selalu! Sepuluh satuan sama dengan satu puluhan, dan sepuluh puluhan sama dengan satu ratusan. Bilangan tiga angka punya tiga tempat, yaitu ratusan, puluhan, dan satuan. Satu ratusan dibaca seratus. Angka nol tidak dibaca, tetapi saat menulis, nol menjaga tempat yang kosong.

Cara menyebutkan: Cara membaca. Lihat angka ratusan, lalu puluhan, lalu satuan. Baca ratusan, baca puluhan, baca satuan, dan lewati angka nol. (ratusan, puluhan, satuan, lewati nol)

Ayo Mencoba di rumah: cari lima bilangan tiga angka di sekitarmu, misalnya nomor halaman buku, nomor antrean, atau jarak pada papan petunjuk. Tulis tiap bilangan, tandai angka ratusan, puluhan, dan satuannya dengan tiga warna, lalu bacakan kepada keluargamu.

Refleksi:
- Aku dapat membaca bilangan tiga angka dengan benar.
- Aku dapat menulis lambang bilangan dari kata bilangan.
- Aku teliti saat ada angka nol.
- Aku berani menjelaskan caraku kepada teman.
