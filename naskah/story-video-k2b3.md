# Story video Kelas 2 Bab 3: Bentuk di Sekitar Kita

# Story Kelas 2 Bab 3 Sub-Bab A: Bangun Datar

Berkas: `src/components/modul/story/k2b3A-{video,materi-1..4,luar-1,luar-2,gambar,bantu}.ts`, `src/components/modul/video-k2b3a.tsx` (ekspor `VideoK2B3A`), `scripts/uji-story-k2b3A.mjs`, `.tmp-k2b3s/A.json`.
Ekspor: `VIDEO_MATERI_K2B3A` (id `k2b3A-materi`), `VIDEO_LUAR_K2B3A` (id `k2b3A-luar`).

## Video materi kurikulum (18 adegan, 89 ketukan, 1010 kata, sekitar 8,4 menit)
Judul "Bangun Datar", subjudul "Materi kurikulum". Tokoh: Upe (sarang lebah), Kira (mencari bentuk), Halim (latihan 1), Wei (latihan 2), Igil (latihan 3). Tiga hal yang dipelajari (daftar sapaan): Segi banyak dan lengkung; Menghitung sisi lalu menamai; Lingkaran yang bisa berputar.

| No | Adegan (id) | Ketukan | Kata | Isi |
|---|---|---|---|---|
| 1 | sapaan | 3 | 37 | tiga hal yang dipelajari |
| 2 | cerita-sarang | 5 | 75 | sarang lebah (tujuh segi enam berdempetan), hitung enam sisi satu lubang, segi enam; segitiga, segi empat, segi lima, lingkaran |
| 3 | sisi-pojok | 6 | 71 | tiga bentuk dasar; garis lurus = sisi; ujung sisi = pojok/sudut; segitiga 3 sisi 3 pojok |
| 4 | segi-banyak | 4 | 48 | segi banyak dibatasi sisi lurus; empat contoh; pojok sama dengan sisi |
| 5 | lengkung | 4 | 40 | kurva; bentuk lengkung (lingkaran, telur, hati); tanpa sisi lurus |
| 6 | pilah-dua | 5 | 52 | geser enam bentuk ke kotak segi banyak atau bentuk lengkung |
| 7 | bukan-segi-banyak | 6 | 79 | syarat segi banyak: semua sisi lurus (segi empat dan segitiga ya; setengah lingkaran dan bawah melengkung bukan) |
| 8 | hitung-sisi | 6 | 57 | hitung sisi segitiga (3) dan segi empat (4), dua rupa segi empat |
| 9 | segi-lima-enam | 5 | 59 | segi lima (5, rumah burung) dan segi enam (6, sarang lebah) |
| 10 | bandingkan-sisi | 5 | 59 | 6 sisi lebih banyak dari 5 sisi, selisih satu |
| 11 | pola-nama | 4 | 32 | tabel pola: 3 segitiga, 4 segi empat, 5 segi lima, 6 segi enam |
| 12 | lingkaran-putar | 7 | 91 | jari-jari sama panjang; cap lingkaran lalu diputar selalu pas; telur diputar tidak pas |
| 13 | temukan-bentuk | 7 | 69 | enam benda di layar: rambu, bendera, rumah burung, sarang lebah, jam dinding, telur |
| 14 | tiga-pertanyaan | 5 | 57 | tiga pertanyaan detektif bentuk (lurus/lengkung, berapa sisi, pas diputar) |
| 15 | latihan-satu | 4 | 42 | Halim: lima sisi, pilih segi lima |
| 16 | latihan-dua | 4 | 41 | Wei: bentuk hati termasuk bentuk lengkung |
| 17 | latihan-tiga | 4 | 40 | Igil: lubang sarang punya 6 sisi |
| 18 | penutup | 5 | 61 | ringkasan tiga hal dan salam |

## Video metode luar (9 adegan, 41 ketukan, 524 kata, sekitar 4,4 menit)
Judul "Bangun Datar: Metode dari Luar", subjudul "Tiga metode luar". Tiga metode (namaId): van Hiele Visual, Pilah Ciri, Papan Paku.

| No | Adegan (id) | Ketukan | Kata |
|---|---|---|---|
| 1 | sapaan | 3 | 33 |
| 2 | luar-pembuka | 5 | 75 |
| 3 | luar-visual (kenali bentuk utuh: tiga segitiga tinggi, lebar, miring; dua segi empat tegak dan miring) | 5 | 62 |
| 4 | luar-visual-terapan (contoh segi lima, tiga pilihan: segi enam, segi lima diputar, lingkaran) | 4 | 48 |
| 5 | luar-pilah (Pilah Ciri: enam bangun dipilah ke empat kolom 3, 4, 5, 6 sisi) | 5 | 67 |
| 6 | luar-pilah-terapan (segi enam masuk kolom 6 sisi) | 4 | 45 |
| 7 | luar-paku (Papan Paku 4 x 4 paku: karet membentuk segitiga lalu segi empat) | 5 | 72 |
| 8 | luar-paku-terapan (lima paku, lima karet, segi lima) | 5 | 68 |
| 9 | luar-ringkas | 5 | 54 |

