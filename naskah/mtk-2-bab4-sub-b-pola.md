# Naskah Matematika Kelas 2 SD, Bab 4: Posisi Benda dan Pola di Sekitar Kita, Sub-Bab B: Pola

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k2b4.ts` dan `src/components/modul/data-k2b4.ts`, oleh `scripts/buat-naskah-md-k2b4.mjs`. Isi mengikuti Buku Siswa Matematika Kelas II (Kemendikbudristek, Kurikulum Merdeka, Bab 4 hlm. 101–124) dan diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban tidak ada di berkas ini.

## 1. Identitas modul

| Butir | Isi |
|---|---|
| Modul | `mtk-2-bab4`, sub-bab B |
| Berkas data | `src/data/kelas2-bab4.json` (dibangkitkan `src/content-master/buat-k2-bab4.mjs`, lalu `npm run sync:keys`) |
| Kode bab di server | `k2-mat-bab4` (belum ada seed server karena soal belum ada) |
| Fase dan kelas | `FASE_A`, kelas 2 SD |
| Elemen | 🌈 Fase A • Elemen Geometri dan Aljabar: Posisi Benda dan Pola (Kelas 2 SD/MI) |
| Poin Kualifikasi per bab | Latihan 30 dan Ujian 70 (terbit setelah soalnya ada). Praktikum 50 terbit sekali per blok empat bab. |
| Suara Guru | Murni Web Speech API bawaan perangkat (`id-ID`), **laju 0,70 dan nada 1**. Tanpa berkas audio statis, tanpa ElevenLabs. |
| Panggilan API saat siswa belajar | Nol. Seluruh tahap Materi berjalan di klien. |
| Tab Simulasi, Latihan, Ujian | Belum diisi. Latihan dan Ujian menampilkan kartu "sedang disiapkan". Tab Simulasi tidak tampil. |
| Jumlah sub-bab | Dua (A dan B), sesuai daftar isi buku Bab 4. |

## 2. Capaian dan tujuan pembelajaran

**Capaian Pembelajaran (CP).** Siswa mengenali, meniru, dan melanjutkan pola sederhana berupa bentuk, warna, gerakan, dan suara, membuat pola sendiri, serta menyampaikan pendapat dengan percaya diri.

**Rujukan.** Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 4: Posisi Benda dan Pola di Sekitar Kita, Sub-Bab B hlm. 114–124).

**Sasaran.** Siswa mengenali pola sebagai hal yang berulang dan teratur, menemukan satuan pola, membedakan pola bentuk, warna, gerakan, dan suara, membedakan barisan yang berpola dari yang bukan pola, melanjutkan pola yang sudah ada, mengisi bagian yang hilang, serta membuat pola sendiri.

**Suara Silabus.** Kita belajar pola. Pola adalah hal yang berulang dan teratur. Kita menemukan pola pada barisan enam sekawan, pada taplak meja, kaus, gerakan, dan suara tepuk tangan. Kita juga belajar melanjutkan pola, mengisi bagian yang hilang, dan membuat pola sendiri. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.

## 3. Peta enam tahap SMICPA dan bobotnya

| Tahap | Isi | Banyak butir |
|---|---|---|
| S. Story | Video animasi HTML/SVG satu layar seperti Kelas 2 Bab 1: tiga cerita disusun berurutan dalam satu pemutar, mulai saat Mulai diketuk (tidak ada putar otomatis) | 3 cerita, 9 adegan, 30 ketukan |
| M. Mind-Map | Peta pikiran "Taman Ide": matahari berwajah Igil di tengah, kartu bernomor di kiri dan kanan dengan cabang berwarna. Kartu hanya memuat ikon dan judul, uraiannya dibacakan Suara Guru saat kartu diketuk | 8 langkah |
| I. Infografis | Poster rangkuman, suara di tiap panel | 10 panel |
| C. Concrete | Benda nyata yang diseret, ditemukan, dirangkai, disusun, dan ditirukan | 4 permainan |
| P. Picture | Diagram polos: peta kotak, lingkaran dan persegi, bangun polos, dan barisan bangun | 3 permainan |
| A. Abstract | Kata, huruf, dan petunjuk tertulis: kalimat, tebakan, kode huruf, peta konsep | 3 permainan |

Bobot mengikuti isi buku. Aturan Concrete dan Picture berlaku: benda berwarna hanya di Concrete, Picture hanya diagram tanpa gambar benda (bangun polos, titik, dan lingkaran polos).

## 4. Tahap 1: Story (video animasi, menggantikan slide)

Tampilannya satu layar, sama dengan Kelas 2 Bab 1. Tidak ada adegan yang berjalan sendiri. Siswa mengetuk **▶ Mulai**, lalu ketiga cerita berjalan berurutan sebagai satu video. Nomor adegan bisa diketuk untuk melompat. Setiap kalimat adalah satu ketukan: dibacakan Suara Guru perangkat, dan gambar berubah mengikuti kalimat yang sedang dibacakan. Ada tombol Jeda, Ulang, dan Suara hidup atau mati.

### Cerita 1: Enam Sekawan Memanen (Hal yang berulang dan teratur)

**Adegan 1. Berbaris di sawah** (`K2B4B-V1-1`)

1. Perhatikan keenam sekawan yang sedang memanen padi.  
   _Papan layar:_ Enam sekawan
2. Mereka berbaris dengan urutan Upe, Lili, Halim, Kira, Malosi, dan Tika.  
   _Papan layar:_ Urutan barisan
3. Mereka berbaris secara beraturan.  
   _Papan layar:_ Berbaris beraturan

**Adegan 2. Laki-laki dan perempuan** (`K2B4B-V1-2`)

1. Upe laki-laki, Lili perempuan, dan Halim laki-laki.  
   _Papan layar:_ Upe, Lili, Halim
2. Kira perempuan, Malosi laki-laki, dan Tika perempuan.  
   _Papan layar:_ Kira, Malosi, Tika
3. Polanya adalah laki-laki, perempuan, laki-laki, perempuan, laki-laki, perempuan.  
   _Papan layar:_ Laki-laki, perempuan, ...
4. Hal yang berulang dan teratur dinamakan pola.  
   _Papan layar:_ Berulang dan teratur

**Adegan 3. Mencari pola** (`K2B4B-V1-3`)

1. Dapatkah kalian menemukan hal yang berulang pada gambar?  
   _Papan layar:_ Cari yang berulang
2. Pada barisan ini ada pola jenis kelamin, dan ada juga pola gerakan.  
   _Papan layar:_ Jenis kelamin dan gerakan
3. Pola apa lagi yang dapat kalian temukan pada gambar?  
   _Papan layar:_ Pola apa lagi?

### Cerita 2: Pola Bentuk dan Pola Warna (Pola di taplak meja dan kaus)

**Adegan 4. Taplak meja** (`K2B4B-V2-1`)

1. Salah satu pola yang sering dijumpai adalah pola bentuk.  
   _Papan layar:_ Pola bentuk
2. Pada taplak meja 1, polanya bunga, segi empat, bunga, segi empat, dan seterusnya.  
   _Papan layar:_ Taplak 1: bunga, segi empat
3. Pada taplak meja 2, polanya hati, hati, segitiga, segitiga, hati, hati.  
   _Papan layar:_ Taplak 2: hati, hati, segitiga

**Adegan 5. Kaus dan gelas** (`K2B4B-V2-2`)

1. Selain pola bentuk, kita juga mengenal pola warna.  
   _Papan layar:_ Pola warna
2. Pada kaus, polanya merah, biru, merah, biru, dan seterusnya.  
   _Papan layar:_ Kaus: merah, biru
3. Warna ikan pada gelas juga membentuk pola warna.  
   _Papan layar:_ Warna ikan di gelas

**Adegan 6. Pola atau bukan?** (`K2B4B-V2-3`)

1. Tidak semua barisan benda adalah pola.  
   _Papan layar:_ Tidak semua pola
2. Pola harus berulang dan teratur.  
   _Papan layar:_ Berulang dan teratur
3. Lingkaran, segitiga, lingkaran, segitiga, lingkaran, segitiga adalah pola.  
   _Papan layar:_ Lingkaran, segitiga: pola
4. Lingkaran, segitiga, segitiga, lingkaran, segitiga, lingkaran bukan pola, karena kelompoknya tidak berulang dengan teratur.  
   _Papan layar:_ Acak: bukan pola

### Cerita 3: Pola Gerakan dan Pola Suara (Bergerak dan bertepuk tangan)

**Adegan 7. Gerakan berpola** (`K2B4B-V3-1`)

1. Pada gambar, anak-anak bergerak membungkuk, berdiri, membungkuk, berdiri, dan seterusnya.  
   _Papan layar:_ Membungkuk, berdiri
2. Itu adalah pola gerakan.  
   _Papan layar:_ Pola gerakan
3. Gerakan lain juga dapat membentuk pola, misalnya tangan naik dan tangan turun.  
   _Papan layar:_ Tangan naik, tangan turun

**Adegan 8. Tepuk tangan** (`K2B4B-V3-2`)

1. Ayo bertepuk tangan: tepuk satu kali, tepuk dua kali, tepuk tiga kali, dan tepuk empat kali.  
   _Papan layar:_ Tepuk 1, 2, 3, 4
2. Lakukan secara berulang-ulang.  
   _Papan layar:_ Ulangi terus
3. Suara yang dihasilkan dari menepuk tangan juga membentuk pola.  
   _Papan layar:_ Pola suara

**Adegan 9. Pola di sekitar kita** (`K2B4B-V3-3`)

1. Amati benda-benda di sekitar kita dan temukan pola warna dan pola bentuk.  
   _Papan layar:_ Amati sekitar
2. Tulis hasilnya pada tabel, lalu ceritakan kepada temanmu.  
   _Papan layar:_ Tulis di tabel
3. Dalam kelompok, buatlah pola gerakan dan pola suara.  
   _Papan layar:_ Buat pola kelompok
4. Presentasikan hasilnya di depan kelas.  
   _Papan layar:_ Presentasikan

## 5. Tahap 2: Mind-Map (peta pikiran)

Tampilan "Taman Ide": matahari berwajah Igil di tengah, kartu bernomor di kiri dan kanan dihubungkan cabang berwarna. Setiap kartu hanya memuat nomor, ikon, dan judul langkah. Uraian di bawah dibacakan Suara Guru saat kartu diketuk dan tidak tampil di layar.

**1. Hal yang Berulang dan Teratur** 🔄  
Keenam sekawan berbaris dengan urutan laki-laki, perempuan, laki-laki, perempuan, laki-laki, perempuan. Urutan itu berulang dan teratur. Hal yang berulang dan teratur dinamakan pola. Pola ada di sekitar kita, di sawah, di rumah, dan di sekolah.

_Alur:_ Hal yang berulang → Satuan pola

**2. Satuan Pola** 🧩  
Setiap pola punya kelompok terkecil yang berulang, dinamakan satuan pola. Pada merah, biru, merah, biru, satuannya adalah merah, biru. Pada A, A, B, A, A, B, satuannya adalah A, A, B. Kalau kita tahu satuannya, kita dapat melanjutkan pola sejauh yang kita mau.

_Alur:_ Satuan pola → Pola bentuk

**3. Pola Bentuk** 🔷  
Pola bentuk disusun dari bentuk yang berulang. Taplak meja 1 berpola bunga, segi empat, bunga, segi empat. Taplak meja 2 berpola hati, hati, segitiga, segitiga, hati, hati. Satuannya bisa terdiri dari dua bentuk, atau empat bentuk.

_Alur:_ Pola bentuk → Pola warna

**4. Pola Warna** 🎨  
Pola warna disusun dari warna yang berulang. Kaus berpola merah, biru, merah, biru. Untaian manik dapat berpola jingga, jingga, biru, biru. Bentuk benda sama, tetapi warnanya berganti secara teratur.

_Alur:_ Pola warna → Pola gerakan

**5. Pola Gerakan** 🤸  
Gerakan yang berulang membentuk pola gerakan. Membungkuk, berdiri, membungkuk, berdiri adalah pola gerakan. Kita juga dapat membuat pola dengan tangan naik, tangan turun, atau berputar. Cobalah bersama teman: satu menggerakkan, yang lain melanjutkan.

_Alur:_ Pola gerakan → Pola suara

**6. Pola Suara** 👏  
Suara yang berulang membentuk pola suara. Tepuk satu kali, dua kali, tiga kali, empat kali, lalu ulangi. Kita juga dapat membuat pola dengan tepuk keras dan tepuk pelan, atau dengan jeda diam. Pola suara dapat didengar dan dirasakan, bukan hanya dilihat.

_Alur:_ Pola suara → Melanjutkan pola

**7. Melanjutkan Pola** ➡️  
Untuk melanjutkan pola, cari dulu satuan polanya: kelompok yang muncul lagi dari awal. Lalu lanjutkan dengan urutan yang sama. Pada hati, kuning, hati, kuning, hati, yang berikutnya kuning. Periksa kembali dengan membaca seluruh barisan dari awal.

_Alur:_ Melanjutkan pola → Membuat pola

**8. Membuat Pola dan Memeriksa** ✨  
Kita dapat membuat pola sendiri dengan memilih satuan, lalu mengulangnya. Pola yang baik punya paling sedikit dua unsur berbeda dan berulang teratur. Barisan yang semuanya sama, atau yang kelompoknya selalu berganti, bukan pola. Periksa polamu dengan bertanya: apakah kelompok ini berulang?

_Alur:_ Membuat pola → Siap menemukan pola

## 6. Tahap 3: Infografis

**Panel 1. Apa Itu Pola?** 🔄 (2, Dua)

> Pola adalah hal yang berulang dan teratur. Dua kata kunci pola adalah berulang dan teratur.

**Panel 2. Satuan Pola** 🧩 (2, Dua)

> Satuan pola adalah kelompok terkecil yang berulang. Pada merah, biru, merah, biru, satuannya merah dan biru.

**Panel 3. Pola Bentuk** 🔷 (2, Dua)

> Taplak meja 1 berpola bunga, segi empat. Taplak meja 2 berpola hati, hati, segitiga, segitiga. Itu adalah pola bentuk.

**Panel 4. Pola Warna** 🎨 (2, Dua)

> Kaus berpola merah, biru, merah, biru. Warna ikan pada gelas juga membentuk pola warna.

**Panel 5. Pola Gerakan** 🤸 (2, Dua)

> Membungkuk, berdiri, membungkuk, berdiri adalah pola gerakan. Tangan naik dan tangan turun juga dapat membentuk pola.

**Panel 6. Pola Suara** 👏 (4, Empat)

> Tepuk satu kali, dua kali, tiga kali, dan empat kali, lalu diulang. Suara yang berulang membentuk pola suara.

**Panel 7. Kode Huruf** 🔤 (3, Tiga)

> Pola dapat ditulis dengan huruf. Merah, biru, merah, biru ditulis A, B, A, B. Hati, hati, segitiga ditulis A, A, B.

**Panel 8. Pola atau Bukan?** ❓ (2, Dua)

> Barisan yang kelompoknya berulang teratur adalah pola. Barisan yang semuanya sama, atau yang kelompoknya tidak beraturan, bukan pola.

**Panel 9. Melanjutkan Pola** ➡️ (3, Tiga)

> Untuk melanjutkan pola, cari satuan polanya, lanjutkan dengan urutan yang sama, lalu periksa dari awal. Setelah A, A, B, A, A, B, A, A, yang berikutnya B.

**Panel 10. Pola di Sekitarku** 🏡 (4, Empat)

> Pola ada di sekitar kita: pola warna pada kaus, pola bentuk pada taplak, pola gerakan pada senam, dan pola suara pada tepuk tangan.

## 7. Tahap 4, 5, dan 6: sepuluh permainan

| No | Tahap | Permainan | Jenis | Ronde |
|---|---|---|---|---|
| 1 | Concrete | Rangkai Manik-Manik | `continue-bead-pattern` | merah-biru; merah-merah-biru; kuning-ungu-hijau; jingga-jingga-biru-biru |
| 2 | Concrete | Atur Barisan Sahabat | `arrange-friends-pattern` | jenis kelamin: laki-laki, perempuan, laki-laki, ...; jenis kelamin: perempuan, laki-laki, perempuan, ...; warna topi: merah, merah, biru, ... |
| 3 | Concrete | Gerakan Berpola | `continue-movement-pattern` | membungkuk-berdiri; berdiri-tangan naik; berdiri-tangan naik-membungkuk; tangan naik-tangan naik-berdiri |
| 4 | Concrete | Tepuk Berpola | `continue-clap-pattern` | tepuk keras-tepuk pelan; tepuk keras-tepuk pelan-tepuk pelan; tepuk keras-tepuk keras-diam; tepuk pelan-tepuk keras-diam-tepuk keras |
| 5 | Picture | Pola atau Bukan? | `is-it-a-pattern` | ronde 1: 2 pola dan 2 bukan pola; ronde 2: 2 pola dan 2 bukan pola |
| 6 | Picture | Lanjutkan Pola | `continue-shape-pattern` | lingkaran-bentuk hati; bintang-persegi-persegi; segitiga-segitiga-belah ketupat; bentuk hati-bentuk hati-segitiga-segitiga |
| 7 | Picture | Warnai Pola | `color-to-make-pattern` | jingga-hijau-hijau; merah-biru; biru-biru-jingga; bebas: buat pola sendiri |
| 8 | Abstract | Isi Kotak Pola | `fill-pattern-blanks` | A B; A A B; merah biru kuning; kecil kecil besar besar |
| 9 | Abstract | Cari Satuan Pola | `find-repeating-unit` | A A B; A B B; A B C; A A B B |
| 10 | Abstract | Peta Konsep Pola | `concept-map-fill` | Pola; Satuan pola |

### Permainan 1. Rangkai Manik-Manik (Concrete)

- **Rujukan buku.** hlm. 116 (pola warna: merah, biru, merah, biru) dan hlm. 114 (hal yang berulang dan teratur)
- **Tujuan.** Melanjutkan untaian manik berpola warna dengan memilih warna manik berikutnya.
- **Cara main.** Empat ronde (dua warna, dua warna berselang dua, tiga warna, dua kelompok dua warna). Untaian menampilkan manik berpola, diikuti tiga atau empat tempat kosong. Siswa mengetuk warna manik yang tepat untuk tempat kosong berikutnya. Warna yang salah memberi petunjuk tentang satuan pola.
- **Ronde.** merah-biru; merah-merah-biru; kuning-ungu-hijau; jingga-jingga-biru-biru
- **Panduan suara.** Pilih warna manik berikutnya.

### Permainan 2. Atur Barisan Sahabat (Concrete)

- **Rujukan buku.** hlm. 114 (enam sekawan berbaris: laki-laki, perempuan, laki-laki, perempuan, laki-laki, perempuan)
- **Tujuan.** Menyusun enam sahabat dalam satu barisan sehingga sifat mereka membentuk pola yang diminta.
- **Cara main.** Tiga ronde (laki-laki dan perempuan bergantian, perempuan dan laki-laki bergantian, dua topi merah lalu satu topi biru). Siswa mengetuk seorang sahabat, lalu mengetuk tempat di barisan. Barisan diperiksa dari sifat tiap sahabat, dan semua susunan yang membentuk pola diterima.
- **Ronde.** jenis kelamin: laki-laki, perempuan, laki-laki, ...; jenis kelamin: perempuan, laki-laki, perempuan, ...; warna topi: merah, merah, biru, ...
- **Panduan suara.** Susun sahabat sehingga barisan membentuk pola.

### Permainan 3. Gerakan Berpola (Concrete)

- **Rujukan buku.** hlm. 116 (pola gerakan: membungkuk, berdiri, membungkuk, berdiri)
- **Tujuan.** Melanjutkan pola gerakan dengan memilih gerakan berikutnya.
- **Cara main.** Empat ronde. Barisan anak menampilkan gerakan membungkuk, berdiri, dan tangan naik yang berpola, lalu tiga tempat kosong. Siswa mengetuk gerakan berikutnya. Gerakan yang salah memberi petunjuk, dan siswa boleh menirukan gerakannya sendiri di tempat duduk.
- **Ronde.** membungkuk-berdiri; berdiri-tangan naik; berdiri-tangan naik-membungkuk; tangan naik-tangan naik-berdiri
- **Panduan suara.** Pilih gerakan berikutnya, lalu tirukan.

### Permainan 4. Tepuk Berpola (Concrete)

- **Rujukan buku.** hlm. 117 (pola suara: tepuk satu kali, dua kali, tiga kali, empat kali)
- **Tujuan.** Melanjutkan pola tepukan keras, pelan, dan diam, dan mendengarnya sebagai bunyi.
- **Cara main.** Empat ronde. Barisan tepukan menampilkan lingkaran besar untuk keras, lingkaran kecil untuk pelan, dan cincin putus-putus untuk diam. Tombol Dengarkan memutar pola dengan bunyi dari perangkat. Siswa mengetuk tepukan berikutnya, dan tiap ketukan berbunyi. Bunyi dibuat di perangkat tanpa berkas dan tanpa layanan luar.
- **Ronde.** tepuk keras-tepuk pelan; tepuk keras-tepuk pelan-tepuk pelan; tepuk keras-tepuk keras-diam; tepuk pelan-tepuk keras-diam-tepuk keras
- **Panduan suara.** Dengarkan pola, lalu pilih tepukan berikutnya.

### Permainan 5. Pola atau Bukan? (Picture)

- **Rujukan buku.** hlm. 118 (Ayo Berlatih nomor 1: beri tanda centang pada gambar yang menunjukkan pola)
- **Tujuan.** Menentukan apakah sebuah barisan bangun polos membentuk pola atau bukan.
- **Cara main.** Dua ronde, tiap ronde empat barisan bangun polos. Siswa menekan centang bila barisan itu pola, dan silang bila bukan. Barisan yang semuanya sama dan barisan yang kelompoknya tidak teratur bukan pola. Kunci dihitung oleh program dari satuan terpendek yang berulang.
- **Ronde.** ronde 1: 2 pola dan 2 bukan pola; ronde 2: 2 pola dan 2 bukan pola
- **Panduan suara.** Centang bila berulang teratur, silang bila bukan.

### Permainan 6. Lanjutkan Pola (Picture)

- **Rujukan buku.** hlm. 119 (Ayo Berlatih nomor 2: lanjutkan pola dengan melingkari gambar berikutnya)
- **Tujuan.** Melanjutkan pola bentuk polos dengan memilih dua bentuk berikutnya.
- **Cara main.** Empat ronde. Barisan bangun polos berpola ditampilkan, diikuti dua tempat kosong. Siswa mengetuk bentuk yang tepat untuk tiap tempat kosong dari tiga pilihan. Kunci dihitung dari satuan pola.
- **Ronde.** lingkaran-bentuk hati; bintang-persegi-persegi; segitiga-segitiga-belah ketupat; bentuk hati-bentuk hati-segitiga-segitiga
- **Panduan suara.** Pilih bentuk berikutnya.

### Permainan 7. Warnai Pola (Picture)

- **Rujukan buku.** hlm. 119–120 (Ayo Berlatih nomor 3 dan 4: warnai gambar untuk melanjutkan dan membentuk pola)
- **Tujuan.** Mewarnai bangun polos untuk melanjutkan pola warna, dan membuat pola warna sendiri.
- **Cara main.** Empat ronde. Pada tiga ronde pertama, beberapa bangun sudah berwarna dan siswa mewarnai sisanya agar pola berlanjut. Pada ronde terakhir siswa membuat pola sendiri dari delapan bangun, dan polanya diterima bila berulang teratur dengan paling sedikit dua warna. Ketuk bangun untuk berganti warna.
- **Ronde.** jingga-hijau-hijau; merah-biru; biru-biru-jingga; bebas: buat pola sendiri
- **Panduan suara.** Ketuk bangun untuk mengganti warnanya.

### Permainan 8. Isi Kotak Pola (Abstract)

- **Rujukan buku.** hlm. 121 (Evaluasi nomor 3 dan 5: lanjutkan pola dan isilah kotak untuk membentuk pola)
- **Tujuan.** Mengisi kotak kosong pada barisan huruf dan kata sehingga membentuk pola.
- **Cara main.** Empat ronde pada barisan huruf A B dan kata warna atau ukuran. Dua kotak kosong ada di tengah atau di ujung barisan. Siswa memilih kartu untuk tiap kotak kosong secara berurutan. Barisan yang sudah lengkap dibacakan Suara Guru.
- **Ronde.** A B; A A B; merah biru kuning; kecil kecil besar besar
- **Panduan suara.** Pilih kartu untuk kotak kosong.

### Permainan 9. Cari Satuan Pola (Abstract)

- **Rujukan buku.** hlm. 114 (hal yang berulang dan teratur dinamakan pola)
- **Tujuan.** Menemukan satuan pola, yaitu kelompok terkecil yang berulang, pada barisan huruf.
- **Cara main.** Empat ronde. Barisan huruf seperti A A B A A B A A B ditampilkan, lalu tiga pilihan kelompok. Siswa memilih kelompok yang dimulai dari awal dan menyusun seluruh barisan bila diulang. Kunci dihitung oleh program.
- **Ronde.** A A B; A B B; A B C; A A B B
- **Panduan suara.** Pilih kelompok yang berulang dari awal.

### Permainan 10. Peta Konsep Pola (Abstract)

- **Rujukan buku.** hlm. 102 (peta konsep: pola bentuk, pola warna, pola gerakan, pola suara)
- **Tujuan.** Melengkapi peta konsep pola dengan definisi, macam, contoh, dan pendapat sendiri.
- **Cara main.** Dua peta konsep, satu untuk pola dan satu untuk satuan pola. Tiap peta punya empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala.
- **Ronde.** Pola; Satuan pola
- **Panduan suara.** Pilih kartu yang tepat untuk kotak yang menyala.

## 8. Poin Penting dan Catatanku

- 🔄 **Pola**: hal yang berulang dan teratur. _Suara:_ Pola adalah hal yang berulang dan teratur. Barisan yang semuanya sama atau tidak teratur bukan pola.
- 🧩 **Satuan pola**: kelompok terkecil yang berulang. _Suara:_ Satuan pola adalah kelompok terkecil yang berulang. Dengan mengetahui satuan pola, kita dapat melanjutkan pola.
- 🎨 **Empat macam pola**: bentuk, warna, gerakan, suara. _Suara:_ Ada empat macam pola yang kita pelajari: pola bentuk, pola warna, pola gerakan, dan pola suara.
- ➡️ **Melanjutkan pola**: cari satuan, ulangi urutannya. _Suara:_ Untuk melanjutkan pola, cari satuannya, lanjutkan dengan urutan yang sama, lalu periksa dari awal.
- ✨ **Membuat pola**: pilih satuan, ulang teratur. _Suara:_ Untuk membuat pola, pilih satuan dengan paling sedikit dua unsur berbeda, lalu ulangi secara teratur.

**Suara Poin Penting.** Ingat selalu! Pola adalah hal yang berulang dan teratur. Kelompok terkecil yang berulang disebut satuan pola. Ada pola bentuk, pola warna, pola gerakan, dan pola suara. Untuk melanjutkan pola, cari satuannya dan ulangi urutan yang sama.

**Cara menyebutkan.** Hal yang berulang dan teratur adalah pola. _Suara:_ Cara menyebutkan. Hal yang berulang dan teratur adalah pola.

**Ayo Mencoba di rumah.** Ayo Mencoba di rumah: temukan tiga pola warna dan tiga pola bentuk di rumahmu, misalnya pada taplak, keramik, atau pakaian, lalu tulis di tabel Pola di Sekitarku. Buatlah satu pola gerakan dan satu pola suara bersama keluargamu, lalu mintalah mereka melanjutkannya.

**Refleksi (Catatanku).**

- Aku bisa mengidentifikasi pola bentuk, warna, gerakan, dan suara.
- Aku bisa melanjutkan pola bentuk, warna, gerakan, dan suara.
- Aku belajar dengan tertib.
- Aku menyampaikan pendapat dengan percaya diri.

## 9. Metode dari luar buku yang diadopsi

- **Satuan pola (unit of repeat)**: kelompok terkecil yang berulang. Mesin mencari satuan terpendek lalu memeriksa seluruh barisan. Dasar permainan Cari Satuan Pola dan semua permainan lanjutkan pola.
- **Kode huruf A B**: merah biru merah biru ditulis A B A B, dan hati hati segitiga ditulis A A B. Menulis pola sebagai huruf memisahkan struktur dari isi, jembatan menuju aljabar kelas tinggi.
- **Pola harus berulang dan teratur (dua unsur berbeda)**: barisan yang semuanya sama atau yang kelompoknya tidak berulang bukan pola. Dasar permainan Pola atau Bukan?
- **Pola dengan jeda (rhythm)**: tepuk keras, pelan, dan diam. Bunyi dibuat di perangkat tanpa berkas. Pola suara dapat didengar, bukan hanya dilihat.
- **Pola dengan tubuh (movement pattern)**: membungkuk, berdiri, tangan naik. Anak mengetuk gerakan berikutnya lalu menirukannya, menggabungkan berpikir dan bergerak.
- **Membuat pola sendiri (creating patterns)**: ronde bebas pada Warnai Pola menerima pola mana pun yang berulang teratur dengan paling sedikit dua warna.

## 10. Batas yang diketahui

- Soal Latihan (30 poin), soal Ujian (70 poin), dan Simulasi belum dibuat. Pemilik akan menugaskannya terpisah. Sampai saat itu tab Latihan dan Ujian menampilkan kartu "sedang disiapkan".
- Suara dan ketukan video diuji dengan suara perangkat di Chrome desktop berukuran ponsel. Pada sebagian Android, tombol Jeda tidak menghentikan suara di tengah kalimat (Web Speech `pause()` tidak didukung merata).
- Laju 0,70 dan nada 1 sama untuk Bu Sari dan Pak Budi. Beda guru hanya pada suara yang dipilih perangkat (wanita atau pria). Perangkat yang hanya punya satu suara Indonesia akan membuat kedua guru terdengar serupa.
- Ucapan memakai kata, bukan lambang, supaya suara perangkat tidak salah membaca.
- Satuan pola diperiksa dari bagian barisan yang tampil. Tiap ronde menampilkan paling sedikit dua satuan penuh supaya satuan tidak ambigu. Bunyi tepuk memakai WebAudio perangkat, dan pada perangkat yang membisukannya anak tetap dapat bermain lewat gambar.

