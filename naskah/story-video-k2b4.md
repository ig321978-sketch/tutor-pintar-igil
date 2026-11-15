# Story video Kelas 2 Bab 4: Posisi Benda dan Pola di Sekitar Kita

# Story Kelas 2 Bab 4 Sub-Bab A: Posisi Benda

Berkas: `src/components/modul/story/k2b4A-{video,materi-1..4,luar-1,luar-2,gambar,bantu}.ts`, `src/components/modul/video-k2b4a.tsx` (ekspor `VideoK2B4A`, menimpa berkas lama), `scripts/uji-story-k2b4A.mjs`, `.tmp-k2b4s/A.json`.
Ekspor: `VIDEO_MATERI_K2B4A` (id `k2b4A-materi`), `VIDEO_LUAR_K2B4A` (id `k2b4A-luar`).

## Video materi kurikulum (17 adegan, 83 ketukan, 1005 kata, sekitar 8,4 menit)
Judul "Posisi Benda", subjudul "Materi kurikulum". Tokoh: Kira (taman), Upe, Wei, Halim, Kira, Malosi, Igil (barisan enam anak), Halim (membelakangi kita dan Latihan 2), Wei (Latihan 1), Igil (Latihan 2 dan 3). Tiga hal yang dipelajari (daftar sapaan): Enam kata posisi; Kanan dan kiri pada gambar; Menebak benda dari petunjuk.

| No | Adegan (id) | Ketukan | Kata | Isi |
|---|---|---|---|---|
| 1 | sapaan | 3 | 37 | tiga hal yang dipelajari |
| 2 | cerita-taman | 5 | 70 | taman Kira (burung, kupu-kupu, bunga); enam kartu kata posisi dalam tiga baris pasangan |
| 3 | atas-bawah | 5 | 63 | kupu-kupu di atas bunga, bunga di bawah kupu-kupu; kupu-kupu terbang lebih tinggi tetap di atas |
| 4 | depan-belakang | 5 | 69 | bola menutupi kotak (bola di depan, kotak di belakang); burung di depan ulat |
| 5 | kanan-kiri | 5 | 53 | burung di kiri rumput, rumput di kanan burung; kita yang melihat gambar; burung pindah ke kanan |
| 6 | pasangan | 6 | 85 | tiga pasangan berlawanan; contoh bola-kotak, mobil-mobilan-kursi, Kira-Halim; aturan jika X di kiri Y maka Y di kanan X |
| 7 | baris-anak | 5 | 65 | Upe, Wei, Halim, Kira, Malosi, Igil dari kiri ke kanan; Halim kanan Wei; Kira kiri Malosi; paling kiri dan paling kanan |
| 8 | membelakangi | 5 | 60 | Halim membelakangi kita; ayam di kiri, rumput di kanan; arah hadap sama sehingga kiri-kanan sama dengan kita |
| 9 | kalimat-posisi | 5 | 50 | tiga bagian kalimat: benda yang diceritakan, kata posisi, benda acuan (bola di atas kotak) |
| 10 | peta-kotak | 7 | 88 | peta tiga kali tiga dilihat dari atas; lingkaran biru di tengah lalu petak atas, bawah, kiri, kanan; lingkaran pindah ke pojok dan tak ada petak di kiri |
| 11 | patokan | 5 | 48 | pohon sebagai patokan: burung atas, kursi kiri, mobil-mobilan kanan, boneka bawah |
| 12 | dua-petunjuk | 5 | 77 | sembilan benda; aku di atas ikan (dua benda), aku di sebelah kanan jam; jawab mobil-mobilan |
| 13 | dipindah | 5 | 61 | bola di atas kotak, pindah ke kanan, ke bawah, posisi akhir bawah, lalu ke kiri |
| 14 | latihan-satu | 4 | 41 | Wei: bola di sebelah mana kotak (pilih kiri) |
| 15 | latihan-dua | 4 | 42 | Igil: siapa di sebelah kiri Kira (pilih Wei); kanan Kira adalah Upe |
| 16 | latihan-tiga | 4 | 42 | Igil: boneka di atas kursi, jadi kursi di bawah boneka |
| 17 | penutup | 5 | 54 | ringkasan tiga hal dan salam |

