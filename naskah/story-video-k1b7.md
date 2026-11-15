# Story video Kelas 1 Bab 7: Mengukur Panjang Benda

# Naskah singkat: Story Kelas 1 Bab 7 Sub-Bab A (Membandingkan Panjang dan Tinggi)

Berkas: `src/components/modul/story/k1b7A-*.ts` (video, materi-1..4, luar-1, luar-2, gambar, bantu), `src/components/modul/video-k1b7a.tsx` (`VideoK1B7A`), `scripts/uji-story-k1b7A.mjs`, `.tmp-k1b7s/A.json`.
Ekspor: `VIDEO_MATERI_K1B7A` (id `k1b7A-materi`), `VIDEO_LUAR_K1B7A` (id `k1b7A-luar`). Tokoh: Kira, Upe, Wei, Halim, Malosi, Igil. Semua aksi siswa berupa aksi layar (ketuk, pilih kartu, ketuk pohon, ucapkan lagi).

## Video materi: 16 adegan, 83 ketukan, 1310 kata, sekitar 10,9 menit
sapaan (daftar: Panjang dan tinggi dua benda, Paling panjang dan urutan, Garis awal yang sama); pita-kira (pita Kira 9 kotak, pita Upe 6 kotak, lebih panjang tiga kotak); kata-panjang (lebih panjang, lebih pendek, sama panjang, kata tinggi, kata paling); sama-panjang (stik Wei dan Halim 7 kotak, pilih kartu); garis-awal (tali bergeser tampak lebih panjang, geser ke garis awal, sama enam kotak); tinggi-pohon (pohon Malosi 8, pohon Upe 5, lebih tinggi/lebih rendah, tiga kotak lebihnya); sama-tinggi (pohon B dan C 6, pohon A 8); paling-panjang (empat tali 5, 9, 3, 7; paling panjang, paling pendek, aturan lebih dan paling); urutkan (tali dipindah sampai urut 3, 5, 7, 9); paling-tinggi (pohon A 8, B 6, C 6, D 4; dua urutan benar); kupu-kupu (tinggi terbang 3, 5, 8; tinggi, rendah); detektif (petunjuk berantai, pilih jawaban, bukti kotak 4, 6, 8); latihan-satu (stik Halim 8, Wei 5); latihan-dua (pohon 7, 4, 9, ketuk yang paling rendah); latihan-tiga (urutkan tiga stik 3, 6, 9); penutup.

## Video metode luar (subjudul "Tiga metode luar"): 9 adegan, 40 ketukan, 599 kata, sekitar 5,0 menit
Nama (Indonesia saja): Ulangi Satuan Panjang, Banding Panjang, Satuan Tak Baku.
sapaan; luar-pembuka; luar-ulang (pita merah diukur 7 klip, rapat dari garis awal, tanpa celah) + luar-ulang-terapan (pita kuning 6 klip, hijau 9 klip, lebih tiga klip, pilih); luar-banding (pita merah 9 dan biru 6 berdampingan, ujung lebih jauh, bagian lebih disisihkan) + luar-banding-terapan (tiga stik 8, 3, 5, pilih paling panjang); luar-satuan (pita 8 klip = 4 stik, satuan beda hasil beda, satu jenis satuan, angka dan nama satuan) + luar-satuan-terapan (tali 5 dan 7 sedotan); luar-ringkas.

## Peta (Mind-Map susun): pusat "Mana yang lebih panjang?", 3 cabang (3, 3, 2 anak), 11 simpul; teks paling panjang 28 huruf. Cabang pertama sama dengan daftar sapaan persis.
## Tabel (Infografis susun): 4 baris x 3 kolom (Ukuran, Urutan, Kata); baris Tali 4 kotak, Stik 6 kotak, Pita 8 kotak, Sedotan 9 kotak; sel paling panjang 7 huruf (pertama, keempat, panjang).

## Uji (scripts/uji-story-k1b7A.mjs)
Menghitung ulang dari gambar: kotak satuan berjajar rapat, lurus, satu ukuran; batang mendatar mulai dari garis awal yang sama (garis `ga` tepat di awal), tumpukan menegak berdiri di tanah (y 172); benda sepanjang n satuan sejajar kotak terakhir; tulisan "N satuan" sama dengan jumlah kotak; setiap kalimat "X lebih panjang/pendek/tinggi/rendah (N satuan) dari Y", "X sama panjang/tinggi dengan Y", "X paling ..." di suara dicocokkan ke batang bernama (satuan sama, arah cocok, paling = benar-benar maksimum/minimum, selisih benar); urutan, pilihan jawaban, hitungan satu per satu. Tanpa kalimat hitung (tambah, kurang, kali, bagi), tanpa satuan baku.

