# Naskah Matematika Kelas 2 SD, Bab 7: Ayo Membilang sampai dengan 100, Sub-Bab A: Menghitung, Membaca, dan Menulis Bilangan sampai 100

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k2b7.ts` dan `src/components/modul/data-k2b7.ts`, oleh `scripts/buat-naskah-md-k2b7.mjs`. Isi mengikuti Buku Siswa Matematika Kelas II (Kemendikbudristek, Kurikulum Merdeka, Bab 7 hlm. 191–224) dan diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.

## 1. Identitas modul

| Butir | Isi |
|---|---|
| Modul | `mtk-2-bab7`, sub-bab A |
| Berkas data | `src/data/kelas2-bab7.json` (dibangkitkan `src/content-master/buat-k2-bab7.mjs`, lalu `npm run sync:keys`) |
| Kode bab di server | `k2-mat-bab7` (belum ada seed server karena soal belum ada) |
| Fase dan kelas | `FASE_A`, kelas 2 SD |
| Elemen | 🌈 Fase A • Elemen Bilangan: Bilangan sampai dengan 100 (Kelas 2 SD/MI) |
| Poin Kualifikasi per bab | Latihan 30 dan Ujian 70 (terbit setelah soalnya ada). Praktikum 50 terbit sekali per blok empat bab. |
| Suara Guru | Murni Web Speech API bawaan perangkat (`id-ID`), **laju 0,70 dan nada 1**. Tanpa berkas audio statis, tanpa ElevenLabs. |
| Panggilan API saat siswa belajar | Nol. Seluruh tahap Materi berjalan di klien. |
| Tab Simulasi, Latihan, Ujian | Belum diisi. Latihan dan Ujian menampilkan kartu "sedang disiapkan". Tab Simulasi tidak tampil. |
| Jumlah sub-bab | Dua (A dan B), sesuai daftar isi buku Bab 7. |
| Jumlah permainan | 30 per sub-bab: 10 Concrete, 10 Picture, 10 Abstract. Penomoran di layar 1 sampai 30. |

## 2. Capaian dan tujuan pembelajaran

**Capaian Pembelajaran (CP).** Siswa menghitung banyak benda sampai 100 dengan mengelompokkan puluhan dan satuan, membaca dan menulis bilangan sampai 100 dengan lambang dan nama bilangan, memperkirakan banyak benda, serta menyampaikan hasilnya dengan percaya diri.

**Rujukan.** Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 7: Ayo Membilang sampai dengan 100, Sub-Bab A hlm. 192–209).

**Sasaran.** Siswa menghitung puluhan sampai seratus (sepuluh satuan sama dengan satu puluhan), menghitung puluhan dan satuan dengan nilai tempat dan pasangan bilangan, membaca dan menulis bilangan sampai 100 dengan lambang dan nama bilangan, serta memperkirakan banyak benda lalu membuktikannya dengan mengelompokkan setiap sepuluh.

**Suara Silabus.** Kita belajar membilang sampai seratus. Di semester satu kita sudah belajar bilangan sampai lima puluh, dan kali ini kita melanjutkan sampai seratus. Kita menghitung kue cubit Pak Ahmad dalam bungkus berisi sepuluh, yaitu puluhan. Kita menghitung puluhan dan satuan pada rambutan Halim dan kelereng ayah Malosi, lalu membaca dan menulis bilangannya. Kita juga belajar memperkirakan banyak benda, menebak dulu, lalu membuktikan dengan mengelompokkan setiap sepuluh. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.

## 3. Peta enam tahap SMICPA dan bobotnya

| Tahap | Isi | Banyak butir |
|---|---|---|
| S. Story | Video animasi HTML/SVG, tiga video. Tiap video diputar satu per satu saat diketuk (tidak ada putar otomatis) | 3 video, 9 adegan, 35 ketukan |
| M. Mind-Map | Peta pikiran berurutan, tiap cabang bisa diketuk dan uraiannya tampil di layar | 8 langkah |
| I. Infografis | Poster rangkuman, suara di tiap panel | 10 panel |
| C. Concrete | Benda nyata: isi bungkus, hitung bungkus, rakit bilangan, ikat sepuluh, tebak banyak | 10 permainan |
| P. Picture | Diagram polos: batang puluhan, model nilai tempat, bagan pasangan, garis puluhan, tabel seratus, titik | 10 permainan |
| A. Abstract | Kata dan angka: kalimat, benar-salah, tabel, detektif, peta konsep, urutkan | 10 permainan |

Bobot mengikuti isi buku. Aturan Concrete dan Picture berlaku: benda berwarna hanya di Concrete, Picture hanya diagram tanpa gambar benda (batang, kotak, papan nilai tempat, titik, goresan, garis bilangan).

## 4. Tahap 1: Story (video animasi, menggantikan slide)

Tidak ada video yang berjalan sendiri. Siswa mengetuk **▶ Putar** pada satu video. Video itu berjalan, dan video lain berhenti. Setiap kalimat adalah satu ketukan: dibacakan Suara Guru perangkat, dan gambar berubah mengikuti kalimat yang sedang dibacakan. Ada tombol Jeda, Ulang, dan Suara hidup atau mati.

### Video 1: Kue Cubit Pak Ahmad (Menghitung puluhan sampai seratus)

**Adegan 1. Penjual kue cubit** (`K2B7A-V1-1`)

1. Pak Ahmad adalah seorang penjual kue cubit.  
   _Papan layar:_ Penjual kue cubit
2. Kue cubit adalah kue tradisional dari Betawi. Kue ini ditaburi cokelat sehingga rasanya manis.  
   _Papan layar:_ Kue tradisional Betawi
3. Kue cubit Pak Ahmad sudah dikemas dalam pembungkus yang ramah lingkungan. Setiap bungkus berisi sepuluh kue cubit.  
   _Papan layar:_ 1 bungkus: 10 kue
4. Pak Ahmad mempunyai sepuluh bungkus kue cubit. Berapa banyak kue cubit milik Pak Ahmad?  
   _Papan layar:_ Berapa semuanya?

**Adegan 2. Satu bungkus, satu puluhan** (`K2B7A-V1-2`)

1. Sepuluh kue cubit dimasukkan dalam satu pembungkus.  
   _Papan layar:_ 10 kue: 1 bungkus
2. Sepuluh satuan sama dengan satu puluhan. Satu bungkus adalah satu puluhan.  
   _Papan layar:_ 10 satuan = 1 puluhan
3. Lima bungkus berarti lima puluhan, yaitu lima puluh.  
   _Papan layar:_ 5 puluhan = 50
4. Enam bungkus berarti enam puluhan, yaitu enam puluh.  
   _Papan layar:_ 6 puluhan = 60

**Adegan 3. Sampai seratus** (`K2B7A-V1-3`)

1. Tujuh bungkus berarti tujuh puluhan, yaitu tujuh puluh.  
   _Papan layar:_ 7 puluhan = 70
2. Delapan bungkus berarti delapan puluhan, yaitu delapan puluh.  
   _Papan layar:_ 8 puluhan = 80
3. Sembilan bungkus berarti sembilan puluhan, yaitu sembilan puluh.  
   _Papan layar:_ 9 puluhan = 90
4. Sepuluh bungkus berarti sepuluh puluhan, yaitu seratus. Jadi Pak Ahmad mempunyai seratus kue cubit.  
   _Papan layar:_ 10 puluhan = 100

### Video 2: Rambutan dan Kelereng (Puluhan dan satuan)

**Adegan 1. Rambutan Halim** (`K2B7A-V2-1`)

1. Pohon rambutan di rumah Halim sedang berbuah. Hari ini Halim memanen buah rambutannya.  
   _Papan layar:_ Panen rambutan
2. Halim memasukkan rambutan ke dalam keranjang. Setiap keranjang berisi sepuluh rambutan, jadi satu keranjang adalah satu puluhan.  
   _Papan layar:_ 1 keranjang: 10 buah
3. Halim mempunyai lima keranjang penuh dan tiga rambutan lepas. Itu lima puluhan dan tiga satuan.  
   _Papan layar:_ 5 puluhan, 3 satuan
4. Lima puluhan dan tiga satuan sama dengan lima puluh tambah tiga, yaitu lima puluh tiga. Jadi Halim memiliki lima puluh tiga buah rambutan.  
   _Papan layar:_ 50 + 3 = 53

**Adegan 2. Kelereng ayah Malosi** (`K2B7A-V2-2`)

1. Malosi membantu ayahnya berjualan mainan. Ia memasukkan kelereng ke dalam kantong plastik.  
   _Papan layar:_ Membantu ayah
2. Setiap kantong berisi sepuluh kelereng. Satu kantong adalah satu puluhan.  
   _Papan layar:_ 1 kantong: 10 kelereng
3. Ayah Malosi mempunyai enam kantong penuh dan tujuh kelereng lepas, jadi enam puluhan dan tujuh satuan.  
   _Papan layar:_ 6 puluhan, 7 satuan
4. Enam puluh tambah tujuh sama dengan enam puluh tujuh. Jadi ayah Malosi memiliki enam puluh tujuh kelereng.  
   _Papan layar:_ 60 + 7 = 67

**Adegan 3. Dua cara menulis** (`K2B7A-V2-3`)

1. Ada dua cara menentukan banyak benda. Cara pertama memakai nilai tempat: puluhan di kiri dan satuan di kanan.  
   _Papan layar:_ Dua cara
2. Lima puluhan dan tiga satuan ditulis dengan angka lima di tempat puluhan dan angka tiga di tempat satuan.  
   _Papan layar:_ Nilai tempat: 5 | 3
3. Cara kedua memakai pasangan bilangan: lima puluh tiga terdiri dari lima puluh dan tiga.  
   _Papan layar:_ Pasangan: 50 dan 3
4. Kita membaca dari puluhan dulu: lima puluh tiga. Angka di tempat puluhan bernilai sepuluh kali lipat angka satuan.  
   _Papan layar:_ Baca puluhan dulu

### Video 3: Tebak Banyak Ikan (Memperkirakan lalu menghitung)

**Adegan 1. Menebak banyak ikan** (`K2B7A-V3-1`)

1. Kira dan Malosi melihat banyak ikan hias di kolam. Mereka diminta menebak banyaknya.  
   _Papan layar:_ Ikan hias di kolam
2. Kira menebak ada lima puluh ikan. Malosi menebak ada enam puluh ikan.  
   _Papan layar:_ Tebakan: 50 dan 60
3. Menebak boleh keliru. Menebak melatih kita memperkirakan banyak benda sebelum menghitung.  
   _Papan layar:_ Menebak boleh keliru

**Adegan 2. Kelompok sepuluh** (`K2B7A-V3-2`)

1. Ayo kita buktikan dengan menghitung. Kita mengelompokkan setiap sepuluh ikan.  
   _Papan layar:_ Kelompokkan sepuluh
2. Satu kelompok berisi sepuluh ikan, jadi satu kelompok adalah satu puluhan.  
   _Papan layar:_ 1 kelompok: 10 ikan
3. Ada enam kelompok dan dua ikan sisa. Itu enam puluhan dan dua satuan.  
   _Papan layar:_ 6 puluhan, 2 satuan
4. Enam puluh tambah dua sama dengan enam puluh dua. Jadi banyak ikan adalah enam puluh dua.  
   _Papan layar:_ 60 + 2 = 62

**Adegan 3. Tebakan siapa yang dekat?** (`K2B7A-V3-3`)

1. Tebakan Kira lima puluh. Tebakan Malosi enam puluh. Banyak ikan sebenarnya enam puluh dua.  
   _Papan layar:_ Sebenarnya 62 ikan
2. Lima puluh berbeda dua belas dari enam puluh dua. Enam puluh berbeda dua dari enam puluh dua.  
   _Papan layar:_ Selisih 12 dan 2
3. Tebakan Malosi lebih dekat dengan banyak ikan yang sebenarnya.  
   _Papan layar:_ Malosi lebih dekat
4. Menebak dengan membayangkan kelompok sepuluh membuat tebakan kita makin dekat.  
   _Papan layar:_ Bayangkan kelompok 10

## 5. Tahap 2: Mind-Map (peta pikiran)

**1. Dari Lima Puluh ke Seratus** 💯  
Di semester satu kita sudah belajar bilangan sampai lima puluh. Kali ini kita melanjutkan belajar bilangan sampai seratus. Caranya sama, yaitu mengelompokkan benda sepuluh-sepuluh, tetapi sekarang kita bisa menghitung lebih banyak benda. Pak Ahmad mempunyai sepuluh bungkus kue cubit, dan kita akan mencari tahu berapa banyak seluruhnya.

_Alur:_ Dari lima puluh ke seratus → Sepuluh satuan, satu puluhan

**2. Sepuluh Satuan, Satu Puluhan** 📦  
Sepuluh satuan dikelompokkan menjadi satu puluhan. Sepuluh kue cubit dimasukkan ke dalam satu bungkus, jadi satu bungkus adalah satu puluhan. Satu kantong berisi sepuluh kelereng adalah satu puluhan, dan satu keranjang berisi sepuluh rambutan adalah satu puluhan. Apa pun wadahnya, bila isinya sepuluh, banyaknya adalah satu puluhan.

_Alur:_ Sepuluh satuan, satu puluhan → Menghitung puluhan

**3. Menghitung Puluhan** 🔟  
Kita menghitung puluhan dengan melompat sepuluh-sepuluh. Satu puluhan adalah sepuluh, dua puluhan adalah dua puluh, tiga puluhan adalah tiga puluh, dan seterusnya sampai sepuluh puluhan, yaitu seratus. Lima puluhan sama dengan lima puluh, enam puluhan sama dengan enam puluh, tujuh puluhan sama dengan tujuh puluh, delapan puluhan sama dengan delapan puluh, dan sembilan puluhan sama dengan sembilan puluh.

_Alur:_ Menghitung puluhan → Puluhan dan satuan

**4. Puluhan dan Satuan** 🧺  
Banyak benda sering terdiri dari puluhan dan satuan. Halim mempunyai lima keranjang penuh dan tiga rambutan lepas. Itu lima puluhan dan tiga satuan. Pada nilai tempat, angka di sebelah kiri adalah puluhan dan angka di sebelah kanan adalah satuan. Jadi lima puluhan dan tiga satuan ditulis dengan angka lima di puluhan dan angka tiga di satuan, yaitu lima puluh tiga.

_Alur:_ Puluhan dan satuan → Pasangan bilangan

**5. Pasangan Bilangan** 🧩  
Cara kedua menentukan banyak benda memakai pasangan bilangan. Bilangan lima puluh tiga dipecah menjadi lima puluh dan tiga. Bilangan enam puluh tujuh dipecah menjadi enam puluh dan tujuh. Bila kita menggabungkan kembali kedua bagian, kita memperoleh bilangan semula. Bagan pasangan bilangan membantu kita melihat bahwa bilangan besar tersusun dari puluhan dan satuan.

_Alur:_ Pasangan bilangan → Membaca dan menulis

**6. Membaca dan Menulis Bilangan** 🔤  
Untuk membaca bilangan kita mulai dari puluhannya. Angka enam di tempat puluhan dan angka dua di tempat satuan dibaca enam puluh dua. Delapan puluh tiga dan sembilan puluh dua dibaca dengan cara yang sama. Sepuluh puluhan dibaca seratus. Hati-hati dengan angka yang tertukar: enam puluh dua ditulis enam dua, bukan dua enam. Angka yang berbeda tempat bernilai berbeda.

_Alur:_ Membaca dan menulis → Memperkirakan banyak benda

**7. Memperkirakan Banyak Benda** 🔭  
Sebelum menghitung kita boleh menebak banyaknya. Menebak dengan perkiraan yang baik melatih kita berpikir. Caranya, bayangkan satu kelompok berisi sepuluh benda, lalu perkirakan ada berapa kelompok seperti itu. Setelah menebak, kita buktikan dengan mengelompokkan setiap sepuluh dan menghitung puluhan dan satuannya. Tebakan yang paling dekat dengan hasil hitungan adalah tebakan yang paling baik.

_Alur:_ Memperkirakan banyak benda → Tabel seratus

**8. Tabel Seratus** 🔢  
Bilangan sampai seratus dapat disusun dalam tabel sepuluh kolom. Bilangan di kolom yang sama selalu berselisih sepuluh. Turun satu baris berarti tambah sepuluh, dan naik satu baris berarti kurang sepuluh. Bilangan di sebelah kanan selalu satu lebihnya, dan bilangan di sebelah kiri selalu satu kurangnya. Bila ada kotak yang kosong, kita bisa menemukannya dari tetangganya.

_Alur:_ Tabel seratus → Siap menghitung sampai seratus

## 6. Tahap 3: Infografis

**Panel 1. Sepuluh Satuan, Satu Puluhan** 📦 (2, Dua)

> Sepuluh satuan sama dengan satu puluhan. Sepuluh kue cubit dalam satu bungkus adalah satu puluhan.

**Panel 2. Menghitung Puluhan** 🔟 (10, Sepuluh)

> Menghitung puluhan melompat sepuluh-sepuluh: sepuluh, dua puluh, tiga puluh, empat puluh, lima puluh, enam puluh, tujuh puluh, delapan puluh, sembilan puluh, dan seratus.

**Panel 3. Seratus** 💯 (2, Dua)

> Sepuluh puluhan sama dengan seratus. Bilangan seratus dibaca seratus.

**Panel 4. Puluhan dan Satuan** 🧺 (2, Dua)

> Lima keranjang penuh dan tiga rambutan lepas adalah lima puluhan dan tiga satuan, yaitu lima puluh tiga.

**Panel 5. Dua Cara Menentukan Banyak** 🧩 (2, Dua)

> Dua cara menentukan banyak benda: nilai tempat dan pasangan bilangan. Lima puluh tiga sama dengan lima puluh tambah tiga.

**Panel 6. Nama Bilangan** 🔤 (8, Delapan)

> Nama puluhan: dua puluh, tiga puluh, empat puluh, lima puluh, enam puluh, tujuh puluh, delapan puluh, dan sembilan puluh. Sesudah puluhan kita sebut satuannya, misalnya enam puluh dua.

**Panel 7. Cara Memperkirakan** 🔭 (3, Tiga)

> Tiga langkah memperkirakan. Satu, bayangkan sepuluh benda dalam satu kelompok. Dua, tebak berapa kelompok. Tiga, buktikan dengan menghitung.

**Panel 8. Kelompokkan Setiap Sepuluh** 🐠 (3, Tiga)

> Enam puluh dua ikan dikelompokkan sepuluh-sepuluh menjadi enam kelompok dan dua ikan sisa, yaitu enam puluhan dan dua satuan.

**Panel 9. Tabel Seratus** 🔢 (2, Dua)

> Pada tabel seratus, turun satu baris berarti tambah sepuluh, dan geser satu kotak ke kanan berarti tambah satu.

**Panel 10. Tebakan yang Dekat** 🎯 (2, Dua)

> Banyak ikan enam puluh dua. Tebakan enam puluh berbeda dua, tebakan lima puluh berbeda dua belas. Tebakan yang selisihnya lebih kecil lebih dekat.

## 7. Tahap 4, 5, dan 6: tiga puluh permainan

| No | Tahap | Permainan | Jenis | Ronde |
|---|---|---|---|---|
| 1 | Concrete | Isi Bungkus Sepuluh | `fill-pack-of-ten` | ronde 1: kue cubit dalam bungkus; ronde 2: kelereng dalam kantong; ronde 3: rambutan dalam keranjang |
| 2 | Concrete | Hitung Bungkus | `count-packs-tens` | ronde 1: 5 bungkus kue cubit = 50, 6 bungkus kue cubit = 60; ronde 2: 7 bungkus kue cubit = 70, 8 kantong kelereng = 80; ronde 3: 9 bungkus kue cubit = 90, 10 bungkus kue cubit = 100 |
| 3 | Concrete | Jodohkan Bungkus dan Bilangan | `match-packs-numerals` | ronde 1: 2 wadah = 20, 5 wadah = 50, 8 wadah = 80; ronde 2: 3 wadah = 30, 6 wadah = 60, 9 wadah = 90; ronde 3: 4 wadah = 40, 7 wadah = 70, 10 wadah = 100 |
| 4 | Concrete | Rakit Bilangan | `build-number-tens-ones` | ronde 1: 53 rambutan (5 puluhan dan 3 satuan); ronde 2: 67 kelereng (6 puluhan dan 7 satuan); ronde 3: 74 kue cubit (7 puluhan dan 4 satuan); ronde 4: 82 jeruk (8 puluhan dan 2 satuan) |
| 5 | Concrete | Ikat Sepuluh | `tie-bundles-of-ten` | ronde 1: 23 lidi (2 puluhan dan 3 satuan); ronde 2: 37 kelereng (3 puluhan dan 7 satuan); ronde 3: 46 pensil warna (4 puluhan dan 6 satuan) |
| 6 | Concrete | Tebak dan Hitung | `guess-then-count` | ronde 1: 62 ikan hias, pilihan tebakan 40, 60, 80; ronde 2: 38 jeruk, pilihan tebakan 20, 40, 60; ronde 3: 85 anggur, pilihan tebakan 50, 70, 90 |
| 7 | Concrete | Memori Banyak Benda | `memory-collection-numeral` | ronde 1: pasangan 23, 35, 47, 62; ronde 2: pasangan 31, 44, 56, 68; ronde 3: pasangan 42, 53, 61, 65 |
| 8 | Concrete | Urutkan Banyak Benda | `order-collections` | ronde 1: 36, 52, 78, 91 (dari paling kecil; tampil 36, 52, 78, 91); ronde 2: 84, 67, 45, 29 (dari paling besar; tampil 84, 29, 67, 45); ronde 3: 38, 61, 73, 95 (dari paling kecil; tampil 73, 38, 95, 61) |
| 9 | Concrete | Pilah: Kurang atau Lebih dari 50 | `sort-collections-fifty` | ronde 1: kurang dari 50: 23, 48, 34; lebih dari 50: 62, 75, 89; ronde 2: kurang dari 50: 19, 42, 38; lebih dari 50: 56, 91, 67; ronde 3: kurang dari 50: 27, 45, 36; lebih dari 50: 83, 71, 58 |
| 10 | Concrete | Kantong Misterius | `find-bag-by-number` | ronde 1: cari 67 di antara 67, 76, 57, 66; cari 53 di antara 35, 53, 63, 52; ronde 2: cari 48 di antara 84, 48, 58, 47; cari 82 di antara 28, 81, 92, 82; ronde 3: cari 71 di antara 17, 70, 81, 71; cari 94 di antara 49, 95, 84, 94 |
| 11 | Picture | Hitung Batang Puluhan | `count-ten-bars` | ronde 1: 5, 8 batang; ronde 2: 3, 10 batang; ronde 3: 6, 7 batang |
| 12 | Picture | Cari Model Bilangan | `find-model-by-number` | ronde 1: cari 73 di antara 73, 37, 63, 72; cari 45 di antara 54, 44, 45, 35; ronde 2: cari 28 di antara 28, 82, 38, 27; cari 91 di antara 19, 91, 81, 90; ronde 3: cari 56 di antara 65, 55, 46, 56; cari 39 di antara 93, 38, 29, 39 |
| 13 | Picture | Isi Papan Nilai Tempat | `fill-place-value-board` | soal papan: 34, 57, 72, 90 |
| 14 | Picture | Jodohkan Model dan Bilangan | `match-model-numeral` | ronde 1: 24, 51, 87; ronde 2: 36, 63, 98; ronde 3: 45, 72, 19 |
| 15 | Picture | Pasangan Bilangan | `number-bond-fill` | ronde 1: 67 = 60 + ?, 53 = ? + 3; ronde 2: 84 = 80 + ?, 29 = ? + 9; ronde 3: 95 = ? + 5, 48 = 40 + ? |
| 16 | Picture | Garis Puluhan | `tens-number-line` | ronde 1: 30 lompat 4 puluhan = 70, 20 lompat 3 puluhan = 50, 50 lompat 5 puluhan = 100; ronde 2: 10 lompat 6 puluhan = 70, 40 lompat 2 puluhan = 60, 60 lompat 3 puluhan = 90; ronde 3: 0 lompat 8 puluhan = 80, 70 lompat 2 puluhan = 90, 30 lompat 7 puluhan = 100 |
| 17 | Picture | Lengkapi Tabel Seratus | `complete-hundred-chart` | ronde 1: kotak kosong 58, 65, 72, 79; ronde 2: kotak kosong 53, 69, 76, 84, 91; ronde 3: kotak kosong 60, 70, 80, 90, 100 |
| 18 | Picture | Urutkan Model | `order-models` | ronde 1: 57, 76, 83 (dari paling kecil; tampil 57, 76, 83); ronde 2: 94, 65, 48, 31 (dari paling besar; tampil 48, 94, 65, 31); ronde 3: 29, 56, 92 (dari paling kecil; tampil 29, 92, 56) |
| 19 | Picture | Pilah Model menurut Puluhan | `sort-models-by-tens` | ronde 1: kotak puluhan 3, 5, 7; model 32, 38, 54, 57, 71, 76; ronde 2: kotak puluhan 2, 4, 6; model 21, 29, 43, 48, 65, 67; ronde 3: kotak puluhan 4, 6, 8; model 41, 49, 62, 68, 84, 87 |
| 20 | Picture | Tebak Banyak Titik | `guess-dots-then-count` | ronde 1: 47 titik, pilihan tebakan 30, 50, 70; ronde 2: 33 titik, pilihan tebakan 10, 30, 50; ronde 3: 76 titik, pilihan tebakan 60, 80, 100 |
| 21 | Abstract | Jodohkan Puluhan, Satuan, dan Bilangan | `match-words-numerals` | ronde 1: 9 puluhan dan 2 satuan = 92, 7 puluhan dan 3 satuan = 73, 10 puluhan dan 0 satuan = 100; ronde 2: 6 puluhan dan 6 satuan = 66, 8 puluhan dan 7 satuan = 87, 5 puluhan dan 4 satuan = 54; ronde 3: 4 puluhan dan 1 satuan = 41, 7 puluhan dan 8 satuan = 78, 9 puluhan dan 9 satuan = 99 |
| 22 | Abstract | Lengkapi Kalimat Puluhan dan Satuan | `complete-place-value-sentences` | ronde 1: 6 puluhan dan 7 satuan = 67; 5 puluhan dan 3 satuan = 53; 9 puluhan dan 2 satuan = 92; ronde 2: 4 puluhan dan 6 satuan = 46; 7 puluhan dan 1 satuan = 71; 8 puluhan dan 5 satuan = 85 |
| 23 | Abstract | Susun Nama dan Kalimat Bilangan | `build-number-name-sentence` | ronde 1: Enam puluh dua ditulis 62; ronde 2: Sepuluh puluhan dibaca seratus; ronde 3: Lima puluhan dan tiga satuan sama dengan 53; ronde 4: Satu bungkus berisi sepuluh kue cubit |
| 24 | Abstract | Isi Tabel Puluhan dan Satuan | `fill-place-value-table` | ronde 1: Puluhan dan satuan: 53=5 puluhan dan 3 satuan, 67=6 puluhan dan 7 satuan, 82=8 puluhan dan 2 satuan, 29=2 puluhan dan 9 satuan; ronde 2: Puluhan dan satuan, ronde dua: 41=4 puluhan dan 1 satuan, 76=7 puluhan dan 6 satuan, 95=9 puluhan dan 5 satuan, 100=10 puluhan dan 0 satuan |
| 25 | Abstract | Benar atau Salah: Bilangan | `true-false-numbers` | ronde 1: 5 pernyataan, 3 benar; ronde 2: 5 pernyataan, 4 benar |
| 26 | Abstract | Tulis Lambang dari Nama | `choose-numeral-from-name` | ronde 1: enam puluh dua = 62, tujuh puluh delapan = 78; ronde 2: lima puluh tiga = 53, sembilan puluh satu = 91; ronde 3: delapan puluh tujuh = 87, empat puluh lima = 45 |
| 27 | Abstract | Detektif Bilangan | `riddle-number-clues` | soal 1: Puluhanku 7. Satuanku 3. jawaban 73; soal 2: Aku lebih besar dari 80. Aku lebih kecil dari 90. Satuanku 4. jawaban 84; soal 3: Puluhanku 5. Jumlah puluhan dan satuanku 9. jawaban 54; soal 4: Aku lebih besar dari 60. Aku lebih kecil dari 70. Satuanku 5. jawaban 65 |
| 28 | Abstract | Peta Konsep Bilangan | `concept-map-fill` | Puluhan dan satuan; Membaca dan menulis bilangan |
| 29 | Abstract | Urutkan Bilangan | `order-numerals` | ronde 1: 17, 26, 62, 71 (dari paling kecil; tampil 62, 26, 71, 17); ronde 2: 94, 85, 58, 49 (dari paling besar; tampil 58, 85, 49, 94); ronde 3: 39, 48, 74, 83, 90 (dari paling kecil; tampil 90, 39, 83, 48, 74) |
| 30 | Abstract | Ketuk Semua yang Cocok | `select-all-number-trait` | ronde 1: 3 dari 6 cocok (mempunyai 6 puluhan.); ronde 2: 3 dari 6 cocok (satuannya 5.); ronde 3: 3 dari 6 cocok (lebih besar dari 70.) |

### Permainan 1. Isi Bungkus Sepuluh (Concrete)

- **Rujukan buku.** hlm. 194–195 (10 kue cubit dimasukkan dalam 1 pembungkus; 10 satuan = 1 puluhan)
- **Tujuan.** Mengisi satu wadah dengan sepuluh benda dan memahami bahwa sepuluh satuan sama dengan satu puluhan.
- **Cara main.** Tiga ronde: kue cubit dalam bungkus, kelereng dalam kantong, rambutan dalam keranjang. Siswa menekan tombol tambah satu per satu sampai wadah berisi sepuluh. Wadah yang penuh berubah hijau dan Suara Guru menyebut satu puluhan.
- **Ronde.** ronde 1: kue cubit dalam bungkus; ronde 2: kelereng dalam kantong; ronde 3: rambutan dalam keranjang
- **Panduan suara.** Masukkan benda satu per satu sampai sepuluh.

### Permainan 2. Hitung Bungkus (Concrete)

- **Rujukan buku.** hlm. 195–197 (lima bungkus: 5 puluhan = 50, sampai 10 puluhan = 100)
- **Tujuan.** Menghitung banyak benda dari banyak wadah penuh berisi sepuluh.
- **Cara main.** Tiga ronde, tiap ronde dua gambar wadah penuh (5 sampai 10 wadah). Siswa memilih banyak benda seluruhnya dari tiga pilihan kelipatan sepuluh. Kunci dihitung dari banyak wadah kali sepuluh.
- **Ronde.** ronde 1: 5 bungkus kue cubit = 50, 6 bungkus kue cubit = 60; ronde 2: 7 bungkus kue cubit = 70, 8 kantong kelereng = 80; ronde 3: 9 bungkus kue cubit = 90, 10 bungkus kue cubit = 100
- **Panduan suara.** Hitung bungkusnya, lalu pilih banyak kuenya.

### Permainan 3. Jodohkan Bungkus dan Bilangan (Concrete)

- **Rujukan buku.** hlm. 195–197 dan 206 (hubungkan dengan bilangan yang tepat)
- **Tujuan.** Menjodohkan banyak wadah penuh dengan lambang bilangannya.
- **Cara main.** Tiga ronde, tiap ronde tiga gambar wadah (dua sampai sepuluh wadah) dan tiga lambang bilangan seperti 50 dan 70. Siswa mengetuk gambar lalu lambang yang cocok. Pasangan benar terkunci.
- **Ronde.** ronde 1: 2 wadah = 20, 5 wadah = 50, 8 wadah = 80; ronde 2: 3 wadah = 30, 6 wadah = 60, 9 wadah = 90; ronde 3: 4 wadah = 40, 7 wadah = 70, 10 wadah = 100
- **Panduan suara.** Ketuk gambar, lalu ketuk bilangannya.

### Permainan 4. Rakit Bilangan (Concrete)

- **Rujukan buku.** hlm. 198–199 (rambutan Halim dan kelereng ayah Malosi: puluhan dan satuan)
- **Tujuan.** Merakit sebuah bilangan dari wadah penuh dan benda lepas.
- **Cara main.** Empat ronde: 53 rambutan, 67 kelereng, 74 kue cubit, 82 jeruk. Siswa menekan tambah wadah penuh (sepuluh) dan tambah benda lepas sampai banyaknya sama dengan bilangan. Sepuluh benda lepas otomatis masuk satu wadah.
- **Ronde.** ronde 1: 53 rambutan (5 puluhan dan 3 satuan); ronde 2: 67 kelereng (6 puluhan dan 7 satuan); ronde 3: 74 kue cubit (7 puluhan dan 4 satuan); ronde 4: 82 jeruk (8 puluhan dan 2 satuan)
- **Panduan suara.** Tambah wadah penuh dan benda lepas sampai pas.

### Permainan 5. Ikat Sepuluh (Concrete)

- **Rujukan buku.** hlm. 200–202 dan 214 (Ayo Mencoba: ikat setiap 10 lidi)
- **Tujuan.** Mengikat benda lepas sepuluh-sepuluh lalu menghitung seluruhnya.
- **Cara main.** Tiga ronde: 23 lidi, 37 kelereng, 46 pensil warna. Siswa menekan Ikat sepuluh sampai tidak bisa lagi, lalu memilih banyak benda seluruhnya dari tiga pilihan.
- **Ronde.** ronde 1: 23 lidi (2 puluhan dan 3 satuan); ronde 2: 37 kelereng (3 puluhan dan 7 satuan); ronde 3: 46 pensil warna (4 puluhan dan 6 satuan)
- **Panduan suara.** Ikat setiap sepuluh, lalu hitung semuanya.

### Permainan 6. Tebak dan Hitung (Concrete)

- **Rujukan buku.** hlm. 200–201 dan 207 (tebak banyak ikan lalu hitung)
- **Tujuan.** Memperkirakan banyak benda lalu membuktikannya dengan mengelompokkan sepuluh-sepuluh.
- **Cara main.** Tiga ronde: 62 ikan, 38 jeruk, 85 anggur. Siswa menebak dulu dengan memilih satu dari tiga tebakan (tidak ada yang salah). Benda lalu dikelompokkan sepuluh-sepuluh, dan siswa memilih banyak sebenarnya. Suara Guru menyebut selisih tebakan.
- **Ronde.** ronde 1: 62 ikan hias, pilihan tebakan 40, 60, 80; ronde 2: 38 jeruk, pilihan tebakan 20, 40, 60; ronde 3: 85 anggur, pilihan tebakan 50, 70, 90
- **Panduan suara.** Tebak dulu, lalu hitung per sepuluh.

### Permainan 7. Memori Banyak Benda (Concrete)

- **Rujukan buku.** hlm. 198–199 (nilai tempat dan pasangan bilangan)
- **Tujuan.** Mencocokkan kumpulan benda dengan lambang bilangannya.
- **Cara main.** Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): gambar kumpulan benda berisi wadah penuh dan benda lepas, dan lambang bilangannya. Siswa membalik dua kartu.
- **Ronde.** ronde 1: pasangan 23, 35, 47, 62; ronde 2: pasangan 31, 44, 56, 68; ronde 3: pasangan 42, 53, 61, 65
- **Panduan suara.** Balik dua kartu, cari benda dan bilangannya.

### Permainan 8. Urutkan Banyak Benda (Concrete)

- **Rujukan buku.** hlm. 214 dan 222 (urutkan bilangan dari yang paling kecil)
- **Tujuan.** Mengurutkan kumpulan benda dari yang paling sedikit atau paling banyak.
- **Cara main.** Tiga ronde, tiap ronde tiga atau empat keranjang bertanda huruf. Siswa mengetuk keranjang satu per satu menurut urutan banyaknya (dua ronde dari paling sedikit, satu dari paling banyak). Letak jawaban berpindah.
- **Ronde.** ronde 1: 36, 52, 78, 91 (dari paling kecil; tampil 36, 52, 78, 91); ronde 2: 84, 67, 45, 29 (dari paling besar; tampil 84, 29, 67, 45); ronde 3: 38, 61, 73, 95 (dari paling kecil; tampil 73, 38, 95, 61)
- **Panduan suara.** Ketuk keranjang menurut banyaknya.

### Permainan 9. Pilah: Kurang atau Lebih dari 50 (Concrete)

- **Rujukan buku.** hlm. 192 (semester satu sampai 50, kali ini sampai 100)
- **Tujuan.** Memilah kumpulan benda menurut kurang dari 50 atau lebih dari 50.
- **Cara main.** Tiga ronde, tiap ronde enam kumpulan benda. Siswa menyeret atau mengetuk kumpulan ke kotak Kurang dari 50 atau Lebih dari 50. Kunci dihitung dari banyak puluhan.
- **Ronde.** ronde 1: kurang dari 50: 23, 48, 34; lebih dari 50: 62, 75, 89; ronde 2: kurang dari 50: 19, 42, 38; lebih dari 50: 56, 91, 67; ronde 3: kurang dari 50: 27, 45, 36; lebih dari 50: 83, 71, 58
- **Panduan suara.** Pilah kumpulan ke kotak yang tepat.

### Permainan 10. Kantong Misterius (Concrete)

- **Rujukan buku.** hlm. 198–199 (banyak kelereng milik ayah Malosi)
- **Tujuan.** Menemukan kumpulan benda yang banyaknya sama dengan sebuah bilangan.
- **Cara main.** Tiga ronde, tiap ronde dua soal. Siswa membaca bilangan, misalnya 67, lalu mengetuk satu dari empat kumpulan benda yang banyaknya 67. Pengecoh: bilangan dengan angka tertukar (76) dan selisih satu atau sepuluh.
- **Ronde.** ronde 1: cari 67 di antara 67, 76, 57, 66; cari 53 di antara 35, 53, 63, 52; ronde 2: cari 48 di antara 84, 48, 58, 47; cari 82 di antara 28, 81, 92, 82; ronde 3: cari 71 di antara 17, 70, 81, 71; cari 94 di antara 49, 95, 84, 94
- **Panduan suara.** Ketuk kumpulan yang banyaknya sama.

### Permainan 11. Hitung Batang Puluhan (Picture)

- **Rujukan buku.** hlm. 195–197 (menghitung puluhan sampai 100)
- **Tujuan.** Menghitung banyak puluhan dari model batang.
- **Cara main.** Tiga ronde, tiap ronde dua soal. Gambar menampilkan beberapa batang sepuluh kotak. Siswa mengatur penghitung sampai sama dengan banyak batang, lalu menekan Periksa.
- **Ronde.** ronde 1: 5, 8 batang; ronde 2: 3, 10 batang; ronde 3: 6, 7 batang
- **Panduan suara.** Hitung batangnya, lalu tulis banyak puluhan.

### Permainan 12. Cari Model Bilangan (Picture)

- **Rujukan buku.** hlm. 198–199 (puluhan dan satuan pada nilai tempat)
- **Tujuan.** Menemukan model batang dan kotak yang sama dengan sebuah bilangan.
- **Cara main.** Tiga ronde, tiap ronde dua soal. Siswa membaca bilangan, lalu mengetuk satu dari empat model batang puluhan dan kotak satuan. Pengecoh memuat angka tertukar dan selisih satu.
- **Ronde.** ronde 1: cari 73 di antara 73, 37, 63, 72; cari 45 di antara 54, 44, 45, 35; ronde 2: cari 28 di antara 28, 82, 38, 27; cari 91 di antara 19, 91, 81, 90; ronde 3: cari 56 di antara 65, 55, 46, 56; cari 39 di antara 93, 38, 29, 39
- **Panduan suara.** Ketuk model yang sama dengan bilangan.

### Permainan 13. Isi Papan Nilai Tempat (Picture)

- **Rujukan buku.** hlm. 198–199 dan 204–205 (puluhan dan satuan, lalu tulis bilangannya)
- **Tujuan.** Menuliskan bilangan pada papan nilai tempat dari model batang dan kotak.
- **Cara main.** Empat soal. Gambar model menampilkan batang puluhan dan kotak satuan. Siswa mengatur angka puluhan dan angka satuan pada papan, lalu menekan Periksa.
- **Ronde.** soal papan: 34, 57, 72, 90
- **Panduan suara.** Atur angka puluhan dan satuan pada papan.

### Permainan 14. Jodohkan Model dan Bilangan (Picture)

- **Rujukan buku.** hlm. 206 (hubungkan dengan bilangan yang tepat)
- **Tujuan.** Menjodohkan model batang dan kotak dengan lambang bilangannya.
- **Cara main.** Tiga ronde, tiap ronde tiga model dan tiga lambang bilangan. Siswa mengetuk model lalu lambang yang cocok.
- **Ronde.** ronde 1: 24, 51, 87; ronde 2: 36, 63, 98; ronde 3: 45, 72, 19
- **Panduan suara.** Ketuk model, lalu ketuk bilangannya.

### Permainan 15. Pasangan Bilangan (Picture)

- **Rujukan buku.** hlm. 198–199 (cara 2: pasangan bilangan, 53 = 50 + 3)
- **Tujuan.** Melengkapi bagan pasangan bilangan.
- **Cara main.** Tiga ronde, tiap ronde dua bagan. Satu bagian tersembunyi: bila total 67 dan satu bagian 60, bagian lain 7. Siswa memilih satu dari tiga pilihan angka.
- **Ronde.** ronde 1: 67 = 60 + ?, 53 = ? + 3; ronde 2: 84 = 80 + ?, 29 = ? + 9; ronde 3: 95 = ? + 5, 48 = 40 + ?
- **Panduan suara.** Lengkapi bagian yang hilang.

### Permainan 16. Garis Puluhan (Picture)

- **Rujukan buku.** hlm. 195–197 (menghitung puluhan dengan melompat sepuluh-sepuluh)
- **Tujuan.** Melompat sepuluh-sepuluh pada garis puluhan.
- **Cara main.** Tiga ronde, tiap ronde tiga soal pada garis 0, 10, 20, sampai 100. Siswa membaca mulai dan banyak lompatan, misalnya mulai 30 lompat 4 puluhan, lalu mengetuk bilangan pendaratan.
- **Ronde.** ronde 1: 30 lompat 4 puluhan = 70, 20 lompat 3 puluhan = 50, 50 lompat 5 puluhan = 100; ronde 2: 10 lompat 6 puluhan = 70, 40 lompat 2 puluhan = 60, 60 lompat 3 puluhan = 90; ronde 3: 0 lompat 8 puluhan = 80, 70 lompat 2 puluhan = 90, 30 lompat 7 puluhan = 100
- **Panduan suara.** Lompat sepuluh-sepuluh, lalu ketuk tempat mendarat.

### Permainan 17. Lengkapi Tabel Seratus (Picture)

- **Rujukan buku.** hlm. 209 (urutan bilangan 51 sampai 100 dengan kotak kosong)
- **Tujuan.** Melengkapi bilangan yang hilang pada tabel 51 sampai 100.
- **Cara main.** Tiga ronde, tiap ronde empat atau lima kotak kosong pada tabel sepuluh kolom. Kotak yang menyala menunggu jawaban, dan siswa memilih satu dari tiga angka. Petunjuk menyebut bilangan tetangga.
- **Ronde.** ronde 1: kotak kosong 58, 65, 72, 79; ronde 2: kotak kosong 53, 69, 76, 84, 91; ronde 3: kotak kosong 60, 70, 80, 90, 100
- **Panduan suara.** Isi kotak yang menyala dengan bilangan yang tepat.

### Permainan 18. Urutkan Model (Picture)

- **Rujukan buku.** hlm. 214 dan 222 (mengurutkan bilangan)
- **Tujuan.** Mengurutkan model batang dan kotak dari yang terkecil atau terbesar.
- **Cara main.** Tiga ronde, tiap ronde tiga atau empat model. Siswa mengetuk model satu per satu menurut urutan banyaknya. Letak jawaban berpindah.
- **Ronde.** ronde 1: 57, 76, 83 (dari paling kecil; tampil 57, 76, 83); ronde 2: 94, 65, 48, 31 (dari paling besar; tampil 48, 94, 65, 31); ronde 3: 29, 56, 92 (dari paling kecil; tampil 29, 92, 56)
- **Panduan suara.** Ketuk model menurut urutannya.

### Permainan 19. Pilah Model menurut Puluhan (Picture)

- **Rujukan buku.** hlm. 198–199 (banyak puluhan menentukan besar bilangan)
- **Tujuan.** Memilah model menurut banyak puluhannya.
- **Cara main.** Tiga ronde, tiap ronde enam model dan tiga kotak berlabel banyak puluhan (misalnya 3, 5, dan 7). Siswa menyeret atau mengetuk model ke kotak yang tepat. Tiap kotak menerima dua model.
- **Ronde.** ronde 1: kotak puluhan 3, 5, 7; model 32, 38, 54, 57, 71, 76; ronde 2: kotak puluhan 2, 4, 6; model 21, 29, 43, 48, 65, 67; ronde 3: kotak puluhan 4, 6, 8; model 41, 49, 62, 68, 84, 87
- **Panduan suara.** Pilah model menurut banyak puluhannya.

### Permainan 20. Tebak Banyak Titik (Picture)

- **Rujukan buku.** hlm. 200–201 (tebak lalu hitung)
- **Tujuan.** Memperkirakan banyak titik lalu menghitungnya dengan kelompok sepuluh.
- **Cara main.** Tiga ronde: 47, 33, dan 76 titik. Siswa menebak dulu satu dari tiga tebakan, lalu titik dikelompokkan sepuluh-sepuluh dan siswa memilih banyak sebenarnya.
- **Ronde.** ronde 1: 47 titik, pilihan tebakan 30, 50, 70; ronde 2: 33 titik, pilihan tebakan 10, 30, 50; ronde 3: 76 titik, pilihan tebakan 60, 80, 100
- **Panduan suara.** Tebak dulu, lalu hitung per sepuluh.

### Permainan 21. Jodohkan Puluhan, Satuan, dan Bilangan (Abstract)

- **Rujukan buku.** hlm. 206 nomor 3 (hubungkan dengan bilangan yang tepat)
- **Tujuan.** Menjodohkan kalimat puluhan dan satuan dengan lambang bilangan.
- **Cara main.** Tiga ronde, tiap ronde tiga pasangan, misalnya 9 puluhan dan 2 satuan dengan 92. Siswa mengetuk kalimat, lalu lambang bilangan yang cocok.
- **Ronde.** ronde 1: 9 puluhan dan 2 satuan = 92, 7 puluhan dan 3 satuan = 73, 10 puluhan dan 0 satuan = 100; ronde 2: 6 puluhan dan 6 satuan = 66, 8 puluhan dan 7 satuan = 87, 5 puluhan dan 4 satuan = 54; ronde 3: 4 puluhan dan 1 satuan = 41, 7 puluhan dan 8 satuan = 78, 9 puluhan dan 9 satuan = 99
- **Panduan suara.** Ketuk kalimat, lalu ketuk bilangannya.

### Permainan 22. Lengkapi Kalimat Puluhan dan Satuan (Abstract)

- **Rujukan buku.** hlm. 198–199 dan 204–205 (puluhan dan satuan sama dengan bilangan)
- **Tujuan.** Melengkapi kalimat puluhan dan satuan dengan bilangan yang tepat.
- **Cara main.** Dua ronde, tiap ronde tiga kalimat, misalnya 6 puluhan dan 7 satuan sama dengan ... Siswa memilih satu dari tiga bilangan. Pengecoh memuat angka tertukar.
- **Ronde.** ronde 1: 6 puluhan dan 7 satuan = 67; 5 puluhan dan 3 satuan = 53; 9 puluhan dan 2 satuan = 92; ronde 2: 4 puluhan dan 6 satuan = 46; 7 puluhan dan 1 satuan = 71; 8 puluhan dan 5 satuan = 85
- **Panduan suara.** Pilih bilangan yang tepat untuk bagian kosong.

### Permainan 23. Susun Nama dan Kalimat Bilangan (Abstract)

- **Rujukan buku.** hlm. 195–197 dan 208 (nama bilangan; tulis lambang bilangan)
- **Tujuan.** Menyusun kata menjadi kalimat tentang nama dan lambang bilangan.
- **Cara main.** Empat kalimat. Kartu kata diketuk berurutan. Satu kartu pengecoh tidak dipakai. Kalimat yang benar dibacakan.
- **Ronde.** ronde 1: Enam puluh dua ditulis 62; ronde 2: Sepuluh puluhan dibaca seratus; ronde 3: Lima puluhan dan tiga satuan sama dengan 53; ronde 4: Satu bungkus berisi sepuluh kue cubit
- **Panduan suara.** Ketuk kata menjadi kalimat yang benar.

### Permainan 24. Isi Tabel Puluhan dan Satuan (Abstract)

- **Rujukan buku.** hlm. 204–205 dan 219–220 (puluhan dan satuan sama dengan)
- **Tujuan.** Mengisi tabel puluhan dan satuan dari lambang bilangan.
- **Cara main.** Dua ronde dengan tabel berisi empat baris, misalnya bilangan 53 dengan 5 puluhan dan 3 satuan. Siswa mengetuk baris, lalu mengetuk kartu yang tepat.
- **Ronde.** ronde 1: Puluhan dan satuan: 53=5 puluhan dan 3 satuan, 67=6 puluhan dan 7 satuan, 82=8 puluhan dan 2 satuan, 29=2 puluhan dan 9 satuan; ronde 2: Puluhan dan satuan, ronde dua: 41=4 puluhan dan 1 satuan, 76=7 puluhan dan 6 satuan, 95=9 puluhan dan 5 satuan, 100=10 puluhan dan 0 satuan
- **Panduan suara.** Isi tabel dengan kartu yang tepat.

### Permainan 25. Benar atau Salah: Bilangan (Abstract)

- **Rujukan buku.** hlm. 194–209 (puluhan, satuan, nama bilangan)
- **Tujuan.** Menilai pernyataan tentang puluhan, satuan, dan nama bilangan.
- **Cara main.** Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan dihitung dari bilangan, dan tiap jawaban diberi penjelasan singkat.
- **Ronde.** ronde 1: 5 pernyataan, 3 benar; ronde 2: 5 pernyataan, 4 benar
- **Panduan suara.** Baca pernyataan, lalu pilih benar atau salah.

### Permainan 26. Tulis Lambang dari Nama (Abstract)

- **Rujukan buku.** hlm. 208 nomor 5 dan 221 nomor 3 (tulis lambang bilangan sesuai dengan nama bilangannya)
- **Tujuan.** Memilih lambang bilangan yang sesuai dengan nama bilangan.
- **Cara main.** Tiga ronde, tiap ronde dua soal, misalnya enam puluh dua. Siswa memilih satu dari tiga lambang. Pengecoh memuat angka tertukar (26) dan selisih satu.
- **Ronde.** ronde 1: enam puluh dua = 62, tujuh puluh delapan = 78; ronde 2: lima puluh tiga = 53, sembilan puluh satu = 91; ronde 3: delapan puluh tujuh = 87, empat puluh lima = 45
- **Panduan suara.** Baca nama bilangan, lalu pilih lambangnya.

### Permainan 27. Detektif Bilangan (Abstract)

- **Rujukan buku.** hlm. 217 (aku adalah bilangan) dan 223 (buatlah pertanyaan untuk menunjukkan satu bilangan)
- **Tujuan.** Menemukan sebuah bilangan dari dua atau tiga petunjuk.
- **Cara main.** Empat soal. Siswa membaca petunjuk seperti puluhanku 7 dan satuanku 3, lalu memilih satu dari tiga bilangan. Hanya satu bilangan yang cocok dengan semua petunjuk.
- **Ronde.** soal 1: Puluhanku 7. Satuanku 3. jawaban 73; soal 2: Aku lebih besar dari 80. Aku lebih kecil dari 90. Satuanku 4. jawaban 84; soal 3: Puluhanku 5. Jumlah puluhan dan satuanku 9. jawaban 54; soal 4: Aku lebih besar dari 60. Aku lebih kecil dari 70. Satuanku 5. jawaban 65
- **Panduan suara.** Baca semua petunjuk, lalu pilih bilangannya.

### Permainan 28. Peta Konsep Bilangan (Abstract)

- **Rujukan buku.** hlm. 192 (peta konsep: menghitung, membaca, dan menulis bilangan)
- **Tujuan.** Melengkapi peta konsep puluhan dan satuan serta membaca dan menulis bilangan.
- **Cara main.** Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala.
- **Ronde.** Puluhan dan satuan; Membaca dan menulis bilangan
- **Panduan suara.** Pilih kartu yang tepat untuk kotak yang menyala.

### Permainan 29. Urutkan Bilangan (Abstract)

- **Rujukan buku.** hlm. 214 dan 222 (urutkan bilangan dari yang paling kecil)
- **Tujuan.** Mengurutkan lambang bilangan dari yang paling kecil atau paling besar.
- **Cara main.** Tiga ronde, tiap ronde empat atau lima bilangan, misalnya 62, 26, 71, 17. Siswa mengetuk bilangan satu per satu menurut urutan. Letak jawaban berpindah.
- **Ronde.** ronde 1: 17, 26, 62, 71 (dari paling kecil; tampil 62, 26, 71, 17); ronde 2: 94, 85, 58, 49 (dari paling besar; tampil 58, 85, 49, 94); ronde 3: 39, 48, 74, 83, 90 (dari paling kecil; tampil 90, 39, 83, 48, 74)
- **Panduan suara.** Ketuk bilangan menurut urutannya.

### Permainan 30. Ketuk Semua yang Cocok (Abstract)

- **Rujukan buku.** hlm. 198–199 dan 212–213 (puluhan dan satuan menentukan besar bilangan)
- **Tujuan.** Memilih semua bilangan yang memiliki ciri tertentu.
- **Cara main.** Tiga ronde, tiap ronde enam bilangan dan satu ciri: punya 6 puluhan, satuannya 5, atau lebih besar dari 70. Siswa mengetuk semua yang cocok, lalu menekan Periksa.
- **Ronde.** ronde 1: 3 dari 6 cocok (mempunyai 6 puluhan.); ronde 2: 3 dari 6 cocok (satuannya 5.); ronde 3: 3 dari 6 cocok (lebih besar dari 70.)
- **Panduan suara.** Ketuk semua yang cocok, lalu periksa.

## 8. Poin Penting dan Catatanku

- 📦 **Sepuluh satuan, satu puluhan**: 10 satuan = 1 puluhan. _Suara:_ Sepuluh satuan sama dengan satu puluhan. Satu bungkus berisi sepuluh kue cubit adalah satu puluhan.
- 🔟 **Puluhan sampai seratus**: 10, 20, 30, sampai 100. _Suara:_ Menghitung puluhan melompat sepuluh-sepuluh sampai sepuluh puluhan, yaitu seratus.
- 🧺 **Puluhan dan satuan**: 5 puluhan dan 3 satuan = 53. _Suara:_ Lima puluhan dan tiga satuan sama dengan lima puluh tambah tiga, yaitu lima puluh tiga.
- 🔤 **Membaca dan menulis**: puluhan di kiri, satuan di kanan. _Suara:_ Angka di sebelah kiri adalah puluhan dan angka di sebelah kanan adalah satuan. Kita membaca puluhannya dulu.
- 🔭 **Memperkirakan**: tebak, lalu kelompokkan sepuluh. _Suara:_ Menebak banyak benda boleh keliru. Kita membuktikannya dengan mengelompokkan setiap sepuluh benda.

**Suara Poin Penting.** Ingat selalu! Sepuluh satuan sama dengan satu puluhan, dan sepuluh puluhan sama dengan seratus. Banyak benda terdiri dari puluhan dan satuan, misalnya lima puluhan dan tiga satuan sama dengan lima puluh tiga. Angka di kiri adalah puluhan dan angka di kanan adalah satuan. Kita boleh menebak banyak benda, lalu membuktikannya dengan mengelompokkan setiap sepuluh.

**Cara menyebutkan.** puluhan dan satuan bilangan. _Suara:_ Cara menyebutkan. Lima puluhan dan tiga satuan sama dengan lima puluh tiga. Sebut puluhan, lalu satuan, lalu bilangannya.

**Ayo Mencoba di rumah.** Ayo Mencoba di rumah: ambil satu genggam lidi atau stik es krim, tebak banyaknya, lalu ikat setiap sepuluh dan hitung puluhan dan satuannya. Tulis hasilnya dengan lambang bilangan dan baca dengan suara keras. Ceritakan juga bilangan yang paling kamu suka.

**Refleksi (Catatanku).**

- Aku dapat menghitung banyak benda sampai dengan 100.
- Aku dapat membaca dan menulis bilangan sampai dengan 100.
- Aku belajar dengan tertib.
- Aku menyampaikan pendapat dengan percaya diri.

## 9. Metode dari luar buku yang diadopsi

- **Pengelompokan sepuluh-sepuluh (chunking, subitizing)**: banyak benda yang besar dihitung per kelompok sepuluh, bukan satu-satu. Dasar permainan Ikat Sepuluh, Tebak dan Hitung, dan adegan video ikan.
- **Tebak lalu buktikan (estimasi)**: siswa menebak banyak benda dari tiga pilihan tebakan tanpa jawaban yang salah, lalu membuktikannya dengan kelompok sepuluh. Dasar permainan Tebak dan Hitung dan Tebak Banyak Titik.
- **Blok nilai tempat (base-ten blocks, ala Dienes)**: batang sepuluh kotak untuk puluhan dan kotak tunggal untuk satuan. Dasar tahap Picture tanpa gambar benda.
- **Papan nilai tempat dan pasangan bilangan (number bond)**: 53 dibaca lima puluh tiga, ditulis 5 puluhan 3 satuan, dan dipecah 50 + 3. Dua cara disajikan berdampingan di peta pikiran dan permainan.
- **Tabel seratus (hundred chart)**: bilangan 51 sampai 100 disusun sepuluh kolom, sehingga tetangga kiri-kanan berbeda satu dan atas-bawah berbeda sepuluh. Dasar permainan Lengkapi Tabel Seratus.
- **Garis puluhan**: melompat sepuluh-sepuluh pada garis 0, 10, 20, sampai 100 menghubungkan menghitung puluhan dengan lompatan di garis.
- **Detektif bilangan (deduksi dari petunjuk)**: dua sampai tiga petunjuk menyisakan satu bilangan. Setiap soal diperiksa oleh uji statis agar hanya satu bilangan yang cocok.

## 10. Batas yang diketahui

- Soal Latihan (30 poin), soal Ujian (70 poin), dan Simulasi belum dibuat. Pemilik akan menugaskannya terpisah. Sampai saat itu tab Latihan dan Ujian menampilkan kartu "sedang disiapkan".
- Suara dan ketukan video diuji dengan suara perangkat di Chrome desktop berukuran ponsel. Pada sebagian Android, tombol Jeda tidak menghentikan suara di tengah kalimat (Web Speech `pause()` tidak didukung merata).
- Laju 0,70 dan nada 1 sama untuk Bu Sari dan Pak Budi. Beda guru hanya pada suara yang dipilih perangkat (wanita atau pria). Perangkat yang hanya punya satu suara Indonesia akan membuat kedua guru terdengar serupa.
- Ucapan memakai kata, bukan lambang, supaya suara perangkat tidak salah membaca.
- Tiga puluh permainan per sub-bab memakai sepuluh jenis per tahap. Mesin yang sama (urut ketuk, pilih bertahap, jodohkan, ketuk semua, memori) dipakai lintas tahap dengan isi yang berbeda: benda nyata di Concrete, diagram di Picture, kata dan angka di Abstract.
- Benda pada permainan memakai gambar SVG dan emoji bawaan perangkat yang tampil di Windows 10 (tanpa emoji Unicode 13). Bilangan dibatasi sampai 100 (seratus).