## Video metode luar (9 adegan, 40 ketukan, 471 kata, sekitar 3,9 menit)
Judul "Posisi Benda: Metode dari Luar", subjudul "Tiga metode luar". Tiga metode (namaId): Bahasa Posisi, Tampak Peta, Acuan Patokan.

| No | Adegan (id) | Ketukan | Kata |
|---|---|---|---|
| 1 | sapaan | 3 | 33 |
| 2 | luar-pembuka | 5 | 73 |
| 3 | luar-bahasa (Bahasa Posisi: kursi dikelilingi boneka atas, mobil-mobilan kanan, bola kiri) | 5 | 65 |
| 4 | luar-bahasa-terapan (ayam dan kotak, pilih bawah) | 4 | 39 |
| 5 | luar-peta (Tampak Peta: petak kecil, lingkaran biru di baris pertama kolom ketiga; bawah, kiri, kanan tak ada petak) | 5 | 66 |
| 6 | luar-peta-terapan (petak menyala di atas lingkaran biru, pilih atas) | 4 | 47 |
| 7 | luar-acuan (Acuan Patokan: rumah sebagai patokan; kelinci kiri, burung atas, mobil-mobilan depan) | 5 | 53 |
| 8 | luar-acuan-terapan (patokan bunga, kupu-kupu di kanan, pilih kanan) | 4 | 40 |
| 9 | luar-ringkas | 5 | 55 |

## Peta dan tabel susun (`.tmp-k2b4s/A.json`)
- Peta: pusat "Di mana letak benda itu?" (24 huruf); 3 cabang urut: Tiga hal yang dipelajari (anak = daftar sapaan persis: Enam kata posisi; Kanan dan kiri pada gambar; Menebak benda dari petunjuk), Cara melakukannya (Pilih kata posisi tepat; Lihat dari arah kita; Gabung dua petunjuk), Hasil yang diharapkan (Bisa menyebut letak benda; Bisa menemukan benda); 11 simpul bernomor 1..11, teks <= 28 huruf, unik, suara dan petunjuk tanpa digit.
- Tabel: 3 baris x 3 kolom (kolom Lawan, Benda, Acuan; pojok "Kata"): Atas (bawah, bola, kotak), Depan (belakang, burung, ulat), Kanan (kiri, Kira, Halim); sel <= 8 huruf, tanpa angka. Tiap baris dicek uji terhadap pernyataan letak yang terbukti pada gambar video materi, beserta lawannya.

## Uji (scripts/uji-story-k2b4A.mjs)
Lulus 4866, gagal 0. Hitung ulang dari struktur adegan (benda `ob-*` dengan pusat dari koordinat, urutan tumpuk z, petak `ptBK`, lingkaran biru `lb`): setiap pernyataan "benda di atas/bawah/depan/belakang/kanan/kiri acuan" dalam suara (50 pernyataan) dan kartu kalimat (30) dihitung dari koordinat (atas/bawah dari y, kanan/kiri dari x, depan/belakang dari tumpang tindih dan urutan tumpuk dengan benda depan lebih rendah di layar); lawan tiap pernyataan benar; tetangga langsung pada barisan anak; urutan "dari kiri ke kanan" sama dengan koordinat; paling kiri/kanan dan tidak ada anak di sisi; penanda arah hadap anak membelakangi kita (kanan-kiri mengikuti layar); petak peta kotak (baris dan kolom yang disebut, petak menyala, tidak ada petak di tepi); dua petunjuk menyisakan satu benda dan sama dengan jawaban; urutan posisi bola setelah dipindah; jawaban latihan dan terapan benar, satu pilihan, dan yang disorot sama dengan hasil hitung; benda yang bertumpuk hanya bila ada kalimat depan/belakang; isi tabel susun dihitung ulang dari pernyataan terbukti. Diuji juga dengan mengubah gambar secara sengaja (letak kupu-kupu, urutan Halim-Kira, sel peta, letak jam, pilihan jawaban): uji gagal sebagaimana mestinya.