## Temuan data (kelas1-bab7.json subBabs.A)
- targetDescription memuat kalimat "Memakai Ulangi Satuan Panjang, Banding Panjang, Satuan Tak Baku." dua kali.
- Nama metode ganda Inggris (Iterate Unit, Compare Length, Nonstandard Units) di judul langkah mindMaps; langkah 7 dan 8 hanya "7." dan "8." dengan ikon bumi dan flowTo "7"/"8"/"END"; langkah 4 dan 5 kembar. Tidak dipakai; namaId saja.
- infografisData countNum 1, 2, 3 dan countWord "METODE LUAR · Iterate Unit" janggal; tidak dipakai.
- Benda fisik dan kerja bersama diganti aksi layar: "pensil warna" menjadi stik/tali, "jengkal, pensil, sebelum penggaris" (metode Satuan Tak Baku) menjadi klip, stik, sedotan di layar; "berbaris bersama 6 teman" dan "Ayo Mencoba: amati 3 benda di sekitar kalian" tidak dimuat; "buat kalimat perbandingan dari benda di sekitarmu", "Ceritakan dan Syukuri" (Ibu Guru, Tuhan) tidak dimuat; guratan/tulis lambang di kanvas diganti pilih kartu dan ketuk.
- Tokoh "Ibu Guru" dan urutan anak berbaris (Kira, Wei, Upe, Malosi menurut tinggi badan) diganti stik, tali, pohon dan pohon A, B, C, D; Kira, Upe, Wei, Halim, Malosi dipakai sebagai pemilik benda.
- Konten sub-bab A data tidak mengukur dengan satuan; angka kotak ditambahkan untuk semua batang supaya perbandingan dapat dihitung ulang (sesuai konsep Bab 7).
- Kata istilah isi sub-bab (lebih panjang, satuan, garis awal) dipakai; uji hanya menolak ajakan kerja kelompok atau benda fisik.

# Naskah singkat: Story Kelas 1 Bab 7 Sub-Bab B (Mengukur Panjang dengan Satuan Tidak Baku)

Berkas: `src/components/modul/story/k1b7B-*.ts` (video, materi-1..4, luar-1, luar-2, gambar, bantu), `src/components/modul/video-k1b7b.tsx` (`VideoK1B7B`), `scripts/uji-story-k1b7B.mjs`, `.tmp-k1b7s/B.json`.
Ekspor: `VIDEO_MATERI_K1B7B` (id `k1b7B-materi`), `VIDEO_LUAR_K1B7B` (id `k1b7B-luar`).
Tokoh: Malosi, Kira, Upe, Wei, Halim, Igil. Satuan di layar: klip, stik, kotak satuan, sedotan, jepit. Semua aksi siswa berupa aksi layar (hitung, pilih jawaban, ucapkan lagi).

## Video materi: 22 adegan, 104 ketukan, 1222 kata, sekitar 10,2 menit
sapaan (daftar: Mengukur dengan satuan, Cara mengukur yang benar, Membandingkan hasil ukur); pita-malosi (7 klip); satuan-layar (lima satuan); mulai-ujung (aturan 1, salah lalu benar, 6 klip); satuan-rapat (aturan 2, 5 sedotan); tidak-bertumpuk (aturan 3, 4 stik); tidak-miring (aturan 4, 8 klip); satu-jenis (aturan 5, campur klip dan stik lalu 4 stik); lima-aturan; ukur-meja (langkah demi langkah, 6 sedotan); tulis-hasil (angka dan nama satuan, 5 stik); dua-satuan (satu tali: 10 klip atau 5 stik); layar-berpetak (9 kotak); banding-dua (8 klip dan 5 klip, selisih 3); sama-panjang (7 klip dan 7 klip); banding-tiga (9, 7, 5 klip; paling panjang, paling pendek, urutan); tebak-dulu (tebakan 4 stik, hasil 5 stik, selisih 1); detektif (cara A celah, cara B bertumpuk, cara C benar); latihan-satu (9 klip, pilih jawaban); latihan-dua (6 dan 9 klip, lebih panjang, lebihnya 3 klip); latihan-tiga (12 kotak dan 6 sedotan, hasil lebih sedikit); penutup.