## Peta dan tabel susun (`.tmp-k2b3s/A.json`)
- Peta: pusat "Apa nama bangun datar ini?" (26 huruf); 3 cabang urut: Tiga hal yang dipelajari (anak = daftar sapaan persis), Cara melakukannya (Lihat tepinya dulu; Hitung sisi lalu beri nama; Putar untuk uji lingkaran), Hasil yang diharapkan (Tahu nama segi banyak; Bisa mengenali lingkaran); 11 simpul bernomor 1..11, teks <= 28 huruf, unik, suara dan petunjuk tanpa digit.
- Tabel: 4 baris x 3 kolom (kolom Sisi, Pojok, Contoh; pojok "Bangun"): Segitiga (3 sisi, 3 pojok, rambu), Segi empat (4 sisi, 4 pojok, bendera), Segi lima (5 sisi, 5 pojok, rumah), Segi enam (6 sisi, 6 pojok, sarang); sel <= 7 huruf, satu angka per sel, kata label <= 8 huruf.

## Uji (scripts/uji-story-k2b3A.mjs)
Lulus 7048, gagal 0. Uji hitung ulang dari struktur adegan: banyak titik sudut jalur = banyak sisi yang disebut suara, nama bangun, teks "N sisi", kartu "N sisi dan N pojok"; garis sisi menghubungkan sudut i ke i+1 dan angka berurutan; hitungan "satu, dua, ..." di suara sama dengan banyak angka sisi yang tergambar; tujuh segi enam sarang berbagi sisi; kotak pilah (segi banyak vs lengkung) dan kolom pilah menurut banyak sisi; cap dan putaran (lingkaran selalu pas, telur diputar tidak pas), enam jari-jari sama panjang; papan paku (karet paku ke paku, bersambung, menutup, cembung, = bangun); jawaban latihan dan terapan benar dan dipilih; syarat segi banyak (tanda ya/tidak sesuai bentuk); isi tabel susun dihitung ulang dari bangun bernama di video materi. Diuji juga dengan mengubah gambar (sengaja salah) dan uji gagal sebagaimana mestinya.

## Temuan data (kelas2-bab3.json subBabs.A)
- Nama metode ganda Inggris/Indonesia di mindMaps (Attribute Sort, Geoboard) dan teks suara ("Di sini kita memakai Geoboard"): dipakai namaId saja.
- targetDescription terulang dua kali ("Siswa memakai cara van Hiele Visual, Pilah Ciri, Papan Paku." dua kali).
- mindMaps generik/bertele-tele: langkah "Kerjakan: Terapkan cara itu pada angka atau gambar", "Main: Latih di Concrete sampai Abstract" (angka/gambar tak relevan untuk geometri).
- Suara cerita memuat kalimat berulang ("Ingat cara ... Ingat cara ... "), dan akhir berbunyi "van" saja pada papan V1-3.
- Benda fisik dan tokoh luar enam: "Paman membawa madu dan sarangnya", "memakannya", madu; "uang logam", "Letakkan uang logam di atas kertas, lalu cetak"; "amati benda-benda di sekitarmu"; "karet" pada Papan Paku; "bunga morning glory" (nama Inggris); silabus "Bukunya bernama Bentuk di Sekitar Kita" dan "Buku Siswa" (kata "buku").
- Pengayaan data menyebut segi tujuh dan segi delapan (rambu STOP) dan bentuk "segi lima pada teh celup": di luar lingkup tiga sampai enam sisi, tidak dipakai.
- Tidak ada kesalahan fakta geometri yang ditemukan; "bentuk telur" dan "hati" diperlakukan sebagai bentuk lengkung (bukan lingkaran).
- Penyesuaian digital: Pilah Ciri, Papan Paku dan cetak-putar dijadikan seret bentuk, tarik karet pada paku di layar, dan lihat cap di layar.

# Naskah singkat: Story Kelas 2 Bab 3 Sub-Bab B (Mengurai dan Menyusun Bangun Datar)

Berkas: `src/components/modul/story/k2b3B-*.ts` (video, materi-1..4, luar-1, luar-2, gambar, bantu), `src/components/modul/video-k2b3b.tsx` (`VideoK2B3B`, menimpa versi lama), `scripts/uji-story-k2b3B.mjs`, `.tmp-k2b3s/B.json`.
Ekspor: `VIDEO_MATERI_K2B3B` (id `k2b3B-materi`), `VIDEO_LUAR_K2B3B` (id `k2b3B-luar`). Tokoh: Malosi, Kira, Upe, Wei, Halim, Igil. Semua bangun digambar sebagai jalur tertutup di layar; aksi siswa hanya ketuk dan pilih kartu.