## Temuan data (kelas2-bab4.json subBabs.A)
- targetDescription terulang dua kali ("Siswa memakai cara Bahasa Posisi, Tampak Peta, Acuan Patokan." dua kali).
- Nama metode ganda Inggris di mindMaps (Spatial Language, Map View, Landmark Reference) dan teks cerita ("Di sini kita memakai ide Spatial Language"): dipakai namaId saja.
- mindMaps generik/bertele-tele: langkah "Kerjakan: Terapkan cara itu pada angka atau gambar", "Cek masuk akal", "Main: Latih di Concrete sampai Abstract" (angka tak relevan untuk posisi benda).
- Suara cerita berulang ("Ingat cara ... " dua kali berturut-turut, "Di sini kita memakai ... " tiga kali).
- Tokoh di luar enam dan benda fisik: "Paman" (ke sawah, "Jangan disia-siakan"), "Enam sekawan ... Upe, Lili, Halim, Kira, Malosi, Tika" (Lili dan Tika bukan tokoh tetap; urutan diganti Upe, Wei, Halim, Kira, Malosi, Igil dan hasil kanan/kiri dihitung ulang), "Ayo bermain dalam kelompok tiga orang" (kerja kelompok, siswa pertama/kedua/ketiga), "buku di bawah meja" dan "buku di atas meja", petunjuk memindahkan buku dan pensil, "gunting dan tempelkan" (Ayo Berkarya), kamar dengan buku/tas/sepatu; silabus menyebut "Buku Siswa" dan referensi buku. Semuanya diganti benda di layar (bola, kotak, kursi, boneka, mobil-mobilan, kupu-kupu, burung, bunga) dan aksi ketuk/seret.
- Infografis "Posisi Setelah Dipindah" memakai buku dan meja; diganti bola dan kotak.
- Fakta posisi: kalimat data benar. "Anak membelakangi kita menghadap ke arah yang sama dengan kita, jadi kanan dan kirinya sama" benar dan dipakai (ayam di kiri Halim = kiri layar). "Benda yang menutupi benda lain ada di depan" benar. Tidak ditemukan kesalahan fakta.
- "Burung berjalan di depan ulat": digambar dengan burung menutupi sebagian ulat dan sedikit lebih rendah di layar (lebih dekat) agar depan/belakang terhitung dari tumpukan.

# Story Kelas 2 Bab 4 Sub-Bab B (Pola): naskah dua video

Mesin Story baru, meniru Kelas 2 Bab 3. Berkas: `src/components/modul/story/k2b4B-*.ts`, pembungkus `src/components/modul/video-k2b4b.tsx` (ekspor `VideoK2B4B`). Uji: `node --no-warnings scripts/uji-story-k2b4B.mjs`.

## k2b4B-materi: Mengenal Pola (Materi kurikulum)

22 adegan, 96 ketukan, 1146 kata, sekitar 9.6 menit diputar.

### sapaan: Sapaan dan materi hari ini

Sumber: Materi: sapaan dan tujuan. 3 ketukan, 35 kata.

1. Halo anak-anak, selamat datang di pelajaran matematika. Hari ini kita akan belajar pola.
2. Nanti kita akan mempelajari pola dan satuan pola, melanjutkan dan mengisi pola, dan merancang pola sendiri.
3. Siap? Ayo kita mulai belajar bersama.

### pola-arti: Enam anak berbaris dengan pola topi

Sumber: Materi: pola berulang dan teratur. 5 ketukan, 64 kata.

1. Malosi, Kira, Upe, Wei, Halim, dan Igil berbaris. Mereka semua memakai topi.
2. Malosi memakai topi merah, Kira topi biru, Upe topi merah, Wei topi biru, Halim topi merah, dan Igil topi biru.
3. Lihat warna topinya: merah, biru, merah, biru, merah, biru. Warnanya berganti dengan teratur.
4. Barisan yang berulang dan teratur seperti ini disebut pola.
5. Setelah topi biru yang terakhir, benda berikutnya pasti merah lagi.

### pola-satuan: Satuan pola: bagian terkecil yang berulang

Sumber: Materi: satuan pola. 5 ketukan, 57 kata.

1. Setiap pola punya satuan pola. Satuan pola adalah bagian terkecil yang berulang.
2. Perhatikan barisan ini: merah, biru, merah, biru, merah, biru.
3. Bagian terkecil yang berulang adalah merah dan biru. Satuannya terdiri dari dua benda.
4. Satuan yang sama muncul lagi dan lagi. Ada tiga satuan.
5. Karena satuannya sudah jelas, kita tahu lanjutannya. Setelah biru, benda berikutnya pasti merah.

### satuan-tiga: Satuan pola yang terdiri dari tiga benda

