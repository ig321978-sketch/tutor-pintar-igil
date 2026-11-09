# Naskah Matematika Kelas 3 SD, Bab 4: Unsur-Unsur Bangun Datar, Sub-Bab A: Sisi pada Bangun Datar

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k3b4.ts` dan `src/components/modul/data-k3b4.ts`, oleh `scripts/buat-naskah-md.mjs`. Isi mengikuti Buku Siswa Matematika Kelas III (Kemendikbudristek, Kurikulum Merdeka, Bab 4 hlm. 143–185) dan Buku Panduan Guru Bab 4, serta diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.

## 1. Identitas modul

- Kode bab: `k3-mat-bab4`, FASE_B, kelas 3.
- Judul: BAB 4: UNSUR-UNSUR BANGUN DATAR. Sub-Bab A: Sisi pada Bangun Datar.
- Suara Guru: Web Speech API perangkat saja, laju 0.7 dan nada 1. Tanpa ElevenLabs.
- Isi: 3 video cerita (9 adegan), 8 langkah peta pikiran, 10 panel infografis, 30 permainan (10 Concrete, 10 Picture, 10 Abstract), 5 poin penting.

## 2. Tujuan belajar

Siswa mengenal titik, sinar garis, garis, ruas garis, dan kurva (garis lengkung), mengukur panjang ruas garis dengan penggaris dalam sentimeter dan milimeter (1 cm = 10 mm), menulis panjang seperti 5 cm 5 mm = 5,5 cm, menggambar ruas garis dengan ukuran tertentu, serta mengenal sisi sebagai ruas garis pembatas bangun datar dan menghitung banyak sisinya.

- Capaian Pembelajaran: Siswa menggambar dan menjelaskan unsur-unsur bangun datar. Pada sub-bab ini siswa mengenal ruas garis, mengukur panjangnya, dan mengenal sisi bangun datar.
- Acuan: Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 4: Unsur-Unsur Bangun Datar, Sub-Bab A hlm. 146–153) dan Buku Panduan Guru Bab 4 Topik A.

## 3. Metode dari luar buku

- **Benda nyata yang menyerupai bangun datar**: buku, bingkai foto, kartu, televisi, ponsel, penggaris segitiga, rambu, dan rambu berhenti dipakai untuk menghitung sisi. Benda bundar (jam, kue, papan sasaran) sengaja dipakai sebagai pengecoh karena tidak punya sisi lurus.
- **Titik, garis, sinar garis, ruas garis, dan kurva**: sinar senter, rel kereta api, pensil, penggaris, dan pelangi dihubungkan dengan jenisnya. Di tahap Picture hanya gambar garis polos berhuruf yang dipakai.
- **Mengukur ruas garis dalam cm dan mm**: penggaris dengan garis milimeter dipakai untuk membaca panjang seperti 5 cm 5 mm. Panjang benda dan ruas garis dibatasi kelipatan 5 mm dan paling banyak 14,5 cm agar mudah dibaca.
- **Hubungan 1 cm = 10 mm**: dipakai untuk mengubah 5 cm 5 mm menjadi 55 mm atau 5,5 cm. Pengecoh sengaja memuat salah seratus (1 cm = 100 mm) dan salah nol (3 cm 7 mm = 3,07 cm).
- **Sisi bangun datar bernama huruf**: segitiga EFG memiliki sisi EF, FG, dan EG. Permainan Sisi Bangun Datar melatih menyebut semua sisi dengan titik sudut yang bersebelahan.
- **Bangun datar polos di tahap Picture**: segitiga, persegi, segilima, segienam, dan segidelapan digambar sebagai diagram polos tanpa gambar benda. Tabel dan ketuk bangun melatih banyak sisi.

## 4. Tahap 1: Story (video cerita animasi SVG)

Tiap video diputar satu per satu saat siswa mengetuk Putar. Tidak ada yang berjalan sendiri. Kalimat dibacakan Suara Guru satu per satu (ketukan), dan gambar berubah mengikuti ketukan.

### K3B4A-V1. Titik dan Garis (Sinar garis, garis, dan ruas garis)

**K3B4A-V1-1. Mengingat garis**

1. Kita sudah mengenal garis lurus dan garis lengkung di Kelas 2. *(papan: Garis lurus dan lengkung)*
2. Garis lengkung juga disebut kurva. *(papan: Garis lengkung = kurva)*
3. Sekarang kita kenali sinar garis, garis, dan ruas garis. *(papan: Sinar, garis, ruas garis)*
4. Semuanya dibuat dari titik-titik yang berurutan. *(papan: Dibuat dari titik)*

**K3B4A-V1-2. Sinar garis dan garis**

1. Sinar garis AB berpangkal di titik A dan menuju titik B. *(papan: Sinar garis AB)*
2. Sinar garis hanya dapat diperpanjang ke satu sisi. *(papan: Satu sisi saja)*
3. Garis CD dapat diperpanjang ke kedua sisi. *(papan: Garis CD: kedua sisi)*
4. Garis tidak punya ujung, jadi panjangnya tak terhingga. *(papan: Tidak punya ujung)*

**K3B4A-V1-3. Ruas garis**

1. Ruas garis KL memiliki dua titik ujung. *(papan: Ruas garis KL)*
2. Ruas garis memiliki panjang tertentu atau tetap. *(papan: Panjang tetap)*
3. Ruas garis ditulis dengan dua huruf, yaitu KL. *(papan: Ditulis KL)*
4. Panjang ruas garis dapat diukur dengan penggaris. *(papan: Diukur dengan penggaris)*

### K3B4A-V2. Dua Titik dan Kurva (Banyak jalan antara dua titik)

**K3B4A-V2-1. Dua titik**

1. Ada dua titik berbeda, yaitu P dan Q. *(papan: Titik P dan Q)*
2. Kedua titik itu hanya dapat dihubungkan dengan satu ruas garis lurus. *(papan: Satu ruas garis lurus)*
3. Ruas garis itu adalah PQ. *(papan: Ruas garis PQ)*
4. Penggaris dipakai untuk menggambarnya. *(papan: Digambar dengan penggaris)*

**K3B4A-V2-2. Banyak kurva**

1. Titik E dan F dapat dihubungkan dengan garis lengkung. *(papan: Titik E dan F)*
2. Ada kurva hijau, merah, dan biru. *(papan: Hijau, merah, biru)*
3. Kurva yang menghubungkan E dan F tak terhingga banyaknya. *(papan: Kurva tak terhingga)*
4. Jadi ruas garis hanya satu, tetapi kurva ada banyak. *(papan: Ruas satu, kurva banyak)*

**K3B4A-V2-3. Bukan kurva**

1. Perhatikan gambar yang tampak melengkung ini. *(papan: Tampak melengkung)*
2. Ternyata gambar itu gabungan empat ruas garis. *(papan: Gabungan empat ruas)*
3. Ruas garisnya adalah PK, KL, LM, dan MQ. *(papan: PK, KL, LM, MQ)*
4. Gabungan ruas garis bukan garis lengkung. *(papan: Bukan garis lengkung)*

### K3B4A-V3. Mengukur Ruas Garis (Aktivitas 1: penggaris, cm, dan mm)

**K3B4A-V3-1. Sentimeter dan milimeter**

1. Penggaris memiliki satuan sentimeter dan garis-garis kecil. *(papan: cm dan garis kecil)*
2. Garis kecil membagi satu sentimeter menjadi 10 bagian. *(papan: Satu cm jadi 10 bagian)*
3. Tiap bagian kecil adalah satu milimeter. *(papan: Satu bagian = 1 mm)*
4. Jadi 1 cm sama dengan 10 mm. *(papan: 1 cm = 10 mm)*

**K3B4A-V3-2. Mengukur AB**

1. Letakkan angka 0 penggaris tepat di titik A. *(papan: Angka 0 di titik A)*
2. Lihat angka yang sejajar dengan titik B. *(papan: Lihat angka di titik B)*
3. Angkanya 5, jadi AB sama dengan 5 cm. *(papan: AB = 5 cm)*
4. Untuk MN: 5 cm dan 5 mm, yaitu 5,5 cm. *(papan: MN = 5,5 cm)*

**K3B4A-V3-3. Ruas garis dan sisi**

1. Segitiga EFG dibatasi tiga ruas garis: EF, FG, dan EG. *(papan: Segitiga EFG)*
2. Ruas garis pembatas bangun datar dinamakan sisi. *(papan: Ruas garis = sisi)*
3. Jadi segitiga memiliki tiga sisi. *(papan: Segitiga: 3 sisi)*
4. Bangun segiempat memiliki empat sisi. *(papan: Segiempat: 4 sisi)*

## 5. Tahap 2: Mind map (peta pikiran)

**1. Mengingat Titik dan Garis** 🔙 (Mengingat titik dan garis → Sinar garis, garis, dan ruas garis)

Sebelum mempelajari unsur-unsur bangun datar, kita mengingat garis lurus dan garis lengkung atau kurva yang sudah dipelajari di Kelas 2. Kita juga akan mengenal sinar garis, ruas garis, dan sisi bangun datar. Semua garis dibuat dari titik-titik yang berurutan, dan nama titik ditulis dengan huruf kapital.

**2. Sinar Garis, Garis, dan Ruas Garis** 📏 (Sinar garis, garis, dan ruas garis → Kurva atau garis lengkung)

Sinar garis AB berpangkal di titik A dan hanya dapat diperpanjang ke satu sisi. Garis CD dapat diperpanjang ke kedua sisi tanpa ujung. Ruas garis KL memiliki dua titik ujung dan panjang tertentu. Ketiganya ditulis dengan dua huruf, tetapi bentuk gambarnya berbeda: sinar garis memakai satu anak panah, garis dua anak panah, dan ruas garis tanpa anak panah.

**3. Kurva atau Garis Lengkung** 🌈 (Kurva atau garis lengkung → Dua titik dan ruas garis)

Garis yang melengkung disebut kurva. Kurva dapat berbentuk seperti busur atau seperti huruf S. Dua titik yang sama dapat dihubungkan oleh banyak kurva. Pada gambar, titik E dan F dihubungkan oleh tiga kurva berwarna hijau, merah, dan biru, dan kurva yang mungkin sebenarnya tak terhingga banyaknya.

**4. Dua Titik dan Ruas Garis** 🔗 (Dua titik dan ruas garis → Mengukur ruas garis dengan penggaris)

Dua titik berbeda, misalnya P dan Q, hanya dapat dihubungkan dengan satu ruas garis lurus, yaitu PQ. Tetapi dua titik yang sama dapat dihubungkan oleh banyak kurva. Gambar yang tampak melengkung bisa saja gabungan beberapa ruas garis, misalnya PK, KL, LM, dan MQ. Gabungan ruas garis bukan garis lengkung.

**5. Mengukur Ruas Garis dengan Penggaris** 0️⃣ (Mengukur ruas garis dengan penggaris → Sentimeter dan milimeter)

Pada Aktivitas 1, kita mengukur panjang ruas garis dengan penggaris. Letakkan angka 0 penggaris tepat di titik awal ruas garis. Lihat angka yang sejajar dengan titik akhir. Bila titik B sejajar angka 5, maka panjang ruas garis AB adalah 5 cm, ditulis AB = 5 cm. Mengukur harus selalu dimulai dari angka 0.

**6. Sentimeter dan Milimeter** 🔬 (Sentimeter dan milimeter → Menggambar ruas garis)

Penggaris pendek memiliki satuan sentimeter dan garis-garis kecil yang membagi 1 cm menjadi 10 bagian. Tiap bagian kecil memiliki satuan milimeter, ditulis mm. Jadi 1 cm sama dengan 10 mm. Bila ruas garis MN panjangnya 5 cm dan 5 mm, maka 5 mm sama dengan 0,5 cm, sehingga MN = 5,5 cm. PQ = 3 cm dan 7 mm = 3,7 cm.

**7. Menggambar Ruas Garis** ✏️ (Menggambar ruas garis → Sisi bangun datar)

Untuk menggambar ruas garis dengan ukuran tertentu, tandai titik awal, letakkan angka 0 penggaris di titik itu, tandai titik akhir tepat di angka yang diminta, lalu hubungkan kedua titik dengan penggaris. Ukuran dapat berupa 3 cm, 7 cm, 2 cm 9 mm, atau 11,5 cm. Hubungkan juga pasangan titik yang diberikan dan tulis panjangnya.

**8. Sisi Bangun Datar** 🔺 (Sisi bangun datar → Siap mengenal sisi bangun datar)

Segitiga EFG dibatasi oleh ruas garis EF, FG, dan EG. Ruas garis yang menjadi batas bangun datar dinamakan sisi. Jadi segitiga memiliki tiga sisi. Bangun GHIJ dibatasi ruas garis GH, HI, IJ, dan GJ, jadi memiliki empat sisi. Setiap sisi punya panjang yang dapat diukur dengan penggaris.

## 6. Tahap 3: Infografis

1. **Titik dan Garis** 📍: Garis dibuat dari titik-titik yang berurutan. Ada garis lurus dan garis lengkung yang disebut kurva.
2. **Sinar Garis** 🔦: Sinar garis berpangkal di satu titik dan hanya dapat diperpanjang ke satu sisi.
3. **Garis** 🛤️: Garis dapat diperpanjang ke kedua sisi dan tidak punya ujung.
4. **Ruas Garis** 📏: Ruas garis memiliki dua titik ujung dan panjang tertentu. Panjangnya dapat diukur dengan penggaris.
5. **Kurva** 🌈: Kurva adalah garis lengkung. Dua titik dapat dihubungkan oleh banyak kurva.
6. **Dua Titik** 🔗: Dua titik berbeda hanya dapat dihubungkan dengan satu ruas garis lurus.
7. **cm dan mm** 🔬: Satu sentimeter sama dengan sepuluh milimeter. Lima milimeter sama dengan nol koma lima sentimeter.
8. **Mengukur Ruas Garis** 0️⃣: Letakkan angka nol penggaris di titik awal. Lihat angka di titik akhir. Tulis panjangnya dengan satuan.
9. **Sisi** 🔺: Ruas garis pembatas bangun datar dinamakan sisi. Segitiga punya tiga sisi dan persegi punya empat sisi.
10. **Cara Mengukur** 📝: Empat langkah. Satu, letakkan angka nol di titik awal. Dua, lihat angka di titik akhir. Tiga, baca sentimeter dan milimeternya. Empat, tulis hasilnya dengan satuan.

## 7. Tahap 4: Concrete (benda nyata)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 1 | Hitung Sisi Benda | `count-sides-object` | hlm. 145 dan 153 (benda yang menyerupai bangun datar) | Menghitung banyak sisi lurus pada benda sehari-hari. | Tiga ronde, tiap ronde dua soal. Benda ditampilkan, lalu siswa memilih satu dari tiga banyak sisi. Pengecoh lebih satu atau kurang satu. |
| 2 | Bendanya Mirip Apa? | `object-like-line` | hlm. 146 (sinar garis, garis, ruas garis, kurva) | Menghubungkan benda nyata dengan sinar garis, garis, ruas garis, atau kurva. | Tiga ronde, tiap ronde dua benda. Sinar senter, rel kereta api, pensil, penggaris, dan pelangi ditampilkan. Siswa memilih satu dari tiga nama. |
| 3 | Baca Panjang dalam cm dan mm | `read-mm-object` | hlm. 149 (Aktivitas 1: panjang ruas garis) | Membaca panjang benda dalam sentimeter dan milimeter pada penggaris. | Tiga ronde, tiap ronde dua soal. Benda ditampilkan di atas penggaris dari angka 0. Siswa memilih satu dari tiga panjang, misalnya 5 cm 5 mm. |
| 4 | Jodohkan Benda dan Banyak Sisi | `match-object-sides` | hlm. 145 dan 153 (sisi bangun datar) | Menjodohkan benda dengan banyak sisi lurusnya. | Tiga ronde, tiap ronde tiga benda dan tiga banyak sisi. Siswa mengetuk benda, lalu mengetuk banyak sisi yang cocok. |
| 5 | Memori Benda dan Banyak Sisi | `memory-object-sides` | hlm. 153 (sisi bangun datar) | Mencocokkan benda dengan banyak sisinya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. |
| 6 | Ketuk Benda dengan Sisi Tertentu | `tap-object-sides` | hlm. 153 (sisi bangun datar) | Menemukan benda yang punya banyak sisi seperti yang diminta. | Tiga ronde, tiap ronde tiga benda dan dua pertanyaan. Siswa mengetuk benda yang banyak sisinya sama dengan yang disebut. |
| 7 | Ketuk Semua Benda dengan Sisi Tertentu | `tap-all-sides` | hlm. 145 (benda menyerupai bangun datar) | Menemukan semua benda yang punya banyak sisi tertentu. | Tiga ronde, tiap ronde empat benda dan satu perintah. Siswa mengetuk semua benda yang cocok, lalu menekan Periksa. |
| 8 | Papan Panjang dalam Milimeter | `board-mm` | hlm. 148–149 (1 cm = 10 mm) | Menulis panjang benda dalam milimeter pada papan ratusan, puluhan, dan satuan. | Tiga ronde, tiap ronde dua soal. Siswa membaca panjang benda pada penggaris, lalu mengubahnya ke milimeter pada papan dan menekan Periksa. |
| 9 | Urutkan Benda menurut Panjang | `order-mm` | hlm. 151 (mengukur panjang benda sekitar) | Mengurutkan tiga benda menurut panjangnya dalam cm dan mm. | Tiga ronde, tiap ronde tiga benda di atas penggaris bertanda huruf. Siswa mengetuk benda satu per satu dari yang terpendek atau terpanjang. |
| 10 | Jumlah Sisi Dua Benda | `sum-sides` | hlm. 145 dan 153 (banyak sisi benda) | Menjumlahkan banyak sisi dari dua benda. | Tiga ronde, tiap ronde dua benda. Siswa menghitung sisi tiap benda, lalu memilih satu dari tiga jumlah sisi. |

## 8. Tahap 5: Picture (diagram)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 11 | Garis, Sinar, atau Ruas Garis | `line-kind` | hlm. 146–147 (sinar garis, garis, ruas garis, kurva) | Menentukan jenis garis dari gambarnya: sinar garis, garis, ruas garis, atau kurva. | Tiga ronde, tiap ronde dua soal. Gambar garis berhuruf ditampilkan. Siswa memilih satu dari tiga nama. |
| 12 | Baca Ruas Garis pada Penggaris | `read-ruler-mm` | hlm. 148–149 (Aktivitas 1: mengukur ruas garis) | Membaca panjang ruas garis pada penggaris bermilimeter. | Tiga ronde, tiap ronde dua soal. Ruas garis dari angka 0 ditampilkan. Siswa memilih satu dari tiga panjang dalam cm dan mm. |
| 13 | Jodohkan Ruas Garis dan Panjang | `match-segment-length` | hlm. 149–150 (menulis panjang ruas garis) | Menjodohkan ruas garis pada penggaris dengan panjangnya. | Tiga ronde, tiap ronde tiga ruas garis dan tiga panjang. Siswa mengetuk ruas garis, lalu mengetuk panjang yang cocok. |
| 14 | Memori Garis dan Namanya | `memory-line-name` | hlm. 146–147 (sinar garis, garis, ruas garis, kurva) | Mencocokkan gambar garis dengan namanya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. |
| 15 | Isi Tabel Sisi Bangun Datar | `fill-sides-table` | hlm. 153 (sisi bangun datar) | Melengkapi tabel bangun datar dan banyak sisinya. | Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu banyak sisi yang tepat. Ada satu kartu pengecoh. |
| 16 | Ketuk Semua Bangun dengan Sisi Tertentu | `tap-all-polygon` | hlm. 153 (Ayo Berlatih B: sisi bangun datar) | Menemukan semua bangun datar yang memiliki banyak sisi tertentu. | Tiga ronde, tiap ronde empat bangun dan satu perintah. Siswa mengetuk semua bangun yang cocok, lalu menekan Periksa. |
| 17 | Pilah Garis: Lurus atau Lengkung | `sort-straight-curve` | hlm. 146–147 (garis lurus dan kurva) | Memilah gambar garis menjadi garis lurus dan garis lengkung. | Tiga ronde, tiap ronde enam gambar garis dan dua kotak. Sinar garis, garis, dan ruas garis adalah lurus, kurva adalah lengkung. Siswa menyeret atau mengetuk gambar ke kotak yang tepat. |
| 18 | Urutkan Langkah Mengukur Ruas Garis | `order-measure-segment` | hlm. 148–149 (cara menggunakan penggaris) | Mengurutkan langkah mengukur dan menggambar ruas garis. | Tiga ronde, tiap ronde empat langkah. Siswa mengetuk langkah satu per satu menurut urutan yang benar. Letak jawaban berpindah. |
| 19 | Papan Milimeter dari Penggaris | `board-ruler-mm` | hlm. 149 (5 cm 5 mm = 55 mm) | Menulis panjang ruas garis dalam milimeter pada papan. | Tiga ronde, tiap ronde dua soal. Siswa membaca ruas garis pada penggaris, lalu mengatur angka ratusan, puluhan, dan satuan pada papan dan menekan Periksa. |
| 20 | Nama Sisi Bangun Datar | `polygon-sides-names` | hlm. 153 (Ayo Berlatih B nomor 3 dan 4: tulislah sisi-sisinya) | Memilih daftar sisi yang tepat dari bangun datar berhuruf. | Tiga ronde, tiap ronde dua soal. Segitiga atau segiempat berhuruf ditampilkan. Siswa memilih satu dari tiga daftar sisi. |

## 9. Tahap 6: Abstract (kata dan angka)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 21 | Nama Garis dan Bagian Bangun Datar | `name-line-text` | hlm. 146–153 (sinar garis, ruas garis, kurva, sisi) | Memilih nama garis atau bagian bangun datar dari uraiannya. | Tiga ronde, tiap ronde dua soal. Siswa membaca uraian, lalu memilih satu dari tiga nama. |
| 22 | Lengkapi Kalimat Garis dan Sisi | `complete-line-sentence` | hlm. 146–153 (sinar garis, ruas garis, dan sisi) | Melengkapi kalimat tentang garis, penggaris, dan sisi bangun datar. | Tiga soal, tiap soal tiga kalimat, misalnya satu sentimeter sama dengan sepuluh ... Siswa memilih satu dari tiga kata. |
| 23 | Ubah Sentimeter dan Milimeter | `convert-cm-mm` | hlm. 148–149 (1 cm = 10 mm, 5 mm = 0,5 cm) | Mengubah ukuran antara sentimeter dan milimeter. | Tiga ronde, tiap ronde dua soal, misalnya 3 cm 7 mm = ... cm. Siswa memilih satu dari tiga hasil. |
| 24 | Jodohkan Ukuran Panjang | `match-length-text` | hlm. 149 dan 151 (menulis panjang ruas garis) | Menjodohkan dua cara menulis panjang yang sama. | Tiga ronde, tiap ronde tiga ukuran dan tiga pasangannya. Siswa mengetuk ukuran, lalu mengetuk pasangannya. |
| 25 | Memori Ukuran Panjang | `memory-length-text` | hlm. 149 dan 151 (ukuran yang sama) | Mencocokkan dua cara menulis panjang yang sama lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. |
| 26 | Benar atau Salah: Garis dan Sisi | `true-false-lines` | hlm. 146–153 (sinar garis, ruas garis, dan sisi) | Menilai pernyataan tentang garis, ukuran, dan sisi bangun datar. | Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Tiap jawaban diberi penjelasan. |
| 27 | Detektif Ruas Garis dan Sisi | `detective-lines` | hlm. 149 dan 153 (ukuran dan sisi) | Menemukan bilangan dari dua petunjuk tentang milimeter dan sisi. | Empat soal. Siswa membaca petunjuk dan satu ciri bilangan, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok. |
| 28 | Peta Konsep Garis dan Sisi | `concept-map-lines` | hlm. 144 (peta konsep Bab 4) | Melengkapi peta konsep titik, garis, dan sisi bangun datar. | Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. |
| 29 | Soal Cerita Ruas Garis dan Sisi | `story-segment` | hlm. 149–153 (panjang ruas garis dan sisi) | Menyelesaikan soal cerita tentang panjang ruas garis dan sisi bangun datar. | Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita lalu memilih satu dari tiga hasil dalam mm atau cm. |
| 30 | Susun Kata Garis dan Sisi | `sentence-lines` | hlm. 146–153 (sinar garis, ruas garis, sisi) | Menyusun kalimat tentang garis dan sisi dari kartu kata. | Empat kalimat. Siswa mengetuk kartu kata satu per satu menurut urutan kalimat yang benar. Ada satu kartu pengecoh. |

## 10. Poin penting, cara, kegiatan di rumah, dan refleksi

- 🔦 **Sinar garis**: satu pangkal, satu arah. *Suara:* Sinar garis berpangkal di satu titik dan hanya dapat diperpanjang ke satu sisi.
- 🛤️ **Garis**: kedua sisi, tanpa ujung. *Suara:* Garis dapat diperpanjang ke kedua sisi dan tidak punya ujung.
- 📏 **Ruas garis**: dua ujung, panjang tetap. *Suara:* Ruas garis memiliki dua titik ujung dan panjang tertentu. Panjangnya dapat diukur dengan penggaris.
- 🔬 **Sentimeter dan milimeter**: 1 cm = 10 mm. *Suara:* Satu sentimeter sama dengan sepuluh milimeter. Lima milimeter sama dengan nol koma lima sentimeter.
- 🔺 **Sisi**: ruas garis pembatas bangun. *Suara:* Ruas garis yang menjadi batas bangun datar dinamakan sisi. Segitiga punya tiga sisi.

Ringkasan suara: Ingat selalu! Sinar garis hanya dapat diperpanjang ke satu sisi, garis ke kedua sisi, dan ruas garis punya panjang tetap. Satu sentimeter sama dengan sepuluh milimeter. Ruas garis pembatas bangun datar dinamakan sisi.

Cara menyebutkan: Cara mengukur ruas garis. Letakkan angka nol penggaris di titik awal. Lihat angka di titik akhir. Baca sentimeter dan milimeternya. Lalu tulis hasilnya dengan satuan. (angka 0 di titik awal, lihat titik akhir, baca cm dan mm, tulis satuan)

Ayo Mencoba di rumah: ukurlah panjang buku Matematika, pensil, meja, dan penghapusmu dengan penggaris. Letakkan angka nol di ujung benda, lalu tulis hasilnya dengan cm dan mm. Hitung juga banyak sisi pada bingkai foto, buku, dan rambu segitiga di sekitarmu.

Refleksi:
- Aku dapat membedakan sinar garis, garis, ruas garis, dan kurva.
- Aku dapat mengukur ruas garis dengan penggaris dalam cm dan mm.
- Aku tahu bahwa 1 cm sama dengan 10 mm.
- Aku dapat menyebutkan sisi dan menghitung banyak sisi bangun datar.
