# Story video Kelas 1 Bab 5: Ayo Membilang sampai dengan 20

# Naskah singkat: Story Kelas 1 Bab 5 Sub-Bab A (Menghitung, Membaca, dan Menulis Bilangan sampai 20)

Berkas: `src/components/modul/story/k1b5a-*.ts` (video, materi-1..4, luar-1, luar-2, gambar, bantu), `src/components/modul/video-k1b5a.tsx` (`VideoK1B5A`), `scripts/uji-story-k1b5a.mjs`, `.tmp-k1b5s/A.json` (petaSusun, tabelSusun).
Ekspor: `VIDEO_MATERI_K1B5A` (id `k1b5a-materi`), `VIDEO_LUAR_K1B5A` (id `k1b5a-luar`).
Tokoh: Halim, Malosi (kelereng), Igil si burung hantu, Kira dan Wei (stiker), Tika (stoples). Suara tanpa digit; gambar boleh memuat angka. Semua aksi siswa berupa aksi layar: ketuk, seret, pilih, ucapkan lagi mengikuti suara guru.

## Video materi (Materi kurikulum): 17 adegan, 94 ketukan, 1294 kata, sekitar 10,8 menit
1. sapaan (3 ketukan; daftar: Menghitung benda, Membaca nama bilangan, Menulis lambang bilangan)
2. merapikan-mainan (5): Halim dan Malosi merapikan lima belas kelereng; pesan Ibu; masalah "berapa banyak?"
3. hitung-satu (7): ketuk satu kelereng, sebut satu bilangan; satu sampai sepuluh lalu sebelas, dua belas; bilangan terakhir; kelereng yang sudah dihitung digeser ke bawah
4. sepuluh-dulu (7): seret kelereng ke kotak sepuluh sampai penuh; satu di luar; sepuluh ditambah satu menjadi sebelas
5. lima-belas (7): sebelas sampai lima belas, kata belas, belas = sepuluh dan beberapa lagi
6. baca-nama (7): papan sebelas sampai dua puluh, nama dan lambang, angka kiri (sepuluh) dan kanan (sisa)
7. tulis-angka (6): tulisan angka bertahap: dua belas, lima belas, tujuh belas, dua puluh
8. dua-puluh (6): dua kotak penuh, sepuluh ditambah sepuluh; hitung dari sepuluh sampai dua puluh
9. garis-bilangan (6): katak melompat dari sepuluh ke lima belas lalu dua puluh; bilangan berdekatan
10. pasangan-bilangan (5): kalimat bilangan 10 + 3 = 13, 10 + 7 = 17, 10 + 8 = 18 dengan titik bingkai
11. siapa-banyak (6): Kira tiga belas, Wei lima belas; bandingkan lewat sepuluh dan sisa
12. tebak-buktikan (6): Tika menebak isi stoples, membuktikan dengan menghitung tujuh belas
13. detektif (6): setelah empat belas, sebelum dua puluh, sepuluh ditambah dua
14. latihan-satu (4): isi kotak sepuluh dengan delapan belas kelereng, hitung sisanya
15. latihan-dua (5): ikat sepuluh dari enam belas sedotan, hitung yang tidak diikat
16. latihan-tiga (4): baca "dua belas" lalu pilih lambangnya dari tiga kartu
17. penutup (4)

## Video metode luar (Tiga metode luar): 9 adegan, 39 ketukan, 534 kata, sekitar 4,5 menit
Nama metode (hanya Indonesia): Hitung sampai 20, Sepuluh dan Satuan, Dua Bingkai Sepuluh.
sapaan (3), luar-pembuka (5), luar-hitung (5), luar-hitung-terapan (4: empat belas bola, pilih bilangan), luar-sepuluh (5), luar-sepuluh-terapan (4: enam belas balon), luar-bingkai (5), luar-bingkai-terapan (4: warnai tiga belas petak), luar-ringkas (4).

## Peta (Mind-Map susun): 11 simpul
Pusat: "Ada berapa kelereng Halim?". Cabang 1 "Tiga hal yang dipelajari" (3 anak = daftar sapaan persis), cabang 2 "Cara melakukannya" (Isi kotak sepuluh dulu; Sebut nama bilangannya; Tulis angka kiri dan kanan), cabang 3 "Hasil yang diharapkan" (Banyak benda diketahui; Bilangan dibaca dan ditulis). Teks <= 28 huruf, suara dan petunjuk tanpa digit.