Sumber: Materi: satuan pola tiga benda. 4 ketukan, 47 kata.

1. Sekarang barisan yang lain: hati, hati, segitiga, hati, hati, segitiga, hati, hati, segitiga.
2. Cari bagian terkecil yang berulang. Satuannya hati, hati, dan segitiga. Satuannya terdiri dari tiga benda.
3. Satuan yang sama muncul dua lagi. Ada tiga satuan.
4. Satuan ini lebih panjang daripada satuan merah dan biru tadi.

### pola-bentuk: Pola bentuk

Sumber: Materi: pola bentuk. 5 ketukan, 47 kata.

1. Pola bisa dibuat dari bentuk. Kita menyebutnya pola bentuk.
2. Baris pertama: bunga, persegi, bunga, persegi, bunga, persegi.
3. Satuannya bunga dan persegi. Satuannya terdiri dari dua benda.
4. Baris kedua: hati, hati, segitiga, segitiga, hati, hati, segitiga, segitiga.
5. Satuannya hati, hati, segitiga, dan segitiga. Satuannya terdiri dari empat benda.

### pola-warna: Pola warna

Sumber: Materi: pola warna. 5 ketukan, 50 kata.

1. Pola juga bisa dibuat dari warna. Kita menyebutnya pola warna.
2. Baris pertama: kuning, hijau, kuning, hijau, kuning, hijau.
3. Baris kedua: merah, kuning, biru, merah, kuning, biru.
4. Satuan baris pertama terdiri dari dua benda. Satuan baris kedua terdiri dari tiga benda.
5. Warnanya berganti dengan teratur, jadi kedua baris ini adalah pola.

### pola-gerakan: Pola gerakan

Sumber: Materi: pola gerakan. 5 ketukan, 44 kata.

1. Gerakan juga bisa berpola. Perhatikan anak-anak yang bergerak.
2. Anak-anak membungkuk, berdiri, membungkuk, berdiri, membungkuk, berdiri.
3. Satuannya membungkuk dan berdiri. Itu pola gerakan.
4. Gerakan yang lain: berdiri, berdiri, tangan naik, berdiri, berdiri, tangan naik.
5. Satuannya berdiri, berdiri, dan tangan naik. Satuannya terdiri dari tiga gerakan.

### pola-suara: Pola suara

Sumber: Materi: pola suara. 5 ketukan, 46 kata.

1. Suara juga bisa berpola. Ada tepukan keras, pelan, dan diam.
2. Perhatikan bunyinya: keras, pelan, keras, pelan, keras, pelan.
3. Satuannya keras dan pelan. Itu pola suara.
4. Ada pola suara yang lain: keras, pelan, diam, keras, pelan, diam.
5. Satuannya keras, pelan, dan diam. Satuannya terdiri dari tiga bunyi.

### kode-huruf: Menulis pola dengan huruf

Sumber: Materi: kode huruf pola. 5 ketukan, 57 kata.

1. Pola dapat ditulis dengan huruf. Benda yang sama diberi huruf yang sama.
2. Merah kita beri huruf A. Biru kita beri huruf B.
3. Merah, biru, merah, biru ditulis A, B, A, B.
4. Sekarang barisan hati, hati, segitiga, hati, hati, segitiga.
5. Hati kita beri huruf A. Segitiga kita beri huruf B. Jadi kodenya A, A, B, A, A, B.

### kode-abc: Pola dengan tiga jenis benda

Sumber: Materi: kode huruf tiga jenis. 4 ketukan, 60 kata.

1. Ada pola yang punya tiga jenis benda: lingkaran, persegi, segitiga, lingkaran, persegi, segitiga.
2. Lingkaran diberi huruf A, persegi huruf B, dan segitiga huruf C. Kodenya A, B, C, A, B, C.
3. Satuan polanya terdiri dari tiga benda. Ada dua satuan.
4. Jadi pola berkode A, B memakai dua benda yang berbeda. Pola berkode A, B, C memakai tiga benda yang berbeda.

### bukan-sama: Semuanya sama: bukan pola

Sumber: Materi: barisan yang bukan pola. 4 ketukan, 43 kata.

