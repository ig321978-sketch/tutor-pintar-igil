# Naskah Matematika Kelas 2 SD, Bab 2: Penjumlahan dan Pengurangan, Sub-Bab A: Berbagai Cara Melakukan Penjumlahan

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k2b2.ts` dan `src/components/modul/data-k2b2.ts`, oleh `scripts/buat-naskah-md-k2b2.mjs`. Isi mengikuti Buku Siswa Matematika Kelas II (Kemendikbudristek, Kurikulum Merdeka, Bab 2 hlm. 37–64) dan diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban tidak ada di berkas ini.

## 1. Identitas modul

| Butir | Isi |
|---|---|
| Modul | `mtk-2-bab2`, sub-bab A |
| Berkas data | `src/data/kelas2-bab2.json` (dibangkitkan `src/content-master/buat-k2-bab2.mjs`, lalu `npm run sync:keys`) |
| Kode bab di server | `k2-mat-bab2` (belum ada seed server karena soal belum ada) |
| Fase dan kelas | `FASE_A`, kelas 2 SD |
| Elemen | 🌈 Fase A • Elemen Bilangan (Kelas 2 SD/MI) |
| Poin Kualifikasi per bab | Latihan 30 dan Ujian 70 (terbit setelah soalnya ada). Praktikum 50 terbit sekali per blok empat bab. |
| Suara Guru | Murni Web Speech API bawaan perangkat (`id-ID`), **laju 0,70 dan nada 1**. Tanpa berkas audio statis, tanpa ElevenLabs. |
| Panggilan API saat siswa belajar | Nol. Seluruh tahap Materi berjalan di klien. |
| Tab Simulasi, Latihan, Ujian | Belum diisi. Latihan dan Ujian menampilkan kartu "sedang disiapkan". Tab Simulasi tidak tampil. |

## 2. Capaian dan tujuan pembelajaran

**Capaian Pembelajaran (CP).** Siswa menjumlahkan bilangan cacah sampai 20 dengan menghitung maju, penjumlahan bersusun, dan pasangan bilangan, memindahkan sepuluh satuan menjadi satu puluhan, serta memilih cara yang paling mudah dan menjelaskan alasannya.

**Rujukan.** Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 2: Penjumlahan dan Pengurangan, Sub-Bab A hlm. 37–47).

**Sasaran.** Siswa menjumlahkan bilangan sampai 20 dengan tiga cara, yaitu menghitung maju di jalur bilangan, penjumlahan bersusun dengan tabel nilai tempat, dan pasangan bilangan. Siswa memindahkan sepuluh satuan menjadi satu puluhan saat satuan berjumlah sepuluh, memeriksa bahwa semua cara memberi hasil yang sama, serta memilih cara yang paling mudah dan menjelaskan alasannya.

**Suara Silabus.** Kita belajar berbagai cara melakukan penjumlahan. Bukunya bernama Penjumlahan dan Pengurangan, bagian berbagai cara melakukan penjumlahan. Tika dan Kira memetik jambu air, lalu kita menjumlahkan jambu mereka dengan tiga cara: menghitung maju, penjumlahan bersusun, dan pasangan bilangan. Kita juga belajar memindahkan sepuluh satuan menjadi satu puluhan. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.

## 3. Peta enam tahap SMICPA dan bobotnya

| Tahap | Isi | Banyak butir |
|---|---|---|
| S. Story | Video animasi HTML/SVG, tiga video. Tiap video diputar satu per satu saat diketuk (tidak ada putar otomatis) | 3 video, 9 adegan, 49 ketukan |
| M. Mind-Map | Peta pikiran berurutan, tiap cabang bisa diketuk dan uraiannya tampil di layar | 8 langkah |
| I. Infografis | Poster rangkuman, suara di tiap panel | 10 panel |
| C. Concrete | Benda nyata yang diketuk, diseret, dan dihitung | 4 permainan |
| P. Picture | Diagram polos: jalur bilangan, tabel nilai tempat, bagan pasangan, model batang | 3 permainan |
| A. Abstract | Kata dan angka: kartu, isian, kanvas guratan | 3 permainan |

Bobot mengikuti isi buku. Aturan Concrete dan Picture berlaku: benda berwarna hanya di Concrete, Picture hanya diagram tanpa gambar benda. Aturan susun ke bawah: angka soal biru besar, angka jawaban hijau besar, catatan pindah dan urai merah kecil yang menempel pada angka.

## 4. Tahap 1: Story (video animasi, menggantikan slide)

Tidak ada video yang berjalan sendiri. Siswa mengetuk **▶ Putar** pada satu video. Video itu berjalan, dan video lain berhenti. Setiap kalimat adalah satu ketukan: dibacakan Suara Guru perangkat, dan gambar berubah mengikuti kalimat yang sedang dibacakan. Ada tombol Jeda, Ulang, dan Suara hidup atau mati.

### Video 1: Panen Jambu Air (Cerita Tika dan Kira)

**Adegan 1. Pohon jambu di halaman Tika** (`K2B2A-V1-1`)

1. Di halaman rumah Tika, ada pohon jambu air.  
   _Papan layar:_ Pohon jambu air
2. Tika menyiram dan memupuk pohon jambunya dengan teratur.  
   _Papan layar:_ Disiram dan dipupuk
3. Sekarang, pohon jambu air itu berbuah sangat lebat.  
   _Papan layar:_ Buahnya lebat!
4. Tika mengajak Kira untuk memetik buah jambu air.  
   _Papan layar:_ Ayo petik, Kira!

**Adegan 2. Tika dan Kira memetik** (`K2B2A-V1-2`)

1. Tika memetik 12 buah jambu air.  
   _Papan layar:_ Tika: 12 jambu
2. Kira memetik 6 lebih banyak dari jambu air milik Tika.  
   _Papan layar:_ Kira: 6 lebih banyak
3. Mereka terlihat senang karena menyukai jambu air.  
   _Papan layar:_ Senang sekali!
4. Kata Kira, jambu air milik Tika berasa manis, dan vitamin pada jambu air juga baik untuk tubuh kita.  
   _Papan layar:_ Manis dan sehat

**Adegan 3. Dua pertanyaan** (`K2B2A-V1-3`)

1. Ada dua pertanyaan di akhir cerita.  
   _Papan layar:_ Dua pertanyaan
2. Berapa jumlah jambu air yang dipetik Tika dan Kira?  
   _Papan layar:_ Berapa jumlahnya?
3. Berapa selisih banyak jambu air milik Tika dan Kira?  
   _Papan layar:_ Berapa selisihnya?
4. Sebelum menjawabnya, kita cari dulu banyak jambu air milik Kira.  
   _Papan layar:_ Cari milik Kira dulu
5. Kira memetik 6 lebih banyak dari Tika, jadi kita jumlahkan 12 dan 6.  
   _Papan layar:_ 12 + 6 = ?
6. Penjumlahan bisa dilakukan dengan berbagai cara.  
   _Papan layar:_ Berbagai cara
7. Ayo kita lihat caranya!  
   _Papan layar:_ Ayo lihat caranya!

### Video 2: Tiga Cara Menjumlahkan 12 + 6 (Maju, bersusun, dan pasangan bilangan)

**Adegan 1. Cara 1: Menghitung maju** (`K2B2A-V2-1`)

1. Cara pertama adalah menghitung maju.  
   _Papan layar:_ Cara 1: Hitung maju
2. Kita ingin tahu hasil dari 12 ditambah 6.  
   _Papan layar:_ 12 + 6 = ?
3. Mula-mula kita berdiri di bilangan 12 pada jalur bilangan.  
   _Papan layar:_ Mulai dari 12
4. Lalu kita melompat 6 langkah ke depan: 13, 14, 15, 16, 17, 18.  
   _Papan layar:_ Lompat 6 langkah
5. Kita berhenti di 18, jadi 12 ditambah 6 sama dengan 18.  
   _Papan layar:_ 12 + 6 = 18
6. Banyak jambu air yang dipetik Kira adalah 18 buah.  
   _Papan layar:_ Kira: 18 jambu

**Adegan 2. Cara 2: Penjumlahan bersusun** (`K2B2A-V2-2`)

1. Cara kedua adalah penjumlahan bersusun.  
   _Papan layar:_ Cara 2: Bersusun
2. Bilangan 12 terdiri dari 1 puluhan dan 2 satuan.  
   _Papan layar:_ 12 = 1 puluhan 2 satuan
3. Bilangan 6 hanya punya 6 satuan.  
   _Papan layar:_ 6 = 6 satuan
4. Langkah satu, susun bilangannya. Satuan harus lurus dengan satuan.  
   _Papan layar:_ Langkah 1: susun
5. Langkah dua, jumlahkan satuan dengan satuan. 2 ditambah 6 sama dengan 8.  
   _Papan layar:_ Langkah 2: 2 + 6 = 8
6. Langkah tiga, jumlahkan puluhan dengan puluhan. Hanya ada 1 puluhan, jadi puluhannya 1.  
   _Papan layar:_ Langkah 3: puluhan 1
7. Hasilnya 1 puluhan dan 8 satuan, yaitu 18.  
   _Papan layar:_ Hasil: 18

**Adegan 3. Cara 3: Pasangan bilangan** (`K2B2A-V2-3`)

1. Cara ketiga adalah pasangan bilangan.  
   _Papan layar:_ Cara 3: Pasangan
2. Ingat pasangan bilangan. 12 dipisah menjadi 10 dan 2.  
   _Papan layar:_ 12 = 10 dan 2
3. Sekarang jumlahkan bagian yang kecil dulu: 2 ditambah 6 sama dengan 8.  
   _Papan layar:_ 2 + 6 = 8
4. Lalu jumlahkan dengan sepuluhnya: 10 ditambah 8 sama dengan 18.  
   _Papan layar:_ 10 + 8 = 18
5. Jadi 12 ditambah 6 sama dengan 18.  
   _Papan layar:_ 12 + 6 = 18
6. Tiga cara berbeda, hasilnya sama, yaitu 18. Pilih cara yang paling mudah untukmu!  
   _Papan layar:_ Tiga cara, hasil sama

### Video 3: Sepuluh Satuan Pindah ke Puluhan (18 ditambah 2)

**Adegan 1. Kira memetik dua lagi** (`K2B2A-V3-1`)

1. Kira mempunyai 18 jambu air.  
   _Papan layar:_ Kira: 18 jambu
2. Kira memetik lagi 2 jambu air.  
   _Papan layar:_ Petik 2 lagi
3. Berapa banyak jambu air milik Kira sekarang?  
   _Papan layar:_ 18 + 2 = ?
4. Bagaimana cara kita menghitungnya?  
   _Papan layar:_ Bagaimana caranya?

**Adegan 2. Pasangan bilangan dan pindah** (`K2B2A-V3-2`)

1. Cara pertama memakai pasangan bilangan. 18 dipisah menjadi 10 dan 8.  
   _Papan layar:_ 18 = 10 dan 8
2. Jumlahkan satuannya: 8 ditambah 2 sama dengan 10.  
   _Papan layar:_ 8 + 2 = 10
3. Lalu 10 ditambah 10 sama dengan 20.  
   _Papan layar:_ 10 + 10 = 20
4. Cara kedua memakai tabel nilai tempat. Satuannya 8 ditambah 2, hasilnya 10 satuan.  
   _Papan layar:_ Satuan: 10
5. Ingat, 10 satuan sama dengan 1 puluhan.  
   _Papan layar:_ 10 satuan = 1 puluhan
6. Sepuluh satuan itu kita pindahkan ke kolom puluhan.  
   _Papan layar:_ Pindah ke puluhan!
7. Sekarang puluhan menjadi 1 ditambah 1, yaitu 2 puluhan, dan satuannya 0.  
   _Papan layar:_ 1 + 1 = 2 puluhan
8. Jadi 18 ditambah 2 sama dengan 20.  
   _Papan layar:_ 18 + 2 = 20

**Adegan 3. Ingat: pindah sepuluh** (`K2B2A-V3-3`)

1. Kalau satuan berjumlah 10, kita tukar menjadi 1 puluhan.  
   _Papan layar:_ 10 satuan jadi 1 puluhan
2. Angka satuan di jawaban menjadi 0, dan 1 puluhan pindah ke kolom puluhan.  
   _Papan layar:_ Satuan 0, puluhan +1
3. Ini juga berlaku pada 13 ditambah 7, dan 16 ditambah 4. Hasilnya sama-sama 20.  
   _Papan layar:_ 13 + 7 = 20 • 16 + 4 = 20

## 5. Tahap 2: Mind-Map (peta pikiran)

**1. Kapan Kita Menjumlahkan?** 🧺  
Kita menjumlahkan saat benda bertambah atau saat dua kelompok digabung. Dalam cerita, Tika memetik 12 jambu air dan Kira memetik 6 lebih banyak. Banyak jambu air Kira adalah 12 ditambah 6. Tanda tambah menggabungkan, dan tanda sama dengan menunjukkan hasilnya.

_Alur:_ Cerita penjumlahan → Hitung maju

**2. Cara 1: Menghitung Maju** 🐸  
Berdirilah di bilangan pertama pada jalur bilangan, lalu melompat ke depan sebanyak bilangan kedua. Dari 12 melompat 6 langkah: 13, 14, 15, 16, 17, 18. Tempat kita berhenti adalah hasilnya. Tips dari banyak negara: mulailah dari bilangan yang lebih besar, karena lompatannya jadi lebih sedikit. Metode ini disebut menghitung maju, atau counting on.

_Alur:_ Hitung maju → Bersusun

**3. Cara 2: Penjumlahan Bersusun** 📋  
Tulis bilangan ke bawah. Satuan lurus dengan satuan, puluhan lurus dengan puluhan. Jumlahkan satuan dulu, baru puluhan. Pada 12 ditambah 6, satuan 2 ditambah 6 sama dengan 8, dan puluhannya hanya 1. Hasilnya 1 puluhan dan 8 satuan, yaitu 18. Mulai dari satuan membuat kita siap memindahkan puluhan bila perlu.

_Alur:_ Bersusun → Pasangan bilangan

**4. Cara 3: Pasangan Bilangan** 🌿  
Pisahkan bilangan menjadi puluhan dan satuannya. 12 dipisah menjadi 10 dan 2. Jumlahkan bagian yang kecil: 2 ditambah 6 sama dengan 8. Lalu jumlahkan dengan sepuluh: 10 ditambah 8 sama dengan 18. Di Singapura, pasangan bilangan disebut number bond dan menjadi dasar menghitung di dalam kepala.

_Alur:_ Pasangan bilangan → Pindah sepuluh

**5. Pindah Sepuluh Satuan** 🔁  
Kalau satuan berjumlah 10, tukar sepuluh satuan menjadi satu puluhan dan pindahkan ke kolom puluhan. Pada 18 ditambah 2, satuannya 8 ditambah 2 sama dengan 10. Satuan menjadi 0 dan puluhan menjadi 1 ditambah 1, yaitu 2. Hasilnya 20. Maria Montessori memakai manik emas untuk menunjukkan pertukaran sepuluh menjadi satu ini.

_Alur:_ Pindah sepuluh → Sahabat sepuluh

**6. Sahabat Sepuluh** 🤝  
Pasangan bilangan yang jumlahnya sepuluh disebut sahabat sepuluh: 1 dan 9, 2 dan 8, 3 dan 7, 4 dan 6, serta 5 dan 5. Kalau hafal sahabat sepuluh, menjumlahkan jadi cepat. Pada 18 ditambah 2, delapan bersahabat dengan dua menjadi sepuluh, jadi hasilnya 20. Guru di Jepang menyebutnya metode buah ceri, atau sakurambo: pecah bilangan kedua agar bilangan pertama menjadi sepuluh.

_Alur:_ Sahabat sepuluh → Urutan boleh ditukar

**7. Urutan Boleh Ditukar** 🔄  
Dalam penjumlahan, urutan boleh ditukar. 12 ditambah 6 hasilnya sama dengan 6 ditambah 12, yaitu 18. Karena itu, saat menghitung maju, mulailah dari bilangan yang lebih besar supaya lompatanmu sedikit. Kebiasaan ini juga bisa dipakai untuk memeriksa jawabanmu.

_Alur:_ Urutan boleh ditukar → Pilih dan periksa

**8. Pilih dan Periksa** ✅  
Tiga cara memberi hasil yang sama, jadi pilih cara yang paling mudah untukmu. Hitung maju enak bila bilangan kedua kecil. Bersusun enak bila kita ingin rapi. Pasangan bilangan enak bila ada sepuluh yang bisa dibentuk. Setelah selesai, periksa dengan cara lain, lalu ceritakan alasanmu dengan percaya diri.

_Alur:_ Pilih dan periksa → Penjumlahan siap dipakai

## 6. Tahap 3: Infografis

**Panel 1. Jambu Air Tika dan Kira** 🍎 (18, Delapan belas)

> Tika memetik 12 buah jambu air. Kira memetik 6 lebih banyak dari Tika. Untuk mencari banyak jambu air Kira, kita jumlahkan 12 dan 6. Hasilnya 18. Jadi Kira memetik 18 buah jambu air.

**Panel 2. Cara 1: Menghitung Maju** 🐸 (18, Delapan belas)

> Dari bilangan 12, kita melompat 6 langkah ke depan di jalur bilangan. Hitung lompatannya: 13, 14, 15, 16, 17, 18. Kita berhenti di 18. Jadi dua belas ditambah enam sama dengan delapan belas. Menghitung maju cocok dipakai saat bilangan yang ditambahkan kecil.

**Panel 3. Cara 2: Penjumlahan Bersusun** 📋 (18, Delapan belas)

> Langkah satu, susun bilangan. Satuan lurus dengan satuan. Langkah dua, jumlahkan satuan dengan satuan: dua ditambah enam sama dengan delapan. Langkah tiga, jumlahkan puluhan dengan puluhan: hanya ada satu puluhan. Hasilnya satu puluhan dan delapan satuan, yaitu delapan belas.

**Panel 4. Cara 3: Pasangan Bilangan** 🌿 (18, Delapan belas)

> Pisahkan dua belas menjadi sepuluh dan dua. Jumlahkan dua dan enam, hasilnya delapan. Lalu jumlahkan sepuluh dan delapan, hasilnya delapan belas. Bagan pasangan bilangan membantu kita melihat bagian-bagiannya.

**Panel 5. Tiga Cara, Satu Hasil** ⚖️ (18, Delapan belas)

> Menghitung maju: dari dua belas melompat enam kali sampai delapan belas. Bersusun: dua ditambah enam sama dengan delapan, puluhannya satu, hasilnya delapan belas. Pasangan bilangan: dua ditambah enam sama dengan delapan, sepuluh ditambah delapan sama dengan delapan belas. Ketiga cara menghasilkan bilangan yang sama.

**Panel 6. Sepuluh Satuan = Satu Puluhan** 🔟 (10, Sepuluh)

> Sepuluh kubus satuan bisa disusun menjadi satu batang puluhan. Sebaliknya, satu batang puluhan bisa dibuka menjadi sepuluh kubus satuan. Nilainya sama, yaitu sepuluh. Alat ini disebut balok Dienes, dibuat oleh Zoltan Dienes dan dipakai guru di banyak negara.

**Panel 7. Pindah ke Kolom Puluhan: 18 + 2** 🔁 (20, Dua puluh)

> Kira punya delapan belas jambu air dan memetik lagi dua. Satuan: delapan ditambah dua sama dengan sepuluh. Sepuluh satuan sama dengan satu puluhan, kita pindahkan ke kolom puluhan. Satuan menjadi nol. Puluhan menjadi satu ditambah satu, yaitu dua. Hasilnya dua puluh.

**Panel 8. Sahabat Sepuluh** 🤝 (10, Sepuluh)

> Sahabat sepuluh adalah pasangan bilangan yang jumlahnya sepuluh: satu dan sembilan, dua dan delapan, tiga dan tujuh, empat dan enam, lima dan lima. Hafalkan sahabat sepuluh, supaya penjumlahan terasa mudah.

**Panel 9. Urutan Boleh Ditukar** 🔄 (18, Delapan belas)

> Dua belas ditambah enam sama dengan enam ditambah dua belas, yaitu delapan belas. Saat menghitung maju, mulailah dari bilangan yang lebih besar supaya lompatanmu lebih sedikit.

**Panel 10. Pilih Cara yang Paling Mudah** 🧭 (3, Tiga)

> Tidak ada cara yang paling benar. Pilih yang paling mudah untukmu. Hitung maju bila bilangan kedua kecil. Bersusun bila kamu ingin rapi. Pasangan bilangan bila ada sepuluh yang bisa dibentuk. Lalu periksa dengan cara lain.

## 7. Tahap 4, 5, dan 6: sepuluh permainan

| No | Tahap | Permainan | Jenis | Ronde |
|---|---|---|---|---|
| 1 | Concrete | Petik Jambu Air | `tap-to-count-on` | 12 + 6; 14 + 3; 15 + 4 |
| 2 | Concrete | Gabung Balok | `drag-ones-to-column` | 12 + 6; 13 + 5; 14 + 3 |
| 3 | Concrete | Mesin Pindah Sepuluh | `regroup-ten-ones` | 18 + 2; 13 + 7; 16 + 4 |
| 4 | Concrete | Neraca Jambu | `balance-equal-sums` | 8 + 3 = 5 + 6; 7 + 5 = 9 + 3; 6 + 9 = 10 + 5 |
| 5 | Picture | Loncat di Jalur Bilangan | `hop-on-number-strip` | 12 + 4; 15 + 4; 11 + 9 |
| 6 | Picture | Susun ke Bawah | `vertical-addition-table` | 14 + 3; 13 + 5; 13 + 7 |
| 7 | Picture | Bagan Pasangan | `fill-number-bond` | 14 + 3; 11 + 7; 16 + 4 |
| 8 | Abstract | Jodohkan Cara dan Langkah | `match-method-to-steps` | 12 + 5; 11 + 8; 15 + 3 |
| 9 | Abstract | Kartu Kembar Hasil Sama | `memory-equal-sums` | ronde 1: 12+6 dan 10+8, 15+4 dan 13+6, 11+9 dan 13+7, 14+3 dan 12+5; ronde 2: 10+6 dan 12+4, 13+5 dan 11+7, 8+7 dan 10+5, 6+7 dan 10+3 |
| 10 | Abstract | Kanvas Guratan dan Suara | `say-and-trace` | ronde 1: 12 + 6; ronde 2: pilih 12 + 5, 14 + 4, 15 + 3 |

### Permainan 1. Petik Jambu Air (Concrete)

- **Rujukan buku.** hlm. 39–40 (Panen Jambu Air; Cara 1: menghitung maju)
- **Tujuan.** Menjumlahkan dengan menghitung maju benda nyata: mulai dari banyak awal, lalu menyebut bilangan berikutnya tiap benda bertambah.
- **Cara main.** Tiga ronde (12 + 6, 14 + 3, dan 15 + 4). Keranjang sudah berisi jambu. Siswa mengetuk jambu di pohon satu per satu, tiap ketukan jambu masuk keranjang dan Suara Guru menyebut bilangan berikutnya. Setelah semua dipetik, siswa memilih jumlah seluruhnya. Terakhir ucapkan jumlahnya.
- **Ronde.** 12 + 6; 14 + 3; 15 + 4
- **Panduan suara.** Ketuk jambu di pohon, hitung maju, lalu pilih jumlahnya.

### Permainan 2. Gabung Balok (Concrete)

- **Rujukan buku.** hlm. 41–42 (Cara 2: penjumlahan bersusun, tabel nilai tempat dengan balok)
- **Tujuan.** Menjumlahkan satuan dengan satuan memakai balok Dienes, lalu membaca puluhan dan hasilnya.
- **Cara main.** Tiga ronde (12 + 6, 13 + 5, dan 14 + 3). Papan nilai tempat sudah berisi bilangan pertama. Siswa menyeret kubus satuan milik Kira satu per satu ke kolom Satuan, lalu memilih banyak satuan, banyak puluhan, dan hasilnya. Terakhir ucapkan hasilnya.
- **Ronde.** 12 + 6; 13 + 5; 14 + 3
- **Panduan suara.** Seret kubus ke kolom Satuan, lalu isi satuan dan puluhan.

### Permainan 3. Mesin Pindah Sepuluh (Concrete)

- **Rujukan buku.** hlm. 44 (18 + 2 = 20; 10 satuan = 1 puluhan, pindahkan ke kolom puluhan)
- **Tujuan.** Menukar sepuluh satuan menjadi satu puluhan dan memindahkannya saat menjumlah.
- **Cara main.** Tiga ronde (18 + 2, 13 + 7, dan 16 + 4). Siswa menambah kubus satuan satu per satu. Saat satuan genap sepuluh, tombol Pindah muncul, dan sepuluh kubus berubah menjadi satu batang puluhan. Lalu siswa memilih hasilnya. Terakhir ucapkan hasilnya.
- **Ronde.** 18 + 2; 13 + 7; 16 + 4
- **Panduan suara.** Tambah kubus, lalu pindahkan sepuluh satuan jadi satu puluhan.

### Permainan 4. Neraca Jambu (Concrete)

- **Rujukan buku.** hlm. 62 (Evaluasi nomor 9: 8 + 3 = 5 + ?), diperkaya dengan konsep kesetaraan
- **Tujuan.** Memahami tanda sama dengan sebagai keseimbangan dan menemukan bagian yang hilang agar kedua sisi sama.
- **Cara main.** Tiga ronde (8 + 3 = 5 + ?, 7 + 5 = 9 + ?, dan 6 + 9 = 10 + ?). Neraca miring ke sisi yang lebih berat. Siswa menambah atau mengurangi jambu di piring kanan sampai neraca seimbang, lalu menekan periksa. Terakhir ucapkan jumlah di tiap piring.
- **Ronde.** 8 + 3 = 5 + 6; 7 + 5 = 9 + 3; 6 + 9 = 10 + 5
- **Panduan suara.** Atur jambu di piring kanan sampai neraca seimbang.

### Permainan 5. Loncat di Jalur Bilangan (Picture)

- **Rujukan buku.** hlm. 40 dan 45 (Cara 1: menghitung maju; Ayo Berlatih nomor 1: 10 + 6, 12 + 4, 15 + 4, 11 + 9, 13 + 6)
- **Tujuan.** Menghitung maju di jalur bilangan dengan melompat sebanyak bilangan kedua.
- **Cara main.** Tiga ronde (12 + 4, 15 + 4, dan 11 + 9). Jalur bilangan 10 sampai 20. Siswa mengetuk kotak berikutnya satu per satu sehingga busur lompatan tergambar, lalu menekan Berhenti. Banyak lompatan harus sama dengan bilangan kedua. Terakhir ucapkan hasilnya.
- **Ronde.** 12 + 4; 15 + 4; 11 + 9
- **Panduan suara.** Ketuk kotak berikutnya sebanyak bilangan kedua, lalu berhenti.

### Permainan 6. Susun ke Bawah (Picture)

- **Rujukan buku.** hlm. 41–42 dan 46 (Cara 2: penjumlahan bersusun; Ayo Berlatih nomor 2: 14 + 3, 13 + 5, 13 + 7, 16 + 2)
- **Tujuan.** Menjumlahkan dengan cara bersusun pada tabel nilai tempat: satuan dulu, lalu puluhan, dan memindahkan sepuluh satuan.
- **Cara main.** Tiga ronde (14 + 3, 13 + 5, dan 13 + 7). Siswa meletakkan bilangan kedua di kolom yang tepat, menjumlahkan satuan, memindahkan sepuluh satuan bila perlu, lalu menjumlahkan puluhan. Angka soal biru, angka jawaban hijau, catatan pindah merah kecil.
- **Ronde.** 14 + 3; 13 + 5; 13 + 7
- **Panduan suara.** Susun, jumlahkan satuan dulu, lalu puluhan.

### Permainan 7. Bagan Pasangan (Picture)

- **Rujukan buku.** hlm. 43 dan 46–47 (Cara 3: pasangan bilangan; Ayo Berlatih nomor 3: 14 + 3, 12 + 3, 16 + 4, 11 + 7, 13 + 4)
- **Tujuan.** Menjumlahkan dengan memisahkan bilangan pertama menjadi sepuluh dan satuannya pada bagan pasangan.
- **Cara main.** Tiga ronde (14 + 3, 11 + 7, dan 16 + 4). Tiap ronde punya tiga langkah: memisah bilangan pertama, menjumlahkan satuan, lalu menjumlahkan dengan sepuluh. Siswa memilih bilangan yang tepat untuk tiap bagian bagan.
- **Ronde.** 14 + 3; 11 + 7; 16 + 4
- **Panduan suara.** Pisahkan jadi sepuluh dan satuan, lalu jumlahkan.

### Permainan 8. Jodohkan Cara dan Langkah (Abstract)

- **Rujukan buku.** hlm. 47 (Ayo Berlatih nomor 4: gunakan cara yang menurut kalian paling mudah: 12 + 5, 11 + 8, 15 + 3)
- **Tujuan.** Mengenali langkah hitung tiap cara penjumlahan dalam bentuk lambang.
- **Cara main.** Tiga ronde (12 + 5, 11 + 8, dan 15 + 3). Tiap ronde punya tiga nama cara dan tiga rangkaian langkah. Siswa mengetuk nama cara lalu rangkaian langkah yang cocok. Ketiganya berakhir pada hasil yang sama.
- **Ronde.** 12 + 5; 11 + 8; 15 + 3
- **Panduan suara.** Ketuk nama cara, lalu langkah yang cocok.

### Permainan 9. Kartu Kembar Hasil Sama (Abstract)

- **Rujukan buku.** hlm. 43–44 (hasil penjumlahan yang sama dengan cara berbeda: 12 + 6 dan 10 + 8)
- **Tujuan.** Mengenali dua kalimat penjumlahan berbeda yang hasilnya sama.
- **Cara main.** Dua ronde, masing-masing delapan kartu. Siswa membuka dua kartu. Bila hasil kedua kalimat sama, kartu terkunci terbuka. Bila tidak, kartu menutup lagi. Semua pasangan harus ditemukan.
- **Ronde.** ronde 1: 12+6 dan 10+8, 15+4 dan 13+6, 11+9 dan 13+7, 14+3 dan 12+5; ronde 2: 10+6 dan 12+4, 13+5 dan 11+7, 8+7 dan 10+5, 6+7 dan 10+3
- **Panduan suara.** Buka dua kartu yang hasilnya sama.

### Permainan 10. Kanvas Guratan dan Suara (Abstract)

- **Rujukan buku.** hlm. 45 (Ayo Mencoba: dua kartu bilangan dijumlahkan dengan ketiga cara)
- **Tujuan.** Membaca kalimat penjumlahan, mengucapkan hasilnya, dan menulis lambangnya.
- **Cara main.** Dua ronde. Ronde 1 dua belas ditambah enam. Ronde 2 siswa memilih satu dari tiga kalimat (12 + 5, 14 + 4, 15 + 3). Siswa mengucapkan hasilnya lalu menggurat lambangnya di kanvas.
- **Ronde.** ronde 1: 12 + 6; ronde 2: pilih 12 + 5, 14 + 4, 15 + 3
- **Panduan suara.** Ucapkan hasilnya, lalu guratkan angkanya.

## 8. Poin Penting dan Catatanku

- 🐸 **Hitung maju**: 12 + 6: 13, 14, 15, 16, 17, 18. _Suara:_ Menghitung maju. Mulai dari bilangan pertama, lalu melompat sebanyak bilangan kedua. Dua belas melompat enam kali sampai delapan belas.
- 📋 **Bersusun**: satuan dulu, lalu puluhan. _Suara:_ Penjumlahan bersusun. Satuan lurus dengan satuan. Jumlahkan satuan dulu, lalu puluhan. Dua ditambah enam sama dengan delapan, puluhannya satu, hasilnya delapan belas.
- 🌿 **Pasangan bilangan**: 12 = 10 + 2, lalu 2 + 6 = 8, 10 + 8 = 18. _Suara:_ Pasangan bilangan. Pisahkan dua belas menjadi sepuluh dan dua. Dua ditambah enam sama dengan delapan. Sepuluh ditambah delapan sama dengan delapan belas.
- 🔁 **Pindah sepuluh**: 10 satuan = 1 puluhan. _Suara:_ Kalau satuan berjumlah sepuluh, tukar menjadi satu puluhan dan pindahkan ke kolom puluhan. Delapan belas ditambah dua sama dengan dua puluh.
- 🧭 **Pilih cara termudah**: hasilnya selalu sama. _Suara:_ Semua cara memberi hasil yang sama. Pilih cara yang paling mudah untukmu, lalu periksa dengan cara lain.

**Suara Poin Penting.** Ingat selalu! Penjumlahan bisa dilakukan dengan menghitung maju, bersusun, atau pasangan bilangan. Ketiganya memberi hasil yang sama. Jumlahkan satuan dulu. Kalau satuan berjumlah sepuluh, tukar menjadi satu puluhan dan pindahkan ke kolom puluhan. Pilih cara yang paling mudah untukmu.

**Cara menyebutkan.** Banyak jambu air yang dipetik Kira adalah 18 delapan belas. _Suara:_ Cara menyebutkan hasil penjumlahan. Banyak jambu air yang dipetik Kira adalah delapan belas.

**Ayo Mencoba di rumah.** Ayo Mencoba di rumah: siapkan dua kelompok benda, misalnya sendok dan tutup botol, banyaknya kurang dari dua puluh. Jumlahkan dengan tiga cara: menghitung maju, bersusun, dan pasangan bilangan. Ceritakan cara yang paling mudah untukmu kepada keluargamu.

**Refleksi (Catatanku).**

- Aku bisa menjumlahkan dengan menghitung maju.
- Aku bisa melakukan penjumlahan bersusun.
- Aku bisa menjumlahkan dengan pasangan bilangan.
- Aku belajar dengan senang hati.

## 9. Metode dari luar buku yang diadopsi

- **Counting on (menghitung maju dari bilangan yang lebih besar)**, dipakai di banyak kelas awal di Inggris dan Australia. Muncul di mind-map langkah 2 dan 7.
- **Number bond (pasangan bilangan)** dari Singapore Math. Dasar permainan Bagan Pasangan dan cara 3.
- **Balok Dienes** (Zoltan Dienes) dan **manik emas Montessori** untuk pertukaran sepuluh satuan menjadi satu puluhan. Dasar Gabung Balok dan Mesin Pindah Sepuluh.
- **Sahabat sepuluh dan metode buah ceri (sakurambo)** dari Jepang: pecah bilangan kedua supaya bilangan pertama menjadi sepuluh, lalu tambahkan sisanya.
- **Neraca dan kesetaraan** (equality sense): tanda sama dengan sebagai keseimbangan, bukan sebagai perintah mengerjakan.

## 10. Batas yang diketahui

- Soal Latihan (30 poin), soal Ujian (70 poin), dan Simulasi belum dibuat. Pemilik akan menugaskannya terpisah. Sampai saat itu tab Latihan dan Ujian menampilkan kartu "sedang disiapkan".
- Suara dan ketukan video diuji dengan suara perangkat di Chrome desktop berukuran ponsel. Pada sebagian Android, tombol Jeda tidak menghentikan suara di tengah kalimat (Web Speech `pause()` tidak didukung merata).
- Laju 0,70 dan nada 1 sama untuk Bu Sari dan Pak Budi. Beda guru hanya pada suara yang dipilih perangkat (wanita atau pria). Perangkat yang hanya punya satu suara Indonesia akan membuat kedua guru terdengar serupa.