## Tabel (Infografis susun): 4 baris x 3 kolom
Pojok "Bilangan"; kolom Angka, Sisa, Sesudah; baris Sebelas (11, 1, 12), Tiga belas (13, 3, 14), Lima belas (15, 5, 16), Tujuh belas (17, 7, 18). Sel <= 2 huruf (margin teks aman di 405 px), satu angka per sel, kata label <= 8 huruf.

## Temuan data (kelas1-bab5.json subBabs.A)
- Nama metode ganda (Count to 20 / Hitung sampai 20; Ten and Ones; Double Ten Frame): dipakai namaId saja. Beberapa teks infografis memuat "METODE LUAR · Count to 20" dan countNum 1, 2, 3 yang janggal.
- mindMaps: langkah 4 dan 5 sama-sama berjudul "Double Ten Frame" dengan isi sama; langkah 7 dan 8 hanya berjudul "7." dan "8." (tanpa isi bermakna, flowTo "7"/"8"/"END" tidak jelas); judul langkah campur Inggris. Ada kata "kelompok sepuluh" (flowTo): diganti "kotak sepuluh"/"kumpulan".
- targetDescription memuat kalimat "Memakai Hitung sampai 20, Sepuluh dan Satuan, Dua Bingkai Sepuluh" dua kali.
- Kata terlarang di data: "buku" (S5 "menulis hasilnya di buku"; bookReference "Buku Siswa hlm."), "Lingkari setiap sepuluh" (menggambar), "Ikat Sepuluh Pensil", "mengambil benda di sekitar" (Kira dan Wei): diganti aksi layar (ketuk, seret, tombol ikat), sedotan, stiker.
- Cerita data memakai Halim, Malosi, Kira, Wei, Tika, Igil (tanpa Upe).
- Data A menyebut membandingkan (S5) dan garis bilangan: dimuat singkat (lewat sepuluh dan sisa; garis bilangan sepuluh sampai dua puluh); perbandingan penuh milik sub-bab D.
- targetCount slide "Tebak Isi Stoples" 15 sedangkan game 12, 17, 15: video memakai tujuh belas.

# Story Kelas 1 Bab 5 Sub-Bab B (Menghitung Maju dan Mundur)

Berkas: `src/components/modul/story/k1b5b-{video,materi-1..3,luar-1,luar-2,gambar,bantu}.ts`, `src/components/modul/video-k1b5b.tsx` (`VideoK1B5B`), `scripts/uji-story-k1b5b.mjs`, `.tmp-k1b5s/B.json`.
Export: `VIDEO_MATERI_K1B5B` (id `k1b5b-materi`), `VIDEO_LUAR_K1B5B` (id `k1b5b-luar`).

## Video materi: "Menghitung Maju dan Mundur", subjudul "Materi kurikulum"
96 ketukan, 1430 kata, sekitar 11,9 menit diputar.