1. Tidak semua barisan adalah pola. Pola harus berulang dan teratur.
2. Lihat barisan ini: merah, merah, merah, merah, merah, merah.
3. Semuanya sama. Tidak ada yang berganti, jadi barisan ini bukan pola.
4. Bandingkan dengan merah, biru, merah, biru. Warnanya berganti dengan teratur, jadi itu pola.

### bukan-acak: Urutan acak: bukan pola

Sumber: Materi: urutan acak bukan pola. 4 ketukan, 47 kata.

1. Barisan ini berganti-ganti, tetapi apakah teratur? Lihat: lingkaran, segitiga, segitiga, lingkaran, segitiga, lingkaran.
2. Kita cari bagian terkecil yang berulang. Ternyata tidak ada, karena urutannya acak.
3. Karena tidak teratur, barisan ini bukan pola.
4. Sekarang bandingkan: lingkaran, segitiga, lingkaran, segitiga, lingkaran, segitiga. Satuannya lingkaran dan segitiga, jadi ini pola.

### lanjut-contoh: Melanjutkan pola: tiga langkah

Sumber: Materi: melanjutkan pola. 5 ketukan, 78 kata.

1. Sekarang kita belajar melanjutkan pola. Perhatikan: bintang, bintang, bunga, bintang, bintang, bunga, bintang, bintang.
2. Langkah pertama, cari satuan pola. Satuannya bintang, bintang, dan bunga.
3. Langkah kedua, lanjutkan dengan urutan yang sama. Setelah dua bintang, benda berikutnya bunga.
4. Langkah ketiga, periksa dari awal. Satuan kedua dan satuan ketiga sama dengan satuan pertama. Ada tiga satuan.
5. Dengan huruf, polanya A, A, B, A, A, B, A, A, B. Setelah A, A, B, A, A, B, A, A, yang berikutnya B.

### lanjut-warna: Melanjutkan pola warna

Sumber: Materi: melanjutkan pola warna. 4 ketukan, 42 kata.

1. Sekarang barisan berwarna: merah, biru, kuning, merah, biru, lalu ada kotak kosong.
2. Satuan polanya merah, biru, dan kuning. Satuannya terdiri dari tiga benda.
3. Warna apa yang cocok untuk kotak kosong? Ketuk jawabanmu.
4. Betul, kuning! Setelah merah dan biru, yang datang berikutnya kuning.

### isi-hilang: Mengisi bagian yang hilang

Sumber: Materi: mengisi bagian yang hilang. 4 ketukan, 49 kata.

1. Kadang ada bagian yang hilang di tengah barisan: lingkaran, persegi, lingkaran, lalu kotak kosong, lalu lingkaran, persegi.
2. Cari satuan polanya dari bagian yang ada. Satuannya lingkaran dan persegi.
3. Setelah lingkaran, benda berikutnya persegi. Jadi kotak kosong itu persegi.
4. Periksa lagi: lingkaran, persegi, lingkaran, persegi, lingkaran, persegi. Barisannya sudah lengkap.

### rancang-pola: Merancang pola sendiri

Sumber: Materi: merancang pola sendiri. 5 ketukan, 68 kata.

1. Sekarang kamu bisa merancang pola sendiri. Wei memilih dua benda: bintang dan bunga.
2. Langkah pertama, pilih satuan pola yang pendek. Wei memilih bintang, bunga, dan bunga.
3. Langkah kedua, ulangi satuan itu sampai barisan penuh: bintang, bunga, bunga, bintang, bunga, bunga, bintang, bunga, bunga.
4. Langkah ketiga, periksa. Satuannya berulang dan teratur, jadi ini pola rancangan Wei.
5. Kode pola Wei adalah A, B, B, A, B, B, A, B, B.

### pola-tabel: Tabel pola: satuan dan kode

Sumber: Materi: tabel pola. 5 ketukan, 80 kata.

1. Mari kita rangkum dalam tabel. Setiap baris menunjukkan satu jenis pola.
2. Pola warna: merah, biru, merah, biru, merah, biru. Satuannya dua benda, kodenya A, B, dan ada tiga satuan.
3. Pola bentuk: hati, hati, segitiga, hati, hati, segitiga. Satuannya tiga benda, kodenya A, A, B, dan ada dua satuan.
4. Pola suara: keras, pelan, keras, pelan. Satuannya dua bunyi, kodenya A, B, dan ada dua satuan.
5. Pola gerakan: membungkuk, berdiri, membungkuk, berdiri. Satuannya dua gerakan, kodenya A, B, dan ada dua satuan.