## Video metode luar ("Tiga metode luar"): 9 adegan, 39 ketukan, 496 kata, sekitar 4,1 menit
Nama (Indonesia saja): Ulangi Satuan Panjang, Banding Panjang, Satuan Tak Baku. sapaan; luar-pembuka; luar-ulangi (6 klip); luar-ulangi-terapan (9 kotak, pilih jawaban); luar-banding (tongkat sepanjang 8 klip, tali sepanjang 5 klip, garis awal sama, bagian lebih 3 klip); luar-banding-terapan (tiga pita, paling panjang B, paling pendek A); luar-satuan (meja: 6 sedotan atau 15 jepit); luar-satuan-terapan (10 klip dan 5 stik ternyata sama panjang); luar-ringkas.

## Peta (Mind-Map susun): pusat "Berapa panjang pita Malosi?", 3 cabang (3, 3, 2 anak), 11 simpul
Cabang 1 = daftar sapaan persis; cabang 2 langkah (Taruh satuan dari ujung; Rapat, lurus, satu jenis; Pakai satuan yang sama); cabang 3 hasil (Panjang benda diketahui; Hasil ukur dibandingkan). Teks paling panjang 25 huruf.

## Tabel (Infografis susun): 4 baris x 3 kolom
Pojok "Benda", kolom Tebakan, Hasil, Selisih; baris Tali (4, 5, 1 stik), Pita (9, 7, 2 klip), Meja (8, 6, 2 kotak), Ikan (3, 5, 2 jepit). Sel paling panjang 7 huruf, satu angka per sel.

## Temuan data (kelas1-bab7.json subBabs.B)
- targetDescription memuat kalimat "Memakai Ulangi Satuan Panjang, Banding Panjang, Satuan Tak Baku." dua kali; nama metode ganda Inggris (Iterate Unit, Compare Length, Nonstandard Units) di judul langkah mindMaps, countWord infografis, dan mechanicDescription tidak dipakai; hanya namaId.
- mindMap janggal: langkah 2, 3, 4, 5 berjudul Inggris dan 4 dan 5 kembar (Nonstandard Units); langkah 7 dan 8 hanya berjudul "7." dan "8." (flowFrom/flowTo "6", "7", "8", "END"); langkah 6 menyuruh "ukur kakimu sendiri" dan "jarak aman membaca buku 3 jengkal". Tidak dipakai.
- infografis countNum/countWord tidak seragam ("METODE LUAR · Iterate Unit"); infografis memuat "Jarak Aman" (jengkal, laptop, ponsel); tidak dipakai.
- Benda fisik dan kata terlarang di data diganti aksi layar: jengkal, telapak kaki, depa, pensil, koin, penjepit kertas, kertas berpetak, tinggi badan Malosi, meja di kelas, buku, "Buku Siswa hlm.", "guratkan di kanvas". Diganti klip, stik, kotak satuan, sedotan, jepit di layar, layar berpetak, pita, tali, tongkat, ikan, meja, kereta (gambar di layar).
- Cerita S6 menyebut "dua belas koin" untuk panjang buku; diganti contoh satu tali diukur dengan klip (10) dan stik (5), satuan lebih panjang hasil lebih sedikit.
- Game 10 menyebut papan tulis, pintu, lemari (6, 8, 10 jengkal) dan meminta menggurat angka; tidak dipakai (aksi digital: hitung, pilih, ucapkan lagi).
- Data memakai bilangan sampai 12 dan selisih; semua ukuran dibatasi sampai 20 (maksimum 15 jepit). Tanpa penggaris, sentimeter, meter.
- Istilah isi sub-bab yang diperbolehkan uji: "lebih panjang", "lebih pendek", "sama panjang", "paling panjang", "paling pendek", "satuan", "selisih". Uji melarang kelompok, teman, kelas, buku, kertas, pensil, jengkal, telapak, depa, koin, penggaris, centimeter, meter, "dikurangi", "ditambah".
- Nama berkas pembungkus: video-k1b7b.tsx (huruf kecil, sesuai registri); berkas story memakai k1b7B-*.