| Adegan | Ketukan | Kata | Isi |
| --- | --- | --- | --- |
| sapaan | 3 | 34 | Sapaan; daftar: Menghitung maju, Menghitung mundur, Mencari bilangan hilang |
| cerita-kelereng | 5 | 81 | Malosi, Kira, Upe, Wei, Igil di taman; Halim menyusun enam baris kelereng 10 sampai 15; tiap baris lebih banyak satu daripada baris di atasnya; menghitung sampai dua puluh |
| maju-tangga | 6 | 85 | Malosi naik tangga bilangan (10 sampai 15); menghitung maju = kecil ke besar; langkah sama satu demi satu; ucapkan lagi |
| mundur-tangga | 6 | 78 | Kira turun tangga yang sama (15 sampai 10); menghitung mundur = besar ke kecil; ucapkan lagi |
| satu-lebih | 6 | 91 | Tetangga bilangan: satu lebih dan satu kurang (12, 13, 14); barisan kelereng; tebak satu lebih dari lima belas |
| ulat-hilang | 6 | 108 | Wei dan ulat bilangan: deret maju (10, 11, ?, 13), deret mundur (15, 14, ?, 12), seret kartu 18 ke deret 17, ?, 19 |
| sampai-dua-puluh | 6 | 99 | Kodok melompat maju di garis bilangan 10 sampai 20; ke kanan = maju; ucapkan lagi |
| mundur-dua-puluh | 6 | 83 | Kodok mundur dari 20 ke 10; ke kiri = mundur; nama sama, urutan berbalik |
| garis-dua-arah | 6 | 83 | Dari 13 maju tiga langkah ke 16, mundur tiga langkah kembali ke 13; coba sendiri dari 15 maju dua langkah |
| kisi | 5 | 80 | Kisi 1 sampai 20 (lima bilangan tiap baris); baca kiri ke kanan = maju, kanan ke kiri = mundur |
| kisi-hilang | 5 | 78 | Empat kotak kosong (4, 9, 13, 18) dilengkapi dengan maju atau mundur |
| es-krim | 5 | 89 | Upe menukar lima es krim (16 sampai 20) sampai berurutan; dibaca maju atau mundur |
| mesin-deret | 6 | 83 | Tentukan deret maju atau mundur lalu lanjutkan (13, 14, 15, ? dan 18, 17, 16, ?) |
| tetangga | 6 | 73 | Sebelum, sesudah, di antara (14, 15, 16; 12, 13, 14); tebak sebelum delapan belas |
| latihan-satu | 5 | 77 | Ulat 14, 15, ?, 17: seret kartu 16, periksa dengan menghitung mundur |
| latihan-dua | 5 | 69 | Roket: ketuk lampu 15 sampai 11 (hitung mundur), roket meluncur |
| latihan-tiga | 5 | 76 | Garis bilangan 12 sampai 19 dengan dua tanda tanya (14, 17); kodok mundur tiga langkah dari 19 ke 16; pilih jawaban |
| penutup | 4 | 63 | Ingat lagi; langkah sama; giliranmu (ketuk, seret, pilih, ucapkan); sampai jumpa |

## Video metode luar: "Menghitung Maju dan Mundur: Metode dari Luar", subjudul "Tiga metode luar"
39 ketukan, 562 kata, sekitar 4,7 menit diputar. Nama metode memakai bahasa Indonesia saja (nama bergambar angka: "Hitung sampai 20"; suara: "Hitung sampai dua puluh").

| Adegan | Ketukan | Kata | Isi |
| --- | --- | --- | --- |
| sapaan | 3 | 37 | Sapaan metode luar |
| luar-pembuka | 5 | 75 | Tiga metode: Hitung sampai 20, Sepuluh dan Satuan, Dua Bingkai Sepuluh; satu pertanyaan; ketuk, seret, pilih |
| luar-hitung | 4 | 51 | Setelah sepuluh, lanjut menghitung sampai dua puluh |
| luar-hitung-terapan | 5 | 78 | Halim: ketuk nampan, kelereng muncul (10 ke 13); ketuk kelereng ujung, kelereng pergi (15 ke 12) |
| luar-satuan | 4 | 57 | 11 sampai 20 dipecah menjadi sepuluh dan sisa (14 = 10 dan 4); maju: sisa naik; mundur: sisa turun |
| luar-satuan-terapan | 5 | 77 | Wei dan ulat 10, 11, ?, 13: sisa 1, ?, 3; pilih kartu 12 (sepuluh dan dua) |
| luar-bingkai | 4 | 62 | Satu bingkai sepuluh kotak; dua bingkai untuk 11 sampai 20 (10, 15, 20 keping) |
| luar-bingkai-terapan | 5 | 70 | Kira dan roket: ketuk keping terakhir, 15 turun ke 10 (satu bingkai penuh tersisa), roket meluncur |
| luar-ringkas | 4 | 55 | Ringkasan tiga metode; pilih cara yang cocok |

## Peta (Mind-Map susun) dan tabel (Infografis susun)
`.tmp-k1b5s/B.json`. Peta 11 simpul: pusat "Bagaimana menghitung maju dan mundur?"; cabang 1 (3 anak, sama dengan daftar sapaan): Menghitung maju, Menghitung mundur, Mencari bilangan hilang; cabang 2 (3): Naik tangga bilangan, Turun tangga bilangan, Isi kotak yang kosong; cabang 3 (2): Deret bilangan berurutan, Tahu sebelum dan sesudah.
Tabel 4 baris x 3 kolom (Arah, Mulai, Sampai), pojok "Tokoh": Malosi (Maju, 10, 15), Kira (Mundur, 15, 10), Kodok (Maju, 13, 16), Roket (Mundur, 15, 11); sel <= 6 huruf; isi diuji terhadap gambar adegan.