### latihan-satu: Latihan: melanjutkan pola warna

Sumber: Materi: Latihan melanjutkan pola warna. 4 ketukan, 56 kata.

1. Latihan satu. Barisan warna: biru, kuning, biru, kuning, biru, lalu ada kotak kosong.
2. Satuan polanya biru dan kuning. Warna apa untuk kotak kosong? Ketuk jawabanmu.
3. Betul, kuning! Satuan polanya biru dan kuning, jadi yang berikutnya kuning.
4. Kode barisan ini A, B, A, B, A, B. Hanya ada dua jenis benda, jadi satuannya terdiri dari dua benda.

### latihan-dua: Latihan: mencari satuan pola

Sumber: Materi: Latihan mencari satuan pola. 4 ketukan, 46 kata.

1. Latihan dua. Perhatikan barisan: persegi, persegi, lingkaran, persegi, persegi, lingkaran, persegi, persegi, lingkaran.
2. Mana satuan pola barisan ini? Pilih bagian terkecil yang berulang dari awal. Ketuk jawabanmu.
3. Betul, A, A, B! Satuannya persegi, persegi, dan lingkaran.
4. Ada tiga satuan yang sama, jadi barisan ini adalah pola.

### latihan-tiga: Latihan: pola atau bukan pola

Sumber: Materi: Latihan pola atau bukan. 4 ketukan, 42 kata.

1. Latihan tiga. Lihat barisan ini: bintang, bintang, bunga, bintang, bunga, bunga.
2. Apakah barisan ini pola atau bukan pola? Ketuk jawabanmu.
3. Betul, bukan pola! Tidak ada bagian terkecil yang berulang dengan teratur.
4. Kalau barisannya bintang, bintang, bunga, bintang, bintang, bunga, itu baru pola.

### latihan-empat: Latihan: mengisi bagian yang hilang

Sumber: Materi: Latihan mengisi bagian hilang. 4 ketukan, 51 kata.

1. Latihan empat. Ada satu bagian yang hilang: segitiga, bintang, segitiga, bintang, lalu kotak kosong, lalu bintang.
2. Satuan polanya terdiri dari dua benda. Gambar apa yang hilang? Ketuk jawabanmu.
3. Betul, segitiga! Satuan polanya segitiga dan bintang.
4. Barisan sudah lengkap: segitiga, bintang, segitiga, bintang, segitiga, bintang. Kodenya A, B, A, B, A, B.

### penutup: Ringkasan pola

Sumber: Materi: ringkasan pola. 3 ketukan, 37 kata.

1. Mari kita ingat lagi. Pola adalah hal yang berulang dan teratur.
2. Satuan pola adalah bagian terkecil yang berulang. Dari satuan itu, kita bisa melanjutkan dan mengisi pola.
3. Kamu juga bisa merancang pola sendiri. Terima kasih, sampai jumpa!

## k2b4B-luar: Mengenal Pola: Metode dari Luar (Tiga metode luar)

9 adegan, 41 ketukan, 492 kata, sekitar 4.1 menit diputar.

### sapaan: Sapaan dan materi hari ini

Sumber: Metode luar: sapaan dan tujuan. 3 ketukan, 31 kata.

1. Halo anak-anak, selamat datang di pelajaran matematika. Hari ini kita akan belajar pola.
2. Di video ini kita akan melihat beberapa cara lain untuk belajar pola.
3. Siap? Ayo kita mulai belajar bersama.

### luar-pembuka: Tiga metode dari luar untuk pola

Sumber: Metode luar: pembuka. 5 ketukan, 78 kata.

1. Guru di banyak negara mengajarkan pola dengan cara yang berbeda-beda. Di video ini kita lihat tiga metode dari luar.
2. Tiga metode itu bernama Pola Berulang, Pola AB dan ABC, dan Buat Pola.
3. Pola Berulang memakai satuan pola untuk melanjutkan barisan. Pola AB dan ABC mengenali jenis satuan pola. Buat Pola mengajak kita merancang pola sendiri.
4. Kita memakai gambar di layar. Kamu cukup mengetuk dan memilih jawaban dengan teliti.
5. Siap? Ayo kita mulai dengan metode pertama, yaitu Pola Berulang.

