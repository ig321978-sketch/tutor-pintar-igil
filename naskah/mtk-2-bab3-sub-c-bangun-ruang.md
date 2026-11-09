# Naskah Matematika Kelas 2 SD, Bab 3: Bentuk di Sekitar Kita, Sub-Bab C: Bangun Ruang

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k2b3.ts` dan `src/components/modul/data-k2b3.ts`, oleh `scripts/buat-naskah-md-k2b3.mjs`. Isi mengikuti Buku Siswa Matematika Kelas II (Kemendikbudristek, Kurikulum Merdeka, Bab 3 hlm. 65–100) dan diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban tidak ada di berkas ini.

## 1. Identitas modul

| Butir | Isi |
|---|---|
| Modul | `mtk-2-bab3`, sub-bab C |
| Berkas data | `src/data/kelas2-bab3.json` (dibangkitkan `src/content-master/buat-k2-bab3.mjs`, lalu `npm run sync:keys`) |
| Kode bab di server | `k2-mat-bab3` (belum ada seed server karena soal belum ada) |
| Fase dan kelas | `FASE_A`, kelas 2 SD |
| Elemen | 🌈 Fase A • Elemen Geometri (Kelas 2 SD/MI) |
| Poin Kualifikasi per bab | Latihan 30 dan Ujian 70 (terbit setelah soalnya ada). Praktikum 50 terbit sekali per blok empat bab. |
| Suara Guru | Murni Web Speech API bawaan perangkat (`id-ID`), **laju 0,70 dan nada 1**. Tanpa berkas audio statis, tanpa ElevenLabs. |
| Panggilan API saat siswa belajar | Nol. Seluruh tahap Materi berjalan di klien. |
| Tab Simulasi, Latihan, Ujian | Belum diisi. Latihan dan Ujian menampilkan kartu "sedang disiapkan". Tab Simulasi tidak tampil. |

## 2. Capaian dan tujuan pembelajaran

**Capaian Pembelajaran (CP).** Siswa membedakan bangun datar dan bangun ruang, mengelompokkan bangun ruang berdasarkan permukaan datar atau lengkung, serta menamai kubus, balok, tabung, kerucut, dan bola sesuai ciri-cirinya.

**Rujukan.** Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 3: Bentuk di Sekitar Kita, Sub-Bab C hlm. 90–94).

**Sasaran.** Siswa membedakan bangun datar dan bangun ruang, menjelaskan bahwa bangun ruang punya ruang di dalam yang dapat diisi, mengelompokkan bangun ruang menurut permukaan datar atau lengkung lewat percobaan menggelindingkan, menamai kubus, balok, tabung, kerucut, dan bola menurut cirinya, serta menemukan benda berbentuk bangun ruang di sekitar.

**Suara Silabus.** Kita belajar bangun ruang. Bukunya bernama Bentuk di Sekitar Kita, bagian bangun ruang. Kita membedakan bangun datar dan bangun ruang, mencoba menggelindingkan benda untuk mengenal permukaan datar dan lengkung, lalu menamai kubus, balok, tabung, kerucut, dan bola. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.

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

### Video 1: Bangun Datar dan Bangun Ruang (Apa bedanya?)

**Adegan 1. Benda di sekitar kita** (`K2B3C-V1-1`)

1. Amati benda-benda di sekitar kita.  
   _Papan layar:_ Amati benda
2. Ada topi ulang tahun, kubus warna-warni, botol minum, dan bola.  
   _Papan layar:_ Topi, kubus, botol, bola
3. Ada juga bentuk segitiga, segi empat, dan lingkaran yang tipis.  
   _Papan layar:_ Bentuk tipis
4. Bagaimana cara kita mengelompokkannya?  
   _Papan layar:_ Bagaimana mengelompokkan?

**Adegan 2. Bangun datar** (`K2B3C-V1-2`)

1. Bentuk benda dibedakan menjadi bangun datar dan bangun ruang.  
   _Papan layar:_ Datar dan ruang
2. Bangun datar hanya mempunyai satu permukaan.  
   _Papan layar:_ Satu permukaan
3. Contohnya lingkaran, segi empat, dan segitiga.  
   _Papan layar:_ Contoh bangun datar
4. Bangun datar itu tipis, jadi tidak bisa diisi.  
   _Papan layar:_ Tidak bisa diisi

**Adegan 3. Bangun ruang** (`K2B3C-V1-3`)

1. Bangun ruang punya ruang di dalamnya, jadi dapat diisi.  
   _Papan layar:_ Ada ruang di dalam
2. Contohnya kotak, kubus, topi, dan botol.  
   _Papan layar:_ Kotak • kubus • topi • botol
3. Kotak, kubus, dan botol punya beberapa permukaan.  
   _Papan layar:_ Banyak permukaan
4. Jadi, kalau benda itu bisa diisi, benda itu adalah bangun ruang.  
   _Papan layar:_ Bisa diisi = bangun ruang

### Video 2: Menggelinding atau Tidak? (Permukaan datar dan lengkung)

**Adegan 1. Gelindingkan benda** (`K2B3C-V2-1`)

1. Ambil kerucut, kubus, botol, kotak, dan bola.  
   _Papan layar:_ Ambil lima benda
2. Coba gelindingkan benda-benda tersebut.  
   _Papan layar:_ Gelindingkan!
3. Bola dan botol mudah menggelinding.  
   _Papan layar:_ Bola dan botol menggelinding
4. Kubus dan kotak tidak mau menggelinding.  
   _Papan layar:_ Kubus dan kotak diam

**Adegan 2. Permukaan lengkung dan datar** (`K2B3C-V2-2`)

1. Bangun ruang dibedakan berdasarkan permukaannya.  
   _Papan layar:_ Lihat permukaannya
2. Ada yang permukaannya lengkung sehingga mudah menggelinding.  
   _Papan layar:_ Lengkung: menggelinding
3. Contohnya tabung, kerucut, dan bola.  
   _Papan layar:_ Tabung • kerucut • bola
4. Ada yang permukaannya datar, contohnya kubus dan balok.  
   _Papan layar:_ Datar: kubus • balok

**Adegan 3. Mengapa?** (`K2B3C-V2-3`)

1. Permukaan lengkung bisa berguling terus.  
   _Papan layar:_ Lengkung berguling
2. Permukaan datar menahan benda supaya diam.  
   _Papan layar:_ Datar menahan
3. Karena itu kita menumpuk kotak, dan menggelindingkan bola.  
   _Papan layar:_ Kotak ditumpuk
4. Temukan benda di sekitarmu yang permukaannya datar dan lengkung.  
   _Papan layar:_ Cari di sekitarmu

### Video 3: Lima Bangun Ruang (Kubus, balok, tabung, kerucut, bola)

**Adegan 1. Kubus dan balok** (`K2B3C-V3-1`)

1. Ada lima nama bangun ruang: kubus, balok, tabung, kerucut, dan bola.  
   _Papan layar:_ Lima bangun ruang
2. Kubus dan balok adalah bangun ruang dengan permukaan datar.  
   _Papan layar:_ Kubus dan balok: datar
3. Kubus mempunyai permukaan berbentuk segi empat yang sama ukurannya.  
   _Papan layar:_ Kubus: sama ukuran
4. Balok mempunyai permukaan berbentuk segi empat yang berbeda ukurannya.  
   _Papan layar:_ Balok: beda ukuran

**Adegan 2. Tabung, kerucut, dan bola** (`K2B3C-V3-2`)

1. Tabung seperti kaleng atau botol.  
   _Papan layar:_ Tabung: kaleng
2. Kerucut seperti topi ulang tahun atau kerucut es krim.  
   _Papan layar:_ Kerucut: topi
3. Bola seperti bola sepak dan kelereng.  
   _Papan layar:_ Bola: bola sepak
4. Ketiganya mempunyai permukaan lengkung, jadi bisa menggelinding.  
   _Papan layar:_ Permukaan lengkung

**Adegan 3. Cari bangun ruang** (`K2B3C-V3-3`)

1. Sekarang amati benda-benda di sekitarmu.  
   _Papan layar:_ Amati sekitarmu
2. Temukan benda yang berbentuk bangun ruang.  
   _Papan layar:_ Temukan bangun ruang
3. Kelompokkan: kubus, balok, tabung, kerucut, atau bola.  
   _Papan layar:_ Kelompokkan
4. Tulis hasilnya dalam tabel.  
   _Papan layar:_ Tulis di tabel

## 5. Tahap 2: Mind-Map (peta pikiran)

**1. Bangun Datar atau Bangun Ruang?** 🧺  
Bentuk benda dibedakan menjadi bangun datar dan bangun ruang. Bangun datar hanya mempunyai satu permukaan, contohnya lingkaran, segi empat, dan segitiga yang tipis. Bangun ruang mempunyai ruang di dalamnya, contohnya kotak, kubus, topi, dan botol. Bangun ruang biasanya terlihat tebal dan bisa dipegang dari berbagai sisi.

_Alur:_ Datar atau ruang → Bisa diisi

**2. Bisa Diisi?** 🫙  
Cara mudah membedakan bangun datar dan bangun ruang adalah bertanya, apakah benda ini bisa diisi? Kotak bisa diisi mainan. Botol bisa diisi air. Topi ulang tahun bisa diisi permen. Bangun datar seperti selembar kertas tidak punya ruang di dalam, jadi tidak bisa diisi.

_Alur:_ Bisa diisi → Permukaan

**3. Permukaan Datar dan Lengkung** 🤚  
Bangun ruang dibedakan berdasarkan permukaannya. Ada yang permukaannya datar, yaitu kubus dan balok. Ada yang permukaannya lengkung, yaitu tabung, kerucut, dan bola. Rabalah permukaannya: rata seperti meja, atau melengkung seperti bola. Tabung dan kerucut juga punya alas yang datar, tetapi bagian lengkungnya membuat mereka bisa menggelinding.

_Alur:_ Permukaan → Menggelinding

**4. Menggelinding atau Menumpuk** ⚽  
Permukaan lengkung mudah menggelinding, seperti bola dan botol. Permukaan datar menahan benda supaya diam, jadi kotak mudah ditumpuk. Itulah sebabnya bola dipakai untuk menggelinding dan kardus dipakai untuk menumpuk. Mencoba langsung menggelindingkan benda adalah cara menguji permukaannya.

_Alur:_ Menggelinding → Kubus dan balok

**5. Kubus dan Balok** 🎲  
Kubus dan balok punya permukaan datar berbentuk segi empat. Pada kubus, semua permukaannya segi empat yang sama ukurannya, seperti dadu. Pada balok, permukaannya segi empat yang berbeda ukurannya, seperti kotak sepatu atau kardus. Hitung permukaannya: kubus dan balok masing-masing punya enam permukaan.

_Alur:_ Kubus dan balok → Tabung kerucut bola

**6. Tabung, Kerucut, dan Bola** 🥫  
Tabung seperti kaleng dan botol. Kerucut seperti topi ulang tahun dan kerucut es krim. Bola seperti bola sepak dan kelereng. Ketiganya punya permukaan lengkung. Bola tidak punya bagian datar sama sekali, sehingga paling mudah menggelinding.

_Alur:_ Tabung kerucut bola → Bangun datar di permukaan

**7. Bangun Datar di Permukaan Bangun Ruang** 🖨️  
Permukaan bangun ruang bisa dicetak seperti stempel. Tekan satu permukaan kubus pada kertas bertinta, hasilnya segi empat yang sama sisinya. Tekan alas kaleng, hasilnya lingkaran. Jadi bangun datar yang kita pelajari ada di permukaan bangun ruang. Kegiatan mencetak ini dipakai Montessori untuk mengenalkan hubungan bangun datar dan bangun ruang.

_Alur:_ Bangun datar di permukaan → Cari dan namai

**8. Cari dan Namai di Sekitar** 🧭  
Berkelilinglah di rumah atau sekolah, seperti jalan-jalan matematika. Temukan benda berbentuk kubus, balok, tabung, kerucut, dan bola. Kelompokkan dan tulis di tabel. Permainan tas misteri juga seru: raba benda di dalam tas, lalu tebak namanya dari ciri-cirinya tanpa melihat.

_Alur:_ Cari dan namai → Bangun ruang siap dikenali

## 6. Tahap 3: Infografis

**Panel 1. Bangun Datar dan Bangun Ruang** 🧺 (2, Dua)

> Bentuk benda dibedakan menjadi bangun datar dan bangun ruang. Bangun datar hanya punya satu permukaan, contohnya lingkaran, segi empat, dan segitiga. Bangun ruang punya ruang di dalamnya, contohnya kubus, kotak, topi, dan botol.

**Panel 2. Bisa Diisi?** 🫙 (1, Satu)

> Tanyakan, apakah benda ini bisa diisi? Kotak, botol, dan topi bisa diisi, jadi itu bangun ruang. Selembar kertas tidak bisa diisi, jadi itu bangun datar.

**Panel 3. Permukaan Datar dan Lengkung** 🤚 (2, Dua)

> Bangun ruang dibedakan berdasarkan permukaannya. Kubus dan balok punya permukaan datar. Tabung, kerucut, dan bola punya permukaan lengkung.

**Panel 4. Menggelinding atau Tidak** ⚽ (3, Tiga)

> Permukaan lengkung mudah menggelinding, seperti bola, botol, dan kerucut. Permukaan datar menahan benda supaya diam, seperti dadu dan kardus.

**Panel 5. Kubus** 🎲 (6, Enam)

> Kubus mempunyai permukaan berbentuk segi empat yang sama ukurannya. Kubus punya enam permukaan. Contoh kubus adalah dadu dan kotak hadiah.

**Panel 6. Balok** 📦 (6, Enam)

> Balok mempunyai permukaan berbentuk segi empat yang berbeda ukurannya. Balok juga punya enam permukaan. Contoh balok adalah kardus, kotak sepatu, dan kotak pensil.

**Panel 7. Tabung** 🥫 (1, Satu)

> Tabung seperti kaleng dan botol. Tabung punya permukaan lengkung, jadi mudah menggelinding. Alas tabung berbentuk lingkaran.

**Panel 8. Kerucut** 🍦 (1, Satu)

> Kerucut seperti topi ulang tahun dan kerucut es krim. Kerucut punya satu ujung yang runcing dan alas berbentuk lingkaran. Kerucut juga bisa menggelinding.

**Panel 9. Bola** ⚽ (1, Satu)

> Bola seperti bola sepak dan kelereng. Seluruh permukaan bola lengkung, tidak ada bagian yang datar, jadi bola paling mudah menggelinding.

**Panel 10. Cetak Permukaannya** 🖨️ (5, Lima)

> Permukaan bangun ruang bisa dicetak. Permukaan kubus menghasilkan segi empat yang sama sisinya. Permukaan balok menghasilkan segi empat yang berbeda sisinya. Alas tabung dan alas kerucut menghasilkan lingkaran. Bola tidak punya permukaan datar untuk dicetak.

## 7. Tahap 4, 5, dan 6: sepuluh permainan

| No | Tahap | Permainan | Jenis | Ronde |
|---|---|---|---|---|
| 1 | Concrete | Lereng Gelinding | `predict-and-roll` | ronde 1: Topi ulang tahun, Dadu, Botol minum, Kardus, Bola; ronde 2: Kaleng susu, Kelereng, Kotak pensil, Kerucut es krim, Kotak hadiah |
| 2 | Concrete | Tas Misteri | `mystery-bag-clues` | Kubus, Kerucut, Bola |
| 3 | Concrete | Cetak dan Tebak | `stamp-face-and-guess` | Dadu (segi empat sama sisi); Kardus (segi empat berbeda sisi); Kaleng susu (lingkaran); Topi ulang tahun (lingkaran) |
| 4 | Concrete | Pilah Rak Mainan | `sort-solids-five-bins` | ronde 1: Dadu, Kardus, Kaleng susu, Topi ulang tahun, Bola; ronde 2: Kotak hadiah, Kotak pensil, Botol minum, Kerucut es krim, Kelereng |
| 5 | Picture | Bayangan Bangun Ruang | `match-silhouette-view` | Kubus dari atas; Kerucut dari samping; Tabung dari atas; Balok dari samping |
| 6 | Picture | Tabel Permukaan | `table-surface-checkboxes` | lima baris (kubus, balok, tabung, kerucut, bola) dan tiga kolom (permukaan datar, permukaan lengkung, menggelinding) |
| 7 | Picture | Beri Nama Bangun Ruang | `drag-name-tags` | ronde 1: Kubus, Balok, Tabung, Kerucut, Bola; ronde 2: Bola, Kerucut, Balok, Kubus, Tabung |
| 8 | Abstract | Benar atau Salah? | `true-false-statements` | ronde 1: 5 pernyataan (3 benar); ronde 2: 5 pernyataan (3 benar) |
| 9 | Abstract | Detektif Bangun Ruang | `clue-detective-solids` | 4 ronde, tiap ronde dua petunjuk tertulis dan tiga pilihan nama |
| 10 | Abstract | Susun Kalimat | `build-sentence-from-tiles` | ronde 1: Bangun ruang dapat diisi; ronde 2: Kubus dan balok mempunyai permukaan datar; ronde 3: Bola mempunyai permukaan lengkung |

### Permainan 1. Lereng Gelinding (Concrete)

- **Rujukan buku.** hlm. 91 (Ayo Mencoba 1: gelindingkan benda-benda; benda mana yang dapat menggelinding?)
- **Tujuan.** Mencoba menggelindingkan benda nyata dan menyimpulkan bahwa permukaan lengkung mudah menggelinding.
- **Cara main.** Dua ronde, masing-masing lima benda (topi ulang tahun, dadu, botol, kardus, bola; lalu kaleng, kelereng, kotak pensil, kerucut es krim, kotak hadiah). Siswa mengetuk benda untuk melepasnya di lereng, melihat yang menggelinding dan yang diam, lalu memilih semua benda yang menggelinding dan alasannya.
- **Ronde.** ronde 1: Topi ulang tahun, Dadu, Botol minum, Kardus, Bola; ronde 2: Kaleng susu, Kelereng, Kotak pensil, Kerucut es krim, Kotak hadiah
- **Panduan suara.** Lepas tiap benda di lereng, lalu pilih yang menggelinding.

### Permainan 2. Tas Misteri (Concrete)

- **Rujukan buku.** hlm. 91–92 (bangun ruang dibedakan berdasarkan permukaannya), diperkaya tas misteri Montessori
- **Tujuan.** Menebak nama bangun ruang dari ciri-ciri yang dirasakan tanpa melihat bendanya.
- **Cara main.** Tiga ronde (kubus, kerucut, bola). Benda tersembunyi di dalam tas. Siswa menekan tombol Raba untuk membuka petunjuk satu per satu, lalu menebak nama bangun ruang dari lima pilihan. Semakin sedikit petunjuk yang dipakai, semakin banyak bintang.
- **Ronde.** Kubus, Kerucut, Bola
- **Panduan suara.** Raba untuk membuka petunjuk, lalu tebak namanya.

### Permainan 3. Cetak dan Tebak (Concrete)

- **Rujukan buku.** hlm. 90–92 (bangun datar dan bangun ruang; kubus dan balok berpermukaan segi empat), diperkaya cetak permukaan
- **Tujuan.** Mencetak permukaan benda dan menyebut bangun datar hasil cetakannya.
- **Cara main.** Empat ronde (dadu, kardus, kaleng, topi ulang tahun). Siswa memilih permukaan benda yang rata untuk dicetak. Permukaan lengkung tidak menghasilkan cetakan yang rapi. Setelah cetakan muncul, siswa memilih bangun datar hasilnya: segi empat sama sisi, segi empat beda sisi, atau lingkaran.
- **Ronde.** Dadu (segi empat sama sisi); Kardus (segi empat berbeda sisi); Kaleng susu (lingkaran); Topi ulang tahun (lingkaran)
- **Panduan suara.** Pilih permukaan yang rata untuk dicetak, lalu sebut bentuk cetakannya.

### Permainan 4. Pilah Rak Mainan (Concrete)

- **Rujukan buku.** hlm. 92 (Ayo Mencoba 2: temukan benda berbentuk bangun ruang dan kelompokkan dalam tabel)
- **Tujuan.** Mengelompokkan benda nyata menurut nama bangun ruangnya: kubus, balok, tabung, kerucut, atau bola.
- **Cara main.** Dua ronde, masing-masing lima benda (dadu, kardus, kaleng, topi, bola; lalu kotak hadiah, kotak pensil, botol, kerucut es krim, kelereng). Siswa menyeret atau mengetuk benda ke salah satu dari lima rak bernama. Benda yang salah kembali disertai ciri bendanya.
- **Ronde.** ronde 1: Dadu, Kardus, Kaleng susu, Topi ulang tahun, Bola; ronde 2: Kotak hadiah, Kotak pensil, Botol minum, Kerucut es krim, Kelereng
- **Panduan suara.** Seret tiap benda ke rak bangun ruang yang sesuai.

### Permainan 5. Bayangan Bangun Ruang (Picture)

- **Rujukan buku.** hlm. 90–92 (hubungan bangun datar dan bangun ruang), diperkaya pandangan atas dan samping
- **Tujuan.** Menentukan bangun datar yang tampak bila bangun ruang dilihat dari atas atau dari samping.
- **Cara main.** Empat ronde (kubus dari atas, kerucut dari samping, tabung dari atas, balok dari samping). Model bangun ruang digambar bersama arah pandangnya. Siswa memilih satu dari tiga bayangan bangun datar yang sesuai.
- **Ronde.** Kubus dari atas; Kerucut dari samping; Tabung dari atas; Balok dari samping
- **Panduan suara.** Lihat arah pandangnya, lalu pilih bayangan yang tepat.

### Permainan 6. Tabel Permukaan (Picture)

- **Rujukan buku.** hlm. 91–93 (Ayo Berlatih nomor 1: kelompokkan benda menurut permukaan datar dan permukaan lengkung)
- **Tujuan.** Mengisi tabel permukaan datar, permukaan lengkung, dan menggelinding untuk lima bangun ruang.
- **Cara main.** Satu tabel dengan lima baris (kubus, balok, tabung, kerucut, bola) dan tiga kolom: permukaan datar, permukaan lengkung, dan menggelinding. Siswa mengetuk kotak yang benar pada tiap baris, lalu menekan periksa. Jawaban yang keliru dijelaskan per baris.
- **Ronde.** lima baris (kubus, balok, tabung, kerucut, bola) dan tiga kolom (permukaan datar, permukaan lengkung, menggelinding)
- **Panduan suara.** Centang kotak yang benar pada tiap baris, lalu periksa.

### Permainan 7. Beri Nama Bangun Ruang (Picture)

- **Rujukan buku.** hlm. 93 dan 98 (Ayo Berlatih nomor 2: tulis nama bangun ruang; Evaluasi nomor 6)
- **Tujuan.** Memberi nama pada gambar bangun ruang dengan menyeret label nama.
- **Cara main.** Dua ronde, masing-masing lima model bangun ruang dengan urutan berbeda. Siswa menyeret label Kubus, Balok, Tabung, Kerucut, dan Bola ke model yang sesuai, atau mengetuk label lalu mengetuk model. Label yang salah ditolak disertai ciri modelnya.
- **Ronde.** ronde 1: Kubus, Balok, Tabung, Kerucut, Bola; ronde 2: Bola, Kerucut, Balok, Kubus, Tabung
- **Panduan suara.** Seret label nama ke model bangun ruang yang sesuai.

### Permainan 8. Benar atau Salah? (Abstract)

- **Rujukan buku.** hlm. 90–92 (ciri-ciri bangun datar, bangun ruang, kubus, dan balok)
- **Tujuan.** Menilai kebenaran pernyataan tentang bangun datar, bangun ruang, dan ciri kelima bangun ruang.
- **Cara main.** Dua ronde, masing-masing lima pernyataan. Siswa menekan Benar atau Salah. Jawaban yang keliru dijelaskan alasannya.
- **Ronde.** ronde 1: 5 pernyataan (3 benar); ronde 2: 5 pernyataan (3 benar)
- **Panduan suara.** Baca pernyataannya, lalu tekan Benar atau Salah.

### Permainan 9. Detektif Bangun Ruang (Abstract)

- **Rujukan buku.** hlm. 91–92 (ciri permukaan, nama bangun ruang)
- **Tujuan.** Menemukan nama bangun ruang dari dua petunjuk tertulis.
- **Cara main.** Empat ronde, tiap ronde dua petunjuk dan tiga pilihan nama bangun ruang. Siswa memilih nama yang cocok dengan kedua petunjuk. Petunjuk dibacakan Suara Guru.
- **Ronde.** 4 ronde, tiap ronde dua petunjuk tertulis dan tiga pilihan nama
- **Panduan suara.** Baca kedua petunjuk, lalu pilih namanya.

### Permainan 10. Susun Kalimat (Abstract)

- **Rujukan buku.** hlm. 90–92 (kalimat definisi: bangun ruang dapat diisi; kubus dan balok punya permukaan datar)
- **Tujuan.** Menyusun kalimat ciri bangun ruang dari kartu kata dengan urutan yang benar.
- **Cara main.** Tiga ronde, tiap ronde satu kalimat dari kartu kata yang teracak, dengan satu kartu pengecoh. Siswa mengetuk kartu kata berurutan untuk menyusun kalimat, bisa mengurungkan satu kartu, lalu menekan periksa.
- **Ronde.** ronde 1: Bangun ruang dapat diisi; ronde 2: Kubus dan balok mempunyai permukaan datar; ronde 3: Bola mempunyai permukaan lengkung
- **Panduan suara.** Ketuk kartu kata berurutan sampai kalimatnya benar.

## 8. Poin Penting dan Catatanku

- 🧺 **Datar atau ruang**: bisa diisi = bangun ruang. _Suara:_ Bangun datar hanya punya satu permukaan dan tidak bisa diisi. Bangun ruang punya ruang di dalamnya, jadi dapat diisi.
- 🤚 **Permukaan**: datar: kubus, balok • lengkung: tabung, kerucut, bola. _Suara:_ Kubus dan balok punya permukaan datar. Tabung, kerucut, dan bola punya permukaan lengkung, jadi mudah menggelinding.
- 🎲 **Kubus dan balok**: kubus: segi empat sama • balok: segi empat beda. _Suara:_ Kubus mempunyai permukaan segi empat yang sama ukurannya. Balok mempunyai permukaan segi empat yang berbeda ukurannya.
- 🥫 **Tabung, kerucut, bola**: kaleng • topi • bola sepak. _Suara:_ Tabung seperti kaleng. Kerucut seperti topi ulang tahun. Bola seperti bola sepak. Ketiganya bisa menggelinding.
- 🖨️ **Cetak permukaan**: kubus → segi empat • kaleng → lingkaran. _Suara:_ Permukaan bangun ruang bisa dicetak. Kubus menghasilkan segi empat, dan alas kaleng menghasilkan lingkaran.

**Suara Poin Penting.** Ingat selalu! Bangun datar hanya punya satu permukaan dan tidak bisa diisi. Bangun ruang bisa diisi. Kubus dan balok punya permukaan datar. Tabung, kerucut, dan bola punya permukaan lengkung dan mudah menggelinding. Kubus punya segi empat yang sama ukurannya, balok punya segi empat yang berbeda ukurannya.

**Cara menyebutkan.** Dadu berbentuk kubus karena permukaannya segi empat sama. _Suara:_ Cara menyebutkan bangun ruang. Dadu berbentuk kubus karena semua permukaannya segi empat yang sama ukurannya.

**Ayo Mencoba di rumah.** Ayo Mencoba di rumah: kumpulkan benda berbentuk bangun ruang, misalnya kardus, kaleng, bola, dan topi. Gelindingkan masing-masing, lalu kelompokkan menjadi yang menggelinding dan yang tidak. Tulis hasilnya di tabel dan ceritakan kepada keluargamu.

**Refleksi (Catatanku).**

- Aku dapat membedakan bangun datar dan bangun ruang.
- Aku dapat memberi nama bangun ruang sesuai dengan ciri-cirinya.
- Aku dapat mengelompokkan bangun ruang menurut permukaannya.
- Aku menyampaikan pendapat dengan percaya diri.

## 9. Metode dari luar buku yang diadopsi

- **Tas misteri (mystery bag) Montessori**: mengenali bangun ruang dengan meraba, tanpa melihat. Dasar permainan Tas Misteri dengan sistem bintang menurut banyak petunjuk.
- **Percobaan menggelindingkan benda di lereng** untuk menemukan hubungan permukaan lengkung dan kemampuan menggelinding.
- **Mencetak permukaan (face printing)** untuk menghubungkan bangun ruang dengan bangun datar pada permukaannya.
- **Pandangan atas dan samping (orthographic views)**: bayangan bangun ruang dari arah berbeda berupa bangun datar.
- **Pembedaan bangun datar dan bangun ruang lewat uji isi**: benda yang bisa diisi punya ruang di dalam.

## 10. Batas yang diketahui

- Soal Latihan (30 poin), soal Ujian (70 poin), dan Simulasi belum dibuat. Pemilik akan menugaskannya terpisah. Sampai saat itu tab Latihan dan Ujian menampilkan kartu "sedang disiapkan".
- Suara dan ketukan video diuji dengan suara perangkat di Chrome desktop berukuran ponsel. Pada sebagian Android, tombol Jeda tidak menghentikan suara di tengah kalimat (Web Speech `pause()` tidak didukung merata).
- Laju 0,70 dan nada 1 sama untuk Bu Sari dan Pak Budi. Beda guru hanya pada suara yang dipilih perangkat (wanita atau pria). Perangkat yang hanya punya satu suara Indonesia akan membuat kedua guru terdengar serupa.
- Penggolongan mengikuti buku: kubus dan balok berpermukaan datar, sedangkan tabung, kerucut, dan bola berpermukaan lengkung dan bisa menggelinding. Naskah menambahkan catatan bahwa alas tabung dan alas kerucut berbentuk lingkaran (datar) supaya tidak bertentangan dengan permainan Cetak dan Tebak.