## Temuan data dan keputusan
- Data menyebut nama metode dua bahasa (Count to 20, Ten and Ones, Double Ten Frame); dipakai namaId saja. Deskripsi sub-bab memuat kalimat "Memakai Hitung sampai 20, ..." dua kali.
- Cerita Barisan Kelereng: "setiap baris lebih banyak satu daripada baris di bawahnya" tidak cocok dengan urutan 10 ke 15 dari atas; di video dipakai "baris di atasnya".
- Mind-map data bertele-tele (7 langkah, judul 5 ganda, langkah 6 dan 7 tanpa judul, aliran "5"/"END"); tidak dipakai, peta disusun baru.
- Isi data bergaya kerja nyata (ambil kelereng dari nampan, kanvas, guratkan lambang, warnai) dan menyebut "Buku Siswa hlm."; diganti aksi layar (ketuk nampan, ketuk kelereng ujung, seret kartu, ketuk lampu, pilih jawaban, ucapkan lagi) tanpa kata buku.
- "10 + sisa" pada Sepuluh dan Satuan disajikan sebagai "sepuluh dan sisa" tanpa kata tambah; satu lebih dan satu kurang dipakai sebagai istilah isi.
- Tidak dibuat adegan terpisah untuk "Warnai Langkahnya" dan "Kanvas Guratan dan Suara" (mewarnai dan menulis lambang); langkah maju dan mundur pada garis bilangan ditampilkan lewat panah dan kodok.

# Story Kelas 1 Bab 5 Sub-Bab C: Nilai Tempat Puluhan dan Satuan

Aplikasi belajar mandiri: tidak ada instruksi kelompok, teman, depan kelas, buku, menulis atau menggambar, atau membawa benda nyata. Semua tindakan siswa berupa ketuk dan seret benda di layar, pilih jawaban, hitung satu demi satu, susun kartu kalimat, dan ucapkan lagi mengikuti suara guru. Konsep hanya bilangan sampai dua puluh: sepuluh benda digabung menjadi satu puluhan, sisanya satuan, papan nilai tempat, angka kiri puluhan dan angka kanan satuan, dan kalimat tambah sepuluh + sisa = hasil (hasil paling besar dua puluh). Tanpa kurang, banding, kali, atau bagi.

## Video materi (id k1b5c-materi, subjudul "Materi kurikulum"): 16 adegan, 72 ketukan, 1113 kata, sekitar 9,3 menit
1. sapaan (3 ketukan, 36 kata): daftar Membentuk satu puluhan / Menghitung satuan / Membaca nilai tempat
2. cerita-kelereng (5, 93): Halim dan Igil; lima belas kelereng dihitung satu per satu sampai lima belas; ide menggabung sepuluh
3. kantong-sepuluh (5, 79): sepuluh kelereng masuk kantong satu demi satu (satu puluhan), lima di luar (lima satuan), 10 + 5 = 15
4. ikat-sedotan (5, 81): Kira, tiga belas sedotan; sepuluh diikat pita, tiga lepas dihitung (tiga satuan), 10 + 3 = 13
5. menara-balok (5, 72): Wei, empat belas balok; sepuluh disusun menjadi menara, empat lepas, 10 + 4 = 14
6. papan-nilai (5, 70): papan dua kolom Puluhan dan Satuan; lima belas: angka satu di kiri, angka lima di kanan; kalimat nilai tempat
7. baca-angka (4, 71): membaca dua belas, delapan belas, tujuh belas: angka kiri puluhan, angka kanan satuan
8. angka-sama (5, 59): sebelas: dua angka satu bernilai sepuluh (kiri) dan satu (kanan); 10 + 1 = 11
9. daftar-nilai (4, 86): daftar sepuluh sampai dua puluh, tiap baris "N: a puluhan, b satuan" muncul saat namanya disebut
10. tukar-sepuluh (5, 76): dua belas kubus; ketuk sepuluh kubus ditukar satu batang puluhan; tersisa dua kubus
11. dua-puluh (4, 60): dua puluh kubus = dua puluhan dan nol satuan, 10 + 10 = 20; setelah sembilan belas datang dua puluh
12. susun-kalimat (5, 78): pengganti menulis tabel: seret kartu 1, 3, dan 13 ke kotak kalimat "puluhan, satuan, sama dengan"
13. latihan-satu (4, 63): empat belas balok, pilih tabel yang cocok (satu benar, satu kolom tertukar, satu salah satuan)
14. latihan-dua (5, 76): delapan belas kelereng (satu kantong dan delapan lepas), seret kartu satu dan delapan ke papan, 10 + 8 = 18
15. latihan-tiga (4, 58): Kira mengikat sepuluh lidi, dua lepas; pilih sebelas, dua belas, atau dua puluh; 10 + 2 = 12
16. penutup (4, 55): empat butir ringkasan, salam penutup