### luar-berulang: Pola Berulang: satuan menentukan lanjutan

Sumber: Metode luar: Pola Berulang. 5 ketukan, 67 kata.

1. Metode pertama bernama Pola Berulang. Satuan pola menentukan lanjutannya.
2. Lihat barisan ini: biru, kuning, kuning, biru, kuning, kuning, biru, kuning. Ada satu kotak kosong di ujung.
3. Cari satuan polanya: biru, kuning, dan kuning. Satuannya terdiri dari tiga benda.
4. Lanjutkan dengan satuan yang sama. Setelah biru dan kuning, yang datang berikutnya kuning.
5. Kalau satuannya diganti menjadi biru dan kuning, lanjutannya ikut berubah: biru, kuning, biru, kuning, biru, kuning.

### luar-berulang-terapan: Pola Berulang: melanjutkan barisan

Sumber: Metode luar: Pola Berulang, terapan. 4 ketukan, 40 kata.

1. Sekarang giliranmu. Perhatikan: merah, merah, hijau, merah, merah, hijau, merah, merah, lalu ada kotak kosong.
2. Cari satuan polanya: merah, merah, dan hijau. Satuannya terdiri dari tiga benda.
3. Warna apa untuk kotak kosong? Ketuk jawabanmu.
4. Betul, hijau! Satuan pola menentukan lanjutannya.

### luar-ab: Pola AB dan ABC: jenis satuan pola

Sumber: Metode luar: Pola AB dan ABC. 5 ketukan, 72 kata.

1. Metode kedua bernama Pola AB dan ABC. Kita mengenali jenis satuan pola.
2. Barisan pertama: bunga, hati, bunga, hati, bunga, hati. Ada dua jenis benda, jadi kodenya A, B.
3. Barisan kedua: bunga, bintang, hati, bunga, bintang, hati. Ada tiga jenis benda, jadi kodenya A, B, C.
4. Pola A B punya dua jenis benda dalam satuannya. Pola A B C punya tiga jenis benda.
5. Untuk mengenali jenisnya, lihat satuan polanya, lalu hitung jenis bendanya.

### luar-ab-terapan: Pola AB dan ABC: mengenali jenisnya

Sumber: Metode luar: Pola AB dan ABC, terapan. 4 ketukan, 50 kata.

1. Sekarang giliranmu. Lihat barisan ini: lingkaran, bunga, persegi, lingkaran, bunga, persegi.
2. Jenis apa satuan polanya? Ketuk jawabanmu.
3. Betul, A, B, C! Satuannya punya tiga jenis benda, jadi ini pola A B C.
4. Barisan lain: hati, persegi, hati, persegi, hati, persegi. Hanya ada dua jenis benda, jadi ini pola A B.

### luar-buat: Buat Pola: menyusun pola sendiri

Sumber: Metode luar: Buat Pola. 5 ketukan, 62 kata.

1. Metode ketiga bernama Buat Pola. Kita menyusun pola sendiri dari benda yang kita pilih.
2. Igil memilih dua benda: persegi dan lingkaran.
3. Susun satuannya dulu: persegi, lingkaran, dan lingkaran.
4. Lalu ulangi satuan itu sampai barisan penuh: persegi, lingkaran, lingkaran, persegi, lingkaran, lingkaran, persegi, lingkaran, lingkaran.
5. Barisan Igil berulang dan teratur, jadi ini pola. Kodenya A, B, B, A, B, B, A, B, B.

### luar-buat-terapan: Buat Pola: melengkapi dan merancang

Sumber: Metode luar: Buat Pola, terapan. 5 ketukan, 52 kata.

1. Sekarang giliranmu. Upe merancang pola: bintang, bunga, hati, bintang, kotak kosong, lalu hati.
2. Cari satuan polanya: bintang, bunga, dan hati. Satuannya terdiri dari tiga benda.
3. Benda apa yang cocok untuk kotak kosong? Ketuk jawabanmu.
4. Betul, bunga! Setelah bintang, yang datang berikutnya bunga.
5. Sekarang giliranmu merancang pola sendiri. Ketuk kotaknya untuk mengganti benda.

### luar-ringkas: Ringkasan tiga metode dari luar

Sumber: Ringkasan: tiga metode luar. 5 ketukan, 40 kata.