## Video materi: 21 adegan, 94 ketukan, 1023 kata (8,5 menit)
sapaan (daftar: Mengurai satu bangun, Menyusun beberapa bangun, Pola segitiga); urai-arti (persegi, sisi 1-4, garis, keping);
urai-miring (garis miring: dua segitiga, sisi dihitung); urai-tengah (garis tengah: dua segi empat); beda-cara (dua persegi, dua cara);
dua-garis (persegi panjang: dua garis tak bersilangan 2 segitiga + 1 segi empat; bersilangan 2 segitiga + 2 segi empat);
hitung-keping (perahu: 2 segitiga + 1 segi empat); susun-arti (dua segitiga jadi persegi); dua-segitiga (persegi, segitiga besar, segi empat miring);
susun-segienam (2 segitiga + segi empat jadi segi enam, dua susunan); pola-empat, pola-lima, pola-enam (dari satu pojok, n - 2 segitiga, n - 3 garis);
pola-tengah (dari titik tengah, n segitiga; segi enam dan segi lima); pola-tabel (tabel sisi dan segitiga); urai-susun-balik; latihan-satu..empat; penutup.

## Video metode luar: 9 adegan, 43 ketukan, 460 kata (3,8 menit)
sapaan, luar-pembuka, luar-susun (Susun Bangun: empat persegi kecil jadi persegi besar), luar-susun-terapan (persegi + segitiga jadi segi lima, pilih jumlah sisi),
luar-urai (Urai Bangun: bangun L jadi dua segi empat), luar-urai-terapan (bangun T, pilih jumlah keping), luar-tangram (tujuh keping: lima segitiga 2 besar 1 sedang 2 kecil, persegi, jajar genjang),
luar-tangram-terapan (dua segitiga besar jadi segitiga; tujuh keping jadi persegi), luar-ringkas.
Tiga metode luar: Susun Bangun, Urai Bangun, Tangram.

## Peta dan tabel susun (`.tmp-k2b3s/B.json`)
Peta: pusat "Bagaimana urai dan susun?"; 3 cabang (3 hal = daftar sapaan, 3 cara, 2 hasil), 11 simpul. Tabel: 4 baris (segitiga, segi empat, segi lima, segi enam) x 3 kolom (Sisi, Segitiga, Garis), dihitung ulang dari gambar. Lulus uji-susun-k2b3.mjs dan uji-susun-k1b8.mjs.

## Temuan data (kelas2-bab3.json subBab B)
- targetDescription terulang dua kali ("Siswa memakai cara Susun Bangun, Urai Bangun, Tangram").
- silabus.teksSuara memuat "Bukunya bernama ..." dan referensi "Buku Siswa"; bookReference game memuat "Buku Siswa hlm."
- namaId ganda Inggris di mindMaps (Compose, Decompose) dan narasi stories ("ide Compose", kalimat metode diulang dua kali).
- mindMap bertele-tele: langkah generik "Kerjakan: Terapkan cara itu pada angka atau gambar", "Latih di Concrete sampai Abstract".
- Benda fisik: "Gunting Kertas", "Bongkar Bangunan Mainan"; diganti aksi layar.
- Data menyebut hasil "2 segitiga + 2 segi empat" dengan "dua garis" tanpa cara jelas; dibuktikan hanya benar bila kedua garis bersilangan (A ke F dan B ke E), sedangkan dua garis tak bersilangan menghasilkan 2 segitiga + 1 segi empat.
- "Dua segitiga + satu segi empat jadi segi enam" benar hanya bila alas segitiga sama dengan sisi segi empat; dibuat demikian.
- Tangram "segi empat miring" = jajar genjang; keping lain "persegi" (satu).

# Naskah Story Kelas 2 Bab 3 Sub-Bab C: Bangun Ruang

Dua video terpisah (mesin Story): materi kurikulum (`k2b3C-materi`) dan tiga metode luar (`k2b3C-luar`). Semua gambar adalah bentuk di layar (jalur, lingkaran, kotak, garis). Bilangan sampai 20 (rusuk paling banyak 12). Tokoh Malosi, Kira, Upe, Wei, Halim, Igil.

## k2b3C-materi: Bangun Ruang (Materi kurikulum)

21 adegan, 97 ketukan, 1156 kata, sekitar 9.6 menit diputar (dua kata per detik, sapaan termasuk).

### sapaan: Sapaan dan materi hari ini
Sumber: Materi: sapaan dan tujuan. 3 ketukan, 36 kata.

1. Halo anak-anak, selamat datang di pelajaran matematika. Hari ini kita akan belajar bangun ruang.
2. Nanti kita akan mempelajari bangun datar dan ruang, permukaan datar dan lengkung, dan lima bangun ruang.
3. Siap? Ayo kita mulai belajar bersama.