## Video metode luar (id k1b5c-luar, subjudul "Tiga metode luar"): 9 adegan, 41 ketukan, 661 kata, sekitar 5,5 menit
sapaan (3), luar-pembuka (5; nama tiga metode, Igil, Upe, Kira, Malosi, Wei), luar-hitung (5; Hitung sampai 20: dua puluh titik dihitung terus melewati sepuluh), luar-hitung-terapan (5; kancing Upe, enam belas, 10 + 6 = 16), luar-satuan (5; Sepuluh dan Satuan: 10 + 1 = 11, 10 + 2 = 12, 10 + 3 = 13, 10 + 5 = 15, 10 + 9 = 19), luar-satuan-terapan (5; Malosi mengetuk sepuluh titik masuk lingkaran, tujuh di luar, 10 + 7 = 17), luar-bingkai (5; Dua Bingkai Sepuluh: bingkai penuh sepuluh titik, bingkai satuan empat titik, empat belas), luar-bingkai-terapan (4; Wei, delapan belas, 10 + 8 = 18), luar-ringkas (4).

## Peta susun (.tmp-k1b5s/C.json): 11 simpul
Pusat "Apa itu puluhan dan satuan?" (27 huruf, ikon 🔟). Cabang 1 Tiga hal yang dipelajari (Membentuk satu puluhan; Menghitung satuan; Membaca nilai tempat, sama persis dengan daftar sapaan), cabang 2 Cara melakukannya (Gabung sepuluh benda; Hitung benda yang sisa; Isi papan nilai tempat), cabang 3 Hasil yang diharapkan (Paham puluhan dan satuan; Bisa membaca dua angka). Teks terpanjang 24 huruf. Suara dan petunjuk tanpa digit.

## Tabel susun: 4 baris x 3 kolom
Pojok Benda; kolom Banyak, Puluhan, Satuan; baris Kelereng 15-1-5, Sedotan 13-1-3, Balok 14-1-4, Kubus 20-2-0. Satu atau dua angka per sel; label terpanjang 8 huruf (Kelereng). Uji menghitung benda di gambar video (kelereng di kantong, sedotan di ikatan, balok di menara, kubus dua baris) dan mencocokkannya dengan tabel.

## Temuan data (kelas1-bab5.json subBabs.C)
- targetDescription memuat kalimat "Memakai Hitung sampai 20, Sepuluh dan Satuan, Dua Bingkai Sepuluh." dua kali.
- Nama metode luar di data: nama Inggris (Count to 20, Ten and Ones, Double Ten Frame) di samping namaId Indonesia; video hanya memakai namaId (Hitung sampai 20, Sepuluh dan Satuan, Dua Bingkai Sepuluh), uji menolak nama Inggris. Nama "Hitung sampai 20" berisi angka sehingga diucapkan "Hitung sampai dua puluh" (tampil sebagai "Hitung sampai 20" di gambar). Istilah isi sub-bab (puluhan, satuan, bingkai sepuluh) dipakai; kata "kelompok" dan turunannya tidak dipakai sama sekali.
- Semua bookReference berbunyi "Buku Siswa hlm. ..." dan voiceNarration memuat "Coba ulangi cara itu sendiri sebelum lanjut"; kata buku, halaman, dan kalimat itu tidak dipakai.
- mindMaps: langkah 4 dan 5 sama-sama "Double Ten Frame" dengan deskripsi sama; langkah 7 dan 8 berjudul kosong ("7.", "8.") dengan flowTo "END" dan flowFrom/flowTo tak bermakna; langkah 2 sampai 4 berjudul Inggris. Tidak dipakai (diganti peta masalah susun).
- Data memakai "pensil" (Sepuluh Pensil Diikat, Toko Pensil) dan "Tika" (tokoh di luar tokoh tetap) serta "menyampaikan hasilnya kepada temannya" dan "menulis hasilnya di tabel": pensil diganti sedotan (adegan Kira) dan lidi (latihan), Tika diganti Kira, tabel diganti susun kartu kalimat di layar, ajakan ke teman dihapus.
- Slide konkret "Sortir ke Papan Nilai Tempat", "Tukar Sepuluh", "Papan Kartu Angka", dan "Toko Pensil" disajikan sebagai ketuk dan seret benda di layar (kantong, ikatan, menara, kubus ke batang, kartu angka ke papan). "Toko Pensil" (pesanan) tidak dipakai; peran bingkai diwakili metode luar Dua Bingkai Sepuluh.
- Slide gambar "Warnai Puluhan dan Satuan" dan "Lingkari Puluhan" menyuruh mewarnai dan melingkari: diganti ketuk sepuluh titik masuk lingkaran (luar-satuan-terapan) dan mengisi titik ke dalam bingkai sepuluh (luar-bingkai).
- Slide abstrak "guratkan lambangnya di kanvas" diganti memilih dan menyeret kartu angka. Kunci "20: kiri = 20, kanan = 0" pada data diganti "dua puluhan dan nol satuan, angka dua di kiri dan angka nol di kanan" (angka dua di kiri bernilai dua puluh sebagai dua puluhan).
- Game "Mesin Digit" dan "Pilih Tabel yang Cocok" dipakai sebagai Latihan 1 dan Latihan 2 (tabel dengan kolom tertukar sebagai pengecoh).
- Infografis "Tiga Benda, Tiga Tabel" (kelereng 15, pensil 13, balok 14) dipakai sebagai tabel susun dengan sedotan menggantikan pensil dan kubus 20 sebagai baris dua puluh.
- Cerita pembuka menyebut "pasangan bilangan dari lima belas" (konsep sub-bab lain): tidak dipakai.