1. Mari kita ingat lagi tiga metode dari luar.
2. Pola Berulang: satuan pola menentukan lanjutannya.
3. Pola AB dan ABC: kenali jenis satuan pola.
4. Buat Pola: susun pola sendiri dari benda pilihanmu.
5. Pilih cara yang paling mudah untukmu. Terima kasih, sampai jumpa!

## Tiga metode luar (nama Indonesia)

1. Pola Berulang: satuan pola menentukan lanjutannya (adegan luar-berulang dan luar-berulang-terapan).
2. Pola AB dan ABC: kenali jenis satuan pola (luar-ab dan luar-ab-terapan).
3. Buat Pola: menyusun pola sendiri dari benda pilihan (luar-buat dan luar-buat-terapan).

## Peta (Mind-Map susun)

Pusat: Apa itu pola?. 11 simpul.

- 1. Tiga hal yang dipelajari (cabang)
- 2. Pola dan satuan pola
- 3. Melanjutkan dan mengisi pola
- 4. Merancang pola sendiri
- 5. Cara melakukannya (cabang)
- 6. Cari bagian yang berulang
- 7. Ulangi satuan yang sama
- 8. Periksa dari awal
- 9. Hasil yang diharapkan (cabang)
- 10. Membedakan pola dan bukan
- 11. Pola sendiri berulang

## Tabel (Infografis susun)

4 baris x 3 kolom data (+ label). Kolom: Satuan, Kode, Ulang.

- Warna: 2 | AB | 3
- Bentuk: 3 | AAB | 2
- Suara: 2 | AB | 2
- Gerakan: 2 | AB | 2

## Temuan data (src/data/kelas2-bab4.json, subBabs.B)

- targetDescription terulang dua kali ("Siswa memakai cara Pola Berulang, Pola AB dan ABC, Buat Pola." dua kali) dan nama metode luar Inggris ganda (Repeating Pattern, AB / ABC Patterns, Create Pattern) berdampingan dengan namaId; story ini hanya memakai nama Indonesia.
- voiceNarration dan ketukan terulang dua kali ("Ingat cara Pola Berulang: ..." dan "Di sini kita memakai ide Repeating Pattern ..." disebut dua kali per ketukan); tidak dipakai.
- Adegan data memuat Lili dan Tika (bukan tokoh tetap) dan "enam sekawan"; diganti enam tokoh tetap Malosi, Kira, Upe, Wei, Halim, Igil dengan pola topi merah dan biru dihitung ulang (bukan laki-laki dan perempuan).
- Benda fisik dan kerja kelompok: taplak meja, kaus, gelas ikan, manik-manik, "Tulis hasilnya pada tabel, lalu ceritakan kepada temanmu", "Dalam kelompok, buatlah pola gerakan dan pola suara", "Presentasikan", "menirukan gerakan di tempat duduk", "Atur Barisan Sahabat", "Rangkai Manik-Manik". Diganti benda di layar (bunga, persegi, hati, segitiga, bintang, lingkaran, warna, emoji gerakan, lingkaran keras/pelan/diam) dan aksi ketuk.
- Tepuk satu, dua, tiga, empat kali dan kata "kali" diganti pola suara keras, pelan, diam (kata tanpa digit).
- mindMaps data bertele-tele dengan langkah kosong generik ("Kerjakan: Terapkan cara itu pada angka atau gambar", "Cek masuk akal", "Simpulkan", "Main"); diganti Peta susun 11 simpul sesuai brief.
- infografisData: "Satuan pola adalah kelompok terkecil yang berulang" memakai kata "kelompok" (dilarang); story memakai "bagian terkecil yang berulang". countNum/countWord tidak relevan (mis. Pola Suara empat, Kode Huruf tiga).
- silabus.referensi: "Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 4 Sub-Bab B)" dan bookReference tiap permainan ("Buku Siswa hlm. ...") memuat kata "buku" dan halaman; tidak disebut di video.
- silabus.teksSuara menyebut "taplak meja, kaus" dan "barisan enam sekawan"; tidak dipakai.
- Fakta pola tidak salah, tetapi barisan "hati, hati, segitiga, segitiga, hati, hati" pada data baru mempunyai satuan empat benda (hati, hati, segitiga, segitiga), dan "A A B A A B A A -> B" cocok; diperiksa uji hitung ulang.