### benda-layar: Benda dan bentuk di layar
Sumber: Materi: bangun datar dan bangun ruang. 4 ketukan, 50 kata.

1. Lihat layar. Ada topi ulang tahun, dadu, kaleng, dan bola.
2. Ada juga bentuk yang tipis. Ada segitiga, segi empat, dan lingkaran.
3. Bentuk yang tipis kita sebut bangun datar. Benda yang punya ruang kita sebut bangun ruang.
4. Hari ini kita belajar membedakan bangun datar dan bangun ruang. Kita juga mengenal nama-namanya.

### bangun-datar: Bangun datar: satu permukaan
Sumber: Materi: bangun datar. 5 ketukan, 67 kata.

1. Sekarang kita lihat bangun datar lebih dekat. Bangun datar hanya punya satu permukaan.
2. Segitiga dibatasi tiga sisi lurus. Segi empat dibatasi empat sisi lurus. Lingkaran dibatasi garis lengkung.
3. Bangun datar itu tipis. Tidak ada ruang di dalamnya, jadi kita tidak bisa mengisinya.
4. Segitiga, segi empat, dan lingkaran semuanya bangun datar. Semuanya hanya punya satu permukaan.
5. Ingat, bangun datar tidak punya ruang di dalam dan tidak bisa diisi.

### bangun-ruang: Bangun ruang: punya ruang di dalam
Sumber: Materi: bangun ruang. 5 ketukan, 64 kata.

1. Sekarang bangun ruang. Bangun ruang punya ruang di dalamnya, jadi dapat diisi.
2. Lihat kotak ini. Kita isi dengan bola kecil. Satu, dua, tiga, empat, lima. Bola kecil muat di dalam kotak.
3. Kotak, kubus, topi, dan botol adalah bangun ruang. Semuanya punya ruang di dalam.
4. Bangun ruang punya beberapa permukaan. Dadu punya banyak permukaan, bukan hanya satu.
5. Jadi, benda yang bisa diisi adalah bangun ruang.

### bisa-diisi: Bisa diisi atau tidak?
Sumber: Materi: bisa diisi atau tidak. 5 ketukan, 66 kata.

1. Untuk membedakan, Malosi bertanya satu hal. Apakah benda ini bisa diisi?
2. Kotak bisa diisi. Botol bisa diisi. Topi juga bisa diisi. Jadi ketiganya bangun ruang.
3. Sekarang lihat bentuk segi empat yang tipis ini. Apakah bisa diisi?
4. Tidak bisa, karena tidak ada ruang di dalamnya. Jadi itu bangun datar.
5. Pertanyaan ini membantu kita memilah dengan cepat. Bisa diisi berarti bangun ruang. Tidak bisa diisi berarti bangun datar.

### gelinding: Menggelindingkan benda di layar
Sumber: Materi: benda yang menggelinding. 5 ketukan, 61 kata.

1. Kira ingin menggelindingkan benda di layar. Ada bola, kaleng, dan dadu di atas lereng.
2. Ketuk bola. Bola meluncur dan berputar. Bola menggelinding dengan mudah.
3. Sekarang ketuk dadu. Dadu tetap diam di tempatnya. Dadu tidak mau menggelinding.
4. Ketuk kaleng. Kaleng berbaring dan ikut menggelinding. Kaleng juga mudah menggelinding.
5. Jadi bola dan kaleng menggelinding, sedangkan dadu diam. Mengapa begitu? Kita lihat sebentar lagi.

### permukaan: Permukaan datar dan permukaan lengkung
Sumber: Materi: permukaan datar dan lengkung. 5 ketukan, 61 kata.

1. Bangun ruang dibedakan menurut permukaannya. Ada permukaan datar, dan ada permukaan lengkung.
2. Kubus dan balok punya permukaan datar. Permukaan datar itu rata.
3. Tabung, kerucut, dan bola punya permukaan lengkung. Permukaan lengkung itu melengkung.
4. Tabung dan kerucut juga punya alas yang datar. Tetapi ada permukaan lengkung, jadi masuk kelompok lengkung.
5. Bola paling lengkung. Seluruh permukaan bola melengkung, tidak ada bagian yang datar.

### mengapa: Mengapa menggelinding dan mengapa diam?
Sumber: Materi: lengkung berguling, datar menahan. 4 ketukan, 46 kata.

1. Mengapa ada benda yang menggelinding dan ada yang diam? Karena permukaannya berbeda.
2. Permukaan lengkung bisa berguling terus. Lihat, bola menggelinding jauh.
3. Permukaan datar menahan benda supaya diam. Karena itu kita bisa menumpuk dadu.
4. Bola cocok untuk digelindingkan. Dadu cocok untuk ditumpuk. Setiap permukaan punya kegunaan sendiri.