# Naskah singkat Story Kelas 1 Bab 5 Sub-Bab D: Membandingkan dan Mengurutkan Bilangan

Berkas: `src/components/modul/story/k1b5d-*.ts`, `src/components/modul/video-k1b5d.tsx` (`VideoK1B5D`), `scripts/uji-story-k1b5d.mjs`. Ekspor `VIDEO_MATERI_K1B5D` (id `k1b5d-materi`) dan `VIDEO_LUAR_K1B5D` (id `k1b5d-luar`).

## Video materi: "Membandingkan dan Mengurutkan Bilangan" (Materi kurikulum), 17 adegan, 83 ketukan, 1426 kata, sekitar 11,9 menit

| # | Adegan (id) | Ketukan | Kata | Isi |
|---|---|---|---|---|
| 1 | sapaan | 3 | 35 | Sapaan; tiga hal: Membandingkan dua kumpulan, Mencari paling banyak, Mengurutkan bilangan |
| 2 | cerita-kelereng | 6 | 126 | Halim 15 kelereng, Upe 11 kelereng; hitung satu demi satu; lebih banyak, lebih sedikit |
| 3 | jangan-menebak | 5 | 96 | Dua belas kelereng tersebar dan dua belas rapat: hitung dulu, sama banyak |
| 4 | pasangkan | 5 | 96 | Memasangkan satu-satu: 14 titik merah, 11 titik biru, sisa tiga |
| 5 | kata-pembanding | 5 | 79 | Lebih banyak, lebih sedikit, sama banyak (batang banding) |
| 6 | jeruk-tiga | 6 | 122 | Jeruk Kira 10, Tika 14, Wei 12; paling banyak dan paling sedikit |
| 7 | paling-banyak | 4 | 72 | Dua kumpulan: lebih; tiga atau lebih: paling; batang jeruk |
| 8 | urut-kecil | 6 | 97 | Kartu 10, 12, 14 diseret ke tempat pertama, kedua, ketiga (dari terkecil) |
| 9 | urut-besar | 5 | 85 | Kartu 18, 15, 11 (dari terbesar) |
| 10 | dua-stoples | 6 | 93 | Stoples A 13 dan B 16: puluhan sama, lihat satuan (10 + 3, 10 + 6) |
| 11 | puluhan-beda | 5 | 75 | 20 dan 18: puluhan lebih banyak, lebih besar |
| 12 | garis-bilangan | 6 | 112 | Garis 10 sampai 20; katak maju; yang lebih ke kanan lebih besar |
| 13 | tanda-banding | 5 | 84 | Tanda lebih dari, kurang dari, sama dengan (mulut terbuka ke yang besar) |
| 14 | latihan-satu | 4 | 61 | Mobil Wei 9 dan Halim 13: pilih kartu nama (lebih sedikit) |
| 15 | latihan-dua | 4 | 61 | Apel Upe 12, Malosi 18, Kira 10: pilih paling banyak dan paling sedikit |
| 16 | latihan-tiga | 4 | 69 | Seret kartu 16, 12, 19 dari terbesar |
| 17 | penutup | 4 | 63 | Rangkuman dan terima kasih |

