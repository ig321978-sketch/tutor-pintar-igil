# Naskah Matematika Kelas 2 SD, Bab 6: Pengukuran, Sub-Bab A: Berat

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k2b6.ts` dan `src/components/modul/data-k2b6.ts`, oleh `scripts/buat-naskah-md-k2b6.mjs`. Isi mengikuti Buku Siswa Matematika Kelas II (Kemendikbudristek, Kurikulum Merdeka, Bab 6 hlm. 155–190) dan diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.

## 1. Identitas modul

| Butir | Isi |
|---|---|
| Modul | `mtk-2-bab6`, sub-bab A |
| Berkas data | `src/data/kelas2-bab6.json` (dibangkitkan `src/content-master/buat-k2-bab6.mjs`, lalu `npm run sync:keys`) |
| Kode bab di server | `k2-mat-bab6` (belum ada seed server karena soal belum ada) |
| Fase dan kelas | `FASE_A`, kelas 2 SD |
| Elemen | 🌈 Fase A • Elemen Pengukuran: Berat dan Waktu (Kelas 2 SD/MI) |
| Poin Kualifikasi per bab | Latihan 30 dan Ujian 70 (terbit setelah soalnya ada). Praktikum 50 terbit sekali per blok empat bab. |
| Suara Guru | Murni Web Speech API bawaan perangkat (`id-ID`), **laju 0,70 dan nada 1**. Tanpa berkas audio statis, tanpa ElevenLabs. |
| Panggilan API saat siswa belajar | Nol. Seluruh tahap Materi berjalan di klien. |
| Tab Simulasi, Latihan, Ujian | Belum diisi. Latihan dan Ujian menampilkan kartu "sedang disiapkan". Tab Simulasi tidak tampil. |
| Jumlah sub-bab | Dua (A dan B), sesuai daftar isi buku Bab 6. |
| Jumlah permainan | 30 per sub-bab: 10 Concrete, 10 Picture, 10 Abstract. Penomoran di layar 1 sampai 30. |

## 2. Capaian dan tujuan pembelajaran

**Capaian Pembelajaran (CP).** Siswa membandingkan berat benda secara langsung dengan kata lebih berat, lebih ringan, sama berat, paling berat, dan paling ringan, mengurutkan benda menurut beratnya, mengukur berat benda dengan satuan tidak baku, serta menyampaikan hasilnya dengan percaya diri.

**Rujukan.** Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 6: Pengukuran, Sub-Bab A hlm. 158–177).

**Sasaran.** Siswa membandingkan berat benda dengan timbangan jungkat-jungkit, gantungan baju, dan kedua tangan memakai kata lebih berat, lebih ringan, sama berat, paling berat, dan paling ringan, mengurutkan benda menurut beratnya, serta mengukur berat benda dengan satuan tidak baku (balok mainan, kelereng, koin, dan bola tenis) sambil memahami bahwa hasil ukur bergantung pada alat ukur yang dipakai.

**Suara Silabus.** Kita belajar berat. Enam sekawan piket membersihkan kelas, dan mereka mengangkat benda yang berat dan benda yang ringan. Kita membandingkan berat dua benda dengan timbangan jungkat-jungkit, gantungan baju, dan kedua tangan. Kita memakai kata lebih berat, lebih ringan, sama berat, paling berat, dan paling ringan. Kita juga mengukur berat boneka dengan bola tenis dan kelereng, lalu belajar bahwa hasil ukur bergantung pada alat ukur. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.

## 3. Peta enam tahap SMICPA dan bobotnya

| Tahap | Isi | Banyak butir |
|---|---|---|
| S. Story | Video animasi HTML/SVG, tiga video. Tiap video diputar satu per satu saat diketuk (tidak ada putar otomatis) | 3 video, 9 adegan, 36 ketukan |
| M. Mind-Map | Peta pikiran berurutan, tiap cabang bisa diketuk dan uraiannya tampil di layar | 8 langkah |
| I. Infografis | Poster rangkuman, suara di tiap panel | 10 panel |
| C. Concrete | Benda nyata: angkat, timbang, jodohkan, urutkan, tata keranjang | 10 permainan |
| P. Picture | Diagram polos: neraca balok berhuruf, titik, batang, goresan, tabel, garis angka | 10 permainan |
| A. Abstract | Kata dan angka: kalimat, benar-salah, hitung, tabel, detektif, peta konsep | 10 permainan |

Bobot mengikuti isi buku. Aturan Concrete dan Picture berlaku: benda berwarna hanya di Concrete, Picture hanya diagram tanpa gambar benda (balok berhuruf, titik, goresan, batang, muka jam, jalur jam).

## 4. Tahap 1: Story (video animasi, menggantikan slide)

Tidak ada video yang berjalan sendiri. Siswa mengetuk **▶ Putar** pada satu video. Video itu berjalan, dan video lain berhenti. Setiap kalimat adalah satu ketukan: dibacakan Suara Guru perangkat, dan gambar berubah mengikuti kalimat yang sedang dibacakan. Ada tombol Jeda, Ulang, dan Suara hidup atau mati.

### Video 1: Piket Membersihkan Kelas (Enam sekawan mengangkat benda)

**Adegan 1. Giliran piket** (`K2B6A-V1-1`)

1. Hari ini enam sekawan mendapat giliran piket membersihkan kelas.  
   _Papan layar:_ Giliran piket
2. Upe dan Halim mengangkat meja bersama, karena meja itu berat.  
   _Papan layar:_ Meja diangkat berdua
3. Malosi mengangkat dan menggeser kursi. Tika mengelap kaca jendela, dan Kira menyapu lantai.  
   _Papan layar:_ Kursi, jendela, lantai
4. Lili membersihkan debu di atas meja dengan kemoceng. Mereka bertanggung jawab dengan tugas masing-masing.  
   _Papan layar:_ Tanggung jawab

**Adegan 2. Berat atau ringan?** (`K2B6A-V1-2`)

1. Benda apa yang paling berat di kelas? Meja yang diangkat berdua itu.  
   _Papan layar:_ Paling berat: meja
2. Benda apa yang paling ringan? Kemoceng yang dipegang Lili itu.  
   _Papan layar:_ Paling ringan: kemoceng
3. Kita tahu karena meja perlu dua orang untuk mengangkatnya, sedangkan kemoceng cukup satu tangan.  
   _Papan layar:_ Dua orang atau satu tangan
4. Berat adalah seberapa kuat benda ditarik ke bawah. Makin berat bendanya, makin besar tenaga yang kita perlukan.  
   _Papan layar:_ Berat: tarikan ke bawah

**Adegan 3. Bercerita dengan kata berat** (`K2B6A-V1-3`)

1. Kita ceritakan benda-benda itu dengan kata lebih berat, paling berat, dan paling ringan.  
   _Papan layar:_ Kata berat
2. Meja lebih berat dari kursi. Kursi lebih berat dari kemoceng.  
   _Papan layar:_ Meja, kursi, kemoceng
3. Jadi meja paling berat, dan kemoceng paling ringan.  
   _Papan layar:_ Meja paling berat
4. Benda yang besar belum tentu paling berat. Karena itu kita perlu membandingkan dengan cara yang tepat.  
   _Papan layar:_ Besar belum tentu berat

### Video 2: Tiga Cara Membandingkan Berat (Jungkat-jungkit, gantungan baju, dua tangan)

**Adegan 1. Timbangan jungkat-jungkit** (`K2B6A-V2-1`)

1. Kita dapat membandingkan berat dua benda dengan tiga cara.  
   _Papan layar:_ Tiga cara
2. Cara pertama memakai timbangan jungkat-jungkit. Ini papan yang bagian tengahnya diam, dan ujungnya naik turun.  
   _Papan layar:_ Jungkat-jungkit
3. Taruh apel di satu ujung dan anggur di ujung yang lain. Ujung apel turun, karena apel lebih berat dari anggur.  
   _Papan layar:_ Apel turun, anggur naik
4. Posisi benda yang lebih berat berada lebih bawah. Posisi benda yang lebih ringan berada lebih atas.  
   _Papan layar:_ Berat di bawah, ringan di atas

**Adegan 2. Gantungan baju dan dua tangan** (`K2B6A-V2-2`)

1. Cara kedua memakai gantungan baju. Gantung satu benda di tiap ujung, lalu lihat ujung mana yang turun.  
   _Papan layar:_ Gantungan baju
2. Semangka dan apel. Ujung semangka turun, jadi semangka lebih berat dari apel.  
   _Papan layar:_ Semangka lebih berat
3. Cara ketiga memakai kedua tangan kita. Angkat satu benda di tiap tangan, lalu rasakan mana yang lebih berat.  
   _Papan layar:_ Dua tangan
4. Jeruk dan apel terasa sama berat. Kedua tangan tidak turun dan tidak naik.  
   _Papan layar:_ Jeruk sama berat dengan apel

**Adegan 3. Paling berat, paling ringan** (`K2B6A-V2-3`)

1. Ada empat buah: semangka, apel Malang, jeruk Medan, dan anggur.  
   _Papan layar:_ Empat buah
2. Semangka lebih berat dari apel, dan apel lebih berat dari anggur.  
   _Papan layar:_ Semangka, apel, anggur
3. Jadi semangka paling berat di antara ketiganya.  
   _Papan layar:_ Semangka paling berat
4. Anggur lebih ringan dari apel, dan lebih ringan dari semangka. Jadi anggur paling ringan.  
   _Papan layar:_ Anggur paling ringan

### Video 3: Tika Mengukur Berat Boneka (Memakai satuan tidak baku)

**Adegan 1. Satuan tidak baku** (`K2B6A-V3-1`)

1. Kita dapat mengukur berat benda memakai benda kecil lain yang ukurannya sama. Itu disebut satuan tidak baku.  
   _Papan layar:_ Satuan tidak baku
2. Contohnya mainan balok, kelereng, koin, dan bola tenis.  
   _Papan layar:_ Balok, kelereng, koin, bola
3. Tika ingin mengukur berat bonekanya memakai bola tenis.  
   _Papan layar:_ Boneka Tika
4. Ia menaruh bola tenis satu per satu di piringan yang lain.  
   _Papan layar:_ Taruh satu per satu

**Adegan 2. Satu, dua, tiga, empat** (`K2B6A-V3-2`)

1. Tika menaruh satu bola tenis. Boneka masih lebih berat dari satu bola tenis.  
   _Papan layar:_ 1 bola tenis
2. Tika menaruh dua bola tenis. Boneka masih lebih berat dari dua bola tenis.  
   _Papan layar:_ 2 bola tenis
3. Tika menaruh tiga bola tenis. Boneka masih lebih berat dari tiga bola tenis.  
   _Papan layar:_ 3 bola tenis
4. Tika menaruh empat bola tenis, dan timbangan seimbang. Berat satu boneka sama dengan empat bola tenis.  
   _Papan layar:_ 4 bola tenis: seimbang

**Adegan 3. Alat ukur yang berbeda** (`K2B6A-V3-3`)

1. Tika mengukur boneka itu lagi memakai kelereng.  
   _Papan layar:_ Pakai kelereng
2. Ternyata berat satu boneka sama dengan sepuluh kelereng.  
   _Papan layar:_ 10 kelereng
3. Berat boneka adalah empat bola tenis, dan juga sepuluh kelereng.  
   _Papan layar:_ 4 bola tenis atau 10 kelereng
4. Hasil pengukuran bisa berbeda-beda, karena bergantung pada benda yang kita pakai sebagai alat ukur.  
   _Papan layar:_ Bergantung alat ukur

## 5. Tahap 2: Mind-Map (peta pikiran)

**1. Apa Itu Berat?** 🏋️  
Berat adalah seberapa kuat sebuah benda ditarik ke bawah. Benda yang berat terasa sulit diangkat, dan benda yang ringan terasa mudah diangkat. Upe dan Halim mengangkat meja berdua karena meja itu berat, sedangkan Lili cukup memegang kemoceng dengan satu tangan karena kemoceng itu ringan. Dua kata ini, berat dan ringan, adalah kata pertama untuk bercerita tentang berat.

_Alur:_ Apa itu berat → Tiga cara menimbang

**2. Tiga Cara Membandingkan Berat** ⚖️  
Kita dapat membandingkan berat dua benda dengan timbangan jungkat-jungkit, gantungan baju, atau kedua tangan kita. Timbangan jungkat-jungkit adalah papan yang bagian tengahnya diam dan ujungnya naik turun. Gantungan baju bekerja dengan cara yang sama bila tiap ujungnya diberi satu benda. Kedua tangan cocok untuk benda kecil yang aman diangkat. Apa pun alatnya, kita selalu membandingkan dua benda yang ditaruh di sisi yang berbeda.

_Alur:_ Tiga cara menimbang → Posisi pada timbangan

**3. Posisi pada Timbangan** ↕️  
Posisi benda yang lebih berat berada lebih bawah, dan posisi benda yang lebih ringan berada lebih atas. Kalau kedua sisi sejajar dan datar, kedua benda sama berat. Jadi kita cukup melihat ke mana timbangan miring untuk tahu benda mana yang lebih berat. Apel pada timbangan turun, anggur naik, jadi apel lebih berat dari anggur.

_Alur:_ Posisi pada timbangan → Kata perbandingan

**4. Kata Perbandingan Berat** 🔤  
Ada lima kata untuk bercerita tentang berat. Lebih berat dan lebih ringan membandingkan dua benda. Sama berat dipakai bila timbangan seimbang. Paling berat dan paling ringan dipakai untuk membandingkan tiga benda atau lebih. Semangka lebih berat dari apel, dan apel lebih berat dari anggur, jadi semangka paling berat dan anggur paling ringan.

_Alur:_ Kata perbandingan → Besar belum tentu berat

**5. Besar Belum Tentu Berat** 🎈  
Ukuran besar belum tentu berarti berat. Balon yang besar sangat ringan, sedangkan batu kecil terasa berat. Kupu-kupu lebih ringan dari burung walaupun sayapnya lebar. Karena itu kita tidak boleh menebak berat hanya dari besarnya benda. Kita harus merasakan dengan tangan atau membuktikan dengan timbangan.

_Alur:_ Besar belum tentu berat → Tebak lalu buktikan

**6. Tebak Lalu Buktikan** 🔬  
Seorang ilmuwan cilik selalu menebak dulu, lalu membuktikan. Langkahnya empat: ambil dua benda, tebak benda mana yang lebih berat, timbang dengan kedua tangan, gantungan baju, atau jungkat-jungkit, lalu tulis hasilnya di tabel. Bila tebakanmu meleset, tidak apa-apa. Dari tebakan yang meleset kita belajar bahwa perasaan kita bisa keliru, dan timbangan membantu kita menjadi lebih teliti.

_Alur:_ Tebak lalu buktikan → Satuan tidak baku

**7. Satuan Tidak Baku** 🎾  
Kita juga dapat mengukur berat sebuah benda memakai benda kecil lain yang ukurannya sama, misalnya mainan balok, kelereng, koin, atau bola tenis. Ini disebut satuan tidak baku. Taruh benda yang diukur di satu piringan, lalu taruh satuan di piringan yang lain satu per satu sampai timbangan seimbang. Banyaknya satuan adalah hasil pengukuran. Satuan yang dipakai harus sama dan satu jenis, supaya hitungannya adil.

_Alur:_ Satuan tidak baku → Hasil bergantung alat ukur

**8. Hasil Bergantung pada Alat Ukur** 🧸  
Berat satu boneka sama dengan empat bola tenis, dan juga sama dengan sepuluh kelereng. Bonekanya sama, tetapi hasilnya berbeda, karena kelereng lebih ringan daripada bola tenis. Satuan yang lebih ringan memerlukan jumlah yang lebih banyak. Kita juga dapat menyusun rantai perbandingan: satu pepaya sama dengan dua mangga, dan satu mangga sama dengan dua manggis, jadi satu pepaya sama dengan empat manggis.

_Alur:_ Hasil bergantung alat ukur → Siap menimbang

## 6. Tahap 3: Infografis

**Panel 1. Tiga Cara Menimbang** ⚖️ (3, Tiga)

> Ada tiga cara membandingkan berat dua benda: timbangan jungkat-jungkit, gantungan baju, dan kedua tangan kita.

**Panel 2. Posisi pada Timbangan** ↕️ (2, Dua)

> Posisi benda yang lebih berat berada lebih bawah. Posisi benda yang lebih ringan berada lebih atas.

**Panel 3. Tiga Kata Perbandingan** 🔤 (3, Tiga)

> Untuk dua benda kita memakai tiga kata: lebih berat, lebih ringan, dan sama berat.

**Panel 4. Paling Berat dan Paling Ringan** 🏆 (2, Dua)

> Untuk tiga benda atau lebih kita memakai paling berat dan paling ringan. Semangka paling berat, anggur paling ringan.

**Panel 5. Besar Belum Tentu Berat** 🎈 (2, Dua)

> Balon yang besar sangat ringan, dan batu yang kecil terasa berat. Jangan menebak berat hanya dari besarnya benda.

**Panel 6. Empat Satuan Tidak Baku** 🎾 (4, Empat)

> Empat contoh satuan tidak baku: mainan balok, kelereng, koin, dan bola tenis. Semuanya benda kecil yang ukurannya sama.

**Panel 7. Cara Mengukur Berat** 🧸 (4, Empat)

> Empat langkah mengukur berat. Satu, tebak dulu. Dua, taruh satuan satu per satu. Tiga, berhenti saat seimbang. Empat, tulis hasilnya.

**Panel 8. Satu Boneka, Dua Hasil** 🔁 (2, Dua)

> Berat satu boneka sama dengan empat bola tenis, dan juga sama dengan sepuluh kelereng. Alat ukurnya berbeda, hasilnya berbeda.

**Panel 9. Satuan Ringan, Hitungan Banyak** 🔢 (2, Dua)

> Kelereng lebih ringan daripada bola tenis. Karena itu kita memerlukan lebih banyak kelereng, yaitu sepuluh, dibanding bola tenis, yaitu empat.

**Panel 10. Rantai Perbandingan** 🥭 (3, Tiga)

> Satu pepaya sama dengan dua mangga. Satu mangga sama dengan dua manggis. Jadi satu pepaya sama dengan empat manggis.

## 7. Tahap 4, 5, dan 6: tiga puluh permainan

| No | Tahap | Permainan | Jenis | Ronde |
|---|---|---|---|---|
| 1 | Concrete | Angkat dengan Dua Tangan | `lift-two-hands-compare` | ronde 1: semangka dan apel, jeruk dan anggur, buku dan pensil; ronde 2: tas dan penggaris, jeruk dan tomat, botol air dan gunting; ronde 3: kucing dan tikus, kupu-kupu dan burung, kelinci dan kucing; ronde 4: kol dan wortel, labu dan kol, terong dan tomat |
| 2 | Concrete | Jungkat-Jungkit | `seesaw-place-and-compare` | ronde 1: apel dan anggur; ronde 2: tas dan buku; ronde 3: jeruk dan apel; ronde 4: kelapa dan semangka |
| 3 | Concrete | Gantungan Baju: Tebak dan Buktikan | `guess-then-prove-hanger` | ronde 1: botol air dan pensil, penghapus dan gunting; ronde 2: pepaya dan mangga, manggis dan stroberi; ronde 3: kelinci dan burung, bulu dan kupu-kupu |
| 4 | Concrete | Urutkan dari Ringan ke Berat | `order-by-weight-tap` | ronde 1: pisang, semangka, apel (dari paling ringan); ronde 2: buku, tas, pensil, penggaris (dari paling berat); ronde 3: kucing, tikus, gajah, anjing (dari paling ringan); ronde 4: truk, sepeda, sepeda motor (dari paling berat) |
| 5 | Concrete | Pilah: Lebih Berat atau Lebih Ringan | `sort-heavier-lighter-reference` | ronde 1: acuan apel; semangka, pisang, kelapa, anggur, pepaya, stroberi; ronde 2: acuan buku; tas, pensil, botol air, penggaris, boneka, penghapus; ronde 3: acuan kucing; anjing, tikus, burung, gajah, kupu-kupu, sepeda |
| 6 | Concrete | Timbang dengan Satuan | `balance-with-informal-units` | ronde 1: boneka dengan bola tenis (4); ronde 2: boneka dengan kelereng (10); ronde 3: buku dengan bola tenis (3); ronde 4: gunting dengan koin (6) |
| 7 | Concrete | Berapa Satuan? | `count-units-on-scale` | ronde 1: tas = 6 bola tenis, penggaris = 4 koin; ronde 2: buku = 6 balok mainan, gunting = 6 koin; ronde 3: boneka = 8 balok mainan, tas = 15 kelereng |
| 8 | Concrete | Cari yang Paling Berat dan Paling Ringan | `tap-heaviest-lightest` | ronde 1: apel, semangka, anggur, jeruk; paling berat semangka, paling ringan anggur; ronde 2: manggis, stroberi, pepaya, mangga; paling berat pepaya, paling ringan stroberi; ronde 3: kucing, tikus, burung, anjing, kupu-kupu; paling berat anjing, paling ringan kupu-kupu; ronde 4: botol air, buku, tas, pensil, penggaris; paling berat botol air, paling ringan pensil |
| 9 | Concrete | Jodohkan Hasil Ukur | `match-object-to-measure` | ronde 1: boneka = 4 bola tenis, gunting = 3 kelereng, penggaris = 4 koin; ronde 2: buku = 3 bola tenis, tas = 6 bola tenis, boneka = 8 balok mainan; ronde 3: gunting = 6 koin, penggaris = 2 kelereng, boneka = 20 koin |
| 10 | Concrete | Tata Keranjang Belanja | `pack-basket-heavy-first` | ronde 1: semangka, apel, anggur (dasar: semangka); ronde 2: tas, buku, pensil (dasar: tas); ronde 3: pepaya, mangga, manggis (dasar: pepaya) |
| 11 | Picture | Baca Neraca Balok | `read-balance-diagram` | ronde 1: A dan B: lebih berat, C dan D: lebih ringan, E dan F: sama berat; ronde 2: A dan B: lebih berat, C dan D: sama berat, E dan F: lebih ringan; ronde 3: A dan B: lebih berat, C dan D: lebih ringan, E dan F: sama berat |
| 12 | Picture | Urutan dari Beberapa Neraca | `order-letters-from-balances` | ronde 1: C B A (dari paling ringan); ronde 2: D F E G (dari paling ringan); ronde 3: H J I (dari paling berat) |
| 13 | Picture | Batang Berat | `bar-model-weight` | ronde 1: A=4, B=7, C=2, D=5; ronde 2: E=6, F=3, G=9; ronde 3: H=8, I=5, J=1, K=6 |
| 14 | Picture | Hitung Titik di Neraca | `count-dots-balanced` | ronde 1: 3 titik, 5 titik; ronde 2: 4 titik, 7 titik; ronde 3: 6 titik, 9 titik |
| 15 | Picture | Goresan Titik | `tally-dots` | ronde 1: 3 goresan, 5 goresan; ronde 2: 6 goresan, 8 goresan; ronde 3: 4 goresan, 9 goresan |
| 16 | Picture | Tabel Hasil Ukur | `fill-weight-table` | ronde 1: Tulis banyak titik: Balok A=3, Balok B=5, Balok C=2, Balok D=6; ronde 2: Tulis banyak titik, ronde dua: Balok E=4, Balok F=8, Balok G=6, Balok H=10 |
| 17 | Picture | Jodohkan Neraca dan Kalimat | `match-balance-sentence` | ronde 1: Balok A lebih berat dari balok B; Balok C sama berat dengan balok D; Balok E lebih ringan dari balok F; ronde 2: Balok G lebih ringan dari balok H; Balok I sama berat dengan balok J; Balok K lebih berat dari balok L; ronde 3: Balok M lebih berat dari balok N; Balok O sama berat dengan balok P; Balok Q lebih ringan dari balok R |
| 18 | Picture | Pilah Diagram Neraca | `sort-balance-diagrams` | ronde 1: 6 diagram; ronde 2: 6 diagram; ronde 3: 6 diagram |
| 19 | Picture | Garis Angka Titik | `number-line-dots` | ronde 1: 2, 5, 8; ronde 2: 3, 6, 9; ronde 3: 4, 7, 10 |
| 20 | Picture | Seimbangkan Bagan | `balance-chart-dots` | ronde 1: 4 titik; ronde 2: 6 titik; ronde 3: 9 titik |
| 21 | Abstract | Lengkapi Kalimat Berat | `complete-weight-sentences` | ronde 1: Semangka lebih berat dari apel; Anggur lebih ringan dari jeruk; Jeruk sama berat dengan tomat; ronde 2: Kucing lebih berat dari tikus; Buku lebih ringan dari tas; Kelinci sama berat dengan kucing |
| 22 | Abstract | Benar atau Salah: Berat | `true-false-weight` | ronde 1: 5 pernyataan, 3 benar; ronde 2: 5 pernyataan, 3 benar |
| 23 | Abstract | Susun Kalimat Berat | `build-weight-sentence` | ronde 1: Semangka lebih berat dari apel; ronde 2: Berat 1 boneka sama dengan 4 bola tenis; ronde 3: Benda yang lebih berat ada lebih bawah; ronde 4: Hasil pengukuran bergantung pada alat ukur |
| 24 | Abstract | Hitung Cerdas Berat | `chain-multiplication-weights` | ronde 1: jawaban 6 apel, jawaban 9 stroberi; ronde 2: jawaban 4 manggis, jawaban 10 apel; ronde 3: jawaban 15 apel, jawaban 8 apel |
| 25 | Abstract | Tabel Kelipatan Berat | `fill-multiples-table` | ronde 1: Jeruk dan stroberi; ronde 2: Kelapa dan apel |
| 26 | Abstract | Mana Lebih Berat dari Angka | `compare-measure-numbers` | ronde 1: 5 dan 8 kelereng, 6 dan 3 bola tenis; ronde 2: 9 dan 9 koin, 4 dan 7 balok mainan; ronde 3: 12 dan 6 kelereng, 3 dan 10 koin |
| 27 | Abstract | Detektif Berat | `riddle-weight-clues` | soal 1: jawaban kelapa; soal 2: jawaban tikus; soal 3: jawaban tas; soal 4: jawaban terong |
| 28 | Abstract | Peta Konsep Berat | `concept-map-fill` | Membandingkan berat; Satuan tidak baku |
| 29 | Abstract | Urutkan dari Angka | `order-by-measure-numbers` | ronde 1: gunting 6, buku 15, penggaris 4 koin; ronde 2: tas 30, boneka 20, buku 15, penggaris 4 koin; ronde 3: boneka 10, tas 15, gunting 3, penggaris 2 kelereng |
| 30 | Abstract | Ketuk Semua yang Benar | `select-all-true-weight` | ronde 1: 3 dari 5 benar; ronde 2: 4 dari 5 benar; ronde 3: 3 dari 5 benar |

### Permainan 1. Angkat dengan Dua Tangan (Concrete)

- **Rujukan buku.** hlm. 160–162 (membandingkan dengan kedua tangan; Ayo Mencoba nomor 1 sampai 4)
- **Tujuan.** Merasakan dan menentukan benda yang lebih berat, lebih ringan, atau sama berat dengan kedua tangan.
- **Cara main.** Empat ronde, tiap ronde tiga pasang benda, misalnya semangka dan apel, jeruk dan anggur, buku dan pensil. Siswa menekan Angkat dua-duanya, melihat tangan yang memegang benda lebih berat turun lebih rendah, lalu memilih satu dari tiga pernyataan. Dua pasang sama berat. Kunci dihitung dari tabel berat benda.
- **Ronde.** ronde 1: semangka dan apel, jeruk dan anggur, buku dan pensil; ronde 2: tas dan penggaris, jeruk dan tomat, botol air dan gunting; ronde 3: kucing dan tikus, kupu-kupu dan burung, kelinci dan kucing; ronde 4: kol dan wortel, labu dan kol, terong dan tomat
- **Panduan suara.** Angkat kedua benda, lalu pilih yang lebih berat.

### Permainan 2. Jungkat-Jungkit (Concrete)

- **Rujukan buku.** hlm. 158–159 (timbangan jungkat-jungkit; posisi benda yang lebih berat berada lebih bawah)
- **Tujuan.** Menaruh dua benda pada timbangan jungkat-jungkit dan membaca sisi yang turun.
- **Cara main.** Empat ronde, tiap ronde dua benda. Siswa mengetuk benda, lalu mengetuk piringan kiri atau kanan. Piringan yang berisi benda lebih berat turun. Setelah kedua benda terpasang, siswa memilih yang lebih berat. Satu ronde sama berat. Siswa boleh menukar tempat benda.
- **Ronde.** ronde 1: apel dan anggur; ronde 2: tas dan buku; ronde 3: jeruk dan apel; ronde 4: kelapa dan semangka
- **Panduan suara.** Taruh benda di piringan, lalu lihat yang turun.

### Permainan 3. Gantungan Baju: Tebak dan Buktikan (Concrete)

- **Rujukan buku.** hlm. 161–162 (Ayo Mencoba nomor 2 dan 3: tebak benda yang lebih berat, lalu buktikan)
- **Tujuan.** Menebak benda yang lebih berat, lalu membuktikannya dengan gantungan baju.
- **Cara main.** Tiga ronde, tiap ronde dua pasang benda. Siswa memilih tebakan dulu. Setelah memilih, gantungan dilepas dan miringnya membuktikan jawaban. Tebakan yang meleset diberi penjelasan dan boleh dipilih ulang.
- **Ronde.** ronde 1: botol air dan pensil, penghapus dan gunting; ronde 2: pepaya dan mangga, manggis dan stroberi; ronde 3: kelinci dan burung, bulu dan kupu-kupu
- **Panduan suara.** Tebak dulu, lalu lihat gantungannya.

### Permainan 4. Urutkan dari Ringan ke Berat (Concrete)

- **Rujukan buku.** hlm. 175 dan 177 (urutan benda dari yang paling ringan)
- **Tujuan.** Mengurutkan tiga atau empat benda dari paling ringan atau dari paling berat.
- **Cara main.** Empat ronde, tiga atau empat benda, dua ronde dari paling ringan dan dua ronde dari paling berat. Siswa mengetuk benda satu per satu sesuai urutan. Benda yang salah memberi petunjuk. Kunci dihitung dari tabel berat benda.
- **Ronde.** ronde 1: pisang, semangka, apel (dari paling ringan); ronde 2: buku, tas, pensil, penggaris (dari paling berat); ronde 3: kucing, tikus, gajah, anjing (dari paling ringan); ronde 4: truk, sepeda, sepeda motor (dari paling berat)
- **Panduan suara.** Ketuk benda sesuai urutan beratnya.

### Permainan 5. Pilah: Lebih Berat atau Lebih Ringan (Concrete)

- **Rujukan buku.** hlm. 165–167 (warnai yang paling berat dan paling ringan; lengkapi kalimat)
- **Tujuan.** Memilah benda yang lebih berat dan yang lebih ringan dari sebuah benda acuan.
- **Cara main.** Tiga ronde, tiap ronde satu benda acuan dan enam benda lain. Siswa menyeret atau mengetuk benda ke kotak Lebih berat dari acuan atau Lebih ringan dari acuan. Benda yang salah kembali dengan petunjuk.
- **Ronde.** ronde 1: acuan apel; semangka, pisang, kelapa, anggur, pepaya, stroberi; ronde 2: acuan buku; tas, pensil, botol air, penggaris, boneka, penghapus; ronde 3: acuan kucing; anjing, tikus, burung, gajah, kupu-kupu, sepeda
- **Panduan suara.** Pilah benda ke kotak yang tepat.

### Permainan 6. Timbang dengan Satuan (Concrete)

- **Rujukan buku.** hlm. 168–170 (Tika mengukur berat boneka dengan bola tenis dan kelereng)
- **Tujuan.** Menambah satuan tidak baku satu per satu sampai timbangan seimbang.
- **Cara main.** Empat ronde: boneka dengan bola tenis, boneka dengan kelereng, buku dengan bola tenis, dan gunting dengan koin. Siswa menekan tombol tambah satuan di piringan kanan sampai neraca seimbang. Neraca miring sesuai berat sehingga siswa tahu harus menambah atau mengurangi.
- **Ronde.** ronde 1: boneka dengan bola tenis (4); ronde 2: boneka dengan kelereng (10); ronde 3: buku dengan bola tenis (3); ronde 4: gunting dengan koin (6)
- **Panduan suara.** Tambah satuan sampai timbangan seimbang.

### Permainan 7. Berapa Satuan? (Concrete)

- **Rujukan buku.** hlm. 172–173 (Ayo Berlatih nomor 1: tuliskan hasil pengukuran)
- **Tujuan.** Membaca hasil pengukuran berat dari gambar timbangan yang seimbang.
- **Cara main.** Tiga ronde, tiap ronde dua gambar neraca seimbang, misalnya tas dengan bola tenis atau penggaris dengan koin. Siswa memilih banyak satuan dari tiga pilihan angka. Kunci dihitung dari berat benda dan berat satuan.
- **Ronde.** ronde 1: tas = 6 bola tenis, penggaris = 4 koin; ronde 2: buku = 6 balok mainan, gunting = 6 koin; ronde 3: boneka = 8 balok mainan, tas = 15 kelereng
- **Panduan suara.** Hitung satuan di piringan, lalu pilih angkanya.

### Permainan 8. Cari yang Paling Berat dan Paling Ringan (Concrete)

- **Rujukan buku.** hlm. 165 dan 176 (warnai benda yang paling berat dan paling ringan)
- **Tujuan.** Menemukan benda yang paling berat dan paling ringan di antara beberapa benda.
- **Cara main.** Empat ronde, kelompok empat atau lima benda. Tiap ronde punya dua pertanyaan: paling berat, lalu paling ringan. Siswa mengetuk bendanya. Letak benda yang benar berpindah-pindah.
- **Ronde.** ronde 1: apel, semangka, anggur, jeruk; paling berat semangka, paling ringan anggur; ronde 2: manggis, stroberi, pepaya, mangga; paling berat pepaya, paling ringan stroberi; ronde 3: kucing, tikus, burung, anjing, kupu-kupu; paling berat anjing, paling ringan kupu-kupu; ronde 4: botol air, buku, tas, pensil, penggaris; paling berat botol air, paling ringan pensil
- **Panduan suara.** Ketuk benda yang paling berat atau paling ringan.

### Permainan 9. Jodohkan Hasil Ukur (Concrete)

- **Rujukan buku.** hlm. 172–173 (tabel hasil percobaan dan hasil pengukuran)
- **Tujuan.** Menjodohkan benda dengan hasil pengukuran beratnya.
- **Cara main.** Tiga ronde, tiap ronde tiga benda dan tiga hasil ukur, misalnya boneka dengan empat bola tenis. Siswa mengetuk benda, lalu mengetuk hasil ukurnya. Pasangan yang benar terkunci.
- **Ronde.** ronde 1: boneka = 4 bola tenis, gunting = 3 kelereng, penggaris = 4 koin; ronde 2: buku = 3 bola tenis, tas = 6 bola tenis, boneka = 8 balok mainan; ronde 3: gunting = 6 koin, penggaris = 2 kelereng, boneka = 20 koin
- **Panduan suara.** Ketuk benda, lalu ketuk hasil ukurnya.

### Permainan 10. Tata Keranjang Belanja (Concrete)

- **Rujukan buku.** hlm. 159 (benda yang lebih berat berada lebih bawah), diperkaya konteks belanja
- **Tujuan.** Menaruh belanjaan yang berat di dasar keranjang dan yang ringan di atasnya.
- **Cara main.** Tiga ronde, tiap ronde tiga belanjaan. Siswa mengetuk belanjaan satu per satu mulai yang paling berat, sehingga tumpukan di keranjang tidak menekan barang ringan. Urutan salah memberi petunjuk.
- **Ronde.** ronde 1: semangka, apel, anggur (dasar: semangka); ronde 2: tas, buku, pensil (dasar: tas); ronde 3: pepaya, mangga, manggis (dasar: pepaya)
- **Panduan suara.** Taruh yang paling berat di dasar keranjang dulu.

### Permainan 11. Baca Neraca Balok (Picture)

- **Rujukan buku.** hlm. 158–160 (posisi benda yang lebih berat lebih bawah)
- **Tujuan.** Membaca kemiringan neraca yang memuat balok berhuruf.
- **Cara main.** Tiga ronde, tiap ronde tiga neraca dengan balok A, B, C, D, E, F tanpa gambar benda. Siswa membaca sisi yang turun, lalu memilih pernyataan yang tepat. Sebagian neraca seimbang. Kunci dihitung dari bobot balok.
- **Ronde.** ronde 1: A dan B: lebih berat, C dan D: lebih ringan, E dan F: sama berat; ronde 2: A dan B: lebih berat, C dan D: sama berat, E dan F: lebih ringan; ronde 3: A dan B: lebih berat, C dan D: lebih ringan, E dan F: sama berat
- **Panduan suara.** Lihat sisi yang turun, lalu pilih pernyataannya.

### Permainan 12. Urutan dari Beberapa Neraca (Picture)

- **Rujukan buku.** hlm. 159–160 (semangka lebih berat dari apel dan anggur) dalam bentuk diagram huruf
- **Tujuan.** Mengurutkan balok berhuruf dari beberapa neraca yang membandingkan dua balok.
- **Cara main.** Tiga ronde dengan tiga atau empat balok. Tiap ronde menampilkan dua sampai tiga neraca yang masing-masing membandingkan dua balok. Siswa mengetuk huruf dari yang paling ringan atau paling berat. Hanya satu urutan yang cocok dengan semua neraca.
- **Ronde.** ronde 1: C B A (dari paling ringan); ronde 2: D F E G (dari paling ringan); ronde 3: H J I (dari paling berat)
- **Panduan suara.** Baca semua neraca, lalu ketuk huruf berurutan.

### Permainan 13. Batang Berat (Picture)

- **Rujukan buku.** hlm. 158–165 (membandingkan berat) dalam model batang
- **Tujuan.** Membaca batang yang menunjukkan berat dan menemukan yang paling tinggi dan paling rendah.
- **Cara main.** Tiga ronde, tiap ronde tiga sampai empat batang berhuruf dengan tinggi berbeda. Siswa mengetuk batang yang paling berat dan batang yang paling ringan. Kunci dihitung dari tinggi batang.
- **Ronde.** ronde 1: A=4, B=7, C=2, D=5; ronde 2: E=6, F=3, G=9; ronde 3: H=8, I=5, J=1, K=6
- **Panduan suara.** Ketuk batang yang paling tinggi atau paling rendah.

### Permainan 14. Hitung Titik di Neraca (Picture)

- **Rujukan buku.** hlm. 168–170 (mengukur berat dengan satuan) dalam diagram titik
- **Tujuan.** Menghitung titik satuan yang seimbang dengan satu balok.
- **Cara main.** Tiga ronde, tiap ronde dua neraca seimbang. Satu balok di kiri dan sejumlah titik di kanan. Siswa menghitung titik dan memilih banyaknya dari tiga angka.
- **Ronde.** ronde 1: 3 titik, 5 titik; ronde 2: 4 titik, 7 titik; ronde 3: 6 titik, 9 titik
- **Panduan suara.** Hitung titik di piringan kanan.

### Permainan 15. Goresan Titik (Picture)

- **Rujukan buku.** hlm. 168–170 (hasil pengukuran) dalam goresan tally
- **Tujuan.** Menuliskan hasil pengukuran sebagai goresan tally.
- **Cara main.** Tiga ronde, tiap ronde dua soal. Siswa menekan Goresan sebanyak titik yang sama berat dengan satu balok, lalu menekan Periksa. Setiap lima goresan dikelompokkan.
- **Ronde.** ronde 1: 3 goresan, 5 goresan; ronde 2: 6 goresan, 8 goresan; ronde 3: 4 goresan, 9 goresan
- **Panduan suara.** Tambah goresan sebanyak titiknya.

### Permainan 16. Tabel Hasil Ukur (Picture)

- **Rujukan buku.** hlm. 162 dan 172 (tabel tebakan dan tabel hasil percobaan)
- **Tujuan.** Mengisi tabel hasil pengukuran berat dari diagram.
- **Cara main.** Dua ronde dengan tabel berisi empat baris. Di atas tabel ada empat neraca seimbang: satu balok berhuruf dan sejumlah titik. Siswa menghitung titik, mengetuk baris, lalu mengetuk kartu angka yang tepat. Kartu angka yang sama dapat dipakai lagi bila diperlukan.
- **Ronde.** ronde 1: Tulis banyak titik: Balok A=3, Balok B=5, Balok C=2, Balok D=6; ronde 2: Tulis banyak titik, ronde dua: Balok E=4, Balok F=8, Balok G=6, Balok H=10
- **Panduan suara.** Isi tabel dengan kartu angka.

### Permainan 17. Jodohkan Neraca dan Kalimat (Picture)

- **Rujukan buku.** hlm. 159–160 (kalimat perbandingan dari gambar neraca)
- **Tujuan.** Menjodohkan gambar neraca dengan kalimat perbandingannya.
- **Cara main.** Tiga ronde, tiap ronde tiga neraca berhuruf dan tiga kalimat, misalnya A lebih berat dari B. Siswa mengetuk neraca, lalu mengetuk kalimat yang cocok.
- **Ronde.** ronde 1: Balok A lebih berat dari balok B; Balok C sama berat dengan balok D; Balok E lebih ringan dari balok F; ronde 2: Balok G lebih ringan dari balok H; Balok I sama berat dengan balok J; Balok K lebih berat dari balok L; ronde 3: Balok M lebih berat dari balok N; Balok O sama berat dengan balok P; Balok Q lebih ringan dari balok R
- **Panduan suara.** Ketuk neraca, lalu ketuk kalimatnya.

### Permainan 18. Pilah Diagram Neraca (Picture)

- **Rujukan buku.** hlm. 158–160 (membandingkan dua benda) dalam diagram
- **Tujuan.** Memilah diagram neraca menurut sisi yang lebih berat.
- **Cara main.** Tiga ronde, tiap ronde enam diagram neraca. Siswa menyeret atau mengetuk diagram ke kotak Kiri lebih berat, Sama berat, atau Kanan lebih berat.
- **Ronde.** ronde 1: 6 diagram; ronde 2: 6 diagram; ronde 3: 6 diagram
- **Panduan suara.** Pilah diagram ke kotak yang tepat.

### Permainan 19. Garis Angka Titik (Picture)

- **Rujukan buku.** hlm. 168–170 (hasil pengukuran) pada garis bilangan
- **Tujuan.** Menandai banyak titik yang sama berat dengan satu balok pada garis angka.
- **Cara main.** Tiga ronde, tiap ronde tiga soal pada garis angka satu sampai sepuluh. Siswa mengetuk bulatan angka yang tepat. Jawaban yang salah memberi petunjuk.
- **Ronde.** ronde 1: 2, 5, 8; ronde 2: 3, 6, 9; ronde 3: 4, 7, 10
- **Panduan suara.** Ketuk angka yang diminta pada garis.

### Permainan 20. Seimbangkan Bagan (Picture)

- **Rujukan buku.** hlm. 168–171 (menambah satuan sampai seimbang) dalam bagan titik
- **Tujuan.** Menambah titik sampai neraca bagan seimbang dengan satu balok.
- **Cara main.** Tiga ronde, tiap ronde satu balok bertuliskan huruf. Siswa menambah titik satu per satu sampai neraca seimbang. Bagan miring sesuai bobot sehingga siswa tahu harus menambah atau mengurangi.
- **Ronde.** ronde 1: 4 titik; ronde 2: 6 titik; ronde 3: 9 titik
- **Panduan suara.** Tambah titik sampai neraca seimbang.

### Permainan 21. Lengkapi Kalimat Berat (Abstract)

- **Rujukan buku.** hlm. 162–163 dan 166–167 (lengkapi kalimat dengan lebih berat, lebih ringan, sama berat)
- **Tujuan.** Melengkapi kalimat perbandingan berat dengan kata yang tepat.
- **Cara main.** Dua ronde, tiap ronde tiga kalimat, misalnya semangka ... apel. Siswa memilih satu dari tiga kata hubungan. Kalimat yang lengkap dibacakan Suara Guru.
- **Ronde.** ronde 1: Semangka lebih berat dari apel; Anggur lebih ringan dari jeruk; Jeruk sama berat dengan tomat; ronde 2: Kucing lebih berat dari tikus; Buku lebih ringan dari tas; Kelinci sama berat dengan kucing
- **Panduan suara.** Pilih kata yang tepat untuk bagian kosong.

### Permainan 22. Benar atau Salah: Berat (Abstract)

- **Rujukan buku.** hlm. 158–171 (membandingkan dan mengukur berat)
- **Tujuan.** Menilai pernyataan tentang berat, timbangan, dan satuan tidak baku.
- **Cara main.** Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan tentang benda dihitung dari tabel berat. Setiap jawaban diberi penjelasan singkat.
- **Ronde.** ronde 1: 5 pernyataan, 3 benar; ronde 2: 5 pernyataan, 3 benar
- **Panduan suara.** Baca pernyataan, lalu pilih benar atau salah.

### Permainan 23. Susun Kalimat Berat (Abstract)

- **Rujukan buku.** hlm. 159–160 dan 170 (kalimat perbandingan dan hasil pengukuran)
- **Tujuan.** Menyusun kata menjadi kalimat tentang berat.
- **Cara main.** Empat kalimat. Kartu kata diketuk berurutan. Satu kartu pengecoh tidak dipakai. Kalimat yang benar dibacakan.
- **Ronde.** ronde 1: Semangka lebih berat dari apel; ronde 2: Berat 1 boneka sama dengan 4 bola tenis; ronde 3: Benda yang lebih berat ada lebih bawah; ronde 4: Hasil pengukuran bergantung pada alat ukur
- **Panduan suara.** Ketuk kata menjadi kalimat yang benar.

### Permainan 24. Hitung Cerdas Berat (Abstract)

- **Rujukan buku.** hlm. 176 dan 188 (satu pepaya sama dengan berapa manggis; berat 1, 2, dan 3 jeruk sama dengan berapa stroberi)
- **Tujuan.** Menghitung berat dengan rantai perbandingan dan penjumlahan berulang.
- **Cara main.** Tiga ronde, tiap ronde dua soal cerita, misalnya satu mangga sama dengan dua manggis dan satu pepaya sama dengan dua mangga, berapa manggis sama dengan satu pepaya. Siswa memilih satu dari tiga angka. Kunci dihitung dari tabel berat.
- **Ronde.** ronde 1: jawaban 6 apel, jawaban 9 stroberi; ronde 2: jawaban 4 manggis, jawaban 10 apel; ronde 3: jawaban 15 apel, jawaban 8 apel
- **Panduan suara.** Baca soal, lalu pilih jawabannya.

### Permainan 25. Tabel Kelipatan Berat (Abstract)

- **Rujukan buku.** hlm. 188 (Evaluasi nomor 3: berat 1, 2, dan 3 jeruk sama dengan berapa stroberi)
- **Tujuan.** Mengisi tabel kelipatan berat dua benda.
- **Cara main.** Dua ronde dengan tabel berisi empat baris, misalnya satu, dua, tiga, dan empat jeruk dengan banyak stroberi. Siswa mengetuk baris, lalu mengetuk kartu angka.
- **Ronde.** ronde 1: Jeruk dan stroberi; ronde 2: Kelapa dan apel
- **Panduan suara.** Isi tabel dengan kartu angka.

### Permainan 26. Mana Lebih Berat dari Angka (Abstract)

- **Rujukan buku.** hlm. 175 (berat benda dibandingkan 9 kelereng)
- **Tujuan.** Membandingkan dua benda dari hasil ukur dengan satuan yang sama.
- **Cara main.** Tiga ronde, tiap ronde dua soal. Dua benda diukur dengan satuan yang sama, misalnya A lima kelereng dan B delapan kelereng. Siswa memilih benda yang lebih berat atau sama berat. Satuan yang sama membuat angka dapat dibandingkan.
- **Ronde.** ronde 1: 5 dan 8 kelereng, 6 dan 3 bola tenis; ronde 2: 9 dan 9 koin, 4 dan 7 balok mainan; ronde 3: 12 dan 6 kelereng, 3 dan 10 koin
- **Panduan suara.** Bandingkan angkanya, lalu pilih jawabannya.

### Permainan 27. Detektif Berat (Abstract)

- **Rujukan buku.** hlm. 165–167 (lebih berat dari, lebih ringan dari)
- **Tujuan.** Menemukan sebuah benda dari dua petunjuk perbandingan berat.
- **Cara main.** Empat soal. Siswa membaca dua petunjuk, misalnya aku lebih berat dari apel dan lebih ringan dari semangka, lalu memilih satu dari tiga nama. Hanya satu nama yang cocok dengan kedua petunjuk.
- **Ronde.** soal 1: jawaban kelapa; soal 2: jawaban tikus; soal 3: jawaban tas; soal 4: jawaban terong
- **Panduan suara.** Baca semua petunjuk, lalu pilih namanya.

### Permainan 28. Peta Konsep Berat (Abstract)

- **Rujukan buku.** hlm. 156 (peta konsep pengukuran: berat)
- **Tujuan.** Melengkapi peta konsep membandingkan berat dan satuan tidak baku.
- **Cara main.** Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala.
- **Ronde.** Membandingkan berat; Satuan tidak baku
- **Panduan suara.** Pilih kartu yang tepat untuk kotak yang menyala.

### Permainan 29. Urutkan dari Angka (Abstract)

- **Rujukan buku.** hlm. 175 nomor 3h dan hlm. 177 (urutan berat dari yang paling ringan)
- **Tujuan.** Mengurutkan benda dari hasil ukur dengan satuan yang sama.
- **Cara main.** Tiga ronde, tiap ronde tiga atau empat benda dengan hasil ukur satuan yang sama, misalnya buku 15 koin. Siswa mengetuk benda dari yang paling ringan atau paling berat menurut angkanya.
- **Ronde.** ronde 1: gunting 6, buku 15, penggaris 4 koin; ronde 2: tas 30, boneka 20, buku 15, penggaris 4 koin; ronde 3: boneka 10, tas 15, gunting 3, penggaris 2 kelereng
- **Panduan suara.** Ketuk menurut angka, dari kecil atau dari besar.

### Permainan 30. Ketuk Semua yang Benar (Abstract)

- **Rujukan buku.** hlm. 158–171 (membandingkan dan mengukur berat)
- **Tujuan.** Memilih semua pernyataan benar tentang timbangan dan satuan tidak baku.
- **Cara main.** Tiga ronde, tiap ronde lima pernyataan dengan beberapa yang benar. Siswa mengetuk semua yang benar, lalu menekan Periksa. Pernyataan yang salah dijelaskan.
- **Ronde.** ronde 1: 3 dari 5 benar; ronde 2: 4 dari 5 benar; ronde 3: 3 dari 5 benar
- **Panduan suara.** Ketuk semua yang benar, lalu periksa.

## 8. Poin Penting dan Catatanku

- ⚖️ **Tiga cara menimbang**: jungkat-jungkit, gantungan baju, tangan. _Suara:_ Kita membandingkan berat dengan timbangan jungkat-jungkit, gantungan baju, atau kedua tangan.
- ↕️ **Posisi timbangan**: berat di bawah, ringan di atas. _Suara:_ Posisi benda yang lebih berat berada lebih bawah, dan posisi benda yang lebih ringan berada lebih atas.
- 🔤 **Kata perbandingan**: lebih berat, lebih ringan, sama berat, paling berat, paling ringan. _Suara:_ Kata perbandingan berat adalah lebih berat, lebih ringan, sama berat, paling berat, dan paling ringan.
- 🎾 **Satuan tidak baku**: balok, kelereng, koin, bola tenis. _Suara:_ Mainan balok, kelereng, koin, dan bola tenis dapat dipakai sebagai satuan tidak baku untuk mengukur berat.
- 🧸 **Hasil bergantung alat ukur**: satuan lebih ringan, hitungan lebih banyak. _Suara:_ Satu boneka sama dengan empat bola tenis, dan juga sepuluh kelereng. Hasil pengukuran bergantung pada alat ukur yang dipakai.

**Suara Poin Penting.** Ingat selalu! Kita membandingkan berat dengan jungkat-jungkit, gantungan baju, atau kedua tangan. Benda yang lebih berat berada lebih bawah. Kita memakai kata lebih berat, lebih ringan, sama berat, paling berat, dan paling ringan. Berat juga dapat diukur dengan satuan tidak baku, dan hasilnya bergantung pada alat ukur.

**Cara menyebutkan.** Benda kata perbandingan dari benda lain. _Suara:_ Cara menyebutkan. Semangka lebih berat dari apel. Sebut benda pertama, kata perbandingan, lalu benda yang dibandingkan.

**Ayo Mencoba di rumah.** Ayo Mencoba di rumah: ambil lima benda kecil di rumahmu, tebak benda mana yang lebih berat, lalu buktikan dengan kedua tangan atau gantungan baju, dan tulis hasilnya pada tabel. Dengan bantuan orang tua, ukur satu benda ringan memakai kelereng atau koin, lalu ceritakan hasilnya.

**Refleksi (Catatanku).**

- Aku dapat membandingkan berat benda.
- Aku dapat menghitung berat benda dengan satuan tidak baku.
- Aku belajar dengan tertib.
- Aku menyampaikan pendapat dengan percaya diri.

## 9. Metode dari luar buku yang diadopsi

- **Tebak lalu buktikan (predict, observe, explain)**: siswa menebak benda yang lebih berat sebelum menimbang, lalu bukti timbangan memberi umpan balik. Dasar permainan Gantungan Baju: Tebak dan Buktikan.
- **Besar belum tentu berat**: kontras balon besar yang ringan dengan batu kecil yang berat melawan salah paham bahwa ukuran menentukan berat. Dasar kartu infografis dan adegan video.
- **Satu benda, dua hasil ukur**: boneka sama dengan 4 bola tenis dan juga 10 kelereng. Siswa menemukan sendiri bahwa satuan yang lebih ringan memerlukan hitungan yang lebih banyak. Dasar permainan Timbang dengan Satuan dan Berapa Satuan?
- **Rantai perbandingan**: satu pepaya sama dengan dua mangga dan satu mangga sama dengan dua manggis, jadi satu pepaya sama dengan empat manggis. Jembatan menuju perkalian dan perbandingan, dibangkitkan dari tabel berat yang sama dengan gambar.
- **Model batang, titik, dan goresan (tally)**: berat dibaca dari tinggi batang atau banyak titik pada neraca diagram. Dasar tahap Picture tanpa gambar benda.
- **Tata keranjang belanja**: konteks nyata mengapa benda yang lebih berat ditaruh di dasar. Dasar permainan Tata Keranjang Belanja.

## 10. Batas yang diketahui

- Soal Latihan (30 poin), soal Ujian (70 poin), dan Simulasi belum dibuat. Pemilik akan menugaskannya terpisah. Sampai saat itu tab Latihan dan Ujian menampilkan kartu "sedang disiapkan".
- Suara dan ketukan video diuji dengan suara perangkat di Chrome desktop berukuran ponsel. Pada sebagian Android, tombol Jeda tidak menghentikan suara di tengah kalimat (Web Speech `pause()` tidak didukung merata).
- Laju 0,70 dan nada 1 sama untuk Bu Sari dan Pak Budi. Beda guru hanya pada suara yang dipilih perangkat (wanita atau pria). Perangkat yang hanya punya satu suara Indonesia akan membuat kedua guru terdengar serupa.
- Ucapan memakai kata, bukan lambang, supaya suara perangkat tidak salah membaca.
- Tiga puluh permainan per sub-bab memakai sepuluh jenis per tahap. Mesin yang sama (urut ketuk, pilih bertahap, jodohkan, ketuk semua) dipakai lintas tahap dengan isi yang berbeda: benda nyata di Concrete, diagram di Picture, kata dan angka di Abstract.
- Berat benda memakai tabel berat tetap (gram, pembulatan) hanya untuk membangkitkan kunci dan miring neraca. Angka gram tidak pernah ditampilkan ke siswa. Besaran baku (kilogram) belum diajarkan di kelas 2.

