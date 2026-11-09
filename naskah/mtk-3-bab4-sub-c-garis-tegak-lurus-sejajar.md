# Naskah Matematika Kelas 3 SD, Bab 4: Unsur-Unsur Bangun Datar, Sub-Bab C: Garis-Garis Tegak Lurus dan Garis-Garis Sejajar

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k3b4.ts` dan `src/components/modul/data-k3b4.ts`, oleh `scripts/buat-naskah-md.mjs`. Isi mengikuti Buku Siswa Matematika Kelas III (Kemendikbudristek, Kurikulum Merdeka, Bab 4 hlm. 143–185) dan Buku Panduan Guru Bab 4, serta diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.

## 1. Identitas modul

- Kode bab: `k3-mat-bab4`, FASE_B, kelas 3.
- Judul: BAB 4: UNSUR-UNSUR BANGUN DATAR. Sub-Bab C: Garis-Garis Tegak Lurus dan Garis-Garis Sejajar.
- Suara Guru: Web Speech API perangkat saja, laju 0.7 dan nada 1. Tanpa ElevenLabs.
- Isi: 3 video cerita (9 adegan), 8 langkah peta pikiran, 10 panel infografis, 30 permainan (10 Concrete, 10 Picture, 10 Abstract), 5 poin penting.

## 2. Tujuan belajar

Siswa mengenal garis-garis tegak lurus (bertemu pada sudut siku-siku, lambang ⊥) dan garis-garis sejajar (jarak selalu sama, tidak pernah bertemu, lambang //), memeriksanya dengan kertas lipat dan kertas berpetak, membuat garis dengan melipat kertas, serta mengenal ciri bangun datar sederhana: segitiga, persegi panjang, persegi, segilima, dan lingkaran.

- Capaian Pembelajaran: Siswa menggambar dan menjelaskan unsur-unsur bangun datar. Pada sub-bab ini siswa mengenal garis tegak lurus dan garis sejajar, serta ciri bangun datar sederhana dari sisi dan sudutnya.
- Acuan: Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 4: Unsur-Unsur Bangun Datar, Sub-Bab C hlm. 173–194) dan Buku Panduan Guru Bab 4 Topik C.

## 3. Metode dari luar buku

- **Benda bergaris**: tangga, pagar, rumah, jendela, rel kereta api, dan tiang bendera digambar dari ruas garis, dengan dua garis disorot merah dan biru. Hubungan dua garis (sejajar, tegak lurus, atau bukan keduanya) DIHITUNG dari koordinat ruas, bukan ditulis tangan.
- **Kertas lipat berpetak (Aktivitas 5)**: bekas lipatan merah, biru, hijau, dan kuning digambar pada kertas berpetak. Siswa menentukan hubungan dua lipatan, mengurutkan kertas menurut banyak lipatan, dan menamai bangun di tengah kertas (persegi atau persegi panjang, dihitung dari lebar dan tingginya).
- **Kertas berpetak polos di tahap Picture**: sepasang garis merah dan biru pada petak 5 x 5 dengan tanda kotak siku-siku dan anak panah sejajar. Permainan Periksa Jarak Petak meniru contoh buku (jarak 2 petak dan 4 petak): sejajar bila jarak di kedua ujung sama.
- **Lambang ⊥ dan //**: AB ⊥ BC dan EF // GH ditulis dari pasangan garis berhuruf. Pengecoh memuat lambang yang tertukar dan pilihan bukan keduanya.
- **Bangun datar sederhana (bagian 3 buku)**: segitiga, persegi, persegi panjang, segilima, dan lingkaran digambar polos. Ciri dan banyak sisi serta sudut dihitung dari data, termasuk lingkaran yang dibatasi garis lengkung dan tanpa sudut.
- **Garis sejajar dan tegak lurus di sekitar**: soal cerita memakai pagar (lima tiang membentuk empat pasang), tangga, dan persegi panjang. Soal 'berapa petak di ujung kanan' menegaskan jarak garis sejajar selalu sama.

## 4. Tahap 1: Story (video cerita animasi SVG)

Tiap video diputar satu per satu saat siswa mengetuk Putar. Tidak ada yang berjalan sendiri. Kalimat dibacakan Suara Guru satu per satu (ketukan), dan gambar berubah mengikuti ketukan.

### K3B4C-V1. Garis Tegak Lurus (Bertemu pada sudut siku-siku)

**K3B4C-V1-1. Garis yang bertemu**

1. Dua garis dapat bertemu atau berpotongan pada satu titik. *(papan: Garis bertemu atau tidak)*
2. Garis kuning dan garis biru bertemu di satu titik. *(papan: Kuning dan biru bertemu)*
3. Garis putih tidak bertemu walaupun diperpanjang. *(papan: Putih tidak bertemu)*
4. Kita akan mengenal garis tegak lurus dan garis sejajar. *(papan: Tegak lurus dan sejajar)*

**K3B4C-V1-2. Tegak lurus**

1. Garis AB bertemu garis BC pada sudut siku-siku. *(papan: AB bertemu BC)*
2. AB dan BC adalah garis tegak lurus. *(papan: Siku-siku: tegak lurus)*
3. Kita tulis AB ⊥ BC, dibaca AB tegak lurus BC. *(papan: AB ⊥ BC)*
4. Sudut siku-siku diberi tanda kotak kecil. *(papan: Tanda kotak kecil)*

**K3B4C-V1-3. Kertas lipat**

1. Selembar kertas yang dilipat dua kali menghasilkan sudut siku-siku. *(papan: Kertas dilipat dua kali)*
2. Pojok kertas lipat dapat memeriksa garis tegak lurus. *(papan: Pojok kertas lipat)*
3. Letakkan pojok kertas pada pertemuan dua garis. *(papan: Letakkan di pertemuan garis)*
4. Bila kedua garis pas dengan pojok kertas, garis itu tegak lurus. *(papan: Pas: tegak lurus)*

### K3B4C-V2. Garis Sejajar (Jarak yang selalu sama)

**K3B4C-V2-1. Jarak yang sama**

1. Dua garis putih ditarik pada kertas berpetak. *(papan: Dua garis pada petak)*
2. Di ujung kiri jarak kedua garis dua petak. *(papan: Kiri: 2 petak)*
3. Di ujung kanan jarak kedua garis juga dua petak. *(papan: Kanan: 2 petak)*
4. Dua garis yang jaraknya selalu sama disebut garis sejajar. *(papan: Jarak sama: sejajar)*

**K3B4C-V2-2. Tanda dan lambang**

1. Anak panah dipakai untuk menandai garis sejajar. *(papan: Anak panah: sejajar)*
2. Garis AB sejajar dengan garis CD. *(papan: AB sejajar CD)*
3. Kita tulis AB // CD, dibaca AB sejajar CD. *(papan: AB // CD)*
4. Garis sejajar tidak akan pernah bertemu satu sama lain. *(papan: Tidak pernah bertemu)*

**K3B4C-V2-3. Bukan sejajar**

1. Pada gambar ini jarak di ujung kiri dua petak. *(papan: Kiri: 2 petak)*
2. Jarak di ujung kanan empat petak. *(papan: Kanan: 4 petak)*
3. Jaraknya berbeda, jadi garis ini bukan garis sejajar. *(papan: Jarak berbeda)*
4. Garis yang bukan sejajar akan bertemu bila diperpanjang. *(papan: Bukan garis sejajar)*

### K3B4C-V3. Bangun Datar Sederhana (Segitiga, persegi, dan lingkaran)

**K3B4C-V3-1. Segitiga**

1. Tiga batang pensil yang dihubungkan ujungnya membentuk segitiga. *(papan: Tiga batang pensil)*
2. Segitiga dibatasi tiga ruas garis atau tiga sisi. *(papan: 3 sisi)*
3. Segitiga ABC memiliki tiga sudut, yaitu sudut A, B, dan C. *(papan: 3 sudut: A, B, C)*
4. Setidaknya perlu tiga ruas garis untuk membuat bangun tertutup. *(papan: Tertutup: minimal 3 ruas)*

**K3B4C-V3-2. Persegi panjang dan persegi**

1. Empat batang pensil dapat membentuk persegi panjang. *(papan: Persegi panjang)*
2. Persegi panjang memiliki empat sisi dan empat sudut. *(papan: 4 sisi, 4 sudut)*
3. Empat batang korek api sama panjang membentuk persegi. *(papan: Persegi)*
4. Persegi memiliki empat sisi sama panjang dan empat sudut siku-siku. *(papan: 4 sisi sama panjang)*

**K3B4C-V3-3. Lingkaran dan segilima**

1. Lingkaran dibatasi oleh garis lengkung. *(papan: Garis lengkung)*
2. Lingkaran tidak memiliki sudut. *(papan: Tanpa sudut)*
3. Segilima dibatasi lima ruas garis dan memiliki lima sudut. *(papan: Segilima: 5 sisi)*
4. Bangun datar dapat dikenali dari sisi dan sudutnya. *(papan: Kenali dari sisi dan sudut)*

## 5. Tahap 2: Mind map (peta pikiran)

**1. Garis Bertemu dan Tidak Bertemu** 🔗 (Garis bertemu dan tidak bertemu → Garis tegak lurus)

Dua garis dapat bertemu atau berpotongan pada satu titik, dapat pula tidak bertemu walaupun diperpanjang. Pada gambar di buku, garis kuning dan garis biru bertemu di satu titik, sedangkan garis-garis putih tidak bertemu. Dari sini kita mengenal dua hubungan garis yang istimewa, yaitu garis tegak lurus dan garis sejajar.

**2. Garis Tegak Lurus** 📐 (Garis tegak lurus → Memeriksa dengan kertas lipat)

Dua garis yang bertemu atau berpotongan dan membentuk sudut siku-siku disebut garis tegak lurus. Misalnya AB bertemu BC pada sudut siku-siku, sehingga AB dan BC adalah garis tegak lurus. Kita menulisnya AB ⊥ BC dan membacanya AB tegak lurus BC. Sudut siku-siku di pertemuan kedua garis diberi tanda kotak kecil.

**3. Memeriksa dengan Kertas Lipat** 📄 (Memeriksa dengan kertas lipat → Melipat kertas: sejajar dan tegak lurus)

Selembar kertas yang dilipat dua kali dengan rapi memiliki pojok yang berupa sudut siku-siku. Pojok kertas lipat dipakai untuk memeriksa garis tegak lurus: letakkan pojok kertas di tempat kedua garis bertemu. Bila kedua garis tepat berimpit dengan kedua sisi pojok kertas, garis itu tegak lurus. Bila tidak pas, garis itu tidak tegak lurus.

**4. Melipat Kertas: Sejajar dan Tegak Lurus** ✂️ (Melipat kertas: sejajar dan tegak lurus → Garis sejajar)

Pada Aktivitas 5, kertas berpetak dilipat beberapa kali dan bekas lipatan digambar dengan warna berbeda. Dua lipatan pertama, merah dan biru, bertemu pada sudut siku-siku sehingga tegak lurus. Lipatan hijau dan kuning membentuk pasangan garis sejajar. Garis-garis sejajar itu bersama pasangan lainnya membentuk sebuah persegi di tengah kertas.

**5. Garis Sejajar** 🛤️ (Garis sejajar → Memeriksa jarak dengan petak)

Dua garis yang ditarik pada jarak yang sama dan tidak berpotongan disebut garis sejajar. Garis sejajar tidak akan pernah bertemu satu sama lain. Anak panah digunakan untuk menandai bahwa garis-garisnya sejajar. Bila AB sejajar CD, kita menulis AB // CD. Garis sejajar dapat mendatar, tegak, atau miring, asalkan jaraknya selalu sama.

**6. Memeriksa Jarak dengan Petak** 🧮 (Memeriksa jarak dengan petak → Garis pada benda dan huruf)

Pada kertas berpetak kita memeriksa garis sejajar dengan menghitung petak persegi. Bila E dan G terpisah 1 petak dan F dan H juga terpisah 1 petak, maka EF sejajar GH. Bila P dan R terpisah 2 petak tetapi Q dan S terpisah 4 petak, jaraknya berbeda sehingga PQ dan RS bukan garis sejajar.

**7. Garis pada Benda dan Huruf** 🔍 (Garis pada benda dan huruf → Bangun datar sederhana)

Garis tegak lurus dan garis sejajar ada di sekitar kita. Rel kereta api, pagar, tangga, dan kusen jendela memiliki garis sejajar dan garis tegak lurus. Pada huruf-huruf MATEMATIKA, huruf E, M, A, T, I, dan K dapat dicari garis tegak lurusnya dan pasangan garis sejajarnya. Panah ditulis pada garis sejajar, dan pasangan yang berbeda diberi tanda panah yang berbeda.

**8. Bangun Datar Sederhana** ⬜ (Bangun datar sederhana → Siap menyelesaikan Bab 4)

Segitiga dibatasi tiga ruas garis, memiliki tiga sisi dan tiga sudut. Persegi panjang memiliki empat sisi dan empat sudut siku-siku. Persegi memiliki empat sisi sama panjang dan empat sudut siku-siku. Segilima memiliki lima sisi dan lima sudut. Lingkaran dibatasi garis lengkung dan tidak memiliki sudut. Bangun datar dikenali dari banyak sisi dan sudutnya.

## 6. Tahap 3: Infografis

1. **Bertemu dan Tidak Bertemu** 🔗: Dua garis dapat bertemu pada satu titik. Dua garis juga dapat tidak bertemu walaupun diperpanjang.
2. **Garis Tegak Lurus** 📐: Garis tegak lurus bertemu pada satu titik. Pertemuannya membentuk sudut siku-siku. Sudut itu diberi tanda kotak kecil.
3. **Lambang Tegak Lurus** ➕: Garis AB tegak lurus garis BC ditulis AB ⊥ BC. Lambang ⊥ dibaca tegak lurus.
4. **Kertas Lipat** 📄: Pojok kertas yang dilipat dua kali adalah sudut siku-siku. Pojok itu dipakai untuk memeriksa garis tegak lurus.
5. **Garis Sejajar** 🛤️: Garis sejajar ditarik pada jarak yang selalu sama. Garis sejajar tidak pernah bertemu. Anak panah menandai garis sejajar.
6. **Lambang Sejajar** ⏩: Garis AB sejajar garis CD ditulis AB // CD. Lambang // dibaca sejajar.
7. **Segitiga** 🔺: Segitiga memiliki tiga sisi dan tiga sudut. Segitiga dibatasi tiga ruas garis.
8. **Persegi dan Persegi Panjang** ⬜: Persegi panjang memiliki empat sisi dan empat sudut siku-siku. Persegi memiliki empat sisi yang sama panjang.
9. **Lingkaran** ⭕: Lingkaran dibatasi oleh garis lengkung. Lingkaran tidak memiliki sudut.
10. **Cara Memeriksa Garis** 📝: Empat langkah. Satu, lipat kertas dua kali. Dua, letakkan pojok kertas di pertemuan garis. Tiga, lihat apakah garis pas dengan pojok. Empat, pas berarti tegak lurus.

## 7. Tahap 4: Concrete (benda nyata)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 1 | Dua Garis pada Benda | `benda-lines-kind` | hlm. 174–176 (garis tegak lurus dan sejajar di sekitar kita) | Menentukan hubungan dua garis berwarna pada gambar benda: sejajar, tegak lurus, atau bukan keduanya. | Tiga ronde, tiap ronde dua soal. Benda seperti tangga, pagar, rumah, jendela, rel, dan tiang bendera ditampilkan dengan dua garis berwarna. Siswa memilih satu dari tiga hubungan. |
| 2 | Ketuk Semua Benda dengan Garis Tertentu | `tap-all-benda-lines` | hlm. 176 (carilah contoh garis tegak lurus di sekitar kalian) | Menemukan semua gambar benda yang dua garis berwarnanya memiliki hubungan tertentu. | Tiga ronde, tiap ronde empat benda dan satu perintah. Siswa mengetuk semua benda yang cocok, lalu menekan Periksa. |
| 3 | Jodohkan Benda dan Hubungan Garis | `match-benda-lines` | hlm. 174–176 dan 182–183 (garis sejajar dan tegak lurus) | Menjodohkan gambar benda dengan hubungan dua garis berwarnanya. | Tiga ronde, tiap ronde tiga benda dan tiga hubungan berbeda. Siswa mengetuk benda, lalu mengetuk hubungan yang cocok. |
| 4 | Pilah Benda: Sejajar, Tegak Lurus, atau Bukan | `sort-benda-lines` | hlm. 174–176 dan 182–183 (garis sejajar dan tegak lurus) | Memilah gambar benda menurut hubungan dua garis berwarnanya. | Tiga ronde, tiap ronde enam gambar benda dan tiga kotak. Siswa menyeret atau mengetuk gambar ke kotak yang tepat. |
| 5 | Hitung Garis Sejajar dengan Garis Merah | `count-parallel-benda` | hlm. 182–185 (garis sejajar) | Menghitung banyak garis yang sejajar dengan garis merah pada gambar benda. | Tiga ronde, tiap ronde dua soal. Satu garis merah dan beberapa garis biru ditampilkan. Siswa menghitung garis biru yang sejajar dengan garis merah dan memilih satu dari tiga bilangan. |
| 6 | Hitung Garis Tegak Lurus dengan Garis Merah | `count-perp-benda` | hlm. 174–176 (garis tegak lurus) | Menghitung banyak garis yang tegak lurus dengan garis merah pada gambar benda. | Tiga ronde, tiap ronde dua soal. Satu garis merah dan beberapa garis biru ditampilkan. Siswa menghitung garis biru yang bertemu garis merah pada sudut siku-siku dan memilih satu dari tiga bilangan. |
| 7 | Dua Lipatan pada Kertas | `fold-lines-kind` | hlm. 177–180 (Aktivitas 5: membuat garis sejajar dan tegak lurus dengan melipat) | Menentukan hubungan dua bekas lipatan pada kertas berpetak. | Tiga ronde, tiap ronde dua soal. Kertas berpetak dengan dua bekas lipatan berwarna ditampilkan. Siswa memilih sejajar, tegak lurus, atau bukan keduanya. |
| 8 | Bangun di Tengah Kertas | `fold-middle-shape` | hlm. 179–180 (Aktivitas 5 nomor 8: bangun di tengah kertas) | Menentukan bangun yang terbentuk di tengah kertas oleh dua pasang lipatan sejajar. | Tiga ronde, tiap ronde dua soal. Kertas berpetak dengan empat lipatan ditampilkan dan bangun di tengahnya diwarnai. Siswa memilih persegi, persegi panjang, atau segitiga. |
| 9 | Urutkan Kertas menurut Banyak Lipatan | `order-folds` | hlm. 177–180 (Aktivitas 5: melipat kertas) | Mengurutkan tiga kertas berpetak menurut banyak bekas lipatannya. | Tiga ronde, tiap ronde tiga kertas bertanda huruf. Siswa mengetuk kertas satu per satu dari yang paling sedikit atau paling banyak lipatannya. |
| 10 | Jodohkan Lipatan dan Hubungannya | `match-folds` | hlm. 177–180 (Aktivitas 5: garis sejajar dan tegak lurus dari lipatan) | Menjodohkan kertas berlipatan dengan hubungan dua lipatannya. | Tiga ronde, tiap ronde tiga kertas dan tiga hubungan berbeda. Siswa mengetuk kertas, lalu mengetuk hubungan yang cocok. |

## 8. Tahap 5: Picture (diagram)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 11 | Jenis Pasangan Garis | `pair-kind-grid` | hlm. 174–176 dan 180 (garis tegak lurus pada kertas berpetak) | Menentukan hubungan pasangan garis pada kertas berpetak: sejajar, tegak lurus, atau bukan keduanya. | Tiga ronde, tiap ronde dua soal. Pasangan garis merah dan biru pada kertas berpetak ditampilkan. Siswa memilih satu dari tiga hubungan. |
| 12 | Periksa Jarak Petak | `check-gap-grid` | hlm. 182–185 (garis sejajar: hitung petak) | Memeriksa jarak dua garis di ujung kiri dan kanan untuk menentukan garis sejajar. | Tiga ronde, tiap ronde dua soal. Dua garis dengan jarak di kedua ujung ditampilkan. Siswa memilih sejajar bila kedua jarak sama dan bukan sejajar bila berbeda. |
| 13 | Jodohkan Pasangan Garis dan Hubungannya | `match-pair-kind` | hlm. 174–176 dan 182–185 (garis tegak lurus dan sejajar) | Menjodohkan pasangan garis pada kertas berpetak dengan hubungannya. | Tiga ronde, tiap ronde tiga pasangan garis dan tiga hubungan berbeda. Siswa mengetuk gambar, lalu mengetuk hubungan yang cocok. |
| 14 | Ketuk Semua Pasangan Garis Tertentu | `tap-all-pairs` | hlm. 180 dan 186 (Ayo Berlatih 1: manakah yang sejajar atau tegak lurus) | Menemukan semua pasangan garis dengan hubungan tertentu. | Tiga ronde, tiap ronde empat pasangan garis dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. |
| 15 | Pilah Pasangan Garis: Sejajar, Tegak Lurus, atau Bukan | `sort-pairs` | hlm. 180 dan 186 (memeriksa pasangan garis) | Memilah pasangan garis menjadi sejajar, tegak lurus, dan bukan keduanya. | Tiga ronde, tiap ronde enam pasangan garis dan tiga kotak. Siswa menyeret atau mengetuk gambar ke kotak yang tepat. |
| 16 | Isi Tabel Ciri Bangun Datar | `fill-shape-table` | hlm. 189–192 (bangun datar sederhana: sisi dan sudut) | Melengkapi tabel bangun datar dan ciri-cirinya. | Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu ciri yang tepat. Ada satu kartu pengecoh. |
| 17 | Memori Bangun Datar dan Namanya | `memory-shape-name` | hlm. 189–192 (nama bangun datar) | Mencocokkan gambar bangun datar dengan namanya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari gambar bangun dengan namanya. |
| 18 | Lambang Pasangan Garis | `name-symbol-pair` | hlm. 176 dan 183 (AB ⊥ BC dan AB // CD) | Memilih lambang yang tepat untuk pasangan garis berhuruf. | Tiga ronde, tiap ronde dua soal. Pasangan garis berhuruf ditampilkan. Siswa memilih satu dari tiga lambang. |
| 19 | Sisi dan Sudut Bangun Datar | `shape-features` | hlm. 189–192 (Ayo Berlatih: tuliskan banyak sudut dan sisi) | Memilih ciri yang tepat untuk gambar bangun datar sederhana. | Tiga ronde, tiap ronde dua soal. Gambar bangun datar ditampilkan. Siswa memilih satu dari tiga ciri. |
| 20 | Pilih Garis yang Sejajar atau Tegak Lurus | `choose-candidate-line` | hlm. 177–180 dan 182–185 (membuat garis sejajar dan tegak lurus) | Memilih gambar yang garis merahnya sejajar atau tegak lurus dengan garis biru. | Tiga ronde, tiap ronde tiga gambar dan dua pertanyaan. Garis biru tetap sama, garis merah berbeda. Siswa mengetuk gambar yang sejajar lalu yang tegak lurus. |

## 9. Tahap 6: Abstract (kata dan angka)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 21 | Istilah Garis | `name-line-term` | hlm. 174–185 (garis tegak lurus dan sejajar) | Memilih istilah garis yang tepat dari uraiannya. | Tiga ronde, tiap ronde dua soal. Siswa membaca uraian, lalu memilih satu dari tiga istilah. |
| 22 | Lengkapi Kalimat Garis dan Bangun | `complete-line-sentence` | hlm. 174–192 (garis dan bangun datar sederhana) | Melengkapi kalimat tentang garis dan bangun datar sederhana. | Tiga soal, tiap soal tiga kalimat, misalnya segitiga memiliki tiga sisi dan tiga ... Siswa memilih satu dari tiga kata. |
| 23 | Arti Lambang Garis | `symbol-meaning` | hlm. 176 dan 183 (lambang ⊥ dan //) | Membaca dan menulis lambang garis tegak lurus dan sejajar. | Tiga ronde, tiap ronde dua soal, misalnya AB ⊥ CD dibaca ... Siswa memilih satu dari tiga jawaban. |
| 24 | Jodohkan Lambang dan Bacaannya | `match-symbol-phrase` | hlm. 176 dan 183 (AB ⊥ BC, EF // GH) | Menjodohkan lambang garis dengan bacaannya. | Tiga ronde, tiap ronde tiga lambang dan tiga bacaan. Siswa mengetuk lambang, lalu mengetuk bacaannya. |
| 25 | Memori Istilah dan Artinya | `memory-term-meaning` | hlm. 174–192 (istilah garis dan bangun datar) | Mencocokkan istilah dengan artinya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari istilah dengan artinya. |
| 26 | Benar atau Salah: Garis dan Bangun Datar | `true-false-lines` | hlm. 174–192 (garis dan bangun datar sederhana) | Menilai pernyataan tentang garis dan bangun datar sederhana. | Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Tiap jawaban diberi penjelasan. |
| 27 | Detektif Bangun Datar | `detective-shapes` | hlm. 189–192 (banyak sisi dan sudut) | Menemukan bilangan dari dua petunjuk tentang sisi dan sudut bangun datar. | Empat soal. Siswa membaca petunjuk dan satu ciri bilangan, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok. |
| 28 | Peta Konsep Garis dan Bangun | `concept-map-shapes` | hlm. 144 (peta konsep Bab 4) | Melengkapi peta konsep garis dan bangun datar sederhana. | Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. |
| 29 | Soal Cerita Garis dan Bangun | `story-lines` | hlm. 188–193 (garis sejajar, tegak lurus, dan bangun datar) | Menyelesaikan soal cerita tentang sudut siku-siku, sisi bangun, dan garis sejajar. | Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita, menghitung, lalu memilih satu dari tiga bilangan. |
| 30 | Susun Kata Garis dan Bangun | `sentence-shapes` | hlm. 174–192 (garis dan bangun datar sederhana) | Menyusun kalimat tentang garis dan bangun datar dari kartu kata. | Empat kalimat. Siswa mengetuk kartu kata satu per satu menurut urutan kalimat yang benar. Ada satu kartu pengecoh. |

## 10. Poin penting, cara, kegiatan di rumah, dan refleksi

- 📐 **Garis tegak lurus**: bertemu pada sudut siku-siku. *Suara:* Garis tegak lurus bertemu pada sudut siku-siku. Ditulis AB ⊥ BC dan dibaca AB tegak lurus BC.
- 📄 **Kertas lipat**: pojoknya memeriksa siku-siku. *Suara:* Pojok kertas yang dilipat dua kali adalah sudut siku-siku. Pojok itu dipakai untuk memeriksa garis tegak lurus.
- 🛤️ **Garis sejajar**: jarak sama, tidak bertemu. *Suara:* Garis sejajar ditarik pada jarak yang selalu sama dan tidak pernah bertemu. Ditulis AB // CD dan dibaca AB sejajar CD.
- 🔺 **Segitiga**: 3 sisi dan 3 sudut. *Suara:* Segitiga dibatasi tiga ruas garis. Segitiga memiliki tiga sisi dan tiga sudut.
- ⬜ **Persegi dan persegi panjang**: 4 sisi dan 4 sudut siku-siku. *Suara:* Persegi panjang memiliki empat sisi dan empat sudut siku-siku. Persegi memiliki empat sisi yang sama panjang.

Ringkasan suara: Ingat selalu! Garis tegak lurus bertemu pada sudut siku-siku, ditulis dengan lambang ⊥. Garis sejajar jaraknya selalu sama dan tidak pernah bertemu, ditulis dengan lambang //. Segitiga punya tiga sisi, persegi dan persegi panjang punya empat sisi, dan lingkaran dibatasi garis lengkung.

Cara menyebutkan: Cara memeriksa garis tegak lurus. Lipat kertas dua kali. Letakkan pojok kertas di tempat kedua garis bertemu. Lihat apakah kedua garis pas dengan pojok. Bila pas, garisnya tegak lurus. (lipat kertas dua kali, pojok di pertemuan garis, lihat apakah pas, pas berarti tegak lurus)

Ayo Mencoba di rumah: cari tiga pasang garis tegak lurus dan tiga pasang garis sejajar pada pintu, jendela, atau pagar. Lipat selembar kertas dua kali, lalu pakai pojoknya untuk memeriksa garis tegak lurus. Sebutkan juga bangun datar yang kamu temukan di rumah beserta banyak sisi dan sudutnya.

Refleksi:
- Aku dapat menjelaskan garis tegak lurus dan menuliskannya dengan lambang ⊥.
- Aku dapat menjelaskan garis sejajar dan menuliskannya dengan lambang //.
- Aku dapat membuat garis sejajar dan tegak lurus dengan melipat kertas.
- Aku dapat menyebutkan sisi dan sudut segitiga, persegi, persegi panjang, dan lingkaran.