### lima-nama: Lima nama bangun ruang
Sumber: Materi: nama bangun ruang. 5 ketukan, 56 kata.

1. Ada lima nama bangun ruang yang perlu kita kenal. Mari kita sebut satu per satu.
2. Kubus, balok, tabung, kerucut, dan bola.
3. Kubus seperti dadu. Balok seperti kardus. Keduanya punya permukaan datar.
4. Tabung seperti kaleng. Kerucut seperti topi ulang tahun. Keduanya punya permukaan lengkung.
5. Bola seperti kelereng. Seluruh permukaannya lengkung. Sekarang kita kenali ciri-ciri tiap bangun ruang.

### kubus-sisi: Kubus: enam sisi
Sumber: Materi: kubus dan sisinya. 5 ketukan, 67 kata.

1. Sekarang kita kenali kubus. Dadu adalah contoh kubus.
2. Kubus punya permukaan berbentuk segi empat yang sama besar. Permukaan kubus kita sebut sisi.
3. Ayo hitung sisinya. Satu depan, dua atas, tiga kanan, empat belakang, lima bawah, enam kiri.
4. Jadi kubus punya enam sisi, dan semua sisinya segi empat yang sama besar.
5. Dadu juga begitu. Dadu punya enam sisi, dan tiap sisi punya satu angka dari satu sampai enam.

### kubus-rusuk: Kubus: rusuk dan titik sudut
Sumber: Materi: rusuk dan titik sudut kubus. 6 ketukan, 77 kata.

1. Sisi-sisi kubus bertemu di sebuah garis. Garis tempat sisi bertemu itu kita sebut rusuk.
2. Ayo hitung rusuknya. Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh, sebelas, dua belas.
3. Rusuk yang putus-putus tersembunyi di belakang kubus. Jadi kubus punya dua belas rusuk.
4. Rusuk-rusuk bertemu di pojok. Pojok itu kita sebut titik sudut.
5. Ayo hitung titik sudutnya. Satu, dua, tiga, empat, lima, enam, tujuh, delapan.
6. Jadi kubus punya enam sisi, dua belas rusuk, dan delapan titik sudut.

### balok: Balok: enam sisi berbeda ukuran
Sumber: Materi: balok. 5 ketukan, 66 kata.

1. Sekarang balok. Kardus dan kotak hadiah yang panjang adalah contoh balok.
2. Balok juga punya enam sisi berbentuk segi empat. Tetapi ukuran sisinya tidak sama semua.
3. Kubus punya sisi yang semuanya sama besar. Balok punya sisi yang berbeda ukuran.
4. Balok punya dua belas rusuk dan delapan titik sudut. Jumlahnya sama dengan kubus.
5. Jadi kubus dan balok sama-sama punya enam sisi, dua belas rusuk, dan delapan titik sudut.

### tabung: Tabung: dua datar, satu lengkung
Sumber: Materi: tabung. 5 ketukan, 54 kata.

1. Sekarang tabung. Kaleng dan botol adalah contoh tabung.
2. Tabung punya dua permukaan datar. Bentuknya lingkaran, satu di atas dan satu di bawah.
3. Tabung juga punya satu permukaan lengkung, yaitu bagian sampingnya.
4. Karena ada permukaan lengkung, tabung mudah menggelinding kalau berbaring. Kalau berdiri, tabung kokoh.
5. Jadi tabung punya dua permukaan datar dan satu permukaan lengkung.

### kerucut: Kerucut: satu datar, satu lengkung, satu puncak
Sumber: Materi: kerucut. 5 ketukan, 57 kata.

1. Sekarang kerucut. Topi ulang tahun dan kerucut es krim adalah contoh kerucut.
2. Kerucut punya satu permukaan datar, yaitu alasnya yang berbentuk lingkaran.
3. Kerucut juga punya satu permukaan lengkung di bagian sampingnya.
4. Ujung kerucut yang runcing kita sebut titik puncak. Kerucut punya satu titik puncak.
5. Jadi kerucut punya satu permukaan datar, satu permukaan lengkung, dan satu titik puncak.

### bola: Bola: hanya satu permukaan lengkung
Sumber: Materi: bola. 4 ketukan, 46 kata.

1. Terakhir, bola. Bola sepak dan kelereng adalah contoh bola.
2. Seluruh permukaan bola lengkung. Bola hanya punya satu permukaan, yaitu permukaan lengkung.
3. Bola tidak punya permukaan datar. Bola juga tidak punya rusuk dan tidak punya titik sudut.
4. Karena seluruhnya lengkung, bola paling mudah menggelinding ke segala arah.

### tabel-ruang: Tabel permukaan bangun ruang
Sumber: Materi: tabel permukaan. 5 ketukan, 51 kata.

