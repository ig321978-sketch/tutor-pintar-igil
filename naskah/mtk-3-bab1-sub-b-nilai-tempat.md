# Naskah Matematika Kelas 3 SD, Bab 1: Bilangan Cacah sampai 1.000, Sub-Bab B: Nilai Tempat Bilangan Cacah sampai 1.000

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k3b1.ts` dan `src/components/modul/data-k3b1.ts`, oleh `scripts/buat-naskah-md.mjs`. Isi mengikuti Buku Siswa Matematika Kelas III (Kemendikbudristek, Kurikulum Merdeka, Bab 1 hlm. 3–24) dan Buku Panduan Guru Bab 1, serta diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.

## 1. Identitas modul

- Kode bab: `k3-mat-bab1`, FASE_B, kelas 3.
- Judul: BAB 1: BILANGAN CACAH SAMPAI 1.000. Sub-Bab B: Nilai Tempat Bilangan Cacah sampai 1.000.
- Suara Guru: Web Speech API perangkat saja, laju 0.7 dan nada 1. Tanpa ElevenLabs.
- Isi: 3 video cerita (9 adegan), 8 langkah peta pikiran, 10 panel infografis, 30 permainan (10 Concrete, 10 Picture, 10 Abstract), 5 poin penting.

## 2. Tujuan belajar

Siswa menentukan tempat dan nilai setiap angka pada bilangan tiga angka (pada 251, angka 2 bernilai 200, angka 5 bernilai 50, angka 1 bernilai 1), menyusun bilangan dari ratusan, puluhan, dan satuan, mengurai bilangan menjadi 200 + 50 + 1, mengisi tabel nilai tempat dengan angka (bukan nilai), serta menjelaskan peran angka nol pada nilai tempat.

- Capaian Pembelajaran: Siswa membaca, menulis, dan membandingkan bilangan cacah sampai 1.000. Pada sub-bab ini siswa menentukan dan menggunakan nilai tempat bilangan cacah sampai 1.000.
- Acuan: Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 1: Bilangan Cacah sampai 1.000, Sub-Bab B hlm. 18–24) dan Buku Panduan Guru Bab 1 Topik B.

## 3. Metode dari luar buku

- **Tiga kaleng dan kartu angka**: aktivitas buku diwujudkan dengan benda nyata (kaleng) dan kartu, lalu dipindah ke layar sebagai permainan Tiga Kaleng.
- **Nilai tempat dengan kemasan**: nilai sebuah angka dihitung dari banyak benda pada kemasan tempat angka itu berada (3 dus = 300 benda).
- **Menyusun dan mengurai (expanded form)**: dua arah yang saling membalik, 2 ratusan + 5 puluhan + 1 satuan = 251 dan 251 = 200 + 50 + 1.
- **Angka dan nilai tidak sama**: miskonsepsi dari Buku Panduan Guru (mengisi tabel dengan 900, 80, 7). Permainan Isi Tabel dan Benar atau Salah membahasnya langsung.
- **Garis bilangan nilai**: nilai sebuah angka diketuk pada garis 0 sampai 1.000 (langkah 100), 0 sampai 100 (langkah 10), atau 0 sampai 10.
- **Detektif nilai tempat**: dua petunjuk tentang nilai angka menyisakan satu bilangan, setiap soal diperiksa uji otomatis.

## 4. Tahap 1: Story (video cerita animasi SVG)

Tiap video diputar satu per satu saat siswa mengetuk Putar. Tidak ada yang berjalan sendiri. Kalimat dibacakan Suara Guru satu per satu (ketukan), dan gambar berubah mengikuti ketukan.

### K3B1B-V1. Tinggi Badan 127 (Angka punya tempat dan nilai)

**K3B1B-V1-1. Mengukur tinggi badan**

1. Di kelas, guru mengukur tinggi badan seorang siswa dengan alat ukur. *(papan: Mengukur tinggi badan)*
2. Hasil ukurnya seratus dua puluh tujuh sentimeter, ditulis 127 sentimeter. *(papan: 127 sentimeter)*
3. Bilangan itu terdiri atas tiga angka, yaitu satu, dua, dan tujuh. *(papan: Tiga angka)*
4. Setiap angka punya tempat dan nilai sendiri. Apakah kalian tahu nilainya? *(papan: Tempat dan nilai)*

**K3B1B-V1-2. Nilai tempat 251**

1. Kita baca 251, yaitu dua ratus lima puluh satu. *(papan: 251)*
2. Angka 2 menempati tempat ratusan, jadi nilainya 200. *(papan: 2 di ratusan = 200)*
3. Angka 5 menempati tempat puluhan, jadi nilainya 50. *(papan: 5 di puluhan = 50)*
4. Angka 1 menempati tempat satuan, jadi nilainya 1. *(papan: 1 di satuan = 1)*

**K3B1B-V1-3. Angka sama, nilai beda**

1. Perhatikan angka 6 pada tiga bilangan, yaitu 600, 60, dan 6. *(papan: Angka 6 di tiga tempat)*
2. Pada 600, angka 6 ada di tempat ratusan dan bernilai 600. *(papan: Ratusan: 600)*
3. Pada 60, angka 6 ada di tempat puluhan dan bernilai 60. *(papan: Puluhan: 60)*
4. Pada 6, angka 6 ada di tempat satuan dan bernilai 6. Tempat sebuah angka menentukan nilainya. *(papan: Satuan: 6)*

### K3B1B-V2. Tiga Kaleng (Aktivitas menentukan nilai tempat)

**K3B1B-V2-1. Menyiapkan tiga kaleng**

1. Kita menyiapkan tiga kaleng bekas dan memberi label ratusan, puluhan, dan satuan. *(papan: Tiga kaleng)*
2. Letakkan kaleng ratusan, puluhan, dan satuan berurutan dari kiri ke kanan. *(papan: Kiri ke kanan)*
3. Kita juga membuat sepuluh kartu angka dari nol sampai sembilan. *(papan: Kartu 0 sampai 9)*
4. Setiap kartu ditulis dengan warna spidol yang berbeda. *(papan: Warna berbeda)*

**K3B1B-V2-2. Mengambil kartu**

1. Masukkan kartu secara acak ke dalam tiga kaleng, lalu ambil satu kartu dari tiap kaleng. *(papan: Ambil satu kartu)*
2. Misalnya dari kaleng ratusan terambil kartu 2. *(papan: Ratusan: 2)*
3. Dari kaleng puluhan terambil kartu 1, dan dari kaleng satuan terambil kartu 9. *(papan: Puluhan: 1, satuan: 9)*
4. Kartu disusun menjadi bilangan tiga angka, yaitu dua ratus sembilan belas, ditulis 219. *(papan: Bilangan 219)*

**K3B1B-V2-3. Nilai tiap kartu**

1. Kartu 2 di kaleng ratusan bernilai dua ratus. *(papan: 2 ratusan = 200)*
2. Kartu 1 di kaleng puluhan bernilai sepuluh. *(papan: 1 puluhan = 10)*
3. Kartu 9 di kaleng satuan bernilai sembilan. *(papan: 9 satuan = 9)*
4. Dua ratus tambah sepuluh tambah sembilan sama dengan 219. *(papan: 200 + 10 + 9 = 219)*

### K3B1B-V3. Menyusun dan Mengurai (Dua cara menulis nilai tempat)

**K3B1B-V3-1. Menyusun bilangan**

1. Menyusun bilangan berarti menjumlahkan ratusan, puluhan, dan satuan. *(papan: Menyusun bilangan)*
2. Dua ratusan, lima puluhan, dan satu satuan menjadi dua ratus lima puluh satu. *(papan: 2, 5, dan 1)*
3. Ditulis 2 ratusan tambah 5 puluhan tambah 1 satuan sama dengan 251. *(papan: 2 ratusan + 5 puluhan + 1 satuan)*
4. Kita juga bisa memakai nilai, yaitu 200 tambah 50 tambah 1 sama dengan 251. *(papan: 200 + 50 + 1 = 251)*

**K3B1B-V3-2. Mengurai bilangan**

1. Mengurai bilangan adalah menguraikan bilangan menjadi ratusan, puluhan, dan satuan. *(papan: Mengurai bilangan)*
2. Bilangan 602 diurai menjadi 6 ratusan, 0 puluhan, dan 2 satuan. *(papan: 602)*
3. Dalam bentuk nilai, 602 sama dengan 600 tambah 0 tambah 2. *(papan: 600 + 0 + 2)*
4. Menyusun dan mengurai adalah dua arah yang saling membalik. *(papan: Dua arah)*

**K3B1B-V3-3. Isi tabel dengan teliti**

1. Hati-hati saat mengisi tabel nilai tempat. *(papan: Isi tabel dengan teliti)*
2. Untuk 987, tabel diisi angka: 9 di ratusan, 8 di puluhan, dan 7 di satuan. *(papan: 987: 9, 8, 7)*
3. Jangan menulis 900, 80, dan 7 di dalam tabel. Itu adalah nilainya, bukan angkanya. *(papan: Angka bukan nilai)*
4. Nilai dipakai saat mengurai, yaitu 900 tambah 80 tambah 7. *(papan: 900 + 80 + 7)*

## 5. Tahap 2: Mind map (peta pikiran)

**1. Angka Punya Tempat** 📍 (Angka punya tempat → Tempat menentukan nilai)

Bilangan tiga angka mempunyai tiga tempat: ratusan, puluhan, dan satuan. Pada tinggi badan 127 sentimeter, angka 1 ada di ratusan, angka 2 di puluhan, dan angka 7 di satuan. Kita menyebut tempat itu nilai tempat. Tempat sebuah angka menentukan seberapa besar angka itu bernilai.

**2. Tempat Menentukan Nilai** ⚖️ (Tempat menentukan nilai → Nilai tiap tempat)

Angka yang sama dapat bernilai berbeda. Angka 6 pada 600 bernilai 600, pada 60 bernilai 60, dan pada 6 bernilai 6. Nilai angka di ratusan adalah angka itu dikali seratus, di puluhan dikali sepuluh, dan di satuan angka itu sendiri. Karena itu 123 dan 321 adalah bilangan yang berbeda walaupun angkanya sama.

**3. Nilai Tiap Tempat** 🔢 (Nilai tiap tempat → Tiga kaleng)

Pada 251, angka 2 di ratusan bernilai 200, angka 5 di puluhan bernilai 50, dan angka 1 di satuan bernilai 1. Nilai tiap tempat dipakai untuk melihat bilangan sebagai jumlah: 200 tambah 50 tambah 1 sama dengan 251. Menambahkan ketiga nilai itu akan mengembalikan bilangan semula.

**4. Tiga Kaleng** 🥫 (Tiga kaleng → Menyusun bilangan)

Aktivitas tiga kaleng menunjukkan tempat dengan benda nyata. Kaleng ratusan, puluhan, dan satuan diletakkan dari kiri ke kanan. Satu kartu angka diambil dari tiap kaleng, lalu disusun menjadi bilangan tiga angka. Kartu dari kaleng ratusan bernilai ratusan, kartu dari kaleng puluhan bernilai puluhan, dan kartu dari kaleng satuan bernilai satuan.

**5. Menyusun Bilangan** 🧩 (Menyusun bilangan → Mengurai bilangan)

Menyusun bilangan berarti menjumlahkan ratusan, puluhan, dan satuan menjadi satu bilangan. 2 ratusan ditambah 5 puluhan ditambah 1 satuan sama dengan 251. Dalam bentuk nilai, 200 tambah 50 tambah 1 sama dengan 251. Hasil menyusun selalu bilangan tiga angka bila ratusannya tidak nol.

**6. Mengurai Bilangan** 🔬 (Mengurai bilangan → Angka nol dalam nilai tempat)

Mengurai bilangan berarti menguraikan bilangan menjadi ratusan, puluhan, dan satuan. 602 sama dengan 6 ratusan, 0 puluhan, dan 2 satuan, atau 600 tambah 0 tambah 2. Menyusun dan mengurai saling membalik: dari bagian ke bilangan, dan dari bilangan ke bagian-bagiannya.

**7. Angka Nol dalam Nilai Tempat** ⭕ (Angka nol dalam nilai tempat → Teliti memakai tabel)

Angka nol menandakan tidak ada ratusan, puluhan, atau satuan pada tempat itu. Pada 805 puluhannya nol, nilainya nol, sehingga 805 sama dengan 800 tambah 0 tambah 5. Nol penting karena menjaga angka lain tetap berada di tempatnya: tanpa nol, 805 berubah menjadi 85.

**8. Teliti Memakai Tabel** 📊 (Teliti memakai tabel → Siap menentukan nilai tempat)

Tabel nilai tempat diisi dengan angka tiap tempat, bukan dengan nilainya. Untuk 987, isilah 9, 8, dan 7. Nilainya, yaitu 900, 80, dan 7, dipakai saat mengurai. Mencampur angka dengan nilai adalah kesalahan yang sering terjadi, jadi periksa lagi sebelum menjawab.

## 6. Tahap 3: Infografis

1. **Angka dan Tempatnya** 📍: Setiap angka pada bilangan tiga angka menempati satu tempat: ratusan, puluhan, atau satuan.
2. **Tempat Menentukan Nilai** ⚖️: Angka enam pada enam ratus bernilai enam ratus, pada enam puluh bernilai enam puluh, dan pada enam bernilai enam.
3. **Nilai Dua Ratus Lima Puluh Satu** 🔢: Pada 251, angka dua di ratusan bernilai dua ratus, angka lima di puluhan bernilai lima puluh, dan angka satu di satuan bernilai satu.
4. **Tiga Kaleng** 🥫: Kaleng ratusan, puluhan, dan satuan diletakkan dari kiri ke kanan. Satu kartu angka diambil dari tiap kaleng.
5. **Menyusun Bilangan** 🧩: Menyusun bilangan adalah menjumlahkan ratusan, puluhan, dan satuan. Dua ratusan, lima puluhan, dan satu satuan menjadi 251.
6. **Mengurai Bilangan** 🔬: Mengurai bilangan adalah menguraikan menjadi ratusan, puluhan, dan satuan. 602 sama dengan 600 tambah 0 tambah 2.
7. **Angka Nol** ⭕: Nol berarti tidak ada. Pada 805, puluhannya nol dan bernilai nol. Nol menjaga angka lain tetap di tempatnya.
8. **Tabel Nilai Tempat** 📊: Tabel nilai tempat diisi dengan angka, bukan nilai. Untuk 987, isilah sembilan, delapan, dan tujuh.
9. **Angka 8 di Mana?** 🔍: Pada 981 angka delapan menempati puluhan. Pada 845 ratusan. Pada 108 satuan. Pada 800 ratusan.
10. **Cara Menentukan Nilai Tempat** 📝: Empat langkah. Satu, tulis bilangan pada papan tiga tempat. Dua, lihat tempat tiap angka. Tiga, kalikan angka dengan seratus, sepuluh, atau satu. Empat, jumlahkan bila ingin mengecek.

## 7. Tahap 4: Concrete (benda nyata)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 1 | Tiga Kaleng | `three-cans-cards` | hlm. 19–20 (Aktivitas 2: Menentukan Nilai Tempat) | Menyusun tiga kartu angka pada kaleng ratusan, puluhan, dan satuan menjadi bilangan yang diminta. | Tiga ronde, tiap ronde dua soal. Siswa mengetuk kartu angka, lalu mengetuk kaleng ratusan, puluhan, atau satuan. Diperiksa otomatis saat tiga kaleng terisi. |
| 2 | Nilai Satu Kemasan | `value-of-package` | hlm. 21 (angka 2 menempati ratusan yang bernilai 200) | Menentukan nilai sebuah angka dari banyak benda pada kemasan tempat angka itu berada. | Tiga ronde, tiap ronde dua soal. Gambar menampilkan kumpulan dus, bungkus, dan benda lepas. Siswa memilih berapa banyak benda yang ada pada satu jenis kemasan. |
| 3 | Jodohkan Kemasan dan Nilai | `match-package-value` | hlm. 21 (nilai ratusan, puluhan, satuan) | Menjodohkan kelompok kemasan dengan nilainya dalam benda. | Tiga ronde, tiap ronde tiga kelompok kemasan dan tiga nilai, misalnya 3 dus dengan 300. Siswa mengetuk kelompok, lalu mengetuk nilai yang cocok. |
| 4 | Masukkan Kemasan ke Kaleng | `package-into-can` | hlm. 19 (kaleng ratusan, puluhan, dan satuan) | Memasukkan kelompok kemasan ke kaleng ratusan, puluhan, atau satuan yang sesuai. | Tiga ronde, tiap ronde tiga kelompok kemasan dan tiga kaleng. Siswa mengetuk kelompok, lalu mengetuk kaleng yang tepat. |
| 5 | Memori Kemasan dan Nilai | `memory-package-value` | hlm. 21 (nilai ratusan, puluhan, satuan) | Mencocokkan kelompok kemasan dengan nilainya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): kelompok kemasan dan nilainya. Siswa membalik dua kartu dan mencari pasangannya. |
| 6 | Rakit Nilai | `build-from-value` | hlm. 21 (menyusun bilangan: 2 ratusan + 5 puluhan + 1 satuan) | Merakit bilangan dengan kemasan dari kalimat penyusunan. | Tiga ronde, tiap ronde dua soal yang dibacakan sebagai penyusunan, misalnya 3 ratusan ditambah 4 puluhan ditambah 7 satuan. Siswa merakit dengan dus, bungkus, dan benda lepas. |
| 7 | Ketuk Kumpulan dengan Angka Tertentu | `tap-digit-package` | hlm. 21–23 (tempat dan nilai angka) | Menemukan kumpulan yang punya angka tertentu pada ratusan atau puluhan. | Tiga ronde, tiap ronde tiga kumpulan dan dua pertanyaan, misalnya angka puluhannya 6. Siswa mengetuk kumpulan yang tepat. |
| 8 | Tempat Angka dalam Kumpulan | `place-of-digit` | hlm. 22 (nilai tempat angka 8 pada 981, 845, 108, 800, 618) | Menentukan tempat angka 8 pada sebuah kumpulan benda. | Tiga ronde, tiap ronde dua soal. Gambar menampilkan kumpulan, dan siswa memilih apakah angka 8 ada di ratusan, puluhan, atau satuan. |
| 9 | Ketuk Semua Kumpulan yang Cocok | `tap-all-value` | hlm. 21–23 (nilai tempat tiap angka) | Menemukan semua kumpulan yang punya angka tertentu atau angka nol. | Tiga ronde, tiap ronde empat kumpulan dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. |
| 10 | Urutkan Nilai Kemasan | `order-package-value` | hlm. 21 (nilai tiap tempat berbeda) | Mengurutkan kelompok kemasan menurut nilainya. | Tiga ronde, tiap ronde tiga kelompok kemasan bertanda huruf. Siswa mengetuk kelompok satu per satu dari yang paling kecil atau paling besar nilainya. Letak jawaban berpindah. |

## 8. Tahap 5: Picture (diagram)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 11 | Isi Tabel Nilai | `block-value-table` | hlm. 21–23 (nilai tempat tiap angka) | Mengisi nilai ratusan, puluhan, dan satuan pada tabel dari bilangan. | Tiga tabel dengan tiga baris. Siswa mengetuk sel untuk memutar nilainya (200, 50, 1), lalu menekan Periksa. |
| 12 | Nilai Angka pada Blok | `block-value-choice` | hlm. 21 (angka 2 bernilai 200, angka 5 bernilai 50) | Menentukan nilai sebuah angka dari model blok. | Tiga ronde, tiap ronde dua soal. Gambar menampilkan blok, dan siswa memilih nilai angka pada tempat yang ditanya. |
| 13 | Susun Bilangan | `compose-sentence` | hlm. 21 (2 ratusan + 5 puluhan + 1 satuan = 251) | Menyusun bilangan dari kalimat ratusan, puluhan, dan satuan. | Tiga model, tiap model tiga kalimat penyusunan. Siswa memilih satu dari tiga angka untuk bagian kosong. |
| 14 | Urai Bilangan | `decompose-sentence` | hlm. 21 (602 = 600 + 00 + 2) | Mengurai bilangan menjadi bagian-bagian nilai. | Tiga bilangan, tiap bilangan tiga kalimat uraian, misalnya 372 = 300 + ... + 2. Siswa memilih satu dari tiga angka. |
| 15 | Jodohkan Blok dan Uraian | `match-block-decomposition` | hlm. 21 (menyusun dan mengurai) | Menjodohkan model blok dengan uraiannya. | Tiga ronde, tiap ronde tiga model dan tiga uraian, misalnya 300 + 40 + 7. Siswa mengetuk model, lalu mengetuk uraian yang cocok. |
| 16 | Memori Blok dan Uraian | `memory-block-decomposition` | hlm. 21 (menyusun dan mengurai) | Mencocokkan model blok dengan uraiannya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): model blok dan uraian. Siswa membalik dua kartu dan mencari pasangannya. |
| 17 | Papan dari Uraian | `board-from-decomposition` | hlm. 21 (menyusun bilangan) | Menulis bilangan pada papan dari uraiannya. | Tiga ronde, tiap ronde dua soal. Siswa membaca uraian seperti 600 + 20 + 1 lalu mengatur tiga angka pada papan dan menekan Periksa. |
| 18 | Garis Bilangan: Nilai Angka | `number-line-value` | hlm. 21–23 (nilai tempat) | Menemukan nilai sebuah angka pada garis bilangan. | Tiga ronde, tiap ronde dua soal. Siswa membaca bilangan seperti 463 dan angka yang ditanya, lalu mengetuk nilainya pada garis bilangan puluhan atau ratusan. |
| 19 | Pilah Nilai | `sort-value-cards` | hlm. 21 (nilai ratusan, puluhan, satuan) | Memilah kartu nilai menjadi nilai ratusan, puluhan, dan satuan. | Tiga ronde, tiap ronde enam kartu nilai (misalnya 300, 60, 5) dan tiga kotak: ratusan, puluhan, satuan. Siswa menyeret atau mengetuk kartu ke kotak yang tepat. |
| 20 | Ketuk Semua Blok dengan Nilai | `tap-all-value-blocks` | hlm. 21–23 (nilai tempat) | Menemukan semua model blok yang punya nilai tertentu pada sebuah tempat. | Tiga ronde, tiap ronde empat model dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. |

## 9. Tahap 6: Abstract (kata dan angka)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 21 | Susun Tiga Kartu dari Uraian | `compose-from-decomposition` | hlm. 19–21 (menyusun bilangan dari angka tiap tempat) | Menyusun tiga kartu angka menjadi bilangan dari ratusan, puluhan, dan satuan. | Tiga ronde, tiap ronde dua soal. Siswa membaca bilangan yang diminta lalu mengetuk kartu angka dan tempat. Diperiksa otomatis. |
| 22 | Tempat Angka 8 | `place-of-digit-choice` | hlm. 22 (tentukan nilai tempat dari angka 8) | Menentukan tempat angka 8 pada bilangan 981, 845, 108, 800, dan 618. | Tiga ronde, tiap ronde dua soal. Siswa memilih apakah angka 8 menempati ratusan, puluhan, atau satuan. |
| 23 | Nilai Angka | `digit-value-choice` | hlm. 21 (angka 5 menempati puluhan yang bernilai 50) | Menentukan nilai sebuah angka pada bilangan tiga angka. | Tiga ronde, tiap ronde dua soal. Siswa memilih satu dari tiga nilai, misalnya nilai angka 5 pada 251. |
| 24 | Urai dengan Kata | `decompose-words` | hlm. 23–24 (isilah titik-titik: ratusan + puluhan + satuan) | Melengkapi uraian bilangan dalam bentuk ratusan, puluhan, dan satuan. | Tiga bilangan, tiap bilangan tiga kalimat, misalnya 634 = 6 ratusan + ... puluhan + 4 satuan. Siswa memilih satu dari tiga angka. |
| 25 | Tulis Bilangan dari Uraian | `board-from-sum` | hlm. 23–24 (menyusun bilangan) | Menulis bilangan dari uraian 600 + 80 + 4 pada papan. | Tiga ronde, tiap ronde dua soal. Siswa membaca uraian lalu mengatur tiga angka pada papan dan menekan Periksa. |
| 26 | Isi Tabel Uraian | `fill-decomposition-table` | hlm. 23–24 (lengkapi tabel; 555 = ... ratusan + ... puluhan + ... satuan) | Melengkapi tabel bilangan dan uraiannya. | Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu uraian yang tepat. Ada satu kartu pengecoh. |
| 27 | Benar atau Salah: Nilai Tempat | `true-false-value` | hlm. 21–24 (angka dan nilai; kesalahan mengisi tabel) | Menilai pernyataan tentang nilai tempat, menyusun, dan mengurai bilangan. | Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan dihitung dari bilangan, dan tiap jawaban diberi penjelasan. |
| 28 | Detektif Nilai Tempat | `detective-place-value` | hlm. 21 (nilai tiap angka) | Menemukan bilangan dari dua petunjuk tentang nilai angkanya. | Empat soal. Siswa membaca petunjuk seperti angka 5 bernilai 50 dan ratusanku 3, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok. |
| 29 | Peta Konsep Nilai Tempat | `concept-map-value` | hlm. 2 (peta konsep: nilai tempat bilangan) | Melengkapi peta konsep nilai tempat dan cara mengurai bilangan. | Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. |
| 30 | Susun Kata Nilai Tempat | `build-value-sentence` | hlm. 21 (angka 2 menempati nilai tempat ratusan yang bernilai 200) | Menyusun kata menjadi kalimat tentang nilai tempat. | Empat kalimat, misalnya angka 2 menempati ratusan bernilai 200. Kartu kata diketuk berurutan. Satu kartu pengecoh tidak dipakai. |

## 10. Poin penting, cara, kegiatan di rumah, dan refleksi

- 📍 **Angka punya tempat**: ratusan, puluhan, satuan. *Suara:* Setiap angka pada bilangan tiga angka menempati satu tempat, yaitu ratusan, puluhan, atau satuan.
- ⚖️ **Tempat menentukan nilai**: pada 251, angka 5 bernilai 50. *Suara:* Tempat sebuah angka menentukan nilainya. Pada 251, angka 5 di puluhan bernilai 50.
- 🧩 **Menyusun bilangan**: 200 + 50 + 1 = 251. *Suara:* Menyusun bilangan berarti menjumlahkan ratusan, puluhan, dan satuan, misalnya 200 tambah 50 tambah 1 sama dengan 251.
- 🔬 **Mengurai bilangan**: 602 = 600 + 0 + 2. *Suara:* Mengurai bilangan berarti menguraikannya menjadi ratusan, puluhan, dan satuan, misalnya 602 sama dengan 600 tambah 0 tambah 2.
- 📊 **Tabel diisi dengan angka**: 987: 9, 8, 7. *Suara:* Tabel nilai tempat diisi dengan angka, bukan dengan nilainya. Untuk 987, isilah 9, 8, dan 7.

Ringkasan suara: Ingat selalu! Setiap angka pada bilangan tiga angka menempati satu tempat: ratusan, puluhan, atau satuan. Tempat menentukan nilai, jadi angka lima di puluhan bernilai lima puluh. Menyusun bilangan adalah menjumlahkan, dan mengurai bilangan adalah menguraikan. Tabel nilai tempat diisi dengan angka, bukan nilai.

Cara menyebutkan: Cara menyebutkan nilai. Lihat tempat angkanya. Kalikan angka dengan seratus, sepuluh, atau satu. Lalu sebutkan nilainya. (lihat tempat, kalikan, sebut nilai, cek jumlah)

Ayo Mencoba di rumah: siapkan tiga gelas bekas bertanda ratusan, puluhan, dan satuan, serta sepuluh kartu angka. Ambil satu kartu dari tiap gelas, susun menjadi bilangan tiga angka, lalu sebutkan nilai tiap angkanya. Tulis juga uraiannya, misalnya 200 + 50 + 1.

Refleksi:
- Aku dapat menyebut tempat dan nilai tiap angka.
- Aku dapat menyusun dan mengurai bilangan.
- Aku mengisi tabel dengan angka, bukan nilai.
- Aku berani menjelaskan jawabanku.
