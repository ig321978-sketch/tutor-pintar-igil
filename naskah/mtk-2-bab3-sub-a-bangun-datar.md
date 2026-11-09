# Naskah Matematika Kelas 2 SD, Bab 3: Bentuk di Sekitar Kita, Sub-Bab A: Bangun Datar

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k2b3.ts` dan `src/components/modul/data-k2b3.ts`, oleh `scripts/buat-naskah-md-k2b3.mjs`. Isi mengikuti Buku Siswa Matematika Kelas II (Kemendikbudristek, Kurikulum Merdeka, Bab 3 hlm. 65–100) dan diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban tidak ada di berkas ini.

## 1. Identitas modul

| Butir | Isi |
|---|---|
| Modul | `mtk-2-bab3`, sub-bab A |
| Berkas data | `src/data/kelas2-bab3.json` (dibangkitkan `src/content-master/buat-k2-bab3.mjs`, lalu `npm run sync:keys`) |
| Kode bab di server | `k2-mat-bab3` (belum ada seed server karena soal belum ada) |
| Fase dan kelas | `FASE_A`, kelas 2 SD |
| Elemen | 🌈 Fase A • Elemen Geometri (Kelas 2 SD/MI) |
| Poin Kualifikasi per bab | Latihan 30 dan Ujian 70 (terbit setelah soalnya ada). Praktikum 50 terbit sekali per blok empat bab. |
| Suara Guru | Murni Web Speech API bawaan perangkat (`id-ID`), **laju 0,70 dan nada 1**. Tanpa berkas audio statis, tanpa ElevenLabs. |
| Panggilan API saat siswa belajar | Nol. Seluruh tahap Materi berjalan di klien. |
| Tab Simulasi, Latihan, Ujian | Belum diisi. Latihan dan Ujian menampilkan kartu "sedang disiapkan". Tab Simulasi tidak tampil. |

## 2. Capaian dan tujuan pembelajaran

**Capaian Pembelajaran (CP).** Siswa mengelompokkan bangun datar menjadi segi banyak dan bentuk lengkung, menamai segi banyak berdasarkan banyak sisinya (segitiga, segi empat, segi lima, segi enam), menemukan bentuk tersebut di lingkungan sekitar, serta membedakan lingkaran dari bentuk lengkung lainnya.

**Rujukan.** Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 3: Bentuk di Sekitar Kita, Sub-Bab A hlm. 65–80).

**Sasaran.** Siswa mengelompokkan bangun datar menjadi segi banyak (dibatasi sisi atau garis lurus) dan bentuk lengkung (dibatasi kurva), menghitung banyak sisi untuk menamai segitiga, segi empat, segi lima, dan segi enam, menemukan bentuk-bentuk itu di sekitar, serta membedakan lingkaran dari bentuk lengkung lainnya lewat percobaan mencetak dan memutar.

**Suara Silabus.** Kita belajar bangun datar. Bukunya bernama Bentuk di Sekitar Kita, bagian bangun datar. Upe menemukan sarang lebah yang permukaannya berbentuk segi enam. Kita mengelompokkan bangun datar menjadi segi banyak dan bentuk lengkung, menghitung sisi untuk menamai segitiga, segi empat, segi lima, dan segi enam, lalu mengenal lingkaran. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.

## 3. Peta enam tahap SMICPA dan bobotnya

| Tahap | Isi | Banyak butir |
|---|---|---|
| S. Story | Video animasi HTML/SVG, tiga video. Tiap video diputar satu per satu saat diketuk (tidak ada putar otomatis) | 3 video, 9 adegan, 36 ketukan |
| M. Mind-Map | Peta pikiran berurutan, tiap cabang bisa diketuk dan uraiannya tampil di layar | 8 langkah |
| I. Infografis | Poster rangkuman, suara di tiap panel | 10 panel |
| C. Concrete | Benda nyata yang diketuk, diseret, digunting, dan dihitung | 4 permainan |
| P. Picture | Diagram polos: bentuk, titik dan garis, model bangun ruang, tabel | 3 permainan |
| A. Abstract | Kata dan angka: tabel, petunjuk tertulis, kalimat, peta konsep | 3 permainan |

Bobot mengikuti isi buku. Aturan Concrete dan Picture berlaku: benda berwarna hanya di Concrete, Picture hanya diagram tanpa gambar benda (bentuk polos dan model bangun ruang polos tanpa hiasan benda).

## 4. Tahap 1: Story (video animasi, menggantikan slide)

Tidak ada video yang berjalan sendiri. Siswa mengetuk **▶ Putar** pada satu video. Video itu berjalan, dan video lain berhenti. Setiap kalimat adalah satu ketukan: dibacakan Suara Guru perangkat, dan gambar berubah mengikuti kalimat yang sedang dibacakan. Ada tombol Jeda, Ulang, dan Suara hidup atau mati.

### Video 1: Sarang Lebah Upe (Bentuk segi enam yang unik)

**Adegan 1. Paman membawa madu** (`K2B3A-V1-1`)

1. Hari ini, Paman berkunjung ke rumah Upe.  
   _Papan layar:_ Paman datang!
2. Paman datang membawa madu dan sarangnya.  
   _Papan layar:_ Madu dan sarangnya
3. Ini adalah kali pertama Upe melihat sarang lebah.  
   _Papan layar:_ Sarang lebah pertama
4. Ternyata bentuknya sangat unik.  
   _Papan layar:_ Bentuknya unik!

**Adegan 2. Permukaan segi enam** (`K2B3A-V1-2`)

1. Permukaan sarang lebah adalah bangun datar yang mempunyai enam sisi.  
   _Papan layar:_ Enam sisi
2. Upe tidak sabar untuk mencoba memakannya.  
   _Papan layar:_ Upe tidak sabar
3. Kata Paman, madu mempunyai banyak manfaat untuk tubuh kita.  
   _Papan layar:_ Madu menyehatkan
4. Apakah kamu juga suka madu seperti Upe?  
   _Papan layar:_ Kamu suka madu?

**Adegan 3. Ayo cari bentuk** (`K2B3A-V1-3`)

1. Sekarang, amati benda-benda di sekitarmu.  
   _Papan layar:_ Amati sekitarmu
2. Apakah kamu menemukan benda yang mempunyai enam sisi?  
   _Papan layar:_ Ada 6 sisi?
3. Di sub-bab ini, kita belajar mengenal berbagai bangun datar.  
   _Papan layar:_ Belajar bangun datar

### Video 2: Segi Banyak dan Bentuk Lengkung (Lihat tepinya)

**Adegan 1. Tiga bentuk dasar** (`K2B3A-V2-1`)

1. Di kelas satu, kita sudah mempelajari tiga bentuk dasar.  
   _Papan layar:_ Tiga bentuk dasar
2. Ada segitiga, segi empat, dan bentuk lengkung.  
   _Papan layar:_ Segitiga, segi empat, lengkung
3. Ketiganya dinamakan bangun datar.  
   _Papan layar:_ Bangun datar
4. Sekarang, kita kelompokkan bangun datar menurut tepinya.  
   _Papan layar:_ Lihat tepinya

**Adegan 2. Garis lurus dan sisi** (`K2B3A-V2-2`)

1. Beberapa bangun datar dibatasi oleh garis lurus.  
   _Papan layar:_ Dibatasi garis lurus
2. Garis lurus pada bangun datar dinamakan sisi.  
   _Papan layar:_ Garis lurus = sisi
3. Bangun datar yang dibatasi oleh beberapa sisi dinamakan segi banyak.  
   _Papan layar:_ Segi banyak
4. Contohnya segitiga, segi empat, segi lima, dan segi enam.  
   _Papan layar:_ Contoh segi banyak

**Adegan 3. Kurva dan bentuk lengkung** (`K2B3A-V2-3`)

1. Beberapa bangun datar dibatasi oleh kurva, atau garis lengkung.  
   _Papan layar:_ Dibatasi kurva
2. Bangun datar yang dibatasi oleh kurva dinamakan bentuk lengkung.  
   _Papan layar:_ Bentuk lengkung
3. Contohnya lingkaran, bentuk telur, dan bentuk hati.  
   _Papan layar:_ Lingkaran • telur • hati
4. Jadi, lihat tepinya. Garis lurus berarti segi banyak. Garis lengkung berarti bentuk lengkung.  
   _Papan layar:_ Lihat tepinya!

### Video 3: Menamai Segi Banyak (Banyak sisi menentukan nama)

**Adegan 1. Hitung sisinya** (`K2B3A-V3-1`)

1. Banyak sisi pada segi banyak memengaruhi namanya.  
   _Papan layar:_ Banyak sisi = nama
2. Segitiga adalah segi banyak yang memiliki tiga sisi.  
   _Papan layar:_ Segitiga: 3 sisi
3. Segi empat adalah segi banyak yang memiliki empat sisi.  
   _Papan layar:_ Segi empat: 4 sisi
4. Bagaimana dengan segi banyak yang punya lima sisi, atau enam sisi?  
   _Papan layar:_ 5 sisi? 6 sisi?

**Adegan 2. Segi lima dan segi enam** (`K2B3A-V3-2`)

1. Segi banyak yang mempunyai lima sisi dinamakan segi lima.  
   _Papan layar:_ Segi lima: 5 sisi
2. Segi banyak yang mempunyai enam sisi dinamakan segi enam.  
   _Papan layar:_ Segi enam: 6 sisi
3. Ada segi lima pada bunga morning glory.  
   _Papan layar:_ Bunga morning glory
4. Ada segi enam pada sarang lebah.  
   _Papan layar:_ Sarang lebah
5. Kita juga bisa menemukannya pada rumah burung, teh celup, lantai, dan jam dinding.  
   _Papan layar:_ Cari di sekitar

**Adegan 3. Lingkaran** (`K2B3A-V3-3`)

1. Sekarang kita mencoba dengan uang logam.  
   _Papan layar:_ Uang logam
2. Letakkan uang logam di atas kertas, lalu cetak tepinya.  
   _Papan layar:_ Cetak tepinya
3. Putar uang logam di atas cetakannya. Bentuknya selalu pas, ke arah mana pun.  
   _Papan layar:_ Selalu pas!
4. Uang logam adalah contoh lingkaran. Lingkaran adalah bentuk lengkung yang terlihat bulat sempurna.  
   _Papan layar:_ Lingkaran: bulat sempurna

## 5. Tahap 2: Mind-Map (peta pikiran)

**1. Amati Tepinya** 🔍  
Untuk mengenal sebuah bangun datar, amati dulu tepinya. Apakah tepinya garis lurus atau garis lengkung? Dari jawaban itu, kita tahu apakah bangun datar tersebut segi banyak atau bentuk lengkung. Pakai jari untuk menelusuri tepi pelan-pelan. Kebiasaan mengamati ciri sebelum menamai adalah dasar berpikir geometri.

_Alur:_ Amati bentuk → Garis lurus dan sisi

**2. Garis Lurus Jadi Sisi** 📏  
Garis lurus pada tepi bangun datar dinamakan sisi. Bangun datar yang dibatasi oleh beberapa sisi dinamakan segi banyak. Dalam bahasa Yunani, poli berarti banyak. Contoh segi banyak adalah segitiga, segi empat, segi lima, dan segi enam. Ujung tempat dua sisi bertemu adalah pojok, yang juga disebut sudut.

_Alur:_ Garis lurus dan sisi → Kurva dan bentuk lengkung

**3. Kurva Jadi Bentuk Lengkung** 🌀  
Bangun datar yang tepinya melengkung dinamakan bentuk lengkung. Garis lengkung itu disebut kurva. Contohnya lingkaran, bentuk telur, dan bentuk hati. Bentuk lengkung tidak punya sisi lurus. Jadi, bentuk lengkung tidak termasuk segi banyak.

_Alur:_ Kurva dan bentuk lengkung → Hitung sisi

**4. Hitung Sisi, Sebut Nama** 🔢  
Banyak sisi menentukan nama segi banyak. Tiga sisi dinamakan segitiga. Empat sisi dinamakan segi empat. Lima sisi dinamakan segi lima. Enam sisi dinamakan segi enam. Supaya tidak salah hitung, tandai satu sisi sebagai awal, lalu hitung berputar satu arah sampai kembali ke awal. Setiap sisi hanya dihitung satu kali.

_Alur:_ Hitung sisi → Pola nama

**5. Pola Nama Segi Banyak** 🧩  
Nama segi banyak punya pola: segi, lalu banyak sisinya. Ada juga segi tujuh yang punya tujuh sisi, dan segi delapan yang punya delapan sisi. Rambu STOP di jalan punya delapan sisi, jadi bentuknya segi delapan. Dengan pola ini, kamu bisa menamai segi banyak apa pun hanya dengan menghitung sisinya.

_Alur:_ Pola nama → Bentuk di sekitar

**6. Bentuk di Alam dan di Rumah** 🐝  
Bentuk segi banyak ada di mana-mana. Bunga morning glory berbentuk segi lima. Sarang lebah tersusun dari banyak segi enam. Lebah memakai segi enam karena bentuk itu bisa berdempetan rapat tanpa celah dan hemat bahan sarang. Di rumah, kita menemukan segi lima pada rumah burung dan teh celup, serta segi enam pada ubin lantai dan jam dinding.

_Alur:_ Bentuk di sekitar → Lingkaran

**7. Lingkaran Itu Istimewa** ⭕  
Lingkaran adalah bentuk lengkung yang bulat sempurna. Buktikan dengan uang logam. Cetak tepinya di kertas, lalu putar koin di atas cetakan. Koin selalu pas ke arah mana pun. Bentuk lengkung lain, seperti telur atau hati, tidak pas lagi ketika diputar. Itu sebabnya lingkaran istimewa.

_Alur:_ Lingkaran → Tiga pertanyaan

**8. Tiga Pertanyaan Detektif** 🕵️  
Saat bertemu bangun datar baru, ajukan tiga pertanyaan. Satu, dibatasi oleh apa, garis lurus atau garis lengkung? Dua, kalau garis lurus, berapa sisinya? Tiga, kalau garis lengkung, apakah pas bila diputar? Tiga pertanyaan ini adalah cara kerja detektif bentuk, dan mengikuti tahap berpikir geometri dari mengenali, menggolongkan, sampai menjelaskan ciri.

_Alur:_ Tiga pertanyaan → Bangun datar siap dikenali

## 6. Tahap 3: Infografis

**Panel 1. Sarang Lebah Segi Enam** 🐝 (6, Enam)

> Paman membawa sarang lebah untuk Upe. Permukaan sarang lebah adalah bangun datar yang mempunyai enam sisi. Bangun datar dengan enam sisi dinamakan segi enam. Lebah membuat sarang dari banyak segi enam yang berdempetan rapat.

**Panel 2. Tiga Bentuk Dasar** 🔺 (3, Tiga)

> Di kelas satu kita mengenal tiga bentuk dasar, yaitu segitiga, segi empat, dan bentuk lengkung. Ketiganya adalah bangun datar. Sekarang kita mengelompokkannya menurut tepinya, garis lurus atau garis lengkung.

**Panel 3. Garis Lurus dan Sisi** 📏 (3, Tiga)

> Garis lurus pada tepi bangun datar dinamakan sisi. Segitiga ini punya tiga garis lurus, jadi punya tiga sisi. Ujung tempat dua sisi bertemu disebut pojok atau sudut.

**Panel 4. Segi Banyak** ⬟ (4, Empat)

> Bangun datar yang dibatasi oleh beberapa sisi atau garis lurus dinamakan segi banyak. Contohnya segitiga, segi empat, segi lima, dan segi enam. Semua sisinya garis lurus.

**Panel 5. Kurva dan Bentuk Lengkung** 🌀 (3, Tiga)

> Bangun datar yang dibatasi oleh kurva atau garis lengkung dinamakan bentuk lengkung. Contohnya lingkaran, bentuk telur, dan bentuk hati. Bentuk lengkung tidak punya sisi lurus.

**Panel 6. Banyak Sisi Menentukan Nama** 🔢 (6, Enam)

> Tiga sisi, segitiga. Empat sisi, segi empat. Lima sisi, segi lima. Enam sisi, segi enam. Hitung sisinya, lalu sebut namanya.

**Panel 7. Segi Lima dan Segi Enam di Sekitar Kita** 🏠 (6, Enam)

> Segi lima ada pada rumah burung, teh celup, dan bunga morning glory. Segi enam ada pada ubin lantai, jam dinding, dan sarang lebah. Coba cari lagi di rumah dan di sekolahmu.

**Panel 8. Pola Nama Segi Banyak** 🧩 (8, Delapan)

> Nama segi banyak mengikuti pola. Tiga sisi segitiga, empat sisi segi empat, lima sisi segi lima, enam sisi segi enam, tujuh sisi segi tujuh, delapan sisi segi delapan. Rambu STOP berbentuk segi delapan.

**Panel 9. Lingkaran: Cetak dan Putar** ⭕ (1, Satu)

> Cetak tepi uang logam di kertas. Putar uang logam di atas cetakannya. Uang logam selalu pas ke arah mana pun, karena lingkaran bulat sempurna. Bentuk telur atau hati tidak selalu pas.

**Panel 10. Tiga Pertanyaan Detektif Bentuk** 🕵️ (3, Tiga)

> Tiga pertanyaan detektif bentuk. Satu, dibatasi garis lurus atau garis lengkung. Dua, kalau garis lurus, berapa sisinya. Tiga, kalau garis lengkung, apakah pas bila diputar. Dengan tiga pertanyaan ini kita bisa mengenali bangun datar apa pun.

## 7. Tahap 4, 5, dan 6: sepuluh permainan

| No | Tahap | Permainan | Jenis | Ronde |
|---|---|---|---|---|
| 1 | Concrete | Pilah Benda di Meja | `sort-flat-objects` | ronde 1: Jendela, Panji segitiga, Sarang lebah, Piring, Uang logam, Balon hati; ronde 2: Rambu STOP, Teh celup, Cermin lonjong, Buku, Ubin lantai, Piring |
| 2 | Concrete | Papan Paku dan Karet Gelang | `geoboard-rubber-band` | segitiga, segi empat, segi lima, segi enam |
| 3 | Concrete | Cetak dan Putar | `stamp-and-rotate-coin` | Uang logam (lingkaran); Tutup botol (lingkaran); Telur (bukan lingkaran); Balon hati (bukan lingkaran) |
| 4 | Concrete | Cari Bentuk di Sekitar | `find-by-sides` | 3 sisi: Panji segitiga, Rambu hati-hati, Penggaris segitiga; 4 sisi: Jendela, Buku, Bendera Merah Putih; 5 sisi: Rumah burung, Teh celup, Rumah; 6 sisi: Sarang lebah, Ubin lantai, Jam dinding, Kepala baut |
| 5 | Picture | Tandai Setiap Sisi | `tap-and-count-sides` | segitiga (3 sisi), segi empat (4 sisi), segi lima (5 sisi), segi enam (6 sisi) |
| 6 | Picture | Tarik Garis Bangun dan Ciri | `match-lines-shape-feature` | ronde 1: kurva, 3 sisi, 5 sisi, 6 sisi, 4 sisi; ronde 2: kurva, 3 sisi, 4 sisi, 7 sisi, 8 sisi |
| 7 | Picture | Warnai Bentuk | `color-by-rule` | semua segi empat dengan warna biru; semua lingkaran dengan warna hijau; semua segi lima dengan warna merah; semua segi banyak dengan warna kuning |
| 8 | Abstract | Isi Tabel Ciri | `fill-table-sides-names` | ronde 1: tulis banyak sisinya (4 baris); ronde 2: tulis namanya (6 baris) |
| 9 | Abstract | Detektif Bentuk Misterius | `clue-detective-shapes` | 4 ronde, tiap ronde dua petunjuk tertulis dan tiga pilihan nama |
| 10 | Abstract | Peta Konsep Bangun Datar | `concept-map-fill` | Segi banyak; Bentuk lengkung |

### Permainan 1. Pilah Benda di Meja (Concrete)

- **Rujukan buku.** hlm. 68–70 (mengelompokkan bangun datar; Ayo Mencoba 1: segi banyak dan bentuk lengkung)
- **Tujuan.** Mengelompokkan benda berbentuk datar menjadi segi banyak dan bentuk lengkung menurut tepinya.
- **Cara main.** Dua ronde, masing-masing enam benda (jendela, bendera, ubin sarang lebah, rumah burung, rambu STOP, piring, koin, cermin lonjong, balon hati, dan lainnya). Siswa menyeret atau mengetuk benda ke kotak Segi banyak atau kotak Bentuk lengkung. Benda yang salah kembali disertai petunjuk tepinya.
- **Ronde.** ronde 1: Jendela, Panji segitiga, Sarang lebah, Piring, Uang logam, Balon hati; ronde 2: Rambu STOP, Teh celup, Cermin lonjong, Buku, Ubin lantai, Piring
- **Panduan suara.** Seret benda ke kotak yang sesuai dengan tepinya.

### Permainan 2. Papan Paku dan Karet Gelang (Concrete)

- **Rujukan buku.** hlm. 72–73 (banyak sisi menentukan nama: segitiga, segi empat, segi lima, segi enam); papan paku Gattegno
- **Tujuan.** Membentuk segi banyak dengan karet gelang di papan paku dan menghitung sisinya.
- **Cara main.** Empat ronde (segitiga, segi empat, segi lima, segi enam). Siswa mengetuk paku satu per satu untuk merentangkan karet, lalu mengetuk paku pertama untuk menutup bentuk. Bentuk harus tertutup, tidak bersilangan, dan banyak sisinya sama dengan yang diminta.
- **Ronde.** segitiga, segi empat, segi lima, segi enam
- **Panduan suara.** Ketuk paku satu per satu, lalu tutup di paku pertama.

### Permainan 3. Cetak dan Putar (Concrete)

- **Rujukan buku.** hlm. 76 (Ayo Mencoba 3 nomor 2: cetak uang logam lalu putar di atas cetakannya)
- **Tujuan.** Menemukan sendiri bahwa lingkaran selalu pas bila diputar, sedangkan bentuk lengkung lain tidak.
- **Cara main.** Empat ronde (uang logam, tutup botol, telur lonjong, dan balon hati). Siswa menekan Cetak, memutar benda dengan tombol putar, melihat apakah benda selalu menutup cetakannya, lalu memilih lingkaran atau bukan lingkaran.
- **Ronde.** Uang logam (lingkaran); Tutup botol (lingkaran); Telur (bukan lingkaran); Balon hati (bukan lingkaran)
- **Panduan suara.** Cetak, putar bendanya, lalu putuskan: lingkaran atau bukan.

### Permainan 4. Cari Bentuk di Sekitar (Concrete)

- **Rujukan buku.** hlm. 66–67 dan 73 (Sarang Lebah; Tahukah Kalian: segi lima dan segi enam di sekitar kita)
- **Tujuan.** Menemukan benda di sekitar yang berbentuk segitiga, segi empat, segi lima, atau segi enam dengan menghitung sisinya.
- **Cara main.** Empat ronde, tiap ronde delapan benda (jam dinding, teh celup, rumah burung, ubin lantai, sarang lebah, jendela, piring, dan lainnya). Siswa mengetuk semua benda yang punya sisi sebanyak yang diminta. Benda yang salah memberi petunjuk banyak sisinya.
- **Ronde.** 3 sisi: Panji segitiga, Rambu hati-hati, Penggaris segitiga; 4 sisi: Jendela, Buku, Bendera Merah Putih; 5 sisi: Rumah burung, Teh celup, Rumah; 6 sisi: Sarang lebah, Ubin lantai, Jam dinding, Kepala baut
- **Panduan suara.** Ketuk semua benda yang punya sisi sebanyak yang diminta.

### Permainan 5. Tandai Setiap Sisi (Picture)

- **Rujukan buku.** hlm. 72 dan 74–77 (menghitung sisi; Ayo Berlatih nomor 1 dan 2)
- **Tujuan.** Menghitung sisi segi banyak dengan menandai tiap sisi satu kali, lalu menamai bentuknya.
- **Cara main.** Empat ronde (segitiga, segi empat miring, segi lima, segi enam). Siswa mengetuk tiap sisi sehingga sisi berwarna dan bernomor, lalu memilih banyak sisi dan nama bentuk. Setiap sisi hanya bisa ditandai satu kali.
- **Ronde.** segitiga (3 sisi), segi empat (4 sisi), segi lima (5 sisi), segi enam (6 sisi)
- **Panduan suara.** Ketuk setiap sisi satu kali, lalu pilih banyak sisi dan namanya.

### Permainan 6. Tarik Garis Bangun dan Ciri (Picture)

- **Rujukan buku.** hlm. 77–79 (Ayo Berlatih nomor 3 dan 4: hubungkan bangun datar dengan ciri-ciri dan namanya)
- **Tujuan.** Menghubungkan bangun datar dengan ciri-cirinya, yaitu banyak sisi atau satu kurva.
- **Cara main.** Dua ronde, tiap ronde lima bangun di kiri dan lima ciri di kanan. Siswa mengetuk bangun lalu ciri yang cocok, dan garis penghubung tergambar. Garis yang salah tidak tergambar dan diberi petunjuk.
- **Ronde.** ronde 1: kurva, 3 sisi, 5 sisi, 6 sisi, 4 sisi; ronde 2: kurva, 3 sisi, 4 sisi, 7 sisi, 8 sisi
- **Panduan suara.** Ketuk bangunnya, lalu ketuk cirinya, sampai semua terhubung.

### Permainan 7. Warnai Bentuk (Picture)

- **Rujukan buku.** hlm. 79–80 (Ayo Berlatih nomor 5 dan 6: warnai segi empat, warnai lingkaran)
- **Tujuan.** Mewarnai hanya bangun datar yang memenuhi aturan: segi empat, lingkaran, segi lima, atau semua segi banyak.
- **Cara main.** Empat ronde (segi empat biru, lingkaran hijau, segi lima merah, semua segi banyak kuning). Siswa mengetuk bentuk untuk mewarnainya, mengetuk lagi untuk menghapus warna, lalu menekan periksa. Jawaban salah dijelaskan bentuk mana yang keliru.
- **Ronde.** semua segi empat dengan warna biru; semua lingkaran dengan warna hijau; semua segi lima dengan warna merah; semua segi banyak dengan warna kuning
- **Panduan suara.** Warnai hanya bentuk yang sesuai aturan, lalu periksa.

### Permainan 8. Isi Tabel Ciri (Abstract)

- **Rujukan buku.** hlm. 72–73 dan 77 (banyak sisi dan nama; Ayo Berlatih nomor 2: tulis ciri-ciri tiap bangun datar)
- **Tujuan.** Menuliskan hubungan antara nama segi banyak dan banyak sisinya, dua arah.
- **Cara main.** Dua ronde. Ronde 1: tulis banyak sisi untuk segitiga, segi empat, segi lima, dan segi enam. Ronde 2: tulis nama dari 3, 5, 6, 4, 8, dan 7 sisi. Siswa mengetuk baris, lalu mengetuk kartu jawaban yang tepat.
- **Ronde.** ronde 1: tulis banyak sisinya (4 baris); ronde 2: tulis namanya (6 baris)
- **Panduan suara.** Ketuk baris tabel, lalu pilih kartu yang tepat.

### Permainan 9. Detektif Bentuk Misterius (Abstract)

- **Rujukan buku.** hlm. 69–76 (garis lurus, kurva, sisi, segi banyak, bentuk lengkung, lingkaran)
- **Tujuan.** Menemukan nama bangun datar dari dua petunjuk tertulis.
- **Cara main.** Empat ronde, tiap ronde dua petunjuk dan tiga pilihan nama. Siswa memilih nama yang cocok dengan kedua petunjuk. Petunjuk dibacakan Suara Guru.
- **Ronde.** 4 ronde, tiap ronde dua petunjuk tertulis dan tiga pilihan nama
- **Panduan suara.** Baca kedua petunjuk, lalu pilih namanya.

### Permainan 10. Peta Konsep Bangun Datar (Abstract)

- **Rujukan buku.** hlm. 80 (Coba Pikirkan: isilah diagram segi banyak)
- **Tujuan.** Melengkapi peta konsep dengan definisi, ciri, dan contoh segi banyak dan bentuk lengkung.
- **Cara main.** Dua peta konsep, satu untuk segi banyak dan satu untuk bentuk lengkung. Tiap peta punya empat kotak: definisi, dua ciri, dan contoh. Siswa memilih kartu yang tepat untuk kotak yang menyala.
- **Ronde.** Segi banyak; Bentuk lengkung
- **Panduan suara.** Pilih kartu yang tepat untuk kotak yang menyala.

## 8. Poin Penting dan Catatanku

- 📏 **Segi banyak**: dibatasi sisi atau garis lurus. _Suara:_ Segi banyak adalah bangun datar yang dibatasi oleh beberapa sisi atau garis lurus. Contohnya segitiga, segi empat, segi lima, dan segi enam.
- 🌀 **Bentuk lengkung**: dibatasi kurva atau garis lengkung. _Suara:_ Bentuk lengkung adalah bangun datar yang dibatasi oleh kurva atau garis lengkung. Contohnya lingkaran, bentuk telur, dan bentuk hati.
- 🔢 **Banyak sisi, nama**: 3 segitiga • 4 segi empat • 5 segi lima • 6 segi enam. _Suara:_ Banyak sisi menentukan nama. Tiga sisi segitiga, empat sisi segi empat, lima sisi segi lima, enam sisi segi enam.
- ⭕ **Lingkaran**: bulat sempurna, selalu pas bila diputar. _Suara:_ Lingkaran adalah bentuk lengkung yang bulat sempurna. Lingkaran selalu pas ketika diputar di atas cetakannya.
- 🕵️ **Tiga pertanyaan**: garis lurus? berapa sisi? pas diputar?. _Suara:_ Tiga pertanyaan detektif bentuk. Dibatasi garis lurus atau lengkung. Berapa sisinya. Pas atau tidak bila diputar.

**Suara Poin Penting.** Ingat selalu! Bangun datar yang dibatasi garis lurus disebut segi banyak, dan garis lurusnya disebut sisi. Bangun datar yang dibatasi garis lengkung disebut bentuk lengkung. Banyak sisi menentukan nama: tiga segitiga, empat segi empat, lima segi lima, enam segi enam. Lingkaran bulat sempurna dan selalu pas bila diputar.

**Cara menyebutkan.** Sarang lebah berbentuk segi enam karena punya 6 sisi. _Suara:_ Cara menyebutkan bentuk. Sarang lebah berbentuk segi enam karena mempunyai enam sisi.

**Ayo Mencoba di rumah.** Ayo Mencoba di rumah: cari lima benda yang berbentuk segi banyak dan dua benda yang berbentuk lengkung. Hitung sisi tiap segi banyak, lalu sebutkan namanya kepada keluargamu. Cetak tepi sebuah koin dan putar koin di atas cetakannya.

**Refleksi (Catatanku).**

- Aku dapat membedakan segi banyak dan bentuk lengkung.
- Aku dapat membedakan segi banyak berdasarkan sisinya.
- Aku dapat menunjukkan perbedaan lingkaran dengan bentuk lengkung lainnya.
- Aku belajar dengan senang hati.

## 9. Metode dari luar buku yang diadopsi

- **Papan paku (geoboard) Gattegno**: karet gelang direntangkan di antara paku untuk membentuk dan menghitung sisi segi banyak. Dasar permainan Papan Paku dan Karet Gelang. Mesin pemeriksa menolak karet yang bersilangan dan menghitung sisi dari pojok sebenarnya.
- **Tingkat berpikir geometri van Hiele**: mengenali (visual), menggolongkan menurut ciri (analisis), lalu menjelaskan sebab. Tiga pertanyaan detektif bentuk mengikuti tangga itu.
- **Memilah (sorting) berdasarkan satu ciri** sebagai pengantar klasifikasi, dipakai di kelas awal Inggris dan Singapura. Dasar permainan Pilah Benda di Meja dan Warnai Bentuk.
- **Percobaan mencetak dan memutar benda** untuk menemukan ciri lingkaran (bulat sempurna, selalu pas ke arah mana pun). Dasar permainan Cetak dan Putar.
- **Awalan Yunani poli (banyak)** dan pola nama segi banyak (segi lima, segi enam, segi tujuh, segi delapan). Rambu STOP sebagai contoh segi delapan di jalan.

## 10. Batas yang diketahui

- Soal Latihan (30 poin), soal Ujian (70 poin), dan Simulasi belum dibuat. Pemilik akan menugaskannya terpisah. Sampai saat itu tab Latihan dan Ujian menampilkan kartu "sedang disiapkan".
- Suara dan ketukan video diuji dengan suara perangkat di Chrome desktop berukuran ponsel. Pada sebagian Android, tombol Jeda tidak menghentikan suara di tengah kalimat (Web Speech `pause()` tidak didukung merata).
- Laju 0,70 dan nada 1 sama untuk Bu Sari dan Pak Budi. Beda guru hanya pada suara yang dipilih perangkat (wanita atau pria). Perangkat yang hanya punya satu suara Indonesia akan membuat kedua guru terdengar serupa.
- Rambu STOP berbentuk segi delapan (pengayaan di luar daftar segi enam buku) dan dipakai sebagai contoh pola nama segi banyak.