1. Kita rangkum dalam tabel. Setiap baris adalah satu bangun ruang.
2. Kubus dan balok punya enam permukaan datar dan tidak punya permukaan lengkung.
3. Tabung punya dua permukaan datar dan satu permukaan lengkung.
4. Kerucut punya satu permukaan datar dan satu permukaan lengkung.
5. Bola tidak punya permukaan datar. Bola hanya punya satu permukaan lengkung.

### cari-ruang: Mencari bangun ruang pada benda
Sumber: Materi: mengenali bangun ruang. 5 ketukan, 60 kata.

1. Sekarang kita cari bangun ruang pada benda di layar. Ada dadu, kardus, kaleng, topi, dan kelereng.
2. Dadu bentuknya kubus. Kardus bentuknya balok. Keduanya punya permukaan datar.
3. Kaleng bentuknya tabung. Topi ulang tahun bentuknya kerucut. Keduanya punya permukaan lengkung.
4. Kelereng bentuknya bola. Bola seluruhnya lengkung.
5. Dengan cara ini, kita bisa mengenali bangun ruang pada benda apa saja yang tampil di layar.

### latihan-satu: Latihan satu: mana yang menggelinding?
Sumber: Materi: latihan menggelinding. 4 ketukan, 39 kata.

1. Latihan satu. Upe memperhatikan tiga bangun ruang di layar. Mana yang menggelinding?
2. Pilih bangun ruang yang bisa menggelinding. Ketuk salah satu kartu.
3. Jawabannya bola. Permukaan bola lengkung, jadi bola menggelinding.
4. Kubus dan balok punya permukaan datar, jadi keduanya diam.

### latihan-dua: Latihan dua: tebak dari petunjuk
Sumber: Materi: latihan menebak bangun ruang. 4 ketukan, 40 kata.

1. Latihan dua. Wei menebak bangun ruang dari dua petunjuk.
2. Petunjuk pertama, alasnya berbentuk lingkaran. Petunjuk kedua, ujungnya runcing.
3. Sekarang pilih namanya. Apakah tabung, kerucut, atau bola?
4. Tabung dan kerucut punya alas lingkaran, tetapi hanya kerucut yang ujungnya runcing. Jawabannya kerucut.

### latihan-tiga: Latihan tiga: rusuk balok
Sumber: Materi: latihan rusuk balok. 4 ketukan, 39 kata.

1. Latihan tiga. Halim ingin tahu, berapa banyak rusuk balok?
2. Perhatikan balok di layar. Semua rusuknya kita tandai dengan garis hijau.
3. Sekarang pilih jawabannya. Ketuk kartu yang benar.
4. Balok punya dua belas rusuk. Jumlah ini sama dengan banyak rusuk kubus.

### penutup: Rangkuman dan penutup
Sumber: Materi: rangkuman. 4 ketukan, 53 kata.

1. Hebat, kamu sudah belajar bangun datar dan bangun ruang. Bangun ruang bisa diisi, bangun datar tidak.
2. Kamu juga sudah mengenal lima bangun ruang: kubus, balok, tabung, kerucut, dan bola.
3. Kubus dan balok punya permukaan datar. Tabung, kerucut, dan bola punya permukaan lengkung.
4. Sampai jumpa di video berikutnya. Igil bangga padamu, tetap semangat belajar!

## k2b3C-luar: Bangun Ruang: Metode dari Luar (Tiga metode luar)

9 adegan, 43 ketukan, 498 kata, sekitar 4.2 menit diputar (dua kata per detik, sapaan termasuk).

### sapaan: Sapaan dan materi hari ini
Sumber: Metode luar: sapaan dan tujuan. 3 ketukan, 33 kata.

1. Halo anak-anak, selamat datang di pelajaran matematika. Hari ini kita akan belajar bangun ruang.
2. Di video ini kita akan melihat beberapa cara lain untuk belajar bangun ruang.
3. Siap? Ayo kita mulai belajar bersama.

### luar-pembuka: Tiga metode dari luar untuk bangun ruang
Sumber: Metode luar: pembuka. 5 ketukan, 68 kata.

1. Guru di banyak negara memakai cara lain untuk belajar bangun ruang. Di video ini kita lihat tiga metode dari luar.
2. Cara pertama bernama Cetak Permukaan. Cara kedua bernama Tas Misteri. Cara ketiga bernama Ciri Bangun Ruang.
3. Semua cara ini membantu kita mengenali bentuk permukaan dan ciri-ciri bangun ruang.
4. Kita memakai bentuk di layar. Kamu cukup mengamati dengan teliti, lalu memilih jawabannya.
5. Siap? Ayo kita mulai dengan cara pertama.

### luar-cetak: Cetak Permukaan: bangun ruang jadi bangun datar
Sumber: Metode luar: Cetak Permukaan. 5 ketukan, 65 kata.

