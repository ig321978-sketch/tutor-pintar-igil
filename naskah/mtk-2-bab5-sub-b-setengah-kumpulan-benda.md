# Naskah Matematika Kelas 2 SD, Bab 5: Pecahan, Sub-Bab B: Setengah dari Kumpulan Benda

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k2b5.ts` dan `src/components/modul/data-k2b5.ts`, oleh `scripts/buat-naskah-md-k2b5.mjs`. Isi mengikuti Buku Siswa Matematika Kelas II (Kemendikbudristek, Kurikulum Merdeka, Bab 5 hlm. 125–154) dan diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban tidak ada di berkas ini.

## 1. Identitas modul

| Butir | Isi |
|---|---|
| Modul | `mtk-2-bab5`, sub-bab B |
| Berkas data | `src/data/kelas2-bab5.json` (dibangkitkan `src/content-master/buat-k2-bab5.mjs`, lalu `npm run sync:keys`) |
| Kode bab di server | `k2-mat-bab5` (belum ada seed server karena soal belum ada) |
| Fase dan kelas | `FASE_A`, kelas 2 SD |
| Elemen | 🌈 Fase A • Elemen Bilangan: Pecahan (Kelas 2 SD/MI) |
| Poin Kualifikasi per bab | Latihan 30 dan Ujian 70 (terbit setelah soalnya ada). Praktikum 50 terbit sekali per blok empat bab. |
| Suara Guru | Murni Web Speech API bawaan perangkat (`id-ID`), **laju 0,70 dan nada 1**. Tanpa berkas audio statis, tanpa ElevenLabs. |
| Panggilan API saat siswa belajar | Nol. Seluruh tahap Materi berjalan di klien. |
| Tab Simulasi, Latihan, Ujian | Belum diisi. Latihan dan Ujian menampilkan kartu "sedang disiapkan". Tab Simulasi tidak tampil. |
| Bab 4 | Dilewati sesuai urutan perintah pemilik; modul Bab 4 belum dibuat. |

## 2. Capaian dan tujuan pembelajaran

**Capaian Pembelajaran (CP).** Siswa menunjukkan setengah dari sekumpulan benda dengan membagi benda menjadi dua kelompok sama banyak, membedakan kelompok yang menunjukkan setengah dari yang bukan, serta menjelaskan cara menemukan hasilnya.

**Rujukan.** Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 5: Pecahan, Sub-Bab B hlm. 135–141).

**Sasaran.** Siswa menemukan setengah dari sekumpulan benda dengan membagi benda menjadi dua kelompok yang sama banyak, memeriksa kelompok yang bukan setengah, menemukan pola setengah dari 4, 6, 8, dan 10, serta menyadari bahwa banyak benda yang tidak bisa dibagi dua sama banyak tidak punya setengah utuh.

**Suara Silabus.** Kita belajar setengah dari kumpulan benda. Malosi mempunyai empat kelereng dan ingin memberi setengahnya kepada Upe. Kita membagi kelereng menjadi dua kelompok yang sama banyak, satu untuk Upe dan satu untuk Malosi. Kita juga memeriksa kelompok yang bukan setengah dan mencari pola. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.

## 3. Peta enam tahap SMICPA dan bobotnya

| Tahap | Isi | Banyak butir |
|---|---|---|
| S. Story | Video animasi HTML/SVG satu layar seperti Kelas 2 Bab 1: tiga cerita disusun berurutan dalam satu pemutar, mulai saat Mulai diketuk (tidak ada putar otomatis) | 3 cerita, 9 adegan, 32 ketukan |
| M. Mind-Map | Peta pikiran "Taman Ide": matahari berwajah Igil di tengah, kartu bernomor di kiri dan kanan dengan cabang berwarna. Kartu hanya memuat ikon dan judul, uraiannya dibacakan Suara Guru saat kartu diketuk | 8 langkah |
| I. Infografis | Poster rangkuman, suara di tiap panel | 10 panel |
| C. Concrete | Benda nyata yang dipotong, dilipat, dituang, dibagi, dan dipasangkan | 4 permainan |
| P. Picture | Diagram polos: bangun berbagi bagian, titik dan garis, tabel pilihan | 3 permainan |
| A. Abstract | Kata dan lambang: kalimat, tabel, petunjuk tertulis, peta konsep | 3 permainan |

Bobot mengikuti isi buku. Aturan Concrete dan Picture berlaku: benda berwarna hanya di Concrete, Picture hanya diagram tanpa gambar benda (bangun polos, titik, dan lingkaran polos).

## 4. Tahap 1: Story (video animasi, menggantikan slide)

Tampilannya satu layar, sama dengan Kelas 2 Bab 1. Tidak ada adegan yang berjalan sendiri. Siswa mengetuk **▶ Mulai**, lalu ketiga cerita berjalan berurutan sebagai satu video. Nomor adegan bisa diketuk untuk melompat. Setiap kalimat adalah satu ketukan: dibacakan Suara Guru perangkat, dan gambar berubah mengikuti kalimat yang sedang dibacakan. Ada tombol Jeda, Ulang, dan Suara hidup atau mati.

### Cerita 1: Kelereng Malosi (Bagi sama banyak)

**Adegan 1. Malosi dan Upe bermain** (`K2B5B-V1-1`)

1. Malosi dan Upe akan bermain kelereng bersama.  
   _Papan layar:_ Bermain kelereng
2. Malosi mempunyai 4 kelereng. Upe tidak membawa kelereng.  
   _Papan layar:_ Malosi: 4 kelereng
3. Malosi ingin memberikan setengah dari kelerengnya kepada Upe.  
   _Papan layar:_ Beri setengah
4. Berapa banyak kelereng yang didapatkan Upe?  
   _Papan layar:_ Upe dapat berapa?

**Adegan 2. Membagi bergantian** (`K2B5B-V1-2`)

1. Mula-mula ada 4 kelereng. Kelereng akan dibagi sama banyak untuk Upe dan Malosi.  
   _Papan layar:_ Ada 4 kelereng
2. Kita ambil 2 kelereng. Satu untuk Upe dan satu untuk Malosi. Tersisa 2 kelereng.  
   _Papan layar:_ Ambil 2, sisa 2
3. Kita ambil lagi 2 kelereng. Satu untuk Upe dan satu untuk Malosi.  
   _Papan layar:_ Ambil 2 lagi
4. Upe dan Malosi masing-masing mendapat 2 kelereng.  
   _Papan layar:_ Masing-masing 2

**Adegan 3. Jadi, setengahnya** (`K2B5B-V1-3`)

1. Kita dapat menemukan setengah dari sekumpulan benda.  
   _Papan layar:_ Setengah kumpulan
2. Kita mengelompokkan benda-benda itu menjadi dua bagian sama banyak.  
   _Papan layar:_ Dua kelompok sama banyak
3. Jadi, setengah dari 4 kelereng adalah 2 kelereng.  
   _Papan layar:_ Setengah dari 4 = 2

### Cerita 2: Ikan di Akuarium (Setengah dan bukan setengah)

**Adegan 4. Halim dan enam ikan** (`K2B5B-V2-1`)

1. Ada 6 ikan dalam akuarium.  
   _Papan layar:_ Ada 6 ikan
2. Halim akan memasukkan ikan itu ke dalam dua tempat sehingga sama banyak.  
   _Papan layar:_ Dua tempat sama banyak
3. Halim akan menemukan setengah dari enam ikan.  
   _Papan layar:_ Cari setengahnya

**Adegan 5. Setengah dari 6 ikan** (`K2B5B-V2-2`)

1. Kita membagi 6 ikan menjadi dua kelompok sama banyak.  
   _Papan layar:_ Dua kelompok sama
2. Masing-masing berisi 3 ikan.  
   _Papan layar:_ Masing-masing 3
3. Jadi, setengah dari 6 ikan adalah 3 ikan.  
   _Papan layar:_ Setengah dari 6 = 3

**Adegan 6. Bukan setengah** (`K2B5B-V2-3`)

1. Sekarang, kita membagi 6 ikan menjadi dua kelompok, tetapi tidak sama banyak.  
   _Papan layar:_ Tidak sama banyak
2. Satu kelompok berisi 4 ikan dan satu kelompok berisi 2 ikan.  
   _Papan layar:_ 4 ikan dan 2 ikan
3. Itu tidak dapat dikatakan setengah dari 6 ikan.  
   _Papan layar:_ Bukan setengah
4. Setengah selalu berarti dua kelompok yang sama banyak.  
   _Papan layar:_ Harus sama banyak

### Cerita 3: Ayo Berbagi Lagi (Pola setengah)

**Adegan 7. Delapan pensil Tika** (`K2B5B-V3-1`)

1. Tika mempunyai 8 pensil.  
   _Papan layar:_ Tika: 8 pensil
2. Tika mengelompokkan semua pensilnya menjadi dua bagian sama banyak.  
   _Papan layar:_ Dua bagian sama banyak
3. Setiap bagian berisi 4 pensil, jadi setengah dari 8 pensil adalah 4 pensil.  
   _Papan layar:_ Setengah dari 8 = 4

**Adegan 8. Mencari pola** (`K2B5B-V3-2`)

1. Setengah dari 4 adalah 2.  
   _Papan layar:_ 4 → 2
2. Setengah dari 6 adalah 3, dan setengah dari 8 adalah 4.  
   _Papan layar:_ 6 → 3 dan 8 → 4
3. Setengah dari 10 adalah 5.  
   _Papan layar:_ 10 → 5
4. Semakin banyak bendanya, semakin banyak setengahnya.  
   _Papan layar:_ Ada pola setengah

**Adegan 9. Kalau banyaknya ganjil** (`K2B5B-V3-3`)

1. Bagaimana kalau ada 5 kelereng?  
   _Papan layar:_ Ada 5 kelereng
2. Kita bagi satu untuk Upe dan satu untuk Malosi sampai habis.  
   _Papan layar:_ Bagi bergantian
3. Tersisa satu kelereng, jadi 5 tidak bisa dibagi dua sama banyak.  
   _Papan layar:_ Tersisa satu
4. Kalau kelerengnya tidak boleh dipecah, 5 kelereng tidak punya setengah.  
   _Papan layar:_ 5 tak bisa dibagi dua

## 5. Tahap 2: Mind-Map (peta pikiran)

Tampilan "Taman Ide": matahari berwajah Igil di tengah, kartu bernomor di kiri dan kanan dihubungkan cabang berwarna. Setiap kartu hanya memuat nomor, ikon, dan judul langkah. Uraian di bawah dibacakan Suara Guru saat kartu diketuk dan tidak tampil di layar.

**1. Dari Benda Utuh ke Kumpulan Benda** 🔵  
Di Sub-Bab A kita membagi satu benda utuh. Sekarang kita membagi sekumpulan benda yang terdiri dari banyak benda kecil, seperti kelereng, ikan, dan pensil. Aturannya tetap sama: kita membuat dua bagian yang sama. Bedanya, bagian itu sekarang dihitung dari banyaknya benda, bukan dari luasnya.

_Alur:_ Benda utuh → Membagi sama banyak

**2. Membagi Sama Banyak** ⚖️  
Untuk menemukan setengah dari kumpulan benda, kita mengelompokkan benda menjadi dua bagian yang sama banyak. Kedua kelompok harus berisi jumlah benda yang sama. Kalau satu kelompok lebih banyak, itu bukan setengah. Hitung kedua kelompok untuk memeriksanya.

_Alur:_ Membagi sama banyak → Satu untukmu, satu untukku

**3. Satu untukmu, Satu untukku** 🤝  
Cara membagi yang mudah adalah memberi satu benda untuk Upe, lalu satu benda untuk Malosi, bergantian sampai habis. Cara ini adil dan tidak perlu menghitung di awal. Pada akhirnya kita menghitung berapa benda yang dimiliki masing-masing. Itulah hasil setengahnya.

_Alur:_ Satu untukmu, satu untukku → Setengah dari empat kelereng

**4. Setengah dari Empat Kelereng** 🎯  
Malosi mempunyai 4 kelereng. Kita ambil 2 kelereng, satu untuk Upe dan satu untuk Malosi, tersisa 2. Kita ambil 2 lagi, satu untuk Upe dan satu untuk Malosi. Upe dan Malosi masing-masing mendapat 2 kelereng. Jadi setengah dari 4 kelereng adalah 2 kelereng.

_Alur:_ Setengah dari empat kelereng → Setengah atau bukan setengah

**5. Setengah atau Bukan Setengah?** 🐟  
Halim mempunyai 6 ikan. Kalau dibagi 3 dan 3, itu setengah dari 6 ikan. Kalau dibagi 4 dan 2, itu bukan setengah karena tidak sama banyak. Jumlah semua ikan tetap 6, tetapi pembagiannya yang menentukan setengah atau bukan.

_Alur:_ Setengah atau bukan setengah → Pola setengah

**6. Pola Setengah** 🔢  
Setengah dari 4 adalah 2. Setengah dari 6 adalah 3. Setengah dari 8 adalah 4. Setengah dari 10 adalah 5. Lihat polanya: setiap bertambah 2 benda, setengahnya bertambah 1. Pola ini membantu kita menebak setengah dari 12, yaitu 6.

_Alur:_ Pola setengah → Kalau banyaknya ganjil

**7. Kalau Banyaknya Ganjil** ❓  
Bagaimana dengan 5 kelereng? Kita bagi bergantian satu untuk Upe dan satu untuk Malosi. Setelah dua putaran, tersisa satu kelereng yang tidak bisa dibagi sama banyak. Kalau kelereng tidak boleh dipecah, 5 tidak punya setengah. Bilangan 2, 4, 6, 8, dan 10 bisa dibagi dua sama banyak.

_Alur:_ Kalau banyaknya ganjil → Memeriksa dengan menggabung

**8. Memeriksa dengan Menggabung** ➕  
Untuk memeriksa hasil, gabungkan kembali kedua kelompok. Dua kelompok yang masing-masing 3 ikan digabung menjadi 6 ikan, sama dengan jumlah semula. Kalau hasil gabungannya sama dengan jumlah semula dan kedua kelompok sama banyak, setengahnya sudah benar.

_Alur:_ Memeriksa dengan menggabung → Siap berbagi dengan adil

## 6. Tahap 3: Infografis

**Panel 1. Kelereng Malosi** 🔵 (4, Empat)

> Malosi mempunyai empat kelereng. Ia memberi setengah dari kelerengnya kepada Upe. Kelereng dibagi sama banyak, jadi Upe mendapat dua kelereng.

**Panel 2. Setengah dari Kumpulan Benda** 👫 (2, Dua)

> Setengah dari sekumpulan benda ditemukan dengan membagi benda menjadi dua kelompok yang sama banyak. Setiap kelompok adalah setengah dari seluruh benda.

**Panel 3. Satu untukmu, Satu untukku** 🤝 (2, Dua)

> Cara membagi adil: satu benda untuk Upe, satu benda untuk Malosi, bergantian sampai benda habis. Setelah itu hitung benda milik masing-masing.

**Panel 4. Setengah dari 4** 🎯 (2, Dua)

> Empat kelereng dibagi menjadi dua kelompok sama banyak. Masing-masing kelompok berisi dua kelereng. Jadi setengah dari empat adalah dua.

**Panel 5. Setengah dari 6 Ikan** 🐟 (3, Tiga)

> Enam ikan dibagi menjadi dua kelompok sama banyak, masing-masing tiga ikan. Jadi setengah dari enam ikan adalah tiga ikan.

**Panel 6. Bukan Setengah** ❌ (2, Dua)

> Enam ikan dibagi menjadi kelompok berisi empat ikan dan kelompok berisi dua ikan. Itu bukan setengah karena kedua kelompok tidak sama banyak.

**Panel 7. Delapan Pensil Tika** ✏️ (4, Empat)

> Tika mempunyai delapan pensil. Ia membaginya menjadi dua kelompok sama banyak, masing-masing empat pensil. Setengah dari delapan adalah empat.

**Panel 8. Pola Setengah** 🔢 (5, Lima)

> Setengah dari empat adalah dua. Setengah dari enam adalah tiga. Setengah dari delapan adalah empat. Setengah dari sepuluh adalah lima. Setiap bertambah dua, setengahnya bertambah satu.

**Panel 9. Kalau Banyaknya Ganjil** ❓ (5, Lima)

> Lima kelereng dibagi bergantian untuk dua anak. Setiap anak mendapat dua, dan tersisa satu. Lima tidak bisa dibagi dua sama banyak tanpa memecah kelereng.

**Panel 10. Periksa dengan Menggabung** ➕ (2, Dua)

> Untuk memeriksa, gabungkan kedua kelompok. Dua kelompok berisi tiga ikan digabung menjadi enam ikan, sama dengan jumlah semula. Itu tandanya setengahnya benar.

## 7. Tahap 4, 5, dan 6: sepuluh permainan

| No | Tahap | Permainan | Jenis | Ronde |
|---|---|---|---|---|
| 1 | Concrete | Bagi Kelereng Malosi dan Upe | `share-marbles-two-bowls` | 4 kelereng, 6 kelereng, 8 kelereng, 10 kelereng |
| 2 | Concrete | Neraca Setengah | `balance-scale-equal-groups` | 6 apel, 8 apel, 10 apel, 12 apel |
| 3 | Concrete | Pasang Berdua | `pair-up-and-halve` | 6 pensil, 8 jeruk, 7 balon (ganjil, tersisa satu), 10 ikan |
| 4 | Concrete | Kembalikan Jadi Utuh | `double-the-half` | setengahnya 3, seluruhnya 6; setengahnya 4, seluruhnya 8; setengahnya 5, seluruhnya 10; setengahnya 2, seluruhnya 4 |
| 5 | Picture | Lingkari Setengah | `circle-half-of-dots` | 6 titik, 8 titik, 10 titik, 12 titik |
| 6 | Picture | Garis Pembagi Titik | `dot-array-split-line` | 2 baris × 4 kolom (2 garis sah); 3 baris × 4 kolom (1 garis sah); 2 baris × 5 kolom (1 garis sah); 3 baris × 3 kolom (0 garis sah) |
| 7 | Picture | Satu-Satu Antar Kelompok | `one-to-one-link-groups` | 4 dan 4 (sama banyak); 4 dan 2 (tidak sama); 3 dan 3 (sama banyak); 5 dan 3 (tidak sama) |
| 8 | Abstract | Isi Tabel Setengah | `fill-table-halves` | ronde 1: tulis setengahnya (4 baris); ronde 2: tulis banyak seluruhnya (4 baris) |
| 9 | Abstract | Detektif Bilangan | `clue-detective-numbers` | 4 ronde, tiap ronde dua petunjuk tertulis dan tiga pilihan bilangan |
| 10 | Abstract | Bisa Dibagi Dua? | `sort-numbers-two-bins` | ronde 1: 2, 4, 5, 6, 7, 8; ronde 2: 3, 9, 10, 11, 12, 14 |

### Permainan 1. Bagi Kelereng Malosi dan Upe (Concrete)

- **Rujukan buku.** hlm. 135–136 (Malosi dan Upe bermain kelereng; setengah dari 4 kelereng adalah 2 kelereng)
- **Tujuan.** Membagi sekumpulan kelereng ke dua mangkuk sampai sama banyak, lalu menyebut setengah dari seluruh kelereng.
- **Cara main.** Empat ronde (4, 6, 8, dan 10 kelereng). Siswa menyeret atau mengetuk kelereng dari meja ke mangkuk Upe atau mangkuk Malosi, dan mengetuk kelereng di mangkuk untuk mengembalikannya. Bila meja kosong dan kedua mangkuk sama banyak, siswa memilih banyak kelereng setengahnya. Bila belum sama, layar memberi petunjuk untuk memindahkan.
- **Ronde.** 4 kelereng, 6 kelereng, 8 kelereng, 10 kelereng
- **Panduan suara.** Bagi kelereng satu untuk Upe, satu untuk Malosi, sampai sama banyak.

### Permainan 2. Neraca Setengah (Concrete)

- **Rujukan buku.** hlm. 136–137 (membagi kelompok menjadi dua bagian sama banyak; setengah dari 6 ikan)
- **Tujuan.** Menempatkan benda di dua piringan neraca sampai neraca seimbang, yang menunjukkan dua kelompok sama banyak.
- **Cara main.** Empat ronde (6, 8, 10, dan 12 apel). Siswa menaruh apel dari meja ke piringan kiri atau kanan. Neraca miring ke sisi yang lebih banyak dan datar bila seimbang. Setelah seimbang dan meja kosong, siswa memilih banyak apel di satu piringan sebagai setengahnya.
- **Ronde.** 6 apel, 8 apel, 10 apel, 12 apel
- **Panduan suara.** Taruh apel di kedua piringan sampai neraca seimbang.

### Permainan 3. Pasang Berdua (Concrete)

- **Rujukan buku.** hlm. 136–137 (satu untuk Upe dan satu untuk Malosi; kelompok sama banyak), diperkaya pemasangan satu-satu
- **Tujuan.** Memasangkan benda berdua-berdua, menghitung pasangan sebagai setengah, dan menemukan bahwa benda ganjil menyisakan satu.
- **Cara main.** Empat ronde (6 pensil, 8 jeruk, 7 balon, dan 10 ikan). Siswa mengetuk dua benda berturut-turut untuk memasangkannya. Setelah semua benda berpasangan, banyak pasangan ditanyakan sebagai setengahnya. Pada ronde 7 balon tersisa satu, dan siswa menjawab apakah benda bisa dibagi dua sama banyak.
- **Ronde.** 6 pensil, 8 jeruk, 7 balon (ganjil, tersisa satu), 10 ikan
- **Panduan suara.** Ketuk dua benda untuk memasangkan, sampai semuanya berpasangan.

### Permainan 4. Kembalikan Jadi Utuh (Concrete)

- **Rujukan buku.** hlm. 136–139 (setengah dari sekumpulan benda; setengah dari 8 pensil), diperkaya hubungan balik setengah ke seluruhnya
- **Tujuan.** Menggandakan kelompok setengah menjadi kumpulan utuh dan menyebut banyak seluruh benda.
- **Cara main.** Empat ronde (setengahnya 3 pensil, 4 jeruk, 5 ikan, dan 2 balon). Layar menampilkan satu kelompok setengah. Siswa menekan Tambah Kelompok untuk menambah kelompok yang sama banyak, lalu memilih banyak seluruh benda dari tiga pilihan.
- **Ronde.** setengahnya 3, seluruhnya 6; setengahnya 4, seluruhnya 8; setengahnya 5, seluruhnya 10; setengahnya 2, seluruhnya 4
- **Panduan suara.** Tambah kelompok yang sama banyak, lalu pilih banyak seluruhnya.

### Permainan 5. Lingkari Setengah (Picture)

- **Rujukan buku.** hlm. 138–141 (Ayo Berlatih nomor 1 sampai 4: lingkari atau warnai setengah dari kelompok benda)
- **Tujuan.** Memilih titik-titik sehingga yang dipilih tepat setengah dari seluruh titik.
- **Cara main.** Empat ronde (6, 8, 10, dan 12 titik polos). Siswa mengetuk titik untuk memilih. Titik yang dipilih diberi lingkaran dan dihitung. Setelah menekan Periksa, program memeriksa bahwa yang dipilih dan yang tidak dipilih sama banyak.
- **Ronde.** 6 titik, 8 titik, 10 titik, 12 titik
- **Panduan suara.** Ketuk titik sampai yang dipilih tepat setengahnya.

### Permainan 6. Garis Pembagi Titik (Picture)

- **Rujukan buku.** hlm. 137–139 (menjadi dua kelompok sama banyak atau tidak sama banyak)
- **Tujuan.** Memilih garis pemisah yang membagi larik titik menjadi dua kelompok sama banyak, atau menyatakan tidak ada garis yang bisa.
- **Cara main.** Empat ronde larik titik (2 baris 4 kolom, 3 baris 4 kolom, 2 baris 5 kolom, dan 3 baris 3 kolom). Siswa mengetuk celah di antara baris atau kolom untuk memasang garis pemisah, dan melihat banyak titik di tiap sisi. Pada larik 3 kali 3 siswa harus menyatakan tidak ada garis yang cocok.
- **Ronde.** 2 baris × 4 kolom (2 garis sah); 3 baris × 4 kolom (1 garis sah); 2 baris × 5 kolom (1 garis sah); 3 baris × 3 kolom (0 garis sah)
- **Panduan suara.** Pasang garis pemisah di celah sampai kedua sisi sama banyak.

### Permainan 7. Satu-Satu Antar Kelompok (Picture)

- **Rujukan buku.** hlm. 137 (dua kelompok sama banyak dan tidak sama banyak), diperkaya pemasangan satu-satu
- **Tujuan.** Menghubungkan titik kelompok kiri dan kanan satu demi satu untuk memutuskan apakah kedua kelompok sama banyak, sehingga menunjukkan setengah.
- **Cara main.** Empat ronde dua kelompok titik (4 dan 4, 4 dan 2, 3 dan 3, 5 dan 3). Siswa mengetuk satu titik kiri lalu satu titik kanan untuk menarik garis penghubung. Titik tanpa pasangan terlihat jelas. Siswa lalu memilih Setengah atau Bukan Setengah.
- **Ronde.** 4 dan 4 (sama banyak); 4 dan 2 (tidak sama); 3 dan 3 (sama banyak); 5 dan 3 (tidak sama)
- **Panduan suara.** Hubungkan satu titik kiri dengan satu titik kanan, lalu putuskan.

### Permainan 8. Isi Tabel Setengah (Abstract)

- **Rujukan buku.** hlm. 136–141 (setengah dari 4, 6, 8, 10 dan hubungan balik)
- **Tujuan.** Menuliskan setengah dari bilangan dan seluruh benda dari setengahnya dalam tabel.
- **Cara main.** Dua ronde. Ronde 1: tulis setengah dari 4, 6, 8, dan 10. Ronde 2: tulis banyak seluruhnya bila setengahnya 2, 5, 3, dan 4. Siswa mengetuk baris tabel, lalu mengetuk kartu angka yang tepat.
- **Ronde.** ronde 1: tulis setengahnya (4 baris); ronde 2: tulis banyak seluruhnya (4 baris)
- **Panduan suara.** Ketuk baris tabel, lalu pilih kartu angka yang tepat.

### Permainan 9. Detektif Bilangan (Abstract)

- **Rujukan buku.** hlm. 135–139 (setengah dari sekumpulan benda; menjelaskan cara menemukan hasilnya)
- **Tujuan.** Menemukan bilangan dari dua petunjuk tertulis tentang setengahnya.
- **Cara main.** Empat ronde, tiap ronde dua petunjuk dan tiga pilihan bilangan. Contoh: setengah dari bilanganku adalah 3. Siswa memilih bilangan yang cocok dengan kedua petunjuk. Petunjuk dibacakan Suara Guru.
- **Ronde.** 4 ronde, tiap ronde dua petunjuk tertulis dan tiga pilihan bilangan
- **Panduan suara.** Baca kedua petunjuk, lalu pilih bilangannya.

### Permainan 10. Bisa Dibagi Dua? (Abstract)

- **Rujukan buku.** hlm. 137 (setengah dari 6 ikan) dan 138 (coba lagi dengan 8 dan 10), diperkaya bilangan yang menyisakan satu
- **Tujuan.** Menentukan bilangan yang bisa dibagi dua sama banyak dan yang menyisakan satu.
- **Cara main.** Dua ronde, tiap ronde enam bilangan. Siswa menyeret atau mengetuk tiap bilangan ke kotak Bisa Dibagi Dua Sama Banyak atau kotak Tersisa Satu. Bilangan yang salah kembali dengan penjelasan hasil pembagiannya.
- **Ronde.** ronde 1: 2, 4, 5, 6, 7, 8; ronde 2: 3, 9, 10, 11, 12, 14
- **Panduan suara.** Taruh tiap bilangan ke kotak yang tepat.

## 8. Poin Penting dan Catatanku

- 👫 **Setengah kumpulan**: dua kelompok sama banyak. _Suara:_ Setengah dari sekumpulan benda ditemukan dengan membagi benda menjadi dua kelompok yang sama banyak. Setiap kelompok adalah setengahnya.
- 🤝 **Satu untukmu**: bagi bergantian sampai habis. _Suara:_ Bagi benda bergantian, satu untukmu dan satu untukku, sampai habis. Lalu hitung benda milik masing-masing.
- ❌ **Bukan setengah**: kelompok tidak sama banyak. _Suara:_ Kalau dua kelompok tidak sama banyak, itu bukan setengah. Enam ikan dibagi empat dan dua bukan setengah.
- 🔢 **Pola setengah**: 4 → 2, 6 → 3, 8 → 4, 10 → 5. _Suara:_ Setengah dari empat adalah dua, dari enam adalah tiga, dari delapan adalah empat, dan dari sepuluh adalah lima.
- ❓ **Ganjil menyisakan satu**: 5 tidak bisa dibagi dua sama banyak. _Suara:_ Lima kelereng dibagi dua menyisakan satu kelereng. Karena itu lima tidak bisa dibagi dua sama banyak tanpa memecah kelereng.

**Suara Poin Penting.** Ingat selalu! Setengah dari sekumpulan benda adalah satu dari dua kelompok yang sama banyak. Bagi benda bergantian sampai habis, lalu hitung. Kalau kelompok tidak sama banyak, itu bukan setengah. Setengah dari empat adalah dua, dari enam tiga, dari delapan empat, dan dari sepuluh lima.

**Cara menyebutkan.** Setengah dari 6 ikan adalah 3 ikan. _Suara:_ Cara menyebutkan. Setengah dari 6 ikan adalah 3 ikan.

**Ayo Mencoba di rumah.** Ayo Mencoba di rumah: ambil 6 sendok, 8 tutup botol, dan 10 kancing. Bagi masing-masing menjadi dua kelompok sama banyak bersama temanmu, lalu sebutkan setengahnya. Coba juga dengan 7 benda dan ceritakan apa yang terjadi.

**Refleksi (Catatanku).**

- Aku dapat menunjukkan setengah dari kumpulan benda.
- Aku dapat membedakan kelompok yang setengah dan yang bukan setengah.
- Aku dapat menjelaskan cara menemukan setengah dari kumpulan benda.
- Aku menyampaikan pendapat dengan percaya diri.

## 9. Metode dari luar buku yang diadopsi

- **Model himpunan (set model)**: pecahan sebagai bagian dari sekumpulan benda, bukan dari satu bangun. Dasar kurikulum Amerika Serikat untuk menghubungkan setengah dengan membagi bilangan.
- **Satu-satu (one-to-one correspondence)**: satu benda untukmu, satu benda untukku, bergantian sampai habis. Permainan Pasang Berdua dan Satu-Satu Antar Kelompok memakai prinsip ini sebelum anak belajar pembagian.
- **Neraca (balance model)**: dua kelompok sama banyak membuat neraca seimbang. Piringan miring ketika kelompok tidak sama banyak.
- **Garis pembagi pada larik titik (array)**: satu garis lurus membagi larik titik menjadi dua kelompok. Mesin menghitung semua garis sah, termasuk kasus 3 × 3 titik yang tidak punya garis pembagi.
- **Genap dan ganjil secara visual**: bilangan yang semua benda dapat berpasangan adalah bilangan yang bisa dibagi dua sama banyak. Diperkenalkan lewat pengalaman, tanpa istilah resmi.

## 10. Batas yang diketahui

- Soal Latihan (30 poin), soal Ujian (70 poin), dan Simulasi belum dibuat. Pemilik akan menugaskannya terpisah. Sampai saat itu tab Latihan dan Ujian menampilkan kartu "sedang disiapkan".
- Suara dan ketukan video diuji dengan suara perangkat di Chrome desktop berukuran ponsel. Pada sebagian Android, tombol Jeda tidak menghentikan suara di tengah kalimat (Web Speech `pause()` tidak didukung merata).
- Laju 0,70 dan nada 1 sama untuk Bu Sari dan Pak Budi. Beda guru hanya pada suara yang dipilih perangkat (wanita atau pria). Perangkat yang hanya punya satu suara Indonesia akan membuat kedua guru terdengar serupa.
- Ucapan memakai kata ("setengah", "seperempat") supaya suara perangkat tidak salah membaca lambang pecahan.
- Benda tidak dipecah. Bilangan ganjil dinyatakan "tidak punya setengah" karena kelereng, ikan, dan pensil tidak boleh dipotong. Pecahan dengan penyebut lain tidak dibahas pada kelas ini.