## Video luar: "Membandingkan dan Mengurutkan Bilangan: Metode dari Luar" (Tiga metode luar), 9 adegan, 36 ketukan, 635 kata, sekitar 5,3 menit

Nama metode (namaId saja): Hitung sampai 20, Sepuluh dan Satuan, Dua Bingkai Sepuluh.

| # | Adegan (id) | Ketukan | Kata | Isi |
|---|---|---|---|---|
| 1 | sapaan | 3 | 37 | Sapaan metode luar |
| 2 | luar-pembuka | 5 | 103 | Tiga cara dan artinya |
| 3 | luar-hitung | 4 | 69 | Hitung sampai 20: bingkai pertama penuh (10), lanjut 11 sampai 20 (penghitung angka) |
| 4 | luar-hitung-terapan | 4 | 84 | Kelereng Kira 17 dan Wei 14, dihitung, 17 lebih banyak |
| 5 | luar-sepuluh | 4 | 57 | Sepuluh dan Satuan: 14 = 10 + 4 (kotak puluhan dan satuan lepas) |
| 6 | luar-sepuluh-terapan | 4 | 63 | Apel Upe 13 dan Halim 17: puluhan sama, satuan 3 dan 7 |
| 7 | luar-bingkai | 4 | 72 | Dua Bingkai Sepuluh: 13 titik, 10 + 3 = 13 |
| 8 | luar-bingkai-terapan | 4 | 94 | Kelereng Malosi 12 dan Wei 16 pada dua bingkai tiap anak |
| 9 | luar-ringkas | 4 | 56 | Ringkasan tiga metode |

## Peta (Mind-Map susun), `.tmp-k1b5s/D.json`

Pusat "Mana yang lebih banyak?"; 3 cabang, 11 simpul: Tiga hal yang dipelajari (Membandingkan dua kumpulan, Mencari paling banyak, Mengurutkan bilangan; sama dengan `daftar` sapaan), Cara melakukannya (Hitung dan pasangkan, Lihat puluhan dulu, Taruh di garis bilangan), Hasil yang diharapkan (Bisa bandingkan bilangan, Bisa urutkan bilangan).

## Tabel (Infografis susun)

"Mana yang lebih besar?": pojok "Benda", kolom Kiri, Kanan, Besar; 4 baris x 3 kolom: Kelereng 15, 11, 15; Mobil 9, 13, 13; Jeruk 12, 18, 18; Apel 17, 14, 17. Sel paling panjang dua huruf.

## Temuan data dan keputusan

- Nama metode ganda di data ("Count to 20", "Ten and Ones", "Double Ten Frame" dan namaId): hanya namaId dipakai; uji menolak nama Inggris.
- `targetDescription` data berisi kalimat "Memakai Hitung sampai 20, ... Dua Bingkai Sepuluh" dua kali; tidak dipakai.
- `mindMaps` data bertele-tele (langkah 2 dan 3 berjudul Inggris, langkah 4 dan 5 sama, langkah 7 dan 8 kosong); tidak dipakai, peta dibuat ulang menurut brief.
- Ajakan di data yang tidak cocok dengan aplikasi mandiri: "Ayo berbaris seperti angka-angka ini!" (adegan baris bilangan) diganti menyeret kartu bilangan ke tempatnya; "Ayo berkarya" (dua stoples) tidak dipakai sebagai istilah; "Buku Siswa hlm" dan "Ketuk suara guru" tidak dipakai; kegiatan menaruh/menulis diganti ketuk, seret, pilih, dan "ucapkan lagi mengikuti suara guru".
- Kata "kelompok" (istilah di data untuk kumpulan benda) tidak dipakai sama sekali; diganti "kumpulan"; uji menolak kata itu.
- Tanda pembanding (lebih dari, kurang dari, sama dengan) ada di data (infografis dan permainan Tanda Pembanding); dipakai sebagai satu adegan (tanda-banding).
- Hanya penambahan "10 + sisa" (hasil <= 20) yang dipakai untuk puluhan dan satuan; tanpa pengurangan, kali, bagi.