1. Cara pertama bernama Cetak Permukaan. Bangun ruang di layar ditekan, seperti membuat cap.
2. Dadu kubus ditekan. Cap yang muncul berbentuk segi empat yang sisinya sama panjang.
3. Kardus balok ditekan. Cap yang muncul juga segi empat, tetapi sisinya tidak sama panjang.
4. Kaleng tabung dan topi kerucut ditekan. Keduanya meninggalkan cap berbentuk lingkaran.
5. Bola ditekan, tetapi tidak ada cap yang rapi, karena bola tidak punya permukaan datar.

### luar-cetak-terapan: Cetak Permukaan: cap kaleng
Sumber: Metode luar: Cetak Permukaan, terapan. 5 ketukan, 44 kata.

1. Sekarang kita coba. Ada kaleng di layar. Kita tekan permukaannya yang rata.
2. Kaleng ditekan, dan sebuah cap muncul di sebelahnya.
3. Cap itu bangun datar apa? Pilih jawabannya.
4. Cap kaleng berbentuk lingkaran. Jawabannya lingkaran.
5. Cetak Permukaan membantu kita mengenali bentuk datar pada permukaan bangun ruang.

### luar-tas: Tas Misteri: tebak dari bayangan dan petunjuk
Sumber: Metode luar: Tas Misteri. 5 ketukan, 71 kata.

1. Cara kedua bernama Tas Misteri. Ada sebuah bangun ruang yang tersembunyi di dalam tas.
2. Kita tidak melihat bendanya, hanya bayangannya di layar. Bayangannya berbentuk segi empat yang sama sisinya.
3. Petunjuk pertama, semua permukaannya datar. Jadi bukan tabung, bukan kerucut, dan bukan bola.
4. Petunjuk kedua, bayangannya segi empat yang sama sisinya. Balok bayangannya segi empat panjang, jadi bukan balok.
5. Tinggal satu kemungkinan, yaitu kubus. Tas dibuka, dan benar, di dalamnya ada kubus.

### luar-tas-terapan: Tas Misteri: bayangan segitiga
Sumber: Metode luar: Tas Misteri, terapan. 5 ketukan, 43 kata.

1. Sekarang tas misteri yang lain. Bayangannya berbentuk segitiga.
2. Petunjuk pertama, bangun ruang ini punya satu ujung runcing.
3. Petunjuk kedua, alasnya berbentuk lingkaran yang rata.
4. Sekarang pilih namanya. Apakah kubus, kerucut, atau bola?
5. Jawabannya kerucut. Tas dibuka, dan di dalamnya ada topi ulang tahun.

### luar-ciri: Ciri Bangun Ruang: sisi, rusuk, titik sudut
Sumber: Metode luar: Ciri Bangun Ruang. 5 ketukan, 58 kata.

1. Cara ketiga bernama Ciri Bangun Ruang. Kita menyebut sisi, rusuk, dan titik sudut.
2. Sisi adalah permukaan yang datar. Kubus punya enam sisi.
3. Rusuk adalah garis tempat dua permukaan bertemu. Kubus punya dua belas rusuk.
4. Titik sudut adalah pojok tempat rusuk bertemu. Kubus punya delapan titik sudut.
5. Dengan menyebut sisi, rusuk, dan titik sudut, kita mengenali ciri bangun ruang.

### luar-ciri-terapan: Ciri Bangun Ruang: ciri balok
Sumber: Metode luar: Ciri Bangun Ruang, terapan. 5 ketukan, 59 kata.

1. Sekarang kita pakai cara ini untuk balok. Kita sebut sisi, rusuk, dan titik sudutnya.
2. Sisi balok ada enam. Semuanya segi empat.
3. Rusuk balok ada dua belas. Kita tandai semuanya dengan garis hijau.
4. Titik sudut balok ada delapan. Kita tandai semuanya dengan titik merah.
5. Jadi balok punya enam sisi, dua belas rusuk, dan delapan titik sudut. Jumlahnya sama dengan kubus.

### luar-ringkas: Ringkasan tiga metode dari luar
Sumber: Ringkasan metode luar. 5 ketukan, 57 kata.

1. Kita sudah melihat tiga metode dari luar untuk belajar bangun ruang.
2. Cetak Permukaan. Bangun ruang ditekan, lalu muncul cap yang berbentuk bangun datar.
3. Tas Misteri. Kita menebak bangun ruang dari bayangan dan petunjuknya.
4. Ciri Bangun Ruang. Kita menyebut sisi, rusuk, dan titik sudutnya.
5. Ketiga cara ini membantu kamu mengenali bangun ruang. Sampai jumpa, dan tetap semangat belajar!

## Peta (Mind-Map susun)

Pusat: Datar atau ruang?

- 1. Tiga hal yang dipelajari
   - 2. Bangun datar dan ruang
   - 3. Permukaan datar dan lengkung
   - 4. Lima bangun ruang
- 5. Cara melakukannya
   - 6. Tanya: bisa diisi?
   - 7. Gelindingkan benda
   - 8. Hitung sisi, rusuk, sudut
