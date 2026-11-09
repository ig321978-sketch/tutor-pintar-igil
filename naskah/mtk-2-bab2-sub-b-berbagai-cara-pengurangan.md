# Naskah Matematika Kelas 2 SD, Bab 2: Penjumlahan dan Pengurangan, Sub-Bab B: Berbagai Cara Melakukan Pengurangan

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k2b2.ts` dan `src/components/modul/data-k2b2.ts`, oleh `scripts/buat-naskah-md-k2b2.mjs`. Isi mengikuti Buku Siswa Matematika Kelas II (Kemendikbudristek, Kurikulum Merdeka, Bab 2 hlm. 37–64) dan diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban tidak ada di berkas ini.

## 1. Identitas modul

| Butir | Isi |
|---|---|
| Modul | `mtk-2-bab2`, sub-bab B |
| Berkas data | `src/data/kelas2-bab2.json` (dibangkitkan `src/content-master/buat-k2-bab2.mjs`, lalu `npm run sync:keys`) |
| Kode bab di server | `k2-mat-bab2` (belum ada seed server karena soal belum ada) |
| Fase dan kelas | `FASE_A`, kelas 2 SD |
| Elemen | 🌈 Fase A • Elemen Bilangan (Kelas 2 SD/MI) |
| Poin Kualifikasi per bab | Latihan 30 dan Ujian 70 (terbit setelah soalnya ada). Praktikum 50 terbit sekali per blok empat bab. |
| Suara Guru | Murni Web Speech API bawaan perangkat (`id-ID`), **laju 0,70 dan nada 1**. Tanpa berkas audio statis, tanpa ElevenLabs. |
| Panggilan API saat siswa belajar | Nol. Seluruh tahap Materi berjalan di klien. |
| Tab Simulasi, Latihan, Ujian | Belum diisi. Latihan dan Ujian menampilkan kartu "sedang disiapkan". Tab Simulasi tidak tampil. |

## 2. Capaian dan tujuan pembelajaran

**Capaian Pembelajaran (CP).** Siswa mengurangkan bilangan cacah sampai 20 dengan menghitung mundur, pengurangan bersusun, dan pasangan bilangan, mengurai satu puluhan menjadi sepuluh satuan, memeriksa hasil dengan penjumlahan, serta memilih cara yang paling mudah dan menjelaskan alasannya.

**Rujukan.** Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 2: Penjumlahan dan Pengurangan, Sub-Bab B hlm. 48–53).

**Sasaran.** Siswa mencari selisih dengan memasangkan satu-satu, mengurangkan bilangan sampai 20 dengan tiga cara, yaitu menghitung mundur di jalur bilangan, pengurangan bersusun, dan pasangan bilangan. Siswa mengurai satu puluhan menjadi sepuluh satuan saat satuan tidak cukup, memeriksa hasil pengurangan dengan penjumlahan, serta memilih cara yang paling mudah dan menjelaskan alasannya.

**Suara Silabus.** Kita belajar berbagai cara melakukan pengurangan. Bukunya bernama Penjumlahan dan Pengurangan, bagian berbagai cara melakukan pengurangan. Kita mencari selisih jambu air Tika dan Kira dengan tiga cara: menghitung mundur, pengurangan bersusun, dan pasangan bilangan. Kita juga belajar mengurai satu puluhan menjadi sepuluh satuan, dan memeriksa hasil dengan penjumlahan. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.

## 3. Peta enam tahap SMICPA dan bobotnya

| Tahap | Isi | Banyak butir |
|---|---|---|
| S. Story | Video animasi HTML/SVG satu layar seperti Kelas 2 Bab 1: tiga cerita disusun berurutan dalam satu pemutar, mulai saat Mulai diketuk (tidak ada putar otomatis) | 3 cerita, 8 adegan, 40 ketukan |
| M. Mind-Map | Peta pikiran "Taman Ide": matahari berwajah Igil di tengah, kartu bernomor di kiri dan kanan dengan cabang berwarna. Kartu hanya memuat ikon dan judul, uraiannya dibacakan Suara Guru saat kartu diketuk | 8 langkah |
| I. Infografis | Poster rangkuman, suara di tiap panel | 10 panel |
| C. Concrete | Benda nyata yang diketuk, diseret, dan dihitung | 4 permainan |
| P. Picture | Diagram polos: jalur bilangan, tabel nilai tempat, bagan pasangan, model batang | 3 permainan |
| A. Abstract | Kata dan angka: kartu, isian, kanvas guratan | 3 permainan |

Bobot mengikuti isi buku. Aturan Concrete dan Picture berlaku: benda berwarna hanya di Concrete, Picture hanya diagram tanpa gambar benda. Aturan susun ke bawah: angka soal biru besar, angka jawaban hijau besar, catatan pindah dan urai merah kecil yang menempel pada angka.

## 4. Tahap 1: Story (video animasi, menggantikan slide)

Tampilannya satu layar, sama dengan Kelas 2 Bab 1. Tidak ada adegan yang berjalan sendiri. Siswa mengetuk **▶ Mulai**, lalu ketiga cerita berjalan berurutan sebagai satu video. Nomor adegan bisa diketuk untuk melompat. Setiap kalimat adalah satu ketukan: dibacakan Suara Guru perangkat, dan gambar berubah mengikuti kalimat yang sedang dibacakan. Ada tombol Jeda, Ulang, dan Suara hidup atau mati.

### Cerita 1: Selisih Jambu Air (Jambu Tika dan Kira dipasangkan)

**Adegan 1. Jambu Tika dan Kira** (`K2B2B-V1-1`)

1. Tika mempunyai 12 buah jambu air.  
   _Papan layar:_ Tika: 12 jambu
2. Kira mempunyai 18 buah jambu air.  
   _Papan layar:_ Kira: 18 jambu
3. Berapa selisih banyak jambu air Kira dan Tika?  
   _Papan layar:_ Selisih = ?
4. Selisih adalah beda banyaknya dua kelompok. Kita cari dengan memasangkan jambu satu-satu.  
   _Papan layar:_ Pasangkan satu-satu
5. Jambu Tika semuanya sudah punya pasangan. Jambu Kira yang tidak punya pasangan itulah selisihnya.  
   _Papan layar:_ Yang tersisa = selisih
6. Ada 6 jambu Kira yang tidak berpasangan, jadi selisihnya 6.  
   _Papan layar:_ Selisih: 6

**Adegan 2. Menemukan jawaban dengan mengurangkan** (`K2B2B-V1-2`)

1. Untuk menemukan jawabannya, kita kurangkan 18 dengan 12.  
   _Papan layar:_ 18 − 12 = ?
2. Bilangan yang besar dikurangi bilangan yang kecil.  
   _Papan layar:_ Besar dikurangi kecil
3. Pengurangan bisa dilakukan dengan berbagai cara.  
   _Papan layar:_ Berbagai cara
4. Ayo kita lihat tiga caranya.  
   _Papan layar:_ Tiga cara

### Cerita 2: Tiga Cara Mengurangkan 18 − 12 (Mundur, bersusun, dan pasangan bilangan)

**Adegan 3. Cara 1: Menghitung mundur** (`K2B2B-V2-1`)

1. Cara pertama adalah menghitung mundur.  
   _Papan layar:_ Cara 1: Hitung mundur
2. Kita ingin tahu hasil dari 18 dikurangi 12.  
   _Papan layar:_ 18 − 12 = ?
3. Mula-mula kita berdiri di bilangan 18.  
   _Papan layar:_ Mulai dari 18
4. Lalu kita melompat ke belakang sebanyak 12 lompatan: 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6.  
   _Papan layar:_ Lompat mundur 12 kali
5. Kita berhenti di 6, jadi 18 dikurangi 12 sama dengan 6.  
   _Papan layar:_ 18 − 12 = 6

**Adegan 4. Cara 2: Pengurangan bersusun** (`K2B2B-V2-2`)

1. Cara kedua adalah pengurangan bersusun.  
   _Papan layar:_ Cara 2: Bersusun
2. Tuliskan 18 di tabel nilai tempat: 1 puluhan dan 8 satuan.  
   _Papan layar:_ 18 = 1 puluhan 8 satuan
3. Tuliskan 12 di bawahnya: 1 puluhan dan 2 satuan. Satuan lurus dengan satuan.  
   _Papan layar:_ 12 = 1 puluhan 2 satuan
4. Kurangkan satuan dulu: 8 dikurangi 2 sama dengan 6.  
   _Papan layar:_ 8 − 2 = 6
5. Lalu kurangkan puluhan: 1 dikurangi 1 sama dengan 0.  
   _Papan layar:_ 1 − 1 = 0
6. Hasilnya 0 puluhan dan 6 satuan, yaitu 6.  
   _Papan layar:_ Hasil: 6

**Adegan 5. Cara 3: Pasangan bilangan** (`K2B2B-V2-3`)

1. Cara ketiga adalah pasangan bilangan.  
   _Papan layar:_ Cara 3: Pasangan
2. 18 adalah 10 dan 8. 12 adalah 10 dan 2.  
   _Papan layar:_ 18 = 10 dan 8 • 12 = 10 dan 2
3. Kurangkan puluhan dengan puluhan: 10 dikurangi 10 sama dengan 0.  
   _Papan layar:_ 10 − 10 = 0
4. Kurangkan satuan dengan satuan: 8 dikurangi 2 sama dengan 6.  
   _Papan layar:_ 8 − 2 = 6
5. Jadi 18 dikurangi 12 sama dengan 6.  
   _Papan layar:_ 18 − 12 = 6
6. Selisih jambu air Kira dan Tika adalah 6 buah.  
   _Papan layar:_ Selisih: 6 jambu

### Cerita 3: Urai Satu Puluhan: 12 − 8 (Saat satuan tidak cukup)

**Adegan 6. Tika memberi jambu** (`K2B2B-V3-1`)

1. Tika memiliki 12 jambu air.  
   _Papan layar:_ Tika: 12 jambu
2. Tika memberikan 8 jambu air kepada Lili.  
   _Papan layar:_ Diberi ke Lili: 8
3. Berapakah sisa jambu air milik Tika?  
   _Papan layar:_ Sisa = ?
4. Kita tulis 12 dikurangi 8, dengan 12 di atas.  
   _Papan layar:_ 12 − 8 = ?

**Adegan 7. Urai dan kurangi** (`K2B2B-V3-2`)

1. Satuan pada 12 hanya 2. 2 dikurangi 8 tidak cukup.  
   _Papan layar:_ 2 − 8 tidak cukup
2. Kita urai 1 puluhan menjadi 10 satuan.  
   _Papan layar:_ Urai 1 puluhan
3. Sekarang ada 2 ditambah 10, yaitu 12 satuan.  
   _Papan layar:_ 2 + 10 = 12 satuan
4. Kurangkan 12 satuan dengan 8 satuan. Hasilnya 4 satuan.  
   _Papan layar:_ 12 − 8 = 4
5. Puluhan tinggal 0, karena 1 puluhan sudah diurai.  
   _Papan layar:_ Puluhan: 0
6. Jadi sisa jambu air Tika adalah 4 buah.  
   _Papan layar:_ Sisa: 4

**Adegan 8. Periksa dengan penjumlahan** (`K2B2B-V3-3`)

1. Kita bisa memeriksa hasil pengurangan dengan penjumlahan.  
   _Papan layar:_ Periksa dengan tambah
2. 4 ditambah 8 sama dengan 12. Cocok dengan jambu air Tika semula!  
   _Papan layar:_ 4 + 8 = 12 ✔
3. Kalau tidak cocok, hitung ulang pelan-pelan.  
   _Papan layar:_ Tidak cocok? Hitung ulang

## 5. Tahap 2: Mind-Map (peta pikiran)

Tampilan "Taman Ide": matahari berwajah Igil di tengah, kartu bernomor di kiri dan kanan dihubungkan cabang berwarna. Setiap kartu hanya memuat nomor, ikon, dan judul langkah. Uraian di bawah dibacakan Suara Guru saat kartu diketuk dan tidak tampil di layar.

**1. Kapan Kita Mengurangi?** 🍎  
Kita mengurangi saat benda berkurang atau diberikan, dan saat kita mencari selisih dua kelompok. Tika punya 12 jambu air dan Kira punya 18. Kalau dipasangkan satu-satu, jambu Kira yang tidak berpasangan adalah selisihnya. Selisih dicari dengan mengurangkan bilangan besar dengan bilangan kecil: 18 dikurangi 12.

_Alur:_ Cerita pengurangan → Hitung mundur

**2. Cara 1: Menghitung Mundur** 🐸  
Berdirilah di bilangan pertama, lalu melompat ke belakang sebanyak bilangan kedua. Dari 18 melompat mundur 12 kali sampai ke 6. Tempat kita berhenti adalah hasilnya. Menghitung mundur enak bila bilangan yang dikurangkan kecil. Kalau bilangannya besar, lompatan jadi banyak dan mudah salah hitung.

_Alur:_ Hitung mundur → Bersusun

**3. Cara 2: Pengurangan Bersusun** 📋  
Tulis bilangan yang besar di atas dan bilangan yang kecil di bawahnya. Satuan lurus dengan satuan. Kurangkan satuan dulu, lalu puluhan. Pada 18 dikurangi 12, satuan 8 dikurangi 2 sama dengan 6, dan puluhan 1 dikurangi 1 sama dengan 0. Hasilnya 6.

_Alur:_ Bersusun → Pasangan bilangan

**4. Cara 3: Pasangan Bilangan** 🌿  
Pisahkan kedua bilangan menjadi puluhan dan satuan. 18 adalah 10 dan 8. 12 adalah 10 dan 2. Kurangkan puluhan dengan puluhan: 10 dikurangi 10 sama dengan 0. Kurangkan satuan dengan satuan: 8 dikurangi 2 sama dengan 6. Gabungkan hasilnya: 0 ditambah 6 sama dengan 6.

_Alur:_ Pasangan bilangan → Urai puluhan

**5. Urai Satu Puluhan** 🧱  
Kalau satuan di atas lebih kecil daripada satuan di bawah, satuan tidak cukup. Kita urai 1 puluhan menjadi 10 satuan. Pada 12 dikurangi 8, satuan 2 ditambah 10 menjadi 12 satuan. Lalu 12 satuan dikurangi 8 satuan sama dengan 4 satuan. Puluhan tinggal 0, jadi hasilnya 4. Mengurai ini sering disebut meminjam.

_Alur:_ Urai puluhan → Kapan perlu urai

**6. Kapan Perlu Urai?** 🤔  
Bandingkan satuan di atas dengan satuan di bawah. Kalau satuan atas lebih besar atau sama, kurangkan langsung. Kalau satuan atas lebih kecil, urai satu puluhan dulu. Contohnya 20 dikurangi 6. Satuan 0 lebih kecil dari 6, jadi 1 puluhan diurai menjadi 10 satuan, dan 10 dikurangi 6 sama dengan 4, ditambah 1 puluhan yang tersisa menjadi 14.

_Alur:_ Kapan perlu urai → Periksa dengan tambah

**7. Periksa dengan Penjumlahan** 🔗  
Penjumlahan dan pengurangan berkeluarga. Kalau 18 dikurangi 12 sama dengan 6, maka 6 ditambah 12 harus sama dengan 18. Pemeriksaan ini menangkap kesalahan hitung. Keluarga bilangan 6, 12, dan 18 punya empat kalimat: 6 ditambah 12, 12 ditambah 6, 18 dikurangi 6, dan 18 dikurangi 12.

_Alur:_ Periksa dengan tambah → Tambah sampai pas

**8. Tambah Sampai Pas** 🛒  
Ada cara pengurangan lain yang dipakai pedagang saat memberi kembalian, yaitu menghitung maju dari bilangan kecil sampai bilangan besar. Untuk 18 dikurangi 12, mulai dari 12 lalu tambah satu demi satu sampai 18. Tambahannya 6, jadi selisihnya 6. Pilih cara yang paling mudah untukmu, dan jelaskan alasannya.

_Alur:_ Tambah sampai pas → Pengurangan siap dipakai

## 6. Tahap 3: Infografis

**Panel 1. Selisih Jambu Air Tika dan Kira** 🍎 (6, Enam)

> Tika punya dua belas jambu air. Kira punya delapan belas jambu air. Kita pasangkan jambunya satu-satu. Jambu Kira yang tidak berpasangan ada enam. Jadi selisih jambu air Kira dan Tika adalah enam. Selisih dicari dengan pengurangan: delapan belas dikurangi dua belas.

**Panel 2. Cara 1: Menghitung Mundur** 🐸 (6, Enam)

> Dari bilangan delapan belas, kita melompat ke belakang sebanyak dua belas lompatan: tujuh belas, enam belas, lima belas, dan seterusnya sampai enam. Kita berhenti di enam. Jadi delapan belas dikurangi dua belas sama dengan enam.

**Panel 3. Cara 2: Pengurangan Bersusun** 📋 (6, Enam)

> Tuliskan delapan belas di atas, dua belas di bawahnya. Satuan lurus dengan satuan. Kurangkan satuan: delapan dikurangi dua sama dengan enam. Kurangkan puluhan: satu dikurangi satu sama dengan nol. Hasilnya enam.

**Panel 4. Cara 3: Pasangan Bilangan** 🌿 (6, Enam)

> Delapan belas adalah sepuluh dan delapan. Dua belas adalah sepuluh dan dua. Sepuluh dikurangi sepuluh sama dengan nol. Delapan dikurangi dua sama dengan enam. Jadi delapan belas dikurangi dua belas sama dengan enam.

**Panel 5. Tiga Cara, Satu Hasil** ⚖️ (6, Enam)

> Menghitung mundur dari delapan belas sebanyak dua belas kali sampai enam. Bersusun: delapan dikurangi dua sama dengan enam, satu dikurangi satu sama dengan nol. Pasangan bilangan: sepuluh dikurangi sepuluh sama dengan nol, delapan dikurangi dua sama dengan enam. Ketiganya sama, yaitu enam.

**Panel 6. Urai Satu Puluhan: 12 − 8** 🧱 (4, Empat)

> Tika punya dua belas jambu air dan memberikan delapan kepada Lili. Satuan dua dikurangi delapan tidak cukup. Kita urai satu puluhan menjadi sepuluh satuan. Sekarang ada dua belas satuan. Dua belas satuan dikurangi delapan satuan sama dengan empat satuan. Puluhan tinggal nol. Sisanya empat.

**Panel 7. Kapan Harus Diurai?** 🤔 (14, Empat belas)

> Lihat satuan di atas dan satuan di bawah. Kalau satuan atas lebih besar atau sama, langsung kurangkan, seperti delapan belas dikurangi dua belas. Kalau satuan atas lebih kecil, urai dulu satu puluhan, seperti dua belas dikurangi delapan. Dua puluh dikurangi enam juga perlu diurai, hasilnya empat belas.

**Panel 8. Keluarga Bilangan 6, 12, 18** 🔗 (18, Delapan belas)

> Enam, dua belas, dan delapan belas berkeluarga. Enam ditambah dua belas sama dengan delapan belas. Dua belas ditambah enam sama dengan delapan belas. Delapan belas dikurangi enam sama dengan dua belas. Delapan belas dikurangi dua belas sama dengan enam. Gunakan penjumlahan untuk memeriksa pengurangan.

**Panel 9. Tambah Sampai Pas** 🛒 (6, Enam)

> Pedagang memberi kembalian dengan menghitung maju. Untuk delapan belas dikurangi dua belas, mulai dari dua belas lalu tambah satu demi satu sampai delapan belas. Ada enam tambahan. Jadi selisihnya enam. Cara ini membantu bila kedua bilangan berdekatan.

**Panel 10. Pilih Cara yang Paling Mudah** 🧭 (3, Tiga)

> Pilih cara yang paling mudah untukmu. Hitung mundur bila bilangan yang dikurangkan kecil. Bersusun bila kamu ingin rapi. Pasangan bilangan bila kedua bilangan mudah dipisah. Tambah sampai pas bila kedua bilangan berdekatan. Lalu periksa dengan penjumlahan.

## 7. Tahap 4, 5, dan 6: sepuluh permainan

| No | Tahap | Permainan | Jenis | Ronde |
|---|---|---|---|---|
| 1 | Concrete | Beri Jambu ke Lili | `drag-take-away` | 15 − 4; 19 − 8; 18 − 6 |
| 2 | Concrete | Pasangkan Selisih | `pair-to-find-difference` | 18 dan 12; 15 dan 9; 17 dan 13 |
| 3 | Concrete | Urai Satu Puluhan | `regroup-borrow` | 12 − 8 (urai); 13 − 5 (urai); 16 − 4 (tanpa urai) |
| 4 | Concrete | Tambah Sampai Pas | `count-up-to-target` | 12 ke 18; 9 ke 15; 14 ke 20 |
| 5 | Picture | Loncat Mundur di Jalur Bilangan | `hop-back-on-number-strip` | 12 − 6; 15 − 4; 20 − 6 |
| 6 | Picture | Susun Kurang | `vertical-subtraction-table` | 14 − 3; 13 − 5 (urai); 13 − 7 (urai) |
| 7 | Picture | Bagan Pasangan Kurang | `fill-number-bond-minus` | 19 − 15; 17 − 12; 16 − 12 |
| 8 | Abstract | Perlu Urai atau Tidak? | `sort-borrow-or-not` | ronde 1: 18 − 12, 15 − 4, 12 − 8, 13 − 5, 19 − 8; ronde 2: 20 − 6, 17 − 5, 16 − 9, 14 − 3, 11 − 7 |
| 9 | Abstract | Keluarga Bilangan | `fact-family-fill` | 6, 12, 18; 4, 9, 13; 8, 11, 19 |
| 10 | Abstract | Detektif Pengurangan | `clue-detective-minus` | ronde 1: jawaban 17; ronde 2: jawaban 18; ronde 3: jawaban 6; ronde 4: jawaban 11 |

### Permainan 1. Beri Jambu ke Lili (Concrete)

- **Rujukan buku.** hlm. 49–50 (Tika memberikan jambu air kepada Lili); hlm. 52 (Ayo Berlatih nomor 1: 15 − 4, 19 − 8)
- **Tujuan.** Mengurangkan dengan mengambil benda satu per satu sambil menghitung mundur.
- **Cara main.** Tiga ronde (15 beri 4, 19 beri 8, dan 18 beri 6). Siswa menyeret atau mengetuk jambu dari keranjang Tika ke piring Lili satu per satu. Tiap jambu pergi, Suara Guru menyebut sisanya. Setelah cukup, siswa memilih sisa jambu. Terakhir ucapkan sisanya.
- **Ronde.** 15 − 4; 19 − 8; 18 − 6
- **Panduan suara.** Seret jambu ke piring Lili, hitung mundur, lalu pilih sisanya.

### Permainan 2. Pasangkan Selisih (Concrete)

- **Rujukan buku.** hlm. 48 (Tika 12 jambu air, Kira 18 jambu air: berapa selisihnya?)
- **Tujuan.** Mencari selisih dengan memasangkan dua kelompok benda satu-satu dan menghitung yang tidak berpasangan.
- **Cara main.** Tiga ronde (18 dan 12, 15 dan 9, 17 dan 13). Siswa mengetuk jambu kelompok kecil agar berpasangan dengan jambu kelompok besar, atau menekan Pasangkan sepuluh bila kedua kelompok punya sepuluh. Jambu yang tidak berpasangan menyala. Lalu siswa memilih selisihnya.
- **Ronde.** 18 dan 12; 15 dan 9; 17 dan 13
- **Panduan suara.** Pasangkan jambu satu-satu, lalu hitung yang tidak berpasangan.

### Permainan 3. Urai Satu Puluhan (Concrete)

- **Rujukan buku.** hlm. 49–50 (Tika memberikan 8 jambu air; 2 dikurang 8 tidak cukup; urai 1 puluhan menjadi 10 satuan)
- **Tujuan.** Mengurai satu puluhan menjadi sepuluh satuan saat satuan tidak cukup untuk dikurangi.
- **Cara main.** Tiga ronde (12 − 8, 13 − 5, dan 16 − 4). Papan berisi batang puluhan dan kubus satuan. Siswa memberikan kubus kepada Lili satu per satu. Bila satuan tidak cukup, tombol Urai membuka satu batang menjadi sepuluh kubus. Lalu siswa memilih sisanya. Terakhir ucapkan sisanya.
- **Ronde.** 12 − 8 (urai); 13 − 5 (urai); 16 − 4 (tanpa urai)
- **Panduan suara.** Beri kubus ke Lili, urai satu puluhan bila satuan tidak cukup.

### Permainan 4. Tambah Sampai Pas (Concrete)

- **Rujukan buku.** hlm. 48 (selisih jambu Tika dan Kira), diperkaya metode menghitung maju untuk pengurangan
- **Tujuan.** Menemukan selisih dengan menambah benda dari bilangan kecil sampai tepat sama dengan bilangan besar.
- **Cara main.** Tiga ronde (12 ke 18, 9 ke 15, dan 14 ke 20). Keranjang kecil berisi jambu, keranjang besar menunjukkan bayangan target. Siswa menekan Tambah satu jambu sampai keranjang pas, lalu memilih berapa kali menambah. Banyak tambahan sama dengan selisih. Terakhir ucapkan selisihnya.
- **Ronde.** 12 ke 18; 9 ke 15; 14 ke 20
- **Panduan suara.** Tambah jambu satu per satu sampai keranjang pas.

### Permainan 5. Loncat Mundur di Jalur Bilangan (Picture)

- **Rujukan buku.** hlm. 48 dan 52 (Cara 1: menghitung mundur; Ayo Berlatih nomor 1: 12 − 6, 18 − 8, 15 − 4, 19 − 8, 20 − 6)
- **Tujuan.** Menghitung mundur di jalur bilangan dengan melompat ke belakang sebanyak bilangan yang dikurangkan.
- **Cara main.** Tiga ronde (12 − 6, 15 − 4, dan 20 − 6). Jalur bilangan 5 sampai 20. Siswa mengetuk kotak sebelumnya satu per satu sehingga busur lompatan tergambar, lalu menekan Berhenti. Banyak lompatan harus sama dengan bilangan yang dikurangkan. Terakhir ucapkan hasilnya.
- **Ronde.** 12 − 6; 15 − 4; 20 − 6
- **Panduan suara.** Ketuk kotak sebelumnya sebanyak bilangan pengurang, lalu berhenti.

### Permainan 6. Susun Kurang (Picture)

- **Rujukan buku.** hlm. 49–50 dan 52 (Cara 2: pengurangan bersusun; Ayo Berlatih nomor 2: 14 − 3, 13 − 5, 13 − 7, 16 − 2)
- **Tujuan.** Mengurangkan dengan cara bersusun pada tabel nilai tempat, termasuk mengurai satu puluhan.
- **Cara main.** Tiga ronde (14 − 3, 13 − 5, dan 13 − 7). Siswa meletakkan bilangan pengurang di kolom satuan, mengurai satu puluhan bila satuan tidak cukup, lalu mengurangkan satuan dan puluhan. Angka soal biru, angka jawaban hijau, catatan urai merah kecil.
- **Ronde.** 14 − 3; 13 − 5 (urai); 13 − 7 (urai)
- **Panduan suara.** Susun, urai bila perlu, lalu kurangkan satuan dan puluhan.

### Permainan 7. Bagan Pasangan Kurang (Picture)

- **Rujukan buku.** hlm. 51 dan 53 (Cara 3: pasangan bilangan; Ayo Berlatih nomor 3: 19 − 15, 17 − 12, 16 − 12)
- **Tujuan.** Mengurangkan dengan memisahkan kedua bilangan menjadi sepuluh dan satuannya.
- **Cara main.** Tiga ronde (19 − 15, 17 − 12, dan 16 − 12). Tiap ronde punya lima langkah: memisah bilangan pertama, memisah bilangan kedua, mengurangkan sepuluh dengan sepuluh, mengurangkan satuan dengan satuan, lalu menuliskan hasilnya.
- **Ronde.** 19 − 15; 17 − 12; 16 − 12
- **Panduan suara.** Pisahkan kedua bilangan, kurangkan sepuluh dan satuannya.

### Permainan 8. Perlu Urai atau Tidak? (Abstract)

- **Rujukan buku.** hlm. 49–50 (kapan satuan tidak cukup) dan hlm. 52–53 (Ayo Berlatih nomor 1 sampai 4)
- **Tujuan.** Menentukan kalimat pengurangan yang cukup dikurangkan langsung dan yang perlu mengurai satu puluhan.
- **Cara main.** Dua ronde, masing-masing lima kartu pengurangan (18 − 12, 15 − 4, 12 − 8, 13 − 5, 19 − 8; lalu 20 − 6, 17 − 5, 16 − 9, 14 − 3, 11 − 7). Siswa mengetuk kartu lalu kotak Langsung atau Urai dulu. Bandingkan satuan atas dengan satuan bawah.
- **Ronde.** ronde 1: 18 − 12, 15 − 4, 12 − 8, 13 − 5, 19 − 8; ronde 2: 20 − 6, 17 − 5, 16 − 9, 14 − 3, 11 − 7
- **Panduan suara.** Bandingkan satuan atas dan bawah, lalu tentukan perlu urai atau tidak.

### Permainan 9. Keluarga Bilangan (Abstract)

- **Rujukan buku.** hlm. 51 dan 53 (pengurangan dan penjumlahan berkaitan: 18 − 12 = 6), diperkaya keluarga fakta
- **Tujuan.** Menuliskan empat kalimat tambah dan kurang dari satu keluarga tiga bilangan.
- **Cara main.** Tiga ronde (6, 12, 18; 4, 9, 13; dan 8, 11, 19). Tiap ronde punya empat kalimat dengan satu bagian kosong. Siswa mengetuk bilangan keluarga yang tepat untuk mengisinya, lalu melihat segitiga keluarga lengkap.
- **Ronde.** 6, 12, 18; 4, 9, 13; 8, 11, 19
- **Panduan suara.** Isi bagian yang kosong dengan bilangan dari keluarga.

### Permainan 10. Detektif Pengurangan (Abstract)

- **Rujukan buku.** hlm. 48–53 (selisih dan sisa), diperkaya soal petunjuk bilangan misterius
- **Tujuan.** Menemukan bilangan dari dua petunjuk yang memakai kata dikurangi, selisih, dan sisa.
- **Cara main.** Empat ronde, tiap ronde dua petunjuk. Siswa memilih bilangan yang cocok dengan semua petunjuk. Petunjuk dibacakan Suara Guru. Terakhir ucapkan bilangan itu.
- **Ronde.** ronde 1: jawaban 17; ronde 2: jawaban 18; ronde 3: jawaban 6; ronde 4: jawaban 11
- **Panduan suara.** Baca petunjuk, lalu pilih bilangannya.

## 8. Poin Penting dan Catatanku

- 🔗 **Selisih**: pasangkan satu-satu, yang tersisa = selisih. _Suara:_ Selisih adalah beda banyaknya dua kelompok. Pasangkan benda satu-satu. Benda yang tidak berpasangan menunjukkan selisihnya. Delapan belas dan dua belas berselisih enam.
- 🐸 **Hitung mundur**: 18 − 12: 17, 16, 15 ... 6. _Suara:_ Menghitung mundur. Mulai dari bilangan pertama, lalu melompat ke belakang sebanyak bilangan kedua. Delapan belas mundur dua belas kali sampai enam.
- 📋 **Bersusun**: satuan dulu, lalu puluhan. _Suara:_ Pengurangan bersusun. Bilangan besar di atas. Kurangkan satuan dulu, lalu puluhan. Delapan dikurangi dua sama dengan enam. Satu dikurangi satu sama dengan nol. Hasilnya enam.
- 🧱 **Urai satu puluhan**: 1 puluhan = 10 satuan. _Suara:_ Kalau satuan tidak cukup, urai satu puluhan menjadi sepuluh satuan. Dua belas dikurangi delapan: dua ditambah sepuluh sama dengan dua belas satuan, dikurangi delapan sama dengan empat.
- 🔗 **Periksa dengan tambah**: 4 + 8 = 12, cocok. _Suara:_ Periksa hasil pengurangan dengan penjumlahan. Kalau dua belas dikurangi delapan sama dengan empat, maka empat ditambah delapan harus sama dengan dua belas.

**Suara Poin Penting.** Ingat selalu! Selisih dicari dengan memasangkan satu-satu atau mengurangkan bilangan besar dengan bilangan kecil. Pengurangan bisa dilakukan dengan menghitung mundur, bersusun, atau pasangan bilangan. Kalau satuan tidak cukup, urai satu puluhan menjadi sepuluh satuan. Periksa hasilnya dengan penjumlahan.

**Cara menyebutkan.** Selisih jambu air Kira dan Tika adalah 6 enam. _Suara:_ Cara menyebutkan hasil pengurangan. Selisih banyak jambu air Kira dan Tika adalah enam.

**Ayo Mencoba di rumah.** Ayo Mencoba di rumah: siapkan dua kelompok benda, misalnya sendok dan garpu. Cari selisihnya dengan memasangkan satu-satu, lalu tuliskan pengurangannya. Periksa dengan penjumlahan, dan ceritakan hasilnya kepada keluargamu.

**Refleksi (Catatanku).**

- Aku bisa melakukan pengurangan dengan menghitung mundur.
- Aku bisa melakukan pengurangan bersusun, termasuk mengurai satu puluhan.
- Aku bisa mengurangkan dengan pasangan bilangan.
- Aku belajar dengan tertib.

## 9. Metode dari luar buku yang diadopsi

- **Pemasangan satu-satu untuk selisih** (model perbandingan pengurangan) dari Singapore Math.
- **Counting up / tambah sampai pas**, cara pedagang memberi kembalian: hitung maju dari bilangan kecil sampai bilangan besar. Dasar permainan Tambah Sampai Pas.
- **Keluarga fakta (fact family)**: dua kalimat tambah dan dua kalimat kurang dari tiga bilangan yang sama, untuk memeriksa pengurangan dengan penjumlahan.
- **Regrouping (mengurai) dengan balok Dienes** sebagai pengganti kata meminjam yang sering membingungkan.
- **Jalur bilangan kosong (empty number line)** dari pendidikan matematika realistik Belanda.

## 10. Batas yang diketahui

- Soal Latihan (30 poin), soal Ujian (70 poin), dan Simulasi belum dibuat. Pemilik akan menugaskannya terpisah. Sampai saat itu tab Latihan dan Ujian menampilkan kartu "sedang disiapkan".
- Suara dan ketukan video diuji dengan suara perangkat di Chrome desktop berukuran ponsel. Pada sebagian Android, tombol Jeda tidak menghentikan suara di tengah kalimat (Web Speech `pause()` tidak didukung merata).
- Laju 0,70 dan nada 1 sama untuk Bu Sari dan Pak Budi. Beda guru hanya pada suara yang dipilih perangkat (wanita atau pria). Perangkat yang hanya punya satu suara Indonesia akan membuat kedua guru terdengar serupa.