- 9. Hasil yang diharapkan
   - 10. Bisa membedakan bentuk
   - 11. Bisa menamai bangun ruang

11 simpul (3 cabang: 3 hal dipelajari, 3 cara, 2 hasil). Tiga hal dipelajari sama persis dengan daftar sapaan materi.

## Tabel (Infografis susun)

Ciri lima bangun ruang: 5 baris x 3 kolom.

| Bangun | Datar | Lengkung | Gelinding |
|---|---|---|---|
| Kubus | 6 | 0 | tidak |
| Balok | 6 | 0 | tidak |
| Tabung | 2 | 1 | ya |
| Kerucut | 1 | 1 | ya |
| Bola | 0 | 1 | ya |

## Tiga metode luar (nama Indonesia)

1. Cetak Permukaan (asal Montessori): bangun ruang di layar ditekan seperti cap, muncul bentuk bangun datarnya (kubus: segi empat sama sisi; balok: segi empat panjang; tabung dan kerucut: lingkaran; bola: tidak ada cap rapi).
2. Tas Misteri (Montessori): tas di layar menampilkan bayangan (siluet) dan petunjuk; lima bangun ruang disaring sampai tersisa satu (kubus pada konsep, kerucut pada terapan). "Meraba" diganti bayangan dan petunjuk di layar.
3. Ciri Bangun Ruang (van Hiele): menyebut sisi, rusuk, titik sudut (kubus pada konsep, balok pada terapan; 6, 12, 8).

## Uji

`node --no-warnings scripts/uji-story-k2b3C.mjs`: lulus semua. Data dihitung ulang dari struktur gambar: pojok bangun datar, tiga muka balok membentuk balok (kubus: lebar, tinggi, dalam sama), tiap rusuk menghubungkan dua titik sudut bertetangga (tersembunyi putus-putus, lengkap 12), titik sudut tepat di sudut (lengkap 8), permukaan datar dan lengkung tiap bangun ruang (kubus 6/0, balok 6/0, tabung 2/1, kerucut 1/1 dengan satu titik puncak, bola 0/1), kelompok datar dan lengkung, bola menggelinding (putaran = jarak / jari-jari, menyentuh lereng), dadu diam, tumpukan kubus, cap dan bayangan, penyaringan Tas Misteri, pilihan jawaban tepat satu, klaim suara tentang sisi, rusuk, titik sudut dibandingkan dengan data dan gambar.

## Temuan data (src/data/kelas2-bab3.json subBabs.C)

- Nama metode ganda Inggris (Face Print, Mystery Bag, 3D Attributes) di data dan mindMaps/stepTitle diganti nama Indonesia; mindMap generik ("Kerjakan: Terapkan cara itu pada angka atau gambar", "Main: Latih di Concrete sampai Abstract", "Pahami soal") tidak dipakai.
- targetDescription terulang dua kali ("Siswa memakai cara Cetak Permukaan, Tas Misteri, Ciri Bangun Ruang." dua kali).
- silabus.teksSuara memuat "Bukunya bernama Bentuk di Sekitar Kita"; narasi "ingat cara Cetak Permukaan" diulang dua kali dalam satu ketukan; "Di sini kita memakai ide Face Print — ..." bercampur nama Inggris. Tidak dipakai.
- Benda fisik dan instruksi nyata: "Ambil kerucut, kubus, botol, kotak, dan bola", "Coba gelindingkan benda", "Tas Misteri ... meraba", "Cari bangun ruang di sekitarmu", "Tulis di tabel", "Amati benda-benda di sekitarmu", "di rumah" (poinPenting.rumah), "selembar kertas" (infografis). Semua diganti aksi digital (ketuk, lihat meluncur di layar, tebak dari bayangan dan petunjuk, pilih jawaban).
- Kesalahan atau kerancuan fakta: data menyebut kubus, kotak, topi, botol "punya beberapa permukaan" tanpa angka; menggolongkan "tabung" dan "kerucut" sebagai berpermukaan lengkung padahal keduanya juga punya alas datar (tabung 2 datar 1 lengkung, kerucut 1 datar 1 lengkung): video menjelaskan keduanya masuk kelompok lengkung karena ada permukaan lengkung. Data tidak memuat sisi, rusuk, titik sudut kubus/balok (6, 12, 8) padahal ringkasan metode Ciri Bangun Ruang memintanya; ditambahkan dan diuji.
- Kata "kotak" dan "kardus" memakai benda sehari-hari; gambar dibuat bentuk di layar (kubus, balok). "Tabel permukaan" game memakai kolom menggelinding: dihitung dari ada tidaknya permukaan lengkung.
- Tokoh: data tidak menyebut nama tokoh; ditambahkan Kira, Malosi, Upe, Wei, Halim, Igil secara ringan. Tidak ada tokoh di luar enam.
